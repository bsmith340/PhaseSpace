// CCEA GCE Mathematics AS 1 Pure Mathematics: summary notes + drill generators.
'use strict';

const D2R = Math.PI / 180;
const C2 = (n, r) => { let c = 1; for (let k = 1; k <= r; k++) c = c * (n - r + k) / k; return Math.round(c); };
const wrap360 = x => ((x % 360) + 360) % 360;
// All solutions in [lo, hi] (degrees) of trig(a x + b) = k, trig in sin/cos/tan
function trigSolve(fnName, a, b, k, lo = 0, hi = 360) {
  const base = [];
  if (fnName === 'sin') { if (Math.abs(k) > 1) return []; const p = Math.asin(k) / D2R; base.push(p, 180 - p); }
  else if (fnName === 'cos') { if (Math.abs(k) > 1) return []; const p = Math.acos(k) / D2R; base.push(p, -p); }
  else { base.push(Math.atan(k) / D2R); }
  const per = fnName === 'tan' ? 180 : 360, out = [];
  for (const u0 of base) for (let n = -6; n <= 12; n++) { const u = u0 + per * n, x = (u - b) / a; if (x >= lo - 1e-9 && x <= hi + 1e-9 && !out.some(y => Math.abs(y - x) < 1e-7)) out.push(Math.abs(x - Math.round(x)) < 1e-9 ? Math.round(x) : x); }
  return out.sort((p, q) => p - q);
}
const degList = xs => xs.length ? xs.map(x => `${num(x)}^\\circ`).join(',\\ ') : '\\text{no solutions}';

