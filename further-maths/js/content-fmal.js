// Further Maths A2 1 · section 2, Further Algebra and Functions: extra drill generators for 2.1–2.4.
// They fill the gaps the original set left: non-monic and three-factor partial fractions, improper fractions with a
// quadratic factor, Σ from n+1 to 2n, three-factor and factorial telescopes, the general term (A4), the range of
// validity (A5), binomial series with a constant to factor out, more compound series (A6), estimates, and small
// angle limits, equations and percentage errors (A7).
// Every generator attaches _v(): an independent check of its own answer (evaluate both sides of an identity at random
// points, add a sum term by term, or rebuild a Maclaurin series with the power-series engine below). The page never
// calls _v; the content audit does.
'use strict';
(() => {
const P_ = id => POINTS.find(p => p.id === id);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
// multiple choice: the right answer plus up to three distinct distractors, shuffled
function mcq(q, right, wrongs, sol, v) {
  const ws = [...new Set(wrongs.filter(w => w !== right))].slice(0, 3), options = shuffle([right, ...ws]);
  return { q, mc: { options, correct: options.indexOf(right) }, fields: [], sol, _v: v };
}
// (px + q) as TeX, keeping signs tidy
const lf = (p, q) => q === 0 ? `${cof(p)}x` : `(${cof(p)}x${q < 0 ? '-' : '+'}${Math.abs(q)})`;
const lfp = (p, q) => q === 0 ? `${cof(p)}x` : `${cof(p)}x${q < 0 ? '-' : '+'}${Math.abs(q)}`;
const xm = a => a === 0 ? 'x' : `(x${a < 0 ? '+' : '-'}${Math.abs(a)})`;      // (x − a)
const xmp = a => a === 0 ? 'x' : `x${a < 0 ? '+' : '-'}${Math.abs(a)}`;
const quad = (p, q) => poly([[1, 'x^2'], [p, 'x'], [q, '']]);                 // x² + px + q
const randX = () => 0.37 + Math.random() * 2.3;                                // a test point away from small integers
const P2 = (c2, c1, c0) => poly([[c2, 'x^2'], [c1, 'x'], [c0, '']]);
const P3 = (c3, c2, c1, c0) => poly([[c3, 'x^3'], [c2, 'x^2'], [c1, 'x'], [c0, '']]);
const xp = k => k === 1 ? 'x' : `x^{${k}}`;
const up = k => k === 1 ? 'u' : `u^{${k}}`;
const ct = s => s === '1' ? '' : s === '-1' ? '-' : s;                       // a TeX coefficient in front of a variable

/* ---------- a small power-series engine, used only to verify answers ---------- */
const L = 12;
const PS = {
  exp: () => Array.from({ length: L }, (_, k) => 1 / fact(k)),
  sin: () => Array.from({ length: L }, (_, k) => k % 2 ? (-1) ** ((k - 1) / 2) / fact(k) : 0),
  cos: () => Array.from({ length: L }, (_, k) => k % 2 ? 0 : (-1) ** (k / 2) / fact(k)),
  ln1p: () => Array.from({ length: L }, (_, k) => k ? (-1) ** (k + 1) / k : 0),
  bin: n => { const c = [1]; for (let k = 0; k < L - 1; k++) c.push(c[k] * (n - k) / (k + 1)); return c; },
  x: (s = 1, k = 1) => Array.from({ length: L }, (_, j) => j === k ? s : 0),
  c: v => Array.from({ length: L }, (_, j) => j ? 0 : v),
  add: (a, b) => a.map((v, i) => v + b[i]),
  scale: (a, s) => a.map(v => v * s),
  mul: (a, b) => { const r = new Array(L).fill(0); for (let i = 0; i < L; i++) for (let j = 0; i + j < L; j++) r[i + j] += a[i] * b[j]; return r; },
  arg: (a, s) => a.map((v, k) => v * s ** k),                               // f(sx)
  comp: (f, g) => { let r = PS.c(0), pw = PS.c(1); for (let k = 0; k < L; k++) { r = PS.add(r, PS.scale(pw, f[k])); pw = PS.mul(pw, g); } return r; }, // f(g(x)), g(0) = 0
};

/* ===================== 2.1 Partial fractions ===================== */
const al1 = P_('al1');
al1.drills.push(
  // non-monic linear factors, as CCEA usually sets them
  () => {
    let p, q, r, s; do { p = ri(1, 3); q = rnz(-5, 5); r = ri(1, 3); s = rnz(-5, 5); } while (q * r === s * p || gcd(p, q) !== 1 || gcd(r, s) !== 1 || (p === 1 && r === 1));
    const A = rnz(-5, 5), B = rnz(-5, 5), n1 = A * r + B * p, n0 = A * s + B * q, x1 = -q / p, x2 = -s / r;
    const N = x => n1 * x + n0;
    return {
      q: T`Express $\dfrac{${poly([[n1, 'x'], [n0, '']])}}{${lf(p, q)}${lf(r, s)}}$ in the form $\dfrac{A}{${lfp(p, q)}}+\dfrac{B}{${lfp(r, s)}}$.`,
      fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }],
      sol: T`$${poly([[n1, 'x'], [n0, '']])}\equiv A${lf(r, s)}+B${lf(p, q)}$.<br>
Put $x=${fr(-q, p)}$ (the root of $${lfp(p, q)}$): $${nice(N(x1))}=A\left(${nice(r * x1 + s)}\right)\Rightarrow A=${A}$.<br>
Put $x=${fr(-s, r)}$: $${nice(N(x2))}=B\left(${nice(p * x2 + q)}\right)\Rightarrow B=${B}$.<br>
<span class="muted">With a factor like $${lfp(p, q)}$, substitute its root $x=${fr(-q, p)}$, a fraction: the arithmetic is where marks are lost, so check with one extra value of $x$.</span>`,
      _v: () => { const x = randX(); return near(N(x) / ((p * x + q) * (r * x + s)), A / (p * x + q) + B / (r * x + s)); },
    };
  },
  // three distinct linear factors
  () => {
    const [a, b, c] = shuffle([-4, -3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3), A = rnz(-4, 4), B = rnz(-4, 4), C = rnz(-4, 4);
    const c2 = A + B + C, c1 = -A * (b + c) - B * (a + c) - C * (a + b), c0 = A * b * c + B * a * c + C * a * b, N = x => c2 * x * x + c1 * x + c0;
    return {
      q: T`Express $\dfrac{${P2(c2, c1, c0)}}{${xm(a)}${xm(b)}${xm(c)}}$ in partial fractions, as $\dfrac{A}{${xmp(a)}}+\dfrac{B}{${xmp(b)}}+\dfrac{C}{${xmp(c)}}$.`,
      fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }],
      sol: T`$${P2(c2, c1, c0)}\equiv A${xm(b)}${xm(c)}+B${xm(a)}${xm(c)}+C${xm(a)}${xm(b)}$.<br>
$x=${a}$: $${N(a)}=A(${a - b})(${a - c})\Rightarrow A=${A}$.<br>$x=${b}$: $${N(b)}=B(${b - a})(${b - c})\Rightarrow B=${B}$.<br>$x=${c}$: $${N(c)}=C(${c - a})(${c - b})\Rightarrow C=${C}$.<br>
<span class="muted">Three distinct linear factors: three substitutions, no comparing of coefficients needed.</span>`,
      _v: () => { const x = randX() + 5; return near(N(x) / ((x - a) * (x - b) * (x - c)), A / (x - a) + B / (x - b) + C / (x - c)); },
    };
  },
  // a quadratic factor x² + px + q that does not factorise
  () => {
    let p, q; do { p = rnz(-4, 4); q = ri(1, 9); } while (p * p >= 4 * q);
    const a = ri(-3, 3), A = rnz(-4, 4), B = rnz(-4, 4), C = ri(-5, 5);
    const c2 = A + B, c1 = A * p + C - a * B, c0 = A * q - a * C, N = x => c2 * x * x + c1 * x + c0, Qa = a * a + p * a + q;
    return {
      q: T`Express $\dfrac{${P2(c2, c1, c0)}}{${xm(a)}(${quad(p, q)})}$ as $\dfrac{A}{${xmp(a)}}+\dfrac{Bx+C}{${quad(p, q)}}$.`,
      fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }],
      sol: T`$${quad(p, q)}$ has discriminant $${p * p}-${4 * q}=${p * p - 4 * q}\lt0$, so it does not factorise and needs a linear numerator $Bx+C$.<br>
$${P2(c2, c1, c0)}\equiv A(${quad(p, q)})+(Bx+C)${xm(a)}$.<br>
$x=${a}$: $${N(a)}=${cof(Qa)}A\Rightarrow A=${A}$.<br>Compare $x^2$: $${c2}=A+B\Rightarrow B=${B}$.<br>${a === 0 ? T`Compare $x$: $${c1}=${cof(p)}A+C\Rightarrow C=${C}$.` : T`Compare constants: $${c0}=${cof(q)}A${-a < 0 ? '-' : '+'}${cof(Math.abs(a))}C\Rightarrow C=${C}$.`}`,
      _v: () => { const x = randX(); return near(N(x) / ((x - a) * (x * x + p * x + q)), A / (x - a) + (B * x + C) / (x * x + p * x + q)); },
    };
  },
  // improper: a cubic over (x − a)(x² + c)
  () => {
    const a = rnz(-3, 3), c = pick([1, 2, 3, 4]), K = rnz(-3, 3), A = rnz(-4, 4), B = rnz(-3, 3), C = rnz(-4, 4);
    const c3 = K, c2 = -K * a + A + B, c1 = K * c + C - a * B, c0 = -K * a * c + A * c - a * C, N = x => ((c3 * x + c2) * x + c1) * x + c0;
    return {
      q: T`Express $\dfrac{${P3(c3, c2, c1, c0)}}{${xm(a)}(x^2+${c})}$ in the form $K+\dfrac{A}{${xmp(a)}}+\dfrac{Bx+C}{x^2+${c}}$.`,
      fields: [{ label: 'K', ans: K }, { label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }],
      sol: T`Degree 3 over degree 3 is <b>improper</b>, so there is a constant $K$: the ratio of the leading coefficients, $K=${K}$.<br>
$${P3(c3, c2, c1, c0)}\equiv ${cof(K)}${xm(a)}(x^2+${c})+A(x^2+${c})+(Bx+C)${xm(a)}$.<br>
$x=${a}$: $${N(a)}=${a * a + c}A\Rightarrow A=${A}$.<br>Compare $x^2$: $${c2}=${-K * a}+A+B\Rightarrow B=${B}$.<br>Compare constants: $${c0}=${-K * a * c}+${cof(c)}A${-a < 0 ? '-' : '+'}${cof(Math.abs(a))}C\Rightarrow C=${C}$.`,
      _v: () => { const x = randX(); return near(N(x) / ((x - a) * (x * x + c)), K + A / (x - a) + (B * x + C) / (x * x + c)); },
    };
  },
  // improper by long division: a cubic over two linear factors leaves a linear quotient
  () => {
    let a = ri(-3, 3), b; do b = ri(-3, 3); while (b === a);
    const P = pick([1, 2, -1]), K = ri(-4, 4), A = rnz(-4, 4), B = rnz(-4, 4);
    // (Px + K)(x − a)(x − b) + A(x − b) + B(x − a); (x − a)(x − b) = x² − sx + t
    const s = a + b, t = a * b, c3 = P, c2 = K - P * s, c1 = P * t - K * s + A + B, c0 = K * t - A * b - B * a, N = x => ((c3 * x + c2) * x + c1) * x + c0;
    return {
      q: T`Express $\dfrac{${P3(c3, c2, c1, c0)}}{${xm(a)}${xm(b)}}$ in the form $Px+K+\dfrac{A}{${xmp(a)}}+\dfrac{B}{${xmp(b)}}$.`,
      fields: [{ label: 'P', ans: P }, { label: 'K', ans: K }, { label: 'A', ans: A }, { label: 'B', ans: B }],
      sol: T`Degree 3 over degree 2: divide first. $${xm(a)}${xm(b)}=${P2(1, -s, t)}$.<br>
Long division of $${P3(c3, c2, c1, c0)}$ by $${P2(1, -s, t)}$ gives quotient $${poly([[P, 'x'], [K, '']])}$ and remainder $${poly([[A + B, 'x'], [c0 - K * t, '']])}$.<br>
So $P=${P}$, $K=${K}$, and $\dfrac{${poly([[A + B, 'x'], [c0 - K * t, '']])}}{${xm(a)}${xm(b)}}\equiv\dfrac{A}{${xmp(a)}}+\dfrac{B}{${xmp(b)}}$: $x=${a}$ gives $A=${A}$; $x=${b}$ gives $B=${B}$.`,
      _v: () => { const x = randX() + 4; return near(N(x) / ((x - a) * (x - b)), P * x + K + A / (x - a) + B / (x - b)); },
    };
  },
  // choosing the right form (multiple choice)
  () => {
    const F = pick([
      { d: T`(x-1)(x+2)^2`, r: T`\dfrac{A}{x-1}+\dfrac{B}{x+2}+\dfrac{C}{(x+2)^2}`, w: [T`\dfrac{A}{x-1}+\dfrac{B}{(x+2)^2}`, T`\dfrac{A}{x-1}+\dfrac{Bx+C}{(x+2)^2}`, T`\dfrac{A}{x-1}+\dfrac{B}{x+2}+\dfrac{C}{(x+2)^3}`], why: T`A repeated factor $(x+2)^2$ needs <b>both</b> $\frac{B}{x+2}$ and $\frac{C}{(x+2)^2}$. Count: 3 unknowns for a degree-3 denominator.` },
      { d: T`x(x^2+4)`, r: T`\dfrac{A}{x}+\dfrac{Bx+C}{x^2+4}`, w: [T`\dfrac{A}{x}+\dfrac{B}{x^2+4}`, T`\dfrac{A}{x}+\dfrac{B}{x+2}+\dfrac{C}{x-2}`, T`\dfrac{Ax+B}{x}+\dfrac{C}{x^2+4}`], why: T`$x^2+4$ does not factorise over the reals, so its numerator is linear: $Bx+C$. (It is $x^2-4$ that factorises.)` },
      { d: T`(2x-1)(x^2+3)`, r: T`\dfrac{A}{2x-1}+\dfrac{Bx+C}{x^2+3}`, w: [T`\dfrac{A}{2x-1}+\dfrac{B}{x^2+3}`, T`\dfrac{A}{x-\frac12}+\dfrac{B}{x^2+3}`, T`\dfrac{Ax+B}{2x-1}+\dfrac{C}{x^2+3}`], why: T`A linear factor gets a constant; the irreducible quadratic $x^2+3$ gets a linear numerator.` },
      { d: T`(x^2-9)(x+1)`, r: T`\dfrac{A}{x-3}+\dfrac{B}{x+3}+\dfrac{C}{x+1}`, w: [T`\dfrac{A}{x^2-9}+\dfrac{B}{x+1}`, T`\dfrac{A}{x-3}+\dfrac{B}{x+1}`, T`\dfrac{A}{x-3}+\dfrac{B}{x+3}+\dfrac{C}{(x+1)^2}`], why: T`Factorise fully first: $x^2-9=(x-3)(x+3)$, giving three distinct linear factors.` },
      { d: T`x^2(x-5)`, r: T`\dfrac{A}{x}+\dfrac{B}{x^2}+\dfrac{C}{x-5}`, w: [T`\dfrac{A}{x^2}+\dfrac{B}{x-5}`, T`\dfrac{Ax+B}{x^2}+\dfrac{C}{x-5}+\dfrac{D}{x}`, T`\dfrac{A}{x}+\dfrac{B}{x-5}`], why: T`$x^2$ is the repeated factor $x\cdot x$: it needs $\frac Ax+\frac B{x^2}$.` },
    ]);
    const num = pick([T`3x+1`, T`x^2+2`, T`5`, T`2x^2-x+4`]);
    return mcq(T`Which is the correct form of the partial fractions of $\dfrac{${num}}{${F.d}}$?`, T`$${F.r}$`, F.w.map(w => T`$${w}$`), F.why, () => true);
  },
);

