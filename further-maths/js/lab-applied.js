// BCS Academy Lab — applied tools: distribution calculator, data & correlation, suvat solver, forces.
'use strict';

const r4 = x => (Math.abs(x) < 5e-5 ? '0.0000' : x.toFixed(4));
const nums = s => s.split(/[\s,;]+/).filter(Boolean).map(evalExpr);

/* ---------------- Distribution calculator ---------------- */
LAB.dist = {
  title: 'Distribution calculator', icon: 'P(X)', area: 'stats', desc: 'Binomial, Poisson, geometric, normal, t and χ²: P(X = x), P(X ≤ x), P(a ≤ X ≤ b) and inverse values — the numbers in the CCEA tables, to 4 d.p.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${LX.sel('dd', 'Distribution', [['bin', 'Binomial B(n, p)'], ['poi', 'Poisson Po(λ)'], ['geo', 'Geometric Geo(p)'], ['nor', 'Normal N(μ, σ²)'], ['t', 't (ν d.f.)'], ['chi', 'χ² (ν d.f.)']], 'bin')}</div>
      <div class="lab-row" id="dpar"></div>
      <div class="lab-row">${LX.sel('dq', 'Find', [['le', 'P(X ≤ x)'], ['eq', 'P(X = x)'], ['ge', 'P(X ≥ x)'], ['bt', 'P(a ≤ X ≤ b)'], ['inv', 'x such that P(X ≤ x) = p']], 'le')}${field('x (or a)', '3', 'id="dx" size="6"')}${field('b / p', '6', 'id="db" size="6"')}<button class="btn small" data-go>Calculate</button></div>`, { aspect: 1.6 });
    const PARS = { bin: [['n', 10], ['p', 0.3]], poi: [['λ', 2.5]], geo: [['p', 0.2]], nor: [['μ', 50], ['σ', 8]], t: [['ν', 10]], chi: [['ν', 4]] };
    const par = () => { const d = U.v('dd'); el.querySelector('#dpar').innerHTML = PARS[d].map(([k, v], i) => field(k, v, `id="dp${i}" size="6"`)).join(''); LX.bind(el, go); };
    let st = null;
    function model() {
      const d = U.v('dd'), p0 = U.n('dp0'), p1 = PARS[d][1] ? U.n('dp1') : 0;
      if (d === 'bin') return { disc: true, lo: 0, hi: p0, pmf: x => ST.binomPMF(p0, p1, x), cdf: x => ST.binomCDF(p0, p1, x), name: `B(${p0},\\ ${p1})`, mean: p0 * p1, v: p0 * p1 * (1 - p1) };
      if (d === 'poi') return { disc: true, lo: 0, hi: Math.ceil(p0 + 6 * Math.sqrt(p0) + 5), pmf: x => ST.poisPMF(p0, x), cdf: x => ST.poisCDF(p0, x), name: `\\text{Po}(${p0})`, mean: p0, v: p0 };
      if (d === 'geo') return { disc: true, lo: 1, hi: Math.ceil(Math.log(1e-4) / Math.log(1 - p0)) + 1, pmf: x => ST.geoPMF(p0, x), cdf: x => ST.geoCDF(p0, x), name: `\\text{Geo}(${p0})`, mean: 1 / p0, v: (1 - p0) / p0 ** 2 };
      if (d === 'nor') return { lo: p0 - 4 * p1, hi: p0 + 4 * p1, pdf: x => ST.phi((x - p0) / p1) / p1, cdf: x => ST.normCDF(x, p0, p1), inv: q => ST.invNorm(q, p0, p1), name: `N(${p0},\\ ${p1}^2)`, mean: p0, v: p1 * p1 };
      if (d === 't') return { lo: -5, hi: 5, pdf: x => Math.exp(ST.lgamma((p0 + 1) / 2) - ST.lgamma(p0 / 2)) / Math.sqrt(p0 * Math.PI) * (1 + x * x / p0) ** (-(p0 + 1) / 2), cdf: x => ST.tCDF(x, p0), inv: q => ST.invT(q, p0), name: `t_{${p0}}`, mean: 0, v: p0 > 2 ? p0 / (p0 - 2) : NaN };
      return { lo: 0, hi: p0 + 5 * Math.sqrt(2 * p0) + 2, pdf: x => (x <= 0 ? 0 : Math.exp((p0 / 2 - 1) * Math.log(x) - x / 2 - (p0 / 2) * Math.log(2) - ST.lgamma(p0 / 2))), cdf: x => ST.chi2CDF(x, p0), inv: q => ST.invChi2(q, p0), name: `\\chi^2_{${p0}}`, mean: p0, v: 2 * p0 };
    }
    function go() {
      try {
        const M = model(), q = U.v('dq'), x = U.n('dx'), b = U.n('db'); let res, lab, shade;
        if (q === 'inv') { if (M.disc) throw new Error('Inverse values are for continuous distributions (normal, t, χ²). For discrete ones, read the cumulative probabilities.'); if (!(b > 0 && b < 1)) throw new Error('p must be between 0 and 1'); res = M.inv(b); lab = `P(X\\le x)=${b}\\Rightarrow x=${res.toFixed(4)}`; shade = t => t <= res; }
        else if (q === 'le') { res = M.cdf(x); lab = `P(X\\le ${x})=${r4(res)}`; shade = t => t <= x; }
        else if (q === 'eq') { if (!M.disc) throw new Error('For a continuous distribution P(X = x) = 0. Use an interval.'); res = M.pmf(x); lab = `P(X=${x})=${r4(res)}`; shade = t => t === x; }
        else if (q === 'ge') { res = M.disc ? 1 - M.cdf(x - 1) : 1 - M.cdf(x); lab = `P(X\\ge ${x})=${M.disc ? `1-P(X\\le ${x - 1})=` : ''}${r4(res)}`; shade = t => t >= x; }
        else { res = M.disc ? M.cdf(b) - M.cdf(x - 1) : M.cdf(b) - M.cdf(x); lab = `P(${x}\\le X\\le ${b})=${M.disc ? `P(X\\le ${b})-P(X\\le ${x - 1})=` : ''}${r4(res)}`; shade = t => t >= x && t <= b; }
        st = { M, shade, res };
        U.show(`<p>$X\\sim ${M.name}$: mean $${num(M.mean, 5)}$, variance $${isFinite(M.v) ? num(M.v, 5) : '\\text{undefined}'}$</p><p class="hl">$${lab}$</p>${M.disc ? '<p class="muted small">Discrete: $P(X\\ge x)=1-P(X\\le x-1)$ and $P(X\\lt x)=P(X\\le x-1)$.</p>' : '<p class="muted small">Continuous: $P(X=x)=0$, so $\\le$ and $\\lt$ give the same answer. For a critical value, use the inverse with $p=1-\\alpha$ for an upper tail.</p>'}`); draw();
      } catch (e) { U.err(e); }
    }
    function draw() {
      if (!st) return; const C = COL(), P = U.P, M = st.M, ctx = P.ctx;
      if (M.disc) { const ks = []; for (let k = M.lo; k <= Math.min(M.hi, M.lo + 60); k++) ks.push(k); const top = Math.max(...ks.map(M.pmf)) * 1.2 || 1;
        P.xmin = M.lo - 1; P.xmax = ks[ks.length - 1] + 1; P.ymin = -top * 0.1; P.ymax = top; P.clear();
        ks.forEach(k => { const y = M.pmf(k); ctx.fillStyle = st.shade(k) ? C.b : C.fill; ctx.fillRect(P.X(k - 0.38), P.Y(y), P.X(k + 0.38) - P.X(k - 0.38), P.Y(0) - P.Y(y)); });
        P.line(P.xmin, 0, P.xmax, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; const step = Math.ceil(ks.length / 14); ks.forEach((k, i) => { if (i % step === 0) ctx.fillText(k, P.X(k), P.Y(0) + 14); });
      } else { let top = 0; for (let i = 0; i <= 200; i++) top = Math.max(top, M.pdf(M.lo + (M.hi - M.lo) * i / 200)); top *= 1.2;
        P.xmin = M.lo; P.xmax = M.hi; P.ymin = -top * 0.1; P.ymax = top; P.clear();
        for (let px = 0; px < P.w; px += 1) { const t = P.ix(px), y = M.pdf(t); if (st.shade(t)) { ctx.fillStyle = C.fill; ctx.fillRect(px, P.Y(y), 1, P.Y(0) - P.Y(y)); } }
        P.curve(M.pdf, C.a, 2.5); P.line(M.lo, 0, M.hi, 0, C.axis, 1.5); ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; for (let i = 0; i <= 8; i++) { const t = M.lo + (M.hi - M.lo) * i / 8; ctx.fillText(+t.toPrecision(3), P.X(t), P.Y(0) + 14); } }
    }
    el.querySelector('#dd').addEventListener('change', () => { par(); go(); });
    par(); U.P.onresize = draw; LX.bind(el, go); go();
    return () => U.P.destroy();
  },
};

/* ---------------- Data, summary statistics & correlation ---------------- */
LAB.datastat = {
  title: 'Data, summary statistics & correlation', icon: 'x̄, r', area: 'stats', desc: 'Paste a list of values (with optional frequencies) for mean, median, quartiles, variance and SD (both divisors) and outliers — or paired data for the PMCC, S_xx, S_xy and the regression line.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('x values', '12, 15, 9, 20, 14, 18, 11, 13, 41', 'id="sx" class="wide"')}</div>
      <div class="lab-row">${field('y values or frequencies (optional)', '', 'id="sy" class="wide"')}</div>
      <div class="lab-row">${LX.sel('sm', 'Second list is', [['f', 'frequencies of x'], ['y', 'paired y values']], 'y')}<button class="btn small" data-go>Analyse</button></div>`, { aspect: 1.4 });
    let st = null;
    function go() {
      try {
        const x = nums(U.v('sx')); if (x.length < 2 || x.some(v => !isFinite(v))) throw new Error('Enter at least two numbers for x.');
        const yS = U.v('sy').trim(), mode = U.v('sm'), y = yS ? nums(yS) : null; if (y && y.length !== x.length) throw new Error('The second list must have the same length as x.');
        if (y && mode === 'y') {
          const r = ST.pmcc(x, y), { a, b } = ST.regress(x, y);
          st = { x, y, a, b, mode: 'pair' };
          U.show(`<p>$n=${x.length}$, $\\sum x=${num(ST.sum(x), 6)}$, $\\sum y=${num(ST.sum(y), 6)}$, $\\sum x^2=${num(ST.sum(x.map(v => v * v)), 6)}$, $\\sum y^2=${num(ST.sum(y.map(v => v * v)), 6)}$, $\\sum xy=${num(ST.sum(x.map((v, i) => v * y[i])), 6)}$</p>
            <p>$S_{xx}=${num(ST.Sxx(x), 6)}$, $S_{yy}=${num(ST.Sxx(y), 6)}$, $S_{xy}=${num(ST.Sxy(x, y), 6)}$</p>
            <p class="hl">$r=${r.toFixed(4)}$<br>Regression line of $y$ on $x$: $y=${num(a, 5)}${b < 0 ? '-' : '+'}${num(Math.abs(b), 5)}x$</p><p class="muted small">Use the line only for predictions within the range of $x$ (${num(Math.min(...x))} to ${num(Math.max(...x))}): extrapolation is unreliable.</p>`);
        } else {
          const f = y && mode === 'f' ? y : x.map(() => 1), all = x.flatMap((v, i) => Array(Math.max(0, Math.round(f[i]))).fill(v)), n = all.length;
          const m = ST.mean(all), q1 = ST.quantile(all, 0.25), q2 = ST.median(all), q3 = ST.quantile(all, 0.75), iqr = q3 - q1, vP = ST.varP(all), vS = ST.varS(all), lo = q1 - 1.5 * iqr, hi = q3 + 1.5 * iqr, out = [...new Set(all.filter(v => v < lo || v > hi))];
          st = { all, five: [Math.min(...all), q1, q2, q3, Math.max(...all)], out, mode: 'one' };
          U.show(`<p>$n=${n}$, $\\sum x=${num(ST.sum(all), 6)}$, $\\sum x^2=${num(ST.sum(all.map(v => v * v)), 6)}$</p><p class="hl">Mean $${num(m, 6)}$ · median $${num(q2, 6)}$<br>$\\sigma^2=${num(vP, 6)}$, $\\sigma=${num(Math.sqrt(vP), 6)}$ (divisor $n$)<br>$s^2=${num(vS, 6)}$, $s=${num(Math.sqrt(vS), 6)}$ (divisor $n-1$)</p>
            <p>$Q_1=${num(q1, 6)}$, $Q_3=${num(q3, 6)}$, IQR $=${num(iqr, 6)}$ (quartiles by the $(n+1)/4$ position rule; textbooks vary slightly).</p><p>Outlier fences ($1.5\\times$IQR): $${num(lo, 6)}$ and $${num(hi, 6)}$ — ${out.length ? `outliers: $${out.join(',\\ ')}$` : 'no outliers'}.</p>`);
        }
        draw();
      } catch (e) { U.err(e); }
    }
    function draw() {
      if (!st) return; const C = COL(), P = U.P;
      if (st.mode === 'pair') { const xa = Math.min(...st.x), xb = Math.max(...st.x), ya = Math.min(...st.y), yb = Math.max(...st.y), px = (xb - xa) * 0.15 || 1, py = (yb - ya) * 0.15 || 1;
        P.xmin = xa - px; P.xmax = xb + px; P.ymin = ya - py; P.ymax = yb + py; P.clear(); P.curve(t => st.a + st.b * t, C.c, 2); st.x.forEach((v, i) => P.dot(v, st.y[i], C.a, 5));
        P.ctx.fillStyle = C.text; P.ctx.font = '11px system-ui'; P.ctx.fillText(`x: ${num(xa)} to ${num(xb)}`, 8, P.h - 8); }
      else { const [a, q1, m, q3, b] = st.five, pad = (b - a) * 0.1 || 1; P.xmin = a - pad; P.xmax = b + pad; P.ymin = -1; P.ymax = 1; P.clear(); const ctx = P.ctx, Y = P.Y(0);
        ctx.strokeStyle = C.fg; ctx.lineWidth = 2; const L = (x1, x2, y) => { ctx.beginPath(); ctx.moveTo(P.X(x1), y); ctx.lineTo(P.X(x2), y); ctx.stroke(); };
        const lw = Math.min(...st.all.filter(v => !st.out.includes(v))), hw = Math.max(...st.all.filter(v => !st.out.includes(v)));
        L(lw, q1, Y); L(q3, hw, Y); ctx.fillStyle = C.fill; ctx.fillRect(P.X(q1), Y - 30, P.X(q3) - P.X(q1), 60); ctx.strokeRect(P.X(q1), Y - 30, P.X(q3) - P.X(q1), 60);
        ctx.strokeStyle = C.b; ctx.beginPath(); ctx.moveTo(P.X(m), Y - 30); ctx.lineTo(P.X(m), Y + 30); ctx.stroke(); st.out.forEach(o => P.dot(o, 0, C.b, 5));
        ctx.fillStyle = C.text; ctx.font = '11px system-ui'; ctx.textAlign = 'center'; [lw, q1, m, q3, hw].forEach(v => ctx.fillText(num(v, 4), P.X(v), Y + 48)); }
    }
    U.P.onresize = draw; LX.bind(el, go); go();
    return () => U.P.destroy();
  },
};

