// BcsMaths textbook — Further Maths A2 2, Section B: Mechanics 2.
'use strict';

BOOK.f4_kin3 = [
  B.why(T`<p>Aircraft, drones and satellites move in three dimensions. Add a $\mathbf k$ component and everything from two-dimensional vector kinematics carries over — differentiate or integrate component by component.</p>`),
  B.def('vector kinematics in 3D', T`<p>$\mathbf r=x\mathbf i+y\mathbf j+z\mathbf k$, $\mathbf v=\dot{\mathbf r}$, $\mathbf a=\ddot{\mathbf r}$. Integrating gives vector constants fixed by the initial position and velocity. Speed $=|\mathbf v|$; "perpendicular" questions use the scalar product.</p>`),
  B.ex(1, T`$\mathbf r=t^2\mathbf i+2t^3\mathbf j+4t\mathbf k$. Find $\mathbf v$, $\mathbf a$ and the speed at $t=1$.`, [T`$\mathbf v=2t\mathbf i+6t^2\mathbf j+4\mathbf k$; $\mathbf a=2\mathbf i+12t\mathbf j$.`, T`At $t=1$: $\mathbf v=2\mathbf i+6\mathbf j+4\mathbf k$, speed $\sqrt{56}=7.48$.`]),
  B.ex(2, T`$\mathbf a=6t\mathbf i-2\mathbf j$; at $t=0$, $\mathbf r=\mathbf 0$ and $\mathbf v=\mathbf i+4\mathbf j+2\mathbf k$. Find $\mathbf r$ at $t=2$.`, [T`$\mathbf v=(3t^2+1)\mathbf i+(4-2t)\mathbf j+2\mathbf k$.`, T`$\mathbf r=(t^3+t)\mathbf i+(4t-t^2)\mathbf j+2t\mathbf k$; at $t=2$: $10\mathbf i+4\mathbf j+4\mathbf k$.`]),
  B.warn([T`Forgetting the $\mathbf k$ component of the constant of integration.`]),
  B.exam([T`Keep the three components lined up; write the constant vector explicitly.`]),
  B.checks([[T`$\mathbf v=(1,2,2)$. Speed?`, T`$3$.`]]),
  B.examq(7, T`<p>A particle has position vector $\mathbf r=(2t-1)\mathbf i+(t^2-4t)\mathbf j+\frac{t^3}3\mathbf k$ m at time $t$ s.</p><p>(a) Find its speed when $t=2$. <span class="mk">[2]</span> (b) Show that its velocity is perpendicular to its acceleration when $t^3+2t-4=0$, and verify that this has a root between $1$ and $2$. <span class="mk">[3]</span> (c) Find its distance from the origin when $t=3$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\mathbf v=2\mathbf i+(2t-4)\mathbf j+t^2\mathbf k=2\mathbf i+4\mathbf k$; speed $\sqrt{20}=4.47$ m s⁻¹ <span class="mk">M1 A1</span>.</p><p>(b) $\mathbf a=2\mathbf j+2t\mathbf k$; $\mathbf v\cdot\mathbf a=2(2t-4)+2t^3=0\Rightarrow t^3+2t-4=0$ <span class="mk">M1 A1</span>. $f(1)=-1\lt0$, $f(2)=8\gt0$: sign change <span class="mk">B1</span> (root $t\approx1.18$).</p><p>(c) $\mathbf r=5\mathbf i-3\mathbf j+9\mathbf k$; $\sqrt{115}=10.7$ m <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Component-wise calculus in 3D.`, T`Perpendicular ⇔ scalar product $0$.`]),
].join('');

