// BCS Academy textbook — Further Maths A2 2, Section D: Discrete and Decision Mathematics.
'use strict';

BOOK.f4_pie = [
  B.why(T`<p>Counting a union by adding the sets overcounts the overlaps; subtracting the overlaps undercounts the triple overlap… The principle of inclusion and exclusion is the bookkeeping that gets it exactly right, and it solves the famous hat-check problem.</p>`),
  B.thm('Inclusion–exclusion', T`$$|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|.$$<p>In general: add the single sets, subtract the pairwise intersections, add the triple intersections, and so on with alternating signs.</p>`),
  B.proof(T`<p>Take an element in exactly $k\ge1$ of the sets. It is counted $\binom k1$ times in the singles, $\binom k2$ in the pairs, …, so in total $\binom k1-\binom k2+\binom k3-\dots=1-(1-1)^k=1$ time. Every element of the union is counted exactly once.</p>`),
  B.thm('Derangements', T`<p>The number of permutations of $n$ objects with none in its original place is $$D_n=n!\left(1-\frac1{1!}+\frac1{2!}-\frac1{3!}+\dots+\frac{(-1)^n}{n!}\right)\approx\frac{n!}e.$$</p>`),
  B.proof(T`<p>Let $A_i$ be the permutations fixing object $i$. Then $|A_{i_1}\cap\dots\cap A_{i_k}|=(n-k)!$, and there are $\binom nk$ such intersections. By inclusion–exclusion, the permutations fixing at least one object number $\sum_{k\ge1}(-1)^{k+1}\binom nk(n-k)!=\sum_{k\ge1}(-1)^{k+1}\frac{n!}{k!}$. Subtract from $n!$.</p>`),
  B.ex(1, T`How many integers from $1$ to $100$ are divisible by $2$, $3$ or $5$?`, [T`$50+33+20-16-10-6+3=74$.`]),
  B.ex(2, T`Find $D_4$ and list the derangements of $1234$.`, [T`$D_4=24\left(1-1+\frac12-\frac16+\frac1{24}\right)=9$.`, T`$2143,2341,2413,3142,3412,3421,4123,4312,4321$.`]),
  B.warn([T`Forgetting the triple-intersection term.`, T`Using $\lfloor n!/e\rfloor$ instead of the nearest integer.`]),
  B.exam([T`Set out the PIE terms explicitly with each set named.`]),
  B.checks([[T`$D_5$?`, T`$44$.`], [T`Probability a random permutation of $10$ is a derangement, approximately?`, T`$\frac1e\approx0.368$.`]]),
  B.examq(7, T`<p>(a) How many integers from $1$ to $1000$ are divisible by at least one of $2$, $3$ and $7$? <span class="mk">[3]</span> (b) Five letters are placed at random in five addressed envelopes. Find the probability that no letter is in the correct envelope. <span class="mk">[4]</span></p>`,
    T`<p>(a) $500+333+142-166-71-47+23=714$ <span class="mk">M1 M1 A1</span>. (b) $D_5=120\left(\frac12-\frac16+\frac1{24}-\frac1{120}\right)=44$ <span class="mk">M1 A1</span>; $\frac{44}{120}=\frac{11}{30}$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Inclusion–exclusion: alternate signs over intersections.`, T`$D_n=n!\sum\frac{(-1)^k}{k!}\approx\frac{n!}e$.`]),
].join('');

