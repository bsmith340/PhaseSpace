// BcsMaths textbook — Further Maths AS 2, Sections A (Mechanics 1) and B (Mechanics 2).
'use strict';

BOOK.f2_hooke = [
  B.why(T`<p>Bungee cords, car suspension, climbing ropes and kitchen scales all stretch in proportion to the force on them — up to a point. Hooke's law is the model, and the "point" is the elastic limit.</p>`),
  B.def("Hooke's law", T`$$T=\frac{\lambda x}{l}$$<p>$T$ is the tension (or the thrust of a compressed spring), $x$ the extension (or compression), $l$ the natural length and $\lambda$ the <b>modulus of elasticity</b>, measured in newtons. Because $T=\lambda$ when $x=l$, the modulus is the force that would double the length.</p>`),
  B.def('strings and springs', T`<ul><li>A <b>string</b> can only be in tension. If its length is less than $l$, it is slack and exerts no force.</li><li>A <b>spring</b> can be stretched (tension) or compressed (thrust).</li><li>The stiffness $\frac\lambda l$ depends on both the material and the length: a longer string of the same material stretches more.</li></ul>`),
  B.def('modelling assumptions', T`<ul><li>The string or spring is <b>light</b> (its mass is ignored).</li><li>It obeys Hooke's law exactly — so it is not stretched beyond its <b>elastic limit</b>, beyond which it would deform permanently or break.</li><li>Any particle attached is a point mass.</li></ul>`),
  B.ex(1, T`An elastic string of natural length $0.8$ m and modulus $20$ N is stretched to $1$ m. Find the tension.`, [T`$x=0.2$ m, so $T=\frac{20\times0.2}{0.8}=5$ N.`]),
  B.ex(2, T`A particle of mass $2$ kg hangs in equilibrium from a light elastic string of natural length $1.5$ m and modulus $49$ N. Find the length of the string.`, [T`Equilibrium: $T=2g=19.6$.`, T`$\frac{49x}{1.5}=19.6\Rightarrow x=0.6$ m; length $2.1$ m.`]),
  B.ex(3, T`A spring of natural length $0.5$ m is compressed to $0.4$ m by a force of $30$ N. Find its modulus.`, [T`Compression $0.1$ m: $30=\frac{\lambda(0.1)}{0.5}\Rightarrow\lambda=150$ N.`]),
  B.warn([T`Using the stretched length instead of the extension.`, T`Giving a slack string a tension.`, T`Treating $\lambda$ as a "spring constant" without dividing by $l$.`]),
  B.exam([T`Write Hooke's law with the numbers substituted before solving.`, T`When asked for assumptions, use the words "light", "obeys Hooke's law" and "elastic limit".`]),
  B.checks([[T`$\lambda=40$ N, $l=2$ m, $x=0.5$ m. $T$?`, T`$10$ N.`], [T`What does $T=\lambda$ mean physically?`, T`The extension equals the natural length: the length has doubled.`]]),
  B.examq(8, T`<p>A light elastic string has natural length $1.2$ m and modulus $\lambda$ N. A particle of mass $0.5$ kg hangs in equilibrium from it, and the string's length is then $1.5$ m.</p><p>(a) Find $\lambda$. <span class="mk">[3]</span> (b) A second particle of mass $m$ kg is attached; the new equilibrium length is $1.8$ m. Find $m$. <span class="mk">[3]</span> (c) State two modelling assumptions you have made. <span class="mk">[2]</span></p>`,
    T`<p>(a) $0.5g=\frac{\lambda(0.3)}{1.2}$ <span class="mk">M1 A1</span> $\Rightarrow\lambda=19.6$ N <span class="mk">A1</span>.</p><p>(b) $T=\frac{19.6(0.6)}{1.2}=9.8$ <span class="mk">M1</span>; $(0.5+m)g=9.8\Rightarrow m=0.5$ <span class="mk">M1 A1</span>.</p><p>(c) The string is light; it obeys Hooke's law (is within its elastic limit); the particles are point masses <span class="mk">B1 B1</span>.</p>`),
  B.key([T`$T=\frac{\lambda x}l$; $\lambda$ in newtons.`, T`Strings can go slack; springs can be compressed.`]),
].join('');

