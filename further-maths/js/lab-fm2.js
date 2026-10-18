// BCSFM Lab — extra Further Maths A2 1 tools: De Moivre multiple angles, polar area, and sums of series.
'use strict';

const PolyI = {
  mul: (p, q) => { const r = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => (r[i + j] += a * b))); return r; },
  add: (p, q) => Array.from({ length: Math.max(p.length, q.length) }, (_, i) => (p[i] || 0) + (q[i] || 0)),
  pow: (p, n) => { let r = [1]; for (let i = 0; i < n; i++) r = PolyI.mul(r, p); return r; },
  tex(p, v) { const t = []; for (let i = p.length - 1; i >= 0; i--) if (p[i]) t.push([p[i], i === 0 ? '' : i === 1 ? v : `${v}^{${i}}`]); return poly(t) || '0'; },
};

/* ---------------- De Moivre: multiple angles & powers (C1) ---------------- */
LAB.fm_demoivre = {
  title: "De Moivre: multiple angles", icon: 'cos nθ', course: 'fm', desc: 'cos nθ and sin nθ in powers of cos θ and sin θ, tan nθ in terms of tan θ, and cosⁿθ, sinⁿθ in multiple angles — to check your De Moivre expansions.',
  mount(el) {
    const U = LX.ui(el, `<div class="lab-row">${field('n', '5', 'id="mn" size="3"')}<button class="btn small" data-go>Expand</button></div><p class="muted small">Uses $(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta$ with $c=\\cos\\theta$, $s=\\sin\\theta$, $t=\\tan\\theta$, and $z^k+z^{-k}=2\\cos k\\theta$, $z^k-z^{-k}=2i\\sin k\\theta$.</p>`, { graph: false });
    function go() {
      try {
        const n = Math.round(U.n('mn')); if (n < 2 || n > 12) throw new Error('Choose n from 2 to 12');
        // (c + i s)^n: terms C(n,k) c^(n−k) (i s)^k. Even k → real, odd k → imaginary. Replace s² by 1 − c².
        let re = [0], im = [0], tn = [0], td = [0];
        for (let k = 0; k <= n; k++) {
          const sign = [1, 1, -1, -1][k % 4], co = nCr(n, k) * sign, cpart = Array(n - k + 1).fill(0); cpart[n - k] = 1;
          const s2 = PolyI.pow([1, 0, -1], Math.floor(k / 2)); const term = PolyI.mul(cpart, s2).map(x => x * co);
          if (k % 2 === 0) { re = PolyI.add(re, term); const t = Array(k + 1).fill(0); t[k] = co; td = PolyI.add(td, t); }
          else { im = PolyI.add(im, term); const t = Array(k + 1).fill(0); t[k] = co; tn = PolyI.add(tn, t); }
        }
        // powers: cos^n θ = 2^{−n} Σ C(n,k) cos((n−2k)θ); sin^n θ from (z − 1/z)^n / (2i)^n
        const half = 1 / Math.pow(2, n), cosP = [], sinP = [];
        for (let m = n; m >= 0; m -= 2) { const k = (n - m) / 2, c = (m === 0 ? 1 : 2) * nCr(n, k) * half; cosP.push([c, m]); }
        for (let m = n; m >= 0; m -= 2) { const k = (n - m) / 2, base = (m === 0 ? 1 : 2) * nCr(n, k) * Math.pow(-1, k) * half; const c = n % 2 === 0 ? base * Math.pow(-1, n / 2) : base * Math.pow(-1, (n - 1) / 2); sinP.push([c, m]); }
        const ang = (list, f) => list.filter(([c]) => Math.abs(c) > 1e-12).map(([c, m], i) => `${i ? (c < 0 ? '-' : '+') : c < 0 ? '-' : ''}${texNum(Math.abs(c))}${m === 0 ? '' : `\\${f} ${m === 1 ? '' : m}\\theta`}`).join('');
        // odd n: sin nθ purely in s, using c^(n−k) = (1 − s²)^((n−k)/2) for odd k
        let sOnly = [0];
        if (n % 2) for (let k = 1; k <= n; k += 2) { const co = nCr(n, k) * [1, 1, -1, -1][k % 4], sp = Array(k + 1).fill(0); sp[k] = 1; sOnly = PolyI.add(sOnly, PolyI.mul(sp, PolyI.pow([1, 0, -1], (n - k) / 2)).map(x => x * co)); }
        U.show(`<p class="hl">$\\cos${n}\\theta=${PolyI.tex(re, 'c')}$</p>
          <p class="hl">$\\sin${n}\\theta=s\\left(${PolyI.tex(im, 'c')}\\right)${n % 2 ? `=${PolyI.tex(sOnly, 's')}` : ''}$</p>
          <p class="hl">$\\tan${n}\\theta=\\dfrac{${PolyI.tex(tn, 't')}}{${PolyI.tex(td, 't')}}$</p>
          <p>$\\cos^{${n}}\\theta=${ang(cosP, 'cos')}$</p><p>$\\sin^{${n}}\\theta=${ang(sinP, n % 2 ? 'sin' : 'cos')}$</p>
          <p class="muted small">Here $c=\\cos\\theta$, $s=\\sin\\theta$, $t=\\tan\\theta$. Check at $\\theta=0$: the cos ${n}θ polynomial must give ${re.reduce((x, y) => x + y, 0)} = 1.</p>`);
      } catch (e) { U.err(e); }
    }
    LX.bind(el, go);
    return () => { };
  },
};

