// BCS Academy textbook — chapters for outcomes added from the official specifications:
// FM A2 1: small angle approximations (A7), sums of series by De Moivre (C1), (x² ± a²)^(−1/2) integrals (H5);
// Maths AS 1: exponential growth and decay models (E9, E10).
'use strict';

/* ===================================================================== */
BOOK.sa1 = [
  B.why(T`<p>For a small angle, a sine is almost the angle itself: $\sin0.1=0.0998\ldots$. Replacing $\sin$, $\cos$ and $\tan$ by simple polynomials turns messy trigonometric expressions into algebra, and gives quick estimates and limits.</p>`),
  B.thm('Small angle approximations (in the formula booklet)', T`$$\sin\theta\approx\theta,\qquad\cos\theta\approx1-\frac{\theta^2}{2},\qquad\tan\theta\approx\theta\qquad(\theta\text{ small, measured in radians}).$$`),
  B.proof(T`<p><b>From Maclaurin series</b> (chapter 2.3): $\sin\theta=\theta-\frac{\theta^3}{6}+\dots$, $\cos\theta=1-\frac{\theta^2}{2}+\frac{\theta^4}{24}-\dots$, $\tan\theta=\theta+\frac{\theta^3}{3}+\dots$ For small $\theta$ the later terms are tiny, so truncating gives the approximations. The first neglected term tells you the size of the error: about $\frac{\theta^3}{6}$ for $\sin\theta$.</p>
<p><b>Geometrically</b>: in a unit circle with angle $\theta$, the triangle inside the sector, the sector and the triangle containing it have areas $\frac12\sin\theta\cos\theta\lt\frac12\theta\lt\frac12\tan\theta$. As $\theta\to0$, $\cos\theta\to1$, so $\sin\theta$, $\theta$ and $\tan\theta$ squeeze together. Then $\cos\theta=1-2\sin^2\frac\theta2\approx1-2\left(\frac\theta2\right)^2=1-\frac{\theta^2}{2}$.</p>`, 'Where they come from'),
  B.tip(T`<p>The angle <b>must be in radians</b> — the Maclaurin series are only true in radians. In degrees, $\sin 5^\circ\ne5$; convert first: $5^\circ=\frac{5\pi}{180}=0.0873$.</p>`),
  B.ex(1, T`Find the approximate value of $\dfrac{1-\cos4x}{x\tan2x}$ when $x$ is small.`, [
    T`$1-\cos4x\approx1-\left(1-\frac{(4x)^2}{2}\right)=8x^2$.`,
    T`$x\tan2x\approx x\cdot2x=2x^2$.`,
    T`Ratio $\approx\dfrac{8x^2}{2x^2}=4$.`], T`Notice the key consequence: $1-\cos kx\approx\frac{k^2x^2}{2}$.`),
  B.ex(2, T`Show that, for small $\theta$, $\dfrac{\cos\theta-\cos3\theta}{\theta\sin\theta}\approx4$.`, [
    T`$\cos\theta-\cos3\theta\approx\left(1-\frac{\theta^2}2\right)-\left(1-\frac{9\theta^2}2\right)=4\theta^2$.`,
    T`$\theta\sin\theta\approx\theta^2$, so the ratio $\approx4$.`]),
  B.ex(3, T`Use a small angle approximation to estimate $\sin3^\circ$ and find the percentage error.`, [
    T`$3^\circ=\frac{3\pi}{180}=0.0523599$ rad, so $\sin3^\circ\approx0.0523599$.`,
    T`Calculator: $\sin3^\circ=0.0523360$. Error $=\frac{0.0000239}{0.0523360}\times100\approx0.05\%$.`]),
  B.ex(4, T`For small $\theta$, write $3\cos\theta+2\sin\theta$ in the form $a+b\theta+c\theta^2$.`, [
    T`$3\left(1-\frac{\theta^2}{2}\right)+2\theta=3+2\theta-\frac32\theta^2$.`,
    T`$a=3$, $b=2$, $c=-\frac32$.`]),
  B.ex(5, T`Given that $\theta$ is small, find an approximate solution of $2\cos\theta+3\sin\theta=2.06$.`, [
    T`$2\left(1-\frac{\theta^2}2\right)+3\theta=2.06\Rightarrow\theta^2-3\theta+0.06=0$.`,
    T`$\theta=\dfrac{3\pm\sqrt{9-0.24}}{2}$: $\theta\approx0.0201$ or $2.98$.`,
    T`Only the small root is valid for the approximation: $\theta\approx0.0201$ rad.`], T`Always reject roots that are not small — the approximation is meaningless there.`),
  B.warn([
    T`Using degrees.`,
    T`Approximating $\cos\theta$ by $1$ when the question needs the $\theta^2$ term (e.g. in $1-\cos\theta$, the $1$s cancel and only $\frac{\theta^2}2$ is left).`,
    T`Writing $\cos2\theta\approx1-\frac{2\theta^2}{2}$: square the whole angle, $\cos2\theta\approx1-\frac{(2\theta)^2}{2}=1-2\theta^2$.`,
    T`Keeping a large root of an approximate equation.`]),
  B.exam([
    T`Write each approximation separately before combining — they earn method marks.`,
    T`"Show that … $\approx$ …": end with the exact form requested.`,
    T`If asked for a percentage error, compare with the calculator value and state which is which.`]),
  B.checks([
    [T`Approximate $\dfrac{\sin5x}{\tan3x}$ for small $x$.`, T`$\frac{5x}{3x}=\frac53$.`],
    [T`Approximate $\cos0.2$.`, T`$1-0.02=0.98$ (true value $0.98007$).`],
    [T`Approximate $\dfrac{1-\cos x}{x^2}$ for small $x$.`, T`$\frac12$.`]]),
  B.examq(6, T`<p>(a) Show that, for small values of $x$, $\dfrac{1-\cos2x}{x\sin3x}\approx\dfrac23$. <span class="mk">[3]</span></p><p>(b) Use the small angle approximation for $\cos x$ to estimate $\cos0.1$, and find the percentage error in this estimate. <span class="mk">[3]</span></p>`,
    T`<p>(a) $1-\cos2x\approx1-\left(1-\frac{4x^2}{2}\right)=2x^2$ <span class="mk">M1</span>; $x\sin3x\approx3x^2$ <span class="mk">M1</span>; ratio $\approx\frac23$. <span class="mk">A1</span></p>
<p>(b) $1-\frac{0.01}{2}=0.995$ <span class="mk">B1</span>; true value $0.9950042$ <span class="mk">M1</span>; error $\approx0.00042\%$. <span class="mk">A1</span></p>`),
  B.key([T`$\sin\theta\approx\theta$, $\cos\theta\approx1-\frac{\theta^2}2$, $\tan\theta\approx\theta$ — radians only.`, T`$1-\cos k\theta\approx\frac{k^2\theta^2}{2}$.`, T`They are truncated Maclaurin series.`]),
].join('');

