// Interactive simulations. Each SIMS[id] = { title, desc, mount(el, opt) -> cleanup }
'use strict';

const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const COL = () => ({ bg: css('--sim-bg'), grid: css('--grid'), axis: css('--axis'), text: css('--muted'), fg: css('--text'), a: css('--c1'), b: css('--c2'), c: css('--c3'), d: css('--c4'), fill: css('--fill') });

function h(tag, attrs = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) { if (k === 'class') e.className = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (v !== undefined) e.setAttribute(k, v); }
  for (const k of kids) e.append(k);
  return e;
}
function simShell(el) {
  const wrap = h('div', { class: 'sim' }), stage = h('div', { class: 'sim-stage' }), ctrls = h('div', { class: 'sim-ctrls' }), read = h('div', { class: 'sim-read' });
  wrap.append(stage, h('div', { class: 'sim-side' }, ctrls, read)); el.append(wrap);
  return { wrap, stage, ctrls, read };
}
function slider(parent, label, min, max, step, value, on, fmt = v => (+v).toFixed(2).replace(/\.?0+$/, '')) {
  const out = h('span', { class: 'val' }, fmt(value));
  const inp = h('input', { type: 'range', min, max, step, value });
  inp.addEventListener('input', () => { out.textContent = fmt(inp.value); on(+inp.value); });
  parent.append(h('label', { class: 'ctl' }, h('span', { class: 'lab' }, label, out), inp));
  return { inp, set: v => { inp.value = v; out.textContent = fmt(v); } };
}
function select(parent, label, options, on, value) {
  const s = h('select', {}); options.forEach(([v, t]) => s.append(h('option', { value: v }, t)));
  if (value !== undefined) s.value = value;
  s.addEventListener('change', () => on(s.value));
  parent.append(h('label', { class: 'ctl' }, h('span', { class: 'lab' }, label), s));
  return s;
}
function button(parent, text, on, cls = 'btn small') { const b = h('button', { class: cls, onclick: on }, text); parent.append(b); return b; }
function check(parent, label, value, on) {
  const c = h('input', { type: 'checkbox' }); c.checked = value; c.addEventListener('change', () => on(c.checked));
  parent.append(h('label', { class: 'ctl chk' }, c, h('span', {}, label))); return c;
}
function setRead(read, html) { if (read._last === html) return; read._last = html; read.innerHTML = html; if (window.renderMath) window.renderMath(read); }

// Responsive canvas with a world-coordinate plotter
function makeCanvas(stage, aspect = 1) {
  const cv = h('canvas'); stage.append(cv);
  const ctx = cv.getContext('2d');
  const P = { cv, ctx, w: 0, h: 0, xmin: -5, xmax: 5, ymin: -5, ymax: 5, onresize: null };
  P.fit = () => {
    const w = stage.clientWidth || 600, hh = Math.min(w / aspect, window.innerHeight * 0.72), dpr = window.devicePixelRatio || 1;
    cv.style.width = w + 'px'; cv.style.height = hh + 'px'; cv.width = Math.round(w * dpr); cv.height = Math.round(hh * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); P.w = w; P.h = hh; if (P.onresize) P.onresize();
  };
  P.view = (cx, cy, halfW) => { const halfH = halfW * P.h / P.w; P.xmin = cx - halfW; P.xmax = cx + halfW; P.ymin = cy - halfH; P.ymax = cy + halfH; };
  P.X = x => (x - P.xmin) / (P.xmax - P.xmin) * P.w;
  P.Y = y => P.h - (y - P.ymin) / (P.ymax - P.ymin) * P.h;
  P.ix = px => P.xmin + px / P.w * (P.xmax - P.xmin);
  P.iy = py => P.ymin + (P.h - py) / P.h * (P.ymax - P.ymin);
  P.clear = () => { ctx.fillStyle = COL().bg; ctx.fillRect(0, 0, P.w, P.h); };
  P.grid = (step = 1, labels = true, lx = '', ly = '') => {
    const C = COL(); ctx.lineWidth = 1; ctx.strokeStyle = C.grid; ctx.beginPath();
    for (let x = Math.ceil(P.xmin / step) * step; x <= P.xmax; x += step) { ctx.moveTo(P.X(x), 0); ctx.lineTo(P.X(x), P.h); }
    for (let y = Math.ceil(P.ymin / step) * step; y <= P.ymax; y += step) { ctx.moveTo(0, P.Y(y)); ctx.lineTo(P.w, P.Y(y)); }
    ctx.stroke(); ctx.strokeStyle = C.axis; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(P.X(0), 0); ctx.lineTo(P.X(0), P.h); ctx.moveTo(0, P.Y(0)); ctx.lineTo(P.w, P.Y(0)); ctx.stroke();
    if (labels) {
      ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center';
      const skip = Math.max(1, Math.round(40 / (P.X(step) - P.X(0))));
      for (let x = Math.ceil(P.xmin / step) * step, i = 0; x <= P.xmax; x += step, i++) if (Math.abs(x) > 1e-9 && Math.round(x / step) % skip === 0) ctx.fillText(+x.toFixed(2), P.X(x), Math.min(P.h - 4, Math.max(12, P.Y(0) + 14)));
      ctx.textAlign = 'right';
      for (let y = Math.ceil(P.ymin / step) * step; y <= P.ymax; y += step) if (Math.abs(y) > 1e-9 && Math.round(y / step) % skip === 0) ctx.fillText(+y.toFixed(2), Math.max(24, Math.min(P.w - 4, P.X(0) - 5)), P.Y(y) + 4);
      ctx.textAlign = 'left'; if (lx) ctx.fillText(lx, P.w - 20, P.Y(0) - 6); if (ly) ctx.fillText(ly, P.X(0) + 6, 14);
    }
  };
  P.line = (x1, y1, x2, y2, col, w = 2, dash) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.moveTo(P.X(x1), P.Y(y1)); ctx.lineTo(P.X(x2), P.Y(y2)); ctx.stroke(); ctx.setLineDash([]); };
  P.arrow = (x1, y1, x2, y2, col, w = 2.5) => {
    P.line(x1, y1, x2, y2, col, w); const a = Math.atan2(P.Y(y2) - P.Y(y1), P.X(x2) - P.X(x1)), X = P.X(x2), Y = P.Y(y2);
    ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X - 10 * Math.cos(a - 0.4), Y - 10 * Math.sin(a - 0.4)); ctx.lineTo(X - 10 * Math.cos(a + 0.4), Y - 10 * Math.sin(a + 0.4)); ctx.fill();
  };
  P.dot = (x, y, col, r = 5) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(P.X(x), P.Y(y), r, 0, 7); ctx.fill(); };
  P.text = (s, x, y, col, dx = 8, dy = -8, font = '13px system-ui, sans-serif') => { ctx.fillStyle = col; ctx.font = font; ctx.textAlign = 'left'; ctx.fillText(s, P.X(x) + dx, P.Y(y) + dy); };
  P.curve = (f, col, w = 2.5, a = P.xmin, b = P.xmax, n = 600) => {
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); let pen = false;
    for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, y = f(x); if (!isFinite(y) || Math.abs(y) > 1e6) { pen = false; continue; } const py = P.Y(y); if (pen) ctx.lineTo(P.X(x), py); else ctx.moveTo(P.X(x), py); pen = true; }
    ctx.stroke();
  };
  P.param = (fx, fy, t0, t1, col, w = 2.5, n = 800, fill) => {
    ctx.beginPath(); let pen = false;
    for (let i = 0; i <= n; i++) { const t = t0 + (t1 - t0) * i / n, x = fx(t), y = fy(t); if (!isFinite(x) || !isFinite(y)) { pen = false; continue; } if (pen) ctx.lineTo(P.X(x), P.Y(y)); else ctx.moveTo(P.X(x), P.Y(y)); pen = true; }
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (col) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); }
  };
  P.circle = (cx, cy, r, col, w = 2, dash) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.arc(P.X(cx), P.Y(cy), Math.abs(P.X(r) - P.X(0)), 0, 7); ctx.stroke(); ctx.setLineDash([]); };
  // Draggable points
  P.handles = [];
  let drag = null;
  const pos = e => { const r = cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; };
  const down = e => { const [px, py] = pos(e); drag = P.handles.find(hd => Math.hypot(P.X(hd.get()[0]) - px, P.Y(hd.get()[1]) - py) < 18) || null; if (!drag && P.onclick) P.onclick(P.ix(px), P.iy(py)); if (drag) e.preventDefault(); };
  const move = e => { if (!drag) return; e.preventDefault(); const [px, py] = pos(e); let x = P.ix(px), y = P.iy(py); if (drag.snap) { x = Math.round(x / drag.snap) * drag.snap; y = Math.round(y / drag.snap) * drag.snap; } drag.set(x, y); };
  const up = () => { drag = null; };
  cv.addEventListener('mousedown', down); cv.addEventListener('touchstart', down, { passive: false });
  window.addEventListener('mousemove', move); window.addEventListener('touchmove', move, { passive: false });
  window.addEventListener('mouseup', up); window.addEventListener('touchend', up);
  const ro = new ResizeObserver(() => P.fit()); ro.observe(stage);
  P.destroy = () => { ro.disconnect(); window.removeEventListener('mousemove', move); window.removeEventListener('touchmove', move); window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
  P.fit();
  return P;
}
const f3 = x => (Math.abs(x) < 5e-4 ? 0 : +x.toFixed(3));
const cstr = (x, y) => `${f3(x)} ${y < 0 ? '-' : '+'} ${f3(Math.abs(y))}i`;
const loop = fn => { let id, alive = true; const step = t => { if (!alive) return; fn(t); id = requestAnimationFrame(step); }; id = requestAnimationFrame(step); return () => { alive = false; cancelAnimationFrame(id); }; };