/* ---------------- Polar curves & area (R1–R3) ---------------- */
LAB.fm_polar = {
  title: 'Polar curves & area', icon: 'r,θ', course: 'fm', desc: 'Sketch r = f(θ), shade the region between α and β and evaluate ½∫r² dθ (exact where recognisable). Flags where r < 0.',
  mount(el) {
    const U = LX.ui(el, `${field('r(θ) =', '2(1 + cos(theta))', 'id="pr" class="wide"')}<div class="lab-row">${field('α', '0', 'id="pa" size="6"')}${field('β', 'pi', 'id="pb" size="6"')}<button class="btn small" data-go>Calculate</button></div><p class="muted small">Write θ as <code>theta</code> or <code>θ</code>; limits like <code>pi/3</code>.</p>`);
    let st = null;
    function go() {
      try {
        const r = fn(U.v('pr'), ['theta']), a = U.n('pa'), b = U.n('pb'); if (b <= a) throw new Error('β must be bigger than α');
        const A = 0.5 * integrate(t => r(t) ** 2, a, b); let neg = false; for (let i = 0; i <= 400; i++) if (r(a + (b - a) * i / 400) < -1e-9) neg = true;
        const id = identify(A / Math.PI);
        U.show(`<p class="hl">Area $=\\dfrac12\\displaystyle\\int_{${texNum(a)}}^{${texNum(b)}}r^2\\,d\\theta=${texNum(A)}${id && !/\\pi/.test(texNum(A)) ? `=${id.tex}\\pi` : ''}$</p>${neg ? '<p class="lab-err">r is negative for part of this range — on the CCEA convention those points are not drawn, and squaring hides the sign. Check the range carefully.</p>' : ''}<p class="muted small">Cartesian: $x=r\\cos\\theta$, $y=r\\sin\\theta$; $r^2=x^2+y^2$.</p>`);
        st = { r, a, b }; draw();
      } catch (e) { U.err(e); st = null; draw(); }
    }
    function draw() {
      const C = COL(), P = U.P; if (!st) { P.clear(); return; } let m = 1; for (let i = 0; i <= 720; i++) { const v = Math.abs(st.r(i * Math.PI / 360)); if (isFinite(v)) m = Math.max(m, v); }
      P.view(0, 0, m * 1.2); P.clear(); P.grid(m > 6 ? 2 : m > 2.5 ? 1 : 0.5, true);
      P.param(t => Math.max(0, st.r(t)) * Math.cos(t), t => Math.max(0, st.r(t)) * Math.sin(t), 0, 2 * Math.PI, C.axis, 1.2, 1400);
      const ctx = P.ctx; ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0)); for (let i = 0; i <= 600; i++) { const t = st.a + (st.b - st.a) * i / 600, rr = Math.max(0, st.r(t)); ctx.lineTo(P.X(rr * Math.cos(t)), P.Y(rr * Math.sin(t))); } ctx.closePath(); ctx.fillStyle = C.fill; ctx.fill();
      P.param(t => Math.max(0, st.r(t)) * Math.cos(t), t => Math.max(0, st.r(t)) * Math.sin(t), st.a, st.b, C.a, 3, 1000);
      [st.a, st.b].forEach((t, i) => P.line(0, 0, m * 1.3 * Math.cos(t), m * 1.3 * Math.sin(t), [C.b, C.d][i], 1.2, [5, 4]));
    }
    U.P.onresize = draw; LX.bind(el, go);
    return () => U.P.destroy();
  },
};