/* ===================================================================== */
BOOK.cx5 = [
  B.why(T`<p>Sums like $\cos\theta+\cos2\theta+\dots+\cos n\theta$ look impossible to simplify. The trick is to pair each cosine series $C$ with its sine partner $S$ and add them as $C+iS$. By De Moivre's theorem, $\cos k\theta+i\sin k\theta=z^k$ with $z=e^{i\theta}$, so the pair becomes a <b>geometric</b> or <b>binomial</b> series you already know how to sum.</p>`),
  B.pre(T`<p>You need De Moivre's theorem (chapter 3.2), the form $e^{i\theta}$ (chapter 3.1), and the sums of a geometric series and of a binomial expansion.</p>`),
  T`<h3>1. The method</h3><ol><li>Write down $C$ and its matching $S$ (same coefficients, $\sin$ for $\cos$).</li><li>Form $C+iS=\sum a_k(\cos k\theta+i\sin k\theta)=\sum a_kz^k$.</li><li>Sum the complex series in closed form.</li><li>Rewrite the answer as (real) $+\,i\,$(real), usually with a half-angle factor or by multiplying by a conjugate.</li><li>Equate real parts (for $C$) and imaginary parts (for $S$).</li></ol>`,
  B.thm('Half-angle factorisations', T`$$1+e^{i\theta}=2\cos\tfrac\theta2\,e^{i\theta/2},\qquad1-e^{i\theta}=-2i\sin\tfrac\theta2\,e^{i\theta/2},\qquad e^{in\theta}-1=2i\sin\tfrac{n\theta}2\,e^{in\theta/2}.$$`),
  B.proof(T`<p>Take out $e^{i\theta/2}$: $1+e^{i\theta}=e^{i\theta/2}\left(e^{-i\theta/2}+e^{i\theta/2}\right)=e^{i\theta/2}\cdot2\cos\frac\theta2$, because $e^{i\phi}+e^{-i\phi}=2\cos\phi$. Similarly $e^{i\phi}-e^{-i\phi}=2i\sin\phi$ gives the other two.</p>`),
  T`<h3>2. Binomial-type series</h3>`,
  B.thm('Binomial sums', T`$$\sum_{k=0}^{n}\binom nk\cos k\theta=2^n\cos^n\tfrac\theta2\cos\tfrac{n\theta}2,\qquad\sum_{k=0}^{n}\binom nk\sin k\theta=2^n\cos^n\tfrac\theta2\sin\tfrac{n\theta}2.$$`),
  B.proof(T`<p>$C+iS=\sum_{k=0}^n\binom nk z^k=(1+z)^n$ (binomial theorem) with $z=e^{i\theta}$. Using the half-angle factor, $(1+e^{i\theta})^n=\left(2\cos\frac\theta2\right)^ne^{in\theta/2}=2^n\cos^n\frac\theta2\left(\cos\frac{n\theta}2+i\sin\frac{n\theta}2\right)$. Real and imaginary parts give $C$ and $S$.</p>`),
  B.ex(1, T`Find $C=1+4\cos\theta+6\cos2\theta+4\cos3\theta+\cos4\theta$ in closed form.`, [
    T`The coefficients $1,4,6,4,1$ are $\binom4k$, so $C+iS=(1+e^{i\theta})^4$.`,
    T`$=\left(2\cos\frac\theta2\right)^4e^{2i\theta}$, so $C=16\cos^4\frac\theta2\cos2\theta$.`], T`Check at $\theta=0$: $C=1+4+6+4+1=16$ and $16\cdot1\cdot1=16$ ✓.`),
  T`<h3>3. Geometric-type series</h3>`,
  B.thm('Finite cosine and sine sums', T`$$\sum_{k=1}^{n}\cos k\theta=\frac{\sin\frac{n\theta}2\cos\frac{(n+1)\theta}2}{\sin\frac\theta2},\qquad\sum_{k=1}^{n}\sin k\theta=\frac{\sin\frac{n\theta}2\sin\frac{(n+1)\theta}2}{\sin\frac\theta2}\qquad(\sin\tfrac\theta2\ne0).$$`),
  B.proof(T`<p>$C+iS=z+z^2+\dots+z^n=z\,\dfrac{z^n-1}{z-1}$, a geometric series with ratio $z=e^{i\theta}\ne1$. Using the factorisations:</p>$$z\frac{z^n-1}{z-1}=e^{i\theta}\cdot\frac{2i\sin\frac{n\theta}2e^{in\theta/2}}{2i\sin\frac\theta2e^{i\theta/2}}=\frac{\sin\frac{n\theta}2}{\sin\frac\theta2}\,e^{i(n+1)\theta/2}.$$<p>The real part is $C$ and the imaginary part is $S$.</p>`),
  B.thm('Infinite series (|r| < 1)', T`$$\sum_{k=0}^{\infty}r^k\cos k\theta=\frac{1-r\cos\theta}{1-2r\cos\theta+r^2},\qquad\sum_{k=0}^{\infty}r^k\sin k\theta=\frac{r\sin\theta}{1-2r\cos\theta+r^2}.$$`),
  B.proof(T`<p>$C+iS=\sum(re^{i\theta})^k=\dfrac{1}{1-re^{i\theta}}$, convergent because $|re^{i\theta}|=|r|\lt1$. Multiply top and bottom by the conjugate $1-re^{-i\theta}$:</p>$$\frac{1-re^{-i\theta}}{(1-re^{i\theta})(1-re^{-i\theta})}=\frac{1-r\cos\theta+ir\sin\theta}{1-r(e^{i\theta}+e^{-i\theta})+r^2}=\frac{1-r\cos\theta+ir\sin\theta}{1-2r\cos\theta+r^2}.$$`),
  B.ex(2, T`Show that $\displaystyle\sum_{k=0}^{\infty}\frac{\cos k\theta}{2^k}=\frac{4-2\cos\theta}{5-4\cos\theta}$.`, [
    T`$r=\frac12$: $C=\dfrac{1-\frac12\cos\theta}{1-\cos\theta+\frac14}$.`,
    T`Multiply top and bottom by $4$: $\dfrac{4-2\cos\theta}{5-4\cos\theta}$.`]),
  B.ex(3, T`Evaluate $\cos\frac\pi7+\cos\frac{3\pi}7+\cos\frac{5\pi}7$.`, [
    T`These are the real parts of $z+z^3+z^5$ with $z=e^{i\pi/7}$: a geometric series with ratio $z^2$.`,
    T`$z\frac{z^6-1}{z^2-1}$; with the factorisations this is $\dfrac{\sin\frac{3\pi}{7}}{\sin\frac{\pi}{7}}e^{3i\pi/7}$.`,
    T`Real part: $\dfrac{\sin\frac{3\pi}7\cos\frac{3\pi}7}{\sin\frac\pi7}=\dfrac{\sin\frac{6\pi}7}{2\sin\frac\pi7}=\dfrac12$, since $\sin\frac{6\pi}{7}=\sin\frac{\pi}{7}$.`], T`A beautiful exact answer — and a good calculator check: $0.9010+0.2225-0.6235=0.5000$.`),
  B.warn([
    T`Forgetting that $C+iS$ needs the matching sine series — write it down so the coefficients line up.`,
    T`Leaving $i$ in the denominator: real and imaginary parts can only be read off once the denominator is real.`,
    T`Starting the index at the wrong value ($k=0$ gives a leading $1$ in $C$ and $0$ in $S$).`,
    T`Using the infinite-series formula without checking $|r|\lt1$.`]),
  B.exam([
    T`These questions usually say "by considering …" — follow that hint exactly; it tells you which complex series to use.`,
    T`Test your final answer at $\theta=0$ (or another easy angle) before moving on.`,
    T`Show the conjugate multiplication line in full; it is normally a method mark.`]),
  B.checks([
    [T`What complex series gives $1+3\cos\theta+3\cos2\theta+\cos3\theta$?`, T`$(1+e^{i\theta})^3$, giving $8\cos^3\frac\theta2\cos\frac{3\theta}2$.`],
    [T`$\sum_{k=0}^\infty\frac{\sin k\theta}{3^k}$?`, T`$\frac{\frac13\sin\theta}{1-\frac23\cos\theta+\frac19}=\frac{3\sin\theta}{10-6\cos\theta}$.`],
    [T`Value of $\sum_{k=1}^{n}\cos\frac{2\pi k}{n}$ for $n\ge2$?`, T`$0$ (the roots of unity sum to zero).`]]),
  B.examq(7, T`<p>(a) By considering $(1+e^{i\theta})^n$, show that $\displaystyle\sum_{k=0}^{n}\binom nk\sin k\theta=2^n\cos^n\tfrac\theta2\sin\tfrac{n\theta}2$. <span class="mk">[5]</span></p><p>(b) Hence find the exact value of $\displaystyle\sum_{k=0}^{5}\binom5k\sin\frac{k\pi}3$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $(1+e^{i\theta})^n=\sum\binom nke^{ik\theta}=\sum\binom nk(\cos k\theta+i\sin k\theta)$ <span class="mk">M1 A1</span>. Also $1+e^{i\theta}=e^{i\theta/2}\cdot2\cos\frac\theta2$ <span class="mk">M1</span>, so $(1+e^{i\theta})^n=2^n\cos^n\frac\theta2\,e^{in\theta/2}$ <span class="mk">A1</span>. Imaginary parts: result. <span class="mk">A1</span></p>
<p>(b) $n=5$, $\theta=\frac\pi3$: $32\left(\frac{\sqrt3}2\right)^5\sin\frac{5\pi}6$ <span class="mk">M1</span> $=32\cdot\frac{9\sqrt3}{32}\cdot\frac12=\frac{9\sqrt3}{2}$. <span class="mk">A1</span></p>`),
  B.key([T`$C+iS=\sum a_kz^k$, $z=e^{i\theta}$.`, T`Binomial → $(1+z)^n$; geometric → $\frac{1-(rz)^n}{1-rz}$ or $\frac1{1-rz}$.`, T`Half-angle factors or conjugates make the denominator real.`]),
].join('');

