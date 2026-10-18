// BCSFM textbook — Maths AS 1, part 3: Logarithms & modelling; Differentiation; Integration; Vectors.
'use strict';

/* ===================================================================== */
BOOK.m_log = [
  B.why(T`<p>To solve $2^x=10$ you need to bring $x$ down from the index. Logarithms do exactly that: a logarithm <i>is</i> an index. The three laws of logs are just the laws of indices read backwards.</p>`),
  B.def('logarithm', T`<p>For $a\gt0$, $a\ne1$ and $x\gt0$: $$\log_ax=y\iff a^y=x.$$ "$\log_ax$ is the power you raise $a$ to, to get $x$." So $\log_2 8=3$, $\log_{10}0.01=-2$, $\log_a a=1$, $\log_a1=0$. $\ln x$ means $\log_ex$.</p>`),
  B.thm('Laws of logarithms', T`$$\log_a(xy)=\log_ax+\log_ay,\qquad\log_a\!\left(\frac xy\right)=\log_ax-\log_ay,\qquad\log_a\!\left(x^k\right)=k\log_ax.$$`),
  B.proof(T`<p>Let $p=\log_ax$ and $q=\log_ay$, so $x=a^p$ and $y=a^q$.</p><ul><li>$xy=a^pa^q=a^{p+q}$, so $\log_a(xy)=p+q$.</li><li>$\frac xy=a^{p-q}$, so $\log_a\frac xy=p-q$.</li><li>$x^k=(a^p)^k=a^{kp}$, so $\log_a x^k=kp$.</li></ul>`),
  B.tip(T`<p>Special cases: $\log_a\frac1x=-\log_ax$; $\log_a\sqrt x=\frac12\log_ax$. To solve $a^x=b$, take logs (any base) of both sides: $x\log a=\log b$, so $x=\dfrac{\log b}{\log a}$.</p>`),
  B.ex(1, T`Write $2\log3+\log4-\log6$ as a single logarithm.`, [
    T`$2\log3=\log9$.`,
    T`$\log9+\log4-\log6=\log\dfrac{9\times4}{6}=\log6$.`]),
  B.ex(2, T`Solve $5^x=12$ (4 s.f.).`, [
    T`$x\ln5=\ln12\Rightarrow x=\dfrac{\ln12}{\ln5}=1.544$.`]),
  B.ex(3, T`Solve $3^{2x}-5\cdot3^x+6=0$.`, [
    T`Let $y=3^x$: $y^2-5y+6=0\Rightarrow(y-2)(y-3)=0$.`,
    T`$3^x=3\Rightarrow x=1$; $3^x=2\Rightarrow x=\dfrac{\ln2}{\ln3}=0.631$.`]),
  B.ex(4, T`Solve $\log_2(x+1)+\log_2(x-1)=3$.`, [
    T`Combine: $\log_2\big((x+1)(x-1)\big)=3\Rightarrow x^2-1=2^3=8$.`,
    T`$x^2=9\Rightarrow x=\pm3$.`,
    T`$x=-3$ makes $\log_2(x+1)=\log_2(-2)$ undefined — reject it. $x=3$.`]),
  B.ex(5, T`Solve $2^{x+1}=3^x$.`, [
    T`Take logs: $(x+1)\ln2=x\ln3$.`,
    T`Collect $x$: $x(\ln3-\ln2)=\ln2\Rightarrow x=\dfrac{\ln2}{\ln1.5}=1.71$ (3 s.f.).`]),
  B.ex(6, T`Solve (a) $e^{2x}=7$ (b) $\ln(3x-1)=2$, exactly.`, [
    T`(a) $2x=\ln7\Rightarrow x=\tfrac12\ln7$.`,
    T`(b) $3x-1=e^2\Rightarrow x=\dfrac{e^2+1}{3}$.`]),
  T`<h3>Inequalities involving exponentials</h3><p>To solve $a^x\lt b$, take logs of both sides (log is an increasing function, so the inequality keeps its direction): $x\ln a\lt\ln b$. Now divide by $\ln a$ — and if $0\lt a\lt1$ then $\ln a\lt0$, so the inequality <b>reverses</b>.</p>`,
  B.ex(7, T`Solve $3^x\gt20$.`, [T`$x\ln3\gt\ln20$; $\ln3\gt0$, so $x\gt\dfrac{\ln20}{\ln3}=2.73$ (3 s.f.).`]),
  B.ex(8, T`Find the smallest integer $n$ for which $0.8^n\lt0.01$.`, [
    T`$n\ln0.8\lt\ln0.01$.`,
    T`$\ln0.8\lt0$, so dividing reverses the sign: $n\gt\dfrac{\ln0.01}{\ln0.8}=20.6$.`,
    T`Smallest integer $n=21$. (Check: $0.8^{20}=0.0115$, $0.8^{21}=0.0092$ ✓.)`], T`This is the classic "how many years until it falls below …" question.`),
  B.warn([
    T`Forgetting to reverse an inequality after dividing by the log of a number between 0 and 1.`,
    T`$\log(x+y)\ne\log x+\log y$. The product law needs a <i>product</i> inside.`,
    T`$\dfrac{\log x}{\log y}\ne\log\dfrac xy$. (The left side is $\log_yx$.)`,
    T`$\log x^2=2\log x$ only for $x\gt0$ — check solutions in the original equation.`,
    T`Not rejecting solutions that make a log's argument zero or negative.`]),
  B.exam([
    T`Combine logs into a single log on each side <i>before</i> removing them.`,
    T`State why a root is rejected ("$x+1\gt0$ required").`,
    T`"Exact" means leave $\ln$, e.g. $x=\frac{\ln12}{\ln5}$.`]),
  B.checks([
    [T`Evaluate $\log_4 8$.`, T`$4^{3/2}=8$, so $\frac32$.`],
    [T`Write $\log_a\dfrac{x^3}{\sqrt y}$ in terms of $\log_a x$ and $\log_ay$.`, T`$3\log_ax-\frac12\log_ay$.`],
    [T`Solve $\log_3x=-2$.`, T`$x=3^{-2}=\frac19$.`]]),
  B.examq(8, T`<p>(a) Given that $\log_a2=p$ and $\log_a3=q$, express in terms of $p$ and $q$: (i) $\log_a12$ (ii) $\log_a\dfrac9a$. <span class="mk">[4]</span></p><p>(b) Solve $2\log_3x-\log_3(x-2)=2$. <span class="mk">[4]</span></p>`,
    T`<p>(a)(i) $\log_a(2^2\cdot3)=2p+q$. <span class="mk">M1 A1</span> (ii) $\log_a9-\log_aa=2q-1$. <span class="mk">M1 A1</span></p>
<p>(b) $\log_3\dfrac{x^2}{x-2}=2$ <span class="mk">M1</span> $\Rightarrow x^2=9(x-2)$ <span class="mk">M1</span> $\Rightarrow x^2-9x+18=0\Rightarrow x=3$ or $6$ <span class="mk">A1</span>; both satisfy $x\gt2$, so both are valid. <span class="mk">A1</span></p>`),
  B.key([T`$\log_ax=y\iff a^y=x$.`, T`Product → sum, quotient → difference, power → multiple.`, T`$a^x=b\Rightarrow x=\frac{\log b}{\log a}$; for $a^x\lt b$ reverse if $0\lt a\lt1$.`, T`Always check arguments stay positive.`]),
].join('');

