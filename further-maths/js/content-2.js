// A2 1 Further Pure content, part 2: Hyperbolics, Further Calculus, Series, Polar, Differential Equations, Induction.
'use strict';

const TRIPLES = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [7, 24, 25], [20, 21, 29]];
const lnTeX = (n, d = 1) => d === 1 ? `\\ln ${n}` : `\\ln\\left(${fr(n, d)}\\right)`;

/* ======================= 4. HYPERBOLIC FUNCTIONS ======================= */
topic({
  id: 'hy', code: '4', title: 'Hyperbolic Functions', icon: 'cosh', color: '#f06fb0',
  blurb: 'Definitions, identities (Osborn), inverse forms as logs, equations, calculus.',
  points: [
    {
      id: 'hy1', code: '4.1', title: 'Definitions, graphs & identities',
      sims: ['hyperbola'],
      notes: T`
$$\sinh x=\frac{e^x-e^{-x}}2,\quad\cosh x=\frac{e^x+e^{-x}}2,\quad\tanh x=\frac{\sinh x}{\cosh x}=\frac{e^{2x}-1}{e^{2x}+1}$$
<ul>
<li>$\cosh$ is even, range $[1,\infty)$. $\sinh$ is odd, range $\mathbb R$. $\tanh$ is odd, range $(-1,1)$ with asymptotes $y=\pm1$.</li>
<li>$(\cosh t,\sinh t)$ traces the hyperbola $x^2-y^2=1$ (as $(\cos t,\sin t)$ traces the circle) — see the sim.</li>
<li>$\cosh^2x-\sinh^2x=1$, $\;\sinh2x=2\sinh x\cosh x$, $\;\cosh2x=\cosh^2x+\sinh^2x=1+2\sinh^2x=2\cosh^2x-1$.</li>
<li><b>Osborn's rule</b>: turn a trig identity into a hyperbolic one by swapping functions, then <b>flip the sign of any product of two sines</b> (including hidden ones: $\tan^2$, $\sin^2$).</li>
<li>$\cosh x+\sinh x=e^x$, $\;\cosh x-\sinh x=e^{-x}$.</li>
</ul>
<div class="tip"><b>Proving identities:</b> the exam usually says "using definitions in terms of exponentials" — then Osborn is not allowed as the proof.</div>`,
      drills: [
        () => {
          const [a, b, c] = pick(TRIPLES), given = pick(['cosh', 'sinh', 'tanh']);
          const vals = { cosh: [c, a], sinh: [b, a], tanh: [b, c] };
          const others = ['cosh', 'sinh', 'tanh'].filter(f => f !== given);
          return {
            q: T`Given $${'\\' + given} x=${fr(...vals[given])}$ and $x>0$, find $${'\\' + others[0]} x$, $${'\\' + others[1]} x$ and $x$ (exact log form accepted).`,
            fields: [{ label: others[0] + ' x', ans: vals[others[0]][0] / vals[others[0]][1] }, { label: others[1] + ' x', ans: vals[others[1]][0] / vals[others[1]][1] }, { label: 'x', ans: Math.log((c + b) / a) }],
            sol: T`Use $\cosh^2x-\sinh^2x=1$: $\cosh x=${fr(c, a)}$, $\sinh x=${fr(b, a)}$ (positive since $x>0$), $\tanh x=${fr(b, c)}$.<br>
$e^x=\cosh x+\sinh x=${fr(c + b, a)}$, so $x=${lnTeX(c + b, a)}\approx${num(Math.log((c + b) / a))}$.`,
          };
        },
        () => {
          const a = ri(2, 9), f = pick(['cosh', 'sinh', 'tanh']);
          const v = { cosh: [a * a + 1, 2 * a], sinh: [a * a - 1, 2 * a], tanh: [a * a - 1, a * a + 1] }[f];
          return {
            q: T`Find the exact value of $${'\\' + f}(\ln ${a})$.`,
            fields: [{ label: 'value', ans: v[0] / v[1] }],
            sol: f === 'tanh' ? T`$\tanh(\ln a)=\dfrac{a^2-1}{a^2+1}=\dfrac{${a * a - 1}}{${a * a + 1}}=${fr(...v)}$.`
              : T`$${'\\' + f}(\ln ${a})=\dfrac{e^{\ln ${a}}${f === 'cosh' ? '+' : '-'}e^{-\ln ${a}}}{2}=\dfrac{${a}${f === 'cosh' ? '+' : '-'}\frac1{${a}}}{2}=${fr(...v)}$.`,
          };
        },
        () => {
          const ID = [
            [T`\cos^2x+\sin^2x=1`, T`\cosh^2x-\sinh^2x=1`, [T`\cosh^2x+\sinh^2x=1`, T`\sinh^2x-\cosh^2x=1`]],
            [T`\cos2x=1-2\sin^2x`, T`\cosh2x=1+2\sinh^2x`, [T`\cosh2x=1-2\sinh^2x`, T`\cosh2x=2\sinh^2x-1`]],
            [T`\cos2x=2\cos^2x-1`, T`\cosh2x=2\cosh^2x-1`, [T`\cosh2x=1-2\cosh^2x`, T`\cosh2x=2\cosh^2x+1`]],
            [T`\sin2x=2\sin x\cos x`, T`\sinh2x=2\sinh x\cosh x`, [T`\sinh2x=-2\sinh x\cosh x`, T`\sinh2x=\sinh x\cosh x`]],
            [T`1+\tan^2x=\sec^2x`, T`1-\tanh^2x=\operatorname{sech}^2x`, [T`1+\tanh^2x=\operatorname{sech}^2x`, T`\tanh^2x-1=\operatorname{sech}^2x`]],
            [T`1+\cot^2x=\operatorname{cosec}^2x`, T`\coth^2x-1=\operatorname{cosech}^2x`, [T`1+\coth^2x=\operatorname{cosech}^2x`, T`1-\coth^2x=\operatorname{cosech}^2x`]],
            [T`\tan2x=\dfrac{2\tan x}{1-\tan^2x}`, T`\tanh2x=\dfrac{2\tanh x}{1+\tanh^2x}`, [T`\tanh2x=\dfrac{2\tanh x}{1-\tanh^2x}`, T`\tanh2x=\dfrac{-2\tanh x}{1+\tanh^2x}`]],
            [T`\cos(A+B)=\cos A\cos B-\sin A\sin B`, T`\cosh(A+B)=\cosh A\cosh B+\sinh A\sinh B`, [T`\cosh(A+B)=\cosh A\cosh B-\sinh A\sinh B`, T`\cosh(A+B)=\sinh A\cosh B+\cosh A\sinh B`]],
          ];
          const [trig, right, wrong] = pick(ID), opts = shuffle([right, ...wrong]);
          return {
            q: T`Using Osborn's rule, which is the hyperbolic analogue of $${trig}$?`,
            mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(right) },
            sol: T`Swap to hyperbolic functions and change the sign of every product of two sinh's (including $\tanh^2=\sinh^2/\cosh^2$): $${right}$.`,
          };
        },
      ],
    },
    {
      id: 'hy2', code: '4.2', title: 'Inverse hyperbolic functions as logarithms',
      sims: ['hyperbola'],
      notes: T`
$$\operatorname{arsinh}x=\ln\!\left(x+\sqrt{x^2+1}\right),\qquad \operatorname{arcosh}x=\ln\!\left(x+\sqrt{x^2-1}\right)\ (x\ge1),\qquad \operatorname{artanh}x=\tfrac12\ln\frac{1+x}{1-x}\ (|x|\lt1)$$
<p><b>Derivation (learn it):</b> let $y=\operatorname{arsinh}x$, so $x=\sinh y=\tfrac12(e^y-e^{-y})$. Multiply by $2e^y$: $e^{2y}-2xe^y-1=0$, a quadratic in $e^y$: $e^y=x\pm\sqrt{x^2+1}$. Reject the minus root ($e^y\gt0$).</p>
<ul><li>$\operatorname{arcosh}$ takes the <b>positive</b> branch only; the full solution of $\cosh y=x$ is $y=\pm\ln(x+\sqrt{x^2-1})$.</li></ul>`,
      drills: [
        () => {
          const [a, b, c] = pick(TRIPLES), f = pick(['arsinh', 'arcosh', 'artanh']);
          let q, v, s;
          if (f === 'arsinh') { q = fr(b, a); v = Math.log((b + c) / a); s = T`\ln\left(${fr(b, a)}+\sqrt{${fr(b * b, a * a)}+1}\right)=\ln\left(${fr(b, a)}+${fr(c, a)}\right)=${lnTeX(b + c, a)}`; }
          else if (f === 'arcosh') { q = fr(c, a); v = Math.log((c + b) / a); s = T`\ln\left(${fr(c, a)}+\sqrt{${fr(c * c, a * a)}-1}\right)=\ln\left(${fr(c, a)}+${fr(b, a)}\right)=${lnTeX(c + b, a)}`; }
          else { const p = ri(1, 4), d = p + ri(1, 5); q = fr(p, d); v = 0.5 * Math.log((d + p) / (d - p)); s = T`\tfrac12\ln\dfrac{1+${fr(p, d)}}{1-${fr(p, d)}}=\tfrac12${lnTeX(d + p, d - p)}`; }
          return {
            q: T`Express $\operatorname{${f}}\left(${q}\right)$ exactly as a logarithm.`,
            fields: [{ label: 'value (e.g. ln(3/2))', ans: v }],
            sol: T`$\operatorname{${f}}\left(${q}\right)=${s}\approx${num(v)}$.`,
          };
        },
        () => {
          const [a, b, c] = pick(TRIPLES), k = ri(2, 4);
          return {
            q: T`Solve $\cosh(${k}x)=${fr(c, a)}$, giving both solutions.`,
            fields: [{ label: 'x values', set: [Math.log((c + b) / a) / k, -Math.log((c + b) / a) / k] }],
            sol: T`$${k}x=\pm\operatorname{arcosh}${fr(c, a)}=\pm\ln\left(${fr(c, a)}+\sqrt{${fr(c * c, a * a)}-1}\right)=\pm${lnTeX(c + b, a)}$.<br>$x=\pm\tfrac1{${k}}${lnTeX(c + b, a)}\approx\pm${num(Math.log((c + b) / a) / k)}$.`,
          };
        },
      ],
    },
    {
      id: 'hy3', code: '4.3', title: 'Solving hyperbolic equations',
      sims: ['hyperbola'],
      notes: T`
<h4>Type 1: $a\cosh x+b\sinh x=c$</h4>
<p>Replace with exponentials, multiply by $2e^x$ → quadratic in $e^x$. Reject $e^x\le0$.</p>
<h4>Type 2: mixed double-angle, e.g. $A\cosh2x-B\cosh x+D=0$</h4>
<p>Use $\cosh2x=2\cosh^2x-1$ → quadratic in $\cosh x$. Reject $\cosh x\lt1$. Each valid $\cosh x=k$ gives <b>two</b> solutions $x=\pm\ln(k+\sqrt{k^2-1})$.</p>
<h4>Type 3: $\sinh$ quadratic</h4><p>Use $\cosh^2x=1+\sinh^2x$; every real $\sinh x=k$ gives exactly one $x=\ln(k+\sqrt{k^2+1})$.</p>
<div class="tip"><b>Marks lost:</b> not justifying rejected roots. Write "$\cosh x\ge1$ so reject" explicitly.</div>`,
      drills: [
        () => {
          let u1 = ri(1, 5), u2; do u2 = ri(1, 6); while (u2 === u1);
          const a = 1 + u1 * u2, b = 1 - u1 * u2, c = u1 + u2;
          return {
            q: T`Solve $${poly([[a, '\\cosh x'], [b, '\\sinh x']])}=${c}$, giving answers as exact logarithms.`,
            fields: [{ label: 'x values', set: [Math.log(u1), Math.log(u2)] }],
            sol: T`$\tfrac{${a}}{2}(e^x+e^{-x})+\tfrac{${b}}{2}(e^x-e^{-x})=${c}\Rightarrow e^x+${u1 * u2}e^{-x}=${c}$.<br>
Multiply by $e^x$: $e^{2x}-${c}e^x+${u1 * u2}=0\Rightarrow(e^x-${u1})(e^x-${u2})=0$.<br>$x=\ln${u1},\ \ln${u2}$${u1 === 1 || u2 === 1 ? ' (note $\\ln1=0$)' : ''}.`,
          };
        },
        () => {
          const [a, b, c] = pick(TRIPLES.filter(t => t[2] / t[0] < 4)), [n2, d2] = pick([[1, 2], [1, 3], [2, 3], [3, 4], [-1, 2], [1, 4], [-1, 3]]);
          const n1 = c, d1 = a; let A = d1 * d2, B = 2 * (d1 * n2 + d2 * n1), D = d1 * d2 + 2 * n1 * n2;
          const g = gcd(gcd(A, B), D); A /= g; B /= g; D /= g;
          const x = Math.log((c + b) / a);
          return {
            q: T`Solve $${poly([[A, '\\cosh 2x'], [-B, '\\cosh x'], [D, '']])}=0$.`,
            fields: [{ label: 'x values', set: [x, -x] }],
            sol: T`$\cosh2x=2\cosh^2x-1$: $\;${poly([[2 * A, '\\cosh^2x'], [-B, '\\cosh x'], [D - A, '']])}=0$<br>
$\Rightarrow\cosh x=${fr(n1, d1)}$ or $\cosh x=${fr(n2, d2)}$ (reject: $\cosh x\ge1$).<br>
$x=\pm\ln\left(${fr(c, a)}+${fr(b, a)}\right)=\pm${lnTeX(c + b, a)}$.`,
          };
        },
      ],
    },
    {
      id: 'hy4', code: '4.4', title: 'Calculus of hyperbolic functions',
      sims: ['hyperbola'],
      notes: T`
<table class="tbl"><tr><th>$f(x)$</th><th>$f'(x)$</th><th>$f(x)$</th><th>$f'(x)$</th></tr>
<tr><td>$\sinh x$</td><td>$\cosh x$</td><td>$\operatorname{arsinh}x$</td><td>$\dfrac1{\sqrt{x^2+1}}$</td></tr>
<tr><td>$\cosh x$</td><td>$\sinh x$</td><td>$\operatorname{arcosh}x$</td><td>$\dfrac1{\sqrt{x^2-1}}$</td></tr>
<tr><td>$\tanh x$</td><td>$\operatorname{sech}^2x$</td><td>$\operatorname{artanh}x$</td><td>$\dfrac1{1-x^2}$</td></tr></table>
<ul><li>No sign change on differentiating $\cosh$ (unlike $\cos$).</li>
<li>Derive the inverse derivatives: $y=\operatorname{arsinh}x\Rightarrow\sinh y=x\Rightarrow\cosh y\,y'=1\Rightarrow y'=\frac1{\cosh y}=\frac1{\sqrt{1+x^2}}$.</li>
<li>Integrals: $\int\sinh=\cosh$, $\int\cosh=\sinh$, $\int\tanh=\ln\cosh$. For $\int\cosh^2x$, use $\cosh^2x=\tfrac12(\cosh2x+1)$.</li></ul>`,
      drills: [
        () => {
          const a = ri(2, 5), f = pick(['arsinh', 'arcosh', 'artanh']); let x0 = pick([1, 2, 1 / 2, 3 / 2]);
          let v, s;
          if (f === 'arsinh') { v = a / Math.sqrt(a * a * x0 * x0 + 1); s = T`\dfrac{${a}}{\sqrt{(${a}x)^2+1}}`; }
          else if (f === 'arcosh') { x0 = pick([1, 2, 3 / 2]); v = a / Math.sqrt(a * a * x0 * x0 - 1); s = T`\dfrac{${a}}{\sqrt{(${a}x)^2-1}}`; }
          else { const X = pick([1 / (2 * a), 1 / (3 * a), 1 / (4 * a)]); v = a / (1 - a * a * X * X); return { q: T`Find the gradient of $y=\operatorname{artanh}(${a}x)$ at $x=${nice(X)}$.`, fields: [{ label: "y'", ans: v }], sol: T`$y'=\dfrac{${a}}{1-(${a}x)^2}=\dfrac{${a}}{1-${nice(a * a * X * X)}}=${nice(v)}$.` }; }
          return { q: T`Find the gradient of $y=\operatorname{${f}}(${a}x)$ at $x=${nice(x0)}$.`, fields: [{ label: "y'", ans: v }], sol: T`Chain rule: $y'=${s}$. At $x=${nice(x0)}$: $${num(v)}$.` };
        },
        () => {
          const k = ri(2, 5), a = ri(2, 4);
          const v = (Math.sinh(2 * Math.log(a)) / 2 + Math.log(a)) / 2;
          return {
            q: T`Find $\displaystyle\int_0^{\ln ${a}}\cosh^2x\,dx$ exactly.`,
            fields: [{ label: 'value', ans: v }],
            sol: T`$\cosh^2x=\tfrac12(\cosh2x+1)\Rightarrow\int=\left[\tfrac14\sinh2x+\tfrac x2\right]_0^{\ln${a}}$.<br>
$\sinh(2\ln${a})=\tfrac12(${a * a}-\tfrac1{${a * a}})=${fr(a ** 4 - 1, 2 * a * a)}$, so value $=${fr(a ** 4 - 1, 8 * a * a)}+\tfrac12\ln${a}\approx${num(v)}$.`,
          };
        },
      ],
    },
  ],
});

