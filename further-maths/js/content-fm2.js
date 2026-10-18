// Further Maths A2 1 — spec points added from the official specification: small angle approximations (A7),
// sums of series by De Moivre (C1), and integrals of (x² ± a²)^(−1/2) with hyperbolic substitutions (H5).
'use strict';

const binomSumN = (n, th, part) => Math.pow(2 * Math.cos(th / 2), n) * (part === 'cos' ? Math.cos(n * th / 2) : Math.sin(n * th / 2));
const ANG = [[1, 3, '\\frac\\pi3'], [1, 2, '\\frac\\pi2'], [2, 3, '\\frac{2\\pi}3'], [1, 4, '\\frac\\pi4'], [1, 6, '\\frac\\pi6']];

topic({
  id: '_fm2', code: '', title: 'FM A2 1 additions', icon: '', color: '', blurb: '', hidden: true,
  points: [
    {
      id: 'sa1', title: 'Small angle approximations', sims: ['smallangle'],
      notes: T`$$\sin x\approx x,\qquad\cos x\approx1-\frac{x^2}{2},\qquad\tan x\approx x\qquad(x\text{ small, in radians})$$
<ul><li>They are the first terms of the Maclaurin series: $\sin x=x-\frac{x^3}{6}+\dots$, $\cos x=1-\frac{x^2}2+\frac{x^4}{24}-\dots$, $\tan x=x+\frac{x^3}3+\dots$</li>
<li>Method: replace every trig function by its approximation, expand, and keep terms up to $x^2$ (unless told otherwise).</li>
<li>$\cos kx\approx1-\frac{k^2x^2}{2}$, so $1-\cos kx\approx\frac{k^2x^2}{2}$ — the most used consequence.</li>
<li>Angles in degrees must be converted to radians first.</li></ul>`,
      drills: [
        () => {
          const a = ri(1, 4), b = ri(1, 4);
          return { q: T`For small $x$, $\dfrac{1-\cos ${a === 1 ? '' : a}x}{x\sin ${b === 1 ? '' : b}x}\approx k$. Find $k$.`, fields: [{ label: 'k', ans: a * a / (2 * b) }], sol: T`$1-\cos ${a}x\approx\frac{${a * a}x^2}{2}$ and $x\sin ${b}x\approx ${b}x^2$, so the ratio $\approx\dfrac{${a * a}}{${2 * b}}=${fr(a * a, 2 * b)}$.` };
        },
        () => {
          const p = ri(1, 4), q = ri(1, 4), r = ri(1, 4);
          return { q: T`Use small angle approximations to find the limit value of $\dfrac{\sin ${p === 1 ? '' : p}x\tan ${q === 1 ? '' : q}x}{1-\cos ${r === 1 ? '' : r}x}$ as $x\to0$.`, fields: [{ label: 'value', ans: 2 * p * q / (r * r) }], sol: T`Numerator $\approx(${p}x)(${q}x)=${p * q}x^2$; denominator $\approx\frac{${r * r}x^2}2$. Ratio $\to\dfrac{${2 * p * q}}{${r * r}}=${fr(2 * p * q, r * r)}$.` };
        },
        () => {
          const a = rnz(-5, 5), b = rnz(-5, 5), c = ri(-5, 5), co = k => (k === 1 ? '' : k === -1 ? '-' : k), sg = k => (k < 0 ? '-' : '+') + (Math.abs(k) === 1 ? '' : Math.abs(k));
          return { q: T`For small $\theta$, $${co(a)}\cos\theta${sg(b)}\tan\theta${c ? sgn(c) : ''}\approx A+B\theta+C\theta^2$. Find $A$, $B$ and $C$.`, fields: [{ label: 'A', ans: a + c }, { label: 'B', ans: b }, { label: 'C', ans: -a / 2 }], sol: T`$${co(a)}\left(1-\tfrac{\theta^2}{2}\right)${sg(b)}\theta${c ? sgn(c) : ''}=${a + c}${sg(b)}\theta${-a / 2 < 0 ? '-' : '+'}${fr(Math.abs(a), 2)}\theta^2$, so $A=${a + c}$, $B=${b}$, $C=${fr(-a, 2)}$.` };
        },
        () => {
          const d = pick([2, 3, 4, 5, 6]), f = pick(['sin', 'cos', 'tan']), x = d * Math.PI / 180;
          const approx = f === 'cos' ? 1 - x * x / 2 : x, exact = Math[f](x);
          return { q: T`Use a small angle approximation to estimate $${'\\' + f} ${d}^\circ$ (give 5 d.p.).`, fields: [{ label: 'estimate', ans: approx, tol: { abs: 5e-6 } }], sol: T`Convert to radians: $${d}^\circ=\frac{${d}\pi}{180}=${x.toFixed(6)}$. ${f === 'cos' ? T`$\cos x\approx1-\frac{x^2}2=${approx.toFixed(5)}$` : T`$${'\\' + f} x\approx x=${approx.toFixed(5)}$`}. (Calculator: $${exact.toFixed(6)}$.)` };
        },
      ],
    },
    {
      id: 'cx5', title: "Sums of series using De Moivre's theorem", sims: ['demoivre'],
      notes: T`<p>To sum $C=\sum a_k\cos k\theta$ and $S=\sum a_k\sin k\theta$, form $C+iS=\sum a_kz^k$ with $z=e^{i\theta}=\cos\theta+i\sin\theta$ (De Moivre: $z^k=\cos k\theta+i\sin k\theta$). Sum that complex series, then take real and imaginary parts.</p>
<ul><li><b>Binomial type</b>: $\sum_{k=0}^n\binom nk z^k=(1+z)^n$.</li>
<li><b>Geometric type</b>: $\sum_{k=0}^{n-1}r^kz^k=\dfrac{1-r^nz^n}{1-rz}$; infinite ($|r|\lt1$): $\dfrac1{1-rz}$.</li>
<li><b>Half-angle factor</b>: $1+e^{i\theta}=e^{i\theta/2}\cdot2\cos\frac\theta2$ and $1-e^{i\theta}=-2i\sin\frac\theta2\,e^{i\theta/2}$.</li>
<li><b>Realise a denominator</b> by multiplying by the conjugate: $\dfrac1{1-re^{i\theta}}=\dfrac{1-re^{-i\theta}}{1-2r\cos\theta+r^2}$.</li></ul>
$$\sum_{k=0}^n\binom nk\cos k\theta=2^n\cos^n\tfrac\theta2\cos\tfrac{n\theta}2,\qquad\sum_{k=0}^\infty r^k\cos k\theta=\frac{1-r\cos\theta}{1-2r\cos\theta+r^2}$$`,
      drills: [
        () => {
          const n = ri(3, 8), [p, qd, tx] = pick(ANG), th = p * Math.PI / qd, part = pick(['cos', 'sin']), v = binomSumN(n, th, part);
          return { q: T`Evaluate $\displaystyle\sum_{k=0}^{${n}}\binom{${n}}{k}${'\\' + part}\left(k\cdot${tx}\right)$ exactly (or to 4 s.f.).`, fields: [{ label: 'value', ans: v }], sol: T`$C+iS=(1+e^{i\theta})^{${n}}=\left(2\cos\tfrac\theta2\right)^{${n}}e^{i${n}\theta/2}$, so the ${part === 'cos' ? 'real' : 'imaginary'} part is $2^{${n}}\cos^{${n}}\tfrac\theta2\,${'\\' + part}\tfrac{${n}\theta}2$. With $\theta=${tx}$: $${num(v)}$.` };
        },
        () => {
          const m = pick([2, 3, 4]), [p, qd, tx] = pick(ANG), th = p * Math.PI / qd, r = 1 / m, part = pick(['cos', 'sin']);
          const den = 1 - 2 * r * Math.cos(th) + r * r, v = part === 'cos' ? (1 - r * Math.cos(th)) / den : r * Math.sin(th) / den;
          return { q: T`Find the sum to infinity of $\displaystyle\sum_{k=0}^{\infty}\frac{${'\\' + part} k\theta}{${m}^k}$ when $\theta=${tx}$.`, fields: [{ label: 'value', ans: v }], sol: T`$C+iS=\sum\left(\tfrac{e^{i\theta}}{${m}}\right)^k=\dfrac{1}{1-\frac{1}{${m}}e^{i\theta}}=\dfrac{${m}}{${m}-e^{i\theta}}$. Multiply by $\frac{${m}-e^{-i\theta}}{${m}-e^{-i\theta}}$: denominator $${m * m + 1}-${2 * m}\cos\theta$, numerator $${m * m}-${m}e^{-i\theta}$.<br>So $C=\dfrac{${m * m}-${m}\cos\theta}{${m * m + 1}-${2 * m}\cos\theta}$, $S=\dfrac{${m}\sin\theta}{${m * m + 1}-${2 * m}\cos\theta}$. At $\theta=${tx}$: $${num(v)}$.` };
        },
        () => {
          const n = ri(3, 9), [p, qd, tx] = pick(ANG), th = p * Math.PI / qd; let v = 0; for (let k = 1; k <= n; k++) v += Math.cos(k * th);
          return { q: T`Using $\sum_{k=1}^{n}\cos k\theta=\dfrac{\sin\frac{n\theta}2\cos\frac{(n+1)\theta}2}{\sin\frac\theta2}$, evaluate $\displaystyle\sum_{k=1}^{${n}}\cos\left(k\cdot${tx}\right)$.`, fields: [{ label: 'value', ans: v }], sol: T`$n=${n}$, $\theta=${tx}$: $\dfrac{\sin\frac{${n}\theta}{2}\cos\frac{${n + 1}\theta}{2}}{\sin\frac\theta2}=${num(v)}$. (Check by adding the ${n} terms on a calculator.)` };
        },
        () => {
          const n = ri(2, 6), opts = shuffle([`(1+z)^{${n}}`, `(1-z)^{${n}}`, `\\dfrac{1-z^{${n + 1}}}{1-z}`, `(z+z^{-1})^{${n}}`]);
          const terms = Array.from({ length: n + 1 }, (_, k) => `${nCr(n, k) === 1 ? '' : nCr(n, k)}${k ? `\\cos ${k === 1 ? '' : k}\\theta` : ''}`).map((t, k) => (k === 0 ? '1' : t)).join('+');
          return { q: T`$C=${terms}$. With $z=e^{i\theta}$, which complex expression has real part $C$ (and imaginary part the matching sine series)?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(`(1+z)^{${n}}`) }, sol: T`The coefficients are $\binom{${n}}{k}$, so $C+iS=\sum\binom{${n}}{k}z^k=(1+z)^{${n}}$ by the binomial theorem.` };
        },
      ],
    },
    {
      id: 'hy5', title: 'Integrals of (x² + a²)^−½ and (x² − a²)^−½; hyperbolic substitutions', sims: [],
      notes: T`<table class="tbl"><tr><th>Integrand</th><th>Integral (formula booklet)</th></tr>
<tr><td>$\dfrac1{\sqrt{x^2+a^2}}$</td><td>$\operatorname{arsinh}\dfrac xa=\ln\left(x+\sqrt{x^2+a^2}\right)+c$</td></tr>
<tr><td>$\dfrac1{\sqrt{x^2-a^2}}$</td><td>$\operatorname{arcosh}\dfrac xa=\ln\left(x+\sqrt{x^2-a^2}\right)+c\quad(x\gt a)$</td></tr></table>
<ul><li>Derive them with $x=a\sinh u$ (since $1+\sinh^2u=\cosh^2u$) and $x=a\cosh u$ (since $\cosh^2u-1=\sinh^2u$).</li>
<li><b>Complete the square</b> first: $x^2+4x+13=(x+2)^2+9$.</li>
<li>Coefficient on $x^2$: $\displaystyle\int\frac{dx}{\sqrt{b^2x^2+a^2}}=\frac1b\operatorname{arsinh}\frac{bx}a$.</li>
<li>"Associated functions" such as $\sqrt{x^2+a^2}$: use $x=a\sinh u$ and $\cosh^2u=\frac12(\cosh2u+1)$.</li></ul>`,
      drills: [
        () => {
          const [p, q, h] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17]]), up = pick([true, false]);
          if (up) return { q: T`Evaluate $\displaystyle\int_0^{${p}}\frac{dx}{\sqrt{x^2+${q * q}}}$ as an exact logarithm.`, fields: [{ label: 'value', ans: Math.log((p + h) / q) }], sol: T`$\left[\ln\left(x+\sqrt{x^2+${q * q}}\right)\right]_0^{${p}}=\ln(${p}+${h})-\ln${q}=${lnTeX(p + h, q)}$.` };
          return { q: T`Evaluate $\displaystyle\int_{${q}}^{${h}}\frac{dx}{\sqrt{x^2-${q * q}}}$ as an exact logarithm.`, fields: [{ label: 'value', ans: Math.log((h + p) / q) }], sol: T`$\left[\operatorname{arcosh}\tfrac x{${q}}\right]_{${q}}^{${h}}=\ln\left(\tfrac{${h}}{${q}}+\sqrt{\tfrac{${h * h}}{${q * q}}-1}\right)-0=${lnTeX(h + p, q)}$.` };
        },
        () => {
          const p = rnz(-4, 4), q = ri(1, 5), [s, L] = pick([[[3, 4], 2], [[4, 3], 3], [[12, 5], 5], [[15, 8], 4]]), up = q * s[0] / s[1] - p;
          return { q: T`Evaluate $\displaystyle\int_{${-p}}^{${nice(up)}}\frac{dx}{\sqrt{${poly([[1, 'x^2'], [2 * p, 'x'], [p * p + q * q, '']])}}}$, giving an exact answer.`, fields: [{ label: 'value', ans: Math.log(L) }], sol: T`Complete the square: $(x${sgn(p)})^2+${q * q}$. So $\left[\operatorname{arsinh}\tfrac{x${sgn(p)}}{${q}}\right]_{${-p}}^{${nice(up)}}=\operatorname{arsinh}${fr(s[0], s[1])}-0$.<br>$=\ln\left(${fr(s[0], s[1])}+\sqrt{${fr(s[0] * s[0], s[1] * s[1])}+1}\right)=\ln ${L}$.` };
        },
        () => {
          const a = ri(2, 6), b = ri(2, 4), x = ri(1, 4), v = b / Math.sqrt(b * b * x * x + a * a);
          return { q: T`Differentiate $\operatorname{arsinh}\dfrac{${b}x}{${a}}$ and evaluate at $x=${x}$.`, fields: [{ label: 'value', ans: v }], sol: T`$\dfrac{d}{dx}\operatorname{arsinh}u=\dfrac{u'}{\sqrt{1+u^2}}=\dfrac{${b}/${a}}{\sqrt{1+${b * b}x^2/${a * a}}}=\dfrac{${b}}{\sqrt{${b * b}x^2+${a * a}}}$. At $x=${x}$: $\dfrac{${b}}{\sqrt{${b * b * x * x + a * a}}}\approx${num(v)}$.` };
        },
        () => {
          const a = ri(1, 4), [s, c, L] = pick([[3 / 4, 5 / 4, 2], [4 / 3, 5 / 3, 3], [12 / 5, 13 / 5, 5]]), v = a * a / 2 * (Math.log(L) + s * c);
          return { q: T`Use the substitution $x=${a === 1 ? '' : a}\sinh u$ to evaluate $\displaystyle\int_0^{${nice(a * s)}}\sqrt{x^2+${a * a}}\,dx$ (exact or 4 s.f.).`, fields: [{ label: 'value', ans: v }], sol: T`$dx=${a === 1 ? '' : a}\cosh u\,du$, $\sqrt{x^2+${a * a}}=${a === 1 ? '' : a}\cosh u$: integral $=${a === 1 ? '' : a * a}\int\cosh^2u\,du=\tfrac{${a * a}}2\left[u+\sinh u\cosh u\right]$.<br>Limits: $u=0$ to $u=\operatorname{arsinh}${nice(s)}=\ln ${L}$, where $\sinh u=${nice(s)}$, $\cosh u=${nice(c)}$.<br>Value $=\tfrac{${a * a}}{2}\left(\ln ${L}+${nice(s * c)}\right)\approx${num(v)}$.` };
        },
      ],
    },
  ],
});
