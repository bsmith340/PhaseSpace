// BcsMaths textbook — Further Maths AS 2, Section C: Statistics.
'use strict';

BOOK.f2_samp = [
  B.why(T`<p>A survey is only as good as its sample. Further Maths adds three practical methods to random and stratified sampling — opportunity, quota and cluster — and asks you to judge which suits a situation.</p>`),
  B.def('the five techniques', T`<ul><li><b>Simple random</b>: every sample of size $n$ is equally likely. Needs a sampling frame.</li><li><b>Stratified</b>: random samples from each stratum, sizes proportional to the strata.</li><li><b>Quota</b>: the interviewer fills a quota for each group (e.g. 20 men, 20 women) with whoever they choose — not random.</li><li><b>Opportunity</b> (convenience): whoever is available.</li><li><b>Cluster</b>: divide into clusters (schools, streets), pick some clusters at random, then sample within them.</li></ul>`),
  T`<table class="tbl"><tr><th>Technique</th><th>Advantages</th><th>Disadvantages</th></tr><tr><td>Simple random</td><td>free from bias</td><td>needs a full list; small groups may be missed</td></tr><tr><td>Stratified</td><td>every group represented in proportion</td><td>needs strata sizes and lists</td></tr><tr><td>Quota</td><td>quick, cheap, no list needed</td><td>interviewer bias; non-random</td></tr><tr><td>Opportunity</td><td>very easy</td><td>usually unrepresentative</td></tr><tr><td>Cluster</td><td>cheap when the population is spread out</td><td>clusters may not reflect the population</td></tr></table>`,
  B.ex(1, T`A market researcher must interview $30$ people under $30$ and $30$ people over $30$ in a shopping centre. Name the method and give one disadvantage.`, [T`Quota sampling.`, T`The interviewer chooses who to approach, so it is not random — e.g. friendly-looking shoppers are over-represented.`]),
  B.ex(2, T`A council wants the views of households in a large rural county. Suggest a method.`, [T`Cluster sampling: choose some villages at random and survey households within them. It cuts travel; the risk is that the chosen villages are unusual.`]),
  B.warn([T`Calling quota sampling random.`, T`Confusing strata (every one sampled) with clusters (only some sampled).`]),
  B.exam([T`Disadvantages must be in context: say <i>who</i> would be over- or under-represented.`]),
  B.checks([[T`Which method guarantees proportional representation of year groups?`, T`Stratified.`], [T`What does a simple random sample need that a quota sample doesn't?`, T`A sampling frame (list).`]]),
  B.examq(6, T`<p>A school has $1200$ pupils in five year groups of sizes $300$, $240$, $240$, $240$ and $180$.</p><p>(a) Describe how to select a stratified sample of $60$ pupils. <span class="mk">[2]</span> (b) Explain the difference between a quota sample and a stratified sample. <span class="mk">[2]</span> (c) Explain why cluster sampling might be used to survey pupils across many schools. <span class="mk">[2]</span></p>`,
    T`<p>(a) $15,12,12,12,9$ pupils from the year groups <span class="mk">B1</span>, chosen by simple random sampling within each year (number the pupils, use random numbers) <span class="mk">B1</span>.</p><p>(b) Both fix the numbers from each group, but stratified sampling chooses randomly within groups while quota sampling lets the interviewer choose <span class="mk">B1 B1</span>.</p><p>(c) Choosing a few schools at random and surveying within them is cheaper and quicker than visiting every school <span class="mk">B1</span>; but the chosen schools may not be typical <span class="mk">B1</span>.</p>`),
  B.key([T`Random, stratified, quota, opportunity, cluster.`, T`Critique in context.`]),
].join('');

