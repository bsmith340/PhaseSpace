// BCSFM textbook — Maths AS 1, part 1: Proof; Algebra & functions; Straight lines.
// Same chapter shape as the Further Maths book: big picture → definitions → theory with proofs → worked examples → mistakes → exam technique → check yourself → exam-style question.
'use strict';

/* ===================================================================== */
BOOK.m_proof = [
  B.why(T`<p>In everyday life "true" means "it worked every time I tried". In mathematics a statement is only true once it is <b>proved for every case it claims to cover</b>. At AS you need three tools: <b>proof by deduction</b> (a chain of logical steps from known facts), <b>proof by exhaustion</b> (split into finitely many cases and check each one), and <b>disproof by counter-example</b> (one case where it fails).</p>`),
  B.pre(T`<p>Algebra you will lean on: an <b>even</b> integer can be written $2k$, an <b>odd</b> integer $2k+1$ (with $k$ an integer); consecutive integers are $n,\ n+1,\ n+2$; a multiple of $m$ is $mk$. Completing the square is the main tool for "show that … is always positive".</p>`),
  B.def('notation', T`<ul><li>$P\Rightarrow Q$: "if $P$ then $Q$" ($P$ implies $Q$).</li><li>$P\Leftarrow Q$: $Q$ implies $P$.</li><li>$P\iff Q$: each implies the other ("if and only if").</li><li>$\therefore$ "therefore"; $\in$ "is a member of"; $\mathbb Z$ integers, $\mathbb R$ real numbers.</li></ul>`),
  T`<h3>1. Proof by deduction</h3>
<p>Start from definitions or known results and move forward one justified step at a time until you reach the statement. Every step must be valid for <i>all</i> the cases at once, which is why we use letters ($n$, $k$, $a$, $b$) rather than numbers.</p>`,
  B.ex(1, T`Prove that the sum of any two odd numbers is even.`, [
    T`Let the odd numbers be $2a+1$ and $2b+1$, where $a,b\in\mathbb Z$. (Use <i>different</i> letters — they need not be equal.)`,
    T`Sum $=(2a+1)+(2b+1)=2a+2b+2=2(a+b+1)$.`,
    T`$a+b+1$ is an integer, so the sum is $2\times$ (an integer), which is even. $\blacksquare$`]),
  B.ex(2, T`Prove that the difference between the squares of two consecutive odd numbers is a multiple of $8$.`, [
    T`Let the consecutive odd numbers be $2n-1$ and $2n+1$, $n\in\mathbb Z$.`,
    T`$(2n+1)^2-(2n-1)^2=(4n^2+4n+1)-(4n^2-4n+1)=8n$.`,
    T`$8n$ is a multiple of $8$ for every integer $n$. $\blacksquare$`], T`Faster: difference of two squares, $(2n+1-(2n-1))(2n+1+2n-1)=2\cdot4n=8n$.`),
  B.ex(3, T`Prove that $n^3-n$ is divisible by $6$ for every integer $n$.`, [
    T`Factorise: $n^3-n=n(n^2-1)=(n-1)\,n\,(n+1)$ — the product of three <b>consecutive</b> integers.`,
    T`Among any two consecutive integers one is even, so the product is divisible by $2$.`,
    T`Among any three consecutive integers one is a multiple of $3$, so the product is divisible by $3$.`,
    T`Divisible by both $2$ and $3$ (which share no factor) $\Rightarrow$ divisible by $6$. $\blacksquare$`]),
  B.ex(4, T`Prove that $x^2-6x+10\gt0$ for all real $x$.`, [
    T`Complete the square: $x^2-6x+10=(x-3)^2-9+10=(x-3)^2+1$.`,
    T`$(x-3)^2\ge0$ for all real $x$ (a square is never negative).`,
    T`So $(x-3)^2+1\ge1\gt0$. $\blacksquare$`], T`This "complete the square, then a square is $\ge0$" argument is the standard way to prove an expression is always positive.`),
  B.thm('AM–GM for two numbers', T`<p>For $a,b\ge0$: $\dfrac{a+b}{2}\ge\sqrt{ab}$, with equality only when $a=b$.</p>`),
  B.proof(T`<p>$\left(\sqrt a-\sqrt b\right)^2\ge0$ because it is a square. Expanding, $a-2\sqrt{ab}+b\ge0$, so $a+b\ge2\sqrt{ab}$; divide by $2$. Equality needs $\sqrt a-\sqrt b=0$, i.e. $a=b$.</p>`),
  B.tip(T`<p>Notice the direction of that proof: it <b>starts from something certainly true</b> ($(\sqrt a-\sqrt b)^2\ge0$) and works forward to the result. If you discover a proof by working backwards from the result, rewrite it forwards — or make sure every step is reversible ($\iff$).</p>`),
  T`<h3>2. Proof by exhaustion</h3>
<p>Split <i>all</i> possibilities into a finite number of cases, then prove the statement in each. The cases must cover everything: even/odd, remainders $0,1,2$ on division by $3$, last digits $0$–$9$, or a short list of values.</p>`,
  B.ex(5, T`Prove that every square number is either a multiple of $4$ or one more than a multiple of $4$.`, [
    T`Every integer $n$ is even or odd. <b>Case 1</b>, $n=2k$: $n^2=4k^2$, a multiple of $4$.`,
    T`<b>Case 2</b>, $n=2k+1$: $n^2=4k^2+4k+1=4(k^2+k)+1$, one more than a multiple of $4$.`,
    T`The two cases cover every integer, so the result holds for all square numbers. $\blacksquare$`]),
  B.ex(6, T`Prove that no square number ends in the digit $7$.`, [
    T`The last digit of $n^2$ depends only on the last digit of $n$. Check all ten cases:`,
    T`$0^2\to0,\ 1^2\to1,\ 2^2\to4,\ 3^2\to9,\ 4^2\to6,\ 5^2\to5,\ 6^2\to6,\ 7^2\to9,\ 8^2\to4,\ 9^2\to1$.`,
    T`The possible last digits are $0,1,4,5,6,9$ — never $7$. $\blacksquare$`]),
  T`<h3>3. Disproof by counter-example</h3>
<p>To show a claim "for all …" is <b>false</b>, one specific case where it fails is enough. Give the actual numbers and show the failure clearly.</p>`,
  B.ex(7, T`Disprove: "if $a\gt b$ then $a^2\gt b^2$".`, [
    T`Take $a=1$, $b=-2$. Then $a\gt b$ is true.`,
    T`But $a^2=1$ and $b^2=4$, so $a^2\lt b^2$. The statement is false. $\blacksquare$`]),
  B.ex(8, T`Disprove: "$n^2+n+41$ is prime for every positive integer $n$".`, [
    T`It is prime for $n=1,2,\dots,39$, but take $n=40$:`,
    T`$40^2+40+41=40(40+1)+41=41\times40+41=41\times41$, which is not prime. $\blacksquare$`], T`39 successes proved nothing. This is why checking examples is never a proof.`),
  B.warn([
    T`Checking a few numbers and writing "so it's true". Examples can only <i>disprove</i>, never prove a "for all" statement.`,
    T`Using the same letter for two different numbers, e.g. calling two odd numbers $2n+1$ and $2n+1$ (that proves it only for equal numbers).`,
    T`Starting from the statement to be proved and deducing something true — that is circular unless each step is reversible.`,
    T`In exhaustion, missing a case (e.g. forgetting $n=0$ or negative values when the claim is about all integers).`,
    T`A counter-example that isn't shown to fail: always compute both sides.`]),
  B.exam([
    T`Finish with a concluding sentence that repeats the claim: "… hence $n^3-n$ is divisible by $6$ for all integers $n$." It is often worth a mark.`,
    T`Define your letters at the start ("let $n\in\mathbb Z$").`,
    T`"Show that" means every step must be visible: don't skip from the expression to the conclusion.`]),
  B.checks([
    [T`Prove that the sum of three consecutive integers is a multiple of $3$.`, T`$n+(n+1)+(n+2)=3n+3=3(n+1)$, and $n+1\in\mathbb Z$.`],
    [T`Disprove: "$2^n-1$ is prime for every prime $n$".`, T`$n=11$: $2^{11}-1=2047=23\times89$. (Any explicit failing case is fine.)`],
    [T`Prove that $n^2+n$ is even for every integer $n$.`, T`$n^2+n=n(n+1)$, a product of consecutive integers, one of which is even. (Or exhaustion: $n$ even / $n$ odd.)`]]),
  B.examq(7, T`<p>(a) Prove that the sum of the squares of any two consecutive integers is odd. <span class="mk">[3]</span></p><p>(b) Disprove the statement "$2^n+1$ is prime for every positive integer $n$". <span class="mk">[2]</span></p><p>(c) Prove by exhaustion that $n^2-n+1$ is odd for every integer $n$. <span class="mk">[2]</span></p>`,
    T`<p>(a) Let the integers be $n$ and $n+1$. <span class="mk">M1</span> $n^2+(n+1)^2=2n^2+2n+1=2(n^2+n)+1$ <span class="mk">M1</span>, which is $2\times$ integer $+1$, so odd. <span class="mk">A1</span></p>
<p>(b) $n=3$: $2^3+1=9=3\times3$ <span class="mk">M1</span>, not prime, so the statement is false. <span class="mk">A1</span></p>
<p>(c) $n=2k$: $4k^2-2k+1=2(2k^2-k)+1$, odd. $n=2k+1$: $4k^2+4k+1-2k-1+1=2(2k^2+k)+1$, odd. <span class="mk">M1</span> Every integer is even or odd, so true for all $n$. <span class="mk">A1</span></p>`),
  B.key([T`Deduction: letters, not numbers; one justified step at a time.`, T`Exhaustion: finite list of cases that covers everything.`, T`Counter-example: one explicit failing case disproves a "for all" claim.`, T`"Always positive": complete the square, then use (square) $\ge0$.`]),
].join('');

