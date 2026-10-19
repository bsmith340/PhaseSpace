// BcsMaths textbook — Further Maths AS 2, Section D: Discrete and Decision Mathematics.
'use strict';

const ttab = (vars, cols) => { const rows = []; const n = vars.length; for (let i = 0; i < 2 ** n; i++) { const v = vars.map((_, k) => !((i >> (n - 1 - k)) & 1)); rows.push(v); }
  return `<table class="tbl tt"><tr>${[...vars, ...cols.map(c => c[0])].map(h => `<th>$${h}$</th>`).join('')}</tr>${rows.map(v => `<tr>${[...v, ...cols.map(c => c[1](...v))].map(x => `<td>${x ? 'T' : 'F'}</td>`).join('')}</tr>`).join('')}</table>`; };
const ctab = (els, op) => `<table class="tbl"><tr><th>$\\circ$</th>${els.map(e => `<th>${e}</th>`).join('')}</tr>${els.map(a => `<tr><th>${a}</th>${els.map(b => `<td>${op(a, b)}</td>`).join('')}</tr>`).join('')}</table>`;
const G6 = { A: [6, 50], B: [36, 12], C: [36, 88], D: [66, 12], E: [66, 88], F: [94, 50] };
const W6 = [['A', 'B', 7], ['A', 'C', 5], ['B', 'D', 6], ['C', 'E', 4], ['D', 'F', 3], ['E', 'F', 8], ['B', 'C', 3], ['D', 'E', 9]];

BOOK.f2_grp = [
  B.why(T`<p>Rotating a square, adding hours on a clock, multiplying by $-1$ — very different actions share one structure. Group theory studies that structure: a set with an operation that can always be combined and undone.</p>`),
  B.def('group', T`<p>A set $G$ with a binary operation $\circ$ is a <b>group</b> if:</p><ol><li><b>closure</b>: $a\circ b\in G$ for all $a,b\in G$;</li><li><b>associativity</b>: $(a\circ b)\circ c=a\circ(b\circ c)$;</li><li><b>identity</b>: there is $e\in G$ with $e\circ a=a\circ e=a$ for all $a$;</li><li><b>inverses</b>: every $a$ has $a^{-1}\in G$ with $a\circ a^{-1}=a^{-1}\circ a=e$.</li></ol><p>The <b>order</b> $|G|$ is the number of elements. The <b>period</b> (order) of $a$ is the least $n\ge1$ with $a^n=e$.</p>`),
  B.thm('Uniqueness', T`<p>A group has exactly one identity, and each element has exactly one inverse. In a group's Cayley table every element appears once in each row and each column.</p>`),
  B.proof(T`<p>If $e$ and $e'$ are both identities, $e=e\circ e'=e'$. If $b$ and $c$ are both inverses of $a$, then $b=b\circ e=b\circ(a\circ c)=(b\circ a)\circ c=e\circ c=c$. For the table: if $a\circ x=a\circ y$ then, multiplying on the left by $a^{-1}$, $x=y$ — so no entry repeats in a row.</p>`),
  T`${ctab([1, 2, 3, 4], (a, b) => (a * b) % 5)}`,
  B.ex(1, T`Show that $\{1,2,3,4\}$ under multiplication modulo $5$ is a group.`, [T`Closure: every entry of the table above is in the set.`, T`Associativity: inherited from multiplication of integers.`, T`Identity: $1$.`, T`Inverses: $1^{-1}=1$, $2^{-1}=3$, $3^{-1}=2$, $4^{-1}=4$ (each row contains a $1$).`]),
  B.ex(2, T`Explain why $\{0,1,2,3\}$ under $\times_4$ is not a group.`, [T`The identity would be $1$, but $0\times x=0$ for every $x$: $0$ has no inverse (nor has $2$).`]),
  B.ex(3, T`Find the period of each element of $(\mathbb Z_6,+_6)$.`, [T`$0$: $1$; $1$: $6$; $2$: $3$; $3$: $2$; $4$: $3$; $5$: $6$.`], T`In $(\mathbb Z_n,+)$ the period of $a$ is $\frac n{\gcd(a,n)}$.`),
  B.ex(4, T`Show that the four matrices $\mathbf I$, $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$, $-\mathbf I$, $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ form a group under multiplication.`, [T`They are the rotations through $0^\circ,90^\circ,180^\circ,270^\circ$; composing two rotations gives another, so the set is closed.`, T`Matrix multiplication is associative; $\mathbf I$ is the identity; the $90^\circ$ and $270^\circ$ rotations are inverses, and each of the others is its own inverse.`]),
  B.warn([T`Forgetting to state associativity (even when inherited).`, T`Checking inverses before identifying the identity.`]),
  B.exam([T`Use the four axioms as headings in "show that $G$ is a group" questions.`]),
  B.checks([[T`Is $(\mathbb Z,\times)$ a group?`, T`No: $2$ has no integer inverse.`], [T`Period of $3$ in $(\mathbb Z_{12},+)$?`, T`$4$.`]]),
  B.examq(8, T`<p>The set $S=\{1,3,5,7\}$ is combined under multiplication modulo $8$.</p><p>(a) Construct the Cayley table. <span class="mk">[2]</span> (b) Show that $S$ forms a group. <span class="mk">[4]</span> (c) State the period of each element. <span class="mk">[2]</span></p>`,
    T`${ctab([1, 3, 5, 7], (a, b) => (a * b) % 8)}<p>(a) Table above <span class="mk">B2</span>. (b) Closed (all entries in $S$) <span class="mk">B1</span>; associative (multiplication of integers) <span class="mk">B1</span>; identity $1$ <span class="mk">B1</span>; each element is its own inverse <span class="mk">B1</span>.</p><p>(c) $1$ has period $1$; $3$, $5$, $7$ have period $2$ <span class="mk">B2</span>.</p>`),
  B.key([T`Closure, associativity, identity, inverses.`, T`Order of a group; period of an element.`]),
].join('');

