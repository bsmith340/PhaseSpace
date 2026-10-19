// CCEA GCE Further Mathematics AS 2 Applied Mathematics — Section C Statistics, Section D Discrete and Decision Mathematics.
'use strict';

const gcdI = (a, b) => (b ? gcdI(b, a % b) : Math.abs(a));
const ordMod = (a, n) => { let x = a % n, k = 1; while (x !== 1 && k <= n) { x = (x * a) % n; k++; } return x === 1 ? k : 0; }; // multiplicative order
const stab = (rows, head) => `<table class="tbl">${head ? `<tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>` : ''}${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const pdfInt = (cs, a, b) => { const F = x => cs.reduce((s, c, i) => s + c * x ** (cs.length - i) / (cs.length - i), 0); return F(b) - F(a); }; // ∫ of a polynomial with coefficients cs (highest first)

/* ---------- small graph generators shared by the decision drills ---------- */
const HEX = { A: [6, 50], B: [36, 12], C: [36, 88], D: [66, 12], E: [66, 88], F: [94, 50] };
function randGraph() {
  const ring = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'F']], extra = shuffle([['B', 'C'], ['B', 'E'], ['C', 'D'], ['D', 'E'], ['A', 'D'], ['C', 'F']]).slice(0, ri(2, 3));
  return [...ring, ...extra].map(([u, v]) => [u, v, ri(2, 15)]);
}
function dijkstra(edges, s) {
  const V = Object.keys(HEX), d = Object.fromEntries(V.map(v => [v, Infinity])), prev = {}, done = new Set(); d[s] = 0;
  while (done.size < V.length) { const u = V.filter(v => !done.has(v)).sort((a, b) => d[a] - d[b])[0]; done.add(u);
    for (const [a, b, w] of edges) { const o = a === u ? b : b === u ? a : null; if (o && d[u] + w < d[o]) { d[o] = d[u] + w; prev[o] = u; } } }
  return { d, prev };
}
function prim(edges, s = 'A') {
  const inT = new Set([s]), chosen = []; let tie = false;
  while (inT.size < 6) { const cand = edges.filter(([a, b]) => inT.has(a) !== inT.has(b)).sort((x, y) => x[2] - y[2]), c = cand[0]; if (cand[1] && cand[1][2] === c[2]) tie = true; chosen.push(c); inT.add(inT.has(c[0]) ? c[1] : c[0]); }
  chosen.tie = tie; return chosen;
}
function routes(edges, s, t) { // every simple path s → t with its length
  const out = [], go = (v, seen, len) => { if (v === t) { out.push([seen.join(''), len]); return; } for (const [a, b, w] of edges) { const o = a === v ? b : b === v ? a : null; if (o && !seen.includes(o)) go(o, [...seen, o], len + w); } }; go(s, [s], 0); return out;
}

topic({
  id: '_f2b', title: 'FM AS 2 statistics & decision', points: [
    /* ======================= SECTION C: STATISTICS ======================= */
    {
      id: 'f2_samp', title: 'Sampling techniques', sims: [],
      notes: T`<table class="tbl"><tr><th>Technique</th><th>How</th><th>For / against</th></tr>