BOOK.f2_work = [
  B.why(T`<p>Forces cost energy only when they move something. Work measures that cost: force times the distance moved <i>in the direction of the force</i>. When the force varies, as it does when you stretch a spring, the work is an area — an integral.</p>`),
  B.def('work done by a constant force', T`$$W=\mathbf F\cdot\mathbf d=|\mathbf F||\mathbf d|\cos\theta$$<p>measured in joules (N m). $\theta$ is the angle between the force and the displacement. A force perpendicular to the motion (a normal reaction on a horizontal surface, the tension in a circular-motion string) does no work.</p>`),
  B.def('work done by a variable force', T`<p>If a force $F(x)$ acts along the line of motion as its point of application moves from $x=a$ to $x=b$, $$W=\int_a^bF(x)\,dx.$$ It is the area under the force–displacement graph.</p>`),
  B.thm('Work stored in an elastic string', T`<p>Stretching from extension $0$ to $x$ requires $W=\dfrac{\lambda x^2}{2l}$; from extension $a$ to $b$, $W=\dfrac{\lambda(b^2-a^2)}{2l}$.</p>`),
  B.proof(T`<p>The tension at extension $s$ is $\frac{\lambda s}l$, so $W=\int_0^x\frac{\lambda s}l\,ds=\left[\frac{\lambda s^2}{2l}\right]_0^x=\frac{\lambda x^2}{2l}$.</p>`),
  B.ex(1, T`A sledge is pulled $15$ m along level snow by a rope at $30^\circ$ above the horizontal with tension $40$ N. Find the work done by the tension.`, [T`$W=40\times15\times\cos30^\circ=520$ J.`]),
  B.ex(2, T`A force $\mathbf F=(3\mathbf i+2\mathbf j-\mathbf k)$ N moves a particle from $(1,0,2)$ to $(4,1,-1)$ (metres). Find the work done.`, [T`$\mathbf d=(3,1,-3)$, $W=\mathbf F\cdot\mathbf d=9+2+3=14$ J.`]),
  B.ex(3, T`A force $F=(6x^2+2)$ N acts along the $x$-axis. Find the work done as it moves a particle from $x=1$ to $x=3$.`, [T`$W=\int_1^3(6x^2+2)\,dx=\big[2x^3+2x\big]_1^3=60-4=56$ J.`]),
  B.ex(4, T`How much work is needed to stretch a string ($\lambda=30$ N, $l=0.6$ m) by $0.2$ m from its natural length?`, [T`$\frac{30\times0.2^2}{2\times0.6}=1$ J.`]),
  B.warn([T`Multiplying force by distance when the force is at an angle.`, T`Using $\frac{\lambda(b-a)^2}{2l}$ instead of $\frac{\lambda(b^2-a^2)}{2l}$.`]),
  B.exam([T`State "work done $=$ force × distance in the direction of the force" or quote the scalar product — then substitute.`]),
  B.checks([[T`Work done by gravity on a $3$ kg mass falling $2$ m?`, T`$58.8$ J.`], [T`Why does the normal reaction on a horizontal floor do no work?`, T`It is perpendicular to the motion: $\cos90^\circ=0$.`]]),
  B.examq(7, T`<p>(a) A spring has natural length $0.4$ m and modulus $60$ N. Find the work done in stretching it from a length of $0.5$ m to a length of $0.6$ m. <span class="mk">[4]</span> (b) A constant force $\mathbf F=(2\mathbf i-\mathbf j+4\mathbf k)$ N moves a particle from $A(1,2,0)$ to $B(3,-1,2)$. Find the work done. <span class="mk">[2]</span> (c) Explain why the normal reaction does no work on a particle sliding on a horizontal table. <span class="mk">[1]</span></p>`,
    T`<p>(a) Extensions $0.1$ to $0.2$ <span class="mk">B1</span>; $W=\frac{60(0.2^2-0.1^2)}{2(0.4)}$ <span class="mk">M1 A1</span> $=2.25$ J <span class="mk">A1</span>.</p><p>(b) $\overrightarrow{AB}=(2,-3,2)$; $W=4+3+8=15$ J <span class="mk">M1 A1</span>. (c) It acts perpendicular to the displacement <span class="mk">B1</span>.</p>`),
  B.key([T`$W=\mathbf F\cdot\mathbf d$; variable force $W=\int F\,dx$.`, T`Elastic work $\frac{\lambda x^2}{2l}$.`]),
].join('');

BOOK.f2_energy = [
  B.why(T`<p>Energy methods let you skip the details of the motion. A roller coaster's speed at the bottom depends only on how far it has dropped, not on the shape of the track. You just need the right accounting: kinetic, gravitational and elastic energy, plus the work done by anything else.</p>`),
  B.def('forms of mechanical energy', T`<ul><li>Kinetic energy $\text{KE}=\frac12mv^2$.</li><li>Gravitational potential energy $\text{GPE}=mgh$, relative to a chosen zero level.</li><li>Elastic potential energy $\text{EPE}=\dfrac{\lambda x^2}{2l}$ — the work stored in stretching (or compressing).</li></ul>`),
  B.thm('The work–energy principle', T`<p>The work done on a body by the resultant force equals its change in kinetic energy. Counting gravity and elastic forces through their potential energies: $$\text{work done by other forces}=\Delta(\text{KE}+\text{GPE}+\text{EPE}).$$ If no other forces do work (no friction, no driving force), mechanical energy is <b>conserved</b>.</p>`),
  B.proof(T`<p>For a constant resultant force $F$ along the motion, $v^2=u^2+2as$, so $\frac12mv^2-\frac12mu^2=mas=Fs$ — the work done. For a variable force, $F=mv\frac{dv}{dx}$, so $\int F\,dx=\int mv\,dv=\left[\frac12mv^2\right]$.</p>`),
  B.ex(1, T`A child slides from rest down a smooth slide, dropping $5$ m. Find the speed at the bottom.`, [T`$\frac12mv^2=mg(5)\Rightarrow v=\sqrt{98}=9.90$ m s⁻¹.`]),
  B.ex(2, T`A $2$ kg block slides from rest $6$ m down a rough slope inclined at $30^\circ$ ($\mu=0.2$). Find its speed.`, [T`GPE lost $=2g(6\sin30^\circ)=58.8$ J. Friction $=0.2(2g\cos30^\circ)$; work against it $=20.4$ J.`, T`KE gained $=58.8-20.4=38.4$ J, so $v=\sqrt{38.4}=6.20$ m s⁻¹.`]),
  B.ex(3, T`A $1$ kg particle on an elastic string ($l=1$ m, $\lambda=49$ N) is released from rest at the fixed end $O$. Find the greatest extension.`, [T`At the lowest point KE $=0$. GPE lost $=$ EPE gained: $9.8(1+x)=\frac{49x^2}{2}$.`, T`$24.5x^2-9.8x-9.8=0\Rightarrow x=0.863$ m.`], T`Note the string is slack for the first metre: the particle free-falls $l$ before the string does anything.`),
  B.warn([T`Forgetting the GPE lost during the slack part of a fall.`, T`Mixing up "energy conserved" problems with ones where friction does work.`]),
  B.exam([T`Write an energy equation with every term labelled (KE, GPE, EPE, work done against friction).`]),
  B.checks([[T`EPE in a string ($\lambda=20$, $l=0.5$) extended $0.1$ m?`, T`$0.2$ J.`], [T`KE of $3$ kg at $4$ m s⁻¹?`, T`$24$ J.`]]),
  B.examq(10, T`<p>A particle $P$ of mass $0.4$ kg is attached to one end of a light elastic string of natural length $0.8$ m and modulus $19.6$ N; the other end is fixed at $O$. $P$ is released from rest at $O$ and falls vertically.</p><p>(a) Find the speed of $P$ when the string first becomes taut. <span class="mk">[2]</span> (b) Find the greatest extension of the string. <span class="mk">[5]</span> (c) Find the speed of $P$ when the extension is $0.2$ m. <span class="mk">[3]</span></p>`,
    T`<p>(a) $v=\sqrt{2g(0.8)}=3.96$ m s⁻¹ <span class="mk">M1 A1</span>.</p><p>(b) $0.4g(0.8+x)=\frac{19.6x^2}{1.6}$ <span class="mk">M1 A1</span>; $12.25x^2-3.92x-3.136=0$ <span class="mk">A1</span>; $x=0.691$ m <span class="mk">M1 A1</span>.</p><p>(c) $\frac12(0.4)v^2=0.4g(1.0)-\frac{19.6(0.2)^2}{1.6}=3.92-0.49$ <span class="mk">M1 A1</span>, $v=4.14$ m s⁻¹ <span class="mk">A1</span>.</p>`),
  B.key([T`$\text{KE}+\text{GPE}+\text{EPE}$ is conserved without friction or driving forces.`, T`Work done by other forces $=$ change in mechanical energy.`]),
].join('');

