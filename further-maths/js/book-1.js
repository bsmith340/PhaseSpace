// BcsMaths textbook, part 1: Proof by induction; Further algebra & functions.
// Every chapter: big picture → definitions → theory with full proofs → worked examples → mistakes → exam technique → check yourself → exam-style question.
'use strict';

const BOOK = {};
const B = {
  why: h => `<div class="box why"><div class="lbl">The big picture</div>${h}</div>`,
  pre: h => `<div class="box pre"><div class="lbl">Before you start</div>${h}</div>`,
  def: (t, h) => `<div class="box def"><div class="lbl">Definition${t ? ' · ' + t : ''}</div>${h}</div>`,
  thm: (t, h) => `<div class="box thm"><div class="lbl">${t || 'Theorem'}</div>${h}</div>`,
  proof: (h, t = 'Proof') => `<details class="proof" open><summary>${t}</summary>${h}<p class="qed">∎</p></details>`,
  // Mathematics only: a proof the CCEA spec asks for stays open and is tagged; any other derivation is optional and starts closed
  proofReq: (h, t = 'Proof') => `<details class="proof req" open><summary>${t} <span class="ptag">On the spec</span></summary>${h}<p class="qed">∎</p></details>`,
  opt: (h, t = 'Why it works') => `<details class="proof optional"><summary><span class="ptag">Optional</span> ${t}</summary>${h}<p class="qed">∎</p></details>`,
  ex: (n, q, steps, note) => `<div class="box ex"><div class="lbl">Worked example ${n}</div><div class="exq">${q}</div><ol class="steps">${steps.map(s => `<li>${s}</li>`).join('')}</ol>${note ? `<p class="exnote">${note}</p>` : ''}</div>`,
  warn: items => `<div class="box warn"><div class="lbl">Common mistakes</div><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`,
  exam: items => `<div class="box exam"><div class="lbl">Exam technique</div><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`,
  tip: h => `<div class="box tipb"><div class="lbl">Insight</div>${h}</div>`,
  beyond: h => `<div class="box beyond"><div class="lbl">Beyond the specification · not examined in this unit</div>${h}</div>`,
  check: (q, a) => `<details class="check"><summary>${q}</summary><div>${a}</div></details>`,
  checks: list => `<h3>Check yourself</h3>${list.map(([q, a], i) => B.check(`<b>Q${i + 1}.</b> ${q}`, a)).join('')}`,
  examq: (marks, q, sol) => `<h3>Exam-style question</h3><div class="box examq"><div class="lbl">BcsMaths original · not a CCEA past paper · ${marks} marks</div>${q}<details class="ms"><summary>Model solution with mark-scheme style annotations</summary>${sol}</details></div>`,
  key: items => `<h3>Key results</h3><div class="box key"><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`,
};