/* ===================================================================== */
BOOK.m_model = [
  B.why(T`<p>Experimental data rarely sit on a straight line, but the human eye (and a ruler) is best at straight lines. Taking logs turns the two most common non-linear models into straight-line graphs, so you can read off their constants from a gradient and an intercept.</p>`),
  B.thm('Linearising the two models', T`<table class="tbl"><tr><th>Model</th><th>Take logs</th><th>Plot</th><th>Gradient</th><th>Intercept</th></tr>
<tr><td>$y=ax^n$</td><td>$\log y=\log a+n\log x$</td><td>$\log y$ against $\log x$</td><td>$n$</td><td>$\log a$</td></tr>
<tr><td>$y=kb^x$</td><td>$\log y=\log k+x\log b$</td><td>$\log y$ against $x$</td><td>$\log b$</td><td>$\log k$</td></tr></table>`),
  B.proof(T`<p>Apply the log laws: $\log(ax^n)=\log a+\log x^n=\log a+n\log x$. With $Y=\log y$ and $X=\log x$ this is $Y=nX+\log a$ — a straight line, gradient $n$, intercept $\log a$. Similarly $\log(kb^x)=\log k+x\log b$, a straight line in $x$ with gradient $\log b$.</p>`),
  B.tip(T`<p><b>Which model?</b> If $\log y$ against $x$ is straight, the model is exponential ($y=kb^x$). If $\log y$ against $\log x$ is straight, it's a power law ($y=ax^n$). Use the same base (10 or $e$) throughout, and remember to undo the log at the end: $a=10^{\text{intercept}}$ (or $e^{\text{intercept}}$).</p>`),
  B.ex(1, T`A graph of $\log_{10}y$ against $\log_{10}x$ is a straight line through $(1,1.3)$ and $(3,2.5)$. Find $y$ in terms of $x$.`, [
    T`Gradient $n=\frac{2.5-1.3}{3-1}=0.6$.`,
    T`Intercept: $1.3-0.6(1)=0.7=\log_{10}a\Rightarrow a=10^{0.7}=5.01$.`,
    T`$y=5.01x^{0.6}$.`]),
  B.ex(2, T`A graph of $\ln y$ against $x$ is a straight line with gradient $-0.2$ and intercept $4.5$. Express $y$ in the form $kb^x$.`, [
    T`$\ln y=4.5-0.2x\Rightarrow y=e^{4.5}e^{-0.2x}$.`,
    T`$k=e^{4.5}=90.0$, $b=e^{-0.2}=0.819$: $y=90.0\times0.819^x$ (equivalently $90.0e^{-0.2x}$).`]),
  B.ex(3, T`Data: $x=1,2,3,4$; $y=6,18,54,162$. Show that $y=kb^x$ fits and find $k$ and $b$.`, [
    T`$\log_{10}y=0.778,\ 1.255,\ 1.732,\ 2.210$ — equal steps of $0.477$, so $\log y$ against $x$ is a straight line.`,
    T`Gradient $0.477=\log_{10}b\Rightarrow b=3$.`,
    T`Intercept $0.778-0.477=0.301=\log_{10}k\Rightarrow k=2$. Model $y=2\times3^x$ (check: $2\times3=6$ ✓).`]),
  B.warn([
    T`Giving the intercept as $a$ (or $k$): it is $\log a$.`,
    T`Mixing $\log_{10}$ and $\ln$ between the gradient and the final answer.`,
    T`Plotting $\log y$ against $x$ for a power law (or vice versa).`,
    T`Reading the gradient off logged axes using the <i>original</i> $x$, $y$ values.`]),
  B.exam([
    T`Start with "taking logs: $\log y=\log k+x\log b$" — it is usually a "show that" mark.`,
    T`Use two well-separated points on the line of best fit (not data points) for the gradient.`,
    T`Comment on reliability: predictions far outside the data range (extrapolation) are less reliable.`]),
  B.checks([
    [T`$y=3x^2$. What graph is a straight line, and what are its gradient and intercept?`, T`$\log y$ against $\log x$: gradient $2$, intercept $\log3$.`],
    [T`$\log_{10}y=0.5x+1$. Find $y$.`, T`$y=10\times(10^{0.5})^x=10\times3.16^x$.`],
    [T`$\ln y=2\ln x+1$. Find $y$.`, T`$y=e\,x^2$.`]]),
  B.examq(8, T`<p>It is believed that $P$ and $t$ satisfy $P=Ab^t$. Experimental values are:</p><table class="tbl"><tr><td>$t$</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><td>$P$</td><td>40</td><td>50</td><td>62.5</td><td>78.1</td><td>97.7</td></tr></table><p>(a) Show that $\log_{10}P=\log_{10}A+t\log_{10}b$. <span class="mk">[2]</span></p><p>(b) Find $\log_{10}P$ for each value of $t$. <span class="mk">[1]</span></p><p>(c) Use a straight-line graph to estimate $A$ and $b$. <span class="mk">[4]</span></p><p>(d) Estimate $P$ when $t=6$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $\log P=\log(Ab^t)=\log A+\log b^t$ <span class="mk">M1</span> $=\log A+t\log b$. <span class="mk">A1</span></p>
<p>(b) $1.602,\ 1.699,\ 1.796,\ 1.893,\ 1.990$. <span class="mk">B1</span></p>
<p>(c) Gradient $\approx\frac{1.990-1.602}{4}=0.097$ <span class="mk">M1</span> $\Rightarrow b=10^{0.097}\approx1.25$ <span class="mk">A1</span>; intercept $1.602$ <span class="mk">M1</span> $\Rightarrow A=10^{1.602}\approx40$. <span class="mk">A1</span></p>
<p>(d) $40\times1.25^6\approx153$. <span class="mk">B1</span></p>`),
  B.key([T`$y=ax^n$: $\log y$ vs $\log x$, gradient $n$, intercept $\log a$.`, T`$y=kb^x$: $\log y$ vs $x$, gradient $\log b$, intercept $\log k$.`, T`Undo the log at the end.`]),
].join('');

