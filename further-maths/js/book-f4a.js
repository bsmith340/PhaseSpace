// BcsMaths textbook — Further Maths A2 2, Section A: Mechanics 1.
'use strict';

BOOK.f4_shm = [
  B.why(T`<p>Springs, pendulums, tides, vibrating strings, even atoms in a crystal: whenever a restoring force grows in proportion to the displacement, the motion repeats in the same smooth, regular way. That motion is simple harmonic motion, and one differential equation describes all of it.</p>`),
  B.def('simple harmonic motion', T`<p>A particle moves with SHM about $O$ if $$\ddot x=-\omega^2x,$$ where $x$ is its displacement from $O$: the acceleration is proportional to the displacement and directed towards $O$.</p>`),
  B.thm('Standard results', T`<ul><li>General solution $x=a\sin(\omega t+\varepsilon)$, amplitude $a$, period $T=\frac{2\pi}\omega$, frequency $\frac1T$.</li><li>$v^2=\omega^2(a^2-x^2)$.</li><li>Greatest speed $a\omega$ (at $O$); greatest acceleration $a\omega^2$ (at $x=\pm a$).</li></ul>`),
  B.proof(T`<p>$\ddot x=-\omega^2x$ is a second-order equation with auxiliary equation $r^2+\omega^2=0$, roots $\pm i\omega$, so $x=A\cos\omega t+B\sin\omega t=a\sin(\omega t+\varepsilon)$. Period: $\sin$ repeats when $\omega t$ increases by $2\pi$. For the speed, write $\ddot x=v\frac{dv}{dx}$: $\int v\,dv=-\omega^2\int x\,dx\Rightarrow v^2=-\omega^2x^2+C$, and $v=0$ at $x=a$ gives $C=\omega^2a^2$.</p>`),
  B.ex(1, T`A particle moves with SHM of amplitude $0.4$ m and period $\pi$ s. Find its greatest speed, greatest acceleration, and speed $0.2$ m from the centre.`, [T`$\omega=\frac{2\pi}\pi=2$.`, T`$v_{\max}=0.8$ m s⁻¹, $a_{\max}=1.6$ m s⁻².`, T`$v=2\sqrt{0.16-0.04}=0.693$ m s⁻¹.`]),
  B.ex(2, T`A particle in SHM has speed $4$ m s⁻¹ when $3$ m from the centre and $3$ m s⁻¹ when $4$ m from the centre. Find $\omega$ and $a$.`, [T`$16=\omega^2(a^2-9)$ and $9=\omega^2(a^2-16)$.`, T`Subtract: $7=7\omega^2\Rightarrow\omega=1$; then $a^2=25$, $a=5$ m.`]),
  B.ex(3, T`With $\omega=2$ and amplitude $a$, how long does the particle take to go from $x=\frac a2$ to $x=a$?`, [T`$x=a\sin2t$: $x=\frac a2$ at $2t=\frac\pi6$, $x=a$ at $2t=\frac\pi2$.`, T`Time $=\frac12\left(\frac\pi2-\frac\pi6\right)=\frac\pi6=0.524$ s.`]),
  B.warn([T`Using $x=a\sin\omega t$ when timing starts at an extreme (use $\cos$).`, T`Calculator in degrees.`, T`Confusing period with frequency.`]),
  B.exam([T`"Show that the motion is SHM": derive an equation of the form $\ddot x=-\omega^2x$, with $x$ measured from the centre.`]),
  B.checks([[T`$\ddot x=-9x$. Period?`, T`$\frac{2\pi}3$.`], [T`Where is the speed greatest?`, T`At the centre.`]]),
  B.examq(8, T`<p>A particle $P$ moves with SHM about $O$. Its greatest speed is $3$ m s⁻¹ and its greatest acceleration is $6$ m s⁻².</p><p>(a) Find $\omega$ and the amplitude. <span class="mk">[3]</span> (b) Find the period. <span class="mk">[1]</span> (c) Find the speed of $P$ when it is $0.9$ m from $O$. <span class="mk">[2]</span> (d) Find the time taken to move directly from $O$ to a point $0.9$ m from $O$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $a\omega=3$, $a\omega^2=6$ <span class="mk">M1</span> $\Rightarrow\omega=2$, $a=1.5$ m <span class="mk">A1 A1</span>. (b) $\pi$ s <span class="mk">B1</span>.</p><p>(c) $v=2\sqrt{2.25-0.81}=2.4$ m s⁻¹ <span class="mk">M1 A1</span>. (d) $0.9=1.5\sin2t\Rightarrow t=\frac12\sin^{-1}0.6=0.322$ s <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$\ddot x=-\omega^2x$; $x=a\sin(\omega t+\varepsilon)$; $T=\frac{2\pi}\omega$.`, T`$v^2=\omega^2(a^2-x^2)$; $v_{\max}=a\omega$; $a_{\max}=a\omega^2$.`]),
].join('');

