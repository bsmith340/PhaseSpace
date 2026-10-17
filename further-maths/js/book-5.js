// BCSFM textbook, part 5: Differential equations.
'use strict';

BOOK.de1 = [
  B.why(T`<p>A differential equation (DE) links a function with its derivatives — "the rate of change depends on the current value". Cooling coffee, falling objects with air resistance, charging capacitors and population growth are all DEs. Solving one means finding the function.</p>`),
  B.def('terminology', T`<ul><li><b>Order</b>: the highest derivative present.</li><li><b>General solution</b>: contains arbitrary constant(s) — a whole family of curves (see the slope-field sim).</li><li><b>Particular solution</b>: one member of the family, fixed by a condition like $y(0)=2$.</li></ul>`),
  T`<h3>1. Separable equations</h3>`,
  B.thm('Separation of variables', T`<p>If $\dfrac{dy}{dx}=f(x)\,g(y)$ then $\displaystyle\int\frac{1}{g(y)}\,dy=\int f(x)\,dx$.</p>`),
  B.proof(T`<p>Divide by $g(y)$: $\frac1{g(y)}\frac{dy}{dx}=f(x)$. Integrate both sides with respect to $x$; by the chain rule (substitution), $\int\frac{1}{g(y)}\frac{dy}{dx}dx=\int\frac{1}{g(y)}dy$.</p>`, 'Why it works'),
  B.ex(1, T`Solve $\dfrac{dy}{dx}=xy$ given $y(0)=3$.`, [T`$\int\frac{dy}y=\int x\,dx\Rightarrow\ln|y|=\frac{x^2}{2}+c$.`, T`$y=Ae^{x^2/2}$ (with $A=\pm e^c$; $y=0$ is also a solution).`, T`$y(0)=3\Rightarrow A=3$: $y=3e^{x^2/2}$.`]),
  T`<h3>2. Linear first-order equations: the integrating factor</h3>`,
  B.thm('Integrating factor', T`<p>For $\dfrac{dy}{dx}+P(x)\,y=Q(x)$, multiply through by $I(x)=e^{\int P\,dx}$. Then the left side is an exact derivative:</p>$$\frac{d}{dx}\big(I\,y\big)=I\,Q\quad\Longrightarrow\quad I\,y=\int I\,Q\,dx.$$`),
  B.proof(T`<p>We want a multiplier $I(x)$ with $I\frac{dy}{dx}+IPy=\frac{d}{dx}(Iy)$. By the product rule $\frac{d}{dx}(Iy)=I\frac{dy}{dx}+\frac{dI}{dx}y$. These match exactly when $\frac{dI}{dx}=IP$, a separable equation: $\int\frac{dI}{I}=\int P\,dx$, so $I=e^{\int P\,dx}$ (no constant needed — any one multiplier works).</p>`, 'Where the integrating factor comes from'),
  B.ex(2, T`Solve $\dfrac{dy}{dx}+2y=e^x$.`, [T`$P=2$, $I=e^{2x}$.`, T`$\frac{d}{dx}(ye^{2x})=e^{3x}$, so $ye^{2x}=\frac13e^{3x}+c$.`, T`$y=\frac13e^x+ce^{-2x}$. (Divide the constant by $I$ too!)`]),
  B.ex(3, T`Solve $x\dfrac{dy}{dx}+2y=x^2$, $x\gt0$.`, [T`Standard form first (coefficient of $y'$ must be 1): $\frac{dy}{dx}+\frac2xy=x$.`, T`$I=e^{\int\frac2x dx}=e^{2\ln x}=x^2$.`, T`$\frac{d}{dx}(x^2y)=x^3\Rightarrow x^2y=\frac{x^4}4+c\Rightarrow y=\frac{x^2}4+\frac{c}{x^2}$.`]),
  B.ex(4, T`Solve $\dfrac{dy}{dx}+y\tan x=\sec x$, $|x|\lt\frac\pi2$.`, [T`$I=e^{\int\tan x\,dx}=e^{\ln\sec x}=\sec x$.`, T`$\frac d{dx}(y\sec x)=\sec^2x\Rightarrow y\sec x=\tan x+c$.`, T`$y=\sin x+c\cos x$.`]),
  B.ex(5, T`A particle falls with $\frac{dv}{dt}=10-0.5v$, starting at rest. Find $v(t)$ and the terminal velocity.`, [T`$\frac{dv}{dt}+0.5v=10$, $I=e^{0.5t}$: $ve^{0.5t}=20e^{0.5t}+c$.`, T`$v=20+ce^{-0.5t}$; $v(0)=0\Rightarrow c=-20$: $v=20(1-e^{-t/2})$.`, T`As $t\to\infty$, $v\to20$: terminal velocity $20\text{ m s}^{-1}$.`]),
  B.warn([T`Not dividing to get the coefficient of $\frac{dy}{dx}$ equal to $1$ before finding $I$.`, T`$e^{2\ln x}=2x$ — wrong; it's $x^2$.`, T`Forgetting $+c$, or adding it but not dividing it by $I$.`]),
  B.checks([[T`Solve $\frac{dy}{dx}-\frac yx=x^2$.`, T`$I=\frac1x$: $\frac yx=\frac{x^2}2+c$, $y=\frac{x^3}2+cx$.`], [T`Solve $\frac{dy}{dx}=\frac{y}{x}$.`, T`Separable: $y=Ax$.`]]),
  B.examq(7, T`<p>Find the solution of $(x+1)\dfrac{dy}{dx}+y=(x+1)^2$ for which $y=1$ when $x=0$.</p>`,
    T`<p>Divide: $\frac{dy}{dx}+\frac{y}{x+1}=x+1$ <span class="mk">M1</span>; $I=e^{\ln(x+1)}=x+1$ <span class="mk">A1</span></p>
<p>$\frac d{dx}\big((x+1)y\big)=(x+1)^2$ <span class="mk">M1</span> $\Rightarrow(x+1)y=\frac13(x+1)^3+c$ <span class="mk">A1</span></p>
<p>$x=0,y=1$: $1=\frac13+c$, $c=\frac23$ <span class="mk">M1</span>; $y=\frac13(x+1)^2+\frac{2}{3(x+1)}$ <span class="mk">A1 A1</span></p>
<p class="muted">(Notice the original left side was already $\frac{d}{dx}((x+1)y)$ — spotting that saves time.)</p>`),
  B.key([T`Separable: $\int\frac{dy}{g(y)}=\int f\,dx$.`, T`Linear: $I=e^{\int P}$, then $(Iy)'=IQ$.`]),
].join('');