BOOK.f2_sub = [
  B.why(T`<p>Inside the rotations of a square are the half-turns alone; inside the integers mod 6 are the even ones. These groups-within-groups are subgroups, and Lagrange's theorem says their sizes are tightly controlled.</p>`),
  B.def('subgroup', T`<p>$H\subseteq G$ is a <b>subgroup</b> if it is a group under the same operation. Check closure, that $e\in H$, and inverses; associativity is inherited. $\{e\}$ and $G$ are the trivial and improper subgroups; others are <b>proper</b>.</p>`),
  B.thm("Lagrange's theorem", T`<p>If $H$ is a subgroup of a finite group $G$, then $|H|$ divides $|G|$. (Proof not required.)</p><p>Consequences: the period of every element divides $|G|$ (it is the order of the subgroup it generates); a group of prime order has no proper non-trivial subgroups and is cyclic.</p>`),
  B.def('cyclic groups and generators', T`<p>$G$ is <b>cyclic</b> if some $g$ — a <b>generator</b> — gives every element as a power $g^k$ (or multiple $kg$). Then the period of $g$ equals $|G|$. $(\mathbb Z_n,+)$ is cyclic, generated by any $k$ with $\gcd(k,n)=1$.</p>`),
  B.ex(1, T`Find all subgroups of $(\mathbb Z_6,+_6)$.`, [T`Possible orders $1,2,3,6$.`, T`$\{0\}$, $\{0,3\}$, $\{0,2,4\}$, $\mathbb Z_6$.`]),
  B.ex(2, T`Is $\{0,1,2\}$ a subgroup of $\mathbb Z_6$?`, [T`No: $1+2=3\notin\{0,1,2\}$ — not closed.`]),
  B.ex(3, T`Show that $3$ generates $(\{1,\dots,6\},\times_7)$.`, [T`Powers of $3$: $3,2,6,4,5,1$ — all six elements, so the group is cyclic with generator $3$.`]),
  B.warn([T`Concluding that a subgroup exists for every divisor (true for cyclic groups, not proved here in general).`, T`Forgetting to check closure.`]),
  B.exam([T`Quote Lagrange by name when ruling out a subgroup order.`]),
  B.checks([[T`Can a group of order 15 have a subgroup of order 4?`, T`No — 4 does not divide 15.`], [T`Generators of $\mathbb Z_5$?`, T`$1,2,3,4$.`]]),
  B.examq(6, T`<p>$G$ is the set $\{1,2,3,4,5,6\}$ under multiplication modulo $7$.</p><p>(a) Show that $3$ is a generator of $G$. <span class="mk">[3]</span> (b) Find the subgroup of $G$ of order $3$. <span class="mk">[2]</span> (c) Explain why $G$ has no subgroup of order $4$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $3^1,\dots,3^6\equiv3,2,6,4,5,1$ <span class="mk">M1 A1</span>: every element, so $3$ generates $G$ <span class="mk">A1</span>.</p><p>(b) $\{1,2,4\}$ (generated by $2$: $2,4,1$) <span class="mk">M1 A1</span>. (c) $4$ does not divide $6$ (Lagrange) <span class="mk">B1</span>.</p>`),
  B.key([T`Lagrange: $|H|$ divides $|G|$.`, T`Cyclic: generated by one element of period $|G|$.`]),
].join('');