BOOK.f4_pend = [
  B.why(T`<p>For centuries, pendulums kept the world's time, because their period hardly depends on how far they swing. That near-independence is SHM in disguise.</p>`),
  B.thm('Simple pendulum', T`<p>A particle on a light inextensible string of length $l$, swinging through small angles, moves with approximate SHM: $$\ddot\theta=-\frac gl\theta,\qquad T=2\pi\sqrt{\frac lg}.$$</p>`),
  B.proof(T`<p>Along the tangent to the arc, the only force component is $-mg\sin\theta$, and the tangential acceleration is $l\ddot\theta$. So $ml\ddot\theta=-mg\sin\theta$. For small $\theta$ (in radians), $\sin\theta\approx\theta$, giving $\ddot\theta=-\frac gl\theta$: SHM with $\omega^2=\frac gl$.</p>`),
  B.def('seconds pendulum', T`<p>A pendulum that takes $1$ s per swing (a full period of $2$ s): $l=\frac g{\pi^2}\approx0.993$ m.</p>`),
  B.ex(1, T`Find the period of a pendulum of length $1.2$ m.`, [T`$T=2\pi\sqrt{\frac{1.2}{9.8}}=2.20$ s.`]),
  B.ex(2, T`What is the period of a $1$ m pendulum on the Moon ($g=1.62$ m s⁻²)?`, [T`$2\pi\sqrt{\frac1{1.62}}=4.94$ s.`]),
  B.warn([T`Applying the formula to large swings — it is only approximate for small angles.`, T`Treating "seconds pendulum" as period $1$ s.`]),
  B.exam([T`State the small-angle assumption ($\sin\theta\approx\theta$) when deriving SHM.`]),
  B.checks([[T`Does the period depend on the mass?`, T`No.`], [T`Length multiplied by 4: period?`, T`Doubled.`]]),
  B.examq(6, T`<p>(a) Find the length of a seconds pendulum where $g=9.8$ m s⁻². <span class="mk">[2]</span> (b) The same pendulum is taken to a place where its period is $2.01$ s. Find the value of $g$ there. <span class="mk">[3]</span> (c) State one modelling assumption. <span class="mk">[1]</span></p>`,
    T`<p>(a) $2=2\pi\sqrt{\frac l{9.8}}\Rightarrow l=0.993$ m <span class="mk">M1 A1</span>. (b) $g=\frac{4\pi^2l}{T^2}=\frac{4\pi^2(0.9930)}{2.01^2}=9.70$ m s⁻² <span class="mk">M1 A1 A1</span>. (c) e.g. small oscillations; light inextensible string; no air resistance <span class="mk">B1</span>.</p>`),
  B.key([T`$T=2\pi\sqrt{l/g}$ for small swings.`, T`Seconds pendulum: $T=2$ s, $l\approx0.993$ m.`]),
].join('');

