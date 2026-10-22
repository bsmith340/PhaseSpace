// BCS Academy textbook — Further Maths AS 1: further algebra and complex numbers.
'use strict';

const circPts = (cx, cy, r, n = 72) => Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos(2 * Math.PI * i / n), cy + r * Math.sin(2 * Math.PI * i / n)]);

BOOK.f1_roots = [
  B.why(T`<p>You can often answer questions about the roots of a quadratic <i>without finding them</i>. The coefficients already hold their sum and product, and every symmetric expression in the roots can be built from those two numbers. This is the first idea in Further Maths, and it comes back with cubics and quartics later on.</p>`),
  B.thm('Sum and product of roots', T`<p>If $\alpha$ and $\beta$ are the roots of $ax^2+bx+c=0$ ($a\ne0$), then $$\alpha+\beta=-\frac ba,\qquad\alpha\beta=\frac ca.$$</p>`),
  B.proof(T`<p>The quadratic has roots $\alpha,\beta$, so $ax^2+bx+c\equiv a(x-\alpha)(x-\beta)=ax^2-a(\alpha+\beta)x+a\alpha\beta$. Comparing coefficients of $x$: $b=-a(\alpha+\beta)$. Constant terms: $c=a\alpha\beta$.</p>`),
  B.def('symmetric functions', T`<p>An expression is <b>symmetric</b> if swapping $\alpha$ and $\beta$ leaves it unchanged. Every symmetric polynomial in $\alpha,\beta$ can be written using $\alpha+\beta$ and $\alpha\beta$:</p><ul><li>$\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta$</li><li>$\alpha^3+\beta^3=(\alpha+\beta)^3-3\alpha\beta(\alpha+\beta)$</li><li>$\dfrac1\alpha+\dfrac1\beta=\dfrac{\alpha+\beta}{\alpha\beta}$</li><li>$(\alpha-\beta)^2=(\alpha+\beta)^2-4\alpha\beta$</li></ul>`),
  B.ex(1, T`The roots of $2x^2-5x+1=0$ are $\alpha$ and $\beta$. Find $\alpha^2+\beta^2$, $\frac1\alpha+\frac1\beta$ and $\alpha^3+\beta^3$.`, [
    T`$\alpha+\beta=\frac52$, $\alpha\beta=\frac12$.`, T`$\alpha^2+\beta^2=\frac{25}4-1=\frac{21}4$.`, T`$\frac1\alpha+\frac1\beta=\frac{5/2}{1/2}=5$.`, T`$\alpha^3+\beta^3=\frac{125}8-3\cdot\frac12\cdot\frac52=\frac{125}8-\frac{15}4=\frac{95}8$.`]),
  B.ex(2, T`One root of $x^2-6x+k=0$ is twice the other. Find $k$.`, [T`Let the roots be $\alpha$ and $2\alpha$. Sum: $3\alpha=6\Rightarrow\alpha=2$.`, T`Product: $k=2\alpha^2=8$.`]),
  B.ex(3, T`The roots of $x^2+px+12=0$ differ by $1$. Find $p$.`, [T`$(\alpha-\beta)^2=(\alpha+\beta)^2-4\alpha\beta=p^2-48$.`, T`$(\alpha-\beta)^2=1\Rightarrow p^2=49\Rightarrow p=\pm7$.`]),
  B.warn([T`Sign error: the sum is $-\frac ba$, not $\frac ba$.`, T`Forgetting to divide by $a$ when $a\ne1$.`, T`Writing $\alpha^2+\beta^2=(\alpha+\beta)^2$.`]),
  B.exam([T`"Without solving the equation" means you must use sum and product — finding the roots scores nothing.`, T`State $\alpha+\beta$ and $\alpha\beta$ clearly at the start: they carry method marks.`]),
  B.checks([[T`Sum and product of the roots of $3x^2+6x-2=0$?`, T`$-2$ and $-\frac23$.`], [T`$\alpha+\beta=4$, $\alpha\beta=1$. $\alpha^2+\beta^2$?`, T`$14$.`], [T`Write $\alpha^2\beta+\alpha\beta^2$ in terms of sum and product.`, T`$\alpha\beta(\alpha+\beta)$.`]]),
  B.examq(6, T`<p>The roots of the equation $3x^2-4x-2=0$ are $\alpha$ and $\beta$. Without solving the equation, find</p><p>(a) $\alpha+\beta$ and $\alpha\beta$ <span class="mk">[2]</span> (b) $\alpha^2+\beta^2$ <span class="mk">[2]</span> (c) $\alpha^3\beta+\alpha\beta^3$ <span class="mk">[2]</span></p>`,
    T`<p>(a) $\alpha+\beta=\frac43$, $\alpha\beta=-\frac23$ <span class="mk">B1 B1</span>. (b) $\frac{16}9+\frac43=\frac{28}9$ <span class="mk">M1 A1</span>. (c) $\alpha\beta(\alpha^2+\beta^2)=-\frac23\cdot\frac{28}9=-\frac{56}{27}$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$\alpha+\beta=-\frac ba$, $\alpha\beta=\frac ca$.`, T`Rewrite symmetric expressions in terms of the sum and product.`]),
].join('');

