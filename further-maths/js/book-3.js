// BCSFM textbook, part 3: Hyperbolic functions.
'use strict';

BOOK.hy1 = [
  B.why(T`<p>Hang a chain between two hooks. The curve it makes is <b>not</b> a parabola — it's $y=a\cosh\frac xa$ (a <i>catenary</i>). Hyperbolic functions are built from $e^x$ and behave like trig functions "with the signs flipped". They're everywhere in calculus because their derivatives and integrals are so clean.</p>`),
  B.def('hyperbolic functions', T`$$\sinh x=\frac{e^x-e^{-x}}{2},\qquad\cosh x=\frac{e^x+e^{-x}}{2},\qquad\tanh x=\frac{\sinh x}{\cosh x}=\frac{e^x-e^{-x}}{e^x+e^{-x}}$$
<p>Reciprocals: $\operatorname{sech}x=\frac1{\cosh x}$, $\operatorname{cosech}x=\frac1{\sinh x}$, $\coth x=\frac1{\tanh x}$. Say "shine", "cosh", "than".</p>`),
  B.tip(T`<p>$\cosh x$ is the <b>even part</b> of $e^x$ and $\sinh x$ the <b>odd part</b>: $e^x=\cosh x+\sinh x$ and $e^{-x}=\cosh x-\sinh x$. Compare with $e^{i\theta}=\cos\theta+i\sin\theta$.</p>`),
  T`<h3>1. Graphs and their features</h3>
<ul><li>$\cosh x$: even, minimum $1$ at $x=0$, range $[1,\infty)$. (Proof: by AM–GM, $\frac{e^x+e^{-x}}2\ge\sqrt{e^xe^{-x}}=1$, with equality iff $e^x=e^{-x}$, i.e. $x=0$.)</li>
<li>$\sinh x$: odd, increasing, range $\mathbb R$, $\sinh0=0$.</li>
<li>$\tanh x$: odd, increasing, range $(-1,1)$; horizontal asymptotes $y=\pm1$ because $\tanh x=1-\dfrac{2}{e^{2x}+1}\to1$ as $x\to\infty$.</li>
<li>For large $x$, $\cosh x\approx\sinh x\approx\frac12e^x$.</li></ul>
<p>The "hyperbolic" name: $(\cosh t,\sinh t)$ lies on the hyperbola $x^2-y^2=1$, just as $(\cos t,\sin t)$ lies on the circle $x^2+y^2=1$ — see the sim.</p>`,
  T`<h3>2. Identities — proved from the definitions</h3>`,
  B.thm('Fundamental identity', T`$$\cosh^2x-\sinh^2x=1$$`),
  B.proof(T`$$\cosh^2x-\sinh^2x=\frac{e^{2x}+2+e^{-2x}}{4}-\frac{e^{2x}-2+e^{-2x}}{4}=\frac44=1.$$<p>Or faster: $(\cosh x+\sinh x)(\cosh x-\sinh x)=e^x\cdot e^{-x}=1$.</p>`),
  B.thm('Double "angle"', T`$$\sinh2x=2\sinh x\cosh x,\qquad\cosh2x=\cosh^2x+\sinh^2x=2\cosh^2x-1=1+2\sinh^2x$$`),
  B.proof(T`<p>$2\sinh x\cosh x=2\cdot\frac{(e^x-e^{-x})(e^x+e^{-x})}{4}=\frac{e^{2x}-e^{-2x}}{2}=\sinh2x$.</p>
<p>$\cosh^2x+\sinh^2x=\frac{(e^{2x}+2+e^{-2x})+(e^{2x}-2+e^{-2x})}{4}=\frac{e^{2x}+e^{-2x}}2=\cosh2x$. The other forms follow from $\cosh^2x-\sinh^2x=1$.</p>`),
  B.thm('Addition formulae', T`$$\sinh(A\pm B)=\sinh A\cosh B\pm\cosh A\sinh B,\qquad\cosh(A\pm B)=\cosh A\cosh B\pm\sinh A\sinh B$$`),
  B.proof(T`<p>For $\cosh(A+B)$: expand the right side,</p>$$\cosh A\cosh B+\sinh A\sinh B=\frac{(e^A+e^{-A})(e^B+e^{-B})+(e^A-e^{-A})(e^B-e^{-B})}{4}=\frac{2e^{A+B}+2e^{-(A+B)}}{4}=\cosh(A+B).$$<p>The others are similar (try $\sinh(A+B)$ yourself).</p>`),
  B.thm('More identities', T`$$1-\tanh^2x=\operatorname{sech}^2x,\qquad\coth^2x-1=\operatorname{cosech}^2x$$<p>Divide $\cosh^2x-\sinh^2x=1$ by $\cosh^2x$ (or by $\sinh^2x$).</p>`),
  T`<h3>3. Osborn's rule</h3>
<p>To convert a trig identity into the matching hyperbolic one: replace each trig function by its hyperbolic version, and <b>change the sign of every term containing a product of two sines</b> — including hidden products such as $\tan^2x=\frac{\sin^2x}{\cos^2x}$.</p>
<table class="tbl"><tr><th>Trig</th><th>Hyperbolic</th></tr>
<tr><td>$\cos^2x+\sin^2x=1$</td><td>$\cosh^2x-\sinh^2x=1$</td></tr>
<tr><td>$\cos2x=1-2\sin^2x$</td><td>$\cosh2x=1+2\sinh^2x$</td></tr>
<tr><td>$1+\tan^2x=\sec^2x$</td><td>$1-\tanh^2x=\operatorname{sech}^2x$</td></tr>
<tr><td>$\cos(A+B)=\cos A\cos B-\sin A\sin B$</td><td>$\cosh(A+B)=\cosh A\cosh B+\sinh A\sinh B$</td></tr></table>`,
  B.tip(T`<p><b>Why Osborn works:</b> from Euler's formula, $\cos(ix)=\cosh x$ and $\sin(ix)=i\sinh x$. Substituting $ix$ into a trig identity turns every $\sin$ into $i\sinh$; a product of two sines picks up $i^2=-1$ — the sign change.</p>`),
  B.ex(1, T`Given $\sinh x=\frac34$, find $\cosh x$, $\tanh x$ and $x$.`, [T`$\cosh^2x=1+\sinh^2x=\frac{25}{16}$, and $\cosh x\gt0$, so $\cosh x=\frac54$.`, T`$\tanh x=\frac{3/4}{5/4}=\frac35$.`, T`$e^x=\cosh x+\sinh x=2$, so $x=\ln2$.`]),
  B.warn([T`Using Osborn's rule as a <i>proof</i> when the question says "using the definitions in terms of exponentials".`, T`$\cosh x$ can't be negative: reject $\cosh x=-\frac54$.`, T`Sign errors in $\cosh2x=1+2\sinh^2x$ (it's $+$, unlike $\cos2x=1-2\sin^2x$).`]),
  B.checks([[T`Prove $\sinh(A+B)=\sinh A\cosh B+\cosh A\sinh B$.`, T`RHS $=\frac{(e^A-e^{-A})(e^B+e^{-B})+(e^A+e^{-A})(e^B-e^{-B})}4=\frac{2e^{A+B}-2e^{-A-B}}{4}=\sinh(A+B)$.`], [T`Use Osborn on $\sin3x=3\sin x-4\sin^3x$.`, T`$\sin^3x$ contains $\sin^2x$: $\sinh3x=3\sinh x+4\sinh^3x$.`]]),
  B.examq(5, T`<p>Using the definitions of $\cosh x$ in terms of exponentials, prove that $\cosh3x=4\cosh^3x-3\cosh x$.</p>`,
    T`<p>$4\cosh^3x=4\cdot\frac{(e^x+e^{-x})^3}{8}=\frac{e^{3x}+3e^x+3e^{-x}+e^{-3x}}{2}$ <span class="mk">M1 A1</span></p>
<p>$=\frac{e^{3x}+e^{-3x}}2+3\cdot\frac{e^x+e^{-x}}{2}=\cosh3x+3\cosh x$ <span class="mk">M1 A1</span>, so $\cosh3x=4\cosh^3x-3\cosh x$ <span class="mk">A1</span></p>`),
  B.key([T`Definitions in exponentials; $\cosh\ge1$, $|\tanh|\lt1$.`, T`$\cosh^2-\sinh^2=1$, $\sinh2x=2\sinh x\cosh x$, $\cosh2x=1+2\sinh^2x$.`, T`Osborn: flip the sign of products of two sinh's.`]),
].join('');