BOOK.f4_elosc = [
  B.why(T`<p>Hang a mass on a spring and pull it down: it bounces up and down in SHM. Hooke's law supplies a restoring force proportional to the displacement — exactly what SHM needs.</p>`),
  B.thm('Horizontal oscillations', T`<p>A particle of mass $m$ on a smooth horizontal surface, attached to a spring (natural length $l$, modulus $\lambda$), with extension $x$: $$m\ddot x=-\frac{\lambda}lx\ \Rightarrow\ \omega^2=\frac\lambda{ml}.$$</p>`),
  B.thm('Vertical oscillations', T`<p>Hanging in equilibrium the extension is $e$ with $\frac{\lambda e}l=mg$. Measuring $x$ downwards from the equilibrium position: $$m\ddot x=mg-\frac{\lambda(e+x)}l=-\frac\lambda lx,$$ so the motion is SHM about the <b>equilibrium</b> position with the same $\omega^2=\frac\lambda{ml}$.</p>`),
  B.def('strings going slack', T`<p>An elastic <b>string</b> exerts no force when shorter than $l$. The SHM model holds only while the string is taut, i.e. while $x\ge-e$. If the amplitude exceeds $e$, the particle leaves SHM at the natural length and moves freely under gravity until the string tightens again.</p>`),
  B.ex(1, T`A $0.5$ kg particle oscillates on a horizontal spring ($l=1$ m, $\lambda=20$ N). Find the period.`, [T`$\omega^2=\frac{20}{0.5}=40$; $T=\frac{2\pi}{\sqrt{40}}=0.993$ s.`]),
  B.ex(2, T`A $0.4$ kg particle hangs on a string ($l=0.8$ m, $\lambda=19.6$ N). It is pulled $0.1$ m below equilibrium and released. Find the period and greatest speed.`, [T`$e=\frac{0.4(9.8)(0.8)}{19.6}=0.16$ m; the amplitude $0.1\lt0.16$, so the string stays taut.`, T`$\omega^2=\frac{19.6}{0.4\times0.8}=61.25$, $\omega=7.83$; $T=0.803$ s; $v_{\max}=0.1\omega=0.783$ m s⁻¹.`]),
  B.ex(3, T`In Example 2 the particle is instead pulled $0.25$ m below equilibrium. How far above the natural-length position does it rise?`, [T`The string goes slack $0.16$ m above equilibrium, where $v^2=\omega^2(0.25^2-0.16^2)=2.26$.`, T`It then rises freely a further $\frac{v^2}{2g}=0.115$ m.`]),
  B.warn([T`Measuring $x$ from the natural length in the vertical case — measure from equilibrium.`, T`Assuming SHM throughout when the string can go slack.`]),
  B.exam([T`Set up $m\ddot x=\dots$ with a clear diagram and $x$ defined; then show it reduces to $\ddot x=-\omega^2x$.`]),
  B.checks([[T`$\lambda=30$, $l=0.5$, $m=0.6$: $\omega^2$?`, T`$100$.`]]),
  B.examq(8, T`<p>A particle of mass $0.5$ kg hangs in equilibrium from a light spring of natural length $0.6$ m and modulus $29.4$ N.</p><p>(a) Find the extension in equilibrium. <span class="mk">[2]</span> (b) The particle is pulled down $0.05$ m and released. Show that it moves with SHM and find the period. <span class="mk">[4]</span> (c) Find the greatest speed. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\frac{29.4e}{0.6}=0.5g\Rightarrow e=0.1$ m <span class="mk">M1 A1</span>.</p><p>(b) $0.5\ddot x=0.5g-\frac{29.4(0.1+x)}{0.6}=-49x$ <span class="mk">M1 A1</span>, so $\ddot x=-98x$: SHM <span class="mk">A1</span>, $T=\frac{2\pi}{\sqrt{98}}=0.635$ s <span class="mk">A1</span>.</p><p>(c) $0.05\sqrt{98}=0.495$ m s⁻¹ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$\omega^2=\frac\lambda{ml}$, horizontal or vertical.`, T`Vertical SHM is about the equilibrium position.`, T`Strings: SHM only while taut.`]),
].join('');

