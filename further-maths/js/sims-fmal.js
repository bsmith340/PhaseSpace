// Further Maths A2 1 · section 2: four simulations for Further Algebra and Functions.
//  pfsolve    partial fractions solved step by step, for any random fraction of the four CCEA types
//  powsums    the sums of integers, squares and cubes as pictures (staircases, a pyramid, Nicomachus' square)
//  serieslab  Maclaurin series: partial sums, the general term, the range of validity, convergence at a point
//  smallerr   how small is "small"? the error of each small angle approximation, against the angle
'use strict';
(() => {
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const rnz0 = (a, b) => { let x; do x = rnd(a, b); while (x === 0); return x; };
const sgnT = (k, v = '') => (k < 0 ? '-' : '+') + (Math.abs(k) === 1 && v ? '' : Math.abs(k)) + v;
const lead = (k, v = '') => (k < 0 ? '-' : '') + (Math.abs(k) === 1 && v ? '' : Math.abs(k)) + v;
const polyT = cs => { // [[coef, 'x^2'], …] → TeX
  const ts = cs.filter(([c]) => c !== 0); if (!ts.length) return '0';
  return ts.map(([c, v], i) => i ? sgnT(c, v) : lead(c, v)).join('');
};
const xm = a => a === 0 ? 'x' : `(x${a < 0 ? '+' : '-'}${Math.abs(a)})`;
const xmp = a => a === 0 ? 'x' : `x${a < 0 ? '+' : '-'}${Math.abs(a)}`;
// a sum of fractions n/d as TeX: [[3, 'x-1'], [-2, 'x+2']] → \dfrac{3}{x-1}-\dfrac{2}{x+2}
const pieces = (list, signFirst) => list.map(([n, d], i) => `${n < 0 ? '-' : (i || signFirst) ? '+' : ''}\\dfrac{${Math.abs(n)}}{${d}}`).join('');
const fq = (n, d) => { if (d < 0) { n = -n; d = -d; } const g = (function gg(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; })(n, d) || 1; n /= g; d /= g; return d === 1 ? `${n}` : `${n < 0 ? '-' : ''}\\tfrac{${Math.abs(n)}}{${d}}`; };

/* ============================ Partial fractions, step by step ============================ */
SIMS.pfsolve = {
  title: 'Partial fractions, step by step', desc: 'Pick a type, generate a fraction and reveal the method one line at a time: the form, the identity, substitution, comparing coefficients and a final check.',
  mount(el) {
    const S = simShell(el); S.stage.classList.add('scroll');
    let type = 'lin', ex = null, shown = 1, xt = 2.5;
    const TY = [['lin', 'Two linear factors'], ['rep', 'A repeated factor'], ['quad', 'A quadratic factor'], ['imp', 'Improper (divide first)'], ['nm', 'Non-monic factor, e.g. (2x + 1)']];
    select(S.ctrls, 'Type', TY, v => { type = v; gen(); });
    const bb = h('div', { class: 'btnrow' }); S.ctrls.append(bb);
    button(bb, '⟳ New fraction', () => gen(), 'btn small primary');
    button(bb, 'Next step ▸', () => { shown = Math.min(shown + 1, ex.steps.length); draw(); });
    button(bb, 'Show all', () => { shown = ex.steps.length; draw(); });
    slider(S.ctrls, 'Check at x =', -5, 5, 0.1, xt, v => { xt = v; draw(); });
    function gen() {
      const T = String.raw;
      if (type === 'lin' || type === 'imp') {
        const a = rnz0(-4, 4); let b; do b = rnz0(-4, 4); while (b === a);
        const A = rnz0(-5, 5), B = rnz0(-5, 5), K = type === 'imp' ? rnz0(-3, 3) : 0;
        const c2 = K, c1 = -K * (a + b) + A + B, c0 = K * a * b - A * b - B * a, N = x => c2 * x * x + c1 * x + c0;
        const top = polyT([[c2, 'x^2'], [c1, 'x'], [c0, '']]), den = `${xm(a)}${xm(b)}`;
        const steps = [
          T`$$\dfrac{${top}}{${den}}$$`,
          type === 'imp' ? T`<b>Improper</b> (degree 2 over degree 2), so there is a constant: $K=\dfrac{\text{leading coefficient of the top}}{\text{leading coefficient of the bottom}}=${K}$.` : T`<b>Proper</b> (degree 1 over degree 2) with two different linear factors.`,
          T`<b>Form:</b> $\dfrac{${top}}{${den}}\equiv${type === 'imp' ? 'K+' : ''}\dfrac{A}{${xmp(a)}}+\dfrac{B}{${xmp(b)}}$`,
          T`<b>Multiply by the denominator:</b> $${top}\equiv${type === 'imp' ? `${lead(K)}${xm(a)}${xm(b)}+` : ''}A${xm(b)}+B${xm(a)}$. This is an identity: true for <b>every</b> $x$.`,
          T`<b>Put $x=${a}$</b> (kills the $B$ term): $${N(a)}=A(${a - b})\Rightarrow A=${A}$.`,
          T`<b>Put $x=${b}$</b> (kills the $A$ term): $${N(b)}=B(${b - a})\Rightarrow B=${B}$.`,
          T`<b>Answer:</b> $\dfrac{${top}}{${den}}\equiv${type === 'imp' ? `${K}` : ''}${pieces([[A, xmp(a)], [B, xmp(b)]], type === 'imp')}$`,
        ];
        ex = { steps, f: x => N(x) / ((x - a) * (x - b)), g: x => K + A / (x - a) + B / (x - b) };
      } else if (type === 'rep') {
        const a = rnd(-3, 3); let b; do b = rnd(-3, 3); while (b === a);
        const A = rnz0(-4, 4), B = rnz0(-4, 4), C = rnz0(-5, 5);
        const c2 = A + B, c1 = -2 * A * b - B * (a + b) + C, c0 = A * b * b + B * a * b - C * a, N = x => c2 * x * x + c1 * x + c0;
        const top = polyT([[c2, 'x^2'], [c1, 'x'], [c0, '']]), den = `${xm(a)}${xm(b)}^2`;
        const steps = [
          T`$$\dfrac{${top}}{${den}}$$`,
          T`$${xm(b)}^2$ is a <b>repeated</b> factor, so it needs two fractions: $\dfrac{B}{${xmp(b)}}$ <i>and</i> $\dfrac{C}{${xm(b)}^2}$. Three unknowns for a degree-3 denominator.`,
          T`<b>Form:</b> $\dfrac{${top}}{${den}}\equiv\dfrac{A}{${xmp(a)}}+\dfrac{B}{${xmp(b)}}+\dfrac{C}{${xm(b)}^2}$`,
          T`<b>Multiply up:</b> $${top}\equiv A${xm(b)}^2+B${xm(a)}${xm(b)}+C${xm(a)}$`,
          T`<b>Put $x=${a}$:</b> $${N(a)}=A(${a - b})^2\Rightarrow A=${A}$.`,
          T`<b>Put $x=${b}$:</b> $${N(b)}=C(${b - a})\Rightarrow C=${C}$.`,
          T`<b>$B$ can't be reached by substitution</b>, so compare the $x^2$ coefficients: $${c2}=A+B\Rightarrow B=${B}$.`,
          T`<b>Answer:</b> $${pieces([[A, xmp(a)], [B, xmp(b)], [C, `${xm(b)}^2`]])}$`,
        ];
        ex = { steps, f: x => N(x) / ((x - a) * (x - b) ** 2), g: x => A / (x - a) + B / (x - b) + C / (x - b) ** 2 };
      } else if (type === 'quad') {
        const a = rnd(-3, 3), c = [1, 2, 3, 4, 9][rnd(0, 4)], A = rnz0(-4, 4), B = rnz0(-3, 3), Cc = rnz0(-5, 5);
        const c2 = A + B, c1 = Cc - a * B, c0 = A * c - a * Cc, N = x => c2 * x * x + c1 * x + c0;
        const top = polyT([[c2, 'x^2'], [c1, 'x'], [c0, '']]), den = `${xm(a)}(x^2+${c})`;
        const steps = [
          T`$$\dfrac{${top}}{${den}}$$`,
          T`$x^2+${c}$ cannot be factorised over the real numbers, so its numerator must be <b>linear</b>: $Bx+C$.`,
          T`<b>Form:</b> $\dfrac{${top}}{${den}}\equiv\dfrac{A}{${xmp(a)}}+\dfrac{Bx+C}{x^2+${c}}$`,
          T`<b>Multiply up:</b> $${top}\equiv A(x^2+${c})+(Bx+C)${xm(a)}$`,
          T`<b>Put $x=${a}$:</b> $${N(a)}=${a * a + c}A\Rightarrow A=${A}$.`,
          T`<b>Compare $x^2$:</b> $${c2}=A+B\Rightarrow B=${B}$.`,
          a ? T`<b>Compare constants:</b> $${c0}=${c === 1 ? '' : c}A${-a < 0 ? '-' : '+'}${Math.abs(a) === 1 ? '' : Math.abs(a)}C\Rightarrow C=${Cc}$.` : T`<b>Compare $x$:</b> $${c1}=C\Rightarrow C=${Cc}$.`,
          T`<b>Answer:</b> $\dfrac{${A}}{${xmp(a)}}+\dfrac{${polyT([[B, 'x'], [Cc, '']])}}{x^2+${c}}$`.replace('+\\dfrac{-', '-\\dfrac{'),
        ];
        ex = { steps, f: x => N(x) / ((x - a) * (x * x + c)), g: x => A / (x - a) + (B * x + Cc) / (x * x + c) };
      } else {
        let p, q, r, s; do { p = rnd(2, 3); q = rnz0(-5, 5); r = 1; s = rnz0(-4, 4); } while (q * r === s * p || (q % p === 0));
        const A = rnz0(-5, 5), B = rnz0(-5, 5), n1 = A * r + B * p, n0 = A * s + B * q, N = x => n1 * x + n0;
        const top = polyT([[n1, 'x'], [n0, '']]), f1 = `(${p}x${q < 0 ? '-' : '+'}${Math.abs(q)})`, f2 = xm(-s), x1 = -q / p, x2 = -s;
        const steps = [
          T`$$\dfrac{${top}}{${f1}${f2}}$$`,
          T`A <b>non-monic</b> factor $${f1}$: it is still linear, so it still gets a constant numerator.`,
          T`<b>Form:</b> $\dfrac{${top}}{${f1}${f2}}\equiv\dfrac{A}{${f1.slice(1, -1)}}+\dfrac{B}{${xmp(-s)}}$`,
          T`<b>Multiply up:</b> $${top}\equiv A${f2}+B${f1}$`,
          T`<b>Put $x=${fq(-q, p)}$</b> (the root of $${f1.slice(1, -1)}$): $${fq(n1 * -q + n0 * p, p)}=A\left(${fq(-q + s * p, p)}\right)\Rightarrow A=${A}$. Fractions here are normal: take care.`,
          T`<b>Put $x=${x2}$:</b> $${N(x2)}=B(${p * x2 + q})\Rightarrow B=${B}$.`,
          T`<b>Answer:</b> $${pieces([[A, f1.slice(1, -1)], [B, xmp(-s)]])}$`,
        ];
        ex = { steps, f: x => N(x) / ((p * x + q) * (x + s)), g: x => A / (p * x + q) + B / (x + s), x1 };
      }
      shown = 1; draw();
    }
    function draw() {
      S.stage.innerHTML = `<ol class="pfsteps">${ex.steps.map((s, i) => `<li class="${i < shown ? 'on' : 'off'}">${i < shown ? s : '<span class="muted">…</span>'}</li>`).join('')}</ol>`;
      renderMath(S.stage);
      // the check value can land on a root of the denominator; step off it rather than show "undefined"
      let xc = xt; for (let k = 0; k < 6 && !(isFinite(ex.f(xc)) && Math.abs(ex.f(xc)) < 1e6); k++) xc = +(xc + 0.3).toFixed(2);
      const L = ex.f(xc), R = ex.g(xc), done = shown >= ex.steps.length;
      tex(S.read, `<p>Step ${Math.min(shown, ex.steps.length)} of ${ex.steps.length}</p>${done ? `${xc !== xt ? `<p class="muted">$x=${f3(xt)}$ is a root of the denominator, so the check uses $x=${f3(xc)}$.</p>` : ''}<p class="hl">Check at $x=${f3(xc)}$: original $=${isFinite(L) ? f3(L) : '\\text{undefined}'}$, partial fractions $=${isFinite(R) ? f3(R) : '\\text{undefined}'}$ ${isFinite(L) && Math.abs(L - R) < 1e-6 * Math.max(1, Math.abs(L)) ? '✓' : ''}</p><p class="muted">Always check at one value of $x$ you did not substitute.</p>` : '<p class="muted">Press <b>Next step</b>. Try to predict each line before you reveal it.</p>'}`);
    }
    gen();
    return () => {};
  },
};

/* ============================ Sums of powers, as pictures ============================ */
SIMS.powsums = {
  title: 'Σr, Σr² and Σr³ as pictures', desc: 'Two staircases make a rectangle; the squares stack into a pyramid; and the cubes fit together into one big square, which is why Σr³ = (Σr)².',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.35);
    let mode = 'r', n = 5, t = 1, anim = 0;
    select(S.ctrls, 'Sum', [['r', 'Σ r = ½n(n + 1)'], ['r2', 'Σ r² = ⅙n(n + 1)(2n + 1)'], ['r3', 'Σ r³ = ¼n²(n + 1)²']], v => { mode = v; t = 0; anim = 1; draw(); });
    slider(S.ctrls, 'n', 1, 9, 1, n, v => { n = v; draw(); }, v => v);
    button(S.ctrls, '▶ Play the proof', () => { t = 0; anim = 1; });
    const stop = loop(() => { if (anim) { t = Math.min(1, t + 0.012); draw(); if (t >= 1) anim = 0; } });
    function draw() {
      const C = COL(), ctx = P.ctx; P.clear();
      const T1 = n * (n + 1) / 2, T2 = n * (n + 1) * (2 * n + 1) / 6, T3 = T1 * T1;
      const cols = [C.a, C.b, C.c, C.d];
      if (mode === 'r') {
        // n columns of heights 1..n, plus a rotated copy sliding in: together an n by (n + 1) rectangle
        const u = Math.min((P.w - 60) / n, (P.h - 70) / (n + 1)), x0 = (P.w - n * u) / 2, y0 = P.h - 40;
        for (let c = 0; c < n; c++) for (let r = 0; r < n + 1; r++) {
          const first = r < c + 1, slide = (1 - t) * (n + 2) * u;
          ctx.fillStyle = first ? C.a : C.c; ctx.globalAlpha = first ? 0.85 : 0.75;
          ctx.fillRect(x0 + c * u + 1, y0 - (r + 1) * u + 1 - (first ? 0 : slide), u - 2, u - 2);
        }
        ctx.globalAlpha = 1; ctx.fillStyle = C.fg; ctx.font = '13px system-ui'; ctx.textAlign = 'center';
        ctx.fillText(`width n = ${n}`, P.w / 2, y0 + 22); ctx.save(); ctx.translate(x0 - 16, y0 - (n + 1) * u / 2); ctx.rotate(-Math.PI / 2); ctx.fillText(`height n + 1 = ${n + 1}`, 0, 0); ctx.restore();
        tex(S.read, `<p>Blue: $1+2+\\cdots+${n}$. Orange: the same staircase, upside down.</p><p class="hl">Together: an $n\\times(n+1)$ rectangle, so $2\\sum r=n(n+1)$ and $\\sum_{r=1}^{${n}}r=\\tfrac12(${n})(${n + 1})=${T1}$.</p>${legend([[C.a, 'Σ r'], [C.c, 'a copy']])}`);
      } else if (mode === 'r2') {
        // an isometric pyramid: layer r (from the top) is an r by r square of cubes
        const s = Math.min(P.w / (2.4 * n + 3), P.h / (2.2 * n + 3)), ox = P.w / 2, oy = P.h * 0.22;
        const iso = (x, y, z) => [ox + (x - y) * s * 0.87, oy + (x + y) * s * 0.5 + z * s];
        const cube = (x, y, z, col) => {
          const p = (a, b, c) => iso(a, b, c), face = (pts, f) => { ctx.beginPath(); pts.forEach(([a, b], i) => i ? ctx.lineTo(a, b) : ctx.moveTo(a, b)); ctx.closePath(); ctx.fillStyle = f; ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 0.7; ctx.stroke(); };
          face([p(x, y, z), p(x + 1, y, z), p(x + 1, y + 1, z), p(x, y + 1, z)], col);
          face([p(x, y + 1, z), p(x + 1, y + 1, z), p(x + 1, y + 1, z + 1), p(x, y + 1, z + 1)], shade(col, 0.75));
          face([p(x + 1, y, z), p(x + 1, y + 1, z), p(x + 1, y + 1, z + 1), p(x + 1, y, z + 1)], shade(col, 0.55));
        };
        const layers = Math.max(1, Math.ceil(t * n));
        for (let r = 1; r <= layers; r++) { const off = (n - r) / 2; for (let i = 0; i < r; i++) for (let j = 0; j < r; j++) cube(i + off, j + off, r - 1, cols[(r - 1) % 4]); }
        tex(S.read, `<p>Layer $r$ (from the top) is an $r\\times r$ square: $r^2$ cubes.</p><p class="hl">$\\sum_{r=1}^{${n}}r^2=${Array.from({ length: n }, (_, i) => (i + 1) ** 2).join('+')}=${T2}$</p><p>Formula: $\\tfrac16(${n})(${n + 1})(${2 * n + 1})=${T2}$ ✓</p><p class="muted">Six of these pyramids fit together into an $n\\times(n+1)\\times(2n+1)$ box: that is where the $\\frac16$ comes from.</p>`);
      } else {
        // Nicomachus: gnomon r (an L shape of area r³) wraps the square of side T(r − 1) to make side T(r)
        const side = T1, u = Math.min(P.w - 40, P.h - 40) / side, x0 = (P.w - side * u) / 2, y0 = (P.h - side * u) / 2;
        const shown = Math.max(1, Math.ceil(t * n));
        for (let r = 1; r <= shown; r++) {
          const a = (r - 1) * r / 2, b = r * (r + 1) / 2;
          ctx.fillStyle = cols[(r - 1) % 4]; ctx.globalAlpha = 0.8;
          ctx.fillRect(x0 + a * u, y0, (b - a) * u, b * u); ctx.fillRect(x0, y0 + a * u, a * u, (b - a) * u);
          ctx.globalAlpha = 1; ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.strokeRect(x0 + a * u, y0, (b - a) * u, b * u); ctx.strokeRect(x0, y0 + a * u, a * u, (b - a) * u);
          if ((b - a) * u > 22) { ctx.fillStyle = C.bg; ctx.font = `${Math.min(15, (b - a) * u * 0.4)}px system-ui`; ctx.textAlign = 'center'; ctx.fillText(`${r}³`, x0 + (a + (b - a) / 2) * u, y0 + b * u / 2 + 5); }
        }
        tex(S.read, `<p>Each L-shape has area $r^3$ (it is $r$ squares of side $r$, re-arranged). They wrap round each other to make a square of side $1+2+\\cdots+${n}=${T1}$.</p><p class="hl">$\\sum_{r=1}^{${n}}r^3=${T1}^2=${T3}$</p><p>So $\\sum r^3=\\left(\\sum r\\right)^2=\\tfrac14n^2(n+1)^2$.</p>`);
      }
    }
    function shade(col, k) { const c = document.createElement('canvas').getContext('2d'); c.fillStyle = col; const s = c.fillStyle; if (!s.startsWith('#')) return col; const v = parseInt(s.slice(1), 16); return `rgb(${(v >> 16 & 255) * k | 0},${(v >> 8 & 255) * k | 0},${(v & 255) * k | 0})`; }
    P.onresize = draw; draw();
    return () => { stop(); P.destroy(); };
  },
};

