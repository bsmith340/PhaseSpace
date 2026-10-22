// BCS Academy statistics library: distributions (pmf/cdf/inverse), data summaries, regression and test statistics.
// Accurate to well beyond the 4 decimal places of the CCEA tables; used by drills, the Lab and simulations.
'use strict';

const ST = (() => {
  const LN_SQRT_2PI = 0.9189385332046728;
  // log Γ(x), Lanczos (g = 7, n = 9)
  const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  function lgamma(x) {
    if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
    x -= 1; let a = LG[0]; const t = x + 7.5;
    for (let i = 1; i < 9; i++) a += LG[i] / (x + i);
    return LN_SQRT_2PI + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  const lchoose = (n, r) => lgamma(n + 1) - lgamma(r + 1) - lgamma(n - r + 1);
  function choose(n, r) { if (r < 0 || r > n) return 0; r = Math.min(r, n - r); let c = 1; for (let k = 1; k <= r; k++) c = c * (n - r + k) / k; return Math.round(c); }
  const perm = (n, r) => { if (r < 0 || r > n) return 0; let p = 1; for (let k = 0; k < r; k++) p *= n - k; return p; };

  // standard normal
  function erfc(x) { // Numerical Recipes erfcc, |error| < 1.2e-7
    const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
    const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? r : 2 - r;
  }
  const phi = z => Math.exp(-z * z / 2 - LN_SQRT_2PI);
  // Φ via the series / continued fraction of the incomplete gamma function for full double precision
  const Phi = z => (z >= 0 ? 0.5 + 0.5 * gammaP(0.5, z * z / 2) : 0.5 - 0.5 * gammaP(0.5, z * z / 2));
  function invPhi(p) { // Acklam, refined by two Newton steps
    if (p <= 0) return -Infinity; if (p >= 1) return Infinity;
    const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239],
      b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572],
      c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783],
      d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    let x;
    if (p < 0.02425) { const q = Math.sqrt(-2 * Math.log(p)); x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    else if (p <= 1 - 0.02425) { const q = p - 0.5, r = q * q; x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1); }
    else { const q = Math.sqrt(-2 * Math.log(1 - p)); x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    for (let i = 0; i < 2; i++) x -= (Phi(x) - p) / phi(x);
    return x;
  }

  // regularised incomplete gamma P(a, x)
  function gammaP(a, x) {
    if (x <= 0) return 0;
    if (x < a + 1) { let s = 1 / a, t = s; for (let n = 1; n < 500; n++) { t *= x / (a + n); s += t; if (Math.abs(t) < Math.abs(s) * 1e-15) break; } return s * Math.exp(-x + a * Math.log(x) - lgamma(a)); }
    let b = x + 1 - a, c = 1e300, d = 1 / b, h = d;
    for (let i = 1; i < 500; i++) { const an = -i * (i - a); b += 2; d = an * d + b; if (Math.abs(d) < 1e-300) d = 1e-300; c = b + an / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break; }
    return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h;
  }
  // regularised incomplete beta I_x(a, b)
  function betacf(a, b, x) {
    let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap; if (Math.abs(d) < 1e-300) d = 1e-300; d = 1 / d; let h = d;
    for (let m = 1; m < 500; m++) {
      const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < 1e-300) d = 1e-300; c = 1 + aa / c; if (Math.abs(c) < 1e-300) c = 1e-300; d = 1 / d; const del = d * c; h *= del;
      if (Math.abs(del - 1) < 1e-15) break;
    }
    return h;
  }
  function betaI(x, a, b) {
    if (x <= 0) return 0; if (x >= 1) return 1;
    const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
  }
  // invert a monotone increasing cdf on [lo, hi] by bisection
  function invert(F, p, lo, hi) { for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (F(m) < p) lo = m; else hi = m; if (hi - lo < 1e-12 * Math.max(1, Math.abs(m))) break; } return (lo + hi) / 2; }

  const tCDF = (t, v) => { const x = v / (v + t * t), tail = 0.5 * betaI(x, v / 2, 0.5); return t >= 0 ? 1 - tail : tail; };
  const invT = (p, v) => invert(t => tCDF(t, v), p, -1e3, 1e3);
  const chi2CDF = (x, v) => (x <= 0 ? 0 : gammaP(v / 2, x / 2));
  const invChi2 = (p, v) => invert(x => chi2CDF(x, v), p, 0, 1e4);

  // discrete distributions
  const binomPMF = (n, p, x) => (x < 0 || x > n || x !== Math.floor(x) ? 0 : p === 0 ? +(x === 0) : p === 1 ? +(x === n) : Math.exp(lchoose(n, x) + x * Math.log(p) + (n - x) * Math.log(1 - p)));
  const binomCDF = (n, p, x) => { x = Math.floor(x); if (x < 0) return 0; if (x >= n) return 1; let s = 0; for (let k = 0; k <= x; k++) s += binomPMF(n, p, k); return Math.min(1, s); };
  const poisPMF = (l, x) => (x < 0 || x !== Math.floor(x) ? 0 : Math.exp(-l + x * Math.log(l) - lgamma(x + 1)));
  const poisCDF = (l, x) => { x = Math.floor(x); if (x < 0) return 0; let s = 0; for (let k = 0; k <= x; k++) s += poisPMF(l, k); return Math.min(1, s); };
  const geoPMF = (p, x) => (x < 1 || x !== Math.floor(x) ? 0 : (1 - p) ** (x - 1) * p);
  const geoCDF = (p, x) => (x < 1 ? 0 : 1 - (1 - p) ** Math.floor(x));
  const normCDF = (x, mu = 0, sd = 1) => Phi((x - mu) / sd);
  const invNorm = (p, mu = 0, sd = 1) => mu + sd * invPhi(p);

  // data summaries
  const sum = a => a.reduce((s, x) => s + x, 0);
  const mean = a => sum(a) / a.length;
  const Sxx = a => { const m = mean(a); return sum(a.map(x => (x - m) ** 2)); };
  const Sxy = (a, b) => { const ma = mean(a), mb = mean(b); return sum(a.map((x, i) => (x - ma) * (b[i] - mb))); };
  const varP = a => Sxx(a) / a.length, varS = a => Sxx(a) / (a.length - 1);
  const pmcc = (a, b) => Sxy(a, b) / Math.sqrt(Sxx(a) * Sxx(b));
  const regress = (x, y) => { const b = Sxy(x, y) / Sxx(x); return { b, a: mean(y) - b * mean(x) }; };
  // quartiles by the (n+1)p position rule; median of a sorted copy
  const quantile = (a, q) => { const s = a.slice().sort((x, y) => x - y), pos = (s.length + 1) * q; if (pos <= 1) return s[0]; if (pos >= s.length) return s[s.length - 1]; const i = Math.floor(pos); return s[i - 1] + (pos - i) * (s[i] - s[i - 1]); };
  const median = a => quantile(a, 0.5);

  // chi-squared statistic, with optional Yates correction
  const chi2Stat = (O, E, yates = false) => sum(O.map((o, i) => ((yates ? Math.max(0, Math.abs(o - E[i]) - 0.5) : Math.abs(o - E[i])) ** 2) / E[i]));
  // expected frequencies for a contingency table
  const expected = tab => { const R = tab.map(sum), Cn = tab[0].map((_, j) => sum(tab.map(r => r[j]))), N = sum(R); return tab.map((r, i) => r.map((_, j) => R[i] * Cn[j] / N)); };

  // critical values (upper tail probability alpha)
  const zCrit = alpha => invPhi(1 - alpha);
  const tCrit = (alpha, v) => invT(1 - alpha, v);
  const chiCrit = (alpha, v) => invChi2(1 - alpha, v);
  // PMCC one-tailed critical value for sample size n at level alpha (via t with n − 2 df)
  const rCrit = (alpha, n) => { const t = tCrit(alpha, n - 2); return t / Math.sqrt(n - 2 + t * t); };

  // 4 d.p. rounding as in the CCEA tables
  const r4 = x => Math.round(x * 1e4) / 1e4;
  return { lgamma, choose, perm, phi, Phi, invPhi, erfc, gammaP, betaI, tCDF, invT, chi2CDF, invChi2, binomPMF, binomCDF, poisPMF, poisCDF, geoPMF, geoCDF, normCDF, invNorm,
    sum, mean, Sxx, Sxy, varP, varS, pmcc, regress, quantile, median, chi2Stat, expected, zCrit, tCrit, chiCrit, rCrit, r4 };
})();