BOOK.f4_damp = [
  B.why(T`<p>Real oscillations die away: air resistance, friction and shock absorbers remove energy. Adding a resistance proportional to velocity turns the SHM equation into a second-order differential equation whose three cases — light, critical and heavy damping — come straight from the discriminant.</p>`),
  B.def('the damped oscillator', T`<p>$m\ddot x=-sx-k\dot x$ (stiffness $s$, resistance $k\dot x$), i.e. $$\ddot x+2\gamma\dot x+\omega_0^2x=0,\quad2\gamma=\frac km,\ \omega_0^2=\frac sm.$$ The auxiliary equation $r^2+2\gamma r+\omega_0^2=0$ has roots $-\gamma\pm\sqrt{\gamma^2-\omega_0^2}$.</p>`),
  B.thm('The three cases', T`<table class="tbl"><tr><th>Condition</th><th>Solution</th><th>Motion</th></tr><tr><td>$\gamma\gt\omega_0$</td><td>$Ae^{r_1t}+Be^{r_2t}$ ($r_1,r_2\lt0$)</td><td>heavy: no oscillation</td></tr><tr><td>$\gamma=\omega_0$</td><td>$(A+Bt)e^{-\gamma t}$</td><td>critical: fastest return, no overshoot</td></tr><tr><td>$\gamma\lt\omega_0$</td><td>$e^{-\gamma t}(A\cos\beta t+B\sin\beta t)$, $\beta=\sqrt{\omega_0^2-\gamma^2}$</td><td>light: oscillations of period $\frac{2\pi}\beta$, decaying</td></tr></table>`),
  B.ex(1, T`A $1$ kg mass on a spring of stiffness $25$ N m⁻¹ meets a resistance $6v$ N. Describe the motion.`, [T`$\ddot x+6\dot x+25x=0$; roots $-3\pm4i$.`, T`Light damping: $x=e^{-3t}(A\cos4t+B\sin4t)$, oscillating with period $\frac\pi2$ s inside a decaying envelope.`]),
  B.ex(2, T`Solve $\ddot x+10\dot x+25x=0$ with $x(0)=1$, $\dot x(0)=0$.`, [T`Repeated root $-5$: $x=(A+Bt)e^{-5t}$.`, T`$A=1$; $\dot x(0)=B-5A=0\Rightarrow B=5$: $x=(1+5t)e^{-5t}$ — critical damping.`]),
  B.ex(3, T`Classify $\ddot x+5\dot x+4x=0$.`, [T`Roots $-1$, $-4$ (real): heavy damping, $x=Ae^{-t}+Be^{-4t}$.`]),
  B.warn([T`Forgetting to divide through by $m$ before comparing with the standard form.`, T`Calling the oscillation period $\frac{2\pi}{\omega_0}$ — it is $\frac{2\pi}\beta$.`]),
  B.exam([T`Interpret the solution: what happens as $t\to\infty$? Does it overshoot?`]),
  B.checks([[T`$\ddot x+4\dot x+4x=0$: type?`, T`Critical.`], [T`$\ddot x+2\dot x+10x=0$: period?`, T`$\frac{2\pi}3$.`]]),
  B.examq(8, T`<p>The displacement $x$ m of a particle satisfies $2\ddot x+8\dot x+26x=0$.</p><p>(a) Show that the motion is lightly damped. <span class="mk">[2]</span> (b) Given $x=0.5$ and $\dot x=0$ when $t=0$, find $x$ in terms of $t$. <span class="mk">[4]</span> (c) Find the period of the oscillations and the ratio of the amplitude after one period to the initial amplitude. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\ddot x+4\dot x+13x=0$, roots $-2\pm3i$ (complex) <span class="mk">M1 A1</span>.</p><p>(b) $x=e^{-2t}(A\cos3t+B\sin3t)$ <span class="mk">M1</span>; $A=0.5$ <span class="mk">A1</span>; $\dot x(0)=-2A+3B=0\Rightarrow B=\frac13$ <span class="mk">M1 A1</span>.</p><p>(c) Period $\frac{2\pi}3$ <span class="mk">B1</span>; ratio $e^{-2\cdot2\pi/3}=e^{-4\pi/3}=0.0152$ <span class="mk">B1</span>.</p>`),
  B.key([T`$\ddot x+2\gamma\dot x+\omega_0^2x=0$.`, T`Discriminant sign ⇒ heavy / critical / light damping.`]),
].join('');

