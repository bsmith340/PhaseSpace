// BCS Academy original papers · not CCEA papers. Maths A2 2 Applied Mathematics: three practice papers (easy, medium, hard).
// Format: 1 h 30 min, 100 marks, Section A Mechanics (50) and Section B Statistics (50), calculator allowed. Take g = 9.8 m s⁻². Points are COURSES.m4.points ids.

BCSP.add({
  id: 'm4-easy',
  unit: 'm4',
  level: 'easy',
  title: 'Maths A2 2 · Paper A (Easy)',
  minutes: 90,
  calc: true,
  sections: [
    {
      id: 'A',
      title: 'Mechanics',
      marks: 50 },
    {
      id: 'B',
      title: 'Statistics',
      marks: 50 }],
  questions: [
    {
      n: 1,
      section: 'A',
      points: ['m4_cal1', 'm4_cal2'],
      q: 'A particle moves along a straight line. At time $t$ seconds its velocity is $v = 3t^2 - 12t + 9$ m s⁻¹. It starts at the point $O$.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find the times when the particle is instantaneously at rest.',
          answer: '$t = 1$ and $t = 3$',
          ms: ['M1 sets $v = 0$ and factorises', 'A1 $t = 1,\\ 3$'],
          steps: [
            { say: 'At rest means velocity is zero.', show: '$3t^2 - 12t + 9 = 0$' },
            { say: 'Divide by three and factorise.', show: '$t^2 - 4t + 3 = (t - 1)(t - 3) = 0$' },
            { say: 'So the particle is at rest at one second and three seconds.', show: '$t = 1,\\ t = 3$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the acceleration of the particle when $t = 4$.',
          answer: '$12$ m s⁻²',
          ms: ['M1 $a = \\frac{dv}{dt} = 6t - 12$', 'A1 12'],
          steps: [
            { say: 'Acceleration is the derivative of velocity.', show: '$a = \\dfrac{dv}{dt} = 6t - 12$' },
            { say: 'Substitute t equals four.', show: '$a = 24 - 12$' },
            { say: 'So the acceleration is twelve metres per second squared.', show: '$a = 12$ m s⁻²' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the displacement of the particle from $O$ when $t = 1$.',
          answer: '$4$ m',
          ms: ['M1 integrates $v$', 'A1 $s = t^3 - 6t^2 + 9t$ (with $c = 0$)', 'A1 4 m'],
          steps: [
            { say: 'Displacement is the integral of velocity.', show: '$s = \\displaystyle\\int(3t^2 - 12t + 9)\\,dt = t^3 - 6t^2 + 9t + c$' },
            { say: 'It starts at O, so s is nought when t is nought, and c is nought.', show: '$c = 0$' },
            { say: 'Substitute t equals one.', show: '$s = 1 - 6 + 9 = 4$ m' }] },
        {
          l: 'd',
          marks: 3,
          q: 'Find the total distance travelled in the first 4 seconds.',
          answer: '$12$ m',
          ms: [
            'M1 considers direction changes at $t = 1$ and $t = 3$',
            'A1 $s(1) = 4,\\ s(3) = 0,\\ s(4) = 4$',
            'A1 12 m'],
          steps: [
            { say: 'The particle changes direction at one and three seconds, so split the motion there.', show: '$s(0) = 0,\\ s(1) = 4,\\ s(3) = 0,\\ s(4) = 4$' },
            { say: 'Add the distances for each stage.', show: '$4 + |0 - 4| + |4 - 0|$' },
            { say: 'Total distance is twelve metres.', show: '$12$ m' }] },
        {
          l: 'e',
          marks: 2,
          q: 'A second particle, of mass 3 kg, moves in a plane so that its position vector at time $t$ seconds is $\\mathbf r = 2t^2\\,\\mathbf i + (6t - t^3)\\,\\mathbf j$ metres. Find its velocity at time $t$.',
          answer: '$\\mathbf v = 4t\\,\\mathbf i + (6 - 3t^2)\\,\\mathbf j$',
          ms: ['M1 differentiates each component', 'A1 $4t\\,\\mathbf i + (6 - 3t^2)\\,\\mathbf j$'],
          steps: [
            { say: 'Velocity is the derivative of position.', show: '$\\mathbf v = \\dfrac{d\\mathbf r}{dt}$' },
            { say: 'Differentiate each component separately.', show: '$\\dfrac{d}{dt}(2t^2) = 4t,\\quad \\dfrac{d}{dt}(6t - t^3) = 6 - 3t^2$' },
            { say: 'Write the vector.', show: '$\\mathbf v = 4t\\,\\mathbf i + (6 - 3t^2)\\,\\mathbf j$' }] },
        {
          l: 'f',
          marks: 2,
          q: 'Find the speed of this particle when $t = 2$.',
          answer: '$10$ m s⁻¹',
          ms: ['M1 $\\sqrt{8^2 + (-6)^2}$', 'A1 10'],
          steps: [
            { say: 'Substitute t equals two.', show: '$\\mathbf v = 8\\mathbf i - 6\\mathbf j$' },
            { say: 'Speed is the magnitude.', show: '$|\\mathbf v| = \\sqrt{64 + 36}$' },
            { say: 'So the speed is ten metres per second.', show: '$10$ m s⁻¹' }] },
        {
          l: 'g',
          marks: 3,
          q: 'Find the magnitude of the resultant force acting on this particle when $t = 2$.',
          answer: '$37.9$ N',
          ms: [
            'M1 $\\mathbf a = 4\\mathbf i - 6t\\,\\mathbf j$',
            'M1 $\\mathbf F = 3\\mathbf a = 12\\mathbf i - 36\\mathbf j$',
            'A1 37.9 N'],
          steps: [
            { say: 'Differentiate the velocity to get acceleration.', show: '$\\mathbf a = 4\\mathbf i - 6t\\,\\mathbf j = 4\\mathbf i - 12\\mathbf j$ at $t = 2$' },
            { say: 'Newton\'s second law: force is mass times acceleration.', show: '$\\mathbf F = 3(4\\mathbf i - 12\\mathbf j) = 12\\mathbf i - 36\\mathbf j$' },
            { say: 'Find the magnitude.', show: '$|\\mathbf F| = \\sqrt{144 + 1296} = 37.9$ N' }] }] },
    {
      n: 2,
      section: 'A',
      points: ['m4_proj'],
      q: 'A ball is kicked from a point $O$ on horizontal ground with speed 20 m s⁻¹ at an angle of $30^\\circ$ above the horizontal. The ball is modelled as a particle moving freely under gravity. Take $g = 9.8$ m s⁻².',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find the time of flight.',
          answer: '$2.04$ s',
          ms: ['M1 vertical: $0 = 20\\sin 30^\\circ t - 4.9t^2$', 'A1 $10t - 4.9t^2 = 0$', 'A1 2.04 s'],
          steps: [
            { say: 'Resolve the initial velocity vertically: twenty sin thirty is ten.', show: '$u_y = 20\\sin 30^\\circ = 10$' },
            { say: 'It lands when the vertical displacement is zero.', show: '$0 = 10t - 4.9t^2$' },
            { say: 'The non-zero solution is ten over four point nine.', show: '$t = \\dfrac{10}{4.9} = 2.04$ s' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the horizontal distance travelled by the ball before it lands.',
          answer: '$35.3$ m',
          ms: ['M1 $20\\cos 30^\\circ \\times 2.04$', 'A1 35.3 m'],
          steps: [
            { say: 'The horizontal velocity is constant.', show: '$u_x = 20\\cos 30^\\circ = 17.32$' },
            { say: 'Distance equals speed times time.', show: '$x = 17.32 \\times 2.041$' },
            { say: 'So the range is thirty five point three metres.', show: '$x = 35.3$ m' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find the greatest height reached.',
          answer: '$5.10$ m',
          ms: ['M1 $0 = 10^2 - 2(9.8)h$', 'A1 5.10 m'],
          steps: [
            { say: 'At the top the vertical velocity is zero.', show: '$v_y^2 = u_y^2 - 2gh$' },
            { say: 'Substitute.', show: '$0 = 100 - 19.6h$' },
            { say: 'Solve.', show: '$h = 5.10$ m' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Find the speed and direction of motion of the ball 1.5 seconds after it is kicked.',
          answer: '$17.9$ m s⁻¹ at $15.2^\\circ$ below the horizontal',
          ms: [
            'B1 $v_x = 17.32$',
            'B1 $v_y = 10 - 9.8(1.5) = -4.7$',
            'M1 Pythagoras and angle',
            'A1 17.9 m s⁻¹, 15.2° below horizontal'],
          steps: [
            { say: 'Horizontal velocity stays seventeen point three two.', show: '$v_x = 17.32$' },
            { say: 'Vertical velocity: ten minus nine point eight times one point five.', show: '$v_y = 10 - 14.7 = -4.7$ (downwards)' },
            { say: 'Combine with Pythagoras.', show: '$v = \\sqrt{17.32^2 + 4.7^2} = 17.9$ m s⁻¹' },
            { say: 'Find the angle below the horizontal.', show: '$\\tan^{-1}\\dfrac{4.7}{17.32} = 15.2^\\circ$ below the horizontal' }] }] },
    {
      n: 3,
      section: 'A',
      points: ['m4_mom', 'm4_ladder'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'A uniform beam $AB$ of length 6 m and mass 20 kg rests horizontally on two supports at $C$ and $D$, where $AC = 1$ m and $DB = 2$ m. A particle of mass 15 kg is placed on the beam 5 m from $A$. Find the reactions at $C$ and $D$. Take $g = 9.8$ m s⁻².',
          answer: '$R_C = 16.3$ N, $R_D = 327$ N',
          ms: [
            'M1 moments about $C$ (or $D$)',
            'A1 $3R_D = 20g(2) + 15g(4)$',
            'A1 $R_D = 327$ N',
            'M1 resolves vertically',
            'A1 $R_C = 16.3$ N'],
          steps: [
            { say: 'Measure everything from A: C is at one metre, the beam\'s centre at three, the particle at five and D at four.', show: '$C: 1,\\ G: 3,\\ \\text{particle}: 5,\\ D: 4$' },
            { say: 'Take moments about C to remove R C.', show: '$R_D \\times 3 = 20g \\times 2 + 15g \\times 4 = 100g$' },
            { say: 'Solve.', show: '$R_D = \\dfrac{100g}{3} = 327$ N' },
            { say: 'Resolve vertically: total weight is thirty five g.', show: '$R_C = 35g - \\dfrac{100g}{3} = \\dfrac{5g}{3} = 16.3$ N' }] },
        {
          l: 'b',
          marks: 3,
          q: 'The particle is moved towards $B$. Find the greatest distance from $A$ at which it can be placed without the beam tilting.',
          answer: '$5\\tfrac13$ m from $A$',
          ms: ['B1 $R_C = 0$ on the point of tilting', 'M1 moments about $D$', 'A1 $5.33$ m'],
          steps: [
            { say: 'On the point of tilting about D, the reaction at C becomes zero.', show: '$R_C = 0$' },
            { say: 'Take moments about D: the beam\'s weight is one metre on one side, the particle x minus four on the other.', show: '$20g \\times 1 = 15g(x - 4)$' },
            { say: 'Solve.', show: '$x - 4 = \\tfrac43 \\Rightarrow x = 5.33$ m' }] },
        {
          l: 'c',
          marks: 1,
          q: 'State what is meant by modelling the beam as uniform.',
          answer: 'Its mass is evenly distributed, so its weight acts at its midpoint',
          ms: ['B1 weight acts at the centre'],
          steps: [
            { say: 'Uniform means the mass is spread evenly along the beam.', show: 'evenly distributed mass' },
            { say: 'So the weight acts at the midpoint.', show: 'weight at $3$ m from $A$' },
            { say: 'That is why we used the midpoint in the moments.', show: 'B1' }] },
        {
          l: 'd',
          marks: 4,
          q: 'A uniform ladder of length 5 m and weight 200 N rests with its top against a smooth vertical wall and its foot on rough horizontal ground. The ladder makes an angle of $60^\\circ$ with the ground and is about to slip. Find the normal reaction at the ground and the normal reaction at the wall.',
          answer: 'Ground: $200$ N; wall: $57.7$ N',
          ms: [
            'B1 $R = 200$ N',
            'M1 moments about the foot',
            'A1 $5S\\sin 60^\\circ = 200 \\times 2.5\\cos 60^\\circ$',
            'A1 $S = 57.7$ N'],
          steps: [
            { say: 'Resolve vertically: the ground reaction balances the weight, as the wall is smooth.', show: '$R = 200$ N' },
            { say: 'Take moments about the foot. The wall reaction has perpendicular distance five sin sixty, the weight two point five cos sixty.', show: '$S \\times 5\\sin 60^\\circ = 200 \\times 2.5\\cos 60^\\circ$' },
            { say: 'Solve.', show: '$S = \\dfrac{250}{4.330} = 57.7$ N' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Write down the friction force at the ground.',
          answer: '$57.7$ N',
          ms: ['B1 57.7 N'],
          steps: [
            { say: 'Resolve horizontally.', show: '$F = S$' },
            { say: 'The friction balances the wall reaction.', show: '$F = 57.7$ N' },
            { say: 'It acts towards the wall.', show: 'towards the wall' }] },
        {
          l: 'f',
          marks: 2,
          q: 'Find the coefficient of friction between the ladder and the ground.',
          answer: '$\\mu = 0.289$',
          ms: ['M1 $F = \\mu R$', 'A1 0.289'],
          steps: [
            { say: 'The ladder is about to slip, so friction is limiting.', show: '$F = \\mu R$' },
            { say: 'Substitute.', show: '$57.7 = 200\\mu$' },
            { say: 'Solve.', show: '$\\mu = 0.289$' }] }] },
    {
      n: 4,
      section: 'A',
      points: ['m4_imp'],
      q: 'Two particles $A$ and $B$, of masses 2 kg and 3 kg, move towards each other along a smooth horizontal line with speeds 5 m s⁻¹ and 2 m s⁻¹ respectively. They collide, and $A$ rebounds with speed 1 m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find the speed of $B$ after the collision and state its direction.',
          answer: '$2$ m s⁻¹, in $A$\'s original direction (B\'s direction reversed)',
          ms: ['M1 conservation of momentum with signs', 'A1 $10 - 6 = -2 + 3v$', 'A1 $v = 2$, direction reversed'],
          steps: [
            { say: 'Take A\'s original direction as positive.', show: 'before: $2(5) + 3(-2) = 4$' },
            { say: 'A rebounds, so its velocity is minus one.', show: 'after: $2(-1) + 3v$' },
            { say: 'Momentum is conserved.', show: '$4 = -2 + 3v \\Rightarrow v = 2$' },
            { say: 'Positive, so B now moves in A\'s original direction.', show: '$B$: 2 m s⁻¹, direction reversed' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the magnitude of the impulse exerted on $A$.',
          answer: '$12$ N s',
          ms: ['M1 $2(-1) - 2(5)$', 'A1 12 N s'],
          steps: [
            { say: 'Impulse equals change in momentum.', show: '$I = mv - mu$' },
            { say: 'For A.', show: '$I = 2(-1) - 2(5) = -12$' },
            { say: 'So the magnitude is twelve newton seconds.', show: '$12$ N s' }] },
        {
          l: 'c',
          marks: 1,
          q: 'The collision lasts 0.05 seconds. Find the average force between the particles.',
          answer: '$240$ N',
          ms: ['B1 240 N'],
          steps: [
            { say: 'Impulse is force times time.', show: '$I = Ft$' },
            { say: 'Rearrange.', show: '$F = \\dfrac{12}{0.05}$' },
            { say: 'So the average force is two hundred and forty newtons.', show: '$F = 240$ N' }] }] },
    {
      n: 5,
      section: 'B',
      points: ['m4_cond', 'm4_pmod'],
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'The table shows whether 120 students study Biology.<br><table><tr><th></th><th>Biology</th><th>No Biology</th></tr><tr><td>Male</td><td>18</td><td>42</td></tr><tr><td>Female</td><td>30</td><td>30</td></tr></table>A student is chosen at random. Find the probability that the student studies Biology.',
          answer: '$0.4$',
          ms: ['B1 $\\frac{48}{120} = 0.4$'],
          steps: [
            { say: 'Add the Biology column.', show: '$18 + 30 = 48$' },
            { say: 'Divide by the total.', show: '$\\dfrac{48}{120}$' },
            { say: 'This is nought point four.', show: '$0.4$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the probability that the student is female, given that the student studies Biology.',
          answer: '$0.625$',
          ms: ['M1 $\\frac{30}{48}$', 'A1 0.625'],
          steps: [
            { say: 'Given Biology, restrict to the Biology column of forty eight students.', show: '$n = 48$' },
            { say: 'Thirty of them are female.', show: '$P(F \\mid B) = \\dfrac{30}{48}$' },
            { say: 'Simplify.', show: '$= 0.625$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Determine whether the events \'female\' and \'studies Biology\' are independent.',
          answer: 'Not independent: $P(F \\mid B) = 0.625 \\neq P(F) = 0.5$',
          ms: ['M1 compares $P(F \\mid B)$ with $P(F)$ (or equivalent)', 'A1 not independent with values'],
          steps: [
            { say: 'Half of all students are female.', show: '$P(F) = \\dfrac{60}{120} = 0.5$' },
            { say: 'If independent, knowing B would not change the probability.', show: '$P(F \\mid B) = 0.625$' },
            { say: 'These differ, so the events are not independent.', show: '$0.625 \\neq 0.5 \\Rightarrow$ not independent' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Two different students are chosen at random. Find the probability that both study Biology.',
          answer: '$0.158$',
          ms: ['M1 $\\frac{48}{120} \\times \\frac{47}{119}$', 'A1 0.158'],
          steps: [
            { say: 'The students are different, so this is without replacement.', show: 'first: $\\dfrac{48}{120}$' },
            { say: 'After one Biology student is picked, forty seven remain out of one hundred and nineteen.', show: 'second: $\\dfrac{47}{119}$' },
            { say: 'Multiply.', show: '$\\dfrac{48}{120}\\times\\dfrac{47}{119} = 0.158$' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Events $X$ and $Y$ are such that $P(X) = 0.4$, $P(Y) = 0.5$ and $P(X \\cup Y) = 0.7$. Find $P(X \\cap Y)$.',
          answer: '$0.2$',
          ms: ['B1 0.2'],
          steps: [
            { say: 'Use the addition rule.', show: '$P(X \\cup Y) = P(X) + P(Y) - P(X \\cap Y)$' },
            { say: 'Substitute.', show: '$0.7 = 0.4 + 0.5 - P(X \\cap Y)$' },
            { say: 'So the intersection is nought point two.', show: '$P(X \\cap Y) = 0.2$' }] },
        {
          l: 'f',
          marks: 3,
          q: 'Find $P(X \\mid Y)$ and hence state, with a reason, whether $X$ and $Y$ are independent.',
          answer: '$P(X \\mid Y) = 0.4$; independent since $P(X \\mid Y) = P(X)$',
          ms: ['M1 $\\frac{0.2}{0.5}$', 'A1 0.4', 'B1 independent, as equals $P(X)$'],
          steps: [
            { say: 'Use the conditional probability formula.', show: '$P(X \\mid Y) = \\dfrac{P(X \\cap Y)}{P(Y)} = \\dfrac{0.2}{0.5}$' },
            { say: 'Evaluate.', show: '$= 0.4$' },
            { say: 'This equals P of X, so X and Y are independent.', show: '$P(X \\mid Y) = P(X) \\Rightarrow$ independent' }] },
        {
          l: 'g',
          marks: 2,
          q: 'In a population, 2% of people have a condition. A test gives a positive result for 95% of people with the condition and for 4% of people without it. Find the probability that a randomly chosen person tests positive.',
          answer: '$0.0582$',
          ms: ['M1 $0.02(0.95) + 0.98(0.04)$', 'A1 0.0582'],
          steps: [
            { say: 'Draw a tree: condition or not, then positive or not.', show: '$P(C) = 0.02,\\ P(+ \\mid C) = 0.95,\\ P(+ \\mid C\') = 0.04$' },
            { say: 'Add the two branches that end in positive.', show: '$0.02 \\times 0.95 + 0.98 \\times 0.04$' },
            { say: 'Evaluate.', show: '$0.019 + 0.0392 = 0.0582$' }] },
        {
          l: 'h',
          marks: 2,
          q: 'Given that a person tests positive, find the probability that they have the condition.',
          answer: '$0.326$',
          ms: ['M1 $\\frac{0.019}{0.0582}$', 'A1 0.326'],
          steps: [
            { say: 'Use the conditional probability formula.', show: '$P(C \\mid +) = \\dfrac{P(C \\cap +)}{P(+)}$' },
            { say: 'Substitute.', show: '$= \\dfrac{0.019}{0.0582}$' },
            { say: 'So only about a third of positives actually have the condition.', show: '$= 0.326$' }] },
        {
          l: 'i',
          marks: 1,
          q: 'Comment on an assumption made in using these figures for a person chosen from a hospital waiting room.',
          answer: 'The 2% rate may not apply: people in a waiting room are more likely to have the condition, so the prior probability would be higher',
          ms: ['B1 sensible critique of the 2% assumption'],
          steps: [
            { say: 'We assumed the person comes from the general population with a two per cent rate.', show: '$P(C) = 0.02$ assumed' },
            { say: 'People in a hospital waiting room are more likely to be ill.', show: 'higher prior probability' },
            { say: 'So P of C given positive would be larger.', show: 'model needs a more realistic $P(C)$' }] }] },
    {
      n: 6,
      section: 'B',
      points: ['m4_norm', 'm4_inorm', 'm4_choose'],
      q: 'The masses of bags of flour are normally distributed with mean 500 g and standard deviation 8 g.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find the probability that a randomly chosen bag has mass less than 510 g.',
          answer: '$0.894$',
          ms: ['M1 standardises: $z = 1.25$', 'A1 0.894'],
          steps: [
            { say: 'Standardise.', show: '$z = \\dfrac{510 - 500}{8} = 1.25$' },
            { say: 'Look up Phi of one point two five.', show: '$P(X < 510) = \\Phi(1.25)$' },
            { say: 'This is about nought point eight nine four.', show: '$= 0.8944$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Find the probability that a randomly chosen bag has mass between 490 g and 505 g.',
          answer: '$0.628$',
          ms: ['M1 standardises both: $-1.25$ and $0.625$', 'M1 $\\Phi(0.625) - \\Phi(-1.25)$', 'A1 0.628'],
          steps: [
            { say: 'Standardise both values.', show: '$z_1 = \\dfrac{490 - 500}{8} = -1.25,\\quad z_2 = \\dfrac{505 - 500}{8} = 0.625$' },
            { say: 'Subtract the cumulative probabilities.', show: '$\\Phi(0.625) - \\Phi(-1.25) = 0.7340 - 0.1056$' },
            { say: 'Evaluate.', show: '$= 0.628$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the mass $m$ such that 5% of bags have mass greater than $m$.',
          answer: '$513.2$ g',
          ms: ['B1 $z = 1.6449$', 'M1 $\\frac{m - 500}{8} = 1.6449$', 'A1 513.2 g'],
          steps: [
            { say: 'Five per cent above means ninety five per cent below.', show: '$P(Z < z) = 0.95 \\Rightarrow z = 1.6449$' },
            { say: 'Undo the standardisation.', show: '$m = 500 + 1.6449 \\times 8$' },
            { say: 'Evaluate.', show: '$m = 513.2$ g' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Three bags are chosen at random. Find the probability that all three have mass less than 510 g.',
          answer: '$0.715$',
          ms: ['M1 $0.8944^3$', 'A1 0.715'],
          steps: [
            { say: 'The bags are independent.', show: '$P(\\text{all three}) = P(X < 510)^3$' },
            { say: 'Cube the answer to part a.', show: '$0.8944^3$' },
            { say: 'Evaluate.', show: '$= 0.715$' }] },
        {
          l: 'e',
          marks: 3,
          q: 'The times taken by a machine to fill a bag are normally distributed with standard deviation 4 seconds. 90% of bags take less than 30 seconds. Find the mean time.',
          answer: '$24.9$ s',
          ms: ['B1 $z = 1.2816$', 'M1 $\\frac{30 - \\mu}{4} = 1.2816$', 'A1 24.9 s'],
          steps: [
            { say: 'Ninety per cent below thirty seconds.', show: '$P(Z < z) = 0.9 \\Rightarrow z = 1.2816$' },
            { say: 'Set up the standardised equation.', show: '$\\dfrac{30 - \\mu}{4} = 1.2816$' },
            { say: 'Solve.', show: '$\\mu = 30 - 5.126 = 24.9$ s' }] },
        {
          l: 'f',
          marks: 2,
          q: 'The number of underweight bags in a box of 20 is to be modelled by a binomial distribution. State two conditions needed for this model to be appropriate.',
          answer: 'Bags are underweight independently of each other; the probability of being underweight is the same for every bag (with a fixed number, 20, of trials)',
          ms: ['B1 independence', 'B1 constant probability'],
          steps: [
            { say: 'A binomial model needs a fixed number of trials, here twenty bags.', show: '$n = 20$ fixed' },
            { say: 'Each bag must be underweight independently of the others.', show: 'independent trials' },
            { say: 'And the probability of being underweight must be the same for every bag.', show: 'constant $p$' }] },
        {
          l: 'g',
          marks: 1,
          q: 'Explain why a normal distribution would not be a suitable model for the number of children in a family.',
          answer: 'It is a small discrete count, skewed, and cannot be negative',
          ms: ['B1 sensible reason (discrete / skewed / small values)'],
          steps: [
            { say: 'The normal distribution is continuous and symmetric.', show: 'normal: continuous, symmetric' },
            { say: 'The number of children is a small whole number and the distribution is skewed to the right.', show: 'discrete, skewed' },
            { say: 'So a normal model is not suitable.', show: 'not appropriate' }] }] },
    {
      n: 7,
      section: 'B',
      points: ['m4_btest', 'm4_lang'],
      q: 'A café owner claims that 30% of customers buy a dessert. After a new menu is introduced, 10 out of a random sample of 20 customers buy a dessert.',
      parts: [
        {
          l: 'a',
          marks: 7,
          q: 'Test, at the 5% level of significance, whether there is evidence that the proportion of customers buying a dessert has increased.',
          answer: '$P(X \\geq 10) = 0.0480 < 0.05$: reject $H_0$; there is evidence the proportion has increased',
          ms: [
            'B1 $H_0: p = 0.3$',
            'B1 $H_1: p > 0.3$',
            'B1 $X \\sim B(20, 0.3)$',
            'M1 $P(X \\geq 10) = 1 - P(X \\leq 9)$',
            'A1 0.0480',
            'M1 compares with 0.05',
            'A1 reject $H_0$, conclusion in context'],
          steps: [
            { say: 'State the hypotheses. We are looking for an increase, so it is one tailed.', show: '$H_0: p = 0.3, \\quad H_1: p > 0.3$' },
            { say: 'Under the null hypothesis the number buying a dessert is binomial.', show: '$X \\sim B(20, 0.3)$' },
            { say: 'Find the probability of a result at least as extreme as ten.', show: '$P(X \\geq 10) = 1 - P(X \\leq 9) = 1 - 0.9520$' },
            { say: 'This is nought point nought four eight.', show: '$= 0.0480$' },
            { say: 'It is less than five per cent, so reject the null hypothesis.', show: '$0.0480 < 0.05 \\Rightarrow$ reject $H_0$' },
            { say: 'Conclude in context.', show: 'evidence that the proportion buying dessert has increased' }] },
        {
          l: 'b',
          marks: 1,
          q: 'Explain what is meant by a 5% significance level in this test.',
          answer: 'The probability of concluding that the proportion has increased when it is actually still 30% is (at most) 0.05',
          ms: ['B1 probability of incorrectly rejecting $H_0$, in context'],
          steps: [
            { say: 'The significance level is the probability of rejecting the null hypothesis when it is true.', show: '$P(\\text{reject } H_0 \\mid H_0 \\text{ true})$' },
            { say: 'Here that means wrongly concluding that more customers buy dessert.', show: 'in context' },
            { say: 'That risk is at most five per cent.', show: '$\\leq 0.05$' }] }] },
    {
      n: 8,
      section: 'B',
      points: ['m4_ntest', 'm4_ctest', 'm4_lang'],
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'A machine fills bottles with volumes normally distributed with mean 330 ml and standard deviation 6 ml. After a service, a random sample of 36 bottles has mean volume 328.1 ml. Assuming the standard deviation is unchanged, test at the 5% level whether the mean volume has changed.',
          answer: '$z = -1.9$; $|z| < 1.96$: do not reject $H_0$; no evidence the mean has changed',
          ms: [
            'B1 $H_0: \\mu = 330,\\ H_1: \\mu \\neq 330$',
            'B1 $\\bar X \\sim N(330, \\frac{6^2}{36})$',
            'M1 $z = \\frac{328.1 - 330}{6/\\sqrt{36}}$',
            'A1 $z = -1.9$',
            'M1 compares with $\\pm 1.96$',
            'A1 do not reject $H_0$, in context'],
          steps: [
            { say: 'Changed means either direction, so it is two tailed.', show: '$H_0: \\mu = 330, \\quad H_1: \\mu \\neq 330$' },
            { say: 'The sample mean has standard deviation six over root thirty six, which is one.', show: '$\\bar X \\sim N\\left(330, 1^2\\right)$' },
            { say: 'Calculate the test statistic.', show: '$z = \\dfrac{328.1 - 330}{1} = -1.9$' },
            { say: 'The critical values for a two-tailed five per cent test are plus and minus one point nine six.', show: '$-1.96 < -1.9 < 1.96$' },
            { say: 'So we do not reject the null hypothesis: no evidence that the mean volume has changed.', show: 'do not reject $H_0$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'For a random sample of 12 days, the product moment correlation coefficient between daily temperature and ice-cream sales is $r = 0.62$. The critical value for a 1-tailed test at the 5% level with $n = 12$ is 0.4973. Test whether there is evidence of positive correlation.',
          answer: '$0.62 > 0.4973$: reject $H_0$; evidence of positive correlation',
          ms: [
            'B1 $H_0: \\rho = 0,\\ H_1: \\rho > 0$',
            'M1 compares 0.62 with 0.4973',
            'A1 reject $H_0$',
            'A1 conclusion in context'],
          steps: [
            { say: 'Set up the hypotheses about the population correlation rho.', show: '$H_0: \\rho = 0, \\quad H_1: \\rho > 0$' },
            { say: 'Compare the sample value with the critical value.', show: '$0.62 > 0.4973$' },
            { say: 'It lies in the critical region, so reject the null hypothesis.', show: 'reject $H_0$' },
            { say: 'There is evidence that higher temperatures go with higher ice-cream sales.', show: 'evidence of positive correlation' }] }] }] });

BCSP.add({
  id: 'm4-medium',
  unit: 'm4',
  level: 'medium',
  title: 'Maths A2 2 · Paper B (Medium)',
  minutes: 90,
  calc: true,
  sections: [
    {
      id: 'A',
      title: 'Mechanics',
      marks: 50 },
    {
      id: 'B',
      title: 'Statistics',
      marks: 50 }],
  questions: [
    {
      n: 1,
      section: 'A',
      points: ['m4_cal1'],
      q: 'A particle moves in a straight line. At time $t$ seconds its acceleration is $(6 - 2t)$ m s⁻². When $t = 0$ the particle is at $O$ with velocity $-5$ m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find an expression for the velocity at time $t$.',
          answer: '$v = -t^2 + 6t - 5$',
          ms: ['M1 integrates $a$', 'A1 $v = 6t - t^2 - 5$'],
          steps: [
            { say: 'Velocity is the integral of acceleration.', show: '$v = \\displaystyle\\int(6 - 2t)\\,dt = 6t - t^2 + c$' },
            { say: 'Use v equals minus five at t equals nought.', show: '$c = -5$' },
            { say: 'So the velocity is', show: '$v = -t^2 + 6t - 5$' }] },
        {
          l: 'b',
          marks: 1,
          q: 'Find the times when the particle is at rest.',
          answer: '$t = 1$ and $t = 5$',
          ms: ['B1 $t = 1,\\ 5$'],
          steps: [
            { say: 'Set v to zero.', show: '$t^2 - 6t + 5 = 0$' },
            { say: 'Factorise.', show: '$(t - 1)(t - 5) = 0$' },
            { say: 'At rest at one and five seconds.', show: '$t = 1,\\ 5$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find the greatest speed of the particle for $0 \\leq t \\leq 5$.',
          answer: '$5$ m s⁻¹ (at $t = 0$)',
          ms: ['M1 considers maximum $v = 4$ at $t = 3$ and endpoint $v(0) = -5$', 'A1 5 m s⁻¹'],
          steps: [
            { say: 'Velocity is greatest when acceleration is zero, at t equals three, giving four.', show: '$v(3) = -9 + 18 - 5 = 4$' },
            { say: 'But speed is the size of velocity, so also check the endpoints: at t equals nought the velocity is minus five.', show: '$v(0) = -5,\\ v(5) = 0$' },
            { say: 'The greatest speed is five metres per second.', show: '$5$ m s⁻¹ at $t = 0$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Find the total distance travelled by the particle in the first 5 seconds.',
          answer: '$13$ m',
          ms: [
            'M1 integrates $v$: $s = -\\frac{t^3}{3} + 3t^2 - 5t$',
            'M1 splits at $t = 1$',
            'A1 $s(1) = -\\frac73,\\ s(5) = \\frac{25}3$',
            'A1 13 m'],
          steps: [
            { say: 'Integrate velocity; it starts at O so there is no constant.', show: '$s = -\\tfrac{t^3}{3} + 3t^2 - 5t$' },
            { say: 'It changes direction at t equals one, so find the positions there and at five.', show: '$s(1) = -\\tfrac73, \\quad s(5) = -\\tfrac{125}{3} + 75 - 25 = \\tfrac{25}{3}$' },
            { say: 'First stage: seven thirds. Second stage: from minus seven thirds to twenty five thirds, which is thirty two thirds.', show: '$\\tfrac73 + \\tfrac{32}{3}$' },
            { say: 'Total distance is thirteen metres.', show: '$13$ m' }] }] },
    {
      n: 2,
      section: 'A',
      points: ['m4_cal2'],
      q: 'A particle of mass 0.5 kg moves in a horizontal plane. At time $t$ seconds its acceleration is $(6t\\,\\mathbf i - 4\\,\\mathbf j)$ m s⁻². When $t = 0$ it is at the origin $O$ with velocity $(2\\,\\mathbf i + 8\\,\\mathbf j)$ m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find the velocity of the particle at time $t$.',
          answer: '$\\mathbf v = (3t^2 + 2)\\,\\mathbf i + (8 - 4t)\\,\\mathbf j$',
          ms: [
            'M1 integrates $\\mathbf a$',
            'M1 adds initial velocity',
            'A1 $(3t^2 + 2)\\mathbf i + (8 - 4t)\\mathbf j$'],
          steps: [
            { say: 'Integrate each component.', show: '$\\mathbf v = 3t^2\\,\\mathbf i - 4t\\,\\mathbf j + \\mathbf c$' },
            { say: 'At t equals nought the velocity is two i plus eight j.', show: '$\\mathbf c = 2\\mathbf i + 8\\mathbf j$' },
            { say: 'Combine.', show: '$\\mathbf v = (3t^2 + 2)\\,\\mathbf i + (8 - 4t)\\,\\mathbf j$' }] },
        {
          l: 'b',
          marks: 1,
          q: 'Find the value of $t$ when the particle is moving parallel to $\\mathbf i$.',
          answer: '$t = 2$',
          ms: ['B1 $8 - 4t = 0 \\Rightarrow t = 2$'],
          steps: [
            { say: 'Parallel to i means the j component is zero.', show: '$8 - 4t = 0$' },
            { say: 'Solve.', show: '$t = 2$' },
            { say: 'The i component is then fourteen, which is non-zero.', show: '$\\mathbf v = 14\\mathbf i$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Find the distance of the particle from $O$ at this time.',
          answer: '$14.4$ m',
          ms: [
            'M1 integrates $\\mathbf v$',
            'A1 $\\mathbf r = (t^3 + 2t)\\mathbf i + (8t - 2t^2)\\mathbf j$',
            'A1 $\\mathbf r = 12\\mathbf i + 8\\mathbf j$',
            'A1 14.4 m'],
          steps: [
            { say: 'Integrate velocity. It starts at O so there is no constant.', show: '$\\mathbf r = (t^3 + 2t)\\,\\mathbf i + (8t - 2t^2)\\,\\mathbf j$' },
            { say: 'Substitute t equals two.', show: '$\\mathbf r = 12\\mathbf i + 8\\mathbf j$' },
            { say: 'Find the magnitude.', show: '$|\\mathbf r| = \\sqrt{144 + 64} = 14.4$ m' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find the magnitude of the resultant force on the particle when $t = 2$.',
          answer: '$6.32$ N',
          ms: ['M1 $0.5(12\\mathbf i - 4\\mathbf j)$', 'A1 6.32 N'],
          steps: [
            { say: 'At t equals two the acceleration is twelve i minus four j.', show: '$\\mathbf a = 12\\mathbf i - 4\\mathbf j$' },
            { say: 'Multiply by the mass.', show: '$\\mathbf F = 0.5\\mathbf a = 6\\mathbf i - 2\\mathbf j$' },
            { say: 'Magnitude.', show: '$|\\mathbf F| = \\sqrt{40} = 6.32$ N' }] }] },
    {
      n: 3,
      section: 'A',
      points: ['m4_proj'],
      q: 'A stone is thrown from the top of a vertical cliff, 40 m above the sea, with speed 25 m s⁻¹ at $35^\\circ$ above the horizontal. Take $g = 9.8$ m s⁻².',
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'Find the time taken for the stone to reach the sea.',
          answer: '$4.67$ s',
          ms: [
            'M1 vertical suvat with $s = -40$',
            'A1 $-40 = 25\\sin 35^\\circ t - 4.9t^2$',
            'M1 solves quadratic',
            'A1 4.67 s'],
          steps: [
            { say: 'Take upwards as positive. The stone ends forty metres below the start.', show: '$s_y = -40,\\ u_y = 25\\sin 35^\\circ = 14.34$' },
            { say: 'Use s equals u t plus a half a t squared.', show: '$-40 = 14.34t - 4.9t^2$' },
            { say: 'Rearrange and solve, taking the positive root.', show: '$4.9t^2 - 14.34t - 40 = 0 \\Rightarrow t = 4.67$ s' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the horizontal distance from the foot of the cliff to where the stone enters the sea.',
          answer: '$95.7$ m',
          ms: ['M1 $25\\cos 35^\\circ \\times 4.67$', 'A1 95.7 m'],
          steps: [
            { say: 'Horizontal velocity is constant.', show: '$u_x = 25\\cos 35^\\circ = 20.48$' },
            { say: 'Multiply by the time.', show: '$x = 20.48 \\times 4.673$' },
            { say: 'So the distance is ninety five point seven metres.', show: '$95.7$ m' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the speed of the stone as it enters the sea.',
          answer: '$37.5$ m s⁻¹',
          ms: ['M1 $v_y = 14.34 - 9.8(4.67)$', 'A1 $v_y = -31.5$', 'A1 37.5 m s⁻¹'],
          steps: [
            { say: 'Find the vertical velocity at impact.', show: '$v_y = 14.34 - 9.8 \\times 4.673 = -31.46$' },
            { say: 'Horizontal velocity is still twenty point four eight.', show: '$v_x = 20.48$' },
            { say: 'Combine.', show: '$v = \\sqrt{20.48^2 + 31.46^2} = 37.5$ m s⁻¹' }] },
        {
          l: 'd',
          marks: 1,
          q: 'State one assumption made in your model.',
          answer: 'e.g. air resistance is negligible; the stone is a particle',
          ms: ['B1 any valid assumption'],
          steps: [
            { say: 'We ignored air resistance.', show: 'no air resistance' },
            { say: 'We also treated the stone as a particle, with no spin.', show: 'particle model' },
            { say: 'Either assumption earns the mark.', show: 'B1' }] }] },
    {
      n: 4,
      section: 'A',
      points: ['m4_ladder', 'm4_mom'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'A uniform ladder of length 6 m and weight 150 N rests against a smooth vertical wall with its foot on rough horizontal ground, where the coefficient of friction is 0.4. The ladder makes an angle $\\theta$ with the ground, where $\\tan\\theta = 2$. A man of weight 750 N climbs the ladder. Find the normal reaction at the ground and the maximum possible friction force.',
          answer: '$R = 900$ N, $F_{\\max} = 360$ N',
          ms: ['B1 $R = 900$', 'B1 $F_{\\max} = 0.4 \\times 900 = 360$'],
          steps: [
            { say: 'Resolve vertically: the wall is smooth, so the ground supports both weights.', show: '$R = 150 + 750 = 900$ N' },
            { say: 'Maximum friction is mu R.', show: '$F_{\\max} = 0.4 \\times 900$' },
            { say: 'This is three hundred and sixty newtons.', show: '$F_{\\max} = 360$ N' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Find how far up the ladder the man can climb before the ladder slips.',
          answer: '$5.16$ m',
          ms: [
            'M1 resolves horizontally: $S = F = 360$',
            'M1 moments about the foot',
            'A1 $360 \\times 6\\sin\\theta = 150 \\times 3\\cos\\theta + 750x\\cos\\theta$',
            'M1 divides by $\\cos\\theta$, uses $\\tan\\theta = 2$',
            'A1 5.16 m'],
          steps: [
            { say: 'On the point of slipping, friction is limiting and equals the wall reaction.', show: '$S = F = 360$ N' },
            { say: 'Take moments about the foot, with the man x metres up.', show: '$S \\times 6\\sin\\theta = 150 \\times 3\\cos\\theta + 750 \\times x\\cos\\theta$' },
            { say: 'Divide by cos theta and use tan theta equals two.', show: '$360 \\times 6 \\times 2 = 450 + 750x$' },
            { say: 'Solve.', show: '$4320 = 450 + 750x \\Rightarrow x = 5.16$ m' }] },
        {
          l: 'c',
          marks: 3,
          q: 'A uniform rod $AB$ of length 4 m and weight 60 N is freely hinged to a vertical wall at $A$ and held horizontal by a light string attached to $B$ and to a point on the wall above $A$. The string makes an angle of $30^\\circ$ with the rod. A load of 40 N hangs from $B$. Find the tension in the string.',
          answer: '$140$ N',
          ms: ['M1 moments about $A$', 'A1 $4T\\sin 30^\\circ = 60(2) + 40(4)$', 'A1 140 N'],
          steps: [
            { say: 'Take moments about the hinge, so the hinge force has no moment.', show: '$T\\sin 30^\\circ \\times 4 = 60 \\times 2 + 40 \\times 4$' },
            { say: 'The right side is two hundred and eighty.', show: '$2T = 280$' },
            { say: 'So the tension is one hundred and forty newtons.', show: '$T = 140$ N' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Find the magnitude of the force exerted by the hinge on the rod.',
          answer: '$125$ N',
          ms: [
            'M1 horizontal: $H = 140\\cos 30^\\circ$',
            'M1 vertical: $V + 140\\sin 30^\\circ = 100$',
            'A1 $H = 121.2,\\ V = 30$',
            'A1 125 N'],
          steps: [
            { say: 'Resolve horizontally: the hinge balances the horizontal part of the tension.', show: '$H = 140\\cos 30^\\circ = 121.2$ N' },
            { say: 'Resolve vertically.', show: '$V + 70 = 100 \\Rightarrow V = 30$ N' },
            { say: 'Combine the components.', show: '$|\\mathbf R| = \\sqrt{121.2^2 + 30^2} = 125$ N' }] }] },
    {
      n: 5,
      section: 'A',
      points: ['m4_imp'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'A particle $P$ of mass 3 kg moving at 4 m s⁻¹ collides directly with a particle $Q$ of mass 2 kg at rest. After the collision both move in the same direction and the speed of $Q$ is twice the speed of $P$. Find the speeds of $P$ and $Q$ after the collision.',
          answer: '$P$: $\\tfrac{12}{7} = 1.71$ m s⁻¹, $Q$: $\\tfrac{24}{7} = 3.43$ m s⁻¹',
          ms: ['M1 conservation of momentum', 'A1 $12 = 3v + 4v$', 'A1 $\\frac{12}7,\\ \\frac{24}7$'],
          steps: [
            { say: 'Let P\'s speed after be v, so Q\'s is two v.', show: '$P: v,\\quad Q: 2v$' },
            { say: 'Momentum before equals momentum after.', show: '$3(4) = 3v + 2(2v)$' },
            { say: 'Solve.', show: '$12 = 7v \\Rightarrow v = \\tfrac{12}{7} = 1.71,\\ 2v = \\tfrac{24}7 = 3.43$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the magnitude of the impulse exerted by $P$ on $Q$.',
          answer: '$\\tfrac{48}{7} = 6.86$ N s',
          ms: ['M1 $2 \\times \\frac{24}{7} - 0$', 'A1 6.86 N s'],
          steps: [
            { say: 'Impulse on Q is the change in Q\'s momentum.', show: '$I = m(v - u)$' },
            { say: 'Q started at rest.', show: '$I = 2 \\times \\tfrac{24}{7} - 0$' },
            { say: 'Evaluate.', show: '$I = \\tfrac{48}{7} = 6.86$ N s' }] },
        {
          l: 'c',
          marks: 2,
          q: 'A shell of mass 5 kg moving at 20 m s⁻¹ explodes into two parts of mass 2 kg and 3 kg. Immediately after the explosion the 2 kg part moves at 50 m s⁻¹ in the original direction. Find the velocity of the 3 kg part.',
          answer: '$0$ m s⁻¹ (it is momentarily at rest)',
          ms: ['M1 $5(20) = 2(50) + 3v$', 'A1 $v = 0$'],
          steps: [
            { say: 'Momentum is conserved in an explosion.', show: '$5 \\times 20 = 2 \\times 50 + 3v$' },
            { say: 'Both sides start with one hundred.', show: '$100 = 100 + 3v$' },
            { say: 'So the three kilogram part is momentarily at rest.', show: '$v = 0$' }] }] },
    {
      n: 6,
      section: 'B',
      points: ['m4_cond', 'm4_pmod'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'On any day, the probability of rain is 0.3. If it rains, the probability that Ana\'s bus is late is 0.4; if it does not rain, the probability is 0.1. Find the probability that the bus is late on a given day.',
          answer: '$0.19$',
          ms: ['M1 $0.3(0.4) + 0.7(0.1)$', 'A1 0.19'],
          steps: [
            { say: 'Draw a tree: rain or not, then late or not.', show: '$P(R) = 0.3,\\ P(L \\mid R) = 0.4,\\ P(L \\mid R\') = 0.1$' },
            { say: 'Add the two late branches.', show: '$0.3 \\times 0.4 + 0.7 \\times 0.1$' },
            { say: 'Evaluate.', show: '$0.12 + 0.07 = 0.19$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Given that the bus is late, find the probability that it rained.',
          answer: '$0.632$',
          ms: ['M1 $\\frac{0.12}{0.19}$', 'A1 0.632'],
          steps: [
            { say: 'Use the conditional probability formula.', show: '$P(R \\mid L) = \\dfrac{P(R \\cap L)}{P(L)}$' },
            { say: 'Substitute.', show: '$= \\dfrac{0.12}{0.19}$' },
            { say: 'Evaluate.', show: '$= 0.632$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find the probability that, on two days, the bus is late on exactly one of them.',
          answer: '$0.308$',
          ms: ['M1 $2 \\times 0.19 \\times 0.81$', 'A1 0.308'],
          steps: [
            { say: 'Late then on time, or on time then late.', show: '$0.19 \\times 0.81 + 0.81 \\times 0.19$' },
            { say: 'That is twice the product.', show: '$2 \\times 0.19 \\times 0.81$' },
            { say: 'Evaluate.', show: '$= 0.308$' }] },
        {
          l: 'd',
          marks: 1,
          q: 'Comment on an assumption made in part (c).',
          answer: 'That the two days are independent; rain on consecutive days is not independent, so this may be unrealistic',
          ms: ['B1 independence of days, with comment'],
          steps: [
            { say: 'We multiplied probabilities for the two days.', show: 'assumed independence' },
            { say: 'But weather on consecutive days tends to be similar.', show: 'rain days cluster' },
            { say: 'So the assumption may not be realistic.', show: 'critique' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Events $A$ and $B$ are such that $P(A) = 0.45$, $P(B) = 0.35$ and $P(A \\mid B) = 0.4$. Find $P(A \\cap B)$.',
          answer: '$0.14$',
          ms: ['B1 0.14'],
          steps: [
            { say: 'Use the multiplication rule.', show: '$P(A \\cap B) = P(B)\\,P(A \\mid B)$' },
            { say: 'Substitute.', show: '$= 0.35 \\times 0.4$' },
            { say: 'Evaluate.', show: '$= 0.14$' }] },
        {
          l: 'f',
          marks: 1,
          q: 'Find $P(A \\cup B)$.',
          answer: '$0.66$',
          ms: ['B1 0.66'],
          steps: [
            { say: 'Use the addition rule.', show: '$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$' },
            { say: 'Substitute.', show: '$= 0.45 + 0.35 - 0.14$' },
            { say: 'Evaluate.', show: '$= 0.66$' }] },
        {
          l: 'g',
          marks: 2,
          q: 'Find $P(B \\mid A\')$.',
          answer: '$0.382$',
          ms: ['M1 $\\frac{P(B \\cap A\')}{P(A\')} = \\frac{0.21}{0.55}$', 'A1 0.382'],
          steps: [
            { say: 'The part of B outside A is P of B minus the overlap.', show: '$P(B \\cap A\') = 0.35 - 0.14 = 0.21$' },
            { say: 'P of not A is nought point five five.', show: '$P(A\') = 0.55$' },
            { say: 'Divide.', show: '$P(B \\mid A\') = \\dfrac{0.21}{0.55} = 0.382$' }] },
        {
          l: 'h',
          marks: 1,
          q: 'State, with a reason, whether $A$ and $B$ are independent.',
          answer: 'Not independent, since $P(A \\mid B) = 0.4 \\neq P(A) = 0.45$',
          ms: ['B1 not independent with reason'],
          steps: [
            { say: 'For independence, knowing B should not change the probability of A.', show: 'need $P(A \\mid B) = P(A)$' },
            { say: 'Compare.', show: '$0.4 \\neq 0.45$' },
            { say: 'So they are not independent.', show: 'not independent' }] }] },
    {
      n: 7,
      section: 'B',
      points: ['m4_inorm', 'm4_norm', 'm4_choose'],
      q: 'The lifetimes, $X$ hours, of a type of bulb are normally distributed. 10% of bulbs last less than 800 hours and 25% last more than 1100 hours.',
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'Find the mean and standard deviation of $X$.',
          answer: '$\\mu = 997,\\ \\sigma = 153$ (3 s.f.)',
          ms: [
            'B1 $z = -1.2816$',
            'B1 $z = 0.6745$',
            'M1 $\\frac{800 - \\mu}{\\sigma} = -1.2816$',
            'M1 $\\frac{1100 - \\mu}{\\sigma} = 0.6745$',
            'A1 $\\sigma = 153.4$',
            'A1 $\\mu = 996.6$'],
          steps: [
            { say: 'Ten per cent below eight hundred gives a negative z value.', show: '$\\Phi^{-1}(0.1) = -1.2816$' },
            { say: 'Twenty five per cent above eleven hundred means seventy five per cent below.', show: '$\\Phi^{-1}(0.75) = 0.6745$' },
            { say: 'Write two equations.', show: '$800 = \\mu - 1.2816\\sigma, \\qquad 1100 = \\mu + 0.6745\\sigma$' },
            { say: 'Subtract to find sigma.', show: '$300 = 1.9561\\sigma \\Rightarrow \\sigma = 153.4$' },
            { say: 'Substitute back.', show: '$\\mu = 800 + 1.2816 \\times 153.4 = 996.6$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the probability that a randomly chosen bulb lasts more than 1000 hours.',
          answer: '$0.491$',
          ms: ['M1 standardises', 'A1 0.491'],
          steps: [
            { say: 'Standardise.', show: '$z = \\dfrac{1000 - 996.6}{153.4} = 0.022$' },
            { say: 'Subtract from one.', show: '$P(X > 1000) = 1 - \\Phi(0.022)$' },
            { say: 'Evaluate.', show: '$= 0.491$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find $P(900 < X < 1100)$.',
          answer: '$0.485$',
          ms: ['M1 standardises both', 'A1 0.485'],
          steps: [
            { say: 'Standardise both limits.', show: '$z_1 = -0.630,\\quad z_2 = 0.674$' },
            { say: 'Subtract the cumulative probabilities.', show: '$\\Phi(0.674) - \\Phi(-0.630) = 0.75 - 0.264$' },
            { say: 'Evaluate.', show: '$= 0.485$' }] },
        {
          l: 'd',
          marks: 3,
          q: 'A box contains 15 of these bulbs. Stating a suitable distribution, find the probability that at least 8 of them last more than 1000 hours.',
          answer: '$Y \\sim B(15, 0.491)$; $P(Y \\geq 8) = 0.472$',
          ms: ['B1 $B(15, 0.491)$ with independence assumed', 'M1 $1 - P(Y \\leq 7)$', 'A1 0.472'],
          steps: [
            { say: 'Each bulb either lasts over a thousand hours or not, independently, with the same probability.', show: '$Y \\sim B(15, 0.491)$' },
            { say: 'At least eight is one minus at most seven.', show: '$P(Y \\geq 8) = 1 - P(Y \\leq 7)$' },
            { say: 'Use the calculator\'s binomial function.', show: '$= 0.472$' }] }] },
    {
      n: 8,
      section: 'B',
      points: ['m4_btest', 'm4_lang'],
      q: 'A player suspects a die is biased. She will roll it 60 times and record the number of sixes, $X$. She will carry out a two-tailed test at the 5% level of significance, with approximately 2.5% in each tail.',
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'State suitable hypotheses.',
          answer: '$H_0: p = \\tfrac16,\\ H_1: p \\neq \\tfrac16$',
          ms: ['B1 both hypotheses'],
          steps: [
            { say: 'The parameter is p, the probability of a six.', show: '$p = P(\\text{six})$' },
            { say: 'A fair die has p equal to one sixth.', show: '$H_0: p = \\tfrac16$' },
            { say: 'Biased either way means not equal.', show: '$H_1: p \\neq \\tfrac16$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Find the critical region for the test.',
          answer: '$X \\leq 4$ or $X \\geq 17$',
          ms: [
            'B1 $X \\sim B(60, \\frac16)$',
            'M1 lower tail: $P(X \\leq 4) = 0.0202,\\ P(X \\leq 5) = 0.0512$',
            'M1 upper tail: $P(X \\geq 17) = 0.0164,\\ P(X \\geq 16) = 0.0338$',
            'A1 $X \\leq 4$ or $X \\geq 17$'],
          steps: [
            { say: 'Under the null hypothesis the number of sixes is binomial.', show: '$X \\sim B(60, \\tfrac16)$' },
            { say: 'Lower tail: find the largest value with probability at most two point five per cent.', show: '$P(X \\leq 4) = 0.0202,\\quad P(X \\leq 5) = 0.0512$' },
            { say: 'Upper tail: find the smallest value with probability at most two point five per cent.', show: '$P(X \\geq 16) = 0.0338,\\quad P(X \\geq 17) = 0.0164$' },
            { say: 'So the critical region is', show: '$X \\leq 4 \\ \\text{or}\\ X \\geq 17$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find the actual significance level of the test.',
          answer: '$0.0366$ (3.66%)',
          ms: ['M1 $0.0202 + 0.0164$', 'A1 0.0366'],
          steps: [
            { say: 'The actual significance level is the probability of landing in the critical region when the null is true.', show: '$P(X \\leq 4) + P(X \\geq 17)$' },
            { say: 'Add the two tails.', show: '$0.0202 + 0.0164$' },
            { say: 'Evaluate.', show: '$= 0.0366$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'She rolls 15 sixes. State, in context, the conclusion of the test.',
          answer: '15 is not in the critical region: do not reject $H_0$; no evidence the die is biased',
          ms: ['M1 15 not in critical region', 'A1 conclusion in context'],
          steps: [
            { say: 'Check whether fifteen is in the critical region.', show: '$4 < 15 < 17$' },
            { say: 'It is not, so do not reject the null hypothesis.', show: 'do not reject $H_0$' },
            { say: 'There is insufficient evidence that the die is biased.', show: 'no evidence of bias' }] },
        {
          l: 'e',
          marks: 2,
          q: 'Explain why the conclusion of a hypothesis test can never be certain.',
          answer: 'The test uses a sample to make an inference about the population; even a fair die can give an extreme result, so there is always a probability (the significance level) of wrongly rejecting $H_0$',
          ms: [
            'B1 sample used to infer about the population',
            'B1 reference to probability of incorrectly rejecting $H_0$'],
          steps: [
            { say: 'We only see sixty rolls, a sample, not the die\'s long-run behaviour.', show: 'sample $\\to$ inference about population' },
            { say: 'A fair die can still give an unusual number of sixes.', show: 'extreme results possible under $H_0$' },
            { say: 'So there is a probability, here three point six six per cent, of wrongly rejecting the null hypothesis.', show: '$P(\\text{reject } H_0 \\mid H_0 \\text{ true}) = 0.0366$' }] }] },
    {
      n: 9,
      section: 'B',
      points: ['m4_ntest', 'm4_ctest', 'm4_lang'],
      parts: [
        {
          l: 'a',
          marks: 7,
          q: 'The time taken to complete a puzzle is normally distributed with standard deviation 2.5 minutes. It is claimed that the mean time is 12 minutes. After practice, a random sample of 25 people has mean time 11.1 minutes. Test, at the 1% level, whether the mean time has decreased.',
          answer: '$z = -1.8 > -2.3263$: do not reject $H_0$; no evidence at 1% that the mean has decreased',
          ms: [
            'B1 $H_0: \\mu = 12,\\ H_1: \\mu < 12$',
            'B1 $\\bar X \\sim N(12, 0.5^2)$',
            'M1 $z = \\frac{11.1 - 12}{2.5/5}$',
            'A1 $-1.8$',
            'B1 critical value $-2.3263$',
            'M1 comparison',
            'A1 do not reject $H_0$, in context'],
          steps: [
            { say: 'Decreased means a one-tailed test.', show: '$H_0: \\mu = 12, \\quad H_1: \\mu < 12$' },
            { say: 'The sample mean has standard deviation two point five over root twenty five, which is nought point five.', show: '$\\bar X \\sim N(12, 0.5^2)$' },
            { say: 'Calculate the test statistic.', show: '$z = \\dfrac{11.1 - 12}{0.5} = -1.8$' },
            { say: 'The one per cent lower-tail critical value is minus two point three two six three.', show: '$-1.8 > -2.3263$' },
            { say: 'Not in the critical region, so do not reject the null.', show: 'do not reject $H_0$' },
            { say: 'There is not enough evidence at the one per cent level that practice reduces the mean time.', show: 'no evidence of a decrease' }] },
        {
          l: 'b',
          marks: 1,
          q: 'Find the $p$-value of the test statistic in (a).',
          answer: '$0.0359$',
          ms: ['B1 0.0359'],
          steps: [
            { say: 'The p value is the probability of a result this extreme under the null.', show: '$P(Z \\leq -1.8)$' },
            { say: 'Look it up.', show: '$= 1 - \\Phi(1.8)$' },
            { say: 'Evaluate.', show: '$= 0.0359$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'For a random sample of 20 cars, the product moment correlation coefficient between age and value is $r = -0.48$. The $p$-value for a one-tailed test of negative correlation is 0.016. Test, at the 5% level, whether there is evidence of negative correlation between age and value.',
          answer: '$0.016 < 0.05$: reject $H_0$; evidence of negative correlation',
          ms: [
            'B1 $H_0: \\rho = 0,\\ H_1: \\rho < 0$',
            'M1 compares 0.016 with 0.05',
            'A1 reject $H_0$',
            'A1 conclusion in context'],
          steps: [
            { say: 'Set up the hypotheses.', show: '$H_0: \\rho = 0, \\quad H_1: \\rho < 0$' },
            { say: 'Compare the p value with the significance level.', show: '$0.016 < 0.05$' },
            { say: 'Reject the null hypothesis.', show: 'reject $H_0$' },
            { say: 'There is evidence that older cars tend to have lower values.', show: 'evidence of negative correlation' }] },
        {
          l: 'd',
          marks: 2,
          q: 'State whether the conclusion would change at the 1% level, and explain why the result does not show that age causes the fall in value.',
          answer: 'Yes: $0.016 > 0.01$, so $H_0$ would not be rejected. Correlation does not imply causation (other factors such as mileage may be responsible)',
          ms: ['B1 would not reject at 1%', 'B1 correlation is not causation'],
          steps: [
            { say: 'At one per cent, nought point nought one six is bigger than nought point nought one.', show: '$0.016 > 0.01 \\Rightarrow$ do not reject $H_0$' },
            { say: 'So the conclusion would change.', show: 'conclusion changes' },
            { say: 'A correlation only shows an association; mileage or condition could be the real cause.', show: 'correlation $\\neq$ causation' }] }] }] });

BCSP.add({
  id: 'm4-hard',
  unit: 'm4',
  level: 'hard',
  title: 'Maths A2 2 · Paper C (Hard)',
  minutes: 90,
  calc: true,
  sections: [
    {
      id: 'A',
      title: 'Mechanics',
      marks: 50 },
    {
      id: 'B',
      title: 'Statistics',
      marks: 50 }],
  questions: [
    {
      n: 1,
      section: 'A',
      points: ['m4_cal1'],
      q: 'Two particles $P$ and $Q$ leave a point $O$ at the same time and move along the same straight line. At time $t$ seconds, the velocity of $P$ is $(t^2 - 5t + 4)$ m s⁻¹ and the velocity of $Q$ is $(2 - t)$ m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'Find the times when $P$ is instantaneously at rest.',
          answer: '$t = 1,\\ 4$',
          ms: ['B1 $t = 1,\\ 4$'],
          steps: [
            { say: 'Set P\'s velocity to zero.', show: '$t^2 - 5t + 4 = 0$' },
            { say: 'Factorise.', show: '$(t - 1)(t - 4) = 0$' },
            { say: 'So P is at rest at one and four seconds.', show: '$t = 1,\\ 4$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Find the total distance travelled by $P$ in the first 4 seconds.',
          answer: '$\\tfrac{19}{3} = 6.33$ m',
          ms: [
            'M1 $s_P = \\frac{t^3}3 - \\frac52t^2 + 4t$',
            'M1 splits at $t = 1$',
            'A1 $s(1) = \\frac{11}6,\\ s(4) = -\\frac83$',
            'A1 $\\frac{19}3$ m'],
          steps: [
            { say: 'Integrate P\'s velocity; it starts at O.', show: '$s_P = \\tfrac{t^3}{3} - \\tfrac52t^2 + 4t$' },
            { say: 'P turns round at t equals one, so find the positions at one and four.', show: '$s_P(1) = \\tfrac{11}{6}, \\quad s_P(4) = \\tfrac{64}{3} - 40 + 16 = -\\tfrac83$' },
            { say: 'First leg eleven sixths, second leg from eleven sixths down to minus eight thirds, which is twenty seven sixths.', show: '$\\tfrac{11}{6} + \\tfrac{27}{6} = \\tfrac{38}{6}$' },
            { say: 'Total distance.', show: '$\\tfrac{19}{3} \\approx 6.33$ m' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Find the exact times, after leaving $O$, at which $P$ and $Q$ are at the same position.',
          answer: '$t = 3 \\pm \\sqrt3$',
          ms: ['M1 $s_Q = 2t - \\frac{t^2}2$', 'M1 equates displacements', 'A1 $t^2 - 6t + 6 = 0$', 'A1 $3 \\pm \\sqrt3$'],
          steps: [
            { say: 'Integrate Q\'s velocity.', show: '$s_Q = 2t - \\tfrac{t^2}{2}$' },
            { say: 'Set the displacements equal.', show: '$\\tfrac{t^3}3 - \\tfrac52t^2 + 4t = 2t - \\tfrac12t^2$' },
            { say: 'Simplify and divide by t, which is not zero.', show: '$\\tfrac{t^3}{3} - 2t^2 + 2t = 0 \\Rightarrow t^2 - 6t + 6 = 0$' },
            { say: 'Use the quadratic formula.', show: '$t = 3 \\pm \\sqrt3 \\approx 1.27,\\ 4.73$' }] }] },
    {
      n: 2,
      section: 'A',
      points: ['m4_proj'],
      q: 'A ball is projected from a point $O$ on horizontal ground with speed 30 m s⁻¹ at an angle $\\alpha$ above the horizontal. It just clears the top of a wall of height 8 m, at a horizontal distance of 40 m from $O$. Take $g = 9.8$ m s⁻².',
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'Find the two possible values of $\\alpha$.',
          answer: '$\\alpha = 24.9^\\circ$ or $76.4^\\circ$',
          ms: [
            'M1 $t = \\frac{40}{30\\cos\\alpha}$',
            'M1 substitutes into vertical equation',
            'M1 uses $\\sec^2\\alpha = 1 + \\tan^2\\alpha$',
            'A1 $8.711\\tan^2\\alpha - 40\\tan\\alpha + 16.711 = 0$',
            'A1 $\\tan\\alpha = 0.4648$ or $4.127$',
            'A1 $24.9^\\circ,\\ 76.4^\\circ$'],
          steps: [
            { say: 'Horizontally, the time to reach the wall is forty over thirty cos alpha.', show: '$t = \\dfrac{40}{30\\cos\\alpha}$' },
            { say: 'Vertically, the height at that time is eight.', show: '$8 = 40\\tan\\alpha - \\dfrac{9.8 \\times 1600}{2 \\times 900}\\sec^2\\alpha$' },
            { say: 'Replace sec squared with one plus tan squared; the coefficient is eight point seven one one.', show: '$8 = 40\\tan\\alpha - 8.711(1 + \\tan^2\\alpha)$' },
            { say: 'Rearrange into a quadratic in tan alpha.', show: '$8.711\\tan^2\\alpha - 40\\tan\\alpha + 16.711 = 0$' },
            { say: 'Solve.', show: '$\\tan\\alpha = 0.4648 \\ \\text{or}\\ 4.127$' },
            { say: 'Take arctan.', show: '$\\alpha = 24.9^\\circ \\ \\text{or}\\ 76.4^\\circ$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'For the smaller value of $\\alpha$, find the speed of the ball as it passes over the wall.',
          answer: '$27.3$ m s⁻¹',
          ms: ['M1 $t = 1.470$', 'M1 $v_y = 30\\sin\\alpha - 9.8t$', 'A1 27.3 m s⁻¹'],
          steps: [
            { say: 'Find the time to reach the wall.', show: '$t = \\dfrac{40}{30\\cos 24.93^\\circ} = 1.470$ s' },
            { say: 'Find the components of velocity at that time.', show: '$v_x = 27.20, \\quad v_y = 12.64 - 9.8(1.470) = -1.76$' },
            { say: 'Combine.', show: '$v = \\sqrt{27.20^2 + 1.76^2} = 27.3$ m s⁻¹' }] }] },
    {
      n: 3,
      section: 'A',
      points: ['m4_cal2'],
      q: 'A particle of mass 2 kg moves in a horizontal plane under the action of a force $\\mathbf F = (6t\\,\\mathbf i - 4\\,\\mathbf j)$ N. At $t = 0$ it is at the origin with velocity $(-6\\,\\mathbf i + 8\\,\\mathbf j)$ m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find the velocity of the particle at time $t$.',
          answer: '$\\mathbf v = (1.5t^2 - 6)\\,\\mathbf i + (8 - 2t)\\,\\mathbf j$',
          ms: [
            'M1 $\\mathbf a = \\frac{\\mathbf F}{2} = 3t\\mathbf i - 2\\mathbf j$',
            'M1 integrates and adds initial velocity',
            'A1 correct $\\mathbf v$'],
          steps: [
            { say: 'Newton\'s second law gives the acceleration.', show: '$\\mathbf a = \\tfrac12\\mathbf F = 3t\\,\\mathbf i - 2\\,\\mathbf j$' },
            { say: 'Integrate.', show: '$\\mathbf v = 1.5t^2\\,\\mathbf i - 2t\\,\\mathbf j + \\mathbf c$' },
            { say: 'Use the initial velocity.', show: '$\\mathbf v = (1.5t^2 - 6)\\,\\mathbf i + (8 - 2t)\\,\\mathbf j$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the speed of the particle when it is moving parallel to $\\mathbf j$.',
          answer: '$4$ m s⁻¹',
          ms: ['M1 $1.5t^2 - 6 = 0 \\Rightarrow t = 2$', 'A1 4 m s⁻¹'],
          steps: [
            { say: 'Parallel to j means the i component is zero.', show: '$1.5t^2 = 6 \\Rightarrow t = 2$' },
            { say: 'Then the velocity is four j.', show: '$\\mathbf v = 4\\mathbf j$' },
            { say: 'So the speed is four.', show: '$4$ m s⁻¹' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Find the time at which the velocity of the particle is perpendicular to its initial velocity.',
          answer: '$t = 2.56$ s',
          ms: [
            'M1 scalar product with $(-6, 8)$ equals 0',
            'A1 $9t^2 + 16t - 100 = 0$',
            'M1 solves, choosing the positive root',
            'A1 2.56 s'],
          steps: [
            { say: 'Perpendicular vectors have zero scalar product.', show: '$-6(1.5t^2 - 6) + 8(8 - 2t) = 0$' },
            { say: 'Expand and simplify.', show: '$-9t^2 + 36 + 64 - 16t = 0 \\Rightarrow 9t^2 + 16t - 100 = 0$' },
            { say: 'Take the positive root.', show: '$t = \\dfrac{-16 + \\sqrt{3856}}{18} = 2.56$ s' }] },
        {
          l: 'd',
          marks: 3,
          q: 'Find the distance of the particle from the origin when $t = 2$.',
          answer: '$14.4$ m',
          ms: ['M1 integrates $\\mathbf v$', 'A1 $\\mathbf r = -8\\mathbf i + 12\\mathbf j$', 'A1 14.4 m'],
          steps: [
            { say: 'Integrate velocity; it starts at the origin.', show: '$\\mathbf r = (0.5t^3 - 6t)\\,\\mathbf i + (8t - t^2)\\,\\mathbf j$' },
            { say: 'Substitute t equals two.', show: '$\\mathbf r = -8\\mathbf i + 12\\mathbf j$' },
            { say: 'Magnitude.', show: '$|\\mathbf r| = \\sqrt{64 + 144} = 14.4$ m' }] }] },
    {
      n: 4,
      section: 'A',
      points: ['m4_ladder', 'm4_mom'],
      parts: [
        {
          l: 'a',
          marks: 7,
          q: 'A uniform ladder rests with its foot on rough horizontal ground and its top against a rough vertical wall. The coefficient of friction is 0.5 at the ground and 0.25 at the wall. The ladder is on the point of slipping. Find the angle the ladder makes with the ground.',
          answer: '$41.2^\\circ$',
          ms: [
            'M1 resolves horizontally: $S = 0.5R$',
            'M1 resolves vertically: $R + 0.25S = W$',
            'A1 $R = \\frac{W}{1.125}$, $S = \\frac{W}{2.25}$',
            'M1 moments about the foot including wall friction',
            'A1 $S\\cdot 2a\\sin\\theta + 0.25S\\cdot 2a\\cos\\theta = Wa\\cos\\theta$',
            'M1 divides by $\\cos\\theta$',
            'A1 $\\tan\\theta = 0.875,\\ \\theta = 41.2^\\circ$'],
          steps: [
            { say: 'Let the ladder have length two a and weight W. Friction is limiting at both ends: at the ground it is half R, at the wall a quarter S, acting upwards.', show: '$F = 0.5R, \\quad F_w = 0.25S$' },
            { say: 'Resolve horizontally: S balances the ground friction.', show: '$S = 0.5R$' },
            { say: 'Resolve vertically: R plus the wall friction balances W.', show: '$R + 0.25S = W \\Rightarrow 1.125R = W$' },
            { say: 'Take moments about the foot.', show: '$S(2a\\sin\\theta) + 0.25S(2a\\cos\\theta) = W(a\\cos\\theta)$' },
            { say: 'Divide by two a S cos theta and use W over S equals two point two five.', show: '$\\tan\\theta + 0.25 = \\dfrac{W}{2S} = 1.125$' },
            { say: 'So tan theta is nought point eight seven five.', show: '$\\theta = 41.2^\\circ$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'A non-uniform rod $AB$ of length 3 m and mass 12 kg hangs horizontally from two vertical strings attached at $A$ and $B$. The tension in the string at $A$ is twice the tension in the string at $B$. Find the distance of the centre of mass of the rod from $A$. Take $g = 9.8$ m s⁻².',
          answer: '$1$ m',
          ms: ['M1 $3T_B = 12g$', 'A1 $T_B = 4g$', 'M1 moments about $A$', 'A1 1 m'],
          steps: [
            { say: 'Resolve vertically, with T A equal to two T B.', show: '$2T_B + T_B = 12g \\Rightarrow T_B = 4g$' },
            { say: 'Take moments about A, with the centre of mass x metres from A.', show: '$T_B \\times 3 = 12g \\times x$' },
            { say: 'Substitute.', show: '$12g = 12gx$' },
            { say: 'So the centre of mass is one metre from A.', show: '$x = 1$ m' }] },
        {
          l: 'c',
          marks: 3,
          q: 'A particle of mass $m$ kg is attached to the rod at $B$, and the tensions in the two strings become equal. Find $m$.',
          answer: '$m = 4$',
          ms: ['M1 $T = \\frac{(12 + m)g}{2}$', 'M1 moments about $A$', 'A1 $m = 4$'],
          steps: [
            { say: 'Equal tensions each carry half the total weight.', show: '$T = \\tfrac12(12 + m)g$' },
            { say: 'Take moments about A.', show: '$3T = 12g(1) + mg(3)$' },
            { say: 'Substitute and solve.', show: '$1.5(12 + m) = 12 + 3m \\Rightarrow 18 + 1.5m = 12 + 3m \\Rightarrow m = 4$' }] }] },
    {
      n: 5,
      section: 'A',
      points: ['m4_imp'],
      q: 'Three particles $A$, $B$ and $C$, of masses 2 kg, 3 kg and 1 kg, lie in that order on a smooth straight horizontal line. $A$ is projected towards $B$ with speed 6 m s⁻¹; $B$ and $C$ are at rest. After $A$ collides with $B$, $A$ continues in the same direction with speed 1.5 m s⁻¹.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find the speed of $B$ after this collision.',
          answer: '$3$ m s⁻¹',
          ms: ['M1 $2(6) = 2(1.5) + 3v$', 'A1 3'],
          steps: [
            { say: 'Conserve momentum.', show: '$2 \\times 6 = 2 \\times 1.5 + 3v$' },
            { say: 'Simplify.', show: '$12 = 3 + 3v$' },
            { say: 'So B moves at three metres per second.', show: '$v = 3$ m s⁻¹' }] },
        {
          l: 'b',
          marks: 2,
          q: '$B$ then collides with $C$ and they coalesce. Find their common speed.',
          answer: '$2.25$ m s⁻¹',
          ms: ['M1 $3(3) = 4w$', 'A1 2.25'],
          steps: [
            { say: 'They move together after the collision, so their combined mass is four.', show: '$3 \\times 3 = (3 + 1)w$' },
            { say: 'Solve.', show: '$w = \\tfrac94$' },
            { say: 'So the common speed is two point two five.', show: '$w = 2.25$ m s⁻¹' }] },
        {
          l: 'c',
          marks: 1,
          q: 'Determine whether there is a further collision.',
          answer: 'No: $A$ (1.5 m s⁻¹) is slower than the combined particle (2.25 m s⁻¹)',
          ms: ['B1 no, with comparison of speeds'],
          steps: [
            { say: 'A is behind the combined particle and both move the same way.', show: 'same direction' },
            { say: 'A moves at one point five, the combined particle at two point two five.', show: '$1.5 < 2.25$' },
            { say: 'A can never catch up, so there are no more collisions.', show: 'no further collision' }] },
        {
          l: 'd',
          marks: 1,
          q: 'Find the magnitude of the impulse exerted on $C$.',
          answer: '$2.25$ N s',
          ms: ['B1 2.25 N s'],
          steps: [
            { say: 'Impulse is change in momentum.', show: '$I = mv - mu$' },
            { say: 'C had mass one and started at rest.', show: '$I = 1 \\times 2.25 - 0$' },
            { say: 'So the impulse is two point two five newton seconds.', show: '$2.25$ N s' }] }] },
    {
      n: 6,
      section: 'B',
      points: ['m4_cond', 'm4_pmod'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'A factory has three machines. Machine A makes 50% of the output, B makes 30% and C makes 20%. The proportions of defective items are 2%, 3% and 5% respectively. Find the probability that a randomly chosen item is defective.',
          answer: '$0.029$',
          ms: ['M1 sum of three products', 'A1 0.029'],
          steps: [
            { say: 'Use a tree with three first branches.', show: '$P(D) = 0.5(0.02) + 0.3(0.03) + 0.2(0.05)$' },
            { say: 'Work out each branch.', show: '$= 0.010 + 0.009 + 0.010$' },
            { say: 'Add.', show: '$= 0.029$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Given that an item is defective, find the probability that it was made by machine C.',
          answer: '$0.345$',
          ms: ['M1 $\\frac{0.010}{0.029}$', 'A1 0.345'],
          steps: [
            { say: 'Use the conditional probability formula.', show: '$P(C \\mid D) = \\dfrac{P(C \\cap D)}{P(D)}$' },
            { say: 'Substitute.', show: '$= \\dfrac{0.010}{0.029}$' },
            { say: 'Evaluate.', show: '$= 0.345$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Two items are chosen independently and both are found to be defective. Find the probability that both were made by machine C.',
          answer: '$0.119$',
          ms: ['M1 $P(\\text{both } C \\cap D) = 0.01^2$', 'M1 $P(\\text{both } D) = 0.029^2$', 'A1 0.119'],
          steps: [
            { say: 'Both items made by C and defective: each has probability nought point nought one.', show: '$0.010^2$' },
            { say: 'Both defective: each has probability nought point nought two nine.', show: '$0.029^2$' },
            { say: 'Divide.', show: '$\\dfrac{0.0001}{0.000841} = 0.119$' }] },
        {
          l: 'd',
          marks: 3,
          q: 'Events $X$ and $Y$ satisfy $P(X) = 0.6$, $P(Y \\mid X) = 0.5$ and $P(Y \\mid X\') = 0.25$. Find $P(X \\mid Y)$.',
          answer: '$0.75$',
          ms: ['M1 $P(Y) = 0.6(0.5) + 0.4(0.25)$', 'A1 $P(Y) = 0.4$', 'A1 $P(X \\mid Y) = 0.75$'],
          steps: [
            { say: 'Find P of Y using a tree.', show: '$P(Y) = 0.6 \\times 0.5 + 0.4 \\times 0.25 = 0.4$' },
            { say: 'Find the intersection.', show: '$P(X \\cap Y) = 0.6 \\times 0.5 = 0.3$' },
            { say: 'Divide.', show: '$P(X \\mid Y) = \\dfrac{0.3}{0.4} = 0.75$' }] },
        {
          l: 'e',
          marks: 1,
          q: 'State, with a reason, whether $X$ and $Y$ are independent.',
          answer: 'Not independent: $P(X \\mid Y) = 0.75 \\neq P(X) = 0.6$',
          ms: ['B1 with reason'],
          steps: [
            { say: 'Compare P of X given Y with P of X.', show: '$0.75$ vs $0.6$' },
            { say: 'They are different.', show: '$0.75 \\neq 0.6$' },
            { say: 'So the events are not independent.', show: 'not independent' }] },
        {
          l: 'f',
          marks: 1,
          q: 'In part (c), comment on the assumption that the two items are chosen independently.',
          answer: 'If both items come from the same batch or time period (e.g. a machine fault), defects are not independent, so the model may be unrealistic',
          ms: ['B1 sensible critique'],
          steps: [
            { say: 'We multiplied probabilities for the two items.', show: 'independence assumed' },
            { say: 'Defects often cluster, for example when a machine develops a fault.', show: 'defects not independent' },
            { say: 'So the calculated probability may not be realistic.', show: 'critique' }] }] },
    {
      n: 7,
      section: 'B',
      points: ['m4_inorm', 'm4_norm', 'm4_choose'],
      q: 'A random variable $X$ is normally distributed. $P(X < 20) = 0.2$ and $P(X > 35) = 0.1$.',
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Find the mean and standard deviation of $X$.',
          answer: '$\\mu = 25.9,\\ \\sigma = 7.06$',
          ms: [
            'B1 $-0.8416$ and $1.2816$',
            'M1 $\\frac{20 - \\mu}{\\sigma} = -0.8416$',
            'M1 $\\frac{35 - \\mu}{\\sigma} = 1.2816$',
            'A1 $\\sigma = 7.06$',
            'A1 $\\mu = 25.9$'],
          steps: [
            { say: 'Find the z values: twenty per cent below, and ninety per cent below.', show: '$\\Phi^{-1}(0.2) = -0.8416, \\quad \\Phi^{-1}(0.9) = 1.2816$' },
            { say: 'Write two equations.', show: '$20 = \\mu - 0.8416\\sigma, \\qquad 35 = \\mu + 1.2816\\sigma$' },
            { say: 'Subtract.', show: '$15 = 2.1232\\sigma \\Rightarrow \\sigma = 7.065$' },
            { say: 'Substitute back.', show: '$\\mu = 20 + 0.8416 \\times 7.065 = 25.95$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Find $P(X > 30 \\mid X > 25)$.',
          answer: '$0.512$',
          ms: ['M1 $\\frac{P(X > 30)}{P(X > 25)}$', 'A1 $P(X > 30) = 0.2830$', 'A1 $P(X > 25) = 0.5533$', 'A1 0.512'],
          steps: [
            { say: 'If X is more than thirty it is certainly more than twenty five, so the intersection is just X more than thirty.', show: '$P(X > 30 \\mid X > 25) = \\dfrac{P(X > 30)}{P(X > 25)}$' },
            { say: 'Standardise thirty.', show: '$P(X > 30) = 1 - \\Phi(0.573) = 0.2830$' },
            { say: 'Standardise twenty five.', show: '$P(X > 25) = 1 - \\Phi(-0.134) = 0.5533$' },
            { say: 'Divide.', show: '$\\dfrac{0.2830}{0.5533} = 0.512$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'The waiting times at a clinic have mean 12 minutes and standard deviation 8 minutes. Explain why a normal distribution is not a suitable model for these times.',
          answer: 'Under $N(12, 8^2)$, $P(T < 0) = \\Phi(-1.5) = 0.067$, but times cannot be negative (the data are likely to be right-skewed)',
          ms: ['M1 calculates $P(T < 0) = 0.067$', 'A1 explains times cannot be negative / skewed'],
          steps: [
            { say: 'Work out the probability of a negative time under this normal model.', show: '$P(T < 0) = \\Phi\\left(\\dfrac{0 - 12}{8}\\right) = \\Phi(-1.5)$' },
            { say: 'This is about six point seven per cent.', show: '$= 0.067$' },
            { say: 'Waiting times cannot be negative, so the model is not suitable; the data are probably skewed.', show: 'not appropriate' }] }] },
    {
      n: 8,
      section: 'B',
      points: ['m4_btest', 'm4_lang', 'm4_choose'],
      q: 'Historically, 25% of a type of seed fail to germinate. A new storage method is tried and a random sample of 40 seeds is planted. A test is carried out at the 5% level to see whether the proportion failing has decreased.',
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'Find the critical region for the test and its actual significance level.',
          answer: '$X \\leq 5$; actual significance level $4.33\\%$',
          ms: [
            'B1 $H_0: p = 0.25,\\ H_1: p < 0.25$, $X \\sim B(40, 0.25)$',
            'M1 $P(X \\leq 5) = 0.0433$, $P(X \\leq 6) = 0.0962$',
            'A1 $X \\leq 5$',
            'A1 0.0433'],
          steps: [
            { say: 'State the hypotheses and the distribution under the null.', show: '$H_0: p = 0.25, \\ H_1: p < 0.25, \\ X \\sim B(40, 0.25)$' },
            { say: 'Find the cumulative probabilities near five per cent.', show: '$P(X \\leq 5) = 0.0433, \\quad P(X \\leq 6) = 0.0962$' },
            { say: 'The critical region is the largest lower tail with probability at most five per cent.', show: '$X \\leq 5$' },
            { say: 'The actual significance level is the probability of that region.', show: '$4.33\\%$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'In the sample, 5 seeds fail to germinate. State the conclusion of the test in context.',
          answer: '5 is in the critical region: reject $H_0$; evidence that the proportion failing has decreased',
          ms: ['M1 5 in critical region', 'A1 conclusion in context'],
          steps: [
            { say: 'Five is in the critical region.', show: '$5 \\leq 5$' },
            { say: 'So reject the null hypothesis.', show: 'reject $H_0$' },
            { say: 'There is evidence that the new storage method reduces the proportion of seeds failing to germinate.', show: 'evidence of a decrease' }] },
        {
          l: 'c',
          marks: 1,
          q: 'Explain what the actual significance level means in this context.',
          answer: 'There is a probability of 0.0433 of concluding the new method reduces failures when in fact the failure rate is still 25%',
          ms: ['B1 in context'],
          steps: [
            { say: 'The significance level is the chance of wrongly rejecting the null hypothesis.', show: '$P(\\text{reject } H_0 \\mid p = 0.25)$' },
            { say: 'Here that means claiming improvement when there is none.', show: 'in context' },
            { say: 'That probability is nought point nought four three three.', show: '$0.0433$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Give two reasons why a binomial model might not be appropriate here.',
          answer: 'e.g. seeds from the same packet may not germinate independently; the probability of failure may vary between seeds (soil, position, watering)',
          ms: ['B1 independence questioned', 'B1 constant probability questioned'],
          steps: [
            { say: 'Binomial needs independent trials.', show: 'independence' },
            { say: 'Seeds in the same tray share conditions, so their outcomes may be linked.', show: 'shared soil, water' },
            { say: 'It also needs the same probability for every seed, which may vary with position or seed quality.', show: 'constant $p$ questionable' }] }] },
    {
      n: 9,
      section: 'B',
      points: ['m4_ntest', 'm4_lang'],
      q: 'The lengths of components are normally distributed with standard deviation 4.2 mm. The target mean length is 30.0 mm. A random sample of 40 components gives $\\sum x = 1236$.',
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'Test, at the 5% level, whether the mean length differs from 30.0 mm.',
          answer: '$z = 1.36 < 1.96$: do not reject $H_0$; no evidence the mean differs from 30.0 mm',
          ms: [
            'B1 $H_0: \\mu = 30,\\ H_1: \\mu \\neq 30$',
            'B1 $\\bar x = 30.9$',
            'M1 $z = \\frac{30.9 - 30}{4.2/\\sqrt{40}}$',
            'A1 $z = 1.36$',
            'M1 compares with 1.96',
            'A1 conclusion in context'],
          steps: [
            { say: 'Differs means two tailed.', show: '$H_0: \\mu = 30, \\quad H_1: \\mu \\neq 30$' },
            { say: 'Find the sample mean.', show: '$\\bar x = \\dfrac{1236}{40} = 30.9$' },
            { say: 'The standard error is four point two over root forty.', show: '$\\dfrac{4.2}{\\sqrt{40}} = 0.6641$' },
            { say: 'Calculate z.', show: '$z = \\dfrac{0.9}{0.6641} = 1.36$' },
            { say: 'Compare with one point nine six.', show: '$1.36 < 1.96 \\Rightarrow$ do not reject $H_0$' },
            { say: 'There is no evidence that the mean length differs from thirty millimetres.', show: 'no evidence of a change' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the critical region for $\\bar x$ for this test.',
          answer: '$\\bar x < 28.70$ or $\\bar x > 31.30$',
          ms: ['M1 $30 \\pm 1.96 \\times 0.6641$', 'A1 $\\bar x < 28.70$ or $\\bar x > 31.30$'],
          steps: [
            { say: 'Undo the standardisation at the critical values.', show: '$30 \\pm 1.96 \\times 0.6641$' },
            { say: 'One point nine six times nought point six six four one is one point three zero.', show: '$30 \\pm 1.30$' },
            { say: 'So the critical region is', show: '$\\bar x < 28.70 \\ \\text{or}\\ \\bar x > 31.30$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the smallest sample size for which a sample mean of 30.9 mm would lead to rejection of $H_0$ at the 5% level.',
          answer: '$n = 84$',
          ms: ['M1 $\\frac{0.9\\sqrt n}{4.2} > 1.96$', 'A1 $n > 83.7$', 'A1 84'],
          steps: [
            { say: 'We need the test statistic to exceed one point nine six.', show: '$\\dfrac{0.9}{4.2/\\sqrt n} > 1.96$' },
            { say: 'Rearrange for root n.', show: '$\\sqrt n > \\dfrac{1.96 \\times 4.2}{0.9} = 9.147$' },
            { say: 'Square.', show: '$n > 83.7 \\Rightarrow n = 84$' }] }] },
    {
      n: 10,
      section: 'B',
      points: ['m4_ctest', 'm4_lang'],
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'A researcher uses a large data set to choose 15 towns at random and finds the product moment correlation coefficient between mean rainfall and mean house price is $r = 0.43$. The critical value for a 2-tailed test at the 5% level with $n = 15$ is 0.5140. Test whether there is evidence of correlation.',
          answer: '$0.43 < 0.5140$: do not reject $H_0$; no evidence of correlation',
          ms: [
            'B1 $H_0: \\rho = 0,\\ H_1: \\rho \\neq 0$',
            'M1 compares $|r|$ with 0.5140',
            'A1 do not reject $H_0$',
            'A1 conclusion in context'],
          steps: [
            { say: 'A test for any correlation is two tailed.', show: '$H_0: \\rho = 0, \\quad H_1: \\rho \\neq 0$' },
            { say: 'Compare the size of r with the critical value.', show: '$0.43 < 0.5140$' },
            { say: 'Not significant, so do not reject the null.', show: 'do not reject $H_0$' },
            { say: 'There is no evidence of correlation between rainfall and house price.', show: 'no evidence of correlation' }] },
        {
          l: 'b',
          marks: 2,
          q: 'For a different pair of variables in the same data set, a test of $H_0: \\rho = 0$ against $H_1: \\rho > 0$ gives a $p$-value of 0.002. Interpret this result.',
          answer: '$0.002 < 0.01$ (and $< 0.05$): reject $H_0$ even at the 1% level; strong evidence of positive correlation',
          ms: ['M1 compares 0.002 with a significance level', 'A1 strong evidence of positive correlation'],
          steps: [
            { say: 'The p value is the probability of a result this extreme if there were no correlation.', show: '$P = 0.002$' },
            { say: 'It is below both five per cent and one per cent.', show: '$0.002 < 0.01$' },
            { say: 'So there is strong evidence of positive correlation.', show: 'reject $H_0$: strong evidence' }] },
        {
          l: 'c',
          marks: 1,
          q: 'Explain why a significant correlation does not show that one variable causes changes in the other.',
          answer: 'Correlation measures association only; a third variable (e.g. location) could affect both',
          ms: ['B1 correlation is not causation, with a reason'],
          steps: [
            { say: 'Correlation only measures how closely the points follow a straight line.', show: 'association' },
            { say: 'Both variables could be driven by something else, such as location or population.', show: 'confounding variable' },
            { say: 'So we cannot conclude cause and effect.', show: 'correlation $\\neq$ causation' }] }] }] });