BOOK.f2_power = [
  B.why(T`<p>Two cars can do the same work getting up a hill, but the faster one needs a more powerful engine. Power is the <i>rate</i> of doing work — and the link $P=Fv$ explains why a car has a top speed.</p>`),
  B.def('power', T`<p>$P=\dfrac{dW}{dt}$, in watts ($1$ W $=1$ J s⁻¹). Since $dW=F\,dx$, $$P=F\frac{dx}{dt}=Fv.$$ Power is also the rate of increase of energy.</p>`),
  B.thm('Vehicles', T`<ul><li>Driving force at speed $v$: $F=\frac Pv$.</li><li>Newton's second law up a slope at angle $\theta$ with resistance $R$: $\frac Pv-R-mg\sin\theta=ma$.</li><li>Top speed: $a=0$, so $v_{\max}=\dfrac P{R+mg\sin\theta}$.</li></ul>`),
  B.thm('Pumps', T`<p>A pump raising $m$ kg of water per second through height $h$ and ejecting it at speed $v$ has power $m\left(gh+\tfrac12v^2\right)$ watts (ignoring losses).</p>`),
  B.ex(1, T`A car of mass $1000$ kg has a $30$ kW engine and meets a resistance of $600$ N. Find its top speed on a level road and its acceleration at $20$ m s⁻¹.`, [T`Top speed: $\frac{30000}v=600\Rightarrow v=50$ m s⁻¹.`, T`At $20$ m s⁻¹: $F=1500$ N; $1500-600=1000a\Rightarrow a=0.9$ m s⁻².`]),
  B.ex(2, T`A $1200$ kg car with a $40$ kW engine climbs a hill with $\sin\theta=\frac1{20}$ against $500$ N resistance. Find its top speed.`, [T`$\frac{40000}v=500+1200(9.8)\frac1{20}=1088\Rightarrow v=36.8$ m s⁻¹.`]),
  B.ex(3, T`A pump raises water $8$ m and ejects it at $12$ m s⁻¹, at $20$ kg per second. Find its power.`, [T`$20(9.8\times8+\frac12\times144)=20(78.4+72)=3008$ W $\approx3.0$ kW.`]),
  B.warn([T`Using kW without converting to W.`, T`Forgetting the weight component on a slope.`, T`Omitting the kinetic energy of ejected water.`]),
  B.exam([T`At "maximum speed" write $a=0$ explicitly and resolve along the motion.`]),
  B.checks([[T`$P=60$ kW at $v=30$ m s⁻¹: driving force?`, T`$2000$ N.`], [T`Power to lift $50$ kg at $2$ m s⁻¹ steadily?`, T`$980$ W.`]]),
  B.examq(8, T`<p>A lorry of mass $8000$ kg moves along a straight horizontal road against a constant resistance of $R$ N. Its engine works at $120$ kW and its maximum speed is $30$ m s⁻¹.</p><p>(a) Find $R$. <span class="mk">[2]</span> (b) Find the acceleration when the speed is $20$ m s⁻¹. <span class="mk">[3]</span> (c) The lorry climbs a hill inclined at $\theta$ with $\sin\theta=\frac1{40}$, with the same resistance and power. Find its maximum speed. <span class="mk">[3]</span></p>`,
    T`<p>(a) $\frac{120000}{30}=R=4000$ N <span class="mk">M1 A1</span>. (b) $\frac{120000}{20}-4000=8000a$ <span class="mk">M1 A1</span>, $a=0.25$ m s⁻² <span class="mk">A1</span>.</p><p>(c) $\frac{120000}v=4000+8000(9.8)\frac1{40}=5960$ <span class="mk">M1 A1</span>, $v=20.1$ m s⁻¹ <span class="mk">A1</span>.</p>`),
  B.key([T`$P=Fv$.`, T`Top speed: driving force balances resistance (and weight component).`]),
].join('');

