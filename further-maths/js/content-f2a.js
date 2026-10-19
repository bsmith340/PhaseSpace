// CCEA GCE Further Mathematics AS 2 Applied Mathematics — Section A Mechanics 1, Section B Mechanics 2: notes + drills.
'use strict';

const GN = 6.67e-11; // universal gravitational constant
const sci3 = x => { const e = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** e; return Math.abs(e) < 4 ? sf3(x) : `${(+m.toPrecision(3))}\\times10^{${e}}`; };

topic({
  id: '_f2a', title: 'FM AS 2 mechanics', points: [
    /* ======================= SECTION A: MECHANICS 1 ======================= */
    {
      id: 'f2_hooke', title: "Hooke's law & elastic strings", sims: ['f2_spring'],
      notes: T`$$T=\frac{\lambda x}{l}$$<ul><li>$T$ = tension (or thrust, for a compressed spring), $x$ = extension (or compression), $l$ = natural length, $\lambda$ = <b>modulus of elasticity</b> (in newtons — it is the tension that would double the length).</li>
<li>A <b>string</b> can only be stretched; when shorter than its natural length it is slack and $T=0$. A <b>spring</b> can be stretched or compressed.</li><li>Modelling assumptions: the string or spring is <b>light</b>, obeys Hooke's law, and is not stretched beyond its <b>elastic limit</b> (after which the law fails and it may be permanently deformed).</li></ul>`,
      drills: [
        () => { const l = pick([0.5, 0.8, 1, 1.2, 1.5, 2]), lam = pick([20, 30, 40, 49, 60, 98]), L = +(l + pick([0.1, 0.2, 0.3, 0.4, 0.5])).toFixed(2); return { q: T`An elastic string of natural length $${l}$ m and modulus $${lam}$ N is stretched to a length of $${L}$ m. Find the tension.`, fields: [{ label: 'T (N)', ans: lam * (L - l) / l }],
          sol: T`$x=${L}-${l}=${num(L - l)}$ m; $T=\frac{${lam}\times${num(L - l)}}{${l}}=${num(lam * (L - l) / l, 4)}$ N.` }; },
        () => { const l = pick([0.4, 0.5, 0.6, 0.8, 1, 1.5]), lam = pick([24.5, 29.4, 39.2, 49, 58.8, 98]), m = pick([0.5, 1, 1.5, 2, 3]); const x = m * G * l / lam; return { q: T`A particle of mass $${m}$ kg hangs in equilibrium from one end of a light elastic string of natural length $${l}$ m and modulus $${lam}$ N, whose other end is fixed. Find the total length of the string.`, fields: [{ label: 'length (m)', ans: l + x }],
          sol: T`Equilibrium: $T=mg$, so $\frac{${lam}x}{${l}}=${m}(9.8)\Rightarrow x=${num(x, 4)}$ m. Length $=${l}+${num(x, 4)}=${num(l + x, 4)}$ m.` }; },
        () => { const l = pick([0.5, 1, 1.2, 2]), x = pick([0.1, 0.15, 0.2, 0.25, 0.4]), T_ = pick([6, 8, 12, 15, 20]); return { q: T`A spring of natural length $${l}$ m is compressed by $${x}$ m by a thrust of $${T_}$ N. Find its modulus of elasticity.`, fields: [{ label: 'λ (N)', ans: T_ * l / x }], sol: T`$${T_}=\frac{\lambda(${x})}{${l}}\Rightarrow\lambda=${num(T_ * l / x, 4)}$ N.` }; },
        () => { const opts = ['The string is light and obeys Hooke\'s law within its elastic limit', 'The tension is the same however far the string is stretched', 'The string can push as well as pull', 'The modulus depends on the particle\'s mass']; return { q: T`Which is a standard modelling assumption for an elastic string?`, mc: { options: opts, correct: 0 }, sol: T`Light (no mass), obeys $T=\frac{\lambda x}l$, not stretched beyond the elastic limit. A string cannot push — when shorter than its natural length it is slack.` }; },
      ],
    },
    {
      id: 'f2_work', title: 'Work done by constant & variable forces', sims: ['f2_spring'],
      notes: T`<ul><li>Work done by a constant force $\mathbf F$ whose point of application moves through displacement $\mathbf d$: $$W=\mathbf F\cdot\mathbf d=|\mathbf F||\mathbf d|\cos\theta\quad(\text{joules}).$$ Only the component along the motion does work; a force perpendicular to the motion (like a normal reaction) does none.</li>
<li>A variable force along a line, $F(x)$: $\ W=\displaystyle\int_a^bF\,dx$.</li><li>Stretching an elastic string from extension $a$ to $b$: $W=\displaystyle\int_a^b\frac{\lambda x}l\,dx=\frac{\lambda(b^2-a^2)}{2l}$.</li><li>Work done against friction $=$ friction × distance; against gravity $=mgh$.</li></ul>`,
      drills: [
        () => { const F = pick([10, 15, 20, 25, 40, 50]), d = pick([2, 3, 4, 5, 8, 10]), th = pick([0, 20, 30, 45, 60]); return { q: T`A force of $${F}$ N acting at $${th}^\circ$ above the horizontal pulls a box $${d}$ m along horizontal ground. Find the work done by the force.`, fields: [{ label: 'W (J)', ans: F * d * Math.cos(dg(th)) }], sol: T`$W=Fd\cos\theta=${F}\times${d}\times\cos${th}^\circ=${sf3(F * d * Math.cos(dg(th)))}$ J.` }; },
        () => { const Fv = V.rnd(-6, 8), A = V.rnd(-4, 4), Bp = V.rnd(-4, 4), d = V.sub(Bp, A); if (V.isZero(d)) return null; return { q: T`A constant force $\mathbf F=${V.tex(Fv)}$ N moves a particle from $A${V.row(A)}$ to $B${V.row(Bp)}$ (metres). Find the work done.`, fields: [{ label: 'W (J)', ans: V.dot(Fv, d) }],
          sol: T`$\overrightarrow{AB}=${V.tex(d)}$; $W=\mathbf F\cdot\overrightarrow{AB}=${V.dot(Fv, d)}$ J${V.dot(Fv, d) < 0 ? ' (negative: the force opposes the motion)' : ''}.` }; },
        () => { const a = ri(1, 6), b = ri(0, 10), p = ri(0, 2), q = p + ri(1, 4); const W = a * (q * q * q - p * p * p) / 3 + b * (q - p); return { q: T`A force $F=(${polyT([a, 0, b], 'x')})$ N acts in the direction of motion as a particle moves from $x=${p}$ to $x=${q}$ m. Find the work done.`, fields: [{ label: 'W (J)', ans: W }],
          sol: T`$W=\int_{${p}}^{${q}}(${polyT([a, 0, b], 'x')})\,dx=\left[${polyT([a / 3, 0, b, 0], 'x')}\right]_{${p}}^{${q}}=${nice(W)}$ J.` }; },
        () => { const l = pick([0.5, 0.8, 1, 1.5, 2]), lam = pick([20, 30, 40, 50, 60]), a = pick([0, 0.1, 0.2]), b = a + pick([0.1, 0.2, 0.3, 0.4]); const W = lam * (b * b - a * a) / (2 * l); return { q: T`An elastic string has natural length $${l}$ m and modulus $${lam}$ N. Find the work done in stretching it from an extension of $${a}$ m to an extension of $${num(b)}$ m.`, fields: [{ label: 'W (J)', ans: W }],
          sol: T`$W=\int_{${a}}^{${num(b)}}\frac{${lam}x}{${l}}dx=\frac{${lam}(${num(b)}^2-${a}^2)}{2(${l})}=${num(W, 4)}$ J.` }; },
        () => { const m = pick([2, 5, 10, 20]), th = pick([10, 15, 20, 30]), mu = pick([0.2, 0.25, 0.3, 0.4]), d = pick([3, 4, 5, 8, 10]); const Wf = mu * m * G * Math.cos(dg(th)) * d, Wg = m * G * d * Math.sin(dg(th)); return { q: T`A crate of mass $${m}$ kg is pulled $${d}$ m up a rough slope inclined at $${th}^\circ$ ($\mu=${mu}$). Find the work done against friction and against gravity.`, fields: [{ label: 'against friction (J)', ans: Wf }, { label: 'against gravity (J)', ans: Wg }],
          sol: T`$R=${m}g\cos${th}^\circ$, friction $=${mu}R=${sf3(mu * m * G * Math.cos(dg(th)))}$ N; work $=${sf3(Wf)}$ J. Height gained $${d}\sin${th}^\circ$; work against gravity $=mgh=${sf3(Wg)}$ J.` }; },
      ],
    },
    {
      id: 'f2_energy', title: 'Energy: KE, GPE, EPE & conservation', sims: ['f2_spring'],
      notes: T`$$\text{KE}=\tfrac12mv^2,\qquad\text{GPE}=mgh,\qquad\text{EPE}=\frac{\lambda x^2}{2l}$$
<ul><li><b>Work–energy principle</b>: work done by external forces (other than gravity and elastic tension, if you count their energies) $=$ change in total mechanical energy. Friction and resistances remove energy.</li>
<li><b>Conservation of mechanical energy</b>: if only gravity and elastic forces do work, $\text{KE}+\text{GPE}+\text{EPE}$ is constant.</li><li>Choose a zero level for GPE and stick to it.</li></ul>`,
      drills: [
        () => { const m = pick([0.5, 2, 4, 1200]), u = ri(0, 10), v = u + ri(2, 12); return { q: T`A body of mass $${m}$ kg speeds up from $${u}$ m s⁻¹ to $${v}$ m s⁻¹. Find the increase in kinetic energy.`, fields: [{ label: 'ΔKE (J)', ans: 0.5 * m * (v * v - u * u) }], sol: T`$\tfrac12(${m})(${v}^2-${u}^2)=${num(0.5 * m * (v * v - u * u), 5)}$ J.` }; },
        () => { const h = pick([1.5, 2, 2.5, 3, 5, 10]), u = pick([0, 0, 2, 3, 4]); const v = Math.sqrt(u * u + 2 * G * h); return { q: T`A particle slides down a smooth curved slide, dropping a vertical height of $${h}$ m. It starts ${u ? `with speed $${u}$ m s⁻¹` : 'from rest'}. Find its speed at the bottom.`, fields: [{ label: 'v', ans: v }],
          sol: T`Smooth, so energy is conserved: $\tfrac12mv^2=\tfrac12m(${u})^2+mg(${h})\Rightarrow v^2=${num(u * u + 2 * G * h, 4)}$, $v=${sf3(v)}$ m s⁻¹. (The shape of the slide doesn't matter.)` }; },
        () => { const m = pick([2, 3, 5]), u = pick([6, 8, 10, 12]), mu = pick([0.1, 0.2, 0.25]), d = pick([5, 8, 10, 12]); const v2 = u * u - 2 * mu * G * d; if (v2 <= 0) return null; return { q: T`A block of mass $${m}$ kg is sliding at $${u}$ m s⁻¹ on rough horizontal ground ($\mu=${mu}$). Use the work–energy principle to find its speed after $${d}$ m.`, fields: [{ label: 'v', ans: Math.sqrt(v2) }],
          sol: T`Work against friction $=${mu}(${m}g)(${d})=${sf3(mu * m * G * d)}$ J. $\tfrac12(${m})v^2=\tfrac12(${m})(${u})^2-${sf3(mu * m * G * d)}\Rightarrow v=${sf3(Math.sqrt(v2))}$ m s⁻¹.` }; },
        () => { const m = pick([0.5, 1, 2]), l = pick([1, 1.5, 2]), lam = pick([29.4, 39.2, 49, 98]); const A = lam / (2 * l), Bq = -m * G, Cq = -m * G * l; const x = (-Bq + Math.sqrt(Bq * Bq - 4 * A * Cq)) / (2 * A);
          return { q: T`A particle of mass $${m}$ kg is attached to one end of a light elastic string of natural length $${l}$ m and modulus $${lam}$ N. The other end is fixed at $O$. The particle is released from rest at $O$. Find the greatest extension of the string.`, fields: [{ label: 'x (m)', ans: x }],
            sol: T`At the lowest point the particle is momentarily at rest. GPE lost $=$ EPE gained: $${m}g(${l}+x)=\frac{${lam}x^2}{2(${l})}$, i.e. $${num(A, 4)}x^2-${num(m * G, 4)}x-${num(m * G * l, 4)}=0$, so $x=${num(x, 4)}$ m.` }; },
        () => { const m = pick([0.2, 0.5, 1]), l = pick([0.5, 1]), lam = pick([10, 20, 40]), e = pick([0.1, 0.2, 0.25, 0.3]); const v = Math.sqrt(lam * e * e / (l * m)); return { q: T`A particle of mass $${m}$ kg rests on a smooth horizontal table, attached to a horizontal spring of natural length $${l}$ m and modulus $${lam}$ N. It is pulled out to an extension of $${e}$ m and released. Find its speed as the spring reaches its natural length.`, fields: [{ label: 'v', ans: v }],
          sol: T`EPE $\frac{${lam}(${e})^2}{2(${l})}=${num(lam * e * e / (2 * l), 4)}$ J becomes KE: $\tfrac12(${m})v^2=${num(lam * e * e / (2 * l), 4)}\Rightarrow v=${sf3(v)}$ m s⁻¹.` }; },
      ],
    },
    {
      id: 'f2_power', title: 'Power: vehicles & pumps', sims: [],
      notes: T`<ul><li><b>Power</b> is the rate of doing work: $P=\dfrac{dW}{dt}$ (watts). For a force $F$ moving its point of application at speed $v$: $$P=Fv.$$</li>
<li>Vehicle with engine power $P$ at speed $v$: driving force $F=\frac Pv$. Then Newton's second law: $\frac Pv-R-mg\sin\theta=ma$ (uphill).</li><li>Maximum (terminal) speed: acceleration zero, so $\frac P{v_{\max}}=R+mg\sin\theta$.</li>
<li>Pump raising water: power $=$ (mass raised per second) × $\left(gh+\tfrac12v^2\right)$ — energy per second gives potential energy and the kinetic energy of the ejected water.</li></ul>`,
      drills: [
        () => { const P = pick([15, 20, 24, 30, 40, 60]) * 1000, R = pick([400, 500, 600, 800, 1000, 1200]); return { q: T`A car's engine works at a constant $${P / 1000}$ kW against a constant resistance of $${R}$ N on a level road. Find its maximum speed.`, fields: [{ label: 'v_max', ans: P / R }], sol: T`At maximum speed $a=0$: $\frac Pv=R\Rightarrow v=\frac{${P}}{${R}}=${num(P / R, 4)}$ m s⁻¹.` }; },
        () => { const P = pick([20, 30, 40, 50]) * 1000, R = pick([500, 600, 800]), m = pick([800, 1000, 1200, 1500]), v = pick([10, 12, 15, 20]); const a = (P / v - R) / m; if (a <= 0) return null; return { q: T`A car of mass $${m}$ kg moves on a level road against a resistance of $${R}$ N with its engine working at $${P / 1000}$ kW. Find its acceleration when its speed is $${v}$ m s⁻¹.`, fields: [{ label: 'a', ans: a }],
          sol: T`Driving force $\frac{${P}}{${v}}=${num(P / v, 5)}$ N. $${num(P / v, 5)}-${R}=${m}a\Rightarrow a=${num(a, 4)}$ m s⁻².` }; },
        () => { const P = pick([30, 40, 50, 60]) * 1000, R = pick([400, 500, 600]), m = pick([1000, 1200, 1500]), s = pick([10, 15, 20, 25]); const v = P / (R + m * G / s); return { q: T`A car of mass $${m}$ kg climbs a hill inclined at $\theta$ to the horizontal, where $\sin\theta=\frac1{${s}}$, against a resistance of $${R}$ N. Its engine works at $${P / 1000}$ kW. Find its maximum speed up the hill.`, fields: [{ label: 'v_max', ans: v }],
          sol: T`At maximum speed: $\frac{${P}}v=${R}+${m}(9.8)\frac1{${s}}=${num(R + m * G / s, 5)}\Rightarrow v=${num(v, 4)}$ m s⁻¹.` }; },
        () => { const r = pick([5, 10, 20, 25, 40]), h = pick([5, 8, 10, 12, 15]), v = pick([4, 6, 8, 10]); const P = r * (G * h + 0.5 * v * v); return { q: T`A pump raises water from a depth of $${h}$ m and ejects it at $${v}$ m s⁻¹, at a rate of $${r}$ kg per second. Find the power of the pump.`, fields: [{ label: 'P (W)', ans: P }],
          sol: T`Each second: GPE gained $${r}(9.8)(${h})=${num(r * G * h, 5)}$ J, KE gained $\tfrac12(${r})(${v})^2=${num(0.5 * r * v * v, 5)}$ J. Power $=${num(P, 5)}$ W.` }; },
        () => { const vmax = pick([25, 30, 35, 40]), P = pick([24, 30, 36, 42]) * 1000; return { q: T`A van has a maximum speed of $${vmax}$ m s⁻¹ on a level road when its engine works at $${P / 1000}$ kW. Find the resistance to motion (assumed constant).`, fields: [{ label: 'R (N)', ans: P / vmax }], sol: T`At maximum speed the driving force equals the resistance: $R=\frac{${P}}{${vmax}}=${num(P / vmax, 4)}$ N.` }; },
      ],
    },
    {
      id: 'f2_circ', title: 'Circular motion: angular speed & acceleration', sims: ['f2_conical'],
      notes: T`<ul><li><b>Angular speed</b> $\omega$ (rad s⁻¹): the rate at which the radius turns. $1$ rev per second $=2\pi$ rad s⁻¹; $n$ rpm $=\frac{2\pi n}{60}$ rad s⁻¹.</li>
<li>Linear speed $v=r\omega$.</li><li>Moving in a circle at constant speed, the acceleration is directed <b>towards the centre</b>: $$a=r\omega^2=\frac{v^2}r.$$ The resultant force towards the centre is $mr\omega^2=\frac{mv^2}r$ — it is provided by real forces (tension, friction, gravity…), not an extra force.</li></ul>`,
      drills: [
        () => { const n = pick([30, 45, 60, 33, 78, 120]), r = pick([0.1, 0.15, 0.2, 0.3, 0.5]); const w = 2 * Math.PI * n / 60; return { q: T`A point on a disc $${num(r * 100)}$ cm from the centre turns at $${n}$ revolutions per minute. Find its angular speed and its linear speed.`, fields: [{ label: 'ω (rad/s)', ans: w }, { label: 'v (m/s)', ans: r * w }],
          sol: T`$\omega=\frac{2\pi\times${n}}{60}=${num(w, 4)}$ rad s⁻¹; $v=r\omega=${r}\times${num(w, 4)}=${num(r * w, 4)}$ m s⁻¹.` }; },
        () => { const r = pick([0.5, 1, 1.5, 2, 4]), v = pick([2, 3, 4, 5, 6]); return { q: T`A particle moves in a circle of radius $${r}$ m at a constant speed of $${v}$ m s⁻¹. Find the magnitude of its acceleration and its angular speed.`, fields: [{ label: 'a', ans: v * v / r }, { label: 'ω', ans: v / r }], sol: T`$a=\frac{v^2}r=${num(v * v / r, 4)}$ m s⁻², towards the centre. $\omega=\frac vr=${num(v / r, 4)}$ rad s⁻¹.` }; },
        () => { const m = pick([0.2, 0.5, 1, 2]), r = pick([0.4, 0.5, 0.8, 1]), w = pick([2, 3, 4, 5]); return { q: T`A particle of mass $${m}$ kg on a smooth horizontal table is attached by a light string to a fixed point on the table and moves in a circle of radius $${r}$ m with angular speed $${w}$ rad s⁻¹. Find the tension.`, fields: [{ label: 'T (N)', ans: m * r * w * w }], sol: T`The tension provides the central force: $T=mr\omega^2=${m}\times${r}\times${w}^2=${num(m * r * w * w, 4)}$ N.` }; },
        () => { const mu = pick([0.2, 0.25, 0.3, 0.4, 0.5]), r = pick([0.1, 0.15, 0.2, 0.25]); const w = Math.sqrt(mu * G / r); return { q: T`A coin rests on a rough horizontal turntable $${r}$ m from the centre ($\mu=${mu}$). Find the greatest angular speed at which it can turn without the coin slipping.`, fields: [{ label: 'ω_max', ans: w }],
          sol: T`Friction provides the central force: $F=mr\omega^2\le\mu mg\Rightarrow\omega^2\le\frac{\mu g}{r}=${num(mu * G / r, 4)}$, so $\omega_{\max}=${num(w, 4)}$ rad s⁻¹ (independent of the mass).` }; },
      ],
    },
    {
      id: 'f2_conical', title: 'Horizontal circles: conical pendulum & banked tracks', sims: ['f2_conical'],
      notes: T`<ul><li><b>Conical pendulum</b>: a particle on a string of length $L$ at angle $\theta$ to the vertical, moving in a horizontal circle of radius $r=L\sin\theta$. Resolve vertically: $T\cos\theta=mg$; horizontally (towards the centre): $T\sin\theta=mr\omega^2$. Hence $T=mL\omega^2$ and $\cos\theta=\frac g{L\omega^2}$.</li>
<li><b>Banked track</b> at angle $\theta$ with no tendency to slip (no friction needed): $R\cos\theta=mg$, $R\sin\theta=\frac{mv^2}r$, so $\tan\theta=\frac{v^2}{rg}$.</li><li>Always resolve vertically and horizontally — the acceleration is horizontal, towards the centre.</li></ul>`,
      drills: [
        () => { const L = pick([0.5, 0.8, 1, 1.2, 1.5, 2]), w = pick([3, 4, 5, 6]), m = pick([0.2, 0.5, 1]); const c = G / (L * w * w); if (c >= 1) return null; return { q: T`A particle of mass $${m}$ kg on a light string of length $${L}$ m moves as a conical pendulum with angular speed $${w}$ rad s⁻¹. Find the tension and the angle the string makes with the vertical.`, fields: [{ label: 'T (N)', ans: m * L * w * w }, { label: 'θ (°)', ans: rd(Math.acos(c)), tol: { abs: 0.06 } }],
          sol: T`Horizontally $T\sin\theta=m(L\sin\theta)\omega^2\Rightarrow T=mL\omega^2=${num(m * L * w * w, 4)}$ N. Vertically $T\cos\theta=mg\Rightarrow\cos\theta=\frac{g}{L\omega^2}=${num(c, 4)}$, $\theta=${num(rd(Math.acos(c)), 4)}^\circ$.` }; },
        () => { const L = pick([0.5, 1, 1.5, 2]), th = pick([30, 40, 45, 50, 60]); const r = L * Math.sin(dg(th)), v = Math.sqrt(r * G * Math.tan(dg(th))); return { q: T`A conical pendulum has string length $${L}$ m, inclined at $${th}^\circ$ to the vertical. Find the speed of the particle.`, fields: [{ label: 'v', ans: v }],
          sol: T`$r=${L}\sin${th}^\circ=${sf3(r)}$. Dividing the equations: $\tan\theta=\frac{v^2}{rg}\Rightarrow v^2=${sf3(r)}(9.8)\tan${th}^\circ$, $v=${sf3(v)}$ m s⁻¹.` }; },
        () => { const r = pick([50, 80, 100, 120, 150, 200]), th = pick([10, 15, 20, 25, 30]); const v = Math.sqrt(r * G * Math.tan(dg(th))); return { q: T`A track is banked at $${th}^\circ$ on a bend of radius $${r}$ m. Find the speed at which a car can go round with no tendency to slip.`, fields: [{ label: 'v', ans: v }],
          sol: T`No friction: $R\cos\theta=mg$, $R\sin\theta=\frac{mv^2}r\Rightarrow\tan\theta=\frac{v^2}{rg}$. $v=\sqrt{${r}(9.8)\tan${th}^\circ}=${sf3(v)}$ m s⁻¹.` }; },
        () => { const r = pick([60, 80, 100, 150]), v = pick([12, 15, 18, 20, 25]); const th = rd(Math.atan(v * v / (r * G))); return { q: T`A bend of radius $${r}$ m is to be banked so that cars travelling at $${v}$ m s⁻¹ need no friction. Find the angle of banking.`, fields: [{ label: 'θ (°)', ans: th, tol: { abs: 0.06 } }], sol: T`$\tan\theta=\frac{v^2}{rg}=\frac{${v * v}}{${r}(9.8)}=${num(v * v / (r * G), 4)}$, so $\theta=${num(th, 4)}^\circ$.` }; },
      ],
    },
    /* ======================= SECTION B: MECHANICS 2 ======================= */
    {
      id: 'f2_equil', title: 'Equilibrium with elastic strings on rough planes', sims: ['f2_spring'],
      notes: T`<ul><li>Combine Hooke's law $T=\frac{\lambda x}l$ with resolving and the friction model $F\le\mu R$.</li><li>"Limiting equilibrium" / "about to slip": $F=\mu R$, acting opposite to the way the particle would move.</li>
<li>A particle between two springs: both tensions (or thrusts) act; the extensions are linked by the total length.</li><li>Draw a clear force diagram: weight, normal reaction, friction, tension(s).</li></ul>`,
      drills: [
        () => { const m = pick([1, 2, 3, 4]), mu = pick([0.2, 0.25, 0.3, 0.4, 0.5]), l = pick([0.5, 0.8, 1, 1.2]), lam = pick([20, 30, 40, 49]); const x = mu * m * G * l / lam; return { q: T`A particle of mass $${m}$ kg on rough horizontal ground ($\mu=${mu}$) is attached to a light elastic string of natural length $${l}$ m and modulus $${lam}$ N, fixed at $A$ on the ground. Find the greatest distance from $A$ at which the particle can rest.`, fields: [{ label: 'distance (m)', ans: l + x }],
          sol: T`Limiting: $T=\mu R=${mu}(${m}g)=${sf3(mu * m * G)}$ N. $\frac{${lam}x}{${l}}=${sf3(mu * m * G)}\Rightarrow x=${num(x, 4)}$ m. Distance $=${l}+${num(x, 4)}=${num(l + x, 4)}$ m.` }; },
        () => { const m = pick([2, 3, 5]), th = pick([20, 25, 30, 35]), mu = pick([0.2, 0.25, 0.3]), l = pick([1, 1.5, 2]), lam = pick([40, 49, 60, 80]); const T_ = m * G * (Math.sin(dg(th)) - mu * Math.cos(dg(th))); if (T_ <= 0) return null; const x = T_ * l / lam;
          return { q: T`A particle of mass $${m}$ kg rests on a rough plane inclined at $${th}^\circ$ ($\mu=${mu}$), held by a light elastic string parallel to the plane, of natural length $${l}$ m and modulus $${lam}$ N, fixed to a point up the slope. The particle is on the point of slipping down the plane. Find the extension of the string.`, fields: [{ label: 'x (m)', ans: x }],
            sol: T`About to slip down: friction acts up the plane. $R=${m}g\cos${th}^\circ$. Along: $T+\mu R=${m}g\sin${th}^\circ\Rightarrow T=${sf3(T_)}$ N. $x=\frac{Tl}\lambda=${num(x, 4)}$ m.` }; },
        () => { const d = pick([2, 3, 4]), l1 = pick([0.5, 0.8, 1]), l2 = pick([0.5, 0.6, 1]), lam1 = pick([20, 30, 40]), lam2 = pick([20, 30, 60]); if (l1 + l2 >= d) return null; const k1 = lam1 / l1, k2 = lam2 / l2, x1 = k2 * (d - l1 - l2) / (k1 + k2);
          return { q: T`A particle $P$ on a smooth horizontal table is attached to two light elastic strings. String $AP$ has natural length $${l1}$ m and modulus $${lam1}$ N; string $PB$ has natural length $${l2}$ m and modulus $${lam2}$ N. $A$ and $B$ are fixed $${d}$ m apart and $P$ rests on $AB$. Find $AP$.`, fields: [{ label: 'AP (m)', ans: l1 + x1 }],
            sol: T`Let the extensions be $x$ and $y$: $x+y=${d}-${l1 + l2}=${num(d - l1 - l2)}$. Equal tensions: $\frac{${lam1}x}{${l1}}=\frac{${lam2}y}{${l2}}$. Solving: $x=${num(x1, 4)}$, so $AP=${num(l1 + x1, 4)}$ m.` }; },
      ],
    },
    {
      id: 'f2_resv', title: 'Resultant velocity', sims: ['f2_relv'],
      notes: T`<ul><li>Velocities add as vectors: the velocity of a boat relative to the ground $=$ its velocity relative to the water $+$ the velocity of the water.</li>
<li>Use a vector triangle (sine/cosine rule) or $\mathbf i,\mathbf j$ components.</li><li>Crossing a river of width $w$: the crossing time depends only on the velocity component <b>across</b> the river.</li><li>To travel straight across, head upstream at angle $\alpha$ to the perpendicular with $\sin\alpha=\frac{\text{current}}{\text{boat speed}}$.</li></ul>`,
      drills: [
        () => { const v = pick([2, 3, 4, 5]), u = pick([1, 1.5, 2, 2.5]), w = pick([40, 50, 60, 80, 100]); return { q: T`A boat can move at $${v}$ m s⁻¹ in still water. It is steered perpendicular to the banks of a river $${w}$ m wide, flowing at $${u}$ m s⁻¹. Find its resultant speed and how far downstream it lands.`, fields: [{ label: 'speed', ans: Math.hypot(u, v) }, { label: 'downstream (m)', ans: u * w / v }],
          sol: T`Resultant $\sqrt{${v}^2+${u}^2}=${sf3(Math.hypot(u, v))}$ m s⁻¹. Crossing time $\frac{${w}}{${v}}=${num(w / v, 4)}$ s; drift $${u}\times${num(w / v, 4)}=${num(u * w / v, 4)}$ m.` }; },
        () => { const v = pick([3, 4, 5, 6]), u = pick([1, 1.5, 2, 2.5]), w = pick([30, 50, 60, 90]); const al = Math.asin(u / v); return { q: T`A swimmer who can swim at $${v}$ m s⁻¹ in still water wants to cross a river $${w}$ m wide, flowing at $${u}$ m s⁻¹, to the point directly opposite. Find the angle upstream (from the perpendicular) at which to head, and the crossing time.`, fields: [{ label: 'angle (°)', ans: rd(al), tol: { abs: 0.06 } }, { label: 'time (s)', ans: w / (v * Math.cos(al)) }],
          sol: T`The upstream component must cancel the current: $${v}\sin\alpha=${u}\Rightarrow\alpha=${num(rd(al), 4)}^\circ$. Across: $${v}\cos\alpha=${sf3(v * Math.cos(al))}$ m s⁻¹, time $${sf3(w / (v * Math.cos(al)))}$ s.` }; },
        () => { const a = V.rnd(-8, 8).slice(0, 2), w = [ri(-5, 5), ri(-5, 5)]; const g = [a[0] + w[0], a[1] + w[1]]; if (!g[0] && !g[1]) return null; const brg = (rd(Math.atan2(g[0], g[1])) + 360) % 360;
          return { q: T`An aircraft has velocity $(${poly([[a[0], '\\mathbf i'], [a[1], '\\mathbf j']])})$ m s⁻¹ relative to the air, and the wind velocity is $(${poly([[w[0], '\\mathbf i'], [w[1], '\\mathbf j']])})$ m s⁻¹ ($\mathbf i$ east, $\mathbf j$ north). Find its speed over the ground and its bearing.`, fields: [{ label: 'speed', ans: Math.hypot(...g) }, { label: 'bearing (°)', ans: brg, tol: { abs: 0.1 } }],
            sol: T`Ground velocity $=${poly([[g[0], '\\mathbf i'], [g[1], '\\mathbf j']])}$; speed $\sqrt{${g[0] ** 2}+${g[1] ** 2}}=${sf3(Math.hypot(...g))}$ m s⁻¹; bearing (clockwise from north) $${num(brg, 4)}^\circ$.` }; },
      ],
    },
    {
      id: 'f2_relv', title: 'Relative velocity: closest approach & interception', sims: ['f2_relv'],
      notes: T`<ul><li>Velocity of $A$ relative to $B$: $_A\mathbf v_B=\mathbf v_A-\mathbf v_B$ — how $A$ appears to move to an observer on $B$.</li>
<li>Positions at time $t$: $\mathbf r_A=\mathbf a+\mathbf v_At$, $\mathbf r_B=\mathbf b+\mathbf v_Bt$. Then $\overrightarrow{AB}=(\mathbf b-\mathbf a)+(\mathbf v_B-\mathbf v_A)t$.</li><li><b>Closest approach</b>: minimise $|\overrightarrow{AB}|^2$ (a quadratic in $t$), or use $\overrightarrow{AB}\cdot(\mathbf v_B-\mathbf v_A)=0$.</li><li><b>Interception / collision</b>: $\mathbf r_A=\mathbf r_B$ for the same $t$ in both components.</li></ul>`,
      drills: [
        () => { const vA = [ri(-6, 6), ri(-6, 6)], vB = [ri(-6, 6), ri(-6, 6)], r = [vA[0] - vB[0], vA[1] - vB[1]]; return { q: T`Ship $A$ has velocity $(${poly([[vA[0], '\\mathbf i'], [vA[1], '\\mathbf j']])})$ km h⁻¹ and ship $B$ has velocity $(${poly([[vB[0], '\\mathbf i'], [vB[1], '\\mathbf j']])})$ km h⁻¹. Find the velocity of $A$ relative to $B$.`, fields: [{ label: 'components (i, j)', vec: r }],
          sol: T`$_A\mathbf v_B=\mathbf v_A-\mathbf v_B=${poly([[r[0], '\\mathbf i'], [r[1], '\\mathbf j']])}$ km h⁻¹.` }; },
        () => { const a = [0, 0], b = [ri(-10, 10), ri(-10, 10)], vA = [ri(-5, 5), ri(-5, 5)], vB = [ri(-5, 5), ri(-5, 5)]; const r0 = [b[0] - a[0], b[1] - a[1]], v = [vB[0] - vA[0], vB[1] - vA[1]], vv = v[0] ** 2 + v[1] ** 2; if (!vv) return null; const t = -(r0[0] * v[0] + r0[1] * v[1]) / vv; if (t <= 0) return null; const d = Math.hypot(r0[0] + v[0] * t, r0[1] + v[1] * t);
          return { q: T`At noon ship $A$ is at the origin with velocity $(${poly([[vA[0], '\\mathbf i'], [vA[1], '\\mathbf j']])})$ km h⁻¹ and ship $B$ is at $(${poly([[b[0], '\\mathbf i'], [b[1], '\\mathbf j']])})$ km with velocity $(${poly([[vB[0], '\\mathbf i'], [vB[1], '\\mathbf j']])})$ km h⁻¹. Find the time after noon (hours) when they are closest, and the least distance.`, fields: [{ label: 't (h)', ans: t }, { label: 'distance (km)', ans: d }],
            sol: T`$\overrightarrow{AB}=${V.tex(r0)}+t${V.tex(v)}$. $|\overrightarrow{AB}|^2=${vv}t^2${sgn(2 * (r0[0] * v[0] + r0[1] * v[1]))}t+${r0[0] ** 2 + r0[1] ** 2}$, minimised at $t=${nice(t)}$ h. Least distance $${sf3(d)}$ km.` }; },
        () => { const t = ri(1, 4), P = [ri(-10, 10), ri(-10, 10)], vA = [ri(-4, 4), ri(-4, 4)], vB = [ri(-4, 4), ri(-4, 4)]; if (vA[0] === vB[0] && vA[1] === vB[1]) return null; const a = [P[0] - vA[0] * t, P[1] - vA[1] * t], b = [P[0] - vB[0] * t, P[1] - vB[1] * t];
          return { q: T`Particle $A$ starts at $(${a[0]},${a[1]})$ with velocity $(${poly([[vA[0], '\\mathbf i'], [vA[1], '\\mathbf j']])})$ m s⁻¹; particle $B$ starts at the same moment at $(${b[0]},${b[1]})$ with velocity $(${poly([[vB[0], '\\mathbf i'], [vB[1], '\\mathbf j']])})$ m s⁻¹. Show that they collide and find when and where.`, fields: [{ label: 't (s)', ans: t }, { label: 'position (x, y)', vec: P }],
            sol: T`$\mathbf r_A=\mathbf r_B$: $\mathbf i$: $${poly([[a[0], ''], [vA[0], 't']])}=${poly([[b[0], ''], [vB[0], 't']])}$; $\mathbf j$: $${poly([[a[1], ''], [vA[1], 't']])}=${poly([[b[1], ''], [vB[1], 't']])}$. Both give $t=${t}$ (consistent, so they collide) at $(${P[0]},${P[1]})$.` }; },
      ],
    },
    {
      id: 'f2_vcirc', title: 'Motion in a vertical circle', sims: ['f2_vcirc'],
      notes: T`<ul><li>Speed varies, so use <b>energy</b> to link speeds: from the bottom (speed $u$) to angle $\theta$ from the downward vertical, $v^2=u^2-2gr(1-\cos\theta)$.</li><li>Use <b>Newton's second law towards the centre</b> for the force: on a string at angle $\theta$ from the bottom, $T-mg\cos\theta=\frac{mv^2}r$.</li>
<li><b>String</b> (or inside of a smooth surface): completes the circle if $T\ge0$ at the top, i.e. $v_{\text{top}}^2\ge gr$, so $u^2\ge5gr$.</li><li><b>Light rod</b> (or bead on a wire): only needs $v_{\text{top}}\ge0$, so $u^2\ge4gr$.</li><li>A particle on the <b>outside</b> of a smooth sphere leaves the surface when the normal reaction becomes $0$.</li></ul>`,
      drills: [
        () => { const r = pick([0.5, 0.8, 1, 1.2, 1.5]), m = pick([0.2, 0.5, 1]), u = +(Math.sqrt(5 * G * r) + pick([0.5, 1, 2])).toFixed(1); const v2 = u * u - 4 * G * r, T_ = m * v2 / r - m * G; return { q: T`A particle of mass $${m}$ kg on a light inextensible string of length $${r}$ m moves in a vertical circle. Its speed at the lowest point is $${u}$ m s⁻¹. Find its speed and the tension at the highest point.`, fields: [{ label: 'v_top', ans: Math.sqrt(v2) }, { label: 'T_top (N)', ans: T_ }],
          sol: T`Energy: $v^2=${u}^2-4(9.8)(${r})=${num(v2, 4)}$, $v=${sf3(Math.sqrt(v2))}$ m s⁻¹. At the top, towards the centre: $T+mg=\frac{mv^2}r\Rightarrow T=${sf3(T_)}$ N ($\ge0$, so the string stays taut).` }; },
        () => { const r = pick([0.5, 0.8, 1, 1.5, 2]), rod = Math.random() < 0.5; return { q: T`A particle is attached to a light ${rod ? 'rod' : 'string'} of length $${r}$ m, free to rotate in a vertical circle about a fixed point. Find the least speed at the lowest point for it to complete the circle.`, fields: [{ label: 'u_min', ans: Math.sqrt((rod ? 4 : 5) * G * r) }],
          sol: T`${rod ? 'A rod can push, so it only needs to reach the top: $v_{\\text{top}}\\ge0$. Energy: $u^2\\ge4gr$' : 'A string must stay taut at the top: $T\\ge0$ needs $v_{\\text{top}}^2\\ge gr$. Energy: $u^2=v_{\\text{top}}^2+4gr\\ge5gr$'}, so $u_{\min}=\sqrt{${rod ? 4 : 5}(9.8)(${r})}=${sf3(Math.sqrt((rod ? 4 : 5) * G * r))}$ m s⁻¹.` }; },
        () => { const r = pick([0.5, 1, 1.5]), m = pick([0.5, 1, 2]), u = pick([6, 7, 8]), th = pick([60, 90, 120]); const v2 = u * u - 2 * G * r * (1 - Math.cos(dg(th))); if (v2 <= 0) return null; const T_ = m * v2 / r + m * G * Math.cos(dg(th)); if (T_ < 0) return null;
          return { q: T`A particle of mass $${m}$ kg on a string of length $${r}$ m moves in a vertical circle, with speed $${u}$ m s⁻¹ at the lowest point. Find the tension when the string has turned through $${th}^\circ$ from the downward vertical.`, fields: [{ label: 'T (N)', ans: T_ }],
            sol: T`Height risen $r(1-\cos${th}^\circ)$: $v^2=${u}^2-2g(${r})(1-\cos${th}^\circ)=${num(v2, 4)}$. Towards the centre: $T-mg\cos${th}^\circ=\frac{mv^2}r\Rightarrow T=${sf3(T_)}$ N.` }; },
        () => { const r = pick([0.5, 1, 2, 3]); const c = 2 / 3; return { q: T`A particle is released from rest at the top of a smooth sphere of radius $${r}$ m and slides down the outside. Find the height above the centre at which it leaves the surface.`, fields: [{ label: 'height (m)', ans: r * c }],
          sol: T`At angle $\theta$ from the top: $v^2=2gr(1-\cos\theta)$ and $mg\cos\theta-R=\frac{mv^2}r$. Leaves when $R=0$: $g\cos\theta=2g(1-\cos\theta)\Rightarrow\cos\theta=\frac23$. Height $r\cos\theta=${nice(r * c)}$ m.` }; },
      ],
    },
    {
      id: 'f2_grav', title: 'Gravitation & satellites', sims: [],
      notes: T`$$F=\frac{Gm_1m_2}{d^2},\qquad G=6.67\times10^{-11}\ \text{N m}^2\text{kg}^{-2}$$
<ul><li>The force is attractive and acts along the line joining the centres (treat spheres as point masses at their centres).</li><li>At a planet's surface $mg=\frac{GMm}{R^2}$, so $GM=gR^2$.</li>
<li><b>Circular orbit</b> of radius $r$: gravity provides the central force, $\frac{GMm}{r^2}=\frac{mv^2}r$, so $v=\sqrt{\frac{GM}r}$ and the period $T=\frac{2\pi r}v=2\pi\sqrt{\frac{r^3}{GM}}$ (so $T^2\propto r^3$).</li><li>A <b>geostationary</b> satellite orbits above the equator with the Earth's period of rotation.</li></ul><p class="muted small">Type powers of ten with a capital E: 4.2E7 means $4.2\times10^7$.</p>`,
      drills: [
        () => { const m1 = pick([50, 60, 70, 100]), m2 = pick([50, 80, 1000]), d = pick([0.5, 1, 2, 5]); const F = GN * m1 * m2 / (d * d); return { q: T`Find the gravitational force between masses of $${m1}$ kg and $${m2}$ kg whose centres are $${d}$ m apart ($G=6.67\times10^{-11}$).`, fields: [{ label: 'F (N)', ans: F, tol: { rel: 0.005 } }], sol: T`$F=\frac{6.67\times10^{-11}\times${m1}\times${m2}}{${d}^2}=${sci3(F)}$ N — tiny for everyday masses.` }; },
        () => { const M = 5.97e24, R = 6.37e6, h = pick([2e5, 4e5, 1e6, 2e6]); const r = R + h, v = Math.sqrt(GN * M / r), T_ = 2 * Math.PI * r / v; return { q: T`A satellite moves in a circular orbit $${sci3(h / 1000)}$ km above the Earth's surface. Taking $M=5.97\times10^{24}$ kg, $R=6.37\times10^6$ m and $G=6.67\times10^{-11}$, find its speed and its period in minutes.`, fields: [{ label: 'v (m/s)', ans: v, tol: { rel: 0.005 } }, { label: 'T (min)', ans: T_ / 60, tol: { rel: 0.005 } }],
          sol: T`$r=${sci3(r)}$ m. $v=\sqrt{\frac{GM}r}=${sci3(v)}$ m s⁻¹; $T=\frac{2\pi r}v=${sci3(T_)}$ s $=${sf3(T_ / 60)}$ min.` }; },
        () => { const M = 5.97e24, T_ = 86164; const r = Math.cbrt(GN * M * T_ * T_ / (4 * Math.PI ** 2)); return { q: T`A geostationary satellite has period $86\,164$ s (one sidereal day). Find the radius of its orbit, taking $GM=6.67\times10^{-11}\times5.97\times10^{24}$.`, fields: [{ label: 'r (m)', ans: r, tol: { rel: 0.005 } }],
          sol: T`$\frac{GMm}{r^2}=mr\left(\frac{2\pi}T\right)^2\Rightarrow r^3=\frac{GMT^2}{4\pi^2}$, so $r=${sci3(r)}$ m (about $36\,000$ km above the surface).` }; },
        () => { const g = 9.8, R = 6.37e6, k = pick([0.5, 1, 2, 3]); const h = k * R, gh = g * R * R / ((R + h) ** 2); return { q: T`At the Earth's surface $g=9.8$ m s⁻². Find the gravitational acceleration at a height of $${k}R$ above the surface, where $R$ is the Earth's radius.`, fields: [{ label: 'g (m/s²)', ans: gh, tol: { rel: 0.005 } }],
          sol: T`$g\propto\frac1{d^2}$: $g_h=9.8\times\left(\frac{R}{${num(1 + k)}R}\right)^2=\frac{9.8}{${num((1 + k) ** 2)}}=${sf3(gh)}$ m s⁻².` }; },
      ],
    },
    {
      id: 'f2_dim', title: 'Dimensional analysis', sims: [],
      notes: T`<ul><li>Basic dimensions: mass $[M]$, length $[L]$, time $[T]$. Velocity $LT^{-1}$, acceleration $LT^{-2}$, force $MLT^{-2}$, energy/work $ML^2T^{-2}$, power $ML^2T^{-3}$, momentum $MLT^{-1}$, density $ML^{-3}$, pressure $ML^{-1}T^{-2}$.</li>
<li>Numbers, angles and trig/exponential values are dimensionless.</li><li>A valid equation is <b>dimensionally consistent</b>: every term has the same dimensions (consistency doesn't prove it right — constants like $\frac12$ are invisible).</li>
<li>If $Q=k\,a^\alpha b^\beta c^\gamma$, equate the powers of $M$, $L$ and $T$ on each side and solve for $\alpha,\beta,\gamma$.</li></ul>`,
      drills: [
        () => { const L = [['force', 'MLT^{-2}'], ['work', 'ML^2T^{-2}'], ['power', 'ML^2T^{-3}'], ['momentum', 'MLT^{-1}'], ['density', 'ML^{-3}'], ['pressure', 'ML^{-1}T^{-2}'], ['acceleration', 'LT^{-2}'], ['the modulus of elasticity λ', 'MLT^{-2}'], ['the gravitational constant G', 'M^{-1}L^3T^{-2}']];
          const [q, r] = pick(L), opts = shuffle([r, ...shuffle([...new Set(L.map(x => x[1]))].filter(x => x !== r)).slice(0, 3)]); return { q: T`What are the dimensions of ${q}?`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(r) }, sol: T`$${r}$.${q.includes('G') ? ' From $F=\\frac{Gm_1m_2}{d^2}$: $[G]=\\frac{MLT^{-2}\\cdot L^2}{M^2}$.' : ''}` }; },
        () => { const L = [['the period of a pendulum $T=2\\pi\\sqrt{l/g}$', true], ['$v^2=u^2+2as$', true], ['$s=ut+\\tfrac12at$', false], ['$P=Fv^2$', false], ['$E=\\frac{\\lambda x^2}{2l}$', true], ['$F=mv/r$', false]];
          const [e, ok] = pick(L), opts = ['Dimensionally consistent', 'Not dimensionally consistent']; return { q: T`Is ${e} dimensionally consistent?`, mc: { options: opts, correct: ok ? 0 : 1 }, sol: T`${ok ? 'Every term has the same dimensions.' : 'The terms have different dimensions, so the equation must be wrong.'}` }; },
        () => { const L = [['The period $T$ of a pendulum depends on its length $l$, the mass $m$ and $g$: $T=k\\,l^\\alpha m^\\beta g^\\gamma$.', [0.5, 0, -0.5], ['α (power of l)', 'β (power of m)', 'γ (power of g)'], 'T: $T^1=L^{\\alpha+\\gamma}M^\\beta T^{-2\\gamma}$, so $\\beta=0$, $\\gamma=-\\frac12$, $\\alpha=\\frac12$: $T=k\\sqrt{l/g}$.'],
          ['The speed $v$ of a wave on deep water depends on its wavelength $\\lambda$, the density $\\rho$ and $g$: $v=k\\lambda^\\alpha\\rho^\\beta g^\\gamma$.', [0.5, 0, 0.5], ['α (power of λ)', 'β (power of ρ)', 'γ (power of g)'], '$LT^{-1}=L^\\alpha(ML^{-3})^\\beta(LT^{-2})^\\gamma$: $M$: $\\beta=0$; $T$: $\\gamma=\\frac12$; $L$: $\\alpha=\\frac12$.'],
          ['The tension $T$ in a string whirling a mass $m$ at speed $v$ in a circle of radius $r$: $T=k\\,m^\\alpha v^\\beta r^\\gamma$.', [1, 2, -1], ['α (power of m)', 'β (power of v)', 'γ (power of r)'], '$MLT^{-2}=M^\\alpha(LT^{-1})^\\beta L^\\gamma$: $\\alpha=1$, $\\beta=2$, $\\gamma=-1$: $T=k\\frac{mv^2}r$.'],
          ['The orbital period $T$ depends on the radius $r$, the central mass $M$ and $G$: $T=k\\,r^\\alpha M^\\beta G^\\gamma$.', [1.5, -0.5, -0.5], ['α (power of r)', 'β (power of M)', 'γ (power of G)'], '$T=L^\\alpha M^\\beta(M^{-1}L^3T^{-2})^\\gamma$: $T$: $\\gamma=-\\frac12$; $M$: $\\beta=\\gamma=-\\frac12$; $L$: $\\alpha+3\\gamma=0\\Rightarrow\\alpha=\\frac32$.']];
          const [q, ans, labs, sol] = pick(L); return { q: T`${q} Find $\alpha$, $\beta$, $\gamma$.`, fields: ans.map((a, i) => ({ label: labs[i], ans: a })), sol: T`Equate powers of $M$, $L$, $T$. ${sol}` }; },
      ],
    },
  ],
});