BOOK.f2_iso = [
  B.why(T`<p>The rotations of a square and the numbers $\{1,2,3,4\}$ under multiplication mod 5 have identical Cayley tables once you relabel the elements. Isomorphism makes "the same structure" precise.</p>`),
  B.def('isomorphism', T`<p>$\phi:G\to H$ is an <b>isomorphism</b> if it is a one-to-one correspondence and $\phi(a\circ b)=\phi(a)*\phi(b)$ for all $a,b$. Then $G\cong H$.</p>`),
  B.thm('Properties preserved', T`<p>Isomorphic groups have the same order, the same number of elements of each period, and one is cyclic exactly when the other is. If any of these differ, the groups are not isomorphic.</p>`),
  B.thm('Groups of order 4', T`<p>Every group of order $4$ is isomorphic to either the cyclic group $\mathbb Z_4$ (an element of period 4) or the Klein four-group $V_4$ (every non-identity element has period 2).</p>`),
  B.ex(1, T`Show that $(\mathbb Z_4,+_4)\cong(\{1,2,3,4\},\times_5)$.`, [T`$2$ has period $4$ in the second group, so both are cyclic of order $4$.`, T`$\phi(k)=2^k$: $0\mapsto1$, $1\mapsto2$, $2\mapsto4$, $3\mapsto3$; then $\phi(a+b)=2^{a+b}=2^a2^b$.`]),
  B.ex(2, T`Show that $\mathbb Z_4$ is not isomorphic to $(\{1,3,5,7\},\times_8)$.`, [T`$\mathbb Z_4$ has an element of period $4$; every non-identity element of the second group has period $2$. Isomorphisms preserve periods, so they are not isomorphic.`]),
  B.warn([T`Matching elements in any order — the identity must map to the identity and periods must match.`]),
  B.exam([T`To prove "not isomorphic", one structural difference is enough; to prove "isomorphic", give the map (or show both are cyclic of the same order).`]),
  B.checks([[T`Are all groups of order 5 isomorphic?`, T`Yes — all are cyclic.`]]),
  B.examq(7, T`<p>(a) Show that $G=\{1,2,4,5,7,8\}$ under multiplication modulo $9$ is cyclic, stating a generator. <span class="mk">[3]</span> (b) State, with a reason, whether $G$ is isomorphic to $(\mathbb Z_6,+_6)$. <span class="mk">[2]</span> (c) Write down an isomorphism from $\mathbb Z_6$ to $G$. <span class="mk">[2]</span></p>`,
    T`<p>(a) Powers of $2$: $2,4,8,7,5,1$ <span class="mk">M1 A1</span>; $2$ generates $G$ <span class="mk">A1</span>. (b) Yes: both are cyclic of order $6$ <span class="mk">B1 B1</span>. (c) $\phi(k)=2^k\bmod9$ <span class="mk">B1 B1</span>.</p>`),
  B.key([T`Isomorphic ⇔ same structure (a structure-preserving bijection).`, T`Compare orders, periods, cyclicity.`]),
].join('');

BOOK.f2_graph = [
  B.why(T`<p>Road maps, social networks and circuit boards are all <b>graphs</b>: dots and the connections between them. A small vocabulary and one counting fact — the handshaking lemma — go a long way.</p>`),
  B.def('graphs', T`<ul><li>A graph has <b>vertices</b> joined by <b>edges</b>; the <b>degree</b> of a vertex is the number of edges meeting it (a loop counts twice).</li><li>A <b>simple</b> graph has no loops or multiple edges. A <b>subgraph</b> uses some of the vertices and edges.</li><li><b>Planar</b>: can be drawn with no crossing edges.</li><li><b>Weighted</b>: edges carry numbers. <b>Digraph</b>: edges have directions; each arc adds one to an out-degree and one to an in-degree.</li></ul>`),
  B.thm('Handshaking lemma', T`<p>$\sum\deg v=2\times(\text{number of edges})$. Hence the number of odd-degree vertices is even.</p>`),
  B.proof(T`<p>Each edge has two ends, contributing $1$ to the degree of each end vertex (or $2$ to one vertex, for a loop). So the degree sum counts every edge twice. An even total can't contain an odd number of odd terms.</p>`),
  B.def('standard graphs', T`<ul><li>$K_n$: complete graph, every pair of $n$ vertices joined — $\binom n2=\frac{n(n-1)}2$ edges.</li><li>$K_{m,n}$: complete bipartite — two sets of $m$ and $n$ vertices, every vertex joined to every vertex of the other set — $mn$ edges.</li><li>$S_n$: star — one centre joined to $n-1$ others — $n-1$ edges.</li><li>$K_5$ and $K_{3,3}$ are not planar; $K_4$ is.</li></ul>`),
  FIG.network({ A: [10, 50], B: [50, 10], C: [90, 50], D: [50, 90], E: [50, 50] }, [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'E'], ['B', 'E'], ['C', 'E'], ['D', 'E']], 'The wheel on 5 vertices: degrees 3, 3, 3, 3, 4 — sum 16, so 8 edges.'),
  B.ex(1, T`A graph has degree sequence $3,3,2,2,2$. How many edges?`, [T`$\frac{12}2=6$.`]),
  B.ex(2, T`How many edges do $K_6$, $K_{3,4}$ and $S_7$ have?`, [T`$15$, $12$, $6$.`]),
  B.warn([T`Saying a graph is non-planar because your drawing has crossings — try redrawing.`, T`Forgetting loops add 2 to a degree.`]),
  B.exam([T`Use the handshaking lemma to rule out impossible degree sequences.`]),
  B.checks([[T`Can a graph have exactly three odd vertices?`, T`No.`], [T`Edges in $K_{10}$?`, T`$45$.`]]),
  B.examq(6, T`<p>(a) Explain why no graph has degree sequence $3,3,3,2,2$. <span class="mk">[2]</span> (b) The complete graph $K_n$ has $45$ edges. Find $n$. <span class="mk">[2]</span> (c) Draw $K_{2,3}$ and state whether it is planar. <span class="mk">[2]</span></p>`,
    T`<p>(a) The degree sum is $13$, odd — but it must be twice the number of edges <span class="mk">B1 B1</span>. (b) $\frac{n(n-1)}2=45\Rightarrow n=10$ <span class="mk">M1 A1</span>. (c) Correct drawing <span class="mk">B1</span>; planar <span class="mk">B1</span>.</p>`),
  B.key([T`$\sum\deg=2|E|$.`, T`$K_n$: $\binom n2$ edges; $K_{m,n}$: $mn$; $S_n$: $n-1$.`]),
].join('');