BOOK.f2_circ = [
  B.why(T`<p>Something moving in a circle at constant speed is still accelerating — its direction keeps changing. That acceleration points to the centre, and a real force must supply it.</p>`),
  B.def('angular speed', T`<p>$\omega$ is the rate at which the radius turns, in rad s⁻¹. One revolution is $2\pi$ rad, so $n$ revolutions per minute is $\omega=\frac{2\pi n}{60}$. The speed is $v=r\omega$ (from arc length $s=r\theta$).</p>`),
  B.thm('Central acceleration', T`<p>A particle moving in a circle of radius $r$ with constant angular speed $\omega$ has acceleration of magnitude $$a=r\omega^2=\frac{v^2}r,$$ directed towards the centre.</p>`),
  B.proof(T`<p>Position $\mathbf r=r\cos\omega t\,\mathbf i+r\sin\omega t\,\mathbf j$. Differentiating, $\mathbf v=-r\omega\sin\omega t\,\mathbf i+r\omega\cos\omega t\,\mathbf j$ (speed $r\omega$) and $\mathbf a=-r\omega^2\cos\omega t\,\mathbf i-r\omega^2\sin\omega t\,\mathbf j=-\omega^2\mathbf r$: magnitude $r\omega^2$, pointing back towards $O$. With $v=r\omega$, $r\omega^2=\frac{v^2}r$.</p>`),
  B.ex(1, T`A record turns at $33$ rpm. Find $\omega$ and the speed of a point $15$ cm from the centre.`, [T`$\omega=\frac{2\pi\times33}{60}=3.46$ rad s⁻¹; $v=0.15\times3.46=0.518$ m s⁻¹.`]),
  B.ex(2, T`A car goes round a bend of radius $50$ m at $15$ m s⁻¹. Find its acceleration.`, [T`$a=\frac{15^2}{50}=4.5$ m s⁻², towards the centre of the bend.`]),
  B.ex(3, T`A coin on a turntable is $0.2$ m from the centre ($\mu=0.4$). Find the greatest angular speed without slipping.`, [T`Friction supplies the central force: $mr\omega^2\le\mu mg$.`, T`$\omega^2\le\frac{0.4\times9.8}{0.2}=19.6\Rightarrow\omega_{\max}=4.43$ rad s⁻¹.`]),
  B.warn([T`Adding a "centripetal force" to the force diagram as an extra force — it is the resultant of the real forces.`, T`Using rpm in $v=r\omega$ without converting.`]),
  B.exam([T`Draw the forces, then write "Newton II towards the centre: (resultant) $=mr\omega^2$".`]),
  B.checks([[T`$r=2$, $\omega=3$: $v$ and $a$?`, T`$6$ m s⁻¹ and $18$ m s⁻².`], [T`Direction of the acceleration?`, T`Towards the centre.`]]),
  B.examq(5, T`<p>A particle of mass $0.3$ kg on a smooth horizontal table is attached to a light inextensible string fixed at $O$, and moves in a circle of radius $0.5$ m at $2$ revolutions per second.</p><p>(a) Find the angular speed. <span class="mk">[1]</span> (b) Find the tension in the string. <span class="mk">[2]</span> (c) The string breaks if the tension exceeds $50$ N. Find the greatest possible angular speed. <span class="mk">[2]</span></p>`,
    T`<p>(a) $4\pi$ rad s⁻¹ <span class="mk">B1</span>. (b) $T=0.3\times0.5\times(4\pi)^2=23.7$ N <span class="mk">M1 A1</span>. (c) $0.15\omega^2=50\Rightarrow\omega=18.3$ rad s⁻¹ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$v=r\omega$; $a=r\omega^2=\frac{v^2}r$ towards the centre.`, T`The central force comes from real forces.`]),
].join('');

BOOK.f2_conical = [
  B.why(T`<p>A ball whirled on a string traces a cone; a car takes a banked bend without needing grip. In both, a sloping force has a vertical part that balances weight and a horizontal part that turns the motion.</p>`),
  B.thm('Conical pendulum', T`<p>String length $L$ at angle $\theta$ to the vertical, radius $r=L\sin\theta$: $$T\cos\theta=mg,\qquad T\sin\theta=mr\omega^2.$$ Hence $T=mL\omega^2$, $\cos\theta=\dfrac g{L\omega^2}$, and $\tan\theta=\dfrac{v^2}{rg}$.</p>`),
  B.proof(T`<p>Substituting $r=L\sin\theta$ into the horizontal equation: $T\sin\theta=mL\sin\theta\,\omega^2\Rightarrow T=mL\omega^2$. Then $\cos\theta=\frac{mg}T=\frac g{L\omega^2}$. Dividing the two equations gives $\tan\theta=\frac{r\omega^2}g=\frac{v^2}{rg}$.</p>`),
  B.thm('Banked track', T`<p>A track banked at $\theta$, with no friction needed: $R\cos\theta=mg$, $R\sin\theta=\frac{mv^2}r$, so $\tan\theta=\frac{v^2}{rg}$. This "design speed" is the same for every vehicle, whatever its mass.</p>`),
  B.ex(1, T`A $0.5$ kg particle on a $0.8$ m string moves as a conical pendulum with $\omega=5$ rad s⁻¹. Find $T$, $\theta$ and the radius.`, [T`$T=0.5\times0.8\times25=10$ N.`, T`$\cos\theta=\frac{9.8}{20}=0.49\Rightarrow\theta=60.7^\circ$; $r=0.8\sin60.7^\circ=0.697$ m.`]),
  B.ex(2, T`A bend of radius $80$ m is banked at $15^\circ$. Find the speed at which no friction is needed.`, [T`$v=\sqrt{80\times9.8\times\tan15^\circ}=14.5$ m s⁻¹.`]),
  B.ex(3, T`A conical pendulum of length $1.2$ m hangs at $30^\circ$ to the vertical. Find the speed of the bob.`, [T`$r=0.6$ m; $v^2=rg\tan30^\circ=3.40\Rightarrow v=1.84$ m s⁻¹.`]),
  B.warn([T`Resolving along the string — the acceleration is horizontal, so resolve horizontally and vertically.`, T`Using $L$ as the radius.`]),
  B.exam([T`Mark the centre of the circle on your diagram: it is level with the particle, not at the point of suspension.`]),
  B.checks([[T`Does the angle of a conical pendulum depend on the mass?`, T`No: $\cos\theta=\frac g{L\omega^2}$.`], [T`Design speed for $r=100$ m, $\theta=10^\circ$?`, T`$13.1$ m s⁻¹.`]]),
  B.examq(8, T`<p>A particle $P$ of mass $0.2$ kg is attached to one end of a light inextensible string of length $0.5$ m, the other end fixed at $A$. $P$ moves in a horizontal circle with constant angular speed $\omega$, with the string at $60^\circ$ to the vertical.</p><p>(a) Find the tension. <span class="mk">[3]</span> (b) Find $\omega$. <span class="mk">[3]</span> (c) The string breaks when the tension exceeds $10$ N. Find the greatest possible $\omega$. <span class="mk">[2]</span></p>`,
    T`<p>(a) $T\cos60^\circ=0.2g$ <span class="mk">M1 A1</span>, $T=3.92$ N <span class="mk">A1</span>. (b) $T=mL\omega^2$: $3.92=0.2(0.5)\omega^2$ <span class="mk">M1 A1</span>, $\omega=6.26$ rad s⁻¹ <span class="mk">A1</span>.</p><p>(c) $10=0.1\omega^2\Rightarrow\omega=10$ rad s⁻¹ <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Conical pendulum: $T=mL\omega^2$, $\cos\theta=\frac g{L\omega^2}$.`, T`Banked track: $\tan\theta=\frac{v^2}{rg}$.`]),
].join('');