/* ===================================================================== */
BOOK.pi2 = [
  B.why(T`<p>Some statements are claimed to hold for <i>every</i> positive integer $n$: a formula for $1+2+\dots+n$, an inequality like $2^n\gt n^2$, a pattern in powers of a matrix. You can't check infinitely many cases. <b>Proof by induction</b> lets you prove all of them with two finite pieces of work.</p>
<p>Think of an infinite line of dominoes. If (1) the first one falls, and (2) <i>whenever</i> one falls it knocks over the next, then every domino falls. Induction is exactly that argument written in algebra.</p>`),
  B.pre(T`<p>You need confident algebra — especially <b>factorising instead of expanding</b> — and sigma notation: $\sum_{r=1}^{n}u_r=u_1+u_2+\dots+u_n$.</p>`),
  T`<h3>1. Why checking examples is not a proof</h3>
<p>Consider $f(n)=n^2+n+41$. Then $f(0)=41$, $f(1)=43$, $f(2)=47$, $f(3)=53$, … all prime. In fact $f(n)$ is prime for every $n$ from $0$ to $39$. Is it always prime? No: $f(40)=40^2+40+41=40(40+1)+41=41\times41$.</p>
<p>Forty successful cases proved nothing. A proof has to explain <i>why</i> the pattern continues forever.</p>`,
  B.thm('The principle of mathematical induction', T`<p>Let $P(n)$ be a statement about the positive integer $n$. If</p>
<ol><li>$P(1)$ is true, and</li><li>for every $k\ge1$, <i>if</i> $P(k)$ is true <i>then</i> $P(k+1)$ is true,</li></ol>
<p>then $P(n)$ is true for all $n\in\mathbb Z^+$.</p>`),
  B.proof(T`<p>Suppose, for contradiction, that $P(n)$ is false for some positive integers. Among them there is a <b>smallest</b> one; call it $m$. Since $P(1)$ is true, $m\ne1$, so $m-1\ge1$. Because $m$ is the smallest failure, $P(m-1)$ is true. But then condition 2 (with $k=m-1$) says $P(m)$ is true — a contradiction. So no failures exist.</p>`, 'Why induction works (optional but illuminating)'),
  T`<h3>2. The four-part write-up</h3>
<p>Examiners look for four things. Write every induction proof with these labels until it is automatic:</p>
<ol>
<li><b>Basis</b> — show the statement is true for the starting value (usually $n=1$). Show the arithmetic on both sides.</li>
<li><b>Assumption</b> — "Assume the statement is true for $n=k$, i.e. …" and <i>write out what that means</i>.</li>
<li><b>Inductive step</b> — show the statement for $n=k+1$, and say where you used the assumption.</li>
<li><b>Conclusion</b> — "The statement is true for $n=1$, and if it is true for $n=k$ then it is true for $n=k+1$. Hence, by induction, it is true for all $n\in\mathbb Z^+$."</li>
</ol>`,
  B.tip(T`<p>Before the inductive step, <b>write down your target</b>: what the formula says when $n=k+1$. Then you know exactly what shape to aim for when you simplify.</p>`),
  T`<h3>3. Series</h3><p>For a sum $S_n=\sum_{r=1}^n u_r$, the key fact is</p>$$S_{k+1}=S_k+u_{k+1}.$$<p>Replace $S_k$ by the assumed formula, add the next term, and factorise towards the target.</p>`,
  B.ex(1, T`Prove that $\displaystyle\sum_{r=1}^{n}r=\tfrac12n(n+1)$ for all $n\in\mathbb Z^+$.`, [
    T`<b>Basis.</b> $n=1$: LHS $=1$, RHS $=\tfrac12(1)(2)=1$. True.`,
    T`<b>Assumption.</b> Assume true for $n=k$: $\;\sum_{r=1}^{k}r=\tfrac12k(k+1)$.`,
    T`<b>Target.</b> $\sum_{r=1}^{k+1}r=\tfrac12(k+1)(k+2)$.`,
    T`<b>Step.</b> $\displaystyle\sum_{r=1}^{k+1}r=\sum_{r=1}^{k}r+(k+1)=\tfrac12k(k+1)+(k+1)$ (using the assumption).`,
    T`Take out the common factor $(k+1)$ — don't expand: $=(k+1)\left(\tfrac12k+1\right)=\tfrac12(k+1)(k+2)$. This is the target.`,
    T`<b>Conclusion.</b> True for $n=1$; if true for $n=k$ then true for $n=k+1$; hence true for all $n\in\mathbb Z^+$ by induction.`]),
  B.ex(2, T`Prove that $\displaystyle\sum_{r=1}^{n}r^2=\tfrac16n(n+1)(2n+1)$.`, [
    T`<b>Basis.</b> $n=1$: LHS $=1$, RHS $=\tfrac16\cdot1\cdot2\cdot3=1$. ✓`,
    T`<b>Assume</b> $\sum_{r=1}^{k}r^2=\tfrac16k(k+1)(2k+1)$. <b>Target:</b> $\tfrac16(k+1)(k+2)(2k+3)$.`,
    T`$\displaystyle\sum_{r=1}^{k+1}r^2=\tfrac16k(k+1)(2k+1)+(k+1)^2=\tfrac16(k+1)\big[k(2k+1)+6(k+1)\big]$`,
    T`Inside the bracket: $2k^2+k+6k+6=2k^2+7k+6=(k+2)(2k+3)$.`,
    T`So the sum is $\tfrac16(k+1)(k+2)(2k+3)$ — the target. Conclude as before.`], T`Notice the strategy: pull out $\tfrac16(k+1)$ first, so only a quadratic is left to factorise.`),
  B.ex(3, T`Prove that $\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+1)}=\frac{n}{n+1}$.`, [
    T`<b>Basis.</b> $n=1$: LHS $=\tfrac1{1\cdot2}=\tfrac12$, RHS $=\tfrac12$. ✓`,
    T`<b>Assume</b> $\sum_{r=1}^{k}\frac1{r(r+1)}=\frac{k}{k+1}$. <b>Target:</b> $\frac{k+1}{k+2}$.`,
    T`$\displaystyle\sum_{r=1}^{k+1}=\frac{k}{k+1}+\frac{1}{(k+1)(k+2)}=\frac{k(k+2)+1}{(k+1)(k+2)}=\frac{k^2+2k+1}{(k+1)(k+2)}$`,
    T`$=\dfrac{(k+1)^2}{(k+1)(k+2)}=\dfrac{k+1}{k+2}$. ✓ Conclude.`]),
  T`<h3>4. Inequalities</h3>
<p>Inequality proofs need a <b>chain</b>: start from the $k+1$ expression, use the assumption to replace something by something smaller (or larger), then show the result beats the target. The last link usually needs its own small argument, which is why many inequalities only start at some $n=N$.</p>`,
  B.ex(4, T`Prove that $2^n\gt n^2$ for all integers $n\ge5$.`, [
    T`<b>Basis.</b> $n=5$: $2^5=32\gt25=5^2$. ✓ (It fails at $n=2,3,4$ — e.g. $2^4=16=4^2$ — which is why we start at 5.)`,
    T`<b>Assume</b> $2^k\gt k^2$ for some $k\ge5$. <b>Target:</b> $2^{k+1}\gt(k+1)^2$.`,
    T`$2^{k+1}=2\cdot2^k\gt2k^2$ (using the assumption).`,
    T`Now show $2k^2\ge(k+1)^2$: this is $2k^2-(k^2+2k+1)=k^2-2k-1=(k-1)^2-2\ge0$, true for $k\ge3$, so certainly for $k\ge5$.`,
    T`Hence $2^{k+1}\gt2k^2\ge(k+1)^2$. ✓ <b>Conclusion:</b> true for $n=5$, and true for $n=k+1$ whenever true for $n=k\ (k\ge5)$, so true for all $n\ge5$.`]),
  B.ex(5, T`Prove that $n!\gt2^n$ for all $n\ge4$.`, [
    T`Basis: $4!=24\gt16=2^4$. ✓`,
    T`Assume $k!\gt2^k$ for some $k\ge4$. Then $(k+1)!=(k+1)\,k!\gt(k+1)2^k$.`,
    T`Since $k\ge4$, $k+1\gt2$, so $(k+1)2^k\gt2\cdot2^k=2^{k+1}$. Hence $(k+1)!\gt2^{k+1}$. ✓ Conclude.`]),
  B.warn([
    T`Writing "assume true for $n=k$" without stating what that means. The assumption line is a mark.`,
    T`Assuming the thing you are trying to prove ($k+1$ case) and working backwards from it, without making each step reversible.`,
    T`Expanding everything into a big polynomial and then trying to factorise it. Take out common factors early.`,
    T`Missing or vague conclusion. "Therefore true" is not enough: mention the basis, the step, and "for all $n\in\mathbb Z^+$".`,
    T`In inequalities, using "$\gt$" where you only have "$\ge$", or forgetting to justify the final comparison.`]),
  B.exam([
    T`Typical marks: one for the basis, one for a clear assumption, method marks for using it correctly, accuracy marks for reaching the target, and one for the conclusion. The conclusion mark is easy to lose and easy to earn.`,
    T`Lay the work out in labelled lines. Clear structure helps the examiner award method marks even if the algebra slips.`,
    T`If the question says "prove by induction", any other method (e.g. using standard results) earns nothing.`]),
  B.checks([
    [T`Prove that $\sum_{r=1}^n(2r-1)=n^2$.`, T`Basis: $1=1^2$. Assume $\sum_{r=1}^k(2r-1)=k^2$. Then $\sum_{r=1}^{k+1}=k^2+(2k+1)=(k+1)^2$. Conclude.`],
    [T`What is wrong with: "Assume $3^k\gt k^3$. Then $3^{k+1}=3\cdot3^k\gt3k^3\gt(k+1)^3$."?`, T`The last step $3k^3\gt(k+1)^3$ is only true when $(1+\tfrac1k)^3\lt3$, i.e. $k\ge3$ (at $k=2$: $24\lt27$ fails). It must be justified, and the base case must be at least $n=4$ (since $3^3=3^3$ fails strictly at $n=3$).`],
    [T`For the step in Example 2, why is it better to factor out $(k+1)$ than to expand?`, T`The target contains the factor $(k+1)$, so factoring keeps it visible; expanding produces a cubic you then have to factorise.`]]),
  B.examq(6, T`<p>Prove by induction that, for all positive integers $n$,</p>$$\sum_{r=1}^{n}r(r+1)(r+2)=\tfrac14n(n+1)(n+2)(n+3).$$`,
    T`<p><b>Basis</b> $n=1$: LHS $=1\cdot2\cdot3=6$; RHS $=\tfrac14\cdot1\cdot2\cdot3\cdot4=6$. <span class="mk">B1</span></p>
<p><b>Assume</b> $\sum_{r=1}^{k}r(r+1)(r+2)=\tfrac14k(k+1)(k+2)(k+3)$. <span class="mk">M1</span></p>
<p>$\sum_{r=1}^{k+1}=\tfrac14k(k+1)(k+2)(k+3)+(k+1)(k+2)(k+3)$ <span class="mk">M1</span> (adding the correct $(k+1)$th term)</p>
<p>$=(k+1)(k+2)(k+3)\left(\tfrac k4+1\right)=\tfrac14(k+1)(k+2)(k+3)(k+4)$ <span class="mk">M1 A1</span></p>
<p>which is the formula with $n=k+1$. True for $n=1$, and true for $n=k\Rightarrow$ true for $n=k+1$, so true for all $n\in\mathbb Z^+$. <span class="mk">A1</span></p>`),
  B.key([T`Structure: basis → assumption → step → conclusion.`, T`Series: $S_{k+1}=S_k+u_{k+1}$; factorise towards the target.`, T`Inequalities: chain of $\gt$/$\ge$; justify the final comparison; choose the right starting value.`]),
].join('');