BOOK.f4_rook = [
  B.why(T`<p>Assigning people to jobs when some people can't do some jobs is a permutation with forbidden positions. Rook polynomials turn the forbidden squares into a count — inclusion–exclusion on a chessboard.</p>`),
  B.def('rook numbers', T`<p>Draw the $n\times n$ board with forbidden squares marked. $r_k$ is the number of ways to place $k$ rooks on forbidden squares with no two in the same row or column. The <b>rook polynomial</b> is $R(x)=\sum r_kx^k$ (with $r_0=1$).</p>`),
  B.thm('Counting permitted arrangements', T`$$N=\sum_{k=0}^n(-1)^kr_k(n-k)!$$<p>If the forbidden squares split into blocks with no shared rows or columns, $R(x)=R_1(x)R_2(x)$.</p>`),
  B.proof(T`<p>Let $A_s$ be the arrangements using forbidden square $s$. A choice of $k$ non-attacking forbidden squares can be completed in $(n-k)!$ ways, and there are $r_k$ such choices. Inclusion–exclusion over the forbidden squares gives the formula (attacking pairs contribute nothing, since no permutation uses both).</p>`),
  B.ex(1, T`Arrange $3$ objects with object $1$ not in position $1$ and object $2$ not in position $2$.`, [T`Forbidden squares $(1,1)$, $(2,2)$: $r_1=2$, $r_2=1$.`, T`$N=3!-2(2!)+1(1!)=3$.`]),
  B.warn([T`Counting attacking pairs in $r_2$.`, T`Forgetting $r_0=1$ contributes $n!$.`]),
  B.exam([T`Draw the board, mark forbidden squares, list $r_1,r_2,\dots$ before substituting.`]),
  B.checks([[T`Rook polynomial of a single square?`, T`$1+x$.`]]),
  B.examq(7, T`<p>Four people $P_1$–$P_4$ are to be given jobs A–D, one each. $P_1$ cannot do A; $P_2$ cannot do A or B; $P_3$ cannot do C; $P_4$ can do any job.</p><p>(a) Find the rook polynomial of the forbidden board. <span class="mk">[4]</span> (b) Hence find the number of possible allocations. <span class="mk">[3]</span></p>`,
    T`<p>(a) Forbidden: $(1,A),(2,A),(2,B),(3,C)$: $r_1=4$ <span class="mk">B1</span>; non-attacking pairs: $\{1A,2B\},\{1A,3C\},\{2A,3C\},\{2B,3C\}$, $r_2=4$ <span class="mk">M1 A1</span>; $r_3=1$ ($\{1A,2B,3C\}$): $R(x)=1+4x+4x^2+x^3$ <span class="mk">A1</span>.</p><p>(b) $24-4(6)+4(2)-1(1)=7$ <span class="mk">M1 A1 A1</span>.</p>`),
  B.key([T`$N=\sum(-1)^kr_k(n-k)!$.`, T`Disjoint blocks: multiply rook polynomials.`]),
].join('');

BOOK.f4_col = [
  B.why(T`<p>Scheduling exams so no student has two at once, assigning radio frequencies so neighbours don't interfere, colouring maps: all are graph colouring problems.</p>`),
  B.def('colourings', T`<ul><li><b>Vertex colouring</b>: adjacent vertices get different colours. The least number possible is the <b>chromatic number</b> $\chi(G)$.</li><li><b>Edge colouring</b>: edges meeting at a vertex get different colours. The least number is the <b>chromatic index</b> $\chi'(G)$.</li></ul>`),
  B.thm('Standard values', T`<ul><li>$\chi(K_n)=n$; $\chi(C_n)=2$ ($n$ even) or $3$ ($n$ odd); bipartite graphs (with an edge) and trees: $2$; a wheel (hub joined to a cycle): $\chi(\text{rim})+1$.</li><li>$\chi'(G)\ge\Delta$ (the greatest degree); $\chi'(K_n)=n-1$ ($n$ even), $n$ ($n$ odd); bipartite: $\chi'=\Delta$.</li></ul>`),
  B.ex(1, T`Five exams $A$–$E$ clash as follows: $AB$, $AC$, $BC$, $CD$, $DE$. How many sessions are needed?`, [T`$A,B,C$ form a triangle, so at least $3$.`, T`Sessions $\{A,D\}$, $\{B,E\}$, $\{C\}$ work: $\chi=3$.`]),
  B.warn([T`Assuming a greedy colouring is optimal — it gives an upper bound.`]),
  B.exam([T`Give a lower bound (a triangle, a $K_4$, an odd cycle) and a colouring achieving it.`]),
  B.checks([[T`$\chi(K_{3,5})$?`, T`$2$.`], [T`$\chi'(K_5)$?`, T`$5$.`]]),
  B.examq(5, T`<p>(a) State the chromatic number of $K_6$, $C_7$ and $K_{2,4}$. <span class="mk">[3]</span> (b) Find the chromatic index of $K_6$ and explain why it is at least $5$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $6$, $3$, $2$ <span class="mk">B3</span>. (b) $5$: every vertex has degree $5$, so at least $5$ colours meet there <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$\chi$: vertices; $\chi'$: edges, $\ge\Delta$.`]),
].join('');