BOOK.f4_varacc = [
  B.why(T`<p>Air resistance depends on speed; a spring's force depends on position; an engine at constant power gives less force the faster you go. When acceleration depends on $v$ or $x$ rather than $t$, choose the right form of $a$ and separate the variables.</p>`),
  B.thm('Forms of acceleration', T`$$a=\frac{dv}{dt}=v\frac{dv}{dx}=\frac{d^2x}{dt^2}.$$<ul><li>$a=f(t)$: integrate with respect to $t$.</li><li>$a=f(v)$: $\int\frac{dv}{f(v)}=\int dt$ (for time) or $\int\frac{v\,dv}{f(v)}=\int dx$ (for distance).</li><li>$a=f(x)$: $\int v\,dv=\int f(x)\,dx$.</li></ul>`),
  B.proof(T`<p>By the chain rule, $\frac{dv}{dt}=\frac{dv}{dx}\cdot\frac{dx}{dt}=v\frac{dv}{dx}$.</p>`, 'Why a = v dv/dx'),
  B.def('constant power', T`<p>An engine working at constant power $P$ gives driving force $\frac Pv$, so $mv\frac{dv}{dx}=\frac Pv-R$ or $m\frac{dv}{dt}=\frac Pv-R$.</p>`),
  B.ex(1, T`A boat moving at $20$ m s⁻¹ cuts its engine; the water gives $a=-0.5v$. Find $v(t)$ and the total distance before it stops.`, [T`$\int\frac{dv}v=-0.5\int dt\Rightarrow v=20e^{-0.5t}$.`, T`Distance: $v\frac{dv}{dx}=-0.5v\Rightarrow\frac{dv}{dx}=-0.5\Rightarrow v=20-0.5x$: it stops after $40$ m (as $t\to\infty$).`]),
  B.ex(2, T`A particle moves with $a=4-x$, starting from rest at $O$. Find its greatest speed.`, [T`$\int v\,dv=\int(4-x)\,dx\Rightarrow\frac12v^2=4x-\frac12x^2$.`, T`$v$ is greatest when $a=0$, at $x=4$: $v^2=16$, $v=4$ m s⁻¹.`]),
  B.ex(3, T`A $1000$ kg car's engine works at $20$ kW against $400$ N. Find its greatest speed and its acceleration at $20$ m s⁻¹.`, [T`$\frac{20000}v=400\Rightarrow v_{\max}=50$ m s⁻¹.`, T`At $20$ m s⁻¹: $1000a=1000-400\Rightarrow a=0.6$ m s⁻².`]),
  B.warn([T`Using $\frac{dv}{dt}$ when the question asks for distance.`, T`Losing the constant of integration (use the initial condition).`]),
  B.exam([T`Write the equation of motion first ($m\times$ acceleration $=$ resultant force), then choose the form of $a$.`]),
  B.checks([[T`$a=-2v^2$: which form gives $v$ in terms of $x$?`, T`$v\frac{dv}{dx}=-2v^2$.`]]),
  B.examq(9, T`<p>A car of mass $800$ kg moves on a level road with its engine working at a constant $24$ kW. The resistance is $kv$ N, and the car's maximum speed is $40$ m s⁻¹.</p><p>(a) Find $k$. <span class="mk">[2]</span> (b) Show that $800v\frac{dv}{dx}=\frac{24000}v-15v$. <span class="mk">[2]</span> (c) Find the distance travelled as the speed increases from $10$ m s⁻¹ to $20$ m s⁻¹. <span class="mk">[5]</span></p>`,
    T`<p>(a) $\frac{24000}{40}=40k\Rightarrow k=15$ <span class="mk">M1 A1</span>. (b) Newton II with driving force $\frac Pv$ and $a=v\frac{dv}{dx}$ <span class="mk">M1 A1</span>.</p><p>(c) $dx=\frac{800v^2\,dv}{24000-15v^2}=\frac{160}3\left(-1+\frac{1600}{1600-v^2}\right)dv$ <span class="mk">M1 A1</span>. $x=\frac{160}3\left[-v+20\ln\frac{40+v}{40-v}\right]_{10}^{20}$ <span class="mk">M1 A1</span> $=93.6$ m <span class="mk">A1</span>.</p>`),
  B.key([T`$a=\frac{dv}{dt}=v\frac{dv}{dx}$; separate variables.`, T`Constant power: force $\frac Pv$.`]),
].join('');

