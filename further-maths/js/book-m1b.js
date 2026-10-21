// BcsMaths textbook — Maths AS 1, part 2: Circles; Binomial expansion; Trigonometry; Exponentials.
'use strict';

/* ===================================================================== */
BOOK.m_circ = [
  B.why(T`<p>A circle is the set of points at a fixed distance from a centre — so its equation is just the distance formula. Circle questions then combine everything from straight lines: gradients of radii, perpendicular tangents, midpoints of chords, and the discriminant to decide whether a line cuts, touches or misses.</p>`),
  B.thm('Equation of a circle', T`<p>Centre $(a,b)$, radius $r$: $$(x-a)^2+(y-b)^2=r^2.$$ Expanded form: $x^2+y^2+2gx+2fy+c=0$ has centre $(-g,-f)$ and radius $\sqrt{g^2+f^2-c}$ (a real circle only if $g^2+f^2-c\gt0$).</p>`),
  B.opt(T`<p>$P(x,y)$ is on the circle $\iff$ its distance from $(a,b)$ is $r$ $\iff\sqrt{(x-a)^2+(y-b)^2}=r\iff(x-a)^2+(y-b)^2=r^2$.</p><p>Completing the square on the expanded form: $x^2+2gx=(x+g)^2-g^2$ and $y^2+2fy=(y+f)^2-f^2$, so the equation becomes $(x+g)^2+(y+f)^2=g^2+f^2-c$.</p>`),
  B.thm('Circle geometry you must use', T`<ul><li>The <b>tangent</b> at a point is perpendicular to the radius there.</li><li>The perpendicular from the centre to a <b>chord</b> bisects the chord (so the perpendicular bisector of any chord passes through the centre).</li><li>The <b>angle in a semicircle</b> is a right angle (so a right-angled triangle's hypotenuse is a diameter of its circumcircle).</li></ul>`),
  B.opt(T`<p>Chord $AB$ with centre $O$: $OA=OB$ (radii), so triangle $OAB$ is isosceles and the perpendicular from $O$ meets $AB$ at its midpoint.</p>`, 'Why the perpendicular bisects a chord'),
  B.ex(1, T`Find the centre and radius of $x^2+y^2-6x+4y-12=0$.`, [
    T`Complete the square: $(x-3)^2-9+(y+2)^2-4-12=0$.`,
    T`$(x-3)^2+(y+2)^2=25$: centre $(3,-2)$, radius $5$.`]),
  B.ex(2, T`Find the tangent to that circle at $P(6,2)$.`, [
    T`Check $P$ is on it: $3^2+4^2=25$ ✓.`,
    T`Gradient of radius $CP=\dfrac{2-(-2)}{6-3}=\dfrac43$, so the tangent gradient is $-\dfrac34$.`,
    T`$y-2=-\tfrac34(x-6)\Rightarrow4y-8=-3x+18\Rightarrow3x+4y-26=0$.`]),
  B.ex(3, T`Find the circle with diameter $AB$, where $A(-1,4)$ and $B(5,-4)$.`, [
    T`Centre = midpoint $(2,0)$.`,
    T`$AB=\sqrt{6^2+8^2}=10$, so $r=5$.`,
    T`$(x-2)^2+y^2=25$.`]),
  B.ex(4, T`Show that $y=3x-10$ is a tangent to $x^2+y^2=10$ and find the point of contact.`, [
    T`Substitute: $x^2+(3x-10)^2=10\Rightarrow10x^2-60x+90=0\Rightarrow x^2-6x+9=0$.`,
    T`$\Delta=36-36=0$: one repeated root, so the line is a tangent.`,
    T`$x=3$, $y=-1$: contact at $(3,-1)$.`]),
  B.ex(5, T`Find the circle through $(1,1)$, $(7,1)$ and $(1,9)$.`, [
    T`The sides from $(1,1)$ are horizontal and vertical, so the angle there is $90^\circ$.`,
    T`Angle in a semicircle $\Rightarrow$ the hypotenuse from $(7,1)$ to $(1,9)$ is a diameter.`,
    T`Centre $(4,5)$, radius $\tfrac12\sqrt{36+64}=5$: $(x-4)^2+(y-5)^2=25$.`], T`Without a right angle, intersect the perpendicular bisectors of two chords to find the centre.`),
  B.warn([
    T`Sign of the centre: $(x+3)^2$ means $a=-3$.`,
    T`Writing $r=25$ instead of $r^2=25$.`,
    T`Using the gradient of the radius as the tangent gradient (take the negative reciprocal).`,
    T`Forgetting to divide by the $x^2$ coefficient first if the equation is $2x^2+2y^2+\dots$.`]),
  B.exam([
    T`To show a point is on a circle, substitute and show the equation balances — one clear line.`,
    T`For tangent lengths from an external point, Pythagoras with the radius is often quicker than finding the tangent.`,
    T`Line meets circle: substitute, collect into a quadratic, and quote the discriminant condition.`]),
  B.checks([
    [T`Centre and radius of $x^2+y^2+8x-10y+5=0$?`, T`$(x+4)^2+(y-5)^2=36$: centre $(-4,5)$, $r=6$.`],
    [T`Is $(2,3)$ inside, on or outside $(x-1)^2+y^2=9$?`, T`$1+9=10\gt9$: outside.`],
    [T`Equation of the circle centre $(0,0)$ through $(5,12)$?`, T`$x^2+y^2=169$.`]]),
  B.examq(10, T`<p>The circle $C$ has equation $x^2+y^2-4x-2y-20=0$.</p><p>(a) Find the centre and radius of $C$. <span class="mk">[3]</span></p><p>(b) Show that $P(5,5)$ lies on $C$. <span class="mk">[1]</span></p><p>(c) Find the equation of the tangent to $C$ at $P$. <span class="mk">[3]</span></p><p>(d) The tangent meets the $x$-axis at $Q$. Find the length $PQ$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $(x-2)^2+(y-1)^2=25$ <span class="mk">M1</span>: centre $(2,1)$ <span class="mk">A1</span>, radius $5$. <span class="mk">A1</span></p>
<p>(b) $(5-2)^2+(5-1)^2=9+16=25$ ✓ <span class="mk">B1</span></p>
<p>(c) Radius gradient $\tfrac43$, tangent gradient $-\tfrac34$ <span class="mk">M1</span>; $y-5=-\tfrac34(x-5)$ <span class="mk">M1</span> $\Rightarrow3x+4y-35=0$. <span class="mk">A1</span></p>
<p>(d) $y=0\Rightarrow Q\left(\tfrac{35}3,0\right)$ <span class="mk">B1</span>; $PQ=\sqrt{\left(\tfrac{20}3\right)^2+5^2}$ <span class="mk">M1</span> $=\sqrt{\tfrac{625}9}=\tfrac{25}3$. <span class="mk">A1</span></p>`),
  B.key([T`$(x-a)^2+(y-b)^2=r^2$; complete the square to find centre and radius.`, T`Tangent $\perp$ radius; perpendicular from centre bisects a chord; angle in a semicircle $=90^\circ$.`, T`Line and circle: substitute, then use the discriminant.`]),
].join('');

