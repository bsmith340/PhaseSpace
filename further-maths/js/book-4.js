// BCSFM textbook, part 4: Further calculus.
'use strict';

BOOK.ca6 = [
  B.why(T`<p>You can't integrate $\dfrac{5x+1}{(x-1)(x+2)}$ directly — but split it into $\dfrac2{x-1}+\dfrac3{x+2}$ and each piece is a logarithm. That's the whole idea: <b>partial fractions turn hard rational integrals into standard ones</b>.</p>`),
  B.pre(T`<p>Partial fractions (chapter 2.1); $\int\frac{f'(x)}{f(x)}dx=\ln|f(x)|+c$; $\int\frac{1}{x^2+a^2}dx=\frac1a\arctan\frac xa+c$.</p>`),
  T`<h3>The building blocks</h3>
<table class="tbl"><tr><th>Piece</th><th>Integral</th></tr>
<tr><td>$\dfrac{A}{ax+b}$</td><td>$\dfrac Aa\ln|ax+b|$</td></tr>
<tr><td>$\dfrac{B}{(x-a)^2}$</td><td>$-\dfrac{B}{x-a}$ &nbsp;(power rule — not a log!)</td></tr>
<tr><td>$\dfrac{Bx}{x^2+k^2}$</td><td>$\dfrac B2\ln(x^2+k^2)$</td></tr>
<tr><td>$\dfrac{C}{x^2+k^2}$</td><td>$\dfrac Ck\arctan\dfrac xk$</td></tr></table>`,
  B.ex(1, T`Find the exact value of $\displaystyle\int_2^3\frac{dx}{x^2-1}$.`, [
    T`$\dfrac1{x^2-1}=\dfrac1{(x-1)(x+1)}=\dfrac12\left(\dfrac1{x-1}-\dfrac1{x+1}\right)$.`,
    T`$\dfrac12\Big[\ln|x-1|-\ln|x+1|\Big]_2^3=\dfrac12\left[\ln\dfrac{x-1}{x+1}\right]_2^3=\dfrac12\left(\ln\dfrac24-\ln\dfrac13\right)$.`,
    T`$=\dfrac12\ln\dfrac{1/2}{1/3}=\dfrac12\ln\dfrac32$.`]),
  B.ex(2, T`Evaluate $\displaystyle\int_1^2\frac{dx}{x(x+1)^2}$.`, [
    T`From chapter 2.1: $\dfrac1{x(x+1)^2}=\dfrac1x-\dfrac1{x+1}-\dfrac1{(x+1)^2}$.`,
    T`Integrate: $\left[\ln x-\ln(x+1)+\dfrac1{x+1}\right]_1^2$ (note $-\int(x+1)^{-2}dx=+(x+1)^{-1}$).`,
    T`$=\left(\ln2-\ln3+\frac13\right)-\left(0-\ln2+\frac12\right)=2\ln2-\ln3-\frac16=\ln\frac43-\frac16$.`]),
  B.ex(3, T`Evaluate $\displaystyle\int_2^3\frac{2x^2-x+3}{(x-1)(x^2+1)}dx$.`, [
    T`From chapter 2.1: $=\dfrac2{x-1}-\dfrac1{x^2+1}$.`,
    T`$\Big[2\ln(x-1)-\arctan x\Big]_2^3=2\ln2-\arctan3+\arctan2$.`]),
  B.ex(4, T`Find $\displaystyle\int\frac{x^2+3x+4}{(x+1)(x+2)}dx$.`, [T`Improper: $=1+\dfrac2{x+1}-\dfrac2{x+2}$.`, T`$=x+2\ln|x+1|-2\ln|x+2|+c=x+2\ln\left|\dfrac{x+1}{x+2}\right|+c$.`]),
  B.tip(T`<p><b>Modulus signs:</b> $\int\frac1x\,dx=\ln|x|$. On a definite integral where everything is positive you can drop them, but keep them in indefinite answers.</p>`),
  B.warn([T`Integrating $\frac{1}{(x+1)^2}$ as $\ln(x+1)^2$.`, T`$\int\frac{1}{2x+1}dx=\ln|2x+1|$ — missing the $\frac12$.`, T`Integrating across a point where the integrand is undefined (e.g. through $x=1$ for $\frac1{x-1}$) — that's an improper integral (chapter 6.4).`]),
  B.checks([[T`$\displaystyle\int_0^1\frac{3}{(x+1)(x+4)}dx$`, T`$\frac3{(x+1)(x+4)}=\frac1{x+1}-\frac1{x+4}$; $[\ln\frac{x+1}{x+4}]_0^1=\ln\frac25-\ln\frac14=\ln\frac85$.`], [T`$\displaystyle\int\frac{x}{(x+1)^2}dx$`, T`$\frac{1}{x+1}-\frac{1}{(x+1)^2}$: $\ln|x+1|+\frac{1}{x+1}+c$.`]]),
  B.examq(8, T`<p>(a) Express $\dfrac{x+5}{(x+1)(x+2)^2}$ in partial fractions. (b) Hence show that $\displaystyle\int_0^1\frac{x+5}{(x+1)(x+2)^2}dx=4\ln\frac43-\frac12$.</p>`,
    T`<p>(a) $x+5\equiv A(x+2)^2+B(x+1)(x+2)+C(x+1)$ <span class="mk">M1</span>; $A=4$, $C=-3$, $B=-4$ <span class="mk">A1 A1 A1</span></p>
<p>(b) $\left[4\ln(x+1)-4\ln(x+2)+\frac3{x+2}\right]_0^1$ <span class="mk">M1 A1</span> $=(4\ln2-4\ln3+1)-(-4\ln2+\frac32)=8\ln2-4\ln3-\frac12=4\ln\frac43-\frac12$ <span class="mk">M1 A1</span></p>`),
  B.key([T`Split with partial fractions, integrate each piece, combine logs.`, T`Repeated factor gives a non-log term; quadratic factor gives ln + arctan.`]),
].join('');