BOOK.f1_trans = [
  B.why(T`<p>Given a quadratic, can you write down another quadratic whose roots are, say, double the first one's — without solving either? Yes: the new roots' sum and product follow from the old ones. There is also a slick substitution method.</p>`),
  B.thm('Method 1: sum and product', T`<p>If the new roots are $p$ and $q$, the equation is $x^2-(p+q)x+pq=0$. Express $p+q$ and $pq$ using $\alpha+\beta$ and $\alpha\beta$, then multiply through to clear fractions.</p>`),
  B.thm('Method 2: substitution', T`<p>If each new root $y$ is a function of an old root, $y=g(\alpha)$, make $\alpha$ the subject, $\alpha=g^{-1}(y)$, and substitute into the original equation. For example roots $\alpha+k$: replace $x$ by $x-k$; roots $k\alpha$: replace $x$ by $\frac xk$; roots $\frac1\alpha$: replace $x$ by $\frac1x$.</p>`),
  B.proof(T`<p>If $a\alpha^2+b\alpha+c=0$ and $y=\alpha+k$, then $\alpha=y-k$ satisfies $a(y-k)^2+b(y-k)+c=0$. So $y=\alpha+k$ (and likewise $\beta+k$) is a root of $a(x-k)^2+b(x-k)+c=0$.</p>`, 'Why substitution works'),
  B.ex(1, T`The roots of $x^2-3x+5=0$ are $\alpha,\beta$. Find equations with roots (a) $2\alpha,2\beta$; (b) $\alpha+1,\beta+1$; (c) $\alpha^2,\beta^2$; (d) $\frac1\alpha,\frac1\beta$.`, [
    T`$\alpha+\beta=3$, $\alpha\beta=5$.`, T`(a) Sum $6$, product $20$: $x^2-6x+20=0$.`, T`(b) Substitute $x-1$: $(x-1)^2-3(x-1)+5=x^2-5x+9=0$. (Check: sum $3+2=5$ ✓, product $5+3+1=9$ ✓.)`,
    T`(c) Sum $\alpha^2+\beta^2=9-10=-1$, product $25$: $x^2+x+25=0$.`, T`(d) Replace $x$ by $\frac1x$ and multiply by $x^2$: $5x^2-3x+1=0$.`], T`Part (c) has a negative "sum of squares" — fine, because $\alpha,\beta$ are complex here.`),
  B.ex(2, T`With the same $\alpha,\beta$, find an equation with roots $\frac\alpha\beta$ and $\frac\beta\alpha$.`, [T`Sum $=\frac{\alpha^2+\beta^2}{\alpha\beta}=-\frac15$; product $=1$.`, T`$x^2+\frac15x+1=0$, i.e. $5x^2+x+5=0$.`]),
  B.warn([T`Leaving fractions in the final equation when integer coefficients are asked for.`, T`Substituting $x+k$ instead of $x-k$ for roots $\alpha+k$.`]),
  B.exam([T`Show the new sum and product explicitly — that is the method mark even if the final arithmetic slips.`, T`"Integer coefficients": multiply through by the common denominator.`]),
  B.checks([[T`Roots of $x^2+2x-4=0$ are $\alpha,\beta$. Equation with roots $3\alpha,3\beta$?`, T`$x^2+6x-36=0$.`], [T`Equation with roots $\frac1\alpha,\frac1\beta$ from $2x^2-x+7=0$?`, T`$7x^2-x+2=0$.`]]),
  B.examq(9, T`<p>The roots of $2x^2+3x-4=0$ are $\alpha$ and $\beta$.</p><p>(a) Find a quadratic equation with integer coefficients whose roots are $3\alpha-1$ and $3\beta-1$. <span class="mk">[5]</span> (b) Find a quadratic equation with integer coefficients whose roots are $\frac1{\alpha^2}$ and $\frac1{\beta^2}$. <span class="mk">[4]</span></p>`,
    T`<p>$\alpha+\beta=-\frac32$, $\alpha\beta=-2$ <span class="mk">B1</span>.</p><p>(a) Sum $3(\alpha+\beta)-2=-\frac{13}2$ <span class="mk">M1</span>; product $9\alpha\beta-3(\alpha+\beta)+1=-18+\frac92+1=-\frac{25}2$ <span class="mk">M1 A1</span>. $2x^2+13x-25=0$ <span class="mk">A1</span>.</p><p>(b) Sum $\frac{\alpha^2+\beta^2}{(\alpha\beta)^2}=\frac{\frac94+4}{4}=\frac{25}{16}$ <span class="mk">M1 A1</span>; product $\frac1{(\alpha\beta)^2}=\frac14$ <span class="mk">B1</span>. $16x^2-25x+4=0$ <span class="mk">A1</span>.</p>`),
  B.key([T`New equation: $x^2-(\text{new sum})x+(\text{new product})=0$.`, T`Or substitute the inverse relation into the old equation.`]),
].join('');

