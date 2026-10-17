// New A2 1 points: sequences by induction, partial fractions, summation of series, integration via partial fractions, repeated parts.
'use strict';

const lin = (a) => a === 0 ? 'x' : `(x${sgn(-a)})`;           // (x - a)
const linp = (a) => a === 0 ? 'x' : `x${sgn(-a)}`;            // x - a  (no brackets)
const fracTerm = (A, den) => `\\dfrac{${A}}{${den}}`;

topic({
  id: '_new', title: 'new', points: [
    {
      id: 'pi3', title: 'Sequences & recurrence relations',
      sims: ['induction'],
      notes: T`
<p>A sequence can be defined by a <b>recurrence</b> such as $u_1=2,\ u_{n+1}=3u_n-2$. Induction proves a conjectured <b>closed form</b> $u_n=f(n)$.</p>
<ul><li><b>Basis</b>: check $f(1)$ equals the given $u_1$.</li>
<li><b>Step</b>: assume $u_k=f(k)$; substitute into the recurrence to get $u_{k+1}$; simplify to $f(k+1)$.</li>
<li>First-order linear $u_{n+1}=ku_n+c$ ($k\ne1$) always has closed form $u_n=Ak^n+B$ with $B=\dfrac{c}{1-k}$.</li></ul>`,
      drills: [
        () => {
          const k = ri(2, 4), c = rnz(-6, 6), a = ri(-3, 6), B = c / (1 - k), A = (a - B) / k;
          return {
            q: T`$u_1=${a}$ and $u_{n+1}=${k}u_n${sgn(c)}$. The closed form is $u_n=A\cdot ${k}^n+B$. Find $A$ and $B$ (then prove it by induction).`,
            fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }],
            sol: T`A constant solution $u=B$ satisfies $B=${k}B${sgn(c)}\Rightarrow B=${fr(c, 1 - k)}$.<br>Then $u_1=${k}A+B=${a}\Rightarrow A=\dfrac{${a}-(${fr(c, 1 - k)})}{${k}}=${nice(A)}$.<br>
<b>Induction step:</b> if $u_k=A\cdot${k}^k+B$ then $u_{k+1}=${k}(A\cdot${k}^k+B)${sgn(c)}=A\cdot${k}^{k+1}+(${k}B${sgn(c)})=A\cdot${k}^{k+1}+B$ ✓ (because $B$ is the fixed point).`,
          };
        },
        () => {
          const p = rnz(-3, 3), q = ri(-4, 5), u1 = ri(-3, 5), al = p, be = q - p, ga = u1 - al - be;
          return {
            q: T`$u_1=${u1}$ and $u_{n+1}=u_n+${poly([[2 * p, 'n'], [q, '']])}$. Given $u_n=\alpha n^2+\beta n+\gamma$, find $\alpha,\beta,\gamma$.`,
            fields: [{ label: 'α', ans: al }, { label: 'β', ans: be }, { label: 'γ', ans: ga }],
            sol: T`$u_{n+1}-u_n=\alpha(2n+1)+\beta=2\alpha n+(\alpha+\beta)$. Compare with $${poly([[2 * p, 'n'], [q, '']])}$: $\alpha=${al}$, $\beta=${be}$.<br>$u_1=\alpha+\beta+\gamma=${u1}\Rightarrow\gamma=${ga}$.`,
          };
        },
        () => {
          const r1 = pick([-2, -1, 1, 2, 3, 4]); let r2; do r2 = pick([-2, -1, 1, 2, 3, 4]); while (r2 === r1);
          const A = rnz(-3, 3), B = rnz(-3, 3), u = n => A * r1 ** n + B * r2 ** n;
          return {
            q: T`$u_1=${u(1)}$, $u_2=${u(2)}$ and $u_{n+2}=${poly([[r1 + r2, 'u_{n+1}'], [-r1 * r2, 'u_n']])}$. Find $u_6$ (hint: $u_n=A(${r1})^n+B(${r2})^n$).`,
            fields: [{ label: 'u₆', ans: u(6) }],
            sol: T`Characteristic equation $t^2=${r1 + r2}t${sgn(-r1 * r2)}$ has roots $${r1},${r2}$. Solving $A(${r1})+B(${r2})=${u(1)}$, $A(${r1})^2+B(${r2})^2=${u(2)}$ gives $A=${A}$, $B=${B}$.<br>$u_6=${A}(${r1})^6${sgn(B)}(${r2})^6=${u(6)}$. (Induction proves the formula: assume true for $k$ and $k+1$ — "strong" induction with two base cases.)`,
          };
        },
      ],
    },
    {
      id: 'al1', title: 'Partial fractions',
      sims: [],
      notes: T`
<table class="tbl"><tr><th>Denominator factor</th><th>Partial fraction(s)</th></tr>
<tr><td>$(ax+b)$</td><td>$\dfrac{A}{ax+b}$</td></tr>
<tr><td>$(ax+b)^2$</td><td>$\dfrac{A}{ax+b}+\dfrac{B}{(ax+b)^2}$</td></tr>
<tr><td>$(x^2+c)$, irreducible</td><td>$\dfrac{Ax+B}{x^2+c}$</td></tr></table>
<ul><li><b>Improper</b> (degree of top ≥ degree of bottom): divide first.</li>
<li>Find constants by substituting roots ("cover-up") then comparing coefficients for the rest.</li></ul>`,
      drills: [
        () => {
          let a = ri(-5, 5), b; do b = ri(-5, 5); while (b === a);
          const A = rnz(-5, 5), B = rnz(-5, 5), p = A + B, q = -(A * b + B * a), expand = Math.random() < 0.5;
          const den = expand ? poly([[1, 'x^2'], [-(a + b), 'x'], [a * b, '']]) : `${lin(a)}${lin(b)}`;
          return {
            q: T`Express $\dfrac{${poly([[p, 'x'], [q, '']])}}{${den}}$ in the form $\dfrac{A}{${linp(a)}}+\dfrac{B}{${linp(b)}}$.`,
            fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }],
            sol: T`${expand ? T`Factorise: $${den}=${lin(a)}${lin(b)}$.<br>` : ''}$${poly([[p, 'x'], [q, '']])}\equiv A${lin(b)}+B${lin(a)}$.<br>
$x=${a}$: $${p * a + q}=A(${a - b})\Rightarrow A=${A}$. $\;x=${b}$: $${p * b + q}=B(${b - a})\Rightarrow B=${B}$.`,
          };
        },
        () => {
          let a = ri(-4, 4), b; do b = ri(-4, 4); while (b === a);
          const A = rnz(-4, 4), B = rnz(-4, 4), C = rnz(-5, 5);
          // A(x-b)^2 + B(x-a)(x-b) + C(x-a)
          const c2 = A + B, c1 = -2 * A * b - B * (a + b) + C, c0 = A * b * b + B * a * b - C * a;
          return {
            q: T`Express $\dfrac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{${lin(a)}${lin(b)}^2}$ as $\dfrac{A}{${linp(a)}}+\dfrac{B}{${linp(b)}}+\dfrac{C}{${lin(b)}^2}$.`,
            fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }],
            sol: T`$${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}\equiv A${lin(b)}^2+B${lin(a)}${lin(b)}+C${lin(a)}$.<br>
$x=${a}$: $${c2 * a * a + c1 * a + c0}=A(${a - b})^2\Rightarrow A=${A}$. $\;x=${b}$: $${c2 * b * b + c1 * b + c0}=C(${b - a})\Rightarrow C=${C}$.<br>
Compare $x^2$: $${c2}=A+B\Rightarrow B=${B}$.`,
          };
        },
        () => {
          const a = ri(-4, 4), c = pick([1, 2, 3, 4, 9]), A = rnz(-4, 4), B = rnz(-4, 4), C = ri(-5, 5);
          // A(x^2+c) + (Bx+C)(x-a)
          const c2 = A + B, c1 = C - a * B, c0 = A * c - a * C;
          return {
            q: T`Express $\dfrac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{${lin(a)}(x^2+${c})}$ as $\dfrac{A}{${linp(a)}}+\dfrac{Bx+C}{x^2+${c}}$.`,
            fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }],
            sol: T`$${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}\equiv A(x^2+${c})+(Bx+C)${lin(a)}$.<br>
$x=${a}$: $${c2 * a * a + c1 * a + c0}=A(${a * a + c})\Rightarrow A=${A}$. Compare $x^2$: $${c2}=A+B\Rightarrow B=${B}$. Constant: $${c0}=${c}A${sgn(-a)}C\Rightarrow C=${C}$.`,
          };
        },
        () => {
          let a = ri(-4, 4), b; do b = ri(-4, 4); while (b === a);
          const K = rnz(-3, 3), A = rnz(-4, 4), B = rnz(-4, 4);
          // K(x-a)(x-b) + A(x-b) + B(x-a)
          const c2 = K, c1 = -K * (a + b) + A + B, c0 = K * a * b - A * b - B * a;
          return {
            q: T`Express $\dfrac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{${lin(a)}${lin(b)}}$ as $K+\dfrac{A}{${linp(a)}}+\dfrac{B}{${linp(b)}}$.`,
            fields: [{ label: 'K', ans: K }, { label: 'A', ans: A }, { label: 'B', ans: B }],
            sol: T`Improper (degree 2 over degree 2): the quotient is the ratio of leading coefficients, $K=${K}$.<br>
$${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}\equiv${K}${lin(a)}${lin(b)}+A${lin(b)}+B${lin(a)}$. $x=${a}$: $A=${A}$; $x=${b}$: $B=${B}$.`,
          };
        },
      ],
    },
    {
      id: 'al2', title: 'Summation of series: standard results & method of differences',
      sims: ['induction'],
      notes: T`
$$\sum_{r=1}^n r=\tfrac12n(n+1),\qquad\sum_{r=1}^n r^2=\tfrac16n(n+1)(2n+1),\qquad\sum_{r=1}^n r^3=\tfrac14n^2(n+1)^2$$
<ul><li>Sums are linear: $\sum(ar^2+br+c)=a\sum r^2+b\sum r+cn$. Note $\sum_{r=1}^n c=cn$, not $c$.</li>
<li>$\sum_{r=m}^n f(r)=\sum_{r=1}^n f(r)-\sum_{r=1}^{m-1}f(r)$.</li>
<li><b>Method of differences</b>: if $u_r=f(r)-f(r+1)$ then $\sum_{r=1}^nu_r=f(1)-f(n+1)$ — everything else cancels. Partial fractions usually create the difference.</li></ul>`,
      drills: [
        () => {
          const a = ri(-3, 4), b = ri(-5, 5), c = ri(-5, 5), n = ri(5, 30), m = pick([1, 1, ri(2, 6)]);
          const S = N => a * N * (N + 1) * (2 * N + 1) / 6 + b * N * (N + 1) / 2 + c * N, v = S(n) - S(m - 1);
          return {
            q: T`Evaluate $\displaystyle\sum_{r=${m}}^{${n}}(${poly([[a, 'r^2'], [b, 'r'], [c, '']])})$.`,
            fields: [{ label: 'sum', ans: v }],
            sol: T`$\sum_{r=1}^{N}=${a}\cdot\tfrac16N(N+1)(2N+1)${sgn(b)}\cdot\tfrac12N(N+1)${sgn(c)}N$.<br>${m > 1 ? T`$\sum_{r=${m}}^{${n}}=S(${n})-S(${m - 1})=${S(n)}-${par(S(m - 1))}=${v}$.` : T`$S(${n})=${v}$.`}`,
          };
        },
        () => {
          const k = rnz(-3, 4);
          return {
            q: T`Show that $\displaystyle\sum_{r=1}^n r(r${sgn(k)})=\tfrac16n(n+1)(pn+q)$ and find $p,q$.`.replace('+ 1)', '+1)'),
            fields: [{ label: 'p', ans: 2 }, { label: 'q', ans: 1 + 3 * k }],
            sol: T`$\sum r^2${sgn(k)}\sum r=\tfrac16n(n+1)(2n+1)${sgn(k)}\cdot\tfrac12n(n+1)=\tfrac16n(n+1)\left[(2n+1)${sgn(3 * k)}\right]=\tfrac16n(n+1)(2n${sgn(1 + 3 * k)})$.<br>$p=2,\ q=${1 + 3 * k}$.`,
          };
        },
        () => {
          const k = ri(1, 4), H = Array.from({ length: k }, (_, i) => 1 / (i + 1)).reduce((s, x) => s + x, 0);
          return {
            q: T`Using partial fractions and the method of differences, find $\displaystyle\sum_{r=1}^{\infty}\frac{1}{r(r+${k})}$.`,
            fields: [{ label: 'sum', ans: H / k }],
            sol: T`$\dfrac1{r(r+${k})}=\dfrac1{${k}}\left(\dfrac1r-\dfrac1{r+${k}}\right)$. Writing out terms, every $\frac1m$ with $m\gt${k}$ cancels, leaving the first ${k} positive terms:<br>
$\displaystyle\sum_{r=1}^n=\frac1{${k}}\left(${Array.from({ length: k }, (_, i) => `\\tfrac1{${i + 1}}`).join('+')}-\left[${Array.from({ length: k }, (_, i) => `\\tfrac1{n+${i + 1}}`).join('+')}\right]\right)\to\frac1{${k}}\left(${Array.from({ length: k }, (_, i) => `\\tfrac1{${i + 1}}`).join('+')}\right)=${nice(H / k)}$.`,
          };
        },
        () => {
          const n = ri(3, 20), t = ri(0, 2);
          if (t === 0) return { q: T`Find $\displaystyle\sum_{r=1}^{${n}}\frac{2r+1}{r^2(r+1)^2}$ exactly.`, fields: [{ label: 'sum', ans: 1 - 1 / (n + 1) ** 2 }], sol: T`$\dfrac{2r+1}{r^2(r+1)^2}=\dfrac1{r^2}-\dfrac1{(r+1)^2}$ (check: common denominator gives $(r+1)^2-r^2=2r+1$). Telescopes to $1-\dfrac1{(n+1)^2}=1-\dfrac1{${(n + 1) ** 2}}=${fr((n + 1) ** 2 - 1, (n + 1) ** 2)}$.` };
          if (t === 1) return { q: T`Find $\displaystyle\sum_{r=1}^{${n}}\ln\frac{r+1}{r}$ exactly.`, fields: [{ label: 'sum', ans: Math.log(n + 1) }], sol: T`$\ln\frac{r+1}r=\ln(r+1)-\ln r$. Telescopes: $\ln(${n}+1)-\ln1=\ln${n + 1}$.` };
          return { q: T`Find $\displaystyle\sum_{r=1}^{${n}}\frac{1}{(2r-1)(2r+1)}$ exactly.`, fields: [{ label: 'sum', ans: n / (2 * n + 1) }], sol: T`$\dfrac1{(2r-1)(2r+1)}=\dfrac12\left(\dfrac1{2r-1}-\dfrac1{2r+1}\right)$. Telescopes: $\dfrac12\left(1-\dfrac1{2n+1}\right)=\dfrac{n}{2n+1}=${fr(n, 2 * n + 1)}$.` };
        },
      ],
    },
    {
      id: 'ca6', title: 'Integration using partial fractions',
      sims: [],
      notes: T`
<ul><li>$\displaystyle\int\frac{A}{ax+b}dx=\frac Aa\ln|ax+b|+c$.</li>
<li>$\displaystyle\int\frac{B}{(x-a)^2}dx=-\frac{B}{x-a}+c$ — <b>not</b> a log.</li>
<li>$\displaystyle\int\frac{Bx+C}{x^2+k^2}dx=\frac B2\ln(x^2+k^2)+\frac Ck\arctan\frac xk+c$.</li>
<li>Combine logs at the end: $\ln a-\ln b=\ln\frac ab$; give exact answers unless told otherwise.</li></ul>`,
      drills: [
        () => {
          let a = ri(-4, 0), b; do b = ri(-4, 0); while (b === a);
          const A = rnz(-4, 4), B = rnz(-4, 4), lo = 1, hi = ri(2, 4), p = A + B, q = -(A * b + B * a);
          const v = A * Math.log((hi - a) / (lo - a)) + B * Math.log((hi - b) / (lo - b));
          return {
            q: T`Find $\displaystyle\int_{${lo}}^{${hi}}\frac{${poly([[p, 'x'], [q, '']])}}{${lin(a)}${lin(b)}}\,dx$ exactly.`,
            fields: [{ label: 'value', ans: v }],
            sol: T`Partial fractions: $\dfrac{${A}}{${linp(a)}}+\dfrac{${B}}{${linp(b)}}$.<br>
$\left[${A}\ln|${linp(a)}|${sgn(B)}\ln|${linp(b)}|\right]_{${lo}}^{${hi}}=${A}\ln\tfrac{${hi - a}}{${lo - a}}${sgn(B)}\ln\tfrac{${hi - b}}{${lo - b}}\approx${num(v)}$.`,
          };
        },
        () => {
          const a = ri(1, 3), k = pick([1, 2, 3]), c = k * k, A = rnz(-3, 3), B = rnz(-3, 3), C = rnz(-4, 4);
          // A/(x+a) + (Bx+C)/(x^2+c) over [0, k]
          const c2 = A + B, c1 = C + a * B, c0 = A * c + a * C;
          const v = A * Math.log((k + a) / a) + B / 2 * Math.log(2) + C / k * Math.PI / 4;
          return {
            q: T`Given $\dfrac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{(x+${a})(x^2+${c})}\equiv\dfrac{A}{x+${a}}+\dfrac{Bx+C}{x^2+${c}}$, find the constants and evaluate $\displaystyle\int_0^{${k}}$ of it exactly.`,
            fields: [{ label: 'A', ans: A }, { label: 'B', ans: B }, { label: 'C', ans: C }, { label: 'integral', ans: v }],
            sol: T`$x=-${a}$ gives $A=${A}$; compare $x^2$: $B=${B}$; constants: $C=${C}$.<br>
$\int_0^{${k}}=\left[${A}\ln(x+${a})+\tfrac{${B}}{2}\ln(x^2+${c})+\tfrac{${C}}{${k}}\arctan\tfrac x{${k}}\right]_0^{${k}}=${A}\ln\tfrac{${k + a}}{${a}}+\tfrac{${B}}2\ln2+\tfrac{${C}\pi}{${4 * k}}\approx${num(v)}$.`,
          };
        },
        () => {
          const A = rnz(-3, 3), B = rnz(-3, 3), C = rnz(-3, 3), b = -1;
          // A/x + B/(x+1) + C/(x+1)^2 on [1, 2]
          const v = A * Math.log(2) + B * Math.log(3 / 2) + C * (1 / 2 - 1 / 3);
          const c2 = A + B, c1 = 2 * A + B + C, c0 = A;
          return {
            q: T`Evaluate $\displaystyle\int_1^2\frac{${poly([[c2, 'x^2'], [c1, 'x'], [c0, '']])}}{x(x+1)^2}\,dx$ exactly.`,
            fields: [{ label: 'value', ans: v }],
            sol: T`$\dfrac{${A}}{x}+\dfrac{${B}}{x+1}+\dfrac{${C}}{(x+1)^2}$ (cover-up at $x=0$ and $x=-1$, then compare $x^2$).<br>
$\left[${A}\ln x${sgn(B)}\ln(x+1)-\dfrac{${C}}{x+1}\right]_1^2=${A}\ln2${sgn(B)}\ln\tfrac32${C * (1 / 6) >= 0 ? '+' : '-'}${fr(Math.abs(C), 6)}\approx${num(v)}$.`,
          };
        },
      ],
    },
    {
      id: 'ca7', title: 'Repeated integration by parts',
      sims: [],
      notes: T`
$$\int u\,\frac{dv}{dx}\,dx=uv-\int v\,\frac{du}{dx}\,dx$$
<ul><li>Choose $u$ to be the factor that gets simpler when differentiated (LIATE: Logs, Inverse trig, Algebraic, Trig, Exponential).</li>
<li>$x^2e^x$, $x^2\sin x$: apply twice — each application lowers the power of $x$ by one.</li>
<li><b>Cyclic</b> integrals $\int e^{ax}\cos bx\,dx$: apply twice, the original integral reappears; collect it on one side.</li>
<li>Tabular method for $x^n\times$(something integrable repeatedly): alternate signs $+,-,+,\dots$</li></ul>`,
      drills: [
        () => {
          const a = pick([1, 2, -1, -2, 3]), v = Math.exp(a) * (1 / a - 2 / a ** 2 + 2 / a ** 3) - 2 / a ** 3;
          return {
            q: T`Find $\displaystyle\int_0^1x^2e^{${a}x}\,dx$ exactly.`,
            fields: [{ label: 'value', ans: v }],
            sol: T`Parts twice ($u=x^2$, then $u=x$): $\int x^2e^{${a}x}dx=e^{${a}x}\left(\dfrac{x^2}{${a}}-\dfrac{2x}{${a * a}}+\dfrac{2}{${a ** 3}}\right)+c$.<br>
Between 0 and 1: $e^{${a}}\left(${nice(1 / a - 2 / a ** 2 + 2 / a ** 3)}\right)-${par(nice(2 / a ** 3))}\approx${num(v)}$.`,
          };
        },
        () => {
          const L = [
            [T`\int_0^{\pi/2}x^2\sin x\,dx`, Math.PI - 2, T`\left[-x^2\cos x+2x\sin x+2\cos x\right]_0^{\pi/2}=\pi-2`],
            [T`\int_0^{\pi/2}x^2\cos x\,dx`, Math.PI ** 2 / 4 - 2, T`\left[x^2\sin x+2x\cos x-2\sin x\right]_0^{\pi/2}=\tfrac{\pi^2}4-2`],
            [T`\int_0^{\pi}x^2\sin x\,dx`, Math.PI ** 2 - 4, T`\left[-x^2\cos x+2x\sin x+2\cos x\right]_0^{\pi}=(\pi^2-2)-2=\pi^2-4`],
            [T`\int_1^{e}x(\ln x)^2\,dx`, (Math.E ** 2 - 1) / 4, T`u=(\ln x)^2:\ \left[\tfrac{x^2}2(\ln x)^2\right]-\int x\ln x\,dx=\tfrac{e^2}2-\left[\tfrac{x^2}2\ln x-\tfrac{x^2}4\right]_1^e=\tfrac{e^2-1}{4}`],
            [T`\int_1^{e}(\ln x)^2\,dx`, Math.E - 2, T`\left[x(\ln x)^2-2x\ln x+2x\right]_1^e=(e-2e+2e)-2=e-2`],
            [T`\int_0^{1}x^3e^{x}\,dx`, 6 - 2 * Math.E, T`\left[e^x(x^3-3x^2+6x-6)\right]_0^1=e(-2)-(-6)=6-2e`]];
          const [q, v, s] = pick(L);
          return { q: T`Evaluate $\displaystyle${q}$ exactly.`, fields: [{ label: 'value', ans: v }], sol: T`Repeated parts (or the tabular method): $${s}\approx${num(v)}$.` };
        },
        () => {
          const a = rnz(-2, 2), b = ri(1, 3), cs = Math.random() < 0.5, D = a * a + b * b;
          const up = Math.PI / (2 * b), E = Math.exp(a * up);
          const val = cs ? (b * E - a) / D : (a * E + b) / D;
          return {
            q: T`Evaluate $\displaystyle\int_0^{${pf(1, 2 * b)}}e^{${a}x}${cs ? '\\cos ' : '\\sin '}${b === 1 ? '' : b}x\,dx$.`,
            fields: [{ label: 'value', ans: val }],
            sol: T`Parts twice and the integral reappears: $I=\dfrac{e^{${a}x}(${cs ? `${a}\\cos${b}x+${b}\\sin${b}x` : `${a}\\sin${b}x-${b}\\cos${b}x`})}{${D}}$.<br>
At $x=${pf(1, 2 * b)}$: ${cs ? `$\\cos=0,\\ \\sin=1$` : `$\\sin=1,\\ \\cos=0$`}. Result $=${cs ? `\\dfrac{${b}e^{${nice(a / (2 * b))}\\pi}-${par(a)}}{${D}}` : `\\dfrac{${a}e^{${nice(a / (2 * b))}\\pi}+${b}}{${D}}`}\approx${num(val)}$.`,
          };
        },
      ],
    },
  ],
});