BOOK.f4_flow = [
  B.why(T`<p>How much water can a pipe network carry? How many cars per hour can roads take from one town to another? The maximum flow is limited by the network's narrowest "cut" — and the max-flow min-cut theorem says that limit is exact.</p>`),
  B.def('flows and cuts', T`<ul><li>A <b>flow</b> assigns to each arc a value no more than its capacity, with inflow $=$ outflow at every vertex except the source $S$ and sink $T$.</li><li>A <b>cut</b> partitions the vertices into a set $X\ni S$ and its complement $\ni T$; its <b>capacity</b> is the sum of capacities of arcs from $X$ to the complement (arcs the other way are ignored).</li></ul>`),
  B.thm('Max-flow min-cut', T`<p>The value of a maximum flow equals the minimum capacity of a cut. So if you find a flow and a cut of equal value, both are optimal.</p>`),
  B.proof(T`<p>Every unit of flow from $S$ to $T$ must cross any cut from the $S$ side to the $T$ side, so every flow $\le$ every cut capacity. (That the two can always be made equal is the content of the theorem, proved by the augmenting-path algorithm.)</p>`, 'Why flow ≤ cut'),
  FIG.network({ S: [5, 50], A: [45, 15], B: [45, 85], T: [95, 50] }, [['S', 'A', 8], ['S', 'B', 6], ['A', 'B', 3], ['A', 'T', 5], ['B', 'T', 9]], 'Capacities: the cut separating {S} has capacity 14.', { directed: true }),
  B.ex(1, T`Find the maximum flow in the network above.`, [T`Cuts: $\{S\}$: $8+6=14$; $\{S,A\}$: $6+3+5=14$; $\{S,B\}$: $8+9=17$; $\{S,A,B\}$: $5+9=14$. Minimum $14$.`, T`A flow of $14$: $S\to A$ 8 (5 to $T$, 3 to $B$), $S\to B$ 6, $B\to T$ 9. So the maximum flow is $14$.`]),
  B.warn([T`Adding backward arcs into a cut's capacity.`]),
  B.exam([T`Exhibit both a flow and a cut with the same value — that is the proof of optimality.`]),
  B.checks([[T`Can a flow exceed a cut's capacity?`, T`No.`]]),
  B.examq(5, T`<p>For the network in this chapter's figure:</p><p>(a) List the capacities of the four cuts separating $S$ from $T$. <span class="mk">[2]</span> (b) Find a flow of value $14$ and explain why it is maximal. <span class="mk">[3]</span></p>`,
    T`<p>(a) $14,14,17,14$ <span class="mk">B2</span>. (b) Flow as in Example 1 <span class="mk">B2</span>; it equals the minimum cut, so by max-flow min-cut it is maximal <span class="mk">B1</span>.</p>`),
  B.key([T`Cut capacity counts forward arcs only.`, T`Max flow $=$ min cut.`]),
].join('');

BOOK.f4_match = [
  B.why(T`<p>Workers and jobs, students and projects, donors and recipients: matching problems live on bipartite graphs. Hall's theorem gives a clean test for when everyone can be matched.</p>`),
  B.def('matchings', T`<ul><li>A <b>bipartite graph</b> has vertex sets $X$ and $Y$, with every edge joining $X$ to $Y$.</li><li>A <b>matching</b> is a set of edges with no shared vertices; it is <b>maximal</b> if no edge can be added, <b>maximum</b> if no matching is larger, and <b>complete</b> if every vertex of $X$ is matched.</li><li>An <b>alternating path</b> starts at an unmatched vertex of $X$, alternates non-matching/matching edges and ends at an unmatched vertex of $Y$. Switching its edges increases the matching by one.</li></ul>`),
  B.thm("Hall's marriage theorem", T`<p>A complete matching from $X$ to $Y$ exists if and only if every subset $A\subseteq X$ is adjacent to at least $|A|$ vertices of $Y$.</p>`),
  B.ex(1, T`A can do jobs 1, 2; B only 1; C jobs 2, 3; D jobs 3, 4. Start with A–1, C–2, D–3 and improve.`, [T`B is unmatched. Alternating path B–1–A–2–C–3–D–4.`, T`Switch: B–1, A–2, C–3, D–4 — a complete matching.`]),
  B.ex(2, T`A, B, C can each do only jobs 1 or 2. Is a complete matching possible?`, [T`$\{A,B,C\}$ is adjacent to $\{1,2\}$: $3\gt2$, so Hall's condition fails. No.`]),
  B.warn([T`Confusing maximal with maximum.`]),
  B.exam([T`Write the alternating path explicitly and the improved matching.`]),
  B.checks([[T`How many complete matchings in $K_{3,3}$?`, T`$6$.`]]),
  B.examq(6, T`<p>Workers A, B, C, D and jobs 1–4: A can do 1, 2; B can do 1; C can do 2, 3; D can do 3, 4. An initial matching is A–1, C–2, D–3.</p><p>(a) Find an alternating path from B and use it to obtain a complete matching. <span class="mk">[4]</span> (b) State Hall's theorem. <span class="mk">[2]</span></p>`,
    T`<p>(a) B–1–A–2–C–3–D–4 <span class="mk">M1 A1</span>; complete matching B–1, A–2, C–3, D–4 <span class="mk">A2</span>. (b) A complete matching exists iff every set of $k$ workers can between them do at least $k$ jobs <span class="mk">B2</span>.</p>`),
  B.key([T`Alternating paths increase a matching.`, T`Hall: $|N(A)|\ge|A|$ for every $A$.`]),
].join('');