BOOK.f4_comcal = [
  B.why(T`<p>A lamina with a curved edge or a solid of revolution isn't made of a few rectangles — but it is made of infinitely many thin strips. Summing their moments becomes an integral.</p>`),
  B.thm('Laminae under a curve', T`<p>For the region under $y=f(x)$ from $a$ to $b$: $$\bar x=\frac{\int_a^bxy\,dx}{\int_a^by\,dx},\qquad\bar y=\frac{\int_a^b\frac12y^2\,dx}{\int_a^by\,dx}.$$</p>`),
  B.proof(T`<p>A vertical strip of width $\delta x$ has area $y\,\delta x$ and centre of mass at $\left(x,\frac y2\right)$. Its moment about the $y$-axis is $xy\,\delta x$ and about the $x$-axis $\frac y2\cdot y\,\delta x$. Summing and letting $\delta x\to0$ gives the integrals.</p>`),
  B.thm('Solids of revolution', T`<p>Rotating $y=f(x)$, $a\le x\le b$, about the $x$-axis: discs of volume $\pi y^2\,\delta x$ at $x$, so $$\bar x=\frac{\int\pi xy^2\,dx}{\int\pi y^2\,dx}.$$</p>`),
  B.thm('Standard results', T`<p>Solid hemisphere radius $r$: $\frac38r$ from the plane face. Solid cone height $h$: $\frac h4$ from the base.</p>`),
  B.proof(T`<p><b>Hemisphere</b>: rotate $y^2=r^2-x^2$, $0\le x\le r$: $\bar x=\frac{\int_0^rx(r^2-x^2)\,dx}{\int_0^r(r^2-x^2)\,dx}=\frac{r^4/4}{2r^3/3}=\frac38r$.</p><p><b>Cone</b>: vertex at $O$, $y=\frac rhx$: $\bar x=\frac{\int_0^hx\cdot x^2\,dx}{\int_0^hx^2\,dx}=\frac{h^4/4}{h^3/3}=\frac34h$ from the vertex, i.e. $\frac h4$ from the base.</p>`, 'Proofs of the standard results'),
  B.ex(1, T`Find the centre of mass of the lamina under $y=x^2$ from $x=0$ to $x=2$.`, [T`Area $\frac83$; $\int x^3=4\Rightarrow\bar x=1.5$.`, T`$\frac12\int x^4=\frac{16}5\Rightarrow\bar y=\frac{16/5}{8/3}=1.2$.`]),
  B.ex(2, T`The region under $y=\sqrt x$ from $0$ to $4$ is rotated about the $x$-axis. Find $\bar x$.`, [T`$\bar x=\frac{\int_0^4x\cdot x\,dx}{\int_0^4x\,dx}=\frac{64/3}{8}=\frac83$.`]),
  B.warn([T`Using $\int xy\,dx$ for a solid (it is $\int xy^2\,dx$).`, T`Forgetting the $\frac12$ in $\bar y$ for a lamina.`]),
  B.exam([T`The proofs for the cone and hemisphere may be asked: set up the integral carefully with the axis along $x$.`]),
  B.checks([[T`Cone of height $12$: $G$ from the vertex?`, T`$9$.`]]),
  B.examq(12, T`<p>The region $R$ is bounded by $y=4-x^2$, the $x$-axis and the $y$-axis, for $0\le x\le2$.</p><p>(a) Find $\bar x$ for a uniform lamina in the shape of $R$. <span class="mk">[4]</span> (b) Find $\bar y$. <span class="mk">[3]</span> (c) Prove that the centre of mass of a uniform solid hemisphere of radius $r$ is $\frac38r$ from its plane face. <span class="mk">[5]</span></p>`,
    T`<p>(a) Area $\int_0^2(4-x^2)\,dx=\frac{16}3$ <span class="mk">M1 A1</span>; $\int_0^2x(4-x^2)\,dx=4$ <span class="mk">A1</span>; $\bar x=\frac34$ <span class="mk">A1</span>.</p><p>(b) $\frac12\int_0^2(4-x^2)^2\,dx=\frac{128}{15}$ <span class="mk">M1 A1</span>; $\bar y=\frac{128/15}{16/3}=1.6$ <span class="mk">A1</span>.</p><p>(c) Volume $\int_0^r\pi(r^2-x^2)\,dx=\frac23\pi r^3$ <span class="mk">M1 A1</span>; moment $\int_0^r\pi x(r^2-x^2)\,dx=\frac{\pi r^4}4$ <span class="mk">M1 A1</span>; $\bar x=\frac38r$ <span class="mk">A1</span>.</p>`),
  B.key([T`Lamina: $\bar x=\frac{\int xy}{\int y}$, $\bar y=\frac{\int\frac12y^2}{\int y}$.`, T`Solid: $\bar x=\frac{\int xy^2}{\int y^2}$; hemisphere $\frac38r$, cone $\frac h4$.`]),
].join('');

