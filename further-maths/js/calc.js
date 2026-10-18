// BCSFM scientific calculator: expression entry, SHIFT/HYP, DEG/RAD, complex mode, exact-value recognition, history.
'use strict';

const CALC_KEY = 'bcsfm-calc-v1';
let CALC_STATE;
try { CALC_STATE = JSON.parse(localStorage.getItem(CALC_KEY)) || {}; } catch { CALC_STATE = {}; }
CALC_STATE.hist ||= []; CALC_STATE.deg ||= false; CALC_STATE.ans ??= 0;
const saveCalc = () => { try { localStorage.setItem(CALC_KEY, JSON.stringify(CALC_STATE)); } catch { } };

function calcEvaluate(src) {
  const ast = parse(src, []);
  const ans = CALC_STATE.ans;
  if (hasI(ast) || Array.isArray(ans)) {
    const z = compileComplex(ast)({ ans: Array.isArray(ans) ? ans : [ans, 0] });
    if (Math.abs(z[1]) < 1e-12 * Math.max(1, Math.abs(z[0]))) return { real: z[0] };
    return { cx: z };
  }
  const x = compileReal(ast, { deg: CALC_STATE.deg })({ ans });
  if (Number.isNaN(x) && !CALC_STATE.deg) { const z = compileComplex(ast)({ ans: [ans, 0] }); if (z.every(isFinite) && Math.abs(z[1]) > 1e-12) return { cx: z, auto: true }; }
  return { real: x };
}
function piText(t) { const q = fracOf(t / Math.PI, 48); if (!q) return ''; const [n, d] = q; if (n === 0) return '0'; const s = n < 0 ? '−' : '', a = Math.abs(n); return `${s}${a === 1 ? '' : a}π${d === 1 ? '' : '/' + d}`; }
function calcFormat(r) {
  if (r.cx) {
    const z = r.cx, mod = Cx.abs(z), arg = Cx.arg(z), pt = piText(arg), im = identify(mod);
    return { main: fmtCx(z, 10), alt: `${r.auto ? '(complex result) ' : ''}|z| = ${fmtNum(mod, 8)}${im && im.text !== fmtNum(mod, 8) ? ' = ' + im.text : ''},  arg z = ${fmtNum(arg, 8)}${pt ? ' = ' + pt : ''}` };
  }
  const x = r.real, id = identify(x);
  return { main: fmtNum(x, 12), alt: id && id.text !== fmtNum(x, 12) ? '= ' + id.text : '' };
}

