// Maths AS 1 simulations.
'use strict';

/* ---------- Quadratics ---------- */
SIMS.m_quadratic = {
  title: 'Quadratics: vertex, roots & discriminant', desc: 'y = ax² + bx + c with its completed-square form, roots and discriminant. Add a line to see simultaneous equations and tangency.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let a = 1, b = -2, c = -3, line = false, m = 1, k = 0, ineq = false;
    slider(S.ctrls, 'a', -3, 3, 0.1, a, x => { a = Math.abs(x) < 0.05 ? 0.1 : x; draw(); }, x => (+x).toFixed(1));
    slider(S.ctrls, 'b', -8, 8, 0.1, b, x => { b = x; draw(); }, x => (+x).toFixed(1));
    slider(S.ctrls, 'c', -8, 8, 0.1, c, x => { c = x; draw(); }, x => (+x).toFixed(1));
    check(S.ctrls, 'Shade where y < 0 (inequality)', false, x => { ineq = x; draw(); });
    check(S.ctrls, 'Add line y = mx + k', false, x => { line = x; draw(); });
    slider(S.ctrls, 'm', -5, 5, 0.1, m, x => { m = x; draw(); }, x => (+x).toFixed(1));
    slider(S.ctrls, 'k', -8, 8, 0.1, k, x => { k = x; draw(); }, x => (+x).toFixed(1));
    const f = x => a * x * x + b * x + c;
    function draw() {
      const C = COL(), D = b * b - 4 * a * c, vx = -b / (2 * a), vy = c - b * b / (4 * a); P.view(0, 0, 7); P.clear(); P.grid(1, true);
      const rts = D >= 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((p, q) => p - q) : [];
      if (ineq) { const ctx = P.ctx; ctx.fillStyle = C.fill; for (let px = 0; px < P.w; px += 2) { const x = P.ix(px); if (f(x) < 0) ctx.fillRect(px, P.Y(0), 2, P.Y(f(x)) - P.Y(0)); } }
      P.line(vx, P.ymin, vx, P.ymax, C.grid, 1, [4, 4]); P.curve(f, C.a, 3);
      P.dot(vx, vy, C.c, 6); P.text(`(${f3(vx)}, ${f3(vy)})`, vx, vy, C.text, 8, a > 0 ? 16 : -8, '12px system-ui');
      rts.forEach(r => P.dot(r, 0, C.b, 6)); P.dot(0, c, C.d, 5);
      let lineTxt = '';
      if (line) { P.curve(x => m * x + k, C.d, 2.2); const B = b - m, Cc = c - k, DD = B * B - 4 * a * Cc; const xs = DD >= 0 ? [(-B - Math.sqrt(DD)) / (2 * a), (-B + Math.sqrt(DD)) / (2 * a)] : []; xs.forEach(x => P.dot(x, m * x + k, C.fg, 5));
        lineTxt = `<p>Line: substitute → $${ex([a, 'x^2'], [B, 'x'], [Cc])}=0$, discriminant $${f3(DD)}$: <b>${Math.abs(DD) < 0.05 ? 'tangent (one point)' : DD > 0 ? 'meets twice' : 'misses'}</b></p>`; }
      setRead(S.read, `<p>$y=${ex([a, 'x^2'], [b, 'x'], [c])}$</p><p class="hl">$=${cf(a)}${Math.abs(vx) < 5e-4 ? 'x' : `\\left(x${tm(-vx)}\\right)`}^2${tm(vy)}$</p><p>Vertex $(${f3(vx)},${f3(vy)})$, line of symmetry $x=${f3(vx)}$</p><p>$b^2-4ac=${f3(D)}$: ${D > 0.0001 ? 'two real roots' : Math.abs(D) <= 0.0001 ? 'one repeated root' : 'no real roots'}${rts.length ? ` $x=${rts.map(f3).join(',\\ ')}$` : ''}</p>${ineq && rts.length ? `<p>$y\\lt0$ ${a > 0 ? `for $${f3(rts[0])}\\lt x\\lt${f3(rts[1])}$` : `for $x\\lt${f3(rts[0])}$ or $x\\gt${f3(rts[1])}$`}</p>` : ''}${lineTxt}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Transformations ---------- */
SIMS.m_transform = {
  title: 'Graph transformations y = a f(b(x − c)) + d', desc: 'Change one parameter at a time and watch the key points move. The dashed curve is y = f(x).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    const BASES = { cubic: [x => x ** 3 - 3 * x, 'x^3-3x', [[-1, 2], [1, -2], [0, 0]]], quad: [x => x * x, 'x^2', [[0, 0], [1, 1], [-1, 1]]], sin: [x => Math.sin(x), '\\sin x', [[Math.PI / 2, 1], [-Math.PI / 2, -1], [0, 0]]], recip: [x => 1 / x, '\\frac1x', [[1, 1], [-1, -1]]], exp: [x => Math.exp(x), 'e^x', [[0, 1], [1, Math.E]]], abs: [x => Math.abs(x), '|x|', [[0, 0], [1, 1], [-1, 1]]] };
    let key = 'cubic', a = 1, b = 1, c = 0, d = 0;
    select(S.ctrls, 'f(x)', Object.entries(BASES).map(([k, v]) => [k, v[1].replace(/\\frac1x/, '1/x').replace(/\\sin x/, 'sin x').replace(/\^3/, '³').replace(/\^2/, '²').replace(/\^x/, 'ˣ')]), x => { key = x; draw(); });
    const sa = slider(S.ctrls, 'a (vertical stretch)', -3, 3, 0.1, a, x => { a = x; draw(); }, x => (+x).toFixed(1));
    const sb = slider(S.ctrls, 'b (horizontal stretch ×1/b)', -3, 3, 0.1, b, x => { b = Math.abs(x) < 0.05 ? 0.1 : x; draw(); }, x => (+x).toFixed(1));
    const sc = slider(S.ctrls, 'c (shift right)', -4, 4, 0.1, c, x => { c = x; draw(); }, x => (+x).toFixed(1));
    const sd = slider(S.ctrls, 'd (shift up)', -4, 4, 0.1, d, x => { d = x; draw(); }, x => (+x).toFixed(1));
    button(S.ctrls, 'Reset', () => { a = 1; b = 1; c = 0; d = 0; [sa, sb, sc, sd].forEach((s, i) => s.set([1, 1, 0, 0][i])); draw(); });
    function draw() {
      const C = COL(), [f, ft, pts] = BASES[key], g = x => a * f(b * (x - c)) + d; P.view(0, 0, 6); P.clear(); P.grid(1, true);
      const ctx = P.ctx; ctx.setLineDash([6, 5]); P.curve(f, C.axis, 2, P.xmin, P.xmax, 1200); ctx.setLineDash([]);
      P.curve(g, C.a, 3, P.xmin, P.xmax, 1200);
      pts.forEach(([x, y]) => { const X = x / b + c, Y = a * y + d; P.dot(x, y, C.axis, 4); P.dot(X, Y, C.c, 6); P.line(x, y, X, Y, C.grid, 1, [2, 3]); P.text(`(${f3(X)}, ${f3(Y)})`, X, Y, C.text, 6, -6, '11px system-ui'); });
      const desc = []; if (a !== 1) desc.push(a < 0 ? `reflect in the $x$-axis${Math.abs(a) !== 1 ? ` and stretch ×${f3(Math.abs(a))}` : ''} (vertical)` : `stretch ×${f3(a)} parallel to the $y$-axis`); if (b !== 1) desc.push(b < 0 ? `reflect in the $y$-axis${Math.abs(b) !== 1 ? ` and stretch ×${f3(1 / Math.abs(b))}` : ''} (horizontal)` : `stretch ×${f3(1 / b)} parallel to the $x$-axis`); if (c) desc.push(`translate ${f3(c)} in $x$`); if (d) desc.push(`translate ${f3(d)} in $y$`);
      setRead(S.read, `<p>$f(x)=${ft}$</p><p class="hl">$y=${cf(a)}f\\big(${Math.abs(c) < 5e-4 ? cf(b) + 'x' : `${cf(b)}${Math.abs(b - 1) < 5e-4 ? '' : '('}x${tm(-c)}${Math.abs(b - 1) < 5e-4 ? '' : ')'}`}\\big)${tm(d)}$</p><p>${desc.length ? desc.join(', then ') : 'No transformation.'}</p><p class="muted">Point $(x,y)\\mapsto\\left(\\tfrac xb+c,\\ ay+d\\right)$. Inside the bracket acts on $x$ "backwards".</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Circles ---------- */
SIMS.m_circle = {
  title: 'Circles, chords & tangents', desc: 'Drag the centre and the point P on the circle. The tangent at P is perpendicular to the radius; a line meets the circle 0, 1 or 2 times.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let cen = [1, 1], r = 3, ang = 0.6, m = 0.5, k = 3, showLine = true;
    slider(S.ctrls, 'radius r', 0.5, 6, 0.1, r, x => { r = x; draw(); });
    slider(S.ctrls, 'P angle', -3.14, 3.14, 0.01, ang, x => { ang = x; draw(); });
    check(S.ctrls, 'Line y = mx + k', true, x => { showLine = x; draw(); });
    slider(S.ctrls, 'm', -4, 4, 0.1, m, x => { m = x; draw(); }, x => (+x).toFixed(1));
    slider(S.ctrls, 'k', -8, 8, 0.1, k, x => { k = x; draw(); }, x => (+x).toFixed(1));
    P.handles = [{ get: () => cen, set: (x, y) => { cen = [x, y]; draw(); }, snap: 0.5 }];
    function draw() {
      const C = COL(), [a, b] = cen, Px = a + r * Math.cos(ang), Py = b + r * Math.sin(ang); P.view(0, 0, 8); P.clear(); P.grid(1, true);
      P.circle(a, b, r, C.a, 2.5); P.dot(a, b, C.d, 7); P.text('C', a, b, C.d); P.line(a, b, Px, Py, C.b, 2); P.dot(Px, Py, C.c, 6); P.text('P', Px, Py, C.c);
      const tx = -Math.sin(ang), ty = Math.cos(ang); P.line(Px - 9 * tx, Py - 9 * ty, Px + 9 * tx, Py + 9 * ty, C.c, 2);
      const g = -a, fh = -b, cc = a * a + b * b - r * r;
      let lt = '';
      if (showLine) { P.curve(x => m * x + k, C.d, 2); const A = 1 + m * m, B = 2 * (m * (k - b) - a), Cq = a * a + (k - b) ** 2 - r * r, D = B * B - 4 * A * Cq; if (D >= 0) [(-B - Math.sqrt(D)) / (2 * A), (-B + Math.sqrt(D)) / (2 * A)].forEach(x => P.dot(x, m * x + k, C.fg, 5)); lt = `<p>Line: discriminant after substitution $=${f3(D)}$ → <b>${Math.abs(D) < 0.3 ? 'tangent' : D > 0 ? 'two intersections (chord)' : 'no intersection'}</b></p>`; }
      const mr = Math.abs(Px - a) < 1e-9 ? Infinity : (Py - b) / (Px - a), mt = Math.abs(ty) < 1e-9 ? Infinity : ty / tx;
      setRead(S.read, `<p class="hl">$(x${a < 0 ? '+' : '-'}${f3(Math.abs(a))})^2+(y${b < 0 ? '+' : '-'}${f3(Math.abs(b))})^2=${f3(r * r)}$</p><p>Expanded: $x^2+y^2${2 * g < 0 ? '-' : '+'}${f3(Math.abs(2 * g))}x${2 * fh < 0 ? '-' : '+'}${f3(Math.abs(2 * fh))}y${cc < 0 ? '-' : '+'}${f3(Math.abs(cc))}=0$</p><p>$P(${f3(Px)},${f3(Py)})$: gradient of $CP=${isFinite(mr) ? f3(mr) : '\\infty'}$, tangent gradient $=${isFinite(mt) ? f3(mt) : '\\infty'}$${isFinite(mr) && isFinite(mt) ? `, product $=${f3(mr * mt)}$` : ''}</p>${lt}<p class="muted">Drag the centre C.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Binomial ---------- */
SIMS.m_binomial = {
  title: "Binomial expansion & Pascal's triangle", desc: 'Pick n, a and b to expand (a + bx)ⁿ. Click a coefficient to see where its ⁿCᵣ comes from.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('scroll');
    let n = 5, a = 1, b = 2, hl = 2;
    slider(S.ctrls, 'n', 1, 12, 1, n, x => { n = x; hl = Math.min(hl, n); draw(); }, x => x);
    slider(S.ctrls, 'a', -3, 3, 1, a, x => { a = x; draw(); }, x => x);
    slider(S.ctrls, 'b', -3, 3, 0.5, b, x => { b = x; draw(); }, x => x);
    const C2_ = (N, R) => { let c = 1; for (let i = 1; i <= R; i++) c = c * (N - R + i) / i; return Math.round(c); };
    function draw() {
      let tri = '<div class="pascal">'; for (let row = 0; row <= n; row++) { tri += '<div class="prow">' + Array.from({ length: row + 1 }, (_, r) => `<span class="pc ${row === n && r === hl ? 'on' : row === n ? 'last' : ''}" data-r="${r}">${C2_(row, r)}</span>`).join('') + '</div>'; } tri += '</div>';
      const coefs = Array.from({ length: n + 1 }, (_, r) => C2_(n, r) * a ** (n - r) * b ** r);
      S.stage.innerHTML = tri; S.stage.querySelectorAll('.prow:last-child .pc').forEach(s => s.onclick = () => { hl = +s.dataset.r; draw(); });
      const terms = coefs.map((cf, r) => [cf, r]).filter(([cf]) => cf).map(([cf, r], i) => `${cf < 0 ? '-' : i ? '+' : ''}${Math.abs(cf) === 1 && r ? '' : nice(Math.abs(cf))}${r ? 'x' + (r > 1 ? `^{${r}}` : '') : ''}`).join('');
      setRead(S.read, `<p>$(${a}${b < 0 ? '-' : '+'}${nice(Math.abs(b))}x)^{${n}}=${terms}$</p><p class="hl">Term in $x^{${hl}}$: $\\binom{${n}}{${hl}}(${a})^{${n - hl}}(${nice(b)})^{${hl}}=${C2_(n, hl)}\\times${a ** (n - hl)}\\times${nice(b ** hl)}=${nice(coefs[hl])}$</p><p class="muted">Each number in Pascal's triangle is the sum of the two above it: $\\binom{n}{r}=\\binom{n-1}{r-1}+\\binom{n-1}{r}$.</p>`);
    }
    draw();
    return () => {};
  },
};

/* ---------- Triangles ---------- */
SIMS.m_triangle = {
  title: 'Sine rule, cosine rule & the ambiguous case', desc: 'Drag the vertices to explore any triangle. In "ambiguous case" mode, fix A, a and b and see when two different triangles fit.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.35);
    let mode = 'free', Av = [-3, -1.5], Bv = [3, -1.5], Cv = [0.5, 2.5], Ad = 35, sa = 3.2, sb = 5;
    select(S.ctrls, 'Mode', [['free', 'Free triangle (drag vertices)'], ['amb', 'Ambiguous case (SSA)']], x => { mode = x; draw(); });
    slider(S.ctrls, 'A (°) [ambiguous mode]', 10, 80, 1, Ad, x => { Ad = x; draw(); }, x => x);
    slider(S.ctrls, 'a (side opposite A)', 1, 7, 0.1, sa, x => { sa = x; draw(); });
    slider(S.ctrls, 'b (side AC)', 1, 7, 0.1, sb, x => { sb = x; draw(); });
    P.handles = [Av, Bv, Cv].map(v => ({ get: () => v, set: (x, y) => { if (mode === 'free') { v[0] = x; v[1] = y; draw(); } }, snap: 0.1 }));
    const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
    const angAt = (p, q, r) => { const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]]; return Math.acos(Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v))))) * 180 / Math.PI; };
    const tri = (pts, col) => { const ctx = P.ctx; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1]))); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = COL().a; ctx.lineWidth = 2.5; ctx.stroke(); };
    function draw() {
      const C = COL(); P.view(0, 0.5, 6); P.clear(); P.grid(1, false);
      if (mode === 'free') {
        tri([Av, Bv, Cv], C.fill); [[Av, 'A'], [Bv, 'B'], [Cv, 'C']].forEach(([p, l]) => { P.dot(p[0], p[1], C.c, 7); P.text(l, p[0], p[1], C.fg, 8, -8, 'bold 14px system-ui'); });
        const a = dist(Bv, Cv), b = dist(Av, Cv), c = dist(Av, Bv), A = angAt(Av, Bv, Cv), B = angAt(Bv, Av, Cv), Cg = 180 - A - B, area = 0.5 * a * b * Math.sin(Cg * Math.PI / 180);
        setRead(S.read, `<p>$a=${f3(a)},\\ b=${f3(b)},\\ c=${f3(c)}$</p><p>$A=${A.toFixed(1)}^\\circ,\\ B=${B.toFixed(1)}^\\circ,\\ C=${Cg.toFixed(1)}^\\circ$</p><p class="hl">Sine rule: $\\frac{a}{\\sin A}=${f3(a / Math.sin(A * Math.PI / 180))}$, $\\frac{b}{\\sin B}=${f3(b / Math.sin(B * Math.PI / 180))}$, $\\frac{c}{\\sin C}=${f3(c / Math.sin(Cg * Math.PI / 180))}$ — all equal</p><p>Cosine rule: $a^2=${f3(a * a)}$, $b^2+c^2-2bc\\cos A=${f3(b * b + c * c - 2 * b * c * Math.cos(A * Math.PI / 180))}$</p><p>Area $\\tfrac12ab\\sin C=${f3(area)}$</p>`);
      } else {
        const Ar = Ad * Math.PI / 180, A0 = [-4, -1.5], Cpt = [A0[0] + sb * Math.cos(Ar), A0[1] + sb * Math.sin(Ar)];
        P.line(A0[0], A0[1], A0[0] + 11, A0[1], C.axis, 1.5); P.line(A0[0], A0[1], Cpt[0], Cpt[1], C.a, 2.5); P.circle(Cpt[0], Cpt[1], sa, C.grid, 1.2, [4, 4]);
        const h = sb * Math.sin(Ar); let Bs = [];
        if (sa >= h - 1e-9) { const dx = Math.sqrt(Math.max(0, sa * sa - h * h)); Bs = [Cpt[0] - dx, Cpt[0] + dx].filter(x => x > A0[0] + 1e-6).map(x => [x, A0[1]]); if (dx < 1e-6) Bs = Bs.slice(0, 1); }
        const cols = ['rgba(124,156,255,.25)', 'rgba(255,209,102,.3)']; Bs.forEach((B, i) => tri([A0, B, Cpt], cols[i]));
        Bs.forEach((B, i) => { P.dot(B[0], B[1], C.c, 6); P.text(i ? 'B₂' : 'B₁', B[0], B[1], C.fg, 4, 16); });
        P.dot(A0[0], A0[1], C.d, 6); P.text('A', A0[0], A0[1], C.fg, -16, 4); P.dot(Cpt[0], Cpt[1], C.d, 6); P.text('C', Cpt[0], Cpt[1], C.fg);
        const sB = sb * Math.sin(Ar) / sa, angs = Bs.map(B => angAt(B, A0, Cpt));
        setRead(S.read, `<p>Given $A=${Ad}^\\circ$, $a=${f3(sa)}$, $b=${f3(sb)}$</p><p>$\\sin B=\\frac{b\\sin A}{a}=${f3(sB)}$</p><p class="hl">${sB > 1 + 1e-9 ? 'sin B > 1: <b>no triangle</b> (a is shorter than the height b sin A).' : Bs.length === 2 ? `<b>Two triangles</b>: $B=${angs[0].toFixed(1)}^\\circ$ or $${angs[1].toFixed(1)}^\\circ$ (supplementary)` : `<b>One triangle</b>: $B=${(angs[0] || 90).toFixed(1)}^\\circ$`}</p><p class="muted">The dashed circle (radius a about C) cuts the base line in 0, 1 or 2 points.</p>`);
      }
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Unit circle & trig equations ---------- */
SIMS.m_unitcircle = {
  title: 'Unit circle, trig graphs & solving equations', desc: 'The angle on the unit circle drives the graph. Set k to solve sin x = k, cos x = k or tan x = k over 0°–360°: every solution is marked, with CAST shown.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('twin');
    const U = makeCanvas(S.stage, 1), G = makeCanvas(S.stage, 1);
    let th = 40, fnm = 'sin', k = 0.5, solve = true;
    slider(S.ctrls, 'angle θ (°)', 0, 360, 1, th, x => { th = x; draw(); }, x => x + '°');
    select(S.ctrls, 'Function', [['sin', 'sin'], ['cos', 'cos'], ['tan', 'tan']], x => { fnm = x; draw(); });
    check(S.ctrls, 'Solve f(x) = k', true, x => { solve = x; draw(); });
    slider(S.ctrls, 'k', -2, 2, 0.01, k, x => { k = x; draw(); });
    const F = { sin: Math.sin, cos: Math.cos, tan: Math.tan };
    function draw() {
      const C = COL(), t = th * Math.PI / 180;
      U.view(0, 0, 1.6); U.clear(); U.grid(0.5, false); U.circle(0, 0, 1, C.axis, 1.5);
      const ctx = U.ctx; [['S', -0.75, 0.75], ['A', 0.75, 0.75], ['T', -0.75, -0.75], ['C', 0.75, -0.75]].forEach(([l, x, y]) => { ctx.fillStyle = C.grid; ctx.font = 'bold 22px system-ui'; ctx.textAlign = 'center'; ctx.fillText(l, U.X(x), U.Y(y) + 8); });
      U.line(0, 0, Math.cos(t), Math.sin(t), C.a, 2.5); U.line(Math.cos(t), 0, Math.cos(t), Math.sin(t), C.b, 2.5); U.line(0, 0, Math.cos(t), 0, C.d, 2.5); U.dot(Math.cos(t), Math.sin(t), C.c, 6);
      U.text('cos', Math.cos(t) / 2, 0, C.d, -10, 16, '12px system-ui'); U.text('sin', Math.cos(t), Math.sin(t) / 2, C.b, 6, 0, '12px system-ui');
      G.xmin = -20; G.xmax = 380; G.ymin = fnm === 'tan' ? -4 : -1.6; G.ymax = fnm === 'tan' ? 4 : 1.6; G.clear(); G.grid(fnm === 'tan' ? 1 : 0.5, false);
      const gx = G.ctx; gx.fillStyle = C.text; gx.font = '10px ui-monospace, monospace'; gx.textAlign = 'center'; for (let d = 0; d <= 360; d += 90) { gx.fillText(d + '°', G.X(d), G.Y(0) + 13); G.line(d, G.ymin, d, G.ymax, C.grid, 0.6); }
      G.curve(x => F[fnm](x * Math.PI / 180), C.a, 2.5, 0, 360, 1400); G.line(th, G.ymin, th, G.ymax, C.c, 1, [3, 3]); const yv = F[fnm](t); if (Math.abs(yv) < 10) G.dot(th, yv, C.c, 5);
      let sol = '';
      if (solve) { G.line(0, k, 360, k, C.d, 1.5, [5, 4]); const xs = trigSolve(fnm, 1, 0, k); xs.forEach(x => G.dot(x, k, C.fg, 5)); sol = `<p class="hl">$\\${fnm} x=${f3(k)}$ for $0^\\circ\\le x\\le360^\\circ$: $x=${xs.length ? xs.map(x => x.toFixed(1) + '^\\circ').join(',\\ ') : '\\text{no solutions}'}$</p><p class="muted">${fnm === 'sin' ? 'Second solution: 180° − principal value.' : fnm === 'cos' ? 'Second solution: 360° − principal value.' : 'Period 180°: add 180°.'} ${Math.abs(k) > 1 && fnm !== 'tan' ? '|k| > 1 has no solutions.' : ''}</p>`; }
      setRead(S.read, `<p>$\\theta=${th}^\\circ$: $\\sin\\theta=${f3(Math.sin(t))}$, $\\cos\\theta=${f3(Math.cos(t))}$, $\\tan\\theta=${Math.abs(Math.cos(t)) < 1e-9 ? '\\text{undefined}' : f3(Math.tan(t))}$</p><p>Quadrant ${Math.floor(((th % 360) + 360) % 360 / 90) + 1} — positive: ${['all', 'sin', 'tan', 'cos'][Math.floor(((th % 360) + 360) % 360 / 90) % 4]} (CAST)</p><p>$\\sin^2\\theta+\\cos^2\\theta=${f3(Math.sin(t) ** 2 + Math.cos(t) ** 2)}$</p>${sol}`);
    }
    U.onresize = draw; G.onresize = draw; draw();
    return () => { U.destroy(); G.destroy(); };
  },
};