BOOK.ca7 = [
  B.why(T`<p>Integration by parts undoes the product rule. Some integrals need it <b>twice</b> — like $\int x^2e^x\,dx$, where each application knocks the power of $x$ down by one — and some come back to where they started, which is surprisingly useful.</p>`),
  B.thm('Integration by parts', T`$$\int u\frac{dv}{dx}\,dx=uv-\int v\frac{du}{dx}\,dx$$`),
  B.proof(T`<p>Product rule: $\frac d{dx}(uv)=u\frac{dv}{dx}+v\frac{du}{dx}$. Integrate both sides: $uv=\int u\frac{dv}{dx}dx+\int v\frac{du}{dx}dx$. Rearrange.</p>`, 'Derivation'),
  B.tip(T`<p><b>Choosing $u$ — LIATE</b>: pick $u$ as the first of <b>L</b>ogs, <b>I</b>nverse trig, <b>A</b>lgebraic (powers of $x$), <b>T</b>rig, <b>E</b>xponential. You want $u$ to get simpler when differentiated and $\frac{dv}{dx}$ to be easy to integrate.</p>`),
  B.ex(1, T`Find $\int x^2e^x\,dx$.`, [
    T`$u=x^2$, $v'=e^x$: $\int x^2e^xdx=x^2e^x-\int2xe^xdx$.`,
    T`Again, $u=2x$, $v'=e^x$: $\int2xe^xdx=2xe^x-\int2e^xdx=2xe^x-2e^x$.`,
    T`So $\int x^2e^xdx=x^2e^x-2xe^x+2e^x+c=e^x(x^2-2x+2)+c$.`,
    T`Check by differentiating: $e^x(x^2-2x+2)+e^x(2x-2)=x^2e^x$. ✓`]),
  B.ex(2, T`Find $\int x^2\sin x\,dx$.`, [
    T`$u=x^2$, $v'=\sin x$, $v=-\cos x$: $=-x^2\cos x+\int2x\cos x\,dx$.`,
    T`$\int2x\cos x\,dx=2x\sin x-\int2\sin x\,dx=2x\sin x+2\cos x$.`,
    T`Answer: $-x^2\cos x+2x\sin x+2\cos x+c$.`]),
  T`<h3>The tabular method</h3><p>For $\int(\text{polynomial})\times(\text{something you can integrate repeatedly})$: list derivatives of the polynomial down to $0$ in one column, repeated integrals in the other, multiply diagonally with alternating signs $+,-,+,\dots$</p>
<table class="tbl"><tr><th>sign</th><th>$D$ (differentiate $x^2$)</th><th>$I$ (integrate $\sin x$)</th></tr>
<tr><td>$+$</td><td>$x^2$</td><td>$\sin x$</td></tr><tr><td>$-$</td><td>$2x$</td><td>$-\cos x$</td></tr><tr><td>$+$</td><td>$2$</td><td>$-\sin x$</td></tr><tr><td></td><td>$0$</td><td>$\cos x$</td></tr></table>
<p>Diagonals: $+x^2(-\cos x)-2x(-\sin x)+2\cos x$ — the same answer as Example 2.</p>`,
  T`<h3>Cyclic integrals</h3>`,
  B.ex(3, T`Find $I=\int e^x\sin x\,dx$.`, [
    T`$u=\sin x$, $v'=e^x$: $I=e^x\sin x-\int e^x\cos x\,dx$.`,
    T`Again with $u=\cos x$: $\int e^x\cos x\,dx=e^x\cos x+\int e^x\sin x\,dx=e^x\cos x+I$.`,
    T`So $I=e^x\sin x-e^x\cos x-I$, i.e. $2I=e^x(\sin x-\cos x)$.`,
    T`$I=\frac12e^x(\sin x-\cos x)+c$.`], T`Keep the same "type" for $u$ both times (trig both times here). Switching makes you undo the first step.`),
  B.thm('General result', T`$$\int e^{ax}\cos bx\,dx=\frac{e^{ax}(a\cos bx+b\sin bx)}{a^2+b^2}+c,\qquad\int e^{ax}\sin bx\,dx=\frac{e^{ax}(a\sin bx-b\cos bx)}{a^2+b^2}+c$$`),
  T`<h3>Parts with a hidden "1"</h3>`,
  B.ex(4, T`Find $\int\ln x\,dx$ and $\int(\ln x)^2dx$.`, [
    T`$\int1\cdot\ln x\,dx$ with $u=\ln x$, $v'=1$: $x\ln x-\int x\cdot\frac1x\,dx=x\ln x-x+c$.`,
    T`$\int(\ln x)^2dx$: $u=(\ln x)^2$, $v'=1$: $x(\ln x)^2-\int2\ln x\,dx=x(\ln x)^2-2x\ln x+2x+c$.`]),
  B.ex(5, T`Find $\int\arctan x\,dx$.`, [T`$u=\arctan x$, $v'=1$: $x\arctan x-\int\frac{x}{1+x^2}dx=x\arctan x-\frac12\ln(1+x^2)+c$.`]),
  B.warn([T`Sign errors with $\int\sin x=-\cos x$.`, T`In cyclic integrals, swapping the choice of $u$ on the second application.`, T`Forgetting the final $+c$.`]),
  B.checks([[T`$\int_0^1x^2e^{2x}dx$`, T`$e^{2x}\left(\frac{x^2}2-\frac x2+\frac14\right)$; value $\frac14e^2-\frac14=\frac{e^2-1}{4}$.`], [T`$\int e^{2x}\cos x\,dx$`, T`$\frac{e^{2x}(2\cos x+\sin x)}{5}+c$.`]]),
  B.examq(6, T`<p>Show that $\displaystyle\int_0^{\pi}e^x\sin x\,dx=\frac12\left(e^{\pi}+1\right)$.</p>`,
    T`<p>Parts twice, obtaining $2I=[e^x(\sin x-\cos x)]$ <span class="mk">M1 M1 A1</span></p>
<p>$I=\frac12\left[e^x(\sin x-\cos x)\right]_0^\pi=\frac12\left(e^\pi(0+1)-(0-1)\right)$ <span class="mk">M1 A1</span> $=\frac12(e^\pi+1)$ <span class="mk">A1</span></p>`),
  B.key([T`Parts: $\int uv'=uv-\int vu'$; LIATE for $u$.`, T`Twice for $x^2\times$; tabular method; cyclic for $e^{ax}\sin/\cos$.`]),
].join('');