/* ===================================================================== */
BOOK.m_bin = [
  B.why(T`<p>Expanding $(a+b)^{10}$ by hand would take ten multiplications. The <b>binomial theorem</b> writes down any term directly, and lets you find a single coefficient, a term independent of $x$, or an approximation like $1.02^5$ in a couple of lines.</p>`),
  B.def('factorials and combinations', T`<p>$n!=n(n-1)(n-2)\cdots2\cdot1$, with $0!=1$.</p><p>$\displaystyle\binom nr={}^nC_r=\frac{n!}{r!\,(n-r)!}$ = the number of ways of choosing $r$ objects from $n$. Note $\binom n0=\binom nn=1$ and $\binom nr=\binom n{n-r}$.</p>`),
  B.thm('Binomial theorem (positive integer n)', T`$$(a+b)^n=\sum_{r=0}^{n}\binom nr a^{n-r}b^{r}=a^n+\binom n1a^{n-1}b+\binom n2a^{n-2}b^2+\dots+b^n.$$<p>In particular $(1+x)^n=1+nx+\dfrac{n(n-1)}{2!}x^2+\dfrac{n(n-1)(n-2)}{3!}x^3+\dots+x^n$.</p>`),
  B.opt(T`<p>$(a+b)^n=(a+b)(a+b)\cdots(a+b)$ ($n$ brackets). Each term of the expansion comes from choosing $a$ or $b$ from every bracket. A term $a^{n-r}b^r$ arises from choosing $b$ from exactly $r$ of the $n$ brackets — and there are $\binom nr$ ways to choose which $r$. So the coefficient of $a^{n-r}b^r$ is $\binom nr$.</p>`, 'Why the coefficients are ⁿCᵣ'),
  B.thm("Pascal's rule", T`<p>$\dbinom nr=\dbinom{n-1}{r-1}+\dbinom{n-1}{r}$ — each entry of Pascal's triangle is the sum of the two above it.</p>`),
  B.opt(T`<p>Choose $r$ objects from $n$, and look at one particular object $X$. Either $X$ is chosen (then pick the other $r-1$ from the remaining $n-1$: $\binom{n-1}{r-1}$ ways) or it is not (pick all $r$ from the other $n-1$: $\binom{n-1}r$ ways). Adding the two cases counts every choice exactly once.</p>`),
  B.ex(1, T`Expand $(2+x)^4$.`, [
    T`Row 4 of Pascal: $1,4,6,4,1$.`,
    T`$2^4+4\cdot2^3x+6\cdot2^2x^2+4\cdot2x^3+x^4$.`,
    T`$=16+32x+24x^2+8x^3+x^4$.`]),
  B.ex(2, T`Find the coefficient of $x^3$ in $(3-2x)^5$.`, [
    T`General term $\binom5r3^{5-r}(-2x)^r$; $x^3$ needs $r=3$.`,
    T`$\binom53\,3^2\,(-2)^3=10\times9\times(-8)=-720$.`], T`Keep the $-2$ inside the bracket: $(-2x)^3=-8x^3$.`),
  B.ex(3, T`In the expansion of $(1+kx)^8$, the coefficient of $x^2$ is $112$ and $k\gt0$. Find $k$ and the coefficient of $x$.`, [
    T`$x^2$ term: $\binom82(kx)^2=28k^2x^2$, so $28k^2=112\Rightarrow k^2=4\Rightarrow k=2$.`,
    T`$x$ term: $\binom81(kx)=8kx=16x$. Coefficient $16$.`]),
  B.ex(4, T`Find the term independent of $x$ in $\left(x+\dfrac2x\right)^6$.`, [
    T`General term: $\binom6r x^{6-r}\left(\frac2x\right)^r=\binom6r2^r x^{6-2r}$.`,
    T`Independent of $x$: $6-2r=0\Rightarrow r=3$.`,
    T`$\binom63\cdot2^3=20\times8=160$.`]),
  B.ex(5, T`Use the expansion of $(1+x)^5$ to estimate $1.02^5$.`, [
    T`$(1+x)^5=1+5x+10x^2+10x^3+\dots$ with $x=0.02$.`,
    T`$1+0.1+10(0.0004)+10(0.000008)=1+0.1+0.004+0.00008=1.10408$.`], T`The terms shrink quickly because $x$ is small; the true value is $1.1040808\ldots$`),
  B.ex(6, T`Find the coefficient of $x^2$ in $(1+x)(2-x)^4$.`, [
    T`$(2-x)^4=16-32x+24x^2-8x^3+x^4$.`,
    T`$x^2$ terms come from $1\times24x^2$ and $x\times(-32x)$.`,
    T`Coefficient $24-32=-8$.`]),
  B.warn([
    T`Writing $2x^3$ instead of $(2x)^3=8x^3$ — bracket the whole second term.`,
    T`Losing negative signs: $(-2x)^r$ alternates in sign.`,
    T`Off-by-one: the term in $x^r$ is the $(r+1)$th term.`,
    T`Using $\binom nr$ with $r$ for the power of $a$ instead of $b$ (harmless only because $\binom nr=\binom n{n-r}$ — but the powers must match).`]),
  B.exam([
    T`Write the general term first — it makes "find the coefficient" questions almost mechanical.`,
    T`"Simplify each term" means numerical coefficients evaluated, e.g. $-720x^3$, not $\binom53 3^2(-2)^3x^3$.`,
    T`For an estimate, state the value of $x$ you used.`]),
  B.checks([
    [T`Evaluate $\binom72$.`, T`$\frac{7\cdot6}{2}=21$.`],
    [T`Coefficient of $x^2$ in $(1-3x)^6$?`, T`$15\times9=135$.`],
    [T`First three terms of $(2+x)^7$?`, T`$128+448x+672x^2$.`]]),
  B.examq(8, T`<p>(a) Find the first four terms, in ascending powers of $x$, of $\left(2-\tfrac x2\right)^6$, simplifying each term. <span class="mk">[4]</span></p><p>(b) Hence find the coefficient of $x^2$ in $(1+2x)\left(2-\tfrac x2\right)^6$. <span class="mk">[2]</span></p><p>(c) Use your answer to (a), with a suitable value of $x$, to estimate $1.99^6$, giving your answer to 4 decimal places. <span class="mk">[2]</span></p>`,
    T`<p>(a) $2^6+\binom61 2^5\left(-\tfrac x2\right)+\binom62 2^4\left(-\tfrac x2\right)^2+\binom63 2^3\left(-\tfrac x2\right)^3$ <span class="mk">M1</span> $=64-96x+60x^2-20x^3$. <span class="mk">A1 A1 A1</span></p>
<p>(b) $60+2(-96)$ <span class="mk">M1</span> $=-132$. <span class="mk">A1</span></p>
<p>(c) $2-\tfrac x2=1.99\Rightarrow x=0.02$ <span class="mk">M1</span>; $64-1.92+0.024-0.00016=62.10384\approx62.1038$. <span class="mk">A1</span></p>`),
  B.key([T`$\binom nr=\frac{n!}{r!(n-r)!}$; Pascal: $\binom nr=\binom{n-1}{r-1}+\binom{n-1}r$.`, T`General term $\binom nr a^{n-r}b^r$.`, T`Independent of $x$: set the total power to zero.`, T`Small $x$: the first few terms give a good approximation.`]),
].join('');