BOOK.f1_cx = [
  B.why(T`<p>$x^2+1=0$ has no real solution — so mathematicians invented a number that solves it, $i$, and found that the resulting complex numbers make <i>every</i> polynomial equation solvable. They also turn out to describe rotations, waves and alternating current.</p>`),
  B.def('complex numbers', T`<p>$i$ is a number with $i^2=-1$. A <b>complex number</b> is $z=x+iy$ with $x,y$ real: $x=\operatorname{Re}z$ is the <b>real part</b>, $y=\operatorname{Im}z$ the <b>imaginary part</b> (a real number — no $i$). The set of complex numbers is $\mathbb C$.</p>`),
  B.def('arithmetic', T`<ul><li>$(a+bi)\pm(c+di)=(a\pm c)+(b\pm d)i$.</li><li>$(a+bi)(c+di)=ac+adi+bci+bdi^2=(ac-bd)+(ad+bc)i$.</li><li><b>Equality</b>: $a+bi=c+di\iff a=c$ and $b=d$ — one complex equation gives <b>two</b> real equations.</li></ul>`),
  B.def('the complex conjugate', T`<p>$z^*=x-iy$. Then $z+z^*=2x$ and $zz^*=x^2+y^2$, both real. To <b>divide</b>, multiply top and bottom by the conjugate of the denominator: $$\frac{a+bi}{c+di}=\frac{(a+bi)(c-di)}{c^2+d^2}.$$</p>`),
  B.thm('Properties of the conjugate', T`<p>$(z+w)^*=z^*+w^*$ and $(zw)^*=z^*w^*$.</p>`),
  B.proof(T`<p>Let $z=a+bi$, $w=c+di$. $zw=(ac-bd)+(ad+bc)i$, so $(zw)^*=(ac-bd)-(ad+bc)i$. Also $z^*w^*=(a-bi)(c-di)=(ac-bd)-(ad+bc)i$. The sum rule is immediate.</p>`),
  B.ex(1, T`Simplify $(3+2i)(1-4i)$.`, [T`$3-12i+2i-8i^2=3+8-10i=11-10i$.`]),
  B.ex(2, T`Express $\dfrac{5+i}{2-3i}$ in the form $a+bi$.`, [T`Multiply by $\frac{2+3i}{2+3i}$: numerator $(5+i)(2+3i)=10+15i+2i+3i^2=7+17i$; denominator $4+9=13$.`, T`$\frac7{13}+\frac{17}{13}i$.`]),
  B.ex(3, T`Solve $x^2-4x+13=0$.`, [T`$x=\dfrac{4\pm\sqrt{16-52}}2=\dfrac{4\pm\sqrt{-36}}2=\dfrac{4\pm6i}2=2\pm3i$.`], T`The roots are conjugates: true whenever the coefficients are real and the discriminant is negative.`),
  B.ex(4, T`Find $z$ such that $z+2z^*=6-3i$.`, [T`Let $z=a+bi$: $a+bi+2a-2bi=3a-bi$.`, T`Equate: $3a=6$, $-b=-3$, so $z=2+3i$.`]),
  B.ex(5, T`Find the square roots of $-5+12i$.`, [T`$(a+bi)^2=a^2-b^2+2abi=-5+12i$: $a^2-b^2=-5$, $ab=6$.`, T`$b=\frac6a$: $a^2-\frac{36}{a^2}=-5\Rightarrow a^4+5a^2-36=0\Rightarrow(a^2+9)(a^2-4)=0$.`, T`$a$ is real, so $a^2=4$: $a=\pm2$, $b=\pm3$. Square roots $\pm(2+3i)$.`]),
  B.warn([T`$i^2=+1$ — no: $-1$.`, T`Giving $\operatorname{Im}(3-4i)$ as $-4i$ — it is $-4$.`, T`Dividing by multiplying by the denominator itself instead of its conjugate.`]),
  B.exam([T`For "find $z$" equations, substitute $z=a+bi$ and equate real and imaginary parts.`, T`Give answers in the form asked for, e.g. $a+bi$ with exact fractions.`]),
  B.checks([[T`$(2-i)^2$?`, T`$3-4i$.`], [T`$\frac1i$?`, T`$-i$.`], [T`$z=4-3i$. $zz^*$?`, T`$25$.`]]),
  B.examq(8, T`<p>The complex numbers $z$ and $w$ are $z=3-4i$ and $w=1+2i$.</p><p>(a) Find $zw$. <span class="mk">[2]</span> (b) Express $\dfrac zw$ in the form $a+bi$. <span class="mk">[3]</span> (c) Find the real numbers $p$ and $q$ such that $pz+qw=5-10i$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $3+6i-4i-8i^2=11+2i$ <span class="mk">M1 A1</span>. (b) $\frac{(3-4i)(1-2i)}{5}=\frac{3-6i-4i+8i^2}5=\frac{-5-10i}5=-1-2i$ <span class="mk">M1 M1 A1</span>.</p><p>(c) Real: $3p+q=5$; imaginary: $-4p+2q=-10$ <span class="mk">M1</span>. Solving: $p=2$, $q=-1$ <span class="mk">A1 A1</span>.</p>`),
  B.key([T`$i^2=-1$; Re and Im are real numbers.`, T`Divide using the conjugate.`, T`Equal complex numbers ⇒ equal real parts and equal imaginary parts.`]),
].join('');