/* ============================ Series lab: general term, validity, convergence ============================ */
SIMS.serieslab = {
  title: 'Series lab: general term, validity and convergence', desc: 'Choose a function and a constant a. The shaded band is where the series is valid. Below, the partial sums at your test point either settle on f(x) or run away.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.7); S.stage.classList.add('twinv');
    const P2 = makeCanvas(S.stage, 3.2);
    const NL = 40, fa = k => { let f = 1; for (let i = 2; i <= k; i++) f *= i; return f; };
    const ser = {
      exp: a => Array.from({ length: NL }, (_, k) => a ** k / fa(k)),
      sin: a => Array.from({ length: NL }, (_, k) => k % 2 ? (-1) ** ((k - 1) / 2) * a ** k / fa(k) : 0),
      cos: a => Array.from({ length: NL }, (_, k) => k % 2 ? 0 : (-1) ** (k / 2) * a ** k / fa(k)),
      ln: a => Array.from({ length: NL }, (_, k) => k ? (-1) ** (k + 1) * a ** k / k : 0),
      bin: (a, n) => { const c = [1]; for (let k = 0; k < NL - 1; k++) c.push(c[k] * (n - k) / (k + 1) * a); return c; },
      atan: a => Array.from({ length: NL }, (_, k) => k % 2 ? (-1) ** ((k - 1) / 2) * a ** k / k : 0),
      lnr: a => Array.from({ length: NL }, (_, k) => k % 2 ? 2 * a ** k / k : 0),
    };
    const FN = {
      exp: { l: 'e^(ax)', f: (x, a) => Math.exp(a * x), c: a => ser.exp(a), gt: a => T`\dfrac{${aP(a, 'r')} x^r}{r!}`, I: () => null, tex: a => T`e^{${cx(a)}x}` },
      sin: { l: 'sin(ax)', f: (x, a) => Math.sin(a * x), c: a => ser.sin(a), gt: a => T`\dfrac{(-1)^r ${aP(a, '2r+1')}x^{2r+1}}{(2r+1)!}`, I: () => null, tex: a => T`\sin ${cx(a)}x` },
      cos: { l: 'cos(ax)', f: (x, a) => Math.cos(a * x), c: a => ser.cos(a), gt: a => T`\dfrac{(-1)^r ${aP(a, '2r')}x^{2r}}{(2r)!}`, I: () => null, tex: a => T`\cos ${cx(a)}x` },
      ln: { l: 'ln(1 + ax)', f: (x, a) => Math.log(1 + a * x), c: a => ser.ln(a), gt: a => T`\dfrac{(-1)^{r+1}${aP(a, 'r')} x^r}{r}\ (r\ge1)`, I: a => a > 0 ? [-1 / a, 1 / a, false, true] : [1 / a, -1 / a, true, false], tex: a => T`\ln(1${a < 0 ? '-' : '+'}${cx(Math.abs(a))}x)` },
      bin: { l: '(1 + ax)ⁿ', f: (x, a, n) => Math.pow(1 + a * x, n), c: (a, n) => ser.bin(a, n), gt: (a, n) => T`\dbinom{${nT(n)}}{r}${aP(a, 'r')} x^r`, I: (a, n) => Number.isInteger(n) && n >= 0 ? null : [-1 / Math.abs(a), 1 / Math.abs(a), false, false], tex: (a, n) => T`(1${a < 0 ? '-' : '+'}${cx(Math.abs(a))}x)^{${nT(n)}}` },
      atan: { l: 'arctan(ax)', f: (x, a) => Math.atan(a * x), c: a => ser.atan(a), gt: a => T`\dfrac{(-1)^r ${aP(a, '2r+1')}x^{2r+1}}{2r+1}`, I: a => [-1 / Math.abs(a), 1 / Math.abs(a), true, true], tex: a => T`\arctan ${cx(a)}x` },
      lnr: { l: 'ln((1 + ax)/(1 − ax))', f: (x, a) => Math.log((1 + a * x) / (1 - a * x)), c: a => ser.lnr(a), gt: a => T`\dfrac{2\,${aP(a, '2r+1')}x^{2r+1}}{2r+1}`, I: a => [-1 / Math.abs(a), 1 / Math.abs(a), false, false], tex: a => T`\ln\dfrac{1+${cx(a)}x}{1-${cx(a)}x}` },
    };
    const T = String.raw, aT = a => a < 0 ? `(${f3(a)})` : `${f3(a)}`, aP = (a, e) => Math.abs(a - 1) < 1e-9 ? '' : `${aT(a)}^{${e}}`, cx = a => Math.abs(a - 1) < 1e-9 ? '' : Math.abs(a + 1) < 1e-9 ? '-' : f3(a), nT = n => Number.isInteger(n) ? `${n}` : n === 0.5 ? '\\frac12' : n === -0.5 ? '-\\frac12' : f3(n);
    let key = 'ln', a = 1, n = -1, N = 6, x0 = 0.8;
    select(S.ctrls, 'Function', Object.entries(FN).map(([k, v]) => [k, v.l]), v => { key = v; draw(); }, key);
    slider(S.ctrls, 'a', -3, 3, 0.25, a, v => { a = v || 0.25; draw(); });
    const ns = slider(S.ctrls, 'n (binomial only)', -3, 4, 0.5, n, v => { n = v; draw(); });
    slider(S.ctrls, 'Terms N', 1, 30, 1, N, v => { N = v; draw(); }, v => v);
    slider(S.ctrls, 'Test point x', -2.5, 2.5, 0.05, x0, v => { x0 = v; draw(); });
    function draw() {
      const C = COL(), F = FN[key], c = F.c(a, n), I = F.I(a, n), SN = (x, m) => { let s = 0; for (let k = 0; k <= m; k++) s += c[k] * x ** k; return s; };
      ns.inp.disabled = key !== 'bin';
      P.view(0, 0, 2.6); P.clear();
      if (I) { const ctx = P.ctx; ctx.fillStyle = 'rgba(52,199,89,.13)'; ctx.fillRect(P.X(I[0]), 0, P.X(I[1]) - P.X(I[0]), P.h); }
      P.grid(0.5, true);
      if (I) for (const [x, inc] of [[I[0], I[2]], [I[1], I[3]]]) { const ctx = P.ctx; ctx.beginPath(); ctx.arc(P.X(x), P.Y(0), 5, 0, 7); ctx.strokeStyle = '#34c759'; ctx.lineWidth = 2; ctx.stroke(); if (inc) { ctx.fillStyle = '#34c759'; ctx.fill(); } }
      P.curve(x => F.f(x, a, n), C.a, 3); P.curve(x => SN(x, N), C.c, 2.2); P.line(x0, P.ymin, x0, P.ymax, C.grid, 1, [4, 4]);
      const fx = F.f(x0, a, n), sx = SN(x0, N); if (isFinite(fx)) P.dot(x0, fx, C.a, 5); P.dot(x0, sx, C.c, 5);
      // partial sums at x0 against N
      const vals = Array.from({ length: 31 }, (_, m) => SN(x0, m)), fin = vals.filter(isFinite), lim = isFinite(fx) ? fx : 0;
      const spread = Math.max(1e-3, ...fin.map(v => Math.abs(v - lim)).slice(0, 31));
      P2.xmin = -1; P2.xmax = 31; const span = Math.min(spread, isFinite(fx) ? Math.max(4 * Math.abs(fx) + 1, 2) : 10); P2.ymin = lim - span; P2.ymax = lim + span; P2.clear(); P2.grid(span > 4 ? Math.pow(10, Math.floor(Math.log10(span))) : 0.5, false);
      if (isFinite(fx)) P2.line(-1, fx, 31, fx, C.a, 1.5, [6, 4]);
      vals.forEach((v, m) => { if (isFinite(v)) P2.dot(m, Math.max(P2.ymin, Math.min(P2.ymax, v)), m === N ? C.d : C.c, m === N ? 5 : 3); });
      P2.text('partial sums S_N(x) for N = 0…30', -0.8, P2.ymax, C.text, 4, 14, '12px system-ui');
      const inside = !I || ((x0 > I[0] || (I[2] && Math.abs(x0 - I[0]) < 1e-9)) && (x0 < I[1] || (I[3] && Math.abs(x0 - I[1]) < 1e-9)));
      const ival = I ? T`${f3(I[0])}${I[2] ? '\\le' : '\\lt'} x${I[3] ? '\\le' : '\\lt'} ${f3(I[1])}` : T`\text{all }x`;
      const terms = c.slice(0, 7).map((v, k) => [v, k]).filter(([v]) => Math.abs(v) > 1e-12).slice(0, 5).map(([v, k], i) => `${v < 0 ? '-' : i ? '+' : ''}${Math.abs(Math.abs(v) - 1) < 1e-9 && k ? '' : f3(Math.abs(v))}${k ? (k === 1 ? 'x' : `x^{${k}}`) : ''}`).join('');
      tex(S.read, `<p>$${F.tex(a, n)}=${terms}+\\cdots$</p><p><b>General term:</b> $${F.gt(a, n)}$</p><p><b>Valid for</b> $${ival}$</p><p class="hl">At $x=${f3(x0)}$: $f=${isFinite(fx) ? f3(fx) : '\\text{undefined}'}$, $S_{${N}}=${isFinite(sx) && Math.abs(sx) < 1e6 ? f3(sx) : '\\text{huge}'}$ · ${inside ? 'inside the range: the partial sums settle on f(x)' : '<b>outside</b> the range: the partial sums do not converge'}</p>${legend([[C.a, 'f(x)'], [C.c, `S_${N}(x)`], ['#34c759', 'valid region']])}`);
    }
    P.onresize = draw; P2.onresize = draw; draw();
    return () => { P.destroy(); P2.destroy(); };
  },
};

