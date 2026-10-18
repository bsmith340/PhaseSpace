// Rebuilt Further Maths simulations (override earlier versions) + new ones for A2 1 spec points.
'use strict';

const tex = (el, html) => setRead(el, html);
const legend = items => `<div class="legend">${items.map(([c, l]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>`;
const steps = list => `<ol class="simsteps">${list.map(s => `<li>${s}</li>`).join('')}</ol>`;

/* ---------- Roots of zⁿ = w & polygon geometry (C3, C4) ---------- */
SIMS.roots = {
  title: 'Roots of zⁿ = w and polygon geometry', desc: 'The n roots form a regular polygon. Switch modes to see its area, the vector sum, off-centre polygons c + (v − c)ωᵏ, and reusing roots by substitution.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.15);
    let mode = 'roots', n = 5, R = 8, phi = Math.PI / 3, showSum = false, anim = false, t0 = 0;
    let c = [1.5, 1], v = [3.5, 1.5], shift = [1, 0.5];
    select(S.ctrls, 'Mode', [['roots', 'Roots of zⁿ = w (C3)'], ['area', 'Polygon area (C4)'], ['offc', 'Off-centre polygon c + (v−c)ωᵏ (C4)'], ['shift', 'Reuse roots: (u − c)ⁿ = w']], m => { mode = m; draw(); });
    slider(S.ctrls, 'n', 2, 12, 1, n, x => { n = x; draw(); }, x => x);
    slider(S.ctrls, '|w|', 1, 64, 1, R, x => { R = x; draw(); }, x => x);
    const ps = slider(S.ctrls, 'arg w (×π)', -1, 1, 1 / 12, phi / Math.PI, x => { phi = x * Math.PI; draw(); }, x => (+x).toFixed(3));
    check(S.ctrls, 'Show vector sum (roots of unity sum to 0)', false, x => { showSum = x; draw(); });
    check(S.ctrls, 'Animate arg w', false, x => { anim = x; });
    P.handles = [{ get: () => c, set: (x, y) => { if (mode === 'offc') c = [x, y]; else if (mode === 'shift') shift = [x, y]; draw(); }, snap: 0.25 }, { get: () => (mode === 'offc' ? v : [99, 99]), set: (x, y) => { v = [x, y]; draw(); }, snap: 0.25 }];
    const roots = () => { const r = Math.pow(R, 1 / n), out = []; for (let k = 0; k < n; k++) { const a = (phi + 2 * Math.PI * k) / n; out.push([r * Math.cos(a), r * Math.sin(a), a]); } return out; };
    const polyFill = (pts, col, stroke) => { const ctx = P.ctx; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1]))); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); };
    const pa = a => { let x = Math.atan2(Math.sin(a), Math.cos(a)); return x; };
    const pt = a => { const q = fracOf(pa(a) / Math.PI, 72); return q ? pf(q[0], q[1]) : num(pa(a)); };
    function draw() {
      const C = COL(); const rr = Math.pow(R, 1 / n);
      if (mode === 'roots' || mode === 'area') {
        const lim = rr * 1.45; P.view(0, 0, lim); P.clear(); P.grid(lim > 6 ? 2 : lim > 3 ? 1 : 0.5, true, 'Re', 'Im'); P.circle(0, 0, rr, C.axis, 1.2, [5, 5]);
        const pts = roots(); polyFill(pts, C.fill, C.a);
        if (mode === 'area') { const ctx = P.ctx; pts.forEach((p, i) => { const q = pts[(i + 1) % n]; ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); ctx.lineTo(P.X(p[0]), P.Y(p[1])); ctx.stroke(); }); const p0 = pts[0], p1 = pts[1 % n]; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); ctx.lineTo(P.X(p0[0]), P.Y(p0[1])); ctx.lineTo(P.X(p1[0]), P.Y(p1[1])); ctx.closePath(); ctx.fillStyle = 'rgba(255,209,102,.45)'; ctx.fill(); P.text(`2π/${n}`, (p0[0] + p1[0]) / 6, (p0[1] + p1[1]) / 6, C.fg, 2, 4, 'bold 12px system-ui'); }
        pts.forEach((p, k) => { P.dot(p[0], p[1], k === 0 ? C.c : C.a, 6); P.text('z' + k, p[0], p[1], C.text, 6, -6, '12px system-ui'); });
        if (showSum) { let s = [0, 0]; pts.forEach((p, k) => { const e = [s[0] + p[0], s[1] + p[1]]; P.arrow(s[0], s[1], e[0], e[1], [C.b, C.d][k % 2], 2); s = e; }); P.dot(s[0], s[1], C.fg, 4); }
        const A = n / 2 * rr * rr * Math.sin(2 * Math.PI / n);
        tex(S.read, `<p>$z^{${n}}=${R}e^{${f3(phi)}i}$</p><p class="hl">$z_k=${R}^{1/${n}}e^{i(${f3(phi)}+2k\\pi)/${n}}$<br>modulus $${f3(rr)}$, spacing $\\tfrac{2\\pi}{${n}}$</p>` +
          (mode === 'area' ? `<p class="hl">Area $=\\tfrac{${n}}{2}r^2\\sin\\tfrac{2\\pi}{${n}}=${f3(A)}$</p><p class="muted">${n} congruent triangles at $O$ (one shaded), each $\\tfrac12r^2\\sin\\tfrac{2\\pi}{${n}}$.</p>` : `<p>Arguments: $${pts.map(p => pt(p[2])).join(',\\ ')}$</p>`) +
          (showSum ? `<p class="muted">Placed head-to-tail, the roots close up: their sum is $0$.</p>` : ''));
      } else if (mode === 'offc') {
        const d = [v[0] - c[0], v[1] - c[1]], rad = Math.hypot(...d), lim = Math.max(4, Math.hypot(...c) + rad) * 1.15; P.view(c[0] / 2, c[1] / 2, lim); P.clear(); P.grid(1, true, 'Re', 'Im');
        const pts = []; for (let k = 0; k < n; k++) { const a = 2 * Math.PI * k / n; pts.push([c[0] + d[0] * Math.cos(a) - d[1] * Math.sin(a), c[1] + d[0] * Math.sin(a) + d[1] * Math.cos(a)]); }
        polyFill(pts, C.fill, C.a); P.circle(c[0], c[1], rad, C.axis, 1, [4, 4]);
        P.arrow(c[0], c[1], v[0], v[1], C.c, 2.5); if (n > 1) P.arrow(c[0], c[1], pts[1][0], pts[1][1], C.b, 2);
        pts.forEach((p, k) => { P.dot(p[0], p[1], k === 0 ? C.c : C.a, k === 0 ? 7 : 5); P.text(k === 0 ? 'v' : `v${k}`, p[0], p[1], C.text, 6, -6, '12px system-ui'); });
        P.dot(c[0], c[1], C.d, 7); P.text('c', c[0], c[1], C.d);
        const A = n / 2 * rad * rad * Math.sin(2 * Math.PI / n);
        tex(S.read, `<p>$c=${cstr(...c)}$, $v=${cstr(...v)}$</p><p class="hl">$v_k=c+(v-c)\\,\\omega^k$, $\\omega=e^{2\\pi i/${n}}$</p><p>Next vertex: $v_1=${cstr(...(pts[1] || v))}$</p><p>Area $=\\tfrac{${n}}2|v-c|^2\\sin\\tfrac{2\\pi}{${n}}=${f3(A)}$</p><p class="muted">Drag c (green) and v (gold). Multiplying $v-c$ by $\\omega$ rotates it about the centre.</p>`);
      } else {
        const lim = Math.max(Math.pow(R, 1 / n) + Math.hypot(...shift), 2) * 1.4; P.view(shift[0] / 2, shift[1] / 2, lim); P.clear(); P.grid(1, true, 'Re', 'Im');
        const base = roots(), moved = base.map(p => [p[0] + shift[0], p[1] + shift[1]]);
        polyFill(base, 'rgba(128,128,128,.12)', C.grid); polyFill(moved, C.fill, C.a);
        base.forEach((p, k) => { P.dot(p[0], p[1], C.grid, 4); P.line(p[0], p[1], moved[k][0], moved[k][1], C.axis, 1, [3, 3]); });
        moved.forEach(p => P.dot(p[0], p[1], C.a, 6)); P.dot(shift[0], shift[1], C.d, 7); P.text('c', shift[0], shift[1], C.d);
        tex(S.read, `<p>Known: roots $z_k$ of $z^{${n}}=${R}e^{${f3(phi)}i}$ (grey)</p><p class="hl">$(u-c)^{${n}}=w\\Rightarrow u_k=c+z_k$</p><p>$c=${cstr(...shift)}$ — drag it. The polygon is translated, not re-solved.</p><p>Sum of the new roots $=${n}c=${cstr(n * shift[0], n * shift[1])}$</p>`);
      }
    }
    const stop = loop(t => { if (!anim) { t0 = t; return; } phi += (t - t0) / 2500; t0 = t; if (phi > Math.PI) phi -= 2 * Math.PI; ps.set(phi / Math.PI); draw(); });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- De Moivre & multiple angles (C1) ---------- */