/* ---------------- suvat solver ---------------- */
LAB.suvat = {
  title: 'suvat solver', icon: 'suvat', area: 'mech', desc: 'Enter any three of s, u, v, a, t (constant acceleration) and get the other two, with the equation used — including both solutions when there are two.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${['s', 'u', 'v', 'a', 't'].map((k, i) => field(k, ['', '4', '', '0.5', '12'][i], `id="k${k}" size="5" placeholder="?"`)).join('')}<button class="btn small" data-go>Solve</button></div><p class="muted small">Leave the two unknowns blank. Units: m, m s⁻¹, m s⁻², s.</p>`, { graph: true, aspect: 1.6 });
    let st = null;
    function go() {
      try {
        const K = {}; for (const k of 'suvat') { const s = U.v('k' + k).trim(); if (s) { const x = evalExpr(s); if (!isFinite(x)) throw new Error(`"${s}" is not a number`); K[k] = x; } }
        const known = Object.keys(K); if (known.length !== 3) throw new Error(`Enter exactly three values (you have ${known.length}).`);
        const sols = solveSuvat(K); if (!sols.length) throw new Error('No real solution with these values (check signs: e.g. v² = u² + 2as must be non-negative).');
        st = sols[0]; U.show(sols.map((S, i) => `<p class="hl">${sols.length > 1 ? `Solution ${i + 1}: ` : ''}$s=${num(S.s, 5)}$, $u=${num(S.u, 5)}$, $v=${num(S.v, 5)}$, $a=${num(S.a, 5)}$, $t=${num(S.t, 5)}$</p><p class="muted small">${S.how}</p>`).join('')); draw();
      } catch (e) { U.err(e); }
    }
    function draw() { if (!st) return; const C = COL(), P = U.P, T = Math.max(st.t, 0.1), vmax = Math.max(Math.abs(st.u), Math.abs(st.v), 1);
      P.xmin = -T * 0.08; P.xmax = T * 1.1; P.ymin = Math.min(0, st.u, st.v) * 1.3 - 0.12 * vmax; P.ymax = Math.max(0, st.u, st.v) * 1.3 + 0.12 * vmax; P.clear(); P.grid(niceGrid(T), true, 't', 'v');
      const ctx = P.ctx; ctx.fillStyle = C.fill; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); ctx.lineTo(P.X(0), P.Y(st.u)); ctx.lineTo(P.X(T), P.Y(st.v)); ctx.lineTo(P.X(T), P.Y(0)); ctx.fill(); P.line(0, st.u, T, st.v, C.a, 3); }
    const niceGrid = T => [0.5, 1, 2, 5, 10, 20, 50, 100].find(s => T / s <= 12) || 200;
    U.P.onresize = draw; LX.bind(el, go); go();
    return () => U.P.destroy();
  },
};
// all consistent (s,u,v,a,t) given three of them
function solveSuvat(K) {
  const out = [], push = (S, how) => { if (['s', 'u', 'v', 'a', 't'].every(k => isFinite(S[k])) && S.t >= -1e-12) out.push({ ...S, how }); };
  const { s, u, v, a, t } = K, has = k => K[k] !== undefined;
  if (has('u') && has('a') && has('t')) push({ u, a, t, v: u + a * t, s: u * t + a * t * t / 2 }, 'v = u + at, s = ut + ½at²');
  else if (has('v') && has('a') && has('t')) push({ v, a, t, u: v - a * t, s: v * t - a * t * t / 2 }, 'u = v − at, s = vt − ½at²');
  else if (has('u') && has('v') && has('t')) push({ u, v, t, a: (v - u) / t, s: (u + v) * t / 2 }, 'a = (v − u)/t, s = ½(u + v)t');
  else if (has('u') && has('v') && has('a')) { if (Math.abs(a) < 1e-12) throw new Error('With a = 0, u must equal v and s, t cannot both be found.'); const T = (v - u) / a; push({ u, v, a, t: T, s: (v * v - u * u) / (2 * a) }, 't = (v − u)/a, v² = u² + 2as'); }
  else if (has('u') && has('v') && has('s')) { if (Math.abs(u + v) < 1e-12) throw new Error('u + v = 0: t cannot be found from these values.'); const T = 2 * s / (u + v); push({ u, v, s, t: T, a: (v * v - u * u) / (2 * s) }, 't = 2s/(u + v), a = (v² − u²)/2s'); }
  else if (has('s') && has('t') && (has('u') || has('v') || has('a'))) {
    if (has('u')) { const A = 2 * (s - u * t) / (t * t); push({ s, t, u, a: A, v: u + A * t }, 's = ut + ½at² gives a'); }
    else if (has('v')) { const A = 2 * (v * t - s) / (t * t); push({ s, t, v, a: A, u: v - A * t }, 's = vt − ½at² gives a'); }
    else { const U0 = (s - a * t * t / 2) / t; push({ s, t, a, u: U0, v: U0 + a * t }, 's = ut + ½at² gives u'); }
  } else if (has('s') && has('a') && (has('u') || has('v'))) {
    const w = has('u') ? u : v, other2 = w * w + (has('u') ? 1 : -1) * 2 * a * s; if (other2 < -1e-12) return out;
    for (const sg of [1, -1]) { const o = sg * Math.sqrt(Math.max(0, other2)), uu = has('u') ? u : o, vv = has('u') ? o : v, T = Math.abs(a) > 1e-12 ? (vv - uu) / a : 2 * s / (uu + vv); push({ s, a, u: uu, v: vv, t: T }, 'v² = u² + 2as (both signs), then v = u + at'); if (other2 < 1e-12) break; }
  }
  return out.filter((S, i, A) => A.findIndex(Q => Math.abs(Q.t - S.t) < 1e-9 && Math.abs(Q.v - S.v) < 1e-9) === i);
}

