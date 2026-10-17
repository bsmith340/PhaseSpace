// BCSFM textbook, part 2: Complex numbers; Polar coordinates.
'use strict';

/* ===================================================================== */
BOOK.cx1 = [
  B.why(T`<p>A complex number is a point in a plane. You can describe a point by its <b>coordinates</b> $(x,y)$ — or by <b>how far</b> it is from the origin and <b>which direction</b>. The second description makes multiplication beautiful: lengths multiply and angles add. This is the language De Moivre's theorem and roots of unity are written in.</p>`),
  B.pre(T`<p>AS 1: $i^2=-1$, the Argand diagram, adding/multiplying/dividing $x+iy$, conjugates. Trig: exact values, compound-angle formulae.</p>`),
  B.def('modulus and argument', T`<p>For $z=x+iy$, the <b>modulus</b> is the distance from $O$: $|z|=r=\sqrt{x^2+y^2}$.</p>
<p>The <b>argument</b> $\arg z=\theta$ is the angle from the positive real axis, anticlockwise positive. The <b>principal argument</b> is the one with $-\pi\lt\theta\le\pi$.</p>
<p>Since $x=r\cos\theta$ and $y=r\sin\theta$: $\quad z=r(\cos\theta+i\sin\theta)$ — the <b>modulus–argument form</b>.</p>`),
  T`<h3>1. Finding the argument without mistakes</h3>
<p>$\tan\theta=\frac yx$ has two solutions in $(-\pi,\pi]$, so a calculator's $\arctan$ is right only in quadrants 1 and 4. Always: <b>sketch</b>, find the acute base angle $\alpha=\arctan\left|\frac yx\right|$, then adjust.</p>
<table class="tbl"><tr><th>Quadrant</th><th>Example</th><th>$\arg z$</th></tr>
<tr><td>1 ($x\gt0,y\gt0$)</td><td>$1+i$</td><td>$\alpha=\frac\pi4$</td></tr>
<tr><td>2 ($x\lt0,y\gt0$)</td><td>$-1+\sqrt3\,i$</td><td>$\pi-\alpha=\frac{2\pi}3$</td></tr>
<tr><td>3 ($x\lt0,y\lt0$)</td><td>$-1-i$</td><td>$-(\pi-\alpha)=-\frac{3\pi}4$</td></tr>
<tr><td>4 ($x\gt0,y\lt0$)</td><td>$\sqrt3-i$</td><td>$-\alpha=-\frac\pi6$</td></tr></table>`,
  T`<h3>2. Euler's formula and exponential form</h3>`,
  B.thm("Euler's formula", T`$$e^{i\theta}=\cos\theta+i\sin\theta\qquad\Longrightarrow\qquad z=re^{i\theta}.$$`),
  B.proof(T`<p>Use the Maclaurin series $e^x=\sum\frac{x^n}{n!}$ with $x=i\theta$. The powers of $i$ cycle $1,i,-1,-i$:</p>
$$e^{i\theta}=1+i\theta+\frac{(i\theta)^2}{2!}+\frac{(i\theta)^3}{3!}+\frac{(i\theta)^4}{4!}+\cdots=\left(1-\frac{\theta^2}{2!}+\frac{\theta^4}{4!}-\cdots\right)+i\left(\theta-\frac{\theta^3}{3!}+\cdots\right).$$
<p>The brackets are exactly the series for $\cos\theta$ and $\sin\theta$ (chapter 2.3).</p>`, 'Justification (via Maclaurin series)'),
  B.tip(T`<p>Put $\theta=\pi$: $e^{i\pi}=-1$, i.e. $e^{i\pi}+1=0$ — linking $e,i,\pi,1,0$ in one equation.</p>
<p>Also: $e^{-i\theta}=\cos\theta-i\sin\theta$, so adding and subtracting,</p>
$$\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}{2},\qquad\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}.$$
<p>Compare with $\cosh$ and $\sinh$ in chapter 5.1 — that's not a coincidence.</p>`),
  T`<h3>3. Multiplying and dividing</h3>`,
  B.thm('Products and quotients', T`$$z_1z_2=r_1r_2\,e^{i(\theta_1+\theta_2)},\qquad\frac{z_1}{z_2}=\frac{r_1}{r_2}\,e^{i(\theta_1-\theta_2)}.$$<p>So $|z_1z_2|=|z_1||z_2|$ and $\arg(z_1z_2)=\arg z_1+\arg z_2$ (adjust by $2\pi$ if needed).</p>`),
  B.proof(T`<p>Without exponentials: $(\cos\theta_1+i\sin\theta_1)(\cos\theta_2+i\sin\theta_2)=(\cos\theta_1\cos\theta_2-\sin\theta_1\sin\theta_2)+i(\sin\theta_1\cos\theta_2+\cos\theta_1\sin\theta_2)$, which by the compound-angle formulae is $\cos(\theta_1+\theta_2)+i\sin(\theta_1+\theta_2)$. Multiply by $r_1r_2$.</p>
<p>For division: $\frac{1}{\cos\theta+i\sin\theta}=\frac{\cos\theta-i\sin\theta}{\cos^2\theta+\sin^2\theta}=\cos(-\theta)+i\sin(-\theta)$; then use the product rule.</p>`),
  B.ex(1, T`Find $|z|$ and $\arg z$ for $z=(1+i)(\sqrt3+i)$, and hence find the exact value of $\cos\frac{5\pi}{12}$.`, [
    T`$1+i=\sqrt2\,e^{i\pi/4}$ and $\sqrt3+i=2e^{i\pi/6}$.`,
    T`So $z=2\sqrt2\,e^{i(\pi/4+\pi/6)}=2\sqrt2\,e^{5\pi i/12}$: $|z|=2\sqrt2$, $\arg z=\frac{5\pi}{12}$.`,
    T`Expanding directly: $z=\sqrt3+i+\sqrt3\,i-1=(\sqrt3-1)+(\sqrt3+1)i$.`,
    T`Real parts agree: $2\sqrt2\cos\frac{5\pi}{12}=\sqrt3-1$, so $\cos\frac{5\pi}{12}=\dfrac{\sqrt3-1}{2\sqrt2}=\dfrac{\sqrt6-\sqrt2}{4}$.`]),
  B.ex(2, T`$z=4e^{i\pi/3}$, $w=2e^{-3\pi i/4}$. Find $\dfrac zw$ in exponential form with principal argument.`, [
    T`Modulus $\frac42=2$. Argument $\frac\pi3-\left(-\frac{3\pi}4\right)=\frac{13\pi}{12}$.`,
    T`$\frac{13\pi}{12}\gt\pi$, so subtract $2\pi$: $-\frac{11\pi}{12}$. Answer: $2e^{-11\pi i/12}$.`]),
  T`<h3>4. Geometry of multiplication</h3><p>Multiplying by $e^{i\alpha}$ <b>rotates</b> a point by $\alpha$ about $O$; multiplying by $re^{i\alpha}$ rotates and enlarges by scale factor $r$. Multiplying by $i=e^{i\pi/2}$ rotates by $90^\circ$. The Argand sim shows this live.</p>`,
  B.warn([T`$\arg(-1-i)=\frac\pi4$ — wrong quadrant; it's $-\frac{3\pi}4$.`, T`Giving an argument outside $(-\pi,\pi]$ when the principal value is asked for.`, T`Degrees: arguments are in radians.`]),
  B.checks([[T`Write $-2\sqrt3+2i$ in exponential form.`, T`$r=4$, quadrant 2, $\alpha=\frac\pi6$: $4e^{5\pi i/6}$.`], [T`Simplify $\left(2e^{i\pi/5}\right)\left(3e^{4\pi i/5}\right)$.`, T`$6e^{i\pi}=-6$.`]]),
  B.examq(6, T`<p>$z=1-\sqrt3\,i$. (a) Write $z$ in the form $re^{i\theta}$, $-\pi\lt\theta\le\pi$. (b) Find $z^2$ and $\dfrac1z$ in the same form.</p>`,
    T`<p>(a) $r=2$ <span class="mk">B1</span>, $\theta=-\frac\pi3$ <span class="mk">B1</span>: $z=2e^{-i\pi/3}$.</p><p>(b) $z^2=4e^{-2\pi i/3}$ <span class="mk">M1 A1</span>; $\frac1z=\frac12e^{i\pi/3}$ <span class="mk">M1 A1</span></p>`),
  B.key([T`$z=r(\cos\theta+i\sin\theta)=re^{i\theta}$; principal $\theta\in(-\pi,\pi]$.`, T`Multiply: moduli multiply, arguments add. Divide: divide, subtract.`, T`$\cos\theta=\frac12(e^{i\theta}+e^{-i\theta})$, $\sin\theta=\frac1{2i}(e^{i\theta}-e^{-i\theta})$.`]),
].join('');