BOOK.f2_perm = [
  B.why(T`<p>Counting carefully is the engine behind probability: lotteries, passwords, seating plans, committees. Two questions decide the formula — does order matter, and are any objects identical?</p>`),
  B.thm('Arrangements and selections', T`<ul><li>$n$ distinct objects in a line: $n!$ ways.</li><li>Arrangements of $r$ from $n$ (order matters): $^n\mathrm P_r=\dfrac{n!}{(n-r)!}$.</li><li>Selections of $r$ from $n$ (order doesn't matter): $^n\mathrm C_r=\dbinom nr=\dfrac{n!}{r!(n-r)!}$.</li></ul>`),
  B.proof(T`<p>Filling $r$ places from $n$ objects: $n$ choices for the first, $n-1$ for the second, …, $n-r+1$ for the $r$th, giving $\frac{n!}{(n-r)!}$. Each selection of $r$ objects can be ordered in $r!$ ways, so the number of selections is $\frac{^n\mathrm P_r}{r!}$.</p>`),
  B.thm('Repetitions and restrictions', T`<ul><li>$n$ objects with $p$ identical of one type, $q$ of another, …: $\dfrac{n!}{p!\,q!\cdots}$.</li><li>"Together": glue the group into one block, arrange the blocks, then arrange within the block.</li><li>"Not together": total minus together (for two objects), or arrange the others and slot into the gaps.</li><li>Around a circle: $(n-1)!$.</li></ul>`),
  B.ex(1, T`How many arrangements are there of the letters of MISSISSIPPI?`, [T`$11$ letters: I×4, S×4, P×2. $\frac{11!}{4!\,4!\,2!}=34\,650$.`]),
  B.ex(2, T`Six people sit in a row. In how many ways can Amy and Ben sit (a) together, (b) apart?`, [T`(a) Block AB: $5!\times2!=240$.`, T`(b) $6!-240=480$.`]),
  B.ex(3, T`How many even four-digit numbers can be made from the digits $1$–$6$ without repetition?`, [T`Last digit even: $3$ choices; then $5\times4\times3$ for the others: $180$.`], T`Deal with the restricted position first.`),
  B.warn([T`Using $^n\mathrm P_r$ for a committee (order doesn't matter).`, T`Forgetting to arrange the people inside a "together" block.`]),
  B.exam([T`State the method in words ("treat the Ls as one item") before the arithmetic.`]),
  B.checks([[T`$^7\mathrm P_4$?`, T`$840$.`], [T`$\binom94$?`, T`$126$.`], [T`Arrangements of 6 people at a round table?`, T`$120$.`]]),
  B.examq(8, T`<p>Consider the letters of the word PARALLEL.</p><p>(a) How many different arrangements are there? <span class="mk">[2]</span> (b) In how many of these are the three Ls together? <span class="mk">[3]</span> (c) In how many do the arrangements begin and end with A? <span class="mk">[3]</span></p>`,
    T`<p>(a) $\frac{8!}{2!\,3!}=3360$ <span class="mk">M1 A1</span>. (b) Block LLL with P, A, R, A, E: $\frac{6!}{2!}=360$ <span class="mk">M1 M1 A1</span>. (c) Middle six: P, R, E, L, L, L: $\frac{6!}{3!}=120$ <span class="mk">M1 M1 A1</span>.</p>`),
  B.key([T`$^n\mathrm P_r$ ordered; $^n\mathrm C_r$ unordered.`, T`Divide by factorials of repeats; treat "together" as a block.`]),
].join('');

BOOK.f2_pprob = [
  B.why(T`<p>When every outcome is equally likely, a probability is just a ratio of two counts. The counting techniques of the last chapter become a probability toolkit.</p>`),
  B.thm('Equally likely outcomes', T`$$P(A)=\frac{\text{number of outcomes in }A}{\text{total number of outcomes}}$$<p>Count numerator and denominator the same way — both arrangements or both selections.</p>`),
  B.ex(1, T`A committee of $3$ is chosen at random from $5$ boys and $4$ girls. Find $P(\text{exactly 2 girls})$.`, [T`$\dfrac{\binom42\binom51}{\binom93}=\dfrac{30}{84}=0.357$.`]),
  B.ex(2, T`The letters of PARALLEL are arranged at random. Find the probability that the Ls are together.`, [T`$\frac{360}{3360}=\frac3{28}$.`]),
  B.ex(3, T`Five cards are dealt from a pack. Find the probability that they are all the same suit (a flush).`, [T`$\dfrac{4\binom{13}5}{\binom{52}5}=\dfrac{5148}{2\,598\,960}=0.00198$.`]),
  B.warn([T`Counting the numerator as ordered and the denominator as unordered.`, T`Forgetting there are four suits in Example 3.`]),
  B.exam([T`Show the counts with $\binom nr$ notation before evaluating.`]),
  B.checks([[T`$6$ books at random on a shelf: probability two particular books are at the two ends?`, T`$\frac{2\times4!}{6!}=\frac1{15}$.`]]),
  B.examq(9, T`<p>Seven friends, four boys and three girls, sit at random in a row.</p><p>(a) Find the probability that the three girls sit together. <span class="mk">[3]</span> (b) Find the probability that boys and girls alternate. <span class="mk">[3]</span> (c) A team of $4$ is chosen at random from the seven. Find the probability that it contains at least $2$ girls. <span class="mk">[3]</span></p>`,
    T`<p>(a) $\frac{5!\times3!}{7!}=\frac17$ <span class="mk">M1 M1 A1</span>. (b) BGBGBGB: $\frac{4!\times3!}{7!}=\frac1{35}$ <span class="mk">M1 M1 A1</span>.</p><p>(c) $\frac{\binom32\binom42+\binom33\binom41}{\binom74}=\frac{18+4}{35}=\frac{22}{35}$ <span class="mk">M1 M1 A1</span>.</p>`),
  B.key([T`Probability $=$ favourable count ÷ total count.`, T`Count both in the same way.`]),
].join('');