const SIMS = {};

/* ---------- Argand: multiply / divide ---------- */
SIMS.argand = {
  title: 'Argand diagram: multiplication as rotation + scaling', desc: 'Drag z and w. Watch moduli multiply and arguments add.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let z = [2, 1], w = [1, 1.5], op = 'mul';
    select(S.ctrls, 'Operation', [['mul', 'z × w'], ['div', 'z ÷ w'], ['conj', 'z* (conjugate)'], ['pow', 'z² and z³']], v => { op = v; draw(); });
    P.handles = [{ get: () => z, set: (x, y) => { z = [x, y]; draw(); }, snap: 0.25 }, { get: () => w, set: (x, y) => { w = [x, y]; draw(); }, snap: 0.25 }];
    const arc = (r, t, col) => { const c = P.ctx; c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.arc(P.X(0), P.Y(0), r, 0, -t, t > 0); c.stroke(); };
    function draw() {
      const C = COL(); P.view(0, 0, 6); P.clear(); P.grid(1, true, 'Re', 'Im');
      const mz = Math.hypot(...z), az = Math.atan2(z[1], z[0]), mw = Math.hypot(...w), aw = Math.atan2(w[1], w[0]);
      let r, lab, extra = '';
      if (op === 'mul') { r = [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]; lab = 'zw'; }
      else if (op === 'div') { const d = w[0] ** 2 + w[1] ** 2; r = [(z[0] * w[0] + z[1] * w[1]) / d, (z[1] * w[0] - z[0] * w[1]) / d]; lab = 'z/w'; }
      else if (op === 'conj') { r = [z[0], -z[1]]; lab = 'z*'; }
      else { r = [z[0] ** 2 - z[1] ** 2, 2 * z[0] * z[1]]; lab = 'z²'; const r3 = [r[0] * z[0] - r[1] * z[1], r[0] * z[1] + r[1] * z[0]]; P.arrow(0, 0, r3[0], r3[1], C.d); P.text('z³', r3[0], r3[1], C.d); extra = `<p>$z^3=${cstr(...r3)}$, $|z^3|=${f3(mz ** 3)}$</p>`; }
      arc(28, az, C.a); if (op === 'mul' || op === 'div') arc(40, aw, C.b);
      P.arrow(0, 0, z[0], z[1], C.a); P.dot(z[0], z[1], C.a, 7); P.text('z', z[0], z[1], C.a);
      if (op === 'mul' || op === 'div') { P.arrow(0, 0, w[0], w[1], C.b); P.dot(w[0], w[1], C.b, 7); P.text('w', w[0], w[1], C.b); }
      P.arrow(0, 0, r[0], r[1], C.c, 3); P.text(lab, r[0], r[1], C.c, 8, -8, 'bold 14px system-ui');
      const ar = Math.atan2(r[1], r[0]);
      setRead(S.read, `<p>$z=${cstr(...z)}$<br>$|z|=${f3(mz)},\\ \\arg z=${f3(az)}$</p>` + (op === 'mul' || op === 'div' ? `<p>$w=${cstr(...w)}$<br>$|w|=${f3(mw)},\\ \\arg w=${f3(aw)}$</p>` : '') +
        `<p class="hl">$${lab}=${cstr(...r)}$<br>$|${lab}|=${f3(Math.hypot(...r))}$, $\\arg=${f3(ar)}$</p>` + extra +
        (op === 'mul' ? `<p class="muted">Check: $|z||w|=${f3(mz * mw)}$, $\\arg z+\\arg w=${f3(az + aw)}$${Math.abs(az + aw - ar) > 1e-6 ? ' (then subtract $2\\pi$)' : ''}.</p>` : '') +
        (op === 'div' ? `<p class="muted">Check: $|z|/|w|=${f3(mz / mw)}$, $\\arg z-\\arg w=${f3(az - aw)}$.</p>` : '') + '<p class="muted">Drag the dots (snaps to 0.25).</p>');
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- De Moivre spiral ---------- */
SIMS.demoivre = {
  title: "De Moivre: powers of z spiral", desc: 'Powers z⁰, z¹, … zⁿ. |z|>1 spirals out, |z|<1 spirals in, |z|=1 walks the unit circle.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let r = 1.1, th = Math.PI / 6, n = 8;
    slider(S.ctrls, 'Modulus r', 0.7, 1.3, 0.01, r, v => { r = v; draw(); });
    slider(S.ctrls, 'Argument θ (×π)', -1, 1, 1 / 24, th / Math.PI, v => { th = v * Math.PI; draw(); }, v => (+v).toFixed(3));
    slider(S.ctrls, 'Highest power n', 1, 24, 1, n, v => { n = v; draw(); }, v => v);
    function draw() {
      const C = COL(); const R = Math.max(1.3, r ** n * 1.15); P.view(0, 0, R * 1.1); P.clear(); P.grid(R > 3 ? 1 : 0.5, true, 'Re', 'Im'); P.circle(0, 0, 1, C.axis, 1, [4, 4]);
      const ctx = P.ctx; ctx.strokeStyle = C.fill; ctx.lineWidth = 1.5; ctx.beginPath();
      for (let k = 0; k <= n * 20; k++) { const t = k / 20, rr = r ** t; const x = rr * Math.cos(th * t), y = rr * Math.sin(th * t); k ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)); }
      ctx.stroke();
      for (let k = 0; k <= n; k++) { const rr = r ** k, x = rr * Math.cos(th * k), y = rr * Math.sin(th * k); P.line(0, 0, x, y, k === n ? C.c : C.grid, k === n ? 2.5 : 1); P.dot(x, y, k === n ? C.c : C.a, k === n ? 6 : 4); if (n <= 12 || k === n) P.text(`z${k === 0 ? '⁰' : k === 1 ? '' : '^' + k}`, x, y, C.text, 5, -5, '11px system-ui'); }
      const rn = r ** n, an = th * n; let ap = ((an + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; if (ap === -Math.PI) ap = Math.PI;
      setRead(S.read, `<p>$z=${f3(r)}\\,e^{${f3(th)}i}$</p><p class="hl">$z^{${n}}=${f3(r)}^{${n}}e^{${n}\\times${f3(th)}i}$<br>$=${f3(rn)}\\,e^{${f3(ap)}i}$<br>$=${cstr(rn * Math.cos(an), rn * Math.sin(an))}$</p><p class="muted">Set θ = π/6 and n = 12 to see z¹² return to the positive real axis.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- nth roots ---------- */
SIMS.roots = {
  title: 'nth roots: the regular polygon', desc: 'Roots of zⁿ = w are equally spaced on a circle of radius |w|^(1/n).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let n = 5, R = 8, phi = Math.PI / 3, spin = false, t0 = 0;
    slider(S.ctrls, 'n', 2, 12, 1, n, v => { n = v; draw(); }, v => v);
    slider(S.ctrls, '|w|', 1, 32, 1, R, v => { R = v; draw(); }, v => v);
    const ps = slider(S.ctrls, 'arg w (×π)', -1, 1, 1 / 12, phi / Math.PI, v => { phi = v * Math.PI; draw(); }, v => (+v).toFixed(3));
    check(S.ctrls, 'Animate arg w (watch the roots rotate n× slower)', false, v => { spin = v; });
    let showW = true; check(S.ctrls, 'Show w', true, v => { showW = v; draw(); });
    function draw() {
      const C = COL(), rr = Math.pow(R, 1 / n), lim = Math.max(rr, showW ? R : 0) * 1.2; P.view(0, 0, lim); P.clear(); P.grid(lim > 12 ? 4 : lim > 4 ? 1 : 0.5, true, 'Re', 'Im');
      P.circle(0, 0, rr, C.axis, 1.2, [5, 5]);
      const pts = []; for (let k = 0; k < n; k++) { const a = (phi + 2 * Math.PI * k) / n; pts.push([rr * Math.cos(a), rr * Math.sin(a), a]); }
      const ctx = P.ctx; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1]))); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); ctx.strokeStyle = C.a; ctx.lineWidth = 2; ctx.stroke();
      pts.forEach((p, k) => { P.line(0, 0, p[0], p[1], C.grid, 1); P.dot(p[0], p[1], k === 0 ? C.c : C.a, 6); P.text('z' + k, p[0], p[1], C.text, 6, -6, '12px system-ui'); });
      if (showW) { P.arrow(0, 0, R * Math.cos(phi), R * Math.sin(phi), C.b); P.text('w', R * Math.cos(phi), R * Math.sin(phi), C.b); }
      const pr = a => { let v = ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return f3(v === -Math.PI ? Math.PI : v); };
      setRead(S.read, `<p>$z^{${n}}=${R}e^{${f3(phi)}i}$</p><p class="hl">Modulus $=${R}^{1/${n}}=${f3(rr)}$<br>Spacing $=\\frac{2\\pi}{${n}}=${f3(2 * Math.PI / n)}$</p><p>Arguments (principal):<br>${pts.map(p => pr(p[2])).join(', ')}</p><p class="muted">Sum of roots $=0$ (centroid at $O$). Product $=${n % 2 ? '' : '-'}w$.</p>`);
    }
    const stop = loop(t => { if (!spin) { t0 = t; return; } phi += (t - t0) / 2000; t0 = t; if (phi > Math.PI) phi -= 2 * Math.PI; ps.set(phi / Math.PI); draw(); });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- Loci ---------- */
SIMS.loci = {
  title: 'Loci explorer', desc: 'Drag a and b. Shaded region shows the inequality, the bright curve the equality.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let type = 'circle', a = [1, 1], b = [-2, -1], r = 2, k = 2, th = Math.PI / 4, ineq = '=';
    select(S.ctrls, 'Locus', [['circle', '|z − a| = r'], ['bis', '|z − a| = |z − b|'], ['arg', 'arg(z − a) = θ'], ['apol', '|z − a| = k|z − b|'], ['arc', 'arg((z − a)/(z − b)) = θ']], v => { type = v; draw(); });
    select(S.ctrls, 'Relation', [['=', '='], ['<', '< (shade inside)'], ['>', '> (shade outside)']], v => { ineq = v; draw(); });
    slider(S.ctrls, 'r', 0.5, 5, 0.1, r, v => { r = v; draw(); });
    slider(S.ctrls, 'k', 0.2, 4, 0.1, k, v => { k = v; draw(); });
    slider(S.ctrls, 'θ (×π)', -1, 1, 1 / 12, th / Math.PI, v => { th = v * Math.PI; draw(); }, v => (+v).toFixed(3));
    P.handles = [{ get: () => a, set: (x, y) => { a = [x, y]; draw(); }, snap: 0.5 }, { get: () => b, set: (x, y) => { b = [x, y]; draw(); }, snap: 0.5 }];
    const wrap = v => Math.atan2(Math.sin(v), Math.cos(v));
    function F(x, y) {
      const da = Math.hypot(x - a[0], y - a[1]), db = Math.hypot(x - b[0], y - b[1]);
      if (type === 'circle') return da - r;
      if (type === 'bis') return da - db;
      if (type === 'apol') return da - k * db;
      if (type === 'arg') return wrap(Math.atan2(y - a[1], x - a[0]) - th);
      const u = [x - a[0], y - a[1]], v = [x - b[0], y - b[1]]; // arg((z-a)/(z-b))
      return wrap(Math.atan2(u[1] * v[0] - u[0] * v[1], u[0] * v[0] + u[1] * v[1]) - th);
    }
    function draw() {
      const C = COL(); P.view(0, 0, 6); P.clear(); P.grid(1, true, 'Re', 'Im');
      const ctx = P.ctx, step = 2, cols = Math.ceil(P.w / step), rows = Math.ceil(P.h / step), g = [];
      for (let j = 0; j <= rows; j++) { g.push([]); for (let i = 0; i <= cols; i++) g[j].push(F(P.ix(i * step), P.iy(j * step))); }
      const angular = type === 'arg' || type === 'arc';
      ctx.fillStyle = C.fill;
      if (ineq !== '=') for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const v = g[j][i]; if ((ineq === '<' && v < 0) || (ineq === '>' && v > 0)) ctx.fillRect(i * step, j * step, step, step); }
      ctx.fillStyle = C.c;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const v = g[j][i], R = g[j][i + 1], D = g[j + 1][i];
        const cross = (p, q) => Math.sign(p) !== Math.sign(q) && (!angular || Math.abs(p - q) < 1);
        if (cross(v, R) || cross(v, D)) ctx.fillRect(i * step - 0.5, j * step - 0.5, step + 1, step + 1);
      }
      P.dot(a[0], a[1], C.a, 7); P.text('a', a[0], a[1], C.a);
      if (type !== 'circle' && type !== 'arg') { P.dot(b[0], b[1], C.b, 7); P.text('b', b[0], b[1], C.b); }
      const as = cstr(...a), bs = cstr(...b);
      let info = '';
      if (type === 'circle') info = `Circle centre $${as}$, radius $${r}$.`;
      if (type === 'bis') info = `Perpendicular bisector of $a$ and $b$.`;
      if (type === 'arg') info = `Half-line from $a$ at angle $${f3(th)}$ (a itself excluded).`;
      if (type === 'apol') { if (Math.abs(k - 1) < 1e-9) info = 'k = 1: perpendicular bisector.'; else { const k2 = k * k, cx = (a[0] - k2 * b[0]) / (1 - k2), cy = (a[1] - k2 * b[1]) / (1 - k2), rad = k * Math.hypot(a[0] - b[0], a[1] - b[1]) / Math.abs(1 - k2); info = `Circle of Apollonius: centre $${cstr(cx, cy)}$, radius $${f3(rad)}$.`; } }
      if (type === 'arc') info = `Arc of a circle through $a$ and $b$ — the angle subtended by $ab$ is constant (circle theorem).`;
      setRead(S.read, `<p>$a=${as}$${type !== 'circle' && type !== 'arg' ? `, $b=${bs}$` : ''}</p><p class="hl">${info}</p><p class="muted">Drag a, b. Use the sliders relevant to the chosen locus.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- 2x2 matrix transformation & eigenvectors ---------- */
SIMS.matrix2 = {
  title: '2×2 transformations & eigenvectors', desc: 'The probe vector v spins; Av follows. When they line up, v is an eigenvector.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let m = [[2, 1], [1, 2]], ang = 0, spin = true, grid = true;
    const sl = [];
    [['a', 0, 0], ['b', 0, 1], ['c', 1, 0], ['d', 1, 1]].forEach(([l, i, j]) => sl.push(slider(S.ctrls, l, -3, 3, 0.1, m[i][j], v => { m[i][j] = v; }, v => (+v).toFixed(1))));
    select(S.ctrls, 'Preset', [['', '—'], ['2,1,1,2', 'Symmetric (orthogonal eigenvectors)'], ['3,1,0,2', 'Upper triangular'], ['0,-1,1,0', 'Rotation 90° (no real eigenvectors)'], ['1,1,0,1', 'Shear (one eigenvector)'], ['2,0,0,2', 'Enlargement (every vector)'], ['1,2,2,4', 'Singular (det 0)'], ['1,0,0,-1', 'Reflection in x-axis']], v => { if (!v) return; const q = v.split(',').map(Number); m = [[q[0], q[1]], [q[2], q[3]]]; sl[0].set(q[0]); sl[1].set(q[1]); sl[2].set(q[2]); sl[3].set(q[3]); });
    check(S.ctrls, 'Spin probe vector', true, v => spin = v);
    check(S.ctrls, 'Show transformed grid', true, v => grid = v);
    function eig() {
      const t = m[0][0] + m[1][1], d = m[0][0] * m[1][1] - m[0][1] * m[1][0], D = t * t - 4 * d;
      if (D < -1e-9) return { t, d, D, l: [] };
      const s = Math.sqrt(Math.max(0, D)), ls = D < 1e-9 ? [t / 2] : [(t + s) / 2, (t - s) / 2];
      return { t, d, D, l: ls.map(l => { let v = Math.abs(m[0][1]) > 1e-9 ? [m[0][1], l - m[0][0]] : Math.abs(m[1][0]) > 1e-9 ? [l - m[1][1], m[1][0]] : null; if (!v) v = Math.abs(m[0][0] - m[1][1]) < 1e-9 ? null : Math.abs(l - m[0][0]) < 1e-9 ? [1, 0] : [0, 1]; return { l, v }; }) };
    }
    function draw() {
      const C = COL(); P.view(0, 0, 5); P.clear(); P.grid(1, true);
      const ctx = P.ctx, T = (x, y) => [m[0][0] * x + m[0][1] * y, m[1][0] * x + m[1][1] * y];
      if (grid) { ctx.strokeStyle = C.fill; ctx.lineWidth = 1.2; for (let s = -6; s <= 6; s++) { let p = T(s, -6), q = T(s, 6); P.line(p[0], p[1], q[0], q[1], C.fill, 1.2); p = T(-6, s); q = T(6, s); P.line(p[0], p[1], q[0], q[1], C.fill, 1.2); } }
      const sq = [[0, 0], [1, 0], [1, 1], [0, 1]].map(p => T(...p)); ctx.beginPath(); sq.forEach((p, i) => i ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1]))); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); ctx.strokeStyle = C.d; ctx.lineWidth = 2; ctx.stroke();
      const E = eig();
      E.l.forEach(e => { if (!e.v) { return; } const n = Math.hypot(...e.v) || 1, u = [e.v[0] / n, e.v[1] / n]; P.line(-8 * u[0], -8 * u[1], 8 * u[0], 8 * u[1], C.c, 1.5, [6, 5]); });
      const v = [2 * Math.cos(ang), 2 * Math.sin(ang)], Av = T(...v);
      const cr = Math.abs(v[0] * Av[1] - v[1] * Av[0]) / (Math.hypot(...v) * (Math.hypot(...Av) || 1));
      P.arrow(0, 0, v[0], v[1], C.a); P.text('v', v[0], v[1], C.a);
      P.arrow(0, 0, Av[0], Av[1], cr < 0.03 ? C.c : C.b, 3); P.text('Av', Av[0], Av[1], cr < 0.03 ? C.c : C.b);
      const eigTxt = E.D < -1e-9 ? `Complex eigenvalues $${f3(E.t / 2)}\\pm${f3(Math.sqrt(-E.D) / 2)}i$ — no real eigenvectors (a rotation component).` :
        E.l.map(e => `$\\lambda=${f3(e.l)}$` + (e.v ? `, $\\mathbf v\\propto(${f3(e.v[0])},\\,${f3(e.v[1])})$` : ', every vector (diagonal matrix)')).join('<br>');
      setRead(S.read, `<p>$\\mathbf A=\\begin{pmatrix}${f3(m[0][0])}&${f3(m[0][1])}\\\\${f3(m[1][0])}&${f3(m[1][1])}\\end{pmatrix}$</p><p>$\\operatorname{tr}=${f3(E.t)}$, $\\det=${f3(E.d)}$ (area scale of the orange square)</p><p>$\\lambda^2-${f3(E.t)}\\lambda+${f3(E.d)}=0$</p><p class="hl">${eigTxt}</p><p class="muted">Dashed lines = eigen-directions. Av turns gold when parallel to v.</p>`);
    }
    let last = 0, lastKey = '';
    const stop = loop(t => { if (spin) ang += (t - last) / 1600; last = t; const key = JSON.stringify(m) + ang.toFixed(3); if (key !== lastKey) { lastKey = key; draw(); } });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- 3D: planes, lines ---------- */
SIMS.space3d = {
  title: '3D: lines & planes', desc: 'Drag to rotate. Generate random configurations and read off the key vectors.',
  mount(el, opt = 'lineplane') {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let yaw = 0.7, pitch = 0.45, mode = opt, cfg = null, kind = 'point';
    select(S.ctrls, 'Scene', [['lineplane', 'Line meets plane'], ['planes', 'Three planes'], ['skew', 'Skew lines + common perpendicular']], v => { mode = v; gen(); }, mode);
    const ksel = select(S.ctrls, 'Three-plane case', [['point', 'Unique point'], ['sheaf', 'Sheaf (common line)'], ['prism', 'Triangular prism'], ['parallel', 'Parallel planes']], v => { kind = v; gen(); });
    button(S.ctrls, '🎲 New random example', () => gen());
    let auto = true; check(S.ctrls, 'Auto-rotate', true, v => auto = v);
    const proj = p => { const [x, y, z] = p, cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch); const X = x * cy - y * sy, Y0 = x * sy + y * cy; return [X, z * cp - Y0 * sp]; };
    const L3 = (a, b, col, w = 2, dash) => { const p = proj(a), q = proj(b); P.line(p[0], p[1], q[0], q[1], col, w, dash); };
    const D3 = (a, col, r = 5) => { const p = proj(a); P.dot(p[0], p[1], col, r); };
    const T3 = (s, a, col) => { const p = proj(a); P.text(s, p[0], p[1], col); };
    function planePatch(n, d, col, centre) {
      const nn = V.norm(n), u0 = Math.abs(n[0]) < 0.9 * nn ? [1, 0, 0] : [0, 1, 0], u = V.cross(n, u0), v = V.cross(n, u), un = V.mul(u, 1 / V.norm(u)), vn = V.mul(v, 1 / V.norm(v));
      let c = V.mul(n, d / (nn * nn)); if (centre) { const t = (d - V.dot(n, centre)) / (nn * nn); c = V.add(centre, V.mul(n, t)); }
      const s = 4, corners = [[-s, -s], [s, -s], [s, s], [-s, s]].map(([a, b]) => V.add(c, V.add(V.mul(un, a), V.mul(vn, b))));
      const ctx = P.ctx; ctx.beginPath(); corners.forEach((q, i) => { const p = proj(q); i ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1])); }); ctx.closePath();
      ctx.globalAlpha = 0.22; ctx.fillStyle = col; ctx.fill(); ctx.globalAlpha = 0.9; ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.stroke(); ctx.globalAlpha = 1;
      for (let i = -s + 2; i < s; i += 2) { L3(V.add(c, V.add(V.mul(un, i), V.mul(vn, -s))), V.add(c, V.add(V.mul(un, i), V.mul(vn, s))), col, 0.6); L3(V.add(c, V.add(V.mul(vn, i), V.mul(un, -s))), V.add(c, V.add(V.mul(vn, i), V.mul(un, s))), col, 0.6); }
      return c;
    }
    const eqS = (n, d) => `${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])}=${d}`;
    function gen() {
      ksel.parentElement.style.display = mode === 'planes' ? '' : 'none';
      if (mode === 'lineplane') {
        let Pp = V.rnd(-2, 2), d, n; do { d = V.rnd(-2, 2); n = V.rnd(-2, 2); } while (V.isZero(d) || V.isZero(n) || V.dot(d, n) === 0);
        const t0 = rnz(-2, 2); cfg = { P: Pp, d, n, a: V.sub(Pp, V.mul(d, t0)), p: V.dot(n, Pp), t0 };
      } else if (mode === 'skew') {
        let a, b, d1, d2, c; do { a = V.rnd(-2, 2); b = V.rnd(-2, 2); d1 = V.rnd(-2, 2); d2 = V.rnd(-2, 2); c = V.cross(d1, d2); } while (V.isZero(c) || Math.abs(V.dot(V.sub(b, a), c)) < 1);
        // closest points: solve for s,t minimising |a+s d1 - b - t d2|
        const w = V.sub(a, b), A = V.dot(d1, d1), B = V.dot(d1, d2), Cc = V.dot(d2, d2), D = V.dot(d1, w), E = V.dot(d2, w), den = A * Cc - B * B;
        const s = (B * E - Cc * D) / den, t = (A * E - B * D) / den;
        cfg = { a, b, d1, d2, c, P1: V.add(a, V.mul(d1, s)), P2: V.add(b, V.mul(d2, t)), dist: Math.abs(V.dot(V.sub(b, a), c)) / V.norm(c) };
      } else {
        let n1, n2, n3, d1 = ri(-3, 3), d2 = ri(-3, 3), d3; do { n1 = V.rnd(-2, 2); n2 = V.rnd(-2, 2); } while (V.isZero(V.cross(n1, n2)));
        const a = rnz(-1, 1), b = rnz(-1, 1);
        if (kind === 'point') { do n3 = V.rnd(-2, 2); while (M.det3([n1, n2, n3]) === 0); d3 = ri(-3, 3); }
        else if (kind === 'parallel') { n3 = n1.slice(); d3 = d1 + pick([-3, 3]); }
        else { n3 = V.add(V.mul(n1, a), V.mul(n2, b)); d3 = a * d1 + b * d2 + (kind === 'prism' ? pick([-3, 3]) : 0); }
        cfg = { ns: [n1, n2, n3], ds: [d1, d2, d3], det: M.det3([n1, n2, n3]) };
      }
      draw();
    }
    function draw() {
      if (!cfg) return;
      const C = COL(); P.view(0, 0, 7); P.clear();
      const ax = [[[1, 0, 0], 'x'], [[0, 1, 0], 'y'], [[0, 0, 1], 'z']];
      ax.forEach(([u, l]) => { L3(V.mul(u, -5), V.mul(u, 5), C.axis, 1); T3(l, V.mul(u, 5.3), C.text); });
      let html = '';
      if (mode === 'lineplane') {
        const { P: Pp, d, n, a, p, t0 } = cfg; planePatch(n, p, C.b, Pp);
        L3(V.sub(Pp, V.mul(d, 3)), V.add(Pp, V.mul(d, 3)), C.a, 2.5); D3(a, C.a, 4); T3('A', a, C.a); D3(Pp, C.c, 7); T3('P', Pp, C.c);
        const nn = V.mul(n, 1.6 / V.norm(n)); L3(Pp, V.add(Pp, nn), C.d, 2.5); T3('n', V.add(Pp, nn), C.d);
        const th = Math.asin(Math.min(1, Math.abs(V.dot(d, n)) / (V.norm(d) * V.norm(n)))) * 180 / Math.PI;
        html = `<p>Line $\\mathbf r=${V.row(a)}+\\lambda${V.row(d)}$</p><p>Plane $${eqS(n, p)}$</p><p class="hl">$\\lambda=${t0}$ → $P${V.row(Pp)}$<br>Angle line–plane $=${f3(th)}^\\circ$</p>`;
      } else if (mode === 'skew') {
        const { a, b, d1, d2, P1, P2, dist, c } = cfg;
        L3(V.sub(a, V.mul(d1, 3)), V.add(a, V.mul(d1, 3)), C.a, 2.5); L3(V.sub(b, V.mul(d2, 3)), V.add(b, V.mul(d2, 3)), C.b, 2.5);
        L3(P1, P2, C.c, 3, [5, 4]); D3(P1, C.c); D3(P2, C.c);
        html = `<p>$L_1:\\ ${V.row(a)}+\\lambda${V.row(d1)}$<br>$L_2:\\ ${V.row(b)}+\\mu${V.row(d2)}$</p><p>$\\mathbf d_1\\times\\mathbf d_2=${V.row(c)}$</p><p class="hl">Shortest distance $=${f3(dist)}$<br>(gold segment is ⟂ to both lines)</p>`;
      } else {
        const cols = [C.a, C.b, C.d]; cfg.ns.forEach((n, i) => planePatch(n, cfg.ds[i], cols[i]));
        if (Math.abs(cfg.det) > 0) { const sol = [0, 1, 2].map(j => { const Mx = cfg.ns.map((r, i) => r.map((x, k) => k === j ? cfg.ds[i] : x)); return M.det3(Mx) / cfg.det; }); D3(sol, C.c, 7); html = `<p class="hl">$\\det=${cfg.det}\\ne0$: unique point $(${sol.map(f3).join(',')})$</p>`; }
        else html = `<p class="hl">$\\det=0$: ${kind === 'sheaf' ? 'consistent → <b>sheaf</b> (common line)' : kind === 'prism' ? 'inconsistent, no parallel normals → <b>prism</b>' : 'parallel normals, different constants → <b>no solution</b>'}</p>`;
        html = `<p>${cfg.ns.map((n, i) => `$${eqS(n, cfg.ds[i])}$`).join('<br>')}</p>` + html;
      }
      setRead(S.read, html + '<p class="muted">Drag the canvas to rotate.</p>');
    }
    let dragging = false, lx = 0, ly = 0;
    const dn = e => { const t = e.touches ? e.touches[0] : e; dragging = true; lx = t.clientX; ly = t.clientY; };
    const mv = e => { if (!dragging) return; const t = e.touches ? e.touches[0] : e; yaw += (t.clientX - lx) / 150; pitch = Math.max(-1.5, Math.min(1.5, pitch + (t.clientY - ly) / 150)); lx = t.clientX; ly = t.clientY; e.preventDefault(); drawOnly(); };
    const upH = () => { dragging = false; };
    P.cv.addEventListener('mousedown', dn); P.cv.addEventListener('touchstart', dn, { passive: true });
    P.cv.addEventListener('mousemove', mv); P.cv.addEventListener('touchmove', mv, { passive: false }); window.addEventListener('mouseup', upH); window.addEventListener('touchend', upH);
    let pend = false; const drawOnly = () => { if (pend) return; pend = true; requestAnimationFrame(() => { pend = false; drawQuick(); }); };
    const drawQuick = () => draw();
    let lt = 0; const stop = loop(t => { if (auto && !dragging) { yaw += (t - lt) / 6000; draw(); } lt = t; });
    P.onresize = draw; gen();
    return () => { stop(); P.destroy(); window.removeEventListener('mouseup', upH); window.removeEventListener('touchend', upH); };
  },
};