/* ===================================================================== */
BOOK.pi1 = [
  B.why(T`<p>"$5^{2n}-1$ is divisible by $24$ for every $n$" and "$\mathbf M^n=\begin{pmatrix}1+2n&-4n\\n&1-2n\end{pmatrix}$" are infinite families of facts. Induction handles both with the same domino logic; only the algebra of the inductive step changes.</p>`),
  B.def('divisibility', T`<p>An integer $N$ is <b>divisible by</b> $m$ if $N=m\times q$ for some integer $q$. In proofs, write it that way: "$f(k)=24A$ for some integer $A$".</p>`),
  T`<h3>1. Two ways to do the divisibility step</h3>
<p><b>Method 1 — substitute the assumption.</b> From $f(k)=mA$, rearrange to express the "big" power, e.g. $5^{2k}=24A+1$, and substitute it into $f(k+1)$.</p>
<p><b>Method 2 — look at $f(k+1)-Rf(k)$.</b> Choose $R$ (normally the base of the dominant power) so the difference is visibly a multiple of $m$. Then $f(k+1)=Rf(k)+(\text{multiple of }m)$, a sum of two multiples of $m$.</p>`,
  B.ex(1, T`Prove that $5^{2n}-1$ is divisible by $24$ for all $n\in\mathbb Z^+$.`, [
    T`<b>Basis.</b> $n=1$: $5^2-1=24=24\times1$. ✓`,
    T`<b>Assume</b> $5^{2k}-1=24A$ for some integer $A$, so $5^{2k}=24A+1$.`,
    T`<b>Step.</b> $f(k+1)=5^{2k+2}-1=25\cdot5^{2k}-1=25(24A+1)-1=24\cdot25A+24=24(25A+1)$.`,
    T`$25A+1$ is an integer, so $f(k+1)$ is divisible by 24.`,
    T`<b>Conclusion.</b> True for $n=1$ and true for $n=k\Rightarrow$ true for $n=k+1$, so true for all $n\in\mathbb Z^+$.`]),
  B.ex(2, T`Prove that $2^{n+2}+3^{2n+1}$ is divisible by $7$ for all $n\ge1$.`, [
    T`Basis: $2^3+3^3=8+27=35=7\times5$. ✓`,
    T`Assume $f(k)=2^{k+2}+3^{2k+1}=7A$.`,
    T`$f(k+1)=2^{k+3}+3^{2k+3}=2\cdot2^{k+2}+9\cdot3^{2k+1}$.`,
    T`Split the 9 as $2+7$: $\;=2\left(2^{k+2}+3^{2k+1}\right)+7\cdot3^{2k+1}=2(7A)+7\cdot3^{2k+1}=7\left(2A+3^{2k+1}\right)$. ✓ Conclude.`], T`The trick "split the larger multiplier into the smaller one plus a multiple of 7" is Method 2 with $R=2$.`),
  B.ex(3, T`Prove that $n^3+2n$ is divisible by $3$ for all $n\in\mathbb Z^+$.`, [
    T`Basis: $1+2=3$. ✓ Assume $k^3+2k=3A$.`,
    T`$(k+1)^3+2(k+1)=k^3+3k^2+3k+1+2k+2=(k^3+2k)+3k^2+3k+3$.`,
    T`$=3A+3(k^2+k+1)=3(A+k^2+k+1)$. ✓ Conclude.`]),
  T`<h3>2. Powers of matrices</h3>
<p>To prove a formula for $\mathbf M^n$, use $\mathbf M^{k+1}=\mathbf M^k\mathbf M$ (or $\mathbf M\mathbf M^k$ — both are fine because powers of the same matrix commute). Multiply out and compare each entry with the formula at $n=k+1$.</p>`,
  B.ex(4, T`$\mathbf M=\begin{pmatrix}3&-4\\1&-1\end{pmatrix}$. Prove that $\mathbf M^n=\begin{pmatrix}1+2n&-4n\\n&1-2n\end{pmatrix}$ for all $n\in\mathbb Z^+$.`, [
    T`Basis: $n=1$ gives $\begin{pmatrix}3&-4\\1&-1\end{pmatrix}=\mathbf M$. ✓`,
    T`Assume $\mathbf M^k=\begin{pmatrix}1+2k&-4k\\k&1-2k\end{pmatrix}$.`,
    T`$\mathbf M^{k+1}=\begin{pmatrix}1+2k&-4k\\k&1-2k\end{pmatrix}\begin{pmatrix}3&-4\\1&-1\end{pmatrix}=\begin{pmatrix}3+6k-4k&-4-8k+4k\\3k+1-2k&-4k-1+2k\end{pmatrix}$`,
    T`$=\begin{pmatrix}3+2k&-4-4k\\k+1&-1-2k\end{pmatrix}=\begin{pmatrix}1+2(k+1)&-4(k+1)\\k+1&1-2(k+1)\end{pmatrix}$. ✓ Conclude.`]),
  B.tip(T`<p>De Moivre's theorem, $(\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta$, is proved by exactly this kind of induction — see chapter 3.2.</p>`),
  B.warn([T`Saying "$f(k+1)$ is divisible by 7" without showing it as $7\times(\text{integer})$.`, T`Forgetting that the quotient must be an <i>integer</i> — say so.`, T`In matrix proofs, multiplying in an order that doesn't match your formula and then getting lost: write the product out entry by entry.`]),
  B.exam([T`Show the factorised final form, e.g. $7(2A+3^{2k+1})$, and state that the bracket is an integer.`, T`Method 2 ($f(k+1)-Rf(k)$) is often faster; say what you're doing in words.`]),
  B.checks([
    [T`Prove $7^n-3^n$ is divisible by 4.`, T`Basis: $7-3=4$. $f(k+1)-7f(k)=7^{k+1}-3^{k+1}-7^{k+1}+7\cdot3^k=4\cdot3^k$, so $f(k+1)=7f(k)+4\cdot3^k$, a sum of multiples of 4.`],
    [T`$\mathbf M=\begin{pmatrix}1&a\\0&1\end{pmatrix}$. Guess and prove a formula for $\mathbf M^n$.`, T`$\mathbf M^n=\begin{pmatrix}1&na\\0&1\end{pmatrix}$. Step: $\begin{pmatrix}1&ka\\0&1\end{pmatrix}\begin{pmatrix}1&a\\0&1\end{pmatrix}=\begin{pmatrix}1&(k+1)a\\0&1\end{pmatrix}$.`]]),
  B.examq(6, T`<p>Prove by induction that $f(n)=3^{2n}+7$ is divisible by $8$ for all positive integers $n$.</p>`,
    T`<p>$f(1)=9+7=16=8\times2$ <span class="mk">B1</span></p>
<p>Assume $3^{2k}+7=8A$ for some integer $A$ <span class="mk">M1</span></p>
<p>$f(k+1)=9\cdot3^{2k}+7=9(8A-7)+7=72A-56=8(9A-7)$ <span class="mk">M1 A1 A1</span></p>
<p>$9A-7\in\mathbb Z$, so divisible by 8; true for $n=1$ and $n=k\Rightarrow n=k+1$, hence for all $n\in\mathbb Z^+$. <span class="mk">A1</span></p>`),
  B.key([T`Divisibility: write $f(k)=mA$; show $f(k+1)=m\times(\text{integer})$.`, T`Matrices: $\mathbf M^{k+1}=\mathbf M^k\mathbf M$; compare every entry.`]),
].join('');

