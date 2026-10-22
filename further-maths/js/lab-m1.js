// BCS Academy Lab — Maths AS 1 tools. Each one checks a specific kind of AS 1 working and shows the method, not just the answer.
'use strict';

const LX = {
  ui(el, side, { graph = true, aspect = 1.15 } = {}) {
    el.innerHTML = `<div class="lab-grid${graph ? '' : ' nograph'}">${graph ? '<div class="sim-stage"></div>' : ''}<div class="lab-side">${side}<div class="sim-read lab-out"></div></div></div>`;
    const out = el.querySelector('.lab-out'), P = graph ? makeCanvas(el.querySelector('.sim-stage'), aspect) : null;
    const v = id => el.querySelector('#' + id).value, n = id => { const x = evalExpr(v(id)); if (!isFinite(x)) throw new Error(`"${v(id)}" is not a number`); return x; };
    return { out, P, v, n, show: html => { out.innerHTML = html; labRender(out); }, err: e => { out.innerHTML = errBox(e.message || String(e)); } };
  },
  bind(el, go) { el.querySelectorAll('input,select').forEach(i => { i.addEventListener('change', go); if (i.tagName === 'INPUT') i.addEventListener('keydown', e => { if (e.key === 'Enter') go(); }); }); el.querySelectorAll('[data-go]').forEach(b => (b.onclick = go)); go(); },
  sel: (id, label, opts, val) => `<label class="lf"><span>${label}</span><select id="${id}">${opts.map(([k, t]) => `<option value="${k}" ${k === val ? 'selected' : ''}>${t}</option>`).join('')}</select></label>`,
  cl: x => { const r = Math.round(x * 1e6) / 1e6; return Math.abs(x - r) < 1e-9 * (1 + Math.abs(x)) ? r : x; },
  t: x => texNum(Math.abs(x) < 1e-9 ? 0 : LX.cl(x)),
  ex: terms => terms.map(([c, v]) => [LX.cl(c), v]).filter(([c]) => Math.abs(c) > 1e-12).map(([c, v], i) => (i ? (c < 0 ? '-' : '+') : c < 0 ? '-' : '') + (v && Math.abs(Math.abs(c) - 1) < 1e-12 ? '' : LX.t(Math.abs(c))) + v).join('') || '0',
  sg: x => (x < 0 ? '-' : '+') + LX.t(Math.abs(x)),
  roots(g, a, b, N = 4000) {
    const out = [], h = (b - a) / N; let x0 = a, y0 = g(a);
    for (let i = 1; i <= N; i++) {
      const x1 = a + i * h, y1 = g(x1);
      if (isFinite(y0) && isFinite(y1)) {
        if (y0 === 0) out.push(x0);
        else if (y0 * y1 < 0) { let l = x0, r = x1; for (let k = 0; k < 80; k++) { const m = (l + r) / 2, ym = g(m); if (!isFinite(ym)) break; if (g(l) * ym <= 0) r = m; else l = m; } out.push((l + r) / 2); }
        else if (i > 1) { const ym = g(x0 - h); if (isFinite(ym) && Math.abs(y0) < Math.abs(ym) && Math.abs(y0) < Math.abs(y1) && Math.abs(y0) < 1e-6 * (1 + Math.abs(ym))) out.push(x0); }
      }
      x0 = x1; y0 = y1;
    }
    return out.filter((r, i) => i === 0 || Math.abs(r - out[i - 1]) > 1e-7).map(r => (Math.abs(r - Math.round(r * 1e8) / 1e8) < 1e-9 ? Math.round(r * 1e8) / 1e8 : r));
  },
  intCoeffs(...xs) { const den = xs.map(x => { const q = fracOf(x, 1000); return q ? q[1] : 1; }), L = den.reduce((a, b) => a * b / gcd(a, b), 1); let ys = xs.map(x => Math.round(x * L * 1e9) / 1e9); const g = ys.filter(y => Math.abs(y - Math.round(y)) < 1e-9 && y).reduce((a, b) => gcd(a, Math.round(b)), 0) || 1; ys = ys.map(y => y / g); if (ys.find(y => y !== 0) < 0) ys = ys.map(y => -y); return ys; },
};

