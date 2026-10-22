// BCS Academy Lab: open-ended tools. Each LAB[id] = { title, icon, desc, mount(el) -> cleanup }
'use strict';

const LAB = {};
const labRender = el => { if (window.renderMath) window.renderMath(el); };
const texNum = x => { const id = identify(x); return id ? id.tex : num(x, 6); };
const texCx = z => { const [a, b] = z.map(v => Math.abs(v) < 1e-10 ? 0 : v); if (!b) return texNum(a); const bs = Math.abs(b) === 1 ? '' : texNum(Math.abs(b)); return `${a ? texNum(a) : ''}${b < 0 ? '-' : (a ? '+' : '')}${bs}i`; };
const errBox = m => `<p class="lab-err">⚠ ${m.replace(/[<>&]/g, '')}</p>`;
function field(label, value, attrs = '') { return `<label class="lf"><span>${label}</span><input value="${String(value).replace(/"/g, '&quot;')}" ${attrs} spellcheck="false" autocomplete="off"></label>`; }

/* ---------------- Grapher ---------------- */
LAB.grapher = {
  title: 'Graph plotter', icon: 'y=', desc: 'Plot y = f(x), parametric and polar curves. Find roots, turning points, intersections and areas.',
  mount(el) {
    const palette = () => { const C = COL(); return [C.a, C.b, C.c, C.d, '#a78bfa', '#38bdf8']; };
    let items = [{ t: 'y', e: 'sinh(x)' }, { t: 'y', e: 'cosh(x)' }, { t: 'polar', e: '2(1+cos(theta))', a: '0', b: '2pi' }];
    let view = { cx: 0, cy: 0, hw: 6 }, area = null, marks = [];
    el.innerHTML = `<div class="lab-grid"><div><div class="sim-stage"></div><div class="lab-row"><button class="btn small" data-z="in">＋</button><button class="btn small" data-z="out">－</button><button class="btn small" data-z="home">⌂ reset view</button><span class="muted small" id="gcoord">drag to pan · scroll to zoom</span></div></div>
      <div class="lab-side"><div id="glist"></div><div class="lab-row"><button class="btn small" data-add="y">+ y = f(x)</button><button class="btn small" data-add="param">+ parametric</button><button class="btn small" data-add="polar">+ polar</button></div>
      <div class="box"><b>Analyse</b><div class="lab-row">${field('curve #', '1', 'size="2" id="gsel"')}${field('a', '0', 'size="5" id="ga"')}${field('b', '1', 'size="5" id="gb"')}</div>
      <div class="lab-row"><button class="btn small" id="groots">Roots & turning points</button><button class="btn small" id="gint">∫ from a to b</button><button class="btn small" id="gx">Intersect #1 & #2</button><button class="btn small" id="gclr">Clear</button></div><div id="gout" class="sim-read"></div></div>
      <p class="muted small">Use <code>x</code> for y-curves, <code>t</code> for parametric, <code>theta</code> (or θ) for polar. Functions: sin, arcsin, sinh, arsinh, ln, sqrt, abs, … Implicit multiplication works: <code>2xsin(x)</code>.</p></div></div>`;
    const stage = el.querySelector('.sim-stage'), P = makeCanvas(stage, 1.2), list = el.querySelector('#glist'), out = el.querySelector('#gout');
    const compiled = () => items.map(it => { try { if (it.t === 'y') return { f: fn(it.e, ['x']) }; if (it.t === 'param') { const [ex, ey] = it.e.split(';'); return { fx: fn(ex, ['t']), fy: fn(ey || '0', ['t']), a: evalExpr(it.a), b: evalExpr(it.b) }; } return { r: fn(it.e, ['theta']), a: evalExpr(it.a), b: evalExpr(it.b) }; } catch (e) { return { err: e.message }; } });
    function renderList() {
      const pal = palette();
      list.innerHTML = items.map((it, i) => `<div class="gitem" style="--gc:${pal[i % pal.length]}"><span class="gnum">${i + 1}</span>
        ${it.t === 'y' ? `<span class="gl">y =</span><input data-i="${i}" data-k="e" value="${it.e}">` : it.t === 'param' ? `<span class="gl">x;y =</span><input data-i="${i}" data-k="e" value="${it.e}" title="x(t); y(t)"><input class="sm" data-i="${i}" data-k="a" value="${it.a}"><input class="sm" data-i="${i}" data-k="b" value="${it.b}">` : `<span class="gl">r =</span><input data-i="${i}" data-k="e" value="${it.e}"><input class="sm" data-i="${i}" data-k="a" value="${it.a}"><input class="sm" data-i="${i}" data-k="b" value="${it.b}">`}
        <button class="gx" data-del="${i}" aria-label="Remove">✕</button></div>`).join('');
    }
    function draw() {
      const C = COL(), pal = palette(); P.view(view.cx, view.cy, view.hw); P.clear();
      const step = Math.pow(10, Math.floor(Math.log10(view.hw / 2))); P.grid(view.hw / step > 25 ? step * 5 : view.hw / step > 10 ? step * 2 : step, true, 'x', 'y');
      const cs = compiled();
      if (area) { const f = cs[area.i] && cs[area.i].f; if (f) { const ctx = P.ctx; ctx.beginPath(); ctx.moveTo(P.X(area.a), P.Y(0)); for (let k = 0; k <= 300; k++) { const x = area.a + (area.b - area.a) * k / 300, y = f(x); ctx.lineTo(P.X(x), P.Y(isFinite(y) ? y : 0)); } ctx.lineTo(P.X(area.b), P.Y(0)); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); } }
      cs.forEach((c, i) => {
        const col = pal[i % pal.length]; if (c.err) return;
        if (c.f) P.curve(c.f, col, 2.5, P.xmin, P.xmax, 1200);
        else if (c.fx) P.param(c.fx, c.fy, c.a, c.b, col, 2.5, 1500);
        else if (c.r) P.param(t => c.r(t) * Math.cos(t), t => c.r(t) * Math.sin(t), c.a, c.b, col, 2.5, 1500);
      });
      marks.forEach(m => { P.dot(m[0], m[1], C.fg, 4.5); P.text(`(${f3(m[0])}, ${f3(m[1])})`, m[0], m[1], C.text, 6, -6, '11px system-ui'); });
      list.querySelectorAll('.gitem').forEach((row, i) => row.classList.toggle('bad', !!cs[i].err));
    }
    renderList(); draw(); P.onresize = draw;
    list.addEventListener('input', e => { const i = +e.target.dataset.i; if (isNaN(i)) return; items[i][e.target.dataset.k] = e.target.value; draw(); });
    list.addEventListener('click', e => { const d = e.target.dataset.del; if (d !== undefined) { items.splice(+d, 1); renderList(); draw(); } });
    el.querySelectorAll('[data-add]').forEach(b => b.onclick = () => { const t = b.dataset.add; items.push(t === 'y' ? { t, e: 'x^2' } : t === 'param' ? { t, e: 'cos(t)^3; sin(t)^3', a: '0', b: '2pi' } : { t, e: 'cos(3theta)', a: '0', b: 'pi' }); renderList(); draw(); });
    el.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { const z = b.dataset.z; if (z === 'home') view = { cx: 0, cy: 0, hw: 6 }; else view.hw *= z === 'in' ? 0.7 : 1.4; draw(); });
    // pan & zoom
    let drag = null;
    P.cv.addEventListener('mousedown', e => { drag = { x: e.clientX, y: e.clientY, cx: view.cx, cy: view.cy }; });
    const mm = e => { const r = P.cv.getBoundingClientRect(); if (drag) { const k = (P.xmax - P.xmin) / P.w; view.cx = drag.cx - (e.clientX - drag.x) * k; view.cy = drag.cy + (e.clientY - drag.y) * k; draw(); } else if (e.target === P.cv) { el.querySelector('#gcoord').textContent = `x = ${f3(P.ix(e.clientX - r.left))}, y = ${f3(P.iy(e.clientY - r.top))}`; } };
    const mu = () => { drag = null; };
    window.addEventListener('mousemove', mm); window.addEventListener('mouseup', mu);
    let t0 = null; P.cv.addEventListener('touchstart', e => { const t = e.touches[0]; t0 = { x: t.clientX, y: t.clientY, cx: view.cx, cy: view.cy }; }, { passive: true });
    P.cv.addEventListener('touchmove', e => { if (!t0) return; e.preventDefault(); const t = e.touches[0], k = (P.xmax - P.xmin) / P.w; view.cx = t0.cx - (t.clientX - t0.x) * k; view.cy = t0.cy + (t.clientY - t0.y) * k; draw(); }, { passive: false });
    P.cv.addEventListener('wheel', e => { e.preventDefault(); view.hw *= e.deltaY > 0 ? 1.12 : 0.89; draw(); }, { passive: false });
    const sel = () => { const i = Math.round(evalExpr(el.querySelector('#gsel').value)) - 1; const c = compiled()[i]; if (!c || !c.f) throw new Error('Pick a y = f(x) curve number'); return [i, c.f]; };
    const zeros = (g, a, b, N = 2000) => { const out = []; let px = a, pv = g(a); for (let k = 1; k <= N; k++) { const x = a + (b - a) * k / N, v = g(x); if (isFinite(pv) && isFinite(v) && pv * v <= 0 && Math.abs(pv - v) < 1e3 * (Math.abs(pv) + Math.abs(v) + 1e-9)) { let lo = px, hi = x; for (let j = 0; j < 60; j++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; } const r = (lo + hi) / 2; if (!out.length || Math.abs(out[out.length - 1] - r) > 1e-6) out.push(r); } px = x; pv = v; } return out; };
    el.querySelector('#groots').onclick = () => { try { const [i, f] = sel(), d = x => (f(x + 1e-5) - f(x - 1e-5)) / 2e-5; const rs = zeros(f, P.xmin, P.xmax).filter(x => Math.abs(f(x)) < 1e-6), ts = zeros(d, P.xmin, P.xmax); marks = [...rs.map(x => [x, 0]), ...ts.map(x => [x, f(x)])];
      out.innerHTML = `<p><b>Roots in view:</b> ${rs.map(x => `$x=${texNum(x)}$`).join(', ') || 'none'}</p><p><b>Stationary points:</b> ${ts.map(x => `$(${texNum(x)},\\ ${texNum(f(x))})$`).join(', ') || 'none'}</p><p class="muted">y-intercept: $${isFinite(f(0)) ? texNum(f(0)) : '\\text{none}'}$</p>`; labRender(out); draw(); } catch (e) { out.innerHTML = errBox(e.message); } };
    el.querySelector('#gint').onclick = () => { try { const [i, f] = sel(), a = evalExpr(el.querySelector('#ga').value.replace(/^-?inf(inity)?$/i, m => m.startsWith('-') ? '-1e308' : '1e308')), b = evalExpr(el.querySelector('#gb').value.replace(/^-?inf(inity)?$/i, m => m.startsWith('-') ? '-1e308' : '1e308'));
      const A = a <= -1e300 ? -Infinity : a, Bb = b >= 1e300 ? Infinity : b, v = integrateSmart(f, A, Bb); area = { i, a: Math.max(A, P.xmin), b: Math.min(Bb, P.xmax) };
      out.innerHTML = `<p>$\\displaystyle\\int_{${isFinite(A) ? texNum(A) : '-\\infty'}}^{${isFinite(Bb) ? texNum(Bb) : '\\infty'}}f(x)\\,dx\\approx${num(v, 10)}$${identify(v) ? ` $=${identify(v).tex}$` : ''}</p><p class="muted">Signed area (below the axis counts negative).</p>`; labRender(out); draw(); } catch (e) { out.innerHTML = errBox(e.message); } };
    el.querySelector('#gx').onclick = () => { try { const cs = compiled(); if (!cs[0]?.f || !cs[1]?.f) throw new Error('Curves 1 and 2 must both be y = f(x)'); const g = x => cs[0].f(x) - cs[1].f(x); const xs = zeros(g, P.xmin, P.xmax).filter(x => Math.abs(g(x)) < 1e-6); marks = xs.map(x => [x, cs[0].f(x)]); out.innerHTML = `<p><b>Intersections:</b> ${xs.map(x => `$(${texNum(x)},\\ ${texNum(cs[0].f(x))})$`).join(', ') || 'none in view'}</p>`; labRender(out); draw(); } catch (e) { out.innerHTML = errBox(e.message); } };
    el.querySelector('#gclr').onclick = () => { marks = []; area = null; out.innerHTML = ''; draw(); };
    return () => { P.destroy(); window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
  },
};

