// Settings, preferences and progress save/load (file download, progress code, merge, backup reminders).
// Progress lives in this browser's localStorage for this web address only — a new Netlify Drop deploy gets a new
// address and starts empty, so the save/load tools here are how you carry progress between deploys and devices.
'use strict';

const PREFS_KEY = 'bcsfm-prefs';
let PREFS;
try { PREFS = JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; } catch { PREFS = {}; }
PREFS.start ??= 'chooser'; PREFS.sprintN ??= 10; PREFS.size ??= 'm'; PREFS.remind ??= 7; PREFS.support ??= true; PREFS.graph ??= 'native';
const savePrefs = () => { try { localStorage.setItem(PREFS_KEY, JSON.stringify(PREFS)); } catch { } };
const applyPrefs = () => { document.documentElement.dataset.size = PREFS.size; };
applyPrefs();

const THEME_KEY = 'bcsfm-v1-theme';
const getTheme = () => { try { return localStorage.getItem(THEME_KEY) || ''; } catch { return ''; } };

/* ---------- progress payloads ---------- */
const hasProgress = () => Object.keys(DB.stats).length + Object.keys(DB.read).length + DB.bank.length + DB.notes.length > 0;
function progressPayload() {
  return { app: 'BCSFM', v: 2, saved: new Date().toISOString(), db: DB, calc: typeof CALC_STATE !== 'undefined' ? CALC_STATE : {}, prefs: { ...PREFS, lastBackup: undefined }, theme: getTheme() };
}
function readPayload(obj) {
  if (obj && obj.app === 'BCSFM' && obj.db) return obj;
  if (obj && typeof obj === 'object' && obj.stats) return { app: 'BCSFM', v: 1, db: obj }; // older backups were the raw DB
  throw new Error('not a BCSFM progress file');
}
function mergeDB(cur, inc) {
  const out = JSON.parse(JSON.stringify(cur));
  for (const [id, s] of Object.entries(inc.stats || {})) { const m = out.stats[id]; if (!m || (s.a || 0) > (m.a || 0)) out.stats[id] = s; }
  for (const [id, t] of Object.entries(inc.read || {})) out.read[id] = out.read[id] ? Math.min(out.read[id], t) : t;
  for (const [d, n] of Object.entries(inc.days || {})) out.days[d] = Math.max(out.days[d] || 0, n);
  for (const [id, c] of Object.entries(inc.conf || {})) if (c) out.conf[id] = c;
  const byId = (a, b, key = 'id') => { const seen = new Set(a.map(x => x[key])); return a.concat((b || []).filter(x => !seen.has(x[key]))); };
  out.bank = byId(out.bank, inc.bank); out.notes = byId(out.notes, inc.notes); out.sprints = byId(out.sprints, inc.sprints, 'd');
  const ip = Array.isArray(inc.papers) ? { fm: inc.papers } : (inc.papers || {});
  for (const [c, list] of Object.entries(ip)) out.papers[c] = byId(out.papers[c] || [], list);
  out.best = Math.max(out.best || 0, inc.best || 0);
  return out;
}
function applyPayload(pl, mode) {
  DB = mode === 'merge' ? mergeDB(DB, pl.db) : pl.db; normDB(); save();
  if (mode !== 'merge') {
    if (pl.calc && typeof CALC_STATE !== 'undefined') { Object.assign(CALC_STATE, pl.calc); saveCalc(); }
    if (pl.prefs) { const lb = PREFS.lastBackup; Object.assign(PREFS, pl.prefs, { lastBackup: lb }); savePrefs(); applyPrefs(); }
    if (pl.theme !== undefined) { try { pl.theme ? localStorage.setItem(THEME_KEY, pl.theme) : localStorage.removeItem(THEME_KEY); } catch { } applyTheme(pl.theme); }
  }
}
const markBackup = () => { PREFS.lastBackup = Date.now(); savePrefs(); };

