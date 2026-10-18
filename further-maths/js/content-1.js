// A2 1 Further Pure content, part 1: Complex numbers, Matrices, Vectors.
// Each drill() returns { q, fields | mc, sol, hint? }. Fields: {label, ans} | {label, set:[..]} | {label, vec:[..], prop?}
'use strict';

const TOPICS = [];
const POINTS = [];
function topic(t) { TOPICS.push(t); for (const p of t.points) { p.topic = t.id; POINTS.push(p); } }


/* ======================= 1. COMPLEX NUMBERS ======================= */
topic({
  id: 'cx', code: '1', title: 'Complex Numbers', icon: 'ℂ', color: '#007aff',
  blurb: 'Exponential form, de Moivre, roots of unity, loci in the Argand diagram.',
  points: [
    {
      id: 'cx1', code: '1.1', title: 'Modulus–argument & exponential form',
      sims: ['argand'],
      notes: T`
<p>Every non-zero complex number has three equivalent forms:</p>
$$z = x+iy = r(\cos\theta + i\sin\theta) = re^{i\theta},\qquad r=|z|=\sqrt{x^2+y^2},\ \theta=\arg z$$
<p>CCEA's shorthand for the modulus–argument form is $[r,\theta]$.</p>
<ul>
<li><b>Principal argument</b>: $-\pi \lt \theta \le \pi$. Always sketch the quadrant first — $\arctan(y/x)$ alone is wrong in quadrants 2 and 3.</li>
<li><b>Euler</b>: $e^{i\theta}=\cos\theta+i\sin\theta$, so $e^{i\pi}+1=0$ and $\cos\theta=\tfrac12(e^{i\theta}+e^{-i\theta})$, $\sin\theta=\tfrac1{2i}(e^{i\theta}-e^{-i\theta})$.</li>
<li><b>Multiply</b>: moduli multiply, arguments add. $\;r_1e^{i\theta_1}\cdot r_2e^{i\theta_2}=r_1r_2e^{i(\theta_1+\theta_2)}$.</li>
<li><b>Divide</b>: moduli divide, arguments subtract. Re-adjust by $\pm2\pi$ to get back into the principal range.</li>
<li><b>Conjugate</b>: $z^*=re^{-i\theta}$, and $zz^*=|z|^2$.</li>
</ul>
<div class="tip"><b>Exam trap:</b> multiplying by $e^{i\alpha}$ is a rotation by $\alpha$ anticlockwise about $O$. Multiplying by $re^{i\alpha}$ is a spiral similarity (rotate + enlarge).</div>`,
      drills: [
        () => {
          const a = rnz(-6, 6), b = rnz(-6, 6), r = Math.hypot(a, b), t = Math.atan2(b, a), al = Math.atan(Math.abs(b / a));
          const q = a > 0 ? (b > 0 ? 1 : 4) : (b > 0 ? 2 : 3);
          const how = { 1: T`\theta=\alpha`, 2: T`\theta=\pi-\alpha`, 3: T`\theta=-(\pi-\alpha)`, 4: T`\theta=-\alpha` }[q];
          return {
            q: T`Find the modulus and principal argument (radians) of $z=${poly([[a, ''], [b, 'i']])}$.`,
            fields: [{ label: '|z|', ans: r }, { label: 'arg z', ans: t }],
            sol: T`$|z|=\sqrt{${par(a)}^2+${par(b)}^2}=${surd(a * a + b * b)}\approx${num(r)}$.<br>
Point is in quadrant ${q}. Base angle $\alpha=\arctan\left|\tfrac{${b}}{${a}}\right|=${num(al)}$, so $${how}=${num(t)}$ rad.`,
            hint: 'Sketch it. Which quadrant?',
          };
        },
        () => {
          const r1 = ri(1, 6), r2 = ri(1, 6), k1 = ri(-11, 12), k2 = ri(-11, 12), op = pick(['×', '÷']);
          let k = op === '×' ? k1 + k2 : k1 - k2, raw = k;
          while (k > 12) k -= 24; while (k <= -12) k += 24;
          const mod = op === '×' ? r1 * r2 : r1 / r2;
          return {
            q: T`$z=${r1}e^{i${pf(k1, 12)}}$ and $w=${r2}e^{i${pf(k2, 12)}}$. Find the modulus and principal argument of $${op === '×' ? 'zw' : T`\dfrac{z}{w}`}$.`,
            fields: [{ label: 'modulus', ans: mod }, { label: 'arg (e.g. 5pi/12)', ans: k * Math.PI / 12 }],
            sol: T`Moduli ${op === '×' ? 'multiply' : 'divide'}: $${op === '×' ? `${r1}\\times${r2}` : `${r1}\\div${r2}`}=${fr(op === '×' ? r1 * r2 : r1, op === '×' ? 1 : r2)}$.<br>
Arguments ${op === '×' ? 'add' : 'subtract'}: $${pf(k1, 12)} ${op === '×' ? '+' : '-'} ${k2 < 0 ? `\\left(${pf(k2, 12)}\\right)` : pf(k2, 12)} = ${pf(raw, 12)}$${raw !== k ? T`$\;\to\;${pf(k, 12)}$ (adjust by $2\pi$ into $(-\pi,\pi]$)` : ''}.`,
          };
        },
        () => {
          const t = pick([[1, 6], [1, 4], [1, 3], [2, 3], [3, 4], [5, 6], [-1, 6], [-1, 3], [-2, 3], [-3, 4]]), r = ri(2, 8);
          const th = t[0] * Math.PI / t[1];
          return {
            q: T`Write $z=${r}e^{${pf(t[0], t[1])}i}$ in the form $x+iy$.`,
            fields: [{ label: 'x', ans: r * Math.cos(th) }, { label: 'y', ans: r * Math.sin(th) }],
            sol: T`$x=${r}\cos\left(${pf(t[0], t[1])}\right)=${num(r * Math.cos(th))}$, $\;y=${r}\sin\left(${pf(t[0], t[1])}\right)=${num(r * Math.sin(th))}$. (Exact forms like 4sqrt(3) are accepted.)`,
          };
        },
      ],
    },
    {
      id: 'cx2', code: '1.2', title: "De Moivre's theorem & multiple angles",
      sims: ['demoivre'],
      notes: T`
$$\big(r(\cos\theta+i\sin\theta)\big)^n=r^n(\cos n\theta+i\sin n\theta)\qquad (n\in\mathbb Z,\ \text{proved by induction for } n\in\mathbb Z^+)$$
<p>CCEA writes modulus–argument form as $[r,\theta]$, so $[r,\theta]^n=[r^n,n\theta]$.</p>
<h4>1. Powers</h4><p>Convert to $re^{i\theta}$, raise, convert back. $(1+i)^{8}=(\sqrt2)^8e^{2\pi i}=16$.</p>
<h4>2. $\cos n\theta$ in powers of $\cos\theta$</h4>
<p>Expand $(c+is)^n$ binomially, take real (or imaginary) part, replace $s^2=1-c^2$.</p>
$$\cos3\theta=4\cos^3\theta-3\cos\theta,\qquad \sin3\theta=3\sin\theta-4\sin^3\theta$$
<h4>3. Powers of $\cos\theta$ in multiple angles</h4>
<p>With $z=e^{i\theta}$: $\;z^n+z^{-n}=2\cos n\theta,\quad z^n-z^{-n}=2i\sin n\theta$.</p>
<p>Expand $(z+z^{-1})^n=(2\cos\theta)^n$ and pair terms. E.g. $\cos^4\theta=\tfrac18(\cos4\theta+4\cos2\theta+3)$ — this is how you integrate $\cos^4\theta$.</p>
<h4>4. $\tan n\theta$</h4><p>Divide $\operatorname{Im}$ by $\operatorname{Re}$ of $(c+is)^n$, then divide top and bottom by $c^n$: $\tan3\theta=\dfrac{3t-t^3}{1-3t^2}$, $t=\tan\theta$.</p>
<div class="tip"><b>Trap:</b> $(z-z^{-1})^n=(2i\sin\theta)^n$ — don't lose the $i^n$. <b>Check every identity at $\theta=0$</b> (and one other easy angle) before moving on.</div>`,
      drills: [
        () => {
          const B = pick([
            { tex: '1+i', r2: 2, k: 3 }, { tex: '1-i', r2: 2, k: -3 }, { tex: '-1+i', r2: 2, k: 9 }, { tex: '\\sqrt3+i', r2: 4, k: 2 },
            { tex: '1+\\sqrt3\\,i', r2: 4, k: 4 }, { tex: '-1+\\sqrt3\\,i', r2: 4, k: 8 }, { tex: '\\sqrt3-i', r2: 4, k: -2 }, { tex: '-\\sqrt3-i', r2: 4, k: -10 }]);
          const n = ri(3, 9), R = Math.pow(Math.sqrt(B.r2), n), ang = n * B.k * Math.PI / 12;
          let m = (n * B.k) % 24; if (m > 12) m -= 24; if (m <= -12) m += 24;
          return {
            q: T`Use de Moivre's theorem to find $(${B.tex})^{${n}}$ in the form $a+bi$.`,
            fields: [{ label: 'a', ans: R * Math.cos(ang) }, { label: 'b', ans: R * Math.sin(ang) }],
            sol: T`$${B.tex}=${surd(B.r2)}\,e^{i${pf(B.k, 12)}}$.<br>
$(${B.tex})^{${n}}=(${surd(B.r2)})^{${n}}e^{i\cdot ${pf(n * B.k, 12)}}=${num(R)}\,e^{i${pf(m, 12)}}$.<br>
$a=${num(R)}\cos\left(${pf(m, 12)}\right)=${num(R * Math.cos(ang))},\quad b=${num(R)}\sin\left(${pf(m, 12)}\right)=${num(R * Math.sin(ang))}$.`,
          };
        },
        () => {
          const P = pick([
            { l: T`\cos3\theta`, f: 'c', pw: [3, 1], co: [4, -3] }, { l: T`\sin3\theta`, f: 's', pw: [3, 1], co: [-4, 3] },
            { l: T`\cos4\theta`, f: 'c', pw: [4, 2, 0], co: [8, -8, 1] }, { l: T`\cos5\theta`, f: 'c', pw: [5, 3, 1], co: [16, -20, 5] },
            { l: T`\sin5\theta`, f: 's', pw: [5, 3, 1], co: [16, -20, 5] }, { l: T`\cos6\theta`, f: 'c', pw: [6, 4, 2, 0], co: [32, -48, 18, -1] }]);
          const fn = P.f === 'c' ? '\\cos' : '\\sin', L = 'abcd';
          const form = P.pw.map((p, i) => `${L[i]}${p ? `${fn}^{${p}}\\theta` : ''}`).join('+').replace(/\^\{1\}/g, '');
          const res = poly(P.pw.map((p, i) => [P.co[i], p ? `${fn}^{${p}}\\theta`.replace('^{1}', '') : '']));
          const n = P.pw[0];
          return {
            q: T`Using de Moivre's theorem, $${P.l}=${form}$. Find the constants.`,
            fields: P.co.map((c, i) => ({ label: L[i], ans: c })),
            sol: T`$${P.l}=\operatorname{${P.f === 'c' ? 'Re' : 'Im'}}(\cos\theta+i\sin\theta)^{${n}}$. Expand binomially, keep the ${P.f === 'c' ? 'real' : 'imaginary'} terms, then use $${P.f === 'c' ? '\\sin^2\\theta=1-\\cos^2\\theta' : '\\cos^2\\theta=1-\\sin^2\\theta'}$:<br>$${P.l}=${res}$.`,
          };
        },
        () => {
          const P = pick([
            { l: T`\cos^3\theta`, r: T`A\cos3\theta+B\cos\theta`, a: [1 / 4, 3 / 4], s: T`(z+z^{-1})^3=z^3+3z+3z^{-1}+z^{-3}\Rightarrow 8\cos^3\theta=2\cos3\theta+6\cos\theta` },
            { l: T`\sin^3\theta`, r: T`A\sin3\theta+B\sin\theta`, a: [-1 / 4, 3 / 4], s: T`(z-z^{-1})^3=(2i)^3\sin^3\theta\Rightarrow -8i\sin^3\theta=2i\sin3\theta-6i\sin\theta` },
            { l: T`\cos^4\theta`, r: T`A\cos4\theta+B\cos2\theta+C`, a: [1 / 8, 1 / 2, 3 / 8], s: T`16\cos^4\theta=(z+z^{-1})^4=2\cos4\theta+8\cos2\theta+6` },
            { l: T`\sin^4\theta`, r: T`A\cos4\theta+B\cos2\theta+C`, a: [1 / 8, -1 / 2, 3 / 8], s: T`16\sin^4\theta=(z-z^{-1})^4=2\cos4\theta-8\cos2\theta+6` },
            { l: T`\cos^5\theta`, r: T`A\cos5\theta+B\cos3\theta+C\cos\theta`, a: [1 / 16, 5 / 16, 10 / 16], s: T`32\cos^5\theta=2\cos5\theta+10\cos3\theta+20\cos\theta` },
            { l: T`\sin^5\theta`, r: T`A\sin5\theta+B\sin3\theta+C\sin\theta`, a: [1 / 16, -5 / 16, 10 / 16], s: T`32i\sin^5\theta=2i\sin5\theta-10i\sin3\theta+20i\sin\theta` }]);
          return {
            q: T`Using $z=e^{i\theta}$, express $${P.l}$ in the form $${P.r}$.`,
            fields: P.a.map((v, i) => ({ label: 'ABC'[i], ans: v })),
            sol: T`$${P.s}$.<br>So ${P.a.map((v, i) => `$${'ABC'[i]}=${nice(v)}$`).join(', ')}.`,
          };
        },
        () => {
          const P = pick([
            { n: 3, num: [[3, 1], [-1, 3]], den: [[1, 0], [-3, 2]], s: T`\dfrac{3t-t^3}{1-3t^2}` },
            { n: 4, num: [[4, 1], [-4, 3]], den: [[1, 0], [-6, 2], [1, 4]], s: T`\dfrac{4t-4t^3}{1-6t^2+t^4}` },
            { n: 5, num: [[5, 1], [-10, 3], [1, 5]], den: [[1, 0], [-10, 2], [5, 4]], s: T`\dfrac{5t-10t^3+t^5}{1-10t^2+5t^4}` }]);
          const lbl = ['a', 'b', 'c'], dl = ['d', 'e'];
          const numForm = P.num.map((_, i) => `${lbl[i]}t${P.num[i][1] > 1 ? `^{${P.num[i][1]}}` : ''}`).join('+');
          const denForm = '1+' + P.den.slice(1).map((d, i) => `${dl[i]}t^{${d[1]}}`).join('+');
          return {
            q: T`Use De Moivre's theorem to show that $\tan${P.n}\theta=\dfrac{${numForm}}{${denForm}}$ where $t=\tan\theta$, and find the constants.`,
            fields: [...P.num.map((c, i) => ({ label: lbl[i], ans: c[0] })), ...P.den.slice(1).map((c, i) => ({ label: dl[i], ans: c[0] }))],
            sol: T`$\cos${P.n}\theta+i\sin${P.n}\theta=(c+is)^{${P.n}}$. Take $\sin${P.n}\theta=\operatorname{Im}$ and $\cos${P.n}\theta=\operatorname{Re}$ of the binomial expansion, divide them, then divide top and bottom by $c^{${P.n}}$ so every $\frac{s}{c}$ becomes $t$:<br>
$\tan${P.n}\theta=${P.s}$. Check at $\theta=0$: both sides are $0$ ✓.`,
          };
        },
        () => {
          const k = pick([0.5, -0.5]), sgnK = k > 0 ? '-' : '+', base = Math.acos(k);
          const xs = [0, 1, 2].map(j => Math.cos((base + 2 * Math.PI * j) / 3));
          const ang = k > 0 ? [1, 5, 7] : [2, 4, 8];
          return {
            q: T`Using $\cos3\theta=4\cos^3\theta-3\cos\theta$, solve $8x^3-6x${sgnK}1=0$ (give all three roots, comma-separated).`,
            fields: [{ label: 'x values', set: xs }],
            sol: T`Spot the substitution: divide by 2, $4x^3-3x=${k > 0 ? '\\tfrac12' : '-\\tfrac12'}$. With $x=\cos\theta$ this is $\cos3\theta=${k > 0 ? '\\tfrac12' : '-\\tfrac12'}$.<br>
$3\theta=${k > 0 ? '\\tfrac\\pi3,\\tfrac{5\\pi}3,\\tfrac{7\\pi}3' : '\\tfrac{2\\pi}3,\\tfrac{4\\pi}3,\\tfrac{8\\pi}3'}\Rightarrow\theta=${ang.map(a => pf(a, 9)).join(',\\ ')}$.<br>
$x=${ang.map(a => `\\cos${pf(a, 9)}`).join(',\\ ')}$ $\approx${xs.map(x => num(x)).join(',\\ ')}$ — three distinct roots, so these are all of them.`,
          };
        },
      ],
    },
    {
      id: 'cx3', code: '1.3', title: 'nth roots, roots of unity & polygons',
      sims: ['roots'],
      notes: T`
<p>To solve $z^n=w$ where $w=[R,\varphi]=Re^{i\varphi}$:</p>
$$z=R^{1/n}\,e^{i(\varphi+2k\pi)/n},\qquad k=0,1,\dots,n-1$$
<ul>
<li>Write the general argument $\varphi+2k\pi$ <b>before</b> taking the root — that generates all $n$ solutions. Choose the $k$ values that put the arguments in the range asked for.</li>
<li>All $n$ roots lie on a circle of radius $R^{1/n}$ and form a <b>regular $n$-gon</b>; adjacent roots differ in argument by $\frac{2\pi}{n}$.</li>
<li><b>Roots of unity</b>: $z^n=1\Rightarrow z=e^{2\pi ki/n}=\omega^k$ (given in the formula booklet). Their sum is $0$.</li>
<li><b>Polygon area</b>: $n$ congruent triangles at the centre, so $A=\frac n2\,r^2\sin\frac{2\pi}{n}$ with $r$ the circumradius.</li>
<li><b>Off-centre polygon</b> with centre $c$ and a vertex $v$: the other vertices are $c+(v-c)\,\omega^k$ — rotate the vector $v-c$ about $c$.</li>
<li><b>Reuse earlier answers</b>: if you know the roots $z_k$ of $z^n=w$, then $(u-c)^n=w$ has roots $u=c+z_k$, and $(au)^n=w$ has $u=z_k/a$.</li>
</ul>`,
      drills: [
        () => {
          const n = pick([3, 4, 5, 6]), m = n === 3 ? ri(1, 3) : ri(1, 2), R = Math.pow(m, n), k = ri(-5, 6);
          const args = []; for (let j = 0; j < n; j++) { let v = k + 12 * j; while (v > 6 * n) v -= 12 * n; while (v <= -6 * n) v += 12 * n; args.push(v); }
          args.sort((a, b) => a - b);
          return {
            q: T`Solve $z^{${n}}=${R}e^{i${pf(k, 6)}}$, giving the modulus of the roots and all ${n} arguments in $(-\pi,\pi]$ (comma-separated).`,
            fields: [{ label: 'modulus', ans: m }, { label: 'arguments', set: args.map(v => v * Math.PI / (6 * n)) }],
            sol: T`$z^{${n}}=${R}e^{i(${pf(k, 6)}+2k\pi)}\Rightarrow z=${R}^{1/${n}}e^{i(${pf(k, 6)}+2k\pi)/${n}}$, modulus $${m}$.<br>
Arguments: $${args.map(v => pf(v, 6 * n)).join(',\\ ')}$ — spaced $${pf(2, n)}$ apart.`,
          };
        },
        () => {
          const C = pick([[3, 8, 'i', 6], [3, 8, '-i', -6], [3, 27, '', 0], [4, 16, '-', 12], [4, 81, 'i', 6], [6, 64, '-', 12], [3, 8, '-', 12], [4, 16, '', 0], [6, 1, '-', 12], [3, 1, 'i', 6]]);
          const [n, R, sym, k12] = C, r = Math.pow(R, 1 / n), wTex = sym === '' ? `${R}` : sym === '-' ? `-${R}` : sym === 'i' ? `${R === 1 ? '' : R}i` : `-${R === 1 ? '' : R}i`;
          const roots = []; for (let j = 0; j < n; j++) { const a = (k12 * Math.PI / 12 + 2 * Math.PI * j) / n; roots.push([r * Math.cos(a), r * Math.sin(a), a]); }
          const quad = z => (z[0] > 1e-9 ? (z[1] > 1e-9 ? 1 : z[1] < -1e-9 ? 4 : 0) : z[0] < -1e-9 ? (z[1] > 1e-9 ? 2 : z[1] < -1e-9 ? 3 : 0) : 0);
          const cands = roots.filter(z => quad(z) > 0); const target = cands.length ? pick(cands) : roots[0], q = quad(target);
          const desc = q ? `in quadrant ${q} of the Argand diagram` : 'on the real axis';
          return {
            q: T`Solve $z^{${n}}=${wTex}$ and give the root ${desc} in the form $a+bi$.`,
            fields: [{ label: 'a', ans: target[0] }, { label: 'b', ans: target[1] }],
            sol: T`$${wTex}=${R}e^{i(${pf(k12, 12)}+2k\pi)}$, so $z=${num(r)}e^{i(${pf(k12, 12 * n)}+${pf(2, n)}k)}$, $k=0,\dots,${n - 1}$.<br>
The root ${desc} has argument $${num(Math.atan2(target[1], target[0]))}$: $z=${num(r)}\left(\cos\theta+i\sin\theta\right)=${num(target[0])}${target[1] < 0 ? '-' : '+'}${num(Math.abs(target[1]))}i$ (exact forms like sqrt(3) accepted).`,
          };
        },
        () => {
          const n = pick([3, 4, 5, 6, 8]), r = pick([1, 2, 3]), R = Math.pow(r, n), A = n / 2 * r * r * Math.sin(2 * Math.PI / n);
          return {
            q: T`The roots of $z^{${n}}=${R}$ are the vertices of a polygon in the Argand diagram. Find its exact area.`,
            fields: [{ label: 'area', ans: A }],
            sol: T`The roots have modulus $${R}^{1/${n}}=${r}$ and are equally spaced, so they form a regular ${n}-gon with circumradius ${r}.<br>
It splits into ${n} congruent triangles at $O$, each with two sides ${r} and angle $${pf(2, n)}$: $A=${n}\times\tfrac12(${r})^2\sin${pf(2, n)}=${num(A)}$.`,
          };
        },
        () => {
          const n = pick([3, 4, 6]), c = [ri(-3, 3), ri(-3, 3)], d = pick([[2, 0], [0, 2], [3, 0], [1, 1], [2, 2], [0, -3], [-2, 0]]), v = [c[0] + d[0], c[1] + d[1]];
          const th = 2 * Math.PI / n, w = [c[0] + d[0] * Math.cos(th) - d[1] * Math.sin(th), c[1] + d[0] * Math.sin(th) + d[1] * Math.cos(th)];
          const area = n / 2 * (d[0] ** 2 + d[1] ** 2) * Math.sin(th), cT = poly([[c[0], ''], [c[1], 'i']]), vT = poly([[v[0], ''], [v[1], 'i']]);
          return {
            q: T`A regular ${n === 3 ? 'triangle' : n === 4 ? 'square' : 'hexagon'} has centre $${cT}$ and one vertex at $${vT}$. Find the next vertex anticlockwise (as $x+yi$) and the area of the polygon.`,
            fields: [{ label: 'x', ans: w[0] }, { label: 'y', ans: w[1] }, { label: 'area', ans: area }],
            sol: T`Rotate the vector from the centre: $v-c=${poly([[d[0], ''], [d[1], 'i']])}$. Multiply by $\omega=e^{2\pi i/${n}}$ and add $c$ back:<br>
$c+(v-c)\,e^{${pf(2, n)}i}=${num(w[0])}${w[1] < 0 ? '-' : '+'}${num(Math.abs(w[1]))}i$.<br>
Area $=\frac{${n}}{2}|v-c|^2\sin${pf(2, n)}=\frac{${n}}{2}(${d[0] ** 2 + d[1] ** 2})\sin${pf(2, n)}=${num(area)}$.`,
          };
        },
        () => {
          const base = pick([{ n: 4, w: '-16', roots: [[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([a, b]) => [a * Math.SQRT2, b * Math.SQRT2]), rt: T`\pm\sqrt2\pm\sqrt2\,i` },
            { n: 3, w: '8i', roots: [[Math.sqrt(3), 1], [-Math.sqrt(3), 1], [0, -2]], rt: T`\sqrt3+i,\ -\sqrt3+i,\ -2i` },
            { n: 6, w: '-64', roots: [[Math.sqrt(3), 1], [0, 2], [-Math.sqrt(3), 1], [-Math.sqrt(3), -1], [0, -2], [Math.sqrt(3), -1]], rt: T`\pm2i,\ \pm\sqrt3\pm i` }]);
          const c = [rnz(-3, 3), ri(-2, 2)], roots = base.roots.map(z => [z[0] + c[0], z[1] + c[1]]), tgt = roots.reduce((b, z) => (z[0] > b[0] + 1e-9 || (Math.abs(z[0] - b[0]) < 1e-9 && z[1] > b[1]) ? z : b));
          const cT = poly([[c[0], ''], [c[1], 'i']]);
          return {
            q: T`The roots of $z^{${base.n}}=${base.w}$ are $${base.rt}$. Hence solve $\left(u-(${cT})\right)^{${base.n}}=${base.w}$: give the root with the greatest real part (and, if tied, greatest imaginary part) as $a+bi$, and the sum of all the roots.`,
            fields: [{ label: 'a', ans: tgt[0] }, { label: 'b', ans: tgt[1] }, { label: 'sum (real part)', ans: base.n * c[0] }, { label: 'sum (imag part)', ans: base.n * c[1] }],
            sol: T`Substitute $z=u-(${cT})$: it satisfies $z^{${base.n}}=${base.w}$, so $u=${cT}+z$ — shift every known root by $${cT}$.<br>
Greatest real part: $${num(tgt[0])}${tgt[1] < 0 ? '-' : '+'}${num(Math.abs(tgt[1]))}i$.<br>The original roots sum to $0$ (they're centred on $O$), so the new roots sum to $${base.n}(${cT})=${poly([[base.n * c[0], ''], [base.n * c[1], 'i']])}$.`,
          };
        },
        () => {
          const n = ri(3, 9), m = ri(1, 2 * n);
          return {
            q: T`$\omega=e^{2\pi i/${n}}$. Evaluate $\displaystyle\sum_{k=0}^{${n - 1}}\omega^{${m}k}$.`,
            fields: [{ label: 'value', ans: m % n === 0 ? n : 0 }],
            sol: m % n === 0 ? T`$\omega^{${m}}=1$ since ${n} divides ${m}, so every term is 1: total $${n}$.`
              : T`$\omega^{${m}}\neq1$, so it's a geometric series: $\dfrac{1-(\omega^{${m}})^{${n}}}{1-\omega^{${m}}}=\dfrac{1-1}{1-\omega^{${m}}}=0$.`,
          };
        },
      ],
    },
    {
      id: 'cx4', code: '1.4', title: 'Loci & regions in the Argand diagram',
      sims: ['loci'],
      notes: T`
<table class="tbl"><tr><th>Equation</th><th>Locus</th></tr>
<tr><td>$|z-a|=r$</td><td>Circle, centre $a$, radius $r$</td></tr>
<tr><td>$|z-a|=|z-b|$</td><td>Perpendicular bisector of $a$ and $b$</td></tr>
<tr><td>$\arg(z-a)=\theta$</td><td>Half-line from $a$ (excluding $a$) at angle $\theta$</td></tr>
<tr><td>$|z-a|=k|z-b|,\ k\ne1$</td><td>Circle of Apollonius (square both sides, complete the square)</td></tr>
<tr><td>$\arg\dfrac{z-a}{z-b}=\theta$</td><td>Arc of a circle through $a$ and $b$ (angle in the same segment)</td></tr></table>
<ul>
<li><b>Max/min $|z|$ on $|z-c|=r$</b>: $|c|\pm r$ (line through $O$ and the centre).</li>
<li><b>Max/min $\arg z$ on $|z-c|=r$</b> ($r\lt|c|$): tangent from $O$, so $\arg c\pm\arcsin\dfrac{r}{|c|}$.</li>
<li>Regions: $\le$ solid boundary included, $\lt$ dashed. Shade what you want (state it).</li>
</ul>
<div class="tip"><b>Apollonius shortcut</b> (real $a,b$): centre $\dfrac{a-k^2b}{1-k^2}$, radius $\dfrac{k|a-b|}{|1-k^2|}$ — but show the algebra in the exam.</div>`,
      drills: [
        () => {
          const [p, q] = pick([[3, 4], [4, 3], [6, 8], [5, 12], [8, 6], [0, 5], [5, 0], [8, 15]]);
          const a = p * pick([1, -1]), b = q * pick([1, -1]), c = Math.hypot(a, b); let r; do r = ri(1, 9); while (r === c);
          return {
            q: T`$z$ lies on $|z-(${poly([[a, ''], [b, 'i']])})|=${r}$. Find the greatest and least values of $|z|$.`,
            fields: [{ label: 'max |z|', ans: c + r }, { label: 'min |z|', ans: Math.abs(c - r) }],
            sol: T`Centre $C=${poly([[a, ''], [b, 'i']])}$, $|OC|=${c}$. The line $OC$ cuts the circle at the nearest and furthest points:<br>
max $=${c}+${r}=${c + r}$, min $=|${c}-${r}|=${Math.abs(c - r)}$.`,
          };
        },
        () => {
          const a = ri(-5, 5), b = ri(-5, 5), c = ri(-5, 5); let d; do d = ri(-5, 5); while (d === b);
          const mx = (a + c) / 2, my = (b + d) / 2, m = (a - c) / (d - b) + 0, k = my - m * mx;
          return {
            q: T`Find the Cartesian equation of the locus $|z-(${poly([[a, ''], [b, 'i']])})|=|z-(${poly([[c, ''], [d, 'i']])})|$ in the form $y=mx+k$.`,
            fields: [{ label: 'm', ans: m }, { label: 'k', ans: k }],
            sol: T`Perpendicular bisector of $A(${a},${b})$ and $B(${c},${d})$. Midpoint $(${nice(mx)},${nice(my)})$. ${c === a ? T`$AB$ is vertical, so the bisector is horizontal: $m=0$.` : T`Gradient $AB=${fr(d - b, c - a)}$, so $m=-\dfrac{1}{\text{grad}_{AB}}=${nice(m)}$.`}<br>
$y-${par(nice(my))}=${nice(m + 0)}(x-${par(nice(mx))})\Rightarrow y=${m === 0 ? nice(k) : `${nice(m)}x${k < 0 ? '' : '+'}${nice(k)}`}$.`,
          };
        },
        () => {
          const k = pick([2, 3, 1 / 2, 1 / 3]); let a, b; do { a = ri(-6, 6); b = ri(-6, 6); } while (a === b);
          const k2 = k * k, x0 = (a - k2 * b) / (1 - k2), r = Math.sqrt(x0 * x0 - (a * a - k2 * b * b) / (1 - k2));
          return {
            q: T`The locus $|z-(${a})|=${nice(k)}\,|z-(${b})|$ is a circle. Find its centre (a real number) and radius.`,
            fields: [{ label: 'centre', ans: x0 }, { label: 'radius', ans: r }],
            sol: T`$(x-${par(a)})^2+y^2=${nice(k2)}\left[(x-${par(b)})^2+y^2\right]$. Collect and divide by $${nice(1 - k2)}$:<br>
$x^2+y^2-2\left(${nice(x0)}\right)x+${nice((a * a - k2 * b * b) / (1 - k2))}=0$, so centre $${nice(x0)}$, radius $\sqrt{${nice(x0 * x0)}-(${nice((a * a - k2 * b * b) / (1 - k2))})}=${nice(r)}$.`,
          };
        },
        () => {
          const [p, q, h] = pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [12, 5, 13], [8, 6, 10]]); const r = ri(1, h - 1);
          const ac = Math.atan2(q, p), d = Math.asin(r / h);
          return {
            q: T`$z$ lies on $|z-(${p}+${q}i)|=${r}$. Find the greatest and least values of $\arg z$ (radians).`,
            fields: [{ label: 'max arg', ans: ac + d }, { label: 'min arg', ans: ac - d }],
            sol: T`Tangents from $O$. $\arg c=\arctan\tfrac{${q}}{${p}}=${num(ac)}$, half-angle $=\arcsin\tfrac{${r}}{${h}}=${num(d)}$.<br>max $=${num(ac + d)}$, min $=${num(ac - d)}$.`,
          };
        },
      ],
    },
  ],
});