/* ===================================================================== */
BOOK.m_ind = [
  B.why(T`<p>Indices and surds are the grammar of the whole course. Before you can differentiate $\dfrac{3}{\sqrt x}$ you must rewrite it as $3x^{-1/2}$; before you can give an exact length you must simplify $\sqrt{72}$ to $6\sqrt2$. Nearly every AS 1 question contains a step like this.</p>`),
  T`<h3>1. The laws of indices — and why they are true</h3>
<p>For a positive whole number $m$, $a^m$ means $a\times a\times\dots\times a$ ($m$ factors). Counting factors gives the first three laws immediately:</p>`,
  B.thm('Laws of indices', T`$$a^m\times a^n=a^{m+n},\qquad \frac{a^m}{a^n}=a^{m-n},\qquad (a^m)^n=a^{mn},\qquad (ab)^n=a^nb^n.$$`),
  T`<p>We then <b>define</b> zero, negative and fractional powers so that these laws keep working:</p>`,
  B.proof(T`<ul><li><b>Zero:</b> $\dfrac{a^n}{a^n}=1$, but the division law gives $a^{n-n}=a^0$. So $a^0=1$ ($a\ne0$).</li>
<li><b>Negative:</b> $a^{-n}\times a^n=a^0=1$, so $a^{-n}=\dfrac1{a^n}$.</li>
<li><b>Unit fraction:</b> $\left(a^{1/n}\right)^n=a^{n/n}=a$, so $a^{1/n}$ is the number whose $n$th power is $a$: $a^{1/n}=\sqrt[n]a$.</li>
<li><b>General fraction:</b> $a^{m/n}=\left(a^{1/n}\right)^m=\left(\sqrt[n]a\right)^m$ (or $\sqrt[n]{a^m}$ — the root first is usually easier).</li></ul>`, 'Where the other rules come from'),
  B.ex(1, T`Evaluate $27^{-2/3}$ without a calculator.`, [
    T`Negative power $\Rightarrow$ reciprocal: $27^{-2/3}=\dfrac{1}{27^{2/3}}$.`,
    T`Denominator: root first, $27^{1/3}=3$, then square: $3^2=9$.`,
    T`$27^{-2/3}=\dfrac19$.`]),
  B.ex(2, T`Simplify $\dfrac{(4x^3)^{1/2}\times 6x^{-1}}{3x^{1/2}}$.`, [
    T`$(4x^3)^{1/2}=4^{1/2}x^{3/2}=2x^{3/2}$ — the power applies to <i>both</i> factors.`,
    T`Numerator $=2x^{3/2}\times6x^{-1}=12x^{1/2}$.`,
    T`Divide: $\dfrac{12x^{1/2}}{3x^{1/2}}=4$.`]),
  B.ex(3, T`Write $\dfrac{x^2+3}{\sqrt x}$ in the form $x^p+3x^q$.`, [
    T`Split the fraction: $\dfrac{x^2}{x^{1/2}}+\dfrac{3}{x^{1/2}}$.`,
    T`$=x^{2-1/2}+3x^{-1/2}=x^{3/2}+3x^{-1/2}$, so $p=\tfrac32$, $q=-\tfrac12$.`], T`This is exactly the preparation you need before differentiating or integrating.`),
  B.ex(4, T`Solve $2^{x+1}=8^{x-1}$.`, [
    T`Write both sides with the same base: $8=2^3$, so $8^{x-1}=2^{3(x-1)}=2^{3x-3}$.`,
    T`Equal powers of the same base $\Rightarrow$ equal indices: $x+1=3x-3$.`,
    T`$x=2$. Check: $2^3=8=8^1$ ✓.`]),
  B.ex(5, T`Solve $9^x-4\cdot3^x+3=0$.`, [
    T`$9^x=(3^2)^x=(3^x)^2$. Let $y=3^x$: $y^2-4y+3=0$.`,
    T`$(y-1)(y-3)=0\Rightarrow 3^x=1$ or $3^x=3$.`,
    T`$x=0$ or $x=1$.`], T`A "hidden quadratic": spot that one power is the square of another.`),
  T`<h3>2. Surds</h3>
<p>A <b>surd</b> is an irrational root such as $\sqrt2$ or $\sqrt[3]5$. Leaving answers in surd form keeps them exact. For $a,b\gt0$:</p>`,
  B.thm('Surd rules', T`$$\sqrt{ab}=\sqrt a\,\sqrt b,\qquad \sqrt{\frac ab}=\frac{\sqrt a}{\sqrt b},\qquad (\sqrt a)^2=a,\qquad (a+\sqrt b)(a-\sqrt b)=a^2-b.$$`),
  B.proof(T`<p>$(\sqrt a\sqrt b)^2=(\sqrt a)^2(\sqrt b)^2=ab$ and $\sqrt a\sqrt b\gt0$, so $\sqrt a\sqrt b$ is the positive square root of $ab$. The last rule is the difference of two squares: $(a+\sqrt b)(a-\sqrt b)=a^2-(\sqrt b)^2=a^2-b$.</p>`),
  T`<p><b>Simplify</b> by pulling out the largest square factor: $\sqrt{72}=\sqrt{36\times2}=6\sqrt2$.<br><b>Rationalise</b> a denominator (remove the surd from it): for $\dfrac{1}{\sqrt a}$ multiply top and bottom by $\sqrt a$; for $\dfrac{1}{a+\sqrt b}$ multiply by the <b>conjugate</b> $a-\sqrt b$.</p>`,
  B.ex(6, T`Simplify $\sqrt{50}+\sqrt{18}-\sqrt8$.`, [
    T`$\sqrt{50}=5\sqrt2$, $\sqrt{18}=3\sqrt2$, $\sqrt8=2\sqrt2$.`,
    T`Total $=(5+3-2)\sqrt2=6\sqrt2$.`]),
  B.ex(7, T`Express $\dfrac{3+\sqrt2}{3-\sqrt2}$ in the form $\dfrac{a+b\sqrt2}{c}$.`, [
    T`Multiply top and bottom by the conjugate $3+\sqrt2$.`,
    T`Denominator: $(3-\sqrt2)(3+\sqrt2)=9-2=7$.`,
    T`Numerator: $(3+\sqrt2)^2=9+6\sqrt2+2=11+6\sqrt2$.`,
    T`Answer $\dfrac{11+6\sqrt2}{7}$.`]),
  B.warn([
    T`$\sqrt{a+b}\ne\sqrt a+\sqrt b$ (try $\sqrt{9+16}=5\ne7$).`,
    T`$2x^{-1}=\dfrac2x$, not $\dfrac1{2x}$ — the index belongs only to $x$.`,
    T`A negative index does not make the number negative: $2^{-3}=\tfrac18$.`,
    T`$(4x^3)^{1/2}=2x^{3/2}$: apply the power to the number as well.`,
    T`Multiplying only the denominator by the conjugate. Top and bottom, always.`]),
  B.exam([
    T`"Without a calculator" / "exact" means show the index or surd work; a decimal answer scores nothing.`,
    T`Before any calculus, rewrite every term as $ax^n$ — this is where most method marks start.`,
    T`State the final form asked for (e.g. "$a+b\sqrt3$ where $a,b$ are integers") and check $a$, $b$ really are integers.`]),
  B.checks([
    [T`Evaluate $16^{3/4}$.`, T`$16^{1/4}=2$, $2^3=8$.`],
    [T`Rationalise $\dfrac{6}{\sqrt3}$.`, T`$\dfrac{6\sqrt3}{3}=2\sqrt3$.`],
    [T`Solve $4^x=32$.`, T`$2^{2x}=2^5\Rightarrow x=\tfrac52$.`]]),
  B.examq(7, T`<p>(a) Find the exact value of $8^{2/3}+25^{-1/2}$. <span class="mk">[2]</span></p><p>(b) Express $\dfrac{5-\sqrt3}{2+\sqrt3}$ in the form $a+b\sqrt3$, where $a$ and $b$ are integers. <span class="mk">[3]</span></p><p>(c) Solve $3^{2x+1}=27^{x-2}$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $8^{2/3}=(\sqrt[3]8)^2=4$, $25^{-1/2}=\tfrac15$ <span class="mk">M1</span>; total $\tfrac{21}{5}$. <span class="mk">A1</span></p>
<p>(b) $\times\dfrac{2-\sqrt3}{2-\sqrt3}$ <span class="mk">M1</span>; denominator $4-3=1$; numerator $10-5\sqrt3-2\sqrt3+3$ <span class="mk">M1</span> $=13-7\sqrt3$. <span class="mk">A1</span></p>
<p>(c) $27^{x-2}=3^{3x-6}$ <span class="mk">M1</span>, so $2x+1=3x-6$, $x=7$. <span class="mk">A1</span></p>`),
  B.key([T`$a^0=1$, $a^{-n}=1/a^n$, $a^{m/n}=(\sqrt[n]a)^m$.`, T`$\sqrt{ab}=\sqrt a\sqrt b$; simplify using the largest square factor.`, T`Rationalise with the conjugate: $(a+\sqrt b)(a-\sqrt b)=a^2-b$.`, T`Same base $\Rightarrow$ equate indices; "hidden quadratic" when one power is the square of another.`]),
].join('');