/* ===================================================================== */
BOOK.m_dfp = [
  B.why(T`<p>The gradient of a straight line is easy. A curve's gradient changes from point to point; the <b>derivative</b> gives it at every point. "First principles" means: approximate the tangent by a chord, then let the chord shrink to nothing. Everything in calculus rests on this idea.</p>`),
  B.def('derivative', T`<p>For the curve $y=f(x)$, the chord from $P(x,f(x))$ to $Q(x+h,f(x+h))$ has gradient $\dfrac{f(x+h)-f(x)}{h}$. As $Q$ slides towards $P$ ($h\to0$) the chord becomes the tangent: $$f'(x)=\frac{dy}{dx}=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}.$$ (Some books write $\delta x$ for $h$.)</p>`),
  B.ex(1, T`Estimate the gradient of $y=x^2$ at $x=3$ using chords with $h=0.1$ and $h=0.01$.`, [
    T`$h=0.1$: $\dfrac{3.1^2-9}{0.1}=\dfrac{0.61}{0.1}=6.1$.`,
    T`$h=0.01$: $\dfrac{3.01^2-9}{0.01}=\dfrac{0.0601}{0.01}=6.01$.`,
    T`The chord gradients approach $6$: the gradient at $x=3$ is $6$.`]),
  B.thm('Derivative of x²', T`<p>$\dfrac{d}{dx}(x^2)=2x$.</p>`),
  B.proof(T`<p>$\dfrac{(x+h)^2-x^2}{h}=\dfrac{x^2+2xh+h^2-x^2}{h}=\dfrac{2xh+h^2}{h}=2x+h$. As $h\to0$, $2x+h\to2x$.</p>`),
  B.thm('Derivative of x³', T`<p>$\dfrac{d}{dx}(x^3)=3x^2$.</p>`),
  B.proof(T`<p>$(x+h)^3=x^3+3x^2h+3xh^2+h^3$, so $\dfrac{(x+h)^3-x^3}{h}=3x^2+3xh+h^2\to3x^2$ as $h\to0$.</p>`),
  B.ex(2, T`Differentiate $f(x)=3x^2-4x$ from first principles.`, [
    T`$f(x+h)=3(x+h)^2-4(x+h)=3x^2+6xh+3h^2-4x-4h$.`,
    T`$f(x+h)-f(x)=6xh+3h^2-4h$.`,
    T`Divide by $h$: $6x+3h-4$.`,
    T`$h\to0$: $f'(x)=6x-4$.`]),
  B.ex(3, T`Differentiate $f(x)=\dfrac1x$ from first principles.`, [
    T`$f(x+h)-f(x)=\dfrac1{x+h}-\dfrac1x=\dfrac{x-(x+h)}{x(x+h)}=\dfrac{-h}{x(x+h)}$.`,
    T`Divide by $h$: $\dfrac{-1}{x(x+h)}$.`,
    T`$h\to0$: $f'(x)=-\dfrac1{x^2}$ — consistent with the rule $\frac d{dx}x^{-1}=-x^{-2}$.`]),
  B.tip(T`<p>The pattern $x^2\to2x$, $x^3\to3x^2$ (and the binomial expansion of $(x+h)^n$, whose first two terms are $x^n+nx^{n-1}h$) is why $\frac{d}{dx}x^n=nx^{n-1}$. Use the chord-to-tangent simulation and shrink $h$ to watch the chord gradient converge.</p>`),
  B.warn([
    T`Setting $h=0$ before dividing — that gives $\frac00$.`,
    T`Not writing "$\lim_{h\to0}$" or "as $h\to0$" — the limit step is a mark.`,
    T`Expanding $(x+h)^3$ incorrectly; use Pascal's triangle $1,3,3,1$.`,
    T`Using the rule $nx^{n-1}$ when the question says "from first principles" — it scores nothing.`]),
  B.exam([
    T`Standard layout: write $f(x+h)$, subtract $f(x)$, simplify, divide by $h$, take the limit — one line each.`,
    T`End with a clear statement: "so $f'(x)=6x-4$".`]),
  B.checks([
    [T`From first principles, differentiate $5x$.`, T`$\frac{5(x+h)-5x}{h}=5\to5$.`],
    [T`What is $\lim_{h\to0}(4x+2h)$?`, T`$4x$.`],
    [T`Chord gradient of $y=x^3$ from $x=1$ to $x=1.1$?`, T`$\frac{1.331-1}{0.1}=3.31$ (tends to $3$).`]]),
  B.examq(7, T`<p>(a) Prove from first principles that the derivative of $2x^3$ is $6x^2$. <span class="mk">[5]</span></p><p>(b) $P(1,2)$ and $Q(1.1,\ 2.662)$ lie on $y=2x^3$. Find the gradient of the chord $PQ$ and explain how it relates to your answer to (a). <span class="mk">[2]</span></p>`,
    T`<p>(a) $\dfrac{2(x+h)^3-2x^3}{h}$ <span class="mk">M1</span> $=\dfrac{2x^3+6x^2h+6xh^2+2h^3-2x^3}{h}$ <span class="mk">M1</span> $=6x^2+6xh+2h^2$ <span class="mk">A1</span>. As $h\to0$ <span class="mk">M1</span>, $\dfrac{dy}{dx}=6x^2$. <span class="mk">A1</span></p>
<p>(b) $\dfrac{2.662-2}{0.1}=6.62$ <span class="mk">B1</span>; close to $f'(1)=6$, the gradient of the tangent at $P$, which it approaches as $Q\to P$. <span class="mk">B1</span></p>`),
  B.key([T`$f'(x)=\lim_{h\to0}\frac{f(x+h)-f(x)}{h}$.`, T`Expand, subtract, divide by $h$, then let $h\to0$.`, T`$x^2\to2x$, $x^3\to3x^2$, $\frac1x\to-\frac1{x^2}$.`]),
].join('');