/* ===================================================================== */
BOOK.hy5 = [
  B.why(T`<p>Chapter 4.4 handled $\sqrt{a^2-x^2}$ with $x=a\sin\theta$. When the sign is the other way — $\sqrt{x^2+a^2}$ or $\sqrt{x^2-a^2}$ — trigonometry doesn't fit, but hyperbolic functions do, because $\cosh^2u-\sinh^2u=1$. The answers come out as inverse hyperbolic functions, which you can write as logarithms.</p>`),
  B.thm('Standard integrals (in the formula booklet)', T`$$\int\frac{dx}{\sqrt{x^2+a^2}}=\operatorname{arsinh}\frac xa+c=\ln\left(x+\sqrt{x^2+a^2}\right)+c',\qquad\int\frac{dx}{\sqrt{x^2-a^2}}=\operatorname{arcosh}\frac xa+c=\ln\left(x+\sqrt{x^2-a^2}\right)+c'\quad(x\gt a).$$`),
  B.proof(T`<p><b>First:</b> $x=a\sinh u$, $dx=a\cosh u\,du$, $\sqrt{x^2+a^2}=\sqrt{a^2(\sinh^2u+1)}=a\cosh u$ (positive). So $\int\frac{a\cosh u}{a\cosh u}du=u=\operatorname{arsinh}\frac xa$.</p>
<p><b>Second:</b> $x=a\cosh u$ ($u\ge0$), $dx=a\sinh u\,du$, $\sqrt{x^2-a^2}=a\sinh u$. So the integral is $u=\operatorname{arcosh}\frac xa$.</p>
<p><b>Log form:</b> $\operatorname{arsinh}\frac xa=\ln\left(\frac xa+\sqrt{\frac{x^2}{a^2}+1}\right)=\ln\left(x+\sqrt{x^2+a^2}\right)-\ln a$, and $-\ln a$ is absorbed into the constant. The same works for arcosh.</p>`),
  B.ex(1, T`Evaluate $\displaystyle\int_0^4\frac{dx}{\sqrt{x^2+9}}$ exactly.`, [
    T`$\left[\ln\left(x+\sqrt{x^2+9}\right)\right]_0^4=\ln(4+5)-\ln3$.`,
    T`$=\ln3$.`]),
  B.ex(2, T`Find $\displaystyle\int\frac{dx}{\sqrt{x^2+6x+10}}$.`, [
    T`Complete the square: $x^2+6x+10=(x+3)^2+1$.`,
    T`$=\operatorname{arsinh}(x+3)+c$.`]),
  B.ex(3, T`Evaluate $\displaystyle\int_2^4\frac{dx}{\sqrt{x^2-4}}$.`, [
    T`$\left[\operatorname{arcosh}\frac x2\right]_2^4=\operatorname{arcosh}2-\operatorname{arcosh}1$.`,
    T`$=\ln\left(2+\sqrt3\right)-0=\ln(2+\sqrt3)$.`]),
  B.ex(4, T`Find $\displaystyle\int\frac{dx}{\sqrt{4x^2+9}}$.`, [
    T`$4x^2+9=(2x)^2+3^2$; put $t=2x$, $dx=\frac12dt$.`,
    T`$\frac12\operatorname{arsinh}\frac{2x}{3}+c$.`]),
  T`<h3>Associated functions</h3><p>The specification also asks you to "choose substitutions to integrate associated functions". For $\sqrt{x^2+a^2}$ itself, use $x=a\sinh u$ and $\cosh^2u=\frac12(\cosh2u+1)$.</p>`,
  B.ex(5, T`Use $x=4\sinh u$ to evaluate $\displaystyle\int_0^3\sqrt{x^2+16}\,dx$.`, [
    T`$dx=4\cosh u\,du$, $\sqrt{x^2+16}=4\cosh u$; limits $u=0$ to $u=\operatorname{arsinh}\frac34=\ln2$ (where $\sinh u=\frac34$, $\cosh u=\frac54$).`,
    T`$16\int\cosh^2u\,du=8\int(1+\cosh2u)\,du=8\left[u+\sinh u\cosh u\right]$.`,
    T`$=8\left(\ln2+\frac34\cdot\frac54\right)=8\ln2+\frac{15}{2}$.`]),
  B.warn([
    T`Mixing up the forms: $\sqrt{a^2-x^2}$ → arcsin (trig), $\sqrt{x^2+a^2}$ → arsinh, $\sqrt{x^2-a^2}$ → arcosh.`,
    T`Forgetting the factor $\frac1b$ when there is a coefficient: $\int\frac{dx}{\sqrt{b^2x^2+a^2}}=\frac1b\operatorname{arsinh}\frac{bx}{a}$.`,
    T`Using arcosh below $x=a$, where it is undefined.`,
    T`Not converting limits when substituting.`]),
  B.exam([
    T`"Exact" usually means a logarithm: convert $\operatorname{arsinh}$ or $\operatorname{arcosh}$ with the booklet's log forms.`,
    T`Show the completed square explicitly before quoting the standard result.`]),
  B.checks([
    [T`$\int_0^{1}\frac{dx}{\sqrt{1+x^2}}$?`, T`$\ln(1+\sqrt2)$.`],
    [T`$\int\frac{dx}{\sqrt{x^2-2x-3}}$?`, T`$(x-1)^2-4$: $\operatorname{arcosh}\frac{x-1}2+c$.`],
    [T`Which substitution for $\int\frac{x^2}{\sqrt{x^2+1}}dx$?`, T`$x=\sinh u$, giving $\int\sinh^2u\,du$.`]]),
  B.examq(9, T`<p>(a) Show that $\displaystyle\int_1^2\frac{dx}{\sqrt{x^2-2x+2}}=\ln\left(1+\sqrt2\right)$. <span class="mk">[4]</span></p><p>(b) Use the substitution $x=\sinh u$ to show that $\displaystyle\int_0^1\sqrt{x^2+1}\,dx=\tfrac12\left(\sqrt2+\ln\left(1+\sqrt2\right)\right)$. <span class="mk">[5]</span></p>`,
    T`<p>(a) $x^2-2x+2=(x-1)^2+1$ <span class="mk">M1</span>; $\left[\operatorname{arsinh}(x-1)\right]_1^2$ <span class="mk">A1</span> $=\operatorname{arsinh}1-0$ <span class="mk">M1</span> $=\ln(1+\sqrt2)$. <span class="mk">A1</span></p>
<p>(b) $dx=\cosh u\,du$, $\sqrt{x^2+1}=\cosh u$, limits $0$ to $\operatorname{arsinh}1=\ln(1+\sqrt2)$ <span class="mk">B1</span>; $\int\cosh^2u\,du=\frac12\int(1+\cosh2u)\,du$ <span class="mk">M1</span> $=\frac12\left[u+\sinh u\cosh u\right]$ <span class="mk">A1</span>. At the top limit $\sinh u=1$, $\cosh u=\sqrt2$ <span class="mk">M1</span>: value $\frac12\left(\ln(1+\sqrt2)+\sqrt2\right)$. <span class="mk">A1</span></p>`),
  B.key([T`$\int\frac{dx}{\sqrt{x^2+a^2}}=\operatorname{arsinh}\frac xa$; $\int\frac{dx}{\sqrt{x^2-a^2}}=\operatorname{arcosh}\frac xa$.`, T`Substitutions: $x=a\sinh u$, $x=a\cosh u$.`, T`Complete the square; convert to logs for exact answers.`]),
].join('');