/* ============================ How small is small? ============================ */
SIMS.smallerr = {
  title: 'How small is "small"? The error in each approximation', desc: 'The relative error of sin θ ≈ θ, tan θ ≈ θ and cos θ ≈ 1 − θ²/2 against the angle, on a log scale. The next term of each series predicts the error almost exactly.',
  mount(el) {
    const S = simShell(el), P = makeCanvas(S.stage, 1.6);
    let deg = 10, thr = 1, degTrap = false;
    slider(S.ctrls, 'Angle (degrees)', 0.5, 60, 0.5, deg, v => { deg = v; draw(); }, v => (+v).toFixed(1) + '°');
    select(S.ctrls, 'Tolerance line', [['1', '1 %'], ['0.1', '0.1 %'], ['5', '5 %']], v => { thr = +v; draw(); }, '1');
    check(S.ctrls, 'Show the degrees mistake', false, v => { degTrap = v; draw(); });
    const fns = [
      { k: 'sin', l: 'sin θ ≈ θ', ex: Math.sin, ap: x => x, nx: x => x * x / 6 },
      { k: 'tan', l: 'tan θ ≈ θ', ex: Math.tan, ap: x => x, nx: x => x * x / 3 },
      { k: 'cos', l: 'cos θ ≈ 1 − θ²/2', ex: Math.cos, ap: x => 1 - x * x / 2, nx: x => x ** 4 / 24 },
    ];
    const rel = (F, x) => Math.abs(F.ap(x) - F.ex(x)) / Math.abs(F.ex(x)) * 100;
    function draw() {
      const C = COL(), ctx = P.ctx, cols = [C.a, C.c, C.b];
      P.xmin = 0; P.xmax = 60; P.ymin = -5; P.ymax = 2; P.clear();
      ctx.strokeStyle = C.grid; ctx.lineWidth = 1; ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace';
      for (let e = -5; e <= 2; e++) { ctx.beginPath(); ctx.moveTo(0, P.Y(e)); ctx.lineTo(P.w, P.Y(e)); ctx.stroke(); ctx.textAlign = 'left'; ctx.fillText(e >= 0 ? `${10 ** e}%` : `${10 ** e}%`.replace(/(\.\d*?)0+%/, '$1%'), 4, P.Y(e) - 3); }
      for (let d = 10; d <= 60; d += 10) { ctx.beginPath(); ctx.moveTo(P.X(d), 0); ctx.lineTo(P.X(d), P.h); ctx.stroke(); ctx.textAlign = 'center'; ctx.fillText(`${d}°`, P.X(d), P.h - 6); }
      P.line(0, Math.log10(thr), 60, Math.log10(thr), C.d, 1.5, [6, 4]);
      fns.forEach((F, i) => P.curve(d => Math.log10(Math.max(rel(F, d * Math.PI / 180), 1e-6)), cols[i], 2.6, 0.3, 60, 600));
      P.line(deg, P.ymin, deg, P.ymax, C.fg, 1, [3, 3]);
      const x = deg * Math.PI / 180;
      fns.forEach((F, i) => P.dot(deg, Math.log10(Math.max(rel(F, x), 1e-6)), cols[i], 5));
      const lim = fns.map(F => { let lo = 0.001, hi = 1.5; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (rel(F, m) < thr) lo = m; else hi = m; } return lo * 180 / Math.PI; });
      const rows = fns.map((F, i) => `<tr><td style="color:${cols[i]};font-weight:700">${F.k}</td><td>${rel(F, x).toPrecision(2)}%</td><td>${(F.nx(x) * 100).toPrecision(2)}%</td><td>${lim[i].toFixed(1)}°</td></tr>`).join('');
      tex(S.read, `<p>$\\theta=${deg}^\\circ=${x.toFixed(4)}$ rad</p><table class="tbl small"><tr><th></th><th>error</th><th>next term says</th><th>&lt; ${thr}% up to</th></tr>${rows}</table>
        ${degTrap ? `<p class="badm">Putting $\\theta=${deg}$ (degrees) straight in: $\\sin ${deg}^\\circ\\approx${deg}$?? The true value is $${f3(Math.sin(x))}$. The approximations only work in <b>radians</b>.</p>` : '<p class="muted">Error grows like θ² for sin and tan (tan twice as fast) but like θ⁴ for cos, which is why cos θ ≈ 1 − θ²/2 is so good.</p>'}`);
    }
    P.onresize = draw; draw();
    return () => P.destroy();
  },
};
})();