/* ===================================================================== */
BOOK.m_quad = [
  B.why(T`<p>The quadratic $ax^2+bx+c$ is the first function whose graph bends. Three questions come up again and again: <b>where is the turning point?</b> (completing the square), <b>where does it cross the axis?</b> (factorising / the formula), and <b>how many roots are there?</b> (the discriminant). The discriminant in particular reappears in simultaneous equations, tangents and circles.</p>`),
  T`<h3>1. Completing the square</h3>
<p>The identity $(x+p)^2=x^2+2px+p^2$ means $x^2+2px=(x+p)^2-p^2$: <b>halve the coefficient of $x$, square-bracket it, subtract its square.</b></p>`,
  B.thm('Completed-square form', T`$$ax^2+bx+c=a\left(x+\frac{b}{2a}\right)^2+c-\frac{b^2}{4a}.$$<p>So the turning point (vertex) is $\left(-\dfrac{b}{2a},\ c-\dfrac{b^2}{4a}\right)$; it is a minimum if $a\gt0$ and a maximum if $a\lt0$. The line of symmetry is $x=-\dfrac b{2a}$.</p>`),
  B.proof(T`<p>$ax^2+bx+c=a\left(x^2+\dfrac bax\right)+c=a\left[\left(x+\dfrac b{2a}\right)^2-\dfrac{b^2}{4a^2}\right]+c=a\left(x+\dfrac b{2a}\right)^2-\dfrac{b^2}{4a}+c.$</p>
<p>The squared bracket is $\ge0$ and equals $0$ only at $x=-\frac b{2a}$, which gives the vertex.</p>`),
  B.ex(1, T`Write $2x^2-12x+7$ in the form $a(x+p)^2+q$ and state the minimum point.`, [
    T`Take out the $2$ from the $x$ terms only: $2(x^2-6x)+7$.`,
    T`$x^2-6x=(x-3)^2-9$, so $2[(x-3)^2-9]+7=2(x-3)^2-18+7$.`,
    T`$=2(x-3)^2-11$. Minimum point $(3,-11)$.`], T`The $-9$ is multiplied by the $2$ — the most common slip.`),
  T`<h3>2. The quadratic formula</h3>`,
  B.thm('Quadratic formula', T`<p>The roots of $ax^2+bx+c=0$ ($a\ne0$) are $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}.$$</p>`),
  B.proof(T`<p>From the completed-square form, $ax^2+bx+c=0\iff a\left(x+\frac b{2a}\right)^2=\frac{b^2}{4a}-c=\frac{b^2-4ac}{4a}$, so $\left(x+\frac b{2a}\right)^2=\frac{b^2-4ac}{4a^2}$.</p><p>Square-root both sides (both signs): $x+\frac b{2a}=\pm\frac{\sqrt{b^2-4ac}}{2a}$, which rearranges to the formula.</p>`),
  B.ex(2, T`Solve $x^2+4x-1=0$, giving exact answers.`, [
    T`Complete the square: $(x+2)^2-4-1=0\Rightarrow(x+2)^2=5$.`,
    T`$x+2=\pm\sqrt5\Rightarrow x=-2\pm\sqrt5$.`], T`The formula gives the same: $x=\frac{-4\pm\sqrt{16+4}}{2}=\frac{-4\pm2\sqrt5}{2}$.`),
  T`<h3>3. The discriminant</h3>`,
  B.def('discriminant', T`<p>$\Delta=b^2-4ac$ is the part under the square root. From the formula:</p><ul><li>$\Delta\gt0$: two distinct real roots (graph crosses the $x$-axis twice);</li><li>$\Delta=0$: one repeated root (graph touches the axis at its vertex);</li><li>$\Delta\lt0$: no real roots (graph entirely above or below the axis).</li></ul><p>"Real roots" (no word "distinct") means $\Delta\ge0$.</p>`),
  B.ex(3, T`Find the values of $k$ for which $x^2+kx+9=0$ has equal roots.`, [
    T`Equal roots $\iff\Delta=0$: $k^2-4(1)(9)=0$.`,
    T`$k^2=36\Rightarrow k=\pm6$.`]),
  B.ex(4, T`Find the range of values of $k$ for which $kx^2+4x+k=0$ has two distinct real roots.`, [
    T`$\Delta\gt0$: $16-4k\cdot k\gt0\Rightarrow k^2\lt4$.`,
    T`So $-2\lt k\lt2$ (a quadratic inequality — see 2.4).`,
    T`But the equation is only a quadratic if $k\ne0$ (at $k=0$ it is $4x=0$, one root). Answer: $-2\lt k\lt2$, $k\ne0$.`]),
  B.ex(5, T`Solve $x-5\sqrt x+6=0$.`, [
    T`Hidden quadratic in $\sqrt x$: let $u=\sqrt x$, so $u^2-5u+6=0$.`,
    T`$(u-2)(u-3)=0\Rightarrow\sqrt x=2$ or $3$.`,
    T`$x=4$ or $x=9$. (Both check: $4-10+6=0$, $9-15+6=0$.)`]),
  T`<h3>4. Sketching $y=ax^2+bx+c$</h3><p>Show: the shape ($\cup$ if $a\gt0$, $\cap$ if $a\lt0$), the $y$-intercept $(0,c)$, any $x$-intercepts, and the vertex. Use the simulation to see how $a$, $b$, $c$ move each of these.</p>`,
  B.warn([
    T`With $a\ne1$, forgetting to multiply the "$-p^2$" by $a$ when expanding back.`,
    T`Losing the $\pm$ when square-rooting.`,
    T`Confusing "real roots" ($\Delta\ge0$) with "distinct real roots" ($\Delta\gt0$).`,
    T`Forgetting $a\ne0$ when the leading coefficient contains the unknown.`,
    T`Reading the vertex of $(x+3)^2-2$ as $(3,-2)$; it is $(-3,-2)$.`]),
  B.exam([
    T`"Hence" after completing the square means use that form — e.g. read off the minimum or prove positivity — not start again.`,
    T`For discriminant questions write the condition first ($b^2-4ac\gt0$) then substitute; it earns the method mark even if the algebra slips.`,
    T`Exact answers: leave surds, e.g. $-2\pm\sqrt5$.`]),
  B.checks([
    [T`Write $x^2+10x+3$ in completed-square form.`, T`$(x+5)^2-22$.`],
    [T`How many real roots has $3x^2-2x+1=0$?`, T`$\Delta=4-12=-8\lt0$: none.`],
    [T`State the maximum value of $5-(x-2)^2$.`, T`$5$, at $x=2$.`]]),
  B.examq(8, T`<p>$f(x)=3x^2-6x+5$.</p><p>(a) Express $f(x)$ in the form $a(x+b)^2+c$. <span class="mk">[3]</span></p><p>(b) State the minimum value of $f(x)$ and the value of $x$ at which it occurs. <span class="mk">[2]</span></p><p>(c) Hence explain why $f(x)\gt0$ for all $x$. <span class="mk">[1]</span></p><p>(d) Find the values of $k$ for which $f(x)=k$ has two distinct real roots. <span class="mk">[2]</span></p>`,
    T`<p>(a) $3(x^2-2x)+5$ <span class="mk">M1</span> $=3[(x-1)^2-1]+5$ <span class="mk">M1</span> $=3(x-1)^2+2$. <span class="mk">A1</span></p>
<p>(b) Minimum value $2$ <span class="mk">B1</span> at $x=1$. <span class="mk">B1</span></p>
<p>(c) $3(x-1)^2\ge0$ so $f(x)\ge2\gt0$. <span class="mk">B1</span></p>
<p>(d) $3x^2-6x+5-k=0$: $\Delta=36-12(5-k)\gt0$ <span class="mk">M1</span> $\Rightarrow k\gt2$. <span class="mk">A1</span> (Consistent with (b): a horizontal line above the minimum meets the curve twice.)</p>`),
  B.key([T`$ax^2+bx+c=a(x+\frac b{2a})^2+c-\frac{b^2}{4a}$; vertex $(-\frac b{2a},\,c-\frac{b^2}{4a})$.`, T`$x=\dfrac{-b\pm\sqrt{b^2-4ac}}{2a}$.`, T`$\Delta\gt0$ two, $=0$ one (repeated), $\lt0$ none.`, T`Hidden quadratics: $x^4$, $\sqrt x$, $a^{2x}$.`]),
].join('');