BOOK.f4_comp = [
  B.why(T`<p>Toys, buoys and machine parts combine cylinders, cones and hemispheres. Knowing each part's centre of mass, the whole is a weighted average — weighted by volume for a uniform solid.</p>`),
  B.thm('Composite solids', T`<p>$\bar x=\frac{\sum V_i\bar x_i}{\sum V_i}$ for uniform density, with $V$ for a cylinder $\pi r^2h$, cone $\frac13\pi r^2h$, hemisphere $\frac23\pi r^3$. Removed parts have negative volume. Common factors like $\pi$ cancel.</p>`),
  B.ex(1, T`A cylinder (radius $3$, height $6$) has a hemisphere of radius $3$ on one end. Find $G$ from the flat end.`, [T`Volumes ∝ $54$ and $18$; centres at $3$ and $6+\frac98=7.125$.`, T`$\bar x=\frac{54(3)+18(7.125)}{72}=4.03$.`]),
  B.ex(2, T`A solid hemisphere hangs from a point on the rim of its plane face. Find the angle of the plane face with the vertical.`, [T`$G$ is $\frac38r$ from the centre $O$; the support $P$ is $r$ from $O$ along the face.`, T`$\tan\theta=\frac{3r/8}r=\frac38\Rightarrow\theta=20.6^\circ$.`]),
  B.warn([T`Weighting by surface area for a solid.`, T`Measuring part centres from different origins.`]),
  B.exam([T`State your origin and axis; list volume and centre for each part.`]),
  B.checks([[T`Volume ratio of cone to cylinder with the same base and height?`, T`$1:3$.`]]),
  B.examq(8, T`<p>A toy is a uniform solid cone of height $12$ cm and base radius $4$ cm joined at its base to a uniform solid hemisphere of radius $4$ cm, of the same material.</p><p>(a) Find the distance of the centre of mass from the vertex of the cone. <span class="mk">[5]</span> (b) The toy is suspended from a point on the circular rim where the cone meets the hemisphere. Find the angle between the axis of the toy and the vertical. <span class="mk">[3]</span></p>`,
    T`<p>(a) Volumes $64\pi$ and $\frac{128}3\pi$ <span class="mk">B1</span>; centres $9$ and $12+1.5=13.5$ from the vertex <span class="mk">B1 B1</span>. $\bar x=\frac{64(9)+\frac{128}3(13.5)}{64+\frac{128}3}=10.8$ cm <span class="mk">M1 A1</span>.</p><p>(b) $G$ is $1.2$ cm from the rim's plane along the axis; the rim point is $4$ cm from the axis <span class="mk">M1</span>. $\tan\alpha=\frac4{1.2}\Rightarrow\alpha=73.3^\circ$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Weighted average by volume; holes negative.`, T`Suspended: $G$ below the support.`]),
].join('');

BOOK.f4_topple = [
  B.why(T`<p>Tilt a tall box and it tips over; tilt a flat one and it slides. Which happens first depends on two independent comparisons: friction against $\tan\theta$, and the base width against the height of the centre of mass.</p>`),
  B.thm('Conditions', T`<ul><li><b>Sliding</b>: on a plane at angle $\theta$, a body slides when $\tan\theta\gt\mu$.</li><li><b>Toppling</b>: the body is about to topple when the vertical through $G$ passes through the lowest edge of its base. For a cuboid of base $b$ (along the slope) and height $h$: $\tan\theta=\frac bh$.</li><li>Whichever critical angle is smaller happens first.</li></ul>`),
  B.proof(T`<p>Once the vertical through $G$ falls outside the base, the weight has a moment about the lower edge that the reaction (which must act within the base) cannot balance. For the cuboid, $G$ is $\frac b2$ from the lower edge along the slope and $\frac h2$ above it: the vertical passes through the edge when $\tan\theta=\frac{b/2}{h/2}$.</p>`),
  B.ex(1, T`A cuboid with base $4$ cm and height $10$ cm rests on a plane with $\mu=0.5$. As the plane tilts, what happens first?`, [T`Topples at $\tan^{-1}0.4=21.8^\circ$; slides at $\tan^{-1}0.5=26.6^\circ$.`, T`It topples first.`]),
  B.ex(2, T`A solid cone (radius $3$, height $12$) stands on a rough plane. At what angle does it topple?`, [T`$G$ is $3$ cm above the base: $\tan\theta=\frac33=1$, $\theta=45^\circ$.`]),
  B.ex(3, T`A horizontal force $P$ is applied to the top of a block ($W=100$ N, base $0.6$ m, height $1.5$ m) on rough ground, $\mu=0.3$. Does it slide or topple?`, [T`Topple: $1.5P=100(0.3)\Rightarrow P=20$ N. Slide: $P=30$ N.`, T`It topples first, at $P=20$ N.`]),
  B.warn([T`Using the full base and full height for $G$ in a shape whose $G$ isn't at mid-height (e.g. a cone).`]),
  B.exam([T`Compare the two critical values explicitly and state the conclusion.`]),
  B.checks([[T`A cube on a plane with $\mu=1.2$: which first?`, T`Topples (at $45^\circ$; sliding needs $50.2^\circ$).`]]),
  B.examq(6, T`<p>A uniform solid cylinder of radius $5$ cm and height $30$ cm stands on a rough plane, $\mu=0.4$. The angle of the plane is gradually increased.</p><p>(a) Show that the cylinder topples before it slides, and find the angle at which it topples. <span class="mk">[4]</span> (b) A cylinder of the same height and material is wide enough to slide first. Find the least possible radius. <span class="mk">[2]</span></p>`,
    T`<p>(a) Topples when $\tan\theta=\frac5{15}=\frac13$ <span class="mk">M1 A1</span>; $\frac13\lt0.4$, so it topples first <span class="mk">A1</span>, at $18.4^\circ$ <span class="mk">A1</span>.</p><p>(b) Need $\frac r{15}\gt0.4\Rightarrow r\gt6$ cm <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Slide: $\tan\theta\gt\mu$. Topple: weight's line through the base edge.`]),
].join('');