BOOK.ca3 = [
  B.why(T`<p>Working out $\int_0^{\pi/2}\sin^8x\,dx$ directly is grim. A <b>reduction formula</b> links the integral with power $n$ to one with power $n-2$ (or $n-1$). Apply it repeatedly and you slide down to an integral you can do in your head.</p>`),
  B.def('notation', T`<p>Write $I_n=\int(\dots)^n\,dx$ for a family of integrals indexed by $n$. A reduction formula expresses $I_n$ in terms of $I_{n-1}$ or $I_{n-2}$.</p>`),
  B.thm('Example A', T`$$I_n=\int_0^1x^ne^x\,dx\quad\Longrightarrow\quad I_n=e-nI_{n-1}\ (n\ge1),\qquad I_0=e-1.$$`),
  B.proof(T`<p>Parts with $u=x^n$, $v'=e^x$: $I_n=\left[x^ne^x\right]_0^1-\int_0^1nx^{n-1}e^xdx=e-nI_{n-1}$.</p>`),
  B.ex(1, T`Find $I_3=\int_0^1x^3e^x\,dx$.`, [T`$I_0=e-1$, $I_1=e-1(e-1)=1$.`, T`$I_2=e-2I_1=e-2$.`, T`$I_3=e-3I_2=e-3(e-2)=6-2e$.`]),
  B.thm("Example B — Wallis's formula", T`$$I_n=\int_0^{\pi/2}\sin^nx\,dx\quad\Longrightarrow\quad I_n=\frac{n-1}{n}I_{n-2}\ (n\ge2),\qquad I_0=\frac\pi2,\ I_1=1.$$`),
  B.proof(T`<p>Write $\sin^nx=\sin^{n-1}x\cdot\sin x$ and use parts with $u=\sin^{n-1}x$, $v'=\sin x$, so $v=-\cos x$, $u'=(n-1)\sin^{n-2}x\cos x$:</p>
$$I_n=\left[-\sin^{n-1}x\cos x\right]_0^{\pi/2}+(n-1)\int_0^{\pi/2}\sin^{n-2}x\cos^2x\,dx.$$
<p>The bracket is $0$ at both limits. Replace $\cos^2x=1-\sin^2x$:</p>
$$I_n=(n-1)\int_0^{\pi/2}\left(\sin^{n-2}x-\sin^nx\right)dx=(n-1)(I_{n-2}-I_n).$$
<p>Collect the $I_n$ terms: $nI_n=(n-1)I_{n-2}$.</p>`),
  B.ex(2, T`Find $\int_0^{\pi/2}\sin^6x\,dx$ and $\int_0^{\pi/2}\sin^5x\,dx$.`, [T`$I_6=\frac56\cdot\frac34\cdot\frac12\cdot I_0=\frac{15}{48}\cdot\frac\pi2=\frac{5\pi}{32}$.`, T`$I_5=\frac45\cdot\frac23\cdot I_1=\frac8{15}$.`]),
  B.thm('Example C', T`$$I_n=\int_0^{\pi/4}\tan^nx\,dx\quad\Longrightarrow\quad I_n=\frac1{n-1}-I_{n-2}\ (n\ge2).$$`),
  B.proof(T`<p>$\tan^nx=\tan^{n-2}x\,\tan^2x=\tan^{n-2}x(\sec^2x-1)$. So</p>$$I_n=\int_0^{\pi/4}\tan^{n-2}x\sec^2x\,dx-I_{n-2}=\left[\frac{\tan^{n-1}x}{n-1}\right]_0^{\pi/4}-I_{n-2}=\frac1{n-1}-I_{n-2}.$$<p>(The first integral is of the form $\int f^{n-2}f'$.)</p>`),
  B.ex(3, T`Find $\int_0^{\pi/4}\tan^4x\,dx$.`, [T`$I_0=\frac\pi4$, $I_2=1-I_0=1-\frac\pi4$.`, T`$I_4=\frac13-I_2=\frac\pi4-\frac23$.`]),
  B.thm('Example D', T`$$I_n=\int_0^{\pi/2}x^n\cos x\,dx\quad\Longrightarrow\quad I_n=\left(\frac\pi2\right)^n-n(n-1)I_{n-2}\ (n\ge2).$$`),
  B.proof(T`<p>Parts twice: $I_n=\left[x^n\sin x\right]_0^{\pi/2}-n\int x^{n-1}\sin x\,dx=\left(\frac\pi2\right)^n-n\left(\left[-x^{n-1}\cos x\right]_0^{\pi/2}+(n-1)\int x^{n-2}\cos x\,dx\right)$. The middle bracket is $0$ for $n\ge2$.</p>`),
  B.warn([T`Not evaluating the boundary term $[uv]$ — it's often zero, but you must show it.`, T`Stopping at $I_2$ instead of a genuinely simple $I_0$/$I_1$.`, T`Arithmetic: multiply the fractions carefully, keep $\pi$ separate.`]),
  B.exam([T`Proof part: show the parts step, the boundary evaluation, and the rearrangement. Then "hence" parts usually need two or three applications.`]),
  B.checks([[T`Find $\int_0^{\pi/2}\cos^4x\,dx$ (same formula works for cos).`, T`$\frac34\cdot\frac12\cdot\frac\pi2=\frac{3\pi}{16}$.`], [T`$I_n=\int_1^e(\ln x)^n dx$. Show $I_n=e-nI_{n-1}$.`, T`Parts with $u=(\ln x)^n$, $v'=1$: $[x(\ln x)^n]_1^e-\int x\cdot n(\ln x)^{n-1}\frac1x\,dx=e-nI_{n-1}$.`]]),
  B.examq(9, T`<p>$I_n=\displaystyle\int_0^1x^n\sqrt{1-x}\,dx$. (a) Show that $I_n=\dfrac{2n}{2n+3}I_{n-1}$ for $n\ge1$. (b) Hence find $I_2$ exactly.</p>`,
    T`<p>(a) $u=x^n$, $v'=(1-x)^{1/2}$, $v=-\frac23(1-x)^{3/2}$ <span class="mk">M1 A1</span></p>
<p>$I_n=\left[-\frac23x^n(1-x)^{3/2}\right]_0^1+\frac{2n}3\int_0^1x^{n-1}(1-x)^{3/2}dx$; bracket $=0$ <span class="mk">A1</span></p>
<p>$(1-x)^{3/2}=(1-x)(1-x)^{1/2}$, so the integral is $I_{n-1}-I_n$ <span class="mk">M1</span>: $I_n=\frac{2n}{3}(I_{n-1}-I_n)$ <span class="mk">A1</span> $\Rightarrow I_n=\frac{2n}{2n+3}I_{n-1}$ <span class="mk">A1</span></p>
<p>(b) $I_0=\frac23$ <span class="mk">B1</span>, $I_1=\frac25\cdot\frac23=\frac4{15}$, $I_2=\frac47\cdot\frac4{15}=\frac{16}{105}$ <span class="mk">M1 A1</span></p>`),
  B.key([T`Derive by parts (or a clever identity like $\tan^2=\sec^2-1$).`, T`Apply repeatedly down to $I_0$ or $I_1$.`, T`Wallis: $I_n=\frac{n-1}{n}I_{n-2}$ for $\sin^n$ or $\cos^n$ on $[0,\frac\pi2]$.`]),
].join('');