/* ===================================================================== */
BOOK.m_sim = [
  B.why(T`<p>Two equations in two unknowns describe two graphs; solving them simultaneously finds where the graphs <b>meet</b>. Linear–linear gives at most one point; linear–quadratic gives $0$, $1$ or $2$ points, and the discriminant tells you which — the idea behind every "show the line is a tangent" question.</p>`),
  T`<h3>1. Two linear equations</h3>
<p><b>Elimination:</b> scale the equations so one variable has equal (or opposite) coefficients, then add or subtract. <b>Substitution:</b> make one variable the subject of one equation and substitute into the other. Geometrically the solution is the intersection of two lines; parallel lines give no solution.</p>`,
  B.ex(1, T`Solve $3x+2y=7$ and $5x-3y=37$.`, [
    T`Make the $y$-coefficients opposite: $\times3$: $9x+6y=21$; $\times2$: $10x-6y=74$.`,
    T`Add: $19x=95\Rightarrow x=5$.`,
    T`Substitute: $15+2y=7\Rightarrow y=-4$. Check in the second: $25+12=37$ ✓.`]),
  T`<h3>2. One linear, one quadratic</h3>
<p>Always <b>substitute the linear equation into the quadratic</b>. Rearrange the linear one to make $x$ or $y$ the subject (choose whichever avoids fractions), substitute, and solve the resulting quadratic. Then find the partner value <b>from the linear equation</b>, and present answers as pairs.</p>`,
  B.ex(2, T`Solve $y=x+1$ and $x^2+y^2=25$.`, [
    T`Substitute: $x^2+(x+1)^2=25\Rightarrow2x^2+2x-24=0\Rightarrow x^2+x-12=0$.`,
    T`$(x+4)(x-3)=0\Rightarrow x=3$ or $x=-4$.`,
    T`From $y=x+1$: $(3,4)$ and $(-4,-3)$.`], T`Geometrically: the line cuts the circle of radius 5 at two points.`),
  B.ex(3, T`Solve $x+2y=5$ and $x^2-xy+y^2=7$.`, [
    T`$x=5-2y$ (no fractions). Substitute: $(5-2y)^2-(5-2y)y+y^2=7$.`,
    T`$25-20y+4y^2-5y+2y^2+y^2=7\Rightarrow7y^2-25y+18=0$.`,
    T`$(7y-18)(y-1)=0\Rightarrow y=1$ or $y=\tfrac{18}{7}$.`,
    T`$y=1\Rightarrow x=3$; $y=\tfrac{18}7\Rightarrow x=5-\tfrac{36}{7}=-\tfrac17$. Solutions $(3,1)$ and $\left(-\tfrac17,\tfrac{18}7\right)$.`]),
  T`<h3>3. How many intersections? The discriminant again</h3>`,
  B.thm('Line meets curve', T`<p>After substituting a line into a quadratic curve you get a quadratic equation in one variable. Its discriminant $\Delta$ counts the meeting points: $\Delta\gt0$ two (the line is a chord), $\Delta=0$ one (the line is a <b>tangent</b>), $\Delta\lt0$ none.</p>`),
  B.ex(4, T`Find $k$ so that $y=2x+k$ is a tangent to $y=x^2-4x+10$, and find the point of contact.`, [
    T`Substitute: $x^2-4x+10=2x+k\Rightarrow x^2-6x+(10-k)=0$.`,
    T`Tangent $\iff\Delta=0$: $36-4(10-k)=0\Rightarrow k=1$.`,
    T`Repeated root: $x^2-6x+9=0\Rightarrow x=3$, $y=2(3)+1=7$. Point of contact $(3,7)$.`]),
  T`<h3>4. Three equations in three unknowns</h3><p>Label the equations (1), (2), (3). Use <b>two different pairs</b> to eliminate the <b>same</b> variable, giving two equations in two unknowns. Solve those, then substitute back. Finally check in all three originals.</p>`,
  B.ex(5, T`Solve $x+y+z=6$, $2x-y+z=3$, $x+2y-z=2$.`, [
    T`Eliminate $z$: (1) − (2): $-x+2y=3$ … (4). (1) + (3): $2x+3y=8$ … (5).`,
    T`From (4), $x=2y-3$. Substitute into (5): $4y-6+3y=8\Rightarrow y=2$, so $x=1$.`,
    T`From (1): $z=6-1-2=3$. Check (2): $2-2+3=3$ ✓; (3): $1+4-3=2$ ✓.`,
    T`Solution $x=1$, $y=2$, $z=3$.`], T`Geometrically each equation is a plane in 3D; a unique solution is the single point where all three meet.`),
  B.warn([
    T`Substituting the linear equation back into the quadratic to find the partner value — it can create extra (wrong) pairs. Use the linear one.`,
    T`With three variables, eliminating <i>different</i> variables from the two pairs — you end up with three unknowns again.`,
    T`Listing $x$-values and $y$-values separately instead of as matched pairs.`,
    T`Sign errors when expanding $(5-2y)^2$ or $-(5-2y)y$. Bracket everything first.`,
    T`Dividing an equation by a variable (losing the solution where it is zero).`]),
  B.exam([
    T`Say what each step does ("substituting $y=x+1$ into…") — examiners award method even when arithmetic slips.`,
    T`For "show that the line is a tangent", compute $\Delta$ and state "$\Delta=0$, so the line is a tangent".`,
    T`Check one pair in both original equations; it takes seconds.`]),
  B.checks([
    [T`Solve $y=2x$, $x^2+y^2=20$.`, T`$5x^2=20\Rightarrow x=\pm2$: $(2,4)$, $(-2,-4)$.`],
    [T`Does $y=x+5$ meet $y=x^2+x+6$?`, T`$x^2+1=0$: $\Delta=-4\lt0$, so no.`],
    [T`Solve $x+y=7$, $xy=12$.`, T`$x(7-x)=12\Rightarrow x^2-7x+12=0$: $(3,4)$, $(4,3)$.`]]),
  B.examq(9, T`<p>(a) Solve the simultaneous equations $y=x-1$ and $x^2+2y^2=22$. <span class="mk">[6]</span></p><p>(b) Find the exact values of $c$ for which the line $y=x+c$ is a tangent to the curve $x^2+2y^2=22$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $x^2+2(x-1)^2=22$ <span class="mk">M1</span> $\Rightarrow3x^2-4x-20=0$ <span class="mk">A1</span> $\Rightarrow(3x-10)(x+2)=0$ <span class="mk">M1</span>; $x=-2$ or $\tfrac{10}3$ <span class="mk">A1</span>. $y=x-1$: $(-2,-3)$ and $\left(\tfrac{10}3,\tfrac73\right)$. <span class="mk">M1 A1</span></p>
<p>(b) $x^2+2(x+c)^2=22\Rightarrow3x^2+4cx+2c^2-22=0$. <span class="mk">M1</span> Tangent: $16c^2-12(2c^2-22)=0$ <span class="mk">M1</span> $\Rightarrow8c^2=264$, $c=\pm\sqrt{33}$. <span class="mk">A1</span></p>`),
  B.key([T`Linear–linear: elimination or substitution. Three variables: eliminate the same variable twice.`, T`Linear–quadratic: substitute the linear into the quadratic; partner values from the linear.`, T`Discriminant of the resulting quadratic: $\gt0$ chord, $=0$ tangent, $\lt0$ miss.`]),
].join('');