BOOK.f2_trav = [
  B.why(T`<p>Can you walk across every bridge of a town exactly once? Euler answered this for Königsberg in 1736 and started graph theory. The answer depends only on the degrees of the vertices.</p>`),
  B.def('trails and circuits', T`<ul><li>A <b>trail</b> uses no edge twice; a <b>circuit</b> is a closed trail.</li><li><b>Eulerian circuit</b>: a circuit using every edge exactly once. <b>Eulerian trail</b>: a trail using every edge once, ending at a different vertex (the graph is <b>semi-Eulerian</b>).</li><li><b>Hamiltonian path / cycle</b>: visits every <b>vertex</b> exactly once (a cycle returns to the start).</li></ul>`),
  B.thm("Euler's conditions", T`<p>A connected graph has an Eulerian circuit ⇔ every vertex has even degree; it has an Eulerian trail (not closed) ⇔ exactly two vertices have odd degree, and the trail runs between them.</p>`),
  B.proof(T`<p>Every time a circuit passes through a vertex it uses two edges (in and out), so a vertex's degree must be even. A trail that starts at $u$ and ends at $v$ uses one unmatched edge at each end, so $u$ and $v$ are odd and all others even. (The converse — that the conditions are enough — is proved by building the circuit.)</p>`, 'Why the condition is necessary'),
  B.ex(1, T`Königsberg's four land masses have degrees $5,3,3,3$. Is there a walk crossing every bridge once?`, [T`Four odd vertices — more than two — so no Eulerian trail.`]),
  B.ex(2, T`For which $n$ is $K_n$ Eulerian?`, [T`Every vertex has degree $n-1$, which is even ⇔ $n$ is odd.`]),
  B.ex(3, T`How many Hamiltonian cycles does $K_5$ have?`, [T`$\frac{(5-1)!}2=12$ (fix a start, order the other four, halve for direction).`]),
  B.warn([T`Confusing Eulerian (edges) with Hamiltonian (vertices).`, T`Forgetting the graph must be connected.`]),
  B.exam([T`List the degrees, count the odd ones, and quote the condition.`]),
  B.checks([[T`Degrees $2,2,4,4,2$ (connected). Eulerian?`, T`Yes.`], [T`Does $K_{3,3}$ have a Hamiltonian cycle?`, T`Yes.`]]),
  B.examq(5, T`<p>A connected graph has vertices $A$–$E$ with degrees $A$: 2, $B$: 4, $C$: 3, $D$: 3, $E$: 2.</p><p>(a) Explain why the graph is semi-Eulerian but not Eulerian. <span class="mk">[2]</span> (b) State the start and finish of an Eulerian trail. <span class="mk">[1]</span> (c) How many Hamiltonian cycles does $K_6$ have? <span class="mk">[2]</span></p>`,
    T`<p>(a) Exactly two odd vertices ($C$, $D$) <span class="mk">B1</span>, so a trail but no circuit <span class="mk">B1</span>. (b) $C$ and $D$ <span class="mk">B1</span>. (c) $\frac{5!}2=60$ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Eulerian ⇔ all degrees even; semi-Eulerian ⇔ exactly two odd.`, T`$K_n$ has $\frac{(n-1)!}2$ Hamiltonian cycles.`]),
].join('');

BOOK.f2_tree = [
  B.why(T`<p>Family trees, file systems and the cheapest network linking towns are all <b>trees</b>: connected, with no loops. Every spare edge in a network creates a cycle; a tree has exactly enough edges to stay connected.</p>`),
  B.def('trees', T`<ul><li><b>Connected</b>: a path joins every pair of vertices.</li><li><b>Tree</b>: a connected graph with no cycles.</li><li><b>Spanning tree</b> of $G$: a subgraph that is a tree and contains every vertex of $G$.</li><li><b>Rooted tree</b>: one vertex chosen as the root; the others hang below it. <b>Binary tree</b>: a rooted tree where each node has at most two children (left, right).</li></ul>`),
  B.thm('Edges of a tree', T`<p>A tree with $n$ vertices has exactly $n-1$ edges.</p>`),
  B.proof(T`<p>A tree with at least two vertices has a <b>leaf</b> (degree 1): follow a longest path; its end can't have another neighbour without making a longer path or a cycle. Removing a leaf and its edge leaves a tree with one fewer vertex and one fewer edge. Repeat down to one vertex and $0$ edges: $n$ vertices always pair with $n-1$ edges.</p>`),
  B.ex(1, T`A connected graph has $7$ vertices and $11$ edges. How many edges are removed to form a spanning tree?`, [T`A spanning tree has $6$ edges: remove $11-6=5$.`]),
  B.ex(2, T`What is the greatest number of nodes in a binary tree of height $3$?`, [T`Levels hold $1,2,4,8$: total $15=2^4-1$.`]),
  B.warn([T`Calling any connected graph a tree.`, T`Measuring height from 1 instead of 0 at the root (check the question's convention).`]),
  B.exam([T`"Explain why a graph is not a tree": point to a cycle, or to disconnection, or count edges.`]),
  B.checks([[T`A tree has 20 edges. Vertices?`, T`21.`]]),
  B.examq(5, T`<p>(a) A connected graph has $8$ vertices and $12$ edges. How many edges must be removed to form a spanning tree? <span class="mk">[1]</span> (b) Draw a binary tree of height $2$ with the greatest possible number of nodes. <span class="mk">[2]</span> (c) Explain why a tree with $10$ vertices cannot have $10$ edges. <span class="mk">[2]</span></p>`,
    T`<p>(a) $5$ <span class="mk">B1</span>. (b) Root, two children, four grandchildren — $7$ nodes <span class="mk">B2</span>. (c) A tree on $n$ vertices has $n-1=9$ edges <span class="mk">B1</span>; a tenth edge would create a cycle <span class="mk">B1</span>.</p>`),
  B.key([T`Tree: connected, no cycles, $n-1$ edges.`, T`Spanning tree: remove $E-V+1$ edges.`]),
].join('');

