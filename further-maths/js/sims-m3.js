// Simulations for Maths A2 1: functions & inverses, parametric curves, sequences, reciprocal/inverse trig, R-form, iteration, trapezium rule.
'use strict';

/* ---------- functions, inverses and modulus ---------- */
SIMS.m3_func = {
  title: 'Functions: inverse, |f(x)| and f(|x|)', desc: 'Pick a function. Reflect it in y = x for the inverse, and see the two modulus graphs.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.2);
    const FS = { lin: ['2x − 3', x => 2 * x - 3, x => (x + 3) / 2, 'x\\in\\mathbb R'], exp: ['eˣ', Math.exp, Math.log, 'x\\in\\mathbb R'], sq: ['x² (x ≥ 0)', x => (x >= 0 ? x * x : NaN), x => (x >= 0 ? Math.sqrt(x) : NaN), 'x\\ge0'],
      cub: ['x³ − 2', x => x ** 3 - 2, x => Math.cbrt(x + 2), 'x\\in\\mathbb R'], rec: ['1/(x − 1)', x => 1 / (x - 1), x => 1 + 1 / x, 'x\\ne1'], q: ['x² − 4x (all x)', x => x * x - 4 * x, null, 'x\\in\\mathbb R'] };
    let key = 'lin', inv = true, mod1 = false, mod2 = false;
    select(S.ctrls, 'f(x)', Object.entries(FS).map(([k, v]) => [k, v[0]]), v => { key = v; draw(); });
    check(S.ctrls, 'Show f⁻¹(x) and y = x', inv, v => { inv = v; draw(); }); check(S.ctrls, 'Show y = |f(x)|', mod1, v => { mod1 = v; draw(); }); check(S.ctrls, 'Show y = f(|x|)', mod2, v => { mod2 = v; draw(); });
    function draw() {
      const C = COL(), [name, f, fi, dom] = FS[key]; P.view(0, 0, 7); P.clear(); P.grid(1, true);
      if (inv) P.curve(x => x, C.grid, 1.5);
      P.curve(f, C.a, 3); if (inv && fi) P.curve(fi, C.b, 2.5); if (mod1) P.curve(x => Math.abs(f(x)), C.c, 2.5); if (mod2) P.curve(x => f(Math.abs(x)), C.d, 2.5);
      setRead(S.read, `<p>$f(x)=${name.replace(/[()]/g, m => m).replace('x²', 'x^2').replace('x³', 'x^3').replace('eˣ', 'e^x').replace(' (x ≥ 0)', '').replace(' (all x)', '')}$, domain $${dom}$</p>${inv ? (fi ? `<p class="hl">$f^{-1}$ (red) is the reflection of $f$ (blue) in $y=x$. Domain of $f^{-1}$ = range of $f$.</p>` : `<p class="hl">$f$ is not one-to-one on this domain, so it has no inverse. Restrict to $x\\ge2$ to fix it.</p>`) : ''}${mod1 ? '<p>$|f(x)|$ (orange): the parts below the $x$-axis are reflected up.</p>' : ''}${mod2 ? '<p>$f(|x|)$ (green): the right-hand half is reflected in the $y$-axis.</p>' : ''}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- parametric curves ---------- */
SIMS.m3_param = {
  title: 'Parametric curves', desc: 'Watch a point trace x = f(t), y = g(t). Drag t to see the tangent, whose gradient is (dy/dt)/(dx/dt).',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.25);
    const PRE = { par: ['x = t², y = 2t', t => t * t, t => 2 * t, -3, 3, 'y^2=4x'], ell: ['x = 3cos t, y = 2sin t', t => 3 * Math.cos(t), t => 2 * Math.sin(t), 0, 2 * Math.PI, '\\frac{x^2}{9}+\\frac{y^2}{4}=1'],
      cyc: ['x = t − sin t, y = 1 − cos t', t => t - Math.sin(t), t => 1 - Math.cos(t), 0, 4 * Math.PI, '\\text{(cycloid)}'], proj: ['x = 6t, y = 8t − 4.9t²', t => 6 * t, t => 8 * t - 4.9 * t * t, 0, 1.63, 'y=\\tfrac43x-\\tfrac{4.9}{36}x^2'],
      liss: ['x = sin 2t, y = sin 3t', t => 3 * Math.sin(2 * t), t => 3 * Math.sin(3 * t), 0, 2 * Math.PI, '\\text{(Lissajous; scaled ×3)}'], rec: ['x = t + 1/t, y = t − 1/t', t => t + 1 / t, t => t - 1 / t, 0.25, 4, 'x^2-y^2=4'] };
    let key = 'par', tt = 1;
    select(S.ctrls, 'Curve', Object.entries(PRE).map(([k, v]) => [k, v[0]]), v => { key = v; const p = PRE[key]; tt = (p[3] + p[4]) / 2; sl.set(tt); draw(); });
    const sl = slider(S.ctrls, 't', -3, 13, 0.01, tt, v => { tt = Math.max(PRE[key][3], Math.min(PRE[key][4], v)); draw(); });
    function draw() {
      const C = COL(), [name, fx, fy, a, b, cart] = PRE[key]; P.view(key === 'cyc' ? 6.3 : key === 'proj' ? 5 : 0, key === 'cyc' || key === 'proj' ? 2 : 0, 7); P.clear(); P.grid(1, true);
      P.param(fx, fy, a, b, C.a, 3); const x = fx(tt), y = fy(tt), h = 1e-5, dx = (fx(tt + h) - fx(tt - h)) / (2 * h), dy = (fy(tt + h) - fy(tt - h)) / (2 * h);
      if (Math.abs(dx) > 1e-6) { const m = dy / dx; P.curve(X => y + m * (X - x), C.c, 1.5); } else P.line(x, P.ymin, x, P.ymax, C.c, 1.5);
      P.dot(x, y, C.b, 7);
      setRead(S.read, `<p>${name}</p><p>Cartesian: $${cart}$</p><p class="hl">$t=${f3(tt)}$: point $(${f3(x)},\\ ${f3(y)})$<br>$\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{${f3(dy)}}{${f3(dx)}}=${Math.abs(dx) > 1e-6 ? f3(dy / dx) : '\\infty'}$</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- sequences: cobweb and partial sums ---------- */
SIMS.m3_seq = {
  title: 'Sequences: recurrences, AP and GP', desc: 'A cobweb diagram for uₙ₊₁ = a·uₙ + b shows convergence, divergence and oscillation; switch to AP/GP to see the terms and partial sums.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    let mode = 'rec', a = 0.5, b = 3, u0 = 1, n = 12;
    select(S.ctrls, 'Mode', [['rec', 'Recurrence uₙ₊₁ = a uₙ + b'], ['ap', 'Arithmetic (a = u₁, d = b)'], ['gp', 'Geometric (a = u₁, r = a)']], v => { mode = v; draw(); });
    slider(S.ctrls, 'a (or r)', -1.5, 1.5, 0.05, a, v => { a = v; draw(); }); slider(S.ctrls, 'b (or d)', -5, 5, 0.25, b, v => { b = v; draw(); }); slider(S.ctrls, 'u₁', -5, 8, 0.25, u0, v => { u0 = v; draw(); });
    slider(S.ctrls, 'terms', 3, 30, 1, n, v => { n = v; draw(); }, v => v);
    function draw() {
      const C = COL(); const us = [u0]; for (let i = 1; i < n; i++) us.push(mode === 'rec' ? a * us[i - 1] + b : mode === 'ap' ? us[i - 1] + b : us[i - 1] * a);
      if (mode === 'rec') { const L = Math.abs(1 - a) > 1e-9 ? b / (1 - a) : NaN, span = Math.max(8, ...us.slice(0, 8).map(Math.abs)) * 1.2; P.view(span / 3, span / 3, span); P.clear(); P.grid(niceStep(span), true, 'uₙ', 'uₙ₊₁');
        P.curve(x => x, C.grid, 1.5); P.curve(x => a * x + b, C.a, 2.5); let x = us[0]; for (let i = 1; i < us.length; i++) { const y = us[i]; P.line(x, i === 1 ? 0 : x, x, y, C.b, 1.3); P.line(x, y, y, y, C.b, 1.3); x = y; }
        setRead(S.read, `<p>$u_{n+1}=${f3(a)}u_n${b < 0 ? '-' : '+'}${f3(Math.abs(b))}$, $u_1=${f3(u0)}$</p><p>${us.slice(0, 8).map(f3).join(', ')}, …</p><p class="hl">${Math.abs(a) < 1 ? `Converges to $L=\\frac{b}{1-a}=${f3(L)}$ ${a < 0 ? '(oscillating: a cobweb)' : '(monotonic: a staircase)'}` : Math.abs(a) === 1 ? (a === -1 ? 'Periodic with period 2' : 'Arithmetic: diverges unless b = 0') : 'Diverges — |a| > 1'}</p>`);
      } else { const sums = us.map((_, i) => us.slice(0, i + 1).reduce((s, v) => s + v, 0)), top = Math.max(1, ...us.map(Math.abs), ...sums.map(Math.abs)) * 1.15;
        P.xmin = -0.5; P.xmax = n + 0.5; P.ymin = -top; P.ymax = top; P.clear(); const ctx = P.ctx; us.forEach((u, i) => { ctx.fillStyle = C.fill; ctx.fillRect(P.X(i + 0.6), Math.min(P.Y(0), P.Y(u)), P.X(i + 1.4) - P.X(i + 0.6), Math.abs(P.Y(u) - P.Y(0))); });
        P.line(-0.5, 0, n + 0.5, 0, C.axis, 1.5); ctx.strokeStyle = C.b; ctx.lineWidth = 2.5; ctx.beginPath(); sums.forEach((s, i) => (i ? ctx.lineTo(P.X(i + 1), P.Y(s)) : ctx.moveTo(P.X(i + 1), P.Y(s)))); ctx.stroke();
        const Sinf = mode === 'gp' && Math.abs(a) < 1 ? u0 / (1 - a) : null; if (Sinf !== null) P.line(0, Sinf, n + 0.5, Sinf, C.c, 1.5, [5, 4]);
        setRead(S.read, `<p>Bars: terms $u_n$. Red line: partial sums $S_n$.</p><p>$u_{${n}}=${f3(us[n - 1])}$, $S_{${n}}=${f3(sums[n - 1])}$</p><p class="hl">${mode === 'ap' ? `$S_n=\\frac n2(2a+(n-1)d)$` : Sinf !== null ? `$|r|\\lt1$: $S_\\infty=\\frac{a}{1-r}=${f3(Sinf)}$ (dashed)` : 'No sum to infinity: $|r|\\ge1$'}</p>`); }
    }
    const niceStep = r => { const s = r / 6, p = 10 ** Math.floor(Math.log10(s)), q = s / p; return (q < 1.5 ? 1 : q < 3.5 ? 2 : q < 7.5 ? 5 : 10) * p; };
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- reciprocal and inverse trig graphs ---------- */
SIMS.m3_rtrig = {
  title: 'Reciprocal & inverse trigonometric functions', desc: 'sec, cosec, cot with their asymptotes, and arcsin, arccos, arctan as reflections of the restricted sin, cos, tan.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    let fn = 'sec', parent = true;
    select(S.ctrls, 'Function', [['sec', 'sec x'], ['cosec', 'cosec x'], ['cot', 'cot x'], ['asin', 'arcsin x'], ['acos', 'arccos x'], ['atan', 'arctan x']], v => { fn = v; draw(); });
    check(S.ctrls, 'Show the parent function', parent, v => { parent = v; draw(); });
    const DATA = { sec: [x => 1 / Math.cos(x), Math.cos, 'y\\le-1\\text{ or }y\\ge1', 'x\\ne\\frac\\pi2+n\\pi'], cosec: [x => 1 / Math.sin(x), Math.sin, 'y\\le-1\\text{ or }y\\ge1', 'x\\ne n\\pi'], cot: [x => Math.cos(x) / Math.sin(x), Math.tan, '\\mathbb R', 'x\\ne n\\pi'],
      asin: [Math.asin, Math.sin, '-\\frac\\pi2\\le y\\le\\frac\\pi2', '-1\\le x\\le1', -Math.PI / 2, Math.PI / 2], acos: [Math.acos, Math.cos, '0\\le y\\le\\pi', '-1\\le x\\le1', 0, Math.PI], atan: [Math.atan, Math.tan, '-\\frac\\pi2\\lt y\\lt\\frac\\pi2', '\\mathbb R', -Math.PI / 2 + 0.01, Math.PI / 2 - 0.01] };
    function draw() {
      const C = COL(), [f, g, range, dom, lo, hi] = DATA[fn], inv = fn.startsWith('a'); P.view(0, 0, inv ? 4 : 7); P.clear(); P.grid(1, true);
      if (inv) { P.curve(x => x, C.grid, 1); if (parent) P.curve(g, C.text, 1.5, lo, hi); P.curve(f, C.a, 3); }
      else { if (parent) P.curve(g, C.text, 1.5); const ctx = P.ctx; for (let k = -6; k <= 6; k++) { const asym = fn === 'sec' ? Math.PI / 2 + k * Math.PI : k * Math.PI; if (asym > P.xmin && asym < P.xmax) P.line(asym, P.ymin, asym, P.ymax, C.c, 1, [4, 4]); }
        const pts = []; for (let px = 0; px <= P.w; px++) pts.push(P.ix(px)); ctx.strokeStyle = C.a; ctx.lineWidth = 3; ctx.beginPath(); let pen = false;
        for (const x of pts) { const y = f(x); if (!isFinite(y) || Math.abs(y) > 40) { pen = false; continue; } if (pen) ctx.lineTo(P.X(x), P.Y(y)); else ctx.moveTo(P.X(x), P.Y(y)); pen = true; } ctx.stroke(); }
      setRead(S.read, `<p>Domain: $${dom}$<br>Range: $${range}$</p><p class="muted">${inv ? 'The parent is restricted to a one-to-one section first; the inverse is its reflection in $y=x$.' : 'Asymptotes (dashed) occur where the parent function is zero.'}</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- R cos(θ − α) ---------- */
SIMS.m3_rform = {
  title: 'a cos θ + b sin θ = R cos(θ − α)', desc: 'The sum of a cosine and a sine wave of the same period is a single wave. Change a and b and watch R and α.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let a = 3, b = 4, parts = true;
    slider(S.ctrls, 'a', -6, 6, 0.5, a, v => { a = v; draw(); }); slider(S.ctrls, 'b', -6, 6, 0.5, b, v => { b = v; draw(); }); check(S.ctrls, 'Show a cos θ and b sin θ', parts, v => { parts = v; draw(); });
    function draw() {
      const C = COL(), R = Math.hypot(a, b), al = Math.atan2(b, a); P.xmin = -0.3; P.xmax = 2 * Math.PI + 0.3; P.ymin = -8; P.ymax = 8; P.clear(); P.grid(1, false);
      if (parts) { P.curve(t => a * Math.cos(t), C.text, 1.2); P.curve(t => b * Math.sin(t), C.grid, 1.2); }
      P.curve(t => a * Math.cos(t) + b * Math.sin(t), C.a, 3); P.curve(t => R * Math.cos(t - al), C.b, 1.5); P.dot(((al % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), R, C.c, 6);
      setRead(S.read, `<p>$${f3(a)}\\cos\\theta${b < 0 ? '-' : '+'}${f3(Math.abs(b))}\\sin\\theta$</p><p class="hl">$=R\\cos(\\theta-\\alpha)$ with $R=\\sqrt{a^2+b^2}=${f3(R)}$, $\\alpha=${f3(al)}$ rad $=${f3(al * 180 / Math.PI)}^\\circ$</p><p>Maximum $R=${f3(R)}$ at $\\theta=\\alpha$ (orange dot); minimum $-R$.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- iteration and Newton–Raphson ---------- */
SIMS.m3_iter = {
  title: 'Iteration: staircases, cobwebs & Newton–Raphson', desc: 'Fixed-point iteration xₙ₊₁ = g(xₙ) converges when |g′| < 1 near the root. Newton–Raphson follows tangents to the axis.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.3);
    const G = { a: ['∛(5 − x)', x => Math.cbrt(5 - x), x => x ** 3 + x - 5], b: ['(x³ + 1)/4', x => (x ** 3 + 1) / 4, x => x ** 3 - 4 * x + 1], c: ['√(x + 3)', x => Math.sqrt(x + 3), x => x * x - x - 3], d: ['2 − ln x', x => 2 - Math.log(x), x => x + Math.log(x) - 2], e: ['x³ − 2 (diverges)', x => x ** 3 - 2, x => x ** 3 - x - 2] };
    let key = 'a', x0 = 1, mode = 'fp', steps = 6;
    select(S.ctrls, 'Equation / g(x)', Object.entries(G).map(([k, v]) => [k, v[0]]), v => { key = v; draw(); });
    select(S.ctrls, 'Method', [['fp', 'Fixed-point iteration'], ['nr', 'Newton–Raphson on f(x) = 0']], v => { mode = v; draw(); });
    slider(S.ctrls, 'x₀', -2, 4, 0.05, x0, v => { x0 = v; draw(); }); slider(S.ctrls, 'steps', 1, 12, 1, steps, v => { steps = v; draw(); }, v => v);
    function draw() {
      const C = COL(), [name, g, f] = G[key]; P.view(1.5, 1, 3.2); P.clear(); P.grid(1, true); const xs = [x0];
      if (mode === 'fp') { P.curve(x => x, C.grid, 1.5); P.curve(g, C.a, 2.5); let x = x0; for (let i = 0; i < steps; i++) { const y = g(x); if (!isFinite(y) || Math.abs(y) > 50) break; P.line(x, i ? x : 0, x, y, C.b, 1.3); P.line(x, y, y, y, C.b, 1.3); x = y; xs.push(x); } }
      else { P.curve(f, C.a, 2.5); let x = x0; for (let i = 0; i < steps; i++) { const d = dnum(f, x); if (!isFinite(d) || Math.abs(d) < 1e-9) break; const nx = x - f(x) / d; P.line(x, 0, x, f(x), C.text, 1, [3, 3]); P.line(x, f(x), nx, 0, C.b, 1.5); x = nx; xs.push(x); if (!isFinite(x) || Math.abs(x) > 50) break; } }
      xs.forEach((x, i) => isFinite(x) && P.dot(x, 0, i === xs.length - 1 ? C.c : C.b, 4));
      const gp = dnum(g, xs[xs.length - 1]);
      setRead(S.read, `<p>${mode === 'fp' ? `$x_{n+1}=${name.replace(' (diverges)', '').replace('∛', '\\sqrt[3]').replace('√', '\\sqrt').replace('³', '^3')}$` : `Newton–Raphson on $f(x)=0$`}</p><p>${xs.slice(0, 9).map((x, i) => `$x_{${i}}=${isFinite(x) ? x.toFixed(5) : '—'}$`).join('<br>')}</p>${mode === 'fp' ? `<p class="hl">$|g'(x)|\\approx${f3(Math.abs(gp))}$ near the last value: ${Math.abs(gp) < 1 ? 'converges' : 'diverges'}${gp < 0 ? ' (cobweb)' : ' (staircase)'}.</p>` : '<p class="hl">Each tangent meets the axis at the next estimate: very fast convergence near a root.</p>'}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};

/* ---------- trapezium rule ---------- */
SIMS.m3_trap = {
  title: 'The trapezium rule', desc: 'Trapezia under a curve: more strips, smaller error. Convex curves are overestimated, concave curves underestimated.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.4);
    const FS = { e: ['eˣ', Math.exp, 0, 2, Math.E ** 2 - 1], s: ['√x', Math.sqrt, 0, 4, 16 / 3], q: ['x²', x => x * x, 0, 3, 9], g: ['e^(−x²)', x => Math.exp(-x * x), 0, 2, 0.882081390762422], l: ['ln x', Math.log, 1, 4, 4 * Math.log(4) - 3] };
    let key = 'e', n = 4;
    select(S.ctrls, 'f(x)', Object.entries(FS).map(([k, v]) => [k, v[0]]), v => { key = v; draw(); }); slider(S.ctrls, 'strips n', 1, 40, 1, n, v => { n = v; draw(); }, v => v);
    function draw() {
      const C = COL(), [name, f, a, b, ex] = FS[key], h = (b - a) / n; P.xmin = a - (b - a) * 0.1; P.xmax = b + (b - a) * 0.1; const top = Math.max(f(a), f(b), f((a + b) / 2)) * 1.2; P.ymin = -top * 0.1; P.ymax = top; P.clear(); P.grid(1, true);
      const ctx = P.ctx; let T_ = 0; for (let i = 0; i < n; i++) { const x1 = a + i * h, x2 = x1 + h, y1 = f(x1), y2 = f(x2); T_ += h * (y1 + y2) / 2; ctx.fillStyle = C.fill; ctx.beginPath(); ctx.moveTo(P.X(x1), P.Y(0)); ctx.lineTo(P.X(x1), P.Y(y1)); ctx.lineTo(P.X(x2), P.Y(y2)); ctx.lineTo(P.X(x2), P.Y(0)); ctx.fill(); P.line(x1, y1, x2, y2, C.b, 1.5); P.line(x1, 0, x1, y1, C.grid, 1); }
      P.curve(f, C.a, 3, a, b);
      setRead(S.read, `<p>$\\displaystyle\\int_{${a}}^{${b}}${name.replace('eˣ', 'e^x').replace('√x', '\\sqrt x').replace('x²', 'x^2').replace('e^(−x²)', 'e^{-x^2}')}\\,dx$, $h=${f3(h)}$</p><p class="hl">Trapezium estimate $${T_.toFixed(5)}$<br>Exact $${ex.toFixed(5)}$</p><p>Error $${(T_ - ex).toFixed(5)}$ (${T_ > ex ? 'overestimate' : 'underestimate'}) — $${f3(Math.abs(T_ - ex) / ex * 100)}\\%$</p><p class="muted">Doubling n roughly quarters the error.</p>`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