/* ===================================================================== */
BOOK.m_ineq = [
  B.why(T`<p>An inequality asks for a whole <b>range</b> of values, not a single answer. Linear inequalities behave almost like equations; quadratic ones need a sketch. They are also the end-point of many other questions: "for which $k$ does … have two roots?", "where is $f$ increasing?".</p>`),
  T`<h3>1. Linear inequalities</h3><p>You may add or subtract anything, and multiply or divide by a <b>positive</b> number. Multiplying or dividing by a <b>negative</b> number <b>reverses</b> the inequality.</p>`,
  B.proof(T`<p>$a\lt b\iff b-a\gt0$. Multiplying by $-1$: $a-b\lt0$, i.e. $(-b)-(-a)\lt0$, i.e. $-b\lt-a$, which is $-a\gt-b$. The order flips.</p>`, 'Why the sign flips'),
  B.ex(1, T`Solve $5-3x\lt2x+20$.`, [
    T`Collect $x$ on the side where it is positive: $5-20\lt2x+3x$.`,
    T`$-15\lt5x\Rightarrow x\gt-3$.`], T`Moving $x$ to the right avoids dividing by a negative.`),
  T`<h3>2. Quadratic inequalities — always sketch</h3>
<ol><li>Rearrange to $f(x)\gt0$ (or $\lt$, $\ge$, $\le$) with zero on one side.</li><li>Find the <b>critical values</b> (roots of $f(x)=0$).</li><li>Sketch $y=f(x)$ and read off where the curve is above (for $\gt0$) or below (for $\lt0$) the axis.</li></ol>
<p>For a $\cup$-shaped curve with roots $\alpha\lt\beta$: $f(x)\lt0$ for $\alpha\lt x\lt\beta$ (one interval); $f(x)\gt0$ for $x\lt\alpha$ <b>or</b> $x\gt\beta$ (two pieces).</p>`,
  B.ex(2, T`Solve $x^2-x-6\gt0$.`, [
    T`$(x-3)(x+2)\gt0$; critical values $-2$ and $3$.`,
    T`$\cup$-shaped, above the axis outside the roots: $x\lt-2$ or $x\gt3$.`,
    T`Set notation: $\{x:x\lt-2\}\cup\{x:x\gt3\}$.`]),
  B.ex(3, T`Solve $2x^2\le5x+3$.`, [
    T`$2x^2-5x-3\le0\Rightarrow(2x+1)(x-3)\le0$; critical values $-\tfrac12$, $3$.`,
    T`$\cup$-shaped, below or on the axis between the roots: $-\tfrac12\le x\le3$.`,
    T`Set notation: $\{x:-\tfrac12\le x\le3\}$.`]),
  B.ex(4, T`Find the values of $x$ satisfying both $3x-1\gt8$ and $x^2-7x+10\lt0$.`, [
    T`First: $x\gt3$. Second: $(x-2)(x-5)\lt0\Rightarrow2\lt x\lt5$.`,
    T`Both at once (the overlap on a number line): $3\lt x\lt5$, i.e. $\{x:x\gt3\}\cap\{x:2\lt x\lt5\}$.`]),
  B.ex(5, T`Find the values of $k$ for which $x^2+kx+4=0$ has no real roots.`, [
    T`No real roots: $\Delta\lt0\Rightarrow k^2-16\lt0$.`,
    T`$(k-4)(k+4)\lt0\Rightarrow-4\lt k\lt4$.`]),
  T`<h3>3. Inequalities with brackets and fractions</h3><p>The specification says "including inequalities with brackets and fractions". Clear fractions by multiplying <b>every term</b> by the positive common denominator; expand brackets; then collect everything on one side.</p>`,
  B.ex(6, T`Solve $\dfrac{x+1}{3}-\dfrac{x-2}{4}\lt1$.`, [
    T`Multiply every term by $12$ (positive, so no flip): $4(x+1)-3(x-2)\lt12$.`,
    T`$4x+4-3x+6\lt12\Rightarrow x+10\lt12\Rightarrow x\lt2$.`]),
  B.ex(7, T`Solve $(x-2)(x+3)\ge2x+6$.`, [
    T`Don't divide by $(x+3)$ — its sign is unknown. Collect on one side: $(x-2)(x+3)-2(x+3)\ge0$.`,
    T`Factorise: $(x+3)(x-4)\ge0$; critical values $-3$ and $4$.`,
    T`∪-shape, so $x\le-3$ or $x\ge4$, i.e. $\{x:x\le-3\}\cup\{x:x\ge4\}$.`], T`Dividing by $(x+3)$ would have given only $x\ge4$ — losing half the answer.`),
  B.def('notation', T`<ul><li>"or" / union $\cup$: either piece is allowed (two separate intervals).</li><li>"and" / intersection $\cap$: both must hold at once (the overlap).</li><li>Never write $3\lt x\lt-2$ or $-2\gt x\gt3$ for two separate pieces — those mean nothing.</li></ul>`),
  B.tip(T`<p>Graphically, $f(x)\gt g(x)$ is where the graph of $f$ lies <b>above</b> the graph of $g$. Turn on "Shade where y &lt; 0" in the quadratic simulation to see the solution set appear.</p>`),
  B.warn([
    T`$x^2\gt9\Rightarrow x\gt\pm3$ is wrong. Rearrange: $(x-3)(x+3)\gt0\Rightarrow x\lt-3$ or $x\gt3$.`,
    T`Dividing by $x$ or by an expression whose sign is unknown.`,
    T`Forgetting to flip when dividing by a negative.`,
    T`Giving the inside interval when the question asked for $\gt0$ (or vice versa) — sketch!`]),
  B.exam([
    T`A quick sketch of the parabola with the critical values marked is usually expected and earns method marks.`,
    T`If the question asks for set notation, use it; otherwise inequalities joined by "or"/"and" are fine.`,
    T`Strict ($\lt$) vs inclusive ($\le$): copy the symbol from the question to the final answer.`]),
  B.checks([
    [T`Solve $x^2\le4x$.`, T`$x(x-4)\le0\Rightarrow0\le x\le4$.`],
    [T`Solve $6-x-x^2\gt0$.`, T`$x^2+x-6\lt0\Rightarrow(x+3)(x-2)\lt0\Rightarrow-3\lt x\lt2$.`],
    [T`For which $p$ does $x^2+2x+p=0$ have two distinct real roots?`, T`$4-4p\gt0\Rightarrow p\lt1$.`]]),
  B.examq(7, T`<p>(a) Solve $3x^2+5x-2\ge0$. <span class="mk">[3]</span></p><p>(b) The equation $px^2+2px+3=0$, where $p\ne0$, has no real roots. Find the range of possible values of $p$. <span class="mk">[4]</span></p>`,
    T`<p>(a) $(3x-1)(x+2)\ge0$ <span class="mk">M1</span>; critical values $\tfrac13$, $-2$ <span class="mk">A1</span>; $x\le-2$ or $x\ge\tfrac13$. <span class="mk">A1</span></p>
<p>(b) $\Delta\lt0$: $(2p)^2-4(p)(3)\lt0$ <span class="mk">M1</span> $\Rightarrow4p^2-12p\lt0\Rightarrow4p(p-3)\lt0$ <span class="mk">M1</span>; critical values $0$, $3$ <span class="mk">A1</span>; $0\lt p\lt3$. <span class="mk">A1</span></p>`),
  B.key([T`Negative multiplier $\Rightarrow$ flip the sign.`, T`Quadratic: zero on one side → roots → sketch → read off.`, T`$\cup$-shape: $\lt0$ between roots, $\gt0$ outside.`, T`"or" = union, "and" = overlap.`]),
].join('');