/* ===================================================================== */
BOOK.m_dx = [
  B.why(T`<p>First principles is the foundation; the power rule is the tool. Once every term is written as $ax^n$, differentiating is instant — and with the gradient in hand you can write down the tangent and normal to a curve at any point.</p>`),
  B.thm('Power rule', T`$$\frac{d}{dx}\left(ax^n\right)=anx^{n-1}\quad\text{for any rational }n,\qquad\frac{d}{dx}(f+g)=f'+g',\qquad\frac{d}{dx}(c)=0.$$`),
  B.proof(T`<p>For positive integer $n$, the binomial expansion gives $(x+h)^n=x^n+nx^{n-1}h+\binom n2x^{n-2}h^2+\dots$, so $\frac{(x+h)^n-x^n}{h}=nx^{n-1}+(\text{terms containing }h)\to nx^{n-1}$. (The result holds for all rational $n$; you may use it.) Constants have zero gradient, and the limit of a sum is the sum of the limits.</p>`, 'Why the power rule works (positive integers)'),
  B.def('second derivative', T`<p>$f''(x)=\dfrac{d^2y}{dx^2}$ is the derivative of the derivative — the rate at which the gradient changes.</p>`),
  T`<h3>1. Rewrite, then differentiate</h3><p>Turn roots into fractional powers and divisions into negative powers <b>first</b>; multiply out brackets; split fractions over a single-term denominator.</p>`,
  B.ex(1, T`Differentiate $y=4x^3-\dfrac3x+2\sqrt x$.`, [
    T`Rewrite: $y=4x^3-3x^{-1}+2x^{1/2}$.`,
    T`$\dfrac{dy}{dx}=12x^2+3x^{-2}+x^{-1/2}=12x^2+\dfrac3{x^2}+\dfrac1{\sqrt x}$.`]),
  B.ex(2, T`Differentiate $y=(x+3)(2x-1)$.`, [
    T`Expand first: $y=2x^2+5x-3$.`,
    T`$\dfrac{dy}{dx}=4x+5$.`], T`You cannot differentiate a product factor by factor at AS: $(x+3)'(2x-1)'=1\cdot2=2$ is wrong.`),
  B.ex(3, T`Differentiate $y=\dfrac{x^2+4}{\sqrt x}$.`, [
    T`Split: $y=x^{3/2}+4x^{-1/2}$.`,
    T`$\dfrac{dy}{dx}=\tfrac32x^{1/2}-2x^{-3/2}$.`]),
  T`<h3>2. Tangents and normals</h3><p>At $x=x_1$: find $y_1$, then the gradient $m=f'(x_1)$. Tangent: $y-y_1=m(x-x_1)$. The <b>normal</b> is perpendicular to the tangent: gradient $-\frac1m$.</p>`,
  B.ex(4, T`Find the tangent and normal to $y=x^3-2x+1$ at $x=1$.`, [
    T`$y_1=1-2+1=0$; $\dfrac{dy}{dx}=3x^2-2=1$ at $x=1$.`,
    T`Tangent: $y-0=1(x-1)\Rightarrow y=x-1$.`,
    T`Normal gradient $-1$: $y=-(x-1)=1-x$.`]),
  B.ex(5, T`Find the points on $y=x^3-3x^2$ where the gradient is $9$.`, [
    T`$\dfrac{dy}{dx}=3x^2-6x=9\Rightarrow x^2-2x-3=0\Rightarrow(x-3)(x+1)=0$.`,
    T`$x=3$: $y=0$; $x=-1$: $y=-4$. Points $(3,0)$ and $(-1,-4)$.`]),
  B.warn([
    T`$\dfrac1{2x}=\tfrac12x^{-1}$, not $2x^{-1}$.`,
    T`$\sqrt x=x^{1/2}$ differentiates to $\frac12x^{-1/2}$, not $\frac12x^{1/2}$ — subtract 1 from the power.`,
    T`Substituting $x$ into the curve to get the gradient (that gives $y$) — differentiate first, then substitute.`,
    T`Using the tangent gradient for the normal.`]),
  B.exam([
    T`Write the rewritten form ($ax^n$ terms) on its own line — an early method mark.`,
    T`"Find the equation" — give it in the requested form, usually $y=mx+c$ or $ax+by+c=0$.`,
    T`Check: the point must satisfy your tangent/normal equation.`]),
  B.checks([
    [T`Differentiate $5x^4-x^{-2}$.`, T`$20x^3+2x^{-3}$.`],
    [T`$f(x)=\dfrac{6}{x^3}$. Find $f'(x)$.`, T`$-18x^{-4}=-\frac{18}{x^4}$.`],
    [T`Gradient of $y=x^2$ at $(3,9)$ and the normal's gradient?`, T`$6$; $-\frac16$.`]]),
  B.examq(8, T`<p>The curve $C$ has equation $y=x^2-\dfrac4x$.</p><p>(a) Find $\dfrac{dy}{dx}$. <span class="mk">[2]</span></p><p>(b) Find the equation of the tangent to $C$ at the point where $x=2$. <span class="mk">[3]</span></p><p>(c) The normal to $C$ at this point meets the $x$-axis at $A$. Find the coordinates of $A$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $y=x^2-4x^{-1}$ <span class="mk">M1</span>, $\dfrac{dy}{dx}=2x+4x^{-2}$. <span class="mk">A1</span></p>
<p>(b) At $x=2$: $y=4-2=2$, gradient $4+1=5$ <span class="mk">M1</span>; $y-2=5(x-2)$ <span class="mk">M1</span> $\Rightarrow y=5x-8$. <span class="mk">A1</span></p>
<p>(c) Normal gradient $-\tfrac15$ <span class="mk">M1</span>: $y-2=-\tfrac15(x-2)$; $y=0\Rightarrow x-2=10$ <span class="mk">M1</span>, $A(12,0)$. <span class="mk">A1</span></p>`),
  B.key([T`$\frac d{dx}ax^n=anx^{n-1}$; rewrite as powers first.`, T`Tangent: gradient $f'(x_1)$; normal: $-\frac1{f'(x_1)}$.`, T`$y-y_1=m(x-x_1)$.`]),
].join('');

