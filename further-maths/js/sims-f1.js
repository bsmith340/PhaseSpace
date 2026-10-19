// Simulations for Further Maths AS 1: polynomial roots in the Argand diagram, 2D linear transformations with invariant lines.
'use strict';

/* ---------- roots of real polynomials ---------- */
SIMS.f1_poly = {
  title: 'Roots of real polynomials in the Argand diagram', desc: 'Change a quadratic\'s coefficients, or drag the complex root of a cubic or quartic: non-real roots always come in conjugate pairs.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let deg = 2, b = 2, c = 5, r = -1, z = [1, 2], u = -2, v = 1.5, graph = true;
    select(S.ctrls, 'Equation', [['2', 'Quadratic x² + bx + c'], ['3', 'Cubic with roots r, z, z*'], ['4', 'Quartic with roots z, z*, u, v']], k => { deg = +k; draw(); });
    slider(S.ctrls, 'b (quadratic)', -6, 6, 0.25, b, k => { b = k; draw(); }); slider(S.ctrls, 'c (quadratic)', -6, 10, 0.25, c, k => { c = k; draw(); });
    slider(S.ctrls, 'real root r / u', -4, 4, 0.25, r, k => { r = k; u = k; draw(); }); slider(S.ctrls, 'real root v (quartic)', -4, 4, 0.25, v, k => { v = k; draw(); });
    check(S.ctrls, 'Show y = f(x) (scaled)', graph, k => { graph = k; draw(); });
    P.handles = [{ get: () => (deg === 2 ? [99, 99] : z), set: (x, y) => { z = [x, Math.abs(y) < 0.12 ? 0.25 : y]; draw(); }, snap: 0.25 }];
    const mulP = (A, B) => { const R = Array(A.length + B.length - 1).fill(0); A.forEach((a, i) => B.forEach((bb, j) => { R[i + j] += a * bb; })); return R; };
    function draw() {
      const C = COL(); P.view(0, 0, 5.5); P.clear(); P.grid(1, true, 'Re', 'Im'); let cs, roots;
      if (deg === 2) { cs = [1, b, c]; const D = b * b - 4 * c; roots = D >= 0 ? [[(-b + Math.sqrt(D)) / 2, 0], [(-b - Math.sqrt(D)) / 2, 0]] : [[-b / 2, Math.sqrt(-D) / 2], [-b / 2, -Math.sqrt(-D) / 2]]; }
      else { const qf = [1, -2 * z[0], z[0] ** 2 + z[1] ** 2]; cs = deg === 3 ? mulP(qf, [1, -r]) : mulP(mulP(qf, [1, -u]), [1, -v]); roots = [z, [z[0], -z[1]], ...(deg === 3 ? [[r, 0]] : [[u, 0], [v, 0]])]; }
      const f = x => cs.reduce((s, k) => s * x + k, 0);
      if (graph) { let mx = 0; for (let x = -5.5; x <= 5.5; x += 0.05) mx = Math.max(mx, Math.abs(f(x))); const k = mx > 4.5 ? 4.5 / mx : 1; P.curve(x => k * f(x), C.grid, 2); P.text(k < 1 ? `y = f(x) × ${f3(k)}` : 'y = f(x)', 3.2, 4.6, C.text); }
      roots.forEach(([x, y], i) => { P.dot(x, y, Math.abs(y) > 1e-9 ? C.b : C.a, 7); }); if (deg > 2) P.line(z[0], z[1], z[0], -z[1], C.b, 1, [4, 4]);
      const cx = ([x, y]) => (Math.abs(y) < 1e-9 ? f3(x) : `${f3(x)}${y < 0 ? '-' : '+'}${f3(Math.abs(y))}i`), sum = roots.reduce((s, [x]) => s + x, 0);
      const ptex = cs.map((k, i) => { const e = cs.length - 1 - i; if (Math.abs(k) < 1e-9) return ''; const a = f3(Math.abs(k)), w = e === 0 ? '' : e === 1 ? 'x' : `x^${e}`; return `${k < 0 ? '-' : '+'}${a === 1 && w ? '' : a}${w}`; }).join('').replace(/^\+/, '');
      setRead(S.read, `<p>$${ptex}=0$</p><p class="hl">Roots: $${roots.map(cx).join(',\\ ')}$</p>
        ${deg === 2 ? `<p>Discriminant $b^2-4c=${f3(b * b - 4 * c)}$: ${b * b - 4 * c < 0 ? 'negative, so a conjugate pair' : 'non-negative, so real roots'}. Sum $=-b=${f3(-b)}$, product $=c=${f3(c)}$.</p>` : `<p>Quadratic factor from the pair: $x^2-${f3(2 * z[0])}x+${f3(z[0] ** 2 + z[1] ** 2)}$. Sum of roots $=${f3(sum)}$ $=-(\\text{coefficient of }x^{${deg - 1}})$.</p>`}
        <p class="muted">Blue roots are non-real; their reflection in the real axis is always a root too, because the coefficients are real. Real roots are where the (scaled) graph crosses the real axis.${deg > 2 ? ' Drag the upper blue root.' : ''}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- 2D linear transformations ---------- */
SIMS.f1_trans = {
  title: '2D transformations: determinant & invariant lines', desc: 'Choose a transformation. See the image of the unit square and a flag, the area scale factor, and the invariant lines through the origin.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let kind = 'rot', t = 30, k = 2, m = [[1, 1], [0, 1]];
    select(S.ctrls, 'Transformation', [['rot', 'Rotation through θ'], ['ref', 'Reflection in y = x tan θ'], ['enl', 'Enlargement, scale factor k'], ['sx', 'Stretch parallel to x-axis, factor k'], ['sh', 'Shear, x-axis invariant, factor k'], ['cus', 'Custom matrix (a, b, c, d)']], v => { kind = v; draw(); }, kind);
    slider(S.ctrls, 'θ', -180, 180, 5, t, v => { t = v; draw(); }, v => v + '°'); slider(S.ctrls, 'k', -3, 3, 0.25, k, v => { k = v; draw(); });
    [['a', 0, 0], ['b', 0, 1], ['c', 1, 0], ['d', 1, 1]].forEach(([l, i, j]) => slider(S.ctrls, l + ' (custom)', -3, 3, 0.25, m[i][j], v => { m[i][j] = v; draw(); }));
    const mat = () => { const r = t * Math.PI / 180; return kind === 'rot' ? [[Math.cos(r), -Math.sin(r)], [Math.sin(r), Math.cos(r)]] : kind === 'ref' ? [[Math.cos(2 * r), Math.sin(2 * r)], [Math.sin(2 * r), -Math.cos(2 * r)]] : kind === 'enl' ? [[k, 0], [0, k]] : kind === 'sx' ? [[k, 0], [0, 1]] : kind === 'sh' ? [[1, k], [0, 1]] : m; };
    function draw() {
      const C = COL(), A = mat(), T = ([x, y]) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y], ctx = P.ctx; P.view(0, 0, 5); P.clear(); P.grid(1, true, 'x', 'y');
      for (let i = -6; i <= 6; i++) { const a = T([i, -6]), b = T([i, 6]), c = T([-6, i]), d = T([6, i]); P.line(a[0], a[1], b[0], b[1], C.fill, 1); P.line(c[0], c[1], d[0], d[1], C.fill, 1); }
      const sq = [[0, 0], [1, 0], [1, 1], [0, 1]].map(T); ctx.fillStyle = C.fill; ctx.beginPath(); sq.forEach(([x, y], i) => (i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)))); ctx.closePath(); ctx.fill(); ctx.strokeStyle = C.c; ctx.lineWidth = 2; ctx.stroke();
      const flag = [[0, 0], [0, 2], [1.2, 1.6], [0, 1.2]]; const poly = (pts, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)))); ctx.stroke(); };
      poly(flag.map(p => [p[0] + 1.5, p[1] + 0.5]), C.grid, 2); poly(flag.map(p => T([p[0] + 1.5, p[1] + 0.5])), C.b, 3);
      const e1 = T([1, 0]), e2 = T([0, 1]); P.arrow(0, 0, e1[0], e1[1], C.a, 2.5); P.arrow(0, 0, e2[0], e2[1], C.d, 2.5);
      const tr = A[0][0] + A[1][1], det = A[0][0] * A[1][1] - A[0][1] * A[1][0], D = tr * tr - 4 * det, lines = [];
      if (Math.abs(A[0][1]) < 1e-9 && Math.abs(A[1][0]) < 1e-9) { if (Math.abs(A[0][0] - A[1][1]) < 1e-9) lines.push(['all', A[0][0]]); else lines.push([[1, 0], A[0][0]], [[0, 1], A[1][1]]); }
      else if (D >= -1e-9) for (const s of D > 1e-9 ? [1, -1] : [1]) { const l = (tr + s * Math.sqrt(Math.max(0, D))) / 2, v = Math.abs(A[0][1]) > 1e-9 ? [A[0][1], l - A[0][0]] : [l - A[1][1], A[1][0]]; lines.push([v, l]); }
      lines.forEach(([v, l]) => { if (v === 'all') return; const n = Math.hypot(...v), u = [v[0] / n * 9, v[1] / n * 9]; P.line(-u[0], -u[1], u[0], u[1], Math.abs(l - 1) < 1e-9 ? C.c : C.text, Math.abs(l - 1) < 1e-9 ? 3 : 1.5, Math.abs(l - 1) < 1e-9 ? null : [6, 5]); });
      const desc = lines.length && lines[0][0] === 'all' ? `<p>Every line through $O$ is invariant (a multiple of $\\mathbf I$).</p>` : lines.length ? `<p>Invariant line${lines.length > 1 ? 's' : ''} through $O$: ${lines.map(([v, l]) => `$${Math.abs(v[0]) < 1e-9 ? 'x=0' : `y=${f3(v[1] / v[0])}x`}$ (scale ${f3(l)}${Math.abs(l - 1) < 1e-9 ? ': a <b>line of invariant points</b>' : ''})`).join('; ')}.</p>` : '<p>No invariant lines through $O$ (no real solutions for $m$) — typical of a rotation.</p>';
      setRead(S.read, `<p>$\\mathbf M=\\begin{pmatrix}${f3(A[0][0])}&${f3(A[0][1])}\\\\${f3(A[1][0])}&${f3(A[1][1])}\\end{pmatrix}$ — columns are the images of $\\mathbf i$ (red) and $\\mathbf j$ (green).</p>
        <p class="hl">$\\det\\mathbf M=${f3(det)}$: areas ×${f3(Math.abs(det))}${det < -1e-9 ? ', orientation reversed (the flag is flipped)' : Math.abs(det) < 1e-9 ? ' — singular: the plane collapses onto a line' : ''}.</p>${desc}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