/* ===================== 2.2 Sums of series and the method of differences ===================== */
const al2 = P_('al2');
const S1 = n => n * (n + 1) / 2, S2 = n => n * (n + 1) * (2 * n + 1) / 6, S3 = n => S1(n) ** 2;
const brute = (f, a, b) => { let s = 0; for (let r = a; r <= b; r++) s += f(r); return s; };
al2.drills.push(
  // Σ from n + 1 to 2n: the change of start
  () => {
    const k = ri(1, 3), n0 = ri(5, 12);
    const F = [null,
      { f: r => r, form: T`\tfrac12n(an+b)`, ans: [['a', 3], ['b', 1]], work: T`\tfrac12(2n)(2n+1)-\tfrac12n(n+1)=\tfrac12n\left[2(2n+1)-(n+1)\right]=\tfrac12n(3n+1)`, cf: n => n * (3 * n + 1) / 2 },
      { f: r => r * r, form: T`\tfrac16n(2n+1)(an+b)`, ans: [['a', 7], ['b', 1]], work: T`\tfrac16(2n)(2n+1)(4n+1)-\tfrac16n(n+1)(2n+1)=\tfrac16n(2n+1)\left[2(4n+1)-(n+1)\right]=\tfrac16n(2n+1)(7n+1)`, cf: n => n * (2 * n + 1) * (7 * n + 1) / 6 },
      { f: r => r ** 3, form: T`\tfrac14n^2(3n+1)(an+b)`, ans: [['a', 5], ['b', 3]], work: T`\tfrac14(2n)^2(2n+1)^2-\tfrac14n^2(n+1)^2=\tfrac14n^2\left[(4n+2)^2-(n+1)^2\right]=\tfrac14n^2(3n+1)(5n+3)`, cf: n => n * n * (3 * n + 1) * (5 * n + 3) / 4 }][k];
    const val = brute(F.f, n0 + 1, 2 * n0), pw = k === 1 ? 'r' : `r^${k}`;
    return {
      q: T`Show that $\displaystyle\sum_{r=n+1}^{2n}${pw}=${F.form}$, stating $a$ and $b$. Hence evaluate $\displaystyle\sum_{r=${n0 + 1}}^{${2 * n0}}${pw}$.`,
      fields: [...F.ans.map(([l, v]) => ({ label: l, ans: v })), { label: 'sum', ans: val }],
      sol: T`$\displaystyle\sum_{r=n+1}^{2n}=\sum_{r=1}^{2n}-\sum_{r=1}^{n}$: replace $n$ by $2n$ in the standard formula, then subtract.<br>$=${F.work}$.<br>
So $a=${F.ans[0][1]}$, $b=${F.ans[1][1]}$. With $n=${n0}$: $${val}$.<br><span class="muted">The commonest slip: subtracting $\sum_{1}^{n+1}$ instead of $\sum_1^{n}$. The sum starts at $n+1$, so remove terms $1$ to $n$.</span>`,
      _v: () => [3, 7, 10].every(n => near(brute(F.f, n + 1, 2 * n), F.cf(n))) && near(F.cf(n0), val),
    };
  },
  // a product summand: expand, then use Σr³, Σr², Σr
  () => {
    const a = rnz(-3, 4), N = ri(6, 15), t = pick([0, 1]);
    const f = t ? r => r * r * (r + a) : r => r * (r + a) * (r - a);
    const sc = k => (k < 0 ? '-' : '+') + (Math.abs(k) === 1 ? '' : Math.abs(k));   // signed coefficient, 1 dropped
    const lab = t ? T`r^2(r${sgn(a)})` : T`r(r${sgn(a)})(r${sgn(-a)})`, exp = t ? T`r^3${sc(a)}r^2` : T`r^3${sc(-a * a)}r`;
    const v = brute(f, 1, N), parts = t ? T`\tfrac14N^2(N+1)^2${sc(a)}${Math.abs(a) === 1 ? '' : '\\cdot'}\tfrac16N(N+1)(2N+1)` : T`\tfrac14N^2(N+1)^2${sc(-a * a)}${a * a === 1 ? '' : '\\cdot'}\tfrac12N(N+1)`;
    return {
      q: T`Evaluate $\displaystyle\sum_{r=1}^{${N}}${lab}$.`, fields: [{ label: 'sum', ans: v }],
      sol: T`Expand: $${lab}=${exp}$. Sums are linear, so use $\sum r^3=\tfrac14N^2(N+1)^2$${t ? T`, $\sum r^2=\tfrac16N(N+1)(2N+1)$` : T`, $\sum r=\tfrac12N(N+1)$`}:<br>$${parts}$ with $N=${N}$: $${S3(N)}${t ? `${sgn(a * S2(N))}` : `-${a * a * S1(N)}`}=${v}$.`,
      _v: () => near(v, S3(N) + (t ? a * S2(N) : -a * a * S1(N))),
    };
  },
  // three-factor telescope
  () => {
    const s = ri(0, 2), inf = Math.random() < 0.4, N = ri(4, 12), g = r => 1 / ((r + s) * (r + s + 1));
    const first = 1 / ((1 + s) * (2 + s)), v = inf ? first / 2 : 0.5 * (first - 1 / ((N + 1 + s) * (N + 2 + s)));
    const R = k => k === 0 ? 'r' : `r+${k}`;
    return {
      q: T`Show that $\dfrac{1}{(${R(s)})(${R(s + 1)})(${R(s + 2)})}=\dfrac12\left[\dfrac{1}{(${R(s)})(${R(s + 1)})}-\dfrac{1}{(${R(s + 1)})(${R(s + 2)})}\right]$ and hence find ${inf ? T`$\displaystyle\sum_{r=1}^{\infty}$` : T`$\displaystyle\sum_{r=1}^{${N}}$`} of $\dfrac{1}{(${R(s)})(${R(s + 1)})(${R(s + 2)})}$.`,
      fields: [{ label: 'sum', ans: v }],
      sol: T`Combine the bracket over $(${R(s)})(${R(s + 1)})(${R(s + 2)})$: the numerator is $(${R(s + 2)})-(${R(s)})=2$, and $\frac12\times2=1$ ✓.<br>
With $f(r)=\dfrac{1}{(${R(s)})(${R(s + 1)})}$ each term is $\frac12[f(r)-f(r+1)]$, so the sum telescopes to $\frac12[f(1)-f(${inf ? 'n' : N}+1)]$.<br>
$f(1)=\dfrac{1}{${(1 + s) * (2 + s)}}$. ${inf ? T`As $n\to\infty$, $f(n+1)\to0$: sum $=\dfrac1{${2 * (1 + s) * (2 + s)}}$.` : T`$f(${N + 1})=\dfrac1{${(N + 1 + s) * (N + 2 + s)}}$, so the sum is $\dfrac12\left(\dfrac1{${(1 + s) * (2 + s)}}-\dfrac1{${(N + 1 + s) * (N + 2 + s)}}\right)=${nice(v)}$.`}`,
      _v: () => near(inf ? brute(r => 1 / ((r + s) * (r + s + 1) * (r + s + 2)), 1, 200000) : brute(r => 1 / ((r + s) * (r + s + 1) * (r + s + 2)), 1, N), v, inf ? 1e-6 : 1e-9) && near(g(1) - g(2), 2 / ((1 + s) * (2 + s) * (3 + s))),
    };
  },
  // factorial telescopes
  () => {
    const N = ri(3, 8), t = pick([0, 1]);
    if (t === 0) { const v = fact(N + 1) - 1; return { q: T`By writing $r\cdot r!=(r+1)!-r!$, find $\displaystyle\sum_{r=1}^{${N}}r\cdot r!$.`, fields: [{ label: 'sum', ans: v }], sol: T`$(r+1)!-r!=r!\,(r+1-1)=r\cdot r!$ ✓. The sum telescopes: $\sum_{r=1}^{n}[(r+1)!-r!]=(n+1)!-1!$.<br>With $n=${N}$: $${N + 1}!-1=${v}$.`, _v: () => near(brute(r => r * fact(r), 1, N), v) }; }
    const v = 1 - 1 / fact(N + 1);
    return { q: T`Show that $\dfrac{r}{(r+1)!}=\dfrac{1}{r!}-\dfrac{1}{(r+1)!}$, and hence find $\displaystyle\sum_{r=1}^{${N}}\frac{r}{(r+1)!}$ exactly.`, fields: [{ label: 'sum', ans: v }], sol: T`$\dfrac1{r!}-\dfrac1{(r+1)!}=\dfrac{(r+1)-1}{(r+1)!}=\dfrac{r}{(r+1)!}$ ✓. Telescoping: $\dfrac1{1!}-\dfrac1{(n+1)!}$.<br>With $n=${N}$: $1-\dfrac1{${fact(N + 1)}}=${fr(fact(N + 1) - 1, fact(N + 1))}$. (As $n\to\infty$ the sum tends to $1$.)`, _v: () => near(brute(r => r / fact(r + 1), 1, N), v) };
  },
  // telescoping with a step: 1/((ar + b)(ar + b + a))
  () => {
    const a = pick([2, 3, 4]); let b; do b = ri(-a + 1, 3); while (b === 0 || gcd(a, Math.abs(b)) !== 1);
    const inf = Math.random() < 0.5, N = ri(5, 15), u = r => a * r + b;
    const v = inf ? 1 / (a * (a + b)) : (1 / a) * (1 / (a + b) - 1 / (a * (N + 1) + b));
    const ur = `${a}r${b < 0 ? '-' : '+'}${Math.abs(b)}`, ur2 = `${a}r${a + b < 0 ? '-' : '+'}${Math.abs(a + b)}`;
    return {
      q: T`Use partial fractions and the method of differences to find ${inf ? T`$\displaystyle\sum_{r=1}^{\infty}$` : T`$\displaystyle\sum_{r=1}^{${N}}$`}$\dfrac{1}{(${ur})(${ur2})}$.`,
      fields: [{ label: 'sum', ans: v }],
      sol: T`The factors differ by $${a}$: $\dfrac{1}{(${ur})(${ur2})}=\dfrac1{${a}}\left(\dfrac1{${ur}}-\dfrac1{${ur2}}\right)$.<br>
Writing out terms, each $-\frac1{${ur2}}$ cancels the next $+\frac1{${ur}}$, leaving $\dfrac1{${a}}\left(\dfrac1{${a + b}}-\dfrac1{${a}n${a + b < 0 ? '-' : '+'}${Math.abs(a + b)}}\right)$.<br>
${inf ? T`As $n\to\infty$: $\dfrac1{${a}}\cdot\dfrac1{${a + b}}=${fr(1, a * (a + b))}$.` : T`With $n=${N}$: $\dfrac1{${a}}\left(\dfrac1{${a + b}}-\dfrac1{${a * (N + 1) + b}}\right)=${nice(v)}$.`}`,
      _v: () => near(inf ? brute(r => 1 / (u(r) * u(r + 1)), 1, 400000) : brute(r => 1 / (u(r) * u(r + 1)), 1, N), v, inf ? 1e-5 : 1e-9),
    };
  },
  // which f gives the difference? (multiple choice)
  () => {
    const C = [
      { g: T`r(r+1)`, gf: r => r * (r + 1), f: T`\tfrac13r(r+1)(r+2)`, ff: r => r * (r + 1) * (r + 2) / 3 },
      { g: T`r`, gf: r => r, f: T`\tfrac12r(r+1)`, ff: r => r * (r + 1) / 2 },
      { g: T`r^3`, gf: r => r ** 3, f: T`\tfrac14r^2(r+1)^2`, ff: r => r * r * (r + 1) ** 2 / 4 },
      { g: T`r(r+1)(r+2)`, gf: r => r * (r + 1) * (r + 2), f: T`\tfrac14r(r+1)(r+2)(r+3)`, ff: r => r * (r + 1) * (r + 2) * (r + 3) / 4 },
      { g: T`2r-1`, gf: r => 2 * r - 1, f: T`r^2`, ff: r => r * r },
    ];
    const c = pick(C), wr = shuffle(C.filter(x => x !== c)).slice(0, 3).map(x => T`$f(r)=${x.f}$`);
    return mcq(T`Which function $f$ satisfies $f(r)-f(r-1)=${c.g}$ (with $f(0)=0$), so that $\displaystyle\sum_{r=1}^{n}${c.g}=f(n)$?`, T`$f(r)=${c.f}$`, wr,
      T`Check: $f(r)-f(r-1)$ for $f(r)=${c.f}$ simplifies to $${c.g}$, and the sum telescopes to $f(n)-f(0)=f(n)$.`, () => [1, 2, 3, 4, 5, 6].every(r => near(c.ff(r) - c.ff(r - 1), c.gf(r))) && near(c.ff(0), 0));
  },
);

