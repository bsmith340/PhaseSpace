// CCEA GCE Mathematics A2 2 Applied Mathematics (Section A Mechanics, Section B Statistics): notes + drill generators.
'use strict';

const polyT = (cs, v = 't') => { let s = ''; cs.forEach((c, i) => { const e = cs.length - 1 - i; if (Math.abs(c) < 1e-12) return; const a = Math.abs(c), w = e === 0 ? '' : e === 1 ? v : `${v}^{${e}}`, k = (Math.abs(a - 1) < 1e-12 && w) ? '' : nice(a); s += (s ? (c < 0 ? ' - ' : ' + ') : (c < 0 ? '-' : '')) + k + w; }); return s || '0'; }; // [a,b,c] → a t^2 + b t + c, fractions kept exact
const pval = (cs, t) => cs.reduce((s, c) => s * t + c, 0);
const pder = cs => cs.slice(0, -1).map((c, i) => c * (cs.length - 1 - i));
const pint = (cs, c0 = 0) => [...cs.map((c, i) => c / (cs.length - i)), c0];
const sig4 = x => x.toFixed(4);

topic({
  id: '_m4', title: 'A2 2', points: [
    /* ======================= MECHANICS ======================= */
    {
      id: 'm4_cal1', title: 'Calculus in kinematics (straight line)', sims: ['m4_cal'],
      notes: T`$$v=\frac{ds}{dt},\qquad a=\frac{dv}{dt}=\frac{d^2s}{dt^2},\qquad s=\int v\,dt,\qquad v=\int a\,dt$$
<ul><li>Use calculus whenever the acceleration is <b>not constant</b> (suvat only works for constant $a$).</li><li>Integrating introduces a constant: find it from an initial condition ($s=0$ at $t=0$, or $v=u$ at $t=0$).</li>
<li>At rest: $v=0$. Maximum velocity: $a=0$. Distance travelled: split the integral where $v$ changes sign.</li></ul>`,
      drills: [
        () => { const c = [ri(1, 2), rnz(-9, 9), ri(-12, 12), 0], t = ri(1, 4); const v = pder(c), a = pder(v);
          return { q: T`A particle moves in a straight line with displacement $s=${polyT(c)}$ m at time $t$ s. Find its velocity and acceleration when $t=${t}$.`, fields: [{ label: 'v', ans: pval(v, t) }, { label: 'a', ans: pval(a, t) }],
            sol: T`$v=\dfrac{ds}{dt}=${polyT(v)}$, so $v(${t})=${pval(v, t)}$ m s⁻¹. $a=\dfrac{dv}{dt}=${polyT(a)}$, so $a(${t})=${pval(a, t)}$ m s⁻².` }; },
        () => { const r1 = ri(1, 3), r2 = r1 + ri(1, 4), k = pick([1, 2, 3]); const v = [k, -k * (r1 + r2), k * r1 * r2]; // v = k(t-r1)(t-r2)
          return { q: T`A particle's velocity is $v=${polyT(v)}$ m s⁻¹. Find the times when it is instantaneously at rest.`, fields: [{ label: 'times', set: [r1, r2] }], sol: T`$v=0$: $${k === 1 ? '' : k}(t-${r1})(t-${r2})=0\Rightarrow t=${r1}$ or $${r2}$ s.` }; },
        () => { const a = [rnz(-3, 3), ri(-6, 6)], u = ri(0, 10), T_ = ri(1, 5); const v = pint(a, u); return { q: T`A particle has acceleration $a=${polyT(a)}$ m s⁻² and starts with velocity $${u}$ m s⁻¹. Find its velocity when $t=${T_}$.`, fields: [{ label: 'v', ans: pval(v, T_) }],
          sol: T`$v=\int a\,dt=${polyT(v)}$ (the constant is $${u}$ from $v=${u}$ at $t=0$). $v(${T_})=${num(pval(v, T_), 6)}$ m s⁻¹.` }; },
        () => { const r = ri(1, 4), k = pick([1, 2, 3]), T_ = r + ri(1, 3); const v = [k, -k * r, 0]; // v = k t (t - r): negative for 0<t<r
          const S = x => k * x ** 3 / 3 - k * r * x * x / 2, disp = S(T_), dist = Math.abs(S(r)) + Math.abs(S(T_) - S(r));
          return { q: T`A particle moves with velocity $v=${polyT(v)}$ m s⁻¹. Find its displacement and the total distance travelled between $t=0$ and $t=${T_}$.`, fields: [{ label: 'displacement', ans: disp }, { label: 'distance', ans: dist }],
            sol: T`$v\lt0$ for $0\lt t\lt${r}$, so split there. $\int v\,dt=${nice(k / 3)}t^3-${nice(k * r / 2)}t^2$. Displacement $=${num(disp, 5)}$ m. Distance $=|${num(S(r), 5)}|+|${num(S(T_) - S(r), 5)}|=${num(dist, 5)}$ m.` }; },
      ],
    },
    {
      id: 'm4_cal2', title: 'Calculus with vectors in two dimensions', sims: [],
      notes: T`$$\mathbf v=\frac{d\mathbf r}{dt},\qquad\mathbf a=\frac{d\mathbf v}{dt}=\frac{d^2\mathbf r}{dt^2},\qquad\mathbf r=\int\mathbf v\,dt,\qquad\mathbf v=\int\mathbf a\,dt$$
<ul><li>Differentiate or integrate the $\mathbf i$ and $\mathbf j$ components separately; the constant of integration is a <b>vector</b>.</li><li>Speed $=|\mathbf v|$. "Moving parallel to $\mathbf j$": $\mathbf i$-component of $\mathbf v$ is zero. "Due north-east": components equal and positive.</li></ul>`,
      drills: [
        () => { const x = [rnz(-2, 2), ri(-6, 6), 0], y = [rnz(-3, 3), ri(-5, 5), ri(-4, 4)], t = ri(1, 3); const vx = pder(x), vy = pder(y);
          return { q: T`A particle has position vector $\mathbf r=\big(${polyT(x)}\big)\mathbf i+\big(${polyT(y)}\big)\mathbf j$ m. Find its velocity at $t=${t}$ (components) and its speed.`, fields: [{ label: 'v (i, j)', vec: [pval(vx, t), pval(vy, t)] }, { label: 'speed', ans: Math.hypot(pval(vx, t), pval(vy, t)) }],
            sol: T`$\mathbf v=(${polyT(vx)})\mathbf i+(${polyT(vy)})\mathbf j$; at $t=${t}$: $${poly([[pval(vx, t), '\\mathbf i'], [pval(vy, t), '\\mathbf j']])}$, speed $${num(Math.hypot(pval(vx, t), pval(vy, t)), 5)}$ m s⁻¹.` }; },
        () => { const vx = [rnz(-3, 3), ri(-4, 4)], vy = [rnz(-2, 2), ri(-4, 4)], r0 = [ri(-3, 3), ri(-3, 3)], t = ri(1, 4); const rx = pint(vx, r0[0]), ry = pint(vy, r0[1]);
          return { q: T`A particle has velocity $\mathbf v=(${polyT(vx)})\mathbf i+(${polyT(vy)})\mathbf j$ m s⁻¹ and is ${r0[0] || r0[1] ? `at $(${poly([[r0[0], '\\mathbf i'], [r0[1], '\\mathbf j']])})$ m` : 'at the origin'} when $t=0$. Find its position vector when $t=${t}$.`, fields: [{ label: 'r (i, j)', vec: [pval(rx, t), pval(ry, t)] }],
            sol: T`$\mathbf r=\int\mathbf v\,dt=(${polyT(rx)})\mathbf i+(${polyT(ry)})\mathbf j$, using $\mathbf r(0)$. At $t=${t}$: $(${num(pval(rx, t), 6)},\ ${num(pval(ry, t), 6)})$.` }; },
        () => { const r = ri(1, 5), k = rnz(-3, 3), b = ri(-5, 5); // v = (2t - 2r) i + (k t + b) j  → parallel to j when t = r
          return { q: T`A particle has velocity $\mathbf v=(2t-${2 * r})\mathbf i+(${polyT([k, b])})\mathbf j$ m s⁻¹. At what time is it moving parallel to $\mathbf j$, and what is its speed then?`, fields: [{ label: 't', ans: r }, { label: 'speed', ans: Math.abs(k * r + b) }],
            sol: T`Parallel to $\mathbf j$: $2t-${2 * r}=0\Rightarrow t=${r}$. Then $\mathbf v=${k * r + b}\mathbf j$, speed $${Math.abs(k * r + b)}$ m s⁻¹.${k * r + b === 0 ? ' (It is momentarily at rest.)' : ''}` }; },
      ],
    },
    {
      id: 'm4_proj', title: 'Projectiles', sims: ['m4_proj'],
      notes: T`A particle projected with speed $u$ at angle $\alpha$ above the horizontal (no air resistance), with $g$ downwards:
$$x=ut\cos\alpha,\qquad y=ut\sin\alpha-\tfrac12gt^2,\qquad v_x=u\cos\alpha,\quad v_y=u\sin\alpha-gt$$
<ul><li>Horizontal motion has constant velocity; vertical motion is suvat with $a=-g$.</li><li>Time of flight (same level) $\frac{2u\sin\alpha}g$; greatest height $\frac{u^2\sin^2\alpha}{2g}$; range $\frac{u^2\sin2\alpha}{g}$ (maximum at $\alpha=45^\circ$).</li>
<li>In vector form: $\mathbf r=\mathbf ut+\tfrac12\mathbf gt^2$ with $\mathbf g=-9.8\mathbf j$.</li><li>Derive these each time — they aren't in the booklet.</li></ul>`,
      drills: [
        () => { const u = pick([10, 12, 14, 15, 20, 24, 25]), al = pick([20, 30, 35, 40, 45, 50, 60]); const s = Math.sin(dg(al)), c = Math.cos(dg(al)); const T_ = 2 * u * s / G, H = (u * s) ** 2 / (2 * G), R = u * c * T_;
          return { q: T`A ball is projected from level ground at $${u}$ m s⁻¹ at $${al}^\circ$ above the horizontal. Find the time of flight, the greatest height and the range.`, fields: [{ label: 'time (s)', ans: T_ }, { label: 'height (m)', ans: H }, { label: 'range (m)', ans: R }],
            sol: T`$u_x=${sf3(u * c)}$, $u_y=${sf3(u * s)}$. Land: $0=u_yt-4.9t^2\Rightarrow t=${sf3(T_)}$ s. Top: $0=u_y^2-19.6h\Rightarrow h=${sf3(H)}$ m. Range $=u_xt=${sf3(R)}$ m.` }; },
        () => { const u = pick([8, 10, 12, 15]), h = pick([10, 15, 20, 25, 30, 45]); const t = Math.sqrt(2 * h / G); return { q: T`A stone is thrown horizontally at $${u}$ m s⁻¹ from the top of a cliff $${h}$ m high. Find how far from the foot of the cliff it lands and its speed on impact.`, fields: [{ label: 'distance (m)', ans: u * t }, { label: 'speed', ans: Math.hypot(u, G * t) }],
          sol: T`Vertical: $${h}=4.9t^2\Rightarrow t=${sf3(t)}$ s. Horizontal: $${u}\times${sf3(t)}=${sf3(u * t)}$ m. $v_y=9.8t=${sf3(G * t)}$, speed $=\sqrt{${u}^2+${sf3(G * t)}^2}=${sf3(Math.hypot(u, G * t))}$ m s⁻¹.` }; },
        () => { const u = pick([15, 20, 25, 30]), al = pick([30, 40, 50, 60]), t = pick([1, 1.5, 2]); const vx = u * Math.cos(dg(al)), vy = u * Math.sin(dg(al)) - G * t; const ang = rd(Math.atan2(vy, vx));
          return { q: T`A particle is projected at $${u}$ m s⁻¹ at $${al}^\circ$ above the horizontal. Find its speed and the angle its velocity makes with the horizontal after $${t}$ s (positive = above).`, fields: [{ label: 'speed', ans: Math.hypot(vx, vy) }, { label: 'angle (°)', ans: ang, tol: { abs: 0.15 } }],
            sol: T`$v_x=${sf3(vx)}$, $v_y=${sf3(u * Math.sin(dg(al)))}-9.8(${t})=${sf3(vy)}$. Speed $${sf3(Math.hypot(vx, vy))}$ m s⁻¹, angle $\tan^{-1}\frac{${sf3(vy)}}{${sf3(vx)}}=${sf3(ang)}^\circ$ ${vy < 0 ? '(below the horizontal — it is coming down)' : ''}.` }; },
        () => { const u = pick([14, 21, 28]), h = pick([0, 2, 5]), al = 90; const x = pick([10, 15, 20, 25]); // target at horizontal distance x, height 0: find angles (two) for range on level ground with h=0
          const sin2 = G * x / (u * u); if (sin2 > 1) return null; const a1 = rd(Math.asin(sin2)) / 2, a2 = 90 - a1;
          return { q: T`A ball is kicked from level ground at $${u}$ m s⁻¹ and lands $${x}$ m away. Find the two possible angles of projection (degrees).`, fields: [{ label: 'angles', set: [a1, a2], tol: { abs: 0.06 } }],
            sol: T`Range $\frac{u^2\sin2\alpha}{g}=${x}\Rightarrow\sin2\alpha=\frac{9.8\times${x}}{${u * u}}=${num(sin2, 4)}$. $2\alpha=${num(2 * a1, 4)}^\circ$ or $${num(180 - 2 * a1, 4)}^\circ$, so $\alpha=${num(a1, 4)}^\circ$ or $${num(a2, 4)}^\circ$ (complementary angles give the same range).` }; },
      ],
    },
    {
      id: 'm4_mom', title: 'Moments: rods & beams', sims: ['m4_beam'],
      notes: T`<ul><li>The <b>moment</b> of a force about a point = force × perpendicular distance from the point to its line of action (N m), clockwise or anticlockwise.</li>
<li><b>Equilibrium of a rigid body</b>: resultant force zero <i>and</i> total moment about any point zero.</li><li>Take moments about a point where an unknown force acts — it disappears from the equation.</li>
<li>A <b>uniform</b> rod's weight acts at its midpoint. "On the point of tilting about $C$": the reaction at the other support is zero.</li></ul>`,
      drills: [
        () => { const L = pick([4, 5, 6, 8, 10]), W = pick([40, 60, 80, 100, 120]), m = pick([20, 30, 50, 60]), x = ri(1, L - 1); // supports at A (0) and B (L), uniform weight W at L/2, load m at x
          const RB = (W * L / 2 + m * x) / L, RA = W + m - RB;
          return { q: T`A uniform beam $AB$ of length $${L}$ m and weight $${W}$ N rests on supports at $A$ and $B$. A load of $${m}$ N is placed $${x}$ m from $A$. Find the reactions at $A$ and $B$.`, fields: [{ label: 'R_A', ans: RA }, { label: 'R_B', ans: RB }],
            sol: T`Moments about $A$: $R_B\times${L}=${W}\times${L / 2}+${m}\times${x}\Rightarrow R_B=${num(RB, 5)}$ N. Vertically: $R_A=${W + m}-R_B=${num(RA, 5)}$ N.` }; },
        () => { const L = pick([6, 8, 10]), W = pick([50, 80, 100]), c = pick([1, 2]), d = pick([1, 2]); // supports at C (c from A) and D (d from B)
          const Dp = L - d, m = W * (Dp - L / 2) / (L - Dp) ; // load at B end: on point of tilting about D → R_C = 0: m*(L-Dp) = W*(Dp - L/2)
          if (m <= 0) return null;
          return { q: T`A uniform plank $AB$ of length $${L}$ m and weight $${W}$ N rests horizontally on supports at $C$ and $D$, where $AC=${c}$ m and $DB=${d}$ m. A boy stands at $B$. Find his greatest weight before the plank tilts about $D$.`, fields: [{ label: 'weight (N)', ans: m }],
            sol: T`About to tilt about $D$: reaction at $C$ is zero. Moments about $D$: $w\times${d}=${W}\times(${Dp}-${L / 2})=${W}\times${Dp - L / 2}\Rightarrow w=${num(m, 5)}$ N.` }; },
        () => { const L = pick([2, 3, 4, 5]), W = pick([20, 30, 40, 50]), T_ = pick([30, 40, 45, 60]); // light? no: uniform rod hinged at A, held horizontal by vertical string at B? → T = W/2
          const at = pick([1, 0.75]), Tn = W * (L / 2) / (at * L);
          return { q: T`A uniform rod $AB$ of length $${L}$ m and weight $${W}$ N is hinged at $A$ and held horizontal by a vertical string attached ${at === 1 ? 'at $B$' : `at the point $${num(at * L)}$ m from $A$`}. Find the tension in the string.`, fields: [{ label: 'T (N)', ans: Tn }],
            sol: T`Moments about $A$ (the hinge force has no moment there): $T\times${num(at * L)}=${W}\times${num(L / 2)}\Rightarrow T=${num(Tn, 5)}$ N.` }; },
      ],
    },
    {
      id: 'm4_ladder', title: 'Ladders & hinged beams', sims: [],
      notes: T`<ul><li><b>Ladder</b> against a smooth wall on rough ground: forces are the weight $W$ (at the middle if uniform), normal reaction $R$ and friction $F$ at the ground, normal reaction $S$ at the wall (horizontal).</li>
<li>Resolve: $R=W$, $F=S$. Take moments about the foot. Limiting: $F=\mu R$.</li><li>For a ladder of length $2a$ at angle $\theta$ to the ground: $S\cdot2a\sin\theta=W\cdot a\cos\theta\Rightarrow S=\frac W2\cot\theta$, so slipping needs $\mu\ge\frac12\cot\theta$.</li>
<li><b>Hinged beam</b>: the hinge exerts a force with unknown horizontal and vertical components — take moments about the hinge.</li></ul>`,
      drills: [
        () => { const th = pick([50, 55, 60, 65, 70, 75]); const mu = 0.5 / Math.tan(dg(th)); return { q: T`A uniform ladder rests against a smooth vertical wall with its foot on rough horizontal ground, at $${th}^\circ$ to the horizontal. It is on the point of slipping. Find the coefficient of friction.`, fields: [{ label: 'μ', ans: mu }],
          sol: T`Length $2a$, weight $W$. $R=W$, $F=S$. Moments about the foot: $S(2a\sin${th}^\circ)=W(a\cos${th}^\circ)\Rightarrow S=\tfrac12W\cot${th}^\circ$. Limiting $F=\mu R$: $\mu=\tfrac12\cot${th}^\circ=${sf3(mu)}$.` }; },
        () => { const th = pick([55, 60, 65, 70]), W = pick([200, 250, 300]), m = pick([600, 700, 800]), f = pick([0.5, 0.75, 1]); // man of weight m at fraction f of the way up a uniform ladder
          const S = (W * 0.5 + m * f) * Math.cos(dg(th)) / Math.sin(dg(th)), mu = S / (W + m);
          return { q: T`A uniform ladder of weight $${W}$ N stands on rough ground against a smooth wall at $${th}^\circ$ to the horizontal. A man of weight $${m}$ N stands ${f === 1 ? 'at the top' : `${f === 0.5 ? 'half' : 'three-quarters'} of the way up`}. Find the least coefficient of friction for equilibrium.`, fields: [{ label: 'μ', ans: mu }],
            sol: T`Length $L$. Moments about the foot: $S L\sin${th}^\circ=(${W}\cdot\tfrac12+${m}\cdot${f})L\cos${th}^\circ\Rightarrow S=${sf3(S)}$ N. $R=${W + m}$ N, $F=S$. $\mu\ge\frac FR=${sf3(mu)}$.` }; },
        () => { const L = pick([2, 3, 4]), W = pick([40, 60, 80, 100]), al = pick([30, 40, 45, 60]); // uniform rod hinged at wall A, horizontal, held by string from B to wall at angle al to rod
          const Tn = W * (L / 2) / (L * Math.sin(dg(al))), H = Tn * Math.cos(dg(al)), V = W - Tn * Math.sin(dg(al));
          return { q: T`A uniform rod $AB$ of length $${L}$ m and weight $${W}$ N is hinged to a wall at $A$ and held horizontal by a string from $B$ to a point on the wall above $A$; the string makes $${al}^\circ$ with the rod. Find the tension and the horizontal and vertical components of the hinge force.`, fields: [{ label: 'T', ans: Tn }, { label: 'horizontal', ans: H }, { label: 'vertical', ans: V }],
            sol: T`Moments about $A$: $T\sin${al}^\circ\times${L}=${W}\times${L / 2}\Rightarrow T=${sf3(Tn)}$ N. Horizontal: $X=T\cos${al}^\circ=${sf3(H)}$ N. Vertical: $Y=${W}-T\sin${al}^\circ=${sf3(V)}$ N.` }; },
      ],
    },
    {
      id: 'm4_imp', title: 'Impulse, momentum, collisions & explosions', sims: ['m4_coll'],
      notes: T`<ul><li><b>Momentum</b> $=m\mathbf v$ (N s, a vector). <b>Impulse</b> of a force $=$ force × time $=$ change in momentum: $\mathbf I=m\mathbf v-m\mathbf u$.</li>
<li><b>Conservation of linear momentum</b>: in a collision or explosion with no external impulse, total momentum before = total momentum after: $m_1u_1+m_2u_2=m_1v_1+m_2v_2$.</li><li>Choose a positive direction; velocities in the other direction are negative. If the particles coalesce, they share one final velocity.</li><li>The impulse on each particle is equal and opposite (Newton's third law).</li></ul>`,
      drills: [
        () => { const m = pick([0.2, 0.4, 0.5, 2, 3, 5]), u = ri(2, 12), v = -ri(1, 10); return { q: T`A ball of mass $${m}$ kg moving at $${u}$ m s⁻¹ hits a wall and rebounds at $${-v}$ m s⁻¹. Find the magnitude of the impulse on the ball.`, fields: [{ label: 'I (N s)', ans: m * (u - v) }],
          sol: T`Taking the initial direction as positive: $I=mv-mu=${m}(${v})-${m}(${u})=${num(m * (v - u), 5)}$, magnitude $${num(m * (u - v), 5)}$ N s.` }; },
        () => { const m1 = ri(1, 6), m2 = ri(1, 6), u1 = ri(2, 10), u2 = ri(-6, 4); const v = (m1 * u1 + m2 * u2) / (m1 + m2);
          return { q: T`A particle of mass $${m1}$ kg moving at $${u1}$ m s⁻¹ collides with a particle of mass $${m2}$ kg moving ${u2 >= 0 ? `at $${u2}$ m s⁻¹ in the same direction` : `at $${-u2}$ m s⁻¹ in the opposite direction`}. They coalesce. Find their common velocity.`, fields: [{ label: 'v', ans: v }],
            sol: T`Momentum: $${m1}(${u1})+${m2}(${u2})=${m1 + m2}v\Rightarrow v=${nice(v)}$ m s⁻¹ ${v < 0 ? '(in the direction the second particle was moving)' : ''}.` }; },
        () => { const m1 = ri(1, 5), m2 = ri(1, 5), u1 = ri(3, 10), u2 = ri(-5, 2), v1 = ri(-4, u1 - 1); const v2 = (m1 * u1 + m2 * u2 - m1 * v1) / m2; if (v2 < v1) return null; // B must end up ahead of A
          return { q: T`Spheres $A$ ($${m1}$ kg, velocity $${u1}$ m s⁻¹) and $B$ ($${m2}$ kg, velocity $${u2}$ m s⁻¹) collide directly; velocities are positive in $A$'s original direction. After the collision $A$ moves at $${v1}$ m s⁻¹. Find the velocity of $B$ and the impulse on $B$.`, fields: [{ label: 'v_B', ans: v2 }, { label: 'impulse on B', ans: m2 * (v2 - u2) }],
            sol: T`$${m1}(${u1})+${m2}(${u2})=${m1}(${v1})+${m2}v_B\Rightarrow v_B=${nice(v2)}$ m s⁻¹. Impulse on $B$ $=${m2}(${nice(v2)}-(${u2}))=${nice(m2 * (v2 - u2))}$ N s (equal and opposite to that on $A$).` }; },
        () => { const M = pick([2, 3, 4, 5]), m = pick([0.5, 1, 1.5]), v = pick([4, 6, 8, 10, 12]); return { q: T`A shell of mass $${M + m}$ kg at rest explodes into two pieces of masses $${M}$ kg and $${m}$ kg. The smaller piece moves off at $${v}$ m s⁻¹. Find the speed of the larger piece.`, fields: [{ label: 'speed', ans: m * v / M }],
          sol: T`Initial momentum $0$: $${m}(${v})+${M}V=0\Rightarrow V=-${nice(m * v / M)}$ — speed $${nice(m * v / M)}$ m s⁻¹ in the opposite direction.` }; },
      ],
    },
    /* ======================= STATISTICS ======================= */
    {
      id: 'm4_cond', title: 'Conditional probability', sims: [],
      notes: T`$$P(A\mid B)=\frac{P(A\cap B)}{P(B)}\qquad\Longleftrightarrow\qquad P(A\cap B)=P(B)\,P(A\mid B)$$
<ul><li>"Given that $B$" restricts attention to $B$: in a two-way table, divide the cell by the $B$ row/column total.</li><li>On a tree diagram, the second-stage branches are conditional probabilities.</li>
<li>Reverse conditioning ("given the test was positive, what's the chance of the disease?"): $P(D\mid+)=\dfrac{P(D)P(+\mid D)}{P(+)}$.</li><li>$A,B$ independent ⇔ $P(A\mid B)=P(A)$.</li></ul>`,
      drills: [
        () => { const ab = ri(5, 25) / 100, b = ab + ri(5, 40) / 100; return { q: T`$P(A\cap B)=${ab}$ and $P(B)=${num(b)}$. Find $P(A\mid B)$.`, fields: [{ label: 'P(A|B)', ans: ab / b }], sol: T`$P(A\mid B)=\dfrac{${ab}}{${num(b)}}=${num(ab / b, 4)}$.` }; },
        () => { const t = [[ri(10, 40), ri(10, 40)], [ri(10, 40), ri(10, 40)]], r = ['Year 12', 'Year 13'], c = ['plays sport', 'does not']; const col0 = t[0][0] + t[1][0];
          return { q: T`<table class="tbl"><tr><th></th><th>${c[0]}</th><th>${c[1]}</th></tr>${t.map((row, i) => `<tr><td>${r[i]}</td><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('')}</table>A student is chosen at random. Find (a) $P(\text{Year 13}\mid\text{plays sport})$, (b) $P(\text{plays sport}\mid\text{Year 12})$.`,
            fields: [{ label: '(a)', ans: t[1][0] / col0 }, { label: '(b)', ans: t[0][0] / (t[0][0] + t[0][1]) }], sol: T`(a) Restrict to the $${col0}$ who play sport: $\frac{${t[1][0]}}{${col0}}$. (b) Restrict to the $${t[0][0] + t[0][1]}$ in Year 12: $\frac{${t[0][0]}}{${t[0][0] + t[0][1]}}$.` }; },
        () => { const pD = pick([0.01, 0.02, 0.05, 0.1]), sens = pick([0.9, 0.95, 0.98, 0.99]), fp = pick([0.02, 0.05, 0.1]); const pPos = pD * sens + (1 - pD) * fp, post = pD * sens / pPos;
          return { q: T`$${num(pD * 100)}\%$ of a population has a condition. A test is positive for $${num(sens * 100)}\%$ of people with the condition and for $${num(fp * 100)}\%$ of people without it. A person tests positive. Find the probability that they have the condition.`, fields: [{ label: 'P(D | +)', ans: post }],
            sol: T`$P(+)=${pD}(${sens})+${num(1 - pD)}(${fp})=${num(pPos, 5)}$. $P(D\mid+)=\dfrac{${num(pD * sens, 5)}}{${num(pPos, 5)}}=${num(post, 4)}$ — surprisingly low, because the condition is rare.` }; },
        () => { const r = ri(3, 7), b = ri(3, 7), n = r + b; const pSecondRed = r / n, pFirstRedGivenSecondRed = (r - 1) / (n - 1); return { q: T`A bag has $${r}$ red and $${b}$ blue balls. Two are taken without replacement. Given that the second is red, find the probability that the first was red.`, fields: [{ label: 'P', ans: pFirstRedGivenSecondRed }],
          sol: T`$P(R_2)=\frac{${r}}{${n}}\cdot\frac{${r - 1}}{${n - 1}}+\frac{${b}}{${n}}\cdot\frac{${r}}{${n - 1}}=\frac{${r}}{${n}}$. $P(R_1\cap R_2)=\frac{${r * (r - 1)}}{${n * (n - 1)}}$. So $P(R_1\mid R_2)=\dfrac{${r * (r - 1)}/${n * (n - 1)}}{${r}/${n}}=\frac{${r - 1}}{${n - 1}}$.` }; },
      ],
    },
    {
      id: 'm4_pmod', title: 'Modelling with probability', sims: [],
      notes: T`<ul><li>A probability model makes assumptions: outcomes equally likely, events independent, probabilities constant over time, past frequencies predict the future.</li>
<li><b>Critique</b> them in context: are the trials really independent (a tired player, weather that persists)? Is $p$ constant? Was the data representative?</li>
<li>More realistic assumptions usually change the answer in a predictable direction — say which way and why.</li><li>Expected frequency $=$ number of trials × probability.</li></ul>`,
      drills: [
        () => { const L = [['a footballer scores each penalty independently with probability 0.8', 'Successive penalties may not be independent: confidence or pressure after a miss changes the probability'], ['each day is wet with probability 0.3, independently', 'Weather tends to persist, so wet days are more likely to follow wet days'], ['a machine produces a faulty item with constant probability 0.02', 'The fault rate may increase as the machine wears or drift with conditions'], ['each of 30 pupils is equally likely to be chosen for a team', 'Selection is based on ability, not chance']];
          const [m, r] = pick(L), opts = shuffle([r, ...shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 2), 'There is nothing to criticise: probabilities never change']); return { q: T`A model assumes ${m}. Which criticism is most relevant?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
        () => { const n = pick([50, 120, 200, 365, 500]), p = pick([0.02, 0.05, 0.1, 0.15, 0.25, 0.3]); return { q: T`An event has probability $${p}$ on each of $${n}$ independent occasions. How many times would you expect it to happen?`, fields: [{ label: 'expected', ans: n * p }], sol: T`Expected frequency $=np=${n}\times${p}=${num(n * p)}$.` }; },
        () => { const a = pick([0.6, 0.7, 0.8]), b = pick([0.5, 0.6, 0.9]); return { q: T`A model says Jo passes Test 1 with probability $${a}$ and Test 2 with probability $${b}$, independently. Find $P(\text{passes both})$ under this model. (Then think: if passing Test 1 really makes passing Test 2 more likely, is the true value higher or lower?)`, fields: [{ label: 'P(both)', ans: a * b }],
          sol: T`Independent: $${a}\times${b}=${num(a * b)}$. If the results are positively related, $P(\text{both})=P(T_1)P(T_2\mid T_1)\gt${num(a * b)}$ — the independent model underestimates.` }; },
      ],
    },
    {
      id: 'm4_norm', title: 'The normal distribution', sims: ['m4_normal'],
      notes: T`<ul><li>$X\sim N(\mu,\sigma^2)$: a continuous, symmetric, bell-shaped distribution with mean $\mu$ and standard deviation $\sigma$. Probabilities are <b>areas</b> under the curve; $P(X=a)=0$.</li>
<li><b>Standardise</b>: $Z=\dfrac{X-\mu}{\sigma}\sim N(0,1)$, then use $\Phi(z)=P(Z\le z)$ from tables or the calculator.</li><li>$P(Z\gt z)=1-\Phi(z)$; $\Phi(-z)=1-\Phi(z)$.</li>
<li>About 68% of values lie within $1\sigma$ of the mean, 95% within $2\sigma$, 99.7% within $3\sigma$.</li></ul>`,
      drills: [
        () => { const mu = ri(20, 100), sd = pick([2, 3, 4, 5, 8, 10, 12, 15]), z = (ri(-200, 200) / 100), x = +(mu + z * sd).toFixed(1), typ = pick(['lt', 'gt']); const p = typ === 'lt' ? ST.normCDF(x, mu, sd) : 1 - ST.normCDF(x, mu, sd);
          return { q: T`$X\sim N(${mu},\ ${sd}^2)$. Find $P(X${typ === 'lt' ? '\\lt' : '\\gt'}${x})$.`, fields: [{ label: 'P', ans: p }], sol: T`$z=\dfrac{${x}-${mu}}{${sd}}=${num((x - mu) / sd, 4)}$. ${typ === 'lt' ? `$P=\\Phi(${num((x - mu) / sd, 4)})=${sig4(p)}$` : `$P=1-\\Phi(${num((x - mu) / sd, 4)})=${sig4(p)}$`}.` }; },
        () => { const mu = ri(30, 80), sd = pick([3, 4, 5, 6, 10]), a = +(mu - ri(1, 15) / 10 * sd).toFixed(0), b = +(mu + ri(1, 15) / 10 * sd).toFixed(0); const p = ST.normCDF(b, mu, sd) - ST.normCDF(a, mu, sd);
          return { q: T`The masses of apples are $N(${mu},\ ${sd}^2)$ grams. Find the probability that an apple has mass between $${a}$ g and $${b}$ g.`, fields: [{ label: 'P', ans: p }], sol: T`$P\left(\frac{${a}-${mu}}{${sd}}\lt Z\lt\frac{${b}-${mu}}{${sd}}\right)=\Phi(${num((b - mu) / sd, 4)})-\Phi(${num((a - mu) / sd, 4)})=${sig4(p)}$.` }; },
        () => { const mu = ri(100, 200), sd = pick([5, 8, 10, 15, 20]), n = pick([200, 500, 1000]), x = mu + pick([1, 1.5, 2, -1, -1.5]) * sd; const p = 1 - ST.normCDF(x, mu, sd);
          return { q: T`The lifetimes of $${n}$ bulbs are modelled by $N(${mu},\ ${sd}^2)$ hours. Estimate how many last longer than $${x}$ hours.`, fields: [{ label: 'number', ans: n * p, tol: { rel: 0.01, abs: 1 } }], sol: T`$P(X\gt${x})=1-\Phi(${num((x - mu) / sd, 4)})=${sig4(p)}$; expected number $${n}\times${sig4(p)}=${num(n * p, 4)}$, about $${Math.round(n * p)}$.` }; },
      ],
    },
    {
      id: 'm4_inorm', title: 'The inverse normal: finding values, μ and σ', sims: ['m4_normal'],
      notes: T`<ul><li>To find $a$ with $P(X\lt a)=p$: $z=\Phi^{-1}(p)$, then $a=\mu+z\sigma$. For $P(X\gt a)=p$ use $\Phi^{-1}(1-p)$.</li>
<li>Unknown $\mu$ or $\sigma$: write $\frac{a-\mu}{\sigma}=z$ for each given probability and solve (simultaneously if both are unknown).</li><li>Sketch the curve and shade the area — it shows whether $z$ should be positive or negative.</li></ul>`,
      drills: [
        () => { const mu = ri(40, 120), sd = pick([4, 5, 6, 8, 10, 12]), p = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.75, 0.8, 0.9, 0.95]), up = Math.random() < 0.5; const z = ST.invPhi(up ? 1 - p : p), a = mu + z * sd;
          return { q: T`$X\sim N(${mu},\ ${sd}^2)$. Find $a$ such that $P(X${up ? '\\gt' : '\\lt'} a)=${p}$.`, fields: [{ label: 'a', ans: a, tol: { abs: 0.06 } }], sol: T`$P(Z\lt z)=${num(up ? 1 - p : p)}\Rightarrow z=${num(z, 4)}$. $a=${mu}+${num(z, 4)}\times${sd}=${num(a, 5)}$.` }; },
        () => { const mu = ri(50, 150), sd = pick([5, 8, 10, 12, 15]), a = mu + pick([-1, 1]) * ri(3, 20), z0 = (a - mu) / sd; if (Math.abs(z0) > 2.5 || Math.abs(z0) < 0.25) return null; const p = +sig4(ST.normCDF(a, mu, sd)), z = ST.invPhi(p), s = (a - mu) / z;
          return { q: T`$X\sim N(${mu},\ \sigma^2)$ and $P(X\lt${a})=${sig4(p)}$. Find $\sigma$.`, fields: [{ label: 'σ', ans: s, tol: { rel: 0.01 } }], sol: T`$\frac{${a}-${mu}}{\sigma}=\Phi^{-1}(${sig4(p)})=${num(z, 4)}\Rightarrow\sigma=\frac{${a - mu}}{${num(z, 4)}}=${num(s, 4)}$.` }; },
        () => { const mu = ri(40, 90), sd = pick([4, 5, 6, 8]), a = mu - ri(2, 8), b = mu + ri(2, 10); if ((mu - a) / sd > 2.5 || (b - mu) / sd > 2.5) return null; const pa = +sig4(ST.normCDF(a, mu, sd)), pb = +sig4(1 - ST.normCDF(b, mu, sd)), za = ST.invPhi(pa), zb = ST.invPhi(1 - pb), s = (b - a) / (zb - za), m = a - za * s;
          return { q: T`$X\sim N(\mu,\sigma^2)$, $P(X\lt${a})=${sig4(pa)}$ and $P(X\gt${b})=${sig4(pb)}$. Find $\mu$ and $\sigma$.`, fields: [{ label: 'μ', ans: m, tol: { abs: 0.1 } }, { label: 'σ', ans: s, tol: { abs: 0.1 } }],
            sol: T`$\frac{${a}-\mu}{\sigma}=${num(za, 4)}$ and $\frac{${b}-\mu}{\sigma}=${num(zb, 4)}$. Subtract: $\frac{${b - a}}{\sigma}=${num(zb - za, 4)}\Rightarrow\sigma=${num(s, 4)}$, then $\mu=${a}-(${num(za, 4)})\sigma=${num(m, 4)}$.` }; },
      ],
    },
    {
      id: 'm4_choose', title: 'Choosing a probability distribution', sims: ['m2_binom', 'm4_normal'],
      notes: T`<ul><li><b>Binomial</b> $B(n,p)$: a fixed number of independent trials, two outcomes, constant $p$; $X$ = number of successes (discrete, $0$ to $n$).</li>
<li><b>Normal</b> $N(\mu,\sigma^2)$: a continuous variable, roughly symmetric and bell-shaped around the mean, with few extreme values (heights, masses, measurement errors).</li>
<li>Not appropriate when: data are skewed or bounded (a normal model would give impossible negative values), trials are dependent, $p$ varies, or the variable is discrete with few values. Check with a histogram or by comparing mean ± 2 SD with the data.</li></ul>`,
      drills: [
        () => { const L = [['the number of heads in 20 tosses of a coin', 'binomial'], ['the heights of adult women in a city', 'normal'], ['the number of faulty items in a sample of 50 from a large batch', 'binomial'], ['the time taken by adults to run 5 km', 'normal'], ['the number of correct answers when guessing on 10 multiple-choice questions', 'binomial'], ['the mass of bags of sugar filled by a machine', 'normal']];
          const [ctx, r] = pick(L), opts = ['binomial', 'normal']; return { q: T`Which distribution is the more appropriate model for ${ctx}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r === 'binomial' ? 'A count of successes in a fixed number of independent trials with constant probability: binomial.' : 'A continuous measurement, roughly symmetric about a mean: normal.'}` }; },
        () => { const L = [['the times between buses, which are often very short and occasionally very long', 'The data are strongly skewed, so a symmetric normal model is unsuitable'], ['the number of goals in a football match (mostly 0–4)', 'The variable is discrete with few values and not symmetric'], ['the masses of mice, where the mean is 20 g and SD 15 g', 'A normal model would give a large probability of negative masses'], ['exam marks from 0 to 100, mean 50, SD 12, roughly symmetric', 'It is a reasonable model, as the data are roughly symmetric and mean ± 3 SD lies within 0–100']];
          const [ctx, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`Comment on using a normal distribution to model ${ctx}.`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
        () => { const L = [['drawing 5 cards from a pack without replacement and counting hearts', 'not binomial: the trials are not independent'], ['counting how many of 12 independent seeds germinate, each with probability 0.7', 'binomial'], ['counting the number of throws until the first six', 'not binomial: the number of trials is not fixed'], ['the number of girls in 20 births, assuming each is a girl with probability 0.49', 'binomial']];
          const [ctx, r] = pick(L), opts = shuffle(['binomial', 'not binomial: the trials are not independent', 'not binomial: the number of trials is not fixed', 'not binomial: there are more than two outcomes']); return { q: T`Is a binomial model appropriate for ${ctx}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}.` }; },
      ],
    },
    {
      id: 'm4_lang', title: 'Hypothesis testing: language & principles', sims: ['m4_test'],
      notes: T`<ul><li><b>Null hypothesis</b> $H_0$: the default ("no change"), a statement about a population parameter with an equals sign, e.g. $H_0:p=0.3$. <b>Alternative</b> $H_1$: what you suspect: $p\gt0.3$ or $p\lt0.3$ (<b>1-tail</b>) or $p\ne0.3$ (<b>2-tail</b>).</li>
<li><b>Test statistic</b>: the sample value you calculate. <b>Significance level</b> $\alpha$: the probability of rejecting $H_0$ when it is true (wrongly).</li><li><b>Critical region</b>: values of the test statistic that lead to rejecting $H_0$; its boundary is the <b>critical value</b>; the rest is the <b>acceptance region</b>.</li>
<li><b>p-value</b>: the probability, if $H_0$ is true, of a result at least as extreme as the one observed. Reject $H_0$ if p-value $\lt\alpha$.</li><li>Conclude <b>in context</b>, without certainty: "there is sufficient evidence to suggest…".</li></ul>`,
      drills: [
        () => { const L = [['A coin is suspected of being biased towards heads', 'H_0:p=0.5,\\ H_1:p\\gt0.5'], ['A new drug is claimed to reduce the proportion of patients with side effects below 0.2', 'H_0:p=0.2,\\ H_1:p\\lt0.2'], ['A die is thought to be biased (in either direction) for sixes', 'H_0:p=\\tfrac16,\\ H_1:p\\ne\\tfrac16'], ['The mean mass of packets, normally 500 g, is thought to have increased', 'H_0:\\mu=500,\\ H_1:\\mu\\gt500']];
          const [ctx, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`${ctx}. State suitable hypotheses.`, mc: { options: opts.map(o => `$${o}$`), correct: opts.indexOf(r) }, sol: T`$${r}$. $H_0$ always has the equals sign; $H_1$ matches the suspicion (one direction → 1-tail; "changed" → 2-tail).` }; },
        () => { const L = [['the significance level', 'the probability of rejecting $H_0$ when it is in fact true'], ['the p-value', 'the probability, assuming $H_0$, of a result at least as extreme as the one observed'], ['the critical region', 'the set of values of the test statistic for which $H_0$ is rejected'], ['the acceptance region', 'the values of the test statistic for which $H_0$ is not rejected']];
          const [t, r] = pick(L), opts = shuffle(L.map(x => x[1])); return { q: T`What is meant by ${t}?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${t[0].toUpperCase() + t.slice(1)}: ${r}.` }; },
        () => { const a = pick([0.01, 0.05, 0.1]), pv = pick([0.003, 0.02, 0.04, 0.07, 0.12, 0.3]), rej = pv < a; const opts = ['Reject $H_0$: there is sufficient evidence for $H_1$', 'Do not reject $H_0$: there is insufficient evidence for $H_1$'];
          return { q: T`A test at the $${a * 100}\%$ level gives a p-value of $${pv}$. What do you conclude?`, mc: { options: opts, correct: rej ? 0 : 1 }, sol: T`$${pv}${rej ? '\\lt' : '\\gt'}${a}$, so ${rej ? 'reject' : 'do not reject'} $H_0$. Never claim $H_0$ is proved true — only that there isn't enough evidence against it.` }; },
      ],
    },
    {
      id: 'm4_btest', title: 'Hypothesis test for a binomial proportion', sims: ['m4_test'],
      notes: T`<ol><li>State $H_0:p=p_0$ and $H_1$ (one- or two-tailed), and the significance level.</li><li>Under $H_0$, $X\sim B(n,p_0)$.</li><li>Either find the <b>p-value</b> ($P(X\ge x)$ for an upper-tail test, $P(X\le x)$ for a lower-tail test) and compare with $\alpha$, or find the <b>critical region</b> and see if $x$ lies in it.</li><li>Conclude in context.</li></ol>
<ul><li>Critical region for an upper tail at level $\alpha$: the smallest $c$ with $P(X\ge c)\le\alpha$; its actual significance level is $P(X\ge c)$.</li><li>Two-tailed: put $\frac\alpha2$ in each tail.</li></ul>`,
      drills: [
        () => { const n = pick([10, 12, 15, 20, 25]), p0 = pick([0.2, 0.25, 0.3, 0.4, 0.5]), a = pick([0.05, 0.1]), up = Math.random() < 0.5; let c;
          if (up) { c = n; while (c > 0 && 1 - ST.binomCDF(n, p0, c - 2) <= a) c--; } else { c = 0; while (c < n && ST.binomCDF(n, p0, c + 1) <= a) c++; }
          const valid = up ? 1 - ST.binomCDF(n, p0, c - 1) <= a : ST.binomCDF(n, p0, c) <= a; if (!valid) return null; const act = up ? 1 - ST.binomCDF(n, p0, c - 1) : ST.binomCDF(n, p0, c);
          return { q: T`$X\sim B(${n},\ ${p0})$ under $H_0:p=${p0}$, tested against $H_1:p${up ? '\\gt' : '\\lt'}${p0}$ at the $${a * 100}\%$ level. Find the critical value $c$ (critical region $X${up ? '\\ge' : '\\le'} c$) and the actual significance level.`, fields: [{ label: 'c', ans: c }, { label: 'actual level', ans: act }],
            sol: T`${up ? `$P(X\\ge${c})=${sig4(act)}\\le${a}$ but $P(X\\ge${c - 1})=${sig4(1 - ST.binomCDF(n, p0, c - 2))}\\gt${a}$` : `$P(X\\le${c})=${sig4(act)}\\le${a}$ but $P(X\\le${c + 1})=${sig4(ST.binomCDF(n, p0, c + 1))}\\gt${a}$`}. Critical region $X${up ? '\\ge' : '\\le'}${c}$; actual significance level $${sig4(act)}$.` }; },
        () => { const n = pick([12, 15, 20, 25, 30]), p0 = pick([0.2, 0.3, 0.4, 0.5]), up = Math.random() < 0.5, mean = n * p0, x = up ? Math.min(n, Math.round(mean + ri(2, 6))) : Math.max(0, Math.round(mean - ri(2, 5)));
          const pv = up ? 1 - ST.binomCDF(n, p0, x - 1) : ST.binomCDF(n, p0, x), a = 0.05, rej = pv < a;
          return { q: T`In $${n}$ trials, $${x}$ successes are observed. Test $H_0:p=${p0}$ against $H_1:p${up ? '\\gt' : '\\lt'}${p0}$ at the 5% level. Find the p-value.`, fields: [{ label: 'p-value', ans: pv }],
            sol: T`Under $H_0$, $X\sim B(${n},${p0})$. p-value $=P(X${up ? '\\ge' : '\\le'}${x})=${sig4(pv)}$ ${rej ? '\\lt' : '\\gt'} $0.05$, so ${rej ? 'reject $H_0$: there is evidence that' : 'do not reject $H_0$: there is insufficient evidence that'} $p${up ? '\\gt' : '\\lt'}${p0}$.` }; },
        () => { const n = 20, p0 = pick([0.3, 0.4, 0.5]), a = 0.1; let lo = 0; while (ST.binomCDF(n, p0, lo + 1) <= a / 2) lo++; let hi = n; while (1 - ST.binomCDF(n, p0, hi - 2) <= a / 2) hi--; if (ST.binomCDF(n, p0, lo) > a / 2 || 1 - ST.binomCDF(n, p0, hi - 1) > a / 2) return null;
          return { q: T`A two-tailed test of $H_0:p=${p0}$ uses $n=20$ at the 10% level (5% in each tail). Find the critical region $X\le a$ or $X\ge b$.`, fields: [{ label: 'a', ans: lo }, { label: 'b', ans: hi }],
            sol: T`Lower: $P(X\le${lo})=${sig4(ST.binomCDF(n, p0, lo))}\le0.05$, $P(X\le${lo + 1})=${sig4(ST.binomCDF(n, p0, lo + 1))}\gt0.05$. Upper: $P(X\ge${hi})=${sig4(1 - ST.binomCDF(n, p0, hi - 1))}\le0.05$, $P(X\ge${hi - 1})=${sig4(1 - ST.binomCDF(n, p0, hi - 2))}\gt0.05$. Critical region $X\le${lo}$ or $X\ge${hi}$.` }; },
      ],
    },
    {
      id: 'm4_ntest', title: 'Hypothesis test for a normal mean', sims: ['m4_test'],
      notes: T`<ul><li>If $X\sim N(\mu,\sigma^2)$, the mean of a random sample of size $n$ has $\bar X\sim N\left(\mu,\frac{\sigma^2}n\right)$.</li>
<li>Test statistic (known, given or assumed $\sigma$): $$z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}.$$</li><li>Compare with the critical value: 5% one-tail $1.6449$; 5% two-tail $1.96$; 1% one-tail $2.3263$; 1% two-tail $2.5758$. Or find the p-value $P(\bar X\ge\bar x)$.</li>
<li>Conclude in context, e.g. "there is evidence at the 5% level that the mean mass has increased".</li></ul>`,
      drills: [
        () => { const mu = ri(50, 200), sd = pick([4, 5, 6, 8, 10, 12]), n = pick([16, 25, 36, 49, 64, 100]), up = Math.random() < 0.5, z0 = ri(50, 300) / 100 * (up ? 1 : -1), xb = +(mu + z0 * sd / Math.sqrt(n)).toFixed(2); const z = (xb - mu) / (sd / Math.sqrt(n));
          return { q: T`A sample of $${n}$ values from $N(\mu,\ ${sd}^2)$ has mean $${xb}$. For $H_0:\mu=${mu}$ against $H_1:\mu${up ? '\\gt' : '\\lt'}${mu}$, calculate the test statistic $z$.`, fields: [{ label: 'z', ans: z, tol: { abs: 0.006 } }],
            sol: T`$z=\dfrac{${xb}-${mu}}{${sd}/\sqrt{${n}}}=\dfrac{${num(xb - mu, 5)}}{${num(sd / Math.sqrt(n), 5)}}=${num(z, 4)}$. At 5% (one-tail) the critical value is ${up ? '$1.6449$' : '$-1.6449$'}: ${Math.abs(z) > 1.6449 && Math.sign(z) === (up ? 1 : -1) ? 'reject' : 'do not reject'} $H_0$.` }; },
        () => { const mu = ri(20, 80), sd = pick([2, 3, 4, 5]), n = pick([9, 16, 25, 36]), a = pick([0.05, 0.01]), two = Math.random() < 0.5, dir = pick([1, -1]); const z0 = dir * ri(60, 320) / 100, xb = +(mu + z0 * sd / Math.sqrt(n)).toFixed(2), z = (xb - mu) / (sd / Math.sqrt(n));
          const cv = two ? ST.zCrit(a / 2) : ST.zCrit(a); if (Math.abs(Math.abs(z) - cv) < 0.02) return null; const rej = two ? Math.abs(z) > cv : dir * z > cv; const opts = ['Reject $H_0$', 'Do not reject $H_0$'];
          return { q: T`$X\sim N(\mu,\ ${sd}^2)$. A sample of $${n}$ has mean $${xb}$. Test $H_0:\mu=${mu}$ against $H_1:\mu${two ? '\\ne' : dir > 0 ? '\\gt' : '\\lt'}${mu}$ at the $${a * 100}\%$ level.`, mc: { options: opts, correct: rej ? 0 : 1 },
            sol: T`$z=\frac{${xb}-${mu}}{${sd}/\sqrt{${n}}}=${num(z, 4)}$. Critical value ${two ? `$\\pm${num(cv, 5)}$ (two-tail)` : `$${dir > 0 ? '' : '-'}${num(cv, 5)}$ (one-tail)`}. ${rej ? 'The test statistic is in the critical region: reject $H_0$.' : 'Not in the critical region: do not reject $H_0$.'}` }; },
        () => { const mu = ri(100, 300), sd = pick([10, 12, 15, 20]), n = pick([25, 36, 50, 100]), a = 0.05; const c = mu + ST.zCrit(a) * sd / Math.sqrt(n);
          return { q: T`$H_0:\mu=${mu}$, $H_1:\mu\gt${mu}$, $\sigma=${sd}$, $n=${n}$, 5% level. Find the critical value of $\bar x$ (reject $H_0$ if $\bar x\gt c$).`, fields: [{ label: 'c', ans: c, tol: { abs: 0.01 } }], sol: T`$c=${mu}+1.6449\times\frac{${sd}}{\sqrt{${n}}}=${num(c, 6)}$.` }; },
      ],
    },
    {
      id: 'm4_ctest', title: 'Testing a correlation coefficient', sims: ['m2_scatter'],
      notes: T`<ul><li>Hypotheses about the population correlation $\rho$: $H_0:\rho=0$; $H_1:\rho\gt0$ or $\rho\lt0$ (one-tail) or $\rho\ne0$ (two-tail).</li>
<li>Compare the sample PMCC $r$ with the <b>critical value</b> from the table for the sample size $n$ and significance level (one-tailed values; halve the level for two-tailed tests). Or compare a given p-value with $\alpha$.</li>
<li>Reject $H_0$ if $|r|$ is larger than the critical value (in the direction of $H_1$). Conclude in context: "evidence of positive correlation between …".</li></ul>`,
      drills: [
        () => { const n = pick([8, 10, 12, 15, 20, 25, 30]), a = pick([0.05, 0.025, 0.01]), cv = ST.rCrit(a, n), r = +(cv + pick([-0.15, -0.08, 0.05, 0.12])).toFixed(3); const rej = r > cv; const opts = ['Reject $H_0$: evidence of positive correlation', 'Do not reject $H_0$: insufficient evidence of positive correlation'];
          return { q: T`For $${n}$ pairs, $r=${r}$. Test $H_0:\rho=0$ against $H_1:\rho\gt0$ at the $${a * 100}\%$ level (critical value $${cv.toFixed(4)}$).`, mc: { options: opts, correct: rej ? 0 : 1 }, sol: T`$r=${r}${rej ? '\\gt' : '\\lt'}${cv.toFixed(4)}$, so ${rej ? 'reject' : 'do not reject'} $H_0$.` }; },
        () => { const n = pick([10, 12, 15, 20]), a = pick([0.05, 0.1]); const cv = ST.rCrit(a / 2, n); return { q: T`A two-tailed test of $H_0:\rho=0$ at the $${a * 100}\%$ level uses a sample of $${n}$. Using the one-tailed table, which critical value do you need? (Enter it, 4 d.p.)`, fields: [{ label: 'critical value', ans: cv, tol: { abs: 6e-4 } }],
          sol: T`Two-tailed at $${a * 100}\%$ means $${a * 50}\%$ in each tail: use the $${a * 50}\%$ column for $n=${n}$: $${cv.toFixed(4)}$. Reject if $|r|\gt${cv.toFixed(4)}$.` }; },
        () => { const pv = pick([0.004, 0.018, 0.032, 0.061, 0.14]), a = pick([0.01, 0.05]), rej = pv < a; const opts = ['There is evidence of correlation', 'There is insufficient evidence of correlation']; return { q: T`Software gives a p-value of $${pv}$ for a test of $H_0:\rho=0$ against $H_1:\rho\ne0$. At the $${a * 100}\%$ level, what do you conclude?`, mc: { options: opts, correct: rej ? 0 : 1 },
          sol: T`$${pv}${rej ? '\\lt' : '\\gt'}${a}$: ${rej ? 'reject $H_0$ — evidence of correlation' : 'do not reject $H_0$ — insufficient evidence of correlation'}.` }; },
      ],
    },
  ],
});