/* ===================================================================== */
BOOK.m_poly = [
  B.why(T`<p>Cubics and quartics can't be solved with a formula you're expected to know. Instead, you find one root by inspection, use it to peel off a factor, and finish with a quadratic. The <b>factor theorem</b> tells you when a guess is a root; the <b>remainder theorem</b> tells you what's left over when it isn't.</p>`),
  B.def('polynomial division', T`<p>Dividing $f(x)$ by $(x-a)$ gives a <b>quotient</b> $q(x)$ (one degree lower) and a constant <b>remainder</b> $r$: $$f(x)=(x-a)\,q(x)+r.$$</p>`),
  B.thm('Remainder theorem', T`<p>When $f(x)$ is divided by $(x-a)$ the remainder is $f(a)$. More generally, dividing by $(ax-b)$ leaves remainder $f\!\left(\tfrac ba\right)$.</p>`),
  B.proof(T`<p>Put $x=a$ in $f(x)=(x-a)q(x)+r$: $f(a)=0\cdot q(a)+r=r$. For $(ax-b)$: $f(x)=(ax-b)q(x)+r$ and $x=\tfrac ba$ makes the bracket zero.</p>`),
  B.thm('Factor theorem', T`<p>$(x-a)$ is a factor of $f(x)\iff f(a)=0$. Likewise $(ax-b)$ is a factor $\iff f\!\left(\tfrac ba\right)=0$.</p>`),
  B.proof(T`<p>A factor means remainder $0$; by the remainder theorem the remainder is $f(a)$.</p>`),
  T`<h3>Finding the quotient</h3>
<p><b>Comparing coefficients</b> is the cleanest method. If $(x-3)$ is a factor of $2x^3-3x^2-11x+6$, write $2x^3-3x^2-11x+6=(x-3)(ax^2+bx+c)$: the $x^3$ terms give $a=2$, the constants give $-3c=6\Rightarrow c=-2$, and the $x^2$ terms give $b-3a=-3\Rightarrow b=3$. (Long division gives the same; include $0x^2$ etc. for any missing powers.)</p>
<p><b>Which roots to try?</b> Integer roots must divide the constant term. Try $\pm1,\pm2,\pm3,\dots$; if the leading coefficient is $2$, also try $\pm\tfrac12$, etc.</p>`,
  B.ex(1, T`Factorise $x^3-2x^2-5x+6$ fully.`, [
    T`$f(1)=1-2-5+6=0$, so $(x-1)$ is a factor.`,
    T`$x^3-2x^2-5x+6=(x-1)(x^2+bx-6)$; $x^2$ terms: $b-1=-2\Rightarrow b=-1$.`,
    T`$x^2-x-6=(x-3)(x+2)$, so $f(x)=(x-1)(x-3)(x+2)$.`]),
  B.ex(2, T`Find the remainder when $2x^3+3x^2-4x+1$ is divided by $(x+2)$.`, [
    T`$(x+2)=(x-(-2))$, so evaluate $f(-2)$.`,
    T`$f(-2)=-16+12+8+1=5$. Remainder $5$.`]),
  B.ex(3, T`$f(x)=x^3+ax^2+bx-6$. $(x-2)$ is a factor and the remainder on division by $(x+1)$ is $-12$. Find $a$ and $b$, and factorise $f(x)$.`, [
    T`$f(2)=0$: $8+4a+2b-6=0\Rightarrow2a+b=-1$.`,
    T`$f(-1)=-12$: $-1+a-b-6=-12\Rightarrow a-b=-5$.`,
    T`Add: $3a=-6\Rightarrow a=-2$, $b=3$.`,
    T`$f(x)=x^3-2x^2+3x-6=x^2(x-2)+3(x-2)=(x-2)(x^2+3)$; $x^2+3$ has no real roots.`]),
  B.ex(4, T`Solve $2x^3-3x^2-11x+6=0$.`, [
    T`$f(3)=54-27-33+6=0$, so $(x-3)$ is a factor.`,
    T`Comparing coefficients (above): $f(x)=(x-3)(2x^2+3x-2)$.`,
    T`$2x^2+3x-2=(2x-1)(x+2)$. Roots $x=3,\ \tfrac12,\ -2$.`]),
  B.warn([
    T`Testing $f(2)$ for the factor $(x+2)$: the sign flips — use $f(-2)$.`,
    T`Remainder on division by $(2x-1)$ is $f(\tfrac12)$, not $f(1)$ or $f(2)$.`,
    T`Forgetting $0x^2$ placeholders in long division.`,
    T`Stopping at "$(x-2)(x^2+3)$" and claiming more real roots — check the quadratic's discriminant.`]),
  B.exam([
    T`"Show that $(x-3)$ is a factor": compute $f(3)$ explicitly, then state "$f(3)=0$, so by the factor theorem $(x-3)$ is a factor".`,
    T`"Factorise fully" means every factor linear (or an irreducible quadratic) — not just one factor taken out.`,
    T`Expanding your factorisation back is a quick check.`]),
  B.checks([
    [T`Is $(x+1)$ a factor of $x^3+1$?`, T`$f(-1)=-1+1=0$: yes. $x^3+1=(x+1)(x^2-x+1)$.`],
    [T`Remainder when $x^4-3x+2$ is divided by $(x-2)$?`, T`$f(2)=16-6+2=12$.`],
    [T`Remainder when $4x^3-x$ is divided by $(2x+1)$?`, T`$f(-\tfrac12)=4(-\tfrac18)+\tfrac12=0$ — it's a factor.`]]),
  B.examq(8, T`<p>$f(x)=2x^3+px^2-11x+q$. $(x-2)$ is a factor of $f(x)$, and when $f(x)$ is divided by $(x-1)$ the remainder is $-12$.</p><p>(a) Find $p$ and $q$. <span class="mk">[4]</span></p><p>(b) Factorise $f(x)$ fully. <span class="mk">[3]</span></p><p>(c) Hence solve $f(x)=0$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $f(2)=16+4p-22+q=0\Rightarrow4p+q=6$ <span class="mk">M1</span>; $f(1)=2+p-11+q=-12\Rightarrow p+q=-3$ <span class="mk">M1</span>. Subtract: $3p=9$, $p=3$ <span class="mk">A1</span>, $q=-6$. <span class="mk">A1</span></p>
<p>(b) $2x^3+3x^2-11x-6=(x-2)(2x^2+7x+3)$ <span class="mk">M1 A1</span> $=(x-2)(2x+1)(x+3)$. <span class="mk">A1</span></p>
<p>(c) $x=2,\ -\tfrac12,\ -3$. <span class="mk">B1</span></p>`),
  B.key([T`$f(x)=(x-a)q(x)+r$; remainder $r=f(a)$.`, T`$(x-a)$ factor $\iff f(a)=0$; $(ax-b)$ factor $\iff f(\frac ba)=0$.`, T`Find one root by trial (divisors of the constant), divide, finish with a quadratic.`]),
].join('');

