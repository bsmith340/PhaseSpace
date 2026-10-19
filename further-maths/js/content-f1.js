// CCEA GCE Further Mathematics AS 1 Pure Mathematics: notes + drill generators.
// Reuses cx4, mx1, mx4, vc1, vc2, vc3 from content-1.js and adds the AS 1 points around them.
'use strict';

const cxs = (a, b) => poly([[a, ''], [b, 'i']]); // a + bi as TeX
const zmul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const zdiv = ([a, b], [c, d]) => { const q = c * c + d * d; return [(a * c + b * d) / q, (b * c - a * d) / q]; };
const angT = (k, n) => (k < 0 ? `\\left(${pf(k, n)}\\right)` : pf(k, n)); // argument in TeX, bracketed when negative
const prin = t => { while (t > Math.PI + 1e-12) t -= 2 * Math.PI; while (t <= -Math.PI + 1e-12) t += 2 * Math.PI; return t; };
const m2s = m => `\\begin{pmatrix}${m.map(r => r.map(nice).join('&')).join('\\\\')}\\end{pmatrix}`;
const mapv = (m, v) => [m[0][0] * v[0] + m[0][1] * v[1], m[1][0] * v[0] + m[1][1] * v[1]];
const flat = m => [m[0][0], m[0][1], m[1][0], m[1][1]];