/* ===================================================================== */
BOOK.m_tri = [
  B.why(T`<p>Right-angled trigonometry (SOHCAHTOA) only works in right-angled triangles. The <b>sine rule</b> and <b>cosine rule</b> work in <i>every</i> triangle, so you can solve surveying, navigation and bearings problems directly. The one trap is the <b>ambiguous case</b>, where the given data fit two different triangles.</p>`),
  B.def('labelling', T`<p>In triangle $ABC$, side $a$ is opposite angle $A$, side $b$ opposite $B$, side $c$ opposite $C$.</p>`),
  B.thm('Sine rule', T`$$\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}\qquad\text{(or }\tfrac{\sin A}{a}=\tfrac{\sin B}{b}=\tfrac{\sin C}{c}\text{ for angles).}$$`),
  B.opt(T`<p>Drop the perpendicular from $C$ to the line $AB$; call its length $h$. In the two right-angled triangles, $h=b\sin A$ and $h=a\sin B$. So $b\sin A=a\sin B$, i.e. $\frac a{\sin A}=\frac b{\sin B}$. Dropping a perpendicular from $A$ gives the same for $c$. (If $B$ is obtuse the foot lies outside, but $\sin(180^\circ-B)=\sin B$ keeps the formula.)</p>`),
  B.thm('Cosine rule', T`$$a^2=b^2+c^2-2bc\cos A\qquad\Longleftrightarrow\qquad\cos A=\frac{b^2+c^2-a^2}{2bc}.$$`),
  B.opt(T`<p>Put $C$ at the origin with $CB$ along the $x$-axis: $B=(a,0)$ and $A=(b\cos C,\ b\sin C)$. Then $$c^2=AB^2=(a-b\cos C)^2+(b\sin C)^2=a^2-2ab\cos C+b^2(\cos^2C+\sin^2C)=a^2+b^2-2ab\cos C.$$ Relabelling gives the version for any angle. When $C=90^\circ$ it is Pythagoras.</p>`),
  B.thm('Area of a triangle', T`$$\text{Area}=\tfrac12ab\sin C.$$<p>(Two sides and the angle <b>between</b> them.)</p>`),
  B.opt(T`<p>With the same coordinates, the height of $A$ above $CB$ is $b\sin C$, so area $=\frac12\times\text{base}\times\text{height}=\frac12a\,b\sin C$.</p>`),
  T`<h3>Which rule?</h3><ul><li>Two angles and a side, or two sides and a non-included angle $\Rightarrow$ <b>sine rule</b>.</li><li>Three sides, or two sides and the included angle $\Rightarrow$ <b>cosine rule</b>.</li></ul>`,
  B.ex(1, T`In triangle $ABC$, $a=7$, $b=5$, $C=60^\circ$. Find $c$.`, [
    T`Two sides and the included angle: cosine rule.`,
    T`$c^2=49+25-2(7)(5)\cos60^\circ=74-35=39$, so $c=\sqrt{39}\approx6.24$.`]),
  B.ex(2, T`Find the largest angle of the triangle with sides $5$, $7$, $9$.`, [
    T`The largest angle is opposite the largest side ($9$).`,
    T`$\cos\theta=\dfrac{5^2+7^2-9^2}{2(5)(7)}=\dfrac{-7}{70}=-0.1$.`,
    T`$\theta=95.7^\circ$ (negative cosine $\Rightarrow$ obtuse).`]),
  B.ex(3, T`In triangle $ABC$, $A=35^\circ$, $a=3.2$, $b=5$. Find the possible values of $B$ and $c$.`, [
    T`$\sin B=\dfrac{b\sin A}{a}=\dfrac{5\sin35^\circ}{3.2}=0.8962$.`,
    T`$B=63.7^\circ$ <b>or</b> $B=180^\circ-63.7^\circ=116.3^\circ$. Both leave room for $C$ ($35+116.3\lt180$), so both triangles exist.`,
    T`$B=63.7^\circ\Rightarrow C=81.3^\circ$, $c=\dfrac{3.2\sin81.3^\circ}{\sin35^\circ}=5.52$. $B=116.3^\circ\Rightarrow C=28.7^\circ$, $c=2.68$.`], T`This is the <b>ambiguous case</b>. It happens when the given angle is not between the given sides and the side opposite it is the shorter one. Open the triangle simulation in "ambiguous" mode to see both triangles.`),
  B.ex(4, T`Find the area of a triangle with sides $8$ cm and $11$ cm and included angle $40^\circ$.`, [
    T`$\tfrac12(8)(11)\sin40^\circ=44\times0.6428=28.3\text{ cm}^2$.`]),
  B.ex(5, T`A ship sails $12$ km on a bearing of $030^\circ$ from $A$ to $B$, then $8$ km on a bearing of $110^\circ$ to $C$. Find $AC$.`, [
    T`At $B$, the bearing back to $A$ is $210^\circ$, so angle $ABC=210^\circ-110^\circ=100^\circ$.`,
    T`$AC^2=12^2+8^2-2(12)(8)\cos100^\circ=208+33.3=241.3$.`,
    T`$AC=15.5$ km.`]),
  B.warn([
    T`Calculator in radians when the question is in degrees.`,
    T`Missing the second (obtuse) solution in the ambiguous case — or inventing one when it doesn't fit (check the angle sum).`,
    T`Using $\tfrac12ab\sin C$ with an angle that is not between $a$ and $b$.`,
    T`Rounding intermediate values early; keep full calculator values.`]),
  B.exam([
    T`Write the rule in letters first, then substitute — it secures the method mark.`,
    T`When an angle comes from the sine rule, ask "could it be obtuse?" every time.`,
    T`Bearings: draw a clear diagram with north lines; most errors are in the angle at the turning point.`]),
  B.checks([
    [T`Find $a$ if $b=6$, $c=8$, $A=90^\circ$.`, T`$a^2=36+64-0=100$, $a=10$ (Pythagoras).`],
    [T`$A=40^\circ$, $B=75^\circ$, $a=10$. Find $b$.`, T`$b=\frac{10\sin75^\circ}{\sin40^\circ}=15.0$.`],
    [T`Can $\sin B=1.2$ arise from the sine rule?`, T`No such triangle exists — the side opposite $A$ is too short to reach.`]]),
  B.examq(6, T`<p>In triangle $PQR$, $PQ=8$ cm, $QR=6$ cm and angle $PQR=110^\circ$.</p><p>(a) Find $PR$. <span class="mk">[2]</span></p><p>(b) Find angle $QPR$. <span class="mk">[2]</span></p><p>(c) Find the area of the triangle. <span class="mk">[2]</span></p>`,
    T`<p>(a) $PR^2=8^2+6^2-2(8)(6)\cos110^\circ$ <span class="mk">M1</span> $=132.83$, $PR=11.5$ cm. <span class="mk">A1</span></p>
<p>(b) $\sin P=\dfrac{6\sin110^\circ}{11.525}$ <span class="mk">M1</span> $=0.4892$, $P=29.3^\circ$ (acute, since $Q$ is obtuse). <span class="mk">A1</span></p>
<p>(c) $\tfrac12(8)(6)\sin110^\circ$ <span class="mk">M1</span> $=22.6\text{ cm}^2$. <span class="mk">A1</span></p>`),
  B.key([T`Sine rule: $\frac a{\sin A}=\frac b{\sin B}$. Cosine rule: $a^2=b^2+c^2-2bc\cos A$.`, T`Area $=\frac12ab\sin C$.`, T`Ambiguous case: $\sin B=k$ gives $B$ and $180^\circ-B$; check both fit.`]),
].join('');