/* ---------- Hyperbola / hyperbolic functions ---------- */
SIMS.hyperbola = {
  title: 'cosh & sinh from the unit hyperbola', desc: 'Point (cosh t, sinh t) on x² − y² = 1. The shaded sector has area t/2 — exactly like a circle sector.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 2.1);
    let t = 1, inv = false;
    slider(S.ctrls, 't', -2.5, 2.5, 0.01, t, v => { t = v; draw(); });
    check(S.ctrls, 'Right panel: show inverse functions (reflect in y = x)', false, v => { inv = v; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear();
      // left half: hyperbola; right half: graphs. Use two viewports via clipping.
      const W = P.w, H = P.h;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W / 2, H); ctx.clip();
      const setV = (x0, x1, y0, y1) => { P.xmin = x0; P.xmax = x1; P.ymin = y0; P.ymax = y1; };
      const oldX = P.X; P.X = x => (x - P.xmin) / (P.xmax - P.xmin) * (W / 2);
      setV(-1.5, 7, -(8.5 / 2) * H / (W / 2) * 1, (8.5 / 2) * H / (W / 2));
      P.grid(1, true, 'x', 'y');
      P.circle(0, 0, 1, C.axis, 1, [4, 4]);
      P.line(-6, -6, 6, 6, C.grid, 1, [3, 3]); P.line(-6, 6, 6, -6, C.grid, 1, [3, 3]);
      const ch = Math.cosh(t), sh = Math.sinh(t);
      ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); for (let i = 0; i <= 100; i++) { const u = t * i / 100; ctx.lineTo(P.X(Math.cosh(u)), P.Y(Math.sinh(u))); } ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      P.param(u => Math.cosh(u), u => Math.sinh(u), -3, 3, C.a, 2.5);
      P.line(0, 0, ch, sh, C.c, 2); P.line(ch, 0, ch, sh, C.b, 2, [4, 3]); P.line(0, sh, ch, sh, C.d, 1.5, [4, 3]);
      P.dot(ch, sh, C.c, 6); P.text('(cosh t, sinh t)', ch, sh, C.fg);
      ctx.restore();
      P.X = x => W / 2 + (x - P.xmin) / (P.xmax - P.xmin) * (W / 2);
      setV(-3, 3, -(6 / 2) * H / (W / 2), (6 / 2) * H / (W / 2));
      ctx.save(); ctx.beginPath(); ctx.rect(W / 2, 0, W / 2, H); ctx.clip();
      P.grid(1, true, 'x', 'y');
      if (!inv) {
        P.curve(Math.cosh, C.b, 2.5, -3, 3); P.curve(Math.sinh, C.d, 2.5, -3, 3); P.curve(Math.tanh, C.a, 2.5, -3, 3);
        P.line(-3, 1, 3, 1, C.grid, 1, [3, 3]); P.line(-3, -1, 3, -1, C.grid, 1, [3, 3]);
        P.dot(t, ch, C.b); P.dot(t, sh, C.d); P.dot(t, Math.tanh(t), C.a); P.line(t, P.ymin, t, P.ymax, C.c, 1, [2, 3]);
        P.text('cosh', 1.7, Math.cosh(1.7), C.b); P.text('sinh', -2.2, Math.sinh(-2.2), C.d, 8, 14); P.text('tanh', 2.1, 0.8, C.a);
      } else {
        P.line(-3, -3, 3, 3, C.grid, 1, [3, 3]);
        P.curve(Math.asinh, C.d, 2.5, -3, 3); P.curve(Math.acosh, C.b, 2.5, 1, 3); P.curve(Math.atanh, C.a, 2.5, -0.999, 0.999);
        P.text('arsinh', 2, Math.asinh(2), C.d); P.text('arcosh', 2.2, Math.acosh(2.2), C.b, 4, 16); P.text('artanh', 0.7, Math.atanh(0.9), C.a);
      }
      ctx.restore(); P.X = oldX;
      ctx.strokeStyle = C.grid; ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
      setRead(S.read, `<p>$t=${f3(t)}$</p><p class="hl">$\\cosh t=${f3(ch)}$<br>$\\sinh t=${f3(sh)}$<br>$\\tanh t=${f3(Math.tanh(t))}$</p><p>$\\cosh^2t-\\sinh^2t=${f3(ch * ch - sh * sh)}$ ✓<br>$\\cosh t+\\sinh t=e^t=${f3(Math.exp(t))}$</p><p>Shaded area $=\\tfrac t2=${f3(t / 2)}$</p><p class="muted">$t=\\ln(\\cosh t+\\sinh t)$ — that is where the log formulas for arsinh/arcosh come from.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Arc length / surface / volume ---------- */
SIMS.arclength = {
  title: 'Arc length, surface area & volume of revolution', desc: 'Chords approximate the arc; the integral is the limit as n → ∞.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    const FS = {
      cosh: { f: Math.cosh, d: Math.sinh, a: 0, b: 1.5, tex: 'y=\\cosh x' }, x2: { f: x => x * x, d: x => 2 * x, a: 0, b: 1.5, tex: 'y=x^2' },
      x32: { f: x => 2 / 3 * Math.pow(x, 1.5), d: x => Math.sqrt(x), a: 0, b: 3, tex: 'y=\\tfrac23x^{3/2}' }, sin: { f: Math.sin, d: Math.cos, a: 0, b: Math.PI, tex: 'y=\\sin x' },
      ln: { f: Math.log, d: x => 1 / x, a: 1, b: 4, tex: 'y=\\ln x' }, sqrt: { f: x => 2 * Math.sqrt(x), d: x => 1 / Math.sqrt(x), a: 0.001, b: 3, tex: 'y=2\\sqrt x' },
    };
    let key = 'cosh', n = 4, a = 0, b = 1.5, rev = false;
    let sa, sb;
    select(S.ctrls, 'Curve', Object.entries(FS).map(([k, v]) => [k, v.tex.replace(/\\tfrac23/, '⅔').replace(/\\/g, '').replace('{3/2}', '3/2').replace('sqrt x', '√x')]), v => { key = v; a = FS[v].a; b = FS[v].b; sa.set(a); sb.set(b); draw(); });
    sa = slider(S.ctrls, 'a', 0, 4, 0.05, a, v => { a = v; draw(); });
    sb = slider(S.ctrls, 'b', 0, 4, 0.05, b, v => { b = v; draw(); });
    slider(S.ctrls, 'Chords n', 1, 64, 1, n, v => { n = v; draw(); }, v => v);
    check(S.ctrls, 'Show surface of revolution', false, v => { rev = v; draw(); });
    function draw() {
      const C = COL(), F = FS[key]; let lo = Math.max(Math.min(a, b), key === 'ln' ? 0.05 : 0), hi = Math.max(a, b); if (key === 'sqrt') lo = Math.max(lo, 0.001);
      const ys = []; for (let i = 0; i <= 50; i++) ys.push(F.f(lo + (hi - lo) * i / 50));
      const ymax = Math.max(1, ...ys.map(Math.abs)); P.xmin = lo - 0.15 * (hi - lo) - 0.2; P.xmax = hi + 0.15 * (hi - lo) + 0.2; const hw = (P.xmax - P.xmin) / 2 * P.h / P.w;
      P.ymin = rev ? -ymax * 1.2 : Math.min(0, ...ys) - 0.2; P.ymax = rev ? ymax * 1.2 : ymax * 1.15; if (P.ymax - P.ymin < 2 * hw) { const c = (P.ymax + P.ymin) / 2; P.ymin = c - hw; P.ymax = c + hw; }
      P.clear(); P.grid(hi - lo > 3 ? 1 : 0.5, true);
      if (rev) {
        P.curve(x => -F.f(x), C.b, 1.5, lo, hi); const ctx = P.ctx; ctx.strokeStyle = C.b; ctx.lineWidth = 1;
        for (let i = 0; i <= 16; i++) { const x = lo + (hi - lo) * i / 16, y = Math.abs(F.f(x)); ctx.beginPath(); ctx.ellipse(P.X(x), P.Y(0), Math.max(1, y * 0.25 * P.w / (P.xmax - P.xmin)), Math.abs(P.Y(y) - P.Y(0)), 0, 0, 7); ctx.stroke(); }
      }
      P.curve(F.f, C.a, 3, P.xmin, P.xmax);
      let L = 0; const pts = []; for (let i = 0; i <= n; i++) { const x = lo + (hi - lo) * i / n; pts.push([x, F.f(x)]); if (i) L += Math.hypot(x - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); }
      for (let i = 1; i <= n; i++) P.line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], C.c, 2); pts.forEach(p => P.dot(p[0], p[1], C.c, 3.5));
      const s = simpson(x => Math.sqrt(1 + F.d(x) ** 2), lo, hi, 4000), Sx = simpson(x => 2 * Math.PI * F.f(x) * Math.sqrt(1 + F.d(x) ** 2), lo, hi, 4000), Vx = simpson(x => Math.PI * F.f(x) ** 2, lo, hi, 4000);
      setRead(S.read, `<p>$${F.tex}$, $\\ ${f3(lo)}\\le x\\le${f3(hi)}$</p><p>Sum of ${n} chords $=${f3(L)}$</p><p class="hl">$s=\\int\\sqrt{1+y'^2}\\,dx=${f3(s)}$</p><p>Error $=${(s - L).toExponential(2)}$</p><p>$S_x=2\\pi\\int y\\,ds=${f3(Sx)}$<br>$V_x=\\pi\\int y^2dx=${f3(Vx)}$</p><p class="muted">Doubling n roughly quarters the error.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Maclaurin / Taylor ---------- */
SIMS.maclaurin = {
  title: 'Maclaurin & Taylor polynomials', desc: 'Add terms and watch the polynomial hug the curve — until it hits the radius of convergence.',
  mount(el) {
    const pw = p => ({ f: x => Math.pow(1 + x, p), d: (k, a) => { let c = 1; for (let j = 0; j < k; j++) c *= (p - j); return c * Math.pow(1 + a, p - k); }, dom: x => x > -1, conv: '|x|<1' });
    const FS = {
      exp: { l: 'eˣ', f: Math.exp, d: (k, a) => Math.exp(a), conv: 'all x' },
      sin: { l: 'sin x', f: Math.sin, d: (k, a) => Math.sin(a + k * Math.PI / 2), conv: 'all x' },
      cos: { l: 'cos x', f: Math.cos, d: (k, a) => Math.cos(a + k * Math.PI / 2), conv: 'all x' },
      ln: { l: 'ln(1+x)', f: x => Math.log(1 + x), d: (k, a) => k === 0 ? Math.log(1 + a) : (k % 2 ? 1 : -1) * fact(k - 1) / Math.pow(1 + a, k), dom: x => x > -1, conv: '−1<x≤1' },
      atan: { l: 'arctan x', f: Math.atan, zero: k => k % 2 ? (k % 4 === 1 ? 1 : -1) / k : 0, conv: '|x|≤1 (about 0 only)' },
      sinh: { l: 'sinh x', f: Math.sinh, d: (k, a) => k % 2 ? Math.cosh(a) : Math.sinh(a), conv: 'all x' },
      geo: { l: '1/(1−x)', f: x => 1 / (1 - x), d: (k, a) => fact(k) / Math.pow(1 - a, k + 1), dom: x => x < 1, conv: '|x|<1' },
      sqrt: { l: '√(1+x)', ...pw(0.5) }, isq: { l: '1/√(1+x)', ...pw(-0.5) },
    };
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let key = 'sin', n = 5, a = 0, x0 = 1;
    let sa;
    select(S.ctrls, 'Function', Object.entries(FS).map(([k, v]) => [k, v.l]), v => { key = v; if (FS[v].zero) { a = 0; sa.set(0); } draw(); }, key);
    slider(S.ctrls, 'Degree n', 0, 20, 1, n, v => { n = v; draw(); }, v => v);
    sa = slider(S.ctrls, 'Expand about a', -2, 2, 0.1, a, v => { a = FS[key].zero ? 0 : v; draw(); });
    slider(S.ctrls, 'Test point x', -3, 3, 0.05, x0, v => { x0 = v; draw(); });
    function coefs() { const F = FS[key]; const c = []; for (let k = 0; k <= n; k++) c.push(F.zero ? (k === 0 ? 0 : F.zero(k)) : F.d(k, a) / fact(k)); return c; }
    function draw() {
      const C = COL(), F = FS[key]; if (F.dom && !F.dom(a)) { a = 0; sa.set(0); }
      P.view(0, 0, 4.2); P.clear(); P.grid(1, true);
      const c = coefs(), T = x => c.reduce((s, ck, k) => s + ck * Math.pow(x - a, k), 0);
      P.curve(x => (F.dom && !F.dom(x) ? NaN : F.f(x)), C.a, 3); P.curve(T, C.c, 2.5); P.dot(a, F.f(a), C.d, 5);
      const fx = F.dom && !F.dom(x0) ? NaN : F.f(x0), tx = T(x0); P.line(x0, P.ymin, x0, P.ymax, C.grid, 1, [3, 3]); if (isFinite(fx)) P.dot(x0, fx, C.a); P.dot(x0, tx, C.c);
      const terms = c.map((ck, k) => [ck, k]).filter(([ck]) => Math.abs(ck) > 1e-12).slice(0, 6).map(([ck, k]) => `${f3(ck)}${k ? (a ? `(x${a > 0 ? '-' : '+'}${Math.abs(a)})` : 'x') + (k > 1 ? `^{${k}}` : '') : ''}`).join(' + ').replace(/\+ -/g, '- ');
      setRead(S.read, `<p>$P_{${n}}(x)=${terms || '0'}${c.filter(x => Math.abs(x) > 1e-12).length > 6 ? '+\\cdots' : ''}$</p><p class="hl">At $x=${f3(x0)}$: $f=${isFinite(fx) ? f3(fx) : '\\text{undef}'}$, $P_{${n}}=${f3(tx)}$<br>Error $=${isFinite(fx) ? Math.abs(fx - tx).toExponential(2) : '—'}$</p><p>Maclaurin series valid for: ${F.conv}</p><p class="muted">Try ln(1+x) with x = 1.5 and increase n: the error grows — outside the interval of convergence.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Polar curves ---------- */
SIMS.polar = {
  title: 'Polar curve plotter with area & tangents', desc: 'Traces r(θ), shades ½∫r²dθ between α and β, and marks horizontal/vertical tangents.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    const FS = {
      lim: { l: 'r = a(p + q cos θ)', r: (t, a, p) => a * (p + Math.cos(t)), ps: 'p (q = 1)', pr: [0.2, 3, 0.1, 1] },
      rose: { l: 'r = a cos(nθ)', r: (t, a, p) => a * Math.cos(Math.round(p) * t), ps: 'n', pr: [1, 8, 1, 3] },
      sinr: { l: 'r = a sin(nθ)', r: (t, a, p) => a * Math.sin(Math.round(p) * t), ps: 'n', pr: [1, 8, 1, 2] },
      spiral: { l: 'r = aθ', r: (t, a) => a * t / 3, ps: '—', pr: [0, 1, 1, 0] },
      lem: { l: 'r² = a² cos 2θ', r: (t, a) => { const c = Math.cos(2 * t); return c >= 0 ? a * Math.sqrt(c) : NaN; }, ps: '—', pr: [0, 1, 1, 0] },
      circ: { l: 'r = 2a cos(θ − p)', r: (t, a, p) => 2 * a * Math.cos(t - p), ps: 'p (rad)', pr: [-3.14, 3.14, 0.01, 0] },
    };
    let key = 'lim', a = 2, p = 1, al = 0, be = Math.PI, allowNeg = false, anim = true, tan = true, tt = 0;
    let sp;
    select(S.ctrls, 'Curve', Object.entries(FS).map(([k, v]) => [k, v.l]), v => { key = v; const r = FS[v].pr; sp.inp.min = r[0]; sp.inp.max = r[1]; sp.inp.step = r[2]; p = r[3]; sp.set(p); draw(); });
    slider(S.ctrls, 'a', 0.5, 4, 0.1, a, v => { a = v; draw(); });
    sp = slider(S.ctrls, 'parameter', 0.2, 3, 0.1, p, v => { p = v; draw(); });
    slider(S.ctrls, 'α (×π)', 0, 2, 1 / 24, 0, v => { al = v * Math.PI; draw(); }, v => (+v).toFixed(3));
    slider(S.ctrls, 'β (×π)', 0, 4, 1 / 24, 1, v => { be = v * Math.PI; draw(); }, v => (+v).toFixed(3));
    check(S.ctrls, 'Allow r < 0 (plot backwards)', false, v => { allowNeg = v; draw(); });
    check(S.ctrls, 'Mark tangents ∥ and ⟂ to initial line', true, v => { tan = v; draw(); });
    check(S.ctrls, 'Animate tracer', true, v => anim = v);
    const R = t => { const v = FS[key].r(t, a, p); return !allowNeg && v < 0 ? NaN : v; };
    function draw() {
      const C = COL(); P.view(0, 0, 5.5); P.clear(); P.grid(1, true);
      const ctx = P.ctx; for (let k = 1; k <= 5; k++) P.circle(0, 0, k, C.grid, 0.7);
      const tmax = key === 'spiral' ? 4 * Math.PI : 2 * Math.PI;
      ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); let A = 0; const N = 600;
      for (let i = 0; i <= N; i++) { const t = al + (be - al) * i / N, r = R(t); if (!isFinite(r)) { ctx.lineTo(P.X(0), P.Y(0)); continue; } ctx.lineTo(P.X(r * Math.cos(t)), P.Y(r * Math.sin(t))); }
      ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      A = simpson(t => { const r = R(t); return isFinite(r) ? r * r / 2 : 0; }, al, be, 2000);
      P.param(t => R(t) * Math.cos(t), t => R(t) * Math.sin(t), 0, tmax, C.a, 2.5, 1500);
      P.line(0, 0, 6 * Math.cos(al), 6 * Math.sin(al), C.b, 1.2, [4, 4]); P.line(0, 0, 6 * Math.cos(be), 6 * Math.sin(be), C.d, 1.2, [4, 4]);
      let tanTxt = '';
      if (tan) {
        const y = t => R(t) * Math.sin(t), x = t => R(t) * Math.cos(t), hs = [], vs = [], M = 720, e = 1e-5;
        const dy = t => (y(t + e) - y(t - e)) / (2 * e), dx = t => (x(t + e) - x(t - e)) / (2 * e);
        for (let i = 0; i < M; i++) { const t1 = tmax * i / M, t2 = tmax * (i + 1) / M; [[dy, hs], [dx, vs]].forEach(([g, arr]) => { const g1 = g(t1), g2 = g(t2); if (isFinite(g1) && isFinite(g2) && g1 * g2 < 0 && Math.abs(g1 - g2) < 5) { let lo = t1, hi = t2; for (let k = 0; k < 40; k++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; } const tm = (lo + hi) / 2; if (R(tm) > 1e-3) arr.push(tm); } }); }
        hs.forEach(t => { P.line(x(t) - 0.6, y(t), x(t) + 0.6, y(t), C.c, 2.5); P.dot(x(t), y(t), C.c, 4); });
        vs.forEach(t => { P.line(x(t), y(t) - 0.6, x(t), y(t) + 0.6, C.b, 2.5); P.dot(x(t), y(t), C.b, 4); });
        const fmt = arr => arr.slice(0, 6).map(t => `(${f3(R(t))},\\,${f3(t)})`).join(',\\ ');
        tanTxt = `<p><span style="color:${C.c}">∥ initial line</span> $(r,\\theta)$: $${fmt(hs) || '\\text{none}'}$</p><p><span style="color:${C.b}">⟂ initial line</span>: $${fmt(vs) || '\\text{none}'}$</p>`;
      }
      const t = tt % tmax, r = R(t); if (isFinite(r)) { P.line(0, 0, r * Math.cos(t), r * Math.sin(t), C.c, 1.5); P.dot(r * Math.cos(t), r * Math.sin(t), C.c, 6); }
      setRead(S.read, `<p>${FS[key].l}, $a=${a}$${FS[key].ps !== '—' ? `, ${FS[key].ps} $=${f3(p)}$` : ''}</p><p class="hl">Shaded area $=\\tfrac12\\int_{${f3(al)}}^{${f3(be)}}r^2d\\theta=${f3(A)}$</p>${tanTxt}<p class="muted">Blue/purple dashed rays mark α and β.</p>`);
    }
    let lt = 0; const stop = loop(ts => { if (anim) { tt += (ts - lt) / 1000; draw(); } lt = ts; });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- Slope field ---------- */
SIMS.slopefield = {
  title: 'Slope fields & solution curves', desc: 'Click anywhere to launch a solution curve through that point (RK4).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    const ODES = {
      a: { l: "y' = x − y", f: (x, y) => x - y, g: 'y=x-1+Ce^{-x}' },
      b: { l: "y' = −2xy", f: (x, y) => -2 * x * y, g: 'y=Ce^{-x^2}' },
      c: { l: "y' + y/x = x²", f: (x, y) => x * x - y / x, g: 'y=\\tfrac{x^3}{4}+\\tfrac Cx' },
      d: { l: "y' = y(1 − y)", f: (x, y) => y * (1 - y), g: 'y=\\dfrac1{1+Ce^{-x}}' },
      e: { l: "y' + y tan x = cos x", f: (x, y) => Math.cos(x) - y * Math.tan(x), g: 'y=(x+C)\\cos x' },
      f: { l: "y' = sin x − y", f: (x, y) => Math.sin(x) - y, g: 'y=\\tfrac12(\\sin x-\\cos x)+Ce^{-x}' },
      g: { l: "y' = x + y", f: (x, y) => x + y, g: 'y=Ce^x-x-1' },
    };
    let key = 'a', sols = [[0, 2], [0, -1]];
    select(S.ctrls, 'Equation', Object.entries(ODES).map(([k, v]) => [k, v.l]), v => { key = v; sols = []; draw(); });
    button(S.ctrls, 'Clear curves', () => { sols = []; draw(); });
    P.onclick = (x, y) => { sols.push([x, y]); draw(); };
    function rk(f, x, y, h) { const k1 = f(x, y), k2 = f(x + h / 2, y + h * k1 / 2), k3 = f(x + h / 2, y + h * k2 / 2), k4 = f(x + h, y + h * k3); return y + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6; }
    function draw() {
      const C = COL(), F = ODES[key].f; P.view(0, 0, 5); P.clear(); P.grid(1, true);
      const ctx = P.ctx, sx = (P.xmax - P.xmin) / 26; ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      for (let x = P.xmin + sx / 2; x < P.xmax; x += sx) for (let y = P.ymin + sx / 2; y < P.ymax; y += sx) { const m = F(x, y); if (!isFinite(m)) continue; const L = sx * 0.38 / Math.sqrt(1 + m * m); ctx.beginPath(); ctx.moveTo(P.X(x - L), P.Y(y - m * L)); ctx.lineTo(P.X(x + L), P.Y(y + m * L)); ctx.stroke(); }
      const cols = [C.a, C.c, C.b, C.d];
      sols.forEach(([x0, y0], i) => {
        [1, -1].forEach(dir => { ctx.strokeStyle = cols[i % 4]; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(P.X(x0), P.Y(y0)); let x = x0, y = y0; const h = 0.01 * dir; for (let k = 0; k < 1200; k++) { const yn = rk(F, x, y, h); x += h; if (!isFinite(yn) || Math.abs(yn) > 50) break; y = yn; ctx.lineTo(P.X(x), P.Y(y)); } ctx.stroke(); });
        P.dot(x0, y0, cols[i % 4], 5);
      });
      setRead(S.read, `<p>${ODES[key].l}</p><p class="hl">General solution: $${ODES[key].g}$</p><p>Curves launched: ${sols.map(s => `(${f3(s[0])}, ${f3(s[1])})`).join(', ') || 'none — click the plane'}</p><p class="muted">Each click fixes the constant C — that's what an initial condition does.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Oscillator ---------- */
SIMS.oscillator = {
  title: 'Damped & forced oscillator', desc: 'ẍ + bẋ + cx = F cos ωt. See how the auxiliary roots decide the motion.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let b = 0.5, c = 4, x0 = 2, v0 = 0, F = 0, w = 2, run = true, time = 0;
    const reset = () => { time = 0; };
    slider(S.ctrls, 'Damping b', 0, 6, 0.05, b, v => { b = v; reset(); });
    slider(S.ctrls, 'Stiffness c', 0.25, 10, 0.05, c, v => { c = v; reset(); });
    slider(S.ctrls, 'x(0)', -3, 3, 0.1, x0, v => { x0 = v; reset(); });
    slider(S.ctrls, "ẋ(0)", -5, 5, 0.1, v0, v => { v0 = v; reset(); });
    slider(S.ctrls, 'Forcing F', 0, 4, 0.1, F, v => { F = v; reset(); });
    slider(S.ctrls, 'Forcing ω', 0.2, 5, 0.05, w, v => { w = v; reset(); });
    check(S.ctrls, 'Animate', true, v => run = v);
    button(S.ctrls, 'Restart', reset);
    function sim(Tmax, dt = 0.01) { const out = []; let x = x0, v = v0, t = 0; const acc = (t, x, v) => F * Math.cos(w * t) - b * v - c * x; while (t <= Tmax) { out.push([t, x]); const k1x = v, k1v = acc(t, x, v), k2x = v + dt / 2 * k1v, k2v = acc(t + dt / 2, x + dt / 2 * k1x, v + dt / 2 * k1v), k3x = v + dt / 2 * k2v, k3v = acc(t + dt / 2, x + dt / 2 * k2x, v + dt / 2 * k2v), k4x = v + dt * k3v, k4v = acc(t + dt, x + dt * k3x, v + dt * k3v); x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x); v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v); t += dt; } return out; }
    function draw() {
      const C = COL(), ctx = P.ctx, W = P.w, H = P.h; P.clear();
      const Tm = 20, data = sim(Tm), amp = Math.max(3, ...data.map(d => Math.abs(d[1]))) * 1.1;
      // graph region: x from 0.22W..W
      const gx = W * 0.22, X = t => gx + (t / Tm) * (W - gx - 10), Y = x => H / 2 - x / amp * (H / 2 - 20);
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx, H / 2); ctx.lineTo(W, H / 2); ctx.moveTo(gx, 10); ctx.lineTo(gx, H - 10); ctx.stroke();
      ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace'; for (let t = 5; t <= Tm; t += 5) ctx.fillText('t=' + t, X(t) - 10, H / 2 + 14);
      ctx.strokeStyle = C.a; ctx.lineWidth = 2.5; ctx.beginPath(); data.forEach((d, i) => i ? ctx.lineTo(X(d[0]), Y(d[1])) : ctx.moveTo(X(d[0]), Y(d[1]))); ctx.stroke();
      const disc = b * b - 4 * c;
      if (disc < 0 && F === 0) { const k = b / 2; ctx.strokeStyle = C.grid; ctx.setLineDash([4, 4]); const A = Math.hypot(x0, (v0 + k * x0) / Math.sqrt(-disc / 4)); ctx.beginPath(); for (let t = 0; t <= Tm; t += 0.05) ctx.lineTo(X(t), Y(A * Math.exp(-k * t))); ctx.stroke(); ctx.beginPath(); for (let t = 0; t <= Tm; t += 0.05) ctx.lineTo(X(t), Y(-A * Math.exp(-k * t))); ctx.stroke(); ctx.setLineDash([]); }
      const idx = Math.min(data.length - 1, Math.floor(time / 0.01)), xt = data[idx][1];
      ctx.fillStyle = C.c; ctx.beginPath(); ctx.arc(X(data[idx][0]), Y(xt), 5, 0, 7); ctx.fill();
      // spring + mass
      const mx = gx * 0.5, top = 12, my = Y(xt);
      ctx.strokeStyle = C.axis; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx - 25, top); ctx.lineTo(mx + 25, top); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx, top); const coils = 12; for (let i = 1; i <= coils; i++) ctx.lineTo(mx + (i % 2 ? 10 : -10), top + (my - 18 - top) * i / coils); ctx.lineTo(mx, my - 18); ctx.stroke();
      ctx.fillStyle = C.b; ctx.fillRect(mx - 18, my - 18, 36, 36);
      ctx.strokeStyle = C.grid; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(mx - 30, H / 2); ctx.lineTo(mx + 30, H / 2); ctx.stroke(); ctx.setLineDash([]);
      // roots inset
      const ix = W - 110, iy = 14, iw = 96, ih = 70; ctx.strokeStyle = C.grid; ctx.strokeRect(ix, iy, iw, ih); ctx.beginPath(); ctx.moveTo(ix, iy + ih / 2); ctx.lineTo(ix + iw, iy + ih / 2); ctx.moveTo(ix + iw * 0.75, iy); ctx.lineTo(ix + iw * 0.75, iy + ih); ctx.stroke();
      const rts = disc >= 0 ? [[(-b + Math.sqrt(disc)) / 2, 0], [(-b - Math.sqrt(disc)) / 2, 0]] : [[-b / 2, Math.sqrt(-disc) / 2], [-b / 2, -Math.sqrt(-disc) / 2]];
      const sc = iw * 0.75 / 7; ctx.fillStyle = C.c; rts.forEach(([re, im]) => { ctx.beginPath(); ctx.arc(Math.max(ix + 3, ix + iw * 0.75 + re * sc), iy + ih / 2 - Math.max(-4, Math.min(4, im)) * sc, 4, 0, 7); ctx.fill(); });
      ctx.fillStyle = C.text; ctx.font = '10px system-ui'; ctx.fillText('aux. roots', ix + 4, iy + ih - 4);
      const type = disc > 1e-9 ? 'Over-damped' : Math.abs(disc) <= 1e-9 ? 'Critically damped' : b === 0 ? 'Undamped: SHM' : 'Under-damped';
      const rs = disc >= 0 ? `m=${f3(rts[0][0])},\\ ${f3(rts[1][0])}` : `m=${f3(-b / 2)}\\pm${f3(Math.sqrt(-disc) / 2)}i`;
      const cf = disc > 1e-9 ? `Ae^{${f3(rts[0][0])}t}+Be^{${f3(rts[1][0])}t}` : Math.abs(disc) <= 1e-9 ? `(A+Bt)e^{${f3(-b / 2)}t}` : `e^{${f3(-b / 2)}t}(A\\cos${f3(Math.sqrt(-disc) / 2)}t+B\\sin${f3(Math.sqrt(-disc) / 2)}t)`;
      let pi = '';
      if (F > 0) { const s = c - w * w, t2 = b * w, D = s * s + t2 * t2; pi = D > 1e-9 ? `<p>PI: $${f3(F * s / D)}\\cos${f3(w)}t+${f3(F * t2 / D)}\\sin${f3(w)}t$<br>Steady amplitude $=${f3(F / Math.sqrt(D))}$</p>` : `<p><b>Resonance!</b> $\\omega^2=c$, $b=0$: PI $=\\tfrac{F}{2\\omega}t\\sin\\omega t$ grows without bound.</p>`; }
      setRead(S.read, `<p>$\\ddot x+${f3(b)}\\dot x+${f3(c)}x=${F ? `${f3(F)}\\cos${f3(w)}t` : '0'}$</p><p>$m^2+${f3(b)}m+${f3(c)}=0$, $\\ b^2-4c=${f3(disc)}$</p><p class="hl">${type}<br>$${rs}$</p><p>CF: $x=${cf}$</p>${pi}`);
    }
    let lt = 0; const stop = loop(ts => { const dt = Math.min(0.05, (ts - lt) / 1000); lt = ts; if (run) { time += dt; if (time > 20) time = 0; } draw(); });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- Induction ladder ---------- */
SIMS.induction = {
  title: 'Induction checker', desc: 'Test a claim for n = 1…N and see the inductive step numerically: S(k) + u(k+1) = S(k+1).',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('scroll');
    const C = [
      { l: 'Σ r = n(n+1)/2', u: r => r, s: n => n * (n + 1) / 2 },
      { l: 'Σ r² = n(n+1)(2n+1)/6', u: r => r * r, s: n => n * (n + 1) * (2 * n + 1) / 6 },
      { l: 'Σ r³ = n²(n+1)²/4', u: r => r ** 3, s: n => n * n * (n + 1) ** 2 / 4 },
      { l: 'Σ r·2^r = (n−1)2^(n+1) + 2', u: r => r * 2 ** r, s: n => (n - 1) * 2 ** (n + 1) + 2 },
      { l: 'Σ 1/(r(r+1)) = n/(n+1)', u: r => 1 / (r * (r + 1)), s: n => n / (n + 1) },
      { l: '✗ WRONG claim: Σ r² = n²(n+1)/2', u: r => r * r, s: n => n * n * (n + 1) / 2 },
      { l: 'Divisibility: 5^(2n) − 1 is a multiple of 24', u: null, s: n => 25 ** n - 1, div: 24 },
      { l: 'Divisibility: 2^(n+2) + 3^(2n+1) is a multiple of 7', u: null, s: n => 2 ** (n + 2) + 3 ** (2 * n + 1), div: 7 },
    ];
    let k = 0, N = 8;
    select(S.ctrls, 'Claim', C.map((c, i) => [i, c.l]), v => { k = +v; draw(); });
    slider(S.ctrls, 'Check up to N', 3, 12, 1, N, v => { N = v; draw(); }, v => v);
    function draw() {
      const c = C[k]; let rows = '', ok = true, sum = 0;
      for (let n = 1; n <= N; n++) {
        if (c.div) { const v = c.s(n), pass = v % c.div === 0; ok = ok && pass; rows += `<tr><td>${n}</td><td>${v.toLocaleString()}</td><td>${v / c.div}</td><td class="${pass ? 'ok' : 'bad'}">${pass ? '✓' : '✗'}</td></tr>`; continue; }
        sum += c.u(n); const rhs = c.s(n), pass = Math.abs(sum - rhs) < 1e-9 * Math.max(1, Math.abs(rhs)); ok = ok && pass;
        rows += `<tr><td>${n}</td><td>${+sum.toFixed(6)}</td><td>${+rhs.toFixed(6)}</td><td class="${pass ? 'ok' : 'bad'}">${pass ? '✓' : '✗'}</td></tr>`;
      }
      S.stage.innerHTML = `<table class="tbl induct"><tr><th>n</th><th>${c.div ? 'f(n)' : 'LHS (sum)'}</th><th>${c.div ? `f(n) ÷ ${c.div}` : 'RHS (formula)'}</th><th></th></tr>${rows}</table>`;
      setRead(S.read, `<p class="hl">${ok ? 'Holds for every n checked — now prove it.' : 'Fails for some n — no proof possible.'}</p><p class="muted">Checking cases is <b>not</b> a proof, but it finds the start value and catches false claims before you waste time.</p>` + (c.div ? `<p>Step idea: $f(k+1)-${c.div === 24 ? 25 : 9}f(k)$ is a multiple of ${c.div}.</p>` : `<p>Step: $S(k)+u_{k+1}$ should factorise to $S(k+1)$.</p>`));
    }
    draw();
    return () => {};
  },
};