/* ===================================================================== */
BOOK.m_stat = [
  B.why(T`<p>Where a smooth curve turns, its gradient is zero. Finding those points — and deciding whether they are maxima or minima — lets you answer real optimisation problems: the biggest box from a sheet of card, the cheapest can for a given volume, the largest field for a given fence.</p>`),
  B.def('stationary point', T`<p>A point where $\dfrac{dy}{dx}=0$. A function is <b>increasing</b> on an interval where $f'(x)\gt0$ and <b>decreasing</b> where $f'(x)\lt0$.</p>`),
  B.thm('Classifying stationary points', T`<p>At a stationary point $x=a$:</p><ul><li>$f''(a)\gt0$ $\Rightarrow$ local <b>minimum</b> (gradient increasing through zero: $-,0,+$);</li><li>$f''(a)\lt0$ $\Rightarrow$ local <b>maximum</b> ($+,0,-$);</li><li>$f''(a)=0$ $\Rightarrow$ inconclusive: check the sign of $f'$ just either side.</li></ul>`),
  B.proof(T`<p>$f''$ is the rate of change of the gradient. If $f''(a)\gt0$ the gradient is increasing through $x=a$, so it goes from negative to positive: the curve falls then rises — a minimum. The other case is the mirror image.</p>`, 'Why the second-derivative test works'),
  B.ex(1, T`Find and classify the stationary points of $y=x^3-6x^2+9x+1$.`, [
    T`$\dfrac{dy}{dx}=3x^2-12x+9=3(x-1)(x-3)=0\Rightarrow x=1,3$.`,
    T`$x=1$: $y=5$; $x=3$: $y=1$.`,
    T`$\dfrac{d^2y}{dx^2}=6x-12$: at $x=1$ it is $-6\lt0$ (maximum $(1,5)$); at $x=3$ it is $6\gt0$ (minimum $(3,1)$).`]),
  B.ex(2, T`Find the set of values of $x$ for which $f(x)=x^3-3x$ is decreasing.`, [
    T`$f'(x)=3x^2-3\lt0\Rightarrow x^2\lt1$.`,
    T`$-1\lt x\lt1$.`]),
  B.ex(3, T`Show that $f(x)=x^3+3x-2$ is increasing for all $x$.`, [
    T`$f'(x)=3x^2+3$.`,
    T`$x^2\ge0\Rightarrow3x^2+3\ge3\gt0$ for all $x$, so $f$ is increasing everywhere.`]),
  B.ex(4, T`Classify the stationary point of $y=x^4$.`, [
    T`$y'=4x^3=0\Rightarrow x=0$; $y''=12x^2=0$ at $x=0$ — inconclusive.`,
    T`$x=-0.1$: $y'\lt0$; $x=0.1$: $y'\gt0$. Pattern $-,0,+$: minimum at $(0,0)$.`]),
  T`<h3>Optimisation</h3><ol><li>Write the quantity to optimise in terms of <b>one</b> variable (use the constraint to eliminate the other).</li><li>Differentiate, set to zero, solve.</li><li>Justify max/min (second derivative), and check the answer is in the allowed range.</li><li>Answer the question asked (often the max value, not $x$).</li></ol>`,
  B.ex(5, T`An open box is made from a $12$ cm square of card by cutting a square of side $x$ cm from each corner and folding up. Find the maximum volume.`, [
    T`Base $(12-2x)$ by $(12-2x)$, height $x$: $V=x(12-2x)^2=4x^3-48x^2+144x$, with $0\lt x\lt6$.`,
    T`$V'=12x^2-96x+144=12(x-2)(x-6)=0\Rightarrow x=2$ (since $x=6$ gives no box).`,
    T`$V''=24x-96=-48\lt0$ at $x=2$: maximum.`,
    T`$V_{\max}=2\times8^2=128\text{ cm}^3$.`]),
  B.ex(6, T`A farmer has $40$ m of fencing to make a rectangular pen against a long wall (the wall forms one side). Find the maximum area.`, [
    T`Let the two sides perpendicular to the wall be $x$: the third side is $40-2x$. $A=x(40-2x)=40x-2x^2$.`,
    T`$A'=40-4x=0\Rightarrow x=10$; $A''=-4\lt0$, maximum.`,
    T`$A_{\max}=10\times20=200\text{ m}^2$.`]),
  B.warn([
    T`Finding $x$ and forgetting the $y$-coordinate (or the actual maximum value).`,
    T`Not justifying the nature — "it's a maximum because it's the answer" earns nothing.`,
    T`Concluding "point of inflection" whenever $f''=0$; $y=x^4$ shows it can still be a min.`,
    T`In optimisation, keeping two variables when differentiating.`]),
  B.exam([
    T`"Show that $V=\dots$" parts: explain each dimension in words; the derivation itself is the marks.`,
    T`Always include the second-derivative value with its sign: "$\frac{d^2V}{dx^2}=-48\lt0$, so maximum".`,
    T`Give units in the final answer.`]),
  B.checks([
    [T`Stationary point of $y=x^2-8x+3$?`, T`$2x-8=0$: $(4,-13)$, minimum.`],
    [T`Where is $y=12x-x^3$ increasing?`, T`$12-3x^2\gt0\Rightarrow-2\lt x\lt2$.`],
    [T`$f''(a)=-3$ at a stationary point. Max or min?`, T`Maximum.`]]),
  B.examq(10, T`<p>A closed cylindrical can has radius $r$ cm, height $h$ cm and volume $250\pi\text{ cm}^3$.</p><p>(a) Show that the total surface area is $S=2\pi r^2+\dfrac{500\pi}{r}$. <span class="mk">[3]</span></p><p>(b) Find the value of $r$ for which $S$ is stationary. <span class="mk">[4]</span></p><p>(c) Show that this gives a minimum, and find the minimum surface area in terms of $\pi$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $\pi r^2h=250\pi\Rightarrow h=\dfrac{250}{r^2}$ <span class="mk">B1</span>. $S=2\pi r^2+2\pi rh$ <span class="mk">M1</span> $=2\pi r^2+2\pi r\cdot\dfrac{250}{r^2}=2\pi r^2+\dfrac{500\pi}r$. <span class="mk">A1</span></p>
<p>(b) $\dfrac{dS}{dr}=4\pi r-500\pi r^{-2}$ <span class="mk">M1 A1</span>; $=0\Rightarrow r^3=125$ <span class="mk">M1</span>, $r=5$. <span class="mk">A1</span></p>
<p>(c) $\dfrac{d^2S}{dr^2}=4\pi+1000\pi r^{-3}=12\pi\gt0$ at $r=5$: minimum. <span class="mk">M1 A1</span> $S=50\pi+100\pi=150\pi\text{ cm}^2$. <span class="mk">A1</span></p>`),
  B.key([T`Stationary: $f'(x)=0$. $f''\gt0$ min, $f''\lt0$ max, $f''=0$ check signs.`, T`Increasing $f'\gt0$; decreasing $f'\lt0$.`, T`Optimisation: one variable → differentiate → solve → justify → answer the question.`]),
].join('');