/* ======================= 5. FURTHER CALCULUS ======================= */
const simpson = (f, a, b, n = 2000) => { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; };
topic({
  id: 'ca', code: '5', title: 'Further Calculus', icon: '∫', color: '#ffd166',
  blurb: 'Inverse trig/hyperbolic derivatives & integrals, reduction formulae, arc length, surface area, improper integrals.',
  points: [
    {
      id: 'ca1', code: '5.1', title: 'Differentiating inverse trig & hyperbolic functions',
      sims: ['maclaurin'],
      notes: T`
$$\frac{d}{dx}\arcsin\frac xa=\frac1{\sqrt{a^2-x^2}},\quad\frac{d}{dx}\arccos\frac xa=-\frac1{\sqrt{a^2-x^2}},\quad\frac{d}{dx}\arctan\frac xa=\frac a{a^2+x^2}$$
<ul><li>Method: $y=\arcsin x\Rightarrow\sin y=x\Rightarrow\cos y\,\frac{dy}{dx}=1\Rightarrow\frac{dy}{dx}=\frac1{\sqrt{1-x^2}}$ (positive root because $-\tfrac\pi2\le y\le\tfrac\pi2$).</li>
<li>Combine with product/chain/quotient rules — e.g. $\frac d{dx}(x\arctan x)=\arctan x+\frac{x}{1+x^2}$.</li></ul>`,
      drills: [
        () => {
          const t = ri(0, 5);
          if (t === 0) { const a = ri(2, 6), x = ri(1, a - 1); return { q: T`Differentiate $\arcsin\dfrac x{${a}}$ and evaluate at $x=${x}$.`, fields: [{ label: 'value', ans: 1 / Math.sqrt(a * a - x * x) }], sol: T`$\dfrac1{\sqrt{${a * a}-x^2}}$ at $x=${x}$: $\dfrac1{\sqrt{${a * a - x * x}}}=\dfrac1{${surd(a * a - x * x)}}\approx${num(1 / Math.sqrt(a * a - x * x))}$.` }; }
          if (t === 1) { const b = ri(2, 5), x = pick([1, 2, 1 / 2]); const v = b / (1 + b * b * x * x); return { q: T`Find $\dfrac{dy}{dx}$ at $x=${nice(x)}$ for $y=\arctan(${b}x)$.`, fields: [{ label: 'value', ans: v }], sol: T`$y'=\dfrac{${b}}{1+${b * b}x^2}=${nice(v)}$.` }; }
          if (t === 2) { const k = ri(1, 4); const v = Math.atan(k) + k / (1 + k * k); return { q: T`Find the gradient of $y=x\arctan x$ at $x=${k}$.`, fields: [{ label: 'value', ans: v }], sol: T`Product rule: $y'=\arctan x+\dfrac{x}{1+x^2}$. At $x=${k}$: $\arctan${k}+${fr(k, 1 + k * k)}\approx${num(v)}$.` }; }
          if (t === 3) { const k = ri(2, 5); const v = k / (1 + k * k); return { q: T`Find $\dfrac{dy}{dx}$ at $x=\ln${k}$ for $y=\arctan(e^x)$.`, fields: [{ label: 'value', ans: v }], sol: T`$y'=\dfrac{e^x}{1+e^{2x}}$. At $x=\ln${k}$: $\dfrac{${k}}{1+${k * k}}=${fr(k, 1 + k * k)}$.` }; }
          if (t === 4) { const a = ri(2, 6), x = ri(1, 6); const v = 1 / Math.sqrt(x * x + a * a); return { q: T`Differentiate $\operatorname{arsinh}\dfrac x{${a}}$ and evaluate at $x=${x}$.`, fields: [{ label: 'value', ans: v }], sol: T`$\dfrac{1/${a}}{\sqrt{1+x^2/${a * a}}}=\dfrac1{\sqrt{x^2+${a * a}}}$. At $x=${x}$: $\dfrac1{${surd(x * x + a * a)}}\approx${num(v)}$.` }; }
          const a = ri(2, 5), x = ri(1, a - 1); const v = -x / Math.sqrt(a * a - x * x) + Math.asin(x / a) * 0;
          return { q: T`Find $\dfrac{dy}{dx}$ at $x=${x}$ for $y=\sqrt{${a * a}-x^2}+x\arcsin\dfrac{x}{${a}}$.`, fields: [{ label: 'value', ans: Math.asin(x / a) }], sol: T`$y'=\dfrac{-x}{\sqrt{${a * a}-x^2}}+\arcsin\dfrac x{${a}}+\dfrac{x}{\sqrt{${a * a}-x^2}}=\arcsin\dfrac x{${a}}$. At $x=${x}$: $${num(Math.asin(x / a))}$. (The surd terms cancel.)` };
        },
      ],
    },
    {
      id: 'ca2', code: '5.2', title: 'Integration using inverse trig & hyperbolic forms',
      sims: ['arclength'],
      notes: T`
<table class="tbl"><tr><th>Integrand</th><th>Integral</th></tr>
<tr><td>$\dfrac1{a^2+x^2}$</td><td>$\dfrac1a\arctan\dfrac xa$</td></tr>
<tr><td>$\dfrac1{\sqrt{a^2-x^2}}$</td><td>$\arcsin\dfrac xa\quad(|x|\lt a)$</td></tr>
<tr><td>$\dfrac1{\sqrt{x^2+a^2}}$</td><td>$\operatorname{arsinh}\dfrac xa=\ln\left(x+\sqrt{x^2+a^2}\right)+c$</td></tr>
<tr><td>$\dfrac1{\sqrt{x^2-a^2}}$</td><td>$\operatorname{arcosh}\dfrac xa=\ln\left(x+\sqrt{x^2-a^2}\right)+c\quad(x\gt a)$</td></tr></table>
<ul><li><b>Complete the square</b> first: $x^2+6x+13=(x+3)^2+4$.</li>
<li><b>Split the numerator</b>: $\dfrac{px+q}{x^2+a^2}=\dfrac{p}2\cdot\dfrac{2x}{x^2+a^2}+\dfrac{q}{x^2+a^2}$ → a log plus an arctan.</li>
<li>With a coefficient: $\displaystyle\int\frac{dx}{\sqrt{a^2-b^2x^2}}=\frac1b\arcsin\frac{bx}a$.</li></ul>`,
      drills: [
        () => {
          const a = ri(1, 6), [k, lab, ang] = pick([[1, `${a}`, 4], [Math.sqrt(3), `${a}\\sqrt3`, 3], [1 / Math.sqrt(3), `\\frac{${a}}{\\sqrt3}`, 6]]);
          return { q: T`Evaluate $\displaystyle\int_0^{${lab}}\frac{dx}{${a * a}+x^2}$ exactly.`, fields: [{ label: 'value', ans: Math.PI / (ang * a) }], sol: T`$\left[\tfrac1{${a}}\arctan\tfrac x{${a}}\right]_0^{${lab}}=\tfrac1{${a}}\cdot\tfrac\pi{${ang}}=${pf(1, ang * a)}$.` };
        },
        () => {
          const a = ri(1, 6), b = ri(1, 3), [s, ang] = pick([['\\frac12', 6], ['\\frac{\\sqrt2}2', 4], ['\\frac{\\sqrt3}2', 3]]);
          const up = a * { 6: 0.5, 4: Math.SQRT1_2, 3: Math.sqrt(3) / 2 }[ang] / b;
          const upTeX = { 6: fr(a, 2 * b), 4: `\\frac{${a === 1 ? '' : a}\\sqrt2}{${2 * b}}`, 3: `\\frac{${a === 1 ? '' : a}\\sqrt3}{${2 * b}}` }[ang];
          return { q: T`Evaluate $\displaystyle\int_0^{${upTeX}}\frac{dx}{\sqrt{${a * a}-${b * b === 1 ? '' : b * b}x^2}}$.`, fields: [{ label: 'value', ans: Math.asin(b * up / a) / b }], sol: T`$=\left[\tfrac1{${b}}\arcsin\tfrac{${b}x}{${a}}\right]_0^{${upTeX}}=\tfrac1{${b}}\arcsin${s}=${pf(1, ang * b)}$.` };
        },
        () => {
          const [p, q, h] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17]]), up = pick([true, false]);
          if (up) return { q: T`Evaluate $\displaystyle\int_0^{${p}}\frac{dx}{\sqrt{x^2+${q * q}}}$ as an exact logarithm.`, fields: [{ label: 'value', ans: Math.log((p + h) / q) }], sol: T`$\left[\ln\left(x+\sqrt{x^2+${q * q}}\right)\right]_0^{${p}}=\ln(${p}+${h})-\ln${q}=${lnTeX(p + h, q)}$.` };
          return { q: T`Evaluate $\displaystyle\int_{${q}}^{${h}}\frac{dx}{\sqrt{x^2-${q * q}}}$ as an exact logarithm.`, fields: [{ label: 'value', ans: Math.log((h + p) / q) }], sol: T`$\left[\operatorname{arcosh}\tfrac x{${q}}\right]_{${q}}^{${h}}=\ln\left(\tfrac{${h}}{${q}}+\sqrt{\tfrac{${h * h}}{${q * q}}-1}\right)-0=${lnTeX(h + p, q)}$.` };
        },
        () => {
          const p = rnz(-4, 4), q = ri(1, 5);
          return { q: T`Evaluate $\displaystyle\int_{${-p}}^{${q - p}}\frac{dx}{${poly([[1, 'x^2'], [2 * p, 'x'], [p * p + q * q, '']])}}$.`, fields: [{ label: 'value', ans: Math.PI / (4 * q) }], sol: T`Complete the square: $(x${sgn(p)})^2+${q * q}$. $\;\left[\tfrac1{${q}}\arctan\tfrac{x${sgn(p)}}{${q}}\right]_{${-p}}^{${q - p}}=\tfrac1{${q}}(\arctan1-0)=${pf(1, 4 * q)}$.` };
        },
        () => {
          const a = ri(1, 4), p = rnz(-4, 4), q = rnz(-4, 4), v = p / 2 * Math.log(2) + q * Math.PI / (4 * a);
          return { q: T`Evaluate $\displaystyle\int_0^{${a}}\frac{${poly([[p, 'x'], [q, '']])}}{x^2+${a * a}}\,dx$.`, fields: [{ label: 'value', ans: v }], sol: T`Split: $\tfrac{${p}}{2}\int\tfrac{2x}{x^2+${a * a}}+${par(q)}\int\tfrac1{x^2+${a * a}}$<br>$=\tfrac{${p}}{2}\left[\ln(x^2+${a * a})\right]_0^{${a}}+\tfrac{${q}}{${a}}\left[\arctan\tfrac x{${a}}\right]_0^{${a}}=${nice(p / 2)}\ln2${q * Math.PI > 0 ? '+' : '-'}${pf(Math.abs(q), 4 * a)}\approx${num(v)}$.` };
        },
      ],
    },
    {
      id: 'ca3', code: '5.3', title: 'Reduction formulae',
      sims: [],
      notes: T`
<p>A reduction formula links $I_n$ to $I_{n-1}$ or $I_{n-2}$. Almost always: <b>integration by parts</b>, choosing the part that lowers $n$ when differentiated.</p>
<ul>
<li>$I_n=\int_0^1x^ne^x\,dx$: $u=x^n$ → $I_n=e-nI_{n-1}$, $I_0=e-1$.</li>
<li>$I_n=\int_0^{\pi/2}\sin^nx\,dx$: split $\sin^{n-1}x\cdot\sin x$, parts, then $\cos^2=1-\sin^2$ → $I_n=\frac{n-1}{n}I_{n-2}$ (Wallis).</li>
<li>$I_n=\int_0^{\pi/4}\tan^nx\,dx$: write $\tan^n=\tan^{n-2}(\sec^2-1)$ → $I_n=\frac1{n-1}-I_{n-2}$ (no parts needed).</li>
<li>$I_n=\int_0^{\pi/2}x^n\cos x\,dx$: parts twice → $I_n=\left(\tfrac\pi2\right)^n-n(n-1)I_{n-2}$.</li>
<li>$I_n=\int_1^e(\ln x)^n\,dx$: $u=(\ln x)^n$, $dv=dx$ → $I_n=e-nI_{n-1}$.</li>
</ul>
<div class="tip"><b>Exam pattern:</b> (a) prove the formula (4–6 marks), (b) use it repeatedly for a specific $n$ — always compute $I_0$ or $I_1$ explicitly.</div>`,
      drills: [
        () => {
          const n = ri(2, 9); let c = new Q(1), s = [];
          for (let k = n; k >= 2; k -= 2) { c = c.mul(new Q(k - 1, k)); s.push(fr(k - 1, k)); }
          const even = n % 2 === 0, v = c.val() * (even ? Math.PI / 2 : 1);
          return { q: T`Using $I_n=\frac{n-1}{n}I_{n-2}$, evaluate $\displaystyle\int_0^{\pi/2}\sin^{${n}}x\,dx$ exactly.`, fields: [{ label: 'value', ans: v }], sol: T`$I_{${n}}=${s.join('\\cdot')}\cdot I_{${even ? 0 : 1}}$ with $I_{${even ? 0 : 1}}=${even ? '\\frac\\pi2' : '1'}$.<br>$=${even ? `${c.mul(new Q(1, 2)).tex()}\\pi` : c.tex()}\approx${num(v)}$.` };
        },
        () => {
          const n = ri(2, 6), ln = Math.random() < 0.5; let A = 1, B = -1; const rows = [T`I_0=e-1`];
          for (let k = 1; k <= n; k++) { A = 1 - k * A; B = -k * B; rows.push(T`I_{${k}}=e-${k}I_{${k - 1}}=${poly([[A, 'e'], [B, '']])}`); }
          return { q: T`${ln ? T`$I_n=\int_1^{e}(\ln x)^n\,dx$` : T`$I_n=\int_0^1x^ne^x\,dx$`} satisfies $I_n=e-nI_{n-1}$. Find $I_{${n}}$ in the form $Ae+B$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }], sol: T`$${rows.join('\\\\')}$`.replace(/^\$/, '$\\begin{aligned}').replace(/\$$/, '\\end{aligned}$').replace(/=e-/g, '&=e-').replace('I_0=e-1', 'I_0&=e-1') };
        },
        () => {
          const n = ri(2, 8); const I = [[new Q(0), new Q(1, 4), new Q(0)], [new Q(0), new Q(0), new Q(1, 2)]];
          for (let k = 2; k <= n; k++) { const p = I[k - 2]; I[k] = [new Q(1, k - 1).sub(p[0]), new Q(0).sub(p[1]), new Q(0).sub(p[2])]; }
          const [r, pi, l] = I[n], v = r.val() + pi.val() * Math.PI + l.val() * Math.LN2;
          const tex = [r.n ? r.tex() : '', pi.n ? `${pi.tex()}\\pi` : '', l.n ? `${l.tex()}\\ln2` : ''].filter(Boolean).join('+').replace(/\+-/g, '-');
          return { q: T`Given $I_n=\int_0^{\pi/4}\tan^nx\,dx$ satisfies $I_n=\frac1{n-1}-I_{n-2}$, find $I_{${n}}$.`, fields: [{ label: 'value', ans: v }], sol: T`$I_0=\tfrac\pi4$, $I_1=\tfrac12\ln2$. Apply repeatedly: $I_{${n}}=${tex}\approx${num(v)}$.` };
        },
        () => {
          const n = ri(2, 5), h = Math.PI / 2, I = [1, h - 1];
          for (let k = 2; k <= n; k++) I[k] = Math.pow(h, k) - k * (k - 1) * I[k - 2];
          return { q: T`$I_n=\int_0^{\pi/2}x^n\cos x\,dx$ satisfies $I_n=\left(\frac\pi2\right)^n-n(n-1)I_{n-2}$. Find $I_{${n}}$ (exact or 3 s.f.).`, fields: [{ label: 'value', ans: I[n] }], sol: T`$I_0=1$, $I_1=\tfrac\pi2-1$. ${I.slice(2).map((v, i) => T`$I_{${i + 2}}=${num(v)}$`).join(', ')}.` };
        },
      ],
    },
    {
      id: 'ca4', code: '5.4', title: 'Arc length & surface area of revolution',
      sims: ['arclength'],
      notes: T`
$$s=\int_a^b\sqrt{1+\left(\frac{dy}{dx}\right)^2}dx=\int_{t_1}^{t_2}\sqrt{\dot x^2+\dot y^2}\,dt$$
$$S_x=2\pi\int y\,ds=2\pi\int_a^b y\sqrt{1+y'^2}\,dx\qquad(\text{about the }x\text{-axis})$$
<ul><li>Designed questions make $1+y'^2$ a perfect square: e.g. $y=\cosh x$ gives $\sqrt{1+\sinh^2x}=\cosh x$.</li>
<li>Parametric: $x=a\cos^3t,\ y=a\sin^3t$ (astroid) has total length $6a$; cycloid $x=a(t-\sin t),\ y=a(1-\cos t)$ has arch length $8a$.</li>
<li>About the $y$-axis: $2\pi\int x\,ds$.</li></ul>`,
      drills: [
        () => {
          const k = ri(2, 6), a = ri(1, 3);
          return { q: T`Find the arc length of $y=${a === 1 ? '' : a}\cosh\left(\tfrac{x}{${a}}\right)$ from $x=0$ to $x=${a === 1 ? '' : a}\ln${k}$.`.replace('\\cosh\\left(\\tfrac{x}{1}\\right)', '\\cosh x'), fields: [{ label: 's', ans: a * (k * k - 1) / (2 * k) }], sol: T`$y'=\sinh(x/${a})$, $\sqrt{1+\sinh^2}=\cosh(x/${a})$. $s=\left[${a}\sinh(x/${a})\right]_0^{${a}\ln${k}}=${a}\cdot\dfrac{${k}-\frac1{${k}}}{2}=${fr(a * (k * k - 1), 2 * k)}$.` };
        },
        () => {
          const b = pick([3, 8, 15, 24]), r = Math.sqrt(1 + b), v = 2 / 3 * (r * r * r - 1);
          return { q: T`Find the length of $y=\tfrac23x^{3/2}$ from $x=0$ to $x=${b}$.`, fields: [{ label: 's', ans: v }], sol: T`$y'=x^{1/2}$, $s=\int_0^{${b}}\sqrt{1+x}\,dx=\left[\tfrac23(1+x)^{3/2}\right]_0^{${b}}=\tfrac23(${r ** 3}-1)=${nice(v)}$.` };
        },
        () => {
          const t = ri(0, 2), a = ri(1, 5);
          if (t === 0) return { q: T`Find the total length of the astroid $x=${a}\cos^3t,\ y=${a}\sin^3t$.`, fields: [{ label: 's', ans: 6 * a }], sol: T`$\dot x^2+\dot y^2=9a^2\cos^2t\sin^2t(\cos^2t+\sin^2t)$, so $ds=3a|\cos t\sin t|dt$. One quadrant: $\int_0^{\pi/2}3a\cos t\sin t\,dt=\tfrac{3a}2$. Total $=4\cdot\tfrac{3a}{2}=6a=${6 * a}$.` };
          if (t === 1) return { q: T`Find the length of one arch of the cycloid $x=${a}(t-\sin t),\ y=${a}(1-\cos t)$, $0\le t\le2\pi$.`, fields: [{ label: 's', ans: 8 * a }], sol: T`$\dot x^2+\dot y^2=a^2(2-2\cos t)=4a^2\sin^2\tfrac t2$, $ds=2a\sin\tfrac t2dt$. $s=\left[-4a\cos\tfrac t2\right]_0^{2\pi}=8a=${8 * a}$.` };
          const T0 = ri(1, 3), v = 2 / 3 * (Math.pow(1 + T0 * T0, 1.5) - 1);
          return { q: T`Find the arc length of $x=t^2,\ y=\tfrac23t^3$ for $0\le t\le${T0}$.`, fields: [{ label: 's', ans: v }], sol: T`$\dot x^2+\dot y^2=4t^2+4t^4$, $ds=2t\sqrt{1+t^2}dt$. $s=\left[\tfrac23(1+t^2)^{3/2}\right]_0^{${T0}}=\tfrac23\left(${1 + T0 * T0}^{3/2}-1\right)\approx${num(v)}$.` };
        },
        () => {
          const t = ri(0, 2);
          if (t === 0) { const a = pick([1, 1, 2]), b = pick([3, 8, 15].map(x => x * a)); const v = 8 * Math.PI * Math.sqrt(a) / 3 * (Math.pow(a + b, 1.5) - Math.pow(a, 1.5)); return { q: T`The arc of $y^2=${4 * a}x$ from $x=0$ to $x=${b}$ ($y\ge0$) is rotated $2\pi$ about the $x$-axis. Find the surface area.`, fields: [{ label: 'S', ans: v }], sol: T`$yy'=${2 * a}$, so $y\sqrt{1+y'^2}=\sqrt{y^2+(yy')^2}=\sqrt{${4 * a}x+${4 * a * a}}$.<br>$S=2\pi\int_0^{${b}}2\sqrt{${a}}\sqrt{x+${a}}\,dx=\tfrac{8\pi\sqrt{${a}}}{3}\left[(x+${a})^{3/2}\right]_0^{${b}}\approx${num(v)}$.` }; }
          if (t === 1) { const m = pick([[3, 4], [4, 3], [5, 12], [12, 5]]), h = ri(1, 4), mm = m[1] / m[0], v = Math.PI * mm * Math.sqrt(1 + mm * mm) * h * h; return { q: T`The line $y=${fr(m[1], m[0])}x$, $0\le x\le${h}$, is rotated about the $x$-axis. Find the curved surface area.`, fields: [{ label: 'S', ans: v }], sol: T`$ds=\sqrt{1+${fr(m[1] * m[1], m[0] * m[0])}}dx=${fr(Math.round(Math.hypot(...m)), m[0])}dx$. $S=2\pi\int_0^{${h}}${fr(m[1], m[0])}x\cdot${fr(Math.round(Math.hypot(...m)), m[0])}dx\approx${num(v)}$ (cone: $\pi rl$ ✓).` }; }
          const r = ri(2, 6), x1 = ri(-r, r - 1), x2 = ri(x1 + 1, r), v = 2 * Math.PI * r * (x2 - x1);
          return { q: T`The arc of $y=\sqrt{${r * r}-x^2}$ from $x=${x1}$ to $x=${x2}$ is rotated about the $x$-axis. Find the surface area.`, fields: [{ label: 'S', ans: v }], sol: T`$y\sqrt{1+y'^2}=\sqrt{y^2+(yy')^2}=\sqrt{(${r * r}-x^2)+x^2}=${r}$. $S=2\pi\int_{${x1}}^{${x2}}${r}\,dx=${2 * r * (x2 - x1)}\pi$.` };
        },
      ],
    },
    {
      id: 'ca5', code: '5.5', title: 'Improper integrals & volumes',
      sims: ['arclength'],
      notes: T`
<p>An integral is <b>improper</b> if a limit is infinite or the integrand is unbounded. Replace the problem limit with a variable and take a limit:</p>
$$\int_1^\infty x^{-p}\,dx=\lim_{t\to\infty}\left[\frac{x^{1-p}}{1-p}\right]_1^t=\frac1{p-1}\ (p\gt1),\quad\text{diverges for }p\le1$$
<ul><li>Key limits: $x^ke^{-x}\to0$ as $x\to\infty$; $x^k\ln x\to0$ as $x\to0^+$ ($k\gt0$). State them.</li>
<li>Volume of revolution: $V=\pi\int y^2\,dx$ (about $x$-axis), $\pi\int x^2\,dy$ (about $y$-axis).</li></ul>`,
      drills: [
        () => {
          const t = ri(0, 4), a = ri(2, 5);
          if (t === 0) { const p = ri(2, 5); return { q: T`Evaluate $\displaystyle\int_1^\infty\frac{dx}{x^{${p}}}$.`, fields: [{ label: 'value', ans: 1 / (p - 1) }], sol: T`$\lim_{t\to\infty}\left[-\tfrac{1}{${p - 1}x^{${p - 1}}}\right]_1^t=0+\tfrac1{${p - 1}}=${fr(1, p - 1)}$.` }; }
          if (t === 1) return { q: T`Evaluate $\displaystyle\int_0^\infty xe^{-${a}x}dx$.`, fields: [{ label: 'value', ans: 1 / (a * a) }], sol: T`Parts: $\left[-\tfrac{x}{${a}}e^{-${a}x}\right]_0^\infty+\tfrac1{${a}}\int_0^\infty e^{-${a}x}dx=0+\tfrac1{${a * a}}$ (using $xe^{-${a}x}\to0$).` };
          if (t === 2) return { q: T`Evaluate $\displaystyle\int_0^\infty\frac{dx}{x^2+${a * a}}$.`, fields: [{ label: 'value', ans: Math.PI / (2 * a) }], sol: T`$\lim_{t\to\infty}\tfrac1{${a}}\arctan\tfrac t{${a}}=\tfrac1{${a}}\cdot\tfrac\pi2=${pf(1, 2 * a)}$.` };
          if (t === 3) { const q = pick([[1, 2], [1, 3], [2, 3], [3, 4]]); return { q: T`Evaluate $\displaystyle\int_0^1x^{-${fr(...q)}}dx$.`, fields: [{ label: 'value', ans: q[1] / (q[1] - q[0]) }], sol: T`$\left[${fr(q[1], q[1] - q[0])}x^{${fr(q[1] - q[0], q[1])}}\right]_{0^+}^1=${fr(q[1], q[1] - q[0])}$ (the lower limit term $\to0$).` }; }
          return { q: T`Evaluate $\displaystyle\int_0^1x^{${a - 1}}\ln x\,dx$.`, fields: [{ label: 'value', ans: -1 / (a * a) }], sol: T`Parts: $\left[\tfrac{x^{${a}}}{${a}}\ln x\right]_{0^+}^1-\int_0^1\tfrac{x^{${a - 1}}}{${a}}dx=0-\tfrac1{${a * a}}$ (since $x^{${a}}\ln x\to0$).` };
        },
        () => {
          const k = ri(2, 4), v = Math.PI * simpson(x => Math.cosh(x) ** 2, 0, Math.log(k));
          return { q: T`The region under $y=\cosh x$ for $0\le x\le\ln${k}$ is rotated $2\pi$ about the $x$-axis. Find the volume.`, fields: [{ label: 'V', ans: v }], sol: T`$V=\pi\int_0^{\ln${k}}\cosh^2x\,dx=\pi\left[\tfrac14\sinh2x+\tfrac x2\right]_0^{\ln${k}}=\pi\left(${fr(k ** 4 - 1, 8 * k * k)}+\tfrac12\ln${k}\right)\approx${num(v)}$.` };
        },
      ],
    },
  ],
});

