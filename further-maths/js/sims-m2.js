// Simulations for Maths AS 2: kinematics graphs, forces, pulleys, inclined planes, histograms, correlation, binomial.
'use strict';

/* ---------- velocity–time graph ---------- */
SIMS.m2_vt = {
  title: 'Velocity–time graphs: gradient and area', desc: 'Drag the corners of the v–t graph. Gradient = acceleration, area = displacement; the particle below moves to match.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let pts = [[0, 0], [4, 12], [12, 12], [16, 0]], t0 = performance.now(), play = true;
    P.handles = pts.map((_, i) => ({ get: () => pts[i], set: (x, y) => { const lo = i ? pts[i - 1][0] + 0.5 : 0, hi = i < pts.length - 1 ? pts[i + 1][0] - 0.5 : 30; pts[i] = [i ? Math.min(hi, Math.max(lo, x)) : 0, Math.max(-15, Math.min(20, y))]; }, snap: 0.5 }));
    check(S.ctrls, 'Animate the particle', play, v => { play = v; });
    button(S.ctrls, 'Reset', () => { pts.splice(0, 4, [0, 0], [4, 12], [12, 12], [16, 0]); });
    const vAt = t => { for (let i = 0; i < pts.length - 1; i++) { const [a, va] = pts[i], [b, vb] = pts[i + 1]; if (t <= b) return va + (vb - va) * (t - a) / (b - a); } return pts[pts.length - 1][1]; };
    const sAt = t => { let s = 0; for (let i = 0; i < pts.length - 1; i++) { const [a, va] = pts[i], [b, vb] = pts[i + 1]; if (t <= a) break; const e = Math.min(t, b), ve = va + (vb - va) * (e - a) / (b - a); s += (va + ve) / 2 * (e - a); } return s; };
    const stop = loop(now => {
      const C = COL(), T = pts[pts.length - 1][0]; P.view(T / 2 + 1, 4, T / 2 + 3); P.clear(); P.grid(2, true, 't (s)', 'v (m/s)');
      const ctx = P.ctx; ctx.beginPath(); ctx.moveTo(P.X(pts[0][0]), P.Y(0)); pts.forEach(([t, v]) => ctx.lineTo(P.X(t), P.Y(v))); ctx.lineTo(P.X(T), P.Y(0)); ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      for (let i = 0; i < pts.length - 1; i++) P.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.a, 3);
      pts.forEach(([t, v]) => P.dot(t, v, C.b, 6));
      const tt = play ? ((now - t0) / 1000 * 2) % (T + 2) : T, tc = Math.min(tt, T); P.line(tc, P.ymin, tc, P.ymax, C.c, 1, [4, 4]);
      // particle track along the bottom of the canvas
      const smax = Math.max(1, ...Array.from({ length: 50 }, (_, k) => Math.abs(sAt(T * k / 49)))), y = P.ymin + (P.ymax - P.ymin) * 0.06, s = sAt(tc);
      P.line(P.xmin + 0.3, y, P.xmax - 0.3, y, C.grid, 2); P.dot(P.xmin + 0.5 + (s / smax) * (P.xmax - P.xmin - 1) * 0.5 + (P.xmax - P.xmin - 1) * 0.5, y, C.c, 8);
      let disp = 0, dist = 0; const segs = [];
      for (let i = 0; i < pts.length - 1; i++) { const [a, va] = pts[i], [b, vb] = pts[i + 1], g = (vb - va) / (b - a); segs.push(`<li>${f3(a)}–${f3(b)} s: $a=${f3(g)}$ m s⁻²</li>`);
        const N = 200; for (let k = 0; k < N; k++) { const v = va + (vb - va) * (k + 0.5) / N; disp += v * (b - a) / N; dist += Math.abs(v) * (b - a) / N; } }
      setRead(S.read, `<p class="hl">Displacement (signed area) $=${f3(disp)}$ m<br>Distance travelled $=${f3(dist)}$ m</p><ul>${segs.join('')}</ul><p>At $t=${f3(tc)}$ s: $v=${f3(vAt(tc))}$ m s⁻¹, $s=${f3(s)}$ m</p><p class="muted">Drag a corner below the axis: that area counts as negative displacement but positive distance.</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- forces on a particle ---------- */
SIMS.m2_forces = {
  title: 'Forces on a particle: resolving and the resultant', desc: 'Set up to three forces. See their components, the resultant, and the force needed for equilibrium.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.2);
    const F = [[10, 0], [8, 120], [6, 230]]; let eq = false;
    F.forEach((f, i) => { slider(S.ctrls, `F${i + 1} magnitude (N)`, 0, 20, 0.5, f[0], v => { f[0] = v; draw(); }); slider(S.ctrls, `F${i + 1} angle (°)`, 0, 360, 5, f[1], v => { f[1] = v; draw(); }, v => v + '°'); });
    check(S.ctrls, 'Show the balancing force', eq, v => { eq = v; draw(); });
    function draw() {
      const C = COL(), cols = [C.a, C.b, C.d]; P.view(0, 0, 22); P.clear(); P.grid(5, true);
      let X = 0, Y = 0; F.forEach(([m, a], i) => { const x = m * Math.cos(a * Math.PI / 180), y = m * Math.sin(a * Math.PI / 180); X += x; Y += y; if (m) { P.line(x, 0, x, y, cols[i], 1, [3, 3]); P.arrow(0, 0, x, y, cols[i], 2.5); P.text(`F${i + 1}`, x, y, cols[i]); } });
      const R = Math.hypot(X, Y), dir = (Math.atan2(Y, X) * 180 / Math.PI + 360) % 360;
      if (R > 0.05) { P.arrow(0, 0, X, Y, C.c, 4); P.text('R', X, Y, C.c, 8, -8, 'bold 14px system-ui'); }
      if (eq && R > 0.05) { P.arrow(0, 0, -X, -Y, C.fg, 2.5); P.text('balance', -X, -Y, C.fg); }
      P.dot(0, 0, C.fg, 6);
      setRead(S.read, `<p>Components: ${F.map(([m, a], i) => `$F_${i + 1}$: $(${f3(m * Math.cos(a * Math.PI / 180))},\\ ${f3(m * Math.sin(a * Math.PI / 180))})$`).join('<br>')}</p><p class="hl">Resultant $(${f3(X)}\\mathbf i${Y < 0 ? '-' : '+'}${f3(Math.abs(Y))}\\mathbf j)$ N<br>$|R|=${f3(R)}$ N at $${f3(dir)}^\\circ$</p><p class="muted">${R < 0.05 ? 'The forces are in equilibrium.' : `To balance them you need $${f3(R)}$ N at $${f3((dir + 180) % 360)}^\\circ$.`}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- connected particles over a pulley ---------- */
SIMS.m2_pulley = {
  title: 'Connected particles over a pulley', desc: 'Two particles joined by a light inextensible string over a smooth pulley — both hanging, or one on a (rough) table.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let type = 'table', m1 = 3, m2 = 2, mu = 0, t0 = null, run = false;
    select(S.ctrls, 'Set-up', [['table', 'A on a table, B hanging'], ['hang', 'Both hanging']], v => { type = v; reset(); }, type);
    slider(S.ctrls, 'mass A (kg)', 0.5, 10, 0.5, m1, v => { m1 = v; reset(); });
    slider(S.ctrls, 'mass B (kg)', 0.5, 10, 0.5, m2, v => { m2 = v; reset(); });
    slider(S.ctrls, 'μ (table)', 0, 1, 0.05, mu, v => { mu = v; reset(); });
    button(S.ctrls, 'Release', () => { run = true; t0 = null; });
    function reset() { run = false; t0 = null; }
    const model = () => { if (type === 'hang') { const a = (m2 - m1) * G / (m1 + m2); return { a, T: 2 * m1 * m2 * G / (m1 + m2) }; } const drive = m2 * G, fr = mu * m1 * G; if (drive <= fr) return { a: 0, T: drive, stuck: true }; const a = (drive - fr) / (m1 + m2); return { a, T: m1 * a + fr }; };
    const stop = loop(now => {
      const C = COL(), M = model(); let s = 0; if (run) { if (t0 === null) t0 = now; const t = (now - t0) / 1000; s = Math.min(0.5 * Math.abs(M.a) * t * t, 2.2); }
      P.view(0, 0, 5); P.clear(); const ctx = P.ctx;
      if (type === 'table') { ctx.fillStyle = C.grid; ctx.fillRect(P.X(-4.8), P.Y(0), P.X(2) - P.X(-4.8), P.Y(-3.5) - P.Y(0)); P.circle(2.2, 0.2, 0.2, C.fg, 2);
        const ax = -2.5 + s, by = -0.8 - s; P.line(ax + 0.5, 0.4, 2.2, 0.4, C.text, 2); P.line(2.4, 0.2, 2.4, by + 0.4, C.text, 2);
        ctx.fillStyle = C.a; ctx.fillRect(P.X(ax - 0.5), P.Y(0.8), P.X(ax + 0.5) - P.X(ax - 0.5), P.Y(0) - P.Y(0.8)); ctx.fillStyle = C.b; ctx.fillRect(P.X(2.05), P.Y(by + 0.4), P.X(2.75) - P.X(2.05), P.Y(by - 0.3) - P.Y(by + 0.4));
        P.text('A', ax - 0.15, 0.25, C.bg, 0, 4, 'bold 14px system-ui'); P.text('B', 2.25, by - 0.05, C.bg, 0, 4, 'bold 14px system-ui');
      } else { const d = M.a >= 0 ? s : -s, ya = -1 - d, yb = -1 + d; P.circle(0, 2.5, 0.6, C.fg, 2); P.line(-0.6, 2.5, -0.6, ya + 0.4, C.text, 2); P.line(0.6, 2.5, 0.6, yb + 0.4, C.text, 2);
        ctx.fillStyle = C.a; ctx.fillRect(P.X(-0.95), P.Y(ya + 0.4), P.X(-0.25) - P.X(-0.95), P.Y(ya - 0.3) - P.Y(ya + 0.4)); ctx.fillStyle = C.b; ctx.fillRect(P.X(0.25), P.Y(yb + 0.4), P.X(0.95) - P.X(0.25), P.Y(yb - 0.3) - P.Y(yb + 0.4));
        P.text('A', -0.75, ya + 0.05, C.bg, 0, 4, 'bold 14px system-ui'); P.text('B', 0.45, yb + 0.05, C.bg, 0, 4, 'bold 14px system-ui'); }
      const eqs = type === 'hang' ? `<p>A: $T-${m1}g=${m1}a_A$<br>B: $${m2}g-T=${m2}a_B$ (B down positive)</p>` : `<p>A: $T-${f3(mu)}(${m1}g)=${m1}a$<br>B: $${m2}g-T=${m2}a$</p>`;
      setRead(S.read, `${eqs}<p class="hl">${M.stuck ? 'Friction holds the system: it stays at rest.' : `$a=${f3(Math.abs(M.a))}$ m s⁻² ${type === 'hang' ? (M.a > 0 ? '(B goes down)' : M.a < 0 ? '(A goes down)' : '(balanced)') : ''}`}<br>$T=${f3(M.T)}$ N</p><p class="muted">Light, inextensible string over a smooth pulley: same tension on both sides, same size of acceleration.</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- block on an inclined plane ---------- */
SIMS.m2_incline = {
  title: 'Block on a rough inclined plane', desc: 'Change the angle, μ and a force P up the slope. See the forces, whether friction is limiting, and which way the block moves.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    let th = 30, mu = 0.3, m = 5, Pf = 0;
    slider(S.ctrls, 'angle θ', 0, 70, 1, th, v => { th = v; draw(); }, v => v + '°');
    slider(S.ctrls, 'μ', 0, 1.2, 0.05, mu, v => { mu = v; draw(); });
    slider(S.ctrls, 'mass (kg)', 1, 20, 1, m, v => { m = v; draw(); });
    slider(S.ctrls, 'P up the slope (N)', 0, 200, 1, Pf, v => { Pf = v; draw(); });
    function draw() {
      const C = COL(), t = th * Math.PI / 180, W = m * G, R = W * Math.cos(t), down = W * Math.sin(t), net = Pf - down, Fmax = mu * R;
      let F, state, a = 0; if (Math.abs(net) <= Fmax) { F = -net; state = Math.abs(Math.abs(net) - Fmax) < 1e-6 && Fmax > 0 ? 'limiting equilibrium' : 'at rest (friction not limiting)'; } else if (net > 0) { F = -Fmax; a = (net - Fmax) / m; state = 'accelerates up the slope'; } else { F = Fmax; a = (net + Fmax) / m; state = 'accelerates down the slope'; }
      P.view(0, 1.4, 4); P.clear(); const ctx = P.ctx, L = 6, x0 = -3, y0 = -0.8, x1 = x0 + L * Math.cos(t), y1 = y0 + L * Math.sin(t);
      ctx.fillStyle = C.grid; ctx.beginPath(); ctx.moveTo(P.X(x0), P.Y(y0)); ctx.lineTo(P.X(x1), P.Y(y1)); ctx.lineTo(P.X(x1), P.Y(y0)); ctx.closePath(); ctx.fill();
      const u = [Math.cos(t), Math.sin(t)], n = [-Math.sin(t), Math.cos(t)], bx = x0 + 0.55 * L * u[0], by = y0 + 0.55 * L * u[1], s = 0.5;
      const c = [[bx - s / 2 * u[0], by - s / 2 * u[1]], [bx + s / 2 * u[0], by + s / 2 * u[1]], [bx + s / 2 * u[0] + s * n[0], by + s / 2 * u[1] + s * n[1]], [bx - s / 2 * u[0] + s * n[0], by - s / 2 * u[1] + s * n[1]]];
      ctx.fillStyle = C.a; ctx.beginPath(); c.forEach(([x, y], i) => i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y))); ctx.closePath(); ctx.fill();
      const cx = bx + s / 2 * n[0], cy = by + s / 2 * n[1], k = 1.6 / Math.max(W, 1);
      P.arrow(cx, cy, cx, cy - W * k, C.b); P.text('W', cx, cy - W * k, C.b);
      P.arrow(cx, cy, cx + n[0] * R * k, cy + n[1] * R * k, C.d); P.text('R', cx + n[0] * R * k, cy + n[1] * R * k, C.d);
      if (Math.abs(F) > 0.01) { P.arrow(cx, cy, cx + u[0] * F * k, cy + u[1] * F * k, C.c); P.text('F', cx + u[0] * F * k, cy + u[1] * F * k, C.c); }
      if (Pf > 0) { P.arrow(cx, cy, cx + u[0] * Pf * k, cy + u[1] * Pf * k, C.fg); P.text('P', cx + u[0] * Pf * k, cy + u[1] * Pf * k, C.fg); }
      setRead(S.read, `<p>$R=mg\\cos\\theta=${f3(R)}$ N<br>$mg\\sin\\theta=${f3(down)}$ N down the slope<br>Max friction $\\mu R=${f3(Fmax)}$ N</p><p class="hl">${state}${a ? `<br>$a=${f3(Math.abs(a))}$ m s⁻²` : `<br>friction used: $${f3(Math.abs(F))}$ N ${F > 0 ? 'up' : F < 0 ? 'down' : ''} the slope`}</p><p class="muted">With no P, the block is on the point of slipping when $\\tan\\theta=\\mu$, i.e. $\\theta=${f3(Math.atan(mu) * 180 / Math.PI)}^\\circ$.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- histogram with unequal classes ---------- */
SIMS.m2_hist = {
  title: 'Histograms: area is frequency', desc: 'Unequal class widths: compare frequency with frequency density, and estimate how many values lie between two points.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    const SETS = { time: [[0, 10, 8], [10, 15, 14], [15, 20, 22], [20, 30, 26], [30, 50, 18], [50, 80, 6]], height: [[140, 150, 5], [150, 155, 9], [155, 160, 16], [160, 165, 21], [165, 170, 18], [170, 180, 14], [180, 200, 4]] };
    let key = 'time', fdMode = true, lo = 12, hi = 35;
    select(S.ctrls, 'Data', [['time', 'Commute times (minutes)'], ['height', 'Heights (cm)']], v => { key = v; const b = SETS[key]; lo = b[1][0] + 2; hi = b[3][1] + 3; sl1.set(lo); sl2.set(hi); draw(); });
    check(S.ctrls, 'Plot frequency density (correct)', fdMode, v => { fdMode = v; draw(); });
    const sl1 = slider(S.ctrls, 'from', 0, 200, 1, lo, v => { lo = v; draw(); }, v => v), sl2 = slider(S.ctrls, 'to', 0, 200, 1, hi, v => { hi = v; draw(); }, v => v);
    function draw() {
      const C = COL(), bars = SETS[key], a = bars[0][0], b = bars[bars.length - 1][1], hs = bars.map(([l, u, f]) => fdMode ? f / (u - l) : f), top = Math.max(...hs) * 1.25;
      P.xmin = a - (b - a) * 0.08; P.xmax = b + (b - a) * 0.04; P.ymin = -top * 0.12; P.ymax = top; P.clear(); const ctx = P.ctx;
      let est = 0; bars.forEach(([l, u, f], i) => { const x1 = P.X(l), x2 = P.X(u), y = P.Y(hs[i]); ctx.fillStyle = C.fill; ctx.fillRect(x1, y, x2 - x1, P.Y(0) - y); ctx.strokeStyle = C.a; ctx.lineWidth = 1.5; ctx.strokeRect(x1, y, x2 - x1, P.Y(0) - y);
        const ol = Math.max(l, Math.min(lo, hi)), ou = Math.min(u, Math.max(lo, hi)); if (ou > ol) { est += f * (ou - ol) / (u - l); ctx.fillStyle = 'rgba(255,149,0,.45)'; ctx.fillRect(P.X(ol), y, P.X(ou) - P.X(ol), P.Y(0) - y); }
        P.text(String(f), (l + u) / 2, hs[i], C.fg, -6, -6, '11px system-ui'); });
      P.line(a, 0, b, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; [...new Set(bars.flatMap(([l, u]) => [l, u]))].forEach(x => ctx.fillText(x, P.X(x), P.Y(0) + 14));
      const N = bars.reduce((s, x) => s + x[2], 0);
      setRead(S.read, `<p>Bar labels are frequencies. ${fdMode ? 'Heights are <b>frequency density</b> = frequency ÷ width, so the <b>area</b> of each bar is its frequency.' : '<b>Heights are frequencies</b> — wide classes look far too big. This is the classic mistake.'}</p><p class="hl">Estimated number between ${Math.min(lo, hi)} and ${Math.max(lo, hi)}: $${f3(est)}$ of $${N}$</p><p class="muted">Assumes values are spread evenly within each class.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- scatter diagram and PMCC ---------- */
SIMS.m2_scatter = {
  title: 'Scatter diagrams and the PMCC', desc: 'Drag the points. Watch r change, see how one outlier can distort it, and how two separate groups can mislead.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    const PRE = { pos: [[1, 2], [2, 2.6], [3, 3.1], [4, 4.4], [5, 4.6], [6, 5.9], [7, 6.2], [8, 7.5]], none: [[1, 5], [2, 2], [3, 7], [4, 4], [5, 6], [6, 3], [7, 5], [8, 2]], groups: [[1, 1], [1.5, 1.6], [2, 0.8], [2.5, 1.4], [6.5, 7], [7, 6.4], [7.5, 7.6], [8, 6.8]] };
    let pts = PRE.pos.map(p => p.slice()), line = true;
    select(S.ctrls, 'Start from', [['pos', 'positive correlation'], ['none', 'no correlation'], ['groups', 'two distinct groups']], v => { pts.splice(0, pts.length, ...PRE[v].map(p => p.slice())); bind(); draw(); });
    check(S.ctrls, 'Show regression line of y on x', line, v => { line = v; draw(); });
    const bind = () => { P.handles = pts.map((_, i) => ({ get: () => pts[i], set: (x, y) => { pts[i] = [Math.max(0, Math.min(10, x)), Math.max(0, Math.min(10, y))]; draw(); }, snap: 0.1 })); };
    function draw() {
      const C = COL(), x = pts.map(p => p[0]), y = pts.map(p => p[1]); P.view(5, 5, 6); P.clear(); P.grid(1, true, 'x', 'y');
      const r = ST.pmcc(x, y), { a, b } = ST.regress(x, y); if (line && isFinite(b)) P.curve(t => a + b * t, C.c, 2, 0, 10);
      pts.forEach(([px, py]) => P.dot(px, py, C.a, 6));
      const desc = !isFinite(r) ? '—' : Math.abs(r) > 0.85 ? 'strong' : Math.abs(r) > 0.5 ? 'moderate' : Math.abs(r) > 0.2 ? 'weak' : 'little or no';
      setRead(S.read, `<p>$S_{xx}=${f3(ST.Sxx(x))}$, $S_{yy}=${f3(ST.Sxx(y))}$, $S_{xy}=${f3(ST.Sxy(x, y))}$</p><p class="hl">$r=${isFinite(r) ? f3(r) : '—'}$: ${desc}${desc !== 'little or no' && isFinite(r) ? (r > 0 ? ' positive' : ' negative') : ''} linear correlation</p>${line ? `<p>Line: $y=${f3(a)}${b < 0 ? '-' : '+'}${f3(Math.abs(b))}x$</p>` : ''}<p class="muted">Drag one point far from the others: a single outlier can change $r$ a lot. Two separate clusters can give a high $r$ with no relationship inside either group.</p>`);
    }
    bind(); P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- binomial distribution ---------- */
SIMS.m2_binom = {
  title: 'The binomial distribution B(n, p)', desc: 'Change n and p. Highlight P(X = r), P(X ≤ r) or P(X ≥ r) and see the link to the binomial expansion.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let n = 10, p = 0.3, r = 3, mode = 'le';
    slider(S.ctrls, 'n', 1, 40, 1, n, v => { n = v; r = Math.min(r, n); draw(); }, v => v);
    slider(S.ctrls, 'p', 0.01, 0.99, 0.01, p, v => { p = v; draw(); });
    slider(S.ctrls, 'r', 0, 40, 1, r, v => { r = Math.min(v, n); draw(); }, v => v);
    select(S.ctrls, 'Highlight', [['eq', 'P(X = r)'], ['le', 'P(X ≤ r)'], ['ge', 'P(X ≥ r)']], v => { mode = v; draw(); }, mode);
    function draw() {
      const C = COL(), ps = Array.from({ length: n + 1 }, (_, k) => ST.binomPMF(n, p, k)), top = Math.max(...ps) * 1.2;
      P.xmin = -1; P.xmax = n + 1; P.ymin = -top * 0.1; P.ymax = top; P.clear(); const ctx = P.ctx, w = Math.min(0.8, 0.8);
      ps.forEach((q, k) => { const on = mode === 'eq' ? k === r : mode === 'le' ? k <= r : k >= r; ctx.fillStyle = on ? C.b : C.fill; ctx.fillRect(P.X(k - w / 2), P.Y(q), P.X(k + w / 2) - P.X(k - w / 2), P.Y(0) - P.Y(q)); });
      P.line(-1, 0, n + 1, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; const step = Math.ceil((n + 1) / 15); for (let k = 0; k <= n; k += step) ctx.fillText(k, P.X(k), P.Y(0) + 14);
      P.line(n * p, 0, n * p, top * 0.95, C.c, 1.5, [4, 4]); P.text('np', n * p, top * 0.95, C.c);
      const v = mode === 'eq' ? ps[r] : mode === 'le' ? ST.binomCDF(n, p, r) : 1 - ST.binomCDF(n, p, r - 1);
      setRead(S.read, `<p>$X\\sim B(${n},\\ ${f3(p)})$</p><p class="hl">$P(X${mode === 'eq' ? '=' : mode === 'le' ? '\\le' : '\\ge'}${r})=${v.toFixed(4)}$</p><p>$P(X=${r})=\\binom{${n}}{${r}}(${f3(p)})^{${r}}(${f3(1 - p)})^{${n - r}}$ — the $p^{${r}}$ term of $\\big((1-p)+p\\big)^{${n}}$; $\\binom{${n}}{${r}}=${ST.choose(n, r)}$ is the number of tree-diagram paths with ${r} successes.</p><p class="muted">Mean $np=${f3(n * p)}$. The distribution is symmetric when $p=0.5$.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