BOOK.f4_com1 = [
  B.why(T`<p>A body behaves, for balance and for motion under gravity, as if all its weight acted at one point — its centre of mass. Finding that point is the first step for everything from balancing a mobile to stopping a lorry tipping over.</p>`),
  B.def('centre of mass', T`<p>For particles of masses $m_i$ at $(x_i,y_i)$: $$\bar x=\frac{\sum m_ix_i}{\sum m_i},\qquad\bar y=\frac{\sum m_iy_i}{\sum m_i}.$$ Taking moments: the total weight acting at $(\bar x,\bar y)$ has the same moment about any axis as the individual weights.</p>`),
  B.proof(T`<p>The moment of the weights about the $y$-axis is $\sum m_igx_i$. For a single weight $(\sum m_i)g$ at $\bar x$ to have the same moment, $(\sum m_i)g\bar x=\sum m_igx_i$, which gives the formula.</p>`, 'Why the formula works'),
  B.def('rods and frameworks', T`<p>A uniform rod's centre of mass is at its midpoint. A framework of uniform rods (or a bent wire) is treated as particles at the midpoints with masses proportional to the lengths. Use symmetry wherever possible.</p>`),
  B.ex(1, T`Particles of $2$, $3$ and $5$ kg are at $(0,0)$, $(4,0)$ and $(2,3)$. Find the centre of mass.`, [T`$\bar x=\frac{0+12+10}{10}=2.2$; $\bar y=\frac{0+0+15}{10}=1.5$.`]),
  B.ex(2, T`A uniform wire is bent into a right-angled triangle with sides $3$, $4$, $5$, legs along the axes. Find its centre of mass.`, [T`Pieces: $4$ at $(2,0)$, $3$ at $(0,1.5)$, $5$ at $(2,1.5)$.`, T`$\bar x=\frac{8+0+10}{12}=1.5$; $\bar y=\frac{0+4.5+7.5}{12}=1$.`], T`Not the same as the centroid of the triangular lamina, $\left(\frac43,1\right)$ — wire and lamina differ.`),
  B.warn([T`Using lengths of rods instead of their midpoints as positions.`, T`Treating a wire frame like a solid lamina.`]),
  B.exam([T`A table of mass, $x$ and $y$ keeps the working clear and earns method marks.`]),
  B.checks([[T`$1$ kg at $x=0$, $3$ kg at $x=4$: $\bar x$?`, T`$3$.`]]),
  B.examq(5, T`<p>A uniform rod $AB$ of length $4$ m and mass $3$ kg carries particles of mass $1$ kg at $A$, $2$ kg at $B$ and $4$ kg at $C$, where $AC=1$ m.</p><p>(a) Find the distance of the centre of mass from $A$. <span class="mk">[3]</span> (b) The rod is suspended by a single vertical string so that it hangs horizontally. Where is the string attached? <span class="mk">[2]</span></p>`,
    T`<p>(a) $\frac{3(2)+1(0)+2(4)+4(1)}{10}=1.8$ m <span class="mk">M1 A1 A1</span>. (b) At the centre of mass, $1.8$ m from $A$ <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$\bar x=\frac{\sum mx}{\sum m}$.`, T`Rods: mass at the midpoint, proportional to length.`]),
].join('');