BOOK.f4_nn = [
  B.why(T`<p>A delivery driver must visit every customer and return. Trying every route is impossible for large networks, so we use fast heuristics. The nearest neighbour algorithm builds a reasonable tour in seconds.</p>`),
  B.def('nearest neighbour algorithm', T`<ol><li>Choose a starting vertex.</li><li>Move to the nearest vertex not yet visited.</li><li>Repeat until all vertices are visited, then return to the start.</li></ol><p>The tour's length is an <b>upper bound</b> for the travelling salesperson problem; trying every start and taking the best improves the bound.</p>`),
  T`<table class="tbl"><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><th>A</th><td>–</td><td>7</td><td>5</td><td>9</td><td>6</td></tr><tr><th>B</th><td>7</td><td>–</td><td>4</td><td>3</td><td>8</td></tr><tr><th>C</th><td>5</td><td>4</td><td>–</td><td>10</td><td>2</td></tr><tr><th>D</th><td>9</td><td>3</td><td>10</td><td>–</td><td>11</td></tr><tr><th>E</th><td>6</td><td>8</td><td>2</td><td>11</td><td>–</td></tr></table>`,
  B.ex(1, T`Apply the nearest neighbour algorithm from $A$ to the table above.`, [T`A → C (5) → E (2) → B (8) → D (3) → A (9).`, T`Length $27$: an upper bound.`]),
  B.warn([T`Returning to the start before every vertex is visited.`, T`Claiming the tour is optimal.`]),
  B.exam([T`List the tour and each step's distance.`]),
  B.checks([[T`Is a nearest-neighbour tour always the shortest?`, T`No.`]]),
  B.examq(4, T`<p>Using the distance table in this chapter, apply the nearest neighbour algorithm starting from $A$. Give the tour and its length, and state what the length tells you. <span class="mk">[4]</span></p>`,
    T`<p>A, C, E, B, D, A <span class="mk">M1 A1</span>; $27$ <span class="mk">A1</span>; an upper bound for the shortest tour <span class="mk">B1</span>.</p>`),
  B.key([T`Nearest unvisited each time; return to start.`, T`Gives an upper bound.`]),
].join('');

