// BCS Academy online tutor: a floating "Ask" button and an Apple-style sheet that streams answers from /api/chat
// (Cloudflare Pages Function, functions/api/chat.js). Everything lives inside one function scope; only CHAT is global.
// Works offline / from file:// by showing a calm "not connected" notice and pointing physics students at the offline tutor.
'use strict';

window.CHAT = (() => {
  const KEY = 'bcs-chat-v1', MAX_KEEP = 40, MAX_SEND = 20, MAX_MSG = 4000, MAX_TOTAL = 22000, PAGE_CHARS = 6000;
  const h = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
  const I = {
    ask: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.5.2-.8.6-.8 1.1v.5"/><path d="M12 16.5h.01"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    clear: svg('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/>'),
    send: svg('<path d="M12 19V5M5 12l7-7 7 7"/>'),
    stop: svg('<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" stroke="none"/>'),
    copy: svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
    done: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  };

  // same wellbeing check as the server (functions/api/chat.js), so the help card also appears offline
  const DISTRESS = /\b(suicid\w*|kill(ing)? my ?self|end (it all|my life)|want(ed)? to die|don'?t want to (live|be alive|be here)|better off dead|self[- ]?harm\w*|hurt(ing)? my ?self|cut(ting)? my ?self|overdos\w*|no reason to live|can'?t go on|being (abused|hit|hurt) (at|by)|(he|she|they|someone|dad|mum|mom|father|mother|parent|stepdad|stepmum|brother|sister|boyfriend|girlfriend|partner) (hits|hurts|beats|touches) me|abus(e|ed|ing) me|sexual(ly)? abuse\w*|groom(ed|ing)|unsafe at home|scared to go home|run(ning)? away from home)\b/i;
  const SIGNPOST = `<div class="chat-help" role="note"><p><b>You don't have to deal with this alone.</b> This is an AI study tool and can't help with this, but these people can, right now:</p><ul><li><b>Childline</b>: call <a href="tel:08001111">0800 1111</a> (free, 24/7) or <a href="https://www.childline.org.uk" target="_blank" rel="noopener">childline.org.uk</a></li><li><b>Samaritans</b>: call <a href="tel:116123">116 123</a> (free, 24/7)</li><li><b>NHS 111</b> for urgent health help, or <b>999</b> in an emergency</li><li>A trusted adult or a teacher at school</li></ul></div>`;
  const BREAK_MS = 45 * 60e3;
  let usage = null, breakShown = false;
  let fab, scrim, sheet, list, input, sendBtn, chips, notice, sub, physLink, ready = false, busy = null, lastFocus = null, releaseBack = null;
  let hist = load();

  /* ---------- storage (per browser, capped) ---------- */
  function load() { try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v.filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string').slice(-MAX_KEEP) : []; } catch { return []; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(hist.slice(-MAX_KEEP))); } catch { /* private mode */ } }

  /* ---------- page context ---------- */
  function endpoint() { const e = typeof BCS_CONFIG !== 'undefined' && BCS_CONFIG ? BCS_CONFIG.chatEndpoint : '/api/chat'; return e == null ? '/api/chat' : String(e); }
  function canReach() { const e = endpoint(); if (!e) return false; if (location.protocol === 'file:' && !/^https?:/i.test(e)) return false; return true; }
  function routeParts() { return (location.hash.slice(1) || '/').split('?')[0].split('/').filter(Boolean); }
  function isPhysics() { return routeParts()[0] === 'physics' || document.documentElement.dataset.subject === 'physics'; }
  function context() {
    const p = routeParts(), ctx = { route: location.hash || '#/', pageTitle: document.title.replace(/\s*·\s*BCS Academy.*$/, '') };
    try {
      if (p[0] === 'physics') {
        if (p[1]) ctx.unit = p[1];
        const t = typeof PHYS !== 'undefined' && PHYS.TOPICS ? PHYS.TOPICS.find(x => x.id === p[1] || x.id === p[2]) : null;
        if (t) ctx.point = `${t.id} ${t.title || ''}`.trim();
      } else if (typeof COURSES !== 'undefined' && COURSES[p[0]]) {
        ctx.unit = p[0];
        if ((p[1] === 'point' || p[1] === 'topic') && p[2]) {
          const pt = (COURSES[p[0]].points || []).find(x => x.id === p[2]);
          ctx.point = pt ? `${pt.code || pt.id} ${pt.title || ''}`.trim() : p[2];
        }
      }
    } catch { /* context is best-effort */ }
    ctx.pageText = pageText();
    return ctx;
  }
  // visible text of the content root (main#app), with rendered KaTeX swapped back to its TeX source.
  // Never on the admin reports page: it shows other students' report messages and reply emails, which must
  // not be sent to the (third-party) tutor API just because an admin happened to have the chat widget open.
  function pageText() {
    if (document.body.dataset.route === 'admin') return '';
    const root = document.querySelector('main#app') || document.querySelector('main') || document.getElementById('app');
    if (!root) return '';
    const c = root.cloneNode(true);
    c.querySelectorAll('.katex').forEach(k => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(a ? ` $${a.textContent}$ ` : k.textContent)); });
    c.querySelectorAll('script,style,svg,canvas,button,input,select,textarea,[hidden],[aria-hidden="true"]').forEach(n => n.remove());
    return c.textContent.replace(/\s+/g, ' ').trim().slice(0, PAGE_CHARS);
  }
  function suggestions() {
    const p = routeParts(), onTopic = (p[1] === 'point' || p[1] === 'topic') || (p[0] === 'physics' && p.length > 2) || p[0] === 'sim' || (p[0] === 'lab' && p[1]);
    const hint = ['Stuck? Get a hint', "I'm stuck on a question from this page. Give me a hint or the next step, not the full answer."];
    if (onTopic) return [hint, 'Explain this more simply', 'Give me a harder example', 'Where do students lose marks?'];
    if (p[1] === 'drill' || p[1] === 'sprint') return [hint, 'Explain this more simply', 'Where do students lose marks?'];
    return [hint, 'Explain this more simply', 'What should I revise first in this unit?'];
  }

  /* ---------- light markdown that leaves TeX untouched ---------- */
  function format(src) {
    const math = [];
    let s = String(src).replace(/\$\$[\s\S]+?\$\$|\$[^$\n]+?\$/g, m => { math.push(m); return `\u0000${math.length - 1}\u0000`; });
    s = h(s);
    const inline = t => t.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,!?:;]|$)/g, '$1<i>$2</i>');
    const out = [];
    for (const block of s.split(/\n{2,}/)) {
      const lines = block.split('\n').filter(l => l.trim());
      if (!lines.length) continue;
      if (lines.every(l => /^\s*[-•*]\s+/.test(l))) out.push('<ul>' + lines.map(l => `<li>${inline(l.replace(/^\s*[-•*]\s+/, ''))}</li>`).join('') + '</ul>');
      else if (lines.every(l => /^\s*\d+[.)]\s+/.test(l))) out.push('<ol>' + lines.map(l => `<li>${inline(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('') + '</ol>');
      else if (/^#{1,4}\s/.test(lines[0]) && lines.length === 1) out.push(`<p><b>${inline(lines[0].replace(/^#+\s*/, ''))}</b></p>`);
      else out.push(`<p>${lines.map(inline).join('<br>')}</p>`);
    }
    return out.join('').replace(/\u0000(\d+)\u0000/g, (_, i) => h(math[+i]));
  }
  const typeset = el => { try { if (typeof window.renderMath === 'function') window.renderMath(el); } catch { /* KaTeX not loaded: TeX stays as text */ } };

  /* ---------- DOM ---------- */
  function build() {
    fab = document.createElement('button');
    Object.assign(fab, { type: 'button', className: 'chat-fab', title: 'Ask the tutor' });
    fab.setAttribute('aria-label', 'Ask the tutor'); fab.setAttribute('aria-haspopup', 'dialog'); fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = `${I.ask}<span>Ask</span>`;
    fab.addEventListener('click', () => (sheet.classList.contains('open') ? close() : open()));

    scrim = document.createElement('div'); scrim.className = 'chat-scrim'; scrim.addEventListener('click', () => close());
    sheet = document.createElement('section');
    sheet.className = 'chat-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-labelledby', 'chat-title'); sheet.hidden = true;
    sheet.innerHTML = `
      <header class="chat-head">
        <div class="chat-ht"><h2 id="chat-title">Tutor</h2><p class="chat-sub"></p></div>
        <button type="button" class="chat-ib chat-clear" aria-label="Clear chat" title="Clear chat">${I.clear}</button>
        <button type="button" class="chat-ib chat-x" aria-label="Close tutor" title="Close">${I.close}</button>
      </header>
      <div class="chat-list" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="chat-notice" hidden></div>
      <div class="chat-chips" role="group" aria-label="Suggested questions"></div>
      <form class="chat-bar">
        <label class="chat-sr" for="chat-in">Ask a question</label>
        <textarea id="chat-in" rows="1" maxlength="2000" placeholder="Ask about this page…" enterkeyhint="send"></textarea>
        <button type="submit" class="chat-send" aria-label="Send">${I.send}</button>
      </form>
      <p class="chat-foot"><b>AI can make mistakes — check with your notes or teacher.</b> Examples are BCS Academy originals, not CCEA papers. Chats stay in this browser. <span class="chat-usage" hidden></span><a class="chat-phys" href="#/physics/tutor" hidden>Offline physics tutor</a></p>`;
    list = sheet.querySelector('.chat-list'); input = sheet.querySelector('textarea'); sendBtn = sheet.querySelector('.chat-send');
    chips = sheet.querySelector('.chat-chips'); notice = sheet.querySelector('.chat-notice'); sub = sheet.querySelector('.chat-sub'); physLink = sheet.querySelector('.chat-phys');
    sheet.querySelector('.chat-x').addEventListener('click', () => close());
    sheet.querySelector('.chat-clear').addEventListener('click', clear);
    physLink.addEventListener('click', () => close(false));
    sheet.querySelector('form').addEventListener('submit', e => { e.preventDefault(); if (busy) stop(); else send(input.value); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); if (!busy) send(input.value); } });
    input.addEventListener('input', grow);
    sheet.addEventListener('keydown', trap);
    list.addEventListener('click', onListClick);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) { e.stopPropagation(); close(); } });
    document.body.append(fab, scrim, sheet);
  }
  function grow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 140) + 'px'; }
  function trap(e) {
    if (e.key !== 'Tab') return;
    const f = [...sheet.querySelectorAll('button,textarea,a[href],[tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled && !x.hidden && x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function refreshContext() {
    if (!ready) return;
    const t = document.title.replace(/\s*·\s*BCS Academy.*$/, '');
    sub.textContent = t && !/^BCS Academy/.test(t) ? t : 'CCEA Maths, Further Maths & Physics';
    physLink.hidden = !isPhysics();
    renderChips();
  }
  function renderChips() {
    const sug = suggestions();
    chips.innerHTML = sug.map((s, i) => `<button type="button" class="chat-chip${i ? '' : ' hint'}">${h(Array.isArray(s) ? s[0] : s)}</button>`).join('');
    chips.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => { if (!busy) send(Array.isArray(sug[i]) ? sug[i][1] : sug[i]); }));
  }
  function bubble(m, i) {
    if (m.role === 'user') return `<div class="chat-msg me" data-i="${i}"><div class="chat-b">${h(m.content).replace(/\n/g, '<br>')}</div></div>`;
    return `<div class="chat-msg bot" data-i="${i}"><div class="chat-b">${format(m.content)}</div><button type="button" class="chat-copy" aria-label="Copy answer" title="Copy">${I.copy}</button></div>`;
  }
  function renderList() {
    list.innerHTML = hist.length ? hist.map(bubble).join('') : `<div class="chat-empty"><div class="chat-logo">${I.ask}</div><p><b>Ask about this page.</b></p><p>This AI tutor explains ideas step by step. On questions you're working on it gives hints and next steps rather than full answers, so say what you've tried.</p></div>`;
    typeset(list); scrollDown();
  }
  const scrollDown = () => { list.scrollTop = list.scrollHeight; };
  function showNotice(html) { notice.innerHTML = html; notice.hidden = !html; }
  function offlineNotice(reason) {
    const link = '<a href="#/physics/tutor" class="chat-offline">Open the offline physics tutor</a>';
    showNotice(`<p>${h(reason || "The online tutor isn't connected here yet.")} Everything else on BCS Academy still works offline.</p><p>${isPhysics() ? link : 'Studying physics? ' + link + ' works without a connection.'}</p>`);
    const a = notice.querySelector('a'); if (a) a.addEventListener('click', () => close(false));
  }
  function onListClick(e) {
    const b = e.target.closest('.chat-copy'); if (!b) return;
    const m = hist[+b.closest('.chat-msg').dataset.i]; if (!m) return;
    copyText(m.content).then(() => { b.innerHTML = I.done; b.classList.add('ok'); setTimeout(() => { b.innerHTML = I.copy; b.classList.remove('ok'); }, 1400); });
  }
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).catch(() => fallbackCopy(t));
    return Promise.resolve(fallbackCopy(t));
  }
  function fallbackCopy(t) { const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0'; document.body.append(a); a.select(); try { document.execCommand('copy'); } catch { } a.remove(); }

  function showUsage() {
    const u = sheet.querySelector('.chat-usage'); if (!u) return;
    u.hidden = !usage; if (usage) u.textContent = `${usage.left} of ${usage.limit} questions left today.`;
  }
  // a gentle break reminder once per browser session after ~45 minutes of using the tutor
  function sessionNote() {
    if (breakShown) return;
    let t0 = 0; try { t0 = +sessionStorage.getItem('bcs-chat-t0') || 0; if (!t0) { t0 = Date.now(); sessionStorage.setItem('bcs-chat-t0', String(t0)); } } catch { t0 = Date.now(); }
    if (Date.now() - t0 < BREAK_MS) return;
    breakShown = true;
    const n = document.createElement('div'); n.className = 'chat-note'; n.setAttribute('role', 'note');
    n.textContent = "You've been using the tutor for about 45 minutes. A short break, then trying a question on your own, helps it stick.";
    list.append(n); scrollDown();
  }
  const signpost = () => { const d = document.createElement('div'); d.innerHTML = SIGNPOST; return d.firstChild; };

  /* ---------- open / close ---------- */
  function open(prefill) {
    init();
    lastFocus = document.activeElement;
    refreshContext(); renderList();
    if (!canReach()) offlineNotice(); else if (!busy) showNotice('');
    sheet.hidden = false; scrim.hidden = false;
    requestAnimationFrame(() => { sheet.classList.add('open'); scrim.classList.add('open'); });
    document.body.classList.add('chat-open'); fab.setAttribute('aria-expanded', 'true');
    releaseBack = trapBack(() => close());
    if (typeof prefill === 'string' && prefill) { input.value = prefill.slice(0, 2000); grow(); }
    showUsage(); sessionNote();
    setTimeout(() => { input.focus(); scrollDown(); }, 30);
  }
  function close(restore = true) {
    if (!ready || !sheet.classList.contains('open')) return;
    if (releaseBack) { releaseBack(); releaseBack = null; }
    sheet.classList.remove('open'); scrim.classList.remove('open');
    document.body.classList.remove('chat-open'); fab.setAttribute('aria-expanded', 'false');
    const done = () => { if (!sheet.classList.contains('open')) { sheet.hidden = true; scrim.hidden = true; } };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done(); else setTimeout(done, 260);
    if (restore && lastFocus && lastFocus.focus) lastFocus.focus(); else if (restore) fab.focus();
  }
  function clear() { if (busy) stop(); hist = []; save(); if (canReach()) showNotice(''); renderList(); input.focus(); }

  /* ---------- sending ---------- */
  async function token() {
    try {
      if (typeof ACCOUNT === 'undefined' || !ACCOUNT || typeof ACCOUNT.session !== 'function') return '';
      let s = ACCOUNT.session(); if (s && typeof s.then === 'function') s = await s;
      if (!s) return '';
      if (typeof s === 'string') return s;
      return s.access_token || s.accessToken || (s.session && s.session.access_token) || '';
    } catch { return ''; }
  }
  // the newest ≤20 messages that start with a student turn and fit the size limits
  function outgoing() {
    let m = hist.map(x => ({ role: x.role, content: x.content.slice(0, MAX_MSG) })).slice(-MAX_SEND);
    while (m.length && m[0].role !== 'user') m.shift();
    while (m.length > 1 && m.reduce((n, x) => n + x.content.length, 0) > MAX_TOTAL) { m.shift(); while (m.length && m[0].role !== 'user') m.shift(); }
    return m;
  }
  function stop() { if (busy) busy.abort(); }
  function setBusy(ctrl) {
    busy = ctrl;
    sendBtn.innerHTML = ctrl ? I.stop : I.send; sendBtn.setAttribute('aria-label', ctrl ? 'Stop' : 'Send');
    sheet.classList.toggle('busy', !!ctrl);
  }
  async function send(text) {
    text = String(text || '').trim(); if (!text || busy) return;
    init();
    if (!sheet.classList.contains('open')) open();
    const worried = DISTRESS.test(text);
    if (!canReach()) {
      if (worried) { input.value = ''; grow(); list.insertAdjacentHTML('beforeend', `<div class="chat-msg me"><div class="chat-b">${h(text)}</div></div>`); list.append(signpost()); scrollDown(); }
      offlineNotice(); return;
    }
    showNotice('');
    // a trailing unanswered question (e.g. after a failed send) is replaced, never doubled
    if (hist.length && hist[hist.length - 1].role === 'user') hist.pop();
    hist.push({ role: 'user', content: text.slice(0, 2000) }); save();
    input.value = ''; grow(); renderList();
    const row = document.createElement('div'); row.className = 'chat-msg bot pending'; row.innerHTML = '<div class="chat-b"><span class="chat-dots" aria-label="Thinking"><i></i><i></i><i></i></span></div>';
    let signposted = worried;
    if (worried) list.append(signpost());
    list.append(row); scrollDown();
    const ctrl = new AbortController(); setBusy(ctrl);
    let acc = '', paint = 0, lastMath = 0;
    const draw = (final) => {
      row.querySelector('.chat-b').innerHTML = format(acc) || '<span class="chat-dots"><i></i><i></i><i></i></span>';
      const now = Date.now(); if (final || now - lastMath > 350) { lastMath = now; typeset(row); }
      scrollDown();
    };
    const fail = (msg, offline) => {
      row.remove();
      if (!acc) { const q = hist.pop(); if (q && !input.value) { input.value = q.content; grow(); } save(); renderList(); if (signposted) { list.append(signpost()); scrollDown(); } }
      if (offline) offlineNotice(msg); else showNotice(`<p>${h(msg)}</p>`);
    };
    try {
      const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream' }, t = await token();
      if (t) headers.Authorization = 'Bearer ' + t;
      const res = await fetch(endpoint(), { method: 'POST', headers, body: JSON.stringify({ messages: outgoing(), context: context() }), signal: ctrl.signal });
      const type = res.headers.get('Content-Type') || '';
      if (!res.ok || !type.includes('text/event-stream')) {
        let j = null; if (type.includes('json')) { try { j = await res.json(); } catch { } }
        if (!j) return fail(null, true); // static host / 404 / not deployed
        if (res.status === 503) return fail(j.error, true);
        return fail(j.error || 'The tutor could not answer just now. Please try again.', false);
      }
      const left = res.headers.get('X-Chat-Remaining'), lim = res.headers.get('X-Chat-Limit');
      if (left != null && lim != null) { usage = { left: +left, limit: +lim }; showUsage(); }
      const reader = res.body.getReader(), dec = new TextDecoder(); let buf = '', err = null;
      for (;;) {
        const { value, done } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
          let ev = 'message', data = '';
          for (const l of chunk.split('\n')) { if (l.startsWith('event:')) ev = l.slice(6).trim(); else if (l.startsWith('data:')) data += l.slice(5).trimStart(); }
          let d; try { d = JSON.parse(data || '{}'); } catch { continue; }
          if (ev === 'delta' && d.t) { acc += d.t; if (!paint) paint = requestAnimationFrame(() => { paint = 0; draw(false); }); }
          else if (ev === 'error') err = d.error || 'Something went wrong.';
          else if (ev === 'safety' && !signposted) { signposted = true; list.insertBefore(signpost(), row); }
        }
      }
      if (paint) cancelAnimationFrame(paint);
      if (!acc) return fail(err || 'The tutor did not reply. Please try again.', false);
      finish(row, acc);
      if (err) showNotice(`<p>${h(err)}</p>`);
    } catch (e) {
      if (paint) cancelAnimationFrame(paint);
      if (e && e.name === 'AbortError') { if (acc) finish(row, acc + ' …'); else fail('Stopped.', false); }
      else if (acc) { finish(row, acc); showNotice('<p>The connection dropped before the answer finished.</p>'); }
      else fail(navigator.onLine === false ? "You're offline right now." : null, true);
    } finally { setBusy(null); }
  }
  function finish(row, text) {
    hist.push({ role: 'assistant', content: text }); save();
    row.classList.remove('pending'); row.dataset.i = String(hist.length - 1);
    row.innerHTML = bubble(hist[hist.length - 1], hist.length - 1).replace(/^<div[^>]*>|<\/div>$/g, '');
    typeset(row); scrollDown(); sessionNote();
  }

  /* ---------- init ---------- */
  function init() {
    if (ready || !document.body) return api;
    ready = true; build(); scrim.hidden = true;
    document.body.classList.add('chat-on'); // css/chat.css hides the physics module's own .phys.fab while this is active
    window.addEventListener('hashchange', () => setTimeout(refreshContext, 0));
    refreshContext();
    return api;
  }
  const api = { init, open, close, send, clear, get history() { return hist.slice(); } };
  return api;
})();