BOOK.f4_forces = [
  B.why(T`<p>A system of forces acting at different points of a body can push it along and turn it. Every such system boils down to one of three things: a single force, a couple (pure turning), or equilibrium.</p>`),
  B.def('resultant and moment', T`<p>For forces $(X_i,Y_i)$ at points $(x_i,y_i)$: resultant $\mathbf R=\left(\sum X_i,\sum Y_i\right)$, total moment about $O$ (anticlockwise) $G=\sum(x_iY_i-y_iX_i)$.</p>`),
  B.thm('Reduction of a force system', T`<ul><li>$\mathbf R\ne\mathbf 0$: equivalent to a single force $\mathbf R$ along the line $xR_y-yR_x=G$.</li><li>$\mathbf R=\mathbf 0$, $G\ne0$: a <b>couple</b> of moment $G$ — the same about every point.</li><li>$\mathbf R=\mathbf 0$, $G=0$: equilibrium.</li><li>Equivalently, $\mathbf R$ acting at any chosen point $P$ plus a couple $G-(x_PR_y-y_PR_x)$.</li></ul>`),
  B.proof(T`<p>A force $\mathbf R$ through $(x,y)$ has moment $xR_y-yR_x$ about $O$; matching the system's moment $G$ gives the line of action. For a couple, the moment about $(p,q)$ is $G-(pR_y-qR_x)=G$ when $\mathbf R=\mathbf 0$ — independent of the point.</p>`),
  B.ex(1, T`Forces $3\mathbf i$ at $(0,2)$, $4\mathbf j$ at $(2,0)$ and $(-3\mathbf i-4\mathbf j)$ at $(1,1)$. Reduce the system.`, [T`$\mathbf R=\mathbf 0$.`, T`$G=(0-6)+(8-0)+(-4+3)=1$: a couple of $1$ N m anticlockwise.`]),
  B.ex(2, T`Forces $(2\mathbf i+\mathbf j)$ at $(1,0)$ and $(-\mathbf i+3\mathbf j)$ at $(0,2)$. Find the resultant and its line of action.`, [T`$\mathbf R=\mathbf i+4\mathbf j$; $G=(1\cdot1-0)+(0-2(-1))=3$.`, T`Line: $4x-y=3$; it crosses the $x$-axis at $x=0.75$.`]),
  B.warn([T`Sign errors in $xY-yX$.`, T`Thinking a couple can be balanced by a single force — only by an equal and opposite couple.`]),
  B.exam([T`Tabulate $X$, $Y$, $x$, $y$ and $xY-yX$ for each force.`]),
  B.checks([[T`Forces $5$ N and $5$ N, opposite, $3$ m apart. Equivalent to?`, T`A couple of $15$ N m.`]]),
  B.examq(7, T`<p>A square $ABCD$ of side $2$ m has $A(0,0)$, $B(2,0)$, $C(2,2)$, $D(0,2)$. Forces of $3$, $4$, $5$ and $6$ N act along $AB$, $BC$, $CD$ and $DA$ respectively, in the directions indicated by the letters.</p><p>(a) Find the magnitude of the resultant. <span class="mk">[2]</span> (b) Find the equation of its line of action. <span class="mk">[3]</span> (c) The system is replaced by a single force at $A$ together with a couple. Find the couple. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\mathbf R=(3-5)\mathbf i+(4-6)\mathbf j=-2\mathbf i-2\mathbf j$; $|\mathbf R|=2\sqrt2=2.83$ N <span class="mk">M1 A1</span>.</p><p>(b) $G=0+2(4)+(-2)(-5)+0=18$ <span class="mk">M1 A1</span>; $-2x+2y=18\Rightarrow y=x+9$ <span class="mk">A1</span>. (c) The force at $A$ has no moment about $A$: couple $18$ N m anticlockwise <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$\mathbf R=\sum\mathbf F$; $G=\sum(xY-yX)$.`, T`Single force, couple, or equilibrium.`]),
].join('');