/* ===================================================================== */
BOOK.cx2 = [
  B.why(T`<p>If multiplying adds arguments, then multiplying $z$ by itself $n$ times multiplies the argument by $n$. That one observation — <b>De Moivre's theorem</b> — gives you instant powers, trig identities for $\cos n\theta$, and a way to integrate $\cos^4\theta$. It is one of the most heavily examined results in A2 1.</p>`),
  B.thm("De Moivre's theorem", T`$$(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta\qquad\text{for all }n\in\mathbb Z.$$<p>Equivalently $\left(re^{i\theta}\right)^n=r^ne^{in\theta}$.</p>`),
  B.proof(T`<p><b>Positive integers, by induction.</b></p>
<p><i>Basis</i>: $n=1$ gives $\cos\theta+i\sin\theta$ on both sides. ✓</p>
<p><i>Assume</i> $(\cos\theta+i\sin\theta)^k=\cos k\theta+i\sin k\theta$. Then</p>
$$\begin{aligned}(\cos\theta+i\sin\theta)^{k+1}&=(\cos k\theta+i\sin k\theta)(\cos\theta+i\sin\theta)\\&=(\cos k\theta\cos\theta-\sin k\theta\sin\theta)+i(\sin k\theta\cos\theta+\cos k\theta\sin\theta)\\&=\cos(k+1)\theta+i\sin(k+1)\theta\end{aligned}$$
<p>using the compound-angle formulae. <i>Conclusion</i>: true for $n=1$; true for $k\Rightarrow$ true for $k+1$; so true for all $n\in\mathbb Z^+$.</p>
<p><b>$n=0$</b>: both sides equal $1$.</p>
<p><b>Negative integers</b>: let $n=-m$ with $m\in\mathbb Z^+$. Then</p>
$$(\cos\theta+i\sin\theta)^{-m}=\frac{1}{\cos m\theta+i\sin m\theta}=\frac{\cos m\theta-i\sin m\theta}{\cos^2m\theta+\sin^2m\theta}=\cos(-m\theta)+i\sin(-m\theta)=\cos n\theta+i\sin n\theta.$$`),
  T`<h3>1. Powers</h3>`,
  B.ex(1, T`Find $(1+\sqrt3\,i)^6$.`, [T`$1+\sqrt3\,i=2e^{i\pi/3}$.`, T`$(2e^{i\pi/3})^6=64e^{2\pi i}=64$.`], T`Compare with expanding $(1+\sqrt3 i)^6$ binomially — seven terms and lots of surds!`),
  B.ex(2, T`Express $\dfrac{(\cos3\theta+i\sin3\theta)^2}{\cos\theta-i\sin\theta}$ in the form $\cos n\theta+i\sin n\theta$.`, [T`Numerator $=e^{6i\theta}$; denominator $=e^{-i\theta}$.`, T`Quotient $=e^{7i\theta}=\cos7\theta+i\sin7\theta$.`]),
  T`<h3>2. Multiple angles in terms of powers</h3>
<p>Write $c=\cos\theta$, $s=\sin\theta$. Then $\cos n\theta=\operatorname{Re}(c+is)^n$ and $\sin n\theta=\operatorname{Im}(c+is)^n$. Expand binomially and use $s^2=1-c^2$ (or $c^2=1-s^2$).</p>`,
  B.ex(3, T`Show $\cos3\theta=4\cos^3\theta-3\cos\theta$ and $\sin3\theta=3\sin\theta-4\sin^3\theta$.`, [
    T`$(c+is)^3=c^3+3c^2(is)+3c(is)^2+(is)^3=c^3+3ic^2s-3cs^2-is^3$.`,
    T`Real part: $\cos3\theta=c^3-3cs^2=c^3-3c(1-c^2)=4c^3-3c$.`,
    T`Imaginary part: $\sin3\theta=3c^2s-s^3=3(1-s^2)s-s^3=3s-4s^3$.`]),
  B.ex(4, T`Express $\cos4\theta$ in terms of $\cos\theta$.`, [
    T`$\operatorname{Re}(c+is)^4=c^4-6c^2s^2+s^4$ (binomial coefficients $1,4,6,4,1$; the real terms are the even powers of $is$).`,
    T`Replace $s^2=1-c^2$: $c^4-6c^2(1-c^2)+(1-c^2)^2=c^4-6c^2+6c^4+1-2c^2+c^4$.`,
    T`$\cos4\theta=8c^4-8c^2+1$.`]),
  T`<h3>3. Powers in terms of multiple angles</h3>`,
  B.thm('Key identities', T`<p>If $z=e^{i\theta}$ then</p>$$z^n+\frac1{z^n}=2\cos n\theta,\qquad z^n-\frac1{z^n}=2i\sin n\theta.$$`),
  B.proof(T`<p>$z^n=\cos n\theta+i\sin n\theta$ and $z^{-n}=\cos n\theta-i\sin n\theta$ (De Moivre with $-n$). Add and subtract.</p>`),
  B.ex(5, T`Express $\cos^4\theta$ in terms of multiple angles, and hence find $\displaystyle\int_0^{\pi/2}\cos^4\theta\,d\theta$.`, [
    T`$(2\cos\theta)^4=\left(z+\frac1z\right)^4=z^4+4z^2+6+\frac4{z^2}+\frac1{z^4}$.`,
    T`Pair terms: $=\left(z^4+\frac1{z^4}\right)+4\left(z^2+\frac1{z^2}\right)+6=2\cos4\theta+8\cos2\theta+6$.`,
    T`$16\cos^4\theta=2\cos4\theta+8\cos2\theta+6$, so $\cos^4\theta=\frac18\left(\cos4\theta+4\cos2\theta+3\right)$.`,
    T`$\displaystyle\int_0^{\pi/2}=\frac18\left[\frac{\sin4\theta}4+2\sin2\theta+3\theta\right]_0^{\pi/2}=\frac18\cdot\frac{3\pi}{2}=\frac{3\pi}{16}$.`]),
  B.ex(6, T`Express $\sin^5\theta$ in the form $a\sin5\theta+b\sin3\theta+c\sin\theta$.`, [
    T`$(2i\sin\theta)^5=\left(z-\frac1z\right)^5=z^5-5z^3+10z-\frac{10}z+\frac5{z^3}-\frac1{z^5}$.`,
    T`Pair: $\left(z^5-\frac1{z^5}\right)-5\left(z^3-\frac1{z^3}\right)+10\left(z-\frac1z\right)=2i\sin5\theta-10i\sin3\theta+20i\sin\theta$.`,
    T`$(2i)^5=32i$, so $32i\sin^5\theta=2i\sin5\theta-10i\sin3\theta+20i\sin\theta$.`,
    T`$\sin^5\theta=\frac1{16}\left(\sin5\theta-5\sin3\theta+10\sin\theta\right)$.`]),
  T`<h3>4. Summing series with $C+iS$</h3>
<p>To sum a trig series, pair a cosine series $C$ with the matching sine series $S$, form $C+iS$ (a series in $e^{i\theta}$), sum it, and take the real part.</p>`,
  B.ex(7, T`Show that $\displaystyle\sum_{k=0}^{n}\binom nk\cos k\theta=2^n\cos^n\frac\theta2\cos\frac{n\theta}2$.`, [
    T`Let $C=\sum\binom nk\cos k\theta$, $S=\sum\binom nk\sin k\theta$. Then $C+iS=\sum\binom nk e^{ik\theta}=(1+e^{i\theta})^n$ (binomial theorem).`,
    T`Factor out the half angle: $1+e^{i\theta}=e^{i\theta/2}\left(e^{-i\theta/2}+e^{i\theta/2}\right)=2\cos\frac\theta2\,e^{i\theta/2}$.`,
    T`So $C+iS=2^n\cos^n\frac\theta2\,e^{in\theta/2}$. Taking real parts: $C=2^n\cos^n\frac\theta2\cos\frac{n\theta}2$.`]),
  B.warn([T`$(z-z^{-1})^n=(2i\sin\theta)^n$: forgetting the $i^n$.`, T`Losing the factor $2^n$ in $(2\cos\theta)^n$.`, T`Using De Moivre on something not of the form $\cos\theta+i\sin\theta$ — e.g. $(\cos\theta-i\sin\theta)^n=\cos n\theta-i\sin n\theta$ (rewrite as $e^{-i\theta}$ first).`]),
  B.exam([T`"Use De Moivre's theorem to show…" needs the binomial expansion visible and the real/imaginary part selected explicitly.`, T`These identities are often followed by "hence solve" or "hence integrate" — keep your result in the exact form asked.`]),
  B.checks([[T`Find $(\sqrt3-i)^{-4}$.`, T`$(2e^{-i\pi/6})^{-4}=\frac1{16}e^{2\pi i/3}=\frac1{16}\left(-\frac12+\frac{\sqrt3}2i\right)$.`], [T`Show $\tan3\theta=\dfrac{3t-t^3}{1-3t^2}$, $t=\tan\theta$.`, T`Divide $\sin3\theta=3c^2s-s^3$ by $\cos3\theta=c^3-3cs^2$, then divide top and bottom by $c^3$.`], [T`Express $\cos^3\theta$ in multiple angles.`, T`$8\cos^3\theta=2\cos3\theta+6\cos\theta$, so $\cos^3\theta=\frac14(\cos3\theta+3\cos\theta)$.`]]),
  B.examq(10, T`<p>(a) Use De Moivre's theorem to show that $\cos5\theta=16\cos^5\theta-20\cos^3\theta+5\cos\theta$. (b) Hence find the exact value of $\cos^2\frac{\pi}{10}$.</p>`,
    T`<p>(a) $\cos5\theta=\operatorname{Re}(c+is)^5=c^5-10c^3s^2+5cs^4$ <span class="mk">M1 A1</span></p>
<p>$=c^5-10c^3(1-c^2)+5c(1-c^2)^2$ <span class="mk">M1</span> $=16c^5-20c^3+5c$ <span class="mk">A1</span></p>
<p>(b) $\theta=\frac\pi{10}$ makes $\cos5\theta=\cos\frac\pi2=0$ <span class="mk">M1</span>. Since $c\ne0$: $16c^4-20c^2+5=0$ <span class="mk">M1</span></p>
<p>$c^2=\frac{20\pm\sqrt{400-320}}{32}=\frac{5\pm\sqrt5}{8}$ <span class="mk">A1</span>. $\cos\frac\pi{10}$ is the largest of the roots $\cos\frac{(2k+1)\pi}{10}$, so take $+$: $\cos^2\frac\pi{10}=\frac{5+\sqrt5}{8}$ <span class="mk">A1 A1 A1</span></p>`),
  B.key([T`$(re^{i\theta})^n=r^ne^{in\theta}$, proved by induction and extended to $n\in\mathbb Z$.`, T`$\cos n\theta=\operatorname{Re}(c+is)^n$, $\sin n\theta=\operatorname{Im}(c+is)^n$.`, T`$z^n+z^{-n}=2\cos n\theta$, $z^n-z^{-n}=2i\sin n\theta$ for powers → multiple angles.`]),
].join('');