/* ======================= 2. MATRICES ======================= */
function unimod2() { return pick([[[1, 1], [0, 1]], [[1, 2], [1, 3]], [[2, 1], [1, 1]], [[1, 1], [1, 2]], [[1, -1], [1, 0]], [[3, 2], [1, 1]], [[1, 0], [2, 1]], [[2, 3], [1, 2]]]); }
function eig2() {
  const P = unimod2(); let l1 = ri(-3, 5), l2; do l2 = ri(-3, 5); while (l2 === l1);
  const A = M.mul(M.mul(P, [[l1, 0], [0, l2]]), M.inv2(P)).map(r => r.map(Math.round));
  return { P, A, l1, l2 };
}
function unimod3() {
  const L = [[1, 0, 0], [ri(-1, 1), 1, 0], [ri(-1, 1), ri(-1, 1), 1]], U = [[1, ri(-1, 1), ri(-1, 1)], [0, 1, ri(-1, 1)], [0, 0, 1]];
  return M.mul(L, U);
}
function inv3int(P) { return M.adj3(P).map(r => r.map(x => x / M.det3(P))); }

topic({
  id: 'mx', code: '2', title: 'Matrices', icon: '▦', color: '#a2845e',
  blurb: '3×3 determinants & inverses, eigenvalues/eigenvectors, diagonalisation, systems of planes.',
  points: [
    {
      id: 'mx1', code: '2.1', title: '3×3 determinants & inverses',
      sims: ['matrix2'],
      notes: T`
<p>Expand along the top row (or any row/column with zeros):</p>
$$\det\mathbf A=a\begin{vmatrix}e&f\\h&i\end{vmatrix}-b\begin{vmatrix}d&f\\g&i\end{vmatrix}+c\begin{vmatrix}d&e\\g&h\end{vmatrix}$$
<ul>
<li>$\det\mathbf A$ = volume scale factor of the transformation. $\det=0\iff$ singular (no inverse; space squashed to a plane/line).</li>
<li><b>Inverse</b>: matrix of minors → apply sign chessboard $\begin{smallmatrix}+&-&+\\-&+&-\\+&-&+\end{smallmatrix}$ → cofactors → <b>transpose</b> (adjugate) → divide by $\det$.
$$\mathbf A^{-1}=\frac{1}{\det\mathbf A}\operatorname{adj}\mathbf A$$</li>
<li>$(\mathbf{AB})^{-1}=\mathbf B^{-1}\mathbf A^{-1}$, $\det(\mathbf{AB})=\det\mathbf A\det\mathbf B$, $(\mathbf{AB})^T=\mathbf B^T\mathbf A^T$.</li>
</ul>
<div class="tip"><b>Most common error:</b> forgetting to transpose the cofactor matrix. Check with $\mathbf A\mathbf A^{-1}=\mathbf I$ on one row.</div>`,
      drills: [
        () => {
          const A = M.rnd(3, -4, 5);
          return {
            q: T`Find $\det\mathbf A$ where $\mathbf A=${M.tex(A)}$.`,
            fields: [{ label: 'det A', ans: M.det3(A) }],
            sol: T`$${A[0][0]}(${M.det2(M.minor(A, 0, 0))})-${par(A[0][1])}(${M.det2(M.minor(A, 0, 1))})+${par(A[0][2])}(${M.det2(M.minor(A, 0, 2))})=${M.det3(A)}$.`,
          };
        },
        () => {
          let A, i, j, a1, b0;
          do { A = M.rnd(3, -3, 4); i = ri(0, 2); j = ri(0, 2); A[i][j] = 0; b0 = M.det3(A); A[i][j] = 1; a1 = M.det3(A) - b0; } while (a1 === 0);
          const disp = A.map((r, ii) => r.map((x, jj) => ii === i && jj === j ? 'k' : x));
          return {
            q: T`Find the value of $k$ for which $\begin{pmatrix}${disp.map(r => r.join('&')).join('\\\\')}\end{pmatrix}$ is singular.`,
            fields: [{ label: 'k', ans: -b0 / a1 }],
            sol: T`Expanding, $\det=${poly([[a1, 'k'], [b0, '']])}$ (it's linear in $k$). Singular $\iff\det=0\Rightarrow k=${fr(-b0, a1)}$.`,
          };
        },
        () => {
          let A, d; do { A = M.rnd(3, -3, 4); d = M.det3(A); } while (d === 0 || Math.abs(d) > 30);
          const adj = M.adj3(A), i = ri(0, 2), j = ri(0, 2);
          return {
            q: T`$\mathbf A=${M.tex(A)}$. Find $\det\mathbf A$ and the entry in row ${i + 1}, column ${j + 1} of $\mathbf A^{-1}$.`,
            fields: [{ label: 'det A', ans: d }, { label: `(A⁻¹)${i + 1}${j + 1}`, ans: adj[i][j] / d }],
            sol: T`$\det\mathbf A=${d}$. Adjugate (transposed cofactors): $\operatorname{adj}\mathbf A=${M.tex(adj)}$.<br>Entry $=\dfrac{${adj[i][j]}}{${d}}=${fr(adj[i][j], d)}$ — it's the cofactor of the $(${j + 1},${i + 1})$ entry of $\mathbf A$.`,
          };
        },
      ],
    },
    {
      id: 'mx2', code: '2.2', title: 'Eigenvalues & eigenvectors',
      sims: ['matrix2'],
      notes: T`
<p>$\mathbf v\ne\mathbf 0$ is an <b>eigenvector</b> with eigenvalue $\lambda$ if $\mathbf{Av}=\lambda\mathbf v$ — the transformation only stretches it.</p>
$$\det(\mathbf A-\lambda\mathbf I)=0\quad\text{(characteristic equation)}$$
<ul>
<li>2×2: $\lambda^2-(\operatorname{tr}\mathbf A)\lambda+\det\mathbf A=0$.</li>
<li>3×3: $\lambda^3-(\operatorname{tr})\lambda^2+(\text{sum of principal }2\times2\text{ minors})\lambda-\det=0$. Sum of eigenvalues = trace, product = det.</li>
<li>For each $\lambda$, solve $(\mathbf A-\lambda\mathbf I)\mathbf v=\mathbf 0$ — the equations are dependent; take any non-zero solution (for 3×3, cross two rows of $\mathbf A-\lambda\mathbf I$).</li>
<li>Eigenvectors are only defined up to scale; normalised means unit length.</li>
</ul>
<div class="tip"><b>Speed trick:</b> for a 3×3, guess an integer root of the cubic (try factors of det), then factor.</div>`,
      drills: [
        () => {
          const { A, l1, l2 } = eig2();
          return {
            q: T`Find the eigenvalues of $${M.tex(A)}$ (comma-separated).`,
            fields: [{ label: 'λ values', set: [l1, l2] }],
            sol: T`$\operatorname{tr}=${M.tr(A)}$, $\det=${M.det2(A)}$: $\;\lambda^2${sgn(-M.tr(A))}\lambda${sgn(M.det2(A))}=0\Rightarrow(\lambda-${par(l1)})(\lambda-${par(l2)})=0$, $\lambda=${l1},${l2}$.`,
          };
        },
        () => {
          const { A, P, l1, l2 } = eig2(), w = pick([0, 1]), l = w ? l2 : l1, v = [P[0][w], P[1][w]];
          return {
            q: T`$\mathbf A=${M.tex(A)}$ has eigenvalue $\lambda=${l}$. Find a corresponding eigenvector (enter as x, y).`,
            fields: [{ label: 'eigenvector', vec: v, prop: true }],
            sol: T`$(\mathbf A-${par(l)}\mathbf I)\mathbf v=\mathbf 0$: $\;${poly([[A[0][0] - l, 'x'], [A[0][1], 'y']])}=0$. So $\mathbf v\propto${V.tex(v)}$ (any non-zero multiple).`,
          };
        },
        () => {
          const P = unimod3(), ls = shuffle([-2, -1, 1, 2, 3, 4]).slice(0, 3);
          const A = M.mul(M.mul(P, [[ls[0], 0, 0], [0, ls[1], 0], [0, 0, ls[2]]]), inv3int(P)).map(r => r.map(Math.round));
          const c1 = M.det2(M.minor(A, 0, 0)) + M.det2(M.minor(A, 1, 1)) + M.det2(M.minor(A, 2, 2));
          return {
            q: T`Find the three eigenvalues of $${M.tex(A)}$.`,
            fields: [{ label: 'λ values', set: ls }],
            sol: T`Characteristic equation: $\lambda^3${sgn(-M.tr(A))}\lambda^2${sgn(c1)}\lambda${sgn(-M.det3(A))}=0$ (trace, sum of principal minors, det).<br>
Factor (try divisors of ${M.det3(A)}): $${ls.map(l => `(\\lambda${sgn(-l)})`).join('')}=0$.`,
            hint: 'Sum of eigenvalues = trace; product = det.',
          };
        },
        () => {
          const P = unimod3(), ls = shuffle([-2, -1, 1, 2, 3, 4]).slice(0, 3), w = ri(0, 2);
          const A = M.mul(M.mul(P, [[ls[0], 0, 0], [0, ls[1], 0], [0, 0, ls[2]]]), inv3int(P)).map(r => r.map(Math.round));
          const v = [P[0][w], P[1][w], P[2][w]];
          const B = A.map((r, i) => r.map((x, j) => x - (i === j ? ls[w] : 0)));
          return {
            q: T`$\mathbf A=${M.tex(A)}$ has eigenvalue $${ls[w]}$. Find a corresponding eigenvector (x, y, z).`,
            fields: [{ label: 'eigenvector', vec: v, prop: true }],
            sol: T`$\mathbf A-${par(ls[w])}\mathbf I=${M.tex(B)}$. A vector perpendicular to two independent rows (take their cross product) is $\propto${V.tex(V.simplify(v))}$.`,
          };
        },
      ],
    },
    {
      id: 'mx3', code: '2.3', title: 'Diagonalisation, powers & Cayley–Hamilton',
      sims: ['matrix2'],
      notes: T`
<p>If $\mathbf A$ has $n$ independent eigenvectors, put them as columns of $\mathbf P$ and eigenvalues on the diagonal of $\mathbf D$ (same order):</p>
$$\mathbf A=\mathbf{PDP}^{-1}\quad\Rightarrow\quad\mathbf A^n=\mathbf{PD}^n\mathbf P^{-1},\qquad \mathbf D^n=\operatorname{diag}(\lambda_1^n,\dots)$$
<ul>
<li>For a <b>symmetric</b> matrix, eigenvectors are orthogonal; normalise them and $\mathbf P^{-1}=\mathbf P^T$.</li>
<li>$\operatorname{tr}(\mathbf A^n)=\sum\lambda_i^n$, $\det(\mathbf A^n)=(\det\mathbf A)^n$.</li>
<li><b>Cayley–Hamilton</b>: every square matrix satisfies its own characteristic equation. 2×2: $\mathbf A^2=(\operatorname{tr}\mathbf A)\mathbf A-(\det\mathbf A)\mathbf I$. Use it to get $\mathbf A^{-1}$ or high powers without multiplying.</li>
</ul>`,
      drills: [
        () => {
          const { A, P, l1, l2 } = eig2(), n = ri(3, 5), An = M.pow(A, n);
          return {
            q: T`$\mathbf A=${M.tex(A)}=\mathbf{PDP}^{-1}$ with $\mathbf P=${M.tex(P)}$, $\mathbf D=${M.tex([[l1, 0], [0, l2]])}$. Find $\mathbf A^{${n}}$ (a, b, c, d row by row).`,
            fields: [{ label: 'a', ans: An[0][0] }, { label: 'b', ans: An[0][1] }, { label: 'c', ans: An[1][0] }, { label: 'd', ans: An[1][1] }],
            sol: T`$\mathbf A^{${n}}=\mathbf P${M.tex([[Math.pow(l1, n), 0], [0, Math.pow(l2, n)]])}\mathbf P^{-1}$, $\mathbf P^{-1}=${M.tex(M.inv2(P))}$<br>$\Rightarrow\mathbf A^{${n}}=${M.tex(An)}$. Check: trace $=${par(l1)}^{${n}}+${par(l2)}^{${n}}=${M.tr(An)}$.`,
          };
        },
        () => {
          const A = M.rnd(2, -4, 5), p = M.tr(A), q = -M.det2(A);
          return {
            q: T`$\mathbf A=${M.tex(A)}$. Using Cayley–Hamilton, $\mathbf A^2=p\mathbf A+q\mathbf I$ and $\mathbf A^3=\alpha\mathbf A+\beta\mathbf I$. Find $p,q,\alpha,\beta$.`,
            fields: [{ label: 'p', ans: p }, { label: 'q', ans: q }, { label: 'α', ans: p * p + q }, { label: 'β', ans: p * q }],
            sol: T`Characteristic eq: $\lambda^2-${par(p)}\lambda+${par(-q)}=0\Rightarrow\mathbf A^2=${p}\mathbf A${sgn(q)}\mathbf I$.<br>
$\mathbf A^3=p\mathbf A^2+q\mathbf A=p(p\mathbf A+q\mathbf I)+q\mathbf A=(p^2+q)\mathbf A+pq\mathbf I$: $\alpha=${p * p + q}$, $\beta=${p * q}$.`,
          };
        },
        () => {
          const { A, l1, l2 } = eig2(), n = ri(4, 8);
          return {
            q: T`$\mathbf A=${M.tex(A)}$. Find $\operatorname{tr}(\mathbf A^{${n}})$ without multiplying matrices.`,
            fields: [{ label: 'trace', ans: Math.pow(l1, n) + Math.pow(l2, n) }],
            sol: T`Eigenvalues ${l1}, ${l2} (from $\lambda^2${sgn(-M.tr(A))}\lambda${sgn(M.det2(A))}=0$). $\mathbf A^{${n}}$ has eigenvalues $\lambda^{${n}}$, so trace $=${par(l1)}^{${n}}+${par(l2)}^{${n}}=${Math.pow(l1, n) + Math.pow(l2, n)}$.`,
          };
        },
      ],
    },
    {
      id: 'mx4', code: '2.4', title: 'Linear systems & geometry of planes',
      sims: ['space3d:planes'],
      notes: T`
<p>Three equations in $x,y,z$ = three planes. Write as $\mathbf{Ax}=\mathbf b$.</p>
<table class="tbl"><tr><th>$\det\mathbf A$</th><th>Consistent?</th><th>Geometry</th></tr>
<tr><td>$\ne0$</td><td>Yes</td><td>Unique point $\mathbf x=\mathbf A^{-1}\mathbf b$</td></tr>
<tr><td>$=0$</td><td>Yes</td><td><b>Sheaf</b> — common line (infinitely many)</td></tr>
<tr><td>$=0$</td><td>No</td><td><b>Prism</b> (no two parallel) or two/three parallel planes</td></tr></table>
<ul>
<li>Test consistency when $\det=0$: find $\alpha,\beta$ with $\text{row}_3=\alpha\,\text{row}_1+\beta\,\text{row}_2$ on the LHS; check whether the RHS obeys the same relation.</li>
<li>Parallel planes: normals are multiples of each other.</li>
</ul>`,
      drills: [
        () => {
          const kind = pick(['point', 'sheaf', 'prism', 'parallel']); let n1, n2, n3, d1 = ri(-5, 5), d2 = ri(-5, 5), d3;
          do { n1 = V.rnd(-3, 3); n2 = V.rnd(-3, 3); } while (V.isZero(V.cross(n1, n2)));
          let a = rnz(-2, 2), b = rnz(-2, 2);
          if (kind === 'point') { do n3 = V.rnd(-3, 3); while (M.det3([n1, n2, n3]) === 0); d3 = ri(-5, 5); }
          else if (kind === 'parallel') { const c = rnz(-2, 2); n3 = V.mul(n1, c); d3 = c * d1 + rnz(-3, 3); }
          else { n3 = V.add(V.mul(n1, a), V.mul(n2, b)); d3 = a * d1 + b * d2 + (kind === 'prism' ? rnz(-3, 3) : 0); }
          const opts = ['A single point', 'A sheaf (common line)', 'A triangular prism (no common point)', 'Two planes parallel, no common point'];
          const correct = { point: 0, sheaf: 1, prism: 2, parallel: 3 }[kind];
          const eq = (n, d) => `${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])}&=${d}`;
          const sol = {
            point: T`$\det=${M.det3([n1, n2, n3])}\ne0$ so there is a unique solution: the planes meet at a point.`,
            sheaf: T`$\det=0$. LHS: $\text{row}_3=${a}\,\text{row}_1${sgn(b)}\,\text{row}_2$. RHS: $${a}(${d1})${sgn(b)}(${d2})=${d3}$ ✓ consistent → sheaf.`,
            prism: T`$\det=0$. LHS: $\text{row}_3=${a}\,\text{row}_1${sgn(b)}\,\text{row}_2$ but RHS: $${a}(${d1})${sgn(b)}(${d2})=${a * d1 + b * d2}\ne${d3}$ → inconsistent. No normals are parallel → prism.`,
            parallel: T`Normal 3 is a multiple of normal 1 but the constants don't match → parallel distinct planes, no solution.`,
          }[kind];
          return { q: T`Describe the configuration of the planes $\begin{aligned}${eq(n1, d1)}\\${eq(n2, d2)}\\${eq(n3, d3)}\end{aligned}$`, mc: { options: opts, correct }, sol };
        },
        () => {
          let A; do A = M.rnd(3, -3, 3); while (M.det3(A) === 0);
          const x = V.rnd(-4, 4), b = A.map(r => V.dot(r, x));
          return {
            q: T`Solve $\begin{aligned}${A.map((r, i) => `${poly([[r[0], 'x'], [r[1], 'y'], [r[2], 'z']])}&=${b[i]}`).join('\\\\')}\end{aligned}$`,
            fields: [{ label: 'x', ans: x[0] }, { label: 'y', ans: x[1] }, { label: 'z', ans: x[2] }],
            sol: T`$\det\mathbf A=${M.det3(A)}\ne0$ so $\mathbf x=\mathbf A^{-1}\mathbf b=\frac{1}{${M.det3(A)}}${M.tex(M.adj3(A))}${V.tex(b)}=${V.tex(x)}$.`,
          };
        },
      ],
    },
  ],
});

