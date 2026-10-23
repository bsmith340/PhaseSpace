# BCS Academy accounts: owner setup

Accounts, progress sync and "Report a problem" run on [Supabase](https://supabase.com). Until the steps below are done the
site shows a "Not connected yet" state and everything else works as before. Allow about 30 minutes.

What the site uses: the **Project URL** and the **anon (public) key** only. The anon key is meant to be public; Row Level
Security in `supabase/schema.sql` decides what each user can read or write. **Never** put the `service_role` key, the
database password or a connection string in the site, the repo or `js/config.js`.

## 1. Create the project (UK region)

1. Sign in at supabase.com → **New project**.
2. Name: `bcs-academy`. Database password: generate a long one and keep it in your password manager.
3. **Region: West EU (London) `eu-west-2`.** Plan: Free is fine to start.
4. Wait for the project to finish provisioning.

## 2. Create the tables

1. Dashboard → **SQL Editor** → **New query**.
2. Paste the whole of `supabase/schema.sql` and press **Run**. It should finish with "Success. No rows returned".
3. Check: **Table Editor** shows `profiles`, `progress`, `reports`, `paper_attempts`, each marked "RLS enabled".

The file is safe to run again after any update to it (it never deletes data).

## 3. Auth settings

Dashboard → **Authentication**:

1. **Sign In / Providers → Email**: Email provider on, **Confirm email on**, *Secure email change* on,
   minimum password length **8**. Leave phone and social providers off.
2. **URL Configuration**:
   - **Site URL**: `https://bcs-academy.pages.dev` (or your custom domain once it's live, e.g. `https://bcsacademy.co.uk`).
   - **Redirect URLs** (add each):
     - `https://bcs-academy.pages.dev/**`
     - `https://*.bcs-academy.pages.dev/**` (Cloudflare preview deploys)
     - `https://YOUR-CUSTOM-DOMAIN/**` and `https://www.YOUR-CUSTOM-DOMAIN/**`
     - `http://localhost:8080/**` (optional, for testing locally with `npx serve`)
3. **Emails → Templates**: the site also accepts the 6-digit code from each email, which works when a student opens
   the email on a different device from the one they signed up on (the link only works in the same browser). In the
   **Confirm signup**, **Magic Link** and **Reset Password** templates, add this line under the link:
   `<p>Or enter this code on the site: <b>{{ .Token }}</b></p>`
4. **Rate limits**: defaults are fine. The free plan's built-in email sender is limited to a few emails an hour; before
   launch set up **custom SMTP** (Authentication → Emails → SMTP settings, e.g. Resend or Postmark) and use a sender
   like `no-reply@YOUR-DOMAIN`.
5. Optional: **Attack Protection → CAPTCHA** (Cloudflare Turnstile) if you get sign-up spam.

## 4. Connect the site

Dashboard → **Project Settings → API** (or **Data API**). Copy the **Project URL** and the **anon public** key into
`further-maths/js/config.js`:

```js
const BCS_CONFIG = { supabaseUrl: 'https://abcdefghijklmnop.supabase.co', supabaseAnonKey: 'eyJhbGciOi...', chatEndpoint: '/api/chat', siteUrl: 'https://bcs-academy.pages.dev' };
```

Optional extra keys: `contactEmail: 'you@your-domain'` (shown in the privacy notice and used for the "Send by email"
fallback in Report a problem) and `privacyUrl` (if you host the privacy notice somewhere else; default `#/account/privacy`).

Deploy, open the site, **Sign in → Create an account**, confirm the email, and check the account page says **Synced ✓**.

## 5. Make yourself admin

Admins can see and manage problem reports at `#/admin/reports`. After creating your own account, in the SQL Editor:

```sql
update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'YOUR-EMAIL');
```

(Sign out and in again, or reload the page.) Users can never change their own role from the site.

## 6. Nightly backups (GitHub Actions)

`.github/workflows/db-backup.yml` runs every night at 02:17 UTC (and on demand: **Actions → Nightly database backup →
Run workflow**). It saves three gzip files as a workflow artifact kept for **30 days**.

1. Supabase dashboard → **Connect** (top bar) → **Session pooler** → copy the URI. It looks like
   `postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:5432/postgres`.
   Put your database password in place of `[YOUR-PASSWORD]`. (Use the session pooler, not the "direct connection":
   GitHub's runners can't reach the direct IPv6 address.)
2. GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:
   - `SUPABASE_DB_URL` = that URI.
   - `BACKUP_PASSPHRASE` = a long random passphrase (keep it in your password manager). **Required if the repo is
     public** (anyone could otherwise download the artifacts) and strongly recommended anyway.
3. Run the workflow once by hand and check it goes green.

## 7. Restoring a backup

1. GitHub → **Actions → Nightly database backup** → pick a run → download the `supabase-backup-…` artifact and unzip.
2. Decrypt (if encrypted): `gpg --decrypt bcs-…-auth-data.sql.gz.gpg > bcs-…-auth-data.sql.gz` (same for the other files).
3. Install the PostgreSQL 17 client (`psql`). Set `DB` to the **Session pooler** URI of the project you are restoring
   into (a new project, or the old one after emptying the tables).
4. New project only: do steps 1-3 above, then run `supabase/schema.sql`.
5. Empty our tables (skip on a brand-new project):
   ```sh
   psql "$DB" -c "truncate public.reports, public.paper_attempts, public.progress, public.profiles restart identity; delete from auth.users;"
   ```
6. Load the accounts, then our data. `session_replication_role = replica` stops the sign-up trigger from creating
   duplicate profiles while the users are loaded:
   ```sh
   (echo "set session_replication_role = replica;"; gunzip -c bcs-…-auth-data.sql.gz)   | psql "$DB" -v ON_ERROR_STOP=1
   (echo "set session_replication_role = replica;"; gunzip -c bcs-…-public-data.sql.gz) | psql "$DB" -v ON_ERROR_STOP=1
   ```
   On Supabase, if `set session_replication_role` is refused, run the files from the SQL Editor's "postgres" role
   instead, or temporarily `alter table auth.users disable trigger on_auth_user_created;` and re-enable it afterwards.
7. Check a few rows in the Table Editor and sign in on the site. Passwords keep working (their hashes are in the dump).
8. If you restored into a new project, update `js/config.js` with its URL and anon key, and the backup secret.

`…-public-full.sql.gz` is a reference copy of the structure and data together (useful to inspect with a text editor
after `gunzip`); the restore above uses the data-only files with the schema from the repo.

## 8. Housekeeping

- **Retention**: closed problem reports older than 12 months are removed by `select public.purge_old_reports();`. Run
  it monthly in the SQL Editor, or schedule it: Database → Extensions → enable `pg_cron`, then
  `select cron.schedule('purge-reports', '0 3 1 * *', 'select public.purge_old_reports()');`
- **Deletion requests** by email: Authentication → Users → find the user → **Delete user** (removes profile, progress and
  paper attempts; their reports stay without a user id). Backups age out after 30 days.
- **Privacy notice**: `docs/backend/privacy-notice.md` is a draft. Check it (ideally with your school's data
  protection officer), then update the in-site copy in `js/account.js` (`viewPrivacy`) and `PRIVACY_VERSION`.
- **Free plan pause**: free Supabase projects pause after a week with no activity; the site then shows "Offline" for
  sync and keeps working locally. Upgrade to Pro before relying on it for a class.