/* ===================================================================== */
BOOK.cx3 = [
  B.why(T`<p>$z^3=8$ has the obvious solution $z=2$ — but a cubic has three roots. Where are the other two? Complex numbers answer this completely: <b>every</b> non-zero complex number has exactly $n$ distinct $n$th roots, and they sit at the corners of a regular $n$-sided polygon.</p>`),
  B.thm('The nth roots of a complex number', T`<p>If $w=Re^{i\varphi}$ ($R\gt0$), the equation $z^n=w$ has exactly $n$ distinct solutions</p>$$z_k=R^{1/n}\,e^{i(\varphi+2k\pi)/n},\qquad k=0,1,\dots,n-1.$$`),
  B.proof(T`<p>Write $z=re^{i\theta}$. Then $z^n=r^ne^{in\theta}$, and $z^n=w$ means $r^n=R$ and $n\theta=\varphi+2k\pi$ for some integer $k$ (arguments are only defined up to multiples of $2\pi$).</p>
<p>So $r=R^{1/n}$ (the positive real root) and $\theta=\frac{\varphi+2k\pi}n$.</p>
<p>The values $k=0,\dots,n-1$ give arguments differing by less than $2\pi$, so they're distinct points. For $k=n$ the argument is $\frac{\varphi}{n}+2\pi$ — the same point as $k=0$ — and the pattern repeats. Hence exactly $n$ roots.</p>`),
  T`<h3>1. Geometry</h3><p>All roots have the same modulus $R^{1/n}$ — they lie on one circle — and consecutive arguments differ by $\frac{2\pi}{n}$. So they're the vertices of a <b>regular $n$-gon</b> centred at $O$. Find one root and rotate by $\frac{2\pi}n$ repeatedly.</p>`,
  B.ex(1, T`Solve $z^3=8i$, giving answers in the form $a+bi$.`, [
    T`$8i=8e^{i\pi/2}=8e^{i(\pi/2+2k\pi)}$.`,
    T`$z=2e^{i(\pi/6+2k\pi/3)}$; $k=0,1,2$ give arguments $\frac\pi6,\frac{5\pi}6,\frac{3\pi}2$. The last is $-\frac\pi2$ in principal form.`,
    T`$z=\sqrt3+i,\ -\sqrt3+i,\ -2i$.`]),
  B.ex(2, T`Solve $z^4=-16$.`, [T`$-16=16e^{i\pi}$, so $z=2e^{i(\pi/4+k\pi/2)}$.`, T`Arguments $\pm\frac\pi4,\pm\frac{3\pi}4$: $z=\pm\sqrt2\pm\sqrt2\,i$ (all four sign combinations).`]),
  T`<h3>2. Roots of unity</h3>`,
  B.def('roots of unity', T`<p>The solutions of $z^n=1$ are the <b>$n$th roots of unity</b>: $1,\omega,\omega^2,\dots,\omega^{n-1}$ where $\omega=e^{2\pi i/n}$.</p>`),
  B.thm('Sum of the roots of unity', T`$$1+\omega+\omega^2+\dots+\omega^{n-1}=0\qquad(n\ge2).$$`),
  B.proof(T`<p><b>Geometric series:</b> ratio $\omega\ne1$, so the sum is $\dfrac{1-\omega^n}{1-\omega}=\dfrac{1-1}{1-\omega}=0$.</p>
<p><b>Alternatively</b>: they are the roots of $z^n-1=0$, whose $z^{n-1}$ coefficient is $0$; the sum of roots of a polynomial is $-\frac{(\text{coefficient of }z^{n-1})}{(\text{leading coefficient})}=0$.</p>`),
  B.ex(3, T`Show that for the cube roots of unity, $1+\omega+\omega^2=0$, and find $\omega$ exactly.`, [T`$z^3-1=(z-1)(z^2+z+1)$, so the non-real roots satisfy $\omega^2+\omega+1=0$.`, T`$\omega=\frac{-1\pm\sqrt3\,i}{2}$, i.e. $e^{\pm2\pi i/3}$. Note $\omega^2=\bar\omega$.`]),
  B.ex(4, T`Factorise $z^5-1$ into real linear and quadratic factors.`, [
    T`Roots: $1,\ e^{\pm2\pi i/5},\ e^{\pm4\pi i/5}$ — the non-real roots come in conjugate pairs.`,
    T`For a conjugate pair: $(z-e^{i\alpha})(z-e^{-i\alpha})=z^2-(e^{i\alpha}+e^{-i\alpha})z+1=z^2-2\cos\alpha\,z+1$.`,
    T`$z^5-1=(z-1)\left(z^2-2\cos\tfrac{2\pi}5z+1\right)\left(z^2-2\cos\tfrac{4\pi}5z+1\right)$.`]),
  B.tip(T`<p>If $z_0$ is one root of $z^n=w$, then <b>all</b> roots are $z_0,\ z_0\omega,\ z_0\omega^2,\dots$ — multiplying by $\omega$ rotates by $\frac{2\pi}n$.</p>`),
  B.warn([T`Taking only $k=0$ and stopping with one root.`, T`Using $R^n$ instead of $R^{1/n}$ for the modulus.`, T`Not converting arguments back into $(-\pi,\pi]$ when principal values are required.`]),
  B.exam([T`Write the general argument $\varphi+2k\pi$ explicitly before dividing by $n$ — it's the method mark.`, T`If asked to show roots on an Argand diagram, draw the circle and equally spaced points.`]),
  B.checks([[T`Solve $z^6=1$ and describe the shape.`, T`$e^{ik\pi/3}$, $k=0..5$: regular hexagon with vertices $\pm1$, $\pm\frac12\pm\frac{\sqrt3}{2}i$.`], [T`$\omega=e^{2\pi i/7}$. Evaluate $\omega+\omega^2+\dots+\omega^6$.`, T`$-1$ (the full sum including 1 is 0).`]]),
  B.examq(8, T`<p>(a) Find the five roots of $z^5=1$ in the form $e^{i\theta}$. (b) Show that $\cos\frac{2\pi}{5}+\cos\frac{4\pi}{5}=-\frac12$.</p>`,
    T`<p>(a) $z=e^{2k\pi i/5}$, $k=0,\pm1,\pm2$ <span class="mk">M1 A1 A1</span></p>
<p>(b) Sum of roots $=0$ <span class="mk">M1</span>: $1+(e^{2\pi i/5}+e^{-2\pi i/5})+(e^{4\pi i/5}+e^{-4\pi i/5})=0$ <span class="mk">M1</span></p>
<p>$1+2\cos\frac{2\pi}5+2\cos\frac{4\pi}5=0$ <span class="mk">A1</span> $\Rightarrow$ result <span class="mk">A1 A1</span></p>`),
  B.key([T`$z^n=Re^{i\varphi}\Rightarrow z=R^{1/n}e^{i(\varphi+2k\pi)/n}$, $k=0..n-1$.`, T`Roots form a regular $n$-gon. Roots of unity sum to $0$.`, T`Conjugate pair $\to$ real quadratic $z^2-2\cos\alpha\,z+1$.`]),
].join('');