BOOK.f2_cpa = [
  B.why(T`<p>Building a house means hundreds of tasks, some waiting on others. Critical path analysis finds the shortest possible completion time and the tasks that cannot be delayed without delaying everything.</p>`),
  B.def('algorithms', T`<p>An <b>algorithm</b> is a finite, precisely defined sequence of steps that solves a problem. A <b>greedy</b> algorithm takes the best-looking option at each step (Prim's and Dijkstra's are greedy and still optimal; nearest-neighbour route-finding is greedy and not always optimal).</p>`),
  B.def('activity networks', T`<ul><li>A <b>precedence table</b> gives each activity's duration and immediate predecessors.</li><li><b>Forward pass</b>: earliest start (ES) $=$ the largest earliest finish of its predecessors; the project time is the largest finish.</li><li><b>Backward pass</b>: latest finish (LF) $=$ the smallest latest start of its successors (the project time for final activities).</li><li><b>Float</b> $=\text{LF}-\text{ES}-\text{duration}$: the time an activity can be delayed. <b>Critical</b> activities have zero float; they form one or more <b>critical paths</b>.</li></ul>`),
  T`<table class="tbl"><tr><th>Activity</th><th>Duration</th><th>Preceded by</th><th>ES</th><th>LF</th><th>Float</th></tr><tr><td>A</td><td>3</td><td>—</td><td>0</td><td>3</td><td>0</td></tr><tr><td>B</td><td>5</td><td>—</td><td>0</td><td>5</td><td>0</td></tr><tr><td>C</td><td>2</td><td>A</td><td>3</td><td>5</td><td>0</td></tr><tr><td>D</td><td>4</td><td>A</td><td>3</td><td>8</td><td>1</td></tr><tr><td>E</td><td>3</td><td>B, C</td><td>5</td><td>8</td><td>0</td></tr><tr><td>F</td><td>2</td><td>D, E</td><td>8</td><td>10</td><td>0</td></tr></table>`,
  B.ex(1, T`For the project in the table, find the minimum completion time, the floats and the critical activities.`, [
    T`Forward: A 0–3, B 0–5, C 3–5, D 3–7, E starts at $\max(5,5)=5$, ends 8; F starts at $\max(7,8)=8$, ends $10$. Minimum time $10$.`, T`Backward: F LS 8; E LF 8; D LF 8; C LF $=$ LS(E) $=5$; B LF 5; A LF $=\min(\text{LS}(C),\text{LS}(D))=\min(3,4)=3$.`,
    T`Floats: D has $8-3-4=1$; all others $0$. Critical paths A–C–E–F and B–E–F.`]),
  B.warn([T`Taking the smallest earliest finish of the predecessors in the forward pass — it must be the largest.`, T`Float as LF − EF of the next activity… use LF − ES − duration.`]),
  B.exam([T`Show ES and LF for every activity — they carry the method marks.`]),
  B.checks([[T`An activity has ES 4, LF 12, duration 5. Float?`, T`3.`]]),
  B.examq(8, T`<p>A project has activities: P (4 days), Q (6), R (3, after P), S (5, after P), T (2, after Q and R), U (4, after S and T).</p><p>(a) Find the minimum completion time. <span class="mk">[3]</span> (b) Find the float of each activity. <span class="mk">[3]</span> (c) List the critical activities. <span class="mk">[2]</span></p>`,
    T`<p>(a) P 0–4, Q 0–6, R 4–7, S 4–9, T 7–9, U 9–13: $13$ days <span class="mk">M1 A1 A1</span>.</p><p>(b) LF: U 13, T 9, S 9, R 7, Q 7, P 4 <span class="mk">M1</span>. Float of Q $=7-0-6=1$; all others $0$ <span class="mk">A1 A1</span>. (c) P, R, S, T, U <span class="mk">B2</span>.</p>`),
  B.key([T`Forward pass: ES $=$ max EF of predecessors.`, T`Backward pass: LF $=$ min LS of successors.`, T`Float $=$ LF − ES − duration.`]),
].join('');