BOOK.de2 = [
  B.why(T`<p>Springs, pendulums, circuits and suspension systems obey equations like $a\ddot x+b\dot x+cx=0$. Their solutions are built from exponentials — and, through Euler's formula, sines and cosines. The algebra reduces to a quadratic: the <b>auxiliary equation</b>.</p>`),
  B.def('second-order linear, constant coefficients', T`<p>$a\dfrac{d^2y}{dx^2}+b\dfrac{dy}{dx}+cy=f(x)$ with constants $a,b,c$. It's <b>homogeneous</b> if $f(x)=0$. Its general solution needs <b>two</b> arbitrary constants.</p>`),
  B.thm('Superposition', T`<p>If $y_1$ and $y_2$ solve the homogeneous equation, so does $Ay_1+By_2$ for any constants $A,B$.</p>`),
  B.proof(T`<p>Substitute: $a(Ay_1+By_2)''+b(Ay_1+By_2)'+c(Ay_1+By_2)=A(ay_1''+by_1'+cy_1)+B(ay_2''+by_2'+cy_2)=A\cdot0+B\cdot0=0$.</p>`),
  T`<h3>The auxiliary equation</h3><p>Try $y=e^{mx}$. Then $y'=me^{mx}$, $y''=m^2e^{mx}$, so $(am^2+bm+c)e^{mx}=0$. Since $e^{mx}\ne0$:</p>$$am^2+bm+c=0.$$<p>The three cases depend on the discriminant $b^2-4ac$.</p>`,
  B.thm(T`Case 1: two real roots $\alpha\ne\beta$`, T`$$y=Ae^{\alpha x}+Be^{\beta x}$$`),
  B.ex(1, T`Solve $y''-y'-6y=0$.`, [T`$m^2-m-6=0\Rightarrow(m-3)(m+2)=0$.`, T`$y=Ae^{3x}+Be^{-2x}$.`]),
  B.thm(T`Case 2: repeated root $\alpha$`, T`$$y=(A+Bx)e^{\alpha x}$$`),
  B.proof(T`<p>We only get one exponential, $e^{\alpha x}$, so we need a second independent solution. Check $y=xe^{\alpha x}$: $y'=e^{\alpha x}(1+\alpha x)$, $y''=e^{\alpha x}(2\alpha+\alpha^2x)$. A repeated root means the equation is $y''-2\alpha y'+\alpha^2y=0$ (dividing by $a$). Substituting:</p>$$e^{\alpha x}\left[(2\alpha+\alpha^2x)-2\alpha(1+\alpha x)+\alpha^2x\right]=e^{\alpha x}\cdot0=0.\ ✓$$`, 'Why the extra x'),
  B.ex(2, T`Solve $y''+4y'+4y=0$.`, [T`$m^2+4m+4=(m+2)^2$, $m=-2$ repeated.`, T`$y=(A+Bx)e^{-2x}$.`]),
  B.thm(T`Case 3: complex roots $p\pm qi$`, T`$$y=e^{px}\left(A\cos qx+B\sin qx\right)$$`),
  B.proof(T`<p>Formally $y=Ce^{(p+qi)x}+De^{(p-qi)x}=e^{px}\left(Ce^{iqx}+De^{-iqx}\right)$. By Euler, $e^{\pm iqx}=\cos qx\pm i\sin qx$, so this is $e^{px}\left((C+D)\cos qx+i(C-D)\sin qx\right)$. Writing $A=C+D$, $B=i(C-D)$ (real for real solutions) gives the result.</p>`),
  B.ex(3, T`Solve $y''+2y'+5y=0$.`, [T`$m=\frac{-2\pm\sqrt{4-20}}2=-1\pm2i$.`, T`$y=e^{-x}(A\cos2x+B\sin2x)$.`]),
  B.ex(4, T`Solve $y''+9y=0$.`, [T`$m^2+9=0$, $m=\pm3i$ ($p=0$).`, T`$y=A\cos3x+B\sin3x$ — simple harmonic motion.`]),
  B.warn([T`Writing $Ae^{\alpha x}+Be^{\alpha x}$ for a repeated root (that's really just one constant).`, T`For complex roots, putting the imaginary part in the exponential: it goes in the cos/sin.`, T`Sign slip: roots of $m^2-5m+6$ are $+2,+3$.`]),
  B.checks([[T`$y''-4y=0$`, T`$Ae^{2x}+Be^{-2x}$ (or $C\cosh2x+D\sinh2x$).`], [T`$y''-6y'+9y=0$`, T`$(A+Bx)e^{3x}$.`], [T`$y''-2y'+10y=0$`, T`$e^x(A\cos3x+B\sin3x)$.`]]),
  B.examq(4, T`<p>Find the general solution of $2\dfrac{d^2y}{dx^2}+3\dfrac{dy}{dx}-2y=0$.</p>`, T`<p>$2m^2+3m-2=0$ <span class="mk">M1</span> $\Rightarrow(2m-1)(m+2)=0$, $m=\frac12,-2$ <span class="mk">A1</span>; $y=Ae^{x/2}+Be^{-2x}$ <span class="mk">A1 A1</span></p>`),
  B.key([T`Auxiliary equation $am^2+bm+c=0$.`, T`Distinct: $Ae^{\alpha x}+Be^{\beta x}$; repeated: $(A+Bx)e^{\alpha x}$; complex: $e^{px}(A\cos qx+B\sin qx)$.`]),
].join('');