BOOK.ca5 = [
  B.why(T`<p>Can a region that stretches to infinity have finite area? Yes — $\int_1^\infty\frac{1}{x^2}dx=1$. <b>Improper integrals</b> make sense of infinite limits and infinite integrands by taking limits carefully.</p>`),
  B.def('improper integral', T`<p>An integral is improper if (1) a limit is $\pm\infty$, or (2) the integrand is unbounded at some point of the interval. Define it as a limit:</p>
$$\int_a^\infty f(x)\,dx=\lim_{t\to\infty}\int_a^tf(x)\,dx,\qquad\int_0^1f(x)\,dx=\lim_{t\to0^+}\int_t^1f(x)\,dx\ \ (f\text{ unbounded at }0).$$
<p>If the limit exists the integral <b>converges</b>; otherwise it <b>diverges</b>.</p>`),
  B.ex(1, T`Evaluate $\int_1^\infty\frac{dx}{x^2}$ and $\int_1^\infty\frac{dx}{x}$.`, [T`$\int_1^t x^{-2}dx=\left[-\frac1x\right]_1^t=1-\frac1t\to1$. Converges to $1$.`, T`$\int_1^t\frac1x\,dx=\ln t\to\infty$. Diverges.`]),
  B.thm('The p-test', T`$$\int_1^\infty\frac{dx}{x^p}\text{ converges}\iff p\gt1,\qquad\int_0^1\frac{dx}{x^p}\text{ converges}\iff p\lt1.$$`),
  B.proof(T`<p>For $p\ne1$: $\int_1^tx^{-p}dx=\frac{t^{1-p}-1}{1-p}$. As $t\to\infty$, $t^{1-p}\to0$ if $p\gt1$ (giving $\frac{1}{p-1}$) and $\to\infty$ if $p\lt1$. For $p=1$ we get $\ln t\to\infty$. The $\int_0^1$ case is the same with $t\to0^+$.</p>`),
  B.ex(2, T`Evaluate $\int_0^1\frac{dx}{\sqrt x}$.`, [T`$\lim_{t\to0^+}\left[2\sqrt x\right]_t^1=2-0=2$.`]),
  T`<h3>Limits you need</h3><p>$x^ke^{-x}\to0$ as $x\to\infty$ (exponentials beat powers), and $x^k\ln x\to0$ as $x\to0^+$ for $k\gt0$ (powers beat logs). Quote these.</p>`,
  B.ex(3, T`Evaluate $\int_0^\infty xe^{-x}\,dx$.`, [T`Parts: $\int_0^txe^{-x}dx=\left[-xe^{-x}\right]_0^t+\int_0^te^{-x}dx=-te^{-t}+1-e^{-t}$.`, T`As $t\to\infty$, $te^{-t}\to0$ and $e^{-t}\to0$: value $1$.`]),
  B.ex(4, T`Evaluate $\int_0^1\ln x\,dx$.`, [T`$\int_t^1\ln x\,dx=[x\ln x-x]_t^1=-1-t\ln t+t$.`, T`As $t\to0^+$, $t\ln t\to0$: value $-1$.`]),
  B.ex(5, T`Evaluate $\int_0^\infty\frac{dx}{(x+1)(x+2)}$.`, [T`Partial fractions: $\frac1{x+1}-\frac1{x+2}$, so $\int_0^t=\left[\ln\frac{x+1}{x+2}\right]_0^t=\ln\frac{t+1}{t+2}-\ln\frac12$.`, T`$\frac{t+1}{t+2}\to1$, so $\ln\to0$: value $\ln2$.`], T`Combine the logs <b>before</b> taking the limit — separately, $\ln(t+1)$ and $\ln(t+2)$ both diverge.`),
  B.tip(T`<p><b>Trap:</b> $\int_{-1}^1\frac{dx}{x^2}$ "=" $\left[-\frac1x\right]_{-1}^1=-2$ is nonsense — a positive function can't have negative area. The integrand blows up at $x=0$ inside the interval; split at $0$ and each half diverges.</p>`),
  T`<h3>Volumes of revolution</h3><p>Rotating $y=f(x)$, $a\le x\le b$, about the $x$-axis: each thin slice is a disc of volume $\pi y^2\,\delta x$, so</p>$$V=\pi\int_a^by^2\,dx.$$<p>About the $y$-axis: $V=\pi\int x^2\,dy$.</p>`,
  B.ex(6, T`Rotate $y=\frac1x$, $x\ge1$, about the $x$-axis. Find the volume.`, [T`$V=\pi\int_1^\infty\frac{dx}{x^2}=\pi$ — finite, even though the area under the curve, $\int_1^\infty\frac1x\,dx$, is infinite ("Gabriel's horn").`]),
  B.warn([T`Substituting $\infty$ as if it were a number. Write $\lim_{t\to\infty}$.`, T`Missing a singularity inside the interval.`, T`Taking limits of separate logs that each diverge.`]),
  B.checks([[T`$\int_0^\infty e^{-3x}dx$`, T`$\frac13$.`], [T`Does $\int_0^1\frac{dx}{x^2}$ converge?`, T`No ($p=2\ge1$).`], [T`$\int_0^\infty\frac{dx}{x^2+4}$`, T`$\frac12\cdot\frac\pi2=\frac\pi4$.`]]),
  B.examq(6, T`<p>Evaluate $\displaystyle\int_1^\infty\frac{2}{x(x+2)}\,dx$, showing the limiting process clearly.</p>`,
    T`<p>$\frac{2}{x(x+2)}=\frac1x-\frac1{x+2}$ <span class="mk">B1</span>; $\int_1^t=\left[\ln\frac{x}{x+2}\right]_1^t=\ln\frac t{t+2}-\ln\frac13$ <span class="mk">M1 A1</span></p>
<p>As $t\to\infty$, $\frac{t}{t+2}=\frac1{1+2/t}\to1$ <span class="mk">M1</span>, so value $=\ln3$ <span class="mk">A1 A1</span></p>`),
  B.key([T`Replace the problem limit by $t$; integrate; take the limit.`, T`p-test; $x^ke^{-x}\to0$; $x^k\ln x\to0$.`, T`$V=\pi\int y^2dx$.`]),
].join('');