function mountCalc(root, { compact = false } = {}) {
  root.classList.add('calc'); if (compact) root.classList.add('compact');
  root.innerHTML = `
    <div class="calc-screen">
      <div class="calc-hist"></div>
      <input class="calc-in" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="type or tap, e.g. arsinh(3/4), (1+i)^8, 5!/(2!3!)">
      <div class="calc-out"><span class="calc-main">0</span><span class="calc-alt"></span></div>
      <div class="calc-flags"><span class="f-shift">SHIFT</span><span class="f-hyp">HYP</span><span class="f-ang"></span><span class="f-cx">ℂ when i used</span></div>
    </div>
    <div class="calc-keys"></div>`;
  const inp = root.querySelector('.calc-in'), main = root.querySelector('.calc-main'), alt = root.querySelector('.calc-alt'), hist = root.querySelector('.calc-hist'), keys = root.querySelector('.calc-keys');
  let shift = false, hyp = false, hIdx = -1;
  const K = [
    ['SHIFT', 'mod', 'k-mod'], ['HYP', 'mod', 'k-mod'], ['DRG', 'mod', 'k-mod'], ['(', '('], [')', ')'], ['⌫', 'del', 'k-del'],
    ['sin', 'fn:sin'], ['cos', 'fn:cos'], ['tan', 'fn:tan'], ['ln', 'fn:ln'], ['log', 'fn:log'], ['√', 'fn:sqrt'],
    ['x²', '^2'], ['xʸ', '^'], ['x⁻¹', '^(-1)'], ['x!', '!'], ['nCr', 'fn2:ncr'], ['abs', 'fn:abs'],
    ['π', 'pi'], ['e', 'e'], ['i', 'i'], [',', ','], ['ⁿ√', 'fn2:root'], ['frac', 'tofrac', 'k-mod'],
    ['7', '7'], ['8', '8'], ['9', '9'], ['÷', '/'], ['AC', 'ac', 'k-del'], ['Ans', 'ans'],
    ['4', '4'], ['5', '5'], ['6', '6'], ['×', '*'], ['−', '-'], ['×10ˣ', '*10^('],
    ['1', '1'], ['2', '2'], ['3', '3'], ['+', '+'], ['=', 'eq', 'k-eq'], ['nPr', 'fn2:npr'],
    ['0', '0'], ['.', '.'], ['(−)', '(-'], ['°', '°'], ['arg', 'fn:arg'], ['re/im', 'fn:re'],
  ];
  K.forEach(([lab, act, cls]) => { const b = document.createElement('button'); b.className = 'ck ' + (cls || (/^[0-9.]$/.test(lab) ? 'k-num' : '')); b.dataset.act = act; b.dataset.lab = lab; b.textContent = lab; keys.append(b); });
  const relabel = () => {
    keys.querySelectorAll('.ck').forEach(b => {
      const a = b.dataset.act; let t = b.dataset.lab;
      if (a.startsWith('fn:') && ['sin', 'cos', 'tan'].includes(a.slice(3))) t = (shift ? (hyp ? 'ar' : 'arc') : '') + a.slice(3) + (hyp ? 'h' : '');
      if (a === 'fn:ln' && shift) t = 'eˣ'; if (a === 'fn:log' && shift) t = '10ˣ'; if (a === 'fn:sqrt' && shift) t = '∛'; if (a === '^2' && shift) t = 'x³';
      if (a === 'fn2:ncr' && shift) t = 'nPr'; if (a === 'fn:re' && shift) t = 'im'; if (a === 'fn:arg' && shift) t = 'conj';
      b.textContent = t;
    });
    root.querySelector('.f-shift').classList.toggle('on', shift); root.querySelector('.f-hyp').classList.toggle('on', hyp);
    root.querySelector('.f-ang').textContent = CALC_STATE.deg ? 'DEG' : 'RAD';
  };
  const insert = s => { const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a; inp.value = inp.value.slice(0, a) + s + inp.value.slice(b); const p = a + s.length; inp.setSelectionRange(p, p); preview(); };
  const renderHist = () => { hist.innerHTML = CALC_STATE.hist.slice(-30).map((h, i) => `<div class="ch" data-i="${CALC_STATE.hist.length - Math.min(30, CALC_STATE.hist.length) + i}"><span class="ch-e">${escH(h.e)}</span><span class="ch-r">= ${escH(h.r)}${h.a ? ` <em>${escH(h.a)}</em>` : ''}</span></div>`).join(''); hist.scrollTop = hist.scrollHeight; };
  const escH = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  function preview() {
    const s = inp.value.trim(); if (!s) { main.textContent = '0'; alt.textContent = ''; main.classList.remove('err'); return; }
    try { const f = calcFormat(calcEvaluate(s)); main.textContent = f.main; alt.textContent = f.alt; main.classList.remove('err'); } catch (e) { main.textContent = '…'; alt.textContent = e.message; main.classList.add('err'); }
  }
  function equals() {
    const s = inp.value.trim(); if (!s) return;
    try {
      const r = calcEvaluate(s), f = calcFormat(r);
      CALC_STATE.ans = r.cx ? r.cx : r.real; CALC_STATE.hist.push({ e: s, r: f.main, a: f.alt }); if (CALC_STATE.hist.length > 200) CALC_STATE.hist.shift(); saveCalc();
      renderHist(); inp.value = ''; main.textContent = f.main; alt.textContent = f.alt; hIdx = -1;
    } catch (e) { main.textContent = 'Syntax error'; alt.textContent = e.message; main.classList.add('err'); }
  }
  keys.addEventListener('click', e => {
    const b = e.target.closest('.ck'); if (!b) return; const a = b.dataset.act;
    if (a === 'mod') { if (b.dataset.lab === 'SHIFT') shift = !shift; else if (b.dataset.lab === 'HYP') hyp = !hyp; else { CALC_STATE.deg = !CALC_STATE.deg; saveCalc(); preview(); } relabel(); return; }
    if (a === 'del') { const p = inp.selectionStart; if (p > 0) { inp.value = inp.value.slice(0, p - 1) + inp.value.slice(inp.selectionEnd); inp.setSelectionRange(p - 1, p - 1); } preview(); }
    else if (a === 'ac') { inp.value = ''; preview(); }
    else if (a === 'eq') equals();
    else if (a === 'tofrac') { const v = CALC_STATE.ans; const id = typeof v === 'number' ? identify(v) : null; alt.textContent = id ? '= ' + id.text : 'no simple exact form found'; }
    else if (a.startsWith('fn:')) {
      let f = a.slice(3);
      if (['sin', 'cos', 'tan'].includes(f)) f = (shift ? (hyp ? 'ar' : 'arc') : '') + f + (hyp ? 'h' : '');
      if (f === 'ln' && shift) f = 'exp'; if (f === 'log' && shift) { insert('10^('); shift = hyp = false; relabel(); return; }
      if (f === 'sqrt' && shift) f = 'cbrt'; if (f === 're' && shift) f = 'im'; if (f === 'arg' && shift) f = 'conj';
      insert(f + '('); shift = hyp = false; relabel();
    } else if (a.startsWith('fn2:')) { let f = a.slice(4); if (f === 'ncr' && shift) f = 'npr'; insert(f + '('); shift = false; relabel(); }
    else if (a === '^2' && shift) { insert('^3'); shift = false; relabel(); }
    else insert(a);
    if (!('ontouchstart' in window)) inp.focus();
  });
  inp.addEventListener('input', preview);
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); equals(); }
    else if (e.key === 'ArrowUp' && CALC_STATE.hist.length) { e.preventDefault(); hIdx = hIdx < 0 ? CALC_STATE.hist.length - 1 : Math.max(0, hIdx - 1); inp.value = CALC_STATE.hist[hIdx].e; preview(); }
    else if (e.key === 'ArrowDown' && hIdx >= 0) { e.preventDefault(); hIdx = Math.min(CALC_STATE.hist.length - 1, hIdx + 1); inp.value = CALC_STATE.hist[hIdx].e; preview(); }
    else if (e.key === 'Escape') { inp.value = ''; preview(); }
  });
  hist.addEventListener('click', e => { const c = e.target.closest('.ch'); if (c) { inp.value = CALC_STATE.hist[+c.dataset.i].e; preview(); inp.focus(); } });
  relabel(); renderHist(); preview();
  return { focus: () => inp.focus(), clearHistory: () => { CALC_STATE.hist = []; saveCalc(); renderHist(); } };
}