/* ===================================================================== */
BOOK.m_int = [
  B.why(T`<p>Integration reverses differentiation: given the gradient function, recover the curve. Because constants vanish when you differentiate, integrating gives a whole <b>family</b> of curves $y=F(x)+c$; one known point picks out the member you want.</p>`),
  B.thm('Integrating powers', T`$$\int ax^n\,dx=\frac{a\,x^{n+1}}{n+1}+c\qquad(n\ne-1).$$<p>Integrate term by term; $c$ is the <b>constant of integration</b>.</p>`),
  B.proof(T`<p>Differentiate the answer: $\dfrac{d}{dx}\left(\dfrac{ax^{n+1}}{n+1}+c\right)=\dfrac{a(n+1)x^n}{n+1}+0=ax^n$ ✓. The rule fails at $n=-1$ because it would divide by zero ($\int x^{-1}dx$ is $\ln|x|$, met at A2).</p>`),
  T`<p><b>Rule of thumb:</b> "add one to the power, divide by the new power". As with differentiation, rewrite roots and fractions as powers and multiply out brackets first.</p>`,
  B.ex(1, T`Find $\displaystyle\int(6x^2-4x+5)\,dx$.`, [
    T`$\dfrac{6x^3}{3}-\dfrac{4x^2}{2}+5x+c=2x^3-2x^2+5x+c$.`]),
  B.ex(2, T`Find $\displaystyle\int\left(\frac3{x^2}+\sqrt x\right)dx$.`, [
    T`Rewrite: $3x^{-2}+x^{1/2}$.`,
    T`$\dfrac{3x^{-1}}{-1}+\dfrac{x^{3/2}}{3/2}+c=-\dfrac3x+\dfrac23x^{3/2}+c$.`]),
  B.ex(3, T`Find $\displaystyle\int(x+1)(x-2)\,dx$.`, [
    T`Expand: $x^2-x-2$.`,
    T`$\dfrac{x^3}3-\dfrac{x^2}2-2x+c$.`]),
  B.ex(4, T`A curve has gradient $\dfrac{dy}{dx}=3x^2-2x$ and passes through $(2,5)$. Find its equation.`, [
    T`$y=x^3-x^2+c$.`,
    T`$5=8-4+c\Rightarrow c=1$.`,
    T`$y=x^3-x^2+1$.`]),
  B.ex(5, T`Find $\displaystyle\int\frac{x^3-2}{x^2}\,dx$.`, [
    T`Split: $x-2x^{-2}$.`,
    T`$\dfrac{x^2}2+2x^{-1}+c=\dfrac{x^2}{2}+\dfrac2x+c$.`]),
  B.warn([
    T`Forgetting $+c$ on an indefinite integral (it is a mark).`,
    T`Integrating a product or quotient term by term without expanding/splitting first.`,
    T`Dividing by the old power instead of the new one.`,
    T`Errors with negative and fractional powers: $\int x^{-1/2}dx=2x^{1/2}$, not $-\frac12x^{-3/2}$ (that's differentiating).`]),
  B.exam([
    T`Check by differentiating your answer — 10 seconds, catches most slips.`,
    T`When a point is given, substitute it immediately to find $c$ and state the full equation.`]),
  B.checks([
    [T`$\int8x^3\,dx$?`, T`$2x^4+c$.`],
    [T`$\int x^{-1/2}\,dx$?`, T`$2\sqrt x+c$.`],
    [T`$\int5\,dx$?`, T`$5x+c$.`]]),
  B.examq(6, T`<p>A curve has gradient function $\dfrac{dy}{dx}=\dfrac{3x-2}{\sqrt x}$, $x\gt0$, and passes through the point $(4,10)$.</p><p>Find the equation of the curve. <span class="mk">[6]</span></p>`,
    T`<p>$\dfrac{dy}{dx}=3x^{1/2}-2x^{-1/2}$ <span class="mk">M1 A1</span>. $y=2x^{3/2}-4x^{1/2}+c$ <span class="mk">M1 A1</span>. At $(4,10)$: $16-8+c=10\Rightarrow c=2$ <span class="mk">M1</span>. $y=2x^{3/2}-4\sqrt x+2$. <span class="mk">A1</span></p>`),
  B.key([T`$\int ax^n\,dx=\frac{ax^{n+1}}{n+1}+c$, $n\ne-1$.`, T`Rewrite as powers, expand, split.`, T`Use a point to find $c$.`]),
].join('');

