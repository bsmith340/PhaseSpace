// Simulations for Maths A2 2: calculus kinematics, projectiles, moments on a beam, collisions, the normal distribution, hypothesis tests.
'use strict';

const gstep = r => { const s = Math.abs(r) / 6 || 1, p = 10 ** Math.floor(Math.log10(s)), q = s / p; return (q < 1.5 ? 1 : q < 3.5 ? 2 : q < 7.5 ? 5 : 10) * p; }; // grid step for a range r

/* ---------- variable acceleration: s, v, a graphs ---------- */
SIMS.m4_cal = {
  title: 'Variable acceleration: s, v and a', desc: 'Choose a displacement function. Move t to see that v is the gradient of s and a is the gradient of v — and where the particle is at rest.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    const FS = { cub: ['t³ − 6t² + 9t', [1, -6, 9, 0]], cub2: ['2t³ − 9t² + 12t', [2, -9, 12, 0]], quad: ['8t − t²', [-1, 8, 0]], sq: ['t² − 4t + 3', [1, -4, 3]], q4: ['t⁴/4 − 2t³ + 4t²', [0.25, -2, 4, 0, 0]] };
    let key = 'cub', tt = 1.5, show = { s: true, v: true, a: true };
    const ev = (c, t) => c.reduce((s, k) => s * t + k, 0), der = c => c.slice(0, -1).map((k, i) => k * (c.length - 1 - i));
    select(S.ctrls, 's(t)', Object.entries(FS).map(([k, v]) => [k, v[0]]), v => { key = v; draw(); });
    slider(S.ctrls, 't', 0, 6, 0.01, tt, v => { tt = v; draw(); });
    for (const k of ['s', 'v', 'a']) check(S.ctrls, `Show ${k}`, true, v => { show[k] = v; draw(); });
    function draw() {
      const C = COL(), s = FS[key][1], v = der(s), a = der(v); const ys = []; for (let t = 0; t <= 6; t += 0.05) ys.push(ev(s, t), ev(v, t), ev(a, t));
      const lo = Math.max(-30, Math.min(...ys)), hi = Math.min(40, Math.max(...ys)); P.xmin = -0.4; P.xmax = 6.2; P.ymin = lo - (hi - lo) * 0.08; P.ymax = hi + (hi - lo) * 0.08; P.clear(); P.grid(gstep(hi - lo), true, 't', '');
      if (show.s) P.curve(t => ev(s, t), C.a, 3, 0, 6); if (show.v) P.curve(t => ev(v, t), C.b, 2.5, 0, 6); if (show.a) P.curve(t => ev(a, t), C.c, 2, 0, 6);
      const S0 = ev(s, tt), V0 = ev(v, tt), A0 = ev(a, tt);
      if (show.s) { P.curve(t => S0 + V0 * (t - tt), C.a, 1, tt - 0.8, tt + 0.8); P.dot(tt, S0, C.a, 6); } if (show.v) { P.curve(t => V0 + A0 * (t - tt), C.b, 1, tt - 0.8, tt + 0.8); P.dot(tt, V0, C.b, 6); } if (show.a) P.dot(tt, A0, C.c, 6);
      const rest = []; for (let t = 0; t < 6; t += 0.001) if (Math.sign(ev(v, t)) !== Math.sign(ev(v, t + 0.001))) rest.push(f3(t + 0.0005));
      setRead(S.read, `<p><span style="color:${C.a}">■</span> $s=${FS[key][0].replace('³', '^3').replace('²', '^2').replace('⁴', '^4').replace('/4', '\\div4')}$ &nbsp;<span style="color:${C.b}">■</span> $v=\\dfrac{ds}{dt}$ &nbsp;<span style="color:${C.c}">■</span> $a=\\dfrac{dv}{dt}$</p>
        <p class="hl">$t=${f3(tt)}$: $s=${f3(S0)}$ m, $v=${f3(V0)}$ m s⁻¹, $a=${f3(A0)}$ m s⁻²</p><p>At rest ($v=0$) when $t\\approx${rest.length ? rest.join(',\\ ') : '\\text{never in }[0,6]'}$ — split distance integrals there.</p>
        <p class="muted">The thin lines are tangents: the gradient of $s$ is the value of $v$; the gradient of $v$ is the value of $a$.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- projectiles ---------- */
SIMS.m4_proj = {
  title: 'Projectiles', desc: 'Set the speed, angle and launch height, then fire. Velocity components are drawn live; the trajectory, greatest height and range are computed.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let u = 20, al = 40, h0 = 0, t0 = null, run = false, ghost = true;
    slider(S.ctrls, 'speed u (m s⁻¹)', 2, 35, 0.5, u, v => { u = v; reset(); });
    slider(S.ctrls, 'angle α', -30, 90, 1, al, v => { al = v; reset(); }, v => v + '°');
    slider(S.ctrls, 'height (m)', 0, 40, 1, h0, v => { h0 = v; reset(); }, v => v);
    check(S.ctrls, 'Show 45° comparison', ghost, v => { ghost = v; });
    button(S.ctrls, 'Fire', () => { run = true; t0 = null; });
    function reset() { run = false; t0 = null; }
    const stop = loop(now => {
      const C = COL(), a = dg(al), ux = u * Math.cos(a), uy = u * Math.sin(a), Tf = (uy + Math.sqrt(uy * uy + 2 * G * h0)) / G, R = ux * Tf, H = h0 + (uy > 0 ? uy * uy / (2 * G) : 0);
      const span = Math.max(R, 2 * H, 10) * 0.6; P.xmin = -span * 0.08; P.xmax = span * 1.92; const hh = (P.xmax - P.xmin) * P.h / P.w; P.ymin = -hh * 0.08; P.ymax = hh * 0.92; P.clear(); P.grid(gstep(span), true, 'x (m)', 'y (m)');
      if (h0 > 0) { P.ctx.fillStyle = C.grid; P.ctx.fillRect(P.X(P.xmin), P.Y(h0), P.X(0) - P.X(P.xmin), P.Y(0) - P.Y(h0)); }
      if (ghost && h0 === 0) { const r = u * u / G; P.param(t => u * Math.SQRT1_2 * t, t => u * Math.SQRT1_2 * t - 4.9 * t * t, 0, 2 * u * Math.SQRT1_2 / G, C.grid, 2); P.text('45°: R = ' + f3(r), r, 0, C.text, -60, -10); }
      P.param(t => ux * t, t => h0 + uy * t - 4.9 * t * t, 0, Tf, C.a, 2.5, 400);
      let t = 0; if (run) { if (t0 === null) t0 = now; t = Math.min((now - t0) / 1000, Tf); }
      const x = ux * t, y = h0 + uy * t - 4.9 * t * t, vx = ux, vy = uy - G * t, k = span * 0.03;
      P.dot(x, y, C.b, 7); P.arrow(x, y, x + vx * k, y, C.c, 2); P.arrow(x, y, x, y + vy * k, C.d, 2); P.arrow(x, y, x + vx * k, y + vy * k, C.b, 2.5);
      if (uy > 0) { const tm = uy / G; P.line(ux * tm, 0, ux * tm, H, C.text, 1, [4, 4]); P.text('H = ' + f3(H), ux * tm, H, C.text); }
      setRead(S.read, `<p>$x=${f3(ux)}t,\\quad y=${h0 ? h0 + '+' : ''}${f3(uy)}t-4.9t^2$</p><p class="hl">Time of flight $${f3(Tf)}$ s · greatest height $${f3(H)}$ m · range $${f3(R)}$ m</p>
        <p>$t=${f3(t)}$ s: $v_x=${f3(vx)}$ (constant), $v_y=${f3(vy)}$, speed $${f3(Math.hypot(vx, vy))}$ m s⁻¹ at $${f3(rd(Math.atan2(vy, vx)))}^\\circ$</p><p class="muted">Horizontal: constant velocity. Vertical: suvat with $a=-9.8$. From level ground the range $\\frac{u^2\\sin2\\alpha}g$ is greatest at $45^\\circ$, and complementary angles give equal ranges.</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- moments: a beam on two supports ---------- */
SIMS.m4_beam = {
  title: 'Moments: a beam on two supports', desc: 'Move the supports and a load along a uniform beam. Watch the reactions change — and the beam tilt when one would have to go negative.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.8);
    let L = 8, W = 100, c = 1, d = 7, m = 150, x = 6;
    slider(S.ctrls, 'beam weight W (N)', 0, 300, 10, W, v => { W = v; draw(); }, v => v);
    slider(S.ctrls, 'support C (m from A)', 0, 8, 0.25, c, v => { c = Math.min(v, d - 0.5); draw(); });
    slider(S.ctrls, 'support D (m from A)', 0, 8, 0.25, d, v => { d = Math.max(v, c + 0.5); draw(); });
    slider(S.ctrls, 'load (N)', 0, 500, 10, m, v => { m = v; draw(); }, v => v);
    slider(S.ctrls, 'load position (m from A)', 0, 8, 0.1, x, v => { x = v; draw(); });
    function draw() {
      const C = COL(); P.xmin = -1.2; P.xmax = L + 1.2; const hh = (P.xmax - P.xmin) * P.h / P.w; P.ymin = -hh / 2; P.ymax = hh / 2; P.clear(); const ctx = P.ctx;
      const RD = (W * (L / 2 - c) + m * (x - c)) / (d - c), RC = W + m - RD; let tilt = 0, piv = null;
      if (RC < -1e-9) { tilt = -1; piv = d; } else if (RD < -1e-9) { tilt = 1; piv = c; }
      const ang = tilt * 0.12; ctx.save(); const px = P.X(piv ?? L / 2), py = P.Y(0); ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py);
      ctx.fillStyle = C.fill; ctx.strokeStyle = C.fg; ctx.lineWidth = 2; ctx.fillRect(P.X(0), P.Y(0.25), P.X(L) - P.X(0), P.Y(0) - P.Y(0.25)); ctx.strokeRect(P.X(0), P.Y(0.25), P.X(L) - P.X(0), P.Y(0) - P.Y(0.25));
      P.text('A', 0, 0.25, C.text, -4, -6); P.text('B', L, 0.25, C.text, -4, -6);
      if (W) { P.arrow(L / 2, 0.12, L / 2, 0.12 - 0.8 * W / 300 - 0.3, C.c, 2.5); P.text(`W = ${W}`, L / 2, -0.6, C.c, 6, 14); }
      if (m) { P.arrow(x, 1.5, x, 0.27, C.b, 3); P.text(`${m} N`, x, 1.5, C.b, 6, 4); }
      ctx.restore();
      for (const [s, R, n] of [[c, RC, 'C'], [d, RD, 'D']]) { ctx.fillStyle = C.axis; ctx.beginPath(); ctx.moveTo(P.X(s), P.Y(0)); ctx.lineTo(P.X(s - 0.3), P.Y(-0.6)); ctx.lineTo(P.X(s + 0.3), P.Y(-0.6)); ctx.fill(); P.text(n, s, -0.6, C.text, -4, 16);
        if (!tilt && R > 1e-9) P.arrow(s, -1.6, s, -0.65, C.a, 2.5); if (!tilt) P.text(`R = ${f3(R)}`, s, -1.6, C.a, 6, 4); }
      setRead(S.read, `<p>Moments about $C$: $R_D(${f3(d - c)})=${W}(${f3(L / 2 - c)})+${m}(${f3(x - c)})$</p>
        ${tilt ? `<p class="hl">Equilibrium would need $R_${tilt < 0 ? 'C' : 'D'}=${f3(tilt < 0 ? RC : RD)}\\lt0$, which is impossible — the beam tilts about $${tilt < 0 ? 'D' : 'C'}$.</p>` : `<p class="hl">$R_C=${f3(RC)}$ N, $R_D=${f3(RD)}$ N</p>`}
        <p class="muted">"On the point of tilting about D" means $R_C=0$: take moments about $D$ with only the weights.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- direct collisions & explosions ---------- */
SIMS.m4_coll = {
  title: 'Collisions & conservation of momentum', desc: 'Two particles collide head-on. Choose coalescence or set A\'s velocity afterwards; momentum is conserved and the impulses are equal and opposite.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 2.2);
    let m1 = 3, m2 = 2, u1 = 6, u2 = -2, mode = 'stick', v1 = 0, t0 = null, run = false;
    select(S.ctrls, 'After the collision', [['stick', 'They coalesce'], ['set', 'Set A\'s velocity v_A']], v => { mode = v; reset(); }, mode);
    slider(S.ctrls, 'mass A (kg)', 0.5, 10, 0.5, m1, v => { m1 = v; reset(); }); slider(S.ctrls, 'mass B (kg)', 0.5, 10, 0.5, m2, v => { m2 = v; reset(); });
    slider(S.ctrls, 'u_A (m s⁻¹)', 0, 10, 0.5, u1, v => { u1 = v; reset(); }); slider(S.ctrls, 'u_B (m s⁻¹)', -10, 5, 0.5, u2, v => { u2 = v; reset(); });
    slider(S.ctrls, 'v_A (m s⁻¹)', -10, 10, 0.5, v1, v => { v1 = v; reset(); });
    button(S.ctrls, 'Run', () => { run = true; t0 = null; });
    function reset() { run = false; t0 = null; }
    const stop = loop(now => {
      const C = COL(), p = m1 * u1 + m2 * u2, VA = mode === 'stick' ? p / (m1 + m2) : v1, VB = mode === 'stick' ? VA : (p - m1 * VA) / m2, ok = u1 > u2 && VB >= VA - 1e-9;
      const KE0 = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2, KE1 = 0.5 * m1 * VA * VA + 0.5 * m2 * VB * VB, gain = KE1 > KE0 + 1e-9;
      P.view(0, 0, 10); P.clear(); P.line(-10, -0.6, 10, -0.6, C.axis, 1.5);
      const rA = 0.35 + 0.08 * m1, rB = 0.35 + 0.08 * m2, tc = ok ? (8 - rA - rB) / (u1 - u2 || 1) : Infinity; let t = 0; if (run && ok) { if (t0 === null) t0 = now; t = (now - t0) / 1000 * Math.min(1, 2.5 / Math.max(1, tc)); }
      const xa = t < tc ? -4 + u1 * t : -4 + u1 * tc + VA * (t - tc), xb = t < tc ? 4 + u2 * t : 4 + u2 * tc + VB * (t - tc);
      P.circle(xa, -0.6 + rA, rA, C.a, 3); P.circle(xb, -0.6 + rB, rB, C.b, 3); P.text('A', xa, -0.6 + rA, C.a, -4, 4); P.text('B', xb, -0.6 + rB, C.b, -4, 4);
      if (run && t > tc + 4) t0 = null;
      setRead(S.read, ok ? `<p>Before: $${m1}(${u1})+${m2}(${u2})=${f3(p)}$ N s</p><p class="hl">After: $v_A=${f3(VA)}$, $v_B=${f3(VB)}$ m s⁻¹ — momentum $${f3(m1 * VA + m2 * VB)}$ N s</p>
        <p>Impulse on $B$: $${m2}(${f3(VB)}-(${u2}))=${f3(m2 * (VB - u2))}$ N s; on $A$: $${f3(m1 * (VA - u1))}$ N s (equal and opposite).</p><p class="muted">Kinetic energy ${f3(KE0)} J → ${f3(KE1)} J${gain ? ' — a gain, which is impossible without an explosion: this v_A cannot happen in a collision.' : ` (${f3(KE0 - KE1)} J lost${mode === 'stick' ? '; coalescing loses the most' : ''}).`}</p>`
        : `<p class="hl">${u1 <= u2 ? 'A never catches B — no collision.' : 'B would end up behind A, so the particles would pass through each other: choose a smaller v_A.'}</p>`);
    });
    return () => { stop(); P.destroy(); };
  },
};

/* ---------- the normal distribution ---------- */
SIMS.m4_normal = {
  title: 'The normal distribution N(μ, σ²)', desc: 'Shade P(a < X < b), a tail, or work backwards from a probability to a value. The standardised z-values are shown alongside.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.8);
    let mu = 50, sd = 10, a = 40, b = 65, mode = 'btw', p = 0.9;
    select(S.ctrls, 'Find', [['btw', 'P(a < X < b)'], ['lt', 'P(X < b)'], ['gt', 'P(X > a)'], ['inv', 'a with P(X < a) = p']], v => { mode = v; draw(); }, mode);
    slider(S.ctrls, 'μ', 0, 100, 1, mu, v => { mu = v; draw(); }, v => v); slider(S.ctrls, 'σ', 1, 25, 0.5, sd, v => { sd = v; draw(); });
    slider(S.ctrls, 'a', -20, 120, 0.5, a, v => { a = v; draw(); }); slider(S.ctrls, 'b', -20, 120, 0.5, b, v => { b = v; draw(); });
    slider(S.ctrls, 'p', 0.01, 0.99, 0.01, p, v => { p = v; draw(); });
    function draw() {
      const C = COL(), f = x => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI)), top = f(mu);
      P.xmin = mu - 4.2 * sd; P.xmax = mu + 4.2 * sd; P.ymin = -top * 0.18; P.ymax = top * 1.15; P.clear(); const ctx = P.ctx;
      let lo, hi; if (mode === 'btw') { lo = Math.min(a, b); hi = Math.max(a, b); } else if (mode === 'lt') { lo = P.xmin; hi = b; } else if (mode === 'gt') { lo = a; hi = P.xmax; } else { lo = P.xmin; hi = mu + sd * ST.invPhi(p); }
      lo = Math.max(lo, P.xmin); hi = Math.min(hi, P.xmax);
      if (hi > lo) { ctx.fillStyle = C.fill; ctx.beginPath(); ctx.moveTo(P.X(lo), P.Y(0)); for (let i = 0; i <= 200; i++) { const x = lo + (hi - lo) * i / 200; ctx.lineTo(P.X(x), P.Y(f(x))); } ctx.lineTo(P.X(hi), P.Y(0)); ctx.fill(); }
      P.line(P.xmin, 0, P.xmax, 0, C.axis, 1.5); P.curve(f, C.a, 3);
      ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; for (let k = -3; k <= 3; k++) { const x = mu + k * sd; P.line(x, 0, x, -top * 0.03, C.axis, 1); ctx.fillText(f3(x), P.X(x), P.Y(0) + 14); ctx.fillText(k ? `${k > 0 ? '+' : ''}${k}σ` : 'μ', P.X(x), P.Y(0) + 27); }
      const z = x => f3((x - mu) / sd); let txt;
      if (mode === 'btw') txt = `$P(${f3(lo)}\\lt X\\lt${f3(hi)})=\\Phi(${z(hi)})-\\Phi(${z(lo)})=${(ST.normCDF(hi, mu, sd) - ST.normCDF(lo, mu, sd)).toFixed(4)}$`;
      else if (mode === 'lt') txt = `$P(X\\lt${f3(b)})=\\Phi(${z(b)})=${ST.normCDF(b, mu, sd).toFixed(4)}$`;
      else if (mode === 'gt') txt = `$P(X\\gt${f3(a)})=1-\\Phi(${z(a)})=${(1 - ST.normCDF(a, mu, sd)).toFixed(4)}$`;
      else { const zz = ST.invPhi(p); txt = `$\\Phi^{-1}(${f3(p)})=${zz.toFixed(4)}$, so $a=${mu}+${zz.toFixed(4)}\\times${sd}=${f3(mu + zz * sd)}$`; }
      setRead(S.read, `<p>$X\\sim N(${mu},\\ ${sd}^2)$, $Z=\\dfrac{X-${mu}}{${sd}}$</p><p class="hl">${txt}</p><p class="muted">68% of the area lies within 1σ of μ, 95% within 2σ, 99.7% within 3σ. The total area is 1, and P(X = a) = 0 for a continuous variable.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- hypothesis testing: critical regions ---------- */
SIMS.m4_test = {
  title: 'Hypothesis tests: critical regions & p-values', desc: 'See the distribution under H₀, the critical region at your significance level and where the observed value falls — for a binomial proportion or a normal mean.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.8);
    let kind = 'bin', tail = 'up', al = 0.05, n = 20, p0 = 0.3, x = 10, mu0 = 50, sd = 8, xb = 53.5;
    select(S.ctrls, 'Test', [['bin', 'Binomial proportion'], ['nrm', 'Normal mean (σ known)']], v => { kind = v; draw(); }, kind);
    select(S.ctrls, 'H₁', [['up', 'greater than (upper tail)'], ['lo', 'less than (lower tail)'], ['two', 'not equal (two tails)']], v => { tail = v; draw(); }, tail);
    select(S.ctrls, 'Significance level', [['0.1', '10%'], ['0.05', '5%'], ['0.01', '1%']], v => { al = +v; draw(); }, '0.05');
    slider(S.ctrls, 'n (sample size)', 5, 50, 1, n, v => { n = v; x = Math.min(x, n); draw(); }, v => v); slider(S.ctrls, 'p₀ (binomial)', 0.05, 0.95, 0.05, p0, v => { p0 = v; draw(); });
    slider(S.ctrls, 'observed x (binomial)', 0, 50, 1, x, v => { x = Math.min(v, n); draw(); }, v => v);
    slider(S.ctrls, 'x̄ (normal)', 30, 70, 0.1, xb, v => { xb = v; draw(); });
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear(); let txt;
      if (kind === 'bin') {
        const ps = Array.from({ length: n + 1 }, (_, k) => ST.binomPMF(n, p0, k)), cdf = k => ST.binomCDF(n, p0, k), top = Math.max(...ps) * 1.2, aT = tail === 'two' ? al / 2 : al;
        let cl = -1; while (cl + 1 <= n && cdf(cl + 1) <= aT) cl++; let cu = n + 1; while (cu - 1 >= 0 && 1 - cdf(cu - 2) <= aT) cu--;
        const inCR = k => (tail !== 'up' && k <= cl) || (tail !== 'lo' && k >= cu);
        P.xmin = -1; P.xmax = n + 1; P.ymin = -top * 0.12; P.ymax = top;
        ps.forEach((q, k) => { ctx.fillStyle = k === x ? C.b : inCR(k) ? C.c : C.fill; ctx.fillRect(P.X(k - 0.4), P.Y(q), P.X(k + 0.4) - P.X(k - 0.4), P.Y(0) - P.Y(q)); });
        P.line(-1, 0, n + 1, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; const st = Math.ceil((n + 1) / 15); for (let k = 0; k <= n; k += st) ctx.fillText(k, P.X(k), P.Y(0) + 14);
        const pu = 1 - cdf(x - 1), pl = cdf(x), pv = tail === 'up' ? pu : tail === 'lo' ? pl : Math.min(1, 2 * Math.min(pu, pl)), rej = inCR(x);
        const cr = [tail !== 'up' && cl >= 0 ? `X\\le${cl}` : '', tail !== 'lo' && cu <= n ? `X\\ge${cu}` : ''].filter(Boolean).join('\\ \\text{or}\\ ') || '\\varnothing', act = (tail !== 'up' && cl >= 0 ? cdf(cl) : 0) + (tail !== 'lo' && cu <= n ? 1 - cdf(cu - 1) : 0);
        txt = `<p>$H_0:p=${p0}$, $H_1:p${tail === 'up' ? '\\gt' : tail === 'lo' ? '\\lt' : '\\ne'}${p0}$; under $H_0$, $X\\sim B(${n},${p0})$</p><p>Critical region (orange): $${cr}$, actual significance level $${act.toFixed(4)}$</p>
          <p class="hl">Observed $x=${x}$ (blue): ${tail === 'two' ? 'p-value (two-tailed, doubled) ' : 'p-value '}$=${pv.toFixed(4)}$ → ${rej ? 'reject $H_0$' : 'do not reject $H_0$'}</p>`;
      } else {
        const m = n, se = sd / Math.sqrt(m), f = t => Math.exp(-0.5 * ((t - mu0) / se) ** 2), aT = tail === 'two' ? al / 2 : al, zc = ST.invPhi(1 - aT), cu = mu0 + zc * se, cl = mu0 - zc * se;
        P.xmin = mu0 - 4.5 * se; P.xmax = mu0 + 4.5 * se; P.ymin = -0.18; P.ymax = 1.15;
        const shade = (a, b, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(P.X(a), P.Y(0)); for (let i = 0; i <= 120; i++) { const t = a + (b - a) * i / 120; ctx.lineTo(P.X(t), P.Y(f(t))); } ctx.lineTo(P.X(b), P.Y(0)); ctx.fill(); };
        if (tail !== 'lo') shade(cu, P.xmax, C.c); if (tail !== 'up') shade(P.xmin, cl, C.c);
        P.line(P.xmin, 0, P.xmax, 0, C.axis, 1.5); P.curve(f, C.a, 3); const xv = Math.max(P.xmin, Math.min(P.xmax, xb)); P.line(xv, 0, xv, 1.05, C.b, 2.5); P.text('x̄', xv, 1.05, C.b);
        ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; for (let k = -3; k <= 3; k++) ctx.fillText(f3(mu0 + k * se), P.X(mu0 + k * se), P.Y(0) + 14);
        const z = (xb - mu0) / se, pu = 1 - ST.Phi(z), pv = tail === 'up' ? pu : tail === 'lo' ? 1 - pu : 2 * Math.min(pu, 1 - pu), rej = tail === 'up' ? z > zc : tail === 'lo' ? z < -zc : Math.abs(z) > zc;
        txt = `<p>$H_0:\\mu=${mu0}$, $\\sigma=${sd}$, $n=${m}$: under $H_0$, $\\bar X\\sim N\\left(${mu0},\\ \\frac{${sd}^2}{${m}}\\right)$, standard error $${f3(se)}$</p><p>Critical value${tail === 'two' ? 's' : ''} $z=${tail === 'two' ? '\\pm' : tail === 'lo' ? '-' : ''}${zc.toFixed(4)}$, i.e. $\\bar x${tail === 'up' ? `\\gt${f3(cu)}` : tail === 'lo' ? `\\lt${f3(cl)}` : `\\lt${f3(cl)}\\text{ or }\\bar x\\gt${f3(cu)}`}$</p>
          <p class="hl">$z=\\frac{${f3(xb)}-${mu0}}{${f3(se)}}=${f3(z)}$, p-value $${pv.toFixed(4)}$ → ${rej ? 'reject $H_0$' : 'do not reject $H_0$'}</p>`;
      }
      setRead(S.read, `${txt}<p class="muted">The significance level is the probability of landing in the critical region when $H_0$ is true — the risk of wrongly rejecting it.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