/* ======================= 6. SERIES ======================= */
topic({
  id: 'sr', code: '6', title: 'Maclaurin & Taylor Series', icon: 'Σ', color: '#9d7bff',
  blurb: 'Maclaurin expansions, composite series, limits via series, Taylor about x = a.',
  points: [
    {
      id: 'sr1', code: '6.1', title: 'Maclaurin series',
      sims: ['maclaurin'],
      notes: T`
$$f(x)=f(0)+f'(0)x+\frac{f''(0)}{2!}x^2+\dots+\frac{f^{(r)}(0)}{r!}x^r+\dots$$
<table class="tbl"><tr><th>Function</th><th>Series</th><th>Valid</th></tr>
<tr><td>$e^x$</td><td>$1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$</td><td>all $x$</td></tr>
<tr><td>$\sin x$</td><td>$x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$</td><td>all $x$</td></tr>
<tr><td>$\cos x$</td><td>$1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$</td><td>all $x$</td></tr>
<tr><td>$\ln(1+x)$</td><td>$x-\frac{x^2}2+\frac{x^3}3-\cdots$</td><td>$-1\lt x\le1$</td></tr>
<tr><td>$(1+x)^n$</td><td>$1+nx+\frac{n(n-1)}{2!}x^2+\cdots$</td><td>$|x|\lt1$</td></tr>
<tr><td>$\arctan x$</td><td>$x-\frac{x^3}3+\frac{x^5}5-\cdots$</td><td>$|x|\le1$</td></tr></table>
<ul><li><b>Composite</b>: substitute ($e^{2x}$, $\sin x^2$), multiply series (keep only needed powers), or differentiate/integrate term by term.</li>
<li>Only use repeated differentiation when told to, or for unfamiliar functions ($\tan x$, $\ln\cos x$).</li></ul>`,
      drills: [
        () => {
          const a = pick([2, 3, -2, -3]), F = pick([
            { f: T`e^{${a}x}`, ks: [2, 3, 4, 5], c: k => a ** k / fact(k), s: k => T`\frac{(${a})^{${k}}}{${k}!}` },
            { f: T`\cos(${a}x)`, ks: [2, 4, 6], c: k => (-1) ** (k / 2) * a ** k / fact(k), s: k => T`\frac{(-1)^{${k / 2}}(${a})^{${k}}}{${k}!}` },
            { f: T`\sin(${a}x)`, ks: [3, 5], c: k => (-1) ** ((k - 1) / 2) * a ** k / fact(k), s: k => T`\frac{(-1)^{${(k - 1) / 2}}(${a})^{${k}}}{${k}!}` },
            { f: T`\ln(1${a < 0 ? '' : '+'}${a}x)`, ks: [2, 3, 4], c: k => (-1) ** (k + 1) * a ** k / k, s: k => T`\frac{(-1)^{${k + 1}}(${a})^{${k}}}{${k}}` },
            { f: T`\sinh(${a}x)`, ks: [3, 5], c: k => a ** k / fact(k), s: k => T`\frac{(${a})^{${k}}}{${k}!}` },
            { f: T`\arctan(${a}x)`, ks: [3, 5], c: k => (-1) ** ((k - 1) / 2) * a ** k / k, s: k => T`\frac{(-1)^{${(k - 1) / 2}}(${a})^{${k}}}{${k}}` }]);
          const k = pick(F.ks), v = F.c(k);
          return { q: T`Find the coefficient of $x^{${k}}$ in the Maclaurin series of $${F.f}$.`, fields: [{ label: 'coefficient', ans: v }], sol: T`Substitute into the standard series: $${F.s(k)}=${nice(v)}$.` };
        },
        () => {
          const a = rnz(-3, 3), b = rnz(-3, 3), t = ri(0, 2);
          if (t === 0) return { q: T`Find the coefficient of $x^2$ in the expansion of $e^{${a}x}\ln(1${b < 0 ? '' : '+'}${b}x)$.`, fields: [{ label: 'coefficient', ans: a * b - b * b / 2 }], sol: T`$(1+${par(a)}x+\dots)(${b}x-\tfrac{${b * b}}{2}x^2+\dots)$. $x^2$: $${par(a)}\cdot${par(b)}-\tfrac{${b * b}}2=${nice(a * b - b * b / 2)}$.` };
          if (t === 1) return { q: T`Find the coefficient of $x^3$ in $e^{${a}x}\sin(${b}x)$.`, fields: [{ label: 'coefficient', ans: a * a * b / 2 - b ** 3 / 6 }], sol: T`$(1+${par(a)}x+\tfrac{${a * a}}2x^2+\dots)(${b}x-\tfrac{${par(b)}^3}{6}x^3+\dots)$.<br>$x^3$: $\tfrac{${a * a}}2\cdot${par(b)}-\tfrac{${b ** 3}}6=${nice(a * a * b / 2 - b ** 3 / 6)}$.` };
          return { q: T`Find the coefficient of $x^2$ in $e^{${a}x}\cos(${b}x)$.`, fields: [{ label: 'coefficient', ans: (a * a - b * b) / 2 }], sol: T`$(1+${par(a)}x+\tfrac{${a * a}}2x^2)(1-\tfrac{${b * b}}2x^2)$: $\;\tfrac{${a * a}}2-\tfrac{${b * b}}2=${nice((a * a - b * b) / 2)}$.` };
        },
        () => {
          const F = pick([
            { f: T`\tan x`, c: { 1: 1, 3: 1 / 3, 5: 2 / 15 }, s: T`x+\tfrac13x^3+\tfrac2{15}x^5+\cdots` },
            { f: T`\ln(\cos x)`, c: { 2: -1 / 2, 4: -1 / 12 }, s: T`-\tfrac12x^2-\tfrac1{12}x^4-\cdots` },
            { f: T`e^{\sin x}`, c: { 2: 1 / 2, 3: 0, 4: -1 / 8 }, s: T`1+x+\tfrac12x^2+0x^3-\tfrac18x^4+\cdots` },
            { f: T`\sec x`, c: { 2: 1 / 2, 4: 5 / 24 }, s: T`1+\tfrac12x^2+\tfrac5{24}x^4+\cdots` },
            { f: T`e^x\cos x`, c: { 2: 0, 3: -1 / 3, 4: -1 / 6 }, s: T`1+x+0x^2-\tfrac13x^3-\tfrac16x^4+\cdots` },
            { f: T`\sin^2x`, c: { 2: 1, 4: -1 / 3, 6: 2 / 45 }, s: T`x^2-\tfrac13x^4+\tfrac2{45}x^6-\cdots\ \text{ (use }\sin^2x=\tfrac12(1-\cos2x))` },
            { f: T`\arcsin x`, c: { 3: 1 / 6, 5: 3 / 40 }, s: T`x+\tfrac16x^3+\tfrac3{40}x^5+\cdots` },
            { f: T`\ln(1+e^x)`, c: { 1: 1 / 2, 2: 1 / 8, 4: -1 / 192 }, s: T`\ln2+\tfrac12x+\tfrac18x^2-\tfrac1{192}x^4+\cdots` }]);
          const k = +pick(Object.keys(F.c));
          return { q: T`Find the coefficient of $x^{${k}}$ in the Maclaurin series of $${F.f}$.`, fields: [{ label: 'coefficient', ans: F.c[k] }], sol: T`$${F.f}=${F.s}$, so the coefficient is $${nice(F.c[k])}$.` };
        },
      ],
    },
    {
      id: 'sr2', code: '6.2', title: 'Limits using series',
      sims: ['maclaurin'],
      notes: T`
<p>For $\lim_{x\to0}$ of a $\frac00$ form: expand numerator and denominator, cancel the lowest power of $x$, then let $x\to0$.</p>
$$\lim_{x\to0}\frac{x-\sin x}{x^3}=\lim_{x\to0}\frac{\frac{x^3}{6}-\frac{x^5}{120}+\cdots}{x^3}=\frac16$$
<div class="tip">Expand far enough that something survives after cancelling — usually one term beyond the power in the denominator.</div>`,
      drills: [
        () => {
          const a = ri(2, 5), L = pick([
            [T`\dfrac{e^{${a}x}-1-${a}x}{x^2}`, a * a / 2, T`e^{${a}x}=1+${a}x+\tfrac{${a * a}}{2}x^2+\cdots`],
            [T`\dfrac{1-\cos ${a}x}{x^2}`, a * a / 2, T`\cos${a}x=1-\tfrac{${a * a}}2x^2+\cdots`],
            [T`\dfrac{${a}x-\sin ${a}x}{x^3}`, a ** 3 / 6, T`\sin${a}x=${a}x-\tfrac{${a ** 3}}{6}x^3+\cdots`],
            [T`\dfrac{\ln(1+${a}x)-${a}x}{x^2}`, -a * a / 2, T`\ln(1+${a}x)=${a}x-\tfrac{${a * a}}2x^2+\cdots`],
            [T`\dfrac{\tan ${a}x-${a}x}{x^3}`, a ** 3 / 3, T`\tan${a}x=${a}x+\tfrac{${a ** 3}}{3}x^3+\cdots`],
            [T`\dfrac{\sinh ${a}x-${a}x}{x^3}`, a ** 3 / 6, T`\sinh${a}x=${a}x+\tfrac{${a ** 3}}6x^3+\cdots`],
            [T`\dfrac{x\sin x}{1-\cos ${a}x}`, 2 / (a * a), T`x\sin x\approx x^2,\ 1-\cos${a}x\approx\tfrac{${a * a}}2x^2`]]);
          return { q: T`Find $\displaystyle\lim_{x\to0}${L[0]}$.`, fields: [{ label: 'limit', ans: L[1] }], sol: T`$${L[2]}$. Cancel the leading powers of $x$ and let $x\to0$: limit $=${nice(L[1])}$.` };
        },
      ],
    },
    {
      id: 'sr3', code: '6.3', title: 'Taylor series about x = a',
      sims: ['maclaurin'],
      notes: T`
$$f(x)=f(a)+f'(a)(x-a)+\frac{f''(a)}{2!}(x-a)^2+\cdots\quad\text{or}\quad f(a+h)=f(a)+hf'(a)+\frac{h^2}{2!}f''(a)+\cdots$$
<ul><li>Use when you need accuracy near $x=a\ne0$, or when $f(0)$ is undefined ($\ln x$, $\sqrt x$).</li>
<li>Approximations: $\sqrt{4.1}$ → expand $\sqrt x$ about $4$; $\ln1.1$ → expand $\ln x$ about $1$.</li></ul>`,
      drills: [
        () => {
          const t = ri(0, 2), k = ri(2, 4);
          if (t === 0) return { q: T`Find the coefficient of $(x-1)^{${k}}$ in the Taylor series of $\ln x$ about $x=1$.`, fields: [{ label: 'coefficient', ans: (-1) ** (k + 1) / k }], sol: T`$f^{(k)}(x)=(-1)^{k+1}(k-1)!\,x^{-k}$, so coefficient $=\dfrac{(-1)^{k+1}(k-1)!}{k!}=\dfrac{(-1)^{${k + 1}}}{${k}}=${fr((-1) ** (k + 1), k)}$.` };
          if (t === 1) { const a = ri(1, 3); return { q: T`Find the coefficient of $(x-${a})^{${k}}$ in the Taylor series of $e^x$ about $x=${a}$.`, fields: [{ label: 'coefficient', ans: Math.exp(a) / fact(k) }], sol: T`Every derivative is $e^x$: coefficient $=\dfrac{e^{${a}}}{${k}!}=\dfrac{e^{${a}}}{${fact(k)}}$.` }; }
          let c = new Q(1); for (let j = 0; j < k; j++) c = c.mul(new Q(1 - 2 * j, 2)); c = c.mul(new Q(2, 4 ** k * fact(k)));
          return { q: T`Find the coefficient of $(x-4)^{${k}}$ in the Taylor series of $\sqrt x$ about $x=4$.`, fields: [{ label: 'coefficient', ans: c.val() }], sol: T`$\sqrt x=2\left(1+\tfrac{x-4}{4}\right)^{1/2}$ — binomial with $\binom{1/2}{${k}}\cdot\dfrac{2}{4^{${k}}}=${c.tex()}$.` };
        },
        () => {
          const t = pick([0, 1]);
          if (t === 0) { const h = pick([0.1, 0.2, 0.05]), v = h - h * h / 2 + h ** 3 / 3; return { q: T`Use the first three non-zero terms of the Taylor series of $\ln x$ about $x=1$ to estimate $\ln${1 + h}$ (4 d.p.).`, fields: [{ label: 'estimate', ans: v, tol: { abs: 0.00006 } }], sol: T`$\ln(1+h)\approx h-\tfrac{h^2}2+\tfrac{h^3}3$ with $h=${h}$: $${v.toFixed(5)}$ (true value $${Math.log(1 + h).toFixed(5)}$).` }; }
          const h = pick([0.1, 0.2, -0.1, 0.3]), v = 2 + h / 4 - h * h / 64;
          return { q: T`Use the Taylor series of $\sqrt x$ about $x=4$ up to the $(x-4)^2$ term to estimate $\sqrt{${4 + h}}$ (5 d.p.).`, fields: [{ label: 'estimate', ans: v, tol: { abs: 0.000006 } }], sol: T`$\sqrt x\approx2+\tfrac14(x-4)-\tfrac1{64}(x-4)^2$. With $x-4=${h}$: $${v.toFixed(5)}$ (true $${Math.sqrt(4 + h).toFixed(5)}$).` };
        },
      ],
    },
  ],
});