SIMS.demoivre = {
  title: "De Moivre's theorem & multiple angles", desc: 'Left: zⁿ on the Argand diagram (modulus rⁿ, argument nθ). Right: cos nθ (or sin nθ, tan nθ) overlaid with its polynomial in cos θ / sin θ / tan θ — they coincide everywhere.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('twin');
    const L = makeCanvas(S.stage, 1), Rc = makeCanvas(S.stage, 1);
    let r = 1, th = 0.5, n = 5, fnm = 'cos';
    slider(S.ctrls, 'θ', -3.14, 3.14, 0.01, th, x => { th = x; draw(); });
    slider(S.ctrls, 'r', 0.6, 1.3, 0.01, r, x => { r = x; draw(); });
    slider(S.ctrls, 'n', 2, 6, 1, n, x => { n = x; draw(); }, x => x);
    select(S.ctrls, 'Identity', [['cos', 'cos nθ in powers of cos θ'], ['sin', 'sin nθ / sin θ in powers of cos θ'], ['tan', 'tan nθ in powers of tan θ']], x => { fnm = x; draw(); });
    const binom = (a, b) => { let c = 1; for (let k = 1; k <= b; k++) c = c * (a - b + k) / k; return Math.round(c); };
    // cos nθ = Σ_{k even} C(n,k)(-1)^{k/2} c^{n-k} s^k ; as polynomial in c via s^2 = 1 - c^2
    function cosPoly(N) { const co = Array(N + 1).fill(0); for (let k = 0; k <= N; k += 2) { const b = binom(N, k) * (k / 2 % 2 ? -1 : 1); for (let j = 0; j <= k / 2; j++) co[N - k + 2 * j] += b * binom(k / 2, j) * (j % 2 ? -1 : 1); } return co; }
    function sinOverSin(N) { const co = Array(N).fill(0); for (let k = 1; k <= N; k += 2) { const b = binom(N, k) * ((k - 1) / 2 % 2 ? -1 : 1); const m = (k - 1) / 2; for (let j = 0; j <= m; j++) co[N - k + 2 * j] += b * binom(m, j) * (j % 2 ? -1 : 1); } return co; }
    const polyStr = (co, v) => co.map((a, p) => [a, p]).filter(([a]) => a).reverse().map(([a, p], i) => `${a < 0 ? '-' : i ? '+' : ''}${Math.abs(a) === 1 && p ? '' : Math.abs(a)}${p ? v + (p > 1 ? `^{${p}}` : '') : ''}`).join('');
    const tanParts = N => { const num = [], den = []; for (let k = 0; k <= N; k++) { const b = binom(N, k); if (k % 2) num.push([b * ((k - 1) / 2 % 2 ? -1 : 1), k]); else den.push([b * (k / 2 % 2 ? -1 : 1), k]); } return { num, den }; };
    const tpStr = arr => arr.map(([a, p], i) => `${a < 0 ? '-' : i ? '+' : ''}${Math.abs(a) === 1 && p ? '' : Math.abs(a)}${p ? 't' + (p > 1 ? `^{${p}}` : '') : ''}`).join('');
    function draw() {
      const C = COL();
      // Argand
      const m = Math.max(1.4, r ** n * 1.2); L.view(0, 0, m); L.clear(); L.grid(m > 2 ? 1 : 0.5, true, 'Re', 'Im'); L.circle(0, 0, 1, C.axis, 1, [4, 4]);
      const ctx = L.ctx; ctx.strokeStyle = C.fill; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const t = n * i / 200, rr = r ** t; const x = rr * Math.cos(th * t), y = rr * Math.sin(th * t); i ? ctx.lineTo(L.X(x), L.Y(y)) : ctx.moveTo(L.X(x), L.Y(y)); } ctx.stroke();
      for (let k = 1; k <= n; k++) { const rr = r ** k; L.dot(rr * Math.cos(th * k), rr * Math.sin(th * k), k === n ? C.c : C.a, k === n ? 7 : 4); }
      L.arrow(0, 0, r * Math.cos(th), r * Math.sin(th), C.a); L.text('z', r * Math.cos(th), r * Math.sin(th), C.a);
      L.arrow(0, 0, r ** n * Math.cos(n * th), r ** n * Math.sin(n * th), C.c, 3); L.text('zⁿ', r ** n * Math.cos(n * th), r ** n * Math.sin(n * th), C.c, 8, -8, 'bold 14px system-ui');
      // identity graph
      let f, g, idTex;
      if (fnm === 'cos') { const co = cosPoly(n); f = x => Math.cos(n * x); g = x => co.reduce((s, a, p) => s + a * Math.cos(x) ** p, 0); idTex = `\\cos${n}\\theta=${polyStr(co, 'c')}`; Rc.view(0, 0, Math.PI); Rc.ymin = -1.6; Rc.ymax = 1.6; }
      else if (fnm === 'sin') { const co = sinOverSin(n); f = x => Math.abs(Math.sin(x)) < 1e-9 ? n : Math.sin(n * x) / Math.sin(x); g = x => co.reduce((s, a, p) => s + a * Math.cos(x) ** p, 0); idTex = `\\frac{\\sin${n}\\theta}{\\sin\\theta}=${polyStr(co, 'c')}`; Rc.view(0, 0, Math.PI); Rc.ymin = -n - 0.5; Rc.ymax = n + 0.5; }
      else { const { num: nu, den } = tanParts(n); f = x => Math.tan(n * x); g = x => { const t = Math.tan(x); return nu.reduce((s, [a, p]) => s + a * t ** p, 0) / den.reduce((s, [a, p]) => s + a * t ** p, 0); }; idTex = `\\tan${n}\\theta=\\dfrac{${tpStr(nu)}}{${tpStr(den)}}`; Rc.view(0, 0, Math.PI / 2); Rc.ymin = -6; Rc.ymax = 6; }
      Rc.clear(); Rc.grid(1, true, 'θ', ''); Rc.curve(f, C.b, 5, Rc.xmin, Rc.xmax, 1600); Rc.curve(g, C.a, 2, Rc.xmin, Rc.xmax, 1600); Rc.line(th, Rc.ymin, th, Rc.ymax, C.c, 1, [3, 3]); if (isFinite(g(th))) Rc.dot(th, g(th), C.c, 5);
      tex(S.read, `<p>$z=${f3(r)}e^{${f3(th)}i}$, $\\ z^{${n}}=${f3(r ** n)}e^{${f3(n * th)}i}$</p><p class="hl">$[r,\\theta]^{${n}}=[r^{${n}},${n}\\theta]$</p><p class="hl">$${idTex}$</p>${legend([[C.b, 'left side (thick)'], [C.a, 'polynomial (thin)']])}<p class="muted">Where they overlap, the identity holds. Check at $\\theta=0$: both sides agree.</p>`);
    }
    L.onresize = draw; Rc.onresize = draw; draw();
    return () => { L.destroy(); Rc.destroy(); };
  },
};

