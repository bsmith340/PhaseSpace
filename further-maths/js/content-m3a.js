// CCEA GCE Mathematics A2 1 Pure Mathematics, part 1: proof, algebra & functions, parametric equations, sequences & series, trigonometry.
'use strict';

const gbin = (n, k) => { let c = 1; for (let i = 0; i < k; i++) c *= (n - i) / (i + 1); return c; }; // generalised binomial coefficient
const lnr = (a, b, v = 'x') => poly([[a, v], [b, '']]);
const sgnn = c => (c < 0 ? '-' : '+') + nice(Math.abs(c)); // signed exact coefficient
const c1 = c => (c === 1 ? '' : c === -1 ? '-' : c); // coefficient with 1 suppressed

topic({
  id: '_m3a', title: 'A2 1a', points: [
    /* ---------------- PROOF ---------------- */
    {
      id: 'm3_contra', title: 'Proof by contradiction', sims: [],
      notes: T`<ul><li>To prove a statement $P$: <b>assume $P$ is false</b>, reason correctly, and reach something impossible (a contradiction). So $P$ must be true.</li>
<li>Classic results: $\sqrt2$ is irrational; there are infinitely many primes; if $n^2$ is even then $n$ is even; there is no largest even number; $\log_2 3$ is irrational.</li>
<li>Write the assumption precisely ("suppose $\sqrt2=\frac ab$ with $a,b$ integers with no common factor") and say clearly where the contradiction is.</li></ul>`,
      drills: [
        () => { const L = [['$\\sqrt2$ is irrational', 'Assume $\\sqrt2=\\frac ab$ where $a,b$ are integers with no common factors', ['Assume $\\sqrt2$ is rational and equal to $1.414$', 'Assume $\\sqrt2=\\frac ab$ for some real numbers $a,b$', 'Assume $\\sqrt2$ is irrational']],
            ['there are infinitely many prime numbers', 'Assume there are finitely many primes $p_1,p_2,\\dots,p_n$', ['Assume every number is prime', 'Assume there are infinitely many primes', 'Assume $2$ is the only even prime']],
            ['if $n^2$ is even then $n$ is even', 'Assume $n^2$ is even and $n$ is odd', ['Assume $n^2$ is odd and $n$ is even', 'Assume $n$ is even', 'Assume $n^2$ is even and $n$ is even']],
            ['there is no greatest odd integer', 'Assume there is a greatest odd integer $N$', ['Assume every odd integer is greatest', 'Assume $N=2n+1$ is even', 'Assume there are no odd integers']],
            ['$\\log_2 3$ is irrational', 'Assume $\\log_2 3=\\frac pq$ with $p,q$ positive integers', ['Assume $\\log_2 3$ is an integer', 'Assume $\\log_23=1.585$', 'Assume $\\log_2 3=\\frac pq$ with $p,q$ irrational']]];
          const [s, r, d] = pick(L), opts = shuffle([r, ...d]); return { q: T`In a proof by contradiction that ${s}, what is the correct opening assumption?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`Assume the <b>negation</b> of the statement: ${r}. Then derive a contradiction.` }; },
        () => { const L = [['$\\sqrt2=\\frac ab$ (lowest terms) gives $a^2=2b^2$', 'so $a$ is even; writing $a=2c$ gives $b^2=2c^2$, so $b$ is even too — contradicting "no common factors"'],
            ['$N=p_1p_2\\cdots p_n+1$ is considered', 'dividing $N$ by any $p_i$ leaves remainder $1$, so $N$ has a prime factor not in the list — contradicting "these are all the primes"'],
            ['$\\log_23=\\frac pq$ gives $2^p=3^q$', 'the left side is even and the right side is odd — impossible']];
          const [setup, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 1), 'so the statement is false', 'which proves the assumption is true']);
          return { q: T`In a proof by contradiction, ${setup}. How does the argument finish?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`The contradiction: ${r}. Hence the original assumption was false.` }; },
        () => { const k = pick([3, 5, 7]), a = pick([6, 10, 14, 15, 21].filter(x => x % k === 0)), b = pick([9, 15, 21, 35, 49].filter(x => x % k === 0)), c = k * ri(2, 9) + ri(1, k - 1);
          return { q: T`Prove there are no integers $x,y$ with $${a}x+${b}y=${c}$. By contradiction: suppose such integers exist. Which integer divides the left-hand side but not ${c}? (Enter the largest such divisor.)`, fields: [{ label: 'divisor', ans: gcd(a, b) }],
            sol: T`$${a}x+${b}y=${gcd(a, b)}\left(${a / gcd(a, b)}x+${b / gcd(a, b)}y\right)$ is a multiple of $${gcd(a, b)}$, but $${c}$ is not (remainder $${c % gcd(a, b)}$). Contradiction, so no such integers exist.` }; },
      ],
    },
    /* ---------------- ALGEBRA & FUNCTIONS ---------------- */
    {
      id: 'm3_ratx', title: 'Rational expressions & algebraic division', sims: [],
      notes: T`<ul><li><b>Simplify</b> by factorising top and bottom fully, then cancel common <i>factors</i> (never terms).</li><li>Add/subtract over a common denominator; divide by multiplying by the reciprocal.</li>
<li><b>Algebraic division</b>: $\dfrac{f(x)}{x-a}=q(x)+\dfrac{r}{x-a}$, i.e. $f(x)=(x-a)q(x)+r$ with $r=f(a)$.</li>
<li>An improper fraction (degree of top $\ge$ degree of bottom) can be written as a polynomial plus a proper fraction: e.g. $\dfrac{x^2+5x+3}{x+2}=x+3-\dfrac3{x+2}$.</li></ul>`,
      drills: [
        () => { let p, q, k; do { p = rnz(-6, 6); q = rnz(-6, 6); k = rnz(-6, 6); } while (p === q || p === k || q === k || p === -k); return { q: T`Simplify $\dfrac{${poly([[1, 'x^2'], [p + k, 'x'], [p * k, '']])}}{${poly([[1, 'x^2'], [q + k, 'x'], [q * k, '']])}}$ into the form $\dfrac{x+a}{x+b}$.`, fields: [{ label: 'a', ans: p }, { label: 'b', ans: q }],
          sol: T`Factorise: $\dfrac{(x${sgn(p)})(x${sgn(k)})}{(x${sgn(q)})(x${sgn(k)})}=\dfrac{x${sgn(p)}}{x${sgn(q)}}$.` }; },
        () => { const a = rnz(-3, 3), q = [1, ri(-5, 5), ri(-8, 8)], r = ri(-9, 9); const c = [q[0], q[1] - a * q[0], q[2] - a * q[1], r - a * q[2]];
          return { q: T`Divide $${poly([[c[0], 'x^3'], [c[1], 'x^2'], [c[2], 'x'], [c[3], '']])}$ by $(x${sgn(-a)})$. Write the quotient as $x^2+px+q$ and give the remainder.`, fields: [{ label: 'p', ans: q[1] }, { label: 'q', ans: q[2] }, { label: 'remainder', ans: r }],
            sol: T`Quotient $${poly([[1, 'x^2'], [q[1], 'x'], [q[2], '']])}$, remainder $${r}$. Check with the remainder theorem: $f(${a})=${r}$.` }; },
        () => { const d = rnz(-5, 5), A = ri(-5, 6), B = rnz(-9, 9); const b = A + d, c = A * d + B;
          return { q: T`Write $\dfrac{${poly([[1, 'x^2'], [b, 'x'], [c, '']])}}{x${sgn(d)}}$ in the form $x+A+\dfrac{B}{x${sgn(d)}}$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }],
            sol: T`$x^2${sgn(b)}x${sgn(c)}=(x${sgn(d)})(x${sgn(A)})${sgn(B)}$: compare $x$: $d+A=${b}\Rightarrow A=${A}$; constants: $${d * A}+B=${c}\Rightarrow B=${B}$.` }; },
      ],
    },
    {
      id: 'm3_func', title: 'Functions: domain, range, composite & inverse', sims: ['m3_func'],
      notes: T`<ul><li>A <b>function</b> maps each input in its <b>domain</b> to exactly one output; the set of outputs is the <b>range</b>.</li><li><b>Composite</b> $fg(x)=f(g(x))$: do $g$ first. Its domain: inputs where $g(x)$ lies in the domain of $f$.</li>
<li><b>Inverse</b> $f^{-1}$ exists only if $f$ is one-to-one (restrict the domain if needed). Find it by swapping $x$ and $y$ and rearranging. Domain of $f^{-1}$ = range of $f$, range of $f^{-1}$ = domain of $f$.</li>
<li>The graph of $y=f^{-1}(x)$ is the reflection of $y=f(x)$ in $y=x$; $f(x)=f^{-1}(x)$ solutions lie on $y=x$ (for increasing $f$).</li></ul>`,
      drills: [
        () => { const a = rnz(-4, 4), b = ri(-6, 6), c = ri(-5, 5), k = ri(-3, 3); const f = x => a * x + b, g = x => x * x + c;
          return { q: T`$f(x)=${lnr(a, b)}$ and $g(x)=x^2${sgn(c)}$. Find $fg(${k})$ and $gf(${k})$.`, fields: [{ label: 'fg', ans: f(g(k)) }, { label: 'gf', ans: g(f(k)) }],
            sol: T`$g(${k})=${g(k)}$, so $fg(${k})=f(${g(k)})=${f(g(k))}$. $f(${k})=${f(k)}$, so $gf(${k})=g(${f(k)})=${g(f(k))}$. (Order matters.)` }; },
        () => { let a, b, c, d; do { a = rnz(-5, 5); b = ri(-6, 6); c = rnz(-3, 3); d = ri(-6, 6); } while (a * d - b * c === 0); const k = ri(-4, 4); const inv = x => (d * x - b) / (a - c * x); if (a - c * k === 0) return null;
          return { q: T`$f(x)=\dfrac{${lnr(a, b)}}{${lnr(c, d)}}$. Find $f^{-1}(${k})$.`, fields: [{ label: 'f⁻¹', ans: inv(k) }],
            sol: T`$y=\frac{${lnr(a, b)}}{${lnr(c, d)}}\Rightarrow y(${lnr(c, d)})=${lnr(a, b)}\Rightarrow x(${c}y${sgn(-a)})=${-b}${sgn(-d)}y\Rightarrow f^{-1}(x)=\dfrac{${lnr(d, -b)}}{${lnr(-c, a)}}$. So $f^{-1}(${k})=${nice(inv(k))}$. (Or solve $f(x)=${k}$.)` }; },
        () => { const p = ri(-4, 4), q = ri(-6, 6), r = p + ri(0, 3); const mn = (r - p) ** 2 + q;
          return { q: T`$f(x)=(x${sgn(-p)})^2${sgn(q)}$ with domain $x\ge${r}$. Find the least value in the range of $f$.`, fields: [{ label: 'least f(x)', ans: mn }],
            sol: T`$f$ is increasing for $x\ge${p}$, and the domain starts at $x=${r}$, so the range is $f(x)\ge f(${r})=${mn}$.${r === p ? ' (The vertex is at the start of the domain.)' : ''}` }; },
        () => { const a = pick([2, 3, -2, 0.5, 4]), b = rnz(-6, 6); if (a === 1) return null; return { q: T`$f(x)=${lnr(a, b)}$. Solve $f(x)=f^{-1}(x)$.`, fields: [{ label: 'x', ans: b / (1 - a) }],
          sol: T`For this linear $f$ the solution lies on $y=x$: $${lnr(a, b)}=x\Rightarrow x=${nice(b / (1 - a))}$. (Check: $f^{-1}(x)=\frac{x${sgn(-b)}}{${a}}$ gives the same.)` }; },
      ],
    },
    {
      id: 'm3_mod', title: 'The modulus function', sims: ['m3_func'],
      notes: T`<ul><li>$|x|=x$ for $x\ge0$ and $-x$ for $x\lt0$. $y=|f(x)|$: reflect the parts below the $x$-axis upwards. $y=f(|x|)$: take the part for $x\ge0$ and reflect it in the $y$-axis.</li>
<li>$|x-a|\lt b\iff a-b\lt x\lt a+b$ (distance from $a$ less than $b$). $|x-a|\gt b\iff x\lt a-b$ or $x\gt a+b$.</li>
<li>$|f(x)|=|g(x)|\iff f(x)=\pm g(x)$ (or square both sides). For $|f(x)|=g(x)$, solve $f(x)=\pm g(x)$ and <b>check</b> each answer.</li></ul>`,
      drills: [
        () => { const a = ri(-8, 8), b = ri(1, 9); return { q: T`Solve $|x${sgn(-a)}|\lt${b}$, giving your answer as $p\lt x\lt q$.`, fields: [{ label: 'p', ans: a - b }, { label: 'q', ans: a + b }], sol: T`$-${b}\lt x${sgn(-a)}\lt${b}\Rightarrow ${a - b}\lt x\lt ${a + b}$.` }; },
        () => { let a, b, c, d; do { a = rnz(-4, 4); b = ri(-8, 8); c = rnz(-4, 4); d = ri(-8, 8); } while (a === c || a === -c); const x1 = (d - b) / (a - c), x2 = (-d - b) / (a + c);
          return { q: T`Solve $|${lnr(a, b)}|=|${lnr(c, d)}|$.`, fields: [{ label: 'solutions', set: [x1, x2] }], sol: T`$${lnr(a, b)}=${lnr(c, d)}\Rightarrow x=${nice(x1)}$; $${lnr(a, b)}=-(${lnr(c, d)})\Rightarrow x=${nice(x2)}$.` }; },
        () => { const a = ri(-5, 5), m = pick([2, 3, 0.5]), c = ri(-3, 6); const cand = [(c + a) / (1 - m), (a - c) / (1 + m)].filter(x => isFinite(x) && Math.abs(Math.abs(x - a) - (m * x + c)) < 1e-9 && m * x + c >= 0); if (!cand.length) return null;
          return { q: T`Solve $|x${sgn(-a)}|=${m}x${sgn(c)}$.`, fields: [{ label: cand.length > 1 ? 'solutions' : 'x', ...(cand.length > 1 ? { set: cand } : { ans: cand[0] }) }],
            sol: T`Case $x${sgn(-a)}=${m}x${sgn(c)}$ gives $x=${nice((c + a) / (1 - m))}$; case $-(x${sgn(-a)})=${m}x${sgn(c)}$ gives $x=${nice((a - c) / (1 + m))}$. Check each in the original (the right side must be $\ge0$): valid: $${cand.map(nice).join(',\\ ')}$.` }; },
        () => { const L = [['$y=|f(x)|$', 'Reflect the parts of $y=f(x)$ below the $x$-axis in the $x$-axis'], ['$y=f(|x|)$', 'Keep the graph for $x\\ge0$ and reflect it in the $y$-axis'], ['$y=-f(x)$', 'Reflect the whole graph in the $x$-axis']];
          const [g, r] = pick(L), opts = shuffle(L.map(x => x[1]).concat(['Reflect the whole graph in the line $y=x$'])); return { q: T`How do you obtain the graph of ${g} from $y=f(x)$?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${g}: ${r.toLowerCase()}.` }; },
      ],
    },
    {
      id: 'm3_trans', title: 'Combinations of transformations', sims: ['m_transform'],
      notes: T`<ul><li>$y=af(x)$: stretch parallel to the $y$-axis, scale factor $a$. $y=f(ax)$: stretch parallel to the $x$-axis, scale factor $\frac1a$.</li><li>$y=f(x)+a$: translation $\binom0a$. $y=f(x+a)$: translation $\binom{-a}0$.</li>
<li>For combinations, a point $(p,q)$ on $y=f(x)$ maps to: $y=af(x+b)+c$ → $(p-b,\ aq+c)$; $y=f(ax+b)$ → $\left(\frac{p-b}{a},\ q\right)$.</li><li>Order matters for changes inside (or outside) the bracket: for $f(ax+b)$, translate by $-b$ first, then stretch by $\frac1a$.</li></ul>`,
      drills: [
        () => { const p = ri(-5, 5), q = ri(-5, 5), a = pick([2, 3, -1, -2, 0.5]), b = rnz(-4, 4), c = ri(-4, 4);
          return { q: T`The point $(${p},\ ${q})$ lies on $y=f(x)$. Find its image on $y=${a === 1 ? '' : a === -1 ? '-' : a}f(x${sgn(b)})${c ? sgn(c) : ''}$.`, fields: [{ label: 'x', ans: p - b }, { label: 'y', ans: a * q + c }],
            sol: T`Inside: $x${sgn(b)}=${p}\Rightarrow x=${p - b}$. Outside: $y=${a}(${q})${c ? sgn(c) : ''}=${nice(a * q + c)}$. Image $(${p - b},\ ${nice(a * q + c)})$.` }; },
        () => { const p = ri(-6, 6), q = ri(-5, 5), a = pick([2, 3, 4, 0.5]), b = rnz(-4, 4);
          return { q: T`The curve $y=f(x)$ has a maximum at $(${p},\ ${q})$. Find the coordinates of the maximum on $y=f(${a}x${sgn(b)})$.`, fields: [{ label: 'x', ans: (p - b) / a }, { label: 'y', ans: q }],
            sol: T`Solve $${a}x${sgn(b)}=${p}$: $x=${nice((p - b) / a)}$; the $y$-value is unchanged: $(${nice((p - b) / a)},\ ${q})$.` }; },
        () => { const a = pick([2, 3]), b = pick([1, 2, 3]), L = [[`$y=${a}f(x-${b})$`, `a translation $\\binom{${b}}{0}$ and a stretch parallel to the $y$-axis, scale factor $${a}$`], [`$y=f(${a}x)+${b}$`, `a stretch parallel to the $x$-axis, scale factor $\\frac1{${a}}$, then a translation $\\binom{0}{${b}}$`], [`$y=-f(x)+${b}$`, `a reflection in the $x$-axis, then a translation $\\binom{0}{${b}}$`]];
          const [g, r] = pick(L), opts = shuffle(L.map(x => x[1]).concat([`a translation $\\binom{-${b}}{0}$ and a stretch parallel to the $x$-axis, scale factor $${a}$`])); return { q: T`Describe how to obtain ${g} from $y=f(x)$.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${g}: ${r}.` }; },
      ],
    },
    {
      id: 'm3_pf', title: 'Partial fractions', sims: ['pfrac'],
      notes: T`<ul><li>Distinct linear factors: $\dfrac{px+q}{(x-a)(x-b)}=\dfrac A{x-a}+\dfrac B{x-b}$.</li><li>Repeated factor: $\dfrac{\dots}{(x-a)(x-b)^2}=\dfrac A{x-a}+\dfrac B{x-b}+\dfrac C{(x-b)^2}$.</li>
<li>Multiply through by the denominator and substitute the roots ("cover-up"), then compare coefficients (e.g. of $x^2$) for anything left.</li><li>The fraction must be proper first; otherwise divide.</li></ul>`,
      drills: [
        () => { let a, b; do { a = rnz(-5, 5); b = rnz(-5, 5); } while (a === b); const A = rnz(-6, 6), B = rnz(-6, 6), p = A + B, q = -(A * b + B * a);
          return { q: T`Express $\dfrac{${lnr(p, q)}}{(x${sgn(-a)})(x${sgn(-b)})}$ as $\dfrac A{x${sgn(-a)}}+\dfrac B{x${sgn(-b)}}$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }],
            sol: T`$${lnr(p, q)}\equiv A(x${sgn(-b)})+B(x${sgn(-a)})$. $x=${a}$: $${p * a + q}=${a - b}A\Rightarrow A=${A}$. $x=${b}$: $${p * b + q}=${b - a}B\Rightarrow B=${B}$.` }; },
        () => { let a, b; do { a = rnz(-4, 4); b = rnz(-4, 4); } while (a === b); const A = rnz(-5, 5), B = rnz(-5, 5), Cc = rnz(-5, 5);
          // A(x-b)^2 + B(x-a)(x-b) + C(x-a)
          const c2 = A + B, c1 = -2 * A * b - B * (a + b) + Cc, c0 = A * b * b + B * a * b - Cc * a;
          return { q: T`Express $\dfrac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{(x${sgn(-a)})(x${sgn(-b)})^2}$ as $\dfrac A{x${sgn(-a)}}+\dfrac B{x${sgn(-b)}}+\dfrac C{(x${sgn(-b)})^2}$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: Cc }],
            sol: T`Numerator $\equiv A(x${sgn(-b)})^2+B(x${sgn(-a)})(x${sgn(-b)})+C(x${sgn(-a)})$. $x=${a}$: $A(${(a - b) ** 2})=${c2 * a * a + c1 * a + c0}\Rightarrow A=${A}$. $x=${b}$: $C(${b - a})=${c2 * b * b + c1 * b + c0}\Rightarrow C=${Cc}$. $x^2$: $A+B=${c2}\Rightarrow B=${B}$.` }; },
        () => { const rs = shuffle([-3, -2, -1, 1, 2, 3]).slice(0, 3), co = [rnz(-4, 4), rnz(-4, 4), rnz(-4, 4)];
          // numerator = sum co_i * prod_{j≠i}(x - r_j); find coefficient for display
          const pm = (r1, r2) => [1, -(r1 + r2), r1 * r2], num2 = [0, 0, 0]; rs.forEach((r, i) => { const o = rs.filter((_, j) => j !== i), q = pm(o[0], o[1]); q.forEach((v, k) => (num2[k] += co[i] * v)); });
          return { q: T`Express $\dfrac{${poly([[num2[0], 'x^2'], [num2[1], 'x'], [num2[2], '']])}}{${rs.map(r => `(x${sgn(-r)})`).join('')}}$ in partial fractions $\dfrac A{x${sgn(-rs[0])}}+\dfrac B{x${sgn(-rs[1])}}+\dfrac C{x${sgn(-rs[2])}}$.`, fields: [{ label: 'A', ans: co[0] }, { label: 'B', ans: co[1] }, { label: 'C', ans: co[2] }],
            sol: T`Substitute each root into $\text{numerator}\equiv A(x${sgn(-rs[1])})(x${sgn(-rs[2])})+\dots$: $A=${co[0]}$, $B=${co[1]}$, $C=${co[2]}$.` }; },
      ],
    },
    {
      id: 'm3_fmod', title: 'Functions in modelling', sims: [],
      notes: T`<ul><li>Choose a function to fit a situation: linear (constant rate), quadratic (a maximum/minimum or projectile), exponential $A+Be^{-kt}$ (cooling, decay to a limit), reciprocal, trigonometric (periodic).</li>
<li>Use given data to find the constants, then use the model to predict.</li><li><b>Limitations</b>: the domain where it is valid (time can't be negative; a population can't be fractional), long-term behaviour that is unrealistic, ignored factors.</li><li><b>Refinement</b>: adjust the model to fix the limitation (add a term, change the type of function, restrict the domain).</li></ul>`,
      drills: [
        () => { const A = pick([15, 18, 20, 22]), B = pick([60, 70, 75, 80]), k = pick([0.02, 0.04, 0.05, 0.08, 0.1]), t = pick([5, 10, 15, 20, 30]); return { q: T`The temperature of a cup of tea is modelled by $T=${A}+${B}e^{-${k}t}$ ($^\circ$C, $t$ in minutes). Find (a) the temperature after $${t}$ minutes, (b) the time when the temperature is $${A + Math.round(B / 3)}^\circ$C.`, fields: [{ label: '(a) T', ans: A + B * Math.exp(-k * t) }, { label: '(b) t', ans: -Math.log(Math.round(B / 3) / B) / k }],
          sol: T`(a) $T=${A}+${B}e^{-${num(k * t)}}=${num(A + B * Math.exp(-k * t), 4)}$. (b) $${B}e^{-${k}t}=${Math.round(B / 3)}\Rightarrow t=\dfrac{1}{${k}}\ln\dfrac{${B}}{${Math.round(B / 3)}}=${num(-Math.log(Math.round(B / 3) / B) / k, 4)}$ min. The model tends to $${A}^\circ$C — the room temperature.` }; },
        () => { const a = pick([2, 3, 4, 5]), b = pick([40, 60, 80, 100, 120]), c = pick([50, 100, 150, 200]); const x = b / (2 * a), P = -a * x * x + b * x - c;
          return { q: T`A company's weekly profit (£) from selling $x$ items is modelled by $P=-${a}x^2+${b}x-${c}$. Find the number of items that maximises profit and the maximum profit.`, fields: [{ label: 'x', ans: x }, { label: 'max P', ans: P }],
            sol: T`$P=-${a}(x-${nice(x)})^2+${nice(P)}$, or $P'(x)=-${2 * a}x+${b}=0$: $x=${nice(x)}$, $P=£${nice(P)}$. (If $x$ must be a whole number, check the nearest integers.)` }; },
        () => { const L = [['$N=500e^{0.3t}$ for the number of bacteria', 'it predicts unlimited growth; in reality food and space run out'], ['$h=20t-4.9t^2$ for the height of a ball', 'it ignores air resistance and only holds until the ball lands ($h\\ge0$)'], ['$V=12\\,000\\times0.85^t$ for the value of a car', 'the value can never reach zero in the model, and the rate of depreciation may change']];
          const [m, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 2), 'there are no limitations because it fits the data']); return { q: T`Give a limitation of the model ${m}.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`Limitation: ${r}.` }; },
      ],
    },
    /* ---------------- PARAMETRIC ---------------- */
    {
      id: 'm3_param', title: 'Parametric equations', sims: ['m3_param'],
      notes: T`<ul><li>A curve can be given by $x=f(t)$, $y=g(t)$: each value of the parameter $t$ gives a point.</li>
<li><b>To Cartesian</b>: eliminate $t$ — rearrange one equation for $t$ and substitute, or use an identity ($\cos^2t+\sin^2t=1$ gives $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ from $x=a\cos t$, $y=b\sin t$).</li>
<li>Intersections with a line: substitute $x(t)$, $y(t)$ into the line, solve for $t$, then find the points.</li>
<li>Modelling: $t$ is often time — e.g. $x=ut\cos\theta$, $y=ut\sin\theta-\frac12gt^2$ for a projectile.</li></ul>`,
      drills: [
        () => { const a = pick([1, 2, 3, 4]), t = rnz(-3, 3); return { q: T`A curve has parametric equations $x=${a === 1 ? '' : a}t^2$, $y=${2 * a}t$. Find the point where $t=${t}$, and the value of $k$ in its Cartesian equation $y^2=kx$.`, fields: [{ label: 'x', ans: a * t * t }, { label: 'y', ans: 2 * a * t }, { label: 'k', ans: 4 * a }],
          sol: T`$t=${t}$: $(${a * t * t},\ ${2 * a * t})$. Eliminate $t=\frac y{${2 * a}}$: $x=${a}\cdot\frac{y^2}{${4 * a * a}}\Rightarrow y^2=${4 * a}x$.` }; },
        () => { const h = ri(-3, 3), p = ri(-4, 4), q = ri(-4, 4); // x = t + h, y = t^2 + p t + q → y = (x-h)^2 + p(x-h) + q
          const B = -2 * h + p, Cc = h * h - p * h + q;
          return { q: T`Find the Cartesian equation of $x=t${sgn(h)}$, $y=t^2${p ? sgn(p) + 't' : ''}${sgn(q)}$ in the form $y=x^2+bx+c$.`, fields: [{ label: 'b', ans: B }, { label: 'c', ans: Cc }],
            sol: T`$t=x${sgn(-h)}$: $y=(x${sgn(-h)})^2${p ? sgn(p) + `(x${sgn(-h)})` : ''}${sgn(q)}=x^2${sgn(B)}x${sgn(Cc)}$.` }; },
        () => { const a = pick([2, 3, 4, 5]), b = pick([1, 2, 3]), x0 = pick([1, -1]) * ri(0, a - 1); const y0 = b * Math.sqrt(1 - (x0 / a) ** 2);
          return { q: T`A curve is given by $x=${c1(a)}\cos t$, $y=${c1(b)}\sin t$, $0\le t\lt2\pi$. Find the positive value of $y$ when $x=${x0}$.`, fields: [{ label: 'y', ans: y0 }],
            sol: T`$\cos^2t+\sin^2t=1\Rightarrow\dfrac{x^2}{${a * a}}+\dfrac{y^2}{${b * b}}=1$ (an ellipse). $x=${x0}$: $y^2=${b * b}\left(1-\frac{${x0 * x0}}{${a * a}}\right)\Rightarrow y=${num(y0, 4)}$.` }; },
        () => { const k = pick([1, 2, 3]), r1 = ri(1, 4), r2 = -ri(1, 4); // x = t^2, y = 2t; line y = m x + c through t = r1, r2: 2t = m t^2 + c ... pick line through points
          const P1 = [r1 * r1, 2 * r1], P2 = [r2 * r2, 2 * r2]; const m = (P2[1] - P1[1]) / (P2[0] - P1[0]), c = P1[1] - m * P1[0]; if (!isFinite(m) || P1[0] === P2[0]) return null;
          return { q: T`The curve $x=t^2$, $y=2t$ meets the line $y=${nice(m)}x${c < 0 ? '-' : '+'}${nice(Math.abs(c))}$ at two points. Find the two values of $t$.`, fields: [{ label: 't values', set: [r1, r2] }],
            sol: T`Substitute: $2t=${nice(m)}t^2${c < 0 ? '-' : '+'}${nice(Math.abs(c))}\Rightarrow${nice(m)}t^2-2t${c < 0 ? '-' : '+'}${nice(Math.abs(c))}=0\Rightarrow t=${r1}$ or $t=${r2}$, giving $(${P1.join(',')})$ and $(${P2.join(',')})$.` }; },
      ],
    },
    /* ---------------- SEQUENCES & SERIES ---------------- */
    {
      id: 'm3_seq', title: 'Sequences, recurrence relations & sigma notation', sims: ['m3_seq'],
      notes: T`<ul><li>A sequence can be given by an $n$th-term formula $u_n=f(n)$ or a recurrence $u_{n+1}=f(u_n)$ with a first term.</li>
<li><b>Behaviour</b>: increasing ($u_{n+1}\gt u_n$), decreasing, <b>periodic</b> (repeats with period $k$), <b>convergent</b> (approaches a limit), <b>divergent</b>, <b>oscillating</b>.</li>
<li>If $u_{n+1}=au_n+b$ converges (when $|a|\lt1$), the limit $L$ satisfies $L=aL+b\Rightarrow L=\frac{b}{1-a}$.</li>
<li>$\displaystyle\sum_{r=1}^{n}u_r=u_1+u_2+\dots+u_n$. Note $\sum_{r=1}^{n}1=n$ and $\sum_{r=1}^nr=\frac12n(n+1)$.</li></ul>`,
      drills: [
        () => { const a = pick([2, 3, -1, 0.5, -2]), b = ri(-5, 5), u1 = ri(-4, 6); let u = u1; for (let i = 0; i < 3; i++) u = a * u + b; return { q: T`$u_{n+1}=${a === -1 ? '-' : a}u_n${sgn(b)}$, $u_1=${u1}$. Find $u_4$.`, fields: [{ label: 'u₄', ans: u }],
          sol: T`$u_2=${a * u1 + b}$, $u_3=${a * (a * u1 + b) + b}$, $u_4=${nice(u)}$.` }; },
        () => { const a = pick([0.5, 0.25, 0.8, -0.5, 0.6]), b = ri(1, 12), u1 = ri(0, 20); return { q: T`$u_{n+1}=${a}u_n+${b}$ with $u_1=${u1}$. The sequence converges. Find its limit.`, fields: [{ label: 'L', ans: b / (1 - a) }],
          sol: T`$L=${a}L+${b}\Rightarrow L(1-${a})=${b}\Rightarrow L=${nice(b / (1 - a))}$. (It converges because $|${a}|\lt1$.)` }; },
        () => { const a = rnz(-5, 5), b = ri(-6, 6), n = ri(5, 20); const S = a * n * (n + 1) / 2 + b * n; return { q: T`Evaluate $\displaystyle\sum_{r=1}^{${n}}(${lnr(a, b, 'r')})$.`, fields: [{ label: 'sum', ans: S }],
          sol: T`$${a}\sum r${b ? `${sgn(b)}\\sum1` : ''}=${a}\cdot\tfrac12(${n})(${n + 1})${b ? `${sgn(b)}(${n})` : ''}=${S}$.` }; },
        () => { const L = [['$u_n=3+\\frac{2}{n}$', 'convergent (decreasing to 3)'], ['$u_{n+1}=-u_n$, $u_1=4$', 'periodic with period 2'], ['$u_n=(-2)^n$', 'divergent and oscillating'], ['$u_n=2n+5$', 'divergent (increasing)'], ['$u_{n+1}=\\frac{1}{u_n}$, $u_1=3$', 'periodic with period 2'], ['$u_n=5\\left(-\\frac12\\right)^n$', 'convergent and oscillating (to 0)']];
          const [s, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 3)]); return { q: T`Describe the behaviour of the sequence ${s}.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${s}: ${r}. Write out the first few terms to see it.` }; },
      ],
    },
    {
      id: 'm3_ap', title: 'Arithmetic sequences & series', sims: ['m3_seq'],
      notes: T`$$u_n=a+(n-1)d,\qquad S_n=\frac n2\big(2a+(n-1)d\big)=\frac n2(a+l)$$
<ul><li>$a$ = first term, $d$ = common difference, $l$ = last term.</li><li><b>Proof</b> of $S_n$: write the sum forwards and backwards and add — each pair sums to $a+l$, and there are $n$ pairs.</li><li>Two terms given: set up simultaneous equations in $a$ and $d$.</li><li>"How many terms": $S_n\gt K$ gives a quadratic inequality in $n$; $n$ must be a positive integer.</li></ul>`,
      drills: [
        () => { const a = ri(-10, 20), d = rnz(-5, 6), n = ri(10, 40); return { q: T`An arithmetic sequence has first term $${a}$ and common difference $${d}$. Find the $${n}$th term and the sum of the first $${n}$ terms.`, fields: [{ label: 'uₙ', ans: a + (n - 1) * d }, { label: 'Sₙ', ans: n / 2 * (2 * a + (n - 1) * d) }],
          sol: T`$u_{${n}}=${a}+${n - 1}(${d})=${a + (n - 1) * d}$. $S_{${n}}=\frac{${n}}{2}\big(${2 * a}+${n - 1}(${d})\big)=${n / 2 * (2 * a + (n - 1) * d)}$.` }; },
        () => { const a = ri(-10, 20), d = rnz(-6, 6), p = ri(2, 6), q = p + ri(3, 10); return { q: T`In an arithmetic sequence, $u_{${p}}=${a + (p - 1) * d}$ and $u_{${q}}=${a + (q - 1) * d}$. Find the first term and common difference.`, fields: [{ label: 'a', ans: a }, { label: 'd', ans: d }],
          sol: T`$${q - p}d=${a + (q - 1) * d}-(${a + (p - 1) * d})=${(q - p) * d}\Rightarrow d=${d}$; $a=${a + (p - 1) * d}-${p - 1}(${d})=${a}$.` }; },
        () => { const a = ri(2, 10), d = ri(2, 6), K = ri(200, 2000); let n = 1; while (n / 2 * (2 * a + (n - 1) * d) <= K) n++; return { q: T`An arithmetic series has first term $${a}$ and common difference $${d}$. Find the least number of terms for the sum to exceed $${K}$.`, fields: [{ label: 'n', ans: n }],
          sol: T`$\frac n2(${2 * a}+${d}(n-1))\gt${K}\Rightarrow ${d}n^2+${2 * a - d}n-${2 * K}\gt0$. The positive root is $${num((-(2 * a - d) + Math.sqrt((2 * a - d) ** 2 + 8 * d * K)) / (2 * d), 4)}$, so the least integer is $n=${n}$.` }; },
      ],
    },
    {
      id: 'm3_gp', title: 'Geometric sequences & series; sum to infinity', sims: ['m3_seq'],
      notes: T`$$u_n=ar^{n-1},\qquad S_n=\frac{a(1-r^n)}{1-r}\ (r\ne1),\qquad S_\infty=\frac a{1-r}\ \text{ when }|r|\lt1$$
<ul><li><b>Proof</b> of $S_n$: $S_n-rS_n=a-ar^n$, so $S_n(1-r)=a(1-r^n)$.</li><li>The series converges only for $|r|\lt1$: then $r^n\to0$.</li><li>Problems with $r^n\gt K$ or $S_n\gt K$: take logs; remember $\ln r\lt0$ when $0\lt r\lt1$ flips the inequality.</li></ul>`,
      drills: [
        () => { const a = rnz(-6, 8), r = pick([2, 3, -2, 0.5, -0.5, 1.5]), n = ri(5, 10); return { q: T`A geometric sequence has first term $${a}$ and common ratio $${r}$. Find $u_{${n}}$ and $S_{${n}}$.`, fields: [{ label: 'uₙ', ans: a * r ** (n - 1) }, { label: 'Sₙ', ans: a * (1 - r ** n) / (1 - r) }],
          sol: T`$u_{${n}}=${a}(${r})^{${n - 1}}=${num(a * r ** (n - 1), 6)}$. $S_{${n}}=\dfrac{${a}(1-(${r})^{${n}})}{1-(${r})}=${num(a * (1 - r ** n) / (1 - r), 6)}$.` }; },
        () => { const a = ri(2, 30), r = pick([0.5, 0.25, -0.5, 0.2, 0.75, 0.6, -0.25]); const back = Math.random() < 0.5;
          if (back) return { q: T`A geometric series has first term $${a}$ and sum to infinity $${nice(a / (1 - r))}$. Find the common ratio.`, fields: [{ label: 'r', ans: r }], sol: T`$\frac{${a}}{1-r}=${nice(a / (1 - r))}\Rightarrow1-r=${nice(1 - r)}\Rightarrow r=${r}$.` };
          return { q: T`Find the sum to infinity of the geometric series with first term $${a}$ and common ratio $${r}$.`, fields: [{ label: 'S∞', ans: a / (1 - r) }], sol: T`$|r|\lt1$, so $S_\infty=\dfrac{${a}}{1-(${r})}=${nice(a / (1 - r))}$.` }; },
        () => { const a = ri(10, 100), r = pick([0.5, 0.8, 0.9, 0.6, 0.75]), f = pick([0.9, 0.95, 0.99]); const n = Math.ceil(Math.log(1 - f) / Math.log(r) - 1e-12);
          return { q: T`A geometric series has $a=${a}$ and $r=${r}$. Find the least $n$ for which $S_n$ exceeds $${f * 100}\%$ of $S_\infty$.`, fields: [{ label: 'n', ans: n }],
            sol: T`$S_n=S_\infty(1-r^n)\gt${f}S_\infty\Rightarrow r^n\lt${num(1 - f)}\Rightarrow n\gt\dfrac{\ln${num(1 - f)}}{\ln${r}}=${num(Math.log(1 - f) / Math.log(r), 4)}$ (the sign flips because $\ln${r}\lt0$). $n=${n}$.` }; },
        () => { const p = pick([2, 3, 4]), q = pick([1, 2, 3, 4, 5]); // r = (x - q)/p : |r| < 1 → q - p < x < q + p
          return { q: T`A geometric series has common ratio $r=\dfrac{x${sgn(-q)}}{${p}}$. Find the range of values of $x$ for which the sum to infinity exists, as $a\lt x\lt b$.`, fields: [{ label: 'a', ans: q - p }, { label: 'b', ans: q + p }], sol: T`Need $|r|\lt1$: $-${p}\lt x${sgn(-q)}\lt${p}\Rightarrow${q - p}\lt x\lt${q + p}$.` }; },
      ],
    },
    {
      id: 'm3_binr', title: 'Binomial expansion for any rational n', sims: [],
      notes: T`$$(1+x)^n=1+nx+\frac{n(n-1)}{2!}x^2+\frac{n(n-1)(n-2)}{3!}x^3+\cdots,\qquad |x|\lt1$$
<ul><li>For $n$ negative or fractional the series is infinite and valid only for $|x|\lt1$.</li><li>$(a+bx)^n=a^n\left(1+\frac bax\right)^n$, valid for $\left|\frac{bx}{a}\right|\lt1$, i.e. $|x|\lt\frac{|a|}{|b|}$.</li>
<li>Approximations: choose $x$ small so that the first few terms give a good estimate (e.g. $\sqrt{1.02}$ from $(1+x)^{1/2}$ with $x=0.02$).</li></ul>`,
      drills: [
        () => { const n = pick([-1, -2, -3, 0.5, -0.5, 1 / 3, 1.5]), a = pick([1, 2, 3, -1, -2, 0.5]); return { q: T`Find the coefficients of $x$ and $x^2$ in the expansion of $(1${a < 0 ? '-' : '+'}${Math.abs(a) === 1 ? '' : nice(Math.abs(a))}x)^{${nice(n)}}$.`, fields: [{ label: 'x coefficient', ans: n * a }, { label: 'x² coefficient', ans: gbin(n, 2) * a * a }],
          sol: T`$1+(${nice(n)})(${nice(a)}x)+\dfrac{(${nice(n)})(${nice(n - 1)})}{2}(${nice(a)}x)^2+\dots=1${sgnn(n * a)}x${sgnn(gbin(n, 2) * a * a)}x^2+\dots$ — coefficients $${nice(n * a)}$ and $${nice(gbin(n, 2) * a * a)}$. Valid for $|x|\lt${nice(1 / Math.abs(a))}$.` }; },
        () => { const a = pick([2, 3, 4, 5, 9]), b = pick([1, 2, 3, -1, -2]), n = pick([-1, -2, 0.5, -0.5]); return { q: T`State the range of values of $x$ for which the expansion of $(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x)^{${nice(n)}}$ is valid, in the form $|x|\lt k$.`, fields: [{ label: 'k', ans: a / Math.abs(b) }],
          sol: T`$(${a}${b < 0 ? '-' : '+'}${Math.abs(b) === 1 ? '' : Math.abs(b)}x)^{${nice(n)}}=${a}^{${nice(n)}}\left(1${b < 0 ? '-' : '+'}\tfrac{${Math.abs(b)}}{${a}}x\right)^{${nice(n)}}$, valid for $\left|\frac{${b}x}{${a}}\right|\lt1\Rightarrow|x|\lt${nice(a / Math.abs(b))}$.` }; },
        () => { const n = pick([0.5, -0.5, 1 / 3, -1]), x = pick([0.02, 0.01, 0.04, -0.02, 0.03]); const approx = 1 + n * x + gbin(n, 2) * x * x;
          return { q: T`Use the first three terms of the expansion of $(1+x)^{${nice(n)}}$ to estimate $(${num(1 + x)})^{${nice(n)}}$ (give 5 d.p.).`, fields: [{ label: 'estimate', ans: approx, tol: { abs: 6e-6 } }],
            sol: T`$1+(${nice(n)})(${x})+\dfrac{(${nice(n)})(${nice(n - 1)})}{2}(${x})^2=${approx.toFixed(6)}$. (Calculator: $${(1 + x) ** n}$ — very close because $x$ is small.)` }; },
      ],
    },
    {
      id: 'm3_seqmod', title: 'Sequences & series in modelling', sims: ['m3_seq'],
      notes: T`<ul><li><b>Arithmetic</b> models: a fixed amount added each period (salary rises of £800 a year, a stack growing by a fixed height).</li><li><b>Geometric</b> models: a fixed percentage change (savings at $3\%$ interest: multiply by $1.03$; depreciation of $15\%$: multiply by $0.85$).</li>
<li>Recurrences mix both: $u_{n+1}=1.05u_n-200$ (grow 5%, remove 200).</li><li>Check what $n=1$ means, and comment on how realistic the model is long term.</li></ul>`,
      drills: [
        () => { const s = pick([20000, 22000, 25000, 28000]), d = pick([500, 800, 1000, 1200]), n = pick([10, 15, 20]); return { q: T`A salary starts at £$${s}$ and rises by £$${d}$ each year. Find the salary in year $${n}$ and the total earned over the $${n}$ years.`, fields: [{ label: 'year n salary', ans: s + (n - 1) * d }, { label: 'total', ans: n / 2 * (2 * s + (n - 1) * d) }],
          sol: T`Arithmetic: $u_{${n}}=${s}+${n - 1}(${d})=${s + (n - 1) * d}$; $S_{${n}}=\frac{${n}}{2}(2(${s})+${n - 1}(${d}))=${n / 2 * (2 * s + (n - 1) * d)}$.` }; },
        () => { const P = pick([1000, 2000, 500, 1500]), r = pick([2, 3, 4, 5]), n = pick([5, 10, 15]); const g = 1 + r / 100, tot = P * g * (g ** n - 1) / (g - 1);
          return { q: T`At the start of each year £$${P}$ is paid into an account earning $${r}\%$ compound interest per year (added at the end of each year). Find the total in the account at the end of year $${n}$.`, fields: [{ label: '£', ans: tot }],
            sol: T`The deposits grow to $${P}(${g})^{${n}}+${P}(${g})^{${n - 1}}+\dots+${P}(${g})$ — a geometric series with $a=${P}(${g})$, $r=${g}$, $n=${n}$: $\dfrac{${P}(${g})(${g}^{${n}}-1)}{${num(g - 1)}}=£${num(tot, 7)}$.` }; },
        () => { const u0 = pick([1000, 2000, 5000]), g = pick([1.05, 1.1, 1.08]), c = pick([100, 150, 200, 300]); let u = u0; for (let i = 0; i < 3; i++) u = g * u - c; return { q: T`A fish population is modelled by $P_{n+1}=${g}P_n-${c}$, where $P_0=${u0}$ and $n$ is the number of years. Find $P_3$.`, fields: [{ label: 'P₃', ans: u }],
          sol: T`$P_1=${num(g * u0 - c, 6)}$, $P_2=${num(g * (g * u0 - c) - c, 6)}$, $P_3=${num(u, 6)}$.` }; },
      ],
    },
    /* ---------------- TRIGONOMETRY ---------------- */
    {
      id: 'm3_rtrig', title: 'Reciprocal & inverse trigonometric functions', sims: ['m3_rtrig'],
      notes: T`<ul><li>$\sec x=\dfrac1{\cos x}$, $\operatorname{cosec}x=\dfrac1{\sin x}$, $\cot x=\dfrac1{\tan x}=\dfrac{\cos x}{\sin x}$. Each is not defined where its partner is zero (vertical asymptotes on the graph).</li>
<li>$\sec x$ and $\operatorname{cosec}x$ have range $y\le-1$ or $y\ge1$.</li>
<li>Inverse functions with restricted domains: $\arcsin x\in\left[-\frac\pi2,\frac\pi2\right]$ for $x\in[-1,1]$; $\arccos x\in[0,\pi]$ for $x\in[-1,1]$; $\arctan x\in\left(-\frac\pi2,\frac\pi2\right)$ for all real $x$.</li><li>To solve $\sec x=k$, solve $\cos x=\frac1k$.</li></ul>`,
      drills: [
        () => { const A = pick([30, 45, 60, 120, 135, 150, 210, 240, 300, 315, 330]), f = pick(['sec', 'cosec', 'cot']); const r = A * D2R, v = f === 'sec' ? 1 / Math.cos(r) : f === 'cosec' ? 1 / Math.sin(r) : Math.cos(r) / Math.sin(r);
          const FN = { sec: '\\sec', cosec: '\\operatorname{cosec}', cot: '\\cot' }[f], IN = { sec: '\\cos', cosec: '\\sin', cot: '\\tan' }[f];
          return { q: T`Find the exact value of $${FN} ${A}^\circ$.`, fields: [{ label: 'value', ans: v }], sol: T`$${FN} ${A}^\circ=\dfrac1{${IN} ${A}^\circ}=${num(v, 5)}$ (an exact form such as $\frac{2}{\sqrt3}$ or $-\sqrt2$ is accepted).` }; },
        () => { const k = pick([2, -2, 1.5, -1.25, 3, Math.SQRT2]), f = pick(['sec', 'cosec']); const sols = f === 'sec' ? trigSolve('cos', 1, 0, 1 / k, 0, 360) : trigSolve('sin', 1, 0, 1 / k, 0, 360); const xs = sols.filter(x => x < 360 - 1e-9);
          const FN = f === 'sec' ? '\\sec' : '\\operatorname{cosec}', IN = f === 'sec' ? '\\cos' : '\\sin';
          return { q: T`Solve $${FN} x=${num(k, 5)}$ for $0\le x\lt360^\circ$ (to 1 d.p.).`, fields: [{ label: 'solutions', set: xs, tol: { abs: 0.06 } }],
            sol: T`$${IN} x=\frac{1}{${num(k, 5)}}=${num(1 / k, 4)}$, so $x=${degList(xs.map(x => +x.toFixed(1)))}$.` }; },
        () => { const L = [['\\arcsin\\left(-\\tfrac12\\right)', -Math.PI / 6], ['\\arccos\\left(-\\tfrac12\\right)', 2 * Math.PI / 3], ['\\arctan(\\sqrt3)', Math.PI / 3], ['\\arctan(-1)', -Math.PI / 4], ['\\arcsin\\left(\\tfrac{\\sqrt3}{2}\\right)', Math.PI / 3], ['\\arccos(0)', Math.PI / 2], ['\\arccos\\left(-\\tfrac{\\sqrt2}{2}\\right)', 3 * Math.PI / 4]];
          const [e, v] = pick(L); return { q: T`Find the exact value of $${e}$ (in radians).`, fields: [{ label: 'value', ans: v }], sol: T`Principal value: $${e}=${pf(Math.round(v / Math.PI * 12), 12)}$. Ranges: $\arcsin\in[-\frac\pi2,\frac\pi2]$, $\arccos\in[0,\pi]$, $\arctan\in(-\frac\pi2,\frac\pi2)$.` }; },
      ],
    },
    {
      id: 'm3_tid', title: 'sec²θ = 1 + tan²θ, proofs & equations', sims: [],
      notes: T`$$\sec^2\theta=1+\tan^2\theta\qquad\operatorname{cosec}^2\theta=1+\cot^2\theta$$
<ul><li>Proof: divide $\sin^2\theta+\cos^2\theta=1$ by $\cos^2\theta$ (or by $\sin^2\theta$).</li><li>Equations mixing $\tan$ and $\sec$ (or $\cot$ and $\operatorname{cosec}$): use the identity to get a quadratic in one function.</li>
<li><b>Proving identities</b>: start from the more complicated side; convert to $\sin$ and $\cos$; use the identities; work towards the other side. Don't "do the same to both sides".</li></ul>`,
      drills: [
        () => { const opt = pick([[2, 1, -1], [1, -1, -2], [2, -3, 1], [1, 1, -2], [3, -2, -1]]); // a sec^2 + b sec + c = 0 via tan^2 = sec^2 - 1
          const [a, b, c] = opt; const roots = [(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a), (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)].filter(s => Math.abs(s) >= 1 - 1e-12); const xs = [...new Set(roots.flatMap(s => trigSolve('cos', 1, 0, 1 / s, 0, 360).filter(x => x < 360 - 1e-9).map(x => +x.toFixed(6))))].sort((p, q) => p - q);
          if (!xs.length) return null;
          return { q: T`Solve $${a === 1 ? '' : a}\tan^2x${sgn(b)}\sec x${sgn(c + a)}=0$ for $0\le x\lt360^\circ$.`, fields: [{ label: 'solutions', set: xs, tol: { abs: 0.06 } }],
            sol: T`$\tan^2x=\sec^2x-1$: $${a}\sec^2x${sgn(b)}\sec x${sgn(c)}=0$, so $\sec x=${roots.map(r => nice(r)).join('$ or $')}$ (values with $|\sec x|\lt1$ are impossible). $\cos x=${roots.map(r => nice(1 / r)).join(',\\ ')}$: $x=${degList(xs.map(x => +x.toFixed(1)))}$.` }; },
        () => { const pq = pick([[3, 4], [5, 12], [8, 15], [7, 24], [1, 1], [2, 1]]), quad = pick([1, 2, 3, 4]); const [p, q] = pq, t = (quad === 2 || quad === 4 ? -1 : 1) * p / q; const c = (quad === 2 || quad === 3 ? -1 : 1) / Math.sqrt(1 + t * t);
          return { q: T`Given $\tan\theta=${nice(t)}$ with $\theta$ in quadrant ${quad}, find the exact value of $\sec\theta$.`, fields: [{ label: 'sec θ', ans: 1 / c }], sol: T`$\sec^2\theta=1+\tan^2\theta=${nice(1 + t * t)}$, so $\sec\theta=\pm${num(Math.sqrt(1 + t * t), 5)}$. In quadrant ${quad} $\cos\theta$ is ${c > 0 ? 'positive' : 'negative'}: $\sec\theta=${num(1 / c, 5)}$.` }; },
        () => { const L = [['$\\dfrac{1}{\\cos\\theta}-\\cos\\theta\\equiv\\sin\\theta\\tan\\theta$', 'Write over a common denominator: $\\frac{1-\\cos^2\\theta}{\\cos\\theta}=\\frac{\\sin^2\\theta}{\\cos\\theta}$'],
            ['$\\sec^2\\theta+\\operatorname{cosec}^2\\theta\\equiv\\sec^2\\theta\\operatorname{cosec}^2\\theta$', 'Write as $\\frac{1}{\\cos^2\\theta}+\\frac{1}{\\sin^2\\theta}=\\frac{\\sin^2\\theta+\\cos^2\\theta}{\\cos^2\\theta\\sin^2\\theta}$'],
            ['$\\tan\\theta+\\cot\\theta\\equiv\\sec\\theta\\operatorname{cosec}\\theta$', 'Write as $\\frac{\\sin\\theta}{\\cos\\theta}+\\frac{\\cos\\theta}{\\sin\\theta}=\\frac{\\sin^2\\theta+\\cos^2\\theta}{\\sin\\theta\\cos\\theta}$']];
          const [id, r] = pick(L), opts = shuffle([r, 'Multiply both sides by $\\cos\\theta$ and check the results are equal', 'Substitute $\\theta=45^\\circ$ into both sides', 'Square both sides']); return { q: T`What is the best first step to prove ${id}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}, then use $\sin^2\theta+\cos^2\theta=1$. Work on one side only; substituting values checks but doesn't prove.` }; },
      ],
    },
    {
      id: 'm3_comp', title: 'Compound & double angle formulae', sims: [],
      notes: T`$$\sin(A\pm B)=\sin A\cos B\pm\cos A\sin B\qquad\cos(A\pm B)=\cos A\cos B\mp\sin A\sin B\qquad\tan(A\pm B)=\frac{\tan A\pm\tan B}{1\mp\tan A\tan B}$$
$$\sin2A=2\sin A\cos A\qquad\cos2A=\cos^2A-\sin^2A=2\cos^2A-1=1-2\sin^2A\qquad\tan2A=\frac{2\tan A}{1-\tan^2A}$$
<ul><li>Exact values: $\sin75^\circ=\sin(45^\circ+30^\circ)=\frac{\sqrt6+\sqrt2}4$.</li><li>Double angle formulae follow by putting $B=A$; you must be able to prove them.</li><li>Equations like $\cos2x=\sin x$: choose the form of $\cos2x$ that leaves one function.</li></ul>`,
      drills: [
        () => { const L = [['\\sin75^\\circ', Math.sin(75 * D2R), '\\sin(45^\\circ+30^\\circ)'], ['\\cos15^\\circ', Math.cos(15 * D2R), '\\cos(45^\\circ-30^\\circ)'], ['\\tan75^\\circ', Math.tan(75 * D2R), '\\tan(45^\\circ+30^\\circ)'], ['\\cos105^\\circ', Math.cos(105 * D2R), '\\cos(60^\\circ+45^\\circ)'], ['\\sin15^\\circ', Math.sin(15 * D2R), '\\sin(45^\\circ-30^\\circ)'], ['\\tan15^\\circ', Math.tan(15 * D2R), '\\tan(45^\\circ-30^\\circ)']];
          const [e, v, how] = pick(L); return { q: T`Find the exact value of $${e}$ (decimal checks are accepted).`, fields: [{ label: 'value', ans: v }], sol: T`$${e}=${how}$; expand with the compound angle formula to get $${num(v, 6)}$ (e.g. $\sin75^\circ=\frac{\sqrt6+\sqrt2}{4}$, $\tan75^\circ=2+\sqrt3$).` }; },
        () => { const [p1, q1] = pick([[3, 5], [5, 13], [8, 17], [7, 25]]), [p2, q2] = pick([[4, 5], [12, 13], [15, 17], [24, 25]]); const sA = p1 / q1, cA = Math.sqrt(1 - sA * sA), cB = p2 / q2, sB = Math.sqrt(1 - cB * cB), plus = Math.random() < 0.5;
          const sv = plus ? sA * cB + cA * sB : sA * cB - cA * sB, cv = plus ? cA * cB - sA * sB : cA * cB + sA * sB;
          return { q: T`$A$ and $B$ are acute with $\sin A=\frac{${p1}}{${q1}}$ and $\cos B=\frac{${p2}}{${q2}}$. Find the exact values of $\sin(A${plus ? '+' : '-'}B)$ and $\cos(A${plus ? '+' : '-'}B)$.`, fields: [{ label: 'sin', ans: sv }, { label: 'cos', ans: cv }],
            sol: T`$\cos A=${nice(cA)}$, $\sin B=${nice(sB)}$ (right-angled triangles). $\sin(A${plus ? '+' : '-'}B)=${nice(sA)}\cdot${nice(cB)}${plus ? '+' : '-'}${nice(cA)}\cdot${nice(sB)}=${nice(sv)}$; $\cos(A${plus ? '+' : '-'}B)=${nice(cA)}\cdot${nice(cB)}${plus ? '-' : '+'}${nice(sA)}\cdot${nice(sB)}=${nice(cv)}$.` }; },
        () => { const [p, q] = pick([[3, 5], [4, 5], [5, 13], [12, 13], [1, 3], [2, 3]]); const c = p / q, s = Math.sqrt(1 - c * c); return { q: T`$\cos\theta=${fr(p, q)}$ with $\theta$ acute. Find the exact values of $\cos2\theta$ and $\sin2\theta$.`, fields: [{ label: 'cos 2θ', ans: 2 * c * c - 1 }, { label: 'sin 2θ', ans: 2 * s * c }],
          sol: T`$\cos2\theta=2\cos^2\theta-1=${nice(2 * c * c - 1)}$. $\sin\theta=\sqrt{1-${nice(c * c)}}=${num(s, 5)}$, so $\sin2\theta=2\sin\theta\cos\theta=${num(2 * s * c, 5)}$.` }; },
        () => { const k = pick([1, 2, -1, 3]); // cos 2x = k sin x  ->  1 - 2 s^2 = k s  ->  2s^2 + k s - 1 = 0
          const ss = [(-k + Math.sqrt(k * k + 8)) / 4, (-k - Math.sqrt(k * k + 8)) / 4].filter(s => Math.abs(s) <= 1); const xs = [...new Set(ss.flatMap(s => trigSolve('sin', 1, 0, s, 0, 360).filter(x => x < 360 - 1e-9).map(x => +x.toFixed(6))))].sort((a, b) => a - b);
          return { q: T`Solve $\cos2x=${k === 1 ? '' : k === -1 ? '-' : k}\sin x$ for $0\le x\lt360^\circ$ (1 d.p.).`, fields: [{ label: 'solutions', set: xs, tol: { abs: 0.06 } }],
            sol: T`$1-2\sin^2x=${k}\sin x\Rightarrow2\sin^2x${sgn(k)}\sin x-1=0$, so $\sin x=${ss.map(s => num(s, 5)).join('$ or $')}$, giving $x=${degList(xs.map(x => +x.toFixed(1)))}$.` }; },
      ],
    },
    {
      id: 'm3_rform', title: 'a cos θ + b sin θ in the form R cos(θ ± α)', sims: ['m3_rform'],
      notes: T`<ul><li>$a\cos\theta+b\sin\theta=R\cos(\theta-\alpha)$ where $R=\sqrt{a^2+b^2}$, $\tan\alpha=\frac ba$ — expand $R\cos(\theta-\alpha)=R\cos\theta\cos\alpha+R\sin\theta\sin\alpha$ and compare coefficients: $R\cos\alpha=a$, $R\sin\alpha=b$.</li>
<li>Similarly $R\sin(\theta+\alpha)$, $R\cos(\theta+\alpha)$, $R\sin(\theta-\alpha)$ — choose the form the question asks for.</li>
<li>Maximum $R$, minimum $-R$; solve equations by first writing in $R$ form. Useful in context for combining oscillations.</li></ul>`,
      drills: [
        () => { const a = ri(1, 8), b = ri(1, 8); const R = Math.hypot(a, b), al = Math.atan2(b, a) / D2R; return { q: T`Express $${c1(a)}\cos\theta+${c1(b)}\sin\theta$ in the form $R\cos(\theta-\alpha)$ with $R\gt0$ and $0\lt\alpha\lt90^\circ$ (give $\alpha$ to 2 d.p.).`, fields: [{ label: 'R', ans: R }, { label: 'α (°)', ans: al, tol: { abs: 0.006 } }],
          sol: T`$R\cos\alpha=${a}$, $R\sin\alpha=${b}$: $R=\sqrt{${a * a + b * b}}=${num(R, 5)}$, $\tan\alpha=\frac{${b}}{${a}}\Rightarrow\alpha=${al.toFixed(2)}^\circ$.` }; },
        () => { const a = ri(1, 9), b = ri(1, 9); const R = Math.hypot(a, b), al = Math.atan2(a, b) / D2R, th = 90 - al; return { q: T`Find the maximum value of $${c1(a)}\cos\theta+${c1(b)}\sin\theta$ and the smallest positive $\theta$ (in degrees, 1 d.p.) at which it occurs.`, fields: [{ label: 'max', ans: R }, { label: 'θ', ans: th, tol: { abs: 0.06 } }],
          sol: T`$=${num(R, 5)}\sin(\theta+\alpha)$ with $R\sin\alpha=${a}$, $R\cos\alpha=${b}$, so $\tan\alpha=\frac{${a}}{${b}}$, $\alpha=${num(al, 4)}^\circ$. Max $R=${num(R, 5)}$ when $\theta+\alpha=90^\circ$: $\theta=${th.toFixed(1)}^\circ$.` }; },
        () => { const a = ri(1, 6), b = ri(1, 6), R = Math.hypot(a, b), c = +(R * pick([0.3, 0.5, 0.6, 0.8, -0.4])).toFixed(1); const al = Math.atan2(b, a) / D2R; const xs = trigSolve('cos', 1, -al, c / R, 0, 360).filter(x => x < 360 - 1e-9);
          return { q: T`Solve $${c1(a)}\cos\theta+${c1(b)}\sin\theta=${c}$ for $0\le\theta\lt360^\circ$ (1 d.p.).`, fields: [{ label: 'solutions', set: xs, tol: { abs: 0.06 } }],
            sol: T`$${num(R, 5)}\cos(\theta-${al.toFixed(2)}^\circ)=${c}\Rightarrow\cos(\theta-${al.toFixed(2)}^\circ)=${num(c / R, 5)}$. So $\theta=${degList(xs.map(x => +x.toFixed(1)))}$.` }; },
      ],
    },
  ],
});