/* ---------------- Complex ---------------- */
LAB.complex = {
  title: 'Complex number workbench', icon: 'ℂ', desc: 'Evaluate any complex expression, see all forms, plot on an Argand diagram, find nth roots.',
  mount(el) {
    el.innerHTML = `<div class="lab-grid"><div class="sim-stage"></div><div class="lab-side">
      ${field('Expressions (comma-separated)', '(1+i)^3, (sqrt(3)+i)/2, e^(i pi/3)', 'id="cz" class="wide"')}
      <div class="lab-row">${field('nth roots of the first: n =', '5', 'id="cn" size="3"')}<button class="btn small" id="cgo">Compute</button></div>
      <div id="cout" class="sim-read"></div><p class="muted small">Write <code>i</code> for √−1. Try <code>(1+i)^8</code>, <code>ln(-1)</code>, <code>cos(i)</code>, <code>(2e^(i pi/4))^5</code>.</p></div></div>`;
    const P = makeCanvas(el.querySelector('.sim-stage'), 1.1), out = el.querySelector('#cout');
    let pts = [], roots = [];
    function compute() {
      try {
        const exprs = splitTop(el.querySelector('#cz').value); pts = exprs.map(s => compileComplex(parse(s, []))({}));
        const n = Math.round(evalExpr(el.querySelector('#cn').value)); roots = [];
        let html = pts.map((z, k) => { const r = Cx.abs(z), t = Cx.arg(z), tp = identify(t / Math.PI); const tt = tp ? (tp.tex === '0' ? '0' : `${tp.tex === '1' ? '' : tp.tex === '-1' ? '-' : tp.tex}\\pi`.replace(/\\frac\{(-?\d*)\}\{(\d+)\}\\pi/, '\\frac{$1\\pi}{$2}')) : num(t, 6);
          return `<p><b>z${k + 1}</b> $=${texCx(z)}$<br>$|z|=${texNum(r)},\\ \\arg z=${tt}$<br>$z=${texNum(r)}e^{${tt}\\,i}$</p>`; }).join('');
        if (pts.length && n >= 2 && n <= 24) {
          const z = pts[0], R = Math.pow(Cx.abs(z), 1 / n), ph = Cx.arg(z);
          for (let k = 0; k < n; k++) { let a = (ph + 2 * Math.PI * k) / n; a = Math.atan2(Math.sin(a), Math.cos(a)); roots.push([R * Math.cos(a), R * Math.sin(a)]); }
          html += `<p><b>${n}th roots of z1</b> (modulus $${texNum(R)}$):<br>${roots.map(w => `$${texCx(w)}$`).join(', ')}</p>`;
        }
        out.innerHTML = html; labRender(out); draw();
      } catch (e) { out.innerHTML = errBox(e.message); }
    }
    function draw() {
      const C = COL(), all = [...pts, ...roots], m = Math.max(1.5, ...all.map(Cx.abs).filter(isFinite)) * 1.25; P.view(0, 0, m); P.clear(); P.grid(m > 8 ? 2 : m > 3 ? 1 : 0.5, true, 'Re', 'Im');
      if (roots.length) { P.circle(0, 0, Cx.abs(roots[0]), C.axis, 1, [4, 4]); const ctx = P.ctx; ctx.beginPath(); roots.slice().sort((a, b) => Cx.arg(a) - Cx.arg(b)).forEach((w, i) => i ? ctx.lineTo(P.X(w[0]), P.Y(w[1])) : ctx.moveTo(P.X(w[0]), P.Y(w[1]))); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill(); roots.forEach(w => P.dot(w[0], w[1], C.c, 5)); }
      pts.forEach((z, k) => { if (!z.every(isFinite)) return; P.arrow(0, 0, z[0], z[1], [C.a, C.b, C.d][k % 3]); P.text('z' + (k + 1), z[0], z[1], [C.a, C.b, C.d][k % 3]); });
    }
    el.querySelector('#cgo').onclick = compute; el.querySelectorAll('input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') compute(); }));
    P.onresize = draw; compute();
    return () => P.destroy();
  },
};
function splitTop(s) { const out = []; let d = 0, cur = ''; for (const c of s) { if (c === '(') d++; if (c === ')') d--; if (c === ',' && d === 0) { out.push(cur); cur = ''; } else cur += c; } if (cur.trim()) out.push(cur); return out.map(x => x.trim()).filter(Boolean); }