BOOK.f2_prim = [
  B.why(T`<p>Connect every house in a village to the water main using the least pipe. That is a minimum spanning tree, and Prim's algorithm builds one greedily — always adding the cheapest connection to something new.</p>`),
  B.def("Prim's algorithm", T`<ol><li>Choose a starting vertex; it forms the tree.</li><li>Among all edges joining a vertex in the tree to a vertex not in it, choose the shortest (any one if tied) and add it.</li><li>Repeat until all $n$ vertices are in the tree ($n-1$ edges).</li></ol><p><b>Matrix form</b>: label the start column; delete its row; repeatedly choose the smallest undeleted entry in the labelled columns, add that edge, label the new vertex's column and delete its row.</p>`),
  FIG.network(G6, W6, 'Prim from A adds AC (5), CB (3), CE (4), BD (6), DF (3): total 21.', { hi: ['A-C', 'B-C', 'C-E', 'B-D', 'D-F'] }),
  B.ex(1, T`Use Prim's algorithm from $A$ on the graph above.`, [T`From $A$: AB 7, AC 5 → add AC.`, T`From $\{A,C\}$: CB 3 is shortest → add CB. Then CE 4, then BD 6 (cheaper than EF 8, DE 9), then DF 3.`, T`Total $5+3+4+6+3=21$.`]),
  B.warn([T`Choosing the globally shortest unused edge (that is Kruskal's algorithm) — Prim always grows one tree from the vertices already in it.`, T`Adding an edge between two vertices already in the tree.`]),
  B.exam([T`List the edges in the order chosen — the order is often what is being tested.`]),
  B.checks([[T`How many edges in a spanning tree of 9 vertices?`, T`8.`]]),
  B.examq(6, T`<table class="tbl"><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><th>A</th><td>–</td><td>8</td><td>5</td><td>9</td><td>12</td></tr><tr><th>B</th><td>8</td><td>–</td><td>4</td><td>7</td><td>6</td></tr><tr><th>C</th><td>5</td><td>4</td><td>–</td><td>10</td><td>3</td></tr><tr><th>D</th><td>9</td><td>7</td><td>10</td><td>–</td><td>2</td></tr><tr><th>E</th><td>12</td><td>6</td><td>3</td><td>2</td><td>–</td></tr></table><p>The table gives the distances (km) between five villages. Use Prim's algorithm, starting at $A$, to find a minimum spanning tree. List the edges in the order chosen and give the total length. <span class="mk">[6]</span></p>`,
    T`<p>AC (5) <span class="mk">B1</span>, CE (3) <span class="mk">B1</span>, ED (2) <span class="mk">B1</span>, CB (4) <span class="mk">B1</span>; total $14$ km <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Grow the tree: cheapest edge from the tree to a new vertex.`, T`$n-1$ edges; greedy but optimal.`]),
].join('');

BOOK.f2_bfs = [
  B.why(T`<p>Searching a tree — a family tree, a menu system, a game's possible moves — needs a systematic order so nothing is missed or visited twice. The two standard orders explore broad-first or deep-first.</p>`),
  B.def('breadth-first search', T`<p>Visit the root, then every node at depth $1$ from left to right, then depth $2$, and so on. Implementation: a <b>queue</b> — remove the front node, visit it, and add its children to the back.</p>`),
  B.def('depth-first search (pre-order)', T`<p>Visit a node, then search its whole left subtree, then its whole right subtree. Implementation: a <b>stack</b> (or recursion) — remove the top node, visit it, push its right child then its left child.</p>`),
  FIG.network({ A: [50, 8], B: [26, 38], C: [74, 38], D: [12, 70], E: [40, 70], F: [88, 70], G: [32, 96] }, [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['E', 'G']], 'A binary tree with root A.', { h: 170 }),
  B.ex(1, T`List the nodes of the tree above in breadth-first and depth-first order.`, [T`BFS: A, B, C, D, E, F, G (level by level).`, T`DFS: A, B, D, E, G, C, F (finish each branch before moving right).`]),
  B.warn([T`In DFS, jumping to C before finishing B's subtree.`, T`Mixing up the queue (BFS) and the stack (DFS).`]),
  B.exam([T`Show the queue or stack contents step by step if asked to "show your working".`]),
  B.checks([[T`Which search visits all depth-1 nodes before any depth-2 node?`, T`Breadth-first.`]]),
  B.examq(6, T`<p>A binary tree has root $P$. $P$ has children $Q$ (left) and $R$ (right); $Q$ has a left child $S$; $R$ has children $T$ (left) and $U$ (right); $T$ has a left child $V$.</p><p>(a) List the nodes in breadth-first order. <span class="mk">[2]</span> (b) List the nodes in depth-first (pre-order) order. <span class="mk">[2]</span> (c) Name the data structure used to implement each search. <span class="mk">[2]</span></p>`,
    T`<p>(a) P, Q, R, S, T, U, V <span class="mk">B2</span>. (b) P, Q, S, R, T, V, U <span class="mk">B2</span>. (c) Breadth-first: a queue; depth-first: a stack <span class="mk">B1 B1</span>.</p>`),
  B.key([T`BFS: level by level (queue).`, T`DFS: node, left subtree, right subtree (stack).`]),
].join('');