<tr><td>Simple random</td><td>every sample of size $n$ equally likely (number the frame, random numbers)</td><td>unbiased; needs a full list, may miss small groups</td></tr>
<tr><td>Stratified</td><td>random sample from each stratum in proportion to its size</td><td>represents every group; needs strata information and a list</td></tr>
<tr><td>Quota</td><td>interviewer fills quotas for each group, choosing people non-randomly</td><td>quick, no list needed; interviewer bias, not random</td></tr>
<tr><td>Opportunity</td><td>whoever is available at the time</td><td>cheap and easy; likely to be unrepresentative</td></tr>
<tr><td>Cluster</td><td>split into clusters (e.g. schools), choose some clusters at random, sample within them</td><td>cheap for spread-out populations; clusters may differ</td></tr></table>`,
      drills: [
        () => { const L = [['A researcher stands outside a supermarket and asks the first 50 people who pass.', 'opportunity'], ['Every student is numbered and 40 are chosen using a random number generator.', 'simple random'], ['An interviewer must question 20 men and 20 women, choosing whoever is willing.', 'quota'], ['Five schools in a county are chosen at random and every Year 12 in those schools is surveyed.', 'cluster'], ['A random sample is taken from each year group, in proportion to its size.', 'stratified']];
          const [d, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`${d} Which sampling technique is this?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r[0].toUpperCase() + r.slice(1)} sampling.` }; },
        () => { const L = [['quota sampling', 'It is not random, so the interviewer\'s choices can introduce bias'], ['opportunity sampling', 'It is unlikely to be representative of the population'], ['simple random sampling', 'It needs a complete list (sampling frame) of the population'], ['cluster sampling', 'The chosen clusters may not be representative of the whole population']];
          const [t, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`Which is a disadvantage of ${t}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
        () => { const s = [ri(80, 400), ri(80, 400), ri(80, 400)], n = pick([30, 40, 50, 60]), N = s[0] + s[1] + s[2], k = ri(0, 2); return { q: T`A firm has three departments with $${s.join('$, $')}$ employees. A stratified sample of $${n}$ is taken. How many come from department ${k + 1} (to the nearest whole number)?`, fields: [{ label: 'number', ans: Math.round(s[k] * n / N), tol: { abs: 0.5 } }],
          sol: T`$\frac{${s[k]}}{${N}}\times${n}=${num(s[k] * n / N, 4)}\approx${Math.round(s[k] * n / N)}$.` }; },
      ],
    },
    {
      id: 'f2_perm', title: 'Permutations & combinations', sims: [],
      notes: T`<ul><li>$n$ distinct objects in a row: $n!$ ways. Arrangements of $r$ from $n$: $^n\mathrm P_r=\dfrac{n!}{(n-r)!}$ (order matters).</li><li>Selections of $r$ from $n$: $^n\mathrm C_r=\binom nr=\dfrac{n!}{r!(n-r)!}$ (order doesn't matter).</li>
<li><b>Repeated</b> objects: $\dfrac{n!}{p!\,q!\cdots}$ when there are $p$ identical of one kind, $q$ of another, …</li><li><b>Restrictions</b>: "together" — glue them into one block and arrange inside it; "apart" — total minus together, or place the others first and slot into the gaps. Arrangements in a circle: $(n-1)!$.</li></ul>`,
      drills: [
        () => { const n = ri(5, 10), r = ri(2, Math.min(5, n - 1)), ord = Math.random() < 0.5; return { q: T`In how many ways can ${ord ? `$${r}$ different prizes be awarded to $${r}$ of $${n}$ people` : `a team of $${r}$ be chosen from $${n}$ people`}?`, fields: [{ label: 'ways', ans: ord ? nPr(n, r) : ST.choose(n, r) }],
          sol: T`${ord ? `Order matters: $^{${n}}\\mathrm P_{${r}}=\\frac{${n}!}{${n - r}!}=${nPr(n, r)}$.` : `Order doesn't matter: $\\binom{${n}}{${r}}=${ST.choose(n, r)}$.`}` }; },
        () => { const W = pick([['BANANA', [3, 2]], ['LETTER', [2, 2]], ['STATISTICS', [3, 3, 2]], ['MISSISSIPPI', [4, 4, 2]], ['PEPPER', [3, 2]], ['ALGEBRA', [2]], ['CALCULUS', [2, 2, 2]], ['ADDITION', [2, 2]]]); const [w, reps] = W, ans = fact(w.length) / reps.reduce((s, k) => s * fact(k), 1);
          return { q: T`How many different arrangements are there of the letters of the word ${w}?`, fields: [{ label: 'arrangements', ans }], sol: T`$\frac{${w.length}!}{${reps.map(k => k + '!').join('\\,')}}=${ans}$ (divide by the arrangements of the repeated letters).` }; },
        () => { const n = ri(5, 8), apart = Math.random() < 0.5; const tog = 2 * fact(n - 1); return { q: T`$${n}$ people, including Amy and Ben, stand in a row. In how many ways can this be done if Amy and Ben are ${apart ? 'not next to each other' : 'next to each other'}?`, fields: [{ label: 'ways', ans: apart ? fact(n) - tog : tog }],
          sol: T`Together: treat them as one block: $${n - 1}!\times2!=${tog}$. ${apart ? `Apart: $${n}!-${tog}=${fact(n) - tog}$.` : ''}` }; },
        () => { const a = ri(4, 7), b = ri(3, 6), r = ri(3, 4); const ans = ST.choose(a + b, r) - ST.choose(a, r); return { q: T`A committee of $${r}$ is chosen from $${a}$ men and $${b}$ women. How many committees contain at least one woman?`, fields: [{ label: 'committees', ans }], sol: T`Total $\binom{${a + b}}{${r}}=${ST.choose(a + b, r)}$; all men $\binom{${a}}{${r}}=${ST.choose(a, r)}$. At least one woman: $${ans}$.` }; },
        () => { const n = ri(4, 8); return { q: T`In how many ways can $${n}$ people sit around a circular table (only their relative positions matter)?`, fields: [{ label: 'ways', ans: fact(n - 1) }], sol: T`Fix one person; arrange the rest: $(${n}-1)!=${fact(n - 1)}$.` }; },
      ],
    },
    {
      id: 'f2_pprob', title: 'Probability using permutations & combinations', sims: [],
      notes: T`<p>When all outcomes are equally likely, $$P(\text{event})=\frac{\text{number of favourable arrangements or selections}}{\text{total number}}.$$ Count the top and bottom <b>in the same way</b> (both ordered or both unordered).</p>`,
      drills: [
        () => { const n = ri(5, 9); return { q: T`$${n}$ different books are arranged at random on a shelf. Find the probability that two particular books are next to each other.`, fields: [{ label: 'P', ans: 2 / n }], sol: T`$\frac{2\times${n - 1}!}{${n}!}=\frac2{${n}}$.` }; },
        () => { const a = ri(4, 8), b = ri(3, 7), r = ri(3, 5), k = ri(1, Math.min(r - 1, b)); if (r - k > a) return null; const p = ST.choose(b, k) * ST.choose(a, r - k) / ST.choose(a + b, r);
          return { q: T`A committee of $${r}$ is chosen at random from $${a}$ boys and $${b}$ girls. Find the probability that exactly $${k}$ girl${k > 1 ? 's are' : ' is'} chosen.`, fields: [{ label: 'P', ans: p }], sol: T`$\dfrac{\binom{${b}}{${k}}\binom{${a}}{${r - k}}}{\binom{${a + b}}{${r}}}=\dfrac{${ST.choose(b, k) * ST.choose(a, r - k)}}{${ST.choose(a + b, r)}}=${num(p, 4)}$.` }; },
        () => { const r = ri(2, 4), suit = Math.random() < 0.5; const p = suit ? ST.choose(13, r) / ST.choose(52, r) : ST.choose(4, Math.min(r, 4)) / ST.choose(52, r); return { q: T`$${r}$ cards are dealt from a well-shuffled pack of $52$. Find the probability that they are ${r === 2 ? 'both' : 'all'} ${suit ? 'hearts' : 'aces'}.`, fields: [{ label: 'P', ans: p }],
          sol: T`$\dfrac{\binom{${suit ? 13 : 4}}{${r}}}{\binom{52}{${r}}}=${p < 0.001 ? sci3(p) : num(p, 4)}$.` }; },
      ],
    },
    {
      id: 'f2_drv', title: 'Discrete random variables', sims: ['f2_dist'],
      notes: T`<ul><li>A probability distribution lists $P(X=x)$ for each value; the probabilities sum to $1$.</li><li>$E(X)=\sum xP(X=x)$; $\ \operatorname{Var}(X)=E(X^2)-[E(X)]^2$ where $E(X^2)=\sum x^2P(X=x)$; standard deviation $=\sqrt{\operatorname{Var}(X)}$.</li>
<li>$E(aX+b)=aE(X)+b$; $\ \operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ — adding a constant shifts but does not spread.</li></ul>`,
      drills: [
        () => { const xs = [0, 1, 2, 3], w = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)], tot = w.reduce((s, v) => s + v), ks = w.map(v => v); // P = k·w
          const k = 1 / tot, E = xs.reduce((s, x, i) => s + x * ks[i] * k, 0); return { q: T`${stab([['$x$', ...xs], ['$P(X=x)$', ...ks.map(c => `$${c === 1 ? '' : c}k$`)]])}Find $k$ and $E(X)$.`, fields: [{ label: 'k', ans: k }, { label: 'E(X)', ans: E }],
            sol: T`Sum to 1: $${tot}k=1\Rightarrow k=\frac1{${tot}}$. $E(X)=\sum xP(X=x)=\frac{${xs.reduce((s, x, i) => s + x * ks[i], 0)}}{${tot}}=${nice(E)}$.` }; },
        () => { const xs = [1, 2, 3, 4], ps = (() => { const w = [ri(1, 4), ri(1, 4), ri(1, 4), ri(1, 4)], t = w.reduce((s, v) => s + v); return w.map(v => v / t); })(); const E = xs.reduce((s, x, i) => s + x * ps[i], 0), E2 = xs.reduce((s, x, i) => s + x * x * ps[i], 0), Vr = E2 - E * E;
          return { q: T`${stab([['$x$', ...xs], ['$P(X=x)$', ...ps.map(p => `$${nice(p)}$`)]])}Find $E(X)$ and $\operatorname{Var}(X)$.`, fields: [{ label: 'E(X)', ans: E }, { label: 'Var(X)', ans: Vr }],
            sol: T`$E(X)=${nice(E)}$, $E(X^2)=${nice(E2)}$, $\operatorname{Var}(X)=${nice(E2)}-\left(${nice(E)}\right)^2=${nice(Vr)}$.` }; },
        () => { const E = ri(-5, 10), Vr = ri(1, 12), a = rnz(-4, 5), b = ri(-10, 10); return { q: T`$E(X)=${E}$ and $\operatorname{Var}(X)=${Vr}$. Find $E(${poly([[a, 'X'], [b, '']])})$ and $\operatorname{Var}(${poly([[a, 'X'], [b, '']])})$.`, fields: [{ label: 'E', ans: a * E + b }, { label: 'Var', ans: a * a * Vr }],
          sol: T`$E=${a}(${E})${sgn(b)}=${a * E + b}$; $\operatorname{Var}=${a}^2(${Vr})=${a * a * Vr}$ (the constant $${b}$ doesn't affect the spread).` }; },
        () => { const n = ri(3, 6), k = 2 / (n * (n + 1)), a = ri(1, n - 1), b = ri(a + 1, n); return { q: T`$X$ takes the values $1,2,\dots,${n}$ with $P(X=x)=kx$. Find $k$ and $P(${a}\le X\le${b})$.`, fields: [{ label: 'k', ans: k }, { label: 'P', ans: k * (b * (b + 1) - (a - 1) * a) / 2 }],
          sol: T`$k(1+2+\dots+${n})=1\Rightarrow k=\frac1{${n * (n + 1) / 2}}$. $P(${a}\le X\le${b})=k(${Array.from({ length: b - a + 1 }, (_, i) => a + i).join('+')})=${nice(k * (b * (b + 1) - (a - 1) * a) / 2)}$.` }; },
      ],
    },
    {
      id: 'f2_crv', title: 'Continuous random variables', sims: ['f2_dist'],
      notes: T`<ul><li>A <b>probability density function</b> $f(x)\ge0$ with $\int f(x)\,dx=1$ over its range. Probabilities are areas: $P(a\lt X\lt b)=\int_a^bf(x)\,dx$ (and $P(X=a)=0$).</li>
<li>$E(X)=\int xf(x)\,dx$; $\ E(X^2)=\int x^2f(x)\,dx$; $\ \operatorname{Var}(X)=E(X^2)-[E(X)]^2$.</li><li>$E(aX+b)=aE(X)+b$, $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$, as for discrete variables.</li></ul>`,
      drills: [
        () => { const a = pick([1, 2, 3, 4]), pw = pick([1, 2, 3]); const k = (pw + 1) / a ** (pw + 1); return { q: T`$f(x)=kx^{${pw}}$ for $0\le x\le${a}$ (and $0$ otherwise) is a probability density function. Find $k$.`, fields: [{ label: 'k', ans: k }], sol: T`$\int_0^{${a}}kx^{${pw}}dx=k\frac{${a}^{${pw + 1}}}{${pw + 1}}=1\Rightarrow k=\frac{${pw + 1}}{${a ** (pw + 1)}}$.` }; },
        () => { const a = pick([2, 3, 4]), b = +(a * pick([0.25, 0.5, 0.75])).toFixed(2); const p = (b / a) ** 3; return { q: T`$X$ has p.d.f. $f(x)=${nice(3 / a ** 3)}x^2$ for $0\le x\le${a}$. Find $P(X\lt${b})$.`, fields: [{ label: 'P', ans: p }], sol: T`$\int_0^{${b}}\frac{3x^2}{${a ** 3}}dx=\frac{${b}^3}{${a ** 3}}=${num(p, 4)}$.` }; },
        () => { const a = pick([1, 2, 3, 4, 6]); const E = 2 * a / 3, E2 = a * a / 2; return { q: T`$X$ has p.d.f. $f(x)=${a === 1 ? '2' : nice(2 / (a * a))}x$ for $0\le x\le${a}$. Find $E(X)$ and $\operatorname{Var}(X)$.`, fields: [{ label: 'E(X)', ans: E }, { label: 'Var(X)', ans: E2 - E * E }],
          sol: T`$E(X)=\int_0^{${a}}x\cdot\frac{2x}{${a * a}}dx=\frac{2(${a})^3}{3(${a * a})}=${nice(E)}$. $E(X^2)=\int_0^{${a}}\frac{2x^3}{${a * a}}dx=${nice(E2)}$. $\operatorname{Var}=${nice(E2)}-\left(${nice(E)}\right)^2=${nice(E2 - E * E)}$.` }; },
        () => { const lo = pick([0, 0.25, 0.5]), hi = lo + pick([0.25, 0.5]); if (hi > 1) return null; const p = pdfInt([-6, 6, 0], lo, hi);
          return { q: T`$X$ has p.d.f. $f(x)=6x(1-x)$ for $0\le x\le1$. Find $P(${lo}\lt X\lt${hi})$.`, fields: [{ label: 'P', ans: p }], sol: T`$\int_{${lo}}^{${hi}}(6x-6x^2)\,dx=\big[3x^2-2x^3\big]_{${lo}}^{${hi}}=${num(p, 4)}$.` }; },
      ],
    },
    {
      id: 'f2_geo', title: 'The geometric distribution', sims: ['f2_dist'],
      notes: T`<p>$X\sim\text{Geo}(p)$ counts the number of trials up to and including the <b>first success</b>, when independent trials each succeed with probability $p$:</p>
$$P(X=r)=(1-p)^{r-1}p,\quad r=1,2,3,\dots\qquad P(X\gt r)=(1-p)^r,\quad P(X\le r)=1-(1-p)^r$$
<p>$E(X)=\dfrac1p$, $\ \operatorname{Var}(X)=\dfrac{1-p}{p^2}$. Unlike the binomial, the number of trials is not fixed.</p>`,
      drills: [
        () => { const p = pick([0.1, 0.2, 0.25, 0.3, 1 / 6, 0.4]), r = ri(1, 6); return { q: T`$X\sim\text{Geo}(${nice(p)})$. Find $P(X=${r})$.`, fields: [{ label: 'P', ans: (1 - p) ** (r - 1) * p }], sol: T`$(1-p)^{${r - 1}}p=\left(${nice(1 - p)}\right)^{${r - 1}}\times${nice(p)}=${num((1 - p) ** (r - 1) * p, 4)}$.` }; },
        () => { const p = pick([0.1, 0.15, 0.2, 0.3, 1 / 6]), r = ri(2, 8), gt = Math.random() < 0.5; const v = gt ? (1 - p) ** r : 1 - (1 - p) ** r; return { q: T`A player keeps rolling until she succeeds; each attempt succeeds with probability $${nice(p)}$. Find the probability that she needs ${gt ? `more than $${r}$` : `at most $${r}$`} attempts.`, fields: [{ label: 'P', ans: v }],
          sol: T`${gt ? `More than $${r}$ means the first $${r}$ all fail: $(${nice(1 - p)})^{${r}}=${num(v, 4)}$.` : `$1-(${nice(1 - p)})^{${r}}=${num(v, 4)}$.`}` }; },
        () => { const p = pick([0.1, 0.2, 0.25, 0.4, 0.5]); return { q: T`$X\sim\text{Geo}(${p})$. Find $E(X)$ and $\operatorname{Var}(X)$.`, fields: [{ label: 'E(X)', ans: 1 / p }, { label: 'Var(X)', ans: (1 - p) / (p * p) }], sol: T`$E=\frac1p=${nice(1 / p)}$; $\operatorname{Var}=\frac{1-p}{p^2}=${nice((1 - p) / (p * p))}$.` }; },
        () => { const p = pick([0.05, 0.1, 0.15, 0.2]), c = pick([0.9, 0.95, 0.99]); const n = Math.ceil(Math.log(1 - c) / Math.log(1 - p)); return { q: T`Each attempt succeeds with probability $${p}$. Find the least number of attempts $n$ such that the probability of at least one success in $n$ attempts exceeds $${c}$.`, fields: [{ label: 'n', ans: n }],
          sol: T`$1-${1 - p}^n\gt${c}\Rightarrow${1 - p}^n\lt${num(1 - c)}\Rightarrow n\gt\frac{\ln${num(1 - c)}}{\ln${1 - p}}=${num(Math.log(1 - c) / Math.log(1 - p), 4)}$, so $n=${n}$.` }; },
      ],
    },
    {
      id: 'f2_pois', title: 'The Poisson distribution', sims: ['f2_dist'],
      notes: T`<p>$X\sim\text{Po}(\lambda)$ models the number of events in a fixed interval when events occur <b>singly</b>, <b>independently</b> and at a <b>constant average rate</b> $\lambda$:</p>
$$P(X=r)=\frac{e^{-\lambda}\lambda^r}{r!},\quad r=0,1,2,\dots\qquad E(X)=\operatorname{Var}(X)=\lambda$$
<ul><li>Scale the rate to the interval: $3$ per hour gives $\text{Po}(6)$ for two hours.</li><li>Means and variances: binomial $np$, $np(1-p)$; geometric $\frac1p$, $\frac{1-p}{p^2}$; Poisson $\lambda$, $\lambda$. A mean close to the variance in data suggests a Poisson model.</li></ul>`,
      drills: [
        () => { const l = pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), r = ri(0, 5); return { q: T`$X\sim\text{Po}(${l})$. Find $P(X=${r})$.`, fields: [{ label: 'P', ans: ST.poisPMF(l, r) }], sol: T`$\frac{e^{-${l}}${l}^{${r}}}{${r}!}=${num(ST.poisPMF(l, r), 4)}$.` }; },
        () => { const l = pick([1.5, 2, 3, 3.5, 4, 5, 6]), r = ri(1, 6), ge = Math.random() < 0.5; const v = ge ? 1 - ST.poisCDF(l, r - 1) : ST.poisCDF(l, r); return { q: T`$X\sim\text{Po}(${l})$. Find $P(X${ge ? '\\ge' : '\\le'}${r})$.`, fields: [{ label: 'P', ans: v }], sol: T`${ge ? `$1-P(X\\le${r - 1})=1-${num(ST.poisCDF(l, r - 1), 4)}=${num(v, 4)}$` : `$P(X\\le${r})=${num(v, 4)}$ (tables or sum the terms)`}.` }; },
        () => { const rate = pick([1.5, 2, 2.5, 3, 4]), t = pick([2, 3, 0.5]), r = ri(0, 4); const l = rate * t; return { q: T`Calls arrive at a rate of $${rate}$ per minute, at random. Find the probability of exactly $${r}$ calls in $${t}$ minutes.`, fields: [{ label: 'P', ans: ST.poisPMF(l, r) }], sol: T`Scale the rate: $X\sim\text{Po}(${num(l)})$. $P(X=${r})=\frac{e^{-${num(l)}}${num(l)}^{${r}}}{${r}!}=${num(ST.poisPMF(l, r), 4)}$.` }; },
        () => { const d = pick(['bin', 'geo', 'poi']), n = ri(10, 40), p = pick([0.1, 0.2, 0.25, 0.4]), l = pick([2, 3.5, 4, 6]); const [E, Vr, nm] = d === 'bin' ? [n * p, n * p * (1 - p), `B(${n},\\ ${p})`] : d === 'geo' ? [1 / p, (1 - p) / (p * p), `\\text{Geo}(${p})`] : [l, l, `\\text{Po}(${l})`];
          return { q: T`Find the mean and variance of $X\sim ${nm}$.`, fields: [{ label: 'mean', ans: E }, { label: 'variance', ans: Vr }], sol: T`${d === 'bin' ? `$np=${num(E)}$, $np(1-p)=${num(Vr)}$` : d === 'geo' ? `$\\frac1p=${nice(E)}$, $\\frac{1-p}{p^2}=${nice(Vr)}$` : `Both equal $\\lambda=${l}$`}.` }; },
        () => { const L = [['the number of typing errors on a page', 'Poisson'], ['the number of throws of a die needed to get the first six', 'geometric'], ['the number of heads in 20 tosses of a coin', 'binomial'], ['the number of cars passing a point on a quiet road in a minute', 'Poisson'], ['the number of attempts needed to pass a driving test, with constant probability of passing', 'geometric']];
          const [c, r] = pick(L), opts = ['binomial', 'geometric', 'Poisson']; return { q: T`Which distribution best models ${c}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r === 'Poisson' ? 'Events occurring singly and independently at a constant average rate in an interval: Poisson.' : r === 'geometric' ? 'Trials until the first success: geometric.' : 'A fixed number of independent trials with constant probability: binomial.'}` }; },
      ],
    },
    {
      id: 'f2_pmcc', title: 'Correlation: the PMCC & variables', sims: ['m2_scatter'],
      notes: T`$$S_{xx}=\sum x^2-\frac{(\sum x)^2}n,\quad S_{yy}=\sum y^2-\frac{(\sum y)^2}n,\quad S_{xy}=\sum xy-\frac{\sum x\sum y}n,\qquad r=\frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$$
<ul><li>$-1\le r\le1$: close to $\pm1$ is strong <b>linear</b> correlation; near $0$, little linear correlation (there may still be a non-linear relationship).</li><li>The <b>explanatory</b> (independent) variable is the one controlled or used to predict; the <b>response</b> (dependent) variable is the one that responds.</li>
<li>Limitations: $r$ only measures linear association, is affected by outliers, and correlation does not imply causation.</li></ul>`,
      drills: [
        () => { const xs = Array.from({ length: ri(5, 7) }, () => ri(1, 20)), b = pick([-2, -1, 1, 2, 0.5]), ys = xs.map(x => Math.round(b * x + ri(-6, 6) + 20)); const n = xs.length, Sxx = ST.Sxx(xs), Syy = ST.Sxx(ys), Sxy = ST.Sxy(xs, ys); if (!Sxx || !Syy) return null; const r = Sxy / Math.sqrt(Sxx * Syy);
          return { q: T`${stab([['$x$', ...xs], ['$y$', ...ys]])}Calculate the product-moment correlation coefficient.`, fields: [{ label: 'r', ans: r, tol: { abs: 0.002 } }],
            sol: T`$S_{xx}=${num(Sxx, 5)}$, $S_{yy}=${num(Syy, 5)}$, $S_{xy}=${num(Sxy, 5)}$. $r=\frac{${num(Sxy, 5)}}{\sqrt{${num(Sxx, 5)}\times${num(Syy, 5)}}}=${num(r, 4)}$.` }; },
        () => { const Sxx = ri(20, 200), Syy = ri(20, 200), r0 = ri(-95, 95) / 100, Sxy = +(r0 * Math.sqrt(Sxx * Syy)).toFixed(1); const r = Sxy / Math.sqrt(Sxx * Syy); return { q: T`For a set of bivariate data, $S_{xx}=${Sxx}$, $S_{yy}=${Syy}$ and $S_{xy}=${Sxy}$. Find $r$.`, fields: [{ label: 'r', ans: r, tol: { abs: 0.001 } }], sol: T`$r=\frac{${Sxy}}{\sqrt{${Sxx}\times${Syy}}}=${num(r, 4)}$.` }; },
        () => { const L = [['the dose of fertiliser given to plants', 'the height of the plants'], ['the number of hours revised', 'the exam mark'], ['the daily temperature', 'the number of ice creams sold'], ['the age of a car', 'its value']];
          const [x, y] = pick(L), opts = shuffle([x, y]); return { q: T`Data are collected on ${x} and ${y}. Which is the explanatory variable?`, mc: { options: opts, correct: opts.indexOf(x) }, sol: T`${x[0].toUpperCase() + x.slice(1)} is explanatory: it is set or varies first, and ${y} responds to it (the response variable).` }; },
        () => { const L = [['$r=0.05$ for points lying close to a parabola', 'There may be a strong non-linear relationship that r does not measure'], ['$r=0.9$ between ice-cream sales and drownings', 'Correlation does not imply causation: both depend on hot weather'], ['$r=0.8$ caused mostly by one extreme point', 'The PMCC is strongly affected by outliers']];
          const [c, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`Comment on ${c}.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
      ],
    },
    {
      id: 'f2_reg', title: 'Least squares regression & prediction', sims: ['m2_scatter'],
      notes: T`<p>The <b>least squares regression line</b> of $y$ on $x$ minimises the sum of squared vertical distances from the points: $$y=a+bx,\qquad b=\frac{S_{xy}}{S_{xx}},\qquad a=\bar y-b\bar x.$$ It passes through $(\bar x,\bar y)$.</p>
<ul><li>Use it to predict the response from a value of the explanatory variable <b>within the range of the data</b> (interpolation).</li><li><b>Extrapolation</b> (outside the range) is unreliable: the linear pattern may not continue.</li><li>$b$ is the change in $y$ per unit increase in $x$ — interpret it in context.</li></ul>`,
      drills: [
        () => { const n = ri(6, 10), sx = ri(30, 80), sy = ri(50, 200); const Sxx = ri(40, 200), b0 = pick([-1.5, -0.8, 0.6, 1.2, 2.5]), Sxy = +(b0 * Sxx).toFixed(1); const b = Sxy / Sxx, a = sy / n - b * sx / n;
          return { q: T`For $${n}$ pairs of data, $\sum x=${sx}$, $\sum y=${sy}$, $S_{xx}=${Sxx}$ and $S_{xy}=${Sxy}$. Find the equation of the regression line of $y$ on $x$ in the form $y=a+bx$.`, fields: [{ label: 'a', ans: a, tol: { abs: 0.01 } }, { label: 'b', ans: b, tol: { abs: 0.001 } }],
            sol: T`$b=\frac{${Sxy}}{${Sxx}}=${num(b, 4)}$. $\bar x=${num(sx / n, 4)}$, $\bar y=${num(sy / n, 4)}$, $a=\bar y-b\bar x=${num(a, 4)}$.` }; },
        () => { const a = ri(5, 40), b = pick([-1.2, -0.5, 0.75, 1.5, 2.4]), lo = ri(2, 10), hi = lo + ri(10, 20), x = ri(lo + 1, hi - 1); return { q: T`The regression line of $y$ on $x$ is $y=${a}${b < 0 ? '-' : '+'}${Math.abs(b)}x$, calculated from data with $${lo}\le x\le${hi}$. Estimate $y$ when $x=${x}$.`, fields: [{ label: 'y', ans: a + b * x }], sol: T`$y=${a}${b < 0 ? '-' : '+'}${Math.abs(b)}(${x})=${num(a + b * x, 4)}$. $x=${x}$ is within the data range, so this interpolation is reasonably reliable.` }; },
        () => { const opts = ['It is outside the range of the data, so the relationship may not hold (extrapolation)', 'It is reliable because the line is a line of best fit', 'Regression lines cannot be used for predictions', 'It is reliable as long as r is positive'];
          return { q: T`Data on the age of trees (5 to 40 years) give a regression line for height. A student uses it to predict the height of a 150-year-old tree. Comment.`, mc: { options: opts, correct: 0 }, sol: T`Extrapolation: trees stop growing linearly, so a prediction far outside $5$–$40$ years is unreliable.` }; },
        () => { const sc = pick([1, 2]), xs = [1, 2, 3, 4, 5].map(x => x * sc), b0 = pick([2, 3, -2]), ys = xs.map(x => b0 * x + ri(-2, 2) + 10); const b = ST.Sxy(xs, ys) / ST.Sxx(xs), a = ST.mean(ys) - b * ST.mean(xs);
          return { q: T`${stab([['$x$', ...xs], ['$y$', ...ys]])}Find the least squares regression line $y=a+bx$.`, fields: [{ label: 'a', ans: a, tol: { abs: 0.01 } }, { label: 'b', ans: b, tol: { abs: 0.001 } }],
            sol: T`$S_{xy}=${num(ST.Sxy(xs, ys), 5)}$, $S_{xx}=${num(ST.Sxx(xs), 5)}$, $b=${num(b, 4)}$; $a=${num(ST.mean(ys), 4)}-${par(num(b, 4))}(${num(ST.mean(xs), 4)})=${num(a, 4)}$.` }; },
      ],
    },
    /* ======================= SECTION D: DISCRETE & DECISION ======================= */
    {
      id: 'f2_grp', title: 'Groups: axioms, order & period', sims: ['f2_cayley'],
      notes: T`<p>A <b>group</b> $(G,*)$ is a set with a binary operation satisfying:</p><ol><li><b>Closure</b>: $a*b\in G$ for all $a,b\in G$.</li><li><b>Associativity</b>: $(a*b)*c=a*(b*c)$.</li><li><b>Identity</b>: some $e\in G$ has $e*a=a*e=a$ for all $a$.</li><li><b>Inverses</b>: each $a$ has $a^{-1}\in G$ with $a*a^{-1}=a^{-1}*a=e$.</li></ol>
<ul><li>The <b>order</b> of a group is the number of elements. The <b>period</b> (order) of an element $a$ is the least $n\ge1$ with $a^n=e$.</li><li>Examples: $(\mathbb Z_n,+_n)$; $(\{1,\dots,p-1\},\times_p)$ for prime $p$; symmetries of a shape; non-singular $2\times2$ matrices under multiplication.</li><li>In a Cayley table of a group, every element appears exactly once in each row and column.</li></ul>`,
      drills: [
        () => { const L = [['$(\\mathbb Z,+)$', 'a group', ''], ['$(\\mathbb Z,-)$', 'not a group: subtraction is not associative', ''], ['$(\\mathbb N,+)$ (with $0$)', 'not a group: no inverses (e.g. for 3)', ''], ['$(\\mathbb Z,\\times)$', 'not a group: most elements have no inverse', ''], ['$(\\{1,-1,i,-i\\},\\times)$', 'a group', ''], ['$(\\{0,1,2,3\\},\\times_4)$', 'not a group: 0 and 2 have no inverse', ''], ['$(\\{1,2,3,4\\},\\times_5)$', 'a group', '']];
          const [s, r] = pick(L), opts = shuffle([...new Set(L.map(x => x[1]))]).slice(0, 4); if (!opts.includes(r)) opts[0] = r; return { q: T`Is ${s} a group?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${s}: ${r}.` }; },
        () => { const p = pick([5, 7, 11, 13]), a = ri(2, p - 1); let inv = 1; while ((a * inv) % p !== 1) inv++; return { q: T`In the group $(\{1,2,\dots,${p - 1}\},\times_{${p}})$, find the inverse of $${a}$.`, fields: [{ label: 'inverse', ans: inv }], sol: T`$${a}\times${inv}=${a * inv}=${(a * inv - 1) / p}\times${p}+1\equiv1\pmod{${p}}$, so $${a}^{-1}=${inv}$.` }; },
        () => { const n = pick([6, 8, 9, 10, 12, 15]), a = ri(1, n - 1); return { q: T`Find the period (order) of the element $${a}$ in $(\mathbb Z_{${n}},+_{${n}})$.`, fields: [{ label: 'period', ans: n / gcdI(a, n) }], sol: T`The least $k$ with $${a}k\equiv0\pmod{${n}}$: $k=\frac{${n}}{\gcd(${a},${n})}=${n / gcdI(a, n)}$.` }; },
        () => { const p = pick([5, 7, 11, 13]), a = ri(2, p - 1); return { q: T`Find the period of $${a}$ in the group $(\{1,\dots,${p - 1}\},\times_{${p}})$.`, fields: [{ label: 'period', ans: ordMod(a, p) }], sol: T`Powers of $${a}$ mod $${p}$: ${Array.from({ length: ordMod(a, p) }, (_, k) => `$${a}^{${k + 1}}\\equiv${(a ** (k + 1)) % p}$`).slice(0, 8).join(', ')}. First reaches $1$ at power $${ordMod(a, p)}$.` }; },
        () => { const n = pick([4, 5, 6, 8, 10]); return { q: T`What is the identity of $(\mathbb Z_{${n}},+_{${n}})$, and the inverse of $${n - 1}$?`, fields: [{ label: 'identity', ans: 0 }, { label: 'inverse', ans: 1 }], sol: T`Identity $0$; $${n - 1}+1=${n}\equiv0$, so the inverse of $${n - 1}$ is $1$.` }; },
      ],
    },
    {
      id: 'f2_sub', title: 'Subgroups, Lagrange & cyclic groups', sims: ['f2_cayley'],
      notes: T`<ul><li>A <b>subgroup</b> $H$ of $G$ is a subset that is itself a group under the same operation (check closure, identity, inverses; associativity is inherited). <b>Proper</b> subgroups exclude $G$ itself (and usually $\{e\}$ is called trivial).</li>
<li><b>Lagrange's theorem</b>: the order of a subgroup of a finite group divides the order of the group. So the period of every element divides $|G|$.</li><li>$G$ is <b>cyclic</b> if some element $g$ — a <b>generator</b> — has every element as a power of $g$: $G=\langle g\rangle$. Then $g$ has period $|G|$.</li><li>$\mathbb Z_n$ is cyclic; $k$ generates it ⇔ $\gcd(k,n)=1$.</li></ul>`,
      drills: [
        () => { const n = pick([6, 8, 10, 12, 15, 18, 20]), divs = Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d === 0), non = Array.from({ length: n }, (_, i) => i + 1).filter(d => n % d !== 0); const r = pick(divs), opts = shuffle([r, ...shuffle(non).slice(0, 3)]);
          return { q: T`A group has order $${n}$. Which of these could be the order of a subgroup?`, mc: { options: opts.map(String), correct: opts.indexOf(r) }, sol: T`By Lagrange, subgroup orders divide $${n}$: possible orders $${divs.join(',')}$.` }; },
        () => { const n = pick([6, 8, 9, 10, 12, 14, 15]), cnt = Array.from({ length: n }, (_, i) => i).filter(k => gcdI(k, n) === 1).length; return { q: T`How many elements generate the cyclic group $(\mathbb Z_{${n}},+_{${n}})$?`, fields: [{ label: 'generators', ans: cnt }], sol: T`$k$ generates ⇔ $\gcd(k,${n})=1$: ${Array.from({ length: n }, (_, i) => i).filter(k => gcdI(k, n) === 1).join(', ')} — that is $${cnt}$.` }; },
        () => { const n = pick([8, 10, 12, 15, 18]), a = ri(2, n - 1); const H = []; for (let k = 0, x = 0; k < n; k++, x = (x + a) % n) if (!H.includes(x)) H.push(x); return { q: T`Find the order of the subgroup of $(\mathbb Z_{${n}},+_{${n}})$ generated by $${a}$.`, fields: [{ label: 'order', ans: H.length }],
          sol: T`$\langle${a}\rangle=\{${[...H].sort((x, y) => x - y).join(',')}\}$, of order $${H.length}=\frac{${n}}{\gcd(${a},${n})}$ — a divisor of $${n}$, as Lagrange requires.` }; },
        () => { const p = pick([5, 7, 11, 13]), a = ri(2, p - 1), gen = ordMod(a, p) === p - 1, opts = ['Yes — it is a generator', 'No — it is not a generator']; return { q: T`Is $${a}$ a generator of the cyclic group $(\{1,\dots,${p - 1}\},\times_{${p}})$?`, mc: { options: opts, correct: gen ? 0 : 1 },
          sol: T`The period of $${a}$ is $${ordMod(a, p)}$${gen ? `$=${p - 1}$, the order of the group, so it generates every element` : `, less than $${p - 1}$, so it only generates a subgroup of order $${ordMod(a, p)}$`}.` }; },
      ],
    },
    {
      id: 'f2_iso', title: 'Isomorphism', sims: ['f2_cayley'],
      notes: T`<ul><li>Groups $G$ and $H$ are <b>isomorphic</b> ($G\cong H$) if there is a one-to-one correspondence $\phi:G\to H$ with $\phi(a*b)=\phi(a)\circ\phi(b)$ — they have the same structure, just different labels.</li>
<li>Isomorphic groups have the same order, the same number of elements of each period, and are both cyclic or both not.</li><li>Every group of order $4$ is either cyclic ($\cong\mathbb Z_4$) or the Klein four-group $V_4$ (every non-identity element has period 2). Every group of prime order is cyclic.</li></ul>`,
      drills: [
        () => { const L = [['$(\\mathbb Z_4,+_4)$ and $(\\{1,2,3,4\\},\\times_5)$', true, 'Both cyclic of order 4 (1 and 2 are generators).'], ['$(\\mathbb Z_4,+_4)$ and the Klein four-group $V_4$', false, '$\\mathbb Z_4$ has an element of period 4; $V_4$ does not.'], ['$(\\{1,3,5,7\\},\\times_8)$ and $V_4$', true, 'Every non-identity element of $\\{1,3,5,7\\}$ under $\\times_8$ has period 2.'], ['$(\\mathbb Z_6,+_6)$ and $(\\{1,2,3,4,5,6\\},\\times_7)$', true, 'Both cyclic of order 6 (3 generates the second).'], ['$(\\{1,-1,i,-i\\},\\times)$ and $(\\mathbb Z_4,+_4)$', true, '$i$ has period 4, so it is cyclic of order 4.'], ['$(\\mathbb Z_6,+_6)$ and the symmetries of an equilateral triangle', false, 'The triangle group is not abelian (and not cyclic).']];
          const [g, ok, why] = pick(L), opts = ['Isomorphic', 'Not isomorphic']; return { q: T`Are ${g} isomorphic?`, mc: { options: opts, correct: ok ? 0 : 1 }, sol: T`${why}` }; },
        () => { const n = pick([4, 6, 8, 10, 12]), cnt = Array.from({ length: n }, (_, k) => k).filter(k => k && n / gcdI(k, n) === 2).length; return { q: T`How many elements of period $2$ are there in $(\mathbb Z_{${n}},+_{${n}})$?`, fields: [{ label: 'count', ans: cnt }], sol: T`Only $${n / 2}$ (since $2\times${n / 2}\equiv0$). A cyclic group has at most one element of period 2.` }; },
        () => { const k = ri(0, 3); return { q: T`$\phi:(\mathbb Z_4,+_4)\to(\{1,2,3,4\},\times_5)$ is the isomorphism with $\phi(1)=2$. Find $\phi(${k})$.`, fields: [{ label: 'φ', ans: (2 ** k) % 5 }], sol: T`$\phi(k)=2^k\bmod5$: $\phi(${k})=2^{${k}}\bmod5=${(2 ** k) % 5}$.` }; },
      ],
    },
    {
      id: 'f2_graph', title: 'Graph theory: terms & standard graphs', sims: ['f2_graph'],
      notes: T`<ul><li>A <b>graph</b> has vertices (nodes) joined by edges (arcs). The <b>degree</b> of a vertex is the number of edge-ends there. <b>Handshaking lemma</b>: $\sum\deg=2\times(\text{number of edges})$, so the number of odd vertices is even.</li>
<li>A <b>subgraph</b> uses some of the vertices and edges. A graph is <b>planar</b> if it can be drawn with no edges crossing.</li><li>$K_n$ (complete: every pair joined) has $\binom n2$ edges; $K_{m,n}$ (complete bipartite) has $mn$; the star $S_n$ (one centre joined to $n-1$ others) has $n-1$. $K_5$ and $K_{3,3}$ are not planar.</li>
<li><b>Weighted</b> graphs carry numbers (lengths, costs) on edges. In a <b>digraph</b> edges have directions; $\sum\text{in-degrees}=\sum\text{out-degrees}=$ number of arcs.</li></ul>`,
      drills: [
        () => { let d; const nv = ri(5, 7); do d = Array.from({ length: nv }, () => ri(1, Math.min(5, nv - 1))); while (d.reduce((s, x) => s + x) % 2); return { q: T`A graph has vertices of degrees $${d.join(',\\ ')}$. How many edges does it have?`, fields: [{ label: 'edges', ans: d.reduce((s, x) => s + x) / 2 }], sol: T`Handshaking: $\frac{${d.reduce((s, x) => s + x)}}{2}=${d.reduce((s, x) => s + x) / 2}$.` }; },
        () => { const t = pick(['K', 'Kmn', 'S']), n = ri(4, 9), m = ri(2, 5); const [nm, e] = t === 'K' ? [`K_{${n}}`, n * (n - 1) / 2] : t === 'Kmn' ? [`K_{${m},${n}}`, m * n] : [`S_{${n}}`, n - 1]; return { q: T`How many edges does $${nm}$ have?`, fields: [{ label: 'edges', ans: e }], sol: T`${t === 'K' ? `$\\binom{${n}}{2}=${e}$` : t === 'Kmn' ? `Each of the $${m}$ is joined to each of the $${n}$: $${e}$` : `The centre is joined to the other $${n - 1}$: $${e}$`}.` }; },
        () => { const L = [['K_4', true], ['K_5', false], ['K_{3,3}', false], ['K_{2,5}', true], ['S_8', true], ['K_{2,3}', true]]; const [g, ok] = pick(L), opts = ['Planar', 'Not planar']; return { q: T`Is $${g}$ planar?`, mc: { options: opts, correct: ok ? 0 : 1 }, sol: T`${ok ? 'It can be drawn without crossings.' : `$${g}$ is one of the two basic non-planar graphs (Kuratowski).`}` }; },
        () => { let d; do d = Array.from({ length: 5 }, () => ri(0, 4)); while (d.reduce((s, x) => s + x) % 2 === 0); const opts = ['It is impossible: the sum of degrees is odd', 'It is possible', 'It is possible only as a digraph', 'It must be a tree']; return { q: T`Can a simple graph have degree sequence $${d.join(',\\ ')}$?`, mc: { options: opts, correct: 0 }, sol: T`Sum $=${d.reduce((s, x) => s + x)}$, which is odd — the handshaking lemma needs an even total.` }; },
      ],
    },
    {
      id: 'f2_trav', title: 'Traversability: Eulerian & Hamiltonian', sims: ['f2_graph'],
      notes: T`<ul><li>A <b>trail</b> uses each edge at most once; a <b>circuit</b> (cycle) returns to its start.</li><li><b>Eulerian circuit</b> (uses every edge exactly once, returns to start): exists in a connected graph ⇔ <b>every vertex has even degree</b>.</li>
<li><b>Semi-Eulerian</b> (an Eulerian trail, not closed): exactly two odd vertices — start at one, finish at the other.</li><li><b>Hamiltonian path/cycle</b>: visits every <b>vertex</b> exactly once. No simple test; $K_n$ ($n\ge3$) always has one, with $\frac{(n-1)!}2$ distinct Hamiltonian cycles.</li></ul>`,
      drills: [
        () => { let d; const nv = ri(4, 6); do d = Array.from({ length: nv }, () => ri(1, nv - 1)); while (d.reduce((s, x) => s + x) % 2); const odd = d.filter(x => x % 2).length; const r = odd === 0 ? 'Eulerian (an Eulerian circuit exists)' : odd === 2 ? 'semi-Eulerian (an Eulerian trail, not a circuit)' : 'neither'; const opts = ['Eulerian (an Eulerian circuit exists)', 'semi-Eulerian (an Eulerian trail, not a circuit)', 'neither'];
          return { q: T`A connected graph has vertex degrees $${d.join(',\\ ')}$. Is it Eulerian, semi-Eulerian or neither?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`It has $${odd}$ odd vertices: ${odd === 0 ? 'all even ⇒ Eulerian' : odd === 2 ? 'exactly two ⇒ semi-Eulerian' : 'more than two ⇒ neither'}.` }; },
        () => { const n = ri(3, 9), opts = ['Yes', 'No']; return { q: T`Does $K_{${n}}$ have an Eulerian circuit?`, mc: { options: opts, correct: n % 2 ? 0 : 1 }, sol: T`Each vertex has degree $${n - 1}$, which is ${n % 2 ? 'even — yes' : 'odd — no'}. ($K_n$ is Eulerian exactly when $n$ is odd.)` }; },
        () => { const n = ri(4, 8); return { q: T`How many distinct Hamiltonian cycles does $K_{${n}}$ have (a cycle and its reverse count as the same)?`, fields: [{ label: 'cycles', ans: fact(n - 1) / 2 }], sol: T`Fix the start; arrange the other $${n - 1}$ vertices: $${n - 1}!$, then halve for direction: $${fact(n - 1) / 2}$.` }; },
        () => { const m = ri(2, 5), n = ri(2, 5), opts = ['Yes', 'No']; return { q: T`Does $K_{${m},${n}}$ have a Hamiltonian cycle?`, mc: { options: opts, correct: m === n ? 0 : 1 }, sol: T`A cycle must alternate between the two sides, so it needs equal numbers: ${m === n ? 'yes' : 'no'}.` }; },
      ],
    },
    {
      id: 'f2_tree', title: 'Trees & spanning trees', sims: ['f2_graph'],
      notes: T`<ul><li>A graph is <b>connected</b> if there is a path between every pair of vertices. A <b>tree</b> is a connected graph with no cycles; a tree on $n$ vertices has $n-1$ edges.</li>
<li>A <b>spanning tree</b> of a connected graph is a subgraph that is a tree containing every vertex — remove $E-V+1$ edges from a connected graph with $V$ vertices and $E$ edges.</li><li>A <b>rooted</b> tree has a chosen root. In a <b>binary tree</b> every node has at most two children (left and right); depth $d$ holds at most $2^d$ nodes.</li></ul>`,
      drills: [
        () => { const n = ri(5, 30); return { q: T`How many edges does a tree with $${n}$ vertices have?`, fields: [{ label: 'edges', ans: n - 1 }], sol: T`A tree on $n$ vertices has $n-1$ edges: $${n - 1}$.` }; },
        () => { const V = ri(5, 10), E = V - 1 + ri(1, 6); return { q: T`A connected graph has $${V}$ vertices and $${E}$ edges. How many edges must be removed to leave a spanning tree?`, fields: [{ label: 'edges removed', ans: E - V + 1 }], sol: T`A spanning tree keeps $${V - 1}$ edges: remove $${E}-${V - 1}=${E - V + 1}$.` }; },
        () => { const h = ri(2, 5); return { q: T`What is the greatest number of nodes in a binary tree of height $${h}$ (the root is at depth $0$)?`, fields: [{ label: 'nodes', ans: 2 ** (h + 1) - 1 }], sol: T`$1+2+4+\dots+2^{${h}}=2^{${h + 1}}-1=${2 ** (h + 1) - 1}$.` }; },
        () => { const L = [['a tree', 'A connected graph with no cycles'], ['a spanning tree of G', 'A tree that is a subgraph of G and includes every vertex of G'], ['a connected graph', 'A graph with a path between every pair of vertices'], ['a binary tree', 'A rooted tree in which each node has at most two children']]; const [t, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`What is ${t}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
      ],
    },
    {
      id: 'f2_cpa', title: 'Critical path analysis', sims: ['f2_cpa'],
      notes: T`<ul><li>An <b>algorithm</b> is a finite sequence of precise instructions; a <b>greedy</b> algorithm makes the best-looking choice at each step.</li><li>A <b>precedence table</b> lists each activity, its duration and its immediate predecessors; draw the activity network from it.</li>
<li><b>Forward pass</b>: earliest start of an activity $=$ the latest earliest finish of its predecessors; the project's minimum duration is the largest finish time.</li><li><b>Backward pass</b>: latest finish $=$ the smallest latest start of its successors.</li>
<li><b>Float</b> $=$ latest finish $-$ earliest start $-$ duration. <b>Critical activities</b> have zero float; they form the <b>critical path</b>. Delaying them delays the project.</li></ul>`,
      drills: [
        () => { const pre = { A: [], B: [], C: ['A'], D: ['A'], E: ['B', 'C'], F: ['D'], G: ['E', 'F'] }, ids = Object.keys(pre), dur = Object.fromEntries(ids.map(k => [k, ri(1, 9)]));
          const es = {}, ef = {}; ids.forEach(k => { es[k] = Math.max(0, ...pre[k].map(p => ef[p])); ef[k] = es[k] + dur[k]; }); const T_ = Math.max(...ids.map(k => ef[k]));
          const lf = {}; [...ids].reverse().forEach(k => { const succ = ids.filter(s => pre[s].includes(k)); lf[k] = succ.length ? Math.min(...succ.map(s => lf[s] - dur[s])) : T_; }); const fl = Object.fromEntries(ids.map(k => [k, lf[k] - es[k] - dur[k]]));
          const ask = pick(ids.filter(k => fl[k] > 0)) || 'A';
          return { q: T`${stab(ids.map(k => [k, dur[k], pre[k].join(', ') || '—']), ['Activity', 'Duration (days)', 'Preceded by'])}Find the minimum time to complete the project and the float of activity ${ask}.`, fields: [{ label: 'minimum time', ans: T_ }, { label: `float of ${ask}`, ans: fl[ask] }],
            sol: T`Forward pass (earliest start/finish): ${ids.map(k => `${k} ${es[k]}–${ef[k]}`).join('; ')}. Minimum time $${T_}$ days. Backward pass: latest finish of ${ask} $=${lf[ask]}$; float $=${lf[ask]}-${es[ask]}-${dur[ask]}=${fl[ask]}$. Critical: ${ids.filter(k => !fl[k]).join(', ')}.` }; },
        () => { const L = [['Prim\'s algorithm', 'It adds the cheapest edge joining the tree to a new vertex at each step'], ['the nearest neighbour method', 'It always moves to the closest unvisited vertex'], ['a greedy algorithm', 'It makes the locally best choice at each step without looking ahead']]; const [t, r] = pick(L), opts = shuffle([r, 'It checks every possible solution', 'It works backwards from the final answer', 'It chooses edges at random']);
          return { q: T`Why is ${t} described as greedy?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
      ],
    },
    {
      id: 'f2_prim', title: "Prim's algorithm: minimum spanning trees", sims: ['f2_graph'],
      notes: T`<p><b>Prim's algorithm</b> finds a minimum spanning tree (minimum connector) of a connected weighted graph:</p><ol><li>Start at any vertex.</li><li>Add the shortest edge joining a vertex <b>in</b> the tree to a vertex <b>not yet in</b> it.</li><li>Repeat until every vertex is included ($n-1$ edges).</li></ol>
<p>It is greedy but always optimal. On a distance matrix: cross out the chosen vertex's row, look down the columns of the tree's vertices for the smallest uncrossed entry.</p>`,
      drills: [
        () => { const E = randGraph(), T_ = prim(E), w = T_.reduce((s, e) => s + e[2], 0); return { q: T`${FIG.network(HEX, E, 'Weighted graph (lengths in km).')}Use Prim's algorithm, starting at A, to find the total length of a minimum spanning tree.`, fields: [{ label: 'total length', ans: w }],
          sol: T`Edges added in order: ${T_.map(e => `${e[0]}${e[1]} (${e[2]})`).join(', ')}. Total $${w}$ km.` }; },
        () => { const E = randGraph(), T_ = prim(E), k = ri(1, 4), e = T_[k]; if (T_.tie) return null; const right = `${e[0]}${e[1]}`, opts = shuffle([...new Set([right, ...shuffle(E.filter(x => `${x[0]}${x[1]}` !== right)).slice(0, 3).map(x => `${x[0]}${x[1]}`)])]); return { q: T`${FIG.network(HEX, E, '')}Using Prim's algorithm from A, which edge is added ${['first', 'second', 'third', 'fourth', 'fifth'][k]}?`, mc: { options: opts, correct: opts.indexOf(right) },
          sol: T`Order: ${T_.map(x => `${x[0]}${x[1]} (${x[2]})`).join(', ')}.` }; },
      ],
    },
    {
      id: 'f2_bfs', title: 'Binary trees: breadth-first & depth-first search', sims: [],
      notes: T`<ul><li><b>Breadth-first search</b> (BFS) visits the tree level by level: the root, then all nodes at depth 1 (left to right), then depth 2, …</li><li><b>Depth-first search</b> (DFS, pre-order) goes as deep as possible before backtracking: visit a node, then its whole left subtree, then its whole right subtree.</li>
<li>BFS uses a queue (first in, first out); DFS uses a stack (last in, first out).</li></ul>`,
      drills: [
        () => { const labs = shuffle('ABCDEFGHJK'.split('')).slice(0, 7), shape = pick([[[1, 2], [3, 4], [5, 6], [], [], [], []], [[1, 2], [3, null], [4, 5], [6, null], [], [], []], [[1, 2], [null, 3], [4, null], [5, 6], [], [], []]]); const kids = shape.map(c => (c || []).filter(x => x !== null && x !== undefined));
          const bfs = []; const q = [0]; while (q.length) { const v = q.shift(); bfs.push(v); q.push(...kids[v]); } const dfs = []; const go = v => { dfs.push(v); kids[v].forEach(go); }; go(0); const post = []; const gp = v => { kids[v].forEach(gp); post.push(v); }; gp(0);
          const depth = [0]; const pos = {}; const lay = (v, x0, x1, d) => { pos[v] = [(x0 + x1) / 2, 8 + d * 28]; const ks = shape[v] || []; ks.forEach((c, i) => { if (c === null || c === undefined) return; const n = ks.length || 1; lay(c, x0 + (x1 - x0) * i / 2, x0 + (x1 - x0) * (i + 1) / 2, d + 1); }); }; lay(0, 0, 100, 0);
          const nodes = Object.fromEntries(Object.entries(pos).map(([v, p]) => [labs[v], p])), edges = kids.flatMap((ks, v) => ks.map(c => [labs[v], labs[c], ''])); const want = pick(['BFS', 'DFS']), right = (want === 'BFS' ? bfs : dfs).map(v => labs[v]).join(' ');
          const opts = shuffle([...new Set([right, (want === 'BFS' ? dfs : bfs).map(v => labs[v]).join(' '), post.map(v => labs[v]).join(' '), [...bfs].reverse().map(v => labs[v]).join(' ')])]);
          return { q: T`${FIG.network(nodes, edges, 'A binary tree with root ' + labs[0] + '.', { h: 150 })}In which order does a ${want === 'BFS' ? 'breadth-first' : 'depth-first (pre-order)'} search visit the nodes?`, mc: { options: opts, correct: opts.indexOf(right) },
            sol: T`${want === 'BFS' ? 'Level by level, left to right' : 'Node, then left subtree, then right subtree'}: ${right}.` }; },
      ],
    },
    {
      id: 'f2_dijk', title: "Dijkstra's algorithm: shortest paths", sims: ['f2_graph'],
      notes: T`<p><b>Dijkstra's algorithm</b> finds the shortest path from a start vertex to every other vertex (non-negative weights):</p><ol><li>Give the start a permanent label $0$.</li><li>For each vertex joined to the newest permanent vertex, set a working value $=$ its permanent label $+$ the edge weight, if smaller than the current one.</li><li>Make the smallest working value permanent. Repeat until the destination is permanent.</li><li>Trace the route back from the destination using edges whose weight equals the difference of labels.</li></ol>`,
      drills: [
        () => { const E = randGraph(), { d, prev } = dijkstra(E, 'A'), path = ['F']; if (routes(E, 'A', 'F').filter(r => r[1] === d.F).length > 1) return null; while (path[0] !== 'A') path.unshift(prev[path[0]]); return { q: T`${FIG.network(HEX, E, 'Weighted graph (minutes).')}Use Dijkstra's algorithm to find the length of the shortest route from A to F.`, fields: [{ label: 'shortest time', ans: d.F }],
          sol: T`Permanent labels: ${Object.entries(d).map(([k, v]) => `${k} ${v}`).join(', ')}. Shortest route ${path.join(' → ')}, length $${d.F}$.` }; },
        () => { const E = randGraph(), { d, prev } = dijkstra(E, 'A'), t = pick(['D', 'E', 'F']), path = [t]; while (path[0] !== 'A') path.unshift(prev[path[0]]); const right = path.join(''), all = routes(E, 'A', t); if (all.filter(r => r[1] === d[t]).length > 1) return null; const alt = all.filter(r => r[0] !== right).sort((x, y) => x[1] - y[1]).slice(0, 3).map(r => r[0]); if (alt.length < 2) return null; const opts = shuffle([right, ...alt]);
          return { q: T`${FIG.network(HEX, E, '')}Which is the shortest route from A to ${t}?`, mc: { options: opts, correct: opts.indexOf(right) }, sol: T`Dijkstra gives ${t} the label $${d[t]}$, via ${path.join(' → ')}.` }; },
      ],
    },
    {
      id: 'f2_rec', title: 'Recurrence relations', sims: ['f2_rec'],
      notes: T`<ul><li>A recurrence model is a <b>recurrence relation</b> plus <b>initial conditions</b>, e.g. $u_{n+2}=u_{n+1}+u_n$, $u_0=0$, $u_1=1$ (Fibonacci).</li><li>First order $u_{n+1}=ku_n$: $u_n=u_0k^n$.</li>
<li>Second order $u_{n+2}=au_{n+1}+bu_n$: try $u_n=r^n$, giving the <b>auxiliary equation</b> $r^2=ar+b$.</li><li>Distinct roots $r_1,r_2$: $u_n=Ar_1^n+Br_2^n$. Repeated root $r$: $u_n=(A+Bn)r^n$. Find $A,B$ from the initial conditions.</li></ul>`,
      drills: [
        () => { let r1 = rnz(-3, 4), r2; do r2 = rnz(-3, 4); while (r2 === r1); if (r1 < r2) [r1, r2] = [r2, r1]; const A = rnz(-3, 3), Bc = rnz(-3, 3), u0 = A + Bc, u1 = A * r1 + Bc * r2, a = r1 + r2, b = -r1 * r2;
          return { q: T`Solve $u_{n+2}=${poly([[a, 'u_{n+1}'], [b, 'u_n']])}$ with $u_0=${u0}$, $u_1=${u1}$. Give $u_n=A(${r1})^n+B(${r2})^n$: find $A$ and $B$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: Bc }],
            sol: T`Auxiliary equation $r^2${sgn(-a)}r${sgn(-b)}=0$, roots $${r1}$, $${r2}$. $A+B=${u0}$, $${r1}A${sgn(r2)}B=${u1}$, so $A=${A}$, $B=${Bc}$.` }; },
        () => { const r = rnz(-3, 3), A = rnz(-3, 3), Bc = rnz(-3, 3), u0 = A, u1 = (A + Bc) * r; return { q: T`Solve $u_{n+2}=${poly([[2 * r, 'u_{n+1}'], [-r * r, 'u_n']])}$ with $u_0=${u0}$, $u_1=${u1}$, in the form $u_n=(A+Bn)(${r})^n$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: Bc }],
          sol: T`Auxiliary $r^2${sgn(-2 * r)}r+${r * r}=(r${sgn(-r)})^2$: repeated root $${r}$. $u_0=A=${A}$; $u_1=(A+B)(${r})=${u1}\Rightarrow B=${Bc}$.` }; },
        () => { const a = rnz(-2, 3), b = rnz(-2, 3), u0 = ri(-3, 3), u1 = ri(-3, 3), n = ri(4, 6); const u = [u0, u1]; for (let k = 2; k <= n; k++) u.push(a * u[k - 1] + b * u[k - 2]); return { q: T`$u_{n+2}=${poly([[a, 'u_{n+1}'], [b, 'u_n']])}$, $u_0=${u0}$, $u_1=${u1}$. Find $u_{${n}}$.`, fields: [{ label: `u_${n}`, ans: u[n] }], sol: T`$u_2,\dots,u_{${n}}$: $${u.slice(2).join(',\\ ')}$.` }; },
        () => { const k = pick([2, 3, 0.5, -2, 1.5]), u0 = ri(1, 10), n = ri(3, 8); return { q: T`$u_{n+1}=${k}u_n$, $u_0=${u0}$. Find $u_{${n}}$.`, fields: [{ label: `u_${n}`, ans: u0 * k ** n }], sol: T`$u_n=u_0k^n=${u0}(${k})^{${n}}=${num(u0 * k ** n, 6)}$.` }; },
      ],
    },
    {
      id: 'f2_bool', title: 'Boolean algebra & truth tables', sims: [],
      notes: T`<ul><li>Connectives: $\lnot p$ (not), $p\land q$ (and), $p\lor q$ (or, inclusive), $p\Rightarrow q$ (implies — false only when $p$ is true and $q$ false), $p\Leftrightarrow q$ (same truth value).</li>
<li>Two statements are <b>equivalent</b> if their truth-table columns are identical for every combination of truth values ($4$ rows for 2 variables, $8$ for 3).</li><li>Key equivalences: De Morgan $\lnot(p\land q)\equiv\lnot p\lor\lnot q$, $\lnot(p\lor q)\equiv\lnot p\land\lnot q$; $p\Rightarrow q\equiv\lnot p\lor q\equiv\lnot q\Rightarrow\lnot p$ (contrapositive); distributive laws.</li></ul>`,
      drills: [
        () => { const E = [['p\\land\\lnot q', (p, q) => p && !q], ['\\lnot p\\lor q', (p, q) => !p || q], ['p\\Rightarrow q', (p, q) => !p || q], ['\\lnot(p\\land q)', (p, q) => !(p && q)], ['p\\Leftrightarrow q', (p, q) => p === q], ['(p\\lor q)\\land\\lnot p', (p, q) => (p || q) && !p]]; const [s, f] = pick(E), p = Math.random() < 0.5, q = Math.random() < 0.5, opts = ['True', 'False'];
          return { q: T`$p$ is ${p ? 'true' : 'false'} and $q$ is ${q ? 'true' : 'false'}. What is the truth value of $${s}$?`, mc: { options: opts, correct: f(p, q) ? 0 : 1 }, sol: T`Substituting: $${s}$ is ${f(p, q) ? 'true' : 'false'}.` }; },
        () => { const L = [['\\lnot(p\\land q)', '\\lnot p\\lor\\lnot q'], ['\\lnot(p\\lor q)', '\\lnot p\\land\\lnot q'], ['p\\Rightarrow q', '\\lnot q\\Rightarrow\\lnot p'], ['p\\Rightarrow q', '\\lnot p\\lor q'], ['p\\land(q\\lor r)', '(p\\land q)\\lor(p\\land r)']]; const [s, r] = pick(L); const wrong = { '\\lnot p\\lor\\lnot q': ['\\lnot p\\land\\lnot q', 'p\\lor q', '\\lnot p\\lor q'], '\\lnot p\\land\\lnot q': ['\\lnot p\\lor\\lnot q', 'p\\land q', 'p\\land\\lnot q'], '\\lnot q\\Rightarrow\\lnot p': ['q\\Rightarrow p', '\\lnot p\\Rightarrow\\lnot q', 'p\\land\\lnot q'], '\\lnot p\\lor q': ['p\\lor\\lnot q', 'p\\land\\lnot q', 'q\\Rightarrow p'], '(p\\land q)\\lor(p\\land r)': ['(p\\lor q)\\land(p\\lor r)', 'p\\land q\\land r', '(p\\land q)\\lor r'] }[r];
          const opts = shuffle([r, ...wrong]); return { q: T`Which statement is equivalent to $${s}$?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(r) }, sol: T`$${s}\equiv${r}$ — check with a truth table: the columns agree in every row.` }; },
        () => { const E = [['(p\\lor q)\\land r', (p, q, r) => (p || q) && r], ['p\\Rightarrow(q\\land r)', (p, q, r) => !p || (q && r)], ['(p\\land q)\\lor\\lnot r', (p, q, r) => (p && q) || !r], ['\\lnot p\\land(q\\lor r)', (p, q, r) => !p && (q || r)], ['(p\\Rightarrow q)\\lor r', (p, q, r) => !p || q || r]]; const [s, f] = pick(E); let c = 0; for (const p of [true, false]) for (const q of [true, false]) for (const r of [true, false]) if (f(p, q, r)) c++;
          return { q: T`In a truth table for $${s}$ (8 rows), in how many rows is the statement true?`, fields: [{ label: 'rows', ans: c }], sol: T`Evaluating all $8$ combinations of $p,q,r$: true in $${c}$ rows.` }; },
      ],
    },
  ],
});