/* ===================================================================== */
BOOK.pi3 = [
  B.why(T`<p>A <b>recurrence relation</b> tells you how to get each term from the previous one(s), e.g. $u_{n+1}=2u_n-1$. It's easy to compute terms one by one but hard to jump to $u_{100}$. A <b>closed form</b> $u_n=f(n)$ jumps straight there — and induction is the natural way to prove a closed form correct, because the recurrence <i>is</i> the "next domino" rule.</p>`),
  B.ex(1, T`$u_1=3$ and $u_{n+1}=2u_n-1$. Prove that $u_n=2^n+1$.`, [
    T`Basis: $2^1+1=3=u_1$. ✓`,
    T`Assume $u_k=2^k+1$.`,
    T`$u_{k+1}=2u_k-1=2(2^k+1)-1=2^{k+1}+1$. ✓`,
    T`Conclusion: true for $n=1$ and $n=k\Rightarrow n=k+1$, hence for all $n\in\mathbb Z^+$.`]),
  T`<h3>1. Where do closed forms come from?</h3>
<p>For a first-order linear recurrence $u_{n+1}=ku_n+c$ with $k\ne1$:</p>
<ol><li>Find the <b>fixed point</b> $L$ with $L=kL+c$, i.e. $L=\dfrac{c}{1-k}$.</li>
<li>Subtract: $u_{n+1}-L=k(u_n-L)$, so $u_n-L$ is geometric with ratio $k$.</li>
<li>Hence $u_n=L+(u_1-L)k^{n-1}$.</li></ol>
<p>In Example 1: $L=\frac{-1}{1-2}=1$, so $u_n=1+(3-1)2^{n-1}=1+2^n$. ✓</p>`,
  B.ex(2, T`$u_1=1$ and $u_{n+1}=\dfrac{u_n}{1+u_n}$. Prove that $u_n=\dfrac1n$.`, [
    T`Basis: $u_1=1=\frac11$. ✓ Assume $u_k=\frac1k$.`,
    T`$u_{k+1}=\dfrac{1/k}{1+1/k}=\dfrac{1/k}{(k+1)/k}=\dfrac{1}{k+1}$. ✓ Conclude.`]),
  T`<h3>2. Two-term recurrences need two base cases</h3>
<p>If $u_{n+2}$ depends on $u_{n+1}$ <i>and</i> $u_n$, the step "assume true for $k$" isn't enough — you need it true for <b>both</b> $k$ and $k+1$ to get $k+2$. So check two base cases and assume two consecutive terms.</p>`,
  B.ex(3, T`$u_1=1$, $u_2=5$, $u_{n+2}=5u_{n+1}-6u_n$. Prove $u_n=3^n-2^n$.`, [
    T`Basis: $3-2=1=u_1$ and $9-4=5=u_2$. ✓ (both)`,
    T`Assume $u_k=3^k-2^k$ and $u_{k+1}=3^{k+1}-2^{k+1}$.`,
    T`$u_{k+2}=5(3^{k+1}-2^{k+1})-6(3^k-2^k)=3^k(15-6)-2^k(10-6)=9\cdot3^k-4\cdot2^k$.`,
    T`$=3^{k+2}-2^{k+2}$. ✓ So true for $n=1,2$ and (true for $k,k+1$) $\Rightarrow$ (true for $k+2$); hence true for all $n$.`], T`Where does $3^n-2^n$ come from? Try $u_n=t^n$: $t^2=5t-6$ gives $t=2,3$, so $u_n=A\cdot3^n+B\cdot2^n$ — the same idea as the auxiliary equation for differential equations (chapter 7.2).`),
  B.warn([T`Only one base case for a two-term recurrence.`, T`Using the closed form for $u_{k+1}$ while proving it — you may only use the recurrence and the assumption.`]),
  B.checks([[T`$u_1=4$, $u_{n+1}=3u_n-2$. Find and prove a closed form.`, T`Fixed point $L=1$: $u_n=1+3\cdot3^{n-1}=3^n+1$. Step: $3(3^k+1)-2=3^{k+1}+1$.`],
    [T`$u_1=2$, $u_{n+1}=u_n+2n+2$. Show $u_n=n(n+1)$.`, T`Basis $1\cdot2=2$. $u_{k+1}=k(k+1)+2k+2=(k+1)(k+2)$. ✓`]]),
  B.examq(5, T`<p>A sequence is defined by $u_1=5$, $u_{n+1}=3u_n-4$. Prove by induction that $u_n=3^n+2$.</p>`,
    T`<p>$n=1$: $3+2=5$ ✓ <span class="mk">B1</span> &nbsp; Assume $u_k=3^k+2$ <span class="mk">M1</span></p>
<p>$u_{k+1}=3(3^k+2)-4=3^{k+1}+2$ <span class="mk">M1 A1</span>; conclusion <span class="mk">A1</span></p>`),
  B.key([T`Recurrence = the domino rule. Substitute the assumption into the recurrence.`, T`$u_{n+1}=ku_n+c$: closed form $L+(u_1-L)k^{n-1}$, $L=\frac{c}{1-k}$.`, T`Two-term recurrences: two base cases.`]),
].join('');