BOOK.f2_drv = [
  B.why(T`<p>A random variable attaches a number to each outcome — a score, a count, a profit. Its distribution tells you every probability; its mean and variance summarise what to expect and how much it varies.</p>`),
  B.def('discrete random variable', T`<p>$X$ takes values $x_1,x_2,\dots$ with probabilities $P(X=x_i)$, which are non-negative and sum to $1$. Probabilities over a range: $P(a\le X\le b)=\sum_{a\le x\le b}P(X=x)$.</p>`),
  B.def('expectation and variance', T`$$E(X)=\mu=\sum xP(X=x),\qquad\operatorname{Var}(X)=E\big[(X-\mu)^2\big]=E(X^2)-\mu^2,$$<p>with $E(X^2)=\sum x^2P(X=x)$. The standard deviation is $\sqrt{\operatorname{Var}(X)}$.</p>`),
  B.thm('Linear functions', T`<p>$E(aX+b)=aE(X)+b$ and $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.</p>`),
  B.proof(T`<p>$E(aX+b)=\sum(ax+b)p=a\sum xp+b\sum p=aE(X)+b$. Then $aX+b-E(aX+b)=a(X-\mu)$, so $\operatorname{Var}(aX+b)=E[a^2(X-\mu)^2]=a^2\operatorname{Var}(X)$.</p>`),
  B.ex(1, T`$P(X=1)=0.1$, $P(X=2)=0.3$, $P(X=3)=k$, $P(X=4)=0.2$. Find $k$, $E(X)$ and $\operatorname{Var}(X)$.`, [T`$k=1-0.6=0.4$.`, T`$E(X)=0.1+0.6+1.2+0.8=2.7$; $E(X^2)=0.1+1.2+3.6+3.2=8.1$.`, T`$\operatorname{Var}(X)=8.1-2.7^2=0.81$ (SD $0.9$).`]),
  B.ex(2, T`For the same $X$, find $E(3X-2)$ and $\operatorname{Var}(3X-2)$.`, [T`$E=3(2.7)-2=6.1$; $\operatorname{Var}=9(0.81)=7.29$.`]),
  B.warn([T`$\operatorname{Var}(X)=E(X^2)-E(X)$ — the mean must be squared.`, T`$\operatorname{Var}(aX+b)=a\operatorname{Var}(X)+b$ — no: $a^2\operatorname{Var}(X)$.`]),
  B.exam([T`Lay out a table with rows $x$, $P(X=x)$, $xP$, $x^2P$.`]),
  B.checks([[T`$\operatorname{Var}(X)=4$. $\operatorname{Var}(-3X+1)$?`, T`$36$.`], [T`Fair die: $E(X)$?`, T`$3.5$.`]]),
  B.examq(9, T`<p>The score $X$ on a spinner has $P(X=x)=k(x+1)$ for $x=0,1,2,3$.</p><p>(a) Find $k$. <span class="mk">[2]</span> (b) Find $E(X)$. <span class="mk">[2]</span> (c) Find $\operatorname{Var}(X)$. <span class="mk">[3]</span> (d) Find $E(5-2X)$ and $\operatorname{Var}(5-2X)$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $k(1+2+3+4)=1\Rightarrow k=0.1$ <span class="mk">M1 A1</span>. (b) $0+0.2+0.6+1.2=2$ <span class="mk">M1 A1</span>.</p><p>(c) $E(X^2)=0+0.2+1.2+3.6=5$ <span class="mk">M1 A1</span>; $\operatorname{Var}=5-4=1$ <span class="mk">A1</span>. (d) $E=1$, $\operatorname{Var}=4$ <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$\sum P=1$; $E(X)=\sum xp$; $\operatorname{Var}=E(X^2)-\mu^2$.`, T`$E(aX+b)=aE+b$, $\operatorname{Var}(aX+b)=a^2\operatorname{Var}$.`]),
].join('');