BOOK.f2_equil = [
  B.why(T`<p>Mechanics 2 combines earlier ideas: Hooke's law for the string, resolving for equilibrium, and the friction inequality $F\le\mu R$. The skill is setting up every force correctly — especially the direction of friction.</p>`),
  B.def('the method', T`<ol><li>Draw the force diagram: weight, normal reaction, friction, tension(s) or thrust(s).</li><li>Resolve perpendicular to the surface to find $R$.</li><li>Resolve along the surface. In limiting equilibrium, $F=\mu R$ in the direction opposing the impending motion.</li><li>Use $T=\frac{\lambda x}l$ to link tension and extension.</li></ol>`),
  B.ex(1, T`A $3$ kg particle on rough horizontal ground ($\mu=0.3$) is tied by an elastic string ($l=1$ m, $\lambda=20$ N) to a point $A$ on the ground. How far from $A$ can it rest?`, [T`Limiting: $T=0.3(3g)=8.82$ N.`, T`$\frac{20x}{1}=8.82\Rightarrow x=0.441$ m. It can rest up to $1.441$ m from $A$ (and anywhere closer, where the string is slack or friction copes).`]),
  B.ex(2, T`A $2$ kg particle on a rough plane at $30^\circ$ ($\mu=0.25$) is held by an elastic string parallel to the plane ($l=1$ m, $\lambda=40$ N) attached to a point up the slope. Find the range of extensions for equilibrium.`, [
    T`$R=2g\cos30^\circ=16.97$, $\mu R=4.24$; $2g\sin30^\circ=9.8$.`, T`About to slide down (friction up): $T=9.8-4.24=5.56$ N, $x=0.139$ m.`, T`About to slide up (friction down): $T=9.8+4.24=14.04$ N, $x=0.351$ m.`, T`Equilibrium for $0.139\le x\le0.351$ (m).`]),
  B.ex(3, T`A particle on a smooth table is joined to $A$ and $B$, $2$ m apart, by strings $AP$ ($l=0.8$, $\lambda=20$) and $PB$ ($l=1$, $\lambda=20$). Find $AP$ in equilibrium.`, [T`Extensions $x$, $y$ with $x+y=0.2$; equal tensions: $25x=20y$.`, T`$x=\frac{0.8}9=0.0889$, so $AP=0.889$ m.`]),
  B.warn([T`Fixing the direction of friction before deciding which way the particle tends to move.`, T`Using the string's length rather than its extension.`]),
  B.exam([T`Consider both limiting cases when asked for a range.`]),
  B.checks([[T`Particle about to slide down a slope: which way does friction act?`, T`Up the slope.`], [T`Two strings pull opposite ways on a particle in equilibrium on a smooth table. Their tensions are…?`, T`Equal.`]]),
  B.examq(8, T`<p>A particle of mass $2$ kg rests on a rough plane inclined at $30^\circ$; the coefficient of friction is $0.25$. It is attached to a light elastic string of natural length $1$ m and modulus $40$ N, which lies along a line of greatest slope and is fixed at a point $O$ higher up the plane.</p><p>(a) Find the extension when the particle is on the point of slipping down the plane. <span class="mk">[4]</span> (b) Find the greatest distance $OP$ for equilibrium. <span class="mk">[4]</span></p>`,
    T`<p>(a) $R=2g\cos30^\circ$ <span class="mk">B1</span>; $T+0.25R=2g\sin30^\circ$ <span class="mk">M1</span>; $T=5.56$ N <span class="mk">A1</span>; $x=0.139$ m <span class="mk">A1</span>.</p><p>(b) About to move up: $T=2g\sin30^\circ+0.25R=14.04$ N <span class="mk">M1 A1</span>; $x=0.351$ <span class="mk">A1</span>; $OP=1.35$ m <span class="mk">A1</span>.</p>`),
  B.key([T`Resolve perpendicular and parallel; $F\le\mu R$ with the correct direction.`, T`Link tension to extension with Hooke's law.`]),
].join('');

BOOK.f2_resv = [
  B.why(T`<p>A boat aimed straight across a river ends up downstream; a plane flying north in a crosswind drifts east. The motion you see is the vector sum of the craft's own velocity and the velocity of the medium it moves through.</p>`),
  B.def('resultant velocity', T`<p>True (ground) velocity $=$ velocity relative to the medium $+$ velocity of the medium. Solve with a vector triangle (sine and cosine rules) or with components.</p>`),
  B.ex(1, T`A boat at $4$ m s⁻¹ in still water is steered straight across a river $80$ m wide flowing at $2.5$ m s⁻¹. Find its resultant speed and drift.`, [T`Resultant $\sqrt{4^2+2.5^2}=4.72$ m s⁻¹.`, T`Time $\frac{80}4=20$ s; drift $2.5\times20=50$ m downstream.`]),
  B.ex(2, T`A plane with airspeed $200$ km h⁻¹ must fly due north; a $50$ km h⁻¹ wind blows from the west. Find its heading and ground speed.`, [T`The plane must head west of north at $\alpha$ with $200\sin\alpha=50$: $\alpha=14.5^\circ$ — bearing $345.5^\circ$.`, T`Ground speed $\sqrt{200^2-50^2}=194$ km h⁻¹.`]),
  B.warn([T`Adding speeds instead of velocities.`, T`Mixing up the heading (where the craft points) with the track (where it goes).`]),
  B.exam([T`Draw the vector triangle and label which side is which velocity.`]),
  B.checks([[T`Boat $3$ m s⁻¹, current $3$ m s⁻¹: can it go straight across?`, T`No — it would need to head directly upstream.`]]),
  B.examq(7, T`<p>A river is $60$ m wide and flows at $1.5$ m s⁻¹. A boat moves at $2.5$ m s⁻¹ relative to the water.</p><p>(a) The boat is steered so that it reaches the point directly opposite. Find the angle between its heading and the bank, and the crossing time. <span class="mk">[4]</span> (b) Instead the boat is steered perpendicular to the bank. Find the crossing time and the distance downstream at which it lands. <span class="mk">[3]</span></p>`,
    T`<p>(a) Upstream component $2.5\cos\beta=1.5\Rightarrow\beta=53.1^\circ$ to the bank, upstream <span class="mk">M1 A1</span>. Across: $2.5\sin\beta=2$ m s⁻¹; time $30$ s <span class="mk">M1 A1</span>.</p><p>(b) $\frac{60}{2.5}=24$ s <span class="mk">B1</span>; drift $1.5\times24=36$ m <span class="mk">M1 A1</span>.</p>`),
  B.key([T`Ground velocity $=$ own velocity $+$ medium's velocity.`, T`Crossing time uses only the across-component.`]),
].join('');