/* ===================================================================== */
BOOK.m_growth = [
  B.why(T`<p>Money earning interest, a growing population, a decaying radioactive sample and a drug leaving the bloodstream all share one feature: <b>the rate of change is proportional to the amount present</b>. That single property forces the model $N=N_0e^{kt}$. The specification names four contexts — continuous compound interest, population growth, radioactive decay and drug concentration decay — so expect any of them.</p>`),
  B.def('exponential model', T`<p>$N=N_0e^{kt}$, where $N_0$ is the value when $t=0$ and $k$ is a constant: $k\gt0$ gives <b>growth</b>, $k\lt0$ gives <b>decay</b> (often written $N=N_0e^{-kt}$ with $k\gt0$).</p>`),
  T`<h3>1. Continuous compound interest — where $e$ comes from</h3><p>£$P$ at an annual rate $r$, compounded $n$ times a year for $t$ years, grows to $P\left(1+\frac rn\right)^{nt}$. As $n$ increases the amount approaches a limit:</p>
<table class="tbl"><tr><th>£1000 at 5% for one year, compounded</th><th>Amount</th></tr><tr><td>yearly ($n=1$)</td><td>£1050.00</td></tr><tr><td>monthly ($n=12$)</td><td>£1051.16</td></tr><tr><td>daily ($n=365$)</td><td>£1051.27</td></tr><tr><td>continuously</td><td>$1000e^{0.05}=$ £1051.27</td></tr></table>`,
  B.thm('Continuous compounding', T`$$A=Pe^{rt},\qquad\text{since}\quad\left(1+\frac rn\right)^{nt}\to e^{rt}\ \text{ as }n\to\infty,\quad e=\lim_{n\to\infty}\left(1+\frac1n\right)^n.$$`),
  B.thm('Half-life and doubling time', T`<p>For $N=N_0e^{-kt}$ ($k\gt0$) the half-life is $T_{1/2}=\dfrac{\ln2}{k}$; for $N=N_0e^{kt}$ the doubling time is $\dfrac{\ln2}{k}$. Neither depends on $N_0$.</p>`),
  B.opt(T`<p>Half-life: $N_0e^{-kT}=\frac12N_0\iff e^{-kT}=\frac12\iff-kT=\ln\frac12=-\ln2\iff T=\frac{\ln2}{k}$. $N_0$ cancels, so it takes the same time to halve from any starting amount.</p>`),
  B.ex(1, T`£2000 is invested at 4% per annum compounded continuously. Find the value after 10 years and the time taken to double.`, [
    T`$A=2000e^{0.04\times10}=2000e^{0.4}=$ £2983.65.`,
    T`Double: $e^{0.04t}=2\Rightarrow t=\frac{\ln2}{0.04}=17.3$ years.`]),
  B.ex(2, T`Carbon-14 has a half-life of 5730 years. What percentage of the original carbon-14 remains after 2000 years?`, [
    T`$k=\frac{\ln2}{5730}=1.2097\times10^{-4}$.`,
    T`$\frac{N}{N_0}=e^{-2000k}=e^{-0.2419}=0.785$, so about $78.5\%$ remains.`]),
  B.ex(3, T`A drug's concentration is $C=15e^{-0.2t}$ mg/l, $t$ hours after a dose. A new dose is needed once $C\lt3$. When is this?`, [
    T`$15e^{-0.2t}\lt3\Rightarrow e^{-0.2t}\lt0.2$.`,
    T`Take logs: $-0.2t\lt\ln0.2$. Divide by $-0.2$ (negative), <b>reversing</b> the sign: $t\gt\dfrac{\ln0.2}{-0.2}=\dfrac{\ln5}{0.2}=8.05$.`,
    T`After about 8 hours 3 minutes.`]),
  B.ex(4, T`A population satisfies $P=P_0e^{kt}$. When $t=2$, $P=1200$; when $t=7$, $P=1800$. Find $k$ and $P_0$.`, [
    T`Divide: $\frac{1800}{1200}=e^{5k}\Rightarrow k=\frac{\ln1.5}{5}=0.0811$.`,
    T`$P_0=1200e^{-2k}=1200e^{-0.1622}=1020$.`], T`Dividing the two equations eliminates $P_0$ — the standard first move.`),
  T`<h3>2. Evaluating a model</h3><ul><li>Unlimited growth is unrealistic: food, space or money run out. Long-term predictions are unreliable.</li><li>Real data are discrete (people, atoms) while the model is continuous.</li><li>Check the constants make sense: a drug concentration can't be negative; a value can't fall below a physical minimum.</li></ul>`,
  B.warn([
    T`Using $r=4$ instead of $r=0.04$ for a 4% rate.`,
    T`Forgetting to reverse an inequality after dividing by a negative $k$ or by $\ln$ of a number less than 1.`,
    T`Rounding $k$ early: keep $k=\frac{\ln2}{5730}$ exact until the end.`,
    T`Giving $t$ when the question asks for a date or the number of whole hours: interpret the answer.`]),
  B.exam([
    T`State the model with the constants found ("$C=20e^{-0.170t}$") before using it.`,
    T`"Exact" answers stay in logs: $k=\frac13\ln\frac53$.`,
    T`Most modelling questions end with a one-mark criticism — make it specific to the context.`]),
  B.checks([
    [T`Half-life of $N=50e^{-0.1t}$?`, T`$10\ln2=6.93$.`],
    [T`£500 at 3% compounded continuously for 6 years?`, T`$500e^{0.18}=$ £598.61.`],
    [T`If $N=N_0e^{kt}$ triples in 4 years, find $k$.`, T`$\frac{\ln3}{4}=0.275$.`]]),
  B.examq(8, T`<p>The concentration of a drug in the blood, $C$ mg/l, $t$ hours after an injection, is modelled by $C=20e^{-kt}$. After 3 hours the concentration is 12 mg/l.</p><p>(a) Find the exact value of $k$. <span class="mk">[2]</span></p><p>(b) Find the concentration after 8 hours. <span class="mk">[2]</span></p><p>(c) A second injection is needed when the concentration falls below 4 mg/l. Find when this is. <span class="mk">[3]</span></p><p>(d) Suggest one limitation of the model. <span class="mk">[1]</span></p>`,
    T`<p>(a) $12=20e^{-3k}\Rightarrow e^{-3k}=\frac35$ <span class="mk">M1</span> $\Rightarrow k=\frac13\ln\frac53$. <span class="mk">A1</span></p>
<p>(b) $20e^{-8k}=20\left(\frac35\right)^{8/3}$ <span class="mk">M1</span> $=5.12$ mg/l. <span class="mk">A1</span></p>
<p>(c) $20e^{-kt}\lt4\Rightarrow e^{-kt}\lt\frac15$ <span class="mk">M1</span> $\Rightarrow t\gt\frac{\ln5}{k}$ <span class="mk">M1</span> $=9.45$ hours. <span class="mk">A1</span></p>
<p>(d) e.g. it ignores the time taken for the drug to be absorbed; different patients clear the drug at different rates. <span class="mk">B1</span></p>`),
  B.key([T`$N=N_0e^{kt}$: growth $k\gt0$, decay $k\lt0$.`, T`$A=Pe^{rt}$; $e=\lim(1+\frac1n)^n$.`, T`Half-life / doubling time $=\frac{\ln2}{|k|}$.`, T`Inequalities: take logs and watch for reversal.`]),
].join('');