BOOK.f4_pert = [
  B.why(T`<p>Activity times are rarely certain. PERT gives each activity three estimates and treats the project time as a random variable, so a manager can say "there is a 93% chance we finish by Friday".</p>`),
  B.thm('PERT estimates', T`<p>For optimistic, most likely and pessimistic times $a$, $m$, $b$: $$\mu=\frac{a+4m+b}6,\qquad\sigma^2=\left(\frac{b-a}6\right)^2.$$</p>`),
  B.thm('Probability of completion', T`<ol><li>Use the expected times $\mu$ to find the critical path (forward and backward passes).</li><li>Project time $\approx N\left(\sum\mu,\ \sum\sigma^2\right)$ over the critical activities (assuming independence).</li><li>$P(\text{complete by }T)=\Phi\left(\frac{T-\sum\mu}{\sqrt{\sum\sigma^2}}\right)$.</li></ol>`),
  B.ex(1, T`An activity has $a=2$, $m=5$, $b=14$. Find its expected time and variance.`, [T`$\mu=\frac{2+20+14}6=6$; $\sigma^2=\left(\frac{12}6\right)^2=4$.`]),
  B.ex(2, T`A critical path has total expected time $20$ days and total variance $4$. Find the probability of finishing within $23$ days.`, [T`$\Phi\left(\frac{23-20}2\right)=\Phi(1.5)=0.933$.`]),
  B.warn([T`Adding standard deviations instead of variances.`, T`Including non-critical activities in the variance.`]),
  B.exam([T`State the assumptions: independent activity times; the critical path stays critical.`]),
  B.checks([[T`$a=4$, $m=4$, $b=4$: variance?`, T`$0$.`]]),
  B.examq(6, T`<p>A project's critical path consists of three activities with $(a,m,b)$ times $(2,5,14)$, $(3,4,5)$ and $(4,6,14)$ days.</p><p>(a) Find the expected duration and variance of the project. <span class="mk">[4]</span> (b) Find the probability that it is completed within $20$ days. <span class="mk">[2]</span></p>`,
    T`<p>(a) Means $6,4,7$: total $17$ <span class="mk">M1 A1</span>; variances $4,\frac19,\frac{25}9$: total $6.89$ <span class="mk">M1 A1</span>.</p><p>(b) $\Phi\left(\frac{3}{\sqrt{6.89}}\right)=\Phi(1.143)=0.873$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$\mu=\frac{a+4m+b}6$, $\sigma^2=\left(\frac{b-a}6\right)^2$.`, T`Normal approximation along the critical path.`]),
].join('');

BOOK.f4_simplex = [
  B.why(T`<p>Maximising profit subject to limited resources is linear programming. With two variables you can draw the feasible region; the simplex method does the same search algebraically, moving from vertex to better vertex — and it scales to thousands of variables.</p>`),
  B.def('the simplex tableau', T`<ol><li>Write each constraint $a_ix+b_iy\le c_i$ as an equation with a slack variable $s_i\ge0$.</li><li>Write the objective as $P-px-qy=0$ in the last row.</li><li><b>Pivot column</b>: most negative entry in the objective row. <b>Pivot row</b>: smallest ratio of value to positive pivot-column entry.</li><li>Divide the pivot row by the pivot; subtract multiples of it from the other rows to clear the column.</li><li>Stop when the objective row has no negative entries; read off $P$ and the basic variables.</li></ol>`),
  B.ex(1, T`Maximise $P=2x+3y$ subject to $x+y\le4$, $x+3y\le6$, $x,y\ge0$.`, [
    T`Pivot on $y$ (entry $-3$); ratios $4$ and $2$, so row 2: $\frac13x+y+\frac13s_2=2$.`, T`Update: row 1 $\frac23x+s_1-\frac13s_2=2$; objective $P-x+s_2=6$.`,
    T`Still a negative ($-1$ for $x$). Ratios $\frac2{2/3}=3$, $\frac2{1/3}=6$: pivot row 1: $x+\frac32s_1-\frac12s_2=3$.`, T`Update: $y-\frac12s_1+\frac12s_2=1$; $P+\frac32s_1+\frac12s_2=9$.`, T`No negatives: maximum $P=9$ at $x=3$, $y=1$.`]),
  B.warn([T`Choosing a negative or zero entry for the ratio test.`, T`Stopping while the objective row still has a negative entry.`]),
  B.exam([T`Show each tableau and label the pivot; state the final values of all variables.`]),
  B.checks([[T`Objective row $P-4x-7y=0$: entering variable?`, T`$y$.`]]),
  B.examq(8, T`<p>Use the simplex algorithm to maximise $P=2x+3y$ subject to $x+y\le4$, $x+3y\le6$, $x\ge0$, $y\ge0$. Show your tableaux and interpret the final tableau. <span class="mk">[8]</span></p>`,
    T`<p>Initial tableau with slacks <span class="mk">B1</span>; first pivot on $y$ in row 2 <span class="mk">M1 A1</span>; second pivot on $x$ in row 1 <span class="mk">M1 A1</span>; final row $P+\frac32s_1+\frac12s_2=9$ <span class="mk">A1</span>; $P=9$ at $x=3$, $y=1$, $s_1=s_2=0$ <span class="mk">A1</span> (both constraints are tight) <span class="mk">B1</span>.</p>`),
  B.key([T`Most negative objective entry; smallest positive ratio.`, T`Optimal when no negatives remain.`]),
].join('');