/* ---------------- Sums of series (A2, A3) ---------------- */
LAB.fm_sums = {
  title: 'Sums of series', icon: 'Σ', course: 'fm', desc: 'Evaluate Σ f(r) for any n, find the closed form in n when f is a polynomial, and test a method-of-differences answer against the actual sum.',
  mount(el) {
    const U = LX.ui(el, `${field('f(r) =', 'r(r+1)(r+2)', 'id="sf" class="wide"')}<div class="lab-row">${field('from r =', '1', 'id="sa" size="3"')}${field('to n =', '10', 'id="sn" size="4"')}</div>${field('your formula for the sum, in n (optional)', 'n(n+1)(n+2)(n+3)/4', 'id="sg" class="wide"')}<button class="btn small" data-go>Calculate</button>`, { graph: false });
    function go() {
      try {
        const f = fn(U.v('sf'), ['r']), a = Math.round(U.n('sa')), n = Math.round(U.n('sn')); if (n < a) throw new Error('n must be at least the starting value');
        const S = m => { let s = 0; for (let r = a; r <= m; r++) s += f(r); return s; };
        let html = `<p class="hl">$\\displaystyle\\sum_{r=${a}}^{${n}}f(r)=${texNum(S(n))}$</p>`;
        // polynomial closed form: fit S(m) for m = a−1 … a+d+? with degree up to 7
        let closed = null;
        for (let d = 1; d <= 8 && !closed; d++) {
          const ms = Array.from({ length: d + 1 }, (_, i) => a - 1 + i), A = ms.map(m => Array.from({ length: d + 1 }, (_, j) => m ** j)), c = solveLinear(A, ms.map(m => S(m)));
          if (!c) continue; const test = [a + d + 3, a + d + 7, a + 2 * d + 11].every(m => Math.abs(c.reduce((s, cj, j) => s + cj * m ** j, 0) - S(m)) < 1e-6 * (1 + Math.abs(S(m))));
          if (test) closed = c.map(x => (Math.abs(x) < 1e-10 ? 0 : x));
        }
        if (closed) html += `<p>Closed form (polynomial in $n$): $${LX.ex(closed.map((c, j) => [c, j === 0 ? '' : j === 1 ? 'n' : `n^{${j}}`]).reverse())}$<br><span class="muted small">Coefficients are shown exactly when recognisable — factorise this to compare with the standard results.</span></p>`;
        else { const big = S(Math.max(n, 2000)), big2 = S(Math.max(n, 4000)); html += `<p>Not a polynomial in $n$. Partial sums: $S_{${Math.max(n, 2000)}}\\approx${num(big, 8)}$, $S_{${Math.max(n, 4000)}}\\approx${num(big2, 8)}$${Math.abs(big2 - big) < 1e-4 ? ` — appears to converge to about $${num(big2, 6)}$${identify(big2) ? ` $=${identify(big2).tex}$?` : ''}` : ' — appears to diverge'}.</p>`; }
        const g = U.v('sg').trim();
        if (g) { const G = fn(g, ['n']), bad = [a, a + 1, a + 2, a + 5, n].filter(m => Math.abs(G(m) - S(m)) > 1e-6 * (1 + Math.abs(S(m)))); html += bad.length ? `<p class="lab-err">Your formula fails at n = ${bad.join(', ')} (e.g. it gives ${num(G(bad[0]), 6)}, the sum is ${num(S(bad[0]), 6)}).</p>` : `<p class="hl">✓ Your formula matches the sum for every n tested.</p>`; }
        U.show(html);
      } catch (e) { U.err(e); }
    }
    LX.bind(el, go);
    return () => { };
  },
};

// Course tags for the original Lab tools (the Lab page groups tools by course)
Object.entries({ grapher: 'both', calculus: 'both', algebra: 'both', complex: 'fm', matrix: 'fm', ode: 'fm', desmos: 'both', graph: 'both' }).forEach(([k, c]) => { if (LAB[k]) LAB[k].course ||= c; });
if (LAB.matrix) LAB.matrix.desc += ' On A2 1 this is for checking matrix powers in induction proofs.';
if (LAB.algebra) LAB.algebra.desc += ' AS 1: factor theorem and polynomial roots. FM: partial fractions.';