/* ---------- Hyperbolic functions ---------- */
SIMS.hyperbola = {
  title: 'Hyperbolic functions from the unit hyperbola', desc: '(cosh t, sinh t) moves on x² − y² = 1 and the shaded sector has area t/2. The right panel shows the graphs; toggle the inverses and the exponential split.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('twin');
    const A = makeCanvas(S.stage, 1), G = makeCanvas(S.stage, 1);
    let t = 1, inv = false, split = false;
    slider(S.ctrls, 't', -2.5, 2.5, 0.01, t, x => { t = x; draw(); });
    check(S.ctrls, 'Graphs of the inverse functions', false, x => { inv = x; draw(); });
    check(S.ctrls, 'Show cosh = ½(eˣ+e⁻ˣ), sinh = ½(eˣ−e⁻ˣ)', false, x => { split = x; draw(); });
    function draw() {
      const C = COL(), ch = Math.cosh(t), sh = Math.sinh(t);
      A.view(2.5, 0, 4); A.clear(); A.grid(1, true, 'x', 'y'); A.circle(0, 0, 1, C.axis, 1, [4, 4]);
      A.line(-8, -8, 8, 8, C.grid, 1, [3, 3]); A.line(-8, 8, 8, -8, C.grid, 1, [3, 3]);
      const ctx = A.ctx; ctx.beginPath(); ctx.moveTo(A.X(0), A.Y(0)); for (let i = 0; i <= 100; i++) { const u = t * i / 100; ctx.lineTo(A.X(Math.cosh(u)), A.Y(Math.sinh(u))); } ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      A.param(Math.cosh, Math.sinh, -3, 3, C.a, 2.5); A.param(u => -Math.cosh(u), Math.sinh, -3, 3, C.grid, 1.5);
      A.line(0, 0, ch, sh, C.c, 2); A.line(ch, 0, ch, sh, C.b, 2, [4, 3]); A.line(0, sh, ch, sh, C.d, 2, [4, 3]); A.dot(ch, sh, C.c, 6);
      A.text('cosh t', ch / 2, 0, C.d, -10, 16); A.text('sinh t', ch, sh / 2, C.b, 6, 0);
      G.view(0, 0, 3); G.clear(); G.grid(1, true, 'x', 'y');
      if (!inv) {
        G.curve(Math.cosh, C.d, 2.5); G.curve(Math.sinh, C.b, 2.5); G.curve(Math.tanh, C.a, 2.5); G.line(-9, 1, 9, 1, C.grid, 1, [3, 3]); G.line(-9, -1, 9, -1, C.grid, 1, [3, 3]);
        if (split) { G.curve(x => Math.exp(x) / 2, C.c, 1.5); G.curve(x => Math.exp(-x) / 2, C.c, 1.5); G.curve(x => -Math.exp(-x) / 2, C.axis, 1.2); }
        G.line(t, G.ymin, t, G.ymax, C.c, 1, [2, 3]); G.dot(t, ch, C.d); G.dot(t, sh, C.b); G.dot(t, Math.tanh(t), C.a);
      } else { G.line(-9, -9, 9, 9, C.grid, 1, [3, 3]); G.curve(Math.asinh, C.b, 2.5); G.curve(Math.acosh, C.d, 2.5, 1, 9); G.curve(Math.atanh, C.a, 2.5, -0.999, 0.999); G.line(1, -9, 1, 9, C.grid, 1, [3, 3]); G.line(-1, -9, -1, 9, C.grid, 1, [3, 3]); }
      tex(S.read, `<p>$t=${f3(t)}$</p><p class="hl">$\\cosh t=${f3(ch)}$, $\\sinh t=${f3(sh)}$, $\\tanh t=${f3(Math.tanh(t))}$</p><p>$\\cosh^2t-\\sinh^2t=${f3(ch * ch - sh * sh)}$ ✓ &nbsp; $\\cosh t+\\sinh t=e^{t}=${f3(Math.exp(t))}$</p><p>Shaded sector $=\\tfrac t2=${f3(t / 2)}$ (like $\\tfrac12r^2\\theta$ for a circle)</p>${legend(inv ? [[C.b, 'arsinh x'], [C.d, 'arcosh x (x ≥ 1)'], [C.a, 'artanh x (|x| < 1)']] : [[C.d, 'cosh x'], [C.b, 'sinh x'], [C.a, 'tanh x']])}<p class="muted">$t=\\ln(\\cosh t+\\sinh t)$ — the root of every inverse-hyperbolic log formula.</p>`);
    }
    A.onresize = draw; G.onresize = draw; draw();
    return () => { A.destroy(); G.destroy(); };
  },
};