// Calculator on every page. Desktop: a popover that grows out of its button. Phone: a sheet that tracks the finger
// 1:1, can be grabbed mid-animation, and on release projects the flick's momentum to decide open or closed.
function setupCalcDrawer() {
  const d = document.createElement('aside'); d.className = 'calc-drawer'; d.setAttribute('aria-label', 'Calculator'); d.setAttribute('role', 'dialog');
  d.innerHTML = `<div class="cd-grab" aria-hidden="true"></div><div class="cd-head"><b>Calculator</b><span><a href="#/calc" class="cd-full">${ico('expand')} Full page</a><button class="cd-x" aria-label="Close calculator">${ico('close')}</button></span></div><div class="cd-body"></div>`;
  const scrim = document.createElement('div'); scrim.className = 'calc-scrim';
  const fab = document.createElement('button'); fab.className = 'calc-fab'; fab.title = 'Calculator (Alt+C)'; fab.setAttribute('aria-label', 'Calculator'); fab.innerHTML = ico('calc', 'lg');
  document.body.append(scrim, d, fab);
  const c = mountCalc(d.querySelector('.cd-body'), { compact: true });
  const sheet = () => matchMedia('(max-width: 700px)').matches;
  let open = false, H = 480, drag = null;
  // p is openness: 0 hidden … 1 open (a sheet dragged past open goes slightly above 1, rubber-banded)
  const paint = p => {
    const vis = p > 0.002, q = Math.min(1, Math.max(0, p));
    if (reducedMotion()) { d.style.transform = ''; d.style.opacity = vis ? 1 : 0; scrim.style.opacity = vis && sheet() ? 1 : 0; }
    else if (sheet()) { d.style.transform = `translate3d(0, ${((1 - p) * H).toFixed(2)}px, 0)`; d.style.opacity = vis ? 1 : 0; scrim.style.opacity = q; }
    else { d.style.transform = `translate3d(0, ${((1 - q) * 12).toFixed(2)}px, 0) scale(${(0.9 + 0.1 * q).toFixed(4)})`; d.style.opacity = q; scrim.style.opacity = 0; }
    d.classList.toggle('shown', vis); scrim.classList.toggle('shown', vis && sheet());
  };
  const S = Spring(paint, { value: 0, eps: 0.0005 });
  const setOpen = v => { open = v; d.classList.toggle('open', v); fab.setAttribute('aria-expanded', String(v)); document.body.classList.toggle('calc-open', v); };
  const toggle = want => {
    want = want ?? !open; if (want === open && !drag) return;
    setOpen(want); H = d.offsetHeight || H;
    // re-targeting keeps the current position and velocity, so a second press mid-flight simply reverses it
    S.to(want ? 1 : 0, { damping: 1, response: sheet() ? 0.4 : 0.32 });
    if (want && matchMedia('(pointer: fine)').matches) setTimeout(() => c.focus(), 40);
  };
  // drag the sheet by its grabber or header
  d.addEventListener('pointerdown', e => {
    if (!sheet() || !e.target.closest('.cd-grab, .cd-head') || e.target.closest('a, button')) return;
    H = d.offsetHeight || H;
    drag = { id: e.pointerId, y0: e.clientY, p0: S.stop(), samples: [{ y: e.clientY, t: e.timeStamp }] }; // start from the on-screen value
    try { d.setPointerCapture(e.pointerId); } catch { /* pointer already gone */ } d.classList.add('dragging');
  });
  d.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.samples.push({ y: e.clientY, t: e.timeStamp }); if (drag.samples.length > 16) drag.samples.shift();
    let p = drag.p0 - (e.clientY - drag.y0) / H;
    if (p > 1) p = 1 + rubberband((p - 1) * H, H) / H;
    S.set(p);
  });
  const release = e => {
    if (!drag || e.pointerId !== drag.id) return;
    const v = velocityOf(drag.samples); drag = null; d.classList.remove('dragging'); // px/s, positive = downward
    const rest = S.value - project(v) / H, want = rest > 0.5;
    setOpen(want);
    S.to(want ? 1 : 0, { velocity: -v / H, damping: Math.abs(v) > 400 ? 0.8 : 1, response: 0.32 }); // bounce only after a flick
  };
  d.addEventListener('pointerup', release); d.addEventListener('pointercancel', release);
  fab.onclick = () => toggle(); scrim.onclick = () => toggle(false);
  d.querySelector('.cd-x').onclick = () => toggle(false); d.querySelector('.cd-full').onclick = () => toggle(false);
  document.addEventListener('keydown', e => { if (e.altKey && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); toggle(); } });
  window.addEventListener('resize', () => { H = d.offsetHeight || H; paint(S.value); });
  paint(0);
  return toggle;
}