/* ======================= 3. VECTORS ======================= */
const lineAngle = (u, v) => Math.acos(Math.min(1, Math.abs(V.dot(u, v)) / (V.norm(u) * V.norm(v)))) * 180 / Math.PI;
topic({
  id: 'vc', code: '3', title: 'Vectors', icon: '→', color: '#00a896',
  blurb: 'Vector product, lines & planes, angles, intersections and shortest distances.',
  points: [
    {
      id: 'vc1', code: '3.1', title: 'Vector product & scalar triple product',
      sims: ['space3d:skew'],
      notes: T`
$$\mathbf a\times\mathbf b=\begin{vmatrix}\mathbf i&\mathbf j&\mathbf k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix},\qquad |\mathbf a\times\mathbf b|=|\mathbf a||\mathbf b|\sin\theta$$
<ul>
<li>$\mathbf a\times\mathbf b$ is perpendicular to both — the go-to way to get a <b>normal</b>.</li>
<li>Anti-commutative: $\mathbf b\times\mathbf a=-\mathbf a\times\mathbf b$; $\mathbf a\times\mathbf a=\mathbf 0$ (parallel ⇒ zero).</li>
<li>Area of parallelogram $=|\mathbf a\times\mathbf b|$; triangle $=\tfrac12|\overrightarrow{AB}\times\overrightarrow{AC}|$.</li>
<li>Scalar triple product $\mathbf a\cdot(\mathbf b\times\mathbf c)=\det[\mathbf a,\mathbf b,\mathbf c]$: volume of parallelepiped. Tetrahedron $=\tfrac16|\ldots|$. Zero ⇔ coplanar.</li>
</ul>`,
      drills: [
        () => {
          const a = V.rnd(-5, 5), b = V.rnd(-5, 5), c = V.cross(a, b);
          return {
            q: T`Find $${V.tex(a)}\times${V.tex(b)}$ (enter as x, y, z).`,
            fields: [{ label: 'a × b', vec: c }],
            sol: T`$\mathbf i(${a[1]}\cdot${par(b[2])}-${par(a[2])}\cdot${par(b[1])})-\mathbf j(${a[0]}\cdot${par(b[2])}-${par(a[2])}\cdot${par(b[0])})+\mathbf k(${a[0]}\cdot${par(b[1])}-${par(a[1])}\cdot${par(b[0])})=${V.tex(c)}$`,
          };
        },
        () => {
          let A, B, C, n; do { A = V.rnd(); B = V.rnd(); C = V.rnd(); n = V.cross(V.sub(B, A), V.sub(C, A)); } while (V.isZero(n));
          return {
            q: T`Find the area of triangle $ABC$: $A${V.row(A)}$, $B${V.row(B)}$, $C${V.row(C)}$.`,
            fields: [{ label: 'area', ans: V.norm(n) / 2 }],
            sol: T`$\overrightarrow{AB}\times\overrightarrow{AC}=${V.tex(V.sub(B, A))}\times${V.tex(V.sub(C, A))}=${V.tex(n)}$, magnitude $\sqrt{${V.n2(n)}}$.<br>Area $=\tfrac12\sqrt{${V.n2(n)}}=${num(V.norm(n) / 2)}$.`,
          };
        },
        () => {
          let A, B, C, D, v; do { A = V.rnd(-3, 3); B = V.rnd(-3, 3); C = V.rnd(-3, 3); D = V.rnd(-3, 3); v = V.dot(V.sub(B, A), V.cross(V.sub(C, A), V.sub(D, A))); } while (v === 0);
          return {
            q: T`Find the volume of the tetrahedron with vertices $A${V.row(A)}$, $B${V.row(B)}$, $C${V.row(C)}$, $D${V.row(D)}$.`,
            fields: [{ label: 'volume', ans: Math.abs(v) / 6 }],
            sol: T`$\overrightarrow{AB}\cdot(\overrightarrow{AC}\times\overrightarrow{AD})=${v}$. Volume $=\tfrac16|${v}|=${fr(Math.abs(v), 6)}$.`,
          };
        },
      ],
    },
    {
      id: 'vc2', code: '3.2', title: 'Equations of lines & planes; intersections',
      sims: ['space3d:lineplane'],
      notes: T`
<ul>
<li><b>Line</b>: $\mathbf r=\mathbf a+\lambda\mathbf d$. Cartesian: $\dfrac{x-a_1}{d_1}=\dfrac{y-a_2}{d_2}=\dfrac{z-a_3}{d_3}$.</li>
<li><b>Plane</b>: vector $\mathbf r=\mathbf a+\lambda\mathbf b+\mu\mathbf c$; scalar product $\mathbf r\cdot\mathbf n=\mathbf a\cdot\mathbf n$; Cartesian $n_1x+n_2y+n_3z=d$.</li>
<li>Plane through $A,B,C$: $\mathbf n=\overrightarrow{AB}\times\overrightarrow{AC}$, $d=\mathbf n\cdot\mathbf a$.</li>
<li><b>Line ∩ plane</b>: substitute the line's general point into the plane, solve for $\lambda$.</li>
<li><b>Plane ∩ plane</b>: direction $\mathbf n_1\times\mathbf n_2$; find one common point by setting e.g. $z=0$.</li>
<li>Line parallel to plane ⇔ $\mathbf d\cdot\mathbf n=0$ (then it lies in it or never meets it).</li>
</ul>`,
      drills: [
        () => {
          let A, B, C, n; do { A = V.rnd(-3, 3); B = V.rnd(-3, 3); C = V.rnd(-3, 3); n = V.cross(V.sub(B, A), V.sub(C, A)); } while (V.isZero(n));
          const s = V.simplify(n), d = V.dot(s, A);
          return {
            q: T`Find a Cartesian equation $ax+by+cz=d$ of the plane through $A${V.row(A)}$, $B${V.row(B)}$, $C${V.row(C)}$. Enter a, b, c, d.`,
            fields: [{ label: 'a, b, c, d', vec: [...s, d], prop: true }],
            sol: T`$\mathbf n=\overrightarrow{AB}\times\overrightarrow{AC}=${V.tex(n)}\propto${V.tex(s)}$. $d=\mathbf n\cdot\mathbf a=${d}$.<br>$${poly([[s[0], 'x'], [s[1], 'y'], [s[2], 'z']])}=${d}$ (any multiple is fine).`,
          };
        },
        () => {
          let P = V.rnd(-4, 4), d, n; do { d = V.rnd(-3, 3); n = V.rnd(-3, 3); } while (V.isZero(d) || V.dot(d, n) === 0);
          const t0 = rnz(-3, 3), a = V.sub(P, V.mul(d, t0)), p = V.dot(n, P);
          return {
            q: T`Find where the line $${vecStr(a, d)}$ meets the plane $${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])}=${p}$. Enter x, y, z.`,
            fields: [{ label: 'point', vec: P }],
            sol: T`General point $(${poly([[a[0], ''], [d[0], '\\lambda']])},\ ${poly([[a[1], ''], [d[1], '\\lambda']])},\ ${poly([[a[2], ''], [d[2], '\\lambda']])})$.<br>
Substitute: $${V.dot(n, a)}${sgn(V.dot(n, d))}\lambda=${p}\Rightarrow\lambda=${t0}$. Point $${V.row(P)}$.`,
          };
        },
        () => {
          let n1, n2, c; do { n1 = V.rnd(-3, 3); n2 = V.rnd(-3, 3); c = V.cross(n1, n2); } while (V.isZero(c));
          const d1 = ri(-5, 5), d2 = ri(-5, 5);
          return {
            q: T`Find a direction vector of the line of intersection of $${poly([[n1[0], 'x'], [n1[1], 'y'], [n1[2], 'z']])}=${d1}$ and $${poly([[n2[0], 'x'], [n2[1], 'y'], [n2[2], 'z']])}=${d2}$.`,
            fields: [{ label: 'direction', vec: c, prop: true }],
            sol: T`The line lies in both planes, so it's perpendicular to both normals: $\mathbf n_1\times\mathbf n_2=${V.tex(c)}\propto${V.tex(V.simplify(c))}$.`,
          };
        },
      ],
    },
    {
      id: 'vc3', code: '3.3', title: 'Angles & shortest distances',
      sims: ['space3d:skew'],
      notes: T`
<table class="tbl"><tr><th>Quantity</th><th>Formula</th></tr>
<tr><td>Angle between lines</td><td>$\cos\theta=\dfrac{|\mathbf d_1\cdot\mathbf d_2|}{|\mathbf d_1||\mathbf d_2|}$</td></tr>
<tr><td>Angle line–plane</td><td>$\sin\theta=\dfrac{|\mathbf d\cdot\mathbf n|}{|\mathbf d||\mathbf n|}$ (it's $90^\circ-$ angle with normal)</td></tr>
<tr><td>Angle between planes</td><td>$\cos\theta=\dfrac{|\mathbf n_1\cdot\mathbf n_2|}{|\mathbf n_1||\mathbf n_2|}$</td></tr>
<tr><td>Point $P$ to plane $\mathbf r\cdot\mathbf n=d$</td><td>$\dfrac{|\mathbf n\cdot\mathbf p-d|}{|\mathbf n|}$</td></tr>
<tr><td>Point $P$ to line $\mathbf a+\lambda\mathbf d$</td><td>$\dfrac{|(\mathbf p-\mathbf a)\times\mathbf d|}{|\mathbf d|}$</td></tr>
<tr><td>Skew lines</td><td>$\dfrac{|(\mathbf b-\mathbf a)\cdot(\mathbf d_1\times\mathbf d_2)|}{|\mathbf d_1\times\mathbf d_2|}$</td></tr></table>
<div class="tip"><b>Trap:</b> for line–plane use <b>sin</b>, not cos. If you get the angle with the normal, subtract from 90°.</div>`,
      drills: [
        () => {
          let d, n; do { d = V.rnd(-4, 4); n = V.rnd(-4, 4); } while (V.isZero(d) || V.isZero(n) || V.dot(d, n) === 0);
          const th = Math.asin(Math.min(1, Math.abs(V.dot(d, n)) / (V.norm(d) * V.norm(n)))) * 180 / Math.PI;
          return {
            q: T`Find the acute angle (degrees) between the line with direction $${V.tex(d)}$ and the plane $${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])}=${ri(-5, 5)}$.`,
            fields: [{ label: 'θ (°)', ans: th }],
            sol: T`$\sin\theta=\dfrac{|${V.dot(d, n)}|}{\sqrt{${V.n2(d)}}\sqrt{${V.n2(n)}}}\Rightarrow\theta=${num(th)}^\circ$.`,
          };
        },
        () => {
          let n1, n2; do { n1 = V.rnd(-4, 4); n2 = V.rnd(-4, 4); } while (V.isZero(n1) || V.isZero(n2) || V.isZero(V.cross(n1, n2)));
          const th = lineAngle(n1, n2);
          return {
            q: T`Find the acute angle (degrees) between the planes $${poly([[n1[0], 'x'], [n1[1], 'y'], [n1[2], 'z']])}=${ri(-5, 5)}$ and $${poly([[n2[0], 'x'], [n2[1], 'y'], [n2[2], 'z']])}=${ri(-5, 5)}$.`,
            fields: [{ label: 'θ (°)', ans: th }],
            sol: T`$\cos\theta=\dfrac{|${V.dot(n1, n2)}|}{\sqrt{${V.n2(n1)}}\sqrt{${V.n2(n2)}}}\Rightarrow\theta=${num(th)}^\circ$.`,
          };
        },
        () => {
          let n; do n = V.rnd(-4, 4); while (V.isZero(n));
          const d = ri(-8, 8), P = V.rnd(-5, 5), D = Math.abs(V.dot(n, P) - d) / V.norm(n);
          return {
            q: T`Find the distance from $P${V.row(P)}$ to the plane $${poly([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])}=${d}$.`,
            fields: [{ label: 'distance', ans: D }],
            sol: T`$\dfrac{|${V.dot(n, P)}-${par(d)}|}{\sqrt{${V.n2(n)}}}=\dfrac{${Math.abs(V.dot(n, P) - d)}}{${surd(V.n2(n))}}=${num(D)}$.`,
          };
        },
        () => {
          let a, b, d1, d2, c; do { a = V.rnd(-4, 4); b = V.rnd(-4, 4); d1 = V.rnd(-3, 3); d2 = V.rnd(-3, 3); c = V.cross(d1, d2); } while (V.isZero(c) || V.dot(V.sub(b, a), c) === 0);
          const D = Math.abs(V.dot(V.sub(b, a), c)) / V.norm(c);
          return {
            q: T`Find the shortest distance between the skew lines $${vecStr(a, d1)}$ and $${vecStr(b, d2, '\\mu')}$.`,
            fields: [{ label: 'distance', ans: D }],
            sol: T`$\mathbf d_1\times\mathbf d_2=${V.tex(c)}$, $\;\mathbf b-\mathbf a=${V.tex(V.sub(b, a))}$.<br>Distance $=\dfrac{|${V.dot(V.sub(b, a), c)}|}{\sqrt{${V.n2(c)}}}=${num(D)}$.`,
          };
        },
        () => {
          let a, d, P, c; do { a = V.rnd(-4, 4); d = V.rnd(-3, 3); P = V.rnd(-4, 4); c = V.cross(V.sub(P, a), d); } while (V.isZero(d) || V.isZero(c));
          const D = V.norm(c) / V.norm(d);
          return {
            q: T`Find the perpendicular distance from $P${V.row(P)}$ to the line $${vecStr(a, d)}$.`,
            fields: [{ label: 'distance', ans: D }],
            sol: T`$(\mathbf p-\mathbf a)\times\mathbf d=${V.tex(V.sub(P, a))}\times${V.tex(d)}=${V.tex(c)}$.<br>Distance $=\dfrac{\sqrt{${V.n2(c)}}}{\sqrt{${V.n2(d)}}}=${num(D)}$.`,
          };
        },
      ],
    },
  ],
});
