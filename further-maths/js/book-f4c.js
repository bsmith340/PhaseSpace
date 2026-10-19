// BcsMaths textbook — Further Maths A2 2, Section C: Statistics.
'use strict';

BOOK.f4_lin = [
  B.why(T`<p>A total journey time is the sum of separate legs; a profit is income minus cost. When you combine random quantities, means combine simply — but spreads combine through variances, and they always add.</p>`),
  B.thm('Expectation and variance of combinations', T`<p>$E(aX+bY)=aE(X)+bE(Y)$ always. If $X$ and $Y$ are independent, $$\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y).$$</p>`),
  B.proof(T`<p>Linearity of expectation follows from the definition (sum or integral). For the variance, let $U=aX+bY$ with mean $a\mu_X+b\mu_Y$: $U-E(U)=a(X-\mu_X)+b(Y-\mu_Y)$, so $\operatorname{Var}(U)=a^2\operatorname{Var}X+b^2\operatorname{Var}Y+2ab\,E[(X-\mu_X)(Y-\mu_Y)]$. Independence makes the last expectation $E(X-\mu_X)E(Y-\mu_Y)=0$.</p>`),
  B.def('sums versus multiples', T`<p>For independent observations $X_1,\dots,X_n$ of $X$: $E(\sum X_i)=n\mu$ and $\operatorname{Var}(\sum X_i)=n\sigma^2$. But one observation multiplied, $nX$, has variance $n^2\sigma^2$.</p>`),
  B.ex(1, T`$E(X)=5$, $\operatorname{Var}(X)=4$, $E(Y)=3$, $\operatorname{Var}(Y)=1$, independent. Find $E(3X-2Y)$ and $\operatorname{Var}(3X-2Y)$.`, [T`$E=15-6=9$; $\operatorname{Var}=9(4)+4(1)=40$.`]),
  B.warn([T`Subtracting variances for a difference.`, T`Using $n\sigma^2$ for $nX$, or $n^2\sigma^2$ for a sum of $n$ observations.`]),
  B.exam([T`Write "independent" when you use the variance rule — it is the condition.`]),
  B.checks([[T`$\operatorname{Var}(X)=3$: $\operatorname{Var}(X_1+X_2)$ and $\operatorname{Var}(2X)$?`, T`$6$ and $12$.`]]),
  B.examq(6, T`<p>$X$ and $Y$ are independent with $E(X)=10$, $\operatorname{Var}(X)=4$, $E(Y)=6$ and $\operatorname{Var}(Y)=9$.</p><p>(a) Find $E(2X-Y)$ and $\operatorname{Var}(2X-Y)$. <span class="mk">[3]</span> (b) Find the mean and variance of the sum of three independent observations of $X$. <span class="mk">[2]</span> (c) Find $\operatorname{Var}(3X)$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $14$; $4(4)+9=25$ <span class="mk">B1 M1 A1</span>. (b) $30$; $12$ <span class="mk">B1 B1</span>. (c) $36$ <span class="mk">B1</span>.</p>`),
  B.key([T`$E(aX+bY)=aE+bE$; $\operatorname{Var}(aX+bY)=a^2\operatorname{Var}+b^2\operatorname{Var}$ (independent).`, T`Sum of $n$: $n\sigma^2$; multiple $nX$: $n^2\sigma^2$.`]),
].join('');