/* ===================================================================== */
BOOK.m_area = [
  B.why(T`<p>The same operation that reverses differentiation also measures area. That surprising link — the <b>Fundamental Theorem of Calculus</b> — turns an infinite sum of thin strips into two substitutions.</p>`),
  B.def('definite integral', T`<p>If $F'(x)=f(x)$, then $$\int_a^bf(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a).$$ The constant $c$ cancels, so it is left out.</p>`),
  B.thm('Area under a curve', T`<p>If $f(x)\ge0$ for $a\le x\le b$, the area between $y=f(x)$, the $x$-axis and the lines $x=a$, $x=b$ is $\displaystyle\int_a^bf(x)\,dx$.</p>`),
  B.proof(T`<p>Let $A(x)$ be the area from $a$ up to $x$. Increasing $x$ by a small $h$ adds a thin strip of width $h$ and height about $f(x)$, so $A(x+h)-A(x)\approx h\,f(x)$, i.e. $\dfrac{A(x+h)-A(x)}{h}\approx f(x)$. As $h\to0$ this becomes exact: $A'(x)=f(x)$. So $A$ is an integral of $f$: $A(x)=F(x)+c$. Since $A(a)=0$, $c=-F(a)$, and the area up to $b$ is $A(b)=F(b)-F(a)$.</p>`, 'Why integration gives area (sketch proof)'),
  B.tip(T`<p>Regions <b>below</b> the $x$-axis give a <b>negative</b> integral. For a total area, find where the curve crosses the axis, integrate each piece separately and add the absolute values. The area simulation shows the signed rectangles turning pink below the axis.</p>`),
  B.ex(1, T`Evaluate $\displaystyle\int_1^3(x^2+1)\,dx$.`, [
    T`$\left[\dfrac{x^3}3+x\right]_1^3=(9+3)-\left(\tfrac13+1\right)$.`,
    T`$=12-\tfrac43=\tfrac{32}3$.`]),
  B.ex(2, T`Find the total area between $y=x^2-4x+3$ and the $x$-axis for $0\le x\le3$.`, [
    T`Roots: $(x-1)(x-3)=0$, so the curve is above the axis on $[0,1]$ and below on $[1,3]$.`,
    T`$F(x)=\dfrac{x^3}3-2x^2+3x$. $\int_0^1=F(1)-F(0)=\tfrac43$.`,
    T`$\int_1^3=F(3)-F(1)=0-\tfrac43=-\tfrac43$ (below the axis).`,
    T`Total area $=\tfrac43+\tfrac43=\tfrac83$. (The plain integral $\int_0^3$ is $0$ — not the area!)`]),
  T`<h3>Area between a curve and the $y$-axis</h3><p>The specification says "the area defined by a curve and <b>either</b> axis". For the $y$-axis, slice horizontally: strips of width $x$ and height $\delta y$, so $$\text{Area}=\int_c^d x\,dy,$$ with $x$ written in terms of $y$ and the limits as $y$-values.</p>`,
  B.ex(3, T`Find the area between $y=x^2$ ($x\ge0$), the $y$-axis and the lines $y=1$ and $y=4$.`, [
    T`Write $x$ in terms of $y$: $x=\sqrt y=y^{1/2}$.`,
    T`Area $=\displaystyle\int_1^4y^{1/2}\,dy=\left[\tfrac23y^{3/2}\right]_1^4=\tfrac23(8-1)=\tfrac{14}{3}$.`], T`Sketch first: the region sits to the <i>left</i> of the curve, against the $y$-axis.`),
  B.ex(4, T`Evaluate $\displaystyle\int_1^4\frac1{\sqrt x}\,dx$.`, [
    T`$\int x^{-1/2}dx=2x^{1/2}$.`,
    T`$\big[2\sqrt x\big]_1^4=4-2=2$.`]),
  B.warn([
    T`Integrating straight across a root and calling the answer "the area".`,
    T`Bracket errors in $F(b)-F(a)$ — always bracket $F(a)$ before subtracting.`,
    T`For the $y$-axis, integrating with respect to $x$ (and $x$-limits) instead of $\int x\,dy$ with $y$-limits.`,
    T`Adding $+c$ to a definite integral (harmless but untidy).`]),
  B.exam([
    T`Show the square-bracket line $\big[F(x)\big]_a^b$ and the substitution of both limits — those are method marks.`,
    T`A sketch (even a rough one) showing the region is the fastest way to avoid sign errors.`,
    T`Exact answers as fractions unless told otherwise.`]),
  B.checks([
    [T`$\int_0^2 3x^2\,dx$?`, T`$\big[x^3\big]_0^2=8$.`],
    [T`$\int_{-1}^{1}x^3\,dx$ — and what is the area?`, T`$0$; area $=\tfrac14+\tfrac14=\tfrac12$.`],
    [T`Area between $y=x^2$ ($x\ge0$), the $y$-axis and $y=4$?`, T`$\int_0^4y^{1/2}dy=\tfrac{16}{3}$.`]]),
  B.examq(8, T`<p>The curve $C$ has equation $y=x^3-4x$.</p><p>(a) Find the points where $C$ meets the $x$-axis. <span class="mk">[2]</span></p><p>(b) Find the total area enclosed between $C$ and the $x$-axis. <span class="mk">[5]</span></p><p>(c) Explain why $\displaystyle\int_{-2}^{2}(x^3-4x)\,dx$ does not give this area. <span class="mk">[1]</span></p>`,
    T`<p>(a) $x(x-2)(x+2)=0$ <span class="mk">M1</span>: $(-2,0)$, $(0,0)$, $(2,0)$. <span class="mk">A1</span></p>
<p>(b) $F(x)=\tfrac{x^4}{4}-2x^2$ <span class="mk">M1 A1</span>. $\int_{-2}^{0}=0-(4-8)=4$ <span class="mk">M1</span>; $\int_0^2=(4-8)-0=-4$ <span class="mk">A1</span>; total area $4+4=8$. <span class="mk">A1</span></p>
<p>(c) The region for $0\lt x\lt2$ is below the axis, so its integral is negative and cancels the positive part (the integral is $0$). <span class="mk">B1</span></p>`),
  B.key([T`$\int_a^bf\,dx=F(b)-F(a)$.`, T`Below the axis is negative: split at roots for total area.`, T`With the $y$-axis: $\int_c^dx\,dy$.`]),
].join('');

