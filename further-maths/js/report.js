// "Report a problem": REPORT.open({ unit, point }) opens an accessible sheet; reports go to the Supabase `reports`
// table (anyone may insert; RLS lets only admins read them all). Not connected or offline: the report is queued in
// this browser and sent later, with a mailto fallback offered straight away.
// Admin view: #/admin/reports (profiles.role = 'admin'): filter by status, change status, add a note, copy as a GitHub issue.
'use strict';

const REPORT = (() => {
  const CFG = typeof BCS_CONFIG !== 'undefined' ? BCS_CONFIG : {};
  const QKEY = 'bcs-report-queue', QMAX = 20;
  const KINDS = [['wrong-answer', 'Wrong answer'], ['typo', 'Typo'], ['broken-page', 'Broken page'], ['confusing', 'Confusing explanation'], ['other', 'Something else']];
  const STATUSES = [['open', 'Open'], ['fixing', 'Fixing'], ['fixed', 'Fixed'], ['wontfix', "Won't fix"]];
  const LIM = { msgMin: 5, msg: 2000, email: 200, page: 300, unit: 20, point: 40, ua: 400, note: 2000 };
  const h = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const acct = () => typeof ACCOUNT !== 'undefined' ? ACCOUNT : null;
  const connected = () => { const a = acct(); return !!(a && a.configured()); };
  const emailOk = e => e.length <= LIM.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
  const kindLabel = k => (KINDS.find(x => x[0] === k) || [k, k])[1];

  const readQ = () => { try { return JSON.parse(localStorage.getItem(QKEY)) || []; } catch { return []; } };
  const writeQ = q => { try { q.length ? localStorage.setItem(QKEY, JSON.stringify(q.slice(-QMAX))) : localStorage.removeItem(QKEY); } catch { } };

  function build(f) {
    const msg = String(f.message || '').trim(), email = String(f.email || '').trim();
    if (!KINDS.some(([k]) => k === f.kind)) throw new Error('Choose what kind of problem it is.');
    if (msg.length < LIM.msgMin) throw new Error('Tell us a little more (at least a few words).');
    if (msg.length > LIM.msg) throw new Error(`Please keep it under ${LIM.msg} characters.`);
    if (email && !emailOk(email)) throw new Error('That email address doesn\'t look right (or leave it blank).');
    const a = acct(), u = a && a.user;
    return {
      kind: f.kind, message: msg, email: u ? null : email || null, user_id: u ? u.id : null,
      page: String(f.page || location.hash || '#/').slice(0, LIM.page), unit: f.unit ? String(f.unit).slice(0, LIM.unit) : null,
      point: f.point ? String(f.point).slice(0, LIM.point) : null, user_agent: navigator.userAgent.slice(0, LIM.ua),
    };
  }
  async function insert(row) {
    const c = await acct().client();
    const { error } = await c.from('reports').insert(row); // no .select(): signed-out senders may not read reports back
    if (error) throw error;
  }
  // returns 'sent' or 'queued'
  async function send(f) {
    const row = build(f);
    if (connected()) {
      try { await insert(row); return 'sent'; } catch (e) { if (!acct().isNetErr(e)) throw e; }
    }
    const q = readQ(); q.push({ ...row, queued: new Date().toISOString() }); writeQ(q); return 'queued';
  }
  async function flush() {
    if (!connected() || !navigator.onLine) return 0;
    const q = readQ(); if (!q.length) return 0;
    let sent = 0, i = 0;
    for (; i < q.length; i++) {
      const { queued, ...row } = q[i], a = acct();
      if (row.user_id && !(a.user && a.user.id === row.user_id)) row.user_id = null; // signed out since: send anonymously
      try { await insert(row); sent++; } catch (e) { if (a.isNetErr(e)) break; } // still offline: stop; rejected rows are dropped
    }
    writeQ(q.slice(i));
    return sent;
  }
  const mailto = row => {
    const body = `${row.message}\n\n---\nKind: ${kindLabel(row.kind)}\nPage: ${row.page}${row.unit ? `\nUnit: ${row.unit}` : ''}${row.point ? `\nSpec point: ${row.point}` : ''}\nBrowser: ${row.user_agent}`;
    return `mailto:${encodeURIComponent(CFG.contactEmail || '')}?subject=${encodeURIComponent('BCS Academy problem: ' + kindLabel(row.kind))}&body=${encodeURIComponent(body)}`;
  };

  /* ---------- the sheet ---------- */
  let lastFocus = null;
  function close() {
    const el = document.getElementById('rep-sheet'); if (!el) return;
    el.classList.remove('show'); document.removeEventListener('keydown', onKey, true);
    setTimeout(() => el.remove(), 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    const el = document.getElementById('rep-sheet'); if (!el) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = [...el.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])')].filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function open(ctx = {}) {
    close(); document.getElementById('rep-sheet')?.remove();
    lastFocus = document.activeElement;
    const a = acct(), signedIn = !!(a && a.user), page = String(location.hash || '#/').slice(0, LIM.page);
    const wrap = document.createElement('div');
    wrap.id = 'rep-sheet'; wrap.className = 'rep-scrim';
    wrap.innerHTML = `<div class="rep-sheet" role="dialog" aria-modal="true" aria-labelledby="rep-title">
      <div class="rep-grab" aria-hidden="true"></div>
      <header class="rep-head"><h2 id="rep-title">Report a problem</h2><button class="rep-x" type="button" aria-label="Close">×</button></header>
      <form class="acct-form" id="rep-form" novalidate>
        <fieldset class="rep-kinds"><legend>What's wrong?</legend>
          ${KINDS.map(([k, l], i) => `<label class="rep-kind"><input type="radio" name="kind" value="${k}" ${i === 0 ? 'checked' : ''}><span>${l}</span></label>`).join('')}</fieldset>
        <div class="acct-field"><label for="rep-msg">Tell us more</label>
          <textarea id="rep-msg" name="message" rows="5" maxlength="${LIM.msg}" required aria-describedby="rep-count" placeholder="e.g. Question 3 says the answer is 12 but I think it's 21 because…"></textarea>
          <p class="acct-hint" id="rep-count">0 / ${LIM.msg}</p></div>
        ${signedIn ? '' : `<div class="acct-field"><label for="rep-email">Your email <span class="acct-opt">(optional, only if you'd like a reply)</span></label><input id="rep-email" name="email" type="email" autocomplete="email" maxlength="${LIM.email}"></div>`}
        <details class="rep-auto"><summary>Sent automatically with your report</summary>
          <dl><dt>Page</dt><dd>${h(page)}</dd>${ctx.unit ? `<dt>Unit</dt><dd>${h(ctx.unit)}</dd>` : ''}${ctx.point ? `<dt>Spec point</dt><dd>${h(ctx.point)}</dd>` : ''}<dt>Browser</dt><dd>${h(navigator.userAgent.slice(0, LIM.ua))}</dd>${signedIn ? '<dt>Account</dt><dd>Linked to your account so we can see it was you</dd>' : ''}</dl></details>
        <p class="acct-msg" id="rep-out" role="status" aria-live="polite"></p>
        <div class="rep-actions"><button class="btn" type="button" id="rep-cancel">Cancel</button><button class="btn primary" type="submit">Send report</button></div>
      </form></div>`;
    document.body.append(wrap);
    requestAnimationFrame(() => wrap.classList.add('show'));
    document.addEventListener('keydown', onKey, true);
    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    wrap.querySelector('.rep-x').onclick = close; wrap.querySelector('#rep-cancel').onclick = close;
    const ta = wrap.querySelector('#rep-msg'), cnt = wrap.querySelector('#rep-count'), out = wrap.querySelector('#rep-out');
    ta.oninput = () => { cnt.textContent = `${ta.value.length} / ${LIM.msg}`; };
    setTimeout(() => wrap.querySelector('input[name=kind]:checked').focus(), 30);
    const form = wrap.querySelector('#rep-form');
    form.onsubmit = async e => {
      e.preventDefault();
      const fd = new FormData(form), btn = form.querySelector('button[type=submit]');
      const f = { kind: String(fd.get('kind') || ''), message: String(fd.get('message') || ''), email: String(fd.get('email') || ''), page, unit: ctx.unit, point: ctx.point };
      btn.disabled = true; out.className = 'acct-msg show'; out.textContent = 'Sending…';
      try {
        const r = await send(f);
        if (r === 'sent') { form.innerHTML = `<p class="rep-done">Thanks! Your report has been sent.</p><div class="rep-actions"><button class="btn primary" type="button" id="rep-ok">Done</button></div>`; }
        else form.innerHTML = `<p class="rep-done">Saved on this device.</p><p>${connected() ? "You're offline, so it will be sent automatically next time you're connected." : "Online reporting isn't switched on yet, so it's kept here."} To send it now, email it instead:</p>
          <div class="rep-actions"><a class="btn" id="rep-mail" href="${h(mailto(build(f)))}">Send by email</a><button class="btn primary" type="button" id="rep-ok">Done</button></div>`;
        form.querySelector('#rep-ok').onclick = close; form.querySelector('#rep-ok').focus();
      } catch (err) { out.className = 'acct-msg show bad'; out.textContent = acct() ? acct().friendly(err) : String(err.message || err); btn.disabled = false; }
    };
  }
  // ready-made entry point markup: <button data-report-unit="m1" data-report-point="1.2.3">
  const button = (ctx = {}, label = 'Report a problem') => `<button type="button" class="btn small ghost rep-btn" data-report${ctx.unit ? ` data-report-unit="${h(ctx.unit)}"` : ''}${ctx.point ? ` data-report-point="${h(ctx.point)}"` : ''}>${h(label)}</button>`;
  document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-report]'); if (b) { e.preventDefault(); open({ unit: b.dataset.reportUnit, point: b.dataset.reportPoint }); } });

  /* ---------- admin ---------- */
  function issueMarkdown(r) {
    const safe = s => String(s ?? '').replace(/@/g, '@​').replace(/\r/g, ''); // no accidental @mentions
    const quote = s => safe(s).split('\n').map(l => '> ' + l).join('\n');
    return `### ${kindLabel(r.kind)}${r.unit ? ` · ${safe(r.unit)}` : ''}${r.point ? ` · ${safe(r.point)}` : ''}\n\n${quote(r.message)}\n\n` +
      `| | |\n|---|---|\n| Page | \`${safe(r.page).replace(/`/g, "'")}\` |\n| Reported | ${new Date(r.created_at).toISOString().slice(0, 16).replace('T', ' ')} UTC |\n| Status | ${r.status} |\n| Report id | ${r.id} |\n| Browser | ${safe(r.user_agent).replace(/\|/g, '/')} |\n` +
      (r.admin_note ? `\n**Admin note:** ${safe(r.admin_note)}\n` : '') + '\n_From the BCS Academy problem reports inbox._';
  }
  async function copyText(t) { try { await navigator.clipboard.writeText(t); return true; } catch { const ta = document.createElement('textarea'); ta.value = t; document.body.append(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch { } ta.remove(); return ok; } }

  const adminPage = body => `<div class="acct rep-admin"><nav class="crumbs"><a href="#/">Courses</a> / <a href="#/account">Account</a> / Problem reports</nav><header class="acct-head"><h1>Problem reports</h1></header>${body}</div>`;
  async function viewAdmin(mountFn) {
    const a = acct();
    if (!connected()) return mountFn(adminPage('<section class="acct-card"><h2>Not connected yet</h2><p>Reports need the account server. Until it is set up, reports are kept on each visitor\'s device and offered as emails.</p></section>'));
    mountFn(adminPage('<section class="acct-card"><p class="muted">Loading…</p></section>'));
    let c; try { c = await a.client(); } catch { return mountFn(adminPage('<section class="acct-card"><h2>Can\'t reach the server</h2><p>Check your connection.</p></section>')); }
    if (!a.user) return mountFn(adminPage('<section class="acct-card"><p>Sign in with an admin account to see reports.</p><p><a class="btn primary" href="#/account/signin">Sign in</a></p></section>'));
    if (!a.isAdmin()) return mountFn(adminPage('<section class="acct-card"><h2>Admins only</h2><p>This page is for the site\'s maintainers.</p></section>'));
    const filter = new URLSearchParams(location.hash.split('?')[1] || '').get('status') || 'open';
    let q = c.from('reports').select('id, user_id, page, unit, point, kind, message, email, user_agent, status, admin_note, created_at').order('created_at', { ascending: false }).limit(200);
    if (filter !== 'all') q = q.eq('status', filter);
    const { data, error } = await q;
    if (!/^#\/admin\/reports/.test(location.hash)) return; // navigated away meanwhile
    if (error) return mountFn(adminPage(`<section class="acct-card"><p class="bad">${h(a.friendly(error))}</p></section>`));
    const rows = data || [];
    mountFn(adminPage(`<div class="seg rep-filter" role="group" aria-label="Filter by status">${[...STATUSES, ['all', 'All']].map(([k, l]) => `<a class="${k === filter ? 'on' : ''}" href="#/admin/reports?status=${k}" ${k === filter ? 'aria-current="page"' : ''}>${l}</a>`).join('')}</div>
      <p class="muted small">${rows.length} report${rows.length === 1 ? '' : 's'}${rows.length === 200 ? ' (newest 200)' : ''}</p>
      ${rows.map(r => `<article class="acct-card rep-item" data-id="${h(r.id)}">
        <header class="rep-item-h"><span class="pill rep-k">${h(kindLabel(r.kind))}</span><span class="rep-when">${h(new Date(r.created_at).toLocaleString())}</span>
          <a class="rep-page" href="${h(/^#\//.test(r.page) ? r.page : '#/')}">${h(r.page)}</a>${r.unit ? `<span class="code">${h(r.unit)}</span>` : ''}${r.point ? `<span class="code">${h(r.point)}</span>` : ''}</header>
        <p class="rep-text">${h(r.message)}</p>
        <p class="acct-hint">${r.email ? `Reply to: <a href="mailto:${h(r.email)}">${h(r.email)}</a> · ` : ''}${r.user_id ? 'Signed-in user · ' : ''}${h(r.user_agent || '')}</p>
        <div class="rep-edit"><label>Status <select data-f="status">${STATUSES.map(([k, l]) => `<option value="${k}" ${r.status === k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
          <label class="rep-note">Admin note <textarea data-f="note" rows="2" maxlength="${LIM.note}">${h(r.admin_note || '')}</textarea></label>
          <div class="rep-actions"><button class="btn small primary" data-act="save">Save</button><button class="btn small" data-act="copy">Copy as GitHub issue</button><span class="acct-hint" data-out role="status" aria-live="polite"></span></div></div>
      </article>`).join('') || '<section class="acct-card"><p class="muted">Nothing here. 🎉</p></section>'}`));
    document.querySelectorAll('.rep-item').forEach(card => {
      const r = rows.find(x => String(x.id) === card.dataset.id), out = card.querySelector('[data-out]');
      card.querySelector('[data-act=save]').onclick = async () => {
        const status = card.querySelector('[data-f=status]').value, note = card.querySelector('[data-f=note]').value.trim();
        if (note.length > LIM.note) { out.textContent = `Note: up to ${LIM.note} characters.`; return; }
        const { error: e } = await c.from('reports').update({ status, admin_note: note || null }).eq('id', r.id);
        out.textContent = e ? a.friendly(e) : 'Saved ✓'; if (!e) Object.assign(r, { status, admin_note: note || null });
      };
      card.querySelector('[data-act=copy]').onclick = async () => { out.textContent = await copyText(issueMarkdown(r)) ? 'Copied ✓ Paste it into a new GitHub issue.' : 'Copy failed.'; };
    });
  }
  function route(parts, mountFn) {
    if (parts[0] === 'admin' && parts[1] === 'reports') return viewAdmin(mountFn);
    mountFn(adminPage('<section class="acct-card"><p>Nothing here. <a href="#/admin/reports">Problem reports</a></p></section>'));
  }

  // send anything queued while offline, once connected
  if (connected() && readQ().length) { if (document.readyState === 'complete') flush().catch(() => { }); else window.addEventListener('load', () => flush().catch(() => { })); }
  window.addEventListener('online', () => flush().catch(() => { }));

  return { open, close, route, button, send, flush, queue: readQ, issueMarkdown, KINDS, STATUSES };
})();