/* ---------- Induction: dominoes + step check ---------- */
SIMS.induction = {
  title: 'Induction: dominoes and the inductive step', desc: 'Choose a claim. Check the basis, then watch the inductive step S(k) + u(k+1) = S(k+1) knock each domino over. A false claim fails visibly.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 2.2);
    const CL = [
      { l: 'Σ r = ½n(n+1)', u: r => r, s: n => n * (n + 1) / 2, step: 'S_k+(k+1)=\\tfrac12(k+1)(k+2)' },
      { l: 'Σ r² = ⅙n(n+1)(2n+1)', u: r => r * r, s: n => n * (n + 1) * (2 * n + 1) / 6, step: '\\tfrac16k(k+1)(2k+1)+(k+1)^2=\\tfrac16(k+1)(k+2)(2k+3)' },
      { l: 'Σ r³ = ¼n²(n+1)²', u: r => r ** 3, s: n => n * n * (n + 1) ** 2 / 4, step: '\\tfrac14k^2(k+1)^2+(k+1)^3=\\tfrac14(k+1)^2(k+2)^2' },
      { l: 'Σ 1/(r(r+1)) = n/(n+1)', u: r => 1 / (r * (r + 1)), s: n => n / (n + 1), step: '\\tfrac{k}{k+1}+\\tfrac1{(k+1)(k+2)}=\\tfrac{k+1}{k+2}' },
      { l: '5²ⁿ − 1 divisible by 24', div: 24, f: n => 25 ** n - 1, step: 'f(k+1)=25f(k)+24' },
      { l: '2ⁿ⁺² + 3²ⁿ⁺¹ divisible by 7', div: 7, f: n => 2 ** (n + 2) + 3 ** (2 * n + 1), step: 'f(k+1)=2f(k)+7\\cdot3^{2k+1}' },
      { l: 'uₙ₊₁ = 2uₙ − 1, u₁ = 3 ⇒ uₙ = 2ⁿ + 1', rec: true, u1: 3, nxt: u => 2 * u - 1, s: n => 2 ** n + 1, step: 'u_{k+1}=2(2^k+1)-1=2^{k+1}+1' },
      { l: '✗ FALSE: Σ r² = ½n²(n+1)', u: r => r * r, s: n => n * n * (n + 1) / 2, step: '\\text{basis fails: } 1\\ne1\\ \\text{? check } n=2: 5\\ne6' },
      { l: '✗ FALSE: n² + n + 41 is always prime', prime: true, f: n => n * n + n + 41, step: '\\text{no valid step exists}' },
    ];
    let ci = 0, N = 12, fallen = 0, playing = false, last = 0;
    select(S.ctrls, 'Claim', CL.map((c, i) => [i, c.l]), x => { ci = +x; fallen = 0; draw(); });
    slider(S.ctrls, 'Dominoes shown', 6, 40, 1, N, x => { N = x; fallen = 0; draw(); }, x => x);
    button(S.ctrls, '▶ Push the first domino', () => { fallen = 0; playing = true; });
    const isP = m => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true; };
    const truth = n => { const c = CL[ci]; if (c.div) return c.f(n) % c.div === 0; if (c.prime) return isP(c.f(n)); if (c.rec) { let u = c.u1; for (let k = 1; k < n; k++) u = c.nxt(u); return u === c.s(n); } let s = 0; for (let r = 1; r <= n; r++) s += c.u(r); return Math.abs(s - c.s(n)) < 1e-9 * Math.max(1, c.s(n)); };
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear(); const W = P.w, H = P.h, gap = (W - 40) / N, hgt = Math.min(H * 0.55, gap * 3.2), base = H * 0.78;
      ctx.strokeStyle = C.axis; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(10, base); ctx.lineTo(W - 10, base); ctx.stroke();
      for (let i = 0; i < N; i++) {
        const n = i + 1, ok = truth(n), x = 24 + i * gap, down = i < fallen;
        const ang = down ? Math.min(1, fallen - i) * (ok ? 1.2 : 0) : 0;
        ctx.save(); ctx.translate(x + gap * 0.25, base); ctx.rotate(ang); ctx.fillStyle = ok ? C.a : C.bad || '#e05252'; ctx.globalAlpha = ok ? 1 : 0.85;
        ctx.fillRect(-gap * 0.12, -hgt, gap * 0.24, hgt); ctx.restore();
        ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillText(n, x + gap * 0.25, base + 14);
        if (!ok) { ctx.fillStyle = '#e05252'; ctx.fillText('✗', x + gap * 0.25, base - hgt - 6); }
      }
      const c = CL[ci], firstFail = (() => { for (let n = 1; n <= 60; n++) if (!truth(n)) return n; return 0; })();
      const tbl = [1, 2, 3, 4].map(n => { if (c.div) return `<tr><td>${n}</td><td>${c.f(n)}</td><td>${c.f(n) % c.div === 0 ? '✓' : '✗'}</td></tr>`; if (c.prime) return `<tr><td>${n}</td><td>${c.f(n)}</td><td>${isP(c.f(n)) ? 'prime ✓' : '✗'}</td></tr>`; if (c.rec) { let u = c.u1; for (let k = 1; k < n; k++) u = c.nxt(u); return `<tr><td>${n}</td><td>${u}</td><td>${c.s(n)}</td></tr>`; } let s = 0; for (let r = 1; r <= n; r++) s += c.u(r); return `<tr><td>${n}</td><td>${+s.toFixed(4)}</td><td>${+c.s(n).toFixed(4)}</td></tr>`; }).join('');
      tex(S.read, `<p class="hl">${firstFail ? `Fails at $n=${firstFail}$ — no proof is possible.` : 'True for every case checked. Induction proves it for all $n$.'}</p><table class="tbl induct"><tr><th>n</th><th>${c.div || c.prime ? 'f(n)' : c.rec ? 'uₙ (recurrence)' : 'LHS'}</th><th>${c.div ? '÷' + c.div : c.prime ? '' : c.rec ? 'formula' : 'RHS'}</th></tr>${tbl}</table><p><b>Inductive step:</b> $${c.step}$</p><p class="muted">Basis = first domino falls. Step = each domino knocks the next. ${c.prime ? 'n = 40 gives 41², a counter-example.' : ''}</p>`);
    }
    const stop = loop(t => { if (playing) { fallen += (t - last) / 220; const ff = (() => { for (let n = 1; n <= N; n++) if (!truth(n)) return n; return N + 1; })(); if (fallen >= ff - 1 + 0.999) { fallen = ff - 1 + 0.999; playing = false; } if (fallen > N) { fallen = N; playing = false; } draw(); } last = t; });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- Method of differences (telescoping) ---------- */