BOOK.f1_poly = [
  B.why(T`<p>A cubic with real coefficients must cross the $x$-axis at least once, so it has a real root — but what about the other two? Complex numbers complete the picture: an $n$th-degree polynomial has exactly $n$ roots in $\mathbb C$, and when the coefficients are real, the non-real ones come in mirror-image pairs.</p>`),
  B.thm('Conjugate root theorem', T`<p>If $f(x)$ is a polynomial with <b>real</b> coefficients and $f(z)=0$, then $f(z^*)=0$.</p>`),
  B.proof(T`<p>Let $f(x)=a_nx^n+\dots+a_1x+a_0$ with every $a_k$ real. Then $0=f(z)^*=\left(\sum a_kz^k\right)^*=\sum a_k^*(z^*)^k=\sum a_k(z^*)^k=f(z^*)$, using $(z+w)^*=z^*+w^*$, $(zw)^*=z^*w^*$ and $a_k^*=a_k$.</p>`),
  B.thm('The quadratic factor', T`<p>The pair $p\pm qi$ gives the real quadratic factor $$(x-(p+qi))(x-(p-qi))=x^2-2px+(p^2+q^2).$$</p>`),
  B.ex(1, T`Given that $2+i$ is a root of $x^3-7x^2+17x-15=0$, solve the equation.`, [
    T`$2-i$ is also a root (real coefficients). Factor: $x^2-4x+5$.`, T`$x^3-7x^2+17x-15=(x^2-4x+5)(x-3)$ — compare the constant terms: $5\times(-3)=-15$ ✓.`, T`Roots $2+i$, $2-i$, $3$.`]),
  B.ex(2, T`Show that $x=-2$ is a root of $x^3+2x^2+4x+8=0$ and hence solve it.`, [T`$f(-2)=-8+8-8+8=0$ ✓.`, T`$f(x)=(x+2)(x^2+4)$, so $x=-2$ or $x=\pm2i$.`]),
  B.ex(3, T`Given that $1-2i$ is a root of $x^4-2x^3+6x^2-2x+5=0$, find the other roots.`, [T`$1+2i$ is also a root; factor $x^2-2x+5$.`, T`Divide: $x^4-2x^3+6x^2-2x+5=(x^2-2x+5)(x^2+1)$.`, T`Roots $1\pm2i$, $\pm i$.`]),
  B.ex(4, T`$x^3+ax^2+bx+20=0$ has a root $1+3i$, where $a,b$ are real. Find $a$ and $b$.`, [T`Roots $1\pm3i$ and real $r$. The pair gives $x^2-2x+10$.`, T`Product of the roots of $x^3+ax^2+bx+20$ is $-20$: $10r=-20\Rightarrow r=-2$.`, T`$(x^2-2x+10)(x+2)=x^3+6x+20$, so $a=0$, $b=6$.`]),
  B.warn([T`Applying the conjugate rule when the coefficients are not all real.`, T`Long-dividing by $(x-(p+qi))$ instead of by the real quadratic factor — messy and error-prone.`]),
  B.exam([T`Write "since the coefficients are real, $p-qi$ is also a root" — the reason earns a mark.`, T`Comparing coefficients is usually faster than long division.`]),
  B.checks([[T`Quadratic factor from the root $3-2i$?`, T`$x^2-6x+13$.`], [T`A quartic with real coefficients has roots $i$ and $2+i$. The others?`, T`$-i$ and $2-i$.`], [T`Can a real cubic have exactly two non-real roots and one real root?`, T`Yes — that is the only non-real possibility.`]]),
  B.examq(8, T`<p>$f(x)=x^4-4x^3+9x^2-16x+20$.</p><p>(a) Given that $2i$ is a root of $f(x)=0$, explain why $-2i$ is also a root. <span class="mk">[1]</span> (b) Find the other two roots. <span class="mk">[5]</span> (c) Show all four roots on an Argand diagram. <span class="mk">[2]</span></p>`,
    T`<p>(a) $f$ has real coefficients, so non-real roots occur in conjugate pairs <span class="mk">B1</span>.</p><p>(b) Factor $(x-2i)(x+2i)=x^2+4$ <span class="mk">M1 A1</span>. $f(x)=(x^2+4)(x^2-4x+5)$ <span class="mk">M1 A1</span>; $x=\frac{4\pm\sqrt{-4}}2=2\pm i$ <span class="mk">A1</span>.</p><p>(c) Points $(0,\pm2)$ and $(2,\pm1)$, symmetric about the real axis <span class="mk">B1 B1</span>.</p>`),
  B.key([T`Real coefficients ⇒ non-real roots in conjugate pairs.`, T`Pair $p\pm qi$ ⇒ factor $x^2-2px+p^2+q^2$.`]),
].join('');