/* ===================================================================== */
BOOK.m_graph = [
  B.why(T`<p>A good sketch answers questions before any algebra: how many solutions an equation has, where a function is positive, what happens for large $x$. This chapter gives you a library of standard shapes and the rules for moving and stretching them.</p>`),
  T`<h3>1. Standard graphs</h3>
<ul><li><b>Cubics</b> $y=a(x-p)(x-q)(x-r)$: crosses the axis at each root; for $a\gt0$ it rises to the right. A <b>repeated root</b> $(x-p)^2$ makes the curve <b>touch</b> the axis there.</li>
<li><b>Quartics</b> $y=x^4$ etc.: both ends go the same way.</li>
<li><b>Reciprocal</b> $y=\dfrac ax$: two branches, asymptotes $x=0$ and $y=0$. $y=\dfrac a{x^2}$: both branches on the same side of the $x$-axis (for $a\gt0$, both above).</li>
<li><b>Proportion</b>: $y\propto x$ is a line through the origin; $y\propto\frac1x$ is a reciprocal curve.</li></ul>`,
  B.ex(1, T`Sketch $y=(x-1)^2(x+2)$.`, [
    T`Roots: $x=1$ (repeated — touches), $x=-2$ (crosses).`,
    T`$y$-intercept: $x=0$ gives $(1)(2)=2$.`,
    T`Leading term $x^3$ (positive): from bottom-left to top-right, crossing at $-2$, rising to a maximum, coming down to touch at $(1,0)$, then rising.`]),
  T`<h3>2. Transformations</h3>`,
  B.thm('Transformations of y = f(x)', T`<table class="tbl"><tr><th>Equation</th><th>Transformation</th><th>Point $(p,q)$ moves to</th></tr>
<tr><td>$y=f(x)+a$</td><td>translation $a$ up</td><td>$(p,\ q+a)$</td></tr>
<tr><td>$y=f(x+a)$</td><td>translation $a$ <b>left</b></td><td>$(p-a,\ q)$</td></tr>
<tr><td>$y=af(x)$</td><td>stretch parallel to the $y$-axis, factor $a$</td><td>$(p,\ aq)$</td></tr>
<tr><td>$y=f(ax)$</td><td>stretch parallel to the $x$-axis, factor $\frac1a$</td><td>$(\frac pa,\ q)$</td></tr>
<tr><td>$y=-f(x)$</td><td>reflection in the $x$-axis</td><td>$(p,\ -q)$</td></tr>
<tr><td>$y=f(-x)$</td><td>reflection in the $y$-axis</td><td>$(-p,\ q)$</td></tr></table>`),
  B.proof(T`<p>Take $y=f(x+a)$. At $x=p-a$: $y=f(p-a+a)=f(p)=q$. So $(p-a,q)$ is on the new graph: everything shifts $a$ to the <b>left</b>. Similarly for $y=f(ax)$ at $x=\frac pa$: $y=f(p)=q$, so $x$-coordinates are divided by $a$. Changes <b>inside</b> the bracket act on $x$ "the opposite way"; changes <b>outside</b> act on $y$ as you'd expect.</p>`, 'Why "inside the bracket" works backwards'),
  B.ex(2, T`$y=f(x)$ has a maximum at $(2,5)$. Find the maximum (or minimum) of: (a) $y=f(x-3)$ (b) $y=2f(x)$ (c) $y=f(2x)$ (d) $y=-f(x)$ (e) $y=f(x)+4$.`, [
    T`(a) right 3: $(5,5)$, maximum.`,
    T`(b) $y$-values doubled: $(2,10)$, maximum.`,
    T`(c) $x$-values halved: $(1,5)$, maximum.`,
    T`(d) reflected: $(2,-5)$, now a <b>minimum</b>.`,
    T`(e) up 4: $(2,9)$, maximum.`]),
  B.ex(3, T`Sketch $y=\dfrac{1}{x-2}+3$, giving asymptotes and intercepts.`, [
    T`It is $y=\frac1x$ translated 2 right and 3 up: asymptotes $x=2$ and $y=3$.`,
    T`$y$-intercept: $x=0\Rightarrow y=-\tfrac12+3=\tfrac52$.`,
    T`$x$-intercept: $\frac1{x-2}=-3\Rightarrow x-2=-\tfrac13\Rightarrow x=\tfrac53$.`]),
  T`<h3>3. Using graphs to count solutions</h3><p>The number of real solutions of $f(x)=g(x)$ equals the number of intersections of $y=f(x)$ and $y=g(x)$.</p>`,
  B.ex(4, T`By sketching $y=x(x-4)$ and $y=\dfrac2x$, state how many real solutions $x^2(x-4)=2$ has.`, [
    T`$x^2(x-4)=2\iff x(x-4)=\frac2x$ (for $x\ne0$), so count intersections.`,
    T`For $x\lt0$: the parabola is positive, $\frac2x$ is negative — no intersections.`,
    T`For $0\lt x\lt4$: parabola negative, $\frac2x$ positive — none. For $x\gt4$: the parabola rises from $0$, $\frac2x$ falls — exactly one.`,
    T`So there is <b>one</b> real solution (it lies between $4$ and $5$).`]),
  B.warn([
    T`Moving $y=f(x+3)$ to the right. Inside the bracket: $+3$ means left.`,
    T`$y=f(2x)$ is a stretch with factor $\tfrac12$, not $2$.`,
    T`Drawing a repeated root crossing the axis instead of touching.`,
    T`Unlabelled asymptotes/intercepts — a sketch without them often scores nothing.`]),
  B.exam([
    T`"Sketch" = correct shape + all intercepts and asymptotes labelled with coordinates or equations. No graph paper accuracy needed.`,
    T`Describe transformations fully: "a translation by $\binom{3}{0}$", "a stretch parallel to the $y$-axis with scale factor 2".`,
    T`When asked how many solutions, refer explicitly to the number of intersection points.`]),
  B.checks([
    [T`Describe the transformation from $y=x^2$ to $y=(x+1)^2-4$.`, T`Translation 1 left and 4 down, i.e. by $\binom{-1}{-4}$. Vertex $(-1,-4)$.`],
    [T`What are the asymptotes of $y=\dfrac{2}{x+1}$?`, T`$x=-1$ and $y=0$.`],
    [T`Where does $y=x^2(x-3)$ touch / cross the $x$-axis?`, T`Touches at $0$ (double root), crosses at $3$.`]]),
  B.examq(6, T`<p>$f(x)=(x+1)(x-2)^2$.</p><p>(a) Sketch $y=f(x)$, showing the coordinates of the points where it meets the axes. <span class="mk">[3]</span></p><p>(b) State the $x$-coordinates of the points where $y=f(x-1)$ meets the $x$-axis. <span class="mk">[2]</span></p><p>(c) State the coordinates of the point where $y=2f(x)$ meets the $y$-axis. <span class="mk">[1]</span></p>`,
    T`<p>(a) Positive cubic shape <span class="mk">B1</span>; crosses at $(-1,0)$, touches at $(2,0)$ <span class="mk">B1</span>; $y$-intercept $(0,4)$. <span class="mk">B1</span></p>
<p>(b) Translation 1 right: $x=0$ and $x=3$. <span class="mk">B1 B1</span></p>
<p>(c) $(0,8)$. <span class="mk">B1</span></p>`),
  B.key([T`Repeated root: touch; single root: cross.`, T`Outside the bracket acts on $y$ normally; inside acts on $x$ the opposite way.`, T`$f(ax)$: $x$-coordinates $\div a$; $af(x)$: $y$-coordinates $\times a$.`, T`Solutions of $f(x)=g(x)$ = intersections of the two graphs.`]),
].join('');