/* ---------------- Forces: resultant & equilibrium ---------------- */
LAB.forces = {
  title: 'Forces: resultant & equilibrium', icon: 'ΣF', area: 'mech', desc: 'List forces as "magnitude@angle" (degrees anticlockwise from the x-axis) or as vectors "3i-4j". Get every component, the resultant and the force needed for equilibrium.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('forces (one per line or ; separated)', '10@0; 8@120; 6@230', 'id="ff" class="wide"')}</div><div class="lab-row">${field('mass (optional, kg)', '', 'id="fm" size="5"')}<button class="btn small" data-go>Resolve</button></div>`, { aspect: 1.2 });
    let st = null;
    const parse = str => str.split(/[;\n]+/).map(s => s.trim()).filter(Boolean).map(s => {
      const at = s.split('@'); if (at.length === 2) { const m = evalExpr(at[0]), d = evalExpr(at[1]); if (!isFinite(m) || !isFinite(d)) throw new Error(`Can't read "${s}"`); return [m * Math.cos(d * Math.PI / 180), m * Math.sin(d * Math.PI / 180), s]; }
      const t = s.replace(/\s+/g, ''), mi = /([+-]?[^ij+-]*)i/.exec(t), mj = /([+-]?[^ij+-]*)j/.exec(t); if (!mi && !mj) throw new Error(`Can't read "${s}" — use 12@30 or 3i-4j`);
      const c = m => (m ? (m[1] === '' || m[1] === '+' ? 1 : m[1] === '-' ? -1 : evalExpr(m[1])) : 0); return [c(mi), c(mj), s]; });
    function go() {
      try {
        const F = parse(U.v('ff')); if (!F.length) throw new Error('Enter at least one force.'); const X = F.reduce((s, f) => s + f[0], 0), Y = F.reduce((s, f) => s + f[1], 0), R = Math.hypot(X, Y), dir = (Math.atan2(Y, X) * 180 / Math.PI + 360) % 360;
        const ms = U.v('fm').trim(), m = ms ? evalExpr(ms) : NaN; st = { F, X, Y };
        U.show(`<table class="tbl"><tr><th>force</th><th>x-component</th><th>y-component</th></tr>${F.map(f => `<tr><td>${f[2]}</td><td>${num(f[0], 5)}</td><td>${num(f[1], 5)}</td></tr>`).join('')}<tr><td><b>total</b></td><td><b>${num(X, 5)}</b></td><td><b>${num(Y, 5)}</b></td></tr></table>
          <p class="hl">Resultant $(${num(X, 5)}\\mathbf i${Y < 0 ? '-' : '+'}${num(Math.abs(Y), 5)}\\mathbf j)$ N, magnitude $${num(R, 5)}$ N at $${num(dir, 5)}^\\circ$</p>
          <p>${R < 1e-9 ? 'The forces are in equilibrium.' : `For equilibrium add $${num(R, 5)}$ N at $${num((dir + 180) % 360, 5)}^\\circ$.`}</p>${isFinite(m) && m > 0 ? `<p>Acceleration $\\mathbf a=\\mathbf F/m$: magnitude $${num(R / m, 5)}$ m s⁻² in the direction of the resultant.</p>` : ''}`); draw();
      } catch (e) { U.err(e); }
    }
    function draw() { if (!st) return; const C = COL(), P = U.P, M = Math.max(1, ...st.F.map(f => Math.hypot(f[0], f[1])), Math.hypot(st.X, st.Y)); P.view(0, 0, M * 1.3); P.clear(); P.grid(M > 20 ? 10 : M > 8 ? 2 : 1, true);
      st.F.forEach((f, i) => P.arrow(0, 0, f[0], f[1], [C.a, C.b, C.d][i % 3], 2.5)); if (Math.hypot(st.X, st.Y) > 1e-9) { P.arrow(0, 0, st.X, st.Y, C.c, 4); P.text('R', st.X, st.Y, C.c); } P.dot(0, 0, C.fg, 5); }
    U.P.onresize = draw; LX.bind(el, go); go();
    return () => U.P.destroy();
  },
};