SIMS.telescope = {
  title: 'Method of differences: watch the terms cancel', desc: 'Each term is written as f(r) − f(r + k). Step through and the middle terms cancel in pairs, leaving only the ends.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('scroll', 'tele');
    const EX = [
      { l: 'Σ 1/(r(r+1)) = Σ [1/r − 1/(r+1)]', k: 1, f: r => `\\tfrac1{${r}}`, fv: r => 1 / r, scale: 1, scaleTex: '', res: n => `1-\\tfrac1{${n + 1}}` },
      { l: 'Σ 1/(r(r+2)) = ½Σ [1/r − 1/(r+2)]', k: 2, f: r => `\\tfrac1{${r}}`, fv: r => 1 / r, scale: 0.5, scaleTex: '\\tfrac12', res: n => `\\tfrac12\\left(1+\\tfrac12-\\tfrac1{${n + 1}}-\\tfrac1{${n + 2}}\\right)` },
      { l: 'Σ (2r+1)/(r²(r+1)²) = Σ [1/r² − 1/(r+1)²]', k: 1, f: r => `\\tfrac1{${r * r}}`, fv: r => 1 / (r * r), scale: 1, scaleTex: '', res: n => `1-\\tfrac1{${(n + 1) ** 2}}` },
      { l: 'Σ ln((r+1)/r) = Σ [ln(r+1) − ln r]', k: 1, f: r => `\\ln${r}`, fv: r => Math.log(r), scale: -1, scaleTex: '-', res: n => `\\ln${n + 1}` },
    ];
    let ei = 0, n = 6, shown = 0, playing = false, last = 0;
    select(S.ctrls, 'Series', EX.map((e, i) => [i, e.l]), x => { ei = +x; shown = 0; draw(); });
    slider(S.ctrls, 'n (terms)', 3, 12, 1, n, x => { n = x; shown = 0; draw(); }, x => x);
    button(S.ctrls, '▶ Cancel step by step', () => { shown = 0; playing = true; });
    button(S.ctrls, 'Show all cancelled', () => { shown = 999; draw(); });
    function draw() {
      const e = EX[ei];
      // term r: f(r) − f(r+k)  (for ln series sign flips: ln(r+1) − ln r = −(f(r) − f(r+1)) with f = ln)
      const rows = []; const cancelPos = new Set(), cancelNeg = new Set();
      for (let r = 1; r <= n; r++) for (let s = 1; s <= n; s++) if (s + e.k === r) { /* f(r) positive in row r cancels −f(s+k) in row s */ if (Math.min(r, s) < shown + 1 || shown >= 999) { cancelPos.add(r); cancelNeg.add(s); } }
      for (let r = 1; r <= n; r++) rows.push(`<div class="trow"><span class="tidx">r=${r}</span><span class="tt ${cancelPos.has(r) ? 'x' : ''}">$+${e.f(r)}$</span><span class="tt neg ${cancelNeg.has(r) ? 'x' : ''}">$-${e.f(r + e.k)}$</span></div>`);
      const sum = e.scale * Array.from({ length: n }, (_, i) => e.fv(i + 1) - e.fv(i + 1 + e.k)).reduce((a, b) => a + b, 0);
      S.stage.innerHTML = `<div class="tbox">${e.scaleTex ? `<p class="muted">(all inside a factor $${e.scaleTex}$)</p>` : ''}${rows.join('')}</div>`;
      renderMath(S.stage);
      tex(S.read, `<p class="hl">Survivors: the first ${e.k} positive term${e.k > 1 ? 's' : ''} and the last ${e.k} negative term${e.k > 1 ? 's' : ''}.</p><p>$\\displaystyle\\sum_{r=1}^{${n}}=${e.res(n)}=${f3(sum)}$</p><p class="muted">As $n\\to\\infty$ the negative survivors ${ei === 3 ? 'grow — this series diverges.' : '→ 0, giving the sum to infinity.'}</p>`);
    }
    const stop = loop(t => { if (playing) { if (t - last > 650) { shown++; last = t; draw(); if (shown > n) playing = false; } } else last = t; });
    draw();
    return () => stop();
  },
};