BOOK.hy2 = [
  B.why(T`<p>Inverse trig functions ($\arcsin$, …) can't be written using simpler functions. Inverse <i>hyperbolic</i> functions can — they're logarithms! That's because $\sinh$ is built from $e^x$, and the inverse of an exponential is a log.</p>`),
  B.def('inverse hyperbolic functions', T`<ul><li>$\operatorname{arsinh}x$: domain $\mathbb R$, range $\mathbb R$ ($\sinh$ is one-to-one).</li>
<li>$\operatorname{arcosh}x$: domain $x\ge1$, range $y\ge0$ — we restrict $\cosh$ to $x\ge0$ to make it one-to-one.</li>
<li>$\operatorname{artanh}x$: domain $-1\lt x\lt1$, range $\mathbb R$.</li></ul>`),
  B.thm('Logarithmic forms', T`$$\operatorname{arsinh}x=\ln\left(x+\sqrt{x^2+1}\right),\qquad\operatorname{arcosh}x=\ln\left(x+\sqrt{x^2-1}\right),\qquad\operatorname{artanh}x=\frac12\ln\frac{1+x}{1-x}$$`),
  B.proof(T`<p><b>arsinh.</b> Let $y=\operatorname{arsinh}x$, so $x=\sinh y=\frac{e^y-e^{-y}}2$. Multiply by $2e^y$:</p>$$2xe^y=e^{2y}-1\quad\Longrightarrow\quad\left(e^y\right)^2-2x\,e^y-1=0.$$
<p>Quadratic in $e^y$: $e^y=\frac{2x\pm\sqrt{4x^2+4}}{2}=x\pm\sqrt{x^2+1}$. Since $\sqrt{x^2+1}\gt|x|$, the minus sign gives a negative value, impossible for $e^y$. So $e^y=x+\sqrt{x^2+1}$, $y=\ln(x+\sqrt{x^2+1})$.</p>
<p><b>arcosh.</b> Let $y=\operatorname{arcosh}x$ ($y\ge0$), $x=\cosh y$. Similarly $(e^y)^2-2xe^y+1=0$, so $e^y=x\pm\sqrt{x^2-1}$. Both are positive, but their product is $1$, so one is $\ge1$ and the other $\le1$. Since $y\ge0$ we need $e^y\ge1$: take $+$. (The $-$ root gives $-y$, the negative solution of $\cosh y=x$.)</p>
<p><b>artanh.</b> $x=\tanh y=\frac{e^{2y}-1}{e^{2y}+1}$. Rearrange: $x e^{2y}+x=e^{2y}-1\Rightarrow e^{2y}(1-x)=1+x\Rightarrow e^{2y}=\frac{1+x}{1-x}$, so $y=\frac12\ln\frac{1+x}{1-x}$.</p>`),
  B.ex(1, T`Express $\operatorname{arsinh}\frac34$, $\operatorname{arcosh}2$ and $\operatorname{artanh}\frac13$ as logarithms.`, [T`$\operatorname{arsinh}\frac34=\ln\left(\frac34+\sqrt{\frac9{16}+1}\right)=\ln\left(\frac34+\frac54\right)=\ln2$.`, T`$\operatorname{arcosh}2=\ln(2+\sqrt3)$.`, T`$\operatorname{artanh}\frac13=\frac12\ln\frac{4/3}{2/3}=\frac12\ln2$.`]),
  B.ex(2, T`Solve $\cosh x=\frac53$.`, [T`$x=\pm\operatorname{arcosh}\frac53=\pm\ln\left(\frac53+\frac43\right)=\pm\ln3$.`], T`Two answers: $\cosh$ is even. $\operatorname{arcosh}$ only gives the positive one.`),
  B.warn([T`Giving only $\ln(\dots)$ for $\cosh x=k$ — there are two solutions $\pm$.`, T`Forgetting the $\frac12$ in artanh.`]),
  B.checks([[T`Solve $\sinh x=2$.`, T`$x=\ln(2+\sqrt5)$ — one solution only.`], [T`Show $\operatorname{arcosh}x=-\ln(x-\sqrt{x^2-1})$.`, T`$(x+\sqrt{x^2-1})(x-\sqrt{x^2-1})=1$, so $\ln(x+\sqrt{x^2-1})=-\ln(x-\sqrt{x^2-1})$.`]]),
  B.examq(6, T`<p>(a) Starting from the definition of $\tanh y$ in exponentials, show that $\operatorname{artanh}x=\frac12\ln\frac{1+x}{1-x}$. (b) Solve $\operatorname{artanh}x=\ln2$.</p>`,
    T`<p>(a) As in the proof above <span class="mk">M1 M1 A1</span>. (b) $\frac{1+x}{1-x}=4$ <span class="mk">M1</span>, $1+x=4-4x$, $x=\frac35$ <span class="mk">A1 A1</span></p>`),
  B.key([T`arsinh, arcosh, artanh log formulas and how to derive them (quadratic in $e^y$).`]),
].join('');