BOOK.ca1 = [
  B.why(T`<p>$\arcsin x$ is the angle whose sine is $x$. Its derivative turns out to be algebraic — $\frac1{\sqrt{1-x^2}}$ — with no trig left. That's what produces the standard integrals in the next chapter.</p>`),
  B.def('inverse trig functions', T`<ul><li>$\arcsin:[-1,1]\to\left[-\frac\pi2,\frac\pi2\right]$</li><li>$\arccos:[-1,1]\to[0,\pi]$</li><li>$\arctan:\mathbb R\to\left(-\frac\pi2,\frac\pi2\right)$</li></ul><p>The ranges are chosen to make each function one-to-one.</p>`),
  B.thm('Derivatives', T`$$\frac{d}{dx}\arcsin x=\frac1{\sqrt{1-x^2}},\qquad\frac{d}{dx}\arccos x=-\frac1{\sqrt{1-x^2}},\qquad\frac{d}{dx}\arctan x=\frac1{1+x^2}$$`),
  B.proof(T`<p><b>arcsin</b>: $y=\arcsin x\Rightarrow\sin y=x\Rightarrow\cos y\,\frac{dy}{dx}=1$. On $\left[-\frac\pi2,\frac\pi2\right]$, $\cos y\ge0$, so $\cos y=+\sqrt{1-\sin^2y}=\sqrt{1-x^2}$.</p>
<p><b>arccos</b>: $\cos y=x\Rightarrow-\sin y\,y'=1$; on $[0,\pi]$, $\sin y\ge0$, so $\sin y=\sqrt{1-x^2}$.</p>
<p><b>arctan</b>: $\tan y=x\Rightarrow\sec^2y\,y'=1\Rightarrow y'=\frac1{1+\tan^2y}=\frac1{1+x^2}$.</p>`),
  B.thm('With a constant', T`$$\frac{d}{dx}\arcsin\frac xa=\frac1{\sqrt{a^2-x^2}},\qquad\frac{d}{dx}\arctan\frac xa=\frac{a}{a^2+x^2}$$`),
  B.ex(1, T`Differentiate (a) $\arcsin2x$ (b) $\arctan(x^2)$ (c) $x\arcsin x$.`, [T`(a) $\frac{2}{\sqrt{1-4x^2}}$.`, T`(b) $\frac{2x}{1+x^4}$.`, T`(c) $\arcsin x+\frac{x}{\sqrt{1-x^2}}$.`]),
  B.ex(2, T`Show that $\arctan x+\arctan\frac1x$ is constant for $x\gt0$, and find the constant.`, [T`$\frac d{dx}\arctan\frac1x=\frac{-1/x^2}{1+1/x^2}=\frac{-1}{x^2+1}$.`, T`So the derivative of the sum is $0$: constant. At $x=1$: $\frac\pi4+\frac\pi4=\frac\pi2$.`]),
  B.warn([T`$\frac{d}{dx}\arcsin x=\frac{1}{\sqrt{1+x^2}}$ — that's arsinh.`, T`Missing the chain-rule factor.`]),
  B.checks([[T`$\frac d{dx}\arccos(3x)$`, T`$-\frac{3}{\sqrt{1-9x^2}}$.`], [T`$\frac d{dx}\arctan(e^x)$ at $x=0$`, T`$\frac{e^x}{1+e^{2x}}=\frac12$.`]]),
  B.examq(5, T`<p>$y=\arctan\dfrac{1+x}{1-x}$. Show that $\dfrac{dy}{dx}=\dfrac1{1+x^2}$ and interpret this result.</p>`,
    T`<p>$u=\frac{1+x}{1-x}$, $u'=\frac{(1-x)+(1+x)}{(1-x)^2}=\frac2{(1-x)^2}$ <span class="mk">M1 A1</span></p>
<p>$1+u^2=\frac{(1-x)^2+(1+x)^2}{(1-x)^2}=\frac{2+2x^2}{(1-x)^2}$ <span class="mk">A1</span>; $y'=\frac{u'}{1+u^2}=\frac{1}{1+x^2}$ <span class="mk">A1</span></p>
<p>So $y-\arctan x$ is constant (on $x\lt1$); at $x=0$, $y=\frac\pi4$: $y=\arctan x+\frac\pi4$ <span class="mk">B1</span></p>`),
  B.key([T`Implicit differentiation + choose the correct sign of the root from the range.`]),
].join('');