/* ===================== 2.3 Maclaurin series ===================== */
const sr1 = P_('sr1');
const BC = (n, k) => { let c = 1; for (let j = 0; j < k; j++) c *= (n - j); return c / fact(k); }; // generalised binomial coefficient
const nT = n => Number.isInteger(n) ? `${n}` : fr(Math.round(n * 6), 6);
sr1.drills.push(
  // the general term (A4), multiple choice
  () => {
    const a = pick([2, 3, 4]);
    const F = pick([
      { f: T`e^{${a}x}`, r: T`\dfrac{${a}^rx^r}{r!}`, w: [T`\dfrac{${a}x^r}{r!}`, T`\dfrac{${a}^rx^r}{r}`, T`\dfrac{(-${a})^rx^r}{r!}`], gt: r => a ** r / fact(r), pw: r => r, ps: () => PS.arg(PS.exp(), a) },
      { f: T`\cos ${a}x`, r: T`\dfrac{(-1)^r${a}^{2r}x^{2r}}{(2r)!}`, w: [T`\dfrac{(-1)^r${a}^{r}x^{2r}}{(2r)!}`, T`\dfrac{(-1)^{r+1}${a}^{2r}x^{2r}}{(2r)!}`, T`\dfrac{(-1)^r${a}^{2r}x^{2r}}{r!}`], gt: r => (-1) ** r * a ** (2 * r) / fact(2 * r), pw: r => 2 * r, ps: () => PS.arg(PS.cos(), a) },
      { f: T`\sin ${a}x`, r: T`\dfrac{(-1)^r${a}^{2r+1}x^{2r+1}}{(2r+1)!}`, w: [T`\dfrac{(-1)^r${a}^{2r}x^{2r+1}}{(2r+1)!}`, T`\dfrac{(-1)^{r}${a}^{2r+1}x^{2r+1}}{(2r)!}`, T`\dfrac{${a}^{2r+1}x^{2r+1}}{(2r+1)!}`], gt: r => (-1) ** r * a ** (2 * r + 1) / fact(2 * r + 1), pw: r => 2 * r + 1, ps: () => PS.arg(PS.sin(), a) },
      { f: T`\ln(1+${a}x)`, r: T`\dfrac{(-1)^{r+1}${a}^rx^r}{r}`, w: [T`\dfrac{(-1)^{r}${a}^rx^r}{r}`, T`\dfrac{(-1)^{r+1}${a}^rx^r}{r!}`, T`\dfrac{(-1)^{r+1}${a}x^r}{r}`], gt: r => r ? (-1) ** (r + 1) * a ** r / r : 0, pw: r => r, ps: () => PS.arg(PS.ln1p(), a), r0: 1 },
      { f: T`\dfrac{1}{1-${a}x}`, r: T`${a}^rx^r`, w: [T`(-${a})^rx^r`, T`\dfrac{${a}^rx^r}{r!}`, T`${a}x^r`], gt: r => a ** r, pw: r => r, ps: () => PS.arg(PS.bin(-1), -a) },
    ]);
    const lo = F.r0 || 0;
    return mcq(T`Which is the general term of the Maclaurin series of $${F.f}$ (with $r$ counting from $${lo}$)?`, T`$${F.r}$`, F.w.map(w => T`$${w}$`),
      T`Start from the standard series and substitute $${a}x$ for $x$: every $x^k$ becomes $${a}^kx^k$. ${F.f.includes('cos') || F.f.includes('sin') ? T`Signs alternate, so the factor is $(-1)^r$; the powers and factorials go in steps of two.` : F.f.includes('ln') ? T`For $\ln(1+x)$ the first term is positive, so the sign factor is $(-1)^{r+1}$, and there is no factorial: the coefficient is $\frac1r$.` : F.f.includes('1-') ? T`$\dfrac1{1-u}=1+u+u^2+\cdots$ with $u=${a}x$.` : T`$e^u=\sum\dfrac{u^r}{r!}$.`} Check your answer by putting $r=${lo + 1}$ and comparing with the series.`,
      () => { const s = F.ps(); for (let r = lo; r <= 4; r++) { const k = F.pw(r); if (k < L && !near(s[k], F.gt(r), 1e-9)) return false; } return true; });
  },
  // range of validity (A5): the end points of the interval
  () => {
    const t = pick(['ln', 'bin', 'both']);
    const A = pick([2, 3, 4, 5, -2, -3, 0.5, -0.5]), B = pick([2, 3, -2, -4, 0.5]);
    // ln(1 + Ax): −1 < Ax ≤ 1. (1 + Bx)^{−1}: |Bx| < 1.
    const lnI = A > 0 ? [-1 / A, 1 / A, false, true] : [1 / A, -1 / A, true, false];   // [lo, hi, loIncl, hiIncl]
    const biI = [-1 / Math.abs(B), 1 / Math.abs(B), false, false];
    let I = t === 'ln' ? lnI : t === 'bin' ? biI : null;
    if (t === 'both') { const lo = Math.max(lnI[0], biI[0]), hi = Math.min(lnI[1], biI[1]); I = [lo, hi, lo === lnI[0] && lnI[0] > biI[0] ? lnI[2] : false, hi === lnI[1] && lnI[1] < biI[1] ? lnI[3] : false]; }
    const lnT = T`\ln(1${A < 0 ? '-' : '+'}${nice(Math.abs(A))}x)`, biT = T`(1${B < 0 ? '-' : '+'}${nice(Math.abs(B))}x)^{-1}`;
    const f = t === 'ln' ? lnT : t === 'bin' ? biT : T`${lnT}\,${biT}`;
    const ineq = T`${nice(I[0])}${I[2] ? '\\le ' : '\\lt '}x${I[3] ? '\\le ' : '\\lt '}${nice(I[1])}`;
    return {
      q: T`The Maclaurin series of $${f}$ is valid for $p\ \square\ x\ \square\ q$. Find the end points $p$ and $q$.`,
      fields: [{ label: 'p (lower)', ans: I[0] }, { label: 'q (upper)', ans: I[1] }],
      sol: T`${t !== 'bin' ? T`$\ln(1+u)$ is valid for $-1\lt u\le1$; with $u=${nice(A)}x$ that gives ${A > 0 ? T`$-${nice(1 / A)}\lt x\le${nice(1 / A)}$` : T`$${nice(1 / A)}\le x\lt${nice(-1 / A)}$ (dividing by a negative number flips the inequalities, so the closed end moves to the left)`}. ` : ''}${t !== 'ln' ? T`$(1+u)^{-1}$ is valid for $|u|\lt1$; with $u=${nice(B)}x$ that gives $|x|\lt${nice(1 / Math.abs(B))}$. ` : ''}${t === 'both' ? T`A product is valid only where <b>both</b> series are, so take the overlap. ` : ''}<br>Valid for $${ineq}$: $p=${nice(I[0])}$, $q=${nice(I[1])}$.`,
      _v: () => I[0] < I[1] && (t !== 'ln' || near(I[1] - I[0], 2 / Math.abs(A))),
    };
  },
  // binomial series with a constant to factor out
  () => {
    const C = pick([[4, 0.5], [9, 0.5], [4, -0.5], [9, -0.5], [2, -1], [3, -1], [2, -2], [8, 1 / 3]]);
    const [c, n] = C, d = pick([1, -1, 2, -2, 3]), k = ri(1, 3), c0 = n === 1 / 3 ? 2 : Math.pow(c, n);
    const coef = c0 * BC(n, k) * Math.pow(d / c, k), R = c / Math.abs(d);
    const nTx = n === 0.5 ? T`\tfrac12` : n === -0.5 ? T`-\tfrac12` : n === 1 / 3 ? T`\tfrac13` : `${n}`;
    const base = T`(${c}${d < 0 ? '-' : '+'}${cof(Math.abs(d))}x)^{${nTx}}`;
    return {
      q: T`Find the coefficient of $${xp(k)}$ in the expansion of $${base}$ in ascending powers of $x$, and the largest $q$ such that it is valid for $|x|\lt q$.`,
      fields: [{ label: `coefficient of x${k > 1 ? '^' + k : ''}`, ans: coef }, { label: 'q', ans: R }],
      sol: T`Take out the constant first: $${base}=${c}^{${nTx}}\left(1${d < 0 ? '-' : '+'}${ct(fr(Math.abs(d), c))}x\right)^{${nTx}}=${nice(c0)}\left(1+u\right)^{${nTx}}$ with $u=${ct(fr(d, c))}x$.<br>
Term in $${up(k)}$: $\dbinom{${nTx}}{${k}}${up(k)}=${nice(BC(n, k))}\,${up(k)}$, and $${up(k)}=${ct(nice(Math.pow(d / c, k)))}${xp(k)}$.<br>
Coefficient $=${nice(c0)}\times${par(nice(BC(n, k)))}\times${par(nice(Math.pow(d / c, k)))}=${nice(coef)}$.<br>
Valid for $|u|\lt1$, i.e. $\left|${ct(fr(d, c))}x\right|\lt1\Rightarrow|x|\lt${nice(R)}$.`,
      _v: () => { const s = PS.scale(PS.arg(PS.bin(n), d / c), c0); return near(s[k], coef) && near(Math.pow(c + d * 0.01, n), s.reduce((t, v, i) => t + v * 0.01 ** i, 0), 1e-8); },
    };
  },
  // compound functions (A6): substitute, multiply, or recognise
  () => {
    const a = pick([2, 3, -2]);
    const F = pick([
      { f: T`e^{${cof(a)}x^2}`, ks: [2, 4, 6], c: k => Math.pow(a, k / 2) / fact(k / 2), how: T`Substitute $u=${cof(a)}x^2$ into $e^u$: the term $\dfrac{u^m}{m!}$ gives $\dfrac{${a}^m}{m!}x^{2m}$.`, ps: () => PS.comp(PS.exp(), PS.x(a, 2)) },
      { f: T`x\,e^{${cof(a)}x}`, ks: [2, 3, 4], c: k => Math.pow(a, k - 1) / fact(k - 1), how: T`$e^{${cof(a)}x}=\sum\dfrac{${a < 0 ? `(${a})` : a}^rx^r}{r!}$; multiplying by $x$ raises every power by one, so the $x^k$ term comes from $r=k-1$.`, ps: () => PS.mul(PS.x(), PS.arg(PS.exp(), a)) },
      { f: T`(1+x)e^{${cof(a)}x}`, ks: [2, 3], c: k => Math.pow(a, k) / fact(k) + Math.pow(a, k - 1) / fact(k - 1), how: T`$x^k$ comes from $1\times\dfrac{${a < 0 ? `(${a})` : a}^k}{k!}x^k$ plus $x\times\dfrac{${a < 0 ? `(${a})` : a}^{k-1}}{(k-1)!}x^{k-1}$.`, ps: () => PS.mul(PS.add(PS.c(1), PS.x()), PS.arg(PS.exp(), a)) },
      { f: T`\ln\dfrac{1+x}{1-x}`, ks: [1, 2, 3, 5], c: k => k % 2 ? 2 / k : 0, how: T`$\ln(1+x)-\ln(1-x)$: the even powers cancel and the odd ones double, giving $2\left(x+\frac{x^3}3+\frac{x^5}5+\cdots\right)$.`, ps: () => PS.add(PS.ln1p(), PS.scale(PS.arg(PS.ln1p(), -1), -1)) },
      { f: T`\dfrac{e^{x}}{1-x}`, ks: [2, 3], c: k => brute(j => 1 / fact(j), 0, k), how: T`$(1+x+x^2+\cdots)\left(1+x+\frac{x^2}{2!}+\cdots\right)$: the $x^k$ coefficient is $1+1+\frac1{2!}+\cdots+\frac1{k!}$.`, ps: () => PS.mul(PS.exp(), PS.arg(PS.bin(-1), -1)) },
      { f: T`\sin x\cos x`, ks: [3, 5], c: k => (-1) ** ((k - 1) / 2) * Math.pow(2, k - 1) / fact(k), how: T`Use $\sin x\cos x=\frac12\sin2x=\frac12\left(2x-\frac{(2x)^3}{3!}+\frac{(2x)^5}{5!}-\cdots\right)$.`, ps: () => PS.mul(PS.sin(), PS.cos()) },
      { f: T`\ln(1+x^2)`, ks: [2, 4, 6], c: k => (-1) ** (k / 2 + 1) / (k / 2), how: T`Substitute $u=x^2$ into $\ln(1+u)=u-\frac{u^2}2+\frac{u^3}3-\cdots$.`, ps: () => PS.comp(PS.ln1p(), PS.x(1, 2)) },
    ]);
    const k = pick(F.ks), v = F.c(k);
    return { q: T`Find the coefficient of $${xp(k)}$ in the Maclaurin series of $${F.f}$.`, fields: [{ label: 'coefficient', ans: v }], sol: T`${F.how}<br>Coefficient of $${xp(k)}$: $${nice(v)}$.`, _v: () => near(F.ps()[k], v) };
  },
  // Maclaurin's theorem by differentiation, for a function with no standard series
  () => {
    const F = pick([
      { f: T`\ln(1+\sin x)`, c: [0, 1, -1 / 2, 1 / 6, -1 / 12], d: T`f'=\dfrac{\cos x}{1+\sin x},\ f''=\dfrac{-1}{1+\sin x},\ f'''=\dfrac{\cos x}{(1+\sin x)^2}`, ps: () => PS.comp(PS.ln1p(), PS.sin()) },
      { f: T`e^x\sin x`, c: [0, 1, 1, 1 / 3, 0, -1 / 30], d: T`f'=e^x(\sin x+\cos x),\ f''=2e^x\cos x,\ f'''=2e^x(\cos x-\sin x)`, ps: () => PS.mul(PS.exp(), PS.sin()) },
      { f: T`\cos^2x`, c: [1, 0, -1, 0, 1 / 3], d: T`f'=-\sin2x,\ f''=-2\cos2x,\ f'''=4\sin2x,\ f^{(4)}=8\cos2x`, ps: () => PS.mul(PS.cos(), PS.cos()) },
      { f: T`\sqrt{1+\sin x}`, c: [1, 1 / 2, -1 / 8, -1 / 48], d: T`f=(1+\sin x)^{\frac12},\ f'=\tfrac12\cos x\,(1+\sin x)^{-\frac12},\ \ldots`, ps: () => PS.comp(PS.bin(0.5), PS.sin()) },
    ]);
    const ks = F.c.map((v, i) => i).filter(i => i > 0), k = pick(ks), v = F.c[k];
    return { q: T`Using Maclaurin's theorem, find the coefficient of $${xp(k)}$ in the series for $f(x)=${F.f}$.`, fields: [{ label: 'coefficient', ans: v }],
      sol: T`$${F.d}$. Evaluate at $0$ and use $a_k=\dfrac{f^{(k)}(0)}{k!}$.<br>$f(x)=${F.c.map((c, i) => c ? `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 && i ? '' : nice(Math.abs(c))}${i ? xp(i) : ''}` : '').join('').replace(/^\+/, '')}+\cdots$, so the coefficient is $${nice(v)}$.`,
      _v: () => F.c.every((c, i) => near(F.ps()[i], c)) };
  },
  // estimates from a truncated series
  () => {
    const t = pick(['ln', 'exp', 'sin', 'int']);
    if (t === 'int') { const b = pick([0.2, 0.3, 0.5]), v = b - b ** 3 / 3 + b ** 5 / 10; return { q: T`Using the first three non-zero terms of the Maclaurin series for $e^{-x^2}$, estimate $\displaystyle\int_0^{${b}}e^{-x^2}\,dx$ to 5 decimal places.`, fields: [{ label: 'estimate', ans: v, tol: { abs: 6e-6 } }], sol: T`$e^{-x^2}\approx1-x^2+\frac{x^4}{2}$. Integrate term by term: $\left[x-\frac{x^3}{3}+\frac{x^5}{10}\right]_0^{${b}}=${v.toFixed(5)}$.`, _v: () => { let s = 0, n = 4000; for (let i = 0; i < n; i++) { const x = (i + 0.5) * b / n; s += Math.exp(-x * x) * b / n; } return Math.abs(s - v) < b ** 7 / 42 + 1e-9; } }; }
    const x0 = pick([0.1, 0.2, -0.1, 0.05]), n = 3;
    const D = { ln: { f: T`\ln(${1 + x0})`, s: T`\ln(1+x)\approx x-\frac{x^2}{2}+\frac{x^3}{3}`, v: x0 - x0 * x0 / 2 + x0 ** 3 / 3, ex: Math.log(1 + x0) },
      exp: { f: T`e^{${x0}}`, s: T`e^x\approx1+x+\frac{x^2}{2}`, v: 1 + x0 + x0 * x0 / 2, ex: Math.exp(x0) },
      sin: { f: T`\sin(${x0})`, s: T`\sin x\approx x-\frac{x^3}{6}+\frac{x^5}{120}`, v: x0 - x0 ** 3 / 6 + x0 ** 5 / 120, ex: Math.sin(x0) } }[t];
    return { q: T`Use the first ${n} non-zero terms of a Maclaurin series to estimate $${D.f}$ to 6 decimal places.`, fields: [{ label: 'estimate', ans: D.v, tol: { abs: 6e-7 } }], sol: T`$${D.s}$ with $x=${x0}$: $${D.v.toFixed(6)}$. (Calculator: $${D.ex.toFixed(6)}$; the error is about the size of the next term.)`, _v: () => Math.abs(D.v - D.ex) < Math.abs(x0) ** (t === 'sin' ? 7 : t === 'exp' ? 3 : 4) };
  },
);

