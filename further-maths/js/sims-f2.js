// Simulations for Further Maths AS 2: elastic energy, horizontal and vertical circles, relative velocity,
// distributions, Cayley tables, graph algorithms, critical path analysis and recurrence relations.
'use strict';

/* ---------- elastic string: energy ---------- */
SIMS.f2_spring = {
  title: 'Elastic strings: Hooke\'s law & energy', desc: 'A particle on an elastic string is released from the fixed point. Watch KE, GPE and EPE trade off; the total stays constant.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let m = 1, lam = 49, l = 1, run = false, y = 0, v = 0, last = null;
    slider(S.ctrls, 'mass m (kg)', 0.2, 3, 0.1, m, k => { m = k; reset(); }); slider(S.ctrls, 'modulus λ (N)', 10, 150, 1, lam, k => { lam = k; reset(); }, k => k); slider(S.ctrls, 'natural length l (m)', 0.5, 2, 0.1, l, k => { l = k; reset(); });
    button(S.ctrls, 'Release', () => { reset(); run = true; }); button(S.ctrls, 'Reset', () => reset(), 'btn small ghost');
    function reset() { run = false; y = 0; v = 0; last = null; }
    const stop = loop(now => {
      const C = COL(), dt = last ? Math.min(0.03, (now - last) / 1000) : 0; last = now;
      if (run) for (let i = 0; i < 10; i++) { const x = y - l, T = x > 0 ? lam * x / l : 0, a = G - T / m; v += a * dt / 10; y += v * dt / 10; }
      const xe = m * G * l / lam, A = lam / (2 * l), xm = (m * G + Math.sqrt((m * G) ** 2 + 4 * A * m * G * l)) / (2 * A), depth = l + xm;
      P.xmin = -1.6; P.xmax = 3.4; const hh = (P.xmax - P.xmin) * P.h / P.w; P.ymax = 0.25; P.ymin = P.ymax - hh; P.clear(); const sc = Math.max(1, (depth + 0.3) / hh * 1.05), Y = d => -d / sc;
      P.line(-1, 0, 1, 0, C.axis, 3); P.line(-0.3, Y(l), 0.3, Y(l), C.grid, 1, [4, 4]); P.text('natural length', 0.35, Y(l), C.text, 4, 4); P.line(-0.3, Y(l + xe), 0.3, Y(l + xe), C.c, 1, [4, 4]); P.text('equilibrium', 0.35, Y(l + xe), C.c, 4, 4); P.line(-0.3, Y(depth), 0.3, Y(depth), C.b, 1, [4, 4]); P.text('lowest point', 0.35, Y(depth), C.b, 4, 4);
      const taut = y > l; P.line(0, 0, 0, Y(y), taut ? C.a : C.grid, taut ? 2.5 : 1.5, taut ? null : [3, 3]); P.dot(0, Y(y), C.b, 9);
      const x = Math.max(0, y - l), KE = 0.5 * m * v * v, GPE = -m * G * y, EPE = lam * x * x / (2 * l), bars = [['KE', KE, C.a], ['GPE (rel. O)', GPE, C.d], ['EPE', EPE, C.c]], full = m * G * depth;
      bars.forEach(([n, e, c], i) => { const bx = 1.6 + i * 0.55, h = e / full * hh * 0.4; P.ctx.fillStyle = c; P.ctx.fillRect(P.X(bx), P.Y(-hh * 0.5), P.X(bx + 0.4) - P.X(bx), -(P.Y(0) - P.Y(h))); P.text(n, bx, -hh * 0.5, C.text, 0, 14, '11px system-ui'); });
      setRead(S.read, `<p>$T=\\frac{\\lambda x}{l}$ when taut. Equilibrium extension $\\frac{mgl}{\\lambda}=${f3(xe)}$ m; greatest extension (energy) $${f3(xm)}$ m.</p><p class="hl">Fallen $${f3(y)}$ m, speed $${f3(Math.abs(v))}$ m s⁻¹, extension $${f3(x)}$ m<br>KE $${f3(KE)}$ + GPE $${f3(GPE)}$ + EPE $${f3(EPE)}$ = $${f3(KE + GPE + EPE)}$ J</p><p class="muted">The string is slack (dashed) for the first ${f3(l)} m: free fall. The total mechanical energy stays at 0 — no resistances.</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- horizontal circles ---------- */
SIMS.f2_conical = {
  title: 'Horizontal circles: conical pendulum & banked track', desc: 'Resolve vertically and horizontally. Change ω or the speed and watch the angle and forces respond.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.5);
    let mode = 'pend', L = 1, w = 4, m = 0.5, r = 50, th = 20, t0 = null;
    select(S.ctrls, 'Model', [['pend', 'Conical pendulum'], ['bank', 'Banked track (design speed)']], k => { mode = k; }, mode);
    slider(S.ctrls, 'string length L (m)', 0.5, 2, 0.1, L, k => { L = k; }); slider(S.ctrls, 'ω (rad s⁻¹)', 1, 10, 0.1, w, k => { w = k; }); slider(S.ctrls, 'mass (kg)', 0.1, 2, 0.1, m, k => { m = k; });
    slider(S.ctrls, 'bend radius r (m)', 20, 200, 5, r, k => { r = k; }, k => k); slider(S.ctrls, 'banking angle θ', 5, 40, 1, th, k => { th = k; }, k => k + '°');
    const stop = loop(now => {
      const C = COL(); if (t0 === null) t0 = now; const t = (now - t0) / 1000; P.view(0, 0, 2.6); P.clear();
      if (mode === 'pend') { const c = G / (L * w * w), ok = c < 1, a = ok ? Math.acos(c) : 0, R = L * Math.sin(a), T = m * L * w * w, ph = w * t * 0.25, px = R * Math.cos(ph), top = 1.3, py = top - L * Math.cos(a);
        P.ctx.strokeStyle = C.grid; P.ctx.lineWidth = 1; P.ctx.beginPath(); P.ctx.ellipse(P.X(0), P.Y(py), Math.abs(P.X(R) - P.X(0)), Math.abs(P.X(R) - P.X(0)) * 0.25, 0, 0, 7); P.ctx.stroke();
        P.line(0, top, px, py, C.text, 2); P.line(-0.5, top, 0.5, top, C.axis, 3); P.line(0, top, 0, py, C.grid, 1, [4, 4]); P.dot(px, py, C.b, 9);
        P.arrow(px, py, px, py - 0.5, C.c, 2.5); P.text('mg', px, py - 0.5, C.c); const ux = -px / (L || 1), uy = (top - py) / L; P.arrow(px, py, px + ux * 0.6, py + uy * 0.6, C.a, 2.5); P.text('T', px + ux * 0.6, py + uy * 0.6, C.a);
        setRead(S.read, ok ? `<p>Vertically $T\\cos\\theta=mg$; horizontally $T\\sin\\theta=mr\\omega^2$ with $r=L\\sin\\theta$.</p><p class="hl">$T=mL\\omega^2=${f3(T)}$ N, $\\cos\\theta=\\frac g{L\\omega^2}=${f3(c)}$, $\\theta=${f3(rd(a))}^\\circ$, radius $${f3(R)}$ m</p><p class="muted">Faster spin ⇒ larger angle; the angle does not depend on the mass.</p>` : `<p class="hl">$\\frac g{L\\omega^2}=${f3(c)}\\ge1$: too slow for the string to swing out — a conical pendulum needs $\\omega^2\\gt\\frac gL$.</p>`);
      } else { const tr = dg(th), v = Math.sqrt(r * G * Math.tan(tr)); P.line(-2.2, -1, 2.2, -1, C.axis, 1.5); const s = 2.2, x0 = -1.6, y0 = -1; P.line(x0, y0, x0 + s * Math.cos(tr), y0 + s * Math.sin(tr), C.fg, 4);
        const bx = x0 + 1.1 * Math.cos(tr), by = y0 + 1.1 * Math.sin(tr) + 0.15; P.dot(bx, by, C.b, 10); P.arrow(bx, by, bx, by - 0.9, C.c, 2.5); P.text('mg', bx, by - 0.9, C.c); P.arrow(bx, by, bx - 0.9 * Math.sin(tr), by + 0.9 * Math.cos(tr), C.a, 2.5); P.text('R', bx - 0.9 * Math.sin(tr), by + 0.9 * Math.cos(tr), C.a); P.arrow(bx, by, bx + 0.8, by, C.d, 2); P.text('to centre', bx + 0.8, by, C.d);
        setRead(S.read, `<p>No friction: $R\\cos\\theta=mg$, $R\\sin\\theta=\\frac{mv^2}r$, so $\\tan\\theta=\\frac{v^2}{rg}$.</p><p class="hl">Design speed $v=\\sqrt{rg\\tan\\theta}=${f3(v)}$ m s⁻¹ $=${f3(v * 3.6)}$ km h⁻¹</p><p class="muted">At this speed the normal reaction alone supplies the central force; the horizontal component of R points to the centre of the bend.</p>`); }
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- relative velocity ---------- */
SIMS.f2_relv = {
  title: 'Relative velocity: closest approach', desc: 'Two ships with constant velocities. The dashed line is B\'s path as seen from A; the closest approach is where it is nearest A.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    let b = [8, 2], vA = [2, 1], vB = [-1, 2], t0 = null, run = true;
    slider(S.ctrls, 'A: vᵢ', -4, 4, 0.5, vA[0], k => { vA[0] = k; }); slider(S.ctrls, 'A: vⱼ', -4, 4, 0.5, vA[1], k => { vA[1] = k; }); slider(S.ctrls, 'B: vᵢ', -4, 4, 0.5, vB[0], k => { vB[0] = k; }); slider(S.ctrls, 'B: vⱼ', -4, 4, 0.5, vB[1], k => { vB[1] = k; });
    button(S.ctrls, 'Restart', () => { t0 = null; });
    P.handles = [{ get: () => b, set: (x, y) => { b = [x, y]; t0 = null; }, snap: 0.5 }];
    const stop = loop(now => {
      const C = COL(); if (t0 === null) t0 = now; const tmax = 6, t = ((now - t0) / 1000 * 0.8) % tmax; P.view(4, 3, 8); P.clear(); P.grid(2, true, 'x', 'y');
      const rv = [vB[0] - vA[0], vB[1] - vA[1]], vv = rv[0] ** 2 + rv[1] ** 2, tc = vv ? Math.max(0, -(b[0] * rv[0] + b[1] * rv[1]) / vv) : 0, dmin = Math.hypot(b[0] + rv[0] * tc, b[1] + rv[1] * tc);
      P.line(0, 0, vA[0] * tmax, vA[1] * tmax, C.grid, 1); P.line(b[0], b[1], b[0] + vB[0] * tmax, b[1] + vB[1] * tmax, C.grid, 1);
      P.line(b[0], b[1], b[0] + rv[0] * 8, b[1] + rv[1] * 8, C.c, 1.5, [6, 5]);
      const A = [vA[0] * t, vA[1] * t], Bp = [b[0] + vB[0] * t, b[1] + vB[1] * t]; P.dot(A[0], A[1], C.a, 8); P.text('A', A[0], A[1], C.a); P.dot(Bp[0], Bp[1], C.b, 8); P.text('B', Bp[0], Bp[1], C.b); P.line(A[0], A[1], Bp[0], Bp[1], C.text, 1);
      const Ac = [vA[0] * tc, vA[1] * tc], Bc = [b[0] + vB[0] * tc, b[1] + vB[1] * tc]; P.line(Ac[0], Ac[1], Bc[0], Bc[1], C.d, 2.5); P.dot(Ac[0], Ac[1], C.d, 4); P.dot(Bc[0], Bc[1], C.d, 4);
      setRead(S.read, `<p>$_B\\mathbf v_A=\\mathbf v_B-\\mathbf v_A=(${f3(rv[0])},\\ ${f3(rv[1])})$</p><p>$\\overrightarrow{AB}=(${f3(b[0])},${f3(b[1])})+t(${f3(rv[0])},${f3(rv[1])})$; distance at $t=${f3(t)}$: $${f3(Math.hypot(Bp[0] - A[0], Bp[1] - A[1]))}$</p>
        <p class="hl">Closest at $t=${f3(tc)}$ (when $\\overrightarrow{AB}\\cdot{}_B\\mathbf v_A=0$): least distance $${f3(dmin)}$${dmin < 1e-6 ? ' — they collide!' : ''}</p><p class="muted">Drag B's starting point (A starts at the origin).</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- vertical circle ---------- */
SIMS.f2_vcirc = {
  title: 'Motion in a vertical circle', desc: 'Set the speed at the bottom. A string goes slack when the tension reaches zero; a rod can push, so it only needs to reach the top.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    let kind = 'string', r = 1, u = 6.5, t0 = null;
    select(S.ctrls, 'Attached by', [['string', 'a light string'], ['rod', 'a light rod']], k => { kind = k; t0 = null; }, kind);
    slider(S.ctrls, 'radius r (m)', 0.5, 2, 0.1, r, k => { r = k; t0 = null; }); slider(S.ctrls, 'speed at bottom u (m s⁻¹)', 1, 12, 0.1, u, k => { u = k; t0 = null; });
    let th = 0, om = 0, free = null, lastT = null;
    const stop = loop(now => {
      const C = COL(); if (t0 === null) { t0 = now; th = 0; om = u / r; free = null; lastT = now; } const dt = Math.min(0.03, (now - lastT) / 1000); lastT = now;
      if (!free) { for (let i = 0; i < 20; i++) { om += -(G / r) * Math.sin(th) * dt / 20; th += om * dt / 20; } const v2 = r * r * om * om, T = v2 / r + G * Math.cos(th); if (kind === 'string' && T < 0) { const x = r * Math.sin(th), y = -r * Math.cos(th), vx = r * om * Math.cos(th), vy = r * om * Math.sin(th); free = { x, y, vx, vy, t: 0 }; } }
      else { free.t += dt; free.vy -= G * dt; free.x += free.vx * dt; free.y += free.vy * dt; if (free.y < -1.5 * r) t0 = null; }
      P.view(0, 0, 2.4 * r); P.clear(); P.circle(0, 0, r, C.grid, 1.5, [5, 5]); P.dot(0, 0, C.axis, 4);
      const px = free ? free.x : r * Math.sin(th), py = free ? free.y : -r * Math.cos(th); if (!free) P.line(0, 0, px, py, kind === 'rod' ? C.fg : C.text, kind === 'rod' ? 4 : 2); P.dot(px, py, C.b, 9);
      const umin = Math.sqrt((kind === 'rod' ? 4 : 5) * G * r), cosT = kind === 'string' && u < umin ? (2 * G * r - u * u) / (3 * G * r) : null;
      setRead(S.read, `<p>Energy: $v^2=u^2-2gr(1-\\cos\\theta)$; towards the centre: $T-mg\\cos\\theta=\\frac{mv^2}r$ ($\\theta$ from the bottom).</p><p class="hl">Least $u$ to complete the circle with a ${kind}: $\\sqrt{${kind === 'rod' ? 4 : 5}gr}=${f3(umin)}$ m s⁻¹. ${u >= umin ? 'This one makes it all the way round.' : kind === 'string' && cosT !== null && cosT > -1 && cosT < 1 ? `The string goes slack at $\\cos\\theta=\\frac{2gr-u^2}{3gr}=${f3(cosT)}$ ($\\theta=${f3(rd(Math.acos(cosT)))}^\\circ$), then it moves as a projectile.` : 'It swings back and forth without completing the circle.'}</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- distributions ---------- */
SIMS.f2_dist = {
  title: 'Geometric, Poisson & continuous distributions', desc: 'Change the parameter and see the probabilities, the mean and the variance. Shade P(X ≤ r) (or P(X < r) for a p.d.f.).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let kind = 'geo', p = 0.3, l = 3, n = 2, r = 3;
    select(S.ctrls, 'Distribution', [['geo', 'Geometric Geo(p)'], ['poi', 'Poisson Po(λ)'], ['pdf', 'p.d.f. f(x) = (n+1)xⁿ on [0, 1]'], ['beta', 'p.d.f. f(x) = 6x(1 − x)']], k => { kind = k; draw(); }, kind);
    slider(S.ctrls, 'p', 0.05, 0.95, 0.05, p, k => { p = k; draw(); }); slider(S.ctrls, 'λ', 0.5, 10, 0.1, l, k => { l = k; draw(); }); slider(S.ctrls, 'n (p.d.f.)', 0, 5, 1, n, k => { n = k; draw(); }, k => k); slider(S.ctrls, 'r', 0, 15, 0.05, r, k => { r = k; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear(); let txt;
      if (kind === 'geo' || kind === 'poi') { const N = kind === 'geo' ? 15 : Math.max(12, Math.ceil(l * 2.5)), xs = Array.from({ length: N + 1 }, (_, k) => k).filter(k => kind === 'poi' || k >= 1), ps = xs.map(k => (kind === 'geo' ? ST.geoPMF(p, k) : ST.poisPMF(l, k))), top = Math.max(...ps) * 1.2, R = Math.floor(r);
        P.xmin = -1; P.xmax = N + 1; P.ymin = -top * 0.12; P.ymax = top; xs.forEach((k, i) => { ctx.fillStyle = k <= R ? C.b : C.fill; ctx.fillRect(P.X(k - 0.38), P.Y(ps[i]), P.X(k + 0.38) - P.X(k - 0.38), P.Y(0) - P.Y(ps[i])); }); P.line(-1, 0, N + 1, 0, C.axis, 1.5);
        ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; xs.forEach(k => { if (k % (N > 20 ? 2 : 1) === 0) ctx.fillText(k, P.X(k), P.Y(0) + 14); });
        const E = kind === 'geo' ? 1 / p : l, Vr = kind === 'geo' ? (1 - p) / (p * p) : l, cum = kind === 'geo' ? ST.geoCDF(p, R) : ST.poisCDF(l, R); P.line(E, 0, E, top * 0.95, C.c, 1.5, [4, 4]); P.text('mean', E, top * 0.95, C.c);
        txt = `<p>${kind === 'geo' ? `$X\\sim\\text{Geo}(${f3(p)})$: $P(X=x)=(1-p)^{x-1}p$` : `$X\\sim\\text{Po}(${f3(l)})$: $P(X=x)=\\frac{e^{-\\lambda}\\lambda^x}{x!}$`}</p><p class="hl">$P(X\\le${R})=${cum.toFixed(4)}$ · $E(X)=${f3(E)}$ · $\\operatorname{Var}(X)=${f3(Vr)}$</p>`;
      } else { const f = kind === 'pdf' ? x => (n + 1) * x ** n : x => 6 * x * (1 - x), top = kind === 'pdf' ? (n + 1) * 1.15 : 1.8, R = Math.min(1, Math.max(0, r / 15));
        P.xmin = -0.1; P.xmax = 1.1; P.ymin = -top * 0.12; P.ymax = top; ctx.fillStyle = C.fill; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); for (let i = 0; i <= 100; i++) { const x = R * i / 100; ctx.lineTo(P.X(x), P.Y(f(x))); } ctx.lineTo(P.X(R), P.Y(0)); ctx.fill();
        P.line(-0.1, 0, 1.1, 0, C.axis, 1.5); P.curve(f, C.a, 3, 0, 1); const E = kind === 'pdf' ? (n + 1) / (n + 2) : 0.5, E2 = kind === 'pdf' ? (n + 1) / (n + 3) : 0.3, cum = kind === 'pdf' ? R ** (n + 1) : 3 * R * R - 2 * R ** 3; P.line(E, 0, E, top * 0.9, C.c, 1.5, [4, 4]); P.text('mean', E, top * 0.9, C.c);
        txt = `<p>$f(x)=${kind === 'pdf' ? `${n + 1}x^{${n}}` : '6x(1-x)'}$ on $[0,1]$; total area $1$.</p><p class="hl">$P(X\\lt${f3(R)})=${cum.toFixed(4)}$ · $E(X)=\\int xf(x)\\,dx=${f3(E)}$ · $\\operatorname{Var}(X)=${f3(E2 - E * E)}$</p><p class="muted">The r slider sets the cut-off (scaled to [0, 1]).</p>`; }
      setRead(S.read, txt);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- Cayley tables ---------- */
SIMS.f2_cayley = {
  title: 'Cayley tables, periods & cyclic subgroups', desc: 'Choose a group and an element. The table is coloured by value; the element\'s powers (its cyclic subgroup) are highlighted.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.1);
    let kind = 'add', n = 6, g = 2;
    select(S.ctrls, 'Group', [['add', 'Integers mod n under addition'], ['mul', 'Units mod n under multiplication']], k => { kind = k; draw(); }, kind);
    slider(S.ctrls, 'n', 2, 13, 1, n, k => { n = k; draw(); }, k => k); slider(S.ctrls, 'element g', 0, 12, 1, g, k => { g = k; draw(); }, k => k);
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear(); const els = kind === 'add' ? Array.from({ length: n }, (_, i) => i) : Array.from({ length: n }, (_, i) => i).filter(x => x && gcdI(x, n) === 1), op = (a, b) => (kind === 'add' ? (a + b) % n : (a * b) % n), e = kind === 'add' ? 0 : 1;
      const gg = els.includes(g % n) ? g % n : els[Math.min(els.length - 1, 1)] ?? e, sub = [e]; let x = gg; while (x !== e && sub.length <= els.length) { sub.push(x); x = op(x, gg); }
      const k = els.length, cell = Math.min(P.w, P.h) / (k + 1.4), ox = (P.w - cell * (k + 1)) / 2, oy = (P.h - cell * (k + 1)) / 2; ctx.font = `${Math.max(9, Math.min(15, cell * 0.42))}px ui-monospace, monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const th = document.documentElement.dataset.theme, dark = th ? th === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches, hue = v => `hsl(${(els.indexOf(v) * 360 / k) | 0} 60% ${dark ? 32 : 82}%)`;
      els.forEach((a, i) => { ctx.fillStyle = C.text; ctx.fillText(a, ox + cell * (i + 1.5), oy + cell * 0.5); ctx.fillText(a, ox + cell * 0.5, oy + cell * (i + 1.5));
        els.forEach((b, j) => { const v = op(a, b), on = sub.includes(a) && sub.includes(b); ctx.fillStyle = hue(v); ctx.globalAlpha = on ? 1 : 0.45; ctx.fillRect(ox + cell * (j + 1) + 1, oy + cell * (i + 1) + 1, cell - 2, cell - 2); ctx.globalAlpha = 1; ctx.fillStyle = C.fg; ctx.fillText(v, ox + cell * (j + 1.5), oy + cell * (i + 1.5)); }); });
      ctx.textBaseline = 'alphabetic';
      setRead(S.read, `<p>${kind === 'add' ? `$(\\mathbb Z_{${n}},+_{${n}})$` : `units mod ${n} under $\\times_{${n}}$`}: order $${k}$, identity $${e}$.${kind === 'mul' && k !== n - 1 ? ' (Only numbers coprime to n have inverses, so the others are left out.)' : ''}</p>
        <p class="hl">$\\langle${gg}\\rangle=\\{${sub.join(',')}\\}$: period of $${gg}$ is $${sub.length}$${sub.length === k ? ` — ${gg} <b>generates</b> the group, so it is cyclic` : `, which divides $${k}$ (Lagrange)`}.</p><p class="muted">Each element appears once in every row and column — the Latin square property of a group table.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- graph algorithms ---------- */
SIMS.f2_graph = {
  title: "Prim's and Dijkstra's algorithms", desc: 'Step through either algorithm on a random weighted graph. Highlighted edges are those chosen so far.',
  mount(el) {
    const S = simShell(el), stage = h('div', { class: 'figstage' }); S.stage.append(stage);
    let algo = 'prim', E = randGraph(), step = 0;
    select(S.ctrls, 'Algorithm', [['prim', "Prim (minimum spanning tree)"], ['dijk', "Dijkstra (shortest paths from A)"]], k => { algo = k; step = 0; draw(); }, algo);
    button(S.ctrls, 'Next step', () => { step++; draw(); }); button(S.ctrls, 'New graph', () => { E = randGraph(); step = 0; draw(); }, 'btn small ghost');
    function draw() {
      let hi = [], hn = [], info;
      if (algo === 'prim') { const T = prim(E), k = Math.min(step, T.length); hi = T.slice(0, k).map(e => `${e[0]}-${e[1]}`); hn = ['A', ...T.slice(0, k).flatMap(e => [e[0], e[1]])]; info = `<p>${k ? `Added: ${T.slice(0, k).map(e => `${e[0]}${e[1]} (${e[2]})`).join(', ')}` : 'Start at A.'}</p><p class="hl">${k === T.length ? `Done: minimum spanning tree weight $${T.reduce((s, e) => s + e[2], 0)}$.` : 'Next: the shortest edge from a tree vertex to a new vertex.'}</p>`; }
      else { const V = Object.keys(HEX), d = Object.fromEntries(V.map(v => [v, Infinity])), prev = {}, done = []; d.A = 0; let k = 0; while (done.length < V.length && k <= step) { const u = V.filter(v => !done.includes(v)).sort((a, b) => d[a] - d[b])[0]; done.push(u); for (const [a, b, w] of E) { const o = a === u ? b : b === u ? a : null; if (o && !done.includes(o) && d[u] + w < d[o]) { d[o] = d[u] + w; prev[o] = u; } } k++; }
        hn = done; hi = done.filter(v => prev[v]).map(v => `${prev[v]}-${v}`); info = `<p>Permanent: ${done.map(v => `${v} = ${d[v]}`).join(', ')}</p><p>Working: ${V.filter(v => !done.includes(v)).map(v => `${v} ${isFinite(d[v]) ? d[v] : '–'}`).join(', ') || 'none'}</p><p class="hl">${done.length === V.length ? `Shortest A → F: $${d.F}$.` : 'Next: make the smallest working value permanent and update its neighbours.'}</p>`; }
      stage.innerHTML = FIG.network(HEX, E, '', { hi, hn, w: 420, h: 260 }); setRead(S.read, info);
    }
    draw();
    return () => {};
  },
};

/* ---------- critical path analysis ---------- */
SIMS.f2_cpa = {
  title: 'Critical path analysis: a Gantt chart', desc: 'A random project. Bars start at their earliest start times; the pale extension is the float. Red activities are critical.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    const pre = { A: [], B: [], C: ['A'], D: ['A'], E: ['B', 'C'], F: ['D'], G: ['E', 'F'] }, ids = Object.keys(pre); let dur;
    const gen = () => { dur = Object.fromEntries(ids.map(k => [k, ri(1, 9)])); draw(); };
    button(S.ctrls, 'New project', () => gen());
    function draw() {
      const C = COL(), ctx = P.ctx, es = {}, ef = {}; ids.forEach(k => { es[k] = Math.max(0, ...pre[k].map(p => ef[p])); ef[k] = es[k] + dur[k]; }); const T = Math.max(...ids.map(k => ef[k])), lf = {};
      [...ids].reverse().forEach(k => { const succ = ids.filter(s => pre[s].includes(k)); lf[k] = succ.length ? Math.min(...succ.map(s => lf[s] - dur[s])) : T; });
      P.xmin = -2; P.xmax = T + 1; P.ymin = -1; P.ymax = ids.length + 0.5; P.clear(); for (let x = 0; x <= T; x++) P.line(x, -0.3, x, ids.length, C.grid, 1); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; for (let x = 0; x <= T; x += Math.ceil(T / 15)) ctx.fillText(x, P.X(x), P.Y(-0.6));
      ids.forEach((k, i) => { const y = ids.length - 1 - i, fl = lf[k] - ef[k]; ctx.fillStyle = C.fill; ctx.fillRect(P.X(ef[k]), P.Y(y + 0.75), P.X(lf[k]) - P.X(ef[k]), P.Y(y + 0.25) - P.Y(y + 0.75)); ctx.fillStyle = fl ? C.a : C.c; ctx.fillRect(P.X(es[k]), P.Y(y + 0.8), P.X(ef[k]) - P.X(es[k]), P.Y(y + 0.2) - P.Y(y + 0.8)); ctx.fillStyle = C.fg; ctx.textAlign = 'right'; ctx.fillText(`${k} (${dur[k]})`, P.X(-0.2), P.Y(y + 0.5) + 4); });
      setRead(S.read, `${stab(ids.map(k => [k, dur[k], pre[k].join(', ') || '—', es[k], lf[k], lf[k] - es[k] - dur[k]]), ['Activity', 'Duration', 'Preceded by', 'ES', 'LF', 'Float'])}<p class="hl">Minimum project time $${T}$; critical activities ${ids.filter(k => lf[k] - es[k] - dur[k] === 0).join(', ')}.</p>`);
    }
    P.onresize = () => dur && draw(); gen();
    return () => P.destroy();
  },
};

/* ---------- recurrence relations ---------- */
SIMS.f2_rec = {
  title: 'Second-order recurrence relations', desc: 'uₙ₊₂ = a uₙ₊₁ + b uₙ. See the terms, the auxiliary equation\'s roots and the closed form that matches them.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let a = 1, b = 1, u0 = 0, u1 = 1;
    slider(S.ctrls, 'a', -3, 3, 0.5, a, k => { a = k; draw(); }); slider(S.ctrls, 'b', -3, 3, 0.5, b, k => { b = k; draw(); }); slider(S.ctrls, 'u₀', -5, 5, 1, u0, k => { u0 = k; draw(); }, k => k); slider(S.ctrls, 'u₁', -5, 5, 1, u1, k => { u1 = k; draw(); }, k => k);
    function draw() {
      const C = COL(), N = 12, u = [u0, u1]; for (let k = 2; k <= N; k++) u.push(a * u[k - 1] + b * u[k - 2]); const top = Math.min(1e4, Math.max(5, ...u.map(Math.abs))) * 1.15; P.xmin = -1; P.xmax = N + 1; P.ymin = -top; P.ymax = top; P.clear(); P.grid(gstep(2 * top), true, 'n', 'uₙ');
      u.forEach((v, k) => { const vv = Math.max(-top, Math.min(top, v)); P.line(k, 0, k, vv, C.a, 3); P.dot(k, vv, C.a, 5); });
      const D = a * a + 4 * b; let form;
      if (D > 1e-9) { const r1 = (a + Math.sqrt(D)) / 2, r2 = (a - Math.sqrt(D)) / 2, B_ = (u1 - r1 * u0) / (r2 - r1), A_ = u0 - B_; form = `roots $${f3(r1)}$, $${f3(r2)}$: $u_n=${f3(A_)}(${f3(r1)})^n+${f3(B_)}(${f3(r2)})^n$`; }
      else if (Math.abs(D) <= 1e-9) { const r = a / 2; form = r ? `repeated root $${f3(r)}$: $u_n=(${f3(u0)}+${f3(u1 / r - u0)}n)(${f3(r)})^n$` : 'repeated root 0'; }
      else form = `complex roots $${f3(a / 2)}\\pm${f3(Math.sqrt(-D) / 2)}i$ — the terms oscillate (beyond this unit, but fun to see)`;
      setRead(S.read, `<p>$u_{n+2}=${f3(a)}u_{n+1}+${f3(b)}u_n$, $u_0=${u0}$, $u_1=${u1}$</p><p>Terms: $${u.slice(0, 9).map(v => f3(v)).join(',\\ ')},\\dots$</p><p class="hl">Auxiliary equation $r^2-${f3(a)}r-${f3(b)}=0$: ${form}</p><p class="muted">a = b = 1 with u₀ = 0, u₁ = 1 gives the Fibonacci numbers; the ratio of terms tends to the golden ratio 1.618.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