/* ===================================================================== */
BOOK.m_rad = [
  B.why(T`<p>Degrees are an arbitrary choice (why 360?). <b>Radians</b> measure an angle by the arc it cuts off, which makes arc length and sector area formulas beautifully simple — and later makes calculus with trig functions work.</p>`),
  B.def('radian', T`<p>One radian is the angle at the centre of a circle subtended by an arc equal in length to the radius. A full turn is the circumference divided by the radius: $\frac{2\pi r}{r}=2\pi$ radians. So $$\pi\text{ rad}=180^\circ,\qquad1\text{ rad}=\frac{180^\circ}{\pi}\approx57.3^\circ.$$</p>`),
  T`<p>Key conversions: $30^\circ=\frac\pi6$, $45^\circ=\frac\pi4$, $60^\circ=\frac\pi3$, $90^\circ=\frac\pi2$, $120^\circ=\frac{2\pi}3$, $135^\circ=\frac{3\pi}4$, $150^\circ=\frac{5\pi}6$, $270^\circ=\frac{3\pi}2$.</p>`,
  B.thm('Arc length and sector area (θ in radians)', T`$$s=r\theta,\qquad A=\tfrac12r^2\theta,\qquad\text{segment area}=\tfrac12r^2(\theta-\sin\theta).$$`),
  B.opt(T`<p>A sector of angle $\theta$ is the fraction $\frac{\theta}{2\pi}$ of the whole circle. So the arc is $\frac{\theta}{2\pi}\times2\pi r=r\theta$ and the area is $\frac\theta{2\pi}\times\pi r^2=\frac12r^2\theta$. The segment is the sector minus the triangle, whose area is $\frac12r\cdot r\sin\theta$.</p>`),
  B.ex(1, T`Convert $135^\circ$ to radians and $2.5$ rad to degrees.`, [
    T`$135\times\frac{\pi}{180}=\frac{3\pi}4$.`,
    T`$2.5\times\frac{180}{\pi}=143.2^\circ$.`]),
  B.ex(2, T`A sector has radius $6$ cm and angle $1.2$ rad. Find its arc length, area and perimeter.`, [
    T`$s=6\times1.2=7.2$ cm.`,
    T`$A=\tfrac12\times36\times1.2=21.6\text{ cm}^2$.`,
    T`Perimeter $=2r+s=12+7.2=19.2$ cm.`]),
  B.ex(3, T`A sector of radius $6$ cm has perimeter $20$ cm. Find its angle and area.`, [
    T`$12+6\theta=20\Rightarrow\theta=\tfrac43$ rad.`,
    T`$A=\tfrac12\times36\times\tfrac43=24\text{ cm}^2$.`]),
  B.ex(4, T`Find the area of the segment cut off by a chord subtending $\frac\pi3$ at the centre of a circle of radius $10$.`, [
    T`$\tfrac12(10)^2\left(\tfrac\pi3-\sin\tfrac\pi3\right)=50\left(1.0472-0.8660\right)$.`,
    T`$=9.06$ (3 s.f.).`]),
  B.warn([
    T`Using $s=r\theta$ with $\theta$ in degrees.`,
    T`Calculator still in degree mode when finding $\sin\theta$ for a segment.`,
    T`Sector perimeter: forgetting the two radii.`]),
  B.exam([
    T`If an angle is given as a plain number (no degree sign), it is in radians.`,
    T`Exact answers: leave $\pi$ in, e.g. arc $=\frac{5\pi}{3}$ cm.`]),
  B.checks([
    [T`Convert $\frac{5\pi}6$ to degrees.`, T`$150^\circ$.`],
    [T`Arc length of a sector radius $4$, angle $\frac\pi4$?`, T`$\pi$.`],
    [T`Sector area radius $3$, angle $2$ rad?`, T`$9$.`]]),
  B.examq(8, T`<p>A sector $OAB$ of a circle has radius $r$ cm and angle $\theta$ radians. Its perimeter is $24$ cm and its area is $32\text{ cm}^2$.</p><p>(a) Show that $r^2-12r+32=0$, and hence find the two possible pairs of values of $r$ and $\theta$. <span class="mk">[6]</span></p><p>(b) For the larger value of $r$, find the area of the segment cut off by the chord $AB$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $2r+r\theta=24$ <span class="mk">B1</span>, $\tfrac12r^2\theta=32$ <span class="mk">B1</span>. From the second, $r\theta=\frac{64}{r}$, so $2r+\frac{64}r=24$ <span class="mk">M1</span> $\Rightarrow2r^2-24r+64=0\Rightarrow r^2-12r+32=0$. <span class="mk">A1</span> $(r-4)(r-8)=0$: $r=4,\ \theta=4$ or $r=8,\ \theta=1$. <span class="mk">M1 A1</span></p>
<p>(b) $\tfrac12(64)(1-\sin1)$ <span class="mk">M1</span> $=5.07\text{ cm}^2$. <span class="mk">A1</span></p>`),
  B.key([T`$\pi$ rad $=180^\circ$.`, T`$s=r\theta$, $A=\frac12r^2\theta$ — radians only.`, T`Segment $=\frac12r^2(\theta-\sin\theta)$.`]),
].join('');

