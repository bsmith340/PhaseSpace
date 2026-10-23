// Cloud sync of progress (needs js/account.js and js/settings.js). This browser's localStorage stays the source of
// truth: every change is saved locally first, then pushed to the signed-in user's `progress` row 5 s after the last
// change. On sign-in the cloud copy is pulled and merged with what is here using settings.js (readPayload, mergeDB via
// applyPayload 'merge', progressPayload). Writes use an optimistic version counter: an update only lands if the row is
// still at the version we last saw; otherwise another device wrote first, so we pull, merge, push again and say so.
// Progress (scores, reading, bank, notes, papers, physics) is merged, so nothing is lost; settings-like fields
// (preferences, calculator, theme) are last-write-wins.
'use strict';

const CLOUD = (() => {
  const META_KEY = 'bcs-cloud', DEBOUNCE = 5000, POLL = 20000;
  let meta; try { meta = JSON.parse(localStorage.getItem(META_KEY)) || {}; } catch { meta = {}; }
  const saveMeta = () => { try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch { } };
  let state = 'off', detail = '', timer = 0, pushing = null, applying = false, dirty = !!meta.dirty, lastFp = '', retry = 0;
  const h = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const acct = () => typeof ACCOUNT !== 'undefined' ? ACCOUNT : null;
  const LABEL = { off: 'Not connected yet', signedout: 'Not signed in', syncing: 'Syncing…', synced: 'Synced ✓', offline: 'Offline', error: 'Sync error', pending: 'Saved here, syncing soon' };

  function set(s, d = '') {
    state = s; detail = d;
    document.querySelectorAll('.cloud-status').forEach(el => { el.dataset.state = s; el.textContent = LABEL[s]; el.title = d || LABEL[s]; });
    window.dispatchEvent(new CustomEvent('bcs:cloud', { detail: status() }));
  }
  function status() { return { state, label: LABEL[state], detail, at: meta.at || null, version: meta.version || 0, dirty }; }
  const badge = () => `<span class="cloud-status" data-state="${state}" role="status" title="${h(detail || LABEL[state])}">${LABEL[state]}</span>`;

  let toastT = 0;
  function toast(msg) {
    let el = document.getElementById('cloud-toast');
    if (!el) { el = document.createElement('div'); el.id = 'cloud-toast'; el.className = 'cloud-toast'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.append(el); }
    el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 6000);
  }

  // cheap fingerprint of everything progressPayload() reads, to notice changes made without calling touch()
  function fingerprint() {
    let s = '';
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k === 'bcsfm-v1' || k === 'bcsfm-prefs' || /^ps:|theme|calc/i.test(k)) s += k + '=' + localStorage.getItem(k) + ';'; } } catch { }
    let x = 2166136261; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return s.length + ':' + (x >>> 0);
  }
  const ready = () => { const a = acct(); return !!(a && a.configured() && a.user); };
  const user = () => acct().user;

  // something changed locally: push in 5 s (debounced)
  function touch() {
    if (applying) return;
    dirty = true; meta.dirty = true; saveMeta(); lastFp = fingerprint();
    if (!ready()) return;
    if (state !== 'offline') set('pending');
    clearTimeout(timer); timer = setTimeout(push, DEBOUNCE);
  }

  async function pull(c) {
    const { data, error } = await c.from('progress').select('data, version, updated_at').eq('user_id', user().id).maybeSingle();
    if (error) throw error;
    return data; // null when this account has never synced
  }
  // merge a cloud row into local storage; returns true if anything here changed
  function absorb(row, mode) {
    if (!row || !row.data) return false;
    let pl; try { pl = readPayload(row.data); } catch { return false; }
    const before = JSON.stringify(DB) + JSON.stringify(PHYS.exportData());
    applying = true;
    try { applyPayload(pl, mode); } finally { applying = false; }
    return before !== JSON.stringify(DB) + JSON.stringify(PHYS.exportData());
  }
  function rerender() {
    // don't throw someone out of a question they are answering
    if (typeof route === 'function' && !/^#\/([^/]+\/)?(drill|sprint|calc|lab|sim|papers|physics\/practice|account|admin)/.test(location.hash)) { try { route(); } catch { } }
  }

  async function write(c, base) {
    const data = progressPayload(), uid = user().id;
    if (!base) {
      const r = await c.from('progress').insert({ user_id: uid, data, version: 1 });
      if (r.error) { if (r.error.code === '23505') return null; throw r.error; } // another device created it first
      return 1;
    }
    const r = await c.from('progress').update({ data, version: base + 1 }).eq('user_id', uid).eq('version', base).select('version');
    if (r.error) throw r.error;
    return r.data && r.data.length ? r.data[0].version : null; // null = version moved on: conflict
  }

  async function push() {
    clearTimeout(timer);
    if (!ready()) return;
    if (pushing) { timer = setTimeout(push, DEBOUNCE); return pushing; }
    pushing = (async () => {
      const c = await acct().client(); set('syncing');
      try {
        let v = await write(c, meta.uid === user().id ? meta.version || 0 : 0), merged = false;
        for (let tries = 0; v === null && tries < 3; tries++) { // conflict: fold in the other device's copy and try again
          const row = await pull(c);
          if (absorb(row, 'merge')) merged = true;
          v = await write(c, row ? row.version : 0);
        }
        if (v === null) throw new Error('Could not save after several tries.');
        Object.assign(meta, { uid: user().id, version: v, at: new Date().toISOString(), dirty: false }); dirty = false; saveMeta(); retry = 0; lastFp = fingerprint();
        set('synced', `Last synced ${new Date(meta.at).toLocaleString()}`);
        if (merged) { toast('Progress from your other device was merged in.'); rerender(); }
      } catch (e) { fail(e); }
    })();
    try { await pushing; } finally { pushing = null; }
  }

  async function onSignIn() {
    const c = await acct().client(), uid = user().id; set('syncing');
    try {
      const row = await pull(c), other = meta.uid && meta.uid !== uid;
      let changed = false;
      if (other) { // this browser last synced a different account: don't mix their progress into this one unless asked
        const keep = dirty && confirm('This browser has progress from another account that has not been synced. Add it to the account you just signed in to?');
        if (keep) changed = absorb(row, 'merge');
        else if (row) changed = absorb(row, 'replace');
        else { blank(); changed = true; }
        dirty = true;
      } else if (row && row.version !== meta.version) changed = absorb(row, typeof hasProgress === 'function' && !hasProgress() ? 'replace' : 'merge');
      Object.assign(meta, { uid, version: row ? row.version : 0 }); saveMeta();
      if (other && row) toast('Loaded the progress saved to this account.');
      else if (changed && row) toast('Progress from your account was merged with this device.');
      if (changed) rerender();
      if (!row || dirty || changed) { dirty = true; await push(); }
      else { meta.at = row.updated_at; saveMeta(); set('synced', `Last synced ${new Date(row.updated_at).toLocaleString()}`); }
      lastFp = fingerprint();
    } catch (e) { fail(e); }
  }

  function fail(e) {
    const a = acct(); dirty = true; meta.dirty = true; saveMeta();
    if (a && a.isNetErr(e)) { set('offline', 'Saved in this browser. Will sync when you are back online.'); }
    else { set('error', a ? a.friendly(e) : String(e)); console.warn('[cloud]', e); }
    clearTimeout(timer); retry = Math.min(retry + 1, 6); timer = setTimeout(() => dirty && push(), 15000 * retry);
  }

  async function syncNow() { if (!ready()) return; dirty = true; await onSignIn(); }

  function blank() { applying = true; try { DB = {}; normDB(); save(); PHYS.resetAll(); } catch { } finally { applying = false; } }
  function wipeLocal() { blank(); forget(); } // "delete account → also erase this browser"
  function forget() { clearTimeout(timer); meta = {}; saveMeta(); dirty = false; } // account deleted: local progress becomes plain local progress

  function wire() {
    const a = acct();
    if (!a || !a.configured()) return set('off');
    set('signedout');
    a.onChange((u, p, event) => {
      if (u && event !== 'PROFILE_UPDATED' && event !== 'USER_UPDATED') onSignIn();
      else if (!u) { clearTimeout(timer); set('signedout'); }
    });
    window.addEventListener('online', () => { if (ready() && (dirty || state === 'offline')) push(); });
    window.addEventListener('offline', () => { if (ready()) set('offline', 'Saved in this browser. Will sync when you are back online.'); });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && ready() && dirty) push(); });
    lastFp = fingerprint();
    setInterval(() => { if (!ready() || applying) return; const fp = fingerprint(); if (fp !== lastFp) touch(); }, POLL);
  }
  wire();

  return { status, badge, touch, push, syncNow, wipeLocal, forget, _meta: () => meta };
})();