topic({
  id: '_m1', title: 'AS1', points: [
    /* ---------------- ALGEBRA ---------------- */
    {
      id: 'm_ind', title: 'Indices & surds', sims: [],
      notes: T`$$a^ma^n=a^{m+n},\quad\frac{a^m}{a^n}=a^{m-n},\quad(a^m)^n=a^{mn},\quad a^0=1,\quad a^{-n}=\frac1{a^n},\quad a^{p/q}=\left(\sqrt[q]a\right)^p$$
<ul><li>Surds: $\sqrt{ab}=\sqrt a\sqrt b$, $\sqrt{48}=4\sqrt3$. Collect like surds after simplifying each.</li>
<li><b>Rationalise</b> $\frac{1}{\sqrt b-c}$ by multiplying top and bottom by the conjugate $\sqrt b+c$: the bottom becomes $b-c^2$.</li>
<li>Equations like $4^{x+1}=8^{x-1}$: write both sides as powers of the same base and equate exponents.</li></ul>`,
      drills: [
        () => { const b = ri(2, 5), q = pick([2, 3]), p = ri(1, 3) * pick([1, -1]), base = b ** q, v = Math.pow(b, p); return { q: T`Evaluate $${base}^{${fr(p, q)}}$ exactly.`, fields: [{ label: 'value', ans: v }], sol: T`$\sqrt[${q}]{${base}}=${b}$, then raise to the power $${p}$: $${b}^{${p}}=${p < 0 ? fr(1, b ** -p) : b ** p}$.` }; },
        () => { const b = pick([2, 3, 5, 6, 7]); let c; do c = rnz(-4, 4); while (b - c * c === 0); const k = rnz(-3, 3), a = k * (b - c * c); return { q: T`Express $\dfrac{${a}}{\sqrt{${b}}${sgn(-c)}}$ in the form $p+q\sqrt{${b}}$.`, fields: [{ label: 'p', ans: k * c }, { label: 'q', ans: k }], sol: T`Multiply by $\frac{\sqrt{${b}}${sgn(c)}}{\sqrt{${b}}${sgn(c)}}$: denominator $(\sqrt{${b}})^2-${par(c)}^2=${b - c * c}$.<br>$\dfrac{${a}(\sqrt{${b}}${sgn(c)})}{${b - c * c}}=${k}(\sqrt{${b}}${sgn(c)})=${k * c}${sgn(k)}\sqrt{${b}}$.` }; },
        () => { const s = pick([2, 3, 5]), m = [ri(1, 6), ri(1, 6), ri(1, 5)], sg = [1, pick([1, -1]), pick([1, -1])], k = m.reduce((t, x, i) => t + sg[i] * x, 0); const terms = m.map((x, i) => `${i ? (sg[i] > 0 ? '+' : '-') : ''}\\sqrt{${x * x * s}}`).join(''); return { q: T`Simplify $${terms}$ to the form $k\sqrt{${s}}$.`, fields: [{ label: 'k', ans: k }], sol: T`${m.map(x => `$\\sqrt{${x * x * s}}=${x === 1 ? '' : x}\\sqrt{${s}}$`).join(', ')}. Collect: $${k}\sqrt{${s}}$.` }; },
        () => { const b = pick([2, 3]), p = ri(1, 3), q = ri(1, 3) + (p === 3 ? 1 : 0), al = rnz(-3, 3), be = rnz(-3, 3); if (p === q) return { q: T`Solve $${b ** p}^{x}=${b ** (2 * p)}$.`, fields: [{ label: 'x', ans: 2 }], sol: T`$${b}^{${p}x}=${b}^{${2 * p}}$, so $x=2$.` }; const x = (q * be - p * al) / (p - q); return { q: T`Solve $${b ** p}^{x${sgn(al)}}=${b ** q}^{x${sgn(be)}}$.`, fields: [{ label: 'x', ans: x }], sol: T`Base ${b}: $${b}^{${p === 1 ? '' : p}(x${sgn(al)})}=${b}^{${q === 1 ? '' : q}(x${sgn(be)})}$. Equate powers: $${poly([[p, 'x'], [p * al, '']])}=${poly([[q, 'x'], [q * be, '']])}\Rightarrow x=${fr(q * be - p * al, p - q)}$.` }; },
      ],
    },
    {
      id: 'm_quad', title: 'Quadratics: completing the square & discriminant', sims: ['m_quadratic'],
      notes: T`<ul><li>Completing the square: $ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+c-\frac{b^2}{4a}$. Vertex $\left(-\frac b{2a},\ c-\frac{b^2}{4a}\right)$, line of symmetry $x=-\frac b{2a}$.</li>
<li>Formula: $x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$.</li>
<li>Discriminant $b^2-4ac$: $\gt0$ two real roots, $=0$ one repeated root, $\lt0$ no real roots.</li>
<li>"Hidden quadratics": $x^4-5x^2+4=0$ with $u=x^2$; $2^{2x}-3\cdot2^x+2=0$ with $u=2^x$.</li></ul>`,
      drills: [
        () => { const a = pick([1, 1, 2, 3, -1]), p = rnz(-5, 5), q = ri(-9, 9), b = 2 * a * p, c = a * p * p + q; return { q: T`Write $${poly([[a, 'x^2'], [b, 'x'], [c, '']])}$ in the form $${a === 1 ? '' : a === -1 ? '-' : a}(x+p)^2+q$ and state the coordinates of the ${a > 0 ? 'minimum' : 'maximum'} point.`, fields: [{ label: 'p', ans: p }, { label: 'q', ans: q }, { label: 'vertex x', ans: -p }, { label: 'vertex y', ans: q }], sol: T`${a !== 1 ? T`Factor out ${a} from the $x$ terms: $${a}(x^2${sgn(2 * p)}x)${sgn(c)}$. ` : ''}Half the $x$-coefficient is ${p}: $${a === 1 ? '' : a}(x${sgn(p)})^2${sgn(c)}${sgn(-a * p * p)}=${a === 1 ? '' : a === -1 ? '-' : a}(x${sgn(p)})^2${sgn(q)}$.<br>Vertex $(${-p},${q})$.` }; },
        () => { const b = rnz(-8, 8); return { q: T`Find the values of $k$ for which $kx^2${sgn(b)}x+k=0$ has equal roots.`, fields: [{ label: 'k values', set: [b / 2, -b / 2] }], sol: T`Equal roots: $b^2-4ac=0$: $${b * b}-4k^2=0\Rightarrow k^2=${fr(b * b, 4)}\Rightarrow k=\pm ${nice(Math.abs(b) / 2)}$.` }; },
        () => { const a = pick([1, 2, 3]), b = ri(-7, 7), c = ri(-6, 6), D = b * b - 4 * a * c; if (D < 0) return { q: T`How many real roots does $${poly([[a, 'x^2'], [b, 'x'], [c, '']])}=0$ have?`, fields: [{ label: 'number', ans: 0 }], sol: T`$b^2-4ac=${b * b}-${4 * a * c}=${D}\lt0$: no real roots.` }; const r = [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]; return { q: T`Solve $${poly([[a, 'x^2'], [b, 'x'], [c, '']])}=0$ exactly.`, fields: [{ label: 'x values', set: D === 0 ? [r[0]] : r }], sol: T`$x=\dfrac{${-b}\pm\sqrt{${D}}}{${2 * a}}$${D === 0 ? ' (repeated root)' : ''}: $${D === 0 ? nice(r[0]) : `\\frac{${-b}\\pm ${surd(D)}}{${2 * a}}`}$ ≈ ${r.map(x => num(x)).join(', ')}.` }; },
        () => { const q = pick([1, 4, 9, 16, 25]); return { q: T`Find the set of values of $k$ for which $x^2+kx+${q}=0$ has no real roots, in the form $a\lt k\lt b$.`, fields: [{ label: 'a', ans: -2 * Math.sqrt(q) }, { label: 'b', ans: 2 * Math.sqrt(q) }], sol: T`No real roots: $k^2-4(${q})\lt0\Rightarrow k^2\lt ${4 * q}\Rightarrow-${2 * Math.sqrt(q)}\lt k\lt ${2 * Math.sqrt(q)}$.` }; },
      ],
    },
    {
      id: 'm_sim', title: 'Simultaneous equations', sims: ['m_quadratic'],
      notes: T`<ul><li>Linear pairs: elimination or substitution.</li><li>One linear, one quadratic: make $y$ (or $x$) the subject of the <b>linear</b> one, substitute into the quadratic, solve, then find the other coordinate for <i>each</i> root.</li>
<li>The number of intersections of a line and a curve = number of real roots of the substituted quadratic — use the discriminant (tangent ⇔ $b^2-4ac=0$).</li>
<li><b>Three variables</b>: use two different pairs of equations to eliminate the <i>same</i> variable, leaving two equations in two unknowns; solve those, then substitute back. Check in all three.</li></ul>`,
      drills: [
        () => { let a, b, c, d; do { a = rnz(-5, 5); b = rnz(-5, 5); c = rnz(-5, 5); d = rnz(-5, 5); } while (a * d - b * c === 0); const x = ri(-5, 5), y = ri(-5, 5); return { q: T`Solve $${poly([[a, 'x'], [b, 'y']])}=${a * x + b * y}$ and $${poly([[c, 'x'], [d, 'y']])}=${c * x + d * y}$.`, fields: [{ label: 'x', ans: x }, { label: 'y', ans: y }], sol: T`Eliminate one variable (multiply to match coefficients and subtract): $x=${x}$, $y=${y}$. Check both equations.` }; },
        () => { let r1 = ri(-4, 4), r2; do r2 = ri(-4, 4); while (r2 === r1); const m = rnz(-3, 3), c = ri(-5, 5), b = m - (r1 + r2), d = c + r1 * r2; return { q: T`Find the points of intersection of $y=${poly([[m, 'x'], [c, '']])}$ and $y=${poly([[1, 'x^2'], [b, 'x'], [d, '']])}$.`, fields: [{ label: 'x values', set: [r1, r2] }, { label: 'y values', set: [m * r1 + c, m * r2 + c] }], sol: T`$${poly([[1, 'x^2'], [b, 'x'], [d, '']])}=${poly([[m, 'x'], [c, '']])}\Rightarrow ${poly([[1, 'x^2'], [b - m, 'x'], [d - c, '']])}=0\Rightarrow ${lin(r1)}${lin(r2)}=0$.<br>$x=${r1}$: $y=${m * r1 + c}$; $\ x=${r2}$: $y=${m * r2 + c}$.` }; },
        () => { const m = rnz(-4, 4), b = ri(-4, 4), c = ri(-3, 6), k = c - (b - m) ** 2 / 4; return { q: T`Find $k$ such that the line $y=${poly([[m, 'x']])}+k$ is a tangent to $y=${poly([[1, 'x^2'], [b, 'x'], [c, '']])}$.`, fields: [{ label: 'k', ans: k }], sol: T`$${poly([[1, 'x^2'], [b - m, 'x']])}+(${c}-k)=0$ must have a repeated root: $(${b - m})^2-4(${c}-k)=0\Rightarrow k=${c}-\frac{${(b - m) ** 2}}{4}=${nice(k)}$.` }; },
        () => { let A, D; do { A = [[ri(1, 3), rnz(-3, 3), rnz(-3, 3)], [rnz(-3, 3), ri(1, 3), rnz(-3, 3)], [rnz(-3, 3), rnz(-3, 3), ri(1, 3)]]; D = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]); } while (D === 0);
          const x = ri(-4, 4), y = ri(-4, 4), z = ri(-4, 4), rows = A.map(r => `${poly([[r[0], 'x'], [r[1], 'y'], [r[2], 'z']])}&=${r[0] * x + r[1] * y + r[2] * z}`);
          return { q: T`Solve the simultaneous equations $$\begin{aligned}${rows.join('\\\\')}\end{aligned}$$`, fields: [{ label: 'x', ans: x }, { label: 'y', ans: y }, { label: 'z', ans: z }], sol: T`Eliminate one variable (say $x$) from equations (1)&(2) and from (1)&(3) — scale so the $x$-coefficients match, then subtract. That leaves two equations in $y$ and $z$; solve them, then substitute back into (1).<br>Solution: $x=${x}$, $y=${y}$, $z=${z}$. Check: ${A.map(r => `$${r[0] * x + r[1] * y + r[2] * z}$`).join(', ')} ✓` }; },
      ],
    },
    {
      id: 'm_ineq', title: 'Inequalities: linear & quadratic', sims: ['m_quadratic'],
      notes: T`<ul><li>Linear: solve like an equation, but <b>reverse the sign</b> when multiplying or dividing by a negative.</li>
<li>Quadratic: find the critical values (roots), <b>sketch</b> the parabola, read off where it's above/below the axis. $(x-a)(x-b)\lt0\Rightarrow a\lt x\lt b$; $\ \gt0\Rightarrow x\lt a$ or $x\gt b$ (for $a\lt b$).</li>
<li>Never divide both sides by an expression containing $x$ (its sign is unknown).</li>
<li><b>Fractions</b>: multiply every term by the (positive) common denominator first. <b>Brackets</b>: expand and collect everything on one side before finding critical values.</li>
<li>Answers can be given in set notation: $\{x:x\lt a\}\cup\{x:x\gt b\}$, $\{x:a\le x\le b\}$.</li></ul>`,
      drills: [
        () => { let r1 = ri(-6, 5), r2; do r2 = ri(-6, 6); while (r2 <= r1); const sign = pick(['<', '>', '\\le', '\\ge']), inside = sign === '<' || sign === '\\le', lead = pick([1, -1]), inEff = lead > 0 ? inside : !inside; const strict = sign === '<' || sign === '>' ? '\\lt ' : '\\le ';
          const op = { '<': '\\lt', '>': '\\gt', '\\le': '\\le', '\\ge': '\\ge' }[sign];
          return { q: T`Solve $${poly([[lead, 'x^2'], [-lead * (r1 + r2), 'x'], [lead * r1 * r2, '']])}${op}0$. Enter the two critical values $a\lt b$ and choose the form below.`, fields: [{ label: 'a', ans: r1 }, { label: 'b', ans: r2 }, { label: 'form: 1 = a<x<b, 2 = x<a or x>b', ans: inEff ? 1 : 2 }], sol: T`${lead < 0 ? 'Multiply by −1 (reversing the sign) or sketch the ∩-shaped graph. ' : ''}Critical values $x=${r1},${r2}$. The expression is ${inside ? 'negative' : 'positive'}${sign.includes('le') || sign.includes('ge') ? ' or zero' : ''} ${inEff ? 'between' : 'outside'} the roots: $${inEff ? `${r1}${strict}x${strict}${r2}` : `x${strict}${r1}\\text{ or }x${sign === '<' || sign === '>' ? '\\gt ' : '\\ge '}${r2}`}$.` }; },
        () => { const a = rnz(-5, 5); let c; do c = rnz(-5, 5); while (c === a); const b = ri(-9, 9), d = ri(-9, 9), k = (d - b) / (a - c), dir = a - c > 0; const opts = shuffle([`x\\gt ${nice(k)}`, `x\\lt ${nice(k)}`, `x\\gt ${nice(-k)}`, `x\\lt ${nice(-k)}`].filter((v, i, s) => s.indexOf(v) === i)); const right = dir ? `x\\gt ${nice(k)}` : `x\\lt ${nice(k)}`;
          return { q: T`Solve $${poly([[a, 'x'], [b, '']])}\gt ${poly([[c, 'x'], [d, '']])}$.`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(right) }, sol: T`$${a - c}x\gt ${d - b}$. ${a - c < 0 ? `Divide by $${a - c}$ (negative), so <b>reverse</b> the sign: ` : 'Divide: '}$${right}$.` }; },
        () => { const q = pick([4, 9, 16, 25, 36]), s = 2 * Math.sqrt(q); return { q: T`Find the set of values of $k$ for which $x^2+kx+${q}=0$ has real roots, in the form $k\le a$ or $k\ge b$.`, fields: [{ label: 'a', ans: -s }, { label: 'b', ans: s }], sol: T`Real roots: $k^2-${4 * q}\ge0\Rightarrow(k-${s})(k+${s})\ge0\Rightarrow k\le-${s}$ or $k\ge ${s}$.` }; },
        () => { let p, q, a, b, c, k; do { p = pick([2, 3, 4, 5, 6]); q = pick([2, 3, 4, 5, 6]); a = rnz(-5, 5); b = rnz(-5, 5); c = ri(-3, 3); k = (c * p * q - q * a + p * b) / (q - p); } while (p === q || Math.abs(k) < 1e-9);
          const flip = q - p < 0, rhs = c * p * q - q * a + p * b, right = flip ? `x\\lt ${nice(k)}` : `x\\gt ${nice(k)}`, opts = shuffle([`x\\gt ${nice(k)}`, `x\\lt ${nice(k)}`, `x\\gt ${nice(-k)}`, `x\\lt ${nice(-k)}`]);
          return { q: T`Solve $\dfrac{x${sgn(a)}}{${p}}-\dfrac{x${sgn(b)}}{${q}}\gt ${c}$.`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(right) }, sol: T`Multiply every term by $${p * q}$ (positive, so the sign stays): $${q}(x${sgn(a)})-${p}(x${sgn(b)})\gt ${c * p * q}$.<br>Expand and collect: $${poly([[q - p, 'x']])}\gt ${rhs}$. ${q - p === 1 ? '' : flip ? T`Divide by $${q - p}$ — negative, so <b>reverse</b> the sign: $${right}$.` : T`Divide by $${q - p}$: $${right}$.`}` }; },
        () => { let r1 = ri(-5, 4), r2; do r2 = ri(-4, 5); while (r2 <= r1); const m = rnz(-4, 4), B = -(r1 + r2), C = r1 * r2, rhs = m * (B - m) - C, sign = pick(['\\lt', '\\ge']), inside = sign === '\\lt';
          const lhs = `(x${sgn(m)})${B - m ? `(x${sgn(B - m)})` : 'x'}`;
          return { q: T`Solve $${lhs}${sign}${rhs}$. Enter the critical values $a\lt b$ and the form.`, fields: [{ label: 'a', ans: r1 }, { label: 'b', ans: r2 }, { label: 'form: 1 = between the roots, 2 = outside the roots', ans: inside ? 1 : 2 }], sol: T`Expand: $${poly([[1, 'x^2'], [B, 'x'], [m * (B - m), '']])}${sign}${rhs}$, so $${poly([[1, 'x^2'], [B, 'x'], [C, '']])}${sign}0$, i.e. $${lin(r1)}${lin(r2)}${sign}0$.<br>Critical values $${r1}$ and $${r2}$; the graph is ∪-shaped, so ${inside ? `$${r1}\\lt x\\lt ${r2}$` : `$x\\le ${r1}$ or $x\\ge ${r2}$`}.` }; },
      ],
    },
    {
      id: 'm_poly', title: 'Polynomials: division, factor & remainder theorems', sims: [],
      notes: T`<ul><li><b>Remainder theorem</b>: the remainder when $f(x)$ is divided by $(x-a)$ is $f(a)$; by $(ax-b)$ it's $f\left(\frac ba\right)$.</li>
<li><b>Factor theorem</b>: $(x-a)$ is a factor $\iff f(a)=0$.</li>
<li>To factorise a cubic: find a root by trial (try factors of the constant term), divide (or compare coefficients) to get a quadratic, factorise that.</li></ul>`,
      drills: [
        () => { const c = [1, ri(-5, 5), ri(-8, 8), ri(-9, 9)], a = rnz(-3, 3), f = x => c.reduce((s, k) => s * x + k, 0), lin = Math.random() < 0.3; const den = lin ? '2x-1' : `x${sgn(-a)}`, at = lin ? 0.5 : a;
          return { q: T`Find the remainder when $f(x)=${poly([[c[0], 'x^3'], [c[1], 'x^2'], [c[2], 'x'], [c[3], '']])}$ is divided by $(${den})$.`, fields: [{ label: 'remainder', ans: f(at) }], sol: T`Remainder theorem: $f\left(${nice(at)}\right)=${nice(f(at))}$.` }; },
        () => { const a = rnz(-3, 3), p = ri(-5, 5), q = ri(-9, 9); const k = -(a ** 3 + p * a * a + q) / a; return { q: T`$(x${sgn(-a)})$ is a factor of $x^3${sgn(p)}x^2+kx${sgn(q)}$. Find $k$.`, fields: [{ label: 'k', ans: k }], sol: T`Factor theorem: $f(${a})=0$: $${a ** 3}${sgn(p * a * a)}${sgn(a)}k${sgn(q)}=0\Rightarrow k=${fr(-(a ** 3 + p * a * a + q), a)}$.` }; },
        () => { const r = shuffle([-3, -2, -1, 1, 2, 3, 4]).slice(0, 3), c2 = -(r[0] + r[1] + r[2]), c1 = r[0] * r[1] + r[0] * r[2] + r[1] * r[2], c0 = -r[0] * r[1] * r[2]; return { q: T`Solve $${poly([[1, 'x^3'], [c2, 'x^2'], [c1, 'x'], [c0, '']])}=0$.`, fields: [{ label: 'x values', set: r }], sol: T`Try factors of ${c0}: $f(${r[0]})=0$ so $(x${sgn(-r[0])})$ is a factor. Divide to get $${poly([[1, 'x^2'], [-(r[1] + r[2]), 'x'], [r[1] * r[2], '']])}=${lin(r[1])}${lin(r[2])}$.<br>$x=${r.join(',\\ ')}$.` }; },
        () => { const a = rnz(-3, 3), c = [ri(1, 3), ri(-5, 5), ri(-6, 6), ri(-9, 9)]; const q2 = c[0], q1 = c[1] + a * q2, q0 = c[2] + a * q1, R = c[3] + a * q0; return { q: T`Divide $${poly([[c[0], 'x^3'], [c[1], 'x^2'], [c[2], 'x'], [c[3], '']])}$ by $(x${sgn(-a)})$: the quotient is $px^2+qx+r$. Find $p,q,r$ and the remainder.`, fields: [{ label: 'p', ans: q2 }, { label: 'q', ans: q1 }, { label: 'r', ans: q0 }, { label: 'remainder', ans: R }], sol: T`Long (or synthetic) division by $x${sgn(-a)}$: quotient $${poly([[q2, 'x^2'], [q1, 'x'], [q0, '']])}$, remainder $${R}$ (check: $f(${a})=${R}$).` }; },
      ],
    },
    {
      id: 'm_graph', title: 'Graphs & transformations', sims: ['m_transform'],
      notes: T`<table class="tbl"><tr><th>Equation</th><th>Transformation of $y=f(x)$</th></tr>
<tr><td>$y=f(x)+a$</td><td>translation $\binom0a$</td></tr><tr><td>$y=f(x+a)$</td><td>translation $\binom{-a}0$</td></tr>
<tr><td>$y=af(x)$</td><td>stretch parallel to the $y$-axis, scale factor $a$</td></tr><tr><td>$y=f(ax)$</td><td>stretch parallel to the $x$-axis, scale factor $\frac1a$</td></tr>
<tr><td>$y=-f(x)$</td><td>reflection in the $x$-axis</td></tr><tr><td>$y=f(-x)$</td><td>reflection in the $y$-axis</td></tr></table>
<p>Changes <b>inside</b> the bracket act on $x$ and do the "opposite" of what they look like.</p>`,
      drills: [
        () => { const p = ri(-4, 4), qv = ri(-4, 4), t = ri(0, 3); if (t === 0) { const b = rnz(-4, 4), c = ri(-3, 3); return { q: T`The point $(${p},${qv})$ lies on $y=f(x)$. Find its image on $y=f(x${sgn(b)})${c ? sgn(c) : ''}$.`, fields: [{ label: 'x', ans: p - b }, { label: 'y', ans: qv + c }], sol: T`$f(x${sgn(b)})$ shifts by ${-b} in $x$; ${c ? `$${sgn(c)}$ shifts ${c} in $y$` : 'no vertical shift'}: $(${p - b},${qv + c})$.` }; }
          if (t === 1) { const a = pick([2, 3, -1, -2, 0.5]); return { q: T`$(${p},${qv})$ lies on $y=f(x)$. Find its image on $y=${a === -1 ? '-' : nice(a)}f(x)$.`, fields: [{ label: 'x', ans: p }, { label: 'y', ans: a * qv }], sol: T`Vertical stretch ×${nice(a)}: $(${p},${nice(a * qv)})$.` }; }
          if (t === 2) { const a = pick([2, 3, 0.5, -1]); return { q: T`$(${p},${qv})$ lies on $y=f(x)$. Find its image on $y=f(${nice(a)}x)$.`.replace('f(-1x)', 'f(-x)'), fields: [{ label: 'x', ans: p / a }, { label: 'y', ans: qv }], sol: T`Horizontal stretch, scale factor $\frac1{${nice(a)}}$: $(${nice(p / a)},${qv})$.` }; }
          return { q: T`$(${p},${qv})$ lies on $y=f(x)$. Find its image on $y=-f(x)+2$.`, fields: [{ label: 'x', ans: p }, { label: 'y', ans: -qv + 2 }], sol: T`Reflect in the $x$-axis then translate up 2: $(${p},${-qv + 2})$.` }; },
        () => { const L = [[T`y=f(x-3)`, 'Translation 3 units in the positive x-direction'], [T`y=f(x)+3`, 'Translation 3 units in the positive y-direction'], [T`y=3f(x)`, 'Stretch parallel to the y-axis, scale factor 3'], [T`y=f(3x)`, 'Stretch parallel to the x-axis, scale factor 1/3'], [T`y=-f(x)`, 'Reflection in the x-axis'], [T`y=f(-x)`, 'Reflection in the y-axis'], [T`y=f(x+3)`, 'Translation 3 units in the negative x-direction']];
          const [e, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(l => l[1] !== r)).slice(0, 3).map(l => l[1])]);
          return { q: T`Describe the transformation that maps $y=f(x)$ onto $${e}$.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`$${e}$: ${r.toLowerCase()}.` }; },
        () => { const a = rnz(-6, 6), b = rnz(-4, 4), c = ri(-4, 4); return { q: T`State the equations of the asymptotes of $y=\dfrac{${a}}{x${sgn(b)}}${c ? sgn(c) : ''}$.`, fields: [{ label: 'vertical: x =', ans: -b }, { label: 'horizontal: y =', ans: c }], sol: T`It's $y=\frac{${a}}{x}$ translated by $\binom{${-b}}{${c}}$: asymptotes $x=${-b}$ and $y=${c}$.` }; },
      ],
    },
    /* ---------------- COORDINATE GEOMETRY ---------------- */
    {
      id: 'm_line', title: 'Straight lines', sims: [],
      notes: T`<ul><li>Gradient $m=\frac{y_2-y_1}{x_2-x_1}$; line $y-y_1=m(x-x_1)$; also $ax+by+c=0$.</li>
<li>Parallel lines: equal gradients. Perpendicular: $m_1m_2=-1$.</li>
<li>Midpoint $\left(\frac{x_1+x_2}2,\frac{y_1+y_2}2\right)$; distance $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.</li>
<li><b>Straight-line models</b>: in $C=a+bn$ the intercept $a$ is the fixed amount and the gradient $b$ the rate per unit; interpret both in context and comment on the range of validity.</li></ul>`,
      drills: [
        () => { let x1 = ri(-5, 5), x2; do x2 = ri(-5, 5); while (x2 === x1); const y1 = ri(-5, 5), y2 = ri(-5, 5), m = (y2 - y1) / (x2 - x1), c = y1 - m * x1; return { q: T`Find the equation of the line through $(${x1},${y1})$ and $(${x2},${y2})$ in the form $y=mx+c$.`, fields: [{ label: 'm', ans: m }, { label: 'c', ans: c }], sol: T`$m=\frac{${y2}-${par(y1)}}{${x2}-${par(x1)}}=${fr(y2 - y1, x2 - x1)}$. $y-${par(y1)}=${fr(y2 - y1, x2 - x1)}(x-${par(x1)})\Rightarrow c=${nice(c)}$.` }; },
        () => { const m = pick([2, -3, 0.5, -0.5, 4, 1 / 3, -1]), px = ri(-5, 5), py = ri(-5, 5), mp = -1 / m, c = py - mp * px; return { q: T`Find the line perpendicular to $y=${m === -1 ? '-' : m === 1 ? '' : nice(m)}x+${ri(1, 6)}$ through $(${px},${py})$, as $y=mx+c$.`, fields: [{ label: 'm', ans: mp }, { label: 'c', ans: c }], sol: T`Perpendicular gradient $-\frac1{${nice(m)}}=${nice(mp)}$. Through $(${px},${py})$: $c=${py}-(${nice(mp)})(${px})=${nice(c)}$.` }; },
        () => { const a = [ri(-6, 6), ri(-6, 6)], d = pick([[3, 4], [5, 12], [6, 8], [8, 6], [4, 3], [-3, 4], [12, -5]]), b = [a[0] + d[0], a[1] + d[1]]; return { q: T`$A(${a[0]},${a[1]})$, $B(${b[0]},${b[1]})$. Find the midpoint of $AB$ and the length $AB$.`, fields: [{ label: 'mid x', ans: (a[0] + b[0]) / 2 }, { label: 'mid y', ans: (a[1] + b[1]) / 2 }, { label: 'AB', ans: Math.hypot(...d) }], sol: T`Midpoint $\left(${nice((a[0] + b[0]) / 2)},${nice((a[1] + b[1]) / 2)}\right)$; $AB=\sqrt{${d[0] ** 2}+${d[1] ** 2}}=${Math.hypot(...d)}$.` }; },
        () => { let m1 = rnz(-3, 3), m2; do m2 = rnz(-3, 3); while (m2 === m1); const x = ri(-4, 4), y = ri(-4, 4), c1 = y - m1 * x, c2 = y - m2 * x; return { q: T`Find where $y=${poly([[m1, 'x'], [c1, '']])}$ meets $y=${poly([[m2, 'x'], [c2, '']])}$.`, fields: [{ label: 'x', ans: x }, { label: 'y', ans: y }], sol: T`$${poly([[m1, 'x'], [c1, '']])}=${poly([[m2, 'x'], [c2, '']])}\Rightarrow x=${x}$, $y=${y}$.` }; },
        () => { const [thing, unit, rate] = pick([['a taxi fare', 'km', 'per km'], ['a phone contract', 'GB', 'per GB'], ['the cost of hiring a hall', 'hours', 'per hour'], ['a plumber\'s bill', 'hours', 'per hour']]); const a = ri(3, 30), b = ri(2, 12) / 2, n1 = ri(2, 6), n2 = n1 + ri(3, 8), c1 = a + b * n1, c2 = a + b * n2, n3 = n2 + ri(2, 6);
          return { q: T`The cost $£C$ of ${thing} is modelled as a linear function of the number of ${unit}, $n$. When $n=${n1}$, $C=${nice(c1)}$; when $n=${n2}$, $C=${nice(c2)}$. Find the gradient, the intercept, and the predicted cost when $n=${n3}$.`, fields: [{ label: 'gradient', ans: b }, { label: 'intercept', ans: a }, { label: `C when n = ${n3}`, ans: a + b * n3 }], sol: T`Gradient $=\dfrac{${nice(c2)}-${nice(c1)}}{${n2}-${n1}}=${nice(b)}$ (£${nice(b)} ${rate}). Intercept: $${nice(c1)}-${nice(b)}\times${n1}=${a}$ (the fixed charge). $C=${a}+${nice(b)}n$, so at $n=${n3}$: $£${nice(a + b * n3)}$.` }; },
      ],
    },
    {
      id: 'm_circ', title: 'Circles', sims: ['m_circle'],
      notes: T`<ul><li>Centre $(a,b)$, radius $r$: $(x-a)^2+(y-b)^2=r^2$.</li><li>$x^2+y^2+2gx+2fy+c=0$ has centre $(-g,-f)$, radius $\sqrt{g^2+f^2-c}$ (complete the square).</li>
<li>The tangent at $P$ is perpendicular to the radius $CP$. The perpendicular from the centre to a chord bisects it. The angle in a semicircle is $90^\circ$.</li>
<li>Line meets circle: substitute, then the discriminant gives 2 / 1 (tangent) / 0 intersections.</li></ul>`,
      drills: [
        () => { const g = rnz(-5, 5), f = rnz(-5, 5), r = ri(1, 7), c = g * g + f * f - r * r; return { q: T`Find the centre and radius of $x^2+y^2${sgn(2 * g)}x${sgn(2 * f)}y${c ? sgn(c) : ''}=0$.`, fields: [{ label: 'centre x', ans: -g }, { label: 'centre y', ans: -f }, { label: 'radius', ans: r }], sol: T`Complete the square: $(x${sgn(g)})^2+(y${sgn(f)})^2=${g * g}+${f * f}${sgn(-c)}=${r * r}$. Centre $(${-g},${-f})$, radius ${r}.` }; },
        () => { const a = ri(-5, 5), b = ri(-5, 5), d = pick([[3, 4], [0, 5], [5, 12], [1, 2], [2, 2], [-3, 1]]), P = [a + d[0], b + d[1]], r2 = d[0] ** 2 + d[1] ** 2; return { q: T`A circle has centre $(${a},${b})$ and passes through $(${P[0]},${P[1]})$. Its equation is $(x-a)^2+(y-b)^2=k$. Find $k$.`, fields: [{ label: 'k', ans: r2 }], sol: T`$r^2=(${P[0]}-${par(a)})^2+(${P[1]}-${par(b)})^2=${d[0] ** 2}+${d[1] ** 2}=${r2}$.` }; },
        () => { const a = ri(-4, 4), b = ri(-4, 4), d = pick([[3, 4], [4, 3], [1, 2], [2, 1], [-3, 4], [3, -1], [-2, -1]]), P = [a + d[0], b + d[1]], mt = -d[0] / d[1], c = P[1] - mt * P[0]; return { q: T`$P(${P[0]},${P[1]})$ lies on the circle with centre $(${a},${b})$. Find the tangent at $P$ as $y=mx+c$.`, fields: [{ label: 'm', ans: mt }, { label: 'c', ans: c }], sol: T`Gradient of radius $CP=${fr(d[1], d[0])}$. Tangent ⟂ radius: $m=${nice(mt)}$. Through $P$: $c=${nice(c)}$.` }; },
        () => { const r = ri(1, 6); return { q: T`Find the values of $k$ for which $y=x+k$ is a tangent to $x^2+y^2=${r * r}$.`, fields: [{ label: 'k values', set: [r * Math.SQRT2, -r * Math.SQRT2] }], sol: T`Substitute: $x^2+(x+k)^2=${r * r}\Rightarrow2x^2+2kx+k^2-${r * r}=0$. Tangent: $4k^2-8(k^2-${r * r})=0\Rightarrow k^2=${2 * r * r}\Rightarrow k=\pm ${surd(2 * r * r)}$.` }; },
      ],
    },
    /* ---------------- SEQUENCES & SERIES ---------------- */
    {
      id: 'm_bin', title: 'Binomial expansion (positive integer powers)', sims: ['m_binomial'],
      notes: T`$$(a+b)^n=\sum_{r=0}^{n}\binom nr a^{n-r}b^r,\qquad\binom nr={}^nC_r=\frac{n!}{r!\,(n-r)!}$$
<ul><li>The coefficients are the rows of Pascal's triangle.</li><li>General term $\binom nr a^{n-r}b^r$ — set the power of $x$ you want and solve for $r$.</li>
<li>Bracket negative or coefficient terms: $(2-3x)^5$ has $b=-3x$, so $b^2=9x^2$.</li></ul>`,
      drills: [
        () => { const n = ri(4, 9), k = ri(1, Math.min(4, n)), a = pick([1, 2, 3, -1]), b = pick([1, 2, -2, 3, -3, 0.5]); const v = C2(n, k) * a ** (n - k) * b ** k; return { q: T`Find the coefficient of $x^{${k}}$ in the expansion of $(${a}${b < 0 ? '-' : '+'}${nice(Math.abs(b))}x)^{${n}}$.`.replace('(1+1x)', '(1+x)').replace('(1-1x)', '(1-x)'), fields: [{ label: 'coefficient', ans: v }], sol: T`Term: $\binom{${n}}{${k}}(${a})^{${n - k}}(${nice(b)}x)^{${k}}$, coefficient $${C2(n, k)}\times ${a ** (n - k)}\times ${nice(b ** k)}=${nice(v)}$.` }; },
        () => { const n = ri(4, 10), b = pick([2, -2, 3, -3, 0.5, -1]); return { q: T`Find the first three terms of $(1${b < 0 ? '-' : '+'}${nice(Math.abs(b)) === '1' ? '' : nice(Math.abs(b))}x)^{${n}}$ in ascending powers of $x$: $1+px+qx^2+\dots$`, fields: [{ label: 'p', ans: n * b }, { label: 'q', ans: C2(n, 2) * b * b }], sol: T`$1+\binom{${n}}1(${nice(b)}x)+\binom{${n}}{2}(${nice(b)}x)^2=1${sgn(n * b)}x+${nice(C2(n, 2) * b * b)}x^2$.` }; },
        () => { const n = ri(5, 12); return { q: T`The coefficient of $x^2$ in $(1+x)^n$ is $${C2(n, 2)}$. Find $n$.`, fields: [{ label: 'n', ans: n }], sol: T`$\binom n2=\frac{n(n-1)}2=${C2(n, 2)}\Rightarrow n(n-1)=${2 * C2(n, 2)}\Rightarrow n=${n}$ (reject the negative root).` }; },
        () => { const n = pick([4, 6, 8]), a = pick([1, 2, 3]); const k = n / 2, v = C2(n, k) * a ** k; return { q: T`Find the term independent of $x$ in $\left(x+\dfrac{${a}}{x}\right)^{${n}}$.`, fields: [{ label: 'term', ans: v }], sol: T`General term $\binom{${n}}r x^{${n}-r}\left(\frac{${a}}x\right)^r=\binom{${n}}{r}${a === 1 ? '' : `${a}^r`}x^{${n}-2r}$. Independent of $x$: $r=${k}$, term $=${C2(n, k)}\times ${a ** k}=${v}$.` }; },
      ],
    },
    /* ---------------- TRIGONOMETRY ---------------- */
    {
      id: 'm_tri', title: 'Sine rule, cosine rule & area of a triangle', sims: ['m_triangle'],
      notes: T`$$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C},\qquad a^2=b^2+c^2-2bc\cos A,\qquad\text{Area}=\tfrac12ab\sin C$$
<ul><li>Use the cosine rule for SAS (find the third side) or SSS (find an angle); the sine rule for a matching side–angle pair.</li>
<li><b>Ambiguous case</b>: finding an angle with the sine rule can give two answers, $B$ and $180^\circ-B$ — check both fit.</li></ul>`,
      drills: [
        () => { const b = ri(3, 12), c = ri(3, 12), A = ri(25, 140), a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(A * D2R)); return { q: T`In triangle $ABC$, $b=${b}$ cm, $c=${c}$ cm and $A=${A}^\circ$. Find $a$ (3 s.f.).`, fields: [{ label: 'a', ans: a }], sol: T`Cosine rule: $a^2=${b * b}+${c * c}-2(${b})(${c})\cos ${A}^\circ=${num(a * a)}$, $a=${num(a)}$ cm.` }; },
        () => { const a = ri(4, 12), b = ri(4, 12), c = ri(Math.abs(a - b) + 1, a + b - 1), C = Math.acos((a * a + b * b - c * c) / (2 * a * b)) / D2R; return { q: T`A triangle has sides $a=${a}$, $b=${b}$, $c=${c}$. Find angle $C$ in degrees (1 d.p.).`, fields: [{ label: 'C (°)', ans: C, tol: { abs: 0.06 } }], sol: T`$\cos C=\dfrac{a^2+b^2-c^2}{2ab}=\dfrac{${a * a + b * b - c * c}}{${2 * a * b}}\Rightarrow C=${C.toFixed(1)}^\circ$.` }; },
        () => { const a = ri(3, 12), b = ri(3, 12), C = ri(20, 150), A = 0.5 * a * b * Math.sin(C * D2R); return { q: T`Find the area of a triangle with sides $${a}$ cm and $${b}$ cm and included angle $${C}^\circ$ (3 s.f.).`, fields: [{ label: 'area', ans: A }], sol: T`$\tfrac12(${a})(${b})\sin ${C}^\circ=${num(A)}\text{ cm}^2$.` }; },
        () => { const A = ri(25, 55), a = ri(5, 9), b = a + ri(1, 4), s = b * Math.sin(A * D2R) / a; if (s >= 1) return { q: T`In triangle $ABC$, $A=${A}^\circ$, $a=${a}$, $b=${b}$. How many triangles are possible?`, fields: [{ label: 'number', ans: s === 1 ? 1 : 0 }], sol: T`$\sin B=\frac{${b}\sin ${A}^\circ}{${a}}=${num(s)}\gt1$: no triangle exists.` }; const B1 = Math.asin(s) / D2R, B2 = 180 - B1, both = A + B2 < 180; return { q: T`In triangle $ABC$, $A=${A}^\circ$, $a=${a}$ cm, $b=${b}$ cm. Find all possible values of $B$ (1 d.p.).`, fields: [{ label: 'B values', set: both ? [B1, B2] : [B1], tol: { abs: 0.06 } }], sol: T`$\sin B=\frac{${b}\sin ${A}^\circ}{${a}}=${num(s)}$. $B=${B1.toFixed(1)}^\circ$ or $180^\circ-${B1.toFixed(1)}^\circ=${B2.toFixed(1)}^\circ$. ${both ? `Both work since $${A}+${B2.toFixed(1)}\\lt180$ — the <b>ambiguous case</b>.` : 'Only the acute one fits.'}` }; },
      ],
    },
    {
      id: 'm_rad', title: 'Radians, arc length & sector area', sims: [],
      notes: T`<ul><li>$\pi$ radians $=180^\circ$.</li><li>Arc length $s=r\theta$, sector area $A=\frac12r^2\theta$ ($\theta$ in <b>radians</b>).</li><li>Segment area $=\frac12r^2(\theta-\sin\theta)$.</li></ul>`,
      drills: [
        () => { const d = pick([30, 45, 60, 90, 120, 135, 150, 210, 225, 270, 300, 315]); if (Math.random() < 0.5) return { q: T`Convert $${d}^\circ$ to radians (exact).`, fields: [{ label: 'radians', ans: d * D2R }], sol: T`$${d}\times\frac{\pi}{180}=${pf(d, 180)}$.` }; return { q: T`Convert $${pf(d, 180)}$ radians to degrees.`, fields: [{ label: 'degrees', ans: d }], sol: T`$${pf(d, 180)}\times\frac{180}{\pi}=${d}^\circ$.` }; },
        () => { const r = ri(3, 15), th = pick([0.5, 0.8, 1.2, 1.5, 2, 2.5]); return { q: T`A sector has radius $${r}$ cm and angle $${th}$ rad. Find the arc length and the area.`, fields: [{ label: 'arc length', ans: r * th }, { label: 'area', ans: 0.5 * r * r * th }], sol: T`$s=r\theta=${num(r * th)}$ cm, $A=\tfrac12r^2\theta=${num(0.5 * r * r * th)}\text{ cm}^2$.` }; },
        () => { const r = ri(4, 12), [k, d] = pick([[1, 3], [1, 2], [2, 3], [1, 6], [5, 6]]), th = k * Math.PI / d, A = 0.5 * r * r * (th - Math.sin(th)); return { q: T`Find the area of the segment cut off by a chord subtending $${pf(k, d)}$ at the centre of a circle of radius $${r}$ (3 s.f.).`, fields: [{ label: 'area', ans: A }], sol: T`Sector − triangle $=\tfrac12r^2\theta-\tfrac12r^2\sin\theta=\tfrac12(${r * r})\left(${pf(k, d)}-\sin ${pf(k, d)}\right)=${num(A)}$.` }; },
      ],
    },
    {
      id: 'm_tgraph', title: 'Trig graphs & exact values', sims: ['m_unitcircle'],
      notes: T`<table class="tbl"><tr><th></th><th>$0^\circ$</th><th>$30^\circ$</th><th>$45^\circ$</th><th>$60^\circ$</th><th>$90^\circ$</th></tr>
<tr><td>$\sin$</td><td>$0$</td><td>$\frac12$</td><td>$\frac{\sqrt2}2$</td><td>$\frac{\sqrt3}2$</td><td>$1$</td></tr>
<tr><td>$\cos$</td><td>$1$</td><td>$\frac{\sqrt3}2$</td><td>$\frac{\sqrt2}2$</td><td>$\frac12$</td><td>$0$</td></tr>
<tr><td>$\tan$</td><td>$0$</td><td>$\frac1{\sqrt3}$</td><td>$1$</td><td>$\sqrt3$</td><td>—</td></tr></table>
<ul><li>CAST: in quadrant 1 all are positive, then <b>S</b>in, <b>T</b>an, <b>C</b>os positive in quadrants 2, 3, 4.</li>
<li>$y=a\sin(bx)+c$: amplitude $|a|$, period $\frac{360^\circ}{b}$, max $c+|a|$, min $c-|a|$.</li></ul>`,
      drills: [
        () => { const f = pick(['sin', 'cos', 'tan']), base = pick([30, 45, 60]), q = pick([0, 1, 2, 3]), ang = [base, 180 - base, 180 + base, 360 - base][q], v = { sin: Math.sin, cos: Math.cos, tan: Math.tan }[f](ang * D2R); return { q: T`Find the exact value of $${'\\' + f + ' '}${ang}^\circ$.`, fields: [{ label: 'value', ans: v }], sol: T`Reference angle $${base}^\circ$, quadrant ${q + 1}: ${v < 0 ? 'negative' : 'positive'} by CAST. Value $=${identify(v) ? identify(v).tex : num(v)}$.` }; },
        () => { const a = pick([2, 3, 4, 0.5, -2]), b = pick([1, 2, 3, 4]), c = ri(-3, 3), f = pick(['sin', 'cos']); return { q: T`For $y=${nice(a)}${'\\' + f + ' '}${b === 1 ? '' : b}x${c ? sgn(c) : ''}$ ($x$ in degrees), find the amplitude, period, maximum and minimum.`, fields: [{ label: 'amplitude', ans: Math.abs(a) }, { label: 'period (°)', ans: 360 / b }, { label: 'max', ans: c + Math.abs(a) }, { label: 'min', ans: c - Math.abs(a) }], sol: T`Amplitude $|${nice(a)}|=${nice(Math.abs(a))}$, period $\frac{360^\circ}{${b}}=${nice(360 / b)}^\circ$, max $${nice(c + Math.abs(a))}$, min $${nice(c - Math.abs(a))}$.` }; },
      ],
    },
    {
      id: 'm_tid', title: 'Trig identities', sims: ['m_unitcircle'],
      notes: T`$$\tan\theta\equiv\frac{\sin\theta}{\cos\theta},\qquad\sin^2\theta+\cos^2\theta\equiv1$$
<ul><li>Showing an identity holds: start with the more complicated side; work towards the other. Don't move terms across an $\equiv$.</li>
<li>Useful rearrangements: $1-\cos^2\theta=\sin^2\theta$, $1-\sin^2\theta=\cos^2\theta$.</li></ul>`,
      drills: [
        () => { const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), quad = pick([2, 3, 4]), f = pick(['sin', 'cos']);
          const sv = quad === 2 ? b / c : -b / c, cv = quad === 4 ? a / c : -a / c, given = f === 'sin' ? sv : cv, range = { 2: '90^\\circ\\lt\\theta\\lt180^\\circ', 3: '180^\\circ\\lt\\theta\\lt270^\\circ', 4: '270^\\circ\\lt\\theta\\lt360^\\circ' }[quad];
          return { q: T`Given $${'\\' + f + ' '}\theta=${nice(given)}$ and $${range}$, find the exact values of $${'\\' + (f === 'sin' ? 'cos' : 'sin') + ' '}\theta$ and $\tan\theta$.`, fields: [{ label: f === 'sin' ? 'cos θ' : 'sin θ', ans: f === 'sin' ? cv : sv }, { label: 'tan θ', ans: sv / cv }], sol: T`$\sin^2\theta+\cos^2\theta=1$ gives magnitude $${fr(f === 'sin' ? a : b, c)}$; quadrant ${quad} fixes the sign (CAST). $\tan\theta=\frac{\sin\theta}{\cos\theta}=${nice(sv / cv)}$.` }; },
        () => { const L = [[T`\dfrac{1-\cos^2x}{\cos^2x}`, T`\tan^2x`], [T`\dfrac{\sin x}{\tan x}`, T`\cos x`], [T`(\sin x+\cos x)^2-1`, T`2\sin x\cos x`], [T`\sin^4x-\cos^4x`, T`\sin^2x-\cos^2x`], [T`\dfrac{1-\sin^2x}{\sin x\cos x}`, T`\dfrac{1}{\tan x}`], [T`\tan x\cos x`, T`\sin x`], [T`\dfrac{\cos^2x}{1-\sin x}`, T`1+\sin x`]];
          const [e, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(l => l[1] !== r)).slice(0, 3).map(l => l[1])]);
          return { q: T`Simplify $${e}$.`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(r) }, sol: T`Use $\sin^2x+\cos^2x=1$ and $\tan x=\frac{\sin x}{\cos x}$: $${e}\equiv ${r}$.` }; },
      ],
    },
    {
      id: 'm_teq', title: 'Solving trig equations', sims: ['m_unitcircle'],
      notes: T`<ol><li>Find the principal value with the inverse function.</li><li>Use the graph or CAST to find the other value(s) in one period: $\sin$: $180^\circ-\alpha$; $\cos$: $360^\circ-\alpha$; $\tan$: $\alpha+180^\circ$.</li>
<li>Add/subtract whole periods to get every solution in range. For $\sin2x=k$ work in $0\le2x\le720^\circ$ first, then halve.</li>
<li>Quadratics in $\sin x$ or $\cos x$: use $\sin^2x+\cos^2x=1$ to get one function, factorise, reject values outside $[-1,1]$.</li></ol>`,
      drills: [
        () => { const f = pick(['sin', 'cos', 'tan']), k = f === 'tan' ? pick([1, -1, Math.sqrt(3), 1 / Math.sqrt(3), 2, -0.5]) : pick([0.5, -0.5, Math.sqrt(3) / 2, -Math.SQRT1_2, 0.3, -0.8]); const xs = trigSolve(f, 1, 0, k);
          return { q: T`Solve $${'\\' + f + ' '} x=${identify(k) ? identify(k).tex : num(k)}$ for $0^\circ\le x\le360^\circ$ (1 d.p. where not exact).`, fields: [{ label: 'x values', set: xs, tol: { abs: 0.06 } }], sol: T`Principal value $${num(f === 'sin' ? Math.asin(k) / D2R : f === 'cos' ? Math.acos(k) / D2R : Math.atan(k) / D2R)}^\circ$; use the graph/CAST for the rest: $x=${degList(xs)}$.` }; },
        () => { const f = pick(['sin', 'cos']), a = pick([2, 3]), k = pick([0.5, -0.5, Math.sqrt(3) / 2]); const xs = trigSolve(f, a, 0, k);
          return { q: T`Solve $${'\\' + f + ' '}${a}x=${identify(k).tex}$ for $0^\circ\le x\le360^\circ$.`, fields: [{ label: 'x values', set: xs, tol: { abs: 0.06 } }], sol: T`Let $u=${a}x$, $0\le u\le ${360 * a}^\circ$. Solve $${'\\' + f + ' '} u=${identify(k).tex}$ over that range, then divide by ${a}: $x=${degList(xs)}$.` }; },
        () => { const L = [
            { e: T`2\sin^2x+3\cos x=3`, f: 'cos', ks: [0.5, 1], w: T`2(1-\cos^2x)+3\cos x-3=0\Rightarrow2\cos^2x-3\cos x+1=0\Rightarrow(2\cos x-1)(\cos x-1)=0` },
            { e: T`2\cos^2x-\sin x-1=0`, f: 'sin', ks: [0.5, -1], w: T`2(1-\sin^2x)-\sin x-1=0\Rightarrow2\sin^2x+\sin x-1=0\Rightarrow(2\sin x-1)(\sin x+1)=0` },
            { e: T`2\sin^2x=\sin x`, f: 'sin', ks: [0, 0.5], w: T`\sin x(2\sin x-1)=0\ \ (\text{don't divide by }\sin x!)` },
            { e: T`\tan^2x=3`, f: 'tan', ks: [Math.sqrt(3), -Math.sqrt(3)], w: T`\tan x=\pm\sqrt3` }];
          const T0 = pick(L.slice(0, 4)); const xs = [...new Set(T0.ks.flatMap(k => trigSolve(T0.f, 1, 0, k)).map(x => +x.toFixed(6)))].sort((p, q) => p - q);
          return { q: T`Solve $${T0.e}$ for $0^\circ\le x\le360^\circ$.`, fields: [{ label: 'x values', set: xs, tol: { abs: 0.06 } }], sol: T`$${T0.w}$, so $${'\\' + T0.f + ' '} x=${T0.ks.map(k => identify(k).tex).join('\\text{ or }')}$.<br>$x=${degList(xs)}$.` };
        },
      ],
    },
    /* ---------------- EXPONENTIALS & LOGS ---------------- */
    {
      id: 'm_exp', title: 'Exponential functions & e', sims: ['m_expgraph'],
      notes: T`<ul><li>$y=a^x$ ($a\gt0$) passes through $(0,1)$, has asymptote $y=0$, increasing for $a\gt1$.</li>
<li>$e\approx2.718$: the limit of $\left(1+\frac1n\right)^n$ — continuous compounding of 100% interest. ($y=e^x$ is also the curve whose gradient equals its height — met in A2.)</li>
<li>$y=e^{kx}$: growth for $k\gt0$, decay for $k\lt0$; $y=e^{x}+c$ has asymptote $y=c$.</li>
<li>$\ln x$ is the inverse of $e^x$: $e^{\ln x}=x$, $\ln e^x=x$. Solve $e^{kx}=c$ by $x=\frac{\ln c}{k}$.</li>
<li>Models: $N=N_0e^{kt}$ grows ($k\gt0$) or decays ($k\lt0$).</li></ul>`,
      drills: [
        () => { const k = rnz(-4, 4), c = pick([2, 3, 5, 7, 10]), a = ri(1, 4); return { q: T`Solve $${a === 1 ? '' : a}e^{${k}x}=${a * c}$ exactly.`, fields: [{ label: 'x', ans: Math.log(c) / k }], sol: T`$e^{${k}x}=${c}\Rightarrow ${k}x=\ln ${c}\Rightarrow x=${k === 1 ? '' : `\\frac{1}{${k}}`}\ln ${c}\approx ${num(Math.log(c) / k)}$.` }; },
        () => { const N0 = pick([100, 200, 500, 1000]), T2 = pick([3, 4, 5, 6, 8]), t = ri(2, 20), k = Math.log(2) / T2, N = N0 * Math.exp(k * t); return { q: T`A population is modelled by $N=${N0}e^{kt}$. It doubles every $${T2}$ hours. Find $k$ (exact) and $N$ after $${t}$ hours (nearest whole number).`, fields: [{ label: 'k', ans: k }, { label: 'N', ans: Math.round(N), tol: { abs: 1 } }], sol: T`$2=e^{${T2}k}\Rightarrow k=\frac{\ln2}{${T2}}$. $N=${N0}e^{${t}\ln2/${T2}}=${N0}\cdot2^{${fr(t, T2)}}\approx ${Math.round(N)}$.` }; },
        () => { const a = rnz(-4, 5), c = ri(-5, 5), k = rnz(-2, 2); return { q: T`State the $y$-intercept and the equation of the horizontal asymptote of $y=${a === 1 ? '' : a === -1 ? '-' : a}e^{${k}x}${c ? sgn(c) : ''}$.`, fields: [{ label: 'y-intercept', ans: a + c }, { label: 'asymptote y =', ans: c }], sol: T`At $x=0$: $${a}+${par(c)}=${a + c}$. As $${k > 0 ? 'x\\to-\\infty' : 'x\\to\\infty'}$, $e^{${k}x}\to0$, so $y\to ${c}$.` }; },
      ],
    },
    {
      id: 'm_log', title: 'Laws of logarithms & equations', sims: ['m_expgraph'],
      notes: T`$$\log_a x=y\iff a^y=x;\qquad\log_a(xy)=\log_ax+\log_ay,\quad\log_a\frac xy=\log_ax-\log_ay,\quad\log_ax^k=k\log_ax$$
<ul><li>$\log_aa=1$, $\log_a1=0$. Solve $a^x=b$ by taking logs: $x=\frac{\log b}{\log a}$.</li><li>Combine logs into one before removing them; check answers keep every log's argument positive.</li>
<li><b>Inequalities</b> $a^x\lt b$: take logs of both sides, $x\ln a\lt\ln b$. If $0\lt a\lt1$ then $\ln a\lt0$ and dividing by it <b>reverses</b> the inequality.</li></ul>`,
      drills: [
        () => { const L = [[2, 32, 5], [3, 81, 4], [9, 27, 1.5], [4, 1 / 8, -1.5], [8, 4, 2 / 3], [5, 1 / 25, -2], [27, 9, 2 / 3], [16, 8, 0.75], [10, 0.001, -3]]; const [b, x, v] = pick(L); return { q: T`Evaluate $\log_{${b}}${nice(x)}$.`, fields: [{ label: 'value', ans: v }], sol: T`Write both as powers of a common base: $${b}^{${nice(v)}}=${nice(x)}$, so the answer is $${nice(v)}$.` }; },
        () => { const a = ri(2, 5), b = ri(2, 6), c = ri(2, 6), v = a * a * b / c; if (!Number.isInteger(v * 6)) return { q: T`Write $2\log ${a}+\log ${b}$ as a single logarithm $\log k$.`, fields: [{ label: 'k', ans: a * a * b }], sol: T`$\log ${a * a}+\log ${b}=\log ${a * a * b}$.` }; return { q: T`Write $2\log ${a}+\log ${b}-\log ${c}$ as a single logarithm $\log k$.`, fields: [{ label: 'k', ans: v }], sol: T`$2\log ${a}=\log ${a * a}$; then $\log\frac{${a * a}\times ${b}}{${c}}=\log ${nice(v)}$.` }; },
        () => { const a = pick([2, 3, 5, 7]), b = pick([10, 20, 50, 100, 7, 30]); const x = Math.log(b) / Math.log(a); return { q: T`Solve $${a}^x=${b}$ (3 s.f.).`, fields: [{ label: 'x', ans: x }], sol: T`$x\ln ${a}=\ln ${b}\Rightarrow x=\frac{\ln ${b}}{\ln ${a}}=${num(x)}$.` }; },
        () => { const p = ri(1, 3), q = ri(p + 1, 5); return { q: T`Solve $2^{2x}-${2 ** p + 2 ** q}\cdot2^x+${2 ** (p + q)}=0$.`, fields: [{ label: 'x values', set: [p, q] }], sol: T`Let $u=2^x$: $u^2-${2 ** p + 2 ** q}u+${2 ** (p + q)}=0\Rightarrow(u-${2 ** p})(u-${2 ** q})=0$. $2^x=${2 ** p}$ or $${2 ** q}$: $x=${p}$ or $${q}$.` }; },
        () => { let a = ri(-3, 4), b; do b = ri(-3, 5); while (b === a); const c = pick([3, 4, 5]); const N = 2 ** c, B = a + b, C2c = a * b - N, D = B * B - 4 * C2c; if (D < 0 || !Number.isInteger(Math.sqrt(D))) return { q: T`Solve $\log_2x+\log_2(x+2)=3$.`, fields: [{ label: 'x', ans: 2 }], sol: T`$x(x+2)=8\Rightarrow(x+4)(x-2)=0$; $x=-4$ is invalid (log of a negative), so $x=2$.` }; const xs = [(-B + Math.sqrt(D)) / 2, (-B - Math.sqrt(D)) / 2].filter(x => x + a > 0 && x + b > 0); return { q: T`Solve $\log_2(x${sgn(a)})+\log_2(x${sgn(b)})=${c}$.`.replace('+ 0)', ')'), fields: [{ label: 'x values', set: xs }], sol: T`$(x${sgn(a)})(x${sgn(b)})=2^{${c}}=${N}\Rightarrow x^2${sgn(B)}x${sgn(C2c)}=0$. Roots $${[(-B + Math.sqrt(D)) / 2, (-B - Math.sqrt(D)) / 2].join(',\\ ')}$; keep those making both arguments positive: $x=${xs.join(',\\ ')}$.`.replace(/\+ 0\)/g, ')') }; },
        () => { const up = Math.random() < 0.5; if (up) { const a = pick([2, 3, 5, 1.5, 1.2]), b = pick([10, 50, 100, 1000, 20]), x = Math.log(b) / Math.log(a), n = Math.floor(x) + 1; return { q: T`Find the smallest integer $n$ such that $${a}^n\gt ${b}$.`, fields: [{ label: 'n', ans: n }], sol: T`$n\ln ${a}\gt\ln ${b}\Rightarrow n\gt\dfrac{\ln ${b}}{\ln ${a}}=${num(x)}$ ($\ln ${a}\gt0$, so no reversal). Smallest integer: $n=${n}$.` }; }
          const r = pick([0.9, 0.8, 0.75, 0.5, 0.95]), t = pick([0.1, 0.05, 0.01, 0.2]), x = Math.log(t) / Math.log(r), n = Math.floor(x) + 1;
          return { q: T`Find the smallest integer $n$ such that $${r}^n\lt ${t}$.`, fields: [{ label: 'n', ans: n }], sol: T`Take logs: $n\ln ${r}\lt\ln ${t}$. Since $\ln ${r}\lt0$, dividing <b>reverses</b> the inequality: $n\gt\dfrac{\ln ${t}}{\ln ${r}}=${num(x)}$. Smallest integer: $n=${n}$.` }; },
      ],
    },
    {
      id: 'm_growth', title: 'Exponential growth & decay models', sims: ['m_growth'],
      notes: T`$$N=N_0e^{kt}\qquad(k\gt0\text{ growth},\ k\lt0\text{ decay})$$
<ul><li>$N_0$ is the value at $t=0$. The rate of change is proportional to the amount present — that is why the exponential appears.</li>
<li><b>Continuous compound interest</b>: $A=Pe^{rt}$ ($r$ as a decimal, e.g. 4% → $0.04$).</li>
<li><b>Radioactive decay</b>: half-life $T$ satisfies $e^{-kT}=\tfrac12$, so $k=\dfrac{\ln2}{T}$. Doubling time for growth is $\dfrac{\ln2}{k}$.</li>
<li><b>Drug concentration</b> $C=C_0e^{-kt}$: "when does it fall below $c$?" is an <b>inequality</b> — solve $C_0e^{-kt}\lt c$ with logs.</li>
<li>Find unknown constants from two data points: divide the two equations to eliminate $N_0$, then take logs.</li>
<li>Comment on the model: unlimited growth is unrealistic; values must make sense (whole numbers of animals, no negative concentration).</li></ul>`,
      drills: [
        () => { const P = pick([500, 1000, 2000, 5000]), r = pick([2, 3, 4, 5, 6]), t = ri(3, 15), A = P * Math.exp(r / 100 * t), Aann = P * (1 + r / 100) ** t;
          return { q: T`£${P} is invested at ${r}% per annum compounded continuously, so $A=${P}e^{${r / 100}t}$. Find the amount after ${t} years (to the nearest penny), and how much more this is than annual compounding.`, fields: [{ label: 'amount (£)', ans: A, tol: { abs: 0.01 } }, { label: 'difference (£)', ans: A - Aann, tol: { abs: 0.02 } }], sol: T`$A=${P}e^{${r / 100}\times${t}}=£${A.toFixed(2)}$. Annual: $${P}(1.${String(r).padStart(2, '0')})^{${t}}=£${Aann.toFixed(2)}$. Difference $£${(A - Aann).toFixed(2)}$.` }; },
        () => { const T2 = pick([5, 8, 12, 24, 30]), m0 = pick([40, 80, 100, 200]), t = ri(2, 4) * T2 / 2 + ri(1, 5), k = Math.log(2) / T2, m = m0 * Math.exp(-k * t);
          return { q: T`A radioactive substance has a half-life of ${T2} days. Initially there are ${m0} g, and $m=${m0}e^{-kt}$. Find $k$ and the mass after ${t} days.`, fields: [{ label: 'k', ans: k }, { label: 'mass (g)', ans: m }], sol: T`Half-life: $e^{-${T2}k}=\tfrac12\Rightarrow k=\dfrac{\ln2}{${T2}}=${num(k)}$. Then $m=${m0}e^{-${num(k)}\times${t}}=${num(m)}$ g.` }; },
        () => { const C0 = pick([8, 10, 12, 20]), h = ri(1, 3), frac = pick([0.8, 0.75, 0.6, 0.5]), C1 = C0 * frac, k = -Math.log(frac) / h, c = pick([1, 2, 0.5]), tStar = Math.log(C0 / c) / k;
          return { q: T`A drug's concentration is modelled by $C=${C0}e^{-kt}$ mg/l, $t$ hours after injection. After ${h} hour${h > 1 ? 's' : ''} it is ${nice(C1)} mg/l. Find $k$, and the time after which $C\lt ${c}$.`, fields: [{ label: 'k', ans: k }, { label: 't (hours)', ans: tStar }], sol: T`$${nice(C1)}=${C0}e^{-${h}k}\Rightarrow k=\dfrac{\ln(${C0}/${nice(C1)})}{${h}}=${num(k)}$.<br>$${C0}e^{-kt}\lt ${c}\Rightarrow e^{-kt}\lt ${fr(c * 2, C0 * 2)}\Rightarrow -kt\lt\ln ${fr(c * 2, C0 * 2)}\Rightarrow t\gt\dfrac{\ln(${C0}/${c})}{k}=${num(tStar)}$ hours (dividing by $-k$ reversed the sign).` }; },
        () => { const P0 = pick([200, 400, 800, 1500]), k = pick([0.05, 0.08, 0.1, 0.12, 0.15]), t1 = ri(1, 4), t2 = t1 + ri(3, 8), a = Math.round(P0 * Math.exp(k * t1)), b = Math.round(P0 * Math.exp(k * t2)), kk = Math.log(b / a) / (t2 - t1), PP = a * Math.exp(-kk * t1);
          return { q: T`A population is modelled by $P=P_0e^{kt}$. When $t=${t1}$, $P=${a}$; when $t=${t2}$, $P=${b}$. Find $k$ and $P_0$.`, fields: [{ label: 'k', ans: kk }, { label: 'P₀', ans: PP, tol: { rel: 0.005 } }], sol: T`Divide: $\dfrac{${b}}{${a}}=e^{${t2 - t1}k}\Rightarrow k=\dfrac{\ln(${b}/${a})}{${t2 - t1}}=${num(kk)}$. Then $P_0=${a}e^{-${t1}k}=${num(PP)}$.` }; },
      ],
    },
    {
      id: 'm_model', title: 'Modelling with logarithmic graphs', sims: ['m_loglin'],
      notes: T`<ul><li>$y=ax^n\Rightarrow\log y=\log a+n\log x$: plot $\log y$ against $\log x$ — straight line, gradient $n$, intercept $\log a$.</li>
<li>$y=kb^x\Rightarrow\log y=\log k+x\log b$: plot $\log y$ against $x$ — gradient $\log b$, intercept $\log k$.</li></ul>`,
      drills: [
        () => { const n = pick([2, 3, -1, 0.5, 1.5]), a = pick([2, 3, 5, 0.5]), x1 = pick([1, 2]), x2 = pick([4, 8, 10]); const y1 = a * x1 ** n, y2 = a * x2 ** n; return { q: T`$y=ax^n$ passes through $(${x1},${num(y1)})$ and $(${x2},${num(y2)})$. Find $n$ and $a$.`, fields: [{ label: 'n', ans: n }, { label: 'a', ans: a }], sol: T`Divide: $\frac{${num(y2)}}{${num(y1)}}=\left(\frac{${x2}}{${x1}}\right)^n\Rightarrow n=\frac{\ln(${num(y2 / y1)})}{\ln(${num(x2 / x1)})}=${nice(n)}$. Then $a=\frac{${num(y1)}}{${x1}^{${nice(n)}}}=${nice(a)}$.` }; },
        () => { const k = pick([2, 3, 5, 10]), b = pick([1.5, 2, 3, 0.5, 4]); const m = Math.log10(b), c = Math.log10(k); return { q: T`For a model $y=kb^x$, the graph of $\log_{10}y$ against $x$ is a straight line with gradient $${num(m, 4)}$ and intercept $${num(c, 4)}$. Find $k$ and $b$.`, fields: [{ label: 'k', ans: k, tol: { rel: 0.003 } }, { label: 'b', ans: b, tol: { rel: 0.003 } }], sol: T`$\log y=\log k+x\log b$: $\log k=${num(c, 4)}\Rightarrow k=10^{${num(c, 4)}}\approx ${k}$; $\log b=${num(m, 4)}\Rightarrow b\approx ${b}$.` }; },
      ],
    },
    /* ---------------- DIFFERENTIATION ---------------- */
    {
      id: 'm_dfp', title: 'Gradients & differentiation from first principles', sims: ['m_firstprinciples'],
      notes: T`$$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$$
<p>The gradient of the chord from $x$ to $x+h$ tends to the gradient of the tangent as $h\to0$. For $f(x)=x^2$: $\frac{(x+h)^2-x^2}{h}=2x+h\to2x$.</p>`,
      drills: [
        () => { const a = rnz(-3, 3), b = ri(-5, 5), x0 = ri(-3, 3), hh = pick([0.1, 0.01, 0.5, 1]); const g = 2 * a * x0 + b + a * hh; return { q: T`$f(x)=${poly([[a, 'x^2'], [b, 'x']])}$. Find the gradient of the chord from $x=${x0}$ to $x=${x0}+${hh}$.`, fields: [{ label: 'gradient', ans: g }], sol: T`$\frac{f(x+h)-f(x)}{h}=${poly([[2 * a, 'x'], [b, ''], [a, 'h']])}$ (expand and cancel). At $x=${x0}$, $h=${hh}$: $${num(g)}$. As $h\to0$ this tends to $f'(${x0})=${2 * a * x0 + b}$.` }; },
        () => { const a = rnz(-3, 3), b = ri(-5, 5), c = ri(-5, 5), x0 = ri(-3, 3); return { q: T`From first principles, $f(x)=${poly([[a, 'x^2'], [b, 'x'], [c, '']])}$ has $f'(x)=px+q$. Find $p,q$ and $f'(${x0})$.`, fields: [{ label: 'p', ans: 2 * a }, { label: 'q', ans: b }, { label: "f'(x0)", ans: 2 * a * x0 + b }], sol: T`$f(x+h)-f(x)=${a}(2xh+h^2)${sgn(b)}h$. Divide by $h$: $${poly([[2 * a, 'x'], [b, ''], [a, 'h']])}\to ${poly([[2 * a, 'x'], [b, '']])}$ as $h\to0$. $f'(${x0})=${2 * a * x0 + b}$.` }; },
      ],
    },
    {
      id: 'm_dx', title: 'Differentiating xⁿ; tangents & normals', sims: ['m_firstprinciples'],
      notes: T`$$\frac{d}{dx}x^n=nx^{n-1}\quad(\text{any rational }n)$$
<ul><li>Rewrite first: $\sqrt x=x^{1/2}$, $\frac{3}{x^2}=3x^{-2}$, $\frac{x^2+1}{x}=x+x^{-1}$.</li>
<li>Tangent at $x=a$: gradient $f'(a)$, through $(a,f(a))$. Normal: gradient $-\frac{1}{f'(a)}$.</li></ul>`,
      drills: [
        () => { const pw = shuffle([3, 2, 1, 0.5, -1, -2, 1.5]).slice(0, 3), co = pw.map(() => rnz(-4, 4)), x0 = pick([1, 4, 9]); const term = (c, p) => { const s = c < 0 ? '-' : '+', a = Math.abs(c); if (p === 0.5) return `${s}${a === 1 ? '' : a}\\sqrt x`; if (p === -1) return `${s}\\frac{${a}}{x}`; if (p === -2) return `${s}\\frac{${a}}{x^2}`; if (p === 1.5) return `${s}${a === 1 ? '' : a}x\\sqrt x`; return `${s}${a === 1 ? '' : a}x${p === 1 ? '' : `^{${p}}`}`; };
          const e = pw.map((p, i) => term(co[i], p)).join('').replace(/^\+/, ''), d = pw.reduce((s, p, i) => s + co[i] * p * x0 ** (p - 1), 0);
          return { q: T`Find $\dfrac{dy}{dx}$ at $x=${x0}$ for $y=${e}$.`, fields: [{ label: "dy/dx", ans: d }], sol: T`Write as powers: ${pw.map((p, i) => `$${co[i]}x^{${nice(p)}}$`).join(', ')}. Differentiate each: ${pw.map((p, i) => `$${nice(co[i] * p)}x^{${nice(p - 1)}}$`).join(', ')}. At $x=${x0}$: $${nice(d)}$.` }; },
        () => { const a = rnz(-2, 2), b = ri(-4, 4), c = ri(-5, 5), x0 = ri(-3, 3), f = x => a * x ** 3 + b * x + c, m = 3 * a * x0 * x0 + b, y0 = f(x0), normal = Math.random() < 0.4 && m !== 0; const M = normal ? -1 / m : m;
          return { q: T`Find the equation of the ${normal ? 'normal' : 'tangent'} to $y=${poly([[a, 'x^3'], [b, 'x'], [c, '']])}$ at $x=${x0}$, as $y=mx+c$.`, fields: [{ label: 'm', ans: M }, { label: 'c', ans: y0 - M * x0 }], sol: T`$y'=${poly([[3 * a, 'x^2'], [b, '']])}$, so $y'(${x0})=${m}$; point $(${x0},${y0})$. ${normal ? `Normal gradient $-\\frac1{${m}}=${nice(M)}$. ` : ''}$c=${y0}-(${nice(M)})(${x0})=${nice(y0 - M * x0)}$.` }; },
      ],
    },
    {
      id: 'm_stat', title: 'Stationary points, increasing/decreasing & optimisation', sims: ['m_firstprinciples'],
      notes: T`<ul><li>Stationary points: solve $f'(x)=0$.</li><li>Nature: $f''(x)\gt0$ minimum, $\lt0$ maximum (if $=0$, check the sign of $f'$ either side).</li>
<li>Increasing where $f'(x)\gt0$, decreasing where $f'(x)\lt0$.</li><li>Optimisation: write the quantity in <b>one</b> variable using the constraint, differentiate, set to zero, justify max/min.</li></ul>`,
      drills: [
        () => { let p = ri(-3, 2), q; do q = ri(-2, 4); while (q <= p || (p + q) % 2 !== 0); const d = ri(-5, 5), b2 = -1.5 * (p + q), b1 = 3 * p * q, f = x => x ** 3 + b2 * x * x + b1 * x + d;
          return { q: T`Find the stationary points of $y=${poly([[1, 'x^3'], [b2, 'x^2'], [b1, 'x'], [d, '']])}$. Enter the $x$-coordinate of the maximum and of the minimum.`, fields: [{ label: 'x (max)', ans: p }, { label: 'x (min)', ans: q }, { label: 'y (min)', ans: f(q) }], sol: T`$y'=${poly([[3, 'x^2'], [2 * b2, 'x'], [b1, '']])}=3${lin(p)}${lin(q)}$. $y''=${poly([[6, 'x'], [2 * b2, '']])}$: at $x=${p}$, $y''=${6 * p + 2 * b2}\lt0$ (max); at $x=${q}$, $y''=${6 * q + 2 * b2}\gt0$ (min), $y=${f(q)}$.` }; },
        () => { const a = rnz(-3, 3), b = ri(-8, 8), k = -b / (2 * a); return { q: T`$f(x)=${poly([[a, 'x^2'], [b, 'x']])}+${ri(1, 9)}$ is ${a > 0 ? 'increasing' : 'decreasing'} for $x\gt k$. Find $k$.`, fields: [{ label: 'k', ans: k }], sol: T`$f'(x)=${2 * a}x${sgn(b)}$, which is ${a > 0 ? 'positive' : 'negative'} for $x\gt ${nice(k)}$.` }; },
        () => { if (Math.random() < 0.5) { const L = ri(6, 30); return { q: T`Squares of side $x$ cm are cut from the corners of a ${L} cm by ${L} cm sheet to make an open box. Find the value of $x$ that maximises the volume, and the maximum volume.`, fields: [{ label: 'x', ans: L / 6 }, { label: 'V max', ans: 2 * L ** 3 / 27 }], sol: T`$V=x(${L}-2x)^2$. $V'=(${L}-2x)^2-4x(${L}-2x)=(${L}-2x)(${L}-6x)=0\Rightarrow x=${nice(L / 6)}$ (the other root gives zero volume). $V=${nice(L / 6)}\left(${nice(2 * L / 3)}\right)^2=${num(2 * L ** 3 / 27)}\text{ cm}^3$.` }; }
          const P = ri(10, 60) * 2; return { q: T`A rectangle has perimeter $${P}$ m. Find the maximum possible area.`, fields: [{ label: 'max area', ans: P * P / 16 }], sol: T`Sides $x$ and $${P / 2}-x$: $A=x(${P / 2}-x)$, $A'=${P / 2}-2x=0\Rightarrow x=${nice(P / 4)}$ (a square); $A''=-2\lt0$ max. $A=${nice(P * P / 16)}\text{ m}^2$.` }; },
      ],
    },
    /* ---------------- INTEGRATION ---------------- */
    {
      id: 'm_int', title: 'Integration as the reverse of differentiation', sims: ['m_area'],
      notes: T`$$\int x^n\,dx=\frac{x^{n+1}}{n+1}+c\quad(n\ne-1)$$
<ul><li>Rewrite roots and fractions as powers first. Always include $+c$ for indefinite integrals.</li><li>Given $\frac{dy}{dx}$ and a point on the curve, integrate then use the point to find $c$.</li></ul>`,
      drills: [
        () => { const a = rnz(-4, 4) * 3, b = rnz(-4, 4) * 2, x0 = ri(-2, 3), y0 = ri(-8, 8); const F = x => a / 3 * x ** 3 + b / 2 * x * x; const c = y0 - F(x0); return { q: T`$\dfrac{dy}{dx}=${poly([[a, 'x^2'], [b, 'x']])}$ and the curve passes through $(${x0},${y0})$. Find $y$ when $x=0$ (the constant $c$).`, fields: [{ label: 'c', ans: c }], sol: T`$y=${poly([[a / 3, 'x^3'], [b / 2, 'x^2']])}+c$. Substitute $(${x0},${y0})$: $${y0}=${nice(F(x0))}+c\Rightarrow c=${nice(c)}$.` }; },
        () => { const k = pick([1, 2, 3]), x0 = pick([1, 4]), y0 = ri(-3, 6), v = y0 - (2 * k / 3) * x0 ** 1.5 + 0; return { q: T`$\dfrac{dy}{dx}=${k === 1 ? '' : k}\sqrt x$ and $y=${y0}$ when $x=${x0}$. Find $y$ when $x=9$.`, fields: [{ label: 'y(9)', ans: (2 * k / 3) * 27 + y0 - (2 * k / 3) * x0 ** 1.5 }], sol: T`$y=\frac{${2 * k}}{3}x^{3/2}+c$; $c=${y0}-\frac{${2 * k}}3(${x0 ** 1.5})=${nice(v)}$. $y(9)=\frac{${2 * k}}3(27)${sgn(v)}=${nice(18 * k + v)}$.` }; },
      ],
    },
    {
      id: 'm_area', title: 'Definite integrals & area', sims: ['m_area'],
      notes: T`$$\int_a^bf(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a)$$
<ul><li>Area between a curve and the $x$-axis: integrate; parts <b>below</b> the axis come out negative — find the roots and integrate each part separately.</li>
<li>Area between a curve and the $y$-axis: write $x$ in terms of $y$ and use $\displaystyle\int_c^d x\,dy$.</li></ul>`,
      drills: [
        () => { const c = [ri(-3, 3), ri(-4, 4), ri(-5, 5)], a = ri(-2, 1), b = ri(a + 1, 3); const F = x => c[0] * x ** 3 / 3 + c[1] * x * x / 2 + c[2] * x; return { q: T`Evaluate $\displaystyle\int_{${a}}^{${b}}(${poly([[c[0], 'x^2'], [c[1], 'x'], [c[2], '']])})\,dx$.`, fields: [{ label: 'value', ans: F(b) - F(a) }], sol: T`$\left[${poly([[c[0] / 3, 'x^3'], [c[1] / 2, 'x^2'], [c[2], 'x']]).replace(/(\d+\.\d+)/g, m => nice(+m))}\right]_{${a}}^{${b}}=${nice(F(b))}-(${nice(F(a))})=${nice(F(b) - F(a))}$.` }; },
        () => { let r1 = ri(-3, 2), r2; do r2 = ri(-2, 4); while (r2 <= r1); const k = pick([1, 2, 3]), A = k * (r2 - r1) ** 3 / 6; return { q: T`Find the area enclosed by $y=${k === 1 ? '' : k}${lin(r1)}(${r2}-x)$ and the $x$-axis.`.replace('(x+ 0)', 'x').replace('(x- 0)', 'x').replace('+ 0)', ')'), fields: [{ label: 'area', ans: A }], sol: T`Roots $x=${r1},${r2}$; the curve is above the axis between them. $\int_{${r1}}^{${r2}}$ gives $\frac{${k}(${r2 - r1})^3}{6}=${nice(A)}$ (expand and integrate to check).` }; },
        () => { const t = ri(0, 1); if (t === 0) { const c = ri(1, 3), d = c + ri(1, 4), k = pick([1, 2, 3]); const A = 2 / 3 * (d ** 1.5 - c ** 1.5) / Math.sqrt(k); return { q: T`Find the area between the curve $y=${k === 1 ? '' : k}x^2$ ($x\ge0$), the $y$-axis and the lines $y=${c}$ and $y=${d}$.`, fields: [{ label: 'area', ans: A }], sol: T`Area with the $y$-axis: $\int x\,dy$. Here $x=\sqrt{\tfrac{y}{${k}}}=${k === 1 ? '' : `\\tfrac{1}{\\sqrt{${k}}}`}y^{1/2}$.<br>$${k === 1 ? '' : `\\tfrac{1}{\\sqrt{${k}}}`}\left[\tfrac23y^{3/2}\right]_{${c}}^{${d}}=${num(A)}$.` }; }
          const a = ri(1, 3), b = ri(1, 4), c = ri(0, 2), d = c + ri(1, 3), A = a * (d ** 3 - c ** 3) / 3 + b * (d - c);
          return { q: T`Find the area enclosed by the curve $x=${a === 1 ? '' : a}y^2+${b}$, the $y$-axis and the lines $y=${c}$ and $y=${d}$.`, fields: [{ label: 'area', ans: A }], sol: T`$\displaystyle\int_{${c}}^{${d}}(${a === 1 ? '' : a}y^2+${b})\,dy=\left[\tfrac{${a}y^3}{3}+${b}y\right]_{${c}}^{${d}}=${nice(A)}$.` }; },
        () => { const r = ri(1, 3), s = r + ri(1, 3), T2 = s + ri(1, 2); const f = x => (x - r) * (x - s), F = x => x ** 3 / 3 - (r + s) * x * x / 2 + r * s * x; const A = Math.abs(F(r) - F(0)) + Math.abs(F(s) - F(r)) + Math.abs(F(T2) - F(s)); return { q: T`Find the total area between $y=(x-${r})(x-${s})$ and the $x$-axis from $x=0$ to $x=${T2}$.`, fields: [{ label: 'area', ans: A }], sol: T`The curve crosses at $x=${r}$ and $x=${s}$, and is below the axis between them. Integrate each part and add magnitudes: $${nice(Math.abs(F(r) - F(0)))}+${nice(Math.abs(F(s) - F(r)))}+${nice(Math.abs(F(T2) - F(s)))}=${nice(A)}$. (One integral over $[0,${T2}]$ would give $${nice(F(T2) - F(0))}$ — wrong.)` }; },
      ],
    },
    /* ---------------- VECTORS ---------------- */
    {
      id: 'm_vec', title: 'Vectors in two dimensions', sims: ['m_vectors'],
      notes: T`<ul><li>$\mathbf a=x\mathbf i+y\mathbf j=\binom xy$; magnitude $|\mathbf a|=\sqrt{x^2+y^2}$; direction $\theta$ with $\tan\theta=\frac yx$ (check the quadrant).</li>
<li>Unit vector $\hat{\mathbf a}=\frac{\mathbf a}{|\mathbf a|}$. Position vectors: $\overrightarrow{AB}=\mathbf b-\mathbf a$.</li><li>Parallel vectors are scalar multiples: $\mathbf b=k\mathbf a$.</li></ul>`,
      drills: [
        () => { const x = rnz(-6, 6), y = rnz(-6, 6), th = Math.atan2(y, x) / D2R; return { q: T`Find the magnitude of $${poly([[x, '\\mathbf i'], [y, '\\mathbf j']])}$ and the angle it makes with the positive $x$-axis (degrees, $-180^\circ\lt\theta\le180^\circ$).`, fields: [{ label: 'magnitude', ans: Math.hypot(x, y) }, { label: 'angle (°)', ans: th, tol: { abs: 0.06 } }], sol: T`$|\mathbf a|=\sqrt{${x * x}+${y * y}}=${surd(x * x + y * y)}$. Base angle $\arctan\left|\frac{${y}}{${x}}\right|$, adjusted for quadrant: $${th.toFixed(1)}^\circ$.` }; },
        () => { const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), sx = pick([1, -1]), sy = pick([1, -1]); return { q: T`Find the unit vector in the direction of $${poly([[sx * a, '\\mathbf i'], [sy * b, '\\mathbf j']])}$.`, fields: [{ label: 'i component', ans: sx * a / c }, { label: 'j component', ans: sy * b / c }], sol: T`$|\mathbf a|=${c}$, so $\hat{\mathbf a}=\frac1{${c}}(${poly([[sx * a, '\\mathbf i'], [sy * b, '\\mathbf j']])})=${fr(sx * a, c)}\mathbf i${sy < 0 ? '' : '+'}${fr(sy * b, c)}\mathbf j$.` }; },
        () => { const A = [ri(-5, 5), ri(-5, 5)], B = [ri(-5, 5), ri(-5, 5)], d = [B[0] - A[0], B[1] - A[1]]; return { q: T`$A$ and $B$ have position vectors $${poly([[A[0], '\\mathbf i'], [A[1], '\\mathbf j']])}$ and $${poly([[B[0], '\\mathbf i'], [B[1], '\\mathbf j']])}$. Find $\overrightarrow{AB}$ and $|\overrightarrow{AB}|$.`, fields: [{ label: 'i', ans: d[0] }, { label: 'j', ans: d[1] }, { label: '|AB|', ans: Math.hypot(...d) }], sol: T`$\overrightarrow{AB}=\mathbf b-\mathbf a=${poly([[d[0], '\\mathbf i'], [d[1], '\\mathbf j']])}$, $|\overrightarrow{AB}|=${surd(d[0] ** 2 + d[1] ** 2)}$.` }; },
        () => { const a = [rnz(-4, 4), rnz(-4, 4)], b = [rnz(-4, 4), rnz(-4, 4)], p = rnz(-3, 3), q = rnz(-3, 3), v = [p * a[0] + q * b[0], p * a[1] + q * b[1]]; return { q: T`$\mathbf a=${poly([[a[0], '\\mathbf i'], [a[1], '\\mathbf j']])}$, $\mathbf b=${poly([[b[0], '\\mathbf i'], [b[1], '\\mathbf j']])}$. Find $${p}\mathbf a${sgn(q)}\mathbf b$ and its magnitude.`.replace(/\+ 1\\mathbf b/, '+\\mathbf b').replace(/- 1\\mathbf b/, '-\\mathbf b'), fields: [{ label: 'i', ans: v[0] }, { label: 'j', ans: v[1] }, { label: 'magnitude', ans: Math.hypot(...v) }], sol: T`Component-wise: $${poly([[v[0], '\\mathbf i'], [v[1], '\\mathbf j']])}$, magnitude $${surd(v[0] ** 2 + v[1] ** 2)}$.` }; },
      ],
    },
  ],
});