/* ===================================================================== */
BOOK.pl1 = [
  B.why(T`<p>Some curves are horrible in $x$ and $y$ but simple in terms of distance and angle. A cardioid is $(x^2+y^2-ax)^2=a^2(x^2+y^2)$ in Cartesian form — but just $r=a(1+\cos\theta)$ in polar form. Spirals, roses and limaçons are natural in polar coordinates.</p>`),
  B.def('polar coordinates', T`<p>Fix a point $O$ (the <b>pole</b>) and a half-line from it (the <b>initial line</b>, like the positive $x$-axis). A point $P$ has polar coordinates $(r,\theta)$ where $r=|OP|$ and $\theta$ is the angle from the initial line to $OP$, anticlockwise.</p>
<p>In most UK specifications $r\ge0$, with $\theta$ in $(-\pi,\pi]$ or $[0,2\pi)$. Where an equation gives $r\lt0$, no point is plotted.</p>`),
  B.thm('Conversion', T`$$x=r\cos\theta,\quad y=r\sin\theta,\qquad r^2=x^2+y^2,\quad\tan\theta=\frac yx\ (\text{check the quadrant!}).$$`),
  B.ex(1, T`Convert $r=2a\cos\theta$ into Cartesian form and describe the curve.`, [T`Multiply by $r$: $r^2=2ar\cos\theta$, so $x^2+y^2=2ax$.`, T`Complete the square: $(x-a)^2+y^2=a^2$ — a circle, centre $(a,0)$, radius $a$, passing through the pole.`], T`Multiplying by $r$ is the standard trick to create $r^2$ and $r\cos\theta$.`),
  B.ex(2, T`Convert $r=\dfrac{3}{\cos\theta+2\sin\theta}$ to Cartesian form.`, [T`$r\cos\theta+2r\sin\theta=3$, i.e. $x+2y=3$: a straight line.`]),
  B.ex(3, T`Write $x^2+y^2=4x$ and $xy=1$ in polar form.`, [T`$r^2=4r\cos\theta\Rightarrow r=4\cos\theta$.`, T`$r^2\sin\theta\cos\theta=1\Rightarrow r^2\sin2\theta=2$.`]),
  T`<h3>1. How to sketch a polar curve</h3>
<ol><li><b>Table</b> of $\theta$ against $r$ at multiples of $\frac\pi6$ (or $\frac\pi4$).</li>
<li><b>Symmetry</b>: if $r(\theta)=r(-\theta)$ (e.g. only $\cos\theta$ appears), the curve is symmetric in the initial line.</li>
<li><b>Maximum/minimum $r$</b> and where they occur.</li>
<li><b>Where $r=0$</b>: if $r=0$ at $\theta=\alpha$, the line $\theta=\alpha$ is a <b>tangent at the pole</b>.</li>
<li>Where the formula gives $r\lt0$: no curve.</li></ol>`,
  B.ex(4, T`Sketch $r=2(1+\cos\theta)$, $-\pi\lt\theta\le\pi$.`, [
    T`Table: $\theta=0\to r=4$; $\pm\frac\pi3\to3$; $\pm\frac\pi2\to2$; $\pm\frac{2\pi}3\to1$; $\pi\to0$.`,
    T`Symmetric in the initial line ($\cos$ is even). Max $r=4$ at $\theta=0$.`,
    T`$r=0$ at $\theta=\pi$: the curve meets the pole, with tangent $\theta=\pi$ (the initial line) — the <b>cusp</b> of a cardioid.`,
    T`Use the polar sim to see it traced.`]),
  T`<h3>2. A gallery</h3><table class="tbl"><tr><th>Equation</th><th>Shape</th><th>Key features</th></tr>
<tr><td>$r=a$</td><td>circle</td><td>centre $O$</td></tr>
<tr><td>$\theta=\alpha$</td><td>half-line</td><td>from $O$</td></tr>
<tr><td>$r=a\theta$</td><td>spiral</td><td>$r$ grows steadily</td></tr>
<tr><td>$r=a(1+\cos\theta)$</td><td>cardioid</td><td>cusp at $O$</td></tr>
<tr><td>$r=a(p+q\cos\theta)$, $q\lt p\lt2q$</td><td>dimpled limaçon</td><td>indent near $\theta=\pi$</td></tr>
<tr><td>$r=a(p+q\cos\theta)$, $p\ge2q$</td><td>convex limaçon</td><td>egg-shaped</td></tr>
<tr><td>$r=a\cos n\theta$</td><td>rose</td><td>$n$ loops where $r\ge0$</td></tr></table>`,
  B.tip(T`<p><b>Why does $r=0$ give a tangent?</b> Near the pole, points on the curve are at angle $\approx\alpha$ and tiny distance, so the curve approaches $O$ along the direction $\theta=\alpha$.</p>`),
  B.warn([T`Plotting points with $r\lt0$ (unless the spec/question allows it).`, T`Missing the cusp/pole behaviour.`, T`Converting $\tan\theta=\frac yx$ without checking the quadrant.`]),
  B.checks([[T`Convert $(x^2+y^2)^2=4xy$ to polar.`, T`$r^4=4r^2\cos\theta\sin\theta\Rightarrow r^2=2\sin2\theta$.`], [T`Max and min of $r=3+2\cos\theta$?`, T`Max $5$ at $\theta=0$, min $1$ at $\theta=\pi$. Never zero, so it never reaches the pole.`]]),
  B.examq(5, T`<p>(a) Sketch $r=3+2\cos\theta$, $-\pi\lt\theta\le\pi$, stating the coordinates of the points where it meets the initial line and the line $\theta=\pm\frac\pi2$. (b) Find a Cartesian equation.</p>`,
    T`<p>(a) Dimpled limaçon (since $2\lt3\lt4$), symmetric in the initial line <span class="mk">B1</span>; $(5,0)$, $(1,\pi)$, $\left(3,\pm\frac\pi2\right)$ <span class="mk">B1 B1</span></p>
<p>(b) $r^2=3r+2r\cos\theta\Rightarrow x^2+y^2-2x=3\sqrt{x^2+y^2}$ <span class="mk">M1 A1</span></p>`),
  B.key([T`$x=r\cos\theta$, $y=r\sin\theta$, $r^2=x^2+y^2$.`, T`Sketch: table, symmetry, max/min, $r=0$ ⇒ tangent at pole.`]),
].join('');