BOOK.ca2 = [
  B.why(T`<p>Four integrals appear over and over — $\int\frac{1}{a^2+x^2}$, $\int\frac{1}{\sqrt{a^2-x^2}}$, $\int\frac1{\sqrt{x^2+a^2}}$, $\int\frac1{\sqrt{x^2-a^2}}$. Each comes from a substitution that turns the root or the sum of squares into a single trig or hyperbolic function.</p>`),
  B.thm('Standard integrals', T`$$\begin{aligned}\int\frac{dx}{a^2+x^2}&=\frac1a\arctan\frac xa+c &\qquad \int\frac{dx}{\sqrt{a^2-x^2}}&=\arcsin\frac xa+c\\ \int\frac{dx}{\sqrt{x^2+a^2}}&=\operatorname{arsinh}\frac xa+c &\qquad \int\frac{dx}{\sqrt{x^2-a^2}}&=\operatorname{arcosh}\frac xa+c\end{aligned}$$`),
  B.proof(T`<p><b>arctan</b>: $x=a\tan\theta$, $dx=a\sec^2\theta\,d\theta$, $a^2+x^2=a^2\sec^2\theta$: $\int\frac{a\sec^2\theta}{a^2\sec^2\theta}d\theta=\frac\theta a$.</p>
<p><b>arcsin</b>: $x=a\sin\theta$, $dx=a\cos\theta\,d\theta$, $\sqrt{a^2-x^2}=a\cos\theta$: $\int d\theta=\theta$.</p>
<p><b>arsinh / arcosh</b>: $x=a\sinh u$ / $x=a\cosh u$ — see chapter 5.4.</p>`),
  T`<h3>Technique 1 — completing the square</h3>`,
  B.ex(1, T`Find $\displaystyle\int\frac{dx}{x^2+4x+13}$.`, [T`$x^2+4x+13=(x+2)^2+9$.`, T`With $u=x+2$: $\int\frac{du}{u^2+9}=\frac13\arctan\frac{x+2}3+c$.`]),
  B.ex(2, T`Find $\displaystyle\int\frac{dx}{\sqrt{5+4x-x^2}}$.`, [T`$5+4x-x^2=9-(x-2)^2$.`, T`$=\arcsin\frac{x-2}{3}+c$.`]),
  T`<h3>Technique 2 — a coefficient on $x^2$</h3>`,
  B.ex(3, T`Find $\displaystyle\int\frac{dx}{9+4x^2}$.`, [T`$9+4x^2=9+(2x)^2$; with $u=2x$, $dx=\frac12du$.`, T`$\frac12\cdot\frac13\arctan\frac{2x}3=\frac16\arctan\frac{2x}{3}+c$.`]),
  T`<h3>Technique 3 — split the numerator</h3><p>Write the numerator as (multiple of the derivative of the denominator) + (constant): the first part gives a log, the second an arctan.</p>`,
  B.ex(4, T`Find $\displaystyle\int\frac{2x+5}{x^2+2x+5}dx$.`, [T`Derivative of the denominator is $2x+2$, so $2x+5=(2x+2)+3$.`, T`$\int\frac{2x+2}{x^2+2x+5}dx=\ln(x^2+2x+5)$.`, T`$\int\frac{3}{(x+1)^2+4}dx=\frac32\arctan\frac{x+1}2$.`, T`Answer: $\ln(x^2+2x+5)+\frac32\arctan\frac{x+1}2+c$.`]),
  B.warn([T`$\int\frac{1}{4+x^2}dx=\arctan\frac x2$ — missing the $\frac12$.`, T`Confusing $\sqrt{a^2-x^2}$ (arcsin) with $\sqrt{x^2-a^2}$ (arcosh).`]),
  B.checks([[T`$\int_0^{3}\frac{dx}{\sqrt{9-x^2}}$`, T`$\arcsin1=\frac\pi2$ (improper at $x=3$ but converges).`], [T`$\int\frac{dx}{\sqrt{x^2+6x+10}}$`, T`$\operatorname{arsinh}(x+3)+c$.`]]),
  B.examq(5, T`<p>Show that $\displaystyle\int_1^2\frac{dx}{\sqrt{x^2-2x+2}}=\ln\left(1+\sqrt2\right)$.</p>`,
    T`<p>$x^2-2x+2=(x-1)^2+1$ <span class="mk">M1</span>; $\left[\operatorname{arsinh}(x-1)\right]_1^2$ <span class="mk">A1</span> $=\operatorname{arsinh}1-0$ <span class="mk">A1</span> $=\ln(1+\sqrt2)$ <span class="mk">M1 A1</span></p>`),
  B.key([T`Four standard forms; complete the square; split numerators.`]),
].join('');