BOOK.de3 = [
  B.why(T`<p>When there's a forcing term — $y''-y'-6y=12$ — the solution is the homogeneous family (the <b>complementary function</b>, CF) plus <b>one</b> solution of the full equation (a <b>particular integral</b>, PI). Then two conditions fix the two constants.</p>`),
  B.thm('Structure of the solution', T`$$y=\underbrace{y_c}_{\text{CF}}+\underbrace{y_p}_{\text{PI}}$$`),
  B.proof(T`<p>If $y_p$ is one solution of $ay''+by'+cy=f$ and $y$ is any other, then $y-y_p$ satisfies $a(y-y_p)''+\dots=f-f=0$ — the homogeneous equation. So $y-y_p$ is in the CF family, i.e. $y=y_c+y_p$.</p>`),
  T`<h3>Choosing the trial PI</h3><table class="tbl"><tr><th>$f(x)$</th><th>Try</th></tr>
<tr><td>constant $k$</td><td>$\lambda$</td></tr><tr><td>$ax+b$</td><td>$\lambda x+\mu$</td></tr><tr><td>$ax^2+bx+c$</td><td>$\lambda x^2+\mu x+\nu$</td></tr>
<tr><td>$ke^{px}$</td><td>$\lambda e^{px}$</td></tr><tr><td>$k\cos\omega x$ or $k\sin\omega x$</td><td>$\lambda\cos\omega x+\mu\sin\omega x$</td></tr></table>
<p><b>Golden rule:</b> if your trial (or part of it) is already in the CF, multiply the trial by $x$ (by $x^2$ if the CF root is repeated).</p>`,
  B.ex(1, T`Find a PI for $y''-y'-6y=6x+1$.`, [T`Try $y=\lambda x+\mu$: $y'=\lambda$, $y''=0$.`, T`$0-\lambda-6(\lambda x+\mu)=6x+1$.`, T`$x$: $-6\lambda=6\Rightarrow\lambda=-1$. Constant: $-\lambda-6\mu=1\Rightarrow\mu=0$.`, T`PI: $y=-x$.`]),
  B.ex(2, T`Find a PI for $y''-y'-6y=5e^{2x}$.`, [T`Try $\lambda e^{2x}$: $(4\lambda-2\lambda-6\lambda)e^{2x}=5e^{2x}\Rightarrow\lambda=-\frac54$.`]),
  B.ex(3, T`Find a PI for $y''+y=3\cos2x$.`, [T`Try $\lambda\cos2x+\mu\sin2x$: $y''=-4y$, so $y''+y=-3(\lambda\cos2x+\mu\sin2x)$.`, T`$-3\lambda=3$, $-3\mu=0$: PI $=-\cos2x$.`], T`Always include <b>both</b> cos and sin in the trial, even if $f$ has only one — with a $y'$ term they get mixed.`),
  B.ex(4, T`Find a PI for $y''-y'-6y=5e^{3x}$.`, [T`CF is $Ae^{3x}+Be^{-2x}$ — $e^{3x}$ is in it, so $\lambda e^{3x}$ would give $0$. Try $\lambda xe^{3x}$.`, T`$y'=\lambda e^{3x}(1+3x)$, $y''=\lambda e^{3x}(6+9x)$.`, T`$y''-y'-6y=\lambda e^{3x}\left[(6+9x)-(1+3x)-6x\right]=5\lambda e^{3x}$, so $\lambda=1$: PI $=xe^{3x}$.`]),
  B.ex(5, T`Resonance: find a PI for $y''+4y=\sin2x$.`, [T`CF $=A\cos2x+B\sin2x$ contains $\sin2x$. Try $x(\lambda\cos2x+\mu\sin2x)$.`, T`Working through gives $y=-\frac x4\cos2x$. Check: $y''=\sin2x+x\cos2x$, so $y''+4y=\sin2x$. ✓`, T`The amplitude grows like $x$: that's <b>resonance</b> (forcing at the natural frequency).`]),
  T`<h3>Initial conditions</h3><p>Apply them to the <b>full</b> general solution (CF + PI), never the CF alone.</p>`,
  B.ex(6, T`Solve $y''-y'-6y=12$, $y(0)=0$, $y'(0)=1$.`, [T`CF $Ae^{3x}+Be^{-2x}$; PI: $-6\lambda=12$, $\lambda=-2$.`, T`$y=Ae^{3x}+Be^{-2x}-2$.`, T`$y(0)=0$: $A+B=2$. $y'(0)=1$: $3A-2B=1$. So $A=1$, $B=1$.`, T`$y=e^{3x}+e^{-2x}-2$.`]),
  B.warn([T`Applying initial conditions before adding the PI.`, T`Trial PI already in the CF (gives $0=f$, a contradiction).`, T`Trying only $\lambda\cos\omega x$ when $f=\cos\omega x$ and the equation has a $y'$ term.`]),
  B.checks([[T`PI for $y''+3y'+2y=4$.`, T`$2$.`], [T`PI for $y''+3y'+2y=e^{-x}$.`, T`$e^{-x}$ is in the CF ($m=-1,-2$): try $\lambda xe^{-x}$; $\lambda=1$.`]]),
  B.examq(9, T`<p>Solve $\dfrac{d^2y}{dx^2}+2\dfrac{dy}{dx}+5y=10$ given $y=0$ and $\dfrac{dy}{dx}=0$ when $x=0$. Describe the behaviour of $y$ for large $x$.</p>`,
    T`<p>$m=-1\pm2i$ <span class="mk">M1</span>; CF $e^{-x}(A\cos2x+B\sin2x)$ <span class="mk">A1</span>; PI $y=2$ <span class="mk">B1</span></p>
<p>$y(0)=0$: $A+2=0$, $A=-2$ <span class="mk">M1 A1</span>. $y'=e^{-x}\left[(2B-A)\cos2x-(2A+B)\sin2x\right]$ <span class="mk">M1</span>; $y'(0)=2B-A=0$, $B=-1$ <span class="mk">A1</span></p>
<p>$y=2-e^{-x}(2\cos2x+\sin2x)$ <span class="mk">A1</span>; as $x\to\infty$, $e^{-x}\to0$ so $y\to2$ (oscillations die away) <span class="mk">B1</span></p>`),
  B.key([T`$y=$ CF $+$ PI.`, T`Trial PI from the table; multiply by $x$ if it clashes with the CF.`, T`Conditions go on the full solution.`]),
].join('');