/* ===================================================================== */
BOOK.m_tgraph = [
  B.why(T`<p>Sine, cosine and tangent are defined for <i>every</i> angle — not just those in a right-angled triangle — by going round the unit circle. Their graphs are waves, and knowing their shape, symmetries and exact values is what makes solving trig equations possible.</p>`),
  B.def('unit-circle definitions', T`<p>Rotate the radius of a unit circle anticlockwise by $\theta$ from the positive $x$-axis. The point reached is $(\cos\theta,\ \sin\theta)$, and $\tan\theta=\dfrac{\sin\theta}{\cos\theta}$ (the gradient of the radius).</p>`),
  T`<h3>1. The graphs</h3>
<ul><li>$y=\sin x$: period $360^\circ$, range $[-1,1]$, zeros at $0^\circ,180^\circ,360^\circ$; max at $90^\circ$.</li>
<li>$y=\cos x$: period $360^\circ$, range $[-1,1]$, the sine graph shifted $90^\circ$ left; max at $0^\circ$.</li>
<li>$y=\tan x$: period $180^\circ$, all real values, vertical asymptotes at $x=90^\circ+180^\circ k$ (where $\cos x=0$).</li></ul>`,
  B.thm('Symmetries (from the unit circle)', T`$$\sin(180^\circ-\theta)=\sin\theta,\quad\cos(-\theta)=\cos\theta,\quad\cos(360^\circ-\theta)=\cos\theta,\quad\tan(180^\circ+\theta)=\tan\theta.$$<p><b>CAST</b>: in quadrant 1 All are positive, quadrant 2 Sine, quadrant 3 Tan, quadrant 4 Cos.</p>`),
  T`<h3>2. Exact values</h3>`,
  B.opt(T`<p><b>30° and 60°:</b> take an equilateral triangle of side $2$ and cut it in half. You get a right-angled triangle with hypotenuse $2$, short side $1$ and height $\sqrt{2^2-1^2}=\sqrt3$, with angles $30^\circ$ and $60^\circ$. So $\sin30^\circ=\cos60^\circ=\frac12$, $\sin60^\circ=\cos30^\circ=\frac{\sqrt3}2$, $\tan30^\circ=\frac1{\sqrt3}$, $\tan60^\circ=\sqrt3$.</p>
<p><b>45°:</b> an isosceles right-angled triangle with legs $1$ has hypotenuse $\sqrt2$: $\sin45^\circ=\cos45^\circ=\frac1{\sqrt2}=\frac{\sqrt2}2$, $\tan45^\circ=1$.</p>`, 'Deriving the exact values'),
  T`<table class="tbl"><tr><th>$\theta$</th><th>$0^\circ$</th><th>$30^\circ$</th><th>$45^\circ$</th><th>$60^\circ$</th><th>$90^\circ$</th></tr><tr><td>$\sin$</td><td>$0$</td><td>$\frac12$</td><td>$\frac{\sqrt2}2$</td><td>$\frac{\sqrt3}2$</td><td>$1$</td></tr><tr><td>$\cos$</td><td>$1$</td><td>$\frac{\sqrt3}2$</td><td>$\frac{\sqrt2}2$</td><td>$\frac12$</td><td>$0$</td></tr><tr><td>$\tan$</td><td>$0$</td><td>$\frac1{\sqrt3}$</td><td>$1$</td><td>$\sqrt3$</td><td>not defined</td></tr></table>`,
  B.ex(1, T`Find the exact value of $\cos210^\circ$.`, [
    T`$210^\circ$ is in quadrant 3 (only tan positive), reference angle $30^\circ$.`,
    T`$\cos210^\circ=-\cos30^\circ=-\frac{\sqrt3}2$.`]),
  B.ex(2, T`Find the exact value of $\tan315^\circ$.`, [
    T`Quadrant 4 (cos positive, tan negative), reference angle $45^\circ$.`,
    T`$\tan315^\circ=-1$.`]),
  T`<h3>3. Transformed trig graphs</h3><p>$y=a\sin(bx+c)+d$: amplitude $|a|$, period $\frac{360^\circ}{b}$, translated by $c$ (inside the bracket — "backwards") and $d$ (up).</p>`,
  B.ex(3, T`Sketch $y=2\sin(x+30^\circ)$ for $0^\circ\le x\le360^\circ$.`, [
    T`$y=\sin x$ translated $30^\circ$ left and stretched vertically by $2$: range $[-2,2]$.`,
    T`$y$-intercept $2\sin30^\circ=1$. Max $2$ at $x=60^\circ$; min $-2$ at $x=240^\circ$.`,
    T`Zeros where $x+30^\circ=180^\circ,360^\circ$: $x=150^\circ,330^\circ$.`]),
  B.ex(4, T`State the period of $y=\cos3x$ and of $y=\tan\frac x2$.`, [
    T`$\cos3x$: $\frac{360^\circ}3=120^\circ$.`,
    T`$\tan\frac x2$: $\frac{180^\circ}{1/2}=360^\circ$.`]),
  B.warn([
    T`$\tan x$ has period $180^\circ$, not $360^\circ$.`,
    T`$y=\sin2x$ has period $180^\circ$ (it oscillates <i>faster</i>), not $720^\circ$.`,
    T`$y=\sin(x+30^\circ)$ moves left, not right.`,
    T`Drawing $\tan x$ as continuous through its asymptotes.`]),
  B.exam([
    T`Sketches: mark the intercepts, the max/min values and where the curve meets the axes within the given interval; draw asymptotes for tan.`,
    T`Exact values must be exact: $\frac{\sqrt3}{2}$, not $0.866$.`]),
  B.checks([
    [T`$\sin150^\circ$?`, T`$\frac12$.`],
    [T`$\cos300^\circ$?`, T`$\frac12$.`],
    [T`Amplitude and period of $y=4\cos2x$?`, T`$4$; $180^\circ$.`]]),
  B.examq(8, T`<p>(a) Write down the exact values of $\sin120^\circ$ and $\cos315^\circ$. <span class="mk">[2]</span></p><p>(b) Sketch $y=3\cos2x$ for $0^\circ\le x\le360^\circ$, showing where it meets the axes. <span class="mk">[3]</span></p><p>(c) Hence state the number of solutions of $3\cos2x=1$ in this interval. <span class="mk">[1]</span></p><p>(d) The graph of $y=a\sin(x-b)$, where $0\lt b\lt180^\circ$, has a maximum point at $(110^\circ,4)$. Find $a$ and $b$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\frac{\sqrt3}2$ <span class="mk">B1</span>, $\frac{\sqrt2}2$ <span class="mk">B1</span>.</p>
<p>(b) Cos shape, two full waves <span class="mk">B1</span>; max $3$ at $0^\circ,180^\circ,360^\circ$ and min $-3$ at $90^\circ,270^\circ$ <span class="mk">B1</span>; zeros at $45^\circ,135^\circ,225^\circ,315^\circ$. <span class="mk">B1</span></p>
<p>(c) The line $y=1$ cuts the curve $4$ times. <span class="mk">B1</span></p>
<p>(d) $a=4$; maximum where $x-b=90^\circ$, so $b=20^\circ$. <span class="mk">B1 B1</span></p>`),
  B.key([T`$(\cos\theta,\sin\theta)$ on the unit circle; $\tan=\sin/\cos$.`, T`Periods: $\sin,\cos$ $360^\circ$; $\tan$ $180^\circ$; $\sin bx$ has period $360^\circ/b$.`, T`CAST and reference angles give signs and exact values.`]),
].join('');