/* ===================================================================== */
BOOK.al1 = [
  B.why(T`<p>Adding fractions is easy: $\frac{2}{x-1}+\frac{3}{x+2}=\frac{5x+1}{(x-1)(x+2)}$. <b>Partial fractions</b> runs this backwards — splitting one complicated fraction into simple ones. You need it constantly in A2 1: to <b>integrate</b> rational functions (6.1), to sum series by the <b>method of differences</b> (2.2), and for series expansions.</p>`),
  B.def('proper and improper', T`<p>A rational function $\frac{N(x)}{D(x)}$ is <b>proper</b> if $\deg N\lt\deg D$, otherwise <b>improper</b>. Partial fractions applies directly only to proper fractions; for improper ones, <b>divide first</b>.</p>`),
  T`<h3>1. The forms</h3>
<table class="tbl"><tr><th>Factor in the denominator</th><th>Contributes</th><th>Why</th></tr>
<tr><td>$(ax+b)$</td><td>$\dfrac{A}{ax+b}$</td><td>one unknown for one linear factor</td></tr>
<tr><td>$(ax+b)^2$</td><td>$\dfrac{A}{ax+b}+\dfrac{B}{(ax+b)^2}$</td><td>a squared factor carries degree 2, so it needs 2 unknowns</td></tr>
<tr><td>$(x^2+c)$, $c\gt0$</td><td>$\dfrac{Ax+B}{x^2+c}$</td><td>quadratic factor, degree 2, needs a linear numerator</td></tr></table>
<p><b>Counting check:</b> the total number of unknowns always equals $\deg D$. That's a quick way to know you've set it up correctly.</p>`,
  B.thm('Why it works — identities', T`<p>When we write $\dfrac{5x+1}{(x-1)(x+2)}\equiv\dfrac{A}{x-1}+\dfrac{B}{x+2}$, the $\equiv$ means "equal for <b>every</b> $x$" (where defined). Multiplying through by the denominator gives a polynomial identity $5x+1\equiv A(x+2)+B(x-1)$, which is then true for <i>all</i> $x$, including $x=1$ and $x=-2$. That justifies substituting those values.</p>`),
  T`<h3>2. Two ways to find the constants</h3>
<ul><li><b>Substitution</b>: put $x$ = each root of the denominator; most terms vanish.</li>
<li><b>Equating coefficients</b>: compare the coefficients of $x^2$, $x$ and the constant on both sides. Use this for whatever substitution can't reach (e.g. the middle constant of a repeated factor, or the $Ax+B$ of a quadratic).</li></ul>`,
  B.ex(1, T`Express $\dfrac{5x+1}{(x-1)(x+2)}$ in partial fractions.`, [
    T`Set up: $\dfrac{5x+1}{(x-1)(x+2)}\equiv\dfrac{A}{x-1}+\dfrac{B}{x+2}$, so $5x+1\equiv A(x+2)+B(x-1)$.`,
    T`$x=1$: $6=3A\Rightarrow A=2$.`,
    T`$x=-2$: $-9=-3B\Rightarrow B=3$.`,
    T`Answer: $\dfrac{2}{x-1}+\dfrac{3}{x+2}$. Check at $x=0$: LHS $=\frac{1}{-2}$, RHS $=-2+\frac32=-\frac12$. ✓`]),
  B.ex(2, T`Express $\dfrac{1}{x(x+1)^2}$ in partial fractions.`, [
    T`Repeated factor, so $\dfrac{1}{x(x+1)^2}\equiv\dfrac Ax+\dfrac{B}{x+1}+\dfrac{C}{(x+1)^2}$, giving $1\equiv A(x+1)^2+Bx(x+1)+Cx$.`,
    T`$x=0$: $1=A$. $\;x=-1$: $1=-C\Rightarrow C=-1$.`,
    T`$B$ can't be reached by substitution. Compare $x^2$: $0=A+B\Rightarrow B=-1$.`,
    T`Answer: $\dfrac1x-\dfrac1{x+1}-\dfrac1{(x+1)^2}$.`]),
  B.ex(3, T`Express $\dfrac{2x^2-x+3}{(x-1)(x^2+1)}$ in partial fractions.`, [
    T`$\equiv\dfrac{A}{x-1}+\dfrac{Bx+C}{x^2+1}$, so $2x^2-x+3\equiv A(x^2+1)+(Bx+C)(x-1)$.`,
    T`$x=1$: $4=2A\Rightarrow A=2$.`,
    T`$x^2$: $2=A+B\Rightarrow B=0$. Constant: $3=A-C\Rightarrow C=-1$.`,
    T`Answer: $\dfrac{2}{x-1}-\dfrac{1}{x^2+1}$.`]),
  B.ex(4, T`Express $\dfrac{x^2+3x+4}{(x+1)(x+2)}$ in partial fractions.`, [
    T`Improper (degree 2 over degree 2). Divide: $(x+1)(x+2)=x^2+3x+2$, so $\dfrac{x^2+3x+4}{x^2+3x+2}=1+\dfrac{2}{(x+1)(x+2)}$.`,
    T`$\dfrac{2}{(x+1)(x+2)}\equiv\dfrac{A}{x+1}+\dfrac{B}{x+2}$: $x=-1\Rightarrow A=2$, $x=-2\Rightarrow B=-2$.`,
    T`Answer: $1+\dfrac2{x+1}-\dfrac2{x+2}$.`]),
  B.tip(T`<p><b>Cover-up rule</b> (for a non-repeated linear factor): to find $A$ over $(x-a)$, cover up $(x-a)$ in the original fraction and substitute $x=a$ into what's left. In Example 1: cover $(x-1)$, put $x=1$: $\frac{5+1}{1+2}=2$. It's the substitution method done mentally.</p>`),
  B.warn([T`Using $\dfrac{A}{x^2+1}$ instead of $\dfrac{Ax+B}{x^2+1}$.`, T`Only one term for a repeated factor: $(x+1)^2$ needs both $\frac{B}{x+1}$ and $\frac{C}{(x+1)^2}$.`, T`Not dividing first when the fraction is improper.`, T`Arithmetic slips with negatives in substitution — always check with one extra value of $x$.`]),
  B.exam([T`"Express in partial fractions" usually leads to a "hence" part (integrate or sum). Get the constants right — later marks depend on them.`, T`Write the identity line explicitly; it often carries a method mark.`]),
  B.checks([
    [T`$\dfrac{3x}{(x-2)(x+1)}$`, T`$\dfrac{2}{x-2}+\dfrac{1}{x+1}$.`],
    [T`$\dfrac{x+5}{(x+1)(x+2)^2}$`, T`$\dfrac4{x+1}-\dfrac4{x+2}-\dfrac3{(x+2)^2}$ (check at $x=0$: $\frac54=4-2-\frac34$ ✓).`],
    [T`$\dfrac{2x^2+5x+1}{x^2+x}$`, T`Divide: $2+\dfrac{3x+1}{x(x+1)}=2+\dfrac1x+\dfrac2{x+1}$.`]]),
  B.examq(5, T`<p>Express $\dfrac{3x^2+3}{(x+1)(x^2+2)}$ in partial fractions.</p>`,
    T`<p>$3x^2+3\equiv A(x^2+2)+(Bx+C)(x+1)$ <span class="mk">M1</span></p>
<p>$x=-1$: $6=3A$, $A=2$ <span class="mk">A1</span>; $x^2$: $3=A+B$, $B=1$ <span class="mk">A1</span>; constant: $3=2A+C$, $C=-1$ <span class="mk">A1</span></p>
<p>$\dfrac{2}{x+1}+\dfrac{x-1}{x^2+2}$ <span class="mk">A1</span></p>`),
  B.key([T`Number of unknowns = degree of denominator.`, T`Linear $\to\frac{A}{ax+b}$; repeated $\to$ two terms; quadratic $\to\frac{Ax+B}{x^2+c}$.`, T`Improper: divide first.`]),
].join('');

