// CCEA GCE Further Mathematics A2 2 Applied Mathematics — Section C Statistics, Section D Discrete and Decision Mathematics.
'use strict';

const perms = a => (a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));
const phiE = n => Array.from({ length: n }, (_, i) => i + 1).filter(k => gcdI(k, n) === 1).length; // Euler's totient
const polyMul = (A, B) => { const R = Array(A.length + B.length - 1).fill(0); A.forEach((a, i) => B.forEach((b, j) => { R[i + j] += a * b; })); return R; };
// cycle index as a list of [coefficient, {cycleLength: count}]
const ciCn = n => Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d === 0).map(d => [phiE(d) / n, { [d]: n / d }]);
const ciDn = n => [...ciCn(n).map(([c, t]) => [c / 2, t]), ...(n % 2 ? [[0.5, { 1: 1, 2: (n - 1) / 2 }]] : [[0.25, { 2: n / 2 }], [0.25, { 1: 2, 2: (n - 2) / 2 }]])];
const CI3D = { 'tetrahedron (faces or vertices)': [[1 / 12, { 1: 4 }], [8 / 12, { 1: 1, 3: 1 }], [3 / 12, { 2: 2 }]], 'cube (faces)': [[1 / 24, { 1: 6 }], [6 / 24, { 1: 2, 4: 1 }], [3 / 24, { 1: 2, 2: 2 }], [8 / 24, { 3: 2 }], [6 / 24, { 2: 3 }]],
  'cube (vertices)': [[1 / 24, { 1: 8 }], [8 / 24, { 1: 2, 3: 2 }], [9 / 24, { 2: 4 }], [6 / 24, { 4: 2 }]] };
const ciCount = (ci, k) => Math.round(ci.reduce((s, [c, t]) => s + c * Object.values(t).reduce((p, e) => p * k ** e, 1), 0));
const ciInventory = ci => { let tot = [0]; for (const [c, t] of ci) { let P = [1]; for (const [len, e] of Object.entries(t)) for (let i = 0; i < e; i++) { const f = Array(+len + 1).fill(0); f[0] = 1; f[+len] += 1; P = polyMul(P, f); } P.forEach((v, i) => { tot[i] = (tot[i] || 0) + c * v; }); } return tot.map(Math.round); }; // coefficients of b^r (w = 1)
const ciTex = ci => ci.map(([c, t]) => `${nice(c)}${Object.entries(t).map(([l, e]) => `x_{${l}}${e > 1 ? `^{${e}}` : ''}`).join('')}`).join('+').replace(/\+-/g, '-');