/* ---------------- Matrices ---------------- */
LAB.matrix = {
  title: 'Matrix calculator', icon: '▦', desc: '2×2 and 3×3: determinant, inverse, transpose, products, powers, eigenvalues & eigenvectors, solving systems.',
  mount(el) {
    let n = 3;
    const grid = (id, vals) => `<div class="mgrid" id="${id}" style="grid-template-columns:repeat(${n},1fr)">${vals.map(v => `<input value="${v}">`).join('')}</div>`;
    const defA = { 2: ['2', '1', '1', '2'], 3: ['2', '0', '0', '1', '2', '1', '0', '1', '2'] }, defB = { 2: ['1', '0', '0', '1'], 3: ['1', '0', '0', '0', '1', '0', '0', '0', '1'] };
    function shell() {
      el.innerHTML = `<div class="lab-side wide">
        <div class="lab-row"><label class="lf"><span>Size</span><select id="msz"><option value="2" ${n === 2 ? 'selected' : ''}>2 × 2</option><option value="3" ${n === 3 ? 'selected' : ''}>3 × 3</option></select></label></div>
        <div class="mats"><div><b>A</b>${grid('mA', defA[n])}</div><div><b>B</b>${grid('mB', defB[n])}</div><div><b>b</b> (for Ax = b)<div class="mgrid" id="mb" style="grid-template-columns:1fr">${Array.from({ length: n }, (_, i) => `<input value="${i + 1}">`).join('')}</div></div></div>
        <div class="lab-row">${['det A', 'A⁻¹', 'Aᵀ', 'AB', 'A+B', 'Aⁿ', 'eigen A', 'solve Ax=b'].map(o => `<button class="btn small" data-op="${o}">${o}</button>`).join('')}${field('n', '3', 'id="mn" size="2"')}</div>
        <div id="mout" class="sim-read big"></div></div>`;
      el.querySelector('#msz').onchange = e => { n = +e.target.value; shell(); };
      el.querySelectorAll('[data-op]').forEach(b => b.onclick = () => run(b.dataset.op));
    }
    const read = id => { const v = [...el.querySelectorAll(`#${id} input`)].map(i => evalExpr(i.value)); if (v.some(x => !isFinite(x))) throw new Error('Every entry must be a number or expression'); return id === 'mb' ? v : Array.from({ length: n }, (_, i) => v.slice(i * n, i * n + n)); };
    const det = A => n === 2 ? M.det2(A) : M.det3(A);
    const inv = A => { const d = det(A); if (Math.abs(d) < 1e-12) throw new Error('Singular matrix (det = 0): no inverse'); return n === 2 ? M.inv2(A) : M.adj3(A).map(r => r.map(x => x / d)); };
    const T2 = A => A[0].map((_, j) => A.map(r => r[j]));
    const mt = A => `\\begin{pmatrix}${A.map(r => r.map(texNum).join('&')).join('\\\\')}\\end{pmatrix}`;
    function eigen(A) {
      const tr = M.tr(A), d = det(A);
      const coeffs = n === 2 ? [1, -tr, d] : [1, -tr, M.det2(M.minor(A, 0, 0)) + M.det2(M.minor(A, 1, 1)) + M.det2(M.minor(A, 2, 2)), -d];
      const ls = polyRoots(coeffs).map(z => z.map(v => (Math.abs(v - Math.round(v)) < 1e-7 ? Math.round(v) : v)));
      const charTex = n === 2 ? `\\lambda^2${sgnT(-tr)}\\lambda${sgnT(d)}` : `\\lambda^3${sgnT(coeffs[1])}\\lambda^2${sgnT(coeffs[2])}\\lambda${sgnT(coeffs[3])}`;
      let html = `<p>Characteristic equation: $${charTex}=0$</p>`;
      const seen = [];
      ls.forEach(z => {
        if (seen.some(s => Math.abs(s[0] - z[0]) < 1e-6 && Math.abs(s[1] - z[1]) < 1e-6)) return; seen.push(z);
        if (Math.abs(z[1]) > 1e-9) { html += `<p>$\\lambda=${texCx(z)}$ (complex)</p>`; return; }
        const l = z[0], B = A.map((r, i) => r.map((x, j) => x - (i === j ? l : 0)));
        let v;
        if (n === 2) v = Math.abs(B[0][0]) + Math.abs(B[0][1]) > 1e-9 ? [-B[0][1], B[0][0]] : Math.abs(B[1][0]) + Math.abs(B[1][1]) > 1e-9 ? [-B[1][1], B[1][0]] : null;
        else { const cands = [V.cross(B[0], B[1]), V.cross(B[0], B[2]), V.cross(B[1], B[2])]; v = cands.sort((p, q) => V.norm(q) - V.norm(p))[0]; if (V.norm(v) < 1e-9) v = null; }
        if (v) { const big = v.reduce((m, x) => Math.abs(x) > Math.abs(m) ? x : m, 0); v = v.map(x => x / big); const small = v.filter(x => Math.abs(x) > 1e-9).reduce((m, x) => Math.min(m, Math.abs(x)), Infinity); v = v.map(x => x / small); }
        html += `<p>$\\lambda=${texNum(l)}$: eigenvector ${v ? `$\\propto${`\\begin{pmatrix}${v.map(texNum).join('\\\\')}\\end{pmatrix}`}$` : '— every vector (repeated eigenvalue with 2-D eigenspace)'}</p>`;
      });
      return html;
    }
    const sgnT = c => (c < 0 ? '-' : '+') + texNum(Math.abs(c));
    function run(op) {
      const outEl = el.querySelector('#mout');
      try {
        const A = read('mA'); let html = '';
        if (op === 'det A') html = `$\\det\\mathbf A=${texNum(det(A))}$`;
        else if (op === 'A⁻¹') html = `$\\mathbf A^{-1}=${mt(inv(A))}$<p class="muted">$\\det\\mathbf A=${texNum(det(A))}$; $\\mathbf A^{-1}=\\frac1{\\det\\mathbf A}\\operatorname{adj}\\mathbf A$</p>`;
        else if (op === 'Aᵀ') html = `$\\mathbf A^T=${mt(T2(A))}$`;
        else if (op === 'AB') html = `$\\mathbf{AB}=${mt(M.mul(A, read('mB')))}$`;
        else if (op === 'A+B') { const B = read('mB'); html = `$\\mathbf A+\\mathbf B=${mt(A.map((r, i) => r.map((x, j) => x + B[i][j])))}$`; }
        else if (op === 'Aⁿ') { const k = Math.round(evalExpr(el.querySelector('#mn').value)); const P2 = k >= 0 ? M.pow(A, k) : M.pow(inv(A), -k); html = `$\\mathbf A^{${k}}=${mt(P2)}$`; }
        else if (op === 'eigen A') html = eigen(A);
        else { const b = read('mb'), x = solveLinear(A, b); if (!x) throw new Error('det A = 0: no unique solution (sheaf, prism or parallel planes)'); html = `$\\mathbf x=\\mathbf A^{-1}\\mathbf b=\\begin{pmatrix}${x.map(texNum).join('\\\\')}\\end{pmatrix}$`; }
        outEl.innerHTML = html; labRender(outEl);
      } catch (e) { outEl.innerHTML = errBox(e.message); }
    }
    shell();
    return () => {};
  },
};