BOOK.de4 = [
  B.why(T`<p>This chapter connects the algebra to motion. The three damping regimes, simple harmonic motion and resonance are exactly the three cases of the auxiliary equation from chapter 7.2.</p>`),
  T`<h3>Simple harmonic motion</h3><p>$\ddot x=-\omega^2x$ has $m=\pm i\omega$, so $x=A\cos\omega t+B\sin\omega t$. It can always be written as $x=R\cos(\omega t-\varphi)$, with $R=\sqrt{A^2+B^2}$ and $\tan\varphi=\frac BA$.</p>
<ul><li>Period $T=\frac{2\pi}\omega$ (the motion repeats when $\omega t$ increases by $2\pi$).</li><li>Amplitude $R$; from $x(0)=x_0$, $\dot x(0)=v_0$: $A=x_0$, $B=\frac{v_0}{\omega}$.</li></ul>`,
  T`<h3>Damping</h3><p>A spring with resistance: $m\ddot x+c\dot x+kx=0$. Auxiliary $mr^2+cr+k=0$.</p>
<table class="tbl"><tr><th>$c^2$ vs $4mk$</th><th>Roots</th><th>Motion</th></tr>
<tr><td>$c^2\gt4mk$</td><td>two negative reals</td><td><b>over-damped</b> — returns slowly, no oscillation</td></tr>
<tr><td>$c^2=4mk$</td><td>repeated negative</td><td><b>critically damped</b> — fastest return without oscillating</td></tr>
<tr><td>$c^2\lt4mk$</td><td>$-p\pm qi$</td><td><b>under-damped</b> — oscillates with decaying amplitude $e^{-pt}$</td></tr></table>`,
  B.ex(1, T`A particle satisfies $\ddot x+4\dot x+13x=0$, $x(0)=2$, $\dot x(0)=0$. Find $x(t)$ and describe the motion.`, [
    T`$r=-2\pm3i$: under-damped. $x=e^{-2t}(A\cos3t+B\sin3t)$.`,
    T`$x(0)=2\Rightarrow A=2$. $\dot x=e^{-2t}\left[(3B-2A)\cos3t-(3A+2B)\sin3t\right]$, so $\dot x(0)=3B-4=0\Rightarrow B=\frac43$.`,
    T`$x=e^{-2t}\left(2\cos3t+\tfrac43\sin3t\right)$: oscillations with period $\frac{2\pi}3$ inside an envelope decaying like $e^{-2t}$.`]),
  T`<h3>Forced motion and resonance</h3><p>$\ddot x+b\dot x+cx=F\cos\omega t$: the CF decays (if $b\gt0$) and the PI is the long-term <b>steady state</b>. If $b=0$ and $\omega^2=c$ the PI is $\frac{F}{2\omega}t\sin\omega t$, growing without bound — resonance. Try it in the oscillator sim.</p>`,
  B.checks([[T`$\ddot x+16x=0$, $x(0)=3$, $\dot x(0)=8$: amplitude and period?`, T`$x=3\cos4t+2\sin4t$, $R=\sqrt{13}$, $T=\frac\pi2$.`], [T`For which $c$ is $\ddot x+6\dot x+cx=0$ critically damped?`, T`$36=4c$, $c=9$.`]]),
  B.examq(7, T`<p>$\ddot x+6\dot x+9x=0$, with $x=1$ and $\dot x=0$ when $t=0$. (a) Find $x$ in terms of $t$. (b) Show that $x\gt0$ for all $t\ge0$ and state the type of damping.</p>`,
    T`<p>(a) $r=-3$ repeated <span class="mk">M1</span>; $x=(A+Bt)e^{-3t}$ <span class="mk">A1</span>; $A=1$; $\dot x=(B-3A-3Bt)e^{-3t}$, so $B=3$ <span class="mk">M1 A1</span>: $x=(1+3t)e^{-3t}$ <span class="mk">A1</span></p>
<p>(b) $1+3t\gt0$ and $e^{-3t}\gt0$ for $t\ge0$, so $x\gt0$ <span class="mk">B1</span>: critically damped (never overshoots) <span class="mk">B1</span></p>`),
  B.key([T`SHM: $x=R\cos(\omega t-\varphi)$, $T=\frac{2\pi}{\omega}$.`, T`Damping regime from the discriminant.`, T`Steady state = PI; resonance when forcing matches the natural frequency with no damping.`]),
].join('');

// Prerequisite / extension chapters reuse the summary notes with a short preface.
for (const id of ['mx1', 'mx2', 'mx3', 'mx4', 'vc1', 'vc2', 'vc3', 'cx4', 'ca4', 'sr3']) {
  if (!BOOK[id]) BOOK[id] = null; // filled from point notes at render time
}