topic({
  id: '_f1', title: 'FM AS 1', points: [
    /* ======================= FURTHER ALGEBRA ======================= */
    {
      id: 'f1_roots', title: 'Roots and coefficients of quadratic equations', sims: ['f1_poly'],
      notes: T`If $\alpha,\beta$ are the roots of $ax^2+bx+c=0$ then $ax^2+bx+c\equiv a(x-\alpha)(x-\beta)$, so
$$\alpha+\beta=-\frac ba,\qquad\alpha\beta=\frac ca.$$
<ul><li>Symmetric expressions can be written in terms of $\alpha+\beta$ and $\alpha\beta$ only:
$\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta$, $\ \alpha^3+\beta^3=(\alpha+\beta)^3-3\alpha\beta(\alpha+\beta)$, $\ \frac1\alpha+\frac1\beta=\frac{\alpha+\beta}{\alpha\beta}$, $\ (\alpha-\beta)^2=(\alpha+\beta)^2-4\alpha\beta$.</li>
<li>An equation with roots $\alpha,\beta$: $x^2-(\alpha+\beta)x+\alpha\beta=0$.</li></ul>`,
      drills: [
        () => { const a = pick([1, 1, 2, 3, 4]), b = rnz(-9, 9), c = rnz(-9, 9); return { q: T`$\alpha$ and $\beta$ are the roots of $${polyT([a, b, c], 'x')}=0$. Find $\alpha+\beta$ and $\alpha\beta$.`, fields: [{ label: 'α + β', ans: -b / a }, { label: 'αβ', ans: c / a }], sol: T`$\alpha+\beta=-\frac ba=${nice(-b / a)}$, $\alpha\beta=\frac ca=${nice(c / a)}$.` }; },
        () => { const a = pick([1, 2, 3]), b = rnz(-8, 8), c = rnz(-8, 8), S = -b / a, P = c / a; return { q: T`The roots of $${polyT([a, b, c], 'x')}=0$ are $\alpha$ and $\beta$. Find $\alpha^2+\beta^2$.`, fields: [{ label: 'α² + β²', ans: S * S - 2 * P }],
          sol: T`$\alpha+\beta=${nice(S)}$, $\alpha\beta=${nice(P)}$. $\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta=${nice(S * S)}-${par(nice(2 * P))}=${nice(S * S - 2 * P)}$.` }; },
        () => { const a = pick([1, 2]), b = rnz(-7, 7), c = rnz(-7, 7), S = -b / a, P = c / a; const k = pick(['cube', 'recip', 'ratio', 'diff']);
          const L = { cube: ['\\alpha^3+\\beta^3', S ** 3 - 3 * P * S, `(\\alpha+\\beta)^3-3\\alpha\\beta(\\alpha+\\beta)`], recip: ['\\frac1\\alpha+\\frac1\\beta', S / P, '\\frac{\\alpha+\\beta}{\\alpha\\beta}'], ratio: ['\\frac\\alpha\\beta+\\frac\\beta\\alpha', (S * S - 2 * P) / P, '\\frac{(\\alpha+\\beta)^2-2\\alpha\\beta}{\\alpha\\beta}'], diff: ['(\\alpha-\\beta)^2', S * S - 4 * P, '(\\alpha+\\beta)^2-4\\alpha\\beta'] }[k];
          return { q: T`$\alpha$ and $\beta$ are the roots of $${polyT([a, b, c], 'x')}=0$. Find $${L[0]}$.`, fields: [{ label: 'value', ans: L[1] }], sol: T`$\alpha+\beta=${nice(S)}$, $\alpha\beta=${nice(P)}$. $${L[0]}=${L[2]}=${nice(L[1])}$.` }; },
        () => { const r = ri(1, 4), c = 3 * r * r; return { q: T`One root of $x^2+kx+${c}=0$ is three times the other. Find the possible values of $k$.`, fields: [{ label: 'k values', set: [4 * r, -4 * r] }],
          sol: T`Roots $\alpha,3\alpha$: product $3\alpha^2=${c}\Rightarrow\alpha=\pm${r}$. Sum $4\alpha=-k\Rightarrow k=\mp${4 * r}$, so $k=${4 * r}$ or $${-4 * r}$.` }; },
      ],
    },
    {
      id: 'f1_trans', title: 'Forming equations with related roots', sims: [],
      notes: T`To form an equation whose roots are related to the roots $\alpha,\beta$ of a given quadratic:
<ol><li>Find $\alpha+\beta$ and $\alpha\beta$.</li><li>Find the sum and product of the <b>new</b> roots in terms of them.</li><li>Write $x^2-(\text{sum})x+(\text{product})=0$ and clear fractions.</li></ol>
<ul><li>Shortcut by substitution: for roots $\alpha+k$, replace $x$ by $x-k$; for roots $k\alpha$, replace $x$ by $\frac xk$; for roots $\frac1\alpha$, replace $x$ by $\frac1x$.</li><li>Any non-zero multiple of the equation is equally correct.</li></ul>`,
      drills: [
        () => { const a = pick([1, 2, 3]), b = rnz(-7, 7), c = rnz(-7, 7), k = pick([2, 3, -1, -2]); const S = -b / a, P = c / a;
          return { q: T`The roots of $${polyT([a, b, c], 'x')}=0$ are $\alpha$ and $\beta$. Find an equation $Ax^2+Bx+C=0$ with integer coefficients whose roots are $${k === -1 ? '-' : k}\alpha$ and $${k === -1 ? '-' : k}\beta$. Enter A, B, C.`, fields: [{ label: 'A, B, C', vec: [a, k * b, k * k * c], prop: true }],
            sol: T`New sum $${k === -1 ? '-' : k}(\alpha+\beta)=${nice(k * S)}$, new product $${k * k}\alpha\beta=${nice(k * k * P)}$. So $x^2-(${nice(k * S)})x+${par(nice(k * k * P))}=0$, i.e. $${polyT([a, k * b, k * k * c], 'x')}=0$.` }; },
        () => { const a = pick([1, 2]), b = rnz(-6, 6), c = rnz(-6, 6), k = pick([1, 2, -1, -3]); const B = b - 2 * a * k, C = c - k * b + a * k * k;
          return { q: T`The roots of $${polyT([a, b, c], 'x')}=0$ are $\alpha$ and $\beta$. Find an equation with integer coefficients whose roots are $\alpha${sgn(k)}$ and $\beta${sgn(k)}$. Enter A, B, C.`, fields: [{ label: 'A, B, C', vec: [a, B, C], prop: true }],
            sol: T`Substitute $x\to x${sgn(-k)}$ (if $y=\alpha${sgn(k)}$ then $\alpha=y${sgn(-k)}$): $${a === 1 ? '' : a}(x${sgn(-k)})^2${sgn(b)}(x${sgn(-k)})${sgn(c)}=0$, which expands to $${polyT([a, B, C], 'x')}=0$.` }; },
        () => { const a = pick([1, 1, 2]), b = rnz(-6, 6), c = rnz(-6, 6); const S = -b / a, P = c / a;
          return { q: T`The roots of $${polyT([a, b, c], 'x')}=0$ are $\alpha$ and $\beta$. Find an equation with integer coefficients whose roots are $\alpha^2$ and $\beta^2$. Enter A, B, C.`, fields: [{ label: 'A, B, C', vec: [a * a, -(b * b - 2 * a * c), c * c], prop: true }],
            sol: T`Sum $\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta=${nice(S * S - 2 * P)}$; product $(\alpha\beta)^2=${nice(P * P)}$. Equation: $${polyT([a * a, -(b * b - 2 * a * c), c * c], 'x')}=0$.` }; },
        () => { const a = ri(1, 5), b = rnz(-7, 7), c = rnz(-6, 6); return { q: T`The roots of $${polyT([a, b, c], 'x')}=0$ are $\alpha$ and $\beta$. Find an equation whose roots are $\frac1\alpha$ and $\frac1\beta$. Enter A, B, C.`, fields: [{ label: 'A, B, C', vec: [c, b, a], prop: true }],
          sol: T`Replace $x$ by $\frac1x$ and multiply by $x^2$: $${polyT([c, b, a], 'x')}=0$ — the coefficients reverse. (Check: new sum $\frac{\alpha+\beta}{\alpha\beta}=${nice(-b / c)}$.)` }; },
      ],
    },
    /* ======================= COMPLEX NUMBERS ======================= */
    {
      id: 'f1_cx', title: 'Complex numbers: arithmetic, conjugates & quadratics', sims: ['f1_poly', 'argand'],
      notes: T`<ul><li>$i^2=-1$. A complex number $z=x+iy$ has <b>real part</b> $\operatorname{Re}z=x$ and <b>imaginary part</b> $\operatorname{Im}z=y$ (both real).</li>
<li>Add/subtract: combine real and imaginary parts. Multiply: expand and use $i^2=-1$.</li><li><b>Conjugate</b> $z^*=x-iy$: $zz^*=x^2+y^2$ (real), $z+z^*=2x$.</li>
<li><b>Divide</b>: multiply top and bottom by the conjugate of the denominator: $\dfrac{a+bi}{c+di}=\dfrac{(a+bi)(c-di)}{c^2+d^2}$.</li>
<li>Two complex numbers are equal ⇔ their real parts are equal <b>and</b> their imaginary parts are equal.</li><li>$ax^2+bx+c=0$ with $b^2-4ac\lt0$: $x=\dfrac{-b\pm i\sqrt{4ac-b^2}}{2a}$, a conjugate pair.</li></ul>`,
      drills: [
        () => { const z = [rnz(-6, 6), rnz(-6, 6)], w = [rnz(-5, 5), rnz(-5, 5)], p = zmul(z, w); return { q: T`Express $(${cxs(...z)})(${cxs(...w)})$ in the form $a+bi$.`, fields: [{ label: 'a', ans: p[0] }, { label: 'b', ans: p[1] }],
          sol: T`$${z[0] * w[0]}${sgn(z[0] * w[1])}i${sgn(z[1] * w[0])}i${sgn(z[1] * w[1])}i^2=${cxs(...p)}$ (using $i^2=-1$).` }; },
        () => { const z = [rnz(-8, 8), rnz(-8, 8)], w = [ri(1, 3), rnz(-3, 3)], q = zdiv(z, w), d = w[0] ** 2 + w[1] ** 2; return { q: T`Express $\dfrac{${cxs(...z)}}{${cxs(...w)}}$ in the form $a+bi$.`, fields: [{ label: 'a', ans: q[0] }, { label: 'b', ans: q[1] }],
          sol: T`Multiply by $\frac{${cxs(w[0], -w[1])}}{${cxs(w[0], -w[1])}}$: numerator $${cxs(z[0] * w[0] + z[1] * w[1], z[1] * w[0] - z[0] * w[1])}$, denominator $${w[0]}^2+${par(w[1])}^2=${d}$. So $${nice(q[0])}${q[1] < 0 ? '-' : '+'}${nice(Math.abs(q[1]))}i$.` }; },
        () => { const a = pick([1, 1, 2]), p = ri(-4, 4), q = ri(1, 5); const b = -2 * a * p, c = a * (p * p + q * q); return { q: T`Solve $${polyT([a, b, c], 'x')}=0$. Give the roots as $p\pm qi$ with $q\gt0$.`, fields: [{ label: 'p', ans: p }, { label: 'q', ans: q }],
          sol: T`$b^2-4ac=${b * b - 4 * a * c}\lt0$. $x=\dfrac{${-b}\pm\sqrt{${b * b - 4 * a * c}}}{${2 * a}}=\dfrac{${-b}\pm${2 * a * q}i}{${2 * a}}=${p || ''}\pm ${q === 1 ? '' : q}i$.` }; },
        () => { const x = rnz(-6, 6), y = rnz(-6, 6), k = pick([2, 3, -2, -3]); const R = (1 + k) * x, I = (1 - k) * y; return { q: T`Find the complex number $z$ such that $z${k > 0 ? '+' : '-'}${Math.abs(k)}z^*=${cxs(R, I)}$. Give $z=a+bi$.`, fields: [{ label: 'a', ans: x }, { label: 'b', ans: y }],
          sol: T`Let $z=a+bi$: $(a+bi)${k > 0 ? '+' : '-'}${Math.abs(k)}(a-bi)=${poly([[1 + k, 'a'], [1 - k, 'bi']])}$. Equate real parts: $${1 + k}a=${R}\Rightarrow a=${x}$. Imaginary: $${1 - k}b=${I}\Rightarrow b=${y}$.` }; },
        () => { const p = ri(1, 5), q = rnz(-5, 5); const A = p * p - q * q, Bv = 2 * p * q; return { q: T`Find the square roots of $${cxs(A, Bv)}$. Enter the root with positive real part as $a+bi$.`, fields: [{ label: 'a', ans: p }, { label: 'b', ans: q }],
          sol: T`$(a+bi)^2=a^2-b^2+2abi$. Equate: $a^2-b^2=${A}$, $2ab=${Bv}$. Substituting $b=\frac{${Bv / 2}}{a}$ gives $a^4-${par(A)}a^2-${(Bv / 2) ** 2}=0$, so $a^2=${p * p}$. Roots $\pm(${cxs(p, q)})$.` }; },
        () => { const z = [rnz(-6, 6), rnz(-6, 6)], q = zdiv([1, 0], z); return { q: T`$z=${cxs(...z)}$. Find $\operatorname{Re}\left(\frac1z\right)$ and $\operatorname{Im}\left(\frac1z\right)$.`, fields: [{ label: 'Re(1/z)', ans: q[0] }, { label: 'Im(1/z)', ans: q[1] }],
          sol: T`$\frac1z=\frac{z^*}{zz^*}=\frac{${cxs(z[0], -z[1])}}{${z[0] ** 2 + z[1] ** 2}}$: real part $${nice(q[0])}$, imaginary part $${nice(q[1])}$ (a real number — no $i$).` }; },
      ],
    },
    {
      id: 'f1_poly', title: 'Cubic & quartic equations; conjugate pairs', sims: ['f1_poly'],
      notes: T`<ul><li>If a polynomial has <b>real coefficients</b>, its non-real roots occur in <b>conjugate pairs</b>: if $p+qi$ is a root, so is $p-qi$.</li>
<li>The pair gives a real quadratic factor: $(x-(p+qi))(x-(p-qi))=x^2-2px+(p^2+q^2)$.</li><li>A cubic with real coefficients has 3 real roots, or 1 real root and a conjugate pair.</li>
<li>Method: build the quadratic factor from the given root, then divide (or compare coefficients) to find the remaining factor. For a cubic given a real root, use the factor theorem first.</li></ul>`,
      drills: [
        () => { const p = rnz(-3, 3), q = ri(1, 4), r = rnz(-4, 4), N = p * p + q * q; const cs = [1, -(r + 2 * p), 2 * p * r + N, -r * N];
          return { q: T`Given that $${cxs(p, q)}$ is a root of $${polyT(cs, 'x')}=0$, find the other two roots. Enter the real root, then the other complex root as $a+bi$.`, fields: [{ label: 'real root', ans: r }, { label: 'a', ans: p }, { label: 'b', ans: -q }],
            sol: T`Real coefficients, so $${cxs(p, -q)}$ is also a root. Quadratic factor $x^2${sgn(-2 * p)}x+${N}$. Dividing: $${polyT(cs, 'x')}=(x^2${sgn(-2 * p)}x+${N})(x${sgn(-r)})$, so the real root is $${r}$.` }; },
        () => { const p = rnz(-3, 3), q = ri(1, 3), r = rnz(-4, 4), N = p * p + q * q; const a = -(r + 2 * p), b = 2 * p * r + N, c = -r * N;
          return { q: T`The equation $x^3+ax^2+bx${sgn(c)}=0$, where $a,b$ are real, has a root $${cxs(p, q)}$. Find $a$ and $b$.`, fields: [{ label: 'a', ans: a }, { label: 'b', ans: b }],
            sol: T`Roots $${cxs(p, q)}$, $${cxs(p, -q)}$ and a real root $r$. Product of roots $=-(${c})$: $r\times${N}=${-c}\Rightarrow r=${r}$. Then $x^3+ax^2+bx${sgn(c)}=(x^2${sgn(-2 * p)}x+${N})(x${sgn(-r)})$: $a=${a}$, $b=${b}$.` }; },
        () => { const p = rnz(-2, 2), q = ri(1, 3), u = rnz(-4, 4), v = rnz(-4, 4); const A1 = -2 * p, B1 = p * p + q * q, A2 = -(u + v), B2 = u * v; const cs = [1, A1 + A2, B1 + B2 + A1 * A2, A1 * B2 + A2 * B1, B1 * B2];
          return { q: T`$${cxs(p, q)}$ is a root of $${polyT(cs, 'x')}=0$. Find the other complex root $a+bi$ and the two real roots.`, fields: [{ label: 'a', ans: p }, { label: 'b', ans: -q }, { label: 'real roots', set: [u, v] }],
            sol: T`$${cxs(p, -q)}$ is also a root, giving the factor $x^2${sgn(A1)}x+${B1}$. Dividing: the other factor is $${polyT([1, A2, B2], 'x')}=(x${sgn(-u)})(x${sgn(-v)})$, so the real roots are $${u}$ and $${v}$.` }; },
        () => { const r = rnz(-3, 3), p = ri(-3, 3), q = ri(1, 4), N = p * p + q * q; const cs = [1, -(r + 2 * p), 2 * p * r + N, -r * N];
          return { q: T`Show that $x=${r}$ is a root of $${polyT(cs, 'x')}=0$ and hence find the complex roots as $p\pm qi$ ($q\gt0$).`, fields: [{ label: 'p', ans: p }, { label: 'q', ans: q }],
            sol: T`$f(${r})=0$ ✓, so $(x${sgn(-r)})$ is a factor. $f(x)=(x${sgn(-r)})(${polyT([1, -2 * p, N], 'x')})$. Then $x=\dfrac{${2 * p}\pm\sqrt{${4 * p * p - 4 * N}}}{2}=${p || ''}\pm ${q === 1 ? '' : q}i$.` }; },
        () => { const r = rnz(-4, 4), p = rnz(-3, 3), q = ri(1, 4); const right = cxs(p, -q), opts = shuffle([right, cxs(-p, q), cxs(-p, -q), cxs(q, p)]); return { q: T`A cubic equation with real coefficients has roots $${r}$ and $${cxs(p, q)}$. What is the third root?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(right) },
          sol: T`Non-real roots of a real polynomial come in conjugate pairs: $${right}$.` }; },
      ],
    },
    {
      id: 'f1_argand', title: 'Argand diagrams & the modulus–argument form', sims: ['argand'],
      notes: T`<ul><li>The <b>Argand diagram</b> plots $z=x+iy$ at $(x,y)$: real axis across, imaginary axis up.</li><li><b>Radians</b>: $\pi\text{ rad}=180^\circ$.</li>
<li><b>Modulus</b> $|z|=r=\sqrt{x^2+y^2}$ (distance from $O$). <b>Argument</b> $\arg z=\theta$, the angle from the positive real axis, with the principal value $-\pi\lt\theta\le\pi$.</li>
<li><b>Modulus–argument form</b>: $z=r(\cos\theta+i\sin\theta)$, with $x=r\cos\theta$, $y=r\sin\theta$.</li><li>Find $\theta$ with a sketch: $\tan^{-1}\left|\frac yx\right|$ gives the reference angle, then place it in the right quadrant.</li></ul>`,
      drills: [
        () => { let x, y; do { x = ri(-6, 6); y = ri(-6, 6); } while (!x && !y); const r = Math.hypot(x, y), th = Math.atan2(y, x);
          return { q: T`Find the modulus and the principal argument (radians) of $z=${cxs(x, y)}$.`, fields: [{ label: '|z|', ans: r }, { label: 'arg z', ans: th, tol: { abs: 0.002 } }],
            sol: T`$|z|=\sqrt{${x * x}+${y * y}}=${surd(x * x + y * y)}${Number.isInteger(r) ? '' : `=${num(r)}`}$. $z$ is ${x >= 0 ? (y >= 0 ? 'in the first quadrant (or on an axis)' : 'in the fourth quadrant') : y >= 0 ? 'in the second quadrant' : 'in the third quadrant'}: $\arg z=${num(th, 4)}$.` }; },
        () => { const r = ri(1, 6), n = pick([2, 3, 4, 6]), k = rnz(-n, n); const th = k * Math.PI / n; return { q: T`Express $${r === 1 ? '' : r}\left(\cos\left(${pf(k, n)}\right)+i\sin\left(${pf(k, n)}\right)\right)$ in the form $x+iy$ (decimals to 3 s.f. are fine).`, fields: [{ label: 'x', ans: r * Math.cos(th) }, { label: 'y', ans: r * Math.sin(th) }],
          sol: T`$x=${r}\cos\left(${pf(k, n)}\right)=${num(r * Math.cos(th), 4)}$, $y=${r}\sin\left(${pf(k, n)}\right)=${num(r * Math.sin(th), 4)}$.` }; },
        () => { const d = pick([15, 30, 45, 60, 75, 120, 135, 150, 210, 225, 240, 270, 300, 330]), toR = Math.random() < 0.6; return toR ? { q: T`Convert $${d}^\circ$ to radians.`, fields: [{ label: 'radians', ans: d * Math.PI / 180 }], sol: T`$${d}\times\frac{\pi}{180}=${pf(d, 180)}=${num(d * Math.PI / 180)}$ rad.` }
          : { q: T`Convert $${pf(d, 180)}$ radians to degrees.`, fields: [{ label: 'degrees', ans: d }], sol: T`$${pf(d, 180)}\times\frac{180}{\pi}=${d}^\circ$.` }; },
        () => { const s = pick([[1, 1], [-1, 1], [-1, -1], [1, -1]]), k = ri(1, 5), z = [s[0] * k, s[1] * k], right = Math.atan2(z[1], z[0]); const opts = shuffle([pf(1, 4), pf(3, 4), pf(-3, 4), pf(-1, 4)]); const ok = pf(Math.round(right / (Math.PI / 4)), 4);
          return { q: T`What is the principal argument of $${cxs(...z)}$?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(ok) }, sol: T`A sketch puts $z$ in the ${['', 'first', 'second', 'third', 'fourth'][s[0] > 0 ? (s[1] > 0 ? 1 : 4) : s[1] > 0 ? 2 : 3]} quadrant; the reference angle is $\frac\pi4$, so $\arg z=${ok}$.` }; },
        () => { const r = ri(2, 8), n = pick([3, 4, 6]), k = rnz(-n + 1, n - 1), th = k * Math.PI / n; const t = pick(['conj', 'neg']); const th2 = t === 'conj' ? -th : prin(th + Math.PI);
          return { q: T`$|z|=${r}$ and $\arg z=${pf(k, n)}$. Find $|${t === 'conj' ? 'z^*' : '-z'}|$ and $\arg(${t === 'conj' ? 'z^*' : '-z'})$.`, fields: [{ label: 'modulus', ans: r }, { label: 'argument', ans: th2, tol: { abs: 0.002 } }],
            sol: T`${t === 'conj' ? 'The conjugate reflects $z$ in the real axis: same modulus, argument negated' : '$-z$ is a half-turn of $z$ about $O$: same modulus, argument $\\pm\\pi$'}: $${r}$ and $${num(th2, 4)}$ $=${pf(Math.round(th2 / Math.PI * n), n)}$.` }; },
      ],
    },
    {
      id: 'f1_mularg', title: 'Multiplying & dividing in modulus–argument form', sims: ['argand'],
      notes: T`$$|zw|=|z||w|,\quad\arg(zw)=\arg z+\arg w;\qquad\left|\frac zw\right|=\frac{|z|}{|w|},\quad\arg\frac zw=\arg z-\arg w$$
<ul><li>Adjust the argument by $\pm2\pi$ to get back into $-\pi\lt\theta\le\pi$.</li><li>Geometrically, multiplying by $w$ <b>enlarges</b> by $|w|$ and <b>rotates</b> by $\arg w$. Multiplying by $i$ is a rotation through $\frac\pi2$ anticlockwise.</li>
<li>Proof: $r_1(\cos\theta_1+i\sin\theta_1)\,r_2(\cos\theta_2+i\sin\theta_2)=r_1r_2[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)]$ by the compound angle formulae.</li></ul>`,
      drills: [
        () => { const r1 = ri(1, 5), r2 = ri(1, 5), a = rnz(-11, 11), b = rnz(-11, 11), s = prin((a + b) * Math.PI / 12); return { q: T`$z=${r1}\left(\cos${angT(a, 12)}+i\sin${angT(a, 12)}\right)$ and $w=${r2}\left(\cos${angT(b, 12)}+i\sin${angT(b, 12)}\right)$. Find $|zw|$ and the principal value of $\arg(zw)$.`, fields: [{ label: '|zw|', ans: r1 * r2 }, { label: 'arg(zw)', ans: s, tol: { abs: 0.002 } }],
          sol: T`$|zw|=${r1}\times${r2}=${r1 * r2}$. $\arg(zw)=${pf(a, 12)}+${par(pf(b, 12))}=${pf(a + b, 12)}${Math.abs((a + b) * Math.PI / 12 - s) > 1e-9 ? `\\to${pf(Math.round(s * 12 / Math.PI), 12)}` : ''}$ (principal value).` }; },
        () => { const r1 = pick([2, 4, 6, 8, 12]), r2 = pick([1, 2, 4]), a = rnz(-5, 6), b = rnz(-5, 6), s = prin((a - b) * Math.PI / 6); return { q: T`$|z|=${r1}$, $\arg z=${pf(a, 6)}$; $|w|=${r2}$, $\arg w=${pf(b, 6)}$. Find $\left|\frac zw\right|$ and $\arg\frac zw$ (principal value).`, fields: [{ label: '|z/w|', ans: r1 / r2 }, { label: 'arg(z/w)', ans: s, tol: { abs: 0.002 } }],
          sol: T`$\left|\frac zw\right|=\frac{${r1}}{${r2}}=${nice(r1 / r2)}$; $\arg=${pf(a, 6)}-${par(pf(b, 6))}=${pf(a - b, 6)}${Math.abs((a - b) * Math.PI / 6 - s) > 1e-9 ? `\\to${pf(Math.round(s * 6 / Math.PI), 6)}` : ''}$.` }; },
        () => { const r = ri(1, 3), k = rnz(-5, 5), n = pick([2, 3]), s = prin(n * k * Math.PI / 6); return { q: T`$z=${r === 1 ? '' : r}\left(\cos${angT(k, 6)}+i\sin${angT(k, 6)}\right)$. Find $|z^${n}|$ and $\arg(z^${n})$ (principal value).`, fields: [{ label: 'modulus', ans: r ** n }, { label: 'argument', ans: s, tol: { abs: 0.002 } }],
          sol: T`Multiplying $z$ by itself ${n === 2 ? 'once' : 'twice'}: modulus $${r}^${n}=${r ** n}$, argument $${n}\times${par(pf(k, 6))}=${pf(n * k, 6)}${Math.abs(n * k * Math.PI / 6 - s) > 1e-9 ? `\\to${pf(Math.round(s * 6 / Math.PI), 6)}` : ''}$.` }; },
        () => { const L = [['i', 'a rotation through $\\frac\\pi2$ anticlockwise about $O$'], ['-1', 'a rotation through $\\pi$ about $O$'], ['2i', 'an enlargement, scale factor 2, and a rotation through $\\frac\\pi2$ anticlockwise'], ['-i', 'a rotation through $\\frac\\pi2$ clockwise about $O$']]; const [w, r] = pick(L), opts = shuffle(L.map(x => x[1]));
          return { q: T`Multiplying every complex number by $${w}$ corresponds to which transformation of the Argand diagram?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`$|${w}|$ is the scale factor and $\arg(${w})$ the angle of rotation: ${r}.` }; },
      ],
    },
    /* ======================= MATRICES ======================= */
    {
      id: 'f1_mat', title: 'Matrix arithmetic; zero & identity matrices', sims: [],
      notes: T`<ul><li>Add/subtract matrices of the <b>same order</b> entry by entry; a scalar multiplies every entry.</li>
<li>$\mathbf{AB}$ is defined when $\mathbf A$ is $m\times n$ and $\mathbf B$ is $n\times p$ (<b>conformable</b>); the result is $m\times p$. Entry $(i,j)$ = row $i$ of $\mathbf A$ · column $j$ of $\mathbf B$.</li>
<li>In general $\mathbf{AB}\ne\mathbf{BA}$; but $(\mathbf{AB})\mathbf C=\mathbf A(\mathbf{BC})$ and $\mathbf A(\mathbf B+\mathbf C)=\mathbf{AB}+\mathbf{AC}$.</li><li><b>Zero matrix</b> $\mathbf O$: all entries $0$. <b>Identity</b> $\mathbf I$: $1$s on the leading diagonal, so $\mathbf{AI}=\mathbf{IA}=\mathbf A$.</li></ul>`,
      drills: [
        () => { const A = M.rnd(2, -4, 5), B = M.rnd(2, -4, 5), P = M.mul(A, B); return { q: T`$\mathbf A=${m2s(A)}$, $\mathbf B=${m2s(B)}$. Find $\mathbf{AB}$ (enter the entries row by row).`, fields: [{ label: 'AB (a, b, c, d)', vec: flat(P) }],
          sol: T`$\mathbf{AB}=\begin{pmatrix}${A[0][0]}(${B[0][0]})+${par(A[0][1])}(${B[1][0]})&\cdots\\\cdots&\cdots\end{pmatrix}=${m2s(P)}$.` }; },
        () => { const A = [[ri(-3, 4), ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4), ri(-3, 4)]], B = [[ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)]], P = M.mul(A, B);
          return { q: T`$\mathbf A=${m2s(A)}$ ($2\times3$) and $\mathbf B=${m2s(B)}$ ($3\times2$). Find $\mathbf{AB}$, row by row.`, fields: [{ label: 'AB', vec: flat(P) }], sol: T`$2\times3$ times $3\times2$ gives $2\times2$: $\mathbf{AB}=${m2s(P)}$. (Entry $(1,1)$: $${A[0][0]}(${B[0][0]})+${par(A[0][1])}(${B[1][0]})+${par(A[0][2])}(${B[2][0]})=${P[0][0]}$.)` }; },
        () => { const A = M.rnd(2, -5, 5), B = M.rnd(2, -5, 5), k = rnz(-3, 3), m = rnz(-3, 3), R = A.map((r, i) => r.map((x, j) => k * x + m * B[i][j])); return { q: T`$\mathbf A=${m2s(A)}$, $\mathbf B=${m2s(B)}$. Find $${k === 1 ? '' : k === -1 ? '-' : k}\mathbf A${m < 0 ? '-' : '+'}${Math.abs(m) === 1 ? '' : Math.abs(m)}\mathbf B$, row by row.`, fields: [{ label: 'entries', vec: flat(R) }],
          sol: T`Multiply each entry, then add entry by entry: $${m2s(R)}$.` }; },
        () => { const [m, n, p] = [ri(1, 4), ri(1, 4), ri(1, 4)], ask = pick(['AB', 'BA']); const right = ask === 'AB' ? `${m} × ${p}` : (p === m ? `${n} × ${n}` : 'not defined'); const opts = shuffle([...new Set([right, `${m} × ${p}`, `${p} × ${m}`, `${n} × ${n}`, `${m} × ${n}`, 'not defined'])].slice(0, 4).concat([]).filter((x, k, A) => A.indexOf(x) === k)); if (!opts.includes(right)) opts[0] = right;
          return { q: T`$\mathbf A$ is a $${m}\times${n}$ matrix and $\mathbf B$ is $${n}\times${p}$. What is the order of $\mathbf{${ask}}$?`, mc: { options: opts, correct: opts.indexOf(right) }, sol: T`${ask === 'AB' ? `Inner orders match ($${n}=${n}$): $\\mathbf{AB}$ is $${m}\\times${p}$.` : p === m ? `$\\mathbf B$ is $${n}\\times${p}$ and $\\mathbf A$ is $${m}\\times${n}$; inner orders match: $${n}\\times${n}$.` : `$\\mathbf B$ ($${n}\\times${p}$) times $\\mathbf A$ ($${m}\\times${n}$) needs $${p}=${m}$, so it is not defined.`}` }; },
        () => { let A; do A = M.rnd(2, -3, 4); while (M.det2(A) === 0); const t = M.tr(A), d = M.det2(A), A2 = M.mul(A, A), R = A2.map((r, i) => r.map((x, j) => x - t * A[i][j])); return { q: T`$\mathbf A=${m2s(A)}$. Find $\mathbf A^2${t < 0 ? '+' : '-'}${Math.abs(t) === 1 ? '' : Math.abs(t)}\mathbf A$, row by row. What do you notice?`, fields: [{ label: 'entries', vec: flat(R) }],
          sol: T`$\mathbf A^2=${m2s(A2)}$, so $\mathbf A^2${t < 0 ? '+' : '-'}${Math.abs(t) === 1 ? '' : Math.abs(t)}\mathbf A=${m2s(R)}=${nice(-d)}\mathbf I$ — a multiple of the identity (it is always $-\det\mathbf A\cdot\mathbf I$ when you subtract the trace times $\mathbf A$).` }; },
      ],
    },
    {
      id: 'f1_tr', title: 'Linear transformations & successive transformations', sims: ['f1_trans'],
      notes: T`<ul><li>A $2\times2$ matrix maps $\begin{pmatrix}x\\y\end{pmatrix}\mapsto\mathbf M\begin{pmatrix}x\\y\end{pmatrix}$. Its <b>columns are the images</b> of $\begin{pmatrix}1\\0\end{pmatrix}$ and $\begin{pmatrix}0\\1\end{pmatrix}$ — use this to write down any matrix.</li>
<li>Rotation through $\theta$ anticlockwise about $O$: $\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}$. Reflection in $y=x\tan\theta$: $\begin{pmatrix}\cos2\theta&\sin2\theta\\\sin2\theta&-\cos2\theta\end{pmatrix}$.</li>
<li>Enlargement scale factor $k$: $k\mathbf I$. Stretch parallel to the $x$-axis: $\begin{pmatrix}k&0\\0&1\end{pmatrix}$. Shear: $\begin{pmatrix}1&k\\0&1\end{pmatrix}$ ($x$-axis invariant).</li>
<li><b>Successive transformations</b>: $\mathbf A$ followed by $\mathbf B$ is $\mathbf{BA}$ — the first transformation is written on the right.</li></ul>`,
      drills: [
        () => { const Mx = M.rnd(2, -3, 4), v = [rnz(-5, 5), rnz(-5, 5)], w = mapv(Mx, v); return { q: T`Find the image of the point $(${v[0]},${v[1]})$ under the transformation with matrix $${m2s(Mx)}$.`, fields: [{ label: 'image (x, y)', vec: w }], sol: T`$${m2s(Mx)}\begin{pmatrix}${v[0]}\\${v[1]}\end{pmatrix}=\begin{pmatrix}${w[0]}\\${w[1]}\end{pmatrix}$.` }; },
        () => { const d = pick([90, 180, 270, 45, 60, 30, 120, 135, 150]), t = dg(d), R = [[Math.cos(t), -Math.sin(t)], [Math.sin(t), Math.cos(t)]].map(r => r.map(x => (Math.abs(x) < 1e-12 ? 0 : x))); return { q: T`Write down the matrix for a rotation through $${d}^\circ$ anticlockwise about the origin (entries row by row; decimals or surds).`, fields: [{ label: 'entries', vec: flat(R) }],
          sol: T`$\begin{pmatrix}\cos${d}^\circ&-\sin${d}^\circ\\\sin${d}^\circ&\cos${d}^\circ\end{pmatrix}=${m2s(R.map(r => r.map(x => +x.toFixed(4))))}$.` }; },
        () => { const L = [[0, 'the $x$-axis'], [90, 'the $y$-axis'], [45, 'the line $y=x$'], [-45, 'the line $y=-x$'], [30, 'the line $y=\\frac{1}{\\sqrt3}x$'], [60, 'the line $y=\\sqrt3\\,x$']]; const [th, name] = pick(L), t = dg(2 * th), R = [[Math.cos(t), Math.sin(t)], [Math.sin(t), -Math.cos(t)]].map(r => r.map(x => (Math.abs(x) < 1e-12 ? 0 : x)));
          return { q: T`Write down the matrix for a reflection in ${name} (entries row by row).`, fields: [{ label: 'entries', vec: flat(R) }], sol: T`Reflection in $y=x\tan\theta$ with $\theta=${th}^\circ$: $\begin{pmatrix}\cos${2 * th}^\circ&\sin${2 * th}^\circ\\\sin${2 * th}^\circ&-\cos${2 * th}^\circ\end{pmatrix}=${m2s(R.map(r => r.map(x => +x.toFixed(4))))}$. Check: points on the mirror line stay put.` }; },
        () => { const A = M.rnd(2, -2, 3), B = M.rnd(2, -2, 3), C = M.mul(B, A); return { q: T`Transformation $\mathbf A=${m2s(A)}$ is followed by $\mathbf B=${m2s(B)}$. Find the matrix of the single equivalent transformation (row by row).`, fields: [{ label: 'entries', vec: flat(C) }], sol: T`$\mathbf A$ first, so the combined matrix is $\mathbf{BA}=${m2s(B)}${m2s(A)}=${m2s(C)}$ — not $\mathbf{AB}$.` }; },
        () => { const L = [[[[0, -1], [1, 0]], 'rotation through 90° anticlockwise about O'], [[[-1, 0], [0, 1]], 'reflection in the y-axis'], [[[3, 0], [0, 3]], 'enlargement, centre O, scale factor 3'], [[[1, 2], [0, 1]], 'shear with the x-axis invariant'], [[[2, 0], [0, 1]], 'stretch parallel to the x-axis, scale factor 2'], [[[0, 1], [1, 0]], 'reflection in the line y = x'], [[[-1, 0], [0, -1]], 'rotation through 180° about O']];
          const [m, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 3)]); return { q: T`Describe the transformation with matrix $${m2s(m)}$.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`Columns are the images of $\mathbf i$ and $\mathbf j$: $\mathbf i\mapsto(${m[0][0]},${m[1][0]})$, $\mathbf j\mapsto(${m[0][1]},${m[1][1]})$ — a ${r}.` }; },
      ],
    },
    {
      id: 'f1_invar', title: 'Invariant points & invariant lines', sims: ['f1_trans'],
      notes: T`<ul><li>An <b>invariant point</b> maps to itself: $\mathbf M\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}x\\y\end{pmatrix}$. The origin is always invariant under a matrix transformation.</li>
<li>A <b>line of invariant points</b>: every point on it stays put (e.g. the mirror line of a reflection).</li><li>An <b>invariant line</b>: every point on it maps to a point on the same line (not necessarily itself).</li>
<li>Invariant lines $y=mx$ through $O$: the image of $(x,mx)$ is $(x',y')$ with $y'=mx'$. Substituting gives a quadratic in $m$.</li><li>For $y=mx+c$, substitute $(x,mx+c)$ and require $y'=mx'+c$ for <b>all</b> $x$; compare coefficients.</li></ul>`,
      drills: [
        () => { const P = unimod2(), l = pick([-1, 2, 3, -2, 0]); if (P[0][0] === 0) return null; const Mx = M.mul(M.mul(P, [[1, 0], [0, l]]), M.inv2(P)).map(r => r.map(Math.round)); const m = P[1][0] / P[0][0];
          return { q: T`$\mathbf M=${m2s(Mx)}$. Show that $\mathbf M$ has a line of invariant points and find its equation $y=mx$. Enter $m$.`, fields: [{ label: 'm', ans: m }],
            sol: T`$\mathbf M\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}x\\y\end{pmatrix}$: $${poly([[Mx[0][0] - 1, 'x'], [Mx[0][1], 'y']])}=0$ and $${poly([[Mx[1][0], 'x'], [Mx[1][1] - 1, 'y']])}=0$ — the same line, $y=${nice(m)}x$. Every point on it is invariant.` }; },
        () => { const E = eig2(); const { A, P, l1, l2 } = E; if (!l1 || !l2 || P[0][0] === 0 || P[0][1] === 0 || A[0][1] === 0) return null; const ms = [P[1][0] / P[0][0], P[1][1] / P[0][1]];
          return { q: T`Find the invariant lines through the origin, $y=mx$, of the transformation $${m2s(A)}$. Enter the values of $m$.`, fields: [{ label: 'm values', set: ms }],
            sol: T`Image of $(x,mx)$: $x'=${poly([[A[0][0], 'x'], [A[0][1], 'mx']])}$, $y'=${poly([[A[1][0], 'x'], [A[1][1], 'mx']])}$. Need $y'=mx'$: $${A[1][0]}+${par(A[1][1])}m=m(${A[0][0]}+${par(A[0][1])}m)$, i.e. $${polyT([A[0][1], A[0][0] - A[1][1], -A[1][0]], 'm')}=0$, so $m=${nice(ms[0])}$ or $${nice(ms[1])}$.` }; },
        () => { const q = rnz(-3, 3), k = rnz(-3, 3), d = rnz(-2, 3), a = 1 - k * q, c = q * (1 - d); return { q: T`The point $(1,${q})$ is invariant under $\mathbf M=\begin{pmatrix}${a}&k\\${c}&${d}\end{pmatrix}$. Find $k$.`, fields: [{ label: 'k', ans: k }],
          sol: T`$${a}(1)+k(${q})=1\Rightarrow k=\frac{1-${par(a)}}{${q}}=${k}$. (Check row 2: $${c}+${d}(${q})=${c + d * q}=${q}$ ✓.)` }; },
        () => { const opts = ['Every point on the line maps to itself', 'Every point on the line maps to a point on the same line', 'The line maps to a different, parallel line', 'Only the origin maps to itself']; const ask = pick([0, 1]);
          return { q: T`What is meant by ${ask === 0 ? 'a <b>line of invariant points</b>' : 'an <b>invariant line</b>'}?`, mc: { options: opts, correct: ask }, sol: T`${ask === 0 ? 'Each point is fixed individually, e.g. the mirror line of a reflection.' : 'The line as a whole maps onto itself; individual points may move along it. A line of invariant points is a special case.'}` }; },
      ],
    },
    {
      id: 'f1_det', title: 'Determinants, area scale factor & singular matrices', sims: ['f1_trans', 'matrix2'],
      notes: T`<ul><li>$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$. For $3\times3$, expand along a row (see the next point).</li>
<li>$|\det\mathbf M|$ is the <b>area scale factor</b> of the transformation: image area $=|\det\mathbf M|\times$ object area. A negative determinant means the orientation is reversed (e.g. a reflection).</li>
<li>$\det\mathbf M=0$: the matrix is <b>singular</b>. The whole plane collapses onto a line (or a point), so different points share an image and there is no inverse.</li><li>$\det\mathbf M\ne0$: <b>non-singular</b>, so $\mathbf M^{-1}$ exists. $\det(\mathbf{AB})=\det\mathbf A\det\mathbf B$.</li></ul>`,
      drills: [
        () => { const A = M.rnd(2, -6, 7); return { q: T`Find $\det${m2s(A)}$.`, fields: [{ label: 'det', ans: M.det2(A) }], sol: T`$(${A[0][0]})(${A[1][1]})-(${A[0][1]})(${A[1][0]})=${M.det2(A)}$.` }; },
        () => { let A; do A = M.rnd(2, -4, 5); while (M.det2(A) === 0); const ar = pick([3, 4, 5, 6, 7.5, 10, 12]); return { q: T`A shape of area $${ar}$ units² is transformed by $${m2s(A)}$. Find the area of its image.`, fields: [{ label: 'area', ans: Math.abs(M.det2(A)) * ar }],
          sol: T`$\det=${M.det2(A)}$, so the area scale factor is $${Math.abs(M.det2(A))}$: image area $${Math.abs(M.det2(A))}\times${ar}=${num(Math.abs(M.det2(A)) * ar)}$.${M.det2(A) < 0 ? ' (The negative sign means the orientation is reversed.)' : ''}` }; },
        () => { const r1 = ri(-5, 5); let r2; do r2 = ri(-5, 5); while (r2 === r1); const c = -(r1 + r2), ab = -r1 * r2; if (ab === 0) return null; const a = pick([1, -1]) * (Math.abs(ab) % 2 === 0 && Math.random() < 0.5 ? 2 : 1), b = ab / a;
          return { q: T`Find the values of $k$ for which $\begin{pmatrix}k&${a}\\${b}&k${c ? sgn(c) : ''}\end{pmatrix}$ is singular.`, fields: [{ label: 'k values', set: [r1, r2] }], sol: T`$\det=k(k${c ? sgn(c) : ''})-${par(a * b)}=${polyT([1, c, -a * b], 'k')}=0\Rightarrow k=${r1}$ or $${r2}$.` }; },
        () => { const d = pick([-3, -1, 0, 1, 4]); const L = { '-3': 'Areas are multiplied by 3 and the orientation is reversed', '-1': 'Areas are unchanged but the orientation is reversed', 0: 'The plane is mapped onto a line or a point, so the matrix has no inverse', 1: 'Areas and orientation are both preserved', 4: 'Areas are multiplied by 4 and the orientation is preserved' };
          const r = L[d], opts = shuffle([r, ...shuffle(Object.values(L).filter(x => x !== r)).slice(0, 3)]); return { q: T`A transformation matrix has determinant $${d}$. Which statement is true?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`$|\det|$ is the area scale factor; the sign gives the orientation. ${r}.` }; },
      ],
    },
    /* ======================= VECTORS ======================= */
    {
      id: 'f1_v3', title: 'Vectors in 3D & the scalar product', sims: ['space3d:lineplane'],
      notes: T`<ul><li>$\mathbf a=a_1\mathbf i+a_2\mathbf j+a_3\mathbf k=\begin{pmatrix}a_1\\a_2\\a_3\end{pmatrix}$, $|\mathbf a|=\sqrt{a_1^2+a_2^2+a_3^2}$. Distance $AB=|\mathbf b-\mathbf a|$.</li>
<li><b>Scalar product</b>: $\mathbf a\cdot\mathbf b=a_1b_1+a_2b_2+a_3b_3=|\mathbf a||\mathbf b|\cos\theta$, so $\cos\theta=\dfrac{\mathbf a\cdot\mathbf b}{|\mathbf a||\mathbf b|}$.</li>
<li><b>Perpendicular</b> ⇔ $\mathbf a\cdot\mathbf b=0$ (for non-zero vectors). $\mathbf a\cdot\mathbf a=|\mathbf a|^2$.</li><li>Angle between two lines: use their direction vectors (take the acute angle).</li></ul>`,
      drills: [
        () => { const A = V.rnd(-5, 5), B = V.rnd(-5, 5), d = V.sub(B, A); if (V.isZero(d)) return null; return { q: T`Find the distance between $A${V.row(A)}$ and $B${V.row(B)}$.`, fields: [{ label: 'AB', ans: V.norm(d) }], sol: T`$\overrightarrow{AB}=${V.tex(d)}$, $|\overrightarrow{AB}|=\sqrt{${V.n2(d)}}=${surd(V.n2(d))}${Number.isInteger(V.norm(d)) ? '' : `=${num(V.norm(d))}`}$.` }; },
        () => { const a = V.rnd(-5, 5), b = V.rnd(-5, 5); return { q: T`Find $${V.tex(a)}\cdot${V.tex(b)}$.`, fields: [{ label: 'a · b', ans: V.dot(a, b) }], sol: T`$${a[0]}(${b[0]})+${par(a[1])}(${b[1]})+${par(a[2])}(${b[2]})=${V.dot(a, b)}$.` }; },
        () => { let a, b; do { a = V.rnd(-4, 4); b = V.rnd(-4, 4); } while (V.isZero(a) || V.isZero(b)); const th = Math.acos(Math.max(-1, Math.min(1, V.dot(a, b) / (V.norm(a) * V.norm(b))))) * 180 / Math.PI;
          return { q: T`Find the angle between $${V.tex(a)}$ and $${V.tex(b)}$ (degrees).`, fields: [{ label: 'θ (°)', ans: th, tol: { abs: 0.06 } }], sol: T`$\cos\theta=\dfrac{${V.dot(a, b)}}{\sqrt{${V.n2(a)}}\sqrt{${V.n2(b)}}}\Rightarrow\theta=${num(th, 4)}^\circ$.` }; },
        () => { const a = V.rnd(-4, 4), b = V.rnd(-4, 4), i = ri(0, 2); if (a[i] === 0 || b[i] === 0) return null; const rest = V.dot(a, b) - a[i] * b[i]; const k = -rest / b[i]; const disp = a.map((x, j) => (j === i ? 'k' : x));
          return { q: T`Find $k$ such that $\begin{pmatrix}${disp.join('\\\\')}\end{pmatrix}$ and $${V.tex(b)}$ are perpendicular.`, fields: [{ label: 'k', ans: k }], sol: T`Scalar product $=0$: $${rest}${sgn(b[i])}k=0\Rightarrow k=${nice(k)}$.` }; },
      ],
    },
    {
      id: 'f1_line', title: 'Lines in 3D: equations, intersections & skew lines', sims: ['space3d:skew'],
      notes: T`<ul><li><b>Vector form</b>: $\mathbf r=\mathbf a+\lambda\mathbf d$ (through $A$, direction $\mathbf d$). Through $A$ and $B$: $\mathbf d=\mathbf b-\mathbf a$.</li>
<li><b>Cartesian form</b>: $\dfrac{x-a_1}{d_1}=\dfrac{y-a_2}{d_2}=\dfrac{z-a_3}{d_3}\ (=\lambda)$.</li><li>Two lines in 3D are <b>parallel</b> (directions are multiples), <b>intersect</b> (a common point), or are <b>skew</b> (neither).</li>
<li>To test: equate the general points, solve two of the three equations for $\lambda,\mu$, and check the third. If it fails and the lines aren't parallel, they are skew.</li></ul>`,
      drills: [
        () => { const a = V.rnd(-4, 4); let d; do d = V.rnd(-3, 3); while (d[2] === 0); const t = rnz(-3, 3); const z0 = a[2] + t * d[2]; const P = V.add(a, V.mul(d, t));
          return { q: T`The line $${vecStr(a, d)}$ meets the plane $z=${z0}$ at $P$. Find the coordinates of $P$.`, fields: [{ label: 'P', vec: P }], sol: T`$z$: $${a[2]}${sgn(d[2])}\lambda=${z0}\Rightarrow\lambda=${t}$. $P=${V.row(P)}$.` }; },
        () => { const A = V.rnd(-4, 4), B = V.rnd(-4, 4), d = V.sub(B, A); if (V.isZero(d)) return null; const t = pick([-2, -1, 2, 3]), C = V.add(A, V.mul(d, t));
          return { q: T`The line $L$ passes through $A${V.row(A)}$ and $B${V.row(B)}$, with equation $\mathbf r=\mathbf a+\lambda(\mathbf b-\mathbf a)$. Show that $C${V.row(C)}$ lies on $L$ and find its value of $\lambda$.`, fields: [{ label: 'λ', ans: t }], sol: T`$\mathbf b-\mathbf a=${V.tex(d)}$. $\mathbf c-\mathbf a=${V.tex(V.mul(d, t))}=${t}(\mathbf b-\mathbf a)$, so $C$ is on $L$ with $\lambda=${t}$.` }; },
        () => { const P = V.rnd(-4, 4); let d1, d2; do { d1 = V.rnd(-3, 3); d2 = V.rnd(-3, 3); } while (V.isZero(V.cross(d1, d2))); const s = rnz(-2, 2), t = rnz(-2, 2), a = V.sub(P, V.mul(d1, s)), b = V.sub(P, V.mul(d2, t));
          return { q: T`Find the point of intersection of $${vecStr(a, d1)}$ and $${vecStr(b, d2, '\\mu')}$.`, fields: [{ label: 'point', vec: P }], sol: T`Equate components and solve two of them: $\lambda=${s}$, $\mu=${t}$; the third equation checks. Point $${V.row(P)}$.` }; },
        () => { const kind = pick(['int', 'par', 'skew']); const a = V.rnd(-3, 3); let d1, d2, b; do { d1 = V.rnd(-3, 3); d2 = V.rnd(-3, 3); } while (V.isZero(V.cross(d1, d2)));
          if (kind === 'par') { d2 = V.mul(d1, pick([2, -1, 3])); b = V.add(a, V.rnd(-3, 3)); if (V.isZero(V.cross(V.sub(b, a), d1))) return null; }
          else if (kind === 'int') b = V.add(V.add(a, V.mul(d1, rnz(-2, 2))), V.mul(d2, rnz(-2, 2)));
          else { b = V.add(a, V.rnd(-3, 3)); if (V.dot(V.sub(b, a), V.cross(d1, d2)) === 0) return null; }
          const opts = ['They intersect', 'They are parallel', 'They are skew']; return { q: T`Are the lines $${vecStr(a, d1)}$ and $${vecStr(b, d2, '\\mu')}$ intersecting, parallel or skew?`, mc: { options: opts, correct: { int: 0, par: 1, skew: 2 }[kind] },
            sol: T`${kind === 'par' ? `The directions are multiples (${V.row(d2)} is a multiple of ${V.row(d1)}), and the lines are distinct: parallel.` : kind === 'int' ? 'Directions are not parallel; solving two component equations for $\\lambda,\\mu$ also satisfies the third: they intersect.' : 'Directions are not parallel, and the values of $\\lambda,\\mu$ from two component equations fail the third: skew.'}` }; },
        () => { const a = V.rnd(-5, 5); let d; do d = V.rnd(-4, 4); while (d.some(x => x === 0)); const term = (c, k) => `\\frac{${poly([[1, c], [-a[k], '']])}}{${d[k]}}`;
          return { q: T`The line $L$ has Cartesian equation $${term('x', 0)}=${term('y', 1)}=${term('z', 2)}$. Write down a direction vector of $L$.`, fields: [{ label: 'direction', vec: d, prop: true }], sol: T`The denominators give the direction: $${V.tex(d)}$; the point $${V.row(a)}$ lies on $L$. Vector form: $${vecStr(a, d)}$.` }; },
      ],
    },
  ],
});

/* ---------- extend the reused A2 1 points so they cover the AS 1 outcomes in full ---------- */
(() => {
  const find = id => POINTS.find(p => p.id === id);
  const cx4 = find('cx4'), mx1 = find('mx1'), mx4 = find('mx4');
  if (cx4) {
    cx4.notes = T`<table class="tbl"><tr><th>Equation</th><th>Locus</th></tr>
<tr><td>$|z-a|=r$</td><td>Circle, centre $a$, radius $r$</td></tr><tr><td>$|z-a|=|z-b|$</td><td>Perpendicular bisector of the points $a$ and $b$</td></tr><tr><td>$\arg(z-a)=\theta$</td><td>Half-line from $a$ (not including $a$) at angle $\theta$ to the positive real direction</td></tr></table>
<ul><li>$|z-a|$ is the <b>distance</b> from $z$ to $a$; $\arg(z-a)$ is the <b>direction</b> from $a$ to $z$.</li><li>To get a Cartesian equation, write $z=x+iy$ and square moduli.</li>
<li>Greatest and least $|z|$ on $|z-c|=r$: $|c|\pm r$, along the line through $O$ and the centre.</li><li>Regions: $|z-a|\le r$ is the inside of the circle; $\le$ gives a solid boundary, $\lt$ a dashed one.</li></ul>`;
    cx4.drills[2] = () => { const a = ri(-4, 4), b = ri(-4, 4), s = pick([1, -1]), up = pick([1, -1]); if (a === 0 || s * a > 0) return null; const th = Math.atan2(up, s), m = up / s, y0 = b - m * a; // direction (s, up), from (a, b) towards x = 0
      return { q: T`The half-line $\arg\left(z-(${cxs(a, b)})\right)=${pf(Math.round(th / (Math.PI / 4)), 4)}$ meets the imaginary axis at $iy$. Find $y$.`, fields: [{ label: 'y', ans: y0 }],
        sol: T`The half-line starts at $(${a},${b})$ with gradient $\tan\left(${pf(Math.round(th / (Math.PI / 4)), 4)}\right)=${m}$, heading ${s > 0 ? 'right' : 'left'} towards the imaginary axis. Equation $y-${par(b)}=${m}(x-${par(a)})$; at $x=0$, $y=${y0}$.` }; };
  }
  if (mx1) mx1.drills.push(
    () => { let A; do A = M.rnd(2, -5, 6); while (M.det2(A) === 0); const I = M.inv2(A); return { q: T`Find the inverse of $${m2s(A)}$ (entries row by row).`, fields: [{ label: 'entries', vec: flat(I) }], sol: T`$\det=${M.det2(A)}$. Swap the leading diagonal, negate the other two, divide by the determinant: $\frac1{${M.det2(A)}}${m2s([[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]])}$.` }; },
    () => { const A = unimod2(), B = unimod2(), Ai = M.inv2(A).map(r => r.map(Math.round)), Bi = M.inv2(B).map(r => r.map(Math.round)), R = M.mul(Bi, Ai);
      return { q: T`$\mathbf A^{-1}=${m2s(Ai)}$ and $\mathbf B^{-1}=${m2s(Bi)}$. Find $(\mathbf{AB})^{-1}$ (row by row).`, fields: [{ label: 'entries', vec: flat(R) }], sol: T`$(\mathbf{AB})^{-1}=\mathbf B^{-1}\mathbf A^{-1}=${m2s(Bi)}${m2s(Ai)}=${m2s(R)}$ — the order reverses ("socks and shoes").` }; });
  if (mx4) mx4.drills.push(
    () => { const s = ri(1, 5), a = pick([1, s, s * s].filter(x => x !== 0)), b = s * s / a, d1 = ri(-6, 6), d2 = ri(-6, 6); return { q: T`For which values of $k$ does the system $kx+${a === 1 ? '' : a}y=${d1}$, $${b === 1 ? '' : b}x+ky=${d2}$ fail to have a unique solution?`, fields: [{ label: 'k values', set: [s, -s] }], sol: T`No unique solution ⇔ $\det\begin{pmatrix}k&${a}\\${b}&k\end{pmatrix}=k^2-${a * b}=0\Rightarrow k=\pm${s}$.` }; },
    () => { const p = rnz(-4, 4), q = rnz(-4, 4), d = ri(-6, 6), k = pick([2, 3, -2]); return { q: T`The equations $${poly([[p, 'x'], [q, 'y']])}=${d}$ and $${poly([[k * p, 'x'], [k * q, 'y']])}=c$ have infinitely many solutions. Find $c$.`, fields: [{ label: 'c', ans: k * d }], sol: T`The second left-hand side is $${k}\times$ the first, so the equations are consistent only if $c=${k}\times${d}=${k * d}$. Then they are the same line: $x=\lambda$, $y=\frac{${d}-${par(p)}\lambda}{${q}}$ — a non-unique solution set. (Any other $c$: parallel lines, no solution.)` }; });
})();