/* ---------------- Calculus ---------------- */
LAB.calculus = {
  title: 'Calculus & series', icon: '∫', desc: 'Definite and improper integrals, derivatives, Maclaurin/Taylor coefficients, limits, and sums Σ.',
  mount(el) {
    el.innerHTML = `<div class="lab-side wide">
      <div class="lab-row">${field('f(x) =', 'x^2 e^x', 'id="kf" class="wide"')}</div>
      <div class="lab-cards">
        <div class="box"><b>∫ Integral</b><div class="lab-row">${field('from', '0', 'id="ka" size="6"')}${field('to', '1', 'id="kb" size="6"')}<button class="btn small" id="kint">Integrate</button></div><p class="muted small">Use <code>inf</code> / <code>-inf</code> for improper integrals.</p></div>
        <div class="box"><b>d/dx Derivative</b><div class="lab-row">${field('at x =', '1', 'id="kx" size="6"')}<button class="btn small" id="kder">f′ and f″</button></div></div>
        <div class="box"><b>Σ Series expansion</b><div class="lab-row">${field('about x =', '0', 'id="kc" size="5"')}${field('up to power', '5', 'id="kn" size="3"')}<button class="btn small" id="kser">Expand</button></div></div>
        <div class="box"><b>lim Limit</b><div class="lab-row">${field('as x →', '0', 'id="kl" size="6"')}<button class="btn small" id="klim">Estimate</button></div></div>
        <div class="box"><b>Σ Sum</b> of g(r)<div class="lab-row">${field('g(r) =', '1/(r(r+1))', 'id="kg" size="12"')}${field('r from', '1', 'id="kr0" size="3"')}${field('to', '20', 'id="kr1" size="5"')}<button class="btn small" id="ksum">Sum</button></div></div>
      </div><div id="kout" class="sim-read big"></div></div>`;
    const out = el.querySelector('#kout'), v = id => el.querySelector('#' + id).value;
    const show = html => { out.innerHTML = html; labRender(out); };
    const F = () => fn(v('kf'), ['x']);
    const lim = s => /^-?inf(inity)?$/i.test(s.trim()) ? (s.trim().startsWith('-') ? -Infinity : Infinity) : evalExpr(s);
    const guard = f => () => { try { f(); } catch (e) { out.innerHTML = errBox(e.message); } };
    el.querySelector('#kint').onclick = guard(() => { const f = F(), a = lim(v('ka')), b = lim(v('kb')), r = integrateSmart(f, a, b), id = identify(r); const lt = x => (isFinite(x) ? texNum(x) : (x > 0 ? '\\infty' : '-\\infty'));
      show(`$\\displaystyle\\int_{${lt(a)}}^{${lt(b)}}f(x)\\,dx\\approx${num(r, 10)}$${id ? `<p>Exact form candidate: $${id.tex}$</p>` : ''}<p class="muted">Numerical (adaptive Simpson${!isFinite(a) || !isFinite(b) ? ' with substitution for infinite limits' : ''}). Divergent integrals show huge or unstable values.</p>`); });
    el.querySelector('#kder').onclick = guard(() => { const f = F(), x = evalExpr(v('kx')), h = 1e-4, d1 = (f(x - 2 * h) - 8 * f(x - h) + 8 * f(x + h) - f(x + 2 * h)) / (12 * h), d2 = (-f(x + 2 * h) + 16 * f(x + h) - 30 * f(x) + 16 * f(x - h) - f(x - 2 * h)) / (12 * h * h);
      show(`<p>$f(${texNum(x)})=${num(f(x), 10)}$</p><p>$f'(${texNum(x)})\\approx${num(d1, 9)}$${identify(d1) ? ` $=${identify(d1).tex}$` : ''}</p><p>$f''(${texNum(x)})\\approx${num(d2, 7)}$${identify(d2) ? ` $=${identify(d2).tex}$` : ''}</p>`); });
    el.querySelector('#kser').onclick = guard(() => {
      const ast = parse(v('kf'), ['x']), fc = compileComplex(ast), a = evalExpr(v('kc')), n = Math.min(14, Math.round(evalExpr(v('kn'))));
      const g = z => fc({ x: z }); let c = taylorCoeffs(g, a, n, 0.5); const c2 = taylorCoeffs(g, a, n, 0.25);
      if (c.some((x, i) => Math.abs(x - c2[i]) > 1e-6 * Math.max(1, Math.abs(x)))) c = taylorCoeffs(g, a, n, 0.1);
      if (!c.every(isFinite)) throw new Error('f is not analytic near this point (no series there)');
      const term = (k, ck) => { const id = identify(ck), cs = id ? id.tex : num(ck, 6); const base = a ? `(x${a > 0 ? '-' : '+'}${texNum(Math.abs(a))})` : 'x'; return { cs, pw: k === 0 ? '' : k === 1 ? base : `${base}^{${k}}` }; };
      const terms = c.map((ck, k) => [ck, k]).filter(([ck]) => Math.abs(ck) > 1e-10).map(([ck, k]) => { const t = term(k, ck); return (t.cs === '1' && k ? '' : t.cs === '-1' && k ? '-' : t.cs) + t.pw; });
      show(`<p>$f(x)=${terms.join('+').replace(/\+-/g, '-') || '0'}+\\cdots$</p><table class="tbl"><tr><th>power</th><th>coefficient</th><th>exact?</th></tr>${c.map((ck, k) => `<tr><td>${k}</td><td>${num(ck, 9)}</td><td>$${identify(ck) ? identify(ck).tex : '\\,'}$</td></tr>`).join('')}</table><p class="muted">Computed with the Cauchy integral formula — accurate for analytic functions.</p>`);
    });
    el.querySelector('#klim').onclick = guard(() => { const f = F(), a = evalExpr(v('kl')); const rows = [1e-2, 1e-3, 1e-4, 1e-5, 1e-6].map(h => [h, f(a - h), f(a + h)]); const L = rows[rows.length - 1], est = (L[1] + L[2]) / 2, id = identify(+est.toPrecision(7));
      show(`<table class="tbl"><tr><th>h</th><th>f(a − h)</th><th>f(a + h)</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${num(r[1], 8)}</td><td>${num(r[2], 8)}</td></tr>`).join('')}</table><p>Estimate: $\\lim_{x\\to${texNum(a)}}f(x)\\approx${num(est, 7)}$${id ? ` $=${id.tex}$?` : ''}</p><p class="muted">Both columns must agree for the limit to exist.</p>`); });
    el.querySelector('#ksum').onclick = guard(() => { const g = fn(v('kg'), ['r']), r0 = Math.round(evalExpr(v('kr0'))), r1 = Math.round(evalExpr(v('kr1'))); if (r1 - r0 > 1e6) throw new Error('Too many terms'); let s = 0; const part = []; for (let r = r0; r <= r1; r++) { s += g(r); if (r - r0 < 8 || r === r1) part.push([r, s]); } const id = identify(s);
      show(`<p>$\\displaystyle\\sum_{r=${r0}}^{${r1}}g(r)=${num(s, 12)}$${id ? ` $=${id.tex}$` : ''}</p><table class="tbl"><tr><th>n</th><th>partial sum $S_n$</th><th>exact?</th></tr>${part.map(([r, v2]) => `<tr><td>${r}</td><td>${num(v2, 10)}</td><td>$${identify(v2) ? identify(v2).tex : '\\,'}$</td></tr>`).join('')}</table><p class="muted">Use the partial sums to test a conjectured formula before proving it by induction.</p>`); });
    return () => {};
  },
};

/* ---------------- ODE solver ---------------- */
LAB.ode = {
  title: 'Differential equation solver', icon: 'dy', desc: 'Numerically solve first-order y′ = f(x, y) or second-order y″ = f(x, y, p) where p = y′. Compare with your analytic answer.',
  mount(el) {
    el.innerHTML = `<div class="lab-grid"><div class="sim-stage"></div><div class="lab-side">
      <label class="lf"><span>Order</span><select id="oo"><option value="1">first: y′ = f(x, y)</option><option value="2">second: y″ = f(x, y, p)</option></select></label>
      ${field('right-hand side', 'e^x - 2y', 'id="of" class="wide"')}
      <div class="lab-row">${field('x₀', '0', 'id="ox0" size="4"')}${field('y(x₀)', '1', 'id="oy0" size="4"')}${field("y′(x₀)", '0', 'id="op0" size="4"')}${field('to x =', '3', 'id="ox1" size="4"')}</div>
      ${field('your analytic answer y(x) = (optional, to compare)', 'e^x/3 + 2/3 e^(-2x)', 'id="oan" class="wide"')}
      <button class="btn small primary" id="ogo">Solve</button><div id="oout" class="sim-read"></div>
      <p class="muted small">Second-order example: <code>-2p - 5y + 10</code> for y″ + 2y′ + 5y = 10.</p></div></div>`;
    const P = makeCanvas(el.querySelector('.sim-stage'), 1.3), out = el.querySelector('#oout'), v = id => el.querySelector('#' + id).value;
    let sol = [], an = null;
    function solve() {
      try {
        const ord = +v('oo'), x0 = evalExpr(v('ox0')), x1 = evalExpr(v('ox1')), y0 = evalExpr(v('oy0')), p0 = evalExpr(v('op0'));
        if (ord === 1) { const f = fn(v('of'), ['x', 'y']); sol = rk4((x, Y) => [f(x, Y[0])], x0, [y0], x1, 2000); }
        else { const f = fn(v('of'), ['x', 'y', 'p']); sol = rk4((x, Y) => [Y[1], f(x, Y[0], Y[1])], x0, [y0, p0], x1, 2000); }
        an = v('oan').trim() ? fn(v('oan'), ['x']) : null;
        const rows = []; for (let k = 0; k <= 10; k++) { const idx = Math.min(sol.length - 1, Math.round(k * (sol.length - 1) / 10)); rows.push(sol[idx]); }
        out.innerHTML = `<table class="tbl"><tr><th>x</th><th>y (numerical)</th>${an ? '<th>your y</th><th>diff</th>' : ''}</tr>${rows.map(r => `<tr><td>${f3(r[0])}</td><td>${num(r[1], 8)}</td>${an ? `<td>${num(an(r[0]), 8)}</td><td class="${Math.abs(an(r[0]) - r[1]) < 1e-4 * Math.max(1, Math.abs(r[1])) ? 'ok' : 'bad'}">${(an(r[0]) - r[1]).toExponential(1)}</td>` : ''}</tr>`).join('')}</table>${an ? `<p class="muted">Green = your analytic solution matches (to 1 part in 10⁴).</p>` : ''}`;
        draw();
      } catch (e) { out.innerHTML = errBox(e.message); }
    }
    function draw() {
      const C = COL(); if (!sol.length) return; const xs = sol.map(s => s[0]), ys = sol.map(s => s[1]).filter(isFinite);
      const xmin = Math.min(...xs), xmax = Math.max(...xs), ymin = Math.min(0, ...ys), ymax = Math.max(0, ...ys), pad = (ymax - ymin) * 0.12 + 0.5;
      P.xmin = xmin - (xmax - xmin) * 0.06; P.xmax = xmax + (xmax - xmin) * 0.06; P.ymin = ymin - pad; P.ymax = ymax + pad; P.clear();
      const span = Math.max(P.xmax - P.xmin, P.ymax - P.ymin); P.grid(span > 20 ? 5 : span > 8 ? 2 : span > 3 ? 1 : 0.5, true, 'x', 'y');
      const ctx = P.ctx; ctx.strokeStyle = C.a; ctx.lineWidth = 3; ctx.beginPath(); sol.forEach((s, i) => i ? ctx.lineTo(P.X(s[0]), P.Y(s[1])) : ctx.moveTo(P.X(s[0]), P.Y(s[1]))); ctx.stroke();
      if (an) { ctx.setLineDash([6, 5]); P.curve(an, C.c, 2, xmin, xmax); ctx.setLineDash([]); }
    }
    el.querySelector('#ogo').onclick = solve; P.onresize = draw; solve();
    return () => P.destroy();
  },
};

/* ---------------- Algebra ---------------- */
LAB.algebra = {
  title: 'Polynomials & partial fractions', icon: 'x²', desc: 'Find all (complex) roots of a polynomial, factorise into real factors, and decompose N(x)/D(x) into partial fractions.',
  mount(el) {
    el.innerHTML = `<div class="lab-side wide">
      <div class="box"><b>Polynomial roots</b><p class="muted small">Coefficients from the highest power, e.g. <code>1, 0, 0, 0, 0, -1</code> for z⁵ − 1.</p>
        <div class="lab-row">${field('coefficients', '1, -6, 11, -6', 'id="pc" class="wide"')}<button class="btn small" id="pgo">Roots</button></div></div>
      <div class="box"><b>Partial fractions</b><p class="muted small">Numerator and denominator coefficients (highest power first). Repeated and quadratic factors are handled.</p>
        <div class="lab-row">${field('N(x)', '3, 0, 3', 'id="fn" class="wide"')}${field('D(x)', '1, 1, 2, 2', 'id="fd" class="wide"')}<button class="btn small" id="fgo">Decompose</button></div></div>
      <div id="aout" class="sim-read big"></div></div>`;
    const out = el.querySelector('#aout'), coeffs = id => splitTop(el.querySelector('#' + id).value).map(evalExpr);
    const show = h => { out.innerHTML = h; labRender(out); };
    const polyTex = (c, v = 'x') => { const n = c.length - 1; const t = c.map(a => (Math.abs(a - Math.round(a)) < 1e-9 ? Math.round(a) : a)).map((a, i) => [a, n - i]).filter(([a]) => Math.abs(a) > 1e-12).map(([a, p], k) => { const s = a < 0 ? '-' : (k ? '+' : ''), m = Math.abs(a), ms = (m === 1 && p) ? '' : texNum(m); return `${s}${ms}${p ? v + (p > 1 ? `^{${p}}` : '') : ''}`; }); return t.join('') || '0'; };
    function groupRoots(rs) { // -> [{re, im(>=0), mult}]
      const out2 = []; rs.forEach(z => { const g = out2.find(o => Math.hypot(o.re - z[0], o.im - Math.abs(z[1])) < 1e-4); if (g) g.cnt++; else out2.push({ re: z[0], im: Math.abs(z[1]), cnt: 1 }); });
      return out2.map(o => ({ re: Math.abs(o.re - Math.round(o.re)) < 1e-6 ? Math.round(o.re) : o.re, im: o.im < 1e-7 ? 0 : o.im, mult: o.im < 1e-7 ? o.cnt : o.cnt / 2 }));
    }
    el.querySelector('#pgo').onclick = () => { try {
      const c = coeffs('pc'); if (c.some(x => !isFinite(x))) throw new Error('Bad coefficient'); const rs = polyRoots(c), g = groupRoots(rs);
      const fac = g.map(o => o.im ? `(x^2${sgnTex(-2 * o.re)}x${sgnTex(o.re * o.re + o.im * o.im)})` : `(x${sgnTex(-o.re)})`).map((f, i) => f + (g[i].mult > 1 ? `^{${g[i].mult}}` : '')).join('');
      show(`<p>$p(x)=${polyTex(c)}$</p><p><b>Roots</b>: ${rs.map(z => `$${texCx(z)}$`).join(', ')}</p><p><b>Real factorisation</b>: $${c[0] === 1 ? '' : texNum(c[0])}${fac}$</p>`);
    } catch (e) { out.innerHTML = errBox(e.message); } };
    const sgnTex = a => (a < 0 ? '-' : '+') + texNum(Math.abs(a)).replace(/^0$/, '0');
    el.querySelector('#fgo').onclick = () => { try {
      const N = coeffs('fn'), D = coeffs('fd'); if ([...N, ...D].some(x => !isFinite(x))) throw new Error('Bad coefficient');
      const ev = (c, x) => c.reduce((s, a) => s * x + a, 0);
      // polynomial division
      let rem = N.slice(); const q = []; const dn = D.length - 1;
      while (rem.length - 1 >= dn) { const f = rem[0] / D[0]; q.push(f); for (let i = 0; i <= dn; i++) rem[i] -= f * D[i]; rem.shift(); }
      const g = groupRoots(polyRoots(D)); const basis = [];
      g.forEach(o => { for (let j = 1; j <= o.mult; j++) { if (!o.im) basis.push({ kind: 'lin', a: o.re, j, f: x => 1 / Math.pow(x - o.re, j) }); else { const qq = x => x * x - 2 * o.re * x + o.re * o.re + o.im * o.im; basis.push({ kind: 'qx', o, j, f: x => x / Math.pow(qq(x), j) }); basis.push({ kind: 'qc', o, j, f: x => 1 / Math.pow(qq(x), j) }); } } });
      const pts = basis.map((_, k) => 0.31 + 1.37 * k - 3.1 + 0.017 * k * k);
      const A = pts.map(x => basis.map(b => b.f(x))), b = pts.map(x => ev(rem.length ? rem : [0], x) / ev(D, x));
      const sol = solveLinear(A, b); if (!sol) throw new Error('Could not solve — check the denominator');
      const c = sol.map(x => (Math.abs(x) < 1e-9 ? 0 : x));
      const lead = D[0];
      const parts = []; if (q.length) parts.push(polyTex(q));
      basis.forEach((bb, k) => {
        if (bb.kind === 'lin') { if (c[k]) parts.push(`\\dfrac{${texNum(c[k])}}{${bb.a ? `(x${sgnTex(-bb.a)})` : 'x'}${bb.j > 1 ? `^{${bb.j}}` : ''}}`.replace('{(x', '{(x').replace(/\{\((x[^)]*)\)\}/, '{$1}')); }
        else if (bb.kind === 'qx') { const B = c[k], C = c[k + 1]; if (B || C) { const qt = `x^2${sgnTex(-2 * bb.o.re)}x${sgnTex(bb.o.re ** 2 + bb.o.im ** 2)}`.replace('+0x', '').replace('-0x', ''); parts.push(`\\dfrac{${polyTex([B, C])}}{${bb.j > 1 ? `(${qt})^{${bb.j}}` : qt}}`); } }
      });
      show(`<p>$\\dfrac{${polyTex(N)}}{${polyTex(D)}}\\equiv${parts.join('+').replace(/\+\\dfrac\{-/g, '-\\dfrac{') || '0'}$</p>${Math.abs(lead - 1) > 1e-12 ? '<p class="muted">Note: the denominator\'s leading coefficient is absorbed into the constants.</p>' : ''}<p class="muted">Check by recombining: pick any $x$ and compare both sides with the calculator.</p>`);
    } catch (e) { out.innerHTML = errBox(e.message); } };
    el.querySelector('#pgo').click();
    return () => {};
  },
};