BOOK.f2_relv = [
  B.why(T`<p>Air traffic control and ship navigation ask: will these two paths come dangerously close? Viewing one craft from the other turns two moving objects into one moving object and one fixed point.</p>`),
  B.def('relative velocity', T`<p>The velocity of $A$ relative to $B$ is $_A\mathbf v_B=\mathbf v_A-\mathbf v_B$ — how $A$ appears to move to an observer travelling with $B$.</p>`),
  B.thm('Closest approach', T`<p>With $\mathbf r_A=\mathbf a+\mathbf v_At$ and $\mathbf r_B=\mathbf b+\mathbf v_Bt$, the separation is $\overrightarrow{AB}=(\mathbf b-\mathbf a)+(\mathbf v_B-\mathbf v_A)t$. It is least when $\overrightarrow{AB}\cdot(\mathbf v_B-\mathbf v_A)=0$, i.e. $$t=-\frac{(\mathbf b-\mathbf a)\cdot(\mathbf v_B-\mathbf v_A)}{|\mathbf v_B-\mathbf v_A|^2}.$$</p>`),
  B.proof(T`<p>$|\overrightarrow{AB}|^2=|\mathbf p|^2+2t\,\mathbf p\cdot\mathbf w+t^2|\mathbf w|^2$ with $\mathbf p=\mathbf b-\mathbf a$, $\mathbf w=\mathbf v_B-\mathbf v_A$. This quadratic in $t$ is least when its derivative $2\mathbf p\cdot\mathbf w+2t|\mathbf w|^2=0$ — equivalently $(\mathbf p+t\mathbf w)\cdot\mathbf w=0$.</p>`),
  B.ex(1, T`$A$ starts at the origin with velocity $(3\mathbf i+4\mathbf j)$, $B$ at $10\mathbf i$ with velocity $(-\mathbf i+5\mathbf j)$ (km, hours). Find the closest approach.`, [T`$\overrightarrow{AB}=(10-4t)\mathbf i+t\mathbf j$.`, T`$(10-4t)(-4)+t(1)=0\Rightarrow t=\frac{40}{17}=2.35$ h.`, T`Distance $\sqrt{(10-4t)^2+t^2}=2.43$ km.`]),
  B.ex(2, T`Show that ships $P$: $(2\mathbf i+3\mathbf j)+t(4\mathbf i+3\mathbf j)$ and $Q$: $(14\mathbf i-3\mathbf j)+t(-2\mathbf i+6\mathbf j)$ collide.`, [T`$\overrightarrow{PQ}=(12-6t)\mathbf i+(-6+3t)\mathbf j=(6-3t)(2\mathbf i-\mathbf j)$.`, T`Zero at $t=2$, at $(10,9)$: they collide.`]),
  B.warn([T`Subtracting the velocities the wrong way round.`, T`Finding the time of closest approach but forgetting to compute the distance.`]),
  B.exam([T`Write the position vectors at time $t$ first; everything follows from $\overrightarrow{AB}$.`]),
  B.checks([[T`$\mathbf v_A=(3,1)$, $\mathbf v_B=(1,4)$. $_A\mathbf v_B$?`, T`$(2,-3)$.`]]),
  B.examq(10, T`<p>At noon ship $P$ is at $(2\mathbf i+3\mathbf j)$ km moving with velocity $(4\mathbf i+3\mathbf j)$ km h⁻¹, and ship $Q$ is at $(14\mathbf i-3\mathbf j)$ km.</p><p>(a) If $Q$ moves with velocity $(-2\mathbf i+6\mathbf j)$ km h⁻¹, show that the ships collide and find when and where. <span class="mk">[5]</span> (b) If instead $Q$ moves with velocity $(-2\mathbf i+5\mathbf j)$ km h⁻¹, find the least distance between the ships. <span class="mk">[5]</span></p>`,
    T`<p>(a) $\overrightarrow{PQ}=(12-6t)\mathbf i+(-6+3t)\mathbf j$ <span class="mk">M1 A1</span>; both components zero at $t=2$ <span class="mk">M1 A1</span>: collide at 2 pm at $(10,9)$ <span class="mk">A1</span>.</p><p>(b) $\overrightarrow{PQ}=(12-6t)\mathbf i+(-6+2t)\mathbf j$ <span class="mk">M1</span>. $|PQ|^2$ least when $-6(12-6t)+2(-6+2t)=0$ <span class="mk">M1</span>, $t=2.1$ <span class="mk">A1</span>; distance $\sqrt{0.36+3.24}=1.90$ km <span class="mk">M1 A1</span>.</p>`),
  B.key([T`$_A\mathbf v_B=\mathbf v_A-\mathbf v_B$.`, T`Closest approach: $\overrightarrow{AB}\perp$ relative velocity.`, T`Collision: $\overrightarrow{AB}=\mathbf 0$ at one time.`]),
].join('');

