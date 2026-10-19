// Simulations for Further Maths A2 2: SHM, damping, centres of mass, toppling, restitution, the CLT and t,
// the χ² distribution and Pólya-style necklace counting.
'use strict';

/* ---------- simple harmonic motion ---------- */
SIMS.f4_shm = {
  title: 'Simple harmonic motion: the reference circle', desc: 'A point moving round a circle at constant angular speed projects to SHM. Watch x, v and a, and compare a spring and a pendulum.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.7);
    let a = 1.5, w = 2, mode = 'circle', t0 = null;
    select(S.ctrls, 'Show', [['circle', 'Reference circle & x–t graph'], ['spring', 'Mass on a spring'], ['pend', 'Simple pendulum']], k => { mode = k; }, mode);
    slider(S.ctrls, 'amplitude a', 0.3, 2, 0.1, a, k => { a = k; }); slider(S.ctrls, 'ω (rad s⁻¹)', 0.5, 5, 0.1, w, k => { w = k; });
    const stop = loop(now => {
      const C = COL(); if (t0 === null) t0 = now; const t = (now - t0) / 1000, x = a * Math.sin(w * t), v = a * w * Math.cos(w * t), acc = -w * w * x; P.xmin = -2.6; P.xmax = 8; const hh = (P.xmax - P.xmin) * P.h / P.w; P.ymin = -hh / 2; P.ymax = hh / 2; P.clear();
      if (mode === 'circle') { P.circle(0, 0, a, C.grid, 1.5); const px = a * Math.cos(w * t - Math.PI / 2 + Math.PI / 2), py = x; P.line(0, 0, a * Math.cos(w * t), a * Math.sin(w * t), C.text, 1.5); P.dot(a * Math.cos(w * t), a * Math.sin(w * t), C.a, 6); P.line(a * Math.cos(w * t), py, 2.2, py, C.grid, 1, [4, 4]); P.dot(0, py, C.b, 7);
        P.line(2.2, -hh / 2 + 0.2, 2.2, hh / 2 - 0.2, C.axis, 1.5); P.line(2.2, 0, 8, 0, C.axis, 1.5); const span = 5.6, T_ = Math.min(t, 4 * Math.PI / w); P.curve(s => a * Math.sin(w * (t - (s - 2.2) / span * 4 * Math.PI / w)), C.b, 2.5, 2.2, 2.2 + span * Math.min(1, T_ / (4 * Math.PI / w)) - 1e-6); P.dot(2.2, py, C.b, 5); P.text('x', 2.3, hh / 2 - 0.3, C.text); P.text('time →', 7, -0.15, C.text, -30, 16); }
      else if (mode === 'spring') { const y0 = 0, xm = 3 + x; P.line(-2.2, -0.8, -2.2, 0.8, C.axis, 4); const coils = 14; let pts = []; for (let i = 0; i <= coils; i++) pts.push([-2.2 + (xm - 0.4 + 2.2) * i / coils, i % 2 ? 0.25 : -0.25]); pts[0][1] = 0; pts[coils][1] = 0; for (let i = 0; i < coils; i++) P.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.text, 2);
        P.ctx.fillStyle = C.b; P.ctx.fillRect(P.X(xm - 0.4), P.Y(0.4), P.X(xm + 0.4) - P.X(xm - 0.4), P.Y(-0.4) - P.Y(0.4)); P.line(-2.4, -0.42, 7.5, -0.42, C.axis, 1.5); P.line(3, -0.7, 3, 0.7, C.grid, 1, [4, 4]); P.text('O', 3, -0.7, C.text, -4, 14); P.arrow(xm, 0.6, xm + v * 0.3, 0.6, C.a, 2); P.arrow(xm, -0.65, xm + acc * 0.08, -0.65, C.c, 2); }
      else { const L = 2.4, th = x / a * 0.35; const px = L * Math.sin(th), py = 1.6 - L * Math.cos(th); P.line(-0.6, 1.6, 0.6, 1.6, C.axis, 3); P.line(0, 1.6, px, py, C.text, 2); P.dot(px, py, C.b, 10); P.line(0, 1.6, 0, 1.6 - L, C.grid, 1, [4, 4]); }
      setRead(S.read, `<p>$\\ddot x=-\\omega^2x$, $x=a\\sin\\omega t$ with $a=${f3(a)}$, $\\omega=${f3(w)}$: period $${f3(2 * Math.PI / w)}$ s.</p><p class="hl">$x=${f3(x)}$, $v=${f3(v)}$, $a_x=${f3(acc)}$ &nbsp; (check $v^2=\\omega^2(a^2-x^2)$: $${f3(v * v)}=${f3(w * w * (a * a - x * x))}$)</p>
        <p class="muted">${mode === 'spring' ? 'Green arrow: velocity; orange: acceleration — always towards O and largest at the ends.' : mode === 'pend' ? 'For small swings a pendulum is SHM with ω² = g/l, so T = 2π√(l/g).' : 'The blue point is the projection of the circling point: that is SHM.'}</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- damped oscillations ---------- */
SIMS.f4_damp = {
  title: 'Damped oscillations', desc: 'ẍ + 2γẋ + ω₀²x = 0. Slide γ through ω₀ to move from light damping (oscillations) to critical and heavy damping.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.8);
    let g = 0.3, w0 = 2, x0 = 1.5, v0 = 0;
    slider(S.ctrls, 'γ (damping)', 0, 4, 0.05, g, k => { g = k; draw(); }); slider(S.ctrls, 'ω₀', 0.5, 4, 0.1, w0, k => { w0 = k; draw(); }); slider(S.ctrls, 'x(0)', -2, 2, 0.1, x0, k => { x0 = k; draw(); }); slider(S.ctrls, 'ẋ(0)', -4, 4, 0.1, v0, k => { v0 = k; draw(); });
    function draw() {
      const C = COL(); P.xmin = -0.5; P.xmax = 12; P.ymin = -2.4; P.ymax = 2.4; P.clear(); P.grid(1, true, 't', 'x'); let f, kind, form;
      const D = g * g - w0 * w0;
      if (Math.abs(D) < 1e-3) { const B = v0 + g * x0; f = t => (x0 + B * t) * Math.exp(-g * t); kind = 'critical damping'; form = `x=(${f3(x0)}+${f3(B)}t)e^{-${f3(g)}t}`; }
      else if (D > 0) { const s = Math.sqrt(D), r1 = -g + s, r2 = -g - s, B = (v0 - r1 * x0) / (r2 - r1), A = x0 - B; f = t => A * Math.exp(r1 * t) + B * Math.exp(r2 * t); kind = 'heavy damping'; form = `x=${f3(A)}e^{${f3(r1)}t}+${f3(B)}e^{${f3(r2)}t}`; }
      else { const b = Math.sqrt(-D), B = (v0 + g * x0) / b; f = t => Math.exp(-g * t) * (x0 * Math.cos(b * t) + B * Math.sin(b * t)); kind = 'light damping'; form = `x=e^{-${f3(g)}t}(${f3(x0)}\\cos${f3(b)}t+${f3(B)}\\sin${f3(b)}t)`; P.curve(t => Math.exp(-g * t) * Math.hypot(x0, B), C.grid, 1.2, 0, 12); P.curve(t => -Math.exp(-g * t) * Math.hypot(x0, B), C.grid, 1.2, 0, 12); }
      P.curve(f, C.a, 3, 0, 12);
      setRead(S.read, `<p>Auxiliary equation $r^2+${f3(2 * g)}r+${f3(w0 * w0)}=0$, discriminant $4(\\gamma^2-\\omega_0^2)=${f3(4 * D)}$.</p><p class="hl"><b>${kind[0].toUpperCase() + kind.slice(1)}</b>: $${form}$</p><p class="muted">${kind === 'light damping' ? `Oscillations of period 2π/β = ${f3(2 * Math.PI / Math.sqrt(-D))} s inside a decaying envelope (grey).` : kind === 'critical damping' ? 'The fastest return to equilibrium without overshooting — used in car suspension and meters.' : 'Too much damping: a slow creep back with no oscillation.'}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- centre of mass of a composite lamina ---------- */
SIMS.f4_com = {
  title: 'Centre of mass of a composite lamina', desc: 'An L-shaped lamina with an optional circular hole. Change the sizes, see G move, then suspend it from a corner.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    let a = 6, b = 2, c = 2, d = 4, hole = 0, susp = false;
    slider(S.ctrls, 'base length', 2, 8, 0.5, a, k => { a = k; draw(); }); slider(S.ctrls, 'base height', 1, 4, 0.5, b, k => { b = k; draw(); }); slider(S.ctrls, 'upright width', 1, 4, 0.5, c, k => { c = Math.min(k, a); draw(); }); slider(S.ctrls, 'upright height', 0, 6, 0.5, d, k => { d = k; draw(); });
    slider(S.ctrls, 'hole radius (in the base)', 0, 0.9, 0.05, hole, k => { hole = k; draw(); }); check(S.ctrls, 'Suspend from the corner O', susp, k => { susp = k; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx, hx = (c + a) / 2, hy = b / 2, hr = Math.min(hole * b / 2, (a - c) / 2 * 0.9); const parts = [[a * b, a / 2, b / 2], [c * d, c / 2, b + d / 2], [-Math.PI * hr * hr, hx, hy]]; const M = parts.reduce((s, p) => s + p[0], 0), gx = parts.reduce((s, p) => s + p[0] * p[1], 0) / M, gy = parts.reduce((s, p) => s + p[0] * p[2], 0) / M;
      const ang = susp ? -Math.PI / 2 - Math.atan2(gy, gx) : 0, rot = ([x, y]) => [x * Math.cos(ang) - y * Math.sin(ang), x * Math.sin(ang) + y * Math.cos(ang)];
      P.view(susp ? 0 : a / 2, susp ? -4 : (b + d) / 2, 6.5); P.clear(); if (!susp) P.grid(1, true, 'x', 'y');
      const shape = [[0, 0], [a, 0], [a, b], [c, b], [c, b + d], [0, b + d]].map(rot); ctx.fillStyle = C.fill; ctx.beginPath(); shape.forEach(([x, y], i) => (i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)))); ctx.closePath(); ctx.fill(); ctx.strokeStyle = C.a; ctx.lineWidth = 2; ctx.stroke();
      if (hr > 0) { const [px, py] = rot([hx, hy]); ctx.fillStyle = C.bg; ctx.beginPath(); ctx.arc(P.X(px), P.Y(py), Math.abs(P.X(hr) - P.X(0)), 0, 7); ctx.fill(); ctx.stroke(); }
      const [Gx, Gy] = rot([gx, gy]); P.dot(Gx, Gy, C.c, 7); P.text('G', Gx, Gy, C.c); if (susp) { P.line(0, 0, 0, -9, C.grid, 1, [5, 5]); P.dot(0, 0, C.fg, 5); P.text('O', 0, 0, C.fg, 6, -6); }
      setRead(S.read, `<p>Pieces (area, centre): base $${f3(a * b)}$ at $(${f3(a / 2)},${f3(b / 2)})$; upright $${f3(c * d)}$ at $(${f3(c / 2)},${f3(b + d / 2)})$${hr > 0 ? `; hole $-${f3(Math.PI * hr * hr)}$ at $(${f3(hx)},${f3(hy)})$` : ''}.</p><p class="hl">$G=(${f3(gx)},\\ ${f3(gy)})$</p>
        ${susp ? `<p>Hanging from $O$, $OG$ is vertical: the base edge makes $\\tan^{-1}\\frac{${f3(gy)}}{${f3(gx)}}=${f3(rd(Math.atan2(gy, gx)))}^\\circ$ with the vertical.</p>` : '<p class="muted">Tick "suspend" to hang the lamina from O: it settles with G directly below O.</p>'}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- sliding or toppling ---------- */
SIMS.f4_topple = {
  title: 'Sliding or toppling on a slope', desc: 'Tilt the plane. The block slides when tan θ > μ and topples when the weight\'s line of action passes outside its base.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let th = 15, mu = 0.6, b = 2, h = 3;
    slider(S.ctrls, 'slope θ', 0, 60, 0.5, th, k => { th = k; draw(); }, k => k + '°'); slider(S.ctrls, 'μ', 0.1, 1.5, 0.05, mu, k => { mu = k; draw(); }); slider(S.ctrls, 'base width b', 0.5, 4, 0.1, b, k => { b = k; draw(); }); slider(S.ctrls, 'height h', 0.5, 5, 0.1, h, k => { h = k; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx, t = dg(th), u = [Math.cos(t), Math.sin(t)], n = [-Math.sin(t), Math.cos(t)]; P.view(2, 2, 5); P.clear();
      const L = 9, o = [-3, -1.5]; P.line(o[0], o[1], o[0] + L * u[0], o[1] + L * u[1], C.fg, 3); P.line(o[0], o[1], o[0] + L * u[0], o[1], C.axis, 1);
      const s0 = 3.5, A = [o[0] + s0 * u[0], o[1] + s0 * u[1]], pt = (s, k) => [A[0] + s * u[0] + k * n[0], A[1] + s * u[1] + k * n[1]], box = [pt(0, 0), pt(b, 0), pt(b, h), pt(0, h)];
      ctx.fillStyle = C.fill; ctx.beginPath(); box.forEach(([x, y], i) => (i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)))); ctx.closePath(); ctx.fill(); ctx.strokeStyle = C.a; ctx.lineWidth = 2; ctx.stroke();
      const G_ = pt(b / 2, h / 2); P.dot(G_[0], G_[1], C.c, 6); P.line(G_[0], G_[1], G_[0], G_[1] - 4, C.c, 1.5, [5, 4]); P.dot(box[0][0], box[0][1], C.b, 5);
      const slide = Math.tan(t) > mu, topple = Math.tan(t) > b / h, first = mu < b / h ? 'slide' : 'topple';
      setRead(S.read, `<p>$\\tan\\theta=${f3(Math.tan(t))}$. Slides when $\\tan\\theta\\gt\\mu=${f3(mu)}$ (at $${f3(rd(Math.atan(mu)))}^\\circ$); topples when $\\tan\\theta\\gt\\frac bh=${f3(b / h)}$ (at $${f3(rd(Math.atan(b / h)))}^\\circ$).</p>
        <p class="hl">${slide || topple ? (first === 'slide' ? 'It slides down the slope.' : 'It topples about its lower edge.') : 'It stays at rest: friction holds it and the weight acts within the base.'}</p><p class="muted">As θ increases from 0 it will ${first} first. The dashed line is the weight's line of action through G.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- restitution ---------- */
SIMS.f4_coll = {
  title: 'Collisions with restitution', desc: 'Two smooth spheres collide directly. Change e from 0 (they coalesce) to 1 (perfectly elastic) and watch the speeds and the kinetic energy.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 2.2);
    let m1 = 2, m2 = 3, u1 = 5, u2 = -1, e = 0.6, t0 = null;
    slider(S.ctrls, 'mass A', 0.5, 6, 0.5, m1, k => { m1 = k; t0 = null; }); slider(S.ctrls, 'mass B', 0.5, 6, 0.5, m2, k => { m2 = k; t0 = null; }); slider(S.ctrls, 'u_A', 0, 8, 0.5, u1, k => { u1 = k; t0 = null; }); slider(S.ctrls, 'u_B', -6, 4, 0.5, u2, k => { u2 = k; t0 = null; });
    slider(S.ctrls, 'e', 0, 1, 0.05, e, k => { e = k; t0 = null; }); button(S.ctrls, 'Replay', () => { t0 = null; });
    const stop = loop(now => {
      const C = COL(), M = m1 * u1 + m2 * u2, v1 = (M - m2 * e * (u1 - u2)) / (m1 + m2), v2 = (M + m1 * e * (u1 - u2)) / (m1 + m2), ok = u1 > u2; if (t0 === null) t0 = now;
      const rA = 0.35 + 0.07 * m1, rB = 0.35 + 0.07 * m2, tc = ok ? (8 - rA - rB) / (u1 - u2) : Infinity, t = Math.min((now - t0) / 1000 * Math.min(1, 2.5 / Math.max(1, tc)), tc + 3);
      const xa = t < tc ? -4 + u1 * t : -4 + u1 * tc + v1 * (t - tc), xb = t < tc ? 4 + u2 * t : 4 + u2 * tc + v2 * (t - tc); P.view(0, 0, 10); P.clear(); P.line(-10, -0.6, 10, -0.6, C.axis, 1.5);
      P.circle(xa, -0.6 + rA, rA, C.a, 3); P.circle(xb, -0.6 + rB, rB, C.b, 3); P.text('A', xa, -0.6 + rA, C.a, -4, 4); P.text('B', xb, -0.6 + rB, C.b, -4, 4);
      const K0 = 0.5 * (m1 * u1 * u1 + m2 * u2 * u2), K1 = 0.5 * (m1 * v1 * v1 + m2 * v2 * v2);
      setRead(S.read, ok ? `<p>Momentum: $${m1}v_A+${m2}v_B=${f3(M)}$; restitution: $v_B-v_A=${f3(e)}(${f3(u1 - u2)})$</p><p class="hl">$v_A=${f3(v1)}$, $v_B=${f3(v2)}$ m s⁻¹</p><p class="muted">KE ${f3(K0)} J → ${f3(K1)} J (${f3(K0 - K1)} J lost${e === 1 ? ' — none, perfectly elastic' : e === 0 ? ' — the most possible: they move together' : ''}).</p>` : '<p class="hl">A never catches B — no collision.</p>');
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- central limit theorem & t ---------- */
SIMS.f4_clt = {
  title: 'The central limit theorem & the t-distribution', desc: 'Draw many samples from a skewed population: the sample means pile up into a normal shape. Or compare t-distributions with N(0, 1).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.7);
    let mode = 'clt', pop = 'exp', n = 30, nu = 4, means = [];
    select(S.ctrls, 'Mode', [['clt', 'Central limit theorem'], ['t', 't-distribution vs N(0, 1)']], k => { mode = k; draw(); }, mode);
    select(S.ctrls, 'Population', [['exp', 'Exponential (skewed), mean 1'], ['uni', 'Uniform on [0, 2]'], ['die', 'Die scores 1–6'], ['bern', 'Coin: 0 or 1 (p = 0.2)']], k => { pop = k; means = []; draw(); }, pop);
    slider(S.ctrls, 'sample size n', 1, 100, 1, n, k => { n = k; means = []; draw(); }, k => k); slider(S.ctrls, 'degrees of freedom ν', 1, 30, 1, nu, k => { nu = k; draw(); }, k => k);
    button(S.ctrls, 'Take 500 samples', () => { for (let i = 0; i < 500; i++) { let s = 0; for (let j = 0; j < n; j++) s += draw1(); means.push(s / n); } draw(); }); button(S.ctrls, 'Clear', () => { means = []; draw(); }, 'btn small ghost');
    const POP = { exp: [1, 1], uni: [1, 1 / 3], die: [3.5, 35 / 12], bern: [0.2, 0.16] }; function draw1() { return pop === 'exp' ? -Math.log(1 - Math.random()) : pop === 'uni' ? 2 * Math.random() : pop === 'die' ? 1 + Math.floor(6 * Math.random()) : +(Math.random() < 0.2); }
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear();
      if (mode === 'clt') { const [mu, v] = POP[pop], se = Math.sqrt(v / n), lo = mu - 4 * se, hi = mu + 4 * se, bins = 40, w = (hi - lo) / bins, cnt = Array(bins).fill(0); means.forEach(m => { const k = Math.floor((m - lo) / w); if (k >= 0 && k < bins) cnt[k]++; });
        const pdf = x => Math.exp(-0.5 * ((x - mu) / se) ** 2) / (se * Math.sqrt(2 * Math.PI)), top = Math.max(pdf(mu), ...cnt.map(c => c / (means.length * w || 1))) * 1.15; P.xmin = lo; P.xmax = hi; P.ymin = -top * 0.1; P.ymax = top;
        cnt.forEach((c, k) => { const hgt = means.length ? c / (means.length * w) : 0; ctx.fillStyle = C.fill; ctx.fillRect(P.X(lo + k * w), P.Y(hgt), P.X(lo + (k + 1) * w) - P.X(lo + k * w) - 1, P.Y(0) - P.Y(hgt)); });
        P.line(lo, 0, hi, 0, C.axis, 1.5); P.curve(pdf, C.a, 2.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; [-2, 0, 2].forEach(k => ctx.fillText(f3(mu + k * se), P.X(mu + k * se), P.Y(0) + 14));
        setRead(S.read, `<p>Population mean $${f3(mu)}$, variance $${f3(v)}$. CLT: $\\bar X\\approx N\\left(${f3(mu)},\\frac{${f3(v)}}{${n}}\\right)$, s.e. $${f3(se)}$ (blue curve).</p><p class="hl">${means.length} sample means; their mean $${means.length ? f3(ST.mean(means)) : '–'}$, SD $${means.length > 1 ? f3(Math.sqrt(ST.varS(means))) : '–'}$.</p><p class="muted">Try n = 1, 5, 30 with the skewed population: the histogram becomes normal as n grows.</p>`); }
      else { const top = 0.45; P.xmin = -4.5; P.xmax = 4.5; P.ymin = -0.05; P.ymax = top; P.line(-4.5, 0, 4.5, 0, C.axis, 1.5); const tpdf = x => Math.exp(ST.lgamma((nu + 1) / 2) - ST.lgamma(nu / 2)) / Math.sqrt(nu * Math.PI) * (1 + x * x / nu) ** (-(nu + 1) / 2);
        P.curve(x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI), C.grid, 2.5); P.curve(tpdf, C.a, 3); const tc = ST.tCrit(0.025, nu); P.line(tc, 0, tc, tpdf(tc), C.c, 2); P.line(-tc, 0, -tc, tpdf(tc), C.c, 2);
        setRead(S.read, `<p>$t_{${nu}}$ (blue) against $N(0,1)$ (grey): heavier tails, so larger critical values.</p><p class="hl">Two-tailed 5% critical value: $t_{${nu}}=${tc.toFixed(3)}$ vs $z=1.960$.</p><p class="muted">As ν grows the t-distribution approaches N(0, 1). Use t when the population is normal, σ is unknown and n is small.</p>`); }
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- χ² distribution ---------- */
SIMS.f4_chi = {
  title: 'The χ² distribution & critical regions', desc: 'Pick the degrees of freedom and significance level; move your test statistic to see whether it lands in the critical region.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.8);
    let nu = 3, al = 0.05, x2 = 6;
    slider(S.ctrls, 'degrees of freedom ν', 1, 15, 1, nu, k => { nu = k; draw(); }, k => k); select(S.ctrls, 'Significance level', [['0.1', '10%'], ['0.05', '5%'], ['0.01', '1%']], k => { al = +k; draw(); }, '0.05'); slider(S.ctrls, 'test statistic X²', 0, 40, 0.1, x2, k => { x2 = k; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx, f = x => (x <= 0 ? 0 : Math.exp((nu / 2 - 1) * Math.log(x) - x / 2 - (nu / 2) * Math.log(2) - ST.lgamma(nu / 2))), cv = ST.chiCrit(al, nu), xmax = Math.max(cv * 1.6, nu + 4 * Math.sqrt(2 * nu), 8);
      let top = 0; for (let x = 0.05; x < xmax; x += xmax / 300) top = Math.max(top, f(x)); top = Math.min(top, 0.6) * 1.15; P.xmin = -xmax * 0.03; P.xmax = xmax; P.ymin = -top * 0.1; P.ymax = top; P.clear();
      ctx.fillStyle = C.fill; ctx.beginPath(); ctx.moveTo(P.X(cv), P.Y(0)); for (let x = cv; x <= xmax; x += xmax / 300) ctx.lineTo(P.X(x), P.Y(f(x))); ctx.lineTo(P.X(xmax), P.Y(0)); ctx.fill();
      P.line(P.xmin, 0, xmax, 0, C.axis, 1.5); P.curve(x => Math.min(f(x), top * 2), C.a, 3, 0.02, xmax); P.line(x2, 0, x2, top * 0.9, C.b, 2.5); P.text('X²', x2, top * 0.9, C.b); P.line(cv, 0, cv, top * 0.6, C.c, 1.5, [4, 4]);
      const pv = 1 - ST.chi2CDF(x2, nu);
      setRead(S.read, `<p>$\\chi^2_{${nu}}$: mean $${nu}$. Critical value at $${al * 100}\\%$: $${cv.toFixed(3)}$ (shaded region).</p><p class="hl">$X^2=${f3(x2)}$, p-value $${pv.toFixed(4)}$ → ${x2 > cv ? 'reject $H_0$' : 'do not reject $H_0$'}</p><p class="muted">χ² tests are always upper-tailed: large X² means the observed frequencies are far from those expected.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- necklaces: Pólya counting by listing ---------- */
SIMS.f4_polya = {
  title: 'Counting necklaces: Burnside & Pólya', desc: 'List every distinct necklace of n beads in k colours, up to rotation (or rotation and reflection), and check the count against the cycle index.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    let n = 4, k = 2, dih = false;
    slider(S.ctrls, 'beads n', 2, 7, 1, n, v => { n = v; draw(); }, v => v); slider(S.ctrls, 'colours k', 2, 3, 1, k, v => { k = v; draw(); }, v => v); check(S.ctrls, 'Allow reflections (turn over)', dih, v => { dih = v; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx, cols = [C.b, C.fg, C.c], all = []; for (let m = 0; m < k ** n; m++) { const a = []; let x = m; for (let i = 0; i < n; i++) { a.push(x % k); x = Math.floor(x / k); } all.push(a); }
      const key = a => { let best = null; const vs = []; for (let r = 0; r < n; r++) { const rot = a.map((_, i) => a[(i + r) % n]); vs.push(rot); if (dih) vs.push([...rot].reverse()); } for (const v of vs) { const s = v.join(''); if (best === null || s < best) best = s; } return best; };
      const reps = [...new Map(all.map(a => [key(a), a])).values()], ci = dih ? ciDn(n) : ciCn(n); P.clear(); const per = Math.ceil(Math.sqrt(reps.length * P.w / P.h)), rows = Math.ceil(reps.length / per), cw = P.w / per, ch = P.h / Math.max(rows, 1), R = Math.min(cw, ch) * 0.33;
      reps.forEach((a, idx) => { const cx = cw * (idx % per + 0.5), cy = ch * (Math.floor(idx / per) + 0.5); ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); a.forEach((c, i) => { const t = 2 * Math.PI * i / n - Math.PI / 2; ctx.fillStyle = cols[c]; ctx.beginPath(); ctx.arc(cx + R * Math.cos(t), cy + R * Math.sin(t), Math.max(3, R * 0.28), 0, 7); ctx.fill(); }); });
      setRead(S.read, `<p>Symmetry group ${dih ? `$D_{${2 * n}}$` : `$C_{${n}}$`}: $P_G=${ciTex(ci)}$</p><p class="hl">Distinct necklaces: $P_G(${k},${k},\\dots)=${ciCount(ci, k)}$ — listed: ${reps.length}</p><p class="muted">Out of $${k}^{${n}}=${k ** n}$ colourings of fixed positions. Each picture is one equivalence class.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