BOOK.f4_lnorm = [
  B.why(T`<p>The mass of a packed box is the mass of the box plus its contents; whether one runner beats another depends on the difference of their times. When the ingredients are normal, so is the combination — and that turns real questions into a single $z$-value.</p>`),
  B.thm('Combinations of normal variables', T`<p>If $X\sim N(\mu_X,\sigma_X^2)$ and $Y\sim N(\mu_Y,\sigma_Y^2)$ are independent, then $$aX+bY\sim N\left(a\mu_X+b\mu_Y,\ a^2\sigma_X^2+b^2\sigma_Y^2\right).$$</p>`),
  B.ex(1, T`A box has mass $N(200,5^2)$ g and holds $10$ items each $N(50,2^2)$ g, all independent. Find $P(\text{total}\gt710)$.`, [T`Total $\sim N(700,\ 25+10\times4)=N(700,65)$.`, T`$P=1-\Phi\left(\frac{10}{\sqrt{65}}\right)=1-\Phi(1.240)=0.107$.`]),
  B.ex(2, T`Times $A\sim N(66,4^2)$ and $B\sim N(72,6^2)$ seconds are independent. Find $P(A\gt B)$.`, [T`$A-B\sim N(-6,52)$.`, T`$P(A-B\gt0)=1-\Phi\left(\frac6{\sqrt{52}}\right)=1-\Phi(0.832)=0.203$.`]),
  B.warn([T`Treating "the total of 10 items" as $10X$.`, T`Forgetting that a difference's variance is a sum.`]),
  B.exam([T`Define the new variable and state its distribution, e.g. "$T=B+X_1+\dots+X_{10}\sim N(700,65)$".`]),
  B.checks([[T`$X\sim N(10,4)$: distribution of $3X$?`, T`$N(30,36)$.`]]),
  B.examq(7, T`<p>The mass of jam in a jar is $J\sim N(454,3^2)$ g and the mass of an empty jar is $N(200,4^2)$ g, independently.</p><p>(a) Find the probability that a full jar has mass more than $660$ g. <span class="mk">[3]</span> (b) Six full jars are packed in a box whose mass is $N(500,10^2)$ g. Find the probability that the total mass is less than $4420$ g. <span class="mk">[4]</span></p>`,
    T`<p>(a) Full jar $\sim N(654,25)$ <span class="mk">M1 A1</span>; $P=1-\Phi(1.2)=0.115$ <span class="mk">A1</span>.</p><p>(b) Total $\sim N(6\times654+500,\ 6\times25+100)=N(4424,250)$ <span class="mk">M1 A1</span>; $\Phi\left(\frac{-4}{\sqrt{250}}\right)=\Phi(-0.253)=0.400$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$aX+bY$ is normal with mean $a\mu_X+b\mu_Y$, variance $a^2\sigma_X^2+b^2\sigma_Y^2$.`, T`Compare two variables via their difference.`]),
].join('');