topic({
  id: '_f4b', title: 'FM A2 2 statistics & decision', points: [
    /* ======================= SECTION C: STATISTICS ======================= */
    {
      id: 'f4_lin', title: 'Linear combinations of random variables', sims: [],
      notes: T`<p>For <b>independent</b> random variables $X$ and $Y$: $$E(aX+bY)=aE(X)+bE(Y),\qquad\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y).$$</p>
<ul><li>The expectation rule holds even without independence; the variance rule needs it.</li><li>Variances <b>add</b> even for a difference: $\operatorname{Var}(X-Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)$.</li><li>$X_1+X_2$ (two independent observations) has variance $2\sigma^2$; $2X$ (one observation doubled) has variance $4\sigma^2$.</li></ul>`,
      drills: [
        () => { const ex = ri(-5, 10), ey = ri(-5, 10), vx = ri(1, 9), vy = ri(1, 9), a = rnz(-3, 4), b = rnz(-3, 4); return { q: T`$X$ and $Y$ are independent with $E(X)=${ex}$, $\operatorname{Var}(X)=${vx}$, $E(Y)=${ey}$, $\operatorname{Var}(Y)=${vy}$. Find $E(${poly([[a, 'X'], [b, 'Y']])})$ and $\operatorname{Var}(${poly([[a, 'X'], [b, 'Y']])})$.`, fields: [{ label: 'E', ans: a * ex + b * ey }, { label: 'Var', ans: a * a * vx + b * b * vy }],
          sol: T`$E=${a}(${ex})${sgn(b)}(${ey})=${a * ex + b * ey}$; $\operatorname{Var}=${a * a}(${vx})+${b * b}(${vy})=${a * a * vx + b * b * vy}$ — squares, so the variances add.` }; },
        () => { const s2 = ri(2, 9), n = ri(2, 5), sum = Math.random() < 0.5; return { q: T`$X$ has variance $${s2}$. Find the variance of ${sum ? `$X_1+\\dots+X_{${n}}$, the sum of $${n}$ independent observations of $X$` : `$${n}X$, one observation multiplied by $${n}$`}.`, fields: [{ label: 'variance', ans: sum ? n * s2 : n * n * s2 }],
          sol: T`${sum ? `Independent observations: variances add: $${n}\\times${s2}=${n * s2}$.` : `A multiple: $${n}^2\\times${s2}=${n * n * s2}$.`} (Compare: $${n}X$ is more variable than the sum, because one observation's error is multiplied.)` }; },
        () => { const vx = ri(1, 9), vy = ri(1, 9); const opts = [`${vx + vy}`, `${Math.abs(vx - vy)}`, `${vx * vy}`, `${vx + vy + 2}`]; return { q: T`$X$ and $Y$ are independent with variances $${vx}$ and $${vy}$. What is $\operatorname{Var}(X-Y)$?`, mc: { options: [...new Set(opts)], correct: 0 }, sol: T`$\operatorname{Var}(X-Y)=\operatorname{Var}(X)+(-1)^2\operatorname{Var}(Y)=${vx + vy}$.` }; },
      ],
    },
    {
      id: 'f4_lnorm', title: 'Combinations of independent normal variables', sims: [],
      notes: T`<ul><li>If $X\sim N(\mu_X,\sigma_X^2)$ and $Y\sim N(\mu_Y,\sigma_Y^2)$ are independent, then $aX+bY\sim N(a\mu_X+b\mu_Y,\ a^2\sigma_X^2+b^2\sigma_Y^2)$ — still normal.</li>
<li>The total of $n$ independent observations: $\sum X_i\sim N(n\mu,n\sigma^2)$. One observation multiplied: $nX\sim N(n\mu,n^2\sigma^2)$.</li><li>"Is $X$ bigger than $Y$?" — find $P(X-Y\gt0)$.</li></ul>`,
      drills: [
        () => { const mx = ri(20, 60), my = ri(20, 60), sx = ri(2, 6), sy = ri(2, 6), c = mx + my + ri(-8, 8); const s = Math.sqrt(sx * sx + sy * sy), p = 1 - ST.normCDF(c, mx + my, s); return { q: T`$X\sim N(${mx},${sx}^2)$ and $Y\sim N(${my},${sy}^2)$ are independent. Find $P(X+Y\gt${c})$.`, fields: [{ label: 'P', ans: p }],
          sol: T`$X+Y\sim N(${mx + my},\ ${sx * sx + sy * sy})$. $P=1-\Phi\left(\frac{${c}-${mx + my}}{\sqrt{${sx * sx + sy * sy}}}\right)=1-\Phi(${num((c - mx - my) / s, 4)})=${num(p, 4)}$.` }; },
        () => { const mx = ri(50, 80), my = mx + ri(-6, 6), sx = ri(3, 8), sy = ri(3, 8); const s = Math.sqrt(sx * sx + sy * sy), p = 1 - ST.normCDF(0, mx - my, s); return { q: T`The times of two runners are independent, $A\sim N(${mx},${sx}^2)$ and $B\sim N(${my},${sy}^2)$ seconds. Find the probability that $A$ takes longer than $B$.`, fields: [{ label: 'P', ans: p }],
          sol: T`$A-B\sim N(${mx - my},\ ${sx * sx + sy * sy})$. $P(A-B\gt0)=1-\Phi\left(\frac{0-${par(mx - my)}}{${num(s, 4)}}\right)=${num(p, 4)}$.` }; },
        () => { const mu = ri(40, 60), sd = ri(2, 5), n = ri(3, 8), T0 = n * mu + ri(-10, 10); const p = ST.normCDF(T0, n * mu, sd * Math.sqrt(n)); return { q: T`The masses of apples are independent, each $N(${mu},${sd}^2)$ grams. Find the probability that $${n}$ apples have a total mass less than $${T0}$ g.`, fields: [{ label: 'P', ans: p }],
          sol: T`Total $\sim N(${n * mu},\ ${n}\times${sd * sd})=N(${n * mu},${n * sd * sd})$. $P=\Phi\left(\frac{${T0}-${n * mu}}{\sqrt{${n * sd * sd}}}\right)=${num(p, 4)}$.` }; },
        () => { const mu = ri(10, 30), sd = ri(1, 4), k = ri(2, 5), c = k * mu + ri(-6, 6); const p = 1 - ST.normCDF(c, k * mu, k * sd); return { q: T`$X\sim N(${mu},${sd}^2)$. Find $P(${k}X\gt${c})$.`, fields: [{ label: 'P', ans: p }], sol: T`$${k}X\sim N(${k * mu},\ ${k}^2\times${sd * sd})=N(${k * mu},${k * k * sd * sd})$. $P=1-\Phi\left(\frac{${c}-${k * mu}}{${k * sd}}\right)=${num(p, 4)}$.` }; },
      ],
    },
    {
      id: 'f4_clt', title: 'The central limit theorem', sims: ['f4_clt'],
      notes: T`<p><b>Central limit theorem</b>: for a random sample of size $n$ from <b>any</b> distribution with mean $\mu$ and variance $\sigma^2$, when $n$ is large ($n\ge30$), $$\bar X\approx N\left(\mu,\frac{\sigma^2}n\right).$$</p>
<ul><li>If the population is itself normal, $\bar X$ is exactly normal for every $n$.</li><li>The theorem lets you find probabilities about a mean even when the parent distribution is skewed, discrete or unknown.</li></ul>`,
      drills: [
        () => { const mu = ri(20, 80), sd = ri(4, 15), n = pick([30, 36, 40, 50, 64, 100]), c = +(mu + pick([-1, 1]) * ri(5, 25) / 10 * sd / Math.sqrt(n)).toFixed(1); const p = 1 - ST.normCDF(c, mu, sd / Math.sqrt(n)); return { q: T`A population has mean $${mu}$ and standard deviation $${sd}$ (distribution unknown). Find, approximately, the probability that the mean of a random sample of $${n}$ exceeds $${c}$.`, fields: [{ label: 'P', ans: p }],
          sol: T`By the CLT, $\bar X\approx N\left(${mu},\frac{${sd}^2}{${n}}\right)$, s.e. $${num(sd / Math.sqrt(n), 4)}$. $P=1-\Phi\left(\frac{${c}-${mu}}{${num(sd / Math.sqrt(n), 4)}}\right)=${num(p, 4)}$.` }; },
        () => { const l = pick([2, 3, 4, 5]), n = pick([40, 50, 60]), c = +(l + pick([0.2, 0.3, -0.25])).toFixed(2); const p = ST.normCDF(c, l, Math.sqrt(l / n)); return { q: T`The number of calls per minute follows $\text{Po}(${l})$. Find the approximate probability that the mean number per minute over $${n}$ minutes is less than $${c}$.`, fields: [{ label: 'P', ans: p }],
          sol: T`Poisson: mean $=$ variance $=${l}$. CLT: $\bar X\approx N\left(${l},\frac{${l}}{${n}}\right)$. $P=\Phi\left(\frac{${c}-${l}}{\sqrt{${l}/${n}}}\right)=${num(p, 4)}$.` }; },
        () => { const opts = ['The sample size is large (n ≥ 30), so the sample mean is approximately normal whatever the population', 'The population must be normal for the theorem to apply', 'It says the population becomes normal for large samples', 'It only applies to discrete distributions']; return { q: T`Why can the central limit theorem be used to find probabilities for the mean of $50$ observations from a skewed distribution?`, mc: { options: opts, correct: 0 }, sol: T`The CLT is about the <b>sample mean</b>: for large $n$ it is approximately normal, whatever the population's shape.` }; },
      ],
    },
    {
      id: 'f4_est', title: 'Point estimates & the standard error', sims: [],
      notes: T`<ul><li>Unbiased estimate of $\mu$: $\bar x$. Unbiased estimate of $\sigma^2$: $$s^2=\frac{\sum(x-\bar x)^2}{n-1}=\frac{\sum x^2-n\bar x^2}{n-1}.$$ Dividing by $n$ would underestimate $\sigma^2$ on average.</li>
<li>The <b>standard error</b> of the mean is $\frac\sigma{\sqrt n}$ (estimated by $\frac s{\sqrt n}$): the standard deviation of $\bar X$. It shrinks as $n$ grows.</li></ul>`,
      drills: [
        () => { const n = ri(8, 40), xs = Array.from({ length: n }, () => ri(10, 60)), Sx = ST.sum(xs), Sx2 = ST.sum(xs.map(x => x * x)); const m = Sx / n, s2 = (Sx2 - n * m * m) / (n - 1); return { q: T`A sample of $${n}$ values gives $\sum x=${Sx}$ and $\sum x^2=${Sx2}$. Find unbiased estimates of the population mean and variance.`, fields: [{ label: 'mean', ans: m }, { label: 'variance', ans: s2 }],
          sol: T`$\bar x=\frac{${Sx}}{${n}}=${num(m, 5)}$. $s^2=\frac{${Sx2}-${n}(${num(m, 5)})^2}{${n - 1}}=${num(s2, 5)}$.` }; },
        () => { const sd = ri(3, 20), n = pick([16, 25, 36, 49, 64, 100]); return { q: T`A population has standard deviation $${sd}$. Find the standard error of the mean for samples of size $${n}$.`, fields: [{ label: 's.e.', ans: sd / Math.sqrt(n) }], sol: T`$\frac{\sigma}{\sqrt n}=\frac{${sd}}{${Math.sqrt(n)}}=${num(sd / Math.sqrt(n), 4)}$.` }; },
        () => { const k = pick([4, 9, 16, 100]); return { q: T`By what factor must the sample size be multiplied to divide the standard error by $${Math.sqrt(k)}$?`, fields: [{ label: 'factor', ans: k }], sol: T`s.e. $\propto\frac1{\sqrt n}$: multiply $n$ by $${Math.sqrt(k)}^2=${k}$.` }; },
        () => { const xs = Array.from({ length: ri(5, 8) }, () => ri(2, 20)), n = xs.length, m = ST.mean(xs), s2 = ST.Sxx(xs) / (n - 1); return { q: T`Find unbiased estimates of $\mu$ and $\sigma^2$ from the sample: $${xs.join(',\\ ')}$.`, fields: [{ label: 'x̄', ans: m }, { label: 's²', ans: s2 }], sol: T`$\bar x=\frac{${ST.sum(xs)}}{${n}}=${num(m, 5)}$; $s^2=\frac{\sum(x-\bar x)^2}{${n - 1}}=\frac{${num(ST.Sxx(xs), 5)}}{${n - 1}}=${num(s2, 5)}$.` }; },
      ],
    },
    {
      id: 'f4_ci', title: 'Confidence intervals for the mean', sims: ['f4_clt'],
      notes: T`<ul><li>With known $\sigma$ (or a large sample, using $s$): a $100(1-\alpha)\%$ confidence interval for $\mu$ is $$\bar x\pm z\frac\sigma{\sqrt n}$$ with $z=1.6449$ ($90\%$), $1.96$ ($95\%$), $2.5758$ ($99\%$).</li>
<li>Meaning: if the procedure were repeated many times, $95\%$ of the intervals would contain $\mu$. A given interval either contains $\mu$ or it doesn't.</li><li>Width $=2z\frac\sigma{\sqrt n}$: to halve the width, quadruple $n$.</li></ul>`,
      drills: [
        () => { const xb = +(ri(200, 800) / 10).toFixed(1), sd = ri(2, 12), n = pick([25, 36, 40, 50, 64, 100]), c = pick([90, 95, 99]); const z = ST.zCrit((1 - c / 100) / 2), h = z * sd / Math.sqrt(n); return { q: T`A random sample of $${n}$ from a population with $\sigma=${sd}$ has mean $${xb}$. Find a $${c}\%$ confidence interval for $\mu$.`, fields: [{ label: 'lower', ans: xb - h }, { label: 'upper', ans: xb + h }],
          sol: T`$${xb}\pm${num(z, 5)}\times\frac{${sd}}{\sqrt{${n}}}=${xb}\pm${num(h, 4)}$: $(${num(xb - h, 5)},\ ${num(xb + h, 5)})$.` }; },
        () => { const sd = ri(3, 15), w = pick([1, 2, 3, 4]), c = pick([95, 99]); const z = ST.zCrit((1 - c / 100) / 2), n = Math.ceil((2 * z * sd / w) ** 2); return { q: T`$\sigma=${sd}$. Find the least sample size for the $${c}\%$ confidence interval for $\mu$ to have width at most $${w}$.`, fields: [{ label: 'n', ans: n }],
          sol: T`Width $2(${num(z, 5)})\frac{${sd}}{\sqrt n}\le${w}\Rightarrow\sqrt n\ge${num(2 * z * sd / w, 5)}\Rightarrow n\ge${num((2 * z * sd / w) ** 2, 5)}$, so $n=${n}$.` }; },
        () => { const opts = ['If many samples were taken, about 95% of such intervals would contain μ', 'There is a 95% probability that μ lies in this particular interval, which is fixed', '95% of the data lie in the interval', 'The sample mean lies in the interval with probability 0.95']; return { q: T`What does a $95\%$ confidence interval for $\mu$ mean?`, mc: { options: opts, correct: 0 }, sol: T`The <b>procedure</b> captures $\mu$ $95\%$ of the time; $\mu$ is fixed, the interval is random.` }; },
      ],
    },
    {
      id: 'f4_t1', title: 'The t-distribution & the one-sample t-test', sims: ['f4_clt'],
      notes: T`<ul><li>Use the $t$-distribution when the population is <b>normal</b>, $\sigma$ is <b>unknown</b> and the sample is <b>small</b>: $$t=\frac{\bar x-\mu_0}{s/\sqrt n}\sim t_{n-1}.$$</li>
<li>Degrees of freedom $\nu=n-1$. The $t$-distribution is like $N(0,1)$ but with heavier tails; as $\nu\to\infty$ it approaches $N(0,1)$.</li><li>Compare $|t|$ with the critical value from the $t$-table (one- or two-tailed as $H_1$ requires). A $t$-based confidence interval is $\bar x\pm t_{\nu}\frac s{\sqrt n}$.</li></ul>`,
      drills: [
        () => { const n = ri(6, 15), mu0 = ri(20, 60), s = +(ri(15, 60) / 10).toFixed(1), xb = +(mu0 + pick([-1, 1]) * ri(5, 40) / 10).toFixed(1); const t = (xb - mu0) / (s / Math.sqrt(n)); return { q: T`A sample of $${n}$ from a normal population has $\bar x=${xb}$ and $s=${s}$. Calculate the test statistic for $H_0:\mu=${mu0}$.`, fields: [{ label: 't', ans: t, tol: { abs: 0.005 } }],
          sol: T`$t=\frac{${xb}-${mu0}}{${s}/\sqrt{${n}}}=${num(t, 4)}$, with $\nu=${n - 1}$ degrees of freedom.` }; },
        () => { const n = ri(5, 20), a = pick([0.05, 0.025, 0.01]), two = Math.random() < 0.5; const cv = ST.tCrit(two ? a / 2 : a, n - 1); return { q: T`Find the critical value for a ${two ? 'two' : 'one'}-tailed $t$-test at the $${two ? a * 200 : a * 100}\%$ level with a sample of size $${n}$.`, fields: [{ label: 't crit', ans: cv, tol: { abs: 0.002 } }],
          sol: T`$\nu=${n - 1}$; ${two ? `two-tailed, so $${num(a * 100)}\\%$ in each tail` : `one tail of $${num(a * 100)}\\%$`}: $t=${cv.toFixed(3)}$.` }; },
        () => { const n = ri(6, 12), mu0 = ri(30, 50), s = +(ri(15, 50) / 10).toFixed(1), xb = +(mu0 + ri(5, 40) / 10).toFixed(1), a = 0.05; const t = (xb - mu0) / (s / Math.sqrt(n)), cv = ST.tCrit(a, n - 1); if (Math.abs(t - cv) < 0.05) return null; const opts = ['Reject H₀: evidence that μ has increased', 'Do not reject H₀: insufficient evidence that μ has increased'];
          return { q: T`A sample of $${n}$ from a normal population gives $\bar x=${xb}$, $s=${s}$. Test $H_0:\mu=${mu0}$ against $H_1:\mu\gt${mu0}$ at the $5\%$ level.`, mc: { options: opts, correct: t > cv ? 0 : 1 }, sol: T`$t=${num(t, 4)}$, $t_{${n - 1}}(5\%)=${cv.toFixed(3)}$: ${t > cv ? 'in the critical region — reject $H_0$' : 'not in the critical region — do not reject $H_0$'}.` }; },
        () => { const n = ri(6, 12), xb = +(ri(200, 600) / 10).toFixed(1), s = +(ri(10, 40) / 10).toFixed(1); const tc = ST.tCrit(0.025, n - 1), h = tc * s / Math.sqrt(n); return { q: T`A sample of $${n}$ from a normal population has $\bar x=${xb}$, $s=${s}$. Find a $95\%$ confidence interval for $\mu$.`, fields: [{ label: 'lower', ans: xb - h, tol: { abs: 0.01 } }, { label: 'upper', ans: xb + h, tol: { abs: 0.01 } }],
          sol: T`$t_{${n - 1}}(2.5\%)=${tc.toFixed(3)}$; $${xb}\pm${tc.toFixed(3)}\times\frac{${s}}{\sqrt{${n}}}=(${num(xb - h, 5)},\ ${num(xb + h, 5)})$.` }; },
      ],
    },
    {
      id: 'f4_t2', title: 'Two-sample & paired t-tests', sims: [],
      notes: T`<ul><li><b>Paired</b> data (the same subjects measured twice, or matched pairs): work with the differences $d$: $t=\dfrac{\bar d-0}{s_d/\sqrt n}$, $\nu=n-1$. Assumes the differences are normal.</li>
<li><b>Two independent samples</b> from normal populations with a common (unknown) variance: pooled estimate $$s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2},\qquad t=\frac{\bar x_1-\bar x_2}{s_p\sqrt{\frac1{n_1}+\frac1{n_2}}},\quad\nu=n_1+n_2-2.$$</li><li>Choose paired when each value in one sample is naturally linked to one in the other.</li></ul>`,
      drills: [
        () => { const n = ri(5, 8), d = Array.from({ length: n }, () => ri(-3, 6)); const db = ST.mean(d), sd = Math.sqrt(ST.Sxx(d) / (n - 1)); if (!sd || !db) return null; const t = db / (sd / Math.sqrt(n)); return { q: T`In a paired experiment the differences (after − before) are $${d.join(',\\ ')}$. Calculate the paired $t$ statistic.`, fields: [{ label: 't', ans: t, tol: { abs: 0.005 } }],
          sol: T`$\bar d=${num(db, 4)}$, $s_d=${num(sd, 4)}$; $t=\frac{${num(db, 4)}}{${num(sd, 4)}/\sqrt{${n}}}=${num(t, 4)}$ with $\nu=${n - 1}$.` }; },
        () => { const n1 = ri(5, 12), n2 = ri(5, 12), s1 = +(ri(10, 40) / 10).toFixed(1), s2 = +(ri(10, 40) / 10).toFixed(1); const sp2 = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / (n1 + n2 - 2); return { q: T`Two independent samples have $n_1=${n1}$, $s_1=${s1}$ and $n_2=${n2}$, $s_2=${s2}$. Find the pooled estimate of the common variance.`, fields: [{ label: 's_p²', ans: sp2, tol: { abs: 0.005 } }],
          sol: T`$s_p^2=\frac{${n1 - 1}(${s1})^2+${n2 - 1}(${s2})^2}{${n1 + n2 - 2}}=${num(sp2, 5)}$.` }; },
        () => { const n1 = ri(6, 10), n2 = ri(6, 10), x1 = +(ri(400, 600) / 10).toFixed(1), x2 = +(ri(400, 600) / 10).toFixed(1), sp = +(ri(15, 50) / 10).toFixed(1); const t = (x1 - x2) / (sp * Math.sqrt(1 / n1 + 1 / n2)); return { q: T`Samples of size $${n1}$ and $${n2}$ have means $${x1}$ and $${x2}$; the pooled standard deviation is $${sp}$. Find the two-sample $t$ statistic and its degrees of freedom.`, fields: [{ label: 't', ans: t, tol: { abs: 0.005 } }, { label: 'ν', ans: n1 + n2 - 2 }],
          sol: T`$t=\frac{${x1}-${x2}}{${sp}\sqrt{\frac1{${n1}}+\frac1{${n2}}}}=${num(t, 4)}$, $\nu=${n1 + n2 - 2}$.` }; },
        () => { const L = [['the reaction times of 10 drivers measured before and after drinking coffee', 'paired'], ['the heights of 12 randomly chosen boys and 15 randomly chosen girls', 'two-sample'], ['the left-hand and right-hand grip strengths of 8 people', 'paired'], ['the yields of 10 plots with fertiliser A and 10 different plots with fertiliser B', 'two-sample']]; const [c, r] = pick(L), opts = ['paired', 'two-sample'];
          return { q: T`Which $t$-test suits ${c}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r === 'paired' ? 'Each value is naturally linked to one in the other sample (the same person): a paired test on the differences.' : 'The samples are independent of each other: a two-sample test with a pooled variance.'}` }; },
      ],
    },
    {
      id: 'f4_gof', title: 'χ² goodness-of-fit tests', sims: ['f4_chi'],
      notes: T`<ul><li>$H_0$: the data come from the stated distribution. Expected frequencies $E_i=$ total × probability.</li><li>Test statistic $\displaystyle X^2=\sum\frac{(O_i-E_i)^2}{E_i}$, approximately $\chi^2_\nu$.</li>
<li>Combine classes so every $E_i\ge5$. Degrees of freedom $\nu=$ (number of classes after combining) $-1-$ (number of parameters estimated from the data).</li><li>Reject $H_0$ if $X^2$ exceeds the critical value (always an upper-tail test).</li></ul>`,
      drills: [
        () => { const N = pick([60, 120, 180]), E = N / 6, O = Array.from({ length: 5 }, () => E + ri(-8, 8)); O.push(N - O.reduce((s, v) => s + v, 0)); if (O[5] < 0) return null; const X2 = O.reduce((s, o) => s + (o - E) ** 2 / E, 0);
          return { q: T`A die is rolled $${N}$ times: ${stab([['Score', 1, 2, 3, 4, 5, 6], ['Frequency', ...O]])}Calculate $X^2$ for testing whether the die is fair.`, fields: [{ label: 'X²', ans: X2 }], sol: T`$E=${E}$ for each score. $X^2=\sum\frac{(O-${E})^2}{${E}}=${num(X2, 4)}$, with $\nu=5$.` }; },
        () => { const k = ri(4, 8), est = pick([0, 1, 2]), comb = ri(0, 2); const nu = k - comb - 1 - est; if (nu < 1) return null; return { q: T`A goodness-of-fit test starts with $${k}$ classes; $${comb}$ pair${comb === 1 ? ' is' : 's are'} combined to make each expected frequency at least $5$, and $${est}$ parameter${est === 1 ? ' is' : 's are'} estimated from the data. Find the degrees of freedom.`, fields: [{ label: 'ν', ans: nu }],
          sol: T`Classes after combining: $${k - comb}$. $\nu=${k - comb}-1-${est}=${nu}$.` }; },
        () => { const nu = ri(1, 10), a = pick([0.1, 0.05, 0.01]); return { q: T`Find the critical value of $\chi^2_{${nu}}$ at the $${a * 100}\%$ level.`, fields: [{ label: 'critical value', ans: ST.chiCrit(a, nu), tol: { abs: 0.005 } }], sol: T`From tables: $\chi^2_{${nu}}(${a * 100}\%)=${ST.chiCrit(a, nu).toFixed(3)}$.` }; },
        () => { const nu = ri(2, 6), a = 0.05, cv = ST.chiCrit(a, nu), X2 = +(cv + pick([-2.5, -1.2, 0.9, 2.4])).toFixed(2); if (X2 <= 0) return null; const opts = ['Reject H₀: the model is not a good fit', 'Do not reject H₀: the model fits adequately']; return { q: T`A goodness-of-fit test with $\nu=${nu}$ gives $X^2=${X2}$. What do you conclude at the $5\%$ level?`, mc: { options: opts, correct: X2 > cv ? 0 : 1 },
          sol: T`Critical value $\chi^2_{${nu}}(5\%)=${cv.toFixed(3)}$. $${X2}${X2 > cv ? '\\gt' : '\\lt'}${cv.toFixed(3)}$: ${X2 > cv ? 'reject' : 'do not reject'} $H_0$.` }; },
      ],
    },
    {
      id: 'f4_cont', title: 'χ² tests for independence in contingency tables', sims: ['f4_chi'],
      notes: T`<ul><li>$H_0$: the two classifications are independent. Expected frequency of a cell $=\dfrac{\text{row total}\times\text{column total}}{\text{grand total}}$.</li>
<li>$\nu=(r-1)(c-1)$ for $r$ rows and $c$ columns (after combining rows or columns to make every $E\ge5$).</li><li>For a $2\times2$ table use <b>Yates' correction</b>: $\displaystyle X^2=\sum\frac{(|O-E|-0.5)^2}{E}$, $\nu=1$.</li></ul>`,
      drills: [
        () => { const t = [[ri(10, 50), ri(10, 50), ri(10, 50)], [ri(10, 50), ri(10, 50), ri(10, 50)]], i = ri(0, 1), j = ri(0, 2); const R = t.map(r => r.reduce((s, v) => s + v)), Cc = [0, 1, 2].map(k => t[0][k] + t[1][k]), N = R[0] + R[1];
          return { q: T`${stab([['', 'A', 'B', 'C'], ['Group 1', ...t[0]], ['Group 2', ...t[1]]])}Find the expected frequency for Group ${i + 1}, column ${'ABC'[j]}, under independence.`, fields: [{ label: 'E', ans: R[i] * Cc[j] / N }], sol: T`$E=\frac{${R[i]}\times${Cc[j]}}{${N}}=${num(R[i] * Cc[j] / N, 5)}$.` }; },
        () => { const r = ri(2, 5), c = ri(2, 5); return { q: T`A contingency table has $${r}$ rows and $${c}$ columns (all expected frequencies at least 5). How many degrees of freedom?`, fields: [{ label: 'ν', ans: (r - 1) * (c - 1) }], sol: T`$(${r}-1)(${c}-1)=${(r - 1) * (c - 1)}$.` }; },
        () => { const O = [[ri(15, 40), ri(15, 40)], [ri(15, 40), ri(15, 40)]], R = O.map(r => r[0] + r[1]), Cc = [O[0][0] + O[1][0], O[0][1] + O[1][1]], N = R[0] + R[1]; const X2 = ST.chi2Stat(O.flat(), [0, 1].flatMap(i => [0, 1].map(j => R[i] * Cc[j] / N)), true);
          return { q: T`${stab([['', 'Yes', 'No'], ['Men', ...O[0]], ['Women', ...O[1]]])}Calculate $X^2$ with Yates' correction for testing independence.`, fields: [{ label: 'X²', ans: X2, tol: { abs: 0.005 } }],
            sol: T`Expected: $${[0, 1].flatMap(i => [0, 1].map(j => num(R[i] * Cc[j] / N, 5))).join(',\\ ')}$. $X^2=\sum\frac{(|O-E|-0.5)^2}{E}=${num(X2, 4)}$, $\nu=1$; compare with $3.841$ at $5\%$.` }; },
      ],
    },
    /* ======================= SECTION D: DISCRETE & DECISION ======================= */
    {
      id: 'f4_pie', title: 'Inclusion–exclusion & derangements', sims: [],
      notes: T`$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|$$
<ul><li>In general: add single sets, subtract pairs, add triples, … — the Venn diagram regions each get counted exactly once.</li><li>A <b>derangement</b> is a permutation with no object in its original place. $$D_n=n!\left(1-\frac1{1!}+\frac1{2!}-\dots+\frac{(-1)^n}{n!}\right),$$ the nearest integer to $\frac{n!}e$. $D_1=0$, $D_2=1$, $D_3=2$, $D_4=9$, $D_5=44$.</li></ul>`,
      drills: [
        () => { const N = pick([100, 120, 200, 300, 500, 1000]), [a, b, c] = pick([[2, 3, 5], [2, 3, 7], [3, 5, 7], [2, 5, 7]]); const f = d => Math.floor(N / d), ans = f(a) + f(b) + f(c) - f(a * b) - f(a * c) - f(b * c) + f(a * b * c);
          return { q: T`How many integers from $1$ to $${N}$ are divisible by at least one of $${a}$, $${b}$ and $${c}$?`, fields: [{ label: 'count', ans }], sol: T`$${f(a)}+${f(b)}+${f(c)}-${f(a * b)}-${f(a * c)}-${f(b * c)}+${f(a * b * c)}=${ans}$.` }; },
        () => { const n = ri(3, 7); let D = [1, 0]; for (let k = 2; k <= n; k++) D.push((k - 1) * (D[k - 1] + D[k - 2])); return { q: T`In how many ways can $${n}$ letters be put into their $${n}$ addressed envelopes so that <b>no</b> letter is in the right envelope?`, fields: [{ label: 'D', ans: D[n] }],
          sol: T`$D_{${n}}=${n}!\left(${Array.from({ length: n + 1 }, (_, k) => `${k % 2 ? '-' : k ? '+' : ''}\\frac1{${k}!}`).join('')}\right)=${D[n]}$.` }; },
        () => { const n = ri(4, 8); let D = [1, 0]; for (let k = 2; k <= n; k++) D.push((k - 1) * (D[k - 1] + D[k - 2])); const p = D[n] / fact(n); return { q: T`$${n}$ people leave their coats; the coats are handed back at random. Find the probability that nobody gets their own coat.`, fields: [{ label: 'P', ans: p }], sol: T`$\frac{D_{${n}}}{${n}!}=\frac{${D[n]}}{${fact(n)}}=${num(p, 4)}\approx\frac1e=0.3679$.` }; },
        () => { const A = ri(20, 40), B = ri(20, 40), C = ri(20, 40), AB = ri(5, 12), AC = ri(5, 12), BC = ri(5, 12), ABC = ri(1, 4); const U = A + B + C - AB - AC - BC + ABC; return { q: T`In a sixth form, $${A}$ study Maths, $${B}$ Physics and $${C}$ Chemistry; $${AB}$ study Maths and Physics, $${AC}$ Maths and Chemistry, $${BC}$ Physics and Chemistry, and $${ABC}$ all three. How many study at least one of these?`, fields: [{ label: 'number', ans: U }],
          sol: T`$${A}+${B}+${C}-${AB}-${AC}-${BC}+${ABC}=${U}$.` }; },
      ],
    },
    {
      id: 'f4_rook', title: 'Restricted positions & rook polynomials', sims: [],
      notes: T`<ul><li>Placing $n$ objects in $n$ positions with some forbidden (object $i$ can't go in position $j$) is placing $n$ non-attacking rooks on an $n\times n$ board avoiding the forbidden squares.</li>
<li>The <b>rook polynomial</b> of the forbidden board is $R(x)=1+r_1x+r_2x^2+\dots$, where $r_k$ is the number of ways to place $k$ non-attacking rooks on forbidden squares.</li><li>By inclusion–exclusion, the number of permitted arrangements is $$N=n!-r_1(n-1)!+r_2(n-2)!-\dots+(-1)^nr_n.$$</li><li>If the forbidden squares split into blocks sharing no rows or columns, their rook polynomials multiply.</li></ul>`,
      drills: [
        () => { const n = 4, all = []; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) all.push([i, j]); const F = shuffle(all).slice(0, ri(3, 5)); const isF = (i, j) => F.some(f => f[0] === i && f[1] === j);
          const r = [1, 0, 0, 0, 0]; const rec = (k, start, used) => { r[k]++; for (let s = start; s < F.length; s++) { const [i, j] = F[s]; if (used.some(([a, b]) => a === i || b === j)) continue; rec(k + 1, s + 1, [...used, F[s]]); } }; r[0] = 0; rec(0, 0, []);
          const N = perms([0, 1, 2, 3]).filter(p => p.every((j, i) => !isF(i, j))).length; const tab = Array.from({ length: n }, (_, i) => [`Person ${i + 1}`, ...Array.from({ length: n }, (_, j) => (isF(i, j) ? '✗' : ''))]);
          return { q: T`Four people are each given one of four jobs, but the crosses show jobs they cannot do. ${stab(tab, ['', 'Job A', 'Job B', 'Job C', 'Job D'])}Find $r_1$, $r_2$ for the forbidden board and the number of allowed allocations.`, fields: [{ label: 'r₁', ans: r[1] }, { label: 'r₂', ans: r[2] }, { label: 'allocations', ans: N }],
            sol: T`$r_1=${r[1]}$ (forbidden squares), $r_2=${r[2]}$ (pairs in different rows and columns)${r[3] ? `, $r_3=${r[3]}$` : ''}${r[4] ? `, $r_4=${r[4]}$` : ''}. $N=4!-${r[1]}(3!)+${r[2]}(2!)-${r[3]}(1!)+${r[4]}=${N}$.` }; },
        () => { const k = ri(2, 4); return { q: T`A forbidden board consists of $${k}$ squares, no two in the same row or column. Find its rook polynomial's coefficient $r_2$.`, fields: [{ label: 'r₂', ans: k * (k - 1) / 2 }], sol: T`Any two of the squares are non-attacking: $r_2=\binom{${k}}{2}=${k * (k - 1) / 2}$. (The polynomial is $(1+x)^{${k}}$.)` }; },
      ],
    },
    {
      id: 'f4_col', title: 'Vertex & edge colouring', sims: [],
      notes: T`<ul><li>A <b>vertex colouring</b> gives adjacent vertices different colours; the least number needed is the <b>chromatic number</b> $\chi(G)$. An <b>edge colouring</b> gives edges sharing a vertex different colours; the least number is the <b>chromatic index</b> $\chi'(G)$.</li>
<li>$\chi(K_n)=n$; a bipartite graph (with an edge) has $\chi=2$; a cycle $C_n$ has $\chi=2$ ($n$ even) or $3$ ($n$ odd); a tree has $\chi=2$.</li><li>$\chi'(G)\ge$ the greatest degree $\Delta$; $\chi'(K_n)=n-1$ ($n$ even) or $n$ ($n$ odd); bipartite graphs have $\chi'=\Delta$.</li></ul>`,
      drills: [
        () => { const L = [['$K_5$', 5], ['$K_4$', 4], ['the cycle $C_7$', 3], ['the cycle $C_8$', 2], ['$K_{3,4}$', 2], ['a tree with 10 vertices', 2], ['the wheel $W_6$ (a hub joined to all 5 vertices of a 5-cycle)', 4], ['the wheel $W_7$ (a hub joined to all 6 vertices of a 6-cycle)', 3]]; const [g, x] = pick(L); return { q: T`What is the chromatic number of ${g}?`, fields: [{ label: 'χ', ans: x }], sol: T`$\chi=${x}$.${g.includes('wheel') ? ' The rim needs 2 or 3 colours (even or odd cycle) and the hub one more.' : ''}` }; },
        () => { const n = ri(3, 8); return { q: T`What is the chromatic index (edge chromatic number) of $K_{${n}}$?`, fields: [{ label: "χ'", ans: n % 2 ? n : n - 1 }], sol: T`$n=${n}$ is ${n % 2 ? 'odd' : 'even'}: $\chi'(K_{${n}})=${n % 2 ? n : n - 1}$.` }; },
        () => { const m = ri(2, 5), n = ri(2, 5); return { q: T`What is the chromatic index of $K_{${m},${n}}$?`, fields: [{ label: "χ'", ans: Math.max(m, n) }], sol: T`Bipartite, so $\chi'=\Delta=\max(${m},${n})=${Math.max(m, n)}$.` }; },
      ],
    },
    {
      id: 'f4_flow', title: 'Network flows: cuts & max-flow min-cut', sims: [],
      notes: T`<ul><li>A flow network has a source $S$, a sink $T$ and arcs with capacities. A feasible flow respects capacities and conserves flow at every other vertex.</li><li>A <b>cut</b> splits the vertices into a set containing $S$ and one containing $T$; its capacity is the total capacity of arcs going <b>from</b> the $S$ side <b>to</b> the $T$ side.</li>
<li><b>Max-flow min-cut theorem</b>: the maximum flow equals the minimum cut capacity. Finding a flow and a cut with equal values proves both optimal.</li></ul>`,
      drills: [
        () => { const N = { S: [5, 50], A: [40, 15], B: [40, 85], C: [72, 50], T: [97, 50] }, E = [['S', 'A', ri(4, 12)], ['S', 'B', ri(4, 12)], ['A', 'C', ri(3, 10)], ['A', 'T', ri(2, 8)], ['B', 'C', ri(3, 10)], ['C', 'T', ri(4, 14)], ['A', 'B', ri(1, 5)]];
          const mids = ['A', 'B', 'C']; let best = Infinity, bestCut = null; for (let m = 0; m < 8; m++) { const Sset = new Set(['S', ...mids.filter((_, i) => m >> i & 1)]); const cap = E.filter(([u, v]) => Sset.has(u) && !Sset.has(v)).reduce((s, e) => s + e[2], 0); if (cap < best) { best = cap; bestCut = [...Sset]; } }
          return { q: T`${FIG.network(N, E, 'Directed network: arc capacities.', { directed: true })}Find the maximum flow from $S$ to $T$ (use the max-flow min-cut theorem).`, fields: [{ label: 'max flow', ans: best }], sol: T`The minimum cut separates $\{${bestCut.join(',')}\}$ from the rest, capacity $${best}$; a flow of $${best}$ can be found, so the maximum flow is $${best}$.` }; },
        () => { const caps = Array.from({ length: 4 }, () => ri(2, 12)), back = ri(1, 6); return { q: T`A cut crosses four arcs from the source side to the sink side, with capacities $${caps.join(',\\ ')}$, and one arc from the sink side back to the source side, capacity $${back}$. Find the capacity of the cut.`, fields: [{ label: 'capacity', ans: caps.reduce((s, x) => s + x) }], sol: T`Only arcs from the $S$ side to the $T$ side count: $${caps.join('+')}=${caps.reduce((s, x) => s + x)}$ (the backward arc is ignored).` }; },
      ],
    },
    {
      id: 'f4_match', title: 'Bipartite graphs, matchings & Hall\'s theorem', sims: [],
      notes: T`<ul><li>A <b>bipartite</b> graph has two vertex sets $X$, $Y$ with edges only between them (e.g. workers and jobs).</li><li>A <b>matching</b> pairs some vertices of $X$ with distinct vertices of $Y$ along edges; a <b>complete matching</b> matches every vertex of $X$.</li>
<li>An <b>alternating path</b> from an unmatched $X$ vertex to an unmatched $Y$ vertex improves a matching by one (swap the edges along it).</li><li><b>Hall's marriage theorem</b>: a complete matching from $X$ exists ⇔ every subset $A\subseteq X$ is joined to at least $|A|$ vertices of $Y$.</li></ul>`,
      drills: [
        () => { const X = ['Ali', 'Bea', 'Cat', 'Dan'], Y = ['P', 'Q', 'R', 'S']; const adj = X.map(() => Y.filter(() => Math.random() < 0.45)); if (adj.some(a => !a.length)) return null; let best = 0; for (const p of perms([0, 1, 2, 3])) { const k = p.filter((j, i) => adj[i].includes(Y[j])).length; if (k > best) best = k; }
          return { q: T`${stab(X.map((x, i) => [x, adj[i].join(', ')]), ['Person', 'Can do'])}What is the size of a maximum matching of people to jobs?`, fields: [{ label: 'size', ans: best }], sol: T`Checking all assignments, at most $${best}$ people can be given different jobs they can do${best === 4 ? ' — a complete matching exists.' : '; by Hall, some group of people can only do fewer jobs than there are people in it.'}` }; },
        () => { const opts = ['No: A, B and C can only do 2 jobs between them', 'Yes: every person can do at least one job', 'Yes: there are as many jobs as people', 'No: D can do too many jobs']; return { q: T`A can do jobs 1, 2; B can do 1, 2; C can do 2, 1; D can do 3, 4. Is a complete matching possible?`, mc: { options: opts, correct: 0 }, sol: T`$\{A,B,C\}$ is joined only to $\{1,2\}$: $3$ people but $2$ jobs, so Hall's condition fails.` }; },
        () => { const n = ri(3, 6); return { q: T`How many different complete matchings are there in $K_{${n},${n}}$?`, fields: [{ label: 'matchings', ans: fact(n) }], sol: T`Every person can do every job: $${n}!=${fact(n)}$.` }; },
      ],
    },
    {
      id: 'f4_nn', title: 'The nearest neighbour algorithm', sims: [],
      notes: T`<ul><li>To build a Hamiltonian cycle (a tour visiting every vertex once) in a complete weighted graph: start at a vertex; repeatedly move to the <b>nearest unvisited</b> vertex; when all are visited, return to the start.</li>
<li>It is greedy and fast, but not always optimal: the tour length is an <b>upper bound</b> for the travelling salesperson problem. Different starting vertices can give different tours — take the best.</li></ul>`,
      drills: [
        () => { const V = ['A', 'B', 'C', 'D', 'E'], D = V.map(() => V.map(() => 0)); for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) D[i][j] = D[j][i] = ri(3, 20);
          let cur = 0, seen = [0], tot = 0, tie = false; while (seen.length < 5) { const c = [0, 1, 2, 3, 4].filter(k => !seen.includes(k)).sort((a, b) => D[cur][a] - D[cur][b]); if (c[1] !== undefined && D[cur][c[0]] === D[cur][c[1]]) tie = true; tot += D[cur][c[0]]; cur = c[0]; seen.push(cur); } tot += D[cur][0]; if (tie) return null;
          return { q: T`${stab(V.map((v, i) => [v, ...D[i].map((d, j) => (i === j ? '–' : d))]), ['', ...V])}Use the nearest neighbour algorithm starting at A to find a tour, and give its length.`, fields: [{ label: 'length', ans: tot }], sol: T`Tour ${seen.map(k => V[k]).join(' → ')} → A, length $${tot}$ — an upper bound for the shortest tour.` }; },
        () => { const opts = ['It gives an upper bound: the true minimum tour is no longer than this', 'It always gives the shortest tour', 'It gives a lower bound', 'It gives a minimum spanning tree']; return { q: T`What does the length of a nearest-neighbour tour tell you about the travelling salesperson problem?`, mc: { options: opts, correct: 0 }, sol: T`Any actual tour is at least as long as the optimal one, so it is an upper bound.` }; },
      ],
    },
    {
      id: 'f4_pert', title: 'PERT: probabilistic critical paths', sims: [],
      notes: T`<ul><li>Each activity has an optimistic time $a$, most likely time $m$ and pessimistic time $b$. Its expected duration and variance are $$\mu=\frac{a+4m+b}6,\qquad\sigma^2=\left(\frac{b-a}6\right)^2.$$</li>
<li>Find the critical path using the expected durations. The project time is modelled as normal, with mean $=$ sum of the critical means and variance $=$ sum of the critical variances.</li><li>$P(\text{complete by }T)=\Phi\left(\dfrac{T-\mu}{\sigma}\right)$.</li></ul>`,
      drills: [
        () => { const a = ri(2, 6), m = a + ri(1, 4), b = m + ri(1, 8); return { q: T`An activity has optimistic, most likely and pessimistic times $${a}$, $${m}$ and $${b}$ days. Find its expected duration and variance.`, fields: [{ label: 'mean', ans: (a + 4 * m + b) / 6 }, { label: 'variance', ans: ((b - a) / 6) ** 2 }], sol: T`$\mu=\frac{${a}+4(${m})+${b}}6=${nice((a + 4 * m + b) / 6)}$; $\sigma^2=\left(\frac{${b}-${a}}6\right)^2=${nice(((b - a) / 6) ** 2)}$.` }; },
        () => { const k = ri(3, 4), acts = Array.from({ length: k }, () => { const a = ri(2, 5), m = a + ri(1, 3), b = m + ri(2, 6); return [a, m, b]; }); const mu = acts.reduce((s, [a, m, b]) => s + (a + 4 * m + b) / 6, 0), v = acts.reduce((s, [a, , b]) => s + ((b - a) / 6) ** 2, 0), T0 = Math.round(mu + ri(-1, 3)); const p = ST.normCDF(T0, mu, Math.sqrt(v));
          return { q: T`The critical path of a project has ${k} activities with $(a,m,b)$ times ${acts.map(t => `$(${t.join(',')})$`).join(', ')} days. Find the probability that the project is completed within $${T0}$ days.`, fields: [{ label: 'P', ans: p }],
            sol: T`Mean $${num(mu, 5)}$, variance $${num(v, 5)}$. $P=\Phi\left(\frac{${T0}-${num(mu, 5)}}{\sqrt{${num(v, 5)}}}\right)=${num(p, 4)}$.` }; },
      ],
    },
    {
      id: 'f4_simplex', title: 'Linear programming: the simplex method', sims: [],
      notes: T`<ul><li>Maximise $P=px+qy$ subject to constraints $a_ix+b_iy\le c_i$, $x,y\ge0$. Add a <b>slack variable</b> to each constraint to make it an equation; set up the initial tableau with the objective row $P-px-qy=0$.</li>
<li><b>Pivot column</b>: the most negative entry in the objective row. <b>Pivot row</b>: the smallest non-negative ratio (value ÷ pivot-column entry, positive entries only).</li><li>Divide the pivot row by the pivot, then clear the rest of the pivot column. Repeat until no negative entries remain in the objective row — the tableau is optimal.</li></ul>`,
      drills: [
        () => { let C; do C = [[ri(1, 4), ri(1, 4), ri(8, 30)], [ri(1, 4), ri(1, 4), ri(8, 30)]]; while (Math.abs(C[0][0] * C[1][1] - C[0][1] * C[1][0]) < 1); const p = ri(1, 6), q = ri(1, 6);
          const pts = [[0, 0], [Math.min(C[0][2] / C[0][0], C[1][2] / C[1][0]), 0], [0, Math.min(C[0][2] / C[0][1], C[1][2] / C[1][1])]]; const d = C[0][0] * C[1][1] - C[0][1] * C[1][0], ix = (C[0][2] * C[1][1] - C[0][1] * C[1][2]) / d, iy = (C[0][0] * C[1][2] - C[0][2] * C[1][0]) / d; if (ix >= 0 && iy >= 0) pts.push([ix, iy]);
          const ok = pts.filter(([x, y]) => C.every(([a, b, c]) => a * x + b * y <= c + 1e-9)), best = Math.max(...ok.map(([x, y]) => p * x + q * y));
          return { q: T`Maximise $P=${p}x+${q}y$ subject to $${C[0][0] === 1 ? '' : C[0][0]}x+${C[0][1] === 1 ? '' : C[0][1]}y\le${C[0][2]}$, $${C[1][0] === 1 ? '' : C[1][0]}x+${C[1][1] === 1 ? '' : C[1][1]}y\le${C[1][2]}$, $x,y\ge0$. Find the maximum value of $P$.`, fields: [{ label: 'P max', ans: best }],
            sol: T`The optimum is at a vertex of the feasible region: ${ok.map(([x, y]) => `$(${num(x, 4)},${num(y, 4)})$: $P=${num(p * x + q * y, 5)}$`).join('; ')}. Maximum $${num(best, 5)}$ — the simplex method reaches the same vertex by pivoting.` }; },
        () => { const p = ri(2, 6), q = ri(2, 6); if (p === q) return null; const opts = ['x', 'y']; return { q: T`The initial objective row of a simplex tableau is $P-${p}x-${q}y=0$. Which variable enters the basis first?`, mc: { options: opts, correct: p > q ? 0 : 1 }, sol: T`Most negative entry: $-${Math.max(p, q)}$ in the $${p > q ? 'x' : 'y'}$ column.` }; },
        () => { const col = [ri(1, 4), ri(1, 4), ri(1, 4)], val = [ri(6, 30), ri(6, 30), ri(6, 30)]; const ratios = col.map((c, i) => val[i] / c), k = ratios.indexOf(Math.min(...ratios)); if (ratios.filter(r => r === ratios[k]).length > 1) return null; const opts = ['Row 1', 'Row 2', 'Row 3'];
          return { q: T`In the pivot column, the constraint rows have entries $${col.join(',\\ ')}$ and values $${val.join(',\\ ')}$. Which row is the pivot row?`, mc: { options: opts, correct: k }, sol: T`Ratios $${ratios.map(r => num(r, 4)).join(',\\ ')}$: the smallest is in row $${k + 1}$.` }; },
      ],
    },
    {
      id: 'f4_gf', title: 'Generating functions', sims: [],
      notes: T`<ul><li>The <b>generating function</b> of a sequence $a_0,a_1,a_2,\dots$ is $G(x)=a_0+a_1x+a_2x^2+\dots$ — the sequence is stored in the coefficients.</li>
<li>Counting: the number of ways to choose with restrictions is a coefficient of a product. E.g. solutions of $a+b+c=n$ with each variable from a set $S$: the coefficient of $x^n$ in $\left(\sum_{s\in S}x^s\right)^3$.</li><li>Useful: $(1+x)^n=\sum\binom nrx^r$; $\frac1{1-x}=1+x+x^2+\dots$; $\frac1{(1-x)^k}=\sum\binom{r+k-1}{k-1}x^r$.</li><li>Comparing coefficients in identities such as $(1+x)^m(1+x)^n=(1+x)^{m+n}$ proves combinatorial formulae.</li></ul>`,
      drills: [
        () => { const n = ri(4, 10), r = ri(1, n - 1); return { q: T`Find the coefficient of $x^{${r}}$ in $(1+x)^{${n}}$ and say what it counts.`, fields: [{ label: 'coefficient', ans: ST.choose(n, r) }], sol: T`$\binom{${n}}{${r}}=${ST.choose(n, r)}$ — the number of ways to choose $${r}$ objects from $${n}$.` }; },
        () => { const k = 3, n = ri(4, 12); return { q: T`How many solutions in non-negative integers has $a+b+c=${n}$? (Use the generating function $\frac1{(1-x)^3}$.)`, fields: [{ label: 'solutions', ans: ST.choose(n + 2, 2) }], sol: T`Coefficient of $x^{${n}}$ in $(1+x+x^2+\dots)^3=\frac1{(1-x)^3}$: $\binom{${n}+2}{2}=${ST.choose(n + 2, 2)}$.` }; },
        () => { const s = ri(4, 10); let P = [1]; const die = [0, 1, 1, 1, 1, 1, 1]; P = polyMul(die, die); return { q: T`Using $G(x)=(x+x^2+\dots+x^6)^2$, find the number of ways to score a total of $${s}$ with two (distinguishable) dice.`, fields: [{ label: 'ways', ans: P[s] }], sol: T`The coefficient of $x^{${s}}$ in $G(x)$ is $${P[s]}$.` }; },
        () => { const amt = ri(5, 15); let P = [1]; for (const c of [1, 2, 5]) { const f = Array(amt + 1).fill(0); for (let k = 0; k * c <= amt; k++) f[k * c] = 1; P = polyMul(P, f).slice(0, amt + 1); } return { q: T`Using $\frac1{(1-x)(1-x^2)(1-x^5)}$, find the number of ways to make ${amt}p from 1p, 2p and 5p coins.`, fields: [{ label: 'ways', ans: P[amt] }], sol: T`Expand each factor as a geometric series and read off the coefficient of $x^{${amt}}$: $${P[amt]}$ ways.` }; },
        () => { const m = ri(2, 5), n = ri(2, 5), r = ri(1, Math.min(m + n - 1, 5)); const lhs = Array.from({ length: r + 1 }, (_, k) => (k <= m && r - k <= n ? ST.choose(m, k) * ST.choose(n, r - k) : 0)).reduce((s, v) => s + v); return { q: T`By comparing coefficients of $x^{${r}}$ in $(1+x)^{${m}}(1+x)^{${n}}=(1+x)^{${m + n}}$, find $\sum_k\binom{${m}}{k}\binom{${n}}{${r}-k}$.`, fields: [{ label: 'sum', ans: lhs }], sol: T`It equals $\binom{${m + n}}{${r}}=${ST.choose(m + n, r)}$ (Vandermonde's identity).` }; },
      ],
    },
    {
      id: 'f4_sym', title: 'Symmetry groups', sims: ['f4_polya'],
      notes: T`<ul><li>The <b>cyclic group</b> $C_n$: the $n$ rotations of a regular $n$-gon. The <b>dihedral group</b> $D_{2n}$: those rotations plus $n$ reflections (or flips), order $2n$.</li>
<li>Rotation groups of the solids: tetrahedron order $12$; cube and octahedron (duals) order $24$. Including reflections doubles these.</li><li>In $D_{2n}$: the reflections have period $2$; the rotation through $\frac{2\pi k}n$ has period $\frac n{\gcd(k,n)}$.</li></ul>`,
      drills: [
        () => { const L = [['C_{6}', 6], ['D_{10}', 10], ['D_{8}', 8], ['the rotation group of a regular tetrahedron', 12], ['the rotation group of a cube', 24], ['the rotation group of a regular octahedron', 24], ['the full symmetry group (rotations and reflections) of a cube', 48]]; const [g, o] = pick(L); return { q: T`What is the order of ${g.startsWith('the') ? g : `$${g}$`}?`, fields: [{ label: 'order', ans: o }], sol: T`$${o}$.` }; },
        () => { const n = ri(3, 8); const c = n + (n % 2 ? 0 : 1); return { q: T`How many elements of period $2$ does the dihedral group $D_{${2 * n}}$ (symmetries of a regular ${n}-gon) have?`, fields: [{ label: 'count', ans: c }], sol: T`The $${n}$ reflections${n % 2 ? '' : ', plus the half-turn (since $n$ is even)'}: $${c}$.` }; },
        () => { const n = pick([5, 6, 8, 10, 12]), k = ri(1, n - 1); return { q: T`In the symmetry group of a regular ${n}-gon, find the period of the rotation through $${k}\times\frac{360^\circ}{${n}}$.`, fields: [{ label: 'period', ans: n / gcdI(k, n) }], sol: T`$\frac{${n}}{\gcd(${k},${n})}=${n / gcdI(k, n)}$.` }; },
      ],
    },
    {
      id: 'f4_polya', title: 'Cycle indices & Pólya enumeration', sims: ['f4_polya'],
      notes: T`<ul><li>Write each symmetry as a product of disjoint cycles on the objects being coloured; a term $x_1^{a_1}x_2^{a_2}\cdots$ records $a_k$ cycles of length $k$. The <b>cycle index</b> $P_G$ is the average of these terms over the group.</li>
<li><b>Pólya's theorem</b>: the number of distinct colourings with $k$ colours is $P_G(k,k,\dots,k)$.</li><li>The <b>pattern inventory</b> $P_G\big(b+w,\ b^2+w^2,\ \dots\big)$: the coefficient of $b^rw^{n-r}$ is the number of distinct colourings with exactly $r$ black objects (similarly with three colours).</li><li>The booklet gives cycle indices for the tetrahedron, cube and octahedron.</li></ul>`,
      drills: [
        () => { const n = ri(3, 8), k = ri(2, 3), dih = Math.random() < 0.5; const ci = dih ? ciDn(n) : ciCn(n); return { q: T`How many distinct necklaces of $${n}$ beads can be made using $${k}$ colours, if necklaces that differ by a rotation${dih ? ' or a reflection' : ''} are the same?`, fields: [{ label: 'necklaces', ans: ciCount(ci, k) }],
          sol: T`$P_{${dih ? `D_{${2 * n}}` : `C_{${n}}`}}=${ciTex(ci)}$. Put every $x_i=${k}$: $${ciCount(ci, k)}$.` }; },
        () => { const [name, ci] = pick(Object.entries(CI3D)), k = ri(2, 3); return { q: T`Using the cycle index $${ciTex(ci)}$ for the rotations of a ${name}, find the number of distinct colourings with $${k}$ colours.`, fields: [{ label: 'colourings', ans: ciCount(ci, k) }], sol: T`Substitute $x_i=${k}$: $${ciCount(ci, k)}$.` }; },
        () => { const n = pick([4, 5, 6]), r = ri(1, n - 1), dih = Math.random() < 0.5; const ci = dih ? ciDn(n) : ciCn(n), inv = ciInventory(ci); return { q: T`Necklaces of $${n}$ beads, each black or white, are equivalent under ${dih ? 'rotations and reflections' : 'rotations'}. How many distinct necklaces have exactly $${r}$ black beads?`, fields: [{ label: 'count', ans: inv[r] }],
          sol: T`Pattern inventory $P_G(b+w,b^2+w^2,\dots)=${inv.map((c, i) => `${c}b^{${i}}w^{${n - i}}`).join('+')}$; the coefficient of $b^{${r}}w^{${n - r}}$ is $${inv[r]}$.` }; },
      ],
    },
  ],
});