/* ======================= 7. POLAR COORDINATES ======================= */
topic({
  id: 'pl', code: '7', title: 'Polar Coordinates', icon: 'r,θ', color: '#5ad1ff',
  blurb: 'Sketching polar curves, area enclosed, tangents parallel/perpendicular to the initial line.',
  points: [
    {
      id: 'pl1', code: '7.1', title: 'Polar coordinates & sketching curves',
      sims: ['polar'],
      notes: T`
<p>$x=r\cos\theta,\ y=r\sin\theta,\ r^2=x^2+y^2$. In this course $r\ge0$ — where the formula gives $r\lt0$, <b>no curve is drawn</b>.</p>
<table class="tbl"><tr><th>Equation</th><th>Shape</th></tr>
<tr><td>$r=a$</td><td>Circle centre $O$</td></tr>
<tr><td>$r=2a\cos\theta$</td><td>Circle through $O$, centre $(a,0)$</td></tr>
<tr><td>$r=a\theta$</td><td>Spiral</td></tr>
<tr><td>$r=a(1+\cos\theta)$</td><td>Cardioid (cusp at $O$)</td></tr>
<tr><td>$r=a(p+q\cos\theta)$, $p\gt q$</td><td>Limaçon: dimpled if $q\lt p\lt2q$, convex if $p\ge2q$</td></tr>
<tr><td>$r=a\cos n\theta$</td><td>Rose: $n$ petals if $n$ odd, $2n$ if $n$ even (allowing $r\lt0$); with $r\ge0$ only, $n$ petals</td></tr></table>
<div class="tip"><b>Sketch method:</b> table of $\theta$ vs $r$ at multiples of $\tfrac\pi6$, find max $r$, where $r=0$ (tangent at pole), and symmetry ($\cos$ → symmetric about initial line).</div>`,
      drills: [
        () => {
          const C = pick([
            [T`r=3(1+\cos\theta)`, 'Cardioid'], [T`r=2+\cos\theta`, 'Convex limaçon'], [T`r=3+2\cos\theta`, 'Dimpled limaçon'],
            [T`r=4\cos\theta`, 'Circle through the pole'], [T`r=2\theta`, 'Spiral'], [T`r=3\cos3\theta`, 'Rose curve'], [T`r^2=4\cos2\theta`, 'Lemniscate (figure-of-eight)'], [T`r=5`, 'Circle centred at the pole']]);
          const all = ['Cardioid', 'Convex limaçon', 'Dimpled limaçon', 'Circle through the pole', 'Spiral', 'Rose curve', 'Lemniscate (figure-of-eight)', 'Circle centred at the pole'];
          const opts = shuffle([C[1], ...shuffle(all.filter(x => x !== C[1])).slice(0, 3)]);
          return { q: T`Identify the curve $${C[0]}$.`, mc: { options: opts, correct: opts.indexOf(C[1]) }, sol: T`$${C[0]}$ is a <b>${C[1].toLowerCase()}</b>. Use the sim to see it traced.` };
        },
        () => {
          const r = rnz(-6, 6), th = pick([[1, 6], [1, 4], [1, 3], [1, 2], [2, 3], [3, 4], [5, 6], [-1, 3], [-3, 4]]), R = Math.abs(r) || 2;
          const t = th[0] * Math.PI / th[1];
          return { q: T`Convert the polar point $\left(${R},\ ${pf(th[0], th[1])}\right)$ to Cartesian coordinates.`, fields: [{ label: 'x', ans: R * Math.cos(t) }, { label: 'y', ans: R * Math.sin(t) }], sol: T`$x=${R}\cos${pf(th[0], th[1])}=${num(R * Math.cos(t))},\ y=${R}\sin${pf(th[0], th[1])}=${num(R * Math.sin(t))}$.` };
        },
        () => {
          const a = rnz(-4, 4), b = rnz(-4, 4);
          return { q: T`The curve $r=${poly([[2 * a, '\\cos\\theta'], [2 * b, '\\sin\\theta']])}$ is a circle. Find its centre $(p,q)$ and radius.`, fields: [{ label: 'p', ans: a }, { label: 'q', ans: b }, { label: 'radius', ans: Math.hypot(a, b) }], sol: T`Multiply by $r$: $x^2+y^2=${2 * a}x${sgn(2 * b)}y\Rightarrow(x${sgn(-a)})^2+(y${sgn(-b)})^2=${a * a + b * b}$. Centre $(${a},${b})$, radius $${surd(a * a + b * b)}$.` };
        },
        () => {
          const n = ri(2, 7);
          return { q: T`How many petals does $r=\cos${n}\theta$ have when $r\lt0$ is <i>allowed</i> (plotted in the opposite direction)?`, fields: [{ label: 'petals', ans: n % 2 ? n : 2 * n }], sol: T`$n=${n}$ is ${n % 2 ? 'odd' : 'even'}: ${n % 2 ? T`the negative-$r$ loops retrace the positive ones, so $${n}$ petals` : T`the negative-$r$ loops fill the gaps, so $2n=${2 * n}$ petals`}. (With $r\ge0$ only, you see $${n}$.)` };
        },
      ],
    },
    {
      id: 'pl2', code: '7.2', title: 'Area enclosed by a polar curve',
      sims: ['polar'],
      notes: T`
$$A=\frac12\int_\alpha^\beta r^2\,d\theta$$
<ul><li>Use symmetry: area of the cardioid $=2\times\tfrac12\int_0^\pi$.</li>
<li>Expanding $r^2$ usually needs $\cos^2\theta=\tfrac12(1+\cos2\theta)$.</li>
<li>Area between two curves: find intersection angles, then subtract the areas (sketch first!).</li>
<li>One petal of $r=a\cos n\theta$: limits $\pm\frac\pi{2n}$, area $\frac{\pi a^2}{4n}$.</li></ul>`,
      drills: [
        () => {
          const a = ri(1, 6), t = ri(0, 4);
          if (t === 0) return { q: T`Find the area enclosed by $r=${a}(1+\cos\theta)$.`, fields: [{ label: 'area', ans: 1.5 * Math.PI * a * a }], sol: T`$A=\tfrac12\int_0^{2\pi}${a * a}(1+2\cos\theta+\cos^2\theta)d\theta=\tfrac{${a * a}}2\left(2\pi+0+\pi\right)=${fr(3 * a * a, 2)}\pi$.` };
          if (t === 1) { const n = ri(2, 5); return { q: T`Find the area of one petal of $r=${a}\cos${n}\theta$.`, fields: [{ label: 'area', ans: Math.PI * a * a / (4 * n) }], sol: T`$A=\tfrac12\int_{-\pi/${2 * n}}^{\pi/${2 * n}}${a * a}\cos^2${n}\theta\,d\theta=\tfrac{${a * a}}{4}\left[\theta+\tfrac{\sin${2 * n}\theta}{${2 * n}}\right]_{-\pi/${2 * n}}^{\pi/${2 * n}}=${fr(a * a, 4 * n)}\pi$.` }; }
          if (t === 2) { const [k, d] = pick([[1, 1], [1, 2], [2, 1], [1, 3]]), be = k * Math.PI / d, v = a * a * be ** 3 / 6; return { q: T`Find the area bounded by $r=${a}\theta$ for $0\le\theta\le${pf(k, d)}$ and the initial line.`, fields: [{ label: 'area', ans: v }], sol: T`$A=\tfrac12\int_0^{${pf(k, d)}}${a * a}\theta^2d\theta=\tfrac{${a * a}}{6}\left(${pf(k, d)}\right)^3\approx${num(v)}$.` }; }
          if (t === 3) { const q = ri(1, 3), p = q + ri(0, 3), v = Math.PI * (p * p + q * q / 2); return { q: T`Find the area enclosed by $r=${p}+${q}\cos\theta$.`, fields: [{ label: 'area', ans: v }], sol: T`$A=\tfrac12\int_0^{2\pi}(${p * p}+${2 * p * q}\cos\theta+${q * q}\cos^2\theta)d\theta=\tfrac12(${2 * p * p}\pi+${q * q}\pi)=${nice(p * p + q * q / 2)}\pi$.` }; }
          return { q: T`Find the area enclosed between the initial line, the line $\theta=\tfrac\pi2$ and $r=${a}(1+\cos\theta)$.`, fields: [{ label: 'area', ans: a * a * (3 * Math.PI / 8 + 1) }], sol: T`$\tfrac{${a * a}}2\int_0^{\pi/2}(1+2\cos\theta+\tfrac12+\tfrac12\cos2\theta)d\theta=\tfrac{${a * a}}{2}\left(\tfrac{3\pi}4+2\right)=${a * a}\left(\tfrac{3\pi}8+1\right)$.` };
        },
      ],
    },
    {
      id: 'pl3', code: '7.3', title: 'Tangents parallel & perpendicular to the initial line',
      sims: ['polar'],
      notes: T`
<ul><li><b>Parallel</b> to the initial line: $\dfrac{dy}{d\theta}=\dfrac{d}{d\theta}(r\sin\theta)=0$.</li>
<li><b>Perpendicular</b> to the initial line: $\dfrac{dx}{d\theta}=\dfrac{d}{d\theta}(r\cos\theta)=0$.</li>
<li>For $r=p+q\cos\theta$: $y=p\sin\theta+\tfrac q2\sin2\theta$, $\;y'=p\cos\theta+q\cos2\theta=0$ → quadratic in $\cos\theta$.</li>
<li>Always reject solutions outside $[-1,1]$ and check $r\ge0$.</li></ul>`,
      drills: [
        () => {
          const p = ri(1, 6), q = ri(1, 6), c = (-p + Math.sqrt(p * p + 8 * q * q)) / (4 * q);
          return { q: T`For $r=${p}+${q}\cos\theta$, find the point with $0\lt\theta\lt\tfrac\pi2$ where the tangent is parallel to the initial line. Give $\cos\theta$ and $r$.`, fields: [{ label: 'cos θ', ans: c }, { label: 'r', ans: p + q * c }], sol: T`$y=r\sin\theta$, $\dfrac{dy}{d\theta}=${p}\cos\theta+${q}\cos2\theta=0\Rightarrow${2 * q}c^2+${p}c-${q}=0$.<br>$c=\dfrac{-${p}+\sqrt{${p * p + 8 * q * q}}}{${4 * q}}=${num(c)}$, $\;r=${p}+${q}c=${num(p + q * c)}$.` };
        },
        () => {
          const q = ri(1, 5), p = ri(1, 2 * q - 1), c = -p / (2 * q);
          return { q: T`For $r=${p}+${q}\cos\theta$, find $\theta\in(\tfrac\pi2,\pi)$ and $r$ where the tangent is perpendicular to the initial line.`, fields: [{ label: 'θ', ans: Math.acos(c) }, { label: 'r', ans: p / 2 }], sol: T`$x=r\cos\theta=${p}\cos\theta+${q}\cos^2\theta$, $\dfrac{dx}{d\theta}=-\sin\theta(${p}+${2 * q}\cos\theta)=0$.<br>$\cos\theta=${fr(-p, 2 * q)}\Rightarrow\theta=${num(Math.acos(c))}$, $r=${p}+${q}\cdot${fr(-p, 2 * q)}=${fr(p, 2)}$.` };
        },
      ],
    },
  ],
});