BOOK.f2_vcirc = [
  B.why(T`<p>On a loop-the-loop the speed changes all the way round, so the central force changes too. Energy tells you the speed at each point; Newton's second law towards the centre tells you the force — and whether the string, track or rod can supply it.</p>`),
  B.thm('Speed and tension', T`<p>On a string of length $r$, with speed $u$ at the bottom and angle $\theta$ from the downward vertical: $$v^2=u^2-2gr(1-\cos\theta),\qquad T=\frac{mv^2}r+mg\cos\theta=\frac{mu^2}r-mg(2-3\cos\theta).$$</p>`),
  B.proof(T`<p>Energy: the particle has risen $r-r\cos\theta$, so $\frac12mv^2=\frac12mu^2-mgr(1-\cos\theta)$. Towards the centre the weight has component $-mg\cos\theta$, so $T-mg\cos\theta=\frac{mv^2}r$. Substituting $v^2$ gives the last form.</p>`),
  B.thm('Completing the circle', T`<ul><li><b>String</b> (or inside a smooth track): need $T\ge0$ at the top ($\theta=\pi$): $\frac{mu^2}r-5mg\ge0$, so $u^2\ge5gr$.</li><li><b>Rod</b> (or bead on a wire): it can push, so it only needs $v^2\ge0$ at the top: $u^2\ge4gr$.</li></ul>`),
  B.thm('Leaving a sphere', T`<p>A particle released from rest at the top of a smooth sphere of radius $r$ leaves the surface when $\cos\theta=\frac23$ ($\theta$ from the top), i.e. at height $\frac23r$ above the centre.</p>`),
  B.proof(T`<p>At angle $\theta$ from the top, $v^2=2gr(1-\cos\theta)$, and towards the centre $mg\cos\theta-R=\frac{mv^2}r$. The particle leaves when $R=0$: $g\cos\theta=2g(1-\cos\theta)\Rightarrow\cos\theta=\frac23$.</p>`, 'Proof of the sphere result'),
  B.ex(1, T`A particle on a $1$ m string has speed $5$ m s⁻¹ at the bottom. Where does the string go slack?`, [T`$T=0$: $\frac{25}1-9.8(2-3\cos\theta)=0\Rightarrow\cos\theta=\frac{19.6-25}{29.4}=-0.184$.`, T`$\theta=101^\circ$ from the bottom — just above the horizontal. It then moves as a projectile.`]),
  B.ex(2, T`What is the least speed at the bottom for a particle on a light rod of length $0.5$ m to complete a circle?`, [T`$u^2\ge4gr=19.6\Rightarrow u\ge4.43$ m s⁻¹.`]),
  B.warn([T`Using $u^2\ge4gr$ for a string.`, T`Measuring $\theta$ from the top in one equation and the bottom in another.`]),
  B.exam([T`"Show that the tension is…" questions: write the energy equation and the radial equation separately, then combine.`]),
  B.checks([[T`String, $r=1$ m: least $u$ to complete the circle?`, T`$\sqrt{49}=7$ m s⁻¹.`], [T`Tension at the top on a string at the minimum speed?`, T`Zero.`]]),
  B.examq(9, T`<p>A particle $P$ of mass $0.5$ kg is attached to a light inextensible string of length $0.8$ m, the other end fixed at $O$. $P$ moves in a vertical circle with speed $u$ at the lowest point.</p><p>(a) Show that when $OP$ makes an angle $\theta$ with the downward vertical, the tension is $T=\frac{mu^2}{0.8}-mg(2-3\cos\theta)$. <span class="mk">[4]</span> (b) Given $u=6$, find the tension when the string is horizontal. <span class="mk">[2]</span> (c) Find the least value of $u$ for which $P$ completes the circle. <span class="mk">[3]</span></p>`,
    T`<p>(a) Energy $v^2=u^2-1.6g(1-\cos\theta)$ <span class="mk">M1 A1</span>; radial $T-mg\cos\theta=\frac{mv^2}{0.8}$ <span class="mk">M1</span>; combine <span class="mk">A1</span>.</p><p>(b) $\theta=90^\circ$: $T=\frac{0.5(36)}{0.8}-0.5(9.8)(2)=12.7$ N <span class="mk">M1 A1</span>.</p><p>(c) $T\ge0$ at $\theta=180^\circ$: $u^2\ge5g(0.8)=39.2$ <span class="mk">M1 A1</span>, $u=6.26$ m s⁻¹ <span class="mk">A1</span>.</p>`),
  B.key([T`Energy for speed; Newton II towards the centre for force.`, T`String $u^2\ge5gr$; rod $u^2\ge4gr$; sphere leaves at $\cos\theta=\frac23$.`]),
].join('');

BOOK.f2_grav = [
  B.why(T`<p>The force that drops an apple also holds the Moon in orbit. Newton's law of gravitation quantifies it — and with circular motion it predicts the speed and period of every satellite.</p>`),
  B.def('universal law of gravitation', T`$$F=\frac{Gm_1m_2}{d^2},\qquad G=6.67\times10^{-11}\ \text{N m}^2\text{kg}^{-2}$$<p>An attractive force along the line of centres; spheres act as if their mass were at the centre.</p>`),
  B.thm('Surface gravity', T`<p>At the surface of a planet of mass $M$ and radius $R$: $mg=\frac{GMm}{R^2}$, so $g=\frac{GM}{R^2}$ and $GM=gR^2$. At distance $d$ from the centre the field strength is $g\left(\frac Rd\right)^2$.</p>`),
  B.thm('Circular orbits', T`<p>For a satellite in a circular orbit of radius $r$: $$v=\sqrt{\frac{GM}r},\qquad T=2\pi\sqrt{\frac{r^3}{GM}},\qquad T^2=\frac{4\pi^2}{GM}r^3.$$</p>`),
  B.proof(T`<p>Gravity provides the central force: $\frac{GMm}{r^2}=\frac{mv^2}r\Rightarrow v^2=\frac{GM}r$. The period is the circumference over the speed: $T=\frac{2\pi r}v=2\pi\sqrt{\frac{r^3}{GM}}$. (This is Kepler's third law.)</p>`),
  B.ex(1, T`Find $g$ on Mars ($M=6.42\times10^{23}$ kg, $R=3.39\times10^6$ m).`, [T`$g=\frac{6.67\times10^{-11}\times6.42\times10^{23}}{(3.39\times10^6)^2}=3.73$ m s⁻².`]),
  B.ex(2, T`A satellite orbits $400$ km above the Earth ($M=5.97\times10^{24}$ kg, $R=6.37\times10^6$ m). Find its speed and period.`, [T`$r=6.77\times10^6$ m; $v=\sqrt{\frac{GM}r}=7.67\times10^3$ m s⁻¹.`, T`$T=\frac{2\pi r}v=5.55\times10^3$ s $\approx92$ minutes.`]),
  B.ex(3, T`Find the radius of a geostationary orbit (period $86\,164$ s).`, [T`$r^3=\frac{GMT^2}{4\pi^2}\Rightarrow r=4.22\times10^7$ m — about $35\,800$ km above the surface.`]),
  B.warn([T`Using the height above the surface as $r$.`, T`Squaring $d$ incorrectly in standard form.`]),
  B.exam([T`Derive $v$ or $T$ from "gravity provides the central force" — it is often worth marks.`]),
  B.checks([[T`Doubling the distance changes the force by?`, T`A factor $\frac14$.`], [T`Does orbital speed depend on the satellite's mass?`, T`No.`]]),
  B.examq(7, T`<p>A satellite moves in a circular orbit of radius $r$ about the Earth, of mass $M$.</p><p>(a) Show that the period $T$ satisfies $T^2=\dfrac{4\pi^2r^3}{GM}$. <span class="mk">[3]</span> (b) Given that $T=2$ hours, $M=5.97\times10^{24}$ kg and $G=6.67\times10^{-11}$, find $r$. <span class="mk">[3]</span> (c) Hence find the height above the surface (radius $6.37\times10^6$ m). <span class="mk">[1]</span></p>`,
    T`<p>(a) $\frac{GMm}{r^2}=mr\omega^2$ with $\omega=\frac{2\pi}T$ <span class="mk">M1 A1</span>, rearrange <span class="mk">A1</span>.</p><p>(b) $r^3=\frac{GM(7200)^2}{4\pi^2}$ <span class="mk">M1 A1</span>, $r=8.06\times10^6$ m <span class="mk">A1</span>. (c) $1.69\times10^6$ m <span class="mk">B1</span>.</p>`),
  B.key([T`$F=\frac{Gm_1m_2}{d^2}$; $GM=gR^2$.`, T`Orbit: $v=\sqrt{GM/r}$, $T^2\propto r^3$.`]),
].join('');