/* ---------------- Quadratics & inequalities (A3–A6, A9) ---------------- */
LAB.m_quad = {
  title: 'Quadratics & inequalities', icon: 'x²', course: 'm1', desc: 'Completed square, vertex, discriminant, exact roots and the solution set of a quadratic inequality, with the graph.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('a', '2', 'id="qa" size="4"')}${field('b', '-5', 'id="qb" size="4"')}${field('c', '-3', 'id="qc" size="4"')}</div>
      <div class="lab-row">${LX.sel('qop', 'Inequality', [['', 'none'], ['<', 'ax² + bx + c < 0'], ['<=', '≤ 0'], ['>', '> 0'], ['>=', '≥ 0']], '<=')}<button class="btn small" data-go>Analyse</button></div>`);
    let st = null;
    function go() {
      try {
        const a = U.n('qa'), b = U.n('qb'), c = U.n('qc'), op = U.v('qop'); if (Math.abs(a) < 1e-12) throw new Error('a must not be 0');
        const p = b / (2 * a), q = c - b * b / (4 * a), D = b * b - 4 * a * c, r = D >= 0 ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y) : [];
        const exactRoot = s => { const sq = surd(Math.round(D)); return Number.isInteger(D) && !Number.isInteger(Math.sqrt(D)) ? `\\dfrac{${LX.t(-b)}${s}${sq}}{${LX.t(2 * a)}}` : LX.t(s === '-' ? (-b - Math.sqrt(D)) / (2 * a) : (-b + Math.sqrt(D)) / (2 * a)); };
        let html = `<p>$${poly([[a, 'x^2'], [b, 'x'], [c, '']])}$</p><p class="hl">$=${a === 1 ? '' : a === -1 ? '-' : LX.t(a)}\\left(x${LX.sg(p)}\\right)^2${LX.sg(q)}$</p>
          <p>Vertex $(${LX.t(-p)},\\ ${LX.t(q)})$ — a ${a > 0 ? 'minimum' : 'maximum'}; line of symmetry $x=${LX.t(-p)}$; $y$-intercept $(0,${LX.t(c)})$.</p>
          <p>$b^2-4ac=${LX.t(D)}$: ${D > 1e-12 ? 'two distinct real roots' : Math.abs(D) <= 1e-12 ? 'one repeated root' : 'no real roots'}${r.length ? ` — $x=${D > 1e-12 ? `${exactRoot('-')},\\ ${exactRoot('+')}` : LX.t(r[0])}$` : ''}.</p>`;
        if (op) {
          const strict = op.length === 1, below = op[0] === '<', inside = (a > 0) === below, L = strict ? '\\lt' : '\\le', G = strict ? '\\gt' : '\\ge';
          let sol;
          if (D > 1e-12) sol = inside ? `${LX.t(r[0])}${L} x${L} ${LX.t(r[1])}` : `x${L} ${LX.t(r[0])}\\ \\text{ or }\\ x${G} ${LX.t(r[1])}`;
          else if (Math.abs(D) <= 1e-12) sol = inside ? (strict ? '\\text{no solutions}' : `x=${LX.t(r[0])}`) : (strict ? `x\\ne${LX.t(r[0])}` : '\\text{all real }x');
          else sol = inside ? '\\text{no real solutions}' : '\\text{all real }x';
          html += `<p class="hl"><b>Solution:</b> $${sol}$</p><p class="muted small">${a > 0 ? '∪' : '∩'}-shaped graph: it is ${below ? 'below' : 'above'} the axis ${inside ? 'between' : 'outside'} the roots.</p>`;
        }
        st = { a, b, c, r, op, vx: -p, vy: q }; U.show(html); draw();
      } catch (e) { U.err(e); }
    }
    function draw() {
      if (!st) return; const C = COL(), P = U.P, f = x => st.a * x * x + st.b * x + st.c, w = Math.max(5, ...st.r.map(x => Math.abs(x - st.vx) * 1.6), 3);
      P.view(st.vx, Math.max(Math.min(st.vy, 0), -20) / 2 + Math.min(Math.max(st.vy, 0), 20) / 2, w); P.clear(); P.grid(w > 12 ? 2 : 1, true);
      if (st.op) { const ctx = P.ctx; ctx.fillStyle = C.fill; for (let px = 0; px < P.w; px += 2) { const y = f(P.ix(px)); if (st.op[0] === '<' ? y <= 0 : y >= 0) ctx.fillRect(px, 0, 2, P.h); } }
      P.curve(f, C.a, 3); st.r.forEach(x => P.dot(x, 0, C.b, 6)); P.dot(st.vx, st.vy, C.c, 6);
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Simultaneous equations (A7, A8) ---------------- */
LAB.m_sim = {
  title: 'Simultaneous equations', icon: '⧉', course: 'm1', desc: 'Two or three linear equations, or a line with a curve (including circles). Type the equations as you would write them.',
  mount(el) {
    const U = LX.ui(el, `${LX.sel('smode', 'Type', [['lin', 'Linear: 2 or 3 unknowns (x, y, z)'], ['curve', 'A line and a curve in x and y']], 'lin')}
      ${field('Equation 1', 'x + y + z = 6', 'id="se1" class="wide"')}${field('Equation 2', '2x - y + z = 3', 'id="se2" class="wide"')}${field('Equation 3 (leave blank for two unknowns)', 'x + 2y - z = 2', 'id="se3" class="wide"')}
      <button class="btn small" data-go>Solve</button><p class="muted small">Examples: <code>3x+2y=7</code>; line & curve: <code>y = x + 1</code> with <code>x^2 + y^2 = 25</code>.</p>`);
    let pic = null;
    const side = s => { const i = s.indexOf('='); if (i < 0) throw new Error(`"${s}" needs an = sign`); return [s.slice(0, i), s.slice(i + 1)]; };
    const F = (s, vars) => { const [l, r] = side(s), fl = fn(l, vars), fr2 = fn(r, vars); return (...a) => fl(...a) - fr2(...a); };
    function go() {
      try {
        const mode = U.v('smode'), eqs = ['se1', 'se2', 'se3'].map(U.v).map(s => s.trim()).filter(Boolean);
        if (mode === 'lin') {
          const vars = eqs.length === 3 ? ['x', 'y', 'z'] : ['x', 'y']; if (eqs.length < 2) throw new Error('Enter at least two equations');
          const rows = eqs.map(s => { const f = F(s, vars), z = vars.map(() => 0), f0 = f(...z), co = vars.map((_, i) => { const e = z.slice(); e[i] = 1; return f(...e) - f0; });
            const e2 = vars.map(() => 2); if (Math.abs(f(...e2) - (f0 + 2 * co.reduce((a, b) => a + b, 0))) > 1e-8) throw new Error(`"${s}" is not linear`); return [co, -f0]; });
          const x = solveLinear(rows.map(r => r[0]), rows.map(r => r[1]));
          if (!x || x.some(v => !isFinite(v))) { U.show('<p class="hl">No unique solution — the equations are inconsistent or dependent (parallel lines/planes).</p>'); pic = null; draw(); return; }
          U.show(`<p>${rows.map((r, i) => `$(${i + 1})\\ \\ ${poly(r[0].map((c, j) => [c, vars[j]]))}=${LX.t(r[1])}$`).join('<br>')}</p><p class="hl">$${vars.map((v, i) => `${v}=${LX.t(x[i])}`).join(',\\ ')}$</p><p class="muted small">${vars.length === 3 ? 'Method: eliminate the same variable from two different pairs, solve the resulting 2×2 system, then substitute back.' : 'Method: scale to match one coefficient, then add or subtract (elimination), or substitute.'} Check: ${rows.map(r => `$${LX.t(r[0].reduce((s, c, j) => s + c * x[j], 0))}$`).join(', ')} ✓</p>`);
          pic = vars.length === 2 ? { kind: 'lin', rows, x } : null; draw(); return;
        }
        if (eqs.length < 2) throw new Error('Enter the line and the curve');
        const f1 = F(eqs[0], ['x', 'y']), f2 = F(eqs[1], ['x', 'y']), A0 = f1(0, 0), ax = f1(1, 0) - A0, by = f1(0, 1) - A0;
        if (Math.abs(f1(2, 3) - (A0 + 2 * ax + 3 * by)) > 1e-8) throw new Error('Equation 1 must be the straight line');
        let pts;
        if (Math.abs(by) > 1e-12) { const yl = x => -(A0 + ax * x) / by; pts = LX.roots(x => f2(x, yl(x)), -60, 60, 24000).map(x => [x, yl(x)]); }
        else { const xl = -A0 / ax; pts = LX.roots(y => f2(xl, y), -60, 60, 24000).map(y => [xl, y]); }
        const kind = pts.length === 0 ? 'The line misses the curve (no real solutions — discriminant < 0).' : pts.length === 1 ? 'One point of contact: the line is a <b>tangent</b> (discriminant = 0) — or it meets a branch once.' : `${pts.length} intersection points.`;
        U.show(`<p>Substitute the line into the curve and solve.</p><p class="hl">${pts.length ? pts.map(([x, y]) => `$(${LX.t(x)},\\ ${LX.t(y)})$`).join('<br>') : '—'}</p><p>${kind}</p><p class="muted small">Find partner values from the <b>linear</b> equation.</p>`);
        pic = { kind: 'curve', f1, f2, pts }; draw();
      } catch (e) { U.err(e); pic = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; P.view(0, 0, 8); P.clear(); P.grid(1, true); if (!pic) return;
      if (pic.kind === 'lin') { pic.rows.forEach((r, i) => { const [[a, b], c] = r, col = [C.a, C.b][i % 2]; if (Math.abs(b) > 1e-12) P.curve(x => (c - a * x) / b, col, 2.5); else P.line(c / a, P.ymin, c / a, P.ymax, col, 2.5); }); P.dot(pic.x[0], pic.x[1], C.c, 7); return; }
      [[pic.f1, C.a], [pic.f2, C.b]].forEach(([g, col]) => implicitPlot(P, g, col));
      pic.pts.forEach(([x, y]) => P.dot(x, y, C.c, 7));
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};
// Implicit curve F(x, y) = 0 by marching squares (shared with the grapher)
function implicitPlot(P, F, col, w = 2.5, N = 160) {
  const ctx = P.ctx, nx = N, ny = Math.round(N * P.h / P.w), dx = (P.xmax - P.xmin) / nx, dy = (P.ymax - P.ymin) / ny, val = [];
  for (let j = 0; j <= ny; j++) { const row = []; for (let i = 0; i <= nx; i++) row.push(F(P.xmin + i * dx, P.ymin + j * dy)); val.push(row); }
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath();
  const edge = (x1, y1, v1, x2, y2, v2) => { const t = v1 / (v1 - v2); return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]; };
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const x = P.xmin + i * dx, y = P.ymin + j * dy, v = [val[j][i], val[j][i + 1], val[j + 1][i + 1], val[j + 1][i]];
    if (v.some(t => !isFinite(t))) continue;
    const c = [[x, y], [x + dx, y], [x + dx, y + dy], [x, y + dy]], pts = [];
    for (let k = 0; k < 4; k++) { const a = v[k], b = v[(k + 1) % 4]; if ((a < 0) !== (b < 0)) pts.push(edge(...c[k], a, ...c[(k + 1) % 4], b)); }
    if (Math.max(...v.map(Math.abs)) > 1e3 * (Math.abs(dx) + Math.abs(dy)) * 50 && pts.length) continue; // skip asymptote jumps
    for (let k = 0; k + 1 < pts.length; k += 2) { ctx.moveTo(P.X(pts[k][0]), P.Y(pts[k][1])); ctx.lineTo(P.X(pts[k + 1][0]), P.Y(pts[k + 1][1])); }
  }
  ctx.stroke();
}

/* ---------------- Triangle solver (T2, T3) ---------------- */
LAB.m_tri = {
  title: 'Triangle solver', icon: '△', course: 'm1', desc: 'Enter any three of a, b, c, A, B, C (degrees). Uses the sine or cosine rule, finds both triangles in the ambiguous case, and gives the area.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('a', '3.2', 'id="ta" size="5"')}${field('b', '5', 'id="tb" size="5"')}${field('c', '', 'id="tc" size="5"')}</div><div class="lab-row">${field('A (°)', '35', 'id="tA" size="5"')}${field('B (°)', '', 'id="tB" size="5"')}${field('C (°)', '', 'id="tC" size="5"')}</div><button class="btn small" data-go>Solve</button><p class="muted small">Side a is opposite angle A, and so on.</p>`);
    let tris = [];
    const D = Math.PI / 180, f = x => +x.toFixed(4);
    function solve(s, A) {
      const known = s.filter(x => x != null).length, kA = A.filter(x => x != null).length;
      if (known + kA !== 3) throw new Error('Enter exactly three values');
      if (kA === 3) throw new Error('Three angles fix the shape but not the size — give a side');
      const out = [];
      if (known === 3) { const [a, b, c] = s; if (a + b <= c || a + c <= b || b + c <= a) throw new Error('These sides break the triangle inequality'); const Aa = Math.acos((b * b + c * c - a * a) / (2 * b * c)) / D, Bb = Math.acos((a * a + c * c - b * b) / (2 * a * c)) / D; out.push({ s, A: [Aa, Bb, 180 - Aa - Bb], how: 'SSS → cosine rule for two angles, then the angle sum.' }); return out; }
      if (kA === 2) { const i = A.findIndex(x => x == null), A2 = A.slice(); A2[i] = 180 - A.reduce((t, x) => t + (x || 0), 0); if (A2[i] <= 0) throw new Error('Angles add to 180° or more'); const j = s.findIndex(x => x != null), k = s[j] / Math.sin(A2[j] * D); out.push({ s: s.map((x, m) => x ?? k * Math.sin(A2[m] * D)), A: A2, how: 'Two angles → third angle from the angle sum, then the sine rule.' }); return out; }
      // two sides and one angle
      const iA = A.findIndex(x => x != null), ang = A[iA];
      if (s[iA] == null) { const [p, q] = [0, 1, 2].filter(m => m !== iA).map(m => s[m]); const side = Math.sqrt(p * p + q * q - 2 * p * q * Math.cos(ang * D)); const s2 = s.slice(); s2[iA] = side; return solve(s2, [null, null, null]).map(t => ({ ...t, how: 'SAS → cosine rule for the third side, then cosine rule for the angles.' })); }
      const j = [0, 1, 2].find(m => m !== iA && s[m] != null), sinB = s[j] * Math.sin(ang * D) / s[iA];
      if (sinB > 1 + 1e-12) throw new Error(`sin ${'ABC'[j]} = ${sinB.toFixed(4)} > 1: no triangle fits (side ${'abc'[iA]} is too short)`);
      for (const Bj of [Math.asin(Math.min(1, sinB)) / D, 180 - Math.asin(Math.min(1, sinB)) / D]) {
        const third = 180 - ang - Bj; if (third <= 1e-9) continue; if (out.length && Math.abs(Bj - out[0].A[j]) < 1e-9) continue;
        const A2 = [null, null, null]; A2[iA] = ang; A2[j] = Bj; const m = 3 - iA - j; A2[m] = third; const k = s[iA] / Math.sin(ang * D); const s2 = s.slice(); s2[m] = k * Math.sin(third * D);
        out.push({ s: s2, A: A2, how: `SSA → sine rule gives sin ${'ABC'[j]} = ${f(sinB)}; ${'ABC'[j]} = ${f(Bj)}°${Bj > 90 ? ' (the obtuse option, 180° − acute)' : ''}.` });
      }
      return out;
    }
    function go() {
      try {
        const g = id => { const t = U.v(id).trim(); if (!t) return null; const x = evalExpr(t); if (!(x > 0)) throw new Error(`${id.slice(1)} must be positive`); return x; };
        tris = solve(['ta', 'tb', 'tc'].map(g), ['tA', 'tB', 'tC'].map(g));
        U.show(`${tris.length > 1 ? '<p class="hl"><b>Ambiguous case — two triangles fit.</b></p>' : ''}${tris.map((t, i) => `<p>${tris.length > 1 ? `<b>Triangle ${i + 1}</b><br>` : ''}$a=${f(t.s[0])},\\ b=${f(t.s[1])},\\ c=${f(t.s[2])}$<br>$A=${f(t.A[0])}^\\circ,\\ B=${f(t.A[1])}^\\circ,\\ C=${f(t.A[2])}^\\circ$<br>Area $=\\tfrac12ab\\sin C=${f(0.5 * t.s[0] * t.s[1] * Math.sin(t.A[2] * D))}$<br><span class="muted small">${t.how}</span></p>`).join('')}`);
        draw();
      } catch (e) { U.err(e); tris = []; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; P.clear(); if (!tris.length) return;
      const pts = tris.map(t => { const b = t.s[1], c = t.s[2]; return [[0, 0], [c, 0], [b * Math.cos(t.A[0] * D), b * Math.sin(t.A[0] * D)]]; });
      const all = pts.flat(), xs = all.map(p => p[0]), ys = all.map(p => p[1]), cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2, w = Math.max(Math.max(...xs) - Math.min(...xs), (Math.max(...ys) - Math.min(...ys)) * P.w / P.h) * 0.62;
      P.view(cx, cy, w); const ctx = P.ctx;
      pts.forEach((tr, i) => { ctx.beginPath(); tr.forEach((p, k) => (k ? ctx.lineTo(P.X(p[0]), P.Y(p[1])) : ctx.moveTo(P.X(p[0]), P.Y(p[1])))); ctx.closePath(); ctx.fillStyle = i ? 'rgba(240,111,176,.12)' : C.fill; ctx.fill(); ctx.strokeStyle = [C.a, C.d][i]; ctx.lineWidth = 2.5; ctx.stroke(); ['A', 'B', 'C'].forEach((L, k) => { if (i && k !== 1) return; P.text(L + (tris.length > 1 && k === 1 ? i + 1 : ''), tr[k][0], tr[k][1], C.fg, -14, k === 2 ? -8 : 16); }); });
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Trig equation solver (T7) ---------------- */
LAB.m_trigeq = {
  title: 'Trig equation solver', icon: '∿', course: 'm1', desc: 'f(nx + c) = k, or a quadratic a·f² + b·f + c = 0, for sin, cos or tan in any interval — every solution, with the method.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${LX.sel('qf', 'Function', [['sin', 'sin'], ['cos', 'cos'], ['tan', 'tan']], 'sin')}${LX.sel('qform', 'Form', [['lin', 'f(nx + c) = k'], ['quad', 'a·f(x)² + b·f(x) + c = 0']], 'lin')}${LX.sel('qu', 'Units', [['deg', 'degrees'], ['rad', 'radians']], 'deg')}</div>
      <div class="lab-row" id="rowlin">${field('n', '2', 'id="qn" size="3"')}${field('shift c', '0', 'id="qc" size="4"')}${field('k', '0.5', 'id="qk" size="5"')}</div>
      <div class="lab-row" id="rowquad" hidden>${field('a', '2', 'id="q2a" size="3"')}${field('b', '1', 'id="q2b" size="3"')}${field('c', '-1', 'id="q2c" size="3"')}</div>
      <div class="lab-row">${field('from', '0', 'id="qlo" size="5"')}${field('to', '360', 'id="qhi" size="5"')}<button class="btn small" data-go>Solve</button></div>`);
    let st = null;
    function base(f, k, deg) { const P = deg ? 180 : Math.PI, u = deg ? 180 / Math.PI : 1; if (f !== 'tan' && Math.abs(k) > 1 + 1e-12) return null; const kk = Math.max(-1, Math.min(1, k)); const a = f === 'sin' ? Math.asin(kk) * u : f === 'cos' ? Math.acos(kk) * u : Math.atan(k) * u; return { a, fam: f === 'sin' ? [[a, 2 * P], [P - a, 2 * P]] : f === 'cos' ? [[a, 2 * P], [-a, 2 * P]] : [[a, P]] }; }
    function within(fam, lo, hi) { const out = []; for (const [s, per] of fam) { let m = Math.ceil((lo - s) / per - 1e-9); for (let v = s + m * per; v <= hi + 1e-9; v += per) out.push(v); } return [...new Set(out.map(v => +v.toFixed(9)))].sort((x, y) => x - y); }
    function go() {
      try {
        el.querySelector('#rowlin').hidden = U.v('qform') === 'quad'; el.querySelector('#rowquad').hidden = U.v('qform') !== 'quad';
        const f = U.v('qf'), deg = U.v('qu') === 'deg', lo = U.n('qlo'), hi = U.n('qhi'), form = U.v('qform'), fmt = v => (deg ? `${+v.toFixed(2)}^\\circ` : (identify(v / Math.PI) && Math.abs(v) > 1e-12 ? `${identify(v / Math.PI).tex}\\pi`.replace(/^1\\pi/, '\\pi').replace(/^-1\\pi/, '-\\pi') : `${+v.toFixed(4)}`)), P2 = deg ? '360^\\circ' : '2\\pi', P1 = deg ? '180^\\circ' : '\\pi';
        if (hi <= lo) throw new Error('"to" must be bigger than "from"');
        let ks, steps = '';
        if (form === 'quad') { const a = U.n('q2a'), b = U.n('q2b'), c = U.n('q2c'), D = b * b - 4 * a * c; if (D < 0) { U.show(`<p>$${poly([[a, `\\${f}^2x`], [b, `\\${f} x`], [c, '']])}=0$ has no real roots for $\\${f} x$, so no solutions.</p>`); st = null; draw(); return; } ks = a ? [...new Set([(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)])] : [-c / b]; steps = `<p>Quadratic in $\\${f} x$: $\\${f} x=${ks.map(k => LX.t(k)).join('\\text{ or }')}$.</p>`; }
        else ks = [U.n('qk')];
        const n = form === 'quad' ? 1 : U.n('qn'), c0 = form === 'quad' ? 0 : U.n('qc'); if (n <= 0) throw new Error('Use n > 0');
        let xs = [];
        for (const k of ks) {
          const B = base(f, k, deg); if (!B) { steps += `<p>$\\${f}=${LX.t(k)}$ is impossible ($|k|\\gt1$) — rejected.</p>`; continue; }
          const ulo = n * lo + c0, uhi = n * hi + c0, us = within(B.fam, ulo, uhi), xk = us.map(u => (u - c0) / n);
          steps += `<p>$\\${f}\\,u=${LX.t(k)}$ with $u=${n === 1 ? '' : n}x${c0 ? (c0 > 0 ? '+' : '-') + fmt(Math.abs(c0)) : ''}$, range $${fmt(ulo)}\\le u\\le${fmt(uhi)}$.<br>Principal value $${fmt(B.a)}$; ${f === 'sin' ? `second $${P1}-\\alpha$` : f === 'cos' ? `second $-\\alpha$ (i.e. $${P2}-\\alpha$)` : `then add $${P1}$`}, repeating every $${f === 'tan' ? P1 : P2}$.<br>$u=${us.map(fmt).join(',\\ ') || '\\text{none in range}'}$</p>`;
          xs.push(...xk);
        }
        xs = [...new Set(xs.map(v => +v.toFixed(9)))].sort((a, b) => a - b);
        U.show(`${steps}<p class="hl"><b>${xs.length} solution${xs.length === 1 ? '' : 's'}:</b> $x=${xs.map(fmt).join(',\\ ') || '\\text{none}'}$</p>`);
        st = { f, deg, lo, hi, n, c0, ks, xs, form }; draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; P.clear(); if (!st) return; const u = st.deg ? Math.PI / 180 : 1, g = x => Math[st.f]((st.n * x + st.c0) * u), span = st.hi - st.lo;
      P.xmin = st.lo - span * 0.05; P.xmax = st.hi + span * 0.05; P.ymin = -2.2; P.ymax = 2.2; P.clear();
      const ctx = P.ctx; ctx.strokeStyle = C.grid; ctx.lineWidth = 1; const step = st.deg ? (span > 400 ? 90 : 30) : Math.PI / (span > 7 ? 2 : 6);
      ctx.beginPath(); for (let x = Math.ceil(P.xmin / step) * step; x <= P.xmax; x += step) { ctx.moveTo(P.X(x), 0); ctx.lineTo(P.X(x), P.h); } ctx.stroke();
      P.line(P.xmin, 0, P.xmax, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace'; for (let x = Math.ceil(P.xmin / step) * step; x <= P.xmax; x += step) ctx.fillText(st.deg ? `${Math.round(x)}°` : (x / Math.PI).toFixed(2) + 'π', P.X(x) - 10, P.Y(0) + 14);
      P.curve(g, C.a, 2.5, P.xmin, P.xmax, 1600);
      if (st.form === 'quad') st.ks.forEach(k => P.line(P.xmin, k, P.xmax, k, C.c, 1.5, [4, 4])); else P.line(P.xmin, st.ks[0], P.xmax, st.ks[0], C.c, 1.5, [4, 4]);
      st.xs.forEach(x => { P.dot(x, g(x), C.c, 6); P.line(x, 0, x, g(x), C.grid, 1, [2, 3]); });
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Lines & circles (G1–G8) ---------------- */
LAB.m_coord = {
  title: 'Lines & circles', icon: '⌖', course: 'm1', desc: 'Line through two points (gradient, midpoint, length, equations, perpendicular bisector) and a circle from either form, with the tangent at a point.',
  mount(el) {
    const U = LX.ui(el, `<p class="muted small"><b>Line</b> through P₁ and P₂</p><div class="lab-row">${field('P₁', '(1, 3)', 'id="cp1" size="8"')}${field('P₂', '(7, -1)', 'id="cp2" size="8"')}</div>
      <p class="muted small"><b>Circle</b> x² + y² + Dx + Ey + F = 0 (or set centre & radius)</p><div class="lab-row">${field('D', '-4', 'id="cD" size="4"')}${field('E', '-2', 'id="cE" size="4"')}${field('F', '-20', 'id="cF" size="4"')}</div>
      <div class="lab-row">${field('or centre', '', 'id="cc" size="8" placeholder="(a, b)"')}${field('radius', '', 'id="cr" size="4"')}${field('tangent at', '(5, 5)', 'id="ct" size="8"')}</div><button class="btn small" data-go>Calculate</button>`);
    let st = null;
    const pt = s => { const v = splitList(s.replace(/[()]/g, '')).map(evalExpr); if (v.length !== 2 || v.some(x => !isFinite(x))) throw new Error(`"${s}" should look like (2, -3)`); return v; };
    const lineEq = (a, b, c) => { const [A, Bc, Cc] = LX.intCoeffs(a, b, c); return `${poly([[A, 'x'], [Bc, 'y'], [Cc, '']])}=0`; };
    function go() {
      try {
        const [x1, y1] = pt(U.v('cp1')), [x2, y2] = pt(U.v('cp2')); let html = '';
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1), vert = Math.abs(x2 - x1) < 1e-12;
        const m = vert ? Infinity : (y2 - y1) / (x2 - x1);
        html += `<p><b>Line P₁P₂</b><br>Gradient $m=${vert ? '\\text{undefined (vertical)}' : `\\dfrac{${LX.t(y2 - y1)}}{${LX.t(x2 - x1)}}=${LX.t(m)}`}$<br>Midpoint $(${LX.t(mx)},\\ ${LX.t(my)})$, length $${LX.t(L)}$<br>
          ${vert ? `$x=${LX.t(x1)}$` : `$y${LX.sg(-y1)}=${LX.t(m)}\\left(x${LX.sg(-x1)}\\right)$, i.e. $${lineEq(m, -1, y1 - m * x1)}$`}<br>
          Perpendicular bisector: ${Math.abs(m) < 1e-12 ? `$x=${LX.t(mx)}$` : vert ? `$y=${LX.t(my)}$` : `gradient $${LX.t(-1 / m)}$, $${lineEq(-1 / m, -1, my + mx / m)}$`}</p>`;
        let a, b, r; const cc = U.v('cc').trim();
        if (cc) { [a, b] = pt(cc); r = U.n('cr'); } else { const D = U.n('cD'), E = U.n('cE'), F = U.n('cF'); a = -D / 2; b = -E / 2; const r2 = a * a + b * b - F; if (r2 <= 0) throw new Error('g² + f² − c ≤ 0: not a real circle'); r = Math.sqrt(r2); }
        html += `<p><b>Circle</b><br>$(x${LX.sg(-a)})^2+(y${LX.sg(-b)})^2=${LX.t(r * r)}$<br>Centre $(${LX.t(a)},\\ ${LX.t(b)})$, radius $${LX.t(r)}$<br>Expanded: $x^2+y^2${LX.sg(-2 * a)}x${LX.sg(-2 * b)}y${LX.sg(a * a + b * b - r * r)}=0$</p>`;
        let tan = null; const ts = U.v('ct').trim();
        if (ts) { const [px, py] = pt(ts), on = Math.abs(Math.hypot(px - a, py - b) - r) < 1e-6 * (1 + r);
          if (!on) html += `<p class="lab-err">(${LX.t(px)}, ${LX.t(py)}) is not on the circle (its distance from the centre is ${num(Math.hypot(px - a, py - b))}).</p>`;
          else { const dx = px - a, dy = py - b; tan = { px, py, dx, dy }; html += `<p><b>Tangent at</b> $(${LX.t(px)},${LX.t(py)})$: radius gradient $${Math.abs(dx) < 1e-12 ? '\\infty' : LX.t(dy / dx)}$, so the tangent ${Math.abs(dy) < 1e-12 ? `is vertical: $x=${LX.t(px)}$` : `has gradient $${LX.t(-dx / dy)}$: $${lineEq(dx, dy, -(dx * px + dy * py))}$`}.</p>`; } }
        st = { x1, y1, x2, y2, a, b, r, tan, m, vert, mx, my }; U.show(html); draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; if (!st) { P.clear(); return; } const ext = Math.max(6, Math.abs(st.a) + st.r + 2, Math.abs(st.b) + st.r + 2, Math.abs(st.x1) + 2, Math.abs(st.x2) + 2, Math.abs(st.y1) + 2, Math.abs(st.y2) + 2);
      P.view(0, 0, ext); P.clear(); P.grid(ext > 14 ? 2 : 1, true);
      if (st.vert) P.line(st.x1, P.ymin, st.x1, P.ymax, C.a, 2.5); else P.curve(x => st.y1 + st.m * (x - st.x1), C.a, 2.5);
      if (Math.abs(st.m) < 1e-12) P.line(st.mx, P.ymin, st.mx, P.ymax, C.b, 1.5, [5, 4]); else if (!st.vert) P.curve(x => st.my - (x - st.mx) / st.m, C.b, 1.5); else P.line(P.xmin, st.my, P.xmax, st.my, C.b, 1.5, [5, 4]);
      P.dot(st.x1, st.y1, C.a, 6); P.dot(st.x2, st.y2, C.a, 6); P.dot(st.mx, st.my, C.b, 5);
      P.circle(st.a, st.b, st.r, C.d, 2.5); P.dot(st.a, st.b, C.d, 5);
      if (st.tan) { const { px, py, dx, dy } = st.tan; P.line(st.a, st.b, px, py, C.c, 1.5, [3, 3]); if (Math.abs(dy) < 1e-12) P.line(px, P.ymin, px, P.ymax, C.c, 2.5); else P.curve(x => py - dx / dy * (x - px), C.c, 2.5); P.dot(px, py, C.c, 6); }
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Binomial expander (S1, S2) ---------------- */
LAB.m_binom = {
  title: 'Binomial expander', icon: 'ⁿCᵣ', course: 'm1', desc: 'Expand (a + bx)ⁿ for positive integer n with exact coefficients, pick out any term, and estimate a power with a small x.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('a', '2', 'id="ba" size="5"')}${field('b', '-1/2', 'id="bb" size="5"')}${field('n', '6', 'id="bn" size="3"')}</div><div class="lab-row">${field('term in xʳ, r =', '2', 'id="br" size="3"')}${field('estimate at x =', '0.02', 'id="bx" size="5"')}<button class="btn small" data-go>Expand</button></div>`, { graph: false });
    function go() {
      try {
        const a = U.n('ba'), b = U.n('bb'), n = Math.round(U.n('bn')), r = Math.round(U.n('br')), x = U.v('bx').trim() ? U.n('bx') : null; if (n < 1 || n > 30) throw new Error('n should be a positive integer up to 30');
        const co = Array.from({ length: n + 1 }, (_, k) => nCr(n, k) * Math.pow(a, n - k) * Math.pow(b, k));
        const terms = co.map((c, k) => [c, k === 0 ? '' : k === 1 ? 'x' : `x^{${k}}`]);
        const expansion = terms.map(([c, v], k) => (Math.abs(c) < 1e-12 ? '' : (k ? (c < 0 ? '-' : '+') : c < 0 ? '-' : '') + (v && Math.abs(Math.abs(c) - 1) < 1e-12 ? '' : LX.t(Math.abs(c))) + v)).join('').replace(/^\+/, '');
        let html = `<p>$(${LX.t(a)}${LX.sg(b)}x)^{${n}}=\\displaystyle\\sum_{k=0}^{${n}}\\binom{${n}}{k}(${LX.t(a)})^{${n}-k}(${LX.t(b)}x)^k$</p><p class="hl">$=${expansion}$</p>`;
        if (r >= 0 && r <= n) html += `<p>Term in $x^{${r}}$: $\\binom{${n}}{${r}}(${LX.t(a)})^{${n - r}}(${LX.t(b)})^{${r}}=${nCr(n, r)}\\times${LX.t(Math.pow(a, n - r))}\\times${LX.t(Math.pow(b, r))}=${LX.t(co[r])}$</p>`;
        if (x !== null) { const exact = Math.pow(a + b * x, n), f4 = co.slice(0, 4).reduce((s, c, k) => s + c * Math.pow(x, k), 0); html += `<p>At $x=${LX.t(x)}$: first four terms give $${num(f4, 8)}$; exact $(${num(a + b * x, 8)})^{${n}}=${num(exact, 8)}$.</p>`; }
        html += `<p class="muted small">Pascal's row ${n}: ${Array.from({ length: n + 1 }, (_, k) => nCr(n, k)).join(', ')}</p>`;
        U.show(html);
      } catch (e) { U.err(e); }
    }
    LX.bind(el, go);
    return () => { };
  },
};