BOOK.f1_argand = [
  B.why(T`<p>Writing $z=x+iy$ suggests a point $(x,y)$. Plotting complex numbers this way turns algebra into geometry: the size of $z$ becomes a distance, and the "direction" of $z$ becomes an angle. That angle is measured in radians, which is why radians appear in this unit.</p>`),
  B.def('the Argand diagram', T`<p>The complex number $x+iy$ is drawn as the point $(x,y)$ (or the vector from $O$ to it): real axis horizontal, imaginary axis vertical. Adding complex numbers is adding vectors; $z^*$ is the reflection of $z$ in the real axis.</p>`),
  FIG.plot({ x: [-5, 5], y: [-4, 5], xt: [-4, -2, 2, 4], yt: [-2, 2, 4], lines: [{ pts: [[0, 0], [3, 4]], cls: 'fc1' }, { pts: [[0, 0], [-2, 2]], cls: 'fc2' }, { pts: [[0, 0], [3, -4]], cls: 'fc4' }], dots: [[3, 4, '3 + 4i'], [-2, 2, '−2 + 2i'], [3, -4, '(3 + 4i)*']], xlab: 'Re', ylab: 'Im' }, 'Complex numbers as points; the conjugate is a reflection in the real axis.'),
  B.def('radians', T`<p>One radian is the angle subtended at the centre of a circle by an arc equal to the radius. $\pi\text{ rad}=180^\circ$, so $1^\circ=\frac\pi{180}$ rad. Key values: $\frac\pi6=30^\circ$, $\frac\pi4=45^\circ$, $\frac\pi3=60^\circ$, $\frac\pi2=90^\circ$.</p>`),
  B.def('modulus and argument', T`<p>$|z|=r=\sqrt{x^2+y^2}$ is the distance from $O$. $\arg z=\theta$ is the angle from the positive real axis to $z$, anticlockwise positive. The <b>principal argument</b> satisfies $-\pi\lt\theta\le\pi$.</p><p><b>Modulus–argument form</b>: $z=r(\cos\theta+i\sin\theta)$, since $x=r\cos\theta$ and $y=r\sin\theta$.</p>`),
  B.tip(T`<p>Always sketch $z$ first. Find the reference angle $\alpha=\tan^{-1}\left|\frac yx\right|$, then: 1st quadrant $\theta=\alpha$; 2nd $\theta=\pi-\alpha$; 3rd $\theta=-(\pi-\alpha)$; 4th $\theta=-\alpha$. A calculator's $\tan^{-1}\frac yx$ is wrong in the 2nd and 3rd quadrants.</p>`),
  B.ex(1, T`Write $z=-1+\sqrt3\,i$ in modulus–argument form.`, [T`$r=\sqrt{1+3}=2$. Second quadrant; reference angle $\tan^{-1}\sqrt3=\frac\pi3$.`, T`$\theta=\pi-\frac\pi3=\frac{2\pi}3$: $z=2\left(\cos\frac{2\pi}3+i\sin\frac{2\pi}3\right)$.`]),
  B.ex(2, T`Find the modulus and principal argument of $-3-4i$.`, [T`$r=5$. Third quadrant; reference angle $\tan^{-1}\frac43=0.927$.`, T`$\theta=-(\pi-0.927)=-2.21$ rad.`]),
  B.ex(3, T`Express $4\left(\cos\left(-\frac{5\pi}6\right)+i\sin\left(-\frac{5\pi}6\right)\right)$ in the form $x+iy$.`, [T`$x=4\cos\left(-\frac{5\pi}6\right)=-2\sqrt3$, $y=4\sin\left(-\frac{5\pi}6\right)=-2$.`, T`$z=-2\sqrt3-2i$.`]),
  B.warn([T`Giving the argument in degrees when radians are expected.`, T`Using $\tan^{-1}\frac yx$ without checking the quadrant.`, T`An argument outside $(-\pi,\pi]$ when the principal value is asked for.`]),
  B.exam([T`A labelled sketch is worth the time — it catches quadrant errors and often carries a mark.`, T`Give exact arguments as multiples of $\pi$ where possible.`]),
  B.checks([[T`$|5-12i|$?`, T`$13$.`], [T`$\arg(-4)$?`, T`$\pi$.`], [T`$\arg(-2i)$?`, T`$-\frac\pi2$.`]]),
  B.examq(7, T`<p>The complex numbers $z$ and $w$ are $z=-2+2i$ and $w=\sqrt3-i$.</p><p>(a) Find $|z|$ and $\arg z$. <span class="mk">[2]</span> (b) Find $|w|$ and $\arg w$. <span class="mk">[2]</span> (c) Show $z$, $w$ and $z^*$ on an Argand diagram. <span class="mk">[2]</span> (d) Write $w$ in modulus–argument form. <span class="mk">[1]</span></p>`,
    T`<p>(a) $|z|=2\sqrt2$, $\arg z=\frac{3\pi}4$ <span class="mk">B1 B1</span>. (b) $|w|=2$, $\arg w=-\frac\pi6$ <span class="mk">B1 B1</span>.</p><p>(c) Points $(-2,2)$, $(\sqrt3,-1)$, $(-2,-2)$ correctly placed <span class="mk">B2</span>. (d) $w=2\left(\cos\left(-\frac\pi6\right)+i\sin\left(-\frac\pi6\right)\right)$ <span class="mk">B1</span>.</p>`),
  B.key([T`$|z|=\sqrt{x^2+y^2}$; $\arg z\in(-\pi,\pi]$ from a sketch.`, T`$z=r(\cos\theta+i\sin\theta)$.`]),
].join('');