/* ===================================================================== */
BOOK.al2 = [
  B.why(T`<p>How big is $1^2+2^2+\dots+100^2$? Adding 100 terms is slow; a formula gives it instantly. This chapter does two things: it <b>derives</b> the standard formulae for $\sum r$, $\sum r^2$, $\sum r^3$, and it teaches the <b>method of differences</b>, the main technique for summing series that the standard formulae can't handle.</p>`),
  T`<h3>1. Sigma notation rules</h3>
<ul><li>Linearity: $\sum(au_r+bv_r)=a\sum u_r+b\sum v_r$.</li>
<li>Constants: $\displaystyle\sum_{r=1}^{n}c=cn$ (there are $n$ terms, each $c$).</li>
<li>Changing the start: $\displaystyle\sum_{r=m}^{n}u_r=\sum_{r=1}^{n}u_r-\sum_{r=1}^{m-1}u_r$ — note the $m-1$.</li></ul>`,
  B.thm('Standard results', T`$$\sum_{r=1}^n r=\tfrac12n(n+1),\qquad\sum_{r=1}^n r^2=\tfrac16n(n+1)(2n+1),\qquad\sum_{r=1}^n r^3=\tfrac14n^2(n+1)^2$$`),
  B.proof(T`<p><b>$\sum r$ (Gauss's trick).</b> Write $S=1+2+\dots+n$ and also $S=n+(n-1)+\dots+1$. Adding term by term, each of the $n$ pairs sums to $n+1$, so $2S=n(n+1)$.</p>
<p><b>$\sum r^2$ (telescoping).</b> Expand $(r+1)^3-r^3=3r^2+3r+1$. Sum both sides from $r=1$ to $n$. The left side telescopes (everything cancels except the ends):</p>
$$\sum_{r=1}^{n}\left[(r+1)^3-r^3\right]=(n+1)^3-1.$$
<p>So $(n+1)^3-1=3S_2+3\cdot\tfrac12n(n+1)+n$, where $S_2=\sum r^2$. Then</p>
$$\begin{aligned}3S_2&=n^3+3n^2+3n-\tfrac32n(n+1)-n=\tfrac12\left(2n^3+6n^2+4n-3n^2-3n\right)\\&=\tfrac12\left(2n^3+3n^2+n\right)=\tfrac12n(n+1)(2n+1),\end{aligned}$$
<p>giving $S_2=\tfrac16n(n+1)(2n+1)$.</p>
<p><b>$\sum r^3$.</b> Similarly $(r+1)^4-r^4=4r^3+6r^2+4r+1$, so $(n+1)^4-1=4S_3+6S_2+4S_1+n$. Using $6S_2=n(n+1)(2n+1)$, $4S_1=2n(n+1)$ and $-1-n=-(n+1)$:</p>
$$4S_3=(n+1)\left[(n+1)^3-1-n(2n+1)-2n\right]=(n+1)\left[n^3+n^2\right]=n^2(n+1)^2.$$`, 'Derivations'),
  B.tip(T`<p>Notice $\sum r^3=\left(\sum r\right)^2$: $\;1^3+2^3+3^3=36=(1+2+3)^2$.</p>`),
  B.ex(1, T`Show that $\displaystyle\sum_{r=1}^{n}r(r+3)=\tfrac13n(n+1)(n+5)$.`, [
    T`$\sum r(r+3)=\sum r^2+3\sum r=\tfrac16n(n+1)(2n+1)+\tfrac32n(n+1)$.`,
    T`Factor out $\tfrac16n(n+1)$: $=\tfrac16n(n+1)\left[(2n+1)+9\right]=\tfrac16n(n+1)(2n+10)$.`,
    T`$=\tfrac13n(n+1)(n+5)$. ✓`]),
  B.ex(2, T`Evaluate $\displaystyle\sum_{r=11}^{20}r^2$.`, [
    T`$=\sum_{r=1}^{20}r^2-\sum_{r=1}^{10}r^2$.`,
    T`$\tfrac16(20)(21)(41)=2870$ and $\tfrac16(10)(11)(21)=385$.`,
    T`Answer $2870-385=2485$.`]),
  T`<h3>2. The method of differences</h3>`,
  B.thm('Telescoping', T`<p>If each term can be written as a difference $u_r=f(r)-f(r+1)$, then</p>
$$\sum_{r=1}^{n}u_r=f(1)-f(n+1).$$`),
  B.proof(T`<p>Write the terms in a column:</p>
$$\begin{aligned}u_1&=f(1)-f(2)\\u_2&=f(2)-f(3)\\&\ \ \vdots\\u_n&=f(n)-f(n+1)\end{aligned}$$
<p>Adding, every $f(2),\dots,f(n)$ appears once with $+$ and once with $-$, so only $f(1)-f(n+1)$ survives.</p>`),
  B.ex(3, T`Find $\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+1)}$ and the sum to infinity.`, [
    T`Partial fractions: $\dfrac{1}{r(r+1)}=\dfrac1r-\dfrac1{r+1}$, so $f(r)=\frac1r$.`,
    T`Write out: $\left(1-\tfrac12\right)+\left(\tfrac12-\tfrac13\right)+\dots+\left(\tfrac1n-\tfrac1{n+1}\right)$.`,
    T`Everything cancels except $1-\dfrac1{n+1}=\dfrac{n}{n+1}$.`,
    T`As $n\to\infty$, $\frac1{n+1}\to0$, so the sum to infinity is $1$.`]),
  B.ex(4, T`Find $\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+2)}$.`, [
    T`$\dfrac1{r(r+2)}=\dfrac12\left(\dfrac1r-\dfrac1{r+2}\right)$. Now the cancellation is "two apart".`,
    T`Write the terms: $\tfrac12\Big[\left(1-\tfrac13\right)+\left(\tfrac12-\tfrac14\right)+\left(\tfrac13-\tfrac15\right)+\dots+\left(\tfrac1{n-1}-\tfrac1{n+1}\right)+\left(\tfrac1n-\tfrac1{n+2}\right)\Big]$.`,
    T`Survivors: the first two positives $1,\tfrac12$ and the last two negatives: $\tfrac12\left(\tfrac32-\tfrac1{n+1}-\tfrac1{n+2}\right)$.`,
    T`Simplify: $=\dfrac34-\dfrac{2n+3}{2(n+1)(n+2)}$. Sum to infinity $\tfrac34$.`], T`Always write out enough terms at <b>both</b> ends to see which survive.`),
  B.warn([T`$\sum_{r=1}^n 5=5$ — wrong, it's $5n$.`, T`$\sum_{r=m}^n=S(n)-S(m)$ — wrong, it's $S(n)-S(m-1)$.`, T`Missing survivors in a "two-apart" telescope.`]),
  B.exam([T`Show the written-out terms with the cancellation visible — it's usually where the method mark is.`, T`For "show that", factorise to exactly the given form.`]),
  B.checks([[T`$\sum_{r=1}^n(6r^2+2r)$ in factorised form.`, T`$n(n+1)(2n+1)+n(n+1)=n(n+1)(2n+2)=2n(n+1)^2$.`],
    [T`$\sum_{r=1}^n\left[(r+1)^2-r^2\right]$`, T`Telescopes: $(n+1)^2-1=n^2+2n$ (also $=\sum(2r+1)$ ✓).`]]),
  B.examq(7, T`<p>(a) Show that $\dfrac{1}{r(r+1)(r+2)}=\dfrac12\left[\dfrac{1}{r(r+1)}-\dfrac{1}{(r+1)(r+2)}\right]$. (b) Hence find $\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+1)(r+2)}$. (c) Deduce the sum to infinity.</p>`,
    T`<p>(a) $\dfrac{1}{r(r+1)}-\dfrac{1}{(r+1)(r+2)}=\dfrac{(r+2)-r}{r(r+1)(r+2)}=\dfrac{2}{r(r+1)(r+2)}$ <span class="mk">M1 A1</span></p>
<p>(b) With $f(r)=\frac1{r(r+1)}$, the sum is $\tfrac12\left[f(1)-f(n+1)\right]=\tfrac12\left[\tfrac12-\tfrac1{(n+1)(n+2)}\right]=\tfrac14-\tfrac1{2(n+1)(n+2)}$ <span class="mk">M1 M1 A1</span></p>
<p>(c) As $n\to\infty$ the second term $\to0$: sum to infinity $=\tfrac14$ <span class="mk">M1 A1</span></p>`),
  B.key([T`$\sum r,\ \sum r^2,\ \sum r^3$ formulae and their telescoping derivations.`, T`Method of differences: $u_r=f(r)-f(r+1)\Rightarrow\sum=f(1)-f(n+1)$.`, T`Sum to infinity = limit of the sum as $n\to\infty$.`]),
].join('');