/* ===================================================================== */
BOOK.pl2 = [
  B.why(T`<p>In Cartesian coordinates you find area by slicing into thin <b>rectangles</b>. In polar coordinates the natural slice is a thin <b>sector</b> — a slice of pizza from the pole.</p>`),
  B.thm('Area in polar coordinates', T`<p>The area bounded by $r=f(\theta)$ and the half-lines $\theta=\alpha$, $\theta=\beta$ is</p>$$A=\frac12\int_\alpha^\beta r^2\,d\theta.$$`),
  B.proof(T`<p>A sector of radius $r$ and angle $\delta\theta$ has area $\frac12r^2\delta\theta$ (since a full circle, angle $2\pi$, has area $\pi r^2$). Split the region into thin sectors between $\theta$ and $\theta+\delta\theta$: each is approximately a sector of radius $r(\theta)$, area $\approx\frac12r^2\delta\theta$. Summing and letting $\delta\theta\to0$:</p>$$A=\lim\sum\tfrac12r^2\,\delta\theta=\int_\alpha^\beta\tfrac12r^2\,d\theta.$$`, 'Derivation'),
  B.ex(1, T`Find the area enclosed by the cardioid $r=a(1+\cos\theta)$.`, [
    T`$A=\frac12\int_{-\pi}^{\pi}a^2(1+\cos\theta)^2d\theta=a^2\int_0^{\pi}(1+2\cos\theta+\cos^2\theta)d\theta$ (symmetry).`,
    T`$\cos^2\theta=\frac12(1+\cos2\theta)$: integrand $=\frac32+2\cos\theta+\frac12\cos2\theta$.`,
    T`$a^2\left[\frac32\theta+2\sin\theta+\frac14\sin2\theta\right]_0^\pi=\frac{3\pi a^2}{2}$.`]),
  B.ex(2, T`Find the area of one loop of $r=a\sin3\theta$.`, [T`One loop: $r\ge0$ from $\theta=0$ to $\frac\pi3$.`, T`$A=\frac{a^2}2\int_0^{\pi/3}\sin^23\theta\,d\theta=\frac{a^2}4\int_0^{\pi/3}(1-\cos6\theta)d\theta=\frac{a^2}4\cdot\frac\pi3=\frac{\pi a^2}{12}$.`]),
  T`<h3>Area between two curves</h3><p>Find where they intersect (solve $r_1=r_2$), sketch, then subtract: $A=\frac12\int(r_{\text{outer}}^2-r_{\text{inner}}^2)\,d\theta$.</p>`,
  B.ex(3, T`Find the area inside $r=3\cos\theta$ and outside $r=1+\cos\theta$.`, [
    T`Intersect: $3\cos\theta=1+\cos\theta\Rightarrow\cos\theta=\frac12$, $\theta=\pm\frac\pi3$.`,
    T`$A=\frac12\int_{-\pi/3}^{\pi/3}\left(9\cos^2\theta-(1+\cos\theta)^2\right)d\theta=\frac12\int_{-\pi/3}^{\pi/3}(8\cos^2\theta-1-2\cos\theta)\,d\theta$.`,
    T`$8\cos^2\theta=4+4\cos2\theta$, so the integrand is $3+4\cos2\theta-2\cos\theta$.`,
    T`$\left[3\theta+2\sin2\theta-2\sin\theta\right]_{-\pi/3}^{\pi/3}=2\pi+4\cdot\frac{\sqrt3}{2}-4\cdot\frac{\sqrt3}2=2\pi$. Times $\frac12$: $A=\pi$.`]),
  B.warn([T`Forgetting the $\frac12$.`, T`Squaring wrongly: $(1+\cos\theta)^2\ne1+\cos^2\theta$.`, T`Integrating over a range where $r\lt0$ (it would count area that isn't on the sketch).`, T`Not using symmetry, then making limit errors.`]),
  B.checks([[T`Area enclosed by $r=2+\cos\theta$.`, T`$\frac12\int_0^{2\pi}(4+4\cos\theta+\cos^2\theta)d\theta=\frac12(8\pi+\pi)=\frac{9\pi}2$.`], [T`Area swept by $r=e^{\theta}$ from $0$ to $\pi$.`, T`$\frac12\int_0^\pi e^{2\theta}d\theta=\frac14(e^{2\pi}-1)$.`]]),
  B.examq(7, T`<p>The curve $C$ has equation $r=2+\cos\theta$. Find the exact area of the region bounded by $C$, the initial line and the half-line $\theta=\frac\pi2$.</p>`,
    T`<p>$A=\frac12\int_0^{\pi/2}(2+\cos\theta)^2d\theta$ <span class="mk">M1</span> $=\frac12\int_0^{\pi/2}\left(4+4\cos\theta+\frac12+\frac12\cos2\theta\right)d\theta$ <span class="mk">M1 A1</span></p>
<p>$=\frac12\left[\frac92\theta+4\sin\theta+\frac14\sin2\theta\right]_0^{\pi/2}$ <span class="mk">A1</span> $=\frac12\left(\frac{9\pi}4+4\right)=\frac{9\pi}8+2$ <span class="mk">M1 A1 A1</span></p>`),
  B.key([T`$A=\frac12\int_\alpha^\beta r^2d\theta$.`, T`$\cos^2\theta=\frac12(1+\cos2\theta)$ appears almost every time.`, T`Between curves: intersections first, then outer² − inner².`]),
].join('');

