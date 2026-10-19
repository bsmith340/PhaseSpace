// CCEA GCE Mathematics AS 2 Applied Mathematics (Section A Mechanics, Section B Statistics): notes + drill generators.
'use strict';

const G = 9.8; // CCEA uses g = 9.8 m s⁻² unless a question says otherwise
const sf3 = x => num(x, 3);
const dg = x => x * Math.PI / 180, rd = x => x * 180 / Math.PI;
const sq = x => x * x;

topic({
  id: '_m2', title: 'AS2', points: [
    /* ======================= MECHANICS ======================= */
    {
      id: 'm2_units', title: 'SI units, quantities & modelling', sims: [],
      notes: T`<ul><li><b>Fundamental SI quantities</b>: length (metre, m), time (second, s), mass (kilogram, kg).</li>
<li><b>Derived</b>: velocity (m s⁻¹), acceleration (m s⁻²), force and weight (newton, N $=$ kg m s⁻²). $1\text{ km h}^{-1}=\frac{1000}{3600}\text{ m s}^{-1}=\frac1{3.6}$ m s⁻¹.</li>
<li><b>Scalars</b> have size only (distance, speed, mass, time). <b>Vectors</b> have size and direction (displacement, velocity, acceleration, force, weight).</li>
<li><b>Modelling words</b>: <i>particle</i> — size ignored, no rotation; <i>light</i> — mass ignored; <i>inextensible</i> — no stretch, so connected objects share the same speed and acceleration; <i>smooth</i> — no friction; <i>rough</i> — friction acts; <i>uniform</i> — mass evenly spread; <i>rigid rod</i> — doesn't bend.</li></ul>`,
      drills: [
        () => { const v = pick([18, 36, 45, 54, 72, 90, 108, 126]), rev = Math.random() < 0.4; if (rev) { const ms = v / 3.6; return { q: T`Convert $${num(ms)}\text{ m s}^{-1}$ into km h⁻¹.`, fields: [{ label: 'km/h', ans: v }], sol: T`Multiply by 3.6: $${num(ms)}\times3.6=${v}$ km h⁻¹ (since $1$ m s⁻¹ $=3600$ m per hour $=3.6$ km h⁻¹).` }; } return { q: T`A car travels at $${v}$ km h⁻¹. Write this speed in m s⁻¹.`, fields: [{ label: 'm/s', ans: v / 3.6 }], sol: T`$${v}\text{ km h}^{-1}=\dfrac{${v}\times1000}{3600}=${num(v / 3.6)}$ m s⁻¹.` }; },
        () => { const Q = [['displacement', 1], ['velocity', 1], ['acceleration', 1], ['force', 1], ['weight', 1], ['distance', 0], ['speed', 0], ['mass', 0], ['time', 0]]; const ask = Math.random() < 0.5 ? 1 : 0; const right = shuffle(Q.filter(x => x[1] === ask))[0], wrong = shuffle(Q.filter(x => x[1] !== ask)).slice(0, 3), opts = shuffle([right, ...wrong]);
          return { q: T`Which one of these is a <b>${ask ? 'vector' : 'scalar'}</b> quantity?`, mc: { options: opts.map(o => o[0]), correct: opts.indexOf(right) }, sol: T`Vectors (size <i>and</i> direction): displacement, velocity, acceleration, force, weight. Scalars (size only): distance, speed, mass, time. So the answer is <b>${right[0]}</b>.` }; },
        () => { const L = [['inextensible', 'the particles connected by the string move with the same speed and acceleration', ['the string has no mass', 'there is no friction on the string', 'the tension is zero']],
            ['light', 'its mass can be ignored, so the tension is the same throughout the string', ['it cannot stretch', 'it is smooth', 'it is very short']],
            ['smooth', 'there is no friction between the surfaces', ['the surface is horizontal', 'the object does not rotate', 'the object has no mass']],
            ['a particle', 'its size can be ignored: all its mass acts at a point and it does not rotate', ['it has no mass', 'it moves at constant speed', 'no forces act on it']],
            ['uniform', 'its mass is evenly distributed, so its weight acts at its centre', ['it moves at constant velocity', 'it is smooth', 'it is light']]];
          const [w, r, d] = pick(L), opts = shuffle([r, ...d]);
          return { q: T`In a mechanics model, an object is described as <b>${w}</b>. What does this mean?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`"${w[0].toUpperCase() + w.slice(1)}" means ${r}.` }; },
        () => { const m = pick([0.5, 1.2, 2, 2.5, 4, 5, 7.5, 12, 65, 80]), gv = pick([9.8, 9.8, 9.81, 10]); return { q: T`Find the weight of a mass of $${m}$ kg, taking $g=${gv}$ m s⁻².`, fields: [{ label: 'W (N)', ans: m * gv }], sol: T`$W=mg=${m}\times${gv}=${num(m * gv, 4)}$ N. Weight is a force (newtons); mass is in kilograms.` }; },
      ],
    },
    {
      id: 'm2_kgraph', title: 'Kinematics language & motion graphs', sims: ['m2_vt'],
      notes: T`<ul><li><b>Displacement</b> = position relative to the start (a vector, can be negative). <b>Distance travelled</b> = total path length (always $\ge 0$).</li>
<li><b>Velocity</b> = rate of change of displacement; <b>speed</b> = its magnitude. Average velocity $=\dfrac{\text{displacement}}{\text{time}}$; average speed $=\dfrac{\text{distance}}{\text{time}}$.</li>
<li><b>Displacement–time graph</b>: gradient = velocity.</li>
<li><b>Velocity–time graph</b>: gradient = acceleration; <b>area</b> between the graph and the time axis = displacement (area below the axis counts as negative displacement, but positive distance).</li></ul>`,
      drills: [
        () => { const V = pick([8, 10, 12, 15, 20, 24]), t1 = pick([4, 5, 6, 8, 10]), t2 = pick([10, 15, 20, 30]), t3 = pick([2, 4, 5, 6, 8]); const D = 0.5 * V * t1 + V * t2 + 0.5 * V * t3;
          return { q: T`A train starts from rest and accelerates uniformly to $${V}$ m s⁻¹ in $${t1}$ s. It travels at this speed for $${t2}$ s, then decelerates uniformly to rest in $${t3}$ s. Find (a) the acceleration in the first stage and (b) the total distance travelled.`, fields: [{ label: 'a (m s⁻²)', ans: V / t1 }, { label: 'distance (m)', ans: D }],
            sol: T`Sketch the $v$–$t$ graph: a trapezium. (a) Gradient $=\dfrac{${V}}{${t1}}=${num(V / t1)}$ m s⁻². (b) Area $=\tfrac12(${t1})(${V})+${t2}(${V})+\tfrac12(${t3})(${V})=${num(D)}$ m.` }; },
        () => { const t1 = pick([5, 8, 10]), t2 = pick([20, 30, 40]), t3 = pick([5, 10, 15]), V = pick([6, 9, 12, 14, 18]); const D = V * (t2 + (t1 + t3) / 2);
          return { q: T`A cyclist accelerates uniformly from rest for $${t1}$ s, rides at a constant speed $V$ m s⁻¹ for $${t2}$ s, then slows uniformly to rest in $${t3}$ s. The total distance is $${num(D)}$ m. Find $V$.`, fields: [{ label: 'V', ans: V }],
            sol: T`Area of the trapezium: $\tfrac12V(${t1})+${t2}V+\tfrac12V(${t3})=V\left(${t2}+\tfrac{${t1 + t3}}{2}\right)=${num(t2 + (t1 + t3) / 2)}V$. So $${num(t2 + (t1 + t3) / 2)}V=${num(D)}\Rightarrow V=${V}$ m s⁻¹.` }; },
        () => { const a = ri(6, 20), b = ri(2, 15), t = pick([4, 5, 8, 10]);
          return { q: T`A particle moves $${a}$ m due east and then $${b}$ m due west along a straight line, taking $${t}$ s in total. Find (a) its final displacement from the start (east positive), (b) the distance travelled, (c) its average speed.`, fields: [{ label: 'displacement (m)', ans: a - b }, { label: 'distance (m)', ans: a + b }, { label: 'average speed', ans: (a + b) / t }],
            sol: T`(a) $${a}-${b}=${a - b}$ m. (b) $${a}+${b}=${a + b}$ m. (c) Average speed $=\dfrac{\text{distance}}{\text{time}}=\dfrac{${a + b}}{${t}}=${num((a + b) / t)}$ m s⁻¹. (Average <i>velocity</i> would be $\frac{${a - b}}{${t}}$.)` }; },
        () => { const t1 = ri(1, 3), t2 = t1 + ri(2, 6), s1 = ri(-5, 10), v = rnz(-6, 6), s2 = s1 + v * (t2 - t1);
          return { q: T`The displacement–time graph of a particle is a straight line through $(${t1},\ ${s1})$ and $(${t2},\ ${s2})$ ($t$ in s, $s$ in m). Find its velocity.`, fields: [{ label: 'v (m s⁻¹)', ans: v }], sol: T`Velocity = gradient $=\dfrac{${s2}-(${s1})}{${t2}-${t1}}=\dfrac{${s2 - s1}}{${t2 - t1}}=${v}$ m s⁻¹.${v < 0 ? ' Negative: it is moving back towards the origin.' : ''}` }; },
      ],
    },
    {
      id: 'm2_suvat', title: 'Constant acceleration in a straight line', sims: ['m2_vt'],
      notes: T`For constant acceleration $a$, initial velocity $u$, final velocity $v$, displacement $s$, time $t$:
$$v=u+at,\qquad s=\frac{(u+v)}{2}t,\qquad s=ut+\tfrac12at^2,\qquad s=vt-\tfrac12at^2,\qquad v^2=u^2+2as.$$
<ul><li>List the five letters, fill in the three you know, pick the formula without the one you don't want.</li><li>Choose a positive direction and stick to it: a deceleration is a negative $a$.</li><li>These are <b>not in the formula booklet</b> — learn them.</li></ul>`,
      drills: [
        () => { const u = ri(0, 15), a = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]), t = ri(3, 12); return { q: T`A car moving at $${u}$ m s⁻¹ accelerates uniformly at $${a}$ m s⁻² for $${t}$ s. Find (a) its final speed, (b) the distance travelled.`, fields: [{ label: 'v', ans: u + a * t }, { label: 's (m)', ans: u * t + 0.5 * a * t * t }],
          sol: T`$v=u+at=${u}+${a}(${t})=${num(u + a * t)}$ m s⁻¹. $s=ut+\tfrac12at^2=${u}(${t})+\tfrac12(${a})(${t * t})=${num(u * t + 0.5 * a * t * t)}$ m.` }; },
        () => { const u = ri(2, 10), v = u + ri(3, 15), s = ri(20, 120); const a = (v * v - u * u) / (2 * s), t = 2 * s / (u + v);
          return { q: T`A particle accelerates uniformly from $${u}$ m s⁻¹ to $${v}$ m s⁻¹ over a distance of $${s}$ m. Find its acceleration and the time taken.`, fields: [{ label: 'a', ans: a }, { label: 't', ans: t }], sol: T`$v^2=u^2+2as\Rightarrow ${v * v}=${u * u}+${2 * s}a\Rightarrow a=${sf3(a)}$ m s⁻². $s=\tfrac{(u+v)}2t\Rightarrow t=\dfrac{2(${s})}{${u + v}}=${sf3(t)}$ s.` }; },
        () => { const u = pick([12, 15, 18, 20, 24, 25, 30]), s = pick([30, 40, 45, 50, 60, 75]); const a = u * u / (2 * s), t = 2 * s / u;
          return { q: T`A car travelling at $${u}$ m s⁻¹ brakes uniformly and stops in $${s}$ m. Find (a) the deceleration, (b) the time it takes to stop.`, fields: [{ label: 'deceleration', ans: a }, { label: 't', ans: t }], sol: T`$v=0$: $0=${u * u}+2a(${s})\Rightarrow a=-${sf3(a)}$, a deceleration of $${sf3(a)}$ m s⁻². $s=\tfrac{(u+v)}2t\Rightarrow ${s}=\tfrac{${u}}{2}t\Rightarrow t=${sf3(t)}$ s.` }; },
        () => { const a = pick([1, 1.5, 2, 2.5, 3]), V = pick([10, 12, 15, 18, 20]), t = 2 * V / a;
          return { q: T`Car A is at rest when car B passes it at a constant $${V}$ m s⁻¹. At that instant A sets off in the same direction with constant acceleration $${a}$ m s⁻². How long until A draws level with B, and how far have they travelled?`, fields: [{ label: 't (s)', ans: t }, { label: 'distance (m)', ans: V * t }],
            sol: T`Same displacement: $\tfrac12(${a})t^2=${V}t\Rightarrow t\left(\tfrac{${a}}{2}t-${V}\right)=0\Rightarrow t=${num(t)}$ s (not $t=0$). Distance $=${V}\times${num(t)}=${num(V * t)}$ m.` }; },
      ],
    },
    {
      id: 'm2_vec2', title: 'Constant acceleration in two dimensions (vectors)', sims: [],
      notes: T`With vectors in $\mathbf i,\mathbf j$ form the same formulae hold:
$$\mathbf v=\mathbf u+\mathbf at,\qquad \mathbf r=\mathbf r_0+\mathbf ut+\tfrac12\mathbf at^2.$$
<ul><li>Work with the $\mathbf i$ and $\mathbf j$ components separately.</li><li>Speed $=|\mathbf v|=\sqrt{v_x^2+v_y^2}$; direction from $\tan\theta=\frac{v_y}{v_x}$.</li><li>"Moving parallel to $\mathbf i$" means the $\mathbf j$-component of velocity is zero; "due north-east" means the components are equal and positive.</li></ul>`,
      drills: [
        () => { const u = [ri(-4, 6), ri(-4, 6)], a = [rnz(-3, 3), rnz(-3, 3)], r0 = [ri(-5, 5), ri(-5, 5)], t = ri(2, 6); const r = [0, 1].map(k => r0[k] + u[k] * t + 0.5 * a[k] * t * t);
          return { q: T`A particle starts at the point with position vector $(${r0[0]}\mathbf i${sgn(r0[1])}\mathbf j)$ m with velocity $(${u[0]}\mathbf i${sgn(u[1])}\mathbf j)$ m s⁻¹ and constant acceleration $(${a[0]}\mathbf i${sgn(a[1])}\mathbf j)$ m s⁻². Find its position vector after $${t}$ s (enter the $\mathbf i$ and $\mathbf j$ components).`, fields: [{ label: 'r (i, j)', vec: r }],
            sol: T`$\mathbf r=\mathbf r_0+\mathbf ut+\tfrac12\mathbf at^2$: $\mathbf i$: $${r0[0]}+${par(u[0])}(${t})+\tfrac12(${a[0]})(${t * t})=${num(r[0])}$; $\mathbf j$: $${r0[1]}+${par(u[1])}(${t})+\tfrac12(${a[1]})(${t * t})=${num(r[1])}$. So $\mathbf r=(${num(r[0])}\mathbf i${sgn(r[1])}\mathbf j)$ m.` }; },
        () => { const u = [ri(-6, 6), ri(-6, 6)], a = [rnz(-3, 3), rnz(-3, 3)], t = ri(2, 5), v = [u[0] + a[0] * t, u[1] + a[1] * t];
          return { q: T`A particle has initial velocity $(${u[0]}\mathbf i${sgn(u[1])}\mathbf j)$ m s⁻¹ and constant acceleration $(${a[0]}\mathbf i${sgn(a[1])}\mathbf j)$ m s⁻². Find its speed after $${t}$ s.`, fields: [{ label: 'speed', ans: Math.hypot(...v) }],
            sol: T`$\mathbf v=\mathbf u+\mathbf at=(${v[0]}\mathbf i${sgn(v[1])}\mathbf j)$. Speed $=\sqrt{${v[0]}^2+${par(v[1])}^2}=\sqrt{${v[0] ** 2 + v[1] ** 2}}=${sf3(Math.hypot(...v))}$ m s⁻¹.` }; },
        () => { let a, u, t; do { t = ri(2, 8); a = rnz(-3, 3); u = -a * t; } while (u === 0); const ux = ri(-5, 5), ax = ri(-2, 2);
          return { q: T`A particle moves with velocity $\mathbf v=\big((${ux}${sgn(ax)}t)\mathbf i+(${u}${sgn(a)}t)\mathbf j\big)$ m s⁻¹, where the acceleration $(${ax}\mathbf i${sgn(a)}\mathbf j)$ m s⁻² is constant. At what time is it moving parallel to $\mathbf i$?`, fields: [{ label: 't (s)', ans: t }],
            sol: T`Parallel to $\mathbf i$ means the $\mathbf j$-component is zero: $${u}${sgn(a)}t=0\Rightarrow t=${t}$ s.` }; },
      ],
    },
    {
      id: 'm2_force', title: "Forces, Newton's first law & resolving", sims: ['m2_forces'],
      notes: T`<ul><li><b>Newton's first law</b>: a body stays at rest or moves with constant velocity unless a resultant force acts. Constant velocity ⇔ resultant force zero.</li>
<li><b>Resolving</b> a force $F$ at angle $\theta$ to the horizontal: horizontal component $F\cos\theta$, vertical component $F\sin\theta$.</li>
<li><b>Resultant</b>: add the components; magnitude $R=\sqrt{X^2+Y^2}$, direction $\tan\alpha=\dfrac YX$ (draw a sketch to get the quadrant right).</li>
<li>Two perpendicular forces $P$ and $Q$: $R=\sqrt{P^2+Q^2}$. Two forces at angle $\theta$: $R^2=P^2+Q^2+2PQ\cos\theta$.</li></ul>`,
      drills: [
        () => { const F = pick([10, 12, 15, 20, 25, 30, 40, 50]), th = pick([20, 25, 30, 35, 40, 45, 50, 60]); return { q: T`A force of $${F}$ N acts at $${th}^\circ$ above the horizontal. Find its horizontal and vertical components.`, fields: [{ label: 'horizontal (N)', ans: F * Math.cos(dg(th)) }, { label: 'vertical (N)', ans: F * Math.sin(dg(th)) }],
          sol: T`Horizontal: $${F}\cos${th}^\circ=${sf3(F * Math.cos(dg(th)))}$ N. Vertical: $${F}\sin${th}^\circ=${sf3(F * Math.sin(dg(th)))}$ N.` }; },
        () => { const P = ri(3, 15), Q = ri(3, 15), R = Math.hypot(P, Q), al = rd(Math.atan2(Q, P)); return { q: T`Two forces of $${P}$ N and $${Q}$ N act on a particle at right angles to each other. Find the magnitude of the resultant and the angle it makes with the $${P}$ N force.`, fields: [{ label: 'R (N)', ans: R }, { label: 'angle (°)', ans: al }],
          sol: T`$R=\sqrt{${P}^2+${Q}^2}=\sqrt{${P * P + Q * Q}}=${sf3(R)}$ N. $\tan\alpha=\dfrac{${Q}}{${P}}\Rightarrow\alpha=${sf3(al)}^\circ$.` }; },
        () => { const F = [[ri(-8, 10), ri(-8, 10)], [ri(-8, 10), ri(-8, 10)], [ri(-8, 10), ri(-8, 10)]], X = F.reduce((s, f) => s + f[0], 0), Y = F.reduce((s, f) => s + f[1], 0); if (!X && !Y) return null;
          return { q: T`Three forces $${F.map(f => `(${f[0]}\\mathbf i${sgn(f[1])}\\mathbf j)`).join(',\\ ')}$ N act on a particle. Find the magnitude of the resultant force.`, fields: [{ label: '|R| (N)', ans: Math.hypot(X, Y) }],
            sol: T`Add components: $\mathbf R=(${X}\mathbf i${sgn(Y)}\mathbf j)$ N. $|\mathbf R|=\sqrt{${X * X}+${Y * Y}}=${sf3(Math.hypot(X, Y))}$ N.` }; },
        () => { const L = [['moving in a straight line at constant speed', 'The resultant force on it is zero', ['It must be at rest', 'A constant resultant force acts in the direction of motion', 'Its acceleration is $9.8$ m s⁻²']],
            ['at rest on a horizontal table', 'The forces on it balance: the normal reaction equals its weight', ['No forces act on it', 'Its weight is zero', 'The reaction is greater than the weight']],
            ['in a lift moving upwards at constant speed', 'The tension in the cable equals the total weight', ['The tension is greater than the weight', 'The tension is less than the weight', 'The tension is zero']]];
          const [w, r, d] = pick(L), opts = shuffle([r, ...d]); return { q: T`A body is ${w}. Which statement is correct?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`Newton's first law: constant velocity (including rest) ⇔ zero resultant force. ${r}.` }; },
      ],
    },
    {
      id: 'm2_n2', title: "Newton's second law (including 2D vectors)", sims: [],
      notes: T`$$\mathbf F=m\mathbf a\qquad\text{(resultant force = mass}\times\text{acceleration)}$$
<ul><li>Resultant force <b>in the direction of the acceleration</b>: forces that way minus forces against.</li><li>With vectors: $\mathbf a=\dfrac{\mathbf F}{m}$ component by component; $|\mathbf a|=\dfrac{|\mathbf F|}{m}$.</li><li>Combine with suvat: N2 gives $a$, suvat gives the motion — or the other way round.</li>
<li>Lifts: a person of mass $m$ in a lift accelerating upward at $a$ feels $R=m(g+a)$; accelerating downward, $R=m(g-a)$.</li></ul>`,
      drills: [
        () => { const m = pick([800, 900, 1000, 1200, 1500, 2000]), D = pick([1500, 2000, 2400, 3000, 3600]), Rr = pick([300, 400, 500, 600, 800]); return { q: T`A car of mass $${m}$ kg has a driving force of $${D}$ N and experiences a resistance of $${Rr}$ N. Find its acceleration.`, fields: [{ label: 'a (m s⁻²)', ans: (D - Rr) / m }],
          sol: T`N2 forwards: $${D}-${Rr}=${m}a\Rightarrow a=\dfrac{${D - Rr}}{${m}}=${sf3((D - Rr) / m)}$ m s⁻².` }; },
        () => { const m = pick([2, 4, 5, 0.5, 2.5]), F = [rnz(-12, 12), rnz(-12, 12)], a = F.map(x => x / m); return { q: T`A force $(${F[0]}\mathbf i${sgn(F[1])}\mathbf j)$ N is the only force acting on a particle of mass $${m}$ kg. Find the acceleration vector and its magnitude.`, fields: [{ label: 'a (i, j)', vec: a }, { label: '|a|', ans: Math.hypot(...a) }],
          sol: T`$\mathbf a=\dfrac{\mathbf F}{m}=(${num(a[0])}\mathbf i${sgn(+num(a[1]))}\mathbf j)$ m s⁻². $|\mathbf a|=\sqrt{${num(a[0])}^2+${par(num(a[1]))}^2}=${sf3(Math.hypot(...a))}$ m s⁻².` }; },
        () => { const m = pick([900, 1100, 1200, 1400]), u = pick([15, 18, 20, 24, 25]), s = pick([40, 50, 60, 75]); const a = u * u / (2 * s); return { q: T`A car of mass $${m}$ kg travelling at $${u}$ m s⁻¹ brakes with a constant force and stops in $${s}$ m. Find the braking force.`, fields: [{ label: 'F (N)', ans: m * a }],
          sol: T`$v^2=u^2+2as$: $0=${u * u}+${2 * s}a\Rightarrow a=-${sf3(a)}$ m s⁻². N2: $F=ma=${m}\times${sf3(a)}=${sf3(m * a)}$ N.` }; },
        () => { const m = pick([50, 60, 65, 70, 75, 80]), a = pick([0.5, 1, 1.2, 1.5, 2]), up = Math.random() < 0.5; const R = m * (G + (up ? a : -a));
          return { q: T`A person of mass $${m}$ kg stands in a lift that is accelerating ${up ? 'upwards' : 'downwards'} at $${a}$ m s⁻². Find the normal reaction of the floor on the person.`, fields: [{ label: 'R (N)', ans: R }],
            sol: T`N2 ${up ? 'upwards' : 'downwards'}: ${up ? T`$R-${m}g=${m}(${a})\Rightarrow R=${m}(9.8+${a})` : T`$${m}g-R=${m}(${a})\Rightarrow R=${m}(9.8-${a})`}=${num(R, 4)}$ N.` }; },
      ],
    },
    {
      id: 'm2_grav', title: 'Weight & motion under gravity', sims: ['m2_vt'],
      notes: T`<ul><li>Near the Earth's surface every falling body (no air resistance) has acceleration $g$ downwards. CCEA uses $g=9.8$ m s⁻²; questions may ask for $g=9.81$ or $g=10$ — use the value given and match your accuracy to it (2 or 3 s.f. with $9.8$).</li>
<li><b>Weight</b> $W=mg$ (newtons) acts vertically down.</li>
<li>Vertical motion is suvat with $a=-g$ (taking up as positive). At the highest point $v=0$. Time up = time down for a return to the same level.</li>
<li>Max height $h=\dfrac{u^2}{2g}$, time of flight back to the start $\dfrac{2u}{g}$.</li></ul>`,
      drills: [
        () => { const u = pick([7, 9.8, 14, 19.6, 21, 24.5, 28]); return { q: T`A ball is thrown vertically upwards at $${u}$ m s⁻¹. Find (a) the greatest height reached, (b) the time taken to return to the point of projection.`, fields: [{ label: 'height (m)', ans: u * u / (2 * G) }, { label: 'time (s)', ans: 2 * u / G }],
          sol: T`(a) At the top $v=0$: $0=${u}^2-2(9.8)h\Rightarrow h=\dfrac{${num(u * u)}}{19.6}=${sf3(u * u / (2 * G))}$ m. (b) $s=0$: $0=${u}t-4.9t^2\Rightarrow t=\dfrac{${u}}{4.9}=${sf3(2 * u / G)}$ s.` }; },
        () => { const h = pick([5, 10, 19.6, 20, 30, 44.1, 50]); return { q: T`A stone is dropped from rest from a height of $${h}$ m. Find the time it takes to reach the ground and its speed on impact.`, fields: [{ label: 't (s)', ans: Math.sqrt(2 * h / G) }, { label: 'speed', ans: Math.sqrt(2 * G * h) }],
          sol: T`Down positive, $u=0$, $a=9.8$: $${h}=4.9t^2\Rightarrow t=${sf3(Math.sqrt(2 * h / G))}$ s. $v^2=2(9.8)(${h})\Rightarrow v=${sf3(Math.sqrt(2 * G * h))}$ m s⁻¹.` }; },
        () => { const u = pick([4, 5, 6, 8, 10, 12]), h = pick([10, 15, 20, 25, 30]); const t = (u + Math.sqrt(u * u + 2 * G * h)) / G;
          return { q: T`A ball is thrown vertically upwards at $${u}$ m s⁻¹ from a point $${h}$ m above the ground. Find the time until it hits the ground.`, fields: [{ label: 't (s)', ans: t }],
            sol: T`Up positive, $s=-${h}$: $-${h}=${u}t-4.9t^2\Rightarrow4.9t^2-${u}t-${h}=0$. $t=\dfrac{${u}+\sqrt{${u * u}+4(4.9)(${h})}}{9.8}=${sf3(t)}$ s (reject the negative root).` }; },
        () => { const gv = pick([9.81, 10]), u = pick([12, 15, 20, 25]), t = pick([1, 2, 3]); const v = u - gv * t, s = u * t - 0.5 * gv * t * t;
          return { q: T`Taking $g=${gv}$ m s⁻², a particle is projected vertically upwards at $${u}$ m s⁻¹. Find its velocity (upwards positive) and its height after $${t}$ s.`, fields: [{ label: 'v', ans: v }, { label: 'height', ans: s }],
            sol: T`$v=u-gt=${u}-${gv}(${t})=${num(v, 4)}$ m s⁻¹. $s=ut-\tfrac12gt^2=${u * t}-${num(0.5 * gv * t * t, 4)}=${num(s, 4)}$ m.` }; },
      ],
    },
    {
      id: 'm2_conn', title: "Newton's third law & connected particles", sims: ['m2_pulley'],
      notes: T`<ul><li><b>Newton's third law</b>: if A exerts a force on B, B exerts an equal and opposite force on A.</li>
<li><b>Connected particles</b> (towbar, light inextensible string): the bodies share one acceleration. Write N2 for <b>each body separately</b> (the tension/thrust appears in both, in opposite directions), or for the whole system (internal forces cancel) to get $a$ quickly.</li>
<li>Smooth light pulley: the tension is the same on both sides.</li>
<li>Two masses over a pulley ($m_1\gt m_2$): $a=\dfrac{(m_1-m_2)g}{m_1+m_2}$, $T=\dfrac{2m_1m_2g}{m_1+m_2}$. Smooth table with $m_2$ hanging: $a=\dfrac{m_2g}{m_1+m_2}$, $T=\dfrac{m_1m_2g}{m_1+m_2}$.</li></ul>`,
      drills: [
        () => { const mc = pick([900, 1000, 1200, 1500]), mt = pick([300, 400, 500, 600]), D = pick([2000, 2500, 3000, 3500]), rc = pick([200, 300, 400]), rt = pick([100, 150, 200]); const a = (D - rc - rt) / (mc + mt), Tn = mt * a + rt;
          return { q: T`A car of mass $${mc}$ kg tows a trailer of mass $${mt}$ kg with a light horizontal towbar. The driving force is $${D}$ N; resistances are $${rc}$ N on the car and $${rt}$ N on the trailer. Find the acceleration and the tension in the towbar.`, fields: [{ label: 'a', ans: a }, { label: 'T (N)', ans: Tn }],
            sol: T`Whole system: $${D}-${rc}-${rt}=${mc + mt}a\Rightarrow a=${sf3(a)}$ m s⁻². Trailer: $T-${rt}=${mt}a\Rightarrow T=${sf3(Tn)}$ N.` }; },
        () => { const m1 = pick([3, 4, 5, 6, 7, 8]), m2 = pick([1, 2, 3, 4, 5]); if (m1 <= m2) return null; const a = (m1 - m2) * G / (m1 + m2), Tn = 2 * m1 * m2 * G / (m1 + m2);
          return { q: T`Particles of mass $${m1}$ kg and $${m2}$ kg hang on either side of a smooth fixed pulley, connected by a light inextensible string, and are released from rest. Find the acceleration and the tension.`, fields: [{ label: 'a', ans: a }, { label: 'T (N)', ans: Tn }],
            sol: T`$${m1}$ kg (down): $${m1}g-T=${m1}a$. $${m2}$ kg (up): $T-${m2}g=${m2}a$. Add: $${m1 - m2}g=${m1 + m2}a\Rightarrow a=${sf3(a)}$ m s⁻². Then $T=${m2}(9.8+${sf3(a)})=${sf3(Tn)}$ N.` }; },
        () => { const m1 = pick([2, 3, 4, 5, 6]), m2 = pick([1, 2, 3, 4]); const a = m2 * G / (m1 + m2), Tn = m1 * m2 * G / (m1 + m2);
          return { q: T`A block of mass $${m1}$ kg on a smooth horizontal table is connected by a light inextensible string over a smooth pulley at the edge to a particle of mass $${m2}$ kg hanging freely. Find the acceleration and the tension.`, fields: [{ label: 'a', ans: a }, { label: 'T (N)', ans: Tn }],
            sol: T`Block: $T=${m1}a$. Hanging particle: $${m2}g-T=${m2}a$. Add: $${m2}g=${m1 + m2}a\Rightarrow a=${sf3(a)}$ m s⁻²; $T=${m1}a=${sf3(Tn)}$ N.` }; },
        () => { const M = pick([400, 500, 600, 800]), m = pick([60, 70, 80]), a = pick([0.5, 1, 1.5]); const Tn = (M + m) * (G + a), R = m * (G + a);
          return { q: T`A lift of mass $${M}$ kg carries a passenger of mass $${m}$ kg and accelerates upwards at $${a}$ m s⁻². Find the tension in the lift cable and the force the passenger exerts on the floor.`, fields: [{ label: 'T (N)', ans: Tn }, { label: 'R (N)', ans: R }],
            sol: T`Whole: $T-${M + m}g=${M + m}(${a})\Rightarrow T=${num(Tn, 4)}$ N. Passenger: $R-${m}g=${m}(${a})\Rightarrow R=${num(R, 4)}$ N; by Newton's third law the passenger pushes down on the floor with $${num(R, 4)}$ N.` }; },
      ],
    },
    {
      id: 'm2_equil', title: 'Equilibrium of a particle', sims: ['m2_forces'],
      notes: T`<ul><li>In equilibrium the resultant force is zero: resolve in two perpendicular directions and set each total to zero.</li>
<li>Choose directions to kill unknowns — on a slope, resolve parallel and perpendicular to the slope.</li>
<li>Three forces in equilibrium form a closed triangle; with vectors, $\mathbf F_1+\mathbf F_2+\mathbf F_3=\mathbf 0$.</li>
<li>Particle held on a smooth plane of angle $\theta$ by a horizontal force $P$: $P=W\tan\theta$, $R=\dfrac{W}{\cos\theta}$.</li></ul>`,
      drills: [
        () => { const W = pick([20, 30, 40, 49, 50, 60, 98]), al = pick([30, 40, 45, 50, 60]), be = pick([30, 40, 45, 50, 60]); const det = Math.sin(dg(al + be)); const T1 = W * Math.cos(dg(be)) / det, T2 = W * Math.cos(dg(al)) / det;
          return { q: T`A particle of weight $${W}$ N hangs in equilibrium from two light strings. One string makes $${al}^\circ$ with the horizontal (on the left), the other $${be}^\circ$ with the horizontal (on the right). Find the tensions $T_1$ (left) and $T_2$ (right).`, fields: [{ label: 'T₁ (N)', ans: T1 }, { label: 'T₂ (N)', ans: T2 }],
            sol: T`Horizontal: $T_1\cos${al}^\circ=T_2\cos${be}^\circ$. Vertical: $T_1\sin${al}^\circ+T_2\sin${be}^\circ=${W}$. Solving: $T_1=\dfrac{${W}\cos${be}^\circ}{\sin${al + be}^\circ}=${sf3(T1)}$ N, $T_2=\dfrac{${W}\cos${al}^\circ}{\sin${al + be}^\circ}=${sf3(T2)}$ N.` }; },
        () => { const F1 = [ri(-9, 9), ri(-9, 9)], F2 = [ri(-9, 9), ri(-9, 9)], F3 = [-F1[0] - F2[0], -F1[1] - F2[1]];
          return { q: T`A particle is in equilibrium under forces $(${F1[0]}\mathbf i${sgn(F1[1])}\mathbf j)$ N, $(${F2[0]}\mathbf i${sgn(F2[1])}\mathbf j)$ N and $\mathbf F_3$. Find $\mathbf F_3$ (components) and its magnitude.`, fields: [{ label: 'F₃ (i, j)', vec: F3 }, { label: '|F₃|', ans: Math.hypot(...F3) }],
            sol: T`$\mathbf F_3=-(\mathbf F_1+\mathbf F_2)=(${F3[0]}\mathbf i${sgn(F3[1])}\mathbf j)$ N, $|\mathbf F_3|=\sqrt{${F3[0] ** 2 + F3[1] ** 2}}=${sf3(Math.hypot(...F3))}$ N.` }; },
        () => { const m = pick([2, 3, 4, 5, 8, 10]), th = pick([20, 25, 30, 35, 40]); const W = m * G, P = W * Math.tan(dg(th)), R = W / Math.cos(dg(th));
          return { q: T`A particle of mass $${m}$ kg is held at rest on a smooth plane inclined at $${th}^\circ$ to the horizontal by a horizontal force $P$. Find $P$ and the normal reaction $R$.`, fields: [{ label: 'P (N)', ans: P }, { label: 'R (N)', ans: R }],
            sol: T`Along the plane: $P\cos${th}^\circ=${m}g\sin${th}^\circ\Rightarrow P=${m}(9.8)\tan${th}^\circ=${sf3(P)}$ N. Vertically: $R\cos${th}^\circ=${m}g\Rightarrow R=${sf3(R)}$ N.` }; },
      ],
    },
    {
      id: 'm2_fric', title: 'Friction: F ≤ μR and rough surfaces', sims: ['m2_incline'],
      notes: T`<ul><li>Friction opposes (possible) motion along the surface, and $F\le\mu R$ where $R$ is the normal reaction and $\mu$ the <b>coefficient of friction</b>.</li>
<li>While sliding, friction is at its maximum: $F=\mu R$.</li>
<li>Always find $R$ first (resolve perpendicular to the surface) — it changes if a pulling force has a component perpendicular to the surface.</li>
<li>On a slope of angle $\theta$: $R=mg\cos\theta$ (no other perpendicular forces). Sliding down: $a=g(\sin\theta-\mu\cos\theta)$; projected up: deceleration $g(\sin\theta+\mu\cos\theta)$.</li></ul>`,
      drills: [
        () => { const m = pick([2, 4, 5, 8, 10, 12]), mu = pick([0.1, 0.2, 0.25, 0.3, 0.4]), P = Math.ceil(mu * m * G) + ri(4, 20); const a = (P - mu * m * G) / m;
          return { q: T`A box of mass $${m}$ kg is pulled across rough horizontal ground by a horizontal force of $${P}$ N. The coefficient of friction is $${mu}$. Find the acceleration.`, fields: [{ label: 'a', ans: a }], sol: T`$R=${m}g=${num(m * G)}$ N, $F=\mu R=${num(mu * m * G)}$ N. N2: $${P}-${num(mu * m * G)}=${m}a\Rightarrow a=${sf3(a)}$ m s⁻².` }; },
        () => { const th = pick([25, 30, 35, 40, 45]), mu = pick([0.1, 0.15, 0.2, 0.25, 0.3]); const a = G * (Math.sin(dg(th)) - mu * Math.cos(dg(th))); if (a <= 0) return null;
          return { q: T`A particle slides down a rough plane inclined at $${th}^\circ$ to the horizontal. The coefficient of friction is $${mu}$. Find its acceleration.`, fields: [{ label: 'a', ans: a }], sol: T`$R=mg\cos${th}^\circ$, so $F=${mu}mg\cos${th}^\circ$. Down the plane: $mg\sin${th}^\circ-${mu}mg\cos${th}^\circ=ma\Rightarrow a=9.8(\sin${th}^\circ-${mu}\cos${th}^\circ)=${sf3(a)}$ m s⁻². (The mass cancels.)` }; },
        () => { const th = pick([15, 20, 25, 30]), mu = pick([0.2, 0.25, 0.3, 0.4]), u = pick([4, 5, 6, 8, 10]); const d = G * (Math.sin(dg(th)) + mu * Math.cos(dg(th))), s = u * u / (2 * d);
          return { q: T`A block is projected up a rough plane inclined at $${th}^\circ$ with speed $${u}$ m s⁻¹. The coefficient of friction is $${mu}$. Find the distance it travels up the plane before coming to rest.`, fields: [{ label: 'distance (m)', ans: s }],
            sol: T`Moving up: weight component and friction both act down the slope. Deceleration $=9.8(\sin${th}^\circ+${mu}\cos${th}^\circ)=${sf3(d)}$ m s⁻². $0=${u * u}-2(${sf3(d)})s\Rightarrow s=${sf3(s)}$ m.` }; },
        () => { const m = pick([5, 8, 10, 12, 15]), P = pick([30, 40, 50, 60, 80]), al = pick([15, 20, 25, 30, 40]), mu = pick([0.2, 0.25, 0.3]); const R = m * G - P * Math.sin(dg(al)), a = (P * Math.cos(dg(al)) - mu * R) / m; if (R <= 0 || a <= 0) return null;
          return { q: T`A sledge of mass $${m}$ kg is pulled along rough horizontal ground by a rope at $${al}^\circ$ above the horizontal with tension $${P}$ N. The coefficient of friction is $${mu}$. Find the normal reaction and the acceleration.`, fields: [{ label: 'R (N)', ans: R }, { label: 'a', ans: a }],
            sol: T`Vertical: $R+${P}\sin${al}^\circ=${m}g\Rightarrow R=${sf3(R)}$ N. $F=${mu}R=${sf3(mu * R)}$ N. Horizontal: $${P}\cos${al}^\circ-${sf3(mu * R)}=${m}a\Rightarrow a=${sf3(a)}$ m s⁻².` }; },
      ],
    },
    {
      id: 'm2_lim', title: 'Limiting friction & statics', sims: ['m2_incline'],
      notes: T`<ul><li><b>Limiting equilibrium</b> ("on the point of moving/slipping"): equilibrium <i>and</i> $F=\mu R$.</li>
<li>Not limiting: $F\lt\mu R$ — find $F$ from the equilibrium equations, not from $\mu R$.</li>
<li>On the point of slipping down a plane under its weight alone: $\mu=\tan\theta$.</li>
<li>Force $P$ parallel to a rough slope: minimum to stop it sliding down $P=mg(\sin\theta-\mu\cos\theta)$; to make it about to move up $P=mg(\sin\theta+\mu\cos\theta)$ — friction always opposes the way it would move.</li></ul>`,
      drills: [
        () => { const th = pick([10, 15, 20, 25, 30, 35]); return { q: T`A block rests on a rough plane whose angle is slowly increased. It is on the point of slipping when the angle is $${th}^\circ$. Find the coefficient of friction.`, fields: [{ label: 'μ', ans: Math.tan(dg(th)) }],
          sol: T`Limiting: $mg\sin${th}^\circ=\mu mg\cos${th}^\circ\Rightarrow\mu=\tan${th}^\circ=${sf3(Math.tan(dg(th)))}$.` }; },
        () => { const m = pick([3, 4, 5, 6, 8, 10]), th = pick([30, 35, 40, 45]), mu = pick([0.2, 0.25, 0.3, 0.4]), up = Math.random() < 0.5; const P = m * G * (Math.sin(dg(th)) + (up ? 1 : -1) * mu * Math.cos(dg(th)));
          return { q: T`A block of mass $${m}$ kg is on a rough plane inclined at $${th}^\circ$ ($\mu=${mu}$). Find the force $P$, acting up the plane parallel to a line of greatest slope, that ${up ? 'makes the block just about to move up the plane' : 'just prevents the block from sliding down'}.`, fields: [{ label: 'P (N)', ans: P }],
            sol: T`$R=${m}g\cos${th}^\circ=${sf3(m * G * Math.cos(dg(th)))}$ N, $F=\mu R=${sf3(mu * m * G * Math.cos(dg(th)))}$ N acting ${up ? 'down' : 'up'} the plane (it opposes the motion that is about to happen). Along the plane: $P=${m}g\sin${th}^\circ${up ? '+' : '-'}F=${sf3(P)}$ N.` }; },
        () => { const m = pick([5, 8, 10, 12, 20]), al = pick([20, 25, 30, 35]), mu = pick([0.3, 0.4, 0.5]); const P = mu * m * G / (Math.cos(dg(al)) + mu * Math.sin(dg(al)));
          return { q: T`A crate of mass $${m}$ kg on rough horizontal ground ($\mu=${mu}$) is pulled by a rope at $${al}^\circ$ above the horizontal. Find the tension that puts the crate on the point of moving.`, fields: [{ label: 'P (N)', ans: P }],
            sol: T`$R=${m}g-P\sin${al}^\circ$. Limiting: $P\cos${al}^\circ=${mu}(${m}g-P\sin${al}^\circ)\Rightarrow P(\cos${al}^\circ+${mu}\sin${al}^\circ)=${num(mu * m * G)}\Rightarrow P=${sf3(P)}$ N.` }; },
        () => { const m = pick([4, 5, 6, 10]), th = pick([15, 20, 25]), mu = pick([0.5, 0.6, 0.7]); const need = m * G * Math.sin(dg(th)), max = mu * m * G * Math.cos(dg(th));
          return { q: T`A box of mass $${m}$ kg rests on a rough plane inclined at $${th}^\circ$ with $\mu=${mu}$. Find the friction force acting on it (it is in equilibrium).`, fields: [{ label: 'F (N)', ans: need }],
            sol: T`Equilibrium along the plane: $F=${m}g\sin${th}^\circ=${sf3(need)}$ N. Check: $\mu R=${sf3(max)}$ N $\ge F$, so it does not slip — friction is <b>not</b> limiting, and $F\ne\mu R$ here.` }; },
      ],
    },
    /* ======================= STATISTICS ======================= */
    {
      id: 'm2_samp', title: 'Populations, samples & sampling techniques', sims: [],
      notes: T`<ul><li><b>Population</b>: everything of interest. <b>Sample</b>: the part you actually observe. A <b>census</b> observes the whole population.</li>
<li><b>Simple random sampling</b>: every sample of size $n$ is equally likely (number the population, use random numbers).</li>
<li><b>Stratified sampling</b>: split into groups (strata) and sample each in proportion to its size: number from a stratum $=\dfrac{\text{stratum size}}{\text{population}}\times n$.</li>
<li>Samples are used to make <b>informal inferences</b> about the population; different samples can give different conclusions. Look for <b>bias</b> (some members more likely to be chosen).</li></ul>`,
      drills: [
        () => { const sz = [ri(40, 300), ri(40, 300), ri(40, 300)], N = sz[0] + sz[1] + sz[2], n = pick([20, 30, 40, 50, 60]); const k = sz.map(x => Math.round(x / N * n)); if (k[0] + k[1] + k[2] !== n) return null; const names = pick([['Year 12', 'Year 13', 'staff'], ['under 30', '30–50', 'over 50'], ['morning', 'afternoon', 'evening']]);
          return { q: T`A population has three groups: ${names[0]} ($${sz[0]}$), ${names[1]} ($${sz[1]}$) and ${names[2]} ($${sz[2]}$). A stratified sample of size $${n}$ is taken. How many from each group?`, fields: k.map((x, i) => ({ label: names[i], ans: x })),
            sol: T`Total $${N}$. ${names.map((nm, i) => `${nm}: $\\frac{${sz[i]}}{${N}}\\times${n}=${num(sz[i] / N * n)}\\approx${k[i]}$`).join('; ')}.` }; },
        () => { const L = [['asks the first 50 people leaving a gym how often they exercise, to estimate how often adults in the town exercise', 'It is biased: gym users exercise more than typical adults'],
            ['surveys every tenth name on the electoral register of a town about local transport', 'It is a reasonable sample of adults on the register, but excludes people not registered'],
            ['estimates the mean height of pupils in a school using only the school basketball team', 'It is biased: basketball players are likely to be taller than average'],
            ['puts an online poll on a gaming website to estimate the proportion of teenagers who own a console', 'It is biased: visitors to a gaming site are more likely to own a console']];
          const [ctx, r] = pick(L), d = shuffle(L.filter(x => x[1] !== r).map(x => x[1])).slice(0, 2).concat(['It is a simple random sample, so it is unbiased']), opts = shuffle([r, ...d]);
          return { q: T`A researcher ${ctx}. Which is the best criticism of the sampling?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}. Always ask: is every member of the population equally likely to be picked, and is the sampled group typical of the population?` }; },
        () => { const L = [['every possible sample of the chosen size is equally likely to be selected', 'simple random sampling'], ['the population is divided into groups and each group is sampled in proportion to its size', 'stratified sampling'], ['every member of the population is observed', 'a census']];
          const [d, r] = pick(L), opts = shuffle(['simple random sampling', 'stratified sampling', 'a census', 'opportunity sampling']);
          return { q: T`Which method is described: "${d}"?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`That is <b>${r}</b>.` }; },
      ],
    },
    {
      id: 'm2_diag', title: 'Histograms, box plots & diagrams', sims: ['m2_hist'],
      notes: T`<ul><li><b>Histogram</b>: area represents frequency. Frequency density $=\dfrac{\text{frequency}}{\text{class width}}$, so frequency $=$ fd $\times$ width.</li>
<li>To estimate how many lie in part of a class, assume values are spread evenly through the class.</li>
<li><b>Box plot</b>: min, $Q_1$, median, $Q_3$, max (outliers plotted separately). Range $=\max-\min$; IQR $=Q_3-Q_1$.</li>
<li><b>Skew</b>: $Q_3-Q_2\gt Q_2-Q_1$ positive (long right tail); $Q_3-Q_2\lt Q_2-Q_1$ negative.</li>
<li>Compare distributions using a measure of location <i>and</i> a measure of spread, in context. Choose diagrams that suit the data: histograms for grouped continuous data, box plots for comparing, stem-and-leaf to keep raw values.</li></ul>`,
      drills: [
        () => { const w = pick([5, 10, 20, 2, 4]), f = ri(6, 60), lo = w * ri(1, 6); return { q: T`In a histogram, the class $${lo}\le x\lt${lo + w}$ has frequency $${f}$. Find its frequency density.`, fields: [{ label: 'fd', ans: f / w }], sol: T`fd $=\dfrac{\text{frequency}}{\text{class width}}=\dfrac{${f}}{${w}}=${num(f / w)}$.` }; },
        () => { const lo = pick([10, 20, 30, 40]), w = pick([10, 20]), fd = pick([1.5, 2, 2.4, 3, 3.6, 4]), cut = lo + w * pick([0.25, 0.5, 0.75]); const f = fd * (cut - lo);
          return { q: T`A histogram has a bar for $${lo}\le t\lt${lo + w}$ with frequency density $${fd}$. Estimate how many values lie between $${lo}$ and $${cut}$.`, fields: [{ label: 'number', ans: f }],
            sol: T`Assume values are evenly spread within the class: frequency $=$ fd $\times$ width $=${fd}\times(${cut}-${lo})=${num(f)}$.` }; },
        () => { const q1 = ri(20, 40), m = q1 + ri(3, 12), q3 = m + ri(3, 12), mn = q1 - ri(5, 15), mx = q3 + ri(5, 20); const sk = (q3 - m) > (m - q1) ? 'positive' : (q3 - m) < (m - q1) ? 'negative' : 'none';
          const opts = ['positive skew', 'negative skew', 'symmetrical'], correct = sk === 'positive' ? 0 : sk === 'negative' ? 1 : 2;
          return { q: T`A box plot has minimum $${mn}$, lower quartile $${q1}$, median $${m}$, upper quartile $${q3}$ and maximum $${mx}$. Describe the skew of the distribution.`, mc: { options: opts, correct }, sol: T`$Q_3-Q_2=${q3 - m}$ and $Q_2-Q_1=${m - q1}$. ${sk === 'positive' ? 'The upper half of the box is wider: positive skew.' : sk === 'negative' ? 'The lower half of the box is wider: negative skew.' : 'They are equal: symmetrical (about the median).'} IQR $=${q3 - q1}$, range $=${mx - mn}$.` }; },
        () => { const q1 = ri(30, 50), q3 = q1 + ri(8, 30), mn = q1 - ri(4, 15), mx = q3 + ri(4, 25); return { q: T`From a box plot: min $${mn}$, $Q_1=${q1}$, $Q_3=${q3}$, max $${mx}$. Find the range and the interquartile range.`, fields: [{ label: 'range', ans: mx - mn }, { label: 'IQR', ans: q3 - q1 }],
          sol: T`Range $=${mx}-${mn}=${mx - mn}$. IQR $=${q3}-${q1}=${q3 - q1}$ (the spread of the middle 50%, unaffected by extreme values).` }; },
      ],
    },
    {
      id: 'm2_spread', title: 'Measures of location & spread; variance & SD', sims: [],
      notes: T`<ul><li>Mean $\bar x=\dfrac{\sum x}{n}$ (or $\dfrac{\sum fx}{\sum f}$). Median = middle value. Mode = most common.</li>
<li><b>Variance</b> of a population (or a data set): $\sigma^2=\dfrac{\sum(x-\bar x)^2}{n}=\dfrac{\sum x^2}{n}-\bar x^2$. <b>Standard deviation</b> $=\sqrt{\text{variance}}$.</li>
<li>Sample variance (estimating a population from a sample) uses $n-1$: $s^2=\dfrac{\sum(x-\bar x)^2}{n-1}=\dfrac{\sum x^2-n\bar x^2}{n-1}$. Read the question for which is wanted.</li>
<li>Coding $y=ax+b$: mean $\bar y=a\bar x+b$, SD $\sigma_y=|a|\sigma_x$ (adding a constant does not change the spread).</li>
<li>Your calculator's statistics mode gives these directly — but you must show the method when summary statistics are given.</li></ul>`,
      drills: [
        () => { const n = pick([10, 12, 15, 20, 25, 40, 50]), m = ri(10, 60) + pick([0, 0.5, 0.2]), sd = pick([2, 3, 4, 5, 6, 2.5]); const Sx = +(n * m).toFixed(2), Sx2 = +(n * (sd * sd + m * m)).toFixed(2);
          return { q: T`For a data set, $n=${n}$, $\sum x=${Sx}$ and $\sum x^2=${Sx2}$. Find the mean and the standard deviation (divisor $n$).`, fields: [{ label: 'mean', ans: Sx / n }, { label: 'SD', ans: Math.sqrt(Sx2 / n - (Sx / n) ** 2) }],
            sol: T`$\bar x=\dfrac{${Sx}}{${n}}=${num(Sx / n)}$. $\sigma^2=\dfrac{${Sx2}}{${n}}-${num(Sx / n)}^2=${sf3(Sx2 / n - (Sx / n) ** 2)}$, so $\sigma=${sf3(Math.sqrt(Sx2 / n - (Sx / n) ** 2))}$.` }; },
        () => { const xs = Array.from({ length: pick([5, 6, 7]) }, () => ri(2, 30)), m = ST.mean(xs), v = ST.varP(xs), s2 = ST.varS(xs), useS = Math.random() < 0.4;
          return { q: T`Find the mean and the ${useS ? 'sample variance $s^2$ (divisor $n-1$)' : 'standard deviation (divisor $n$)'} of: $${xs.join(',\\ ')}$.`, fields: [{ label: 'mean', ans: m }, { label: useS ? 's²' : 'SD', ans: useS ? s2 : Math.sqrt(v) }],
            sol: T`$\sum x=${ST.sum(xs)}$, $\sum x^2=${ST.sum(xs.map(x => x * x))}$, $n=${xs.length}$. Mean $=${sf3(m)}$. $\sum(x-\bar x)^2=${sf3(ST.Sxx(xs))}$. ${useS ? T`$s^2=\dfrac{${sf3(ST.Sxx(xs))}}{${xs.length - 1}}=${sf3(s2)}$.` : T`$\sigma^2=\dfrac{${sf3(ST.Sxx(xs))}}{${xs.length}}=${sf3(v)}$, $\sigma=${sf3(Math.sqrt(v))}$.`}` }; },
        () => { const xs = [0, 1, 2, 3, 4], fs = xs.map(() => ri(1, 15)), N = ST.sum(fs), m = ST.sum(xs.map((x, i) => x * fs[i])) / N, v = ST.sum(xs.map((x, i) => fs[i] * x * x)) / N - m * m;
          return { q: T`The number of goals scored in $${N}$ matches: $0$ goals ($${fs[0]}$ times), $1$ ($${fs[1]}$), $2$ ($${fs[2]}$), $3$ ($${fs[3]}$), $4$ ($${fs[4]}$). Find the mean and standard deviation.`, fields: [{ label: 'mean', ans: m }, { label: 'SD', ans: Math.sqrt(v) }],
            sol: T`$\sum f=${N}$, $\sum fx=${ST.sum(xs.map((x, i) => x * fs[i]))}$, $\sum fx^2=${ST.sum(xs.map((x, i) => fs[i] * x * x))}$. Mean $=${sf3(m)}$; $\sigma^2=\dfrac{\sum fx^2}{\sum f}-\bar x^2=${sf3(v)}$, $\sigma=${sf3(Math.sqrt(v))}$.` }; },
        () => { const a = pick([2, 3, 5, 10, 0.5, 1.8]), b = ri(-20, 40), m = ri(10, 50), s = pick([2, 3, 4, 5, 8]); return { q: T`A data set has mean $${m}$ and standard deviation $${s}$. Each value $x$ is converted to $y=${a}x${sgn(b)}$. Find the mean and standard deviation of $y$.`, fields: [{ label: 'mean of y', ans: a * m + b }, { label: 'SD of y', ans: a * s }],
          sol: T`$\bar y=${a}(${m})${sgn(b)}=${num(a * m + b)}$. Adding $${b}$ shifts every value but doesn't change the spread, so $\sigma_y=${a}\times${s}=${num(a * s)}$.` }; },
      ],
    },
    {
      id: 'm2_outl', title: 'Outliers & cleaning data', sims: [],
      notes: T`<ul><li>An <b>outlier</b> is a value inconsistent with the rest. Common rules: more than $1.5\times$IQR below $Q_1$ or above $Q_3$; or more than $2$ (or $3$) standard deviations from the mean. A question will tell you which rule to use.</li>
<li>Outliers can be genuine (a real extreme value — keep it) or errors (a recording mistake — correct or remove it).</li>
<li><b>Cleaning data</b>: remove or correct impossible values, deal with missing data (exclude the item, and say so), check units are consistent, and note any value you removed.</li>
<li>The mean and SD are affected by outliers; the median and IQR are not.</li></ul>`,
      drills: [
        () => { const q1 = ri(20, 40), q3 = q1 + ri(6, 20), iqr = q3 - q1, lo = q1 - 1.5 * iqr, hi = q3 + 1.5 * iqr, test = pick([hi + ri(1, 8), hi - ri(1, 5), lo - ri(1, 5), lo + ri(1, 4)]);
          const out = test > hi || test < lo, opts = ['Yes, it is an outlier', 'No, it is not an outlier'];
          return { q: T`A data set has $Q_1=${q1}$ and $Q_3=${q3}$. Using the rule "more than $1.5\times$IQR beyond the quartiles", is the value $${num(test)}$ an outlier?`, mc: { options: opts, correct: out ? 0 : 1 },
            sol: T`IQR $=${iqr}$, $1.5\times$IQR $=${num(1.5 * iqr)}$. Fences: $${q1}-${num(1.5 * iqr)}=${num(lo)}$ and $${q3}+${num(1.5 * iqr)}=${num(hi)}$. $${num(test)}$ is ${out ? 'outside' : 'inside'} the fences, so it is ${out ? '' : 'not '}an outlier.` }; },
        () => { const m = ri(20, 80), s = pick([3, 4, 5, 6, 8, 10]), k = pick([2, 3]); return { q: T`Outliers are defined as values more than $${k}$ standard deviations from the mean. The mean is $${m}$ and the standard deviation is $${s}$. Find the lower and upper limits.`, fields: [{ label: 'lower', ans: m - k * s }, { label: 'upper', ans: m + k * s }],
          sol: T`$${m}\pm${k}(${s})$: lower $${m - k * s}$, upper $${m + k * s}$. Values outside this interval are outliers.` }; },
        () => { const L = [['a pupil\'s height recorded as $17.2$ m', 'It is an error (probably 1.72 m): correct it if the true value is clear, otherwise remove it'],
            ['a missing value for one day\'s rainfall', 'Exclude that day from the calculations and state that you have done so'],
            ['a daily maximum temperature of $38^\\circ$C in a set of UK summer data', 'It may be genuine: check it, and keep it unless it is shown to be an error']];
          const [ctx, r] = pick(L), opts = shuffle([r, 'Replace it with zero', 'Replace it with the mean and do not mention it', 'Delete the whole data set']);
          return { q: T`While cleaning data you find ${ctx}. What should you do?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}. Never silently change data — record every correction or removal.` }; },
      ],
    },
    {
      id: 'm2_corr', title: 'Scatter diagrams, correlation & the PMCC', sims: ['m2_scatter'],
      notes: T`<ul><li>Scatter diagrams show <b>bivariate</b> data. Describe correlation: positive/negative, strong/weak, or none.</li>
<li><b>Product-moment correlation coefficient</b> $r=\dfrac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$, $-1\le r\le1$, where $S_{xx}=\sum x^2-\dfrac{(\sum x)^2}{n}$, $S_{yy}=\sum y^2-\dfrac{(\sum y)^2}{n}$, $S_{xy}=\sum xy-\dfrac{\sum x\sum y}{n}$ (in the formula booklet).</li>
<li>$r$ measures <b>linear</b> association only. Near $\pm1$: strong; near 0: little linear correlation.</li>
<li><b>Correlation does not imply causation</b> — a third factor may drive both.</li><li>Watch for <b>distinct sections</b> of the population (e.g. two clusters for two age groups): a single $r$ can mislead.</li></ul>`,
      drills: [
        () => { const n = ri(8, 15), Sxx = ri(40, 400), Syy = ri(40, 400), r0 = (Math.random() * 1.8 - 0.9), Sxy = +(r0 * Math.sqrt(Sxx * Syy)).toFixed(1); const r = Sxy / Math.sqrt(Sxx * Syy);
          return { q: T`For $${n}$ pairs of data, $S_{xx}=${Sxx}$, $S_{yy}=${Syy}$ and $S_{xy}=${Sxy}$. Calculate the product-moment correlation coefficient.`, fields: [{ label: 'r', ans: r, tol: { abs: 0.0015 } }],
            sol: T`$r=\dfrac{${Sxy}}{\sqrt{${Sxx}\times${Syy}}}=${num(r, 4)}$ — ${Math.abs(r) > 0.7 ? 'strong' : Math.abs(r) > 0.4 ? 'moderate' : 'weak'} ${r > 0 ? 'positive' : 'negative'} correlation.` }; },
        () => { const x = Array.from({ length: 5 }, () => ri(1, 12)), b = rnz(-3, 3), y = x.map(v => b * v + ri(-4, 4) + 10); if (ST.Sxx(x) === 0 || ST.Sxx(y) === 0) return null; const r = ST.pmcc(x, y);
          return { q: T`Calculate the PMCC for the data: ${x.map((v, i) => `$(${v},\\,${y[i]})$`).join(', ')}.`, fields: [{ label: 'r', ans: r, tol: { abs: 0.002 } }],
            sol: T`$\sum x=${ST.sum(x)}$, $\sum y=${ST.sum(y)}$, $\sum x^2=${ST.sum(x.map(v => v * v))}$, $\sum y^2=${ST.sum(y.map(v => v * v))}$, $\sum xy=${ST.sum(x.map((v, i) => v * y[i]))}$. $S_{xx}=${sf3(ST.Sxx(x))}$, $S_{yy}=${sf3(ST.Sxx(y))}$, $S_{xy}=${sf3(ST.Sxy(x, y))}$. $r=${num(r, 4)}$. (Your calculator's regression mode gives this directly.)` }; },
        () => { const L = [['Towns with more ice-cream sales have more drownings ($r=0.85$)', 'Both increase in hot weather; ice cream does not cause drowning'],
            ['Pupils who spend longer on homework get higher marks ($r=0.62$)', 'There is moderate positive correlation, but other factors may explain the marks'],
            ['Cities with more doctors have more deaths ($r=0.9$)', 'Bigger cities have more of both; population size is a confounding factor']];
          const [ctx, r] = pick(L), opts = shuffle([r, 'The correlation proves that one variable causes the other', 'Since $r\\lt1$ there is no relationship', 'The correlation is negative']);
          return { q: T`${ctx}. Which conclusion is justified?`, mc: { options: opts, correct: opts.indexOf(r) }, sol: T`${r}. Correlation does not imply causation.` }; },
        () => { const r = pick([-0.95, -0.72, -0.31, -0.05, 0.08, 0.35, 0.68, 0.97]); const d = Math.abs(r) > 0.85 ? 'strong' : Math.abs(r) > 0.5 ? 'moderate' : Math.abs(r) > 0.2 ? 'weak' : 'little or no'; const right = d === 'little or no' ? 'little or no linear correlation' : `${d} ${r > 0 ? 'positive' : 'negative'} linear correlation`;
          const opts = shuffle([right, ...shuffle(['strong positive linear correlation', 'strong negative linear correlation', 'weak positive linear correlation', 'weak negative linear correlation', 'little or no linear correlation', 'moderate positive linear correlation', 'moderate negative linear correlation'].filter(x => x !== right)).slice(0, 3)]);
          return { q: T`Interpret a PMCC of $r=${r}$.`, mc: { options: opts, correct: opts.indexOf(right) }, sol: T`$r=${r}$: ${right}. Always interpret in context, and remember $r$ only measures how close the points are to a straight line.` }; },
      ],
    },
    {
      id: 'm2_prob', title: 'Probability: Venn diagrams, two-way tables & the laws', sims: [],
      notes: T`<ul><li><b>Addition law</b>: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.</li>
<li><b>Mutually exclusive</b>: can't both happen, $P(A\cap B)=0$, so $P(A\cup B)=P(A)+P(B)$.</li><li><b>Exhaustive</b>: between them they cover every outcome, $P(A\cup B)=1$.</li>
<li><b>Independent</b>: one doesn't affect the other; multiplication law $P(A\cap B)=P(A)\times P(B)$. Use this to <i>test</i> independence.</li>
<li>$P(A')=1-P(A)$. Fill Venn diagrams from the middle outwards; two-way tables give probabilities as (cell)/(total).</li></ul>`,
      drills: [
        () => { const a = ri(20, 60) / 100, b = ri(20, 60) / 100, ab = ri(5, Math.min(a, b) * 100 - 2) / 100; return { q: T`$P(A)=${a}$, $P(B)=${b}$ and $P(A\cap B)=${ab}$. Find $P(A\cup B)$ and $P(A'\cap B')$.`, fields: [{ label: 'P(A ∪ B)', ans: a + b - ab }, { label: "P(A' ∩ B')", ans: 1 - (a + b - ab) }],
          sol: T`$P(A\cup B)=${a}+${b}-${ab}=${num(a + b - ab)}$. Neither: $1-${num(a + b - ab)}=${num(1 - a - b + ab)}$.` }; },
        () => { const a = pick([0.2, 0.3, 0.4, 0.5, 0.6]), b = pick([0.25, 0.3, 0.5, 0.6, 0.7, 0.8]), ind = Math.random() < 0.5, ab = ind ? +(a * b).toFixed(4) : +(a * b + pick([-0.05, 0.05, 0.08])).toFixed(4); if (ab <= 0) return null;
          const opts = ['Yes — they are independent', 'No — they are not independent']; return { q: T`$P(A)=${a}$, $P(B)=${b}$ and $P(A\cap B)=${ab}$. Are $A$ and $B$ independent?`, mc: { options: opts, correct: ind ? 0 : 1 },
            sol: T`$P(A)P(B)=${a}\times${b}=${num(a * b)}$, ${ind ? 'which equals' : 'which is not equal to'} $P(A\cap B)=${ab}$, so they are ${ind ? '' : 'not '}independent.` }; },
        () => { const t = [[ri(5, 40), ri(5, 40)], [ri(5, 40), ri(5, 40)]], N = t[0][0] + t[0][1] + t[1][0] + t[1][1], rows = ['Year 12', 'Year 13'], cols = ['walk', 'bus'];
          return { q: T`<table class="tbl"><tr><th></th><th>${cols[0]}</th><th>${cols[1]}</th></tr>${t.map((r, i) => `<tr><td>${rows[i]}</td><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>A student is chosen at random. Find (a) $P(\text{Year 12 and walks})$, (b) $P(\text{takes the bus})$, (c) $P(\text{Year 13 or walks})$.`,
            fields: [{ label: '(a)', ans: t[0][0] / N }, { label: '(b)', ans: (t[0][1] + t[1][1]) / N }, { label: '(c)', ans: (t[1][0] + t[1][1] + t[0][0]) / N }],
            sol: T`Total $${N}$. (a) $\frac{${t[0][0]}}{${N}}$. (b) $\frac{${t[0][1]}+${t[1][1]}}{${N}}=\frac{${t[0][1] + t[1][1]}}{${N}}$. (c) Year 13 ($${t[1][0] + t[1][1]}$) plus Year 12 walkers ($${t[0][0]}$): $\frac{${t[1][0] + t[1][1] + t[0][0]}}{${N}}$.` }; },
        () => { const a = pick([0.15, 0.2, 0.25, 0.3, 0.35]), u = pick([0.5, 0.6, 0.65, 0.7]); return { q: T`$A$ and $B$ are independent, $P(A)=${a}$ and $P(A\cup B)=${u}$. Find $P(B)$.`, fields: [{ label: 'P(B)', ans: (u - a) / (1 - a) }],
          sol: T`$${u}=${a}+P(B)-${a}P(B)\Rightarrow ${num(u - a)}=${num(1 - a)}P(B)\Rightarrow P(B)=${sf3((u - a) / (1 - a))}$.` }; },
      ],
    },
    {
      id: 'm2_tree', title: 'Tree diagrams & combined events', sims: [],
      notes: T`<ul><li>A <b>tree diagram</b> shows successive events. Multiply along branches; add the results of different paths.</li>
<li><b>Without replacement</b>: the second-stage probabilities change ($\frac{r-1}{n-1}$ after removing one red from $n$).</li>
<li>"At least one" is usually quickest as $1-P(\text{none})$.</li>
<li>For three independent events $A,B,C$: $P(\text{all three})=P(A)P(B)P(C)$ and $P(\text{at least one})=1-P(A')P(B')P(C')$.</li></ul>`,
      drills: [
        () => { const r = ri(3, 8), b = ri(3, 8), n = r + b; const same = (r * (r - 1) + b * (b - 1)) / (n * (n - 1)), atl = 1 - b * (b - 1) / (n * (n - 1));
          return { q: T`A bag has $${r}$ red and $${b}$ blue counters. Two are taken at random without replacement. Find (a) $P(\text{same colour})$, (b) $P(\text{at least one red})$.`, fields: [{ label: '(a)', ans: same }, { label: '(b)', ans: atl }],
            sol: T`(a) $\frac{${r}}{${n}}\cdot\frac{${r - 1}}{${n - 1}}+\frac{${b}}{${n}}\cdot\frac{${b - 1}}{${n - 1}}=\frac{${r * (r - 1) + b * (b - 1)}}{${n * (n - 1)}}=${fr(r * (r - 1) + b * (b - 1), n * (n - 1))}$. (b) $1-\frac{${b}}{${n}}\cdot\frac{${b - 1}}{${n - 1}}=${fr(n * (n - 1) - b * (b - 1), n * (n - 1))}$.` }; },
        () => { const p = pick([0.6, 0.7, 0.75, 0.8]), q1 = pick([0.1, 0.15, 0.2, 0.05]), q2 = pick([0.3, 0.4, 0.5, 0.25]); const P = p * q1 + (1 - p) * q2;
          return { q: T`On a dry day the probability a bus is late is $${q1}$; on a wet day it is $${q2}$. The probability a day is dry is $${p}$. Find the probability the bus is late on a randomly chosen day.`, fields: [{ label: 'P(late)', ans: P }],
            sol: T`$P(L)=P(D)P(L|D)+P(W)P(L|W)=${p}(${q1})+${num(1 - p)}(${q2})=${num(P)}$.` }; },
        () => { const ps = [pick([0.2, 0.3, 0.4, 0.5]), pick([0.25, 0.4, 0.6]), pick([0.1, 0.3, 0.5, 0.7])], all = ps[0] * ps[1] * ps[2], atl = 1 - (1 - ps[0]) * (1 - ps[1]) * (1 - ps[2]);
          return { q: T`Three independent events have probabilities $${ps.join(',\\ ')}$. Find the probability that (a) all three happen, (b) at least one happens.`, fields: [{ label: '(a)', ans: all }, { label: '(b)', ans: atl }],
            sol: T`(a) $${ps.join('\\times')}=${num(all)}$. (b) $1-P(\text{none})=1-${ps.map(p => num(1 - p)).join('\\times')}=${num(atl)}$.` }; },
      ],
    },
    {
      id: 'm2_bin', title: 'The binomial distribution', sims: ['m2_binom'],
      notes: T`$X\sim B(n,p)$ when there are <b>$n$ fixed, independent trials</b>, each with <b>two outcomes</b> (success/failure) and <b>constant probability $p$</b> of success; $X$ counts the successes.
$$P(X=r)=\binom nr p^r(1-p)^{n-r},\qquad r=0,1,\dots,n.$$
<ul><li>The terms are the terms of the binomial expansion of $\big((1-p)+p\big)^n$ — each term counts the tree-diagram paths with $r$ successes.</li>
<li>Cumulative: $P(X\le r)$ from tables or the calculator; $P(X\ge r)=1-P(X\le r-1)$; $P(a\le X\le b)=P(X\le b)-P(X\le a-1)$.</li></ul>`,
      drills: [
        () => { const n = ri(5, 15), p = pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6]), r = ri(0, Math.min(n, 6)); return { q: T`$X\sim B(${n},\ ${p})$. Find $P(X=${r})$.`, fields: [{ label: 'P', ans: ST.binomPMF(n, p, r) }],
          sol: T`$P(X=${r})=\binom{${n}}{${r}}(${p})^{${r}}(${num(1 - p)})^{${n - r}}=${ST.choose(n, r)}\times${num(p ** r, 4)}\times${num((1 - p) ** (n - r), 4)}=${num(ST.binomPMF(n, p, r), 4)}$.` }; },
        () => { const n = pick([8, 10, 12, 15, 20, 25]), p = pick([0.1, 0.2, 0.3, 0.35, 0.4, 0.45]), r = ri(1, Math.min(n - 1, Math.round(n * p) + 3)), type = pick(['le', 'ge', 'lt']);
          const v = type === 'le' ? ST.binomCDF(n, p, r) : type === 'ge' ? 1 - ST.binomCDF(n, p, r - 1) : ST.binomCDF(n, p, r - 1), sym = type === 'le' ? '\\le' : type === 'ge' ? '\\ge' : '\\lt';
          return { q: T`$X\sim B(${n},\ ${p})$. Find $P(X${sym}${r})$.`, fields: [{ label: 'P', ans: v }], sol: T`${type === 'le' ? `$P(X\\le${r})=${num(v, 4)}$ (cumulative tables/calculator).` : type === 'ge' ? `$P(X\\ge${r})=1-P(X\\le${r - 1})=1-${num(ST.binomCDF(n, p, r - 1), 4)}=${num(v, 4)}$.` : `$P(X\\lt${r})=P(X\\le${r - 1})=${num(v, 4)}$.`}` }; },
        () => { const p = pick([0.05, 0.1, 0.15, 0.2, 0.25]), c = pick([0.9, 0.95, 0.99]); const n = Math.ceil(Math.log(1 - c) / Math.log(1 - p));
          return { q: T`The probability that a component is faulty is $${p}$, independently. Find the smallest number of components that must be tested so that the probability of finding at least one faulty one exceeds $${c}$.`, fields: [{ label: 'n', ans: n }],
            sol: T`$1-(${num(1 - p)})^n\gt${c}\Rightarrow(${num(1 - p)})^n\lt${num(1 - c)}\Rightarrow n\gt\dfrac{\ln ${num(1 - c)}}{\ln ${num(1 - p)}}=${sf3(Math.log(1 - c) / Math.log(1 - p))}$. Smallest $n=${n}$.` }; },
        () => { const L = [['the number of sixes when a fair die is rolled 20 times', true, ''], ['the number of rolls of a die until the first six', false, 'the number of trials is not fixed'], ['the number of red cards when 5 cards are dealt from a pack without replacement', false, 'the trials are not independent and $p$ changes'], ['the number of heads in 10 tosses of a biased coin', true, ''], ['the number of people in a queue', false, 'there are no fixed trials with two outcomes']];
          const [ctx, ok, why] = pick(L), opts = ['Yes, a binomial model is suitable', 'No, a binomial model is not suitable'];
          return { q: T`Is a binomial distribution a suitable model for ${ctx}?`, mc: { options: opts, correct: ok ? 0 : 1 }, sol: T`${ok ? 'Yes: a fixed number of independent trials, two outcomes each, constant probability.' : `No: ${why}.`}` }; },
      ],
    },
  ],
});