/* ===================================================================== */
BOOK.m_line = [
  B.why(T`<p>Straight lines are the simplest graphs, but they carry the key ideas of coordinate geometry: gradient as a rate, parallel and perpendicular directions, distances and midpoints. Circles, tangents and normals all build on this chapter.</p>`),
  B.def('gradient & equations', T`<p>Through $(x_1,y_1)$ and $(x_2,y_2)$: gradient $m=\dfrac{y_2-y_1}{x_2-x_1}$.</p><ul><li>Point–gradient form: $y-y_1=m(x-x_1)$.</li><li>Gradient–intercept form: $y=mx+c$.</li><li>General form: $ax+by+c=0$ (usually with integer $a,b,c$).</li><li>Midpoint $\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$; distance $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ (Pythagoras).</li></ul>`),
  B.thm('Parallel and perpendicular lines', T`<p>Parallel lines have equal gradients. Lines with gradients $m_1$, $m_2$ (neither vertical) are perpendicular $\iff m_1m_2=-1$, i.e. $m_2=-\dfrac1{m_1}$.</p>`),
  B.proof(T`<p>A line of gradient $m$ has direction "1 across, $m$ up", i.e. the step $(1,m)$. Rotating a step $(a,b)$ by $90^\circ$ gives $(-b,a)$, so $(1,m)$ becomes $(-m,1)$, whose gradient is $\dfrac{1}{-m}=-\dfrac1m$. Hence the product of the gradients is $m\cdot\left(-\frac1m\right)=-1$.</p>`),
  B.ex(1, T`Find the equation of the line through $(2,-1)$ and $(6,7)$.`, [
    T`$m=\dfrac{7-(-1)}{6-2}=\dfrac84=2$.`,
    T`$y-(-1)=2(x-2)\Rightarrow y=2x-5$.`]),
  B.ex(2, T`Find the perpendicular bisector of $A(1,3)$ and $B(7,-1)$, in the form $ax+by+c=0$.`, [
    T`Midpoint $(4,1)$.`,
    T`$m_{AB}=\dfrac{-1-3}{7-1}=-\dfrac23$, so the perpendicular gradient is $\dfrac32$.`,
    T`$y-1=\tfrac32(x-4)\Rightarrow2y-2=3x-12\Rightarrow3x-2y-10=0$.`]),
  B.ex(3, T`Find where $2x+3y=12$ meets $y=x-1$.`, [
    T`Substitute: $2x+3(x-1)=12\Rightarrow5x=15\Rightarrow x=3$.`,
    T`$y=2$. Intersection $(3,2)$.`]),
  B.ex(4, T`The line $3x+4y=24$ meets the axes at $P$ and $Q$. Find the area of triangle $OPQ$ and the length $PQ$.`, [
    T`$y=0\Rightarrow P(8,0)$; $x=0\Rightarrow Q(0,6)$.`,
    T`Area $=\tfrac12\times8\times6=24$.`,
    T`$PQ=\sqrt{8^2+6^2}=10$.`]),
  B.ex(5, T`Show that $A(-1,2)$, $B(3,4)$, $C(5,0)$ form a right-angled triangle.`, [
    T`$m_{AB}=\dfrac{4-2}{3-(-1)}=\dfrac12$; $m_{BC}=\dfrac{0-4}{5-3}=-2$.`,
    T`$m_{AB}\times m_{BC}=\tfrac12\times(-2)=-1$, so $AB\perp BC$: the right angle is at $B$.`]),
  B.warn([
    T`Perpendicular gradient: $-\frac1m$, not $-m$ or $\frac1m$.`,
    T`Mixing the order in the gradient formula ($y_2-y_1$ over $x_1-x_2$).`,
    T`Leaving fractions when the question says "integer coefficients": multiply through.`,
    T`Vertical lines ($x=k$) have no gradient — handle them separately.`]),
  B.exam([
    T`Read the required form carefully: $y=mx+c$ vs $ax+by+c=0$.`,
    T`State the gradient you are using ("perpendicular gradient $=\tfrac32$") — a separate method mark.`,
    T`A rough diagram helps you spot impossible answers (e.g. an intersection in the wrong quadrant).`]),
  B.checks([
    [T`Gradient of $4x-2y+7=0$?`, T`$y=2x+\tfrac72$: gradient $2$.`],
    [T`Line through $(0,3)$ perpendicular to $y=\tfrac13x$?`, T`$y=-3x+3$.`],
    [T`Distance from $(1,2)$ to $(4,6)$?`, T`$\sqrt{9+16}=5$.`]]),
  B.examq(10, T`<p>$A$ is $(-2,5)$ and $B$ is $(4,1)$.</p><p>(a) Find the equation of $AB$ in the form $ax+by+c=0$, where $a,b,c$ are integers. <span class="mk">[3]</span></p><p>(b) The line $L$ passes through $C(5,9)$ and is perpendicular to $AB$. Find the equation of $L$. <span class="mk">[3]</span></p><p>(c) Find the coordinates of the point $F$ where $L$ meets $AB$, and hence the shortest distance from $C$ to $AB$. <span class="mk">[4]</span></p>`,
    T`<p>(a) $m=\dfrac{1-5}{4+2}=-\dfrac23$ <span class="mk">M1</span>; $y-5=-\tfrac23(x+2)$ <span class="mk">M1</span> $\Rightarrow2x+3y-11=0$. <span class="mk">A1</span></p>
<p>(b) Gradient $\tfrac32$ <span class="mk">M1</span>; $y-9=\tfrac32(x-5)$ <span class="mk">M1</span> $\Rightarrow3x-2y+3=0$. <span class="mk">A1</span></p>
<p>(c) Solve $2x+3y=11$, $3x-2y=-3$: $\times2,\times3$ and add: $13x=13$ <span class="mk">M1</span>, $F(1,3)$. <span class="mk">A1</span> $CF=\sqrt{4^2+6^2}=\sqrt{52}=2\sqrt{13}$. <span class="mk">M1 A1</span></p>`),
  B.key([T`$m=\frac{\Delta y}{\Delta x}$; $y-y_1=m(x-x_1)$.`, T`Parallel: equal $m$. Perpendicular: $m_1m_2=-1$.`, T`Midpoint = averages; distance = Pythagoras.`, T`Shortest distance to a line: along the perpendicular.`]),
].join('');