/* ======================= 8. DIFFERENTIAL EQUATIONS ======================= */
topic({
  id: 'de', code: '8', title: 'Differential Equations', icon: 'dy', color: '#7ee081',
  blurb: 'Integrating factors, 2nd-order linear with constant coefficients, particular integrals, SHM & damping.',
  points: [
    {
      id: 'de1', code: '8.1', title: 'First order: integrating factor',
      sims: ['slopefield'],
      notes: T`
<p>For $\dfrac{dy}{dx}+P(x)y=Q(x)$:</p>
$$\text{IF}=e^{\int P\,dx},\qquad \frac{d}{dx}\big(y\cdot\text{IF}\big)=Q\cdot\text{IF}\ \Rightarrow\ y\cdot\text{IF}=\int Q\cdot\text{IF}\,dx$$
<ul><li>Divide first so the coefficient of $\frac{dy}{dx}$ is 1.</li>
<li>No $+c$ needed in the IF; you <b>must</b> include $+c$ after the final integration — and divide it by the IF too.</li>
<li>Common IFs: $P=\frac kx\Rightarrow x^k$; $P=\tan x\Rightarrow\sec x$; $P=\cot x\Rightarrow\sin x$; $P=k\Rightarrow e^{kx}$.</li></ul>`,
      drills: [
        () => {
          const k = ri(1, 3), m = ri(0, 3), c = ri(-3, 4), N = m + k + 1, C = c - 1 / N, v = 2 ** (m + 1) / N + C / 2 ** k;
          return { q: T`Solve $\dfrac{dy}{dx}+\dfrac{${k}}{x}y=${m ? (m === 1 ? 'x' : `x^{${m}}`) : '1'}$, $y(1)=${c}$, and find $y(2)$.`, fields: [{ label: 'y(2)', ans: v }], sol: T`IF $=e^{${k}\ln x}=x^{${k}}$. $\;\dfrac{d}{dx}(x^{${k}}y)=x^{${m + k}}\Rightarrow x^{${k}}y=\dfrac{x^{${N}}}{${N}}+C$.<br>$y(1)=${c}\Rightarrow C=${nice(C)}$. $\;y=\dfrac{x^{${m + 1}}}{${N}}+${par(nice(C))}x^{-${k}}$, $\;y(2)=${nice(v)}$.` };
        },
        () => {
          let p = ri(1, 4), q = ri(-3, 3); if (p + q === 0) q++;
          const y0 = ri(-2, 3), v = Math.exp(q) / (p + q) + (y0 - 1 / (p + q)) * Math.exp(-p);
          return { q: T`Solve $\dfrac{dy}{dx}+${p}y=e^{${q}x}$ with $y(0)=${y0}$. Find $y(1)$ (3 s.f.).`, fields: [{ label: 'y(1)', ans: v }], sol: T`IF $=e^{${p}x}$: $(ye^{${p}x})'=e^{${p + q}x}\Rightarrow ye^{${p}x}=\tfrac{1}{${p + q}}e^{${p + q}x}+C$.<br>$y=${fr(1, p + q)}e^{${q}x}+Ce^{-${p}x}$, $C=${y0}-${fr(1, p + q)}=${fr(y0 * (p + q) - 1, p + q)}$. $y(1)\approx${num(v)}$.` };
        },
        () => {
          const L = [[T`\tan x`, T`\sec x`], [T`\cot x`, T`\sin x`], [T`\dfrac{2}{x}`, T`x^2`], [T`-\dfrac1x`, T`\dfrac1x`], [T`2x`, T`e^{x^2}`], [T`\dfrac1{x+1}`, T`x+1`], [T`-\tan x`, T`\cos x`], [T`3`, T`e^{3x}`], [T`\dfrac{2x}{x^2+1}`, T`x^2+1`]];
          const [P, I] = pick(L), wrong = shuffle(L.filter(l => l[1] !== I)).slice(0, 3).map(l => l[1]), opts = shuffle([I, ...wrong]);
          return { q: T`What is the integrating factor for $\dfrac{dy}{dx}+${P}\,y=Q(x)$?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(I) }, sol: T`$e^{\int ${P}\,dx}=${I}$.` };
        },
      ],
    },
    {
      id: 'de2', code: '8.2', title: 'Second order: complementary function',
      sims: ['oscillator'],
      notes: T`
<p>For $a\dfrac{d^2y}{dx^2}+b\dfrac{dy}{dx}+cy=0$, try $y=e^{mx}$ → <b>auxiliary equation</b> $am^2+bm+c=0$.</p>
<table class="tbl"><tr><th>Roots</th><th>Complementary function</th></tr>
<tr><td>Real distinct $\alpha,\beta$</td><td>$y=Ae^{\alpha x}+Be^{\beta x}$</td></tr>
<tr><td>Repeated $\alpha$</td><td>$y=(A+Bx)e^{\alpha x}$</td></tr>
<tr><td>Complex $p\pm qi$</td><td>$y=e^{px}(A\cos qx+B\sin qx)$</td></tr></table>
<ul><li>Pure imaginary $\pm qi$ → $A\cos qx+B\sin qx$: <b>SHM</b>.</li>
<li>Damping: $b^2\gt4ac$ over-damped, $=$ critical, $\lt$ under-damped (oscillates with decaying amplitude).</li></ul>`,
      drills: [
        () => {
          let r1 = ri(-5, 5), r2; do r2 = ri(-5, 5); while (r2 === r1);
          return { q: T`Find the roots of the auxiliary equation for $\dfrac{d^2y}{dx^2}${sgn(-(r1 + r2))}\dfrac{dy}{dx}${sgn(r1 * r2)}y=0$.`.replace('+ 0\\dfrac{dy}{dx}', '').replace('+ 0y', ''), fields: [{ label: 'm values', set: [r1, r2] }], sol: T`$m^2${sgn(-(r1 + r2))}m${sgn(r1 * r2)}=0\Rightarrow(m${sgn(-r1)})(m${sgn(-r2)})=0$, $m=${r1},${r2}$.<br>CF: $y=Ae^{${r1}x}+Be^{${r2}x}$.` };
        },
        () => {
          const al = rnz(-3, 3), be = ri(1, 4);
          return { q: T`$\dfrac{d^2y}{dx^2}${sgn(-2 * al)}\dfrac{dy}{dx}${sgn(al * al + be * be)}y=0$ has CF $y=e^{px}(A\cos qx+B\sin qx)$. Find $p$ and $q\gt0$.`, fields: [{ label: 'p', ans: al }, { label: 'q', ans: be }], sol: T`$m=\dfrac{${2 * al}\pm\sqrt{${4 * al * al}-${4 * (al * al + be * be)}}}{2}=${al}\pm${be}i$. So $p=${al}$, $q=${be}$.` };
        },
        () => {
          const b = ri(1, 8), c = pick([1, 2, 4, 5, 9, 16].filter(() => true)), d = b * b - 4 * c;
          const ans = d > 0 ? 0 : d === 0 ? 1 : 2, o = ['Over-damped', 'Critically damped', 'Under-damped (oscillates)'];
          return { q: T`Classify the motion described by $\ddot x+${b}\dot x+${c}x=0$.`, mc: { options: o, correct: ans }, sol: T`Discriminant $b^2-4c=${b * b}-${4 * c}=${d}$ ${d > 0 ? '$\\gt0$: real distinct negative roots → over-damped' : d === 0 ? '$=0$: repeated root → critically damped' : '$\\lt0$: complex roots → under-damped'}.` };
        },
        () => {
          const r = rnz(-4, 4);
          return { q: T`Find the repeated root $\alpha$ for $\dfrac{d^2y}{dx^2}${sgn(-2 * r)}\dfrac{dy}{dx}+${r * r}y=0$ (CF is $(A+Bx)e^{\alpha x}$).`, fields: [{ label: 'α', ans: r }], sol: T`$m^2${sgn(-2 * r)}m+${r * r}=(m${sgn(-r)})^2$, so $\alpha=${r}$ and $y=(A+Bx)e^{${r}x}$.` };
        },
      ],
    },
    {
      id: 'de3', code: '8.3', title: 'Particular integrals & initial conditions',
      sims: ['oscillator'],
      notes: T`
<p>General solution = CF + PI. Choose the PI trial by the form of $f(x)$:</p>
<table class="tbl"><tr><th>$f(x)$</th><th>Trial PI</th></tr>
<tr><td>$k$</td><td>$\lambda$</td></tr>
<tr><td>$ax+b$</td><td>$\lambda x+\mu$</td></tr>
<tr><td>$ke^{px}$</td><td>$\lambda e^{px}$</td></tr>
<tr><td>$k\cos\omega x$ or $k\sin\omega x$</td><td>$\lambda\cos\omega x+\mu\sin\omega x$ (both!)</td></tr></table>
<ul><li><b>If the trial is already in the CF</b>, multiply by $x$ (by $x^2$ if the root is repeated). E.g. $y''+\omega^2y=\cos\omega x$ → PI $=\frac{x}{2\omega}\sin\omega x$ (resonance).</li>
<li>Apply initial conditions to the <b>general</b> solution (CF + PI), never to the CF alone.</li></ul>`,
      drills: [
        () => {
          const b = ri(-4, 4), c = rnz(-4, 4), A = rnz(-6, 6), B = ri(-6, 6), p = A / c, q = (B - b * p) / c;
          return { q: T`Find the PI $y=px+q$ for $\dfrac{d^2y}{dx^2}${b ? sgn(b) + '\\dfrac{dy}{dx}' : ''}${sgn(c)}y=${poly([[A, 'x'], [B, '']])}$.`.replace(/([+-]) 1\\dfrac/, '$1 \\dfrac').replace(/([+-]) 1y/, '$1 y'), fields: [{ label: 'p', ans: p }, { label: 'q', ans: q }], sol: T`$y'=p$, $y''=0$: $\;${b}p+${par(c)}(px+q)=${poly([[A, 'x'], [B, '']])}$.<br>$x$: $${c}p=${A}\Rightarrow p=${fr(A, c)}$. Const: $${b}p+${par(c)}q=${B}\Rightarrow q=${nice(q)}$.` };
        },
        () => {
          let b, c, m, D; do { b = ri(-4, 4); c = ri(-5, 5); m = rnz(-3, 3); D = m * m + b * m + c; } while (D === 0);
          const K = rnz(-6, 6);
          return { q: T`Find $\lambda$ in the PI $y=\lambda e^{${m}x}$ for $y''${sgn(b)}y'${sgn(c)}y=${K}e^{${m}x}$.`.replace(/\+ 0y'/, '').replace(/\+ 0y/, ''), fields: [{ label: 'λ', ans: K / D }], sol: T`Substitute: $\lambda(${m * m}${sgn(b * m)}${sgn(c)})e^{${m}x}=${K}e^{${m}x}\Rightarrow\lambda=${fr(K, D)}$.` };
        },
        () => {
          let b, c, w, s, t; do { b = ri(0, 4); c = ri(1, 9); w = ri(1, 3); s = c - w * w; t = b * w; } while (s === 0 && t === 0);
          const K = rnz(-5, 5), D = s * s + t * t;
          return { q: T`Find the PI $y=P\cos${w}x+Q\sin${w}x$ for $y''${b ? sgn(b) + "y'" : ''}${sgn(c)}y=${K}\cos${w}x$.`, fields: [{ label: 'P', ans: K * s / D }, { label: 'Q', ans: K * t / D }], sol: T`$y''=-${w * w}y$. cos: $${s}P+${t}Q=${K}$; sin: $${s}Q-${t}P=0$.<br>$P=${fr(K * s, D)}$, $Q=${fr(K * t, D)}$.` };
        },
        () => {
          let r1 = ri(-3, 3), r2; do r2 = ri(-3, 3); while (r2 === r1);
          const y0 = ri(-4, 4), v0 = ri(-6, 6), A = (v0 - r2 * y0) / (r1 - r2), B = y0 - A;
          return { q: T`$y''${sgn(-(r1 + r2))}y'${sgn(r1 * r2)}y=0$, $y(0)=${y0}$, $y'(0)=${v0}$. The solution is $y=Ae^{${r1}x}+Be^{${r2}x}$. Find $A,B$.`.replace(/\+ 0y'/, '').replace(/\+ 0y/, ''), fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }], sol: T`$A+B=${y0}$, $${r1}A${sgn(r2)}B=${v0}$. Solve: $A=${fr(v0 - r2 * y0, r1 - r2)}$, $B=${nice(B)}$.` };
        },
        () => {
          if (Math.random() < 0.5) { const w = ri(1, 5), K = rnz(-8, 8); return { q: T`$y''+${w * w}y=${K}\cos${w}x$. The PI is $y=\lambda x\sin${w}x$. Find $\lambda$.`, fields: [{ label: 'λ', ans: K / (2 * w) }], sol: T`$\cos${w}x$ is in the CF, so multiply the trial by $x$. $y''=2\lambda${w}\cos${w}x-${w * w}\lambda x\sin${w}x$ → $2\cdot${w}\lambda=${K}$, $\lambda=${fr(K, 2 * w)}$.` }; }
          let r1 = ri(-3, 3), r2; do r2 = ri(-3, 3); while (r2 === r1); const b = -(r1 + r2), c = r1 * r2, K = rnz(-6, 6);
          return { q: T`$y''${sgn(b)}y'${sgn(c)}y=${K}e^{${r1}x}$. The PI is $\lambda xe^{${r1}x}$. Find $\lambda$.`.replace(/\+ 0y'/, '').replace(/\+ 0y/, ''), fields: [{ label: 'λ', ans: K / (2 * r1 + b) }], sol: T`$e^{${r1}x}$ is in the CF, so try $\lambda xe^{${r1}x}$. Substituting leaves $\lambda(2\cdot${par(r1)}${sgn(b)})e^{${r1}x}=${K}e^{${r1}x}$, so $\lambda=${fr(K, 2 * r1 + b)}$.` };
        },
      ],
    },
    {
      id: 'de4', code: '8.4', title: 'Modelling: SHM & damped oscillations',
      sims: ['oscillator'],
      notes: T`
<ul><li><b>SHM</b>: $\ddot x=-\omega^2x$ → $x=A\cos\omega t+B\sin\omega t=R\cos(\omega t-\varphi)$. Period $\frac{2\pi}\omega$, amplitude $R=\sqrt{A^2+B^2}$.</li>
<li>From $x(0)=x_0$, $\dot x(0)=v_0$: $R=\sqrt{x_0^2+(v_0/\omega)^2}$.</li>
<li><b>Damped</b>: $\ddot x+2k\dot x+\omega^2x=0$. Under-damped when $k\lt\omega$: $x=e^{-kt}(A\cos\Omega t+B\sin\Omega t)$ with $\Omega=\sqrt{\omega^2-k^2}$; "period" $\frac{2\pi}\Omega$.</li>
<li>Forced: the PI is the long-term (steady-state) motion; the CF decays away when there is damping.</li></ul>`,
      drills: [
        () => {
          const w = ri(1, 6), x0 = ri(-5, 5), v0 = rnz(-12, 12);
          return { q: T`A particle moves with $\ddot x=-${w * w}x$, $x(0)=${x0}$, $\dot x(0)=${v0}$. Find the amplitude and period.`, fields: [{ label: 'amplitude', ans: Math.hypot(x0, v0 / w) }, { label: 'period', ans: 2 * Math.PI / w }], sol: T`$x=${x0}\cos${w}t+${fr(v0, w)}\sin${w}t$. $R=\sqrt{${x0}^2+\left(${fr(v0, w)}\right)^2}\approx${num(Math.hypot(x0, v0 / w))}$. Period $=${pf(2, w)}$.` };
        },
        () => {
          const k = ri(1, 3), W = ri(k + 1, 6), w2 = W * W;
          return { q: T`$\ddot x+${2 * k}\dot x+${w2}x=0$. Find the period of the damped oscillations.`, fields: [{ label: 'period', ans: 2 * Math.PI / Math.sqrt(w2 - k * k) }], sol: T`$m=-${k}\pm\sqrt{${k * k}-${w2}}=-${k}\pm${surd(w2 - k * k)}i$. $\Omega=${surd(w2 - k * k)}$, period $=\dfrac{2\pi}{${surd(w2 - k * k)}}\approx${num(2 * Math.PI / Math.sqrt(w2 - k * k))}$.` };
        },
      ],
    },
  ],
});

/* ======================= 9. PROOF BY INDUCTION ======================= */
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
topic({
  id: 'pi', code: '9', title: 'Proof by Induction', icon: 'n→', color: '#ff6b6b',
  blurb: 'Divisibility, matrix powers, series and inequalities.',
  points: [
    {
      id: 'pi1', code: '9.1', title: 'Divisibility & matrix powers',
      sims: ['induction'],
      notes: T`
<ol><li><b>Basis</b>: show true for $n=1$ (or the given start).</li>
<li><b>Assume</b> true for $n=k$ — write the assumption out explicitly.</li>
<li><b>Inductive step</b>: show true for $n=k+1$ <i>using</i> the assumption.</li>
<li><b>Conclusion</b>: "True for $n=1$, and if true for $n=k$ then true for $n=k+1$; hence true for all $n\in\mathbb Z^+$." — this sentence carries a mark.</li></ol>
<h4>Divisibility trick</h4><p>Compute $f(k+1)-mf(k)$ for a well-chosen $m$ (usually the base of the dominant power) so what's left is obviously a multiple of the divisor.</p>
<p>e.g. $f(n)=5^{2n}-1$: $f(k+1)-25f(k)=24$, so $f(k+1)=25f(k)+24$ ✓ divisible by 24.</p>
<h4>Matrices</h4><p>Assume $\mathbf M^k=\ldots$, then $\mathbf M^{k+1}=\mathbf M^k\mathbf M$ and simplify each entry.</p>`,
      drills: [
        () => {
          let f, tex, g;
          do {
            const t = ri(0, 3);
            if (t === 0) { const a = ri(2, 7); f = n => BigInt(a) ** BigInt(2 * n) - 1n; tex = T`${a}^{2n}-1`; }
            else if (t === 1) { const x = ri(2, 5), y = ri(2, 5), s = ri(0, 2), u = ri(0, 2); f = n => BigInt(x) ** BigInt(n + s) + BigInt(y) ** BigInt(2 * n + u); tex = T`${x}^{n${s ? '+' + s : ''}}+${y}^{2n${u ? '+' + u : ''}}`; }
            else if (t === 2) { const k = pick([-1, 2, 5, 11, 23]); f = n => BigInt(n) ** 3n + BigInt(k * n); tex = T`n^3${sgn(k)}n`.replace(/([+-]) 1n$/, '$1 n'); }
            else { const a = ri(3, 7); f = n => BigInt(a) ** BigInt(n) - BigInt((a - 1) * n) - 1n; tex = T`${a}^n-${a - 1}n-1`; }
            g = 0n; for (let n = 1; n <= 14; n++) g = bgcd(g, f(n));
          } while (g <= 1n || g > 10000n);
          return { q: T`Let $f(n)=${tex}$. Find the largest integer that divides $f(n)$ for every positive integer $n$ (then prove it by induction).`, fields: [{ label: 'divisor', ans: Number(g) }], sol: T`$f(1)=${f(1)}$, $f(2)=${f(2)}$, $f(3)=${f(3)}$ → $\gcd=${g}$.<br>Inductive step: write $f(k+1)$ in terms of $f(k)$ (e.g. $f(k+1)-mf(k)$) and show the remainder is a multiple of ${g}.` };
        },
        () => {
          const t = ri(0, 2), n = ri(3, 8);
          if (t === 0) { const a = ri(2, 4), b = rnz(-3, 3); return { q: T`$\mathbf M=${M.tex([[a, b], [0, 1]])}$. Prove $\mathbf M^n=\begin{pmatrix}${a}^n&${b === 1 ? '' : b === -1 ? '-' : b}\frac{${a}^n-1}{${a - 1}}\\0&1\end{pmatrix}$ — then find the top-right entry of $\mathbf M^{${n}}$.`, fields: [{ label: 'entry', ans: b * (a ** n - 1) / (a - 1) }], sol: T`$${b}\cdot\dfrac{${a}^{${n}}-1}{${a - 1}}=${b * (a ** n - 1) / (a - 1)}$. Step: $\mathbf M^{k+1}=\mathbf M^k\mathbf M$ gives top-right $${a}\cdot(\ldots)+1\cdot\ldots$ — check it matches with $k+1$.` }; }
          if (t === 1) return { q: T`$\mathbf M=${M.tex([[2, -1], [1, 0]])}$. Given $\mathbf M^n=\begin{pmatrix}n+1&-n\\n&1-n\end{pmatrix}$, find the sum of all entries of $\mathbf M^{${n}}$.`, fields: [{ label: 'sum', ans: 2 }], sol: T`$(n+1)-n+n+(1-n)=2$ for every $n$. (Nice check that it's invariant.)` };
          const a = ri(2, 5); return { q: T`$\mathbf M=${M.tex([[1, a], [0, 1]])}$. Find the top-right entry of $\mathbf M^{${n}}$.`, fields: [{ label: 'entry', ans: a * n }], sol: T`$\mathbf M^n=\begin{pmatrix}1&${a}n\\0&1\end{pmatrix}$ (induction: $\mathbf M^{k+1}=\begin{pmatrix}1&${a}k\\0&1\end{pmatrix}\begin{pmatrix}1&${a}\\0&1\end{pmatrix}=\begin{pmatrix}1&${a}(k+1)\\0&1\end{pmatrix}$). Entry $=${a * n}$.` };
        },
      ],
    },
    {
      id: 'pi2', code: '9.2', title: 'Series & inequalities',
      sims: ['induction'],
      notes: T`
<h4>Series</h4><p>Assume $\sum_{r=1}^k u_r=S(k)$. Then $\sum_{r=1}^{k+1}u_r=S(k)+u_{k+1}$ — factorise towards $S(k+1)$. Take out common factors early; don't expand everything.</p>
<h4>Inequalities</h4><p>Assume $P(k)$, then build a chain: $2^{k+1}=2\cdot2^k\gt2k^2\ge(k+1)^2$ — the last step needs its own justification (valid for $k\ge3$ here).</p>
<div class="tip">Always check small cases numerically before proving: it tells you the start value $N$.</div>`,
      drills: [
        () => {
          const S = pick([
            [T`\sum_{r=1}^n r\,2^r`, T`(n-1)2^{n+1}+2`, [T`n2^{n+1}-2`, T`(n+1)2^n-2`, T`(n-1)2^{n}+2`]],
            [T`\sum_{r=1}^n\frac1{r(r+1)}`, T`\frac{n}{n+1}`, [T`\frac1{n+1}`, T`\frac{n+1}{n+2}`, T`\frac{n}{2n+1}`]],
            [T`\sum_{r=1}^n r\cdot r!`, T`(n+1)!-1`, [T`n\cdot n!`, T`(n+1)!-n`, T`n!+n-1`]],
            [T`\sum_{r=1}^n r^3`, T`\tfrac14n^2(n+1)^2`, [T`\tfrac16n(n+1)(2n+1)`, T`\tfrac12n^3(n+1)`, T`\tfrac12n^2(n+1)^2`]],
            [T`\sum_{r=1}^n(2r-1)^2`, T`\tfrac13n(2n-1)(2n+1)`, [T`\tfrac13n(2n+1)^2`, T`\tfrac16n(2n-1)(2n+1)`, T`n^2(2n-1)`]],
            [T`\sum_{r=1}^n\frac1{(2r-1)(2r+1)}`, T`\frac{n}{2n+1}`, [T`\frac{n}{2n-1}`, T`\frac{2n}{2n+1}`, T`\frac1{2n+1}`]],
            [T`\sum_{r=1}^n r(r+1)`, T`\tfrac13n(n+1)(n+2)`, [T`\tfrac12n(n+1)(n+2)`, T`\tfrac13n(n+1)(2n+1)`, T`\tfrac16n(n+1)(n+2)`]]]);
          const opts = shuffle([S[1], ...S[2]]);
          return { q: T`Which formula for $\displaystyle${S[0]}$ could be proved by induction? (Test $n=1,2$.)`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(S[1]) }, sol: T`$${S[0]}=${S[1]}$. Check $n=1$ and $n=2$ — only this one matches both; then prove via $S(k)+u_{k+1}=S(k+1)$.` };
        },
        () => {
          let lhs, rhs, tex;
          if (Math.random() < 0.5) { const a = ri(2, 3), k = ri(2, 4); lhs = n => a ** n; rhs = n => n ** k; tex = T`${a}^n\gt n^{${k}}`; }
          else { const a = ri(2, 5); lhs = n => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; }; rhs = n => a ** n; tex = T`n!\gt${a}^n`; }
          let last = 0; for (let n = 1; n <= 60; n++) if (!(lhs(n) > rhs(n))) last = n;
          const N = last + 1;
          return { q: T`Find the smallest $N$ such that $${tex}$ for all integers $n\ge N$.`, fields: [{ label: 'N', ans: N }], sol: T`Tabulate: fails at $n=${last}$ (${num(lhs(last))} vs ${num(rhs(last))}), holds at $n=${N}$ (${num(lhs(N))} vs ${num(rhs(N))}) and the inductive step keeps it true after that. So $N=${N}$.` };
        },
      ],
    },
  ],
});