BOOK.f2_crv = [
  B.why(T`<p>Times, lengths and masses can take any value in a range, so individual values have probability zero. Probability lives in <i>intervals</i>, as areas under a density curve — and sums become integrals.</p>`),
  B.def('probability density function', T`<p>A function $f$ with $f(x)\ge0$ and $\int_{-\infty}^\infty f(x)\,dx=1$. Then $$P(a\lt X\lt b)=\int_a^bf(x)\,dx,$$ and $P(X=a)=0$, so $\lt$ and $\le$ give the same probability.</p>`),
  B.def('mean and variance', T`$$E(X)=\int xf(x)\,dx,\qquad E(X^2)=\int x^2f(x)\,dx,\qquad\operatorname{Var}(X)=E(X^2)-[E(X)]^2.$$<p>The linear rules $E(aX+b)=aE(X)+b$, $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$ still hold.</p>`),
  B.ex(1, T`$f(x)=k(4-x)$ for $0\le x\le4$. Find $k$, $P(X\lt1)$, $E(X)$ and $\operatorname{Var}(X)$.`, [
    T`$\int_0^4k(4-x)\,dx=8k=1\Rightarrow k=\frac18$.`, T`$P(X\lt1)=\frac18\left[4x-\frac{x^2}2\right]_0^1=\frac{3.5}8=0.4375$.`, T`$E(X)=\frac18\int_0^4(4x-x^2)\,dx=\frac18\cdot\frac{32}3=\frac43$.`, T`$E(X^2)=\frac18\int_0^4(4x^2-x^3)\,dx=\frac83$; $\operatorname{Var}=\frac83-\frac{16}9=\frac89$.`]),
  B.ex(2, T`$f(x)=\frac38x^2$ on $[0,2]$. Find $P(X\gt1)$.`, [T`$1-\int_0^1\frac38x^2\,dx=1-\frac18=\frac78$.`]),
  B.warn([T`Forgetting the limits are the ends of the range of $f$.`, T`Using $\int f(x)\,dx$ for the mean — it is $\int xf(x)\,dx$.`]),
  B.exam([T`Sketch $f$: it shows whether an answer like $E(X)$ is sensible.`]),
  B.checks([[T`$f(x)=2x$ on $[0,1]$. $E(X)$?`, T`$\frac23$.`], [T`Can $f(x)$ exceed $1$?`, T`Yes — only the area must be $1$.`]]),
  B.examq(11, T`<p>The continuous random variable $X$ has p.d.f. $f(x)=kx^2(3-x)$ for $0\le x\le3$, and $0$ otherwise.</p><p>(a) Find $k$. <span class="mk">[3]</span> (b) Find $P(X\lt1)$. <span class="mk">[2]</span> (c) Find $E(X)$. <span class="mk">[3]</span> (d) Given $E(X^2)=3.6$, find $\operatorname{Var}(X)$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $k\int_0^3(3x^2-x^3)\,dx=k\left(27-\frac{81}4\right)=\frac{27k}4=1$ <span class="mk">M1 A1</span>, $k=\frac4{27}$ <span class="mk">A1</span>.</p><p>(b) $\frac4{27}\left(1-\frac14\right)=\frac19$ <span class="mk">M1 A1</span>. (c) $\frac4{27}\int_0^3(3x^3-x^4)\,dx=\frac4{27}\cdot\frac{243}{20}=1.8$ <span class="mk">M1 A1 A1</span>.</p><p>(d) $3.6-1.8^2=0.36$ <span class="mk">M1 A1 A1</span>.</p>`),
  B.key([T`Area under $f$ is $1$; probabilities are areas.`, T`$E(X)=\int xf$, $\operatorname{Var}=\int x^2f-\mu^2$.`]),
].join('');