BOOK.f4_rest = [
  B.why(T`<p>A tennis ball bounces, a lump of clay doesn't. Conservation of momentum alone can't tell you what happens after a collision — you also need to know how "bouncy" it is. Newton's experimental law adds that information as one number, $e$.</p>`),
  B.def("Newton's law of restitution", T`<p>For a direct collision, $$\text{speed of separation}=e\times\text{speed of approach},\qquad0\le e\le1.$$ $e=1$: perfectly elastic (no kinetic energy lost). $e=0$: perfectly inelastic (the bodies move together).</p>`),
  B.thm('Two spheres', T`<p>With velocities in the same positive direction: $$m_1u_1+m_2u_2=m_1v_1+m_2v_2,\qquad v_2-v_1=e(u_1-u_2).$$ Sphere hitting a fixed plane at right angles: rebound speed $eu$.</p>`),
  B.ex(1, T`$A$ ($2$ kg, $5$ m s⁻¹) hits $B$ ($3$ kg, $-1$ m s⁻¹) directly; $e=0.6$. Find their velocities.`, [T`$2v_A+3v_B=7$; $v_B-v_A=0.6(6)=3.6$.`, T`$v_A=-0.76$, $v_B=2.84$ m s⁻¹ — $A$ bounces back.`]),
  B.ex(2, T`A ball dropped from $2.5$ m bounces with $e=0.6$. Find the first rebound height and the total distance travelled before it stops.`, [T`First rebound: $e^2h=0.9$ m.`, T`Total: $2.5+2(0.9)+2(0.9)(0.36)+\dots=2.5+\frac{2(0.9)}{1-0.36}=5.31$ m.`]),
  B.warn([T`Writing $v_1-v_2$ instead of $v_2-v_1$ (separation must be positive for the order chosen).`, T`Forgetting a sign for a velocity in the opposite direction.`]),
  B.exam([T`Draw before/after diagrams with all velocities in the positive direction, then use two equations.`]),
  B.checks([[T`Ball hits a wall at $8$ m s⁻¹, $e=0.25$. Rebound speed?`, T`$2$ m s⁻¹.`]]),
  B.examq(9, T`<p>A sphere $A$ of mass $2m$ moving with speed $3u$ collides directly with a sphere $B$ of mass $m$ moving with speed $u$ in the same direction. The coefficient of restitution is $e$.</p><p>(a) Find the velocities of $A$ and $B$ after the collision in terms of $u$ and $e$. <span class="mk">[5]</span> (b) Show that $A$ continues in the same direction. <span class="mk">[1]</span> (c) Given $e=\frac12$, find the fraction of the kinetic energy lost. <span class="mk">[3]</span></p>`,
    T`<p>(a) $2m(3u)+mu=2mv_A+mv_B$ <span class="mk">M1</span>; $v_B-v_A=e(2u)$ <span class="mk">M1</span>. $v_A=\frac{u(7-2e)}3$, $v_B=\frac{u(7+4e)}3$ <span class="mk">A1 A1 A1</span>.</p><p>(b) $7-2e\gt0$ for $e\le1$ <span class="mk">B1</span>. (c) $v_A=2u$, $v_B=3u$; KE before $9.5mu^2$, after $8.5mu^2$ <span class="mk">M1 A1</span>; fraction $\frac2{19}$ <span class="mk">A1</span>.</p>`),
  B.key([T`Momentum + restitution: two equations, two unknowns.`, T`Plane: $v=eu$; dropped ball rebounds to $e^2h$.`]),
].join('');
