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

// Floating drawer available on every page
function setupCalcDrawer() {
  const d = document.createElement('aside'); d.className = 'calc-drawer'; d.setAttribute('aria-label', 'Calculator');
  d.innerHTML = `<div class="cd-head"><b>🧮 Calculator</b><span><a href="#/calc" class="cd-full">full page</a><button class="cd-x" aria-label="Close">✕</button></span></div><div class="cd-body"></div>`;
  document.body.append(d);
  const c = mountCalc(d.querySelector('.cd-body'), { compact: true });
  const fab = document.createElement('button'); fab.className = 'calc-fab'; fab.title = 'Calculator (Alt+C)'; fab.textContent = '🧮'; document.body.append(fab);
  const toggle = open => { d.classList.toggle('open', open ?? !d.classList.contains('open')); if (d.classList.contains('open')) setTimeout(() => c.focus(), 50); };
  fab.onclick = () => toggle(); d.querySelector('.cd-x').onclick = () => toggle(false); d.querySelector('.cd-full').onclick = () => toggle(false);
  document.addEventListener('keydown', e => { if (e.altKey && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); toggle(); } });
  return toggle;
}