/* ===================================================================== */
BOOK.m_vec = [
  B.why(T`<p>A vector has a <b>size</b> and a <b>direction</b> — a displacement, a velocity, a force. Vectors let you do geometry with algebra: proving lines are parallel, points collinear or diagonals bisecting, all by adding and scaling arrows.</p>`),
  B.def('vectors in 2D', T`<ul><li>Notation: $\mathbf a=3\mathbf i-4\mathbf j=\begin{pmatrix}3\\-4\end{pmatrix}$, where $\mathbf i$, $\mathbf j$ are unit vectors along the axes.</li><li><b>Magnitude</b> $|x\mathbf i+y\mathbf j|=\sqrt{x^2+y^2}$; <b>direction</b>: the angle $\theta$ with $\mathbf i$, where $\tan\theta=\frac yx$ (use a sketch to get the quadrant).</li><li><b>Unit vector</b> in the direction of $\mathbf a$: $\hat{\mathbf a}=\dfrac{\mathbf a}{|\mathbf a|}$.</li><li><b>Position vector</b> of $A$: $\overrightarrow{OA}=\mathbf a$. Then $\overrightarrow{AB}=\mathbf b-\mathbf a$, and the distance $AB=|\mathbf b-\mathbf a|$.</li><li><b>Parallel</b>: $\mathbf a$ and $\mathbf b$ are parallel if $\mathbf a=\lambda\mathbf b$ for some scalar $\lambda$.</li></ul>`),
  B.thm('Vector rules', T`<p>Add and subtract component by component; $\lambda\mathbf a$ scales the length by $|\lambda|$ (and reverses direction if $\lambda\lt0$). Triangle law: $\overrightarrow{AB}+\overrightarrow{BC}=\overrightarrow{AC}$. The midpoint $M$ of $AB$ has position vector $\tfrac12(\mathbf a+\mathbf b)$.</p>`),
  B.proof(T`<p>$\overrightarrow{AB}=\overrightarrow{AO}+\overrightarrow{OB}=-\mathbf a+\mathbf b$. For the midpoint: $\overrightarrow{OM}=\mathbf a+\tfrac12\overrightarrow{AB}=\mathbf a+\tfrac12(\mathbf b-\mathbf a)=\tfrac12(\mathbf a+\mathbf b)$.</p>`, 'Why AB = b − a, and the midpoint'),
  B.ex(1, T`For $\mathbf a=3\mathbf i-4\mathbf j$ find $|\mathbf a|$, the unit vector $\hat{\mathbf a}$ and the direction of $\mathbf a$.`, [
    T`$|\mathbf a|=\sqrt{9+16}=5$; $\hat{\mathbf a}=\tfrac35\mathbf i-\tfrac45\mathbf j$.`,
    T`$\tan\theta=-\tfrac43$; the vector points right and down (quadrant 4), so $\theta=-53.1^\circ$, i.e. $53.1^\circ$ below the positive $x$-axis.`]),
  B.ex(2, T`$A(2,5)$, $B(8,-3)$. Find $\overrightarrow{AB}$, $|AB|$ and the midpoint of $AB$.`, [
    T`$\overrightarrow{AB}=(8-2)\mathbf i+(-3-5)\mathbf j=6\mathbf i-8\mathbf j$.`,
    T`$|AB|=\sqrt{36+64}=10$; midpoint $(5,1)$.`]),
  B.ex(3, T`Find $\lambda$ so that $(2+\lambda)\mathbf i+3\mathbf j$ is parallel to $2\mathbf i-\mathbf j$.`, [
    T`Parallel: $(2+\lambda)\mathbf i+3\mathbf j=\mu(2\mathbf i-\mathbf j)$.`,
    T`$\mathbf j$: $3=-\mu\Rightarrow\mu=-3$. $\mathbf i$: $2+\lambda=-6\Rightarrow\lambda=-8$.`]),
  B.ex(4, T`Prove that the line joining the midpoints of two sides of a triangle is parallel to the third side and half its length.`, [
    T`Triangle $OAB$ with $\overrightarrow{OA}=\mathbf a$, $\overrightarrow{OB}=\mathbf b$. Midpoints: $M$ of $OA$ is $\tfrac12\mathbf a$; $N$ of $OB$ is $\tfrac12\mathbf b$.`,
    T`$\overrightarrow{MN}=\tfrac12\mathbf b-\tfrac12\mathbf a=\tfrac12(\mathbf b-\mathbf a)=\tfrac12\overrightarrow{AB}$.`,
    T`A scalar multiple of $\overrightarrow{AB}$ $\Rightarrow$ parallel, and the factor $\tfrac12$ gives half the length. $\blacksquare$`]),
  B.ex(5, T`$OABC$ is a parallelogram with $\overrightarrow{OA}=\mathbf a$, $\overrightarrow{OC}=\mathbf c$. Prove that its diagonals bisect each other.`, [
    T`$\overrightarrow{OB}=\mathbf a+\mathbf c$, so the midpoint of $OB$ is $\tfrac12(\mathbf a+\mathbf c)$.`,
    T`Midpoint of $AC$: $\tfrac12(\mathbf a+\mathbf c)$ (midpoint formula).`,
    T`Same point, so the diagonals meet at their midpoints. $\blacksquare$`]),
  B.warn([
    T`$\overrightarrow{AB}=\mathbf b-\mathbf a$, not $\mathbf a-\mathbf b$ ("end minus start").`,
    T`Direction angle in the wrong quadrant — sketch the vector.`,
    T`Unit vector: divide <i>every</i> component by the magnitude.`,
    T`Writing a vector as a number: $|\mathbf a|$ is a number, $\mathbf a$ is not.`]),
  B.exam([
    T`Collinear proofs need two things: the vectors are parallel ($\overrightarrow{AC}=k\overrightarrow{AB}$) <b>and</b> they share a point.`,
    T`Underline vectors in handwriting ($\underline a$) — the examiner needs to see which quantities are vectors.`,
    T`Give directions as an angle from a stated reference (e.g. "$53.1^\circ$ below $\mathbf i$" or a bearing).`]),
  B.checks([
    [T`$|5\mathbf i+12\mathbf j|$?`, T`$13$.`],
    [T`Unit vector parallel to $\mathbf i+\mathbf j$?`, T`$\frac1{\sqrt2}(\mathbf i+\mathbf j)$.`],
    [T`$\mathbf a=2\mathbf i+\mathbf j$, $\mathbf b=-\mathbf i+3\mathbf j$. Find $2\mathbf a-\mathbf b$.`, T`$5\mathbf i-\mathbf j$.`]]),
  B.examq(7, T`<p>The points $A$ and $B$ have position vectors $\mathbf a=2\mathbf i+3\mathbf j$ and $\mathbf b=6\mathbf i-\mathbf j$.</p><p>(a) Find $\overrightarrow{AB}$ and $|\overrightarrow{AB}|$. <span class="mk">[2]</span></p><p>(b) Find the unit vector in the direction of $\overrightarrow{AB}$. <span class="mk">[1]</span></p><p>(c) $P$ lies on $AB$ with $AP:PB=1:3$. Find the position vector of $P$. <span class="mk">[2]</span></p><p>(d) Show that the point $D$ with position vector $10\mathbf i-5\mathbf j$ lies on the line $AB$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $\overrightarrow{AB}=4\mathbf i-4\mathbf j$ <span class="mk">B1</span>, $|\overrightarrow{AB}|=4\sqrt2$. <span class="mk">B1</span></p>
<p>(b) $\tfrac1{\sqrt2}(\mathbf i-\mathbf j)$. <span class="mk">B1</span></p>
<p>(c) $\overrightarrow{OP}=\mathbf a+\tfrac14\overrightarrow{AB}$ <span class="mk">M1</span> $=3\mathbf i+2\mathbf j$. <span class="mk">A1</span></p>
<p>(d) $\overrightarrow{AD}=8\mathbf i-8\mathbf j=2\overrightarrow{AB}$ <span class="mk">M1</span>: parallel to $\overrightarrow{AB}$ and sharing point $A$, so $A$, $B$, $D$ are collinear. <span class="mk">A1</span></p>`),
  B.key([T`$|x\mathbf i+y\mathbf j|=\sqrt{x^2+y^2}$; $\hat{\mathbf a}=\mathbf a/|\mathbf a|$.`, T`$\overrightarrow{AB}=\mathbf b-\mathbf a$; midpoint $\frac12(\mathbf a+\mathbf b)$.`, T`Parallel $\iff$ scalar multiple; collinear = parallel + common point.`]),
].join('');
