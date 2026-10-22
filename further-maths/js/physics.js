// BCS Academy · Physics: CCEA GCE Physics (2016 specification), units AS 1, AS 2, A2 1 and A2 2.
// The physics lab engine (live simulations for every section, revision notes, randomised drills, mock tests and a
// tutor), ported from the Phase Space site. It runs inside one function scope so none of its names reach the maths
// code; the BCS Academy shell talks to it only through the PHYS object returned at the bottom.
const PHYS = (() => {
'use strict';
/* ================= core ================= */
const TAU = Math.PI * 2, DEG = Math.PI / 180;
const clamp = (x, a, b) => x < a ? a : x > b ? b : x;
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); }
const hyp = Math.hypot;

/* ---------- DOM ---------- */
function el(tag, props, ...kids) {
  const e = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(3)) if (c != null && c !== false) e.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return e;
}
const H = (tag, cls, html) => el(tag, { class: cls, html });

/* ---------- storage (per-viewer conveniences only) ---------- */
const Store = {
  get(k, d) { try { const v = localStorage.getItem('ps:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('ps:' + k, JSON.stringify(v)); } catch (e) {} }
};

/* ---------- numbers ---------- */
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '' };
const supx = s => String(s).split('').map(c => SUP[c] ?? c).join('');
function sci(x, sf = 3) {
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = +(x / Math.pow(10, e)).toPrecision(sf);
  if (Math.abs(m) >= 10) { m /= 10; e += 1; }
  return `${m.toFixed(Math.max(0, sf - 1)).replace('-', '−')} × 10${supx(e)}`;
}
function num(x, sf = 3) {
  if (!isFinite(x)) return '—';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) return sci(x, sf);
  let s = x.toPrecision(sf);
  if (s.includes('e')) s = String(Number(s));
  return s.replace('-', '−');
}
const fix = (x, d = 2) => isFinite(x) ? x.toFixed(d).replace('-', '−') : '—';
function parseNum(str) {
  if (str == null) return NaN;
  let s = String(str).trim().replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/,/g, '');
  // unicode superscripts → ^n
  const U = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
  s = s.replace(/10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (m, g) => '10^' + g.split('').map(c => U[c]).join(''));
  const m = s.match(/^([-+]?(?:\d+\.?\d*|\.\d+))(?:(?:[x×*]10\^?\(?([-+]?\d+)\)?)|(?:[eE]([-+]?\d+)))?$/);
  if (!m) return NaN;
  const e = m[2] ?? m[3];
  return parseFloat(m[1]) * (e != null ? Math.pow(10, parseInt(e, 10)) : 1);
}

/* ---------- theme ---------- */
const Theme = {
  c: {},
  keys: ['paper', 'paper-2', 'paper-3', 'grid', 'grid-2', 'ink', 'ink-2', 'muted', 'line', 'line-2', 'blue', 'red', 'orange', 'green', 'violet', 'cyan', 'on-blue'],
  refresh() {
    const s = getComputedStyle(document.documentElement);
    for (const k of this.keys) this.c[k.replace('-', '')] = s.getPropertyValue('--ps-' + k).trim();
    this.dark = s.getPropertyValue('color-scheme').includes('dark');
  },
  isDark() { return this.dark; },
  set(mode) { document.documentElement.setAttribute('data-theme', mode); this.refresh(); window.dispatchEvent(new Event('ps-theme')); }
};
// always-dark backdrop for space scenes, CRT screens and emission spectra (works in both themes)
const SPACE = () => Theme.isDark() ? Theme.c.paper : Theme.c.ink;
function alpha(hex, a) {
  if (!hex) return `rgba(0,0,0,${a})`;
  if (hex.startsWith('#')) {
    let h = hex.slice(1); if (h.length === 3) h = h.split('').map(c => c + c).join('');
    const n = parseInt(h, 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
  }
  return hex;
}

/* ---------- mini TeX → HTML ---------- */
const GREEK = { alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', epsilon: 'ε', varepsilon: 'ε', theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ', tau: 'τ', phi: 'φ', omega: 'ω', Omega: 'Ω', eta: 'η', nu: 'ν' };
const TSYM = { times: '×', cdot: '·', approx: '≈', propto: '∝', Rightarrow: '⇒', to: '→', pm: '±', langle: '⟨', rangle: '⟩', infty: '∞', le: '≤', ge: '≥', neq: '≠', ll: '≪', circ: '°', ldots: '…', ',': ' ', ';': ' ', ' ': ' ', quad: ' ', '%': '%' };
const RELS = new Set(['approx', 'propto', 'Rightarrow', 'to', 'le', 'ge', 'neq', 'll', 'times', 'pm']);
function tex(src) {
  let i = 0, lvl = 0;
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function group() { let out = ''; while (i < src.length) { if (src[i] === '}') { i++; return out; } out += atom(out); } return out; }
  function arg() { while (src[i] === ' ') i++; if (src[i] === '{') { i++; return group(); } return atom(''); }
  function scriptArg() { lvl++; const r = arg(); lvl--; return r; }
  function atom(prev) {
    const c = src[i];
    if (c === '\\') {
      i++; let name = '';
      if (/[a-zA-Z]/.test(src[i])) { while (i < src.length && /[a-zA-Z]/.test(src[i])) name += src[i++]; }
      else name = src[i++];
      if (name === 'frac') { const a = arg(), b = arg(); return `<span class="fr"><span>${a}</span><span>${b}</span></span>`; }
      if (name === 'sqrt') { const a = arg(); return `<span class="sq">√<span>${a}</span></span>`; }
      if (name === 'text' || name === 'mathrm') {
        while (src[i] === ' ') i++;
        if (src[i] === '{') { i++; let d = 1, s = ''; while (i < src.length) { const ch = src[i++]; if (ch === '{') d++; else if (ch === '}') { if (!--d) break; } s += ch; } return `<span class="tx">${esc(s)}</span>`; }
        return '';
      }
      if (GREEK[name]) return name[0] === name[0].toUpperCase() ? `<span class="tx">${GREEK[name]}</span>` : `<i>${GREEK[name]}</i>`;
      if (TSYM[name] != null) return RELS.has(name) && !lvl ? `<span class="op">${TSYM[name]}</span>` : TSYM[name];
      if (name === '{' || name === '}') return name;
      return esc(name);
    }
    if (c === '{') { i++; return group(); }
    if (c === '^') { i++; return `<sup>${scriptArg()}</sup>`; }
    if (c === '_') { i++; return `<sub>${scriptArg()}</sub>`; }
    if (c === ' ') { i++; return ''; }
    if (/[a-zA-Z]/.test(c)) { i++; return `<i>${c}</i>`; }
    if ('=+<>'.includes(c)) { i++; const g = esc(c); return lvl ? g : `<span class="op">${g}</span>`; }
    if (c === '-') { i++; return (lvl || !prev) ? '−' : `<span class="op">−</span>`; }
    if (c === "'") { i++; return '′'; }
    i++; return esc(c);
  }
  return `<span class="m">${group()}</span>`;
}
const T = tex;

/* ---------- canvas stage ---------- */
function Stage(parent, o = {}) {
  const { aspect = 1.6, minH = 240, maxH = 540, plain = false, mobileAspect } = o;
  const wrap = el('div', { class: 'stage' + (plain ? ' plain' : '') + (o.cls ? ' ' + o.cls : '') });
  const cv = el('canvas', { 'aria-label': o.label || 'simulation' });
  wrap.append(cv); parent.append(wrap);
  if (o.tag) wrap.append(el('div', { class: 'overlay-tag' }, o.tag));
  const ctx = cv.getContext('2d');
  const S = { cv, ctx, wrap, w: 0, h: 0, dpr: 1, visible: true, onresize: null };
  function resize() {
    const w = Math.floor(wrap.clientWidth); if (!w) return;
    const asp = (mobileAspect && w < 560) ? mobileAspect : aspect;
    let h = Math.round(clamp(w / asp, minH, maxH));
    if (S.fill) { const ft = fillTarget(); if (ft > h) h = Math.round(Math.min(ft, 1100)); }
    if (w === S.w && h === S.h) return;
    S.dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * S.dpr); cv.height = Math.round(h * S.dpr); cv.style.height = h + 'px';
    S.w = w; S.h = h; S.onresize && S.onresize(); S.draw && S.draw();
  }
  function fillTarget() {
    if (window.innerWidth <= 940) return 0;
    const plate = wrap.closest('.plate'); if (!plate) return 0;
    const side = plate.querySelector('.plate-side'), tb = plate.querySelector('.tb'), box = plate.querySelector('.plate-stage');
    const lc = side && side.lastElementChild; if (!lc || !box) return 0;
    const sideH = lc.getBoundingClientRect().bottom - side.getBoundingClientRect().top + 16;
    let others = 0; for (const ch of box.children) others += ch.getBoundingClientRect().height;
    others -= wrap.getBoundingClientRect().height;
    return sideH - (tb ? tb.getBoundingClientRect().height : 0) - others;
  }
  S.setFill = () => { S.fill = true; S.w = 0; resize(); S.fillTimer = setInterval(resize, 500); };
  const ro = new ResizeObserver(resize); ro.observe(wrap);
  const io = new IntersectionObserver(es => { S.visible = es[es.length - 1].isIntersecting; }); io.observe(wrap);
  resize();
  S.begin = () => { ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0); ctx.clearRect(0, 0, S.w, S.h); return ctx; };
  S.destroy = () => { ro.disconnect(); io.disconnect(); if (S.fillTimer) clearInterval(S.fillTimer); };
  return S;
}
function Pointer(S, h) {
  let active = null;
  S.cv.style.touchAction = h.scroll ? 'pan-y' : 'none';
  const pos = e => { const r = S.cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const isHit = t => t !== null && t !== undefined && t !== false;
  S.cv.addEventListener('pointerdown', e => {
    const [x, y] = pos(e); const t = h.hit ? h.hit(x, y) : true;
    if (!isHit(t)) return;
    active = t; try { S.cv.setPointerCapture(e.pointerId); } catch (_) {}
    S.cv.style.cursor = 'grabbing';
    h.down && h.down(t, x, y, e); h.move && h.move(t, x, y, e); e.preventDefault();
  });
  S.cv.addEventListener('pointermove', e => {
    const [x, y] = pos(e);
    if (isHit(active)) { h.move && h.move(active, x, y, e); }
    else if (h.hit && e.pointerType === 'mouse') S.cv.style.cursor = isHit(h.hit(x, y)) ? 'grab' : 'default';
    h.hover && h.hover(x, y);
  });
  const end = () => { if (isHit(active)) { h.up && h.up(active); active = null; S.cv.style.cursor = 'default'; } };
  S.cv.addEventListener('pointerup', end); S.cv.addEventListener('pointercancel', end);
  S.cv.addEventListener('pointerleave', () => h.leave && h.leave());
}
function Loop(fn, stages) {
  let raf = 0, last = performance.now(), on = true;
  const vis = () => !stages || !stages.length || stages.some(s => s.visible);
  let first = true;
  function f(now) {
    if (!on) return;
    let dt = (now - last) / 1000; last = now; if (dt > 0.05) dt = 0.05; if (dt < 0) dt = 0;
    if (first || (vis() && !document.hidden)) { first = false; fn(dt * (window.PS_SPEED || 1), now / 1000); }
    raf = requestAnimationFrame(f);
  }
  raf = requestAnimationFrame(f);
  return () => { on = false; cancelAnimationFrame(raf); };
}

/* ---------- canvas drawing helpers ---------- */
const SANS = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Inter, system-ui, sans-serif';
const FONT = {
  ui: (s, w = 500) => `${w} ${s}px ${SANS}`,
  mono: (s, w = 500) => `${w} ${s}px "SF Mono", ui-monospace, Menlo, Consolas, monospace`,
  math: (s, it = true) => `${it ? 'italic ' : ''}${s}px KaTeX_Main, "Times New Roman", serif`,
  disp: (s, w = 700) => `${w} ${s}px ${SANS}`
};
// rich text: *italic math* segments, rest upright UI font
function richSegs(ctx, str, size, o) {
  const segs = String(str).split('*').map((p, i) => ({ t: p, f: i % 2 ? FONT.math(size * 1.15) : (o.mono ? FONT.mono(size, o.w || 500) : FONT.ui(size, o.w || 500)) })).filter(s => s.t);
  let W = 0; for (const s of segs) { ctx.font = s.f; s.w = ctx.measureText(s.t).width; W += s.w; }
  return { segs, W };
}
function rich(ctx, str, x, y, o = {}) {
  str = String(str);
  let size = o.size || 13; const align = o.align || 'left', base = o.base || 'middle';
  let { segs, W } = richSegs(ctx, str, size, o);
  // keep labels inside the canvas at phone widths: wrap long plain labels onto two lines, otherwise shrink
  if (o.fit !== false) {
    const tr = ctx.getTransform();
    if (!tr.b && !tr.c && !tr.e && !tr.f && tr.a > 0) {
      const cw = ctx.canvas.width / tr.a, avail = align === 'center' ? 2 * Math.min(x, cw - x) - 8 : align === 'right' ? x - 6 : cw - x - 6;
      if (W > avail && avail > 50) {
        const sp = str.lastIndexOf(' ', Math.floor(str.length / 2)), sp2 = str.indexOf(' ', Math.floor(str.length / 2));
        const cut = sp < 0 ? sp2 : sp2 < 0 ? sp : (str.length / 2 - sp < sp2 - str.length / 2 ? sp : sp2);
        if (!o._line && base === 'middle' && W / avail > 1.12 && cut > 0 && (str.slice(0, cut).split('*').length % 2 === 1)) {
          const lh = size * 1.28, q = Object.assign({}, o, { _line: true });
          return Math.max(rich(ctx, str.slice(0, cut), x, y - lh / 2, q), rich(ctx, str.slice(cut + 1), x, y + lh / 2, q));
        }
        size = Math.max(size * 0.62, size * avail / W); ({ segs, W } = richSegs(ctx, str, size, o));
      }
    }
  }
  let cx = align === 'center' ? x - W / 2 : align === 'right' ? x - W : x;
  ctx.textBaseline = base; ctx.textAlign = 'left';
  if (o.color) ctx.fillStyle = o.color;
  if (o.bg) { ctx.save(); ctx.fillStyle = o.bg; const hh = size * 1.5; ctx.fillRect(cx - 4, (base === 'middle' ? y - hh / 2 : base === 'bottom' ? y - hh : y) - 1, W + 8, hh + 2); ctx.restore(); if (o.color) ctx.fillStyle = o.color; }
  for (const s of segs) { ctx.font = s.f; ctx.fillText(s.t, cx, y); cx += s.w; }
  return W;
}
function arrow(ctx, x1, y1, x2, y2, o = {}) {
  const color = o.color || Theme.c.ink, w = o.width || 2, head = o.head || Math.max(8, w * 4);
  const L = hyp(x2 - x1, y2 - y1); if (L < 0.5) return;
  const ux = (x2 - x1) / L, uy = (y2 - y1) / L; const hl = Math.min(head, L * 0.6);
  ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
  if (o.dash) ctx.setLineDash(o.dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hl * 0.8, y2 - uy * hl * 0.8); ctx.stroke();
  ctx.setLineDash([]);
  const hw = hl * 0.45;
  ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * hl - uy * hw, y2 - uy * hl + ux * hw); ctx.lineTo(x2 - ux * hl + uy * hw, y2 - uy * hl - ux * hw); ctx.closePath(); ctx.fill();
  if (o.both) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + ux * hl - uy * hw, y1 + uy * hl + ux * hw); ctx.lineTo(x1 + ux * hl + uy * hw, y1 + uy * hl - ux * hw); ctx.closePath(); ctx.fill(); }
  ctx.restore();
}
function line(ctx, pts, o = {}) {
  if (!pts.length) return;
  ctx.save(); ctx.strokeStyle = o.color || Theme.c.ink; ctx.lineWidth = o.width || 1.5; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (o.dash) ctx.setLineDash(o.dash); if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
  if (o.close) ctx.closePath(); ctx.stroke(); ctx.restore();
}
function dot(ctx, x, y, r, color, stroke) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = color; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); } }
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function handle(ctx, x, y, color, active) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, active ? 10 : 8, 0, TAU); ctx.fillStyle = alpha(color, .18); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, 5, 0, TAU); ctx.fillStyle = Theme.c.paper2; ctx.fill(); ctx.lineWidth = 2.5; ctx.strokeStyle = color; ctx.stroke(); ctx.restore();
}
function springPath(x, y1, y2, coils = 12, amp = 10) {
  const pts = [[x, y1]]; const L = y2 - y1; const lead = Math.min(10, L * 0.1);
  pts.push([x, y1 + lead]);
  const n = coils * 2; for (let k = 1; k < n; k++) { const t = k / n; pts.push([x + (k % 2 ? amp : -amp), y1 + lead + t * (L - 2 * lead)]); }
  pts.push([x, y2 - lead]); pts.push([x, y2]); return pts;
}
// wavelength (nm) → css colour
function wlColor(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; } else if (nm < 490) { g = (nm - 440) / 50; b = 1; } else if (nm < 510) { g = 1; b = -(nm - 510) / 20; } else if (nm < 580) { r = (nm - 510) / 70; g = 1; } else if (nm < 645) { r = 1; g = -(nm - 645) / 65; } else if (nm <= 780) { r = 1; }
  let f = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40 : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1; if (nm < 380 || nm > 780) f = 0;
  const c = v => Math.round(255 * Math.pow(v * f, 0.8));
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/* ---------- circuit symbols ---------- */
// comp(ctx, type, x1, y1, x2, y2, o): draws leads plus a symbol centred between the two points (axis-aligned or angled)
function comp(ctx, type, x1, y1, x2, y2, o = {}) {
  const C = Theme.c, col = o.color || C.ink, L = hyp(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1), sz = o.size || 34;
  ctx.save(); ctx.translate(x1, y1); ctx.rotate(ang); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = o.width || 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const m = L / 2, a = m - sz / 2, b = m + sz / 2;
  const lead = (p, q) => { ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(q, 0); ctx.stroke(); };
  const box = (w, h) => { ctx.strokeRect(m - w / 2, -h / 2, w, h); };
  const circ = r => { ctx.beginPath(); ctx.arc(m, 0, r, 0, TAU); ctx.fillStyle = C.paper2; ctx.fill(); ctx.stroke(); ctx.fillStyle = col; };
  const letter = t => { ctx.save(); ctx.rotate(0); ctx.translate(m, 0); ctx.rotate(-ang); ctx.font = FONT.ui(13, 700); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t, 0, 1); ctx.restore(); };
  if (type === 'wire') lead(0, L);
  else if (type === 'resistor' || type === 'variable' || type === 'thermistor' || type === 'ldr') {
    lead(0, a); lead(b, L); box(sz, sz * 0.36);
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fillRect(m - sz / 2 + 1, -sz * 0.18 + 1, sz - 2, sz * 0.36 - 2); ctx.fillStyle = col; }
    if (type === 'variable') { ctx.beginPath(); ctx.moveTo(m - sz * 0.55, sz * 0.4); ctx.lineTo(m + sz * 0.55, -sz * 0.4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(m + sz * 0.55, -sz * 0.4); ctx.lineTo(m + sz * 0.35, -sz * 0.36); ctx.lineTo(m + sz * 0.48, -sz * 0.22); ctx.closePath(); ctx.fill(); }
    if (type === 'thermistor') { ctx.beginPath(); ctx.moveTo(m - sz * 0.6, sz * 0.4); ctx.lineTo(m + sz * 0.4, -sz * 0.4); ctx.lineTo(m + sz * 0.62, -sz * 0.4); ctx.stroke(); }
    if (type === 'ldr') { circ(sz * 0.62); box(sz * 0.8, sz * 0.3); for (const d of [-8, 4]) { ctx.save(); ctx.translate(m - sz * 0.9 + d, -sz * 0.95); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(9, 9); ctx.stroke(); ctx.beginPath(); ctx.moveTo(9, 9); ctx.lineTo(3, 7); ctx.lineTo(7, 3); ctx.closePath(); ctx.fill(); ctx.restore(); } }
  } else if (type === 'cell' || type === 'battery') {
    const g = 7; lead(0, m - g / 2); lead(m + g / 2, L);
    ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(m - g / 2, -sz * 0.45); ctx.lineTo(m - g / 2, sz * 0.45); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(m + g / 2, -sz * 0.25); ctx.lineTo(m + g / 2, sz * 0.25); ctx.stroke();
    if (type === 'battery') { ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(m - g * 2, -sz * 0.45); ctx.lineTo(m - g * 2, sz * 0.45); ctx.stroke(); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(m - g, -sz * 0.25); ctx.lineTo(m - g, sz * 0.25); ctx.stroke(); }
  } else if (type === 'lamp') { lead(0, a); lead(b, L); circ(sz / 2); const r = sz / 2 * 0.7; ctx.beginPath(); ctx.moveTo(m - r, -r); ctx.lineTo(m + r, r); ctx.moveTo(m - r, r); ctx.lineTo(m + r, -r); ctx.stroke(); if (o.glow) { ctx.fillStyle = alpha(C.orange, Math.min(0.8, o.glow)); ctx.beginPath(); ctx.arc(m, 0, sz / 2 + 6 * o.glow, 0, TAU); ctx.fill(); } }
  else if (type === 'ammeter' || type === 'voltmeter') { lead(0, a + sz * 0.1); lead(b - sz * 0.1, L); circ(sz * 0.4); letter(type === 'ammeter' ? 'A' : 'V'); }
  else if (type === 'diode') { lead(0, a); lead(b, L); const h = sz * 0.36; ctx.beginPath(); ctx.moveTo(m - h, -h); ctx.lineTo(m + h * 0.8, 0); ctx.lineTo(m - h, h); ctx.closePath(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(m + h * 0.8, -h); ctx.lineTo(m + h * 0.8, h); ctx.stroke(); lead(m - h, m + h * 0.8); }
  else if (type === 'capacitor') { const g = 8; lead(0, m - g / 2); lead(m + g / 2, L); ctx.lineWidth = 2.6; for (const d of [-g / 2, g / 2]) { ctx.beginPath(); ctx.moveTo(m + d, -sz * 0.4); ctx.lineTo(m + d, sz * 0.4); ctx.stroke(); } }
  else if (type === 'switch') { lead(0, a); lead(b, L); dot(ctx, a, 0, 3, col); dot(ctx, b, 0, 3, col); ctx.beginPath(); ctx.moveTo(a, 0); if (o.closed) ctx.lineTo(b, 0); else ctx.lineTo(b - 3, -sz * 0.45); ctx.stroke(); }
  ctx.restore();
  if (o.label) { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, sd = o.side || -1, nx = -Math.sin(ang) * sd, ny = Math.cos(ang) * sd, vert = Math.abs(nx) > 0.7, d = o.ld || (vert ? sz * 0.5 + 8 : sz * 0.4 + 12); rich(ctx, o.label, mx + nx * d, my + ny * d, { align: vert ? (nx > 0 ? 'left' : 'right') : 'center', size: o.ls || 12, color: o.lc || C.ink2, w: 600 }); }
}
// animated charge carriers along a closed polyline; phase in [0,1)
function flowDots(ctx, pts, phase, n, color, r = 2.6) {
  const seg = []; let tot = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; const l = hyp(q[0] - p[0], q[1] - p[1]); seg.push([p, q, l]); tot += l; }
  for (let k = 0; k < n; k++) { let d = ((k / n + phase) % 1 + 1) % 1 * tot; for (const [p, q, l] of seg) { if (d <= l) { dot(ctx, p[0] + (q[0] - p[0]) * d / l, p[1] + (q[1] - p[1]) * d / l, r, color); break; } d -= l; } }
}
function meter(ctx, x, y, text, o = {}) { const C = Theme.c; ctx.font = FONT.mono(o.size || 13, 600); const w = ctx.measureText(text).width + 14; { const tr = ctx.getTransform(); if (!tr.b && !tr.c && !tr.e && !tr.f && tr.a > 0) { const cw = ctx.canvas.width / tr.a; x = clamp(x, w / 2 + 4, Math.max(w / 2 + 4, cw - w / 2 - 4)); } } ctx.fillStyle = C.paper; ctx.strokeStyle = o.color || C.ink2; ctx.lineWidth = 1.2; rrect(ctx, x - w / 2, y - 12, w, 24, 4); ctx.fill(); ctx.stroke(); ctx.fillStyle = o.color || C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y + 1); }

/* ---------- 2D ray tracer (Snell, TIR, partial reflection) ---------- */
// polys: [{ n, pts: [[x,y],…] }] closed polygons in world units. Returns segments [x1,y1,x2,y2,I,kind]
function pointInPoly(p, pts) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; } return c; }
function traceRay(polys, p0, d0, o = {}) {
  const out = [], maxD = o.depth || 14, far = o.far || 1e4, minI = o.minI ?? 0.04;
  const medium = p => { for (let k = polys.length - 1; k >= 0; k--) if (pointInPoly(p, polys[k].pts)) return polys[k].n; return o.n0 || 1; };
  const stack = [[p0, d0, o.I ?? 1, 0]];
  while (stack.length) {
    const [p, d, I, depth] = stack.pop(); if (I < minI || depth > maxD) continue;
    let best = null;
    for (const poly of polys) { const P = poly.pts; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; const ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex; if (Math.abs(den) < 1e-12) continue; const t = ((a[0] - p[0]) * ey - (a[1] - p[1]) * ex) / den, u = ((a[0] - p[0]) * d[1] - (a[1] - p[1]) * d[0]) / den; if (t > 1e-7 && u >= 0 && u <= 1 && (!best || t < best.t)) { const L = hyp(ex, ey); best = { t, nx: -ey / L, ny: ex / L }; } } }
    if (!best) { out.push([p[0], p[1], p[0] + d[0] * far, p[1] + d[1] * far, I, 'out']); continue; }
    const h = [p[0] + d[0] * best.t, p[1] + d[1] * best.t]; out.push([p[0], p[1], h[0], h[1], I, 'in']);
    let nx = best.nx, ny = best.ny; if (nx * d[0] + ny * d[1] > 0) { nx = -nx; ny = -ny; }
    const eps = 1e-6, n1 = medium([h[0] - d[0] * eps, h[1] - d[1] * eps]), n2 = medium([h[0] + d[0] * eps, h[1] + d[1] * eps]);
    const cosi = -(nx * d[0] + ny * d[1]), r = n1 / n2, k = 1 - r * r * (1 - cosi * cosi);
    const refl = [d[0] + 2 * cosi * nx, d[1] + 2 * cosi * ny];
    if (k < 0) { stack.push([h, refl, I * 0.98, depth + 1]); if (o.onTIR) o.onTIR(h); continue; }
    const cost = Math.sqrt(k), tdir = [r * d[0] + (r * cosi - cost) * nx, r * d[1] + (r * cosi - cost) * ny];
    const R0 = ((n1 - n2) / (n1 + n2)) ** 2, Rf = R0 + (1 - R0) * Math.pow(1 - (n1 > n2 ? cost : cosi), 5);
    if (o.onHit) o.onHit(h, [nx, ny], n1, n2, d, tdir);
    stack.push([h, tdir, I * (1 - Rf), depth + 1]);
    if (o.partial !== false) stack.push([h, refl, I * Rf, depth + 1]);
  }
  return out;
}
function arcPts(cx, cy, r, a0, a1, n = 90) { const p = []; for (let k = 0; k <= n; k++) { const a = a0 + (a1 - a0) * k / n; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return p; }

/* ---------- Plot ---------- */
function niceTicks(a, b, n = 6) {
  const span = b - a; if (!(span > 0)) return { step: 1, vals: [a] };
  const raw = span / n, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
  const step = (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
  const vals = []; for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + step * 1e-6; v += step) vals.push(Math.abs(v) < step * 1e-9 ? 0 : +v.toPrecision(12));
  return { step, vals };
}
function tickFmt(v, step) {
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e5 || (a < 1e-3)) { const e = Math.floor(Math.log10(a)); const m = v / Math.pow(10, e); return `${+m.toPrecision(2)}×10${supx(e)}`.replace('-', '−'); }
  const d = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
  return v.toFixed(Math.min(d, 6)).replace('-', '−');
}
class Plot {
  constructor(S, o = {}) {
    this.S = S; this.ctx = S.ctx;
    Object.assign(this, { pad: { l: 54, r: 14, t: 14, b: 42 }, xmin: 0, xmax: 1, ymin: 0, ymax: 1, xlabel: '', ylabel: '', grid: true, nx: 6, ny: 5, title: '' }, o);
    this.pad = Object.assign({ l: 54, r: 14, t: 14, b: 42 }, o.pad || {});
  }
  layout() {
    const r = typeof this.rect === 'function' ? this.rect() : this.rect || { x: 0, y: 0, w: this.S.w, h: this.S.h };
    this.x0 = r.x + this.pad.l; this.y0 = r.y + this.pad.t; this.pw = Math.max(10, r.w - this.pad.l - this.pad.r); this.ph = Math.max(10, r.h - this.pad.t - this.pad.b); this.r = r;
    return this;
  }
  X(x) { return this.x0 + (x - this.xmin) / (this.xmax - this.xmin) * this.pw; }
  Y(y) { return this.y0 + this.ph - (y - this.ymin) / (this.ymax - this.ymin) * this.ph; }
  ix(px) { return this.xmin + (px - this.x0) / this.pw * (this.xmax - this.xmin); }
  iy(py) { return this.ymin + (this.y0 + this.ph - py) / this.ph * (this.ymax - this.ymin); }
  inside(px, py, m = 0) { return px >= this.x0 - m && px <= this.x0 + this.pw + m && py >= this.y0 - m && py <= this.y0 + this.ph + m; }
  axes(o = {}) {
    this.layout();
    const c = this.ctx, C = Theme.c;
    c.save();
    c.fillStyle = o.bg || C.paper2; c.fillRect(this.x0, this.y0, this.pw, this.ph);
    const xt = this.xticks ? { step: 1e9, vals: this.xticks } : niceTicks(this.xmin, this.xmax, Math.max(2, Math.min(this.nx, Math.floor(this.pw / 60))));
    const yt = this.yticks ? { step: 1e9, vals: this.yticks } : niceTicks(this.ymin, this.ymax, Math.max(2, Math.min(this.ny, Math.floor(this.ph / 34))));
    if (this.grid) {
      c.lineWidth = 1;
      // minor
      c.strokeStyle = C.grid; c.beginPath();
      const mx = xt.step / 5, my = yt.step / 5;
      if (!this.xticks && this.pw / ((this.xmax - this.xmin) / mx) > 5) for (let v = Math.ceil(this.xmin / mx) * mx; v <= this.xmax + 1e-9; v += mx) { const X = Math.round(this.X(v)) + .5; c.moveTo(X, this.y0); c.lineTo(X, this.y0 + this.ph); }
      if (!this.yticks && this.ph / ((this.ymax - this.ymin) / my) > 5) for (let v = Math.ceil(this.ymin / my) * my; v <= this.ymax + 1e-9; v += my) { const Y = Math.round(this.Y(v)) + .5; c.moveTo(this.x0, Y); c.lineTo(this.x0 + this.pw, Y); }
      c.stroke();
      c.strokeStyle = C.grid2; c.beginPath();
      for (const v of xt.vals) { const X = Math.round(this.X(v)) + .5; c.moveTo(X, this.y0); c.lineTo(X, this.y0 + this.ph); }
      for (const v of yt.vals) { const Y = Math.round(this.Y(v)) + .5; c.moveTo(this.x0, Y); c.lineTo(this.x0 + this.pw, Y); }
      c.stroke();
    }
    // axes lines
    c.strokeStyle = C.ink2; c.lineWidth = 1.25; c.beginPath();
    const yAxisX = (this.xmin <= 0 && this.xmax >= 0 && o.zeroAxes !== false) ? this.X(0) : this.x0;
    const xAxisY = (this.ymin <= 0 && this.ymax >= 0 && o.zeroAxes !== false) ? this.Y(0) : this.y0 + this.ph;
    c.moveTo(this.x0, xAxisY); c.lineTo(this.x0 + this.pw, xAxisY);
    c.moveTo(yAxisX, this.y0); c.lineTo(yAxisX, this.y0 + this.ph);
    c.stroke();
    c.strokeStyle = C.line2; c.lineWidth = 1; c.strokeRect(this.x0 + .5, this.y0 + .5, this.pw - 1, this.ph - 1);
    // tick labels
    c.fillStyle = C.muted; c.font = FONT.mono(10.5);
    c.textAlign = 'center'; c.textBaseline = 'top';
    const xf = this.xfmt || (v => tickFmt(v, xt.step)), yf = this.yfmt || (v => tickFmt(v, yt.step));
    for (const v of xt.vals) c.fillText(xf(v), this.X(v), this.y0 + this.ph + 5);
    c.textAlign = 'right'; c.textBaseline = 'middle';
    for (const v of yt.vals) c.fillText(yf(v), this.x0 - 6, this.Y(v));
    // labels
    if (this.xlabel) rich(c, this.xlabel, this.x0 + this.pw / 2, this.y0 + this.ph + 28, { align: 'center', color: C.ink2, size: 12.5 });
    if (this.ylabel) { c.save(); c.translate(this.r.x + 13, this.y0 + this.ph / 2); c.rotate(-Math.PI / 2); rich(c, this.ylabel, 0, 0, { align: 'center', color: C.ink2, size: 12.5 }); c.restore(); }
    if (this.title) rich(c, this.title, this.x0 + 8, this.y0 + 12, { color: C.muted, size: 11.5, w: 600 });
    c.restore();
    return this;
  }
  clip(fn) { const c = this.ctx; c.save(); c.beginPath(); c.rect(this.x0, this.y0, this.pw, this.ph); c.clip(); fn(c); c.restore(); }
  fnPts(f, a = this.xmin, b = this.xmax, n = 240) { const p = []; for (let k = 0; k <= n; k++) { const x = a + (b - a) * k / n; const y = f(x); if (isFinite(y)) p.push([this.X(x), this.Y(y)]); } return p; }
  map(pts) { return pts.map(([x, y]) => [this.X(x), this.Y(y)]); }
  curve(f, o = {}) { this.clip(c => line(c, typeof f === 'function' ? this.fnPts(f, o.a, o.b, o.n) : this.map(f), o)); }
  dots(pts, o = {}) { this.clip(c => { for (const [x, y] of pts) dot(c, this.X(x), this.Y(y), o.r || 3.5, o.color || Theme.c.blue, o.stroke); }); }
  cross(pts, o = {}) { this.clip(c => { c.strokeStyle = o.color || Theme.c.blue; c.lineWidth = o.width || 1.6; const s = o.s || 4; c.beginPath(); for (const [x, y] of pts) { const X = this.X(x), Y = this.Y(y); c.moveTo(X - s, Y - s); c.lineTo(X + s, Y + s); c.moveTo(X - s, Y + s); c.lineTo(X + s, Y - s); } c.stroke(); }); }
  area(pts, color, base = 0) { this.clip(c => { if (!pts.length) return; c.beginPath(); c.moveTo(this.X(pts[0][0]), this.Y(base)); for (const [x, y] of pts) c.lineTo(this.X(x), this.Y(y)); c.lineTo(this.X(pts[pts.length - 1][0]), this.Y(base)); c.closePath(); c.fillStyle = color; c.fill(); }); }
  vline(x, o = {}) { this.clip(c => line(c, [[this.X(x), this.y0], [this.X(x), this.y0 + this.ph]], Object.assign({ dash: [4, 4], width: 1, color: Theme.c.muted }, o))); }
  hline(y, o = {}) { this.clip(c => line(c, [[this.x0, this.Y(y)], [this.x0 + this.pw, this.Y(y)]], Object.assign({ dash: [4, 4], width: 1, color: Theme.c.muted }, o))); }
  label(x, y, s, o = {}) { rich(this.ctx, s, this.X(x) + (o.dx || 0), this.Y(y) + (o.dy || 0), Object.assign({ color: Theme.c.ink, size: 12 }, o)); }
}

/* ---------- controls ---------- */
function Group(parent, title) { const g = el('div', { class: 'grp' }); if (title) g.append(el('div', { class: 'gh' }, title)); parent.append(g); return g; }
function Slider(parent, o) {
  const id = o.id || ('s' + Math.random().toString(36).slice(2, 8));
  const inp = el('input', { type: 'range', id, min: o.min, max: o.max, step: o.step || 'any', value: o.value });
  const out = el('output', { for: id });
  const row = el('div', { class: 'ctl' }, el('div', { class: 'ctl-head' }, el('label', { for: id, html: o.label }), out), inp);
  const show = () => {
    const v = +inp.value; out.innerHTML = (o.fmt ? o.fmt(v) : num(v, 3)) + (o.unit ? ` <span class="u">${o.unit}</span>` : '');
    inp.style.setProperty('--p', ((v - +inp.min) / (+inp.max - +inp.min) * 100) + '%');
  };
  inp.addEventListener('input', () => { show(); o.oninput && o.oninput(+inp.value); });
  show(); parent.append(row);
  return { get value() { return +inp.value; }, set(v, fire) { inp.value = v; show(); if (fire && o.oninput) o.oninput(+inp.value); }, el: row, inp, refresh: show };
}
function Seg(parent, o) {
  const wrap = el('div', { class: 'ctl' });
  if (o.label) wrap.append(el('div', { class: 'ctl-head' }, el('label', { html: o.label })));
  const seg = el('div', { class: 'seg' + (o.wrap ? ' wrapit' : ''), role: 'group' }); wrap.append(seg);
  let val = o.value; const btns = {};
  for (const [v, t] of o.options) { const b = el('button', { type: 'button', html: t, 'aria-pressed': 'false', onclick: () => api.set(v, true) }); btns[v] = b; seg.append(b); }
  const api = { get value() { return val; }, set(v, fire) { val = v; for (const k in btns) { btns[k].classList.toggle('on', k == String(v)); btns[k].setAttribute('aria-pressed', k == String(v)); } if (fire && o.onchange) o.onchange(v); }, el: wrap };
  api.set(val); parent.append(wrap); return api;
}
function Switch(parent, o) {
  const id = o.id || ('w' + Math.random().toString(36).slice(2, 8));
  const inp = el('input', { type: 'checkbox', id, role: 'switch' }); inp.checked = !!o.value;
  const lab = el('label', { class: 'sw', for: id }, el('span', { html: o.label }), inp);
  inp.addEventListener('change', () => o.onchange && o.onchange(inp.checked));
  parent.append(lab); return { get value() { return inp.checked; }, set(v) { inp.checked = v; }, el: lab };
}
function Btn(parent, text, onclick, cls = '') { const b = el('button', { type: 'button', class: 'btn ' + cls, html: text, onclick }); parent.append(b); return b; }
// tap-twice confirmation: dialogs (alert/confirm) are unavailable in some embeds and feel clunky in apps
function confirmBtn(parent, text, confirmText, fn, cls = '') {
  const b = el('button', { type: 'button', class: 'btn ' + cls }, text); let armed = 0;
  const disarm = () => { clearTimeout(armed); armed = 0; b.textContent = text; b.classList.remove('armed'); };
  b.addEventListener('click', () => { if (armed) { disarm(); fn(); } else { b.textContent = confirmText; b.classList.add('armed'); armed = setTimeout(disarm, 3500); } });
  if (parent) parent.append(b); return b;
}
// short-lived inline message inside a control group (replaces alert())
function inlineMsg(parent, html, cls = 'flag') {
  let n = [...parent.children].find(c => c.classList && c.classList.contains('inline-msg'));
  if (!n) { n = el('div', { role: 'status' }); parent.append(n); }
  n.className = cls + ' inline-msg'; n.innerHTML = html; clearTimeout(n._t); n._t = setTimeout(() => n.remove(), 4000); return n;
}
function Btns(parent) { const d = el('div', { class: 'btns' }); parent.append(d); return d; }
function Readout(parent, rows) {
  const dl = el('dl', { class: 'ro' }); const map = {};
  for (const [k, label, cls] of rows) { const dd = el('dd', { class: cls || '' }, '—'); map[k] = dd; dl.append(el('dt', { html: label }), dd); }
  parent.append(dl);
  return { set(k, v) { if (map[k] && map[k]._v !== v) { map[k].innerHTML = v; map[k]._v = v; } }, el: dl };
}
function Note(parent, html, cls = 'key') { const d = el('div', { class: cls, html }); parent.append(d); return d; }
function Legend(parent, items) { const d = el('div', { class: 'lg' }); for (const [c, t, dash] of items) d.append(el('span', {}, el('i', { style: { background: dash ? `repeating-linear-gradient(90deg, ${c} 0 4px, transparent 4px 7px)` : c } }), el('span', { html: t }))); parent.append(d); return d; }

/* ---------- plate layout ---------- */
function Plate(root, lab, topic) {
  const main = el('div', { class: 'plate-main' });
  const stageBox = el('div', { class: 'plate-stage' });
  const tb = el('div', { class: 'tb' },
    el('div', {}, `FIG ${topic.code}-${lab.letter}`),
    el('div', { class: 't', html: `${lab.title}${lab.hint ? ` <span>${lab.hint}</span>` : ''}` }),
    el('div', { class: 's' }, 'SPEC ', lab.spec.join(' · ')));
  main.append(stageBox, tb);
  const side = el('aside', { class: 'plate-side', 'aria-label': 'controls' });
  const plate = el('section', { class: 'plate' }, main, side);
  const below = el('div', { class: 'below' });
  root.append(plate, below);
  return { stageBox, side, below, plate };
}
function Card(parent, title, html, cls = '') { const c = el('div', { class: 'card ' + cls }); if (title) c.append(el('h3', { html: title })); if (html != null) c.append(typeof html === 'string' ? el('div', { html }) : html); parent.append(c); return c; }
function EqCard(parent, title, rows, cls = '') {
  const c = Card(parent, title, null, cls); const d = el('div', { class: 'eqs' });
  for (const [e, s] of rows) d.append(el('div', { class: 'eqrow' }, el('span', { html: tex(e) }), el('small', { html: s || '' })));
  c.append(d); return c;
}
const list = (items, ordered) => `<${ordered ? 'ol' : 'ul'}>${items.map(i => `<li>${i}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`;

/* ---------- Drill (randomised exam practice) ---------- */
/* per-topic drill scores (weak-area tracking) */
function recordScore(tid, ok) {
  if (!tid) return;
  const s = Store.get('scores', {}); const r = s[tid] || { n: 0, ok: 0, last: [] };
  r.n++; if (ok) r.ok++; r.last = (r.last || []).concat(ok ? 1 : 0).slice(-20); r.t = Date.now(); s[tid] = r; Store.set('scores', s);
}
function Drill(parent, o) {
  if (window.PS_HARVEST) { const H2 = window.PS_HARVEST, cx = window.PS_HARVEST_CTX || {}; for (const g of (Array.isArray(o.gens) ? o.gens : [o.gens])) H2.push({ gen: g, topic: cx.topic, lab: cx.lab, title: o.title }); return el('div'); }
  const tid = window.PS_CUR;
  const box = el('div', { class: 'drill ' + (o.cls || '') });
  const streakEl = el('span', { class: 'streak' });
  box.append(el('div', { class: 'drill-h' }, el('h3', {}, o.title || 'Exam drill'), streakEl));
  const body = el('div', { class: 'drill-b' }); box.append(body); parent.append(box);
  let streak = 0, best = 0, cur = null, answered = false;
  const setStreak = () => streakEl.innerHTML = `streak <b>${streak}</b> · best ${best}`;
  function next() {
    const g = Array.isArray(o.gens) ? pick(o.gens) : o.gens; cur = g(); answered = false; body.innerHTML = '';
    body.append(el('div', { class: 'drill-q', html: cur.q }));
    const fb = el('div', { class: 'drill-fb' });
    if (cur.options) {
      const opts = el('div', { class: 'opts' });
      const order = shuffle(cur.options.map((t, k) => [t, k]));
      for (const [t, k] of order) opts.append(el('button', { type: 'button', html: t, onclick: e => {
        if (answered) return; answered = true;
        const ok = k === cur.correct; score(ok);
        [...opts.children].forEach(b => { if (b === e.currentTarget) b.classList.add(ok ? 'right' : 'wrong'); });
        if (!ok) [...opts.children].find(b => b.innerHTML === cur.options[cur.correct])?.classList.add('right');
        fb.className = 'drill-fb ' + (ok ? 'ok' : 'no'); fb.innerHTML = (ok ? '✓ Correct. ' : '✗ Not quite. ') + (cur.why || '');
      } }));
      body.append(opts, fb);
      body.append(el('div', { class: 'btns' }, el('button', { class: 'btn', type: 'button', onclick: next }, 'Next question →')));
      return;
    }
    const inp = el('input', { class: 'num', type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'e.g. 3.2e-4 or 3.2x10^-4', 'aria-label': 'answer' });
    const row = el('div', { class: 'drill-in' }, inp, cur.unit ? el('span', { class: 'unit', html: cur.unit }) : null);
    const stepsBox = el('div');
    const check = () => {
      const v = parseNum(inp.value);
      if (!isFinite(v)) { fb.className = 'drill-fb no'; fb.textContent = 'Enter a number — standard form like 3.2e-4 or 3.2x10^-4 works.'; return; }
      const tol = cur.tol ?? 0.02; const ok = Math.abs(v - cur.a) <= Math.abs(cur.a) * tol + (cur.abs || 0);
      if (!answered) { answered = true; score(ok); }
      fb.className = 'drill-fb ' + (ok ? 'ok' : 'no');
      fb.innerHTML = ok ? `✓ Correct — ${num(cur.a, cur.sf || 3)}${cur.unit ? ' ' + cur.unit : ''}` : `✗ Not quite. Check your working or reveal the solution.`;
      if (ok) showSteps();
    };
    const showSteps = () => { stepsBox.innerHTML = ''; if (cur.steps) stepsBox.append(el('ol', { class: 'steps', html: cur.steps.map(s => `<li>${s}</li>`).join('') })); };
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    body.append(row, fb, el('div', { class: 'btns' },
      el('button', { class: 'btn pri', type: 'button', onclick: check }, 'Check'),
      el('button', { class: 'btn', type: 'button', onclick: () => { if (!answered) { answered = true; score(false); } showSteps(); fb.className = 'drill-fb'; fb.innerHTML = `Answer: <b class="mono">${num(cur.a, cur.sf || 3)}</b> ${cur.unit || ''}`; } }, 'Show solution'),
      el('button', { class: 'btn', type: 'button', onclick: next }, 'Next →')), stepsBox);
  }
  function score(ok) { streak = ok ? streak + 1 : 0; best = Math.max(best, streak); setStreak(); recordScore((cur && cur.topic && cur.topic.id) || tid, ok); }
  setStreak(); next();
  return box;
}

/* ---------- Sorter (classification game) ---------- */
function Sorter(parent, o) {
  if (window.PS_HARVEST) { const cx = window.PS_HARVEST_CTX || {}; window.PS_HARVEST.push({ topic: cx.topic, lab: cx.lab, title: 'Classify', gen: () => { const it = pick(o.items); return { q: `Classify: <b>${it.t}</b>`, options: o.cats.map(c => c[1]), correct: o.cats.findIndex(c => c[0] === it.c), why: it.why || '' }; } }); return el('div'); }
  const box = el('div', { class: 'sorter' }); parent.append(box);
  let items, k, score, wrong;
  function start() { items = shuffle(o.items); k = 0; score = 0; wrong = []; render(); }
  function render() {
    box.innerHTML = '';
    const prog = el('div', { class: 'sort-prog' }, el('i', { style: { width: (k / items.length * 100) + '%' } }));
    if (k >= items.length) {
      box.append(prog, el('div', { class: 'sort-card' }, `${score} / ${items.length}`),
        wrong.length ? el('div', { class: 'key', html: '<b>Review:</b> ' + wrong.map(w => `${w.t} → <b>${o.cats.find(c => c[0] === w.c)[1]}</b>${w.why ? ` (${w.why})` : ''}`).join('; ') }) : el('div', { class: 'flag ok' }, 'Perfect run.'),
        el('div', { class: 'btns' }, el('button', { class: 'btn pri', type: 'button', onclick: start }, 'Play again')));
      return;
    }
    const it = items[k];
    const fb = el('div', { class: 'key', style: { minHeight: '42px' } }, `${k + 1} of ${items.length} · score ${score}`);
    const btns = el('div', { class: 'opts' });
    for (const [c, t] of o.cats) btns.append(el('button', { type: 'button', html: t, onclick: e => {
      if (btns.dataset.done) return; btns.dataset.done = 1;
      const ok = c === it.c; if (ok) score++; else wrong.push(it);
      e.currentTarget.classList.add(ok ? 'right' : 'wrong');
      fb.innerHTML = (ok ? '<b style="color:var(--ps-green)">✓</b> ' : `<b style="color:var(--ps-red)">✗ ${o.cats.find(x => x[0] === it.c)[1]}.</b> `) + (it.why || '');
      setTimeout(() => { k++; render(); }, ok ? 650 : 1500);
    } }));
    box.append(prog, el('div', { class: 'sort-card' }, it.t), btns, fb);
  }
  start(); return box;
}

/* ---------- registry ---------- */
const TOPICS = [];
function topic(t) { t.labs.forEach((l, i) => l.letter = String.fromCharCode(65 + i)); TOPICS.push(t); return t; }

/* ================= 1.1 Physical quantities ================= */
(() => {
const BASE = [['kg', 'mass'], ['m', 'length'], ['s', 'time'], ['A', 'current'], ['K', 'temperature'], ['mol', 'amount']];
function utex(vec) {
  const parts = [];
  vec.forEach((e, k) => { if (e) parts.push(`\\text{${BASE[k][0]}}${e !== 1 ? `^{${e}}` : ''}`); });
  return parts.length ? parts.join('\\,') : '\\text{(no units)}';
}
const ut = s => s.split(' ').map(tok => { const [n, e] = tok.split('^'); return `\\text{${n}}${e ? `^{${e}}` : ''}`; }).join('\\,');
const Q = [
  { n: 'Velocity', eq: 'v = \\frac{s}{t}', via: `\\frac{${ut('m')}}{${ut('s')}}`, vec: [0, 1, -1, 0, 0, 0] },
  { n: 'Acceleration', eq: 'a = \\frac{\\Delta v}{t}', via: `\\frac{${ut('m s^-1')}}{${ut('s')}}`, vec: [0, 1, -2, 0, 0, 0] },
  { n: 'Force', eq: 'F = ma', u: 'N', via: `${ut('kg')} \\times ${ut('m s^-2')}`, vec: [1, 1, -2, 0, 0, 0] },
  { n: 'Momentum', eq: 'p = mv', via: `${ut('kg')} \\times ${ut('m s^-1')}`, vec: [1, 1, -1, 0, 0, 0] },
  { n: 'Work / energy', eq: 'W = Fs', u: 'J', via: `${ut('N')}\\times${ut('m')} = (${ut('kg m s^-2')})\\times${ut('m')}`, vec: [1, 2, -2, 0, 0, 0] },
  { n: 'Power', eq: 'P = \\frac{W}{t}', u: 'W', via: `\\frac{${ut('J')}}{${ut('s')}} = \\frac{${ut('kg m^2 s^-2')}}{${ut('s')}}`, vec: [1, 2, -3, 0, 0, 0] },
  { n: 'Pressure / stress', eq: 'p = \\frac{F}{A}', u: 'Pa', via: `\\frac{${ut('N')}}{${ut('m^2')}} = \\frac{${ut('kg m s^-2')}}{${ut('m^2')}}`, vec: [1, -1, -2, 0, 0, 0] },
  { n: 'Density', eq: '\\rho = \\frac{m}{V}', via: `\\frac{${ut('kg')}}{${ut('m^3')}}`, vec: [1, -3, 0, 0, 0, 0] },
  { n: 'Charge', eq: 'Q = It', u: 'C', via: `${ut('A')}\\times${ut('s')}`, vec: [0, 0, 1, 1, 0, 0] },
  { n: 'Potential difference', eq: 'V = \\frac{W}{Q}', u: 'V', via: `\\frac{${ut('J')}}{${ut('C')}} = \\frac{${ut('kg m^2 s^-2')}}{${ut('A s')}}`, vec: [1, 2, -3, -1, 0, 0] },
  { n: 'Resistance', eq: 'R = \\frac{V}{I}', u: 'Ω', via: `\\frac{${ut('V')}}{${ut('A')}} = \\frac{${ut('kg m^2 s^-3 A^-1')}}{${ut('A')}}`, vec: [1, 2, -3, -2, 0, 0] },
  { n: 'Frequency', eq: 'f = \\frac{1}{T}', u: 'Hz', via: `\\frac{1}{${ut('s')}}`, vec: [0, 0, -1, 0, 0, 0] },
  { n: 'Spring constant', eq: 'k = \\frac{F}{x}', via: `\\frac{${ut('N')}}{${ut('m')}} = \\frac{${ut('kg m s^-2')}}{${ut('m')}}`, vec: [1, 0, -2, 0, 0, 0] },
  { n: 'Young modulus', eq: 'E = \\frac{\\sigma}{\\varepsilon}', u: 'Pa', via: `\\frac{${ut('Pa')}}{(\\text{no unit})}`, vec: [1, -1, -2, 0, 0, 0] },
  { n: 'Specific heat capacity', eq: 'c = \\frac{Q}{m\\Delta\\theta}', via: `\\frac{${ut('J')}}{${ut('kg K')}} = \\frac{${ut('kg m^2 s^-2')}}{${ut('kg K')}}`, vec: [0, 2, -2, 0, -1, 0] },
  { n: 'Molar gas constant R', eq: 'R = \\frac{pV}{nT}', via: `\\frac{${ut('Pa m^3')}}{${ut('mol K')}} = \\frac{${ut('J')}}{${ut('mol K')}}`, vec: [1, 2, -2, 0, -1, -1] },
  { n: 'Boltzmann constant k', eq: 'k = \\frac{pV}{NT}', via: `\\frac{${ut('J')}}{${ut('K')}}  \\text{ (N is just a number)}`, vec: [1, 2, -2, 0, -1, 0] },
];
const V = (a) => { const v = [0, 0, 0, 0, 0, 0]; for (const [k, e] of Object.entries(a)) v[['kg', 'm', 's', 'A', 'K', 'mol'].indexOf(k)] += e; return v; };
const add = (...vs) => vs.reduce((a, b) => a.map((x, i) => x + b[i]), [0, 0, 0, 0, 0, 0]);
const eqv = (a, b) => a.every((x, i) => x === b[i]);
const vel = V({ m: 1, s: -1 }), acc = V({ m: 1, s: -2 }), len = V({ m: 1 }), tim = V({ s: 1 }), mass = V({ kg: 1 }), J = V({ kg: 1, m: 2, s: -2 }), none = [0, 0, 0, 0, 0, 0];
const HOMO = [
  { e: 'v = u + at', L: [['v', vel]], R: [['u', vel], ['at', add(acc, tim)]] },
  { e: 's = ut + \\frac{1}{2}at^2', L: [['s', len]], R: [['ut', add(vel, tim)], ['\\frac{1}{2}at^2', add(acc, tim, tim)]] },
  { e: 's = ut + at^2', L: [['s', len]], R: [['ut', add(vel, tim)], ['at^2', add(acc, tim, tim)]], trap: 'Homogeneous — but <b>wrong</b>: the ½ is missing. Pure numbers carry no units, so homogeneity can never catch a missing constant.' },
  { e: 'v^2 = u^2 + 2as', L: [['v^2', add(vel, vel)]], R: [['u^2', add(vel, vel)], ['2as', add(acc, len)]] },
  { e: 'E_k = \\frac{1}{2}mv^2', L: [['E_k', J]], R: [['\\frac{1}{2}mv^2', add(mass, vel, vel)]] },
  { e: 'p = \\rho g h', L: [['p', V({ kg: 1, m: -1, s: -2 })]], R: [['\\rho gh', add(V({ kg: 1, m: -3 }), acc, len)]] },
  { e: 'P = Fv', L: [['P', V({ kg: 1, m: 2, s: -3 })]], R: [['Fv', add(V({ kg: 1, m: 1, s: -2 }), vel)]] },
  { e: 'F = mv', L: [['F', V({ kg: 1, m: 1, s: -2 })]], R: [['mv', add(mass, vel)]] },
  { e: 's = vt^2', L: [['s', len]], R: [['vt^2', add(vel, tim, tim)]] },
  { e: 'E = \\frac{1}{2}kx^2', L: [['E', J]], R: [['\\frac{1}{2}kx^2', add(V({ kg: 1, s: -2 }), len, len)]] },
  { e: 'pV = nRT', L: [['pV', add(V({ kg: 1, m: -1, s: -2 }), V({ m: 3 }))]], R: [['nRT', add(V({ mol: 1 }), V({ kg: 1, m: 2, s: -2, K: -1, mol: -1 }), V({ K: 1 }))]] },
  { e: 'Q = mc\\Delta\\theta', L: [['Q', J]], R: [['mc\\Delta\\theta', add(mass, V({ m: 2, s: -2, K: -1 }), V({ K: 1 }))]] },
];

/* ---------- Lab A: unit decomposer ---------- */
function mountUnits(P, L) {
  const chain = el('div', { style: { padding: '18px 20px 6px', minHeight: '150px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--ps-paper-2)' } });
  P.stageBox.append(chain);
  const S = L.stage(P.stageBox, { aspect: 2.4, minH: 200, maxH: 300, tag: 'dimension exponents' });
  let cur = Q[4], shown = [0, 0, 0, 0, 0, 0];
  function renderChain() {
    const steps = [cur.eq, `[${cur.n.split(' ')[0].toLowerCase()}] = ${cur.via}`, `= ${utex(cur.vec)}`];
    chain.innerHTML = '';
    chain.append(el('div', { class: 'eyebrow' }, cur.n + (cur.u ? ` · derived unit: ${cur.u}` : ' · no special name')));
    steps.forEach((s, i) => {
      const d = el('div', { html: tex(s), style: { fontSize: i === 2 ? '26px' : '21px', color: i === 2 ? 'var(--ps-blue)' : 'var(--ps-ink)', opacity: 0, transform: 'translateY(4px)', transition: `opacity .35s ${i * .18}s, transform .35s ${i * .18}s`, overflowX: 'auto' } });
      chain.append(d); requestAnimationFrame(() => requestAnimationFrame(() => { d.style.opacity = 1; d.style.transform = 'none'; }));
    });
  }
  L.loop(dt => {
    for (let k = 0; k < 6; k++) shown[k] += (cur.vec[k] - shown[k]) * Math.min(1, dt * 9);
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h;
    const padL = 40, colW = (W - padL - 20) / 6, mid = Hh * 0.47, unit = (Hh * 0.36) / 3;
    c.strokeStyle = C.ink2; c.lineWidth = 1; c.beginPath(); c.moveTo(padL - 10, mid + .5); c.lineTo(W - 12, mid + .5); c.stroke();
    c.font = FONT.mono(10); c.fillStyle = C.muted; c.textAlign = 'right'; c.textBaseline = 'middle';
    for (let e = -3; e <= 3; e++) { const y = mid - e * unit; c.fillText(e > 0 ? '+' + e : e === 0 ? '0' : '−' + (-e), padL - 16, y); c.strokeStyle = C.grid2; c.beginPath(); c.moveTo(padL - 10, y + .5); c.lineTo(W - 12, y + .5); if (e) c.stroke(); }
    BASE.forEach(([u, q], k) => {
      const x = padL + colW * k + colW * 0.2, w = colW * 0.6, v = shown[k], tgt = cur.vec[k];
      const col = tgt > 0 ? C.blue : tgt < 0 ? C.red : C.line2;
      c.fillStyle = alpha(col, 0.18); c.strokeStyle = col; c.lineWidth = 1.5;
      const y0 = mid, y1 = mid - v * unit;
      c.fillRect(x, Math.min(y0, y1), w, Math.abs(y1 - y0)); c.strokeRect(x + .5, Math.min(y0, y1) + .5, w - 1, Math.abs(y1 - y0));
      c.fillStyle = tgt ? col : C.muted; c.font = FONT.mono(13, 600); c.textAlign = 'center';
      c.textBaseline = tgt >= 0 ? 'bottom' : 'top';
      c.fillText(tgt === 0 ? '0' : (tgt > 0 ? '+' : '−') + Math.abs(tgt), x + w / 2, tgt >= 0 ? y1 - 4 : y1 + 4);
      c.fillStyle = C.ink; c.font = FONT.ui(14, 600); c.textBaseline = 'top'; c.fillText(u, x + w / 2, Hh - 38);
      c.fillStyle = C.muted; c.font = FONT.ui(11); c.fillText(q, x + w / 2, Hh - 20);
    });
  }, [S]);
  const g = Group(P.side, 'Pick a quantity');
  const sel = el('select', { class: 'sel', id: 'u-q', 'aria-label': 'quantity' }, Q.map((q, i) => el('option', { value: i }, q.n)));
  sel.value = 4; sel.addEventListener('change', () => { cur = Q[+sel.value]; renderChain(); });
  g.append(sel);
  const b = Btns(g); Btn(b, '← Prev', () => { sel.value = (+sel.value + Q.length - 1) % Q.length; sel.dispatchEvent(new Event('change')); }, 'sm'); Btn(b, 'Next →', () => { sel.value = (+sel.value + 1) % Q.length; sel.dispatchEvent(new Event('change')); }, 'sm');
  const g2 = Group(P.side, 'The six base units you must know');
  g2.append(el('div', { class: 'ro', html: BASE.map(([u, q]) => `<dt>${q[0].toUpperCase() + q.slice(1)}${q === 'amount' ? ' of substance' : ''}</dt><dd>${u === 'kg' ? 'kilogram, kg' : u === 'm' ? 'metre, m' : u === 's' ? 'second, s' : u === 'A' ? 'ampere, A' : u === 'K' ? 'kelvin, K' : 'mole, mol'}</dd>`).join('') }));
  Note(P.side, '<b>Method:</b> write the defining equation, substitute units you already know, then replace every derived unit with base units and collect powers.');
  renderChain();

  // Unit builder game
  const card = Card(P.below, 'Unit builder — construct it from base units', null);
  const tgtEl = el('div', { class: 'drill-q' }); const prev = el('div', { class: 'eqbox' });
  const steppers = el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(88px,1fr))', gap: '8px' } });
  const fb = el('div', { class: 'drill-fb', style: { minHeight: '22px' } }); let tgt, exps = [0, 0, 0, 0, 0, 0], streak = 0;
  const vals = [];
  BASE.forEach(([u], k) => {
    const v = el('span', { class: 'mono', style: { minWidth: '26px', textAlign: 'center', fontSize: '15px' } }, '0'); vals.push(v);
    const mk = d => el('button', { class: 'btn sm', type: 'button', 'aria-label': (d > 0 ? 'increase ' : 'decrease ') + u, onclick: () => { exps[k] = clamp(exps[k] + d, -4, 4); upd(); } }, d > 0 ? '+' : '−');
    steppers.append(el('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', border: '1px solid var(--ps-line)', borderRadius: '5px', padding: '8px 4px' } }, el('b', { style: { fontSize: '14px' } }, u), el('div', { style: { display: 'flex', alignItems: 'center', gap: '4px' } }, mk(-1), v, mk(1))));
  });
  function upd() { exps.forEach((e, k) => vals[k].textContent = e > 0 ? '+' + e : e < 0 ? '−' + (-e) : '0'); prev.innerHTML = tex(utex(exps)); }
  function newT() { tgt = pick(Q.filter(q => q !== tgt)); exps = [0, 0, 0, 0, 0, 0]; upd(); fb.textContent = ''; fb.className = 'drill-fb'; tgtEl.innerHTML = `Build the base units of <b>${tgt.n}</b> <span class="muted">(${tex(tgt.eq)})</span>`; }
  const bb = el('div', { class: 'btns' },
    el('button', { class: 'btn pri', type: 'button', onclick: () => { const ok = eqv(exps, tgt.vec); streak = ok ? streak + 1 : 0; fb.className = 'drill-fb ' + (ok ? 'ok' : 'no'); fb.innerHTML = ok ? `✓ Correct · streak ${streak}` : '✗ Not yet — go back to the defining equation.'; } }, 'Check'),
    el('button', { class: 'btn', type: 'button', onclick: () => { exps = tgt.vec.slice(); upd(); fb.className = 'drill-fb'; fb.innerHTML = 'Via: ' + tex(tgt.via); streak = 0; } }, 'Reveal'),
    el('button', { class: 'btn', type: 'button', onclick: newT }, 'New quantity →'));
  card.append(el('div', { class: 'drill-b', style: { padding: 0 } }, tgtEl, steppers, prev, fb, bb)); newT();

  // Homogeneity checker
  const hc = Card(P.below, 'Homogeneity checker', null);
  const hsel = el('select', { class: 'sel', id: 'u-h', 'aria-label': 'equation' }, HOMO.map((h, i) => el('option', { value: i, html: h.e.replace(/\\frac\{1\}\{2\}/g, '½').replace(/\\[a-zA-Z]+/g, m => GREEK[m.slice(1)] || '').replace(/[{}_^]/g, '') })));
  const hout = el('div');
  function hupd() {
    const h = HOMO[+hsel.value]; const lv = h.L[0][1]; const all = [...h.L, ...h.R];
    const ok = all.every(t => eqv(t[1], lv));
    hout.innerHTML = `<div class="eqbox">${tex(h.e)}</div><div class="tbl-wrap"><table class="tbl"><tr><th>Term</th><th>Base units</th><th></th></tr>${all.map(([t, v]) => `<tr><td>${tex(t)}</td><td>${tex(utex(v))}</td><td style="color:${eqv(v, lv) ? 'var(--ps-green)' : 'var(--ps-red)'}">${eqv(v, lv) ? '✓' : '✗'}</td></tr>`).join('')}</table></div>
      <div class="flag ${ok ? 'ok' : ''}" style="margin-top:10px">${ok ? '✓ Homogeneous: every term has identical base units.' : '✗ Not homogeneous: this equation cannot be correct.'}${h.trap ? '<br>' + h.trap : ''}</div>`;
  }
  hsel.addEventListener('change', hupd); hc.append(hsel, hout); hupd();
}

/* ---------- Lab B: prefixes / powers of ten ---------- */
const PREF = [['T', 12, 'tera'], ['G', 9, 'giga'], ['M', 6, 'mega'], ['k', 3, 'kilo'], ['', 0, '—'], ['c', -2, 'centi'], ['m', -3, 'milli'], ['µ', -6, 'micro'], ['n', -9, 'nano'], ['p', -12, 'pico'], ['f', -15, 'femto']];
function withPrefix(x, unit = 'm', sf = 3) {
  if (x === 0) return '0 ' + unit;
  const e = Math.floor(Math.log10(Math.abs(x)) + 1e-9);
  const cands = PREF.filter(p => p[1] % 3 === 0);
  let best = cands.find(p => e >= p[1]) || cands[cands.length - 1];
  return `${num(x / Math.pow(10, best[1]), sf)} ${best[0]}${unit}`;
}
const OBJ = [['Proton', 1.7e-15], ['Gold nucleus', 1.4e-14], ['Hydrogen atom', 1.1e-10], ['DNA helix (width)', 2e-9], ['Ribosome', 2.5e-8], ['Flu virus', 1.0e-7], ['Green light (wavelength)', 5.3e-7], ['E. coli bacterium', 2e-6], ['Red blood cell', 8e-6], ['Pollen grain', 3e-5], ['Human hair (width)', 8e-5], ['Grain of sand', 5e-4], ['Ant', 5e-3], ['1p coin', 2.03e-2], ['Football', 0.22], ['Human', 1.8], ['Double-decker bus', 11], ['Titanic (length)', 269], ['Slieve Donard (height)', 850], ['Everest (height)', 8.85e3], ['Lough Neagh (length)', 3.0e4], ['Northern Ireland (width)', 1.7e5], ['Moon', 3.47e6], ['Earth', 1.27e7], ['Jupiter', 1.4e8], ['Moon’s orbit', 7.7e8], ['Sun', 1.39e9], ['Mercury’s orbit', 1.16e11], ['Earth’s orbit', 3.0e11], ['Jupiter’s orbit', 1.56e12], ['Saturn’s orbit', 2.9e12], ['Neptune’s orbit', 9.0e12]];
function mountPrefix(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.55, minH: 340, maxH: 520, plain: true });
  let Lg = -6.5, target = null, touring = false;
  const LMIN = -15.3, LMAX = 13.2;
  const rul = () => ({ x: 24, y: S.h - 58, w: S.w - 48, h: 44 });
  const LX = l => { const r = rul(); return r.x + (l - LMIN) / (LMAX - LMIN) * r.w; };
  Pointer(S, {
    scroll: true,
    hit: (x, y) => { const r = rul(); return y > r.y - 14 ? 'ruler' : null; },
    move: (t, x) => { const r = rul(); Lg = clamp(LMIN + (x - r.x) / r.w * (LMAX - LMIN), LMIN, LMAX); target = null; touring = false; sl.set(Lg); }
  });
  L.loop(dt => {
    if (touring) { Lg += dt * 1.35; if (Lg >= LMAX) { Lg = LMAX; touring = false; tourBtn.textContent = '▶ Tour fm → Tm'; } sl.set(Lg); }
    else if (target != null) { Lg += (target - Lg) * Math.min(1, dt * 5); if (Math.abs(target - Lg) < 0.002) { Lg = target; target = null; } sl.set(Lg); }
    const c = S.begin(), C = Theme.c, W = S.w, sh = S.h - 76;
    // scene background
    c.fillStyle = C.paper2; c.fillRect(0, 0, W, S.h);
    const view = Math.pow(10, Lg), cx = W * 0.5, cy = sh * 0.54, pxPerM = W / view;
    // background grid scaled to a nice length
    const barLenM = (() => { const t = view / 4; const p = Math.pow(10, Math.floor(Math.log10(t))); const m = t / p; return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p; })();
    const gpx = barLenM * pxPerM / 5;
    c.strokeStyle = C.grid; c.lineWidth = 1; c.beginPath();
    for (let x = cx % gpx; x < W; x += gpx) { c.moveTo(Math.round(x) + .5, 0); c.lineTo(Math.round(x) + .5, sh); }
    for (let y = cy % gpx; y < sh; y += gpx) { c.moveTo(0, Math.round(y) + .5); c.lineTo(W, Math.round(y) + .5); }
    c.stroke();
    const cols = [C.blue, C.red, C.green, C.violet, C.orange, C.cyan];
    OBJ.forEach(([name, d], i) => {
      const r = d / 2 * pxPerM; if (r < 0.6 || r > W * 2.2) return;
      const a = clamp((r - 0.6) / 5, 0, 1) * clamp((W * 1.9 - r) / (W * 0.8), 0, 1);
      const col = cols[i % cols.length];
      c.globalAlpha = a; c.beginPath(); c.arc(cx, cy, Math.max(r, 1), 0, TAU); c.fillStyle = alpha(col, 0.06); c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.stroke();
      if (r > 14 && r < W * 1.2) {
        const ang = -Math.PI / 2 + 0.55 + (i % 3) * 0.25; let lx = cx + r * Math.cos(ang), ly = cy + r * Math.sin(ang);
        if (ly < 16) { ly = 16; } if (lx > W - 10) lx = W - 10;
        c.globalAlpha = a * clamp((r - 14) / 20, 0, 1);
        dot(c, cx + r * Math.cos(ang), cy + r * Math.sin(ang), 3, col);
        const txt = `${name} · ${withPrefix(d, 'm', 2)}`; c.font = FONT.ui(12.5, 600); const tw = c.measureText(txt).width;
        const tx = clamp(lx + 8, 6, W - tw - 10), ty = clamp(ly - 10, 10, sh - 10);
        c.fillStyle = alpha(C.paper2, 0.85); c.fillRect(tx - 3, ty - 9, tw + 6, 18);
        c.fillStyle = col; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText(txt, tx, ty);
      }
      c.globalAlpha = 1;
    });
    // scale bar
    const bl = barLenM * pxPerM; const bx = 20, by = sh - 22;
    c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(bx, by - 5); c.lineTo(bx, by + 5); c.moveTo(bx, by); c.lineTo(bx + bl, by); c.moveTo(bx + bl, by - 5); c.lineTo(bx + bl, by + 5); c.stroke();
    c.fillStyle = C.ink; c.font = FONT.mono(12, 600); c.textAlign = 'left'; c.textBaseline = 'bottom';
    c.fillText(`${withPrefix(barLenM, 'm', 1)}  =  ${sci(barLenM, 1)} m`, bx, by - 8);
    // view readout
    c.textAlign = 'right'; c.font = FONT.mono(11); c.fillStyle = C.muted; c.fillText(`view width ≈ ${sci(view, 2)} m`, W - 14, 22);
    // ruler
    const r = rul();
    c.fillStyle = C.paper3; c.fillRect(0, r.y - 16, W, S.h - r.y + 16);
    c.strokeStyle = C.line2; c.beginPath(); c.moveTo(0, r.y - 16.5); c.lineTo(W, r.y - 16.5); c.stroke();
    c.strokeStyle = C.ink2; c.lineWidth = 1; c.beginPath(); c.moveTo(r.x, r.y + 14.5); c.lineTo(r.x + r.w, r.y + 14.5);
    for (let e = -15; e <= 13; e++) { const x = Math.round(LX(e)) + .5; c.moveTo(x, r.y + 14); c.lineTo(x, r.y + (e % 3 === 0 ? 4 : 9)); }
    c.stroke();
    c.textAlign = 'center'; c.textBaseline = 'top';
    for (const [s, e] of PREF) {
      if (e === -2 && W < 520) continue;
      const x = LX(e); const on = Math.abs(Lg - 0.6 - e) < 1.5 && e % 3 === 0;
      c.font = FONT.mono(on ? 14 : 12, on ? 700 : 500); c.fillStyle = on ? C.blue : e === -2 ? C.muted : C.ink2;
      c.fillText(s || 'm', x, r.y + 18);
      c.font = FONT.mono(9.5); c.fillStyle = C.muted; if (W > 600 || e % 6 === 0) c.fillText('10' + supx(e), x, r.y + 34);
    }
    const mx = LX(Lg);
    c.fillStyle = alpha(C.blue, 0.15); c.fillRect(mx - 1, r.y - 12, 2, 26);
    c.beginPath(); c.moveTo(mx, r.y + 12); c.lineTo(mx - 7, r.y - 2); c.lineTo(mx + 7, r.y - 2); c.closePath(); c.fillStyle = C.blue; c.fill();
    ro.set('w', sci(view, 2) + ' m'); ro.set('p', withPrefix(view, 'm', 2));
  }, [S]);
  const g = Group(P.side, 'Zoom');
  const sl = Slider(g, { id: 'pf-zoom', label: 'View width = 10<sup>x</sup> m', min: LMIN, max: LMAX, step: 0.01, value: Lg, fmt: v => 'x = ' + fix(v, 1), oninput: v => { Lg = v; target = null; touring = false; } });
  const ro = Readout(g, [['w', 'Standard form'], ['p', 'With prefix', 'hl']]);
  const bt = Btns(g);
  const tourBtn = Btn(bt, '▶ Tour fm → Tm', () => { touring = !touring; if (touring && Lg >= LMAX - 0.1) Lg = LMIN; tourBtn.textContent = touring ? '❚❚ Pause' : '▶ Tour fm → Tm'; target = null; }, 'pri');
  const g2 = Group(P.side, 'Jump to a prefix');
  const jumps = el('div', { class: 'seg wrapit' });
  for (const [s, e] of PREF) if (e % 3 === 0) jumps.append(el('button', { type: 'button', onclick: () => { target = e + 0.6; touring = false; } }, (s || '·') + ' 10' + supx(e)));
  g2.append(jumps);
  Note(P.side, 'Drag along the ruler at the bottom to scrub. Each step of the ruler is ×10; each named prefix is ×1000.');

  // prefix table
  Card(P.below, 'The ten prefixes (CCEA list)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Prefix</th><th>Symbol</th><th>Factor</th></tr>${PREF.filter(p => p[0]).map(([s, e, n]) => `<tr><td>${n}</td><td>${s}</td><td>10${supx(e)}</td></tr>`).join('')}</table></div>`);
  // converter
  const cv = Card(P.below, 'Converter', null);
  const vin = el('input', { class: 'num', id: 'pf-v', value: '450', inputmode: 'decimal', 'aria-label': 'value' });
  const mkSel = (id, v) => { const s = el('select', { class: 'sel', id }, PREF.map(([p, e, n]) => el('option', { value: e }, (p || '(none)') + '  ×10' + supx(e)))); s.value = v; return s; };
  const fs = mkSel('pf-from', -9), ts = mkSel('pf-to', 0);
  const unitIn = el('input', { class: 'num', id: 'pf-u', value: 'm', 'aria-label': 'unit' });
  const out = el('div', { class: 'eqbox', style: { textAlign: 'left' } });
  const conv = () => { const v = parseNum(vin.value); const f = +fs.value, t = +ts.value; const u = unitIn.value || '';
    if (!isFinite(v)) { out.textContent = 'Type a number'; return; }
    const base = v * Math.pow(10, f); const res = base / Math.pow(10, t); const pf = e => (PREF.find(p => p[1] === e) || [''])[0];
    out.innerHTML = `<div style="font-size:18px">${vin.value.trim()} ${pf(f)}${u} = <b style="color:var(--ps-blue)">${num(res, 4)} ${pf(t)}${u}</b></div><div class="muted mono" style="font-size:13px;margin-top:6px">= ${sci(base, 3)} ${u} &nbsp;(multiply by 10${supx(f)}, then divide by 10${supx(t)})</div>`; };
  [vin, fs, ts, unitIn].forEach(x => x.addEventListener('input', conv));
  cv.append(el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } }, el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'pf-v' }, 'Value'), vin), el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'pf-u' }, 'Unit'), unitIn), el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'pf-from' }, 'From prefix'), fs), el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'pf-to' }, 'To prefix'), ts)), out);
  conv();
  // drill
  Drill(P.below, { title: 'Prefix + standard form drill', cls: 'wide', gens: [
    () => { const [s, e, n] = pick(PREF.filter(p => p[0] && p[0] !== 'c')); const u = pick(['m', 's', 'Pa', 'W', 'J', 'Hz', 'V', 'F']); const v = +(rand(1, 999)).toPrecision(pick([2, 3])); const a = v * Math.pow(10, e);
      return { q: `Convert <b>${v} ${s}${u}</b> into ${u}, in standard form.`, a, unit: u, tol: 0.005, steps: [`${s} = ${n} = 10${supx(e)}`, `${v} × 10${supx(e)} = ${sci(a, 3)} ${u}`] }; },
    () => { const [s, e, n] = pick(PREF.filter(p => p[0] && p[0] !== 'c')); const u = pick(['m', 'Pa', 'W', 'Hz']); const m = +rand(1, 999).toPrecision(3); const base = m * Math.pow(10, e);
      return { q: `A value is <b>${sci(base, 3)} ${u}</b>. Write it in <b>${s}${u}</b>.`, a: m, unit: s + u, tol: 0.005, steps: [`${s} means ×10${supx(e)}, so divide by 10${supx(e)}`, `${sci(base, 3)} ÷ 10${supx(e)} = ${num(m, 3)} ${s}${u}`] }; },
    () => { const g = randi(20, 900); return { q: `Mass trap: convert <b>${g} g</b> to the SI base unit.`, a: g / 1000, unit: 'kg', tol: 0.001, steps: ['The base unit of mass is the kilogram, not the gram', `${g} g ÷ 1000 = ${num(g / 1000, 3)} kg`] }; },
    () => { const v = +rand(0.5, 9.9).toFixed(1); return { q: `Area trap: convert <b>${v} cm²</b> to m².`, a: v * 1e-4, unit: 'm²', tol: 0.005, steps: ['1 cm = 10⁻² m, so 1 cm² = (10⁻²)² m² = 10⁻⁴ m²', `${v} × 10⁻⁴ = ${sci(v * 1e-4, 2)} m²`] }; },
    () => { const v = randi(50, 950); return { q: `Volume trap: a gas occupies <b>${v} cm³</b>. Express this in m³.`, a: v * 1e-6, unit: 'm³', tol: 0.005, steps: ['1 cm³ = (10⁻² m)³ = 10⁻⁶ m³', `${v} × 10⁻⁶ = ${sci(v * 1e-6, 3)} m³`] }; },
    () => { const d = +rand(0.2, 0.9).toFixed(2); return { q: `Area trap: convert <b>${d} mm²</b> to m².`, a: d * 1e-6, unit: 'm²', tol: 0.005, steps: ['1 mm² = (10⁻³ m)² = 10⁻⁶ m²', `${d} × 10⁻⁶ = ${sci(d * 1e-6, 2)} m²`] }; },
  ] });
}

topic({
  id: 'quantities', code: '1.1', unit: 'AS 1', title: 'Physical Quantities', short: 'Quantities',
  blurb: 'Every quantity is a number times a unit. Break any unit down to the six SI base units, and move fluently between prefixes and standard form.',
  outcomes: [
    ['1.1.1', 'describe all physical quantities as consisting of a numerical magnitude and unit', 'units'],
    ['1.1.2', 'state the base units of mass, length, time, current, temperature, and amount of substance and be able to express other quantities in terms of these units', 'units'],
    ['1.1.3', 'recall and use the prefixes T, G, M, k, c, m, µ, n, p and f, and present these in standard form', 'prefixes'],
  ],
  labs: [
    { id: 'units', title: 'SI unit decomposer', hint: 'derived → base units', spec: ['1.1.1', '1.1.2'], mount: mountUnits },
    { id: 'prefixes', title: 'Powers of ten', hint: 'femto → tera', spec: ['1.1.3'], mount: mountPrefix },
  ],
  equations: [['\\text{quantity} = \\text{number} \\times \\text{unit}', 'e.g. 9.81 N kg⁻¹'], ['1\\,\\text{N} = 1\\,\\text{kg m s}^{-2}', ''], ['1\\,\\text{J} = 1\\,\\text{kg m}^{2}\\,\\text{s}^{-2}', ''], ['1\\,\\text{Pa} = 1\\,\\text{kg m}^{-1}\\,\\text{s}^{-2}', ''], ['1\\,\\text{cm}^{3} = 10^{-6}\\,\\text{m}^{3}', 'volumes cube the prefix']],
  traps: ['The base unit of mass is the <b>kilogram</b>, not the gram.', 'Temperature’s base unit is the <b>kelvin</b>; °C is not an SI base unit.', 'Newton, joule, pascal, volt… are <b>derived</b> units. Don’t list them as base units.', 'Prefixes on area/volume get squared/cubed: 1 mm² = 10⁻⁶ m².', 'µ is micro (10⁻⁶), m is milli (10⁻³). Don’t mix them up under time pressure.', 'A homogeneous equation can still be wrong: it can’t detect a missing ½ or 2π.'],
});
})();

/* ================= 1.2 Scalars and vectors ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: distance vs displacement ---------- */
function mountTrack(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.75, minH: 280, maxH: 460 });
  const Ls = 84.39, R = 36.80, lap = 400;
  function pos(s) {
    s = ((s % lap) + lap) % lap; const arc = Math.PI * R;
    if (s < Ls) return { x: -Ls / 2 + s, y: -R, a: 0 };
    s -= Ls; if (s < arc) { const t = -Math.PI / 2 + s / R; return { x: Ls / 2 + R * Math.cos(t), y: R * Math.sin(t), a: t + Math.PI / 2 }; }
    s -= arc; if (s < Ls) return { x: Ls / 2 - s, y: R, a: Math.PI };
    s -= Ls; const t = Math.PI / 2 + s / R; return { x: -Ls / 2 + R * Math.cos(t), y: R * Math.sin(t), a: t + Math.PI / 2 };
  }
  let s = 0, run = true, speed = 8;
  L.loop(dt => {
    if (run) { s += speed * dt; if (s > lap * 2) s = lap * 2; if (s >= lap * 2) run = false; }
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h;
    const sc = Math.min((W - 60) / (Ls + 2 * R + 16), (Hh - 70) / (2 * R + 16)), cx = W / 2, cy = Hh / 2 + 6;
    const X = x => cx + x * sc, Y = y => cy - y * sc;
    // track
    const outline = off => { const pts = []; for (let k = 0; k <= 200; k++) { const p = pos(k / 200 * lap); const nx = Math.cos(p.a - Math.PI / 2), ny = Math.sin(p.a - Math.PI / 2); pts.push([X(p.x + nx * off), Y(p.y + ny * off)]); } return pts; };
    c.save(); const oo = outline(-6), ii = outline(4);
    c.beginPath(); oo.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); ii.slice().reverse().forEach(p => c.lineTo(...p)); c.closePath(); c.fillStyle = alpha(C.red, 0.08); c.fill(); c.restore();
    line(c, oo, { color: C.line2, width: 1.2 }); line(c, ii, { color: C.line2, width: 1.2 });
    // covered path
    const covered = []; const sm = Math.min(s, lap); for (let k = 0; k <= 160; k++) { const p = pos(k / 160 * sm); covered.push([X(p.x), Y(p.y)]); }
    line(c, covered, { color: C.orange, width: 3.5, alpha: .8 });
    // start line
    const p0 = pos(0); line(c, [[X(p0.x), Y(p0.y) - 10], [X(p0.x), Y(p0.y) + 14]], { color: C.ink, width: 2.5 });
    rich(c, 'START', X(p0.x), Y(p0.y) + 24, { align: 'center', size: 10.5, color: C.ink2, w: 600 });
    const p = pos(s);
    // displacement
    arrow(c, X(p0.x), Y(p0.y), X(p.x), Y(p.y), { color: C.red, width: 2.5 });
    // velocity
    const vl = speed * 4.5; arrow(c, X(p.x), Y(p.y), X(p.x) + Math.cos(p.a) * vl, Y(p.y) - Math.sin(p.a) * vl, { color: C.blue, width: 2.5 });
    dot(c, X(p.x), Y(p.y), 7, C.ink, C.paper2);
    const disp = hyp(p.x - p0.x, p.y - p0.y);
    // on-canvas legend
    c.font = FONT.mono(12, 600); c.textAlign = 'left'; c.textBaseline = 'top';
    c.fillStyle = C.orange; c.fillText(`distance     ${fix(s, 1)} m   (scalar)`, 16, 14);
    c.fillStyle = C.red; c.fillText(`displacement ${fix(disp, 1)} m   (vector)`, 16, 32);
    c.fillStyle = C.blue; c.fillText(`velocity     ${fix(speed, 1)} m s⁻¹ @ ${fix(((90 - p.a / DEG) % 360 + 360) % 360, 0)}°`, 16, 50);
    const bearing = ((90 - Math.atan2(p.y - p0.y, p.x - p0.x) / DEG) % 360 + 360) % 360;
    ro.set('d', fix(s, 1) + ' m'); ro.set('s', fix(disp, 1) + ' m'); ro.set('b', disp < 0.05 ? '—' : fix(bearing, 0) + '° (bearing)');
    ro.set('av', s > 0.5 ? fix(speed, 2) + ' m s⁻¹' : '—');
    ro.set('avv', s > 0.5 ? fix(disp / (s / speed), 2) + ' m s⁻¹' : '—');
    if (Math.abs(s - lap) < speed * 0.05 + 0.2) flag.hidden = false; else if (s < lap - 5 || s > lap + 30) flag.hidden = true;
  }, [S]);
  const g = Group(P.side, 'Runner');
  Slider(g, { id: 'tr-v', label: 'Speed', min: 2, max: 12, step: 0.5, value: speed, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => speed = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Run'; }, 'pri'); Btn(b, 'Reset', () => { s = 0; run = true; pb.textContent = '❚❚ Pause'; });
  Btn(b, 'Jump to 1 lap', () => { s = lap - 0.01; });
  const ro = Readout(Group(P.side, 'Live readout'), [['d', 'Distance'], ['s', '|Displacement|', 'hl'], ['b', 'Direction'], ['av', 'Average speed'], ['avv', 'Average velocity']]);
  const flag = Note(P.side, '<b>One full lap:</b> distance = 400 m, displacement = 0, so average velocity = 0 even though average speed isn’t.', 'flag info'); flag.hidden = true;
  Note(P.side, 'The speed never changes, but the blue velocity arrow keeps turning, so the velocity <b>is</b> changing. The runner is accelerating on the bends.');
  const sc = Card(P.below, 'Scalar or vector? Classify at speed', null, 'wide');
  Sorter(sc, { cats: [['S', 'Scalar'], ['V', 'Vector']], items: [
    { t: 'Distance', c: 'S', why: 'magnitude only' }, { t: 'Displacement', c: 'V', why: 'distance in a stated direction' }, { t: 'Speed', c: 'S' }, { t: 'Velocity', c: 'V', why: 'speed in a stated direction' },
    { t: 'Mass', c: 'S', why: 'amount of matter, no direction' }, { t: 'Weight', c: 'V', why: 'it is a force, acting downwards' }, { t: 'Acceleration', c: 'V' }, { t: 'Momentum', c: 'V', why: 'p = mv, and v is a vector' },
    { t: 'Energy', c: 'S' }, { t: 'Work done', c: 'S', why: 'energy transferred, no direction' }, { t: 'Power', c: 'S' }, { t: 'Temperature', c: 'S' }, { t: 'Time', c: 'S' },
    { t: 'Force', c: 'V' }, { t: 'Tension', c: 'V', why: 'a force along the string' }, { t: 'Pressure', c: 'S', why: 'it acts equally in all directions at a point' }, { t: 'Density', c: 'S' },
    { t: 'Impulse', c: 'V', why: 'FΔt, a force times time' }, { t: 'Electric current', c: 'S', why: 'at A-level current is treated as a scalar — it doesn’t add like a vector' }, { t: 'Charge', c: 'S' }, { t: 'Gravitational field strength', c: 'V', why: 'force per kg, pointing to the mass' },
  ] });
}

/* ---------- Lab B: resolve ---------- */
function mountResolve(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.6, minH: 320, maxH: 500 });
  let mode = 'free', F = 10, th = 35, fromV = false, slope = 30, mass = 2, slide = 0, sliding = false, drag = false;
  const unit = () => Math.min(S.w, S.h) / 14;
  const org = () => ({ x: S.w * 0.28, y: S.h * 0.76 });
  Pointer(S, {
    hit: (x, y) => { if (mode !== 'free') return null; const o = org(), u = unit(); const tx = o.x + F * u * Math.cos(th * DEG), ty = o.y - F * u * Math.sin(th * DEG); return hyp(x - tx, y - ty) < 26 ? 'tip' : null; },
    down: () => drag = true, up: () => drag = false,
    move: (t, x, y) => { const o = org(), u = unit(); const dx = (x - o.x) / u, dy = (o.y - y) / u; F = clamp(Math.round(hyp(dx, dy) * 10) / 10, 0.5, 16); th = Math.round(clamp(Math.atan2(dy, dx) / DEG, -180, 180)); sF.set(F); sT.set(th); }
  });
  function drawFree(c, C) {
    const o = org(), u = unit(), W = S.w, Hh = S.h;
    // axes
    arrow(c, 14, o.y, W - 14, o.y, { color: C.ink2, width: 1.2, head: 8 }); arrow(c, o.x, Hh - 10, o.x, 14, { color: C.ink2, width: 1.2, head: 8 });
    rich(c, '*x*', W - 20, o.y + 14, { color: C.ink2, size: 13 }); rich(c, '*y*', o.x + 10, 20, { color: C.ink2, size: 13 });
    const r = th * DEG, tx = o.x + F * u * Math.cos(r), ty = o.y - F * u * Math.sin(r);
    const fx = F * Math.cos(r), fy = F * Math.sin(r);
    // components
    arrow(c, o.x, o.y, tx, o.y, { color: C.blue, width: 3 }); arrow(c, tx, o.y, tx, ty, { color: C.red, width: 3 });
    line(c, [[o.x, ty], [tx, ty]], { color: C.muted, dash: [4, 4], width: 1 });
    // right angle
    const sx = Math.sign(fx) || 1, sy = Math.sign(fy) || 1, q = 10;
    if (Math.abs(fx) * u > 14 && Math.abs(fy) * u > 14) line(c, [[tx - sx * q, o.y], [tx - sx * q, o.y - sy * q], [tx, o.y - sy * q]], { color: C.ink2, width: 1 });
    arrow(c, o.x, o.y, tx, ty, { color: C.ink, width: 3.5 });
    // angle arc
    if (!fromV) { c.beginPath(); c.arc(o.x, o.y, 34, 0, -r, r > 0); c.strokeStyle = C.orange; c.lineWidth = 1.8; c.stroke(); rich(c, '*θ*', o.x + 44 * Math.cos(r / 2), o.y - 44 * Math.sin(r / 2), { align: 'center', color: C.orange, size: 15 }); }
    else { const a0 = -Math.PI / 2, a1 = -r; c.beginPath(); c.arc(o.x, o.y, 34, a0, a1, a1 < a0); c.strokeStyle = C.orange; c.lineWidth = 1.8; c.stroke(); const am = (a0 + a1) / 2; rich(c, '*θ*', o.x + 46 * Math.cos(am), o.y + 46 * Math.sin(am), { align: 'center', color: C.orange, size: 15 }); line(c, [[o.x, o.y], [o.x, o.y - 70]], { color: C.orange, dash: [3, 3], width: 1 }); }
    const thv = fromV ? 90 - th : th;
    const cx = fromV ? 'sin' : 'cos', cy = fromV ? 'cos' : 'sin';
    rich(c, `*F* ${cx} *θ* = ${fix(fx, 2)} N`, (o.x + tx) / 2, o.y + 18 * (fy >= 0 ? 1 : -1), { align: 'center', color: C.blue, size: 13, bg: alpha(C.paper2, .85) });
    rich(c, `*F* ${cy} *θ* = ${fix(fy, 2)} N`, tx + 10 * sx, (o.y + ty) / 2, { align: sx > 0 ? 'left' : 'right', color: C.red, size: 13, bg: alpha(C.paper2, .85) });
    rich(c, `*F* = ${fix(F, 1)} N`, (o.x + tx) / 2 - 12 * Math.sin(r), (o.y + ty) / 2 - 14 * Math.cos(r), { align: 'center', color: C.ink, size: 14, w: 600, bg: alpha(C.paper2, .85) });
    handle(c, tx, ty, C.ink, drag);
    // grid scale note
    c.font = FONT.mono(10.5); c.fillStyle = C.muted; c.textAlign = 'right'; c.textBaseline = 'bottom'; c.fillText(`scale: ${fix(u / 10 * 10, 0)} px = 1 N`, W - 12, Hh - 8);
    ro.set('F', fix(F, 1) + ' N'); ro.set('t', fix(thv, 0) + '° from ' + (fromV ? 'vertical' : 'horizontal'));
    ro.set('x', `${fix(fx, 2)} N`); ro.set('y', `${fix(fy, 2)} N`); ro.set('chk', fix(hyp(fx, fy), 2) + ' N');
    eqn.innerHTML = fromV ? `${tex('F_x = F\\sin\\theta')}&nbsp;&nbsp;${tex('F_y = F\\cos\\theta')}` : `${tex('F_x = F\\cos\\theta')}&nbsp;&nbsp;${tex('F_y = F\\sin\\theta')}`;
  }
  function drawSlope(c, C, dt) {
    const W = S.w, Hh = S.h, a = slope * DEG;
    const base = Hh - 36, left = W * 0.08, run = W * 0.72, rise = Math.min(run * Math.tan(a), Hh - 80), runE = rise / Math.tan(a || 1e-6);
    const x0 = left, x1 = left + (a > 0.01 ? runE : run);
    c.beginPath(); c.moveTo(x0, base); c.lineTo(x1, base); c.lineTo(x0, base - rise); c.closePath(); c.fillStyle = alpha(C.ink2, 0.08); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 1.5; c.stroke();
    // angle at bottom right
    c.beginPath(); c.arc(x1, base, 40, Math.PI, Math.PI + a); c.strokeStyle = C.orange; c.lineWidth = 1.6; c.stroke(); rich(c, '*θ*', x1 - 54 * Math.cos(a / 2), base - 54 * Math.sin(a / 2) + 2, { align: 'center', color: C.orange, size: 15 });
    // block along slope
    const Lsl = hyp(x1 - x0, rise), ux = (x1 - x0) / Lsl, uy = rise / Lsl; // down-slope direction (screen): (+ux, +uy)
    if (sliding) { slide += dt * 0; }
    const g = G * Math.sin(a); if (sliding) { st.v += g * dt * 60; st.d += st.v * dt; if (st.d > Lsl * 0.78) { st.d = Lsl * 0.78; sliding = false; } }
    const d = Lsl * 0.22 + st.d; const bx = x0 + ux * d, by = base - rise + uy * d; // point on slope surface
    const nx = -uy, ny = -ux; // outward normal (screen coords): up-left
    const bw = 58, bh = 38; const cxb = bx + nx * bh / 2, cyb = by + ny * bh / 2;
    c.save(); c.translate(cxb, cyb); c.rotate(a); c.fillStyle = alpha(C.blue, .9); rrect(c, -bw / 2, -bh / 2, bw, bh, 3); c.fill(); c.fillStyle = C.onblue; c.font = FONT.mono(12, 600); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(`${mass} kg`, 0, 0); c.restore();
    const Wt = mass * G, sc = Math.min(5.5, 150 / Wt);
    const Wl = Wt * sc;
    arrow(c, cxb, cyb, cxb, cyb + Wl, { color: C.ink, width: 3 });
    rich(c, `*W* = *mg* = ${fix(Wt, 1)} N`, cxb + 8, cyb + Wl + 4, { color: C.ink, size: 13, base: 'top', w: 600 });
    const Wa = Wt * Math.sin(a) * sc, Wn = Wt * Math.cos(a) * sc;
    arrow(c, cxb, cyb, cxb + ux * Wa, cyb + uy * Wa, { color: C.red, width: 2.5, dash: [6, 4] });
    arrow(c, cxb, cyb, cxb - nx * Wn, cyb - ny * Wn, { color: C.green, width: 2.5, dash: [6, 4] });
    arrow(c, cxb, cyb, cxb + nx * Wn, cyb + ny * Wn, { color: C.violet, width: 2.5 });
    // angle between W and normal-into-slope
    const angW = Math.PI / 2, angN = Math.atan2(-ny, -nx);
    c.beginPath(); c.arc(cxb, cyb, 30, Math.min(angW, angN), Math.max(angW, angN)); c.strokeStyle = C.orange; c.lineWidth = 1.5; c.stroke();
    const am = (angW + angN) / 2; rich(c, '*θ*', cxb + 40 * Math.cos(am), cyb + 40 * Math.sin(am), { align: 'center', color: C.orange, size: 14 });
    rich(c, `*W* sin *θ* = ${fix(Wt * Math.sin(a), 2)} N`, cxb + ux * Wa + 8, cyb + uy * Wa + 12, { color: C.red, size: 12.5, bg: alpha(C.paper2, .85) });
    rich(c, `*W* cos *θ* = ${fix(Wt * Math.cos(a), 2)} N`, cxb - nx * Wn - 6, cyb - ny * Wn + 16, { color: C.green, size: 12.5, align: 'right', bg: alpha(C.paper2, .85) });
    rich(c, `*R* = ${fix(Wt * Math.cos(a), 2)} N`, cxb + nx * Wn - 8, cyb + ny * Wn - 8, { color: C.violet, size: 12.5, align: 'right', bg: alpha(C.paper2, .85) });
    ro.set('F', fix(Wt, 2) + ' N'); ro.set('t', fix(slope, 0) + '°'); ro.set('x', fix(Wt * Math.sin(a), 2) + ' N ↓slope'); ro.set('y', fix(Wt * Math.cos(a), 2) + ' N ⟂'); ro.set('chk', fix(G * Math.sin(a), 2) + ' m s⁻²');
    eqn.innerHTML = `${tex('\\text{along slope: } W\\sin\\theta')}<br>${tex('\\text{perpendicular: } W\\cos\\theta')}`;
  }
  const st = { v: 0, d: 0 };
  L.loop(dt => { const c = S.begin(), C = Theme.c; if (mode === 'free') drawFree(c, C); else drawSlope(c, C, dt); }, [S]);
  const g0 = Group(P.side, 'Mode');
  const gFree = el('div', { class: 'grp' }), gSl = el('div', { class: 'grp' });
  Seg(g0, { options: [['free', 'Free vector'], ['slope', 'Inclined plane']], value: mode, onchange: v => { mode = v; gFree.hidden = v !== 'free'; gSl.hidden = v === 'free'; roLab(); } });
  P.side.append(gFree, gSl);
  const sF = Slider(gFree, { id: 'rv-F', label: 'Magnitude <i>F</i>', min: 0.5, max: 16, step: 0.1, value: F, unit: 'N', fmt: v => fix(v, 1), oninput: v => F = v });
  const sT = Slider(gFree, { id: 'rv-t', label: 'Direction (from +<i>x</i>)', min: -180, max: 180, step: 1, value: th, unit: '°', fmt: v => fix(v, 0), oninput: v => th = v });
  Seg(gFree, { label: 'Angle θ given from…', options: [['h', 'Horizontal'], ['v', 'Vertical']], value: 'h', onchange: v => fromV = v === 'v' });
  Note(gFree, 'Drag the arrowhead. <b>Trap:</b> if θ is measured from the <b>vertical</b>, the sin and cos swap over. Always check which side is adjacent to θ.');
  Slider(gSl, { id: 'rv-sl', label: 'Slope angle θ', min: 0, max: 60, step: 1, value: slope, unit: '°', fmt: v => fix(v, 0), oninput: v => { slope = v; st.d = 0; st.v = 0; sliding = false; } });
  Slider(gSl, { id: 'rv-m', label: 'Mass', min: 0.5, max: 6, step: 0.5, value: mass, unit: 'kg', fmt: v => fix(v, 1), oninput: v => mass = v });
  const bb = Btns(gSl); Btn(bb, 'Release (frictionless)', () => { st.d = 0; st.v = 0; sliding = true; }, 'pri'); Btn(bb, 'Reset', () => { st.d = 0; st.v = 0; sliding = false; });
  Note(gSl, 'The angle between <b>W</b> and the normal to the slope equals the slope angle θ (both are 90° minus the same angle).');
  gSl.hidden = true;
  const gr = Group(P.side, 'Components');
  const eqn = el('div', { class: 'eqbox', style: { textAlign: 'left', fontSize: '18px', padding: '2px 0' } }); gr.append(eqn);
  let ro = Readout(gr, [['F', 'Magnitude'], ['t', 'Angle'], ['x', 'Horizontal <i>F<sub>x</sub></i>', 'hl'], ['y', 'Vertical <i>F<sub>y</sub></i>', 'hl'], ['chk', '√(F<sub>x</sub>² + F<sub>y</sub>²)']]);
  function roLab() { const dts = ro.el.querySelectorAll('dt'); const lab = mode === 'free' ? ['Magnitude', 'Angle', 'Horizontal <i>F<sub>x</sub></i>', 'Vertical <i>F<sub>y</sub></i>', 'Check √(F<sub>x</sub>² + F<sub>y</sub>²)'] : ['Weight <i>W</i>', 'Slope θ', 'Along slope', 'Into slope', 'Acceleration <i>g</i> sin θ']; dts.forEach((d, i) => d.innerHTML = lab[i]); }
  roLab();
  Drill(P.below, { title: 'Resolving drill', cls: 'wide', gens: [
    () => { const F = randi(8, 60), a = randi(15, 75); const h = Math.random() < .5; return { q: `A force of <b>${F} N</b> acts at <b>${a}°</b> to the horizontal. Find its <b>${h ? 'horizontal' : 'vertical'}</b> component.`, a: h ? F * Math.cos(a * DEG) : F * Math.sin(a * DEG), unit: 'N', tol: 0.01, steps: [h ? `Adjacent to θ: F cos θ` : `Opposite θ: F sin θ`, `${F} × ${h ? 'cos' : 'sin'} ${a}° = ${fix(h ? F * Math.cos(a * DEG) : F * Math.sin(a * DEG), 2)} N`] }; },
    () => { const F = randi(8, 60), a = randi(15, 75); return { q: `A rope pulls with <b>${F} N</b> at <b>${a}°</b> to the <b>vertical</b>. Find the horizontal component.`, a: F * Math.sin(a * DEG), unit: 'N', tol: 0.01, steps: ['The angle is to the vertical, so the horizontal side is opposite θ', `F sin θ = ${F} × sin ${a}° = ${fix(F * Math.sin(a * DEG), 2)} N`] }; },
    () => { const m = randi(2, 25), a = randi(10, 50); const Wt = m * G; return { q: `A <b>${m} kg</b> box rests on a <b>${a}°</b> slope. Find the component of its weight <b>down the slope</b> (g = 9.81 N kg⁻¹).`, a: Wt * Math.sin(a * DEG), unit: 'N', tol: 0.01, steps: [`W = mg = ${fix(Wt, 1)} N`, `Down the slope: W sin θ = ${fix(Wt, 1)} × sin ${a}° = ${fix(Wt * Math.sin(a * DEG), 1)} N`] }; },
  ] });
}

/* ---------- Lab C: adding vectors ---------- */
function mountAdd(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.6, minH: 320, maxH: 520 });
  let A = { x: 8, y: 0 }, B = { x: 0, y: 6 }, lock = true, method = 'tt', active = null, scale = false, units = ['N', 'force'], labels = ['A', 'B'];
  const u = () => Math.min(S.w / 22, S.h / 14);
  const org = () => ({ x: S.w * 0.2, y: S.h * 0.8 });
  const toPx = v => { const o = org(); return { x: o.x + v.x * u(), y: o.y - v.y * u() }; };
  Pointer(S, {
    hit: (x, y) => { const a = toPx(A); let b = toPx(B); if (method === 'tt') b = { x: a.x + B.x * u(), y: a.y - B.y * u() }; if (hyp(x - b.x, y - b.y) < 24) return 'B'; if (hyp(x - a.x, y - a.y) < 24) return 'A'; return null; },
    down: t => active = t, up: () => active = null,
    move: (t, x, y) => {
      const o = org(); let vx = (x - o.x) / u(), vy = (o.y - y) / u();
      if (t === 'A') { const oldA = Math.atan2(A.y, A.x); A = { x: Math.round(vx * 2) / 2, y: Math.round(vy * 2) / 2 }; if (hyp(A.x, A.y) < 0.5) A = { x: 0.5, y: 0 }; if (lock) { const mb = hyp(B.x, B.y), ang = Math.atan2(A.y, A.x) + Math.sign(Math.atan2(B.y, B.x) - oldA || 1) * Math.PI / 2; B = { x: mb * Math.cos(ang), y: mb * Math.sin(ang) }; } }
      else { if (method === 'tt') { vx -= A.x; vy -= A.y; } if (lock) { const aa = Math.atan2(A.y, A.x), px = -Math.sin(aa), py = Math.cos(aa); const m = Math.round((vx * px + vy * py) * 2) / 2 || 0.5; B = { x: m * px, y: m * py }; } else B = { x: Math.round(vx * 2) / 2, y: Math.round(vy * 2) / 2 }; }
    }
  });
  L.loop(() => {
    const c = S.begin(), C = Theme.c, o = org(), U = u(), W = S.w, Hh = S.h;
    // axes
    line(c, [[10, o.y], [W - 10, o.y]], { color: C.line2, width: 1 }); line(c, [[o.x, 10], [o.x, Hh - 10]], { color: C.line2, width: 1 });
    const a = toPx(A), bO = toPx(B), R = { x: A.x + B.x, y: A.y + B.y }, r = toPx(R);
    const bT = { x: a.x + B.x * U, y: a.y - B.y * U };
    if (method === 'pg') {
      line(c, [[a.x, a.y], [r.x, r.y]], { color: C.red, dash: [5, 5], width: 1.3 }); line(c, [[bO.x, bO.y], [r.x, r.y]], { color: C.blue, dash: [5, 5], width: 1.3 });
      c.beginPath(); c.moveTo(o.x, o.y); c.lineTo(a.x, a.y); c.lineTo(r.x, r.y); c.lineTo(bO.x, bO.y); c.closePath(); c.fillStyle = alpha(C.violet, .06); c.fill();
    }
    if (scale) {
      // protractor at origin
      const pr = Math.min(120, hyp(r.x - o.x, r.y - o.y) * 0.6 + 40); c.save(); c.strokeStyle = alpha(C.ink2, .5); c.lineWidth = 1; c.beginPath(); c.arc(o.x, o.y, pr, Math.PI, 0); c.stroke();
      for (let d = 0; d <= 180; d += 10) { const t = d * DEG, l = d % 30 === 0 ? 12 : 6; c.beginPath(); c.moveTo(o.x + pr * Math.cos(t), o.y - pr * Math.sin(t)); c.lineTo(o.x + (pr - l) * Math.cos(t), o.y - (pr - l) * Math.sin(t)); c.stroke(); if (d % 30 === 0) { c.fillStyle = C.muted; c.font = FONT.mono(9); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(d, o.x + (pr - 22) * Math.cos(t), o.y - (pr - 22) * Math.sin(t)); } }
      c.restore();
      // ruler ticks along R
      const Rm = hyp(R.x, R.y), ux2 = R.x / Rm, uy2 = R.y / Rm; for (let k = 1; k < Rm; k++) { const px = o.x + ux2 * k * U, py = o.y - uy2 * k * U; line(c, [[px - uy2 * 5, py - ux2 * 5], [px + uy2 * 5, py + ux2 * 5]], { color: C.violet, width: 1 }); }
    }
    arrow(c, o.x, o.y, a.x, a.y, { color: C.blue, width: 3.2 });
    if (method === 'tt') arrow(c, a.x, a.y, bT.x, bT.y, { color: C.red, width: 3.2 }); else arrow(c, o.x, o.y, bO.x, bO.y, { color: C.red, width: 3.2 });
    arrow(c, o.x, o.y, r.x, r.y, { color: C.violet, width: 3.8 });
    // right angle marker
    const angBetween = Math.abs(((Math.atan2(B.y, B.x) - Math.atan2(A.y, A.x)) / DEG + 540) % 360 - 180);
    if (Math.abs(angBetween - 90) < 0.5 && method === 'tt') { const au = { x: A.x / hyp(A.x, A.y), y: A.y / hyp(A.x, A.y) }, bu = { x: B.x / hyp(B.x, B.y), y: B.y / hyp(B.x, B.y) }; const q = 11; line(c, [[a.x - au.x * q, a.y + au.y * q], [a.x - au.x * q + bu.x * q, a.y + au.y * q - bu.y * q], [a.x + bu.x * q, a.y - bu.y * q]], { color: C.ink2, width: 1 }); }
    // angle of R relative to A
    const ra = Math.atan2(R.y, R.x), aa = Math.atan2(A.y, A.x);
    c.beginPath(); c.arc(o.x, o.y, 40, -aa, -ra, ra > aa); c.strokeStyle = C.orange; c.lineWidth = 1.6; c.stroke(); rich(c, '*θ*', o.x + 52 * Math.cos((ra + aa) / 2), o.y - 52 * Math.sin((ra + aa) / 2), { align: 'center', color: C.orange, size: 14 });
    const mA = hyp(A.x, A.y), mB = hyp(B.x, B.y), mR = hyp(R.x, R.y); const rel = ((ra - aa) / DEG + 540) % 360 - 180;
    rich(c, `*${labels[0]}* = ${fix(mA, 1)} ${units[0]}`, (o.x + a.x) / 2, (o.y + a.y) / 2 + 16, { align: 'center', color: C.blue, size: 13, w: 600, bg: alpha(C.paper2, .8) });
    const bm = method === 'tt' ? { x: (a.x + bT.x) / 2, y: (a.y + bT.y) / 2 } : { x: (o.x + bO.x) / 2, y: (o.y + bO.y) / 2 };
    rich(c, `*${labels[1]}* = ${fix(mB, 1)} ${units[0]}`, bm.x + 10, bm.y, { color: C.red, size: 13, w: 600, bg: alpha(C.paper2, .8) });
    rich(c, `*R* = ${fix(mR, 2)} ${units[0]}`, (o.x + r.x) / 2 - 14, (o.y + r.y) / 2 - 14, { align: 'right', color: C.violet, size: 14, w: 700, bg: alpha(C.paper2, .8) });
    handle(c, a.x, a.y, C.blue, active === 'A'); const bh = method === 'tt' ? bT : bO; handle(c, bh.x, bh.y, C.red, active === 'B');
    c.font = FONT.mono(10.5); c.fillStyle = C.muted; c.textAlign = 'right'; c.textBaseline = 'bottom'; c.fillText(`scale: 1 square (${fix(U, 0)} px) = 1 ${units[0]}`, W - 12, Hh - 8);
    ro.set('a', fix(mA, 2) + ' ' + units[0]); ro.set('b', fix(mB, 2) + ' ' + units[0]); ro.set('ang', fix(angBetween, 1) + '°'); ro.set('r', fix(mR, 2) + ' ' + units[0]); ro.set('th', fix(Math.abs(rel), 1) + '° from ' + labels[0]);
    const perp = Math.abs(angBetween - 90) < 0.5;
    const k = `${perp}|${fix(mA, 2)}|${fix(mB, 2)}`;
    if (calc._k !== k) { calc._k = k; calc.innerHTML = perp ? `<div class="flag ok" style="margin-bottom:8px">Perpendicular → Pythagoras + trig</div>${tex(`R = \\sqrt{${labels[0]}^2 + ${labels[1]}^2} = \\sqrt{${fix(mA, 1)}^2 + ${fix(mB, 1)}^2}`)}<br>${tex(`R = ${fix(mR, 2)}\\,\\text{${units[0]}}`)}<br><br>${tex(`\\theta = \\tan^{-1}\\frac{${labels[1]}}{${labels[0]}} = \\tan^{-1}\\frac{${fix(mB, 1)}}{${fix(mA, 1)}} = ${fix(Math.atan(mB / mA) / DEG, 1)}^\\circ`)}` : `<div class="flag info" style="margin-bottom:8px">Not perpendicular → add components</div>${tex(`R_x = ${fix(A.x, 1)} + ${fix(B.x, 1)} = ${fix(R.x, 2)}`)}<br>${tex(`R_y = ${fix(A.y, 1)} + ${fix(B.y, 1)} = ${fix(R.y, 2)}`)}<br>${tex(`R = \\sqrt{R_x^2 + R_y^2} = ${fix(mR, 2)}`)}`; }
  }, [S]);
  const g = Group(P.side, 'Construction');
  Seg(g, { options: [['tt', 'Tip-to-tail'], ['pg', 'Parallelogram']], value: method, onchange: v => method = v });
  Switch(g, { label: 'Lock B at 90° to A (spec)', value: lock, onchange: v => { lock = v; if (v) { const aa = Math.atan2(A.y, A.x), m = hyp(B.x, B.y); B = { x: -Math.sin(aa) * m, y: Math.cos(aa) * m }; } } });
  Switch(g, { label: 'Scale-drawing overlay', value: scale, onchange: v => scale = v });
  const gp = Group(P.side, 'Scenario');
  const sc = el('select', { class: 'sel', id: 'av-sc', 'aria-label': 'scenario' }, [['f', 'Two forces on a point (N)'], ['boat', 'Boat crossing a river (m s⁻¹)'], ['plane', 'Plane in a crosswind (m s⁻¹)'], ['walk', 'Walk: 400 m E then 300 m N']].map(([v, t]) => el('option', { value: v }, t)));
  sc.addEventListener('change', () => { const v = sc.value; lock = true;
    if (v === 'f') { A = { x: 8, y: 0 }; B = { x: 0, y: 6 }; units = ['N']; labels = ['A', 'B']; }
    if (v === 'boat') { A = { x: 0, y: 8 }; B = { x: 3, y: 0 }; units = ['m s⁻¹']; labels = ['v_b', 'v_c']; }
    if (v === 'plane') { A = { x: 12, y: 0 }; B = { x: 0, y: -5 }; units = ['m s⁻¹']; labels = ['v_p', 'v_w']; }
    if (v === 'walk') { A = { x: 8, y: 0 }; B = { x: 0, y: 6 }; units = ['×50 m']; labels = ['E', 'N']; }
  });
  gp.append(sc);
  const gr = Group(P.side, 'Result');
  const ro = Readout(gr, [['a', '|A|'], ['b', '|B|'], ['ang', 'Angle between'], ['r', 'Resultant |R|', 'hl big'], ['th', 'Direction']]);
  const calc = el('div', { style: { fontSize: '15px', lineHeight: '2' } }); gr.append(calc);
  Drill(P.below, { title: 'Resultant drill (perpendicular vectors)', cls: 'wide', gens: [
    () => { const a = randi(3, 30), b = randi(3, 30); const R = hyp(a, b); return { q: `Two perpendicular forces of <b>${a} N</b> and <b>${b} N</b> act on a point. Find the magnitude of the resultant.`, a: R, unit: 'N', tol: 0.01, steps: [`R = √(${a}² + ${b}²) = √${a * a + b * b}`, `R = ${fix(R, 2)} N`] }; },
    () => { const a = randi(3, 30), b = randi(3, 30); const t = Math.atan(b / a) / DEG; return { q: `Perpendicular forces <b>${a} N</b> (east) and <b>${b} N</b> (north). Find the angle of the resultant from east, in degrees.`, a: t, unit: '°', tol: 0.01, steps: [`tan θ = opposite/adjacent = ${b}/${a}`, `θ = tan⁻¹(${fix(b / a, 3)}) = ${fix(t, 1)}°`] }; },
    () => { const vb = +rand(1.5, 5).toFixed(1), vc = +rand(0.5, 3).toFixed(1); const R = hyp(vb, vc); return { q: `A boat heads straight across a river at <b>${vb} m s⁻¹</b>; the current flows at <b>${vc} m s⁻¹</b>. Find the boat’s resultant speed.`, a: R, unit: 'm s⁻¹', tol: 0.01, steps: ['The velocities are perpendicular', `v = √(${vb}² + ${vc}²) = ${fix(R, 2)} m s⁻¹`] }; },
  ] });
}

/* ---------- Lab D: equilibrium ---------- */
function mountEquil(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.45, minH: 380, maxH: 560, mobileAspect: 0.62 });
  let m1 = 0.3, m2 = 0.4, m3 = 0.5, k = null, v = { x: 0, y: 0 }, dragging = false, noEq = false;
  const geo = () => { const W = S.w, Hh = S.h; const tri = W > 640; return { p1: { x: W * (tri ? 0.1 : 0.14), y: 46 }, p2: { x: W * (tri ? 0.58 : 0.86), y: 46 }, pr: 14, floor: tri ? Hh - 14 : Hh * 0.6, tri, W, Hh }; };
  const scalePx = () => { const g = geo(); return (g.p2.x - g.p1.x); }; // px per metre of pulley separation (1 m)
  function reset() { const g = geo(); k = { x: (g.p1.x + g.p2.x) / 2, y: g.p1.y + (g.p2.x - g.p1.x) * 0.45 }; v = { x: 0, y: 0 }; }
  function forces(pk) {
    const g = geo(); const d1 = { x: g.p1.x - pk.x, y: g.p1.y - pk.y }, d2 = { x: g.p2.x - pk.x, y: g.p2.y - pk.y };
    const l1 = hyp(d1.x, d1.y), l2 = hyp(d2.x, d2.y);
    const T1 = m1 * G, T2 = m2 * G, W3 = m3 * G;
    return { T1, T2, W3, u1: { x: d1.x / l1, y: d1.y / l1 }, u2: { x: d2.x / l2, y: d2.y / l2 }, Fx: T1 * d1.x / l1 + T2 * d2.x / l2, Fy: T1 * d1.y / l1 + T2 * d2.y / l2 + W3 };
  }
  Pointer(S, { hit: (x, y) => k && hyp(x - k.x, y - k.y) < 26 ? 'k' : null, down: () => dragging = true, up: () => dragging = false, move: (t, x, y) => { const g = geo(); k.x = clamp(x, g.p1.x + 20, g.p2.x - 20); k.y = clamp(y, g.p1.y + 30, g.floor - 60); v = { x: 0, y: 0 }; } });
  L.loop(dt => {
    const g = geo(); if (!k) reset(); const C = Theme.c, c = S.begin();
    if (!dragging) {
      const n = 6; for (let i = 0; i < n; i++) {
        const f = forces(k); const M = m1 + m2 + m3; const sp = scalePx();
        v.x += f.Fx / M * sp * dt / n * 6; v.y += f.Fy / M * sp * dt / n * 6;
        const damp = Math.exp(-7 * dt / n); v.x *= damp; v.y *= damp;
        k.x += v.x * dt / n; k.y += v.y * dt / n;
        const kx = clamp(k.x, g.p1.x + 16, g.p2.x - 16), ky = clamp(k.y, g.p1.y + 18, g.floor - 50);
        if (kx !== k.x) { k.x = kx; v.x = 0; } if (ky !== k.y) { k.y = ky; v.y = 0; }
      }
    }
    noEq = !(m3 < m1 + m2 && m1 < m2 + m3 && m2 < m1 + m3);
    const f = forces(k);
    // ceiling
    c.fillStyle = C.ink2; c.fillRect(g.p1.x - 30, 22, g.p2.x - g.p1.x + 60, 6);
    for (const p of [g.p1, g.p2]) { line(c, [[p.x, 28], [p.x, p.y]], { color: C.ink2, width: 2 }); }
    // strings and hanging masses
    const L1 = hyp(g.p1.x - k.x, g.p1.y - k.y), L2 = hyp(g.p2.x - k.x, g.p2.y - k.y);
    const tot = scalePx() * 1.25;
    const hang1 = clamp(tot - L1, 20, g.floor - g.p1.y - 40), hang2 = clamp(tot - L2, 20, g.floor - g.p2.y - 40);
    const drawMass = (x, y, m, col, lab) => { const s = 38 + m * 26; c.fillStyle = col; rrect(c, x - s / 2, y, s, s * 0.9, 3); c.fill(); c.fillStyle = C.onblue; c.font = FONT.mono(11, 600); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(`${Math.round(m * 1000)} g`, x, y + s * 0.45); if (lab) rich(c, lab, x, y + s + 12, { align: 'center', color: C.muted, size: 11 }); };
    line(c, [[k.x, k.y], [g.p1.x, g.p1.y]], { color: C.ink, width: 1.6 }); line(c, [[g.p1.x - g.pr, g.p1.y], [g.p1.x - g.pr, g.p1.y + hang1]], { color: C.ink, width: 1.6 });
    line(c, [[k.x, k.y], [g.p2.x, g.p2.y]], { color: C.ink, width: 1.6 }); line(c, [[g.p2.x + g.pr, g.p2.y], [g.p2.x + g.pr, g.p2.y + hang2]], { color: C.ink, width: 1.6 });
    line(c, [[k.x, k.y], [k.x, k.y + 40]], { color: C.ink, width: 1.6 });
    drawMass(Math.max(g.p1.x - g.pr, 32), g.p1.y + hang1, m1, C.blue); drawMass(Math.min(g.p2.x + g.pr, g.W - 32), g.p2.y + hang2, m2, C.red); drawMass(k.x, k.y + 40, m3, C.green);
    for (const p of [g.p1, g.p2]) { c.beginPath(); c.arc(p.x, p.y, g.pr, 0, TAU); c.fillStyle = C.paper2; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 2; c.stroke(); dot(c, p.x, p.y, 2.5, C.ink); }
    // force arrows at knot
    const fs = Math.min(16, scalePx() / 22);
    arrow(c, k.x, k.y, k.x + f.u1.x * f.T1 * fs, k.y + f.u1.y * f.T1 * fs, { color: C.blue, width: 3 });
    arrow(c, k.x, k.y, k.x + f.u2.x * f.T2 * fs, k.y + f.u2.y * f.T2 * fs, { color: C.red, width: 3 });
    arrow(c, k.x, k.y, k.x, k.y + f.W3 * fs, { color: C.green, width: 3 });
    // angles from vertical
    const a1 = Math.atan2(-f.u1.x, -f.u1.y) , a2 = Math.atan2(f.u2.x, -f.u2.y); // angle between up-vertical and string
    line(c, [[k.x, k.y], [k.x, k.y - 70]], { color: C.muted, width: 1, dash: [3, 4] });
    c.strokeStyle = C.orange; c.lineWidth = 1.5; c.beginPath(); c.arc(k.x, k.y, 30, -Math.PI / 2 - a1, -Math.PI / 2); c.stroke(); c.beginPath(); c.arc(k.x, k.y, 36, -Math.PI / 2, -Math.PI / 2 + a2); c.stroke();
    rich(c, `*θ*₁ ${fix(a1 / DEG, 0)}°`, k.x - 38, k.y - 46, { align: 'right', color: C.orange, size: 12, bg: alpha(C.paper2, .8) });
    rich(c, `*θ*₂ ${fix(a2 / DEG, 0)}°`, k.x + 40, k.y - 46, { color: C.orange, size: 12, bg: alpha(C.paper2, .8) });
    handle(c, k.x, k.y, C.ink, dragging);
    // triangle of forces
    const box = g.tri ? { x: g.W * 0.66, y: 70, w: g.W * 0.31, h: g.Hh - 110 } : { x: 10, y: g.Hh * 0.63, w: g.W - 20, h: g.Hh * 0.35 };
    c.fillStyle = alpha(C.paper2, .9); c.fillRect(box.x, box.y, box.w, box.h); c.strokeStyle = C.line2; c.lineWidth = 1; c.strokeRect(box.x + .5, box.y + .5, box.w, box.h);
    rich(c, 'TRIANGLE OF FORCES', box.x + 10, box.y + 14, { color: C.muted, size: 10.5, w: 600 });
    const mx = Math.max(f.W3, f.T1, f.T2); const ts = Math.min(box.w, box.h - 30) * 0.8 / mx;
    const st = { x: box.x + box.w * 0.5 + (f.T2 - f.T1) * 0.0 , y: box.y + 32 };
    const q1 = { x: st.x, y: st.y + f.W3 * ts }, q2 = { x: q1.x + f.u1.x * f.T1 * ts, y: q1.y + f.u1.y * f.T1 * ts }, q3 = { x: q2.x + f.u2.x * f.T2 * ts, y: q2.y + f.u2.y * f.T2 * ts };
    const off = { x: box.x + box.w / 2 - (Math.min(st.x, q1.x, q2.x, q3.x) + Math.max(st.x, q1.x, q2.x, q3.x)) / 2, y: 0 };
    const sh = p => ({ x: p.x + off.x, y: p.y + off.y });
    const A1 = sh(st), A2 = sh(q1), A3 = sh(q2), A4 = sh(q3);
    arrow(c, A1.x, A1.y, A2.x, A2.y, { color: C.green, width: 2.5 }); arrow(c, A2.x, A2.y, A3.x, A3.y, { color: C.blue, width: 2.5 }); arrow(c, A3.x, A3.y, A4.x, A4.y, { color: C.red, width: 2.5 });
    const gap = hyp(A4.x - A1.x, A4.y - A1.y);
    if (gap > 3) { line(c, [[A4.x, A4.y], [A1.x, A1.y]], { color: C.muted, dash: [3, 3], width: 1.2 }); rich(c, 'gap = resultant ≠ 0', box.x + 10, box.y + box.h - 12, { color: C.red, size: 11 }); }
    else rich(c, 'closed ⇒ equilibrium', box.x + 10, box.y + box.h - 12, { color: C.green, size: 11, w: 600 });
    ro.set('t1', fix(f.T1, 2) + ' N'); ro.set('t2', fix(f.T2, 2) + ' N'); ro.set('w', fix(f.W3, 2) + ' N');
    ro.set('a', `${fix(a1 / DEG, 1)}° / ${fix(a2 / DEG, 1)}°`);
    ro.set('h', fix(f.T1 * Math.sin(a1) - f.T2 * Math.sin(a2), 3) + ' N'); ro.set('v', fix(f.T1 * Math.cos(a1) + f.T2 * Math.cos(a2) - f.W3, 3) + ' N');
    flag.hidden = !noEq;
  }, [S]);
  S.onresize = () => { reset(); };
  const g = Group(P.side, 'Hanging masses');
  const mk = (id, lab, val, set) => Slider(g, { id, label: lab, min: 0.05, max: 0.8, step: 0.01, value: val, unit: 'g', fmt: v => fix(v * 1000, 0), oninput: set });
  mk('eq-m1', '<span style="color:var(--ps-blue)">■</span> Left, <i>m</i>₁', m1, v => m1 = v); mk('eq-m2', '<span style="color:var(--ps-red)">■</span> Right, <i>m</i>₂', m2, v => m2 = v); mk('eq-m3', '<span style="color:var(--ps-green)">■</span> Centre, <i>m</i>₃', m3, v => m3 = v);
  const b = Btns(g); Btn(b, 'Nudge knot', () => { v.x += rand(-300, 300); v.y += rand(-300, 100); }, 'pri'); Btn(b, 'Reset', reset);
  const flag = Note(g, '<b>No equilibrium possible.</b> Three forces can only close a triangle if each is smaller than the sum of the other two.', 'flag'); flag.hidden = true;
  const gr = Group(P.side, 'At the knot');
  const ro = Readout(gr, [['t1', 'Tension <i>T</i>₁ = <i>m</i>₁<i>g</i>'], ['t2', 'Tension <i>T</i>₂ = <i>m</i>₂<i>g</i>'], ['w', 'Weight <i>W</i> = <i>m</i>₃<i>g</i>'], ['a', 'θ₁ / θ₂ (from vertical)'], ['h', 'Σ horizontal', 'hl'], ['v', 'Σ vertical', 'hl']]);
  Note(gr, 'Drag the knot anywhere and let go. It always returns to the one point where both sums are zero.');
  Card(P.below, 'Solving 3-force equilibrium (exam method)', `<ol><li>Draw a free-body diagram at the point.</li><li>Resolve <b>horizontally</b>: ${tex('T_1\\sin\\theta_1 = T_2\\sin\\theta_2')}</li><li>Resolve <b>vertically</b>: ${tex('T_1\\cos\\theta_1 + T_2\\cos\\theta_2 = W')}</li><li>Solve simultaneously, or draw the closed triangle of forces to scale.</li><li>Symmetric case: ${tex('2T\\cos\\theta = W \\Rightarrow T = \\frac{W}{2\\cos\\theta}')}</li></ol>`);
  Drill(P.below, { title: 'Equilibrium drill', gens: [
    () => { const m = randi(2, 20), t = randi(15, 70); const Wt = m * G, T = Wt / (2 * Math.cos(t * DEG)); return { q: `A <b>${m} kg</b> lamp hangs from two identical cables, each at <b>${t}°</b> to the vertical. Find the tension in each cable.`, a: T, unit: 'N', tol: 0.01, steps: [`Vertically: 2T cos θ = mg = ${fix(Wt, 1)} N`, `T = ${fix(Wt, 1)} / (2 cos ${t}°) = ${fix(T, 1)} N`] }; },
    () => { const Wt = randi(20, 200), t1 = randi(20, 60), t2 = randi(20, 60); const T1 = Wt * Math.sin(t2 * DEG) / Math.sin((t1 + t2) * DEG); return { q: `A weight of <b>${Wt} N</b> hangs from two strings at <b>${t1}°</b> and <b>${t2}°</b> to the vertical. Find the tension in the string at ${t1}°.`, a: T1, unit: 'N', tol: 0.01, steps: [`Horizontal: T₁ sin ${t1}° = T₂ sin ${t2}°`, `Vertical: T₁ cos ${t1}° + T₂ cos ${t2}° = ${Wt}`, `Solving: T₁ = W sin θ₂ / sin(θ₁ + θ₂) = ${fix(T1, 1)} N`] }; },
  ] });
}

topic({
  id: 'vectors', code: '1.2', unit: 'AS 1', title: 'Scalars & Vectors', short: 'Vectors',
  blurb: 'Direction changes everything. Resolve forces, add them tip-to-tail, and see why three forces in equilibrium always close a triangle.',
  outcomes: [
    ['1.2.1', 'distinguish between and give examples of scalar and vector quantity', 'track'],
    ['1.2.2', 'resolve a vector into two perpendicular components', 'resolve'],
    ['1.2.3', 'calculate the resultant of two coplanar vectors by calculation or scale drawing, with calculations limited to two perpendicular vectors', 'add'],
    ['1.2.4', 'solve problems that include two or three coplanar forces acting at a point, in the context of equilibrium', 'equil'],
  ],
  labs: [
    { id: 'track', title: 'Distance vs displacement', hint: '400 m track', spec: ['1.2.1'], mount: mountTrack },
    { id: 'resolve', title: 'Resolve a vector', hint: 'drag the arrowhead', spec: ['1.2.2'], mount: mountResolve },
    { id: 'add', title: 'Add two vectors', hint: 'tip-to-tail', spec: ['1.2.3'], mount: mountAdd },
    { id: 'equil', title: 'Three-force equilibrium', hint: 'pulleys and a knot', spec: ['1.2.4'], mount: mountEquil },
  ],
  equations: [['F_x = F\\cos\\theta', 'adjacent to θ'], ['F_y = F\\sin\\theta', 'opposite θ'], ['R = \\sqrt{A^2 + B^2}', 'perpendicular only'], ['\\theta = \\tan^{-1}\\frac{B}{A}', ''], ['\\Sigma F_x = 0,\; \\Sigma F_y = 0', 'equilibrium']],
  traps: ['Say <b>which</b> angle your direction is measured from, e.g. “37° above the horizontal”.', 'Sin/cos swap when θ is measured from the vertical.', 'Mass is a scalar, weight is a vector. Examiners love this one.', 'Pythagoras only works for <b>perpendicular</b> vectors.', 'In a scale drawing, state your scale and draw it big (at least half the page).', 'Equilibrium needs <b>both</b> resultant force = 0 <b>and</b> (later) resultant moment = 0.'],
});
})();

/* ================= 1.3 Principle of moments ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: the see-saw ---------- */
function mountSeesaw(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.1, minH: 300, maxH: 460, mobileAspect: 1.2 });
  // masses: position along beam in m (−1..1 from pivot), mass kg
  const M = [{ x: -0.6, m: 2, col: 'blue' }, { x: 0.4, m: 3, col: 'red' }, { x: 0.8, m: 0, col: 'green' }];
  let th = 0, om = 0, beamM = 1, pivotOff = 0, drag = -1;
  const BL = 2.2; // beam length m, centre at 0, pivot at pivotOff
  const geo = () => { const W = S.w, H = S.h; const sc = Math.min(W * 0.42, 420) / (BL / 2); return { W, H, sc, cx: W / 2, cy: H * 0.56 }; };
  const toScr = (x, g) => [g.cx + (x - pivotOff) * g.sc * Math.cos(th), g.cy + (x - pivotOff) * g.sc * Math.sin(th)];
  Pointer(S, {
    hit: (px, py) => { const g = geo(); let best = -1, bd = 34; M.forEach((o, i) => { if (!o.m) return; const [x, y] = toScr(o.x, g); const d = hyp(px - x, py - (y - 22)); if (d < bd) { bd = d; best = i; } }); return best >= 0 ? best : null; },
    down: i => drag = i, up: () => drag = -1,
    move: (i, px) => { const g = geo(); M[i].x = clamp(+((px - g.cx) / g.sc / Math.cos(th) + pivotOff).toFixed(2), -BL / 2 + 0.05, BL / 2 - 0.05); M[i].x = Math.round(M[i].x * 20) / 20; }
  });
  L.loop(dt => {
    // torques about pivot (clockwise positive = right side down, screen y down)
    let tq = 0, I = beamM * BL * BL / 12 + beamM * pivotOff * pivotOff;
    for (const o of M) { const r = o.x - pivotOff; tq += o.m * G * r * Math.cos(th); I += o.m * r * r; }
    tq += beamM * G * (0 - pivotOff) * Math.cos(th);
    const alphaA = tq / Math.max(I, 0.05) - 2.4 * om;
    om += alphaA * dt; th += om * dt;
    const lim = 0.2; if (th > lim) { th = lim; om = Math.min(0, om) * -0.2; } if (th < -lim) { th = -lim; om = Math.max(0, om) * -0.2; }
    const c = S.begin(), C = Theme.c, g = geo();
    // pivot
    c.beginPath(); c.moveTo(g.cx, g.cy + 4); c.lineTo(g.cx - 22, g.cy + 44); c.lineTo(g.cx + 22, g.cy + 44); c.closePath(); c.fillStyle = C.ink2; c.fill();
    c.fillStyle = C.line2; c.fillRect(g.cx - 120, g.cy + 44, 240, 4);
    // beam
    const [ax, ay] = toScr(-BL / 2, g), [bx, by] = toScr(BL / 2, g);
    c.save(); c.lineCap = 'butt'; c.strokeStyle = C.ink; c.lineWidth = 10; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
    c.strokeStyle = C.paper2; c.lineWidth = 1; for (let k = -10; k <= 10; k++) { const [tx, ty] = toScr(k / 10, g); c.beginPath(); c.moveTo(tx, ty - 3); c.lineTo(tx, ty + 3); c.stroke(); } c.restore();
    // centre of gravity of beam
    const [gx, gy] = toScr(0, g);
    if (Math.abs(pivotOff) > 0.01 && beamM > 0) { arrow(c, gx, gy + 6, gx, gy + 6 + beamM * 9 + 16, { color: C.violet, width: 2 }); rich(c, `beam weight ${fix(beamM * G, 1)} N`, gx, gy + beamM * 9 + 34, { align: 'center', size: 11.5, color: C.violet }); }
    dot(c, gx, gy, 3, C.violet);
    let cw = 0, acw = 0;
    for (let i = 0; i < M.length; i++) {
      const o = M[i]; if (!o.m) continue; const r = o.x - pivotOff; const mo = o.m * G * Math.abs(r);
      if (r > 0) cw += mo; else acw += mo;
      const [x, y] = toScr(o.x, g); const sz = 14 + o.m * 3.5;
      c.save(); c.translate(x, y - 5); c.rotate(th); c.fillStyle = C[o.col]; rrect(c, -sz / 2, -sz * 1.1, sz, sz * 1.1, 3); c.fill(); c.restore();
      rich(c, `${o.m} kg`, x, y - 5 - sz * 1.1 - 10, { align: 'center', size: 12, w: 600, color: C[o.col] });
      arrow(c, x, y + 8, x, y + 8 + 16 + o.m * 8, { color: C[o.col], width: 2 });
      rich(c, `${fix(Math.abs(r), 2)} m`, x, y + 36 + o.m * 8, { align: 'center', size: 11, color: C.muted, mono: true });
      if (drag === i) handle(c, x, y - 22, C[o.col], true);
    }
    if (pivotOff !== 0) { const mo = beamM * G * Math.abs(pivotOff); if (-pivotOff > 0) cw += mo; else acw += mo; }
    const bal = Math.abs(cw - acw) < 0.05;
    rich(c, bal ? 'BALANCED: Σ clockwise = Σ anticlockwise' : cw > acw ? 'net clockwise moment → tips right' : 'net anticlockwise moment → tips left', g.W / 2, 26, { align: 'center', size: 13.5, w: 700, color: bal ? C.green : C.red });
    // moment arcs
    rich(c, '↻ clockwise', g.cx + 30, g.cy - 40, { size: 11, color: C.red }); rich(c, 'anticlockwise ↺', g.cx - 30, g.cy - 40, { size: 11, color: C.blue, align: 'right' });
    ro.set('cw', `${fix(cw, 2)} N m`); ro.set('acw', `${fix(acw, 2)} N m`); ro.set('net', `${fix(cw - acw, 2)} N m`); ro.set('st', bal ? 'equilibrium' : 'unbalanced');
  }, [S]);
  const g1 = Group(P.side, 'Masses');
  M.forEach((o, i) => Slider(g1, { id: 'mo-m' + i, label: `Mass ${i + 1} <span style="color:var(--${o.col})">■</span>`, min: 0, max: 5, step: 0.5, value: o.m, unit: 'kg', fmt: v => fix(v, 1), oninput: v => o.m = v }));
  const g2 = Group(P.side, 'Beam');
  Slider(g2, { id: 'mo-bm', label: 'Beam mass', min: 0, max: 4, step: 0.5, value: beamM, unit: 'kg', fmt: v => fix(v, 1), oninput: v => beamM = v });
  Slider(g2, { id: 'mo-pv', label: 'Pivot offset from centre', min: -0.5, max: 0.5, step: 0.05, value: 0, unit: 'm', fmt: v => fix(v, 2), oninput: v => pivotOff = v });
  const ro = Readout(Group(P.side, 'Moments about the pivot'), [['cw', 'Σ clockwise'], ['acw', 'Σ anticlockwise'], ['net', 'Net', 'hl'], ['st', 'State']]);
  Note(P.side, 'Drag the masses along the beam. Move the pivot off-centre and the beam’s <b style="color:var(--ps-violet)">own weight</b> starts to produce a moment — it acts at the centre of gravity.');
  EqCard(P.below, 'Moments (1.3.1, 1.3.3)', [['\\text{moment} = F d', 'd = perpendicular distance from the line of action to the pivot'], ['\\Sigma \\text{clockwise} = \\Sigma \\text{anticlockwise}', 'principle of moments, in equilibrium']]);
  Card(P.below, 'In exam words', `<p>The <b>moment of a force</b> about a point is the product of the force and the <b>perpendicular distance</b> from the point to the line of action of the force. Unit: N m.</p><p><b>Principle of moments:</b> for a body in equilibrium, the sum of the clockwise moments about any point equals the sum of the anticlockwise moments about the same point.</p><p>The <b>centre of gravity</b> is the point through which the whole weight of a body may be considered to act.</p>`);
  Drill(P.below, { title: 'Moments drill', gens: [
    () => { const m1 = randi(2, 9) * 10, d1 = +rand(0.5, 2).toFixed(1), d2 = +rand(0.6, 2.5).toFixed(1); const F = m1 * d1 / d2; return { q: `A <b>${m1} N</b> weight sits <b>${d1} m</b> left of a pivot. What downward force <b>${d2} m</b> right of the pivot balances it?`, a: F, unit: 'N', steps: ['Principle of moments about the pivot: Σ clockwise = Σ anticlockwise', `F × ${d2} = ${m1} × ${d1}`, `F = ${fix(F, 2)} N`] }; },
    () => { const F = randi(20, 200), d = +rand(0.1, 0.9).toFixed(2), ang = pick([30, 40, 50, 60]); const M2 = F * d * Math.sin(ang * DEG); return { q: `A spanner of length <b>${d} m</b> has a <b>${F} N</b> force applied at its end at <b>${ang}°</b> to the spanner. Find the moment about the nut.`, a: M2, unit: 'N m', steps: ['Perpendicular distance = d sin θ', `moment = ${F} × ${d} × sin ${ang}° = ${fix(M2, 2)} N m`] }; },
    () => { const W = randi(4, 12) * 10, Lb = +rand(2, 6).toFixed(1), x = +rand(0.3, Lb / 2 - 0.2).toFixed(1); const Fw = W * (Lb / 2 - x) / x; return { q: `A uniform plank of weight <b>${W} N</b> and length <b>${Lb} m</b> is pivoted <b>${x} m</b> from one end. What downward force at that end keeps it horizontal?`, a: Fw, unit: 'N', steps: [`The weight acts at the centre, ${fix(Lb / 2 - x, 2)} m from the pivot`, `F × ${x} = ${W} × ${fix(Lb / 2 - x, 2)}`, `F = ${fix(Fw, 2)} N`] }; },
  ] });
}

/* ---------- Lab B: beam on two supports ---------- */
function mountSupports(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.3, minH: 280, maxH: 420, mobileAspect: 1.2 });
  let Lb = 10, Wb = 2000, load = 5000, xl = 3, xa = 0, xb = 10, t = 0;
  Pointer(S, { hit: (px, py) => { const g = geo(); return Math.abs(px - (g.x0 + xl * g.sc)) < 40 && py < g.y + 20 ? 'L' : null; }, move: (_, px) => { const g = geo(); xl = clamp(Math.round((px - g.x0) / g.sc * 10) / 10, 0, Lb); } });
  const geo = () => { const W = S.w, H = S.h, pad = 50, sc = (W - 2 * pad) / Lb; return { W, H, sc, x0: pad, y: H * 0.55 }; };
  L.loop(dt => {
    t += dt;
    // moments about A: RB (xb - xa) = Wb (Lb/2 - xa) + load (xl - xa)
    const RB = (Wb * (Lb / 2 - xa) + load * (xl - xa)) / (xb - xa), RA = Wb + load - RB;
    const c = S.begin(), C = Theme.c, g = geo();
    c.fillStyle = C.ink; c.fillRect(g.x0, g.y - 6, Lb * g.sc, 12);
    for (const [xs, R, lab] of [[xa, RA, 'A'], [xb, RB, 'B']]) {
      const X = g.x0 + xs * g.sc;
      c.beginPath(); c.moveTo(X, g.y + 6); c.lineTo(X - 14, g.y + 34); c.lineTo(X + 14, g.y + 34); c.closePath(); c.fillStyle = C.ink2; c.fill();
      const len = clamp(R / 120, -80, 110);
      if (R > 0) arrow(c, X, g.y + 6 + 60, X, g.y + 6 + 60 - len - 10, { color: C.green, width: 3 });
      rich(c, `*R*_${lab} = ${num(R / 1000, 3)} kN`, X, g.y + 84, { align: 'center', size: 12.5, w: 600, color: R < 0 ? C.red : C.green });
    }
    const Xc = g.x0 + (Lb / 2) * g.sc; arrow(c, Xc, g.y, Xc, g.y + 20 + Wb / 150, { color: C.violet, width: 2.4 }); rich(c, `${num(Wb / 1000, 3)} kN`, Xc + 6, g.y + 30, { size: 11.5, color: C.violet });
    const Xl = g.x0 + xl * g.sc;
    c.fillStyle = C.orange; rrect(c, Xl - 26, g.y - 50, 52, 42, 5); c.fill();
    dot(c, Xl - 14, g.y - 8, 6, C.ink2); dot(c, Xl + 14, g.y - 8, 6, C.ink2);
    arrow(c, Xl, g.y - 70 - load / 200, Xl, g.y - 54, { color: C.red, width: 3 });
    rich(c, `load ${num(load / 1000, 3)} kN at ${fix(xl, 1)} m`, Xl, g.y - 84 - load / 200, { align: 'center', size: 12, w: 600, color: C.red });
    rich(c, 'drag the lorry', g.W - 12, 18, { align: 'right', size: 11, color: C.muted });
    if (RA < 0 || RB < 0) rich(c, 'a reaction would be negative: the beam would tip about a support', g.W / 2, g.H - 14, { align: 'center', size: 12.5, w: 600, color: C.red });
    ro.set('ra', `${num(RA, 4)} N`); ro.set('rb', `${num(RB, 4)} N`); ro.set('sum', `${num(RA + RB, 4)} N = ${num(Wb + load, 4)} N`);
  }, [S]);
  const g1 = Group(P.side, 'Bridge');
  Slider(g1, { id: 'sp-L', label: 'Span', min: 4, max: 20, step: 1, value: Lb, unit: 'm', fmt: v => fix(v, 0), oninput: v => { Lb = v; xb = Math.min(xb, v); xl = Math.min(xl, v); sB.set(xb); } });
  Slider(g1, { id: 'sp-W', label: 'Beam weight', min: 0, max: 8000, step: 250, value: Wb, unit: 'N', fmt: v => fix(v, 0), oninput: v => Wb = v });
  Slider(g1, { id: 'sp-ld', label: 'Load weight', min: 0, max: 15000, step: 500, value: load, unit: 'N', fmt: v => fix(v, 0), oninput: v => load = v });
  Slider(g1, { id: 'sp-a', label: 'Support A position', min: 0, max: 4, step: 0.5, value: xa, unit: 'm', fmt: v => fix(v, 1), oninput: v => xa = v });
  const sB = Slider(g1, { id: 'sp-b', label: 'Support B position', min: 5, max: 20, step: 0.5, value: xb, unit: 'm', fmt: v => fix(v, 1), oninput: v => xb = Math.min(v, Lb) });
  const ro = Readout(Group(P.side, 'Reactions'), [['ra', '<i>R</i><sub>A</sub>', 'hl'], ['rb', '<i>R</i><sub>B</sub>', 'hl'], ['sum', 'Up = down']]);
  Note(P.side, 'Method: take moments about <b>one support</b> so its unknown reaction has zero moment. Then use <b>total up = total down</b> for the other.');
  Card(P.below, 'Centre of gravity (1.3.2)', list(['A <b>uniform</b> beam’s weight acts at its midpoint — always draw it there.', 'To find the centre of gravity of an irregular lamina: hang it from a point, mark the vertical with a plumb line, repeat from a second point. The CG is where the lines cross.', 'An object topples when the vertical line through its centre of gravity falls outside its base.', 'A lower centre of gravity and a wider base make an object more stable.']));
  Card(P.below, 'Equilibrium conditions', `<p>For a rigid body to be in equilibrium: <b>(1)</b> the resultant force is zero (up = down, left = right) and <b>(2)</b> the resultant moment about any point is zero.</p><p>A <b>couple</b> is a pair of equal, opposite, parallel forces whose lines of action do not coincide; its moment (torque) = one force × perpendicular distance between them.</p>`);
  Drill(P.below, { title: 'Supports drill', gens: [
    () => { const Lx = randi(4, 12), W = randi(2, 9) * 100, F = randi(2, 12) * 100, x = randi(1, Lx - 1); const RB = (W * Lx / 2 + F * x) / Lx, RA = W + F - RB; return { q: `A uniform beam, length <b>${Lx} m</b>, weight <b>${W} N</b>, rests on supports at each end. A <b>${F} N</b> load sits <b>${x} m</b> from end A. Find the reaction at A.`, a: RA, unit: 'N', steps: ['Moments about B (removes R_B):', `R_A × ${Lx} = ${W} × ${Lx / 2} + ${F} × ${Lx - x}`, `R_A = ${fix(RA, 1)} N`] }; },
    () => { const F = randi(5, 40), d = +rand(0.1, 0.5).toFixed(2); return { q: `Two forces of <b>${F} N</b> form a couple with their lines of action <b>${d} m</b> apart. Find the torque of the couple.`, a: F * d, unit: 'N m', steps: ['torque = one force × perpendicular separation', `= ${F} × ${d} = ${fix(F * d, 2)} N m`] }; },
    () => ({ q: 'Why is a crane fitted with a heavy counterweight?', options: ['Its anticlockwise moment balances the clockwise moment of the load about the tower', 'To increase the load’s moment', 'To raise the centre of gravity', 'To reduce the weight on the ground'], correct: 0, why: 'The counterweight provides an opposing moment so the resultant moment about the tower is near zero.' }),
  ] });
}

topic({
  id: 'moments', code: '1.3', unit: 'AS 1', title: 'Principle of Moments', short: 'Moments',
  blurb: 'Turning effects: force × perpendicular distance, centre of gravity, and balancing a see-saw or a loaded bridge.',
  outcomes: [
    ['1.3.1', 'define the moment of a force about a point', 'seesaw'],
    ['1.3.2', 'use the concept of centre of gravity', 'supports'],
    ['1.3.3', 'recall and use the principle of moments', 'seesaw'],
  ],
  labs: [
    { id: 'seesaw', title: 'See-saw balance', hint: 'Σ clockwise = Σ anticlockwise', spec: ['1.3.1', '1.3.3'], mount: mountSeesaw },
    { id: 'supports', title: 'Bridge on two supports', hint: 'reactions & centre of gravity', spec: ['1.3.2', '1.3.3'], mount: mountSupports },
  ],
  equations: [['M = Fd', 'd ⊥ to line of action'], ['\\Sigma M_{cw} = \\Sigma M_{acw}', 'equilibrium'], ['\\text{torque of couple} = Fd', '']],
  traps: ['Use the <b>perpendicular</b> distance to the line of action, not the distance along the beam when the force is at an angle.', 'A uniform beam’s weight acts at its <b>centre</b> — students forget to include it.', 'Take moments about the point with an unknown force you don’t need: it vanishes.', 'Moments must be about the <b>same</b> point on both sides.', 'Equilibrium needs <b>both</b> zero resultant force and zero resultant moment.'],
  notes: [
    ['Moment of a force', 'Moment = force × perpendicular distance from the pivot to the line of action. Unit N m. It is a measure of the turning effect of the force.'],
    ['Principle of moments', 'For a body in equilibrium the sum of clockwise moments about any point equals the sum of anticlockwise moments about that point.'],
    ['Centre of gravity', 'The single point through which the entire weight of an object can be taken to act. For a uniform object it is the geometric centre. Find it for a lamina with a plumb line hung from two points.'],
    ['Couples', 'Two equal and opposite parallel forces not in line. They cause rotation but no translation. Torque = F × perpendicular separation.'],
    ['Solving problems', '1) Draw every force, including the weight at the CG. 2) Pick a pivot that eliminates an unknown. 3) Σcw = Σacw. 4) Use up = down for the remaining reaction.'],
  ],
  mini(c, w, h, t, C) {
    const cx = w / 2, cy = h * 0.6, th = 0.12 * Math.sin(t * 1.2), L = w * 0.38;
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx - 12, cy + 24); c.lineTo(cx + 12, cy + 24); c.closePath(); c.fillStyle = C.ink2; c.fill();
    const ax = cx - L * Math.cos(th), ay = cy - L * Math.sin(th), bx = cx + L * Math.cos(th), by = cy + L * Math.sin(th);
    line(c, [[ax, ay], [bx, by]], { color: C.ink, width: 5 });
    c.fillStyle = C.blue; c.fillRect(ax + 6, ay - 22, 20, 18); c.fillStyle = C.red; c.fillRect(bx - 40, by - 16 - 10, 14, 14);
  },
});
})();

/* ================= 1.4 Linear motion ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: motion graphs from a live car ---------- */
function mountGraphs(P, L) {
  const S0 = L.stage(P.stageBox, { aspect: 5, minH: 110, maxH: 140, plain: true });
  const S = L.stage(P.stageBox, { aspect: 1.5, minH: 420, maxH: 640, mobileAspect: 0.8 });
  const TMAX = 12;
  let prof = 'accel', u = 2, acc = 1.2, t = 0, run = true, rec = [], cursor = null;
  const accAt = tt => prof === 'const' ? 0 : prof === 'accel' ? acc : prof === 'decel' ? (tt < u / Math.max(acc, 1e-6) ? -acc : 0) : prof === 'trip' ? (tt < 3 ? 2 : tt < 7 ? 0 : tt < 10 ? -2 : 0) : 0;
  function simulate() { rec = []; let s = 0, v = prof === 'trip' ? 0 : u; const dt = 0.01; for (let tt = 0; tt <= TMAX + 1e-9; tt += dt) { const a = accAt(tt); rec.push([tt, s, v, a]); v += a * dt; if (prof === 'decel' && v < 0) v = 0; s += v * dt; } }
  simulate();
  const at = tt => rec[clamp(Math.round(tt / 0.01), 0, rec.length - 1)];
  const P1 = new Plot(S, { ylabel: '*s* / m' }), P2 = new Plot(S, { ylabel: '*v* / m s⁻¹' }), P3 = new Plot(S, { ylabel: '*a* / m s⁻²', xlabel: 'time *t* / s' });
  Pointer(S, { scroll: true, hit: () => 'c', down: () => { run = false; pb.textContent = '▶ Play'; }, move: (_, x) => { P1.layout(); cursor = clamp(P1.ix(x), 0, TMAX); t = cursor; } });
  L.loop(dt => {
    if (run) { t += dt; if (t > TMAX) t = 0; }
    const [tt, s, v, a] = at(t), C = Theme.c;
    // track
    const c0 = S0.begin(), W0 = S0.w, H0 = S0.h, smax = Math.max(10, rec[rec.length - 1][1]) * 1.05, X = x => 30 + x / smax * (W0 - 60);
    line(c0, [[20, H0 * 0.7], [W0 - 20, H0 * 0.7]], { color: C.ink2, width: 2 });
    for (let k = 0; k <= 10; k++) { const x = X(smax * k / 10); line(c0, [[x, H0 * 0.7], [x, H0 * 0.7 + 6]], { color: C.muted, width: 1 }); }
    for (let k = 0; k < rec.length; k += 100) dot(c0, X(rec[k][1]), H0 * 0.7 + 14, 2.5, alpha(C.violet, .7));
    rich(c0, 'dots: position every 1 s (ticker tape)', W0 - 24, 14, { align: 'right', size: 11, color: C.violet });
    c0.fillStyle = C.blue; rrect(c0, X(s) - 22, H0 * 0.7 - 26, 44, 20, 5); c0.fill(); dot(c0, X(s) - 12, H0 * 0.7 - 5, 5, C.ink); dot(c0, X(s) + 12, H0 * 0.7 - 5, 5, C.ink);
    if (Math.abs(v) > 0.05) arrow(c0, X(s), H0 * 0.7 - 36, X(s) + v * 8, H0 * 0.7 - 36, { color: C.green, width: 2.2 });
    // graphs
    S.begin(); const h3 = S.h / 3, cfg = { xmin: 0, xmax: TMAX, pad: { l: 58, r: 14, t: 16, b: 30 } };
    const vmax = Math.max(...rec.map(r => r[2]), 1) * 1.2, amax = Math.max(2.5, ...rec.map(r => Math.abs(r[3]))) * 1.2;
    Object.assign(P1, cfg, { ymin: 0, ymax: smax, rect: { x: 0, y: 0, w: S.w, h: h3 }, title: 'displacement–time: gradient = velocity' });
    Object.assign(P2, cfg, { ymin: 0, ymax: vmax, rect: { x: 0, y: h3, w: S.w, h: h3 }, title: 'velocity–time: gradient = acceleration, area = displacement' });
    Object.assign(P3, cfg, { ymin: -amax, ymax: amax, rect: { x: 0, y: 2 * h3, w: S.w, h: h3 }, title: 'acceleration–time: area = change in velocity', pad: { l: 58, r: 14, t: 16, b: 40 } });
    const upto = rec.filter(r => r[0] <= tt);
    P1.axes(); P1.curve(rec.map(r => [r[0], r[1]]), { color: alpha(C.blue, .25), width: 2 }); P1.curve(upto.map(r => [r[0], r[1]]), { color: C.blue, width: 2.4 });
    const tl = 1.5; P1.clip(cc => line(cc, [[P1.X(tt - tl), P1.Y(s - v * tl)], [P1.X(tt + tl), P1.Y(s + v * tl)]], { color: C.orange, width: 2, dash: [5, 4] }));
    P1.dots([[tt, s]], { color: C.blue, r: 5, stroke: C.paper2 });
    P2.axes(); P2.area(upto.map(r => [r[0], r[2]]), alpha(C.green, .18)); P2.curve(rec.map(r => [r[0], r[2]]), { color: alpha(C.green, .3), width: 2 }); P2.curve(upto.map(r => [r[0], r[2]]), { color: C.green, width: 2.4 });
    P2.dots([[tt, v]], { color: C.green, r: 5, stroke: C.paper2 });
    P2.label(tt, v, `shaded area = ${fix(s, 1)} m`, { dx: 8, dy: -14, size: 12, color: C.green, w: 600, bg: alpha(C.paper2, .85) });
    P3.axes(); P3.area(upto.map(r => [r[0], r[3]]), alpha(C.red, .15)); P3.curve(rec.map(r => [r[0], r[3]]), { color: C.red, width: 2.4 }); P3.dots([[tt, a]], { color: C.red, r: 5, stroke: C.paper2 });
    for (const p of [P1, P2, P3]) p.vline(tt, { color: alpha(C.ink2, .5) });
    ro.set('t', `${fix(tt, 2)} s`); ro.set('s', `${fix(s, 2)} m`); ro.set('v', `${fix(v, 2)} m s⁻¹`); ro.set('a', `${fix(a, 2)} m s⁻²`); ro.set('av', `${fix(tt > 0.05 ? s / tt : v, 2)} m s⁻¹`);
  }, [S0, S]);
  const g = Group(P.side, 'Motion');
  Seg(g, { options: [['const', 'Constant *v*'.replace(/\*/g, '')], ['accel', 'Speeding up'], ['decel', 'Braking'], ['trip', 'Full journey']], value: prof, wrap: true, onchange: v => { prof = v; simulate(); t = 0; sU.el.hidden = v === 'trip'; sA.el.hidden = v === 'const' || v === 'trip'; } });
  const sU = Slider(g, { id: 'lm-u', label: 'Initial velocity <i>u</i>', min: 0, max: 8, step: 0.5, value: u, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u = v; simulate(); } });
  const sA = Slider(g, { id: 'lm-a', label: 'Acceleration magnitude <i>a</i>', min: 0.2, max: 3, step: 0.1, value: acc, unit: 'm s⁻²', fmt: v => fix(v, 1), oninput: v => { acc = v; simulate(); } });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'Restart', () => { t = 0; run = true; pb.textContent = '❚❚ Pause'; });
  const ro = Readout(Group(P.side, 'Now'), [['t', 'Time'], ['s', 'Displacement <i>s</i>'], ['v', 'Velocity <i>v</i>', 'hl'], ['a', 'Acceleration <i>a</i>'], ['av', 'Average velocity <i>s</i>/<i>t</i>']]);
  Note(P.side, 'Drag across the graphs to scrub time. The orange tangent’s gradient is the velocity; the green shaded area under the <i>v</i>–<i>t</i> graph is the displacement so far.');
  Card(P.below, 'Definitions (1.4.1)', list(['<b>Displacement</b> is the distance moved in a stated direction (a vector, unit m).', '<b>Velocity</b> is the rate of change of displacement (a vector, m s⁻¹).', '<b>Acceleration</b> is the rate of change of velocity (a vector, m s⁻²).', 'Speed and distance are the scalar versions: no direction.']));
  Card(P.below, 'Reading motion graphs (1.4.2–1.4.4)', list(['Gradient of <i>s</i>–<i>t</i> = velocity. A curve means the velocity is changing — draw a tangent.', 'Gradient of <i>v</i>–<i>t</i> = acceleration. A horizontal line = constant velocity.', 'Area under <i>v</i>–<i>t</i> = displacement. Count squares or split into triangles and rectangles.', 'Area under <i>a</i>–<i>t</i> = change in velocity.']));
  Drill(P.below, { title: 'Graph drill', gens: [
    () => { const u2 = randi(0, 10), v2 = randi(12, 30), T = randi(4, 15); return { q: `A car accelerates uniformly from <b>${u2} m s⁻¹</b> to <b>${v2} m s⁻¹</b> in <b>${T} s</b>. Using the area under its velocity–time graph, find the distance travelled.`, a: (u2 + v2) / 2 * T, unit: 'm', steps: ['Area of a trapezium = ½(u + v) t', `= ½(${u2} + ${v2}) × ${T} = ${fix((u2 + v2) / 2 * T, 1)} m`] }; },
    () => { const ds = randi(20, 400), dt = randi(4, 40); return { q: `On a displacement–time graph the tangent at a point rises <b>${ds} m</b> over <b>${dt} s</b>. What is the velocity at that point?`, a: ds / dt, unit: 'm s⁻¹', steps: ['velocity = gradient = Δs/Δt', `= ${ds}/${dt} = ${fix(ds / dt, 2)} m s⁻¹`] }; },
    () => ({ q: 'A velocity–time graph is a horizontal line above the time axis. The object has…', options: ['constant non-zero velocity and zero acceleration', 'constant acceleration', 'zero velocity', 'increasing displacement at an increasing rate'], correct: 0, why: 'Zero gradient ⇒ zero acceleration; the line is above zero ⇒ moving at constant velocity.' }),
  ] });
}

/* ---------- Lab B: SUVAT solver with a ball thrown upwards ---------- */
function mountSuvat(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 480, mobileAspect: 1 });
  let u = 12, g = G, t = 0, run = true, trail = [];
  const P1 = new Plot(S, { xlabel: 'time *t* / s', ylabel: 'velocity *v* / m s⁻¹' });
  L.loop(dt => {
    const T = 2 * u / g;
    if (run) { t += dt; if (t > T + 0.8) { t = 0; trail = []; } }
    const tt = Math.min(t, T), s = u * tt - 0.5 * g * tt * tt, v = u - g * tt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, wide = W > 620;
    const hmax = u * u / (2 * g), gx = wide ? W * 0.18 : W * 0.2, gy = H - 30, sc = (H - 70) / Math.max(hmax, 1);
    line(c, [[gx - 50, gy], [gx + 50, gy]], { color: C.ink2, width: 2 });
    line(c, [[gx, gy - hmax * sc], [gx + 44, gy - hmax * sc]], { color: C.muted, width: 1, dash: [4, 4] });
    rich(c, `max height ${fix(hmax, 2)} m`, gx + 48, gy - hmax * sc, { size: 11, color: C.muted });
    if (run && t < T) trail.push(s); for (let k = 0; k < trail.length; k += 6) dot(c, gx - 20, gy - trail[k] * sc, 2, alpha(C.violet, .5));
    const by = gy - s * sc; dot(c, gx, by, 10, C.red, C.paper2);
    if (Math.abs(v) > 0.2) arrow(c, gx + 16, by, gx + 16, by - v * 4, { color: C.green, width: 2.4 });
    arrow(c, gx - 16, by, gx - 16, by + 26, { color: C.orange, width: 2 }); rich(c, '*g*', gx - 24, by + 20, { align: 'right', size: 13, color: C.orange });
    rich(c, `*s* = ${fix(s, 2)} m`, gx + 30, by - 10, { size: 12.5, w: 600, color: C.ink });
    Object.assign(P1, { rect: wide ? { x: W * 0.36, y: 0, w: W * 0.64, h: H } : { x: W * 0.38, y: 0, w: W * 0.62, h: H }, xmin: 0, xmax: Math.max(T, 0.5) * 1.05, ymin: -u * 1.15, ymax: u * 1.15 });
    P1.axes(); P1.curve(x => u - g * x, { color: C.green, width: 2.4, a: 0, b: T });
    P1.area(Array.from({ length: 60 }, (_, k) => { const x = tt * k / 59; return [x, u - g * x]; }), alpha(C.green, .18));
    P1.dots([[tt, v]], { color: C.green, r: 5, stroke: C.paper2 });
    P1.label(T * 0.55, u * 0.9, `gradient = −*g* = −${fix(g, 2)} m s⁻²`, { size: 12, color: C.orange, w: 600 });
    P1.label(T / 2, 0, 'top: *v* = 0', { dx: 6, dy: -12, size: 11.5, color: C.muted });
    ro.set('t', `${fix(tt, 2)} s`); ro.set('s', `${fix(s, 2)} m`); ro.set('v', `${fix(v, 2)} m s⁻¹`); ro.set('T', `${fix(T, 2)} s`); ro.set('h', `${fix(hmax, 2)} m`);
  }, [S]);
  const gr = Group(P.side, 'Throw');
  Slider(gr, { id: 'sv-u', label: 'Launch speed <i>u</i> (up)', min: 2, max: 25, step: 0.5, value: u, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u = v; t = 0; trail = []; } });
  Seg(gr, { label: 'Planet', options: [['9.81', 'Earth'], ['1.62', 'Moon'], ['3.71', 'Mars'], ['24.8', 'Jupiter']], value: '9.81', onchange: v => { g = +v; t = 0; trail = []; } });
  const b = Btns(gr); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'Throw again', () => { t = 0; trail = []; });
  const ro = Readout(Group(P.side, 'SUVAT live'), [['t', '<i>t</i>'], ['s', '<i>s</i> (up +)'], ['v', '<i>v</i>', 'hl'], ['T', 'Time to land 2<i>u</i>/<i>g</i>'], ['h', 'Max height <i>u</i>²/2<i>g</i>']]);
  Note(P.side, 'Take <b>up as positive</b>, so <i>a</i> = −<i>g</i> the whole way — at the top too. At the top <i>v</i> = 0 but the acceleration is still 9.81 m s⁻² downwards.');
  EqCard(P.below, 'Equations of motion (1.4.5) — uniform acceleration only', [['v = u + at', 'no s'], ['s = ut + \\frac{1}{2}at^2', 'no v'], ['v^2 = u^2 + 2as', 'no t'], ['s = \\frac{1}{2}(u + v)t', 'no a']]);
  Card(P.below, 'Deriving them', `<p>From the definition of acceleration, <i>a</i> = (<i>v</i> − <i>u</i>)/<i>t</i> ⇒ ${tex('v = u + at')}. The area under a straight-line <i>v</i>–<i>t</i> graph is a trapezium: ${tex('s = \\frac{1}{2}(u+v)t')}. Substitute for <i>v</i> to get ${tex('s = ut + \\frac{1}{2}at^2')}; eliminate <i>t</i> to get ${tex('v^2 = u^2 + 2as')}.</p><p><b>Method:</b> list s, u, v, a, t; tick the three you know; choose the equation without the one you don’t need.</p>`);
  Drill(P.below, { title: 'SUVAT drill', gens: [
    () => { const u2 = randi(0, 15), a = +rand(0.5, 4).toFixed(1), tt = randi(2, 12); return { q: `A cyclist starts at <b>${u2} m s⁻¹</b> and accelerates at <b>${a} m s⁻²</b> for <b>${tt} s</b>. How far does she travel?`, a: u2 * tt + 0.5 * a * tt * tt, unit: 'm', steps: ['s = ut + ½at²', `= ${u2}×${tt} + ½×${a}×${tt}² = ${fix(u2 * tt + 0.5 * a * tt * tt, 1)} m`] }; },
    () => { const u2 = randi(15, 35), s = randi(20, 90); const a = -u2 * u2 / (2 * s); return { q: `A car travelling at <b>${u2} m s⁻¹</b> brakes uniformly to rest in <b>${s} m</b>. Find the deceleration (give a positive number).`, a: -a, unit: 'm s⁻²', steps: ['v² = u² + 2as with v = 0', `a = −u²/2s = −${u2}²/(2×${s}) = ${fix(a, 2)} m s⁻²`, `deceleration = ${fix(-a, 2)} m s⁻²`] }; },
    () => { const h = randi(5, 80); const tt = Math.sqrt(2 * h / G); return { q: `A stone is dropped from rest from a <b>${h} m</b> cliff. How long does it take to fall? (g = 9.81 m s⁻²)`, a: tt, unit: 's', steps: ['s = ut + ½gt² with u = 0', `t = √(2s/g) = √(2×${h}/9.81) = ${fix(tt, 2)} s`] }; },
    () => { const u2 = randi(5, 25); const H2 = u2 * u2 / (2 * G); return { q: `A ball is thrown vertically upwards at <b>${u2} m s⁻¹</b>. Find its maximum height.`, a: H2, unit: 'm', steps: ['At the top v = 0; a = −9.81 m s⁻²', `0 = u² − 2gh ⇒ h = u²/2g = ${u2}²/19.62 = ${fix(H2, 2)} m`] }; },
  ] });
}

/* ---------- Lab C: measuring g ---------- */
function mountFreeFall(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.9, minH: 300, maxH: 420, mobileAspect: 1.1, tag: 'electromagnet + trapdoor' });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, plain: true });
  let h = 0.8, rows = [], drop = null;
  const plot = new Plot(S2, { xlabel: '*t*² / s²', ylabel: '*h* / m', xmin: 0, ymin: 0 });
  L.loop(dt => {
    if (drop) { drop.t += dt * 0.6; drop.s = 0.5 * G * drop.t * drop.t; if (drop.s >= h) { const tm = drop.T + gauss() * 0.004; rows.push({ h, t: tm }); drop = null; render(); } }
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const x = W * 0.3, top = 34, sc = (H - 80) / 1.6, fy = top + h * sc;
    c.fillStyle = C.ink2; c.fillRect(x - 30, top - 26, 60, 16); rich(c, 'electromagnet', x + 38, top - 18, { size: 11, color: C.muted });
    const by = drop ? top + drop.s * sc : top;
    dot(c, x, by, 7, C.ink, C.paper2);
    c.fillStyle = C.ink2; c.fillRect(x - 40, fy + 8, 80, 5); rich(c, 'trapdoor', x + 46, fy + 10, { size: 11, color: C.muted });
    arrow(c, x - 56, top, x - 56, fy + 8, { color: C.green, width: 1.4, both: true, head: 7 }); rich(c, `*h* = ${fix(h, 2)} m`, x - 62, (top + fy) / 2, { align: 'right', size: 12.5, color: C.green, w: 600 });
    // timer
    const tx = W * 0.68, ty = H * 0.45; c.fillStyle = C.paper; c.strokeStyle = C.ink; c.lineWidth = 2; rrect(c, tx - 80, ty - 30, 160, 60, 6); c.fill(); c.stroke();
    rich(c, drop ? fix(drop.t, 3) + ' s' : rows.length ? fix(rows[rows.length - 1].t, 3) + ' s' : '0.000 s', tx, ty, { align: 'center', size: 22, mono: true, w: 600, color: C.red });
    rich(c, 'timer starts when the magnet switches off, stops when the trapdoor opens', tx, ty + 46, { align: 'center', size: 10.5, color: C.muted });
    S2.begin();
    const xs = rows.map(r => r.t * r.t), ys = rows.map(r => r.h);
    plot.xmax = Math.max(0.35, ...xs) * 1.15; plot.ymax = 1.7; plot.axes();
    let grad = NaN;
    if (rows.length >= 2) { let sxy = 0, sxx = 0; xs.forEach((X, i) => { sxy += X * ys[i]; sxx += X * X; }); grad = sxy / sxx; plot.curve(X => grad * X, { color: C.green, width: 1.6 }); }
    plot.cross(xs.map((X, i) => [X, ys[i]]), { color: C.red, s: 5, width: 2 });
    if (!rows.length) rich(S2.ctx, 'Change the height and release the ball to collect readings', plot.x0 + plot.pw / 2, plot.y0 + plot.ph / 2, { align: 'center', size: 13, color: C.muted });
    ro.set('n', String(rows.length)); ro.set('gr', isFinite(grad) ? `${fix(grad, 3)} m s⁻²` : '—'); ro.set('g', isFinite(grad) ? `${fix(2 * grad, 2)} m s⁻²` : '—'); ro.set('e', isFinite(grad) ? `${fix((2 * grad - G) / G * 100, 1)}%` : '—');
  }, [S1, S2]);
  const gr = Group(P.side, 'Experiment');
  Slider(gr, { id: 'ff-h', label: 'Drop height <i>h</i>', min: 0.2, max: 1.6, step: 0.1, value: h, unit: 'm', fmt: v => fix(v, 2), oninput: v => { if (!drop) h = v; } });
  const b = Btns(gr); Btn(b, 'Release ball', () => { if (!drop) drop = { t: 0, s: 0, T: Math.sqrt(2 * h / G) }; }, 'pri'); Btn(b, 'Clear', () => { rows = []; render(); });
  const ro = Readout(Group(P.side, 'Analysis'), [['n', 'Readings'], ['gr', 'Gradient of <i>h</i>–<i>t</i>²'], ['g', '<i>g</i> = 2 × gradient', 'hl'], ['e', 'vs 9.81']]);
  Note(P.side, `${tex('h = \\frac{1}{2}gt^2')} (from rest), so a graph of <i>h</i> against <i>t</i>² is a straight line through the origin with gradient <i>g</i>/2.`);
  const tcard = Card(P.below, 'Results', null); const tbox = el('div', { class: 'tbl-wrap' }); tcard.append(tbox);
  function render() { tbox.innerHTML = `<table class="tbl"><tr><th>h / m</th><th>t / s</th><th>t² / s²</th></tr>${rows.map(r => `<tr><td>${fix(r.h, 2)}</td><td>${fix(r.t, 3)}</td><td>${fix(r.t * r.t, 4)}</td></tr>`).join('') || '<tr><td colspan="3" style="text-align:left;color:var(--ps-muted)">No readings yet.</td></tr>'}</table>`; }
  render();
  Card(P.below, 'Method (1.4.6)', list(['A steel ball is held by an electromagnet above a trapdoor. Switching off the magnet starts an electronic timer; the ball hitting the trapdoor stops it.', 'Measure <i>h</i> from the <b>bottom</b> of the ball to the trapdoor with a metre rule (avoid parallax).', 'Repeat each height three times and average; use at least six heights.', 'Plot <i>h</i> against <i>t</i>²; <b>g = 2 × gradient</b>.', 'Alternatives: light gates and a card, or a ticker timer / video analysis. Residual magnetism delays release — a systematic error that shows up as an intercept.'], true));
}

topic({
  id: 'motion', code: '1.4', unit: 'AS 1', title: 'Linear Motion', short: 'Motion',
  blurb: 'Displacement, velocity and acceleration: motion graphs, the equations of uniform acceleration, and measuring g.',
  outcomes: [
    ['1.4.1', 'define displacement, velocity and acceleration', 'graphs'],
    ['1.4.2', 'use graphical methods to represent displacement, velocity and acceleration', 'graphs'],
    ['1.4.3', 'find displacement from the area under a velocity–time graph', 'graphs'],
    ['1.4.4', 'use the slope of a displacement–time graph to find velocity and the slope of a velocity–time graph to find acceleration', 'graphs'],
    ['1.4.5', 'derive and use the equations of motion for constant acceleration', 'suvat'],
    ['1.4.6', 'describe an experiment to measure the acceleration of free fall, g', 'freefall'],
  ],
  labs: [
    { id: 'graphs', title: 'Motion graphs', hint: 'gradients & areas', spec: ['1.4.1', '1.4.2', '1.4.3', '1.4.4'], mount: mountGraphs },
    { id: 'suvat', title: 'SUVAT: throw it up', hint: 'uniform acceleration', spec: ['1.4.5'], mount: mountSuvat },
    { id: 'freefall', title: 'Measuring g', hint: 'h against t²', spec: ['1.4.6'], mount: mountFreeFall },
  ],
  equations: [['v = u + at', ''], ['s = ut + \\frac{1}{2}at^2', ''], ['v^2 = u^2 + 2as', ''], ['s = \\frac{1}{2}(u+v)t', ''], ['\\bar{v} = \\frac{\\Delta s}{\\Delta t}', ''], ['a = \\frac{\\Delta v}{\\Delta t}', '']],
  traps: ['SUVAT only works for <b>uniform</b> acceleration.', 'Pick a positive direction and stick to it: a ball thrown up has <i>a</i> = −9.81 m s⁻² on the way up, at the top and on the way down.', 'At the top of the flight <i>v</i> = 0 but <i>a</i> ≠ 0.', 'Area under <i>v</i>–<i>t</i> below the axis is negative displacement.', 'Gradient of a curve: draw a tangent and use a large triangle.', 'Convert km h⁻¹ to m s⁻¹ (÷ 3.6).'],
  notes: [
    ['Displacement, velocity, acceleration', '<p><b>Displacement</b>: distance moved in a specified direction (vector, m). <b>Velocity</b>: rate of change of displacement (vector, m s⁻¹). <b>Acceleration</b>: rate of change of velocity (vector, m s⁻²).</p>'],
    ['Graphs', '<ul><li><i>s</i>–<i>t</i>: gradient = velocity.</li><li><i>v</i>–<i>t</i>: gradient = acceleration; area = displacement.</li><li><i>a</i>–<i>t</i>: area = change in velocity.</li></ul>'],
    ['The equations of motion', '<p>For constant acceleration: v = u + at; s = ut + ½at²; v² = u² + 2as; s = ½(u + v)t. Derive the first from the definition of acceleration and the last from the area under the v–t graph.</p>'],
    ['Free fall', '<p>Near Earth’s surface, in the absence of air resistance, all objects accelerate at g = 9.81 m s⁻² downwards, regardless of mass.</p>'],
    ['Measuring g', '<p>Electromagnet and trapdoor with an electronic timer: vary h, record t (repeat and average), plot h against t², g = 2 × gradient. Sources of error: residual magnetism (delay), measuring h to the bottom of the ball, air resistance for large h.</p>'],
  ],
  mini(c, w, h, t, C) {
    const tt = (t % 4) / 4, x0 = 16, x1 = w - 16, X = x0 + (x1 - x0) * tt * tt;
    line(c, [[x0, h * 0.7], [x1, h * 0.7]], { color: C.ink2, width: 2 });
    for (let k = 0; k <= 8; k++) { const q = k / 8; if (q <= tt) dot(c, x0 + (x1 - x0) * q * q, h * 0.7 + 10, 2.5, C.violet); }
    c.fillStyle = C.blue; rrect(c, X - 16, h * 0.7 - 20, 32, 16, 4); c.fill();
    const pts = []; for (let k = 0; k <= 30; k++) { const q = k / 30; pts.push([w * 0.08 + q * w * 0.4, h * 0.45 - q * q * h * 0.35]); } line(c, pts, { color: C.green, width: 2 });
  },
});
})();

/* ================= 1.5 Dynamics: projectile motion ================= */
(() => {
const G = 9.81;

function mountProjectile(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 340, maxH: 540, mobileAspect: 1.05 });
  let u = 18, ang = 40, h0 = 0, drag = false, mode = 'angle', t = 0, run = true, shots = [], targetX = 30, hits = 0, flash = 0;
  function fly() {
    // integrate (RK-ish small steps); drag ∝ v² with k/m chosen for a tennis-ball feel
    const k = drag ? 0.012 : 0, th = (mode === 'horizontal' ? 0 : ang) * DEG;
    let x = 0, y = h0, vx = u * Math.cos(th), vy = u * Math.sin(th); const pts = [[0, x, y, vx, vy]]; const dt = 0.004;
    for (let tt = dt; tt < 30; tt += dt) { const v = hyp(vx, vy); vx += -k * v * vx * dt; vy += (-G - k * v * vy) * dt; x += vx * dt; y += vy * dt; if (y < 0) { const f = pts[pts.length - 1]; const r = f[2] / (f[2] - y); pts.push([tt - dt + r * dt, f[1] + (x - f[1]) * r, 0, vx, vy]); break; } pts.push([tt, x, y, vx, vy]); }
    return pts;
  }
  let cur = fly();
  const reset = () => { cur = fly(); t = 0; };
  L.loop(dt => {
    const T = cur[cur.length - 1][0];
    if (run) { t += dt; if (t > T + 1.2) { t = 0; } }
    const idx = Math.min(cur.length - 1, Math.floor(t / 0.004)), p = cur[idx];
    if (idx === cur.length - 1 && !cur.logged) { cur.logged = true; shots.push(cur); if (shots.length > 4) shots.shift(); if (Math.abs(p[1] - targetX) < 1.2) { hits++; flash = 1.2; } }
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const all = shots.concat([cur]); const Xm = Math.max(40, targetX + 5, ...all.map(s => s[s.length - 1][1])) * 1.08, Ym = Math.max(10, h0 + 2, ...all.map(s => Math.max(...s.map(q => q[2])))) * 1.15;
    const pad = 46, sc = (W - pad - 20) / Xm, sy = (H - 60) / Ym, X = x => pad + x * sc, Y = y => H - 34 - y * sy;
    // ground & grid
    c.strokeStyle = C.grid2; c.lineWidth = 1; c.beginPath(); const step = Xm > 120 ? 20 : Xm > 60 ? 10 : 5, ystep = Ym > 60 ? 20 : Ym > 25 ? 10 : Ym > 12 ? 5 : 2; for (let gx = 0; gx <= Xm; gx += step) { c.moveTo(X(gx) + .5, Y(0)); c.lineTo(X(gx) + .5, Y(Ym)); } for (let gy = 0; gy <= Ym; gy += ystep) { c.moveTo(X(0), Y(gy) + .5); c.lineTo(X(Xm), Y(gy) + .5); } c.stroke();
    c.fillStyle = C.muted; c.font = FONT.mono(10); c.textAlign = 'center'; c.textBaseline = 'top'; for (let gx = 0; gx <= Xm; gx += step) c.fillText(gx + '', X(gx), Y(0) + 6);
    c.textAlign = 'right'; c.textBaseline = 'middle'; for (let gy = ystep; gy <= Ym; gy += ystep) c.fillText(gy + '', X(0) - 6, Y(gy));
    line(c, [[X(0), Y(0)], [X(Xm), Y(0)]], { color: C.ink2, width: 2 });
    rich(c, 'horizontal distance / m', X(Xm), Y(0) + 22, { align: 'right', size: 11, color: C.muted }); rich(c, 'height / m', X(0) + 6, Y(Ym) + 10, { size: 11, color: C.muted });
    if (h0 > 0) { c.fillStyle = alpha(C.ink2, .25); c.fillRect(X(0) - 30, Y(h0), 30, h0 * sy); }
    // target
    c.fillStyle = flash > 0 ? C.green : C.red; c.fillRect(X(targetX) - 1.2 * sc, Y(0) - 3, 2.4 * sc, 6); flash = Math.max(0, flash - dt);
    rich(c, 'target', X(targetX), Y(0) - 12, { align: 'center', size: 11, color: C.red });
    // old shots
    for (const s of shots) line(c, s.map(q => [X(q[1]), Y(q[2])]), { color: alpha(C.muted, .45), width: 1.4, dash: [3, 4] });
    // current path + strobe
    line(c, cur.slice(0, idx + 1).map(q => [X(q[1]), Y(q[2])]), { color: C.blue, width: 2.2 });
    for (let k = 0; k <= idx; k += 50) { const q = cur[k]; dot(c, X(q[1]), Y(q[2]), 3, alpha(C.blue, .6)); dot(c, X(q[1]), Y(0) + 0, 2, alpha(C.violet, .8)); dot(c, X(0) - 10, Y(q[2]), 2, alpha(C.orange, .8)); }
    // components
    const bx = X(p[1]), by = Y(p[2]), ak = 4; dot(c, bx, by, 7, C.red, C.paper2);
    arrow(c, bx, by, bx + p[3] * ak, by, { color: C.violet, width: 2.2 }); arrow(c, bx, by, bx, by - p[4] * ak, { color: C.orange, width: 2.2 });
    rich(c, `*v*ₓ = ${fix(p[3], 1)}`, bx + p[3] * ak + 6, by, { size: 12, color: C.violet, w: 600 });
    rich(c, `*v*ᵧ = ${fix(p[4], 1)}`, bx - 10, by - p[4] * ak - (p[4] >= 0 ? 10 : -12), { align: 'right', size: 12, color: C.orange, w: 600 });
    rich(c, 'violet dots: horizontal shadow (equal spacing → constant vₓ) · orange dots: vertical shadow (spacing changes → accelerating)', 12, 16, { size: 11, color: C.muted });
    const peak = cur.reduce((m, q) => q[2] > m[2] ? q : m, cur[0]);
    ro.set('R', `${fix(cur[cur.length - 1][1], 2)} m`); ro.set('T', `${fix(T, 2)} s`); ro.set('H', `${fix(peak[2], 2)} m`); ro.set('vx', `${fix(p[3], 2)} m s⁻¹`); ro.set('vy', `${fix(p[4], 2)} m s⁻¹`); ro.set('hit', `${hits}`);
  }, [S]);
  const g = Group(P.side, 'Launch');
  Seg(g, { options: [['angle', 'At an angle'], ['horizontal', 'Horizontal']], value: mode, onchange: v => { mode = v; sA.el.hidden = v === 'horizontal'; if (v === 'horizontal' && h0 < 5) { h0 = 20; sH.set(20); } reset(); } });
  Slider(g, { id: 'pj-u', label: 'Launch speed <i>u</i>', min: 4, max: 35, step: 0.5, value: u, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u = v; reset(); } });
  const sA = Slider(g, { id: 'pj-a', label: 'Angle <i>θ</i>', min: 5, max: 85, step: 1, value: ang, unit: '°', fmt: v => fix(v, 0), oninput: v => { ang = v; reset(); } });
  const sH = Slider(g, { id: 'pj-h', label: 'Launch height', min: 0, max: 40, step: 1, value: h0, unit: 'm', fmt: v => fix(v, 0), oninput: v => { h0 = v; reset(); } });
  Switch(g, { id: 'pj-d', label: 'Air resistance', value: false, onchange: v => { drag = v; reset(); } });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'New target', () => { targetX = randi(15, 60); }); Btn(b, 'Clear traces', () => shots = []);
  const ro = Readout(Group(P.side, 'Flight'), [['R', 'Range'], ['T', 'Time of flight'], ['H', 'Max height'], ['vx', '<i>v</i>ₓ now'], ['vy', '<i>v</i>ᵧ now'], ['hit', 'Targets hit', 'hl']]);
  Note(P.side, 'Without air resistance the horizontal velocity never changes — the only force is weight, and it acts vertically. Switch on air resistance: the path is no longer symmetrical and the range drops.');
  Card(P.below, 'Independence of horizontal and vertical motion (1.5.1)', list(['<b>Horizontal:</b> no force (air resistance neglected) ⇒ no acceleration ⇒ <i>v</i>ₓ = <i>u</i> cos <i>θ</i> is constant; <i>x</i> = <i>v</i>ₓ<i>t</i>.', '<b>Vertical:</b> constant acceleration <i>g</i> downwards; use SUVAT with <i>u</i>ᵧ = <i>u</i> sin <i>θ</i>.', 'The two motions are linked <b>only by time</b>: find <i>t</i> from one, use it in the other.', 'A ball dropped and a ball fired horizontally from the same height land at the same time.', 'Maximum range on level ground (no air resistance) is at 45°. Complementary angles (30° and 60°) give the same range.']));
  EqCard(P.below, 'Projectile equations (1.5.2)', [['u_x = u\\cos\\theta,\\ u_y = u\\sin\\theta', 'resolve first'], ['x = u_x t', 'horizontal'], ['y = u_y t - \\frac{1}{2}gt^2', 'vertical, up +'], ['t_{flight} = \\frac{2u\\sin\\theta}{g}', 'level ground'], ['R = \\frac{u^2\\sin 2\\theta}{g}', 'level ground']]);
  Drill(P.below, { title: 'Projectile drill', cls: 'wide', gens: [
    () => { const h = randi(5, 60), v = randi(5, 30); const t2 = Math.sqrt(2 * h / G); return { q: `A ball leaves a <b>${h} m</b> high cliff horizontally at <b>${v} m s⁻¹</b>. How far from the base does it land?`, a: v * t2, unit: 'm', steps: [`Vertical: h = ½gt² ⇒ t = √(2×${h}/9.81) = ${fix(t2, 3)} s`, `Horizontal: x = vt = ${v} × ${fix(t2, 3)} = ${fix(v * t2, 2)} m`] }; },
    () => { const u2 = randi(10, 30), a = pick([20, 30, 35, 40, 45, 50, 60]); const T = 2 * u2 * Math.sin(a * DEG) / G; return { q: `A ball is kicked at <b>${u2} m s⁻¹</b> at <b>${a}°</b> above level ground. Find its time of flight.`, a: T, unit: 's', steps: [`u_y = ${u2} sin ${a}° = ${fix(u2 * Math.sin(a * DEG), 2)} m s⁻¹`, `y = 0 when t = 2u_y/g = ${fix(T, 3)} s`] }; },
    () => { const u2 = randi(10, 30), a = pick([25, 30, 40, 45, 55, 60]); const R = u2 * u2 * Math.sin(2 * a * DEG) / G; return { q: `A projectile is launched at <b>${u2} m s⁻¹</b> at <b>${a}°</b> on level ground. Find its range.`, a: R, unit: 'm', steps: [`t = 2u sin θ/g = ${fix(2 * u2 * Math.sin(a * DEG) / G, 3)} s`, `R = u cos θ × t = ${fix(R, 2)} m`] }; },
    () => { const u2 = randi(10, 30), a = pick([30, 40, 50, 60, 70]); const Hm = (u2 * Math.sin(a * DEG)) ** 2 / (2 * G); return { q: `Find the maximum height reached by a projectile launched at <b>${u2} m s⁻¹</b>, <b>${a}°</b> above the horizontal.`, a: Hm, unit: 'm', steps: [`u_y = ${fix(u2 * Math.sin(a * DEG), 2)} m s⁻¹; at the top v_y = 0`, `H = u_y²/2g = ${fix(Hm, 2)} m`] }; },
    () => ({ q: 'At the highest point of its path, a projectile (no air resistance) has…', options: ['zero vertical velocity and acceleration g downwards', 'zero velocity and zero acceleration', 'zero acceleration', 'maximum speed'], correct: 0, why: 'The horizontal component is unchanged, so the speed is not zero; gravity still acts, so a = g.' }),
  ] });
}

topic({
  id: 'projectiles', code: '1.5', unit: 'AS 1', title: 'Dynamics: Projectiles', short: 'Projectiles',
  blurb: 'Horizontal and vertical motion are independent. Fire at a target, watch the component “shadows”, and switch air resistance on.',
  outcomes: [
    ['1.5.1', 'demonstrate an understanding of the independence of the vertical and horizontal motion of a projectile', 'launch'],
    ['1.5.2', 'solve problems involving projectile motion, including projectiles launched horizontally and at an angle, neglecting air resistance', 'launch'],
  ],
  labs: [{ id: 'launch', title: 'Projectile launcher', hint: 'hit the target', spec: ['1.5.1', '1.5.2'], mount: mountProjectile }],
  equations: [['u_x = u\\cos\\theta', ''], ['u_y = u\\sin\\theta', ''], ['x = u_x t', ''], ['s_y = u_y t - \\frac{1}{2}gt^2', ''], ['v_y = u_y - gt', '']],
  traps: ['Resolve the launch velocity first; never put the full <i>u</i> into a vertical SUVAT.', 'Time is the link between the two directions.', 'Horizontal launch: <i>u</i>ᵧ = 0.', 'The speed at impact needs <b>both</b> components: <i>v</i> = √(<i>v</i>ₓ² + <i>v</i>ᵧ²).', 'Air resistance reduces both range and maximum height and makes the path asymmetric.'],
  notes: [
    ['Independence of motion', 'The horizontal and vertical components of a projectile’s motion are independent. With no air resistance the only force is weight (vertical), so the horizontal velocity is constant and the vertical acceleration is g downwards.'],
    ['Method for any projectile question', '<ol><li>Resolve u into u cos θ (horizontal) and u sin θ (vertical).</li><li>Vertical: SUVAT with a = −g to find t (or the height).</li><li>Horizontal: x = u cos θ × t.</li><li>Combine components with Pythagoras for the final speed and use tan⁻¹(v_y/v_x) for its direction.</li></ol>'],
    ['Useful results (level ground)', 'Time of flight 2u sin θ/g; maximum height (u sin θ)²/2g; range u² sin 2θ/g, maximum at 45°.'],
    ['Air resistance', 'Air resistance opposes the velocity, reducing both components. The range and height are smaller, the descent is steeper than the ascent, and the optimum angle is below 45°.'],
  ],
  mini(c, w, h, t, C) {
    const T = 2.4, tt = t % T, u = 1, X = x => 14 + x * (w - 28), Y = y => h - 14 - y * (h - 28);
    const pts = []; for (let k = 0; k <= 40; k++) { const q = k / 40; pts.push([X(q), Y(4 * q * (1 - q) * 0.9)]); } line(c, pts, { color: alpha(C.blue, .4), width: 1.5, dash: [3, 4] });
    const q = tt / T; dot(c, X(q), Y(4 * q * (1 - q) * 0.9), 5, C.red); for (let k = 0; k <= 8; k++) { const r = k / 8; if (r <= q) dot(c, X(r), h - 8, 2, C.violet); }
  },
});
})();

/* ================= 1.6 Newton's laws of motion ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: F = ma — trolley and lift ---------- */
function mountFma(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 320, maxH: 480, mobileAspect: 1.05 });
  let mode = 'trolley', F = 20, m = 4, mu = 0.1, x = 0, v = 0, t = 0, la = 1.5, ly = 0, lv = 0, lphase = 0, mp = 60;
  L.loop(dt => {
    t += dt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    if (mode === 'trolley') {
      const N = m * G, fr = v > 1e-3 ? mu * N : Math.min(mu * N, F), net = F - fr, a = net / m;
      v = Math.max(0, v + a * dt); x += v * dt; if (x > 40) { x = 0; }
      const gy = H * 0.66, sc = (W - 80) / 40, bx = 40 + (x % 40) * sc;
      line(c, [[10, gy], [W - 10, gy]], { color: C.ink2, width: 2 }); for (let k = 0; k <= 40; k += 5) rich(c, `${k}`, 40 + k * sc, gy + 14, { align: 'center', size: 10, mono: true, color: C.muted });
      const bw = 60 + m * 6, bh = 36 + m * 2;
      c.fillStyle = C.blue; rrect(c, bx - bw / 2, gy - bh - 10, bw, bh, 4); c.fill(); dot(c, bx - bw / 3, gy - 6, 6, C.ink); dot(c, bx + bw / 3, gy - 6, 6, C.ink);
      rich(c, `${m} kg`, bx, gy - bh / 2 - 10, { align: 'center', size: 13, color: C.onblue, w: 600 });
      const k = 3.2, cy = gy - bh / 2 - 10;
      arrow(c, bx + bw / 2, cy, bx + bw / 2 + F * k, cy, { color: C.green, width: 3 }); rich(c, `push ${fix(F, 0)} N`, bx + bw / 2 + F * k + 6, cy, { size: 12, color: C.green, w: 600 });
      if (fr > 0) { arrow(c, bx - bw / 2, gy - 12, bx - bw / 2 - fr * k, gy - 12, { color: C.red, width: 3 }); rich(c, `friction ${fix(fr, 1)} N`, bx - bw / 2 - fr * k - 6, gy - 12, { align: 'right', size: 12, color: C.red, w: 600 }); }
      arrow(c, bx, gy - bh - 10, bx, gy - bh - 10 - N * 0.6, { color: C.violet, width: 2.4 }); rich(c, `*R* = ${fix(N, 1)} N`, bx + 8, gy - bh - 20 - N * 0.4, { size: 12, color: C.violet });
      arrow(c, bx - 12, gy - bh / 2 - 10, bx - 12, gy - bh / 2 - 10 + N * 0.6, { color: C.orange, width: 2.4 }); rich(c, `*W* = ${fix(N, 1)} N`, bx - 18, gy - bh / 2 + N * 0.5, { align: 'right', size: 12, color: C.orange });
      rich(c, net > 0 ? `resultant ${fix(net, 1)} N → accelerates at ${fix(a, 2)} m s⁻²` : v > 0.01 ? 'decelerating' : 'friction balances the push: at rest (Newton 1)', W / 2, 26, { align: 'center', size: 13.5, w: 700, color: net > 0 ? C.blue : C.muted });
      ro.set('fn', `${fix(net, 2)} N`); ro.set('a', `${fix(a, 2)} m s⁻²`); ro.set('v', `${fix(v, 2)} m s⁻¹`); ro.set('x', `${fix(F / m, 2)} m s⁻² (no friction)`);
    } else {
      // lift: accelerate up 2 s, steady 3 s, decelerate 2 s, stop 2 s, then reverse
      const cyc = 18, tt = t % cyc, ph = tt < 2 ? ['up', la] : tt < 5 ? ['up', 0] : tt < 7 ? ['up', -la] : tt < 9 ? ['rest', 0] : tt < 11 ? ['down', -la] : tt < 14 ? ['down', 0] : tt < 16 ? ['down', la] : ['rest', 0];
      const a = ph[1]; if (tt < lphase) { lv = 0; ly = 0; } lphase = tt; lv += a * dt; ly += lv * dt;
      const R = mp * (G + a);
      const cx = W * 0.3, sh = H - 40, shaftTop = 20, pos = clamp(0.92 - 0.84 * ly / (10 * la), 0.04, 0.96), cy = shaftTop + pos * (sh - 120) + 60;
      c.strokeStyle = C.line2; c.lineWidth = 2; c.strokeRect(cx - 70, shaftTop, 140, sh);
      line(c, [[cx, shaftTop], [cx, cy - 60]], { color: C.ink2, width: 2 });
      c.fillStyle = C.paper3; c.strokeStyle = C.ink; rrect(c, cx - 56, cy - 60, 112, 120, 4); c.fill(); c.stroke();
      // person on scales
      c.fillStyle = C.ink2; c.fillRect(cx - 24, cy + 48, 48, 8);
      dot(c, cx, cy - 32, 9, C.blue); line(c, [[cx, cy - 22], [cx, cy + 14]], { color: C.blue, width: 4 }); line(c, [[cx, cy + 14], [cx - 10, cy + 46]], { color: C.blue, width: 4 }); line(c, [[cx, cy + 14], [cx + 10, cy + 46]], { color: C.blue, width: 4 });
      arrow(c, cx + 34, cy + 48, cx + 34, cy + 48 - R / 18, { color: C.violet, width: 2.6 }); arrow(c, cx - 34, cy, cx - 34, cy + mp * G / 18, { color: C.orange, width: 2.6 });
      rich(c, `*R*`, cx + 42, cy + 30 - R / 36, { size: 13, color: C.violet }); rich(c, `*W*`, cx - 42, cy + 20, { align: 'right', size: 13, color: C.orange });
      if (Math.abs(a) > 0) arrow(c, cx + 90, cy, cx + 90, cy - Math.sign(a) * 40, { color: C.red, width: 2.4 }); if (a) rich(c, '*a*', cx + 98, cy - Math.sign(a) * 30, { size: 13, color: C.red });
      // scale display
      const sx = W * 0.72, sy = H * 0.4; c.fillStyle = C.paper; c.strokeStyle = C.ink; c.lineWidth = 2; rrect(c, sx - 100, sy - 36, 200, 72, 8); c.fill(); c.stroke();
      rich(c, `${fix(R, 0)} N`, sx, sy - 4, { align: 'center', size: 26, mono: true, w: 600, color: C.violet });
      rich(c, `scale reads ${fix(R / G, 1)} kg`, sx, sy + 22, { align: 'center', size: 11.5, color: C.muted });
      const desc = a > 0 ? (ph[0] === 'up' ? 'accelerating upwards' : 'decelerating while going down') : a < 0 ? (ph[0] === 'up' ? 'decelerating while going up' : 'accelerating downwards') : ph[0] === 'rest' ? 'at rest' : `moving ${ph[0]} at constant speed`;
      rich(c, desc, sx, sy + 70, { align: 'center', size: 14, w: 700, color: a ? C.red : C.green });
      rich(c, a > 0 ? '*R* − *W* = *ma* ⇒ *R* > *W*: feel heavier' : a < 0 ? '*W* − *R* = *ma* ⇒ *R* < *W*: feel lighter' : '*R* = *W*: resultant force zero', sx, sy + 94, { align: 'center', size: 12.5, color: C.ink2 });
      ro.set('fn', `${fix(R - mp * G, 1)} N`); ro.set('a', `${fix(a, 2)} m s⁻² ${a > 0 ? '(up)' : a < 0 ? '(down)' : ''}`); ro.set('v', `${fix(lv, 2)} m s⁻¹`); ro.set('x', `${fix(R, 1)} N`);
    }
  }, [S]);
  const g = Group(P.side, 'Scenario');
  Seg(g, { options: [['trolley', 'Trolley & friction'], ['lift', 'Person in a lift']], value: mode, onchange: v => { mode = v; gt.hidden = v !== 'trolley'; gl.hidden = v !== 'lift'; t = 0; lv = 0; ly = 0; } });
  const gt = el('div', { class: 'grp' }); P.side.append(gt);
  Slider(gt, { id: 'nl-F', label: 'Push force', min: 0, max: 60, step: 1, value: F, unit: 'N', fmt: v => fix(v, 0), oninput: v => F = v });
  Slider(gt, { id: 'nl-m', label: 'Mass', min: 1, max: 10, step: 0.5, value: m, unit: 'kg', fmt: v => fix(v, 1), oninput: v => m = v });
  Slider(gt, { id: 'nl-mu', label: 'Friction coefficient', min: 0, max: 0.6, step: 0.05, value: mu, fmt: v => fix(v, 2), oninput: v => mu = v });
  Btns(gt).append(el('button', { type: 'button', class: 'btn', onclick: () => { x = 0; v = 0; } }, 'Reset trolley'));
  const gl = el('div', { class: 'grp' }); gl.hidden = true; P.side.append(gl);
  Slider(gl, { id: 'nl-mp', label: 'Person’s mass', min: 30, max: 100, step: 5, value: mp, unit: 'kg', fmt: v => fix(v, 0), oninput: v => mp = v });
  Slider(gl, { id: 'nl-la', label: 'Lift acceleration', min: 0.5, max: 4, step: 0.5, value: la, unit: 'm s⁻²', fmt: v => fix(v, 1), oninput: v => la = v });
  const ro = Readout(Group(P.side, 'Live'), [['fn', 'Resultant force'], ['a', 'Acceleration', 'hl'], ['v', 'Velocity'], ['x', 'Push/m · or scale force']]);
  Note(P.side, 'Resultant force decides acceleration, not velocity. Zero resultant force means constant velocity — including zero (Newton’s first law).');
  Card(P.below, 'Newton’s laws (1.6.1)', list(['<b>First law:</b> a body remains at rest or moves with constant velocity unless acted on by a resultant external force.', '<b>Second law:</b> the rate of change of momentum of a body is proportional to the resultant force and takes place in the direction of the force. For constant mass: <b>F = ma</b>.', '<b>Third law:</b> if body A exerts a force on body B, then B exerts an equal and opposite force on A.']));
  Card(P.below, 'Third-law pairs', list(['Act on <b>different</b> bodies (so they never cancel each other).', 'Are the <b>same type</b> of force (both gravitational, both contact, …).', 'Equal in size, opposite in direction, same line of action.', 'Weight and the normal reaction on a book on a table are <b>not</b> a third-law pair: both act on the book and they are different types of force.']));
  Sorter(P.below, { cats: [['pair', 'Newton 3 pair'], ['not', 'Not a pair']], items: [
    { t: 'Earth pulls apple down; apple pulls Earth up', c: 'pair', why: 'gravitational, on different bodies' },
    { t: 'Book’s weight; table’s push up on the book', c: 'not', why: 'both act on the book' },
    { t: 'Swimmer pushes water back; water pushes swimmer forward', c: 'pair' },
    { t: 'Car tyre pushes road back; road pushes tyre forward', c: 'pair' },
    { t: 'Lift cable tension up; lift’s weight down', c: 'not', why: 'both act on the lift' },
    { t: 'Rocket pushes exhaust gas down; gas pushes rocket up', c: 'pair' },
    { t: 'Drag on a skydiver; skydiver’s weight', c: 'not', why: 'both on the skydiver, different types' },
    { t: 'Magnet attracts nail; nail attracts magnet', c: 'pair' },
  ] });
  Drill(P.below, { title: 'Newton’s second law drill', gens: [
    () => { const m2 = randi(2, 1500), a = +rand(0.2, 4).toFixed(1); return { q: `What resultant force gives a <b>${m2} kg</b> object an acceleration of <b>${a} m s⁻²</b>?`, a: m2 * a, unit: 'N', steps: ['F = ma', `= ${m2} × ${a} = ${fix(m2 * a, 1)} N`] }; },
    () => { const m2 = randi(40, 110), a = +rand(0.5, 3).toFixed(1); const R = m2 * (G + a); return { q: `A <b>${m2} kg</b> person stands on scales in a lift accelerating <b>upwards</b> at <b>${a} m s⁻²</b>. What force do the scales exert?`, a: R, unit: 'N', steps: ['Up positive: R − mg = ma', `R = m(g + a) = ${m2}(9.81 + ${a}) = ${fix(R, 1)} N`] }; },
    () => { const m2 = randi(800, 2000), Fd = randi(1500, 5000), Ff = randi(300, 1400); return { q: `A car of mass <b>${m2} kg</b> has a driving force of <b>${Fd} N</b> and total resistive forces of <b>${Ff} N</b>. Find its acceleration.`, a: (Fd - Ff) / m2, unit: 'm s⁻²', steps: [`Resultant = ${Fd} − ${Ff} = ${Fd - Ff} N`, `a = F/m = ${fix((Fd - Ff) / m2, 3)} m s⁻²`] }; },
  ] });
}

/* ---------- Lab B: terminal velocity ---------- */
function mountTerminal(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, plain: true });
  let m = 80, t = 0, v = 0, y = 0, chute = false, kOpen = 25, kClosed = 0.25, hist = [], deployed = null;
  const plot = new Plot(S2, { xlabel: 'time *t* / s', ylabel: 'velocity *v* / m s⁻¹', xmin: 0, xmax: 60, ymin: 0 });
  L.loop(dt => {
    const k = chute ? kClosed + (kOpen - kClosed) * Math.min(1, (t - deployed) / 2.5) : kClosed;
    if (y < 3000 && t < 60) { const n = 8, h = dt / n; for (let i = 0; i < n; i++) { const a0 = G - k * v * v / m; v += a0 * h; y += v * h; } t += dt; hist.push([t, v]); }
    const D = k * v * v, a = G - D / m;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    // sky stripes scroll with y
    c.strokeStyle = alpha(C.cyan, .35); c.lineWidth = 1; for (let k2 = 0; k2 < 14; k2++) { const yy = ((k2 * 40 - y * 3) % (H + 40) + H + 40) % (H + 40) - 20; line(c, [[W * 0.05 + k2 * 17 % 60, yy], [W * 0.05 + 30 + k2 * 17 % 60, yy]], { color: alpha(C.cyan, .4), width: 2 }); }
    const px = W * 0.3, py = H * 0.55;
    if (chute) { c.beginPath(); c.arc(px, py - 60, 44, Math.PI, 0); c.fillStyle = alpha(C.red, .8); c.fill(); line(c, [[px - 44, py - 60], [px - 6, py - 10]], { color: C.ink2, width: 1 }); line(c, [[px + 44, py - 60], [px + 6, py - 10]], { color: C.ink2, width: 1 }); }
    dot(c, px, py - 10, 7, C.blue); line(c, [[px, py - 3], [px, py + 20]], { color: C.blue, width: 5 }); line(c, [[px - 14, py + 4], [px + 14, py + 4]], { color: C.blue, width: 3 });
    const s = 0.12; arrow(c, px + 30, py, px + 30, py + m * G * s, { color: C.orange, width: 3 }); rich(c, `*W* = ${fix(m * G, 0)} N`, px + 38, py + m * G * s * 0.6, { size: 12, color: C.orange, w: 600 });
    arrow(c, px - 30, py, px - 30, py - Math.min(D, 3000) * s, { color: C.violet, width: 3 }); rich(c, `drag = ${fix(D, 0)} N`, px - 38, py - Math.min(D, 3000) * s * 0.6, { align: 'right', size: 12, color: C.violet, w: 600 });
    const st = Math.abs(a) < 0.15 ? 'TERMINAL VELOCITY: drag = weight, a = 0' : a > 0 ? 'drag < weight: speeding up' : 'drag > weight: slowing down';
    rich(c, st, W * 0.7, H * 0.4, { align: 'center', size: 14, w: 700, color: Math.abs(a) < 0.15 ? C.green : a > 0 ? C.blue : C.red });
    rich(c, `height fallen ${fix(y, 0)} m`, W * 0.7, H * 0.4 + 26, { align: 'center', size: 12, color: C.muted, mono: true });
    S2.begin(); plot.ymax = Math.max(20, Math.sqrt(m * G / kClosed) * 1.1); plot.axes();
    const vt1 = Math.sqrt(m * G / kClosed), vt2 = Math.sqrt(m * G / kOpen);
    plot.hline(vt1, { color: alpha(C.blue, .6) }); plot.label(58, vt1, `*v*ₜ = ${fix(vt1, 1)} m s⁻¹`, { align: 'right', dy: -10, size: 11.5, color: C.blue });
    plot.hline(vt2, { color: alpha(C.red, .6) }); plot.label(58, vt2, `with parachute ${fix(vt2, 1)} m s⁻¹`, { align: 'right', dy: -10, size: 11.5, color: C.red });
    if (deployed != null) plot.vline(deployed, { color: C.red });
    plot.curve(hist.filter((_, i) => i % 3 === 0).map(h => [h[0], h[1]]), { color: C.green, width: 2.4 });
    ro.set('v', `${fix(v, 1)} m s⁻¹`); ro.set('D', `${fix(D, 0)} N`); ro.set('a', `${fix(a, 2)} m s⁻²`); ro.set('vt', `${fix(chute ? vt2 : vt1, 1)} m s⁻¹`);
  }, [S1, S2]);
  const g = Group(P.side, 'Skydiver');
  Slider(g, { id: 'tv-m', label: 'Mass (with kit)', min: 50, max: 120, step: 5, value: m, unit: 'kg', fmt: v => fix(v, 0), oninput: v2 => m = v2 });
  const b = Btns(g); const cb = Btn(b, 'Open parachute', () => { if (!chute) { chute = true; deployed = t; cb.disabled = true; } }, 'pri'); Btn(b, 'Jump again', () => { t = 0; v = 0; y = 0; chute = false; hist = []; deployed = null; cb.disabled = false; });
  const ro = Readout(Group(P.side, 'Live'), [['v', 'Velocity'], ['D', 'Drag (∝ <i>v</i>²)'], ['a', 'Acceleration', 'hl'], ['vt', 'Terminal velocity']]);
  Note(P.side, 'Drag grows with speed. When drag equals weight the resultant force is zero, so the acceleration is zero and the velocity stays constant — terminal velocity.');
  Card(P.below, 'Describing the v–t graph', list(['At the start <i>v</i> = 0, so drag = 0 and <i>a</i> = <i>g</i> (gradient = 9.81 m s⁻²).', 'As <i>v</i> increases, drag increases, the resultant force decreases, so the acceleration (gradient) decreases.', 'Drag = weight ⇒ resultant force = 0 ⇒ terminal velocity (graph flat).', 'Parachute opens: area increases, drag jumps above weight, resultant force is upwards so the skydiver decelerates.', 'Drag falls as <i>v</i> falls until drag = weight again at a new, lower terminal velocity.']));
}

topic({
  id: 'newton', code: '1.6', unit: 'AS 1', title: 'Newton’s Laws of Motion', short: 'Newton',
  blurb: 'Resultant force causes acceleration: trolleys, lifts, third-law pairs and a skydiver reaching terminal velocity.',
  outcomes: [
    ['1.6.1', 'state Newton’s laws of motion', 'fma'],
    ['1.6.2', 'apply the laws to simple situations, including the use of F = ma', 'fma'],
    ['1.6.3', 'demonstrate an understanding of the conditions required for an object to reach terminal velocity', 'terminal'],
  ],
  labs: [
    { id: 'fma', title: 'F = ma: trolley & lift', hint: 'resultant force', spec: ['1.6.1', '1.6.2'], mount: mountFma },
    { id: 'terminal', title: 'Terminal velocity', hint: 'skydiver', spec: ['1.6.3'], mount: mountTerminal },
  ],
  equations: [['F = ma', 'resultant force, constant mass'], ['W = mg', ''], ['R = m(g + a)', 'lift accelerating up'], ['F = \\frac{\\Delta p}{\\Delta t}', 'general second law']],
  traps: ['Use the <b>resultant</b> force in F = ma, not just the driving force.', 'Third-law pairs act on <b>different</b> bodies — weight and normal reaction are not a pair.', 'Constant velocity means zero resultant force, not zero force.', 'At terminal velocity the object is still moving — its acceleration is zero.', 'Opening a parachute makes the skydiver decelerate; they do not go upwards.'],
  notes: [
    ['Newton’s first law', 'A body continues at rest or in uniform motion in a straight line unless acted on by a resultant external force.'],
    ['Newton’s second law', 'The rate of change of momentum is proportional to the resultant force and in its direction. With constant mass this becomes F = ma (the newton is defined so the constant is 1: 1 N gives 1 kg an acceleration of 1 m s⁻²).'],
    ['Newton’s third law', 'If A exerts a force on B, B exerts an equal and opposite force of the same type on A. The pair act on different bodies.'],
    ['Free-body diagrams', 'Draw only the forces acting <i>on</i> the chosen body, as arrows from its centre, labelled. Resolve, find the resultant, then F = ma.'],
    ['Terminal velocity', 'For a falling object, drag increases with speed. Terminal velocity is reached when drag (plus upthrust) equals weight: resultant force zero, acceleration zero, velocity constant.'],
  ],
  mini(c, w, h, t, C) {
    const x = 20 + ((t * 40) % (w - 60));
    line(c, [[10, h * 0.72], [w - 10, h * 0.72]], { color: C.ink2, width: 2 });
    c.fillStyle = C.blue; rrect(c, x, h * 0.72 - 30, 40, 26, 4); c.fill();
    arrow(c, x + 40, h * 0.72 - 17, x + 80, h * 0.72 - 17, { color: C.green, width: 2.4 }); arrow(c, x, h * 0.72 - 8, x - 22, h * 0.72 - 8, { color: C.red, width: 2 });
    rich(c, '*F* = *ma*', w - 16, 20, { align: 'right', size: 14, color: C.ink });
  },
});
})();

/* ================= 1.7 Linear momentum and impulse ================= */
(() => {

/* ---------- Lab A: collisions & explosions on an air track ---------- */
function mountCollide(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, mobileAspect: 1.4 });
  const S2 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 320, plain: true });
  let m1 = 2, m2 = 1, u1 = 3, u2 = -1, e = 1, mode = 'collide', st;
  const TR = 4; // track length m
  function reset() { st = mode === 'collide' ? { x1: 0.8, x2: 2.8, v1: u1, v2: u2, done: false, t: 0 } : { x1: 1.85, x2: 2.35, v1: 0, v2: 0, done: false, t: 0, fire: 0.6 }; before = { p: m1 * st.v1 + m2 * st.v2, k: 0.5 * m1 * st.v1 ** 2 + 0.5 * m2 * st.v2 ** 2 }; after = null; }
  let before, after; reset();
  const W1 = () => 0.18 + m1 * 0.04, W2 = () => 0.18 + m2 * 0.04;
  L.loop(dt => {
    st.t += dt;
    if (mode === 'explode' && !st.done && st.t > st.fire) {
      // spring releases stored energy E split so momentum = 0
      const E = explE; const v1 = -Math.sqrt(2 * E * m2 / (m1 * (m1 + m2))), v2 = -m1 * v1 / m2; st.v1 = v1; st.v2 = v2; st.done = true;
      after = { p: m1 * v1 + m2 * v2, k: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2 };
    }
    st.x1 += st.v1 * dt; st.x2 += st.v2 * dt;
    if (mode === 'collide' && !st.done && st.x2 - st.x1 <= (W1() + W2()) / 2 && st.v1 > st.v2) {
      const v1 = (m1 * st.v1 + m2 * st.v2 + m2 * e * (st.v2 - st.v1)) / (m1 + m2), v2 = (m1 * st.v1 + m2 * st.v2 + m1 * e * (st.v1 - st.v2)) / (m1 + m2);
      st.v1 = v1; st.v2 = v2; st.done = true; after = { p: m1 * v1 + m2 * v2, k: 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2 };
    }
    if ((st.x1 < -0.6 || st.x2 > TR + 0.6 || st.t > 8) && st.done) reset();
    if (!st.done && st.t > 8) reset();
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, sc = (W - 40) / TR, X = x => 20 + x * sc, gy = H * 0.62;
    c.fillStyle = C.paper3; c.fillRect(10, gy, W - 20, 12); c.strokeStyle = C.line2; c.strokeRect(10.5, gy + .5, W - 21, 11);
    for (let k = 0; k < 60; k++) dot(c, 16 + k * (W - 32) / 59, gy + 6, 1.2, C.muted);
    const drawG = (x, w, m, col, v, lab) => { const px = X(x), pw = w * sc, ph = 26 + m * 7; c.fillStyle = col; rrect(c, px - pw / 2, gy - ph, pw, ph, 4); c.fill(); if (pw > 52) rich(c, `${lab} ${m} kg`, px, gy - ph / 2, { align: 'center', size: 12, color: C.onblue, w: 600 }); else { rich(c, lab, px, gy - ph / 2, { align: 'center', size: 12, color: C.onblue, w: 700, fit: false }); rich(c, `${m} kg`, px, gy + 26, { align: 'center', size: 11.5, color: col, w: 600 }); } if (Math.abs(v) > 0.01) { arrow(c, px, gy - ph - 14, px + v * 22, gy - ph - 14, { color: col, width: 2.4 }); } rich(c, `${fix(v, 2)} m s⁻¹`, px, gy - ph - 30, { align: 'center', size: 11.5, color: col, mono: true }); };
    if (mode === 'explode' && !st.done) { const xa = X(st.x1 + W1() / 2), xb = X(st.x2 - W2() / 2), pts = []; for (let k = 0; k <= 8; k++) pts.push([xa + (xb - xa) * k / 8, gy - 14 + (k % 2 ? -6 : 6) * (k > 0 && k < 8)]); line(c, pts, { color: C.ink, width: 1.6 }); }
    drawG(st.x1, W1(), m1, C.blue, st.v1, 'A'); drawG(st.x2, W2(), m2, C.red, st.v2, 'B');
    rich(c, mode === 'explode' ? (st.done ? 'explosion: total momentum still zero' : 'compressed spring between the gliders…') : st.done ? (e === 1 ? 'elastic collision' : e === 0 ? 'perfectly inelastic: they move off together' : 'inelastic collision') : 'before collision', W / 2, 20, { align: 'center', size: 13, w: 700, color: C.ink2 });
    // bar charts: momentum & KE before/after
    const c2 = S2.begin(), W2_ = S2.w, H2 = S2.h, half = W2_ / 2;
    const bars = (x0, title, b, a, unit, key, signed) => {
      rich(c2, title, x0 + half / 2, 18, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
      const mx = Math.max(1, Math.abs(b), a ? Math.abs(a) : 0) * 1.2, base = signed ? H2 * 0.55 : H2 - 36, sc2 = (signed ? H2 * 0.34 : H2 - 70) / mx;
      line(c2, [[x0 + 20, base], [x0 + half - 20, base]], { color: C.ink2, width: 1 });
      [[b, 'before', C.blue], [a, 'after', C.green]].forEach(([v, lab, col], i) => { const bx = x0 + half * (0.3 + i * 0.4); if (v != null) { c2.fillStyle = col; c2.fillRect(bx - 22, v >= 0 ? base - v * sc2 : base, 44, Math.abs(v) * sc2); rich(c2, `${fix(v, 2)} ${unit}`, bx, v >= 0 ? base - v * sc2 - 10 : base + Math.abs(v) * sc2 + 10, { align: 'center', size: 11.5, mono: true, color: col }); } rich(c2, lab, bx, H2 - 14, { align: 'center', size: 11.5, color: C.muted }); });
    };
    bars(0, 'total momentum', before.p, after && after.p, 'N s', 'p', true);
    bars(half, 'total kinetic energy', before.k, after && after.k, 'J', 'k', false);
    line(c2, [[half, 10], [half, H2 - 10]], { color: C.line, width: 1 });
    ro.set('pb', `${fix(before.p, 3)} N s`); ro.set('pa', after ? `${fix(after.p, 3)} N s` : '—'); ro.set('kb', `${fix(before.k, 3)} J`); ro.set('ka', after ? `${fix(after.k, 3)} J` : '—');
    ro.set('kl', after ? (Math.abs(after.k - before.k) < 1e-6 ? 'none (elastic)' : `${fix(before.k - after.k, 3)} J → heat, sound`) : '—');
  }, [S, S2]);
  let explE = 3;
  const g = Group(P.side, 'Set up');
  Seg(g, { options: [['collide', 'Collision'], ['explode', 'Explosion']], value: mode, onchange: v => { mode = v; gc.hidden = v !== 'collide'; ge.hidden = v !== 'explode'; reset(); } });
  Slider(g, { id: 'mm-m1', label: 'Mass A', min: 0.5, max: 5, step: 0.5, value: m1, unit: 'kg', fmt: v => fix(v, 1), oninput: v => { m1 = v; reset(); } });
  Slider(g, { id: 'mm-m2', label: 'Mass B', min: 0.5, max: 5, step: 0.5, value: m2, unit: 'kg', fmt: v => fix(v, 1), oninput: v => { m2 = v; reset(); } });
  const gc = el('div', { class: 'grp' }); g.append(gc);
  Slider(gc, { id: 'mm-u1', label: 'Initial velocity A', min: -1, max: 5, step: 0.5, value: u1, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u1 = v; reset(); } });
  Slider(gc, { id: 'mm-u2', label: 'Initial velocity B', min: -4, max: 2, step: 0.5, value: u2, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u2 = v; reset(); } });
  Seg(gc, { label: 'Collision type', options: [['1', 'Elastic'], ['0.5', 'Inelastic'], ['0', 'Stick together']], value: '1', onchange: v => { e = +v; reset(); } });
  const ge = el('div', { class: 'grp' }); ge.hidden = true; g.append(ge);
  Slider(ge, { id: 'mm-E', label: 'Spring energy', min: 0.5, max: 10, step: 0.5, value: explE, unit: 'J', fmt: v => fix(v, 1), oninput: v => { explE = v; reset(); } });
  Btns(g).append(el('button', { class: 'btn pri', type: 'button', onclick: reset }, '↺ Run again'));
  const ro = Readout(Group(P.side, 'Totals'), [['pb', 'Momentum before'], ['pa', 'Momentum after', 'hl'], ['kb', 'KE before'], ['ka', 'KE after'], ['kl', 'KE lost']]);
  Note(P.side, 'Momentum is conserved in <b>every</b> collision and explosion (no external forces). Kinetic energy is conserved only in an elastic collision.');
  EqCard(P.below, 'Momentum (1.7.1–1.7.4)', [['p = mv', 'kg m s⁻¹ = N s, a vector'], ['m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2', 'conservation'], ['E_k = \\frac{1}{2}mv^2 = \\frac{p^2}{2m}', '']]);
  Card(P.below, 'In exam words', `<p><b>Linear momentum</b> is the product of mass and velocity.</p><p><b>Principle of conservation of linear momentum:</b> the total momentum of a system remains constant provided no resultant external force acts on it.</p><p>In an <b>elastic</b> collision total kinetic energy is conserved; in an <b>inelastic</b> collision some kinetic energy is transferred to other forms (heat, sound, deformation). Total energy is always conserved.</p>`);
  Drill(P.below, { title: 'Momentum drill', gens: [
    () => { const ma = randi(1, 8), mb = randi(1, 8), ua = randi(2, 10); const v = ma * ua / (ma + mb); return { q: `A <b>${ma} kg</b> trolley moving at <b>${ua} m s⁻¹</b> collides with a stationary <b>${mb} kg</b> trolley and they stick together. Find their common velocity.`, a: v, unit: 'm s⁻¹', steps: ['Momentum before = momentum after', `${ma}×${ua} = (${ma}+${mb})v`, `v = ${fix(v, 3)} m s⁻¹`] }; },
    () => { const mg = +rand(2, 6).toFixed(1), mbul = +(rand(5, 20) / 1000).toFixed(3), vb = randi(200, 600); const vr = mbul * vb / mg; return { q: `A <b>${mg} kg</b> rifle fires a <b>${mbul * 1000} g</b> bullet at <b>${vb} m s⁻¹</b>. Find the recoil speed of the rifle.`, a: vr, unit: 'm s⁻¹', steps: ['Total momentum before = 0', `0 = ${mbul}×${vb} + ${mg}×v`, `recoil speed = ${fix(vr, 3)} m s⁻¹`] }; },
    () => { const ma = randi(1, 5), mb = randi(1, 5), ua = randi(3, 8); const v = ma * ua / (ma + mb); const lost = 0.5 * ma * ua * ua - 0.5 * (ma + mb) * v * v; return { q: `A <b>${ma} kg</b> ball at <b>${ua} m s⁻¹</b> hits and sticks to a stationary <b>${mb} kg</b> ball. How much kinetic energy is lost?`, a: lost, unit: 'J', steps: [`v = ${ma}×${ua}/${ma + mb} = ${fix(v, 3)} m s⁻¹`, `KE before = ${fix(0.5 * ma * ua * ua, 2)} J; KE after = ${fix(0.5 * (ma + mb) * v * v, 2)} J`, `lost = ${fix(lost, 2)} J`] }; },
    () => ({ q: 'Which quantity is conserved in an inelastic collision?', options: ['Total momentum only', 'Total kinetic energy only', 'Both momentum and kinetic energy', 'Neither'], correct: 0, why: 'Momentum is always conserved (no external force); kinetic energy is not in an inelastic collision.' }),
  ] });
}

/* ---------- Lab B: impulse and force–time graphs ---------- */
function mountImpulse(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, mobileAspect: 1.4 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 250, maxH: 360, plain: true });
  let m = 0.5, u = 6, k = 4000, surf = 'hard', t = 0, sim = null;
  const surfaces = { hard: 40000, medium: 4000, soft: 600 };
  function run() {
    // mass hits a spring-damper surface: F = kx + c·v while in contact; integrate
    const kk = surfaces[surf], lam = 0.9 * kk / u; let x = 0, v = u; const out = []; const dt = 1e-5;
    for (let tt = 0; tt < 2; tt += dt) { const F = Math.max(0, kk * x + lam * x * v); v -= F / m * dt; x += v * dt; out.push([tt, F]); if (x < 0 && tt > 1e-4) break; }
    const J = out.reduce((a, q) => a + q[1] * dt, 0);
    sim = { pts: out.filter((_, i) => i % Math.max(1, Math.floor(out.length / 400)) === 0), T: out[out.length - 1][0], Fmax: Math.max(...out.map(q => q[1])), J, vout: -v };
  }
  run();
  L.loop(dt => {
    t = (t + dt) % 3;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const wall = W * 0.72; c.fillStyle = surf === 'hard' ? C.ink2 : surf === 'medium' ? alpha(C.orange, .8) : alpha(C.green, .7); c.fillRect(wall, 20, surf === 'hard' ? 16 : surf === 'medium' ? 30 : 50, H - 40);
    rich(c, surf === 'hard' ? 'concrete' : surf === 'medium' ? 'rubber mat' : 'crash cushion', wall + 60, 30, { size: 12, color: C.muted });
    const ph = t < 1 ? 'in' : t < 1.4 ? 'hit' : 'out';
    const bx = ph === 'in' ? 60 + (wall - 80) * t : ph === 'hit' ? wall - 20 : wall - 20 - (t - 1.4) * (wall - 80) * (sim.vout / u);
    dot(c, bx, H / 2, 18, C.blue, C.paper2);
    if (ph !== 'hit') arrow(c, bx, H / 2 - 30, bx + (ph === 'in' ? 1 : -1) * 16 * (ph === 'in' ? u : sim.vout), H / 2 - 30, { color: C.green, width: 2.4 });
    rich(c, ph === 'in' ? `*u* = ${fix(u, 1)} m s⁻¹` : ph === 'out' ? `*v* = ${fix(sim.vout, 2)} m s⁻¹ back` : `contact ${fix(sim.T * 1000, 1)} ms`, Math.min(bx, wall - 110), H / 2 + 36, { align: 'center', size: 12.5, color: C.ink2, w: 600 });
    S2.begin(); const pl = new Plot(S2, { xlabel: 'time *t* / ms', ylabel: 'force *F* / N', xmin: 0, xmax: sim.T * 1000 * 1.1, ymin: 0, ymax: sim.Fmax * 1.15 });
    pl.axes(); pl.area(sim.pts.map(q => [q[0] * 1000, q[1]]), alpha(C.violet, .22)); pl.curve(sim.pts.map(q => [q[0] * 1000, q[1]]), { color: C.violet, width: 2.4 });
    pl.label(sim.T * 500, sim.Fmax * 0.45, `area = impulse = ${fix(sim.J, 3)} N s`, { align: 'center', size: 12.5, w: 700, color: C.violet, bg: alpha(C.paper2, .8) });
    ro.set('J', `${fix(sim.J, 3)} N s`); ro.set('dp', `${fix(m * (u + sim.vout), 3)} N s`); ro.set('T', `${fix(sim.T * 1000, 2)} ms`); ro.set('F', `${num(sim.Fmax, 3)} N`); ro.set('Fa', `${num(sim.J / sim.T, 3)} N`);
  }, [S1, S2]);
  const g = Group(P.side, 'Impact');
  Slider(g, { id: 'im-m', label: 'Ball mass', min: 0.1, max: 2, step: 0.1, value: m, unit: 'kg', fmt: v => fix(v, 1), oninput: v => { m = v; run(); } });
  Slider(g, { id: 'im-u', label: 'Impact speed', min: 1, max: 15, step: 0.5, value: u, unit: 'm s⁻¹', fmt: v => fix(v, 1), oninput: v => { u = v; run(); } });
  Seg(g, { label: 'Surface', options: [['hard', 'Concrete'], ['medium', 'Rubber'], ['soft', 'Cushion']], value: surf, onchange: v => { surf = v; run(); } });
  const ro = Readout(Group(P.side, 'Result'), [['J', 'Impulse (area)', 'hl'], ['dp', 'Change in momentum'], ['T', 'Contact time'], ['F', 'Peak force'], ['Fa', 'Average force Δp/Δt']]);
  Note(P.side, 'A softer surface makes the contact time longer, so for a similar change in momentum the force is much smaller. That is how crumple zones, airbags, helmets and landing mats work.');
  EqCard(P.below, 'Impulse (1.7.5)', [['\\text{impulse} = F\\Delta t = \\Delta p = mv - mu', 'N s'], ['F = \\frac{\\Delta p}{\\Delta t}', 'Newton’s second law'], ['\\text{impulse} = \\text{area under } F\\text{–}t', 'for a varying force']]);
  Card(P.below, 'Remember', list(['Impulse is a vector: take a direction as positive. A ball rebounding changes momentum by <i>m</i>(<i>u</i> + <i>v</i>), not <i>m</i>(<i>v</i> − <i>u</i>) with magnitudes.', 'Units: N s ≡ kg m s⁻¹.', 'For a varying force, find the impulse from the area under the force–time graph (count squares).']));
  Drill(P.below, { title: 'Impulse drill', gens: [
    () => { const m2 = +rand(0.05, 0.6).toFixed(2), u2 = randi(5, 30), v2 = randi(3, 25); const dp = m2 * (u2 + v2); return { q: `A <b>${m2} kg</b> ball hits a wall at <b>${u2} m s⁻¹</b> and rebounds at <b>${v2} m s⁻¹</b>. Find the magnitude of the impulse on the ball.`, a: dp, unit: 'N s', steps: ['Take the rebound direction as positive: u = −' + u2 + ', v = +' + v2, `Δp = m(v − u) = ${m2}(${v2} + ${u2}) = ${fix(dp, 3)} N s`] }; },
    () => { const m2 = randi(40, 90), v2 = randi(8, 20), tt = +rand(0.05, 0.5).toFixed(2); return { q: `A <b>${m2} kg</b> stunt performer moving at <b>${v2} m s⁻¹</b> is stopped by an airbag in <b>${tt} s</b>. Find the average force.`, a: m2 * v2 / tt, unit: 'N', steps: ['F = Δp/Δt', `= ${m2}×${v2}/${tt} = ${fix(m2 * v2 / tt, 0)} N`] }; },
    () => { const Fm = randi(200, 2000), tt = randi(2, 20); const J = 0.5 * Fm * tt / 1000; return { q: `A force–time graph for a kick is a triangle of peak <b>${Fm} N</b> and duration <b>${tt} ms</b>. Find the impulse.`, a: J, unit: 'N s', steps: ['Impulse = area = ½ × base × height', `= ½ × ${tt}×10⁻³ × ${Fm} = ${fix(J, 3)} N s`] }; },
  ] });
}

topic({
  id: 'momentum', code: '1.7', unit: 'AS 1', title: 'Linear Momentum & Impulse', short: 'Momentum',
  blurb: 'Momentum is always conserved; kinetic energy only sometimes. Collide gliders, set off explosions, and turn impulse into a force–time graph.',
  outcomes: [
    ['1.7.1', 'define linear momentum', 'collide'],
    ['1.7.2', 'state the principle of conservation of linear momentum', 'collide'],
    ['1.7.3', 'apply the principle of conservation of linear momentum to collisions and explosions in one dimension', 'collide'],
    ['1.7.4', 'distinguish between elastic and inelastic collisions', 'collide'],
    ['1.7.5', 'define impulse as the change in momentum and recall and use impulse = FΔt, including the area under a force–time graph', 'impulse'],
  ],
  labs: [
    { id: 'collide', title: 'Air-track collisions', hint: 'Σp before = Σp after', spec: ['1.7.1', '1.7.2', '1.7.3', '1.7.4'], mount: mountCollide },
    { id: 'impulse', title: 'Impulse & crumple zones', hint: 'area under F–t', spec: ['1.7.5'], mount: mountImpulse },
  ],
  equations: [['p = mv', ''], ['m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2', ''], ['F\\Delta t = \\Delta p', 'impulse'], ['F = \\frac{\\Delta p}{\\Delta t}', '']],
  traps: ['Momentum is a vector: give a sign to every velocity before you add.', 'Momentum is conserved only if <b>no external resultant force</b> acts.', 'Inelastic ≠ “stick together”: sticking together is the <i>perfectly</i> inelastic case.', 'Energy is always conserved; <b>kinetic</b> energy is only conserved in elastic collisions.', 'For a rebound, Δp = m(u + v) using magnitudes.'],
  notes: [
    ['Momentum', 'Linear momentum = mass × velocity, p = mv. Vector; unit kg m s⁻¹ (= N s).'],
    ['Conservation of linear momentum', 'The total momentum of a system remains constant provided no resultant external force acts on the system. Applies to all collisions and explosions.'],
    ['Elastic and inelastic', 'Elastic: total kinetic energy conserved. Inelastic: total kinetic energy decreases (converted to internal energy, sound, deformation). Perfectly inelastic: objects coalesce.'],
    ['Explosions', 'Objects initially at rest have zero total momentum, so after the explosion the momenta are equal and opposite: m₁v₁ = −m₂v₂. Kinetic energy increases (from chemical or elastic potential energy).'],
    ['Impulse', 'Impulse = FΔt = change in momentum. For a varying force it is the area under the force–time graph. Increasing contact time reduces the average force for the same Δp: crumple zones, airbags, bending your knees on landing.'],
  ],
  mini(c, w, h, t, C) {
    const T = 3, tt = t % T, gy = h * 0.66, x1 = tt < 1.5 ? 20 + tt * (w * 0.3) : 20 + 1.5 * w * 0.3 - (tt - 1.5) * w * 0.05, x2 = tt < 1.5 ? w * 0.72 : w * 0.72 + (tt - 1.5) * w * 0.2;
    line(c, [[8, gy], [w - 8, gy]], { color: C.ink2, width: 2 }); c.fillStyle = C.blue; c.fillRect(x1, gy - 24, 34, 24); c.fillStyle = C.red; c.fillRect(Math.max(x2, x1 + 34), gy - 18, 24, 18);
  },
});
})();

/* ================= 1.8 Work done, potential and kinetic energy ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: energy skate track ---------- */
function mountTrack(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 500, mobileAspect: 1.05 });
  const shapes = {
    bowl: x => 2.6 * (2 * x - 1) ** 2 + 0.1,
    hill: x => 2.2 * (1 - x) ** 2 + 0.9 * Math.exp(-(((x - 0.62) / 0.1) ** 2)) + 0.05,
    double: x => 1.6 + 1.2 * Math.cos(x * TAU * 1.5) * (1 - x * 0.6) - 0.4 * x,
  };
  let shape = 'bowl', m = 60, mu = 0, s = 0.08, vs = 0, thermal = 0, E0 = 0;
  const LEN = 12; // metres of horizontal track
  const hOf = x => shapes[shape](clamp(x, 0, 1)) * 2; // metres
  const slope = x => (hOf(x + 1e-4) - hOf(x - 1e-4)) / (2e-4 * LEN);
  function reset(x0) { s = x0 ?? s; vs = 0; thermal = 0; E0 = m * G * hOf(s); }
  reset(0.08);
  let drag = false;
  const geo = () => { const W = S.w, H = S.h, pad = 30, sx = (W * 0.72 - 2 * pad) / LEN, hmax = 6, sy = (H - 80) / hmax; return { X: x => pad + x * LEN * sx, Y: h => H - 30 - h * sy, ix: px => (px - pad) / (LEN * sx) }; };
  Pointer(S, { hit: (px, py) => { const g = geo(); return hyp(px - g.X(s), py - g.Y(hOf(s)) + 14) < 30 ? 'b' : null; }, down: () => drag = true, up: () => { drag = false; reset(); }, move: (_, px) => { const g = geo(); s = clamp(g.ix(px), 0.01, 0.99); vs = 0; } });
  L.loop(dt => {
    if (!drag) {
      const n = 20, h = dt / n;
      for (let i = 0; i < n; i++) {
        const sl = slope(s), cos = 1 / Math.sqrt(1 + sl * sl), sin = sl * cos;
        const v = vs * Math.sqrt(1 + sl * sl) * LEN; // along-track speed m/s (vs = dx/dt in units of LEN)
        let a = -G * sin; const fr = mu * G * cos; if (Math.abs(v) > 1e-3) a -= Math.sign(v) * fr; else if (Math.abs(G * sin) < fr) a = 0;
        let vn = v + a * h; if (v !== 0 && Math.sign(vn) !== Math.sign(v) && Math.abs(G * sin) < fr) vn = 0;
        thermal += fr * m * Math.abs(v) * h;
        vs = vn / (Math.sqrt(1 + sl * sl) * LEN); s += vs * h;
        if (s <= 0.002) { s = 0.002; vs = Math.abs(vs) * 0; } if (s >= 0.998) { s = 0.998; vs = 0; }
      }
    }
    const sl = slope(s), v = vs * Math.sqrt(1 + sl * sl) * LEN, h0 = hOf(s), Ek = 0.5 * m * v * v, Ep = m * G * h0;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, g = geo();
    // track
    const pts = []; for (let k = 0; k <= 200; k++) pts.push([g.X(k / 200), g.Y(hOf(k / 200))]);
    c.beginPath(); c.moveTo(pts[0][0], H); pts.forEach(p => c.lineTo(p[0], p[1])); c.lineTo(pts[pts.length - 1][0], H); c.closePath(); c.fillStyle = alpha(C.ink2, .12); c.fill();
    line(c, pts, { color: C.ink, width: 3 });
    for (let hh = 1; hh <= 5; hh++) { line(c, [[g.X(0), g.Y(hh)], [g.X(0) + 10, g.Y(hh)]], { color: C.muted, width: 1 }); rich(c, `${hh} m`, g.X(0) + 12, g.Y(hh), { size: 10, mono: true, color: C.muted }); }
    // skater
    const bx = g.X(s), by = g.Y(h0), ang = Math.atan(-sl * (g.Y(1) - g.Y(0)) / (g.X(1 / LEN) - g.X(0)) * -1);
    c.save(); c.translate(bx, by); c.rotate(Math.atan2(g.Y(hOf(s + 0.002)) - g.Y(hOf(s - 0.002)), g.X(s + 0.002) - g.X(s - 0.002)));
    c.fillStyle = C.ink2; c.fillRect(-14, -4, 28, 3); c.fillStyle = C.blue; rrect(c, -8, -30, 16, 26, 4); c.fill(); dot(c, 0, -36, 6, C.blue); c.restore();
    if (drag) handle(c, bx, by - 14, C.blue, true);
    // energy bars
    const E = Ek + Ep + thermal, bw = Math.max(14, Math.min(46, (W * 0.28 - 20) / 4 - 10)), bxs = W - 4 * (bw + 10) - 4, bh = H * 0.42, sc2 = bh / Math.max(E0, E, 1);
    const nar = bw < 32; [[Ek, 'KE', C.green], [Ep, nar ? 'GP' : 'GPE', C.blue], [thermal, nar ? 'Q' : 'thermal', C.red], [E, nar ? 'Σ' : 'total', C.ink2]].forEach(([val, lab, col], i) => {
      const x0 = bxs + i * (bw + 10); c.fillStyle = col; c.fillRect(x0, 30 + bh - val * sc2, bw, val * sc2); c.strokeStyle = C.line2; c.strokeRect(x0 + .5, 30.5, bw, bh);
      rich(c, lab, x0 + bw / 2, 30 + bh + 12, { align: 'center', size: 11, color: col, w: 600 }); rich(c, `${num(val / 1000, 2)}`, x0 + bw / 2, 22, { align: 'center', size: 10, mono: true, color: C.muted });
    });
    rich(c, 'energy / kJ', bxs - 8, 22, { align: 'right', size: 10, color: C.muted });
    ro.set('h', `${fix(h0, 2)} m`); ro.set('v', `${fix(Math.abs(v), 2)} m s⁻¹`); ro.set('ek', `${num(Ek, 4)} J`); ro.set('ep', `${num(Ep, 4)} J`); ro.set('th', `${num(thermal, 4)} J`); ro.set('tot', `${num(E, 4)} J`);
  }, [S]);
  const g = Group(P.side, 'Track');
  Seg(g, { options: [['bowl', 'Half-pipe'], ['hill', 'Ski jump'], ['double', 'Double hump']], value: shape, onchange: v => { shape = v; reset(0.04); } });
  Slider(g, { id: 'en-m', label: 'Mass', min: 20, max: 100, step: 5, value: m, unit: 'kg', fmt: v => fix(v, 0), oninput: v => { m = v; reset(); } });
  Slider(g, { id: 'en-mu', label: 'Friction', min: 0, max: 0.15, step: 0.01, value: mu, fmt: v => fix(v, 2), oninput: v => mu = v });
  Btns(g).append(el('button', { type: 'button', class: 'btn pri', onclick: () => reset(0.04) }, '↺ Start from the top'));
  const ro = Readout(Group(P.side, 'Energy'), [['h', 'Height'], ['v', 'Speed'], ['ek', 'Kinetic ½<i>mv</i>²'], ['ep', 'Gravitational <i>mgh</i>'], ['th', 'Thermal (friction)'], ['tot', 'Total', 'hl']]);
  Note(P.side, 'Drag the skater to a new start height. With no friction KE + GPE stays constant, so the skater always returns to the same height. Add friction and the lost energy appears as thermal energy — the total never changes.');
  EqCard(P.below, 'Energy (1.8.2–1.8.4)', [['\\Delta E_p = mg\\Delta h', 'near Earth’s surface'], ['E_k = \\frac{1}{2}mv^2', ''], ['mgh = \\frac{1}{2}mv^2 \\Rightarrow v = \\sqrt{2gh}', 'no friction, from rest'], ['\\text{efficiency} = \\frac{\\text{useful output}}{\\text{total input}}', '× 100%']]);
  Card(P.below, 'Conservation of energy', `<p><b>Principle of conservation of energy:</b> energy cannot be created or destroyed, only transferred from one form to another; the total energy of an isolated system is constant.</p><p>The speed at the bottom of a frictionless slope depends only on the height dropped, not on the mass or the shape of the slope.</p>`);
  Drill(P.below, { title: 'Energy drill', gens: [
    () => { const h = +rand(0.5, 40).toFixed(1); return { q: `An object slides from rest down a frictionless slope, dropping <b>${h} m</b> vertically. Find its speed at the bottom.`, a: Math.sqrt(2 * G * h), unit: 'm s⁻¹', steps: ['mgh = ½mv² ⇒ v = √(2gh)', `= √(2×9.81×${h}) = ${fix(Math.sqrt(2 * G * h), 2)} m s⁻¹`] }; },
    () => { const m2 = randi(1, 90), v = randi(2, 30); return { q: `Find the kinetic energy of a <b>${m2} kg</b> object moving at <b>${v} m s⁻¹</b>.`, a: 0.5 * m2 * v * v, unit: 'J', steps: ['Eₖ = ½mv²', `= ½×${m2}×${v}² = ${fix(0.5 * m2 * v * v, 0)} J`] }; },
    () => { const m2 = randi(40, 90), h = randi(3, 30), v = +(Math.sqrt(2 * G * h) * rand(0.6, 0.9)).toFixed(1); const lost = m2 * G * h - 0.5 * m2 * v * v; return { q: `A <b>${m2} kg</b> child slides down a <b>${h} m</b> high slide, reaching <b>${v} m s⁻¹</b>. How much energy was transferred to heat?`, a: lost, unit: 'J', steps: [`GPE lost = mgh = ${fix(m2 * G * h, 0)} J`, `KE gained = ½mv² = ${fix(0.5 * m2 * v * v, 0)} J`, `thermal = ${fix(lost, 0)} J`] }; },
  ] });
}

/* ---------- Lab B: work & power ---------- */
function mountWork(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.2, minH: 300, maxH: 440, mobileAspect: 1.1 });
  let F = 120, ang = 30, m = 30, mu = 0.25, x = 0, v = 0, t = 0, Wf = 0, Wfr = 0, mode = 'pull', load = 50, eff = 0.7, Pin = 600, hL = 0;
  L.loop(dt => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    if (mode === 'pull') {
      const Fx = F * Math.cos(ang * DEG), Fy = F * Math.sin(ang * DEG), N = Math.max(0, m * G - Fy), fr = mu * N;
      const net = v > 1e-4 ? Fx - fr : Math.max(0, Fx - fr), a = net / m;
      const dx = v * dt + 0.5 * a * dt * dt; v = Math.max(0, v + a * dt); x += dx; t += dt; Wf += Fx * dx; Wfr += fr * dx;
      if (x > 20) { x = 0; v = 0; t = 0; Wf = 0; Wfr = 0; }
      const gy = H * 0.72, sc = (W - 100) / 20, bx = 50 + x * sc;
      line(c, [[10, gy], [W - 10, gy]], { color: C.ink2, width: 2 }); for (let k = 0; k <= 20; k += 2) rich(c, `${k} m`, 50 + k * sc, gy + 14, { align: 'center', size: 10, mono: true, color: C.muted });
      c.fillStyle = C.orange; c.fillRect(bx - 34, gy - 50, 68, 50); rich(c, `${m} kg`, bx, gy - 25, { align: 'center', size: 12, color: C.paper2, w: 600 });
      const k = 0.9, ox = bx + 34, oy = gy - 40; arrow(c, ox, oy, ox + F * k * Math.cos(ang * DEG), oy - F * k * Math.sin(ang * DEG), { color: C.blue, width: 3 });
      line(c, [[ox, oy], [ox + F * k * Math.cos(ang * DEG), oy]], { color: alpha(C.blue, .6), width: 1.5, dash: [4, 4] });
      rich(c, `*F* = ${F} N at ${ang}°`, ox + F * k * Math.cos(ang * DEG) + 6, oy - F * k * Math.sin(ang * DEG), { size: 12, w: 600, color: C.blue });
      rich(c, `*F* cos *θ* = ${fix(Fx, 1)} N`, ox + 8, oy + 14, { size: 11.5, color: C.blue });
      if (fr > 0) arrow(c, bx - 34, gy - 6, bx - 34 - fr * k, gy - 6, { color: C.red, width: 2.6 });
      rich(c, `work by *F* = *Fs* cos *θ* = ${fix(Wf, 0)} J · against friction ${fix(Wfr, 0)} J · KE ${fix(0.5 * m * v * v, 0)} J`, W / 2, 26, { align: 'center', size: 12.5, w: 600, color: C.ink2 });
      ro.set('W', `${fix(Wf, 1)} J`); ro.set('s', `${fix(x, 2)} m`); ro.set('P', `${fix(Fx * v, 1)} W`); ro.set('Pa', t > 0.1 ? `${fix(Wf / t, 1)} W` : '—'); ro.set('eta', '—');
    } else {
      // motor lifting a load: useful power = mgv
      const Pout = Pin * eff, vL = Pout / (load * G); hL += vL * dt; if (hL > 8) hL = 0;
      const mx = W * 0.3, top = 40, sc = (H - 110) / 8, ly = H - 50 - hL * sc;
      c.fillStyle = C.ink2; c.fillRect(mx - 60, top - 20, 120, 20); c.fillStyle = C.violet; rrect(c, mx - 30, top, 60, 34, 6); c.fill(); rich(c, 'motor', mx, top + 17, { align: 'center', size: 12, color: C.paper2, w: 600 });
      line(c, [[mx, top + 34], [mx, ly - 30]], { color: C.ink, width: 1.6 }); c.fillStyle = C.orange; c.fillRect(mx - 26, ly - 30, 52, 30); rich(c, `${load} kg`, mx, ly - 15, { align: 'center', size: 12, color: C.paper2, w: 600 });
      line(c, [[mx - 80, H - 50], [mx + 80, H - 50]], { color: C.ink2, width: 2 }); rich(c, `*h* = ${fix(hL, 2)} m`, mx + 40, ly - 15, { size: 12, color: C.ink2 });
      // Sankey-ish
      const sx = W * 0.58, sy = H * 0.35, sw = W * 0.34, th = 60;
      c.fillStyle = alpha(C.blue, .8); c.fillRect(sx, sy, sw * 0.35, th);
      c.fillStyle = alpha(C.green, .8); c.beginPath(); c.moveTo(sx + sw * 0.35, sy); c.lineTo(sx + sw, sy); c.lineTo(sx + sw, sy + th * eff); c.lineTo(sx + sw * 0.35, sy + th * eff); c.fill();
      c.fillStyle = alpha(C.red, .7); c.beginPath(); c.moveTo(sx + sw * 0.35, sy + th * eff); c.lineTo(sx + sw * 0.55, sy + th * eff); c.lineTo(sx + sw * 0.62, sy + th + 60); c.lineTo(sx + sw * 0.62 - th * (1 - eff), sy + th + 60); c.lineTo(sx + sw * 0.35, sy + th); c.fill();
      rich(c, `electrical in ${Pin} W`, sx, sy - 12, { size: 12, color: C.blue, w: 600 }); rich(c, `useful: GPE ${fix(Pout, 0)} W`, sx + sw, sy - 12, { align: 'right', size: 12, color: C.green, w: 600 }); rich(c, `wasted: heat, sound ${fix(Pin - Pout, 0)} W`, sx + sw * 0.62, sy + th + 74, { align: 'center', size: 12, color: C.red, w: 600 });
      ro.set('W', `${fix(load * G * hL, 0)} J (useful)`); ro.set('s', `${fix(hL, 2)} m`); ro.set('P', `${fix(Pout, 0)} W = mgv`); ro.set('Pa', `${fix(vL, 3)} m s⁻¹`); ro.set('eta', `${fix(eff * 100, 0)}%`);
    }
  }, [S]);
  const g = Group(P.side, 'Scenario');
  Seg(g, { options: [['pull', 'Pull a crate'], ['motor', 'Motor & efficiency']], value: mode, onchange: v => { mode = v; gp.hidden = v !== 'pull'; gm.hidden = v !== 'motor'; } });
  const gp = el('div', { class: 'grp' }); P.side.append(gp);
  Slider(gp, { id: 'wk-F', label: 'Pulling force <i>F</i>', min: 0, max: 250, step: 5, value: F, unit: 'N', fmt: v => fix(v, 0), oninput: v => F = v });
  Slider(gp, { id: 'wk-a', label: 'Angle <i>θ</i> to horizontal', min: 0, max: 80, step: 5, value: ang, unit: '°', fmt: v => fix(v, 0), oninput: v => ang = v });
  Slider(gp, { id: 'wk-mu', label: 'Friction coefficient', min: 0, max: 0.6, step: 0.05, value: mu, fmt: v => fix(v, 2), oninput: v => mu = v });
  Btns(gp).append(el('button', { type: 'button', class: 'btn', onclick: () => { x = 0; v = 0; t = 0; Wf = 0; Wfr = 0; } }, 'Reset'));
  const gm = el('div', { class: 'grp' }); gm.hidden = true; P.side.append(gm);
  Slider(gm, { id: 'wk-P', label: 'Electrical power in', min: 100, max: 2000, step: 50, value: Pin, unit: 'W', fmt: v => fix(v, 0), oninput: v => Pin = v });
  Slider(gm, { id: 'wk-e', label: 'Efficiency', min: 0.1, max: 1, step: 0.05, value: eff, fmt: v => Math.round(v * 100) + '%', oninput: v => eff = v });
  Slider(gm, { id: 'wk-L', label: 'Load', min: 10, max: 200, step: 10, value: load, unit: 'kg', fmt: v => fix(v, 0), oninput: v => load = v });
  const ro = Readout(Group(P.side, 'Live'), [['W', 'Work done'], ['s', 'Distance'], ['P', 'Power now', 'hl'], ['Pa', 'Average power · or lift speed'], ['eta', 'Efficiency']]);
  Note(P.side, 'Only the component of force <b>in the direction of motion</b> does work. Pull at 90° and you do no work at all on the crate’s motion.');
  EqCard(P.below, 'Work and power (1.8.1, 1.8.5)', [['W = Fs\\cos\\theta', 'θ between force and displacement'], ['P = \\frac{W}{t} = \\frac{\\Delta E}{t}', 'watt = J s⁻¹'], ['P = Fv', 'constant force at constant speed']]);
  Card(P.below, 'Definitions', list(['<b>Work done</b> by a force is the product of the force and the distance moved in the direction of the force. 1 J = 1 N m.', '<b>Power</b> is the rate of doing work (rate of energy transfer). 1 W = 1 J s⁻¹.', '<b>Efficiency</b> = useful energy (or power) output ÷ total energy (or power) input.']));
  Drill(P.below, { title: 'Work & power drill', gens: [
    () => { const F2 = randi(20, 300), s = randi(2, 50), a = pick([0, 20, 30, 45, 60]); return { q: `A force of <b>${F2} N</b> acts at <b>${a}°</b> to the direction of motion while an object moves <b>${s} m</b>. Find the work done by the force.`, a: F2 * s * Math.cos(a * DEG), unit: 'J', steps: ['W = Fs cos θ', `= ${F2} × ${s} × cos ${a}° = ${fix(F2 * s * Math.cos(a * DEG), 1)} J`] }; },
    () => { const m2 = randi(50, 900), h = randi(2, 30), tt = randi(4, 60); return { q: `A crane lifts a <b>${m2} kg</b> load <b>${h} m</b> in <b>${tt} s</b>. What is its useful power output?`, a: m2 * G * h / tt, unit: 'W', steps: [`ΔEp = mgh = ${fix(m2 * G * h, 0)} J`, `P = E/t = ${fix(m2 * G * h / tt, 1)} W`] }; },
    () => { const F2 = randi(500, 5000), v = randi(5, 35); return { q: `A car’s engine provides a driving force of <b>${F2} N</b> at a constant <b>${v} m s⁻¹</b>. Find the power.`, a: F2 * v, unit: 'W', steps: ['P = Fv', `= ${F2} × ${v} = ${F2 * v} W`] }; },
    () => { const Pin2 = randi(200, 2000), m2 = randi(10, 100), h = randi(2, 12), tt = randi(5, 40); const e = m2 * G * h / tt / Pin2 * 100; return e > 100 ? { q: 'Efficiency can never exceed…', options: ['100%', '50%', '1', '1000%'], correct: 0, why: 'Useful output can’t exceed input.' } : { q: `A <b>${Pin2} W</b> motor lifts <b>${m2} kg</b> through <b>${h} m</b> in <b>${tt} s</b>. Find its efficiency as a percentage.`, a: e, unit: '%', steps: [`useful power = mgh/t = ${fix(m2 * G * h / tt, 1)} W`, `efficiency = ${fix(m2 * G * h / tt, 1)}/${Pin2} × 100 = ${fix(e, 1)}%`] }; },
  ] });
}

topic({
  id: 'energy-work', code: '1.8', unit: 'AS 1', title: 'Work, Energy & Power', short: 'Work & energy',
  blurb: 'Work = force × distance in the direction of the force. Swap KE and GPE on a skate track, then measure power and efficiency.',
  outcomes: [
    ['1.8.1', 'define work done, potential energy, kinetic energy, efficiency and power, and recall and use W = Fx cos θ', 'work'],
    ['1.8.2', 'recall and use ΔEp = mgΔh for the change in gravitational potential energy', 'track'],
    ['1.8.3', 'recall and use Ek = ½mv² for kinetic energy', 'track'],
    ['1.8.4', 'state and apply the principle of conservation of energy, including examples of energy transfer', 'track'],
    ['1.8.5', 'recall and use P = W/t, P = Fv and efficiency = useful output / total input', 'work'],
  ],
  labs: [
    { id: 'track', title: 'Energy skate track', hint: 'KE ⇄ GPE', spec: ['1.8.2', '1.8.3', '1.8.4'], mount: mountTrack },
    { id: 'work', title: 'Work, power & efficiency', hint: 'W = Fs cos θ', spec: ['1.8.1', '1.8.5'], mount: mountWork },
  ],
  equations: [['W = Fx\\cos\\theta', ''], ['\\Delta E_p = mg\\Delta h', ''], ['E_k = \\frac{1}{2}mv^2', ''], ['P = \\frac{W}{t} = Fv', ''], ['\\text{efficiency} = \\frac{\\text{useful out}}{\\text{total in}}', '']],
  traps: ['θ in W = Fs cos θ is the angle between the force and the <b>displacement</b>.', 'Weight does no work on horizontal motion; a normal force does no work.', 'Square the speed in ½mv² — and doubling speed quadruples KE.', 'Efficiency has no unit and is never above 100%.', 'P = Fv needs the force in the direction of the velocity.'],
  notes: [
    ['Work', 'Work done = force × distance moved in the direction of the force, W = Fx cos θ. Unit joule (1 J = 1 N m). Work done = energy transferred.'],
    ['Potential and kinetic energy', 'Gravitational potential energy change ΔEp = mgΔh (uniform field). Kinetic energy Ek = ½mv² — the work done to accelerate the mass from rest to v.'],
    ['Conservation of energy', 'Energy cannot be created or destroyed; it is transferred between stores. In a frictionless fall, loss of GPE = gain in KE. With friction, the “missing” energy is thermal energy in the surroundings.'],
    ['Power and efficiency', 'Power = rate of doing work = W/t; for a constant force at constant velocity P = Fv. Efficiency = useful energy output ÷ total energy input (often × 100%).'],
  ],
  mini(c, w, h, t, C) {
    const f = x => h * 0.25 + h * 0.5 * (1 - Math.cos(x * TAU)) / 2 * 0 + h * 0.55 * (2 * (x - 0.5)) ** 2;
    const pts = []; for (let k = 0; k <= 40; k++) pts.push([12 + k / 40 * (w - 24), h - 12 - (h * 0.7) * (2 * (k / 40 - 0.5)) ** 2 - 6]); line(c, pts, { color: C.ink, width: 2.4 });
    const x = 0.5 + 0.42 * Math.cos(t * 1.6); dot(c, 12 + x * (w - 24), h - 18 - (h * 0.7) * (2 * (x - 0.5)) ** 2 - 6, 6, C.blue);
    const ke = 1 - (2 * (x - 0.5) / 0.84) ** 2; c.fillStyle = C.green; c.fillRect(w - 40, h - 12 - ke * 50, 10, ke * 50); c.fillStyle = C.blue; c.fillRect(w - 26, h - 12 - (1 - ke) * 50, 10, (1 - ke) * 50);
  },
});
})();

/* ================= 1.9 Electric current and charge ================= */
(() => {
const E_CH = 1.6e-19;

function mountCharge(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 400, mobileAspect: 1.2 });
  const S2 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, plain: true });
  let V = 6, R = 12, closed = true, mode = 'steady', t = 0, Q = 0, hist = [], ph = 0, show = 'both';
  const plot = new Plot(S2, { xlabel: 'time *t* / s', ylabel: 'current *I* / A', xmin: 0, xmax: 20, ymin: 0 });
  L.loop(dt => {
    const I = !closed ? 0 : mode === 'steady' ? V / R : V / R * Math.exp(-t / 6);
    t += dt; if (t > 20) { t = 0; Q = 0; hist = []; } Q += I * dt; hist.push([t, I]);
    ph += I * dt * 0.12;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const x0 = W * 0.12, x1 = W * 0.88, y0 = H * 0.2, y1 = H * 0.8;
    comp(c, 'battery', x0, y1, x0, y0, { label: `${V} V`, side: 1 });
    comp(c, 'switch', x0, y0, (x0 + x1) / 2, y0, { closed, label: closed ? 'switch closed' : 'switch open', side: -1 });
    comp(c, 'ammeter', (x0 + x1) / 2, y0, x1, y0);
    comp(c, 'resistor', x1, y0, x1, y1, { label: `${R} Ω`, side: -1 });
    comp(c, 'wire', x1, y1, x0, y1);
    meter(c, (x0 + x1) * 0.75, y0 - 26, `${fix(I, 3)} A`, { color: C.blue });
    const loop = [[x0, y1], [x0, y0], [x1, y0], [x1, y1]];
    if (show !== 'conv') flowDots(c, loop, -ph, 40, C.cyan, 2.6);  // electrons flow − to +
    // conventional current arrows
    if (show !== 'elec' && closed) { arrow(c, x0 + (x1 - x0) * 0.25, y0 + 18, x0 + (x1 - x0) * 0.25 + 40, y0 + 18, { color: C.red, width: 2 }); rich(c, 'conventional current (+ → −)', x0 + (x1 - x0) * 0.25, y0 + 34, { size: 11, color: C.red }); arrow(c, x1 - 60, y1 - 18, x1 - 100, y1 - 18, { color: C.cyan, width: 2 }); rich(c, 'electron flow (− → +)', x1 - 104, y1 - 34, { align: 'right', size: 11, color: C.cyan }); }
    // cross-section counter
    const cx = (x0 + x1) / 2, cy = y1; c.strokeStyle = C.violet; c.lineWidth = 1.5; c.setLineDash([3, 3]); c.beginPath(); c.ellipse(cx, cy, 6, 16, 0, 0, TAU); c.stroke(); c.setLineDash([]);
    rich(c, `charge through here: ${fix(Q, 2)} C = ${sci(Q / E_CH, 3)} electrons`, cx, cy + 30, { align: 'center', size: 12, color: C.violet, w: 600 });
    S2.begin(); plot.ymax = Math.max(0.2, V / R * 1.25); plot.axes();
    plot.area(hist.map(h => h), alpha(C.violet, .2)); plot.curve(hist, { color: C.blue, width: 2.4 });
    plot.label(10, plot.ymax * 0.85, `area under *I*–*t* = charge = ${fix(Q, 2)} C`, { align: 'center', size: 12.5, w: 600, color: C.violet });
    ro.set('I', `${fix(I, 3)} A`); ro.set('t', `${fix(t, 1)} s`); ro.set('Q', `${fix(Q, 3)} C`); ro.set('n', sci(Q / E_CH, 3)); ro.set('rate', `${sci(I / E_CH, 3)} s⁻¹`);
  }, [S1, S2]);
  const g = Group(P.side, 'Circuit');
  Slider(g, { id: 'ch-V', label: 'Supply voltage', min: 1, max: 12, step: 0.5, value: V, unit: 'V', fmt: v => fix(v, 1), oninput: v => V = v });
  Slider(g, { id: 'ch-R', label: 'Resistance', min: 2, max: 60, step: 1, value: R, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R = v });
  Seg(g, { label: 'Current', options: [['steady', 'Steady'], ['decay', 'Decaying']], value: mode, onchange: v => { mode = v; t = 0; Q = 0; hist = []; } });
  Seg(g, { label: 'Show', options: [['both', 'Both'], ['elec', 'Electrons'], ['conv', 'Conventional']], value: show, onchange: v => show = v });
  const b = Btns(g); Btn(b, 'Open / close switch', () => closed = !closed, 'pri'); Btn(b, 'Reset count', () => { t = 0; Q = 0; hist = []; });
  const ro = Readout(Group(P.side, 'Counting charge'), [['I', 'Current <i>I</i>', 'hl'], ['t', 'Time <i>t</i>'], ['Q', 'Charge Δ<i>Q</i> = <i>I</i>Δ<i>t</i>'], ['n', 'Electrons passed'], ['rate', 'Electrons per second']]);
  Note(P.side, 'Current is the <b>rate of flow of charge</b>. In a metal the charge carriers are free (delocalised) electrons drifting from − to +; conventional current is drawn from + to −.');
  EqCard(P.below, 'Current and charge (1.9.1–1.9.2)', [['I = \\frac{\\Delta Q}{\\Delta t}', '1 A = 1 C s⁻¹'], ['\\Delta Q = I\\Delta t', 'area under I–t'], ['Q = ne', 'e = 1.6 × 10⁻¹⁹ C']]);
  Card(P.below, 'Charge carriers', list(['<b>Metals:</b> free electrons.', '<b>Electrolytes</b> (and ionised gases): positive and negative ions moving in opposite directions.', '<b>Semiconductors:</b> electrons and holes; the number of carriers rises steeply with temperature.', 'The coulomb is the charge that passes a point when a current of 1 A flows for 1 s.', 'Charge is quantised: any charge is a whole-number multiple of e.']));
  Drill(P.below, { title: 'Charge drill', gens: [
    () => { const I = +rand(0.1, 5).toFixed(2), tm = randi(10, 600); return { q: `A current of <b>${I} A</b> flows for <b>${tm} s</b>. How much charge passes?`, a: I * tm, unit: 'C', steps: ['ΔQ = IΔt', `= ${I} × ${tm} = ${fix(I * tm, 1)} C`] }; },
    () => { const I = +rand(0.01, 3).toFixed(3); return { q: `How many electrons pass a point each second when the current is <b>${I} A</b>?`, a: I / E_CH, unit: '', steps: ['n = Q/e per second = I/e', `= ${I}/1.6×10⁻¹⁹ = ${sci(I / E_CH, 3)}`] }; },
    () => { const Q2 = randi(5, 900), tm = randi(5, 300); return { q: `<b>${Q2} C</b> of charge flows in <b>${tm} s</b>. Find the average current.`, a: Q2 / tm, unit: 'A', steps: ['I = ΔQ/Δt', `= ${Q2}/${tm} = ${fix(Q2 / tm, 3)} A`] }; },
    () => { const I0 = randi(2, 8), tm = randi(4, 20); return { q: `A current falls uniformly from <b>${I0} A</b> to zero in <b>${tm} s</b>. How much charge flows?`, a: 0.5 * I0 * tm, unit: 'C', steps: ['Charge = area under the I–t graph (a triangle)', `= ½ × ${tm} × ${I0} = ${fix(0.5 * I0 * tm, 1)} C`] }; },
  ] });
}

topic({
  id: 'current', code: '1.9', unit: 'AS 1', title: 'Electric Current & Charge', short: 'Current',
  blurb: 'Current is the rate of flow of charge. Count electrons crossing a wire and turn an I–t graph into coulombs.',
  outcomes: [
    ['1.9.1', 'demonstrate an understanding that electric current is the rate of flow of charged particles', 'charge'],
    ['1.9.2', 'recall and use the equation ΔQ = IΔt', 'charge'],
  ],
  labs: [{ id: 'charge', title: 'Counting charge', hint: 'ΔQ = IΔt', spec: ['1.9.1', '1.9.2'], mount: mountCharge }],
  equations: [['I = \\frac{\\Delta Q}{\\Delta t}', ''], ['Q = ne', '']],
  traps: ['Conventional current flows + → −; electrons flow − → +.', 'Time must be in <b>seconds</b> (convert minutes/hours).', 'For a changing current, charge = area under the I–t graph, not I × t with one value.', 'mA and µA: 1 mA = 10⁻³ A.'],
  notes: [
    ['Electric current', 'Electric current is the rate of flow of charge: I = ΔQ/Δt. Unit ampere (A), a base unit.'],
    ['The coulomb', 'One coulomb is the charge passing a point when a current of one ampere flows for one second (1 C = 1 A s).'],
    ['Charge carriers', 'In metals: free electrons. In electrolytes: positive and negative ions. The electron charge e = 1.6 × 10⁻¹⁹ C; all charges are multiples of e.'],
    ['Conventional current', 'Drawn from the positive to the negative terminal outside the supply — opposite to the actual electron flow in a metal.'],
  ],
  mini(c, w, h, t, C) {
    const pts = [[20, h - 20], [20, 20], [w - 20, 20], [w - 20, h - 20]];
    line(c, [[20, h * 0.35], [20, 20], [w - 20, 20], [w - 20, h - 20], [20, h - 20], [20, h * 0.65]], { color: C.ink2, width: 2 }); comp(c, 'cell', 20, h * 0.65, 20, h * 0.35, { size: 26 }); flowDots(c, pts, -t * 0.08, 26, C.cyan, 2.4);
  },
});
})();

/* ================= 1.10 Potential difference and electromotive force ================= */
(() => {

function mountEnergy(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1.05 });
  let E = 12, R1 = 4, R2 = 8, R3 = 12, mode = 'series', ph = 0;
  L.loop(dt => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, wide = W > 620;
    const x0 = W * 0.1, x1 = wide ? W * 0.62 : W * 0.9, y0 = H * 0.2, y1 = H * 0.78;
    let I, V1, V2, V3 = 0, Rt;
    if (mode === 'series') { Rt = R1 + R2; I = E / Rt; V1 = I * R1; V2 = I * R2; }
    else { const Rp = 1 / (1 / R2 + 1 / R3); Rt = R1 + Rp; I = E / Rt; V1 = I * R1; V2 = I * Rp; V3 = V2; }
    ph += I * dt * 0.1;
    comp(c, 'battery', x0, y1, x0, y0, { label: `emf ${E} V`, side: 1 });
    const xm = (x0 + x1) / 2;
    comp(c, 'resistor', x0, y0, xm, y0, { label: `*R*₁ = ${R1} Ω`, fill: alpha(C.orange, .25) });
    comp(c, 'wire', xm, y0, x1, y0);
    if (mode === 'series') { comp(c, 'resistor', x1, y0, x1, y1, { label: `*R*₂ = ${R2} Ω`, side: -1, fill: alpha(C.orange, .25) }); }
    else {
      const xa = x1 - 50, xb = x1 + 20; comp(c, 'wire', x1, y0, xa, y0); comp(c, 'wire', x1, y0, xb, y0);
      comp(c, 'resistor', xa, y0, xa, y1, { label: `*R*₂ ${R2} Ω`, side: 1, fill: alpha(C.orange, .25) }); comp(c, 'resistor', xb, y0, xb, y1, { label: `*R*₃ ${R3} Ω`, side: -1, fill: alpha(C.orange, .25) });
      comp(c, 'wire', xa, y1, xb, y1);
    }
    comp(c, 'wire', x1, y1, x0, y1);
    // voltmeters
    meter(c, (x0 + xm) / 2, y0 - 34, `${fix(V1, 2)} V`, { color: C.violet }); rich(c, 'V across *R*₁', (x0 + xm) / 2, y0 - 54, { align: 'center', size: 11, color: C.violet });
    if (mode === 'series') meter(c, x1 + 40, (y0 + y1) / 2 + 30, `${fix(V2, 2)} V`, { color: C.violet }); else meter(c, x1 - 15, y1 + 26, `${fix(V2, 2)} V across both`, { color: C.violet });
    meter(c, (x0 + xm) / 2 + 20, y1 + 26, `I = ${fix(I, 3)} A`, { color: C.blue });
    // charges carrying energy: colour by potential
    const loop = [[x0, y1], [x0, y0], [mode === 'series' ? x1 : x1 - 50, y0], [mode === 'series' ? x1 : x1 - 50, y1]];
    const seg = [], tot = []; let Ltot = 0; for (let i = 0; i < loop.length; i++) { const p = loop[i], q = loop[(i + 1) % loop.length]; const l = hyp(q[0] - p[0], q[1] - p[1]); seg.push([p, q, l, Ltot]); Ltot += l; }
    const n = 34;
    for (let k = 0; k < n; k++) {
      let d = ((k / n + ph) % 1) * Ltot, pt;
      for (const [p, q, l] of seg) { if (d <= l) { pt = [p[0] + (q[0] - p[0]) * d / l, p[1] + (q[1] - p[1]) * d / l]; break; } d -= l; }
      const px = pt[0], py = pt[1], xr = loop[2][0], mid = (y0 + y1) / 2, rc = (x0 + xm) / 2; let pot = 0;
      if (Math.abs(px - x0) < 1) pot = py < mid ? E : 0;
      else if (Math.abs(py - y0) < 1) pot = E - V1 * clamp((px - (rc - 17)) / 34, 0, 1);
      else if (Math.abs(px - xr) < 1) pot = (E - V1) * (1 - clamp((py - (mid - 17)) / 34, 0, 1));
      const f = clamp(pot / E, 0, 1);
      dot(c, px, py, 3.6, `rgba(${Math.round(255 * f)},${Math.round(120 + 60 * f)},${Math.round(255 * (1 - f))},0.95)`);
    }
    // energy per coulomb panel
    if (wide) {
      const bx = W * 0.72, by = y0, bh = y1 - y0, bw = W * 0.22, sc = bh / E;
      rich(c, 'energy per coulomb (J C⁻¹ = V)', bx + bw / 2, by - 16, { align: 'center', size: 11.5, color: C.ink2, w: 600 });
      c.fillStyle = alpha(C.green, .7); c.fillRect(bx, by, bw * 0.3, bh); rich(c, `gained ${E}`, bx + bw * 0.15, by + bh + 14, { align: 'center', size: 11, color: C.green });
      c.fillStyle = alpha(C.orange, .8); c.fillRect(bx + bw * 0.4, by, bw * 0.25, V1 * sc); c.fillStyle = alpha(C.red, .7); c.fillRect(bx + bw * 0.4, by + V1 * sc, bw * 0.25, V2 * sc);
      rich(c, `${fix(V1, 1)} in R₁`, bx + bw * 0.7, by + V1 * sc / 2, { size: 11, color: C.orange }); rich(c, `${fix(V2, 1)} in ${mode === 'series' ? 'R₂' : 'R₂||R₃'}`, bx + bw * 0.7, by + V1 * sc + V2 * sc / 2, { size: 11, color: C.red });
      rich(c, 'emf = Σ pd', bx + bw / 2, by + bh + 32, { align: 'center', size: 12, w: 700, color: C.ink });
    }
    rich(c, 'charge colour: red = high potential (lots of energy per coulomb), blue = low', 12, H - 12, { size: 11, color: C.muted });
    ro.set('I', `${fix(I, 3)} A`); ro.set('V1', `${fix(V1, 2)} V`); ro.set('V2', `${fix(V2, 2)} V`); ro.set('P1', `${fix(I * V1, 2)} W`); ro.set('P2', `${fix(mode === 'series' ? I * V2 : V2 * V2 / R2, 2)} W`); ro.set('Pt', `${fix(E * I, 2)} W`);
  }, [S]);
  const g = Group(P.side, 'Circuit');
  Seg(g, { options: [['series', 'R₁ + R₂ in series'], ['par', 'R₂ || R₃']], value: mode, onchange: v => { mode = v; s3.el.hidden = v === 'series'; } });
  Slider(g, { id: 'pd-E', label: 'Battery emf', min: 1.5, max: 24, step: 0.5, value: E, unit: 'V', fmt: v => fix(v, 1), oninput: v => E = v });
  Slider(g, { id: 'pd-R1', label: '<i>R</i>₁', min: 1, max: 30, step: 1, value: R1, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R1 = v });
  Slider(g, { id: 'pd-R2', label: '<i>R</i>₂', min: 1, max: 30, step: 1, value: R2, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R2 = v });
  const s3 = Slider(g, { id: 'pd-R3', label: '<i>R</i>₃', min: 1, max: 30, step: 1, value: R3, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R3 = v }); s3.el.hidden = true;
  const ro = Readout(Group(P.side, 'Readings'), [['I', 'Current from battery'], ['V1', 'pd across <i>R</i>₁'], ['V2', 'pd across <i>R</i>₂'], ['P1', 'Power in <i>R</i>₁'], ['P2', 'Power in <i>R</i>₂'], ['Pt', 'Total power <i>EI</i>', 'hl']]);
  Note(P.side, 'The battery gives each coulomb <b>E</b> joules (emf); each resistor takes some back as heat (pd). Round the loop the gains equal the losses.');
  Card(P.below, 'Definitions (1.10.1)', list(['<b>Potential difference</b> between two points is the work done (energy transferred from electrical to other forms) per unit charge passing between them: <i>V</i> = <i>W</i>/<i>Q</i>.', '<b>Electromotive force</b> of a source is the energy transferred from other forms (chemical, …) to electrical energy per unit charge passing through it: <i>E</i> = <i>W</i>/<i>Q</i>.', '1 volt = 1 joule per coulomb.', 'emf: energy <b>into</b> the circuit; pd: energy <b>out of</b> the circuit.']));
  EqCard(P.below, 'Electrical power (1.10.2)', [['V = \\frac{W}{Q}', ''], ['P = IV', ''], ['P = I^2R', 'use for series (same I)'], ['P = \\frac{V^2}{R}', 'use for parallel (same V)'], ['W = IVt', 'energy transferred']]);
  Drill(P.below, { title: 'pd, emf & power drill', gens: [
    () => { const W2 = randi(10, 900), Q2 = randi(2, 120); return { q: `<b>${W2} J</b> of energy is transferred when <b>${Q2} C</b> of charge passes through a lamp. Find the pd across it.`, a: W2 / Q2, unit: 'V', steps: ['V = W/Q', `= ${W2}/${Q2} = ${fix(W2 / Q2, 2)} V`] }; },
    () => { const I = +rand(0.1, 5).toFixed(2), R = randi(2, 200); return { q: `A current of <b>${I} A</b> flows through a <b>${R} Ω</b> resistor. What power is dissipated?`, a: I * I * R, unit: 'W', steps: ['P = I²R', `= ${I}² × ${R} = ${fix(I * I * R, 2)} W`] }; },
    () => { const V = pick([6, 9, 12, 230]), P2 = pick([3, 6, 24, 36, 60, 100]); return { q: `A lamp is rated <b>${P2} W, ${V} V</b>. Find its resistance when working normally.`, a: V * V / P2, unit: 'Ω', steps: ['P = V²/R ⇒ R = V²/P', `= ${V}²/${P2} = ${fix(V * V / P2, 2)} Ω`] }; },
    () => { const P2 = randi(500, 3000), V = 230, tm = randi(2, 30); return { q: `A <b>${P2} W</b> kettle runs on <b>${V} V</b> for <b>${tm} minutes</b>. How much charge passes through it?`, a: P2 / V * tm * 60, unit: 'C', steps: [`I = P/V = ${fix(P2 / V, 3)} A`, `Q = It = ${fix(P2 / V, 3)} × ${tm * 60} = ${fix(P2 / V * tm * 60, 0)} C`] }; },
  ] });
}

topic({
  id: 'pd', code: '1.10', unit: 'AS 1', title: 'Potential Difference & EMF', short: 'pd & emf',
  blurb: 'Volts are joules per coulomb. Watch charges gain energy in the battery and give it up in each resistor, and compute the power.',
  outcomes: [
    ['1.10.1', 'define potential difference and electromotive force and demonstrate an understanding of the difference between them', 'energy'],
    ['1.10.2', 'recall and use the equations V = W/Q, P = IV, P = I²R and P = V²/R', 'energy'],
  ],
  labs: [{ id: 'energy', title: 'Energy per coulomb', hint: 'emf in, pd out', spec: ['1.10.1', '1.10.2'], mount: mountEnergy }],
  equations: [['V = \\frac{W}{Q}', ''], ['E = \\frac{W}{Q}', 'emf'], ['P = IV = I^2R = \\frac{V^2}{R}', '']],
  traps: ['pd is measured <b>across</b> a component with a voltmeter in parallel.', 'emf is energy converted <b>to</b> electrical per coulomb; pd is energy converted <b>from</b> electrical per coulomb.', 'Choose P = I²R or V²/R depending on what is the same (I in series, V in parallel).', 'Energy (J) vs power (W): multiply power by time in <b>seconds</b>.'],
  notes: [
    ['Potential difference', 'The pd between two points is the energy transferred from electrical energy to other forms per unit charge moving between the points. V = W/Q; 1 V = 1 J C⁻¹.'],
    ['Electromotive force', 'The emf of a source is the energy transferred into electrical energy per unit charge passing through the source. It is not a force.'],
    ['Power', 'P = IV. Combining with V = IR gives P = I²R and P = V²/R. Energy transferred W = IVt.'],
    ['Around a loop', 'The sum of the emfs round any closed loop equals the sum of the pds (conservation of energy, Kirchhoff’s second law). In series the pds share the emf in the ratio of the resistances.'],
  ],
  mini(c, w, h, t, C) {
    const x0 = 24, x1 = w - 24, y0 = 22, y1 = h - 22;
    comp(c, 'cell', x0, y1, x0, y0, { size: 24 }); comp(c, 'resistor', x0, y0, x1, y0, { size: 40 }); comp(c, 'wire', x1, y0, x1, y1); comp(c, 'wire', x1, y1, x0, y1);
    flowDots(c, [[x0, y1], [x0, y0], [x1, y0], [x1, y1]], t * 0.06, 20, C.red, 2.6);
  },
});
})();

/* ================= 1.11 Resistance and resistivity ================= */
(() => {

/* component models: I(V) */
function lampI(V) { const R0 = 2, k = 1.9; let R = R0; for (let i = 0; i < 40; i++) { const P = V * V / R; R = R0 * (1 + k * Math.sqrt(P)); } return V / R; }
function diodeI(V) { const Is = 1e-12, nVt = 1.25 * 0.02585; return Math.min(0.6, Is * (Math.exp(Math.min(V / nVt, 60)) - 1)); }
function thermI(V) { const R25 = 60, B = 3400, th = 18; let T = 298; let R = R25; for (let i = 0; i < 60; i++) { R = R25 * Math.exp(B * (1 / T - 1 / 298)); const P = V * V / R; T = 298 + P * th; } return V / R; }
const MODELS = {
  resistor: { name: 'Fixed resistor (metal at constant temperature)', f: V => V / 15, col: 'blue' },
  lamp: { name: 'Filament lamp', f: lampI, col: 'orange' },
  diode: { name: 'Semiconductor diode', f: diodeI, col: 'red' },
  thermistor: { name: 'NTC thermistor (self-heating)', f: thermI, col: 'violet' },
};

/* ---------- Lab A: I–V characteristics ---------- */
function mountIV(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.3, minH: 240, maxH: 320, mobileAspect: 1.3, tag: 'potential divider circuit' });
  const S2 = L.stage(P.stageBox, { aspect: 1.6, minH: 300, maxH: 460, plain: true });
  let kind = 'lamp', V = 2, pts = [], sweep = false, rev = false;
  const plot = new Plot(S2, { xlabel: 'potential difference *V* / V', ylabel: 'current *I* / A' });
  L.loop(dt => {
    if (sweep) { V += dt * 1.6; if (V > 6) { V = -6; } sv.set(V); if (Math.round(V * 4) !== Math.round((V - dt * 1.6) * 4)) pts.push([V, MODELS[kind].f(V) * (1 + gauss() * 0.01)]); if (V > 5.95 && pts.length > 20) sweep = false; }
    const I = MODELS[kind].f(V), C = Theme.c, c = S1.begin(), W = S1.w, H = S1.h;
    const x0 = W * 0.08, x1 = W * 0.92, y0 = H * 0.24, y1 = H * 0.8, xm = W * 0.5;
    comp(c, 'battery', x0, y1, x0, y0, { label: '±6 V', side: 1 });
    comp(c, 'wire', x0, y0, W * 0.3, y0); comp(c, 'variable', W * 0.3, y0, W * 0.55, y0, { label: 'rheostat as potential divider', size: 60 });
    comp(c, 'wire', W * 0.55, y0, x1, y0);
    comp(c, 'ammeter', x1, y0, x1, (y0 + y1) / 2, { size: 30 });
    comp(c, kind === 'lamp' ? 'lamp' : kind === 'diode' ? 'diode' : kind === 'thermistor' ? 'thermistor' : 'resistor', x1, (y0 + y1) / 2, x1, y1, { glow: kind === 'lamp' ? Math.min(1, Math.abs(V * I) / 3) : 0, size: 30 });
    comp(c, 'wire', x1, y1, x0, y1);
    // voltmeter across component
    const vx = x1 - 70; comp(c, 'wire', x1, (y0 + y1) / 2 + 4, vx, (y0 + y1) / 2 + 4, { width: 1.2 }); comp(c, 'voltmeter', vx, (y0 + y1) / 2 + 4, vx, y1 - 4, { size: 28 }); comp(c, 'wire', vx, y1 - 4, x1, y1 - 4, { width: 1.2 });
    meter(c, x1 - 40, y0 - 22, `${fix(I * 1000, 1)} mA`, { color: C.blue }); meter(c, vx - 50, (y0 + y1) / 2 + 30, `${fix(V, 2)} V`, { color: C.violet });
    if (rev) rich(c, 'supply reversed: negative pd', xm, H - 12, { align: 'center', size: 11.5, color: C.red });
    S2.begin();
    const imax = kind === 'resistor' ? 0.45 : kind === 'lamp' ? 0.75 : kind === 'diode' ? 0.62 : 0.4;
    Object.assign(plot, { xmin: -6.5, xmax: 6.5, ymin: -imax, ymax: imax }); plot.axes();
    const m = MODELS[kind]; plot.curve(x => m.f(x), { color: alpha(C[m.col], .35), width: 2, n: 500, dash: [5, 4] });
    plot.cross(pts, { color: C[m.col], s: 4.5, width: 2 });
    plot.dots([[V, I]], { color: C[m.col], r: 6, stroke: C.paper2 });
    plot.label(-6.2, imax * 0.85, m.name, { size: 12.5, w: 700, color: C[m.col] });
    ro.set('V', `${fix(V, 2)} V`); ro.set('I', `${fix(I * 1000, 2)} mA`); ro.set('R', Math.abs(I) > 1e-6 ? `${num(V / I, 3)} Ω` : '∞ (no current)'); ro.set('P', `${fix(V * I, 3)} W`);
  }, [S1, S2]);
  const g = Group(P.side, 'Component');
  Seg(g, { options: [['resistor', 'Resistor'], ['lamp', 'Lamp'], ['diode', 'Diode'], ['thermistor', 'Thermistor']], value: kind, wrap: true, onchange: v => { kind = v; pts = []; } });
  const sv = Slider(g, { id: 'iv-V', label: 'pd across component', min: -6, max: 6, step: 0.05, value: V, unit: 'V', fmt: v => fix(v, 2), oninput: v => { V = v; sweep = false; rev = v < 0; } });
  const b = Btns(g); Btn(b, 'Record reading', () => pts.push([V, MODELS[kind].f(V) * (1 + gauss() * 0.01)]), 'pri'); Btn(b, '▶ Auto-sweep', () => { pts = []; V = -6; sweep = true; }); Btn(b, 'Clear', () => pts = []);
  const ro = Readout(Group(P.side, 'Meters'), [['V', 'Voltmeter'], ['I', 'Ammeter'], ['R', 'Resistance <i>V</i>/<i>I</i>', 'hl'], ['P', 'Power']]);
  Note(P.side, 'Resistance is <i>V</i>/<i>I</i> at a point — <b>not</b> the gradient. For the lamp the curve flattens because the filament heats up and its resistance rises.');
  Card(P.below, 'The three characteristics (1.11.3)', list(['<b>Metal at constant temperature:</b> straight line through the origin — it obeys Ohm’s law; resistance constant.', '<b>Filament lamp:</b> gradient decreases as <i>V</i> increases. Higher current → hotter filament → ions vibrate with larger amplitude → more collisions with electrons → resistance increases. Symmetrical for ±V.', '<b>Diode:</b> almost no current in reverse bias (very high resistance). In forward bias negligible current until about 0.6 V, then the current rises steeply (resistance falls).', '<b>NTC thermistor:</b> as it heats, more charge carriers are released, so resistance falls and the curve bends upwards.']));
  Card(P.below, 'Method (1.11.4)', list(['Use a potential divider (rheostat across the supply) so the pd can be varied smoothly from zero.', 'Ammeter in series with the component; voltmeter in parallel across it.', 'Take readings of <i>V</i> and <i>I</i> over the range, then reverse the supply connections for negative values.', 'For a diode include a protective resistor in series and use a milliammeter.', 'Switch off between readings so the component doesn’t heat (except for the lamp, where heating is the point).'], true));
  EqCard(P.below, 'Resistance (1.11.1–1.11.2)', [['R = \\frac{V}{I}', 'definition'], ['V \\propto I', 'Ohm’s law: metal at constant temperature']]);
  Drill(P.below, { title: 'I–V drill', gens: [
    () => { const V2 = +rand(1, 12).toFixed(1), I = +rand(0.05, 2).toFixed(2); return { q: `A component has <b>${V2} V</b> across it and a current of <b>${I} A</b>. Find its resistance.`, a: V2 / I, unit: 'Ω', steps: ['R = V/I', `= ${V2}/${I} = ${fix(V2 / I, 2)} Ω`] }; },
    () => ({ q: 'Why does the resistance of a filament lamp increase as the current increases?', options: ['The filament gets hotter so the metal ions vibrate more and electrons collide with them more often', 'More free electrons are released', 'The filament gets longer', 'The current is squared'], correct: 0, why: 'Temperature rises → lattice vibration amplitude increases → more frequent collisions → higher resistance.' }),
    () => ({ q: 'A diode’s I–V graph shows almost zero current for all negative pds. This is because in reverse bias…', options: ['its resistance is very high', 'its resistance is zero', 'it obeys Ohm’s law', 'it is overheating'], correct: 0, why: 'A diode only conducts well in forward bias (above about 0.6 V for silicon).' }),
  ] });
}

/* ---------- Lab B: measuring resistivity ---------- */
function mountResistivity(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.5, minH: 230, maxH: 300, mobileAspect: 1.4 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 250, maxH: 340, plain: true });
  const WIRES = { constantan: 4.9e-7, nichrome: 1.10e-6, copper: 1.7e-8 };
  let mat = 'constantan', dmm = 0.28, len = 0.5, rows = [], drag = false;
  const Aw = () => Math.PI * (dmm / 2000) ** 2, Rof = l => WIRES[mat] * l / Aw() + 0.05; // + contact resistance
  const geo = () => ({ x0: 40, x1: S1.w - 40, y: S1.h * 0.42 });
  Pointer(S1, { hit: (px, py) => { const g = geo(); const cx = g.x0 + len * (g.x1 - g.x0); return Math.abs(px - cx) < 30 && Math.abs(py - g.y) < 40 ? 'c' : null; }, move: (_, px) => { const g = geo(); len = clamp(Math.round((px - g.x0) / (g.x1 - g.x0) * 100) / 100, 0.05, 1); } });
  const plot = new Plot(S2, { xlabel: 'length *l* / m', ylabel: 'resistance *R* / Ω', xmin: 0, xmax: 1.05, ymin: 0 });
  L.loop(() => {
    const R = Rof(len), I = Math.min(0.5, 1.5 / (R + 2)), V = I * R;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, g = geo();
    // metre rule
    c.fillStyle = alpha(C.orange, .18); c.fillRect(g.x0 - 6, g.y + 10, g.x1 - g.x0 + 12, 22); c.strokeStyle = C.line2; c.strokeRect(g.x0 - 6, g.y + 10, g.x1 - g.x0 + 12, 22);
    for (let k = 0; k <= 100; k++) { const x = g.x0 + k / 100 * (g.x1 - g.x0); line(c, [[x, g.y + 10], [x, g.y + 10 + (k % 10 ? 5 : 10)]], { color: C.ink2, width: 1 }); if (k % 10 === 0) rich(c, `${k}`, x, g.y + 26, { align: 'center', size: 9.5, mono: true, color: C.muted }); }
    rich(c, 'cm', g.x1 + 8, g.y + 26, { size: 9.5, color: C.muted });
    line(c, [[g.x0, g.y], [g.x1, g.y]], { color: mat === 'copper' ? C.orange : C.muted, width: 2.2 });
    const cx = g.x0 + len * (g.x1 - g.x0);
    c.fillStyle = C.red; c.fillRect(g.x0 - 8, g.y - 12, 12, 12); c.fillStyle = C.ink; c.fillRect(cx - 5, g.y - 16, 10, 16); handle(c, cx, g.y - 24, C.ink, drag);
    rich(c, 'crocodile clip (drag)', cx, g.y - 40, { align: 'center', size: 11, color: C.ink2 });
    meter(c, W * 0.3, H * 0.84, `V = ${fix(V, 3)} V`, { color: C.violet }); meter(c, W * 0.55, H * 0.84, `I = ${fix(I, 3)} A`, { color: C.blue });
    rich(c, `micrometer: *d* = ${fix(dmm, 2)} mm`, W * 0.8, H * 0.84, { align: 'center', size: 12, color: C.ink2, w: 600 });
    S2.begin(); plot.ymax = Math.max(1, Rof(1) * 1.2); plot.axes();
    let grad = NaN, icpt = 0;
    if (rows.length >= 2) { const n = rows.length, sx = rows.reduce((a, r) => a + r.l, 0), sy = rows.reduce((a, r) => a + r.R, 0), sxy = rows.reduce((a, r) => a + r.l * r.R, 0), sxx = rows.reduce((a, r) => a + r.l * r.l, 0); grad = (n * sxy - sx * sy) / (n * sxx - sx * sx); icpt = (sy - grad * sx) / n; plot.curve(x => grad * x + icpt, { color: C.green, width: 1.6 }); }
    plot.cross(rows.map(r => [r.l, r.R]), { color: C.red, s: 5, width: 2 });
    if (!rows.length) rich(S2.ctx, 'Move the clip, then “Take reading” — six or more lengths', plot.x0 + plot.pw / 2, plot.y0 + plot.ph / 2, { align: 'center', size: 13, color: C.muted });
    ro.set('R', `${fix(R, 3)} Ω`); ro.set('A', `${sci(Aw(), 3)} m²`); ro.set('g', isFinite(grad) ? `${fix(grad, 3)} Ω m⁻¹` : '—'); ro.set('rho', isFinite(grad) ? `${sci(grad * Aw(), 3)} Ω m` : '—'); ro.set('acc', `${sci(WIRES[mat], 2)} Ω m`);
  }, [S1, S2]);
  const g = Group(P.side, 'Wire');
  Seg(g, { options: [['constantan', 'Constantan'], ['nichrome', 'Nichrome'], ['copper', 'Copper']], value: mat, onchange: v => { mat = v; rows = []; render(); } });
  Seg(g, { label: 'Diameter', options: [['0.28', '0.28 mm'], ['0.38', '0.38 mm'], ['0.46', '0.46 mm']], value: '0.28', onchange: v => { dmm = +v; rows = []; render(); } });
  Slider(g, { id: 'rv-l', label: 'Length <i>l</i> (or drag the clip)', min: 0.05, max: 1, step: 0.01, value: len, unit: 'm', fmt: v => fix(v, 2), oninput: v => len = v });
  const b = Btns(g); Btn(b, 'Take reading', () => { const R = Rof(len) * (1 + gauss() * 0.012); rows.push({ l: len, R }); render(); }, 'pri'); Btn(b, 'Clear', () => { rows = []; render(); });
  const ro = Readout(Group(P.side, 'Analysis'), [['R', '<i>R</i> = <i>V</i>/<i>I</i>'], ['A', 'Area π<i>d</i>²/4'], ['g', 'Gradient of <i>R</i>–<i>l</i>'], ['rho', 'ρ = gradient × <i>A</i>', 'hl'], ['acc', 'Accepted ρ']]);
  Note(P.side, 'The gradient of <i>R</i> against <i>l</i> is ρ/<i>A</i>. A small intercept is the contact resistance of the clips — using the gradient removes it.');
  const tc = Card(P.below, 'Results', null); const tb = el('div', { class: 'tbl-wrap' }); tc.append(tb);
  function render() { tb.innerHTML = `<table class="tbl"><tr><th>l / m</th><th>R / Ω</th></tr>${rows.map(r => `<tr><td>${fix(r.l, 2)}</td><td>${fix(r.R, 3)}</td></tr>`).join('') || '<tr><td colspan="2" style="text-align:left;color:var(--ps-muted)">No readings yet.</td></tr>'}</table>`; }
  render();
  Card(P.below, 'Method (1.11.5)', list(['Measure the diameter with a <b>micrometer</b> at several points along the wire and in perpendicular directions; take the mean. Check for zero error.', 'Connect the wire in series with an ammeter, with a voltmeter across the length <i>l</i> between the fixed end and a crocodile clip.', 'Keep the current small (and switch off between readings) so the temperature — and so ρ — stays constant.', 'Measure <i>V</i> and <i>I</i> for at least six lengths; <i>R</i> = <i>V</i>/<i>I</i>.', 'Plot <i>R</i> against <i>l</i>: gradient = ρ/<i>A</i>, so ρ = gradient × π<i>d</i>²/4.'], true));
  EqCard(P.below, 'Resistivity', [['R = \\frac{\\rho l}{A}', 'ρ in Ω m'], ['A = \\frac{\\pi d^2}{4}', 'd in metres!']]);
  Drill(P.below, { title: 'Resistivity drill', gens: [
    () => { const rho = pick([4.9e-7, 1.1e-6, 1.7e-8]), l = +rand(0.5, 3).toFixed(2), d = +rand(0.2, 0.6).toFixed(2); const A = Math.PI * (d / 2000) ** 2; return { q: `A wire of resistivity <b>${sci(rho, 2)} Ω m</b>, length <b>${l} m</b> and diameter <b>${d} mm</b>. Find its resistance.`, a: rho * l / A, unit: 'Ω', steps: [`A = πd²/4 = π(${d}×10⁻³)²/4 = ${sci(A, 3)} m²`, `R = ρl/A = ${fix(rho * l / A, 3)} Ω`] }; },
    () => { const R = +rand(2, 20).toFixed(1), l = +rand(0.5, 2).toFixed(2), d = +rand(0.2, 0.5).toFixed(2); const A = Math.PI * (d / 2000) ** 2; return { q: `A <b>${l} m</b> wire of diameter <b>${d} mm</b> has resistance <b>${R} Ω</b>. Find the resistivity of the metal.`, a: R * A / l, unit: 'Ω m', steps: [`A = ${sci(A, 3)} m²`, `ρ = RA/l = ${sci(R * A / l, 3)} Ω m`] }; },
    () => ({ q: 'A wire is stretched to twice its length (same volume). Its resistance becomes…', options: ['4 times larger', '2 times larger', 'unchanged', 'half'], correct: 0, why: 'l doubles and A halves, so R = ρl/A increases by 2 × 2 = 4.' }),
  ] });
}

/* ---------- Lab C: resistance and temperature ---------- */
function mountTemp(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.3, minH: 240, maxH: 320, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.3, minH: 250, maxH: 360, plain: true });
  let mat = 'metal', T = 293, t = 0;
  const RANGE = { metal: [40, 450], therm: [250, 400], super: [40, 300] };
  const Rf = { metal: T2 => 10 * (1 + 0.0039 * (T2 - 273)) * (T2 < 60 ? 0.3 + (T2 - 40) / 20 * 0.1 : 1), therm: T2 => 100 * Math.exp(3500 * (1 / T2 - 1 / 298)), super: T2 => T2 < 92 ? 0 : 0.5 + 0.004 * (T2 - 92) };
  const ions = Array.from({ length: 40 }, (_, i) => ({ gx: i % 10, gy: Math.floor(i / 10), ph: Math.random() * TAU, f: rand(3, 5) }));
  const els = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), vx: rand(-1, 1), vy: rand(-1, 1), free: Math.random() }));
  L.loop(dt => {
    t += dt;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, x0 = 20, y0 = 20, w = W * 0.62 - 40, h = H - 40;
    c.strokeStyle = C.line2; c.strokeRect(x0 + .5, y0 + .5, w, h);
    const amp = Math.sqrt(T / 300) * 5 * (mat === 'super' && T < 92 ? 0.3 : 1);
    for (const o of ions) dot(c, x0 + (o.gx + 0.5) * w / 10 + amp * Math.sin(t * o.f * 3 + o.ph), y0 + (o.gy + 0.5) * h / 4 + amp * Math.cos(t * o.f * 2.7 + o.ph), 7, alpha(C.orange, .85));
    const nFree = mat === 'therm' ? Math.round(40 * clamp(Math.exp(-3500 * (1 / T - 1 / 400)), 0.04, 1)) : 40;
    for (let i = 0; i < els.length; i++) {
      const e = els[i]; if (i >= nFree) continue;
      const super_ = mat === 'super' && T < 92;
      if (!super_ && Math.random() < dt * T / 60) { e.vx = rand(-1, 1); e.vy = rand(-1, 1); }
      e.x += (e.vx * (super_ ? 0.05 : 0.25) + 0.12) * dt; e.y += e.vy * (super_ ? 0.02 : 0.25) * dt;
      if (e.x > 1) e.x -= 1; if (e.y < 0 || e.y > 1) { e.vy *= -1; e.y = clamp(e.y, 0, 1); }
      dot(c, x0 + e.x * w, y0 + e.y * h, 2.6, C.cyan);
    }
    rich(c, mat === 'therm' ? `free charge carriers: ${nFree}` : mat === 'super' && T < 92 ? 'superconducting: electrons pass without scattering' : 'orange: vibrating lattice ions · blue: free electrons', x0 + 6, y0 + h - 8, { size: 11, color: C.muted, bg: alpha(C.paper2, .8) });
    // thermometer
    const tx = W * 0.72, ty0 = 26, ty1 = H - 30, f = (T - 40) / 410;
    c.strokeStyle = C.ink2; c.lineWidth = 2; rrect(c, tx - 8, ty0, 16, ty1 - ty0, 8); c.stroke();
    c.fillStyle = T < 150 ? C.cyan : C.red; c.fillRect(tx - 4, ty1 - 6 - f * (ty1 - ty0 - 12), 8, f * (ty1 - ty0 - 12) + 6);
    rich(c, `${fix(T, 0)} K`, tx + 16, ty1 - f * (ty1 - ty0), { size: 13, w: 700, mono: true }); rich(c, `(${fix(T - 273, 0)} °C)`, tx + 16, ty1 - f * (ty1 - ty0) + 16, { size: 11, mono: true, color: C.muted });
    const R = Rf[mat](T); rich(c, `*R* = ${mat === 'super' && R === 0 ? '0' : num(R, 3)} Ω`, W * 0.88, H * 0.45, { align: 'center', size: 18, w: 700, color: C.violet });
    S2.begin(); const [a, b] = RANGE[mat];
    const pl = new Plot(S2, { xlabel: 'temperature *T* / K', ylabel: 'resistance *R* / Ω', xmin: a, xmax: b, ymin: 0, ymax: mat === 'therm' ? Rf.therm(a) * 1.05 : Rf[mat](b) * 1.2 });
    pl.axes(); pl.curve(x => Rf[mat](x), { color: C.violet, width: 2.4, n: 400 });
    if (mat === 'super') { pl.vline(92, { color: C.cyan }); pl.label(92, pl.ymax * 0.8, 'critical temperature *T*꜀ = 92 K', { dx: 6, size: 12, color: C.cyan, w: 600 }); }
    pl.dots([[T, Rf[mat](T)]], { color: C.red, r: 6, stroke: C.paper2 });
  }, [S1, S2]);
  const g = Group(P.side, 'Material');
  const sT = { v: null };
  Seg(g, { options: [['metal', 'Metal (copper)'], ['therm', 'NTC thermistor'], ['super', 'Superconductor (YBCO)']], value: mat, wrap: true, onchange: v => { mat = v; const [a, b] = RANGE[v]; T = clamp(T, a, b); sT.v.inp.min = a; sT.v.inp.max = b; sT.v.set(T); } });
  sT.v = Slider(g, { id: 'rt-T', label: 'Temperature', min: 40, max: 450, step: 1, value: T, unit: 'K', fmt: v => fix(v, 0), oninput: v => T = v });
  Note(P.side, '<b>Metals:</b> hotter ⇒ larger ion vibrations ⇒ more collisions ⇒ resistance rises. <b>NTC thermistor:</b> hotter ⇒ many more charge carriers released ⇒ resistance falls sharply. <b>Superconductor:</b> below its critical temperature the resistance is exactly zero.');
  Card(P.below, 'Temperature and resistance (1.11.6–1.11.7)', list(['For a metal the resistance increases roughly linearly with temperature.', 'For an NTC (negative temperature coefficient) thermistor the resistance decreases, non-linearly, as the temperature rises.', 'A <b>superconductor</b> is a material whose resistance becomes zero below its <b>critical (transition) temperature</b>.', 'Uses of superconductors: powerful electromagnets (MRI scanners, particle accelerators, maglev trains), lossless power transmission, sensitive magnetometers (SQUIDs).', 'Drawback: most need cooling with liquid helium (4 K) or liquid nitrogen (77 K) for high-temperature superconductors.']));
}

/* ---------- Lab D: series and parallel ---------- */
function mountNetworks(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 300, maxH: 440, mobileAspect: 1.1 });
  let topo = 'mix', R1 = 10, R2 = 20, R3 = 30, E = 12;
  const par = (a, b) => a * b / (a + b);
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    let Rt, I1, I2, I3;
    if (topo === 'series') { Rt = R1 + R2 + R3; I1 = I2 = I3 = E / Rt; }
    else if (topo === 'parallel') { Rt = 1 / (1 / R1 + 1 / R2 + 1 / R3); I1 = E / R1; I2 = E / R2; I3 = E / R3; }
    else if (topo === 'mix') { Rt = R1 + par(R2, R3); I1 = E / Rt; const Vp = I1 * par(R2, R3); I2 = Vp / R2; I3 = Vp / R3; }
    else { Rt = par(R1 + R2, R3); I1 = I2 = E / (R1 + R2); I3 = E / R3; }
    const I = E / Rt, x0 = W * 0.1, x1 = W * 0.9, y0 = H * 0.18, y1 = H * 0.85, xm = (x0 + x1) / 2;
    comp(c, 'battery', x0, y1, x0, y0, { label: `${E} V`, side: 1 });
    const lab = (n, R, Iv) => `*R*${n} = ${R} Ω · ${fix(Iv, 3)} A`;
    if (topo === 'series') { const xa = x0 + (x1 - x0) * 0.33, xb = x0 + (x1 - x0) * 0.66; comp(c, 'resistor', x0, y0, xa, y0, { label: lab('₁', R1, I1) }); comp(c, 'resistor', xa, y0, xb, y0, { label: lab('₂', R2, I2), side: 1 }); comp(c, 'resistor', xb, y0, x1, y0, { label: lab('₃', R3, I3) }); comp(c, 'wire', x1, y0, x1, y1); }
    else if (topo === 'parallel') { comp(c, 'wire', x0, y0, xm - 80, y0); const ys = [y0, (y0 + y1) / 2 - 20, y1 - 40]; comp(c, 'wire', xm - 80, y0, xm - 80, ys[2]); comp(c, 'wire', xm + 80, y0, xm + 80, ys[2]); [[R1, I1, '₁'], [R2, I2, '₂'], [R3, I3, '₃']].forEach(([R, Iv, n], i) => comp(c, 'resistor', xm - 80, ys[i], xm + 80, ys[i], { label: lab(n, R, Iv) })); comp(c, 'wire', xm + 80, y0, x1, y0); comp(c, 'wire', x1, y0, x1, y1); }
    else if (topo === 'mix') { const xa = x0 + (x1 - x0) * 0.4; comp(c, 'resistor', x0, y0, xa, y0, { label: lab('₁', R1, I1) }); const yb = (y0 + y1) / 2; comp(c, 'wire', xa, y0, xa + 20, y0); comp(c, 'wire', xa + 20, y0, xa + 20, yb); comp(c, 'resistor', xa + 20, y0, x1 - 20, y0, { label: lab('₂', R2, I2) }); comp(c, 'resistor', xa + 20, yb, x1 - 20, yb, { label: lab('₃', R3, I3), side: 1 }); comp(c, 'wire', x1 - 20, y0, x1 - 20, yb); comp(c, 'wire', x1 - 20, y0, x1, y0); comp(c, 'wire', x1, y0, x1, y1); }
    else { const yb = (y0 + y1) / 2; comp(c, 'wire', x0, y0, x0 + 40, y0); comp(c, 'wire', x0 + 40, y0, x0 + 40, yb); comp(c, 'resistor', x0 + 40, y0, xm, y0, { label: lab('₁', R1, I1) }); comp(c, 'resistor', xm, y0, x1 - 40, y0, { label: lab('₂', R2, I2) }); comp(c, 'resistor', x0 + 40, yb, x1 - 40, yb, { label: lab('₃', R3, I3), side: 1 }); comp(c, 'wire', x1 - 40, y0, x1 - 40, yb); comp(c, 'wire', x1 - 40, y0, x1, y0); comp(c, 'wire', x1, y0, x1, y1); }
    comp(c, 'ammeter', x1, y1, xm, y1, { size: 30 }); comp(c, 'wire', xm, y1, x0, y1);
    meter(c, xm + 50, y1 + 26, `I = ${fix(I, 3)} A`, { color: C.blue });
    rich(c, `total resistance = ${fix(Rt, 2)} Ω`, W / 2, H - 10, { align: 'center', size: 14, w: 700, color: C.violet });
    ro.set('Rt', `${fix(Rt, 3)} Ω`); ro.set('I', `${fix(I, 3)} A`); ro.set('P', `${fix(E * I, 2)} W`);
  }, [S]);
  const g = Group(P.side, 'Network');
  Seg(g, { options: [['series', 'Series'], ['parallel', 'Parallel'], ['mix', 'R₁ + (R₂||R₃)'], ['mix2', '(R₁+R₂) || R₃']], value: topo, wrap: true, onchange: v => topo = v });
  Slider(g, { id: 'nw-1', label: '<i>R</i>₁', min: 1, max: 100, step: 1, value: R1, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R1 = v });
  Slider(g, { id: 'nw-2', label: '<i>R</i>₂', min: 1, max: 100, step: 1, value: R2, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R2 = v });
  Slider(g, { id: 'nw-3', label: '<i>R</i>₃', min: 1, max: 100, step: 1, value: R3, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => R3 = v });
  const ro = Readout(Group(P.side, 'Whole circuit'), [['Rt', 'Total resistance', 'hl'], ['I', 'Supply current'], ['P', 'Power from supply']]);
  Note(P.side, 'Parallel branches always give a total <b>smaller than the smallest</b> resistor. Current splits between branches but the pd across each branch is the same.');
  EqCard(P.below, 'Combining resistors (1.11.8)', [['R_T = R_1 + R_2 + R_3', 'series: same current'], ['\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}', 'parallel: same pd'], ['R_T = \\frac{R_1R_2}{R_1 + R_2}', 'two in parallel']]);
  Drill(P.below, { title: 'Networks drill', gens: [
    () => { const a = randi(2, 60), b = randi(2, 60); return { q: `Find the combined resistance of <b>${a} Ω</b> and <b>${b} Ω</b> in parallel.`, a: a * b / (a + b), unit: 'Ω', steps: ['R = R₁R₂/(R₁+R₂)', `= ${a}×${b}/${a + b} = ${fix(a * b / (a + b), 2)} Ω`] }; },
    () => { const a = randi(2, 40), b = randi(2, 40), c2 = randi(2, 40); const R = a + b * c2 / (b + c2); return { q: `<b>${a} Ω</b> is in series with a parallel pair of <b>${b} Ω</b> and <b>${c2} Ω</b>. Find the total resistance.`, a: R, unit: 'Ω', steps: [`parallel pair = ${fix(b * c2 / (b + c2), 3)} Ω`, `total = ${a} + ${fix(b * c2 / (b + c2), 3)} = ${fix(R, 2)} Ω`] }; },
    () => { const n = randi(2, 6), R = randi(5, 60); return { q: `<b>${n}</b> identical <b>${R} Ω</b> resistors are connected in parallel. Find the total.`, a: R / n, unit: 'Ω', steps: ['n identical in parallel: R/n', `= ${R}/${n} = ${fix(R / n, 2)} Ω`] }; },
  ] });
}

topic({
  id: 'resistance', code: '1.11', unit: 'AS 1', title: 'Resistance & Resistivity', short: 'Resistance',
  blurb: 'Ohm’s law, I–V characteristics of a lamp, a diode and a thermistor, measuring resistivity, temperature effects, superconductors and resistor networks.',
  outcomes: [
    ['1.11.1', 'define resistance, recall and use R = V/I', 'iv'],
    ['1.11.2', 'state Ohm’s law', 'iv'],
    ['1.11.3', 'sketch and explain the I–V characteristics of a metallic conductor at constant temperature, a filament lamp and a semiconductor diode', 'iv'],
    ['1.11.4', 'describe an experiment to obtain the I–V characteristic of a component', 'iv'],
    ['1.11.5', 'recall and use R = ρl/A, and describe an experiment to determine the resistivity of a metal', 'resistivity'],
    ['1.11.6', 'describe the variation of resistance with temperature for a metal and an NTC thermistor', 'temp'],
    ['1.11.7', 'demonstrate an understanding of superconductivity, critical temperature and applications of superconductors', 'temp'],
    ['1.11.8', 'recall and use the equations for resistors in series and in parallel', 'networks'],
  ],
  labs: [
    { id: 'iv', title: 'I–V characteristics', hint: 'lamp, diode, thermistor', spec: ['1.11.1', '1.11.2', '1.11.3', '1.11.4'], mount: mountIV },
    { id: 'resistivity', title: 'Measuring resistivity', hint: 'R–l graph', spec: ['1.11.5'], mount: mountResistivity },
    { id: 'temp', title: 'Temperature & superconductors', hint: 'R–T', spec: ['1.11.6', '1.11.7'], mount: mountTemp },
    { id: 'networks', title: 'Series & parallel', hint: 'combine resistors', spec: ['1.11.8'], mount: mountNetworks },
  ],
  equations: [['R = \\frac{V}{I}', ''], ['R = \\frac{\\rho l}{A}', ''], ['R_T = R_1 + R_2 + \\ldots', 'series'], ['\\frac{1}{R_T} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\ldots', 'parallel']],
  traps: ['Resistance = <i>V</i>/<i>I</i> at a point, not the gradient of the I–V graph.', 'Ohm’s law only applies at <b>constant temperature</b>.', 'Diameter from a micrometer is in mm: convert to m before A = πd²/4.', 'Superconductor resistance is <b>zero</b>, not just very small.', 'Parallel total is less than the smallest branch resistance.'],
  notes: [
    ['Resistance and Ohm’s law', 'Resistance R = V/I (ohm, Ω = V A⁻¹). Ohm’s law: the current through a metallic conductor is directly proportional to the pd across it, provided the temperature (and other physical conditions) stays constant.'],
    ['I–V characteristics', '<ul><li>Ohmic conductor: straight line through the origin.</li><li>Filament lamp: curve with decreasing gradient — resistance rises as the filament heats (more lattice vibration, more collisions).</li><li>Diode: tiny reverse current; forward current negligible below ~0.6 V then rises steeply.</li></ul>'],
    ['Resistivity', 'R = ρl/A, where ρ (Ω m) is a property of the material at a given temperature. Measure d with a micrometer, R for several lengths, plot R vs l: ρ = gradient × A.'],
    ['Temperature effects', 'Metals: R increases with temperature. NTC thermistors: R decreases steeply with temperature because more charge carriers are released. Used as temperature sensors.'],
    ['Superconductivity', 'Below its critical temperature a superconductor has zero resistance: no energy is dissipated. Applications: MRI and accelerator magnets, maglev, power cables. Drawback: cooling cost.'],
    ['Series and parallel', 'Series: same current, pds add, R_T = ΣR. Parallel: same pd, currents add, 1/R_T = Σ1/R.'],
  ],
  mini(c, w, h, t, C) {
    const x0 = 16, y0 = h - 14, W2 = w - 32, H2 = h - 28;
    line(c, [[x0, y0], [x0 + W2, y0]], { color: C.ink2, width: 1 }); line(c, [[x0 + W2 / 2, y0], [x0 + W2 / 2, y0 - H2]], { color: C.ink2, width: 1 });
    const pts = []; for (let k = -40; k <= 40; k++) { const V = k / 40 * 6; pts.push([x0 + W2 / 2 + k / 40 * W2 / 2, y0 - H2 / 2 - lampI(V) / 0.6 * H2 / 2 + H2 / 2 * 0]); } line(c, pts.map(([a, b]) => [a, b - 0]), { color: C.orange, width: 2 });
    const pd = []; for (let k = 0; k <= 40; k++) { const V = k / 40; pd.push([x0 + W2 / 2 + k / 40 * W2 / 2, y0 - Math.min(1, diodeI(V * 0.9) / 0.6) * H2]); } line(c, pd, { color: C.red, width: 2 });
  },
});
})();

/* ================= 1.12 Internal resistance and emf ================= */
(() => {

function mountInternal(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.3, minH: 250, maxH: 330, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 380, plain: true });
  let E = 1.5, r = 0.8, R = 4, rows = [], mystery = false, reveal = false, view = 'vi';
  const newMystery = () => { E = +rand(1.3, 9).toFixed(2); r = +rand(0.3, 4).toFixed(2); rows = []; reveal = false; };
  L.loop(() => {
    const I = E / (R + r), V = E - I * r, c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const x0 = W * 0.1, x1 = W * 0.85, y0 = Math.max(H * 0.42, 150), y1 = H - 44;
    // cell box with internal resistance
    const bx0 = x0 - 26, bx1 = x0 + 150; c.setLineDash([5, 4]); c.strokeStyle = C.muted; c.lineWidth = 1.2; c.strokeRect(bx0, y0 - 34, bx1 - bx0, 68); c.setLineDash([]);
    rich(c, mystery && !reveal ? 'mystery cell' : `cell: *E* = ${fix(E, 2)} V, *r* = ${fix(r, 2)} Ω`, (bx0 + bx1) / 2, y0 - 46, { align: 'center', size: 12, w: 600, color: C.ink2 });
    comp(c, 'cell', x0, y0, x0 + 60, y0, { size: 30 }); comp(c, 'resistor', x0 + 60, y0, x0 + 150, y0, { size: 34, fill: alpha(C.red, .25), label: '*r*', side: 1, ld: 26 });
    comp(c, 'wire', x0 + 150, y0, x1, y0); comp(c, 'ammeter', x1, y0, x1, y1, { size: 30 });
    comp(c, 'variable', x1, y1, x0 + 40, y1, { label: `*R* = ${fix(R, 1)} Ω`, side: 1, size: 44 }); comp(c, 'wire', x0 + 40, y1, x0 - 26, y1); comp(c, 'wire', x0 - 26, y1, x0 - 26, y0); comp(c, 'wire', x0 - 26, y0, x0, y0);
    // voltmeter across terminals
    const vy = y0 - 72; comp(c, 'wire', x0 - 26, y0 - 34, x0 - 26, vy, { width: 1.2 }); comp(c, 'wire', x0 + 150, y0, x0 + 176, y0, { width: 1.2 }); comp(c, 'wire', x0 + 176, y0, x0 + 176, vy, { width: 1.2 });
    comp(c, 'voltmeter', x0 - 26, vy, x0 + 176, vy, { size: 28 });
    meter(c, x0 + 75, vy - 24, `V = ${fix(V, 3)} V`, { color: C.violet }); meter(c, x1 + 44, (y0 + y1) / 2, `${fix(I, 3)} A`, { color: C.blue });
    rich(c, `lost volts *Ir* = ${fix(I * r, 3)} V`, W * 0.5, H - 12, { align: 'center', size: 12.5, w: 600, color: C.red });
    S2.begin();
    if (view === 'vi') {
      const pl = new Plot(S2, { xlabel: 'current *I* / A', ylabel: 'terminal pd *V* / V', xmin: 0, xmax: Math.max(0.5, E / r) * 1.05, ymin: 0, ymax: E * 1.2 });
      pl.axes();
      let m = NaN, b = NaN;
      if (rows.length >= 2) { const n = rows.length, sx = rows.reduce((a, q) => a + q.I, 0), sy = rows.reduce((a, q) => a + q.V, 0), sxy = rows.reduce((a, q) => a + q.I * q.V, 0), sxx = rows.reduce((a, q) => a + q.I * q.I, 0); m = (n * sxy - sx * sy) / (n * sxx - sx * sx); b = (sy - m * sx) / n; pl.curve(x => m * x + b, { color: C.green, width: 1.8, a: 0, b: -b / m }); pl.label(0, b, `intercept = *E* ≈ ${fix(b, 2)} V`, { dx: 8, dy: -12, size: 12, color: C.green, w: 600 }); pl.label(-b / m * 0.55, b * 0.45, `gradient = −*r* ≈ −${fix(-m, 2)} Ω`, { size: 12, color: C.green, w: 600 }); }
      if (!mystery || reveal) pl.curve(x => E - x * r, { color: alpha(C.muted, .5), width: 1.2, dash: [4, 4] });
      pl.cross(rows.map(q => [q.I, q.V]), { color: C.red, s: 5, width: 2 }); pl.dots([[I, V]], { color: C.violet, r: 5, stroke: C.paper2 });
      ro.set('fitE', isFinite(b) ? `${fix(b, 3)} V` : '—'); ro.set('fitr', isFinite(m) ? `${fix(-m, 3)} Ω` : '—');
    } else {
      const pl = new Plot(S2, { xlabel: 'load resistance *R* / Ω', ylabel: 'power in *R* / W', xmin: 0, xmax: Math.max(10, r * 5), ymin: 0, ymax: E * E / (4 * r) * 1.25 });
      pl.axes(); pl.curve(x => (E / (x + r)) ** 2 * x, { color: C.orange, width: 2.4 }); pl.vline(r, { color: C.orange }); pl.label(r, E * E / (4 * r), 'maximum when *R* = *r*', { dx: 8, dy: -12, size: 12, color: C.orange, w: 600 }); pl.dots([[R, I * I * R]], { color: C.violet, r: 5, stroke: C.paper2 });
      ro.set('fitE', '—'); ro.set('fitr', '—');
    }
    ro.set('I', `${fix(I, 3)} A`); ro.set('V', `${fix(V, 3)} V`); ro.set('lost', `${fix(I * r, 3)} V`); ro.set('P', `${fix(I * I * R, 3)} W`);
  }, [S1, S2]);
  const g = Group(P.side, 'Circuit');
  Slider(g, { id: 'ir-R', label: 'External resistance <i>R</i>', min: 0.2, max: 30, step: 0.1, value: R, unit: 'Ω', fmt: v => fix(v, 1), oninput: v => R = v });
  const sE = Slider(g, { id: 'ir-E', label: 'emf <i>E</i>', min: 1, max: 12, step: 0.1, value: E, unit: 'V', fmt: v => fix(v, 1), oninput: v => { E = v; rows = []; } });
  const sr = Slider(g, { id: 'ir-r', label: 'Internal resistance <i>r</i>', min: 0.1, max: 5, step: 0.1, value: r, unit: 'Ω', fmt: v => fix(v, 1), oninput: v => { r = v; rows = []; } });
  Switch(g, { id: 'ir-my', label: 'Mystery cell (find E and r yourself)', value: false, onchange: v => { mystery = v; sE.el.hidden = v; sr.el.hidden = v; if (v) newMystery(); rows = []; } });
  Seg(g, { label: 'Graph', options: [['vi', 'V against I'], ['pow', 'Power vs R']], value: view, onchange: v => view = v });
  const b = Btns(g); Btn(b, 'Record reading', () => { const I = E / (R + r); rows.push({ I: I * (1 + gauss() * 0.006), V: (E - I * r) * (1 + gauss() * 0.004) }); }, 'pri'); Btn(b, 'Clear', () => rows = []); Btn(b, 'Reveal', () => reveal = true);
  const ro = Readout(Group(P.side, 'Meters'), [['I', 'Current'], ['V', 'Terminal pd'], ['lost', 'Lost volts <i>Ir</i>'], ['P', 'Power in <i>R</i>'], ['fitE', 'Best-fit <i>E</i>', 'hl'], ['fitr', 'Best-fit <i>r</i>', 'hl']]);
  Note(P.side, 'Draw more current and the terminal pd falls: more of the emf is “lost” driving current through the cell’s own resistance. On the <i>V</i>–<i>I</i> graph, <i>V</i> = <i>E</i> − <i>rI</i>: intercept <i>E</i>, gradient −<i>r</i>.');
  EqCard(P.below, 'Internal resistance (1.12.1)', [['E = V + Ir', ''], ['E = I(R + r)', ''], ['V = E - rI', 'straight line: y = c + mx']]);
  Card(P.below, 'Measuring E and r (1.12.2)', list(['Connect the cell in series with a variable resistor and an ammeter; voltmeter across the cell’s terminals.', 'Vary <i>R</i> to get a range of currents; record <i>V</i> and <i>I</i> each time. Keep currents small and switch off between readings so <i>r</i> stays constant.', 'Plot <i>V</i> (y-axis) against <i>I</i> (x-axis).', 'The <b>y-intercept is the emf E</b>; the <b>gradient is −r</b>.', 'On open circuit (<i>I</i> = 0) a high-resistance voltmeter reads the emf.'], true));
  Card(P.below, 'Why it matters', `<p>A car battery has a very small internal resistance (≈ 0.01 Ω) so it can deliver hundreds of amps to the starter motor. An EHT supply has a very large internal resistance (MΩ) deliberately, so the current is limited if you touch it.</p><p>Maximum power is delivered to the external resistor when <i>R</i> = <i>r</i> (switch the graph to see it) — but then the efficiency is only 50%.</p>`);
  Drill(P.below, { title: 'Internal resistance drill', gens: [
    () => { const E2 = +rand(1.5, 12).toFixed(1), r2 = +rand(0.2, 3).toFixed(1), R2 = randi(2, 30); const I = E2 / (R2 + r2); return { q: `A cell of emf <b>${E2} V</b> and internal resistance <b>${r2} Ω</b> is connected to a <b>${R2} Ω</b> resistor. Find the terminal pd.`, a: I * R2, unit: 'V', steps: [`I = E/(R + r) = ${E2}/${R2 + r2} = ${fix(I, 3)} A`, `V = IR = ${fix(I * R2, 3)} V`] }; },
    () => { const E2 = +rand(3, 12).toFixed(1), V2 = +(E2 * rand(0.6, 0.95)).toFixed(2), I = +rand(0.2, 2).toFixed(2); return { q: `A battery of emf <b>${E2} V</b> has a terminal pd of <b>${V2} V</b> when delivering <b>${I} A</b>. Find its internal resistance.`, a: (E2 - V2) / I, unit: 'Ω', steps: ['E = V + Ir ⇒ r = (E − V)/I', `= (${E2} − ${V2})/${I} = ${fix((E2 - V2) / I, 3)} Ω`] }; },
    () => { const E2 = +rand(1.5, 9).toFixed(2), r2 = +rand(0.2, 2).toFixed(2); return { q: `A V–I graph for a cell has a y-intercept of <b>${E2} V</b> and a gradient of <b>−${r2} V A⁻¹</b>. What current flows when the terminals are short-circuited?`, a: E2 / r2, unit: 'A', steps: ['Short circuit: V = 0 ⇒ I = E/r (the x-intercept)', `= ${E2}/${r2} = ${fix(E2 / r2, 3)} A`] }; },
  ] });
}

topic({
  id: 'internal', code: '1.12', unit: 'AS 1', title: 'Internal Resistance & EMF', short: 'Internal r',
  blurb: 'Real cells lose volts inside themselves. Measure a mystery cell’s emf and internal resistance from a V–I graph.',
  outcomes: [
    ['1.12.1', 'demonstrate an understanding of the effect of internal resistance and recall and use E = V + Ir', 'cell'],
    ['1.12.2', 'describe an experiment to measure the emf and internal resistance of a cell', 'cell'],
  ],
  labs: [{ id: 'cell', title: 'Find E and r', hint: 'V = E − rI', spec: ['1.12.1', '1.12.2'], mount: mountInternal }],
  equations: [['E = V + Ir', ''], ['E = I(R + r)', ''], ['V = E - rI', '']],
  traps: ['Terminal pd = emf only when <b>no current</b> flows.', 'On a V–I graph the gradient is <b>−r</b>, not −1/r.', '“Lost volts” = <i>Ir</i>, the pd across the internal resistance.', 'Use total resistance (R + r) when finding the current.'],
  notes: [
    ['Internal resistance', 'Every source has some resistance of its own, r. When current flows, energy is dissipated inside the source, so the terminal pd V is less than the emf: E = V + Ir.'],
    ['Lost volts', 'Ir is the “lost volts”: the energy per coulomb dissipated inside the cell. It increases with current, so the terminal pd falls as more current is drawn.'],
    ['Measuring E and r', 'Vary the external resistance, record V and I, plot V against I. Intercept on the V-axis = E; gradient = −r; intercept on the I-axis = short-circuit current E/r.'],
  ],
  mini(c, w, h, t, C) {
    const x0 = 18, y0 = h - 16, W2 = w - 36, H2 = h - 32; line(c, [[x0, y0 - H2], [x0, y0], [x0 + W2, y0]], { color: C.ink2, width: 1.2 });
    line(c, [[x0, y0 - H2 * 0.85], [x0 + W2 * 0.9, y0]], { color: C.green, width: 2 }); for (let k = 1; k < 7; k++) { const q = k / 7.5; dot(c, x0 + W2 * 0.9 * q, y0 - H2 * 0.85 * (1 - q) + Math.sin(k * 3 + t) * 2, 3, C.red); }
  },
});
})();

/* ================= 1.13 Potential divider circuits ================= */
(() => {

function mountDivider(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.8, minH: 330, maxH: 480, mobileAspect: 1 });
  let Vin = 9, R1 = 10000, sensor = 'ldr', pos = 'bottom', lux = 50, temp = 20, Rfix = 5000, load = false, Rload = 10000, thr = 4.5;
  const Rs = () => sensor === 'ldr' ? 500 * Math.pow(Math.max(lux, 0.5) / 1000, -0.75) : sensor === 'therm' ? 10000 * Math.exp(3900 * (1 / (temp + 273) - 1 / 298)) : Rfix;
  L.loop(() => {
    const Rsn = Rs(), top = pos === 'top' ? Rsn : R1; let bot = pos === 'top' ? R1 : Rsn;
    const botEff = load ? bot * Rload / (bot + Rload) : bot;
    const Vout = Vin * botEff / (top + botEff);
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, wide = W > 620;
    const xl = W * 0.12, xr = wide ? W * 0.42 : W * 0.55, y0 = H * 0.1, y1 = H * 0.9, ym = (y0 + y1) / 2;
    comp(c, 'battery', xl, y1, xl, y0, { label: `${Vin} V`, side: 1 });
    comp(c, 'wire', xl, y0, xr, y0); comp(c, 'wire', xl, y1, xr, y1);
    const draw = (which, ya, yb) => { const isS = (which === 'top') === (pos === 'top'); const type = isS ? (sensor === 'ldr' ? 'ldr' : sensor === 'therm' ? 'thermistor' : 'resistor') : 'resistor'; comp(c, type, xr, ya, xr, yb, { label: isS ? `${sensor === 'ldr' ? 'LDR' : sensor === 'therm' ? 'thermistor' : 'R₂'} ${num(Rsn, 3)} Ω` : `R₁ ${num(R1, 3)} Ω`, side: -1, size: 40, fill: isS ? alpha(C.violet, .2) : alpha(C.orange, .2) }); };
    draw('top', y0, ym); draw('bot', ym, y1);
    // output terminals
    const xo = wide ? W * 0.6 : W * 0.85; comp(c, 'wire', xr, ym, xo, ym); comp(c, 'wire', xr, y1, xo, y1, { width: 2 });
    dot(c, xo, ym, 4, C.ink); dot(c, xo, y1, 4, C.ink);
    arrow(c, xo + 16, y1 - 4, xo + 16, ym + 4, { color: C.green, width: 2, both: true, head: 7 }); rich(c, `*V*ₒᵤₜ = ${fix(Vout, 2)} V`, xo + 24, (ym + y1) / 2, { size: 14, w: 700, color: C.green });
    if (load) { comp(c, 'resistor', xo - 40, ym, xo - 40, y1, { label: `load ${num(Rload, 3)} Ω`, side: 1, size: 34, fill: alpha(C.red, .2) }); }
    // environment + output device
    if (wide) {
      const ex = W * 0.84, ey = H * 0.28;
      if (sensor === 'ldr') { const f = clamp(Math.log10(lux) / 3, 0, 1); c.beginPath(); c.arc(ex, ey, 26, 0, TAU); c.fillStyle = `rgba(255,${Math.round(180 + 60 * f)},60,${0.2 + 0.8 * f})`; c.fill(); for (let k = 0; k < 8; k++) { const a = k * TAU / 8; line(c, [[ex + Math.cos(a) * 32, ey + Math.sin(a) * 32], [ex + Math.cos(a) * (36 + 12 * f), ey + Math.sin(a) * (36 + 12 * f)]], { color: alpha(C.orange, f), width: 2 }); } rich(c, `${fix(lux, 0)} lux`, ex, ey + 56, { align: 'center', size: 12, mono: true, color: C.ink2 }); }
      else if (sensor === 'therm') { rich(c, `${fix(temp, 0)} °C`, ex, ey, { align: 'center', size: 20, w: 700, mono: true, color: temp > 40 ? C.red : C.blue }); rich(c, 'temperature', ex, ey + 22, { align: 'center', size: 11, color: C.muted }); }
      const on = Vout > thr; const lx = W * 0.84, ly = H * 0.68;
      c.beginPath(); c.arc(lx, ly, 20, 0, TAU); c.fillStyle = on ? C.orange : C.paper3; c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 1.5; c.stroke();
      if (on) { c.beginPath(); c.arc(lx, ly, 32, 0, TAU); c.fillStyle = alpha(C.orange, .25); c.fill(); }
      rich(c, on ? 'switched ON' : 'off', lx, ly + 40, { align: 'center', size: 12, w: 700, color: on ? C.orange : C.muted });
      rich(c, `switch turns on when *V*ₒᵤₜ > ${fix(thr, 1)} V`, lx, ly + 58, { align: 'center', size: 11, color: C.muted });
    }
    ro.set('Rs', `${num(Rsn, 3)} Ω`); ro.set('Vo', `${fix(Vout, 3)} V`); ro.set('ratio', `${fix(botEff / (top + botEff), 3)}`); ro.set('I', `${num((Vin / (top + botEff)) * 1000, 3)} mA`);
  }, [S]);
  const g = Group(P.side, 'Divider');
  Seg(g, { label: 'Sensor', options: [['ldr', 'LDR'], ['therm', 'Thermistor'], ['fixed', 'Fixed R₂']], value: sensor, onchange: v => { sensor = v; sl.el.hidden = v !== 'ldr'; st.el.hidden = v !== 'therm'; sf.el.hidden = v !== 'fixed'; } });
  Seg(g, { label: 'Sensor position', options: [['bottom', 'Bottom (across Vout)'], ['top', 'Top']], value: pos, onchange: v => pos = v });
  const sl = Slider(g, { id: 'pv-lux', label: 'Light level', min: 1, max: 1000, step: 1, value: lux, unit: 'lux', fmt: v => fix(v, 0), oninput: v => lux = v });
  const st = Slider(g, { id: 'pv-T', label: 'Temperature', min: -10, max: 90, step: 1, value: temp, unit: '°C', fmt: v => fix(v, 0), oninput: v => temp = v }); st.el.hidden = true;
  const sf = Slider(g, { id: 'pv-R2', label: '<i>R</i>₂', min: 100, max: 50000, step: 100, value: Rfix, unit: 'Ω', fmt: v => num(v, 3), oninput: v => Rfix = v }); sf.el.hidden = true;
  Slider(g, { id: 'pv-R1', label: '<i>R</i>₁ (variable resistor)', min: 500, max: 50000, step: 500, value: R1, unit: 'Ω', fmt: v => num(v, 3), oninput: v => R1 = v });
  Slider(g, { id: 'pv-th', label: 'Switching threshold', min: 1, max: 8, step: 0.5, value: thr, unit: 'V', fmt: v => fix(v, 1), oninput: v => thr = v });
  Switch(g, { id: 'pv-load', label: 'Connect a 10 kΩ load across <i>V</i>ₒᵤₜ', value: false, onchange: v => load = v });
  const ro = Readout(Group(P.side, 'Output'), [['Rs', 'Sensor resistance'], ['ratio', '<i>R</i>₂/(<i>R</i>₁ + <i>R</i>₂)'], ['Vo', '<i>V</i>ₒᵤₜ', 'hl'], ['I', 'Divider current']]);
  Note(P.side, 'The supply voltage is shared in the ratio of the resistances. Darkness raises an LDR’s resistance: with the LDR at the bottom, <i>V</i>ₒᵤₜ rises in the dark — a street-lamp sensor. Swap it to the top and the output rises in the light.');
  EqCard(P.below, 'Potential divider (1.13.1)', [['V_{out} = \\frac{R_2}{R_1 + R_2}V_{in}', 'R₂ is across the output'], ['\\frac{V_1}{V_2} = \\frac{R_1}{R_2}', 'series: pd shared in ratio of R']]);
  Card(P.below, 'Sensors (1.13.2)', list(['<b>LDR:</b> resistance falls as light intensity increases (more charge carriers released).', '<b>NTC thermistor:</b> resistance falls as temperature rises.', 'Put the sensor in the position that makes <i>V</i>ₒᵤₜ rise when you want the output device to switch on (e.g. alarm on when hot ⇒ thermistor at the <b>top</b>).', 'Replacing <i>R</i>₁ with a variable resistor lets you set the light level or temperature at which switching occurs.', 'A <b>load</b> in parallel with <i>R</i>₂ lowers the effective bottom resistance and so lowers <i>V</i>ₒᵤₜ — use a load much larger than <i>R</i>₂.', 'A <b>potentiometer</b> (a resistor with a sliding contact) is a continuously variable potential divider: 0 to <i>V</i>ᵢₙ.']));
  Drill(P.below, { title: 'Potential divider drill', gens: [
    () => { const V = pick([5, 6, 9, 12]), a = randi(1, 50) * 100, b = randi(1, 50) * 100; return { q: `A <b>${V} V</b> supply is across <b>R₁ = ${a} Ω</b> and <b>R₂ = ${b} Ω</b> in series. Find the pd across R₂.`, a: V * b / (a + b), unit: 'V', steps: ['V_out = R₂/(R₁ + R₂) × V_in', `= ${b}/${a + b} × ${V} = ${fix(V * b / (a + b), 3)} V`] }; },
    () => { const V = pick([6, 9, 12]), Vo = +rand(1, V - 1).toFixed(1), b = randi(1, 20) * 1000; const a = b * (V - Vo) / Vo; return { q: `In a potential divider, <b>R₂ = ${b} Ω</b> and V_in = <b>${V} V</b>. What value of R₁ gives V_out (across R₂) = <b>${Vo} V</b>?`, a: a, unit: 'Ω', steps: ['V₁/V₂ = R₁/R₂', `R₁ = R₂ × (V_in − V_out)/V_out = ${b} × ${fix(V - Vo, 2)}/${Vo} = ${fix(a, 0)} Ω`] }; },
    () => ({ q: 'An LDR is the bottom resistor of a potential divider (V_out across the LDR). As it gets darker, V_out…', options: ['increases', 'decreases', 'stays the same', 'becomes zero'], correct: 0, why: 'Darker ⇒ LDR resistance rises ⇒ it takes a larger share of the supply pd.' }),
    () => ({ q: 'A thermistor-based fire alarm must switch on when V_out rises as it gets hot. Where should the thermistor go?', options: ['In the top position (R₁)', 'In the bottom position, across V_out', 'In parallel with the supply', 'It doesn’t matter'], correct: 0, why: 'Hot ⇒ thermistor resistance falls; at the top that makes the bottom resistor’s share (V_out) larger.' }),
  ] });
}

topic({
  id: 'divider', code: '1.13', unit: 'AS 1', title: 'Potential Divider Circuits', short: 'Potential divider',
  blurb: 'Share a supply between two resistors, then make it smart with an LDR or thermistor that switches a lamp on in the dark or an alarm when hot.',
  outcomes: [
    ['1.13.1', 'recall and use the potential divider equation V_out = R₂V_in/(R₁ + R₂)', 'sensor'],
    ['1.13.2', 'demonstrate an understanding of the use of light-dependent resistors and thermistors in potential divider circuits', 'sensor'],
  ],
  labs: [{ id: 'sensor', title: 'Sensor circuits', hint: 'LDR & thermistor', spec: ['1.13.1', '1.13.2'], mount: mountDivider }],
  equations: [['V_{out} = \\frac{R_2}{R_1 + R_2}V_{in}', ''], ['\\frac{V_1}{V_2} = \\frac{R_1}{R_2}', '']],
  traps: ['<i>V</i>ₒᵤₜ is across <b>R₂</b> — check which resistor the output is taken across.', 'LDR: resistance falls with <b>more</b> light. NTC thermistor: resistance falls when <b>hotter</b>.', 'A load connected across the output reduces <i>V</i>ₒᵤₜ.', 'The ratio matters, not the absolute size of the resistors.'],
  notes: [
    ['Potential divider', 'Two resistors in series across a supply share the pd in the ratio of their resistances: V_out = R₂V_in/(R₁ + R₂), where V_out is across R₂.'],
    ['Sensors', 'Replacing a resistor by an LDR or a thermistor gives an output pd that depends on light or temperature. Choose the position so V_out rises in the condition you want to detect.'],
    ['Variable resistors and potentiometers', 'A variable resistor for R₁ sets the switching point. A potentiometer gives a pd continuously variable from 0 to V_in — used to get the full range in I–V experiments.'],
    ['Loading', 'Connecting a load across the output puts it in parallel with R₂, lowering the effective resistance and V_out. Keep R_load ≫ R₂.'],
  ],
  mini(c, w, h, t, C) {
    const x = w * 0.35, y0 = 14, y1 = h - 14, ym = (y0 + y1) / 2 + 12 * Math.sin(t);
    comp(c, 'resistor', x, y0, x, ym, { size: 28 }); comp(c, 'ldr', x, ym, x, y1, { size: 26 });
    line(c, [[x, ym], [w * 0.7, ym]], { color: C.ink2, width: 1.5 }); rich(c, `*V*ₒᵤₜ`, w * 0.72, ym, { size: 13, color: C.green });
  },
});
})();

/* ================= 2.1 Waves ================= */
(() => {
const c0 = 3.0e8;

/* ---------- Lab A: transverse vs longitudinal ---------- */
function mountTypes(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.7, minH: 360, maxH: 540, mobileAspect: 0.9 });
  let mode = 'both', amp = 0.7, f = 0.6, v = 1.2, t = 0, run = true, slow = false, graph = true;
  const Lm = 4; // metres of medium shown
  const jit = Array.from({ length: 8 * 80 }, () => [rand(-0.35, 0.35), rand(-0.3, 0.3)]);
  L.loop(dt => {
    if (run) t += dt * (slow ? 0.25 : 1);
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h;
    const lam = v / f, k = TAU / lam, w = TAU * f;
    const x0 = 30, x1 = W - 30, sx = (x1 - x0) / Lm;
    const regions = mode === 'both' ? [['T', 0, Hh * 0.42], ['L', Hh * 0.42, Hh]] : [[mode, 0, Hh]];
    for (const [m, ya, yb] of regions) {
      const hh = yb - ya;
      c.fillStyle = C.muted; c.font = FONT.ui(11, 600); c.textAlign = 'left'; c.textBaseline = 'top';
      const narrow = W < 560;
      c.fillText(m === 'T' ? (narrow ? 'TRANSVERSE · ⟂ travel' : 'TRANSVERSE · oscillation ⟂ direction of travel') : (narrow ? 'LONGITUDINAL · ∥ travel' : 'LONGITUDINAL · oscillation ∥ direction of travel'), 14, ya + 10);
      arrow(c, W - (narrow ? 70 : 150), ya + 17, W - 30, ya + 17, { color: C.green, width: 2 }); rich(c, narrow ? 'energy' : 'energy transfer', W - (narrow ? 76 : 156), ya + 17, { align: 'right', size: 11, color: C.green });
      if (m === 'T') {
        const yc = ya + hh * 0.58, A = amp * hh * 0.3;
        const N = 44, pts = [];
        for (let i = 0; i <= N; i++) { const xm = i / N * Lm; pts.push([x0 + xm * sx, yc - A * Math.sin(k * xm - w * t)]); }
        line(c, [[x0, yc], [x1, yc]], { color: C.line2, width: 1, dash: [4, 4] });
        line(c, pts, { color: C.ink2, width: 1.2, alpha: .6 });
        pts.forEach(([x, y], i) => dot(c, x, y, i === 14 ? 6 : 4, i === 14 ? C.red : C.blue));
        const hx = pts[14][0]; arrow(c, hx + 14, yc - A, hx + 14, yc + A, { color: C.red, width: 1.6, both: true, head: 8 });
        // wavelength bracket between crests
        const crest = n => (Math.PI / 2 + w * t + TAU * n) / k;
        let n0 = Math.ceil((0 - (Math.PI / 2 + w * t) / k) / lam); let xa = crest(n0); if (xa < 0) xa += lam;
        if (xa + lam <= Lm) { const X1 = x0 + xa * sx, X2 = x0 + (xa + lam) * sx, yb2 = yc - A - 14; arrow(c, X1, yb2, X2, yb2, { color: C.violet, width: 1.4, both: true, head: 7 }); rich(c, `*λ* = ${fix(lam, 2)} m`, (X1 + X2) / 2, yb2 - 10, { align: 'center', color: C.violet, size: 12, bg: alpha(C.paper2, .85) }); }
        if (A > 8) { line(c, [[x1 - 6, yc], [x1 - 6, yc - A]], { color: C.orange, width: 1.4 }); rich(c, '*A*', x1 - 12, yc - A / 2, { align: 'right', size: 13, color: C.orange }); }
      } else {
        const rows = 7, cols = W < 560 ? 40 : 66, top = ya + 36, gh = graph ? hh * 0.36 : 0, bot = yb - 14 - gh, rowH = (bot - top) / rows;
        const AL = amp * 0.85 / k; // metres
        for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
          const xm = (q + 0.5) / cols * Lm, j = jit[(r * cols + q) % jit.length];
          const s = AL * Math.sin(k * xm - w * t);
          const X = x0 + (xm + s + j[0] * Lm / cols) * sx, Y = top + (r + 0.5 + j[1]) * rowH;
          const hi = q === Math.round(cols * 0.3) && r === 3; dot(c, X, Y, hi ? 5.5 : 3.2, hi ? C.red : C.blue);
        }
        const hx = x0 + ((Math.round(cols * 0.3) + 0.5) / cols * Lm) * sx, ry = top + 3.5 * rowH + 14;
        arrow(c, hx - AL * sx, ry, hx + AL * sx, ry, { color: C.red, width: 1.6, both: true, head: 7 });
        // C and R labels
        for (let n = -2; n < 12; n++) {
          const xc = (Math.PI + w * t + TAU * n) / k, xr = (w * t + TAU * n) / k;
          for (const [xx, lab, col] of [[xc, 'C', C.orange], [xr, 'R', C.violet]]) { if (xx > 0.05 && xx < Lm - 0.05) { rich(c, lab, x0 + xx * sx, top - 8, { align: 'center', size: 13, w: 700, color: col }); if (graph) line(c, [[x0 + xx * sx, top - 2], [x0 + xx * sx, yb - 10]], { color: alpha(col, .35), width: 1, dash: [3, 4] }); } }
        }
        if (graph) {
          const gy0 = yb - 14 - gh / 2, gA = gh * 0.38;
          line(c, [[x0, gy0], [x1, gy0]], { color: C.ink2, width: 1 });
          const pts = []; for (let i = 0; i <= 200; i++) { const xm = i / 200 * Lm; pts.push([x0 + xm * sx, gy0 - gA * Math.sin(k * xm - w * t)]); }
          line(c, pts, { color: C.ink, width: 2 });
          rich(c, 'displacement *s* (→ positive)', x0 + 4, gy0 - gA - 6, { size: 11, color: C.muted });
          rich(c, 'position *x*', x1, gy0 + 12, { size: 11, color: C.muted, align: 'right' });
        }
      }
    }
    ro.set('lam', fix(lam, 2) + ' m'); ro.set('T', fix(1 / f, 2) + ' s'); ro.set('v', `${fix(v, 2)} m s⁻¹`);
  }, [S]);
  const g0 = Group(P.side, 'Show');
  Seg(g0, { options: [['T', 'Transverse'], ['L', 'Longitudinal'], ['both', 'Both']], value: mode, onchange: m => mode = m });
  Switch(g0, { label: 'Displacement–position graph (longitudinal)', value: graph, onchange: x => graph = x });
  const g = Group(P.side, 'Wave');
  Slider(g, { id: 'ty-a', label: 'Amplitude', min: 0.1, max: 1, step: 0.05, value: amp, fmt: x => fix(x * 100, 0) + '%', oninput: x => amp = x });
  Slider(g, { id: 'ty-f', label: 'Frequency <i>f</i>', min: 0.2, max: 2, step: 0.05, value: f, unit: 'Hz', fmt: x => fix(x, 2), oninput: x => f = x });
  Slider(g, { id: 'ty-v', label: 'Wave speed <i>v</i>', min: 0.4, max: 3, step: 0.1, value: v, unit: 'm s⁻¹', fmt: x => fix(x, 1), oninput: x => v = x });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'Slow-mo', e => { slow = !slow; e.currentTarget.classList.toggle('pri', slow); });
  const ro = Readout(Group(P.side, 'Derived'), [['lam', 'λ = <i>v</i>/<i>f</i>', 'hl'], ['T', '<i>T</i> = 1/<i>f</i>'], ['v', '<i>v</i> = <i>fλ</i>']]);
  Note(P.side, 'Watch the <b style="color:var(--ps-red)">red particle</b>: it only oscillates about a fixed point. The <b>wave</b> travels, the medium doesn’t. On the graph, compressions sit where displacement is zero and the slope is negative.');
  const sc = Card(P.below, 'Transverse or longitudinal? Categorise (2.1.2)', null, 'wide');
  Sorter(sc, { cats: [['T', 'Transverse'], ['L', 'Longitudinal']], items: [
    { t: 'Sound in air', c: 'L', why: 'pressure wave, air molecules oscillate along the direction of travel' }, { t: 'Light', c: 'T', why: 'all EM waves are transverse' }, { t: 'Microwaves', c: 'T', why: 'EM wave' }, { t: 'X-rays', c: 'T', why: 'EM wave' },
    { t: 'Ultrasound', c: 'L', why: 'it is sound' }, { t: 'Seismic P-wave', c: 'L', why: 'P = primary / pressure' }, { t: 'Seismic S-wave', c: 'T', why: 'S = secondary / shear' },
    { t: 'Wave on a guitar string', c: 'T' }, { t: 'Ripples on water', c: 'T', why: 'treated as transverse at A-level' }, { t: 'Slinky pushed back and forth', c: 'L' }, { t: 'Slinky shaken side to side', c: 'T' }, { t: 'Radio waves', c: 'T', why: 'EM wave' },
  ] });
}

/* ---------- graph image helper for drills ---------- */
function graphImg(o) {
  const w = 560, h = 230, cv = document.createElement('canvas'); cv.width = w * 2; cv.height = h * 2;
  const ctx = cv.getContext('2d'); ctx.scale(2, 2);
  const S = { ctx, w, h }; ctx.fillStyle = Theme.c.paper2; ctx.fillRect(0, 0, w, h);
  const pl = new Plot(S, { xmin: 0, xmax: o.xmax, ymin: -o.ymax, ymax: o.ymax, xlabel: o.xlabel, ylabel: o.ylabel, nx: 12, ny: 6 });
  pl.axes(); pl.curve(x => o.A * Math.sin(TAU * x / o.P + (o.ph || 0)), { color: Theme.c.blue, width: 2.2 });
  return `<img alt="wave graph" src="${cv.toDataURL()}" style="width:100%;max-width:560px;border:1px solid var(--ps-line);border-radius:4px;display:block;margin-top:8px">`;
}

/* ---------- Lab B: wave graphs & phase ---------- */
function mountGraphs(P, L) {
  const row = el('div'); P.stageBox.append(row);
  const S1 = L.stage(row, { aspect: 2.5, minH: 220, maxH: 300, plain: true, tag: 'displacement – distance (snapshot)' });
  const S2 = L.stage(row, { aspect: 2.5, minH: 220, maxH: 300, plain: true, tag: 'displacement – time (for points P and Q)' });
  let A = 3, lam = 40, f = 1.0, t = 0, run = true, xP = 20, xQ = 50, ann = true, dragQ = null;
  const p1 = new Plot(S1, { xmin: 0, xmax: 100, ymin: -6, ymax: 6, xlabel: 'distance *x* / cm', ylabel: '*y* / cm', pad: { t: 30 } });
  const p2 = new Plot(S2, { xmin: 0, xmax: 2, ymin: -6, ymax: 6, xlabel: 'time *t* / s', ylabel: '*y* / cm', pad: { t: 30 } });
  const y = (x, tt) => A * Math.sin(TAU * (x / lam - f * tt));
  Pointer(S1, { scroll: true, hit: (px, py) => { p1.layout(); for (const [id, xv] of [['P', xP], ['Q', xQ]]) if (Math.abs(px - p1.X(xv)) < 16 && p1.inside(px, py, 10)) return id; return null; }, down: t => dragQ = t, up: () => dragQ = null, move: (id, px) => { const v = Math.round(clamp(p1.ix(px), 0, 100)); if (id === 'P') xP = v; else xQ = v; } });
  L.loop(dt => {
    if (run) t += dt * 0.5;
    const C = Theme.c;
    // distance graph
    S1.begin(); p1.axes();
    p1.curve(x => y(x, t), { color: C.blue, width: 2.4, n: 400 });
    for (const [id, xv, col] of [['P', xP, C.red], ['Q', xQ, C.violet]]) {
      p1.vline(xv, { color: alpha(col, .5), dash: [3, 3] });
      const X = p1.X(xv), Y = p1.Y(y(xv, t)); dot(S1.ctx, X, Y, dragQ === id ? 8 : 6.5, col, C.paper2);
      rich(S1.ctx, id, X + 9, p1.y0 + 10, { color: col, size: 13, w: 700 });
    }
    if (ann) {
      const c = S1.ctx; const ph = f * t; // crest where x/lam - ph = 1/4 + n
      let xc = (0.25 + ph) * lam; xc = ((xc % lam) + lam) % lam;
      if (xc + lam <= 100) { const yy = p1.Y(A) - 12; arrow(c, p1.X(xc), yy, p1.X(xc + lam), yy, { color: C.green, width: 1.4, both: true, head: 7 }); rich(c, `*λ* = ${lam} cm`, p1.X(xc + lam / 2), yy - 9, { align: 'center', color: C.green, size: 12, bg: alpha(C.paper2, .9) }); }
      const xa = xc + lam < 100 ? xc + lam : xc; line(c, [[p1.X(xa) + 12, p1.Y(0)], [p1.X(xa) + 12, p1.Y(A)]], { color: C.orange, width: 1.6 }); rich(c, `*A* = ${A} cm`, p1.X(xa) + 18, p1.Y(A / 2), { color: C.orange, size: 12, bg: alpha(C.paper2, .9) });
    }
    rich(S1.ctx, '→ wave travels', p1.x0 + p1.pw - 4, p1.y0 - 12, { align: 'right', size: 11, color: C.muted });
    // time graph
    S2.begin(); p2.axes();
    const tm = t % 2;
    p2.curve(tt => y(xP, tt), { color: C.red, width: 2.2, n: 300 });
    p2.curve(tt => y(xQ, tt), { color: C.violet, width: 2, dash: [6, 4], n: 300 });
    p2.vline(tm, { color: C.ink2, dash: [] });
    dot(S2.ctx, p2.X(tm), p2.Y(y(xP, tm)), 5, C.red); dot(S2.ctx, p2.X(tm), p2.Y(y(xQ, tm)), 5, C.violet);
    if (ann) { const T = 1 / f; let tc = ((xP / lam - 0.25) / f); tc = ((tc % T) + T) % T; if (tc + T <= 2) { const yy = p2.Y(A) - 12; arrow(S2.ctx, p2.X(tc), yy, p2.X(tc + T), yy, { color: C.green, width: 1.4, both: true, head: 7 }); rich(S2.ctx, `*T* = ${fix(T, 2)} s`, p2.X(tc + T / 2), yy - 9, { align: 'center', color: C.green, size: 12, bg: alpha(C.paper2, .9) }); } }
    const dphi = (((xQ - xP) / lam) % 1 + 1) % 1; const deg = dphi * 360;
    ro.set('v', `${fix(f * lam / 100, 3)} m s⁻¹`); ro.set('T', fix(1 / f, 3) + ' s');
    ro.set('dx', `${fix(Math.abs(xQ - xP), 0)} cm = ${fix(Math.abs(xQ - xP) / lam, 3)} λ`);
    ro.set('ph', `${fix(deg, 0)}°  =  ${fix(dphi * 2, 2)}π rad`);
    const st = deg < 3 || deg > 357 ? '<b style="color:var(--ps-green)">in phase</b>' : Math.abs(deg - 180) < 3 ? '<b style="color:var(--ps-red)">antiphase</b>' : 'out of phase';
    ro.set('st', st);
  }, [S1, S2]);
  const g = Group(P.side, 'Wave');
  Slider(g, { id: 'wg-a', label: 'Amplitude <i>A</i>', min: 1, max: 5, step: 0.5, value: A, unit: 'cm', fmt: v => fix(v, 1), oninput: v => A = v });
  Slider(g, { id: 'wg-l', label: 'Wavelength λ', min: 10, max: 60, step: 5, value: lam, unit: 'cm', fmt: v => fix(v, 0), oninput: v => lam = v });
  Slider(g, { id: 'wg-f', label: 'Frequency <i>f</i>', min: 0.5, max: 4, step: 0.25, value: f, unit: 'Hz', fmt: v => fix(v, 2), oninput: v => f = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'Annotations', e => { ann = !ann; });
  const g2 = Group(P.side, 'Phase difference P → Q');
  const sq = Slider(g2, { id: 'wg-q', label: 'Q position', min: 0, max: 100, step: 1, value: xQ, unit: 'cm', fmt: v => fix(v, 0), oninput: v => xQ = v });
  const ro = Readout(g2, [['v', '<i>v</i> = <i>fλ</i>'], ['T', '<i>T</i> = 1/<i>f</i>'], ['dx', 'Separation Δ<i>x</i>'], ['ph', 'Δφ', 'hl'], ['st', 'Status']]);
  L.loop(() => sq.set(xQ), []);
  Note(P.side, 'Drag <b style="color:var(--ps-red)">P</b> and <b style="color:var(--ps-violet)">Q</b> on the top graph. The bottom graph shows each point’s own oscillation over time: same shape, shifted by the phase difference.');
  EqCard(P.below, 'Reading wave graphs', [['y\\text{–}x \\text{ graph} \\to A,\\ \\lambda', 'snapshot in space'], ['y\\text{–}t \\text{ graph} \\to A,\\ T', 'one point over time'], ['f = \\frac{1}{T}', ''], ['v = f\\lambda', ''], ['\\Delta\\phi = \\frac{2\\pi\\Delta x}{\\lambda}', 'radians (×360/2π for °)']]);
  Drill(P.below, { title: 'Read-the-graph drill', gens: [
    () => { const Av = randi(1, 5), Lv = pick([10, 15, 20, 25, 30, 40]); return { q: `Read the wavelength from this displacement–distance graph.${graphImg({ xmax: 100, ymax: 6, A: Av, P: Lv, xlabel: 'distance *x* / cm', ylabel: '*y* / cm' })}`, a: Lv, unit: 'cm', tol: 0.03, steps: ['Measure crest to crest (or across several waves and divide, for accuracy)', `λ = ${Lv} cm`] }; },
    () => { const Av = randi(1, 5), Tv = pick([0.2, 0.25, 0.4, 0.5]); return { q: `This is a displacement–time graph. Find the <b>frequency</b>.${graphImg({ xmax: 2, ymax: 6, A: Av, P: Tv, xlabel: 'time *t* / s', ylabel: '*y* / cm' })}`, a: 1 / Tv, unit: 'Hz', tol: 0.03, steps: [`Period from the graph: T = ${Tv} s (a y–t graph gives T, not λ)`, `f = 1/T = 1/${Tv} = ${fix(1 / Tv, 2)} Hz`] }; },
    () => { const Av = randi(1, 5), Lv = pick([20, 25, 40, 50]); return { q: `Find the <b>amplitude</b>.${graphImg({ xmax: 100, ymax: 6, A: Av, P: Lv, xlabel: 'distance *x* / cm', ylabel: '*y* / cm' })}`, a: Av, unit: 'cm', tol: 0.03, steps: ['Amplitude = maximum displacement from the equilibrium position', `Not peak-to-peak: A = ${Av} cm`] }; },
    () => { const Lv = pick([20, 40, 60, 80]), d = pick([0.25, 0.5, 0.75, 1 / 3]) * Lv; return { q: `Two points on a wave are <b>${fix(d, 1)} cm</b> apart. The wavelength is <b>${Lv} cm</b>. Find their phase difference in degrees.`, a: 360 * d / Lv, unit: '°', tol: 0.01, steps: [`Δφ = 360° × Δx/λ`, `= 360 × ${fix(d, 1)}/${Lv} = ${fix(360 * d / Lv, 0)}°`] }; },
    () => { const f = pick([256, 440, 512, 1000, 2000]), vv = 340; return { q: `A sound of frequency <b>${f} Hz</b> travels at <b>${vv} m s⁻¹</b>. Find its wavelength.`, a: vv / f, unit: 'm', tol: 0.01, steps: ['v = fλ ⇒ λ = v/f', `λ = ${vv}/${f} = ${num(vv / f, 3)} m`] }; },
  ] });
}

/* ---------- Lab C: polarisation ---------- */
function mountPolar(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.75, minH: 340, maxH: 520, plain: false, mobileAspect: 1.1 });
  let a1 = 0, a2 = 30, kind = 'light', spin = false, t = 0;
  const planes = Array.from({ length: 7 }, (_, i) => ({ b: i * Math.PI / 7, target: i * Math.PI / 7 }));
  L.loop(dt => {
    t += dt; if (spin) { a2 = (a2 + dt * 30) % 180; s2.set(a2); }
    for (const p of planes) { if (Math.random() < dt * 1.2) p.target = rand(0, Math.PI); p.b += (p.target - p.b) * Math.min(1, dt * 3); }
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h;
    const small = W < 600;
    const U = Math.min(W / 13, Hh / 6.2), X0 = small ? 20 : 40, Y0 = Hh * 0.42, ph = 35 * DEG, dk = 0.55;
    const pr = (x, y, z) => [X0 + z * U + x * U * dk * Math.cos(ph), Y0 - y * U - x * U * dk * Math.sin(ph)];
    const Zs = (W - X0 * 2) / U; const Z1 = Zs * 0.3, Z2 = Zs * 0.62, Z3 = Zs * 0.94, Amp = 1.25, k = TAU / 1.3, w = TAU * 0.9;
    // beam axis
    line(c, [pr(0, 0, 0), pr(0, 0, Z3)], { color: C.muted, width: 1, dash: [4, 4] });
    const wave = (za, zb, ang, amp, col, alp = 1, width = 2) => {
      const pts = []; const ux = Math.sin(ang), uy = Math.cos(ang);
      for (let z = za; z <= zb; z += 0.04) { const s = amp * Math.sin(k * z - w * t); pts.push(pr(s * ux, s * uy, z)); }
      line(c, pts, { color: col, width, alpha: alp });
      for (let z = za + 0.15; z <= zb; z += 0.35) { const s = amp * Math.sin(k * z - w * t); const a = pr(0, 0, z), b = pr(s * ux, s * uy, z); line(c, [a, b], { color: col, width: 1, alpha: alp * 0.5 }); }
    };
    const filter = (z, ang, label) => {
      const R = 1.7, pts = []; for (let i = 0; i <= 60; i++) { const q = i / 60 * TAU; pts.push(pr(R * Math.cos(q), R * Math.sin(q), z)); }
      c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fillStyle = alpha(C.ink2, 0.08); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 1.6; c.stroke();
      const ux = Math.sin(ang * DEG), uy = Math.cos(ang * DEG), vx = uy, vy = -ux;
      for (let o = -1.4; o <= 1.41; o += 0.35) { const half = Math.sqrt(Math.max(0, R * R - o * o)) * 0.96; const a = pr(vx * o - ux * half, vy * o - uy * half, z), b = pr(vx * o + ux * half, vy * o + uy * half, z); line(c, [a, b], { color: C.ink2, width: 1, alpha: .55 }); }
      const lp = pr(0, -R - 0.25, z); rich(c, label, lp[0], lp[1] + 8, { align: 'center', size: 11.5, color: C.ink2, w: 600, base: 'top' });
      const tp = pr(0, R + 0.1, z); rich(c, `${fix(ang, 0)}°`, tp[0], tp[1] - 6, { align: 'center', size: 11, color: C.muted, base: 'bottom', mono: true });
    };
    const inten2 = Math.cos((a2 - a1) * DEG) ** 2;
    if (kind === 'light') {
      for (const p of planes) wave(0, Z1, p.b, Amp, C.orange, 0.55, 1.6);
      filter(Z1, a1, 'polariser');
      wave(Z1, Z2, a1 * DEG, Amp * Math.SQRT1_2, C.blue, 1, 2.2);
      filter(Z2, a2, 'analyser');
      if (inten2 > 0.002) wave(Z2, Z3, a2 * DEG, Amp * Math.SQRT1_2 * Math.cos((a2 - a1) * DEG), C.violet, 1, 2.2);
    } else {
      // longitudinal: particles along beam, oscillating along z
      const pass = (za, zb) => { for (let z = za + 0.1; z < zb; z += 0.16) { const s = 0.18 * Math.sin(k * z - w * t); for (const yy of [-0.5, 0, 0.5]) { const p = pr(0, yy, z + s); dot(c, p[0], p[1], 2.6, C.blue); } } };
      pass(0, Z1); filter(Z1, a1, 'filter 1'); pass(Z1, Z2); filter(Z2, a2, 'filter 2'); pass(Z2, Z3);
    }
    // detector
    const dp = pr(0, 0, Z3); const I = kind === 'light' ? 0.5 * inten2 : 1;
    c.fillStyle = C.paper3; c.strokeStyle = C.ink2; c.lineWidth = 1.5; rrect(c, dp[0] - 6, dp[1] - 44, 16, 88, 3); c.fill(); c.stroke();
    c.fillStyle = kind === 'light' ? C.violet : C.blue; const bh = 84 * I; c.fillRect(dp[0] - 4, dp[1] + 42 - bh, 12, bh);
    rich(c, `${fix(I * 100, 0)}%`, dp[0] + 2, dp[1] - 52, { align: 'center', size: 12, color: C.ink, mono: true, w: 600 });
    rich(c, kind === 'light' ? 'source (unpolarised)' : 'sound source', pr(0, 2.1, 0.1)[0], pr(0, 2.1, 0)[1], { size: 11.5, color: C.muted });
    // end-on views
    const ey = Hh - 58, ex = [W * 0.18, W * 0.46, W * 0.74]; const labels = kind === 'light' ? ['before polariser', 'after polariser', 'after analyser'] : ['before', 'between', 'after'];
    labels.forEach((lab, i) => {
      const x = ex[i]; c.beginPath(); c.arc(x, ey, 26, 0, TAU); c.strokeStyle = C.line2; c.lineWidth = 1; c.stroke();
      rich(c, lab, x, ey + 42, { align: 'center', size: 11, color: C.muted });
      if (kind === 'light') {
        if (i === 0) for (let q = 0; q < 4; q++) { const a = q * Math.PI / 4; arrow(c, x - 22 * Math.sin(a), ey + 22 * Math.cos(a), x + 22 * Math.sin(a), ey - 22 * Math.cos(a), { color: C.orange, width: 1.6, both: true, head: 6 }); }
        else { const ang = (i === 1 ? a1 : a2) * DEG; const m = i === 1 ? 22 : 22 * Math.abs(Math.cos((a2 - a1) * DEG)); if (m > 2) arrow(c, x - m * Math.sin(ang), ey + m * Math.cos(ang), x + m * Math.sin(ang), ey - m * Math.cos(ang), { color: i === 1 ? C.blue : C.violet, width: 2, both: true, head: 7 }); else rich(c, 'none', x, ey, { align: 'center', size: 11, color: C.red }); }
      } else { dot(c, x, ey, 4, C.blue); rich(c, '↔ along beam', x, ey - 36, { align: 'center', size: 10.5, color: C.muted }); }
    });
    ro.set('d', fix(Math.abs(((a2 - a1) % 180 + 180) % 180), 0) + '°'); ro.set('f', kind === 'light' ? fix(inten2 * 100, 0) + '%' : '100%'); ro.set('i', fix(I * 100, 0) + '% of source');
  }, [S]);
  const g0 = Group(P.side, 'Wave type');
  Seg(g0, { options: [['light', 'Light (transverse)'], ['sound', 'Sound (longitudinal)']], value: kind, onchange: v => { kind = v; fl.hidden = v === 'light'; } });
  const g = Group(P.side, 'Filters');
  Slider(g, { id: 'po-a1', label: 'Polariser axis', min: 0, max: 180, step: 1, value: a1, unit: '°', fmt: v => fix(v, 0), oninput: v => a1 = v });
  const s2 = Slider(g, { id: 'po-a2', label: 'Analyser axis', min: 0, max: 180, step: 1, value: a2, unit: '°', fmt: v => fix(v, 0), oninput: v => { a2 = v; spin = false; } });
  const b = Btns(g); Btn(b, '⟳ Rotate analyser', () => spin = !spin, 'pri'); Btn(b, 'Cross them (90°)', () => { spin = false; a2 = (a1 + 90) % 180; s2.set(a2); });
  const ro = Readout(Group(P.side, 'Detector'), [['d', 'Angle between axes'], ['f', 'Passes the analyser'], ['i', 'Intensity at detector', 'hl']]);
  const fl = Note(P.side, '<b>Sound can’t be polarised.</b> Its oscillations are already parallel to the direction of travel, so there’s no transverse direction for a filter to select. The intensity is unchanged at any angle.', 'flag info'); fl.hidden = true;
  Note(P.side, '<b>Crossed polarisers block everything.</b> That only works because light’s oscillations are transverse. Polarisation is the evidence that a wave is transverse.');
  Card(P.below, 'What to write in the exam', list(['<b>Polarisation</b>: restricting the oscillations of a transverse wave to a single plane that contains the direction of travel.', 'Only <b>transverse</b> waves can be polarised, so polarisation shows light is transverse.', 'Unpolarised light through a polariser: half the intensity gets through (the average of cos² is ½).', 'Uses: Polaroid sunglasses cut glare from reflected, partly polarised light; LCD screens; stress analysis in plastics; aligning TV/radio aerials (radio waves from a transmitter are polarised).']));
  Card(P.below, 'Extension (not on the CCEA list)', `<p>The fraction passing the analyser follows Malus’s law ${tex('I = I_0\\cos^2\\theta')}. You won’t be asked to calculate it here, but it explains the intensity bar: 90° gives cos² = 0.</p>`);
}

/* ---------- Lab D: EM spectrum ---------- */
const REG = [
  ['Gamma rays', -14.5, -11, -12, 'Radioactive decay of nuclei; sterilising equipment; radiotherapy', 'violet'],
  ['X-rays', -11, -8, -10, 'Medical imaging, CT scans, crystallography (λ ≈ atomic spacing)', 'blue'],
  ['Ultraviolet', -8, Math.log10(4e-7), -7.5, 'Sunburn, fluorescence, sterilising water', 'cyan'],
  ['Visible', Math.log10(4e-7), Math.log10(7e-7), Math.log10(5e-7), 'Violet 400 nm → red 700 nm', 'green'],
  ['Infrared', Math.log10(7e-7), -3, -5, 'Thermal imaging, TV remotes, optical fibres (≈1.5 µm)', 'red'],
  ['Microwaves', -3, -1, -2, 'Microwave ovens (≈12 cm), mobile phones, radar, satellite links', 'orange'],
  ['Radio waves', -1, 4.5, 1, 'Broadcasting: FM ≈ 3 m, long wave ≈ 1.5 km', 'ink2'],
];
function mountSpectrum(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.8, minH: 330, maxH: 480, plain: true });
  let lg = Math.log10(5.5e-7), drag = false;
  const LA = -14.5, LB = 4.5;
  const band = () => ({ x: 20, y: 46, w: S.w - 40, h: 54 });
  const LX = v => { const b = band(); return b.x + (v - LA) / (LB - LA) * b.w; };
  Pointer(S, { hit: (x, y) => y < band().y + band().h + 40 ? 'b' : null, down: () => drag = true, up: () => drag = false, move: (t, x) => { const b = band(); lg = clamp(LA + (x - b.x) / b.w * (LB - LA), LA + 0.05, LB - 0.05); sl.set(lg); } , scroll: true });
  let t = 0;
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h, b = band();
    c.fillStyle = C.paper2; c.fillRect(0, 0, W, Hh);
    // regions
    REG.forEach(([n, a, z, typ, use, col], i) => {
      const x1 = LX(a), x2 = LX(z);
      if (n === 'Visible') { const gr = c.createLinearGradient(x1, 0, x2, 0); for (let q = 0; q <= 10; q++) gr.addColorStop(q / 10, wlColor(400 + q * 30)); c.fillStyle = gr; c.fillRect(x1, b.y, Math.max(2, x2 - x1), b.h); }
      else { c.fillStyle = alpha(C[col], i % 2 ? 0.16 : 0.24); c.fillRect(x1, b.y, x2 - x1, b.h); }
      if (n !== 'Visible') { c.save(); c.beginPath(); c.rect(x1, b.y, x2 - x1, b.h); c.clip(); rich(c, W < 640 ? n.split(' ')[0].replace('Ultraviolet', 'UV').replace('Microwaves', 'Micro').replace('Infrared', 'IR') : n, (x1 + x2) / 2, b.y + b.h / 2, { align: 'center', size: W < 640 ? 10.5 : 12, w: 600, color: C.ink }); c.restore(); }
    });
    c.strokeStyle = C.ink2; c.lineWidth = 1; c.strokeRect(b.x + .5, b.y + .5, b.w, b.h);
    // log axis
    c.font = FONT.mono(9.5); c.fillStyle = C.muted; c.textAlign = 'center'; c.textBaseline = 'top';
    for (let e = -14; e <= 4; e++) { const x = LX(e); line(c, [[x, b.y + b.h], [x, b.y + b.h + (e % 2 === 0 ? 7 : 4)]], { color: C.ink2, width: 1 }); if (e % 2 === 0 || W > 800) c.fillText('10' + supx(e), x, b.y + b.h + 9); }
    rich(c, 'wavelength *λ* / m  (log scale — each tick ×10)', b.x, b.y - 14, { size: 11, color: C.muted });
    rich(c, '← higher frequency, higher energy', b.x + b.w, b.y - 14, { size: 11, color: C.muted, align: 'right' });
    // marker
    const mx = LX(lg); line(c, [[mx, b.y - 4], [mx, b.y + b.h + 4]], { color: C.ink, width: 2.5 });
    c.beginPath(); c.moveTo(mx, b.y - 2); c.lineTo(mx - 7, b.y - 12); c.lineTo(mx + 7, b.y - 12); c.closePath(); c.fillStyle = C.ink; c.fill();
    const lam = Math.pow(10, lg), fq = c0 / lam; const reg = REG.find(r => lg >= r[1] && lg < r[2]) || REG[6];
    const isVis = lam >= 4e-7 && lam <= 7e-7;
    // wave drawing (not to scale)
    const wy = b.y + b.h + 90, wl = 10 + (lg - LA) / (LB - LA) * 260, col = isVis ? wlColor(lam * 1e9) : (C[reg[5]] || C.ink);
    const pts = []; for (let x = 20; x <= W - 20; x += 2) pts.push([x, wy - 26 * Math.sin(TAU * ((x - 20) / wl - t * 0.6))]);
    line(c, pts, { color: col, width: 2.4 });
    rich(c, 'wave drawn with a relative wavelength, not to scale', W - 20, wy + 44, { align: 'right', size: 10.5, color: C.muted });
    // info block
    const iy = wy + 70;
    c.fillStyle = C.ink; c.font = FONT.disp(Math.min(28, W / 18)); c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText(reg[0].toUpperCase(), 20, iy);
    rich(c, reg[4], 20, iy + 42, { size: 13, color: C.ink2 });
    if (isVis) { c.fillStyle = wlColor(lam * 1e9); c.fillRect(W - 80, iy, 60, 32); c.strokeStyle = C.line2; c.strokeRect(W - 79.5, iy + .5, 59, 31); }
    const rawP = { m: withP(lam, 'm'), f: withP(fq, 'Hz') };
    ro.set('l', `${sci(lam, 3)} m`); ro.set('lp', rawP.m); ro.set('f', `${sci(fq, 3)} Hz`); ro.set('fp', rawP.f); ro.set('r', reg[0]); ro.set('t', `≈ ${sci(Math.pow(10, reg[3]), 1)} m`);
  }, [S]);
  function withP(x, u) { const P = [[12, 'T'], [9, 'G'], [6, 'M'], [3, 'k'], [0, ''], [-3, 'm'], [-6, 'µ'], [-9, 'n'], [-12, 'p'], [-15, 'f']]; const e = Math.floor(Math.log10(x)); const p = P.find(q => e >= q[0]) || P[P.length - 1]; return `${num(x / Math.pow(10, p[0]), 3)} ${p[1]}${u}`; }
  const g = Group(P.side, 'Wavelength');
  const sl = Slider(g, { id: 'em-l', label: 'log<sub>10</sub>(λ / m)', min: LA + 0.05, max: LB - 0.05, step: 0.01, value: lg, fmt: v => fix(v, 2), oninput: v => lg = v });
  const js = el('div', { class: 'seg wrapit' }); REG.forEach(r => js.append(el('button', { type: 'button', onclick: () => { lg = r[3]; sl.set(lg); } }, r[0].replace(' rays', '').replace(' waves', '')))); g.append(js);
  const ro = Readout(Group(P.side, 'Readout'), [['r', 'Region', 'hl'], ['l', 'λ'], ['lp', 'λ with prefix'], ['f', 'f = c/λ'], ['fp', 'f with prefix'], ['t', 'Typical λ for region']]);
  Note(P.side, 'All EM waves travel at <b>c = 3.00 × 10⁸ m s⁻¹</b> in a vacuum and are all <b>transverse</b>. Only λ and f change across the spectrum.');
  Card(P.below, 'Typical wavelengths (learn one value per region)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Region</th><th>Typical λ</th><th>Rough range</th></tr>
    <tr><td>Gamma</td><td>10⁻¹² m</td><td>&lt; 10⁻¹¹ m</td></tr><tr><td>X-ray</td><td>10⁻¹⁰ m</td><td>10⁻¹¹ – 10⁻⁸ m</td></tr><tr><td>Ultraviolet</td><td>10⁻⁸ – 10⁻⁷ m</td><td>10⁻⁸ – 4×10⁻⁷ m</td></tr>
    <tr><td>Visible</td><td>5×10⁻⁷ m</td><td>400 – 700 nm</td></tr><tr><td>Infrared</td><td>10⁻⁵ m</td><td>7×10⁻⁷ – 10⁻³ m</td></tr><tr><td>Microwave</td><td>10⁻² m</td><td>10⁻³ – 10⁻¹ m</td></tr><tr><td>Radio</td><td>10 m – 10³ m</td><td>&gt; 10⁻¹ m</td></tr></table></div>
    <p class="muted" style="margin-top:8px;font-size:13px">Boundaries overlap; examiners accept sensible order-of-magnitude values. Must-know: <b>violet 400 nm, red 700 nm</b>.</p>`);
  // ordering game
  const og = Card(P.below, 'Order challenge: shortest → longest λ', null);
  const ogBox = el('div'); og.append(ogBox);
  function order() {
    ogBox.innerHTML = ''; const seq = []; const fb = el('div', { class: 'key', style: { minHeight: '22px', marginTop: '10px' } }, 'Click the regions from shortest to longest wavelength.');
    const out = el('div', { class: 'mono', style: { minHeight: '22px', fontSize: '13px', marginBottom: '8px' } });
    const opts = el('div', { class: 'opts' });
    shuffle(REG.map(r => r[0])).forEach(n => opts.append(el('button', { type: 'button', onclick: e => {
      const btn = e.currentTarget; if (btn.disabled) return; const want = REG[seq.length][0];
      if (n === want) { seq.push(n); btn.classList.add('right'); btn.disabled = true; out.textContent = seq.join(' → '); if (seq.length === REG.length) fb.innerHTML = '<b style="color:var(--ps-green)">✓ Perfect order.</b> Mnemonic: <i>Gamma X-rays Use Violent Infra-Micro Radiation</i>, or make up your own.'; }
      else { btn.classList.add('wrong'); setTimeout(() => btn.classList.remove('wrong'), 500); fb.innerHTML = `✗ Not ${n}. Think about which comes next after ${seq[seq.length - 1] || 'the start'}.`; }
    } }, n)));
    ogBox.append(out, opts, fb, el('div', { class: 'btns', style: { marginTop: '10px' } }, el('button', { class: 'btn', type: 'button', onclick: order }, 'Reset')));
  }
  order();
  Drill(P.below, { title: 'EM + wave equation drill', cls: 'wide', gens: [
    () => { const f = pick([88.1, 97.4, 101.2, 104.6]); return { q: `An FM radio station broadcasts at <b>${f} MHz</b>. Find the wavelength (c = 3.00 × 10⁸ m s⁻¹).`, a: c0 / (f * 1e6), unit: 'm', tol: 0.01, steps: [`f = ${f} × 10⁶ Hz`, `λ = c/f = 3.00×10⁸ / ${f}×10⁶ = ${fix(c0 / (f * 1e6), 2)} m`] }; },
    () => { const f = pick([2.45, 5.0, 1.8]); return { q: `A microwave oven operates at <b>${f} GHz</b>. Find the wavelength in cm.`, a: c0 / (f * 1e9) * 100, unit: 'cm', tol: 0.01, steps: [`λ = c/f = 3.00×10⁸ / ${f}×10⁹ = ${num(c0 / (f * 1e9), 3)} m`, `= ${fix(c0 / (f * 1e9) * 100, 1)} cm`] }; },
    () => { const nm = randi(400, 700); return { q: `Visible light has λ = <b>${nm} nm</b>. Find its frequency.`, a: c0 / (nm * 1e-9), unit: 'Hz', tol: 0.01, steps: [`λ = ${nm} × 10⁻⁹ m`, `f = c/λ = ${sci(c0 / (nm * 1e-9), 3)} Hz`] }; },
    () => { const r = pick(REG); return { q: `Which region of the EM spectrum has a typical wavelength of about <b>${sci(Math.pow(10, Math.round(r[3])), 1)} m</b>?`, options: REG.map(x => x[0]), correct: REG.indexOf(r), why: `${r[0]}: ${r[4]}.` }; },
    () => { const T = pick([0.002, 0.005, 0.02, 0.25]); return { q: `A wave has period <b>${T * 1000} ms</b>. Find its frequency.`, a: 1 / T, unit: 'Hz', tol: 0.01, steps: [`T = ${T} s`, `f = 1/T = ${num(1 / T, 3)} Hz`] }; },
  ] });
}

topic({
  id: 'waves', code: '2.1', unit: 'AS 2', title: 'Waves', short: 'Waves',
  blurb: 'A wave moves energy, not matter. Compare transverse and longitudinal motion, read wave graphs like an examiner, polarise light, and map the EM spectrum.',
  outcomes: [
    ['2.1.1', 'demonstrate knowledge and understanding of the terms transverse wave and longitudinal wave', 'types'],
    ['2.1.2', 'categorise waves as transverse or longitudinal', 'types'],
    ['2.1.3', 'analyse graphs to obtain data on amplitude, period, frequency, wavelength and phase', 'graphs'],
    ['2.1.4', 'demonstrate an understanding that polarisation is a phenomenon associated with transverse waves', 'polar'],
    ['2.1.5', 'recall and use the equations f = 1/T and v = fλ', 'graphs'],
    ['2.1.6', 'recall radio waves, microwaves, infrared, visible, ultraviolet, X-rays and gamma rays as regions of the electromagnetic spectrum', 'em'],
    ['2.1.7', 'state typical wavelengths for each of these regions', 'em'],
    ['2.1.8', 'recall that the wavelength of violet light is 400 nm and red light is 700 nm', 'em'],
  ],
  labs: [
    { id: 'types', title: 'Transverse vs longitudinal', hint: 'watch one particle', spec: ['2.1.1', '2.1.2'], mount: mountTypes },
    { id: 'graphs', title: 'Wave graphs & phase', hint: 'y–x vs y–t', spec: ['2.1.3', '2.1.5'], mount: mountGraphs },
    { id: 'polar', title: 'Polarisation', hint: 'rotate the analyser', spec: ['2.1.4'], mount: mountPolar },
    { id: 'em', title: 'EM spectrum', hint: 'drag along λ', spec: ['2.1.6', '2.1.7', '2.1.8'], mount: mountSpectrum },
  ],
  equations: [['f = \\frac{1}{T}', ''], ['v = f\\lambda', ''], ['c = 3.00\\times10^{8}\\,\\text{m s}^{-1}', 'all EM waves in vacuum'], ['\\Delta\\phi = \\frac{360^\\circ\\,\\Delta x}{\\lambda}', ''], ['\\lambda_{\\text{violet}} = 400\\,\\text{nm},\\ \\lambda_{\\text{red}} = 700\\,\\text{nm}', '']],
  traps: ['On a <b>y–t</b> graph the repeat distance is the <b>period</b>, not the wavelength.', 'Amplitude is measured from the equilibrium line, not peak to peak.', 'Convert nm → m (×10⁻⁹) and MHz → Hz (×10⁶) before using v = fλ.', 'Give phase difference with units: degrees or radians.', 'Sound is longitudinal, so it can’t be polarised. That is exactly why polarisation proves light is transverse.', 'In a longitudinal wave, particles oscillate <b>parallel</b> to the direction of <b>energy transfer</b>. Say “energy transfer”, not just “the wave”.'],
});
})();

/* ================= 2.2 Refraction ================= */
(() => {
const MATS = { glass: [1.50, 'Crown glass'], perspex: [1.49, 'Perspex'], water: [1.33, 'Water'], diamond: [2.42, 'Diamond'] };
function drawRays(c, segs, color) { for (const [x1, y1, x2, y2, I] of segs) { c.save(); c.globalAlpha = Math.min(1, I * 1.1); c.strokeStyle = color; c.lineWidth = 1 + 2.2 * I; c.shadowColor = color; c.shadowBlur = 6 * I; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore(); } }
function angArc(c, x, y, r, a0, a1, col, lab) { c.save(); c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y, r, Math.min(a0, a1), Math.max(a0, a1)); c.stroke(); c.restore(); if (lab) { const m = (a0 + a1) / 2; rich(c, lab, x + Math.cos(m) * (r + 14), y + Math.sin(m) * (r + 14), { align: 'center', size: 12.5, w: 600, color: col }); } }

/* ---------- Lab A: ray box & blocks ---------- */
function mountBlock(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.7, minH: 320, maxH: 500, mobileAspect: 1 });
  const S2 = L.stage(P.stageBox, { aspect: 2.8, minH: 220, maxH: 280, plain: true });
  let mat = 'glass', shape = 'rect', ideg = 40, rows = [], drag = false;
  const n = () => MATS[mat][0];
  const geo = () => { const W = S1.w, H = S1.h; return shape === 'rect' ? { W, H, hx: W / 2, hy: H * 0.34, bx: W * 0.28, by: H * 0.34, bw: W * 0.44, bh: H * 0.38 } : { W, H, hx: W / 2, hy: H * 0.5, R: Math.min(W * 0.3, H * 0.4) }; };
  Pointer(S1, { hit: (px, py) => { const g = geo(); return py < g.hy - 10 || shape !== 'rect' ? 'r' : null; }, down: () => drag = true, up: () => drag = false, move: (_, px, py) => { const g = geo(); const a = shape === 'rect' ? Math.atan2(g.hx - px, g.hy - py) : Math.atan2(g.hx - px, py - g.hy); ideg = clamp(Math.round(Math.abs(a / DEG)), 0, 85); si.set(ideg); } });
  const plot = new Plot(S2, { xlabel: 'sin *r*', ylabel: 'sin *i*', xmin: 0, xmax: 1, ymin: 0, ymax: 1, pad: { l: 50, r: 14, t: 12, b: 40 } });
  L.loop(() => {
    const c = S1.begin(), C = Theme.c, g = geo(), W = g.W, H = g.H, N = n(), ir = ideg * DEG;
    let polys, src, dir, rOut = NaN, tir = false;
    if (shape === 'rect') {
      polys = [{ n: N, pts: [[g.bx, g.by], [g.bx + g.bw, g.by], [g.bx + g.bw, g.by + g.bh], [g.bx, g.by + g.bh]] }];
      c.fillStyle = alpha(C.cyan, .12); c.fillRect(g.bx, g.by, g.bw, g.bh); c.strokeStyle = alpha(C.cyan, .8); c.lineWidth = 1.5; c.strokeRect(g.bx, g.by, g.bw, g.bh);
      dir = [Math.sin(ir), Math.cos(ir)]; src = [g.hx - dir[0] * 600, g.hy - dir[1] * 600];
      rOut = Math.asin(Math.sin(ir) / N) / DEG;
      line(c, [[g.hx, g.hy - 110], [g.hx, g.hy + 110]], { color: C.muted, width: 1, dash: [5, 4] }); rich(c, 'normal', g.hx + 6, g.hy - 104, { size: 11, color: C.muted });
      if (ideg > 0.5) { angArc(c, g.hx, g.hy, 46, -Math.PI / 2, -Math.PI / 2 - ir, C.orange, `*i* = ${ideg}°`); angArc(c, g.hx, g.hy, 58, Math.PI / 2, Math.PI / 2 - rOut * DEG, C.green, `*r* = ${fix(rOut, 1)}°`); }
    } else {
      const pts = arcPts(g.hx, g.hy, g.R, 0, Math.PI, 120); polys = [{ n: N, pts }];
      c.beginPath(); c.moveTo(g.hx + g.R, g.hy); pts.forEach(p => c.lineTo(p[0], p[1])); c.closePath(); c.fillStyle = alpha(C.cyan, .12); c.fill(); c.strokeStyle = alpha(C.cyan, .8); c.lineWidth = 1.5; c.stroke();
      // ray aimed at the centre from inside the curved face (angle i inside glass)
      dir = [Math.sin(ir), -Math.cos(ir)]; src = [g.hx - dir[0] * (g.R + 300), g.hy - dir[1] * (g.R + 300)];
      const sr = N * Math.sin(ir); tir = sr > 1; rOut = tir ? NaN : Math.asin(sr) / DEG;
      line(c, [[g.hx, g.hy - 120], [g.hx, g.hy + g.R + 20]], { color: C.muted, width: 1, dash: [5, 4] });
      if (ideg > 0.5) { angArc(c, g.hx, g.hy, 46, Math.PI / 2, Math.PI / 2 + ir, C.orange, `*i* = ${ideg}°`); if (!tir) angArc(c, g.hx, g.hy, 58, -Math.PI / 2, -Math.PI / 2 + rOut * DEG, C.green, `*r* = ${fix(rOut, 1)}°`); }
      const cdeg = Math.asin(1 / N) / DEG; rich(c, tir ? `TOTAL INTERNAL REFLECTION (i > c = ${fix(cdeg, 1)}°)` : Math.abs(ideg - cdeg) < 1 ? 'at the critical angle: refracted ray along the surface' : `critical angle c = ${fix(cdeg, 1)}°`, W / 2, 24, { align: 'center', size: 13.5, w: 700, color: tir ? C.red : C.ink2 });
    }
    const segs = traceRay(polys, src, dir, { far: 1200 });
    drawRays(c, segs, C.red);
    rich(c, `${MATS[mat][1]}, *n* = ${N}`, 14, H - 14, { size: 12, color: C.cyan, w: 600 });
    // graph
    S2.begin(); plot.axes(); plot.curve(x => N * x, { color: alpha(C.cyan, .45), width: 1.4, dash: [4, 4] });
    if (rows.length >= 2) { let sxy = 0, sxx = 0; rows.forEach(q => { sxy += q.sr * q.si; sxx += q.sr * q.sr; }); const gr = sxy / sxx; plot.curve(x => gr * x, { color: C.green, width: 1.8 }); plot.label(0.05, 0.9, `gradient = *n* ≈ ${fix(gr, 3)}`, { size: 12.5, w: 700, color: C.green }); ro.set('fit', fix(gr, 3)); } else ro.set('fit', '—');
    plot.cross(rows.map(q => [q.sr, q.si]), { color: C.red, s: 4.5, width: 2 });
    ro.set('i', `${ideg}°`); ro.set('r', isFinite(rOut) ? `${fix(rOut, 1)}°` : 'none (TIR)'); ro.set('c', `${fix(Math.asin(1 / N) / DEG, 1)}°`); ro.set('v', `${sci(3e8 / N, 3)} m s⁻¹`);
  }, [S1, S2]);
  const g = Group(P.side, 'Ray box');
  Seg(g, { options: [['rect', 'Rectangular block'], ['semi', 'Semicircular block']], value: shape, onchange: v => { shape = v; rows = []; } });
  Seg(g, { label: 'Material', options: Object.entries(MATS).map(([k, v]) => [k, v[1]]), value: mat, wrap: true, onchange: v => { mat = v; rows = []; } });
  const si = Slider(g, { id: 'rf-i', label: 'Angle of incidence <i>i</i> (or drag the ray)', min: 0, max: 85, step: 1, value: ideg, unit: '°', fmt: v => fix(v, 0), oninput: v => ideg = v });
  const b = Btns(g); Btn(b, 'Record i and r', () => { const N = n(); if (shape === 'rect') { const r = Math.asin(Math.sin(ideg * DEG) / N) + gauss() * 0.4 * DEG; rows.push({ si: Math.sin(ideg * DEG), sr: Math.sin(r) }); } else { const sr = N * Math.sin(ideg * DEG); if (sr < 1) { const rr = Math.asin(sr) + gauss() * 0.4 * DEG; rows.push({ si: Math.sin(rr), sr: Math.sin(ideg * DEG) }); } } }, 'pri'); Btn(b, 'Clear', () => rows = []);
  const ro = Readout(Group(P.side, 'Measurements'), [['i', 'Incidence <i>i</i>'], ['r', 'Refraction <i>r</i>'], ['c', 'Critical angle'], ['v', 'Speed in material <i>c</i>/<i>n</i>'], ['fit', 'Gradient of sin <i>i</i>–sin <i>r</i>', 'hl']]);
  Note(P.side, 'Light bends <b>towards</b> the normal entering a denser medium and away on leaving. In the semicircular block the ray meets the curved face along a radius, so it only bends at the flat face — perfect for finding the critical angle.');
  EqCard(P.below, 'Snell’s law (2.2.1)', [['n = \\frac{\\sin i}{\\sin r}', 'air → medium'], ['n_1\\sin\\theta_1 = n_2\\sin\\theta_2', 'general'], ['n = \\frac{c}{v}', 'absolute refractive index'], ['\\sin c = \\frac{1}{n}', 'critical angle, medium → air']]);
  Card(P.below, 'Measuring n (2.2.2)', list(['Place a glass block on paper, draw round it. Aim a narrow ray from a ray box at the block and mark the incident and emergent rays with crosses.', 'Remove the block, join the points, draw the normal at the entry point and measure <i>i</i> and <i>r</i> with a protractor.', 'Repeat for at least six angles of incidence.', 'Plot sin <i>i</i> (y) against sin <i>r</i> (x): a straight line through the origin with gradient <b>n</b>.', 'Critical angle: use a semicircular block, aim at the centre of the flat face and increase <i>i</i> until the refracted ray just grazes the surface.'], true));
  Drill(P.below, { title: 'Refraction drill', gens: [
    () => { const N = pick([1.33, 1.45, 1.5, 1.52, 1.6]), i = randi(15, 75); const r = Math.asin(Math.sin(i * DEG) / N) / DEG; return { q: `Light in air hits glass of refractive index <b>${N}</b> at <b>${i}°</b> to the normal. Find the angle of refraction.`, a: r, unit: '°', tol: 0.01, steps: ['sin r = sin i / n', `= sin ${i}° / ${N} = ${fix(Math.sin(i * DEG) / N, 4)}`, `r = ${fix(r, 1)}°`] }; },
    () => { const N = +rand(1.3, 2.4).toFixed(2); return { q: `Find the critical angle for a material of refractive index <b>${N}</b> (surrounded by air).`, a: Math.asin(1 / N) / DEG, unit: '°', tol: 0.01, steps: ['sin c = 1/n', `c = sin⁻¹(1/${N}) = ${fix(Math.asin(1 / N) / DEG, 1)}°`] }; },
    () => { const N = +rand(1.3, 2.4).toFixed(2); return { q: `What is the speed of light in a medium of refractive index <b>${N}</b>? (c = 3.00 × 10⁸ m s⁻¹)`, a: 3e8 / N, unit: 'm s⁻¹', steps: ['n = c/v ⇒ v = c/n', `= 3.00×10⁸/${N} = ${sci(3e8 / N, 3)} m s⁻¹`] }; },
    () => { const n1 = pick([1.5, 1.52, 1.62]), n2 = pick([1.33, 1.4, 1.46]); return { q: `Find the critical angle at a boundary from a core of <b>n = ${n1}</b> to a cladding of <b>n = ${n2}</b>.`, a: Math.asin(n2 / n1) / DEG, unit: '°', tol: 0.01, steps: ['n₁ sin c = n₂ sin 90°', `c = sin⁻¹(${n2}/${n1}) = ${fix(Math.asin(n2 / n1) / DEG, 1)}°`] }; },
  ] });
}

/* ---------- Lab B: total internal reflection in an optical fibre ---------- */
function mountFibre(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.2, minH: 280, maxH: 420, mobileAspect: 1.2 });
  let n1 = 1.5, n2 = 1.46, ang = 12, clad = true, t = 0;
  L.loop(dt => {
    t += dt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const x0 = W * 0.12, x1 = W * 0.96, cy = H * 0.52, rc = H * 0.12, rcl = H * 0.2;
    const core = [[x0, cy - rc], [x1, cy - rc], [x1, cy + rc], [x0, cy + rc]];
    const cl = [[x0, cy - rcl], [x1, cy - rcl], [x1, cy + rcl], [x0, cy + rcl]];
    const polys = clad ? [{ n: n2, pts: cl }, { n: n1, pts: core }] : [{ n: n1, pts: core }];
    if (clad) { c.fillStyle = alpha(C.violet, .12); c.fillRect(x0, cy - rcl, x1 - x0, 2 * rcl); rich(c, `cladding *n*₂ = ${fix(n2, 2)}`, x0 + 8, cy - rcl + 12, { size: 11.5, color: C.violet }); }
    c.fillStyle = alpha(C.cyan, .16); c.fillRect(x0, cy - rc, x1 - x0, 2 * rc); rich(c, `core *n*₁ = ${fix(n1, 2)}`, x0 + 8, cy - rc + 12, { size: 11.5, color: C.cyan });
    line(c, [[x0, cy - rc], [x1, cy - rc]], { color: C.cyan, width: 1.2 }); line(c, [[x0, cy + rc], [x1, cy + rc]], { color: C.cyan, width: 1.2 });
    // launch: ray enters the end face at angle `ang` in air
    const a = ang * DEG, entry = [x0, cy - rc * 0.3], d = [Math.cos(a), Math.sin(a)], src = [entry[0] - d[0] * 200, entry[1] - d[1] * 200];
    let tirs = 0; const segs = traceRay(polys, src, d, { far: 1500, depth: 60, partial: false, onTIR: () => tirs++ });
    c.save(); c.beginPath(); c.rect(0, 0, W, H); c.clip(); drawRays(c, segs, C.red); c.restore();
    // pulse travelling along the fibre
    const theta = Math.asin(Math.sin(a) / n1), inc = 90 - theta / DEG, crit = Math.asin(n2 / (clad ? n1 : n1)) / DEG, critAir = Math.asin(1 / n1) / DEG;
    const cEff = clad ? crit : critAir, ok = inc > cEff;
    rich(c, ok ? `angle at the wall ${fix(inc, 1)}° > critical ${fix(cEff, 1)}°: total internal reflection, light is guided` : `angle at the wall ${fix(inc, 1)}° < critical ${fix(cEff, 1)}°: light escapes`, W / 2, 24, { align: 'center', size: 13, w: 700, color: ok ? C.green : C.red });
    const acc = Math.asin(Math.min(1, Math.sqrt(Math.max(0, n1 * n1 - (clad ? n2 * n2 : 1))))) / DEG;
    ro.set('inc', `${fix(inc, 1)}°`); ro.set('c', `${fix(cEff, 1)}°`); ro.set('acc', `${fix(acc, 1)}°`); ro.set('st', ok ? 'guided (TIR)' : 'leaks out');
  }, [S]);
  const g = Group(P.side, 'Fibre');
  Slider(g, { id: 'of-a', label: 'Launch angle into the end', min: 0, max: 80, step: 1, value: ang, unit: '°', fmt: v => fix(v, 0), oninput: v => ang = v });
  Slider(g, { id: 'of-n1', label: 'Core index <i>n</i>₁', min: 1.4, max: 1.7, step: 0.01, value: n1, fmt: v => fix(v, 2), oninput: v => { n1 = v; if (n2 >= n1) { n2 = n1 - 0.01; s2.set(n2); } } });
  const s2 = Slider(g, { id: 'of-n2', label: 'Cladding index <i>n</i>₂', min: 1.3, max: 1.69, step: 0.01, value: n2, fmt: v => fix(v, 2), oninput: v => n2 = Math.min(v, n1 - 0.005) });
  Switch(g, { id: 'of-cl', label: 'Cladding fitted', value: true, onchange: v => clad = v });
  const ro = Readout(Group(P.side, 'At the core wall'), [['inc', 'Angle of incidence'], ['c', 'Critical angle'], ['acc', 'Acceptance half-angle'], ['st', 'Result', 'hl']]);
  Note(P.side, 'Total internal reflection needs <b>two</b> conditions: the light travels from a higher to a lower refractive index, and the angle of incidence is greater than the critical angle.');
  Card(P.below, 'Total internal reflection (2.2.3)', list(['When light travels from a denser to a less dense medium, increasing the angle of incidence increases the angle of refraction.', 'At the <b>critical angle</b> the angle of refraction is 90°.', 'Above the critical angle all the light is reflected: <b>total internal reflection</b>.', 'For a boundary with air, sin <i>c</i> = 1/<i>n</i>; between two media, sin <i>c</i> = <i>n</i>₂/<i>n</i>₁.']));
  Card(P.below, 'Optical fibres (2.2.4)', list(['A glass core surrounded by cladding of <b>lower</b> refractive index. Light is guided by repeated TIR at the core–cladding boundary.', 'Cladding protects the core surface from scratches and grease (which would let light escape) and stops light crossing between touching fibres.', '<b>Communications:</b> high bandwidth, low loss, immune to electrical interference, secure.', '<b>Medical endoscopes:</b> a coherent bundle (fibres keep their relative positions) carries the image back; a non-coherent bundle carries light in to illuminate.', 'A narrow core reduces multipath (modal) dispersion — rays taking different zig-zag paths arrive at different times, smearing pulses.']));
}

topic({
  id: 'refraction', code: '2.2', unit: 'AS 2', title: 'Refraction', short: 'Refraction',
  blurb: 'Snell’s law with a live ray box, the critical angle in a semicircular block, and total internal reflection guiding light down an optical fibre.',
  outcomes: [
    ['2.2.1', 'recall and use Snell’s law, n = sin i / sin r, and n₁ sin θ₁ = n₂ sin θ₂', 'block'],
    ['2.2.2', 'describe an experiment to measure the refractive index of a material', 'block'],
    ['2.2.3', 'demonstrate an understanding of total internal reflection and critical angle, and recall and use sin c = 1/n', 'fibre'],
    ['2.2.4', 'describe the application of total internal reflection in optical fibres, including medical endoscopes and communications', 'fibre'],
  ],
  labs: [
    { id: 'block', title: 'Ray box & blocks', hint: 'Snell’s law', spec: ['2.2.1', '2.2.2'], mount: mountBlock },
    { id: 'fibre', title: 'TIR & optical fibres', hint: 'critical angle', spec: ['2.2.3', '2.2.4'], mount: mountFibre },
  ],
  equations: [['n = \\frac{\\sin i}{\\sin r}', ''], ['n_1\\sin\\theta_1 = n_2\\sin\\theta_2', ''], ['n = \\frac{c}{v}', ''], ['\\sin c = \\frac{1}{n}', '']],
  traps: ['Angles are measured from the <b>normal</b>, not from the surface.', 'TIR only happens going from higher to lower n.', 'The frequency does not change on refraction; speed and wavelength do.', 'Cladding must have a <b>lower</b> refractive index than the core.', 'Calculator in <b>degrees</b> for Snell’s law.'],
  notes: [
    ['Refraction', 'Refraction is the change in direction of a wave when it crosses a boundary and its speed changes. Entering an optically denser medium, light slows and bends towards the normal.'],
    ['Snell’s law', 'n = sin i / sin r for light going from air into a medium; in general n₁ sin θ₁ = n₂ sin θ₂. Absolute refractive index n = c/v.'],
    ['Critical angle and TIR', 'Going from a denser to a less dense medium, the critical angle is the angle of incidence for which the angle of refraction is 90°. If i > c, total internal reflection occurs. sin c = 1/n (to air) or n₂/n₁ between media.'],
    ['Optical fibres', 'Core of higher n, cladding of lower n. Light is guided by TIR. Uses: communications (high data rate, low attenuation, no interference) and endoscopes (coherent bundle for the image, non-coherent bundle for illumination).'],
    ['Experiment', 'Ray box and glass block: measure i and r for several angles, plot sin i against sin r, gradient = n.'],
  ],
  mini(c, w, h, t, C) {
    c.fillStyle = alpha(C.cyan, .16); c.fillRect(0, h * 0.5, w, h * 0.5); line(c, [[0, h * 0.5], [w, h * 0.5]], { color: C.cyan, width: 1.2 });
    const i = 0.5 + 0.35 * Math.sin(t * 0.7), r = Math.asin(Math.sin(i) / 1.5), x = w / 2, y = h * 0.5;
    line(c, [[x - Math.tan(i) * y, 0], [x, y]], { color: C.red, width: 2 }); line(c, [[x, y], [x + Math.tan(r) * y, h]], { color: C.red, width: 2 }); line(c, [[x, 6], [x, h - 6]], { color: C.muted, width: 1, dash: [4, 4] });
  },
});
})();

/* ================= 2.3 Lenses ================= */
(() => {
// real-is-positive: 1/u + 1/v = 1/f; f < 0 diverging; v < 0 virtual image
const img = (u, f) => { const iv = 1 / f - 1 / u; return Math.abs(iv) < 1e-9 ? Infinity : 1 / iv; };
function lensSym(c, x, y, h, conv, col) { c.save(); c.strokeStyle = col; c.lineWidth = 2.4; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y - h); c.lineTo(x, y + h); const s = 9; for (const sy of [-1, 1]) { const yy = y + sy * h, d = conv ? -sy : sy; c.moveTo(x - s, yy + d * s); c.lineTo(x, yy); c.lineTo(x + s, yy + d * s); } c.stroke(); c.restore(); }
function objArrow(c, x, y0, h, col, dash) { arrow(c, x, y0, x, y0 - h, { color: col, width: 3, dash }); }

/* ---------- Lab A: ray diagrams ---------- */
function mountRays(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 320, maxH: 480, mobileAspect: 1.1 });
  let conv = true, f = 10, u = 25, ho = 5, drag = false;
  const geo = () => { const W = S.w, H = S.h, sc = W / 90; return { W, H, sc, lx: W * 0.5, ay: H * 0.55, X: x => W * 0.5 + x * sc }; };
  Pointer(S, { hit: (px, py) => { const g = geo(); return Math.abs(px - g.X(-u)) < 24 ? 'o' : null; }, down: () => drag = true, up: () => drag = false, move: (_, px) => { const g = geo(); u = clamp(Math.round((g.lx - px) / g.sc * 2) / 2, 1, 44); su.set(u); } });
  L.loop(() => {
    const c = S.begin(), C = Theme.c, g = geo(), W = g.W, H = g.H, F = conv ? f : -f, v = img(u, F), m = v / u, hi = -m * ho;
    const Y = y => g.ay - y * g.sc;
    line(c, [[0, g.ay], [W, g.ay]], { color: C.muted, width: 1 }); rich(c, 'principal axis', W - 8, g.ay + 12, { align: 'right', size: 10.5, color: C.muted });
    lensSym(c, g.lx, g.ay, H * 0.4, conv, C.cyan);
    for (const s of [-1, 1]) { dot(c, g.X(s * f), g.ay, 3.5, C.violet); rich(c, 'F', g.X(s * f), g.ay + 14, { align: 'center', size: 12, w: 700, color: C.violet }); dot(c, g.X(s * 2 * f), g.ay, 2.5, C.muted); rich(c, '2F', g.X(s * 2 * f), g.ay + 14, { align: 'center', size: 11, color: C.muted }); }
    const ox = g.X(-u), oy = Y(ho); objArrow(c, ox, g.ay, ho * g.sc, C.blue); if (drag) handle(c, ox, oy, C.blue, true);
    rich(c, 'object (drag)', ox, oy - 14, { align: 'center', size: 11, color: C.blue });
    const ext = W * 1.5, col = C.red, vcol = alpha(C.red, .45);
    const ray = (pts, virt) => { line(c, pts, { color: col, width: 1.8 }); if (virt) line(c, virt, { color: vcol, width: 1.4, dash: [5, 5] }); };
    const isInf = !isFinite(v);
    // ray 1: parallel to axis, then through (or away from) F on far side
    const r1Out = conv ? [g.X(f), g.ay] : [g.X(-f), g.ay];
    { const dx = r1Out[0] - g.lx, dy = r1Out[1] - oy, L2 = hyp(dx, dy), kx = conv ? dx / L2 : -dx / L2, ky = conv ? dy / L2 : -dy / L2; ray([[ox, oy], [g.lx, oy], [g.lx + kx * ext, oy + ky * ext]], !conv || (!isInf && v < 0) ? [[g.lx, oy], [g.lx - kx * ext, oy - ky * ext]] : null); }
    // ray 2: through optical centre, undeviated
    { const dx = g.lx - ox, dy = g.ay - oy, L2 = hyp(dx, dy); ray([[ox, oy], [g.lx + dx / L2 * ext, g.ay + dy / L2 * ext]], (!isInf && v < 0) ? [[g.lx, g.ay], [g.lx - dx / L2 * ext, g.ay - dy / L2 * ext]] : null); }
    // ray 3: through near F (conv) / towards far F (div), emerges parallel
    if (Math.abs(u - f) > 0.3 || !conv) { const tx = conv ? g.X(-f) : g.X(f); const dx = tx - ox, dy = g.ay - oy; const yl = oy + dy * (g.lx - ox) / dx; if (isFinite(yl) && Math.abs(yl - g.ay) < H) ray([[ox, oy], [g.lx, yl], [g.lx + ext, yl]], (!isInf && v < 0) ? [[g.lx, yl], [g.lx - ext, yl]] : null); }
    let desc;
    if (isInf) desc = 'object at F: rays emerge parallel — image at infinity';
    else { const ix = g.X(v), virt = v < 0; objArrow(c, ix, g.ay, hi * g.sc, virt ? alpha(C.green, .75) : C.green, virt ? [5, 4] : null); rich(c, virt ? 'virtual image' : 'real image', ix, Y(hi) + (hi > 0 ? -14 : 14), { align: 'center', size: 11.5, w: 700, color: C.green }); desc = `${virt ? 'virtual, upright' : 'real, inverted'}, ${Math.abs(m) > 1.02 ? 'magnified' : Math.abs(m) < 0.98 ? 'diminished' : 'same size'}`; }
    rich(c, desc, W / 2, 22, { align: 'center', size: 13.5, w: 700, color: C.ink2 });
    ro.set('u', `${fix(u, 1)} cm`); ro.set('v', isInf ? '∞' : `${fix(v, 2)} cm`); ro.set('m', isInf ? '∞' : fix(Math.abs(m), 3)); ro.set('P', `${fix(100 / F, 2)} D`); ro.set('d', desc);
  }, [S]);
  const g = Group(P.side, 'Lens');
  Seg(g, { options: [['c', 'Converging'], ['d', 'Diverging']], value: 'c', onchange: v => conv = v === 'c' });
  Slider(g, { id: 'ln-f', label: 'Focal length |<i>f</i>|', min: 4, max: 20, step: 0.5, value: f, unit: 'cm', fmt: v => fix(v, 1), oninput: v => f = v });
  const su = Slider(g, { id: 'ln-u', label: 'Object distance <i>u</i>', min: 1, max: 44, step: 0.5, value: u, unit: 'cm', fmt: v => fix(v, 1), oninput: v => u = v });
  Slider(g, { id: 'ln-h', label: 'Object height', min: 1, max: 10, step: 0.5, value: ho, unit: 'cm', fmt: v => fix(v, 1), oninput: v => ho = v });
  const ro = Readout(Group(P.side, 'Image'), [['u', 'Object distance <i>u</i>'], ['v', 'Image distance <i>v</i>', 'hl'], ['m', 'Magnification <i>v</i>/<i>u</i>'], ['P', 'Power 1/<i>f</i>'], ['d', 'Nature']]);
  Note(P.side, 'Drag the object through 2F and F. Inside F a converging lens gives a virtual, upright, magnified image — a magnifying glass. A diverging lens always gives a virtual, upright, diminished image.');
  EqCard(P.below, 'Lens equations (2.3.1–2.3.3)', [['\\frac{1}{u} + \\frac{1}{v} = \\frac{1}{f}', 'real is positive'], ['m = \\frac{v}{u} = \\frac{h_i}{h_o}', ''], ['P = \\frac{1}{f}', 'f in metres ⇒ dioptres (D)']]);
  Card(P.below, 'Rules for ray diagrams', list(['A ray parallel to the principal axis passes through the principal focus F (converging) or appears to come from F (diverging).', 'A ray through the optical centre passes straight through undeviated.', 'A ray through F (converging) emerges parallel to the axis.', 'A <b>real</b> image is formed where rays actually meet — it can be projected on a screen. A <b>virtual</b> image is where rays only appear to come from.', '<b>Principal focus:</b> the point to which rays parallel to the principal axis converge (or from which they appear to diverge) after passing through the lens. <b>Focal length:</b> distance from optical centre to F.', 'Real-is-positive convention: virtual image distances and the focal length of a diverging lens are negative.']));
  Drill(P.below, { title: 'Lens formula drill', gens: [
    () => { const f2 = randi(5, 30), u2 = randi(f2 + 3, 90); const v = 1 / (1 / f2 - 1 / u2); return { q: `An object is <b>${u2} cm</b> from a converging lens of focal length <b>${f2} cm</b>. Find the image distance.`, a: v, unit: 'cm', steps: ['1/v = 1/f − 1/u', `= 1/${f2} − 1/${u2} = ${fix(1 / f2 - 1 / u2, 5)}`, `v = ${fix(v, 2)} cm (positive ⇒ real)`] }; },
    () => { const f2 = randi(8, 30), u2 = randi(2, f2 - 2); const v = 1 / (1 / f2 - 1 / u2); return { q: `A magnifying glass of focal length <b>${f2} cm</b> views an object <b>${u2} cm</b> away. Find the magnification.`, a: Math.abs(v / u2), unit: '', steps: [`1/v = 1/${f2} − 1/${u2} ⇒ v = ${fix(v, 2)} cm (virtual)`, `m = |v|/u = ${fix(Math.abs(v / u2), 3)}`] }; },
    () => { const f2 = pick([-50, -40, -25, 20, 25, 40, 50, 80]); return { q: `Find the power of a lens of focal length <b>${f2} cm</b>.`, a: 100 / f2, unit: 'D', abs: 0.01, steps: ['P = 1/f with f in metres', `= 1/${f2 / 100} = ${fix(100 / f2, 2)} D`] }; },
  ] });
}

/* ---------- Lab B: optical bench ---------- */
function mountBench(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, mobileAspect: 1.4 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, plain: true });
  let f = 15 + Math.round(rand(-3, 3) * 2) / 2, u = 30, sx = 45, rows = [], drag = null;
  const BL = 120; // bench length cm
  const geo = () => { const W = S1.w, H = S1.h, sc = (W - 60) / BL; return { W, H, sc, X: d => 30 + d * sc, ay: H * 0.46 }; };
  Pointer(S1, { hit: (px) => { const g = geo(); if (Math.abs(px - g.X(u)) < 20) return 'lens'; if (Math.abs(px - g.X(u + sx)) < 20) return 'screen'; return null; }, down: t => drag = t, up: () => drag = null, move: (t, px) => { const g = geo(); const d = Math.round((px - 30) / g.sc * 2) / 2; if (t === 'lens') u = clamp(d, 5, BL - 10); else sx = clamp(d - u, 2, BL - u); } });
  const plot = new Plot(S2, { xlabel: '1/*u* / cm⁻¹', ylabel: '1/*v* / cm⁻¹', xmin: 0, xmax: 0.14, ymin: 0, ymax: 0.14 });
  L.loop(() => {
    const v = img(u, f), blur = isFinite(v) && v > 0 ? Math.abs(sx - v) / v : 1;
    const c = S1.begin(), C = Theme.c, g = geo(), W = g.W, H = g.H;
    c.fillStyle = C.paper3; c.fillRect(20, g.ay + 50, W - 40, 12); for (let k = 0; k <= BL; k += 10) { line(c, [[g.X(k), g.ay + 50], [g.X(k), g.ay + 56]], { color: C.ink2, width: 1 }); rich(c, `${k}`, g.X(k), g.ay + 72, { align: 'center', size: 9.5, mono: true, color: C.muted }); }
    // lamp box with cross-wire object
    c.fillStyle = C.ink2; c.fillRect(g.X(0) - 18, g.ay - 30, 18, 60); c.fillStyle = C.orange; c.fillRect(g.X(0) - 2, g.ay - 12, 4, 24); rich(c, 'illuminated object', g.X(0), g.ay - 40, { size: 11, color: C.muted });
    lensSym(c, g.X(u), g.ay, 40, true, C.cyan); if (drag === 'lens') handle(c, g.X(u), g.ay - 50, C.cyan, true);
    const scx = g.X(u + sx); c.fillStyle = C.paper; c.strokeStyle = C.ink; c.lineWidth = 2; c.fillRect(scx, g.ay - 44, 6, 88); c.strokeRect(scx, g.ay - 44, 6, 88); if (drag === 'screen') handle(c, scx + 3, g.ay - 54, C.ink, true);
    // light cone
    c.fillStyle = alpha(C.orange, .12); c.beginPath(); c.moveTo(g.X(0), g.ay); c.lineTo(g.X(u), g.ay - 30); c.lineTo(g.X(u), g.ay + 30); c.fill();
    if (isFinite(v) && v > 0) { c.beginPath(); c.moveTo(g.X(u), g.ay - 30); c.lineTo(g.X(u + v), g.ay); c.lineTo(g.X(u), g.ay + 30); c.fill(); if (u + v < BL) { c.beginPath(); c.moveTo(g.X(u + v), g.ay); c.lineTo(g.X(u + v + (v)), g.ay - 30); c.lineTo(g.X(u + v + v), g.ay + 30); c.closePath(); c.fillStyle = alpha(C.orange, .06); c.fill(); } }
    // image on screen (inset)
    const ix = W - 70, iy = 44, R = 30; c.fillStyle = C.paper; c.strokeStyle = C.line2; c.lineWidth = 1; c.fillRect(ix - R - 8, iy - R - 8, 2 * R + 16, 2 * R + 16); c.strokeRect(ix - R - 8, iy - R - 8, 2 * R + 16, 2 * R + 16);
    const sh = clamp(1 - blur * 6, 0, 1); c.save(); c.globalAlpha = 0.25 + 0.75 * sh; c.strokeStyle = C.ink; c.lineWidth = 2 + (1 - sh) * 12; c.shadowColor = C.ink; c.shadowBlur = (1 - sh) * 14; c.beginPath(); c.moveTo(ix - R * 0.6, iy); c.lineTo(ix + R * 0.6, iy); c.moveTo(ix, iy - R * 0.6); c.lineTo(ix, iy + R * 0.6); c.stroke(); c.restore();
    rich(c, sh > 0.9 ? 'SHARP' : 'screen view', ix, iy + R + 20, { align: 'center', size: 11, w: 700, color: sh > 0.9 ? C.green : C.muted });
    S2.begin(); plot.axes();
    if (rows.length >= 2) { const n = rows.length, xs = rows.map(r => 1 / r.u), ys = rows.map(r => 1 / r.v), mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; }); const m = sxy / sxx, b = my - m * mx; plot.curve(x => m * x + b, { color: C.green, width: 1.6 }); plot.label(0.004, b, `intercept 1/*f* = ${fix(b, 4)} ⇒ *f* ≈ ${fix(1 / b, 1)} cm`, { dx: 6, dy: -12, size: 12, w: 600, color: C.green }); ro.set('fit', `${fix(1 / b, 2)} cm`); } else ro.set('fit', '—');
    plot.cross(rows.map(r => [1 / r.u, 1 / r.v]), { color: C.red, s: 5, width: 2 });
    ro.set('u', `${fix(u, 1)} cm`); ro.set('v', `${fix(sx, 1)} cm`); ro.set('sh', `${Math.round(sh * 100)}%`);
  }, [S1, S2]);
  const g = Group(P.side, 'Bench');
  Note(g, 'Drag the <b>lens</b> to set <i>u</i>, then drag the <b>screen</b> until the image is sharp. Record, then move the lens and repeat.');
  const b = Btns(g); Btn(b, 'Record u and v', () => { const v = img(u, f); if (isFinite(v) && v > 0 && Math.abs(sx - v) / v < 0.05) rows.push({ u, v: sx }); else inlineMsg(g, 'Get a sharp image first: move the screen until sharpness is above 90%.'); }, 'pri'); Btn(b, 'Clear', () => rows = []); Btn(b, 'New lens', () => { f = 10 + Math.round(rand(0, 12) * 2) / 2; rows = []; });
  const ro = Readout(Group(P.side, 'Readings'), [['u', '<i>u</i> (object → lens)'], ['v', '<i>v</i> (lens → screen)'], ['sh', 'Sharpness'], ['fit', 'Focal length from graph', 'hl']]);
  Card(P.below, 'Measuring focal length (2.3.4)', list(['Quick estimate: focus a distant window onto a screen; the lens–screen distance ≈ <i>f</i>.', 'Accurate method: illuminated object, lens and screen on a metre rule / optical bench. For several values of <i>u</i> (all greater than <i>f</i>), move the screen to get the sharpest image and measure <i>v</i>.', 'Plot 1/<i>v</i> against 1/<i>u</i>: a straight line of gradient −1 with both intercepts equal to 1/<i>f</i>.', 'Judge sharpness by moving the screen both ways and taking the midpoint; repeat and average.'], true));
}

/* ---------- Lab C: the eye & defects of vision ---------- */
function mountEye(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.2, minH: 280, maxH: 420, mobileAspect: 1.2 });
  let defect = 'normal', obj = 'far', corr = 0, t = 0;
  const EYE = 2.4; // cm lens→retina
  L.loop(dt => {
    t += dt;
    // eye power range (D): normal 41.7 (far) … 45.7 (near 25 cm). myopia: too strong; hypermetropia: too weak
    const base = defect === 'myopia' ? 43.7 : defect === 'hyper' ? 40.2 : 41.67, acc = 4.0;
    const uCm = obj === 'far' ? 1e6 : 25;
    // the eye accommodates to focus if it can: needed power (with corrective lens in contact) = 100/EYE + 100/u − corr
    const need = 100 / EYE + 100 / uCm - corr, Peye = clamp(need, base, base + acc), Ptot = Peye + corr;
    const vImg = 100 / (Ptot - 100 / uCm); // cm behind lens
    const sharp = Math.abs(vImg - EYE) < 0.02;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const ex = W * 0.66, ey = H * 0.5, R = Math.min(H * 0.34, W * 0.16), sc = (2 * R) / EYE, lx = ex - R;
    c.beginPath(); c.arc(ex, ey, R, 0, TAU); c.fillStyle = alpha(C.cyan, .07); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.arc(ex, ey, R, -0.9, 0.9); c.strokeStyle = C.red; c.lineWidth = 4; c.stroke(); rich(c, 'retina', ex + R + 8, ey - R * 0.6, { size: 11, color: C.red });
    c.beginPath(); c.ellipse(lx + 6, ey, 7 + (Peye - 41) * 1.2, R * 0.45, 0, 0, TAU); c.fillStyle = alpha(C.cyan, .35); c.fill(); c.strokeStyle = C.cyan; c.lineWidth = 1.5; c.stroke();
    if (corr) { const cx = lx - 40; lensSym(c, cx, ey, R * 0.6, corr > 0, C.violet); rich(c, `${corr > 0 ? '+' : ''}${fix(corr, 1)} D`, cx, ey - R * 0.6 - 14, { align: 'center', size: 12, w: 700, color: C.violet }); }
    // rays: from object
    const fx = vImg * sc, tipX = lx + fx;
    for (const yo of [-R * 0.35, 0, R * 0.35]) {
      let sx, sy; if (obj === 'far') { sx = 10; sy = ey + yo; } else { sx = lx - W * 0.45; sy = ey; }
      const hy = obj === 'far' ? ey + yo : ey + yo;
      line(c, [[sx, obj === 'far' ? sy : ey], [lx, hy]], { color: C.orange, width: 1.6 });
      const retX = ex + R * Math.cos(Math.asin(clamp((ey - ey) / R, -1, 1)));
      const endX = ex + R * 0.99, k = (endX - lx) / Math.max(fx, 1);
      const yEnd = hy + (ey - hy) * k; line(c, [[lx, hy], [endX, yEnd]], { color: C.orange, width: 1.6 });
    }
    if (obj === 'near') { arrow(c, lx - W * 0.45, ey, lx - W * 0.45, ey - 30, { color: C.blue, width: 2.4 }); rich(c, 'object at 25 cm (near point)', lx - W * 0.45, ey + 18, { size: 11, color: C.blue }); }
    else rich(c, 'rays from a distant object (parallel)', 12, ey - R * 0.6, { size: 11, color: C.blue });
    dot(c, tipX, ey, 3, C.green); rich(c, 'focus', tipX, ey + 14, { align: 'center', size: 10.5, color: C.green });
    rich(c, sharp ? 'image focused on the retina ✓' : vImg < EYE ? 'focuses in FRONT of the retina: blurred' : 'focuses BEHIND the retina: blurred', W / 2, 22, { align: 'center', size: 13.5, w: 700, color: sharp ? C.green : C.red });
    const nearPt = 100 / (base + acc - 100 / EYE), farPt = base - 100 / EYE > 0.01 ? 100 / (base - 100 / EYE) : Infinity;
    ro.set('np', nearPt > 0 ? `${fix(nearPt, 0)} cm` : '—'); ro.set('fp', farPt === Infinity || farPt < 0 ? 'infinity' : `${fix(farPt, 0)} cm`); ro.set('P', `${fix(Ptot, 1)} D`); ro.set('st', sharp ? 'sharp' : 'blurred');
  }, [S]);
  const g = Group(P.side, 'Eye');
  Seg(g, { label: 'Eye', options: [['normal', 'Normal'], ['myopia', 'Short sight'], ['hyper', 'Long sight']], value: defect, onchange: v => defect = v });
  Seg(g, { label: 'Looking at', options: [['far', 'Distant object'], ['near', 'Book at 25 cm']], value: obj, onchange: v => obj = v });
  Slider(g, { id: 'ey-c', label: 'Corrective lens power', min: -5, max: 5, step: 0.25, value: 0, unit: 'D', fmt: v => (v > 0 ? '+' : '') + fix(v, 2), oninput: v => corr = v });
  const ro = Readout(Group(P.side, 'Eye'), [['np', 'Near point'], ['fp', 'Far point'], ['P', 'Total power'], ['st', 'Image', 'hl']]);
  Note(P.side, '<b>Short sight:</b> the eye is too powerful; distant objects focus in front of the retina. Fix with a <b>diverging</b> (negative) lens. <b>Long sight:</b> the eye is not powerful enough for near objects; fix with a <b>converging</b> (positive) lens.');
  Card(P.below, 'Defects of vision (2.3.5)', list(['<b>Normal eye:</b> near point about 25 cm, far point at infinity. The ciliary muscles change the lens shape (accommodation) to focus.', '<b>Myopia (short sight):</b> can see near objects clearly but not distant ones; the far point is closer than infinity. The eye converges light too strongly (eyeball too long or lens too powerful). Correct with a <b>diverging lens</b> whose focal length equals the far-point distance (so distant objects appear to be at the far point).', '<b>Hypermetropia (long sight):</b> can see distant objects clearly but the near point is further than 25 cm. Correct with a <b>converging lens</b> that makes an object at 25 cm form a virtual image at the eye’s near point.', 'Power of a lens P = 1/f (f in m, P in dioptres); powers of thin lenses in contact add.']));
  Drill(P.below, { title: 'Vision drill', gens: [
    () => { const fp = randi(80, 400); return { q: `A short-sighted person has a far point of <b>${fp} cm</b>. What power of lens corrects this?`, a: -100 / fp, unit: 'D', tol: 0.02, abs: 0.01, steps: ['A diverging lens must form an image of an object at infinity at the far point: f = −far point', `P = 1/f = 1/(−${fp / 100}) = ${fix(-100 / fp, 2)} D`] }; },
    () => { const np = randi(40, 150); const v = -np, u2 = 25; const f2 = 1 / (1 / u2 + 1 / v); return { q: `A long-sighted person has a near point of <b>${np} cm</b>. What power of lens lets them read at 25 cm?`, a: 100 / f2, unit: 'D', tol: 0.02, steps: ['Object at u = 25 cm must give a virtual image at the near point: v = −' + np + ' cm', `1/f = 1/25 + 1/(−${np}) = ${fix(1 / f2, 4)} cm⁻¹`, `P = ${fix(100 / f2, 2)} D`] }; },
    () => ({ q: 'Which lens corrects short sight (myopia)?', options: ['Diverging (negative power)', 'Converging (positive power)', 'A cylindrical lens', 'A plane glass sheet'], correct: 0, why: 'The myopic eye is too strong; a diverging lens reduces the total power.' }),
  ] });
}

topic({
  id: 'lenses', code: '2.3', unit: 'AS 2', title: 'Lenses', short: 'Lenses',
  blurb: 'Draggable ray diagrams, an optical bench practical to find f, and the eye: short and long sight corrected with real lens powers.',
  outcomes: [
    ['2.3.1', 'demonstrate an understanding of the terms principal focus, focal length and power of a lens, and recall and use P = 1/f', 'rays'],
    ['2.3.2', 'draw ray diagrams to show the formation of real and virtual images by converging and diverging lenses', 'rays'],
    ['2.3.3', 'recall and use the lens formula 1/u + 1/v = 1/f and magnification m = v/u', 'rays'],
    ['2.3.4', 'describe an experiment to measure the focal length of a converging lens', 'bench'],
    ['2.3.5', 'demonstrate an understanding of short sight and long sight and their correction using lenses', 'eye'],
  ],
  labs: [
    { id: 'rays', title: 'Ray diagrams', hint: 'drag the object', spec: ['2.3.1', '2.3.2', '2.3.3'], mount: mountRays },
    { id: 'bench', title: 'Optical bench', hint: '1/v against 1/u', spec: ['2.3.4'], mount: mountBench },
    { id: 'eye', title: 'The eye & glasses', hint: 'myopia, hypermetropia', spec: ['2.3.5'], mount: mountEye },
  ],
  equations: [['\\frac{1}{u} + \\frac{1}{v} = \\frac{1}{f}', 'real is positive'], ['m = \\frac{v}{u}', ''], ['P = \\frac{1}{f}', 'dioptres, f in m']],
  traps: ['Convert f to <b>metres</b> for power in dioptres.', 'In real-is-positive, a virtual image has negative v and a diverging lens has negative f.', 'Short sight → diverging lens; long sight → converging lens.', 'An object inside F of a converging lens gives a virtual image — you can’t put it on a screen.'],
  notes: [
    ['Converging and diverging lenses', 'A converging (convex) lens brings parallel rays together at the principal focus. A diverging (concave) lens spreads them out so they appear to come from the principal focus. Focal length f is from the optical centre to F.'],
    ['Power', 'P = 1/f, in dioptres (D) when f is in metres. Converging lenses have positive power, diverging negative.'],
    ['Images', 'Real images form where rays actually meet (on a screen, inverted). Virtual images form where rays appear to come from (upright). Use the parallel ray, the central ray and the focal ray to draw diagrams.'],
    ['Lens formula', '1/u + 1/v = 1/f with real distances positive. Magnification m = v/u = image height / object height.'],
    ['Finding f', 'Measure v for several u with an illuminated object, lens and screen; plot 1/v against 1/u; intercepts are 1/f.'],
    ['Eye defects', 'Myopia: far point too near, image of distant objects forms in front of the retina — diverging lens. Hypermetropia: near point too far, image of near objects forms behind the retina — converging lens.'],
  ],
  mini(c, w, h, t, C) {
    const lx = w / 2, ay = h / 2; lensSym(c, lx, ay, h * 0.38, true, C.cyan); line(c, [[0, ay], [w, ay]], { color: C.muted, width: 1 });
    for (const y of [-0.25, 0, 0.25]) { line(c, [[8, ay + y * h], [lx, ay + y * h]], { color: C.orange, width: 1.6 }); line(c, [[lx, ay + y * h], [w - 8, ay - y * h * ((w - 8 - lx) / 40 - 1)]], { color: C.orange, width: 1.6 }); }
  },
});
})();

/* ================= 2.4 Superposition, interference and diffraction ================= */
(() => {
const rgb = hex => { if (!hex || hex[0] !== '#') return [120, 120, 120]; let h = hex.slice(1); if (h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };

/* ---------- Lab A: superposition & stationary waves ---------- */
function mountStanding(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.7, minH: 360, maxH: 520, mobileAspect: 0.95 });
  let mode = 'standing', harm = 3, f = 1, t = 0, run = true, showParts = true;
  L.loop(dt => {
    if (run) t += dt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, x0 = 30, x1 = W - 30, Lx = x1 - x0;
    const rows = mode === 'standing' ? [H * 0.2, H * 0.42, H * 0.72] : [H * 0.25, H * 0.5, H * 0.75];
    const A = Math.min(34, H * 0.08);
    if (mode === 'standing') {
      const lam = 2 * Lx / harm, k = TAU / lam, w = TAU * f;
      const y1 = x => A * Math.sin(k * x - w * t), y2 = x => A * Math.sin(k * x + w * t + Math.PI);
      const pts = (fn, oy) => { const p = []; for (let x = 0; x <= Lx; x += 3) p.push([x0 + x, oy - fn(x)]); return p; };
      if (showParts) {
        line(c, pts(y1, rows[0]), { color: C.blue, width: 1.8 }); rich(c, 'wave travelling right →', x0, rows[0] - A - 12, { size: 11.5, color: C.blue });
        line(c, pts(y2, rows[1]), { color: C.violet, width: 1.8 }); rich(c, '← reflected wave travelling left', x1, rows[1] - A - 12, { align: 'right', size: 11.5, color: C.violet });
      }
      const oy = rows[2];
      // envelope
      line(c, pts(x => 2 * A * Math.sin(k * x), oy), { color: alpha(C.muted, .45), width: 1, dash: [4, 4] }); line(c, pts(x => -2 * A * Math.sin(k * x), oy), { color: alpha(C.muted, .45), width: 1, dash: [4, 4] });
      line(c, pts(x => y1(x) + y2(x), oy), { color: C.red, width: 3 });
      c.fillStyle = C.ink2; c.fillRect(x0 - 8, oy - 50, 8, 100); c.fillRect(x1, oy - 50, 8, 100);
      for (let n = 0; n <= harm; n++) { const x = x0 + n * lam / 2; dot(c, x, oy, 5, C.ink); rich(c, 'N', x, oy + 2 * A + 16, { align: 'center', size: 11, w: 700, color: C.ink2 }); }
      for (let n = 0; n < harm; n++) { const x = x0 + (n + 0.5) * lam / 2; rich(c, 'A', x, oy + 2 * A + 16, { align: 'center', size: 11, w: 700, color: C.red }); }
      arrow(c, x0, oy + 2 * A + 34, x0 + lam / 2, oy + 2 * A + 34, { color: C.green, width: 1.4, both: true, head: 6 }); rich(c, 'λ/2', x0 + lam / 4, oy + 2 * A + 46, { align: 'center', size: 12, color: C.green, w: 700 });
      rich(c, `stationary wave: harmonic ${harm} (N = node, A = antinode)`, x0, oy - 2 * A - 16, { size: 12, w: 700, color: C.red });
      ro.set('lam', `${fix(2 / harm, 3)} L`); ro.set('nodes', String(harm + 1)); ro.set('f', `${harm} × f₁`);
    } else {
      // two pulses superposing
      const T = 6, tt = (t % T) - T / 2, sp = Lx / 5, wdt = Lx * 0.05, inv = mode === 'pulsesInv' ? -1 : 1;
      const p1 = x => A * 1.3 * Math.exp(-(((x - (Lx / 2 + tt * sp)) / wdt) ** 2)), p2 = x => inv * A * 1.3 * Math.exp(-(((x - (Lx / 2 - tt * sp)) / wdt) ** 2));
      const pts = (fn, oy) => { const p = []; for (let x = 0; x <= Lx; x += 2) p.push([x0 + x, oy - fn(x)]); return p; };
      line(c, pts(p1, rows[0]), { color: C.blue, width: 2 }); line(c, pts(p2, rows[1]), { color: C.violet, width: 2 });
      line(c, pts(x => p1(x) + p2(x), rows[2]), { color: C.red, width: 3 });
      rich(c, 'pulse 1', x0, rows[0] - A * 1.5, { size: 11.5, color: C.blue }); rich(c, 'pulse 2', x0, rows[1] - A * 1.5, { size: 11.5, color: C.violet }); rich(c, 'resultant = sum of displacements', x0, rows[2] - A * 2.4, { size: 12, w: 700, color: C.red });
      ro.set('lam', '—'); ro.set('nodes', '—'); ro.set('f', '—');
    }
  }, [S]);
  const g = Group(P.side, 'Mode');
  Seg(g, { options: [['standing', 'Stationary wave'], ['pulses', 'Two pulses'], ['pulsesInv', 'Pulse + inverted']], value: mode, wrap: true, onchange: v => { mode = v; t = 0; gs.hidden = v !== 'standing'; } });
  const gs = el('div', { class: 'grp' }); g.append(gs);
  Seg(gs, { label: 'Harmonic', options: [[1, '1st'], [2, '2nd'], [3, '3rd'], [4, '4th'], [5, '5th']], value: harm, onchange: v => harm = +v });
  Switch(gs, { id: 'sw-parts', label: 'Show the two travelling waves', value: true, onchange: v => showParts = v });
  Slider(g, { id: 'sw-f', label: 'Animation speed', min: 0.1, max: 2, step: 0.1, value: f, fmt: v => fix(v, 1) + '×', oninput: v => f = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri');
  const ro = Readout(Group(P.side, 'String of length L'), [['lam', 'Wavelength'], ['nodes', 'Nodes'], ['f', 'Frequency']]);
  Note(P.side, 'Superposition: where waves overlap, the resultant displacement is the <b>vector sum</b> of the individual displacements. A stationary wave is two identical waves travelling in opposite directions.');
  Card(P.below, 'Stationary vs progressive (2.4.2–2.4.3)', `<table class="tbl"><tr><th></th><th>Progressive</th><th>Stationary</th></tr><tr><td>Energy</td><td>transferred</td><td>not transferred (stored)</td></tr><tr><td>Amplitude</td><td>same for all points</td><td>varies: zero at nodes, maximum at antinodes</td></tr><tr><td>Phase</td><td>varies continuously along one λ</td><td>all points between adjacent nodes in phase; antiphase across a node</td></tr><tr><td>Wave profile</td><td>moves</td><td>does not move</td></tr><tr><td>Node spacing</td><td>—</td><td>λ/2</td></tr></table>`);
  Card(P.below, 'Demonstrating stationary waves', list(['A string fixed at both ends driven by a vibration generator (Melde’s experiment): adjust the frequency until 1, 2, 3… loops appear. Node–node distance = λ/2.', 'Microwaves reflected from a metal plate: move a detector along the line and find alternate maxima and minima; adjacent minima are λ/2 apart.', 'Sound in an air column (resonance tube) — an antinode at an open end, a node at a closed end.']));
}

/* ---------- Lab B: two-source interference & Young's slits ---------- */
function mountYoung(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.9, minH: 300, maxH: 440, mobileAspect: 1.05 });
  const S2 = L.stage(P.stageBox, { aspect: 3.4, minH: 150, maxH: 200, plain: true });
  let lamNm = 600, a = 0.5, D = 1.5, t = 0, probe = null;
  const off = document.createElement('canvas'), ow = 240, oh = 140; off.width = ow; off.height = oh; const octx = off.getContext('2d'), id = octx.createImageData(ow, oh);
  Pointer(S1, { scroll: true, hit: () => 'p', move: (_, x, y) => probe = [x, y], up: () => {} });
  L.loop(dt => {
    t += dt;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    // ripple-tank view: wavelength in px scaled from λ; slit separation scaled from a
    const lamPx = 10 + (lamNm - 400) / 300 * 14, sepPx = 18 + a / 1 * 60, sx = 10, cy = oh / 2;
    const s1 = [sx, cy - sepPx / 2 * oh / H * 1.6], s2 = [sx, cy + sepPx / 2 * oh / H * 1.6];
    const bg = rgb(C.paper2), hi = rgb(wlColorHex(lamNm)), lo = rgb(C.ink), k = TAU / (lamPx * ow / W), w = TAU * 1.2;
    for (let j = 0; j < oh; j++) for (let i = 0; i < ow; i++) {
      const r1 = hyp(i - s1[0], j - s1[1]), r2 = hyp(i - s2[0], j - s2[1]);
      const v = (Math.sin(k * r1 - w * t) / Math.sqrt(r1 + 4) + Math.sin(k * r2 - w * t) / Math.sqrt(r2 + 4)) * 3.2;
      const q = clamp(v, -1, 1), o = (j * ow + i) * 4;
      if (q > 0) { id.data[o] = bg[0] + (hi[0] - bg[0]) * q; id.data[o + 1] = bg[1] + (hi[1] - bg[1]) * q; id.data[o + 2] = bg[2] + (hi[2] - bg[2]) * q; }
      else { id.data[o] = bg[0] + (lo[0] - bg[0]) * -q * 0.6; id.data[o + 1] = bg[1] + (lo[1] - bg[1]) * -q * 0.6; id.data[o + 2] = bg[2] + (lo[2] - bg[2]) * -q * 0.6; }
      id.data[o + 3] = 255;
    }
    octx.putImageData(id, 0, 0); c.imageSmoothingEnabled = true; c.drawImage(off, 0, 0, W, H);
    // barrier
    c.fillStyle = C.ink2; const bx = s1[0] * W / ow; c.fillRect(0, 0, bx + 2, H); c.fillStyle = C.paper2; for (const s of [s1, s2]) c.fillRect(0, s[1] * H / oh - 4, bx + 2, 8);
    rich(c, 'double slit', 6, 14, { size: 11, color: C.paper2, w: 700, bg: alpha(C.ink2, .85) });
    if (probe) {
      const p1 = [s1[0] * W / ow, s1[1] * H / oh], p2 = [s2[0] * W / ow, s2[1] * H / oh];
      line(c, [p1, probe], { color: C.ink, width: 1.2, dash: [4, 3] }); line(c, [p2, probe], { color: C.ink, width: 1.2, dash: [4, 3] }); dot(c, probe[0], probe[1], 5, C.red, C.paper2);
      const pd = (hyp(probe[0] - p1[0], probe[1] - p1[1]) - hyp(probe[0] - p2[0], probe[1] - p2[1])) / (lamPx), n = Math.abs(pd), frac = n - Math.floor(n);
      const kind = frac < 0.15 || frac > 0.85 ? 'constructive (bright): path difference = nλ' : Math.abs(frac - 0.5) < 0.15 ? 'destructive (dark): path difference = (n + ½)λ' : 'in between';
      rich(c, `path difference = ${fix(n, 2)} λ → ${kind}`, probe[0] < W / 2 ? probe[0] + 10 : probe[0] - 10, probe[1] - 14, { align: probe[0] < W / 2 ? 'left' : 'right', size: 12, w: 700, color: C.ink, bg: alpha(C.paper2, .9) });
    } else rich(c, 'tap or drag anywhere to measure the path difference', W - 10, H - 12, { align: 'right', size: 11.5, color: C.ink2, bg: alpha(C.paper2, .85) });
    // screen pattern
    const c2 = S2.begin(), W2 = S2.w, H2 = S2.h, lam = lamNm * 1e-9, aa = a * 1e-3, y = lam * D / aa, ymax = 12 * y > 0.03 ? 0.03 : 6 * y;
    const X = yy => W2 / 2 + yy / ymax * (W2 / 2 - 20);
    for (let px = 0; px < W2; px++) { const yy = (px - W2 / 2) / (W2 / 2 - 20) * ymax, th = yy / D; const beta = Math.PI * aa * th / lam; const env = 1; const I = Math.cos(beta) ** 2 * env; c2.fillStyle = alpha(wlColorHex(lamNm), I); c2.fillRect(px, 10, 1, H2 * 0.45); }
    c2.fillStyle = C.ink2; c2.fillRect(0, 10 + H2 * 0.45, W2, 1);
    for (let n = -6; n <= 6; n++) { const px = X(n * y); if (px < 0 || px > W2) continue; line(c2, [[px, 10 + H2 * 0.45], [px, 10 + H2 * 0.45 + 6]], { color: C.ink2, width: 1 }); if (Math.abs(n) <= 3) rich(c2, n === 0 ? 'central' : `n = ${n}`, px, 10 + H2 * 0.45 + 18, { align: 'center', size: 10.5, color: C.muted }); }
    arrow(c2, X(0), H2 - 16, X(y), H2 - 16, { color: C.green, width: 1.4, both: true, head: 6 }); rich(c2, `fringe spacing *y* = ${fix(y * 1000, 3)} mm`, X(y) + 8, H2 - 16, { size: 12, w: 700, color: C.green });
    ro.set('y', `${fix(y * 1000, 3)} mm`); ro.set('th', `${fix(Math.asin(lam / aa) / DEG, 3)}°`);
  }, [S1, S2]);
  function wlColorHex(nm) { const m = wlColor(nm).match(/\d+/g).map(Number); return '#' + m.map(v => v.toString(16).padStart(2, '0')).join(''); }
  const g = Group(P.side, 'Young’s double slit');
  Slider(g, { id: 'ys-l', label: 'Wavelength λ', min: 400, max: 700, step: 5, value: lamNm, unit: 'nm', fmt: v => fix(v, 0), oninput: v => lamNm = v });
  Slider(g, { id: 'ys-a', label: 'Slit separation <i>a</i>', min: 0.1, max: 1, step: 0.05, value: a, unit: 'mm', fmt: v => fix(v, 2), oninput: v => a = v });
  Slider(g, { id: 'ys-D', label: 'Slit–screen distance <i>D</i>', min: 0.5, max: 3, step: 0.1, value: D, unit: 'm', fmt: v => fix(v, 1), oninput: v => D = v });
  const ro = Readout(Group(P.side, 'Pattern'), [['y', 'Fringe spacing <i>y</i> = λ<i>D</i>/<i>a</i>', 'hl'], ['th', 'Angle to first bright fringe']]);
  Note(P.side, 'Longer wavelength or bigger <i>D</i> spreads the fringes out; wider slit separation squeezes them together. The two slits act as <b>coherent</b> sources because they come from one wavefront.');
  EqCard(P.below, 'Interference (2.4.4–2.4.5)', [['\\lambda = \\frac{ay}{D}', 'Young’s slits, a ≪ D'], ['\\text{path difference} = n\\lambda', 'constructive'], ['\\text{path difference} = (n + \\frac{1}{2})\\lambda', 'destructive']]);
  Card(P.below, 'Key ideas', list(['<b>Coherent</b> sources have the same frequency (wavelength) and a constant phase difference.', 'For observable interference you also need similar amplitudes and (for transverse waves) the same plane of polarisation.', '<b>Path difference</b> is the difference in distance travelled from the two sources to a point; <b>phase difference</b> = 2π × path difference / λ.', 'Young’s experiment: a monochromatic source (or laser), a single slit (for white light sources), a double slit and a screen 1–2 m away. Measure across several fringes and divide to find <i>y</i> accurately.', 'Two loudspeakers driven by one signal generator, or two microwave slits, show the same pattern with sound or microwaves.']));
  Drill(P.below, { title: 'Young’s slits drill', gens: [
    () => { const l = randi(400, 700), a2 = +rand(0.1, 0.8).toFixed(2), D2 = +rand(0.8, 3).toFixed(1); const y = l * 1e-9 * D2 / (a2 * 1e-3); return { q: `Light of wavelength <b>${l} nm</b> passes through slits <b>${a2} mm</b> apart onto a screen <b>${D2} m</b> away. Find the fringe spacing.`, a: y * 1000, unit: 'mm', steps: ['y = λD/a', `= ${l}×10⁻⁹ × ${D2} / ${a2}×10⁻³ = ${sci(y, 3)} m = ${fix(y * 1000, 3)} mm`] }; },
    () => { const a2 = +rand(0.2, 0.6).toFixed(2), D2 = +rand(1, 2.5).toFixed(1), n = randi(5, 10), span = +rand(8, 25).toFixed(1); const y = span / n; return { q: `With slits <b>${a2} mm</b> apart and screen <b>${D2} m</b> away, <b>${n}</b> fringe spacings measure <b>${span} mm</b>. Find the wavelength in nm.`, a: a2 * 1e-3 * y * 1e-3 / D2 * 1e9, unit: 'nm', steps: [`y = ${span}/${n} = ${fix(y, 3)} mm`, `λ = ay/D = ${fix(a2 * 1e-3 * y * 1e-3 / D2 * 1e9, 1)} nm`] }; },
    () => ({ q: 'Two sources are coherent if they have…', options: ['the same frequency and a constant phase difference', 'the same amplitude', 'the same speed', 'zero phase difference only'], correct: 0, why: 'Coherence means a fixed phase relationship; same frequency is needed for that.' }),
  ] });
}

/* ---------- Lab C: diffraction — single slit and grating ---------- */
function mountGrating(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.8, minH: 320, maxH: 460, mobileAspect: 1 });
  let mode = 'grating', lamNm = 589, N = 300, slitUm = 20, white = false;
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const gx = W * 0.14, cy = H * 0.5, sx = W * 0.92, R = sx - gx;
    c.fillStyle = C.ink2; c.fillRect(gx - 3, cy - H * 0.35, 6, H * 0.7);
    line(c, [[10, cy], [gx, cy]], { color: C.red, width: 3 }); rich(c, mode === 'grating' ? `grating ${N} lines/mm` : `slit ${slitUm} µm`, gx, cy - H * 0.35 - 12, { align: 'center', size: 11.5, w: 600, color: C.ink2 });
    const lams = white ? [420, 470, 520, 570, 620, 680] : [lamNm];
    if (mode === 'grating') {
      const d = 1e-3 / N;
      for (const l of lams) {
        const lam = l * 1e-9, nmax = Math.floor(d / lam);
        for (let n = -nmax; n <= nmax; n++) {
          const th = Math.asin(n * lam / d); const col = wlColor(l);
          const Lr = Math.min(R, (H * 0.44) / Math.max(1e-6, Math.abs(Math.sin(th)))), ex = gx + Lr * Math.cos(th), ey = cy + Lr * Math.sin(th);
          c.save(); c.globalAlpha = white ? 0.8 : 1; line(c, [[gx, cy], [ex, ey]], { color: col, width: white ? 1.4 : 2.2 }); c.restore(); dot(c, ex, ey, 5, col);
          if ((!white || l === 570) && Math.abs(n) <= 4) rich(c, n === 0 ? 'n = 0' : `n = ${Math.abs(n)}  θ = ${fix(Math.abs(th / DEG), 1)}°`, ex + (Lr < R ? 8 : -8), ey + (Lr < R ? (n < 0 ? 10 : -10) : (n < 0 ? -12 : 12)), { align: Lr < R ? 'left' : 'right', size: 11.5, color: C.ink2, w: 600, bg: alpha(C.paper2, .8) });
        }
      }
      
      const lam = lamNm * 1e-9; ro.set('d', `${sci(d, 3)} m`); ro.set('n', white ? '—' : String(Math.floor(d / lam))); ro.set('t1', white ? '—' : `${fix(Math.asin(lam / d) / DEG, 2)}°`);
      rich(c, white ? 'white light: each order is a spectrum, violet deviated least; n = 0 stays white' : 'd sin θ = nλ: sharp, bright, widely spaced maxima', W / 2, 20, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    } else {
      const b = slitUm * 1e-6, pl = new Plot(S, { rect: { x: gx + 20, y: 30, w: W - gx - 40, h: H - 60 }, xlabel: 'angle *θ* / °', ylabel: 'intensity', xmin: -30, xmax: 30, ymin: 0, ymax: 1.1 });
      pl.axes();
      for (const l of lams) { const lam = l * 1e-9; pl.curve(x => { const be = Math.PI * b * Math.sin(x * DEG) / lam; return Math.abs(be) < 1e-6 ? 1 : (Math.sin(be) / be) ** 2; }, { color: wlColor(l), width: 2.2, n: 600 }); }
      const lam = lamNm * 1e-9; const th1 = lam / b < 1 ? Math.asin(lam / b) / DEG : 90;
      if (!white && th1 < 30) { pl.vline(th1, { color: C.red }); pl.vline(-th1, { color: C.red }); pl.label(th1, 1.02, 'first minimum sin *θ* = λ/*b*', { dx: 6, size: 11.5, color: C.red }); }
      ro.set('d', `${fix(slitUm, 0)} µm`); ro.set('n', '—'); ro.set('t1', `${fix(th1, 2)}°`);
      rich(c, 'single slit: wide central maximum, twice the width of the others; narrower slit ⇒ more spreading', W / 2, 18, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    }
  }, [S]);
  const g = Group(P.side, 'Diffraction');
  Seg(g, { options: [['grating', 'Diffraction grating'], ['slit', 'Single slit']], value: mode, onchange: v => { mode = v; sN.el.hidden = v !== 'grating'; sb.el.hidden = v === 'grating'; } });
  Slider(g, { id: 'dg-l', label: 'Wavelength λ', min: 400, max: 700, step: 1, value: lamNm, unit: 'nm', fmt: v => fix(v, 0), oninput: v => lamNm = v });
  const sN = Slider(g, { id: 'dg-N', label: 'Lines per mm', min: 100, max: 1200, step: 50, value: N, fmt: v => fix(v, 0), oninput: v => N = v });
  const sb = Slider(g, { id: 'dg-b', label: 'Slit width', min: 2, max: 60, step: 1, value: slitUm, unit: 'µm', fmt: v => fix(v, 0), oninput: v => slitUm = v }); sb.el.hidden = true;
  Switch(g, { id: 'dg-w', label: 'White light', value: false, onchange: v => white = v });
  const ro = Readout(Group(P.side, 'Result'), [['d', 'Slit spacing <i>d</i> (or width)'], ['n', 'Highest order'], ['t1', 'First-order / first-minimum angle', 'hl']]);
  Note(P.side, 'Diffraction is the spreading of a wave through a gap or round an obstacle. It is most noticeable when the gap is about the same size as the wavelength.');
  EqCard(P.below, 'Grating (2.4.7)', [['d\\sin\\theta = n\\lambda', 'd = 1/(lines per metre)'], ['n_{max} < \\frac{d}{\\lambda}', 'round down']]);
  Card(P.below, 'Diffraction (2.4.6–2.4.7)', list(['Single slit: a bright, wide central maximum with weaker side maxima. Narrowing the slit or increasing λ widens the pattern.', 'A diffraction grating has many equally spaced slits; the maxima are much sharper and brighter than Young’s fringes, so wavelengths can be measured accurately.', 'Measure λ: shine a laser normally on a grating; measure the angle to each order (or distances on a screen and use tan θ = x/D); use d sin θ = nλ.', 'Use higher orders for a more accurate λ; the largest possible order has sin θ ≤ 1.', 'With white light each order (except zero) is a spectrum, red deviated most.']));
  Drill(P.below, { title: 'Grating drill', gens: [
    () => { const N2 = pick([300, 400, 500, 600, 750]), l = randi(420, 680), n = randi(1, 2); const d = 1e-3 / N2; if (n * l * 1e-9 / d >= 1) return { q: `A grating has ${N2} lines/mm. Can a 2nd order exist for ${l} nm?`, options: ['No: sin θ would exceed 1', 'Yes'], correct: 0 }; return { q: `Light of wavelength <b>${l} nm</b> falls normally on a grating with <b>${N2} lines per mm</b>. Find the angle of the order <b>n = ${n}</b>.`, a: Math.asin(n * l * 1e-9 / d) / DEG, unit: '°', tol: 0.01, steps: [`d = 1/${N2 * 1000} = ${sci(d, 3)} m`, `sin θ = nλ/d = ${fix(n * l * 1e-9 / d, 4)}`, `θ = ${fix(Math.asin(n * l * 1e-9 / d) / DEG, 2)}°`] }; },
    () => { const N2 = pick([300, 500, 600, 1000]), l = randi(400, 700); const d = 1e-3 / N2; return { q: `How many orders (the highest n) can be seen either side of the centre for <b>${l} nm</b> light and a grating with <b>${N2} lines/mm</b>?`, a: Math.floor(d / (l * 1e-9)), unit: '', tol: 0, abs: 0.01, steps: [`d/λ = ${sci(d, 3)}/${l}×10⁻⁹ = ${fix(d / (l * 1e-9), 3)}`, `n must be an integer ≤ d/λ ⇒ ${Math.floor(d / (l * 1e-9))}`] }; },
    () => { const N2 = pick([300, 500, 600]), th = +rand(10, 40).toFixed(1); const d = 1e-3 / N2; return { q: `The first-order maximum for a grating with <b>${N2} lines/mm</b> is at <b>${th}°</b>. Find the wavelength in nm.`, a: d * Math.sin(th * DEG) * 1e9, unit: 'nm', steps: ['λ = d sin θ / n', `= ${sci(d, 3)} × sin ${th}° = ${fix(d * Math.sin(th * DEG) * 1e9, 1)} nm`] }; },
  ] });
}

topic({
  id: 'interference', code: '2.4', unit: 'AS 2', title: 'Superposition, Interference & Diffraction', short: 'Interference',
  blurb: 'Waves add. Build stationary waves, probe path difference in a live ripple tank, measure Young’s fringes and split light with a grating.',
  outcomes: [
    ['2.4.1', 'state the principle of superposition', 'standing'],
    ['2.4.2', 'demonstrate an understanding of the formation of stationary waves, including nodes and antinodes, and describe experiments to demonstrate them', 'standing'],
    ['2.4.3', 'compare progressive and stationary waves', 'standing'],
    ['2.4.4', 'demonstrate an understanding of coherence, path difference and phase difference, and the conditions for constructive and destructive interference', 'young'],
    ['2.4.5', 'describe Young’s double-slit experiment and recall and use λ = ay/D', 'young'],
    ['2.4.6', 'demonstrate a qualitative understanding of diffraction at a single slit', 'grating'],
    ['2.4.7', 'recall and use d sin θ = nλ for a diffraction grating and describe an experiment to measure wavelength', 'grating'],
  ],
  labs: [
    { id: 'standing', title: 'Superposition & stationary waves', hint: 'nodes λ/2 apart', spec: ['2.4.1', '2.4.2', '2.4.3'], mount: mountStanding },
    { id: 'young', title: 'Interference & Young’s slits', hint: 'λ = ay/D', spec: ['2.4.4', '2.4.5'], mount: mountYoung },
    { id: 'grating', title: 'Diffraction & gratings', hint: 'd sin θ = nλ', spec: ['2.4.6', '2.4.7'], mount: mountGrating },
  ],
  equations: [['\\lambda = \\frac{ay}{D}', 'Young'], ['d\\sin\\theta = n\\lambda', 'grating'], ['\\text{node spacing} = \\frac{\\lambda}{2}', 'stationary wave'], ['\\Delta\\phi = \\frac{2\\pi\\,\\Delta x}{\\lambda}', 'phase from path difference']],
  traps: ['Adjacent nodes are λ/2 apart, not λ.', 'Coherent = same frequency + constant phase difference (not necessarily in phase).', 'd is the slit spacing = 1/(lines per metre): convert lines per mm!', 'n must be an integer and sin θ ≤ 1 — round the maximum order <b>down</b>.', 'In λ = ay/D, a is the slit <b>separation</b>, y the <b>fringe spacing</b>.'],
  notes: [
    ['Principle of superposition', 'When two or more waves meet, the resultant displacement at any point is the vector sum of the individual displacements.'],
    ['Stationary waves', 'Formed by superposition of two progressive waves of the same frequency, amplitude and speed travelling in opposite directions (often a wave and its reflection). Nodes: zero amplitude; antinodes: maximum. Node spacing λ/2. No net energy transfer.'],
    ['Interference', 'Needs coherent sources. Constructive where path difference = nλ (phase difference 2nπ), destructive where path difference = (n + ½)λ.'],
    ['Young’s double slit', 'λ = ay/D, a = slit separation, y = fringe spacing, D = slit–screen distance. Measure several fringes to reduce percentage uncertainty.'],
    ['Diffraction', 'Spreading of waves through gaps or around obstacles; greatest when gap ≈ λ. Single slit: broad central maximum.'],
    ['Diffraction grating', 'd sin θ = nλ, where d = 1/N. Sharp, bright maxima. Maximum order n ≤ d/λ.'],
  ],
  mini(c, w, h, t, C) {
    const y0 = h / 2, A = h * 0.3; const pts = []; for (let x = 0; x <= w; x += 3) pts.push([x, y0 - A * Math.sin(3 * Math.PI * x / w) * Math.cos(t * 3)]); line(c, pts, { color: C.red, width: 2.2 });
    for (let n = 0; n <= 3; n++) dot(c, n * w / 3, y0, 3, C.ink);
  },
});
})();

/* ================= 2.5 Quantum physics ================= */
(() => {
const h = 6.63e-34, c0 = 3.0e8, e = 1.6e-19;
const METALS = { Cs: [2.1, 'Caesium'], Na: [2.3, 'Sodium'], Zn: [4.3, 'Zinc'], Cu: [4.7, 'Copper'] };
const colOf = nm => nm < 380 ? Theme.c.violet : nm > 700 ? Theme.c.red : wlColor(nm);

/* ---------- Lab A: photoelectric effect ---------- */
function mountPhoto(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 400, mobileAspect: 1.2 });
  const S2 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, plain: true });
  let metal = 'Na', lamNm = 400, inten = 0.6, Vs = 0, photons = [], els = [], acc = 0, rows = [];
  const plot = new Plot(S2, { xlabel: 'frequency *f* / 10¹⁴ Hz', ylabel: '*E*ₖ₍ₘₐₓ₎ / eV', xmin: 0, xmax: 15, ymin: -5, ymax: 5 });
  L.loop(dt => {
    const phi = METALS[metal][0], E = h * c0 / (lamNm * 1e-9) / e, Kmax = E - phi, C = Theme.c;
    const c = S1.begin(), W = S1.w, H = S1.h, px = W * 0.2, cx = W * 0.8, cy = H * 0.55;
    // lamp
    acc += dt * inten * 30; while (acc > 1) { acc--; photons.push({ x: 20, y: rand(cy - 70, cy + 70), t: 0 }); }
    c.fillStyle = C.ink2; c.fillRect(px - 8, cy - 80, 16, 160); rich(c, METALS[metal][1] + ` (φ = ${phi} eV)`, px, cy + 98, { align: 'center', size: 12, w: 600, color: C.ink2 });
    c.fillStyle = C.ink2; c.fillRect(cx, cy - 60, 10, 120); rich(c, 'collector', cx + 5, cy + 78, { align: 'center', size: 11, color: C.muted });
    for (const p of photons) { p.x += dt * 260; const col = colOf(lamNm), wl = clamp(lamNm / 60, 3, 12); const pts = []; for (let k = -12; k <= 12; k++) pts.push([p.x + k, p.y + 4 * Math.sin(k / wl * TAU) * Math.exp(-(k * k) / 60)]); line(c, pts, { color: col, width: 1.6 }); if (p.x > px - 8 && !p.hit) { p.hit = true; if (Kmax > 0 && Math.random() < 0.5) { const k = Math.random() * Kmax; els.push({ x: px + 8, y: p.y, vx: Math.sqrt(k) * 150 + 5, k }); } } }
    photons = photons.filter(p => !p.hit);
    let arrived = 0;
    for (const el2 of els) { const a = -Vs * 150 * 150 / (cx - px) * 0.5; el2.vx += a * dt; el2.x += el2.vx * dt; if (el2.x >= cx) { el2.done = true; arrived++; } if (el2.x < px + 8) el2.done = true; dot(c, el2.x, el2.y, 3, C.cyan); }
    els = els.filter(e2 => !e2.done);
    const Vstop = Math.max(0, Kmax);
    rich(c, Kmax > 0 ? `photon energy ${fix(E, 2)} eV > work function ${phi} eV: electrons emitted with Eₖ up to ${fix(Kmax, 2)} eV` : `photon energy ${fix(E, 2)} eV < work function ${phi} eV: NO emission, however bright`, W / 2, 20, { align: 'center', size: 12.5, w: 700, color: Kmax > 0 ? C.green : C.red });
    meter(c, (px + cx) / 2, H - 20, `stopping pd ${fix(Vs, 2)} V · current ${Kmax > Vs ? fix(inten * (1 - Vs / Math.max(Kmax, 1e-6)) * 10, 1) : '0.0'} µA`, { color: C.blue });
    S2.begin(); plot.axes();
    const f0 = phi * e / h / 1e14; plot.curve(x => x * 1e14 * h / e - phi, { color: alpha(C.orange, .5), width: 1.4, dash: [5, 4] });
    plot.hline(0, { color: C.ink2, dash: null });
    plot.label(f0, 0, `*f*₀ = ${fix(f0, 2)}`, { dx: 4, dy: 12, size: 11.5, color: C.orange, w: 600 });
    plot.label(0.3, -phi, `−φ`, { dx: 4, dy: -8, size: 12, color: C.orange, w: 600 });
    plot.cross(rows.map(r => [r.f, r.K]), { color: C.red, s: 5, width: 2 });
    if (rows.length >= 2) { const n = rows.length, sx = rows.reduce((a, r) => a + r.f, 0), sy = rows.reduce((a, r) => a + r.K, 0), sxy = rows.reduce((a, r) => a + r.f * r.K, 0), sxx = rows.reduce((a, r) => a + r.f * r.f, 0), m = (n * sxy - sx * sy) / (n * sxx - sx * sx), b = (sy - m * sx) / n; plot.curve(x => m * x + b, { color: C.green, width: 1.8 }); ro.set('hh', `${sci(m * e / 1e14, 3)} J s`); ro.set('pf', `${fix(-b, 2)} eV`); }
    ro.set('E', `${fix(E, 3)} eV = ${sci(E * e, 3)} J`); ro.set('f', `${sci(c0 / (lamNm * 1e-9), 3)} Hz`); ro.set('K', Kmax > 0 ? `${fix(Kmax, 3)} eV` : 'none'); ro.set('Vs', `${fix(Vstop, 2)} V`);
  }, [S1, S2]);
  const g = Group(P.side, 'Light & metal');
  Seg(g, { options: Object.entries(METALS).map(([k, v]) => [k, v[1]]), value: metal, wrap: true, onchange: v => { metal = v; rows = []; } });
  Slider(g, { id: 'pe-l', label: 'Wavelength', min: 150, max: 700, step: 5, value: lamNm, unit: 'nm', fmt: v => fix(v, 0), oninput: v => lamNm = v });
  Slider(g, { id: 'pe-I', label: 'Intensity', min: 0.1, max: 1, step: 0.05, value: inten, fmt: v => Math.round(v * 100) + '%', oninput: v => inten = v });
  Slider(g, { id: 'pe-V', label: 'Stopping (reverse) pd', min: 0, max: 5, step: 0.05, value: Vs, unit: 'V', fmt: v => fix(v, 2), oninput: v => Vs = v });
  const b = Btns(g); Btn(b, 'Record (f, Eₖmax)', () => { const phi = METALS[metal][0], E = h * c0 / (lamNm * 1e-9) / e; if (E > phi) rows.push({ f: c0 / (lamNm * 1e-9) / 1e14, K: E - phi + gauss() * 0.03 }); }, 'pri'); Btn(b, 'Clear', () => rows = []);
  const ro = Readout(Group(P.side, 'Photon'), [['E', 'Photon energy <i>hf</i>'], ['f', 'Frequency'], ['K', '<i>E</i>ₖ max = <i>hf</i> − φ', 'hl'], ['Vs', 'Stopping potential'], ['hh', 'h from gradient'], ['pf', 'φ from intercept']]);
  Note(P.side, 'Brighter light = <b>more photons</b>, so more electrons — but not faster ones. The maximum kinetic energy depends only on the frequency. Below the threshold frequency nothing is emitted, however intense the light.');
  EqCard(P.below, 'Photon equations (2.5.1–2.5.2)', [['E = hf = \\frac{hc}{\\lambda}', 'h = 6.63 × 10⁻³⁴ J s'], ['hf = \\phi + \\frac{1}{2}mv_{max}^2', 'Einstein’s photoelectric equation'], ['hf_0 = \\phi', 'threshold frequency'], ['eV_s = \\frac{1}{2}mv_{max}^2', 'stopping potential'], ['1\\,\\text{eV} = 1.6 \\times 10^{-19}\\,\\text{J}', '']]);
  Card(P.below, 'Why this proves photons', list(['Emission is <b>instantaneous</b>, even for dim light — a wave would take time to deliver enough energy.', 'There is a <b>threshold frequency</b>; waves of any frequency should eventually eject electrons if intense enough.', 'Maximum KE increases linearly with <b>frequency</b> and is independent of intensity.', 'Explanation: light arrives as photons of energy <i>hf</i>; one photon gives all its energy to one electron. Some energy (at least φ) frees the electron; the rest is kinetic energy.', '<b>Work function</b> φ: the minimum energy needed to remove an electron from the surface of the metal.']));
  Drill(P.below, { title: 'Photoelectric drill', gens: [
    () => { const l = randi(200, 700); return { q: `Find the energy of a photon of wavelength <b>${l} nm</b> in eV.`, a: h * c0 / (l * 1e-9) / e, unit: 'eV', steps: ['E = hc/λ', `= 6.63×10⁻³⁴ × 3.00×10⁸ / ${l}×10⁻⁹ = ${sci(h * c0 / (l * 1e-9), 3)} J`, `÷ 1.6×10⁻¹⁹ = ${fix(h * c0 / (l * 1e-9) / e, 3)} eV`] }; },
    () => { const [k, [phi, name]] = pick(Object.entries(METALS)); return { q: `${name} has a work function of <b>${phi} eV</b>. Find its threshold frequency.`, a: phi * e / h, unit: 'Hz', steps: ['f₀ = φ/h', `= ${phi} × 1.6×10⁻¹⁹ / 6.63×10⁻³⁴ = ${sci(phi * e / h, 3)} Hz`] }; },
    () => { const phi = pick([2.1, 2.3, 2.9, 4.3]), l = randi(150, Math.floor(1240 / phi) - 30); const K = h * c0 / (l * 1e-9) / e - phi; return { q: `Light of wavelength <b>${l} nm</b> falls on a metal of work function <b>${phi} eV</b>. Find the maximum kinetic energy of the photoelectrons in eV.`, a: K, unit: 'eV', steps: [`hf = ${fix(h * c0 / (l * 1e-9) / e, 3)} eV`, `Eₖ = hf − φ = ${fix(K, 3)} eV`] }; },
    () => ({ q: 'Doubling the intensity of light above the threshold frequency…', options: ['doubles the number of photoelectrons per second but not their maximum KE', 'doubles the maximum KE', 'halves the work function', 'has no effect at all'], correct: 0, why: 'Intensity = number of photons per second; KE depends only on frequency.' }),
  ] });
}

/* ---------- Lab B: energy levels & line spectra ---------- */
function mountLevels(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1 });
  const S2 = L.stage(P.stageBox, { aspect: 6, minH: 90, maxH: 120, plain: true });
  let mode = 'emit', lines = [], cur = 3, anim = null, t = 0;
  const lev = n => -13.6 / (n * n), NMAX = 6;
  const geo = () => { const W = S1.w, H = S1.h, x0 = W * 0.16, x1 = W * 0.7, Y = E => 40 + (H - 64) * Math.sqrt(Math.max(0, -E) / 13.6); return { W, H, x0, x1, Y }; };
  Pointer(S1, { hit: (px, py) => { const g = geo(); for (let n = 1; n <= NMAX; n++) if (Math.abs(py - g.Y(lev(n))) < 10 && px > g.x0 - 10 && px < g.x1 + 10) return n; return null; }, down: n => { if (anim) return; if (mode === 'emit') { if (n < cur) jump(cur, n); else cur = n; } else { if (n > cur) jump(cur, n); else cur = n; } } });
  function jump(a, b) { const dE = Math.abs(lev(a) - lev(b)), nm = h * c0 / (dE * e) * 1e9; anim = { a, b, t: 0, nm, dE }; }
  L.loop(dt => {
    t += dt; const c = S1.begin(), C = Theme.c, g = geo();
    for (let n = 1; n <= NMAX; n++) { const y = g.Y(lev(n)); line(c, [[g.x0, y], [g.x1, y]], { color: n === cur ? C.blue : C.ink2, width: n === cur ? 3 : 1.6 }); rich(c, `*n* = ${n}`, g.x0 - 10, y, { align: 'right', size: 12, color: C.ink2 }); rich(c, `${fix(lev(n), 2)} eV`, g.x1 + 8, y, { size: 11.5, mono: true, color: C.muted }); }
    line(c, [[g.x0, g.Y(0)], [g.x1, g.Y(0)]], { color: C.muted, width: 1, dash: [4, 4] }); rich(c, 'ionisation (0 eV)', g.x1 + 8, g.Y(0) - 12, { size: 11, color: C.muted }); rich(c, 'energy axis not to scale', 10, g.H - 10, { size: 10.5, color: C.muted });
    const ey = anim ? lerp(g.Y(lev(anim.a)), g.Y(lev(anim.b)), clamp(anim.t / 0.6, 0, 1)) : g.Y(lev(cur)), ex = (g.x0 + g.x1) / 2;
    dot(c, ex, ey, 7, C.cyan, C.paper2);
    if (anim) {
      anim.t += dt; const col = colOf(anim.nm), up = anim.b > anim.a;
      arrow(c, ex + 30, g.Y(lev(anim.a)), ex + 30, g.Y(lev(anim.b)), { color: col, width: 2.4 });
      const ph = clamp((anim.t - (up ? 0 : 0.5)) / 1, 0, 1), sx = up ? g.W * 0.98 - ph * (g.W * 0.98 - ex) : ex + ph * (g.W - ex);
      const pts = []; for (let k = -18; k <= 18; k++) pts.push([sx + k, (g.Y(lev(anim.a)) + g.Y(lev(anim.b))) / 2 + 5 * Math.sin(k / 3) * Math.exp(-k * k / 90)]); line(c, pts, { color: col, width: 2 });
      rich(c, `ΔE = ${fix(anim.dE, 2)} eV → λ = ${fix(anim.nm, 0)} nm ${anim.nm < 380 ? '(ultraviolet)' : anim.nm > 700 ? '(infrared)' : ''}`, g.W / 2, 18, { align: 'center', size: 13, w: 700, color: C.ink });
      if (anim.t > 1.4) { lines.push({ nm: anim.nm, emit: mode === 'emit' }); cur = anim.b; anim = null; }
    } else rich(c, mode === 'emit' ? 'click a LOWER level: the electron drops and emits a photon' : 'click a HIGHER level: the atom absorbs a photon of exactly ΔE', g.W / 2, 18, { align: 'center', size: 12.5, color: C.muted });
    // spectrum strip 380–700 nm
    const c2 = S2.begin(), W2 = S2.w, H2 = S2.h, X = nm => 10 + (nm - 380) / 320 * (W2 - 20);
    if (mode === 'absorb') for (let px = 10; px < W2 - 10; px++) { c2.fillStyle = wlColor(380 + (px - 10) / (W2 - 20) * 320); c2.fillRect(px, 8, 1, H2 - 34); }
    else { c2.fillStyle = SPACE(); c2.fillRect(10, 8, W2 - 20, H2 - 34); }
    for (const ln of lines) { if (ln.nm < 380 || ln.nm > 700) continue; c2.fillStyle = mode === 'absorb' ? C.ink : wlColor(ln.nm); c2.fillRect(X(ln.nm) - 1.5, 8, 3, H2 - 34); }
    for (const nm of [400, 450, 500, 550, 600, 650, 700]) rich(c2, `${nm}`, X(nm), H2 - 12, { align: 'center', size: 10, mono: true, color: C.muted });
    ro.set('n', String(cur)); ro.set('E', `${fix(lev(cur), 2)} eV`); ro.set('nl', String(lines.length));
  }, [S1, S2]);
  const g = Group(P.side, 'Hydrogen atom');
  Seg(g, { options: [['emit', 'Emission'], ['absorb', 'Absorption']], value: mode, onchange: v => { mode = v; lines = []; cur = v === 'emit' ? 5 : 1; } });
  const b = Btns(g); Btn(b, 'Balmer series (→ n = 2)', () => { mode = 'emit'; lines = [3, 4, 5, 6].map(n => ({ nm: h * c0 / ((lev(n) - lev(2)) * e) * 1e9 })); }, 'pri'); Btn(b, 'Clear spectrum', () => lines = []);
  const ro = Readout(Group(P.side, 'State'), [['n', 'Electron level'], ['E', 'Energy'], ['nl', 'Lines recorded']]);
  Note(P.side, 'Energy levels are <b>discrete</b>, so only photons of particular energies — hence particular wavelengths — can be emitted or absorbed. That is why every element has its own line spectrum.');
  EqCard(P.below, 'Line spectra (2.5.4)', [['hf = E_1 - E_2', 'photon energy = level difference'], ['\\lambda = \\frac{hc}{E_1 - E_2}', ''], ['E_n = -\\frac{13.6}{n^2}\\,\\text{eV}', 'hydrogen (for interest)']]);
  Card(P.below, 'Key ideas', list(['Electrons in atoms occupy discrete energy levels; the ground state is the lowest.', '<b>Emission spectrum:</b> bright lines on a dark background from a hot, low-pressure gas — electrons drop to lower levels, emitting photons.', '<b>Absorption spectrum:</b> dark lines on a continuous spectrum — cool gas absorbs photons whose energy matches a level gap, then re-emits in all directions.', 'Energy levels are negative: 0 eV is the ionisation level (electron just free).', '<b>Ionisation energy:</b> energy needed to remove an electron from the ground state (13.6 eV for hydrogen).', '<b>Excitation:</b> moving an electron to a higher level by photon absorption or electron collision.']));
  Drill(P.below, { title: 'Energy levels drill', gens: [
    () => { const a = randi(3, 6), b2 = randi(1, a - 1); const dE = 13.6 * (1 / (b2 * b2) - 1 / (a * a)); return { q: `An electron in hydrogen drops from <b>n = ${a}</b> (${fix(lev(a), 2)} eV) to <b>n = ${b2}</b> (${fix(lev(b2), 2)} eV). Find the wavelength of the photon in nm.`, a: h * c0 / (dE * e) * 1e9, unit: 'nm', steps: [`ΔE = ${fix(dE, 3)} eV = ${sci(dE * e, 3)} J`, `λ = hc/ΔE = ${fix(h * c0 / (dE * e) * 1e9, 1)} nm`] }; },
    () => { const E1 = -+rand(0.5, 3).toFixed(2), E2 = -+rand(4, 12).toFixed(2); return { q: `Two levels are at <b>${E1} eV</b> and <b>${E2} eV</b>. What frequency of photon is emitted in a transition between them?`, a: (E1 - E2) * e / h, unit: 'Hz', steps: [`ΔE = ${fix(E1 - E2, 2)} eV`, `f = ΔE/h = ${sci((E1 - E2) * e / h, 3)} Hz`] }; },
    () => ({ q: 'An absorption spectrum consists of…', options: ['dark lines on a continuous spectrum', 'bright lines on a dark background', 'a continuous spectrum only', 'one bright line'], correct: 0, why: 'Cool gas removes specific photon energies from white light.' }),
  ] });
}

/* ---------- Lab C: Planck constant from LEDs ---------- */
function mountLED(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 320, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, plain: true });
  const LEDS = { red: 635, orange: 610, yellow: 590, green: 525, blue: 470, violet: 405 };
  let led = 'red', V = 1.2, rows = [];
  const plot = new Plot(S2, { xlabel: '1/λ / 10⁶ m⁻¹', ylabel: 'threshold pd *V*₀ / V', xmin: 1.4, xmax: 2.6, ymin: 1.5, ymax: 3.3 });
  L.loop(() => {
    const lam = LEDS[led] * 1e-9, V0 = h * c0 / (lam * e) * 1.0 + 0.0, I = V > V0 ? Math.min(20, (V - V0) * 60) : 0;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const x0 = W * 0.1, x1 = W * 0.6, y0 = H * 0.25, y1 = H * 0.8;
    comp(c, 'battery', x0, y1, x0, y0, { label: 'variable supply', side: 1 }); comp(c, 'resistor', x0, y0, x1, y0, { label: 'protective 330 Ω' }); comp(c, 'ammeter', x1, y0, x1, (y0 + y1) / 2, { size: 28 });
    comp(c, 'diode', x1, (y0 + y1) / 2, x1, y1, { size: 30, color: wlColor(LEDS[led]) }); comp(c, 'wire', x1, y1, x0, y1);
    if (I > 0) { c.beginPath(); c.arc(x1, (y0 + y1) * 0.62, 12 + I, 0, TAU); c.fillStyle = alpha(wlColor(LEDS[led]), Math.min(0.7, I / 25)); c.fill(); }
    meter(c, x1 + 60, y0 + 24, `${fix(I, 1)} mA`, { color: C.blue }); meter(c, x1 + 60, y1 - 20, `${fix(V, 2)} V`, { color: C.violet });
    rich(c, I > 0 ? 'the LED has just begun to emit' : 'below the threshold: no light', W * 0.82, H * 0.5, { align: 'center', size: 13, w: 700, color: I > 0 ? C.green : C.muted });
    S2.begin(); plot.axes();
    if (rows.length >= 2) { const n = rows.length, sx = rows.reduce((a, r) => a + r.x, 0), sy = rows.reduce((a, r) => a + r.y, 0), sxy = rows.reduce((a, r) => a + r.x * r.y, 0), sxx = rows.reduce((a, r) => a + r.x * r.x, 0), m = (n * sxy - sx * sy) / (n * sxx - sx * sx), b2 = (sy - m * sx) / n; plot.curve(x => m * x + b2, { color: C.green, width: 1.8 }); const hh = m * 1e-6 * e / c0; ro.set('g', `${sci(m * 1e-6, 3)} V m`); ro.set('h', `${sci(hh, 3)} J s`); }
    plot.dots(rows.map(r => [r.x, r.y]), { color: C.red, r: 4 });
    ro.set('V0', `${fix(V0, 3)} V`); ro.set('lam', `${LEDS[led]} nm`);
  }, [S1, S2]);
  const g = Group(P.side, 'LED');
  Seg(g, { options: Object.keys(LEDS).map(k => [k, k[0].toUpperCase() + k.slice(1)]), value: led, wrap: true, onchange: v => { led = v; V = 1.2; sv.set(V); } });
  const sv = Slider(g, { id: 'ld-V', label: 'Supply pd across LED', min: 1, max: 3.5, step: 0.01, value: V, unit: 'V', fmt: v => fix(v, 2), oninput: v => V = v });
  const b = Btns(g); Btn(b, 'Record V₀ at switch-on', () => { const lam = LEDS[led] * 1e-9, V0 = h * c0 / (lam * e); if (V >= V0 && V < V0 + 0.08) rows.push({ x: 1 / lam / 1e6, y: V + gauss() * 0.01 }); else inlineMsg(g, 'Raise the pd slowly until the LED only just lights, then record.'); }, 'pri'); Btn(b, 'Clear', () => rows = []);
  const ro = Readout(Group(P.side, 'Analysis'), [['lam', 'LED wavelength'], ['V0', 'Threshold pd (true)'], ['g', 'Gradient'], ['h', '<i>h</i> = gradient × <i>e</i>/<i>c</i>', 'hl']]);
  Note(P.side, 'At switch-on each electron crossing the LED gives up energy <i>eV</i>₀ to make one photon: <i>eV</i>₀ = <i>hc</i>/λ. So a graph of <i>V</i>₀ against 1/λ has gradient <i>hc</i>/<i>e</i>.');
  Card(P.below, 'Method', list(['Connect each LED in series with a protective resistor and a variable supply; voltmeter across the LED.', 'Increase the pd slowly until the LED just lights (view through a tube to exclude room light); record <i>V</i>₀.', 'Repeat for LEDs of different known wavelengths.', 'Plot <i>V</i>₀ against 1/λ; gradient = <i>hc</i>/<i>e</i>, so <i>h</i> = gradient × <i>e</i>/<i>c</i>.', 'Judging “just lit” is subjective — a systematic source of error.']));
}

topic({
  id: 'quantum', code: '2.5', unit: 'AS 2', title: 'Quantum Physics', short: 'Quantum',
  blurb: 'Light comes in photons. Knock electrons out of metals, jump between hydrogen’s energy levels to make line spectra, and measure h with LEDs.',
  outcomes: [
    ['2.5.1', 'describe the photoelectric effect and demonstrate an understanding of threshold frequency and work function', 'photo'],
    ['2.5.2', 'recall and use E = hf and hf = φ + ½mv²max, including the electronvolt', 'photo'],
    ['2.5.3', 'describe an experiment to determine the Planck constant', 'led'],
    ['2.5.4', 'demonstrate an understanding of energy levels, line emission and absorption spectra, and recall and use hf = E₁ − E₂', 'levels'],
  ],
  labs: [
    { id: 'photo', title: 'Photoelectric effect', hint: 'hf = φ + Eₖ', spec: ['2.5.1', '2.5.2'], mount: mountPhoto },
    { id: 'levels', title: 'Energy levels & spectra', hint: 'click to jump', spec: ['2.5.4'], mount: mountLevels },
    { id: 'led', title: 'Planck constant from LEDs', hint: 'eV₀ = hc/λ', spec: ['2.5.3'], mount: mountLED },
  ],
  equations: [['E = hf = \\frac{hc}{\\lambda}', ''], ['hf = \\phi + \\frac{1}{2}mv_{max}^2', ''], ['hf = E_1 - E_2', ''], ['1\\,\\text{eV} = 1.6\\times10^{-19}\\,\\text{J}', '']],
  traps: ['Convert eV ↔ J with 1.6 × 10⁻¹⁹ before using SI equations.', 'Intensity changes the <b>number</b> of photoelectrons, not their maximum KE.', 'Work function is the <b>minimum</b> energy to remove an electron from the surface.', 'Photon energies depend on the <b>difference</b> between levels, not the level values.', 'Energy levels are negative; the ground state is the most negative.'],
  notes: [
    ['Photons', 'Electromagnetic radiation is emitted and absorbed in discrete packets (quanta) called photons, each of energy E = hf = hc/λ.'],
    ['The photoelectric effect', 'Electrons are emitted from a metal surface when light of high enough frequency falls on it. Evidence for photons: threshold frequency, instantaneous emission, KE depends on frequency not intensity.'],
    ['Einstein’s equation', 'hf = φ + ½mv²max. φ = work function (minimum energy to free an electron). Threshold frequency f₀ = φ/h. A graph of Eₖmax against f has gradient h and y-intercept −φ.'],
    ['The electronvolt', '1 eV is the energy gained by an electron accelerated through a pd of 1 V: 1.6 × 10⁻¹⁹ J.'],
    ['Energy levels and spectra', 'Atomic electrons have discrete energy levels. A transition between levels emits or absorbs a photon with hf = E₁ − E₂. Emission spectra: bright lines; absorption spectra: dark lines in a continuous spectrum.'],
    ['Measuring h', 'LEDs: eV₀ = hc/λ, plot V₀ against 1/λ, gradient hc/e.'],
  ],
  mini(c, w, h2, t, C) {
    for (let n = 1; n <= 4; n++) { const y = h2 - 12 - (1 - 1 / (n * n)) * (h2 - 30); line(c, [[w * 0.2, y], [w * 0.6, y]], { color: C.ink2, width: 1.5 }); }
    const q = (t % 2) / 2, ya = h2 - 12 - (1 - 1 / 9) * (h2 - 30), yb = h2 - 12 - (1 - 1 / 4) * (h2 - 30); dot(c, w * 0.4, lerp(ya, yb, Math.min(1, q * 2)), 5, C.cyan);
    if (q > 0.5) { const x = w * 0.62 + (q - 0.5) * w * 0.7, y = (ya + yb) / 2; const pts = []; for (let k = -12; k <= 12; k++) pts.push([x + k, y + 4 * Math.sin(k / 2)]); line(c, pts, { color: C.red, width: 2 }); }
  },
});
})();

/* ================= 2.6 Wave–particle duality ================= */
(() => {
const h = 6.63e-34, me = 9.11e-31, e = 1.6e-19;

/* ---------- Lab A: electron diffraction tube ---------- */
function mountTube(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 400, mobileAspect: 1.1 });
  const S2 = L.stage(P.stageBox, { aspect: 2.6, minH: 220, maxH: 300, plain: true });
  let V = 3000, rows = [], t = 0, part = 'electron';
  const MASS = { electron: me, proton: 1.67e-27, neutron: 1.67e-27 };
  const d1 = 2.13e-10, d2 = 1.23e-10, Lt = 0.135; // graphite spacings, tube length
  const plot = new Plot(S2, { xlabel: '1/√*V* / V⁻½', ylabel: 'ring radius *r* / mm', xmin: 0, xmax: 0.03, ymin: 0, ymax: 40 });
  L.loop(dt => {
    t += dt;
    const m = MASS[part], lam = h / Math.sqrt(2 * m * e * V), c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    // tube
    const gx = W * 0.14, cy = H / 2, sx = W * 0.62, R = Math.min(H * 0.42, W * 0.18);
    c.strokeStyle = C.line2; c.lineWidth = 1.5; c.beginPath(); c.moveTo(20, cy - 18); c.lineTo(gx, cy - 18); c.lineTo(sx - 10, cy - R); c.lineTo(sx, cy - R); c.lineTo(sx, cy + R); c.lineTo(sx - 10, cy + R); c.lineTo(gx, cy + 18); c.lineTo(20, cy + 18); c.stroke();
    rich(c, `electron gun, ${fix(V / 1000, 1)} kV`, 24, cy - 28, { size: 11, color: C.muted }); c.fillStyle = C.ink2; c.fillRect(gx - 2, cy - 10, 4, 20); rich(c, 'graphite film', gx, cy + 32, { align: 'center', size: 11, color: C.muted });
    for (let k = 0; k < 10; k++) { const x = 30 + ((t * 120 + k * 12) % (gx - 30)); dot(c, x, cy + Math.sin(k) * 4, 2, C.cyan); }
    // rings on the screen (face-on inset)
    const r1 = Lt * Math.tan(2 * Math.asin(Math.min(1, lam / (2 * d1)))), r2 = Lt * Math.tan(2 * Math.asin(Math.min(1, lam / (2 * d2))));
    const fx = W * 0.82, scr = Math.min(H * 0.4, W * 0.16), pxPerM = scr / 0.05;
    c.beginPath(); c.arc(fx, cy, scr, 0, TAU); c.fillStyle = SPACE(); c.fill();
    const glow = (r, a) => { c.save(); c.strokeStyle = `rgba(90,255,160,${a})`; c.lineWidth = 3; c.shadowColor = 'rgba(90,255,160,.9)'; c.shadowBlur = 8; c.beginPath(); c.arc(fx, cy, r * pxPerM, 0, TAU); c.stroke(); c.restore(); };
    if (r1 < 0.05) glow(r1, 0.9); if (r2 < 0.05) glow(r2, 0.6); dot(c, fx, cy, 4, 'rgba(90,255,160,1)');
    rich(c, 'fluorescent screen (face on)', fx, cy + scr + 16, { align: 'center', size: 11, color: C.muted });
    // side view cones
    for (const [r, a] of [[r1, .7], [r2, .45]]) if (r < 0.05) { const ry = r / 0.05 * R; line(c, [[gx, cy], [sx, cy - ry]], { color: `rgba(90,200,140,${a})`, width: 1.4 }); line(c, [[gx, cy], [sx, cy + ry]], { color: `rgba(90,200,140,${a})`, width: 1.4 }); }
    S2.begin(); plot.axes();
    plot.curve(x => 1000 * Lt * Math.tan(2 * Math.asin(Math.min(1, h * x / Math.sqrt(2 * me * e) / (2 * d1)))), { color: alpha(C.green, .45), width: 1.4, dash: [5, 4] });
    plot.cross(rows.map(r => [r.x, r.y]), { color: C.red, s: 5, width: 2 });
    ro.set('lam', `${sci(lam, 3)} m`); ro.set('p', `${sci(Math.sqrt(2 * m * e * V), 3)} kg m s⁻¹`); ro.set('r1', r1 < 0.05 ? `${fix(r1 * 1000, 2)} mm` : 'off screen'); ro.set('v', `${sci(Math.sqrt(2 * e * V / m), 3)} m s⁻¹`);
  }, [S1, S2]);
  const g = Group(P.side, 'Tube');
  Slider(g, { id: 'ed-V', label: 'Accelerating pd', min: 1500, max: 5000, step: 50, value: V, unit: 'V', fmt: v => fix(v, 0), oninput: v => V = v });
  Seg(g, { label: 'Particle (for λ)', options: [['electron', 'Electron'], ['proton', 'Proton']], value: part, onchange: v => part = v });
  const b = Btns(g); Btn(b, 'Record inner ring', () => { const lam = h / Math.sqrt(2 * me * e * V); rows.push({ x: 1 / Math.sqrt(V), y: 1000 * Lt * Math.tan(2 * Math.asin(lam / (2 * d1))) * (1 + gauss() * 0.02) }); }, 'pri'); Btn(b, 'Clear', () => rows = []);
  const ro = Readout(Group(P.side, 'de Broglie'), [['v', 'Speed'], ['p', 'Momentum <i>p</i>'], ['lam', 'λ = <i>h</i>/<i>p</i>', 'hl'], ['r1', 'Inner ring radius']]);
  Note(P.side, 'Raise the voltage: the electrons go faster, their momentum rises, their wavelength falls — and the rings shrink. Only a wave can diffract, so this shows electrons behave as waves.');
  EqCard(P.below, 'de Broglie (2.6.2)', [['\\lambda = \\frac{h}{p} = \\frac{h}{mv}', ''], ['\\frac{1}{2}mv^2 = eV', 'accelerated from rest'], ['\\lambda = \\frac{h}{\\sqrt{2meV}}', '']]);
  Card(P.below, 'Evidence for duality (2.6.1)', list(['<b>Electron diffraction:</b> a beam of electrons through a thin graphite film forms rings on a fluorescent screen — a diffraction pattern, which only waves produce. The atom spacing (~10⁻¹⁰ m) is similar to the electron wavelength.', '<b>Photoelectric effect:</b> evidence that light (a wave) behaves as particles.', 'Particles show wave behaviour when they interact with objects comparable in size to their de Broglie wavelength. A cricket ball’s wavelength (~10⁻³⁴ m) is far too small to ever observe.', 'Higher accelerating voltage ⇒ higher momentum ⇒ smaller λ ⇒ smaller rings.']));
  Drill(P.below, { title: 'de Broglie drill', gens: [
    () => { const v = randi(1, 90) * 1e5; return { q: `Find the de Broglie wavelength of an electron travelling at <b>${sci(v, 2)} m s⁻¹</b>. (m = 9.11 × 10⁻³¹ kg)`, a: h / (me * v), unit: 'm', steps: ['λ = h/mv', `= 6.63×10⁻³⁴ / (9.11×10⁻³¹ × ${sci(v, 2)}) = ${sci(h / (me * v), 3)} m`] }; },
    () => { const V2 = randi(10, 500) * 10; return { q: `Electrons are accelerated from rest through <b>${V2} V</b>. Find their de Broglie wavelength.`, a: h / Math.sqrt(2 * me * e * V2), unit: 'm', steps: [`p = √(2meV) = ${sci(Math.sqrt(2 * me * e * V2), 3)} kg m s⁻¹`, `λ = h/p = ${sci(h / Math.sqrt(2 * me * e * V2), 3)} m`] }; },
    () => { const m2 = +rand(0.05, 0.2).toFixed(2), v = randi(10, 40); return { q: `Find the de Broglie wavelength of a <b>${m2} kg</b> ball at <b>${v} m s⁻¹</b>.`, a: h / (m2 * v), unit: 'm', steps: ['λ = h/mv', `= ${sci(h / (m2 * v), 3)} m — far too small to diffract`] }; },
  ] });
}

/* ---------- Lab B: electrons one at a time through two slits ---------- */
function mountBuild(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 300, maxH: 460, mobileAspect: 1.1 });
  let hits = [], rate = 40, acc = 0, which = false, bins = new Array(120).fill(0);
  const pdf = (x, w) => { const s = 0.18, b = Math.PI * x / s; const env = Math.exp(-x * x / 0.25); return w ? Math.exp(-((x - 0.18) ** 2) / 0.04) + Math.exp(-((x + 0.18) ** 2) / 0.04) : env * Math.cos(b * 3) ** 2; };
  const sample = () => { for (;;) { const x = rand(-1, 1); if (Math.random() < pdf(x, which)) return x; } };
  L.loop(dt => {
    acc += dt * rate; while (acc > 1) { acc--; const x = sample(); hits.push([x, Math.random()]); bins[clamp(Math.floor((x + 1) / 2 * 120), 0, 119)]++; if (hits.length > 6000) hits.shift(); }
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, sx = W * 0.14, scX = W * 0.46;
    c.fillStyle = C.ink2; c.fillRect(sx - 3, 20, 6, H * 0.5 - 40); c.fillRect(sx - 3, H * 0.5 - 8, 6, 16); c.fillRect(sx - 3, H * 0.5 + 20, 6, H * 0.5 - 40);
    rich(c, 'electron source → two slits', 12, 14, { size: 11, color: C.muted });
    if (which) rich(c, 'detector watching the slits', sx + 10, H - 14, { size: 11.5, w: 700, color: C.red });
    c.fillStyle = SPACE(); c.fillRect(scX, 10, W * 0.18, H - 20);
    for (const [x, r] of hits) dot(c, scX + 6 + r * (W * 0.18 - 12), H / 2 + x * (H / 2 - 16), 1.2, 'rgba(120,255,170,.85)');
    // histogram
    const hx = W * 0.68, hw = W * 0.28, mx = Math.max(1, ...bins);
    c.strokeStyle = C.line2; c.strokeRect(hx + .5, 10.5, hw, H - 20);
    for (let i = 0; i < 120; i++) { const y = 10 + (i / 120) * (H - 20), bw = bins[i] / mx * (hw - 8); c.fillStyle = alpha(C.green, .75); c.fillRect(hx + 2, y, bw, (H - 20) / 120 + 0.5); }
    rich(c, `${hits.length} electrons`, hx + hw - 6, 24, { align: 'right', size: 12, w: 700, color: C.ink2 });
    rich(c, which ? 'two bands: particle-like' : 'interference fringes build up: wave-like', hx + hw / 2, H - 16, { align: 'center', size: 11.5, w: 700, color: which ? C.red : C.green });
  }, [S]);
  const g = Group(P.side, 'Experiment');
  Slider(g, { id: 'eb-r', label: 'Electrons per second', min: 5, max: 400, step: 5, value: rate, fmt: v => fix(v, 0), oninput: v => rate = v });
  Switch(g, { id: 'eb-w', label: 'Detect which slit each electron uses', value: false, onchange: v => { which = v; hits = []; bins.fill(0); } });
  Btns(g).append(el('button', { class: 'btn', type: 'button', onclick: () => { hits = []; bins.fill(0); } }, 'Clear screen'));
  Note(P.side, 'Each electron arrives at one point, like a particle — yet thousands of them build an interference pattern, like a wave. Watch which slit they pass through and the pattern disappears.');
  Card(P.below, 'Wave–particle duality', `<p>All matter and radiation show both wave and particle properties. Which one you see depends on the experiment: electrons are detected as particles (dots) but travel as waves (interference). This goes beyond the CCEA spec, but it is the clearest picture of what duality means.</p>`);
}

topic({
  id: 'duality', code: '2.6', unit: 'AS 2', title: 'Wave–Particle Duality', short: 'Duality',
  blurb: 'Electrons diffract. Fire them through graphite and watch the rings shrink as the voltage rises, then build a two-slit pattern one electron at a time.',
  outcomes: [
    ['2.6.1', 'describe and explain electron diffraction as evidence of the wave nature of particles', 'tube'],
    ['2.6.2', 'recall and use the de Broglie equation λ = h/p', 'tube'],
  ],
  labs: [
    { id: 'tube', title: 'Electron diffraction tube', hint: 'λ = h/p', spec: ['2.6.1', '2.6.2'], mount: mountTube },
    { id: 'build', title: 'One electron at a time', hint: 'duality made visible', spec: ['2.6.1'], mount: mountBuild },
  ],
  equations: [['\\lambda = \\frac{h}{p} = \\frac{h}{mv}', ''], ['p = \\sqrt{2mE_k}', ''], ['E_k = eV', 'accelerated electrons']],
  traps: ['Use the particle’s <b>momentum</b> (mv), not its energy, in λ = h/p.', 'Convert keV to J before finding speed or momentum.', 'Higher speed ⇒ <b>shorter</b> wavelength ⇒ smaller diffraction rings.', 'Electron diffraction is evidence for <b>waves</b>; the photoelectric effect is evidence for <b>particles</b>.'],
  notes: [
    ['de Broglie', 'Every moving particle has an associated wavelength λ = h/p = h/mv, where h = 6.63 × 10⁻³⁴ J s.'],
    ['Electron diffraction', 'Electrons accelerated through a few kV and passed through thin graphite produce concentric rings on a screen: a diffraction pattern, so electrons behave as waves. Their λ (~10⁻¹¹ m) is comparable to atomic spacing.'],
    ['Effect of voltage', 'Increasing the accelerating pd increases the speed and momentum, decreasing λ, so the rings get smaller: r ∝ 1/√V.'],
    ['Duality', 'Light shows wave properties (interference, diffraction) and particle properties (photoelectric effect). Electrons show particle properties (charge, mass, deflection) and wave properties (diffraction).'],
  ],
  mini(c, w, h2, t, C) {
    const cx = w * 0.6, cy = h2 / 2; c.beginPath(); c.arc(cx, cy, h2 * 0.42, 0, TAU); c.fillStyle = SPACE(); c.fill();
    const r = h2 * (0.18 + 0.06 * Math.sin(t)); c.strokeStyle = 'rgba(90,255,160,.9)'; c.lineWidth = 2.5; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke(); c.beginPath(); c.arc(cx, cy, r * 1.7, 0, TAU); c.stroke();
  },
});
})();

/* ================= 2.7 Astronomy ================= */
(() => {
const c0 = 3.0e8, MPC = 3.09e22;

/* ---------- Lab A: the Doppler effect ---------- */
function mountDoppler(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 420, mobileAspect: 1.2 });
  const S2 = L.stage(P.stageBox, { aspect: 5, minH: 100, maxH: 130, plain: true });
  let vs = 0.4, t = 0, fronts = [], acc = 0, mode = 'sound';
  L.loop(dt => {
    t += dt; const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, wv = 120, f0 = 1.6;
    const span = W * 0.6, sx = W / 2 + ((((t * vs * wv) % span) + span) % span) - span / 2;
    acc += dt * f0; while (acc > 1) { acc--; fronts.push({ x: sx, y: H / 2, t0: t }); }
    fronts = fronts.filter(f => (t - f.t0) * wv < W);
    for (const f of fronts) { const r = (t - f.t0) * wv; c.beginPath(); c.arc(f.x, f.y, r, 0, TAU); c.strokeStyle = alpha(mode === 'sound' ? C.blue : C.red, clamp(1 - r / W, 0, 1)); c.lineWidth = 1.6; c.stroke(); }
    dot(c, sx, H / 2, 8, C.orange, C.paper2); arrow(c, sx + 12, H / 2, sx + 12 + 40 * Math.sign(vs), H / 2, { color: C.orange, width: 2.4 });
    // observers
    const fr = f0 / (1 - vs), fb = f0 / (1 + vs);
    for (const [x, lab, f] of [[W - 30, 'observer on the right', fr], [30, 'us (on the left)', fb]]) { dot(c, x, H / 2, 7, C.ink); rich(c, lab, x, H / 2 + 22, { align: 'center', size: 11, color: C.ink2 }); rich(c, `${fix(f / f0, 2)} × *f*`, x, H / 2 - 22, { align: 'center', size: 12, w: 700, color: f > f0 ? C.blue : C.red }); }
    rich(c, 'wavefronts bunch up ahead of a moving source (higher frequency, shorter λ) and spread out behind it', W / 2, 18, { align: 'center', size: 12, color: C.muted });
    // spectrum
    const c2 = S2.begin(), W2 = S2.w, H2 = S2.h, X = nm => 10 + (nm - 380) / 320 * (W2 - 20), z = mode === 'sound' ? 0 : vs * 0.25;
    for (let px = 10; px < W2 - 10; px++) { c2.fillStyle = wlColor(380 + (px - 10) / (W2 - 20) * 320); c2.fillRect(px, 8, 1, H2 - 36); }
    for (const l of [434, 486, 656]) { const obs = l * (1 + z); c2.fillStyle = C.ink; c2.fillRect(X(obs) - 1.5, 8, 3, H2 - 36); c2.fillStyle = alpha(C.paper2, .9); c2.fillRect(X(l) - 0.5, H2 - 28, 1, 6); }
    rich(c2, mode === 'sound' ? 'switch to light to see the spectral lines shift' : z > 0 ? `receding: lines shifted to the red, z = ${fix(z, 3)}` : z < 0 ? `approaching: blue shift, z = ${fix(z, 3)}` : 'stationary: lines at laboratory wavelengths', W2 / 2, H2 - 10, { align: 'center', size: 11.5, w: 600, color: C.ink2 });
    ro.set('fa', `${fix(fr / f0, 3)} × f`); ro.set('fb', `${fix(fb / f0, 3)} × f`); ro.set('z', mode === 'light' ? fix(z, 3) : '—');
  }, [S1, S2]);
  const g = Group(P.side, 'Source');
  Seg(g, { options: [['sound', 'Sound'], ['light', 'Light (galaxy)']], value: mode, onchange: v => mode = v });
  Slider(g, { id: 'dp-v', label: 'Source speed (fraction of wave speed)', min: -0.8, max: 0.8, step: 0.05, value: vs, fmt: v => fix(v, 2), oninput: v => { vs = v; fronts = []; } });
  const ro = Readout(Group(P.side, 'Observed'), [['fa', 'Frequency on the right'], ['fb', 'Frequency we receive (left)'], ['z', 'Redshift <i>z</i> (light, receding +)', 'hl']]);
  Note(P.side, 'Positive speed = the source moves away from us (on the left). For light from a receding galaxy every spectral line shifts to longer wavelength: <b>red shift</b>. The fractional shift gives the speed: <i>z</i> = Δλ/λ = <i>v</i>/<i>c</i>.');
  EqCard(P.below, 'Doppler (2.7.1)', [['z = \\frac{\\Delta\\lambda}{\\lambda} = \\frac{v}{c}', 'v ≪ c'], ['\\frac{\\Delta f}{f} = -\\frac{v}{c}', 'light']]);
}

/* ---------- Lab B: Hubble's law ---------- */
function mountHubble(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 380, mobileAspect: 1.2 });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 380, plain: true });
  const H0true = 70;
  let gal = [], sel = 0, rows = [], t = 0;
  const make = () => { gal = Array.from({ length: 8 }, (_, i) => { const d = randi(20, 400); const v = H0true * d * (1 + gauss() * 0.06) + gauss() * 300; return { d, v, x: rand(0.1, 0.9), y: rand(0.15, 0.85), s: rand(0.7, 1.3) }; }); rows = []; sel = 0; };
  make();
  const LAB = 393.4; // calcium K line
  L.loop(dt => {
    t += dt; const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    // expanding field of galaxies
    const sc = 1 + 0.08 * ((t % 6) / 6);
    c.fillStyle = SPACE(); c.fillRect(0, 0, W * 0.55, H);
    gal.forEach((g, i) => { const x = W * 0.275 + (g.x - 0.5) * W * 0.55 * sc, y = H / 2 + (g.y - 0.5) * H * sc; c.save(); c.translate(x, y); c.rotate(i); c.beginPath(); c.ellipse(0, 0, 10 * g.s * 200 / g.d + 3, 4 * g.s * 200 / g.d + 1.5, 0, 0, TAU); c.fillStyle = i === sel ? 'rgba(255,220,140,.95)' : 'rgba(200,210,255,.75)'; c.fill(); c.restore(); if (i === sel) { c.strokeStyle = C.orange; c.lineWidth = 1.5; c.strokeRect(x - 16, y - 12, 32, 24); } });
    rich(c, 'the Universe expands: every galaxy moves away from every other', 10, H - 12, { size: 11, color: 'rgba(220,230,255,.8)' });
    // spectrum of selected galaxy
    const g = gal[sel], z = g.v / (c0 / 1000), obs = LAB * (1 + z);
    const x0 = W * 0.6, x1 = W - 12, y0 = 40, X = nm => x0 + (nm - 380) / 100 * (x1 - x0);
    rich(c, `galaxy ${sel + 1}: ${g.d} Mpc away`, x0, 18, { size: 12, w: 600, color: C.ink2 });
    for (let px = x0; px < x1; px++) { c.fillStyle = wlColor(380 + (px - x0) / (x1 - x0) * 100); c.fillRect(px, y0, 1, 36); }
    c.fillStyle = C.ink; c.fillRect(X(obs) - 1.5, y0, 3, 36);
    for (let px = x0; px < x1; px++) { c.fillStyle = wlColor(380 + (px - x0) / (x1 - x0) * 100); c.fillRect(px, y0 + 70, 1, 36); } c.fillStyle = C.ink; c.fillRect(X(LAB) - 1.5, y0 + 70, 3, 36);
    rich(c, 'galaxy', x0 - 4, y0 + 18, { align: 'right', size: 11, color: C.muted }); rich(c, 'lab', x0 - 4, y0 + 88, { align: 'right', size: 11, color: C.muted });
    for (const nm of [380, 400, 420, 440, 460, 480]) rich(c, `${nm}`, X(nm), y0 + 124, { align: 'center', size: 10, mono: true, color: C.muted });
    rich(c, `Ca K line: λ₀ = ${LAB} nm → λ = ${fix(obs, 2)} nm`, x0, y0 + 150, { size: 12.5, w: 600, color: C.ink });
    rich(c, `z = Δλ/λ₀ = ${fix(z, 4)} ⇒ v = zc = ${fix(g.v, 0)} km s⁻¹`, x0, y0 + 172, { size: 12.5, w: 600, color: C.red });
    // Hubble graph
    S2.begin(); const pl = new Plot(S2, { xlabel: 'distance *d* / Mpc', ylabel: 'recession speed *v* / km s⁻¹', xmin: 0, xmax: 420, ymin: 0, ymax: 32000 });
    pl.axes();
    let H0 = NaN; if (rows.length >= 2) { let sxy = 0, sxx = 0; rows.forEach(r => { sxy += r.d * r.v; sxx += r.d * r.d; }); H0 = sxy / sxx; pl.curve(x => H0 * x, { color: C.green, width: 1.8 }); pl.label(20, 30000, `gradient *H*₀ = ${fix(H0, 1)} km s⁻¹ Mpc⁻¹`, { size: 12.5, w: 700, color: C.green }); }
    pl.cross(rows.map(r => [r.d, r.v]), { color: C.red, s: 5, width: 2 });
    const age = isFinite(H0) ? MPC / (H0 * 1000) / 3.156e7 / 1e9 : NaN;
    ro.set('H0', isFinite(H0) ? `${fix(H0, 1)} km s⁻¹ Mpc⁻¹` : '—'); ro.set('si', isFinite(H0) ? `${sci(H0 * 1000 / MPC, 3)} s⁻¹` : '—'); ro.set('age', isFinite(age) ? `${fix(age, 1)} billion years` : '—'); ro.set('n', String(rows.length));
  }, [S1, S2]);
  const g = Group(P.side, 'Survey');
  const b = Btns(g); Btn(b, 'Measure this galaxy', () => { const g2 = gal[sel]; if (!rows.some(r => r.i === sel)) rows.push({ d: g2.d, v: g2.v, i: sel }); sel = (sel + 1) % gal.length; }, 'pri'); Btn(b, 'Next galaxy', () => sel = (sel + 1) % gal.length); Btn(b, 'New sky', make);
  const ro = Readout(Group(P.side, 'Hubble’s law'), [['n', 'Galaxies measured'], ['H0', '<i>H</i>₀', 'hl'], ['si', '<i>H</i>₀ in SI'], ['age', 'Age ≈ 1/<i>H</i>₀']]);
  Note(P.side, 'Measure the redshift of each galaxy’s calcium line, convert it to a speed, and plot against distance. The straight line through the origin is <b>Hubble’s law</b>; its gradient is the Hubble constant.');
  EqCard(P.below, 'Hubble’s law (2.7.2)', [['v = H_0 d', ''], ['t \\approx \\frac{1}{H_0}', 'age of the Universe'], ['1\\,\\text{Mpc} = 3.09 \\times 10^{22}\\,\\text{m}', ''], ['z = \\frac{\\Delta\\lambda}{\\lambda} = \\frac{v}{c}', '']]);
  Card(P.below, 'The Big Bang (2.7.3)', list(['<b>Hubble’s law:</b> the recession speed of a galaxy is proportional to its distance. Run the expansion backwards and everything was together at one point: the Big Bang.', 'Age estimate: if the expansion rate has been constant, <i>t</i> = <i>d</i>/<i>v</i> = 1/<i>H</i>₀ ≈ 14 billion years. Convert <i>H</i>₀ to s⁻¹ first (km → m, Mpc → m).', '<b>Cosmic microwave background (CMB):</b> radiation from every direction, now at about 2.7 K — the stretched, cooled remnant of the hot early Universe.', 'Redshift is due to the expansion of space itself stretching the light’s wavelength.', 'Uncertainty in H₀ comes from measuring distances to far galaxies.']));
  Drill(P.below, { title: 'Astronomy drill', gens: [
    () => { const l0 = pick([393.4, 486.1, 656.3]), dl = +rand(1, 40).toFixed(2); return { q: `A spectral line of laboratory wavelength <b>${l0} nm</b> is observed at <b>${fix(l0 + dl, 2)} nm</b> in a galaxy’s spectrum. Find its recession speed.`, a: dl / l0 * c0, unit: 'm s⁻¹', steps: [`z = Δλ/λ = ${dl}/${l0} = ${fix(dl / l0, 5)}`, `v = zc = ${sci(dl / l0 * c0, 3)} m s⁻¹`] }; },
    () => { const H2 = randi(60, 80), d = randi(50, 800); return { q: `Using <b>H₀ = ${H2} km s⁻¹ Mpc⁻¹</b>, find the recession speed of a galaxy <b>${d} Mpc</b> away, in km s⁻¹.`, a: H2 * d, unit: 'km s⁻¹', steps: ['v = H₀d', `= ${H2} × ${d} = ${H2 * d} km s⁻¹`] }; },
    () => { const H2 = randi(60, 80); const s = H2 * 1000 / MPC; return { q: `Estimate the age of the Universe in years for <b>H₀ = ${H2} km s⁻¹ Mpc⁻¹</b>. (1 Mpc = 3.09 × 10²² m, 1 year = 3.16 × 10⁷ s)`, a: 1 / s / 3.16e7, unit: 'years', steps: [`H₀ = ${H2}×10³ / 3.09×10²² = ${sci(s, 3)} s⁻¹`, `t = 1/H₀ = ${sci(1 / s, 3)} s`, `= ${sci(1 / s / 3.16e7, 3)} years`] }; },
    () => ({ q: 'Which observation supports the Big Bang theory?', options: ['The cosmic microwave background radiation', 'The Sun rises in the east', 'Stars twinkle', 'The Moon has phases'], correct: 0, why: 'CMB (and Hubble’s law/red shift) are the key evidence.' }),
  ] });
}

topic({
  id: 'astronomy', code: '2.7', unit: 'AS 2', title: 'Astronomy', short: 'Astronomy',
  blurb: 'The Doppler effect for sound and starlight, red shift, measuring Hubble’s constant from real-style spectra, and the age of the Universe.',
  outcomes: [
    ['2.7.1', 'demonstrate an understanding of the Doppler effect and recall and use z = Δλ/λ = v/c for red shift', 'doppler'],
    ['2.7.2', 'recall and use Hubble’s law v = H₀d and use it to estimate the age of the Universe', 'hubble'],
    ['2.7.3', 'demonstrate an understanding of the evidence for the Big Bang theory, including red shift and the cosmic microwave background radiation', 'hubble'],
  ],
  labs: [
    { id: 'doppler', title: 'Doppler effect', hint: 'red shift', spec: ['2.7.1'], mount: mountDoppler },
    { id: 'hubble', title: 'Hubble’s law', hint: 'measure H₀', spec: ['2.7.2', '2.7.3'], mount: mountHubble },
  ],
  equations: [['z = \\frac{\\Delta\\lambda}{\\lambda} = \\frac{v}{c}', ''], ['v = H_0 d', ''], ['t = \\frac{1}{H_0}', '']],
  traps: ['Convert H₀ to s⁻¹ before finding the age: km → m and Mpc → m.', 'Δλ is the <b>shift</b> (observed − laboratory), λ is the laboratory value.', 'Red shift ⇒ receding; blue shift ⇒ approaching.', 'z = v/c only for v ≪ c.'],
  notes: [
    ['Doppler effect', 'When a source moves relative to an observer, the observed frequency and wavelength change. Approaching: higher f, shorter λ (blue shift for light). Receding: lower f, longer λ (red shift).'],
    ['Red shift', 'z = Δλ/λ = v/c for speeds much less than c. Measured from the shift of known absorption lines (e.g. hydrogen, calcium) in galaxy spectra.'],
    ['Hubble’s law', 'The recession speed of a galaxy is proportional to its distance: v = H₀d. H₀ ≈ 70 km s⁻¹ Mpc⁻¹.'],
    ['Age of the Universe', 't ≈ 1/H₀ (in seconds when H₀ in s⁻¹) ≈ 14 billion years, assuming constant expansion.'],
    ['Big Bang evidence', 'Galactic red shifts / Hubble’s law (expansion) and the cosmic microwave background (uniform ~2.7 K radiation from all directions).'],
  ],
  mini(c, w, h2, t, C) {
    c.fillStyle = SPACE(); c.fillRect(0, 0, w, h2);
    for (let i = 0; i < 18; i++) { const a = i * 2.4, r = ((t * 0.12 + i * 0.07) % 1) * w * 0.6; dot(c, w / 2 + Math.cos(a) * r, h2 / 2 + Math.sin(a) * r * 0.6, 1.5 + r / w * 3, `rgba(${200 + 55 * r / w},${200 - 60 * r / w},255,.9)`); }
  },
});
})();

/* ================= 4.1 Deformation of solids ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: Hooke's law rig ---------- */
function mountHooke(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.75, minH: 400, maxH: 560, mobileAspect: 0.72 });
  let k = 40, cfg = 'single', mass = 0, y = 0, vy = 0, Fmax = 0, pts = [], lastRec = -1, auto = true, showModel = true;
  const Fp = 5.0, Fe = 5.6;
  const xl = F => F <= Fp ? F / k : F / k + (0.25 / k) * (F - Fp) ** 2;           // single-spring loading curve (m)
  function xs(F, Fm) { // single spring, given its max load history
    if (F >= Fm || Fm <= Fe) return xl(F);
    const pset = (xl(Fm) - Fm / k) - (xl(Fe) - Fe / k);
    return pset + (xl(Fm) - pset) * F / Fm;
  }
  const perSpringF = F => cfg === 'parallel' ? F / 2 : F;
  const xcfg = (F, Fm) => { const f = perSpringF(F), fm = perSpringF(Fm); const x1 = xs(f, fm); return cfg === 'series' ? 2 * x1 : x1; };
  const keff = () => cfg === 'series' ? k / 2 : cfg === 'parallel' ? 2 * k : k;
  const Fmx = 1.0 * G;
  const maxX = () => xcfg(Fmx, Fmx) * 1.05;
  const plot = new Plot(S, { xlabel: 'extension *x* / cm', ylabel: 'force *F* / N', ymin: 0, ymax: 10.5 });
  function reset() { Fmax = 0; pts = []; lastRec = -1; mass = 0; y = 0; vy = 0; ms.set(0); }
  function layout() {
    const W = S.w, Hh = S.h, wide = W >= 640;
    return wide ? { rig: { x: 0, y: 0, w: W * 0.36, h: Hh }, gr: { x: W * 0.36, y: 0, w: W * 0.64, h: Hh }, wide } : { rig: { x: 0, y: 0, w: W, h: Hh * 0.46 }, gr: { x: 0, y: Hh * 0.46, w: W, h: Hh * 0.54 }, wide };
  }
  L.loop(dt => {
    const F = mass * G; Fmax = Math.max(Fmax, F);
    const xeq = xcfg(F, Fmax);
    const m = Math.max(mass, 0.05) + 0.05, w0 = Math.min(14, Math.sqrt(keff() / m)), z = 0.32;
    const sub = 8; for (let i = 0; i < sub; i++) { const a = -w0 * w0 * (y - xeq) - 2 * z * w0 * vy; vy += a * dt / sub; y += vy * dt / sub; }
    const settled = Math.abs(vy) < 0.02 && Math.abs(y - xeq) < 0.002;
    if (auto && settled && lastRec !== mass) { lastRec = mass; pts.push({ x: xeq, F, dir: F < Fmax - 1e-9 ? 'u' : 'l' }); }
    const c = S.begin(), C = Theme.c, lay = layout(), R = lay.rig;
    c.fillStyle = C.paper2; c.fillRect(R.x, R.y, R.w, R.h);
    if (lay.wide) { line(c, [[R.w, 0], [R.w, S.h]], { color: C.line2, width: 1 }); } else line(c, [[0, R.h], [S.w, R.h]], { color: C.line2, width: 1 });
    // rig
    const top = R.y + 30, sx = R.x + R.w * (lay.wide ? 0.42 : 0.3), L0 = 58, hangerH = 18 + 8 * 10;
    const pxm = (R.h - top - L0 - hangerH - 28) / Math.max(maxX(), 0.05);
    c.fillStyle = C.ink2; c.fillRect(R.x + 18, R.y + R.h - 14, R.w * 0.7, 6); c.fillRect(R.x + 26, top - 10, 5, R.h - top - 4); c.fillRect(R.x + 26, top - 12, sx - R.x - 6 + (cfg === 'parallel' ? 20 : 0), 6);
    const ext = y * pxm, bot = top + L0 + ext;
    if (cfg === 'single') line(c, springPath(sx, top - 6, bot, 12, 9), { color: C.ink, width: 1.5 });
    else if (cfg === 'series') { const mid = top - 6 + (bot - top + 6) / 2; line(c, springPath(sx, top - 6, mid - 3, 10, 8), { color: C.ink, width: 1.5 }); c.fillStyle = C.ink2; c.fillRect(sx - 6, mid - 3, 12, 6); line(c, springPath(sx, mid + 3, bot, 10, 8), { color: C.ink, width: 1.5 }); }
    else { line(c, springPath(sx - 14, top - 6, bot - 4, 12, 6), { color: C.ink, width: 1.4 }); line(c, springPath(sx + 14, top - 6, bot - 4, 12, 6), { color: C.ink, width: 1.4 }); c.fillStyle = C.ink2; c.fillRect(sx - 22, bot - 5, 44, 5); }
    // hanger + masses
    line(c, [[sx, bot], [sx, bot + 14]], { color: C.ink, width: 2 });
    const n100 = Math.floor(mass * 10 + 1e-6), n50 = Math.round((mass - n100 / 10) * 20);
    let yy = bot + 14; c.fillStyle = C.ink2; c.fillRect(sx - 14, yy, 28, 3); yy += 3;
    for (let i = 0; i < n100; i++) { c.fillStyle = i % 2 ? C.blue : alpha(C.blue, .8); rrect(c, sx - 20, yy, 40, 7.5, 2); c.fill(); yy += 8; }
    for (let i = 0; i < n50; i++) { c.fillStyle = C.cyan; rrect(c, sx - 16, yy, 32, 4.5, 2); c.fill(); yy += 5; }
    // ruler
    const rx = sx + (cfg === 'parallel' ? 50 : 40), r0 = top + L0 + 14; // zero at unloaded pointer
    c.fillStyle = alpha(C.orange, .12); c.fillRect(rx, r0 - 10, 28, R.h - r0 - 6); c.strokeStyle = C.orange; c.lineWidth = 1; c.strokeRect(rx + .5, r0 - 10 + .5, 28, R.h - r0 - 6);
    const cmStep = pxm / 100; const every = cmStep > 9 ? 1 : cmStep > 4 ? 2 : cmStep > 1.6 ? 5 : 10;
    c.font = FONT.mono(9); c.fillStyle = C.ink2; c.textAlign = 'left'; c.textBaseline = 'middle';
    for (let cm = 0; r0 + cm * cmStep < R.h - 18; cm += 1) { if (cm % every) continue; const Y = r0 + cm * cmStep; const big = cm % (every * 5) === 0; line(c, [[rx, Y], [rx + (big ? 12 : 7), Y]], { color: C.ink2, width: 1 }); if (big) c.fillText(cm, rx + 14, Y); }
    line(c, [[sx + 14, bot + 14], [rx + 4, bot + 14]], { color: C.red, width: 2 }); dot(c, rx + 4, bot + 14, 3, C.red);
    rich(c, 'cm', rx + 4, r0 - 18, { size: 10, color: C.muted });
    // graph
    const G2 = lay.gr; plot.rect = { x: G2.x + 6, y: G2.y + 6, w: G2.w - 12, h: G2.h - 10 }; plot.xmax = maxX() * 100; plot.pad = { l: 50, r: 14, t: 16, b: 40 };
    plot.axes();
    if (showModel) { const mp = []; for (let i = 0; i <= 80; i++) { const f = i / 80 * Fmx; mp.push([xcfg(f, f) * 100, f]); } plot.curve(mp, { color: alpha(C.muted, .6), width: 1.2, dash: [4, 4] }); }
    // current branch area
    const br = []; for (let i = 0; i <= 50; i++) { const f = i / 50 * F; br.push([xcfg(f, Fmax) * 100, f]); }
    if (F > 0) { plot.clip(cx => { cx.beginPath(); cx.moveTo(plot.X(br[0][0]), plot.Y(0)); for (const [a, b] of br) cx.lineTo(plot.X(a), plot.Y(b)); cx.lineTo(plot.X(br[br.length - 1][0]), plot.Y(0)); cx.closePath(); cx.fillStyle = alpha(C.green, .16); cx.fill(); }); plot.curve(br, { color: C.green, width: 1.5 }); }
    let area = 0; for (let i = 1; i < br.length; i++) area += (br[i][0] - br[i - 1][0]) / 100 * (br[i][1] + br[i - 1][1]) / 2;
    // key points
    const pF = cfg === 'parallel' ? 2 * Fp : Fp, eF = cfg === 'parallel' ? 2 * Fe : Fe;
    if (Fmax >= pF) { plot.dots([[xcfg(pF, pF) * 100, pF]], { color: C.orange, r: 4.5 }); plot.label(xcfg(pF, pF) * 100, pF, 'P  limit of proportionality', { dx: -8, dy: -12, align: 'right', color: C.orange, size: 11.5, bg: alpha(C.paper2, .85) }); }
    if (Fmax >= eF) { plot.dots([[xcfg(eF, eF) * 100, eF]], { color: C.red, r: 4.5 }); plot.label(xcfg(eF, eF) * 100, eF, 'E  elastic limit', { dx: 10, dy: 10, color: C.red, size: 11.5, bg: alpha(C.paper2, .85) }); }
    plot.dots(pts.filter(p => p.dir === 'l').map(p => [p.x * 100, p.F]), { color: C.blue, r: 4 });
    plot.dots(pts.filter(p => p.dir === 'u').map(p => [p.x * 100, p.F]), { color: C.violet, r: 4 });
    const cxp = plot.X(y * 100), cyp = plot.Y(F); if (plot.inside(cxp, cyp, 6)) { S.ctx.beginPath(); S.ctx.arc(cxp, cyp, 7, 0, TAU); S.ctx.strokeStyle = C.red; S.ctx.lineWidth = 2; S.ctx.stroke(); }
    // readouts
    const lin = pts.filter(p => p.F > 0 && p.F <= pF + 1e-9 && p.dir === 'l'); let kfit = NaN; if (lin.length >= 2) { let sxy = 0, sxx = 0; for (const p of lin) { sxy += p.x * p.F; sxx += p.x * p.x; } kfit = sxy / sxx; }
    ro.set('F', `${fix(F, 2)} N`); ro.set('x', `${fix(y * 100, 2)} cm`); ro.set('k', isFinite(kfit) ? `${fix(kfit, 1)} N m⁻¹` : 'need 2 points ≤ P');
    ro.set('E', F > 0 && Fmax <= pF ? `${fix(0.5 * F * xeq * 1000, 1)} mJ` : F > 0 ? 'not valid past P' : '—'); ro.set('A', `${fix(area * 1000, 1)} mJ`);
    const perm = xcfg(0, Fmax); ro.set('p', perm > 1e-5 ? `${fix(perm * 100, 2)} cm` : '0');
    const st = Fmax <= pF ? ['ok', 'Hookean: <i>F</i> ∝ <i>x</i>. Elastic.'] : Fmax <= eF ? ['info', 'Past P: no longer proportional, but still <b>elastic</b>. It will return to its original length.'] : ['', 'Past the elastic limit: <b>plastic</b> deformation. Unload it and it keeps a permanent extension.'];
    if (state._k !== st[1]) { state._k = st[1]; state.className = 'flag ' + st[0]; state.innerHTML = st[1]; }
  }, [S]);
  const g = Group(P.side, 'Load');
  const ms = Slider(g, { id: 'hk-m', label: 'Mass on hanger', min: 0, max: 1, step: 0.05, value: 0, unit: 'g', fmt: v => fix(v * 1000, 0), oninput: v => mass = v });
  const b = Btns(g); Btn(b, '+100 g', () => { mass = Math.min(1, +(mass + 0.1).toFixed(2)); ms.set(mass); }, 'pri'); Btn(b, '−100 g', () => { mass = Math.max(0, +(mass - 0.1).toFixed(2)); ms.set(mass); }); Btn(b, 'Unload all', () => { mass = 0; ms.set(0); });
  const g2 = Group(P.side, 'Spring');
  Seg(g2, { options: [['single', 'Single'], ['series', 'Series'], ['parallel', 'Parallel']], value: cfg, onchange: v => { cfg = v; reset(); } });
  Slider(g2, { id: 'hk-k', label: 'Spring constant <i>k</i> (each)', min: 30, max: 80, step: 5, value: k, unit: 'N m⁻¹', fmt: v => fix(v, 0), oninput: v => { k = v; reset(); } });
  const b2 = Btns(g2); Btn(b2, 'New spring', reset, 'sm'); const sw = Switch(g2, { label: 'Show model curve', value: showModel, onchange: v => showModel = v });
  const state = el('div', { class: 'flag ok' }); P.side.append(state);
  const ro = Readout(Group(P.side, 'Readings'), [['F', '<i>F</i> = <i>mg</i>'], ['x', 'Extension <i>x</i>', 'hl'], ['k', '<i>k</i> from gradient'], ['E', '½<i>Fx</i>'], ['A', 'Area under branch'], ['p', 'Extension at zero load']]);
  Note(P.side, 'Load past 500 g to go beyond <b>P</b>, then past ~570 g to cross <b>E</b>. Then unload and watch the violet points come back down a line parallel to the first, ending at a permanent extension.');
  EqCard(P.below, 'Hooke’s law & strain energy', [['F = kx', 'up to the limit of proportionality'], ['E = \\tfrac{1}{2}Fx = \\tfrac{1}{2}kx^2', 'area under a straight-line F–x graph'], ['\\frac{1}{k} = \\frac{1}{k_1} + \\frac{1}{k_2}', 'series'], ['k = k_1 + k_2', 'parallel']]);
  Card(P.below, 'Definitions (4.1.2 / 4.1.3)', list(['<b>Elastic deformation</b>: the material returns to its original shape when the load is removed.', '<b>Plastic deformation</b>: permanent deformation; it does not return to its original shape when the load is removed.', '<b>Limit of proportionality</b>: the point beyond which force is no longer proportional to extension.', '<b>Elastic limit</b>: the maximum load that can be applied without causing permanent deformation.', 'For many metals E is just past P, which is why they’re easy to confuse. P is about <b>linearity</b>; E is about <b>permanence</b>.']));
  Drill(P.below, { title: 'Hooke’s law & strain energy drill', cls: 'wide', gens: [
    () => { const kk = randi(20, 400), m = randi(1, 9) * 50; const F = m / 1000 * G; return { q: `A spring with <b>k = ${kk} N m⁻¹</b> has a <b>${m} g</b> mass hung on it. Find the extension in cm.`, a: F / kk * 100, unit: 'cm', tol: 0.01, steps: [`F = mg = ${m / 1000} × 9.81 = ${fix(F, 3)} N`, `x = F/k = ${fix(F, 3)}/${kk} = ${num(F / kk, 3)} m = ${fix(F / kk * 100, 2)} cm`] }; },
    () => { const kk = randi(50, 800), x = randi(2, 15); return { q: `A spring of <b>k = ${kk} N m⁻¹</b> is stretched by <b>${x} cm</b> (within its limit of proportionality). Find the elastic strain energy stored.`, a: 0.5 * kk * (x / 100) ** 2, unit: 'J', tol: 0.01, steps: [`x = ${x / 100} m (convert!)`, `E = ½kx² = ½ × ${kk} × ${x / 100}² = ${num(0.5 * kk * (x / 100) ** 2, 3)} J`] }; },
    () => { const F = randi(4, 40), x = randi(3, 25); return { q: `A force of <b>${F} N</b> produces an extension of <b>${x} mm</b> in a wire obeying Hooke’s law. Find the energy stored.`, a: 0.5 * F * x / 1000, unit: 'J', tol: 0.01, steps: ['E = ½Fx (the area of the triangle under the F–x graph)', `= ½ × ${F} × ${x} × 10⁻³ = ${num(0.5 * F * x / 1000, 3)} J`] }; },
    () => { const k1 = randi(2, 9) * 10; return { q: `Two identical springs, each <b>k = ${k1} N m⁻¹</b>, are joined in <b>series</b>. Find the spring constant of the combination.`, a: k1 / 2, unit: 'N m⁻¹', tol: 0.01, steps: ['Series: the same force acts through each spring, so the total extension doubles', `k = ${k1}/2 = ${k1 / 2} N m⁻¹`] }; },
  ] });
}

/* ---------- Lab B: tensile test / stress–strain ---------- */
const MATS = {
  steel: { name: 'Mild steel', E: 200e3, ef: 0.28, ea: 0.004, ymax: 520, lopE: 0.00125, elE: 0.0014, uts: 0.18, kind: 'metal',
    s(e) { if (e <= 0.00125) return 200e3 * e; if (e <= 0.0014) { const t = (e - 0.00125) / 0.00015; return 250 + 12 * (1 - (1 - t) ** 2); } if (e <= 0.0022) { const t = (e - 0.0014) / 0.0008; return 262 + 9 * Math.sin(Math.PI * t); } if (e <= 0.015) return 262 + 3 * (e - 0.0022) / 0.0128; if (e <= 0.18) { const u = (e - 0.015) / 0.165; return 265 + 195 * (1 - (1 - u) ** 2); } const v = (e - 0.18) / 0.10; return 460 - 80 * v * v; },
    keys: [['P', 0.00125, 'limit of proportionality'], ['E', 0.0014, 'elastic limit'], ['Y', 0.0018, 'yield point'], ['UTS', 0.18, 'ultimate tensile stress'], ['B', 0.28, 'breaking point']] },
  copper: { name: 'Copper (annealed)', E: 120e3, ef: 0.45, ea: 0.002, ymax: 260, lopE: 0.0005, elE: 0.0006, uts: 0.33, kind: 'metal',
    s(e) { if (e <= 0.0005) return 120e3 * e; if (e <= 0.0006) { const t = (e - 0.0005) / 0.0001; return 60 + 8 * (1 - (1 - t) ** 2); } if (e <= 0.33) { const u = (e - 0.0006) / 0.3294; return 68 + 152 * (1 - (1 - u) ** 2.5); } const v = (e - 0.33) / 0.12; return 220 - 30 * v * v; },
    keys: [['P', 0.0005, 'limit of proportionality'], ['E', 0.0006, 'elastic limit'], ['UTS', 0.33, 'ultimate tensile stress'], ['B', 0.45, 'breaking point']] },
  glass: { name: 'Glass (brittle)', E: 70e3, ef: 0.001, ea: 0.001, ymax: 85, lopE: 0.001, elE: 0.001, uts: 0.001, kind: 'glass',
    s(e) { return 70e3 * e; }, keys: [['B', 0.001, 'fracture: no plastic region']] },
  rubber: { name: 'Rubber (polymer)', E: 1.8, ef: 6.0, ea: 6, ymax: 11, lopE: 0, elE: 6, uts: 6, kind: 'rubber',
    s(e) { const l = 1 + e; return 0.6 * (l - 1 / (l * l)) + 0.0035 * e ** 4; }, keys: [['B', 6.0, 'breaks']] },
};
function mountTensile(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.65, minH: 420, maxH: 580, mobileAspect: 0.62 });
  let M = MATS.steel, pos = 0, emax = 0, broken = false, flash = 0, trace = [[0, 0]], auto = 0;
  const glassPts = Array.from({ length: 46 }, () => [Math.random(), Math.random()]);
  const chains = Array.from({ length: 5 }, (_, i) => { let x = 0, yv = 0; const pts = []; for (let k = 0; k < 16; k++) { pts.push([x, yv]); x += rand(-0.6, 1.0); yv += rand(-1, 1); } return pts; });
  const posToE = p => { if (M.kind === 'glass') return p * M.ef * 1.02; if (M.kind === 'rubber') return p * M.ef * 1.02; return p <= 0.3 ? p / 0.3 * M.ea : M.ea + (p - 0.3) / 0.7 * (M.ef * 1.02 - M.ea); };
  const eToPos = e => { if (M.kind !== 'metal') return e / (M.ef * 1.02); return e <= M.ea ? e / M.ea * 0.3 : 0.3 + (e - M.ea) / (M.ef * 1.02 - M.ea) * 0.7; };
  function stress(e) {
    if (broken) return 0;
    if (M.kind === 'rubber') { if (e >= emax) return M.s(e); return M.s(e) * Math.pow(e / emax, 1.8); }
    if (e >= emax || emax <= M.elE) return M.s(e);
    const se = M.s(emax), eset = emax - se / M.E; return Math.max(0, M.E * (e - eset));
  }
  const eset = () => (M.kind === 'metal' && emax > M.elE && !broken) ? emax - M.s(emax) / M.E : (M.kind === 'metal' && broken && emax > M.elE ? emax - M.s(Math.min(emax, M.ef)) / M.E : 0);
  function setPos(p) {
    if (broken) return; p = clamp(p, 0, 1);
    if (p > pos + 0.006) { const n = Math.ceil((p - pos) / 0.004); const p0 = pos; for (let i = 1; i < n; i++) { stepPos(p0 + (p - p0) * i / n); if (broken) return; } }
    stepPos(p);
  }
  function stepPos(p) {
    if (broken) return; pos = p; const e = posToE(pos);
    if (e >= M.ef) { broken = true; flash = 1; emax = M.ef; trace.push([M.ef, M.s(M.ef)], [M.ef, 0]); sl.set(pos); return; }
    const sgm = stress(e); emax = Math.max(emax, e); trace.push([e, sgm]); if (trace.length > 4000) trace.shift();
  }
  function newSpec() { pos = 0; emax = 0; broken = false; trace = [[0, 0]]; auto = 0; sl.set(0); }
  const main = new Plot(S, { ylabel: 'stress *σ* / MPa', xlabel: 'strain *ε*', ymin: 0 });
  const inset = new Plot(S, { ymin: 0, grid: true, nx: 3, ny: 3 });
  L.loop(dt => {
    if (auto) { const np = pos + dt * auto * (pos < 0.3 && M.kind === 'metal' ? 0.05 : 0.07); if (auto > 0 && (np >= 1 || broken)) auto = 0; if (auto < 0 && np <= eToPos(eset())) { auto = 0; } setPos(auto < 0 ? Math.max(np, eToPos(eset())) : np); sl.set(pos); }
    flash = Math.max(0, flash - dt * 1.5);
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h, wide = W >= 680;
    const lp = wide ? { x: 0, y: 0, w: W * 0.34, h: Hh } : { x: 0, y: 0, w: W, h: Hh * 0.42 };
    const gp = wide ? { x: W * 0.34, y: 0, w: W * 0.66, h: Hh } : { x: 0, y: Hh * 0.42, w: W, h: Hh * 0.58 };
    c.fillStyle = C.paper2; c.fillRect(lp.x, lp.y, lp.w, lp.h);
    line(c, wide ? [[lp.w, 0], [lp.w, Hh]] : [[0, lp.h], [W, lp.h]], { color: C.line2, width: 1 });
    const e = broken ? M.ef : posToE(pos), sg = stress(e);
    // ----- specimen -----
    const specW = wide ? lp.w : lp.w * 0.45, spX = lp.x + specW * 0.5;
    const latBoxH = wide ? lp.h * 0.36 : lp.h;
    const specH = wide ? lp.h - latBoxH - 30 : lp.h - 20;
    const eEl = M.kind === 'metal' || M.kind === 'glass' ? sg / M.E : 0, ePl = M.kind === 'metal' ? Math.max(0, e - eEl) : 0;
    const dispStrain = M.kind === 'rubber' ? e * 0.1 : M.kind === 'glass' ? eEl * 60 : ePl + eEl * 40;
    const grip = 26, L0 = (specH - 2 * grip - 30) / (M.kind === 'rubber' ? 1.62 : 1.34), Lg = L0 * (1 + dispStrain), top = 14;
    const w0 = Math.min(34, specW * 0.22), wPin = w0 * 1.7;
    const neck = M.kind === 'metal' && e > M.uts ? (e - M.uts) / (M.ef - M.uts) : 0;
    const halfW = t => { // t 0..1 along gauge
      const thin = M.kind === 'rubber' ? 1 / Math.sqrt(1 + e * 0.5) : M.kind === 'metal' ? 1 / Math.sqrt(1 + ePl) : 1;
      const nk = 1 - 0.55 * neck * neck * Math.exp(-(((t - 0.5) / 0.09) ** 2)); return w0 / 2 * thin * nk; };
    const drawSpec = (y0, y1, part) => { // part: 'all' | 'top' | 'bot'
      c.fillStyle = M.kind === 'rubber' ? alpha(C.ink, .8) : M.kind === 'glass' ? alpha(C.cyan, .35) : alpha(C.ink2, .55);
      c.strokeStyle = C.ink; c.lineWidth = 1.2;
      c.beginPath(); const N = 40; const gy0 = top + grip, gy1 = top + grip + Lg;
      const pts = []; for (let i = 0; i <= N; i++) { const t = i / N; const yy = gy0 + t * Lg; if (yy < y0 - 0.5 || yy > y1 + 0.5) continue; pts.push([t, yy]); }
      if (!pts.length) return;
      c.moveTo(spX - wPin / 2, part === 'bot' ? pts[0][1] : top); if (part !== 'bot') c.lineTo(spX - wPin / 2, gy0 - 6);
      for (const [t, yy] of pts) c.lineTo(spX - halfW(t), yy);
      if (part !== 'top') { c.lineTo(spX - wPin / 2, gy1 + 6); c.lineTo(spX - wPin / 2, gy1 + grip); c.lineTo(spX + wPin / 2, gy1 + grip); c.lineTo(spX + wPin / 2, gy1 + 6); }
      for (let i = pts.length - 1; i >= 0; i--) { const [t, yy] = pts[i]; c.lineTo(spX + halfW(t), yy); }
      if (part !== 'bot') { c.lineTo(spX + wPin / 2, gy0 - 6); c.lineTo(spX + wPin / 2, top); }
      c.closePath(); c.fill(); c.stroke();
    };
    const gy0 = top + grip, midY = gy0 + Lg * 0.5;
    if (!broken) drawSpec(0, 1e9, 'all');
    else { const gap = 10; c.save(); c.translate(0, -gap / 2); drawSpec(0, midY, 'top'); c.restore(); c.save(); c.translate(0, gap / 2); drawSpec(midY, 1e9, 'bot'); c.restore(); }
    // grips
    c.fillStyle = C.ink2; c.fillRect(spX - wPin / 2 - 10, top - 4, wPin + 20, grip - 4); c.fillRect(spX - wPin / 2 - 10, gy0 + Lg + 8 + (broken ? 5 : 0), wPin + 20, grip - 4);
    // gauge marks
    line(c, [[spX + wPin / 2 + 12, gy0], [spX + wPin / 2 + 12, gy0 + Lg]], { color: C.blue, width: 1.2, both: true }); arrow(c, spX + wPin / 2 + 12, gy0 + Lg / 2, spX + wPin / 2 + 12, gy0, { color: C.blue, width: 1.2, head: 6 }); arrow(c, spX + wPin / 2 + 12, gy0 + Lg / 2, spX + wPin / 2 + 12, gy0 + Lg, { color: C.blue, width: 1.2, head: 6 });
    if (flash > 0) { c.fillStyle = alpha(C.red, flash * 0.35); c.beginPath(); c.arc(spX, midY, 40 * (1.5 - flash), 0, TAU); c.fill(); }
    rich(c, M.kind === 'rubber' ? 'length not to scale' : M.kind === 'glass' ? 'elastic strain ×60' : 'elastic part ×40', spX, gy0 + Lg + grip + 16, { align: 'center', size: 10, color: C.muted });
    // ----- lattice -----
    const LB = wide ? { x: lp.x + 12, y: lp.h - latBoxH, w: lp.w - 24, h: latBoxH - 12 } : { x: lp.x + specW, y: 10, w: lp.w - specW - 10, h: lp.h - 20 };
    c.strokeStyle = C.line2; c.lineWidth = 1; c.strokeRect(LB.x + .5, LB.y + .5, LB.w, LB.h); c.fillStyle = C.paper2; c.fillRect(LB.x + 1, LB.y + 1, LB.w - 1, LB.h - 1);
    rich(c, M.kind === 'rubber' ? 'POLYMER CHAINS' : M.kind === 'glass' ? 'AMORPHOUS NETWORK' : 'ATOMIC LATTICE (→ tension)', LB.x + 8, LB.y + 12, { size: 10, color: C.muted, w: 600 });
    c.save(); c.beginPath(); c.rect(LB.x, LB.y + 20, LB.w, LB.h - 20); c.clip();
    const cx0 = LB.x + LB.w / 2, cy0 = LB.y + 20 + (LB.h - 20) / 2;
    if (M.kind === 'metal') {
      const cols = 9, rows = 6, a = Math.min((LB.w - 40) / (cols + 3), (LB.h - 40) / rows);
      const sE = eEl * 110, slips = Math.min(4, Math.floor(ePl / (M.ef / 5) + (ePl > 0.0005 ? 1 : 0)));
      const ax = a * (1 + sE), ay = a * (1 - 0.3 * sE);
      for (let r = 0; r < rows; r++) { const band = Math.floor(r / 2); const off = (band - 1) * slips * ax * 0.5; for (let q = 0; q < cols; q++) { const X = cx0 + (q - (cols - 1) / 2) * ax + off, Y = cy0 + (r - (rows - 1) / 2) * ay; dot(c, X, Y, Math.max(2.5, a * 0.26), broken && Math.abs(q - (cols - 1) / 2 + off / ax) < 0.6 ? C.red : C.blue); } }
      if (slips > 0) for (let bnd = 1; bnd < 3; bnd++) { const Y = cy0 + (bnd * 2 - 0.5 - (rows - 1) / 2) * ay; line(c, [[LB.x + 6, Y], [LB.x + LB.w - 6, Y]], { color: C.orange, width: 1.2, dash: [4, 3] }); }
      if (slips > 0) rich(c, 'slip planes: layers have slid → permanent', LB.x + 8, LB.y + LB.h - 10, { size: 10, color: C.orange });
      else if (sE > 0.01) rich(c, 'bonds stretched: springs back when unloaded', LB.x + 8, LB.y + LB.h - 10, { size: 10, color: C.green });
    } else if (M.kind === 'glass') {
      const sE = eEl * 110; const ww = LB.w * 0.7, hh = LB.h - 50;
      for (const [u, v] of glassPts) { const X = cx0 + (u - 0.5) * ww * (1 + sE) + (broken ? (u > 0.5 ? 12 : -12) : 0), Y = cy0 + 4 + (v - 0.5) * hh; dot(c, X, Y, 3.2, C.cyan); }
      if (broken) { const pts = []; for (let i = 0; i <= 10; i++) pts.push([cx0 + rand(-3, 3), LB.y + 22 + i * (LB.h - 24) / 10]); line(c, pts, { color: C.red, width: 2 }); rich(c, 'crack runs straight through', LB.x + 8, LB.y + LB.h - 10, { size: 10, color: C.red }); }
    } else {
      const f = clamp(e / 5.5, 0, 1); const ww = LB.w - 40;
      chains.forEach((ch, i) => { const yb = LB.y + 30 + (i + 0.5) * (LB.h - 40) / chains.length; const pts = ch.map(([px, py], k) => { const sx0 = LB.x + 20 + (px + 2) * ww / 14, sy0 = yb + py * 5; const sx1 = LB.x + 20 + k / 15 * ww, sy1 = yb; return [lerp(sx0, sx1, f), lerp(sy0, sy1, f * f)]; }); line(c, pts, { color: i % 2 ? C.violet : C.blue, width: 2 }); pts.forEach(p => dot(c, p[0], p[1], 2, C.ink2)); });
      rich(c, f < 0.3 ? 'coiled chains: easy to straighten' : 'chains straightened: much stiffer', LB.x + 8, LB.y + LB.h - 10, { size: 10, color: C.muted });
    }
    c.restore();
    // ----- graph -----
    const xmax = M.kind === 'metal' ? M.ef * 1.08 : M.ef * 1.1;
    main.rect = { x: gp.x + 4, y: gp.y + 4, w: gp.w - 8, h: gp.h - 8 }; main.xmin = 0; main.xmax = xmax; main.ymax = M.ymax; main.pad = { l: 52, r: 12, t: 14, b: 40 };
    main.axes();
    main.curve(x => M.s(x), { color: alpha(C.muted, .45), width: 1, dash: [4, 4], a: 0, b: M.ef, n: 500 });
    if (showKeys.value) for (const [k, ke, lab] of M.keys) { if (k === 'P' || k === 'E' || k === 'Y') continue; main.dots([[ke, M.s(ke)]], { color: C.orange, r: 4 }); main.label(ke, M.s(ke), k, { dx: 6, dy: -10, color: C.orange, size: 12, w: 700 }); }
    if (M.kind === 'rubber' && emax > 0.2) { const lo = [], hi = []; for (let i = 0; i <= 80; i++) { const x = i / 80 * emax; hi.push([x, M.s(x)]); lo.push([x, M.s(x) * Math.pow(x / emax, 1.8)]); } main.clip(cx => { cx.beginPath(); hi.forEach(([a, b], i) => i ? cx.lineTo(main.X(a), main.Y(b)) : cx.moveTo(main.X(a), main.Y(b))); lo.slice().reverse().forEach(([a, b]) => cx.lineTo(main.X(a), main.Y(b))); cx.closePath(); cx.fillStyle = alpha(C.orange, .15); cx.fill(); }); }
    main.curve(trace, { color: C.blue, width: 2.4 });
    if (!broken) { const X = main.X(e), Y = main.Y(sg); dot(c, X, Y, 6, C.red, C.paper2); }
    if (M.kind === 'metal') {
      const iw = Math.min(main.pw * 0.46, 250), ih = Math.min(main.ph * 0.46, 170);
      inset.rect = { x: main.x0 + main.pw - iw - 6, y: main.y0 + main.ph - ih - 8, w: iw, h: ih }; inset.pad = { l: 40, r: 8, t: 20, b: 22 };
      inset.xmin = 0; inset.xmax = M.ea * 0.75; inset.ymax = M.s(M.ea * 0.75) * 1.2;
      c.fillStyle = C.paper2; c.fillRect(inset.rect.x, inset.rect.y, inset.rect.w, inset.rect.h); c.strokeStyle = C.line2; c.strokeRect(inset.rect.x + .5, inset.rect.y + .5, inset.rect.w, inset.rect.h);
      inset.xlabel = ''; inset.ylabel = ''; inset.title = 'zoom: elastic region'; inset.xfmt = v => v === 0 ? '0' : (v * 100).toFixed(2) + '%'; inset.axes();
      inset.curve(x => M.s(x), { color: alpha(C.muted, .6), width: 1, dash: [3, 3], n: 200 });
      inset.curve(x => M.E * x, { color: alpha(C.green, .7), width: 1, a: 0, b: M.lopE * 1.25 });
      inset.curve(trace.filter(p => p[0] <= inset.xmax * 1.05), { color: C.blue, width: 2 });
      for (const [k, ke] of M.keys) if (k === 'P' || k === 'E' || k === 'Y') { inset.dots([[ke, M.s(ke)]], { color: k === 'P' ? C.orange : k === 'E' ? C.red : C.violet, r: 3.5 }); inset.label(ke, M.s(ke), k, { dx: k === 'E' ? 6 : -12, dy: k === 'Y' ? -10 : 8, color: k === 'P' ? C.orange : k === 'E' ? C.red : C.violet, size: 11, w: 700 }); }
      if (!broken && e <= inset.xmax) dot(c, inset.X(e), inset.Y(sg), 4.5, C.red, C.paper2);
    }
    // readouts
    ro.set('s', `${fix(sg, M.kind === 'rubber' ? 2 : 0)} MPa`); ro.set('e', M.kind === 'rubber' ? `${fix(e, 2)} (${fix(e * 100, 0)}%)` : `${num(e, 3)} (${fix(e * 100, e < 0.01 ? 3 : 1)}%)`);
    ro.set('E', M.kind === 'rubber' ? 'not constant' : `${fix(M.E / 1000, 0)} GPa`);
    ro.set('p', M.kind === 'metal' && emax > M.elE ? `${fix(eset() * 100, 2)}%` : '0');
    const E0 = e < 1e-9;
    let stt = ['ok', 'Unloaded.'];
    if (broken) stt = ['', M.kind === 'glass' ? '<b>Brittle fracture.</b> No plastic region: a crack from a surface flaw ran straight through.' : M.kind === 'rubber' ? '<b>Snapped.</b>' : '<b>Fracture at B</b> after necking. Ductile: large plastic strain before breaking.'];
    else if (M.kind === 'rubber') stt = e < emax - 1e-6 ? ['info', '<b>Unloading</b> follows a lower curve: <b>hysteresis</b>. The shaded loop is the energy per unit volume lost as heat. Rubber still returns to its original length (elastic), but it never obeyed Hooke’s law.'] : ['info', 'Elastic but <b>not Hookean</b>: coiled chains straighten easily, then stiffen sharply.'];
    else if (M.kind === 'glass') stt = E0 ? ['ok', 'Unloaded.'] : ['ok', 'Straight line all the way: Hookean and elastic right up to fracture.'];
    else if (e < emax - 1e-7 && emax > M.elE) stt = ['info', `<b>Unloading</b>: elastic recovery along a line <b>parallel</b> to the original slope. Permanent strain ≈ ${fix(eset() * 100, 2)}%.`];
    else if (e > M.uts) stt = ['', '<b>Necking</b>: past the UTS the cross-section thins locally, so the engineering stress falls until fracture.'];
    else if (e > M.elE) stt = ['', '<b>Plastic region</b>: layers of atoms slip, bonds break and re-form. The deformation is permanent.'];
    else if (e > M.lopE) stt = ['info', 'Past <b>P</b> but before <b>E</b>: not proportional, still elastic.'];
    else if (!E0) stt = ['ok', 'Obeys Hooke’s law: <i>σ</i> ∝ <i>ε</i>. The gradient is the Young modulus.'];
    if (state._k !== stt[1]) { state._k = stt[1]; state.className = 'flag ' + stt[0]; state.innerHTML = stt[1]; }
  }, [S]);
  const g = Group(P.side, 'Material');
  const seg = Seg(g, { options: [['steel', 'Steel'], ['copper', 'Copper'], ['glass', 'Glass'], ['rubber', 'Rubber']], value: 'steel', onchange: v => { M = MATS[v]; newSpec(); } });
  const g2 = Group(P.side, 'Tensile machine');
  const sl = Slider(g2, { id: 'ts-p', label: 'Crosshead extension', min: 0, max: 1, step: 0.001, value: 0, fmt: v => fix(v * 100, 1) + '%', oninput: v => { auto = 0; setPos(v); sl.set(pos); } });
  const b = Btns(g2); Btn(b, '▶ Pull', () => auto = 1, 'pri'); Btn(b, '◀ Unload', () => auto = -1.5); Btn(b, 'New specimen', newSpec);
  const showKeys = Switch(g2, { label: 'Label key points', value: true });
  const state = el('div', { class: 'flag ok' }); P.side.append(state);
  const ro = Readout(Group(P.side, 'Live'), [['s', 'Stress <i>σ</i> = <i>F</i>/<i>A</i>', 'hl'], ['e', 'Strain <i>ε</i> = <i>x</i>/<i>L</i>'], ['E', 'Young modulus (gradient)'], ['p', 'Permanent strain']]);
  Note(P.side, '<b>Try:</b> pull steel into the plastic region, unload, then pull again. It reloads elastically up to the old maximum, so the yield stress has effectively risen (work hardening).');
  EqCard(P.below, 'Definitions & equations (4.1.4)', [['\\sigma = \\frac{F}{A}', 'stress · Pa (N m⁻²)'], ['\\varepsilon = \\frac{x}{L}', 'strain · no unit'], ['E = \\frac{\\sigma}{\\varepsilon} = \\frac{FL}{Ax}', 'Young modulus · Pa'], ['A = \\frac{\\pi d^2}{4}', 'use diameter carefully']]);
  Card(P.below, 'Reading a stress–strain graph', list(['<b>Gradient</b> of the straight section = Young modulus <i>E</i> (stiffness).', '<b>P</b>: end of the straight line. <b>E</b>: beyond this there is permanent deformation.', '<b>Y</b> (yield point): large strain for little extra stress; plastic flow begins in earnest.', '<b>UTS</b>: the maximum stress the material can withstand (its strength).', '<b>Ductile</b> (copper): large plastic region. <b>Brittle</b> (glass): fractures at the end of the elastic region.', '<b>Area</b> under a σ–ε graph = energy per unit volume.']));
  Drill(P.below, { title: 'Stress, strain & Young modulus drill', cls: 'wide', gens: [
    () => { const F = randi(20, 400), d = +rand(0.2, 1.2).toFixed(2); const A = Math.PI * (d / 1000) ** 2 / 4; return { q: `A wire of diameter <b>${d} mm</b> carries a tension of <b>${F} N</b>. Find the stress.`, a: F / A, unit: 'Pa', tol: 0.01, steps: [`A = πd²/4 = π × (${d} × 10⁻³)² / 4 = ${sci(A, 3)} m²`, `σ = F/A = ${F} / ${sci(A, 3)} = ${sci(F / A, 3)} Pa`] }; },
    () => { const Lm = +rand(1, 3).toFixed(2), x = +rand(0.5, 4).toFixed(2); return { q: `A wire of original length <b>${Lm} m</b> extends by <b>${x} mm</b>. Find the strain.`, a: x / 1000 / Lm, unit: '', tol: 0.01, steps: [`ε = x/L = ${x} × 10⁻³ / ${Lm}`, `ε = ${sci(x / 1000 / Lm, 3)} (no unit)`] }; },
    () => { const F = randi(20, 150), Lm = +rand(1.5, 3).toFixed(2), d = +rand(0.3, 0.8).toFixed(2), E = pick([2.0e11, 1.2e11, 7.0e10]); const A = Math.PI * (d / 1000) ** 2 / 4, x = F * Lm / (A * E); return { q: `A wire (L = <b>${Lm} m</b>, d = <b>${d} mm</b>) stretches <b>${fix(x * 1000, 2)} mm</b> under <b>${F} N</b>. Find the Young modulus.`, a: F * Lm / (A * +((x * 1000).toFixed(2)) / 1000), unit: 'Pa', tol: 0.02, steps: [`A = πd²/4 = ${sci(A, 3)} m²`, `E = FL/(Ax) = ${F} × ${Lm} / (${sci(A, 3)} × ${fix(x * 1000, 2)} × 10⁻³)`, `E ≈ ${sci(E, 2)} Pa`] }; },
    () => { const E = pick([2.0e11, 1.2e11]), s = randi(50, 200) * 1e6; return { q: `A metal with <b>E = ${sci(E, 2)} Pa</b> is under a stress of <b>${sci(s, 2)} Pa</b> (within its LoP). Find the strain.`, a: s / E, unit: '', tol: 0.01, steps: ['ε = σ/E', `= ${sci(s, 2)} / ${sci(E, 2)} = ${sci(s / E, 3)}`] }; },
  ] });
}

/* ---------- Lab C: Young modulus experiment ---------- */
const WIRES = { steel: { n: 'Steel (piano wire)', E: 2.10e11, d: 0.300, lop: 1.2e9 }, copper: { n: 'Copper (hard-drawn)', E: 1.25e11, d: 0.400, lop: 1.8e8 }, brass: { n: 'Brass', E: 1.00e11, d: 0.350, lop: 2.5e8 } };
function mountYoung(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.3, minH: 280, maxH: 380, mobileAspect: 1.2, tag: 'apparatus' });
  const S2 = L.stage(P.stageBox, { aspect: 2.5, minH: 250, maxH: 340, plain: true });
  const Lw = 2.500;
  let wire = WIRES.steel, load = 0, dR = [], rows = [], unloading = false, micro = null, xShown = 0;
  const trueX = F => { const A = Math.PI * (wire.d / 1000) ** 2 / 4, s = F / A; const e = s / wire.E + (s > wire.lop ? 2 * (s - wire.lop) ** 2 / (wire.E * wire.lop) : 0); return e * Lw; };
  let maxF = 0, setX = 0;
  function xAt(F) { if (F >= maxF) return trueX(F); const plastic = trueX(maxF) - (maxF / (Math.PI * (wire.d / 1000) ** 2 / 4)) / wire.E * Lw; return plastic + F / (Math.PI * (wire.d / 1000) ** 2 / 4) / wire.E * Lw; }
  function reading(F) { maxF = Math.max(maxF, F); return xAt(F) * 1000 + gauss() * 0.015; }
  function resetExp() { load = 0; rows = []; dR = []; maxF = 0; unloading = false; micro = null; render(); }
  const plot = new Plot(S2, { xlabel: 'strain *ε* (×10⁻³)', ylabel: 'stress *σ* / MPa', ymin: 0 });
  L.loop(dt => {
    const C = Theme.c; let c = S1.begin(); const W = S1.w, Hh = S1.h, wide = W > 620;
    const xmm = load === 0 && !rows.length ? 0 : xAt(load) * 1000; xShown += (xmm - xShown) * Math.min(1, dt * 6);
    // bench
    const by = Hh * (wide ? 0.34 : 0.26), bx0 = 20, bx1 = W - 70;
    c.fillStyle = alpha(C.ink2, .12); c.fillRect(bx0, by + 10, bx1 - bx0 + 40, 14); c.strokeStyle = C.ink2; c.strokeRect(bx0 + .5, by + 10.5, bx1 - bx0 + 40, 14);
    c.fillStyle = C.ink2; c.fillRect(bx0, by - 16, 16, 28);
    const pr = 14; c.beginPath(); c.arc(bx1 + pr, by + 2, pr, 0, TAU); c.strokeStyle = C.ink; c.lineWidth = 2; c.stroke();
    line(c, [[bx0 + 16, by - 2], [bx1 + pr, by - 2]], { color: C.orange, width: 1.6 });
    const hang = 40 + load * 1.3; line(c, [[bx1 + 2 * pr, by + 2], [bx1 + 2 * pr, by + hang]], { color: C.orange, width: 1.6 });
    const nm = Math.round(load / 2); for (let i = 0; i < nm; i++) { c.fillStyle = i % 2 ? C.blue : alpha(C.blue, .75); c.fillRect(bx1 + 2 * pr - 14, by + hang + i * 6, 28, 5); }
    rich(c, `${load} N`, bx1 + 2 * pr - 20, by + hang + 6, { size: 11, color: C.ink2, mono: true, align: 'right' });
    // marker
    const mkx = bx1 - 70 + xShown * 6;
    c.fillStyle = C.red; c.beginPath(); c.moveTo(mkx, by - 2); c.lineTo(mkx - 5, by - 14); c.lineTo(mkx + 5, by - 14); c.closePath(); c.fill();
    rich(c, 'marker', mkx, by - 22, { align: 'center', size: 10, color: C.red });
    rich(c, `L = ${Lw.toFixed(3)} m (clamp → marker)`, (bx0 + mkx) / 2, by - 22, { align: 'center', size: 11, color: C.muted });
    // magnified scale inset
    const ir = wide ? Math.min(78, Hh * 0.28) : Math.min(60, Hh * 0.2), icx = wide ? W * 0.76 : W * 0.72, icy = wide ? Hh * 0.7 : Hh * 0.72;
    c.save(); c.beginPath(); c.arc(icx, icy, ir, 0, TAU); c.fillStyle = C.paper2; c.fill(); c.clip();
    const pxmm = ir / 1.2; for (let v = Math.floor(xShown) - 3; v <= xShown + 3; v += 0.1) { const X = icx + (v - xShown) * pxmm; const vv = Math.round(v * 10); const big = vv % 10 === 0, mid = vv % 5 === 0; line(c, [[X, icy + 10], [X, icy + 10 + (big ? 22 : mid ? 15 : 9)]], { color: C.ink, width: big ? 1.4 : 1 }); if (big) { c.fillStyle = C.ink; c.font = FONT.mono(11, 600); c.textAlign = 'center'; c.textBaseline = 'top'; c.fillText(Math.round(v), X, icy + 36); } }
    c.fillStyle = C.red; c.fillRect(icx - 1, icy - ir, 2, ir + 10);
    c.restore(); c.beginPath(); c.arc(icx, icy, ir, 0, TAU); c.strokeStyle = C.ink2; c.lineWidth = 3; c.stroke();
    line(c, [[mkx, by + 2], [icx - ir * 0.7, icy - ir * 0.7]], { color: C.muted, width: 1, dash: [3, 3] });
    rich(c, `travelling microscope: ${fix(xShown, 2)} mm`, icx, icy + ir + 14, { align: 'center', size: 11, color: C.ink2, mono: true });
    // micrometer
    const mx = 30, my = wide ? Hh * 0.7 : Hh * 0.72, mw = wide ? W * 0.5 : W * 0.5;
    drawMicrometer(c, C, mx, my, mw, micro);
    // ---- graph ----
    S2.begin();
    const d = dR.length ? dR.reduce((a, b) => a + b, 0) / dR.length : wire.d; const A = Math.PI * (d / 1000) ** 2 / 4;
    const data = rows.map(r => ({ ...r, s: r.F / A / 1e6, e: r.x / 1000 / Lw * 1000 }));
    const smax = Math.max(100, ...data.map(p => p.s)) * 1.15, emx = Math.max(0.5, ...data.map(p => p.e)) * 1.15;
    plot.xmax = emx; plot.ymax = smax; plot.axes();
    const use = data.filter(p => !p.off && p.F > 0);
    let Efit = NaN;
    if (use.length >= 2) { let sxy = 0, sxx = 0; for (const p of use) { sxy += p.e * p.s; sxx += p.e * p.e; } const m = sxy / sxx; Efit = m * 1e6 * 1e3; plot.curve(x => m * x, { color: C.green, width: 1.6, a: 0, b: emx }); }
    plot.cross(data.filter(p => !p.off && !p.un).map(p => [p.e, p.s]), { color: C.blue, s: 4.5 });
    plot.cross(data.filter(p => !p.off && p.un).map(p => [p.e, p.s]), { color: C.violet, s: 4.5 });
    plot.cross(data.filter(p => p.off).map(p => [p.e, p.s]), { color: alpha(C.muted, .7), s: 4 });
    if (!rows.length) rich(S2.ctx, 'Measure the diameter, then add loads to collect data', plot.x0 + plot.pw / 2, plot.y0 + plot.ph / 2, { align: 'center', color: C.muted, size: 13 });
    ro.set('d', dR.length ? `${fix(d, 3)} mm (n=${dR.length})` : 'not measured'); ro.set('A', dR.length ? `${sci(A, 3)} m²` : '—'); ro.set('E', isFinite(Efit) ? `${sci(Efit, 3)} Pa` : '—');
    ro.set('err', isFinite(Efit) && dR.length ? `${fix((Efit - wire.E) / wire.E * 100, 1)}%` : '—');
  }, [S1, S2]);
  function drawMicrometer(c, C, x, y, w, r) {
    const h = 40, sleeveL = w * 0.55, thX = x + sleeveL;
    rich(c, 'MICROMETER', x, y - h - 22, { size: 10, color: C.muted, w: 600 });
    // frame / anvil
    c.fillStyle = alpha(C.ink2, .2); c.fillRect(x, y - h / 2 - 4, 10, h + 8);
    c.fillStyle = C.paper3; c.fillRect(x + 10, y - 8, sleeveL - 10, 16); c.strokeStyle = C.ink2; c.lineWidth = 1; c.strokeRect(x + 10.5, y - 7.5, sleeveL - 10, 15);
    line(c, [[x + 14, y], [thX, y]], { color: C.ink, width: 1 });
    const val = r == null ? 0 : r; const pxmm = (sleeveL - 30) / 2.5;
    const zeroX = x + 18; const shown = val;
    for (let q = 0; q <= 2.5 + 1e-9; q += 0.5) { const X = zeroX + q * pxmm; if (X > thX - 2) break; const whole = Math.abs(q - Math.round(q)) < 1e-6; line(c, [[X, y], [X, whole ? y - 8 : y + 8]], { color: C.ink, width: 1.2 }); if (whole) { c.fillStyle = C.ink; c.font = FONT.mono(10); c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillText(Math.round(q), X, y - 9); } }
    // thimble position at value
    const tX = zeroX + shown * pxmm; const tw = w - sleeveL;
    c.fillStyle = C.paper2; c.fillRect(tX, y - h / 2, tw * 0.8, h); c.strokeStyle = C.ink; c.lineWidth = 1.2; c.strokeRect(tX + .5, y - h / 2 + .5, tw * 0.8, h);
    const th = (shown % 0.5) / 0.01; const div = 7;
    c.save(); c.beginPath(); c.rect(tX, y - h / 2, tw * 0.8, h); c.clip();
    for (let k = Math.floor(th) - 4; k <= th + 4; k++) { const Y = y - (k - th) * div; const kk = ((k % 50) + 50) % 50; line(c, [[tX, Y], [tX + (kk % 5 === 0 ? 12 : 7), Y]], { color: C.ink, width: 1 }); if (kk % 5 === 0) { c.fillStyle = C.ink; c.font = FONT.mono(9.5); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(kk, tX + 15, Y); } }
    c.restore();
    line(c, [[tX - 6, y], [tX, y]], { color: C.red, width: 1 });
    // wire in jaws
    c.fillStyle = C.orange; c.fillRect(x + 10, y - 3, Math.max(0, tX - x - 10 - 1) > 0 && r != null ? 0 : 0, 0);
    rich(c, r == null ? 'press “Measure diameter”' : `reading = ${fix(r, 2)} mm`, x, y + h / 2 + 16, { size: 11.5, color: r == null ? C.muted : C.ink, mono: true, w: 600 });
  }
  const g = Group(P.side, '1 · Set up');
  const wsel = el('select', { class: 'sel', id: 'ym-w', 'aria-label': 'wire material' }, Object.entries(WIRES).map(([k, w]) => el('option', { value: k }, w.n)));
  wsel.addEventListener('change', () => { wire = WIRES[wsel.value]; resetExp(); }); g.append(wsel);
  const g2 = Group(P.side, '2 · Measure diameter');
  Btn(Btns(g2), 'Measure diameter', () => { const r = Math.round((wire.d + gauss() * 0.004 + rand(-0.003, 0.003)) * 100) / 100; micro = r; dR.push(r); render(); }, 'pri');
  const dl = el('div', { class: 'mono', style: { fontSize: '12.5px', color: 'var(--ps-ink-2)' } }); g2.append(dl);
  const g3 = Group(P.side, '3 · Load & read');
  const lb = Btns(g3);
  const addB = Btn(lb, '+2 N', () => { if (load >= 30) return; load += 2; rows.push({ F: load, x: reading(load), un: false }); render(); }, 'pri');
  const subB = Btn(lb, '−2 N', () => { if (load <= 0) return; load -= 2; rows.push({ F: load, x: reading(load), un: true }); render(); });
  Btn(lb, 'Restart', resetExp);
  const ro = Readout(Group(P.side, '4 · Analysis'), [['d', 'Mean diameter'], ['A', 'Area πd²/4'], ['E', 'E = gradient', 'hl'], ['err', 'vs accepted value']]);
  Note(P.side, 'Click a row in the results table to exclude an anomalous point (or points past the limit of proportionality) from the best-fit line.');
  const tcard = Card(P.below, 'Results table', null, 'wide');
  const tbox = el('div', { class: 'tbl-wrap', style: { maxHeight: '300px', overflowY: 'auto' } }); tcard.append(tbox);
  function render() {
    dl.textContent = dR.length ? dR.map(v => v.toFixed(2)).join(', ') + ' mm' : 'Take at least 5 readings at different points and orientations.';
    addB.disabled = load >= 30; subB.disabled = load <= 0;
    const d = dR.length ? dR.reduce((a, b) => a + b, 0) / dR.length : NaN; const A = Math.PI * (d / 1000) ** 2 / 4;
    tbox.innerHTML = `<table class="tbl"><tr><th>Load F / N</th><th>Reading</th><th>Extension x / mm</th><th>Stress / MPa</th><th>Strain (×10⁻³)</th><th>Use</th></tr>${rows.map((r, i) => `<tr class="clickable ${r.off ? 'off' : ''}" data-i="${i}"><td>${r.F}</td><td>${r.un ? 'unloading' : 'loading'}</td><td>${r.x.toFixed(2)}</td><td>${isFinite(A) ? (r.F / A / 1e6).toFixed(1) : '—'}</td><td>${(r.x / 1000 / Lw * 1000).toFixed(3)}</td><td>${r.off ? '✗' : '✓'}</td></tr>`).join('') || '<tr><td colspan="6" style="text-align:left;color:var(--ps-muted)">No readings yet.</td></tr>'}</table>`;
    tbox.querySelectorAll('tr[data-i]').forEach(tr => tr.addEventListener('click', () => { const r = rows[+tr.dataset.i]; r.off = !r.off; render(); }));
  }
  render();
  Card(P.below, 'Method (4.1.5)', list(['Clamp a long (≈2–3 m), thin wire at one end; pass it over a pulley and hang a load. A long, thin wire gives an extension large enough to measure accurately.', 'Measure the original length <i>L</i> from clamp to marker with a metre rule / tape.', 'Measure diameter with a <b>micrometer</b> at several points and orientations; take the mean. Calculate A = πd²/4.', 'Add loads in equal steps; record the marker position each time. Extension = reading − initial reading.', 'Remove the loads and repeat readings while unloading to check the wire returns (elastic).', 'Plot stress (y) against strain (x); E = gradient of the straight-line region.'], true));
  Card(P.below, 'Accuracy & safety', list(['<b>Largest uncertainty: the diameter.</b> It is squared in A, so its % uncertainty doubles.', 'Use a <b>reference (comparison) wire</b> of the same material (Searle’s method) to cancel temperature changes and sag of the support.', 'Stay below the limit of proportionality: check the graph is linear.', 'Remove kinks first with a small initial load.', '<b>Safety goggles</b>: the wire can snap and whip. Put a box of sand under the masses.']));
}

/* ---------- Lab D: materials selection ---------- */
const MAT = [
  // name, E GPa, UTS MPa, density, £/kg, ductile?, max elastic strain, colour key, transparent
  ['Mild steel', 200, 450, 7850, 0.8, true, 0.00125, 'ink2'],
  ['High-tensile steel', 200, 1770, 7850, 1.5, true, 0.0075, 'blue'],
  ['Aluminium alloy', 70, 310, 2700, 2.5, true, 0.0039, 'cyan'],
  ['Titanium alloy', 114, 950, 4430, 25, true, 0.0077, 'violet'],
  ['CFRP (carbon fibre)', 150, 1500, 1600, 30, false, 0.01, 'ink'],
  ['Copper', 120, 220, 8960, 8, true, 0.0006, 'orange'],
  ['Glass', 70, 50, 2500, 1.5, false, 0.0007, 'green', true],
  ['Nylon', 3, 75, 1150, 3, true, 0.2, 'red'],
  ['Natural rubber', 0.05, 20, 930, 2, true, 6, 'orange'],
  ['Oak (along grain)', 11, 90, 700, 1.5, false, 0.008, 'green'],
  ['Concrete (tension)', 30, 3, 2400, 0.1, false, 0.0001, 'muted'],
];
const SCEN = {
  bridge: { n: 'Suspension bridge cable', w: { str: 1, cost: 1.4, spec: 0.2, duct: 1, stiff: 0.6 }, why: 'Huge tonnage, so <b>cost per unit strength</b> dominates, and it must be ductile (it yields and warns before failing). High-tensile steel wire wins: CFRP is stronger per kg but ~20× the price per unit strength.' },
  wing: { n: 'Aircraft wing spar', w: { spec: 1.4, stiff: 1, cost: 0.2, duct: 0.2, str: 0.4 }, why: 'Every kg costs fuel for 30 years, so <b>strength-to-weight</b> and <b>stiffness-to-weight</b> matter far more than price: CFRP and aluminium alloy lead.' },
  bungee: { n: 'Bungee cord', w: { strain: 1.6, duct: 0.4, cost: 0.3, stiff: -0.6 }, why: 'Needs a huge <b>elastic strain</b> with low stiffness, so it stores energy and decelerates you gently. Only rubber does this. Its hysteresis also damps the bounce.' },
  rope: { n: 'Climbing rope', w: { spec: 1, strain: 1, duct: 0.6, stiff: -0.3 }, why: 'Light, strong and <b>stretchy</b>, so it absorbs the energy of a fall over a long distance (a smaller force on the climber). Nylon.' },
  bike: { n: 'Racing bike frame', w: { stiff: 1.2, spec: 1, cost: 0.4, duct: 0.2 }, why: '<b>Specific stiffness</b> and strength for low mass; cost is a secondary constraint. CFRP for racers, aluminium alloy when budget matters.' },
  custom: { n: 'Custom weights', w: { str: 0.5, spec: 0.5, stiff: 0.5, cost: 0.5, duct: 0.5, strain: 0 }, why: 'Set your own priorities with the sliders.' },
};
function mountMaterials(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.6, minH: 340, maxH: 520, plain: true });
  let sel = 1, scen = 'bridge', W8 = Object.assign({}, SCEN.bridge.w);
  const pl = new Plot(S, { xlabel: 'density *ρ* / kg m⁻³ (log)', ylabel: 'tensile strength / MPa (log)', xmin: Math.log10(500), xmax: Math.log10(12000), ymin: Math.log10(1.5), ymax: Math.log10(4000), xfmt: v => fmtLog(v), yfmt: v => fmtLog(v), grid: true, xticks: [500, 1000, 2000, 5000, 10000].map(Math.log10), yticks: [2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000].map(Math.log10) });
  function fmtLog(v) { const x = Math.round(Math.pow(10, v) * 100) / 100; return x >= 1000 ? (x / 1000) + 'k' : String(x); }
  Pointer(S, { scroll: true, hit: (x, y) => { let best = -1, bd = 22; MAT.forEach((m, i) => { const d = hyp(x - pl.X(Math.log10(m[3])), y - pl.Y(Math.log10(m[2]))); if (d < bd) { bd = d; best = i; } }); return best >= 0 ? best : null; }, down: i => { sel = i; } });
  L.loop(() => {
    const c = S.begin(), C = Theme.c; pl.layout();
    pl.axes({ zeroAxes: false });
    // specific strength guide lines σ/ρ = const: log σ = log ρ + log k
    for (const k of [0.01, 0.1, 1]) { pl.clip(cx => line(cx, [[pl.X(pl.xmin), pl.Y(pl.xmin + Math.log10(k))], [pl.X(pl.xmax), pl.Y(pl.xmax + Math.log10(k))]], { color: alpha(C.green, .5), width: 1, dash: [6, 5] })); }
    rich(c, 'dashed lines: equal strength-to-weight (↖ better)', pl.x0 + 8, pl.y0 + 12, { size: 11, color: C.green });
    const scores = score();
    MAT.forEach((m, i) => {
      const X = pl.X(Math.log10(m[3])), Y = pl.Y(Math.log10(m[2])); const top = scores[0].i === i;
      const r = 6 + (top ? 3 : 0); c.beginPath(); c.arc(X, Y, r + (i === sel ? 4 : 0), 0, TAU); c.fillStyle = alpha(C[m[7]] || C.ink, i === sel ? .35 : .18); c.fill(); c.strokeStyle = C[m[7]] || C.ink; c.lineWidth = i === sel ? 2.5 : 1.5; c.stroke();
      const lab = m[0] + (top ? '  ★' : ''); c.font = FONT.ui(11.5, 700); const tw = c.measureText(lab).width; const right = X + 14 + tw > pl.x0 + pl.pw;
      rich(c, lab, right ? X - 12 : X + 12, Y, { size: 11.5, align: right ? 'right' : 'left', color: i === sel ? C.ink : C.ink2, w: i === sel || top ? 700 : 500, bg: alpha(C.paper2, .75) });
    });
    const m = MAT[sel];
    const key = sel + scen + JSON.stringify(W8);
    if (info._k !== key) { info._k = key; info.innerHTML = `<div class="ro"><dt>Young modulus</dt><dd>${m[1]} GPa</dd><dt>Tensile strength</dt><dd>${m[2]} MPa</dd><dt>Density</dt><dd>${m[3]} kg m⁻³</dd><dt>Cost (indicative)</dt><dd>£${m[4]}/kg</dd><dt>Strength-to-weight</dt><dd class="hl">${fix(m[2] * 1e6 / m[3] / 1000, 1)} kN m kg⁻¹</dd><dt>Stiffness-to-weight</dt><dd>${fix(m[1] * 1e9 / m[3] / 1e6, 1)} MN m kg⁻¹</dd><dt>£ per MN·m of strength</dt><dd>${fix(m[4] * m[3] / m[2], 1)}</dd><dt>Behaviour</dt><dd>${m[5] ? 'ductile / tough' : 'brittle'}</dd></div>`;
      rank.innerHTML = `<div class="key" style="margin-bottom:8px">${SCEN[scen].why}</div>` + scores.slice(0, 5).map((s, k) => `<div style="display:grid;grid-template-columns:18px minmax(0,1fr) 80px;gap:8px;align-items:center;font-size:13px;margin:4px 0"><span class="mono muted">${k + 1}</span><span>${MAT[s.i][0]}</span><span style="height:6px;background:var(--ps-line);border-radius:3px;overflow:hidden"><i style="display:block;height:100%;width:${Math.max(4, s.v * 100)}%;background:${k ? 'var(--ps-blue)' : 'var(--ps-green)'}"></i></span></div>`).join(''); }
  }, [S]);
  function score() {
    const f = m => ({ str: Math.log10(m[2]), spec: Math.log10(m[2] / m[3]), stiff: Math.log10(m[1] / m[3] * 1000), cost: -Math.log10(m[4] * m[3] / m[2]), duct: m[5] ? 1 : 0, strain: Math.log10(m[6]) });
    const all = MAT.map(f); const keys = ['str', 'spec', 'stiff', 'cost', 'duct', 'strain'];
    const rng = {}; for (const k of keys) { const v = all.map(a => a[k]); rng[k] = [Math.min(...v), Math.max(...v)]; }
    const raw = all.map((a, i) => { let s = 0; for (const k of keys) { const w = W8[k] || 0; const n = (a[k] - rng[k][0]) / ((rng[k][1] - rng[k][0]) || 1); s += w * n; } if (MAT[i][0].startsWith('Concrete')) s -= 5; return { i, s }; });
    const mn = Math.min(...raw.map(r => r.s)), mx = Math.max(...raw.map(r => r.s));
    return raw.map(r => ({ i: r.i, v: (r.s - mn) / ((mx - mn) || 1) })).sort((a, b) => b.v - a.v);
  }
  const g = Group(P.side, 'Design brief');
  const ss = el('select', { class: 'sel', id: 'ms-s', 'aria-label': 'scenario' }, Object.entries(SCEN).map(([k, s]) => el('option', { value: k }, s.n)));
  ss.addEventListener('change', () => { scen = ss.value; W8 = Object.assign({}, SCEN[scen].w); cw.hidden = scen !== 'custom'; sliders.forEach(s => s.set(W8[s.key] || 0)); }); g.append(ss);
  const cw = el('div', { class: 'grp' }); cw.hidden = true; g.append(cw);
  const sliders = [['str', 'Raw strength'], ['spec', 'Strength-to-weight'], ['stiff', 'Stiffness-to-weight'], ['cost', 'Cheap per unit strength'], ['duct', 'Ductile / tough'], ['strain', 'Large elastic strain']].map(([k, lab]) => { const s = Slider(cw, { id: 'ms-' + k, label: lab, min: 0, max: 2, step: 0.1, value: W8[k] || 0, fmt: v => fix(v, 1), oninput: v => W8[k] = v }); s.key = k; return s; });
  const rank = el('div'); Group(P.side, 'Ranking').append(rank);
  const info = el('div'); Group(P.side, 'Selected (tap a point)').append(info);
  // cable sizing calculator
  const cc = Card(P.below, 'Economic decision: size a cable for a load', null, 'wide');
  const fIn = el('input', { class: 'num', id: 'ms-F', value: '500', inputmode: 'decimal', 'aria-label': 'load in kN' });
  const sfIn = el('input', { class: 'num', id: 'ms-sf', value: '3', inputmode: 'decimal', 'aria-label': 'safety factor' });
  const out = el('div', { class: 'tbl-wrap' });
  cc.append(el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '10px', marginBottom: '12px' } }, el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'ms-F' }, 'Load to carry / kN'), fIn), el('div', { class: 'ctl' }, el('label', { class: 'eyebrow', for: 'ms-sf' }, 'Safety factor'), sfIn)), out,
    el('p', { class: 'muted', style: { fontSize: '13px', marginTop: '8px' }, html: `Required area ${tex('A = \\frac{F \\times \\text{SF}}{\\text{UTS}}')}, mass per metre = ρA, cost per metre = mass × £/kg, strain under working load = F/(AE). Prices are indicative.` }));
  const calc = () => { const F = parseNum(fIn.value) * 1e3, sf = parseNum(sfIn.value); if (!(F > 0 && sf > 0)) { out.innerHTML = ''; return; }
    const r = MAT.filter(m => !m[0].startsWith('Concrete')).map(m => { const A = F * sf / (m[2] * 1e6); const mpm = A * m[3]; return { n: m[0], A, d: Math.sqrt(4 * A / Math.PI), mpm, cost: mpm * m[4], strain: F / (A * m[1] * 1e9) }; }).sort((a, b) => a.cost - b.cost);
    out.innerHTML = `<table class="tbl"><tr><th>Material</th><th>Area / cm²</th><th>Diameter / mm</th><th>kg per metre</th><th>£ per metre</th><th>Strain at load</th></tr>${r.map((x, i) => `<tr${i === 0 ? ' style="font-weight:600"' : ''}><td>${x.n}${i === 0 ? ' · cheapest' : ''}</td><td>${fix(x.A * 1e4, 2)}</td><td>${fix(x.d * 1000, 1)}</td><td>${num(x.mpm, 3)}</td><td>${num(x.cost, 3)}</td><td>${x.strain > 0.05 ? '<span style="color:var(--ps-red)">' + fix(x.strain * 100, 0) + '% (too stretchy)</span>' : fix(x.strain * 100, 3) + '%'}</td></tr>`).join('')}</table>`; };
  fIn.addEventListener('input', calc); sfIn.addEventListener('input', calc); calc();
  Card(P.below, 'Why stress, strain & E matter (4.1.7)', list(['<b>Stress</b>, not force, decides failure. It lets you compare materials regardless of size: set the working stress well below the UTS (safety factor).', '<b>Young modulus</b> sets how much a structure deflects. Bridges, floors and bike frames need stiffness as well as strength.', '<b>Strain</b> capacity sets how much energy can be absorbed: ropes and bungees need it, glass and concrete lack it.', 'Economics: strength per £ and per kg often decide between materials that would all technically work.']));
}

topic({
  id: 'solids', code: '4.1', unit: 'A2 1', title: 'Deformation of Solids', short: 'Solids',
  blurb: 'Load it, stretch it, break it. Hooke’s law and its limits, stress–strain curves from the lattice up, the Young modulus practical, and choosing the right material.',
  outcomes: [
    ['4.1.1', 'state Hooke’s law and use F = kx to solve simple problems', 'hooke'],
    ['4.1.2', 'demonstrate an understanding of the terms elastic and plastic deformation and elastic limit', 'tensile'],
    ['4.1.3', 'distinguish between limit of proportionality and elastic limit', 'hooke'],
    ['4.1.4', 'define stress, strain and the Young modulus', 'tensile'],
    ['4.1.5', 'perform and describe an experiment to determine the Young modulus', 'young'],
    ['4.1.6', 'use the equation for strain energy, E = ½Fx = ½kx²', 'hooke'],
    ['4.1.7', 'demonstrate an understanding of the importance of the stress, strain and Young modulus of a material when making design and economic decisions about materials use', 'materials'],
  ],
  labs: [
    { id: 'hooke', title: 'Hooke’s law rig', hint: 'load it past P and E', spec: ['4.1.1', '4.1.3', '4.1.6'], mount: mountHooke },
    { id: 'tensile', title: 'Tensile test', hint: 'steel · copper · glass · rubber', spec: ['4.1.2', '4.1.3', '4.1.4'], mount: mountTensile },
    { id: 'young', title: 'Young modulus practical', hint: 'virtual experiment', spec: ['4.1.4', '4.1.5'], mount: mountYoung },
    { id: 'materials', title: 'Materials selection', hint: 'design + cost', spec: ['4.1.7'], mount: mountMaterials },
  ],
  equations: [['F = kx', 'Hooke’s law'], ['\\sigma = \\frac{F}{A}', 'Pa'], ['\\varepsilon = \\frac{x}{L}', 'no unit'], ['E = \\frac{\\sigma}{\\varepsilon} = \\frac{FL}{Ax}', 'Pa'], ['E_p = \\tfrac{1}{2}Fx = \\tfrac{1}{2}kx^2', 'J']],
  traps: ['Hooke’s law has a condition: “…provided the limit of proportionality is not exceeded”. Always state it.', 'Use <b>diameter</b> in πd²/4. Using d as a radius loses marks every year.', 'mm² → m²: multiply by 10⁻⁶, not 10⁻³.', 'Strain has <b>no unit</b>. Don’t write “m”.', '½Fx only works for a <b>straight</b> F–x line. Otherwise find the area (count squares or use trapezia).', 'Stress–strain gradient = E; force–extension gradient = k. Don’t mix them up.'],
});
})();

/* ================= 4.2 Thermal physics ================= */
(() => {
const kB = 1.38e-23, R = 8.31, NA = 6.02e23, AMU = 1.66e-27;

/* ---------- Lab A: gas laws piston ---------- */
function mountGas(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 300, maxH: 440, mobileAspect: 1.05 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 250, maxH: 360, plain: true });
  const VMIN = 40, VMAX = 200, HH = 0.62, NPER = 4.5e-5, s0 = 0.62;
  let mode = 'boyle', V = 120, Vt = 120, T = 300, N = 100, pFix = null, pts = [], meas = null, exp = null, dragP = false, gtype = 'pV';
  const parts = [];
  const sig = t => s0 * Math.sqrt(t / 300) / Math.SQRT2;
  const spawn = () => ({ x: rand(0.02, V / VMAX - 0.02), y: rand(0.02, HH - 0.02), vx: gauss() * sig(T), vy: gauss() * sig(T) });
  for (let i = 0; i < N; i++) parts.push(spawn());
  let Pbar = null, J = 0; const nmol = () => N * NPER;
  const pIdeal = () => nmol() * R * T / (V * 1e-6) / 1000; // kPa
  const calib = () => { const w = V / VMAX, A = w * HH; const P2 = N * (2 * sig(T) ** 2) / (2 * A); return pIdeal() / P2; };
  function setN(n) { while (parts.length < n) parts.push(spawn()); while (parts.length > n) parts.pop(); N = n; }
  function lay() { const W = S.w, Hh = S.h, wide = W >= 620; const cw = wide ? W * 0.66 : W * 0.68, ch = Math.min(Hh - 60, cw / (1 / HH) ); return { x: 20, y: (Hh - ch) / 2 + (wide ? 0 : -10), w: cw, h: ch, wide }; }
  Pointer(S, { hit: (x, y) => { if (mode !== 'boyle' && mode !== 'free') return null; const g = lay(); const px = g.x + g.w * V / VMAX; return Math.abs(x - px) < 20 && y > g.y - 10 && y < g.y + g.h + 10 ? 'p' : null; }, down: () => dragP = true, up: () => dragP = false, move: (t, x) => { const g = lay(); Vt = clamp(Math.round((x - g.x) / g.w * VMAX), VMIN, VMAX); sV.set(Vt); } });
  const plot = new Plot(S2, { pad: { l: 58, r: 16, t: 16, b: 42 } });
  L.loop(dt => {
    // targets by mode
    if (mode === 'charles') { if (pFix == null) pFix = pIdeal(); Vt = clamp(nmol() * R * T / (pFix * 1000) * 1e6, VMIN, VMAX); }
    const dV = (Vt - V) * Math.min(1, dt * 4); V += dV; const vp = dV / VMAX / Math.max(dt, 1e-4);
    const w = V / VMAX; J = 0; const sg = sig(T);
    const sub = 3; const h = dt / sub;
    for (let s = 0; s < sub; s++) for (const p of parts) {
      p.x += p.vx * h; p.y += p.vy * h;
      if (p.x < 0) { p.x = -p.x; J += 2 * Math.abs(p.vx); p.vx = Math.abs(p.vx); }
      if (p.x > w) { const rel = p.vx - vp; if (rel > 0) { J += 2 * rel; p.vx = 2 * vp - p.vx; } p.x = Math.min(p.x, w - 1e-4); if (p.x > w) p.x = w - 1e-4; }
      if (p.y < 0) { p.y = -p.y; J += 2 * Math.abs(p.vy); p.vy = Math.abs(p.vy); }
      if (p.y > HH) { p.y = 2 * HH - p.y; J += 2 * Math.abs(p.vy); p.vy = -Math.abs(p.vy); }
    }
    for (const p of parts) if (Math.random() < dt * 0.9) { p.vx = gauss() * sg; p.vy = gauss() * sg; } // heat bath (Andersen thermostat)
    { let v2 = 0; for (const p of parts) v2 += p.vx * p.vx + p.vy * p.vy; v2 /= parts.length; const tgt = 2 * sg * sg; const lam = Math.sqrt(1 + Math.min(1, dt / 0.15) * (tgt / Math.max(v2, 1e-9) - 1)); for (const p of parts) { p.vx *= lam; p.vy *= lam; } }
    const perim = 2 * (w + HH); const P2 = J / (perim * Math.max(dt, 1e-4));
    if (Pbar == null) Pbar = pIdeal() / calib(); Pbar += (P2 - Pbar) * Math.min(1, dt / 0.8);
    const pMeas = Pbar * calib();
    if (meas) { meas.sum += P2 * calib() * dt; meas.t += dt; if (meas.t >= 1.4) { const pm = meas.sum / meas.t; pts.push({ V, T, p: pm }); meas = null; } }
    if (exp && !meas) { exp.wait -= dt; if (exp.wait <= 0) { if (exp.i >= exp.vals.length) exp = null; else { const v = exp.vals[exp.i++]; if (mode === 'boyle') { Vt = v; sV.set(v); } else { T = v; sT.set(v); } exp.wait = 0.9; exp.go = true; } } else if (exp.go && exp.wait < 0.05) {} }
    if (exp && exp.go && exp.wait <= 0.0 && !meas) {}
    if (exp && exp.go && exp.wait < 0.2 && !meas) { meas = { sum: 0, t: 0 }; exp.go = false; exp.wait = 1.7; }
    // ---- draw cylinder ----
    const c = S.begin(), C = Theme.c, g = lay(), W = S.w;
    const tcol = T > 300 ? alpha(C.orange, clamp((T - 300) / 300, 0, 1) * 0.25) : alpha(C.blue, clamp((300 - T) / 200, 0, 1) * 0.22);
    const px = g.x + g.w * w;
    c.fillStyle = tcol; c.fillRect(g.x, g.y, px - g.x, g.h);
    c.strokeStyle = C.ink; c.lineWidth = 4; c.beginPath(); c.moveTo(g.x + g.w + 20, g.y - 2); c.lineTo(g.x - 2, g.y - 2); c.lineTo(g.x - 2, g.y + g.h + 2); c.lineTo(g.x + g.w + 20, g.y + g.h + 2); c.stroke();
    // heat bath strip
    const gr = c.createLinearGradient(0, g.y + g.h + 6, 0, g.y + g.h + 16); gr.addColorStop(0, T > 300 ? alpha(C.orange, .7) : alpha(C.blue, .6)); gr.addColorStop(1, 'transparent'); c.fillStyle = gr; c.fillRect(g.x, g.y + g.h + 6, g.w, 10);
    rich(c, `heat bath at ${fix(T, 0)} K`, g.x, g.y + g.h + 24, { size: 11, color: C.muted });
    // piston
    c.fillStyle = C.ink2; c.fillRect(px, g.y + 2, 12, g.h - 4); c.fillRect(px + 12, g.y + g.h / 2 - 4, g.x + g.w + 20 - px, 8);
    if (mode === 'boyle' || mode === 'free') { handle(c, px + 6, g.y + g.h / 2, C.blue, dragP); }
    // particles
    const sx = g.w, vr = Math.SQRT2 * sg;
    for (const p of parts) { const sp = hyp(p.vx, p.vy) / vr; dot(c, g.x + p.x * sx, g.y + p.y * (g.h / HH), 2.8, sp < 0.7 ? C.blue : sp < 1.25 ? C.violet : C.red); }
    // labels
    rich(c, 'gas (fixed mass)', g.x + 8, g.y + 14, { size: 11.5, w: 600, color: C.ink2, bg: alpha(C.paper2, .8) });
    rich(c, mode === 'boyle' || mode === 'free' ? 'piston (drag)' : 'piston', px + 20, g.y + g.h / 2 - 16, { size: 11.5, w: 600, color: C.ink2, bg: alpha(C.paper2, .8) });
    { const ly = g.y + g.h - 14; [[C.blue, 'slow'], [C.violet, 'medium'], [C.red, 'fast']].forEach(([col, t2], k) => { dot(c, g.x + 12 + k * 62, ly, 3.2, col); rich(c, t2, g.x + 19 + k * 62, ly, { size: 10.5, color: C.ink2 }); }); }
    // gauges
    const gx = g.wide ? g.x + g.w + 90 : W - 46, gy = g.wide ? g.y + g.h * 0.3 : g.y + 40, gr0 = g.wide ? Math.min(60, S.h * 0.17) : 32;
    c.beginPath(); c.arc(gx, gy, gr0, 0, TAU); c.fillStyle = C.paper2; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 2; c.stroke();
    const pmx = 400; for (let v = 0; v <= pmx; v += 50) { const a = Math.PI * 0.75 + v / pmx * Math.PI * 1.5; const big = v % 100 === 0; line(c, [[gx + Math.cos(a) * gr0 * (big ? 0.78 : 0.85), gy + Math.sin(a) * gr0 * (big ? 0.78 : 0.85)], [gx + Math.cos(a) * gr0 * 0.95, gy + Math.sin(a) * gr0 * 0.95]], { color: C.ink2, width: big ? 1.6 : 1 }); if (big && gr0 > 45) { c.fillStyle = C.muted; c.font = FONT.mono(9); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(v, gx + Math.cos(a) * gr0 * 0.6, gy + Math.sin(a) * gr0 * 0.6); } }
    const na = Math.PI * 0.75 + clamp(pMeas / pmx, 0, 1.02) * Math.PI * 1.5; arrow(c, gx, gy, gx + Math.cos(na) * gr0 * 0.82, gy + Math.sin(na) * gr0 * 0.82, { color: C.red, width: 2, head: 7 }); dot(c, gx, gy, 3.5, C.ink);
    rich(c, `${fix(pMeas, 0)} kPa`, gx, gy + gr0 + 14, { align: 'center', size: 12, mono: true, w: 600, color: C.ink });
    rich(c, 'pressure gauge', gx, gy - gr0 - 10, { align: 'center', size: 11, w: 600, color: C.ink2 });
    // thermometer
    if (g.wide) { const tx = gx - 8, ty0 = gy + gr0 + 54, th = S.h - ty0 - 34; const frac = clamp((T - 100) / 500, 0, 1);
      c.fillStyle = C.paper2; rrect(c, tx, ty0, 16, th, 8); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 1.5; c.stroke();
      rich(c, 'thermometer', tx + 8, ty0 - 12, { align: 'center', size: 11, w: 600, color: C.ink2 });
      c.fillStyle = C.red; c.fillRect(tx + 5, ty0 + th - 6 - frac * (th - 14), 6, frac * (th - 14) + 6); dot(c, tx + 8, ty0 + th + 4, 10, C.red);
      for (let tk = 100; tk <= 600; tk += 100) { const Y = ty0 + th - 6 - (tk - 100) / 500 * (th - 14); line(c, [[tx + 16, Y], [tx + 22, Y]], { color: C.ink2, width: 1 }); c.fillStyle = C.muted; c.font = FONT.mono(9); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(`${tk}K`, tx + 25, Y); }
    }
    // ---- graph ----
    S2.begin();
    const x0 = gtype === 'pV' ? d => d.V : gtype === 'p1V' ? d => 1000 / d.V : d => d.T - 273;
    const y0 = gtype === 'Vt' ? d => d.V : d => d.p;
    if (gtype === 'pV') Object.assign(plot, { xmin: 0, xmax: 220, ymin: 0, ymax: 420, xlabel: 'volume *V* / cm³', ylabel: 'pressure *p* / kPa' });
    if (gtype === 'p1V') Object.assign(plot, { xmin: 0, xmax: 27, ymin: 0, ymax: 420, xlabel: '1/*V* / 10⁻³ cm⁻³', ylabel: 'pressure *p* / kPa' });
    if (gtype === 'pt') Object.assign(plot, { xmin: -300, xmax: 350, ymin: 0, ymax: 420, xlabel: 'temperature *θ* / °C', ylabel: 'pressure *p* / kPa' });
    if (gtype === 'Vt') Object.assign(plot, { xmin: -300, xmax: 350, ymin: 0, ymax: 220, xlabel: 'temperature *θ* / °C', ylabel: 'volume *V* / cm³' });
    plot.axes();
    const nR = nmol() * R;
    if (gtype === 'pV') plot.curve(v => nR * T / (v * 1e-6) / 1000, { color: alpha(C.blue, .5), dash: [5, 4], width: 1.4, a: 20, b: 220 });
    if (gtype === 'p1V') plot.curve(x => nR * T * x * 1e3 / 1000, { color: alpha(C.blue, .5), dash: [5, 4], width: 1.4 });
    const dpts = pts.map(d => [x0(d), y0(d)]);
    if ((gtype === 'pt' || gtype === 'Vt') && dpts.length >= 2) {
      const n = dpts.length, mx = dpts.reduce((a, b) => a + b[0], 0) / n, my = dpts.reduce((a, b) => a + b[1], 0) / n; let sxy = 0, sxx = 0; for (const [a, b] of dpts) { sxy += (a - mx) * (b - my); sxx += (a - mx) ** 2; }
      if (sxx > 0) { const m = sxy / sxx, b0 = my - m * mx; const xi = -b0 / m; plot.curve([[Math.min(xi, -300), m * Math.min(xi, -300) + b0], [350, m * 350 + b0]], { color: C.green, width: 1.6 }); plot.curve([[xi, 0], [Math.min(...dpts.map(d => d[0])), m * Math.min(...dpts.map(d => d[0])) + b0]], { color: C.green, width: 1.6, dash: [5, 4] });
        if (isFinite(xi)) { plot.dots([[xi, 0]], { color: C.red, r: 5 }); plot.label(xi, 0, `absolute zero ≈ ${fix(xi, 0)} °C`, { dx: 8, dy: -14, color: C.red, size: 12, w: 700, bg: alpha(C.paper2, .9) }); ro.set('az', `${fix(xi, 0)} °C`); } }
    } else ro.set('az', '—');
    if (gtype === 'pt' || gtype === 'Vt') plot.vline(-273.15, { color: alpha(C.red, .5) });
    plot.cross(dpts, { color: C.red, s: 5, width: 2 });
    const live = { V, T, p: pMeas }; const lx = x0(live), ly = y0(live);
    if (plot.inside(plot.X(lx), plot.Y(ly))) { S2.ctx.beginPath(); S2.ctx.arc(plot.X(lx), plot.Y(ly), 6, 0, TAU); S2.ctx.strokeStyle = C.blue; S2.ctx.lineWidth = 2; S2.ctx.stroke(); }
    if (!pts.length) rich(S2.ctx, meas ? 'measuring…' : 'Press “Record point” or “Run experiment”', plot.x0 + plot.pw - 8, plot.y0 + 14, { align: 'right', color: C.muted, size: 12 });
    // readouts
    ro.set('p', `${fix(pMeas, 1)} kPa`); ro.set('pi', `${fix(pIdeal(), 1)} kPa`); ro.set('V', `${fix(V, 1)} cm³`); ro.set('T', `${fix(T, 0)} K (${fix(T - 273, 0)} °C)`); ro.set('n', `${sci(nmol(), 2)} mol · N = ${sci(nmol() * NA, 2)}`);
    ro.set('k', `${fix(pMeas * V / T, 2)} kPa cm³ K⁻¹`);
    recB.disabled = !!meas || !!exp; expB.disabled = !!exp;
  }, [S, S2]);
  const g0 = Group(P.side, 'Experiment');
  const segM = Seg(g0, { options: [['boyle', 'Boyle'], ['charles', 'Charles'], ['pressure', 'Pressure'], ['free', 'Free']], value: mode, onchange: m => setMode(m) });
  const lawNote = el('div', { class: 'eqbox', style: { fontSize: '17px', padding: '0', textAlign: 'left' } }); g0.append(lawNote);
  const g1 = Group(P.side, 'Controls');
  const sV = Slider(g1, { id: 'gs-V', label: 'Volume <i>V</i>', min: VMIN, max: VMAX, step: 1, value: V, unit: 'cm³', fmt: v => fix(v, 0), oninput: v => Vt = v });
  const sT = Slider(g1, { id: 'gs-T', label: 'Temperature <i>T</i>', min: 100, max: 600, step: 5, value: T, unit: 'K', fmt: v => fix(v, 0), oninput: v => T = v });
  const sN = Slider(g1, { id: 'gs-N', label: 'Amount of gas', min: 40, max: 180, step: 10, value: N, fmt: v => sci(v * NPER, 2) + ' mol', oninput: v => { setN(v); pFix = null; } });
  const b = Btns(g1); const recB = Btn(b, 'Record point', () => { meas = { sum: 0, t: 0 }; }, 'pri'); const expB = Btn(b, '▶ Run experiment', runExp); Btn(b, 'Clear', () => { pts = []; });
  const ro = Readout(Group(P.side, 'Gauges'), [['p', 'Measured <i>p</i>', 'hl'], ['pi', '<i>nRT</i>/<i>V</i>'], ['V', '<i>V</i>'], ['T', '<i>T</i>'], ['n', '<i>n</i>'], ['k', '<i>pV</i>/<i>T</i>'], ['az', 'Extrapolated zero']]);
  const gg = Group(P.side, 'Graph');
  const segG = Seg(gg, { options: [['pV', '<i>p</i>–<i>V</i>'], ['p1V', '<i>p</i>–1/<i>V</i>'], ['pt', '<i>p</i>–<i>θ</i>'], ['Vt', '<i>V</i>–<i>θ</i>']], value: gtype, onchange: v => gtype = v });
  function setMode(m) {
    mode = m; pts = []; exp = null; meas = null; pFix = null;
    sV.inp.disabled = !(m === 'boyle' || m === 'free'); sT.inp.disabled = m === 'boyle';
    if (m === 'boyle') { T = 300; sT.set(300); gtype = 'pV'; } if (m === 'charles') gtype = 'Vt'; if (m === 'pressure') { gtype = 'pt'; Vt = 120; sV.set(120); }
    segG.set(gtype);
    lawNote.innerHTML = m === 'boyle' ? `${tex('pV = \\text{constant}')} <span class="muted" style="font-size:13px">fixed mass, constant T</span>` : m === 'charles' ? `${tex('\\frac{V}{T} = \\text{constant}')} <span class="muted" style="font-size:13px">fixed mass, constant p</span>` : m === 'pressure' ? `${tex('\\frac{p}{T} = \\text{constant}')} <span class="muted" style="font-size:13px">fixed mass, constant V</span>` : `${tex('\\frac{pV}{T} = \\text{constant}')} <span class="muted" style="font-size:13px">fixed mass</span>`;
  }
  function runExp() { pts = []; if (mode === 'boyle') exp = { vals: [50, 70, 90, 120, 150, 190], i: 0, wait: 0.2 }; else if (mode === 'free') return; else exp = { vals: [150, 230, 310, 390, 470, 550], i: 0, wait: 0.2 }; }
  setMode('boyle');
  Note(P.side, 'Pressure here is <b>measured</b>: the sim adds up the momentum every particle gives the walls. The small wobble is real statistical noise from a finite number of molecules.');
  EqCard(P.below, 'Gas laws (4.2.1–4.2.3)', [['pV = \\text{const}', 'Boyle, T const'], ['\\frac{p}{T} = \\text{const}', 'pressure law, V const'], ['\\frac{V}{T} = \\text{const}', 'Charles, p const'], ['pV = nRT', 'n in mol, R = 8.31'], ['pV = NkT', 'N molecules, k = 1.38×10⁻²³'], ['R = N_A k', '']]);
  Card(P.below, 'Absolute zero (4.2.7)', `<p>Plot <i>p</i> (or <i>V</i>) against <i>θ</i>/°C for a fixed mass of gas and extrapolate the straight line back to zero pressure. Every gas meets the axis at the same point, ≈ <b>−273 °C</b>.</p><p>Absolute zero is the temperature at which the molecules have <b>minimum internal energy</b>: their random kinetic energy would be zero, so they’d exert no pressure. It is <b>0 K</b>, the zero of the kelvin scale: ${tex('T/\\text{K} = \\theta/^\\circ\\text{C} + 273')}</p>`);
  Card(P.below, 'Describing the experiments (4.2.1)', list(['<b>Boyle</b>: trapped air column in a sealed tube, pressure from a Bourdon gauge, volume from the column length. Change the pressure slowly so the temperature stays constant. Plot p against 1/V: a straight line through the origin.', '<b>Pressure law</b>: flask of air in a water bath connected to a pressure gauge by short tubing. Heat in steps, stir, and wait for equilibrium before each reading.', '<b>Charles</b>: a capillary tube with an air column trapped by a bead of concentrated sulfuric acid, in a water bath. Read the column length at each temperature.', 'Controls: fixed mass of gas, no leaks. Allow time for the gas to reach the bath temperature before every reading.']));
}

/* ---------- Lab B: kinetic theory ---------- */
const STEPS = [
  ['One molecule', 'A molecule of mass <i>m</i> moves in a cube of side <i>L</i>. Its velocity component towards the shaded wall is <i>u</i>.', 'p_x = mu'],
  ['Elastic collision', 'It rebounds with −<i>u</i>. The change in the molecule’s momentum is −2<i>mu</i>, so the wall receives +2<i>mu</i>.', '\\Delta p = mu - (-mu) = 2mu'],
  ['Time between hits', 'It travels 2<i>L</i> (there and back) before it hits the same wall again.', '\\Delta t = \\frac{2L}{u}'],
  ['Average force', 'Newton’s 2nd law: force = rate of change of momentum.', 'F = \\frac{\\Delta p}{\\Delta t} = \\frac{2mu}{2L/u} = \\frac{mu^2}{L}'],
  ['Pressure from one', 'Pressure = force / area, with wall area <i>L</i>² and volume <i>V</i> = <i>L</i>³.', 'p = \\frac{mu^2}{L^3} = \\frac{mu^2}{V}'],
  ['N molecules', 'The molecules have a range of speeds, so use the <b>mean square</b> x-velocity.', 'p = \\frac{Nm\\langle u^2\\rangle}{V}'],
  ['Random directions', 'No direction is special, so ⟨<i>u</i>²⟩ = ⟨<i>v</i>²⟩ = ⟨<i>w</i>²⟩ and ⟨<i>c</i>²⟩ = 3⟨<i>u</i>²⟩.', 'pV = \\frac{1}{3}Nm\\langle c^2\\rangle'],
  ['Link to temperature', 'Compare with <i>pV</i> = <i>NkT</i>. The mean KE of a molecule depends only on <i>T</i>.', '\\frac{1}{2}m\\langle c^2\\rangle = \\frac{3}{2}kT'],
];
const GASES = { He: ['Helium', 4], N2: ['Nitrogen', 28], O2: ['Oxygen', 32], CO2: ['Carbon dioxide', 44], Xe: ['Xenon', 131] };
function mountKinetic(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 380, mobileAspect: 1.2, tag: 'derivation' });
  const S2 = L.stage(P.stageBox, { aspect: 2.5, minH: 240, maxH: 340, plain: true });
  let step = 0, t = 0, hits = [], flashT = -9, g1 = 'N2', g2 = 'He', Tk = 300;
  const one = { p: [0.3, 0.5, 0.4], v: [0.55, 0.23, 0.17] };
  const many = Array.from({ length: 26 }, () => ({ p: [rand(0.1, 0.9), rand(0.1, 0.9), rand(0.1, 0.9)], v: (() => { const a = rand(0, TAU), b = Math.acos(rand(-1, 1)), s = rand(0.25, 0.7); return [s * Math.sin(b) * Math.cos(a), s * Math.sin(b) * Math.sin(a), s * Math.cos(b)]; })() }));
  const plot = new Plot(S2, { xlabel: 'molecular speed *c* / m s⁻¹', ylabel: 'fraction per m s⁻¹ / 10⁻³', xmin: 0, xmax: 2500, ymin: 0, yfmt: v => v === 0 ? '0' : (v * 1e3).toFixed(1) });
  const mb = (c, m, T) => { const a = m / (2 * kB * T); return 4 * Math.PI * Math.pow(a / Math.PI, 1.5) * c * c * Math.exp(-a * c * c); };
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h;
    const wide = W > 600, Lc = Math.min(Hh * 0.62, W * (wide ? 0.3 : 0.5)), ox = wide ? W * 0.08 : W * 0.12, oy = Hh * 0.18 + Lc + (wide ? 10 : 0);
    const dk = 0.42, ph = 32 * DEG;
    const pr = (x, y, z) => [ox + x * Lc + z * Lc * dk * Math.cos(ph), oy - y * Lc - z * Lc * dk * Math.sin(ph)];
    // shaded wall x=1
    const wall = [pr(1, 0, 0), pr(1, 1, 0), pr(1, 1, 1), pr(1, 0, 1)];
    const fl = Math.max(0, 1 - (t - flashT) * 3);
    c.beginPath(); wall.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fillStyle = alpha(C.blue, 0.12 + fl * 0.3); c.fill();
    const E = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    const edges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    for (const [a, b] of edges) { const back = (E[a][2] === 1 && E[b][2] === 1) || ((a === 0 || a === 3) && b >= 4 && (b === 4 || b === 7)); line(c, [pr(...E[a]), pr(...E[b])], { color: C.ink2, width: 1.3, dash: back ? [4, 4] : null }); }
    const Lp = pr(0.5, 0, 0); rich(c, '*L*', Lp[0], Lp[1] + 14, { align: 'center', color: C.ink2, size: 14 });
    // molecules
    const adv = (m, spd) => { for (let k = 0; k < 3; k++) { m.p[k] += m.v[k] * dt * spd; if (m.p[k] > 0.97) { m.p[k] = 0.97; m.v[k] = -Math.abs(m.v[k]); if (k === 0 && m === one) { flashT = t; hits.push(t); } } if (m.p[k] < 0.03) { m.p[k] = 0.03; m.v[k] = Math.abs(m.v[k]); } } };
    adv(one, 1); if (step >= 5) many.forEach(m => adv(m, 1));
    if (step >= 5) for (const m of many) { const q = pr(...m.p); dot(c, q[0], q[1], 3.5, alpha(C.violet, .7)); }
    const q = pr(...one.p); dot(c, q[0], q[1], 7, C.red, C.paper2);
    // velocity component arrow
    if (step <= 4) { const s = 90; arrow(c, q[0], q[1], q[0] + Math.sign(one.v[0]) * s * 0.5, q[1], { color: C.blue, width: 2.2 }); rich(c, one.v[0] > 0 ? '*u*' : '−*u*', q[0] + Math.sign(one.v[0]) * 52, q[1] - 12, { color: C.blue, size: 14, align: 'center' }); }
    if ((step === 1 || step === 3) && fl > 0) { const wp = pr(1, one.p[1], one.p[2]); arrow(c, wp[0] + 6, wp[1], wp[0] + 50, wp[1], { color: C.orange, width: 3 }); rich(c, '+2*mu* on wall', wp[0] + 54, wp[1], { color: C.orange, size: 13, w: 600 }); }
    // timeline
    hits = hits.filter(h => t - h < 12);
    const tx0 = wide ? W * 0.52 : 20, tx1 = W - 24, ty = wide ? Hh * 0.72 : Hh - 30;
    if (step >= 1) {
      line(c, [[tx0, ty], [tx1, ty]], { color: C.ink2, width: 1.2 }); rich(c, 'time →  (hits on the shaded wall)', tx0, ty + 16, { size: 11, color: C.muted });
      const span = 10; for (const h of hits) { const X = tx1 - (t - h) / span * (tx1 - tx0); if (X > tx0) { line(c, [[X, ty - 10], [X, ty + 4]], { color: C.orange, width: 2.5 }); } }
      if (hits.length >= 2 && step >= 2) { const a = hits[hits.length - 2], b2 = hits[hits.length - 1]; const X1 = tx1 - (t - a) / span * (tx1 - tx0), X2 = tx1 - (t - b2) / span * (tx1 - tx0); if (X1 > tx0) { arrow(c, X1, ty - 22, X2, ty - 22, { color: C.green, width: 1.4, both: true, head: 6 }); rich(c, 'Δ*t* = 2*L*/*u*', (X1 + X2) / 2, ty - 34, { align: 'center', color: C.green, size: 12.5 }); } }
    }
    // step text on canvas (wide)
    if (wide) { c.fillStyle = C.muted; c.font = FONT.mono(11, 600); c.textAlign = 'left'; c.textBaseline = 'top'; c.fillText(`STEP ${step + 1} / ${STEPS.length} · ${STEPS[step][0].toUpperCase()}`, W * 0.52, Hh * 0.14); }
    // ---- MB plot ----
    S2.begin(); const m1 = GASES[g1][1] * AMU, m2 = GASES[g2][1] * AMU;
    const peak = Math.max(mb(Math.sqrt(2 * kB * Tk / m1), m1, Tk), mb(Math.sqrt(2 * kB * Tk / m2), m2, Tk));
    plot.xmax = Math.max(600, Math.min(4000, Math.sqrt(3 * kB * Tk / Math.min(m1, m2)) * 2.4)); plot.ymax = peak * 1.18; plot.axes();
    for (const [gk, m, col] of [[g1, m1, C.blue], [g2, m2, C.red]]) {
      const cr = Math.sqrt(3 * kB * Tk / m), cm = Math.sqrt(8 * kB * Tk / (Math.PI * m)), cp = Math.sqrt(2 * kB * Tk / m);
      const pts = []; for (let i = 0; i <= 300; i++) { const cc = i / 300 * plot.xmax; pts.push([cc, mb(cc, m, Tk)]); }
      plot.area(pts, alpha(col, .1)); plot.curve(pts, { color: col, width: 2.2 });
      plot.vline(cr, { color: col, dash: [5, 4] }); plot.label(cr, mb(cr, m, Tk), `*c*ᵣₘₛ ${fix(cr, 0)}`, { dx: 6, dy: -10, color: col, size: 11.5, bg: alpha(C.paper2, .85) });
      plot.label(cp, mb(cp, m, Tk), GASES[gk][0], { dx: -6, dy: -14, color: col, size: 12, w: 700, align: 'right', bg: alpha(C.paper2, .85) });
      if (gk === g1) { ro.set('c1', `${fix(cr, 0)} m s⁻¹`); ro.set('m1', `${fix(cp, 0)} / ${fix(cm, 0)}`); } else ro.set('c2', `${fix(cr, 0)} m s⁻¹`);
    }
    ro.set('ke', `${sci(1.5 * kB * Tk, 3)} J`);
  }, [S, S2]);
  const gA = Group(P.side, 'Derivation of pV = ⅓Nm⟨c²⟩');
  const stepBox = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } }); gA.append(stepBox);
  const nav = Btns(gA); Btn(nav, '← Back', () => { step = Math.max(0, step - 1); renderStep(); }); const nb = Btn(nav, 'Next step →', () => { step = Math.min(STEPS.length - 1, step + 1); renderStep(); }, 'pri');
  function renderStep() { const [ttl, txt, eq] = STEPS[step]; stepBox.innerHTML = `<div class="eyebrow">Step ${step + 1} of ${STEPS.length} · ${ttl}</div><div class="key">${txt}</div><div class="eqbox" style="text-align:left;font-size:19px;padding:4px 0">${tex(eq)}</div>`; nb.disabled = step === STEPS.length - 1; }
  renderStep();
  const gB = Group(P.side, 'Speed distribution');
  const mkSel = (id, v, set) => { const s = el('select', { class: 'sel', id }, Object.entries(GASES).map(([k, [n, M]]) => el('option', { value: k }, `${n} (${M} u)`))); s.value = v; s.addEventListener('change', () => set(s.value)); return s; };
  gB.append(el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' } }, mkSel('kt-g1', g1, v => g1 = v), mkSel('kt-g2', g2, v => g2 = v)));
  Slider(gB, { id: 'kt-T', label: 'Temperature', min: 50, max: 1500, step: 10, value: Tk, unit: 'K', fmt: v => fix(v, 0), oninput: v => Tk = v });
  const ro = Readout(gB, [['ke', 'Mean KE = 3/2 <i>kT</i> (both)', 'hl'], ['c1', '<i>c</i><sub>rms</sub> gas 1'], ['m1', '<i>c</i><sub>mp</sub> / ⟨<i>c</i>⟩ gas 1'], ['c2', '<i>c</i><sub>rms</sub> gas 2']]);
  Note(gB, 'Same temperature means the <b>same mean KE</b>, so lighter molecules must move faster: <i>c</i><sub>rms</sub> ∝ 1/√<i>m</i>. Heating flattens and widens the curve, but the area always stays 1.');
  EqCard(P.below, 'Kinetic theory (4.2.5–4.2.6)', STEPS.map(s => [s[2], s[0]]));
  Card(P.below, 'Assumptions of the kinetic model', list(['A very large number of molecules in continuous, random motion.', 'The volume of the molecules is negligible compared with the volume of the container.', 'Collisions (with each other and the walls) are perfectly elastic.', 'No intermolecular forces except during collisions.', 'The duration of a collision is negligible compared with the time between collisions.', 'Molecules obey Newton’s laws.']));
  Drill(P.below, { title: 'Kinetic theory drill', cls: 'wide', gens: [
    () => { const Tt = randi(200, 800); return { q: `Find the mean kinetic energy of a gas molecule at <b>${Tt} K</b> (k = 1.38 × 10⁻²³ J K⁻¹).`, a: 1.5 * kB * Tt, unit: 'J', tol: 0.01, steps: ['½m⟨c²⟩ = 3/2 kT', `= 1.5 × 1.38×10⁻²³ × ${Tt} = ${sci(1.5 * kB * Tt, 3)} J`] }; },
    () => { const [gk, [n, M]] = pick(Object.entries(GASES)); const Tt = randi(250, 600); const m = M * AMU; const cr = Math.sqrt(3 * kB * Tt / m); return { q: `Find the r.m.s. speed of <b>${n}</b> molecules (mass ${M} u; 1 u = 1.66 × 10⁻²⁷ kg) at <b>${Tt} K</b>.`, a: cr, unit: 'm s⁻¹', tol: 0.01, steps: [`m = ${M} × 1.66×10⁻²⁷ = ${sci(m, 3)} kg`, `½m⟨c²⟩ = 3/2 kT ⇒ c<sub>rms</sub> = √(3kT/m)`, `= √(3 × 1.38×10⁻²³ × ${Tt} / ${sci(m, 3)}) = ${fix(cr, 0)} m s⁻¹`] }; },
    () => { const p = randi(80, 200) * 1e3, rho = +rand(0.1, 1.8).toFixed(2); const cr = Math.sqrt(3 * p / rho); return { q: `A gas at pressure <b>${fix(p / 1000, 0)} kPa</b> has density <b>${rho} kg m⁻³</b>. Find the r.m.s. speed of its molecules.`, a: cr, unit: 'm s⁻¹', tol: 0.01, steps: ['pV = ⅓Nm⟨c²⟩ and Nm/V = ρ, so p = ⅓ρ⟨c²⟩', `c<sub>rms</sub> = √(3p/ρ) = √(3 × ${p} / ${rho}) = ${fix(cr, 0)} m s⁻¹`] }; },
    () => { const T1 = randi(200, 400), f = pick([2, 4, 9]); return { q: `The absolute temperature of a gas is multiplied by <b>${f}</b>. By what factor does the r.m.s. speed change?`, a: Math.sqrt(f), unit: '', tol: 0.01, steps: ['½m⟨c²⟩ ∝ T, so c<sub>rms</sub> ∝ √T', `factor = √${f} = ${fix(Math.sqrt(f), 3)}`] }; },
  ] });
}

/* ---------- Lab C: internal energy ---------- */
const SEGS = [ // [label, Q kJ span, T start, T end, phase, schematic width]
  ['Ice warms', 42, -20, 0, 'solid', 0.12], ['Melting', 334, 0, 0, 'melt', 0.2], ['Water warms', 420, 0, 100, 'liquid', 0.22], ['Boiling', 2260, 100, 100, 'boil', 0.32], ['Steam warms', 40, 100, 120, 'gas', 0.14]];
const QTOT = SEGS.reduce((a, s) => a + s[1], 0);
function mountInternal(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 340, maxH: 480, mobileAspect: 0.8 });
  let Q = 20, run = true, trueScale = false, rate = 1;
  const Np = 48, parts = Array.from({ length: Np }, (_, i) => ({ i, sx: (i % 8), sy: Math.floor(i / 8), x: 0, y: 0, vx: 0, vy: 0, mode: 'lattice' }));
  const stateAt = q => { let acc = 0; for (const s of SEGS) { if (q <= acc + s[1] || s === SEGS[SEGS.length - 1]) { const f = clamp((q - acc) / s[1], 0, 1); return { seg: s, f, T: s[2] + (s[3] - s[2]) * f }; } acc += s[1]; } };
  const qToX = q => { if (trueScale) return q / QTOT; let acc = 0, ax = 0; for (const s of SEGS) { if (q <= acc + s[1]) return ax + (q - acc) / s[1] * s[5]; acc += s[1]; ax += s[5]; } return 1; };
  const xToQ = x => { if (trueScale) return x * QTOT; let acc = 0, ax = 0; for (const s of SEGS) { if (x <= ax + s[5]) return acc + (x - ax) / s[5] * s[1]; acc += s[1]; ax += s[5]; } return QTOT; };
  const plot = new Plot(S, { ylabel: 'temperature *θ* / °C', xlabel: 'energy supplied *Q* / kJ (1 kg of water)', ymin: -30, ymax: 130, xmin: 0, xmax: 1 });
  Pointer(S, { scroll: true, hit: (x, y) => plot.inside(x, y, 6) ? 'g' : null, move: (t, x) => { Q = clamp(xToQ(clamp((x - plot.x0) / plot.pw, 0, 1)), 0, QTOT); run = false; pb.textContent = '▶ Heat'; } });
  L.loop(dt => {
    if (run) { Q += dt * rate * (trueScale ? 160 : 60) * (stateAt(Q).seg[4] === 'boil' ? (trueScale ? 1 : 4) : 1); if (Q >= QTOT) { Q = QTOT; run = false; pb.textContent = '▶ Heat'; } }
    const st = stateAt(Q), Tk = st.T + 273;
    const c = S.begin(), C = Theme.c, W = S.w, Hh = S.h, wide = W >= 640;
    const box = wide ? { x: 16, y: 16, w: W * 0.34, h: Hh - 32 } : { x: 16, y: 12, w: W - 32, h: Hh * 0.42 };
    const gp = wide ? { x: W * 0.37, y: 0, w: W * 0.63, h: Hh } : { x: 0, y: Hh * 0.45, w: W, h: Hh * 0.55 };
    // phase fractions
    const ph = st.seg[4]; let fl = 0, fg = 0; if (ph === 'melt') fl = st.f; else if (ph === 'liquid') fl = 1; else if (ph === 'boil') { fl = 1 - st.f; fg = st.f; } else if (ph === 'gas') fg = 1;
    const nG = Math.round(fg * Np), nL = Math.round((fl + fg) * Np) - nG;
    // box
    c.fillStyle = C.paper2; c.fillRect(box.x, box.y, box.w, box.h); c.strokeStyle = C.ink2; c.lineWidth = 2; c.strokeRect(box.x, box.y, box.w, box.h);
    const a = Math.min((box.w - 40) / 8, (box.h * 0.5) / 6), lx0 = box.x + box.w / 2 - 3.5 * a, ly0 = box.y + box.h - 16 - 5.5 * a;
    const vib = 0.05 * a * Math.sqrt(Tk / 253) * 3;
    const speedL = a * 1.6 * Math.sqrt(Tk / 300), speedG = box.h * 0.9 * Math.sqrt(Tk / 373);
    const liqTop = box.y + box.h - 16 - Math.max(nL, 1) / Np * 5.5 * a * 1.15 - a;
    { const d0 = a * 0.95; const liq = parts.filter(p => p.mode === 'liquid'); for (let i = 0; i < liq.length; i++) for (let j = i + 1; j < liq.length; j++) { const p = liq[i], q = liq[j]; const dx = q.x - p.x, dy = q.y - p.y, d = hyp(dx, dy) || 0.01; if (d < d0) { const push = (d0 - d) * 0.5 * Math.min(1, dt * 20); p.x -= dx / d * push; p.y -= dy / d * push; q.x += dx / d * push; q.y += dy / d * push; } } }
    parts.forEach((p, k) => {
      const want = k < nG ? 'gas' : k < nG + nL ? 'liquid' : 'lattice';
      if (p.mode !== want) { if (want === 'gas') { const an = rand(-Math.PI * 0.9, -Math.PI * 0.1); p.vx = Math.cos(an) * speedG; p.vy = Math.sin(an) * speedG; } p.mode = want; if (!p.x) { p.x = lx0 + p.sx * a; p.y = ly0 + p.sy * a; } }
      if (!p.x) { p.x = lx0 + p.sx * a; p.y = ly0 + p.sy * a; }
      if (p.mode === 'lattice') { const tx = lx0 + p.sx * a + gauss() * vib, ty = ly0 + p.sy * a + gauss() * vib; p.x += (tx - p.x) * Math.min(1, dt * 12); p.y += (ty - p.y) * Math.min(1, dt * 12); }
      else if (p.mode === 'liquid') { p.vx += gauss() * speedL * 6 * dt; p.vy += gauss() * speedL * 6 * dt + a * 0.8 * dt; const sp = hyp(p.vx, p.vy), mx = speedL; if (sp > mx) { p.vx *= mx / sp; p.vy *= mx / sp; } p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < box.x + 6) { p.x = box.x + 6; p.vx = Math.abs(p.vx); } if (p.x > box.x + box.w - 6) { p.x = box.x + box.w - 6; p.vx = -Math.abs(p.vx); } if (p.y > box.y + box.h - 6) { p.y = box.y + box.h - 6; p.vy = -Math.abs(p.vy); } if (p.y < liqTop) { p.y = liqTop; p.vy = Math.abs(p.vy) * 0.5; } }
      else { const sp = hyp(p.vx, p.vy) || 1; p.vx *= speedG / sp; p.vy *= speedG / sp; p.x += p.vx * dt; p.y += p.vy * dt; if (p.x < box.x + 6) { p.x = box.x + 6; p.vx = Math.abs(p.vx); } if (p.x > box.x + box.w - 6) { p.x = box.x + box.w - 6; p.vx = -Math.abs(p.vx); } if (p.y < box.y + 6) { p.y = box.y + 6; p.vy = Math.abs(p.vy); } if (p.y > box.y + box.h - 6) { p.y = box.y + box.h - 6; p.vy = -Math.abs(p.vy); } }
      dot(c, p.x, p.y, Math.max(3, a * 0.28), p.mode === 'gas' ? C.red : p.mode === 'liquid' ? C.violet : C.blue);
    });
    // bonds for lattice neighbours
    c.strokeStyle = alpha(C.blue, .35); c.lineWidth = 1; c.beginPath(); parts.forEach(p => { if (p.mode !== 'lattice') return; for (const q of parts) { if (q.mode === 'lattice' && ((q.sx === p.sx + 1 && q.sy === p.sy) || (q.sy === p.sy + 1 && q.sx === p.sx))) { c.moveTo(p.x, p.y); c.lineTo(q.x, q.y); } } }); c.stroke();
    rich(c, ph === 'solid' ? 'SOLID · vibrating about fixed positions' : ph === 'melt' ? 'MELTING · bonds breaking' : ph === 'liquid' ? 'LIQUID · sliding past each other' : ph === 'boil' ? 'BOILING · molecules escaping' : 'GAS · far apart, fast, random', box.x + 8, box.y + 14, { size: 10.5, color: C.muted, w: 600 });
    [[C.blue, 'solid (bonded)'], [C.violet, 'liquid'], [C.red, 'gas']].forEach(([col, t2], k) => { const lx = box.x + 12 + [0, 104, 160][k]; dot(c, lx, box.y + 32, 4, col); rich(c, t2, lx + 8, box.y + 32, { size: 10.5, color: C.ink2, fit: false }); });
    // graph
    plot.rect = { x: gp.x + 4, y: gp.y + 4, w: gp.w - 8, h: gp.h - 8 }; plot.pad = { l: 50, r: wide ? 96 : 76, t: 14, b: 40 };
    plot.xfmt = v => fix(xToQ(v), 0); plot.xticks = trueScale ? [0, 500, 1000, 1500, 2000, 2500, 3000].map(q => q / QTOT) : [0, 42, 376, 796, 3056, 3096].map(qToX); if (!trueScale && W < 560) plot.xticks = [0, 376, 796, 3096].map(qToX); plot.axes({ zeroAxes: true });
    const curve = []; let acc = 0; for (const s of SEGS) { for (let i = 0; i <= 20; i++) { const q = acc + s[1] * i / 20; curve.push([qToX(q), s[2] + (s[3] - s[2]) * i / 20]); } acc += s[1]; }
    plot.curve(curve, { color: alpha(C.muted, .6), width: 1.4, dash: [4, 4] });
    const done = curve.filter(p => p[0] <= qToX(Q) + 1e-9); done.push([qToX(Q), st.T]); plot.curve(done, { color: C.red, width: 2.6 });
    dot(c, plot.X(qToX(Q)), plot.Y(st.T), 6, C.red, C.paper2);
    acc = 0; for (const s of SEGS) { const xm = qToX(acc + s[1] / 2); if (s[4] === 'melt' || s[4] === 'boil') plot.label(xm, s[2] + 10, s[4] === 'melt' ? 'melting: PE ↑' : 'boiling: PE ↑', { align: 'center', size: 11, color: C.orange, w: 600 }); acc += s[1]; }
    // KE / PE bars
    const bx = plot.x0 + plot.pw + 16, bw = wide ? 26 : 20, by0 = plot.Y(0), bt = plot.y0, bb = plot.y0 + plot.ph;
    const KE = Tk / 393, PE = -(ph === 'solid' ? 1 : ph === 'melt' ? 1 - 0.129 * st.f : ph === 'liquid' ? 0.871 : ph === 'boil' ? 0.871 * (1 - st.f) : 0);
    const mid = (bt + bb) / 2, sc = (bb - bt) / 2 - 16;
    line(c, [[bx - 4, mid], [bx + 2 * bw + 14, mid]], { color: C.ink2, width: 1 });
    c.fillStyle = C.red; c.fillRect(bx, mid - KE * sc, bw, KE * sc); c.fillStyle = C.blue; c.fillRect(bx + bw + 8, mid, bw, -PE * sc);
    c.font = FONT.ui(10.5, 700); c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillStyle = C.red; c.fillText('KE', bx + bw / 2, mid - KE * sc - 3);
    c.textBaseline = 'top'; c.fillStyle = C.blue; c.fillText('PE', bx + bw * 1.5 + 8, mid - PE * sc + 3);
    c.fillStyle = C.muted; c.font = FONT.mono(10); c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('0', bx - 6, mid);
    // readouts
    ro.set('ph', st.seg[0]); ro.set('T', `${fix(st.T, 1)} °C = ${fix(Tk, 1)} K`); ro.set('Q', `${fix(Q, 0)} kJ`);
    ro.set('what', ph === 'melt' || ph === 'boil' ? '<b style="color:var(--ps-blue)">potential energy</b>' : '<b style="color:var(--ps-red)">kinetic energy</b>');
  }, [S]);
  const g = Group(P.side, 'Heater');
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Heat'; }, 'pri'); Btn(b, 'Reset to ice', () => { Q = 0; run = true; pb.textContent = '❚❚ Pause'; parts.forEach(p => { p.mode = 'lattice'; }); });
  Slider(g, { id: 'ie-r', label: 'Heating speed', min: 0.3, max: 3, step: 0.1, value: rate, fmt: v => fix(v, 1) + '×', oninput: v => rate = v });
  Switch(g, { label: 'True energy scale on graph', value: trueScale, onchange: v => trueScale = v });
  const ro = Readout(Group(P.side, 'State'), [['ph', 'Stage'], ['T', 'Temperature'], ['Q', 'Energy supplied'], ['what', 'Energy going into']]);
  Note(P.side, '<b>Internal energy</b> = the sum of the randomly distributed <b style="color:var(--ps-red)">kinetic</b> and <b style="color:var(--ps-blue)">potential</b> energies of all the molecules. Temperature tracks the KE only, so on the flat sections energy goes into PE and the temperature doesn’t change.');
  Note(P.side, 'Drag across the graph to scrub. Switch on the true scale: boiling needs ~5× more energy than heating water from 0 to 100 °C.');
  Card(P.below, 'Internal energy (4.2.4)', list(['Molecules have a <b>random distribution</b> of speeds, so KE differs from molecule to molecule. Collisions constantly reshuffle it.', 'PE comes from intermolecular bonds. It is negative for bound molecules and rises towards zero as they separate.', 'Heating a substance raises its internal energy: its KE (temperature rises) or its PE (change of state).', 'For an <b>ideal gas</b> there are no intermolecular forces, so PE = 0 and internal energy is all kinetic: ' + tex('U = \\frac{3}{2}NkT'), 'Absolute zero = minimum internal energy.']));
}

/* ---------- Lab D: specific heat capacity (solids and liquids, electrical method) ---------- */
const BLOCKS = { al: ['Aluminium', 900], cu: ['Copper', 385], fe: ['Steel', 450], br: ['Brass', 380] };
const LIQUIDS = { water: ['Water', 4200], ethanol: ['Ethanol', 2440], paraffin: ['Paraffin oil', 2100] };
function mountSHC(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.75, minH: 340, maxH: 620, mobileAspect: 0.6 });
  const S2 = L.stage(P.stageBox, { aspect: 2.5, minH: 240, maxH: 340, plain: true });
  const Rh = 3.2, Troom = 18;
  let startB = null, kind = 'solid', blk = 'al', liq = 'water', Vs = 12, lag = true, oil = true, stir = true, cool = false;
  let t = 0, on = false, ran = false, tb, tth, hist = [], tOff = 600, speed = 30, tStart = null, stirPh = 0, flowPh = 0;
  const mass = () => kind === 'solid' ? 1.0 : 0.40;
  const cTrue = () => kind === 'solid' ? BLOCKS[blk][1] : LIQUIDS[liq][1];
  const name = () => kind === 'solid' ? BLOCKS[blk][0] + ' block' : LIQUIDS[liq][0];
  function reset() { t = 0; on = false; ran = false; tb = cool ? Troom - 5 : Troom; tth = tb; hist = [[0, tth]]; tStart = tth; if (startB) startB.textContent = '▶ Start heater'; }
  reset();
  const plot = new Plot(S2, { xlabel: 'time *t* / s', ylabel: 'temperature *θ* / °C', xmin: 0, xmax: 900, pad: { t: 16 } });
  // label with a leader line: text at (tx,ty), pointing to (px,py)
  const tagTo = (c, tx, ty, px, py, text, col) => { line(c, [[tx + (px > tx ? 4 : -4), ty], [px, py]], { color: alpha(col, .7), width: 1 }); dot(c, px, py, 2.2, col); rich(c, text, tx, ty, { align: px > tx ? 'right' : 'left', size: 11.5, w: 600, color: col }); };
  L.loop(dt => {
    const m = mass(), c_ = cTrue(), I = Vs / Rh, Pw = on ? Vs * I : 0;
    // loss coefficient (W K⁻¹): lagged block / insulated cup with lid lose little; bare block or open beaker lose a lot
    const h = kind === 'solid' ? (lag ? 0.06 : 0.55) : (lag ? 0.12 : 0.9);
    // thermometer response time: oil in the hole / stirring give good thermal contact
    const tau = kind === 'solid' ? (oil ? 6 : 28) : (stir ? 5 : 45);
    // unstirred liquid: the thermometer bulb sits in cooler liquid near the bottom (hot liquid rises)
    const strat = kind === 'liquid' && !stir ? 0.8 : 1;
    if (ran && t < 900) { const sub = 20, st = dt * speed / sub; for (let k = 0; k < sub; k++) { tb += (Pw - h * (tb - Troom)) / (m * c_) * st; const target = Troom + (tb - Troom) * strat; tth += (target - tth) / tau * st; t += st; if (on && t >= tOff) on = false; } hist.push([t, tth]); if (t >= 900) { ran = false; startB.textContent = 'Done: Reset'; } }
    if (kind === 'liquid' && stir && ran) stirPh += dt * 3;
    const C = Theme.c, c = S.begin(), W = S.w, H = S.h, wide = W > 620;
    if (on) flowPh = (flowPh + dt * 0.12) % 1;
    // ---------- two panels: apparatus | circuit diagram (stacked on phones) ----------
    const A = wide ? { x: 0, y: 0, w: W * 0.54, h: H } : { x: 0, y: 0, w: W, h: H * 0.57 };
    const B = wide ? { x: W * 0.54, y: 0, w: W * 0.46, h: H } : { x: 0, y: H * 0.57, w: W, h: H * 0.43 };
    if (wide) line(c, [[B.x, 14], [B.x, H - 14]], { color: C.line, width: 1 }); else line(c, [[12, B.y], [W - 12, B.y]], { color: C.line, width: 1 });
    const title = (t2, x, y) => rich(c, t2, x, y, { size: 10.5, w: 700, mono: true, color: C.muted, fit: false });
    title('APPARATUS', A.x + 14, A.y + 16); title('CIRCUIT DIAGRAM', B.x + 14, B.y + 16);
    const fs = wide ? 12 : 11, warm = clamp((tb - Troom) / 30, 0, 1);
    // label with a leader line; text may be split into lines with '|'
    const tagTo = (tx, ty, px, py, text, col, right) => {
      const ls = text.split('|'), lh = fs + 3, y0 = ty - (ls.length - 1) * lh / 2;
      line(c, [[right ? tx - 5 : tx + 5, ty], [px, py]], { color: alpha(col, .75), width: 1 }); dot(c, px, py, 2.2, col);
      ls.forEach((t2, k) => rich(c, t2, tx, y0 + k * lh, { align: right ? 'left' : 'right', size: fs, w: 600, color: col, fit: false }));
    };
    // ---------- apparatus ----------
    const bw = Math.min(A.w * 0.4, 190), cx = A.x + A.w * 0.5, bx = cx - bw / 2;
    const by = A.y + A.h * (wide ? 0.38 : 0.36), bh = A.h * (wide ? 0.44 : 0.46);
    const hx = bx + bw * 0.28, thx = bx + bw * 0.62, Lx = bx - 24, Rx = bx + bw + 24;
    const topIn = kind === 'liquid' ? by - 12 : by;
    if (lag) { // hatched insulation band around the sides and base
      const lt = 13, ox = bx - lt, oy = topIn + (kind === 'liquid' ? 0 : 6), ow = bw + 2 * lt, oh = by + bh + lt - oy;
      c.save(); c.beginPath(); c.rect(ox, oy, ow, oh); c.rect(bx, oy - 1, bw, by + bh - oy + 1); c.clip('evenodd');
      c.fillStyle = alpha(C.orange, .14); c.fillRect(ox, oy, ow, oh); c.strokeStyle = alpha(C.orange, .6); c.lineWidth = 1;
      for (let k = -oh; k < ow; k += 7) { c.beginPath(); c.moveTo(ox + k, oy + oh); c.lineTo(ox + k + oh, oy); c.stroke(); }
      c.restore();
    }
    if (kind === 'solid') {
      c.fillStyle = C.paper3; c.fillRect(bx, by, bw, bh); c.fillStyle = alpha(C.red, warm * 0.3); c.fillRect(bx, by, bw, bh);
      c.strokeStyle = C.ink; c.lineWidth = 1.8; c.strokeRect(bx, by, bw, bh);
      for (const x of [hx, thx]) { c.fillStyle = C.paper; c.fillRect(x - 8, by, 16, bh * 0.66); c.strokeStyle = C.ink2; c.lineWidth = 1; c.strokeRect(x - 8, by, 16, bh * 0.66); }
      if (oil) { c.fillStyle = alpha(C.orange, .6); c.fillRect(thx - 7, by + bh * 0.46, 14, bh * 0.2); }
    } else {
      const ly = by + bh * 0.14;
      c.fillStyle = alpha(C.cyan, 0.2); c.fillRect(bx, ly, bw, by + bh - ly); c.fillStyle = alpha(C.red, warm * 0.2); c.fillRect(bx, ly, bw, by + bh - ly);
      line(c, [[bx, ly], [bx + bw, ly]], { color: C.cyan, width: 1.5 });
      if (!stir && ran) { c.fillStyle = alpha(C.red, warm * 0.25); c.fillRect(bx, ly, bw, (by + bh - ly) * 0.3); }
      c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.moveTo(bx, topIn); c.lineTo(bx, by + bh); c.lineTo(bx + bw, by + bh); c.lineTo(bx + bw, topIn); c.stroke();
      if (lag) { c.fillStyle = C.ink2; c.fillRect(bx - 13, topIn - 6, bw + 26, 6); }
      const sx = bx + bw * 0.86, sy = Math.sin(stirPh) * bh * 0.1;
      line(c, [[sx, by - 40 + sy], [sx, by + bh * 0.8 + sy]], { color: C.ink2, width: 2 }); line(c, [[sx - 11, by + bh * 0.8 + sy], [sx + 11, by + bh * 0.8 + sy]], { color: C.ink2, width: 3 });
      { const sly = wide ? by - 30 : by + bh * 0.32; tagTo(Rx, sly, sx + 1, sly + sy, 'stirrer', C.ink2, true); }
    }
    rich(c, `${name()}|${fix(m, 2)} kg`.replace('|', ' · '), cx, by + bh - 14, { align: 'center', size: fs, w: 700, color: C.ink, fit: false });
    // immersion heater: insulated rod, coil at the bottom glows when current flows
    const hTop = by - 36, hBot = by + bh * 0.6;
    c.fillStyle = C.ink2; c.fillRect(hx - 4, hTop, 8, hBot - hTop - 18);
    c.strokeStyle = on ? C.red : C.ink2; c.lineWidth = 2.4; c.beginPath(); for (let k = 0; k <= 30; k++) { const yy = hBot - 18 + k * 0.6, xx = hx + 5 * Math.sin(k * 1.3); k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke();
    if (on) { c.fillStyle = alpha(C.red, .18); c.beginPath(); c.arc(hx, hBot - 8, 15, 0, TAU); c.fill(); }
    // its two leads end in terminals that go to the circuit
    const ty = hTop - 14; line(c, [[hx - 2, hTop], [hx - 2, ty], [hx - 16, ty]], { color: C.red, width: 1.6 }); line(c, [[hx + 2, hTop], [hx + 2, ty], [hx + 16, ty]], { color: C.ink, width: 1.6 });
    for (const [x, col] of [[hx - 18, C.red], [hx + 18, C.ink]]) { c.beginPath(); c.arc(x, ty, 3.2, 0, TAU); c.fillStyle = C.paper; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.stroke(); }
    rich(c, wide ? 'to circuit →' : 'to circuit ↓', hx, ty - 12, { align: 'center', size: 10.5, color: C.muted, fit: false });
    tagTo(Lx, by - 16, hx - 4, by - 16, 'immersion|heater', C.ink2, false);
    // thermometer
    const tTop = A.y + 34, tBot = by + bh * 0.6;
    c.fillStyle = C.paper2; rrect(c, thx - 4, tTop, 8, tBot - tTop, 4); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 1.2; rrect(c, thx - 4, tTop, 8, tBot - tTop, 4); c.stroke();
    const tl = clamp((tth - 10) / 60, 0, 1); c.fillStyle = C.red; c.fillRect(thx - 1.5, tBot - (tBot - tTop - 8) * tl - 4, 3, (tBot - tTop - 8) * tl + 4); dot(c, thx, tBot, 5.5, C.red);
    const thY = tTop + 22; tagTo(Rx, thY, thx + 4, thY, 'thermometer', C.ink2, true);
    meter(c, Rx + 38, thY + 24, `${fix(tth, 1)} °C`, { color: C.red, size: 12 });
    if (kind === 'solid' && oil) tagTo(Rx, by + bh * 0.56, thx + 7, by + bh * 0.56, 'oil', C.orange, true);
    if (kind === 'solid') tagTo(Lx, by + bh * 0.55, bx + 6, by + bh * 0.55, 'metal|block', C.ink2, false);
    else tagTo(Lx, by + bh * 0.5, bx + 10, by + bh * 0.5, 'liquid', C.cyan, false);
    if (lag) tagTo(Lx, by + bh * 0.86, bx - 6, by + bh * 0.86, kind === 'solid' ? 'lagging' : 'insulated|cup + lid', C.orange, false);
    // stopwatch
    const swr = wide ? 22 : 17, swx = Rx + swr + 2, swy = by + bh - swr + 4;
    c.beginPath(); c.arc(swx, swy, swr, 0, TAU); c.fillStyle = C.paper2; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.8; c.stroke(); c.fillStyle = C.ink; c.fillRect(swx - 3, swy - swr - 5, 6, 5);
    const sa = -Math.PI / 2 + (t % 60) / 60 * TAU; line(c, [[swx, swy], [swx + Math.cos(sa) * swr * 0.8, swy + Math.sin(sa) * swr * 0.8]], { color: C.red, width: 1.8 }); dot(c, swx, swy, 2, C.ink);
    rich(c, `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`, swx, swy + swr + 11, { align: 'center', size: 12, mono: true, w: 600, color: C.ink, fit: false });
    // ---------- circuit diagram: supply, switch, ammeter and heater in series; voltmeter across the heater ----------
    const x0 = B.x + (wide ? 36 : 28), x1 = B.x + B.w - (wide ? 30 : 28), y0 = B.y + (wide ? B.h * 0.24 : 64), y1 = B.y + (wide ? B.h * 0.56 : B.h * 0.58), span = x1 - x0, mx = (x0 + x1) / 2;
    const xb = x0 + span * 0.34, xs = x0 + span * 0.62, hw = wide ? Math.min(46, span * 0.16) : 36, vy = y1 + (wide ? 58 : 44);
    const wcol = C.ink;
    if (on) flowDots(c, [[x0, y0], [x0, y1], [x1, y1], [x1, y0]], flowPh, 22, alpha(C.blue, .8), 2.4);
    comp(c, 'battery', x0, y0, xb, y0, { label: 'd.c. supply', side: 1, size: 30, color: wcol, ls: fs });
    comp(c, 'switch', xb, y0, xs, y0, { closed: on, label: on ? 'switch (closed)' : 'switch (open)', size: 30, color: wcol, ls: fs });
    comp(c, 'ammeter', xs, y0, x1, y0, { size: 30, color: wcol });
    comp(c, 'wire', x1, y0, x1, y1, { color: wcol }); comp(c, 'wire', x0, y1, x0, y0, { color: wcol });
    comp(c, 'wire', x1, y1, mx + hw, y1, { color: wcol }); comp(c, 'wire', mx - hw, y1, x0, y1, { color: wcol });
    comp(c, 'resistor', mx + hw, y1, mx - hw, y1, { size: 2 * hw - 12, fill: on ? alpha(C.red, .35) : null, color: wcol, label: 'immersion heater', side: 1, ls: fs, ld: 20 });
    // voltmeter branch
    const n1 = mx - hw - 8, n2 = mx + hw + 8;
    line(c, [[n1, y1], [n1, vy]], { color: wcol, width: 2 }); line(c, [[n2, y1], [n2, vy]], { color: wcol, width: 2 });
    comp(c, 'voltmeter', n1, vy, n2, vy, { size: 30, color: wcol }); dot(c, n1, y1, 3.4, wcol); dot(c, n2, y1, 3.4, wcol);
    // plus/minus on the supply (long plate = +)
    rich(c, '+', x0 + span * 0.17 - 16, y0 - 20, { align: 'center', size: 12, w: 700, color: C.red, fit: false }); rich(c, '−', x0 + span * 0.17 + 12, y0 - 20, { align: 'center', size: 12, w: 700, color: C.ink2, fit: false });
    meter(c, x0 + span * 0.81, y0 - 30, `I = ${on ? fix(I, 2) : '0.00'} A`, { color: C.blue, size: 12 });
    meter(c, n2 + 62, vy, `V = ${on ? fix(Vs, 1) : '0.0'} V`, { color: C.violet, size: 12 });
    rich(c, 'ammeter in series · voltmeter in parallel across the heater', mx, vy + (wide ? 38 : 30), { align: 'center', size: 10.5, color: C.muted });
    // ---------- graph ----------
    S2.begin(); const ymx = Math.max(40, ...hist.map(p => p[1])) + 4; plot.ymin = Math.min(10, Troom - 8); plot.ymax = Math.ceil(ymx / 5) * 5; plot.axes();
    plot.vline(tOff, { color: alpha(C.orange, .7) }); plot.label(tOff, plot.ymax, 'heater off', { dx: 4, dy: 10, color: C.orange, size: 11 });
    plot.curve(hist, { color: C.red, width: 2.2 });
    let res = null; if (t >= tOff && hist.length > 5) { const th = Math.max(...hist.map(p => p[1])); const dth = th - tStart; const E = Vs * I * tOff; res = { dth, E, c: E / (m * dth) }; }
    const seg = hist.filter(p => p[0] > 120 && p[0] < Math.min(tOff, t)); let grad = NaN;
    if (seg.length > 10) { const n = seg.length, mxx = seg.reduce((a, b) => a + b[0], 0) / n, my = seg.reduce((a, b) => a + b[1], 0) / n; let sxy = 0, sxx = 0; for (const [a, b] of seg) { sxy += (a - mxx) * (b - my); sxx += (a - mxx) ** 2; } grad = sxy / sxx; const b0 = my - grad * mxx; plot.curve([[120, grad * 120 + b0], [Math.min(tOff, t), grad * Math.min(tOff, t) + b0]], { color: C.green, width: 1.5, dash: [5, 4] }); plot.label(Math.min(tOff, t), grad * Math.min(tOff, t) + b0, 'gradient Δθ/Δt', { dx: -6, dy: -12, align: 'right', size: 11, color: C.green }); }
    ro.set('E', `${fix(Vs * I, 1)} W × ${fix(Math.min(t, tOff), 0)} s = ${fix(Vs * I * Math.min(t, tOff) / 1000, 2)} kJ`);
    ro.set('dt', res ? `${fix(res.dth, 2)} K` : '—'); ro.set('c1', res ? `${fix(res.c, 0)} J kg⁻¹ K⁻¹` : '—');
    ro.set('c2', isFinite(grad) && grad > 0 ? `${fix(Vs * I / (m * grad), 0)} J kg⁻¹ K⁻¹` : '—'); ro.set('tr', `${c_} J kg⁻¹ K⁻¹`);
    ro.set('er', res ? `${res.c > c_ ? '+' : ''}${fix((res.c - c_) / c_ * 100, 1)}%` : '—');
  }, [S, S2]);
  const g = Group(P.side, 'Set up');
  Seg(g, { options: [['solid', 'Solid block'], ['liquid', 'Liquid']], value: kind, onchange: v => { kind = v; bs.hidden = v !== 'solid'; ls.hidden = v !== 'liquid'; swOil.el.hidden = v !== 'solid'; swStir.el.hidden = v !== 'liquid'; lagLab.textContent = v === 'solid' ? 'Lagging (insulation)' : 'Insulated cup with lid'; reset(); } });
  const bs = el('select', { class: 'sel', id: 'sh-b', 'aria-label': 'block material' }, Object.entries(BLOCKS).map(([k, b]) => el('option', { value: k }, `${b[0]} block (1.00 kg)`))); bs.addEventListener('change', () => { blk = bs.value; reset(); }); g.append(bs);
  const ls = el('select', { class: 'sel', id: 'sh-l', 'aria-label': 'liquid', hidden: true }, Object.entries(LIQUIDS).map(([k, b]) => el('option', { value: k }, `${b[0]} (0.40 kg)`))); ls.addEventListener('change', () => { liq = ls.value; reset(); }); g.append(ls);
  Slider(g, { id: 'sh-v', label: 'Supply p.d. <i>V</i>', min: 6, max: 12, step: 0.5, value: Vs, unit: 'V', fmt: v => fix(v, 1), oninput: v => { Vs = v; } });
  Slider(g, { id: 'sh-t', label: 'Heating time', min: 300, max: 700, step: 50, value: tOff, unit: 's', fmt: v => fix(v, 0), oninput: v => { tOff = v; } });
  const swLag = Switch(g, { id: 'sh-lag', label: 'Lagging (insulation)', value: lag, onchange: v => lag = v }); const lagLab = swLag.el.querySelector('span');
  const swOil = Switch(g, { id: 'sh-oil', label: 'Oil in thermometer hole', value: oil, onchange: v => oil = v });
  const swStir = Switch(g, { id: 'sh-stir', label: 'Stir the liquid', value: stir, onchange: v => stir = v }); swStir.el.hidden = true;
  Switch(g, { id: 'sh-cool', label: 'Start 5 °C below room temp', value: cool, onchange: v => { cool = v; reset(); } });
  const b = Btns(g); startB = Btn(b, '▶ Start heater', () => { if (t >= 900) { reset(); return; } if (!ran) { ran = true; on = t < tOff; startB.textContent = '❚❚ Running…'; } }, 'pri'); Btn(b, 'Reset', reset);
  Slider(g, { id: 'sh-s', label: 'Time acceleration', min: 5, max: 60, step: 5, value: speed, fmt: v => '×' + v, oninput: v => speed = v });
  const ro = Readout(Group(P.side, 'Results'), [['E', 'Energy <i>VIt</i>'], ['dt', 'Δθ (start → max)'], ['c1', '<i>c</i> = <i>VIt</i>/(<i>m</i>Δθ)', 'hl'], ['c2', '<i>c</i> from gradient'], ['tr', 'Accepted value'], ['er', 'Error (Δθ method)']]);
  Note(P.side, 'The circuit is the same for solids and liquids: ammeter <b>in series</b> with the heater, voltmeter <b>in parallel</b> across it, so power = <i>VI</i>. Turn off the lagging (or the lid) and heat escapes: Δθ is too small, so <i>c</i> comes out too <b>big</b>. For a liquid, stop stirring and the thermometer reads the cooler bottom layer.');
  EqCard(P.below, 'Specific heat capacity (4.2.8–4.2.9)', [['Q = mc\\Delta\\theta', 'c in J kg⁻¹ K⁻¹'], ['Q = VIt', 'electrical energy'], ['c = \\frac{VIt}{m\\Delta\\theta}', ''], ['c = \\frac{VI}{m \\times \\text{gradient}}', 'gradient = Δθ/Δt']]);
  Card(P.below, 'Method: metal block', list(['Measure the mass of the block on a balance. Put the immersion heater and thermometer in the two holes, with a drop of oil in the thermometer hole for good thermal contact.', 'Connect the heater to a d.c. supply with an ammeter in series and a voltmeter in parallel across the heater. Record V and I (keep them constant).', 'Record the starting temperature, switch on and start the stopwatch. Switch off after time t and record the <b>maximum</b> temperature reached.', 'c = VIt/(mΔθ), or plot θ against t: c = VI/(m × gradient).'], true));
  Card(P.below, 'Method: liquid', list(['Measure the mass of an empty insulated cup (or calorimeter), add the liquid and measure again: the difference is the mass of liquid.', 'Fully immerse the heater so no energy goes straight to the air; fit a lid with holes for the heater, thermometer and stirrer.', 'Same circuit as for the block. <b>Stir continuously</b> so the liquid is at a uniform temperature.', 'Record θ every 30 s while heating; find Δθ or the gradient as before.', 'If a metal calorimeter is used, include its energy too: VIt = (m_l c_l + m_cal c_cal)Δθ.', 'Extra error for liquids: evaporation from the surface (use a lid, keep Δθ modest).'], true));
  Card(P.below, 'Errors and improvements', list(['<b>Main error: energy lost to the surroundings</b>, so Δθ is too small and c too large. Insulate (lagging, lid) and start about as far below room temperature as you finish above it.', 'Some energy heats the heater, thermometer and container themselves.', 'The thermometer lags behind the block: use the highest reading after switching off.', 'Use the gradient of the straight part of the θ–t graph to reduce the effect of the start-up lag.']));
  Drill(P.below, { title: 'Specific heat capacity drill', cls: 'wide', gens: [
    () => { const m = +rand(0.2, 2).toFixed(2), cc = pick([900, 385, 4200, 450]), d = randi(5, 40); return { q: `How much energy is needed to raise <b>${m} kg</b> of a material (c = ${cc} J kg⁻¹ K⁻¹) by <b>${d} K</b>?`, a: m * cc * d, unit: 'J', tol: 0.01, steps: ['Q = mcΔθ', `= ${m} × ${cc} × ${d} = ${num(m * cc * d, 3)} J`] }; },
    () => { const V = pick([6, 9, 12]), I = +rand(1.5, 4.5).toFixed(1), t = randi(4, 12) * 60, m = 1, d = +rand(8, 30).toFixed(1); return { q: `A 1.00 kg block is heated by a heater at <b>${V} V, ${I} A</b> for <b>${t / 60} min</b>. Its temperature rises by <b>${d} K</b>. Find c.`, a: V * I * t / (m * d), unit: 'J kg⁻¹ K⁻¹', tol: 0.01, steps: [`E = VIt = ${V} × ${I} × ${t} = ${V * I * t} J`, `c = E/(mΔθ) = ${V * I * t}/(1.00 × ${d}) = ${fix(V * I * t / d, 0)} J kg⁻¹ K⁻¹`] }; },
    () => { const V = 12, I = +rand(2.5, 4.5).toFixed(2), t = randi(5, 15) * 60, m = +rand(0.2, 0.6).toFixed(2); const d = V * I * t / (m * 4200); return { q: `<b>${m} kg</b> of water in an insulated cup is heated by a <b>${V} V</b> heater drawing <b>${I} A</b> for <b>${t / 60} min</b>. Find the temperature rise (c = 4200 J kg⁻¹ K⁻¹).`, a: d, unit: 'K', tol: 0.01, steps: [`E = VIt = ${V} × ${I} × ${t} = ${fix(V * I * t, 0)} J`, `Δθ = E/(mc) = ${fix(V * I * t, 0)}/(${m} × 4200) = ${fix(d, 2)} K`] }; },
    () => { const ml = +rand(0.2, 0.5).toFixed(2), mc = +rand(0.1, 0.3).toFixed(2), d = +rand(5, 20).toFixed(1), E = Math.round((ml * 4200 + mc * 385) * d); return { q: `<b>${E} J</b> is supplied to <b>${ml} kg</b> of water in a <b>${mc} kg</b> copper calorimeter (c = 385 J kg⁻¹ K⁻¹), raising both by <b>${d} K</b>. Find the specific heat capacity of the water.`, a: (E / d - mc * 385) / ml, unit: 'J kg⁻¹ K⁻¹', tol: 0.02, steps: ['E = (m_w c_w + m_cal c_cal)Δθ', `m_w c_w = E/Δθ − m_cal c_cal = ${fix(E / d, 1)} − ${fix(mc * 385, 1)} = ${fix(E / d - mc * 385, 1)} J K⁻¹`, `c_w = ${fix((E / d - mc * 385) / ml, 0)} J kg⁻¹ K⁻¹`] }; },
    () => { const P = randi(20, 60), m = +rand(0.5, 2).toFixed(1), g = +rand(0.01, 0.06).toFixed(3); return { q: `A θ–t graph for a <b>${m} kg</b> block heated at <b>${P} W</b> has gradient <b>${g} K s⁻¹</b>. Find c.`, a: P / (m * g), unit: 'J kg⁻¹ K⁻¹', tol: 0.01, steps: ['P = mc × (Δθ/Δt)', `c = P/(m × gradient) = ${P}/(${m} × ${g}) = ${fix(P / (m * g), 0)} J kg⁻¹ K⁻¹`] }; },
    () => ({ q: 'In the electrical method for a liquid, why must the liquid be stirred?', options: ['So the whole liquid is at the same temperature as the thermometer reading', 'To increase the power of the heater', 'To reduce the current', 'To stop the liquid evaporating'], correct: 0, why: 'Hot liquid rises; without stirring the thermometer reads an unrepresentative temperature.' }),
  ] });
}

/* ---------- Lab E: ideal gas solver ---------- */
function mountSolver(P, L) {
  const box = el('div', { style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--ps-paper-2)' } }); P.stageBox.append(box);
  const U = {
    p: [['Pa', 1], ['kPa', 1e3], ['MPa', 1e6], ['atm', 101325]],
    V: [['m³', 1], ['dm³ (litre)', 1e-3], ['cm³', 1e-6], ['mm³', 1e-9]],
    T: [['K', 'K'], ['°C', 'C']],
    n: [['mol', 1], ['molecules (N)', 1 / NA]],
  };
  const vals = { p: '101', V: '24', n: '1', T: '20' }, units = { p: 'kPa', V: 'dm³ (litre)', n: 'mol', T: '°C' }; let unknown = 'V';
  const fields = {};
  const grid = el('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px' } });
  const names = { p: 'Pressure p', V: 'Volume V', n: 'Amount n / N', T: 'Temperature T' };
  for (const k of ['p', 'V', 'n', 'T']) {
    const inp = el('input', { class: 'num', id: 'ig-' + k, value: vals[k], inputmode: 'decimal', 'aria-label': names[k] });
    const us = el('select', { class: 'sel', id: 'ig-u' + k, 'aria-label': names[k] + ' unit' }, U[k].map(([u]) => el('option', { value: u }, u))); us.value = units[k];
    const rb = el('input', { type: 'radio', name: 'ig-unk', id: 'ig-r' + k, value: k }); rb.checked = k === unknown;
    const wrap = el('div', { class: 'ctl', style: { border: '1px solid var(--ps-line)', borderRadius: '5px', padding: '10px' } }, el('label', { class: 'sw', for: 'ig-r' + k, style: { justifyContent: 'flex-start', gap: '8px' } }, rb, el('b', {}, names[k]), el('span', { class: 'muted', style: { fontSize: '12px' } }, '(solve for)')), el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' } }, inp, us));
    fields[k] = { inp, us, rb, wrap }; grid.append(wrap);
    inp.addEventListener('input', solve); us.addEventListener('change', solve); rb.addEventListener('change', () => { unknown = k; solve(); });
  }
  const out = el('div', { style: { fontSize: '15px', lineHeight: '1.9' } });
  box.append(el('div', { class: 'eyebrow' }, 'Ideal gas equation solver · converts every unit to SI and shows the working'), grid, out);
  function toSI(k) { const v = parseNum(fields[k].inp.value), u = fields[k].us.value; if (k === 'T') return u === '°C' ? v + 273.15 : v; const f = U[k].find(x => x[0] === u)[1]; return v * f; }
  function fromSI(k, v) { const u = fields[k].us.value; if (k === 'T') return u === '°C' ? v - 273.15 : v; return v / U[k].find(x => x[0] === u)[1]; }
  function solve() {
    for (const k in fields) { fields[k].inp.disabled = k === unknown; fields[k].wrap.style.borderColor = k === unknown ? 'var(--ps-blue)' : 'var(--ps-line)'; }
    const si = {}, lines = []; for (const k of ['p', 'V', 'n', 'T']) if (k !== unknown) { si[k] = toSI(k); if (!isFinite(si[k])) { out.innerHTML = '<span class="muted">Fill in the three known values.</span>'; return; }
      const u = fields[k].us.value, raw = fields[k].inp.value.trim();
      lines.push(k === 'T' ? (u === '°C' ? `${tex('T')} = ${raw} + 273 = <b>${fix(si.T, 2)} K</b> <span class="muted">(always kelvin)</span>` : `${tex('T')} = ${raw} K`) : k === 'n' && u !== 'mol' ? `${tex('n = \\frac{N}{N_A}')} = ${raw} / 6.02×10²³ = <b>${sci(si.n, 3)} mol</b>` : `${tex(k)} = ${raw} ${u} = <b>${sci(si[k], 3)} ${k === 'p' ? 'Pa' : k === 'V' ? 'm³' : 'mol'}</b>`); }
    let res;
    if (unknown === 'p') res = si.n * R * si.T / si.V; if (unknown === 'V') res = si.n * R * si.T / si.p; if (unknown === 'n') res = si.p * si.V / (R * si.T); if (unknown === 'T') res = si.p * si.V / (si.n * R);
    const rearr = { p: 'p = \\frac{nRT}{V}', V: 'V = \\frac{nRT}{p}', n: 'n = \\frac{pV}{RT}', T: 'T = \\frac{pV}{nR}' }[unknown];
    const siU = { p: 'Pa', V: 'm³', n: 'mol', T: 'K' }[unknown];
    fields[unknown].inp.value = num(fromSI(unknown, res), 4).replace(' × 10', 'e').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/, m => m.split('').map(ch => ({ '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' })[ch]).join(''));
    const N = unknown === 'n' ? res * NA : si.n * NA;
    out.innerHTML = `<div class="eyebrow" style="margin-bottom:4px">Working</div>${lines.join('<br>')}<br>${tex(rearr)} = <b style="color:var(--ps-blue);font-size:17px">${sci(res, 3)} ${siU}</b>${unknown !== 'T' && unknown !== 'n' ? '' : ''}<br><span class="muted">Number of molecules N = nN<sub>A</sub> = ${sci(N, 3)} · check with pV = NkT: ${sci((unknown === 'p' ? res : si.p) * (unknown === 'V' ? res : si.V) / (kB * (unknown === 'T' ? res : si.T)), 3)} molecules</span>`;
  }
  solve();
  const g = Group(P.side, 'Constants');
  g.append(el('div', { class: 'ro', html: `<dt>Molar gas constant R</dt><dd>8.31 J mol⁻¹ K⁻¹</dd><dt>Boltzmann constant k</dt><dd>1.38×10⁻²³ J K⁻¹</dd><dt>Avogadro N<sub>A</sub></dt><dd>6.02×10²³ mol⁻¹</dd><dt>R = N<sub>A</sub>k</dt><dd>${fix(NA * kB, 2)}</dd><dt>0 °C</dt><dd>273 K</dd>` }));
  Note(P.side, '<b>The #1 trap:</b> temperature in °C. The second: volume in cm³ or litres. Pick your units on the left and the solver shows every conversion.');
  const g2 = Group(P.side, 'Two states (fixed mass)');
  const two = el('div', { class: 'key', html: `For a fixed mass: ${tex('\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}')}. Units of p and V just have to match on both sides, but T must be in kelvin.` }); g2.append(two);
  Drill(P.below, { title: 'Ideal gas drill', cls: 'wide', gens: [
    () => { const n = +rand(0.1, 3).toFixed(2), Tc = randi(-20, 150), Vc = randi(2, 50); const p = n * R * (Tc + 273) / (Vc * 1e-3); return { q: `<b>${n} mol</b> of gas at <b>${Tc} °C</b> occupies <b>${Vc} dm³</b>. Find the pressure.`, a: p, unit: 'Pa', tol: 0.015, steps: [`T = ${Tc} + 273 = ${Tc + 273} K`, `V = ${Vc} × 10⁻³ m³`, `p = nRT/V = ${n} × 8.31 × ${Tc + 273} / ${Vc}×10⁻³ = ${sci(p, 3)} Pa`] }; },
    () => { const p = randi(90, 300) * 1e3, V = randi(100, 900), T = randi(270, 400); const N = p * V * 1e-6 / (kB * T); return { q: `A gas at <b>${p / 1000} kPa</b> and <b>${T} K</b> occupies <b>${V} cm³</b>. How many molecules are there?`, a: N, unit: '', tol: 0.015, steps: [`V = ${V} × 10⁻⁶ m³`, `N = pV/kT = ${p} × ${V}×10⁻⁶ / (1.38×10⁻²³ × ${T})`, `N = ${sci(N, 3)}`] }; },
    () => { const p1 = randi(100, 200), T1 = randi(280, 320), T2 = randi(330, 500); return { q: `A sealed rigid container of gas is at <b>${p1} kPa</b> and <b>${T1 - 273} °C</b>. It is heated to <b>${T2 - 273} °C</b>. Find the new pressure in kPa.`, a: p1 * T2 / T1, unit: 'kPa', tol: 0.01, steps: ['Constant V: p/T = constant (T in kelvin!)', `T₁ = ${T1} K, T₂ = ${T2} K`, `p₂ = ${p1} × ${T2}/${T1} = ${fix(p1 * T2 / T1, 1)} kPa`] }; },
    () => { const p1 = randi(100, 200), V1 = randi(200, 600), V2 = randi(50, 180); return { q: `Air at <b>${p1} kPa</b> is compressed slowly (constant temperature) from <b>${V1} cm³</b> to <b>${V2} cm³</b>. Find the new pressure.`, a: p1 * V1 / V2, unit: 'kPa', tol: 0.01, steps: ['Boyle’s law: p₁V₁ = p₂V₂', `p₂ = ${p1} × ${V1}/${V2} = ${fix(p1 * V1 / V2, 1)} kPa`] }; },
  ] });
}

topic({
  id: 'thermal', code: '4.2', unit: 'A2 1', title: 'Thermal Physics', short: 'Thermal',
  blurb: 'From pistons to molecules: gas laws measured from real particle collisions, the kinetic theory derivation step by step, internal energy, and the electrical SHC practical.',
  outcomes: [
    ['4.2.1', 'describe simple experiments on the behaviour of gases to show that pV = constant (fixed mass, constant T), p/T = constant (constant V) and V/T = constant (constant p), leading to pV/T = constant', 'gas'],
    ['4.2.2', 'recall and use the ideal gas equation pV = nRT', 'solver'],
    ['4.2.3', 'recall and use the ideal gas equation in the form pV = NkT', 'solver'],
    ['4.2.4', 'demonstrate an understanding of the concept of internal energy and the random distribution of potential and kinetic energy among molecules', 'internal'],
    ['4.2.5', 'use the equation pV = ⅓Nm⟨c²⟩', 'kinetic'],
    ['4.2.6', 'use the equation for average molecular kinetic energy, ½m⟨c²⟩ = 3/2 kT', 'kinetic'],
    ['4.2.7', 'demonstrate an understanding of the concept of absolute zero of temperature', 'gas'],
    ['4.2.8', 'perform and describe an electrical method for determining specific heat capacity', 'shc'],
    ['4.2.9', 'use the equation Q = mcΔθ', 'shc'],
  ],
  labs: [
    { id: 'gas', title: 'Gas laws piston', hint: 'pressure from collisions', spec: ['4.2.1', '4.2.7'], mount: mountGas },
    { id: 'kinetic', title: 'Kinetic theory', hint: 'derivation + speeds', spec: ['4.2.5', '4.2.6'], mount: mountKinetic },
    { id: 'internal', title: 'Internal energy', hint: 'KE vs PE', spec: ['4.2.4'], mount: mountInternal },
    { id: 'shc', title: 'Specific heat capacity', hint: 'electrical method', spec: ['4.2.8', '4.2.9'], mount: mountSHC },
    { id: 'solver', title: 'Ideal gas solver', hint: 'unit-proof working', spec: ['4.2.2', '4.2.3'], mount: mountSolver },
  ],
  equations: [['pV = nRT', ''], ['pV = NkT', ''], ['pV = \\frac{1}{3}Nm\\langle c^2\\rangle', ''], ['\\frac{1}{2}m\\langle c^2\\rangle = \\frac{3}{2}kT', ''], ['Q = mc\\Delta\\theta', ''], ['T/\\text{K} = \\theta/^\\circ\\text{C} + 273', '']],
  traps: ['Temperature <b>must</b> be in kelvin in every gas equation.', '⟨c²⟩ is the mean of the squares, not the square of the mean speed. c<sub>rms</sub> = √⟨c²⟩.', '<i>n</i> (moles, with R) vs <i>N</i> (molecules, with k). Don’t mix them.', 'm in ½m⟨c²⟩ is the mass of <b>one molecule</b>: molar mass ÷ N<sub>A</sub>, in kg.', 'SHC: use the <b>maximum</b> temperature after switch-off (thermometer lag).', 'Heat loss makes the measured c <b>too big</b>. Explain why, not just “heat loss”.'],
});
})();

/* ================= 4.3 Uniform circular motion ================= */
(() => {
const G = 9.81, GRAV = 6.67e-11, ME = 5.97e24, RE = 6.37e6;

/* ---------- Lab A: angular velocity ---------- */
function mountAngular(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.7, minH: 340, maxH: 520, mobileAspect: 0.95 });
  let w = 2.0, r1 = 0.55, r2 = 1.0, th = 0, run = true, showRad = true, drag = null;
  const disc = () => { const R = Math.min(S.w * 0.3, S.h * 0.42); return { cx: S.w * (S.w > 620 ? 0.3 : 0.5), cy: S.h * 0.48, R }; };
  Pointer(S, { hit: (x, y) => { const d = disc(); const p1 = hyp(x - (d.cx + d.R * r1 * Math.cos(th)), y - (d.cy - d.R * r1 * Math.sin(th))); return p1 < 24 ? 'r1' : null; },
    down: t => drag = t, up: () => drag = null,
    move: (t, x, y) => { const d = disc(); r1 = clamp(hyp(x - d.cx, y - d.cy) / d.R, 0.15, 0.95); sr.set(r1); } });
  L.loop(dt => {
    if (run) th += w * dt;
    const c = S.begin(), C = Theme.c, d = disc(), W = S.w;
    // disc
    c.beginPath(); c.arc(d.cx, d.cy, d.R, 0, TAU); c.fillStyle = alpha(C.ink2, .06); c.fill(); c.strokeStyle = C.line2; c.lineWidth = 1.5; c.stroke();
    for (let a = 0; a < TAU; a += Math.PI / 6) line(c, [[d.cx + d.R * 0.94 * Math.cos(a), d.cy - d.R * 0.94 * Math.sin(a)], [d.cx + d.R * Math.cos(a), d.cy - d.R * Math.sin(a)]], { color: C.line2, width: 1 });
    dot(c, d.cx, d.cy, 4, C.ink);
    // swept angle arc
    const swept = th % TAU;
    c.beginPath(); c.moveTo(d.cx, d.cy); c.arc(d.cx, d.cy, d.R * 0.32, 0, -swept, true); c.closePath(); c.fillStyle = alpha(C.orange, .18); c.fill();
    rich(c, '*θ*', d.cx + d.R * 0.42 * Math.cos(-swept / 2), d.cy + d.R * 0.42 * Math.sin(-swept / 2), { align: 'center', color: C.orange, size: 15 });
    line(c, [[d.cx, d.cy], [d.cx + d.R, d.cy]], { color: alpha(C.muted, .6), width: 1, dash: [4, 4] });
    // one radian arc
    if (showRad) {
      c.beginPath(); c.arc(d.cx, d.cy, d.R * r2, -th, -th + 1, false);
      c.strokeStyle = C.green; c.lineWidth = 4; c.stroke();
      const mid = -th + 0.5; rich(c, `arc = *r* ⇒ 1 rad`, d.cx + d.R * r2 * 1.12 * Math.cos(mid), d.cy + d.R * r2 * 1.12 * Math.sin(mid), { align: 'center', color: C.green, size: 12, bg: alpha(C.paper2, .85) });
    }
    // two points
    for (const [rr, col, lab] of [[r1, C.blue, 'P'], [r2, C.red, 'Q']]) {
      const x = d.cx + d.R * rr * Math.cos(th), y = d.cy - d.R * rr * Math.sin(th);
      line(c, [[d.cx, d.cy], [x, y]], { color: alpha(col, .5), width: 1.5 });
      const v = w * rr, vs = d.R * 0.42;
      arrow(c, x, y, x - Math.sin(th) * v * vs, y - Math.cos(th) * v * vs, { color: col, width: 2.6 });
      dot(c, x, y, 6, col, C.paper2);
      rich(c, `*v* = ${fix(v * 1.0, 2)} m s⁻¹`, clamp(x - Math.sin(th) * v * vs, 52, S.w - 52), y - Math.cos(th) * v * vs - 12, { align: 'center', color: col, size: 12, bg: alpha(C.paper2, .8) });
      rich(c, lab, (d.cx + x) / 2, (d.cy + y) / 2 - 10, { align: 'center', color: col, size: 12.5, w: 700 });
    }
    // side readout panel
    const px = W > 620 ? W * 0.62 : 10, py = W > 620 ? S.h * 0.18 : S.h - 66;
    if (W > 620) {
      const rows = [['angular velocity *ω*', `${fix(w, 2)} rad s⁻¹`], ['period *T* = 2π/*ω*', `${fix(TAU / w, 2)} s`], ['frequency *f* = 1/*T*', `${fix(w / TAU, 2)} Hz`], ['angle swept *θ* = *ωt*', `${fix(th, 1)} rad = ${fix(th / DEG, 0)}°`], ['*v* at P = *r₁ω*', `${fix(w * r1, 2)} m s⁻¹`], ['*v* at Q = *r₂ω*', `${fix(w * r2, 2)} m s⁻¹`]];
      rows.forEach(([k, v], i) => { rich(c, k, px, py + i * 26, { size: 12.5, color: C.ink2 }); rich(c, v, W - 16, py + i * 26, { size: 13, color: C.ink, align: 'right', mono: true, w: 600 }); });
      rich(c, 'Same *ω*, different *v*', px, py + 6 * 26 + 10, { size: 11.5, color: C.muted });
    }
    ro.set('w', `${fix(w, 2)} rad s⁻¹`); ro.set('T', `${fix(TAU / w, 3)} s`); ro.set('f', `${fix(w / TAU, 3)} Hz`); ro.set('rpm', `${fix(w * 60 / TAU, 1)} rpm`);
    ro.set('v1', `${fix(w * r1, 2)} m s⁻¹`); ro.set('v2', `${fix(w * r2, 2)} m s⁻¹`);
  }, [S]);
  const g = Group(P.side, 'Turntable');
  Slider(g, { id: 'cm-w', label: 'Angular velocity <i>ω</i>', min: 0.3, max: 8, step: 0.1, value: w, unit: 'rad s⁻¹', fmt: v => fix(v, 1), oninput: v => w = v });
  const sr = Slider(g, { id: 'cm-r1', label: 'Radius of P', min: 0.15, max: 0.95, step: 0.01, value: r1, unit: 'm', fmt: v => fix(v, 2), oninput: v => r1 = v });
  Note(g, 'Q sits on the rim at <b>r₂ = 1.00 m</b>. Drag P in or out to compare.');
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Spin'; }, 'pri'); Btn(b, 'Reset angle', () => th = 0);
  Switch(g, { label: 'Show 1 radian', value: showRad, onchange: v => showRad = v });
  const ro = Readout(Group(P.side, 'Readout'), [['w', '<i>ω</i>', 'hl'], ['T', 'Period <i>T</i>'], ['f', 'Frequency <i>f</i>'], ['rpm', 'In rev min⁻¹'], ['v1', '<i>v</i> at P'], ['v2', '<i>v</i> at Q']]);
  EqCard(P.below, 'Angular velocity (4.3.1–4.3.2)', [['\\omega = \\frac{\\theta}{t}', 'rad s⁻¹'], ['\\omega = \\frac{2\\pi}{T} = 2\\pi f', 'one turn = 2π rad'], ['v = r\\omega', 'v is along the tangent'], ['\\theta = \\frac{\\text{arc}}{\\text{radius}}', '1 rad ⇒ arc = radius']]);
  Card(P.below, 'What angular velocity means', list(['<b>Angular velocity ω</b> is the angle swept out per unit time, in rad s⁻¹. Every point on a rigid rotating body has the <b>same ω</b>.', 'Linear speed <i>v</i> = <i>rω</i>, so points further from the axis move faster: the rim of a disc outruns the centre.', 'The velocity is always along the <b>tangent</b>, so its direction is constantly changing, even at constant speed. Changing velocity means acceleration.', 'Convert rev min⁻¹ → rad s⁻¹: × 2π ÷ 60.']));
  Drill(P.below, { title: 'Angular velocity drill', gens: [
    () => { const rpm = randi(20, 3000); return { q: `A wheel spins at <b>${rpm} rev min⁻¹</b>. Find its angular velocity.`, a: rpm * TAU / 60, unit: 'rad s⁻¹', tol: 0.01, steps: [`Each revolution is 2π rad, and there are 60 s in a minute`, `ω = ${rpm} × 2π / 60 = ${fix(rpm * TAU / 60, 1)} rad s⁻¹`] }; },
    () => { const r = +rand(0.05, 6).toFixed(2), ww = +rand(0.5, 60).toFixed(1); return { q: `A point <b>${r} m</b> from the axis rotates at <b>${ww} rad s⁻¹</b>. Find its linear speed.`, a: r * ww, unit: 'm s⁻¹', tol: 0.01, steps: ['v = rω', `= ${r} × ${ww} = ${fix(r * ww, 2)} m s⁻¹`] }; },
    () => { const T = +rand(0.2, 24).toFixed(1); return { q: `A body completes one circle every <b>${T} s</b>. Find its angular velocity.`, a: TAU / T, unit: 'rad s⁻¹', tol: 0.01, steps: ['ω = 2π/T', `= 2π/${T} = ${fix(TAU / T, 3)} rad s⁻¹`] }; },
  ] });
}

/* ---------- Lab B: centripetal force ---------- */
function mountCentripetal(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.65, minH: 360, maxH: 540, mobileAspect: 0.95 });
  let mode = 'string', m = 0.5, v = 4, r = 1.2, mu = 0.7, th = 0, cut = false, free = null, alt = 300, skid = false, trail = [];
  const cen = () => ({ cx: S.w * (S.w > 620 ? 0.42 : 0.5), cy: S.h * 0.5, R: Math.min(S.w * 0.3, S.h * 0.36) });
  const need = () => m * v * v / r;
  const maxFric = () => mu * m * G;
  L.loop(dt => {
    const c = S.begin(), C = Theme.c, d = cen(), sc = d.R / r;
    if (mode === 'satellite') { const rr = RE + alt * 1e3; v = Math.sqrt(GRAV * ME / rr); }
    skid = mode === 'car' && need() > maxFric();
    if (!cut && !free) { th += (v / r) * dt; trail = []; }
    const px = d.cx + d.R * Math.cos(th), py = d.cy - d.R * Math.sin(th);
    if (cut && !free) { free = { x: px, y: py, vx: -Math.sin(th) * v * sc, vy: -Math.cos(th) * v * sc }; }
    if (free) { free.x += free.vx * dt; free.y += free.vy * dt; trail.push([free.x, free.y]); if (trail.length > 200) trail.shift(); if (free.x < -50 || free.x > S.w + 50 || free.y < -50 || free.y > S.h + 50) { free = null; cut = false; trail = []; cutB.textContent = mode === 'string' ? '✂ Cut the string' : '✂ Remove the force'; } }
    // path
    c.beginPath(); c.arc(d.cx, d.cy, d.R, 0, TAU); c.strokeStyle = alpha(C.muted, .5); c.lineWidth = 1.5; c.setLineDash([5, 5]); c.stroke(); c.setLineDash([]);
    // scenery
    if (mode === 'car') { c.beginPath(); c.arc(d.cx, d.cy, d.R, 0, TAU); c.strokeStyle = alpha(C.ink2, .18); c.lineWidth = 34; c.stroke(); rich(c, 'roundabout', d.cx, d.cy, { align: 'center', size: 12, color: C.muted }); }
    if (mode === 'satellite') { c.beginPath(); c.arc(d.cx, d.cy, d.R * 0.42, 0, TAU); c.fillStyle = alpha(C.blue, .35); c.fill(); c.strokeStyle = C.blue; c.lineWidth = 1.5; c.stroke(); rich(c, 'Earth', d.cx, d.cy, { align: 'center', size: 12, color: C.paper2, w: 700 }); }
    if (mode === 'string') { dot(c, d.cx, d.cy, 6, C.ink); rich(c, 'hand', d.cx, d.cy + 18, { align: 'center', size: 11, color: C.muted }); }
    const ox = free ? free.x : px, oy = free ? free.y : py;
    if (trail.length > 1) line(c, trail, { color: alpha(C.red, .5), width: 2, dash: [4, 4] });
    if (!free) {
      if (mode === 'string') line(c, [[d.cx, d.cy], [ox, oy]], { color: C.ink, width: 2 });
      const Fs = Math.min(d.R * 0.75, need() * (mode === 'satellite' ? 4e-4 : 6));
      arrow(c, ox, oy, ox + (d.cx - ox) / d.R * Fs, oy + (d.cy - oy) / d.R * Fs, { color: C.red, width: 3 });
      const lab = mode === 'string' ? 'tension' : mode === 'car' ? 'friction' : 'gravity';
      rich(c, `*F* = ${mode === 'satellite' ? sci(need(), 2) : fix(need(), 1)} N (${lab})`, ox + (d.cx - ox) / d.R * Fs * 1.1, oy + (d.cy - oy) / d.R * Fs * 1.1 + 14, { align: 'center', color: C.red, size: 12, bg: alpha(C.paper2, .85) });
    }
    const vs = d.R * 0.1, vv = free ? hyp(free.vx, free.vy) / sc : v;
    const vx = free ? free.vx / sc : -Math.sin(th) * v, vy = free ? free.vy / sc : -Math.cos(th) * v;
    arrow(c, ox, oy, ox + vx * vs, oy + vy * vs, { color: C.blue, width: 3 });
    rich(c, `*v* = ${fix(vv, mode === 'satellite' ? 0 : 1)} m s⁻¹`, ox + vx * vs, oy + vy * vs - 12, { align: 'center', color: C.blue, size: 12, bg: alpha(C.paper2, .85) });
    // object
    if (mode === 'car') { c.save(); c.translate(ox, oy); c.rotate(-th - Math.PI / 2); c.fillStyle = skid ? C.red : C.violet; rrect(c, -9, -16, 18, 32, 4); c.fill(); c.restore(); }
    else dot(c, ox, oy, mode === 'satellite' ? 7 : 10, mode === 'satellite' ? C.violet : C.ink, C.paper2);
    if (skid && !free) rich(c, '⚠ required force exceeds maximum friction — the car skids outwards', d.cx, S.h - 16, { align: 'center', color: C.red, size: 13, w: 600 });
    if (free) rich(c, 'No centripetal force ⇒ straight line along the tangent (Newton’s 1st law)', d.cx, S.h - 16, { align: 'center', color: C.ink2, size: 13, w: 600 });
    ro.set('F', `${mode === 'satellite' ? sci(need(), 3) : fix(need(), 2)} N`); ro.set('a', `${fix(v * v / r, 2)} m s⁻²`); ro.set('w', `${fix(v / r, 3)} rad s⁻¹`); ro.set('T', `${fix(TAU * r / v, mode === 'satellite' ? 0 : 2)} s`);
    ro.set('alt', mode === 'car' ? `${fix(maxFric(), 1)} N` : mode === 'satellite' ? `${fix(TAU * r / v / 60, 1)} min` : `${fix(m * G, 2)} N`);
  }, [S]);
  const g0 = Group(P.side, 'What provides the force?');
  Seg(g0, { wrap: true, options: [['string', 'String'], ['car', 'Car'], ['satellite', 'Satellite']], value: mode, onchange: x => { mode = x; cut = false; free = null; trail = []; setMode(); } });
  const gS = Group(P.side, 'Values');
  const sM = Slider(gS, { id: 'cf-m', label: 'Mass <i>m</i>', min: 0.1, max: 3, step: 0.1, value: m, unit: 'kg', fmt: x => fix(x, 1), oninput: x => m = x });
  const sV = Slider(gS, { id: 'cf-v', label: 'Speed <i>v</i>', min: 1, max: 15, step: 0.5, value: v, unit: 'm s⁻¹', fmt: x => fix(x, 1), oninput: x => v = x });
  const sR = Slider(gS, { id: 'cf-r', label: 'Radius <i>r</i>', min: 0.4, max: 4, step: 0.1, value: r, unit: 'm', fmt: x => fix(x, 1), oninput: x => r = x });
  const sMu = Slider(gS, { id: 'cf-mu', label: 'Friction coefficient <i>μ</i>', min: 0.1, max: 1.2, step: 0.05, value: mu, fmt: x => fix(x, 2), oninput: x => mu = x });
  const sA = Slider(gS, { id: 'cf-alt', label: 'Orbit height', min: 200, max: 36000, step: 100, value: alt, unit: 'km', fmt: x => fix(x, 0), oninput: x => alt = x });
  const b = Btns(gS); const cutB = Btn(b, '✂ Cut the string', () => { if (free) { free = null; cut = false; trail = []; } else cut = true; }, 'pri');
  function setMode() {
    sMu.el.hidden = mode !== 'car'; sA.el.hidden = mode !== 'satellite'; sV.el.hidden = mode === 'satellite'; sR.el.hidden = mode === 'satellite';
    sM.el.hidden = false; cutB.textContent = mode === 'string' ? '✂ Cut the string' : mode === 'car' ? '✂ Remove friction (ice)' : '✂ Remove gravity';
    if (mode === 'car') { m = 1000; sM.inp.max = 2000; sM.inp.min = 500; sM.inp.step = 50; sM.set(1000); sV.inp.max = 25; v = 10; sV.set(10); r = 20; sR.inp.max = 60; sR.inp.min = 5; sR.set(20); }
    else if (mode === 'string') { sM.inp.min = 0.1; sM.inp.max = 3; sM.inp.step = 0.1; m = 0.5; sM.set(0.5); sV.inp.max = 15; v = 4; sV.set(4); sR.inp.min = 0.4; sR.inp.max = 4; r = 1.2; sR.set(1.2); }
    else { m = 1000; r = RE + alt * 1e3; }
    ro.el.querySelectorAll('dt')[4].innerHTML = mode === 'car' ? 'Maximum friction <i>μmg</i>' : mode === 'satellite' ? 'Orbital period' : 'Weight <i>mg</i>';
  }
  const ro = Readout(Group(P.side, 'Centripetal quantities'), [['F', 'Required force <i>mv²/r</i>', 'hl'], ['a', 'Acceleration <i>v²/r</i>'], ['w', '<i>ω</i> = <i>v</i>/<i>r</i>'], ['T', 'Period'], ['alt', 'Weight <i>mg</i>']]);
  setMode();
  Note(P.side, 'Centripetal force is <b>not a new force</b>. It is the name for whatever resultant force points to the centre: tension, friction, gravity, or the normal force on a banked track.');
  EqCard(P.below, 'Circular motion at constant speed (4.3.3)', [['F = ma = \\frac{mv^2}{r}', ''], ['a = \\frac{v^2}{r} = r\\omega^2', 'always towards the centre'], ['F = mr\\omega^2', 'using v = rω'], ['v = r\\omega', '']]);
  Card(P.below, 'Exam points', list(['Speed is constant, but <b>velocity is not</b>: its direction changes, so there is an acceleration (towards the centre) and therefore a resultant force.', 'The centripetal force does <b>no work</b>: it is perpendicular to the velocity, so the kinetic energy stays constant.', 'Remove the force and the object carries on along the <b>tangent</b>, not outwards. There is no outward “centrifugal force” in your free-body diagram.', 'For a car cornering: <i>mv²/r</i> ≤ <i>μmg</i>. The mass cancels, so the maximum safe speed is √(<i>μgr</i>), independent of mass.']));
  Drill(P.below, { title: 'Centripetal force drill', cls: 'wide', gens: [
    () => { const mm = +rand(0.1, 5).toFixed(2), vv = +rand(2, 20).toFixed(1), rr = +rand(0.5, 10).toFixed(1); return { q: `A <b>${mm} kg</b> mass moves in a circle of radius <b>${rr} m</b> at <b>${vv} m s⁻¹</b>. Find the centripetal force.`, a: mm * vv * vv / rr, unit: 'N', tol: 0.01, steps: ['F = mv²/r', `= ${mm} × ${vv}² / ${rr} = ${fix(mm * vv * vv / rr, 1)} N`] }; },
    () => { const mm = randi(800, 1600), rr = randi(15, 60), muu = +rand(0.4, 0.9).toFixed(2); const vmax = Math.sqrt(muu * G * rr); return { q: `A <b>${mm} kg</b> car takes a bend of radius <b>${rr} m</b>. The maximum friction is <b>${muu}mg</b>. Find the maximum cornering speed.`, a: vmax, unit: 'm s⁻¹', tol: 0.01, steps: ['At the limit: mv²/r = μmg (mass cancels)', `v = √(μgr) = √(${muu} × 9.81 × ${rr}) = ${fix(vmax, 1)} m s⁻¹`] }; },
    () => { const mm = +rand(0.2, 2).toFixed(2), rr = +rand(0.3, 2).toFixed(1), ww = +rand(2, 20).toFixed(1); return { q: `A <b>${mm} kg</b> ball on a string of length <b>${rr} m</b> is whirled at <b>${ww} rad s⁻¹</b>. Find the tension.`, a: mm * rr * ww * ww, unit: 'N', tol: 0.01, steps: ['F = mrω²', `= ${mm} × ${rr} × ${ww}² = ${fix(mm * rr * ww * ww, 1)} N`] }; },
  ] });
}

topic({
  id: 'circular', code: '4.3', unit: 'A2 1', title: 'Uniform Circular Motion', short: 'Circular',
  blurb: 'Constant speed, changing velocity. Angular velocity, v = rω, and the force that keeps anything moving in a circle — cut it and watch what happens.',
  outcomes: [
    ['4.3.1', 'demonstrate an understanding of the concept of angular velocity', 'angular'],
    ['4.3.2', 'recall and use the equation v = rω', 'angular'],
    ['4.3.3', 'apply the relationship F = ma = mv²/r to motion in a circle at constant speed', 'centripetal'],
  ],
  labs: [
    { id: 'angular', title: 'Angular velocity', hint: 'same ω, different v', spec: ['4.3.1', '4.3.2'], mount: mountAngular },
    { id: 'centripetal', title: 'Centripetal force', hint: 'cut the string', spec: ['4.3.3'], mount: mountCentripetal },
  ],
  equations: [['\\omega = \\frac{2\\pi}{T} = 2\\pi f', ''], ['v = r\\omega', ''], ['a = \\frac{v^2}{r} = r\\omega^2', ''], ['F = \\frac{mv^2}{r} = mr\\omega^2', '']],
  traps: ['Angles in <b>radians</b>: 1 rev = 2π rad. Convert rev min⁻¹ with × 2π ÷ 60.', 'Constant speed still means accelerating, because the <b>direction</b> of velocity changes.', 'Centripetal force is provided by a real force; never add it as an extra arrow on top of tension or friction.', 'Cut the string and the object flies off along the <b>tangent</b>.', 'The centripetal force does no work, so the speed doesn’t change.'],
});
})();

/* ================= 4.4 Simple harmonic motion ================= */
(() => {
const G = 9.81;

/* ---------- Lab A: what makes it SHM ---------- */
function mountDefine(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.2, minH: 300, maxH: 420, mobileAspect: 1.15 });
  const S2 = L.stage(P.stageBox, { aspect: 2.6, minH: 230, maxH: 320, plain: true });
  let A = 0.08, f = 0.8, t = 0, run = true, kind = 'spring';
  const plot = new Plot(S2, { xlabel: 'displacement *x* / m', ylabel: 'acceleration *a* / m s⁻²' });
  L.loop(dt => {
    if (run) t += dt;
    const w = TAU * f, x = A * Math.cos(w * t), v = -A * w * Math.sin(w * t), a = -w * w * x;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, wide = W > 560;
    const ox = wide ? W * 0.22 : W * 0.26, cx = wide ? W * 0.63 : W * 0.7, cy = H * 0.5;
    const R = Math.min(wide ? W * 0.16 : W * 0.2, H * 0.36), sc = R / A;
    // oscillator
    const top = H * 0.12, eq = cy;
    line(c, [[ox - 60, eq], [ox + 60, eq]], { color: alpha(C.muted, .6), width: 1, dash: [4, 4] });
    rich(c, 'equilibrium', ox - 62, eq, { align: 'right', size: 11, color: C.muted });
    const my = eq - x * sc;
    if (kind === 'spring') {
      c.fillStyle = C.ink2; c.fillRect(ox - 34, top - 6, 68, 6);
      line(c, springPath(ox, top, my - 16, 11, 10), { color: C.ink, width: 1.6 });
      c.fillStyle = C.blue; rrect(c, ox - 18, my - 16, 36, 32, 3); c.fill();
    } else {
      const piv = { x: ox, y: top }, Lp = H * 0.62, thm = x / A * 0.35, bx = piv.x + Lp * Math.sin(thm), by = piv.y + Lp * Math.cos(thm);
      c.fillStyle = C.ink2; c.fillRect(piv.x - 30, piv.y - 6, 60, 6);
      line(c, [[piv.x, piv.y], [bx, by]], { color: C.ink, width: 1.6 });
      line(c, [[piv.x, piv.y], [piv.x, piv.y + Lp + 10]], { color: alpha(C.muted, .5), width: 1, dash: [4, 4] });
      dot(c, bx, by, 15, C.blue, C.paper2);
      c.save(); c.translate(bx - ox, by - my); c.restore();
    }
    const mx = kind === 'spring' ? ox : ox + (H * 0.62) * Math.sin(x / A * 0.35), myy = kind === 'spring' ? my : top + (H * 0.62) * Math.cos(x / A * 0.35);
    // v and a arrows
    const av = Math.min(70, Math.abs(v) * 90), aa = Math.min(70, Math.abs(a) * 18);
    if (Math.abs(v) > 1e-3) arrow(c, mx + 26, myy, mx + 26, myy - Math.sign(v) * av, { color: C.blue, width: 2.6 });
    if (Math.abs(a) > 1e-3) arrow(c, mx - 26, myy, mx - 26, myy - Math.sign(a) * aa, { color: C.red, width: 2.6 });
    rich(c, '*v*', mx + 34, myy - Math.sign(v || 1) * av - 8, { color: C.blue, size: 13 });
    rich(c, '*a*', mx - 34, myy - Math.sign(a || 1) * aa - 8, { color: C.red, size: 13, align: 'right' });
    // reference circle
    c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.strokeStyle = alpha(C.violet, .6); c.lineWidth = 1.4; c.setLineDash([4, 4]); c.stroke(); c.setLineDash([]);
    const ang = -w * t; const px = cx + R * Math.sin(ang + Math.PI / 2), py = cy - R * Math.cos(ang + Math.PI / 2);
    const rx = cx + R * Math.sin(w * t), ry = cy - R * Math.cos(w * t);
    dot(c, rx, ry, 6, C.violet);
    line(c, [[cx, cy], [rx, ry]], { color: alpha(C.violet, .7), width: 1.5 });
    line(c, [[rx, ry], [cx, ry]], { color: alpha(C.violet, .5), width: 1, dash: [3, 3] });
    line(c, [[cx, cy - R], [cx, cy + R]], { color: C.line2, width: 1 });
    dot(c, cx, ry, 5, C.blue);
    line(c, [[cx, ry], [mx + 22, myy]], { color: alpha(C.blue, .35), width: 1, dash: [3, 4] });
    rich(c, 'reference circle: *x* = *A* cos *ωt*', cx, cy + R + 20, { align: 'center', size: 11.5, color: C.violet });
    rich(c, `*x* = ${fix(x * 100, 1)} cm`, cx + R + 10, ry, { size: 12, color: C.blue, mono: false });
    // a–x graph
    S2.begin(); const am = A * w * w * 1.15;
    Object.assign(plot, { xmin: -A * 1.15, xmax: A * 1.15, ymin: -am, ymax: am }); plot.axes();
    plot.curve(xx => -w * w * xx, { color: C.red, width: 2.4 });
    plot.dots([[x, a]], { color: C.blue, r: 6, stroke: C.paper2 });
    plot.label(A * 0.75, -w * w * A * 0.75, `gradient = −*ω*² = ${fix(-w * w, 1)} s⁻²`, { dx: -6, dy: -14, align: 'right', color: C.red, size: 12.5, w: 600, bg: alpha(C.paper2, .85) });
    ro.set('w', `${fix(w, 2)} rad s⁻¹`); ro.set('T', `${fix(1 / f, 2)} s`); ro.set('x', `${fix(x * 100, 1)} cm`); ro.set('v', `${fix(v, 3)} m s⁻¹`); ro.set('a', `${fix(a, 2)} m s⁻²`);
    ro.set('vm', `${fix(A * w, 3)} m s⁻¹`); ro.set('am', `${fix(A * w * w, 2)} m s⁻²`);
  }, [S1, S2]);
  const g = Group(P.side, 'Oscillator');
  Seg(g, { options: [['spring', 'Loaded spring'], ['pendulum', 'Pendulum']], value: kind, onchange: v => kind = v });
  Slider(g, { id: 'sh-A', label: 'Amplitude <i>A</i>', min: 0.02, max: 0.12, step: 0.005, value: A, unit: 'm', fmt: v => fix(v, 3), oninput: v => A = v });
  Slider(g, { id: 'sh-f', label: 'Frequency <i>f</i>', min: 0.2, max: 2, step: 0.05, value: f, unit: 'Hz', fmt: v => fix(v, 2), oninput: v => f = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri'); Btn(b, 'Restart', () => t = 0);
  const ro = Readout(Group(P.side, 'Live'), [['w', '<i>ω</i> = 2π<i>f</i>', 'hl'], ['T', 'Period <i>T</i>'], ['x', 'Displacement <i>x</i>'], ['v', 'Velocity <i>v</i>'], ['a', 'Acceleration <i>a</i>'], ['vm', '<i>v</i><sub>max</sub> = <i>Aω</i>'], ['am', '<i>a</i><sub>max</sub> = <i>Aω²</i>']]);
  Note(P.side, 'Watch the <b style="color:var(--ps-red)">red acceleration arrow</b>: it always points back towards the equilibrium position, and it is biggest where the displacement is biggest. That is exactly what <i>a</i> = −<i>ω</i>²<i>x</i> says.');
  EqCard(P.below, 'Defining SHM (4.4.1–4.4.2)', [['a = -\\omega^2 x', 'the definition'], ['\\omega = 2\\pi f = \\frac{2\\pi}{T}', ''], ['x = A\\cos\\omega t', 'released from maximum displacement'], ['v_{max} = A\\omega', 'at the centre'], ['a_{max} = A\\omega^2', 'at the extremes']]);
  Card(P.below, 'The definition, in exam words', `<p>Simple harmonic motion is motion in which the <b>acceleration is proportional to the displacement</b> from a fixed point and is always <b>directed towards that point</b>.</p><p>The minus sign in ${tex('a = -\\omega^2 x')} carries the phrase “directed towards the equilibrium position”, so never drop it. The gradient of an acceleration–displacement graph is <b>−ω²</b>, which is how a graph question asks for the frequency.</p>`);
  Drill(P.below, { title: 'SHM calculation drill', gens: [
    () => { const A2 = +rand(0.02, 0.5).toFixed(3), f2 = +rand(0.5, 5).toFixed(2); const w = TAU * f2; return { q: `An object performs SHM with amplitude <b>${A2} m</b> at <b>${f2} Hz</b>. Find its maximum acceleration.`, a: A2 * w * w, unit: 'm s⁻²', tol: 0.015, steps: [`ω = 2πf = ${fix(w, 2)} rad s⁻¹`, `a_max = Aω² = ${A2} × ${fix(w, 2)}² = ${fix(A2 * w * w, 2)} m s⁻²`] }; },
    () => { const A2 = +rand(0.05, 0.4).toFixed(2), T = +rand(0.4, 4).toFixed(1); const w = TAU / T; return { q: `SHM has amplitude <b>${A2} m</b> and period <b>${T} s</b>. Find the maximum speed.`, a: A2 * w, unit: 'm s⁻¹', tol: 0.015, steps: [`ω = 2π/T = ${fix(w, 3)} rad s⁻¹`, `v_max = Aω = ${A2} × ${fix(w, 3)} = ${fix(A2 * w, 3)} m s⁻¹`] }; },
    () => { const A2 = +rand(0.05, 0.3).toFixed(2), f2 = +rand(0.5, 3).toFixed(1), tt = +rand(0.05, 1).toFixed(2); const w = TAU * f2, x = A2 * Math.cos(w * tt); return { q: `For ${tex('x = A\\cos\\omega t')} with <b>A = ${A2} m</b> and <b>f = ${f2} Hz</b>, find the displacement at <b>t = ${tt} s</b> (radians!).`, a: x, unit: 'm', tol: 0.02, abs: 0.002, steps: [`ω = 2π × ${f2} = ${fix(w, 3)} rad s⁻¹`, `x = ${A2} cos(${fix(w, 3)} × ${tt}) = ${fix(x, 4)} m`, 'Your calculator must be in <b>radians</b>.'] }; },
  ] });
}

/* ---------- Lab B: SHM graphs ---------- */
function mountGraphsSHM(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.25, minH: 460, maxH: 680, mobileAspect: 0.85 });
  let A = 0.1, T = 2, tc = 0.35, run = true, t = 0, drag = false;
  const P1 = new Plot(S, { ylabel: '*x* / m' }), P2 = new Plot(S, { ylabel: '*v* / m s⁻¹' }), P3 = new Plot(S, { ylabel: '*a* / m s⁻²', xlabel: 'time *t* / s' });
  const rect = i => { const h = S.h / 3; return { x: 0, y: i * h, w: S.w, h }; };
  Pointer(S, { scroll: true, hit: (x, y) => { P1.layout(); return x > P1.x0 - 20 && x < P1.x0 + P1.pw + 20 ? 'c' : null; }, down: () => { drag = true; run = false; pb.textContent = '▶ Play'; }, up: () => drag = false, move: (t2, x) => { P1.layout(); tc = clamp(P1.ix(x), 0, 2 * T); } });
  L.loop(dt => {
    if (run) { t += dt * 0.5; tc = (t % (2 * T)); }
    const w = TAU / T, c = S.begin(), C = Theme.c;
    const x = A * Math.cos(w * tc), v = -A * w * Math.sin(w * tc), a = -A * w * w * Math.cos(w * tc);
    const cfg = { xmin: 0, xmax: 2 * T, pad: { l: 58, r: 14, t: 18, b: 30 } };
    Object.assign(P1, cfg, { ymin: -A * 1.25, ymax: A * 1.25, rect: rect(0), title: 'displacement' });
    Object.assign(P2, cfg, { ymin: -A * w * 1.25, ymax: A * w * 1.25, rect: rect(1), title: 'velocity = gradient of *x*–*t*' });
    Object.assign(P3, cfg, { ymin: -A * w * w * 1.25, ymax: A * w * w * 1.25, rect: rect(2), title: 'acceleration = gradient of *v*–*t*', pad: { l: 58, r: 14, t: 18, b: 40 } });
    P1.axes(); P1.curve(tt => A * Math.cos(w * tt), { color: C.blue, width: 2.4, n: 400 });
    P2.axes(); P2.curve(tt => -A * w * Math.sin(w * tt), { color: C.green, width: 2.4, n: 400 });
    P3.axes(); P3.curve(tt => -A * w * w * Math.cos(w * tt), { color: C.red, width: 2.4, n: 400 });
    // tangent on x–t
    const dtn = T * 0.18; const x1 = tc - dtn, x2 = tc + dtn;
    P1.clip(cc => line(cc, [[P1.X(x1), P1.Y(x + v * (x1 - tc))], [P1.X(x2), P1.Y(x + v * (x2 - tc))]], { color: C.orange, width: 2, dash: [5, 4] }));
    P1.dots([[tc, x]], { color: C.blue, r: 6, stroke: C.paper2 });
    P1.label(tc, x, `gradient = ${fix(v, 3)} m s⁻¹`, { dx: 10, dy: -12, color: C.orange, size: 12, w: 600, bg: alpha(C.paper2, .9) });
    P2.dots([[tc, v]], { color: C.green, r: 6, stroke: C.paper2 });
    P2.label(tc, v, `*v* = ${fix(v, 3)}`, { dx: 10, dy: -12, color: C.green, size: 12, w: 600, bg: alpha(C.paper2, .9) });
    P3.dots([[tc, a]], { color: C.red, r: 6, stroke: C.paper2 });
    for (const p of [P1, P2, P3]) p.vline(tc, { color: alpha(C.ink2, .6), dash: [3, 3] });
    ro.set('t', `${fix(tc, 2)} s`); ro.set('x', `${fix(x, 4)} m`); ro.set('v', `${fix(v, 4)} m s⁻¹`); ro.set('a', `${fix(a, 3)} m s⁻²`);
    ro.set('chk', `${fix(-w * w * x, 3)} m s⁻²`);
    const ph = Math.abs(x) > A * 0.97 ? 'at maximum displacement: <i>v</i> = 0, <i>a</i> is maximum' : Math.abs(x) < A * 0.03 ? 'passing through equilibrium: <i>v</i> is maximum, <i>a</i> = 0' : 'in between';
    ro.set('st', ph);
  }, [S]);
  const g = Group(P.side, 'Wave');
  Slider(g, { id: 'sg-A', label: 'Amplitude <i>A</i>', min: 0.02, max: 0.2, step: 0.01, value: A, unit: 'm', fmt: v => fix(v, 2), oninput: v => A = v });
  Slider(g, { id: 'sg-T', label: 'Period <i>T</i>', min: 0.5, max: 4, step: 0.1, value: T, unit: 's', fmt: v => fix(v, 1), oninput: v => T = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Play'; }, 'pri');
  Note(g, 'Drag anywhere on the top graph to move the cursor. The orange line is the <b>tangent</b>: its gradient is the velocity, which is exactly what the middle graph plots.');
  const ro = Readout(Group(P.side, 'At the cursor'), [['t', 'Time'], ['x', 'Displacement'], ['v', 'Velocity (gradient)', 'hl'], ['a', 'Acceleration'], ['chk', 'Check −<i>ω²x</i>'], ['st', 'Where we are']]);
  Card(P.below, 'Reading SHM graphs (4.4.5)', list(['<b>Velocity = gradient of the displacement–time graph.</b> Draw a tangent and use Δx/Δt; the units come out as m s⁻¹.', '<b>Acceleration = gradient of the velocity–time graph</b>, and it is always −<i>ω</i>² × displacement.', 'At maximum displacement: <i>v</i> = 0, <i>a</i> = maximum (the graphs are ¼ of a cycle out of step).', 'At the equilibrium position: <i>v</i> = maximum, <i>a</i> = 0.', '<i>v</i> leads <i>x</i> by 90° (π/2 rad); <i>a</i> is 180° out of phase with <i>x</i>.']));
  EqCard(P.below, 'Phase relationships', [['x = A\\cos\\omega t', ''], ['v = -A\\omega\\sin\\omega t', '90° ahead of x'], ['a = -A\\omega^2\\cos\\omega t = -\\omega^2 x', '180° out of phase with x']]);
}

/* ---------- Lab C: pendulum & spring practical ---------- */
function mountPendulum(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.0, minH: 280, maxH: 380, mobileAspect: 1.1, tag: 'apparatus' });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 250, maxH: 340, plain: true });
  let mode = 'pend', Ln = 0.8, mass = 0.3, k = 25, t = 0, rows = [], timing = null, swings = 0;
  const per = () => mode === 'pend' ? TAU * Math.sqrt(Ln / G) : TAU * Math.sqrt(mass / k);
  const plot = new Plot(S2, { ymin: 0 });
  L.loop(dt => {
    t += dt * (timing ? 20 : 1);
    if (timing) { timing.t += dt * 20; timing.n = Math.floor(timing.t / per()); if (timing.n >= 20) { const measured = 20 * per() + gauss() * 0.25; rows.push({ x: mode === 'pend' ? Ln : mass, t20: measured, T: measured / 20 }); timing = null; render(); } }
    const w = TAU / per(), c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const ox = W * 0.28, top = H * 0.14;
    if (mode === 'pend') {
      const Lp = Math.min(H * 0.72, H * 0.72) * (0.35 + 0.65 * (Ln - 0.2) / 1.0), th = 0.22 * Math.cos(w * t);
      c.fillStyle = C.ink2; c.fillRect(ox - 40, top - 8, 80, 8);
      const bx = ox + Lp * Math.sin(th), by = top + Lp * Math.cos(th);
      line(c, [[ox, top], [bx, by]], { color: C.ink, width: 1.6 });
      line(c, [[ox, top], [ox, top + Lp + 24]], { color: alpha(C.muted, .5), width: 1, dash: [4, 4] });
      dot(c, bx, by, 14, C.blue, C.paper2);
      // fiducial marker
      line(c, [[ox, top + Lp + 6], [ox, top + Lp + 30]], { color: C.red, width: 2 });
      rich(c, 'fiducial marker', ox + 8, top + Lp + 24, { size: 11, color: C.red });
      arrow(c, ox - 30, top, ox - 30, top + Lp, { color: C.green, width: 1.4, both: true, head: 7 });
      rich(c, `*l* = ${fix(Ln, 2)} m`, ox - 38, top + Lp / 2, { align: 'right', size: 12.5, color: C.green, w: 600 });
    } else {
      const ext = mass * G / k, sc = H * 0.22 / 0.25, y0 = top + 60 + ext * sc, y = y0 + 0.05 * sc * Math.cos(w * t);
      c.fillStyle = C.ink2; c.fillRect(ox - 40, top - 8, 80, 8);
      line(c, springPath(ox, top, y - 14, 12, 11), { color: C.ink, width: 1.6 });
      c.fillStyle = C.blue; rrect(c, ox - 20, y - 14, 40, 28, 3); c.fill();
      rich(c, `${fix(mass * 1000, 0)} g`, ox, y, { align: 'center', size: 11, color: C.onblue, w: 600 });
      line(c, [[ox - 44, y0], [ox + 44, y0]], { color: alpha(C.muted, .6), width: 1, dash: [4, 4] });
    }
    // stopwatch
    const sx = W * 0.62, sy = H * 0.5, sr = Math.min(52, H * 0.22);
    c.beginPath(); c.arc(sx, sy, sr, 0, TAU); c.fillStyle = C.paper2; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 2; c.stroke();
    const tt = timing ? timing.t : 0, ang = -Math.PI / 2 + (tt % 60) / 60 * TAU;
    arrow(c, sx, sy, sx + Math.cos(ang) * sr * 0.8, sy + Math.sin(ang) * sr * 0.8, { color: C.red, width: 2, head: 7 });
    rich(c, `${fix(tt, 2)} s`, sx, sy + sr + 16, { align: 'center', size: 13, mono: true, w: 600 });
    rich(c, timing ? `counting swings: ${timing.n} / 20` : 'press “Time 20 oscillations”', sx, sy - sr - 12, { align: 'center', size: 11.5, color: timing ? C.blue : C.muted });
    // graph
    S2.begin();
    const xs = rows.map(r => r.x), ys = rows.map(r => r.T * r.T);
    plot.xlabel = mode === 'pend' ? 'length *l* / m' : 'mass *m* / kg';
    plot.ylabel = '*T*² / s²';
    plot.xmax = mode === 'pend' ? 1.3 : 0.65; plot.xmin = 0; plot.ymax = Math.max(0.5, ...ys) * 1.2; plot.axes();
    let grad = NaN;
    if (rows.length >= 2) { let sxy = 0, sxx = 0; for (let i = 0; i < rows.length; i++) { sxy += xs[i] * ys[i]; sxx += xs[i] * xs[i]; } grad = sxy / sxx; plot.curve(x => grad * x, { color: C.green, width: 1.6, a: 0, b: plot.xmax }); }
    plot.cross(rows.map(r => [r.x, r.T * r.T]), { color: C.red, s: 5, width: 2 });
    if (!rows.length) rich(S2.ctx, `Collect points: change ${mode === 'pend' ? 'the length' : 'the mass'}, then time 20 oscillations`, plot.x0 + plot.pw / 2, plot.y0 + plot.ph / 2, { align: 'center', color: C.muted, size: 13 });
    const res = mode === 'pend' ? 4 * Math.PI * Math.PI / grad : 4 * Math.PI * Math.PI / grad;
    ro.set('T', `${fix(per(), 3)} s`); ro.set('n', String(rows.length));
    ro.set('g', isFinite(grad) ? `${fix(grad, 3)} s² ${mode === 'pend' ? 'm⁻¹' : 'kg⁻¹'}` : '—');
    ro.set('res', isFinite(grad) ? (mode === 'pend' ? `${fix(res, 2)} m s⁻²` : `${fix(res, 1)} N m⁻¹`) : '—');
    ro.set('err', isFinite(grad) ? `${fix(((mode === 'pend' ? res - G : res - k) / (mode === 'pend' ? G : k)) * 100, 1)}%` : '—');
  }, [S1, S2]);
  const g = Group(P.side, 'Experiment');
  Seg(g, { options: [['pend', 'Simple pendulum'], ['spring', 'Loaded spring']], value: mode, onchange: v => { mode = v; rows = []; timing = null; sL.el.hidden = v !== 'pend'; sM.el.hidden = v === 'pend'; render(); } });
  const sL = Slider(g, { id: 'pd-l', label: 'Length <i>l</i>', min: 0.2, max: 1.2, step: 0.05, value: Ln, unit: 'm', fmt: v => fix(v, 2), oninput: v => Ln = v });
  const sM = Slider(g, { id: 'pd-m', label: 'Mass <i>m</i>', min: 0.05, max: 0.6, step: 0.05, value: mass, unit: 'kg', fmt: v => fix(v, 2), oninput: v => mass = v }); sM.el.hidden = true;
  const b = Btns(g); Btn(b, 'Time 20 oscillations', () => { if (!timing) { timing = { t: 0, n: 0 }; } }, 'pri'); Btn(b, 'Clear results', () => { rows = []; render(); });
  const ro = Readout(Group(P.side, 'Analysis'), [['T', 'True period now'], ['n', 'Points collected'], ['g', 'Gradient of <i>T</i>² graph'], ['res', 'Result', 'hl'], ['err', 'vs accepted']]);
  const eq = el('div', { class: 'key' }); P.side.append(eq);
  function render() {
    eq.innerHTML = mode === 'pend'
      ? `${tex('T = 2\\pi\\sqrt{\\frac{l}{g}} \\Rightarrow T^2 = \\frac{4\\pi^2}{g}l')}<br>Gradient = 4π²/<i>g</i>, so <b>g = 4π² / gradient</b>.`
      : `${tex('T = 2\\pi\\sqrt{\\frac{m}{k}} \\Rightarrow T^2 = \\frac{4\\pi^2}{k}m')}<br>Gradient = 4π²/<i>k</i>, so <b>k = 4π² / gradient</b>.`;
    tbox.innerHTML = `<table class="tbl"><tr><th>${mode === 'pend' ? 'l / m' : 'm / kg'}</th><th>t for 20 / s</th><th>T / s</th><th>T² / s²</th></tr>${rows.map(r => `<tr><td>${fix(r.x, 2)}</td><td>${fix(r.t20, 2)}</td><td>${fix(r.T, 3)}</td><td>${fix(r.T * r.T, 3)}</td></tr>`).join('') || '<tr><td colspan="4" style="text-align:left;color:var(--ps-muted)">No readings yet.</td></tr>'}</table>`;
  }
  const tcard = Card(P.below, 'Results table', null);
  const tbox = el('div', { class: 'tbl-wrap' }); tcard.append(tbox); render();
  Card(P.below, 'Method & accuracy (4.4.3–4.4.4)', list(['Time <b>20 oscillations</b> and divide by 20: this reduces the effect of your reaction time by a factor of 20.', 'Start and stop timing at the <b>centre</b> of the swing (highest speed), using a <b>fiducial marker</b>. There you can judge the moment most precisely.', 'Keep the pendulum amplitude small (under about 10°), or the motion is no longer simple harmonic.', 'Repeat each reading and take a mean; plot <b>T² against l</b> (or against m) so the graph is a straight line through the origin.', 'For the spring, the spiral spring must obey Hooke’s law and the spring’s own mass adds a small systematic error (the line does not pass exactly through the origin).'], true));
}

/* ---------- Lab D: damping & resonance ---------- */
function mountResonance(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 340, mobileAspect: 1.1 });
  const S2 = L.stage(P.stageBox, { aspect: 2.3, minH: 260, maxH: 360, plain: true });
  let mode = 'driven', fd = 0.6, damp = 0.35, t = 0, x = 0, vx = 0, amp = 0, peak = 0, pts = [], sweep = false;
  const f0 = 1.0, w0 = TAU * f0;
  const plot = new Plot(S2, {});
  const freeTraces = [[0.5, 'light'], [2 * w0, 'critical'], [4.5 * w0, 'over']];
  L.loop(dt => {
    t += dt;
    const C = Theme.c, c = S1.begin(), W = S1.w, H = S1.h;
    if (mode === 'driven') {
      if (sweep) { fd = clamp(fd + dt * 0.035, 0.2, 2.2); sf.set(fd); if (fd >= 2.2) sweep = false; }
      const wd = TAU * fd, gam = damp * 2 * w0 * 0.5;
      const sub = 8; for (let i = 0; i < sub; i++) { const h = dt / sub; const a = -w0 * w0 * x - gam * vx + 30 * Math.cos(wd * (t + i * h)); vx += a * h; x += vx * h; }
      peak = Math.max(peak * 0.9985, Math.abs(x)); amp += (peak - amp) * Math.min(1, dt * 2);
      // driver + spring
      const dx = W * 0.3, top = 30 + 14 * Math.cos(wd * t), eq = H * 0.52, sc = 12;
      c.fillStyle = C.ink2; c.fillRect(dx - 40, top - 8, 80, 8);
      rich(c, `driver: ${fix(fd, 2)} Hz`, dx - 46, top, { align: 'right', size: 11.5, color: C.violet });
      const my = eq + x * sc;
      line(c, springPath(dx, top, my - 16, 12, 10), { color: C.ink, width: 1.6 });
      c.fillStyle = C.blue; rrect(c, dx - 20, my - 16, 40, 32, 3); c.fill();
      line(c, [[dx - 60, eq], [dx + 60, eq]], { color: alpha(C.muted, .5), width: 1, dash: [4, 4] });
      arrow(c, dx + 46, eq - amp * sc, dx + 46, eq + amp * sc, { color: C.orange, width: 1.6, both: true, head: 7 });
      rich(c, `amplitude`, dx + 54, eq, { size: 11.5, color: C.orange });
      rich(c, `natural frequency *f*₀ = 1.00 Hz`, W - 16, 24, { align: 'right', size: 12, color: C.muted });
      rich(c, fd > 0.93 && fd < 1.07 ? 'RESONANCE: driver matches the natural frequency' : fd < 1 ? 'driving below f₀' : 'driving above f₀', W - 16, 44, { align: 'right', size: 12.5, color: fd > 0.93 && fd < 1.07 ? C.red : C.ink2, w: 600 });
      // response curve
      S2.begin();
      Object.assign(plot, { xmin: 0, xmax: 2.3, ymin: 0, ymax: 8, xlabel: 'driving frequency / Hz', ylabel: 'amplitude / arb.' }); plot.axes();
      for (const [d, col] of [[0.12, C.green], [0.35, C.blue], [0.9, C.violet]]) {
        const g2 = d * 2 * w0 * 0.5;
        plot.curve(f2 => { const w2 = TAU * f2; return 30 / Math.sqrt((w0 * w0 - w2 * w2) ** 2 + (g2 * w2) ** 2); }, { color: alpha(col, Math.abs(d - damp) < 0.01 ? 1 : 0.35), width: Math.abs(d - damp) < 0.01 ? 2.6 : 1.4, n: 400 });
      }
      plot.vline(f0, { color: alpha(C.red, .6) }); plot.label(f0, 7.6, '*f*₀', { dx: 5, color: C.red, size: 12.5 });
      plot.cross(pts, { color: C.red, s: 4.5 });
      plot.dots([[fd, amp]], { color: C.orange, r: 6, stroke: C.paper2 });
      ro.set('fd', `${fix(fd, 2)} Hz`); ro.set('amp', `${fix(amp, 2)}`); ro.set('dl', damp < 0.2 ? 'light' : damp < 0.6 ? 'medium' : 'heavy');
      ro.set('q', fix(1 / Math.max(damp, 0.01), 1));
    } else {
      // free decay comparison
      const eq = H * 0.55, sc = 30;
      ['light', 'critical', 'over'].forEach((kind, i) => {
        const dx = W * (0.2 + i * 0.3);
        const gam = kind === 'light' ? 0.5 : kind === 'critical' ? 2 * w0 : 4.5 * w0;
        let xx;
        const tt = t % 8;
        if (kind === 'light') { const wd2 = Math.sqrt(w0 * w0 - gam * gam / 4); xx = Math.exp(-gam * tt / 2) * Math.cos(wd2 * tt); }
        else if (kind === 'critical') xx = (1 + w0 * tt) * Math.exp(-w0 * tt);
        else { const r1 = (-gam + Math.sqrt(gam * gam - 4 * w0 * w0)) / 2, r2 = (-gam - Math.sqrt(gam * gam - 4 * w0 * w0)) / 2; xx = (r2 * Math.exp(r1 * tt) - r1 * Math.exp(r2 * tt)) / (r2 - r1); }
        c.fillStyle = C.ink2; c.fillRect(dx - 30, 26, 60, 6);
        const my = eq + xx * sc;
        line(c, springPath(dx, 32, my - 12, 10, 8), { color: C.ink, width: 1.4 });
        c.fillStyle = [C.green, C.blue, C.violet][i]; rrect(c, dx - 16, my - 12, 32, 24, 3); c.fill();
        line(c, [[dx - 40, eq], [dx + 40, eq]], { color: alpha(C.muted, .5), width: 1, dash: [3, 3] });
        rich(c, kind === 'light' ? 'light damping' : kind === 'critical' ? 'critical damping' : 'over-damping', dx, H - 16, { align: 'center', size: 12, w: 600, color: [C.green, C.blue, C.violet][i] });
      });
      S2.begin();
      Object.assign(plot, { xmin: 0, xmax: 8, ymin: -1.1, ymax: 1.1, xlabel: 'time *t* / s', ylabel: 'displacement' }); plot.axes();
      const cols = [C.green, C.blue, C.violet];
      freeTraces.forEach(([gam, kind], i) => {
        plot.curve(tt => { if (kind === 'light') { const wd2 = Math.sqrt(w0 * w0 - gam * gam / 4); return Math.exp(-gam * tt / 2) * Math.cos(wd2 * tt); } if (kind === 'critical') return (1 + w0 * tt) * Math.exp(-w0 * tt); const r1 = (-gam + Math.sqrt(gam * gam - 4 * w0 * w0)) / 2, r2 = (-gam - Math.sqrt(gam * gam - 4 * w0 * w0)) / 2; return (r2 * Math.exp(r1 * tt) - r1 * Math.exp(r2 * tt)) / (r2 - r1); }, { color: cols[i], width: 2.2, n: 400 });
      });
      plot.vline(t % 8, { color: alpha(C.ink2, .5) });
      ro.set('fd', '—'); ro.set('amp', '—'); ro.set('dl', 'compare the three'); ro.set('q', '—');
    }
  }, [S1, S2]);
  const g0 = Group(P.side, 'Mode');
  Seg(g0, { options: [['driven', 'Forced + resonance'], ['free', 'Damping compared']], value: mode, onchange: v => { mode = v; gd.hidden = v !== 'driven'; } });
  const gd = el('div', { class: 'grp' }); P.side.append(gd);
  const sf = Slider(gd, { id: 'rs-f', label: 'Driving frequency', min: 0.2, max: 2.2, step: 0.01, value: fd, unit: 'Hz', fmt: v => fix(v, 2), oninput: v => { fd = v; sweep = false; peak = 0; } });
  Seg(gd, { label: 'Damping', options: [['0.12', 'Light'], ['0.35', 'Medium'], ['0.9', 'Heavy']], value: '0.35', onchange: v => { damp = +v; pts = []; peak = 0; } });
  const b = Btns(gd); Btn(b, '▶ Sweep frequency', () => { sweep = !sweep; if (sweep) { fd = 0.2; sf.set(0.2); pts = []; } }, 'pri'); Btn(b, 'Record point', () => pts.push([fd, amp])); Btn(b, 'Clear', () => pts = []);
  const ro = Readout(Group(P.side, 'Readout'), [['fd', 'Driving frequency'], ['amp', 'Steady amplitude', 'hl'], ['dl', 'Damping'], ['q', 'Sharpness of peak']]);
  Note(P.side, '<b>Resonance:</b> when the driving frequency equals the natural frequency, energy transfer to the oscillator is a maximum, so the amplitude peaks. More damping lowers and broadens the peak, and shifts it slightly below <i>f</i>₀.');
  Card(P.below, 'The four terms (4.4.6–4.4.7)', list(['<b>Free vibration:</b> an object oscillating at its own natural frequency with no external driving force and no energy loss.', '<b>Forced vibration:</b> an object made to oscillate by a periodic external driving force, at the <b>driver’s</b> frequency.', '<b>Resonance:</b> the driving frequency equals the natural frequency, so energy is transferred most efficiently and the amplitude reaches a maximum.', '<b>Damping:</b> a resistive force removes energy from the oscillator, so the amplitude decays.', '<b>Light damping:</b> oscillates many times, amplitude decaying exponentially.', '<b>Critical damping:</b> returns to equilibrium in the shortest time <b>without</b> oscillating.', '<b>Over-damping:</b> returns to equilibrium without oscillating, but more slowly than critical.']));
  Card(P.below, 'Mechanical examples (4.4.8)', `<p><b>Resonance — useful:</b> a child pushed on a swing at its natural frequency; a wine glass shattered by a matching note; quartz timing crystals; MRI scanners.</p><p><b>Resonance — a nuisance:</b> the Millennium Bridge (pedestrian footfall), the Tacoma Narrows bridge, a rattling dashboard at one engine speed, washing machines walking across the floor at spin-up.</p><p><b>Damping:</b> car suspension is designed close to <b>critical</b> damping, so the car settles in one movement rather than bouncing; door closers; tuned mass dampers in tall buildings such as Taipei 101; the moving-coil ammeter needle is critically damped so it settles quickly.</p>`);
  Drill(P.below, { title: 'Pendulum, spring & resonance drill', cls: 'wide', gens: [
    () => { const l = +rand(0.2, 2).toFixed(2); const T = TAU * Math.sqrt(l / G); return { q: `Find the period of a simple pendulum of length <b>${l} m</b> (g = 9.81 m s⁻²).`, a: T, unit: 's', tol: 0.01, steps: ['T = 2π√(l/g)', `= 2π√(${l}/9.81) = ${fix(T, 3)} s`] }; },
    () => { const m = +rand(0.05, 1.2).toFixed(2), k = randi(10, 120); const T = TAU * Math.sqrt(m / k); return { q: `A <b>${m} kg</b> mass hangs from a spring of stiffness <b>${k} N m⁻¹</b>. Find the period of its vertical oscillations.`, a: T, unit: 's', tol: 0.01, steps: ['T = 2π√(m/k)', `= 2π√(${m}/${k}) = ${fix(T, 3)} s`] }; },
    () => { const T = +rand(0.8, 3).toFixed(2); const l = G * (T / TAU) ** 2; return { q: `A pendulum has period <b>${T} s</b>. Find its length.`, a: l, unit: 'm', tol: 0.015, steps: ['T = 2π√(l/g) ⇒ l = g(T/2π)²', `= 9.81 × (${T}/2π)² = ${fix(l, 3)} m`] }; },
    () => ({ q: 'A car goes over a bumpy road and the suspension keeps bouncing. Which change is needed?', options: ['Increase the damping towards critical', 'Reduce the damping', 'Increase the driving frequency', 'Increase the amplitude'], correct: 0, why: 'Critical damping returns the car body to equilibrium in the shortest time without oscillating.' }),
  ] });
}

topic({
  id: 'shm', code: '4.4', unit: 'A2 1', title: 'Simple Harmonic Motion', short: 'SHM',
  blurb: 'a = −ω²x, and everything that follows: the reference circle, the three graphs, the pendulum and spring practicals, damping and resonance.',
  outcomes: [
    ['4.4.1', 'define simple harmonic motion (SHM) recalling the equations a = −ω²x, where ω = 2πf', 'define'],
    ['4.4.2', 'perform calculations using the equation x = A cos ωt', 'define'],
    ['4.4.3', 'investigate experimentally and graphically the motion of the simple pendulum and the loaded spiral spring', 'pendulum'],
    ['4.4.4', 'use the equations T = 2π√(l/g) and T = 2π√(m/k)', 'pendulum'],
    ['4.4.5', 'demonstrate an understanding of SHM graphs, including measuring velocity from the gradient of a displacement–time graph', 'graphs'],
    ['4.4.6', 'use the terms free vibrations, forced vibrations, resonance and damping in this context', 'resonance'],
    ['4.4.7', 'demonstrate an understanding of the concepts of light damping, over-damping and critical damping', 'resonance'],
    ['4.4.8', 'describe mechanical examples of resonance and damping', 'resonance'],
  ],
  labs: [
    { id: 'define', title: 'What makes it SHM', hint: 'a = −ω²x', spec: ['4.4.1', '4.4.2'], mount: mountDefine },
    { id: 'graphs', title: 'SHM graphs', hint: 'velocity from the gradient', spec: ['4.4.5'], mount: mountGraphsSHM },
    { id: 'pendulum', title: 'Pendulum & spring practical', hint: 'T² graphs → g and k', spec: ['4.4.3', '4.4.4'], mount: mountPendulum },
    { id: 'resonance', title: 'Damping & resonance', hint: 'sweep the driver', spec: ['4.4.6', '4.4.7', '4.4.8'], mount: mountResonance },
  ],
  equations: [['a = -\\omega^2 x', ''], ['\\omega = 2\\pi f', ''], ['x = A\\cos\\omega t', ''], ['T = 2\\pi\\sqrt{\\frac{l}{g}}', 'simple pendulum'], ['T = 2\\pi\\sqrt{\\frac{m}{k}}', 'loaded spring'], ['v_{max} = A\\omega,\\ a_{max} = A\\omega^2', '']],
  traps: ['Keep the minus sign in <i>a</i> = −<i>ω</i>²<i>x</i>: it means “directed towards equilibrium”.', 'Calculator in <b>radians</b> for <i>x</i> = <i>A</i> cos <i>ωt</i>.', 'The period of a pendulum does <b>not</b> depend on its mass; the period of a spring does <b>not</b> depend on g.', 'Time many oscillations and divide, and start timing at the centre using a fiducial marker.', 'Plot <b>T²</b>, not T, to get a straight line.', 'Critical damping = fastest return with <b>no</b> oscillation. Over-damping is slower, not faster.'],
});
})();

/* ================= 4.5 The nucleus ================= */
(() => {
const KE = 8.99e9, E_C = 1.60e-19, U_KG = 1.66e-27, R0 = 1.2e-15;

/* ---------- Lab A: alpha-particle scattering ---------- */
function mountRutherford(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.55, minH: 380, maxH: 560, mobileAspect: 0.95 });
  let Z = 79, Ek = 5.0, rate = 1, run = true, tracks = [], counts = { fwd: 0, small: 0, big: 0, back: 0 }, model = 'nuclear', showAll = true;
  const alphas = [];
  function fire() {
    const b = (Math.random() * 2 - 1) * 1.0; // impact parameter (arb units)
    alphas.push({ x: -1.6, y: b, vx: 1, vy: 0, trail: [], done: false });
  }
  L.loop(dt => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const cx = W * 0.52, cy = H * 0.5, sc = Math.min(W * 0.25, H * 0.42);
    if (run) { if (Math.random() < dt * rate * 6) fire(); }
    // physics: dimensionless Coulomb with strength from Z and Ek
    const K = (Z * 2 * KE * E_C * E_C) / (Ek * 1e6 * E_C); // closest-approach distance (m) head-on
    const strength = clamp(K / 1e-13, 0.02, 3) * (model === 'nuclear' ? 0.07 : 0.0015);
    for (const a of alphas) {
      if (a.done) continue;
      const sub = 4;
      for (let i = 0; i < sub; i++) {
        const h = dt * 1.6 / sub; const r2 = a.x * a.x + a.y * a.y, r = Math.sqrt(r2) || 1e-6;
        const f = strength / Math.max(r2, 0.0009);
        a.vx += f * (a.x / r) * h; a.vy += f * (a.y / r) * h;
        a.x += a.vx * h; a.y += a.vy * h;
      }
      a.trail.push([a.x, a.y]); if (a.trail.length > 400) a.trail.shift();
      if (Math.abs(a.x) > 1.95 || Math.abs(a.y) > 1.15) {
        a.done = true;
        const ang = Math.abs(Math.atan2(a.vy, a.vx)) / DEG;
        if (ang < 10) counts.fwd++; else if (ang < 45) counts.small++; else if (ang < 90) counts.big++; else counts.back++;
        tracks.push(a.trail); if (tracks.length > 90) tracks.shift();
      }
    }
    for (let i = alphas.length - 1; i >= 0; i--) if (alphas[i].done) alphas.splice(i, 1);
    // gold foil
    c.fillStyle = alpha(C.orange, .09); c.fillRect(cx - sc * 0.22, 0, sc * 0.44, H);
    rich(c, 'gold foil', cx, H - 14, { align: 'center', size: 11.5, color: C.orange });
    // source
    c.fillStyle = C.ink2; rrect(c, 6, cy - 22, 44, 44, 5); c.fill();
    rich(c, 'α', 28, cy, { align: 'center', size: 18, color: C.paper2, w: 700 });
    rich(c, `${fix(Ek, 1)} MeV`, 28, cy + 32, { align: 'center', size: 11, color: C.muted, mono: true });
    // detector arc
    c.beginPath(); c.arc(cx, cy, sc * 1.55, 0, TAU); c.strokeStyle = alpha(C.muted, .35); c.lineWidth = 1; c.setLineDash([3, 5]); c.stroke(); c.setLineDash([]);
    for (const a of [30, 90, 150]) { const p = [cx + sc * 1.55 * Math.cos(a * DEG), cy - sc * 1.55 * Math.sin(a * DEG)]; rich(c, `${a}°`, p[0], p[1], { align: 'center', size: 10.5, color: C.muted }); }
    // nucleus
    if (model === 'nuclear') { c.beginPath(); c.arc(cx, cy, Math.max(4, sc * 0.035), 0, TAU); c.fillStyle = C.red; c.fill(); rich(c, `nucleus (+${Z}e)`, cx, cy - 16, { align: 'center', size: 11.5, color: C.red, w: 600 }); }
    else { c.beginPath(); c.arc(cx, cy, sc * 0.5, 0, TAU); c.fillStyle = alpha(C.red, .12); c.fill(); c.strokeStyle = alpha(C.red, .5); c.setLineDash([4, 4]); c.stroke(); c.setLineDash([]); rich(c, 'charge spread out (plum pudding)', cx, cy - sc * 0.5 - 10, { align: 'center', size: 11.5, color: C.red }); }
    // tracks
    const toPx = p => [cx + p[0] * sc, cy - p[1] * sc];
    if (showAll) for (const tr of tracks) line(c, tr.map(toPx), { color: alpha(C.blue, .22), width: 1 });
    for (const a of alphas) { line(c, a.trail.map(toPx), { color: C.blue, width: 1.6 }); const p = toPx([a.x, a.y]); dot(c, p[0], p[1], 3.5, C.violet); }
    const tot = counts.fwd + counts.small + counts.big + counts.back || 1;
    ro.set('n', String(tot)); ro.set('fwd', `${fix(counts.fwd / tot * 100, 1)}%`); ro.set('sm', `${fix(counts.small / tot * 100, 1)}%`);
    ro.set('bg', `${fix((counts.big + counts.back) / tot * 100, 2)}%`); ro.set('bk', `${counts.back}`);
    ro.set('d', `${sci(K, 2)} m`);
  }, [S]);
  const g = Group(P.side, 'Experiment');
  Seg(g, { options: [['nuclear', 'Nuclear atom'], ['pudding', 'Plum pudding']], value: model, onchange: v => { model = v; counts = { fwd: 0, small: 0, big: 0, back: 0 }; tracks = []; } });
  Slider(g, { id: 'ru-Z', label: 'Nucleus charge <i>Z</i>', min: 13, max: 92, step: 1, value: Z, fmt: v => `${v} (${v === 79 ? 'Au' : v === 13 ? 'Al' : v === 92 ? 'U' : 'Z'})`, oninput: v => Z = v });
  Slider(g, { id: 'ru-E', label: 'α kinetic energy', min: 2, max: 12, step: 0.5, value: Ek, unit: 'MeV', fmt: v => fix(v, 1), oninput: v => Ek = v });
  Slider(g, { id: 'ru-r', label: 'Beam rate', min: 0.2, max: 4, step: 0.2, value: rate, fmt: v => fix(v, 1) + '×', oninput: v => rate = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause beam', () => { run = !run; pb.textContent = run ? '❚❚ Pause beam' : '▶ Fire'; }, 'pri'); Btn(b, 'Clear tracks', () => { tracks = []; counts = { fwd: 0, small: 0, big: 0, back: 0 }; });
  Switch(g, { label: 'Keep old tracks', value: showAll, onchange: v => showAll = v });
  const ro = Readout(Group(P.side, 'Detector counts'), [['n', 'α particles detected'], ['fwd', 'Straight through (&lt;10°)', 'hl'], ['sm', 'Deflected 10–45°'], ['bg', 'Deflected &gt; 45°'], ['bk', 'Backscattered (&gt;90°)'], ['d', 'Closest approach (head-on)']]);
  Note(P.side, 'Turn the energy down or the charge up and the closest approach grows: that distance is an <b>upper estimate of the nuclear radius</b>, because the α never touches the nucleus.');
  Card(P.below, 'What the results prove (4.5.1)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Observation</th><th>Conclusion</th></tr>
    <tr><td style="white-space:normal">Most α particles pass straight through, undeflected</td><td style="white-space:normal">The atom is mostly <b>empty space</b></td></tr>
    <tr><td style="white-space:normal">A small number are deflected through large angles</td><td style="white-space:normal">There is a <b>concentrated positive charge</b> that repels them</td></tr>
    <tr><td style="white-space:normal">About 1 in 8000 is deflected through more than 90°</td><td style="white-space:normal">That charge is in a <b>tiny, very dense nucleus</b> carrying nearly all the mass</td></tr></table></div>
    <p style="margin-top:10px">Rutherford (with Geiger and Marsden, 1909): “as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you.” The plum-pudding model predicts only tiny deflections — switch models above and watch the difference.</p>`);
  Card(P.below, 'Experimental details worth a mark', list(['A thin <b>gold</b> foil: gold is malleable enough to beat into a foil only a few atoms thick, so multiple scattering is unlikely.', 'The whole apparatus is <b>evacuated</b>, because α particles are absorbed by a few centimetres of air.', 'A movable detector (zinc sulfide screen + microscope) counts scintillations at each angle.', 'The source is collimated to give a narrow, mono-energetic beam.']));
}

/* ---------- Lab B: nuclear radius & density ---------- */
const NUC = [['Hydrogen', 1, 1], ['Helium', 4, 2], ['Carbon', 12, 6], ['Oxygen', 16, 8], ['Aluminium', 27, 13], ['Iron', 56, 26], ['Copper', 64, 29], ['Silver', 108, 47], ['Gold', 197, 79], ['Uranium', 238, 92]];
function mountRadius(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 440, mobileAspect: 1.0 });
  let sel = 8, mode = 'cube';
  const plot = new Plot(S, {});
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, wide = W > 620;
    const lp = wide ? { x: 0, y: 0, w: W * 0.36, h: H } : { x: 0, y: 0, w: W, h: H * 0.42 };
    const gp = wide ? { x: W * 0.36, y: 0, w: W * 0.64, h: H } : { x: 0, y: H * 0.42, w: W, h: H * 0.58 };
    const [nm, A, Z] = NUC[sel];
    // nucleon packing picture
    c.fillStyle = C.paper2; c.fillRect(lp.x, lp.y, lp.w, lp.h);
    line(c, wide ? [[lp.w, 0], [lp.w, H]] : [[0, lp.h], [W, lp.h]], { color: C.line2, width: 1 });
    const R = R0 * Math.pow(A, 1 / 3);
    const px = Math.min(lp.w, lp.h) * 0.38 * Math.pow(A / 238, 1 / 3) + 10;
    const ccx = lp.x + lp.w / 2, ccy = lp.y + lp.h * 0.45;
    c.beginPath(); c.arc(ccx, ccy, px, 0, TAU); c.fillStyle = alpha(C.violet, .1); c.fill(); c.strokeStyle = C.violet; c.lineWidth = 1.5; c.stroke();
    const nr = Math.max(2.2, px / Math.pow(A, 1 / 3) * 0.55);
    let placed = 0; const golden = Math.PI * (3 - Math.sqrt(5));
    const shown = Math.min(A, 260); for (let i = 0; i < shown; i++) { const rr = px * 0.86 * Math.sqrt(i / shown); const th = i * golden; const x = ccx + rr * Math.cos(th), y = ccy + rr * Math.sin(th); const h = ((i * 2654435761) % 1000) / 1000; dot(c, x, y, nr, h < Z / A ? C.red : C.blue); placed++; }
    rich(c, `${nm}: *A* = ${A}, *Z* = ${Z}`, ccx, ccy + px + 18, { align: 'center', size: 13, color: C.ink, w: 600 });
    rich(c, `*R* = ${sci(R, 3)} m = ${fix(R * 1e15, 2)} fm`, ccx, ccy + px + 36, { align: 'center', size: 12, color: C.violet });
    rich(c, 'red = protons · blue = neutrons', ccx, lp.y + 16, { align: 'center', size: 11, color: C.muted });
    // graph
    plot.rect = { x: gp.x + 4, y: gp.y + 4, w: gp.w - 8, h: gp.h - 8 }; plot.pad = { l: 60, r: 14, t: 16, b: 42 };
    if (mode === 'cube') Object.assign(plot, { xmin: 0, xmax: 6.5, ymin: 0, ymax: 8.5, xlabel: '*A*^(1/3)', ylabel: 'radius *R* / fm' });
    else Object.assign(plot, { xmin: 0, xmax: 250, ymin: 0, ymax: 8.5, xlabel: 'nucleon number *A*', ylabel: 'radius *R* / fm' });
    plot.axes();
    if (mode === 'cube') { plot.curve(x => 1.2 * x, { color: C.violet, width: 2 }); plot.label(5.2, 1.2 * 5.2, 'gradient = *r*₀ = 1.2 fm', { dx: -8, dy: -12, align: 'right', color: C.violet, size: 12.5, w: 600 }); }
    else plot.curve(x => 1.2 * Math.pow(Math.max(x, 0), 1 / 3), { color: C.violet, width: 2, n: 300 });
    plot.dots(NUC.map(([n, a]) => [mode === 'cube' ? Math.pow(a, 1 / 3) : a, 1.2 * Math.pow(a, 1 / 3)]), { color: C.blue, r: 4 });
    const dx = mode === 'cube' ? Math.pow(A, 1 / 3) : A;
    plot.dots([[dx, R * 1e15]], { color: C.red, r: 7, stroke: C.paper2 });
    plot.label(dx, R * 1e15, nm, { dx: 10, dy: -10, color: C.red, size: 12, w: 700, bg: alpha(C.paper2, .85) });
    const m = A * 1.66e-27, V = 4 / 3 * Math.PI * R ** 3;
    ro.set('R', `${fix(R * 1e15, 2)} fm`); ro.set('V', `${sci(V, 3)} m³`); ro.set('m', `${sci(m, 3)} kg`); ro.set('rho', `${sci(m / V, 3)} kg m⁻³`);
    ro.set('cmp', `${sci(m / V / 7850, 2)} × steel`);
  }, [S]);
  const g = Group(P.side, 'Nuclide');
  const sel2 = el('select', { class: 'sel', id: 'nr-n', 'aria-label': 'nuclide' }, NUC.map(([n, A, Z], i) => el('option', { value: i }, `${n}-${A}`)));
  sel2.value = sel; sel2.addEventListener('change', () => sel = +sel2.value); g.append(sel2);
  Seg(g, { label: 'Graph', options: [['cube', '<i>R</i> vs <i>A</i><sup>1/3</sup>'], ['A', '<i>R</i> vs <i>A</i>']], value: mode, onchange: v => mode = v });
  const ro = Readout(Group(P.side, 'This nucleus'), [['R', 'Radius <i>R</i> = <i>r</i>₀<i>A</i><sup>1/3</sup>', 'hl'], ['V', 'Volume 4π<i>R</i>³/3'], ['m', 'Mass ≈ <i>A</i> × 1.66×10⁻²⁷'], ['rho', 'Density', 'hl'], ['cmp', 'Compared with steel']]);
  Note(P.side, 'Change nuclide and watch the density: it barely moves. Nuclear matter has an almost <b>constant density</b> of about 2.3 × 10¹⁷ kg m⁻³, because <i>R</i>³ ∝ <i>A</i>, so volume ∝ number of nucleons.');
  EqCard(P.below, 'Nuclear radius (4.5.2–4.5.3)', [['R = r_0 A^{1/3}', 'r₀ ≈ 1.2 fm'], ['V = \\frac{4}{3}\\pi R^3 \\propto A', ''], ['\\rho = \\frac{m}{V} = \\frac{A u}{\\frac{4}{3}\\pi r_0^3 A}', 'A cancels'], ['\\rho \\approx 2.3\\times10^{17}\\,\\text{kg m}^{-3}', 'independent of A']]);
  Card(P.below, 'Interpreting the graph (4.5.2)', list(['A graph of <b>R against A<sup>1/3</sup></b> is a straight line through the origin with gradient <i>r</i>₀ ≈ 1.2 × 10⁻¹⁵ m.', 'A graph of R against A is a curve, which is why you cube-root first.', 'Since volume ∝ A, each nucleon takes up the same volume: the nucleons are <b>packed together</b> and nuclear density is constant.', 'That density is around 10¹⁴ times the density of everyday solids: a teaspoon of it would have a mass of roughly a billion tonnes. Neutron stars are made of it.']));
  Drill(P.below, { title: 'Nuclear radius drill', cls: 'wide', gens: [
    () => { const [n, A] = pick(NUC); const R = R0 * Math.pow(A, 1 / 3); return { q: `Estimate the radius of a <b>${n}-${A}</b> nucleus (r₀ = 1.2 × 10⁻¹⁵ m).`, a: R, unit: 'm', tol: 0.02, steps: ['R = r₀A^(1/3)', `= 1.2×10⁻¹⁵ × ${A}^(1/3) = ${sci(R, 3)} m`] }; },
    () => { const [n, A] = pick(NUC); const R = R0 * Math.pow(A, 1 / 3), m = A * U_KG, V = 4 / 3 * Math.PI * R ** 3; return { q: `Estimate the density of nuclear matter using <b>${n}-${A}</b> (mass of a nucleon = 1.66 × 10⁻²⁷ kg).`, a: m / V, unit: 'kg m⁻³', tol: 0.05, steps: [`m = ${A} × 1.66×10⁻²⁷ = ${sci(m, 3)} kg`, `R = 1.2×10⁻¹⁵ × ${A}^(1/3) = ${sci(R, 3)} m, V = 4πR³/3 = ${sci(V, 3)} m³`, `ρ = m/V = ${sci(m / V, 3)} kg m⁻³`] }; },
    () => { const f = pick([8, 27, 64]); return { q: `Nucleus X has <b>${f}×</b> the nucleon number of nucleus Y. How many times bigger is its radius?`, a: Math.cbrt(f), unit: '', tol: 0.01, steps: ['R ∝ A^(1/3)', `ratio = ${f}^(1/3) = ${fix(Math.cbrt(f), 2)}`] }; },
  ] });
}

topic({
  id: 'nucleus', code: '4.5', unit: 'A2 1', title: 'The Nucleus', short: 'Nucleus',
  blurb: 'Fire alpha particles at gold foil and watch the nuclear atom fall out of the results, then size the nucleus with R = r₀A^⅓ and find the density of nuclear matter.',
  outcomes: [
    ['4.5.1', 'describe alpha-particle scattering as evidence of the existence of atomic nuclei', 'rutherford'],
    ['4.5.2', 'interpret the variation of nuclear radius with nucleon number', 'radius'],
    ['4.5.3', 'use the equation r = r₀A^⅓ to estimate the density of nuclear matter', 'radius'],
  ],
  labs: [
    { id: 'rutherford', title: 'Alpha scattering', hint: 'Geiger–Marsden', spec: ['4.5.1'], mount: mountRutherford },
    { id: 'radius', title: 'Nuclear radius & density', hint: 'R = r₀A^⅓', spec: ['4.5.2', '4.5.3'], mount: mountRadius },
  ],
  equations: [['R = r_0 A^{1/3}', 'r₀ ≈ 1.2 fm'], ['\\rho = \\frac{m}{V}', ''], ['V = \\frac{4}{3}\\pi R^3', ''], ['E_k = \\frac{2Ze^2}{4\\pi\\varepsilon_0 d}', 'closest approach (extension)']],
  traps: ['Alpha scattering shows the nucleus is small, dense and <b>positive</b> — quote the observation with the conclusion.', 'r₀ is 1.2 <b>femtometres</b> = 1.2 × 10⁻¹⁵ m.', 'A^(1/3) means the cube root of the nucleon number, not A ÷ 3.', 'Nuclear density comes out the same for every nuclide: say why (V ∝ A).', 'Use the nucleon mass 1.66 × 10⁻²⁷ kg × A for the nuclear mass in density questions.'],
});
})();

/* ================= 4.6 Nuclear decay ================= */
(() => {
const SYM = 'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U'.split(' ');
const sym = Z => SYM[Z - 1] || '?';

/* ---------- Lab A: penetration and range ---------- */
function mountPenetration(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.8, minH: 330, maxH: 460, mobileAspect: 1.0 });
  let kind = 'alpha', abs = 'none', run = true;
  const parts = []; let counts = { emitted: 0, detected: 0 }, t = 0;
  const MU = { none: 0, paper: 0.02, al: 0.25, lead: 8 }; // for gamma, per cm
  L.loop(dt => {
    t += dt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const sx = 54, dxD = W - 60, mid = H * 0.44;
    const absX = W * 0.46, absW = abs === 'none' ? 0 : abs === 'paper' ? 6 : abs === 'al' ? 16 : 34;
    if (run && Math.random() < dt * 14) {
      counts.emitted++;
      const ang = (Math.random() - 0.5) * (kind === 'alpha' ? 0.25 : kind === 'beta' ? 0.7 : 0.5);
      parts.push({ x: sx + 18, y: mid, vx: Math.cos(ang) * (kind === 'alpha' ? 150 : kind === 'beta' ? 240 : 420), vy: Math.sin(ang) * (kind === 'alpha' ? 150 : kind === 'beta' ? 240 : 420), alive: true, ion: [], scatter: kind === 'beta' });
    }
    // range in air (scaled): alpha 5 cm, beta 3 m, gamma unlimited
    const rangePx = kind === 'alpha' ? (W - sx) * 0.42 : kind === 'beta' ? (W - sx) * 1.6 : 1e9;
    for (const p of parts) {
      if (!p.alive) continue;
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.scatter && Math.random() < dt * 6) { const a = Math.atan2(p.vy, p.vx) + rand(-0.5, 0.5); const s = hyp(p.vx, p.vy); p.vx = Math.cos(a) * s; p.vy = Math.sin(a) * s; }
      if (Math.random() < dt * (kind === 'alpha' ? 60 : kind === 'beta' ? 12 : 1.5)) p.ion.push([p.x, p.y]);
      if (p.x - sx > rangePx) p.alive = false;
      if (absW && p.x > absX && p.x < absX + absW) {
        const stop = kind === 'alpha' ? 1 : kind === 'beta' ? (abs === 'paper' ? 0.05 : abs === 'al' ? 0.97 : 1) : 1 - Math.exp(-MU[abs] * (absW / 34) * 0.9);
        if (Math.random() < stop * dt * 40) { p.alive = false; }
      }
      if (p.x > dxD) { p.alive = false; if (Math.abs(p.y - mid) < 60) counts.detected++; }
      if (p.y < 4 || p.y > H - 40) p.alive = false;
    }
    while (parts.length > 260) parts.shift();
    // air label
    rich(c, 'air', W * 0.25, 18, { size: 11, color: C.muted });
    // source
    c.fillStyle = C.ink2; rrect(c, 20, mid - 26, 36, 52, 5); c.fill();
    rich(c, kind === 'alpha' ? 'α' : kind === 'beta' ? 'β' : 'γ', 38, mid, { align: 'center', size: 20, color: C.paper2, w: 700 });
    rich(c, 'source', 38, mid + 36, { align: 'center', size: 11, color: C.muted });
    // absorber
    if (absW) {
      c.fillStyle = abs === 'paper' ? alpha(C.orange, .35) : abs === 'al' ? alpha(C.muted, .55) : alpha(C.ink, .65);
      c.fillRect(absX, 10, absW, H - 46);
      rich(c, abs === 'paper' ? 'paper' : abs === 'al' ? '3 mm aluminium' : '5 cm lead', absX + absW / 2, H - 28, { align: 'center', size: 11.5, color: C.ink2, w: 600 });
    }
    // detector
    c.fillStyle = C.paper3; c.strokeStyle = C.ink2; c.lineWidth = 1.5; rrect(c, dxD, mid - 60, 44, 120, 6); c.fill(); c.stroke();
    rich(c, 'GM', dxD + 22, mid - 10, { align: 'center', size: 13, w: 700, color: C.ink });
    rich(c, `${counts.detected}`, dxD + 22, mid + 14, { align: 'center', size: 15, mono: true, w: 700, color: C.green });
    rich(c, 'counts', dxD + 22, mid + 34, { align: 'center', size: 10, color: C.muted });
    // particles
    const col = kind === 'alpha' ? C.red : kind === 'beta' ? C.blue : C.violet;
    for (const p of parts) {
      for (const [ix, iy] of p.ion) dot(c, ix, iy, 1.6, alpha(C.orange, .5));
      if (!p.alive) continue;
      if (kind === 'gamma') line(c, [[p.x - 14, p.y], [p.x, p.y]], { color: col, width: 2 });
      else dot(c, p.x, p.y, kind === 'alpha' ? 4.5 : 3, col);
    }
    rich(c, kind === 'alpha' ? 'α: helium nucleus, 2+ charge, heavily ionising, stopped by paper or ~5 cm of air' : kind === 'beta' ? 'β: fast electron, 1− charge, moderately ionising, stopped by ~3 mm aluminium' : 'γ: EM photon, no charge, weakly ionising, only reduced by thick lead', 16, H - 14, { size: 12, color: C.ink2 });
    ro.set('em', String(counts.emitted)); ro.set('det', String(counts.detected)); ro.set('pct', counts.emitted ? `${fix(counts.detected / counts.emitted * 100, 1)}%` : '—');
  }, [S]);
  const g = Group(P.side, 'Source');
  Seg(g, { options: [['alpha', 'Alpha'], ['beta', 'Beta'], ['gamma', 'Gamma']], value: kind, onchange: v => { kind = v; parts.length = 0; counts = { emitted: 0, detected: 0 }; } });
  Seg(g, { label: 'Absorber', wrap: true, options: [['none', 'None'], ['paper', 'Paper'], ['al', '3 mm Al'], ['lead', '5 cm Pb']], value: abs, onchange: v => { abs = v; counts = { emitted: 0, detected: 0 }; } });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Emit'; }, 'pri'); Btn(b, 'Reset counts', () => counts = { emitted: 0, detected: 0 });
  const ro = Readout(Group(P.side, 'Detector'), [['em', 'Emitted'], ['det', 'Reaching the GM tube', 'hl'], ['pct', 'Fraction detected']]);
  Note(P.side, 'The orange specks are <b>ion pairs</b>. Alpha makes thousands per millimetre, so it loses energy fast and has a short range. Gamma makes very few, so it travels a long way.');
  Card(P.below, 'Properties table (4.6.1)', `<div class="tbl-wrap"><table class="tbl">
    <tr><th>Property</th><th>Alpha (α)</th><th>Beta (β⁻)</th><th>Gamma (γ)</th></tr>
    <tr><td>Nature</td><td>Helium nucleus (2p + 2n)</td><td>Fast electron</td><td>EM photon</td></tr>
    <tr><td>Charge</td><td>+2e</td><td>−e</td><td>0</td></tr>
    <tr><td>Relative mass</td><td>4</td><td>1/1836</td><td>0</td></tr>
    <tr><td>Ionising power</td><td>Very high</td><td>Medium</td><td>Very low</td></tr>
    <tr><td>Penetration</td><td>Paper / skin</td><td>~3 mm aluminium</td><td>Reduced by thick lead</td></tr>
    <tr><td>Range in air</td><td>≈ 5 cm</td><td>≈ 1 m (up to a few m)</td><td>Follows inverse square</td></tr>
    <tr><td>Deflection in a field</td><td>Slight, one way</td><td>Large, opposite way</td><td>None</td></tr></table></div>
    <p style="margin-top:10px"><b>The link to learn:</b> heavily ionising ⇒ loses energy quickly ⇒ short range and easily absorbed. Alpha is the most ionising and the least penetrating; gamma is the opposite.</p>`);
  Drill(P.below, { title: 'Radiation identification drill', gens: [
    () => ({ q: 'A source’s count rate is unchanged by paper but falls almost to background behind 3 mm of aluminium. What is it emitting?', options: ['Beta only', 'Alpha only', 'Gamma only', 'Alpha and gamma'], correct: 0, why: 'Paper stops alpha; aluminium stops beta; gamma would still get through the aluminium.' }),
    () => ({ q: 'Which radiation is the most dangerous <b>inside</b> the body?', options: ['Alpha', 'Beta', 'Gamma', 'All the same'], correct: 0, why: 'Inside the body there is nothing to absorb it first, and alpha is by far the most ionising, so it does the most damage to nearby cells.' }),
    () => ({ q: 'A beam passes through a magnetic field and is deflected sharply in the direction expected for negative charges. Which radiation is it?', options: ['Beta', 'Alpha', 'Gamma', 'Neutrons'], correct: 0, why: 'Beta particles are electrons: negative, and light enough for a large deflection.' }),
  ] });
}

/* ---------- Lab B: decay equations ---------- */
function mountEquations(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.75, minH: 340, maxH: 480, mobileAspect: 1.0 });
  const START = [['Uranium-238', 238, 92], ['Radium-226', 226, 88], ['Carbon-14', 14, 6], ['Strontium-90', 90, 38], ['Cobalt-60', 60, 27], ['Radon-222', 222, 86], ['Americium-241', 241, 95]];
  let A = 238, Z = 92, path = [[238, 92]], last = null;
  function emit(kind) {
    last = { kind, from: [A, Z] };
    if (kind === 'a') { A -= 4; Z -= 2; } else if (kind === 'b') { Z += 1; } else if (kind === 'bp') { Z -= 1; }
    path.push([A, Z]); if (path.length > 30) path.shift();
    render();
  }
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, wide = W > 620;
    const N = A - Z;
    // N–Z chart
    const gx = wide ? W * 0.44 : 8, gy = wide ? 20 : H * 0.42, gw = (wide ? W * 0.54 : W - 16), gh = (wide ? H - 44 : H * 0.55);
    const zs = path.map(p => p[1]), ns = path.map(p => p[0] - p[1]);
    const z0 = Math.min(...zs) - 3, z1 = Math.max(...zs) + 3, n0 = Math.min(...ns) - 3, n1 = Math.max(...ns) + 3;
    const X = n => gx + (n - n0) / (n1 - n0) * gw, Y = z => gy + gh - (z - z0) / (z1 - z0) * gh;
    c.strokeStyle = C.grid2; c.lineWidth = 1;
    c.beginPath(); for (let n = Math.ceil(n0); n <= n1; n++) { c.moveTo(X(n), gy); c.lineTo(X(n), gy + gh); } for (let z = Math.ceil(z0); z <= z1; z++) { c.moveTo(gx, Y(z)); c.lineTo(gx + gw, Y(z)); } c.stroke();
    rich(c, 'neutron number *N* →', gx + gw, gy + gh + 16, { align: 'right', size: 11.5, color: C.muted });
    rich(c, 'proton number *Z* ↑', gx + 2, gy - 6, { size: 11.5, color: C.muted });
    for (let i = 1; i < path.length; i++) { const p0 = path[i - 1], p1 = path[i]; arrow(c, X(p0[0] - p0[1]), Y(p0[1]), X(p1[0] - p1[1]), Y(p1[1]), { color: p1[1] > p0[1] ? C.blue : C.red, width: 2, head: 9 }); }
    for (const p of path) dot(c, X(p[0] - p[1]), Y(p[1]), 4, alpha(C.ink2, .5));
    dot(c, X(N), Y(Z), 7, C.violet, C.paper2);
    rich(c, `${sym(Z)}-${A}`, X(N) + 10, Y(Z) - 10, { size: 12.5, color: C.violet, w: 700, bg: alpha(C.paper2, .85) });
    // nuclide box
    const bx = wide ? W * 0.05 : 12, by = wide ? H * 0.22 : 14, bw = wide ? W * 0.3 : W * 0.4, bh = wide ? H * 0.42 : H * 0.3;
    c.fillStyle = C.paper2; c.strokeStyle = C.ink2; c.lineWidth = 2; rrect(c, bx, by, bw, bh, 8); c.fill(); c.stroke();
    c.fillStyle = C.ink; c.font = FONT.disp(Math.min(46, bw * 0.3)); c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(sym(Z), bx + bw * 0.58, by + bh * 0.5);
    c.font = FONT.mono(Math.min(20, bw * 0.13), 600); c.textAlign = 'right';
    c.fillText(String(A), bx + bw * 0.34, by + bh * 0.36);
    c.fillStyle = C.blue; c.fillText(String(Z), bx + bw * 0.34, by + bh * 0.66);
    c.fillStyle = C.muted; c.font = FONT.ui(11); c.textAlign = 'center'; c.textBaseline = 'top';
    c.fillText('nucleon number A', bx + bw / 2, by + bh + 6);
    c.fillStyle = C.blue; c.fillText('proton number Z', bx + bw / 2, by + bh + 22);
    ro.set('A', String(A)); ro.set('Z', String(Z)); ro.set('N', String(N)); ro.set('el', sym(Z));
  }, [S]);
  const g = Group(P.side, 'Start from');
  const ss = el('select', { class: 'sel', id: 'de-s', 'aria-label': 'starting nuclide' }, START.map(([n], i) => el('option', { value: i }, n)));
  ss.addEventListener('change', () => { const [, a, z] = START[+ss.value]; A = a; Z = z; path = [[A, Z]]; last = null; render(); }); g.append(ss);
  const g2 = Group(P.side, 'Emit');
  const b = Btns(g2);
  Btn(b, 'α decay', () => emit('a'), 'pri'); Btn(b, 'β⁻ decay', () => emit('b'), 'pri'); Btn(b, 'γ emission', () => emit('g')); Btn(b, 'β⁺ decay', () => emit('bp'));
  Btn(Btns(g2), 'Reset', () => { const [, a, z] = START[+ss.value]; A = a; Z = z; path = [[A, Z]]; last = null; render(); });
  const eqBox = el('div', { class: 'eqbox', style: { textAlign: 'left', fontSize: '22px', minHeight: '40px' } }); g2.append(eqBox);
  const expl = el('div', { class: 'key' }); g2.append(expl);
  const ro = Readout(Group(P.side, 'Current nuclide'), [['el', 'Element', 'hl'], ['A', 'Nucleon number <i>A</i>'], ['Z', 'Proton number <i>Z</i>'], ['N', 'Neutrons <i>N</i> = <i>A</i> − <i>Z</i>']]);
  function nuc(a, z, s) { return `<span style="display:inline-flex;flex-direction:column;font-size:.52em;line-height:1.05;vertical-align:.1em;text-align:right;margin-right:.12em"><span>${a}</span><span style="color:var(--ps-blue)">${z}</span></span>${s}`; }
  function render() {
    if (!last) { eqBox.innerHTML = '<span class="muted" style="font-size:15px">Press a decay button to build the equation.</span>'; expl.innerHTML = ''; return; }
    const [a0, z0] = last.from;
    const parts = { a: [nuc(a0 - 4, z0 - 2, sym(z0 - 2)), nuc(4, 2, 'He')], b: [nuc(a0, z0 + 1, sym(z0 + 1)), nuc(0, -1, 'e')], bp: [nuc(a0, z0 - 1, sym(z0 - 1)), nuc(0, 1, 'e')], g: [nuc(a0, z0, sym(z0)), 'γ'] }[last.kind];
    eqBox.innerHTML = `${nuc(a0, z0, sym(z0))} → ${parts[0]} + ${parts[1]}`;
    expl.innerHTML = { a: '<b>Alpha:</b> A decreases by 4, Z decreases by 2. The nuclide moves two places down and two left on the chart.', b: '<b>Beta-minus:</b> a neutron turns into a proton, so Z increases by 1 and A is unchanged (plus an antineutrino).', bp: '<b>Beta-plus:</b> a proton turns into a neutron, so Z decreases by 1 and A is unchanged (plus a neutrino). <i>Extension beyond the CCEA list.</i>', g: '<b>Gamma:</b> the nucleus loses energy only. A and Z are unchanged — it usually follows an α or β decay that leaves the nucleus excited.' }[last.kind];
  }
  render();
  Card(P.below, 'The rules (4.6.2)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Emission</th><th>Change in A</th><th>Change in Z</th><th>What happens</th></tr>
  <tr><td>Alpha</td><td>−4</td><td>−2</td><td style="white-space:normal">Two protons and two neutrons leave as a helium nucleus</td></tr>
  <tr><td>Beta-minus</td><td>0</td><td>+1</td><td style="white-space:normal">A neutron becomes a proton and an electron is emitted</td></tr>
  <tr><td>Gamma</td><td>0</td><td>0</td><td style="white-space:normal">An excited nucleus loses energy as a photon</td></tr></table></div>
  <p style="margin-top:10px">Both nucleon number and proton number are <b>conserved</b>: the top numbers balance, and so do the bottom ones. That is how you find an unknown particle in an equation.</p>`);
  Drill(P.below, { title: 'Decay equation drill', cls: 'wide', gens: [
    () => { const [n, a, z] = pick(START.slice(0, 6)); const which = Math.random() < 0.5; return { q: `${n} (A = ${a}, Z = ${z}) emits an <b>alpha</b> particle. What is the <b>${which ? 'nucleon number A' : 'proton number Z'}</b> of the daughter nucleus?`, a: which ? a - 4 : z - 2, unit: '', tol: 0.001, steps: ['Alpha = ⁴₂He, so A drops by 4 and Z drops by 2', `${which ? `A: ${a} − 4 = ${a - 4}` : `Z: ${z} − 2 = ${z - 2}`}`] }; },
    () => { const [n, a, z] = pick(START); const which = Math.random() < 0.5; return { q: `${n} (A = ${a}, Z = ${z}) emits a <b>beta-minus</b> particle. Give the <b>${which ? 'nucleon number A' : 'proton number Z'}</b> of the daughter.`, a: which ? a : z + 1, unit: '', tol: 0.001, steps: ['β⁻ is ⁰₋₁e: A unchanged, Z increases by 1 (a neutron becomes a proton)', `${which ? `A stays ${a}` : `Z: ${z} + 1 = ${z + 1}`}`] }; },
    () => { const a = randi(200, 240), z = randi(80, 94), na = randi(1, 4); return { q: `A nucleus (A = ${a}, Z = ${z}) emits <b>${na} alpha</b> particles and <b>2 beta-minus</b> particles. Find the final proton number.`, a: z - 2 * na + 2, unit: '', tol: 0.001, steps: [`Each α: Z − 2 ⇒ −${2 * na}`, 'Each β⁻: Z + 1 ⇒ +2', `Z = ${z} − ${2 * na} + 2 = ${z - 2 * na + 2}`] }; },
  ] });
}

/* ---------- Lab C: random & exponential decay ---------- */
function mountDecay(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.5, minH: 200, maxH: 280, tag: 'each square is a nucleus' });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 360, plain: true });
  let N0 = 400, half = 8, speed = 1, t = 0, run = true, logMode = false, nuclei = [], hist = [], decayedRecent = 0, rateWin = [];
  function reset() { nuclei = Array.from({ length: N0 }, () => ({ alive: true, at: 0 })); t = 0; hist = [[0, N0]]; rateWin = []; }
  reset();
  const plot = new Plot(S2, {});
  L.loop(dt => {
    const lam = Math.log(2) / half;
    if (run) {
      const step = dt * speed; let dec = 0;
      for (const n of nuclei) if (n.alive && Math.random() < 1 - Math.exp(-lam * step)) { n.alive = false; n.at = t; dec++; }
      t += step; decayedRecent = dec;
      rateWin.push([t, dec / step]); if (rateWin.length > 40) rateWin.shift();
      const alive = nuclei.filter(n => n.alive).length;
      if (!hist.length || t - hist[hist.length - 1][0] > 0.05) hist.push([t, alive]);
      if (t > half * 6) run = false;
    }
    const alive = nuclei.filter(n => n.alive).length;
    // grid
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    const cols = Math.ceil(Math.sqrt(N0 * W / H)), rows = Math.ceil(N0 / cols);
    const cw = (W - 20) / cols, ch = (H - 20) / rows, s = Math.min(cw, ch) * 0.82;
    nuclei.forEach((n, i) => { const x = 10 + (i % cols) * cw, y = 10 + Math.floor(i / cols) * ch; c.fillStyle = n.alive ? C.violet : alpha(C.muted, .22); c.fillRect(x, y, s, s); });
    // graph
    S2.begin();
    const A0 = lam * N0;
    if (!logMode) Object.assign(plot, { xmin: 0, xmax: half * 6, ymin: 0, ymax: N0 * 1.08, xlabel: 'time *t* / s', ylabel: 'number of undecayed nuclei *N*' });
    else Object.assign(plot, { xmin: 0, xmax: half * 6, ymin: Math.log(Math.max(1, N0)) - 5, ymax: Math.log(N0) + 0.4, xlabel: 'time *t* / s', ylabel: 'ln *N*' });
    plot.axes();
    plot.curve(x => logMode ? Math.log(N0) - lam * x : N0 * Math.exp(-lam * x), { color: alpha(C.muted, .8), width: 1.6, dash: [5, 4], n: 300 });
    plot.curve(hist.map(([x, y]) => [x, logMode ? Math.log(Math.max(y, 0.5)) : y]), { color: C.violet, width: 2.2 });
    if (!logMode) for (let k = 1; k <= 4; k++) { const th = half * k; if (th <= plot.xmax) { plot.vline(th, { color: alpha(C.blue, .5) }); plot.hline(N0 / Math.pow(2, k), { color: alpha(C.blue, .35) }); plot.label(th, N0 / Math.pow(2, k), `*t*½ ×${k}`, { dx: 5, dy: -8, size: 11, color: C.blue }); } }
    else plot.label(plot.xmax * 0.55, Math.log(N0) - lam * plot.xmax * 0.55, `gradient = −*λ* = ${fix(-lam, 3)} s⁻¹`, { dx: 0, dy: -14, align: 'center', size: 12, color: C.violet, w: 600, bg: alpha(C.paper2, .85) });
    ro.set('N', `${alive} / ${N0}`); ro.set('t', `${fix(t, 1)} s`); ro.set('lam', `${fix(lam, 4)} s⁻¹`);
    ro.set('A', `${fix(lam * alive, 1)} s⁻¹`); ro.set('meas', rateWin.length ? `${fix(rateWin.slice(-8).reduce((a, b) => a + b[1], 0) / Math.min(8, rateWin.length), 1)} s⁻¹` : '—');
    ro.set('frac', `${fix(alive / N0 * 100, 1)}%`);
  }, [S1, S2]);
  const g = Group(P.side, 'Sample');
  Slider(g, { id: 'dc-N', label: 'Number of nuclei <i>N</i>₀', min: 50, max: 1200, step: 50, value: N0, fmt: v => fix(v, 0), oninput: v => { N0 = v; reset(); } });
  Slider(g, { id: 'dc-h', label: 'Half-life <i>t</i>½', min: 2, max: 20, step: 1, value: half, unit: 's', fmt: v => fix(v, 0), oninput: v => { half = v; reset(); } });
  Slider(g, { id: 'dc-s', label: 'Speed', min: 0.25, max: 4, step: 0.25, value: speed, fmt: v => fix(v, 2) + '×', oninput: v => speed = v });
  const b = Btns(g); const pb = Btn(b, '❚❚ Pause', () => { run = !run; pb.textContent = run ? '❚❚ Pause' : '▶ Run'; }, 'pri'); Btn(b, 'New sample', () => { reset(); run = true; pb.textContent = '❚❚ Pause'; });
  Switch(g, { label: 'Plot ln <i>N</i> against <i>t</i>', value: logMode, onchange: v => logMode = v });
  const ro = Readout(Group(P.side, 'Live'), [['N', 'Undecayed <i>N</i>', 'hl'], ['frac', 'Fraction left'], ['t', 'Time'], ['lam', 'Decay constant <i>λ</i> = 0.693/<i>t</i>½'], ['A', 'Activity <i>λN</i>'], ['meas', 'Measured decay rate']]);
  Note(P.side, 'Each nucleus decays at random: you cannot say <b>which</b> one is next, only the <b>probability</b>. With thousands of nuclei those random events average out into a smooth exponential — compare the jagged line with the dashed theory.');
  EqCard(P.below, 'Decay equations (4.6.3–4.6.7)', [['\\frac{\\Delta N}{\\Delta t} = -\\lambda N', 'activity A = λN'], ['A = A_0 e^{-\\lambda t}', 'also N = N₀e^{−λt}'], ['t_{1/2} = \\frac{0.693}{\\lambda}', '0.693 = ln 2'], ['\\ln N = \\ln N_0 - \\lambda t', 'straight line, gradient −λ']]);
  Card(P.below, 'Definitions to learn', list(['<b>Random:</b> every undecayed nucleus has the same probability of decaying in the next second, and you cannot predict which will go or when.', '<b>Exponential:</b> the activity is proportional to the number of undecayed nuclei, so equal time intervals give equal <b>fractional</b> decreases.', '<b>Decay constant λ:</b> the fraction of the undecayed nuclei that decay per second (unit s⁻¹).', '<b>Activity A:</b> the number of decays per second, measured in becquerel (Bq). A = λN.', '<b>Half-life:</b> the average time taken for the number of undecayed nuclei (or the activity) to fall to half its initial value.', 'Decay is unaffected by temperature, pressure or chemical state.']));
  Drill(P.below, { title: 'Decay drill', cls: 'wide', gens: [
    () => { const th = pick([5.3, 8.1, 28, 1600, 5730]); const lam = Math.log(2) / th; return { q: `A source has a half-life of <b>${th} years</b>. Find its decay constant in year⁻¹.`, a: lam, unit: 'year⁻¹', tol: 0.01, steps: ['λ = 0.693 / t½', `= 0.693 / ${th} = ${sci(lam, 3)} year⁻¹`] }; },
    () => { const A0 = randi(200, 9000), th = randi(2, 30), n = randi(1, 5); return { q: `A source of activity <b>${A0} Bq</b> has a half-life of <b>${th} hours</b>. Find its activity after <b>${n * th} hours</b>.`, a: A0 / Math.pow(2, n), unit: 'Bq', tol: 0.01, steps: [`${n * th} h is ${n} half-lives`, `A = ${A0} / 2^${n} = ${fix(A0 / Math.pow(2, n), 1)} Bq`] }; },
    () => { const A0 = randi(500, 5000), th = randi(4, 40), t = randi(5, 60); const lam = Math.log(2) / th; const A = A0 * Math.exp(-lam * t); return { q: `A source of initial activity <b>${A0} Bq</b> has half-life <b>${th} s</b>. Find its activity after <b>${t} s</b>.`, a: A, unit: 'Bq', tol: 0.02, steps: [`λ = 0.693/${th} = ${fix(lam, 4)} s⁻¹`, `A = A₀e^(−λt) = ${A0}e^(−${fix(lam, 4)}×${t})`, `A = ${fix(A, 1)} Bq`] }; },
    () => { const N = +rand(1, 9).toFixed(1), e = randi(18, 22), th = randi(2, 30); const lam = Math.log(2) / (th * 3600); const A = lam * N * Math.pow(10, e); return { q: `A sample contains <b>${N} × 10^${e}</b> undecayed nuclei with half-life <b>${th} hours</b>. Find its activity.`, a: A, unit: 'Bq', tol: 0.02, steps: [`λ = 0.693 / (${th} × 3600) = ${sci(lam, 3)} s⁻¹`, `A = λN = ${sci(lam, 3)} × ${N}×10^${e} = ${sci(A, 3)} Bq`] }; },
  ] });
}

/* ---------- Lab D: half-life experiment ---------- */
function mountHalfLife(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.4, minH: 220, maxH: 300, tag: 'protactinium generator + GM tube' });
  const S2 = L.stage(P.stageBox, { aspect: 2.3, minH: 260, maxH: 360, plain: true });
  const TRUE_HL = 71, BG = 0.55, A0 = 28;
  let t = 0, rows = [], counting = null, bgRows = [], logMode = false, started = false;
  const plot = new Plot(S2, {});
  const rateAt = tt => A0 * Math.exp(-Math.log(2) / TRUE_HL * tt) + BG;
  L.loop(dt => {
    if (started) t += dt * 4;
    if (counting) {
      counting.left -= dt * 4;
      counting.counts += (counting.bg ? BG : rateAt(counting.t0)) * dt * 4 + gauss() * Math.sqrt(Math.max(0.2, (counting.bg ? BG : rateAt(counting.t0)) * dt * 4));
      if (counting.left <= 0) {
        const n = Math.max(0, Math.round(counting.counts));
        if (counting.bg) bgRows.push(n / (counting.dur || 10)); else rows.push({ t: Math.round(counting.t0), n, rate: n / 10 });
        counting = null; render();
      }
    }
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h;
    // apparatus
    const bx = W * 0.14, by = H * 0.3, bw = 58, bh = H * 0.5;
    c.fillStyle = alpha(C.orange, .25); c.strokeStyle = C.ink2; c.lineWidth = 1.5; rrect(c, bx, by, bw, bh, 6); c.fill(); c.stroke();
    c.fillStyle = alpha(C.orange, .5); c.fillRect(bx + 2, by + bh * 0.45, bw - 4, bh * 0.5);
    rich(c, 'organic layer', bx + bw + 8, by + bh * 0.3, { size: 11, color: C.muted });
    rich(c, 'aqueous layer', bx + bw + 8, by + bh * 0.72, { size: 11, color: C.muted });
    rich(c, 'protactinium generator', bx + bw / 2, by + bh + 18, { align: 'center', size: 11.5, color: C.ink2, w: 600 });
    const gx = W * 0.55, gy = H * 0.34;
    c.fillStyle = C.paper3; c.strokeStyle = C.ink2; rrect(c, gx, gy, 90, 40, 8); c.fill(); c.stroke();
    rich(c, 'GM tube', gx + 45, gy + 20, { align: 'center', size: 12.5, w: 600, color: C.ink });
    line(c, [[gx + 90, gy + 20], [gx + 130, gy + 20]], { color: C.ink2, width: 2 });
    c.fillStyle = C.ink; rrect(c, gx + 130, gy - 4, 110, 48, 6); c.fill();
    const disp = counting ? `${Math.max(0, Math.round(counting.counts))}` : (rows.length ? `${rows[rows.length - 1].n}` : '0');
    rich(c, disp, gx + 185, gy + 12, { align: 'center', size: 20, mono: true, w: 700, color: C.green });
    rich(c, counting ? `counting… ${fix(Math.max(0, counting.left), 1)} s left` : 'counts in 10 s', gx + 185, gy + 34, { align: 'center', size: 10.5, color: alpha(C.paper2, .8) });
    rich(c, `clock: ${fix(t, 0)} s`, W - 14, 20, { align: 'right', size: 12.5, mono: true, color: C.ink2 });
    // graph
    S2.begin();
    const bgMean = bgRows.length ? bgRows.reduce((a, b) => a + b, 0) / bgRows.length : 0;
    const data = rows.map(r => ({ x: r.t, y: Math.max(0.01, r.rate - bgMean) }));
    if (!logMode) Object.assign(plot, { xmin: 0, xmax: Math.max(240, ...rows.map(r => r.t)) * 1.1, ymin: 0, ymax: Math.max(10, ...data.map(d => d.y)) * 1.2, xlabel: 'time *t* / s', ylabel: 'corrected count rate / s⁻¹' });
    else Object.assign(plot, { xmin: 0, xmax: Math.max(240, ...rows.map(r => r.t)) * 1.1, ymin: -1.5, ymax: Math.log(Math.max(10, ...data.map(d => d.y))) + 0.6, xlabel: 'time *t* / s', ylabel: 'ln(corrected rate)' });
    plot.axes();
    let lam = NaN;
    if (data.length >= 2) {
      const pts = data.map(d => [d.x, Math.log(d.y)]);
      const n = pts.length, mx = pts.reduce((a, b) => a + b[0], 0) / n, my = pts.reduce((a, b) => a + b[1], 0) / n;
      let sxy = 0, sxx = 0; for (const [x, y] of pts) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; }
      lam = -sxy / sxx; const b0 = my + lam * mx;
      if (logMode) plot.curve(x => b0 - lam * x, { color: C.green, width: 1.6 });
      else plot.curve(x => Math.exp(b0 - lam * x), { color: C.green, width: 1.6, n: 200 });
    }
    plot.cross(data.map(d => [d.x, logMode ? Math.log(d.y) : d.y]), { color: C.red, s: 5, width: 2 });
    if (!rows.length) rich(S2.ctx, 'Measure the background first, then take counts every 20–30 s', plot.x0 + plot.pw / 2, plot.y0 + plot.ph / 2, { align: 'center', size: 13, color: C.muted });
    if (!logMode && data.length >= 2) { const half = Math.log(2) / lam; plot.hline(data[0].y / 2, { color: alpha(C.blue, .4) }); }
    ro.set('bg', bgRows.length ? `${fix(bgMean, 2)} s⁻¹ (n=${bgRows.length})` : 'not measured'); ro.set('n', String(rows.length));
    ro.set('lam', isFinite(lam) ? `${fix(lam, 4)} s⁻¹` : '—'); ro.set('hl', isFinite(lam) ? `${fix(Math.log(2) / lam, 1)} s` : '—');
    ro.set('err', isFinite(lam) ? `${fix((Math.log(2) / lam - TRUE_HL) / TRUE_HL * 100, 1)}%` : '—');
  }, [S1, S2]);
  const g = Group(P.side, 'Procedure');
  const b1 = Btns(g);
  Btn(b1, 'Measure background (30 s)', () => { if (!counting) counting = { left: 30, counts: 0, t0: t, bg: true, dur: 30 }; });
  Btn(b1, 'Count for 10 s', () => { if (!counting) { started = true; counting = { left: 10, counts: 0, t0: t, bg: false, dur: 10 }; } }, 'pri');
  Btn(b1, 'Wait 20 s', () => { t += 20; });
  Btn(b1, 'Fresh sample', () => { t = 0; rows = []; counting = null; started = false; render(); });
  Switch(g, { label: 'Plot ln(rate) against <i>t</i>', value: logMode, onchange: v => logMode = v });
  const ro = Readout(Group(P.side, 'Analysis'), [['bg', 'Background rate'], ['n', 'Readings'], ['lam', 'λ from gradient'], ['hl', 'Half-life <i>t</i>½ = 0.693/λ', 'hl'], ['err', 'vs accepted 71 s']]);
  Note(P.side, 'Take a reading, press <b>Wait 20 s</b>, take another. Six or seven readings over about 4 minutes is plenty. Always subtract the background before plotting.');
  const tcard = Card(P.below, 'Results', null);
  const tbox = el('div', { class: 'tbl-wrap', style: { maxHeight: '260px', overflowY: 'auto' } }); tcard.append(tbox);
  function render() {
    const bgMean = bgRows.length ? bgRows.reduce((a, b) => a + b, 0) / bgRows.length : 0;
    tbox.innerHTML = `<table class="tbl"><tr><th>t / s</th><th>counts in 10 s</th><th>rate / s⁻¹</th><th>corrected / s⁻¹</th><th>ln(corrected)</th></tr>${rows.map(r => `<tr><td>${r.t}</td><td>${r.n}</td><td>${fix(r.rate, 2)}</td><td>${fix(Math.max(0.01, r.rate - bgMean), 2)}</td><td>${fix(Math.log(Math.max(0.01, r.rate - bgMean)), 2)}</td></tr>`).join('') || '<tr><td colspan="5" style="text-align:left;color:var(--ps-muted)">No readings yet.</td></tr>'}</table>`;
  }
  render();
  Card(P.below, 'Describing the experiment (4.6.8)', list(['Measure the <b>background count rate</b> first with no source present, over a long interval, and subtract it from every later reading.', 'Place the source a fixed distance from the GM tube (the protactinium generator is the standard school source: ²³⁴Pa, t½ ≈ 71 s).', 'Record the counts in a fixed interval (say 10 s) at regular times, for at least 4–5 half-lives.', 'Convert to count rate, subtract the background, and plot corrected count rate against time.', 'Read the half-life from the graph: the time to fall from any value to half of it. Repeat from several starting points and average.', 'Better: plot <b>ln(corrected rate) against t</b>. The gradient is −λ, and t½ = 0.693/λ. A straight line also proves the decay is exponential.'], true));
  Card(P.below, 'Safety & accuracy', list(['Handle sources with long tongs, point them away from people, keep exposure time short and return them to a lead-lined store.', 'Count rates are random, so repeat readings or count for longer intervals to reduce the percentage uncertainty (√N statistics).', 'A short half-life means you must work quickly; a long-lived source needs a different method (measure A and estimate N).']));
}

topic({
  id: 'decay', code: '4.6', unit: 'A2 1', title: 'Nuclear Decay', short: 'Decay',
  blurb: 'Alpha, beta and gamma: what gets through what, how the numbers balance in a decay equation, and why random events on a nuclear scale give a perfect exponential.',
  outcomes: [
    ['4.6.1', 'demonstrate an understanding of how the nature of alpha particles, beta particles and gamma radiation determines their penetration and range', 'penetration'],
    ['4.6.2', 'calculate changes to nucleon number and proton number as a result of emissions', 'equations'],
    ['4.6.3', 'demonstrate an understanding of the random and exponential nature of radioactive decay', 'random'],
    ['4.6.4', 'use the equation A = −λN, where λ is defined as the fraction per second of the decaying atoms', 'random'],
    ['4.6.5', 'use the equation A = A₀e^(−λt), where A is the activity', 'random'],
    ['4.6.6', 'define half-life', 'random'],
    ['4.6.7', 'use the equation t½ = 0.693/λ', 'random'],
    ['4.6.8', 'describe an experiment to measure half-life of a radioactive source', 'halflife'],
  ],
  labs: [
    { id: 'penetration', title: 'Penetration & range', hint: 'paper, aluminium, lead', spec: ['4.6.1'], mount: mountPenetration },
    { id: 'equations', title: 'Decay equations', hint: 'A and Z bookkeeping', spec: ['4.6.2'], mount: mountEquations },
    { id: 'random', title: 'Random & exponential decay', hint: '400 nuclei, live', spec: ['4.6.3', '4.6.4', '4.6.5', '4.6.6', '4.6.7'], mount: mountDecay },
    { id: 'halflife', title: 'Half-life experiment', hint: 'with background', spec: ['4.6.8'], mount: mountHalfLife },
  ],
  equations: [['A = -\\lambda N', 'activity, in Bq'], ['A = A_0 e^{-\\lambda t}', ''], ['N = N_0 e^{-\\lambda t}', ''], ['t_{1/2} = \\frac{0.693}{\\lambda}', ''], ['\\ln A = \\ln A_0 - \\lambda t', 'straight-line form']],
  traps: ['Subtract the <b>background</b> count rate before any half-life analysis.', 'λ has units s⁻¹ (or h⁻¹, y⁻¹) — keep time units consistent with the half-life.', 'A = λN links activity to the <b>number of undecayed nuclei</b>, not the mass.', 'Half-life is defined for the <b>average</b>: decay is random, so real data scatter.', 'In the exam, “random” means you cannot predict which nucleus or when; “exponential” means constant fractional decrease per unit time. Say both.', 'Gamma emission changes neither A nor Z.'],
});
})();

/* ================= 4.7 Nuclear energy ================= */
(() => {
const C_LIGHT = 3.00e8, U = 1.66e-27, MEV = 1.60e-13, U_MEV = 931.5, MN = 1.008665, MH = 1.007825;
const MASS = [
  ['Hydrogen-2 (deuterium)', 2, 1, 2.014102], ['Hydrogen-3 (tritium)', 3, 1, 3.016049], ['Helium-3', 3, 2, 3.016029], ['Helium-4', 4, 2, 4.002603],
  ['Lithium-7', 7, 3, 7.016003], ['Beryllium-9', 9, 4, 9.012182], ['Carbon-12', 12, 6, 12.000000], ['Nitrogen-14', 14, 7, 14.003074], ['Oxygen-16', 16, 8, 15.994915],
  ['Aluminium-27', 27, 13, 26.981539], ['Iron-56', 56, 26, 55.934937], ['Krypton-92', 92, 36, 91.926156], ['Strontium-90', 90, 38, 89.907738], ['Barium-141', 141, 56, 140.914411],
  ['Silver-107', 107, 47, 106.905097], ['Gold-197', 197, 79, 196.966569], ['Lead-208', 208, 82, 207.976652], ['Uranium-235', 235, 92, 235.043930], ['Uranium-238', 238, 92, 238.050788], ['Plutonium-239', 239, 94, 239.052163],
];
const BEA = [[2, 1.112], [3, 2.827], [4, 7.074], [6, 5.332], [7, 5.606], [9, 6.463], [12, 7.680], [14, 7.476], [16, 7.976], [20, 8.032], [24, 8.261], [27, 8.332], [32, 8.493], [40, 8.551], [48, 8.666], [56, 8.790], [62, 8.795], [84, 8.717], [90, 8.709], [107, 8.554], [120, 8.505], [141, 8.326], [184, 7.948], [197, 7.916], [208, 7.867], [235, 7.591], [238, 7.570]];
const KEY = { 2: '²H', 4: '⁴He', 12: '¹²C', 56: '⁵⁶Fe', 141: '¹⁴¹Ba', 92: '⁹²Kr', 235: '²³⁵U', 238: '²³⁸U' };

/* ---------- Lab A: mass defect & E = Δmc² ---------- */
function mountMassEnergy(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.0, minH: 300, maxH: 400, mobileAspect: 1.0 });
  let sel = 3;
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const [nm, A, Z, mAtom] = MASS[sel], N = A - Z;
    const mParts = Z * MH + N * MN, dm = mParts - mAtom, be = dm * U_MEV, bea = be / A;
    // bars
    const x0 = 24, bw = W - 48, y1 = H * 0.3, y2 = H * 0.52, bh = 30;
    const scale = bw / mParts;
    c.fillStyle = alpha(C.blue, .35); c.fillRect(x0, y1, mParts * scale, bh); c.strokeStyle = C.blue; c.lineWidth = 1.2; c.strokeRect(x0, y1, mParts * scale, bh);
    c.fillStyle = alpha(C.violet, .35); c.fillRect(x0, y2, mAtom * scale, bh); c.strokeStyle = C.violet; c.strokeRect(x0, y2, mAtom * scale, bh);
    rich(c, `${Z} protons + ${N} neutrons, separate:  ${fix(mParts, 6)} u`, x0 + 8, y1 + bh / 2, { size: 12.5, color: C.ink, w: 600 });
    rich(c, `${nm} nucleus, assembled:  ${fix(mAtom, 6)} u`, x0 + 8, y2 + bh / 2, { size: 12.5, color: C.ink, w: 600 });
    // the gap, magnified
    const gx = x0 + mAtom * scale, gw = Math.max(2, dm * scale);
    c.fillStyle = C.red; c.fillRect(gx, y2, gw, bh);
    const zx = x0 + bw * 0.62, zy = H * 0.72, zw = bw * 0.34, zh = 26;
    line(c, [[gx, y2 + bh], [zx, zy]], { color: alpha(C.red, .5), width: 1, dash: [3, 3] }); line(c, [[gx + gw, y2 + bh], [zx + zw, zy]], { color: alpha(C.red, .5), width: 1, dash: [3, 3] });
    c.fillStyle = alpha(C.red, .25); c.fillRect(zx, zy, zw, zh); c.strokeStyle = C.red; c.strokeRect(zx, zy, zw, zh);
    rich(c, `mass defect Δ*m* = ${fix(dm, 5)} u  (×${fix(bw / gw, 0)} zoom)`, zx + zw / 2, zy + zh / 2, { align: 'center', size: 12, color: C.red, w: 600 });
    rich(c, 'The assembled nucleus has LESS mass than its parts. That missing mass is the binding energy.', x0, H * 0.14, { size: 13, color: C.ink2 });
    rich(c, `binding energy = Δ*mc*² = ${fix(be, 1)} MeV`, x0, zy + 12, { size: 15, color: C.violet, w: 700 });
    rich(c, `per nucleon = ${fix(bea, 3)} MeV`, x0, zy + 34, { size: 13.5, color: C.ink2 });
    ro.set('mp', `${fix(mParts, 6)} u`); ro.set('mn', `${fix(mAtom, 6)} u`); ro.set('dm', `${fix(dm, 5)} u = ${sci(dm * U, 3)} kg`);
    ro.set('be', `${fix(be, 1)} MeV = ${sci(be * MEV, 3)} J`); ro.set('bea', `${fix(bea, 3)} MeV`);
  }, [S]);
  const g = Group(P.side, 'Nuclide');
  const ss = el('select', { class: 'sel', id: 'me-n', 'aria-label': 'nuclide' }, MASS.map(([n], i) => el('option', { value: i }, n)));
  ss.value = sel; ss.addEventListener('change', () => sel = +ss.value); g.append(ss);
  const ro = Readout(Group(P.side, 'Mass defect'), [['mp', 'Separate nucleons'], ['mn', 'Nuclide'], ['dm', 'Mass defect Δ<i>m</i>', 'hl'], ['be', 'Binding energy', 'hl'], ['bea', 'BE per nucleon']]);
  Note(P.side, '<b>Binding energy</b> is the energy needed to pull a nucleus completely apart into separate nucleons — equivalently the energy released when it is assembled. 1 u is equivalent to 931.5 MeV.');
  // general converter
  const conv = Card(P.below, 'E = Δmc² converter (4.7.1–4.7.2)', null);
  const mi = el('input', { class: 'num', id: 'me-m', value: '1', inputmode: 'decimal', 'aria-label': 'mass' });
  const mu = el('select', { class: 'sel', id: 'me-u' }, [['kg', 1], ['g', 1e-3], ['u', U], ['MeV/c²', MEV / (C_LIGHT * C_LIGHT)]].map(([t]) => el('option', { value: t }, t)));
  const out = el('div', { class: 'eqbox', style: { textAlign: 'left' } });
  const calc = () => { const f = { kg: 1, g: 1e-3, u: U, 'MeV/c²': MEV / (C_LIGHT * C_LIGHT) }[mu.value]; const m = parseNum(mi.value) * f; if (!isFinite(m)) { out.textContent = 'Type a number'; return; }
    const E = m * C_LIGHT * C_LIGHT;
    out.innerHTML = `${tex('E = \\Delta mc^2')} = ${sci(m, 3)} × (3.00×10⁸)² = <b style="color:var(--ps-blue)">${sci(E, 3)} J</b> = ${sci(E / MEV, 3)} MeV<div class="muted" style="font-size:13px;margin-top:6px">That is ${num(E / 3.6e6, 3)} kWh — about ${num(E / 3.6e6 / 3000, 2)} years of a typical home’s electricity for every ${mi.value} ${mu.value}.</div>`; };
  [mi, mu].forEach(x => x.addEventListener('input', calc));
  conv.append(el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' } }, mi, mu), out); calc();
  Card(P.below, 'It applies to every energy change (4.7.2)', list(['Whenever a system <b>releases</b> energy, its mass falls by Δ<i>m</i> = <i>E</i>/<i>c</i>². This is true for nuclear reactions, chemical reactions, a stretched spring or a hot cup of tea.', 'Because <i>c</i>² is so huge (9 × 10¹⁶), everyday energy changes correspond to unmeasurably tiny mass changes: burning 1 kg of petrol loses about 5 × 10⁻¹⁰ kg.', 'In nuclear reactions the fractional mass change is about 10⁷ times bigger, which is why nuclear fuels release so much more energy per kilogram.', 'The Sun converts about 4.3 × 10⁹ kg of mass into energy every second.']));
  Drill(P.below, { title: 'Mass–energy drill', cls: 'wide', gens: [
    () => { const m = +rand(0.5, 9).toFixed(2), e = randi(-6, 0); const mm = m * Math.pow(10, e); return { q: `Find the energy equivalent of a mass of <b>${sci(mm, 3)} kg</b> (c = 3.00 × 10⁸ m s⁻¹).`, a: mm * C_LIGHT * C_LIGHT, unit: 'J', tol: 0.02, steps: ['E = Δmc²', `= ${sci(mm, 3)} × (3.00×10⁸)² = ${sci(mm * C_LIGHT * C_LIGHT, 3)} J`] }; },
    () => { const [n, A, Z, ma] = pick(MASS); const dm = Z * MH + (A - Z) * MN - ma; return { q: `<b>${n}</b> has a mass defect of <b>${fix(dm, 5)} u</b>. Find its binding energy in MeV (1 u ≡ 931.5 MeV).`, a: dm * U_MEV, unit: 'MeV', tol: 0.02, steps: [`E = Δm × 931.5`, `= ${fix(dm, 5)} × 931.5 = ${fix(dm * U_MEV, 1)} MeV`] }; },
    () => { const E = randi(2, 200) * 1e6 * MEV; return { q: `A reaction releases <b>${sci(E, 3)} J</b>. Find the mass lost.`, a: E / (C_LIGHT * C_LIGHT), unit: 'kg', tol: 0.02, steps: ['Δm = E/c²', `= ${sci(E, 3)} / 9.00×10¹⁶ = ${sci(E / (C_LIGHT * C_LIGHT), 3)} kg`] }; },
  ] });
}

/* ---------- Lab B: binding energy per nucleon curve ---------- */
function mountBEA(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 340, maxH: 470, mobileAspect: 1.0 });
  let show = 'none', anim = 0, selA = 56;
  const plot = new Plot(S, { xmin: 0, xmax: 250, ymin: 0, ymax: 9.6, xlabel: 'nucleon number *A*', ylabel: 'binding energy per nucleon / MeV' });
  const bea = A => { let best = null; for (const [a, b] of BEA) { const d = Math.abs(a - A); if (!best || d < best[0]) best = [d, b, a]; } // interpolate between neighbours
    const below = BEA.filter(p => p[0] <= A).pop(), above = BEA.find(p => p[0] >= A);
    if (below && above && above[0] !== below[0]) return below[1] + (above[1] - below[1]) * (A - below[0]) / (above[0] - below[0]);
    return best[1]; };
  Pointer(S, { scroll: true, hit: (x, y) => plot.inside(x, y, 10) ? 'p' : null, move: (t, x) => { selA = clamp(Math.round(plot.ix(x)), 2, 245); } });
  L.loop(dt => {
    anim = (anim + dt * 0.35) % 1;
    const c = S.begin(), C = Theme.c; plot.layout(); plot.axes();
    plot.curve(BEA.map(([a, b]) => [a, b]), { color: C.violet, width: 2.4 });
    plot.dots(BEA.map(([a, b]) => [a, b]), { color: C.violet, r: 3 });
    for (const [a, lab] of Object.entries(KEY)) { const A = +a; const b = BEA.find(p => p[0] === A); if (b) plot.label(A, b[1], lab, { dx: A > 120 ? -8 : 6, dy: A === 56 ? -14 : A === 238 ? 26 : 12, align: A > 120 ? 'right' : 'left', color: C.ink2, size: 12, w: 600 }); }
    // Fe peak
    plot.vline(56, { color: alpha(C.red, .4) });
    plot.label(56, 9.3, 'most stable: ⁵⁶Fe', { dx: 8, color: C.red, size: 12, w: 600 });
    rich(c, 'fusion →', plot.X(20), plot.Y(3.2), { size: 13, color: C.green, w: 700 });
    rich(c, '← fission', plot.X(215), plot.Y(3.2), { size: 13, color: C.orange, w: 700, align: 'right' });
    if (show === 'fission') {
      const from = [235, bea(235)], to1 = [141, bea(141)], to2 = [92, bea(92)];
      for (const t2 of [to1, to2]) { const x = lerp(from[0], t2[0], anim), y = lerp(from[1], t2[1], anim); plot.dots([[x, y]], { color: C.orange, r: 6 }); }
      plot.dots([from, to1, to2], { color: C.orange, r: 5, stroke: C.paper2 });
      const rel = (to1[1] * 141 + to2[1] * 92) - from[1] * 235;
      plot.label(160, 5.4, `²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n`, { size: 13, color: C.orange, w: 700, align: 'center' });
      plot.label(160, 4.7, `energy released ≈ ${fix(rel, 0)} MeV`, { size: 13, color: C.orange, w: 700, align: 'center' });
    }
    if (show === 'fusion') {
      const from1 = [2, bea(2)], from2 = [3, 2.827], to = [4, bea(4)];
      const x = lerp(2.5, 4, anim), y = lerp(2, bea(4), anim);
      plot.dots([[x, y]], { color: C.green, r: 6 }); plot.dots([from1, from2, to], { color: C.green, r: 5, stroke: C.paper2 });
      plot.label(60, 5.4, `²H + ³H → ⁴He + n`, { size: 13, color: C.green, w: 700, align: 'center' });
      plot.label(60, 4.7, `energy released ≈ 17.6 MeV`, { size: 13, color: C.green, w: 700, align: 'center' });
    }
    const b = bea(selA);
    plot.dots([[selA, b]], { color: C.blue, r: 6, stroke: C.paper2 });
    plot.label(selA, b, `*A* = ${selA}: ${fix(b, 2)} MeV/nucleon`, { dx: 0, dy: 22, align: 'center', size: 12, color: C.blue, w: 600, bg: alpha(C.paper2, .9) });
    ro.set('A', String(selA)); ro.set('b', `${fix(b, 2)} MeV`); ro.set('tot', `${fix(b * selA, 0)} MeV`);
    const msg = selA < 50 ? 'Below the peak: <b>fusing</b> with another light nucleus releases energy.' : selA > 62 ? 'Above the peak: <b>splitting</b> releases energy.' : 'The most stable region — neither fission nor fusion releases much.'; if (stNote._m !== msg) { stNote._m = msg; stNote.innerHTML = msg; }
  }, [S]);
  const g = Group(P.side, 'Show');
  Seg(g, { options: [['none', 'Curve only'], ['fission', 'Fission'], ['fusion', 'Fusion']], value: show, onchange: v => show = v });
  Slider(g, { id: 'be-A', label: 'Inspect <i>A</i>', min: 2, max: 245, step: 1, value: selA, fmt: v => fix(v, 0), oninput: v => selA = v });
  const ro = Readout(Group(P.side, 'At this nucleon number'), [['A', '<i>A</i>'], ['b', 'BE per nucleon', 'hl'], ['tot', 'Total binding energy']]);
  const stNote = Note(P.side, '', 'flag info');
  Note(P.side, 'Energy is released whenever the products end up <b>higher</b> on this curve than the reactants: more binding energy per nucleon means a more tightly bound, lower-energy nucleus.');
  Card(P.below, 'Describing the curve (4.7.3)', list(['It rises steeply for light nuclei, with ⁴He unusually high for its size.', 'It reaches a maximum of about <b>8.8 MeV per nucleon near A ≈ 56 (iron)</b>: these nuclei are the most stable.', 'Beyond the peak it falls slowly, because the repulsion between the growing number of protons acts across the whole nucleus while the strong force is short-range.', 'Nuclei on either side move towards the peak when they react, which is why energy comes out of both fusion (light) and fission (heavy).']));
  Card(P.below, 'Fission vs fusion (4.7.4)', `<div class="tbl-wrap"><table class="tbl"><tr><th></th><th>Fission</th><th>Fusion</th></tr>
    <tr><td>Nuclei</td><td style="white-space:normal">Heavy (A &gt; 56) split into two medium fragments</td><td style="white-space:normal">Light (A &lt; 56) join into a heavier nucleus</td></tr>
    <tr><td>On the curve</td><td style="white-space:normal">Moves from ~7.6 up to ~8.5 MeV/nucleon</td><td style="white-space:normal">Moves from ~1–3 up to ~7 MeV/nucleon</td></tr>
    <tr><td>Typical release</td><td>≈ 200 MeV per fission</td><td>≈ 17.6 MeV per D–T fusion</td></tr>
    <tr><td>Per nucleon</td><td>≈ 0.9 MeV</td><td>≈ 3.5 MeV</td></tr></table></div>
    <p style="margin-top:10px">Per nucleon, fusion releases about four times as much as fission — that is why it is worth the engineering difficulty.</p>`);
  Drill(P.below, { title: 'Binding energy drill', cls: 'wide', gens: [
    () => { const A = pick([56, 120, 197, 235]); const b = BEA.find(p => p[0] === A)[1]; return { q: `A nuclide with <b>A = ${A}</b> has a binding energy per nucleon of <b>${b} MeV</b>. Find its total binding energy.`, a: b * A, unit: 'MeV', tol: 0.01, steps: ['Total = (BE per nucleon) × A', `= ${b} × ${A} = ${fix(b * A, 0)} MeV`] }; },
    () => ({ q: 'Why does fission of a heavy nucleus release energy?', options: ['The fragments have a higher binding energy per nucleon than the original nucleus', 'The fragments have more nucleons in total', 'The fragments are further left on the curve', 'Because the neutrons carry away mass'], correct: 0, why: 'Products are more tightly bound, so mass is lost and released as energy (Δmc²).' }),
    () => { const be1 = 7.59, be2 = 8.45, A = 235; return { q: `²³⁵U has BE/nucleon <b>${be1} MeV</b>. Its fragments average <b>${be2} MeV</b>. Estimate the energy released per fission.`, a: (be2 - be1) * A, unit: 'MeV', tol: 0.03, steps: ['Energy released = (increase in BE per nucleon) × number of nucleons', `= (${be2} − ${be1}) × ${A} = ${fix((be2 - be1) * A, 0)} MeV`] }; },
  ] });
}

topic({
  id: 'energy', code: '4.7', unit: 'A2 1', title: 'Nuclear Energy', short: 'Nuclear energy',
  blurb: 'Mass is energy. Weigh a nucleus against its parts, turn the difference into MeV, and read the binding-energy curve that explains both fission and fusion.',
  outcomes: [
    ['4.7.1', 'demonstrate an understanding of the equivalence of mass and energy', 'mass'],
    ['4.7.2', 'recall and use the equation E = Δmc² and demonstrate that it applies to all energy changes', 'mass'],
    ['4.7.3', 'describe how the binding energy per nucleon varies with mass number', 'bea'],
    ['4.7.4', 'describe the principles of fission and fusion with reference to the binding energy per nucleon curve', 'bea'],
  ],
  labs: [
    { id: 'mass', title: 'Mass defect & E = Δmc²', hint: 'weigh the parts', spec: ['4.7.1', '4.7.2'], mount: mountMassEnergy },
    { id: 'bea', title: 'Binding energy curve', hint: 'fission ← ⁵⁶Fe → fusion', spec: ['4.7.3', '4.7.4'], mount: mountBEA },
  ],
  equations: [['E = \\Delta mc^2', ''], ['1\\,\\text{u} \\equiv 931.5\\,\\text{MeV}', ''], ['1\\,\\text{MeV} = 1.60\\times10^{-13}\\,\\text{J}', ''], ['\\Delta m = Zm_p + Nm_n - m_{nucleus}', 'mass defect']],
  traps: ['c² = 9.00 × 10¹⁶, and mass must be in <b>kg</b> for an answer in joules.', 'Mass defect is tiny: keep <b>6 significant figures</b> in the masses or you lose it in rounding.', 'Binding energy is the energy to <b>separate</b> the nucleons — it is not stored inside the nucleus as potential energy you can tap directly.', 'Compare <b>binding energy per nucleon</b>, not total binding energy, when judging stability.', 'Both fission and fusion move nuclei <b>towards</b> iron-56.'],
});
})();

/* ================= 4.8 Nuclear fission and fusion ================= */
(() => {
/* ---------- Lab A: fission reactor ---------- */
function mountReactor(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 450, mobileAspect: 1.0 });
  const S2 = L.stage(P.stageBox, { aspect: 3.0, minH: 170, maxH: 230, plain: true });
  let rods = 0.45, size = 1.0, moderator = true, auto = false, run = true;
  let neutrons = [], fissions = 0, produced = 0, lost = 0, t = 0, powerHist = [], power = 0, shutdown = false;
  const NROD = 7;
  function core() { const W = S1.w, H = S1.h; const cw = W * 0.5 * size, ch = H * 0.62 * size; return { x: W * 0.36 - cw / 2, y: H * 0.5 - ch / 2, w: cw, h: ch }; }
  function seed(n) { const c = core(); for (let i = 0; i < n; i++) { const a = rand(0, TAU); neutrons.push({ x: c.x + rand(0.2, 0.8) * c.w, y: c.y + rand(0.2, 0.8) * c.h, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, fast: true }); } }
  seed(6);
  L.loop(dt => {
    const c = S1.begin(), C = Theme.c, co = core(), W = S1.w, H = S1.h;
    if (run) {
      t += dt;
      if (auto) { const k = lost > 3 ? produced / lost : 1; rods = clamp(rods + (k - 1) * dt * 1.6, 0, 1); }
      const rodW = co.w / (NROD * 2.2);
      for (let i = neutrons.length - 1; i >= 0; i--) {
        const n = neutrons[i];
        n.x += n.vx * dt; n.y += n.vy * dt;
        // leakage
        if (n.x < co.x || n.x > co.x + co.w || n.y < co.y || n.y > co.y + co.h) { neutrons.splice(i, 1); lost++; continue; }
        // moderator slows
        if (moderator && n.fast && Math.random() < dt * 2.2) { const s = hyp(n.vx, n.vy) * 0.55; const a = rand(0, TAU); n.vx = Math.cos(a) * s; n.vy = Math.sin(a) * s; if (s < 70) n.fast = false; }
        // control rods (between fuel rods, inserted from the top)
        for (let r = 0; r < NROD - 1; r++) {
          const cx = co.x + co.w * (r + 1) / NROD;
          if (Math.abs(n.x - cx) < rodW * 0.5 && n.y < co.y + co.h * rods) { if (Math.random() < dt * 30) { neutrons.splice(i, 1); lost++; } break; }
        }
        if (!neutrons[i]) continue;
        // fuel rods
        for (let r = 0; r < NROD; r++) {
          const fx = co.x + co.w * (r + 0.5) / NROD;
          if (Math.abs(n.x - fx) < rodW * 0.6) {
            const pf = n.fast ? 0.25 : 3.2;
            if (Math.random() < dt * pf) {
              neutrons.splice(i, 1); lost++; fissions++;
              const k = Math.random() < 0.5 ? 2 : 3; produced += k;
              for (let q = 0; q < k; q++) { const a = rand(0, TAU); neutrons.push({ x: fx, y: n.y, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, fast: true, born: t }); }
            }
            break;
          }
        }
      }
      if (neutrons.length > 900) neutrons.length = 900;
      if (neutrons.length === 0 && !shutdown) { shutdown = true; }
      if (neutrons.length > 0) shutdown = false;
      power += (fissions * 200 * 1.6e-13 * 1e18 / 1e6 - power) * Math.min(1, dt * 2); // MW (scaled)
      if (t > 0.4) { powerHist.push([t, neutrons.length]); if (powerHist.length > 400) powerHist.shift(); fissions = 0; }
      if (produced + lost > 600) { produced *= 0.7; lost *= 0.7; }
    }
    // shielding
    c.fillStyle = alpha(C.ink2, .18); c.fillRect(co.x - 26, co.y - 26, co.w + 52, co.h + 52);
    c.strokeStyle = C.ink2; c.lineWidth = 1; c.strokeRect(co.x - 26, co.y - 26, co.w + 52, co.h + 52);
    rich(c, 'concrete shielding', co.x - 24, co.y - 34, { size: 11, color: C.ink2 });
    // moderator / coolant
    c.fillStyle = moderator ? alpha(C.blue, .1) : alpha(C.orange, .08); c.fillRect(co.x, co.y, co.w, co.h);
    c.strokeStyle = C.line2; c.strokeRect(co.x, co.y, co.w, co.h);
    rich(c, moderator ? 'moderator (water / graphite)' : 'NO moderator', co.x + 6, co.y + co.h - 12, { size: 11, color: moderator ? C.blue : C.red });
    // coolant arrows
    for (let i = 0; i < 3; i++) { const y = co.y + co.h * (0.2 + i * 0.3); arrow(c, co.x - 18, y, co.x - 4, y, { color: C.cyan, width: 1.6, head: 6 }); arrow(c, co.x + co.w + 4, y, co.x + co.w + 18, y, { color: C.red, width: 1.6, head: 6 }); }
    rich(c, 'coolant in', co.x - 22, co.y + co.h * 0.14, { size: 10, color: C.cyan, align: 'right' });
    rich(c, 'hot coolant out → heat exchanger → steam → turbine', co.x + co.w + 22, co.y + co.h * 0.14, { size: 10.5, color: C.red });
    // fuel + control rods
    const rodW = co.w / (NROD * 2.2);
    for (let r = 0; r < NROD; r++) { const fx = co.x + co.w * (r + 0.5) / NROD; c.fillStyle = alpha(C.green, .5); c.fillRect(fx - rodW * 0.6, co.y, rodW * 1.2, co.h); }
    for (let r = 0; r < NROD - 1; r++) { const cx = co.x + co.w * (r + 1) / NROD; c.fillStyle = C.ink; c.fillRect(cx - rodW * 0.5, co.y - 22, rodW, 22 + co.h * rods); }
    rich(c, 'fuel rods (enriched ²³⁵U)', co.x + 6, co.y + 12, { size: 11, color: C.green, w: 600 });
    rich(c, 'control rods (boron)', co.x + co.w - 6, co.y - 34, { size: 11, color: C.ink, align: 'right', w: 600 });
    // neutrons
    for (const n of neutrons) dot(c, n.x, n.y, n.fast ? 3 : 4, n.fast ? C.orange : C.violet);
    // key
    rich(c, '● fast neutron', W - 14, H - 34, { size: 11, color: C.orange, align: 'right' });
    rich(c, '● slow (thermal) neutron — these cause fission', W - 14, H - 18, { size: 11, color: C.violet, align: 'right' });
    // graph
    S2.begin(); const pl = new Plot(S2, { xmin: Math.max(0, t - 30), xmax: Math.max(30, t), ymin: 0, ymax: Math.max(40, ...powerHist.map(p => p[1])) * 1.2, xlabel: 'time / s', ylabel: 'neutron population', pad: { l: 58, r: 14, t: 14, b: 34 } });
    pl.axes(); pl.curve(powerHist, { color: C.violet, width: 2 });
    const k = lost > 3 ? produced / lost : 1;
    const state = neutrons.length === 0 ? ['shut down', C.muted] : k > 1.04 ? ['SUPERCRITICAL — power rising', C.red] : k < 0.96 ? ['subcritical — dying away', C.blue] : ['critical — steady output', C.green];
    ro.set('n', String(neutrons.length)); ro.set('k', fix(k, 2)); ro.set('st', `<span style="color:${state[1]}">${state[0]}</span>`);
    ro.set('p', `${fix(power, 0)} MW`); ro.set('rods', `${fix(rods * 100, 0)}% inserted`);
  }, [S1, S2]);
  const g = Group(P.side, 'Reactor controls');
  const sr = Slider(g, { id: 'rx-r', label: 'Control rod insertion', min: 0, max: 1, step: 0.01, value: rods, fmt: v => fix(v * 100, 0) + '%', oninput: v => { rods = v; auto = false; } });
  Slider(g, { id: 'rx-s', label: 'Core size', min: 0.5, max: 1.3, step: 0.05, value: size, fmt: v => fix(v, 2) + '×', oninput: v => size = v });
  Switch(g, { label: 'Moderator present', value: moderator, onchange: v => moderator = v });
  Switch(g, { label: 'Automatic control (hold k = 1)', value: auto, onchange: v => auto = v });
  const b = Btns(g); Btn(b, 'Inject neutrons', () => seed(8), 'pri'); Btn(b, 'SCRAM (rods in)', () => { rods = 1; sr.set(1); auto = false; }); Btn(b, 'Restart', () => { neutrons = []; produced = lost = 0; powerHist = []; seed(6); });
  const ro = Readout(Group(P.side, 'Core'), [['st', 'State', 'hl'], ['k', 'Multiplication factor <i>k</i>'], ['n', 'Neutrons in core'], ['p', 'Thermal power (scaled)'], ['rods', 'Control rods']]);
  Note(P.side, 'Try it: pull the rods out and the population runs away (supercritical). Push them in and it dies. Shrink the core below the <b>critical size</b> and it dies whatever you do, because too many neutrons escape through the surface.');
  Note(P.side, 'Switch the <b>moderator</b> off: fast neutrons rarely cause fission in ²³⁵U, so the chain reaction stops.');
  Card(P.below, 'Reactor components (4.8.1)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Term</th><th>What it means</th></tr>
    <tr><td>Chain reaction</td><td style="white-space:normal">Each fission releases 2–3 neutrons, which go on to cause further fissions. Self-sustaining when on average exactly one neutron from each fission causes the next (k = 1).</td></tr>
    <tr><td>Critical size</td><td style="white-space:normal">The minimum size of the core needed for a chain reaction: below it, too large a fraction of neutrons escape from the surface before causing fission.</td></tr>
    <tr><td>Moderator</td><td style="white-space:normal">Water or graphite. Neutrons collide with its light nuclei and slow down to thermal speeds, because slow neutrons are far more likely to cause fission in ²³⁵U.</td></tr>
    <tr><td>Control rods</td><td style="white-space:normal">Boron or cadmium. They <b>absorb</b> neutrons; pushing them in reduces the number available, so the rate of fission falls and the output is controlled.</td></tr>
    <tr><td>Cooling system</td><td style="white-space:normal">A coolant (water, CO₂ or liquid sodium) carries thermal energy from the core to a heat exchanger, producing steam to drive a turbine and generator.</td></tr>
    <tr><td>Shielding</td><td style="white-space:normal">Thick concrete and steel around the core absorb the neutrons and gamma radiation that escape, protecting the operators.</td></tr></table></div>`);
  Card(P.below, 'Nuclear power: the arguments (4.8.2)', `<div class="split-lists" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">
    <div><h3 style="font-size:12px">For</h3>${list(['Very high energy density: 1 kg of ²³⁵U ≈ 2–3 million kg of coal.', 'No CO₂ or other greenhouse gases from generation, so it helps with climate targets.', 'Reliable base-load output, unlike wind and solar which depend on the weather.', 'Fuel reserves are large and come from politically stable countries; it reduces dependence on imported gas.'])}</div>
    <div><h3 style="font-size:12px">Against</h3>${list(['High-level radioactive waste stays dangerous for thousands of years and needs deep geological storage.', 'Very high build cost and long construction times, plus expensive decommissioning at the end of life.', 'Accident risk: Chernobyl and Fukushima made large areas uninhabitable.', 'Security: fissile material and reactor technology can be diverted towards weapons, so plants need international safeguards (IAEA).', 'Thermal pollution of rivers and coastal water from cooling, and mining impacts from uranium extraction.'])}</div></div>
    <p class="muted" style="margin-top:10px;font-size:13px">In the exam, name the <b>category</b> (social, environmental, security, economic) and give a specific point for each — not just “it’s dangerous”.</p>`);
  Drill(P.below, { title: 'Reactor drill', cls: 'wide', gens: [
    () => ({ q: 'What is the purpose of the moderator?', options: ['To slow neutrons so they are more likely to cause fission', 'To absorb neutrons and control the reaction', 'To carry heat away from the core', 'To stop gamma radiation escaping'], correct: 0, why: 'Thermal (slow) neutrons are far more likely to be captured by ²³⁵U and cause fission.' }),
    () => ({ q: 'The control rods are pushed further into the core. What happens?', options: ['More neutrons are absorbed, so the fission rate falls', 'More neutrons are produced, so the power rises', 'The neutrons are slowed down more', 'The coolant flow increases'], correct: 0, why: 'Control rods absorb neutrons; the multiplication factor k drops below 1 and the reaction slows.' }),
    () => { const E = 200 * 1.6e-13, P = randi(200, 1600) * 1e6; return { q: `A reactor produces <b>${P / 1e6} MW</b> of thermal power. If each fission releases <b>200 MeV</b>, how many fissions happen per second?`, a: P / E, unit: 's⁻¹', tol: 0.02, steps: [`200 MeV = 200 × 1.6×10⁻¹³ = ${sci(E, 3)} J`, `rate = P/E = ${sci(P, 3)} / ${sci(E, 3)} = ${sci(P / E, 3)} per second`] }; },
  ] });
}

/* ---------- Lab B: fusion / ITER ---------- */
const PARTS = {
  plasma: ['Plasma', 'The fuel at over 100 million K: deuterium and tritium are fully ionised, so it is a gas of bare nuclei and free electrons. Being charged is what lets magnetic fields hold it.'],
  vessel: ['Vacuum vessel', 'The doughnut-shaped steel chamber that holds the plasma. It is pumped to a very low pressure so that air molecules cannot cool or contaminate the fuel.'],
  blanket: ['Blanket', 'Lines the inside of the vessel. It absorbs the 14 MeV neutrons, turning their kinetic energy into heat (which would raise steam in a power station), shields the magnets, and contains lithium to <b>breed tritium</b>: n + ⁶Li → ⁴He + ³H.'],
  coil: ['Magnetic field coils', 'Superconducting coils produce the toroidal field; a current in the plasma and the poloidal coils twist it into a helix. The combined field keeps the charged particles spiralling around field lines and away from the walls.'],
  divertor: ['Divertor', 'At the bottom of the vessel: it extracts helium “ash” and impurities and handles the largest heat loads.'],
  solenoid: ['Central solenoid', 'A changing current here induces the plasma current: this both heats the plasma (ohmic heating) and creates part of the confining field.'],
};
function mountFusion(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.55, minH: 380, maxH: 540, mobileAspect: 0.9 });
  let ohmic = true, nbi = false, rf = false, B = 0.8, T = 5, sel = 'plasma', t = 0, events = [], power = 0;
  const geo = () => { const W = S.w, H = S.h; const narrow = W <= 620; const cx = W * (narrow ? 0.5 : 0.4), cy = H * (narrow ? 0.34 : 0.48), R = Math.min(W * (narrow ? 0.34 : 0.3), H * (narrow ? 0.26 : 0.36)); return { cx, cy, R, W, H, narrow }; };
  Pointer(S, { scroll: true, hit: (x, y) => { const g = geo(), d = hyp(x - g.cx, y - g.cy); if (d < g.R * 0.55) return 'plasma'; if (d < g.R * 0.78) return 'blanket'; if (d < g.R * 1.0) return 'vessel'; if (y > g.cy + g.R * 0.75 && Math.abs(x - g.cx) < g.R * 0.4) return 'divertor'; if (d < g.R * 1.35) return 'coil'; if (Math.abs(x - (g.cx - g.R * 1.9)) < 30) return 'solenoid'; return null; }, down: k => { sel = k; info(); } });
  L.loop(dt => {
    t += dt;
    const heat = (ohmic ? 12 : 0) + (nbi ? 55 : 0) + (rf ? 45 : 0);
    const conf = clamp(B, 0, 1);
    const loss = T * (0.25 + (1 - conf) * 2.2);
    T = clamp(T + (heat - loss) * dt * 0.35, 0.5, 260);
    const fusing = T > 100 && conf > 0.45;
    power = fusing ? (T - 100) * conf * 6 : 0;
    if (fusing && Math.random() < dt * 14) { const a = rand(0, TAU); events.push({ a, r: 0, life: 1 }); }
    for (const e of events) { e.r += dt * 240; e.life -= dt * 1.2; }
    events = events.filter(e => e.life > 0);
    const c = S.begin(), C = Theme.c, g = geo();
    // coils
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + 0.05; const x = g.cx + Math.cos(a) * g.R * 1.18, y = g.cy + Math.sin(a) * g.R * 1.18; c.beginPath(); c.arc(x, y, g.R * 0.14, 0, TAU); c.strokeStyle = alpha(C.blue, 0.35 + conf * 0.6); c.lineWidth = 3; c.stroke(); }
    // vessel + blanket
    c.beginPath(); c.arc(g.cx, g.cy, g.R, 0, TAU); c.fillStyle = alpha(C.ink2, .12); c.fill(); c.strokeStyle = C.ink2; c.lineWidth = 2.5; c.stroke();
    c.beginPath(); c.arc(g.cx, g.cy, g.R * 0.78, 0, TAU); c.fillStyle = alpha(C.orange, .18); c.fill(); c.strokeStyle = alpha(C.orange, .8); c.lineWidth = 2; c.stroke();
    // plasma
    const glow = clamp(T / 150, 0, 1);
    const grd = c.createRadialGradient(g.cx, g.cy, g.R * 0.1, g.cx, g.cy, g.R * 0.55);
    grd.addColorStop(0, `rgba(255,${Math.round(120 + 130 * glow)},60,${0.25 + glow * 0.6})`); grd.addColorStop(1, 'rgba(120,60,200,0.05)');
    c.beginPath(); c.arc(g.cx, g.cy, g.R * 0.55, 0, TAU); c.fillStyle = grd; c.fill();
    for (let i = 0; i < 40; i++) { const a = t * (0.6 + (i % 5) * 0.2) + i, rr = g.R * (0.12 + 0.4 * ((i * 37) % 100) / 100); const wob = conf > 0.45 ? 0 : Math.sin(t * 6 + i) * g.R * 0.2 * (1 - conf); dot(c, g.cx + Math.cos(a) * (rr + wob), g.cy + Math.sin(a) * (rr + wob) * 0.92, 2, T > 100 ? C.orange : C.violet); }
    // divertor
    c.fillStyle = alpha(C.ink, .5); c.fillRect(g.cx - g.R * 0.3, g.cy + g.R * 0.82, g.R * 0.6, g.R * 0.16);
    // solenoid
    c.fillStyle = alpha(C.violet, .5); c.fillRect(g.cx - g.R * 1.95, g.cy - g.R * 0.7, 22, g.R * 1.4);
    // neutrons flying out
    for (const e of events) { const x = g.cx + Math.cos(e.a) * e.r, y = g.cy + Math.sin(e.a) * e.r; if (e.r < g.R * 0.8) dot(c, x, y, 3, C.green); }
    // labels
    const lab = (k, x, y, al) => { const on = sel === k; rich(c, PARTS[k][0], x, y, { size: on ? 12.5 : 11.5, w: on ? 700 : 500, color: on ? C.blue : C.muted, align: al || 'left', bg: alpha(C.paper2, .8) }); };
    lab('plasma', g.cx, g.cy, 'center'); lab('blanket', g.cx, g.cy - g.R * 0.68, 'center'); lab('vessel', g.cx, g.cy - g.R - 12, 'center');
    lab('coil', g.cx + g.R * 1.3, g.cy - g.R * 0.9); lab('divertor', g.cx, g.cy + g.R * 1.05, 'center'); lab('solenoid', g.cx - g.R * 1.98, g.cy - g.R * 0.82);
    // thermometer / gauges
    const px = g.narrow ? 14 : g.W * 0.76, py = g.narrow ? g.H - 168 : 18;
    { const pw = g.W - px + 6; c.fillStyle = alpha(C.paper2, .92); c.fillRect(px - 10, py - 12, pw, 3 * 46 + 34); c.strokeStyle = C.line2; c.lineWidth = 1; c.strokeRect(px - 10.5, py - 12.5, pw, 3 * 46 + 34); }
    const bars = [['Temperature', T, 260, `${fix(T, 0)} million K`, T > 100 ? C.red : C.orange], ['Confinement (B field)', conf * 100, 100, `${fix(conf * 100, 0)}%`, C.blue], ['Fusion power', power, 800, `${fix(power, 0)} MW`, C.green]];
    bars.forEach(([n, v, mx, txt, col], i) => {
      const y = py + i * 46; rich(c, n, px, y, { size: 11.5, color: C.muted });
      c.fillStyle = alpha(C.line2, .5); c.fillRect(px, y + 8, g.W - px - 20, 10);
      c.fillStyle = col; c.fillRect(px, y + 8, (g.W - px - 20) * clamp(v / mx, 0, 1), 10);
      rich(c, txt, px, y + 30, { size: 12, mono: true, color: C.ink, w: 600 });
    });
    if (T > 100 && conf > 0.45) rich(c, 'FUSING: D + T → ⁴He + n + 17.6 MeV', px, py + 3 * 46 + 4, { size: 12.5, color: C.green, w: 700 });
    else if (conf <= 0.45) rich(c, 'plasma touching the wall — it cools instantly', px, py + 3 * 46 + 4, { size: 12, color: C.red, w: 600 });
    else rich(c, 'too cold: nuclei cannot overcome their repulsion', px, py + 3 * 46 + 4, { size: 12, color: C.orange, w: 600 });
    ro.set('T', `${fix(T, 0)} × 10⁶ K`); ro.set('P', `${fix(power, 0)} MW`); ro.set('h', `${(ohmic ? 'ohmic ' : '') + (nbi ? 'NBI ' : '') + (rf ? 'RF' : '') || 'none'}`);
  }, [S]);
  const g = Group(P.side, 'Plasma heating (three methods)');
  Switch(g, { label: '1 · Ohmic heating (plasma current)', value: ohmic, onchange: v => ohmic = v });
  Switch(g, { label: '2 · Neutral beam injection', value: nbi, onchange: v => nbi = v });
  Switch(g, { label: '3 · Radio-frequency heating', value: rf, onchange: v => rf = v });
  Slider(g, { id: 'fu-B', label: 'Magnetic confinement', min: 0, max: 1, step: 0.05, value: B, fmt: v => fix(v * 100, 0) + '%', oninput: v => B = v });
  const ro = Readout(Group(P.side, 'Reactor'), [['T', 'Plasma temperature', 'hl'], ['P', 'Fusion power'], ['h', 'Heating active']]);
  const infoBox = el('div', { class: 'key' }); Group(P.side, 'Component (tap the diagram)').append(infoBox);
  function info() { infoBox.innerHTML = `<b>${PARTS[sel][0]}</b><br>${PARTS[sel][1]}`; }
  info();
  Note(P.side, 'Ohmic heating alone stalls at about 20–30 million K (the plasma’s resistance falls as it heats), so neutral beams and radio waves are needed to reach 150 million K.');
  Card(P.below, 'ITER in the exam (4.8.3)', list(['<b>Fuel:</b> deuterium (from seawater) and tritium (bred from lithium in the blanket).', '<b>Reaction:</b> ²H + ³H → ⁴He + ¹n, releasing 17.6 MeV (3.5 MeV to the helium, 14.1 MeV to the neutron).', '<b>Temperature required:</b> about 150 million K, ten times hotter than the Sun’s core, so nuclei have enough kinetic energy to overcome electrostatic repulsion and get close enough for the strong force to act.', '<b>Plasma:</b> at that temperature the gas is fully ionised — free nuclei and electrons — so it can be shaped and held by magnetic fields.', '<b>Three heating methods:</b> ohmic (current through the plasma), neutral beam injection (fast neutral atoms fired in), and radio-frequency/microwave heating (resonant EM waves).', '<b>Vacuum vessel:</b> evacuated steel torus holding the plasma. <b>Blanket:</b> absorbs neutrons, converts their energy to heat and breeds tritium. <b>Magnetic confinement:</b> superconducting coils keep the plasma off the walls.', '<b>Difficulties:</b> reaching and holding 150 MK, plasma instabilities, neutron damage and activation of the vessel, huge power needed for the magnets, and getting more energy out than in (Q > 1).', '<b>Advantages:</b> abundant fuel, no CO₂, no long-lived high-level waste, no chain reaction so no meltdown risk. <b>Disadvantages:</b> enormous cost and complexity, tritium handling, and it is not yet a working power station.']));
  Card(P.below, 'Methods of plasma confinement (4.8.4)', `<div class="tbl-wrap"><table class="tbl"><tr><th>Method</th><th>How it works</th><th>Where</th></tr>
    <tr><td>Gravitational</td><td style="white-space:normal">The star’s own enormous gravity compresses and holds the plasma at high density and temperature.</td><td>Stars (the Sun)</td></tr>
    <tr><td>Inertial</td><td style="white-space:normal">Powerful lasers or ion beams implode a tiny fuel pellet from all sides. Its own inertia holds it together long enough to fuse before it blows apart.</td><td>Laser fusion (NIF)</td></tr>
    <tr><td>Magnetic</td><td style="white-space:normal">Charged plasma particles spiral along magnetic field lines, so strong fields in a torus keep them away from the walls.</td><td>Tokamaks (ITER, JET)</td></tr></table></div>`);
  Drill(P.below, { title: 'Fusion drill', cls: 'wide', gens: [
    () => ({ q: 'Why does fusion need temperatures of order 10⁸ K?', options: ['So nuclei have enough kinetic energy to overcome electrostatic repulsion', 'So the fuel becomes a gas', 'So the neutrons can escape the plasma', 'So the magnets become superconducting'], correct: 0, why: 'Both nuclei are positive. They must get within ~10⁻¹⁵ m for the strong force to act, which needs very high kinetic energy.' }),
    () => ({ q: 'What is the main job of the blanket in a tokamak?', options: ['Absorb the neutrons, extract their energy and breed tritium', 'Confine the plasma magnetically', 'Keep the vessel under vacuum', 'Slow the neutrons so they cause more fusion'], correct: 0, why: 'Neutrons are uncharged, so magnetic fields cannot hold them: they are stopped in the blanket, which heats up and also makes tritium from lithium.' }),
    () => { const E = 17.6 * 1.6e-13; const n = randi(1, 9) * 1e19; return { q: `Each D–T fusion releases <b>17.6 MeV</b>. How much energy comes from <b>${sci(n, 2)}</b> fusions?`, a: n * E, unit: 'J', tol: 0.02, steps: [`17.6 MeV = 17.6 × 1.6×10⁻¹³ = ${sci(E, 3)} J`, `E = ${sci(n, 2)} × ${sci(E, 3)} = ${sci(n * E, 3)} J`] }; },
  ] });
}

topic({
  id: 'fusion', code: '4.8', unit: 'A2 1', title: 'Fission & Fusion', short: 'Fission/fusion',
  blurb: 'Run a chain reaction with control rods and a moderator, then heat a tokamak plasma to 150 million kelvin and hold it off the walls.',
  outcomes: [
    ['4.8.1', 'demonstrate an understanding of the terms chain reaction, critical size, moderators, control rods, cooling system and reactor shielding, as used in describing a fission reactor', 'reactor'],
    ['4.8.2', 'demonstrate an understanding of the social, environmental, security and economic issues surrounding the use of nuclear power as a solution to a future energy crisis', 'reactor'],
    ['4.8.3', 'describe the ITER (tokamak concept) fusion reactor in terms of fuel, D-T reaction, temperature required, plasma, three methods of plasma heating, vacuum vessel, blanket, magnetic confinement of plasma, difficulties of achieving fusion, and advantages and disadvantages of fusion', 'tokamak'],
    ['4.8.4', 'describe the following methods of plasma confinement: gravitational, inertial and magnetic', 'tokamak'],
  ],
  labs: [
    { id: 'reactor', title: 'Fission reactor', hint: 'hold k = 1', spec: ['4.8.1', '4.8.2'], mount: mountReactor },
    { id: 'tokamak', title: 'ITER tokamak', hint: 'heat and confine', spec: ['4.8.3', '4.8.4'], mount: mountFusion },
  ],
  equations: [['^{235}\\text{U} + n \\to ^{141}\\text{Ba} + ^{92}\\text{Kr} + 3n', '≈ 200 MeV'], ['^{2}\\text{H} + ^{3}\\text{H} \\to ^{4}\\text{He} + n', '17.6 MeV'], ['n + ^{6}\\text{Li} \\to ^{4}\\text{He} + ^{3}\\text{H}', 'tritium breeding'], ['E = \\Delta mc^2', '']],
  traps: ['Moderator <b>slows</b> neutrons; control rods <b>absorb</b> them. Don’t swap them.', 'Critical size is about <b>neutron escape through the surface</b>, not about running out of fuel.', 'Fusion needs high temperature to beat <b>electrostatic repulsion</b> — say that, not “to make it react faster”.', 'Give the issue and its category (social, environmental, security, economic) for 4.8.2.', 'Learn the D–T equation and the 17.6 MeV, and that the blanket breeds tritium from lithium.'],
});
})();

/* ================= 5.1 Force fields ================= */
(() => {

/* field lines for point sources (screen coords); sign +1 source, −1 sink */
function fieldAt(src, x, y) { let ex = 0, ey = 0; for (const s of src) { const dx = x - s.x, dy = y - s.y, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); ex += s.q * dx / (r2 * r); ey += s.q * dy / (r2 * r); } return [ex, ey]; }
function traceLine(src, x, y, dir, W, H, maxN = 900) {
  const pts = [[x, y]];
  for (let i = 0; i < maxN; i++) {
    const [ex, ey] = fieldAt(src, x, y), m = hyp(ex, ey); if (m < 1e-12) break;
    x += dir * ex / m * 4; y += dir * ey / m * 4; pts.push([x, y]);
    if (x < -20 || y < -20 || x > W + 20 || y > H + 20) break;
    if (src.some(s => hyp(x - s.x, y - s.y) < 10 && s.q * dir < 0)) break;
  }
  return pts;
}
function drawLines(c, src, W, H, col, gravity) {
  const all = [];
  if (gravity) { // lines come in from the edges towards the masses
    for (const s of src) { const n = Math.round(8 + Math.abs(s.q) * 4); for (let k = 0; k < n; k++) { const a = k / n * TAU; all.push(traceLine(src, s.x + Math.cos(a) * 12, s.y + Math.sin(a) * 12, 1, W, H).reverse()); } }
  } else for (const s of src) { if (s.q <= 0 && src.some(o => o.q > 0)) continue; const n = Math.round(8 * Math.abs(s.q)); for (let k = 0; k < n; k++) { const a = (k + 0.5) / n * TAU; all.push(traceLine(src, s.x + Math.cos(a) * 12, s.y + Math.sin(a) * 12, s.q > 0 ? 1 : -1, W, H)); if (s.q < 0) all[all.length - 1].reverse(); } }
  for (const p of all) { if (p.length < 3) continue; line(c, p, { color: col, width: 1.3 }); const m = p[Math.floor(p.length * 0.5)], m2 = p[Math.floor(p.length * 0.5) + 1] || m; arrow(c, m[0], m[1], m2[0] + (m2[0] - m[0]) * 2, m2[1] + (m2[1] - m[1]) * 2, { color: col, width: 1.3, head: 8 }); }
}

function mountFields(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.8, minH: 340, maxH: 520, mobileAspect: 1 });
  let kind = 'grav', src = [], test = null, drag = null;
  const presets = {
    grav: W => [{ x: W * 0.35, y: 0.5, q: 3, m: true }, { x: W * 0.72, y: 0.5, q: 1, m: true }],
    elec: W => [{ x: W * 0.35, y: 0.5, q: 2 }, { x: W * 0.65, y: 0.5, q: -2 }],
    like: W => [{ x: W * 0.35, y: 0.5, q: 2 }, { x: W * 0.65, y: 0.5, q: 2 }],
    uniform: () => [],
  };
  const reset = () => { src = presets[kind](S.w).map(s => ({ ...s, y: s.y * S.h })); test = { x: S.w * 0.5, y: S.h * 0.25 }; };
  reset();
  Pointer(S, { hit: (x, y) => { if (test && hyp(x - test.x, y - test.y) < 16) return 'test'; const i = src.findIndex(s => hyp(x - s.x, y - s.y) < 22); return i >= 0 ? i : null; }, down: t => drag = t, up: () => drag = null, move: (t, x, y) => { if (t === 'test') { test.x = x; test.y = y; } else { src[t].x = x; src[t].y = y; } } });
  L.loop(() => {
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    if (kind === 'uniform') {
      const top = H * 0.2, bot = H * 0.8; c.fillStyle = C.red; c.fillRect(W * 0.1, top - 8, W * 0.8, 8); c.fillStyle = C.blue; c.fillRect(W * 0.1, bot, W * 0.8, 8);
      rich(c, '+ + + + + + + + +', W / 2, top - 18, { align: 'center', size: 14, w: 700, color: C.red }); rich(c, '− − − − − − − − −', W / 2, bot + 24, { align: 'center', size: 14, w: 700, color: C.blue });
      for (let k = 0; k < 12; k++) { const x = W * 0.14 + k * W * 0.72 / 11; arrow(c, x, top + 4, x, bot - 4, { color: alpha(C.orange, .8), width: 1.4, head: 8 }); }
      for (let k = 1; k < 5; k++) { const y = top + (bot - top) * k / 5; line(c, [[W * 0.1, y], [W * 0.9, y]], { color: alpha(C.green, .6), width: 1, dash: [5, 5] }); }
      rich(c, 'uniform field: parallel, equally spaced lines (dashed: equipotentials)', W / 2, H - 12, { align: 'center', size: 11.5, color: C.muted });
      if (test) { const inside = test.y > top && test.y < bot && test.x > W * 0.1 && test.x < W * 0.9; dot(c, test.x, test.y, 7, C.red, C.paper2); if (inside) arrow(c, test.x, test.y, test.x, test.y + 50, { color: C.red, width: 2.6 }); rich(c, inside ? 'same force everywhere between the plates' : 'outside the plates: ≈ no field', test.x + 12, test.y - 14, { size: 12, w: 600, color: C.red, bg: alpha(C.paper2, .8) }); }
      ro.set('F', 'constant'); ro.set('r', '—');
    } else {
      drawLines(c, src, W, H, kind === 'grav' ? alpha(C.violet, .75) : alpha(C.orange, .8), kind === 'grav');
      for (const s of src) { const r = 10 + Math.abs(s.q) * 3; dot(c, s.x, s.y, r, kind === 'grav' ? C.ink2 : s.q > 0 ? C.red : C.blue, C.paper2); rich(c, kind === 'grav' ? `${Math.abs(s.q)}M` : s.q > 0 ? '+' : '−', s.x, s.y, { align: 'center', size: 13, w: 700, color: C.paper2 }); }
      if (test) {
        const [ex, ey] = fieldAt(src, test.x, test.y), sg = kind === 'grav' ? -1 : 1, m = hyp(ex, ey), k = clamp(m * 8e4, 0, 90);
        dot(c, test.x, test.y, 6, kind === 'grav' ? C.green : C.red, C.paper2);
        if (m > 0) arrow(c, test.x, test.y, test.x + sg * ex / m * k, test.y + sg * ey / m * k, { color: kind === 'grav' ? C.green : C.red, width: 2.6 });
        rich(c, kind === 'grav' ? 'test mass (drag)' : 'test charge + (drag)', test.x + 10, test.y - 14, { size: 11.5, w: 600, color: C.ink2, bg: alpha(C.paper2, .8) });
        ro.set('F', `${fix(m * 1e5, 2)} (arb.)`); ro.set('r', `${fix(hyp(test.x - src[0].x, test.y - src[0].y), 0)} px`);
      }
      if (kind === 'grav') { const s1 = src[0], s2 = src[1]; if (s1 && s2) { const d = hyp(s2.x - s1.x, s2.y - s1.y), f = Math.sqrt(s1.q) / (Math.sqrt(s1.q) + Math.sqrt(s2.q)); const nx = s1.x + (s2.x - s1.x) * f, ny = s1.y + (s2.y - s1.y) * f; c.strokeStyle = C.green; c.lineWidth = 2; c.beginPath(); c.moveTo(nx - 6, ny - 6); c.lineTo(nx + 6, ny + 6); c.moveTo(nx - 6, ny + 6); c.lineTo(nx + 6, ny - 6); c.stroke(); rich(c, 'neutral point', nx, ny - 16, { align: 'center', size: 11, color: C.green }); } }
    }
  }, [S]);
  const g = Group(P.side, 'Field');
  Seg(g, { options: [['grav', 'Gravitational'], ['elec', 'Electric: + and −'], ['like', 'Electric: like charges'], ['uniform', 'Uniform (plates)']], value: kind, wrap: true, onchange: v => { kind = v; reset(); } });
  Btns(g).append(el('button', { class: 'btn', type: 'button', onclick: reset }, 'Reset positions'));
  const ro = Readout(Group(P.side, 'Test object'), [['F', 'Field strength here', 'hl'], ['r', 'Distance from first source']]);
  Note(P.side, 'Drag the sources and the small test object. Field lines show the direction of the force on a test mass (or positive test charge); where they are close together the field is strong.');
  Card(P.below, 'Force fields (5.1)', list(['A <b>force field</b> is a region in which a body experiences a non-contact force.', '<b>Gravitational</b> fields act on masses (always attractive). <b>Electric</b> fields act on charges (attractive or repulsive). <b>Magnetic</b> fields act on moving charges and magnetic materials.', 'Field lines show the direction of the force on a small test mass / positive test charge; their spacing shows the strength.', 'A <b>radial</b> field (from a point mass or charge) weakens with distance: lines spread out.', 'A <b>uniform</b> field (between parallel plates, or near Earth’s surface) has parallel, equally spaced lines: same strength and direction everywhere.', 'Field lines never cross.']));
  Card(P.below, 'Comparing gravitational and electric fields', `<table class="tbl"><tr><th></th><th>Gravitational</th><th>Electric</th></tr><tr><td>acts on</td><td>mass</td><td>charge</td></tr><tr><td>force law</td><td>F = Gm₁m₂/r²</td><td>F = Q₁Q₂/4πε₀r²</td></tr><tr><td>field strength</td><td>g = F/m (N kg⁻¹)</td><td>E = F/q (N C⁻¹)</td></tr><tr><td>direction</td><td>always attractive</td><td>like repel, unlike attract</td></tr><tr><td>both</td><td colspan="2">inverse-square laws for point sources; radial fields</td></tr><tr><td>relative size</td><td colspan="2">gravity is far weaker (~10⁻³⁶ × between two protons)</td></tr></table>`);
  Sorter(P.below, { cats: [['g', 'Gravitational only'], ['e', 'Electric only'], ['b', 'Both']], items: [
    { t: 'Obeys an inverse-square law for a point source', c: 'b' }, { t: 'Can be repulsive', c: 'e' }, { t: 'Field strength measured in N kg⁻¹', c: 'g' }, { t: 'Acts on charged objects', c: 'e' }, { t: 'Produces radial field lines from a point source', c: 'b' }, { t: 'Always attractive', c: 'g' }, { t: 'Can be shielded by a metal box', c: 'e', why: 'a Faraday cage' }, { t: 'Field strength = force per unit test object', c: 'b' },
  ] });
}

topic({
  id: 'fields', code: '5.1', unit: 'A2 2', title: 'Force Fields', short: 'Fields',
  blurb: 'What a field is. Drag masses and charges around and watch the field lines, neutral points and uniform fields respond.',
  outcomes: [
    ['5.1.1', 'describe the concept of a force field as a region in which a body experiences a non-contact force', 'explorer'],
    ['5.1.2', 'represent gravitational and electric fields by means of field lines', 'explorer'],
    ['5.1.3', 'distinguish between radial and uniform fields and compare gravitational and electric fields', 'explorer'],
  ],
  labs: [{ id: 'explorer', title: 'Field-line explorer', hint: 'drag sources', spec: ['5.1.1', '5.1.2', '5.1.3'], mount: mountFields }],
  equations: [['g = \\frac{F}{m}', 'N kg⁻¹'], ['E = \\frac{F}{q}', 'N C⁻¹']],
  traps: ['Field lines show the direction of force on a <b>positive</b> test charge.', 'Gravitational fields are only ever attractive.', 'A uniform field has equally spaced parallel lines — not just parallel.', 'Field lines never cross.'],
  notes: [
    ['Force fields', 'A force field is a region in which a body experiences a non-contact force: gravitational (mass), electric (charge), magnetic (moving charge / magnetic material).'],
    ['Field lines', 'Show the direction of the force on a test mass or positive test charge; closer lines mean a stronger field. Radial fields spread out from a point; uniform fields have parallel, equally spaced lines.'],
    ['Comparison', 'Both gravitational and electric point-source fields are radial and inverse-square. Gravity only attracts and is extremely weak; electric forces can attract or repel.'],
  ],
  mini(c, w, h2, t, C) {
    const src = [{ x: w * 0.35 + 10 * Math.sin(t), y: h2 / 2, q: 1 }, { x: w * 0.65, y: h2 / 2, q: -1 }];
    drawLines(c, src, w, h2, alpha(C.orange, .8), false); dot(c, src[0].x, src[0].y, 7, C.red); dot(c, src[1].x, src[1].y, 7, C.blue);
  },
});
window.PSFields = { fieldAt, traceLine, drawLines };
})();

/* ================= 5.2 Gravitational fields ================= */
(() => {
const Gc = 6.67e-11, ME = 5.97e24, RE = 6.37e6;

/* ---------- Lab A: orbits ---------- */
function mountOrbit(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.5, minH: 380, maxH: 560, mobileAspect: 0.95 });
  let h = 2000e3, vf = 1, st, trail = [], warp = 600, crashed = false;
  function reset() { const r = RE + h, v = Math.sqrt(Gc * ME / r) * vf; st = { x: r, y: 0, vx: 0, vy: v, t: 0 }; trail = []; crashed = false; }
  reset();
  L.loop(dt => {
    if (!crashed) { const n = 200, hh = dt * warp / n; for (let i = 0; i < n; i++) { const r = hyp(st.x, st.y), a = -Gc * ME / (r * r * r); st.vx += a * st.x * hh; st.vy += a * st.y * hh; st.x += st.vx * hh; st.y += st.vy * hh; st.t += hh; if (r < RE) { crashed = true; break; } } trail.push([st.x, st.y]); if (trail.length > 1500) trail.shift(); }
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, span = Math.max(RE + h, ...trail.map(p => hyp(p[0], p[1]))) * 1.15, sc = Math.min(W, H) / 2 / span, cx = W / 2, cy = H / 2;
    c.fillStyle = SPACE(); c.fillRect(0, 0, W, H);
    // g field shading rings
    for (let k = 1; k <= 5; k++) { c.beginPath(); c.arc(cx, cy, RE * sc * (1 + k * 0.8), 0, TAU); c.strokeStyle = 'rgba(180,160,255,' + (0.25 / k) + ')'; c.lineWidth = 1; c.stroke(); }
    c.beginPath(); c.arc(cx, cy, RE * sc, 0, TAU); const gr = c.createRadialGradient(cx - RE * sc * 0.3, cy - RE * sc * 0.3, 2, cx, cy, RE * sc); gr.addColorStop(0, '#6fb2ff'); gr.addColorStop(1, '#1f4c8c'); c.fillStyle = gr; c.fill();
    line(c, trail.map(p => [cx + p[0] * sc, cy - p[1] * sc]), { color: 'rgba(255,200,120,.8)', width: 1.5 });
    const r = hyp(st.x, st.y), v = hyp(st.vx, st.vy), g = Gc * ME / (r * r);
    const sx = cx + st.x * sc, sy = cy - st.y * sc; dot(c, sx, sy, 5, crashed ? '#ff6f7e' : '#ffd479');
    const ux = -st.x / r, uy = st.y / r; arrow(c, sx, sy, sx + ux * 40, sy + uy * 40, { color: '#ff8f9c', width: 2 });
    rich(c, `*g* = ${fix(g, 2)} N kg⁻¹`, sx + 10, sy - 14, { size: 12, w: 600, color: '#ffd8a8' });
    rich(c, crashed ? 'CRASHED: too slow' : vf > Math.SQRT2 - 0.001 ? 'escape speed reached: it never comes back' : Math.abs(vf - 1) < 0.005 ? 'circular orbit: gravity provides exactly the centripetal force' : vf < 1 ? 'too slow for a circle: ellipse falling inwards' : 'faster than circular: elliptical orbit', W / 2, 20, { align: 'center', size: 13, w: 700, color: '#e4ecf8' });
    ro.set('r', `${fix(r / 1e3, 0)} km`); ro.set('g', `${fix(g, 3)} N kg⁻¹`); ro.set('v', `${fix(v, 0)} m s⁻¹`); ro.set('T', `${fix(TAU * Math.sqrt((RE + h) ** 3 / (Gc * ME)) / 60, 1)} min`); ro.set('vc', `${fix(Math.sqrt(Gc * ME / (RE + h)), 0)} m s⁻¹`);
  }, [S1]);
  const g = Group(P.side, 'Launch');
  Slider(g, { id: 'or-h', label: 'Height above surface', min: 200, max: 36000, step: 100, value: h / 1e3, unit: 'km', fmt: v => fix(v, 0), oninput: v => { h = v * 1e3; reset(); } });
  Slider(g, { id: 'or-v', label: 'Speed ÷ circular speed', min: 0.6, max: 1.45, step: 0.01, value: vf, fmt: v => fix(v, 2) + '×', oninput: v => { vf = v; reset(); } });
  Slider(g, { id: 'or-w', label: 'Time warp', min: 100, max: 8000, step: 100, value: warp, fmt: v => fix(v, 0) + '×', oninput: v => warp = v });
  const b = Btns(g); Btn(b, 'Geostationary', () => { h = 35786e3; vf = 1; reset(); }, 'pri'); Btn(b, 'ISS', () => { h = 408e3; vf = 1; reset(); }); Btn(b, 'Relaunch', reset);
  const ro = Readout(Group(P.side, 'Satellite'), [['r', 'Distance from centre'], ['g', 'Field strength <i>g</i> = <i>GM</i>/<i>r</i>²', 'hl'], ['v', 'Speed'], ['vc', 'Circular-orbit speed √(<i>GM</i>/<i>r</i>)'], ['T', 'Circular period']]);
  Note(P.side, 'In a circular orbit the gravitational force <i>GMm</i>/<i>r</i>² provides the centripetal force <i>mv</i>²/<i>r</i>. The satellite is in free fall all the time — it just moves sideways fast enough to keep missing the Earth.');
  EqCard(P.below, 'Gravitation (5.2.1–5.2.2)', [['F = \\frac{Gm_1m_2}{r^2}', 'G = 6.67 × 10⁻¹¹ N m² kg⁻²'], ['g = \\frac{F}{m}', 'field strength'], ['g = \\frac{GM}{r^2}', 'radial field, r ≥ R'], ['v = \\sqrt{\\frac{GM}{r}}', 'circular orbit speed']]);
  Card(P.below, 'Definitions', list(['<b>Newton’s law of gravitation:</b> every point mass attracts every other with a force proportional to the product of their masses and inversely proportional to the square of their separation.', '<b>Gravitational field strength</b> at a point is the force per unit mass on a small test mass placed there. Unit N kg⁻¹ (≡ m s⁻²).', 'Outside a uniform sphere, the field is as if all the mass were at the centre.', 'At the surface: g = GM/R², so GM = gR².']));
  Drill(P.below, { title: 'Gravitation drill', gens: [
    () => { const m1 = randi(50, 120), m2 = randi(50, 120), r = +rand(0.5, 3).toFixed(1); return { q: `Find the gravitational force between two people of mass <b>${m1} kg</b> and <b>${m2} kg</b> standing <b>${r} m</b> apart.`, a: Gc * m1 * m2 / (r * r), unit: 'N', steps: ['F = Gm₁m₂/r²', `= 6.67×10⁻¹¹ × ${m1} × ${m2} / ${r}² = ${sci(Gc * m1 * m2 / (r * r), 3)} N`] }; },
    () => { const hk = randi(200, 40000); const r = RE + hk * 1e3; return { q: `Find Earth’s gravitational field strength <b>${hk} km</b> above the surface. (M = 5.97 × 10²⁴ kg, R = 6.37 × 10⁶ m)`, a: Gc * ME / (r * r), unit: 'N kg⁻¹', steps: [`r = R + h = ${sci(r, 3)} m`, `g = GM/r² = ${fix(Gc * ME / (r * r), 3)} N kg⁻¹`] }; },
    () => { const k = randi(2, 5); return { q: `A planet has the same density as Earth but <b>${k}</b> times the radius. How many times bigger is its surface g?`, a: k, unit: '', steps: ['M ∝ ρR³ so g = GM/R² ∝ ρR', `g scales by ${k}`] }; },
  ] });
}

/* ---------- Lab B: Kepler's third law & geostationary satellites ---------- */
function mountKepler(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 1.9, minH: 280, maxH: 400, mobileAspect: 1.1 });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 250, maxH: 360, plain: true });
  const PL = [['Mercury', 0.387, 0.241], ['Venus', 0.723, 0.615], ['Earth', 1, 1], ['Mars', 1.524, 1.881], ['Jupiter', 5.203, 11.86], ['Saturn', 9.537, 29.46]];
  let t = 0, speed = 1, logv = true;
  L.loop(dt => {
    t += dt * speed * 0.25;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, cx = W * 0.5, cy = H * 0.5, R = Math.min(W, H) * 0.46;
    c.fillStyle = SPACE(); c.fillRect(0, 0, W, H); dot(c, cx, cy, 8, '#ffcf5a');
    const map = a => logv ? R * (Math.log10(a / 0.3) / Math.log10(10 / 0.3)) : R * a / 10;
    for (const [n, a, T] of PL) { const r = map(a); c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.strokeStyle = 'rgba(180,190,230,.35)'; c.lineWidth = 1; c.stroke(); const ang = t / T * TAU; const x = cx + r * Math.cos(ang), y = cy - r * Math.sin(ang); dot(c, x, y, 4, '#9ec5ff'); rich(c, n, x + 7, y - 7, { size: 10.5, color: '#dfe7ff' }); }
    rich(c, logv ? 'orbits drawn on a log scale; inner planets lap the outer ones' : 'true scale', 10, H - 10, { size: 10.5, color: '#b9c4e0' });
    S2.begin(); const pl = new Plot(S2, { xlabel: '*r*³ / AU³', ylabel: '*T*² / years²', xmin: 0, xmax: 1000, ymin: 0, ymax: 1000 });
    pl.axes(); pl.curve(x => x, { color: C.green, width: 1.6 }); pl.cross(PL.map(([, a, T]) => [a ** 3, T * T]), { color: C.red, s: 5, width: 2 });
    for (const [n, a, T] of PL) if (a > 4) pl.label(a ** 3, T * T, n, { dx: 8, dy: -8, size: 11, color: C.ink2 });
    pl.label(40, 900, '*T*² ∝ *r*³: gradient 4π²/*GM*', { size: 12.5, w: 700, color: C.green });
  }, [S1, S2]);
  const g = Group(P.side, 'Solar System');
  Slider(g, { id: 'kp-s', label: 'Time speed', min: 0.2, max: 4, step: 0.1, value: speed, fmt: v => fix(v, 1) + '×', oninput: v => speed = v });
  Switch(g, { id: 'kp-l', label: 'Log-scale orbits', value: true, onchange: v => logv = v });
  Note(P.side, 'Every planet lies on the same straight line of <i>T</i>² against <i>r</i>³ — Kepler’s third law, which follows directly from Newton’s law of gravitation.');
  EqCard(P.below, 'Kepler’s third law (5.2.3)', [['\\frac{GMm}{r^2} = m\\omega^2 r = m\\frac{4\\pi^2}{T^2}r', 'gravity = centripetal force'], ['T^2 = \\frac{4\\pi^2}{GM}r^3', 'so T² ∝ r³']]);
  Card(P.below, 'Geostationary satellites (5.2.4)', list(['Orbit period <b>24 hours</b> (one sidereal day), in the plane of the <b>equator</b>, moving in the <b>same direction</b> as the Earth rotates (west to east).', 'So it stays above the same point on the equator: fixed dish aerials can point at it.', 'Using T² = 4π²r³/GM with T = 86 400 s gives r ≈ 4.2 × 10⁷ m (about 36 000 km above the surface).', 'Uses: satellite TV and communications, weather monitoring.', 'Drawbacks: signal delay (~0.25 s round trip) and poor coverage near the poles.']));
  Drill(P.below, { title: 'Orbits drill', gens: [
    () => { const hk = randi(300, 30000); const r = RE + hk * 1e3; return { q: `Find the period (in hours) of a satellite in a circular orbit <b>${hk} km</b> above Earth.`, a: TAU * Math.sqrt(r ** 3 / (Gc * ME)) / 3600, unit: 'hours', steps: [`r = ${sci(r, 3)} m`, 'T = 2π√(r³/GM)', `= ${fix(TAU * Math.sqrt(r ** 3 / (Gc * ME)), 0)} s = ${fix(TAU * Math.sqrt(r ** 3 / (Gc * ME)) / 3600, 2)} h`] }; },
    () => { const T = 86164; const r = Math.cbrt(Gc * ME * T * T / (4 * Math.PI ** 2)); return { q: 'Find the orbital radius of a geostationary satellite (T = 8.62 × 10⁴ s). Give r from the centre of the Earth.', a: r, unit: 'm', steps: ['r³ = GMT²/4π²', `r = ${sci(r, 3)} m`] }; },
    () => { const a = +rand(1.5, 20).toFixed(2); return { q: `A planet orbits the Sun at <b>${a} AU</b>. Using Kepler’s third law (Earth: 1 AU, 1 year), find its period in years.`, a: a ** 1.5, unit: 'years', steps: ['T² ∝ r³ ⇒ T = r^1.5 in Earth units', `= ${a}^1.5 = ${fix(a ** 1.5, 3)} years`] }; },
  ] });
}

topic({
  id: 'gravity', code: '5.2', unit: 'A2 2', title: 'Gravitational Fields', short: 'Gravity',
  blurb: 'Newton’s law of gravitation, g = GM/r², live orbits from low Earth to geostationary, and Kepler’s third law from the whole Solar System.',
  outcomes: [
    ['5.2.1', 'recall and use Newton’s law of universal gravitation F = Gm₁m₂/r²', 'orbit'],
    ['5.2.2', 'define gravitational field strength and recall and use g = F/m and g = GM/r²', 'orbit'],
    ['5.2.3', 'derive and use Kepler’s third law for circular orbits, T² ∝ r³', 'kepler'],
    ['5.2.4', 'demonstrate an understanding of the properties and uses of geostationary satellites', 'kepler'],
  ],
  labs: [
    { id: 'orbit', title: 'Orbit simulator', hint: 'gravity = centripetal', spec: ['5.2.1', '5.2.2'], mount: mountOrbit },
    { id: 'kepler', title: 'Kepler & geostationary', hint: 'T² ∝ r³', spec: ['5.2.3', '5.2.4'], mount: mountKepler },
  ],
  equations: [['F = \\frac{Gm_1m_2}{r^2}', ''], ['g = \\frac{GM}{r^2}', ''], ['T^2 = \\frac{4\\pi^2}{GM}r^3', ''], ['v = \\sqrt{\\frac{GM}{r}}', '']],
  traps: ['<i>r</i> is measured from the <b>centre</b> of the planet: add the height to the radius.', 'Square the distance: doubling r quarters F and g.', 'Geostationary: period 24 h, equatorial, same rotation direction — all three.', 'Satellite mass cancels: orbit speed and period don’t depend on it.'],
  notes: [
    ['Newton’s law of gravitation', 'F = Gm₁m₂/r², attractive, between point masses (or spheres, measured centre to centre). G = 6.67 × 10⁻¹¹ N m² kg⁻².'],
    ['Field strength', 'g = F/m, the force per unit mass on a test mass. Radial field of a planet: g = GM/r² (outside it). Near the surface the field is approximately uniform.'],
    ['Circular orbits', 'Gravity provides the centripetal force: GMm/r² = mv²/r ⇒ v = √(GM/r); with v = 2πr/T ⇒ T² = (4π²/GM) r³ (Kepler’s third law).'],
    ['Geostationary satellites', 'Period 24 h, above the equator, rotating with the Earth, radius ≈ 4.2 × 10⁷ m. Stay above one point: used for communications and TV.'],
  ],
  mini(c, w, h2, t, C) {
    c.fillStyle = SPACE(); c.fillRect(0, 0, w, h2); dot(c, w / 2, h2 / 2, 14, '#4f8fe0');
    for (const [r, s] of [[h2 * 0.32, 1.2], [h2 * 0.44, 0.7]]) { c.beginPath(); c.ellipse(w / 2, h2 / 2, r * 1.6, r, 0, 0, TAU); c.strokeStyle = 'rgba(200,200,255,.3)'; c.stroke(); dot(c, w / 2 + r * 1.6 * Math.cos(t * s), h2 / 2 + r * Math.sin(t * s), 3.5, '#ffd479'); }
  },
});
})();

/* ================= 5.3 Electric fields ================= */
(() => {
const k = 8.99e9, e = 1.6e-19, G = 9.81;

/* ---------- Lab A: Coulomb's law & radial field ---------- */
function mountCoulomb(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.4, minH: 220, maxH: 300, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, plain: true });
  let Q1 = 4, Q2 = -2, r = 0.3, drag = false;
  const geo = () => ({ x1: S1.w * 0.2, y: S1.h * 0.55, sc: S1.w * 0.6 / 0.6 });
  Pointer(S1, { hit: (x) => Math.abs(x - (geo().x1 + r * geo().sc)) < 30 ? 'b' : null, down: () => drag = true, up: () => drag = false, move: (_, x) => { const g = geo(); r = clamp(Math.round((x - g.x1) / g.sc * 100) / 100, 0.05, 0.6); sr.set(r); } });
  L.loop(() => {
    const F = k * Q1 * 1e-6 * Q2 * 1e-6 / (r * r), c = S1.begin(), C = Theme.c, g = geo(), W = S1.w;
    const x2 = g.x1 + r * g.sc;
    const drawQ = (x, q) => { dot(c, x, g.y, 12 + Math.abs(q) * 2, q > 0 ? C.red : C.blue, C.paper2); rich(c, `${q > 0 ? '+' : ''}${q} µC`, x, g.y - 32 - Math.abs(q) * 2, { align: 'center', size: 12.5, w: 700, color: q > 0 ? C.red : C.blue }); };
    drawQ(g.x1, Q1); drawQ(x2, Q2); if (drag) handle(c, x2, g.y + 34, C.ink, true);
    const fl = clamp(Math.abs(F) * 1.2, 6, 140), att = F < 0;
    arrow(c, g.x1, g.y, g.x1 + (att ? fl : -fl), g.y, { color: C.green, width: 3 }); arrow(c, x2, g.y, x2 + (att ? -fl : fl), g.y, { color: C.green, width: 3 });
    arrow(c, g.x1, g.y + 50, x2, g.y + 50, { color: C.muted, width: 1.2, both: true, head: 6 }); rich(c, `*r* = ${fix(r * 100, 0)} cm (drag)`, (g.x1 + x2) / 2, g.y + 64, { align: 'center', size: 12, color: C.ink2 });
    rich(c, att ? `attractive: ${fix(Math.abs(F), 2)} N on each (Newton 3)` : `repulsive: ${fix(Math.abs(F), 2)} N on each`, W / 2, 22, { align: 'center', size: 13.5, w: 700, color: C.green });
    S2.begin(); const pl = new Plot(S2, { xlabel: 'distance *r* / m', ylabel: 'field strength *E* of *Q*₁ / 10⁶ N C⁻¹', xmin: 0, xmax: 0.62, ymin: 0, ymax: k * Math.abs(Q1) * 1e-6 / 0.05 ** 2 / 1e6 * 1.05 });
    pl.axes(); pl.curve(x => k * Math.abs(Q1) * 1e-6 / (x * x) / 1e6, { color: C.red, width: 2.4, a: 0.045 });
    pl.dots([[r, k * Math.abs(Q1) * 1e-6 / (r * r) / 1e6]], { color: C.blue, r: 6, stroke: C.paper2 });
    pl.label(r, k * Math.abs(Q1) * 1e-6 / (r * r) / 1e6, `*E* = ${sci(k * Math.abs(Q1) * 1e-6 / (r * r), 3)} N C⁻¹ at *Q*₂`, { dx: 10, dy: -12, size: 12, w: 600, color: C.blue, bg: alpha(C.paper2, .85) });
    ro.set('F', `${fix(F, 3)} N`); ro.set('E', `${sci(k * Math.abs(Q1) * 1e-6 / (r * r), 3)} N C⁻¹`); ro.set('x', `${fix(1 / (r * r), 1)} m⁻²`);
  }, [S1, S2]);
  const g = Group(P.side, 'Charges');
  Slider(g, { id: 'cl-q1', label: '<i>Q</i>₁', min: -6, max: 6, step: 0.5, value: Q1, unit: 'µC', fmt: v => fix(v, 1), oninput: v => Q1 = v || 0.5 });
  Slider(g, { id: 'cl-q2', label: '<i>Q</i>₂', min: -6, max: 6, step: 0.5, value: Q2, unit: 'µC', fmt: v => fix(v, 1), oninput: v => Q2 = v || 0.5 });
  const sr = Slider(g, { id: 'cl-r', label: 'Separation <i>r</i>', min: 0.05, max: 0.6, step: 0.01, value: r, unit: 'm', fmt: v => fix(v, 2), oninput: v => r = v });
  const ro = Readout(Group(P.side, 'Force'), [['F', 'Force (− = attractive)', 'hl'], ['E', 'Field of <i>Q</i>₁ at <i>Q</i>₂'], ['x', '1/<i>r</i>²']]);
  Note(P.side, 'Halve the distance and the force goes up <b>four</b> times: an inverse-square law, exactly like gravity — but it can repel.');
  EqCard(P.below, 'Coulomb’s law (5.3.1–5.3.2)', [['F = \\frac{Q_1Q_2}{4\\pi\\varepsilon_0 r^2}', '1/4πε₀ = 8.99 × 10⁹ N m² C⁻²'], ['E = \\frac{F}{q}', 'force per unit positive charge'], ['E = \\frac{Q}{4\\pi\\varepsilon_0 r^2}', 'radial field']]);
  Card(P.below, 'Definitions', list(['<b>Coulomb’s law:</b> the force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation.', '<b>Electric field strength</b> at a point is the force per unit positive charge on a small test charge placed there. Unit N C⁻¹ (≡ V m⁻¹). It is a vector.', 'ε₀ = 8.85 × 10⁻¹² F m⁻¹ is the permittivity of free space.']));
  Drill(P.below, { title: 'Coulomb drill', gens: [
    () => { const q1 = randi(1, 9), q2 = randi(1, 9), r2 = randi(2, 50); return { q: `Find the force between charges of <b>${q1} µC</b> and <b>${q2} µC</b> placed <b>${r2} cm</b> apart.`, a: k * q1 * q2 * 1e-12 / (r2 / 100) ** 2, unit: 'N', steps: ['F = kQ₁Q₂/r²', `= 8.99×10⁹ × ${q1}×10⁻⁶ × ${q2}×10⁻⁶ / ${(r2 / 100).toFixed(2)}² = ${fix(k * q1 * q2 * 1e-12 / (r2 / 100) ** 2, 3)} N`] }; },
    () => { const q1 = randi(1, 50), r2 = +rand(0.05, 2).toFixed(2); return { q: `Find the electric field strength <b>${r2} m</b> from a point charge of <b>${q1} nC</b>.`, a: k * q1 * 1e-9 / (r2 * r2), unit: 'N C⁻¹', steps: ['E = kQ/r²', `= 8.99×10⁹ × ${q1}×10⁻⁹ / ${r2}² = ${fix(k * q1 * 1e-9 / (r2 * r2), 1)} N C⁻¹`] }; },
    () => { const r2 = 5.3e-11; return { q: 'Find the electrostatic force between the proton and electron in hydrogen (r = 5.3 × 10⁻¹¹ m).', a: k * e * e / (r2 * r2), unit: 'N', steps: ['F = ke²/r²', `= ${sci(k * e * e / (r2 * r2), 3)} N`] }; },
  ] });
}

/* ---------- Lab B: uniform field between plates ---------- */
function mountPlates(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1.05 });
  let V = 2000, dmm = 10, drop = { y: 0.3, vy: 0 }, nq = 3, m = 4e-15, t = 0;
  L.loop(dt => {
    t += dt;
    const d = dmm / 1000, E = V / d, q = nq * e, Fe = q * E, Wt = m * G;
    // oil drop with drag: terminal-ish motion, scaled for display
    const net = Fe - Wt, target = clamp(net / Wt, -3, 3) * 0.12; drop.vy += (target - drop.vy) * Math.min(1, dt * 4); drop.y = clamp(drop.y - drop.vy * dt, 0.03, 0.97); if (drop.y === 0.03 || drop.y === 0.97) drop.vy = 0;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, top = H * 0.16, bot = H * 0.84, x0 = W * 0.08, x1 = W * 0.62;
    c.fillStyle = C.red; c.fillRect(x0, top - 10, x1 - x0, 10); c.fillStyle = C.blue; c.fillRect(x0, bot, x1 - x0, 10);
    rich(c, `+${V} V`, x1 + 10, top - 5, { size: 12, w: 700, color: C.red }); rich(c, '0 V', x1 + 10, bot + 5, { size: 12, w: 700, color: C.blue });
    for (let i = 0; i < 9; i++) { const x = x0 + 20 + i * (x1 - x0 - 40) / 8; arrow(c, x, top + 4, x, bot - 4, { color: alpha(C.orange, .45), width: 1.2, head: 7 }); }
    for (let j = 1; j < 5; j++) { const y = top + (bot - top) * j / 5; line(c, [[x0, y], [x1, y]], { color: alpha(C.green, .6), width: 1, dash: [4, 4] }); rich(c, `${fix(V * (1 - j / 5), 0)} V`, x0 - 6, y, { align: 'right', size: 10, mono: true, color: C.green }); }
    const dx = (x0 + x1) / 2, dy = top + drop.y * (bot - top);
    dot(c, dx, dy, 8, C.orange, C.paper2); rich(c, `${nq}e`, dx + 12, dy - 12, { size: 11, w: 700, color: C.orange });
    const sc = 40 / Math.max(Fe, Wt);
    arrow(c, dx - 14, dy, dx - 14, dy - Fe * sc, { color: C.red, width: 2.4 }); rich(c, '*qE*', dx - 20, dy - Fe * sc, { align: 'right', size: 12, color: C.red });
    arrow(c, dx + 14, dy, dx + 14, dy + Wt * sc, { color: C.violet, width: 2.4 }); rich(c, '*mg*', dx + 20, dy + Wt * sc, { size: 12, color: C.violet });
    const bal = Math.abs(net) / Wt < 0.03;
    rich(c, bal ? 'BALANCED: qE = mg' : net > 0 ? 'electric force > weight: drop rises' : 'weight > electric force: drop falls', (x0 + x1) / 2, H - 10, { align: 'center', size: 13, w: 700, color: bal ? C.green : C.ink2 });
    // side info
    const sx = W * 0.8; rich(c, '*E* = *V*/*d*', sx, H * 0.3, { align: 'center', size: 16, w: 700, color: C.ink }); rich(c, `= ${sci(E, 3)} V m⁻¹`, sx, H * 0.3 + 26, { align: 'center', size: 13, mono: true, color: C.ink2 });
    rich(c, `balancing pd = mgd/q = ${fix(Wt * d / q, 0)} V`, sx, H * 0.55, { align: 'center', size: 12, color: C.muted });
    ro.set('E', `${sci(E, 3)} N C⁻¹`); ro.set('F', `${sci(Fe, 3)} N`); ro.set('W', `${sci(Wt, 3)} N`); ro.set('Vb', `${fix(Wt * d / q, 0)} V`);
  }, [S]);
  const g = Group(P.side, 'Plates');
  Slider(g, { id: 'pl-V', label: 'Plate pd <i>V</i>', min: 0, max: 5000, step: 10, value: V, unit: 'V', fmt: v => fix(v, 0), oninput: v => V = v });
  Slider(g, { id: 'pl-d', label: 'Separation <i>d</i>', min: 4, max: 20, step: 1, value: dmm, unit: 'mm', fmt: v => fix(v, 0), oninput: v => dmm = v });
  Slider(g, { id: 'pl-n', label: 'Charge on drop', min: 1, max: 8, step: 1, value: nq, unit: '× e', fmt: v => fix(v, 0), oninput: v => nq = v });
  Btns(g).append(el('button', { class: 'btn', type: 'button', onclick: () => { nq = randi(1, 8); m = rand(2, 8) * 1e-15; drop = { y: 0.3, vy: 0 }; } }, 'New oil drop'));
  const ro = Readout(Group(P.side, 'Forces'), [['E', 'Field <i>E</i> = <i>V</i>/<i>d</i>'], ['F', 'Electric force <i>qE</i>'], ['W', 'Weight <i>mg</i>'], ['Vb', 'pd to balance', 'hl']]);
  Note(P.side, 'Between parallel plates the field is uniform: the force on the drop is the same wherever it is. Adjust the pd until the drop hangs still — then <i>qV</i>/<i>d</i> = <i>mg</i> gives its charge (Millikan’s idea: charge comes in multiples of <i>e</i>).');
  EqCard(P.below, 'Uniform field (5.3.3)', [['E = \\frac{V}{d}', 'V m⁻¹ ≡ N C⁻¹'], ['F = qE = \\frac{qV}{d}', ''], ['qE = mg', 'balanced charged drop']]);
  Card(P.below, 'Similarities & differences with gravity (5.3.4)', list(['Both are inverse-square fields for point sources; field strength is force per unit mass / per unit positive charge.', 'Gravitational forces are always attractive; electric forces can attract or repel.', 'Gravity acts on mass, electric force on charge. Gravity is very much weaker (ratio of electric to gravitational force between two protons ≈ 10³⁶).', 'A uniform electric field exists between charged parallel plates (away from the edges); Earth’s gravitational field is uniform only over small heights.']));
  Drill(P.below, { title: 'Uniform field drill', gens: [
    () => { const V2 = randi(50, 5000), d = randi(2, 50); return { q: `Two plates <b>${d} mm</b> apart have a pd of <b>${V2} V</b>. Find the field strength.`, a: V2 / (d / 1000), unit: 'V m⁻¹', steps: ['E = V/d', `= ${V2}/${d}×10⁻³ = ${sci(V2 / (d / 1000), 3)} V m⁻¹`] }; },
    () => { const V2 = randi(200, 4000), d = randi(5, 20); const F = e * V2 / (d / 1000); return { q: `Find the force on an electron between plates <b>${d} mm</b> apart with a pd of <b>${V2} V</b>.`, a: F, unit: 'N', steps: [`E = ${sci(V2 / (d / 1000), 3)} V m⁻¹`, `F = eE = ${sci(F, 3)} N`] }; },
    () => { const m2 = +rand(1, 9).toFixed(1), d = randi(5, 15), V2 = randi(200, 2000); const q2 = m2 * 1e-15 * G * (d / 1000) / V2; return { q: `An oil drop of mass <b>${m2} × 10⁻¹⁵ kg</b> is held stationary between plates <b>${d} mm</b> apart with a pd of <b>${V2} V</b>. Find its charge.`, a: q2, unit: 'C', steps: ['qV/d = mg ⇒ q = mgd/V', `= ${m2}×10⁻¹⁵ × 9.81 × ${d}×10⁻³ / ${V2} = ${sci(q2, 3)} C`] }; },
  ] });
}

topic({
  id: 'electric', code: '5.3', unit: 'A2 2', title: 'Electric Fields', short: 'Electric',
  blurb: 'Coulomb’s inverse-square law, radial and uniform fields, and balancing a charged oil drop between parallel plates.',
  outcomes: [
    ['5.3.1', 'recall and use Coulomb’s law F = Q₁Q₂/4πε₀r²', 'coulomb'],
    ['5.3.2', 'define electric field strength and recall and use E = F/q and E = Q/4πε₀r²', 'coulomb'],
    ['5.3.3', 'recall and use E = V/d for a uniform field', 'plates'],
    ['5.3.4', 'compare electric and gravitational fields', 'plates'],
  ],
  labs: [
    { id: 'coulomb', title: 'Coulomb’s law', hint: 'inverse square', spec: ['5.3.1', '5.3.2'], mount: mountCoulomb },
    { id: 'plates', title: 'Parallel plates & oil drop', hint: 'E = V/d', spec: ['5.3.3', '5.3.4'], mount: mountPlates },
  ],
  equations: [['F = \\frac{Q_1Q_2}{4\\pi\\varepsilon_0 r^2}', ''], ['E = \\frac{F}{q}', ''], ['E = \\frac{Q}{4\\pi\\varepsilon_0 r^2}', ''], ['E = \\frac{V}{d}', 'uniform']],
  traps: ['Convert µC, nC to C and cm, mm to m before using Coulomb’s law.', 'Square r!', 'E = V/d only for a <b>uniform</b> field.', 'Field direction = direction of force on a <b>positive</b> charge: an electron accelerates the other way.', 'N C⁻¹ and V m⁻¹ are the same unit.'],
  notes: [
    ['Coulomb’s law', 'The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation: F = Q₁Q₂/4πε₀r².'],
    ['Electric field strength', 'E = F/q, the force per unit positive charge; vector; N C⁻¹. Radial field of a point charge: E = Q/4πε₀r².'],
    ['Uniform fields', 'Between parallel plates E = V/d (V m⁻¹), same magnitude and direction everywhere except near the edges.'],
    ['Comparison with gravity', 'Both inverse-square; gravity only attracts and acts on mass; electric attracts or repels and acts on charge; gravity is ~10³⁶ times weaker for fundamental particles.'],
  ],
  mini(c, w, h2, t, C) {
    const x2 = w * 0.55 + Math.sin(t) * w * 0.15; dot(c, w * 0.25, h2 / 2, 10, C.red); dot(c, x2, h2 / 2, 10, C.blue);
    const f = 900 / (x2 - w * 0.25); arrow(c, w * 0.25, h2 / 2, w * 0.25 + f, h2 / 2, { color: C.green, width: 2 }); arrow(c, x2, h2 / 2, x2 - f, h2 / 2, { color: C.green, width: 2 });
  },
});
})();

/* ================= 5.4 Capacitors ================= */
(() => {

/* ---------- Lab A: charging & discharging ---------- */
function mountRC(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.5, minH: 220, maxH: 300, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 380, plain: true });
  let E = 10, R = 100e3, Cf = 100e-6, sw = 'charge', Vc = 0, t = 0, hist = [], view = 'V', rows = [], rec = false, recT = 0;
  const tau = () => R * Cf;
  L.loop(dt => {
    const n = 20, h = dt / n; for (let i = 0; i < n; i++) { const I = sw === 'charge' ? (E - Vc) / R : sw === 'discharge' ? -Vc / R : 0; Vc += I * h / Cf; } t += dt;
    if (sw !== 'open') { hist.push([t, Vc, sw === 'charge' ? (E - Vc) / R : -Vc / R]); if (hist.length > 3000) hist.shift(); }
    if (rec && sw === 'discharge') { recT += dt; if (rows.length === 0 || recT - rows[rows.length - 1].t >= tau() / 3) rows.push({ t: recT, V: Vc * (1 + gauss() * 0.004) }); if (rows.length > 14) rec = false; }
    const I = sw === 'charge' ? (E - Vc) / R : sw === 'discharge' ? -Vc / R : 0;
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, x0 = W * 0.08, xm = W * 0.42, x1 = W * 0.72, y0 = H * 0.2, y1 = H * 0.82;
    comp(c, 'battery', x0, y1, x0, y0, { label: `${E} V`, side: 1 });
    comp(c, 'wire', x0, y0, xm - 30, y0);
    // two-way switch
    dot(c, xm, y0, 4, C.ink); dot(c, xm - 30, y0, 3, C.ink); dot(c, xm + 30, y0, 3, C.ink);
    c.strokeStyle = C.ink; c.lineWidth = 2.4; c.beginPath(); c.moveTo(xm, y0); if (sw === 'charge') c.lineTo(xm - 28, y0 - 1); else if (sw === 'discharge') c.lineTo(xm + 28, y0 - 1); else c.lineTo(xm, y0 - 26); c.stroke();
    comp(c, 'wire', xm, y0, xm, (y0 + y1) / 2 - 30); comp(c, 'capacitor', xm, (y0 + y1) / 2 - 30, xm, (y0 + y1) / 2 + 30, { label: `${fix(Cf * 1e6, 0)} µF`, side: -1 }); comp(c, 'resistor', xm, (y0 + y1) / 2 + 30, xm, y1, { label: `${num(R / 1000, 3)} kΩ`, side: -1 });
    comp(c, 'wire', xm, y1, x0, y1); comp(c, 'wire', xm + 30, y0, x1, y0); comp(c, 'wire', x1, y0, x1, y1); comp(c, 'wire', x1, y1, xm, y1);
    rich(c, 'discharge path', x1 - 6, y1 - 12, { align: 'right', size: 11, color: C.muted });
    // charge on plates
    const q = Vc / E, cy = (y0 + y1) / 2 - 30;
    for (let k2 = 0; k2 < Math.round(q * 6); k2++) { rich(c, '+', xm - 20 + k2 * 7, cy + 26 - 36, { size: 10, color: C.red, w: 700 }); rich(c, '−', xm - 20 + k2 * 7, cy + 34 + 4, { size: 10, color: C.blue, w: 700 }); }
    meter(c, W * 0.86, H * 0.3, `V꜀ = ${fix(Vc, 2)} V`, { color: C.violet }); meter(c, W * 0.86, H * 0.55, `I = ${fix(I * 1e6, 1)} µA`, { color: C.blue }); meter(c, W * 0.86, H * 0.8, `Q = ${fix(Cf * Vc * 1e6, 0)} µC`, { color: C.red });
    // graph
    S2.begin();
    if (view === 'ln') {
      const pl = new Plot(S2, { xlabel: 'time *t* / s', ylabel: 'ln(*V* / V)', xmin: 0, xmax: Math.max(5 * tau(), 1), ymin: -3, ymax: Math.log(E) + 0.3 });
      pl.axes(); pl.cross(rows.map(r => [r.t, Math.log(r.V)]), { color: C.red, s: 5, width: 2 });
      if (rows.length >= 2) { const n2 = rows.length, xs = rows.map(r => r.t), ys = rows.map(r => Math.log(r.V)), mx = xs.reduce((a, b) => a + b) / n2, my = ys.reduce((a, b) => a + b) / n2; let sxy = 0, sxx = 0; xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; }); const m = sxy / sxx, b = my - m * mx; pl.curve(x => m * x + b, { color: C.green, width: 1.8 }); pl.label(0.1 * pl.xmax, pl.ymin + 0.4, `gradient = −1/*RC* ⇒ *RC* = ${fix(-1 / m, 2)} s`, { size: 12.5, w: 700, color: C.green }); }
      else rich(S2.ctx, 'Charge fully, then press “Discharge & record” to log readings', pl.x0 + pl.pw / 2, pl.y0 + pl.ph / 2, { align: 'center', size: 13, color: C.muted });
    } else {
      const t0 = Math.max(0, t - Math.max(6 * tau(), 3)), pl = new Plot(S2, { xlabel: 'time *t* / s', ylabel: view === 'V' ? 'capacitor pd *V* / V' : 'current *I* / µA', xmin: t0, xmax: t0 + Math.max(6 * tau(), 3), ymin: view === 'V' ? 0 : -E / R * 1e6 * 1.1, ymax: view === 'V' ? E * 1.1 : E / R * 1e6 * 1.1 });
      pl.axes(); pl.curve(hist.filter(q2 => q2[0] >= t0).map(q2 => [q2[0], view === 'V' ? q2[1] : q2[2] * 1e6]), { color: view === 'V' ? C.violet : C.blue, width: 2.4 });
      if (view === 'V') { pl.hline(E * 0.63, { color: alpha(C.green, .6) }); pl.label(t0 + 0.02 * pl.xmax, E * 0.63, '63%', { dy: -9, size: 11, color: C.green }); pl.hline(E * 0.37, { color: alpha(C.red, .6) }); pl.label(t0 + 0.02 * pl.xmax, E * 0.37, '37%', { dy: 12, size: 11, color: C.red }); }
    }
    ro.set('tau', `${fix(tau(), 2)} s`); ro.set('V', `${fix(Vc, 3)} V`); ro.set('Q', `${sci(Cf * Vc, 3)} C`); ro.set('W', `${sci(0.5 * Cf * Vc * Vc, 3)} J`); ro.set('half', `${fix(tau() * Math.LN2, 2)} s`);
  }, [S1, S2]);
  const g = Group(P.side, 'Circuit');
  Slider(g, { id: 'rc-R', label: 'Resistance <i>R</i>', min: 10, max: 500, step: 10, value: R / 1000, unit: 'kΩ', fmt: v => fix(v, 0), oninput: v => R = v * 1000 });
  Slider(g, { id: 'rc-C', label: 'Capacitance <i>C</i>', min: 10, max: 470, step: 10, value: Cf * 1e6, unit: 'µF', fmt: v => fix(v, 0), oninput: v => Cf = v * 1e-6 });
  Slider(g, { id: 'rc-E', label: 'Supply emf', min: 2, max: 12, step: 0.5, value: E, unit: 'V', fmt: v => fix(v, 1), oninput: v => E = v });
  const b = Btns(g); Btn(b, 'Charge', () => sw = 'charge', 'pri'); Btn(b, 'Discharge', () => sw = 'discharge'); Btn(b, 'Discharge & record', () => { sw = 'discharge'; rows = []; rec = true; recT = 0; view = 'ln'; vs.set('ln'); }); Btn(b, 'Open', () => sw = 'open');
  const vs = Seg(g, { label: 'Graph', options: [['V', 'V against t'], ['I', 'I against t'], ['ln', 'ln V against t']], value: view, onchange: v => view = v });
  const ro = Readout(Group(P.side, 'Capacitor'), [['tau', 'Time constant <i>RC</i>', 'hl'], ['half', 'Half-life 0.69<i>RC</i>'], ['V', 'pd'], ['Q', 'Charge <i>Q</i> = <i>CV</i>'], ['W', 'Energy ½<i>CV</i>²']]);
  Note(P.side, 'After one time constant <i>RC</i> a discharging capacitor has 37% of its charge left; a charging one has reached 63%. Bigger <i>R</i> or <i>C</i> ⇒ slower.');
  EqCard(P.below, 'Capacitance & time constant (5.4.1, 5.4.4)', [['C = \\frac{Q}{V}', 'farad = C V⁻¹'], ['Q = Q_0 e^{-t/RC}', 'discharge (same form for V and I)'], ['V = V_0(1 - e^{-t/RC})', 'charging'], ['\\ln V = \\ln V_0 - \\frac{t}{RC}', 'straight line, gradient −1/RC'], ['\\tau = RC', 'seconds']]);
  Card(P.below, 'Measuring RC (5.4.5)', list(['Charge the capacitor, then discharge it through a known resistor while a voltmeter (or data logger) records V against t.', 'Plot ln V against t: a straight line of gradient −1/RC.', 'Alternatively find the time for V to fall to 37% of V₀ (one time constant) or to half (0.69 RC).', 'Use a data logger for small RC; use a stopwatch with large R and C.']));
  Drill(P.below, { title: 'RC drill', gens: [
    () => { const R2 = randi(10, 470), C2 = randi(10, 1000); return { q: `Find the time constant of a <b>${R2} kΩ</b> resistor and a <b>${C2} µF</b> capacitor.`, a: R2 * 1e3 * C2 * 1e-6, unit: 's', steps: ['τ = RC', `= ${R2}×10³ × ${C2}×10⁻⁶ = ${fix(R2 * 1e3 * C2 * 1e-6, 3)} s`] }; },
    () => { const V0 = randi(5, 20), tau2 = +rand(1, 20).toFixed(1), tt = +rand(0.5, 30).toFixed(1); return { q: `A capacitor charged to <b>${V0} V</b> discharges with time constant <b>${tau2} s</b>. Find the pd after <b>${tt} s</b>.`, a: V0 * Math.exp(-tt / tau2), unit: 'V', steps: ['V = V₀e^(−t/RC)', `= ${V0} × e^(−${tt}/${tau2}) = ${fix(V0 * Math.exp(-tt / tau2), 3)} V`] }; },
    () => { const V0 = randi(6, 12), Vt = +rand(1, V0 - 1).toFixed(1), tau2 = +rand(2, 20).toFixed(1); return { q: `How long does it take a capacitor (RC = <b>${tau2} s</b>) to discharge from <b>${V0} V</b> to <b>${Vt} V</b>?`, a: tau2 * Math.log(V0 / Vt), unit: 's', steps: ['t = RC ln(V₀/V)', `= ${tau2} × ln(${V0}/${Vt}) = ${fix(tau2 * Math.log(V0 / Vt), 3)} s`] }; },
  ] });
}

/* ---------- Lab B: energy stored & combinations ---------- */
function mountStore(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 300, maxH: 440, mobileAspect: 1.1 });
  let C1 = 100, C2 = 220, C3 = 470, topo = 'parallel', V = 9;
  L.loop(() => {
    const c = S.begin(), Cc = Theme.c, W = S.w, H = S.h, wide = W > 620;
    let Ct; if (topo === 'series') Ct = 1 / (1 / C1 + 1 / C2 + 1 / C3); else if (topo === 'parallel') Ct = C1 + C2 + C3; else Ct = C1 + 1 / (1 / C2 + 1 / C3);
    const Q = Ct * 1e-6 * V, Wd = 0.5 * Q * V;
    // Q–V graph with area
    const pl = new Plot(S, { rect: wide ? { x: W * 0.5, y: 0, w: W * 0.5, h: H } : { x: 0, y: H * 0.45, w: W, h: H * 0.55 }, xlabel: 'pd *V* / V', ylabel: 'charge *Q* / mC', xmin: 0, xmax: 12, ymin: 0, ymax: Math.max(1, (C1 + C2 + C3) * 12 / 1000) * 1.05 });
    pl.axes(); pl.area([[0, 0], [V, Q * 1000]], alpha(Cc.orange, .3)); pl.curve(x => Ct * x / 1000, { color: Cc.violet, width: 2.4 });
    pl.dots([[V, Q * 1000]], { color: Cc.red, r: 6, stroke: Cc.paper2 }); pl.label(V * 0.55, Q * 1000 * 0.25, `area = ½*QV* = ${sci(Wd, 3)} J`, { align: 'center', size: 12, w: 700, color: Cc.orange, bg: alpha(Cc.paper2, .8) });
    pl.label(0.3, pl.ymax * 0.92, `gradient = *C* = ${fix(Ct, 1)} µF`, { size: 12, w: 600, color: Cc.violet });
    // circuit sketch
    const bx = wide ? 20 : 10, bw = wide ? W * 0.45 : W - 20, by = 20, bh = wide ? H - 40 : H * 0.4, x0 = bx + 20, x1 = bx + bw - 20, y0 = by + 20, y1 = by + bh - 10;
    comp(c, 'battery', x0, y1, x0, y0, { label: `${V} V`, side: 1, size: 28 });
    const cap = (xa, ya, xb, yb, val) => comp(c, 'capacitor', xa, ya, xb, yb, { label: `${val} µF`, size: 26 });
    if (topo === 'series') { const s = (x1 - x0) / 3; cap(x0, y0, x0 + s, y0, C1); cap(x0 + s, y0, x0 + 2 * s, y0, C2); cap(x0 + 2 * s, y0, x1, y0, C3); comp(c, 'wire', x1, y0, x1, y1); }
    else if (topo === 'parallel') { const xa = x0 + (x1 - x0) * 0.3, xb = x1; comp(c, 'wire', x0, y0, xb, y0); const ys = [y0 + (y1 - y0) * 0.25, y0 + (y1 - y0) * 0.5, y0 + (y1 - y0) * 0.75]; comp(c, 'wire', xa, y0, xa, ys[2]); comp(c, 'wire', xb, y0, xb, y1); [C1, C2, C3].forEach((v2, i) => cap(xa, ys[i], xb, ys[i], v2)); }
    else { const xa = x0 + (x1 - x0) * 0.25, xm = (xa + x1) / 2, yb = (y0 + y1) / 2; comp(c, 'wire', x0, y0, xa, y0); cap(xa, y0, xm, y0, C2); cap(xm, y0, x1, y0, C3); comp(c, 'wire', xa, y0, xa, yb); cap(xa, yb, x1, yb, C1); comp(c, 'wire', x1, y0, x1, y1); }
    comp(c, 'wire', x1, y1, x0, y1);
    ro.set('Ct', `${fix(Ct, 2)} µF`); ro.set('Q', `${sci(Q, 3)} C`); ro.set('W', `${sci(Wd, 3)} J`);
  }, [S]);
  const g = Group(P.side, 'Capacitors');
  Seg(g, { options: [['series', 'Series'], ['parallel', 'Parallel'], ['mix', 'C₁ parallel to (C₂, C₃ in series)']], value: topo, wrap: true, onchange: v => topo = v });
  Slider(g, { id: 'cs-1', label: '<i>C</i>₁', min: 10, max: 1000, step: 10, value: C1, unit: 'µF', fmt: v => fix(v, 0), oninput: v => C1 = v });
  Slider(g, { id: 'cs-2', label: '<i>C</i>₂', min: 10, max: 1000, step: 10, value: C2, unit: 'µF', fmt: v => fix(v, 0), oninput: v => C2 = v });
  Slider(g, { id: 'cs-3', label: '<i>C</i>₃', min: 10, max: 1000, step: 10, value: C3, unit: 'µF', fmt: v => fix(v, 0), oninput: v => C3 = v });
  Slider(g, { id: 'cs-V', label: 'Supply pd', min: 1, max: 12, step: 0.5, value: V, unit: 'V', fmt: v => fix(v, 1), oninput: v => V = v });
  const ro = Readout(Group(P.side, 'Combination'), [['Ct', 'Total capacitance', 'hl'], ['Q', 'Charge from supply'], ['W', 'Energy stored']]);
  Note(P.side, 'Capacitors combine the <b>opposite</b> way to resistors: parallel capacitances add; in series the reciprocals add.');
  EqCard(P.below, 'Energy & combinations (5.4.2–5.4.3)', [['W = \\frac{1}{2}QV = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}', 'area under Q–V'], ['C_T = C_1 + C_2 + C_3', 'parallel'], ['\\frac{1}{C_T} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}', 'series']]);
  Card(P.below, 'Uses of capacitors (5.4.6)', list(['Camera flash: a capacitor charges slowly from the battery, then discharges quickly through the flash tube, delivering high power.', 'Back-up power for memory and clocks; smoothing the output of rectifiers.', 'Defibrillators: a large stored energy delivered in a short pulse.', 'Timing circuits: the time constant sets the delay (e.g. windscreen wipers, flashing lights).']));
  Drill(P.below, { title: 'Capacitor drill', gens: [
    () => { const C2_ = randi(10, 4700), V2 = randi(3, 30); return { q: `Find the energy stored in a <b>${C2_} µF</b> capacitor charged to <b>${V2} V</b>.`, a: 0.5 * C2_ * 1e-6 * V2 * V2, unit: 'J', steps: ['W = ½CV²', `= ½ × ${C2_}×10⁻⁶ × ${V2}² = ${sci(0.5 * C2_ * 1e-6 * V2 * V2, 3)} J`] }; },
    () => { const a = randi(10, 470), b2 = randi(10, 470); return { q: `Find the total capacitance of <b>${a} µF</b> and <b>${b2} µF</b> in series.`, a: a * b2 / (a + b2), unit: 'µF', steps: ['1/C = 1/C₁ + 1/C₂', `C = ${a}×${b2}/(${a}+${b2}) = ${fix(a * b2 / (a + b2), 2)} µF`] }; },
    () => { const Q2 = randi(10, 900), V2 = randi(2, 30); return { q: `A capacitor stores <b>${Q2} µC</b> at <b>${V2} V</b>. Find its capacitance.`, a: Q2 / V2, unit: 'µF', steps: ['C = Q/V', `= ${Q2}/${V2} = ${fix(Q2 / V2, 2)} µF`] }; },
  ] });
}

topic({
  id: 'capacitors', code: '5.4', unit: 'A2 2', title: 'Capacitors', short: 'Capacitors',
  blurb: 'Charge and discharge through a resistor, watch the exponential, find RC from a ln V graph, and store energy in series and parallel banks.',
  outcomes: [
    ['5.4.1', 'define capacitance and the farad, and recall and use C = Q/V', 'rc'],
    ['5.4.2', 'recall and use the energy stored W = ½QV = ½CV² = Q²/2C, including as the area under a Q–V graph', 'store'],
    ['5.4.3', 'recall and use the formulae for capacitors in series and in parallel', 'store'],
    ['5.4.4', 'demonstrate an understanding of charging and discharging through a resistor, recall and use Q = Q₀e^(−t/RC) and the time constant τ = RC', 'rc'],
    ['5.4.5', 'describe an experiment to determine the time constant of an RC circuit', 'rc'],
    ['5.4.6', 'describe uses of capacitors, such as flash photography', 'store'],
  ],
  labs: [
    { id: 'rc', title: 'Charge & discharge', hint: 'τ = RC', spec: ['5.4.1', '5.4.4', '5.4.5'], mount: mountRC },
    { id: 'store', title: 'Energy & combinations', hint: 'area under Q–V', spec: ['5.4.2', '5.4.3', '5.4.6'], mount: mountStore },
  ],
  equations: [['C = \\frac{Q}{V}', ''], ['W = \\frac{1}{2}CV^2', ''], ['Q = Q_0e^{-t/RC}', ''], ['\\tau = RC', ''], ['C_T = \\Sigma C', 'parallel'], ['\\frac{1}{C_T} = \\Sigma\\frac{1}{C}', 'series']],
  traps: ['Capacitors combine the opposite way to resistors.', 'µF: 1 µF = 10⁻⁶ F.', 'Energy is ½QV, not QV (the other half is dissipated in the resistor while charging).', 'Time constant: 37% <b>remaining</b> on discharge, 63% <b>reached</b> on charging.', 'ln V against t has gradient −1/RC, not −RC.'],
  notes: [
    ['Capacitance', 'C = Q/V: the charge stored per unit pd. 1 farad = 1 coulomb per volt. A capacitor is two conducting plates separated by an insulator (dielectric).'],
    ['Energy stored', 'W = ½QV = ½CV² = Q²/2C — the area under the Q–V graph.'],
    ['Combinations', 'Parallel: C_T = C₁ + C₂ + …; series: 1/C_T = 1/C₁ + 1/C₂ + …'],
    ['Discharge', 'Q = Q₀e^(−t/RC), and the same exponential form for V and I. Time constant τ = RC: the time for the charge to fall to 1/e (37%) of its initial value.'],
    ['Charging', 'Q = Q₀(1 − e^(−t/RC)); the current decays exponentially as the pd across the capacitor rises.'],
    ['Measuring RC', 'Record V during discharge, plot ln V against t: gradient −1/RC.'],
  ],
  mini(c, w, h2, t, C) {
    const x0 = 14, y0 = h2 - 14, W2 = w - 28, H2 = h2 - 28, tt = (t % 5) / 5;
    line(c, [[x0, y0 - H2], [x0, y0], [x0 + W2, y0]], { color: C.ink2, width: 1.2 });
    const pts = []; for (let k = 0; k <= 60; k++) { const q = k / 60; if (q > tt) break; pts.push([x0 + q * W2, y0 - H2 * Math.exp(-q * 4)]); } line(c, pts, { color: C.violet, width: 2.2 });
  },
});
})();

/* ================= 5.5 Magnetic fields ================= */
(() => {
const G = 9.81;
const xmark = (c, x, y, r, col) => { c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(x - r * 0.6, y - r * 0.6); c.lineTo(x + r * 0.6, y + r * 0.6); c.moveTo(x - r * 0.6, y + r * 0.6); c.lineTo(x + r * 0.6, y - r * 0.6); c.stroke(); };
const omark = (c, x, y, r, col) => { c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke(); dot(c, x, y, r * 0.3, col); };

/* ---------- Lab A: F = BIl and field patterns ---------- */
function mountMotor(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1.05 });
  let mode = 'force', B = 0.08, I = 3, lcm = 5, ang = 90, dir = 1, t = 0;
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    if (mode === 'force') {
      const F = B * I * lcm / 100 * Math.sin(ang * DEG);
      // magnet poles
      const cx = W * 0.4, cy = H * 0.52, pw = Math.min(W * 0.22, 190), ph = H * 0.5;
      c.fillStyle = alpha(C.red, .85); c.fillRect(cx - pw - 60, cy - ph / 2, 60, ph); c.fillStyle = alpha(C.blue, .85); c.fillRect(cx + pw, cy - ph / 2, 60, ph);
      rich(c, 'N', cx - pw - 30, cy, { align: 'center', size: 22, w: 800, color: C.paper2 }); rich(c, 'S', cx + pw + 30, cy, { align: 'center', size: 22, w: 800, color: C.paper2 });
      for (let k = 0; k < 6; k++) { const y = cy - ph / 2 + 16 + k * (ph - 32) / 5; arrow(c, cx - pw + 4, y, cx + pw - 4, y, { color: alpha(C.violet, .5), width: 1.2, head: 7 }); }
      rich(c, `*B* = ${fix(B * 1000, 0)} mT`, cx, cy - ph / 2 - 12, { align: 'center', size: 12, w: 600, color: C.violet });
      // wire at angle θ to field (drawn in the plane of the screen) — force is into/out of the page; show as a side panel
      const wl = ph * 0.8 * (lcm / 10), a = ang * DEG, wx = Math.cos(a) * wl / 2, wy = Math.sin(a) * wl / 2;
      line(c, [[cx - wx, cy + wy], [cx + wx, cy - wy]], { color: C.orange, width: 5 });
      arrow(c, cx - dir * wx * 0.3, cy + dir * wy * 0.3, cx + dir * wx * 0.3, cy - dir * wy * 0.3, { color: C.ink, width: 2, head: 9 }); rich(c, '*I*', cx + wx * 0.3 + 10, cy - wy * 0.3, { size: 14, color: C.ink });
      // L × B with current up-screen and B to the right points into the page
      if (F > 1e-5) (dir > 0 ? xmark : omark)(c, cx + 34, cy + 34, 12, C.green);
      rich(c, F > 1e-5 ? `force ${dir > 0 ? 'INTO' : 'OUT of'} the page: ${fix(F * 1000, 2)} mN` : 'wire parallel to B: no force', cx, cy + ph / 2 + 22, { align: 'center', size: 13, w: 700, color: C.green });
      // current balance reading
      const bx = W * 0.84, by = H * 0.4; c.fillStyle = C.paper; c.strokeStyle = C.ink; c.lineWidth = 2; rrect(c, bx - 70, by - 26, 140, 52, 6); c.fill(); c.stroke();
      rich(c, `${fix(F / G * 1000, 3)} g`, bx, by, { align: 'center', size: 20, mono: true, w: 600, color: C.blue });
      rich(c, 'top-pan balance change', bx, by + 40, { align: 'center', size: 11, color: C.muted }); rich(c, '(magnet on balance, wire fixed)', bx, by + 56, { align: 'center', size: 10.5, color: C.muted });
      ro.set('F', `${fix(F * 1000, 3)} mN`); ro.set('m', `${fix(F / G * 1000, 3)} g`); ro.set('Bc', `${fix(B, 3)} T`);
    } else {
      // field patterns: straight wire (cross section) and solenoid
      const cx = W * 0.27, cy = H * 0.5;
      for (let r = 22; r < Math.min(W * 0.24, H * 0.45); r += 18) { c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.strokeStyle = alpha(C.violet, .7 - r / 400); c.lineWidth = 1.3; c.stroke(); const a = -t * dir; const px = cx + r * Math.cos(a + r), py = cy + r * Math.sin(a + r); arrow(c, px, py, px + dir * Math.sin(a + r) * 8, py - dir * Math.cos(a + r) * 8, { color: C.violet, width: 1.3, head: 7 }); /* screen y is down: this tangent is anticlockwise on screen for dir > 0 */ }
      (dir > 0 ? omark : xmark)(c, cx, cy, 10, C.orange);
      rich(c, `current ${dir > 0 ? 'out of' : 'into'} page: field ${dir > 0 ? 'anticlockwise' : 'clockwise'} (right-hand grip)`, cx, 20, { align: 'center', size: 11.5, color: C.ink2, w: 600 });
      // solenoid
      const sx = W * 0.62, sw = W * 0.3, sy = H * 0.5, sh = H * 0.22;
      for (let k = 0; k < 10; k++) { const x = sx + k * sw / 9; (dir > 0 ? omark : xmark)(c, x, sy - sh / 2, 6, C.orange); (dir > 0 ? xmark : omark)(c, x, sy + sh / 2, 6, C.orange); }
      for (let k = -2; k <= 2; k++) { const y = sy + k * sh / 6; arrow(c, sx - 10, y, sx + sw + 10, y, { color: alpha(C.violet, .8), width: 1.3, head: 7 }); }
      for (const s of [-1, 1]) { c.beginPath(); c.ellipse(sx + sw / 2, sy + s * sh * 0.1, sw * 0.62, sh * 1.3, 0, s > 0 ? 0 : Math.PI, s > 0 ? Math.PI : TAU); c.strokeStyle = alpha(C.violet, .5); c.stroke(); }
      rich(c, dir > 0 ? 'N' : 'S', sx + sw + 24, sy, { size: 18, w: 800, color: C.red }); rich(c, dir > 0 ? 'S' : 'N', sx - 24, sy, { align: 'right', size: 18, w: 800, color: C.blue });
      rich(c, 'solenoid: uniform field inside, like a bar magnet outside', sx + sw / 2, 20, { align: 'center', size: 11.5, color: C.ink2, w: 600 });
      ro.set('F', '—'); ro.set('m', '—'); ro.set('Bc', '—');
    }
  }, [S]);
  const g = Group(P.side, 'View');
  Seg(g, { options: [['force', 'Force on a wire'], ['patterns', 'Field patterns']], value: mode, onchange: v => { mode = v; gf.hidden = v !== 'force'; } });
  const gf = el('div', { class: 'grp' }); g.append(gf);
  Slider(gf, { id: 'mg-B', label: 'Flux density <i>B</i>', min: 0.01, max: 0.3, step: 0.01, value: B, unit: 'T', fmt: v => fix(v, 2), oninput: v => B = v });
  Slider(gf, { id: 'mg-I', label: 'Current <i>I</i>', min: 0, max: 8, step: 0.1, value: I, unit: 'A', fmt: v => fix(v, 1), oninput: v => I = v });
  Slider(gf, { id: 'mg-l', label: 'Length in field <i>l</i>', min: 1, max: 10, step: 0.5, value: lcm, unit: 'cm', fmt: v => fix(v, 1), oninput: v => lcm = v });
  Slider(gf, { id: 'mg-a', label: 'Angle between wire and field <i>θ</i>', min: 0, max: 90, step: 1, value: ang, unit: '°', fmt: v => fix(v, 0), oninput: v => ang = v });
  Btns(g).append(el('button', { class: 'btn', type: 'button', onclick: () => dir = -dir }, 'Reverse current'));
  const ro = Readout(Group(P.side, 'Force'), [['F', '<i>F</i> = <i>BIl</i> sin <i>θ</i>', 'hl'], ['m', 'Balance reading'], ['Bc', '<i>B</i>']]);
  Note(P.side, '<b>Fleming’s left-hand rule:</b> First finger = Field (N → S), seCond finger = Current, thuMb = Motion (force). The force is biggest when the wire is at 90° to the field and zero when parallel.');
  EqCard(P.below, 'Motor effect (5.5.1–5.5.2)', [['F = BIl\\sin\\theta', ''], ['B = \\frac{F}{Il}', 'defines the tesla'], ['1\\,\\text{T} = 1\\,\\text{N A}^{-1}\\,\\text{m}^{-1}', '']]);
  Card(P.below, 'Definitions', list(['<b>Magnetic flux density</b> B is the force per unit current per unit length on a conductor placed at right angles to the field.', 'One <b>tesla</b> is the flux density that produces a force of 1 N on a 1 m length of wire carrying 1 A at right angles to the field.', 'Current balance: the magnet sits on a top-pan balance; the reading change × g equals the force on the wire (Newton’s third law).', 'Field patterns: concentric circles round a straight wire (right-hand grip rule); a uniform field inside a long solenoid.']));
  Drill(P.below, { title: 'Motor effect drill', gens: [
    () => { const B2 = +rand(0.02, 1).toFixed(2), I2 = +rand(0.5, 10).toFixed(1), l = +rand(0.02, 0.5).toFixed(2); return { q: `A wire of length <b>${l} m</b> carrying <b>${I2} A</b> lies at right angles to a field of <b>${B2} T</b>. Find the force.`, a: B2 * I2 * l, unit: 'N', steps: ['F = BIl', `= ${B2} × ${I2} × ${l} = ${fix(B2 * I2 * l, 4)} N`] }; },
    () => { const B2 = +rand(0.05, 0.5).toFixed(2), I2 = randi(1, 10), l = +rand(0.05, 0.3).toFixed(2), a = pick([20, 30, 45, 60]); return { q: `Same idea at an angle: <b>B = ${B2} T</b>, <b>I = ${I2} A</b>, <b>l = ${l} m</b>, wire at <b>${a}°</b> to the field. Find F.`, a: B2 * I2 * l * Math.sin(a * DEG), unit: 'N', steps: ['F = BIl sin θ', `= ${fix(B2 * I2 * l * Math.sin(a * DEG), 4)} N`] }; },
    () => { const dm = +rand(0.5, 5).toFixed(2), I2 = randi(2, 8), l = +rand(0.03, 0.1).toFixed(2); const F = dm / 1000 * G; return { q: `In a current balance the reading changes by <b>${dm} g</b> when <b>${I2} A</b> flows through <b>${l} m</b> of wire in the field. Find B.`, a: F / (I2 * l), unit: 'T', steps: [`F = Δm g = ${sci(F, 3)} N`, `B = F/Il = ${fix(F / (I2 * l), 4)} T`] }; },
  ] });
}

/* ---------- Lab B: electromagnetic induction ---------- */
function mountInduction(P, L) {
  const S1 = L.stage(P.stageBox, { aspect: 2.4, minH: 230, maxH: 300, mobileAspect: 1.3 });
  const S2 = L.stage(P.stageBox, { aspect: 2.2, minH: 260, maxH: 380, plain: true });
  let mode = 'magnet', N = 200, auto = true, x = -1.2, xv = 0, drag = false, t = 0, hist = [], w = 3, Bg = 0.1, A = 0.01, flip = 1;
  const phi = xx => 2e-4 * flip / Math.pow(1 + (xx / 0.25) ** 2, 1.5); // flux through one turn, Wb
  const geo = () => ({ cx: S1.w * 0.45, sc: S1.w * 0.25 });
  Pointer(S1, { hit: (px) => mode === 'magnet' ? 'm' : null, down: () => { drag = true; auto = false; }, up: () => drag = false, move: (_, px) => { const g = geo(); const nx = (px - g.cx) / g.sc; xv = (nx - x) / 0.016; x = clamp(nx, -1.6, 1.6); } });
  let lastPhi = null;
  L.loop(dt => {
    t += dt;
    let flux, emf;
    if (mode === 'magnet') {
      if (auto) { x = 1.4 * Math.sin(t * 1.4); }
      flux = N * phi(x);
    } else { flux = N * Bg * A * Math.cos(w * t); }
    emf = lastPhi == null || dt === 0 ? 0 : -(flux - lastPhi) / dt; lastPhi = flux;
    hist.push([t, flux, emf]); while (hist.length && hist[0][0] < t - 6) hist.shift();
    const c = S1.begin(), C = Theme.c, W = S1.w, H = S1.h, g = geo(), cy = H * 0.5;
    if (mode === 'magnet') {
      // coil
      for (let k = 0; k < 12; k++) { const xx = g.cx - 40 + k * 7; c.beginPath(); c.ellipse(xx, cy, 5, 38, 0, 0, TAU); c.strokeStyle = C.orange; c.lineWidth = 2; c.stroke(); }
      const mx = g.cx + x * g.sc; c.fillStyle = C.red; c.fillRect(mx, cy - 12, 60, 24); c.fillStyle = C.blue; c.fillRect(mx - 60, cy - 12, 60, 24);
      rich(c, flip > 0 ? 'N' : 'S', mx + 30, cy, { align: 'center', size: 13, w: 800, color: C.paper2 }); rich(c, flip > 0 ? 'S' : 'N', mx - 30, cy, { align: 'center', size: 13, w: 800, color: C.paper2 });
      const dxm = x - (mountInduction.px ?? x); mountInduction.px = x;
      if (Math.abs(emf) > 1e-3 && Math.abs(dxm) > 1e-5) { const facing = x > 0 ? (flip > 0 ? 'S' : 'N') : (flip > 0 ? 'N' : 'S'), appr = dxm * x < 0, pole = appr ? facing : (facing === 'N' ? 'S' : 'N'); rich(c, `coil end facing the magnet becomes ${pole}: it ${appr ? 'repels the approaching' : 'attracts the retreating'} magnet — opposing the change (Lenz)`, g.cx, cy + 58, { align: 'center', size: 11.5, w: 600, color: C.green }); }
      rich(c, auto ? 'magnet moving in and out automatically — or drag it' : 'drag the magnet through the coil', 12, 16, { size: 11, color: C.muted });
    } else {
      const ang = w * t, cx = g.cx; c.fillStyle = alpha(C.red, .85); c.fillRect(cx - 170, cy - 50, 40, 100); c.fillStyle = alpha(C.blue, .85); c.fillRect(cx + 130, cy - 50, 40, 100);
      rich(c, 'N', cx - 150, cy, { align: 'center', size: 16, w: 800, color: C.paper2 }); rich(c, 'S', cx + 150, cy, { align: 'center', size: 16, w: 800, color: C.paper2 });
      const hw = 90 * Math.abs(Math.cos(ang)); c.strokeStyle = C.orange; c.lineWidth = 4; c.strokeRect(cx - hw, cy - 42, 2 * hw, 84); line(c, [[cx, cy - 60], [cx, cy + 60]], { color: C.muted, width: 1, dash: [3, 3] });
      rich(c, `coil angle ${fix((ang / DEG) % 360, 0)}°`, cx, cy + 66, { align: 'center', size: 11.5, color: C.muted });
    }
    // galvanometer
    const gx = W < 560 ? W - 52 : W * 0.86, gy = W < 560 ? 70 : H * 0.55, gr = W < 560 ? 32 : 40; c.beginPath(); c.arc(gx, gy, gr, Math.PI, TAU); c.strokeStyle = C.ink2; c.lineWidth = 2; c.stroke();
    const emax = mode === 'magnet' ? N * 2e-4 * 6 : N * Bg * A * w, na = clamp(emf / emax, -1, 1) * 1.3; line(c, [[gx, gy], [gx + Math.sin(na) * gr * 0.9, gy - Math.cos(na) * gr * 0.9]], { color: C.red, width: 2.4 });
    rich(c, `${fix(emf * 1000, 1)} mV`, gx, gy + 16, { align: 'center', size: 12, mono: true, w: 600 });
    S2.begin(); const t0 = t - 6;
    const fm = Math.max(1e-6, ...hist.map(h => Math.abs(h[1]))) * 1.2, em = Math.max(1e-6, ...hist.map(h => Math.abs(h[2]))) * 1.2;
    const p1 = new Plot(S2, { rect: { x: 0, y: 0, w: S2.w, h: S2.h / 2 }, ylabel: '*N*Φ / Wb-turns', xmin: t0, xmax: t, ymin: -fm, ymax: fm, pad: { l: 58, r: 12, t: 12, b: 22 }, title: 'flux linkage' });
    const p2 = new Plot(S2, { rect: { x: 0, y: S2.h / 2, w: S2.w, h: S2.h / 2 }, ylabel: 'emf / mV', xlabel: 'time *t* / s', xmin: t0, xmax: t, ymin: -em * 1000, ymax: em * 1000, pad: { l: 58, r: 12, t: 12, b: 34 }, title: 'induced emf = −gradient of flux linkage' });
    p1.axes(); p1.curve(hist.map(h => [h[0], h[1]]), { color: C.violet, width: 2.2 }); p2.axes(); p2.curve(hist.map(h => [h[0], h[2] * 1000]), { color: C.red, width: 2.2 });
    ro.set('fl', `${sci(flux, 3)} Wb`); ro.set('e', `${fix(emf * 1000, 2)} mV`); ro.set('pk', mode === 'rotate' ? `${fix(N * Bg * A * w * 1000, 2)} mV = BANω` : '—');
  }, [S1, S2]);
  const g = Group(P.side, 'Experiment');
  Seg(g, { options: [['magnet', 'Magnet & coil'], ['rotate', 'Rotating coil (a.c. generator)']], value: mode, wrap: true, onchange: v => { mode = v; hist = []; lastPhi = null; gm.hidden = v !== 'magnet'; gr2.hidden = v !== 'rotate'; } });
  Slider(g, { id: 'in-N', label: 'Turns <i>N</i>', min: 20, max: 500, step: 10, value: N, fmt: v => fix(v, 0), oninput: v => { N = v; lastPhi = null; } });
  const gm = el('div', { class: 'grp' }); g.append(gm);
  const b = Btns(gm); Btn(b, 'Auto motion', () => auto = !auto, 'pri'); Btn(b, 'Flip magnet', () => { flip = -flip; lastPhi = null; });
  const gr2 = el('div', { class: 'grp' }); gr2.hidden = true; g.append(gr2);
  Slider(gr2, { id: 'in-w', label: 'Angular speed <i>ω</i>', min: 0.5, max: 10, step: 0.5, value: w, unit: 'rad s⁻¹', fmt: v => fix(v, 1), oninput: v => { w = v; lastPhi = null; } });
  Slider(gr2, { id: 'in-B', label: 'Flux density <i>B</i>', min: 0.02, max: 0.5, step: 0.01, value: Bg, unit: 'T', fmt: v => fix(v, 2), oninput: v => { Bg = v; lastPhi = null; } });
  const ro = Readout(Group(P.side, 'Now'), [['fl', 'Flux linkage <i>N</i>Φ'], ['e', 'Induced emf', 'hl'], ['pk', 'Peak emf']]);
  Note(P.side, 'The emf depends on the <b>rate of change</b> of flux linkage, not the flux itself: it is biggest where the flux graph is steepest. Move faster or add turns for a bigger emf.');
  EqCard(P.below, 'Induction (5.5.3–5.5.4)', [['\\Phi = BA', 'weber, Wb'], ['\\text{flux linkage} = N\\Phi', ''], ['E = -\\frac{\\Delta(N\\Phi)}{\\Delta t}', 'Faraday + Lenz'], ['E = BAN\\omega\\sin\\omega t', 'rotating coil']]);
  Card(P.below, 'Laws', list(['<b>Magnetic flux</b> Φ = BA, where A is the area perpendicular to B. 1 Wb = 1 T m².', '<b>Faraday’s law:</b> the induced emf is proportional to the rate of change of magnetic flux linkage.', '<b>Lenz’s law:</b> the direction of the induced emf (current) is such as to oppose the change producing it — a consequence of conservation of energy.', 'Pushing a magnet in makes the near end of the coil the same pole (repelling); pulling it out makes it the opposite pole (attracting).']));
  Drill(P.below, { title: 'Induction drill', gens: [
    () => { const B2 = +rand(0.05, 1).toFixed(2), a = +rand(1, 50).toFixed(1), N2 = randi(10, 500); return { q: `A coil of <b>${N2}</b> turns and area <b>${a} cm²</b> is perpendicular to a field of <b>${B2} T</b>. Find the flux linkage.`, a: N2 * B2 * a * 1e-4, unit: 'Wb turns', steps: [`Φ = BA = ${B2} × ${a}×10⁻⁴ = ${sci(B2 * a * 1e-4, 3)} Wb`, `NΦ = ${sci(N2 * B2 * a * 1e-4, 3)} Wb turns`] }; },
    () => { const N2 = randi(50, 800), dphi = +rand(0.5, 20).toFixed(1), dt = +rand(0.05, 2).toFixed(2); return { q: `The flux through a <b>${N2}</b>-turn coil changes by <b>${dphi} mWb</b> in <b>${dt} s</b>. Find the average induced emf.`, a: N2 * dphi / 1000 / dt, unit: 'V', steps: ['E = NΔΦ/Δt', `= ${N2} × ${dphi}×10⁻³ / ${dt} = ${fix(N2 * dphi / 1000 / dt, 3)} V`] }; },
    () => { const N2 = randi(50, 500), B2 = +rand(0.05, 0.5).toFixed(2), a = +rand(0.002, 0.05).toFixed(3), f = randi(10, 60); return { q: `A generator coil has <b>${N2}</b> turns of area <b>${a} m²</b>, rotating at <b>${f} Hz</b> in <b>${B2} T</b>. Find the peak emf.`, a: B2 * a * N2 * TAU * f, unit: 'V', steps: ['E₀ = BANω, ω = 2πf', `= ${B2} × ${a} × ${N2} × 2π × ${f} = ${fix(B2 * a * N2 * TAU * f, 2)} V`] }; },
  ] });
}

/* ---------- Lab C: transformers & transmission ---------- */
function mountTransformer(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1.05 });
  let Np = 100, Ns = 2000, Vp = 25000, Pw = 50e6, Rline = 10, t = 0;
  L.loop(dt => {
    t += dt;
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    const Vs = Vp * Ns / Np, I = Pw / Vs, loss = I * I * Rline, eff = 1 - loss / Pw;
    // transformer core
    const cx = W * 0.25, cy = H * 0.38, cw = Math.min(170, W * 0.24), ch = H * 0.46;
    c.strokeStyle = C.ink2; c.lineWidth = 14; c.strokeRect(cx - cw / 2, cy - ch / 2, cw, ch); c.lineWidth = 1;
    const coil = (x, n, col) => { const k = clamp(Math.round(n / 100), 2, 18); for (let i = 0; i < k; i++) { const y = cy - ch / 2 + 12 + i * (ch - 24) / (k - 1 || 1); c.beginPath(); c.ellipse(x, y, 14, 4, 0, 0, TAU); c.strokeStyle = col; c.lineWidth = 2; c.stroke(); } };
    coil(cx - cw / 2, Np, C.blue); coil(cx + cw / 2, Ns, C.red);
    rich(c, `${Np} turns`, cx - cw / 2, cy + ch / 2 + 18, { align: 'center', size: 11.5, color: C.blue, w: 600 }); rich(c, `${Ns} turns`, cx + cw / 2, cy + ch / 2 + 18, { align: 'center', size: 11.5, color: C.red, w: 600 });
    rich(c, `${num(Vp / 1000, 3)} kV in`, cx - cw / 2 - 20, cy, { align: 'right', size: 12.5, w: 700, color: C.blue }); rich(c, Ns > Np ? 'STEP-UP' : Ns < Np ? 'STEP-DOWN' : 'isolating', cx, cy - ch / 2 - 18, { align: 'center', size: 12, w: 800, color: C.ink2 });
    // transmission line with pylons
    const lx0 = cx + cw / 2 + 30, lx1 = W - 30, ly = cy - ch / 4;
    for (let k = 0; k < 4; k++) { const px = lx0 + (k + 0.5) * (lx1 - lx0) / 4; line(c, [[px, ly - 10], [px - 14, ly + 90], [px + 14, ly + 90], [px, ly - 10]], { color: C.ink2, width: 1.5 }); line(c, [[px - 16, ly], [px + 16, ly]], { color: C.ink2, width: 1.5 }); }
    const pts = []; for (let x = lx0; x <= lx1; x += 6) { const k = ((x - lx0) / ((lx1 - lx0) / 4)) % 1; pts.push([x, ly + 14 * Math.sin(k * Math.PI)]); } line(c, pts, { color: C.orange, width: 2.2 });
    flowDots(c, pts, t * 0.02 * Math.min(4, I / 400), 20, alpha(C.red, clamp(loss / Pw * 8, 0.2, 1)), 3);
    rich(c, `line: ${num(Vs / 1000, 3)} kV, ${num(I, 3)} A`, (lx0 + lx1) / 2, ly - 30, { align: 'center', size: 13, w: 700, color: C.ink });
    rich(c, `heat lost in cables *I*²*R* = ${num(loss / 1e6, 3)} MW (${fix(loss / Pw * 100, 2)}%)`, (lx0 + lx1) / 2, H - 20, { align: 'center', size: 13, w: 700, color: loss / Pw > 0.1 ? C.red : C.green });
    ro.set('Vs', `${num(Vs / 1000, 4)} kV`); ro.set('I', `${num(I, 4)} A`); ro.set('loss', `${num(loss / 1e6, 4)} MW`); ro.set('eff', `${fix(eff * 100, 2)}%`); ro.set('Ip', `${num(Pw / Vp, 4)} A`);
  }, [S]);
  const g = Group(P.side, 'Transformer');
  Slider(g, { id: 'tf-Np', label: 'Primary turns <i>N</i>ₚ', min: 50, max: 2000, step: 50, value: Np, fmt: v => fix(v, 0), oninput: v => Np = v });
  Slider(g, { id: 'tf-Ns', label: 'Secondary turns <i>N</i>ₛ', min: 50, max: 4000, step: 50, value: Ns, fmt: v => fix(v, 0), oninput: v => Ns = v });
  Slider(g, { id: 'tf-Vp', label: 'Primary pd', min: 5, max: 50, step: 1, value: Vp / 1000, unit: 'kV', fmt: v => fix(v, 0), oninput: v => Vp = v * 1000 });
  Slider(g, { id: 'tf-P', label: 'Power transmitted', min: 1, max: 200, step: 1, value: Pw / 1e6, unit: 'MW', fmt: v => fix(v, 0), oninput: v => Pw = v * 1e6 });
  Slider(g, { id: 'tf-R', label: 'Cable resistance', min: 1, max: 50, step: 1, value: Rline, unit: 'Ω', fmt: v => fix(v, 0), oninput: v => Rline = v });
  const ro = Readout(Group(P.side, 'Ideal transformer'), [['Vs', 'Secondary pd'], ['Ip', 'Primary current'], ['I', 'Line current'], ['loss', 'Power lost', 'hl'], ['eff', 'Transmission efficiency']]);
  Note(P.side, 'For the same power, stepping the voltage up by 10× cuts the current by 10× and the <i>I</i>²<i>R</i> heating by <b>100×</b>. That is why the grid runs at hundreds of kV.');
  EqCard(P.below, 'Transformers (5.5.5)', [['\\frac{V_s}{V_p} = \\frac{N_s}{N_p}', 'ideal'], ['V_pI_p = V_sI_s', '100% efficient'], ['P_{loss} = I^2R', 'in the cables']]);
  Card(P.below, 'How transformers work & where energy goes', list(['An alternating current in the primary produces a changing flux in the soft-iron core; the changing flux linkage in the secondary induces an alternating emf (Faraday).', 'They only work with a.c. — steady d.c. gives no changing flux.', '<b>Eddy currents</b> induced in the core heat it: reduced by a <b>laminated</b> core (insulated sheets).', 'Resistance heating of the windings (use thick copper), hysteresis losses (soft iron), and flux leakage (wind the coils on top of each other).', 'Transmission: step up to high voltage at the power station, step down near homes for safety.']));
  Drill(P.below, { title: 'Transformer drill', gens: [
    () => { const Np2 = randi(100, 2000), Ns2 = randi(20, 5000), Vp2 = pick([12, 230, 400, 11000]); return { q: `An ideal transformer has <b>${Np2}</b> primary and <b>${Ns2}</b> secondary turns, with <b>${Vp2} V</b> across the primary. Find the secondary pd.`, a: Vp2 * Ns2 / Np2, unit: 'V', steps: ['Vs/Vp = Ns/Np', `Vs = ${Vp2} × ${Ns2}/${Np2} = ${fix(Vp2 * Ns2 / Np2, 2)} V`] }; },
    () => { const P2 = randi(1, 100) * 1e6, V2 = pick([11e3, 33e3, 132e3, 275e3, 400e3]), R2 = randi(2, 30); const I = P2 / V2; return { q: `<b>${P2 / 1e6} MW</b> is transmitted at <b>${V2 / 1000} kV</b> through cables of total resistance <b>${R2} Ω</b>. Find the power lost.`, a: I * I * R2, unit: 'W', steps: [`I = P/V = ${fix(I, 2)} A`, `P_loss = I²R = ${sci(I * I * R2, 3)} W`] }; },
    () => ({ q: 'Why is a transformer core laminated?', options: ['To reduce eddy currents and the heating they cause', 'To increase the flux leakage', 'To make it work with d.c.', 'To increase the number of turns'], correct: 0, why: 'Insulated laminations break up the eddy-current paths.' }),
  ] });
}

topic({
  id: 'magnetic', code: '5.5', unit: 'A2 2', title: 'Magnetic Fields', short: 'Magnetism',
  blurb: 'F = BIl and Fleming’s left hand, magnets through coils, a.c. generators, Faraday and Lenz, and why the grid runs at 400 kV.',
  outcomes: [
    ['5.5.1', 'sketch magnetic field patterns for a straight wire and a solenoid, and define magnetic flux density and the tesla', 'motor'],
    ['5.5.2', 'recall and use F = BIl sin θ and Fleming’s left-hand rule', 'motor'],
    ['5.5.3', 'define magnetic flux and flux linkage, and recall and use Φ = BA', 'induction'],
    ['5.5.4', 'state and use Faraday’s and Lenz’s laws of electromagnetic induction', 'induction'],
    ['5.5.5', 'describe the operation of an ideal transformer, recall and use Vs/Vp = Ns/Np, and explain energy losses and the transmission of electrical power', 'transformer'],
  ],
  labs: [
    { id: 'motor', title: 'Force on a current', hint: 'F = BIl sin θ', spec: ['5.5.1', '5.5.2'], mount: mountMotor },
    { id: 'induction', title: 'Electromagnetic induction', hint: 'Faraday & Lenz', spec: ['5.5.3', '5.5.4'], mount: mountInduction },
    { id: 'transformer', title: 'Transformers & the grid', hint: 'I²R losses', spec: ['5.5.5'], mount: mountTransformer },
  ],
  equations: [['F = BIl\\sin\\theta', ''], ['\\Phi = BA', ''], ['E = -\\frac{\\Delta(N\\Phi)}{\\Delta t}', ''], ['\\frac{V_s}{V_p} = \\frac{N_s}{N_p}', '']],
  traps: ['Fleming’s <b>left</b> hand for motors (force), right-hand grip for field direction around a wire.', 'emf depends on the <b>rate of change</b> of flux linkage, not on the flux.', 'Area in cm² → m²: × 10⁻⁴.', 'Transformers need a.c.', 'Stepping up voltage steps down current (ideal: VpIp = VsIs).'],
  notes: [
    ['Magnetic flux density', 'B is the force per unit current per unit length on a wire at right angles to the field: B = F/Il. Unit tesla (T = N A⁻¹ m⁻¹).'],
    ['Motor effect', 'F = BIl sin θ; direction by Fleming’s left-hand rule (First finger Field, seCond finger Current, thuMb Motion).'],
    ['Flux and flux linkage', 'Φ = BA (weber, Wb), with A perpendicular to B. Flux linkage = NΦ.'],
    ['Faraday and Lenz', 'Induced emf = −rate of change of flux linkage. The minus sign (Lenz) means the induced current opposes the change causing it (conservation of energy).'],
    ['Transformers', 'Vs/Vp = Ns/Np; ideal VpIp = VsIs. Losses: eddy currents (laminate the core), winding resistance, hysteresis, flux leakage.'],
    ['Transmission', 'For a given power P = VI, high voltage means low current and much smaller I²R losses in the cables.'],
  ],
  mini(c, w, h2, t, C) {
    const cy = h2 / 2, x = w * 0.5 + Math.sin(t * 1.5) * w * 0.28;
    for (let k = 0; k < 8; k++) { c.beginPath(); c.ellipse(w * 0.45 + k * 6, cy, 4, 26, 0, 0, TAU); c.strokeStyle = C.orange; c.lineWidth = 1.6; c.stroke(); }
    c.fillStyle = C.red; c.fillRect(x, cy - 7, 30, 14); c.fillStyle = C.blue; c.fillRect(x - 30, cy - 7, 30, 14);
  },
});
})();

/* ================= 5.6 Deflection of charged particles ================= */
(() => {
const e = 1.6e-19, me = 9.11e-31, mp = 1.67e-27;

/* ---------- Lab A: electron beam in E and B fields ---------- */
function mountBeam(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.9, minH: 320, maxH: 460, mobileAspect: 1.05 });
  let Va = 2000, Vd = 300, B = 0.6e-3, mode = 'E', t = 0;
  const d = 0.05, Lp = 0.1; // plate separation, plate length (m)
  L.loop(dt => {
    t += dt;
    const v0 = Math.sqrt(2 * e * Va / me), E = mode === 'B' ? 0 : Vd / d, Bf = mode === 'E' ? 0 : B;
    // integrate electron: q = −e; plates region x ∈ [0, Lp]; B region same
    const pts = []; let x = -0.02, y = 0, vx = v0, vy = 0; const h = 2e-11;
    for (let i = 0; i < 20000; i++) {
      const inside = x >= 0 && x <= Lp;
      let ax = 0, ay = 0;
      if (inside) { ay += (-e) * (-E) / me; /* top plate +: field points down (−y), force on electron up (+y) */ /* B into page: v × B = (−vy B, vx B) */ ax += (-e) * (-vy * Bf) / me; ay += (-e) * (vx * Bf) / me; }
      vx += ax * h; vy += ay * h; x += vx * h; y += vy * h;
      if (i % 20 === 0) pts.push([x, y]);
      if (x > 0.22 || x < -0.05 || Math.abs(y) > 0.06) break;
      if (inside && Math.abs(y) >= d / 2) break;
    }
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, sc = (W - 60) / 0.26, X = xx => 30 + (xx + 0.03) * sc, Y = yy => H / 2 - yy * sc;
    // plates
    if (mode !== 'B') { c.fillStyle = C.red; c.fillRect(X(0), Y(d / 2) - 6, Lp * sc, 6); c.fillStyle = C.blue; c.fillRect(X(0), Y(-d / 2), Lp * sc, 6); rich(c, `+${Vd} V`, X(Lp) + 6, Y(d / 2) - 3, { size: 11.5, w: 700, color: C.red }); rich(c, '0 V', X(Lp) + 6, Y(-d / 2) + 3, { size: 11.5, w: 700, color: C.blue }); }
    if (mode !== 'E') { c.fillStyle = alpha(C.violet, .08); c.fillRect(X(0), Y(0.05), Lp * sc, 0.1 * sc); for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) { const xx = X(0) + (i + 0.5) * Lp * sc / 5, yy = Y(0.05) + (j + 0.5) * 0.1 * sc / 4; c.strokeStyle = alpha(C.violet, .6); c.lineWidth = 1.2; c.beginPath(); c.arc(xx, yy, 5, 0, TAU); c.stroke(); c.beginPath(); c.moveTo(xx - 3, yy - 3); c.lineTo(xx + 3, yy + 3); c.moveTo(xx - 3, yy + 3); c.lineTo(xx + 3, yy - 3); c.stroke(); } rich(c, `*B* into page ${fix(B * 1000, 2)} mT`, X(Lp / 2), Y(0.05) - 10, { align: 'center', size: 11.5, color: C.violet }); }
    // screen
    c.fillStyle = alpha(C.green, .25); c.fillRect(X(0.2), Y(0.06), 8, 0.12 * sc); rich(c, 'screen', X(0.2) + 4, Y(0.06) - 8, { align: 'center', size: 11, color: C.muted });
    c.fillStyle = C.ink2; c.fillRect(X(-0.03), Y(0.004), 16, 0.008 * sc); rich(c, `electron gun ${Va} V`, X(-0.03), Y(0.004) - 10, { size: 11, color: C.muted });
    c.save(); c.shadowColor = C.cyan; c.shadowBlur = 8; line(c, pts.map(p => [X(p[0]), Y(p[1])]), { color: C.cyan, width: 2.4 }); c.restore();
    const n = pts.length, ph = (t * 0.8) % 1; if (n) { const p = pts[Math.floor(ph * (n - 1))]; dot(c, X(p[0]), Y(p[1]), 4, C.cyan); }
    const end = pts[pts.length - 1] || [0, 0], selV = E / (Bf || 1e-12);
    rich(c, mode === 'E' ? 'uniform E field: constant force ⇒ parabolic path (like a projectile)' : mode === 'B' ? 'uniform B field: force ⊥ velocity ⇒ circular arc' : Math.abs(v0 - selV) / v0 < 0.02 ? `crossed fields BALANCED: v = E/B = ${sci(selV, 3)} m s⁻¹ passes straight through` : 'crossed fields: electric and magnetic forces unbalanced', W / 2, 20, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    const yd = (e * E / me) * (Lp / v0) ** 2 / 2, r = Bf ? me * v0 / (e * Bf) : Infinity;
    ro.set('v', `${sci(v0, 3)} m s⁻¹`); ro.set('E', mode === 'B' ? '—' : `${sci(E, 3)} V m⁻¹`); ro.set('y', mode === 'E' ? `${fix(Math.min(yd, d / 2) * 1000, 2)} mm` : '—'); ro.set('r', isFinite(r) ? `${fix(r * 100, 2)} cm` : '—'); ro.set('sel', mode === 'EB' ? `${sci(selV, 3)} m s⁻¹` : '—');
  }, [S]);
  const g = Group(P.side, 'Deflection tube');
  Seg(g, { options: [['E', 'E field'], ['B', 'B field'], ['EB', 'Crossed E & B']], value: mode, onchange: v => mode = v });
  Slider(g, { id: 'db-Va', label: 'Accelerating pd', min: 500, max: 5000, step: 50, value: Va, unit: 'V', fmt: v => fix(v, 0), oninput: v => Va = v });
  Slider(g, { id: 'db-Vd', label: 'Deflecting pd', min: 0, max: 2000, step: 10, value: Vd, unit: 'V', fmt: v => fix(v, 0), oninput: v => Vd = v });
  Slider(g, { id: 'db-B', label: 'Flux density <i>B</i>', min: 0, max: 3, step: 0.02, value: B * 1000, unit: 'mT', fmt: v => fix(v, 2), oninput: v => B = v / 1000 });
  const ro = Readout(Group(P.side, 'Electron'), [['v', 'Speed √(2<i>eV</i>/<i>m</i>)'], ['E', 'Field <i>E</i> = <i>V</i>/<i>d</i>'], ['y', 'Deflection at plate exit'], ['r', 'Radius <i>mv</i>/<i>Be</i>', 'hl'], ['sel', 'Selected speed <i>E</i>/<i>B</i>']]);
  Note(P.side, 'In the electric field the force is constant, so the horizontal velocity is unchanged and the path is a parabola. In the magnetic field the force is always perpendicular to the velocity, so the speed never changes and the path is a circle.');
  EqCard(P.below, 'Charged particles in fields (5.6.1–5.6.3)', [['F = qE', 'electric, parallel to field'], ['F = Bqv', 'magnetic, ⊥ to v and B'], ['Bqv = \\frac{mv^2}{r} \\Rightarrow r = \\frac{mv}{Bq}', 'circular path'], ['qE = Bqv \\Rightarrow v = \\frac{E}{B}', 'velocity selector'], ['\\frac{1}{2}mv^2 = qV', 'accelerated from rest']]);
  Card(P.below, 'Key points', list(['Electric field deflection: treat like a projectile — constant horizontal velocity, uniform acceleration <i>qE</i>/<i>m</i> across the field.', 'Magnetic force does <b>no work</b> (always ⊥ to motion): the kinetic energy stays constant.', 'Direction of magnetic force: Fleming’s left-hand rule with current = direction of <b>positive</b> charge flow — reverse it for electrons.', 'Faster or heavier particles make bigger circles; stronger fields or bigger charges make smaller ones.']));
  Drill(P.below, { title: 'Deflection drill', gens: [
    () => { const v = randi(1, 9) * 1e6, B2 = +rand(0.5, 5).toFixed(1); return { q: `An electron moving at <b>${sci(v, 1)} m s⁻¹</b> enters a uniform field of <b>${B2} mT</b> at right angles. Find the radius of its path.`, a: me * v / (e * B2 * 1e-3), unit: 'm', steps: ['r = mv/Be', `= 9.11×10⁻³¹ × ${sci(v, 1)} / (1.6×10⁻¹⁹ × ${B2}×10⁻³) = ${sci(me * v / (e * B2 * 1e-3), 3)} m`] }; },
    () => { const E2 = randi(1, 50) * 1e3, B2 = +rand(0.5, 10).toFixed(1); return { q: `In a velocity selector <b>E = ${sci(E2, 2)} V m⁻¹</b> and <b>B = ${B2} mT</b>. What speed passes undeflected?`, a: E2 / (B2 * 1e-3), unit: 'm s⁻¹', steps: ['qE = Bqv ⇒ v = E/B', `= ${sci(E2, 2)}/${B2}×10⁻³ = ${sci(E2 / (B2 * 1e-3), 3)} m s⁻¹`] }; },
    () => { const v = randi(1, 50) * 1e5, B2 = +rand(0.1, 1).toFixed(2); return { q: `Find the magnetic force on a proton moving at <b>${sci(v, 1)} m s⁻¹</b> perpendicular to a <b>${B2} T</b> field.`, a: B2 * e * v, unit: 'N', steps: ['F = Bqv', `= ${B2} × 1.6×10⁻¹⁹ × ${sci(v, 1)} = ${sci(B2 * e * v, 3)} N`] }; },
  ] });
}

/* ---------- Lab B: circles in a magnetic field ---------- */
function mountCircles(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.5, minH: 360, maxH: 520, mobileAspect: 0.95 });
  const PARTS = { proton: [mp, 1, 'red'], deuteron: [2 * mp, 1, 'orange'], alpha: [4 * mp, 2, 'violet'], electron: [me, -1, 'cyan'] };
  let v = 2e6, B = 0.2, show = { proton: true, alpha: true, electron: false, deuteron: true }, t = 0;
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    c.fillStyle = alpha(C.violet, .06); c.fillRect(0, 0, W, H);
    for (let i = 0; i < 14; i++) for (let j = 0; j < 9; j++) { const x = (i + 0.5) * W / 14, y = (j + 0.5) * H / 9; c.strokeStyle = alpha(C.violet, .4); c.lineWidth = 1.2; c.beginPath(); c.moveTo(x - 3, y - 3); c.lineTo(x + 3, y + 3); c.moveTo(x - 3, y + 3); c.lineTo(x + 3, y - 3); c.stroke(); }
    const ex = 24, ey = H / 2, rmax = Math.max(...Object.entries(PARTS).filter(([k]) => show[k]).map(([, [m, q]]) => m * v / (Math.abs(q) * e * B)), 0.01), sc = Math.min(H * 0.23 / rmax, W * 0.45 / rmax);
    arrow(c, 4, ey, ex, ey, { color: C.ink2, width: 2 });
    for (const [k, [m, q, col]] of Object.entries(PARTS)) {
      if (!show[k]) continue; const r = m * v / (Math.abs(q) * e * B), R = r * sc, cy = ey - Math.sign(q) * R, T = TAU * m / (Math.abs(q) * e * B);
      c.beginPath(); c.arc(ex, cy, R, q > 0 ? Math.PI / 2 : -Math.PI / 2, q > 0 ? Math.PI / 2 + TAU : -Math.PI / 2 + TAU); c.strokeStyle = alpha(C[col], .5); c.lineWidth = 1.4; c.setLineDash([4, 4]); c.stroke(); c.setLineDash([]);
      const a = (t / 3) % 1 * TAU, px = ex + R * Math.sin(a), py = cy + Math.sign(q) * R * Math.cos(a);
      dot(c, px, py, 5, C[col], C.paper2); rich(c, `${k}: r = ${num(r * 100, 3)} cm, T = ${sci(T, 2)} s`, ex + 2 * R * 0 + (q > 0 ? 10 : 10), cy + (q > 0 ? -R - 10 : R + 12), { size: 11.5, w: 600, color: C[col], bg: alpha(C.paper2, .8) });
    }
    rich(c, '*B* into the page · positive charges curve one way, negative the other', W - 10, H - 12, { align: 'right', size: 11.5, color: C.ink2, bg: alpha(C.paper2, .8) });
  }, [S]);
  const g = Group(P.side, 'Particles');
  for (const k of Object.keys(PARTS)) Switch(g, { id: 'ci-' + k, label: k[0].toUpperCase() + k.slice(1), value: show[k], onchange: v2 => show[k] = v2 });
  Slider(g, { id: 'ci-v', label: 'Speed', min: 0.2, max: 10, step: 0.1, value: v / 1e6, unit: '× 10⁶ m s⁻¹', fmt: v2 => fix(v2, 1), oninput: v2 => v = v2 * 1e6 });
  Slider(g, { id: 'ci-B', label: 'Flux density', min: 0.02, max: 1, step: 0.01, value: B, unit: 'T', fmt: v2 => fix(v2, 2), oninput: v2 => B = v2 });
  Note(P.side, 'All particles move with the same speed here. The radius depends on the momentum-to-charge ratio <i>mv</i>/<i>q</i>, but the time for one orbit, 2π<i>m</i>/<i>Bq</i>, does <b>not</b> depend on the speed — the key to the cyclotron (5.7).');
  Card(P.below, 'Uses', list(['Mass spectrometer: ions of the same speed and charge but different mass follow circles of different radius.', 'Bubble / cloud chamber tracks: curvature reveals the sign of charge and the momentum.', 'Cyclotron: the orbit period is independent of speed, so a fixed-frequency alternating pd keeps accelerating the particle.']));
}

topic({
  id: 'deflection', code: '5.6', unit: 'A2 2', title: 'Deflection of Charged Particles', short: 'Deflection',
  blurb: 'Parabolas in electric fields, circles in magnetic fields, and a velocity selector that lets exactly one speed through.',
  outcomes: [
    ['5.6.1', 'describe and analyse the motion of charged particles in uniform electric fields', 'beam'],
    ['5.6.2', 'recall and use F = Bqv for a charged particle moving in a magnetic field, and explain circular motion with r = mv/Bq', 'circles'],
    ['5.6.3', 'describe the use of crossed electric and magnetic fields as a velocity selector', 'beam'],
  ],
  labs: [
    { id: 'beam', title: 'Deflection tube', hint: 'parabola, circle, selector', spec: ['5.6.1', '5.6.3'], mount: mountBeam },
    { id: 'circles', title: 'Circles in a B field', hint: 'r = mv/Bq', spec: ['5.6.2'], mount: mountCircles },
  ],
  equations: [['F = qE', ''], ['F = Bqv', ''], ['r = \\frac{mv}{Bq}', ''], ['v = \\frac{E}{B}', 'velocity selector']],
  traps: ['Magnetic force is perpendicular to velocity — it changes direction, not speed.', 'For electrons reverse the “current” direction in Fleming’s rule.', 'In an E field the horizontal velocity component is unchanged.', 'r = mv/Bq uses the charge magnitude; an alpha particle has q = 2e and m ≈ 4mₚ.'],
  notes: [
    ['In an electric field', 'Force qE parallel to the field (towards the negative plate for positive charges). Entering at right angles the path is a parabola: constant horizontal velocity, uniform acceleration qE/m perpendicular.'],
    ['In a magnetic field', 'Force Bqv perpendicular to both v and B. It provides a centripetal force: Bqv = mv²/r, so r = mv/Bq. Kinetic energy is unchanged. Period T = 2πm/Bq, independent of speed.'],
    ['Velocity selector', 'Crossed E and B fields: particles with v = E/B feel equal and opposite forces and pass through undeflected.'],
  ],
  mini(c, w, h2, t, C) {
    const R = h2 * 0.32, cx = w * 0.4, cy = h2 / 2; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.strokeStyle = alpha(C.cyan, .5); c.setLineDash([3, 3]); c.stroke(); c.setLineDash([]);
    dot(c, cx + R * Math.cos(t * 2), cy + R * Math.sin(t * 2), 5, C.cyan);
    const pts = []; for (let k = 0; k <= 30; k++) { const x = w * 0.62 + k * w * 0.012; pts.push([x, cy + 0.012 * (k * 2) ** 2]); } line(c, pts, { color: C.orange, width: 2 });
  },
});
})();

/* ================= 5.7 Particle accelerators ================= */
(() => {
const e = 1.6e-19, mp = 1.67e-27;

/* ---------- Lab A: the cyclotron ---------- */
function mountCyclotron(P, L) {
  const S = L.stage(P.stageBox, { aspect: 1.5, minH: 380, maxH: 540, mobileAspect: 0.95 });
  let B = 1.2, V = 50e3, fset = null, st, trail = [], R = 0.5, warp = 1;
  const f0 = () => B * e / (TAU * mp);
  function reset() { st = { x: 0, y: 0.002, vx: 0, vy: 0, t: 0, E: 0, out: false }; trail = []; }
  reset(); fset = f0();
  L.loop(dt => {
    const w = TAU * fset, gap = 0.01;
    if (!st.out) {
      // time scaled: one orbit per ~0.15 s of real time at resonance
      const scale = 1 / (f0() * 0.15), n = 400, h = dt * scale / n * warp;
      for (let i = 0; i < n; i++) {
        const Ex = Math.abs(st.x) < gap / 2 ? V / gap * Math.sin(w * st.t) : 0;
        // Lorentz force (B out of page): a = q/m (E + v × B)
        const ax = e / mp * (Ex + st.vy * B), ay = e / mp * (-st.vx * B);
        st.vx += ax * h; st.vy += ay * h; st.x += st.vx * h; st.y += st.vy * h; st.t += h;
        if (hyp(st.x, st.y) > R) { st.out = true; break; }
        if (i % 25 === 0) trail.push([st.x, st.y]);
      }
      trail.push([st.x, st.y]); while (trail.length > 12000) trail.shift();
    }
    const c = S.begin(), C = Theme.c, W = S.w, H = S.h, cx = W / 2, cy = H / 2, sc = Math.min(W, H) * 0.44 / R;
    // dees
    for (const s of [-1, 1]) { c.beginPath(); c.arc(cx + s * gap / 2 * sc * 4, cy, R * sc, s < 0 ? Math.PI / 2 : -Math.PI / 2, s < 0 ? 3 * Math.PI / 2 : Math.PI / 2); c.closePath(); c.fillStyle = alpha(s < 0 ? C.blue : C.red, .1); c.fill(); c.strokeStyle = alpha(s < 0 ? C.blue : C.red, .7); c.lineWidth = 2; c.stroke(); }
    const sgn = Math.sin(TAU * fset * st.t); rich(c, sgn > 0 ? '−' : '+', cx - R * sc * 0.6, cy - R * sc * 0.75, { align: 'center', size: 20, w: 800, color: C.blue }); rich(c, sgn > 0 ? '+' : '−', cx + R * sc * 0.6, cy - R * sc * 0.75, { align: 'center', size: 20, w: 800, color: C.red });
    line(c, trail.map(p => [cx + p[0] * sc, cy - p[1] * sc]), { color: C.orange, width: 1.4 });
    const p = trail[trail.length - 1] || [0, 0]; dot(c, cx + p[0] * sc, cy - p[1] * sc, 4, C.orange);
    const v = hyp(st.vx, st.vy), KE = 0.5 * mp * v * v;
    rich(c, st.out ? `EXTRACTED at r = ${R} m with ${fix(KE / e / 1e6, 2)} MeV` : Math.abs(fset - f0()) / f0() < 0.01 ? 'in resonance: the pd flips every half orbit' : 'out of step: the particle is slowed as often as it is sped up', W / 2, 20, { align: 'center', size: 13, w: 700, color: st.out ? C.green : C.ink2 });
    ro.set('f0', `${fix(f0() / 1e6, 3)} MHz`); ro.set('KE', `${fix(KE / e / 1e6, 3)} MeV`); ro.set('Emax', `${fix((B * e * R) ** 2 / (2 * mp) / e / 1e6, 2)} MeV`); ro.set('r', `${fix(hyp(p[0], p[1]) * 100, 1)} cm`);
  }, [S]);
  const g = Group(P.side, 'Cyclotron (protons)');
  Slider(g, { id: 'cy-B', label: 'Flux density <i>B</i>', min: 0.5, max: 2, step: 0.05, value: B, unit: 'T', fmt: v => fix(v, 2), oninput: v => { B = v; reset(); } });
  Slider(g, { id: 'cy-V', label: 'Dee pd', min: 5, max: 80, step: 1, value: V / 1000, unit: 'kV', fmt: v => fix(v, 0), oninput: v => { V = v * 1000; reset(); } });
  const sf = Slider(g, { id: 'cy-f', label: 'Oscillator frequency ÷ resonant', min: 0.9, max: 1.1, step: 0.005, value: 1, fmt: v => fix(v, 3) + '×', oninput: v => { fset = f0() * v; reset(); } });
  const b = Btns(g); Btn(b, 'Restart', reset, 'pri'); Btn(b, 'Tune to resonance', () => { fset = f0(); sf.set(1); reset(); });
  const ro = Readout(Group(P.side, 'Beam'), [['f0', 'Resonant f = <i>Bq</i>/2π<i>m</i>'], ['r', 'Orbit radius'], ['KE', 'Kinetic energy', 'hl'], ['Emax', 'Maximum (at dee radius)']]);
  Note(P.side, 'Each time the proton crosses the gap it is accelerated. Faster ⇒ bigger circle, but the <b>same period</b>, so a fixed-frequency a.c. supply stays in step — until relativistic mass increase breaks the resonance at high energy.');
  EqCard(P.below, 'Cyclotron (5.7.2)', [['f = \\frac{Bq}{2\\pi m}', 'independent of speed'], ['r = \\frac{mv}{Bq}', ''], ['E_{k,max} = \\frac{(BqR)^2}{2m}', 'at the dee radius R']]);
  Card(P.below, 'How it works', list(['Two hollow D-shaped electrodes (“dees”) in a vacuum, with a uniform magnetic field perpendicular to them.', 'An alternating pd across the gap accelerates the particle each time it crosses; inside a dee there is no electric field, so it just moves in a semicircle.', 'The time for each semicircle is the same, πm/Bq, so the pd must reverse at the frequency f = Bq/2πm.', 'At the outer edge a deflecting plate extracts the beam.', 'Limitation: at high speeds relativistic mass increase lengthens the period, so the particle falls out of step.']));
  Drill(P.below, { title: 'Cyclotron drill', gens: [
    () => { const B2 = +rand(0.5, 2).toFixed(2); return { q: `Find the frequency of the alternating supply needed for protons in a cyclotron with <b>B = ${B2} T</b>.`, a: B2 * e / (TAU * mp), unit: 'Hz', steps: ['f = Bq/2πm', `= ${B2} × 1.6×10⁻¹⁹ / (2π × 1.67×10⁻²⁷) = ${sci(B2 * e / (TAU * mp), 3)} Hz`] }; },
    () => { const B2 = +rand(0.8, 2).toFixed(2), R2 = +rand(0.3, 1).toFixed(2); const E2 = (B2 * e * R2) ** 2 / (2 * mp); return { q: `A proton cyclotron has <b>B = ${B2} T</b> and dee radius <b>${R2} m</b>. Find the maximum kinetic energy in MeV.`, a: E2 / e / 1e6, unit: 'MeV', steps: [`v = BqR/m = ${sci(B2 * e * R2 / mp, 3)} m s⁻¹`, `Eₖ = ½mv² = ${sci(E2, 3)} J = ${fix(E2 / e / 1e6, 2)} MeV`] }; },
  ] });
}

/* ---------- Lab B: linac & synchrotron ---------- */
function mountLinac(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.4, minH: 240, maxH: 340, mobileAspect: 1.3 });
  let V = 0.5e6, f = 200e6, n = 8, t = 0, mode = 'linac';
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h;
    if (mode === 'linac') {
      // tube lengths L_k = v_k / (2f), v_k from k gaps of energy qV (non-relativistic protons)
      const lens = [], vs = []; for (let k = 1; k <= n; k++) { const v = Math.sqrt(2 * k * e * V / mp); vs.push(v); lens.push(v / (2 * f)); }
      const tot = lens.reduce((a, b) => a + b, 0) + n * 0.02, sc = (W - 60) / tot; let x = 30;
      const cy = H * 0.5, T = 1 / f, ph = (t * 0.6) % 1, phase = Math.floor(t * 1.2) % 2;
      lens.forEach((Lk, k) => { const w = Lk * sc, pos = (k + phase) % 2 === 0; c.fillStyle = alpha(pos ? C.red : C.blue, .18); c.strokeStyle = pos ? C.red : C.blue; c.lineWidth = 1.5; c.fillRect(x, cy - 24, w, 48); c.strokeRect(x, cy - 24, w, 48); rich(c, pos ? '+' : '−', x + w / 2, cy - 36, { align: 'center', size: 14, w: 800, color: pos ? C.red : C.blue }); if (w > 34) rich(c, `${fix(Lk * 100, 1)} cm`, x + w / 2, cy + 38, { align: 'center', size: 10.5, mono: true, color: C.muted }); x += w + 0.02 * sc; });
      const px = 30 + ph * (W - 60); dot(c, px, cy, 5, C.orange);
      rich(c, 'drift tubes get longer: the particle speeds up in each gap but must spend the same half-period inside each tube', W / 2, 20, { align: 'center', size: 12, w: 600, color: C.ink2 });
      ro.set('E', `${fix(n * V / 1e6, 2)} MeV`); ro.set('v', `${sci(vs[n - 1], 3)} m s⁻¹`); ro.set('L', `${fix(lens[n - 1] * 100, 1)} cm`);
    } else {
      const cx = W / 2, cy = H / 2, R = Math.min(W * 0.4, H * 0.4), E = (t * 30) % 300, Bn = 0.2 + E / 300 * 1.6;
      c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.strokeStyle = C.ink2; c.lineWidth = 12; c.stroke(); c.lineWidth = 1;
      for (let k = 0; k < 8; k++) { const a = k * TAU / 8; c.save(); c.translate(cx + R * Math.cos(a), cy + R * Math.sin(a)); c.rotate(a); c.fillStyle = alpha(C.violet, .5 + 0.4 * Bn / 1.8); c.fillRect(-8, -14, 16, 28); c.restore(); }
      for (const a of [0.4, 2.5, 4.4]) { c.save(); c.translate(cx + R * Math.cos(a), cy + R * Math.sin(a)); c.rotate(a); c.fillStyle = C.red; c.fillRect(-4, -10, 8, 20); c.restore(); }
      const a = t * 3; dot(c, cx + R * Math.cos(a), cy + R * Math.sin(a), 5, C.orange);
      rich(c, `bending magnets B = ${fix(Bn, 2)} T (ramped up as energy rises)`, cx, cy - 10, { align: 'center', size: 12.5, w: 600, color: C.violet }); rich(c, `beam energy ${fix(E, 0)} GeV · constant radius`, cx, cy + 12, { align: 'center', size: 12.5, w: 600, color: C.orange });
      rich(c, 'red: accelerating cavities (radio-frequency)', 12, H - 10, { size: 11, color: C.red });
      ro.set('E', `${fix(E, 0)} GeV`); ro.set('v', '≈ c'); ro.set('L', 'fixed ring');
    }
  }, [S]);
  const g = Group(P.side, 'Accelerator');
  Seg(g, { options: [['linac', 'Linear accelerator'], ['sync', 'Synchrotron']], value: mode, onchange: v => { mode = v; gl.hidden = v !== 'linac'; } });
  const gl = el('div', { class: 'grp' }); g.append(gl);
  Slider(gl, { id: 'la-V', label: 'Gap pd', min: 0.1, max: 2, step: 0.1, value: V / 1e6, unit: 'MV', fmt: v => fix(v, 1), oninput: v => V = v * 1e6 });
  Slider(gl, { id: 'la-f', label: 'RF frequency', min: 50, max: 400, step: 10, value: f / 1e6, unit: 'MHz', fmt: v => fix(v, 0), oninput: v => f = v * 1e6 });
  Slider(gl, { id: 'la-n', label: 'Number of tubes', min: 3, max: 14, step: 1, value: n, fmt: v => fix(v, 0), oninput: v => n = v });
  const ro = Readout(Group(P.side, 'Exit beam'), [['E', 'Final energy', 'hl'], ['v', 'Final speed'], ['L', 'Last tube length']]);
  Note(P.side, 'Linac: the pd between neighbouring tubes alternates, so every gap accelerates the particle. Synchrotron: the ring radius is fixed, so the magnetic field and the RF frequency are increased together as the particles gain energy.');
  Card(P.below, 'Linac, cyclotron & synchrotron (5.7.1, 5.7.3)', list(['<b>Linear accelerator:</b> a line of drift tubes connected alternately to a high-frequency supply. Inside a tube there is no field; in each gap the particle is accelerated. Tube lengths increase so the transit time is always half a period.', '<b>Cyclotron:</b> compact, fixed frequency, but limited by relativistic effects and needs a huge magnet for high energy.', '<b>Synchrotron:</b> particles circulate in a ring of fixed radius; bending-magnet field and RF frequency are increased in step with the particle energy. Reaches very high energies (the LHC: 6.8 TeV per proton).', 'Synchrotron advantages: fixed radius so magnets only needed around a ring; can accelerate to relativistic speeds.', 'Colliding beams (head-on) make far more energy available for creating new particles than a beam hitting a fixed target.']));
}

topic({
  id: 'accelerators', code: '5.7', unit: 'A2 2', title: 'Particle Accelerators', short: 'Accelerators',
  blurb: 'Tune a cyclotron to resonance and spiral protons out to MeV energies, then compare the linac and the synchrotron.',
  outcomes: [
    ['5.7.1', 'describe the principles of operation of a linear accelerator', 'linac'],
    ['5.7.2', 'describe the principles of operation of a cyclotron and recall and use f = Bq/2πm', 'cyclotron'],
    ['5.7.3', 'describe the principles of operation of a synchrotron and compare the three types of accelerator', 'linac'],
  ],
  labs: [
    { id: 'cyclotron', title: 'Cyclotron', hint: 'stay in resonance', spec: ['5.7.2'], mount: mountCyclotron },
    { id: 'linac', title: 'Linac & synchrotron', hint: 'longer tubes, ramped fields', spec: ['5.7.1', '5.7.3'], mount: mountLinac },
  ],
  equations: [['f = \\frac{Bq}{2\\pi m}', ''], ['E_k = \\frac{(BqR)^2}{2m}', ''], ['\\Delta E = qV', 'per gap']],
  traps: ['Cyclotron frequency does not depend on speed or radius (non-relativistic).', 'Linac tubes get longer because the particle is faster, not because the frequency changes.', 'No electric field inside a drift tube or a dee.', 'Synchrotron: radius fixed, B and f increase.'],
  notes: [
    ['Linear accelerator', 'Charged particles pass through a series of drift tubes connected to an alternating supply. They accelerate across each gap; the tubes lengthen so each takes half a cycle.'],
    ['Cyclotron', 'Two dees in a uniform magnetic field. Particles accelerate across the gap and move in semicircles inside the dees; the radius grows with speed but the period T = 2πm/Bq does not, so a fixed frequency f = Bq/2πm works.'],
    ['Synchrotron', 'A ring of fixed radius. Bending magnets are ramped up and the accelerating frequency adjusted as energy increases. Used for the highest energies.'],
  ],
  mini(c, w, h2, t, C) {
    const cx = w / 2, cy = h2 / 2; const pts = []; for (let a = 0; a < 18; a += 0.1) pts.push([cx + a * 2.2 * Math.cos(a), cy + a * 1.8 * Math.sin(a)]);
    const k = Math.floor((t * 30) % pts.length); line(c, pts.slice(0, k), { color: C.orange, width: 1.4 }); if (pts[k]) dot(c, pts[k][0], pts[k][1], 3.5, C.orange);
  },
});
})();

/* ================= 5.8 Fundamental particles ================= */
(() => {
const Q = { u: [2 / 3, 1 / 3, 0], d: [-1 / 3, 1 / 3, 0], s: [-1 / 3, 1 / 3, -1] }; // charge, baryon no., strangeness
const qprops = q => { const bar = q.endsWith('̄') || q.endsWith('bar'); const b = q[0]; const [c, B, S] = Q[b]; return bar ? [-c, -B, -S] : [c, B, S]; };
const fr = x => { const n = Math.round(x * 3); if (n % 3 === 0) return String(n / 3).replace('-', '−'); return (n < 0 ? '−' : '+') + Math.abs(n) + '/3'; };
const BAR = s => s + '̄';
const KNOWN = {
  'uud': ['proton p', 'baryon'], 'udd': ['neutron n', 'baryon'], 'uuu': ['Δ⁺⁺', 'baryon'], 'ddd': ['Δ⁻', 'baryon'], 'uds': ['Λ⁰ or Σ⁰', 'baryon'], 'uus': ['Σ⁺', 'baryon'], 'dds': ['Σ⁻', 'baryon'], 'uss': ['Ξ⁰', 'baryon'], 'dss': ['Ξ⁻', 'baryon'], 'sss': ['Ω⁻', 'baryon'],
  'ud̄': ['π⁺', 'meson'], 'dū': ['π⁻', 'meson'], 'uū': ['π⁰', 'meson'], 'dd̄': ['π⁰', 'meson'], 'us̄': ['K⁺', 'meson'], 'sū': ['K⁻', 'meson'], 'ds̄': ['K⁰', 'meson'], 'sd̄': ['K̄⁰', 'meson'], 'ss̄': ['φ (phi)', 'meson'],
  'ūūd̄': ['antiproton p̄', 'antibaryon'], 'ūd̄d̄': ['antineutron n̄', 'antibaryon'],
};
const keyOf = qs => { const qq = qs.filter(q => !q.includes('̄')).sort(), aa = qs.filter(q => q.includes('̄')).sort(); if (aa.length === 0 || qq.length === 0) return (qq.length ? qq : aa).join(''); return qq.join('') + aa.join(''); };

const KN = {}; for (const kk in KNOWN) KN[keyOf(kk.normalize("NFD").match(/[uds]\u0304?/g))] = KNOWN[kk];
/* ---------- Lab A: quark builder ---------- */
function mountQuarks(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 300, maxH: 420, mobileAspect: 0.72 });
  let bag = ['u', 'u', 'd'], t = 0;
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h, narrow = W < 560, cx = narrow ? W / 2 : W * 0.32, cy = narrow ? H * 0.3 : H * 0.52, R = narrow ? Math.min(H * 0.22, W * 0.3) : Math.min(H * 0.36, W * 0.2);
    c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.fillStyle = alpha(C.violet, .08); c.fill(); c.strokeStyle = alpha(C.violet, .5); c.lineWidth = 2; c.setLineDash([6, 5]); c.stroke(); c.setLineDash([]);
    const cols = { u: C.red, d: C.blue, s: C.green };
    bag.forEach((q, i) => { const a = i / Math.max(1, bag.length) * TAU + t * 0.8, rr = bag.length > 1 ? R * 0.45 : 0, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a); const anti = q.includes('̄'); dot(c, x, y, 24, anti ? C.paper2 : cols[q[0]], cols[q[0]]); if (anti) { c.lineWidth = 3; c.strokeStyle = cols[q[0]]; c.beginPath(); c.arc(x, y, 24, 0, TAU); c.stroke(); } rich(c, q, x, y, { align: 'center', size: 18, w: 800, color: anti ? cols[q[0]] : C.paper2 }); });
    // gluon squiggles
    for (let i = 0; i < bag.length; i++) for (let j = i + 1; j < bag.length; j++) { const a1 = i / bag.length * TAU + t * 0.8, a2 = j / bag.length * TAU + t * 0.8, rr = R * 0.45; const x1 = cx + rr * Math.cos(a1), y1 = cy + rr * Math.sin(a1), x2 = cx + rr * Math.cos(a2), y2 = cy + rr * Math.sin(a2); const pts = []; for (let k = 0; k <= 30; k++) { const f = k / 30, px = lerp(x1, x2, f), py = lerp(y1, y2, f), nx = -(y2 - y1) / hyp(x2 - x1, y2 - y1), ny = (x2 - x1) / hyp(x2 - x1, y2 - y1), o = Math.sin(f * 30 + t * 8) * 4 * Math.sin(f * Math.PI); pts.push([px + nx * o, py + ny * o]); } line(c, pts, { color: alpha(C.orange, .6), width: 1.2 }); }
    const tot = bag.reduce((a, q) => { const p = qprops(q); return [a[0] + p[0], a[1] + p[1], a[2] + p[2]]; }, [0, 0, 0]);
    const nq = bag.filter(q => !q.includes('̄')).length, na = bag.length - nq;
    let kind = 'not an allowed hadron', name = '';
    if (bag.length === 3 && (nq === 3 || na === 3)) kind = nq === 3 ? 'baryon (qqq)' : 'antibaryon (q̄q̄q̄)';
    else if (bag.length === 2 && nq === 1 && na === 1) kind = 'meson (qq̄)';
    const k = KN[keyOf(bag)]; if (k && kind !== 'not an allowed hadron') name = k[0];
    const tx = narrow ? 18 : W * 0.62, vx = narrow ? Math.min(W * 0.45, 170) : 170; let y = narrow ? cy + R + 40 : H * 0.2;
    const row = (a, b, col) => { rich(c, a, tx, y, { size: 13, color: C.ink2 }); rich(c, b, tx + vx, y, { size: 14, w: 700, mono: true, color: col || C.ink }); y += narrow ? 26 : 30; };
    rich(c, name || (kind.startsWith('not') ? 'no such particle' : 'a hadron (unnamed here)'), tx, y - 10, { size: 18, w: 800, color: kind.startsWith('not') ? C.red : C.violet }); y += 26;
    row('type', kind, kind.startsWith('not') ? C.red : C.green); row('charge / e', fr(tot[0])); row('baryon number', fr(tot[1])); row('strangeness', fr(tot[2]));
    rich(c, 'quarks are confined: only qqq, q̄q̄q̄ and qq̄ combinations exist freely', W / 2, H - 12, { align: 'center', size: 11.5, color: C.muted });
  }, [S]);
  const g = Group(P.side, 'Add quarks');
  const bq = Btns(g); for (const q of ['u', 'd', 's']) Btn(bq, q, () => { if (bag.length < 3) bag.push(q); }, 'pri');
  const ba = Btns(g); for (const q of ['u', 'd', 's']) Btn(ba, BAR(q), () => { if (bag.length < 3) bag.push(BAR(q)); });
  const bc = Btns(g); Btn(bc, 'Remove last', () => bag.pop()); Btn(bc, 'Clear', () => bag = []);
  const bp = Btns(Group(P.side, 'Presets')); [['p', ['u', 'u', 'd']], ['n', ['u', 'd', 'd']], ['π⁺', ['u', BAR('d')]], ['K⁻', ['s', BAR('u')]], ['p̄', [BAR('u'), BAR('u'), BAR('d')]]].forEach(([n, qs]) => Btn(bp, n, () => bag = qs.slice()));
  Card(P.below, 'Quarks (5.8.2)', `<table class="tbl"><tr><th>quark</th><th>charge / e</th><th>baryon no.</th><th>strangeness</th></tr><tr><td>up u</td><td>+2/3</td><td>+1/3</td><td>0</td></tr><tr><td>down d</td><td>−1/3</td><td>+1/3</td><td>0</td></tr><tr><td>strange s</td><td>−1/3</td><td>+1/3</td><td>−1</td></tr></table><p style="margin-top:8px">Antiquarks have the opposite charge, baryon number and strangeness.</p>`);
  Card(P.below, 'Classification (5.8.1)', list(['<b>Hadrons</b> feel the strong force and are made of quarks: <b>baryons</b> (three quarks, e.g. p = uud, n = udd) and <b>mesons</b> (quark + antiquark, e.g. π⁺ = ud̄).', '<b>Leptons</b> are fundamental and do not feel the strong force: electron, muon, tau and their neutrinos.', 'Every particle has an <b>antiparticle</b> with the same mass and opposite charge (and opposite baryon/lepton number).', 'The proton is the only stable baryon; free neutrons decay (half-life ≈ 10 min).']));
  Sorter(P.below, { cats: [['b', 'Baryon'], ['m', 'Meson'], ['l', 'Lepton']], items: [
    { t: 'proton', c: 'b' }, { t: 'electron', c: 'l' }, { t: 'π⁰ pion', c: 'm' }, { t: 'neutron', c: 'b' }, { t: 'muon', c: 'l' }, { t: 'K⁺ kaon', c: 'm' }, { t: 'electron neutrino', c: 'l' }, { t: 'Λ lambda (uds)', c: 'b' }, { t: 'positron', c: 'l', why: 'antielectron: still a lepton' }, { t: 'π⁻ (dū)', c: 'm' },
  ] });
}

/* ---------- Lab B: conservation laws, annihilation & pair production ---------- */
const PT = { // Q, B, Le, Lμ, S
  'p': [1, 1, 0, 0, 0], 'p̄': [-1, -1, 0, 0, 0], 'n': [0, 1, 0, 0, 0], 'n̄': [0, -1, 0, 0, 0], 'e⁻': [-1, 0, 1, 0, 0], 'e⁺': [1, 0, -1, 0, 0], 'νₑ': [0, 0, 1, 0, 0], 'ν̄ₑ': [0, 0, -1, 0, 0],
  'μ⁻': [-1, 0, 0, 1, 0], 'μ⁺': [1, 0, 0, -1, 0], 'ν_μ': [0, 0, 0, 1, 0], 'ν̄_μ': [0, 0, 0, -1, 0], 'π⁺': [1, 0, 0, 0, 0], 'π⁻': [-1, 0, 0, 0, 0], 'π⁰': [0, 0, 0, 0, 0], 'γ': [0, 0, 0, 0, 0], 'K⁺': [1, 0, 0, 0, 1], 'K⁰': [0, 0, 0, 0, 1], 'K⁻': [-1, 0, 0, 0, -1], 'Λ': [0, 1, 0, 0, -1],
};
const REACTIONS = ['p + p → p + p + π⁰', 'p + p → p + n + π⁺', 'n → p + e⁻ + ν̄ₑ', 'n → p + e⁻', 'n → p + e⁻ + νₑ', 'p + π⁻ → n + π⁰', 'p → π⁺ + π⁰', 'e⁻ + e⁺ → γ + γ', 'π⁺ → μ⁺ + ν_μ', 'μ⁻ → e⁻ + ν̄ₑ + ν_μ', 'p + n → p + p', 'π⁻ + p → K⁰ + Λ', 'p + p → p + p + n', 'νₑ + n → p + e⁻', 'e⁻ + p → n + νₑ', 'γ → e⁻ + e⁺', 'p + p̄ → π⁺ + π⁻ + π⁰', 'π⁻ → μ⁻ + ν̄_μ', 'μ⁻ → e⁻ + νₑ + ν_μ', 'p + e⁻ → n + ν̄ₑ'];
function check(rx) {
  const [l, r] = rx.split('→').map(s => s.split('+').map(x => x.trim()).filter(Boolean));
  const sum = side => side.reduce((a, p) => { const v = PT[p]; return a.map((x, i) => x + v[i]); }, [0, 0, 0, 0, 0]);
  const L = sum(l), R = sum(r), names = ['charge', 'baryon number', 'electron lepton number', 'muon lepton number', 'strangeness'];
  const bad = names.filter((_, i) => i < 4 && L[i] !== R[i]);
  return { L, R, bad, strange: L[4] !== R[4] };
}
function mountConserve(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2.1, minH: 280, maxH: 400, mobileAspect: 1.1 });
  let mode = 'annihilate', t = 0, Ek = 0;
  const me = 0.511; // MeV
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h, cy = H / 2, tt = (t % 4) / 4;
    if (mode === 'annihilate') {
      const x1 = W * 0.1 + tt * W * 0.35 * 1.0, x2 = W * 0.9 - tt * W * 0.35;
      if (tt < 0.5) { dot(c, W * 0.1 + tt * W * 0.8, cy, 9, C.blue); rich(c, 'e⁻', W * 0.1 + tt * W * 0.8, cy - 20, { align: 'center', size: 13, w: 700, color: C.blue }); dot(c, W * 0.9 - tt * W * 0.8, cy, 9, C.red); rich(c, 'e⁺', W * 0.9 - tt * W * 0.8, cy - 20, { align: 'center', size: 13, w: 700, color: C.red }); }
      else { const f = (tt - 0.5) * 2; for (const s of [-1, 1]) { const px = W / 2 + s * f * W * 0.3, py = cy - s * f * H * 0.25; const pts = []; for (let k = -16; k <= 16; k++) pts.push([px + k * 0.9, py + k * 0.6 * -s + 5 * Math.sin(k / 2)]); line(c, pts, { color: C.orange, width: 2 }); rich(c, 'γ', px + 18, py, { size: 14, w: 700, color: C.orange }); } }
      const Eg = me + Ek / 2, lam = 6.63e-34 * 3e8 / (Eg * 1.6e-13);
      rich(c, `annihilation: each photon carries ${fix(Eg, 3)} MeV (λ = ${sci(lam, 3)} m)`, W / 2, 22, { align: 'center', size: 13, w: 700, color: C.ink2 });
      rich(c, 'two photons in opposite directions conserve momentum', W / 2, H - 14, { align: 'center', size: 11.5, color: C.muted });
    } else {
      const Eg = 2 * me + Ek, f = tt;
      const nx = W * 0.5, ny = cy; dot(c, nx, ny, 12, C.ink2); rich(c, 'nucleus', nx, ny + 24, { align: 'center', size: 11, color: C.muted });
      if (f < 0.4) { const px = W * 0.08 + f / 0.4 * (nx - W * 0.08 - 16); const pts = []; for (let k = -18; k <= 18; k++) pts.push([px + k, ny + 5 * Math.sin(k / 2)]); line(c, pts, { color: C.orange, width: 2 }); rich(c, `γ ${fix(Eg, 2)} MeV`, px, ny - 18, { align: 'center', size: 12.5, w: 700, color: C.orange }); }
      else { const g2 = (f - 0.4) / 0.6, R = 50 + Ek * 20; for (const s of [-1, 1]) { const pts = []; for (let k = 0; k <= 60 * g2; k++) { const a = k / 60 * 5; const r2 = R * Math.exp(-a * 0.25); pts.push([nx + s * r2 * Math.sin(a), ny - r2 + r2 * Math.cos(a)]); } line(c, pts, { color: s < 0 ? C.blue : C.red, width: 2 }); } rich(c, 'e⁻ and e⁺ spiral opposite ways in a magnetic field', W / 2, H - 14, { align: 'center', size: 11.5, color: C.muted }); }
      rich(c, `pair production needs at least 2 × 0.511 = 1.022 MeV; extra ${fix(Ek, 2)} MeV becomes kinetic energy`, W / 2, 22, { align: 'center', size: 13, w: 700, color: C.ink2 });
    }
  }, [S]);
  const g = Group(P.side, 'Process');
  Seg(g, { options: [['annihilate', 'Annihilation'], ['pair', 'Pair production']], value: mode, onchange: v => mode = v });
  Slider(g, { id: 'pp-k', label: 'Extra kinetic energy', min: 0, max: 3, step: 0.05, value: 0, unit: 'MeV', fmt: v => fix(v, 2), oninput: v => Ek = v });
  Note(P.side, 'In every interaction <b>charge</b>, <b>baryon number</b> and <b>lepton number</b> are conserved (as are energy and momentum). Strangeness is conserved in strong interactions but can change in weak ones.');
  Card(P.below, 'Conservation laws (5.8.4)', list(['Charge: always conserved.', 'Baryon number: +1 for baryons, −1 for antibaryons, 0 for mesons and leptons; ±⅓ per quark.', 'Lepton number: +1 for leptons, −1 for antileptons (conserved separately for electron and muon families).', 'Pair production: a photon of at least 2mₑc² (1.022 MeV) near a nucleus becomes an electron and a positron.', 'Annihilation: a particle and its antiparticle meet and their total energy (rest + kinetic) becomes two photons.']));
  const drill = () => { const rx = pick(REACTIONS), r = check(rx); const ok = r.bad.length === 0; const opts = ['Allowed', 'Violates charge', 'Violates baryon number', 'Violates lepton number']; const ans = ok ? 0 : r.bad[0] === 'charge' ? 1 : r.bad[0] === 'baryon number' ? 2 : 3; return { q: `Is this reaction possible?<br><b style="font-size:1.2em">${rx}</b>`, options: opts, correct: ans, why: `Charge ${r.L[0]} → ${r.R[0]}, baryon number ${r.L[1]} → ${r.R[1]}, lepton numbers (e, μ) (${r.L[2]}, ${r.L[3]}) → (${r.R[2]}, ${r.R[3]}).${ok && r.strange ? ' Strangeness changes, so it must be a weak interaction.' : ''}` }; };
  Drill(P.below, { title: 'Conservation drill', cls: 'wide', gens: [drill, drill, drill,
    () => ({ q: 'Find the minimum photon energy for pair production of an electron and a positron, in MeV.', a: 1.022, unit: 'MeV', steps: ['E = 2mₑc² = 2 × 0.511 MeV = 1.022 MeV'] }),
    () => { const k = +rand(0, 2).toFixed(2); return { q: `An electron and positron, each with <b>${k} MeV</b> of kinetic energy, annihilate. Find the energy of each of the two photons.`, a: 0.511 + k, unit: 'MeV', steps: ['Each photon gets half the total energy', `= mₑc² + Eₖ = 0.511 + ${k} = ${fix(0.511 + k, 3)} MeV`] }; },
  ] });
}

/* ---------- Lab C: forces & exchange particles ---------- */
function mountForces(P, L) {
  const S = L.stage(P.stageBox, { aspect: 2, minH: 300, maxH: 420, mobileAspect: 1.1 });
  let diag = 'beta', t = 0;
  const wavy = (c, x1, y1, x2, y2, col, amp = 5, n = 10) => { const pts = []; for (let k = 0; k <= 80; k++) { const f = k / 80, px = lerp(x1, x2, f), py = lerp(y1, y2, f), L2 = hyp(x2 - x1, y2 - y1), nx = -(y2 - y1) / L2, ny = (x2 - x1) / L2, o = amp * Math.sin(f * n * TAU); pts.push([px + nx * o, py + ny * o]); } line(c, pts, { color: col, width: 2 }); };
  L.loop(dt => {
    t += dt; const c = S.begin(), C = Theme.c, W = S.w, H = S.h, cx = W * 0.4, top = 30, bot = H - 30, v1y = H * 0.62, v2y = H * 0.36;
    const lab = (s, x, y, col) => rich(c, s, x, y, { align: 'center', size: 15, w: 700, color: col || C.ink });
    const fermion = (x1, y1, x2, y2, col) => { line(c, [[x1, y1], [x2, y2]], { color: col, width: 2.2 }); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2; arrow(c, mx - (x2 - x1) * 0.05, my - (y2 - y1) * 0.05, mx + (x2 - x1) * 0.05, my + (y2 - y1) * 0.05, { color: col, width: 2.2, head: 9 }); };
    rich(c, 'time →  (up the page)', 12, H - 10, { size: 10.5, color: C.muted });
    if (diag === 'beta') {
      fermion(cx - 60, bot, cx - 60, v1y, C.blue); lab('d', cx - 60, bot + 14, C.blue); fermion(cx - 60, v1y, cx - 60, top, C.red); lab('u', cx - 60, top - 14, C.red);
      wavy(c, cx - 60, v1y, cx + 60, v2y, C.violet); lab('W⁻', cx, (v1y + v2y) / 2 + 22, C.violet);
      fermion(cx + 60, v2y, cx + 140, top, C.cyan); lab('e⁻', cx + 150, top - 10, C.cyan); fermion(cx + 140, top + 10, cx + 60, v2y, C.green); lab('ν̄ₑ', cx + 150, top + 26, C.green);
      rich(c, 'β⁻ decay: a down quark becomes an up quark by emitting a W⁻ (weak interaction)', W * 0.5, 18, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    } else if (diag === 'betap') {
      fermion(cx - 60, bot, cx - 60, v1y, C.red); lab('u', cx - 60, bot + 14, C.red); fermion(cx - 60, v1y, cx - 60, top, C.blue); lab('d', cx - 60, top - 14, C.blue);
      wavy(c, cx - 60, v1y, cx + 60, v2y, C.violet); lab('W⁺', cx, (v1y + v2y) / 2 + 22, C.violet);
      fermion(cx + 140, top, cx + 60, v2y, C.cyan); lab('e⁺', cx + 150, top - 10, C.cyan); fermion(cx + 60, v2y, cx + 140, top + 10, C.green); lab('νₑ', cx + 150, top + 26, C.green);
      rich(c, 'β⁺ decay: an up quark becomes a down quark by emitting a W⁺', W * 0.5, 18, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    } else {
      fermion(cx - 80, bot, cx - 40, H / 2, C.cyan); fermion(cx - 40, H / 2, cx - 80, top, C.cyan); fermion(cx + 80, bot, cx + 40, H / 2, C.cyan); fermion(cx + 40, H / 2, cx + 80, top, C.cyan);
      wavy(c, cx - 40, H / 2, cx + 40, H / 2, C.orange, 5, 6); lab('γ', cx, H / 2 - 18, C.orange); lab('e⁻', cx - 90, bot + 12, C.cyan); lab('e⁻', cx + 90, bot + 12, C.cyan);
      rich(c, 'electromagnetic repulsion: two electrons exchange a virtual photon', W * 0.5, 18, { align: 'center', size: 12.5, w: 700, color: C.ink2 });
    }
    // table
    const tx = W * 0.7; let y = H * 0.2; const rows = [['Force', 'Exchange particle', 'Acts on'], ['strong', 'gluon (pion between nucleons)', 'hadrons'], ['electromagnetic', 'photon γ', 'charged particles'], ['weak', 'W⁺, W⁻, Z⁰', 'all particles'], ['gravity', 'graviton (hypothetical)', 'mass']];
    rows.forEach((r, i) => { rich(c, r[0], tx, y, { size: 11.5, w: i ? 600 : 800, color: C.ink }); rich(c, r[1], tx, y + 14, { size: 11, color: C.violet }); rich(c, r[2], tx, y + 28, { size: 10.5, color: C.muted }); y += 50; });
  }, [S]);
  const g = Group(P.side, 'Feynman diagram');
  Seg(g, { options: [['beta', 'β⁻ decay'], ['betap', 'β⁺ decay'], ['em', 'e⁻ e⁻ repulsion']], value: diag, wrap: true, onchange: v => diag = v });
  Note(P.side, 'Forces between particles are carried by exchange particles. The W bosons of the weak force can change the flavour of a quark — that is how a neutron turns into a proton in β⁻ decay.');
  Card(P.below, 'Four fundamental forces (5.8.5)', list(['<b>Strong:</b> holds quarks together in hadrons and nucleons in nuclei; very short range (~10⁻¹⁵ m); exchange particle the gluon (the pion between nucleons).', '<b>Electromagnetic:</b> between charged particles; infinite range; exchange particle the virtual photon.', '<b>Weak:</b> responsible for β decay; very short range; exchange particles W⁺, W⁻ and Z⁰.', '<b>Gravitational:</b> between masses; infinite range; weakest by far; the graviton has not been observed.', 'β⁻ decay: n → p + e⁻ + ν̄ₑ, i.e. d → u + e⁻ + ν̄ₑ. β⁺ decay: p → n + e⁺ + νₑ, i.e. u → d + e⁺ + νₑ.']));
  Sorter(P.below, { cats: [['s', 'Strong'], ['e', 'Electromagnetic'], ['w', 'Weak'], ['g', 'Gravity']], items: [
    { t: 'Holds a nucleus together', c: 's' }, { t: 'Causes β⁻ decay', c: 'w' }, { t: 'Exchange particle: virtual photon', c: 'e' }, { t: 'Exchange particle: W⁻', c: 'w' }, { t: 'Keeps the Moon in orbit', c: 'g' }, { t: 'Exchange particle: gluon', c: 's' }, { t: 'Makes electrons repel', c: 'e' }, { t: 'The only force felt by neutrinos (apart from gravity)', c: 'w' },
  ] });
}

topic({
  id: 'particles', code: '5.8', unit: 'A2 2', title: 'Fundamental Particles', short: 'Particles',
  blurb: 'Build hadrons from quarks, check reactions against conservation laws, annihilate matter, and draw the Feynman diagram for β decay.',
  outcomes: [
    ['5.8.1', 'classify particles as hadrons (baryons and mesons) or leptons, and demonstrate an understanding of antiparticles', 'quarks'],
    ['5.8.2', 'recall the properties of the up, down and strange quarks and their antiquarks, and the quark composition of hadrons', 'quarks'],
    ['5.8.3', 'demonstrate an understanding of pair production and annihilation', 'conserve'],
    ['5.8.4', 'apply conservation of charge, baryon number and lepton number to particle interactions', 'conserve'],
    ['5.8.5', 'recall the four fundamental forces and their exchange particles, and describe β decay in terms of quarks', 'forces'],
  ],
  labs: [
    { id: 'quarks', title: 'Quark builder', hint: 'qqq and qq̄', spec: ['5.8.1', '5.8.2'], mount: mountQuarks },
    { id: 'conserve', title: 'Conservation & annihilation', hint: 'is it allowed?', spec: ['5.8.3', '5.8.4'], mount: mountConserve },
    { id: 'forces', title: 'Forces & exchange particles', hint: 'Feynman diagrams', spec: ['5.8.5'], mount: mountForces },
  ],
  equations: [['E_{min} = 2m_ec^2 = 1.022\\,\\text{MeV}', 'pair production'], ['n \\to p + e^- + \\bar{\\nu}_e', 'β⁻'], ['d \\to u + e^- + \\bar{\\nu}_e', 'β⁻ at quark level']],
  traps: ['Mesons are quark + <b>antiquark</b>, not two quarks.', 'Leptons have baryon number 0; mesons have baryon number 0.', 'The antineutrino goes with the electron in β⁻ decay; the neutrino with the positron in β⁺.', 'Annihilation produces <b>two</b> photons to conserve momentum.', 'Strangeness may change in weak interactions.'],
  notes: [
    ['Classification', 'Hadrons (made of quarks, feel the strong force): baryons (qqq, baryon number 1) and mesons (qq̄, baryon number 0). Leptons (fundamental, no strong force): e, μ, τ and their neutrinos.'],
    ['Quarks', 'u: +⅔e, d: −⅓e, s: −⅓e (strangeness −1), each baryon number ⅓. Proton uud, neutron udd, π⁺ ud̄, π⁻ dū, K⁺ us̄.'],
    ['Antiparticles', 'Same mass, opposite charge, baryon number and lepton number. Positron e⁺, antiproton p̄ (ūūd̄).'],
    ['Pair production and annihilation', 'A photon of energy ≥ 2mc² can create a particle–antiparticle pair (near a nucleus, to conserve momentum). A particle and antiparticle can annihilate into two photons, each of energy mc² + Eₖ.'],
    ['Conservation laws', 'Charge, baryon number and lepton number are conserved in all interactions (with energy and momentum). Strangeness is conserved in strong and EM interactions only.'],
    ['Forces', 'Strong (gluon), electromagnetic (photon), weak (W±, Z⁰), gravity (graviton). β⁻ decay: d → u + W⁻, W⁻ → e⁻ + ν̄ₑ.'],
  ],
  mini(c, w, h2, t, C) {
    const cx = w / 2, cy = h2 / 2, cols = [C.red, C.red, C.blue];
    ['u', 'u', 'd'].forEach((q, i) => { const a = i / 3 * TAU + t, x = cx + 22 * Math.cos(a), y = cy + 22 * Math.sin(a); dot(c, x, y, 12, cols[i]); rich(c, q, x, y, { align: 'center', size: 12, w: 800, color: C.paper2 }); });
  },
});
})();

/* ================= revision notes for the original sections (new sections carry their own `notes`) ================= */
(() => {
const NOTES = {
  quantities: [
    ['Physical quantities', 'Every physical quantity is a numerical magnitude multiplied by a unit, e.g. 9.81 N kg⁻¹. A number without its unit is meaningless in physics.'],
    ['SI base units', '<table><tr><th>quantity</th><th>unit</th></tr><tr><td>mass</td><td>kilogram (kg)</td></tr><tr><td>length</td><td>metre (m)</td></tr><tr><td>time</td><td>second (s)</td></tr><tr><td>current</td><td>ampere (A)</td></tr><tr><td>temperature</td><td>kelvin (K)</td></tr><tr><td>amount of substance</td><td>mole (mol)</td></tr></table>'],
    ['Derived units', 'All other units are combinations of base units: N = kg m s⁻², J = kg m² s⁻², W = kg m² s⁻³, Pa = kg m⁻¹ s⁻², C = A s, V = kg m² s⁻³ A⁻¹, Ω = kg m² s⁻³ A⁻². Use them to check an equation is homogeneous (both sides have the same base units).'],
    ['Prefixes', 'T 10¹², G 10⁹, M 10⁶, k 10³, c 10⁻², m 10⁻³, µ 10⁻⁶, n 10⁻⁹, p 10⁻¹², f 10⁻¹⁵. Squared and cubed units square and cube the prefix: 1 cm² = 10⁻⁴ m², 1 mm³ = 10⁻⁹ m³.'],
    ['Standard form', 'Write numbers as a × 10ⁿ with 1 ≤ a < 10. Give answers to a sensible number of significant figures (normally the same as the data, usually 3).'],
  ],
  vectors: [
    ['Scalars and vectors', 'A scalar has magnitude only (mass, time, speed, distance, energy, temperature). A vector has magnitude and direction (displacement, velocity, acceleration, force, momentum, weight).'],
    ['Resolving', 'A vector F at angle θ to the horizontal has components F cos θ (horizontal, adjacent to θ) and F sin θ (vertical, opposite θ).'],
    ['Adding vectors', 'For two perpendicular vectors: resultant R = √(A² + B²), direction tan⁻¹(B/A). For non-perpendicular vectors use a scale drawing (tip-to-tail triangle or parallelogram) — label the scale and measure the angle.'],
    ['Equilibrium', 'A point object is in equilibrium when the resultant force is zero: the force vectors form a closed triangle (three forces) or polygon. Resolve in two perpendicular directions and set each sum to zero.'],
  ],
  waves: [
    ['Transverse and longitudinal', 'Transverse: oscillations perpendicular to the direction of energy transfer (EM waves, waves on strings, water ripples). Longitudinal: oscillations parallel to the direction of energy transfer, with compressions and rarefactions (sound, P-waves).'],
    ['Wave terms', 'Amplitude: maximum displacement from equilibrium. Wavelength λ: distance between adjacent points in phase. Period T: time for one oscillation. Frequency f: oscillations per second. Phase difference: fraction of a cycle between two points, in degrees or radians.'],
    ['Equations', 'f = 1/T and v = fλ. From a displacement–distance graph read λ and A; from a displacement–time graph read T and A.'],
    ['Polarisation', 'Restricting the oscillations of a transverse wave to one plane. Only transverse waves can be polarised — it is evidence that light is transverse. Uses: Polaroid sunglasses (reduce glare), stress analysis, TV aerial alignment.'],
    ['The EM spectrum', '<table><tr><th>region</th><th>typical λ</th></tr><tr><td>radio</td><td>&gt; 0.1 m (to km)</td></tr><tr><td>microwave</td><td>1 mm – 0.1 m</td></tr><tr><td>infrared</td><td>700 nm – 1 mm</td></tr><tr><td>visible</td><td>400 nm (violet) – 700 nm (red)</td></tr><tr><td>ultraviolet</td><td>10 nm – 400 nm</td></tr><tr><td>X-rays</td><td>10⁻¹² – 10⁻⁸ m</td></tr><tr><td>gamma</td><td>&lt; 10⁻¹¹ m</td></tr></table><p>All travel at 3.00 × 10⁸ m s⁻¹ in a vacuum.</p>'],
  ],
  solids: [
    ['Hooke’s law', 'The extension of a spring is directly proportional to the applied force, provided the limit of proportionality is not exceeded: F = kx, k = spring constant (N m⁻¹).'],
    ['Elastic and plastic', 'Elastic deformation: the material returns to its original shape when the load is removed. Plastic deformation: permanent extension. The elastic limit is the maximum load beyond which deformation is plastic. The limit of proportionality is where Hooke’s law stops applying — it comes at or before the elastic limit.'],
    ['Stress, strain, Young modulus', 'Stress σ = F/A (Pa). Strain ε = x/l (no unit). Young modulus E = stress/strain (Pa), constant in the Hooke’s-law region; the gradient of the linear part of a stress–strain graph.'],
    ['Measuring E', 'Long thin wire (Searle’s apparatus or wire over a pulley with a vernier/marker). Measure original length with a metre rule, diameter with a micrometer at several points, extension for increasing loads. Plot stress against strain; E = gradient. A long thin wire gives a large, measurable extension.'],
    ['Strain energy', 'The energy stored in a stretched material: E = ½Fx = ½kx² (area under the force–extension graph).'],
    ['Materials in design', 'Engineers choose materials with suitable Young modulus, breaking stress and cost: steel for strength and stiffness, alloys and composites for strength-to-weight, cost versus safety margin.'],
  ],
  thermal: [
    ['The gas laws', 'Boyle: pV = constant (fixed mass, constant T). Pressure law: p/T = constant (constant V). Charles: V/T = constant (constant p). Combined: pV/T = constant. T must be in kelvin.'],
    ['Ideal gas equation', 'pV = nRT (n moles, R = 8.31 J mol⁻¹ K⁻¹) or pV = NkT (N molecules, k = 1.38 × 10⁻²³ J K⁻¹). N = nN_A, N_A = 6.02 × 10²³ mol⁻¹.'],
    ['Kinetic theory', 'pV = ⅓Nm⟨c²⟩ where ⟨c²⟩ is the mean square speed. Combined with pV = NkT: average molecular kinetic energy ½m⟨c²⟩ = (3/2)kT, so T is proportional to the mean KE of the molecules.'],
    ['Internal energy', 'The sum of the randomly distributed kinetic and potential energies of all the molecules. For an ideal gas it is all kinetic (no intermolecular forces).'],
    ['Absolute zero', '0 K (−273 °C): the temperature at which the molecules have minimum kinetic energy; extrapolating p–T or V–T graphs for a gas meets the axis there.'],
    ['Specific heat capacity', 'The energy needed to raise the temperature of 1 kg by 1 K: Q = mcΔθ. Electrical method: heater of known power (VIt) in a lagged block; plot θ against t; c = VI / (m × gradient). Lag to reduce losses; start below room temperature and finish the same amount above.'],
  ],
  circular: [
    ['Angular velocity', 'ω = Δθ/Δt, in rad s⁻¹. For one revolution ω = 2π/T = 2πf.'],
    ['Linear and angular speed', 'v = rω.'],
    ['Centripetal acceleration and force', 'An object moving in a circle at constant speed is accelerating towards the centre: a = v²/r = rω². The resultant (centripetal) force F = mv²/r = mrω² points to the centre. It is provided by a real force: tension, friction, gravity, the normal reaction…'],
    ['Common situations', 'Car on a bend: friction provides the centripetal force. Mass on a string in a vertical circle: tension varies, least at the top (T + mg = mv²/r). Satellites: gravity. No outward “centrifugal” force acts.'],
  ],
  shm: [
    ['Definition', 'Simple harmonic motion: acceleration proportional to displacement from a fixed point and always directed towards that point: a = −ω²x, ω = 2πf.'],
    ['Equations', 'x = A cos ωt (released from maximum displacement), v_max = Aω, a_max = Aω². Calculator in radians.'],
    ['Pendulum and spring', 'Simple pendulum T = 2π√(l/g) (small angles); mass–spring T = 2π√(m/k). Time 20 oscillations from the centre using a fiducial marker; plot T² against l (or m).'],
    ['Graphs', 'Velocity = gradient of x–t; acceleration = gradient of v–t. v is 90° ahead of x; a is 180° out of phase with x.'],
    ['Damping and resonance', 'Free vibration at the natural frequency; forced vibration at the driver’s frequency. Resonance: driving frequency = natural frequency, maximum amplitude. Light damping (slow decay), critical damping (fastest return without oscillation — car suspension), over-damping (slow return, no oscillation).'],
  ],
  nucleus: [
    ['Alpha scattering', 'Geiger and Marsden fired alpha particles at thin gold foil. Most passed straight through (atom mostly empty space); a few were deflected through large angles and about 1 in 8000 bounced back (a tiny, dense, positively charged nucleus).'],
    ['Nuclear radius', 'r = r₀A^⅓ with r₀ ≈ 1.2 × 10⁻¹⁵ m. A graph of r against A^⅓ is a straight line through the origin.'],
    ['Nuclear density', 'Volume ∝ r³ ∝ A and mass ∝ A, so nuclear density is constant for all nuclei, about 2 × 10¹⁷ kg m⁻³ — enormously greater than ordinary matter.'],
  ],
  decay: [
    ['The radiations', 'α: helium nucleus, strongly ionising, stopped by paper or a few cm of air. β⁻: fast electron, moderately ionising, stopped by a few mm of aluminium. γ: EM radiation, weakly ionising, reduced by several cm of lead.'],
    ['Equations', 'α: ᴬ_Z X → ᴬ⁻⁴_{Z−2} Y + ⁴₂α. β⁻: ᴬ_Z X → ᴬ_{Z+1} Y + ⁰₋₁β + ν̄. γ: no change in A or Z.'],
    ['Random and exponential', 'Decay is random (can’t predict which nucleus decays next) and spontaneous (not affected by conditions). The number remaining decreases exponentially: N = N₀e^(−λt).'],
    ['Activity and decay constant', 'A = λN (magnitude of dN/dt). λ = fraction of nuclei decaying per second. A = A₀e^(−λt).'],
    ['Half-life', 'The time for half the undecayed nuclei (or the activity) to halve: t½ = ln 2/λ = 0.693/λ.'],
    ['Measuring half-life', 'Use a GM tube and counter with a short-half-life source (e.g. protactinium). Measure background count first and subtract. Record counts over fixed intervals, plot ln(corrected count rate) against t: gradient = −λ.'],
  ],
  energy: [
    ['Mass–energy equivalence', 'Mass and energy are equivalent: E = Δmc². Any energy change corresponds to a mass change (even chemical reactions, though too small to measure).'],
    ['Mass defect and binding energy', 'The mass of a nucleus is less than the total mass of its separate nucleons. The difference (mass defect) × c² is the binding energy: the energy needed to separate the nucleus into its nucleons. 1 u = 931.5 MeV.'],
    ['Binding energy per nucleon', 'Rises steeply for light nuclei, peaks near iron-56 (~8.8 MeV per nucleon, the most stable), then falls slowly for heavy nuclei.'],
    ['Fission and fusion', 'Fusion of light nuclei and fission of heavy nuclei both move towards the peak, increasing binding energy per nucleon and releasing energy.'],
  ],
  fusion: [
    ['Fission reactors', 'U-235 absorbs a slow (thermal) neutron and splits, releasing 2–3 neutrons and ~200 MeV. Chain reaction: on average one neutron per fission causes another. Critical size: minimum mass for a sustained chain reaction. Moderator (graphite/water) slows neutrons; control rods (boron/cadmium) absorb neutrons; coolant (water/CO₂) removes heat; thick concrete shielding absorbs radiation.'],
    ['Nuclear power issues', 'No CO₂ during operation and reliable baseload, but radioactive waste storage, accident risk, decommissioning cost, security and proliferation concerns, and high capital cost.'],
    ['Fusion and ITER', 'Fuel: deuterium (from sea water) and tritium (bred from lithium in the blanket). D + T → ⁴He + n + 17.6 MeV. Needs ~150 million K so nuclei overcome electrostatic repulsion: the fuel is a plasma. Heating: ohmic (current in the plasma), neutral beam injection, radio-frequency heating. The tokamak’s magnetic fields confine the plasma away from the vacuum-vessel walls; the blanket absorbs neutrons, breeds tritium and transfers heat.'],
    ['Difficulties and advantages', 'Hard to reach and hold the temperature, density and confinement time; materials damaged by neutrons. Advantages: abundant fuel, no long-lived high-level waste, no chain reaction to run away, no CO₂.'],
    ['Confinement methods', 'Gravitational (stars: huge mass), inertial (lasers compress a fuel pellet), magnetic (tokamak).'],
  ],
};
for (const t of TOPICS) if (!t.notes && NOTES[t.id]) t.notes = NOTES[t.id];
})();

/* ================= app features: settings, notes, practice, tutor, progress ================= */

/* ---------- settings ---------- */
const Settings = {
  defaults: { speed: 1, calm: false, testLen: 10, timer: true, secsPerQ: 90, tutorMode: 'offline', apiKey: '', model: 'claude-opus-5-5', hints: true },
  all() { return Object.assign({}, this.defaults, Store.get('set', {})); },
  get(k) { return this.all()[k]; },
  set(k, v) { const s = Store.get('set', {}); s[k] = v; Store.set('set', s); this.apply(); },
  apply() {
    const s = this.all();
    window.PS_SPEED = s.speed;
    document.documentElement.classList.toggle('calm', !!s.calm);
  }
};

const stripTags = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- question bank: harvest every Drill / Sorter generator ---------- */
const Bank = {
  cache: null,
  all() {
    if (this.cache) return this.cache;
    const out = [], host = el('div', { style: { position: 'fixed', left: '-12000px', top: '0', width: '1100px', visibility: 'hidden', pointerEvents: 'none' }, 'aria-hidden': 'true' });
    document.body.append(host);
    window.PS_HARVEST = out;
    const prevCur = window.PS_CUR;
    for (const t of TOPICS) for (const l of t.labs) {
      const cl = [];
      const stub = { stage(p, o) { const s = Stage(p, o); cl.push(s.destroy); return s; }, fillLast() {}, loop() {}, on() {}, cleanup(f) { cl.push(f); }, destroy() {} };
      const box = el('div'); host.append(box);
      window.PS_HARVEST_CTX = { topic: t, lab: l };
      try { l.mount(Plate(box, l, t), stub); } catch (e) { /* a lab that needs live state is skipped */ }
      cl.forEach(f => { try { f(); } catch (e) {} }); box.remove();
    }
    window.PS_HARVEST = null; window.PS_HARVEST_CTX = null; window.PS_CUR = prevCur; host.remove();
    return (this.cache = out);
  },
  forTopics(ids) { const set = new Set(ids); return this.all().filter(g => g.topic && set.has(g.topic.id)); },
  make(entry) { for (let i = 0; i < 6; i++) { try { const q = entry.gen(); if (q && q.q && (q.options || isFinite(q.a))) return Object.assign({ topic: entry.topic, lab: entry.lab }, q); } catch (e) {} } return null; }
};

/* ---------- progress helpers ---------- */
function topicScore(id) { const r = Store.get('scores', {})[id]; if (!r || !r.n) return null; const last = r.last && r.last.length ? r.last : null; const acc = last ? last.reduce((a, b) => a + b, 0) / last.length : r.ok / r.n; return { n: r.n, acc, ok: r.ok }; }
function weakList() {
  return TOPICS.map(t => [t, topicScore(t.id)]).filter(([, s]) => s && s.n >= 3 && s.acc < 0.75).sort((a, b) => a[1].acc - b[1].acc);
}
function WeakAreas() {
  const sc = Store.get('scores', {}); const tried = TOPICS.filter(t => sc[t.id]); if (!tried.length) return null;
  const weak = weakList().slice(0, 4);
  const ticks = Store.get('ticks', {}); const nOut = TOPICS.reduce((a, t) => a + t.outcomes.length, 0), done = Object.values(ticks).filter(Boolean).length;
  const answered = tried.reduce((a, t) => a + sc[t.id].n, 0), right = tried.reduce((a, t) => a + sc[t.id].ok, 0);
  const box = el('section', { class: 'progress-card' },
    el('div', { class: 'pc-stats' },
      el('div', {}, el('b', {}, String(answered)), el('span', {}, 'questions answered')),
      el('div', {}, el('b', {}, Math.round(right / Math.max(1, answered) * 100) + '%'), el('span', {}, 'overall accuracy')),
      el('div', {}, el('b', {}, `${done}/${nOut}`), el('span', {}, 'spec outcomes ticked')),
      el('div', {}, el('b', {}, `${tried.length}/${TOPICS.length}`), el('span', {}, 'sections practised'))));
  if (weak.length) {
    box.append(el('div', { class: 'pc-weak' }, el('h3', {}, 'Weak areas — work on these next'),
      el('div', { class: 'pc-list' }, weak.map(([t, s]) => el('a', { href: `#/physics/${t.id}/notes`, class: 'pc-item' }, el('span', { class: 'code' }, t.code), el('span', {}, t.title), el('span', { class: 'bar' }, el('i', { style: { width: Math.round(s.acc * 100) + '%' } })), el('span', { class: 'mono' }, Math.round(s.acc * 100) + '%')))),
      el('a', { class: 'btn pri', href: '#/physics/practice/weak' }, 'Mock test on my weak areas →')));
  } else box.append(el('p', { class: 'muted', style: { marginTop: '10px' } }, 'No weak areas yet: keep drilling. A section shows up here once your recent accuracy drops below 75%.'));
  return box;
}
function miniFallback(t) {
  return (c, w, h, time, C) => {
    c.font = FONT.disp(56); c.fillStyle = alpha(C.blue, 0.12); c.textAlign = 'right'; c.textBaseline = 'bottom'; c.fillText(t.code, w - 10, h - 4);
    const pts = []; for (let x = 0; x <= w; x += 4) pts.push([x, h * 0.5 + Math.sin(x / 26 + time) * h * 0.18 * Math.sin(time * 0.5 + x / 90)]);
    line(c, pts, { color: C.violet, width: 2 });
  };
}

/* ---------- revision notes page ---------- */
const NOTES_LAB = { id: 'notes', title: 'Revision notes' };
function NotesPage(box, t) {
  const ticks = Store.get('ticks', {});
  const page = el('article', { class: 'notes-page' });
  const s = topicScore(t.id);
  page.append(el('div', { class: 'np-head' },
    el('div', {}, el('div', { class: 'eyebrow' }, `Revision notes · ${t.code}`), el('h2', {}, t.title), el('p', {}, t.blurb)),
    el('div', { class: 'btns' },
      el('a', { class: 'btn pri', href: `#/physics/practice/${t.id}` }, '✎ Test yourself'),
      el('a', { class: 'btn', href: '#/physics/tutor', onclick: () => Tutor.seed = `quiz me on ${t.title}` }, '? Quiz me in chat'),
      window.PS_ARTIFACT ? null : el('button', { class: 'btn', type: 'button', onclick: () => window.print() }, '⎙ Print / PDF')),
    s ? el('div', { class: 'np-score mono' }, `Your recent accuracy here: ${Math.round(s.acc * 100)}% over ${s.n} questions`) : null));
  const grid = el('div', { class: 'np-grid' }); page.append(grid);
  const main = el('div', { class: 'np-main' }), aside = el('div', { class: 'np-aside' }); grid.append(main, aside);
  if (t.notes && t.notes.length) for (const [h, body] of t.notes) main.append(el('section', { class: 'nsec' }, el('h3', { html: h }), el('div', { html: /^\s*</.test(body) ? body : `<p>${body}</p>` })));
  else main.append(el('section', { class: 'nsec' }, el('p', { class: 'muted' }, 'Notes for this section are in the lab cards under each simulation.')));
  if (t.traps) main.append(el('section', { class: 'nsec traps' }, el('h3', {}, 'Exam traps'), el('div', { html: list(t.traps) })));
  if (t.equations) EqCard(aside, 'Equations to know', t.equations);
  const labs = Card(aside, 'Labs in this section', null);
  labs.append(el('div', { class: 'np-labs' }, t.labs.map(l => el('a', { href: `#/physics/${t.id}/${l.id}` }, el('span', { class: 'f' }, l.letter), el('span', {}, el('b', {}, l.title), l.hint ? el('small', {}, l.hint) : null)))));
  const spec = Card(aside, 'Spec checklist', null);
  for (const [code, text] of t.outcomes) {
    const cb = el('input', { type: 'checkbox', class: 'tick', id: 'nt-' + code.replace(/\./g, '-'), 'aria-label': 'mark ' + code + ' done' }); cb.checked = !!ticks[code];
    cb.addEventListener('change', () => { const tk = Store.get('ticks', {}); tk[code] = cb.checked; Store.set('ticks', tk); });
    spec.append(el('label', { class: 'np-out', for: cb.id }, cb, el('span', { class: 'mono' }, code), el('span', {}, text)));
  }
  box.append(page);
}

/* ---------- question difficulty (1 foundation · 2 standard · 3 challenging) ---------- */
// raw effort score from the question itself (calculation vs recall, length of the worked solution,
// standard-form answers, wordiness), then graded against the rest of the same unit: roughly the easiest 40%
// of a unit is Foundation, the next 35% Standard and the hardest 25% Challenging
function qRaw(q) {
  if (q.options) return 0.4 * Math.min(3, (stripTags(q.why || '').length / 80));   // recall / concept questions
  const txt = stripTags(q.q), work = stripTags((q.steps || []).join(' '));
  const givens = (q.q.match(/<b>[^<]*\d[^<]*<\/b>/g) || []).length;
  const conv = (txt.match(/\b(mm|cm|µ[A-Za-zΩ]*|n[mC]|mA|kJ|kV|kW|MW|MeV|keV|eV|minutes?|hours?|g\b|km|mT|µF|nF|kΩ|mWb)\b/g) || []).length;
  const maths = (work.match(/√|sin|cos|tan|ln|e\^|\^|²|³|⁻|log/g) || []).length;
  const rearr = /⇒|rearrang/.test(work) ? 1 : 0;
  const sf = isFinite(q.a) && q.a !== 0 && (Math.abs(q.a) < 1e-3 || Math.abs(q.a) >= 1e5) ? 1 : 0;
  return 1 + 0.45 * Math.min(givens, 5) + 0.35 * Math.min(conv, 3) + 0.3 * Math.min(maths, 5) + 0.6 * rearr + 0.5 * sf + 0.3 * Math.max(0, (q.steps || []).length - 2);
}
let DIFF_CUTS = null;
function diffCuts() {
  if (DIFF_CUTS) return DIFF_CUTS;
  const by = {}; for (const e of Bank.all()) for (let k = 0; k < 4; k++) { const q = Bank.make(e); if (q) (by[e.topic.unit] = by[e.topic.unit] || []).push(qRaw(q)); }
  DIFF_CUTS = {}; for (const u in by) { const a = by[u].sort((x, y) => x - y), at = f => a[Math.min(a.length - 1, Math.floor(f * a.length))]; DIFF_CUTS[u] = [at(0.4), at(0.75)]; }
  return DIFF_CUTS;
}
function qDiff(q) {
  if (q._d) return q._d;
  const [c1, c2] = (q.topic && diffCuts()[q.topic.unit]) || [1.5, 3], r = qRaw(q);
  return (q._d = r <= c1 ? 1 : r <= c2 ? 2 : 3);
}
const DIFF_NAMES = ['', 'Foundation', 'Standard', 'Challenging'];
function DiffMeter(level, label) {
  const f = clamp((level - 1) / 2, 0, 1), col = level < 1.67 ? 'var(--ps-green)' : level < 2.34 ? 'var(--ps-orange)' : 'var(--ps-red)';
  return el('div', { class: 'dmeter', role: 'meter', 'aria-valuemin': 1, 'aria-valuemax': 3, 'aria-valuenow': fix(level, 2), 'aria-label': 'difficulty' },
    el('span', { class: 'dm-l' }, label || 'Difficulty'),
    el('span', { class: 'dm-bar' }, el('i', { style: { width: (8 + f * 92) + '%', background: col } }), el('b', { style: { left: '33.3%' } }), el('b', { style: { left: '66.6%' } })),
    el('span', { class: 'dm-v mono', style: { color: col } }, level === Math.round(level) ? DIFF_NAMES[level] : `${fix(level, 1)} / 3`));
}
const diffDots = d => el('span', { class: 'ddots', title: DIFF_NAMES[d] }, [1, 2, 3].map(i => el('i', { class: i <= d ? 'on d' + d : '' })), el('span', {}, DIFF_NAMES[d]));

/* ---------- practice & mock tests ---------- */
function PracticePage(w, ctx, args) {
  const preset = args[0];
  const sel = new Set(preset === 'weak' ? weakList().map(([t]) => t.id) : unitById(preset) ? topicsIn(unitById(preset)).map(t => t.id) : TOPICS.some(t => t.id === preset) ? [preset] : Store.get('practiceSel', TOPICS.slice(0, 3).map(t => t.id)));
  if (!sel.size) TOPICS.slice(0, 3).forEach(t => sel.add(t.id));
  let len = Settings.get('testLen'), timer = Settings.get('timer'), diff = Settings.get('testDiff') || 'mixed';
  w.append(el('header', { class: 'thead' }, el('div', {}, el('div', { class: 'eyebrow' }, 'Practice'), el('h1', {}, 'Mock tests & drills'), el('p', {}, 'Mixed, randomised questions drawn from every drill in the app. Pick sections, set a length, and go. Every answer feeds your weak-area tracker.'))));
  const body = el('div', { class: 'practice' }); w.append(body);
  function setup() {
    body.innerHTML = '';
    const pick_ = el('div', { class: 'pr-pick' });
    const cnt = el('span', { class: 'mono muted' });
    const upd = () => { cnt.textContent = `${sel.size} section${sel.size === 1 ? '' : 's'} selected`; Store.set('practiceSel', [...sel]); };
    for (const [label, test, long] of [['AS 1', t => t.unit === 'AS 1', 'AS 1'], ['AS 2', t => t.unit === 'AS 2', 'AS 2'], ['A2 1', t => t.unit === 'A2 1', 'A2 1'], ['A2 2', t => t.unit === 'A2 2', 'A2 2']]) {
      const ts = TOPICS.filter(test); if (!ts.length) continue;
      const boxes = [];
      const grp = el('div', { class: 'pr-grp' }, el('div', { class: 'pr-gh' }, el('b', {}, long), el('button', { type: 'button', class: 'btn sm', onclick: () => { const all = ts.every(t => sel.has(t.id)); ts.forEach(t => all ? sel.delete(t.id) : sel.add(t.id)); boxes.forEach(([t, cb]) => cb.checked = sel.has(t.id)); upd(); } }, 'all / none')));
      for (const t of ts) {
        const cb = el('input', { type: 'checkbox', id: 'pr-' + t.id }); cb.checked = sel.has(t.id); boxes.push([t, cb]);
        cb.addEventListener('change', () => { cb.checked ? sel.add(t.id) : sel.delete(t.id); upd(); });
        const s = topicScore(t.id);
        grp.append(el('label', { class: 'pr-t', for: cb.id }, cb, el('span', { class: 'mono' }, t.code), el('span', {}, t.title), s ? el('span', { class: 'mono muted', title: 'recent accuracy' }, Math.round(s.acc * 100) + '%') : null));
      }
      pick_.append(grp);
    }
    const opts = el('div', { class: 'pr-opts card' });
    Seg(opts, { label: 'Questions', options: [[5, '5'], [10, '10'], [20, '20'], [40, '40']], value: len, onchange: v => { len = +v; Settings.set('testLen', len); } });
    const dm = el('div');
    const showDm = () => { dm.innerHTML = ''; dm.append(DiffMeter(diff === 'mixed' ? 2 : +diff, 'Target difficulty')); };
    Seg(opts, { label: 'Difficulty', options: [['mixed', 'Mixed'], ['1', 'Foundation'], ['2', 'Standard'], ['3', 'Challenging']], value: diff, wrap: true, onchange: v => { diff = v; Settings.set('testDiff', v); showDm(); } });
    showDm(); opts.append(dm);
    Switch(opts, { id: 'pr-timer', label: `Timed (${Math.round(Settings.get('secsPerQ') / 60 * 10) / 10} min per question)`, value: timer, onchange: v => { timer = v; Settings.set('timer', v); } });
    const go = el('div', { class: 'btns' },
      el('button', { class: 'btn pri', type: 'button', onclick: () => start('test') }, '▶ Start mock test'),
      el('button', { class: 'btn', type: 'button', onclick: () => start('endless') }, '∞ Endless drill'),
      el('button', { class: 'btn', type: 'button', onclick: () => { sel.clear(); weakList().forEach(([t]) => sel.add(t.id)); if (!sel.size) TOPICS.forEach(t => sel.add(t.id)); setup(); } }, 'Select my weak areas'),
      el('button', { class: 'btn', type: 'button', onclick: () => { TOPICS.forEach(t => sel.add(t.id)); setup(); } }, 'Whole course'));
    opts.append(cnt, go);
    const hist = Store.get('tests', []);
    if (hist.length) opts.append(el('div', { class: 'pr-hist' }, el('h3', {}, 'Recent tests'), el('div', { html: hist.slice(-6).reverse().map(h => `<div><span class="mono">${new Date(h.at).toLocaleDateString()}</span> <b>${h.score}/${h.n}</b>${h.d ? ` <span class="mono">${DIFF_NAMES[Math.round(h.d)]}</span>` : ''} <span class="muted">${escH(h.label)}</span></div>`).join('') })));
    body.append(el('div', { class: 'pr-setup' }, pick_, opts)); upd();
  }
  function start(mode) {
    if (!sel.size) { inlineMsg(body.querySelector('.pr-opts') || body, 'Pick at least one section first.'); return; }
    body.innerHTML = ''; body.append(el('div', { class: 'key' }, 'Building the question bank…'));
    setTimeout(() => {
      const pool = Bank.forTopics([...sel]);
      body.innerHTML = '';
      if (!pool.length) { body.append(el('div', { class: 'flag' }, 'No questions found for those sections.')); return; }
      if (mode === 'endless') {
        body.append(el('div', { class: 'btns', style: { marginBottom: '12px' } }, el('button', { class: 'btn', type: 'button', onclick: setup }, '← Change sections')));
        window.PS_CUR = null;
        const d = Drill(body, { title: `Endless drill · ${sel.size} section${sel.size > 1 ? 's' : ''}`, cls: 'wide', gens: pool.map(e => () => { const q = Bank.make(e); window.PS_CUR = e.topic.id; return q || { q: 'Skipped a question that failed to generate.', options: ['Next'], correct: 0 }; }) });
        return d;
      }
      // mock test: spread questions across the chosen topics
      const byT = {}; for (const e of pool) (byT[e.topic.id] = byT[e.topic.id] || []).push(e);
      const ids = shuffle(Object.keys(byT)); const qs = [];
      const want = diff === 'mixed' ? 0 : +diff, spare = [];
      for (let k = 0; qs.length < len && k < len * 40; k++) { const id = ids[k % ids.length]; const q = Bank.make(pick(byT[id])); if (!q) continue; if (!want || qDiff(q) === want) qs.push(q); else spare.push(q); }
      // not enough at the chosen level in these sections: top up with the closest level
      spare.sort((a, b) => Math.abs(qDiff(a) - want) - Math.abs(qDiff(b) - want));
      while (qs.length < len && spare.length) qs.push(spare.shift());
      runTest(qs);
    }, 30);
  }
  function runTest(qs) {
    let k = 0, t0 = performance.now(); const ans = [];
    const limit = timer ? qs.length * Settings.get('secsPerQ') : 0;
    const head = el('div', { class: 'pt-head' }); const qbox = el('div', { class: 'pt-q card' });
    body.append(head, qbox);
    const tick = () => { const el2 = (performance.now() - t0) / 1000; const left = limit - el2; head.querySelector('.clock') && (head.querySelector('.clock').textContent = limit ? `${Math.floor(Math.max(0, left) / 60)}:${String(Math.floor(Math.max(0, left) % 60)).padStart(2, '0')} left` : `${Math.floor(el2 / 60)}:${String(Math.floor(el2 % 60)).padStart(2, '0')}`); if (limit && left <= 0 && k < qs.length) { while (ans.length < qs.length) ans.push({ v: null, ok: false, timeout: true }); finish(); } };
    const iv = setInterval(tick, 500); ctx.cleanup(() => clearInterval(iv));
    function show() {
      const q = qs[k];
      head.innerHTML = ''; head.append(el('span', { class: 'mono' }, `Question ${k + 1} / ${qs.length}`), el('span', { class: 'prog' }, el('i', { style: { width: (k / qs.length * 100) + '%' } })), el('span', { class: 'clock mono' }), confirmBtn(null, 'End test', 'Tap again to end (unanswered = 0)', () => { while (ans.length < qs.length) ans.push({ v: null, ok: false }); finish(); }, 'sm'));
      tick();
      qbox.innerHTML = '';
      qbox.append(el('div', { class: 'pt-qh' }, el('div', { class: 'eyebrow' }, `${q.topic.code} ${q.topic.title}`), diffDots(qDiff(q))), el('div', { class: 'drill-q', html: q.q }));
      const submit = v => { const ok = q.options ? v === q.correct : (isFinite(v) && Math.abs(v - q.a) <= Math.abs(q.a) * (q.tol ?? 0.02) + (q.abs || 0)); ans.push({ v, ok }); recordScore(q.topic.id, ok); k++; if (k >= qs.length) finish(); else show(); };
      if (q.options) {
        const o = el('div', { class: 'opts' }); shuffle(q.options.map((t2, i) => [t2, i])).forEach(([t2, i]) => o.append(el('button', { type: 'button', html: t2, onclick: () => submit(i) }))); qbox.append(o);
      } else {
        const inp = el('input', { class: 'num', type: 'text', inputmode: 'decimal', autocomplete: 'off', placeholder: 'your answer, e.g. 3.2e-4', 'aria-label': 'answer' });
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') submit(parseNum(inp.value)); });
        qbox.append(el('div', { class: 'drill-in' }, inp, q.unit ? el('span', { class: 'unit', html: q.unit }) : null), el('div', { class: 'btns' }, el('button', { class: 'btn pri', type: 'button', onclick: () => submit(parseNum(inp.value)) }, 'Submit →'), el('button', { class: 'btn', type: 'button', onclick: () => submit(NaN) }, 'Skip')));
        setTimeout(() => inp.focus({ preventScroll: true }), 30);
      }
    }
    function finish() {
      if (finish.done) return; finish.done = true; clearInterval(iv);
      const score = ans.filter(a => a.ok).length, secs = Math.round((performance.now() - t0) / 1000);
      const label = [...new Set(qs.map(q => q.topic.code))].join(', ');
      const hist = Store.get('tests', []); const avgD = qs.reduce((a, q) => a + qDiff(q), 0) / qs.length; hist.push({ at: Date.now(), n: qs.length, score, label, secs, d: avgD }); Store.set('tests', hist.slice(-30));
      head.innerHTML = ''; qbox.remove();
      const pct = Math.round(score / qs.length * 100);
      const grade = pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : pct >= 40 ? 'E' : 'U';
      body.append(el('div', { class: 'pt-res card' }, el('div', { class: 'big' }, `${score} / ${qs.length}`), el('div', {}, `${pct}% · rough grade ${grade} · ${Math.floor(secs / 60)} min ${secs % 60} s`), DiffMeter(Math.round(avgD * 10) / 10, 'Test difficulty'),
        el('div', { class: 'muted', style: { fontSize: '13px', marginTop: '6px' } }, [1, 2, 3].map(d => { const qd = qs.map((q, i) => [q, ans[i]]).filter(([q]) => qDiff(q) === d); return qd.length ? `${DIFF_NAMES[d]}: ${qd.filter(([, a]) => a && a.ok).length}/${qd.length}` : null; }).filter(Boolean).join(' · ')),
        el('div', { class: 'btns', style: { justifyContent: 'center', marginTop: '12px' } }, el('button', { class: 'btn pri', type: 'button', onclick: () => start('test') }, 'Another test'), el('button', { class: 'btn', type: 'button', onclick: setup }, 'Change sections'))));
      const rev = el('div', { class: 'pt-review' }); body.append(rev);
      qs.forEach((q, i) => {
        const a = ans[i] || { v: null, ok: false };
        const yours = a.v == null || (typeof a.v === 'number' && !isFinite(a.v)) ? '<i>no answer</i>' : q.options ? q.options[a.v] : `${num(a.v, 4)} ${q.unit || ''}`;
        const right = q.options ? q.options[q.correct] : `${num(q.a, q.sf || 3)} ${q.unit || ''}`;
        rev.append(el('details', { class: 'pt-item ' + (a.ok ? 'ok' : 'no'), open: !a.ok },
          el('summary', {}, el('span', { class: 'mark' }, a.ok ? '✓' : '✗'), el('span', { class: 'mono' }, `Q${i + 1} · ${q.topic.code}`), diffDots(qDiff(q)), el('span', { class: 'qq', html: stripTags(q.q).slice(0, 110) + (stripTags(q.q).length > 110 ? '…' : '') })),
          el('div', { class: 'drill-q', html: q.q }),
          el('div', { html: `Your answer: <b>${yours}</b> · Correct: <b>${right}</b>` }),
          q.why ? el('div', { class: 'key', html: q.why }) : null,
          q.steps ? el('ol', { class: 'steps', html: q.steps.map(s => `<li>${s}</li>`).join('') }) : null,
          el('a', { class: 'go', href: `#/physics/${q.topic.id}/${q.lab ? q.lab.id : ''}` }, 'Open the lab →')));
      });
    }
    show();
  }
  setup();
}

/* ---------- tutor (offline retrieval + optional Claude) ---------- */
const STOP = new Set('a an the of to in on for and or is are be what how why when which who does do did can could would should explain define definition tell me about give i you it its this that with by from as at into than then there their state describe meaning mean means please help find show use using calculate work out between difference vs'.split(' '));
const SYN = { emf: 'electromotive force', pd: 'potential difference', shm: 'simple harmonic motion', ke: 'kinetic energy', gpe: 'gravitational potential energy', pe: 'potential energy', cg: 'centre gravity', com: 'centre mass', tir: 'total internal reflection', ldr: 'light dependent resistor', ntc: 'thermistor', uv: 'ultraviolet', em: 'electromagnetic', suvat: 'equations motion uniform acceleration', ohms: 'ohm resistance', ohm: 'resistance', c: 'capacitance', rc: 'time constant capacitor', ev: 'electron volt', dof: 'diffraction', ysde: 'young double slit', bigbang: 'big bang', hubble: 'hubble law', photon: 'photon quantum', lenz: 'lenz law induced', faraday: 'faraday law induced', ampere: 'current', resistivity: 'resistivity', centre: 'centre center', center: 'centre', colour: 'color colour', vector: 'vector', momentum: 'momentum impulse', impulse: 'impulse momentum', drag: 'air resistance drag terminal', terminal: 'terminal velocity' };
const stem = w => w.length > 5 ? w.replace(/(ations|ation|ings|ing|ies|ed|es|s)$/, '') : w.length > 3 ? w.replace(/s$/, '') : w;
const toks = s => stripTags(s).toLowerCase().replace(/[^a-z0-9²³⁻\s]/g, ' ').split(/\s+/).filter(w => w && !STOP.has(w)).flatMap(w => SYN[w] ? [w, ...SYN[w].split(' ')] : [w]).map(stem);
const Tutor = {
  idx: null, hist: Store.get('chat', []), pending: null, seed: null,
  build() {
    if (this.idx) return this.idx;
    const docs = [];
    const add = (t, kind, title, html, link, boost = 1) => docs.push({ t, kind, title, html, link, boost, tk: toks(title + ' ' + title + ' ' + html) });
    for (const t of TOPICS) {
      add(t, 'overview', `${t.code} ${t.title}`, `<p>${t.blurb}</p><p>Labs: ${t.labs.map(l => `<a href="#/physics/${t.id}/${l.id}">${l.title}</a>`).join(', ')}.</p>`, `#/physics/${t.id}`, 0.8);
      for (const [h, b] of t.notes || []) add(t, 'note', h, /^\s*</.test(b) ? b : `<p>${b}</p>`, `#/physics/${t.id}/notes`, 1.2);
      if (t.equations) add(t, 'eq', `Equations for ${t.title}`, `<div class="eqs">${t.equations.map(([e, n]) => `<div class="eqrow"><span>${tex(e)}</span><small>${n || ''}</small></div>`).join('')}</div>`, `#/physics/${t.id}/notes`, 0.9);
      for (const tr of t.traps || []) add(t, 'trap', `Exam trap · ${t.title}`, `<p>${tr}</p>`, `#/physics/${t.id}/notes`, 0.7);
      for (const [c, x, lid] of t.outcomes) add(t, 'spec', `Spec ${c}`, `<p>${x}</p>`, `#/physics/${t.id}/${lid}`, 0.6);
    }
    const N = docs.length, df = {}; let avg = 0;
    for (const d of docs) { avg += d.tk.length; for (const w of new Set(d.tk)) df[w] = (df[w] || 0) + 1; }
    avg /= N;
    return (this.idx = { docs, df, N, avg });
  },
  search(q, n = 4) {
    const I = this.build(), qt = [...new Set(toks(q))]; if (!qt.length) return [];
    const wantEq = /equation|formula|calculat|how do i find/i.test(q), wantDef = /define|definition|what is|what are|meaning/i.test(q);
    const scored = I.docs.map(d => {
      let s = 0; const tf = {}; for (const w of d.tk) tf[w] = (tf[w] || 0) + 1;
      for (const w of qt) { const f = tf[w]; if (!f) continue; const idf = Math.log(1 + (I.N - (I.df[w] || 0) + 0.5) / ((I.df[w] || 0) + 0.5)); s += idf * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * d.tk.length / I.avg)); }
      if (wantEq && d.kind === 'eq') s *= 1.5; if (wantDef && d.kind === 'note') s *= 1.3;
      return [s * d.boost, d];
    }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]);
    return scored.slice(0, n);
  },
  findTopic(q) { const s = q.toLowerCase(); return TOPICS.find(t => s.includes(t.code + ' ') || s.endsWith(t.code)) || TOPICS.find(t => s.includes(t.title.toLowerCase()) || s.includes(t.short.toLowerCase()) || s.includes(t.id)) || (this.search(q, 1)[0] || [])[1]?.t; },
  offline(q) {
    const s = q.trim(), low = s.toLowerCase();
    if (this.pending) {
      const p = this.pending;
      if (/^(skip|answer|show|reveal|idk|i don.?t know|give up)/i.test(low)) { this.pending = null; return this.reveal(p, null); }
      if (p.options) { const L = low.match(/^\(?([a-h])\)?\.?$/); if (L) { const i = L[1].charCodeAt(0) - 97; this.pending = null; return this.reveal(p, p.order[i]); } }
      else { const v = parseNum(s.replace(/\s*[a-zA-Zµ°Ω⁻¹²³\/]+(\s+[a-zA-Z⁻¹²³]+)*\s*$/, '')); if (isFinite(v)) { this.pending = null; return this.reveal(p, v); } }
    }
    if (/^(hi|hello|hey|yo|sup)\b/.test(low)) return `<p>Hi! I’m the BCS Academy physics tutor. Ask me about any CCEA AS or A2 Physics topic — “define specific heat capacity”, “equation for capacitor energy”, “why does a filament lamp curve” — or say <b>quiz me on circular motion</b>.</p>`;
    if (/^(help|what can you do)/.test(low)) return `<p>I search every section’s notes, equations, exam traps and spec outcomes, and I can quiz you with randomised exam questions (with worked solutions).</p><ul><li><b>define …</b> / <b>what is …</b></li><li><b>equation for …</b></li><li><b>quiz me on …</b> (then type your number, or a letter for multiple choice; “skip” to see the answer)</li></ul><p>For open-ended explanations, you can switch on Claude mode in <a href="#/settings">Settings</a> with your own API key.</p>`;
    const quiz = low.match(/^(quiz|test|question|another|next|ask)( me)?( on| about)?\s*(.*)$/);
    if (quiz) {
      const t = quiz[4] ? this.findTopic(quiz[4]) : (this.lastTopic || pick(TOPICS));
      if (!t) return '<p>Which section? e.g. “quiz me on capacitors”.</p>';
      const pool = Bank.forTopics([t.id]); if (!pool.length) return `<p>No drill questions for ${t.title} yet.</p>`;
      const q = Bank.make(pick(pool)); if (!q) return '<p>That question failed to generate — try again.</p>';
      this.lastTopic = t;
      if (q.options) { q.order = shuffle(q.options.map((_, i) => i)); }
      this.pending = q;
      return `<p class="eyebrow">${t.code} ${t.title}</p><div class="drill-q">${q.q}</div>` + (q.options ? `<ol type="A" class="chat-opts">${q.order.map(i => `<li>${q.options[i]}</li>`).join('')}</ol><p class="muted">Reply with a letter.</p>` : `<p class="muted">Reply with your answer${q.unit ? ` in ${q.unit}` : ''} (e.g. 3.2e-4). Say “skip” to see the working.</p>`);
    }
    const hits = this.search(s, 4);
    if (!hits.length || hits[0][0] < 1.2) return `<p>I couldn’t find that in the notes. Try naming the quantity or law (e.g. “resistivity”, “Hubble constant”, “Lenz’s law”), or pick a section from the menu.</p>` + (Settings.get('apiKey') ? '' : '<p class="muted">Tip: add a Claude API key in <a href="#/settings">Settings</a> for open-ended answers.</p>');
    const [, top] = hits[0]; this.lastTopic = top.t;
    const more = hits.slice(1).filter(h => h[0] > hits[0][0] * 0.35);
    return `<p class="eyebrow">${top.t.code} ${top.t.title} · ${top.kind === 'eq' ? 'equations' : top.kind === 'trap' ? 'exam trap' : top.kind === 'spec' ? 'spec outcome' : 'notes'}</p><h4>${top.title}</h4>${top.html}<p><a href="${top.link}">Open ${top.kind === 'spec' ? 'the lab' : 'the notes'} →</a></p>` +
      (more.length ? `<div class="chat-more"><b>Related:</b> ${more.map(([, d]) => `<a href="${d.link}">${d.t.code} · ${stripTags(d.title)}</a>`).join(' · ')}</div>` : '');
  },
  reveal(p, v) {
    const ok = v == null ? false : p.options ? v === p.correct : Math.abs(v - p.a) <= Math.abs(p.a) * (p.tol ?? 0.02) + (p.abs || 0);
    recordScore(p.topic.id, ok);
    const right = p.options ? p.options[p.correct] : `${num(p.a, p.sf || 3)} ${p.unit || ''}`;
    return `<p><b style="color:var(${ok ? '--ps-green' : '--ps-red'})">${ok ? '✓ Correct!' : v == null ? 'Answer:' : '✗ Not quite.'}</b> ${ok ? '' : `The answer is <b>${right}</b>.`}</p>${p.why ? `<p>${p.why}</p>` : ''}${p.steps ? `<ol class="steps">${p.steps.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}<p class="muted">Say <b>another</b> for the next one.</p>`;
  },
  async claude(q) {
    const key = Settings.get('apiKey'), model = Settings.get('model');
    const ctxDocs = this.search(q, 4).map(([, d]) => `[${d.t.code} ${d.t.title} — ${stripTags(d.title)}] ${stripTags(d.html)}`).join('\n');
    const system = 'You are the BCS Academy physics tutor: a friendly, precise tutor for CCEA GCE Physics (AS 1, AS 2, A2 1, A2 2) for students in Northern Ireland. Use CCEA exam wording for definitions, SI units, and show numbered working ending in a value with units. If the student is attempting a problem, give a hint first and let them try before revealing the full solution. Keep answers short (under 200 words) unless asked for more. Use **bold** for key terms and plain-text maths (e.g. v = fλ, 3.2 × 10⁻⁴). If something is outside the CCEA specification, say so briefly.';
    const prev = this.hist.slice(0, -1).filter(m => m.api && m.text), msgs = prev.slice(-10).map(m => ({ role: m.role, content: m.text }));
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    msgs.push({ role: 'user', content: (ctxDocs ? `Relevant notes from the app (use if helpful):\n${ctxDocs}\n\n` : '') + `Student: ${q}` });
    const body = { model, max_tokens: 2048, system, messages: msgs };
    const headers = { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
    if (/^claude-(opus|sonnet)-5-5/.test(model)) { body.output_config = { effort: 'low' }; body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; }
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error((data.error && data.error.message) || `HTTP ${r.status}`);
    if (data.stop_reason === 'refusal') return 'Sorry — I can’t help with that one. Try rephrasing it as a physics question.';
    return (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim() || '(no reply)';
  },
  md(s) {
    let h = escH(s);
    h = h.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<i>$2</i>');
    const lines = h.split('\n'); let out = '', inL = null;
    for (const ln of lines) {
      const m = ln.match(/^\s*(?:[-•]|(\d+)[.)])\s+(.*)$/);
      if (m) { const tag = m[1] ? 'ol' : 'ul'; if (inL !== tag) { if (inL) out += `</${inL}>`; out += `<${tag}>`; inL = tag; } out += `<li>${m[2]}</li>`; continue; }
      if (inL) { out += `</${inL}>`; inL = null; }
      if (/^#{1,4}\s/.test(ln)) out += `<h4>${ln.replace(/^#+\s/, '')}</h4>`; else if (ln.trim()) out += `<p>${ln}</p>`;
    }
    if (inL) out += `</${inL}>`;
    return out;
  },
  save() { Store.set('chat', this.hist.slice(-40)); }
};

function TutorPanel(parent, compact) {
  const wrap = el('div', { class: 'chat' + (compact ? ' compact' : '') });
  const log = el('div', { class: 'chat-log', 'aria-live': 'polite' });
  const inp = el('textarea', { rows: 1, placeholder: 'Ask anything, or “quiz me on waves”…', 'aria-label': 'message' });
  const mode = el('span', { class: 'chat-mode mono' });
  const setMode = () => { const cl = Settings.get('tutorMode') === 'claude' && Settings.get('apiKey'); mode.textContent = cl ? `Claude · ${Settings.get('model')}` : 'offline · notes search'; };
  const send = el('button', { class: 'btn pri', type: 'button' }, 'Send');
  const bar = el('div', { class: 'chat-bar' }, inp, send);
  const chips = el('div', { class: 'chat-chips' }, ['define specific heat capacity', 'equation for capacitor energy', 'quiz me on SHM', 'what is Lenz’s law', 'help'].map(c => el('button', { type: 'button', class: 'pill', onclick: () => ask(c) }, c)));
  wrap.append(el('div', { class: 'chat-top' }, el('b', {}, 'Tutor'), mode, el('button', { type: 'button', class: 'btn sm', onclick: () => { Tutor.hist = []; Tutor.pending = null; Tutor.save(); render(); } }, 'Clear')), log, chips, bar);
  parent.append(wrap);
  function bubble(m) { return el('div', { class: 'msg ' + m.role }, el('div', { class: 'bub', html: m.role === 'user' ? `<p>${escH(m.text)}</p>` : (m.html || Tutor.md(m.text)) })); }
  function render() { log.innerHTML = ''; if (!Tutor.hist.length) log.append(bubble({ role: 'assistant', html: Tutor.offline('hi') })); for (const m of Tutor.hist) log.append(bubble(m)); log.scrollTop = log.scrollHeight; setMode(); }
  async function ask(q) {
    q = (q || inp.value).trim(); if (!q) return; inp.value = ''; inp.style.height = '';
    Tutor.hist.push({ role: 'user', text: q, api: true }); log.append(bubble({ role: 'user', text: q }));
    const useClaude = Settings.get('tutorMode') === 'claude' && Settings.get('apiKey') && !Tutor.pending && !/^(quiz|test me|another|next)\b/i.test(q) && navigator.onLine !== false;
    let m;
    if (useClaude) {
      const th = el('div', { class: 'msg assistant' }, el('div', { class: 'bub' }, el('p', { class: 'muted' }, 'Thinking…'))); log.append(th); log.scrollTop = log.scrollHeight;
      try { const txt = await Tutor.claude(q); m = { role: 'assistant', text: txt, api: true }; }
      catch (e) { m = { role: 'assistant', html: `<p class="flag">Claude request failed: ${escH(e.message)}. Falling back to offline notes.</p>` + Tutor.offline(q) }; }
      th.remove();
    } else m = { role: 'assistant', html: Tutor.offline(q) };
    Tutor.hist.push(m); Tutor.save(); log.append(bubble(m)); log.scrollTop = log.scrollHeight;
  }
  send.addEventListener('click', () => ask());
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(); } });
  inp.addEventListener('input', () => { inp.style.height = ''; inp.style.height = Math.min(140, inp.scrollHeight) + 'px'; });
  render();
  if (Tutor.seed) { const s = Tutor.seed; Tutor.seed = null; setTimeout(() => ask(s), 50); }
  return { focus: () => inp.focus({ preventScroll: true }), render };
}

function TutorPage(w) {
  w.append(el('header', { class: 'thead' }, el('div', {}, el('div', { class: 'eyebrow' }, 'Tutor'), el('h1', {}, 'Ask the tutor'), el('p', {}, 'Searches every section’s notes, equations and exam traps — offline and free. It can also quiz you. Optional: connect Claude in Settings for open-ended explanations.'))));
  TutorPanel(w).focus();
}

/* ---------- animated thumbnails for the section cards ---------- */
const MINI = {
  quantities(c, w, h, t, C) {
    const y = h * 0.55; c.strokeStyle = C.ink2; c.lineWidth = 1; c.beginPath(); c.moveTo(14, y + .5); c.lineTo(w - 14, y + .5); c.stroke();
    const P = ['f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T']; const pos = ((Math.sin(t * 0.6) + 1) / 2) * 9;
    P.forEach((p, i) => { const x = 20 + i * (w - 40) / 9; const on = Math.abs(pos - i) < 0.5; c.fillStyle = on ? C.blue : C.muted; c.font = FONT.mono(on ? 17 : 13, on ? 700 : 500); c.textAlign = 'center'; c.textBaseline = 'bottom'; c.fillText(p || '·', x, y - 8); c.font = FONT.mono(9); c.textBaseline = 'top'; c.fillText('10' + supx(i * 3 - 15), x, y + 8); });
    const mx = 20 + pos * (w - 40) / 9; c.beginPath(); c.moveTo(mx, y - 2); c.lineTo(mx - 6, y - 32); c.lineTo(mx + 6, y - 32); c.fillStyle = alpha(C.blue, 0.2); c.fill();
  },
  vectors(c, w, h, t, C) {
    const ox = w * 0.3, oy = h * 0.78, L = Math.min(w * 0.45, h * 0.62), a = 0.35 + 0.5 * (Math.sin(t * 0.8) + 1) / 2;
    const x = ox + L * Math.cos(a), y = oy - L * Math.sin(a);
    line(c, [[ox, oy], [x, oy]], { color: C.blue, width: 2, dash: [5, 4] }); line(c, [[x, oy], [x, y]], { color: C.red, width: 2, dash: [5, 4] });
    arrow(c, ox, oy, x, y, { color: C.ink, width: 2.5 });
    c.beginPath(); c.arc(ox, oy, 26, -a, 0); c.strokeStyle = C.muted; c.lineWidth = 1; c.stroke();
    rich(c, '*F* cos *θ*', (ox + x) / 2, oy + 13, { align: 'center', color: C.blue, size: 12 }); rich(c, '*F* sin *θ*', x + 8, (oy + y) / 2, { color: C.red, size: 12 });
  },
  waves(c, w, h, t, C) {
    const y0 = h * 0.5, A = h * 0.24, lam = w / 2.2;
    const pts = []; for (let x = 0; x <= w; x += 3) pts.push([x, y0 - A * Math.sin(TAU * (x / lam - t * 0.5))]);
    line(c, pts, { color: C.blue, width: 2 });
    for (let x = 12; x < w; x += 16) { const y = y0 - A * Math.sin(TAU * (x / lam - t * 0.5)); dot(c, x, y, 3, Math.abs(x - w * 0.52) < 8 ? C.red : C.ink2); }
  },
  solids(c, w, h, t, C) {
    const x = w * 0.3, top = 14, ext = 50 + 22 * Math.sin(t * 3.2) * Math.exp(-((t % 6) * 0.5)) + 10;
    c.fillStyle = C.ink2; c.fillRect(x - 40, top - 4, 80, 5);
    line(c, springPath(x, top, top + ext, 10, 9), { color: C.ink, width: 1.6 });
    c.fillStyle = alpha(C.blue, .9); c.fillRect(x - 14, top + ext, 28, 22);
    // mini F-x graph
    const gx = w * 0.58, gy = h - 18, gw = w * 0.36, gh = h - 40;
    line(c, [[gx, gy - gh], [gx, gy], [gx + gw, gy]], { color: C.ink2, width: 1.2 });
    const pts = []; for (let i = 0; i <= 40; i++) { const e = i / 40; const f = e < 0.55 ? e * 1.3 : 0.715 + (e - 0.55) * 0.5 - (e - 0.55) ** 2 * 0.4; pts.push([gx + e * gw, gy - f * gh]); }
    line(c, pts, { color: C.red, width: 2 });
  },
  circular(c, w, h, t, C) {
    const cx = w * 0.5, cy = h * 0.52, R = Math.min(w * 0.3, h * 0.34), a = t * 1.6;
    c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.strokeStyle = alpha(C.muted, .5); c.lineWidth = 1.2; c.setLineDash([4, 4]); c.stroke(); c.setLineDash([]);
    const x = cx + R * Math.cos(a), y = cy - R * Math.sin(a);
    arrow(c, x, y, x - Math.sin(a) * R * 0.5, y - Math.cos(a) * R * 0.5, { color: C.blue, width: 2 });
    arrow(c, x, y, x + (cx - x) * 0.45, y + (cy - y) * 0.45, { color: C.red, width: 2 });
    dot(c, x, y, 6, C.ink); dot(c, cx, cy, 3, C.muted);
  },
  shm(c, w, h, t, C) {
    const eq = h * 0.5, A = h * 0.26, x = A * Math.cos(t * 2.2);
    const sx = w * 0.18;
    c.fillStyle = C.ink2; c.fillRect(sx - 20, 8, 40, 4);
    line(c, springPath(sx, 12, eq + x - 10, 8, 7), { color: C.ink, width: 1.3 });
    c.fillStyle = C.blue; rrect(c, sx - 12, eq + x - 10, 24, 20, 3); c.fill();
    const pts = []; for (let i = 0; i <= 60; i++) { const tt = i / 60; pts.push([w * 0.36 + tt * w * 0.58, eq + A * Math.cos(t * 2.2 - tt * 9)]); }
    line(c, pts, { color: C.red, width: 2 });
  },
  nucleus(c, w, h, t, C) {
    const cx = w * 0.62, cy = h * 0.5;
    for (let i = 0; i < 7; i++) { const a = i * 0.9 + t * 0.2; dot(c, cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, 5, i % 2 ? C.red : C.blue); }
    for (let k = 0; k < 4; k++) {
      const b = (k - 1.5) * 16; const pts = [];
      for (let s = -1; s <= 1.01; s += 0.02) { const X = w * 0.06 + (s + 1) * (w * 0.62); const dx = X - cx; const Y = cy + b + (b === 0 ? 0 : 900 / (dx || 1) * Math.sign(b) * -0.02 * Math.max(0, 1 - Math.abs(dx) / 200)); pts.push([X, Y]); }
      line(c, pts, { color: alpha(C.orange, .8), width: 1.6 });
    }
  },
  decay(c, w, h, t, C) {
    const x0 = w * 0.1, y0 = h * 0.85, W = w * 0.8, H = h * 0.7, lam = 0.5;
    line(c, [[x0, y0], [x0 + W, y0]], { color: C.ink2, width: 1 }); line(c, [[x0, y0], [x0, y0 - H]], { color: C.ink2, width: 1 });
    const pts = []; for (let i = 0; i <= 60; i++) { const tt = i / 60 * 5; pts.push([x0 + tt / 5 * W, y0 - H * Math.exp(-lam * tt)]); }
    line(c, pts, { color: C.red, width: 2.2 });
    const th = Math.log(2) / lam; line(c, [[x0 + th / 5 * W, y0], [x0 + th / 5 * W, y0 - H / 2]], { color: C.blue, width: 1, dash: [3, 3] });
    line(c, [[x0, y0 - H / 2], [x0 + th / 5 * W, y0 - H / 2]], { color: C.blue, width: 1, dash: [3, 3] });
    rich(c, 'half-life', x0 + th / 5 * W + 6, y0 - H / 2 - 8, { size: 10, color: C.blue });
  },
  energy(c, w, h, t, C) {
    const x0 = w * 0.12, y0 = h * 0.85, W = w * 0.78, H = h * 0.68;
    line(c, [[x0, y0], [x0 + W, y0]], { color: C.ink2, width: 1 });
    const be = A => A < 1 ? 0 : 8.8 * (1 - Math.exp(-A / 12)) - 0.006 * A;
    const pts = []; for (let A = 2; A <= 238; A += 4) pts.push([x0 + A / 240 * W, y0 - be(A) / 9 * H]);
    line(c, pts, { color: C.violet, width: 2.2 });
    const fe = 56; dot(c, x0 + fe / 240 * W, y0 - be(fe) / 9 * H, 4, C.red);
    rich(c, 'Fe-56', x0 + fe / 240 * W + 6, y0 - be(fe) / 9 * H - 8, { size: 10, color: C.red });
  },
  fusion(c, w, h, t, C) {
    const cx = w * 0.5, cy = h * 0.5, R = Math.min(w * 0.3, h * 0.36);
    c.beginPath(); c.ellipse(cx, cy, R, R * 0.42, 0, 0, TAU); c.strokeStyle = C.violet; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.ellipse(cx, cy, R * 0.55, R * 0.22, 0, 0, TAU); c.strokeStyle = alpha(C.orange, .9); c.lineWidth = 6; c.stroke();
    for (let i = 0; i < 10; i++) { const a = t * 1.2 + i * 0.63; dot(c, cx + Math.cos(a) * R * 0.55, cy + Math.sin(a) * R * 0.22, 2.6, C.red); }
  },
  thermal(c, w, h, t, C, st) {
    if (!st.p) { st.p = Array.from({ length: 34 }, () => ({ x: rand(10, w - 60), y: rand(10, h - 10), vx: rand(-60, 60), vy: rand(-60, 60) })); }
    const px = w - 40 + 8 * Math.sin(t * 0.7);
    c.strokeStyle = C.ink2; c.lineWidth = 1.5; c.strokeRect(8.5, 8.5, px - 8, h - 17); c.fillStyle = C.ink2; c.fillRect(px, 8, 6, h - 16);
    for (const p of st.p) { p.x += p.vx / 60; p.y += p.vy / 60; if (p.x < 12) { p.x = 12; p.vx = Math.abs(p.vx); } if (p.x > px - 4) { p.x = px - 4; p.vx = -Math.abs(p.vx); } if (p.y < 12) { p.y = 12; p.vy = Math.abs(p.vy); } if (p.y > h - 12) { p.y = h - 12; p.vy = -Math.abs(p.vy); } const sp = hyp(p.vx, p.vy); dot(c, p.x, p.y, 3, sp > 60 ? C.red : sp > 35 ? C.orange : C.blue); }
  }
};

/* ================= BCS Academy integration: units, pages and routing ================= */
// BCS Academy owns the hash router, the global and unit bars, the theme and the footer. It calls route() for
// #/physics/…, leave() whenever it shows anything else, and reads UNITS / stats() for the Physics subject page.
const UNITS = [
  { id: 'as1', no: 'AS 1', level: 'AS', title: 'Forces, Energy and Electricity' },
  { id: 'as2', no: 'AS 2', level: 'AS', title: 'Waves, Photons and Astronomy' },
  { id: 'a21', no: 'A2 1', level: 'A2', title: 'Deformation of Solids, Thermal Physics, Circular Motion, Oscillations and Atomic and Nuclear Physics', short: 'Solids, Thermal, Circular Motion, Oscillations and Nuclear' },
  { id: 'a22', no: 'A2 2', level: 'A2', title: 'Fields, Capacitors and Particle Physics' },
];
const unitById = id => UNITS.find(u => u.id === id);
const unitOf = t => UNITS.find(u => u.no === t.unit);
const topicsIn = u => TOPICS.filter(t => t.unit === u.no);
const host = () => document.getElementById('app');
let cur = { page: null, topic: null, lab: null, ctx: null };

function Ctx() {
  const cl = [], stages = [];
  const redraw = () => stages.forEach(s => s.draw && s.draw());
  window.addEventListener('ps-theme', redraw); cl.push(() => window.removeEventListener('ps-theme', redraw));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  return {
    stage(parent, o) { const s = Stage(parent, o); stages.push(s); cl.push(s.destroy); return s; },
    fillLast() { const s = stages[stages.length - 1]; if (s) s.setFill(); },
    loop(fn, st) { cl.push(Loop(fn, st)); },
    on(t, ev, fn, opt) { t.addEventListener(ev, fn, opt); cl.push(() => t.removeEventListener(ev, fn, opt)); },
    cleanup(f) { cl.push(f); },
    destroy() { cl.forEach(f => { try { f(); } catch (e) { console.error(e); } }); cl.length = 0; }
  };
}
function teardown() { if (cur.ctx) { cur.ctx.destroy(); cur.ctx = null; } }
function leave() { teardown(); cur = { page: null, topic: null, lab: null, ctx: null }; window.PS_CUR = null; fabSync(); }

// a fresh page inside BCS Academy's <main>; everything physics draws lives under .phys so its styles stay scoped
function page(name, title) {
  teardown(); cur = { page: name, topic: null, lab: null, ctx: Ctx() };
  const a = host(); a.innerHTML = ''; window.scrollTo(0, 0);
  const w = el('div', { class: 'phys' }); a.append(w);
  document.title = `${title} · BCS Academy`; fabSync();
  return w;
}
const crumbs = (...parts) => el('nav', { class: 'crumbs', html: `<a href="#/">Courses</a> / <a href="#/physics">Physics</a>${parts.map(p => ' / ' + p).join('')}` });
const uLink = u => `<a href="#/physics/${u.id}">${u.no}</a>`;
function tally(ts) {
  const sc = Store.get('scores', {}), ticks = Store.get('ticks', {});
  let n = 0, ok = 0, outs = 0, ticked = 0, labs = 0;
  for (const t of ts) { const r = sc[t.id]; if (r) { n += r.n; ok += r.ok; } labs += t.labs.length; for (const o of t.outcomes) { outs++; if (ticks[o[0]]) ticked++; } }
  return { sections: ts.length, labs, outs, ticked, n, ok, acc: n ? Math.round(ok / n * 100) : 0, tried: ts.filter(t => sc[t.id]).length };
}
function stats() { const by = {}; for (const u of UNITS) by[u.id] = tally(topicsIn(u)); return Object.assign(tally(TOPICS), { by }); }
const lastUnit = () => unitById(Store.get('unit', 'as1')) || UNITS[0];
// which unit the bars should highlight for a #/physics/… path
function unitFor(parts) { const u = unitById(parts[0]); if (u) return u; const t = TOPICS.find(x => x.id === parts[0]); return t ? unitOf(t) : lastUnit(); }

/* ---------- unit home ---------- */
function weakIn(ts) { const set = new Set(ts.map(t => t.id)); return weakList().filter(([t]) => set.has(t.id)); }
function unitPage(u) {
  const w = page('unit', `Physics ${u.no}`), ctx = cur.ctx; Store.set('unit', u.id);
  const ts = topicsIn(u), s = tally(ts), sc = Store.get('scores', {});
  const next = ts.find(t => !sc[t.id]) || ts[0];
  w.append(crumbs(u.no), el('section', { class: 'hero', html: `<p class="kicker">CCEA GCE Physics (2016) · Unit ${u.no}</p>
    <h1>Physics <span class="grad">${u.no}</span></h1><p class="lead">${u.title}</p>
    <div class="cta center"><a class="btn primary" href="#/physics/${next.id}">${s.tried ? 'Continue' : 'Start'} <span class="btn-sub">${next.code} ${next.title}</span></a><a class="btn" href="#/physics/practice/${u.id}">Mock test on ${u.no} ${ico('chevron')}</a></div>` }));
  w.append(el('section', { class: 'stats', html: `<div class="stat"><b>${s.sections}</b><span>sections</span></div><div class="stat"><b>${s.labs}</b><span>live labs</span></div>
    <div class="stat"><b>${s.ticked}<i>/${s.outs}</i></b><span>spec outcomes ticked</span></div><div class="stat"><b>${s.acc}<i>%</i></b><span>accuracy · ${s.n} answered</span></div>` }));
  const weak = weakIn(ts).slice(0, 4);
  if (weak.length) w.append(el('section', { class: 'card weakcard' }, el('h3', {}, 'Weak areas: work on these next'),
    el('div', { class: 'pc-list' }, weak.map(([t, r]) => el('a', { href: `#/physics/${t.id}/notes`, class: 'pc-item' }, el('span', { class: 'code' }, t.code), el('span', {}, t.title), el('span', { class: 'bar' }, el('i', { style: { width: Math.round(r.acc * 100) + '%' } })), el('span', { class: 'mono' }, Math.round(r.acc * 100) + '%')))),
    el('a', { class: 'btn pri', href: '#/physics/practice/weak' }, 'Mock test on my weak areas')));
  w.append(el('section', { class: 'grid tiles', html: [[`#/physics/${u.id}/spec`, 'spec', '#0a84ff', 'Spec checklist', `${s.outs} outcomes to tick off`], [`#/physics/${u.id}/equations`, 'sigma', '#5e5ce6', 'Equations', 'Every equation in the unit'], [`#/physics/practice/${u.id}`, 'drill', '#ff2d55', 'Mock test', 'Timed, mixed, marked'], ['#/physics/tutor', 'chat', '#34c759', 'Tutor', 'Ask anything, works offline']]
    .map(([h, i, c, t, d]) => `<a class="card tile" href="${h}" style="--tc:${c}"><span class="ti">${ico(i)}</span><b>${t}</b><small>${d}</small></a>`).join('') }));
  w.append(el('h2', { class: 'sech' }, 'Sections'));
  const cards = el('div', { class: 'cards' }); w.append(cards);
  const minis = [];
  for (const t of ts) {
    const st = el('div', { class: 'tc-stage stage plain' }), r = topicScore(t.id);
    cards.append(el('a', { class: 'tcard', href: `#/physics/${t.id}` }, st, el('div', { class: 'tc-body' },
      el('div', { class: 'tc-top' }, el('span', { class: 'code' }, t.code), r ? el('span', { class: 'acc mono' }, Math.round(r.acc * 100) + '%') : null),
      el('h3', {}, t.title), el('p', {}, t.blurb), el('div', { class: 'labs' }, `${t.labs.length} lab${t.labs.length > 1 ? 's' : ''} · ${t.labs.map(l => l.title).join(' · ')}`))));
    const S = ctx.stage(st, { aspect: 2.4, minH: 120, maxH: 120, plain: true }); S.wrap.style.border = '0';
    minis.push([S, MINI[t.id] || t.mini || miniFallback(t), {}, false]);
  }
  ctx.loop((dt, time) => { if (Settings.get('calm')) time = 1.5; for (const m of minis) { const [S, f, state] = m; if (!f) continue; if (!S.visible && m[3]) continue; if (!S.w) continue; m[3] = true; const c = S.begin(); f(c, S.w, S.h, time, Theme.c, state); } }, minis.map(m => m[0]));
}

/* ---------- spec checklist and equations for a unit ---------- */
function slimHead(w, u, title, lead) { w.append(crumbs(uLink(u), title), el('header', { class: 'phead slim', html: `<div><h1>${title} <span class="muted">· ${u.no}</span></h1><p>${lead}</p></div>` })); }
function specPage(u) {
  const w = page('spec', `Physics ${u.no} spec`), ticks = Store.get('ticks', {});
  slimHead(w, u, 'Spec checklist', 'Tick each outcome once you could teach it. Wording follows the CCEA specification; check the official document for exact phrasing.');
  const spec = el('div', { class: 'spec' }); w.append(spec);
  for (const t of topicsIn(u)) {
    const barI = el('i'), cnt = el('span', { class: 'mono muted cnt' });
    const g = el('div', { class: 'spec-group' }, el('div', { class: 'spec-gh' }, el('h3', {}, el('a', { href: `#/physics/${t.id}` }, el('span', { class: 'code' }, t.code), t.title)), el('div', { class: 'spec-c' }, cnt, el('div', { class: 'bar' }, barI))));
    const upd = () => { const n = t.outcomes.filter(o => ticks[o[0]]).length; barI.style.width = (n / t.outcomes.length * 100) + '%'; cnt.textContent = `${n}/${t.outcomes.length}`; };
    for (const [code, text, lid] of t.outcomes) {
      const cb = el('input', { type: 'checkbox', class: 'tick', 'aria-label': 'mark ' + code + ' done', id: 'tk-' + code.replace(/\./g, '-') }); cb.checked = !!ticks[code];
      const lab = t.labs.find(l => l.id === lid);
      const row = el('div', { class: 'spec-row' + (cb.checked ? ' done' : '') }, cb, el('span', { class: 'cd' }, code), el('label', { class: 'tx', for: cb.id }, text), el('a', { class: 'go', href: `#/physics/${t.id}/${lid}` }, `Lab ${lab.letter}`));
      cb.addEventListener('change', () => { ticks[code] = cb.checked; Store.set('ticks', ticks); row.classList.toggle('done', cb.checked); upd(); });
      g.append(row);
    }
    upd(); spec.append(g);
  }
}
function eqPage(u) {
  const w = page('equations', `Physics ${u.no} equations`);
  slimHead(w, u, 'Equations', 'Every equation the sections in this unit use, with what each symbol means. Learn the ones that are not on the CCEA data and formulae sheet.');
  const g = el('div', { class: 'below eqgrid' }); w.append(g);
  for (const t of topicsIn(u)) if (t.equations) { const c = EqCard(g, `<a href="#/physics/${t.id}"><span class="code">${t.code}</span> ${t.title}</a>`, t.equations); c.classList.add('eqcard'); }
}

/* ---------- topic page: lab tabs, the live plate, notes ---------- */
function topicPage(t, labId) {
  const lab = labId === 'notes' ? NOTES_LAB : (t.labs.find(l => l.id === labId) || t.labs[0]);
  const u = unitOf(t); Store.set('unit', u.id);
  if (cur.page !== 'topic' || cur.topic !== t) {
    const w = page('topic', `${t.code} ${t.title}`); cur.topic = t;
    teardown();
    const chips = el('div', { class: 'outs' });
    for (const [code, text, lid] of t.outcomes) chips.append(el('a', { class: 'chip', href: `#/physics/${t.id}/${lid}`, title: text, 'data-lab': lid }, code));
    w.append(crumbs(uLink(u), `${t.code} ${t.title}`),
      el('header', { class: 'thead' }, el('div', {}, el('p', { class: 'kicker' }, `CCEA GCE Physics · Unit ${t.unit} · Section ${t.code}`), el('h1', {}, el('span', { class: 'code' }, t.code), t.title), el('p', { class: 'lead' }, t.blurb)), chips));
    const tabs = el('div', { class: 'labtabs', role: 'tablist' });
    for (const l of t.labs) tabs.append(el('button', { type: 'button', role: 'tab', 'data-lab': l.id, onclick: () => { location.hash = `#/physics/${t.id}/${l.id}`; } }, el('span', { class: 'f' }, l.letter), l.title));
    tabs.append(el('button', { type: 'button', role: 'tab', 'data-lab': 'notes', class: 'notes-tab', onclick: () => { location.hash = `#/physics/${t.id}/notes`; } }, el('span', { class: 'f', html: ico('book') }), 'Revision notes'));
    const labBox = el('div', { class: 'labbox' });
    const topicCards = el('div', { class: 'below topic-below' });
    if (t.equations) EqCard(topicCards, `Equations · ${t.code}`, t.equations);
    if (t.traps) Card(topicCards, 'Exam traps', list(t.traps), 'traps');
    const outs = Card(topicCards, 'Spec outcomes in this section', null, 'wide');
    outs.append(el('p', { class: 'muted small' }, 'Wording follows the CCEA specification; check the official document for exact phrasing.'));
    outs.append(el('dl', { class: 'ro outlist', html: t.outcomes.map(([c, x]) => `<dt class="mono">${c}</dt><dd>${x}</dd>`).join('') }));
    const i = TOPICS.indexOf(t), prev = TOPICS[i - 1], next = TOPICS[i + 1];
    const pager = el('div', { class: 'pager' });
    if (prev) pager.append(el('a', { class: 'pv', href: `#/physics/${prev.id}` }, el('span', {}, '← Previous section'), el('b', { html: `<span class="c">${prev.code}</span>${prev.title}` })));
    if (next) pager.append(el('a', { class: 'nx', href: `#/physics/${next.id}` }, el('span', {}, 'Next section →'), el('b', { html: `<span class="c">${next.code}</span>${next.title}` })));
    w.append(tabs, labBox, topicCards, pager);
    Object.assign(cur, { labBox, tabs, chips, lab: null });
  }
  if (cur.lab === lab) return;
  teardown(); cur.lab = lab;
  [...cur.tabs.children].forEach(b => { const on = b.dataset.lab === lab.id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); if (on) b.scrollIntoView({ block: 'nearest', inline: 'nearest' }); });
  [...cur.chips.children].forEach(c => c.classList.toggle('on', c.dataset.lab === lab.id));
  cur.labBox.innerHTML = '';
  const ctx = Ctx(); cur.ctx = ctx;
  if (lab === NOTES_LAB) { NotesPage(cur.labBox, t); document.title = `${t.code} Notes · BCS Academy`; return; }
  const P = Plate(cur.labBox, lab, t);
  window.PS_CUR = t.id;
  try { lab.mount(P, ctx); if (!lab.noFill) requestAnimationFrame(() => ctx.fillLast()); } catch (e) { console.error(e); P.stageBox.append(el('div', { class: 'flag', style: { margin: '16px' } }, 'This lab failed to load: ' + e.message)); }
  document.title = `${t.code} ${lab.title} · BCS Academy`;
}

/* ---------- practice and tutor ---------- */
function practicePage(args) { const w = page('practice', 'Physics practice'); w.append(crumbs('Practice')); PracticePage(w, cur.ctx, args); }
function tutorPage() { const w = page('tutor', 'Physics tutor'); w.append(crumbs('Tutor')); TutorPage(w); }

/* ---------- floating tutor button (physics pages only) ---------- */
let fab = null, chatPanel = null;
function closeChat() { if (chatPanel) { chatPanel.remove(); chatPanel = null; } if (fab) fab.classList.remove('on'); }
function fabSync() {
  if (!fab) {
    fab = el('button', { class: 'phys fab', type: 'button', 'aria-label': 'Open tutor chat', title: 'Tutor chat', html: ico('chat', 'lg') });
    fab.addEventListener('click', () => {
      if (chatPanel) { closeChat(); return; }
      chatPanel = el('div', { class: 'phys chat-pop', role: 'dialog', 'aria-label': 'Tutor chat' }); document.body.append(chatPanel);
      if (cur.topic) Tutor.lastTopic = cur.topic;
      TutorPanel(chatPanel, true).focus(); fab.classList.add('on');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && chatPanel) closeChat(); });
    document.body.append(fab);
  }
  fab.hidden = !cur.page || cur.page === 'tutor';
  if (fab.hidden) closeChat();
}

/* ---------- settings (rendered inside the BCS Academy Settings page) ---------- */
function settingsInto(box) {
  const s = Settings.all(), grid = el('div', { class: 'phys set-grid' }); box.append(grid);
  const g2 = Card(grid, 'Simulations', null);
  Slider(g2, { id: 'st-speed', label: 'Simulation speed', min: 0.25, max: 2, step: 0.25, value: s.speed, fmt: v => v + '×', oninput: v => Settings.set('speed', v) });
  Note(g2, 'Slow motion is handy for collisions, projectiles and decay; 2× speeds up long experiments like capacitor discharge.');
  Switch(g2, { id: 'st-calm', label: 'Calm mode: freeze the animated section cards', value: s.calm, onchange: v => Settings.set('calm', v) });
  const g3 = Card(grid, 'Mock tests', null);
  Seg(g3, { label: 'Default length', options: [[5, '5'], [10, '10'], [20, '20'], [40, '40']], value: s.testLen, onchange: v => Settings.set('testLen', +v) });
  Switch(g3, { id: 'st-timer', label: 'Timed mock tests', value: s.timer, onchange: v => Settings.set('timer', v) });
  Slider(g3, { id: 'st-spq', label: 'Time per question', min: 30, max: 240, step: 15, value: s.secsPerQ, fmt: v => v + ' s', oninput: v => Settings.set('secsPerQ', v) });
  const g4 = Card(grid, 'Tutor chat', null);
  Seg(g4, { label: 'Mode', options: [['offline', 'Offline (free)'], ['claude', 'Claude API']], value: s.tutorMode, onchange: v => { Settings.set('tutorMode', v); keyBox.hidden = v !== 'claude'; } });
  const keyBox = el('div', { class: 'grp' }); keyBox.hidden = s.tutorMode !== 'claude'; g4.append(keyBox);
  const key = el('input', { class: 'num', type: 'password', id: 'st-key', autocomplete: 'off', placeholder: 'sk-ant-…', value: s.apiKey });
  key.addEventListener('change', () => Settings.set('apiKey', key.value.trim()));
  const model = el('select', { class: 'sel', id: 'st-model' }, [['claude-opus-5-5', 'Claude Opus 5.5 (best)'], ['claude-sonnet-5-5', 'Claude Sonnet 5.5 (cheaper)'], ['claude-haiku-5-5', 'Claude Haiku 5.5 (cheapest)']].map(([v, t]) => el('option', { value: v, selected: v === s.model }, t)));
  model.addEventListener('change', () => Settings.set('model', model.value));
  const res = el('div', { class: 'key' });
  keyBox.append(el('label', { class: 'ctl-head', for: 'st-key' }, 'Anthropic API key'), key, el('label', { class: 'ctl-head', for: 'st-model' }, 'Model'), model,
    el('div', { class: 'btns' }, el('button', { class: 'btn', type: 'button', onclick: async () => { Settings.set('apiKey', key.value.trim()); res.textContent = 'Testing…'; try { const r = await Tutor.claude('Reply with just: connected'); res.textContent = '✓ ' + r.slice(0, 80); } catch (e) { res.textContent = '✗ ' + e.message; } } }, 'Test connection'), el('button', { class: 'btn', type: 'button', onclick: () => { key.value = ''; Settings.set('apiKey', ''); res.textContent = 'Key removed from this browser.'; } }, 'Forget key')), res,
    el('div', { class: 'flag info' }, 'API calls are billed to your own Anthropic account (pay-as-you-go, separate from a Claude.ai subscription). The key is stored only in this browser and sent only to api.anthropic.com. Leave this on Offline to spend nothing.'));
  const g5 = Card(grid, 'Physics progress', null);
  const msg = el('div', { class: 'key' });
  g5.append(el('p', { class: 'key' }, `${TOPICS.length} sections · ${TOPICS.reduce((a, t) => a + t.labs.length, 0)} labs · ${TOPICS.reduce((a, t) => a + t.outcomes.length, 0)} spec outcomes. Physics progress is included in the progress file above.`),
    el('div', { class: 'btns' },
      confirmBtn(null, 'Reset physics scores', 'Tap again to clear scores', () => { Store.set('scores', {}); Store.set('tests', []); msg.textContent = 'Physics scores and test history cleared.'; }),
      confirmBtn(null, 'Reset spec checklist', 'Tap again to untick all', () => { Store.set('ticks', {}); msg.textContent = 'Checklist cleared.'; })), msg);
}

/* ---------- progress data (merged into the BCS Academy progress file) ---------- */
const DATA_KEYS = ['ticks', 'scores', 'tests', 'set', 'practiceSel', 'unit'];
function exportData() { const d = {}; for (const k of DATA_KEYS) { const v = Store.get(k, null); if (v != null) d[k] = v; } if (d.set) d.set = Object.assign({}, d.set, { apiKey: '' }); return d; }
// accepts our own block or a whole export from the stand-alone Phase Space site ({ app: 'phase-space', ticks, scores, … });
// merge keeps the better record of each section and every tick, replace takes the file as it is
function importData(d, merge) {
  if (!d || typeof d !== 'object') return false;
  let n = 0;
  if (merge) {
    if (d.ticks) { const t = Store.get('ticks', {}); for (const [k, v] of Object.entries(d.ticks)) if (v) t[k] = true; Store.set('ticks', t); n++; }
    if (d.scores) { const s = Store.get('scores', {}); for (const [k, r] of Object.entries(d.scores)) if (!s[k] || (r.n || 0) > (s[k].n || 0)) s[k] = r; Store.set('scores', s); n++; }
    if (Array.isArray(d.tests)) { const h = Store.get('tests', []), seen = new Set(h.map(x => x.at)); Store.set('tests', h.concat(d.tests.filter(x => !seen.has(x.at))).sort((a, b) => a.at - b.at).slice(-30)); n++; }
  } else for (const k of DATA_KEYS) if (d[k] != null) { const v = k === 'set' ? Object.assign({}, Settings.all(), d[k], { apiKey: Settings.get('apiKey') }) : d[k]; Store.set(k, v); n++; }
  Settings.apply(); return n > 0;
}
const hasData = () => Object.keys(Store.get('scores', {})).length + Object.values(Store.get('ticks', {})).filter(Boolean).length > 0;
function resetAll() { for (const k of DATA_KEYS) try { localStorage.removeItem('ps:' + k); } catch (e) {} try { localStorage.removeItem('ps:chat'); } catch (e) {} Tutor.hist = []; }

/* ---------- router entry ---------- */
function route(parts) {
  const [a, b] = parts;
  const u = unitById(a);
  if (u) { if (b === 'spec') return specPage(u); if (b === 'equations') return eqPage(u); return unitPage(u); }
  if (a === 'practice') return practicePage(parts.slice(1));
  if (a === 'tutor') return tutorPage();
  const t = TOPICS.find(x => x.id === a);
  if (t) return topicPage(t, b);
  return unitPage(lastUnit());
}

/* ---------- theme: follow the BCS Academy light/dark switch ---------- */
Theme.refresh();
Settings.apply();
try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { Theme.refresh(); window.dispatchEvent(new Event('ps-theme')); }); } catch (e) {}
new MutationObserver(() => { const d = Theme.dark; Theme.refresh(); if (d !== Theme.dark) window.dispatchEvent(new Event('ps-theme')); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

return { UNITS, TOPICS, route, leave, unitFor, lastUnit, stats, settingsInto, exportData, importData, hasData, resetAll, topicsIn };
})();
