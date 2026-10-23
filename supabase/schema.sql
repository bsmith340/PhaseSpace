-- BCS Academy database schema for Supabase (Postgres 15+).
-- Run the whole file in the Supabase SQL editor. It is idempotent: running it again updates functions,
-- policies and grants without touching data, so it is also the first step of a restore (docs/backend/SETUP.md).
--
-- Privacy by design (UK Children's Code; users are 16-18): no date of birth, no phone, no address, no real name
-- required (display_name can be a nickname), school optional, marketing off by default. Row Level Security on
-- every table: a user can only see and change their own rows. The service-role key is never used by the site.

-- ============ helpers ============

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ============ profiles ============

create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  display_name        text not null default 'Student' check (char_length(btrim(display_name)) between 1 and 40),
  school              text check (school is null or char_length(school) <= 80),
  year_group          smallint check (year_group is null or year_group between 11 and 14),  -- NI years: 12 GCSE, 13 AS, 14 A2; null = other / not said
  subjects            text[] not null default '{}' check (subjects <@ array['maths', 'further', 'physics']::text[]),
  role                text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  marketing_opt_in    boolean not null default false,
  privacy_version     text check (privacy_version is null or char_length(privacy_version) <= 20),  -- which privacy notice they agreed to
  privacy_accepted_at timestamptz,
  created_at          timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- true when the signed-in user is an admin. SECURITY DEFINER so policies on profiles can call it without recursion.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;


drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Rows are created only by the signup trigger and removed only by delete_me() / the auth.users cascade.
-- Users may change only these columns (never role, id, created_at or the consent record).
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (display_name, school, year_group, subjects, marketing_opt_in) on public.profiles to authenticated;

-- Belt and braces: even if a grant is widened by mistake, a user cannot promote themselves.
create or replace function public.profiles_guard()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('anon', 'authenticated') and new.role is distinct from old.role and not public.is_admin() then
    raise exception 'role can only be changed by an admin';
  end if;
  new.id := old.id;
  new.created_at := old.created_at;
  return new;
end;
$$;
drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard before update on public.profiles for each row execute function public.profiles_guard();

-- Create a profile when someone signs up. The sign-up form passes display_name, year_group, subjects, school,
-- marketing_opt_in and privacy_version in options.data (raw_user_meta_data); everything is re-validated here.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  yg   text  := meta ->> 'year_group';
  subj text[];
begin
  if jsonb_typeof(meta -> 'subjects') = 'array' then
    select coalesce(array_agg(distinct s), '{}') into subj
      from jsonb_array_elements_text(meta -> 'subjects') as s
     where s in ('maths', 'further', 'physics');
  end if;
  insert into public.profiles (id, display_name, school, year_group, subjects, marketing_opt_in, privacy_version, privacy_accepted_at)
  values (
    new.id,
    coalesce(nullif(left(btrim(coalesce(meta ->> 'display_name', '')), 40), ''), 'Student'),
    nullif(left(btrim(coalesce(meta ->> 'school', '')), 80), ''),
    case when yg ~ '^\d{2}$' and yg::int between 11 and 14 then yg::smallint end,
    coalesce(subj, '{}'),
    coalesce(meta ->> 'marketing_opt_in', 'false') = 'true',
    nullif(left(coalesce(meta ->> 'privacy_version', ''), 20), ''),
    case when meta ? 'privacy_version' then now() end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- ============ progress (one JSON copy of the site's local progress per user) ============

create table if not exists public.progress (
  user_id    uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb check (octet_length(data::text) <= 2000000),  -- 2 MB cap
  updated_at timestamptz not null default now(),
  version    integer not null default 1 check (version >= 1)
);

alter table public.progress enable row level security;

drop policy if exists "progress: own rows" on public.progress;
create policy "progress: own rows" on public.progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

revoke all on public.progress from anon, authenticated;
grant select, insert, update, delete on public.progress to authenticated;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before update on public.progress for each row execute function public.touch_updated_at();

-- ============ reports ("Report a problem") ============

create table if not exists public.reports (
  id         bigint generated always as identity primary key,
  user_id    uuid references auth.users (id) on delete set null,  -- null when sent signed out (or after the account is deleted)
  page       text not null check (char_length(page) <= 300),
  unit       text check (unit is null or char_length(unit) <= 20),
  point      text check (point is null or char_length(point) <= 40),
  kind       text not null check (kind in ('wrong-answer', 'typo', 'broken-page', 'confusing', 'other')),
  message    text not null check (char_length(btrim(message)) between 5 and 2000),
  email      text check (email is null or (char_length(email) <= 200 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')),  -- optional reply address when signed out
  user_agent text check (user_agent is null or char_length(user_agent) <= 400),
  status     text not null default 'open' check (status in ('open', 'fixing', 'fixed', 'wontfix')),
  admin_note text check (admin_note is null or char_length(admin_note) <= 2000),
  created_at timestamptz not null default now()
);
create index if not exists reports_status_created on public.reports (status, created_at desc);

alter table public.reports enable row level security;

drop policy if exists "reports: anyone can send" on public.reports;
create policy "reports: anyone can send" on public.reports
  for insert to anon, authenticated
  with check (status = 'open' and admin_note is null and (user_id is null or user_id = auth.uid()));

drop policy if exists "reports: read own or admin" on public.reports;
create policy "reports: read own or admin" on public.reports
  for select to authenticated using (user_id = auth.uid() or public.is_admin());

drop policy if exists "reports: admin updates" on public.reports;
create policy "reports: admin updates" on public.reports
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "reports: admin deletes" on public.reports;
create policy "reports: admin deletes" on public.reports
  for delete to authenticated using (public.is_admin());

revoke all on public.reports from anon, authenticated;
grant insert (user_id, page, unit, point, kind, message, email, user_agent) on public.reports to anon, authenticated;
grant select, delete on public.reports to authenticated;
grant update (status, admin_note) on public.reports to authenticated;

-- ============ paper attempts (marks per question on a paper) ============

create table if not exists public.paper_attempts (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  paper_id   text not null check (char_length(paper_id) between 1 and 60),
  question   text not null check (char_length(question) between 1 and 20),
  marks      numeric(5, 1) not null check (marks >= 0),
  out_of     numeric(5, 1) not null check (out_of > 0 and out_of <= 200),
  created_at timestamptz not null default now(),
  check (marks <= out_of)
);
create index if not exists paper_attempts_user_paper on public.paper_attempts (user_id, paper_id, created_at desc);

alter table public.paper_attempts enable row level security;

drop policy if exists "paper_attempts: own rows" on public.paper_attempts;
create policy "paper_attempts: own rows" on public.paper_attempts
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

revoke all on public.paper_attempts from anon, authenticated;
grant select, insert, update, delete on public.paper_attempts to authenticated;

-- ============ delete my account ============

-- Deletes the caller's auth user. Cascades remove their profile, progress and paper attempts; their reports are
-- kept without a user id (so a fix in progress isn't lost) and their reply email is cleared.
create or replace function public.delete_me()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then
    raise exception 'not signed in';
  end if;
  update public.reports set email = null where user_id = me;
  delete from auth.users where id = me;
end;
$$;

revoke all on function public.delete_me() from public, anon;
grant execute on function public.delete_me() to authenticated;
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ============ retention (run by hand, or schedule with pg_cron: see SETUP.md) ============

-- Closed reports are removed 12 months after they were sent.
create or replace function public.purge_old_reports()
returns integer
language sql
security definer
set search_path = ''
as $$
  with gone as (
    delete from public.reports where status in ('fixed', 'wontfix') and created_at < now() - interval '12 months' returning 1
  ) select count(*)::int from gone;
$$;
revoke all on function public.purge_old_reports() from public, anon, authenticated;