/* ===================================================================== */
BOOK.m_tid = [
  B.why(T`<p>An <b>identity</b> ($\equiv$) is true for <i>every</i> value of the variable; an <b>equation</b> is true only for some. Two identities do almost all the work at AS — $\tan\theta\equiv\frac{\sin\theta}{\cos\theta}$ and $\sin^2\theta+\cos^2\theta\equiv1$ — both to prove other identities and to turn awkward equations into quadratics.</p>`),
  B.thm('The two AS identities', T`$$\tan\theta\equiv\frac{\sin\theta}{\cos\theta}\quad(\cos\theta\ne0),\qquad\sin^2\theta+\cos^2\theta\equiv1.$$<p>Rearranged: $\sin^2\theta\equiv1-\cos^2\theta$, $\cos^2\theta\equiv1-\sin^2\theta$.</p>`),
  B.opt(T`<p>On the unit circle the point at angle $\theta$ is $(\cos\theta,\sin\theta)$. The radius has gradient $\frac{\sin\theta}{\cos\theta}$, which is $\tan\theta$. The point lies on $x^2+y^2=1$ (distance 1 from the origin — Pythagoras), so $\cos^2\theta+\sin^2\theta=1$.</p>`),
  T`<h3>How to prove an identity</h3>
<ol><li>Start with the more complicated side; work on it alone until it becomes the other side. Do <b>not</b> treat it as an equation (no cross-multiplying both sides).</li>
<li>Convert $\tan$ to $\frac{\sin}{\cos}$.</li>
<li>Use algebra: common denominators, factorising, difference of two squares, and swapping $1-\cos^2\theta$ for $\sin^2\theta$ (and vice versa).</li></ol>`,
  B.ex(1, T`Prove that $\dfrac{1-\cos^2\theta}{\cos\theta}\equiv\sin\theta\tan\theta$.`, [
    T`LHS $=\dfrac{\sin^2\theta}{\cos\theta}$ (using $1-\cos^2\theta\equiv\sin^2\theta$).`,
    T`$=\sin\theta\cdot\dfrac{\sin\theta}{\cos\theta}=\sin\theta\tan\theta=$ RHS. $\blacksquare$`]),
  B.ex(2, T`Prove that $(\sin\theta+\cos\theta)^2\equiv1+2\sin\theta\cos\theta$.`, [
    T`LHS $=\sin^2\theta+2\sin\theta\cos\theta+\cos^2\theta$.`,
    T`$=(\sin^2\theta+\cos^2\theta)+2\sin\theta\cos\theta=1+2\sin\theta\cos\theta$. $\blacksquare$`]),
  B.ex(3, T`Prove that $\sin^4\theta-\cos^4\theta\equiv1-2\cos^2\theta$.`, [
    T`Difference of two squares: LHS $=(\sin^2\theta-\cos^2\theta)(\sin^2\theta+\cos^2\theta)$.`,
    T`$=\sin^2\theta-\cos^2\theta=(1-\cos^2\theta)-\cos^2\theta=1-2\cos^2\theta$. $\blacksquare$`]),
  B.ex(4, T`Prove that $\dfrac{\cos\theta}{1-\sin\theta}\equiv\dfrac{1+\sin\theta}{\cos\theta}$.`, [
    T`Multiply top and bottom of the LHS by $(1+\sin\theta)$:`,
    T`$\dfrac{\cos\theta(1+\sin\theta)}{1-\sin^2\theta}=\dfrac{\cos\theta(1+\sin\theta)}{\cos^2\theta}$.`,
    T`$=\dfrac{1+\sin\theta}{\cos\theta}$. $\blacksquare$`], T`Same trick as rationalising a surd: $(1-s)(1+s)=1-s^2$.`),
  B.ex(5, T`Given $\sin\theta=\frac35$ and $\theta$ is obtuse, find $\cos\theta$ and $\tan\theta$.`, [
    T`$\cos^2\theta=1-\frac9{25}=\frac{16}{25}$, so $\cos\theta=\pm\frac45$.`,
    T`Obtuse $\Rightarrow$ quadrant 2 $\Rightarrow\cos\theta\lt0$: $\cos\theta=-\frac45$.`,
    T`$\tan\theta=\dfrac{3/5}{-4/5}=-\dfrac34$.`]),
  B.tip(T`<p><b>Check every identity at a test angle</b> before (or after) proving it — $\theta=0^\circ$ is quickest where everything is defined, otherwise try $30^\circ$ or $60^\circ$. In Example 3 at $\theta=0$: LHS $=0-1=-1$, RHS $=1-2=-1$ ✓. If the two sides disagree at one angle, you have misread the question or slipped.</p>`),
  B.warn([
    T`Working on both sides at once as if solving an equation.`,
    T`Writing $\sin\theta^2$ for $\sin^2\theta$ (they are different).`,
    T`Cancelling terms rather than factors: $\frac{\sin\theta+\cos\theta}{\cos\theta}\ne\sin\theta+1$.`,
    T`Taking only the positive root from $\cos^2\theta=\frac{16}{25}$.`]),
  B.exam([
    T`Set it out as one chain: "LHS $=\dots=\dots=$ RHS". Name the identity used at each swap.`,
    T`"Hence" usually means: use the identity you just proved to turn the next equation into a quadratic.`]),
  B.checks([
    [T`Simplify $\cos\theta\tan\theta$.`, T`$\sin\theta$.`],
    [T`Prove $\dfrac{\sin^2\theta}{1-\cos\theta}\equiv1+\cos\theta$.`, T`$\frac{1-\cos^2\theta}{1-\cos\theta}=\frac{(1-\cos\theta)(1+\cos\theta)}{1-\cos\theta}=1+\cos\theta$.`],
    [T`If $\tan\theta=2$ and $\theta$ is acute, find $\sin\theta$.`, T`Triangle $1,2,\sqrt5$: $\sin\theta=\frac2{\sqrt5}$.`]]),
  B.examq(7, T`<p>(a) Prove that $\tan\theta+\dfrac1{\tan\theta}\equiv\dfrac1{\sin\theta\cos\theta}$. <span class="mk">[3]</span></p><p>(b) Solve $\tan\theta+\dfrac1{\tan\theta}=4$ for $0^\circ\lt\theta\lt180^\circ$. <span class="mk">[4]</span></p>`,
    T`<p>(a) LHS $=\dfrac{\sin\theta}{\cos\theta}+\dfrac{\cos\theta}{\sin\theta}$ <span class="mk">M1</span> $=\dfrac{\sin^2\theta+\cos^2\theta}{\sin\theta\cos\theta}$ <span class="mk">M1</span> $=\dfrac1{\sin\theta\cos\theta}$. <span class="mk">A1</span></p>
<p>(b) Let $t=\tan\theta$: $t^2-4t+1=0$ <span class="mk">M1</span>, $t=2\pm\sqrt3$ <span class="mk">A1</span>. Both positive, so $\theta$ is in quadrant 1 only: $\theta=75^\circ$ <span class="mk">A1</span> and $\theta=15^\circ$. <span class="mk">A1</span> (Check: $\tan75^\circ=2+\sqrt3$.)</p>`),
  B.key([T`$\tan\theta\equiv\frac{\sin\theta}{\cos\theta}$, $\sin^2\theta+\cos^2\theta\equiv1$.`, T`Prove from one side to the other.`, T`Test at $\theta=0$ (or $30^\circ$) to catch errors.`]),
].join('');