/* ---------- Partial fractions: the pieces add up ---------- */
SIMS.pfrac = {
  title: 'Partial fractions: the pieces add up', desc: 'The thick curve is the original fraction; thin curves are its partial fractions. Toggle pieces — only their sum reproduces the original, including the vertical asymptotes.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    const EX = [
      { l: '(5x+1)/((x−1)(x+2)) = 2/(x−1) + 3/(x+2)', f: x => (5 * x + 1) / ((x - 1) * (x + 2)), parts: [[x => 2 / (x - 1), '\\frac{2}{x-1}'], [x => 3 / (x + 2), '\\frac{3}{x+2}']], tex: '\\frac{5x+1}{(x-1)(x+2)}' },
      { l: '1/(x(x+1)²) = 1/x − 1/(x+1) − 1/(x+1)²', f: x => 1 / (x * (x + 1) ** 2), parts: [[x => 1 / x, '\\frac1x'], [x => -1 / (x + 1), '-\\frac1{x+1}'], [x => -1 / (x + 1) ** 2, '-\\frac1{(x+1)^2}']], tex: '\\frac1{x(x+1)^2}' },
      { l: '(2x²−x+3)/((x−1)(x²+1)) = 2/(x−1) − 1/(x²+1)', f: x => (2 * x * x - x + 3) / ((x - 1) * (x * x + 1)), parts: [[x => 2 / (x - 1), '\\frac2{x-1}'], [x => -1 / (x * x + 1), '-\\frac1{x^2+1}']], tex: '\\frac{2x^2-x+3}{(x-1)(x^2+1)}' },
      { l: '(x²+3x+4)/((x+1)(x+2)) = 1 + 2/(x+1) − 2/(x+2)', f: x => (x * x + 3 * x + 4) / ((x + 1) * (x + 2)), parts: [[() => 1, '1'], [x => 2 / (x + 1), '\\frac2{x+1}'], [x => -2 / (x + 2), '-\\frac2{x+2}']], tex: '\\frac{x^2+3x+4}{(x+1)(x+2)}' },
    ];
    let ei = 0, on = [true, true, true], x0 = 0.5;
    const ctrl = document.createElement('div');
    select(S.ctrls, 'Example', EX.map((e, i) => [i, e.l]), x => { ei = +x; on = [true, true, true]; buildToggles(); draw(); });
    S.ctrls.append(ctrl);
    slider(S.ctrls, 'Test x', -4, 4, 0.05, x0, x => { x0 = x; draw(); });
    function buildToggles() { ctrl.innerHTML = ''; EX[ei].parts.forEach((p, i) => check(ctrl, `Piece ${i + 1}: ${p[1].replace(/\\frac\{?([^}]*)\}?\{([^}]*)\}/g, '$1/($2)').replace(/\\/g, '')}`, true, v => { on[i] = v; draw(); })); }
    function draw() {
      const C = COL(), e = EX[ei], cols = [C.b, C.c, C.d]; P.view(0, 0, 5); P.clear(); P.grid(1, true);
      e.parts.forEach((p, i) => { if (on[i]) P.curve(p[0], cols[i], 1.8, P.xmin, P.xmax, 1600); });
      const sum = x => e.parts.reduce((s, p, i) => s + (on[i] ? p[0](x) : 0), 0);
      P.curve(e.f, C.a, 5, P.xmin, P.xmax, 1600); P.curve(sum, C.fg, 1.5, P.xmin, P.xmax, 1600);
      P.line(x0, P.ymin, x0, P.ymax, C.grid, 1, [3, 3]); if (isFinite(e.f(x0))) P.dot(x0, e.f(x0), C.a, 5);
      const all = on.slice(0, e.parts.length).every(Boolean);
      tex(S.read, `<p>$${e.tex}\\equiv${e.parts.map(p => p[1]).join('+').replace(/\+-/g, '-')}$</p><p class="hl">At $x=${f3(x0)}$: original $=${f3(e.f(x0))}$, sum of selected pieces $=${f3(sum(x0))}$ ${all ? '✓' : '(turn all pieces on to match)'}</p>${legend([[C.a, 'original (thick)'], [C.fg, 'sum of selected'], ...e.parts.map((p, i) => [cols[i], 'piece ' + (i + 1)])])}<p class="muted">Each linear factor gives a vertical asymptote; each piece carries one of them.</p>`);
    }
    buildToggles(); P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Improper integrals ---------- */