/* ===================================================================== */
BOOK.pl3 = [
  B.why(T`<p>Where is a polar curve highest? Where is it furthest left? Those are the points where the tangent is <b>horizontal</b> (parallel to the initial line) or <b>vertical</b> (perpendicular). We find them by turning the curve into a parametric curve with parameter $\theta$.</p>`),
  B.thm('Tangent conditions', T`<p>With $x=r\cos\theta$ and $y=r\sin\theta$ (both functions of $\theta$):</p>
<ul><li>tangent <b>parallel</b> to the initial line where $\dfrac{dy}{d\theta}=0$ (and $\frac{dx}{d\theta}\ne0$);</li>
<li>tangent <b>perpendicular</b> to the initial line where $\dfrac{dx}{d\theta}=0$ (and $\frac{dy}{d\theta}\ne0$).</li></ul>`),
  B.proof(T`<p>Parametrically, $\dfrac{dy}{dx}=\dfrac{dy/d\theta}{dx/d\theta}$. The gradient is zero when the numerator is zero, and infinite (vertical tangent) when the denominator is zero.</p>`, 'Why'),
  B.ex(1, T`Find the points on $r=a(1+\cos\theta)$ where the tangent is parallel to the initial line.`, [
    T`$y=r\sin\theta=a(\sin\theta+\sin\theta\cos\theta)=a\left(\sin\theta+\frac12\sin2\theta\right)$.`,
    T`$\dfrac{dy}{d\theta}=a(\cos\theta+\cos2\theta)=a(2\cos^2\theta+\cos\theta-1)=a(2\cos\theta-1)(\cos\theta+1)$.`,
    T`Zero when $\cos\theta=\frac12$ ($\theta=\pm\frac\pi3$, $r=\frac{3a}2$) or $\cos\theta=-1$ ($\theta=\pi$, $r=0$: the pole — the cusp, where $\frac{dx}{d\theta}=0$ too, so reject).`,
    T`Points: $\left(\frac{3a}2,\pm\frac\pi3\right)$.`]),
  B.ex(2, T`Same curve: tangents perpendicular to the initial line.`, [
    T`$x=a(\cos\theta+\cos^2\theta)$, $\dfrac{dx}{d\theta}=-a\sin\theta(1+2\cos\theta)$.`,
    T`$\sin\theta=0$: $\theta=0$ ($r=2a$) or $\theta=\pi$ (pole, reject). $\cos\theta=-\frac12$: $\theta=\pm\frac{2\pi}3$, $r=\frac a2$.`,
    T`Points: $(2a,0)$ and $\left(\frac a2,\pm\frac{2\pi}3\right)$.`]),
  B.warn([T`Differentiating $r$ instead of $r\sin\theta$ or $r\cos\theta$.`, T`Keeping solutions with $|\cos\theta|\gt1$ or $r\lt0$.`]),
  B.checks([[T`$r=2+\cos\theta$: where is the tangent parallel to the initial line ($0\lt\theta\lt\pi$)?`, T`$\frac{dy}{d\theta}=2\cos\theta+\cos2\theta=2c^2+2c-1=0$, $c=\frac{-1+\sqrt3}{2}$, $r=\frac{3+\sqrt3}{2}$.`]]),
  B.examq(6, T`<p>Find the polar coordinates of the points on $r=4\sin2\theta$, $0\le\theta\le\frac\pi2$, where the tangent is parallel to the initial line.</p>`,
    T`<p>$y=4\sin2\theta\sin\theta=8\sin^2\theta\cos\theta$ <span class="mk">M1</span>; $\frac{dy}{d\theta}=8(2\sin\theta\cos^2\theta-\sin^3\theta)=8\sin\theta(2\cos^2\theta-\sin^2\theta)$ <span class="mk">M1 A1</span></p>
<p>$\sin\theta=0$ is the pole (reject); $\tan^2\theta=2$, $\theta=\arctan\sqrt2$ <span class="mk">A1</span>; $\sin2\theta=\frac{2\tan\theta}{1+\tan^2\theta}=\frac{2\sqrt2}{3}$, $r=\frac{8\sqrt2}{3}$ <span class="mk">M1 A1</span></p>`),
  B.key([T`Parallel: $\frac{d}{d\theta}(r\sin\theta)=0$. Perpendicular: $\frac{d}{d\theta}(r\cos\theta)=0$.`]),
].join('');