BOOK.f2_dim = [
  B.why(T`<p>You can't add a length to a time. Checking that every term in an equation has the same dimensions catches errors instantly — and, if you know which quantities matter, can even predict the form of a formula.</p>`),
  B.def('dimensions', T`<p>Write $[Q]$ for the dimensions of $Q$ in terms of mass $M$, length $L$ and time $T$:</p><table class="tbl"><tr><th>Quantity</th><th>Dimensions</th></tr><tr><td>velocity</td><td>$LT^{-1}$</td></tr><tr><td>acceleration</td><td>$LT^{-2}$</td></tr><tr><td>force, $\lambda$</td><td>$MLT^{-2}$</td></tr><tr><td>work, energy</td><td>$ML^2T^{-2}$</td></tr><tr><td>power</td><td>$ML^2T^{-3}$</td></tr><tr><td>momentum, impulse</td><td>$MLT^{-1}$</td></tr><tr><td>density</td><td>$ML^{-3}$</td></tr><tr><td>pressure</td><td>$ML^{-1}T^{-2}$</td></tr><tr><td>$G$</td><td>$M^{-1}L^3T^{-2}$</td></tr></table><p>Pure numbers, angles and the arguments and values of $\sin$, $e^x$, $\ln$ are dimensionless.</p>`),
  B.thm('Dimensional consistency', T`<p>Every term of a valid equation has the same dimensions. Consistency is necessary but not sufficient: dimensionless constants (like $\frac12$ or $2\pi$) can't be checked.</p>`),
  B.ex(1, T`Check $s=ut+\frac12at^2$.`, [T`$[ut]=LT^{-1}T=L$; $[at^2]=LT^{-2}T^2=L$; $[s]=L$. Consistent.`]),
  B.ex(2, T`The period of a pendulum is $T=kl^\alpha m^\beta g^\gamma$. Find $\alpha,\beta,\gamma$.`, [T`$T^1=L^\alpha M^\beta(LT^{-2})^\gamma$.`, T`$M$: $\beta=0$. $T$: $-2\gamma=1\Rightarrow\gamma=-\frac12$. $L$: $\alpha+\gamma=0\Rightarrow\alpha=\frac12$.`, T`$T=k\sqrt{\frac lg}$ (experiment gives $k=2\pi$).`]),
  B.warn([T`Treating constants like $g$ or $G$ as dimensionless.`, T`Forgetting that the method can't find the dimensionless constant $k$.`]),
  B.exam([T`Set out three equations — one each for $M$, $L$ and $T$ — then solve.`]),
  B.checks([[T`$[\lambda]$ from $T=\frac{\lambda x}l$?`, T`$MLT^{-2}$ (a force).`], [T`Is $P=Fv$ consistent?`, T`Yes: $MLT^{-2}\cdot LT^{-1}=ML^2T^{-3}$.`]]),
  B.examq(6, T`<p>The speed $v$ of sound in a gas is thought to depend only on the pressure $p$ and the density $\rho$, so that $v=kp^\alpha\rho^\beta$, where $k$ is a dimensionless constant.</p><p>(a) Write down the dimensions of pressure. <span class="mk">[1]</span> (b) Find $\alpha$ and $\beta$. <span class="mk">[4]</span> (c) Explain why dimensional analysis cannot find $k$. <span class="mk">[1]</span></p>`,
    T`<p>(a) $ML^{-1}T^{-2}$ <span class="mk">B1</span>.</p><p>(b) $LT^{-1}=(ML^{-1}T^{-2})^\alpha(ML^{-3})^\beta$ <span class="mk">M1</span>. $M$: $\alpha+\beta=0$; $T$: $-2\alpha=-1$ <span class="mk">M1</span>. $\alpha=\frac12$, $\beta=-\frac12$ <span class="mk">A1</span>; check $L$: $-\frac12+\frac32=1$ ✓ <span class="mk">A1</span>.</p><p>(c) $k$ has no dimensions, so it doesn't appear in the equations <span class="mk">B1</span>.</p>`),
  B.key([T`Every term must have the same dimensions.`, T`For $Q=ka^\alpha b^\beta c^\gamma$, equate powers of $M$, $L$, $T$.`]),
].join('');