BOOK.hy3 = [
  B.why(T`<p>Equations like $5\cosh x-3\sinh x=5$ look impossible until you remember that hyperbolic functions are just exponentials in disguise. Most hyperbolic equations become <b>quadratics</b> — either in $e^x$ or in $\cosh x$/$\sinh x$.</p>`),
  T`<h3>Strategy A — linear in cosh and sinh: go exponential</h3><p>Substitute the definitions, multiply through by $2e^x$, solve the quadratic in $u=e^x$, reject $u\le0$, then $x=\ln u$.</p>`,
  B.ex(1, T`Solve $5\cosh x-3\sinh x=5$.`, [
    T`$\frac52(e^x+e^{-x})-\frac32(e^x-e^{-x})=5\Rightarrow e^x+4e^{-x}=5$.`,
    T`Multiply by $e^x$: $e^{2x}-5e^x+4=0\Rightarrow(e^x-1)(e^x-4)=0$.`,
    T`$e^x=1$ or $4$: $x=0$ or $x=\ln4$.`]),
  T`<h3>Strategy B — squares or double arguments: use an identity</h3><p>Use $\cosh2x=2\cosh^2x-1$ or $\cosh^2x=1+\sinh^2x$ to get a quadratic in a <b>single</b> hyperbolic function.</p>`,
  B.ex(2, T`Solve $\cosh2x-5\cosh x+4=0$.`, [
    T`$2\cosh^2x-1-5\cosh x+4=0\Rightarrow2\cosh^2x-5\cosh x+3=0\Rightarrow(2\cosh x-3)(\cosh x-1)=0$.`,
    T`$\cosh x=1\Rightarrow x=0$.`,
    T`$\cosh x=\frac32\Rightarrow x=\pm\ln\left(\frac32+\frac{\sqrt5}2\right)=\pm\ln\frac{3+\sqrt5}{2}$.`]),
  B.ex(3, T`Solve $2\cosh^2x-5\sinh x=5$.`, [
    T`$2(1+\sinh^2x)-5\sinh x-5=0\Rightarrow2\sinh^2x-5\sinh x-3=0\Rightarrow(2\sinh x+1)(\sinh x-3)=0$.`,
    T`$\sinh x=3\Rightarrow x=\ln(3+\sqrt{10})$; $\;\sinh x=-\frac12\Rightarrow x=\ln\left(-\frac12+\frac{\sqrt5}{2}\right)=\ln\frac{\sqrt5-1}{2}$.`,
    T`Both valid: $\sinh$ takes every real value exactly once.`]),
  B.tip(T`<p><b>Rejecting roots:</b> $\cosh x\ge1$ always; $|\tanh x|\lt1$; $e^x\gt0$. $\sinh x$ can be anything. State the reason when you reject.</p>`),
  B.warn([T`Forgetting $\pm$ for $\cosh x=k\gt1$.`, T`Not rejecting $\cosh x\lt1$ (e.g. $\cosh x=\frac12$).`, T`Dividing by $\sinh x$ and losing $x=0$.`]),
  B.checks([[T`Solve $\sinh x+2\cosh x=2$.`, T`$\frac32e^x+\frac12e^{-x}=2\Rightarrow3e^{2x}-4e^x+1=0\Rightarrow e^x=1,\frac13$, $x=0,-\ln3$.`], [T`Solve $\tanh x=\frac12$.`, T`$x=\frac12\ln3$.`]]),
  B.examq(6, T`<p>Solve $4\cosh x+\sinh x=4$, giving your answers as exact logarithms.</p>`,
    T`<p>$2(e^x+e^{-x})+\frac12(e^x-e^{-x})=4$ <span class="mk">M1</span> $\Rightarrow\frac52e^x+\frac32e^{-x}=4\Rightarrow5e^{2x}-8e^x+3=0$ <span class="mk">A1</span></p>
<p>$(5e^x-3)(e^x-1)=0$ <span class="mk">M1</span> $\Rightarrow x=0$ <span class="mk">A1</span>, $x=\ln\frac35$ <span class="mk">A1 A1</span></p>`),
  B.key([T`Linear in cosh/sinh → quadratic in $e^x$.`, T`Squares/double arguments → identity → quadratic in one function.`, T`Reject impossible values with a reason.`]),
].join('');