/* ===================== 2.4 Small angle approximations ===================== */
const sa1 = P_('sa1');
const lim0 = f => f(1e-4);
sa1.drills.push(
  // a difference of cosines
  () => {
    let a = ri(1, 5), b; do b = ri(1, 5); while (b === a); const c = ri(1, 4), v = (b * b - a * a) / (2 * c);
    return { q: T`For small $\theta$, find the value that $\dfrac{\cos ${cof(a)}\theta-\cos ${cof(b)}\theta}{\theta\sin ${cof(c)}\theta}$ approaches.`, fields: [{ label: 'value', ans: v }],
      sol: T`$\cos ${cof(a)}\theta-\cos ${cof(b)}\theta\approx\left(1-\tfrac{${a * a}\theta^2}{2}\right)-\left(1-\tfrac{${b * b}\theta^2}{2}\right)=\tfrac{${b * b - a * a}}{2}\theta^2$.<br>$\theta\sin ${cof(c)}\theta\approx${cof(c)}\theta^2$. Ratio $\to\dfrac{${b * b - a * a}}{${2 * c}}=${nice(v)}$.<br><span class="muted">The 1s cancel, so you <b>must</b> use $1-\frac{\theta^2}2$ for cosine, not just $1$.</span>`,
      _v: () => near(lim0(t => (Math.cos(a * t) - Math.cos(b * t)) / (t * Math.sin(c * t))), v, 1e-5) };
  },
  // an approximate equation: keep only the small root
  () => {
    // q ≥ p keeps the second root near 2q/p ≥ 2 rad, clearly not small
    const p = pick([2, 3, 4, 5]), q = pick([p, p + 1, p + 2, 2 * p]), th = pick([0.02, 0.04, 0.05, 0.1]);
    const r = +(p * (1 - th * th / 2) + q * th).toFixed(6), D = q * q + 2 * p * (p - r), big = (q + Math.sqrt(D)) / p;
    return { q: T`Given that $\theta$ is small, use small angle approximations to find an approximate solution of $${p}\cos\theta+${cof(q)}\sin\theta=${r}$.`, fields: [{ label: 'θ', ans: th, tol: { abs: 5e-5 } }],
      sol: T`$${p}\left(1-\tfrac{\theta^2}{2}\right)+${cof(q)}\theta=${r}\Rightarrow${nice(p / 2)}\theta^2-${cof(q)}\theta${r - p < 0 ? '-' : '+'}${num(Math.abs(r - p), 6)}=0$ (after rearranging).<br>
$\theta=\dfrac{${q}\pm\sqrt{${nice(D)}}}{${p}}$: $\theta\approx${th}$ or $\theta\approx${big.toFixed(3)}$.<br>Only the small root is valid: $\theta\approx${th}$ rad. The other is far too large for the approximation to hold.`,
      _v: () => near(p * (1 - th * th / 2) + q * th, r, 1e-6) && big > 1 };
  },
  // percentage error of an approximation
  () => {
    const d = pick([5, 10, 15, 20, 30]), f = pick(['sin', 'cos', 'tan']), x = d * Math.PI / 180;
    const ap = f === 'cos' ? 1 - x * x / 2 : x, exv = Math[f](x), pct = Math.abs(ap - exv) / exv * 100;
    const fn = '\\' + f;
    return { q: T`Find the percentage error when $${fn}\,${d}^\circ$ is approximated by ${f === 'cos' ? T`$1-\frac{\theta^2}{2}$` : T`$\theta$`} (with $\theta$ in radians). Give 3 s.f.`, fields: [{ label: '% error', ans: pct, tol: { rel: 0.01 } }],
      sol: T`$\theta=\frac{${d}\pi}{180}=${x.toFixed(6)}$. Approximation: $${ap.toFixed(6)}$; true value $${fn}\,${d}^\circ=${exv.toFixed(6)}$.<br>Percentage error $=\dfrac{|${ap.toFixed(6)}-${exv.toFixed(6)}|}{${exv.toFixed(6)}}\times100=${pct.toPrecision(3)}\%$.<br><span class="muted">${f === 'cos' ? 'The next term is θ⁴/24, so the error grows like θ⁴: tiny for small angles.' : f === 'sin' ? 'The next term is −θ³/6, so the error grows like θ²/6 in relative terms.' : 'tan θ = θ + θ³/3 + …: the approximation is worse for tan than for sin.'}</span>`,
      _v: () => pct > 0 && pct < 20 };
  },
  // product of two approximations
  () => {
    const a = ri(1, 4), b = ri(1, 4), t = pick(['cc', 'ss', 'sec']);
    if (t === 'cc') { const v = (a * a + b * b) / 2; return { q: T`For small $\theta$, $\cos ${cof(a)}\theta\cos ${cof(b)}\theta\approx1-k\theta^2$. Find $k$.`, fields: [{ label: 'k', ans: v }], sol: T`$\left(1-\tfrac{${a * a}\theta^2}2\right)\left(1-\tfrac{${b * b}\theta^2}2\right)=1-\tfrac{${a * a}+${b * b}}{2}\theta^2+\tfrac{${a * a * b * b}}4\theta^4\approx1-${nice(v)}\theta^2$ (drop $\theta^4$).`, _v: () => near((1 - Math.cos(a * 1e-3) * Math.cos(b * 1e-3)) / 1e-6, v, 1e-5) }; }
    if (t === 'ss') { const v = a * b; return { q: T`For small $\theta$, $\sin ${cof(a)}\theta\tan ${cof(b)}\theta\approx k\theta^2$. Find $k$.`, fields: [{ label: 'k', ans: v }], sol: T`$\sin ${cof(a)}\theta\approx${cof(a)}\theta$ and $\tan ${cof(b)}\theta\approx${cof(b)}\theta$, so the product $\approx${v}\theta^2$.`, _v: () => near(Math.sin(a * 1e-3) * Math.tan(b * 1e-3) / 1e-6, v, 1e-5) }; }
    const v = a * a / 2; return { q: T`For small $\theta$, $\sec ${cof(a)}\theta\approx1+k\theta^2$. Find $k$.`, fields: [{ label: 'k', ans: v }], sol: T`$\sec ${cof(a)}\theta=\dfrac1{\cos ${cof(a)}\theta}\approx\left(1-\tfrac{${a * a}\theta^2}2\right)^{-1}\approx1+\tfrac{${a * a}}2\theta^2$ (binomial, first order).`, _v: () => near((1 / Math.cos(a * 1e-3) - 1) / 1e-6, v, 1e-4) };
  },
  // which approximation is right? (multiple choice)
  () => {
    const a = ri(2, 5), F = pick([
      { f: T`\cos ${a}\theta`, r: T`1-\tfrac{${a * a}}{2}\theta^2`, w: [T`1-\tfrac{${a}}{2}\theta^2`, T`1-${a * a}\theta^2`, T`${a}-\tfrac{${a}}{2}\theta^2`], why: T`Square the whole angle: $\cos ${a}\theta\approx1-\frac{(${a}\theta)^2}{2}=1-\frac{${a * a}\theta^2}{2}$.`, ok: () => near((1 - Math.cos(a * 1e-3)) / 1e-6, a * a / 2, 1e-4) },
      { f: T`1-\cos ${a}\theta`, r: T`\tfrac{${a * a}}{2}\theta^2`, w: [T`\tfrac{${a}}{2}\theta^2`, T`${a}\theta`, T`0`], why: T`The 1s cancel, leaving $\frac{(${a}\theta)^2}{2}$. Approximating $\cos$ by $1$ alone would give $0$, which is useless here.`, ok: () => true },
      { f: T`\tan ${a}\theta`, r: T`${a}\theta`, w: [T`\theta`, T`${a}\theta^2`, T`1-\tfrac{${a * a}}2\theta^2`], why: T`$\tan u\approx u$ with $u=${a}\theta$.`, ok: () => true },
      { f: T`\sin\theta^\circ`, r: T`\dfrac{\pi\theta}{180}`, w: [T`\theta`, T`\dfrac{180\theta}{\pi}`, T`1-\dfrac{\theta^2}{2}`], why: T`The approximations only hold in radians: convert first, $\theta^\circ=\frac{\pi\theta}{180}$ rad.`, ok: () => true },
    ]);
    return mcq(T`For small $\theta$, which is the best approximation to $${F.f}$?`, T`$${F.r}$`, F.w.map(w => T`$${w}$`), F.why, F.ok);
  },
);

