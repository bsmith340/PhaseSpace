// CCEA GCE Mathematics A2 1 Pure Mathematics, part 2: differentiation, integration, numerical methods.
'use strict';

// simpson(f, a, b) — composite Simpson's rule — is shared from content-2.js
const dnum = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
const kx = (k, v = 'x') => (k === 1 ? v : k === -1 ? '-' + v : k + v);

topic({
  id: '_m3b', title: 'A2 1b', points: [
    /* ---------------- DIFFERENTIATION ---------------- */
    {
      id: 'm3_dstd', title: 'Differentiating eᵏˣ, ln kx, trigonometric and reciprocal trig functions', sims: [],
      notes: T`$$\frac{d}{dx}e^{kx}=ke^{kx}\qquad\frac{d}{dx}\ln kx=\frac1x\qquad\frac{d}{dx}\sin kx=k\cos kx\qquad\frac{d}{dx}\cos kx=-k\sin kx\qquad\frac{d}{dx}\tan kx=k\sec^2kx$$
$$\frac{d}{dx}\sec x=\sec x\tan x\qquad\frac{d}{dx}\operatorname{cosec}x=-\operatorname{cosec}x\cot x\qquad\frac{d}{dx}\cot x=-\operatorname{cosec}^2x$$
<ul><li>$x$ must be in <b>radians</b>. $\frac d{dx}\ln kx=\frac1x$ because $\ln kx=\ln k+\ln x$.</li><li>The reciprocal-trig results come from the quotient (or chain) rule.</li></ul>`,
      drills: [
        () => { const A = rnz(-4, 5), k = rnz(-3, 3), B = rnz(-5, 5), m = pick([1, 2, 3, 5]), Cc = rnz(-4, 4), n = pick([1, 2, 3]), x0 = pick([0.5, 1, 2]); const fp = A * k * Math.exp(k * x0) + B / x0 + Cc * n * Math.cos(n * x0);
          return { q: T`$y=${A}e^{${kx(k)}}${sgn(B)}\ln ${m === 1 ? '' : m}x${sgn(Cc)}\sin ${kx(n)}$. Find $\dfrac{dy}{dx}$ when $x=${x0}$.`, fields: [{ label: "dy/dx", ans: fp }],
            sol: T`$\dfrac{dy}{dx}=${A * k}e^{${kx(k)}}${sgn(B)}\cdot\dfrac1x${sgn(Cc * n)}\cos ${kx(n)}$. At $x=${x0}$: $${num(fp, 6)}$.` }; },
        () => { const f = pick(['sec', 'cosec', 'cot']), x0 = pick([Math.PI / 6, Math.PI / 4, Math.PI / 3]); const s = Math.sin(x0), c = Math.cos(x0), v = f === 'sec' ? s / (c * c) : f === 'cosec' ? -c / (s * s) : -1 / (s * s);
          const FN = { sec: '\\sec', cosec: '\\operatorname{cosec}', cot: '\\cot' }[f], D = { sec: '\\sec x\\tan x', cosec: '-\\operatorname{cosec}x\\cot x', cot: '-\\operatorname{cosec}^2x' }[f];
          return { q: T`Find the gradient of $y=${FN} x$ at $x=${pf(Math.round(x0 / Math.PI * 12), 12)}$ (exact or 4 s.f.).`, fields: [{ label: 'gradient', ans: v }], sol: T`$\dfrac{dy}{dx}=${D}$; at $x=${pf(Math.round(x0 / Math.PI * 12), 12)}$ this is $${num(v, 6)}$.` }; },
        () => { const k = pick([2, 3, 4]), A = rnz(-3, 3); const x0 = Math.PI / (4 * k), m = A * k * 2; // d/dx A tan kx = A k sec^2 kx, sec^2(pi/4)=2
          return { q: T`Find the gradient of $y=${A === 1 ? '' : A === -1 ? '-' : A}\tan ${k}x$ at $x=\frac{\pi}{${4 * k}}$.`, fields: [{ label: 'gradient', ans: m }], sol: T`$\dfrac{dy}{dx}=${A * k}\sec^2${k}x$. At $${k}x=\frac\pi4$, $\sec^2\frac\pi4=2$: gradient $${m}$.` }; },
      ],
    },
    {
      id: 'm3_rules', title: 'The chain, product and quotient rules', sims: [],
      notes: T`$$\text{Chain: }\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}\qquad\text{Product: }(uv)'=u'v+uv'\qquad\text{Quotient: }\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}$$
<ul><li>Chain rule shortcut: $\frac d{dx}[f(x)]^n=n[f(x)]^{n-1}f'(x)$; $\frac d{dx}e^{f(x)}=f'(x)e^{f(x)}$; $\frac d{dx}\ln f(x)=\frac{f'(x)}{f(x)}$.</li><li>Factorise answers (common factors such as $e^{2x}$ or $(x+1)^3$) — it makes stationary points easy.</li></ul>`,
      drills: [
        () => { const n = ri(1, 4), k = rnz(-3, 3), x0 = pick([0, 1, -1, 2]); const v = (n * x0 ** (n - 1) + k * x0 ** n) * Math.exp(k * x0);
          return { q: T`$y=x^{${n}}e^{${kx(k)}}$. Find $\dfrac{dy}{dx}$ at $x=${x0}$.`, fields: [{ label: 'dy/dx', ans: v }], sol: T`Product rule: $\dfrac{dy}{dx}=${n === 1 ? '' : n}x^{${n - 1}}e^{${kx(k)}}${sgn(k)}x^{${n}}e^{${kx(k)}}=x^{${n - 1}}e^{${kx(k)}}(${n}${sgn(k)}x)$. At $x=${x0}$: $${num(v, 6)}$.` }; },
        () => { let a, b, c, d; do { a = rnz(-5, 5); b = ri(-6, 6); c = rnz(-4, 4); d = rnz(-6, 6); } while (a * d - b * c === 0); const x0 = ri(-2, 2); if (c * x0 + d === 0) return null; const v = (a * d - b * c) / (c * x0 + d) ** 2;
          return { q: T`$y=\dfrac{${lnr(a, b)}}{${lnr(c, d)}}$. Find $\dfrac{dy}{dx}$ at $x=${x0}$.`, fields: [{ label: 'dy/dx', ans: v }], sol: T`Quotient rule: $\dfrac{${a}(${lnr(c, d)})-${c}(${lnr(a, b)})}{(${lnr(c, d)})^2}=\dfrac{${a * d - b * c}}{(${lnr(c, d)})^2}$. At $x=${x0}$: $${nice(v)}$.` }; },
        () => { const a = rnz(-3, 3), b = ri(-4, 5), n = pick([3, 4, 5, -1, -2, 0.5]), x0 = 1; const inner = a + b; if (inner <= 0 && !Number.isInteger(n)) return null; if (inner === 0 && n < 0) return null; const v = n * inner ** (n - 1) * 2 * a * x0;
          return { q: T`$y=(${poly([[a, 'x^2'], [b, '']])})^{${nice(n)}}$. Find $\dfrac{dy}{dx}$ at $x=1$.`, fields: [{ label: 'dy/dx', ans: v }], sol: T`Chain rule: $\dfrac{dy}{dx}=${nice(n)}(${poly([[a, 'x^2'], [b, '']])})^{${nice(n - 1)}}\cdot${2 * a}x$. At $x=1$: $${nice(n)}(${inner})^{${nice(n - 1)}}(${2 * a})=${num(v, 6)}$.` }; },
        () => { const k = pick([1, 2, 3, 4, 0.5]), A = pick([1, 2, 3]); return { q: T`Find the coordinates of the stationary point of $y=${A === 1 ? '' : A}xe^{-${k === 1 ? '' : k}x}$.`, fields: [{ label: 'x', ans: 1 / k }, { label: 'y', ans: A / k * Math.exp(-1) }],
          sol: T`$\dfrac{dy}{dx}=${A}e^{-${k}x}(1-${k}x)=0\Rightarrow x=${nice(1 / k)}$ (since $e^{-${k}x}\gt0$). $y=${nice(A / k)}e^{-1}=${num(A / k / Math.E, 5)}$.` }; },
      ],
    },
    {
      id: 'm3_impl', title: 'Implicit & parametric differentiation', sims: [],
      notes: T`<ul><li><b>Implicit</b>: differentiate every term with respect to $x$; a term in $y$ picks up a factor $\frac{dy}{dx}$ (chain rule): $\frac d{dx}y^2=2y\frac{dy}{dx}$, $\frac d{dx}(xy)=y+x\frac{dy}{dx}$. Then collect the $\frac{dy}{dx}$ terms.</li>
<li><b>Parametric</b> $x=f(t)$, $y=g(t)$: $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$, and $\dfrac{d^2y}{dx^2}=\dfrac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{dx/dt}$.</li>
<li>Tangents and normals then follow as usual, using a point and the gradient.</li></ul>`,
      drills: [
        () => { const a = ri(-3, 3), x0 = ri(-3, 3), y0 = rnz(-3, 3); const c = x0 * x0 + y0 * y0 + a * x0 * y0; const den = 2 * y0 + a * x0; if (den === 0) return null; const g = -(2 * x0 + a * y0) / den;
          return { q: T`Find $\dfrac{dy}{dx}$ at the point $(${x0},\ ${y0})$ on the curve $x^2+y^2${a ? (a < 0 ? '-' : '+') + c1(Math.abs(a)) + 'xy' : ''}=${c}$.`, fields: [{ label: 'dy/dx', ans: g }],
            sol: T`$2x+2y\dfrac{dy}{dx}${a ? `${sgn(a)}\\left(y+x\\dfrac{dy}{dx}\\right)` : ''}=0\Rightarrow\dfrac{dy}{dx}=-\dfrac{2x${a ? sgn(a) + 'y' : ''}}{2y${a ? sgn(a) + 'x' : ''}}$. At $(${x0},${y0})$: $${nice(g)}$.` }; },
        () => { const p = pick([2, 3]), q = pick([3, 4]), t0 = rnz(-3, 3); if (p === q) return null; const g = q * t0 ** (q - 1) / (p * t0 ** (p - 1)), g2 = (q * (q - p) / p * t0 ** (q - p - 1)) / (p * t0 ** (p - 1));
          return { q: T`A curve has $x=t^{${p}}$, $y=t^{${q}}$. Find $\dfrac{dy}{dx}$ and $\dfrac{d^2y}{dx^2}$ when $t=${t0}$.`, fields: [{ label: 'dy/dx', ans: g }, { label: 'd²y/dx²', ans: g2 }],
            sol: T`$\dfrac{dy}{dx}=\dfrac{${q}t^{${q - 1}}}{${p}t^{${p - 1}}}=${nice(q / p)}t^{${q - p}}$. $\dfrac{d^2y}{dx^2}=\dfrac{\frac d{dt}\left(${nice(q / p)}t^{${q - p}}\right)}{${p}t^{${p - 1}}}$. At $t=${t0}$: $${nice(g)}$ and $${nice(g2)}$.` }; },
        () => { const a = pick([1, 2, 3]), t0 = rnz(-3, 3); // x = a t^2, y = 2 a t → dy/dx = 1/t ; tangent y = x/t + a t
          return { q: T`The curve $x=${a === 1 ? '' : a}t^2$, $y=${2 * a}t$. Find the gradient of the tangent at $t=${t0}$, and its $y$-intercept.`, fields: [{ label: 'gradient', ans: 1 / t0 }, { label: 'y-intercept', ans: a * t0 }],
            sol: T`$\dfrac{dy}{dx}=\dfrac{${2 * a}}{${2 * a}t}=\dfrac1t=${nice(1 / t0)}$. Point $(${a * t0 * t0},\ ${2 * a * t0})$: $y-${2 * a * t0}=${nice(1 / t0)}(x-${a * t0 * t0})\Rightarrow y=${nice(1 / t0)}x${sgn(a * t0)}$.` }; },
      ],
    },
    {
      id: 'm3_cde', title: 'Constructing differential equations', sims: [],
      notes: T`<ul><li>"The rate of change of $P$ with respect to $t$" is $\frac{dP}{dt}$. "Proportional to" introduces a constant $k$: $\frac{dP}{dt}=kP$.</li><li>Decreasing quantities: either write $-k$ with $k\gt0$, or state that $k\lt0$.</li>
<li>Newton's law of cooling: $\frac{d\theta}{dt}=-k(\theta-\theta_0)$. Inversely proportional: $\frac{dy}{dx}=\frac ky$.</li><li>Geometric rates: if $V=\frac43\pi r^3$, then $\frac{dV}{dt}=\frac{dV}{dr}\cdot\frac{dr}{dt}$ (chain rule).</li></ul>`,
      drills: [
        () => { const L = [['the rate at which a population $P$ grows is proportional to the population', 'kP'], ['the volume $V$ of water decreases at a rate proportional to $\\sqrt V$', '-k\\sqrt V'], ['the temperature $\\theta$ of a body falls at a rate proportional to the amount by which it exceeds $20^\\circ$C', '-k(\\theta-20)'], ['the rate of increase of $y$ is inversely proportional to $y^2$', '\\dfrac{k}{y^2}'], ['a radioactive mass $m$ decays at a rate proportional to its mass', '-km']];
          const [s, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 3)]); return { q: T`Model this as a differential equation: "${s}" ($k\gt0$ constant). The rate of change equals…`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(r) }, sol: T`The rate of change equals $${r}$ (with $k\gt0$; a minus sign shows a decrease).` }; },
        () => { const P = pick([200, 500, 800, 1200]), rate = pick([10, 15, 24, 30, 40]); return { q: T`A population grows at a rate proportional to its size, $\dfrac{dP}{dt}=kP$. When $P=${P}$ it is increasing at $${rate}$ per year. Find $k$.`, fields: [{ label: 'k', ans: rate / P }], sol: T`$${rate}=k(${P})\Rightarrow k=${nice(rate / P)}$ per year.` }; },
        () => { const r = pick([2, 3, 4, 5]), dr = pick([0.1, 0.2, 0.5]); const dV = 4 * Math.PI * r * r * dr; return { q: T`The radius of a spherical balloon increases at $${dr}$ cm s⁻¹. Find the rate of increase of its volume when the radius is $${r}$ cm ($V=\frac43\pi r^3$).`, fields: [{ label: 'dV/dt', ans: dV }],
          sol: T`$\dfrac{dV}{dt}=\dfrac{dV}{dr}\cdot\dfrac{dr}{dt}=4\pi r^2\times${dr}=4\pi(${r * r})(${dr})=${num(dV, 5)}$ cm³ s⁻¹.` }; },
      ],
    },
    /* ---------------- INTEGRATION ---------------- */
    {
      id: 'm3_istd', title: 'Integrating eᵏˣ, 1/x, sin kx, cos kx & related functions', sims: ['m_area'],
      notes: T`$$\int e^{kx}dx=\frac1ke^{kx}+c\qquad\int\frac1x\,dx=\ln|x|+c\qquad\int\sin kx\,dx=-\frac1k\cos kx+c\qquad\int\cos kx\,dx=\frac1k\sin kx+c\qquad\int\sec^2kx\,dx=\frac1k\tan kx+c$$
<ul><li>Linear inside: $\int f(ax+b)dx=\frac1aF(ax+b)+c$, e.g. $\int\frac{1}{2x+3}dx=\frac12\ln|2x+3|+c$.</li><li>Recognise $\int\frac{f'(x)}{f(x)}dx=\ln|f(x)|+c$.</li></ul>`,
      drills: [
        () => { const A = rnz(-4, 4), k = pick([1, 2, 3, -1]), B = rnz(-5, 5), a = 1, b = pick([2, 3, 4]); const I = A / k * (Math.exp(k * b) - Math.exp(k * a)) + B * Math.log(b / a);
          return { q: T`Evaluate $\displaystyle\int_{1}^{${b}}\left(${A}e^{${kx(k)}}${sgn(B)}\frac1x\right)dx$ (3 s.f. or exact).`, fields: [{ label: 'value', ans: I }], sol: T`$\left[${nice(A / k)}e^{${kx(k)}}${sgn(B)}\ln x\right]_1^{${b}}=${nice(A / k)}(e^{${k * b}}-e^{${k}})${sgn(B)}\ln${b}=${num(I, 5)}$.` }; },
        () => { const a = pick([2, 3, 4, 5]), b = ri(1, 6), lo = 0, hi = ri(1, 4); const I = Math.log((a * hi + b) / (a * lo + b)) / a; return { q: T`Evaluate $\displaystyle\int_0^{${hi}}\frac{1}{${a}x+${b}}\,dx$ exactly.`, fields: [{ label: 'value', ans: I }], sol: T`$\left[\tfrac1{${a}}\ln|${a}x+${b}|\right]_0^{${hi}}=\tfrac1{${a}}\ln\tfrac{${a * hi + b}}{${b}}=${num(I, 5)}$.` }; },
        () => { const k = pick([1, 2, 3, 4]), A = rnz(-4, 4), f = pick(['sin', 'cos']), FN = f === 'sin' ? '\\sin' : '\\cos', I = A / k; // both integrals over [0, π/2k] equal 1/k
          return { q: T`Evaluate $\displaystyle\int_0^{\pi/${2 * k}}${A === 1 ? '' : A === -1 ? '-' : A}${FN} ${kx(k)}\,dx$.`, fields: [{ label: 'value', ans: I }],
            sol: T`${f === 'cos' ? `$\\left[\\tfrac{${A}}{${k}}\\sin ${kx(k)}\\right]_0^{\\pi/${2 * k}}=\\tfrac{${A}}{${k}}(1-0)$` : `$\\left[-\\tfrac{${A}}{${k}}\\cos ${kx(k)}\\right]_0^{\\pi/${2 * k}}=-\\tfrac{${A}}{${k}}(0-1)$`}$=${nice(I)}$.` }; },
        () => { const a = rnz(-3, 3), b = ri(1, 9), hi = ri(1, 3); const g = x => a * x * x + b; if (g(0) <= 0 || g(hi) <= 0) return null; return { q: T`Evaluate $\displaystyle\int_0^{${hi}}\frac{${2 * a}x}{${poly([[a, 'x^2'], [b, '']])}}\,dx$ exactly.`, fields: [{ label: 'value', ans: Math.log(g(hi) / g(0)) }],
          sol: T`The top is the derivative of the bottom: $\left[\ln|${poly([[a, 'x^2'], [b, '']])}|\right]_0^{${hi}}=\ln\dfrac{${g(hi)}}{${b}}=${num(Math.log(g(hi) / g(0)), 5)}$.` }; },
      ],
    },
    {
      id: 'm3_area2', title: 'Area between two curves; integration as the limit of a sum', sims: ['m_area'],
      notes: T`<ul><li>Area between $y=f(x)$ (above) and $y=g(x)$ (below) from $a$ to $b$: $\displaystyle\int_a^b\big(f(x)-g(x)\big)dx$ — valid even if parts are below the $x$-axis.</li><li>Find the limits from the intersections; check which curve is on top (it may swap — split the integral).</li>
<li><b>Limit of a sum</b>: $\displaystyle\int_a^bf(x)\,dx=\lim_{\delta x\to0}\sum_{x=a}^{b}f(x)\,\delta x$ — the area is the limit of the total area of thin strips.</li></ul>`,
      drills: [
        () => { const k = pick([1, 2, 3, 4, 5, 6]); return { q: T`Find the area enclosed between $y=x^2$ and $y=${k === 1 ? '' : k}x$.`, fields: [{ label: 'area', ans: k ** 3 / 6 }], sol: T`Intersect: $x^2=${k}x\Rightarrow x=0,\ ${k}$. Area $=\displaystyle\int_0^{${k}}(${k}x-x^2)dx=\left[\tfrac{${k}}{2}x^2-\tfrac13x^3\right]_0^{${k}}=${nice(k ** 3 / 6)}$.` }; },
        () => { const a = ri(1, 4), b = a + ri(2, 8); // y = b - x^2 and y = x^2 + a … wait want intersection: b - x^2 = x^2 + a → x = ±√((b-a)/2)
          const c = Math.sqrt((b - a) / 2), A = 2 * ((b - a) * c - 2 * c ** 3 / 3);
          return { q: T`Find the area enclosed between $y=${b}-x^2$ and $y=x^2+${a}$.`, fields: [{ label: 'area', ans: A }], sol: T`$${b}-x^2=x^2+${a}\Rightarrow x=\pm${num(c, 5)}$. Area $=\displaystyle\int_{-c}^{c}(${b - a}-2x^2)dx=2\left(${b - a}c-\tfrac23c^3\right)=${num(A, 5)}$.` }; },
        () => { const L = [['$\\displaystyle\\lim_{\\delta x\\to0}\\sum_{x=0}^{2}x^3\\,\\delta x$', '$\\displaystyle\\int_0^2x^3\\,dx=4$'], ['$\\displaystyle\\lim_{\\delta x\\to0}\\sum_{x=1}^{e}\\frac1x\\,\\delta x$', '$\\displaystyle\\int_1^e\\frac1x\\,dx=1$'], ['$\\displaystyle\\lim_{\\delta x\\to0}\\sum_{x=0}^{\\pi}\\sin x\\,\\delta x$', '$\\displaystyle\\int_0^\\pi\\sin x\\,dx=2$']];
          const [s, r] = pick(L), opts = shuffle(L.map(x => x[1]).concat(['$0$, because $\\delta x\\to0$'])); return { q: T`Evaluate ${s}.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`The limit of the sum of strip areas is the definite integral: ${r}.` }; },
      ],
    },
    {
      id: 'm3_subs', title: 'Integration by substitution', sims: [],
      notes: T`<ul><li>Choose $u$ (usually the inside of a bracket or root), find $\frac{du}{dx}$, replace $dx$, change the <b>limits</b> to $u$-values, integrate, and (for indefinite integrals) substitute back.</li>
<li>It reverses the chain rule: $\int f'(g(x))g'(x)\,dx=f(g(x))+c$.</li><li>Standard patterns: $\int x(x^2+1)^n dx$ with $u=x^2+1$; $\int x\sqrt{x+1}\,dx$ with $u=x+1$; $\int\frac{f'(x)}{f(x)}dx=\ln|f(x)|$.</li></ul>`,
      drills: [
        () => { const a = ri(1, 5), n = ri(2, 5), b = ri(1, 3); const I = (((b * b + a) ** (n + 1)) - a ** (n + 1)) / (2 * (n + 1));
          return { q: T`Use $u=x^2+${a}$ to evaluate $\displaystyle\int_0^{${b}}x(x^2+${a})^{${n}}dx$.`, fields: [{ label: 'value', ans: I }], sol: T`$du=2x\,dx$; limits $u=${a}$ to $${b * b + a}$. $\displaystyle\int_{${a}}^{${b * b + a}}\tfrac12u^{${n}}du=\left[\tfrac{u^{${n + 1}}}{${2 * (n + 1)}}\right]_{${a}}^{${b * b + a}}=${nice(I)}$.` }; },
        () => { const a = ri(1, 4), hi = pick([3, 5, 8]); const f = x => x * Math.sqrt(x + a); const I = simpson(f, 0, hi);
          return { q: T`Use $u=x+${a}$ to evaluate $\displaystyle\int_0^{${hi}}x\sqrt{x+${a}}\,dx$ (3 s.f.).`, fields: [{ label: 'value', ans: I }],
            sol: T`$x=u-${a}$, $dx=du$, limits $${a}$ to $${hi + a}$: $\displaystyle\int(u-${a})u^{1/2}du=\left[\tfrac25u^{5/2}-\tfrac{${2 * a}}{3}u^{3/2}\right]_{${a}}^{${hi + a}}=${num(I, 5)}$.` }; },
        () => { const k = pick([2, 3, 4]), hi = pick([Math.PI / 2, Math.PI / 6, Math.PI / 4]); const I = (1 - Math.cos(hi) ** (k + 1)) / (k + 1); // ∫ sin x cos^k x dx = -cos^{k+1}/(k+1)
          return { q: T`Use $u=\cos x$ to evaluate $\displaystyle\int_0^{${pf(Math.round(hi / Math.PI * 12), 12)}}\sin x\cos^{${k}}x\,dx$.`, fields: [{ label: 'value', ans: I }], sol: T`$du=-\sin x\,dx$: $\displaystyle\int_{1}^{\cos(\cdot)}-u^{${k}}du=\left[\tfrac{u^{${k + 1}}}{${k + 1}}\right]^{1}_{${num(Math.cos(hi), 4)}}=${num(I, 5)}$.` }; },
      ],
    },
    {
      id: 'm3_parts', title: 'Integration by parts', sims: [],
      notes: T`$$\int u\frac{dv}{dx}\,dx=uv-\int v\frac{du}{dx}\,dx$$
<ul><li>It reverses the product rule. Choose $u$ to be the part that gets simpler when differentiated (a power of $x$), <b>except</b> with $\ln x$: then $u=\ln x$.</li><li>$\int\ln x\,dx$: write it as $\int1\cdot\ln x\,dx$ with $u=\ln x$, giving $x\ln x-x+c$.</li><li>For definite integrals, apply the limits to $uv$ too.</li></ul>`,
      drills: [
        () => { const k = pick([1, 2, 3, -1, 0.5]); const I = Math.exp(k) / k - (Math.exp(k) - 1) / (k * k); return { q: T`Evaluate $\displaystyle\int_0^1xe^{${kx(k)}}dx$ (3 s.f. or exact).`, fields: [{ label: 'value', ans: I }],
          sol: T`$u=x$, $\frac{dv}{dx}=e^{${kx(k)}}$: $\left[\tfrac{x}{${nice(k)}}e^{${kx(k)}}\right]_0^1-\displaystyle\int_0^1\tfrac1{${nice(k)}}e^{${kx(k)}}dx=\tfrac{e^{${nice(k)}}}{${nice(k)}}-\tfrac{e^{${nice(k)}}-1}{${nice(k * k)}}=${num(I, 5)}$.` }; },
        () => { const k = pick([1, 2, 3]); const up = Math.PI / (2 * k), I = up / k - 1 / (k * k); return { q: T`Evaluate $\displaystyle\int_0^{\pi/${2 * k}}x\cos ${kx(k)}\,dx$.`, fields: [{ label: 'value', ans: I }],
          sol: T`$u=x$, $v=\tfrac1{${k}}\sin ${kx(k)}$: $\left[\tfrac{x}{${k}}\sin ${kx(k)}\right]_0^{\pi/${2 * k}}-\tfrac1{${k}}\displaystyle\int\sin ${kx(k)}\,dx=\tfrac{\pi}{${2 * k * k}}-\tfrac{1}{${k * k}}=${num(I, 5)}$.` }; },
        () => { const n = ri(1, 3); const I = Math.exp(n + 1) / (n + 1) - (Math.exp(n + 1) - 1) / (n + 1) ** 2; return { q: T`Evaluate $\displaystyle\int_1^ex^{${n}}\ln x\,dx$.`, fields: [{ label: 'value', ans: I }],
          sol: T`$u=\ln x$, $\frac{dv}{dx}=x^{${n}}$: $\left[\tfrac{x^{${n + 1}}}{${n + 1}}\ln x\right]_1^e-\displaystyle\int_1^e\tfrac{x^{${n}}}{${n + 1}}dx=\tfrac{e^{${n + 1}}}{${n + 1}}-\tfrac{e^{${n + 1}}-1}{${(n + 1) ** 2}}=${num(I, 5)}$.` }; },
        () => { const b = pick([2, 3, Math.E, 4]); const I = b * Math.log(b) - b + 1; return { q: T`Evaluate $\displaystyle\int_1^{${b === Math.E ? 'e' : b}}\ln x\,dx$.`, fields: [{ label: 'value', ans: I }], sol: T`$\int\ln x\,dx=x\ln x-x$ (parts with $u=\ln x$, $\frac{dv}{dx}=1$). $\big[x\ln x-x\big]_1^{${b === Math.E ? 'e' : b}}=${num(I, 5)}$.` }; },
      ],
    },
    {
      id: 'm3_ipf', title: 'Integration using partial fractions', sims: ['pfrac'],
      notes: T`<ul><li>Split into partial fractions first, then integrate each term: $\int\frac{A}{x-a}dx=A\ln|x-a|$, $\int\frac{B}{(x-b)^2}dx=-\frac{B}{x-b}$.</li><li>Combine logs at the end: $A\ln p+B\ln q=\ln(p^Aq^B)$. Check the integration range doesn't cross an asymptote.</li></ul>`,
      drills: [
        () => { let a, b; do { a = rnz(-3, 3); b = rnz(-3, 3); } while (a === b); const A = rnz(-4, 4), B = rnz(-4, 4), lo = Math.max(a, b) + 1, hi = lo + ri(1, 3); const I = A * Math.log((hi - a) / (lo - a)) + B * Math.log((hi - b) / (lo - b));
          return { q: T`Evaluate $\displaystyle\int_{${lo}}^{${hi}}\frac{${lnr(A + B, -(A * b + B * a))}}{(x${sgn(-a)})(x${sgn(-b)})}dx$ (3 s.f.).`, fields: [{ label: 'value', ans: I }],
            sol: T`Partial fractions: $\dfrac{${A}}{x${sgn(-a)}}+\dfrac{${B}}{x${sgn(-b)}}$. Integral $=\big[${A}\ln|x${sgn(-a)}|${sgn(B)}\ln|x${sgn(-b)}|\big]_{${lo}}^{${hi}}=${num(I, 5)}$.` }; },
        () => { const b = pick([1, 2, 3]), A = rnz(-3, 3), Bc = rnz(-4, 4), lo = b + 1, hi = b + 3; // A/(x-b) + B/(x-b)^2
          const I = A * Math.log((hi - b) / (lo - b)) + Bc * (1 / (lo - b) - 1 / (hi - b));
          return { q: T`Evaluate $\displaystyle\int_{${lo}}^{${hi}}\left(\frac{${A}}{x-${b}}+\frac{${Bc}}{(x-${b})^2}\right)dx$.`, fields: [{ label: 'value', ans: I }],
            sol: T`$\left[${A}\ln|x-${b}|-\dfrac{${Bc}}{x-${b}}\right]_{${lo}}^{${hi}}=${A}\ln${hi - b}${sgn(Bc)}\left(1-\tfrac1{${hi - b}}\right)=${num(I, 5)}$.` }; },
      ],
    },
    {
      id: 'm3_sde', title: 'Separable differential equations', sims: ['slopefield'],
      notes: T`<ul><li>Separate: $\dfrac{dy}{dx}=f(x)g(y)\Rightarrow\displaystyle\int\frac{1}{g(y)}dy=\int f(x)\,dx$. Include <b>one</b> constant $c$.</li><li>Use the initial condition to find $c$ (a <b>particular</b> solution).</li>
<li>Exponential growth/decay: $\frac{dy}{dt}=ky\Rightarrow y=Ae^{kt}$. Newton cooling: $\theta=\theta_0+Ae^{-kt}$.</li><li>Interpret: what happens as $t\to\infty$? Is the model valid for all $t$?</li></ul>`,
      drills: [
        () => { const A = pick([50, 100, 200, 500]), k = pick([0.1, 0.2, -0.1, 0.05, -0.3]), t = pick([2, 5, 10]); return { q: T`Solve $\dfrac{dy}{dt}=${k}y$ with $y=${A}$ when $t=0$, and find $y$ when $t=${t}$.`, fields: [{ label: 'y', ans: A * Math.exp(k * t) }], sol: T`$\int\frac{dy}{y}=\int${k}\,dt\Rightarrow\ln y=${k}t+c\Rightarrow y=${A}e^{${k}t}$. At $t=${t}$: $${num(A * Math.exp(k * t), 5)}$.` }; },
        () => { const a = ri(1, 5), x0 = ri(1, 4); return { q: T`Solve $\dfrac{dy}{dx}=\dfrac xy$ with $y=${a}$ when $x=0$ ($y\gt0$). Find $y$ when $x=${x0}$.`, fields: [{ label: 'y', ans: Math.sqrt(x0 * x0 + a * a) }], sol: T`$\int y\,dy=\int x\,dx\Rightarrow\tfrac12y^2=\tfrac12x^2+c$; $c=\tfrac{${a * a}}2$, so $y^2=x^2+${a * a}$ and $y=\sqrt{${x0 * x0 + a * a}}=${num(Math.sqrt(x0 * x0 + a * a), 5)}$.` }; },
        () => { const R = pick([18, 20, 22]), T0 = pick([80, 90, 95]), T1 = pick([60, 65, 70]), t1 = pick([5, 10]), t2 = pick([15, 20, 30]); const k = Math.log((T0 - R) / (T1 - R)) / t1, T2 = R + (T0 - R) * Math.exp(-k * t2);
          return { q: T`A drink cools according to $\dfrac{d\theta}{dt}=-k(\theta-${R})$. It is $${T0}^\circ$C at $t=0$ and $${T1}^\circ$C at $t=${t1}$ min. Find $k$ and the temperature at $t=${t2}$.`, fields: [{ label: 'k', ans: k }, { label: 'θ', ans: T2 }],
            sol: T`$\int\frac{d\theta}{\theta-${R}}=-\int k\,dt\Rightarrow\theta=${R}+${T0 - R}e^{-kt}$. $${T1}=${R}+${T0 - R}e^{-${t1}k}\Rightarrow k=\tfrac1{${t1}}\ln\tfrac{${T0 - R}}{${T1 - R}}=${num(k, 4)}$. At $t=${t2}$: $${num(T2, 4)}^\circ$C.` }; },
      ],
    },
    {
      id: 'm3_vol', title: 'Volumes of revolution about the x-axis', sims: [],
      notes: T`$$V=\pi\int_a^by^2\,dx$$
<ul><li>Rotating the area under $y=f(x)$ from $x=a$ to $x=b$ through $360^\circ$ about the $x$-axis: each thin disc has volume $\pi y^2\,\delta x$; adding and taking the limit gives the integral.</li><li>Square $y$ first, then integrate. Leave answers in terms of $\pi$ when exact values are asked.</li></ul>`,
      drills: [
        () => { const n = pick([1, 2, 3]), a = ri(1, 3); const V = Math.PI * a ** (2 * n + 1) / (2 * n + 1); return { q: T`The region under $y=x^{${n}}$ from $x=0$ to $x=${a}$ is rotated through $360^\circ$ about the $x$-axis. Find the volume (in terms of $\pi$ or 3 s.f.).`, fields: [{ label: 'V', ans: V }],
          sol: T`$V=\pi\displaystyle\int_0^{${a}}x^{${2 * n}}dx=\pi\left[\tfrac{x^{${2 * n + 1}}}{${2 * n + 1}}\right]_0^{${a}}=\tfrac{${a ** (2 * n + 1)}}{${2 * n + 1}}\pi=${num(V, 5)}$.` }; },
        () => { const k = pick([1, 0.5, 2]); const V = Math.PI * (Math.exp(2 * k) - 1) / (2 * k); return { q: T`Find the volume generated when the region under $y=e^{${kx(k)}}$ from $x=0$ to $x=1$ is rotated about the $x$-axis.`, fields: [{ label: 'V', ans: V }], sol: T`$V=\pi\displaystyle\int_0^1e^{${kx(2 * k)}}dx=\tfrac{\pi}{${nice(2 * k)}}(e^{${nice(2 * k)}}-1)=${num(V, 5)}$.` }; },
        () => { const a = pick([2, 3, 4, 5]); const V = Math.PI * (1 - 1 / a); return { q: T`Find the volume generated when the region under $y=\frac1x$ from $x=1$ to $x=${a}$ is rotated about the $x$-axis.`, fields: [{ label: 'V', ans: V }], sol: T`$V=\pi\displaystyle\int_1^{${a}}x^{-2}dx=\pi\left[-\tfrac1x\right]_1^{${a}}=\pi\left(1-\tfrac1{${a}}\right)=${num(V, 5)}$.` }; },
      ],
    },
    /* ---------------- NUMERICAL METHODS ---------------- */
    {
      id: 'm3_root', title: 'Locating roots: change of sign', sims: ['m3_iter'],
      notes: T`<ul><li>If $f$ is <b>continuous</b> on $[a,b]$ and $f(a)$, $f(b)$ have opposite signs, then $f(x)=0$ has at least one root between $a$ and $b$.</li><li>Show the values of $f(a)$ and $f(b)$, state the sign change and that $f$ is continuous, then conclude.</li>
<li>To show a root is $\alpha$ correct to 2 d.p., check the sign of $f$ at $\alpha\pm0.005$.</li><li>It can fail: an asymptote (e.g. $\frac1x$ changes sign at $0$ without a root), or an even number of roots (or a repeated root) in the interval gives no sign change.</li></ul>`,
      drills: [
        () => { const a = ri(-3, 3), b = ri(-5, 5), c = ri(-9, 9); const f = x => x ** 3 + a * x * x + b * x + c; let N = null; for (let k = -6; k <= 6; k++) if (f(k) * f(k + 1) < 0) { N = k; break; } if (N === null) return null;
          return { q: T`Show that $f(x)=${poly([[1, 'x^3'], [a, 'x^2'], [b, 'x'], [c, '']])}$ has a root in an interval $[N,\ N+1]$ for an integer $N$. Find the smallest such $N$ (searching from $-6$), and $f(N)$, $f(N+1)$.`, fields: [{ label: 'N', ans: N }, { label: 'f(N)', ans: f(N) }, { label: 'f(N+1)', ans: f(N + 1) }],
            sol: T`$f(${N})=${f(N)}$ and $f(${N + 1})=${f(N + 1)}$: a change of sign, and $f$ is continuous (a polynomial), so there is a root in $[${N},${N + 1}]$.` }; },
        () => { const L = [['$f(x)=\\frac{1}{x-2}$ on $[1,3]$', 'No — $f$ is not continuous at $x=2$ (asymptote), so the sign change does not show a root'], ['$f(x)=(x-1.5)^2$ on $[1,2]$', 'No sign change, yet there is a (repeated) root at $1.5$'], ['$f(x)=x^3-2$ on $[1,2]$', 'Yes — $f$ is continuous and changes sign, so there is a root']];
          const [s, r] = pick(L), opts = shuffle(L.map(x => x[1]).concat(['Yes — a sign change always means exactly one root'])); return { q: T`Consider ${s}. Does the change-of-sign method correctly locate a root here?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
        () => { const c = ri(3, 30); const f = x => x ** 3 + x - c; let r = Math.cbrt(c); for (let i = 0; i < 60; i++) r -= f(r) / (3 * r * r + 1); const r2 = Math.round(r * 100) / 100; if (Math.abs(r - r2) > 0.0048) return null; // too close to a rounding boundary to be a fair question
          return { q: T`The equation $x^3+x-${c}=0$ has one real root $\alpha$. Find $\alpha$ correct to 2 decimal places, and justify it with a change of sign.`, fields: [{ label: 'α (2 d.p.)', ans: r2, tol: { abs: 0.004 } }],
            sol: T`Iterating (or Newton–Raphson) gives $\alpha\approx${r.toFixed(4)}$. Check: $f(${(r2 - 0.005).toFixed(3)})=${num(f(r2 - 0.005), 4)}$ and $f(${(r2 + 0.005).toFixed(3)})=${num(f(r2 + 0.005), 4)}$ — opposite signs, $f$ continuous, so $${(r2 - 0.005).toFixed(3)}\lt\alpha\lt${(r2 + 0.005).toFixed(3)}$ and $\alpha=${r2.toFixed(2)}$ to 2 d.p.` }; },
      ],
    },
    {
      id: 'm3_iter', title: 'Iteration & the Newton–Raphson method', sims: ['m3_iter'],
      notes: T`<ul><li><b>Fixed-point iteration</b>: rearrange $f(x)=0$ as $x=g(x)$ and use $x_{n+1}=g(x_n)$. It converges near a root $\alpha$ if $|g'(\alpha)|\lt1$ (staircase or cobweb diagram); otherwise it diverges.</li>
<li><b>Newton–Raphson</b>: $x_{n+1}=x_n-\dfrac{f(x_n)}{f'(x_n)}$ — follow the tangent to the axis. (In the formula booklet.) It fails if $f'(x_n)\approx0$ (tangent nearly horizontal) or the start is far from the root.</li>
<li>Many problems can't be solved exactly; numerical methods give answers to any accuracy — always check with a sign change.</li></ul>`,
      drills: [
        () => { const c = pick([2, 3, 5, 7, 10]), x0 = pick([1, 1.5, 2]); const g = x => Math.cbrt(c - x); let x = x0; const xs = []; for (let i = 0; i < 3; i++) { x = g(x); xs.push(x); }
          return { q: T`Use $x_{n+1}=\sqrt[3]{${c}-x_n}$ with $x_0=${x0}$ to find $x_3$ (4 d.p.).`, fields: [{ label: 'x₃', ans: xs[2], tol: { abs: 6e-5 } }], sol: T`$x_1=${xs[0].toFixed(5)}$, $x_2=${xs[1].toFixed(5)}$, $x_3=${xs[2].toFixed(4)}$. This is a root of $x^3+x-${c}=0$.` }; },
        () => { const a = ri(-3, 3), b = ri(-6, 4), c = ri(-8, 8), x0 = pick([1, 2, -1, 1.5, 0.5]); const f = x => x ** 3 + a * x * x + b * x + c, fp = x => 3 * x * x + 2 * a * x + b; if (Math.abs(fp(x0)) < 0.5) return null; const x1 = x0 - f(x0) / fp(x0);
          return { q: T`Apply one step of the Newton–Raphson method to $f(x)=${poly([[1, 'x^3'], [a, 'x^2'], [b, 'x'], [c, '']])}$ with $x_0=${x0}$. Find $x_1$.`, fields: [{ label: 'x₁', ans: x1 }], sol: T`$f'(x)=${poly([[3, 'x^2'], [2 * a, 'x'], [b, '']])}$. $x_1=${x0}-\dfrac{f(${x0})}{f'(${x0})}=${x0}-\dfrac{${num(f(x0), 5)}}{${num(fp(x0), 5)}}=${num(x1, 6)}$.` }; },
        () => { const L = [['$g\'(x)$ satisfies $|g\'(\\alpha)|\\lt1$ near the root', 'The iteration converges to $\\alpha$'], ['$|g\'(\\alpha)|\\gt1$ near the root', 'The iteration diverges from $\\alpha$'], ['$f\'(x_0)=0$ in Newton–Raphson', 'The method fails: the tangent is horizontal and never meets the $x$-axis']];
          const [s, r] = pick(L), opts = shuffle(L.map(x => x[1]).concat(['The method always converges whatever the starting value'])); return { q: T`What happens when ${s}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
      ],
    },
    {
      id: 'm3_trap', title: 'The trapezium rule', sims: ['m3_trap'],
      notes: T`$$\int_a^by\,dx\approx\tfrac12h\big\{(y_0+y_n)+2(y_1+y_2+\dots+y_{n-1})\big\},\qquad h=\frac{b-a}{n}$$
<ul><li>$n$ strips need $n+1$ ordinates. (In the formula booklet.)</li><li>If the curve is <b>concave up</b> ("convex", $f''\gt0$) the trapezia lie above it: an <b>overestimate</b>; concave down: underestimate.</li><li>More strips give a better estimate. Percentage error $=\frac{|\text{estimate}-\text{exact}|}{\text{exact}}\times100\%$.</li></ul>`,
      drills: [
        () => { const F = pick([['\\sqrt{1+x^2}', x => Math.sqrt(1 + x * x)], ['e^{-x^2}', x => Math.exp(-x * x)], ['\\ln(1+x)', x => Math.log(1 + x)], ['\\frac{1}{1+x}', x => 1 / (1 + x)], ['x\\sin x', x => x * Math.sin(x)]]), a = 0, b = pick([1, 2]), n = pick([2, 4, 5]); const h = (b - a) / n, ys = Array.from({ length: n + 1 }, (_, i) => F[1](a + i * h)); const T_ = h / 2 * (ys[0] + ys[n] + 2 * ys.slice(1, n).reduce((s, y) => s + y, 0));
          return { q: T`Use the trapezium rule with $${n}$ strips to estimate $\displaystyle\int_0^{${b}}${F[0]}\,dx$ (4 d.p.).`, fields: [{ label: 'estimate', ans: T_, tol: { abs: 6e-4 } }],
            sol: T`$h=${num(h)}$; ordinates ${ys.map(y => `$${y.toFixed(4)}$`).join(', ')}. Estimate $=\tfrac12(${num(h)})\{${ys[0].toFixed(4)}+${ys[n].toFixed(4)}+2(${ys.slice(1, n).map(y => y.toFixed(4)).join('+')})\}=${T_.toFixed(4)}$.` }; },
        () => { const L = [['$y=e^x$ on $[0,1]$', 'an overestimate, because the curve is concave up (convex)'], ['$y=\\ln x$ on $[1,3]$', 'an underestimate, because the curve is concave down'], ['$y=\\sqrt x$ on $[1,4]$', 'an underestimate, because the curve is concave down'], ['$y=x^2$ on $[0,2]$', 'an overestimate, because the curve is concave up (convex)']];
          const [s, r] = pick(L), opts = ['an overestimate, because the curve is concave up (convex)', 'an underestimate, because the curve is concave down', 'exact, because the strips are equal']; return { q: T`The trapezium rule is used for ${s}. The estimate is…`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`It is ${r} — the straight tops of the trapezia lie ${r.startsWith('an over') ? 'above' : 'below'} the curve.` }; },
        () => { const n = pick([2, 4]), b = 2; const f = x => x * x, h = b / n, ys = Array.from({ length: n + 1 }, (_, i) => f(i * h)); const T_ = h / 2 * (ys[0] + ys[n] + 2 * ys.slice(1, n).reduce((s, y) => s + y, 0)), ex = 8 / 3;
          return { q: T`The trapezium rule with $${n}$ strips gives an estimate of $\displaystyle\int_0^2x^2dx$. Find the estimate and the percentage error.`, fields: [{ label: 'estimate', ans: T_ }, { label: '% error', ans: (T_ - ex) / ex * 100, tol: { abs: 0.06 } }],
            sol: T`Estimate $${num(T_, 5)}$; exact $\frac83$. Error $=\frac{${num(T_, 5)}-2.6667}{2.6667}\times100=${num((T_ - ex) / ex * 100, 4)}\%$ (an overestimate: $y=x^2$ is concave up).` }; },
      ],
    },
  ],
});
