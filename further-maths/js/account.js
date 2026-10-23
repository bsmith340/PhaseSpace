// Accounts on Supabase: sign up / in (password, emailed link or code), password reset, profile, sign out, delete account.
// Nothing loads unless BCS_CONFIG.supabaseUrl and supabaseAnonKey are set (js/config.js); without them every view shows
// a "not connected yet" state and the site works exactly as before. supabase-js is fetched lazily from jsdelivr (pinned,
// with SRI) only when an account feature is used or a saved session exists. Only the public anon key is ever used here:
// what a user can read or write is enforced by Row Level Security in supabase/schema.sql.
// Routes: #/account · #/account/signin · #/account/signup · #/account/reset · #/account/privacy
'use strict';

const ACCOUNT = (() => {
  const CFG = typeof BCS_CONFIG !== 'undefined' ? BCS_CONFIG : {};
  const SB_VER = '2.117.0';
  const SB_SRC = `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@${SB_VER}/dist/umd/supabase.js`;
  const SB_SRI = 'sha384-xPW3QHswsICVC2mW6BFNwMbhpLkbZ133fKOhxNx3QGGgAOJfL3O9t8r2aWn1aez6';
  const PRIVACY_VERSION = '2026-10-draft';
  const LIM = { name: 40, school: 80, email: 254, pwMin: 8, pwMax: 72 };
  const YEARS = [[13, 'Year 13 (AS / Lower Sixth)'], [14, 'Year 14 (A2 / Upper Sixth)'], [12, 'Year 12 (GCSE)'], ['', 'Other / prefer not to say']];
  const SUBJ = [['maths', 'Mathematics'], ['further', 'Further Mathematics'], ['physics', 'Physics']];

  // own escaper (also escapes ') so this file never depends on load order
  const h = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const configured = () => !!(CFG.supabaseUrl && CFG.supabaseAnonKey);
  const qs = () => new URLSearchParams((location.hash.split('?')[1]) || '');
  const emailOk = e => e.length <= LIM.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
  // where emailed links come back to (file:// cannot receive them, so fall back to the public site)
  const baseUrl = () => /^https?:$/.test(location.protocol) ? location.origin + location.pathname : (CFG.siteUrl || '').replace(/\/?$/, '/');

  let client = null, initP = null, libP = null;
  let user = null, profile = null, lastEvent = '';
  const subs = new Set();

  /* ---------- loading ---------- */
  function loadLib() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve(window.supabase);
    return libP ||= new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = SB_SRC; s.integrity = SB_SRI; s.crossOrigin = 'anonymous'; s.async = true;
      s.onload = () => window.supabase && window.supabase.createClient ? res(window.supabase) : rej(new Error('offline'));
      s.onerror = () => { libP = null; s.remove(); rej(new Error('offline')); };
      document.head.append(s);
    });
  }
  // A session saved by supabase-js (key sb-<project>-auth-token) or an auth callback (?code=) means: load now.
  const hasSavedSession = () => { try { return Object.keys(localStorage).some(k => /^sb-.+-auth-token$/.test(k)); } catch { return false; } };
  const hasCallback = () => /[?&](code|error_description)=/.test(location.search);

  function init() {
    if (!configured()) return Promise.resolve(null);
    return initP ||= loadLib().then(async lib => {
      client = lib.createClient(CFG.supabaseUrl, CFG.supabaseAnonKey, { auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
      // supabase-js advises not awaiting other client calls inside this callback, so defer the work
      client.auth.onAuthStateChange((event, session) => setTimeout(() => onAuth(event, session), 0));
      const { data } = await client.auth.getSession();
      await setUser(data && data.session ? data.session.user : null, 'INITIAL_SESSION');
      if (hasCallback()) { // tidy ?code= / ?error= from the address bar, keep the hash route
        const err = new URLSearchParams(location.search).get('error_description');
        history.replaceState(null, '', location.pathname + location.hash);
        if (err) flash(err);
      }
      return client;
    }).catch(e => { initP = null; client = null; throw e; });
  }
  async function onAuth(event, session) {
    await setUser(session ? session.user : null, event);
    if (event === 'PASSWORD_RECOVERY') location.hash = '#/account/reset?step=new';
    else if (event === 'SIGNED_IN' && /^#\/account\/(signin|signup)/.test(location.hash)) location.hash = '#/account';
  }
  async function setUser(u, event) {
    const changed = (u && u.id) !== (user && user.id);
    user = u || null; lastEvent = event;
    if (!user) profile = null;
    else if (changed || !profile) await loadProfile();
    refreshPills();
    if (changed || event === 'USER_UPDATED') subs.forEach(fn => { try { fn(user, profile, event); } catch (e) { console.error(e); } });
  }
  async function loadProfile() {
    if (!client || !user) return null;
    const { data, error } = await client.from('profiles').select('id, display_name, school, year_group, subjects, role, marketing_opt_in, created_at').eq('id', user.id).maybeSingle();
    if (!error) profile = data || null;
    return profile;
  }

  /* ---------- errors ---------- */
  const isNetErr = e => !navigator.onLine || /fetch|network|load failed|offline|timed? ?out/i.test(String((e && (e.message || e.name)) || e));
  function friendly(e) {
    const m = String((e && e.message) || e || '');
    if (isNetErr(e)) return "Can't reach the account server. Check your connection and try again.";
    if (/invalid login credentials/i.test(m)) return "That email and password don't match an account.";
    if (/email not confirmed/i.test(m)) return 'Confirm your email first: open the link (or enter the code) we sent you.';
    if (/already registered|already exists/i.test(m)) return 'There is already an account with that email. Sign in or reset your password.';
    if (/rate limit|too many|security purposes/i.test(m)) return 'Too many tries. Wait a minute and try again.';
    if (/token.*(expired|invalid)|otp.*(expired|invalid)|expired/i.test(m)) return 'That code or link has expired or was already used. Ask for a new one.';
    if (/password.*(weak|short|least)/i.test(m)) return `Choose a longer password (at least ${LIM.pwMin} characters).`;
    if (/same.*password|different from the old/i.test(m)) return 'Your new password must be different from the old one.';
    return m ? m.slice(0, 200) : 'Something went wrong. Try again.';
  }
  const need = async () => { const c = await init(); if (!c) throw new Error('Accounts are not connected yet.'); return c; };
  const ok = r => { if (r && r.error) throw r.error; return r ? r.data : null; };

  /* ---------- actions ---------- */
  function checkSignup(f) {
    const name = (f.name || '').trim(), email = (f.email || '').trim(), school = (f.school || '').trim();
    if (!name || name.length > LIM.name) return `Enter a display name of 1–${LIM.name} characters (a nickname is fine).`;
    if (!emailOk(email)) return 'Enter a valid email address.';
    if ((f.password || '').length < LIM.pwMin || f.password.length > LIM.pwMax) return `Your password needs ${LIM.pwMin}–${LIM.pwMax} characters.`;
    if (school.length > LIM.school) return `School name: up to ${LIM.school} characters.`;
    if (!f.consent) return 'Tick the box to say you have read the privacy notice.';
    return '';
  }
  async function signUp(f) {
    const bad = checkSignup(f); if (bad) throw new Error(bad);
    const c = await need();
    const yg = String(f.year || ''), subjects = (f.subjects || []).filter(s => SUBJ.some(([k]) => k === s));
    const data = ok(await c.auth.signUp({
      email: f.email.trim(), password: f.password,
      options: { emailRedirectTo: baseUrl() + '#/account', data: { display_name: f.name.trim(), year_group: /^1[1-4]$/.test(yg) ? yg : null, subjects, school: (f.school || '').trim() || null, marketing_opt_in: !!f.marketing, privacy_version: PRIVACY_VERSION } },
    }));
    return { confirm: !(data && data.session) }; // with "Confirm email" on there is no session until they confirm
  }
  async function signIn(email, password) {
    email = (email || '').trim();
    if (!emailOk(email)) throw new Error('Enter a valid email address.');
    if (!password) throw new Error('Enter your password.');
    ok(await (await need()).auth.signInWithPassword({ email, password }));
  }
  async function magicLink(email) {
    email = (email || '').trim();
    if (!emailOk(email)) throw new Error('Enter a valid email address.');
    ok(await (await need()).auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: baseUrl() + '#/account' } }));
  }
  // the 6-digit code in the same email works on any device (the link only on this browser, because of PKCE)
  async function verifyCode(email, code, type = 'email') {
    email = (email || '').trim(); code = String(code || '').replace(/\s+/g, '');
    if (!emailOk(email)) throw new Error('Enter a valid email address.');
    if (!/^\d{6,10}$/.test(code)) throw new Error('Enter the code from the email (numbers only).');
    ok(await (await need()).auth.verifyOtp({ email, token: code, type }));
  }
  async function resetPassword(email) {
    email = (email || '').trim();
    if (!emailOk(email)) throw new Error('Enter a valid email address.');
    ok(await (await need()).auth.resetPasswordForEmail(email, { redirectTo: baseUrl() + '#/account/reset?step=new' }));
  }
  async function updatePassword(pw) {
    if ((pw || '').length < LIM.pwMin || pw.length > LIM.pwMax) throw new Error(`Your password needs ${LIM.pwMin}–${LIM.pwMax} characters.`);
    ok(await (await need()).auth.updateUser({ password: pw }));
  }
  async function signOut() {
    const c = await need();
    try { ok(await c.auth.signOut()); } catch (e) { await c.auth.signOut({ scope: 'local' }); } // offline: still forget the session here
    await setUser(null, 'SIGNED_OUT');
  }
  async function deleteAccount() {
    const c = await need();
    ok(await c.rpc('delete_me'));
    try { await c.auth.signOut({ scope: 'local' }); } catch { }
    await setUser(null, 'SIGNED_OUT');
  }
  async function saveProfile(f) {
    const c = await need(); if (!user) throw new Error('Sign in first.');
    const name = (f.name || '').trim(), school = (f.school || '').trim(), yg = String(f.year || '');
    if (!name || name.length > LIM.name) throw new Error(`Enter a display name of 1–${LIM.name} characters.`);
    if (school.length > LIM.school) throw new Error(`School name: up to ${LIM.school} characters.`);
    const row = { display_name: name, school: school || null, year_group: /^1[1-4]$/.test(yg) ? +yg : null, subjects: (f.subjects || []).filter(s => SUBJ.some(([k]) => k === s)), marketing_opt_in: !!f.marketing };
    ok(await c.from('profiles').update(row).eq('id', user.id));
    profile = { ...(profile || {}), ...row }; refreshPills();
    subs.forEach(fn => { try { fn(user, profile, 'PROFILE_UPDATED'); } catch { } });
  }
  async function exportMine() { // data portability: everything held about you, as one JSON file
    const c = await need(); if (!user) throw new Error('Sign in first.');
    const [p, g, a, r] = await Promise.all([
      c.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      c.from('progress').select('*').eq('user_id', user.id).maybeSingle(),
      c.from('paper_attempts').select('*').eq('user_id', user.id),
      c.from('reports').select('id, page, unit, point, kind, message, status, created_at').eq('user_id', user.id),
    ]);
    [p, g, a, r].forEach(ok);
    const out = { exported: new Date().toISOString(), account: { id: user.id, email: user.email, created_at: user.created_at }, profile: p.data, progress: g.data, paper_attempts: a.data, reports: r.data };
    const blob = new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' }), el = document.createElement('a');
    el.href = URL.createObjectURL(blob); el.download = `bcs-academy-my-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(el); el.click(); el.remove(); setTimeout(() => URL.revokeObjectURL(el.href), 1500);
  }

  /* ---------- nav pill ---------- */
  const initial = () => ((profile && profile.display_name) || (user && user.email) || '?').trim().charAt(0).toUpperCase();
  function navButton() {
    if (user) {
      const name = (profile && profile.display_name) || 'Account';
      return `<a href="#/account" class="acct-pill in" data-r="account" title="Your account" aria-label="Your account: ${h(name)}"><span class="acct-av" aria-hidden="true">${h(initial())}</span><span class="acct-pill-t">${h(name)}</span></a>`;
    }
    return `<a href="#/account/signin" class="acct-pill" data-r="account" title="Sign in to sync your progress" aria-label="Sign in"><svg class="acct-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg><span class="acct-t">Sign in</span></a>`;
  }
  function refreshPills() {
    document.querySelectorAll('.acct-pill').forEach(el => {
      const on = el.classList.contains('on'), t = document.createElement('template'); t.innerHTML = navButton();
      const n = t.content.firstElementChild; if (on) { n.classList.add('on'); n.setAttribute('aria-current', 'page'); } el.replaceWith(n);
    });
  }

  /* ---------- view helpers ---------- */
  let flashMsg = '';
  const flash = m => { flashMsg = m; };
  const crumbs = t => `<nav class="crumbs"><a href="#/">Courses</a> / ${t ? `<a href="#/account">Account</a> / ${h(t)}` : 'Account'}</nav>`;
  const field = (id, label, input, hint = '') => `<div class="acct-field"><label for="${id}">${label}</label>${input}${hint ? `<p class="acct-hint" id="${id}-hint">${hint}</p>` : ''}</div>`;
  const inp = (id, type, attrs = '') => `<input id="${id}" name="${id}" type="${type}" ${attrs}>`;
  const yearSel = (cur = 13) => `<select id="a-year" name="a-year">${YEARS.map(([v, l]) => `<option value="${v}" ${String(cur ?? '') === String(v) ? 'selected' : ''}>${l}</option>`).join('')}</select>`;
  const subjChecks = (cur = []) => `<fieldset class="acct-subj"><legend>Subjects you study <span class="acct-opt">(optional)</span></legend>${SUBJ.map(([k, l]) => `<label class="acct-check"><input type="checkbox" name="a-subj" value="${k}" ${cur.includes(k) ? 'checked' : ''}> ${l}</label>`).join('')}</fieldset>`;
  const msgBox = (m = '') => `<p class="acct-msg${m ? ' show' : ''}" id="a-msg" role="status" aria-live="polite">${h(m)}</p>`;
  const privacyHref = () => CFG.privacyUrl || '#/account/privacy';
  const page = (title, sub, body, crumb) => `<div class="acct">${crumbs(crumb)}<header class="acct-head"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</header>${body}</div>`;
  const offline = () => page('Accounts', '', `<section class="acct-card"><h2>Not connected yet</h2>
    <p>Accounts and cloud sync aren't switched on for this copy of BCS Academy yet. Everything else works as normal and your progress stays in this browser.</p>
    <p>To move progress to another device, use <a href="#/settings">Settings → Save</a> (progress file or code).</p></section>`);
  const loading = () => page('Account', '', `<section class="acct-card"><p class="muted">Connecting…</p></section>`);
  const unreachable = () => page('Account', '', `<section class="acct-card"><h2>Can't reach the account server</h2><p>You might be offline. Your progress is safe in this browser and will sync when you're back online.</p><p><button class="btn" id="a-retry">Try again</button></p></section>`);

  function setMsg(m, kind = '') { const el = document.getElementById('a-msg'); if (!el) return; el.textContent = m; el.className = 'acct-msg show' + (kind ? ' ' + kind : ''); }
  // wrap a submit handler: disable the button, show errors in the live region
  function busy(form, fn) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const b = form.querySelector('button[type=submit]'); if (b) { b.disabled = true; b.setAttribute('aria-busy', 'true'); }
      try { await fn(new FormData(form)); } catch (err) { setMsg(friendly(err), 'bad'); } finally { if (b && b.isConnected) { b.disabled = false; b.removeAttribute('aria-busy'); } }
    });
  }
  const val = (fd, k) => String(fd.get(k) || '');

  /* ---------- views ---------- */
  function viewSignin(mountFn) {
    const em = qs().get('email') || '';
    mountFn(page('Sign in', 'Sign in to keep your progress in sync across your devices.', `<section class="acct-card">
      ${msgBox(flashMsg)}
      <form class="acct-form" id="a-signin" novalidate>
        ${field('a-email', 'Email', inp('a-email', 'email', `autocomplete="email" maxlength="${LIM.email}" required value="${h(em)}"`))}
        ${field('a-pw', 'Password', inp('a-pw', 'password', `autocomplete="current-password" maxlength="${LIM.pwMax}" required`))}
        <button class="btn primary acct-wide" type="submit">Sign in</button>
      </form>
      <div class="acct-or"><span>or</span></div>
      <form class="acct-form" id="a-magic" novalidate><button class="btn acct-wide" type="submit">Email me a sign-in link</button></form>
      <form class="acct-form" id="a-code" novalidate hidden>
        ${field('a-otp', 'Code from the email', inp('a-otp', 'text', 'inputmode="numeric" autocomplete="one-time-code" maxlength="10" pattern="[0-9]*"'), 'Opened the email on another device? Type the code here instead of tapping the link.')}
        <button class="btn primary acct-wide" type="submit">Sign in with code</button>
      </form>
      <p class="acct-links"><a href="#/account/reset">Forgot password?</a> · <a href="#/account/signup">Create an account</a></p>
    </section>`, 'Sign in'));
    flashMsg = '';
    const email = () => document.getElementById('a-email').value;
    busy(document.getElementById('a-signin'), async () => { await signIn(email(), document.getElementById('a-pw').value); setMsg('Signed in ✓', 'good'); location.hash = '#/account'; });
    busy(document.getElementById('a-magic'), async () => { await magicLink(email()); setMsg('Check your email: tap the link, or type the code below.', 'good'); document.getElementById('a-code').hidden = false; document.getElementById('a-otp').focus(); });
    busy(document.getElementById('a-code'), async () => { await verifyCode(email(), document.getElementById('a-otp').value, 'email'); location.hash = '#/account'; });
  }

  function viewSignup(mountFn) {
    mountFn(page('Create an account', 'Free. Your account lets you keep your progress on every device.', `<section class="acct-card">
      ${msgBox()}
      <form class="acct-form" id="a-signup" novalidate>
        ${field('a-name', 'Display name', inp('a-name', 'text', `autocomplete="nickname" maxlength="${LIM.name}" required`), "Shown only to you. It doesn't have to be your real name.")}
        ${field('a-email', 'Email', inp('a-email', 'email', `autocomplete="email" maxlength="${LIM.email}" required`))}
        ${field('a-pw', 'Password', inp('a-pw', 'password', `autocomplete="new-password" minlength="${LIM.pwMin}" maxlength="${LIM.pwMax}" required aria-describedby="a-pw-hint"`), `At least ${LIM.pwMin} characters.`)}
        ${field('a-year', 'Year group', yearSel(13))}
        ${subjChecks([])}
        ${field('a-school', 'School or college <span class="acct-opt">(optional)</span>', inp('a-school', 'text', `autocomplete="organization" maxlength="${LIM.school}"`))}
        <label class="acct-check"><input type="checkbox" id="a-mkt" name="a-mkt"> Send me occasional emails about new BCS Academy features <span class="acct-opt">(optional, off unless you tick it)</span></label>
        <label class="acct-check acct-consent"><input type="checkbox" id="a-consent" name="a-consent" required> I have read the <a href="${h(privacyHref())}" target="_blank" rel="noopener">privacy notice</a> and understand what BCS Academy stores about me.</label>
        <button class="btn primary acct-wide" type="submit">Create account</button>
      </form>
      <form class="acct-form" id="a-code" novalidate hidden>
        ${field('a-otp', 'Code from the email', inp('a-otp', 'text', 'inputmode="numeric" autocomplete="one-time-code" maxlength="10" pattern="[0-9]*"'))}
        <button class="btn primary acct-wide" type="submit">Confirm email</button>
      </form>
      <p class="acct-links">Already have an account? <a href="#/account/signin">Sign in</a></p>
    </section>`, 'Create account'));
    const form = document.getElementById('a-signup');
    busy(form, async fd => {
      const f = { name: val(fd, 'a-name'), email: val(fd, 'a-email'), password: val(fd, 'a-pw'), year: val(fd, 'a-year'), subjects: fd.getAll('a-subj').map(String), school: val(fd, 'a-school'), marketing: fd.get('a-mkt') === 'on', consent: fd.get('a-consent') === 'on' };
      const r = await signUp(f);
      if (r.confirm) { form.hidden = true; document.getElementById('a-code').hidden = false; setMsg(`Nearly done: we've emailed ${f.email}. Tap the link in it, or type the code below.`, 'good'); document.getElementById('a-otp').focus(); }
      else location.hash = '#/account';
    });
    busy(document.getElementById('a-code'), async () => { await verifyCode(document.getElementById('a-email').value, document.getElementById('a-otp').value, 'email'); location.hash = '#/account'; });
  }

  function viewReset(mountFn) {
    if (qs().get('step') === 'new' && user) {
      mountFn(page('Choose a new password', '', `<section class="acct-card">${msgBox()}
        <form class="acct-form" id="a-newpw" novalidate>
          ${field('a-pw', 'New password', inp('a-pw', 'password', `autocomplete="new-password" minlength="${LIM.pwMin}" maxlength="${LIM.pwMax}" required`), `At least ${LIM.pwMin} characters.`)}
          <button class="btn primary acct-wide" type="submit">Save password</button></form></section>`, 'Reset password'));
      busy(document.getElementById('a-newpw'), async () => { await updatePassword(document.getElementById('a-pw').value); flash('Password changed ✓'); location.hash = '#/account'; });
      return;
    }
    mountFn(page('Reset your password', "We'll email you a link and a code.", `<section class="acct-card">${msgBox()}
      <form class="acct-form" id="a-reset" novalidate>
        ${field('a-email', 'Email', inp('a-email', 'email', `autocomplete="email" maxlength="${LIM.email}" required`))}
        <button class="btn primary acct-wide" type="submit">Email me a reset link</button></form>
      <form class="acct-form" id="a-code" novalidate hidden>
        ${field('a-otp', 'Code from the email', inp('a-otp', 'text', 'inputmode="numeric" autocomplete="one-time-code" maxlength="10" pattern="[0-9]*"'), 'On another device? Type the code here.')}
        <button class="btn primary acct-wide" type="submit">Continue</button></form>
      <p class="acct-links"><a href="#/account/signin">Back to sign in</a></p></section>`, 'Reset password'));
    busy(document.getElementById('a-reset'), async () => { await resetPassword(document.getElementById('a-email').value); setMsg('If that email has an account, a reset link and code are on their way.', 'good'); document.getElementById('a-code').hidden = false; });
    busy(document.getElementById('a-code'), async () => { await verifyCode(document.getElementById('a-email').value, document.getElementById('a-otp').value, 'recovery'); location.hash = '#/account/reset?step=new'; });
  }

  function viewAccount(mountFn) {
    const p = profile || {}, isAdmin = p.role === 'admin';
    const cloud = typeof CLOUD !== 'undefined' ? CLOUD : null;
    mountFn(page(`Hi, ${h(p.display_name || 'there')}`, `Signed in as <b>${h(user.email || '')}</b>`, `
      ${flashMsg ? `<p class="acct-msg show good" role="status">${h(flashMsg)}</p>` : ''}
      <section class="acct-card"><h2>Sync</h2>
        <p class="acct-row">${cloud ? cloud.badge() : ''}<button class="btn small" id="a-sync" ${cloud ? '' : 'hidden'}>Sync now</button></p>
        <p class="acct-hint">Your progress is saved in this browser first and copied to your account a few seconds after each change, so it keeps working offline.</p></section>
      <section class="acct-card"><h2>Profile</h2>${msgBox()}
        <form class="acct-form" id="a-prof" novalidate>
          ${field('a-name', 'Display name', inp('a-name', 'text', `maxlength="${LIM.name}" required value="${h(p.display_name || '')}"`))}
          ${field('a-year', 'Year group', yearSel(p.year_group ?? ''))}
          ${subjChecks(p.subjects || [])}
          ${field('a-school', 'School or college <span class="acct-opt">(optional)</span>', inp('a-school', 'text', `maxlength="${LIM.school}" value="${h(p.school || '')}"`))}
          <label class="acct-check"><input type="checkbox" name="a-mkt" ${p.marketing_opt_in ? 'checked' : ''}> Occasional emails about new features</label>
          <button class="btn primary" type="submit">Save profile</button>
        </form></section>
      <section class="acct-card"><h2>Password</h2>
        <form class="acct-form" id="a-pwform" novalidate>
          ${field('a-pw', 'New password', inp('a-pw', 'password', `autocomplete="new-password" minlength="${LIM.pwMin}" maxlength="${LIM.pwMax}"`))}
          <button class="btn" type="submit">Change password</button></form></section>
      <section class="acct-card"><h2>Your data</h2>
        <p>See the <a href="${h(privacyHref())}">privacy notice</a> for what we keep and why.</p>
        <div class="acct-row"><button class="btn" id="a-export">Download my data</button><button class="btn" id="a-out">Sign out</button>${isAdmin ? '<a class="btn" href="#/admin/reports">Problem reports (admin)</a>' : ''}</div></section>
      <section class="acct-card acct-danger"><h2>Delete account</h2>
        <p>This permanently deletes your account, profile and synced progress. Progress in this browser is kept unless you tick the box. Problem reports you sent are kept without your name or email.</p>
        <form class="acct-form" id="a-del" novalidate>
          <label class="acct-check"><input type="checkbox" name="a-wipe"> Also erase progress stored in this browser</label>
          ${field('a-confirm', 'Type DELETE to confirm', inp('a-confirm', 'text', 'autocomplete="off" maxlength="10"'))}
          <button class="btn bad" type="submit">Delete my account</button></form></section>`));
    flashMsg = '';
    busy(document.getElementById('a-prof'), async fd => { await saveProfile({ name: val(fd, 'a-name'), year: val(fd, 'a-year'), subjects: fd.getAll('a-subj').map(String), school: val(fd, 'a-school'), marketing: fd.get('a-mkt') === 'on' }); setMsg('Profile saved ✓', 'good'); });
    busy(document.getElementById('a-pwform'), async () => { await updatePassword(document.getElementById('a-pw').value); document.getElementById('a-pw').value = ''; setMsg('Password changed ✓', 'good'); });
    busy(document.getElementById('a-del'), async fd => {
      if (val(fd, 'a-confirm').trim() !== 'DELETE') throw new Error('Type DELETE (in capitals) to confirm.');
      const wipe = fd.get('a-wipe') === 'on';
      await deleteAccount();
      if (cloud) wipe ? cloud.wipeLocal() : cloud.forget();
      flash('Your account has been deleted.'); location.hash = '#/account/signin';
    });
    document.getElementById('a-out').onclick = async () => { try { await signOut(); location.hash = '#/account/signin'; } catch (e) { setMsg(friendly(e), 'bad'); } };
    document.getElementById('a-export').onclick = async () => { try { await exportMine(); } catch (e) { setMsg(friendly(e), 'bad'); } };
    const sb = document.getElementById('a-sync'); if (sb && cloud) sb.onclick = () => cloud.syncNow();
  }

  function viewPrivacy(mountFn) {
    const contact = CFG.contactEmail ? `<a href="mailto:${h(CFG.contactEmail)}">${h(CFG.contactEmail)}</a>` : 'the contact address on the About page';
    mountFn(page('Privacy notice', '<span class="acct-draft">Draft: to be checked before accounts go live</span>', `<section class="acct-card acct-prose">
      <h2>The short version</h2>
      <p>BCS Academy works without an account. If you make one, we keep the smallest amount of information needed to save your progress, and nothing is sold or used for advertising.</p>
      <h2>What we store</h2>
      <ul><li><b>Your email and a password</b> (stored scrambled, we can't read it) so you can sign in.</li>
        <li><b>A display name</b> (a nickname is fine), <b>year group</b>, <b>subjects</b> and, only if you add it, <b>your school</b>.</li>
        <li><b>Your progress</b>: what you've read, drill scores, saved questions and notes, paper marks and settings.</li>
        <li><b>Problem reports</b> you send: the message, the page, your browser type, and an email only if you give one.</li></ul>
      <p>We never ask for your date of birth, phone number, address or photo.</p>
      <h2>Why</h2><p>To give you the service you asked for: keeping your progress in sync between devices, and fixing problems you report. Marketing emails are off unless you tick the box, and you can turn them off any time on your Account page.</p>
      <h2>Where it's kept</h2><p>With our database provider, Supabase, on servers in London (UK). Nightly encrypted backups are kept for 30 days.</p>
      <h2>How long</h2><p>Until you delete your account. Closed problem reports are deleted after 12 months. Accounts unused for 2 years may be deleted after an email warning.</p>
      <h2>Your choices</h2><ul><li><b>Download</b> everything we hold: Account → Download my data.</li><li><b>Change</b> your details: Account → Profile.</li><li><b>Delete</b> your account at any time: Account → Delete account. It's removed straight away (and from backups within 30 days).</li></ul>
      <h2>Contact</h2><p>Questions or worries: ${contact}. You can also contact the Information Commissioner's Office (ico.org.uk).</p>
      <p class="acct-hint">Version ${h(PRIVACY_VERSION)}</p></section>`, 'Privacy'));
  }

  // parts: the hash path split on "/" (e.g. ['account', 'signin']); mountFn: the app's mount(html)
  function route(parts, mountFn) {
    const sub = parts[0] === 'account' ? parts[1] : parts[0];
    if (sub === 'privacy') return viewPrivacy(mountFn);
    if (!configured()) return mountFn(offline());
    if (!client) {
      mountFn(loading());
      return init().then(() => { if (/^#\/account/.test(location.hash)) route(parts, mountFn); })
        .catch(() => { mountFn(unreachable()); const b = document.getElementById('a-retry'); if (b) b.onclick = () => route(parts, mountFn); });
    }
    if (sub === 'signup') return user ? (location.hash = '#/account') : viewSignup(mountFn);
    if (sub === 'reset') return viewReset(mountFn);
    if (sub === 'signin' || !user) return user ? (location.hash = '#/account') : viewSignin(mountFn);
    return viewAccount(mountFn);
  }

  // start quietly in the background when there is something to restore
  if (configured() && (hasSavedSession() || hasCallback())) init().catch(() => { });

  return {
    configured, init, client: () => init(), route, navButton, refreshPills,
    get user() { return user; }, get profile() { return profile; }, get lastEvent() { return lastEvent; },
    isAdmin: () => !!(profile && profile.role === 'admin'),
    onChange(fn) { subs.add(fn); return () => subs.delete(fn); },
    signUp, signIn, magicLink, verifyCode, resetPassword, updatePassword, signOut, deleteAccount, saveProfile, exportMine, loadProfile,
    friendly, isNetErr, esc: h, LIM, _setClientForTest: c => { client = c; initP = Promise.resolve(c); },
  };
})();