/* ===================================================================== */
BOOK.m_teq = [
  B.why(T`<p>$\sin x=0.5$ has infinitely many solutions, because the graph repeats. A trig-equation question always gives an <b>interval</b>; your job is to find every solution in it — no more, no less. The method is always: principal value from the calculator, then the symmetry of the graph, then add periods.</p>`),
  B.thm('Second solutions (degrees)', T`<ul><li>$\sin x=k$: $x=\alpha$ and $x=180^\circ-\alpha$ (where $\alpha=\sin^{-1}k$).</li><li>$\cos x=k$: $x=\alpha$ and $x=360^\circ-\alpha$ (i.e. $-\alpha$).</li><li>$\tan x=k$: $x=\alpha$ and $x=\alpha+180^\circ$.</li></ul><p>Then add or subtract $360^\circ$ ($180^\circ$ for tan) to find all solutions in the interval.</p>`),
  B.opt(T`<p>These are the symmetries of the graphs: $\sin(180^\circ-x)=\sin x$, $\cos(-x)=\cos x$, and $\tan$ has period $180^\circ$. On the unit circle, a horizontal line $y=k$ meets the circle at two points symmetric in the $y$-axis (angles $\alpha$ and $180^\circ-\alpha$), and a vertical line $x=k$ at two points symmetric in the $x$-axis ($\alpha$ and $-\alpha$).</p>`, 'Why it works'),
  B.ex(1, T`Solve $\sin x=-0.5$ for $0^\circ\le x\le360^\circ$.`, [
    T`$\alpha=\sin^{-1}(-0.5)=-30^\circ$ (outside the interval, but useful).`,
    T`Second solution $180^\circ-(-30^\circ)=210^\circ$; and $-30^\circ+360^\circ=330^\circ$.`,
    T`$x=210^\circ,330^\circ$ (sine negative in quadrants 3 and 4 ✓).`]),
  B.ex(2, T`Solve $\cos2x=0.3$ for $0^\circ\le x\le360^\circ$.`, [
    T`Let $u=2x$; the interval becomes $0^\circ\le u\le720^\circ$ — <b>double it</b>.`,
    T`$u=72.54^\circ$, $360^\circ-72.54^\circ=287.46^\circ$, and $+360^\circ$: $432.54^\circ$, $647.46^\circ$.`,
    T`Halve: $x=36.3^\circ,143.7^\circ,216.3^\circ,323.7^\circ$.`], T`A multiple angle $nx$ gives $n$ times as many solutions.`),
  B.ex(3, T`Solve $\tan(x+40^\circ)=1$ for $0^\circ\le x\le360^\circ$.`, [
    T`Let $u=x+40^\circ$, so $40^\circ\le u\le400^\circ$.`,
    T`$u=45^\circ,225^\circ$ ($405^\circ$ is just outside).`,
    T`$x=5^\circ,185^\circ$.`]),
  B.ex(4, T`Solve $2\sin^2x+\sin x-1=0$ for $0^\circ\le x\le360^\circ$.`, [
    T`Quadratic in $\sin x$: $(2\sin x-1)(\sin x+1)=0$.`,
    T`$\sin x=\frac12$: $x=30^\circ,150^\circ$. $\sin x=-1$: $x=270^\circ$.`]),
  B.ex(5, T`Solve $2\cos^2x=3\sin x$ for $0^\circ\le x\le360^\circ$.`, [
    T`Use $\cos^2x=1-\sin^2x$ to get one function: $2-2\sin^2x=3\sin x$.`,
    T`$2\sin^2x+3\sin x-2=0\Rightarrow(2\sin x-1)(\sin x+2)=0$.`,
    T`$\sin x=-2$ is impossible; $\sin x=\frac12$: $x=30^\circ,150^\circ$.`]),
  B.ex(6, T`Solve $3\sin x=2\cos x$ for $0^\circ\le x\le360^\circ$.`, [
    T`$\cos x\ne0$ here (if $\cos x=0$ then $\sin x=\pm1$ and the equation fails), so divide: $\tan x=\frac23$.`,
    T`$x=33.7^\circ,213.7^\circ$.`]),
  B.ex(7, T`Solve $\sin x\cos x=0.5\sin x$ for $0^\circ\le x\le360^\circ$.`, [
    T`<b>Don't divide by $\sin x$</b> — factorise: $\sin x(\cos x-0.5)=0$.`,
    T`$\sin x=0$: $x=0^\circ,180^\circ,360^\circ$. $\cos x=0.5$: $x=60^\circ,300^\circ$.`], T`Dividing by $\sin x$ would have lost three solutions.`),
  B.ex(8, T`Solve $\sin x=\frac{\sqrt3}{2}$ for $0\le x\le2\pi$.`, [
    T`Radians: principal value $\frac\pi3$; second $\pi-\frac\pi3=\frac{2\pi}3$.`,
    T`$x=\frac\pi3,\frac{2\pi}3$.`]),
  B.warn([
    T`Not extending the interval for $\sin2x$, $\cos3x$, …, so missing solutions.`,
    T`Forgetting to transform back (giving $u$ instead of $x$).`,
    T`Dividing by a trig function that could be zero.`,
    T`Including answers outside the interval, or a calculator in the wrong mode.`]),
  B.exam([
    T`Show the principal value and how you got the others ($180^\circ-\alpha$ etc.) — method marks.`,
    T`State "no solutions" for impossible factors like $\sin x=-2$; the examiner wants to see you rejected it.`,
    T`Give answers to 1 d.p. (degrees) or 3 s.f. (radians) unless told otherwise; exact where possible.`]),
  B.checks([
    [T`Solve $\cos x=-1$ for $0^\circ\le x\le360^\circ$.`, T`$x=180^\circ$.`],
    [T`How many solutions has $\sin3x=0.2$ in $0^\circ\le x\le360^\circ$?`, T`$6$.`],
    [T`Solve $\tan x=-1$ for $0^\circ\le x\le360^\circ$.`, T`$135^\circ,315^\circ$.`]]),
  B.examq(8, T`<p>(a) Solve $4\cos^2x+4\sin x=5$ for $0^\circ\le x\le360^\circ$. <span class="mk">[5]</span></p><p>(b) Solve $\tan(2x-30^\circ)=\sqrt3$ for $0^\circ\le x\le180^\circ$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $4(1-\sin^2x)+4\sin x=5$ <span class="mk">M1</span> $\Rightarrow4\sin^2x-4\sin x+1=0$ <span class="mk">A1</span> $\Rightarrow(2\sin x-1)^2=0$ <span class="mk">M1</span>, $\sin x=\frac12$ <span class="mk">A1</span>; $x=30^\circ,150^\circ$. <span class="mk">A1</span></p>
<p>(b) $-30^\circ\le2x-30^\circ\le330^\circ$ <span class="mk">M1</span>; $2x-30^\circ=60^\circ,240^\circ$ <span class="mk">A1</span>; $x=45^\circ,135^\circ$. <span class="mk">A1</span></p>`),
  B.key([T`Principal value, then symmetry: $180^\circ-\alpha$ (sin), $360^\circ-\alpha$ (cos), $\alpha+180^\circ$ (tan).`, T`Multiple/shifted angles: transform the interval first.`, T`Quadratics in sin/cos: use $\sin^2+\cos^2=1$ to get one function; factorise, never divide.`]),
].join('');