/* ---------- Exponentials & log-linear ---------- */
SIMS.m_loglin = {
  title: 'Exponentials, logs & straight-line graphs', desc: 'Left: y = kbˣ (or y = axⁿ). Right: the same data on log axes becomes a straight line whose gradient and intercept give the constants.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('twin');
    const A = makeCanvas(S.stage, 1), B = makeCanvas(S.stage, 1);
    let model = 'exp', k = 2, b = 1.5, noise = true;
    select(S.ctrls, 'Model', [['exp', 'y = k bˣ  → log y vs x'], ['pow', 'y = a xⁿ  → log y vs log x']], x => { model = x; draw(); });
    slider(S.ctrls, model === 'exp' ? 'k / a' : 'k / a', 0.5, 5, 0.1, k, x => { k = x; draw(); });
    slider(S.ctrls, 'b / n', 0.3, 3, 0.05, b, x => { b = x; draw(); });
    check(S.ctrls, 'Experimental scatter', true, x => { noise = x; draw(); });
    const seed = [0.03, -0.05, 0.02, 0.06, -0.03, 0.01, -0.04, 0.05];
    function draw() {
      const C = COL(); const f = model === 'exp' ? x => k * b ** x : x => k * x ** b;
      const xs = model === 'exp' ? [0, 1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6, 7, 8], ys = xs.map((x, i) => f(x) * (noise ? 1 + seed[i] : 1));
      const ymax = Math.max(...ys) * 1.15; A.xmin = -0.5; A.xmax = 8.5; A.ymin = -ymax * 0.08; A.ymax = ymax; A.clear(); A.grid(ymax > 50 ? 10 : ymax > 10 ? 2 : 1, true, 'x', 'y');
      A.curve(f, C.a, 2.5, model === 'exp' ? -0.5 : 0.05, 8.5); xs.forEach((x, i) => A.dot(x, ys[i], C.c, 4));
      const LX = model === 'exp' ? xs : xs.map(Math.log10), LY = ys.map(Math.log10), nn = LX.length, mx = LX.reduce((s, v) => s + v, 0) / nn, my = LY.reduce((s, v) => s + v, 0) / nn;
      const grad = LX.reduce((s, v, i) => s + (v - mx) * (LY[i] - my), 0) / LX.reduce((s, v) => s + (v - mx) ** 2, 0), icpt = my - grad * mx;
      B.xmin = Math.min(...LX) - 0.3; B.xmax = Math.max(...LX) + 0.3; B.ymin = Math.min(...LY, 0) - 0.3; B.ymax = Math.max(...LY) + 0.3; B.clear(); B.grid(model === 'exp' ? 1 : 0.2, true, model === 'exp' ? 'x' : 'log x', 'log y');
      B.curve(x => icpt + grad * x, C.d, 2); LX.forEach((x, i) => B.dot(x, LY[i], C.c, 4));
      setRead(S.read, model === 'exp' ? `<p>$y=${f3(k)}\\times${f3(b)}^x$</p><p class="hl">$\\log y=\\log k+x\\log b$: a straight line in $x$</p><p>Best-fit gradient $=${f3(grad)}\\Rightarrow b=10^{${f3(grad)}}=${f3(10 ** grad)}$</p><p>Intercept $=${f3(icpt)}\\Rightarrow k=10^{${f3(icpt)}}=${f3(10 ** icpt)}$</p>` :
        `<p>$y=${f3(k)}x^{${f3(b)}}$</p><p class="hl">$\\log y=\\log a+n\\log x$: straight line in $\\log x$</p><p>Gradient $=${f3(grad)}\\approx n$</p><p>Intercept $=${f3(icpt)}\\Rightarrow a=10^{${f3(icpt)}}=${f3(10 ** icpt)}$</p>`);
    }
    A.onresize = draw; B.onresize = draw; draw();
    return () => { A.destroy(); B.destroy(); };
  },
};