BOOK.f2_geo = [
  B.why(T`<p>How many attempts until the first success — the first six, the first sale, the first goal? When each attempt has the same chance and attempts are independent, the answer follows the geometric distribution.</p>`),
  B.def('the geometric distribution', T`<p>$X\sim\text{Geo}(p)$ is the number of independent trials up to and including the first success, each with success probability $p$: $$P(X=r)=(1-p)^{r-1}p,\quad r=1,2,\dots$$ $P(X\gt r)=(1-p)^r$ (the first $r$ all fail) and $P(X\le r)=1-(1-p)^r$.</p>`),
  B.thm('Mean and variance', T`$$E(X)=\frac1p,\qquad\operatorname{Var}(X)=\frac{1-p}{p^2}.$$`),
  B.proof(T`<p>Let $q=1-p$. $E(X)=\sum_{r\ge1}rq^{r-1}p=p\cdot\frac1{(1-q)^2}=\frac1p$, using $\sum rq^{r-1}=\frac{d}{dq}\sum q^r=\frac{d}{dq}\frac1{1-q}=\frac1{(1-q)^2}$.</p>`, 'Proof of the mean'),
  B.ex(1, T`Find the probability that the first six comes on the 4th throw, and that more than 4 throws are needed.`, [T`$\left(\frac56\right)^3\frac16=0.0965$.`, T`$\left(\frac56\right)^4=0.482$.`]),
  B.ex(2, T`State the mean and variance of the number of throws needed to get a six.`, [T`$E=6$, $\operatorname{Var}=\frac{5/6}{1/36}=30$.`]),
  B.warn([T`Using $(1-p)^r p$ (that counts failures before the success).`, T`Applying the model when the trials are not independent.`]),
  B.exam([T`"At most $n$ attempts" problems: $1-(1-p)^n$, then logarithms for the least $n$.`]),
  B.checks([[T`$X\sim\text{Geo}(0.2)$. $P(X=1)$?`, T`$0.2$.`], [T`$E(X)$ for $p=0.25$?`, T`$4$.`]]),
  B.examq(9, T`<p>A basketball player scores each free throw with probability $0.7$, independently. $X$ is the number of throws up to and including her first score.</p><p>(a) Find $P(X=3)$. <span class="mk">[2]</span> (b) Find $P(X\gt2)$. <span class="mk">[2]</span> (c) Find $E(X)$ and $\operatorname{Var}(X)$. <span class="mk">[2]</span> (d) Find the least $n$ such that $P(X\le n)\gt0.999$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $0.3^2\times0.7=0.063$ <span class="mk">M1 A1</span>. (b) $0.3^2=0.09$ <span class="mk">M1 A1</span>. (c) $\frac1{0.7}=1.43$, $\frac{0.3}{0.49}=0.612$ <span class="mk">B1 B1</span>.</p><p>(d) $1-0.3^n\gt0.999\Rightarrow0.3^n\lt0.001$ <span class="mk">M1</span>; $n\gt\frac{\ln0.001}{\ln0.3}=5.74$ <span class="mk">M1</span>, $n=6$ <span class="mk">A1</span>.</p>`),
  B.key([T`$P(X=r)=q^{r-1}p$; $P(X\gt r)=q^r$.`, T`$E=\frac1p$, $\operatorname{Var}=\frac q{p^2}$.`]),
].join('');

