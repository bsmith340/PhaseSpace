// CCEA GCE Further Mathematics A2 2 Applied Mathematics — Section A Mechanics 1, Section B Mechanics 2: notes + drills.
'use strict';

const v3 = (a, b, c) => poly([[a, '\\mathbf i'], [b, '\\mathbf j'], [c, '\\mathbf k']]);

topic({
  id: '_f4a', title: 'FM A2 2 mechanics', points: [
    /* ======================= SECTION A: MECHANICS 1 ======================= */
    {
      id: 'f4_shm', title: 'Simple harmonic motion', sims: ['f4_shm'],
      notes: T`<p>A particle moves with <b>SHM</b> about a fixed point $O$ if its acceleration is proportional to its displacement from $O$ and directed towards $O$: $$\ddot x=-\omega^2x.$$</p>
<ul><li>Solution: $x=a\sin(\omega t+\varepsilon)$ (or $x=a\cos\omega t$ from an extreme, $x=a\sin\omega t$ from $O$); amplitude $a$, period $T=\frac{2\pi}\omega$.</li><li>$v^2=\omega^2(a^2-x^2)$: greatest speed $a\omega$ at $O$; greatest acceleration $a\omega^2$ at the extremes.</li><li>Time from $O$ to displacement $x$: $\frac1\omega\sin^{-1}\frac xa$.</li></ul>`,
      drills: [
        () => { const a = pick([0.05, 0.1, 0.2, 0.3, 0.5, 2]), T_ = pick([0.5, 1, 2, 3, 4, Math.PI]); const w = 2 * Math.PI / T_; return { q: T`A particle moves with SHM of amplitude $${a}$ m and period $${T_ === Math.PI ? '\\pi' : T_}$ s. Find its greatest speed and greatest acceleration.`, fields: [{ label: 'v_max', ans: a * w }, { label: 'a_max', ans: a * w * w }],
          sol: T`$\omega=\frac{2\pi}T=${num(w, 4)}$ rad s⁻¹. $v_{\max}=a\omega=${num(a * w, 4)}$ m s⁻¹; $a_{\max}=a\omega^2=${num(a * w * w, 4)}$ m s⁻².` }; },
        () => { const a = pick([2, 3, 4, 5, 6, 10]), w = pick([1, 2, 3, 0.5]), x = ri(1, a - 1); return { q: T`A particle performs SHM with amplitude $${a}$ m and $\omega=${w}$ rad s⁻¹. Find its speed when it is $${x}$ m from the centre.`, fields: [{ label: 'v', ans: w * Math.sqrt(a * a - x * x) }], sol: T`$v^2=\omega^2(a^2-x^2)=${w * w}(${a * a}-${x * x})$, so $v=${num(w * Math.sqrt(a * a - x * x), 4)}$ m s⁻¹.` }; },
        () => { const [a, x1, x2] = pick([[5, 3, 4], [10, 6, 8], [13, 5, 12], [25, 7, 24], [25, 15, 20], [5, 4, 3], [13, 12, 5]]), w = pick([1, 2, 3, 0.5]); const v1 = w * Math.sqrt(a * a - x1 * x1), v2 = w * Math.sqrt(a * a - x2 * x2);
          return { q: T`A particle moving with SHM has speed $${num(v1)}$ m s⁻¹ when $${x1}$ m from the centre and $${num(v2)}$ m s⁻¹ when $${x2}$ m from the centre. Find $\omega$ and the amplitude.`, fields: [{ label: 'ω', ans: w }, { label: 'a', ans: a }],
            sol: T`$${num(v1 * v1)}=\omega^2(a^2-${x1 * x1})$ and $${num(v2 * v2)}=\omega^2(a^2-${x2 * x2})$. Subtract: $${num(v1 * v1 - v2 * v2)}=\omega^2(${x2 * x2 - x1 * x1})\Rightarrow\omega=${num(w)}$. Then $a^2=${x1 * x1}+\frac{${num(v1 * v1)}}{${num(w * w)}}=${a * a}$, $a=${a}$ m.` }; },
        () => { const a = pick([2, 4, 5, 6]), w = pick([2, 3, 4, Math.PI]), x = +(a * pick([0.5, 0.25, 0.75])).toFixed(2); const t = Math.asin(x / a) / w; return { q: T`A particle moves with SHM, $x=${a}\sin(${w === Math.PI ? '\\pi ' : w}t)$ m. Find the time it takes to move from the centre to a point $${x}$ m from the centre.`, fields: [{ label: 't (s)', ans: t }],
          sol: T`$${x}=${a}\sin(${w === Math.PI ? '\\pi ' : w}t)\Rightarrow t=\frac1{${w === Math.PI ? '\\pi' : w}}\sin^{-1}\frac{${x}}{${a}}=${num(t, 4)}$ s.` }; },
        () => { const opts = ['The acceleration is proportional to the displacement from O and directed towards O', 'The speed is constant', 'The acceleration is constant and directed towards O', 'The displacement is proportional to the time']; return { q: T`Which statement defines simple harmonic motion about a point $O$?`, mc: { options: opts, correct: 0 }, sol: T`$\ddot x=-\omega^2x$: acceleration proportional to displacement, towards $O$.` }; },
      ],
    },
    {
      id: 'f4_pend', title: 'The simple pendulum', sims: ['f4_shm'],
      notes: T`<ul><li>For small oscillations, a simple pendulum of length $l$ moves with approximate SHM: $\ddot\theta\approx-\frac gl\theta$ (using $\sin\theta\approx\theta$).</li><li>Period $T=2\pi\sqrt{\dfrac lg}$ — independent of the mass and (for small swings) the amplitude.</li>
<li>A <b>seconds pendulum</b> takes $1$ s for each swing, so its period is $2$ s: $l=\frac g{\pi^2}\approx0.993$ m.</li></ul>`,
      drills: [
        () => { const l = pick([0.25, 0.5, 0.8, 1, 1.5, 2, 2.5]); return { q: T`Find the period of small oscillations of a simple pendulum of length $${l}$ m.`, fields: [{ label: 'T (s)', ans: 2 * Math.PI * Math.sqrt(l / G) }], sol: T`$T=2\pi\sqrt{\frac{${l}}{9.8}}=${num(2 * Math.PI * Math.sqrt(l / G), 4)}$ s.` }; },
        () => { const T_ = pick([1, 1.5, 2.5, 3, 4]); const l = G * (T_ / (2 * Math.PI)) ** 2; return { q: T`Find the length of a simple pendulum with period $${T_}$ s.`, fields: [{ label: 'l (m)', ans: l }], sol: T`$l=g\left(\frac T{2\pi}\right)^2=9.8\left(\frac{${T_}}{2\pi}\right)^2=${num(l, 4)}$ m.` }; },
        () => { const g = pick([9.8, 9.81, 1.62, 3.71]); return { q: T`Find the length of a seconds pendulum where $g=${g}$ m s⁻².`, fields: [{ label: 'l (m)', ans: g / Math.PI ** 2 }], sol: T`Period $2$ s: $2=2\pi\sqrt{\frac l{${g}}}\Rightarrow l=\frac{${g}}{\pi^2}=${num(g / Math.PI ** 2, 4)}$ m.` }; },
        () => { const k = pick([4, 9, 2, 0.25, 1.21]); return { q: T`A pendulum's length is multiplied by $${k}$. By what factor is its period multiplied?`, fields: [{ label: 'factor', ans: Math.sqrt(k) }], sol: T`$T\propto\sqrt l$, so the factor is $\sqrt{${k}}=${num(Math.sqrt(k), 4)}$.` }; },
      ],
    },
    {
      id: 'f4_elosc', title: 'Oscillations on elastic strings & springs', sims: ['f4_shm'],
      notes: T`<ul><li>Horizontal spring (smooth surface), extension $x$: $m\ddot x=-\frac\lambda lx$, SHM with $\omega^2=\dfrac\lambda{ml}$ about the natural length position.</li>
<li>Vertical string or spring: equilibrium extension $e=\frac{mgl}\lambda$. Measuring $x$ from the equilibrium position, $m\ddot x=mg-\frac\lambda l(e+x)=-\frac\lambda lx$ — SHM about equilibrium with the same $\omega^2=\frac\lambda{ml}$.</li>
<li>A <b>string</b> only gives SHM while it is taut: if the amplitude exceeds $e$, the string goes slack above the natural length and the particle moves freely under gravity.</li></ul>`,
      drills: [
        () => { const m = pick([0.2, 0.5, 1, 2]), l = pick([0.5, 0.8, 1, 1.2]), lam = pick([10, 20, 40, 60, 98]); const w = Math.sqrt(lam / (m * l)); return { q: T`A particle of mass $${m}$ kg on a smooth horizontal table is attached to a spring of natural length $${l}$ m and modulus $${lam}$ N, fixed at its other end. Find the period of oscillation.`, fields: [{ label: 'T (s)', ans: 2 * Math.PI / w }],
          sol: T`$m\ddot x=-\frac{\lambda}{l}x\Rightarrow\omega^2=\frac{${lam}}{${m}\times${l}}=${num(w * w, 4)}$; $T=\frac{2\pi}\omega=${num(2 * Math.PI / w, 4)}$ s.` }; },
        () => { const m = pick([0.5, 1, 2]), l = pick([0.5, 1, 1.5]), lam = pick([49, 98, 147]), e = m * G * l / lam, d = +(e * pick([0.5, 0.8, 1])).toFixed(3); const w = Math.sqrt(lam / (m * l)); return { q: T`A particle of mass $${m}$ kg hangs in equilibrium on an elastic string ($l=${l}$ m, $\lambda=${lam}$ N). It is pulled down a further $${d}$ m and released. Find the greatest speed.`, fields: [{ label: 'v_max', ans: d * w }],
          sol: T`Equilibrium extension $e=\frac{mgl}\lambda=${num(e, 4)}$ m; the amplitude $${d}\le e$, so the string stays taut and the motion is SHM with $\omega=\sqrt{\frac\lambda{ml}}=${num(w, 4)}$. $v_{\max}=a\omega=${num(d * w, 4)}$ m s⁻¹.` }; },
        () => { const m = pick([0.5, 1, 2]), l = pick([0.5, 1]), lam = pick([24.5, 49, 98]); const e = m * G * l / lam; return { q: T`A particle of mass $${m}$ kg hangs from an elastic string ($l=${l}$ m, $\lambda=${lam}$ N). What is the greatest amplitude of vertical oscillation for which the string never becomes slack?`, fields: [{ label: 'amplitude (m)', ans: e }], sol: T`The string is slack above the natural length, which is $e=\frac{mgl}\lambda=${num(e, 4)}$ m above the equilibrium position. So the amplitude must be at most $${num(e, 4)}$ m.` }; },
        () => { const m = pick([0.4, 0.5, 1]), l = pick([0.8, 1]), lam = pick([20, 40]), a = pick([0.05, 0.1]); const w2 = lam / (m * l); return { q: T`A particle of mass $${m}$ kg oscillates horizontally on a spring ($l=${l}$ m, $\lambda=${lam}$ N) with amplitude $${a}$ m. Find its greatest acceleration.`, fields: [{ label: 'a_max', ans: a * w2 }], sol: T`$\omega^2=\frac{${lam}}{${m}(${l})}=${num(w2, 4)}$; $a_{\max}=a\omega^2=${num(a * w2, 4)}$ m s⁻².` }; },
      ],
    },
    {
      id: 'f4_damp', title: 'Damped oscillations', sims: ['f4_damp'],
      notes: T`<p>With a resistance proportional to velocity, $m\ddot x=-sx-k\dot x$, i.e. $\ddot x+2\gamma\dot x+\omega_0^2x=0$. The auxiliary equation $r^2+2\gamma r+\omega_0^2=0$ decides the motion:</p>
<ul><li><b>Heavy damping</b> ($\gamma\gt\omega_0$, real distinct roots): $x=Ae^{r_1t}+Be^{r_2t}$ — no oscillation.</li><li><b>Critical damping</b> ($\gamma=\omega_0$, repeated root): $x=(A+Bt)e^{-\gamma t}$ — returns fastest without oscillating.</li>
<li><b>Light damping</b> ($\gamma\lt\omega_0$, complex roots $-\gamma\pm i\beta$): $x=e^{-\gamma t}(A\cos\beta t+B\sin\beta t)$ — oscillations of period $\frac{2\pi}\beta$ with decaying amplitude.</li></ul>`,
      drills: [
        () => { const p = ri(1, 8), q = ri(1, 20), D = p * p - 4 * q, r = D > 0 ? 0 : D === 0 ? 1 : 2, opts = ['Heavy damping (no oscillation)', 'Critical damping', 'Light damping (decaying oscillations)']; return { q: T`The displacement of a particle satisfies $\ddot x+${p}\dot x+${q}x=0$. What type of damping is this?`, mc: { options: opts, correct: r }, sol: T`Auxiliary $r^2+${p}r+${q}=0$, discriminant $${p * p}-${4 * q}=${D}$: ${D > 0 ? 'positive — real distinct roots: heavy damping' : D === 0 ? 'zero — repeated root: critical damping' : 'negative — complex roots: light damping'}.` }; },
        () => { const g = ri(1, 3), b = ri(1, 5); const p = 2 * g, q = g * g + b * b; return { q: T`$\ddot x+${p}\dot x+${q}x=0$. Find the period of the damped oscillations.`, fields: [{ label: 'period (s)', ans: 2 * Math.PI / b }], sol: T`Roots $-${g}\pm${b}i$, so $x=e^{-${g}t}(A\cos${b}t+B\sin${b}t)$; period $\frac{2\pi}{${b}}=${num(2 * Math.PI / b, 4)}$ s.` }; },
        () => { const g = ri(1, 3), b = ri(1, 4), A = rnz(-3, 4), Bc = rnz(-3, 3); const p = 2 * g, q = g * g + b * b, v0 = -g * A + b * Bc; return { q: T`$\ddot x+${p}\dot x+${q}x=0$ with $x=${A}$ and $\dot x=${v0}$ when $t=0$. The solution is $x=e^{-${g}t}(A\cos${b}t+B\sin${b}t)$. Find $A$ and $B$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: Bc }],
          sol: T`$t=0$: $A=${A}$. $\dot x=e^{-${g}t}\big[(-${g}A+${b}B)\cos${b}t+\dots\big]$, so $\dot x(0)=-${g}A+${b}B=${v0}\Rightarrow B=${Bc}$.` }; },
        () => { const g = ri(1, 3), A = rnz(-3, 4), Bc = rnz(-3, 4), v0 = Bc - g * A; return { q: T`$\ddot x+${2 * g}\dot x+${g * g}x=0$ with $x(0)=${A}$, $\dot x(0)=${v0}$. The solution is $x=(A+Bt)e^{-${g}t}$. Find $A$ and $B$.`, fields: [{ label: 'A', ans: A }, { label: 'B', ans: Bc }], sol: T`Critical damping (repeated root $-${g}$). $x(0)=A=${A}$; $\dot x(0)=B-${g}A=${v0}\Rightarrow B=${Bc}$.` }; },
      ],
    },
    {
      id: 'f4_com1', title: 'Centre of mass: particles & rods', sims: ['f4_com'],
      notes: T`$$\bar x=\frac{\sum m_ix_i}{\sum m_i},\qquad\bar y=\frac{\sum m_iy_i}{\sum m_i}$$
<ul><li>The centre of mass is the point where the whole weight can be taken to act.</li><li>A uniform rod's centre of mass is at its midpoint; a framework of uniform rods (or a bent wire) is a system of "particles" at the midpoints, with masses proportional to lengths.</li><li>Use symmetry: the centre of mass lies on any line of symmetry.</li></ul>`,
      drills: [
        () => { const ms = [ri(1, 6), ri(1, 6), ri(1, 6)], xs = [ri(-4, 0), ri(0, 3), ri(3, 8)]; const xb = ms.reduce((s, m, i) => s + m * xs[i], 0) / ms.reduce((s, m) => s + m); return { q: T`Particles of masses $${ms.join('$, $')}$ kg lie on the $x$-axis at $x=${xs.join('$, $')}$. Find $\bar x$.`, fields: [{ label: 'x̄', ans: xb }],
          sol: T`$\bar x=\frac{${ms.map((m, i) => `${m}(${xs[i]})`).join('+')}}{${ms.reduce((s, m) => s + m)}}=${nice(xb)}$.` }; },
        () => { const ms = [ri(1, 5), ri(1, 5), ri(1, 5), ri(1, 5)], P = [[0, 0], [ri(2, 6), 0], [ri(2, 6), ri(2, 5)], [0, ri(2, 5)]]; const M = ms.reduce((s, m) => s + m), g = [ms.reduce((s, m, i) => s + m * P[i][0], 0) / M, ms.reduce((s, m, i) => s + m * P[i][1], 0) / M];
          return { q: T`Particles of masses $${ms.join('$, $')}$ kg are at $${P.map(p => `(${p[0]},${p[1]})`).join('$, $')}$. Find the centre of mass.`, fields: [{ label: '(x̄, ȳ)', vec: g }], sol: T`$\bar x=\frac{${ms.reduce((s, m, i) => s + m * P[i][0], 0)}}{${M}}=${nice(g[0])}$, $\bar y=\frac{${ms.reduce((s, m, i) => s + m * P[i][1], 0)}}{${M}}=${nice(g[1])}$.` }; },
        () => { const m1 = ri(1, 5), x1 = ri(0, 2), x2 = ri(6, 10), xb = ri(x1 + 1, x2 - 1); const m2 = m1 * (xb - x1) / (x2 - xb); return { q: T`A particle of mass $${m1}$ kg is at $x=${x1}$ and a particle of mass $m$ kg at $x=${x2}$. The centre of mass is at $x=${xb}$. Find $m$.`, fields: [{ label: 'm', ans: m2 }], sol: T`$${m1}(${x1})+${x2}m=${xb}(${m1}+m)\Rightarrow m(${x2 - xb})=${m1 * (xb - x1)}\Rightarrow m=${nice(m2)}$ kg.` }; },
        () => { const a = ri(2, 8), b = ri(2, 8); const g = [a * a / 2 / (a + b), b * b / 2 / (a + b)]; return { q: T`A uniform wire is bent into an L-shape: one straight part of length $${a}$ along the $x$-axis from $O$, and one of length $${b}$ along the $y$-axis from $O$. Find its centre of mass.`, fields: [{ label: '(x̄, ȳ)', vec: g }],
          sol: T`Masses proportional to lengths, at the midpoints $(${nice(a / 2)},0)$ and $(0,${nice(b / 2)})$: $\bar x=\frac{${a}\times${nice(a / 2)}}{${a + b}}=${nice(g[0])}$, $\bar y=\frac{${b}\times${nice(b / 2)}}{${a + b}}=${nice(g[1])}$.` }; },
      ],
    },
    {
      id: 'f4_lam', title: 'Centres of mass of laminae; composite laminae', sims: ['f4_com'],
      notes: T`<ul><li>Uniform rectangle or circle: at the centre. Triangle: at the centroid, the mean of the vertices — $\frac23$ of the way along each median from the vertex.</li><li>Semicircular lamina of radius $r$: on the axis, $\frac{4r}{3\pi}$ from the diameter (a sector of angle $2\alpha$: $\frac{2r\sin\alpha}{3\alpha}$ from the centre).</li>
<li><b>Composite</b> laminae: treat each piece as a particle at its own centre of mass, with mass proportional to area. A hole is a piece with <b>negative</b> mass.</li></ul>`,
      drills: [
        () => { const P = [[ri(-3, 3), ri(-3, 3)], [ri(-3, 6), ri(-3, 3)], [ri(-3, 3), ri(2, 7)]]; const area = Math.abs((P[1][0] - P[0][0]) * (P[2][1] - P[0][1]) - (P[2][0] - P[0][0]) * (P[1][1] - P[0][1])); if (!area) return null; const g = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
          return { q: T`Find the centre of mass of the uniform triangular lamina with vertices $${P.map(p => `(${p[0]},${p[1]})`).join('$, $')}$.`, fields: [{ label: '(x̄, ȳ)', vec: g }], sol: T`The centroid is the mean of the vertices: $\left(${nice(g[0])},\ ${nice(g[1])}\right)$.` }; },
        () => { const a = ri(4, 8), b = ri(1, 3), c = ri(1, 3), d = ri(3, 6); // L: rectangle a×b along bottom, rectangle c×(d) up the left side above it
          const A1 = a * b, A2 = c * d, g = [(A1 * a / 2 + A2 * c / 2) / (A1 + A2), (A1 * b / 2 + A2 * (b + d / 2)) / (A1 + A2)];
          return { q: T`An L-shaped uniform lamina is made of a rectangle $${a}\times${b}$ (with corners $(0,0)$ and $(${a},${b})$) and a rectangle $${c}\times${d}$ on top of its left end (corners $(0,${b})$ and $(${c},${b + d})$). Find its centre of mass.`, fields: [{ label: '(x̄, ȳ)', vec: g }],
            sol: T`Areas $${A1}$ at $(${nice(a / 2)},${nice(b / 2)})$ and $${A2}$ at $(${nice(c / 2)},${nice(b + d / 2)})$. $\bar x=\frac{${A1}(${nice(a / 2)})+${A2}(${nice(c / 2)})}{${A1 + A2}}=${nice(g[0])}$, $\bar y=\frac{${A1}(${nice(b / 2)})+${A2}(${nice(b + d / 2)})}{${A1 + A2}}=${nice(g[1])}$.` }; },
        () => { const w = pick([8, 10, 12]), h = pick([6, 8]), r = pick([1, 1.5, 2]), cx = pick([2, 3]); const A = w * h, a = Math.PI * r * r, xb = (A * w / 2 - a * cx) / (A - a);
          return { q: T`A uniform rectangular plate $${w}$ cm by $${h}$ cm has corners at $(0,0)$ and $(${w},${h})$. A circular hole of radius $${r}$ cm centred at $(${cx},${h / 2})$ is cut out. Find $\bar x$ for the remaining plate.`, fields: [{ label: 'x̄ (cm)', ans: xb }],
            sol: T`Rectangle: area $${A}$ at $x=${w / 2}$. Hole: area $${num(a, 4)}$ at $x=${cx}$, treated as negative. $\bar x=\frac{${A}(${w / 2})-${num(a, 4)}(${cx})}{${A}-${num(a, 4)}}=${num(xb, 4)}$ cm (and $\bar y=${h / 2}$ by symmetry).` }; },
        () => { const r = pick([3, 6, 9, 12]); return { q: T`Find the distance of the centre of mass of a uniform semicircular lamina of radius $${r}$ cm from its straight edge.`, fields: [{ label: 'distance (cm)', ans: 4 * r / (3 * Math.PI) }], sol: T`$\frac{4r}{3\pi}=\frac{${4 * r}}{3\pi}=${num(4 * r / (3 * Math.PI), 4)}$ cm (sector formula with $\alpha=\frac\pi2$).` }; },
      ],
    },
    {
      id: 'f4_susp', title: 'Suspended laminae', sims: ['f4_com'],
      notes: T`<ul><li>A body freely suspended from a point hangs in equilibrium with its <b>centre of mass vertically below the point of suspension</b> (weight and the support force must act along the same line).</li>
<li>To find an angle: locate $G$ relative to the suspension point $P$, then use $\tan$ in the right-angled triangle formed with a known edge.</li></ul>`,
      drills: [
        () => { const a = ri(2, 10), b = ri(2, 10); if (a === b) return null; const th = rd(Math.atan(b / a)); return { q: T`A uniform rectangular lamina $ABCD$ with $AB=${a}$ cm and $BC=${b}$ cm is suspended freely from $A$. Find the angle between $AB$ and the vertical.`, fields: [{ label: 'angle (°)', ans: th, tol: { abs: 0.06 } }],
          sol: T`$G$ is at the centre, $(${nice(a / 2)},${nice(b / 2)})$ from $A$ along $AB$, $AD$. $AG$ is vertical, so the angle between $AB$ and $AG$ is $\tan^{-1}\frac{${nice(b / 2)}}{${nice(a / 2)}}=${num(th, 4)}^\circ$.` }; },
        () => { const a = ri(4, 8), b = ri(1, 3), c = ri(1, 3), d = ri(3, 6); const A1 = a * b, A2 = c * d, gx = (A1 * a / 2 + A2 * c / 2) / (A1 + A2), gy = (A1 * b / 2 + A2 * (b + d / 2)) / (A1 + A2); const th = rd(Math.atan(gy / gx));
          return { q: T`The L-shaped lamina made of rectangles with corners $(0,0)$–$(${a},${b})$ and $(0,${b})$–$(${c},${b + d})$ is suspended from the origin $O$. Find the angle between the $x$-axis edge and the vertical.`, fields: [{ label: 'angle (°)', ans: th, tol: { abs: 0.06 } }],
            sol: T`$G=(${num(gx, 4)},${num(gy, 4)})$. $OG$ is vertical; the edge along the $x$-axis makes angle $\tan^{-1}\frac{${num(gy, 4)}}{${num(gx, 4)}}=${num(th, 4)}^\circ$ with it.` }; },
        () => { const b = pick([6, 8, 10, 12]), h = pick([6, 9, 12]); const th = rd(Math.atan((2 * h) / (3 * b))); return { q: T`A uniform isosceles triangular lamina $ABC$ has base $BC=${b}$ cm and height $${h}$ cm. It is suspended freely from $B$. Find the angle between $BC$ and the vertical.`, fields: [{ label: 'angle (°)', ans: 90 - th, tol: { abs: 0.06 } }],
          sol: T`With $B$ at the origin and $BC$ along the $x$-axis, $G=\left(${nice(b / 2)},\ ${nice(h / 3)}\right)$ (mean of the vertices). $BG$ is vertical and makes $\tan^{-1}\frac{${nice(h / 3)}}{${nice(b / 2)}}=${num(th, 4)}^\circ$ with $BC$, so $BC$ makes $90^\circ-${num(th, 4)}^\circ=${num(90 - th, 4)}^\circ$ with the vertical.` }; },
      ],
    },
    {
      id: 'f4_frame', title: 'Light pin-jointed frameworks', sims: [],
      notes: T`<ul><li>The rods are <b>light</b> and joined by smooth pins, so each rod exerts a force along its own length: a <b>tension</b> (pulling inwards on the joints) or a <b>thrust</b> (pushing outwards).</li>
<li>First find the external reactions (treat the framework as one rigid body: resolve and take moments).</li><li><b>Method of joints</b>: at each pin the forces are in equilibrium — resolve horizontally and vertically. Start at a joint with at most two unknown rod forces.</li><li>Assume every rod is in tension; a negative answer means it is a thrust.</li></ul>`,
      drills: [
        () => { const W = pick([20, 40, 60, 100, 120]), th = pick([30, 45, 60]); const F = W / (2 * Math.sin(dg(th))), Tb = W / (2 * Math.tan(dg(th))); return { q: T`A light framework is an isosceles triangle $ABC$ with $AB$ horizontal, smoothly supported at $A$ and $B$. Angles $CAB=CBA=${th}^\circ$ and a load of $${W}$ N hangs at $C$. Find the force in $AC$ and in $AB$.`, fields: [{ label: 'AC (N)', ans: F }, { label: 'AB (N)', ans: Tb }],
          sol: T`At $C$: $2F\sin${th}^\circ=${W}\Rightarrow F=${num(F, 4)}$ N — a <b>thrust</b> in $AC$ and $BC$. At $A$: horizontal $T_{AB}=F\cos${th}^\circ=${num(Tb, 4)}$ N — a <b>tension</b> in $AB$. (Reactions $${W / 2}$ N at each support.)` }; },
        () => { const W = pick([50, 80, 100, 150]), th = pick([30, 40, 45, 60]); return { q: T`A bracket: light rod $AB$ is horizontal, with $A$ pinned to a wall; light rod $CB$ joins $B$ to a point $C$ on the wall below $A$, making $${th}^\circ$ with the horizontal. A load of $${W}$ N hangs at $B$. Find the forces in $AB$ and $CB$.`, fields: [{ label: 'AB (N)', ans: W / Math.tan(dg(th)) }, { label: 'CB (N)', ans: W / Math.sin(dg(th)) }],
          sol: T`At $B$: vertically, $F_{CB}\sin${th}^\circ=${W}\Rightarrow F_{CB}=${num(W / Math.sin(dg(th)), 4)}$ N (a thrust — $CB$ pushes $B$ up and out). Horizontally, $T_{AB}=F_{CB}\cos${th}^\circ=${num(W / Math.tan(dg(th)), 4)}$ N (a tension).` }; },
        () => { const opts = ['A tension: the rod pulls inwards on the joints at its ends', 'A thrust: the rod pushes outwards on the joints at its ends', 'Zero: rods in frameworks carry no force', 'It depends on the mass of the rod']; const ask = pick([0, 1]); return { q: T`In the method of joints, a rod's force comes out ${ask === 0 ? 'positive' : 'negative'} when it was assumed to be a tension. What is it?`, mc: { options: opts, correct: ask }, sol: T`${ask === 0 ? 'Positive: the assumption was right — tension.' : 'Negative: the rod is in compression — a thrust.'}` }; },
      ],
    },
    {
      id: 'f4_bank', title: 'Banked corners: friction, sliding & overturning', sims: ['f2_conical'],
      notes: T`<ul><li>On a bank at angle $\theta$ with friction (coefficient $\mu$): at the <b>greatest</b> speed friction acts <b>down</b> the slope, at the <b>least</b> speed <b>up</b> the slope. Resolving vertically and horizontally gives $$v_{\max}^2=rg\frac{\sin\theta+\mu\cos\theta}{\cos\theta-\mu\sin\theta},\qquad v_{\min}^2=rg\frac{\sin\theta-\mu\cos\theta}{\cos\theta+\mu\sin\theta}.$$</li>
<li><b>Overturning</b> on a level bend: a vehicle with centre of mass at height $h$ and wheels $2d$ apart is about to overturn when the inner reaction is zero: $\frac{v^2}{rg}=\frac dh$. It slides first if $\mu\lt\frac dh$.</li></ul>`,
      drills: [
        () => { const r = pick([40, 50, 80, 100]), th = pick([10, 15, 20, 25]), mu = pick([0.2, 0.3, 0.4]); const s = Math.sin(dg(th)), c = Math.cos(dg(th)); if (c - mu * s <= 0) return null; const v = Math.sqrt(r * G * (s + mu * c) / (c - mu * s)); return { q: T`A car rounds a bend of radius $${r}$ m banked at $${th}^\circ$; $\mu=${mu}$. Find the greatest speed without slipping.`, fields: [{ label: 'v_max', ans: v }],
          sol: T`Friction down the slope. Vertically $R\cos\theta-F\sin\theta=mg$; horizontally $R\sin\theta+F\cos\theta=\frac{mv^2}r$; $F=\mu R$. Dividing: $v^2=rg\frac{\sin\theta+\mu\cos\theta}{\cos\theta-\mu\sin\theta}$, $v=${sf3(v)}$ m s⁻¹.` }; },
        () => { const r = pick([40, 60, 80, 100]), th = pick([20, 25, 30, 35]), mu = pick([0.1, 0.2, 0.25]); const s = Math.sin(dg(th)), c = Math.cos(dg(th)); if (s - mu * c <= 0) return null; const v = Math.sqrt(r * G * (s - mu * c) / (c + mu * s)); return { q: T`A track of radius $${r}$ m is banked at $${th}^\circ$ with $\mu=${mu}$. Find the least speed at which a car can go round without sliding down.`, fields: [{ label: 'v_min', ans: v }],
          sol: T`Friction up the slope: $v^2=rg\frac{\sin\theta-\mu\cos\theta}{\cos\theta+\mu\sin\theta}$, $v=${sf3(v)}$ m s⁻¹.` }; },
        () => { const r = pick([20, 30, 40, 50]), h = pick([0.8, 1, 1.2, 1.5]), d = pick([0.6, 0.75, 0.8, 0.9]); const v = Math.sqrt(r * G * d / h); return { q: T`A lorry has its centre of mass $${h}$ m above the road and its wheels $${2 * d}$ m apart. Assuming it does not slide, find the speed at which it would begin to overturn on a level bend of radius $${r}$ m.`, fields: [{ label: 'v (m/s)', ans: v }],
          sol: T`About to overturn: inner wheels' reaction zero. Moments about $G$ (or the outer wheel): $\frac{mv^2}r\cdot${h}=mg\cdot${d}\Rightarrow v=\sqrt{\frac{rgd}h}=${sf3(v)}$ m s⁻¹.` }; },
        () => { const h = pick([0.5, 0.8, 1]), d = pick([0.6, 0.8, 1]), mu = pick([0.4, 0.6, 0.8, 1.2]); if (Math.abs(mu - d / h) < 1e-9) return null; const opts = ['It slides before it overturns', 'It overturns before it slides']; return { q: T`A vehicle with centre of mass $${h}$ m high and half-track $${d}$ m goes round a level bend; $\mu=${mu}$. As the speed increases, does it slide or overturn first?`, mc: { options: opts, correct: mu < d / h ? 0 : 1 },
          sol: T`Sliding when $\frac{v^2}{rg}\gt\mu=${mu}$; overturning when $\frac{v^2}{rg}\gt\frac dh=${num(d / h, 4)}$. ${mu < d / h ? 'μ is smaller, so it slides first.' : 'd/h is smaller, so it overturns first.'}` }; },
      ],
    },
    /* ======================= SECTION B: MECHANICS 2 ======================= */
    {
      id: 'f4_kin3', title: 'Kinematics in three dimensions', sims: [],
      notes: T`<ul><li>$\mathbf r=x\mathbf i+y\mathbf j+z\mathbf k$; $\mathbf v=\dot{\mathbf r}$, $\mathbf a=\ddot{\mathbf r}$ — differentiate each component. Integrating, the constant is a vector found from initial conditions.</li>
<li>Speed $|\mathbf v|$; "moving perpendicular to $\mathbf d$" means $\mathbf v\cdot\mathbf d=0$; "velocity perpendicular to acceleration" means $\mathbf v\cdot\mathbf a=0$.</li></ul>`,
      drills: [
        () => { const c = [[rnz(-2, 2), ri(-4, 4), 0], [ri(-2, 2), rnz(-4, 4), ri(-3, 3)], [rnz(-1, 2), 0, ri(-3, 3)]], t = ri(1, 3); const vt = c.map(k => 2 * k[0] * t + k[1]); return { q: T`$\mathbf r=(${polyT(c[0])})\mathbf i+(${polyT(c[1])})\mathbf j+(${polyT(c[2])})\mathbf k$ m. Find the velocity and speed when $t=${t}$.`, fields: [{ label: 'v (i, j, k)', vec: vt }, { label: 'speed', ans: Math.hypot(...vt) }],
          sol: T`$\mathbf v=(${polyT([2 * c[0][0], c[0][1]])})\mathbf i+(${polyT([2 * c[1][0], c[1][1]])})\mathbf j+(${polyT([2 * c[2][0], c[2][1]])})\mathbf k$; at $t=${t}$: $${v3(...vt)}$, speed $${num(Math.hypot(...vt), 4)}$ m s⁻¹.` }; },
        () => { const a = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], u = [ri(-4, 4), ri(-4, 4), ri(-4, 4)], r0 = [ri(-3, 3), ri(-3, 3), ri(-3, 3)], t = ri(1, 4); const r = r0.map((x, i) => x + u[i] * t + a[i] * t * t / 2);
          return { q: T`A particle has constant acceleration $(${v3(...a)})$ m s⁻². At $t=0$ it is at $(${v3(...r0)})$ m with velocity $(${v3(...u)})$ m s⁻¹. Find its position vector when $t=${t}$.`, fields: [{ label: 'r (i, j, k)', vec: r }], sol: T`$\mathbf r=\mathbf r_0+\mathbf ut+\tfrac12\mathbf at^2$ $=${v3(...r.map(x => +x.toFixed(6)))}$ at $t=${t}$.` }; },
        () => { const T0 = ri(1, 4), d = [rnz(-2, 2), rnz(-2, 2), 0]; // v = (p t + q) i + (s t + w) j + 2 k ; v·d = 0 at t = T0
          const p = ri(1, 3), s = ri(-2, 2); const q0 = -(p * T0 * d[0] + s * T0 * d[1]) / d[0] ; if (!Number.isInteger(q0)) return null; const v = [`${polyT([p, q0])}`, `${polyT([s, 0])}`, '2'];
          return { q: T`A particle has velocity $\mathbf v=(${v[0]})\mathbf i+(${v[1]})\mathbf j+2\mathbf k$ m s⁻¹. Find the time when it is moving perpendicular to $${v3(d[0], d[1], 0)}$.`, fields: [{ label: 't', ans: T0 }], sol: T`$\mathbf v\cdot(${v3(d[0], d[1], 0)})=${d[0]}(${v[0]})${sgn(d[1])}(${v[1]})=0\Rightarrow t=${T0}$.` }; },
      ],
    },
    {
      id: 'f4_varacc', title: 'Variable acceleration: a(t), a(v), a(x); constant power', sims: [],
      notes: T`<ul><li>$a$ given as a function of $t$: integrate $\frac{dv}{dt}=f(t)$.</li><li>$a$ as a function of $v$: separate $\frac{dv}{dt}=f(v)$, i.e. $\int\frac{dv}{f(v)}=\int dt$.</li><li>$a$ as a function of $x$ (or when distance is wanted): use $a=v\frac{dv}{dx}$, so $\int v\,dv=\int f(x)\,dx$.</li>
<li><b>Constant power</b> $P$: driving force $\frac Pv$, so $mv\frac{dv}{dx}=\frac Pv-R$ or $m\frac{dv}{dt}=\frac Pv-R$.</li></ul>`,
      drills: [
        () => { const k = pick([0.1, 0.2, 0.5, 1, 2]), u = pick([10, 20, 30]), t = pick([1, 2, 3, 5]); const kk = k === 1 ? '' : k; return { q: T`A particle moves in a straight line with $a=-${kk}v$ and initial speed $${u}$ m s⁻¹. Find its speed after $${t}$ s.`, fields: [{ label: 'v', ans: u * Math.exp(-k * t) }], sol: T`$\frac{dv}{dt}=-${kk}v\Rightarrow\int\frac{dv}v=-${kk}\int dt\Rightarrow v=${u}e^{-${kk}t}$. At $t=${t}$: $${num(u * Math.exp(-k * t), 4)}$ m s⁻¹.` }; },
        () => { const k = pick([1, 4, 9, 16]), u = pick([5, 6, 8, 10]), x = pick([0.5, 1, 1.5, 2]); const v2 = u * u - k * x * x; if (v2 <= 0) return null; return { q: T`A particle moves along the $x$-axis with $a=-${k}x$ m s⁻². It passes through $O$ with speed $${u}$ m s⁻¹. Find its speed when $x=${x}$.`, fields: [{ label: 'v', ans: Math.sqrt(v2) }],
          sol: T`$v\frac{dv}{dx}=-${k}x\Rightarrow\tfrac12v^2=-\tfrac{${k}}2x^2+C$; at $x=0$, $v=${u}$: $v^2=${u * u}-${k}x^2=${num(v2, 4)}$, $v=${num(Math.sqrt(v2), 4)}$ m s⁻¹.` }; },
        () => { const m = pick([500, 800, 1000, 1200]), P = pick([10, 20, 30, 40]) * 1000, u = pick([5, 10]), v = u + pick([5, 10, 15]); const x = m * (v ** 3 - u ** 3) / (3 * P); return { q: T`A car of mass $${m}$ kg moves on a level road with its engine working at a constant $${P / 1000}$ kW; resistances are negligible. Find the distance it travels while accelerating from $${u}$ m s⁻¹ to $${v}$ m s⁻¹.`, fields: [{ label: 'distance (m)', ans: x }],
          sol: T`$mv\frac{dv}{dx}=\frac Pv\Rightarrow mv^2\,dv=P\,dx\Rightarrow x=\frac{m(v^3-u^3)}{3P}=\frac{${m}(${v}^3-${u}^3)}{3\times${P}}=${num(x, 4)}$ m.` }; },
        () => { const c = pick([0.01, 0.02, 0.05]), m = pick([1, 2, 5]), u = pick([20, 30, 40]), t = pick([1, 2, 5, 10]); const v = 1 / (1 / u + c * t / m); return { q: T`A body of mass $${m}$ kg moving at $${u}$ m s⁻¹ experiences only a resistance of $${c}v^2$ N. Find its speed after $${t}$ s.`, fields: [{ label: 'v', ans: v }],
          sol: T`$${m}\frac{dv}{dt}=-${c}v^2\Rightarrow\int\frac{dv}{v^2}=-\frac{${c}}{${m}}\int dt\Rightarrow\frac1v=\frac1{${u}}+\frac{${c}t}{${m}}$. At $t=${t}$: $v=${num(v, 4)}$ m s⁻¹.` }; },
        () => { const k = pick([2, 3, 4]), V = pick([3, 4, 5, 6]), u = 0, t = pick([0.5, 1, 2]); return { q: T`A particle starts from rest with $a=${k}(${V}-v)$ m s⁻². Find its speed after $${t}$ s and its terminal speed.`, fields: [{ label: 'v(t)', ans: V * (1 - Math.exp(-k * t)) }, { label: 'terminal', ans: V }],
          sol: T`$\int\frac{dv}{${V}-v}=${k}\int dt\Rightarrow-\ln(${V}-v)=${k}t+C$; $v=0$ at $t=0$: $v=${V}(1-e^{-${k}t})$. At $t=${t}$: $${num(V * (1 - Math.exp(-k * t)), 4)}$; as $t\to\infty$, $v\to${V}$ m s⁻¹.` }; },
      ],
    },
    {
      id: 'f4_comcal', title: 'Centres of mass by integration', sims: ['f4_com'],
      notes: T`<ul><li>Lamina under $y=f(x)$ from $a$ to $b$: $$\bar x=\frac{\int xy\,dx}{\int y\,dx},\qquad\bar y=\frac{\frac12\int y^2\,dx}{\int y\,dx}.$$</li><li>Solid of revolution about the $x$-axis: $$\bar x=\frac{\int\pi xy^2\,dx}{\int\pi y^2\,dx}$$ (and $\bar y=0$ by symmetry).</li>
<li>Standard results (in the booklet): solid hemisphere $\frac38r$ from the plane face; solid cone $\frac h4$ from the base; hemispherical shell $\frac r2$; conical shell $\frac h3$.</li></ul>`,
      drills: [
        () => { const n = pick([1, 2, 3]), a = pick([1, 2, 3, 4]); return { q: T`Find $\bar x$ for the uniform lamina bounded by $y=x^{${n}}$, the $x$-axis and the line $x=${a}$.`, fields: [{ label: 'x̄', ans: (n + 1) * a / (n + 2) }], sol: T`$\bar x=\frac{\int_0^{${a}}x^{${n + 1}}dx}{\int_0^{${a}}x^{${n}}dx}=\frac{${a}^{${n + 2}}/${n + 2}}{${a}^{${n + 1}}/${n + 1}}=\frac{${n + 1}}{${n + 2}}(${a})=${nice((n + 1) * a / (n + 2))}$.` }; },
        () => { const n = pick([1, 2]), a = pick([1, 2, 3]); const yb = (n + 1) * a ** n / (2 * (2 * n + 1)); return { q: T`Find $\bar y$ for the uniform lamina bounded by $y=x^{${n}}$, the $x$-axis and $x=${a}$.`, fields: [{ label: 'ȳ', ans: yb }], sol: T`$\bar y=\frac{\frac12\int_0^{${a}}x^{${2 * n}}dx}{\int_0^{${a}}x^{${n}}dx}=\frac{\frac12\cdot${a}^{${2 * n + 1}}/${2 * n + 1}}{${a}^{${n + 1}}/${n + 1}}=${nice(yb)}$.` }; },
        () => { const n = pick([0.5, 1, 2]), a = pick([1, 2, 4]); const xb = (2 * n + 1) * a / (2 * n + 2); return { q: T`The region under $y=${n === 0.5 ? '\\sqrt x' : n === 1 ? 'x' : 'x^2'}$ from $x=0$ to $x=${a}$ is rotated through $2\pi$ about the $x$-axis. Find $\bar x$ for the uniform solid formed.`, fields: [{ label: 'x̄', ans: xb }],
          sol: T`$\bar x=\frac{\int_0^{${a}}x\cdot x^{${2 * n}}dx}{\int_0^{${a}}x^{${2 * n}}dx}=\frac{${2 * n + 1}}{${2 * n + 2}}(${a})=${nice(xb)}$.${n === 1 ? ' (A cone with vertex at O: $\\frac34h$ from the vertex, i.e. $\\frac h4$ from the base ✓.)' : ''}` }; },
        () => { const r = pick([4, 8, 12, 16]), sh = Math.random() < 0.5; return { q: T`Find the distance of the centre of mass of a uniform ${sh ? 'hemispherical shell' : 'solid hemisphere'} of radius $${r}$ cm from the centre of its plane face.`, fields: [{ label: 'distance (cm)', ans: sh ? r / 2 : 3 * r / 8 }], sol: T`${sh ? `$\\frac r2=${r / 2}$` : `$\\frac38r=${nice(3 * r / 8)}$`} cm (standard result).` }; },
      ],
    },
    {
      id: 'f4_comp', title: 'Composite bodies & suspended bodies', sims: ['f4_com'],
      notes: T`<ul><li>Composite solid: each part is a particle at its own centre of mass with mass proportional to its <b>volume</b> (for uniform density). Cylinder $\pi r^2h$, cone $\frac13\pi r^2h$, hemisphere $\frac23\pi r^3$.</li><li>Removed parts count negatively.</li>
<li>A suspended body hangs with its centre of mass vertically below the point of suspension.</li></ul>`,
      drills: [
        () => { const r = pick([2, 3, 4, 6]), h = pick([4, 6, 8, 10]); const xb = (h * h / 2 + (2 * r / 3) * (h + 3 * r / 8)) / (h + 2 * r / 3); return { q: T`A uniform solid consists of a cylinder of radius $${r}$ cm and height $${h}$ cm with a hemisphere of radius $${r}$ cm fixed to one end. Find the distance of its centre of mass from the other (plane) end of the cylinder.`, fields: [{ label: 'distance (cm)', ans: xb }],
          sol: T`Volumes ∝ $r^2h=${r * r * h}$ and $\frac23r^3=${nice(2 * r ** 3 / 3)}$; centres at $${nice(h / 2)}$ and $${h}+\frac38(${r})=${nice(h + 3 * r / 8)}$ from the plane end. $\bar x=\frac{${r * r * h}(${nice(h / 2)})+${nice(2 * r ** 3 / 3)}(${nice(h + 3 * r / 8)})}{${r * r * h}+${nice(2 * r ** 3 / 3)}}=${num(xb, 4)}$ cm.` }; },
        () => { const h = pick([4, 6, 8, 10]), H = pick([3, 6, 9, 12]); const xb = (h * h / 2 + (H / 3) * (h + H / 4)) / (h + H / 3); return { q: T`A toy is a uniform solid cylinder of height $${h}$ cm with a solid cone of the same radius and height $${H}$ cm on top. Find the height of its centre of mass above the base.`, fields: [{ label: 'height (cm)', ans: xb }],
          sol: T`Volumes ∝ $${h}$ and $\frac{${H}}3$; centres at $${nice(h / 2)}$ and $${h}+\frac{${H}}4$. $\bar y=\frac{${h}(${nice(h / 2)})+${nice(H / 3)}(${nice(h + H / 4)})}{${h}+${nice(H / 3)}}=${num(xb, 4)}$ cm.` }; },
        () => { const r = pick([4, 6, 8]); const th = rd(Math.atan(3 / 8)); return { q: T`A uniform solid hemisphere of radius $${r}$ cm is suspended from a point on the rim of its plane face. Find the angle between the plane face and the vertical.`, fields: [{ label: 'angle (°)', ans: th, tol: { abs: 0.06 } }],
          sol: T`$G$ is $\frac38r$ from the centre $O$ along the axis; the suspension point $P$ is $r$ from $O$ in the plane face. $PG$ is vertical, so $\tan\theta=\frac{3r/8}{r}=\frac38$, $\theta=${num(th, 4)}^\circ$ — the same for any radius.` }; },
        () => { const R = pick([6, 8, 10]), r = pick([2, 3, 4]); if (r >= R) return null; const xb = (R ** 3 * 3 * R / 8 - r ** 3 * 3 * r / 8) / (R ** 3 - r ** 3); return { q: T`A solid hemisphere of radius $${r}$ cm is removed from a uniform solid hemisphere of radius $${R}$ cm, leaving a body with the same plane face centre. Find the distance of the centre of mass of the remaining body from that centre.`, fields: [{ label: 'distance (cm)', ans: xb }],
          sol: T`Masses ∝ $R^3$ and $r^3$: $\bar x=\frac{${R ** 3}\cdot\frac38(${R})-${r ** 3}\cdot\frac38(${r})}{${R ** 3}-${r ** 3}}=${num(xb, 4)}$ cm.` }; },
      ],
    },
    {
      id: 'f4_topple', title: 'Sliding & toppling', sims: ['f4_topple'],
      notes: T`<ul><li>A body on a plane is about to <b>topple</b> when the line of action of its weight passes through the edge of its base (the lowest point of contact). Beyond that, the weight has a turning moment about the edge.</li>
<li>On a plane tilted at $\theta$: a cuboid of base width $b$ and height $h$ (centre of mass at height $\frac h2$) topples when $\tan\theta\gt\frac bh$; it slides when $\tan\theta\gt\mu$. Whichever bound is smaller happens first.</li><li>A horizontal force $P$ at height $h$ on a block of weight $W$, base $b$: topples when $Ph\gt W\frac b2$, slides when $P\gt\mu W$.</li></ul>`,
      drills: [
        () => { const b = pick([2, 3, 4, 5]), h = pick([4, 6, 8, 10]), mu = pick([0.3, 0.4, 0.5, 0.6, 0.8]); if (Math.abs(mu - b / h) < 1e-9) return null; const opts = ['It slides first', 'It topples first']; return { q: T`A uniform cuboid with a square base of side $${b}$ cm and height $${h}$ cm rests on a rough plane ($\mu=${mu}$) whose angle is slowly increased. Does it slide or topple first?`, mc: { options: opts, correct: mu < b / h ? 0 : 1 },
          sol: T`Slides when $\tan\theta\gt${mu}$; topples when $\tan\theta\gt\frac{b}{h}=${num(b / h, 4)}$. ${mu < b / h ? 'μ is smaller: it slides first.' : 'b/h is smaller: it topples first.'}` }; },
        () => { const b = pick([2, 3, 4]), h = pick([5, 6, 8, 10]); return { q: T`At what angle of slope does a uniform cuboid of base $${b}$ cm (in the direction of the slope) and height $${h}$ cm begin to topple, if friction prevents sliding?`, fields: [{ label: 'θ (°)', ans: rd(Math.atan(b / h)), tol: { abs: 0.06 } }], sol: T`Weight through the lower edge: $\tan\theta=\frac{b/2}{h/2}=\frac{${b}}{${h}}$, $\theta=${num(rd(Math.atan(b / h)), 4)}^\circ$.` }; },
        () => { const r = pick([2, 3, 4]), h = pick([8, 12, 16, 20]); return { q: T`A uniform solid cone of base radius $${r}$ cm and height $${h}$ cm stands on a rough plane. Find the angle of slope at which it is about to topple (assuming no sliding).`, fields: [{ label: 'θ (°)', ans: rd(Math.atan(4 * r / h)), tol: { abs: 0.06 } }], sol: T`$G$ is $\frac h4=${nice(h / 4)}$ cm above the base: $\tan\theta=\frac{${r}}{${nice(h / 4)}}$, $\theta=${num(rd(Math.atan(4 * r / h)), 4)}^\circ$.` }; },
        () => { const W = pick([50, 80, 100, 200]), b = pick([0.4, 0.5, 0.6]), h = pick([0.8, 1, 1.2]), mu = pick([0.2, 0.3, 0.4]); const Pt = W * b / (2 * h), Ps = mu * W; if (Math.abs(Pt - Ps) < 1e-9) return null; const opts = ['It slides first', 'It topples first']; return { q: T`A uniform block of weight $${W}$ N, base width $${b}$ m, rests on rough horizontal ground ($\mu=${mu}$). A horizontal force $P$ is applied at the top edge, $${h}$ m up. As $P$ increases, does the block slide or topple first?`, mc: { options: opts, correct: Ps < Pt ? 0 : 1 },
          sol: T`Topple: moments about the front edge, $P(${h})=${W}\times${b / 2}\Rightarrow P=${num(Pt, 4)}$ N. Slide: $P=\mu W=${num(Ps, 4)}$ N. ${Ps < Pt ? 'Sliding needs the smaller force.' : 'Toppling needs the smaller force.'}` }; },
      ],
    },
    {
      id: 'f4_forces', title: 'Coplanar force systems: resultants & couples', sims: [],
      notes: T`<ul><li>The <b>resultant</b> of forces $\mathbf F_i=(X_i,Y_i)$ acting at points $(x_i,y_i)$ is $\mathbf R=(\sum X_i,\sum Y_i)$, with moment about $O$ $$G=\sum(x_iY_i-y_iX_i)\quad(\text{anticlockwise positive}).$$</li>
<li>If $\mathbf R\ne\mathbf 0$ the system reduces to a single force $\mathbf R$ along the line $xR_y-yR_x=G$. If $\mathbf R=\mathbf 0$ but $G\ne0$ it is a <b>couple</b> of moment $G$ (the same about every point). If both are zero it is in equilibrium.</li>
<li>Any system is equivalent to $\mathbf R$ acting at a chosen point $P$ together with a couple $G_P=G-(x_PR_y-y_PR_x)$.</li></ul>`,
      drills: [
        () => { const F = Array.from({ length: 3 }, () => [rnz(-6, 6), ri(-6, 6)]), R = [F.reduce((s, f) => s + f[0], 0), F.reduce((s, f) => s + f[1], 0)]; return { q: T`Find the resultant of the forces $${F.map(f => `(${poly([[f[0], '\\mathbf i'], [f[1], '\\mathbf j']])})`).join('$, $')}$ N.`, fields: [{ label: 'R (i, j)', vec: R }], sol: T`Add components: $${poly([[R[0], '\\mathbf i'], [R[1], '\\mathbf j']])}$ N, magnitude $${num(Math.hypot(...R), 4)}$ N.` }; },
        () => { const F = Array.from({ length: 3 }, () => [rnz(-6, 6), ri(-6, 6)]), P = Array.from({ length: 3 }, () => [ri(-4, 4), ri(-4, 4)]), Gm = F.reduce((s, f, i) => s + P[i][0] * f[1] - P[i][1] * f[0], 0);
          return { q: T`Forces ${F.map((f, i) => `$(${poly([[f[0], '\\mathbf i'], [f[1], '\\mathbf j']])})$ N at $(${P[i][0]},${P[i][1]})$`).join(', ')} act on a lamina. Find their total moment about $O$ (anticlockwise positive, N m).`, fields: [{ label: 'G (N m)', ans: Gm }],
            sol: T`$G=\sum(xY-yX)=${F.map((f, i) => `(${P[i][0]}\\cdot${par(f[1])}-${par(P[i][1])}\\cdot${par(f[0])})`).join('+')}=${Gm}$ N m.` }; },
        () => { const R = [rnz(-5, 5), rnz(-5, 5)], Gm = rnz(-20, 20); const x0 = Gm / R[1]; return { q: T`A system of forces has resultant $(${poly([[R[0], '\\mathbf i'], [R[1], '\\mathbf j']])})$ N and total moment $${Gm}$ N m about $O$ (anticlockwise). Where does the line of action of the resultant cross the $x$-axis?`, fields: [{ label: 'x', ans: x0 }],
          sol: T`Line of action $x(${R[1]})-y(${R[0]})=${Gm}$. At $y=0$: $x=\frac{${Gm}}{${R[1]}}=${nice(x0)}$.` }; },
        () => { const F = ri(2, 10), d = ri(1, 6); return { q: T`Two forces of $${F}$ N act in opposite directions along parallel lines $${d}$ m apart. What single thing are they equivalent to?`, fields: [{ label: 'couple (N m)', ans: F * d }], sol: T`Resultant zero, so it is a couple of moment $${F}\times${d}=${F * d}$ N m (the same about every point).` }; },
        () => { const R = [rnz(-4, 4), rnz(-4, 4)], Gm = ri(-15, 15), P = [ri(-3, 3), ri(-3, 3)]; const GP = Gm - (P[0] * R[1] - P[1] * R[0]); return { q: T`A system has resultant $(${poly([[R[0], '\\mathbf i'], [R[1], '\\mathbf j']])})$ N and moment $${Gm}$ N m about $O$. It is replaced by the resultant acting at $(${P[0]},${P[1]})$ plus a couple. Find the couple.`, fields: [{ label: 'couple (N m)', ans: GP }],
          sol: T`The force at $P$ has moment $${P[0]}(${R[1]})-${par(P[1])}(${R[0]})=${P[0] * R[1] - P[1] * R[0]}$ about $O$, so the couple is $${Gm}-${par(P[0] * R[1] - P[1] * R[0])}=${GP}$ N m.` }; },
      ],
    },
    {
      id: 'f4_rest', title: "Newton's law of restitution", sims: ['f4_coll'],
      notes: T`<ul><li><b>Newton's experimental law</b>: speed of separation $=e\times$ speed of approach, with $0\le e\le1$ ($e=1$ perfectly elastic, $e=0$ inelastic — they coalesce or stop).</li><li>Direct collision of smooth spheres: $m_1u_1+m_2u_2=m_1v_1+m_2v_2$ and $v_2-v_1=e(u_1-u_2)$.</li>
<li>Sphere hitting a fixed plane at right angles: rebound speed $=e\times$ approach speed. A ball dropped from height $h$ rebounds to $e^2h$.</li><li>Kinetic energy is lost unless $e=1$.</li></ul>`,
      drills: [
        () => { const m1 = ri(1, 5), m2 = ri(1, 5), u1 = ri(3, 10), u2 = ri(-4, 2), e = pick([0, 0.25, 0.5, 0.6, 0.8, 1]); const M = m1 * u1 + m2 * u2, v1 = (M - m2 * e * (u1 - u2)) / (m1 + m2), v2 = (M + m1 * e * (u1 - u2)) / (m1 + m2);
          return { q: T`Smooth spheres $A$ ($${m1}$ kg, $${u1}$ m s⁻¹) and $B$ ($${m2}$ kg, $${u2}$ m s⁻¹, same line) collide directly; $e=${e}$. Find their velocities afterwards.`, fields: [{ label: 'v_A', ans: v1 }, { label: 'v_B', ans: v2 }],
            sol: T`Momentum: $${m1}v_A+${m2}v_B=${M}$. Restitution: $v_B-v_A=${e}(${u1}-${par(u2)})=${num(e * (u1 - u2), 4)}$. Solving: $v_A=${num(v1, 4)}$, $v_B=${num(v2, 4)}$ m s⁻¹.` }; },
        () => { const h = pick([1, 1.5, 2, 2.5, 5]), e = pick([0.5, 0.6, 0.7, 0.8, 0.9]); return { q: T`A ball is dropped from a height of $${h}$ m onto horizontal ground; $e=${e}$. Find the height of the first bounce.`, fields: [{ label: 'height (m)', ans: e * e * h }], sol: T`Impact speed $\sqrt{2gh}$; rebound $e\sqrt{2gh}$; height $\frac{e^2\cdot2gh}{2g}=e^2h=${num(e * e * h, 4)}$ m.` }; },
        () => { const u1 = ri(4, 10), u2 = ri(-3, 2), v1 = ri(-3, u1 - 2), d = ri(1, 6); const v2 = v1 + d, e = d / (u1 - u2); if (e > 1) return null; return { q: T`Before a direct collision the spheres have velocities $${u1}$ and $${u2}$ m s⁻¹; afterwards $${v1}$ and $${v2}$ m s⁻¹ (same positive direction). Find $e$.`, fields: [{ label: 'e', ans: e }],
          sol: T`$e=\frac{\text{separation}}{\text{approach}}=\frac{${v2}-${par(v1)}}{${u1}-${par(u2)}}=${nice(e)}$.` }; },
        () => { const m1 = ri(1, 4), m2 = ri(1, 4), u1 = ri(4, 8), e = pick([0, 0.5, 0.8]); const v1 = (m1 * u1 - m2 * e * u1) / (m1 + m2), v2 = (m1 * u1 + m1 * e * u1) / (m1 + m2); const loss = 0.5 * m1 * u1 * u1 - 0.5 * m1 * v1 * v1 - 0.5 * m2 * v2 * v2;
          return { q: T`A sphere of mass $${m1}$ kg moving at $${u1}$ m s⁻¹ hits a stationary sphere of mass $${m2}$ kg directly; $e=${e}$. Find the kinetic energy lost.`, fields: [{ label: 'KE lost (J)', ans: loss }],
            sol: T`$v_A=${num(v1, 4)}$, $v_B=${num(v2, 4)}$. KE before $${num(0.5 * m1 * u1 * u1, 4)}$ J, after $${num(0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2, 4)}$ J: lost $${num(loss, 4)}$ J.` }; },
        () => { const m = pick([0.2, 0.5, 1]), u = ri(4, 12), e = pick([0.4, 0.5, 0.75]); return { q: T`A ball of mass $${m}$ kg hits a smooth vertical wall at right angles at $${u}$ m s⁻¹; $e=${e}$. Find the rebound speed and the magnitude of the impulse.`, fields: [{ label: 'speed', ans: e * u }, { label: 'impulse (N s)', ans: m * u * (1 + e) }],
          sol: T`Rebound $${e}\times${u}=${num(e * u)}$ m s⁻¹. Impulse $${m}(${num(e * u)}+${u})=${num(m * u * (1 + e), 4)}$ N s.` }; },
      ],
    },
  ],
});