/* ---------------- Exponentials & logs (E3–E10) ---------------- */
LAB.m_explog = {
  title: 'Exponentials & logs', icon: 'eˣ', course: 'm1', desc: 'Solve aˣ = b and aˣ < b (with the reversal rule), evaluate logₐ b, and fit N = N₀eᵏᵗ to two data points.',
  mount(el) {
    const U = LX.ui(el, `<p class="muted small"><b>Equation / inequality</b></p><div class="lab-row">${field('a', '0.8', 'id="ea" size="5"')}${LX.sel('eop', 'aˣ ? b', [['=', '='], ['<', '<'], ['>', '>']], '<')}${field('b', '0.01', 'id="eb" size="5"')}</div>
      <p class="muted small"><b>Model N = N₀eᵏᵗ</b> through two points (and when it reaches a target)</p><div class="lab-row">${field('t₁', '2', 'id="et1" size="3"')}${field('N₁', '1200', 'id="en1" size="5"')}${field('t₂', '7', 'id="et2" size="3"')}${field('N₂', '1800', 'id="en2" size="5"')}${field('target', '3000', 'id="ent" size="5"')}</div><button class="btn small" data-go>Solve</button>`, { graph: false });
    function go() {
      try {
        const a = U.n('ea'), b = U.n('eb'), op = U.v('eop'); if (!(a > 0) || a === 1) throw new Error('Use a > 0, a ≠ 1');
        let html = '';
        if (!(b > 0)) html += `<p>$${LX.t(a)}^x$ is always positive, so $${LX.t(a)}^x${op === '<' ? '\\lt' : op === '>' ? '\\gt' : '='}${LX.t(b)}$ has ${op === '>' ? 'every real $x$ as a solution' : 'no solutions'}.</p>`;
        else { const x = Math.log(b) / Math.log(a), rev = a < 1 && op !== '='; const rel = op === '=' ? '=' : (op === '<') !== rev ? '\\lt' : '\\gt';
          html += `<p>Take logs: $x\\ln ${LX.t(a)}${op === '=' ? '=' : op === '<' ? '\\lt' : '\\gt'}\\ln ${LX.t(b)}$.${rev ? ` Since $\\ln ${LX.t(a)}\\lt0$, dividing <b>reverses</b> the inequality.` : ''}</p><p class="hl">$x${rel}\\dfrac{\\ln ${LX.t(b)}}{\\ln ${LX.t(a)}}=\\log_{${LX.t(a)}}${LX.t(b)}=${num(x, 6)}$</p>${op !== '=' ? `<p>Smallest integer: $${rel === '\\gt' ? Math.floor(x) + 1 : '—'}$ · largest integer: $${rel === '\\lt' ? Math.ceil(x) - 1 : '—'}$</p>` : ''}`; }
        const t1 = U.n('et1'), N1 = U.n('en1'), t2 = U.n('et2'), N2 = U.n('en2'); if (t1 === t2 || !(N1 > 0) || !(N2 > 0)) throw new Error('Need two different times and positive values');
        const k = Math.log(N2 / N1) / (t2 - t1), N0 = N1 * Math.exp(-k * t1), T2 = Math.log(2) / Math.abs(k);
        html += `<p><b>Model</b>: dividing, $\\dfrac{${LX.t(N2)}}{${LX.t(N1)}}=e^{${LX.t(t2 - t1)}k}\\Rightarrow k=${num(k, 6)}$; $N_0=${LX.t(N1)}e^{-${LX.t(t1)}k}=${num(N0, 6)}$.<br>$N=${num(N0, 5)}e^{${num(k, 5)}t}$ — ${k > 0 ? 'doubling time' : 'half-life'} $\\dfrac{\\ln2}{|k|}=${num(T2, 5)}$.</p>`;
        const tgt = U.v('ent').trim() ? U.n('ent') : null; if (tgt !== null && tgt > 0) { const tt = Math.log(tgt / N0) / k; html += `<p>Reaches ${LX.t(tgt)} when $t=\\dfrac{\\ln(${LX.t(tgt)}/N_0)}{k}=${num(tt, 5)}$${tt < 0 ? ' (in the past)' : ''}.</p>`; }
        U.show(html);
      } catch (e) { U.err(e); }
    }
    LX.bind(el, go);
    return () => { };
  },
};