BOOK.f1_mularg = [
  B.why(T`<p>In Cartesian form, multiplication is messy. In modulus–argument form it is beautiful: multiply the lengths, add the angles. That is why multiplying by a complex number is a rotation combined with an enlargement.</p>`),
  B.thm('Products and quotients', T`<p>If $z_1=r_1(\cos\theta_1+i\sin\theta_1)$ and $z_2=r_2(\cos\theta_2+i\sin\theta_2)$, then $$z_1z_2=r_1r_2\left[\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)\right],\qquad\frac{z_1}{z_2}=\frac{r_1}{r_2}\left[\cos(\theta_1-\theta_2)+i\sin(\theta_1-\theta_2)\right].$$</p>`),
  B.proof(T`<p>$z_1z_2=r_1r_2\left[(\cos\theta_1\cos\theta_2-\sin\theta_1\sin\theta_2)+i(\sin\theta_1\cos\theta_2+\cos\theta_1\sin\theta_2)\right]$, and the brackets are $\cos(\theta_1+\theta_2)$ and $\sin(\theta_1+\theta_2)$ by the compound angle formulae. For the quotient, $\frac1{z_2}=\frac{z_2^*}{|z_2|^2}=\frac1{r_2}(\cos\theta_2-i\sin\theta_2)=\frac1{r_2}\left(\cos(-\theta_2)+i\sin(-\theta_2)\right)$; then use the product rule.</p>`),
  B.ex(1, T`$z=2\left(\cos\frac\pi3+i\sin\frac\pi3\right)$, $w=3\left(\cos\frac\pi4+i\sin\frac\pi4\right)$. Find $zw$ and $\frac zw$ in modulus–argument form.`, [T`$zw=6\left(\cos\frac{7\pi}{12}+i\sin\frac{7\pi}{12}\right)$.`, T`$\frac zw=\frac23\left(\cos\frac\pi{12}+i\sin\frac\pi{12}\right)$.`]),
  B.ex(2, T`Find $|zw|$ and $\arg(zw)$ for $z=-1+i$ and $w=1+\sqrt3\,i$.`, [T`$|z|=\sqrt2$, $\arg z=\frac{3\pi}4$; $|w|=2$, $\arg w=\frac\pi3$.`, T`$|zw|=2\sqrt2$; $\arg z+\arg w=\frac{13\pi}{12}$, outside $(-\pi,\pi]$, so subtract $2\pi$: $\arg(zw)=-\frac{11\pi}{12}$.`], T`Check in Cartesian form: $zw=(-1-\sqrt3)+(1-\sqrt3)i$, in the third quadrant ✓.`),
  B.ex(3, T`Describe the effect on the Argand diagram of multiplying by $i$, and by $2i$.`, [T`$i$ has modulus $1$, argument $\frac\pi2$: a rotation through $\frac\pi2$ anticlockwise about $O$.`, T`$2i$: an enlargement scale factor $2$ combined with that rotation.`]),
  B.warn([T`Multiplying the arguments instead of adding them.`, T`Forgetting to bring the argument back into $(-\pi,\pi]$.`]),
  B.exam([T`"Hence" questions often want a Cartesian answer compared with a modulus–argument one to get an exact trig value — see the exam question below.`]),
  B.checks([[T`$|z|=3$, $|w|=4$. $|zw|$ and $\left|\frac zw\right|$?`, T`$12$ and $\frac34$.`], [T`$\arg z=\frac{5\pi}6$, $\arg w=\frac\pi2$. $\arg(zw)$?`, T`$\frac{4\pi}3-2\pi=-\frac{2\pi}3$.`]]),
  B.examq(10, T`<p>$z=1+i$ and $w=1-\sqrt3\,i$.</p><p>(a) Find the modulus and argument of $z$ and of $w$. <span class="mk">[3]</span> (b) Hence find $|zw|$, $\arg(zw)$, $\left|\frac zw\right|$ and $\arg\frac zw$. <span class="mk">[4]</span> (c) By writing $\frac zw$ in the form $a+bi$, find the exact value of $\cos\frac{7\pi}{12}$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $|z|=\sqrt2$, $\arg z=\frac\pi4$; $|w|=2$, $\arg w=-\frac\pi3$ <span class="mk">B1 B1 B1</span>.</p><p>(b) $|zw|=2\sqrt2$, $\arg(zw)=-\frac\pi{12}$; $\left|\frac zw\right|=\frac{\sqrt2}2$, $\arg\frac zw=\frac{7\pi}{12}$ <span class="mk">B1 B1 B1 B1</span>.</p><p>(c) $\frac zw=\frac{(1+i)(1+\sqrt3 i)}4=\frac{(1-\sqrt3)+(1+\sqrt3)i}4$ <span class="mk">M1 A1</span>. Real part $=\left|\frac zw\right|\cos\frac{7\pi}{12}$, so $\cos\frac{7\pi}{12}=\frac{1-\sqrt3}4\div\frac{\sqrt2}2=\frac{\sqrt2-\sqrt6}4$ <span class="mk">A1</span>.</p>`),
  B.key([T`Multiply: moduli multiply, arguments add.`, T`Divide: moduli divide, arguments subtract.`, T`Adjust to the principal argument.`]),
].join('');