BOOK.f4_lam = [
  B.why(T`<p>A lamina is a flat sheet — a road sign, a template, a metal plate. Its centre of mass comes from a few standard shapes, combined by the same weighted average as particles, with holes counted as negative mass.</p>`),
  B.thm('Standard laminae', T`<ul><li>Rectangle, circle: at the centre.</li><li>Triangle: at the centroid $\left(\frac{x_1+x_2+x_3}3,\frac{y_1+y_2+y_3}3\right)$, $\frac23$ of the way along each median.</li><li>Sector of radius $r$ and angle $2\alpha$: $\frac{2r\sin\alpha}{3\alpha}$ from the centre along the axis of symmetry; a semicircle ($\alpha=\frac\pi2$): $\frac{4r}{3\pi}$.</li></ul>`),
  B.proof(T`<p>Slice the triangle into thin strips parallel to one side: each strip balances at its midpoint, and the midpoints lie on the median to that side. So $G$ lies on every median — they meet at the point $\frac23$ of the way from each vertex, which is the mean of the vertices.</p>`, 'Why the centroid'),
  B.ex(1, T`Find the centre of mass of the triangle with vertices $(0,0)$, $(6,0)$, $(0,3)$.`, [T`$(2,1)$.`]),
  B.ex(2, T`An L-shaped lamina is a $6\times2$ rectangle (corners $(0,0)$, $(6,2)$) with a $2\times4$ rectangle above its left end (corners $(0,2)$, $(2,6)$). Find $G$.`, [T`Areas $12$ at $(3,1)$ and $8$ at $(1,4)$.`, T`$\bar x=\frac{36+8}{20}=2.2$, $\bar y=\frac{12+32}{20}=2.2$.`]),
  B.ex(3, T`A $10\times10$ square plate (corners $(0,0)$, $(10,10)$) has a hole of radius $2$ centred at $(7,5)$. Find $\bar x$.`, [T`$\bar x=\frac{100(5)-4\pi(7)}{100-4\pi}=4.71$ (and $\bar y=5$ by symmetry).`], T`The hole shifts $G$ away from itself.`),
  B.warn([T`Adding a hole's area instead of subtracting it.`, T`Using $\frac{4r}{3\pi}$ from the arc instead of from the straight edge.`]),
  B.exam([T`Tabulate area, $\bar x$, $\bar y$ for every piece.`]),
  B.checks([[T`Semicircle of radius $3\pi$: distance of $G$ from the diameter?`, T`$4$.`]]),
  B.examq(8, T`<p>A uniform sign consists of a rectangle with corners $(0,0)$ and $(12,8)$ together with an isosceles triangle on the top edge whose apex is at $(6,14)$ (units cm).</p><p>(a) Find the centre of mass of the sign. <span class="mk">[5]</span> (b) The sign is suspended freely from the corner $(0,0)$. Find the angle between its bottom edge and the vertical. <span class="mk">[3]</span></p>`,
    T`<p>(a) Rectangle area $96$ at $(6,4)$; triangle area $36$ at $(6,10)$ <span class="mk">B1 B1</span>. $\bar x=6$ (symmetry) <span class="mk">B1</span>; $\bar y=\frac{384+360}{132}=5.64$ <span class="mk">M1 A1</span>.</p><p>(b) $G$ hangs below the corner; the bottom edge makes $\tan^{-1}\frac{5.64}{6}=43.2^\circ$ with the vertical <span class="mk">M1 A1 A1</span>.</p>`),
  B.key([T`Standard shapes; composite $=$ weighted average by area.`, T`Holes: negative area.`]),
].join('');

BOOK.f4_susp = [
  B.why(T`<p>Hang a picture from one nail and it tilts until it is balanced. The physics is one sentence: in equilibrium, the centre of mass is directly below the point of suspension.</p>`),
  B.thm('Suspended bodies', T`<p>A body freely suspended from $P$ rests with $G$ vertically below $P$, because the only forces — the weight at $G$ and the reaction at $P$ — must act along the same line to have no net moment.</p>`),
  B.ex(1, T`A rectangle $8\times6$ is suspended from a corner $A$, with $AB=8$. Find the angle between $AB$ and the vertical.`, [T`$G$ is at $(4,3)$ from $A$ along $AB$ and $AD$.`, T`$AG$ is vertical: angle between $AB$ and $AG$ is $\tan^{-1}\frac34=36.9^\circ$.`]),
  B.ex(2, T`The L-shaped lamina of the previous chapter ($G=(2.2,2.2)$) hangs from the origin. Find the angle of the bottom edge with the vertical.`, [T`$\tan^{-1}\frac{2.2}{2.2}=45^\circ$.`]),
  B.ex(3, T`Where must a rectangle $AB=10$, $BC=4$ be suspended from on $AB$ for $AB$ to hang horizontally?`, [T`$G$ must be directly below: at the midpoint of $AB$.`]),
  B.warn([T`Measuring the angle with the horizontal when the vertical is asked for.`]),
  B.exam([T`Draw the lamina with $PG$ vertical, and mark the angle you need on that diagram.`]),
  B.checks([[T`A uniform disc hangs from a point on its rim. Which line is vertical?`, T`The diameter through that point.`]]),
  B.examq(4, T`<p>A uniform triangular lamina $ABC$ has $AB=6$ cm, $BC=8$ cm and angle $ABC=90^\circ$. It is suspended freely from $A$. Find the angle between $AB$ and the vertical. <span class="mk">[4]</span></p>`,
    T`<p>With $B$ at the origin, $A(0,6)$, $C(8,0)$: $G=\left(\frac83,2\right)$ <span class="mk">M1 A1</span>. $\overrightarrow{AG}=\left(\frac83,-4\right)$; angle with $AB$ (straight down): $\tan^{-1}\frac{8/3}{4}=33.7^\circ$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Suspended: $G$ vertically below the support.`]),
].join('');