SIMS.improper = {
  title: 'Improper integrals: does the area settle?', desc: 'Slide the upper limit t (or lower limit towards 0) and watch the area. For p > 1 on [1, ∞) it approaches 1/(p − 1); for p ≤ 1 it grows without bound.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let typ = 'inf', p = 2, t = 5;
    const st = slider(S.ctrls, 'Limit t', 1.05, 60, 0.05, t, x => { t = x; draw(); });
    select(S.ctrls, 'Integral', [['inf', '∫₁ᵗ x⁻ᵖ dx  (t → ∞)'], ['zero', '∫ₜ¹ x⁻ᵖ dx  (t → 0⁺)'], ['exp', '∫₀ᵗ x e⁻ˣ dx  (t → ∞)']], x => { typ = x; if (x === 'zero') { st.inp.min = 0.001; st.inp.max = 0.95; st.inp.step = 0.001; t = 0.2; } else { st.inp.min = 1.05; st.inp.max = 60; st.inp.step = 0.05; t = 5; } st.set(t); draw(); });
    slider(S.ctrls, 'p', 0.3, 3, 0.05, p, x => { p = x; draw(); });
    function draw() {
      const C = COL(); let f, a, b, val, lim, limTex;
      if (typ === 'inf') { f = x => Math.pow(x, -p); a = 1; b = t; val = Math.abs(p - 1) < 1e-9 ? Math.log(t) : (Math.pow(t, 1 - p) - 1) / (1 - p); lim = p > 1 ? 1 / (p - 1) : Infinity; limTex = p > 1 ? `\\frac1{p-1}=${f3(lim)}` : '\\infty\\ (\\text{diverges})'; P.xmin = 0; P.xmax = Math.max(6, Math.min(t * 1.1, 62)); P.ymin = -0.2; P.ymax = 1.6; }
      else if (typ === 'zero') { f = x => Math.pow(x, -p); a = t; b = 1; val = Math.abs(p - 1) < 1e-9 ? -Math.log(t) : (1 - Math.pow(t, 1 - p)) / (1 - p); lim = p < 1 ? 1 / (1 - p) : Infinity; limTex = p < 1 ? `\\frac1{1-p}=${f3(lim)}` : '\\infty\\ (\\text{diverges})'; P.xmin = -0.1; P.xmax = 1.5; P.ymin = -0.5; P.ymax = 8; }
      else { f = x => x * Math.exp(-x); a = 0; b = t; val = 1 - Math.exp(-t) * (t + 1); lim = 1; limTex = '1'; P.xmin = -0.3; P.xmax = Math.max(8, Math.min(t * 1.1, 62)); P.ymin = -0.1; P.ymax = 0.6; }
      P.clear(); P.grid(P.xmax > 20 ? 5 : P.xmax > 4 ? 1 : 0.25, true);
      const ctx = P.ctx; ctx.beginPath(); ctx.moveTo(P.X(a), P.Y(0)); for (let i = 0; i <= 400; i++) { const x = a + (b - a) * i / 400, y = f(x); ctx.lineTo(P.X(x), P.Y(Math.min(y, P.ymax * 2))); } ctx.lineTo(P.X(b), P.Y(0)); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      P.curve(f, C.a, 2.5, Math.max(P.xmin, 0.0005), P.xmax, 1600);
      tex(S.read, `<p class="hl">Area so far $=${f3(val)}$</p><p>Limit: $${limTex}$</p><p>${isFinite(lim) ? `Gap to the limit: $${sci(lim - val)}$ — it closes as $t$ moves.` : 'The area keeps growing — no finite limit.'}</p><p class="muted">Write the problem limit as $t$, integrate, then take $\\lim$. ${typ === 'exp' ? 'Key fact: $te^{-t}\\to0$.' : 'This is the p-test.'}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Polar: add area-by-sectors mode by wrapping the old sim ---------- */
const OLD_POLAR = SIMS.polar;
SIMS.polar = {
  title: 'Polar curves: tracing, area by sectors, tangents', desc: 'Trace r(θ), approximate the area with N thin sectors (½r²δθ each) and see it converge to ½∫r²dθ; mark tangents parallel/perpendicular to the initial line.',
  mount(el, opt) {
    const wrap = document.createElement('div'); el.append(wrap);
    const sec = document.createElement('div'); sec.className = 'card simcard inner'; el.append(sec);
    sec.innerHTML = '<h3>Area as a sum of sectors</h3><p class="muted">Why ½∫r²dθ: each slice is approximately a sector of radius r and angle δθ.</p>';
    const S = simShell(sec), P = makeCanvas(S.stage, 1.25);
    let a = 2, Nn = 8, be = Math.PI;
    slider(S.ctrls, 'Number of sectors N', 2, 120, 1, Nn, x => { Nn = x; draw(); }, x => x);
    slider(S.ctrls, 'β (×π)', 0.1, 2, 0.05, 1, x => { be = x * Math.PI; draw(); }, x => (+x).toFixed(2));
    slider(S.ctrls, 'a', 0.5, 3, 0.1, a, x => { a = x; draw(); });
    const r = t => a * (1 + Math.cos(t));
    function draw() {
      const C = COL(); P.view(1.5, 0, 4.5); P.clear(); P.grid(1, true);
      const ctx = P.ctx, d = be / Nn; let sum = 0;
      for (let i = 0; i < Nn; i++) { const t = (i + 0.5) * d, rr = r(t); sum += 0.5 * rr * rr * d; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); ctx.arc(P.X(0), P.Y(0), Math.abs(P.X(rr) - P.X(0)), -(i * d), -((i + 1) * d), true); ctx.closePath(); ctx.fillStyle = i % 2 ? 'rgba(124,156,255,.28)' : 'rgba(255,209,102,.32)'; ctx.fill(); ctx.strokeStyle = C.grid; ctx.lineWidth = 0.8; ctx.stroke(); }
      P.param(t => r(t) * Math.cos(t), t => r(t) * Math.sin(t), 0, 2 * Math.PI, C.a, 2.5, 800);
      const exact = 0.5 * a * a * (1.5 * be + 2 * Math.sin(be) + 0.25 * Math.sin(2 * be));
      tex(S.read, `<p>$r=${f3(a)}(1+\\cos\\theta)$, $0\\le\\theta\\le${f3(be)}$</p><p class="hl">Sum of ${Nn} sectors $\\sum\\tfrac12r^2\\delta\\theta=${f3(sum)}$</p><p>Exact $\\tfrac12\\int_0^{\\beta}r^2d\\theta=${f3(exact)}$</p><p>Error $=${sci(Math.abs(sum - exact))}$ → 0 as $N\\to\\infty$.</p>`);
    }
    P.onresize = draw; draw();
    const c1 = OLD_POLAR.mount(wrap, opt);
    return () => { c1(); P.destroy(); };
  },
};

/* ---------- Argand: add [r, θ] readouts ---------- */
const OLD_ARGAND = SIMS.argand;
SIMS.argand.desc = 'Drag z and w. Moduli multiply and arguments add — the product zw = [|z||w|, arg z + arg w] in CCEA notation.';