BOOK.f2_pois = [
  B.why(T`<p>Calls to a helpline, flaws in a roll of cloth, radioactive decays: events scattered at random in time or space. The Poisson distribution models the count, using just one number — the average rate.</p>`),
  B.def('the Poisson distribution', T`<p>$X\sim\text{Po}(\lambda)$: $$P(X=r)=\frac{e^{-\lambda}\lambda^r}{r!},\quad r=0,1,2,\dots$$ Conditions: events occur <b>singly</b>, <b>independently</b>, at a <b>constant average rate</b> $\lambda$ per interval.</p>`),
  B.thm('Mean and variance', T`<p>$E(X)=\operatorname{Var}(X)=\lambda$. Rates scale: an average of $\lambda$ per unit means $\text{Po}(k\lambda)$ in $k$ units.</p>`),
  B.thm('Summary of the three discrete models', T`<table class="tbl"><tr><th></th><th>Mean</th><th>Variance</th></tr><tr><td>$B(n,p)$</td><td>$np$</td><td>$np(1-p)$</td></tr><tr><td>$\text{Geo}(p)$</td><td>$\frac1p$</td><td>$\frac{1-p}{p^2}$</td></tr><tr><td>$\text{Po}(\lambda)$</td><td>$\lambda$</td><td>$\lambda$</td></tr></table>`),
  B.ex(1, T`Calls arrive at an average of $4$ per hour. Find $P(X=2)$, $P(X\le2)$ and $P(X\ge3)$ in an hour.`, [T`$P(X=2)=e^{-4}\frac{16}2=0.147$.`, T`$P(X\le2)=e^{-4}(1+4+8)=0.238$; $P(X\ge3)=0.762$.`]),
  B.ex(2, T`Using the same rate, find the probability of no calls in $30$ minutes.`, [T`$\text{Po}(2)$: $e^{-2}=0.135$.`]),
  B.ex(3, T`Data on goals per match have mean $2.1$ and variance $2.05$. Comment.`, [T`Mean ≈ variance, as for a Poisson distribution, so $\text{Po}(2.1)$ may be a suitable model (if goals occur independently at a constant rate).`]),
  B.warn([T`Not scaling $\lambda$ to the interval in the question.`, T`$P(X\ge3)=1-P(X\le3)$ — no: $1-P(X\le2)$.`]),
  B.exam([T`State the distribution with its parameter: "$X\sim\text{Po}(1.5)$".`]),
  B.checks([[T`$X\sim\text{Po}(3)$: $P(X=0)$?`, T`$e^{-3}=0.0498$.`], [T`Variance of $\text{Po}(6)$?`, T`$6$.`]]),
  B.examq(8, T`<p>Emails arrive at random at an average rate of $3$ every $10$ minutes.</p><p>(a) Give two reasons why a Poisson distribution may be suitable. <span class="mk">[2]</span> (b) Find the probability of exactly $5$ emails in $10$ minutes. <span class="mk">[2]</span> (c) Find the probability of at least $2$ emails in $5$ minutes. <span class="mk">[3]</span> (d) State the mean and variance of the number of emails in an hour. <span class="mk">[1]</span></p>`,
    T`<p>(a) Emails arrive singly, independently, at a constant average rate <span class="mk">B1 B1</span>. (b) $e^{-3}\frac{3^5}{5!}=0.101$ <span class="mk">M1 A1</span>.</p><p>(c) $\text{Po}(1.5)$ <span class="mk">B1</span>; $1-e^{-1.5}(1+1.5)=0.442$ <span class="mk">M1 A1</span>. (d) Both $18$ <span class="mk">B1</span>.</p>`),
  B.key([T`$P(X=r)=\frac{e^{-\lambda}\lambda^r}{r!}$; mean $=$ variance $=\lambda$.`, T`Scale $\lambda$ with the interval.`]),
].join('');

BOOK.f2_pmcc = [
  B.why(T`<p>Do taller people weigh more? Does revision raise marks? The product-moment correlation coefficient puts a single number on how closely two variables follow a straight line.</p>`),
  B.def('summary statistics', T`$$S_{xx}=\sum x^2-\frac{(\sum x)^2}n,\quad S_{yy}=\sum y^2-\frac{(\sum y)^2}n,\quad S_{xy}=\sum xy-\frac{\sum x\sum y}n,\qquad r=\frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}.$$`),
  B.def('interpretation and limitations', T`<ul><li>$r$ lies between $-1$ and $1$; near $\pm1$ is strong linear correlation, near $0$ weak or none.</li><li>$r$ measures <b>linear</b> association only — a perfect curve can give $r\approx0$.</li><li>Outliers can create or destroy correlation.</li><li>Correlation does not imply causation: a third variable may drive both.</li></ul>`),
  B.def('explanatory and response variables', T`<p>The <b>explanatory</b> (independent) variable is controlled or used to explain; the <b>response</b> (dependent) variable responds. Plot the explanatory variable on the horizontal axis.</p>`),
  B.ex(1, T`For $8$ pairs, $\sum x=40$, $\sum y=72$, $\sum x^2=240$, $\sum y^2=700$, $\sum xy=400$. Find $r$.`, [T`$S_{xx}=240-200=40$, $S_{yy}=700-648=52$, $S_{xy}=400-360=40$.`, T`$r=\frac{40}{\sqrt{40\times52}}=0.877$: strong positive linear correlation.`]),
  B.warn([T`Saying "$r=0$ means no relationship".`, T`Claiming one variable causes the other.`]),
  B.exam([T`Interpret in context: "strong positive correlation: days with more sunshine tend to be warmer".`]),
  B.checks([[T`$S_{xx}=50$, $S_{yy}=18$, $S_{xy}=-27$. $r$?`, T`$-0.9$.`]]),
  B.examq(6, T`<p>For $6$ days, the hours of sunshine $x$ and the maximum temperature $y$ (°C) give $\sum x=36$, $\sum y=120$, $\sum x^2=250$, $\sum y^2=2500$, $\sum xy=760$.</p><p>(a) Calculate the product-moment correlation coefficient. <span class="mk">[4]</span> (b) Interpret your answer. <span class="mk">[1]</span> (c) State which is the explanatory variable. <span class="mk">[1]</span></p>`,
    T`<p>(a) $S_{xx}=34$, $S_{yy}=100$, $S_{xy}=40$ <span class="mk">M1 A1</span>; $r=\frac{40}{\sqrt{3400}}=0.686$ <span class="mk">M1 A1</span>.</p><p>(b) Moderate positive correlation: sunnier days tend to be warmer <span class="mk">B1</span>. (c) Hours of sunshine <span class="mk">B1</span>.</p>`),
  B.key([T`$r=\frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$.`, T`Linear only; outliers matter; not causation.`]),
].join('');