BOOK.f4_frame = [
  B.why(T`<p>Bridges, cranes and roof trusses are frameworks of straight members joined at pins. Each member is either being stretched (tension) or squashed (thrust) — and engineers must know which, and how hard.</p>`),
  B.def('light pin-jointed frameworks', T`<ul><li>Rods are light and joined by smooth pins, so each rod's force acts along its length.</li><li><b>Tension</b>: the rod pulls the joints at its ends towards each other. <b>Thrust</b> (compression): it pushes them apart.</li><li>External forces act only at the joints.</li></ul>`),
  B.def('method of joints', T`<ol><li>Find the external support reactions by treating the whole framework as one rigid body (moments and resolving).</li><li>At each joint, resolve horizontally and vertically: the joint is a particle in equilibrium. Start where there are at most two unknown rod forces.</li><li>Assume every rod is in tension (forces pointing away from the joint, along the rod); a negative answer means thrust.</li></ol>`),
  B.ex(1, T`An equilateral triangular frame $ABC$ rests on supports at $A$ and $B$ ($AB$ horizontal) with a $60$ N load at $C$. Find the force in each rod.`, [T`At $C$: $2F\sin60^\circ=60\Rightarrow F=34.6$ N, a thrust in $AC$ and $BC$.`, T`At $A$: the thrust in $AC$ pushes $A$ outwards with horizontal component $34.6\cos60^\circ=17.3$ N, so $AB$ is in tension $17.3$ N.`]),
  B.ex(2, T`A bracket: horizontal rod $AB$ from a wall, and rod $CB$ from the wall below, at $30^\circ$ to the horizontal; $50$ N hangs at $B$. Find the rod forces.`, [T`At $B$: $F_{CB}\sin30^\circ=50\Rightarrow F_{CB}=100$ N (thrust).`, T`$T_{AB}=100\cos30^\circ=86.6$ N (tension).`]),
  B.warn([T`Directing a rod's force inconsistently at its two ends — it must be equal and opposite.`, T`Forgetting the external reactions at supported joints.`]),
  B.exam([T`State clearly whether each force is a tension or a thrust — often a separate mark.`]),
  B.checks([[T`A rod's force comes out as $-12$ N, assumed tension. Meaning?`, T`A thrust of $12$ N.`]]),
  B.examq(8, T`<p>A light framework $ABC$ has $AB=5$ m horizontal, $AC=3$ m and $BC=4$ m (so angle $ACB=90^\circ$). It is smoothly supported at $A$ and $B$, and a load of $50$ N hangs at $C$.</p><p>(a) Find the reactions at $A$ and $B$. <span class="mk">[3]</span> (b) Find the force in each rod, stating whether it is a tension or a thrust. <span class="mk">[5]</span></p>`,
    T`<p>(a) $C$ is $1.8$ m from $A$ horizontally <span class="mk">B1</span>. Moments about $A$: $5R_B=50(1.8)\Rightarrow R_B=18$ N, $R_A=32$ N <span class="mk">M1 A1</span>.</p><p>(b) At $C$, directions to $A$: $(-0.6,-0.8)$, to $B$: $(0.8,-0.6)$. Resolving: $T_{CA}=-40$, $T_{CB}=-30$ <span class="mk">M1 A1</span>: thrusts of $40$ N in $AC$ and $30$ N in $BC$ <span class="mk">A1</span>. At $A$: $T_{AB}=40\times0.6=24$ N, a tension <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Rod forces act along rods: tension or thrust.`, T`Reactions first, then resolve at joints.`]),
].join('');