/* ---------- First principles, tangents, stationary points ---------- */
SIMS.m_firstprinciples = {
  title: 'From chord to tangent: differentiation', desc: 'Shrink h and the chord PQ becomes the tangent at P: its gradient tends to f′(x). Turn on f′ to see stationary points line up with its roots.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    const FS = { quad: [x => x * x, x => 2 * x, 'x^2'], cubic: [x => x ** 3 - 3 * x, x => 3 * x * x - 3, 'x^3-3x'], quart: [x => x ** 4 / 4 - x * x, x => x ** 3 - 2 * x, '\\tfrac14x^4-x^2'], recip: [x => 1 / x, x => -1 / (x * x), '\\frac1x'], root: [x => Math.sqrt(x), x => 0.5 / Math.sqrt(x), '\\sqrt x'] };
    let key = 'cubic', x0 = 1.5, hh = 1, deriv = false, normal = false, anim = false;
    select(S.ctrls, 'f(x)', Object.entries(FS).map(([k, v]) => [k, v[2].replace(/\\tfrac14/, '¼').replace(/\\frac1x/, '1/x').replace(/\\sqrt x/, '√x').replace(/\^4/, '⁴').replace(/\^3/, '³').replace(/\^2/, '²')]), x => { key = x; draw(); }, key);
    slider(S.ctrls, 'x (point P)', -3, 3, 0.05, x0, x => { x0 = x; draw(); });
    const sh = slider(S.ctrls, 'h', -2, 2, 0.001, hh, x => { hh = Math.abs(x) < 0.001 ? 0.001 : x; draw(); }, x => (+x).toFixed(3));
    check(S.ctrls, "Show f′(x)", false, x => { deriv = x; draw(); });
    check(S.ctrls, 'Show normal at P', false, x => { normal = x; draw(); });
    check(S.ctrls, 'Animate h → 0', false, x => { anim = x; if (x) { hh = 2; } });
    function draw() {
      const C = COL(), [f, d, ft] = FS[key]; const xp = key === 'root' ? Math.max(0.05, x0) : key === 'recip' && Math.abs(x0) < 0.1 ? 0.1 : x0;
      P.view(0, 0.5, 4); P.clear(); P.grid(1, true);
      P.curve(f, C.a, 3, P.xmin, P.xmax, 1200); if (deriv) { P.curve(d, C.b, 2, P.xmin, P.xmax, 1200); }
      const yp = f(xp), xq = xp + hh, yq = f(xq), gc = (yq - yp) / hh, gt = d(xp);
      P.curve(x => yp + gc * (x - xp), C.d, 1.8); P.curve(x => yp + gt * (x - xp), C.c, 2.2); if (normal && Math.abs(gt) > 1e-6) P.curve(x => yp - (x - xp) / gt, C.b, 1.5);
      P.dot(xp, yp, C.c, 6); P.text('P', xp, yp, C.c); if (isFinite(yq)) { P.dot(xq, yq, C.d, 5); P.text('Q', xq, yq, C.d); }
      let stat = '';
      if (deriv) { const zs = []; for (let x = -4; x < 4; x += 0.01) { const a1 = d(x), a2 = d(x + 0.01); if (isFinite(a1) && isFinite(a2) && a1 * a2 <= 0) zs.push(x + 0.005); } zs.forEach(z => { P.dot(z, f(z), C.fg, 5); P.dot(z, 0, C.b, 4); }); stat = `<p>Stationary points at $x\\approx${zs.map(z => f3(z)).join(',\\ ') || '\\text{none}'}$ — where $f'(x)=0$.</p>`; }
      setRead(S.read, `<p>$f(x)=${ft}$, $P=(${f3(xp)},${f3(yp)})$, $h=${f3(hh)}$</p><p>Chord gradient $\\dfrac{f(x+h)-f(x)}{h}=${f3(gc)}$</p><p class="hl">As $h\\to0$: $f'(${f3(xp)})=${f3(gt)}$</p><p>Tangent: $y=${Math.abs(gt) < 5e-4 ? f3(yp) : `${cf(gt)}${Math.abs(xp) < 5e-4 ? 'x' : `(x${tm(-xp)})`}${tm(yp)}`}$${normal ? `<br>Normal gradient $-\\tfrac1{f'}=${Math.abs(gt) > 1e-9 ? f3(-1 / gt) : '\\infty'}$` : ''}</p>${stat}`);
    }
    const stop = loop(() => { if (anim) { hh *= 0.985; if (Math.abs(hh) < 0.002) { hh = 0.002; anim = false; } sh.set(hh); draw(); } });
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- Area under a curve ---------- */
SIMS.m_area = {
  title: 'Integration: area under a curve', desc: 'Rectangles approximate the area; as n grows they approach ∫f(x)dx. Regions below the axis count negative — compare the signed integral with the total area.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.35);
    const FS = { q: [x => x * x - 4 * x + 3, x => x ** 3 / 3 - 2 * x * x + 3 * x, 'x^2-4x+3'], c: [x => x ** 3 - 3 * x, x => x ** 4 / 4 - 1.5 * x * x, 'x^3-3x'], s: [x => Math.sqrt(Math.max(0, x)), x => 2 / 3 * Math.max(0, x) ** 1.5, '\\sqrt x'], l: [x => 4 - x * x, x => 4 * x - x ** 3 / 3, '4-x^2'] };
    let key = 'q', a = 0, b = 3, n = 6, line = false;
    select(S.ctrls, 'f(x)', Object.entries(FS).map(([k, v]) => [k, v[2].replace(/\\sqrt x/, '√x').replace(/\^3/, '³').replace(/\^2/, '²')]), x => { key = x; draw(); });
    slider(S.ctrls, 'a', -3, 4, 0.1, a, x => { a = x; draw(); });
    slider(S.ctrls, 'b', -3, 5, 0.1, b, x => { b = x; draw(); });
    slider(S.ctrls, 'rectangles n', 1, 100, 1, n, x => { n = x; draw(); }, x => x);
    function draw() {
      const C = COL(), [f, F, ft] = FS[key]; const lo = Math.min(a, b), hi = Math.max(a, b);
      P.view(1, 0.5, 4.5); P.clear(); P.grid(1, true);
      const ctx = P.ctx, w = (hi - lo) / n; let R = 0;
      for (let i = 0; i < n; i++) { const xm = lo + (i + 0.5) * w, y = f(xm); R += y * w; ctx.fillStyle = y >= 0 ? 'rgba(124,156,255,.35)' : 'rgba(240,111,176,.35)'; ctx.fillRect(P.X(lo + i * w), Math.min(P.Y(0), P.Y(y)), P.X(lo + (i + 1) * w) - P.X(lo + i * w), Math.abs(P.Y(y) - P.Y(0))); ctx.strokeStyle = C.grid; ctx.strokeRect(P.X(lo + i * w), Math.min(P.Y(0), P.Y(y)), P.X(lo + (i + 1) * w) - P.X(lo + i * w), Math.abs(P.Y(y) - P.Y(0))); }
      P.curve(f, C.a, 3, P.xmin, P.xmax, 1200); P.line(lo, P.ymin, lo, P.ymax, C.grid, 1, [3, 3]); P.line(hi, P.ymin, hi, P.ymax, C.grid, 1, [3, 3]);
      const I = F(hi) - F(lo); const zs = []; for (let x = lo; x < hi; x += 0.001) if (f(x) * f(x + 0.001) < 0) zs.push(x + 0.0005);
      const cuts = [lo, ...zs, hi]; let tot = 0; for (let i = 0; i < cuts.length - 1; i++) tot += Math.abs(F(cuts[i + 1]) - F(cuts[i]));
      setRead(S.read, `<p>$\\displaystyle\\int_{${f3(lo)}}^{${f3(hi)}}(${ft})\\,dx=\\big[F(x)\\big]=${f3(I)}$</p><p>${n} midpoint rectangles: $${f3(R)}$ (error $${sci(Math.abs(R - I))}$)</p><p class="hl">Total area (splitting at roots ${zs.map(z => f3(z)).join(', ') || '—'}) $=${f3(tot)}$</p><p class="muted">${Math.abs(tot - Math.abs(I)) > 1e-6 ? 'Part of the region is below the axis, so the plain integral is NOT the area.' : 'No sign change: area = |integral|.'}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- 2D vectors ---------- */
SIMS.m_vectors = {
  title: 'Vectors in 2D', desc: 'Drag the heads of a and b. See a + b, a − b and λa, with magnitudes, directions and unit vectors.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let a = [3, 1], b = [1, 2.5], lam = 1.5, op = 'sum';
    select(S.ctrls, 'Show', [['sum', 'a + b (parallelogram)'], ['diff', 'a − b'], ['scal', 'λa (parallel vectors)'], ['unit', 'unit vectors â, b̂']], x => { op = x; draw(); });
    slider(S.ctrls, 'λ', -3, 3, 0.1, lam, x => { lam = x; draw(); });
    P.handles = [{ get: () => a, set: (x, y) => { a = [x, y]; draw(); }, snap: 0.5 }, { get: () => b, set: (x, y) => { b = [x, y]; draw(); }, snap: 0.5 }];
    const mag = v => Math.hypot(...v), dir = v => Math.atan2(v[1], v[0]) * 180 / Math.PI, vs = v => ex([v[0], '\\mathbf i'], [v[1], '\\mathbf j']);
    function draw() {
      const C = COL(); P.view(0.5, 0.5, 6); P.clear(); P.grid(1, true);
      P.arrow(0, 0, a[0], a[1], C.a, 3); P.text('a', a[0], a[1], C.a, 8, -8, 'bold 14px system-ui'); P.arrow(0, 0, b[0], b[1], C.b, 3); P.text('b', b[0], b[1], C.b, 8, -8, 'bold 14px system-ui');
      let r, lab;
      if (op === 'sum') { r = [a[0] + b[0], a[1] + b[1]]; lab = '\\mathbf a+\\mathbf b'; P.line(a[0], a[1], r[0], r[1], C.b, 1.2, [4, 4]); P.line(b[0], b[1], r[0], r[1], C.a, 1.2, [4, 4]); P.arrow(0, 0, r[0], r[1], C.c, 3); }
      else if (op === 'diff') { r = [a[0] - b[0], a[1] - b[1]]; lab = '\\mathbf a-\\mathbf b'; P.arrow(b[0], b[1], a[0], a[1], C.c, 3); P.arrow(0, 0, r[0], r[1], C.c, 1.5); }
      else if (op === 'scal') { r = [lam * a[0], lam * a[1]]; lab = `${f3(lam)}\\mathbf a`; P.arrow(0, 0, r[0], r[1], C.c, 2); }
      else { const ua = [a[0] / mag(a), a[1] / mag(a)], ub = [b[0] / mag(b), b[1] / mag(b)]; P.circle(0, 0, 1, C.axis, 1, [4, 4]); P.arrow(0, 0, ua[0], ua[1], C.c, 3); P.arrow(0, 0, ub[0], ub[1], C.d, 3); r = ua; lab = '\\hat{\\mathbf a}'; }
      setRead(S.read, `<p>$\\mathbf a=${vs(a)}$, $|\\mathbf a|=${f3(mag(a))}$, direction $${dir(a).toFixed(1)}^\\circ$</p><p>$\\mathbf b=${vs(b)}$, $|\\mathbf b|=${f3(mag(b))}$, direction $${dir(b).toFixed(1)}^\\circ$</p><p class="hl">$${lab}=${vs(r)}$, magnitude $${f3(mag(r))}$</p>${op === 'unit' ? `<p>$\\hat{\\mathbf b}=${vs([b[0] / mag(b), b[1] / mag(b)])}$ — length 1</p>` : ''}<p class="muted">Drag the arrow heads (snaps to 0.5). $\\overrightarrow{AB}=\\mathbf b-\\mathbf a$.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