/* ===================================================================== */
BOOK.m_exp = [
  B.why(T`<p>Whenever something grows or decays at a rate proportional to its size — populations, savings, radioactive material, cooling coffee — the model is an exponential. The special base $e\approx2.718$ is the one where the rate of change exactly equals the value, which is why it appears everywhere in science.</p>`),
  B.def('exponential function', T`<p>$y=a^x$ with $a\gt0$, $a\ne1$. Every such graph passes through $(0,1)$, lies above the $x$-axis, and has the $x$-axis ($y=0$) as an asymptote. If $a\gt1$ it increases (growth); if $0\lt a\lt1$ it decreases (decay). $y=a^{-x}$ is the reflection of $y=a^x$ in the $y$-axis.</p>`),
  T`<h3>Where does $e$ come from?</h3>
<p>The gradient of $y=a^x$ at any point is proportional to the value there: $$\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}.$$ For small $h$, $\frac{2^h-1}{h}\approx0.693$ and $\frac{3^h-1}{h}\approx1.099$. So for $y=2^x$ the gradient is about $0.69\times$ the value, and for $y=3^x$ about $1.10\times$ the value. Somewhere between 2 and 3 there is a base whose multiplier is exactly 1: that base is $e=2.71828\ldots$</p>`,
  B.thm('The number e', T`<p>$e=\displaystyle\lim_{n\to\infty}\left(1+\frac1n\right)^n=2.71828\ldots$ — the result of continuously compounding 100% interest for one year (see chapter 6.3). It is also exactly the base whose gradient multiplier is 1: the gradient of $y=e^x$ equals its height. (Differentiating $e^x$ is A2 content.)</p>`),
  B.def('natural logarithm', T`<p>$\ln x$ is the inverse of $e^x$: $\ y=e^x\iff x=\ln y$. So $e^{\ln x}=x$ $(x\gt0)$ and $\ln(e^x)=x$. The graph of $y=\ln x$ is the reflection of $y=e^x$ in $y=x$.</p>`),
  B.ex(1, T`Sketch $y=e^{-x}+2$.`, [
    T`$y=e^{-x}$ is decay (reflection of $e^x$ in the $y$-axis); then translate up 2.`,
    T`$y$-intercept $1+2=3$; asymptote $y=2$ as $x\to\infty$.`]),
  B.ex(2, T`A population is modelled by $P=200e^{0.03t}$ ($t$ in years). Find (a) the initial population, (b) $P$ after 10 years, (c) the time to double.`, [
    T`(a) $t=0$: $P=200$.`,
    T`(b) $200e^{0.3}=270$ (to the nearest whole number).`,
    T`(c) $e^{0.03t}=2\Rightarrow0.03t=\ln2\Rightarrow t=\frac{\ln2}{0.03}=23.1$ years.`]),
  B.ex(3, T`A cup of tea cools according to $T=20+60e^{-0.1t}$ ($T$ in °C, $t$ in minutes). Find the initial temperature, the long-term temperature, and when $T=50$.`, [
    T`$t=0$: $T=80$°C. As $t\to\infty$, $e^{-0.1t}\to0$, so $T\to20$°C (room temperature).`,
    T`$50=20+60e^{-0.1t}\Rightarrow e^{-0.1t}=\frac12\Rightarrow t=10\ln2=6.93$ minutes.`]),
  B.ex(4, T`$N=500e^{kt}$ and $N=800$ when $t=5$. Find $k$.`, [
    T`$e^{5k}=1.6\Rightarrow5k=\ln1.6\Rightarrow k=0.0940$ (3 s.f.).`]),
  B.warn([
    T`$e^{x+1}\ne e^x+1$; it is $e\cdot e^x$.`,
    T`Putting the asymptote of $y=e^x+c$ at $y=0$ — it moves to $y=c$.`,
    T`$\ln$ of a negative number or zero: undefined.`,
    T`Rounding $k$ early and then using it — keep the exact form $\frac{\ln1.6}5$.`]),
  B.exam([
    T`Modelling questions often end with "give a reason why the model may not be appropriate" — e.g. unlimited growth is unrealistic; a value can't fall below a physical minimum.`,
    T`"Exact" answers stay in terms of $\ln$ and $e$: $t=10\ln2$.`,
    T`Interpret: the constant term is the long-run value; the coefficient at $t=0$ is the initial value.`]),
  B.checks([
    [T`Solve $e^{2x}=5$.`, T`$x=\frac12\ln5$.`],
    [T`What is the asymptote of $y=3-e^{x}$?`, T`$y=3$ (as $x\to-\infty$).`],
    [T`Simplify $\ln(e^{3})+e^{\ln2}$.`, T`$3+2=5$.`]]),
  B.examq(7, T`<p>The value $£V$ of a car $t$ years after it was bought is modelled by $V=18000e^{-0.15t}$.</p><p>(a) State the value of the car when new. <span class="mk">[1]</span></p><p>(b) Find its value after 4 years. <span class="mk">[2]</span></p><p>(c) Find after how many years the value first falls below £5000. <span class="mk">[3]</span></p><p>(d) Give one reason why the model may not be appropriate for large values of $t$. <span class="mk">[1]</span></p>`,
    T`<p>(a) £18000. <span class="mk">B1</span></p>
<p>(b) $18000e^{-0.6}$ <span class="mk">M1</span> $=£9879$. <span class="mk">A1</span></p>
<p>(c) $18000e^{-0.15t}\lt5000\Rightarrow e^{-0.15t}\lt\frac5{18}$ <span class="mk">M1</span> $\Rightarrow t\gt\frac{\ln3.6}{0.15}=8.54$ <span class="mk">M1 A1</span>: during the 9th year.</p>
<p>(d) e.g. the model never reaches zero / a very old car may become a classic and gain value / scrap value sets a minimum. <span class="mk">B1</span></p>`),
  B.key([T`$y=a^x$: through $(0,1)$, asymptote $y=0$.`, T`$e=\lim(1+\frac1n)^n\approx2.718$; $y=e^x$ and $y=\ln x$ are reflections in $y=x$.`, T`$\ln$ undoes $e$: $e^{kx}=c\Rightarrow x=\frac{\ln c}k$.`, T`$N=N_0e^{kt}$: growth $k\gt0$, decay $k\lt0$.`]),
].join('');