BOOK.f4_bank = [
  B.why(T`<p>The AS 2 banked-track result gave one speed that needs no friction. With friction there is a whole range of safe speeds — and on a level road, a top-heavy vehicle can tip over before it skids.</p>`),
  B.thm('Banked track with friction', T`<p>On a bank at angle $\theta$, radius $r$, coefficient $\mu$:</p><ul><li>Greatest speed (friction down the slope): $v^2=rg\dfrac{\sin\theta+\mu\cos\theta}{\cos\theta-\mu\sin\theta}$.</li><li>Least speed (friction up the slope): $v^2=rg\dfrac{\sin\theta-\mu\cos\theta}{\cos\theta+\mu\sin\theta}$.</li></ul>`),
  B.proof(T`<p>At the greatest speed: vertically $R\cos\theta-F\sin\theta=mg$; horizontally (towards the centre) $R\sin\theta+F\cos\theta=\frac{mv^2}r$; limiting $F=\mu R$. Dividing the second by the first gives the result. For the least speed, friction reverses, so $\mu$ changes sign.</p>`),
  B.thm('Overturning on a level bend', T`<p>A vehicle with centre of mass at height $h$ and wheels $2d$ apart is about to overturn when the inner wheels' reaction is zero: moments about $G$ give $\frac{mv^2}r\cdot h=mg\cdot d$, so $v^2=\frac{rgd}h$. It skids first if $\mu\lt\frac dh$.</p>`),
  B.ex(1, T`A bend of radius $60$ m is banked at $20^\circ$ with $\mu=0.3$. Find the range of safe speeds.`, [T`$v_{\max}=\sqrt{60g\frac{\sin20^\circ+0.3\cos20^\circ}{\cos20^\circ-0.3\sin20^\circ}}=20.9$ m s⁻¹.`, T`$v_{\min}=\sqrt{60g\frac{\sin20^\circ-0.3\cos20^\circ}{\cos20^\circ+0.3\sin20^\circ}}=5.82$ m s⁻¹.`]),
  B.ex(2, T`A van has $h=1.2$ m and half-track $0.8$ m. At what speed would it overturn on a level bend of radius $30$ m (no skidding)?`, [T`$v=\sqrt{\frac{30(9.8)(0.8)}{1.2}}=14.0$ m s⁻¹.`]),
  B.warn([T`Keeping friction in the same direction for both limits.`, T`Including friction in an overturning question at the inner wheel after it has lifted.`]),
  B.exam([T`State the direction of friction with a reason ("about to slide up the bank").`]),
  B.checks([[T`At the design speed, what friction is needed?`, T`None.`]]),
  B.examq(8, T`<p>A bend of radius $50$ m is banked at $\theta$, where $\tan\theta=\frac34$. The coefficient of friction between the tyres and the road is $0.25$.</p><p>(a) Find the greatest speed at which a car can take the bend without slipping. <span class="mk">[5]</span> (b) Find the least such speed. <span class="mk">[3]</span></p>`,
    T`<p>$\sin\theta=0.6$, $\cos\theta=0.8$ <span class="mk">B1</span>. (a) $R(0.8)-0.25R(0.6)=mg$, $R(0.6)+0.25R(0.8)=\frac{mv^2}{50}$ <span class="mk">M1 M1</span>; $v^2=490\frac{0.8}{0.65}$ <span class="mk">A1</span>, $v=24.6$ m s⁻¹ <span class="mk">A1</span>.</p><p>(b) $v^2=490\frac{0.4}{0.95}$ <span class="mk">M1 A1</span>, $v=14.4$ m s⁻¹ <span class="mk">A1</span>.</p>`),
  B.key([T`Friction down the slope at $v_{\max}$, up at $v_{\min}$.`, T`Overturn when $\frac{v^2}{rg}=\frac dh$; skid first if $\mu\lt\frac dh$.`]),
].join('');