BOOK.f4_gf = [
  B.why(T`<p>A generating function stores a whole sequence as the coefficients of a power series. Multiplying generating functions does counting automatically — choosing, distributing, making change — and comparing coefficients proves identities.</p>`),
  B.def('generating function', T`<p>The generating function of $a_0,a_1,a_2,\dots$ is $G(x)=\sum a_rx^r$. Key examples: $(1+x)^n=\sum\binom nrx^r$; $\frac1{1-x}=\sum x^r$; $\frac1{(1-x)^k}=\sum\binom{r+k-1}{k-1}x^r$.</p>`),
  B.thm('Counting with products', T`<p>If one choice has generating function $A(x)$ (coefficient of $x^r$ = ways to contribute $r$) and an independent choice has $B(x)$, the combined choice has $A(x)B(x)$.</p>`),
  B.ex(1, T`How many non-negative integer solutions has $a+b+c=10$?`, [T`Coefficient of $x^{10}$ in $(1+x+x^2+\dots)^3=\frac1{(1-x)^3}$: $\binom{12}2=66$.`]),
  B.ex(2, T`Prove Vandermonde's identity $\sum_k\binom mk\binom n{r-k}=\binom{m+n}r$.`, [T`$(1+x)^m(1+x)^n=(1+x)^{m+n}$.`, T`Coefficient of $x^r$ on the left is $\sum_k\binom mk\binom n{r-k}$; on the right $\binom{m+n}r$.`], T`Combinatorially: choose $r$ people from $m$ men and $n$ women by first deciding how many men.`),
  B.ex(3, T`In how many ways can $12$p be made from $1$p, $2$p and $5$p coins?`, [T`Coefficient of $x^{12}$ in $\frac1{(1-x)(1-x^2)(1-x^5)}$: $13$.`]),
  B.warn([T`Forgetting the constant term $1$ (choosing none).`]),
  B.exam([T`State the generating function, then the coefficient you need.`]),
  B.checks([[T`Coefficient of $x^3$ in $(1+x)^6$?`, T`$20$.`]]),
  B.examq(6, T`<p>(a) Write down a generating function for the number of ways to choose $r$ sweets from an unlimited supply of three types, and hence find the number of ways to choose $8$ sweets. <span class="mk">[3]</span> (b) By considering $(1+x)^{2n}=(1+x)^n(1+x)^n$, prove that $\sum_{k=0}^n\binom nk^2=\binom{2n}n$. <span class="mk">[3]</span></p>`,
    T`<p>(a) $\frac1{(1-x)^3}$ <span class="mk">B1</span>; $\binom{10}2=45$ <span class="mk">M1 A1</span>.</p><p>(b) Coefficient of $x^n$: right side $\sum_k\binom nk\binom n{n-k}$ <span class="mk">M1</span>; $\binom n{n-k}=\binom nk$ <span class="mk">M1</span>; left side $\binom{2n}n$ <span class="mk">A1</span>.</p>`),
  B.key([T`Coefficients store the counts; products combine choices.`, T`Compare coefficients to prove identities.`]),
].join('');

BOOK.f4_sym = [
  B.why(T`<p>The symmetries of an object — the moves that leave it looking the same — form a group. Knowing these groups is the first step towards counting colourings that are "the same up to symmetry".</p>`),
  B.def('symmetry groups', T`<ul><li>$C_n$: the $n$ rotations of a regular $n$-gon (cyclic, order $n$).</li><li>$D_{2n}$: rotations and $n$ reflections (or flips) of a regular $n$-gon, order $2n$.</li><li>Rotations of the regular tetrahedron: order $12$; cube and octahedron: order $24$ (they are duals). With reflections the orders double.</li></ul>`),
  B.thm('Order of the cube rotation group', T`<p>The cube has $24$ rotational symmetries.</p>`),
  B.proof(T`<p>A rotation is determined by where it sends one chosen face (any of $6$) and which way that face is turned (any of $4$ positions): $6\times4=24$. They are: the identity; $9$ face rotations ($90^\circ,180^\circ,270^\circ$ about $3$ axes); $8$ vertex rotations ($120^\circ$, $240^\circ$ about $4$ diagonals); $6$ edge half-turns.</p>`),
  B.ex(1, T`List the symmetries of a square and their periods.`, [T`Rotations $0^\circ$ (period 1), $90^\circ$, $270^\circ$ (period 4), $180^\circ$ (period 2); four reflections (period 2). $D_8$ has order $8$.`]),
  B.warn([T`Counting reflections as rotations in a rotation group.`]),
  B.exam([T`When listing a group, describe each element geometrically (axis and angle).`]),
  B.checks([[T`Order of $D_{12}$?`, T`$12$ (symmetries of a hexagon).`]]),
  B.examq(5, T`<p>(a) State the orders of $C_5$, $D_{10}$ and the rotation group of a regular tetrahedron. <span class="mk">[3]</span> (b) Explain why the rotation group of a cube has order $24$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $5$, $10$, $12$ <span class="mk">B3</span>. (b) Any of $6$ faces can be moved to the top, then rotated into $4$ positions <span class="mk">B1</span>: $6\times4=24$ <span class="mk">B1</span>.</p>`),
  B.key([T`$|C_n|=n$, $|D_{2n}|=2n$; tetrahedron $12$, cube/octahedron $24$.`]),
].join('');

