// BCS Academy original papers · not CCEA papers. Maths AS 2 Applied Mathematics (three practice papers).
// Format follows the CCEA GCE Mathematics (2018) AS 2 unit: 1 hour 15 minutes, 70 marks, calculator allowed, answer all questions,
// Section A Mechanics (35 marks) and Section B Statistics (35 marks). Take g = 9.8 m s⁻² throughout.
// Questions carry an extra `section` field ('A' or 'B'). Points are COURSES['m2'].points ids. Every numerical answer was checked by computation.

BCSP.add({
  id: 'm2-easy', unit: 'm2', level: 'easy',
  title: 'Maths AS 2 · Paper A (Easy)', minutes: 75, calc: true,
  sections: [{ id: 'A', title: 'Section A: Mechanics', marks: 35 }, { id: 'B', title: 'Section B: Statistics', marks: 35 }],
  questions: [
    { n: 1, section: 'A', points: ['m2_units', 'm2_kgraph'],
      q: '<b>Section A: Mechanics.</b> Take $g = 9.8$ m s⁻².<br>A car starts from rest and accelerates uniformly to a speed of 15 m s⁻¹ in 6 s. It travels at this speed for 20 s, then decelerates uniformly to rest in a further 4 s.',
      parts: [
        { l: 'a', marks: 2, q: 'Find the acceleration of the car during the first 6 s, stating its SI units.',
          answer: '$2.5$ m s⁻²',
          ms: ['M1 gradient of $v$–$t$ graph: $\\frac{15}{6}$', 'A1 $2.5$ m s⁻² with units'],
          steps: [
            { say: 'Acceleration is the gradient of a velocity time graph: change in velocity over time taken.', show: '$a = \\dfrac{15 - 0}{6}$' },
            { say: 'That is 2.5.', show: '$a = 2.5$' },
            { say: 'Velocity is in metres per second, and we divide by seconds, so the unit is metres per second squared.', show: '$2.5\\ \\text{m s}^{-2}$' } ] },
        { l: 'b', marks: 3, q: 'Find the total distance travelled by the car.',
          answer: '$375$ m',
          ms: ['M1 distance $=$ area under $v$–$t$ graph', 'A1 $45 + 300 + 30$ (or trapezium)', 'A1 $375$ m'],
          steps: [
            { say: 'Distance is the area under the velocity time graph. The graph is a trapezium made of a triangle, a rectangle and another triangle.', show: 'area $= \\tfrac12(6)(15) + 20(15) + \\tfrac12(4)(15)$' },
            { say: 'Work out each piece.', show: '$= 45 + 300 + 30$' },
            { say: 'Add them.', show: '$= 375$ m' },
            { say: 'Check with the trapezium rule: half of 20 plus 30, times 15.', show: '$\\tfrac12(20 + 30)(15) = 375$ ✓' } ] },
        { l: 'c', marks: 1, q: 'Find the deceleration of the car during the last 4 s.',
          answer: '$3.75$ m s⁻²',
          ms: ['B1 $3.75$ m s⁻²'],
          steps: [
            { say: 'The velocity falls from 15 to 0 in 4 seconds.', show: '$a = \\dfrac{0 - 15}{4} = -3.75$' },
            { say: 'A negative acceleration is a deceleration.', show: 'deceleration $= 3.75$ m s⁻²' },
            { say: 'So the deceleration is 3.75 metres per second squared.', show: '$3.75$ m s⁻²' } ] } ] },

    { n: 2, section: 'A', points: ['m2_suvat', 'm2_grav'],
      q: 'A ball is projected vertically upwards from ground level with speed 14.7 m s⁻¹.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the greatest height above the ground reached by the ball.',
          answer: '$11.0$ m (11.025 m)',
          ms: ['M1 $v^2 = u^2 + 2as$ with $v = 0$, $a = -9.8$', 'A1 correct substitution', 'A1 $11.0$ m'],
          steps: [
            { say: 'Take up as positive. At the top the velocity is zero, and the acceleration is minus g.', show: '$u = 14.7,\\ v = 0,\\ a = -9.8$' },
            { say: 'We want s and do not know t, so use v squared equals u squared plus 2 a s.', show: '$0 = 14.7^2 - 2(9.8)s$' },
            { say: 'Rearrange.', show: '$s = \\dfrac{216.09}{19.6} = 11.025$' },
            { say: 'So the greatest height is about 11.0 metres.', show: '$s = 11.0$ m' } ] },
        { l: 'b', marks: 3, q: 'Find the time for which the ball is in the air.',
          answer: '$3$ s',
          ms: ['M1 $s = ut + \\frac12at^2$ with $s = 0$', 'A1 $14.7t - 4.9t^2 = 0$', 'A1 $t = 3$ s'],
          steps: [
            { say: 'When the ball lands, its displacement is zero.', show: '$0 = 14.7t - 4.9t^2$' },
            { say: 'Factorise.', show: '$t(14.7 - 4.9t) = 0$' },
            { say: 't equals zero is the start, so the ball lands when t is 3 seconds.', show: '$t = \\dfrac{14.7}{4.9} = 3$ s' } ] },
        { l: 'c', marks: 1, q: 'State one modelling assumption you have made.',
          answer: 'e.g. air resistance is ignored; the ball is a particle',
          ms: ['B1 any valid assumption'],
          steps: [
            { say: 'We used constant acceleration g throughout.', show: '$a = -g$ constant' },
            { say: 'That is only true if there is no air resistance.', show: 'no air resistance' },
            { say: 'We also treated the ball as a particle, so its size and spin do not matter.', show: 'ball modelled as a particle' } ] } ] },

    { n: 3, section: 'A', points: ['m2_force', 'm2_n2', 'm2_equil'],
      q: 'Two forces $\\mathbf F_1 = (3\\mathbf i + 4\\mathbf j)$ N and $\\mathbf F_2 = (5\\mathbf i - 2\\mathbf j)$ N act on a particle of mass 2 kg.',
      parts: [
        { l: 'a', marks: 1, q: 'Find the resultant force.',
          answer: '$(8\\mathbf i + 2\\mathbf j)$ N',
          ms: ['B1 $8\\mathbf i + 2\\mathbf j$'],
          steps: [
            { say: 'Add the forces component by component.', show: '$(3 + 5)\\mathbf i + (4 - 2)\\mathbf j$' },
            { say: 'This gives 8 i plus 2 j.', show: '$\\mathbf R = (8\\mathbf i + 2\\mathbf j)$ N' },
            { say: 'Keep this for the next parts.', show: '$\\mathbf R = 8\\mathbf i + 2\\mathbf j$' } ] },
        { l: 'b', marks: 3, q: 'Find the magnitude of the resultant force and the angle it makes with $\\mathbf i$.',
          answer: '$8.25$ N at $14.0^\\circ$ to $\\mathbf i$',
          ms: ['M1 $\\sqrt{8^2 + 2^2}$', 'A1 $8.25$ N', 'A1 $14.0^\\circ$'],
          steps: [
            { say: 'Magnitude by Pythagoras.', show: '$|\\mathbf R| = \\sqrt{64 + 4} = \\sqrt{68} = 8.25$ N' },
            { say: 'Direction: tan of the angle is 2 over 8.', show: '$\\tan\\theta = \\dfrac28$' },
            { say: 'So the angle is 14.0 degrees above i.', show: '$\\theta = 14.0^\\circ$' } ] },
        { l: 'c', marks: 2, q: 'Find the acceleration of the particle.',
          answer: '$(4\\mathbf i + \\mathbf j)$ m s⁻²',
          ms: ['M1 $\\mathbf F = m\\mathbf a$', 'A1 $4\\mathbf i + \\mathbf j$'],
          steps: [
            { say: 'Newton’s second law: resultant force equals mass times acceleration.', show: '$8\\mathbf i + 2\\mathbf j = 2\\mathbf a$' },
            { say: 'Divide by the mass, 2.', show: '$\\mathbf a = 4\\mathbf i + \\mathbf j$' },
            { say: 'The units are metres per second squared.', show: '$\\mathbf a = (4\\mathbf i + \\mathbf j)$ m s⁻²' } ] },
        { l: 'd', marks: 1, q: 'A third force $\\mathbf F_3$ is added so that the particle is in equilibrium. Write down $\\mathbf F_3$.',
          answer: '$(-8\\mathbf i - 2\\mathbf j)$ N',
          ms: ['B1 $-8\\mathbf i - 2\\mathbf j$'],
          steps: [
            { say: 'Equilibrium means the resultant of all three forces is zero.', show: '$\\mathbf F_1 + \\mathbf F_2 + \\mathbf F_3 = \\mathbf 0$' },
            { say: 'So F3 is the negative of the resultant.', show: '$\\mathbf F_3 = -(8\\mathbf i + 2\\mathbf j)$' },
            { say: 'Write it out.', show: '$\\mathbf F_3 = (-8\\mathbf i - 2\\mathbf j)$ N' } ] } ] },

    { n: 4, section: 'A', points: ['m2_conn', 'm2_fric', 'm2_n2'],
      q: 'A block A of mass 4 kg rests on a rough horizontal table. The coefficient of friction between A and the table is 0.25. A light inextensible string attached to A passes over a smooth pulley at the edge of the table and carries a particle B of mass 3 kg hanging freely. The system is released from rest.',
      parts: [
        { l: 'a', marks: 2, q: 'Find the normal reaction on A and the frictional force on A when it is sliding.',
          answer: '$R = 39.2$ N, $F = 9.8$ N',
          ms: ['B1 $R = 4g = 39.2$ N', 'B1 $F = 0.25 \\times 39.2 = 9.8$ N'],
          steps: [
            { say: 'Vertically A is in equilibrium, so the reaction balances its weight.', show: '$R = 4g = 39.2$ N' },
            { say: 'When sliding, friction is at its limiting value, mu R.', show: '$F = \\mu R = 0.25 \\times 39.2$' },
            { say: 'So friction is 9.8 newtons.', show: '$F = 9.8$ N' } ] },
        { l: 'b', marks: 4, q: 'Find the acceleration of the system.',
          answer: '$2.8$ m s⁻²',
          ms: ['M1 Newton II for A: $T - 9.8 = 4a$', 'M1 Newton II for B: $3g - T = 3a$', 'M1 add to eliminate $T$', 'A1 $a = 2.8$ m s⁻²'],
          steps: [
            { say: 'Apply Newton’s second law to A horizontally: tension forward, friction back.', show: 'A: $T - 9.8 = 4a$' },
            { say: 'Apply it to B vertically: weight down, tension up.', show: 'B: $3g - T = 3a$' },
            { say: 'Add the equations so the tension cancels.', show: '$3g - 9.8 = 7a \\Rightarrow 19.6 = 7a$' },
            { say: 'Divide by 7.', show: '$a = 2.8$ m s⁻²' } ] },
        { l: 'c', marks: 2, q: 'Find the tension in the string.',
          answer: '$21$ N',
          ms: ['M1 substitute $a$ into either equation', 'A1 $T = 21$ N'],
          steps: [
            { say: 'Use the equation for B.', show: '$T = 3g - 3a$' },
            { say: 'Substitute g equals 9.8 and a equals 2.8.', show: '$T = 29.4 - 8.4$' },
            { say: 'The tension is 21 newtons. Check with A: 21 minus 9.8 is 11.2, which is 4 times 2.8.', show: '$T = 21$ N' } ] },
        { l: 'd', marks: 1, q: 'State how you have used the fact that the string is inextensible.',
          answer: 'A and B have the same magnitude of acceleration',
          ms: ['B1 same acceleration for A and B'],
          steps: [
            { say: 'An inextensible string cannot stretch.', show: 'length of string constant' },
            { say: 'So whatever distance A moves, B moves the same distance.', show: 'same speed' },
            { say: 'Therefore both particles have the same acceleration a.', show: '$a_A = a_B = a$' } ] } ] },

    { n: 5, section: 'A', points: ['m2_vec2'],
      q: 'A particle moves with constant acceleration $(0.5\\mathbf i + \\mathbf j)$ m s⁻². At time $t = 0$ it is at the origin O with velocity $(2\\mathbf i - 3\\mathbf j)$ m s⁻¹.',
      parts: [
        { l: 'a', marks: 2, q: 'Find the velocity of the particle when $t = 4$.',
          answer: '$(4\\mathbf i + \\mathbf j)$ m s⁻¹',
          ms: ['M1 $\\mathbf v = \\mathbf u + \\mathbf at$', 'A1 $4\\mathbf i + \\mathbf j$'],
          steps: [
            { say: 'Use v equals u plus a t, in vector form.', show: '$\\mathbf v = (2\\mathbf i - 3\\mathbf j) + 4(0.5\\mathbf i + \\mathbf j)$' },
            { say: 'Multiply out.', show: '$= (2\\mathbf i - 3\\mathbf j) + (2\\mathbf i + 4\\mathbf j)$' },
            { say: 'Add.', show: '$\\mathbf v = (4\\mathbf i + \\mathbf j)$ m s⁻¹' } ] },
        { l: 'b', marks: 2, q: 'Find the position vector of the particle when $t = 4$.',
          answer: '$(12\\mathbf i - 4\\mathbf j)$ m',
          ms: ['M1 $\\mathbf r = \\mathbf ut + \\frac12\\mathbf at^2$', 'A1 $12\\mathbf i - 4\\mathbf j$'],
          steps: [
            { say: 'Use s equals u t plus a half a t squared in vector form.', show: '$\\mathbf r = 4(2\\mathbf i - 3\\mathbf j) + \\tfrac12(16)(0.5\\mathbf i + \\mathbf j)$' },
            { say: 'Multiply out each term.', show: '$= (8\\mathbf i - 12\\mathbf j) + (4\\mathbf i + 8\\mathbf j)$' },
            { say: 'Add.', show: '$\\mathbf r = (12\\mathbf i - 4\\mathbf j)$ m' } ] },
        { l: 'c', marks: 2, q: 'Find the speed of the particle when $t = 4$.',
          answer: '$4.12$ m s⁻¹',
          ms: ['M1 $\\sqrt{4^2 + 1^2}$', 'A1 $4.12$ m s⁻¹'],
          steps: [
            { say: 'Speed is the magnitude of the velocity.', show: '$|\\mathbf v| = \\sqrt{4^2 + 1^2}$' },
            { say: 'That is root 17.', show: '$= \\sqrt{17}$' },
            { say: 'To 3 significant figures.', show: '$= 4.12$ m s⁻¹' } ] } ] },

    { n: 6, section: 'B', points: ['m2_samp'],
      q: '<b>Section B: Statistics.</b><br>A sixth form has 240 students in Year 13 and 360 students in Year 14. The head of sixth form wants to survey 50 students about study spaces.',
      parts: [
        { l: 'a', marks: 2, q: 'A stratified sample by year group is to be taken. Find how many students should be chosen from each year.',
          answer: 'Year 13: 20, Year 14: 30',
          ms: ['M1 $\\frac{240}{600} \\times 50$ or equivalent', 'A1 20 and 30'],
          steps: [
            { say: 'There are 600 students in total. Each year group should be represented in proportion to its size.', show: '$240 + 360 = 600$' },
            { say: 'Year 13: 240 out of 600, times 50.', show: '$\\tfrac{240}{600} \\times 50 = 20$' },
            { say: 'Year 14: the remaining 30.', show: '$\\tfrac{360}{600} \\times 50 = 30$' } ] },
        { l: 'b', marks: 2, q: 'Describe how a simple random sample of 50 students could be chosen.',
          answer: 'Number students 1–600; use random numbers to select 50, ignoring repeats',
          ms: ['B1 list and number all 600 students (sampling frame)', 'B1 use a random number generator to choose 50 distinct numbers'],
          steps: [
            { say: 'First make a complete list of the population, the sampling frame, and number it.', show: 'number students 001 to 600' },
            { say: 'Use a calculator or computer random number generator to pick numbers in this range.', show: 'random numbers 001–600' },
            { say: 'Ignore any repeats, until 50 different students are selected.', show: 'ignore repeats until 50 chosen' } ] },
        { l: 'c', marks: 1, q: 'Give one advantage of the stratified sample in this context.',
          answer: 'Both year groups are represented in proportion, so it is more representative',
          ms: ['B1 valid advantage in context'],
          steps: [
            { say: 'Year 13 and Year 14 students may have different views about study spaces.', show: 'views may differ by year' },
            { say: 'A stratified sample guarantees each year group is represented in the right proportion.', show: '20 from Year 13, 30 from Year 14' },
            { say: 'So the sample is more likely to represent the whole sixth form.', show: 'more representative' } ] } ] },

    { n: 7, section: 'B', points: ['m2_spread', 'm2_outl'],
      q: 'The times, in minutes, taken by 10 students to travel to school one morning were:<br>11 &nbsp; 14 &nbsp; 15 &nbsp; 15 &nbsp; 16 &nbsp; 17 &nbsp; 18 &nbsp; 19 &nbsp; 21 &nbsp; 34<br>[You may use $\\sum x = 180$, $\\sum x^2 = 3594$.]',
      parts: [
        { l: 'a', marks: 3, q: 'Treating the data as a population, calculate the mean and the standard deviation of the times.',
          answer: 'mean $18$ min, s.d. $5.95$ min',
          ms: ['B1 mean $= 18$', 'M1 $\\sqrt{\\frac{3594}{10} - 18^2}$', 'A1 $5.95$'],
          steps: [
            { say: 'Mean is the total divided by the number of values.', show: '$\\bar x = \\dfrac{180}{10} = 18$' },
            { say: 'Variance is the mean of the squares minus the square of the mean.', show: '$\\sigma^2 = \\dfrac{3594}{10} - 18^2 = 359.4 - 324 = 35.4$' },
            { say: 'Standard deviation is the square root.', show: '$\\sigma = \\sqrt{35.4} = 5.95$ min' } ] },
        { l: 'b', marks: 2, q: 'An outlier is defined as a value more than 2 standard deviations from the mean. Show that 34 is an outlier.',
          answer: '$18 + 2(5.95) = 29.9 \\lt 34$',
          ms: ['M1 $18 + 2 \\times 5.95$', 'A1 $29.9$, and $34 \\gt 29.9$ so outlier'],
          steps: [
            { say: 'Work out the upper limit: the mean plus 2 standard deviations.', show: '$18 + 2(5.95) = 29.9$' },
            { say: 'Compare with 34.', show: '$34 \\gt 29.9$' },
            { say: 'So 34 is an outlier.', show: '34 is an outlier' } ] },
        { l: 'c', marks: 2, q: 'The student who took 34 minutes had missed the bus, so the value is removed. Find the new mean.',
          answer: '$16.2$ min',
          ms: ['M1 $\\frac{180 - 34}{9}$', 'A1 $16.2$'],
          steps: [
            { say: 'Remove 34 from the total and reduce the count to 9.', show: '$\\dfrac{180 - 34}{9} = \\dfrac{146}{9}$' },
            { say: 'Evaluate.', show: '$= 16.22\\ldots$' },
            { say: 'The new mean is 16.2 minutes.', show: '$16.2$ min' } ] },
        { l: 'd', marks: 1, q: 'State, with a reason, the effect on the standard deviation of removing this value.',
          answer: 'It decreases, because the value furthest from the mean has been removed',
          ms: ['B1 decreases with reason'],
          steps: [
            { say: 'Standard deviation measures spread about the mean.', show: 'spread about the mean' },
            { say: 'The value 34 was by far the furthest from the mean.', show: '$34 - 18 = 16$' },
            { say: 'Removing it reduces the spread, so the standard deviation decreases. In fact it becomes about 2.78.', show: 'standard deviation decreases' } ] } ] },

    { n: 8, section: 'B', points: ['m2_corr'],
      q: 'The number of hours, $x$, eight students spent revising and their test marks, $y$, are summarised by<br>$n = 8$, $\\sum x = 55$, $\\sum y = 455$, $\\sum x^2 = 463$, $\\sum y^2 = 27419$, $\\sum xy = 3489$.',
      parts: [
        { l: 'a', marks: 4, q: 'Calculate the product moment correlation coefficient between $x$ and $y$.',
          answer: '$r = 0.998$',
          ms: ['M1 $S_{xx} = 463 - \\frac{55^2}{8} = 84.875$', 'M1 $S_{yy} = 1540.875$, $S_{xy} = 360.875$', 'M1 $r = \\frac{S_{xy}}{\\sqrt{S_{xx}S_{yy}}}$', 'A1 $0.998$'],
          steps: [
            { say: 'First find S x x.', show: '$S_{xx} = 463 - \\dfrac{55^2}{8} = 84.875$' },
            { say: 'Then S y y.', show: '$S_{yy} = 27419 - \\dfrac{455^2}{8} = 1540.875$' },
            { say: 'Then S x y.', show: '$S_{xy} = 3489 - \\dfrac{55 \\times 455}{8} = 360.875$' },
            { say: 'Put them into the formula for r.', show: '$r = \\dfrac{360.875}{\\sqrt{84.875 \\times 1540.875}} = 0.998$' } ] },
        { l: 'b', marks: 1, q: 'Interpret your value of $r$ in context.',
          answer: 'Very strong positive correlation: students who revised longer tended to score higher',
          ms: ['B1 strong positive correlation in context'],
          steps: [
            { say: 'r is very close to plus 1.', show: '$r = 0.998$' },
            { say: 'That shows very strong positive linear correlation.', show: 'very strong positive correlation' },
            { say: 'In context: more hours of revision went with higher marks.', show: 'more revision, higher marks' } ] },
        { l: 'c', marks: 1, q: 'A teacher says this proves that revising causes higher marks. Comment on this claim.',
          answer: 'Correlation does not imply causation; other factors (e.g. ability, interest) may affect both',
          ms: ['B1 correlation does not imply causation, with a reason'],
          steps: [
            { say: 'Correlation only shows the two variables move together.', show: 'association' },
            { say: 'A third factor, such as interest in the subject, could lead to both more revision and higher marks.', show: 'possible third factor' },
            { say: 'So correlation alone does not prove causation.', show: 'correlation does not imply causation' } ] } ] },

    { n: 9, section: 'B', points: ['m2_prob', 'm2_tree'],
      parts: [
        { l: 'a', marks: 2, q: 'In a group of 80 students, 45 study Biology, 30 study Chemistry and 15 study both. Find the number of students in each region of a Venn diagram for Biology (B) and Chemistry (C).',
          answer: 'B only 30, both 15, C only 15, neither 20',
          ms: ['M1 B only $= 30$, C only $= 15$', 'A1 neither $= 20$'],
          steps: [
            { say: 'Start with the overlap: 15 study both.', show: '$B \\cap C$: 15' },
            { say: 'Biology only is 45 minus 15, and Chemistry only is 30 minus 15.', show: 'B only: 30, C only: 15' },
            { say: 'The rest study neither: 80 minus 60.', show: 'neither: 20' } ] },
        { l: 'b', marks: 2, q: 'A student is chosen at random. Find $P(B \\cup C)$ and the probability that the student studies neither subject.',
          answer: '$0.75$; $0.25$',
          ms: ['B1 $P(B \\cup C) = \\frac{60}{80} = 0.75$', 'B1 $0.25$'],
          steps: [
            { say: 'B union C means Biology or Chemistry or both: 30 plus 15 plus 15.', show: '$P(B \\cup C) = \\dfrac{60}{80} = 0.75$' },
            { say: 'Neither is the complement.', show: '$1 - 0.75 = 0.25$' },
            { say: 'Check against the Venn diagram: 20 out of 80.', show: '$\\dfrac{20}{80} = 0.25$ ✓' } ] },
        { l: 'c', marks: 2, q: 'Determine whether the events B and C are independent.',
          answer: 'Not independent: $P(B)P(C) = 0.211 \\ne 0.1875$',
          ms: ['M1 compare $P(B)P(C)$ with $P(B \\cap C)$', 'A1 $0.211 \\ne 0.1875$, not independent'],
          steps: [
            { say: 'Events are independent if the probability of both equals the product of the separate probabilities.', show: '$P(B \\cap C) = P(B)P(C)$?' },
            { say: 'Compute the product.', show: '$\\dfrac{45}{80} \\times \\dfrac{30}{80} = 0.2109$' },
            { say: 'The probability of both is 15 over 80, which is 0.1875. They differ, so B and C are not independent.', show: '$0.1875 \\ne 0.2109 \\Rightarrow$ not independent' } ] },
        { l: 'd', marks: 3, q: 'A bag contains 5 red and 3 blue counters. Two counters are taken at random without replacement. Find the probability that they are different colours.',
          answer: '$\\frac{15}{28}$',
          ms: ['M1 $\\frac58 \\times \\frac37$', 'M1 add both orders', 'A1 $\\frac{15}{28}$'],
          steps: [
            { say: 'Draw a tree. Red then blue: 5 over 8 times 3 over 7.', show: '$P(RB) = \\tfrac58 \\times \\tfrac37 = \\tfrac{15}{56}$' },
            { say: 'Blue then red: 3 over 8 times 5 over 7.', show: '$P(BR) = \\tfrac38 \\times \\tfrac57 = \\tfrac{15}{56}$' },
            { say: 'Add the two branches.', show: '$\\tfrac{30}{56} = \\tfrac{15}{28}$' } ] } ] },

    { n: 10, section: 'B', points: ['m2_bin'],
      q: 'Each seed of a certain type germinates with probability 0.8, independently of the others. A gardener plants 10 seeds. $X$ is the number that germinate.',
      parts: [
        { l: 'a', marks: 2, q: 'Find $P(X = 8)$.',
          answer: '$0.302$',
          ms: ['M1 $\\binom{10}{8}(0.8)^8(0.2)^2$', 'A1 $0.302$'],
          steps: [
            { say: 'X follows a binomial distribution with n equals 10 and p equals 0.8.', show: '$X \\sim B(10, 0.8)$' },
            { say: 'Use the binomial formula.', show: '$P(X = 8) = \\binom{10}{8}(0.8)^8(0.2)^2$' },
            { say: 'Evaluate: 45 times 0.16777 times 0.04.', show: '$= 0.302$' } ] },
        { l: 'b', marks: 3, q: 'Find the probability that at least 9 seeds germinate.',
          answer: '$0.376$',
          ms: ['M1 $P(X = 9) + P(X = 10)$', 'A1 $0.2684 + 0.1074$', 'A1 $0.376$'],
          steps: [
            { say: 'At least 9 means 9 or 10.', show: '$P(X \\ge 9) = P(X = 9) + P(X = 10)$' },
            { say: 'Find each.', show: '$10(0.8)^9(0.2) = 0.2684,\\quad (0.8)^{10} = 0.1074$' },
            { say: 'Add.', show: '$P(X \\ge 9) = 0.376$' } ] },
        { l: 'c', marks: 2, q: 'State two assumptions needed for the binomial model to be valid here.',
          answer: 'Seeds germinate independently; the probability 0.8 is the same for every seed (fixed number of trials, two outcomes)',
          ms: ['B1 independence', 'B1 constant probability (or fixed $n$ / two outcomes)'],
          steps: [
            { say: 'There must be a fixed number of trials, here 10 seeds, each with two outcomes.', show: 'fixed $n = 10$; germinate or not' },
            { say: 'Each seed must germinate independently of the others.', show: 'independent trials' },
            { say: 'And the probability must be the same for every seed.', show: 'constant $p = 0.8$' } ] } ] }
  ]
});