BOOK.f2_dijk = [
  B.why(T`<p>Sat-navs find the quickest route through thousands of junctions in an instant. The idea underneath is Dijkstra's algorithm: settle the nearest unsettled vertex, one at a time, so every distance is final when it is fixed.</p>`),
  B.def("Dijkstra's algorithm", T`<ol><li>Give the start vertex the permanent label $0$.</li><li>For each vertex joined to the most recently labelled vertex $V$, compute (label of $V$) $+$ (edge weight); if it is smaller than the current working value, replace it.</li><li>Choose the vertex with the smallest working value and make it permanent.</li><li>Repeat until the destination is permanent. Trace the route back: an edge $XY$ is on the route if label($Y$) − label($X$) $=$ weight($XY$).</li></ol>`),
  FIG.network(G6, W6, 'The shortest route from A to F is A–B–D–F, length 16.', { hi: ['A-B', 'B-D', 'D-F'], hn: ['A', 'F'] }),
  B.ex(1, T`Find the shortest route from $A$ to $F$ in the graph above.`, [T`$A=0$. Working: $B$ 7, $C$ 5. Permanent: $C=5$; update $B$: $\min(7,5+3)=7$; $E$: $9$.`, T`Permanent $B=7$; $D$: $13$. Permanent $E=9$; $F$: $17$. Permanent $D=13$; $F$: $\min(17,16)=16$. Permanent $F=16$.`, T`Trace back: $F$ from $D$ ($16-13=3$ ✓), $D$ from $B$ ($13-7=6$ ✓), $B$ from $A$: route A–B–D–F, length $16$.`]),
  B.warn([T`Making a vertex permanent before it has the smallest working value.`, T`Forgetting to update a working value only when the new one is smaller.`]),
  B.exam([T`Show the working values at every vertex — crossed-out values included — as the mark scheme requires.`]),
  B.checks([[T`Can Dijkstra handle negative weights?`, T`Not reliably — it assumes weights are non-negative.`]]),
  B.examq(6, T`<p>Using the distance table in the Prim chapter's exam question, apply Dijkstra's algorithm from $A$ to find the shortest distance from $A$ to each other village, and the route from $A$ to $E$. <span class="mk">[6]</span></p>`,
    T`<p>$A=0$; working $B$ 8, $C$ 5, $D$ 9, $E$ 12 <span class="mk">M1</span>. $C=5$ permanent; $E$ becomes $8$ <span class="mk">A1</span>. $B=8$, $E=8$ permanent; $D$ stays $9$ <span class="mk">A1</span>. $D=9$ <span class="mk">A1</span>. Shortest: $B$ 8, $C$ 5, $D$ 9, $E$ 8 <span class="mk">A1</span>; route to $E$: A–C–E <span class="mk">B1</span>.</p>`),
  B.key([T`Make the smallest working value permanent; update neighbours.`, T`Trace back using label differences.`]),
].join('');

BOOK.f2_rec = [
  B.why(T`<p>Populations, loan balances and the Fibonacci rabbits all follow rules of the form "next term from the previous ones". Solving the recurrence gives a formula for any term without computing every step.</p>`),
  B.def('recurrence models', T`<p>A recurrence model is a <b>recurrence relation</b> together with <b>initial conditions</b>. For example $u_{n+2}=u_{n+1}+u_n$, $u_0=0$, $u_1=1$ generates the Fibonacci numbers $0,1,1,2,3,5,8,\dots$</p>`),
  B.thm('Solving linear recurrences', T`<ul><li>First order $u_{n+1}=ku_n$: $u_n=u_0k^n$.</li><li>Second order $u_{n+2}=au_{n+1}+bu_n$: the <b>auxiliary equation</b> is $r^2=ar+b$.</li><li>Distinct roots $r_1,r_2$: $u_n=Ar_1^n+Br_2^n$. Repeated root $r$: $u_n=(A+Bn)r^n$.</li><li>Find $A$ and $B$ from the initial conditions.</li></ul>`),
  B.proof(T`<p>$u_n=r^n$ satisfies the recurrence ⇔ $r^{n+2}=ar^{n+1}+br^n$ ⇔ $r^2=ar+b$. Because the relation is linear, any combination $Ar_1^n+Br_2^n$ also satisfies it, and two constants fit two initial conditions. For a repeated root $r$ (so $a=2r$, $b=-r^2$), $nr^n$ also works: $(n+2)r^{n+2}-2r(n+1)r^{n+1}+r^2nr^n=r^{n+2}(n+2-2n-2+n)=0$.</p>`),
  B.ex(1, T`Solve $u_{n+2}=5u_{n+1}-6u_n$, $u_0=1$, $u_1=4$.`, [T`$r^2-5r+6=0\Rightarrow r=2,3$: $u_n=A\cdot2^n+B\cdot3^n$.`, T`$A+B=1$, $2A+3B=4\Rightarrow B=2$, $A=-1$.`, T`$u_n=2\cdot3^n-2^n$. Check $u_2=5(4)-6(1)=14=18-4$ ✓.`]),
  B.ex(2, T`Solve $u_{n+2}=4u_{n+1}-4u_n$, $u_0=1$, $u_1=6$.`, [T`$(r-2)^2=0$: $u_n=(A+Bn)2^n$.`, T`$A=1$; $(1+B)\cdot2=6\Rightarrow B=2$: $u_n=(1+2n)2^n$.`]),
  B.ex(3, T`Find a formula for the Fibonacci numbers.`, [T`$r^2=r+1\Rightarrow r=\frac{1\pm\sqrt5}2$.`, T`$u_0=0$, $u_1=1$ give $A=\frac1{\sqrt5}=-B$: $u_n=\frac1{\sqrt5}\left[\left(\frac{1+\sqrt5}2\right)^n-\left(\frac{1-\sqrt5}2\right)^n\right]$.`], T`Every Fibonacci number is an integer, even though the formula is full of $\sqrt5$.`),
  B.warn([T`Using $Ar^n+Br^n$ for a repeated root — that has only one constant.`, T`Writing the auxiliary equation with the wrong signs: move everything to one side carefully.`]),
  B.exam([T`Check your formula against $u_2$ computed directly from the recurrence.`]),
  B.checks([[T`Auxiliary equation of $u_{n+2}=u_{n+1}+2u_n$?`, T`$r^2-r-2=0$: roots $2,-1$.`]]),
  B.examq(8, T`<p>The sequence $u_n$ satisfies $u_{n+2}=u_{n+1}+6u_n$ with $u_0=2$, $u_1=1$.</p><p>(a) Find $u_2$ and $u_3$. <span class="mk">[2]</span> (b) Solve the recurrence relation. <span class="mk">[5]</span> (c) Find $u_{10}$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $u_2=1+12=13$, $u_3=13+6=19$ <span class="mk">B1 B1</span>.</p><p>(b) $r^2-r-6=0\Rightarrow r=3,-2$ <span class="mk">M1 A1</span>. $u_n=A3^n+B(-2)^n$; $A+B=2$, $3A-2B=1$ <span class="mk">M1</span> $\Rightarrow A=B=1$ <span class="mk">A1</span>: $u_n=3^n+(-2)^n$ <span class="mk">A1</span>.</p><p>(c) $3^{10}+2^{10}=60\,073$ <span class="mk">B1</span>.</p>`),
  B.key([T`Auxiliary equation $r^2=ar+b$.`, T`Distinct roots: $Ar_1^n+Br_2^n$; repeated: $(A+Bn)r^n$.`]),
].join('');