BOOK.f4_polya = [
  B.why(T`<p>How many different necklaces can you make from $6$ beads in $3$ colours, if turning the necklace doesn't count as different? Burnside's lemma and Pólya's theorem answer this by averaging over the symmetry group.</p>`),
  B.def('cycle index', T`<p>Write each symmetry as a permutation of the objects being coloured, split into disjoint cycles; record a term $x_1^{a_1}x_2^{a_2}\cdots$ for $a_k$ cycles of length $k$. The cycle index $P_G$ is the average of these terms over the group. For example, $P_{C_4}=\frac14(x_1^4+x_2^2+2x_4)$.</p>`),
  B.thm("Pólya's enumeration theorem", T`<ul><li>The number of distinct colourings with $k$ colours is $P_G(k,k,\dots,k)$.</li><li>The <b>pattern inventory</b> $P_G(b+w,\ b^2+w^2,\ \dots)$ lists the colourings by colour content: the coefficient of $b^rw^{n-r}$ counts those with $r$ black objects. With three colours, substitute $x_i=b^i+w^i+r^i$.</li></ul>`),
  B.proof(T`<p>A colouring is fixed by a symmetry exactly when each cycle is one colour, so the symmetry fixes $k^{c}$ colourings, $c$ the number of cycles — that is its cycle-index term with every $x_i=k$. Burnside's lemma says the number of distinct colourings is the average number fixed, which is $P_G(k,\dots,k)$.</p>`, 'Why it works (Burnside)'),
  B.ex(1, T`Count necklaces of $4$ beads in $2$ colours under rotation.`, [T`$P_{C_4}(2)=\frac14(16+4+2\times2)=6$.`]),
  B.ex(2, T`Count the ways to colour the faces of a cube with $2$ colours.`, [T`$P=\frac1{24}(x_1^6+6x_1^2x_4+3x_1^2x_2^2+8x_3^2+6x_2^3)$ (booklet).`, T`$\frac1{24}(64+48+48+32+48)=10$.`, T`Pattern inventory: $b^6+b^5w+2b^4w^2+2b^3w^3+2b^2w^4+bw^5+w^6$ — e.g. $2$ ways with $3$ black faces (around a corner, or in a band).`]),
  B.warn([T`Using the group order for the wrong objects (faces vs vertices vs edges).`, T`Forgetting to divide by $|G|$.`]),
  B.exam([T`Quote the cycle index you are using, substitute, and simplify carefully.`]),
  B.checks([[T`Necklaces of $3$ beads, $2$ colours, rotations only?`, T`$4$.`]]),
  B.examq(7, T`<p>(a) Write down the cycle index of $C_6$, the rotation group of a necklace of six beads. <span class="mk">[3]</span> (b) Hence find the number of distinct necklaces with beads of $2$ colours. <span class="mk">[2]</span> (c) How many of these have exactly $3$ black beads? <span class="mk">[2]</span></p>`,
    T`<p>(a) $P=\frac16(x_1^6+x_2^3+2x_3^2+2x_6)$ <span class="mk">B3</span>. (b) $\frac16(64+8+8+4)=14$ <span class="mk">M1 A1</span>.</p><p>(c) Coefficient of $b^3w^3$ in $\frac16\left[(b+w)^6+(b^2+w^2)^3+2(b^3+w^3)^2+2(b^6+w^6)\right]=\frac16(20+0+4+0)=4$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$P_G$: average of cycle-type terms.`, T`Count: $P_G(k,\dots,k)$; inventory: substitute $x_i=b^i+w^i$.`]),
].join('');
