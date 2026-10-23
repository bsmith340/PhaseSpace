// BCS Academy original papers · not CCEA papers. Physics AS 1: Forces, Energy and Electricity (three practice papers).
// Data used throughout: g = 9.81 N kg⁻¹, e = 1.60 × 10⁻¹⁹ C. Points are PHYS topic ids followed by spec outcome codes.

BCSP.add({
  id: 'as1-easy', unit: 'as1', level: 'easy',
  title: 'Physics AS 1 · Paper A (Easy)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['quantities', '1.1.1', '1.1.2'],
      q: 'Every physical quantity is written as a number multiplied by a unit.',
      parts: [
        { l: 'a', marks: 2, q: 'State the SI base unit of (i) electric current, (ii) temperature.',
          answer: '(i) ampere, A &nbsp; (ii) kelvin, K',
          ms: ['B1 ampere (A)', 'B1 kelvin (K)'],
          steps: [
            { say: 'There are six base units we need: kilogram, metre, second, ampere, kelvin and mole.', show: 'Base units: kg, m, s, A, K, mol' },
            { say: 'Current is measured in amperes.', show: '(i) current: ampere, A' },
            { say: 'Temperature is measured in kelvin, not degrees Celsius.', show: '(ii) temperature: kelvin, K' } ] },
        { l: 'b', marks: 2, q: 'Express the newton in terms of SI base units.',
          answer: 'kg m s⁻²',
          ms: ['C1 use of $F = ma$ (N = kg × m s⁻²)', 'A1 kg m s⁻²'],
          steps: [
            { say: 'Start from an equation that defines force: force equals mass times acceleration.', show: '$F = ma$' },
            { say: 'Mass is in kilograms and acceleration is in metres per second squared.', show: '$[m] = \\text{kg}, \\quad [a] = \\text{m s}^{-2}$' },
            { say: 'Multiply them together.', show: '$1\\,\\text{N} = 1\\,\\text{kg m s}^{-2}$' } ] },
        { l: 'c', marks: 2, q: 'Express the joule in terms of SI base units.',
          answer: 'kg m² s⁻²',
          ms: ['C1 work = force × distance, so J = N m', 'A1 kg m² s⁻²'],
          steps: [
            { say: 'Work done is force times distance moved, so a joule is a newton metre.', show: '$W = Fx \\Rightarrow 1\\,\\text{J} = 1\\,\\text{N m}$' },
            { say: 'Replace the newton with its base units from part b.', show: '$1\\,\\text{J} = (\\text{kg m s}^{-2})(\\text{m})$' },
            { say: 'Collect the metres together.', show: '$1\\,\\text{J} = 1\\,\\text{kg m}^{2}\\,\\text{s}^{-2}$' } ] } ] },

    { n: 2, points: ['vectors', '1.2.1', '1.2.3'],
      parts: [
        { l: 'a', marks: 3, q: 'Explain the difference between a scalar quantity and a vector quantity. Give one example of each.',
          answer: 'A scalar has magnitude only (e.g. speed, mass); a vector has magnitude and direction (e.g. velocity, force).',
          ms: ['B1 scalar: magnitude (size) only', 'B1 vector: magnitude and direction', 'B1 one correct example of each'],
          steps: [
            { say: 'A scalar only tells you how big something is.', show: 'Scalar: magnitude only' },
            { say: 'A vector tells you how big it is and which way it points.', show: 'Vector: magnitude <b>and</b> direction' },
            { say: 'Speed, mass and energy are scalars. Velocity, force and displacement are vectors.', show: 'Scalar: speed, mass, energy &nbsp;·&nbsp; Vector: velocity, force, displacement' } ] },
        { l: 'b', marks: 4, q: 'A boat is steered due north at 3.0 m s⁻¹ relative to the water. A current carries the water due east at 1.6 m s⁻¹. Calculate the magnitude and direction of the resultant velocity of the boat.',
          answer: '3.4 m s⁻¹ at 28° east of north',
          ms: ['C1 $v = \\sqrt{3.0^2 + 1.6^2}$', 'A1 3.4 m s⁻¹', 'C1 $\\tan\\theta = 1.6/3.0$', 'A1 28° east of north (direction must be clear)'],
          steps: [
            { say: 'The two velocities are at right angles, so draw them nose to tail and make a right-angled triangle.', show: 'north 3.0 m s⁻¹, then east 1.6 m s⁻¹' },
            { say: 'Use Pythagoras for the magnitude.', show: '$v = \\sqrt{3.0^2 + 1.6^2} = \\sqrt{11.56}$' },
            { say: 'That gives 3.4 metres per second.', show: '$v = 3.4\\,\\text{m s}^{-1}$' },
            { say: 'For the direction, the angle from north has the east part opposite and the north part adjacent.', show: '$\\tan\\theta = \\dfrac{1.6}{3.0}$' },
            { say: 'So the boat moves at 28 degrees east of north.', show: '$\\theta = 28^\\circ$ east of north' } ] } ] },

    { n: 3, points: ['moments', '1.3.1', '1.3.2', '1.3.3'],
      parts: [
        { l: 'a', marks: 2, q: 'Define the moment of a force about a point.',
          answer: 'The force multiplied by the perpendicular distance from the point to the line of action of the force.',
          ms: ['B1 force × perpendicular distance', 'B1 from the point to the line of action of the force'],
          steps: [
            { say: 'A moment is the turning effect of a force.', show: 'moment = turning effect' },
            { say: 'It equals the force times the perpendicular distance.', show: '$M = Fd$' },
            { say: 'The distance is measured from the point to the line of action of the force.', show: '$d$ is ⊥ from the point to the line of action' } ] },
        { l: 'b', marks: 3, q: 'A uniform plank is balanced on a pivot at its centre. A child of weight 300 N sits 1.2 m to the left of the pivot. How far to the right of the pivot must a child of weight 400 N sit so that the plank balances?',
          answer: '0.90 m to the right of the pivot',
          ms: ['C1 principle of moments: $300 \\times 1.2 = 400 \\times d$', 'C1 moment of 360 N m', 'A1 0.90 m'],
          steps: [
            { say: 'The plank is uniform and pivoted at its centre, so its own weight acts through the pivot and has no moment.', show: 'weight of plank: no moment about pivot' },
            { say: 'Balanced means clockwise moments equal anticlockwise moments.', show: '$\\Sigma M_{cw} = \\Sigma M_{acw}$' },
            { say: 'The left child gives 300 times 1.2, which is 360 newton metres.', show: '$300 \\times 1.2 = 360\\,\\text{N m}$' },
            { say: 'Set this equal to 400 times d and solve.', show: '$400d = 360 \\Rightarrow d = 0.90\\,\\text{m}$' } ] },
        { l: 'c', marks: 2, q: 'Define the centre of gravity of an object.',
          answer: 'The point through which the whole weight of the object may be considered to act.',
          ms: ['B1 (single) point', 'B1 where the whole weight appears to act'],
          steps: [
            { say: 'Every particle of an object has weight.', show: 'weight is spread through the object' },
            { say: 'We can replace all of it with one force at one point.', show: 'one point, one force' },
            { say: 'That point is the centre of gravity: where the whole weight may be taken to act.', show: 'centre of gravity: point where the whole weight acts' } ] } ] },

    { n: 4, points: ['motion', '1.4.1', '1.4.2', '1.4.3', '1.4.4', '1.4.5'],
      q: 'A car starts from rest and accelerates uniformly to 18 m s⁻¹ in 6.0 s. It travels at 18 m s⁻¹ for 10 s and then decelerates uniformly to rest in 4.0 s.',
      parts: [
        { l: 'a', marks: 2, q: 'Define velocity.',
          answer: 'The rate of change of displacement.',
          ms: ['B1 rate of change', 'B1 of displacement'],
          steps: [
            { say: 'Velocity is a vector, so it must be built from displacement, not distance.', show: 'displacement, not distance' },
            { say: 'It is how quickly displacement changes with time.', show: 'velocity = rate of change of displacement' },
            { say: 'As an equation, change in displacement over change in time.', show: '$v = \\dfrac{\\Delta s}{\\Delta t}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the acceleration of the car in the first 6.0 s.',
          answer: '3.0 m s⁻²',
          ms: ['C1 $a = \\Delta v / \\Delta t = 18/6.0$', 'A1 3.0 m s⁻²'],
          steps: [
            { say: 'Acceleration is change in velocity divided by time, which is the gradient of the velocity time graph.', show: '$a = \\dfrac{\\Delta v}{\\Delta t}$' },
            { say: 'The velocity goes from 0 to 18 in 6 seconds.', show: '$a = \\dfrac{18 - 0}{6.0}$' },
            { say: 'That is 3.0 metres per second squared.', show: '$a = 3.0\\,\\text{m s}^{-2}$' } ] },
        { l: 'c', marks: 3, q: 'Calculate the total distance travelled by the car.',
          answer: '270 m',
          ms: ['C1 distance = area under velocity–time graph', 'C1 54 + 180 + 36', 'A1 270 m'],
          steps: [
            { say: 'Distance is the area under the velocity time graph. Split it into a triangle, a rectangle and a triangle.', show: 'area = triangle + rectangle + triangle' },
            { say: 'First triangle: a half times 6 times 18, which is 54 metres.', show: '$\\tfrac12 \\times 6.0 \\times 18 = 54\\,\\text{m}$' },
            { say: 'Rectangle: 18 times 10, which is 180 metres.', show: '$18 \\times 10 = 180\\,\\text{m}$' },
            { say: 'Last triangle: a half times 4 times 18, which is 36 metres.', show: '$\\tfrac12 \\times 4.0 \\times 18 = 36\\,\\text{m}$' },
            { say: 'Add them up to get 270 metres.', show: '$54 + 180 + 36 = 270\\,\\text{m}$' } ] },
        { l: 'd', marks: 2, q: 'Calculate the average speed of the car for the whole journey.',
          answer: '13.5 m s⁻¹',
          ms: ['C1 average speed = 270 ÷ 20', 'A1 13.5 m s⁻¹ (accept 14 m s⁻¹)'],
          steps: [
            { say: 'Average speed is total distance over total time.', show: '$\\bar v = \\dfrac{\\text{total distance}}{\\text{total time}}$' },
            { say: 'The total time is 6 plus 10 plus 4, which is 20 seconds.', show: '$t = 6.0 + 10 + 4.0 = 20\\,\\text{s}$' },
            { say: '270 divided by 20 is 13.5 metres per second.', show: '$\\bar v = \\dfrac{270}{20} = 13.5\\,\\text{m s}^{-1}$' } ] },
        { l: 'e', marks: 3, q: 'A ball is dropped from rest from a height of 20.0 m. Neglecting air resistance, calculate the time it takes to reach the ground.',
          answer: '2.02 s',
          ms: ['C1 $s = ut + \\tfrac12 at^2$ with $u = 0$', 'C1 $20.0 = \\tfrac12 \\times 9.81 \\times t^2$', 'A1 2.02 s'],
          steps: [
            { say: 'List what we know: s is 20 metres, u is zero, a is 9.81, and we want t.', show: '$s = 20.0\\,\\text{m},\\ u = 0,\\ a = 9.81\\,\\text{m s}^{-2},\\ t = ?$' },
            { say: 'Use s equals u t plus a half a t squared. The u t term is zero.', show: '$s = \\tfrac12 at^2$' },
            { say: 'Rearrange for t.', show: '$t = \\sqrt{\\dfrac{2s}{a}} = \\sqrt{\\dfrac{2 \\times 20.0}{9.81}}$' },
            { say: 'That gives 2.02 seconds.', show: '$t = 2.02\\,\\text{s}$' } ] } ] },

    { n: 5, points: ['projectiles', '1.5.1', '1.5.2'],
      q: 'A stone is thrown horizontally at 12.0 m s⁻¹ from the top of a vertical cliff 30.0 m above the sea. Neglect air resistance.',
      parts: [
        { l: 'a', marks: 3, q: 'Calculate the time taken for the stone to reach the sea.',
          answer: '2.47 s',
          ms: ['C1 vertical motion only: initial vertical velocity = 0', 'C1 $30.0 = \\tfrac12 \\times 9.81 \\times t^2$', 'A1 2.47 s'],
          steps: [
            { say: 'Treat the vertical motion on its own. Thrown horizontally means the initial vertical velocity is zero.', show: '$u_y = 0,\\ s_y = 30.0\\,\\text{m},\\ a = 9.81\\,\\text{m s}^{-2}$' },
            { say: 'Use s equals a half a t squared.', show: '$30.0 = \\tfrac12 \\times 9.81 \\times t^2$' },
            { say: 'Rearrange for t.', show: '$t = \\sqrt{\\dfrac{2 \\times 30.0}{9.81}}$' },
            { say: 'The stone takes 2.47 seconds to fall.', show: '$t = 2.47\\,\\text{s}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the horizontal distance from the foot of the cliff to where the stone lands.',
          answer: '29.7 m',
          ms: ['C1 $x = u_x t = 12.0 \\times 2.47$', 'A1 29.7 m'],
          steps: [
            { say: 'Horizontally there is no acceleration, so distance is speed times time.', show: '$x = u_x t$' },
            { say: 'Use the time from part a.', show: '$x = 12.0 \\times 2.473$' },
            { say: 'That is 29.7 metres.', show: '$x = 29.7\\,\\text{m}$' } ] },
        { l: 'c', marks: 2, q: 'Explain why the horizontal component of the stone’s velocity stays at 12.0 m s⁻¹ throughout its flight.',
          answer: 'There is no horizontal force (air resistance neglected), so there is no horizontal acceleration.',
          ms: ['B1 no horizontal (resultant) force acts', 'B1 so no horizontal acceleration (Newton’s first law); vertical motion does not affect it'],
          steps: [
            { say: 'The only force on the stone is its weight, which acts vertically downwards.', show: 'only force: weight, vertically down' },
            { say: 'So there is no horizontal force.', show: 'horizontal force = 0' },
            { say: 'No horizontal force means no horizontal acceleration, so the horizontal velocity stays constant.', show: '$a_x = 0 \\Rightarrow u_x = 12.0\\,\\text{m s}^{-1}$ throughout' } ] },
        { l: 'd', marks: 1, q: 'Calculate the vertical component of the stone’s velocity as it reaches the sea.',
          answer: '24.3 m s⁻¹ downwards',
          ms: ['B1 24.3 m s⁻¹ (accept 24 m s⁻¹)'],
          steps: [
            { say: 'Vertically, v equals u plus a t, with u equal to zero.', show: '$v_y = 0 + 9.81 \\times 2.473$' },
            { say: 'Work it out.', show: '$v_y = 24.26$' },
            { say: 'So the vertical velocity is about 24.3 metres per second downwards.', show: '$v_y = 24.3\\,\\text{m s}^{-1}$ down' } ] } ] },

    { n: 6, points: ['newton', '1.6.1', '1.6.2', '1.6.3'],
      parts: [
        { l: 'a', marks: 2, q: 'State Newton’s second law of motion.',
          answer: 'The rate of change of momentum of a body is proportional to the resultant force acting on it and takes place in the direction of the force.',
          ms: ['B1 rate of change of momentum ∝ resultant force', 'B1 in the direction of the force (accept $F = ma$ with F resultant force, constant m, for 1 mark only)'],
          steps: [
            { say: 'The full law is about momentum.', show: 'momentum $p = mv$' },
            { say: 'The rate of change of momentum is proportional to the resultant force.', show: '$F \\propto \\dfrac{\\Delta p}{\\Delta t}$' },
            { say: 'And the change happens in the direction of that force.', show: 'in the direction of the resultant force' } ] },
        { l: 'b', marks: 3, q: 'A car of mass 1200 kg has a driving force of 3000 N. The total resistive force on it is 600 N. Calculate its acceleration.',
          answer: '2.0 m s⁻²',
          ms: ['C1 resultant force = 3000 − 600 = 2400 N', 'C1 $a = F/m$', 'A1 2.0 m s⁻²'],
          steps: [
            { say: 'First find the resultant force: driving force minus resistive force.', show: '$F = 3000 - 600 = 2400\\,\\text{N}$' },
            { say: 'Then use F equals m a.', show: '$a = \\dfrac{F}{m} = \\dfrac{2400}{1200}$' },
            { say: 'The acceleration is 2.0 metres per second squared.', show: '$a = 2.0\\,\\text{m s}^{-2}$' } ] },
        { l: 'c', marks: 2, q: 'State Newton’s third law of motion.',
          answer: 'If body A exerts a force on body B, then B exerts a force on A that is equal in size and opposite in direction.',
          ms: ['B1 equal and opposite forces', 'B1 acting on different bodies (and of the same type)'],
          steps: [
            { say: 'Forces always come in pairs between two bodies.', show: 'A pushes B, B pushes A' },
            { say: 'The two forces are equal in size and opposite in direction.', show: '$F_{AB} = -F_{BA}$' },
            { say: 'They act on different bodies, so they never cancel each other out on one body.', show: 'act on different bodies; same type of force' } ] },
        { l: 'd', marks: 3, q: 'A skydiver jumps from a hovering helicopter. Explain why she eventually falls at a constant velocity before opening her parachute.',
          answer: 'Air resistance increases with speed until it equals her weight; the resultant force is then zero, so she stops accelerating (terminal velocity).',
          ms: ['B1 at first only weight acts, so acceleration is g (resultant force downwards)', 'B1 air resistance increases as speed increases, so resultant force and acceleration decrease', 'B1 when air resistance = weight, resultant force is zero so velocity is constant (terminal velocity)'],
          steps: [
            { say: 'At the start her speed is zero, so there is no air resistance. Only her weight acts and she accelerates at g.', show: 'start: $F = W$, $a = g$' },
            { say: 'As she speeds up, air resistance grows.', show: 'speed ↑ ⇒ air resistance ↑' },
            { say: 'So the resultant force, weight minus air resistance, gets smaller, and so does her acceleration.', show: '$F = W - D$ decreases ⇒ $a$ decreases' },
            { say: 'Eventually air resistance equals her weight. The resultant force is zero, so she moves at constant velocity: terminal velocity.', show: '$D = W \\Rightarrow F = 0 \\Rightarrow$ terminal velocity' } ] } ] },

    { n: 7, points: ['momentum', '1.7.1', '1.7.2', '1.7.3', '1.7.4', '1.7.5'],
      parts: [
        { l: 'a', marks: 1, q: 'Define linear momentum.',
          answer: 'The product of mass and velocity.',
          ms: ['B1 mass × velocity'],
          steps: [
            { say: 'Momentum combines how much mass is moving and how fast.', show: 'momentum = mass × velocity' },
            { say: 'As an equation, p equals m v.', show: '$p = mv$' },
            { say: 'It is a vector and its unit is the kilogram metre per second.', show: 'unit: kg m s⁻¹ (vector)' } ] },
        { l: 'b', marks: 2, q: 'State the principle of conservation of linear momentum.',
          answer: 'The total momentum of a system remains constant provided no external resultant force acts on it.',
          ms: ['B1 total momentum (before = after) is constant', 'B1 provided no external (resultant) force acts'],
          steps: [
            { say: 'Add up the momentum of every object in the system.', show: 'total momentum $= \\Sigma mv$' },
            { say: 'That total stays the same before and after an interaction.', show: 'total before = total after' },
            { say: 'This is only true if no external force acts on the system.', show: 'provided no external resultant force acts' } ] },
        { l: 'c', marks: 3, q: 'A trolley of mass 2.0 kg moving at 3.0 m s⁻¹ collides with a stationary trolley of mass 1.0 kg. They stick together. Calculate their common velocity after the collision.',
          answer: '2.0 m s⁻¹',
          ms: ['C1 momentum before = 2.0 × 3.0 = 6.0 kg m s⁻¹', 'C1 $6.0 = 3.0v$', 'A1 2.0 m s⁻¹'],
          steps: [
            { say: 'Momentum before: only the 2 kilogram trolley is moving.', show: '$p_{\\text{before}} = 2.0 \\times 3.0 = 6.0\\,\\text{kg m s}^{-1}$' },
            { say: 'After, they move together as one 3 kilogram object.', show: '$p_{\\text{after}} = (2.0 + 1.0)v = 3.0v$' },
            { say: 'Momentum is conserved, so set them equal.', show: '$3.0v = 6.0$' },
            { say: 'The common velocity is 2.0 metres per second.', show: '$v = 2.0\\,\\text{m s}^{-1}$' } ] },
        { l: 'd', marks: 2, q: 'Show that this collision is inelastic.',
          answer: 'Kinetic energy falls from 9.0 J to 6.0 J, so kinetic energy is not conserved.',
          ms: ['B1 KE before = 9.0 J', 'B1 KE after = 6.0 J, less than before, so inelastic'],
          steps: [
            { say: 'In an elastic collision kinetic energy is conserved. Check whether it is here.', show: 'elastic ⇔ KE conserved' },
            { say: 'Before: a half times 2 times 3 squared is 9.0 joules.', show: '$E_k = \\tfrac12 \\times 2.0 \\times 3.0^2 = 9.0\\,\\text{J}$' },
            { say: 'After: a half times 3 times 2 squared is 6.0 joules.', show: '$E_k = \\tfrac12 \\times 3.0 \\times 2.0^2 = 6.0\\,\\text{J}$' },
            { say: 'Kinetic energy has been lost, so the collision is inelastic.', show: '$6.0\\,\\text{J} < 9.0\\,\\text{J}$ ⇒ inelastic' } ] },
        { l: 'e', marks: 2, q: 'A golf club exerts an average force of 150 N on a ball for 0.040 s. Calculate the impulse on the ball.',
          answer: '6.0 N s',
          ms: ['C1 impulse = $F\\Delta t$ = 150 × 0.040', 'A1 6.0 N s'],
          steps: [
            { say: 'Impulse is force times the time for which it acts.', show: 'impulse $= F\\Delta t$' },
            { say: 'Substitute the values.', show: '$150 \\times 0.040$' },
            { say: 'The impulse is 6.0 newton seconds, which equals the change in momentum of the ball.', show: '$= 6.0\\,\\text{N s}$' } ] } ] },

    { n: 8, points: ['energy-work', '1.8.1', '1.8.2', '1.8.4', '1.8.5'],
      q: 'A crane lifts a load of mass 250 kg vertically through 12 m at constant speed in 20 s.',
      parts: [
        { l: 'a', marks: 1, q: 'Define power.',
          answer: 'The rate of doing work (rate of transfer of energy).',
          ms: ['B1 work done (energy transferred) per unit time'],
          steps: [
            { say: 'Power tells you how quickly energy is transferred.', show: 'power = rate of doing work' },
            { say: 'As an equation, work done over time.', show: '$P = \\dfrac{W}{t}$' },
            { say: 'The unit is the watt, one joule per second.', show: '1 W = 1 J s⁻¹' } ] },
        { l: 'b', marks: 2, q: 'Calculate the gain in gravitational potential energy of the load.',
          answer: '2.94 × 10⁴ J',
          ms: ['C1 $\\Delta E_p = mg\\Delta h = 250 \\times 9.81 \\times 12$', 'A1 2.94 × 10⁴ J'],
          steps: [
            { say: 'Use change in potential energy equals m g delta h.', show: '$\\Delta E_p = mg\\Delta h$' },
            { say: 'Substitute 250, 9.81 and 12.', show: '$250 \\times 9.81 \\times 12$' },
            { say: 'That is 29 430 joules, or 2.94 times ten to the four joules.', show: '$\\Delta E_p = 2.94 \\times 10^{4}\\,\\text{J}$' } ] },
        { l: 'c', marks: 2, q: 'Calculate the useful output power of the crane.',
          answer: '1.47 kW (1470 W)',
          ms: ['C1 $P = 29\\,430 / 20$', 'A1 1470 W'],
          steps: [
            { say: 'The useful work done is the potential energy gained.', show: '$W = 29\\,430\\,\\text{J}$' },
            { say: 'Divide by the time of 20 seconds.', show: '$P = \\dfrac{29\\,430}{20}$' },
            { say: 'The useful power is 1470 watts, about 1.47 kilowatts.', show: '$P = 1.47 \\times 10^{3}\\,\\text{W}$' } ] },
        { l: 'd', marks: 2, q: 'The electrical input power to the crane motor is 2.5 kW. Calculate the efficiency of the crane.',
          answer: '59%',
          ms: ['C1 efficiency = 1471.5 / 2500', 'A1 0.59 or 59%'],
          steps: [
            { say: 'Efficiency is useful output divided by total input.', show: '$\\text{efficiency} = \\dfrac{\\text{useful output}}{\\text{total input}}$' },
            { say: 'Both must be in watts, so 2.5 kilowatts is 2500 watts.', show: '$\\dfrac{1471.5}{2500}$' },
            { say: 'That is 0.59, or 59 percent.', show: '$= 0.59 = 59\\%$' } ] },
        { l: 'e', marks: 3, q: 'A roller-coaster car is released from rest at a point 15 m above the ground. Ignoring friction, calculate its speed when it is 4.0 m above the ground.',
          answer: '14.7 m s⁻¹',
          ms: ['C1 loss of $E_p$ = gain of $E_k$: $mg\\Delta h = \\tfrac12 mv^2$', 'C1 $\\Delta h = 11$ m and $v = \\sqrt{2 \\times 9.81 \\times 11}$', 'A1 14.7 m s⁻¹'],
          steps: [
            { say: 'With no friction, the potential energy lost becomes kinetic energy.', show: '$mg\\Delta h = \\tfrac12 mv^2$' },
            { say: 'The mass cancels, so v equals the square root of 2 g delta h.', show: '$v = \\sqrt{2g\\Delta h}$' },
            { say: 'The car drops from 15 metres to 4 metres, a fall of 11 metres.', show: '$\\Delta h = 15 - 4.0 = 11\\,\\text{m}$' },
            { say: 'Substitute and calculate.', show: '$v = \\sqrt{2 \\times 9.81 \\times 11} = 14.7\\,\\text{m s}^{-1}$' } ] } ] },

    { n: 9, points: ['current', 'pd', '1.9.1', '1.9.2', '1.10.1'],
      parts: [
        { l: 'a', marks: 1, q: 'What is meant by an electric current?',
          answer: 'The rate of flow of charge (charged particles).',
          ms: ['B1 rate of flow of charge'],
          steps: [
            { say: 'In a metal the moving charges are free electrons.', show: 'charge carriers: free electrons' },
            { say: 'Current measures how much charge passes a point each second.', show: 'current = rate of flow of charge' },
            { say: 'As an equation, I equals delta Q over delta t.', show: '$I = \\dfrac{\\Delta Q}{\\Delta t}$' } ] },
        { l: 'b', marks: 2, q: 'A current of 0.25 A flows through a lamp for 3.0 minutes. Calculate the charge that passes through the lamp.',
          answer: '45 C',
          ms: ['C1 $\\Delta Q = I\\Delta t$ with $t = 180$ s', 'A1 45 C'],
          steps: [
            { say: 'Convert the time into seconds: 3 minutes is 180 seconds.', show: '$t = 3.0 \\times 60 = 180\\,\\text{s}$' },
            { say: 'Use charge equals current times time.', show: '$\\Delta Q = I\\Delta t = 0.25 \\times 180$' },
            { say: 'The charge is 45 coulombs.', show: '$\\Delta Q = 45\\,\\text{C}$' } ] },
        { l: 'c', marks: 2, q: 'Calculate the number of electrons that pass through the lamp in this time. ($e = 1.60 \\times 10^{-19}$ C)',
          answer: '2.81 × 10²⁰',
          ms: ['C1 $N = Q/e = 45 / 1.60 \\times 10^{-19}$', 'A1 2.81 × 10²⁰'],
          steps: [
            { say: 'Each electron carries a charge e, so the number of electrons is total charge divided by e.', show: '$N = \\dfrac{Q}{e}$' },
            { say: 'Substitute 45 coulombs.', show: '$N = \\dfrac{45}{1.60 \\times 10^{-19}}$' },
            { say: 'That is 2.81 times ten to the twenty electrons.', show: '$N = 2.81 \\times 10^{20}$' } ] },
        { l: 'd', marks: 2, q: 'Define potential difference.',
          answer: 'The energy transferred from electrical to other forms per unit charge passing between two points.',
          ms: ['B1 energy converted from electrical to other forms (work done)', 'B1 per unit charge (per coulomb) between two points'],
          steps: [
            { say: 'Potential difference is about energy and charge.', show: '$V = \\dfrac{W}{Q}$' },
            { say: 'It is the electrical energy converted to other forms, such as heat and light, between two points.', show: 'electrical energy → other forms' },
            { say: 'Per coulomb of charge that passes. One volt is one joule per coulomb.', show: '1 V = 1 J C⁻¹' } ] } ] },

    { n: 10, points: ['resistance', '1.11.2', '1.11.3', '1.11.5'],
      parts: [
        { l: 'a', marks: 2, q: 'State Ohm’s law.',
          answer: 'The current through a metallic conductor is directly proportional to the potential difference across it, provided the temperature (physical conditions) stays constant.',
          ms: ['B1 current directly proportional to pd', 'B1 provided temperature / physical conditions constant'],
          steps: [
            { say: 'Ohm’s law links current and potential difference.', show: '$I \\propto V$' },
            { say: 'For a metallic conductor they are directly proportional.', show: 'straight line through the origin' },
            { say: 'This only holds if the temperature stays constant.', show: 'provided temperature is constant' } ] },
        { l: 'b', marks: 3, q: 'Describe the shape of the current–potential difference graph for a filament lamp and explain it.',
          answer: 'A curve through the origin whose gradient decreases as V increases (same shape for negative V). The filament heats up, so its resistance increases.',
          ms: ['B1 curve through origin, gradient (I/V) decreasing, symmetrical in negative quadrant', 'B1 as current increases the filament temperature rises', 'B1 so resistance increases (ions vibrate more, more collisions with electrons)'],
          steps: [
            { say: 'The graph passes through the origin and is the same shape for both directions of current.', show: 'through origin, symmetrical' },
            { say: 'It curves over: equal increases in voltage give smaller and smaller increases in current.', show: 'gradient decreases as $V$ increases' },
            { say: 'A bigger current makes the filament hotter.', show: '$I$ ↑ ⇒ temperature ↑' },
            { say: 'Hotter metal ions vibrate more, so electrons collide more often and the resistance rises.', show: 'more collisions ⇒ $R = V/I$ ↑' } ] },
        { l: 'c', marks: 3, q: 'A nichrome wire has length 0.80 m and diameter 0.40 mm. The resistivity of nichrome is 1.1 × 10⁻⁶ Ω m. Calculate the resistance of the wire.',
          answer: '7.0 Ω',
          ms: ['C1 $A = \\pi r^2 = \\pi(0.20 \\times 10^{-3})^2 = 1.26 \\times 10^{-7}$ m²', 'C1 $R = \\rho l / A$ substituted', 'A1 7.0 Ω'],
          steps: [
            { say: 'The radius is half the diameter: 0.20 millimetres, which is 0.20 times ten to the minus three metres.', show: '$r = 0.20 \\times 10^{-3}\\,\\text{m}$' },
            { say: 'Cross-sectional area is pi r squared.', show: '$A = \\pi (0.20 \\times 10^{-3})^2 = 1.26 \\times 10^{-7}\\,\\text{m}^2$' },
            { say: 'Use R equals rho l over A.', show: '$R = \\dfrac{\\rho l}{A} = \\dfrac{1.1 \\times 10^{-6} \\times 0.80}{1.26 \\times 10^{-7}}$' },
            { say: 'The resistance is 7.0 ohms.', show: '$R = 7.0\\,\\Omega$' } ] } ] },

    { n: 11, points: ['internal', '1.12.1'],
      q: 'A cell of emf 1.5 V and internal resistance 0.50 Ω is connected to a 2.5 Ω resistor.',
      parts: [
        { l: 'a', marks: 2, q: 'Calculate the current in the circuit.',
          answer: '0.50 A',
          ms: ['C1 $I = E/(R + r) = 1.5/3.0$', 'A1 0.50 A'],
          steps: [
            { say: 'The current passes through the external resistor and the internal resistance, which are in series.', show: '$R + r = 2.5 + 0.50 = 3.0\\,\\Omega$' },
            { say: 'Use E equals I times R plus r.', show: '$I = \\dfrac{E}{R + r} = \\dfrac{1.5}{3.0}$' },
            { say: 'The current is 0.50 amps.', show: '$I = 0.50\\,\\text{A}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the terminal potential difference of the cell.',
          answer: '1.25 V',
          ms: ['C1 $V = IR = 0.50 \\times 2.5$ or $V = E - Ir$', 'A1 1.25 V (accept 1.3 V)'],
          steps: [
            { say: 'The terminal potential difference is the voltage across the external resistor.', show: '$V = IR$' },
            { say: 'Substitute.', show: '$V = 0.50 \\times 2.5 = 1.25\\,\\text{V}$' },
            { say: 'Check with V equals E minus I r: 1.5 minus 0.25 is also 1.25 volts.', show: '$1.5 - 0.50 \\times 0.50 = 1.25\\,\\text{V}$ ✓' } ] },
        { l: 'c', marks: 2, q: 'Explain why the terminal potential difference is less than the emf.',
          answer: 'Some of the energy given to each coulomb by the cell is dissipated in the internal resistance (the ‘lost volts’ Ir).',
          ms: ['B1 energy (per unit charge) is dissipated / lost inside the cell', 'B1 because of the internal resistance; lost volts = $Ir$'],
          steps: [
            { say: 'The emf is the energy the cell gives to each coulomb.', show: 'emf: energy supplied per coulomb' },
            { say: 'Some of that energy is turned into heat inside the cell by its internal resistance.', show: 'energy dissipated in $r$' },
            { say: 'The voltage used up inside, I r, is called the lost volts, so less is left for the external circuit.', show: '$V = E - Ir$' } ] } ] },

    { n: 12, points: ['divider', '1.13.1'],
      parts: [
        { l: 'a', marks: 3, q: 'A 2.0 kΩ resistor and a 1.0 kΩ resistor are connected in series to a 9.0 V supply of negligible internal resistance. Calculate the potential difference across the 1.0 kΩ resistor.',
          answer: '3.0 V',
          ms: ['C1 $V_{out} = \\dfrac{R_2}{R_1 + R_2}V_{in}$', 'C1 $\\dfrac{1.0}{3.0} \\times 9.0$', 'A1 3.0 V'],
          steps: [
            { say: 'This is a potential divider. The voltage splits in the ratio of the resistances.', show: '$V_{out} = \\dfrac{R_2}{R_1 + R_2}V_{in}$' },
            { say: 'R2 is the 1.0 kilohm resistor and the total is 3.0 kilohms.', show: '$V_{out} = \\dfrac{1.0}{2.0 + 1.0} \\times 9.0$' },
            { say: 'So the output is 3.0 volts.', show: '$V_{out} = 3.0\\,\\text{V}$' } ] } ] },

    { n: 13, points: ['resistance', '1.11.5'],
      parts: [
        { l: 'a', marks: 6, q: 'Describe an experiment to determine the resistivity of a metal in the form of a wire. Your answer should include the measurements you would take, how you would use them to find the resistivity, and one precaution. <i>In this question you will be assessed on your written communication skills.</i>',
          answer: 'Measure diameter with a micrometer (several places), measure R = V/I for several lengths, plot R against l; resistivity = gradient × A.',
          ms: [
            'Indicative content:',
            '1. Measure the diameter with a micrometer screw gauge at several points along the wire and average; $A = \\pi d^2/4$',
            '2. Connect the wire in series with an ammeter, voltmeter across a measured length $l$ (metre rule, crocodile clips)',
            '3. Record $V$ and $I$ and calculate $R = V/I$',
            '4. Repeat for at least five different lengths',
            '5. Plot $R$ against $l$: straight line through origin, gradient $= \\rho/A$',
            '6. $\\rho = \\text{gradient} \\times A$',
            '7. Precaution: keep current small / switch off between readings so the temperature does not rise; check zero error on micrometer',
            'Band A (5–6 marks): at least six points, logically ordered, correct terminology, good spelling, punctuation and grammar',
            'Band B (3–4 marks): four or five points, mostly clear and logical, some errors',
            'Band C (1–2 marks): two or three points, poorly organised',
            '0 marks: no relevant content'],
          steps: [
            { say: 'Start with the area. Measure the diameter with a micrometer at several places and average it, then work out the cross-sectional area.', show: '$A = \\dfrac{\\pi d^2}{4}$, $d$ by micrometer (average of several)' },
            { say: 'Set up the circuit: the wire in series with an ammeter, and a voltmeter across a measured length of wire.', show: 'ammeter in series, voltmeter across length $l$' },
            { say: 'For each length, read the voltage and current and work out the resistance.', show: '$R = \\dfrac{V}{I}$ for 5 or more lengths' },
            { say: 'Plot resistance against length. It should be a straight line through the origin with gradient rho over A.', show: '$R = \\dfrac{\\rho}{A}\\,l$ ⇒ gradient $= \\dfrac{\\rho}{A}$' },
            { say: 'Multiply the gradient by the area to get the resistivity.', show: '$\\rho = \\text{gradient} \\times A$' },
            { say: 'Keep the current small so the wire does not heat up, because resistance changes with temperature.', show: 'precaution: small current, switch off between readings' } ] } ] }
  ]
});

BCSP.add({
  id: 'as1-medium', unit: 'as1', level: 'medium',
  title: 'Physics AS 1 · Paper B (Medium)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['quantities', '1.1.2'],
      parts: [
        { l: 'a', marks: 3, q: 'Use the equation $P = Fv$ to show that the watt can be written as kg m² s⁻³.',
          answer: 'W = N × m s⁻¹ = kg m s⁻² × m s⁻¹ = kg m² s⁻³',
          ms: ['B1 N = kg m s⁻²', 'B1 $v$ in m s⁻¹', 'B1 multiplied correctly to give kg m² s⁻³'],
          steps: [
            { say: 'Power equals force times velocity, so a watt is a newton times a metre per second.', show: '$[P] = [F][v] = \\text{N} \\times \\text{m s}^{-1}$' },
            { say: 'A newton is a kilogram metre per second squared.', show: '$\\text{N} = \\text{kg m s}^{-2}$' },
            { say: 'Multiply: the metres combine and the seconds combine.', show: '$\\text{kg m s}^{-2} \\times \\text{m s}^{-1} = \\text{kg m}^2\\,\\text{s}^{-3}$' } ] },
        { l: 'b', marks: 3, q: 'The drag force on a small sphere moving slowly through a liquid is given by $F = krv$, where $r$ is the radius and $v$ the speed. Find the SI base units of $k$.',
          answer: 'kg m⁻¹ s⁻¹',
          ms: ['C1 $k = F/(rv)$', 'C1 kg m s⁻² ÷ (m × m s⁻¹)', 'A1 kg m⁻¹ s⁻¹'],
          steps: [
            { say: 'Rearrange the equation for k.', show: '$k = \\dfrac{F}{rv}$' },
            { say: 'Put in the base units of each quantity.', show: '$[k] = \\dfrac{\\text{kg m s}^{-2}}{\\text{m} \\times \\text{m s}^{-1}}$' },
            { say: 'The bottom is metres squared per second. Dividing gives kilograms per metre per second.', show: '$[k] = \\dfrac{\\text{kg m s}^{-2}}{\\text{m}^2\\,\\text{s}^{-1}} = \\text{kg m}^{-1}\\,\\text{s}^{-1}$' } ] } ] },

    { n: 2, points: ['vectors', '1.2.3', '1.2.4'],
      parts: [
        { l: 'a', marks: 4, q: 'A lamp of mass 6.0 kg hangs at rest from two cables. Each cable makes an angle of 40° with the horizontal. Calculate the tension in each cable.',
          answer: '45.8 N',
          ms: ['B1 weight = 6.0 × 9.81 = 58.9 N', 'C1 vertical equilibrium: $2T\\sin 40^\\circ = mg$', 'C1 $T = 58.86 / (2\\sin 40^\\circ)$', 'A1 45.8 N'],
          steps: [
            { say: 'First find the weight of the lamp.', show: '$W = mg = 6.0 \\times 9.81 = 58.86\\,\\text{N}$' },
            { say: 'The lamp is in equilibrium, so the upward components of the tensions must balance the weight.', show: '$\\Sigma F_y = 0$' },
            { say: 'Each cable is at 40 degrees to the horizontal, so its vertical component is T sine 40.', show: '$2T\\sin 40^\\circ = 58.86$' },
            { say: 'Solve for T.', show: '$T = \\dfrac{58.86}{2 \\times 0.643} = 45.8\\,\\text{N}$' } ] },
        { l: 'b', marks: 3, q: 'Two forces act at a point: 5.0 N due north and 12 N due east. Calculate the magnitude of their resultant and its bearing.',
          answer: '13 N on a bearing of 067°',
          ms: ['C1 $R = \\sqrt{5.0^2 + 12^2}$', 'A1 13 N', 'B1 bearing 067° (67° east of north)'],
          steps: [
            { say: 'The forces are perpendicular, so use Pythagoras.', show: '$R = \\sqrt{5.0^2 + 12^2} = \\sqrt{169}$' },
            { say: 'The resultant is 13 newtons.', show: '$R = 13\\,\\text{N}$' },
            { say: 'A bearing is measured clockwise from north. The east force is opposite the angle and the north force is adjacent.', show: '$\\tan\\theta = \\dfrac{12}{5.0} \\Rightarrow \\theta = 67^\\circ$' },
            { say: 'So the bearing is 067 degrees.', show: 'bearing 067°' } ] } ] },

    { n: 3, points: ['moments', '1.3.2', '1.3.3'],
      q: 'A uniform beam AB of length 5.0 m and weight 800 N rests horizontally on two supports, one at each end. A load of 1200 N is placed 1.5 m from A.',
      parts: [
        { l: 'a', marks: 5, q: 'Calculate the upward force exerted by each support.',
          answer: 'At B: 760 N; at A: 1240 N',
          ms: ['B1 beam weight acts at 2.5 m from A (centre of gravity)', 'C1 moments about A: $5.0R_B = 800 \\times 2.5 + 1200 \\times 1.5$', 'A1 $R_B$ = 760 N', 'C1 $R_A + R_B = 2000$ N', 'A1 $R_A$ = 1240 N'],
          steps: [
            { say: 'The beam is uniform, so its weight acts at its centre, 2.5 metres from A.', show: 'weight 800 N at 2.5 m from A' },
            { say: 'Take moments about A so the unknown force at A has no moment.', show: 'moments about A' },
            { say: 'The clockwise moments from the weights equal the anticlockwise moment from the support at B.', show: '$R_B \\times 5.0 = 800 \\times 2.5 + 1200 \\times 1.5 = 3800$' },
            { say: 'So the force at B is 760 newtons.', show: '$R_B = 760\\,\\text{N}$' },
            { say: 'Vertical forces balance: the two supports together hold up 2000 newtons.', show: '$R_A = 2000 - 760 = 1240\\,\\text{N}$' } ] },
        { l: 'b', marks: 3, q: 'Explain why the support at A provides a larger force than the support at B.',
          answer: 'The 1200 N load is nearer A. Taking moments about B, the load has a larger moment arm (3.5 m) so A must supply a larger force; the beam’s weight is shared equally.',
          ms: ['B1 beam’s own weight is at the centre so contributes equally (400 N each)', 'B1 the load is closer to A than to B', 'B1 so a greater share of the load (moments about B: larger moment arm) is taken by A'],
          steps: [
            { say: 'The beam’s own weight acts at the middle, so it is shared equally: 400 newtons each.', show: '800 N shared: 400 N + 400 N' },
            { say: 'The load sits 1.5 metres from A but 3.5 metres from B.', show: 'load: 1.5 m from A, 3.5 m from B' },
            { say: 'Taking moments about B, the load has a long moment arm, so A must push up harder to balance it.', show: '$R_A \\times 5.0 = 1200 \\times 3.5 + 800 \\times 2.5$' },
            { say: 'A takes 840 newtons of the load and B takes 360, which matches the answers.', show: '$R_A = 400 + 840 = 1240$, $R_B = 400 + 360 = 760$' } ] } ] },

    { n: 4, points: ['motion', '1.4.5'],
      parts: [
        { l: 'a', marks: 5, q: 'A car is travelling at 25 m s⁻¹ when the driver sees a hazard. Her reaction time is 0.70 s, after which the brakes give a uniform deceleration of 6.5 m s⁻². Calculate (i) the thinking distance, (ii) the braking distance, (iii) the total stopping distance.',
          answer: '(i) 17.5 m (ii) 48.1 m (iii) 65.6 m',
          ms: ['B1 (i) 25 × 0.70 = 17.5 m', 'C1 (ii) $v^2 = u^2 + 2as$ with $v = 0$, $a = -6.5$', 'C1 $0 = 625 - 13s$', 'A1 48.1 m', 'B1 (iii) 65.6 m (ecf)'],
          steps: [
            { say: 'During the reaction time the car still moves at 25 metres per second.', show: '(i) $25 \\times 0.70 = 17.5\\,\\text{m}$' },
            { say: 'For braking, the car goes from 25 to zero with an acceleration of minus 6.5. Time is not needed, so use v squared equals u squared plus 2 a s.', show: '$v^2 = u^2 + 2as$' },
            { say: 'Substitute.', show: '$0 = 25^2 + 2(-6.5)s \\Rightarrow 13s = 625$' },
            { say: 'The braking distance is 48.1 metres.', show: '(ii) $s = 48.1\\,\\text{m}$' },
            { say: 'Add the two for the stopping distance.', show: '(iii) $17.5 + 48.1 = 65.6\\,\\text{m}$' } ] },
        { l: 'b', marks: 4, q: 'A ball is thrown vertically upwards at 14.0 m s⁻¹. Neglecting air resistance, calculate (i) the maximum height reached, (ii) the time taken to return to the point of release.',
          answer: '(i) 9.99 m (ii) 2.85 s',
          ms: ['C1 (i) $0 = 14.0^2 - 2 \\times 9.81 \\times s$', 'A1 9.99 m', 'C1 (ii) $s = 0$: $0 = 14.0t - 4.905t^2$ (or time up × 2)', 'A1 2.85 s'],
          steps: [
            { say: 'At the top the velocity is zero. Take upwards as positive, so a is minus 9.81.', show: '$v = 0,\\ u = 14.0,\\ a = -9.81$' },
            { say: 'Use v squared equals u squared plus 2 a s.', show: '$0 = 196 - 19.62s \\Rightarrow s = 9.99\\,\\text{m}$' },
            { say: 'For the return, the displacement is zero. Use s equals u t plus a half a t squared.', show: '$0 = 14.0t - 4.905t^2$' },
            { say: 'Ignore the t equals zero solution.', show: '$t = \\dfrac{14.0}{4.905} = 2.85\\,\\text{s}$' } ] } ] },

    { n: 5, points: ['projectiles', '1.5.1', '1.5.2'],
      q: 'A football is kicked from level ground at 18.0 m s⁻¹ at 35° above the horizontal. Neglect air resistance.',
      parts: [
        { l: 'a', marks: 2, q: 'Calculate the horizontal and vertical components of the initial velocity.',
          answer: 'horizontal 14.7 m s⁻¹, vertical 10.3 m s⁻¹',
          ms: ['B1 $u_x = 18.0\\cos 35^\\circ = 14.7$ m s⁻¹', 'B1 $u_y = 18.0\\sin 35^\\circ = 10.3$ m s⁻¹'],
          steps: [
            { say: 'Resolve the velocity. The horizontal part is next to the angle, so use cosine.', show: '$u_x = 18.0\\cos 35^\\circ = 14.7\\,\\text{m s}^{-1}$' },
            { say: 'The vertical part is opposite the angle, so use sine.', show: '$u_y = 18.0\\sin 35^\\circ = 10.3\\,\\text{m s}^{-1}$' },
            { say: 'From now on we treat the two directions separately.', show: 'horizontal: constant $u_x$ · vertical: $a = -9.81$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the time of flight.',
          answer: '2.10 s',
          ms: ['C1 $0 = 10.32t - 4.905t^2$ (or $2u_y/g$)', 'A1 2.10 s'],
          steps: [
            { say: 'The ball lands at the same height, so vertical displacement is zero.', show: '$0 = u_y t - \\tfrac12 g t^2$' },
            { say: 'Divide by t.', show: '$t = \\dfrac{2u_y}{g} = \\dfrac{2 \\times 10.32}{9.81}$' },
            { say: 'The time of flight is 2.10 seconds.', show: '$t = 2.10\\,\\text{s}$' } ] },
        { l: 'c', marks: 2, q: 'Calculate the horizontal range.',
          answer: '31.0 m',
          ms: ['C1 $x = 14.74 \\times 2.105$', 'A1 31.0 m'],
          steps: [
            { say: 'Horizontally the velocity is constant.', show: '$x = u_x t$' },
            { say: 'Multiply the horizontal velocity by the time of flight.', show: '$x = 14.74 \\times 2.105$' },
            { say: 'The range is 31.0 metres.', show: '$x = 31.0\\,\\text{m}$' } ] },
        { l: 'd', marks: 2, q: 'Calculate the maximum height reached.',
          answer: '5.43 m',
          ms: ['C1 $0 = 10.32^2 - 2 \\times 9.81 \\times h$', 'A1 5.43 m'],
          steps: [
            { say: 'At the highest point the vertical velocity is zero.', show: '$v_y = 0$' },
            { say: 'Use v squared equals u squared plus 2 a s vertically.', show: '$0 = 10.32^2 - 2(9.81)h$' },
            { say: 'Solve for h.', show: '$h = \\dfrac{10.32^2}{19.62} = 5.43\\,\\text{m}$' } ] } ] },

    { n: 6, points: ['newton', '1.6.1', '1.6.2', '1.6.3'],
      q: 'A lift of mass 800 kg carries a passenger of mass 70 kg. It accelerates upwards at 1.5 m s⁻².',
      parts: [
        { l: 'a', marks: 3, q: 'Calculate the reading on a set of bathroom scales (in N) that the passenger stands on.',
          answer: '792 N',
          ms: ['C1 $R - mg = ma$', 'C1 $R = 70(9.81 + 1.5)$', 'A1 792 N'],
          steps: [
            { say: 'The scales read the normal contact force R on the passenger.', show: 'forces on passenger: $R$ up, $mg$ down' },
            { say: 'The resultant force is upwards because she accelerates upwards.', show: '$R - mg = ma$' },
            { say: 'Rearrange and substitute.', show: '$R = m(g + a) = 70(9.81 + 1.5)$' },
            { say: 'The scales read about 792 newtons, more than her weight of 687 newtons.', show: '$R = 792\\,\\text{N}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the tension in the lift cable.',
          answer: '9840 N',
          ms: ['C1 $T = 870(9.81 + 1.5)$', 'A1 9840 N (9.84 × 10³ N)'],
          steps: [
            { say: 'Treat the lift and passenger as one object of mass 870 kilograms.', show: '$m = 800 + 70 = 870\\,\\text{kg}$' },
            { say: 'Same idea: tension minus weight equals mass times acceleration.', show: '$T = m(g + a) = 870 \\times 11.31$' },
            { say: 'The tension is 9840 newtons.', show: '$T = 9.84 \\times 10^{3}\\,\\text{N}$' } ] },
        { l: 'c', marks: 1, q: 'State Newton’s first law of motion.',
          answer: 'A body stays at rest or moves with constant velocity unless acted on by a resultant force.',
          ms: ['B1 remains at rest or in uniform motion in a straight line unless a resultant (external) force acts'],
          steps: [
            { say: 'Without a resultant force nothing changes.', show: '$F = 0$' },
            { say: 'An object at rest stays at rest.', show: 'at rest → stays at rest' },
            { say: 'A moving object keeps moving in a straight line at constant speed.', show: 'moving → constant velocity' } ] },
        { l: 'd', marks: 4, q: 'A skydiver has reached terminal velocity. She then opens her parachute. Describe and explain how her velocity changes from the moment the parachute opens until she reaches a new steady speed.',
          answer: 'Drag suddenly exceeds weight, giving an upward resultant force; she decelerates. As she slows, drag decreases, so deceleration decreases until drag equals weight again at a lower terminal velocity.',
          ms: ['B1 opening increases surface area, so drag becomes greater than weight', 'B1 resultant force upwards, so she decelerates (velocity decreases)', 'B1 as speed falls, drag decreases, so the deceleration decreases', 'B1 drag = weight again; resultant zero; new lower constant (terminal) velocity'],
          steps: [
            { say: 'Opening the parachute greatly increases the area, so the air resistance jumps up.', show: 'area ↑ ⇒ drag ↑, now $D > W$' },
            { say: 'The resultant force now points upwards, so she decelerates.', show: 'resultant upwards ⇒ velocity decreases' },
            { say: 'As she slows down, the drag gets smaller, so the resultant force and deceleration get smaller too.', show: 'speed ↓ ⇒ $D$ ↓ ⇒ deceleration ↓' },
            { say: 'When drag falls to equal her weight again, the resultant force is zero and she moves at a new, lower terminal velocity.', show: '$D = W$: new lower terminal velocity' } ] } ] },

    { n: 7, points: ['momentum', '1.7.3', '1.7.4', '1.7.5'],
      parts: [
        { l: 'a', marks: 3, q: 'Two ice skaters, of masses 60 kg and 40 kg, stand at rest facing each other. They push apart. The 40 kg skater moves off at 1.5 m s⁻¹. Calculate the velocity of the 60 kg skater.',
          answer: '1.0 m s⁻¹ in the opposite direction',
          ms: ['C1 total momentum before = 0', 'C1 $0 = 40 \\times 1.5 + 60v$', 'A1 $v = -1.0$ m s⁻¹ (1.0 m s⁻¹ in the opposite direction)'],
          steps: [
            { say: 'They start at rest, so the total momentum before is zero.', show: '$p_{\\text{before}} = 0$' },
            { say: 'Momentum is conserved, so the total after is also zero.', show: '$0 = 40(1.5) + 60v$' },
            { say: 'Solve for v.', show: '$v = -\\dfrac{60}{60} = -1.0\\,\\text{m s}^{-1}$' },
            { say: 'The minus sign means the 60 kilogram skater moves the opposite way at 1.0 metres per second.', show: '1.0 m s⁻¹, opposite direction' } ] },
        { l: 'b', marks: 4, q: 'A ball of mass 0.16 kg travelling at 20 m s⁻¹ hits a wall at right angles and rebounds at 15 m s⁻¹. It is in contact with the wall for 0.050 s. Calculate (i) the change in momentum of the ball, (ii) the average force exerted by the wall on the ball.',
          answer: '(i) 5.6 kg m s⁻¹ (away from the wall) (ii) 112 N',
          ms: ['C1 (i) $\\Delta p = 0.16(15 - (-20))$ (direction change recognised)', 'A1 5.6 kg m s⁻¹', 'C1 (ii) $F = \\Delta p/\\Delta t = 5.6/0.050$', 'A1 112 N (accept 110 N)'],
          steps: [
            { say: 'Velocity is a vector. Take away from the wall as positive, so the initial velocity is minus 20.', show: '$u = -20,\\ v = +15\\,\\text{m s}^{-1}$' },
            { say: 'Change in momentum is m times v minus u.', show: '$\\Delta p = 0.16(15 - (-20)) = 0.16 \\times 35$' },
            { say: 'That is 5.6 kilogram metres per second, away from the wall.', show: '$\\Delta p = 5.6\\,\\text{kg m s}^{-1}$' },
            { say: 'Force is rate of change of momentum.', show: '$F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{5.6}{0.050} = 112\\,\\text{N}$' } ] },
        { l: 'c', marks: 3, q: 'A force–time graph for a tennis racket hitting a stationary ball of mass 0.050 kg is a triangle. The force rises from zero to a peak of 400 N and falls back to zero; the contact lasts 0.030 s. Calculate the speed of the ball as it leaves the racket.',
          answer: '120 m s⁻¹',
          ms: ['C1 impulse = area = ½ × 400 × 0.030 = 6.0 N s', 'C1 $6.0 = 0.050v$', 'A1 120 m s⁻¹'],
          steps: [
            { say: 'Impulse is the area under the force time graph. Here that is a triangle.', show: 'impulse = area' },
            { say: 'A half times base times height: a half times 0.030 times 400.', show: '$\\tfrac12 \\times 0.030 \\times 400 = 6.0\\,\\text{N s}$' },
            { say: 'Impulse equals change in momentum, and the ball starts at rest.', show: '$6.0 = 0.050v$' },
            { say: 'So the ball leaves at 120 metres per second.', show: '$v = 120\\,\\text{m s}^{-1}$' } ] } ] },

    { n: 8, points: ['energy-work', '1.8.1', '1.8.4', '1.8.5'],
      parts: [
        { l: 'a', marks: 2, q: 'A car of mass 1100 kg travels at a constant 30 m s⁻¹ on a level road against a total resistive force of 650 N. Calculate the output power of the engine.',
          answer: '19.5 kW',
          ms: ['C1 constant speed so driving force = 650 N; $P = Fv$', 'A1 19 500 W'],
          steps: [
            { say: 'At constant speed the resultant force is zero, so the driving force equals the resistive force.', show: '$F = 650\\,\\text{N}$' },
            { say: 'Use power equals force times velocity.', show: '$P = Fv = 650 \\times 30$' },
            { say: 'The power is 19 500 watts, or 19.5 kilowatts.', show: '$P = 1.95 \\times 10^{4}\\,\\text{W}$' } ] },
        { l: 'b', marks: 4, q: 'The same car now climbs a hill inclined at 5.0° to the horizontal at a constant 20 m s⁻¹. The resistive force is now 500 N. Calculate the output power needed.',
          answer: '28.8 kW',
          ms: ['C1 component of weight down slope = $mg\\sin 5.0^\\circ$ = 940 N', 'C1 driving force = 500 + 940 = 1440 N', 'C1 $P = Fv = 1440 \\times 20$', 'A1 2.88 × 10⁴ W'],
          steps: [
            { say: 'On a slope, part of the weight acts down the slope.', show: '$mg\\sin\\theta = 1100 \\times 9.81 \\times \\sin 5.0^\\circ = 940\\,\\text{N}$' },
            { say: 'At constant speed the driving force must balance the resistive force and this component.', show: '$F = 500 + 940 = 1440\\,\\text{N}$' },
            { say: 'Then use P equals F v.', show: '$P = 1440 \\times 20$' },
            { say: 'The power needed is about 28.8 kilowatts.', show: '$P = 2.88 \\times 10^{4}\\,\\text{W}$' } ] },
        { l: 'c', marks: 3, q: 'A ball of mass 0.50 kg is thrown vertically downwards at 4.0 m s⁻¹ from a window 10 m above the ground. Use the principle of conservation of energy to calculate its speed as it hits the ground. Neglect air resistance.',
          answer: '14.6 m s⁻¹',
          ms: ['C1 $\\tfrac12 mv^2 = \\tfrac12 mu^2 + mgh$', 'C1 $v^2 = 4.0^2 + 2 \\times 9.81 \\times 10$', 'A1 14.6 m s⁻¹'],
          steps: [
            { say: 'Energy at the ground equals the kinetic energy at the start plus the potential energy lost.', show: '$\\tfrac12 mv^2 = \\tfrac12 mu^2 + mgh$' },
            { say: 'The mass cancels.', show: '$v^2 = u^2 + 2gh$' },
            { say: 'Substitute 4.0 and 10 metres.', show: '$v^2 = 16 + 2(9.81)(10) = 212.2$' },
            { say: 'Take the square root. The speed is 14.6 metres per second.', show: '$v = 14.6\\,\\text{m s}^{-1}$' } ] } ] },

    { n: 9, points: ['motion', '1.4.6'],
      parts: [
        { l: 'a', marks: 6, q: 'Describe an experiment to measure the acceleration of free fall, $g$, using an object falling from rest. Include the apparatus, the measurements taken, how a graph is used to find $g$, and how you would improve accuracy. <i>In this question you will be assessed on your written communication skills.</i>',
          answer: 'Drop a steel ball from rest through measured heights h; time with electromagnet and electronic timer (or light gates); plot h against t²; g = 2 × gradient.',
          ms: [
            'Indicative content:',
            '1. Steel ball held by an electromagnet; switching off starts an electronic timer; ball hits trapdoor/pad which stops the timer (or light gates and data logger)',
            '2. Measure height $h$ from bottom of ball to trapdoor with a metre rule',
            '3. Record time $t$; repeat three times and average for each height',
            '4. Use at least five (six) different heights',
            '5. Ball starts from rest so $h = \\tfrac12 gt^2$',
            '6. Plot $h$ against $t^2$: straight line through origin with gradient $g/2$, so $g = 2 \\times$ gradient',
            '7. Improvements: use a small dense ball to reduce air resistance; electronic timing avoids reaction time; use large heights to reduce percentage uncertainty',
            'Band A (5–6 marks): at least six points, logical sequence, accurate terminology, few errors of spelling, punctuation and grammar',
            'Band B (3–4 marks): four or five points, mostly logical',
            'Band C (1–2 marks): two or three points, limited organisation',
            '0 marks: no relevant content'],
          steps: [
            { say: 'Hold a small steel ball with an electromagnet above a trapdoor. Switching off the magnet starts an electronic timer; the ball hitting the trapdoor stops it.', show: 'electromagnet → timer start; trapdoor → timer stop' },
            { say: 'Measure the height from the bottom of the ball to the trapdoor with a metre rule.', show: 'measure $h$ with metre rule' },
            { say: 'Time the fall three times for each height and take the mean. Use at least five heights.', show: '≥ 5 heights, 3 repeats each, average $t$' },
            { say: 'The ball starts from rest, so h equals a half g t squared.', show: '$h = \\tfrac12 g t^2$' },
            { say: 'Plot h against t squared. The gradient is g over 2, so g is twice the gradient.', show: '$g = 2 \\times \\text{gradient}$' },
            { say: 'A small dense ball keeps air resistance low, and electronic timing removes reaction time errors.', show: 'improve: dense ball, electronic timing, larger heights' } ] } ] },

    { n: 10, points: ['current', 'pd', '1.9.2', '1.10.1', '1.10.2'],
      parts: [
        { l: 'a', marks: 3, q: 'Define electromotive force (emf) and explain how it differs from potential difference.',
          answer: 'Emf is the energy converted into electrical energy per unit charge by a source; pd is the electrical energy converted into other forms per unit charge between two points.',
          ms: ['B1 emf: energy converted from other forms (e.g. chemical) to electrical per unit charge', 'B1 pd: electrical energy converted to other forms per unit charge', 'B1 clear contrast: emf is energy supplied by a source; pd is energy transferred by a component'],
          steps: [
            { say: 'Both are measured in joules per coulomb, or volts.', show: '$E = \\dfrac{W}{Q}$, $V = \\dfrac{W}{Q}$' },
            { say: 'Emf is about a source: energy changed from other forms, like chemical, into electrical energy per coulomb.', show: 'emf: other forms → electrical, per coulomb' },
            { say: 'Potential difference is about a component: electrical energy changed into other forms per coulomb.', show: 'pd: electrical → other forms, per coulomb' },
            { say: 'So emf is energy given to the charge; potential difference is energy taken from it.', show: 'emf supplies · pd uses' } ] },
        { l: 'b', marks: 3, q: 'An electric heater is rated 2.0 kW, 230 V. Calculate (i) the current, (ii) the resistance of the heater when operating.',
          answer: '(i) 8.70 A (ii) 26.5 Ω',
          ms: ['B1 (i) $I = P/V = 2000/230 = 8.70$ A', 'C1 (ii) $R = V^2/P$ or $V/I$', 'A1 26.5 Ω (accept 26 Ω)'],
          steps: [
            { say: 'Power equals current times voltage, so current is power over voltage.', show: '$I = \\dfrac{P}{V} = \\dfrac{2000}{230} = 8.70\\,\\text{A}$' },
            { say: 'For the resistance use R equals V squared over P.', show: '$R = \\dfrac{V^2}{P} = \\dfrac{230^2}{2000}$' },
            { say: 'That is 26.5 ohms.', show: '$R = 26.5\\,\\Omega$' } ] },
        { l: 'c', marks: 2, q: 'Calculate the charge that passes through the heater in 15 minutes.',
          answer: '7.83 × 10³ C',
          ms: ['C1 $\\Delta Q = I\\Delta t = 8.70 \\times 900$', 'A1 7.83 × 10³ C'],
          steps: [
            { say: 'Change 15 minutes into seconds: 900 seconds.', show: '$t = 15 \\times 60 = 900\\,\\text{s}$' },
            { say: 'Charge equals current times time.', show: '$\\Delta Q = 8.696 \\times 900$' },
            { say: 'About 7830 coulombs.', show: '$\\Delta Q = 7.83 \\times 10^{3}\\,\\text{C}$' } ] } ] },

    { n: 11, points: ['resistance', '1.11.3', '1.11.5', '1.11.8'],
      parts: [
        { l: 'a', marks: 3, q: 'Describe the current–potential difference characteristic of a semiconductor diode.',
          answer: 'Negligible current in reverse bias; in forward bias almost no current until about 0.6 V, then current rises steeply.',
          ms: ['B1 reverse bias: (almost) zero current / very high resistance', 'B1 forward bias: little current below about 0.6 V (switch-on voltage)', 'B1 above this current increases rapidly; resistance becomes very small'],
          steps: [
            { say: 'A diode only lets current through easily in one direction.', show: 'one-way component' },
            { say: 'In reverse bias the current is practically zero; the resistance is very high.', show: 'reverse: $I \\approx 0$' },
            { say: 'In forward bias, almost no current flows until about 0.6 volts.', show: 'forward: switch-on at about 0.6 V' },
            { say: 'Above that, the current rises very steeply, so the resistance becomes small.', show: 'above 0.6 V: $I$ rises steeply' } ] },
        { l: 'b', marks: 3, q: 'Wire B is made of the same metal as wire A. B is twice as long as A and has half its diameter. Calculate the ratio of the resistance of B to the resistance of A.',
          answer: '8',
          ms: ['C1 $R \\propto l/A$ and $A \\propto d^2$', 'C1 half diameter ⇒ area ÷ 4', 'A1 $R_B / R_A = 8$'],
          steps: [
            { say: 'Same metal means the same resistivity, so resistance depends on length over area.', show: '$R = \\dfrac{\\rho l}{A} \\propto \\dfrac{l}{d^2}$' },
            { say: 'Doubling the length doubles the resistance.', show: '$l \\times 2 \\Rightarrow R \\times 2$' },
            { say: 'Halving the diameter makes the area a quarter, which multiplies the resistance by 4.', show: '$d \\div 2 \\Rightarrow A \\div 4 \\Rightarrow R \\times 4$' },
            { say: 'Together, B has 8 times the resistance of A.', show: '$\\dfrac{R_B}{R_A} = 2 \\times 4 = 8$' } ] },
        { l: 'c', marks: 4, q: 'A 12 Ω resistor is connected in series with a parallel combination of a 6.0 Ω and a 12 Ω resistor, across a 4.8 V supply of negligible internal resistance. Calculate the current in the 6.0 Ω resistor.',
          answer: '0.20 A',
          ms: ['C1 parallel: $1/R = 1/6.0 + 1/12$ ⇒ 4.0 Ω', 'C1 total 16 Ω and $I = 4.8/16 = 0.30$ A', 'C1 pd across parallel = 0.30 × 4.0 = 1.2 V', 'A1 0.20 A'],
          steps: [
            { say: 'First combine the parallel pair.', show: '$\\dfrac{1}{R} = \\dfrac{1}{6.0} + \\dfrac{1}{12} \\Rightarrow R = 4.0\\,\\Omega$' },
            { say: 'Add the 12 ohm resistor in series.', show: '$R_T = 12 + 4.0 = 16\\,\\Omega$' },
            { say: 'Find the total current from the supply.', show: '$I = \\dfrac{4.8}{16} = 0.30\\,\\text{A}$' },
            { say: 'The voltage across the parallel section is 0.30 times 4.0.', show: '$V = 0.30 \\times 4.0 = 1.2\\,\\text{V}$' },
            { say: 'So the current in the 6.0 ohm resistor is 1.2 over 6.0.', show: '$I_6 = \\dfrac{1.2}{6.0} = 0.20\\,\\text{A}$' } ] } ] },

    { n: 12, points: ['internal', '1.12.1'],
      parts: [
        { l: 'a', marks: 4, q: 'When a battery supplies a current of 0.40 A its terminal potential difference is 5.6 V. When it supplies 0.80 A the terminal potential difference is 5.0 V. Calculate the internal resistance and the emf of the battery.',
          answer: 'r = 1.5 Ω, E = 6.2 V',
          ms: ['C1 $E = 5.6 + 0.40r$ and $E = 5.0 + 0.80r$', 'C1 subtract: $0.6 = 0.40r$', 'A1 $r = 1.5$ Ω', 'A1 $E = 6.2$ V'],
          steps: [
            { say: 'Write E equals V plus I r for each reading.', show: '$E = 5.6 + 0.40r$ &nbsp; $E = 5.0 + 0.80r$' },
            { say: 'The emf and internal resistance are the same both times, so subtract the equations.', show: '$0 = 0.6 - 0.40r$' },
            { say: 'So the internal resistance is 1.5 ohms.', show: '$r = 1.5\\,\\Omega$' },
            { say: 'Substitute back to find the emf.', show: '$E = 5.6 + 0.40 \\times 1.5 = 6.2\\,\\text{V}$' } ] } ] },

    { n: 13, points: ['divider', 'resistance', '1.13.1', '1.13.2', '1.11.6'],
      q: 'An NTC thermistor is connected in series with a 2.2 kΩ resistor across a 6.0 V supply of negligible internal resistance. The output voltage is taken across the 2.2 kΩ resistor. At 20 °C the thermistor has a resistance of 3.3 kΩ.',
      parts: [
        { l: 'a', marks: 2, q: 'Calculate the output voltage at 20 °C.',
          answer: '2.4 V',
          ms: ['C1 $V_{out} = \\dfrac{2.2}{2.2 + 3.3} \\times 6.0$', 'A1 2.4 V'],
          steps: [
            { say: 'Use the potential divider equation with the fixed resistor as R2.', show: '$V_{out} = \\dfrac{R_2}{R_1 + R_2}V_{in}$' },
            { say: 'Substitute in kilohms; the units cancel.', show: '$V_{out} = \\dfrac{2.2}{5.5} \\times 6.0$' },
            { say: 'The output is 2.4 volts.', show: '$V_{out} = 2.4\\,\\text{V}$' } ] },
        { l: 'b', marks: 3, q: 'Explain what happens to the output voltage as the temperature rises.',
          answer: 'Thermistor resistance falls, so it takes a smaller share of the 6.0 V; the pd across the fixed resistor (output) increases.',
          ms: ['B1 NTC: resistance decreases as temperature increases', 'B1 thermistor takes a smaller share of the supply pd (current increases)', 'B1 so $V_{out}$ across the fixed resistor increases'],
          steps: [
            { say: 'For an NTC thermistor, resistance falls as temperature rises.', show: 'temperature ↑ ⇒ $R_{th}$ ↓' },
            { say: 'The supply voltage is shared in the ratio of the resistances, so the thermistor now gets a smaller share.', show: '$V_{th}$ ↓' },
            { say: 'The two voltages add up to 6.0 volts, so the voltage across the fixed resistor rises.', show: '$V_{out} = 6.0 - V_{th}$ ↑' } ] } ] }
  ]
});

BCSP.add({
  id: 'as1-hard', unit: 'as1', level: 'hard',
  title: 'Physics AS 1 · Paper C (Hard)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['quantities', '1.1.2'],
      parts: [
        { l: 'a', marks: 3, q: 'The drag force on a car is $F = \\tfrac12 C\\rho A v^2$, where $\\rho$ is the density of air, $A$ the frontal area and $v$ the speed. Show that the drag coefficient $C$ has no units.',
          answer: 'ρAv² has units kg m⁻³ × m² × m² s⁻² = kg m s⁻², the same as F, so C is dimensionless.',
          ms: ['B1 units of $\\rho A v^2$: kg m⁻³ × m² × m² s⁻²', 'B1 simplify to kg m s⁻²', 'B1 same as newton, so $C = 2F/(\\rho A v^2)$ has no units'],
          steps: [
            { say: 'Rearrange for C. The half is just a number and has no units.', show: '$C = \\dfrac{2F}{\\rho A v^2}$' },
            { say: 'Write the units of the bottom line.', show: '$\\text{kg m}^{-3} \\times \\text{m}^2 \\times \\text{m}^2\\,\\text{s}^{-2}$' },
            { say: 'The metres give m to the power one, so this is kilogram metre per second squared.', show: '$= \\text{kg m s}^{-2}$' },
            { say: 'That is the same as a newton, so the units cancel and C has no units.', show: '$[C] = \\dfrac{\\text{kg m s}^{-2}}{\\text{kg m s}^{-2}} = 1$' } ] },
        { l: 'b', marks: 3, q: 'Express the unit of resistivity, Ω m, in SI base units.',
          answer: 'kg m³ s⁻³ A⁻²',
          ms: ['C1 V = W A⁻¹ = kg m² s⁻³ A⁻¹', 'C1 Ω = V A⁻¹ = kg m² s⁻³ A⁻²', 'A1 Ω m = kg m³ s⁻³ A⁻²'],
          steps: [
            { say: 'A volt is a watt per amp, and a watt is kilogram metre squared per second cubed.', show: '$\\text{V} = \\dfrac{\\text{W}}{\\text{A}} = \\text{kg m}^2\\,\\text{s}^{-3}\\,\\text{A}^{-1}$' },
            { say: 'An ohm is a volt per amp.', show: '$\\Omega = \\dfrac{\\text{V}}{\\text{A}} = \\text{kg m}^2\\,\\text{s}^{-3}\\,\\text{A}^{-2}$' },
            { say: 'Multiply by one more metre.', show: '$\\Omega\\,\\text{m} = \\text{kg m}^3\\,\\text{s}^{-3}\\,\\text{A}^{-2}$' } ] } ] },

    { n: 2, points: ['vectors', 'moments', '1.2.4', '1.3.2', '1.3.3'],
      parts: [
        { l: 'a', marks: 5, q: 'A 15 kg mass hangs from a rope. A horizontal force $F$ pulls the mass sideways so that it is held at rest with the rope at 30° to the vertical. Calculate the tension in the rope and the size of $F$.',
          answer: 'T = 170 N, F = 85.0 N',
          ms: ['B1 weight = 147 N', 'C1 vertical: $T\\cos 30^\\circ = mg$', 'A1 $T$ = 170 N', 'C1 horizontal: $F = T\\sin 30^\\circ$ (or $F = mg\\tan 30^\\circ$)', 'A1 $F$ = 85.0 N'],
          steps: [
            { say: 'Three forces act: weight down, F horizontally and the tension along the rope. In equilibrium both components balance.', show: '$\\Sigma F_x = 0,\\ \\Sigma F_y = 0$' },
            { say: 'Weight is 15 times 9.81.', show: '$mg = 147.15\\,\\text{N}$' },
            { say: 'Only the tension has a vertical component, T cos 30, and it balances the weight.', show: '$T\\cos 30^\\circ = 147.15 \\Rightarrow T = 170\\,\\text{N}$' },
            { say: 'Horizontally, F balances the horizontal component of the tension.', show: '$F = T\\sin 30^\\circ = 169.9 \\times 0.5$' },
            { say: 'So F is 85.0 newtons.', show: '$F = 85.0\\,\\text{N}$' } ] },
        { l: 'b', marks: 4, q: 'A uniform ladder of length 6.0 m and weight 200 N rests with its upper end against a smooth vertical wall and its foot on rough ground. The ladder makes an angle of 65° with the ground. Calculate the force exerted by the wall on the ladder.',
          answer: '46.6 N (horizontal)',
          ms: ['B1 smooth wall: force from wall is horizontal (perpendicular to wall)', 'C1 moments about foot: $R_w \\times 6.0\\sin 65^\\circ = 200 \\times 3.0\\cos 65^\\circ$', 'C1 correct perpendicular distances', 'A1 46.6 N'],
          steps: [
            { say: 'A smooth wall can only push at right angles to itself, so its force is horizontal.', show: '$R_w$ horizontal' },
            { say: 'Take moments about the foot of the ladder. This removes the unknown ground forces.', show: 'moments about the foot' },
            { say: 'The weight acts at the centre, 3.0 metres along. Its perpendicular distance is 3.0 cos 65.', show: '$200 \\times 3.0\\cos 65^\\circ = 253.6\\,\\text{N m}$' },
            { say: 'The wall force acts at the top. Its perpendicular distance is the height, 6.0 sine 65.', show: '$R_w \\times 6.0\\sin 65^\\circ = R_w \\times 5.44$' },
            { say: 'Set them equal and solve.', show: '$R_w = \\dfrac{253.6}{5.438} = 46.6\\,\\text{N}$' } ] } ] },

    { n: 3, points: ['motion', '1.4.2', '1.4.5'],
      parts: [
        { l: 'a', marks: 4, q: 'Car A travels along a straight road at a constant 20 m s⁻¹. As it passes car B, which is at rest, car B starts to accelerate uniformly at 2.5 m s⁻² in the same direction. Calculate (i) the time taken for B to catch up with A, (ii) the distance B travels in this time.',
          answer: '(i) 16 s (ii) 320 m',
          ms: ['C1 $s_A = 20t$, $s_B = \\tfrac12(2.5)t^2$', 'C1 equate: $20t = 1.25t^2$', 'A1 $t$ = 16 s', 'A1 320 m'],
          steps: [
            { say: 'Both cars start at the same place at the same time. Write an expression for each displacement.', show: '$s_A = 20t$ &nbsp; $s_B = \\tfrac12(2.5)t^2 = 1.25t^2$' },
            { say: 'B catches A when the displacements are equal.', show: '$1.25t^2 = 20t$' },
            { say: 'Divide by t, ignoring t equals zero.', show: '$t = \\dfrac{20}{1.25} = 16\\,\\text{s}$' },
            { say: 'Distance travelled: 20 times 16.', show: '$s = 20 \\times 16 = 320\\,\\text{m}$' } ] },
        { l: 'b', marks: 4, q: 'A hot-air balloon is rising vertically at a steady 5.0 m s⁻¹. When it is 40 m above the ground a sandbag is released from it. Neglecting air resistance, calculate the time taken for the sandbag to reach the ground.',
          answer: '3.41 s',
          ms: ['B1 initial velocity of sandbag is 5.0 m s⁻¹ upwards', 'C1 $-40 = 5.0t - \\tfrac12(9.81)t^2$', 'C1 quadratic formula applied correctly', 'A1 3.41 s'],
          steps: [
            { say: 'When released, the sandbag is already moving upwards at 5.0 metres per second, the same as the balloon.', show: '$u = +5.0\\,\\text{m s}^{-1}$ (up positive)' },
            { say: 'It ends 40 metres below its release point, so the displacement is minus 40.', show: '$s = -40\\,\\text{m},\\ a = -9.81\\,\\text{m s}^{-2}$' },
            { say: 'Use s equals u t plus a half a t squared, which gives a quadratic.', show: '$4.905t^2 - 5.0t - 40 = 0$' },
            { say: 'Use the quadratic formula and take the positive root.', show: '$t = \\dfrac{5.0 + \\sqrt{25 + 4(4.905)(40)}}{2(4.905)}$' },
            { say: 'The sandbag takes 3.41 seconds.', show: '$t = 3.41\\,\\text{s}$' } ] } ] },

    { n: 4, points: ['projectiles', 'energy-work', '1.5.2', '1.8.4'],
      q: 'A ball is thrown from the top of a building 20.0 m high with a velocity of 15.0 m s⁻¹ at 40° above the horizontal. It lands on level ground below. Neglect air resistance.',
      parts: [
        { l: 'a', marks: 4, q: 'Calculate the time of flight.',
          answer: '3.23 s',
          ms: ['B1 $u_y = 15.0\\sin 40^\\circ = 9.64$ m s⁻¹', 'C1 $-20.0 = 9.64t - 4.905t^2$', 'C1 correct solution of quadratic', 'A1 3.23 s'],
          steps: [
            { say: 'Find the vertical component of the launch velocity.', show: '$u_y = 15.0\\sin 40^\\circ = 9.642\\,\\text{m s}^{-1}$' },
            { say: 'Taking up as positive, the ball lands 20 metres below the launch point.', show: '$-20.0 = 9.642t - 4.905t^2$' },
            { say: 'Rearrange into a quadratic.', show: '$4.905t^2 - 9.642t - 20.0 = 0$' },
            { say: 'Solve and keep the positive root.', show: '$t = \\dfrac{9.642 + \\sqrt{9.642^2 + 4(4.905)(20.0)}}{9.81}$' },
            { say: 'The time of flight is 3.23 seconds.', show: '$t = 3.23\\,\\text{s}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the horizontal distance travelled.',
          answer: '37.1 m',
          ms: ['C1 $x = 15.0\\cos 40^\\circ \\times 3.23$', 'A1 37.1 m'],
          steps: [
            { say: 'Horizontal velocity is constant.', show: '$u_x = 15.0\\cos 40^\\circ = 11.49\\,\\text{m s}^{-1}$' },
            { say: 'Multiply by the time of flight.', show: '$x = 11.49 \\times 3.229$' },
            { say: 'The ball lands 37.1 metres away.', show: '$x = 37.1\\,\\text{m}$' } ] },
        { l: 'c', marks: 3, q: 'Use energy considerations to find the speed of the ball just before it hits the ground.',
          answer: '24.8 m s⁻¹',
          ms: ['C1 $\\tfrac12 mv^2 = \\tfrac12 mu^2 + mgh$', 'C1 $v^2 = 15.0^2 + 2(9.81)(20.0) = 617$', 'A1 24.8 m s⁻¹'],
          steps: [
            { say: 'Energy is conserved, and the direction of launch does not matter for energy.', show: '$\\tfrac12 mv^2 = \\tfrac12 mu^2 + mgh$' },
            { say: 'Cancel the mass.', show: '$v^2 = u^2 + 2gh$' },
            { say: 'Substitute.', show: '$v^2 = 225 + 392.4 = 617.4$' },
            { say: 'The speed is 24.8 metres per second.', show: '$v = 24.8\\,\\text{m s}^{-1}$' } ] } ] },

    { n: 5, points: ['newton', '1.6.2', '1.6.3'],
      parts: [
        { l: 'a', marks: 5, q: 'A car of mass 1000 kg tows a trailer of mass 400 kg along a level road using a light, horizontal tow bar. The driving force is 2500 N. The resistive forces are 300 N on the car and 200 N on the trailer. Calculate (i) the acceleration, (ii) the tension in the tow bar.',
          answer: '(i) 1.43 m s⁻² (ii) 771 N',
          ms: ['C1 (i) whole system: $2500 - 500 = 1400a$', 'A1 1.43 m s⁻²', 'C1 (ii) trailer alone: $T - 200 = 400a$', 'C1 substitution', 'A1 771 N'],
          steps: [
            { say: 'Treat the car and trailer as one system. The tension is internal, so it cancels.', show: 'system mass $= 1400\\,\\text{kg}$' },
            { say: 'The resultant force is the driving force minus both resistive forces.', show: '$2500 - 300 - 200 = 1400a$' },
            { say: 'So the acceleration is 2000 over 1400.', show: '$a = 1.43\\,\\text{m s}^{-2}$' },
            { say: 'Now look at the trailer alone. The tow bar pulls it forward and 200 newtons resist.', show: '$T - 200 = 400a$' },
            { say: 'Substitute the acceleration.', show: '$T = 200 + 400 \\times 1.429 = 771\\,\\text{N}$' } ] },
        { l: 'b', marks: 5, q: 'A small object of mass 0.20 kg falls through air. The drag force is $D = kv^2$, where $k = 0.0050$ kg m⁻¹. Calculate (i) its terminal velocity, (ii) its acceleration when its speed is 10 m s⁻¹.',
          answer: '(i) 19.8 m s⁻¹ (ii) 7.31 m s⁻²',
          ms: ['C1 (i) at terminal velocity $kv^2 = mg$', 'C1 $v = \\sqrt{0.20 \\times 9.81 / 0.0050}$', 'A1 19.8 m s⁻¹', 'C1 (ii) $mg - kv^2 = ma$: $1.962 - 0.50 = 0.20a$', 'A1 7.31 m s⁻²'],
          steps: [
            { say: 'At terminal velocity the drag equals the weight.', show: '$kv^2 = mg$' },
            { say: 'Rearrange and substitute.', show: '$v = \\sqrt{\\dfrac{mg}{k}} = \\sqrt{\\dfrac{0.20 \\times 9.81}{0.0050}} = \\sqrt{392.4}$' },
            { say: 'The terminal velocity is 19.8 metres per second.', show: '$v_t = 19.8\\,\\text{m s}^{-1}$' },
            { say: 'At 10 metres per second, the drag is 0.0050 times 100, which is 0.50 newtons.', show: '$D = 0.0050 \\times 10^2 = 0.50\\,\\text{N}$' },
            { say: 'Resultant force is weight minus drag; divide by the mass.', show: '$a = \\dfrac{1.962 - 0.50}{0.20} = 7.31\\,\\text{m s}^{-2}$' } ] } ] },

    { n: 6, points: ['momentum', '1.7.3', '1.7.4', '1.7.5'],
      parts: [
        { l: 'a', marks: 4, q: 'A 2.0 kg trolley moving at 6.0 m s⁻¹ collides head-on with a stationary 4.0 kg trolley. After the collision the 2.0 kg trolley moves backwards at 2.0 m s⁻¹. (i) Calculate the velocity of the 4.0 kg trolley. (ii) Show that the collision is elastic.',
          answer: '(i) 4.0 m s⁻¹ forwards (ii) KE before = 36 J = KE after',
          ms: ['C1 (i) $12 = 2.0(-2.0) + 4.0v$', 'A1 4.0 m s⁻¹', 'B1 (ii) KE before = 36 J', 'B1 KE after = 4.0 + 32 = 36 J, so KE conserved: elastic'],
          steps: [
            { say: 'Take the original direction as positive. Momentum before is 2 times 6, which is 12.', show: '$p_{\\text{before}} = 2.0 \\times 6.0 = 12\\,\\text{kg m s}^{-1}$' },
            { say: 'After, the small trolley has velocity minus 2.0.', show: '$12 = 2.0(-2.0) + 4.0v$' },
            { say: 'So 4 v equals 16 and v is 4.0 metres per second forwards.', show: '$v = 4.0\\,\\text{m s}^{-1}$' },
            { say: 'Kinetic energy before is a half times 2 times 36, which is 36 joules.', show: '$E_k = \\tfrac12(2.0)(6.0)^2 = 36\\,\\text{J}$' },
            { say: 'After: 4 joules plus 32 joules is also 36 joules, so kinetic energy is conserved and the collision is elastic.', show: '$\\tfrac12(2.0)(2.0)^2 + \\tfrac12(4.0)(4.0)^2 = 4 + 32 = 36\\,\\text{J}$' } ] },
        { l: 'b', marks: 2, q: 'Water leaves a hose at 12 m s⁻¹ at a rate of 3.0 kg s⁻¹. It hits a wall at right angles and does not rebound. Calculate the force exerted on the wall.',
          answer: '36 N',
          ms: ['C1 $F = \\Delta p / \\Delta t$ = (mass per second) × change in velocity', 'A1 36 N'],
          steps: [
            { say: 'Force equals rate of change of momentum.', show: '$F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{\\Delta m}{\\Delta t}\\,\\Delta v$' },
            { say: 'Each second, 3.0 kilograms of water loses 12 metres per second of velocity.', show: '$F = 3.0 \\times 12$' },
            { say: 'So the force is 36 newtons.', show: '$F = 36\\,\\text{N}$' } ] },
        { l: 'c', marks: 5, q: 'A stationary object of mass 3.0 kg explodes into two pieces of masses 1.0 kg and 2.0 kg, which move apart in opposite directions. The explosion releases 600 J of kinetic energy. Calculate the speed of each piece.',
          answer: '1.0 kg: 28.3 m s⁻¹; 2.0 kg: 14.1 m s⁻¹',
          ms: ['C1 momentum: $1.0v_1 = 2.0v_2$ so $v_1 = 2v_2$', 'C1 energy: $\\tfrac12(1.0)v_1^2 + \\tfrac12(2.0)v_2^2 = 600$', 'C1 $3v_2^2 = 600$', 'A1 $v_2$ = 14.1 m s⁻¹', 'A1 $v_1$ = 28.3 m s⁻¹'],
          steps: [
            { say: 'The total momentum is zero before, so the two momenta are equal in size and opposite.', show: '$1.0v_1 = 2.0v_2 \\Rightarrow v_1 = 2v_2$' },
            { say: 'All 600 joules becomes kinetic energy of the pieces.', show: '$\\tfrac12(1.0)v_1^2 + \\tfrac12(2.0)v_2^2 = 600$' },
            { say: 'Substitute v1 equals 2 v2.', show: '$2v_2^2 + v_2^2 = 600 \\Rightarrow 3v_2^2 = 600$' },
            { say: 'So v2 is the square root of 200.', show: '$v_2 = 14.1\\,\\text{m s}^{-1}$' },
            { say: 'And v1 is twice that.', show: '$v_1 = 28.3\\,\\text{m s}^{-1}$' } ] } ] },

    { n: 7, points: ['energy-work', '1.8.1', '1.8.4', '1.8.5'],
      parts: [
        { l: 'a', marks: 5, q: 'A skier of mass 70 kg starts from rest at the top of a straight slope 120 m long, inclined at 15° to the horizontal. The average resistive force on the skier is 60 N. Calculate her speed at the bottom of the slope.',
          answer: '20.1 m s⁻¹',
          ms: ['C1 vertical drop = 120 sin 15° = 31.1 m', 'C1 loss of $E_p$ = 70 × 9.81 × 31.1 = 2.13 × 10⁴ J', 'C1 work against resistance = 60 × 120 = 7200 J', 'C1 $E_k$ = 1.41 × 10⁴ J', 'A1 20.1 m s⁻¹'],
          steps: [
            { say: 'The height dropped is the slope length times sine 15.', show: '$h = 120\\sin 15^\\circ = 31.06\\,\\text{m}$' },
            { say: 'Potential energy lost is m g h.', show: '$\\Delta E_p = 70 \\times 9.81 \\times 31.06 = 21\\,330\\,\\text{J}$' },
            { say: 'Some of this does work against the resistive force over 120 metres.', show: '$W = 60 \\times 120 = 7200\\,\\text{J}$' },
            { say: 'What is left becomes kinetic energy.', show: '$E_k = 21\\,330 - 7200 = 14\\,130\\,\\text{J}$' },
            { say: 'Solve a half m v squared for v.', show: '$v = \\sqrt{\\dfrac{2 \\times 14\\,130}{70}} = 20.1\\,\\text{m s}^{-1}$' } ] },
        { l: 'b', marks: 3, q: 'A cyclist’s maximum useful power output is 400 W. The total resistive force on the cyclist is $F = 0.30v^2$ (F in N, v in m s⁻¹). Calculate the maximum speed on level ground.',
          answer: '11.0 m s⁻¹',
          ms: ['C1 at max speed driving force = resistive force, $P = Fv = 0.30v^3$', 'C1 $v^3 = 400/0.30 = 1333$', 'A1 11.0 m s⁻¹'],
          steps: [
            { say: 'At maximum speed the cyclist is not accelerating, so driving force equals resistive force.', show: '$F = 0.30v^2$' },
            { say: 'Power is force times velocity, which gives v cubed.', show: '$P = Fv = 0.30v^3$' },
            { say: 'Set this equal to 400 watts.', show: '$v^3 = \\dfrac{400}{0.30} = 1333$' },
            { say: 'Take the cube root.', show: '$v = 11.0\\,\\text{m s}^{-1}$' } ] },
        { l: 'c', marks: 3, q: 'A pump raises 0.50 kg of water each second through a height of 8.0 m and ejects it at 6.0 m s⁻¹. The electrical input power to the pump is 120 W. Calculate the efficiency of the pump.',
          answer: '40%',
          ms: ['C1 useful power = $mgh/t + \\tfrac12 mv^2/t$ = 39.2 + 9.0', 'C1 48.2 W', 'A1 0.40 (40%)'],
          steps: [
            { say: 'Each second the water gains both potential and kinetic energy.', show: 'useful power = $E_p$ per second + $E_k$ per second' },
            { say: 'Potential energy per second is 0.50 times 9.81 times 8.0.', show: '$0.50 \\times 9.81 \\times 8.0 = 39.2\\,\\text{W}$' },
            { say: 'Kinetic energy per second is a half times 0.50 times 6 squared.', show: '$\\tfrac12 \\times 0.50 \\times 6.0^2 = 9.0\\,\\text{W}$' },
            { say: 'So useful power is 48.2 watts. Divide by the input power.', show: '$\\dfrac{48.2}{120} = 0.40 = 40\\%$' } ] } ] },

    { n: 8, points: ['internal', '1.12.1', '1.12.2'],
      parts: [
        { l: 'a', marks: 6, q: 'Describe an experiment to determine the emf and internal resistance of a cell. Include a circuit description, the readings taken, how a graph is used to obtain both quantities, and a precaution. <i>In this question you will be assessed on your written communication skills.</i>',
          answer: 'Cell with variable resistor and ammeter in series, voltmeter across cell; vary R for a range of I; plot V against I; intercept = E, gradient = −r.',
          ms: [
            'Indicative content:',
            '1. Cell in series with an ammeter and a variable resistor (rheostat); voltmeter across the cell terminals',
            '2. Adjust the variable resistor to obtain a range of currents',
            '3. Record terminal pd $V$ and current $I$ for at least six settings',
            '4. $V = E - Ir$ (compare with $y = mx + c$)',
            '5. Plot $V$ (y-axis) against $I$ (x-axis): straight line with negative gradient',
            '6. y-intercept = emf $E$; gradient = $-r$',
            '7. Precaution: switch off between readings / use a protective resistor so the cell does not heat or run down (r changes); use a high-resistance voltmeter',
            'Band A (5–6 marks): at least six points, logical, accurate terminology, good spelling, punctuation and grammar',
            'Band B (3–4 marks): four or five points, reasonably logical',
            'Band C (1–2 marks): two or three points, limited organisation',
            '0 marks: no relevant content'],
          steps: [
            { say: 'Connect the cell in series with an ammeter and a variable resistor, and put a voltmeter across the cell’s terminals.', show: 'cell + ammeter + rheostat in series; voltmeter across cell' },
            { say: 'Change the variable resistor to get at least six different currents, recording the voltage and current each time.', show: 'record $(I, V)$ for ≥ 6 settings' },
            { say: 'The theory is V equals E minus I r, which has the form y equals m x plus c.', show: '$V = -rI + E$' },
            { say: 'Plot V against I. You get a straight line sloping down.', show: 'graph of $V$ against $I$' },
            { say: 'The intercept on the V axis is the emf, and the gradient is minus the internal resistance.', show: 'intercept $= E$, gradient $= -r$' },
            { say: 'Switch off between readings so the cell does not warm up or run down, which would change its internal resistance.', show: 'precaution: switch off between readings' } ] } ] },

    { n: 9, points: ['current', 'pd', '1.9.2', '1.10.2'],
      parts: [
        { l: 'a', marks: 2, q: 'The current in a wire increases uniformly from 0 to 4.0 A in 5.0 s and then stays at 4.0 A for a further 5.0 s. Calculate the total charge that flows.',
          answer: '30 C',
          ms: ['C1 charge = area under current–time graph: ½ × 5.0 × 4.0 + 4.0 × 5.0', 'A1 30 C'],
          steps: [
            { say: 'Charge equals current times time, so it is the area under a current time graph.', show: '$\\Delta Q = $ area under $I$–$t$ graph' },
            { say: 'The first part is a triangle: a half times 5.0 times 4.0, which is 10 coulombs.', show: '$\\tfrac12 \\times 5.0 \\times 4.0 = 10\\,\\text{C}$' },
            { say: 'The second part is a rectangle: 4.0 times 5.0, which is 20 coulombs.', show: '$4.0 \\times 5.0 = 20\\,\\text{C}$' },
            { say: 'The total is 30 coulombs.', show: '$\\Delta Q = 30\\,\\text{C}$' } ] },
        { l: 'b', marks: 3, q: 'A 12 V car battery is rated at 60 A h (it can deliver 60 A for 1 hour). Calculate the energy it can supply, assuming its emf stays at 12 V.',
          answer: '2.59 × 10⁶ J',
          ms: ['C1 $Q = 60 \\times 3600 = 2.16 \\times 10^5$ C', 'C1 $W = QV$', 'A1 2.59 × 10⁶ J'],
          steps: [
            { say: 'First find the charge: 60 amps for 3600 seconds.', show: '$Q = 60 \\times 3600 = 2.16 \\times 10^{5}\\,\\text{C}$' },
            { say: 'Each coulomb gets 12 joules, so energy equals charge times voltage.', show: '$W = QV = 2.16 \\times 10^{5} \\times 12$' },
            { say: 'The battery can supply about 2.59 million joules.', show: '$W = 2.59 \\times 10^{6}\\,\\text{J}$' } ] },
        { l: 'c', marks: 3, q: 'A lamp rated 6.0 V, 3.0 W is to work normally from a 9.0 V supply of negligible internal resistance, using a resistor in series. Calculate the resistance needed and the power wasted in it.',
          answer: '6.0 Ω; 1.5 W',
          ms: ['B1 lamp current = 3.0/6.0 = 0.50 A', 'C1 resistor pd = 3.0 V so $R = 3.0/0.50$ = 6.0 Ω', 'A1 power in resistor = 3.0 × 0.50 = 1.5 W'],
          steps: [
            { say: 'Working normally, the lamp current is power over voltage.', show: '$I = \\dfrac{3.0}{6.0} = 0.50\\,\\text{A}$' },
            { say: 'The resistor must take the remaining 3.0 volts.', show: '$V_R = 9.0 - 6.0 = 3.0\\,\\text{V}$' },
            { say: 'The same current flows through it in series.', show: '$R = \\dfrac{3.0}{0.50} = 6.0\\,\\Omega$' },
            { say: 'Power wasted is current times voltage for the resistor.', show: '$P = 0.50 \\times 3.0 = 1.5\\,\\text{W}$' } ] } ] },

    { n: 10, points: ['resistance', '1.11.1', '1.11.3', '1.11.5', '1.11.7'],
      parts: [
        { l: 'a', marks: 4, q: 'The table shows readings for a filament lamp.<br><table class="tbl"><tr><th>V / V</th><td>1.0</td><td>2.0</td><td>4.0</td><td>6.0</td></tr><tr><th>I / A</th><td>0.20</td><td>0.32</td><td>0.45</td><td>0.55</td></tr></table>Calculate the resistance at 1.0 V and at 6.0 V, and explain the difference in terms of the behaviour of the filament.',
          answer: '5.0 Ω at 1.0 V; 10.9 Ω at 6.0 V. Higher current heats the filament; ions vibrate more, so resistance rises.',
          ms: ['B1 5.0 Ω', 'B1 10.9 Ω (accept 11 Ω)', 'B1 greater current ⇒ higher filament temperature', 'B1 lattice ions vibrate with larger amplitude, more collisions with electrons, so resistance increases'],
          steps: [
            { say: 'Resistance is V over I at each point, not the gradient.', show: '$R = \\dfrac{V}{I}$' },
            { say: 'At 1.0 volt: 1.0 over 0.20 is 5.0 ohms.', show: '$R = \\dfrac{1.0}{0.20} = 5.0\\,\\Omega$' },
            { say: 'At 6.0 volts: 6.0 over 0.55 is 10.9 ohms.', show: '$R = \\dfrac{6.0}{0.55} = 10.9\\,\\Omega$' },
            { say: 'The bigger current heats the filament, so its metal ions vibrate more and the electrons collide with them more often. The resistance rises.', show: '$I$ ↑ ⇒ $T$ ↑ ⇒ more collisions ⇒ $R$ ↑' } ] },
        { l: 'b', marks: 4, q: 'In a resistivity experiment, a graph of resistance against length for a wire has a gradient of 12.5 Ω m⁻¹. The mean diameter of the wire is 0.315 mm. Calculate the resistivity of the metal.',
          answer: '9.74 × 10⁻⁷ Ω m',
          ms: ['C1 gradient $= \\rho/A$', 'C1 $A = \\pi(0.1575 \\times 10^{-3})^2 = 7.79 \\times 10^{-8}$ m²', 'C1 $\\rho = 12.5 \\times 7.79 \\times 10^{-8}$', 'A1 9.74 × 10⁻⁷ Ω m'],
          steps: [
            { say: 'Since R equals rho over A times l, the gradient of R against l is rho over A.', show: 'gradient $= \\dfrac{\\rho}{A}$' },
            { say: 'Find the area from the diameter. The radius is 0.1575 millimetres.', show: '$A = \\pi (0.1575 \\times 10^{-3})^2 = 7.79 \\times 10^{-8}\\,\\text{m}^2$' },
            { say: 'Multiply the gradient by the area.', show: '$\\rho = 12.5 \\times 7.793 \\times 10^{-8}$' },
            { say: 'The resistivity is 9.74 times ten to the minus seven ohm metres.', show: '$\\rho = 9.74 \\times 10^{-7}\\,\\Omega\\,\\text{m}$' } ] },
        { l: 'c', marks: 2, q: 'Explain what is meant by the critical temperature of a superconductor, and give one application of superconductors.',
          answer: 'The temperature below which the material’s resistance falls to zero. Application: e.g. MRI scanner magnets, maglev trains, power cables.',
          ms: ['B1 temperature below which resistance (resistivity) becomes zero', 'B1 one valid application (e.g. strong electromagnets in MRI scanners, particle accelerators, maglev)'],
          steps: [
            { say: 'Some materials lose all their resistance when cooled enough.', show: 'superconductor: $R = 0$' },
            { say: 'The critical temperature is the temperature below which this happens.', show: 'below $T_c$: resistance is zero' },
            { say: 'Because no energy is wasted as heat, they are used for very strong electromagnets, for example in MRI scanners.', show: 'use: MRI magnets, maglev, accelerators' } ] } ] },

    { n: 11, points: ['internal', 'resistance', '1.12.1', '1.11.8', '1.10.2'],
      q: 'A battery of emf 9.0 V and internal resistance 1.0 Ω is connected to a 4.0 Ω resistor in series with a parallel combination of a 6.0 Ω and a 3.0 Ω resistor.',
      parts: [
        { l: 'a', marks: 5, q: 'Calculate (i) the current from the battery, (ii) the terminal pd, (iii) the current in the 3.0 Ω resistor.',
          answer: '(i) 1.29 A (ii) 7.71 V (iii) 0.857 A',
          ms: ['C1 parallel = 2.0 Ω, total resistance = 4.0 + 2.0 + 1.0 = 7.0 Ω', 'A1 (i) 1.29 A', 'A1 (ii) $V = E - Ir$ = 7.71 V', 'C1 (iii) pd across parallel = 1.286 × 2.0 = 2.57 V', 'A1 0.857 A'],
          steps: [
            { say: 'Combine the parallel pair: 6 times 3 over 6 plus 3 is 2.0 ohms.', show: '$R_\\parallel = \\dfrac{6.0 \\times 3.0}{9.0} = 2.0\\,\\Omega$' },
            { say: 'Total resistance includes the internal resistance.', show: '$R_T = 4.0 + 2.0 + 1.0 = 7.0\\,\\Omega$' },
            { say: 'So the current is 9.0 over 7.0.', show: '$I = \\dfrac{9.0}{7.0} = 1.29\\,\\text{A}$' },
            { say: 'Terminal pd is emf minus lost volts.', show: '$V = 9.0 - 1.286 \\times 1.0 = 7.71\\,\\text{V}$' },
            { say: 'The pd across the parallel pair is the current times 2.0 ohms. Divide by 3.0 ohms for that branch.', show: '$V_\\parallel = 2.57\\,\\text{V}$, $I_3 = \\dfrac{2.571}{3.0} = 0.857\\,\\text{A}$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the power dissipated in the internal resistance.',
          answer: '1.65 W',
          ms: ['C1 $P = I^2 r = 1.286^2 \\times 1.0$', 'A1 1.65 W'],
          steps: [
            { say: 'Use P equals I squared R for the internal resistance.', show: '$P = I^2 r$' },
            { say: 'Substitute the unrounded current.', show: '$P = (1.286)^2 \\times 1.0$' },
            { say: 'About 1.65 watts is wasted inside the battery.', show: '$P = 1.65\\,\\text{W}$' } ] } ] },

    { n: 12, points: ['divider', '1.13.1', '1.13.2'],
      q: 'A light-sensing circuit uses an LDR in series with a fixed resistor $R$ across a 5.0 V supply of negligible internal resistance. The output is taken across the LDR. A lamp must switch on when the output reaches 3.0 V. In the dark the LDR has resistance 8.0 kΩ; in daylight it is 500 Ω.',
      parts: [
        { l: 'a', marks: 3, q: 'Calculate the value of $R$ so that the output is exactly 3.0 V when the LDR is at its dark resistance.',
          answer: '5.3 kΩ',
          ms: ['C1 $3.0 = \\dfrac{8.0}{R + 8.0} \\times 5.0$', 'C1 $R + 8.0 = 13.3$', 'A1 5.3 kΩ'],
          steps: [
            { say: 'The output is across the LDR, so the LDR is R2 in the potential divider equation.', show: '$V_{out} = \\dfrac{R_{LDR}}{R + R_{LDR}}V_{in}$' },
            { say: 'Substitute in kilohms.', show: '$3.0 = \\dfrac{8.0}{R + 8.0} \\times 5.0$' },
            { say: 'Rearrange.', show: '$R + 8.0 = \\dfrac{8.0 \\times 5.0}{3.0} = 13.3$' },
            { say: 'So R is 5.3 kilohms.', show: '$R = 5.3\\,\\text{k}\\Omega$' } ] },
        { l: 'b', marks: 2, q: 'Calculate the output voltage in daylight, and hence state whether the lamp is on or off.',
          answer: '0.43 V; lamp off',
          ms: ['C1 $V_{out} = \\dfrac{0.50}{5.33 + 0.50} \\times 5.0$', 'A1 0.43 V, below 3.0 V so lamp is off'],
          steps: [
            { say: 'In daylight the LDR is only 0.50 kilohms.', show: '$R_{LDR} = 0.50\\,\\text{k}\\Omega$' },
            { say: 'Put this into the divider equation.', show: '$V_{out} = \\dfrac{0.50}{5.33 + 0.50} \\times 5.0 = 0.43\\,\\text{V}$' },
            { say: 'This is well below 3.0 volts, so the lamp stays off.', show: '0.43 V < 3.0 V ⇒ lamp off' } ] } ] }
  ]
});