BOOK.f4_clt = [
  B.why(T`<p>Most real data aren't normal — waiting times are skewed, goal counts are discrete. Yet averages of many observations behave normally regardless. This is the central limit theorem, and it is why the normal distribution is everywhere.</p>`),
  B.thm('Central limit theorem', T`<p>If $X_1,\dots,X_n$ is a random sample from <b>any</b> distribution with mean $\mu$ and variance $\sigma^2$, then for large $n$ (in practice $n\ge30$) $$\bar X\approx N\left(\mu,\frac{\sigma^2}n\right).$$ If the population is normal, the result is exact for every $n$. (Proof not required.)</p>`),
  B.ex(1, T`A population has mean $42$ and standard deviation $10$. Find $P(\bar X\gt40)$ for a sample of $50$.`, [T`$\bar X\approx N\left(42,\frac{100}{50}\right)$, s.e. $1.414$.`, T`$P=1-\Phi(-1.414)=0.921$.`]),
  B.ex(2, T`Calls per minute follow $\text{Po}(3)$. Over $60$ minutes, find $P(\bar X\lt3.3)$.`, [T`Mean and variance $3$: $\bar X\approx N\left(3,\frac3{60}\right)$.`, T`$\Phi\left(\frac{0.3}{0.2236}\right)=\Phi(1.342)=0.910$.`]),
  B.warn([T`Saying the CLT makes the population normal — it is about the sample mean.`, T`Using it for small samples from non-normal populations.`]),
  B.exam([T`Write "by the central limit theorem, since $n$ is large" when you use it.`]),
  B.checks([[T`$\sigma=12$, $n=36$: standard deviation of $\bar X$?`, T`$2$.`]]),
  B.examq(4, T`<p>The number of goals per match in a league has mean $2.6$ and variance $2.4$. Find the approximate probability that the mean number of goals per match over a season of $38$ matches exceeds $3$. <span class="mk">[4]</span></p>`,
    T`<p>CLT: $\bar X\approx N\left(2.6,\frac{2.4}{38}\right)$ <span class="mk">M1 A1</span>; $P=1-\Phi\left(\frac{0.4}{0.2513}\right)=1-\Phi(1.592)=0.0557$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`For $n\ge30$: $\bar X\approx N(\mu,\sigma^2/n)$, whatever the population.`]),
].join('');

BOOK.f4_est = [
  B.why(T`<p>We rarely know a population's mean or variance; we estimate them from a sample. A good estimator should be right on average — <b>unbiased</b> — and that is why the sample variance divides by $n-1$.</p>`),
  B.def('unbiased estimates', T`<p>$\bar x$ estimates $\mu$; $$s^2=\frac{\sum(x-\bar x)^2}{n-1}=\frac{\sum x^2-n\bar x^2}{n-1}$$ estimates $\sigma^2$ without bias ($E(S^2)=\sigma^2$). Dividing by $n$ would underestimate on average, because the data are closer to their own mean $\bar x$ than to $\mu$.</p>`),
  B.def('standard error', T`<p>The standard deviation of $\bar X$ is $\frac\sigma{\sqrt n}$, the <b>standard error</b> of the mean; estimate it by $\frac s{\sqrt n}$. Quadrupling $n$ halves it.</p>`),
  B.ex(1, T`A sample of $10$ eggs has $\sum x=602$, $\sum x^2=36326$ (grams). Find unbiased estimates of $\mu$ and $\sigma^2$, and the standard error.`, [T`$\bar x=60.2$.`, T`$s^2=\frac{36326-10(60.2)^2}9=\frac{85.6}9=9.51$.`, T`s.e. $=\sqrt{\frac{9.51}{10}}=0.975$ g.`]),
  B.warn([T`Using the divisor $n$ when an unbiased estimate is asked for.`, T`Confusing $s$ (spread of data) with the standard error (spread of $\bar x$).`]),
  B.exam([T`Keep full calculator accuracy in $\bar x$ when computing $\sum x^2-n\bar x^2$.`]),
  B.checks([[T`$n=5$, $\sum(x-\bar x)^2=20$. $s^2$?`, T`$5$.`]]),
  B.examq(4, T`<p>A random sample of $10$ eggs has masses with $\sum x=602$ and $\sum x^2=36326$.</p><p>(a) Find unbiased estimates of the population mean and variance. <span class="mk">[3]</span> (b) Estimate the standard error of the mean. <span class="mk">[1]</span></p>`,
    T`<p>(a) $\bar x=60.2$ <span class="mk">B1</span>; $s^2=\frac{36326-10\times60.2^2}9=9.51$ <span class="mk">M1 A1</span>. (b) $0.975$ <span class="mk">B1</span>.</p>`),
  B.key([T`$s^2=\frac{\sum x^2-n\bar x^2}{n-1}$ is unbiased.`, T`Standard error $\frac\sigma{\sqrt n}$.`]),
].join('');

BOOK.f4_ci = [
  B.why(T`<p>A single estimate like $\bar x=112.4$ hides its uncertainty. A confidence interval gives a range of plausible values for $\mu$, with a stated level of confidence in the method.</p>`),
  B.thm('Confidence interval for μ', T`<p>With $\sigma$ known (or a large sample, using $s$), a $100(1-\alpha)\%$ confidence interval is $$\bar x\pm z\frac\sigma{\sqrt n},\qquad z=1.6449\ (90\%),\ 1.96\ (95\%),\ 2.5758\ (99\%).$$</p>`),
  B.proof(T`<p>$P\left(-1.96\lt\frac{\bar X-\mu}{\sigma/\sqrt n}\lt1.96\right)=0.95$. Rearranging the inequalities for $\mu$: $P\left(\bar X-1.96\frac\sigma{\sqrt n}\lt\mu\lt\bar X+1.96\frac\sigma{\sqrt n}\right)=0.95$ — a random interval that contains the fixed $\mu$ with probability $0.95$.</p>`),
  B.def('interpretation', T`<p>"$95\%$ confidence" describes the procedure: if it were repeated many times, about $95\%$ of the intervals would contain $\mu$. Any particular interval either does or doesn't.</p>`),
  B.ex(1, T`$n=50$, $\sigma=15$, $\bar x=112.4$. Find a $95\%$ interval for $\mu$.`, [T`$112.4\pm1.96\frac{15}{\sqrt{50}}=112.4\pm4.16$: $(108.2,\ 116.6)$.`]),
  B.ex(2, T`How large must $n$ be for the $99\%$ interval to have width at most $5$?`, [T`$2(2.5758)\frac{15}{\sqrt n}\le5\Rightarrow\sqrt n\ge15.45\Rightarrow n\ge238.9$, so $n=239$.`]),
  B.warn([T`Saying "there is a 95% probability that μ is in this interval".`, T`Using $z$ for a small sample with unknown $\sigma$ (use $t$).`]),
  B.exam([T`Give the interval with sensible rounding and in context ("between 108 and 117 grams").`]),
  B.checks([[T`Effect on width of quadrupling $n$?`, T`Halved.`]]),
  B.examq(6, T`<p>A random sample of $50$ items from a population with standard deviation $15$ has mean $112.4$.</p><p>(a) Find a $95\%$ confidence interval for the population mean. <span class="mk">[3]</span> (b) Find the least sample size for a $99\%$ confidence interval of width at most $5$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $112.4\pm1.96\times\frac{15}{\sqrt{50}}$ <span class="mk">M1 B1</span>: $(108.2,116.6)$ <span class="mk">A1</span>. (b) $2(2.5758)\frac{15}{\sqrt n}\le5$ <span class="mk">M1</span>, $n\ge238.9$ <span class="mk">A1</span>, $n=239$ <span class="mk">A1</span>.</p>`),
  B.key([T`$\bar x\pm z\frac\sigma{\sqrt n}$.`, T`95% describes the method, not one interval.`]),
].join('');

BOOK.f4_t1 = [
  B.why(T`<p>With a small sample and an unknown $\sigma$, replacing $\sigma$ by $s$ adds extra uncertainty — so the test statistic isn't quite normal. Gosset's $t$-distribution (published as "Student") accounts for it exactly when the population is normal.</p>`),
  B.def('when to use t', T`<ul><li>The population is (approximately) <b>normal</b>.</li><li>$\sigma$ is <b>unknown</b> and estimated by $s$.</li><li>The sample is <b>small</b> (for large $n$, $t\approx z$).</li></ul>`),
  B.thm('One-sample t-test', T`$$t=\frac{\bar x-\mu_0}{s/\sqrt n},\qquad\nu=n-1\ \text{degrees of freedom}.$$<p>Compare with the critical value $t_\nu$ from tables (one- or two-tailed). The matching confidence interval is $\bar x\pm t_\nu\frac s{\sqrt n}$.</p>`),
  B.ex(1, T`Masses of $8$ bags (g): $498,503,497,495,501,494,499,496$. Test at $5\%$ whether the mean is below $500$ g.`, [T`$\bar x=497.875$, $s=3.044$.`, T`$H_0:\mu=500$, $H_1:\mu\lt500$. $t=\frac{497.875-500}{3.044/\sqrt8}=-1.974$.`, T`$t_7(5\%)=1.895$; $-1.974\lt-1.895$: reject $H_0$ — evidence the mean is below $500$ g.`]),
  B.warn([T`Using $\nu=n$.`, T`Using $z$ critical values.`, T`Forgetting to state the normality assumption.`]),
  B.exam([T`Give hypotheses, $t$, $\nu$, critical value, decision and a contextual conclusion — each is a mark.`]),
  B.checks([[T`$n=10$: degrees of freedom?`, T`$9$.`]]),
  B.examq(7, T`<p>A machine fills bags whose masses are normally distributed. A random sample of $8$ bags has masses (g) $498,503,497,495,501,494,499,496$. Test, at the $5\%$ level, whether the mean mass is less than $500$ g. <span class="mk">[7]</span></p>`,
    T`<p>$H_0:\mu=500$, $H_1:\mu\lt500$ <span class="mk">B1</span>. $\bar x=497.875$, $s=3.044$ <span class="mk">B1 B1</span>. $t=-1.974$ <span class="mk">M1 A1</span>. Critical value $-1.895$ ($\nu=7$) <span class="mk">B1</span>. Reject $H_0$: there is evidence that the mean mass is less than $500$ g <span class="mk">A1</span>.</p>`),
  B.key([T`$t=\frac{\bar x-\mu_0}{s/\sqrt n}$, $\nu=n-1$, normal population.`]),
].join('');

BOOK.f4_t2 = [
  B.why(T`<p>Does a training course raise scores? Is one fertiliser better than another? Comparing two means needs care about how the data were collected: the same subjects twice (paired) or two separate groups (two-sample).</p>`),
  B.thm('Paired t-test', T`<p>For paired data, take differences $d=x_2-x_1$ and test $H_0:\mu_d=0$: $$t=\frac{\bar d}{s_d/\sqrt n},\quad\nu=n-1.$$ Assumes the differences are normally distributed.</p>`),
  B.thm('Two-sample t-test', T`<p>Independent samples from normal populations with a common variance: $$s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2},\qquad t=\frac{\bar x_1-\bar x_2}{s_p\sqrt{\frac1{n_1}+\frac1{n_2}}},\quad\nu=n_1+n_2-2.$$</p>`),
  B.ex(1, T`Six students' scores before and after a course: before $12,15,11,18,14,16$; after $14,18,12,21,15,19$. Test at $5\%$ whether the course raises scores.`, [T`Differences $2,3,1,3,1,3$: $\bar d=2.167$, $s_d=0.983$.`, T`$t=\frac{2.167}{0.983/\sqrt6}=5.40$; $t_5(5\%)=2.015$.`, T`Reject $H_0$: evidence that the course raises scores.`]),
  B.warn([T`Using a two-sample test on paired data (it ignores the pairing and loses power).`, T`Pooling variances that are very different.`]),
  B.exam([T`State the conditions: normality (of differences, or of both populations) and, for two samples, equal variances and independence.`]),
  B.checks([[T`$n_1=8$, $n_2=10$: degrees of freedom for the pooled test?`, T`$16$.`]]),
  B.examq(7, T`<p>Six students took a test before and after a revision course. Their scores were: before $12,15,11,18,14,16$; after $14,18,12,21,15,19$.</p><p>(a) Explain why a paired test is appropriate. <span class="mk">[1]</span> (b) Test, at the $5\%$ level, whether the course increases the mean score. <span class="mk">[6]</span></p>`,
    T`<p>(a) Each "after" score belongs to the same student as a "before" score <span class="mk">B1</span>.</p><p>(b) $H_0:\mu_d=0$, $H_1:\mu_d\gt0$ <span class="mk">B1</span>. $\bar d=2.167$, $s_d=0.983$ <span class="mk">B1</span>; $t=5.40$ <span class="mk">M1 A1</span>; $t_5=2.015$ <span class="mk">B1</span>; reject $H_0$ — evidence the course increases scores <span class="mk">A1</span>.</p>`),
  B.key([T`Paired: test the differences.`, T`Two-sample: pooled variance, $\nu=n_1+n_2-2$.`]),
].join('');

BOOK.f4_gof = [
  B.why(T`<p>Is a die fair? Do goals follow a Poisson distribution? A goodness-of-fit test compares observed frequencies with those a model predicts and asks whether the discrepancy is too large to be chance.</p>`),
  B.def('the test', T`<ol><li>$H_0$: the data follow the stated distribution.</li><li>Expected frequencies $E_i=N\times P(\text{class }i)$.</li><li>Combine adjacent classes until every $E_i\ge5$.</li><li>$X^2=\sum\frac{(O_i-E_i)^2}{E_i}$, compared with $\chi^2_\nu$, where $\nu=k-1-p$ ($k$ classes after combining, $p$ parameters estimated from the data).</li><li>Reject $H_0$ if $X^2$ exceeds the critical value.</li></ol>`),
  B.ex(1, T`$80$ sets of $4$ coin tosses gave $0,1,2,3,4$ heads with frequencies $3,18,33,20,6$. Test at $5\%$ whether $B(4,0.5)$ fits.`, [T`Expected: $5,20,30,20,5$ (all $\ge5$).`, T`$X^2=\frac45+\frac4{20}+\frac9{30}+0+\frac15=1.5$.`, T`$\nu=4$; $\chi^2_4(5\%)=9.488$. $1.5\lt9.488$: do not reject — $B(4,0.5)$ fits.`]),
  B.warn([T`Forgetting to subtract a degree of freedom for each estimated parameter.`, T`Leaving an expected frequency below $5$.`]),
  B.exam([T`Show the table of $O$, $E$ and contributions.`]),
  B.checks([[T`$6$ classes, Poisson mean estimated from data. $\nu$?`, T`$4$.`]]),
  B.examq(6, T`<p>In $80$ sets of four coin tosses, the numbers of heads $0,1,2,3,4$ occurred $3,18,33,20,6$ times. Test, at the $5\%$ level, whether the number of heads follows $B(4,0.5)$. <span class="mk">[6]</span></p>`,
    T`<p>$H_0$: $B(4,0.5)$ fits <span class="mk">B1</span>. $E$: $5,20,30,20,5$ <span class="mk">M1 A1</span>. $X^2=1.5$ <span class="mk">A1</span>. $\nu=4$, critical value $9.488$ <span class="mk">B1</span>. Do not reject $H_0$: the binomial model is adequate <span class="mk">A1</span>.</p>`),
  B.key([T`$X^2=\sum\frac{(O-E)^2}E$; $E\ge5$; $\nu=k-1-p$.`]),
].join('');

BOOK.f4_cont = [
  B.why(T`<p>Is voting intention related to age? Does a treatment affect recovery? A contingency table cross-classifies the data, and the χ² test asks whether the two classifications are independent.</p>`),
  B.thm('Test for independence', T`<ul><li>$H_0$: the classifications are independent.</li><li>$E=\frac{\text{row total}\times\text{column total}}{\text{grand total}}$ for each cell.</li><li>$\nu=(r-1)(c-1)$ after combining rows or columns so every $E\ge5$.</li><li>For a $2\times2$ table, use Yates' correction: $X^2=\sum\frac{(|O-E|-0.5)^2}E$, with $\nu=1$.</li></ul>`),
  B.proof(T`<p>If the classifications are independent, $P(\text{row }i\text{ and column }j)=P(\text{row }i)P(\text{column }j)\approx\frac{R_i}N\cdot\frac{C_j}N$, so the expected count is $N\cdot\frac{R_iC_j}{N^2}=\frac{R_iC_j}N$.</p>`, 'Why the expected frequencies'),
  B.ex(1, T`Men: $30$ yes, $20$ no; women: $15$ yes, $35$ no. Test independence at $5\%$.`, [T`Totals: rows $50,50$; columns $45,55$; $N=100$. $E=22.5,27.5,22.5,27.5$.`, T`Every $|O-E|=7.5$; Yates: $X^2=2\left(\frac{7^2}{22.5}+\frac{7^2}{27.5}\right)=7.92$.`, T`$\nu=1$, critical value $3.841$: reject $H_0$ — the answer depends on gender.`]),
  B.warn([T`Using Yates for tables larger than $2\times2$.`, T`$\nu=rc-1$ instead of $(r-1)(c-1)$.`]),
  B.exam([T`Conclude in context: "there is evidence of an association between … and …".`]),
  B.checks([[T`$3\times4$ table: $\nu$?`, T`$6$.`]]),
  B.examq(6, T`<p>A survey asked $50$ men and $50$ women whether they supported a proposal: $30$ men and $15$ women said yes. Test, at the $5\%$ level, whether support is independent of gender. <span class="mk">[6]</span></p>`,
    T`<p>$H_0$: independent <span class="mk">B1</span>. $E$: $22.5$, $27.5$ in each row <span class="mk">M1 A1</span>. Yates: $X^2=7.92$ <span class="mk">M1 A1</span>. $7.92\gt3.841$ ($\nu=1$): reject $H_0$ — support is associated with gender <span class="mk">A1</span>.</p>`),
  B.key([T`$E=\frac{RC}N$; $\nu=(r-1)(c-1)$; Yates for $2\times2$.`]),
].join('');