BOOK.f2_bool = [
  B.why(T`<p>Computer circuits, database searches and logical arguments run on true/false values. A truth table checks every possible case, so it can <i>prove</i> two statements say the same thing.</p>`),
  B.def('connectives', T`<ul><li>$\lnot p$: not $p$.</li><li>$p\land q$: $p$ and $q$ — true only when both are true.</li><li>$p\lor q$: $p$ or $q$ (or both).</li><li>$p\Rightarrow q$: if $p$ then $q$ — false only when $p$ is true and $q$ is false.</li><li>$p\Leftrightarrow q$: $p$ if and only if $q$ — true when they have the same value.</li></ul>`),
  T`${ttab(['p', 'q'], [['\\lnot p', p => !p], ['p\\land q', (p, q) => p && q], ['p\\lor q', (p, q) => p || q], ['p\\Rightarrow q', (p, q) => !p || q], ['p\\Leftrightarrow q', (p, q) => p === q]])}`,
  B.def('equivalence', T`<p>Two statements are <b>equivalent</b> ($\equiv$) if they have the same truth value in every row of the truth table: $2^n$ rows for $n$ variables (at most three in this unit, so $8$ rows).</p>`),
  B.ex(1, T`Prove De Morgan's law $\lnot(p\land q)\equiv\lnot p\lor\lnot q$.`, [T`${ttab(['p', 'q'], [['\\lnot(p\\land q)', (p, q) => !(p && q)], ['\\lnot p\\lor\\lnot q', (p, q) => !p || !q]])}`, T`The last two columns are identical, so the statements are equivalent.`]),
  B.ex(2, T`Show that $p\Rightarrow q$ is equivalent to its contrapositive $\lnot q\Rightarrow\lnot p$, but not to its converse $q\Rightarrow p$.`, [T`${ttab(['p', 'q'], [['p\\Rightarrow q', (p, q) => !p || q], ['\\lnot q\\Rightarrow\\lnot p', (p, q) => q || !p], ['q\\Rightarrow p', (p, q) => !q || p]])}`, T`Columns 3 and 4 agree; column 5 differs when $p$ is false and $q$ true.`]),
  B.warn([T`Treating "or" as exclusive.`, T`Thinking $p\Rightarrow q$ is false when $p$ is false.`]),
  B.exam([T`List the rows in a fixed order (TT, TF, FT, FF…) and include intermediate columns.`]),
  B.checks([[T`Rows in a truth table with 3 variables?`, T`$8$.`], [T`When is $p\Rightarrow q$ false?`, T`Only when $p$ is true and $q$ is false.`]]),
  B.examq(6, T`<p>(a) Use a truth table to show that $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$. <span class="mk">[4]</span> (b) Show that $p\Rightarrow q$ is not equivalent to $q\Rightarrow p$. <span class="mk">[2]</span></p>`,
    T`${ttab(['p', 'q', 'r'], [['q\\lor r', (p, q, r) => q || r], ['p\\land(q\\lor r)', (p, q, r) => p && (q || r)], ['p\\land q', (p, q) => p && q], ['p\\land r', (p, q, r) => p && r], ['(p\\land q)\\lor(p\\land r)', (p, q, r) => (p && q) || (p && r)]])}<p>(a) Eight rows <span class="mk">M1</span>, intermediate columns <span class="mk">M1</span>, final columns identical <span class="mk">A1</span>, so equivalent <span class="mk">A1</span>.</p><p>(b) When $p$ is false and $q$ true, $p\Rightarrow q$ is true but $q\Rightarrow p$ is false <span class="mk">B1 B1</span>.</p>`),
  B.key([T`Equivalent ⇔ identical truth-table columns.`, T`De Morgan; contrapositive $\equiv$ original; converse is not.`]),
].join('');