/* ---------- richer one-page summaries (the Summary tab) ---------- */
al1.notes += T`<h4>Also examined</h4><ul><li><b>Non-monic factors</b> such as $(2x+1)$: substitute the root $x=-\frac12$; the fractions are where marks go.</li>
<li><b>Improper with a quadratic factor</b>: degree 3 over degree 3 gives a constant $K$ first, then $\frac{A}{x-a}+\frac{Bx+C}{x^2+c}$.</li>
<li><b>Degree 3 over degree 2</b>: long division gives a linear quotient $Px+K$ before the proper part.</li>
<li>Check the quadratic really is irreducible: discriminant $\lt0$. If it factorises, factorise it.</li></ul>`;
al2.notes += T`<h4>Also examined</h4><ul><li>$\displaystyle\sum_{r=n+1}^{2n}u_r=\sum_{r=1}^{2n}u_r-\sum_{r=1}^{n}u_r$: replace $n$ by $2n$ in the formula, then subtract. E.g. $\sum_{n+1}^{2n}r^2=\frac16n(2n+1)(7n+1)$.</li>
<li><b>Three factors</b>: $\dfrac1{r(r+1)(r+2)}=\dfrac12\left[\dfrac1{r(r+1)}-\dfrac1{(r+1)(r+2)}\right]$, sum to infinity $\frac14$.</li>
<li><b>Factorials</b>: $r\cdot r!=(r+1)!-r!$, so $\sum_1^n r\cdot r!=(n+1)!-1$.</li>
<li>Factors that differ by $a$: $\dfrac1{(ar+b)(ar+a+b)}=\dfrac1a\left(\dfrac1{ar+b}-\dfrac1{ar+a+b}\right)$.</li></ul>`;
sr1.notes += T`<h4>General term (A4)</h4><ul><li>$e^{ax}$: $\dfrac{a^rx^r}{r!}$ · $\sin x$: $\dfrac{(-1)^rx^{2r+1}}{(2r+1)!}$ · $\cos x$: $\dfrac{(-1)^rx^{2r}}{(2r)!}$ · $\ln(1+x)$: $\dfrac{(-1)^{r+1}x^r}{r}$ ($r\ge1$) · $(1+x)^n$: $\dbinom nr x^r$.</li>
<li>Check a general term by putting $r=0,1,2$ and comparing with the written-out series.</li></ul>
<h4>Validity (A5)</h4><ul><li>Replace $x$ by $ax$ and solve: $\ln(1+3x)$ needs $-1\lt3x\le1$, so $-\frac13\lt x\le\frac13$. For $\ln(1-2x)$: $-\frac12\le x\lt\frac12$ (the inequality flips).</li>
<li>$(c+dx)^n=c^n\left(1+\frac dcx\right)^n$, valid for $|x|\lt\frac{c}{|d|}$ (all $x$ if $n$ is a positive integer).</li>
<li>Products and sums are valid only where <b>every</b> part is: take the overlap.</li></ul>`;
sa1.notes += T`<h4>How small is small?</h4><ul><li>Relative error of $\sin x\approx x$ is about $\frac{x^2}{6}$: under $1\%$ for $|x|\lt0.24$ rad ($14^\circ$).</li>
<li>$\tan x\approx x$ is worse (error about $\frac{x^2}{3}$); $\cos x\approx1-\frac{x^2}2$ is better (error about $\frac{x^4}{24}$).</li>
<li>Approximate equations: solve the quadratic, then <b>reject</b> roots that are not small.</li></ul>`;
})();