/* ---------------- 2D vectors (V1–V5) ---------------- */
LAB.m_vec = {
  title: '2D vectors', icon: '→', course: 'm1', desc: 'Component ↔ magnitude/direction, a ± b, λa, unit vectors, and AB, distance and midpoint from position vectors.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('a = (x, y)', '(3, -4)', 'id="va" size="9"')}${field('b = (x, y)', '(1, 2.5)', 'id="vb" size="9"')}${field('λ', '1.5', 'id="vl" size="4"')}</div>
      <div class="lab-row">${field('or a from |a|', '', 'id="vm" size="5"')}${field('at angle θ° from i', '', 'id="vt" size="5"')}<button class="btn small" data-go>Calculate</button></div><p class="muted small">a and b are also used as the position vectors of A and B.</p>`);
    let st = null;
    const pt = s => { const v = splitList(s.replace(/[()]/g, '')).map(evalExpr); if (v.length !== 2 || v.some(x => !isFinite(x))) throw new Error(`"${s}" should look like (3, -4)`); return v; };
    const vt = ([x, y]) => `${poly([[x, '\\mathbf i'], [y, '\\mathbf j']]) || '\\mathbf 0'}`, mag = v => Math.hypot(...v), dir = v => Math.atan2(v[1], v[0]) * 180 / Math.PI;
    function go() {
      try {
        let a = pt(U.v('va')); const b = pt(U.v('vb')), l = U.n('vl');
        if (U.v('vm').trim()) { const M = U.n('vm'), t = U.n('vt') * Math.PI / 180; a = [M * Math.cos(t), M * Math.sin(t)].map(v => (Math.abs(v) < 1e-12 ? 0 : v)); }
        const s = [a[0] + b[0], a[1] + b[1]], d = [b[0] - a[0], b[1] - a[1]];
        U.show(`<p>$\\mathbf a=${vt(a)}$: $|\\mathbf a|=${LX.t(mag(a))}$, direction $${num(dir(a), 5)}^\\circ$ from $\\mathbf i$${mag(a) ? `; unit vector $\\hat{\\mathbf a}=${LX.t(a[0] / mag(a))}\\mathbf i${LX.sg(a[1] / mag(a))}\\mathbf j$` : ''}</p>
          <p>$\\mathbf b=${vt(b)}$: $|\\mathbf b|=${LX.t(mag(b))}$, direction $${num(dir(b), 5)}^\\circ$</p>
          <p>$\\mathbf a+\\mathbf b=${vt(s)}$, $\\ \\mathbf a-\\mathbf b=${vt([-d[0], -d[1]])}$, $\\ ${LX.t(l)}\\mathbf a=${vt([l * a[0], l * a[1]])}$</p>
          <p class="hl">$\\overrightarrow{AB}=\\mathbf b-\\mathbf a=${vt(d)}$, distance $AB=${LX.t(mag(d))}$, midpoint $\\left(${LX.t((a[0] + b[0]) / 2)},\\ ${LX.t((a[1] + b[1]) / 2)}\\right)$</p>
          <p class="muted small">${Math.abs(a[0] * b[1] - a[1] * b[0]) < 1e-12 ? 'a and b are parallel (one is a scalar multiple of the other).' : 'a and b are not parallel.'}</p>`);
        st = { a, b, s }; draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; if (!st) { P.clear(); return; } const m = Math.max(4, ...[...st.a, ...st.b, ...st.s].map(Math.abs)) * 1.2; P.view(0, 0, m); P.clear(); P.grid(m > 10 ? 2 : 1, true);
      P.arrow(0, 0, st.a[0], st.a[1], C.a); P.arrow(0, 0, st.b[0], st.b[1], C.b); P.arrow(0, 0, st.s[0], st.s[1], C.c, 2); P.line(st.a[0], st.a[1], st.s[0], st.s[1], C.b, 1, [4, 4]); P.line(st.b[0], st.b[1], st.s[0], st.s[1], C.a, 1, [4, 4]);
      P.arrow(st.a[0], st.a[1], st.b[0], st.b[1], C.d, 1.8); P.text('A', st.a[0], st.a[1], C.a); P.text('B', st.b[0], st.b[1], C.b); P.text('a+b', st.s[0], st.s[1], C.c);
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Tangents, normals & stationary points (D1–D8) ---------------- */
LAB.m_diff = {
  title: 'Tangents & stationary points', icon: 'd/dx', course: 'm1', desc: 'For any f(x): gradient, tangent and normal at a point, second derivative, every stationary point with its nature, and where f is increasing.',
  mount(el) {
    const U = LX.ui(el, `${field('f(x) =', 'x^3 - 6x^2 + 9x + 1', 'id="dfx" class="wide"')}<div class="lab-row">${field('at x =', '2', 'id="dx0" size="4"')}${field('search from', '-5', 'id="dlo" size="4"')}${field('to', '8', 'id="dhi" size="4"')}<button class="btn small" data-go>Analyse</button></div>`);
    let st = null;
    function go() {
      try {
        const f = fn(U.v('dfx'), ['x']), x0 = U.n('dx0'), lo = U.n('dlo'), hi = U.n('dhi'), h = 1e-4;
        const d1 = x => (f(x - 2 * h) - 8 * f(x - h) + 8 * f(x + h) - f(x + 2 * h)) / (12 * h), h2 = 1e-3, d2 = x => (-f(x + 2 * h2) + 16 * f(x + h2) - 30 * f(x) + 16 * f(x - h2) - f(x - 2 * h2)) / (12 * h2 * h2);
        const y0 = f(x0), m = d1(x0), m2 = d2(x0); if (!isFinite(y0) || !isFinite(m)) throw new Error('f is not defined/differentiable there');
        const sp = LX.roots(d1, lo, hi, 6000).map(x => { const k = d2(x), l = d1(x - 1e-3), r = d1(x + 1e-3); return { x, y: f(x), nat: k > 1e-6 ? 'minimum' : k < -1e-6 ? 'maximum' : (l * r < 0 ? (l < 0 ? 'minimum' : 'maximum') : 'point of inflection') , k }; });
        const cuts = [lo, ...sp.map(q => q.x), hi], inc = []; for (let i = 0; i + 1 < cuts.length; i++) { const s = d1((cuts[i] + cuts[i + 1]) / 2) > 0, last = inc[inc.length - 1]; if (last && last.s === s) last.b = cuts[i + 1]; else inc.push({ s, a: cuts[i], b: cuts[i + 1] }); }
        U.show(`<p>$f(${LX.t(x0)})=${LX.t(y0)}$, $f'(${LX.t(x0)})=${LX.t(m)}$, $f''(${LX.t(x0)})=${LX.t(Math.round(m2 * 1e5) / 1e5)}$</p>
          <p class="hl">Tangent: $y${LX.sg(-y0)}=${LX.t(m)}\\left(x${LX.sg(-x0)}\\right)$ → $y=${LX.ex([[m, 'x'], [y0 - m * x0, '']])}$<br>Normal: ${Math.abs(m) < 1e-9 ? `$x=${LX.t(x0)}$` : `gradient $${LX.t(-1 / m)}$ → $y=${LX.ex([[-1 / m, 'x'], [y0 + x0 / m, '']])}$`}</p>
          <p><b>Stationary points</b> in $[${LX.t(lo)},${LX.t(hi)}]$: ${sp.length ? sp.map(s => `$(${LX.t(s.x)},\\ ${LX.t(s.y)})$ — ${s.nat} ($f''=${LX.t(Math.round(s.k * 1e5) / 1e5)}$)`).join('<br>') : 'none'}</p>
          <p><b>Increasing</b> on ${inc.filter(r => r.s).map(r => `$(${LX.t(r.a)},\\ ${LX.t(r.b)})$`).join(', ') || 'nowhere in range'}; <b>decreasing</b> on ${inc.filter(r => !r.s).map(r => `$(${LX.t(r.a)},\\ ${LX.t(r.b)})$`).join(', ') || 'nowhere in range'} (within the search range).</p>
          <p class="muted small">Values come from the graph numerically and are shown exactly where they are recognisable. Use them to check your own differentiation.</p>`);
        st = { f, x0, y0, m, sp, lo, hi }; draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; if (!st) { P.clear(); return; } const ys = []; for (let i = 0; i <= 200; i++) { const y = st.f(st.lo + (st.hi - st.lo) * i / 200); if (isFinite(y)) ys.push(y); } ys.sort((a, b) => a - b);
      const ylo = ys[Math.floor(ys.length * 0.03)] ?? -5, yhi = ys[Math.floor(ys.length * 0.97)] ?? 5; P.xmin = st.lo; P.xmax = st.hi; const pad = Math.max(1, (yhi - ylo) * 0.15); P.ymin = ylo - pad; P.ymax = yhi + pad; P.clear();
      const ctx = P.ctx; ctx.strokeStyle = C.axis; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(P.X(0), 0); ctx.lineTo(P.X(0), P.h); ctx.moveTo(0, P.Y(0)); ctx.lineTo(P.w, P.Y(0)); ctx.stroke();
      P.curve(st.f, C.a, 3, P.xmin, P.xmax, 1200); P.curve(x => st.y0 + st.m * (x - st.x0), C.c, 1.8); if (Math.abs(st.m) > 1e-9) P.curve(x => st.y0 - (x - st.x0) / st.m, C.b, 1.4); P.dot(st.x0, st.y0, C.c, 6); st.sp.forEach(s => P.dot(s.x, s.y, C.d, 6));
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Definite integrals & area with either axis (I3, I4) ---------------- */
LAB.m_area = {
  title: 'Area with either axis', icon: '∫', course: 'm1', desc: 'Signed definite integral and true area between a curve and the x-axis (split at the roots) — or between x = g(y) and the y-axis.',
  mount(el) {
    const U = LX.ui(el, `${LX.sel('aax', 'Axis', [['x', 'x-axis: y = f(x)'], ['y', 'y-axis: x = g(y)']], 'x')}${field('function', 'x^2 - 4x + 3', 'id="af" class="wide"')}<div class="lab-row">${field('from', '0', 'id="alo" size="4"')}${field('to', '3', 'id="ahi" size="4"')}<button class="btn small" data-go>Calculate</button></div>`);
    let st = null;
    function go() {
      try {
        const ax = U.v('aax'), v = ax === 'x' ? 'x' : 'y', f = fn(U.v('af'), [v]), a = U.n('alo'), b = U.n('ahi'); if (b <= a) throw new Error('"to" must be bigger than "from"');
        const I = integrate(f, a, b), rts = LX.roots(f, a, b, 4000).filter(r => r > a + 1e-9 && r < b - 1e-9), cuts = [a, ...rts, b], parts = cuts.slice(1).map((c, i) => integrate(f, cuts[i], c)), A = parts.reduce((s, p) => s + Math.abs(p), 0);
        U.show(`<p>$\\displaystyle\\int_{${LX.t(a)}}^{${LX.t(b)}}${ax === 'x' ? 'f(x)\\,dx' : 'g(y)\\,dy'}=${LX.t(I)}$</p>${rts.length ? `<p>The curve crosses the ${ax}-axis${ax === 'y' ? '' : ''} at $${v}=${rts.map(LX.t).join(',\\ ')}$, so split there: ${parts.map((p, i) => `$\\int_{${LX.t(cuts[i])}}^{${LX.t(cuts[i + 1])}}=${LX.t(p)}$`).join(', ')}.</p>` : ''}<p class="hl">Area $=${LX.t(A)}$${Math.abs(A - Math.abs(I)) > 1e-9 ? ' — <b>not</b> the same as the integral, because part of the region is on the other side of the axis' : ''}.</p><p class="muted small">${ax === 'y' ? 'With the y-axis: area = ∫ x dy, with y-limits.' : 'Parts below the x-axis give negative integrals.'}</p>`);
        st = { ax, f, a, b }; draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; if (!st) { P.clear(); return; } const { f, a, b } = st, sp = b - a, vals = []; for (let i = 0; i <= 200; i++) { const y = f(a - sp * 0.3 + sp * 1.6 * i / 200); if (isFinite(y)) vals.push(y); }
      const m = Math.max(2, ...vals.map(Math.abs).sort((p, q) => p - q).slice(0, Math.floor(vals.length * 0.95))) * 1.15, mid = (a + b) / 2, ctx = P.ctx;
      if (st.ax === 'x') { P.view(mid, 0, Math.max(sp * 0.8, m * P.w / P.h)); } else { P.view(0, mid, Math.max(m, sp * 0.8 * P.w / P.h)); }
      P.clear(); P.grid(P.xmax - P.xmin > 20 ? 2 : 1, true);
      const N = 400; for (let i = 0; i < N; i++) { const t = a + (b - a) * (i + 0.5) / N, w = f(t); if (!isFinite(w)) continue; ctx.fillStyle = w >= 0 ? 'rgba(124,156,255,.28)' : 'rgba(240,111,176,.3)'; if (st.ax === 'x') { const x1 = P.X(a + (b - a) * i / N), x2 = P.X(a + (b - a) * (i + 1) / N); ctx.fillRect(x1, Math.min(P.Y(0), P.Y(w)), x2 - x1 + 0.5, Math.abs(P.Y(w) - P.Y(0))); } else { const y1 = P.Y(a + (b - a) * (i + 1) / N), y2 = P.Y(a + (b - a) * i / N); ctx.fillRect(Math.min(P.X(0), P.X(w)), y1, Math.abs(P.X(w) - P.X(0)), y2 - y1 + 0.5); } }
      if (st.ax === 'x') P.curve(f, C.a, 3); else P.param(f, y => y, P.ymin, P.ymax, C.a, 3, 1200);
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};