/* ===================================================================== */
BOOK.sr1 = [
  B.why(T`<p>Your calculator doesn't "know" $\sin(0.3)$. It uses a <b>polynomial</b> that behaves like $\sin x$ near $0$. Maclaurin series are those polynomials, extended forever. They turn awkward functions into polynomials you can differentiate, integrate and take limits of — and they're the bridge to Euler's formula $e^{i\theta}=\cos\theta+i\sin\theta$.</p>`),
  B.pre(T`<p>Differentiation of $e^x$, $\sin$, $\cos$, $\ln$, chain rule; factorials ($4!=24$); binomial expansion.</p>`),
  B.thm('Maclaurin series', T`$$f(x)=f(0)+f'(0)\,x+\frac{f''(0)}{2!}x^2+\frac{f'''(0)}{3!}x^3+\dots+\frac{f^{(r)}(0)}{r!}x^r+\dots$$`),
  B.proof(T`<p>Suppose $f$ can be written as a power series $f(x)=a_0+a_1x+a_2x^2+a_3x^3+\cdots$. We find the coefficients by matching derivatives at $0$:</p>
<ul><li>Put $x=0$: $f(0)=a_0$.</li>
<li>Differentiate: $f'(x)=a_1+2a_2x+3a_3x^2+\cdots$, so $f'(0)=a_1$.</li>
<li>Again: $f''(x)=2a_2+3\cdot2a_3x+\cdots$, so $f''(0)=2a_2$, i.e. $a_2=\frac{f''(0)}{2!}$.</li>
<li>Again: $f'''(0)=3\cdot2\cdot1\,a_3$, so $a_3=\frac{f'''(0)}{3!}$.</li></ul>
<p>In general, differentiating $r$ times kills every term below $x^r$ and turns $a_rx^r$ into $r!\,a_r$, so $a_r=\dfrac{f^{(r)}(0)}{r!}$.</p>`, 'Where the formula comes from'),
  T`<h3>1. Deriving the standard series</h3>`,
  B.ex(1, T`Find the Maclaurin series of $e^x$.`, [
    T`Every derivative of $e^x$ is $e^x$, so $f^{(r)}(0)=1$ for all $r$.`,
    T`$e^x=1+x+\dfrac{x^2}{2!}+\dfrac{x^3}{3!}+\cdots=\displaystyle\sum_{r=0}^{\infty}\frac{x^r}{r!}$, valid for all $x$.`]),
  B.ex(2, T`Find the Maclaurin series of $\sin x$ and $\cos x$.`, [
    T`For $\sin x$: derivatives cycle $\sin,\cos,-\sin,-\cos,\sin,\dots$; at $0$: $0,1,0,-1,0,1,\dots$`,
    T`So $\sin x=x-\dfrac{x^3}{3!}+\dfrac{x^5}{5!}-\cdots$ (only odd powers — $\sin$ is an odd function).`,
    T`Differentiate term by term (or repeat the method): $\cos x=1-\dfrac{x^2}{2!}+\dfrac{x^4}{4!}-\cdots$ (only even powers).`]),
  B.ex(3, T`Find the Maclaurin series of $\ln(1+x)$.`, [
    T`$f=\ln(1+x)$, $f'=(1+x)^{-1}$, $f''=-(1+x)^{-2}$, $f'''=2(1+x)^{-3}$, $f^{(4)}=-6(1+x)^{-4}$.`,
    T`At $0$: $0,\ 1,\ -1,\ 2,\ -6$; generally $f^{(r)}(0)=(-1)^{r+1}(r-1)!$.`,
    T`Coefficients $\frac{(-1)^{r+1}(r-1)!}{r!}=\frac{(-1)^{r+1}}{r}$: $\;\ln(1+x)=x-\dfrac{x^2}{2}+\dfrac{x^3}{3}-\dfrac{x^4}{4}+\cdots$`,
    T`Valid only for $-1\lt x\le1$. (Note: $\ln x$ itself has <b>no</b> Maclaurin series, because $\ln 0$ is undefined.)`]),
  T`<table class="tbl"><tr><th>Series</th><th>Valid for</th></tr>
<tr><td>$e^x=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$</td><td>all $x$</td></tr>
<tr><td>$\sin x=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots$</td><td>all $x$</td></tr>
<tr><td>$\cos x=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots$</td><td>all $x$</td></tr>
<tr><td>$\ln(1+x)=x-\frac{x^2}2+\frac{x^3}3-\cdots$</td><td>$-1\lt x\le1$</td></tr>
<tr><td>$(1+x)^n=1+nx+\frac{n(n-1)}{2!}x^2+\cdots$</td><td>$|x|\lt1$ (all $x$ if $n\in\mathbb N$)</td></tr></table>`,
  T`<h3>2. Composite functions — the fast way</h3>
<p>Don't differentiate again and again. Build new series from known ones:</p>
<ul><li><b>Substitute</b>: $e^{2x}=1+2x+\frac{(2x)^2}{2!}+\cdots=1+2x+2x^2+\frac43x^3+\cdots$; $\;\cos(x^2)=1-\frac{x^4}{2}+\cdots$</li>
<li><b>Multiply</b> two series, keeping only the powers you need.</li>
<li><b>Compose</b>: e.g. $\ln(\cos x)=\ln(1+u)$ with $u=\cos x-1$.</li></ul>`,
  B.ex(4, T`Find the series for $e^x\sin x$ up to $x^3$.`, [
    T`$e^x=1+x+\frac{x^2}2+\cdots$ and $\sin x=x-\frac{x^3}{6}+\cdots$`,
    T`Multiply, collecting each power: $x^1$: $1\cdot x$; $\;x^2$: $x\cdot x$; $\;x^3$: $\frac{x^2}2\cdot x+1\cdot\left(-\frac{x^3}6\right)$.`,
    T`$e^x\sin x=x+x^2+\left(\tfrac12-\tfrac16\right)x^3+\cdots=x+x^2+\tfrac13x^3+\cdots$`]),
  B.ex(5, T`Find the series for $\ln(\cos x)$ up to $x^4$.`, [
    T`$\cos x=1+u$ with $u=-\frac{x^2}{2}+\frac{x^4}{24}-\cdots$`,
    T`$\ln(1+u)=u-\frac{u^2}{2}+\cdots$; we need $u^2$ only up to $x^4$: $u^2=\frac{x^4}{4}+\cdots$`,
    T`$\ln(\cos x)=-\frac{x^2}2+\frac{x^4}{24}-\frac{x^4}{8}+\cdots=-\dfrac{x^2}{2}-\dfrac{x^4}{12}+\cdots$`]),
  B.ex(6, T`Use repeated differentiation to find the first two non-zero terms of $\tan x$.`, [
    T`$f=\tan x$, $f'=\sec^2x$, $f''=2\sec^2x\tan x$, $f'''=2\sec^4x+4\sec^2x\tan^2x$.`,
    T`At $0$: $f=0$, $f'=1$, $f''=0$, $f'''=2$.`,
    T`$\tan x=x+\dfrac{2}{3!}x^3+\cdots=x+\dfrac13x^3+\cdots$`]),
  B.tip(T`<p><b>Euler's formula from series.</b> Put $x=i\theta$ into $e^x$ and use $i^2=-1$, $i^3=-i$, $i^4=1$:</p>
$$e^{i\theta}=1+i\theta-\frac{\theta^2}{2!}-i\frac{\theta^3}{3!}+\frac{\theta^4}{4!}+\cdots=\Big(1-\frac{\theta^2}{2!}+\cdots\Big)+i\Big(\theta-\frac{\theta^3}{3!}+\cdots\Big)=\cos\theta+i\sin\theta.$$`),
  B.warn([T`$(2x)^3=8x^3$, not $2x^3$.`, T`Forgetting the factorials.`, T`Multiplying series and keeping terms beyond the requested power (wasted time) or missing a cross term.`, T`Using $\ln(1+x)$ outside $-1\lt x\le1$.`]),
  B.exam([T`If the question says "using the Maclaurin series for…", use it — repeated differentiation may score nothing.`, T`State the range of validity when asked, e.g. "valid for $-\frac12\lt x\le\frac12$" for $\ln(1+2x)$.`]),
  B.checks([[T`Series for $e^{-x^2}$ up to $x^6$.`, T`$1-x^2+\frac{x^4}2-\frac{x^6}{6}$.`], [T`Series for $\ln(1+2x)$ up to $x^3$, with validity.`, T`$2x-2x^2+\frac83x^3$, valid for $-\frac12\lt x\le\frac12$.`], [T`Estimate $\int_0^{0.5}e^{-x^2}dx$ using three terms.`, T`$\left[x-\frac{x^3}3+\frac{x^5}{10}\right]_0^{0.5}=0.5-0.041\overline6+0.003125\approx0.4615$ (true $0.4613$).`]]),
  B.examq(7, T`<p>$f(x)=e^x\cos x$. (a) Use repeated differentiation to find the Maclaurin series of $f(x)$ up to the term in $x^3$. (b) Hence find $\displaystyle\lim_{x\to0}\frac{e^x\cos x-1-x}{x^3}$.</p>`,
    T`<p>(a) $f'=e^x(\cos x-\sin x)$ <span class="mk">M1</span>, $f''=-2e^x\sin x$ <span class="mk">A1</span>, $f'''=-2e^x(\sin x+\cos x)$ <span class="mk">A1</span></p>
<p>$f(0)=1,\ f'(0)=1,\ f''(0)=0,\ f'''(0)=-2$ <span class="mk">M1</span> $\Rightarrow f(x)=1+x-\tfrac13x^3+\cdots$ <span class="mk">A1</span></p>
<p>(b) $\dfrac{-\frac13x^3+O(x^4)}{x^3}\to-\tfrac13$ <span class="mk">M1 A1</span></p>`),
  B.key([T`$a_r=\dfrac{f^{(r)}(0)}{r!}$.`, T`Know the five standard series and their validity.`, T`Composite: substitute, multiply, compose — don't differentiate unless told.`]),
].join('');