BOOK.cx4 = [
  B.why(T`<p>A condition on $z$ — "$z$ is 2 units from $3+i$", "$z$ is equally far from two points" — picks out a set of points in the Argand diagram: a <b>locus</b>. Reading $|z-a|$ as a distance and $\arg(z-a)$ as a direction makes these instantly recognisable.</p>`),
  B.def('the key interpretations', T`<ul><li>$|z-a|$ is the distance between the points $z$ and $a$.</li><li>$\arg(z-a)$ is the angle that the vector from $a$ to $z$ makes with the positive real direction.</li></ul>`),
  B.thm('Standard loci', T`<table class="tbl"><tr><th>Locus</th><th>Shape</th><th>Cartesian form</th></tr><tr><td>$|z-a|=r$</td><td>circle, centre $a$, radius $r$</td><td>$(x-p)^2+(y-q)^2=r^2$ for $a=p+qi$</td></tr><tr><td>$|z-a|=|z-b|$</td><td>perpendicular bisector of $a$ and $b$</td><td>a straight line</td></tr><tr><td>$\arg(z-a)=\theta$</td><td>half-line from $a$ at angle $\theta$ (excluding $a$)</td><td>part of a line</td></tr></table>`),
  FIG.plot({ x: [-1.5, 5.5], y: [-2, 4], xt: [1, 2, 3, 4, 5], yt: [-1, 1, 2, 3], lines: [{ pts: circPts(2, 1, 2), cls: 'fc1' }, { pts: [[1, 1], [4, 4]], cls: 'fc2' }], dots: [[2, 1, '2 + i'], [1, 1, '']], xlab: 'Re', ylab: 'Im' }, 'The circle |z − 2 − i| = 2 and the half-line arg(z − 1 − i) = π/4.'),
  B.ex(1, T`Describe $|z-2-i|=2$ and find the greatest and least values of $|z|$ on it.`, [T`Circle, centre $2+i$, radius $2$: $(x-2)^2+(y-1)^2=4$.`, T`The centre is $\sqrt5$ from $O$. Along the line through $O$ and the centre: greatest $|z|=\sqrt5+2=4.24$; least $|z|=\sqrt5-2=0.236$ ($O$ is outside the circle).`]),
  B.ex(2, T`Find the Cartesian equation of $|z-4|=|z+2i|$.`, [T`$(x-4)^2+y^2=x^2+(y+2)^2$.`, T`$-8x+16=4y+4\Rightarrow y=3-2x$: the perpendicular bisector of $(4,0)$ and $(0,-2)$.`]),
  B.ex(3, T`Describe $\arg(z-1-i)=\frac\pi4$, and find where it meets $|z-4|=|z+2i|$.`, [T`Half-line from $(1,1)$ at $45^\circ$: $y=x$ with $x\gt1$.`, T`Meet $y=3-2x$: $x=3-2x\Rightarrow x=1$ — but $x=1$ is the excluded end point, so the loci <b>do not meet</b>.`], T`Always check the half-line restriction; the full line would have met.`),
  B.warn([T`Reading $|z+2i|$ as distance from $2i$ — it is distance from $-2i$.`, T`Including the end point of a half-line.`, T`Treating $\arg(z-a)=\theta$ as a full line.`]),
  B.exam([T`Sketch on one diagram, label centres, radii and angles, and use solid/dashed boundaries for $\le$ and $\lt$ in regions.`]),
  B.checks([[T`Describe $|z+1-3i|=5$.`, T`Circle, centre $-1+3i$, radius $5$.`], [T`$|z|=|z-6|$ is which line?`, T`$x=3$.`], [T`Describe $\arg z=-\frac\pi2$.`, T`The negative imaginary axis (excluding $O$).`]]),
  B.examq(10, T`<p>(a) Sketch, on the same Argand diagram, the loci $|z-3-2i|=2$ and $\arg(z-1)=\frac\pi4$. <span class="mk">[4]</span> (b) Find, in the form $a+bi$, the complex numbers that lie on both loci. <span class="mk">[4]</span> (c) Find the greatest value of $|z|$ for $z$ on the circle. <span class="mk">[2]</span></p>`,
    T`<p>(a) Circle centre $(3,2)$, radius $2$ <span class="mk">B1 B1</span>; half-line from $(1,0)$ at $45^\circ$, end point excluded <span class="mk">B1 B1</span>.</p><p>(b) Half-line: $y=x-1$, $x\gt1$ <span class="mk">B1</span>. $(x-3)^2+(x-3)^2=4\Rightarrow x=3\pm\sqrt2$ <span class="mk">M1 A1</span> (both $\gt1$). $z=(3+\sqrt2)+(2+\sqrt2)i$ and $z=(3-\sqrt2)+(2-\sqrt2)i$ <span class="mk">A1</span>.</p><p>(c) $\sqrt{13}+2=5.61$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$|z-a|$: distance; $\arg(z-a)$: direction from $a$.`, T`Circle, perpendicular bisector, half-line.`]),
].join('');