BOOK.f2_reg = [
  B.why(T`<p>Once two variables are correlated, the regression line turns the relationship into a prediction tool: given $x$, estimate $y$. The method of least squares picks the single best line.</p>`),
  B.thm('Least squares regression line of y on x', T`$$y=a+bx,\qquad b=\frac{S_{xy}}{S_{xx}},\qquad a=\bar y-b\bar x.$$<p>It minimises the sum of squared residuals $\sum(y_i-a-bx_i)^2$ and passes through $(\bar x,\bar y)$.</p>`),
  B.proof(T`<p>For fixed $b$, $\sum(y_i-a-bx_i)^2$ is a quadratic in $a$, least when $a=\bar y-b\bar x$ (the mean residual is zero). Substituting, the sum becomes $\sum\big((y_i-\bar y)-b(x_i-\bar x)\big)^2=S_{yy}-2bS_{xy}+b^2S_{xx}$, a quadratic in $b$ least when $b=\frac{S_{xy}}{S_{xx}}$.</p>`),
  B.def('using the line', T`<ul><li>Predict $y$ from $x$ <b>within</b> the range of the data (interpolation).</li><li><b>Extrapolation</b> beyond the data is unreliable — the pattern may change.</li><li>$b$ is the estimated change in $y$ per unit increase in $x$; $a$ is the value at $x=0$ (often outside the data, so not meaningful).</li></ul>`),
  B.ex(1, T`Using Example 1 of the PMCC chapter, find the regression line and estimate $y$ when $x=6$.`, [T`$b=\frac{40}{40}=1$; $\bar x=5$, $\bar y=9$, $a=9-5=4$.`, T`$y=4+x$; at $x=6$, $y=10$.`]),
  B.warn([T`Using $S_{yy}$ in the gradient.`, T`Predicting $x$ from $y$ with the line of $y$ on $x$.`]),
  B.exam([T`Comment on reliability: within range? strong correlation? sample size?`]),
  B.checks([[T`$S_{xy}=24$, $S_{xx}=16$, $\bar x=3$, $\bar y=10$. Line?`, T`$y=5.5+1.5x$.`]]),
  B.examq(6, T`<p>Using the sunshine data of the previous chapter ($n=6$, $\sum x=36$, $\sum y=120$, $S_{xx}=34$, $S_{xy}=40$), where $x$ ranged from $3$ to $9$ hours:</p><p>(a) Find the equation of the regression line of $y$ on $x$. <span class="mk">[3]</span> (b) Estimate the temperature on a day with $7$ hours of sunshine. <span class="mk">[1]</span> (c) Comment on using the line to estimate the temperature for $15$ hours of sunshine. <span class="mk">[2]</span></p>`,
    T`<p>(a) $b=\frac{40}{34}=1.18$ <span class="mk">M1</span>; $a=20-1.18\times6=12.9$ <span class="mk">M1</span>; $y=12.9+1.18x$ <span class="mk">A1</span>.</p><p>(b) $21.2$ °C <span class="mk">B1</span>. (c) $15$ is outside the data range ($3$–$9$): extrapolation, so unreliable <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$b=\frac{S_{xy}}{S_{xx}}$, $a=\bar y-b\bar x$.`, T`Interpolate, don't extrapolate.`]),
].join('');