function downloadProgress() {
  const blob = new Blob([JSON.stringify(progressPayload(), null, 1)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `bcsfm-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); markBackup();
}
// Progress code: gzip + base64url when the browser supports CompressionStream, plain base64url otherwise.
const b64u = bytes => { let s = ''; bytes.forEach(b => (s += String.fromCharCode(b))); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = str => { const s = atob(str.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, c => c.charCodeAt(0)); };
async function makeCode() {
  const bytes = new TextEncoder().encode(JSON.stringify(progressPayload()));
  if (typeof CompressionStream !== 'undefined') { const gz = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()); return 'BCSFM1.' + b64u(gz); }
  return 'BCSFM0.' + b64u(bytes);
}
async function readCode(code) {
  const m = /^BCSFM([01])\.([A-Za-z0-9_-]+)$/.exec(code.replace(/\s+/g, ''));
  if (!m) throw new Error('That is not a BCSFM progress code.');
  let bytes = unb64u(m[2]);
  if (m[1] === '1') { if (typeof DecompressionStream === 'undefined') throw new Error('This browser cannot read compressed codes.'); bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()); }
  return readPayload(JSON.parse(new TextDecoder().decode(bytes)));
}
function backupDue() {
  if (!PREFS.remind || !hasProgress()) return false;
  return !PREFS.lastBackup || Date.now() - PREFS.lastBackup > PREFS.remind * 864e5;
}
const backupBanner = () => backupDue() ? `<div class="box notice backup"><b>💾 Save your progress.</b> ${PREFS.lastBackup ? `Your last saved copy is from ${new Date(PREFS.lastBackup).toLocaleDateString()}.` : "You haven't saved a copy yet."} Progress is kept only in this browser for this web address — if you redeploy to a new Netlify link or switch device it won't be there. <a class="btn small primary" href="javascript:void 0" onclick="downloadProgress(); this.closest('.backup').remove()">Download progress file</a> <a class="btn small" href="#/settings">More options</a></div>` : '';

/* ---------- view ---------- */
function viewSettings() {
  const nRead = Object.keys(DB.read).length, nQ = Object.values(DB.stats).reduce((a, s) => a + (s.a || 0), 0), size = (() => { try { return (localStorage.getItem(STORE) || '').length; } catch { return 0; } })();
  const opt = (name, val, label, cur) => `<label class="radio"><input type="radio" name="${name}" value="${val}" ${String(cur) === String(val) ? 'checked' : ''}> ${label}</label>`;
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / Settings</nav>
  <header class="phead slim"><div><h1>⚙ Settings</h1><p>Save and load your progress, and set up BCSFM the way you like it.</p></div></header>

  <section class="card setsec" id="progress"><h2>💾 Your progress</h2>
    <p>${nRead} chapter${nRead === 1 ? '' : 's'} read · ${nQ} question${nQ === 1 ? '' : 's'} answered · ${DB.bank.length} past-paper question${DB.bank.length === 1 ? '' : 's'} saved · ${(size / 1024).toFixed(1)} KB.
      ${PREFS.lastBackup ? `Last saved copy: <b>${new Date(PREFS.lastBackup).toLocaleString()}</b>.` : '<b>No saved copy yet.</b>'}</p>
    <div class="box notice">Progress is stored <b>only in this browser, for this web address</b>. If you drag a new zip onto Netlify Drop you get a <b>new address that starts empty</b> — so download your progress first and load it on the new site. (To keep the same address, use "Deploys → drag and drop" on your existing Netlify site instead of a new Drop.)</div>
    <h3>Save</h3>
    <div class="row"><button class="btn primary" id="dl">⬇ Download progress file</button><button class="btn" id="mkcode">📋 Copy progress code</button></div>
    <textarea id="codeout" class="code-box" rows="3" readonly placeholder="Your progress code appears here — paste it into BCSFM on another device or site." hidden></textarea>
    <h3>Load</h3>
    <div class="row">${opt('mode', 'merge', 'Merge with what is here (keeps the best of both)', 'merge')}${opt('mode', 'replace', 'Replace everything here', 'merge')}</div>
    <div class="row"><label class="btn">⬆ Load progress file<input type="file" id="ul" accept=".json,application/json" hidden></label></div>
    <textarea id="codein" class="code-box" rows="3" placeholder="…or paste a progress code here"></textarea>
    <div class="row"><button class="btn" id="ldcode">Load code</button><span id="pmsg" class="muted small"></span></div>
    <h3>Keep it safe</h3>
    <div class="row"><label>Remind me to save a copy every <select id="remind">${[[0, 'never'], [3, '3 days'], [7, '7 days'], [14, '14 days'], [30, '30 days']].map(([v, l]) => `<option value="${v}" ${PREFS.remind === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <button class="btn small" id="persist">Ask the browser not to clear BCSFM data</button><span id="persistmsg" class="muted small"></span></div>
  </section>

  <section class="card setsec"><h2>🎨 Appearance</h2>
    <div class="setrow"><b>Theme</b><div class="row">${opt('theme', '', 'Match my device', getTheme())}${opt('theme', 'light', 'Light', getTheme())}${opt('theme', 'dark', 'Dark', getTheme())}</div></div>
    <div class="setrow"><b>Text size</b><div class="row">${opt('size', 's', 'Small', PREFS.size)}${opt('size', 'm', 'Normal', PREFS.size)}${opt('size', 'l', 'Large', PREFS.size)}${opt('size', 'xl', 'Extra large', PREFS.size)}</div></div>
  </section>

  <section class="card setsec"><h2>📚 Study</h2>
    <div class="setrow"><b>When I open BCSFM, go to</b><div class="row">${opt('start', 'chooser', 'the course chooser', PREFS.start)}${opt('start', 'last', 'the course I used last', PREFS.start)}${COURSE_ORDER.map(id => opt('start', id, COURSES[id].short, PREFS.start)).join('')}</div></div>
    <div class="setrow"><b>Sprint length</b><div class="row">${[5, 10, 15, 20].map(n => opt('sprintN', n, `${n} questions`, PREFS.sprintN)).join('')}</div></div>
    <div class="setrow"><b>Drills and sprints include</b><div class="row">${opt('support', 'true', 'every spec chapter', PREFS.support)}${opt('support', 'false', `only chapters tagged "${STATUS.core[0]}" (skip "${STATUS.check[0]}")`, PREFS.support)}</div></div>
  </section>

  <section class="card setsec"><h2>🧮 Calculator & graphs</h2>
    <div class="setrow"><b>Calculator angle mode</b><div class="row">${opt('deg', 'false', 'Radians', CALC_STATE.deg)}${opt('deg', 'true', 'Degrees', CALC_STATE.deg)}</div></div>
    <div class="setrow"><b>Calculator history</b><div class="row"><button class="btn small" id="clrhist">Clear history (${CALC_STATE.hist.length})</button></div></div>
    <div class="setrow"><b>Graph tab uses</b><div class="row">${opt('graph', 'native', 'BCSFM grapher (works offline, presets load instantly)', PREFS.graph)}${opt('graph', 'desmos', 'Desmos (needs a Desmos API key)', PREFS.graph)}</div></div>
    <div class="setrow"><b>Desmos API key</b><div class="row"><input id="dkey" class="search" placeholder="optional — from desmos.com/api" value="${esc(getDesmosKey())}"><button class="btn small" id="dsave">Save key</button></div>
      <p class="muted small">Desmos issues API keys to developers on request. Without one, the BCSFM grapher is used and each preset has an "Open in Desmos" button that copies the expressions.</p></div>
  </section>

  <section class="card setsec danger"><h2>⚠ Reset</h2>
    <div class="row">${COURSE_ORDER.map(id => `<button class="btn small" data-reset="${id}">Reset ${COURSES[id].short} progress</button>`).join('')}<button class="btn small bad" id="resetall">Erase everything on this device</button></div>
    <p class="muted small">Download a progress file first if you might want it back.</p>
  </section>
  <p class="credit center">${CREDIT}</p>`);

  const msg = t => { $('#pmsg').textContent = t; };
  $('#dl').onclick = () => { downloadProgress(); msg('Saved — keep the file somewhere safe (e.g. your Google Drive).'); };
  $('#mkcode').onclick = async () => { const code = await makeCode(), ta = $('#codeout'); ta.hidden = false; ta.value = code; ta.select(); try { await navigator.clipboard.writeText(code); msg(`Code copied (${code.length} characters).`); } catch { document.execCommand && document.execCommand('copy'); msg('Code shown above — copy it.'); } markBackup(); };
  const mode = () => app().querySelector('input[name=mode]:checked').value;
  const done = (pl, m) => { const when = pl.saved ? ` — copy saved ${new Date(pl.saved).toLocaleString()}` : ''; viewSettings(); $('#pmsg').textContent = `✓ Progress loaded (${m === 'merge' ? 'merged' : 'replaced'})${when}.`; };
  $('#ul').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const pl = readPayload(JSON.parse(t)), m = mode(); if (m === 'replace' && !confirm('Replace all progress on this device with this file?')) return; applyPayload(pl, m); done(pl, m); } catch { msg('✘ That file is not a BCSFM progress file.'); } }); };
  $('#ldcode').onclick = async () => { try { const pl = await readCode($('#codein').value), m = mode(); if (m === 'replace' && !confirm('Replace all progress on this device with this code?')) return; applyPayload(pl, m); done(pl, m); } catch (e) { msg('✘ ' + e.message); } };
  $('#remind').onchange = e => { PREFS.remind = +e.target.value; savePrefs(); };
  $('#persist').onclick = async () => { const ok = navigator.storage && navigator.storage.persist ? await navigator.storage.persist() : false; $('#persistmsg').textContent = ok ? '✓ The browser will keep BCSFM data unless you clear it yourself.' : 'The browser declined (common on some phones) — keep downloading copies.'; };
  app().querySelectorAll('input[name=theme]').forEach(r => r.onchange = () => { try { r.value ? localStorage.setItem(THEME_KEY, r.value) : localStorage.removeItem(THEME_KEY); } catch { } applyTheme(r.value); });
  app().querySelectorAll('input[name=size]').forEach(r => r.onchange = () => { PREFS.size = r.value; savePrefs(); applyPrefs(); });
  app().querySelectorAll('input[name=start]').forEach(r => r.onchange = () => { PREFS.start = r.value; savePrefs(); });
  app().querySelectorAll('input[name=sprintN]').forEach(r => r.onchange = () => { PREFS.sprintN = +r.value; savePrefs(); });
  app().querySelectorAll('input[name=support]').forEach(r => r.onchange = () => { PREFS.support = r.value === 'true'; savePrefs(); });
  app().querySelectorAll('input[name=deg]').forEach(r => r.onchange = () => { CALC_STATE.deg = r.value === 'true'; saveCalc(); });
  app().querySelectorAll('input[name=graph]').forEach(r => r.onchange = () => { PREFS.graph = r.value; savePrefs(); });
  $('#clrhist').onclick = () => { CALC_STATE.hist = []; saveCalc(); viewSettings(); };
  $('#dsave').onclick = () => { try { const k = $('#dkey').value.trim(); k ? localStorage.setItem(DESMOS_KEY_STORE, k) : localStorage.removeItem(DESMOS_KEY_STORE); } catch { } $('#dsave').textContent = 'Saved ✓'; };
  app().querySelectorAll('[data-reset]').forEach(b => b.onclick = () => { const c = COURSES[b.dataset.reset]; if (!confirm(`Reset drill progress and reading for ${c.short}? (Past-paper questions and quotes are kept.)`)) return; [...c.points, ...c.archiveTopic.points].forEach(p => { delete DB.stats[p.id]; delete DB.read[p.id]; delete DB.conf[p.id]; }); DB.sprints = DB.sprints.filter(s => (s.c || 'fm') !== c.id); save(); viewSettings(); });
  $('#resetall').onclick = () => { if (prompt('This erases ALL progress, questions and quotes on this device. Type ERASE to confirm.') !== 'ERASE') return; DB = {}; normDB(); save(); viewSettings(); };
}