BCSP.add({
  id: 'm2-medium', unit: 'm2', level: 'medium',
  title: 'Maths AS 2 · Paper B (Medium)', minutes: 75, calc: true,
  sections: [{ id: 'A', title: 'Section A: Mechanics', marks: 35 }, { id: 'B', title: 'Section B: Statistics', marks: 35 }],
  questions: [
    { n: 1, section: 'A', points: ['m2_suvat', 'm2_kgraph'],
      q: '<b>Section A: Mechanics.</b> Take $g = 9.8$ m s⁻².<br>Car A passes a point P travelling at a constant 20 m s⁻¹. At that instant car B starts from rest at P and moves in the same direction with constant acceleration 2.5 m s⁻².',
      parts: [
        { l: 'a', marks: 3, q: 'Find the time taken for B to catch up with A.',
          answer: '$16$ s',
          ms: ['M1 $s_A = 20t$, $s_B = 1.25t^2$', 'M1 equate', 'A1 $t = 16$ s'],
          steps: [
            { say: 'Car A moves at constant speed, so its distance is 20t.', show: '$s_A = 20t$' },
            { say: 'Car B starts from rest, so its distance is a half times 2.5 times t squared.', show: '$s_B = 1.25t^2$' },
            { say: 'B catches A when the distances are equal.', show: '$1.25t^2 = 20t \\Rightarrow t(1.25t - 20) = 0$' },
            { say: 'Ignore t equals zero.', show: '$t = 16$ s' } ] },
        { l: 'b', marks: 2, q: 'Find the distance from P at which this happens, and the speed of B at that moment.',
          answer: '$320$ m; $40$ m s⁻¹',
          ms: ['B1 $320$ m', 'B1 $40$ m s⁻¹'],
          steps: [
            { say: 'Distance travelled by A in 16 seconds.', show: '$20 \\times 16 = 320$ m' },
            { say: 'Speed of B using v equals u plus a t.', show: '$v = 0 + 2.5 \\times 16 = 40$ m s⁻¹' },
            { say: 'B is now going twice as fast as A.', show: '$40 = 2 \\times 20$' } ] },
        { l: 'c', marks: 3, q: 'Find the greatest distance between the cars before B catches A.',
          answer: '$80$ m',
          ms: ['M1 greatest gap when speeds equal', 'A1 $t = 8$', 'A1 $80$ m'],
          steps: [
            { say: 'While A is faster the gap grows; once B is faster it shrinks. So the gap is greatest when the speeds are equal.', show: '$2.5t = 20$' },
            { say: 'That happens at t equals 8 seconds.', show: '$t = 8$ s' },
            { say: 'Find the gap.', show: '$20(8) - 1.25(8^2) = 160 - 80 = 80$ m' } ] } ] },

    { n: 2, section: 'A', points: ['m2_grav', 'm2_suvat'],
      q: 'A ball is thrown vertically upwards at 7 m s⁻¹ from a balcony 21 m above the ground. It falls past the balcony to the ground.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the time from throwing until the ball hits the ground.',
          answer: '$2.90$ s',
          ms: ['M1 $s = ut + \\frac12at^2$ with $s = -21$', 'A1 $4.9t^2 - 7t - 21 = 0$', 'M1 quadratic formula', 'A1 $2.90$ s'],
          steps: [
            { say: 'Take up as positive with the balcony as origin. The ground is 21 metres below, so s is minus 21.', show: '$u = 7,\\ a = -9.8,\\ s = -21$' },
            { say: 'Use s equals u t plus a half a t squared.', show: '$-21 = 7t - 4.9t^2$' },
            { say: 'Rearrange into a quadratic.', show: '$4.9t^2 - 7t - 21 = 0$' },
            { say: 'Use the formula and take the positive root.', show: '$t = \\dfrac{7 + \\sqrt{49 + 411.6}}{9.8} = 2.90$ s' } ] },
        { l: 'b', marks: 2, q: 'Find the speed of the ball as it hits the ground.',
          answer: '$21.5$ m s⁻¹',
          ms: ['M1 $v^2 = 7^2 + 2(9.8)(21)$', 'A1 $21.5$ m s⁻¹'],
          steps: [
            { say: 'Use v squared equals u squared plus 2 a s. Both a and s are negative, so the product is positive.', show: '$v^2 = 49 + 2(-9.8)(-21) = 460.6$' },
            { say: 'Square root.', show: '$v = 21.46$' },
            { say: 'The speed is about 21.5 metres per second.', show: '$21.5$ m s⁻¹' } ] } ] },

    { n: 3, section: 'A', points: ['m2_n2', 'm2_vec2', 'm2_force'],
      q: 'A particle of mass 0.5 kg is acted on by two forces, $(3\\mathbf i - 2\\mathbf j)$ N and $(p\\mathbf i + q\\mathbf j)$ N. The particle has acceleration $(4\\mathbf i + 6\\mathbf j)$ m s⁻².',
      parts: [
        { l: 'a', marks: 3, q: 'Find the values of $p$ and $q$.',
          answer: '$p = -1,\\ q = 5$',
          ms: ['M1 $\\mathbf F = m\\mathbf a = 2\\mathbf i + 3\\mathbf j$', 'A1 $p = -1$', 'A1 $q = 5$'],
          steps: [
            { say: 'The resultant force is mass times acceleration.', show: '$\\mathbf F = 0.5(4\\mathbf i + 6\\mathbf j) = 2\\mathbf i + 3\\mathbf j$' },
            { say: 'Match the i components.', show: '$3 + p = 2 \\Rightarrow p = -1$' },
            { say: 'Match the j components.', show: '$-2 + q = 3 \\Rightarrow q = 5$' } ] },
        { l: 'b', marks: 3, q: 'The particle starts from rest at the origin. Find its distance from the origin after 2 s.',
          answer: '$14.4$ m',
          ms: ['M1 $\\mathbf r = \\frac12\\mathbf at^2$', 'A1 $8\\mathbf i + 12\\mathbf j$', 'A1 $14.4$ m'],
          steps: [
            { say: 'Starting from rest at the origin, the position is a half a t squared.', show: '$\\mathbf r = \\tfrac12(4\\mathbf i + 6\\mathbf j)(2^2)$' },
            { say: 'Simplify.', show: '$\\mathbf r = 8\\mathbf i + 12\\mathbf j$' },
            { say: 'Distance is the magnitude.', show: '$\\sqrt{64 + 144} = \\sqrt{208} = 14.4$ m' } ] } ] },

    { n: 4, section: 'A', points: ['m2_fric', 'm2_lim', 'm2_equil', 'm2_force'],
      q: 'A box of mass 5 kg lies on rough horizontal ground. The coefficient of friction between the box and the ground is 0.4. A force of magnitude $P$ N is applied to the box at $30^\\circ$ above the horizontal.',
      parts: [
        { l: 'a', marks: 5, q: 'Given that the box is on the point of moving, find $P$.',
          answer: '$P = 18.4$',
          ms: ['M1 resolve vertically: $R + P\\sin30^\\circ = 5g$', 'M1 resolve horizontally: $P\\cos30^\\circ = F$', 'M1 $F = \\mu R$ (limiting)', 'A1 $P\\cos30^\\circ = 0.4(49 - 0.5P)$', 'A1 $P = 18.4$'],
          steps: [
            { say: 'Resolve vertically. The force P pulls partly upwards, so it reduces the reaction.', show: '$R = 5g - P\\sin30^\\circ = 49 - 0.5P$' },
            { say: 'Resolve horizontally. On the point of moving, friction is limiting and balances the pull.', show: '$P\\cos30^\\circ = \\mu R$' },
            { say: 'Substitute for R.', show: '$0.866P = 0.4(49 - 0.5P) = 19.6 - 0.2P$' },
            { say: 'Collect the P terms.', show: '$1.066P = 19.6$' },
            { say: 'Solve.', show: '$P = 18.4$' } ] },
        { l: 'b', marks: 4, q: 'The force is increased to 25 N, still at $30^\\circ$ to the horizontal. Find the acceleration of the box.',
          answer: '$1.41$ m s⁻²',
          ms: ['M1 $R = 49 - 12.5 = 36.5$', 'M1 $F = 0.4 \\times 36.5 = 14.6$', 'M1 $25\\cos30^\\circ - 14.6 = 5a$', 'A1 $1.41$ m s⁻²'],
          steps: [
            { say: 'Find the new reaction.', show: '$R = 49 - 25\\sin30^\\circ = 36.5$ N' },
            { say: 'The box is sliding, so friction is mu R.', show: '$F = 0.4 \\times 36.5 = 14.6$ N' },
            { say: 'Newton’s second law horizontally.', show: '$25\\cos30^\\circ - 14.6 = 5a$' },
            { say: 'Evaluate.', show: '$21.65 - 14.6 = 5a \\Rightarrow a = 1.41$ m s⁻²' } ] } ] },

    { n: 5, section: 'A', points: ['m2_conn', 'm2_n2'],
      q: 'A car of mass 1200 kg tows a trailer of mass 400 kg along a straight horizontal road using a light rigid towbar. The car’s engine provides a driving force of 2400 N. Resistances to motion are 300 N on the car and 100 N on the trailer.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the acceleration of the car and trailer.',
          answer: '$1.25$ m s⁻²',
          ms: ['M1 whole system: $2400 - 400 = 1600a$', 'A1 correct equation', 'A1 $1.25$ m s⁻²'],
          steps: [
            { say: 'Treat the car and trailer as one body. The tension is internal and cancels.', show: 'total mass $1600$ kg' },
            { say: 'Resultant force is driving force minus all resistances.', show: '$2400 - 300 - 100 = 1600a$' },
            { say: 'Solve.', show: '$a = \\dfrac{2000}{1600} = 1.25$ m s⁻²' } ] },
        { l: 'b', marks: 2, q: 'Find the tension in the towbar.',
          answer: '$600$ N',
          ms: ['M1 trailer: $T - 100 = 400a$', 'A1 $600$ N'],
          steps: [
            { say: 'Consider the trailer alone. The towbar pulls it forward, and resistance acts backwards.', show: '$T - 100 = 400(1.25)$' },
            { say: 'Solve.', show: '$T = 500 + 100 = 600$ N' },
            { say: 'Check with the car: 2400 minus 300 minus 600 is 1500, which is 1200 times 1.25.', show: '$1500 = 1200 \\times 1.25$ ✓' } ] },
        { l: 'c', marks: 1, q: 'State the magnitude and direction of the force exerted by the towbar on the car.',
          answer: '600 N, backwards (opposite to the motion)',
          ms: ['B1 600 N backwards, by Newton’s third law'],
          steps: [
            { say: 'The towbar pulls the trailer forward with 600 newtons.', show: 'on trailer: 600 N forward' },
            { say: 'By Newton’s third law, it pulls the car with an equal and opposite force.', show: 'equal and opposite' },
            { say: 'So the force on the car is 600 newtons backwards.', show: 'on car: 600 N backwards' } ] } ] },

    { n: 6, section: 'B', points: ['m2_diag', 'm2_samp'],
      q: '<b>Section B: Statistics.</b><br>The times, $t$ minutes, that 100 customers spent in a shop are summarised below.<br><table><tr><th>Time $t$</th><td>$0 \\le t \\lt 10$</td><td>$10 \\le t \\lt 15$</td><td>$15 \\le t \\lt 20$</td><td>$20 \\le t \\lt 30$</td><td>$30 \\le t \\lt 50$</td></tr><tr><th>Frequency</th><td>12</td><td>18</td><td>25</td><td>30</td><td>15</td></tr></table>',
      parts: [
        { l: 'a', marks: 2, q: 'Calculate the frequency densities needed to draw a histogram of these data.',
          answer: '$1.2,\\ 3.6,\\ 5,\\ 3,\\ 0.75$',
          ms: ['M1 frequency ÷ class width', 'A1 all five correct'],
          steps: [
            { say: 'In a histogram the area of each bar represents frequency, so the height is frequency density: frequency divided by class width.', show: '$\\text{fd} = \\dfrac{\\text{frequency}}{\\text{class width}}$' },
            { say: 'The class widths are 10, 5, 5, 10 and 20.', show: '$\\tfrac{12}{10},\\ \\tfrac{18}{5},\\ \\tfrac{25}{5},\\ \\tfrac{30}{10},\\ \\tfrac{15}{20}$' },
            { say: 'Evaluate.', show: '$1.2,\\ 3.6,\\ 5,\\ 3,\\ 0.75$' } ] },
        { l: 'b', marks: 2, q: 'Estimate the number of customers who spent between 18 and 25 minutes in the shop.',
          answer: '$25$',
          ms: ['M1 $5 \\times 2 + 3 \\times 5$', 'A1 $25$'],
          steps: [
            { say: 'Assume customers are spread evenly within each class. From 18 to 20 is 2 minutes of the 15 to 20 class.', show: '$5 \\times 2 = 10$' },
            { say: 'From 20 to 25 is 5 minutes of the 20 to 30 class.', show: '$3 \\times 5 = 15$' },
            { say: 'Add.', show: '$10 + 15 = 25$ customers' } ] },
        { l: 'c', marks: 1, q: 'The data were collected from the first 100 customers on a Monday morning. Explain why this sample may not be representative of all customers.',
          answer: 'e.g. weekday morning shoppers may behave differently from weekend or evening shoppers',
          ms: ['B1 valid reason in context'],
          steps: [
            { say: 'This is a convenience sample taken at one particular time.', show: 'convenience sample' },
            { say: 'Customers on a Monday morning may be different, for example retired people with more time.', show: 'one time of week only' },
            { say: 'So the times may not reflect customers at weekends or in the evening.', show: 'may be biased' } ] } ] },

    { n: 7, section: 'B', points: ['m2_spread'],
      q: 'A machine fills bags of flour. The masses, $x$ grams, of a random sample of 20 bags are summarised by $\\sum x = 9020$ and $\\sum x^2 = 4\\,068\\,400$.',
      parts: [
        { l: 'a', marks: 4, q: 'Calculate the mean and the sample standard deviation $s$ of the masses, where $s^2 = \\dfrac{\\sum x^2 - n\\bar x^2}{n - 1}$.',
          answer: 'mean $451$ g, $s = 4.47$ g',
          ms: ['B1 mean $451$', 'M1 $\\sum x^2 - 20(451^2) = 380$', 'M1 $s^2 = \\frac{380}{19} = 20$', 'A1 $s = 4.47$'],
          steps: [
            { say: 'The mean is the total divided by 20.', show: '$\\bar x = \\dfrac{9020}{20} = 451$' },
            { say: 'Work out n times the mean squared.', show: '$20 \\times 451^2 = 4\\,068\\,020$' },
            { say: 'Subtract from the sum of squares and divide by n minus 1, which is 19.', show: '$s^2 = \\dfrac{4\\,068\\,400 - 4\\,068\\,020}{19} = \\dfrac{380}{19} = 20$' },
            { say: 'Square root.', show: '$s = \\sqrt{20} = 4.47$ g' } ] },
        { l: 'b', marks: 2, q: 'One further bag, of mass 456 g, is added to the sample. Find the new mean.',
          answer: '$451.2$ g',
          ms: ['M1 $\\frac{9020 + 456}{21}$', 'A1 $451.2$'],
          steps: [
            { say: 'Add the new mass to the total and divide by 21.', show: '$\\dfrac{9020 + 456}{21} = \\dfrac{9476}{21}$' },
            { say: 'Evaluate.', show: '$= 451.24$' },
            { say: 'The mean rises slightly, because 456 is above the old mean.', show: '$451.2$ g' } ] },
        { l: 'c', marks: 2, q: 'A second machine has mean 449 g and standard deviation 7.8 g. Compare the two machines.',
          answer: 'First machine has higher mean and much less variation, so it is more consistent',
          ms: ['B1 compare means in context', 'B1 compare spread in context'],
          steps: [
            { say: 'Compare the averages: the first machine fills bags slightly heavier on average.', show: '$451 \\gt 449$' },
            { say: 'Compare the spread: the first machine has a much smaller standard deviation.', show: '$4.47 \\lt 7.8$' },
            { say: 'So the first machine is more consistent.', show: 'first machine more consistent' } ] } ] },

    { n: 8, section: 'B', points: ['m2_corr'],
      q: 'For a sample of 12 adults, the age $x$ years and the time $y$ seconds taken to complete a reaction game were recorded. The results give $S_{xx} = 120$, $S_{yy} = 300$ and $S_{xy} = -171$.',
      parts: [
        { l: 'a', marks: 2, q: 'Calculate the product moment correlation coefficient.',
          answer: '$r = -0.901$',
          ms: ['M1 $\\frac{-171}{\\sqrt{120 \\times 300}}$', 'A1 $-0.901$'],
          steps: [
            { say: 'Use r equals S x y over the square root of S x x times S y y.', show: '$r = \\dfrac{-171}{\\sqrt{120 \\times 300}}$' },
            { say: 'The denominator is the square root of 36 000.', show: '$\\sqrt{36000} = 189.7$' },
            { say: 'Divide.', show: '$r = -0.901$' } ] },
        { l: 'b', marks: 2, q: 'Interpret this value in context.',
          answer: 'Strong negative correlation: older adults in the sample tended to take less time',
          ms: ['B1 strong negative', 'B1 in context'],
          steps: [
            { say: 'r is close to minus 1, so there is strong negative linear correlation.', show: '$r = -0.901$' },
            { say: 'Negative means as one goes up, the other tends to go down.', show: 'age up, time down' },
            { say: 'So older adults in this sample tended to complete the game faster.', show: 'older, faster' } ] },
        { l: 'c', marks: 2, q: 'A scatter diagram shows that the 12 adults form two separate clusters: six aged under 25 and six aged over 50. Explain why this means the value of $r$ should be treated with caution.',
          answer: 'The correlation may come from the difference between two groups, not a trend within each group',
          ms: ['B1 two distinct sub-populations', 'B1 within each group there may be little or no correlation'],
          steps: [
            { say: 'The data come from two distinct sections of the population.', show: 'two clusters' },
            { say: 'A strong r can arise just because one cluster is higher than the other.', show: 'between-group difference' },
            { say: 'Within each group there may be little or no correlation, so r is misleading.', show: 'treat $r$ with caution' } ] } ] },

    { n: 9, section: 'B', points: ['m2_tree', 'm2_prob'],
      q: 'A student travels to school by walking, bus or car with probabilities 0.3, 0.5 and 0.2 respectively. The probability of being late is 0.1 when walking, 0.15 by bus and 0.05 by car.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the probability that the student is late on a given day.',
          answer: '$0.115$',
          ms: ['M1 tree diagram / products', 'M1 sum of three products', 'A1 $0.115$'],
          steps: [
            { say: 'Draw a tree: first the mode of travel, then late or not late.', show: 'walk, bus, car → late, not late' },
            { say: 'Multiply along each branch that ends in late.', show: '$0.3 \\times 0.1 = 0.03,\\ 0.5 \\times 0.15 = 0.075,\\ 0.2 \\times 0.05 = 0.01$' },
            { say: 'Add them.', show: '$P(\\text{late}) = 0.115$' } ] },
        { l: 'b', marks: 3, q: 'Assuming days are independent, find the probability that the student is late on exactly one of two days.',
          answer: '$0.204$',
          ms: ['M1 $0.115 \\times 0.885$', 'M1 times 2', 'A1 $0.204$'],
          steps: [
            { say: 'The probability of not being late is 1 minus 0.115.', show: '$0.885$' },
            { say: 'Late then on time, or on time then late.', show: '$0.115 \\times 0.885 + 0.885 \\times 0.115$' },
            { say: 'Evaluate.', show: '$= 0.20355 \\approx 0.204$' } ] },
        { l: 'c', marks: 3, q: 'Events A and B have $P(A) = 0.4$, $P(B) = 0.35$ and $P(A \\cup B) = 0.61$. Determine whether A and B are independent.',
          answer: 'Independent: $P(A \\cap B) = 0.14 = P(A)P(B)$',
          ms: ['M1 addition law', 'A1 $P(A \\cap B) = 0.14$', 'A1 $0.4 \\times 0.35 = 0.14$, so independent'],
          steps: [
            { say: 'Use the addition law to find the probability of both.', show: '$P(A \\cap B) = P(A) + P(B) - P(A \\cup B)$' },
            { say: 'Substitute.', show: '$= 0.4 + 0.35 - 0.61 = 0.14$' },
            { say: 'Compare with the product.', show: '$P(A)P(B) = 0.4 \\times 0.35 = 0.14$' },
            { say: 'They are equal, so A and B are independent.', show: 'independent' } ] } ] },

    { n: 10, section: 'B', points: ['m2_bin'],
      q: 'Light bulbs are packed in boxes of 15. The probability that a bulb is faulty is 0.2, independently of other bulbs. $X$ is the number of faulty bulbs in a box.',
      parts: [
        { l: 'a', marks: 2, q: 'Find $P(X = 3)$.',
          answer: '$0.250$',
          ms: ['M1 $\\binom{15}{3}(0.2)^3(0.8)^{12}$', 'A1 $0.250$'],
          steps: [
            { say: 'X follows B of 15 and 0.2.', show: '$X \\sim B(15, 0.2)$' },
            { say: 'Use the binomial formula.', show: '$P(X = 3) = \\binom{15}{3}(0.2)^3(0.8)^{12}$' },
            { say: '455 times 0.008 times 0.0687.', show: '$= 0.250$' } ] },
        { l: 'b', marks: 3, q: 'Find $P(X \\le 2)$.',
          answer: '$0.398$',
          ms: ['M1 $P(0) + P(1) + P(2)$', 'A1 $0.0352 + 0.1319 + 0.2309$', 'A1 $0.398$'],
          steps: [
            { say: 'At most 2 means 0, 1 or 2.', show: '$P(X \\le 2) = P(0) + P(1) + P(2)$' },
            { say: 'Work out each term.', show: '$0.8^{15} = 0.0352,\\ 15(0.2)(0.8)^{14} = 0.1319,\\ 105(0.2)^2(0.8)^{13} = 0.2309$' },
            { say: 'Add.', show: '$P(X \\le 2) = 0.398$' } ] },
        { l: 'c', marks: 2, q: 'A shop buys 4 boxes. Find the probability that every box contains at most 2 faulty bulbs.',
          answer: '$0.0251$',
          ms: ['M1 $(0.398)^4$', 'A1 $0.0251$'],
          steps: [
            { say: 'Boxes are independent, so multiply the probability for each box.', show: '$P = (0.39802)^4$' },
            { say: 'Evaluate using the unrounded value.', show: '$= 0.0251$' },
            { say: 'This is small: it is unlikely that all four boxes are this good.', show: '$0.0251$' } ] } ] }
  ]
});