BOOK.hy4 = [
  B.why(T`<p>Hyperbolic functions differentiate more cleanly than trig ones — no minus signs to remember. Their inverses give the standard integrals $\int\frac{dx}{\sqrt{x^2\pm a^2}}$, and the substitution $x=a\sinh u$ handles integrals with $\sqrt{x^2+a^2}$ the way $x=a\sin u$ handles $\sqrt{a^2-x^2}$.</p>`),
  B.thm('Derivatives', T`$$\frac{d}{dx}\sinh x=\cosh x,\qquad\frac{d}{dx}\cosh x=\sinh x,\qquad\frac{d}{dx}\tanh x=\operatorname{sech}^2x$$`),
  B.proof(T`<p>$\frac d{dx}\frac{e^x-e^{-x}}2=\frac{e^x+e^{-x}}2=\cosh x$, and similarly for $\cosh$. For $\tanh$, quotient rule: $\frac{\cosh x\cosh x-\sinh x\sinh x}{\cosh^2x}=\frac1{\cosh^2x}=\operatorname{sech}^2x$.</p>`),
  B.thm('Inverse functions', T`$$\frac{d}{dx}\operatorname{arsinh}x=\frac1{\sqrt{x^2+1}},\qquad\frac{d}{dx}\operatorname{arcosh}x=\frac1{\sqrt{x^2-1}}\ (x\gt1),\qquad\frac{d}{dx}\operatorname{artanh}x=\frac1{1-x^2}\ (|x|\lt1)$$`),
  B.proof(T`<p><b>arsinh</b>: $y=\operatorname{arsinh}x\Rightarrow\sinh y=x\Rightarrow\cosh y\,\frac{dy}{dx}=1$. So $\frac{dy}{dx}=\frac1{\cosh y}=\frac1{\sqrt{1+\sinh^2y}}=\frac1{\sqrt{1+x^2}}$ (positive root since $\cosh y\gt0$).</p>
<p><b>arcosh</b>: $\cosh y=x\Rightarrow\sinh y\,y'=1$, and $\sinh y=+\sqrt{\cosh^2y-1}=\sqrt{x^2-1}$ because $y\ge0$.</p>
<p><b>artanh</b>: $\tanh y=x\Rightarrow\operatorname{sech}^2y\,y'=1\Rightarrow y'=\frac1{1-\tanh^2y}=\frac1{1-x^2}$.</p>
<p>Check via the log form: $\frac d{dx}\ln(x+\sqrt{x^2+1})=\frac{1+\frac{x}{\sqrt{x^2+1}}}{x+\sqrt{x^2+1}}=\frac{\frac{\sqrt{x^2+1}+x}{\sqrt{x^2+1}}}{x+\sqrt{x^2+1}}=\frac1{\sqrt{x^2+1}}$ ✓.</p>`),
  B.thm('Integrals', T`$$\int\frac{dx}{\sqrt{x^2+a^2}}=\operatorname{arsinh}\frac xa+c,\qquad\int\frac{dx}{\sqrt{x^2-a^2}}=\operatorname{arcosh}\frac xa+c\ (x\gt a)$$`),
  B.proof(T`<p>Substitute $x=a\sinh u$, $dx=a\cosh u\,du$, $\sqrt{x^2+a^2}=a\cosh u$: the integral becomes $\int du=u=\operatorname{arsinh}\frac xa$. The arcosh one is the same with $x=a\cosh u$.</p>`),
  B.ex(1, T`Differentiate (a) $\cosh^3(2x)$ (b) $\operatorname{arsinh}(3x)$ (c) $x\operatorname{artanh}x$.`, [T`(a) $3\cosh^2(2x)\cdot2\sinh(2x)=6\cosh^22x\sinh2x$.`, T`(b) $\frac{3}{\sqrt{9x^2+1}}$.`, T`(c) $\operatorname{artanh}x+\frac{x}{1-x^2}$.`]),
  B.ex(2, T`Find $\displaystyle\int\sqrt{x^2+1}\,dx$.`, [
    T`Let $x=\sinh u$, $dx=\cosh u\,du$: $\int\cosh^2u\,du=\int\frac12(\cosh2u+1)\,du=\frac14\sinh2u+\frac u2$.`,
    T`$\sinh2u=2\sinh u\cosh u=2x\sqrt{1+x^2}$.`,
    T`Answer: $\frac12x\sqrt{x^2+1}+\frac12\operatorname{arsinh}x+c$.`]),
  B.ex(3, T`Find $\int\sinh^3x\,dx$.`, [T`$\sinh^3x=\sinh x(\cosh^2x-1)$.`, T`$\int\sinh x\cosh^2x\,dx-\int\sinh x\,dx=\frac13\cosh^3x-\cosh x+c$.`]),
  B.ex(4, T`Evaluate $\displaystyle\int_0^{2}\frac{dx}{\sqrt{x^2+4}}$.`, [T`$\left[\operatorname{arsinh}\frac x2\right]_0^2=\operatorname{arsinh}1=\ln(1+\sqrt2)$.`]),
  B.warn([T`Writing $\frac{d}{dx}\cosh x=-\sinh x$ (that's the trig habit).`, T`Forgetting the chain-rule factor: $\frac d{dx}\operatorname{arsinh}(3x)=\frac{3}{\sqrt{9x^2+1}}$.`]),
  B.checks([[T`$\int\tanh x\,dx$`, T`$\ln\cosh x+c$.`], [T`$\frac d{dx}\operatorname{arcosh}(x^2)$`, T`$\frac{2x}{\sqrt{x^4-1}}$.`]]),
  B.examq(6, T`<p>(a) Show that $\dfrac{d}{dx}\left(x\operatorname{arsinh}x-\sqrt{1+x^2}\right)=\operatorname{arsinh}x$. (b) Hence find $\displaystyle\int_0^1\operatorname{arsinh}x\,dx$ exactly.</p>`,
    T`<p>(a) $\operatorname{arsinh}x+\frac{x}{\sqrt{1+x^2}}-\frac{x}{\sqrt{1+x^2}}=\operatorname{arsinh}x$ <span class="mk">M1 A1 A1</span></p>
<p>(b) $\left[x\operatorname{arsinh}x-\sqrt{1+x^2}\right]_0^1=\ln(1+\sqrt2)-\sqrt2+1$ <span class="mk">M1 A1 A1</span></p>`),
  B.key([T`$\sinh'=\cosh$, $\cosh'=\sinh$, $\tanh'=\operatorname{sech}^2$.`, T`Inverse derivatives via implicit differentiation.`, T`$x=a\sinh u$ for $\sqrt{x^2+a^2}$; $x=a\cosh u$ for $\sqrt{x^2-a^2}$.`]),
].join('');