/* ===================================================================== */
BOOK.sr2 = [
  B.why(T`<p>What is $\dfrac{\sin x}{x}$ when $x=0$? The formula gives $\frac00$ — meaningless. But as $x$ gets close to $0$ the value gets close to $1$. Series let you see this: near $0$, $\sin x\approx x$, so the ratio is $\approx1$. This chapter makes that precise.</p>`),
  T`<h3>Method</h3><ol><li>Replace each function by its series, far enough to include at least one term beyond the lowest power in the denominator.</li><li>Cancel the common power of $x$ top and bottom.</li><li>Let $x\to0$: every remaining term with a positive power of $x$ vanishes.</li></ol>`,
  B.ex(1, T`$\displaystyle\lim_{x\to0}\frac{\sin x}{x}$`, [T`$\dfrac{x-\frac{x^3}{6}+\cdots}{x}=1-\dfrac{x^2}{6}+\cdots\to1$.`]),
  B.ex(2, T`$\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}$`, [T`$1-\cos x=\frac{x^2}{2}-\frac{x^4}{24}+\cdots$`, T`Divide by $x^2$: $\frac12-\frac{x^2}{24}+\cdots\to\frac12$.`]),
  B.ex(3, T`$\displaystyle\lim_{x\to0}\frac{x-\ln(1+x)}{x^2}$`, [T`$x-\ln(1+x)=x-\left(x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\right)=\frac{x^2}{2}-\frac{x^3}{3}+\cdots$`, T`Divide by $x^2$ and let $x\to0$: $\frac12$.`]),
  B.ex(4, T`$\displaystyle\lim_{x\to0}\left(\frac1x-\frac1{\sin x}\right)$`, [T`Combine: $\dfrac{\sin x-x}{x\sin x}$.`, T`Top: $-\frac{x^3}{6}+\cdots$. Bottom: $x\left(x-\cdots\right)=x^2+\cdots$`, T`Ratio $=-\frac{x}{6}+\cdots\to0$.`], T`An "$\infty-\infty$" form: combine into one fraction first.`),
  B.warn([T`Not expanding far enough: if everything cancels, you needed another term.`, T`Dividing only some terms by $x^n$.`]),
  B.checks([[T`$\lim_{x\to0}\dfrac{e^{3x}-1}{x}$`, T`$3$.`], [T`$\lim_{x\to0}\dfrac{x\sin x}{1-\cos x}$`, T`$\dfrac{x^2+\cdots}{\frac{x^2}{2}+\cdots}\to2$.`], [T`$\lim_{x\to0}\dfrac{\tan x-x}{x^3}$`, T`$\tan x=x+\frac{x^3}{3}+\cdots$, so $\frac13$.`]]),
  B.examq(4, T`<p>Use series expansions to find $\displaystyle\lim_{x\to0}\frac{e^{2x}-1-2x}{x\sin x}$.</p>`, T`<p>Numerator $=2x^2+\frac43x^3+\cdots$ <span class="mk">M1 A1</span>; denominator $=x^2-\frac{x^4}6+\cdots$ <span class="mk">M1</span>; limit $=2$ <span class="mk">A1</span></p>`),
  B.key([T`Expand, cancel the lowest power, let $x\to0$.`]),
].join('');