BCSP.add({
  id: 'm2-hard', unit: 'm2', level: 'hard',
  title: 'Maths AS 2 · Paper C (Hard)', minutes: 75, calc: true,
  sections: [{ id: 'A', title: 'Section A: Mechanics', marks: 35 }, { id: 'B', title: 'Section B: Statistics', marks: 35 }],
  questions: [
    { n: 1, section: 'A', points: ['m2_kgraph', 'm2_suvat'],
      q: '<b>Section A: Mechanics.</b> Take $g = 9.8$ m s⁻².<br>A train travels between two stations 3.2 km apart, starting and finishing at rest. It accelerates uniformly at 0.5 m s⁻² to a maximum speed of 20 m s⁻¹, travels at this speed, then decelerates uniformly at 0.8 m s⁻² to rest.',
      parts: [
        { l: 'a', marks: 5, q: 'Find the total time taken for the journey.',
          answer: '$192.5$ s',
          ms: ['M1 times 40 s and 25 s', 'A1 distances 400 m and 250 m', 'M1 constant-speed distance $3200 - 650$', 'A1 $127.5$ s', 'A1 $192.5$ s'],
          steps: [
            { say: 'Acceleration phase: time is 20 divided by 0.5, and distance is the area of a triangle.', show: '$t_1 = 40$ s, $s_1 = \\tfrac12(40)(20) = 400$ m' },
            { say: 'Deceleration phase: time is 20 divided by 0.8.', show: '$t_3 = 25$ s, $s_3 = \\tfrac12(25)(20) = 250$ m' },
            { say: 'The rest of the 3200 metres is at constant speed.', show: '$s_2 = 3200 - 650 = 2550$ m' },
            { say: 'Time at constant speed.', show: '$t_2 = \\dfrac{2550}{20} = 127.5$ s' },
            { say: 'Add the three times.', show: '$40 + 127.5 + 25 = 192.5$ s' } ] },
        { l: 'b', marks: 4, q: 'On another day there is no speed limit. The train accelerates at 0.5 m s⁻² and then immediately decelerates at 0.8 m s⁻² to stop at the second station. Find the maximum speed reached and the journey time.',
          answer: '$44.4$ m s⁻¹; $144$ s',
          ms: ['M1 $\\frac{V^2}{2(0.5)} + \\frac{V^2}{2(0.8)} = 3200$', 'A1 $V = 44.4$', 'M1 $\\frac{V}{0.5} + \\frac{V}{0.8}$', 'A1 $144$ s'],
          steps: [
            { say: 'Let the top speed be V. Using v squared equals 2 a s for each phase, the distances are V squared over 1 and V squared over 1.6.', show: '$\\dfrac{V^2}{1} + \\dfrac{V^2}{1.6} = 3200$' },
            { say: 'Solve for V.', show: '$1.625V^2 = 3200 \\Rightarrow V = 44.4$ m s⁻¹' },
            { say: 'Each time is V divided by the acceleration.', show: '$t = \\dfrac{44.38}{0.5} + \\dfrac{44.38}{0.8} = 88.75 + 55.47$' },
            { say: 'Add.', show: '$t = 144$ s' } ] } ] },

    { n: 2, section: 'A', points: ['m2_grav', 'm2_suvat'],
      q: 'Ball A is projected vertically upwards from ground level with speed 24.5 m s⁻¹. At the same instant ball B is released from rest at a point 49 m vertically above A.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the time at which the balls collide.',
          answer: '$2$ s',
          ms: ['M1 $s_A = 24.5t - 4.9t^2$', 'M1 $s_B = 4.9t^2$ (distance fallen)', 'M1 $s_A + s_B = 49$', 'A1 $t = 2$'],
          steps: [
            { say: 'Height of A above the ground.', show: '$h_A = 24.5t - 4.9t^2$' },
            { say: 'Distance fallen by B.', show: '$d_B = 4.9t^2$' },
            { say: 'They meet when the height of A plus the distance B has fallen equals 49.', show: '$24.5t - 4.9t^2 + 4.9t^2 = 49$' },
            { say: 'The t squared terms cancel.', show: '$24.5t = 49 \\Rightarrow t = 2$ s' } ] },
        { l: 'b', marks: 1, q: 'Find the height above the ground at which they collide.',
          answer: '$29.4$ m',
          ms: ['B1 $29.4$ m'],
          steps: [
            { say: 'Substitute t equals 2 into the height of A.', show: '$h = 24.5(2) - 4.9(4)$' },
            { say: 'Evaluate.', show: '$= 49 - 19.6 = 29.4$ m' },
            { say: 'Check with B: it has fallen 19.6 metres from 49.', show: '$49 - 19.6 = 29.4$ ✓' } ] },
        { l: 'c', marks: 2, q: 'Determine whether A is moving upwards or downwards at the moment of collision.',
          answer: 'Upwards, at 4.9 m s⁻¹',
          ms: ['M1 $v = 24.5 - 9.8(2)$', 'A1 $4.9 \\gt 0$, upwards'],
          steps: [
            { say: 'Use v equals u plus a t for A.', show: '$v = 24.5 - 9.8(2)$' },
            { say: 'Evaluate.', show: '$v = 4.9$ m s⁻¹' },
            { say: 'It is positive, so A is still moving upwards.', show: 'upwards' } ] } ] },

    { n: 3, section: 'A', points: ['m2_vec2', 'm2_n2'],
      q: 'A particle P of mass 2 kg is initially at rest at the point with position vector $(\\mathbf i + 2\\mathbf j)$ m. It is acted on by a constant force $(6\\mathbf i - 8\\mathbf j)$ N.',
      parts: [
        { l: 'a', marks: 2, q: 'Find the magnitude of the acceleration of P.',
          answer: '$5$ m s⁻²',
          ms: ['M1 $\\mathbf a = 3\\mathbf i - 4\\mathbf j$', 'A1 $5$ m s⁻²'],
          steps: [
            { say: 'Divide the force by the mass.', show: '$\\mathbf a = \\dfrac{6\\mathbf i - 8\\mathbf j}{2} = 3\\mathbf i - 4\\mathbf j$' },
            { say: 'Find its magnitude.', show: '$|\\mathbf a| = \\sqrt{9 + 16}$' },
            { say: 'It is 5 metres per second squared.', show: '$5$ m s⁻²' } ] },
        { l: 'b', marks: 2, q: 'Find the position vector of P at time $t$ seconds.',
          answer: '$\\mathbf r = (1 + 1.5t^2)\\mathbf i + (2 - 2t^2)\\mathbf j$',
          ms: ['M1 $\\mathbf r = \\mathbf r_0 + \\frac12\\mathbf at^2$', 'A1 correct'],
          steps: [
            { say: 'Start position plus u t plus a half a t squared. u is zero.', show: '$\\mathbf r = (\\mathbf i + 2\\mathbf j) + \\tfrac12(3\\mathbf i - 4\\mathbf j)t^2$' },
            { say: 'Collect the i and j parts.', show: '$\\mathbf r = (1 + 1.5t^2)\\mathbf i + (2 - 2t^2)\\mathbf j$' },
            { say: 'Check at t equals zero: it gives the starting point.', show: '$t = 0: \\mathbf i + 2\\mathbf j$ ✓' } ] },
        { l: 'c', marks: 2, q: 'Find the position vector of P when it is due east of the origin (taking $\\mathbf j$ as north).',
          answer: '$2.5\\mathbf i$ m (at $t = 1$)',
          ms: ['M1 $2 - 2t^2 = 0$', 'A1 $t = 1$, $2.5\\mathbf i$'],
          steps: [
            { say: 'Due east of the origin means the j component is zero and the i component is positive.', show: '$2 - 2t^2 = 0$' },
            { say: 'So t is 1.', show: '$t = 1$' },
            { say: 'Then the i component is 2.5.', show: '$\\mathbf r = 2.5\\mathbf i$' } ] },
        { l: 'd', marks: 2, q: 'Find the speed of P when it has moved 10 m from its starting point.',
          answer: '$10$ m s⁻¹',
          ms: ['M1 $\\frac12(5)t^2 = 10 \\Rightarrow t = 2$', 'A1 $10$ m s⁻¹'],
          steps: [
            { say: 'P starts from rest and moves in a straight line in the direction of the force, with acceleration 5.', show: '$10 = \\tfrac12(5)t^2 \\Rightarrow t = 2$' },
            { say: 'Speed is acceleration times time.', show: '$v = 5 \\times 2$' },
            { say: 'Or use v squared equals 2 a s: 2 times 5 times 10 is 100.', show: '$v = 10$ m s⁻¹' } ] } ] },

    { n: 4, section: 'A', points: ['m2_lim', 'm2_fric', 'm2_conn', 'm2_equil'],
      q: 'A particle A of mass 3 kg rests on a rough plane inclined at angle $\\alpha$ to the horizontal, where $\\tan\\alpha = \\frac34$. The coefficient of friction between A and the plane is 0.5. A light inextensible string attached to A runs parallel to a line of greatest slope, over a smooth pulley at the top of the plane, and supports a particle B of mass $m$ kg hanging freely.',
      parts: [
        { l: 'a', marks: 6, q: 'Given that A remains at rest, find the range of possible values of $m$.',
          answer: '$0.6 \\le m \\le 3$',
          ms: ['B1 $\\sin\\alpha = 0.6$, $\\cos\\alpha = 0.8$', 'M1 $R = 3g\\cos\\alpha = 2.4g$, $F_{\\max} = 1.2g$', 'M1 about to slip up: $mg = 3g\\sin\\alpha + F_{\\max}$', 'A1 $m = 3$', 'M1 about to slip down: $mg = 3g\\sin\\alpha - F_{\\max}$', 'A1 $m = 0.6$; $0.6 \\le m \\le 3$'],
          steps: [
            { say: 'From tan alpha equals three quarters, use a 3 4 5 triangle.', show: '$\\sin\\alpha = 0.6,\\quad \\cos\\alpha = 0.8$' },
            { say: 'Perpendicular to the plane, the reaction is 3g cos alpha, so maximum friction is 0.5 times that.', show: '$R = 2.4g,\\quad F_{\\max} = 1.2g$' },
            { say: 'Since B hangs, the tension equals mg. If m is large, A is about to slide up, and friction acts down the slope.', show: '$mg = 3g(0.6) + 1.2g = 3g \\Rightarrow m = 3$' },
            { say: 'If m is small, A is about to slide down, and friction acts up the slope.', show: '$mg = 3g(0.6) - 1.2g = 0.6g \\Rightarrow m = 0.6$' },
            { say: 'A stays at rest for every value in between.', show: '$0.6 \\le m \\le 3$' } ] },
        { l: 'b', marks: 5, q: 'In fact $m = 5$. The system is released from rest. Find the acceleration of the particles and the tension in the string.',
          answer: '$a = 2.45$ m s⁻², $T = 36.75$ N',
          ms: ['M1 B: $5g - T = 5a$', 'M1 A: $T - 3g\\sin\\alpha - 0.5(3g\\cos\\alpha) = 3a$', 'A1 $2g = 8a$', 'A1 $a = 2.45$ m s⁻²', 'A1 $T = 36.75$ N'],
          steps: [
            { say: 'B moves down. Newton’s second law for B.', show: '$5g - T = 5a$' },
            { say: 'A moves up the slope, so friction acts down it.', show: '$T - 3g(0.6) - 1.2g = 3a \\Rightarrow T - 3g = 3a$' },
            { say: 'Add the equations to remove T.', show: '$2g = 8a$' },
            { say: 'Solve for a.', show: '$a = \\dfrac{19.6}{8} = 2.45$ m s⁻²' },
            { say: 'Find the tension from B’s equation.', show: '$T = 5(9.8 - 2.45) = 36.75$ N' } ] } ] },

    { n: 5, section: 'B', points: ['m2_spread', 'm2_samp'],
      q: '<b>Section B: Statistics.</b><br>Two classes sat the same test. Class A: 12 students, mean 64, standard deviation 5. Class B: 8 students, mean 59, standard deviation 4. (Standard deviations are population values.)',
      parts: [
        { l: 'a', marks: 2, q: 'Find the mean mark of all 20 students.',
          answer: '$62$',
          ms: ['M1 $\\frac{12(64) + 8(59)}{20}$', 'A1 $62$'],
          steps: [
            { say: 'Find each class total by multiplying the mean by the number of students.', show: '$12 \\times 64 = 768,\\quad 8 \\times 59 = 472$' },
            { say: 'Add and divide by 20.', show: '$\\dfrac{768 + 472}{20} = \\dfrac{1240}{20}$' },
            { say: 'The combined mean is 62.', show: '$62$' } ] },
        { l: 'b', marks: 5, q: 'Find the standard deviation of the marks of all 20 students.',
          answer: '$5.23$',
          ms: ['M1 $\\sum x^2 = n(\\sigma^2 + \\bar x^2)$', 'A1 Class A: $49\\,452$', 'A1 Class B: $27\\,976$', 'M1 $\\sqrt{\\frac{77\\,428}{20} - 62^2}$', 'A1 $5.23$'],
          steps: [
            { say: 'Rearrange the variance formula: the sum of squares is n times the variance plus the mean squared.', show: '$\\sum x^2 = n(\\sigma^2 + \\bar x^2)$' },
            { say: 'For class A.', show: '$12(25 + 4096) = 49\\,452$' },
            { say: 'For class B.', show: '$8(16 + 3481) = 27\\,976$' },
            { say: 'Combine and use the variance formula for all 20.', show: '$\\sigma^2 = \\dfrac{77\\,428}{20} - 62^2 = 3871.4 - 3844 = 27.4$' },
            { say: 'Square root.', show: '$\\sigma = 5.23$' } ] },
        { l: 'c', marks: 1, q: 'A teacher wants a sample of 5 of these 20 students that reflects both classes. Suggest a suitable method and state how many to take from each class.',
          answer: 'Stratified sample: 3 from A, 2 from B',
          ms: ['B1 stratified with 3 and 2'],
          steps: [
            { say: 'The two classes are natural strata, so use stratified sampling.', show: 'stratified sampling' },
            { say: 'Class A is 12 out of 20 of the students.', show: '$\\tfrac{12}{20} \\times 5 = 3$' },
            { say: 'Class B gives the remaining 2, chosen at random within each class.', show: '$\\tfrac{8}{20} \\times 5 = 2$' } ] } ] },

    { n: 6, section: 'B', points: ['m2_corr', 'm2_outl'],
      q: 'On 9 days, a café recorded the hours of sunshine $x$ and the number of ice creams sold $y$. The results give<br>$\\sum x = 54$, $\\sum y = 220$, $\\sum x^2 = 384$, $\\sum y^2 = 6480$, $\\sum xy = 1461$.',
      parts: [
        { l: 'a', marks: 3, q: 'Calculate the product moment correlation coefficient for these 9 days.',
          answer: '$r = 0.548$',
          ms: ['M1 $S_{xx} = 60$, $S_{yy} = 1102.2$', 'M1 $S_{xy} = 141$', 'A1 $0.548$'],
          steps: [
            { say: 'Find S x x and S y y.', show: '$S_{xx} = 384 - \\dfrac{54^2}{9} = 60,\\quad S_{yy} = 6480 - \\dfrac{220^2}{9} = 1102.2$' },
            { say: 'Find S x y.', show: '$S_{xy} = 1461 - \\dfrac{54 \\times 220}{9} = 141$' },
            { say: 'Calculate r.', show: '$r = \\dfrac{141}{\\sqrt{60 \\times 1102.2}} = 0.548$' } ] },
        { l: 'b', marks: 4, q: 'On inspection, the entry $(8, 4)$ is found to be a recording error and is removed. Calculate the product moment correlation coefficient for the remaining 8 days.',
          answer: '$r = 0.998$',
          ms: ['M1 adjust all five sums', 'A1 $\\sum x = 46$, $\\sum y = 216$, $\\sum x^2 = 320$, $\\sum y^2 = 6464$, $\\sum xy = 1429$', 'M1 $S_{xx} = 55.5$, $S_{yy} = 632$, $S_{xy} = 187$', 'A1 $0.998$'],
          steps: [
            { say: 'Remove the point 8, 4 from every sum.', show: '$\\sum x = 46,\\ \\sum y = 216,\\ \\sum x^2 = 384 - 64 = 320$' },
            { say: 'And the remaining sums.', show: '$\\sum y^2 = 6480 - 16 = 6464,\\ \\sum xy = 1461 - 32 = 1429$' },
            { say: 'Recalculate with n equal to 8.', show: '$S_{xx} = 320 - \\dfrac{46^2}{8} = 55.5,\\ S_{yy} = 6464 - \\dfrac{216^2}{8} = 632,\\ S_{xy} = 1429 - \\dfrac{46 \\times 216}{8} = 187$' },
            { say: 'Calculate the new r.', show: '$r = \\dfrac{187}{\\sqrt{55.5 \\times 632}} = 0.998$' } ] },
        { l: 'c', marks: 1, q: 'Comment on the effect of cleaning the data.',
          answer: 'One error hid a very strong positive correlation; r rose from 0.548 to 0.998',
          ms: ['B1 valid comment referring to both values'],
          steps: [
            { say: 'With the error, the correlation looked only moderate.', show: '$r = 0.548$' },
            { say: 'Without it, there is very strong positive correlation between sunshine and ice cream sales.', show: '$r = 0.998$' },
            { say: 'So a single outlier can greatly change r, and data should be checked before analysis.', show: 'clean data first' } ] } ] },

    { n: 7, section: 'B', points: ['m2_tree', 'm2_prob'],
      parts: [
        { l: 'a', marks: 6, q: 'In a quiz, a contestant attempts three questions. The probabilities of answering them correctly are 0.6, 0.5 and 0.4 respectively, independently. Find the probability that the contestant answers<br>(i) all three correctly,<br>(ii) exactly two correctly,<br>(iii) at least one correctly.',
          answer: '(i) $0.12$ &nbsp; (ii) $0.38$ &nbsp; (iii) $0.88$',
          ms: ['B1 (i) $0.12$', 'M1 (ii) three cases, each a product of three probabilities', 'A1 (ii) $0.18 + 0.12 + 0.08$', 'A1 (ii) $0.38$', 'M1 (iii) $1 - P(\\text{none})$', 'A1 (iii) $0.88$'],
          steps: [
            { say: 'For all three correct, multiply the three probabilities.', show: '$0.6 \\times 0.5 \\times 0.4 = 0.12$' },
            { say: 'Exactly two correct means exactly one wrong. There are three cases.', show: '$CCW: 0.6(0.5)(0.6),\\ CWC: 0.6(0.5)(0.4),\\ WCC: 0.4(0.5)(0.4)$' },
            { say: 'Evaluate and add.', show: '$0.18 + 0.12 + 0.08 = 0.38$' },
            { say: 'At least one correct is the complement of none correct.', show: '$P(\\text{none}) = 0.4 \\times 0.5 \\times 0.6 = 0.12$' },
            { say: 'So the answer is 1 minus 0.12.', show: '$1 - 0.12 = 0.88$' } ] },
        { l: 'b', marks: 4, q: 'Events C and D are independent, with $P(C) = 0.3$ and $P(C \\cup D) = 0.58$.<br>(i) Find $P(D)$.<br>(ii) Explain whether C and D are mutually exclusive.',
          answer: '(i) $0.4$ &nbsp; (ii) No, $P(C \\cap D) = 0.12 \\ne 0$',
          ms: ['M1 $0.58 = 0.3 + p - 0.3p$', 'A1 $p = 0.4$', 'M1 $P(C \\cap D) = 0.3 \\times 0.4$', 'A1 $0.12 \\ne 0$, so not mutually exclusive'],
          steps: [
            { say: 'Let P of D be p. Independence means the probability of both is 0.3p.', show: '$P(C \\cap D) = 0.3p$' },
            { say: 'Use the addition law.', show: '$0.58 = 0.3 + p - 0.3p$' },
            { say: 'Solve.', show: '$0.7p = 0.28 \\Rightarrow p = 0.4$' },
            { say: 'Mutually exclusive would need the probability of both to be zero. Here it is 0.12.', show: '$P(C \\cap D) = 0.12 \\ne 0 \\Rightarrow$ not mutually exclusive' } ] } ] },

    { n: 8, section: 'B', points: ['m2_bin'],
      q: 'A manufacturer finds that 10% of its phone screens have a minor defect, independently of each other.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the smallest number of screens that must be inspected for the probability of finding at least one defective screen to exceed 0.95.',
          answer: '$29$',
          ms: ['M1 $1 - 0.9^n \\gt 0.95$', 'M1 $n \\gt \\frac{\\ln 0.05}{\\ln 0.9}$ (sign reversal handled)', 'A1 $n \\gt 28.4$', 'A1 $29$'],
          steps: [
            { say: 'At least one defective is the complement of none defective.', show: '$1 - 0.9^n \\gt 0.95 \\Rightarrow 0.9^n \\lt 0.05$' },
            { say: 'Take logs. Ln 0.9 is negative, so dividing by it reverses the inequality.', show: '$n\\ln0.9 \\lt \\ln0.05 \\Rightarrow n \\gt \\dfrac{\\ln0.05}{\\ln0.9}$' },
            { say: 'Evaluate.', show: '$n \\gt 28.4$' },
            { say: 'Check: 28 gives 0.9477, 29 gives 0.9529. So 29 screens are needed.', show: '$n = 29$' } ] },
        { l: 'b', marks: 3, q: 'A batch of 20 screens is inspected. Find the probability that between 2 and 4 inclusive are defective.',
          answer: '$0.565$',
          ms: ['M1 $P(2) + P(3) + P(4)$ with $B(20, 0.1)$', 'A1 $0.2852 + 0.1901 + 0.0898$', 'A1 $0.565$'],
          steps: [
            { say: 'X follows B of 20 and 0.1.', show: '$X \\sim B(20, 0.1)$' },
            { say: 'Work out each probability.', show: '$P(2) = 0.2852,\\ P(3) = 0.1901,\\ P(4) = 0.0898$' },
            { say: 'Add.', show: '$P(2 \\le X \\le 4) = 0.565$' } ] },
        { l: 'c', marks: 2, q: 'Explain how the probabilities for $X \\sim B(20, 0.1)$ are related to the binomial expansion of $(0.9 + 0.1)^{20}$.',
          answer: 'Each term $\\binom{20}{r}0.9^{20-r}0.1^r$ is $P(X = r)$; the terms sum to $1^{20} = 1$',
          ms: ['B1 term in $0.1^r$ is $P(X = r)$', 'B1 sum of terms $= 1$'],
          steps: [
            { say: 'Expand 0.9 plus 0.1 to the power 20 with the binomial theorem.', show: '$(0.9 + 0.1)^{20} = \\sum_{r=0}^{20}\\binom{20}{r}0.9^{20-r}0.1^r$' },
            { say: 'The term containing 0.1 to the power r is exactly the probability of r defective screens.', show: '$P(X = r) = \\binom{20}{r}0.1^r0.9^{20-r}$' },
            { say: 'Since 0.9 plus 0.1 is 1, all the probabilities add up to 1.', show: '$1^{20} = 1$' } ] } ] }
  ]
});
