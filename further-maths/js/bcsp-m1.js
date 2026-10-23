// BCS Academy original papers · not CCEA papers. Maths AS 1 Pure Mathematics (three practice papers).
// Format follows the CCEA GCE Mathematics (2018) AS 1 unit: 1 hour 45 minutes, 100 marks, calculator allowed, answer all questions.
// Points are COURSES['m1'].points ids. Every numerical answer was checked by computation.

BCSP.add({
  id: 'm1-easy', unit: 'm1', level: 'easy',
  title: 'Maths AS 1 · Paper A (Easy)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['m_ind', 'm_bin'],
      parts: [
        { l: 'a', marks: 2, q: 'Simplify $(8x^{6})^{\\frac{2}{3}}$.',
          answer: '$4x^{4}$',
          ms: ['M1 $8^{\\frac23} = 4$ or $(x^6)^{\\frac23} = x^4$', 'A1 $4x^4$'],
          steps: [
            { say: 'A power of two thirds means cube root, then square. Apply it to the number and to the x part separately.', show: '$(8x^6)^{\\frac23} = 8^{\\frac23}\\,(x^6)^{\\frac23}$' },
            { say: 'The cube root of 8 is 2, and 2 squared is 4.', show: '$8^{\\frac23} = (\\sqrt[3]{8})^2 = 2^2 = 4$' },
            { say: 'For the x part, multiply the powers: 6 times two thirds is 4.', show: '$(x^6)^{\\frac23} = x^{6\\times\\frac23} = x^4$' },
            { say: 'Put the two parts together.', show: '$4x^4$' } ] },
        { l: 'b', marks: 3, q: 'Express $\\dfrac{5+\\sqrt3}{2-\\sqrt3}$ in the form $a + b\\sqrt3$, where $a$ and $b$ are integers.',
          answer: '$13 + 7\\sqrt3$',
          ms: ['M1 multiply numerator and denominator by $2+\\sqrt3$', 'M1 expand numerator to four terms, denominator $= 1$', 'A1 $13 + 7\\sqrt3$'],
          steps: [
            { say: 'To rationalise the denominator, multiply top and bottom by its conjugate, 2 plus root 3.', show: '$\\dfrac{5+\\sqrt3}{2-\\sqrt3}\\times\\dfrac{2+\\sqrt3}{2+\\sqrt3}$' },
            { say: 'The denominator is a difference of two squares: 4 minus 3, which is 1.', show: '$(2-\\sqrt3)(2+\\sqrt3) = 4 - 3 = 1$' },
            { say: 'Expand the numerator term by term.', show: '$(5+\\sqrt3)(2+\\sqrt3) = 10 + 5\\sqrt3 + 2\\sqrt3 + 3$' },
            { say: 'Collect like terms: 13 plus 7 root 3.', show: '$= 13 + 7\\sqrt3$' } ] },
        { l: 'c', marks: 3, q: 'Find the binomial expansion of $(2+x)^4$, simplifying each term.',
          answer: '$16 + 32x + 24x^2 + 8x^3 + x^4$',
          ms: ['M1 correct binomial coefficients 1, 4, 6, 4, 1', 'M1 correct powers of 2 and $x$', 'A1 all five terms correct'],
          steps: [
            { say: 'The coefficients for power 4 come from Pascal\u2019s triangle: 1, 4, 6, 4, 1.', show: '$^4C_r:\\ 1,\\ 4,\\ 6,\\ 4,\\ 1$' },
            { say: 'The powers of 2 go down from 4 while the powers of x go up from 0.', show: '$2^4 + 4(2^3)x + 6(2^2)x^2 + 4(2)x^3 + x^4$' },
            { say: 'Simplify each term.', show: '$16 + 32x + 24x^2 + 8x^3 + x^4$' } ] },
        { l: 'd', marks: 2, q: 'Hence find the coefficient of $x^2$ in the expansion of $(2+x)^4(1-3x)$.',
          answer: '$-72$',
          ms: ['M1 $24\\times1 + 32\\times(-3)$', 'A1 $-72$'],
          steps: [
            { say: 'An x squared term comes from x squared times 1, or from x times minus 3x.', show: '$24x^2\\times1 \\quad\\text{and}\\quad 32x\\times(-3x)$' },
            { say: 'Add the two contributions.', show: '$24 - 96$' },
            { say: 'The coefficient is minus 72.', show: '$-72$' } ] } ] },

    { n: 2, points: ['m_quad', 'm_ineq'],
      q: 'The function f is defined by $f(x) = x^2 - 6x + 11$.',
      parts: [
        { l: 'a', marks: 2, q: 'Express $f(x)$ in the form $(x-p)^2 + q$.',
          answer: '$(x-3)^2 + 2$',
          ms: ['M1 $(x-3)^2$ seen', 'A1 $(x-3)^2 + 2$'],
          steps: [
            { say: 'Halve the coefficient of x: half of minus 6 is minus 3.', show: '$x^2 - 6x = (x-3)^2 - 9$' },
            { say: 'Add on the constant 11.', show: '$f(x) = (x-3)^2 - 9 + 11$' },
            { say: 'Simplify.', show: '$f(x) = (x-3)^2 + 2$' } ] },
        { l: 'b', marks: 1, q: 'Write down the co-ordinates of the minimum point of $y = f(x)$.',
          answer: '$(3,\\ 2)$',
          ms: ['B1 $(3, 2)$'],
          steps: [
            { say: 'The squared bracket is never negative, so it is smallest, zero, when x equals 3.', show: '$(x-3)^2 = 0 \\iff x = 3$' },
            { say: 'Then y equals 2.', show: 'minimum point $(3,\\ 2)$' },
            { say: 'Notice this also shows f of x is always positive.', show: '$f(x) \\ge 2 \\gt 0$' } ] },
        { l: 'c', marks: 2, q: 'Find the value of $k$ for which the equation $x^2 - 6x + k = 0$ has equal roots.',
          answer: '$k = 9$',
          ms: ['M1 $b^2 - 4ac = 0$ used: $36 - 4k = 0$', 'A1 $k = 9$'],
          steps: [
            { say: 'Equal roots means the discriminant, b squared minus 4 a c, is zero.', show: '$b^2 - 4ac = 0$' },
            { say: 'Here a is 1, b is minus 6 and c is k.', show: '$(-6)^2 - 4(1)(k) = 0$' },
            { say: 'Solve: 36 equals 4k, so k is 9.', show: '$36 = 4k \\Rightarrow k = 9$' } ] },
        { l: 'd', marks: 3, q: 'Solve the inequality $x^2 - 2x - 15 \\le 0$.',
          answer: '$-3 \\le x \\le 5$',
          ms: ['M1 factorise or solve $x^2-2x-15=0$', 'A1 critical values $-3$ and $5$', 'A1 $-3 \\le x \\le 5$'],
          steps: [
            { say: 'First find where the quadratic equals zero by factorising.', show: '$x^2 - 2x - 15 = (x-5)(x+3)$' },
            { say: 'The critical values are 5 and minus 3.', show: '$x = 5,\\ x = -3$' },
            { say: 'The graph is a U shape, so it is below or on the x axis between the roots.', show: '$y = (x-5)(x+3) \\le 0$ between the roots' },
            { say: 'So x lies between minus 3 and 5 inclusive.', show: '$-3 \\le x \\le 5$' } ] } ] },

    { n: 3, points: ['m_poly', 'm_sim'],
      q: 'The polynomial $f(x) = x^3 - 4x^2 + x + 6$.',
      parts: [
        { l: 'a', marks: 2, q: 'Use the factor theorem to show that $(x-2)$ is a factor of $f(x)$.',
          answer: '$f(2) = 0$, so $(x-2)$ is a factor',
          ms: ['M1 evaluate $f(2)$', 'A1 $f(2) = 8 - 16 + 2 + 6 = 0$ with conclusion'],
          steps: [
            { say: 'The factor theorem says x minus 2 is a factor if f of 2 is zero.', show: '$f(2) = 2^3 - 4(2^2) + 2 + 6$' },
            { say: 'Work it out: 8 minus 16 plus 2 plus 6.', show: '$= 8 - 16 + 2 + 6 = 0$' },
            { say: 'Since f of 2 is zero, x minus 2 is a factor.', show: '$\\therefore (x-2)$ is a factor' } ] },
        { l: 'b', marks: 3, q: 'Hence factorise $f(x)$ completely.',
          answer: '$(x-2)(x-3)(x+1)$',
          ms: ['M1 divide by $(x-2)$ or compare coefficients', 'A1 quotient $x^2 - 2x - 3$', 'A1 $(x-2)(x-3)(x+1)$'],
          steps: [
            { say: 'Divide f of x by x minus 2. The quotient must start with x squared and end with minus 3, since minus 2 times minus 3 is 6.', show: '$x^3 - 4x^2 + x + 6 = (x-2)(x^2 + bx - 3)$' },
            { say: 'Match the x squared terms: minus 2 plus b equals minus 4, so b is minus 2.', show: '$x^3 - 4x^2 + x + 6 = (x-2)(x^2 - 2x - 3)$' },
            { say: 'Factorise the quadratic.', show: '$x^2 - 2x - 3 = (x-3)(x+1)$' },
            { say: 'Write the full factorisation.', show: '$f(x) = (x-2)(x-3)(x+1)$' } ] },
        { l: 'c', marks: 2, q: 'Find the remainder when $f(x)$ is divided by $(x+2)$.',
          answer: '$-20$',
          ms: ['M1 evaluate $f(-2)$', 'A1 $-20$'],
          steps: [
            { say: 'By the remainder theorem, the remainder is f of minus 2.', show: '$f(-2) = (-2)^3 - 4(-2)^2 + (-2) + 6$' },
            { say: 'Evaluate carefully with the signs.', show: '$= -8 - 16 - 2 + 6$' },
            { say: 'The remainder is minus 20.', show: '$= -20$' } ] },
        { l: 'd', marks: 5, q: 'Solve the simultaneous equations $y = x + 1$ and $x^2 + y^2 = 13$.',
          answer: '$x = 2, y = 3$ or $x = -3, y = -2$',
          ms: ['M1 substitute $y = x+1$ into the quadratic', 'A1 $2x^2 + 2x - 12 = 0$ or equivalent', 'M1 solve the quadratic', 'A1 $x = 2$, $x = -3$', 'A1 $y = 3$, $y = -2$ correctly paired'],
          steps: [
            { say: 'Substitute y equals x plus 1 into the second equation.', show: '$x^2 + (x+1)^2 = 13$' },
            { say: 'Expand and collect terms.', show: '$x^2 + x^2 + 2x + 1 = 13 \\Rightarrow 2x^2 + 2x - 12 = 0$' },
            { say: 'Divide by 2 and factorise.', show: '$x^2 + x - 6 = 0 \\Rightarrow (x+3)(x-2) = 0$' },
            { say: 'So x is 2 or minus 3.', show: '$x = 2 \\ \\text{or}\\ x = -3$' },
            { say: 'Use the linear equation to find the matching y values.', show: '$x = 2,\\ y = 3;\\quad x = -3,\\ y = -2$' } ] } ] },

    { n: 4, points: ['m_line', 'm_circ'],
      parts: [
        { l: 'a', marks: 2, q: 'The point A is $(1, 3)$ and the point B is $(7, -1)$. Find the gradient of AB and the co-ordinates of the mid-point of AB.',
          answer: 'gradient $-\\frac23$; mid-point $(4, 1)$',
          ms: ['B1 gradient $-\\frac23$', 'B1 mid-point $(4, 1)$'],
          steps: [
            { say: 'Gradient is change in y over change in x.', show: '$m = \\dfrac{-1-3}{7-1} = \\dfrac{-4}{6} = -\\dfrac23$' },
            { say: 'The mid-point averages the x values and the y values.', show: '$\\left(\\dfrac{1+7}{2},\\ \\dfrac{3+(-1)}{2}\\right) = (4,\\ 1)$' },
            { say: 'Keep both results for the next part.', show: '$m_{AB} = -\\frac23,\\quad M = (4, 1)$' } ] },
        { l: 'b', marks: 3, q: 'Find the equation of the perpendicular bisector of AB, giving your answer in the form $ax + by + c = 0$.',
          answer: '$3x - 2y - 10 = 0$',
          ms: ['M1 perpendicular gradient $\\frac32$', 'M1 line through $(4, 1)$', 'A1 $3x - 2y - 10 = 0$ or any integer multiple'],
          steps: [
            { say: 'Perpendicular gradients multiply to minus 1, so flip and change the sign: three halves.', show: '$m_\\perp = \\dfrac32$' },
            { say: 'The bisector goes through the mid-point 4, 1.', show: '$y - 1 = \\dfrac32(x - 4)$' },
            { say: 'Multiply by 2 and rearrange.', show: '$2y - 2 = 3x - 12 \\Rightarrow 3x - 2y - 10 = 0$' } ] },
        { l: 'c', marks: 3, q: 'A circle has equation $x^2 + y^2 - 4x + 6y - 12 = 0$. Find the centre and the radius of the circle.',
          answer: 'centre $(2, -3)$, radius $5$',
          ms: ['M1 complete the square in $x$ and $y$', 'A1 centre $(2, -3)$', 'A1 radius $5$'],
          steps: [
            { say: 'Group the x terms and the y terms, then complete the square for each.', show: '$(x-2)^2 - 4 + (y+3)^2 - 9 - 12 = 0$' },
            { say: 'Move the numbers to the right.', show: '$(x-2)^2 + (y+3)^2 = 25$' },
            { say: 'Read off the centre and the radius, the square root of 25.', show: 'centre $(2, -3)$, radius $5$' } ] },
        { l: 'd', marks: 4, q: 'The point $P(5, 1)$ lies on the circle. Find the equation of the tangent to the circle at P.',
          answer: '$3x + 4y - 19 = 0$',
          ms: ['M1 gradient of radius $\\frac{1-(-3)}{5-2} = \\frac43$', 'M1 tangent gradient $-\\frac34$', 'M1 line through $(5, 1)$', 'A1 $3x + 4y - 19 = 0$ or equivalent'],
          steps: [
            { say: 'The tangent is perpendicular to the radius at P. First find the gradient of the radius from the centre 2, minus 3 to P.', show: '$m_{CP} = \\dfrac{1-(-3)}{5-2} = \\dfrac43$' },
            { say: 'The tangent gradient is the negative reciprocal.', show: '$m_{\\text{tangent}} = -\\dfrac34$' },
            { say: 'Use the point 5, 1.', show: '$y - 1 = -\\dfrac34(x - 5)$' },
            { say: 'Multiply by 4 and tidy up.', show: '$4y - 4 = -3x + 15 \\Rightarrow 3x + 4y - 19 = 0$' } ] } ] },

    { n: 5, points: ['m_tri'],
      q: 'In triangle ABC, $AB = 8$ cm, $AC = 5$ cm and angle $BAC = 60^\\circ$.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the length of BC.',
          answer: '$7$ cm',
          ms: ['M1 cosine rule with correct substitution', 'A1 $BC^2 = 49$', 'A1 $BC = 7$ cm'],
          steps: [
            { say: 'We know two sides and the angle between them, so use the cosine rule.', show: '$BC^2 = AB^2 + AC^2 - 2(AB)(AC)\\cos A$' },
            { say: 'Substitute. Cos 60 degrees is one half.', show: '$BC^2 = 64 + 25 - 2(8)(5)(0.5)$' },
            { say: 'That gives 49.', show: '$BC^2 = 89 - 40 = 49$' },
            { say: 'Square root: BC is 7 centimetres.', show: '$BC = 7$ cm' } ] },
        { l: 'b', marks: 2, q: 'Find the area of triangle ABC, giving your answer in the form $k\\sqrt3$.',
          answer: '$10\\sqrt3$ cm² ($\\approx 17.3$ cm²)',
          ms: ['M1 $\\frac12(8)(5)\\sin 60^\\circ$', 'A1 $10\\sqrt3$'],
          steps: [
            { say: 'Area is one half a b sine C, using the two sides either side of the known angle.', show: '$\\text{Area} = \\tfrac12(8)(5)\\sin60^\\circ$' },
            { say: 'Sine 60 degrees is root 3 over 2.', show: '$= 20\\times\\dfrac{\\sqrt3}{2}$' },
            { say: 'So the area is 10 root 3 square centimetres.', show: '$= 10\\sqrt3\\ \\text{cm}^2$' } ] },
        { l: 'c', marks: 2, q: 'Find the size of angle ABC.',
          answer: '$38.2^\\circ$',
          ms: ['M1 $\\dfrac{\\sin B}{5} = \\dfrac{\\sin 60^\\circ}{7}$', 'A1 $38.2^\\circ$'],
          steps: [
            { say: 'Use the sine rule. Angle B is opposite side AC, which is 5.', show: '$\\dfrac{\\sin B}{5} = \\dfrac{\\sin60^\\circ}{7}$' },
            { say: 'Rearrange for sine B.', show: '$\\sin B = \\dfrac{5\\sin60^\\circ}{7} = 0.6186\\ldots$' },
            { say: 'B is opposite the shortest side, so it must be acute.', show: '$B = 38.2^\\circ$' } ] } ] },

    { n: 6, points: ['m_tgraph', 'm_tid', 'm_teq'],
      parts: [
        { l: 'a', marks: 1, q: 'Write down the period of $y = \\cos 3x$.',
          answer: '$120^\\circ$',
          ms: ['B1 $120^\\circ$'],
          steps: [
            { say: 'Cos x repeats every 360 degrees.', show: '$\\cos x$: period $360^\\circ$' },
            { say: 'Multiplying x by 3 squashes the graph horizontally by a factor of 3.', show: '$y = \\cos 3x$' },
            { say: 'So the period is 360 divided by 3.', show: '$360^\\circ \\div 3 = 120^\\circ$' } ] },
        { l: 'b', marks: 3, q: 'Solve $2\\cos\\theta + 1 = 0$ for $0^\\circ \\le \\theta \\le 360^\\circ$.',
          answer: '$\\theta = 120^\\circ, 240^\\circ$',
          ms: ['M1 $\\cos\\theta = -\\frac12$', 'A1 $120^\\circ$', 'A1 $240^\\circ$'],
          steps: [
            { say: 'Rearrange to get cos theta on its own.', show: '$\\cos\\theta = -\\tfrac12$' },
            { say: 'The reference angle is 60 degrees. Cosine is negative in the second and third quadrants.', show: '$\\cos^{-1}(\\tfrac12) = 60^\\circ$' },
            { say: 'So theta is 180 minus 60 and 180 plus 60.', show: '$\\theta = 120^\\circ,\\ 240^\\circ$' } ] },
        { l: 'c', marks: 5, q: 'Solve $2\\cos^2\\theta = 1 + \\sin\\theta$ for $0^\\circ \\le \\theta \\le 360^\\circ$.',
          answer: '$\\theta = 30^\\circ, 150^\\circ, 270^\\circ$',
          ms: ['M1 use $\\cos^2\\theta = 1 - \\sin^2\\theta$', 'A1 $2\\sin^2\\theta + \\sin\\theta - 1 = 0$', 'M1 factorise: $(2\\sin\\theta - 1)(\\sin\\theta + 1) = 0$', 'A1 $30^\\circ, 150^\\circ$', 'A1 $270^\\circ$'],
          steps: [
            { say: 'There is a mixture of cos and sin, so replace cos squared using sine squared plus cos squared equals 1.', show: '$2(1 - \\sin^2\\theta) = 1 + \\sin\\theta$' },
            { say: 'Rearrange into a quadratic in sine theta.', show: '$2\\sin^2\\theta + \\sin\\theta - 1 = 0$' },
            { say: 'Factorise.', show: '$(2\\sin\\theta - 1)(\\sin\\theta + 1) = 0$' },
            { say: 'Sine theta equals one half gives 30 and 150 degrees.', show: '$\\sin\\theta = \\tfrac12 \\Rightarrow \\theta = 30^\\circ,\\ 150^\\circ$' },
            { say: 'Sine theta equals minus 1 gives 270 degrees.', show: '$\\sin\\theta = -1 \\Rightarrow \\theta = 270^\\circ$' } ] } ] },

    { n: 7, points: ['m_exp', 'm_log', 'm_growth'],
      parts: [
        { l: 'a', marks: 2, q: 'Solve $5^x = 40$, giving your answer to 3 decimal places.',
          answer: '$x = 2.292$',
          ms: ['M1 take logs: $x\\ln5 = \\ln40$', 'A1 $2.292$'],
          steps: [
            { say: 'Take natural logs of both sides so the power comes down.', show: '$\\ln 5^x = \\ln 40 \\Rightarrow x\\ln 5 = \\ln 40$' },
            { say: 'Divide.', show: '$x = \\dfrac{\\ln 40}{\\ln 5}$' },
            { say: 'Use a calculator and round to 3 decimal places.', show: '$x = 2.292$' } ] },
        { l: 'b', marks: 3, q: 'Express $2\\log_a 3 + \\log_a 4 - \\log_a 6$ as a single logarithm in its simplest form.',
          answer: '$\\log_a 6$',
          ms: ['M1 $2\\log_a 3 = \\log_a 9$', 'M1 combine using addition and subtraction laws', 'A1 $\\log_a 6$'],
          steps: [
            { say: 'Use the power law first: 2 log 3 is log of 3 squared, which is log 9.', show: '$2\\log_a 3 = \\log_a 9$' },
            { say: 'Adding logs multiplies; subtracting divides.', show: '$\\log_a 9 + \\log_a 4 - \\log_a 6 = \\log_a\\dfrac{9\\times4}{6}$' },
            { say: '36 over 6 is 6.', show: '$= \\log_a 6$' } ] },
        { l: 'c', marks: 6, q: 'The population, $P$, of a colony of birds $t$ years after it was first counted is modelled by $P = 500e^{0.04t}$.<br>(i) Write down the initial population.<br>(ii) Find the population after 10 years.<br>(iii) Find the value of $t$ when the population first reaches 1000.',
          answer: '(i) 500 &nbsp; (ii) 746 &nbsp; (iii) $t = 17.3$ years',
          ms: ['B1 (i) 500', 'M1 (ii) $500e^{0.4}$', 'A1 (ii) 746', 'M1 (iii) $e^{0.04t} = 2$', 'M1 (iii) $0.04t = \\ln 2$', 'A1 (iii) $t = 17.3$'],
          steps: [
            { say: 'At the start, t is zero and e to the zero is 1, so P is 500.', show: '$P(0) = 500e^0 = 500$' },
            { say: 'For 10 years, put t equals 10.', show: '$P(10) = 500e^{0.4} = 745.9\\ldots \\approx 746$' },
            { say: 'For the population to reach 1000, set P equal to 1000 and divide by 500.', show: '$500e^{0.04t} = 1000 \\Rightarrow e^{0.04t} = 2$' },
            { say: 'Take natural logs, since ln is the inverse of e to the x.', show: '$0.04t = \\ln 2$' },
            { say: 'Divide by 0.04.', show: '$t = \\dfrac{\\ln 2}{0.04} = 17.3$ years' } ] } ] },

    { n: 8, points: ['m_dfp', 'm_dx', 'm_stat'],
      parts: [
        { l: 'a', marks: 3, q: 'Find $\\dfrac{dy}{dx}$ when $y = 4x^3 - 6\\sqrt{x} + \\dfrac{2}{x^2}$.',
          answer: '$12x^2 - 3x^{-\\frac12} - 4x^{-3}$',
          ms: ['M1 rewrite as powers: $6x^{\\frac12}$, $2x^{-2}$', 'A1 two terms correct', 'A1 all correct'],
          steps: [
            { say: 'Write every term as a power of x before differentiating.', show: '$y = 4x^3 - 6x^{\\frac12} + 2x^{-2}$' },
            { say: 'Multiply by the power, then reduce the power by one, for each term.', show: '$\\dfrac{dy}{dx} = 12x^2 - 6\\cdot\\tfrac12x^{-\\frac12} + 2(-2)x^{-3}$' },
            { say: 'Simplify.', show: '$\\dfrac{dy}{dx} = 12x^2 - 3x^{-\\frac12} - 4x^{-3}$' } ] },
        { l: 'b', marks: 3, q: 'Find the equation of the tangent to the curve $y = x^2 - 3x + 5$ at the point where $x = 2$.',
          answer: '$y = x + 1$',
          ms: ['M1 $\\frac{dy}{dx} = 2x - 3$ evaluated at $x = 2$', 'B1 point $(2, 3)$', 'A1 $y = x + 1$'],
          steps: [
            { say: 'Find the y co-ordinate: 4 minus 6 plus 5 is 3.', show: '$y(2) = 4 - 6 + 5 = 3$' },
            { say: 'Differentiate and substitute x equals 2 to get the gradient of the tangent.', show: '$\\dfrac{dy}{dx} = 2x - 3 = 1$ at $x = 2$' },
            { say: 'Use y minus y one equals m times x minus x one.', show: '$y - 3 = 1(x - 2) \\Rightarrow y = x + 1$' } ] },
        { l: 'c', marks: 4, q: 'A curve has equation $y = x^3 - 3x^2 - 9x + 2$. Find the co-ordinates of its stationary points.',
          answer: '$(-1, 7)$ and $(3, -25)$',
          ms: ['M1 differentiate: $3x^2 - 6x - 9$', 'M1 set $= 0$ and solve', 'A1 $x = -1, 3$', 'A1 $(-1, 7)$ and $(3, -25)$'],
          steps: [
            { say: 'Stationary points are where the gradient is zero. Differentiate first.', show: '$\\dfrac{dy}{dx} = 3x^2 - 6x - 9$' },
            { say: 'Set it equal to zero and divide by 3.', show: '$x^2 - 2x - 3 = 0$' },
            { say: 'Factorise.', show: '$(x-3)(x+1) = 0 \\Rightarrow x = 3,\\ x = -1$' },
            { say: 'Substitute back into the curve equation to get the y values.', show: '$x = -1: y = -1 - 3 + 9 + 2 = 7;\\quad x = 3: y = 27 - 27 - 27 + 2 = -25$' } ] },
        { l: 'd', marks: 3, q: 'Use the second derivative to determine the nature of each stationary point.',
          answer: '$(-1, 7)$ maximum; $(3, -25)$ minimum',
          ms: ['M1 $\\frac{d^2y}{dx^2} = 6x - 6$', 'A1 at $x = -1$: $-12 \\lt 0$, maximum', 'A1 at $x = 3$: $12 \\gt 0$, minimum'],
          steps: [
            { say: 'Differentiate again.', show: '$\\dfrac{d^2y}{dx^2} = 6x - 6$' },
            { say: 'At x equals minus 1 it is minus 12, which is negative, so this is a maximum.', show: '$x = -1: -12 \\lt 0 \\Rightarrow$ maximum' },
            { say: 'At x equals 3 it is 12, which is positive, so this is a minimum.', show: '$x = 3: 12 \\gt 0 \\Rightarrow$ minimum' } ] },
        { l: 'e', marks: 1, q: 'State the set of values of $x$ for which $y$ is a decreasing function of $x$.',
          answer: '$-1 \\lt x \\lt 3$',
          ms: ['B1 $-1 \\lt x \\lt 3$'],
          steps: [
            { say: 'Decreasing means the gradient is negative.', show: '$3(x-3)(x+1) \\lt 0$' },
            { say: 'A positive U shaped quadratic is negative between its roots.', show: 'between $x = -1$ and $x = 3$' },
            { say: 'So y decreases for x between minus 1 and 3.', show: '$-1 \\lt x \\lt 3$' } ] } ] },

    { n: 9, points: ['m_int', 'm_area'],
      parts: [
        { l: 'a', marks: 3, q: 'Find $\\displaystyle\\int (6x^2 - 4x + 3)\\,dx$.',
          answer: '$2x^3 - 2x^2 + 3x + c$',
          ms: ['M1 increase a power by one and divide', 'A1 two terms correct', 'A1 all correct including $+c$'],
          steps: [
            { say: 'Integrate each term: add one to the power, then divide by the new power.', show: '$\\int 6x^2\\,dx = 2x^3,\\quad \\int -4x\\,dx = -2x^2,\\quad \\int 3\\,dx = 3x$' },
            { say: 'Remember the constant of integration.', show: '$2x^3 - 2x^2 + 3x + c$' },
            { say: 'Check by differentiating: you get back 6 x squared minus 4x plus 3.', show: '$\\dfrac{d}{dx}(2x^3 - 2x^2 + 3x) = 6x^2 - 4x + 3$' } ] },
        { l: 'b', marks: 3, q: 'A curve has gradient function $\\dfrac{dy}{dx} = 2x + 1$ and passes through the point $(1, 4)$. Find the equation of the curve.',
          answer: '$y = x^2 + x + 2$',
          ms: ['M1 integrate: $x^2 + x + c$', 'M1 substitute $(1, 4)$', 'A1 $y = x^2 + x + 2$'],
          steps: [
            { say: 'Integration reverses differentiation, so integrate the gradient function.', show: '$y = x^2 + x + c$' },
            { say: 'Use the point 1, 4 to find c.', show: '$4 = 1 + 1 + c \\Rightarrow c = 2$' },
            { say: 'Write the equation.', show: '$y = x^2 + x + 2$' } ] },
        { l: 'c', marks: 4, q: 'Find the area of the region enclosed by the curve $y = 4x - x^2$ and the $x$-axis.',
          answer: '$\\frac{32}{3}$ square units',
          ms: ['B1 limits 0 and 4', 'M1 integrate: $2x^2 - \\frac{x^3}{3}$', 'M1 substitute limits', 'A1 $\\frac{32}{3}$'],
          steps: [
            { say: 'Find where the curve crosses the x axis.', show: '$4x - x^2 = x(4 - x) = 0 \\Rightarrow x = 0,\\ 4$' },
            { say: 'Integrate between these limits.', show: '$\\displaystyle\\int_0^4 (4x - x^2)\\,dx = \\left[2x^2 - \\tfrac{x^3}{3}\\right]_0^4$' },
            { say: 'Substitute the top limit and subtract the bottom.', show: '$= \\left(32 - \\tfrac{64}{3}\\right) - 0$' },
            { say: 'That is 32 over 3.', show: '$= \\dfrac{32}{3}$ square units' } ] } ] },

    { n: 10, points: ['m_vec'],
      q: 'The vectors $\\mathbf a = 3\\mathbf i + 4\\mathbf j$ and $\\mathbf b = -\\mathbf i + 2\\mathbf j$.',
      parts: [
        { l: 'a', marks: 1, q: 'Find $|\\mathbf a|$.',
          answer: '$5$',
          ms: ['B1 $5$'],
          steps: [
            { say: 'The magnitude is found by Pythagoras on the components.', show: '$|\\mathbf a| = \\sqrt{3^2 + 4^2}$' },
            { say: 'That is the square root of 25.', show: '$= \\sqrt{25}$' },
            { say: 'So the magnitude is 5.', show: '$= 5$' } ] },
        { l: 'b', marks: 2, q: 'Find $2\\mathbf a - 3\\mathbf b$.',
          answer: '$9\\mathbf i + 2\\mathbf j$',
          ms: ['M1 $6\\mathbf i + 8\\mathbf j$ and $-3\\mathbf i + 6\\mathbf j$ seen', 'A1 $9\\mathbf i + 2\\mathbf j$'],
          steps: [
            { say: 'Multiply each vector by its scalar.', show: '$2\\mathbf a = 6\\mathbf i + 8\\mathbf j,\\quad 3\\mathbf b = -3\\mathbf i + 6\\mathbf j$' },
            { say: 'Subtract component by component.', show: '$(6 - (-3))\\mathbf i + (8 - 6)\\mathbf j$' },
            { say: 'Simplify.', show: '$9\\mathbf i + 2\\mathbf j$' } ] },
        { l: 'c', marks: 2, q: 'Find the angle that $\\mathbf a$ makes with the vector $\\mathbf i$.',
          answer: '$53.1^\\circ$',
          ms: ['M1 $\\tan^{-1}\\frac43$', 'A1 $53.1^\\circ$'],
          steps: [
            { say: 'Draw the right-angled triangle with 3 across and 4 up.', show: 'across 3, up 4' },
            { say: 'The angle with the i direction has tangent 4 over 3.', show: '$\\tan\\theta = \\dfrac43$' },
            { say: 'Use inverse tan.', show: '$\\theta = 53.1^\\circ$' } ] },
        { l: 'd', marks: 2, q: 'Points A and B have position vectors $\\mathbf a$ and $\\mathbf b$ respectively. Find the exact distance AB.',
          answer: '$2\\sqrt5$ ($\\approx 4.47$)',
          ms: ['M1 $\\overrightarrow{AB} = \\mathbf b - \\mathbf a = -4\\mathbf i - 2\\mathbf j$', 'A1 $\\sqrt{20} = 2\\sqrt5$'],
          steps: [
            { say: 'The vector from A to B is b minus a.', show: '$\\overrightarrow{AB} = \\mathbf b - \\mathbf a = -4\\mathbf i - 2\\mathbf j$' },
            { say: 'Its magnitude is the distance.', show: '$AB = \\sqrt{(-4)^2 + (-2)^2} = \\sqrt{20}$' },
            { say: 'Simplify the surd.', show: '$AB = 2\\sqrt5$' } ] } ] }
  ]
});

BCSP.add({
  id: 'm1-medium', unit: 'm1', level: 'medium',
  title: 'Maths AS 1 · Paper B (Medium)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['m_ind', 'm_quad', 'm_bin'],
      parts: [
        { l: 'a', marks: 4, q: 'Solve the equation $2^{2x+1} - 9(2^x) + 4 = 0$.',
          answer: '$x = -1$ or $x = 2$',
          ms: ['M1 write as $2(2^x)^2 - 9(2^x) + 4 = 0$', 'M1 solve quadratic in $y = 2^x$', 'A1 $y = \\frac12$ or $4$', 'A1 $x = -1$, $x = 2$'],
          steps: [
            { say: 'Use the laws of indices: 2 to the power 2x plus 1 is 2 times 2 to the x, squared.', show: '$2^{2x+1} = 2\\cdot(2^x)^2$' },
            { say: 'Let y equal 2 to the x. This turns the equation into a quadratic.', show: '$2y^2 - 9y + 4 = 0$' },
            { say: 'Factorise.', show: '$(2y - 1)(y - 4) = 0 \\Rightarrow y = \\tfrac12\\ \\text{or}\\ 4$' },
            { say: 'Change back: 2 to the x equals one half gives x equals minus 1; 2 to the x equals 4 gives x equals 2.', show: '$2^x = 2^{-1} \\Rightarrow x = -1;\\quad 2^x = 2^2 \\Rightarrow x = 2$' } ] },
        { l: 'b', marks: 4, q: 'Show that $\\dfrac{4 + \\sqrt{12}}{\\sqrt3 - 1}$ can be written as $a + b\\sqrt3$, where $a$ and $b$ are integers to be found.',
          answer: '$5 + 3\\sqrt3$',
          ms: ['B1 $\\sqrt{12} = 2\\sqrt3$', 'M1 multiply by $\\frac{\\sqrt3 + 1}{\\sqrt3 + 1}$', 'M1 expand numerator; denominator $= 2$', 'A1 $5 + 3\\sqrt3$'],
          steps: [
            { say: 'Simplify root 12 first: it is root 4 times root 3, which is 2 root 3.', show: '$\\sqrt{12} = 2\\sqrt3$' },
            { say: 'Multiply top and bottom by root 3 plus 1.', show: '$\\dfrac{(4 + 2\\sqrt3)(\\sqrt3 + 1)}{(\\sqrt3 - 1)(\\sqrt3 + 1)}$' },
            { say: 'The denominator is 3 minus 1, which is 2. Expand the top.', show: '$\\dfrac{4\\sqrt3 + 4 + 6 + 2\\sqrt3}{2} = \\dfrac{10 + 6\\sqrt3}{2}$' },
            { say: 'Divide each term by 2.', show: '$5 + 3\\sqrt3$' } ] },
        { l: 'c', marks: 3, q: 'Find the first three terms, in ascending powers of $x$, of the binomial expansion of $\\left(2 - \\dfrac{x}{4}\\right)^8$, simplifying each term.',
          answer: '$256 - 256x + 112x^2$',
          ms: ['M1 correct structure with $^8C_1$, $^8C_2$', 'A1 two terms correct', 'A1 $256 - 256x + 112x^2$'],
          steps: [
            { say: 'Use the general term n choose r, times 2 to the power 8 minus r, times minus x over 4 to the power r.', show: '$\\binom{8}{r}2^{8-r}\\left(-\\tfrac{x}{4}\\right)^r$' },
            { say: 'The first term is 2 to the 8, which is 256.', show: '$2^8 = 256$' },
            { say: 'The second term: 8 times 128 times minus x over 4.', show: '$8(128)\\left(-\\tfrac{x}{4}\\right) = -256x$' },
            { say: 'The third term: 28 times 64 times x squared over 16.', show: '$28(64)\\left(\\tfrac{x^2}{16}\\right) = 112x^2$' } ] },
        { l: 'd', marks: 3, q: 'The coefficient of $x^2$ in the expansion of $(1 + kx)\\left(2 - \\dfrac{x}{4}\\right)^8$ is $48$. Find the value of $k$.',
          answer: '$k = \\frac14$',
          ms: ['M1 $112 + k(-256)$', 'M1 $= 48$', 'A1 $k = \\frac14$'],
          steps: [
            { say: 'The x squared terms come from 1 times 112 x squared, and k x times minus 256 x.', show: '$112 + k(-256)$' },
            { say: 'Set this equal to 48.', show: '$112 - 256k = 48$' },
            { say: 'Solve: 256k equals 64, so k is one quarter.', show: '$256k = 64 \\Rightarrow k = \\tfrac14$' } ] } ] },

    { n: 2, points: ['m_quad', 'm_ineq', 'm_sim'],
      parts: [
        { l: 'a', marks: 2, q: 'The equation $x^2 + kx + k + 3 = 0$ has no real roots. Show that $k^2 - 4k - 12 \\lt 0$.',
          answer: 'Discriminant $k^2 - 4(k+3) \\lt 0$, giving $k^2 - 4k - 12 \\lt 0$',
          ms: ['M1 use $b^2 - 4ac \\lt 0$ with $a = 1, b = k, c = k+3$', 'A1 correct inequality from correct working'],
          steps: [
            { say: 'No real roots means the discriminant is negative.', show: '$b^2 - 4ac \\lt 0$' },
            { say: 'Here a is 1, b is k and c is k plus 3.', show: '$k^2 - 4(1)(k + 3) \\lt 0$' },
            { say: 'Expand the bracket.', show: '$k^2 - 4k - 12 \\lt 0$' } ] },
        { l: 'b', marks: 3, q: 'Hence find the range of values of $k$.',
          answer: '$-2 \\lt k \\lt 6$',
          ms: ['M1 factorise $(k-6)(k+2)$', 'A1 critical values $-2, 6$', 'A1 $-2 \\lt k \\lt 6$'],
          steps: [
            { say: 'Factorise the quadratic in k.', show: '$(k - 6)(k + 2) \\lt 0$' },
            { say: 'Critical values are 6 and minus 2.', show: '$k = 6,\\ k = -2$' },
            { say: 'A U shaped graph is negative between its roots.', show: '$-2 \\lt k \\lt 6$' } ] },
        { l: 'c', marks: 5, q: 'Solve the simultaneous equations<br>$x + y + z = 6$<br>$2x - y + 3z = 9$<br>$x + 2y - z = 2$',
          answer: '$x = 1,\\ y = 2,\\ z = 3$',
          ms: ['M1 eliminate one variable from two pairs', 'A1 two correct equations in two unknowns', 'M1 solve the pair', 'A1 two values correct', 'A1 third value correct'],
          steps: [
            { say: 'Eliminate y. Add the first two equations.', show: '$(x + y + z) + (2x - y + 3z) = 15 \\Rightarrow 3x + 4z = 15$' },
            { say: 'Now double the second equation and add the third.', show: '$(4x - 2y + 6z) + (x + 2y - z) = 20 \\Rightarrow 5x + 5z = 20$' },
            { say: 'The second result simplifies to x plus z equals 4, so x equals 4 minus z.', show: '$x = 4 - z$' },
            { say: 'Substitute into 3x plus 4z equals 15.', show: '$3(4 - z) + 4z = 15 \\Rightarrow z = 3,\\ x = 1$' },
            { say: 'Use the first equation to find y.', show: '$1 + y + 3 = 6 \\Rightarrow y = 2$' } ] } ] },

    { n: 3, points: ['m_poly', 'm_graph'],
      q: 'The polynomial $f(x) = 2x^3 + ax^2 + bx + 6$, where $a$ and $b$ are constants. $(x + 2)$ is a factor of $f(x)$, and when $f(x)$ is divided by $(x - 1)$ the remainder is $-6$.',
      parts: [
        { l: 'a', marks: 5, q: 'Find the values of $a$ and $b$.',
          answer: '$a = -3,\\ b = -11$',
          ms: ['M1 $f(-2) = 0$', 'A1 $4a - 2b = 10$', 'M1 $f(1) = -6$', 'A1 $a + b = -14$', 'A1 $a = -3$, $b = -11$'],
          steps: [
            { say: 'The factor theorem gives f of minus 2 equals zero.', show: '$2(-8) + 4a - 2b + 6 = 0 \\Rightarrow 4a - 2b = 10 \\Rightarrow 2a - b = 5$' },
            { say: 'The remainder theorem gives f of 1 equals minus 6.', show: '$2 + a + b + 6 = -6 \\Rightarrow a + b = -14$' },
            { say: 'Add the two equations to eliminate b.', show: '$3a = -9 \\Rightarrow a = -3$' },
            { say: 'Substitute back.', show: '$b = -14 - (-3) = -11$' } ] },
        { l: 'b', marks: 3, q: 'Factorise $f(x)$ completely.',
          answer: '$(x + 2)(2x - 1)(x - 3)$',
          ms: ['M1 divide by $(x+2)$', 'A1 $2x^2 - 7x + 3$', 'A1 $(x+2)(2x-1)(x-3)$'],
          steps: [
            { say: 'Now f of x is 2 x cubed minus 3 x squared minus 11 x plus 6. Divide by x plus 2.', show: '$2x^3 - 3x^2 - 11x + 6 = (x + 2)(2x^2 - 7x + 3)$' },
            { say: 'Factorise the quadratic quotient.', show: '$2x^2 - 7x + 3 = (2x - 1)(x - 3)$' },
            { say: 'Combine.', show: '$f(x) = (x + 2)(2x - 1)(x - 3)$' } ] },
        { l: 'c', marks: 2, q: 'The graph of $y = f(x)$ is translated to give $y = f(x - 1)$. Write down the co-ordinates of the points where $y = f(x - 1)$ meets the $x$-axis.',
          answer: '$(-1, 0),\\ (\\frac32, 0),\\ (4, 0)$',
          ms: ['M1 roots of $f$ increased by 1', 'A1 all three correct'],
          steps: [
            { say: 'The roots of f are minus 2, one half and 3.', show: '$x = -2,\\ \\tfrac12,\\ 3$' },
            { say: 'Replacing x by x minus 1 moves the graph 1 unit to the right.', show: 'translation $\\begin{pmatrix}1\\\\0\\end{pmatrix}$' },
            { say: 'Add 1 to each root.', show: '$(-1, 0),\\ (\\tfrac32, 0),\\ (4, 0)$' } ] } ] },

    { n: 4, points: ['m_circ', 'm_line'],
      q: 'A circle C has centre $(-1, 4)$ and passes through the point $A(2, 8)$.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the equation of C in the form $x^2 + y^2 + 2gx + 2fy + c = 0$.',
          answer: '$x^2 + y^2 + 2x - 8y - 8 = 0$',
          ms: ['M1 radius from distance formula', 'A1 $r = 5$', 'A1 $x^2 + y^2 + 2x - 8y - 8 = 0$'],
          steps: [
            { say: 'The radius is the distance from the centre to A.', show: '$r = \\sqrt{(2+1)^2 + (8-4)^2} = \\sqrt{25} = 5$' },
            { say: 'Write the centre-radius form.', show: '$(x + 1)^2 + (y - 4)^2 = 25$' },
            { say: 'Expand and collect.', show: '$x^2 + 2x + 1 + y^2 - 8y + 16 = 25$' },
            { say: 'Rearrange into the required form.', show: '$x^2 + y^2 + 2x - 8y - 8 = 0$' } ] },
        { l: 'b', marks: 1, q: 'AB is a diameter of C. Find the co-ordinates of B.',
          answer: '$B(-4, 0)$',
          ms: ['B1 $(-4, 0)$'],
          steps: [
            { say: 'The centre is the mid-point of the diameter AB.', show: '$\\left(\\frac{2 + x}{2}, \\frac{8 + y}{2}\\right) = (-1, 4)$' },
            { say: 'Solve each co-ordinate.', show: '$x = -4,\\ y = 0$' },
            { say: 'So B is minus 4, 0.', show: '$B(-4, 0)$' } ] },
        { l: 'c', marks: 3, q: 'The point $D(3, 1)$ lies on C. Show that angle $ADB$ is a right angle.',
          answer: 'Gradients $-7$ and $\\frac17$ multiply to $-1$',
          ms: ['M1 gradient $AD = -7$', 'M1 gradient $BD = \\frac17$', 'A1 product $= -1$ so $AD \\perp BD$'],
          steps: [
            { say: 'Find the gradient of AD.', show: '$m_{AD} = \\dfrac{8 - 1}{2 - 3} = -7$' },
            { say: 'Find the gradient of BD.', show: '$m_{BD} = \\dfrac{0 - 1}{-4 - 3} = \\dfrac17$' },
            { say: 'Multiply: minus 7 times one seventh is minus 1, so the lines are perpendicular.', show: '$-7 \\times \\tfrac17 = -1 \\Rightarrow \\angle ADB = 90^\\circ$' },
            { say: 'This agrees with the circle property: the angle in a semicircle is a right angle.', show: 'angle in a semicircle' } ] },
        { l: 'd', marks: 3, q: 'Find the equation of the tangent to C at A.',
          answer: '$3x + 4y - 38 = 0$',
          ms: ['M1 radius gradient $\\frac43$', 'M1 tangent gradient $-\\frac34$ through $(2, 8)$', 'A1 $3x + 4y - 38 = 0$ or equivalent'],
          steps: [
            { say: 'Gradient of the radius from the centre to A.', show: '$m = \\dfrac{8 - 4}{2 + 1} = \\dfrac43$' },
            { say: 'The tangent is perpendicular to the radius.', show: '$m_{\\text{tangent}} = -\\dfrac34$' },
            { say: 'Use the point 2, 8 and tidy up.', show: '$y - 8 = -\\tfrac34(x - 2) \\Rightarrow 3x + 4y - 38 = 0$' } ] } ] },

    { n: 5, points: ['m_tri'],
      q: 'Ship A is 12 km from a harbour H on a bearing of $040^\\circ$. Ship B is 18 km from H on a bearing of $115^\\circ$.',
      parts: [
        { l: 'a', marks: 3, q: 'Find the distance AB.',
          answer: '$18.9$ km',
          ms: ['B1 angle $AHB = 75^\\circ$', 'M1 cosine rule', 'A1 $18.9$ km'],
          steps: [
            { say: 'The angle at the harbour between the two bearings is 115 minus 40, which is 75 degrees.', show: '$\\angle AHB = 115^\\circ - 40^\\circ = 75^\\circ$' },
            { say: 'Use the cosine rule.', show: '$AB^2 = 12^2 + 18^2 - 2(12)(18)\\cos75^\\circ$' },
            { say: 'Evaluate.', show: '$AB^2 = 468 - 111.81\\ldots = 356.19\\ldots$' },
            { say: 'Square root.', show: '$AB = 18.9$ km' } ] },
        { l: 'b', marks: 4, q: 'Find the bearing of B from A.',
          answer: '$153^\\circ$',
          ms: ['M1 sine or cosine rule for angle $HAB$', 'A1 $\\angle HAB = 67.1^\\circ$', 'M1 bearing of H from A is $220^\\circ$', 'A1 $153^\\circ$'],
          steps: [
            { say: 'Find angle HAB with the cosine rule, which avoids any doubt about obtuse angles.', show: '$\\cos HAB = \\dfrac{12^2 + 18.87^2 - 18^2}{2(12)(18.87)} = 0.389$' },
            { say: 'So angle HAB is about 67.1 degrees.', show: '$\\angle HAB = 67.1^\\circ$' },
            { say: 'The bearing of H from A is the back bearing: 40 plus 180.', show: 'bearing of H from A $= 220^\\circ$' },
            { say: 'B is anticlockwise from the direction of H, as seen from A, so subtract.', show: '$220^\\circ - 67.1^\\circ = 152.9^\\circ$' },
            { say: 'To the nearest degree the bearing is 153.', show: '$153^\\circ$' } ] } ] },

    { n: 6, points: ['m_tid', 'm_teq', 'm_tgraph'],
      parts: [
        { l: 'a', marks: 5, q: 'Solve $2\\cos^2 x + 3\\sin x = 3$ for $0^\\circ \\le x \\le 360^\\circ$.',
          answer: '$x = 30^\\circ, 90^\\circ, 150^\\circ$',
          ms: ['M1 use $\\cos^2 x = 1 - \\sin^2 x$', 'A1 $2\\sin^2 x - 3\\sin x + 1 = 0$', 'M1 factorise', 'A1 $30^\\circ, 150^\\circ$', 'A1 $90^\\circ$'],
          steps: [
            { say: 'Replace cos squared with 1 minus sine squared.', show: '$2(1 - \\sin^2x) + 3\\sin x = 3$' },
            { say: 'Rearrange into a quadratic in sine x.', show: '$2\\sin^2x - 3\\sin x + 1 = 0$' },
            { say: 'Factorise.', show: '$(2\\sin x - 1)(\\sin x - 1) = 0$' },
            { say: 'Sine x equals one half gives 30 and 150 degrees.', show: '$\\sin x = \\tfrac12 \\Rightarrow x = 30^\\circ,\\ 150^\\circ$' },
            { say: 'Sine x equals 1 gives 90 degrees.', show: '$\\sin x = 1 \\Rightarrow x = 90^\\circ$' } ] },
        { l: 'b', marks: 4, q: 'Solve $\\tan(2\\theta - 30^\\circ) = \\sqrt3$ for $0^\\circ \\le \\theta \\le 180^\\circ$.',
          answer: '$\\theta = 45^\\circ, 135^\\circ$',
          ms: ['B1 range $-30^\\circ \\le 2\\theta - 30^\\circ \\le 330^\\circ$', 'M1 $2\\theta - 30^\\circ = 60^\\circ$', 'M1 use period $180^\\circ$: $240^\\circ$', 'A1 $45^\\circ, 135^\\circ$'],
          steps: [
            { say: 'Change the interval to match the angle 2 theta minus 30.', show: '$-30^\\circ \\le 2\\theta - 30^\\circ \\le 330^\\circ$' },
            { say: 'Tan 60 degrees is root 3.', show: '$2\\theta - 30^\\circ = 60^\\circ$' },
            { say: 'Tan repeats every 180 degrees, so 240 degrees also works. 420 is too big.', show: '$2\\theta - 30^\\circ = 60^\\circ,\\ 240^\\circ$' },
            { say: 'Add 30 and halve.', show: '$\\theta = 45^\\circ,\\ 135^\\circ$' } ] } ] },

    { n: 7, points: ['m_log', 'm_exp', 'm_growth'],
      parts: [
        { l: 'a', marks: 4, q: 'Solve $\\log_2(x + 4) - \\log_2(x - 1) = 3$.',
          answer: '$x = \\frac{12}{7}$',
          ms: ['M1 combine: $\\log_2\\frac{x+4}{x-1}$', 'M1 $\\frac{x+4}{x-1} = 2^3$', 'M1 solve linear equation', 'A1 $x = \\frac{12}{7}$'],
          steps: [
            { say: 'Subtracting logs gives the log of a quotient.', show: '$\\log_2\\dfrac{x + 4}{x - 1} = 3$' },
            { say: 'Undo the log: the inside equals 2 cubed, which is 8.', show: '$\\dfrac{x + 4}{x - 1} = 8$' },
            { say: 'Multiply out.', show: '$x + 4 = 8x - 8 \\Rightarrow 7x = 12$' },
            { say: 'So x is 12 over 7. This is greater than 1, so both logs are defined.', show: '$x = \\dfrac{12}{7}$' } ] },
        { l: 'b', marks: 3, q: 'Solve the inequality $3^{2x - 1} \\lt 50$, giving your answer to 3 significant figures.',
          answer: '$x \\lt 2.28$',
          ms: ['M1 take logs', 'M1 $2x - 1 \\lt \\frac{\\ln 50}{\\ln 3}$', 'A1 $x \\lt 2.28$'],
          steps: [
            { say: 'Take natural logs. Ln is increasing, so the inequality sign stays the same.', show: '$(2x - 1)\\ln3 \\lt \\ln50$' },
            { say: 'Ln 3 is positive, so divide by it.', show: '$2x - 1 \\lt \\dfrac{\\ln50}{\\ln3} = 3.5608\\ldots$' },
            { say: 'Add 1 and halve.', show: '$x \\lt 2.28$' } ] },
        { l: 'c', marks: 3, q: 'The concentration, $C$ mg per litre, of a drug in a patient\u2019s blood $t$ hours after an injection is modelled by $C = 12e^{-0.15t}$. Find the time taken for the concentration to fall to 3 mg per litre.',
          answer: '$9.24$ hours',
          ms: ['M1 $e^{-0.15t} = \\frac14$', 'M1 $-0.15t = \\ln\\frac14$', 'A1 $9.24$ hours'],
          steps: [
            { say: 'Set C equal to 3 and divide by 12.', show: '$12e^{-0.15t} = 3 \\Rightarrow e^{-0.15t} = \\tfrac14$' },
            { say: 'Take natural logs.', show: '$-0.15t = \\ln\\tfrac14 = -\\ln 4$' },
            { say: 'Divide by minus 0.15.', show: '$t = \\dfrac{\\ln4}{0.15} = 9.24$ hours' } ] } ] },

    { n: 8, points: ['m_dfp', 'm_dx', 'm_stat'],
      parts: [
        { l: 'a', marks: 4, q: 'Given that $y = \\dfrac{x^2 - 4}{\\sqrt{x}}$, find the gradient of the curve at the point where $x = 4$.',
          answer: '$\\frac{13}{4}$',
          ms: ['M1 write as $x^{\\frac32} - 4x^{-\\frac12}$', 'M1 differentiate', 'A1 $\\frac32x^{\\frac12} + 2x^{-\\frac32}$', 'A1 $\\frac{13}{4}$'],
          steps: [
            { say: 'Split the fraction and write each term as a power of x.', show: '$y = \\dfrac{x^2}{x^{\\frac12}} - \\dfrac{4}{x^{\\frac12}} = x^{\\frac32} - 4x^{-\\frac12}$' },
            { say: 'Differentiate each term.', show: '$\\dfrac{dy}{dx} = \\tfrac32x^{\\frac12} + 2x^{-\\frac32}$' },
            { say: 'Put x equal to 4. Root 4 is 2, and 4 to the three halves is 8.', show: '$\\tfrac32(2) + \\dfrac{2}{8} = 3 + \\tfrac14$' },
            { say: 'So the gradient is 13 over 4.', show: '$\\dfrac{13}{4}$' } ] },
        { l: 'b', marks: 2, q: 'An open box is made from a rectangular sheet of card 24 cm by 15 cm by cutting a square of side $x$ cm from each corner and folding up the sides. Show that the volume of the box is $V = 4x^3 - 78x^2 + 360x$.',
          answer: '$V = x(24 - 2x)(15 - 2x) = 4x^3 - 78x^2 + 360x$',
          ms: ['M1 $V = x(24 - 2x)(15 - 2x)$', 'A1 correct expansion'],
          steps: [
            { say: 'After cutting, the base measures 24 minus 2x by 15 minus 2x, and the height is x.', show: '$V = x(24 - 2x)(15 - 2x)$' },
            { say: 'Expand the two brackets.', show: '$(24 - 2x)(15 - 2x) = 360 - 78x + 4x^2$' },
            { say: 'Multiply by x.', show: '$V = 4x^3 - 78x^2 + 360x$' } ] },
        { l: 'c', marks: 6, q: 'Find the value of $x$ that gives the maximum volume, and use calculus to show that this volume is a maximum.',
          answer: '$x = 3$; $\\frac{d^2V}{dx^2} = -84 \\lt 0$, so maximum',
          ms: ['M1 $\\frac{dV}{dx} = 12x^2 - 156x + 360$', 'M1 set $= 0$', 'A1 $x = 3$ or $x = 10$', 'A1 reject $x = 10$ since $15 - 2x \\gt 0$', 'M1 $\\frac{d^2V}{dx^2} = 24x - 156$', 'A1 $-84 \\lt 0$ so maximum'],
          steps: [
            { say: 'Differentiate the volume.', show: '$\\dfrac{dV}{dx} = 12x^2 - 156x + 360$' },
            { say: 'Set it to zero and divide by 12.', show: '$x^2 - 13x + 30 = 0 \\Rightarrow (x - 3)(x - 10) = 0$' },
            { say: 'x equals 10 is impossible, because the short side 15 minus 2x would be negative. So x is 3.', show: '$0 \\lt x \\lt 7.5 \\Rightarrow x = 3$' },
            { say: 'Find the second derivative.', show: '$\\dfrac{d^2V}{dx^2} = 24x - 156$' },
            { say: 'At x equals 3 it is minus 84, which is negative, so this is a maximum.', show: '$24(3) - 156 = -84 \\lt 0 \\Rightarrow$ maximum' } ] },
        { l: 'd', marks: 2, q: 'Find the maximum volume.',
          answer: '$486$ cm³',
          ms: ['M1 substitute $x = 3$', 'A1 $486$ cm³'],
          steps: [
            { say: 'Substitute x equals 3 into the factorised form.', show: '$V = 3(24 - 6)(15 - 6)$' },
            { say: 'Multiply.', show: '$= 3 \\times 18 \\times 9$' },
            { say: 'The maximum volume is 486 cubic centimetres.', show: '$= 486\\ \\text{cm}^3$' } ] } ] },

    { n: 9, points: ['m_int', 'm_area'],
      parts: [
        { l: 'a', marks: 4, q: 'A curve has gradient function $f\'(x) = 6x^2 - \\dfrac{2}{x^2}$ and passes through the point $(1, 5)$. Find $f(x)$.',
          answer: '$f(x) = 2x^3 + \\dfrac{2}{x} + 1$',
          ms: ['M1 write $-2x^{-2}$ and integrate', 'A1 $2x^3 + 2x^{-1} + c$', 'M1 substitute $(1, 5)$', 'A1 $c = 1$'],
          steps: [
            { say: 'Write the second term as a power of x.', show: '$f\'(x) = 6x^2 - 2x^{-2}$' },
            { say: 'Integrate. Minus 2 x to the minus 2 integrates to plus 2 x to the minus 1.', show: '$f(x) = 2x^3 + 2x^{-1} + c$' },
            { say: 'Use the point 1, 5.', show: '$5 = 2 + 2 + c \\Rightarrow c = 1$' },
            { say: 'Write the answer.', show: '$f(x) = 2x^3 + \\dfrac{2}{x} + 1$' } ] },
        { l: 'b', marks: 6, q: 'Find the area of the region enclosed by the curve $y = x^2 - 2x - 3$ and the $x$-axis.',
          answer: '$\\frac{32}{3}$ square units',
          ms: ['B1 roots $x = -1, 3$', 'M1 integrate: $\\frac{x^3}{3} - x^2 - 3x$', 'M1 substitute limits', 'A1 $9$ and $-\\frac53$ (or equivalent)', 'A1 integral $= -\\frac{32}{3}$', 'A1 area $\\frac{32}{3}$'],
          steps: [
            { say: 'Find where the curve crosses the x axis.', show: '$x^2 - 2x - 3 = (x - 3)(x + 1) = 0 \\Rightarrow x = -1,\\ 3$' },
            { say: 'The region is below the axis, so expect a negative integral.', show: 'U shape, below the axis for $-1 \\lt x \\lt 3$' },
            { say: 'Integrate.', show: '$\\left[\\tfrac{x^3}{3} - x^2 - 3x\\right]_{-1}^{3}$' },
            { say: 'Substitute the limits.', show: '$(9 - 9 - 9) - \\left(-\\tfrac13 - 1 + 3\\right) = -9 - \\tfrac53 = -\\tfrac{32}{3}$' },
            { say: 'Area is positive, so take the size of the answer.', show: 'Area $= \\dfrac{32}{3}$ square units' } ] } ] },

    { n: 10, points: ['m_vec'],
      q: 'Relative to an origin O, the points A and B have position vectors $\\overrightarrow{OA} = 2\\mathbf i + 5\\mathbf j$ and $\\overrightarrow{OB} = 8\\mathbf i - 3\\mathbf j$.',
      parts: [
        { l: 'a', marks: 2, q: 'Find $\\overrightarrow{AB}$ and the distance AB.',
          answer: '$6\\mathbf i - 8\\mathbf j$; $10$',
          ms: ['B1 $6\\mathbf i - 8\\mathbf j$', 'B1 $10$'],
          steps: [
            { say: 'The vector AB is OB minus OA.', show: '$\\overrightarrow{AB} = (8 - 2)\\mathbf i + (-3 - 5)\\mathbf j = 6\\mathbf i - 8\\mathbf j$' },
            { say: 'Use Pythagoras for its length.', show: '$|\\overrightarrow{AB}| = \\sqrt{36 + 64}$' },
            { say: 'The distance is 10.', show: '$= 10$' } ] },
        { l: 'b', marks: 2, q: 'M is the mid-point of AB. Find the position vector of M.',
          answer: '$5\\mathbf i + \\mathbf j$',
          ms: ['M1 $\\overrightarrow{OA} + \\frac12\\overrightarrow{AB}$', 'A1 $5\\mathbf i + \\mathbf j$'],
          steps: [
            { say: 'Start at O, go to A, then half way along AB.', show: '$\\overrightarrow{OM} = \\overrightarrow{OA} + \\tfrac12\\overrightarrow{AB}$' },
            { say: 'Substitute.', show: '$= (2\\mathbf i + 5\\mathbf j) + (3\\mathbf i - 4\\mathbf j)$' },
            { say: 'Simplify.', show: '$= 5\\mathbf i + \\mathbf j$' } ] },
        { l: 'c', marks: 2, q: 'Find the angle between $\\overrightarrow{AB}$ and the vector $\\mathbf i$.',
          answer: '$53.1^\\circ$ (below $\\mathbf i$)',
          ms: ['M1 $\\tan^{-1}\\frac86$', 'A1 $53.1^\\circ$'],
          steps: [
            { say: 'The vector goes 6 across and 8 down.', show: '$6\\mathbf i - 8\\mathbf j$' },
            { say: 'The angle with i has tangent 8 over 6.', show: '$\\tan\\theta = \\dfrac86$' },
            { say: 'So the angle is 53.1 degrees, measured below the i direction.', show: '$\\theta = 53.1^\\circ$ below $\\mathbf i$' } ] } ] }
  ]
});

BCSP.add({
  id: 'm1-hard', unit: 'm1', level: 'hard',
  title: 'Maths AS 1 · Paper C (Hard)', minutes: 105, calc: true,
  questions: [
    { n: 1, points: ['m_ind', 'm_quad', 'm_bin'],
      parts: [
        { l: 'a', marks: 4, q: 'Solve $x^{\\frac23} - 5x^{\\frac13} + 4 = 0$.',
          answer: '$x = 1$ or $x = 64$',
          ms: ['M1 let $u = x^{\\frac13}$: $u^2 - 5u + 4 = 0$', 'A1 $u = 1, 4$', 'M1 cube to find $x$', 'A1 $x = 1, 64$'],
          steps: [
            { say: 'Notice that x to the two thirds is the square of x to the one third. Let u be x to the one third.', show: '$u = x^{\\frac13} \\Rightarrow u^2 - 5u + 4 = 0$' },
            { say: 'Factorise.', show: '$(u - 1)(u - 4) = 0 \\Rightarrow u = 1,\\ 4$' },
            { say: 'Cube each value to undo the cube root.', show: '$x = 1^3 = 1,\\quad x = 4^3 = 64$' } ] },
        { l: 'b', marks: 4, q: 'Show that $\\dfrac{\\sqrt5 + \\sqrt3}{\\sqrt5 - \\sqrt3} - \\dfrac{\\sqrt5 - \\sqrt3}{\\sqrt5 + \\sqrt3} = k\\sqrt{15}$, stating the value of the integer $k$.',
          answer: '$k = 2$',
          ms: ['M1 common denominator $(\\sqrt5 - \\sqrt3)(\\sqrt5 + \\sqrt3) = 2$', 'M1 expand $(\\sqrt5 \\pm \\sqrt3)^2 = 8 \\pm 2\\sqrt{15}$', 'A1 numerator $4\\sqrt{15}$', 'A1 $2\\sqrt{15}$, $k = 2$'],
          steps: [
            { say: 'Combine the fractions over the common denominator, which is 5 minus 3, equal to 2.', show: '$\\dfrac{(\\sqrt5 + \\sqrt3)^2 - (\\sqrt5 - \\sqrt3)^2}{(\\sqrt5 - \\sqrt3)(\\sqrt5 + \\sqrt3)}$' },
            { say: 'Expand each square.', show: '$(\\sqrt5 + \\sqrt3)^2 = 8 + 2\\sqrt{15},\\quad (\\sqrt5 - \\sqrt3)^2 = 8 - 2\\sqrt{15}$' },
            { say: 'Subtract: the 8s cancel.', show: '$\\dfrac{4\\sqrt{15}}{2}$' },
            { say: 'This gives 2 root 15, so k is 2.', show: '$2\\sqrt{15},\\quad k = 2$' } ] },
        { l: 'c', marks: 4, q: 'In the binomial expansion of $(1 + ax)^n$, where $n$ is a positive integer, the coefficient of $x$ is 20 and the coefficient of $x^2$ is 150. Find the values of $n$ and $a$.',
          answer: '$n = 4,\\ a = 5$',
          ms: ['B1 $na = 20$', 'B1 $\\frac{n(n-1)}{2}a^2 = 150$', 'M1 eliminate $a$', 'A1 $n = 4$, $a = 5$'],
          steps: [
            { say: 'Write down the first coefficients of the expansion.', show: '$(1 + ax)^n = 1 + nax + \\dfrac{n(n-1)}{2}a^2x^2 + \\ldots$' },
            { say: 'Form two equations.', show: '$na = 20,\\qquad \\dfrac{n(n-1)}{2}a^2 = 150$' },
            { say: 'Write the second as n minus 1 over 2n, times n a squared.', show: '$\\dfrac{n-1}{2n}(na)^2 = 150 \\Rightarrow \\dfrac{n-1}{2n}(400) = 150$' },
            { say: 'Solve for n.', show: '$400n - 400 = 300n \\Rightarrow n = 4$' },
            { say: 'Then a is 20 divided by 4.', show: '$a = 5$' } ] } ] },

    { n: 2, points: ['m_quad', 'm_ineq', 'm_graph'],
      q: 'The line $y = kx - 2$ and the curve $y = x^2 + 2x + 2$ are drawn on the same axes.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the values of $k$ for which the line is a tangent to the curve.',
          answer: '$k = -2$ or $k = 6$',
          ms: ['M1 equate: $x^2 + (2 - k)x + 4 = 0$', 'M1 discriminant $= 0$', 'A1 $(2 - k)^2 = 16$', 'A1 $k = -2, 6$'],
          steps: [
            { say: 'At an intersection the y values are equal.', show: '$x^2 + 2x + 2 = kx - 2$' },
            { say: 'Rearrange into a quadratic equal to zero.', show: '$x^2 + (2 - k)x + 4 = 0$' },
            { say: 'A tangent meets the curve once, so the discriminant is zero.', show: '$(2 - k)^2 - 16 = 0$' },
            { say: 'So 2 minus k is 4 or minus 4.', show: '$2 - k = \\pm4 \\Rightarrow k = -2,\\ 6$' } ] },
        { l: 'b', marks: 2, q: 'Find the set of values of $k$ for which the line meets the curve at two distinct points.',
          answer: '$k \\lt -2$ or $k \\gt 6$',
          ms: ['M1 $(2 - k)^2 \\gt 16$', 'A1 $k \\lt -2$ or $k \\gt 6$'],
          steps: [
            { say: 'Two distinct points need a positive discriminant.', show: '$(2 - k)^2 \\gt 16$' },
            { say: 'This is a quadratic inequality in k with critical values minus 2 and 6.', show: '$(k + 2)(k - 6) \\gt 0$' },
            { say: 'Positive outside the roots.', show: '$k \\lt -2\\ \\text{or}\\ k \\gt 6$' } ] },
        { l: 'c', marks: 2, q: 'For the positive value of $k$ found in (a), find the co-ordinates of the point of contact.',
          answer: '$(2, 10)$',
          ms: ['M1 solve $x^2 - 4x + 4 = 0$', 'A1 $(2, 10)$'],
          steps: [
            { say: 'With k equal to 6 the quadratic is x squared minus 4x plus 4.', show: '$x^2 - 4x + 4 = (x - 2)^2 = 0$' },
            { say: 'The repeated root is x equals 2.', show: '$x = 2$' },
            { say: 'Find y from the line: 6 times 2 minus 2.', show: '$y = 10 \\Rightarrow (2, 10)$' } ] } ] },

    { n: 3, points: ['m_sim', 'm_poly'],
      parts: [
        { l: 'a', marks: 5, q: 'A theatre sells adult, child and senior tickets at £$a$, £$c$ and £$s$ respectively. On three evenings the sales were:<br>Monday: 20 adult, 30 child, 10 senior, total £540<br>Tuesday: 15 adult, 40 child, 20 senior, total £640<br>Wednesday: 25 adult, 10 child, 30 senior, total £640<br>Find the price of each type of ticket.',
          answer: 'adult £12, child £7, senior £9',
          ms: ['M1 three correct equations', 'M1 eliminate one variable', 'A1 correct pair of equations in two unknowns', 'M1 solve', 'A1 $a = 12$, $c = 7$, $s = 9$'],
          steps: [
            { say: 'Write one equation per evening, dividing by 10 or 5 where possible.', show: '$2a + 3c + s = 54,\\quad 3a + 8c + 4s = 128,\\quad 5a + 2c + 6s = 128$' },
            { say: 'Eliminate s. From the first, s equals 54 minus 2a minus 3c.', show: '$s = 54 - 2a - 3c$' },
            { say: 'Substitute into the other two.', show: '$3a + 8c + 216 - 8a - 12c = 128 \\Rightarrow 5a + 4c = 88$<br>$5a + 2c + 324 - 12a - 18c = 128 \\Rightarrow 7a + 16c = 196$' },
            { say: 'Multiply the first new equation by 4 and subtract.', show: '$20a + 16c = 352 \\Rightarrow 13a = 156 \\Rightarrow a = 12$' },
            { say: 'Back substitute.', show: '$c = \\dfrac{88 - 60}{4} = 7,\\quad s = 54 - 24 - 21 = 9$' } ] },
        { l: 'b', marks: 4, q: 'The polynomial $f(x) = x^3 + ax^2 + bx + 10$. Given that $(x + 2)$ is a factor of $f(x)$ and that the remainder when $f(x)$ is divided by $(x - 1)$ is 12, find $a$ and $b$.',
          answer: '$a = 0,\\ b = 1$',
          ms: ['M1 $f(-2) = 0$: $4a - 2b = -2$', 'M1 $f(1) = 12$: $a + b = 1$', 'M1 solve simultaneously', 'A1 $a = 0$, $b = 1$'],
          steps: [
            { say: 'Factor theorem: f of minus 2 is zero.', show: '$-8 + 4a - 2b + 10 = 0 \\Rightarrow 2a - b = -1$' },
            { say: 'Remainder theorem: f of 1 is 12.', show: '$1 + a + b + 10 = 12 \\Rightarrow a + b = 1$' },
            { say: 'Add to eliminate b.', show: '$3a = 0 \\Rightarrow a = 0$' },
            { say: 'Then b is 1.', show: '$b = 1$' } ] },
        { l: 'c', marks: 3, q: 'Hence show that the equation $f(x) = 0$ has exactly one real root.',
          answer: '$f(x) = (x + 2)(x^2 - 2x + 5)$; the quadratic has discriminant $-16 \\lt 0$',
          ms: ['M1 divide by $(x + 2)$', 'A1 $x^2 - 2x + 5$', 'A1 discriminant $4 - 20 = -16 \\lt 0$, so only root $x = -2$'],
          steps: [
            { say: 'With a equal to zero and b equal to 1, f of x is x cubed plus x plus 10. Divide by x plus 2.', show: '$x^3 + x + 10 = (x + 2)(x^2 - 2x + 5)$' },
            { say: 'Any other roots would come from the quadratic factor. Check its discriminant.', show: '$b^2 - 4ac = 4 - 20 = -16$' },
            { say: 'It is negative, so the quadratic has no real roots, and minus 2 is the only real root.', show: '$-16 \\lt 0 \\Rightarrow$ only real root $x = -2$' } ] } ] },

    { n: 4, points: ['m_circ', 'm_line', 'm_quad'],
      q: 'A circle passes through the points $A(1, 1)$, $B(7, 1)$ and $C(5, 5)$.',
      parts: [
        { l: 'a', marks: 6, q: 'Find the equation of the circle.',
          answer: '$(x - 4)^2 + (y - 2)^2 = 10$',
          ms: ['M1 perpendicular bisector of AB: $x = 4$', 'M1 centre $(4, k)$ equidistant from A and C', 'M1 form an equation in $k$', 'A1 $k = 2$', 'A1 $r^2 = 10$', 'A1 $(x - 4)^2 + (y - 2)^2 = 10$'],
          steps: [
            { say: 'The perpendicular from the centre bisects any chord. AB is horizontal from x equals 1 to 7, so the centre lies on x equals 4.', show: 'centre $(4, k)$' },
            { say: 'The centre is the same distance from A and from C.', show: '$(4 - 1)^2 + (k - 1)^2 = (4 - 5)^2 + (k - 5)^2$' },
            { say: 'Expand: the k squared terms cancel.', show: '$9 + k^2 - 2k + 1 = 1 + k^2 - 10k + 25$' },
            { say: 'Solve.', show: '$8k = 16 \\Rightarrow k = 2$' },
            { say: 'Radius squared is the distance from 4, 2 to A, squared.', show: '$r^2 = 3^2 + 1^2 = 10$' },
            { say: 'Write the equation.', show: '$(x - 4)^2 + (y - 2)^2 = 10$' } ] },
        { l: 'b', marks: 5, q: 'The line $y = x + c$ is a tangent to the circle. Find the possible values of $c$, giving your answers in surd form.',
          answer: '$c = -2 \\pm 2\\sqrt5$',
          ms: ['M1 substitute $y = x + c$', 'A1 $2x^2 + (2c - 12)x + c^2 - 4c + 10 = 0$', 'M1 discriminant $= 0$', 'A1 $c^2 + 4c - 16 = 0$', 'A1 $c = -2 \\pm 2\\sqrt5$'],
          steps: [
            { say: 'Substitute the line into the circle.', show: '$(x - 4)^2 + (x + c - 2)^2 = 10$' },
            { say: 'Expand and collect into a quadratic in x.', show: '$2x^2 + (2c - 12)x + (c^2 - 4c + 10) = 0$' },
            { say: 'A tangent touches once, so the discriminant is zero.', show: '$(2c - 12)^2 - 8(c^2 - 4c + 10) = 0$' },
            { say: 'Expand and simplify. Divide through by minus 4.', show: '$-4c^2 - 16c + 64 = 0 \\Rightarrow c^2 + 4c - 16 = 0$' },
            { say: 'Use the quadratic formula.', show: '$c = \\dfrac{-4 \\pm \\sqrt{16 + 64}}{2} = -2 \\pm 2\\sqrt5$' } ] } ] },

    { n: 5, points: ['m_tri'],
      q: 'In triangle ABC, $AB = 10$ cm, $AC = 7$ cm and angle $ABC = 40^\\circ$.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the two possible sizes of angle ACB.',
          answer: '$66.7^\\circ$ or $113.3^\\circ$',
          ms: ['M1 sine rule: $\\frac{\\sin C}{10} = \\frac{\\sin 40^\\circ}{7}$', 'A1 $\\sin C = 0.918\\ldots$', 'A1 $66.7^\\circ$', 'A1 $113.3^\\circ$'],
          steps: [
            { say: 'Angle C is opposite side AB, which is 10. Use the sine rule.', show: '$\\dfrac{\\sin C}{10} = \\dfrac{\\sin40^\\circ}{7}$' },
            { say: 'Rearrange.', show: '$\\sin C = \\dfrac{10\\sin40^\\circ}{7} = 0.9183$' },
            { say: 'The calculator gives the acute angle.', show: '$C = 66.7^\\circ$' },
            { say: 'Sine is also positive in the second quadrant, and 180 minus 66.7 plus 40 is still less than 180, so both are possible.', show: '$C = 180^\\circ - 66.7^\\circ = 113.3^\\circ$' } ] },
        { l: 'b', marks: 4, q: 'Find the difference between the two possible areas of triangle ABC.',
          answer: '$17.8$ cm²',
          ms: ['M1 angle A $= 73.3^\\circ$ or $26.7^\\circ$', 'M1 area $= \\frac12(10)(7)\\sin A$', 'A1 $33.5$ and $15.7$', 'A1 difference $17.8$ cm²'],
          steps: [
            { say: 'Find angle A in each case using the angle sum.', show: '$A = 180^\\circ - 40^\\circ - 66.7^\\circ = 73.3^\\circ\\quad\\text{or}\\quad 26.7^\\circ$' },
            { say: 'Angle A lies between the known sides 10 and 7, so area is one half times 10 times 7 times sine A.', show: '$\\text{Area} = 35\\sin A$' },
            { say: 'Evaluate both.', show: '$35\\sin73.3^\\circ = 33.53,\\quad 35\\sin26.7^\\circ = 15.71$' },
            { say: 'Subtract.', show: '$33.53 - 15.71 = 17.8$ cm²' } ] } ] },

    { n: 6, points: ['m_tid', 'm_teq', 'm_tgraph'],
      parts: [
        { l: 'a', marks: 3, q: 'Show that the equation $3\\tan\\theta\\sin\\theta = 8$ can be written as $3\\cos^2\\theta + 8\\cos\\theta - 3 = 0$.',
          answer: 'Uses $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ and $\\sin^2\\theta = 1 - \\cos^2\\theta$',
          ms: ['M1 $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$', 'M1 $\\sin^2\\theta = 1 - \\cos^2\\theta$', 'A1 correct rearrangement'],
          steps: [
            { say: 'Replace tan theta with sine over cos.', show: '$\\dfrac{3\\sin^2\\theta}{\\cos\\theta} = 8$' },
            { say: 'Multiply by cos theta.', show: '$3\\sin^2\\theta = 8\\cos\\theta$' },
            { say: 'Replace sine squared with 1 minus cos squared.', show: '$3 - 3\\cos^2\\theta = 8\\cos\\theta$' },
            { say: 'Rearrange.', show: '$3\\cos^2\\theta + 8\\cos\\theta - 3 = 0$' } ] },
        { l: 'b', marks: 3, q: 'Hence solve $3\\tan\\theta\\sin\\theta = 8$ for $0^\\circ \\le \\theta \\le 360^\\circ$.',
          answer: '$\\theta = 70.5^\\circ,\\ 289.5^\\circ$',
          ms: ['M1 factorise: $(3\\cos\\theta - 1)(\\cos\\theta + 3) = 0$', 'A1 $\\cos\\theta = \\frac13$ only', 'A1 $70.5^\\circ, 289.5^\\circ$'],
          steps: [
            { say: 'Factorise the quadratic in cos theta.', show: '$(3\\cos\\theta - 1)(\\cos\\theta + 3) = 0$' },
            { say: 'Cos theta cannot be minus 3, so cos theta is one third.', show: '$\\cos\\theta = \\tfrac13$' },
            { say: 'Cos is positive in the first and fourth quadrants.', show: '$\\theta = 70.5^\\circ,\\ 360^\\circ - 70.5^\\circ = 289.5^\\circ$' } ] },
        { l: 'c', marks: 3, q: 'Solve $\\sin 3x = -0.5$ for $0^\\circ \\le x \\le 180^\\circ$.',
          answer: '$x = 70^\\circ,\\ 110^\\circ$',
          ms: ['B1 range $0^\\circ \\le 3x \\le 540^\\circ$', 'M1 $3x = 210^\\circ, 330^\\circ$', 'A1 $x = 70^\\circ, 110^\\circ$'],
          steps: [
            { say: 'Multiply the interval by 3.', show: '$0^\\circ \\le 3x \\le 540^\\circ$' },
            { say: 'Sine is minus one half at 210 and 330 degrees. The next pair, 570 and 690, are out of range.', show: '$3x = 210^\\circ,\\ 330^\\circ$' },
            { say: 'Divide by 3.', show: '$x = 70^\\circ,\\ 110^\\circ$' } ] } ] },

    { n: 7, points: ['m_log', 'm_exp', 'm_growth'],
      parts: [
        { l: 'a', marks: 5, q: 'Solve $2\\log_3 x - \\log_3(x - 2) = 2$.',
          answer: '$x = 3$ or $x = 6$',
          ms: ['M1 $2\\log_3 x = \\log_3 x^2$', 'M1 $\\log_3\\frac{x^2}{x - 2} = 2$', 'A1 $x^2 - 9x + 18 = 0$', 'A1 $x = 3, 6$', 'B1 both valid since $x \\gt 2$'],
          steps: [
            { say: 'Use the power law, then the subtraction law.', show: '$\\log_3\\dfrac{x^2}{x - 2} = 2$' },
            { say: 'Undo the log: the inside is 3 squared.', show: '$\\dfrac{x^2}{x - 2} = 9$' },
            { say: 'Multiply out and rearrange.', show: '$x^2 - 9x + 18 = 0$' },
            { say: 'Factorise.', show: '$(x - 3)(x - 6) = 0 \\Rightarrow x = 3,\\ 6$' },
            { say: 'Check: both are greater than 2, so every log is defined. Both are solutions.', show: '$x = 3$ and $x = 6$ valid' } ] },
        { l: 'b', marks: 5, q: 'An investment of £5000 grows with continuously compounded interest so that its value after $t$ years is £$V$, where $V = 5000e^{rt}$. The value doubles in 12 years.<br>(i) Find $r$, correct to 4 significant figures.<br>(ii) Find the number of complete years after which the value first exceeds £18 000.',
          answer: '(i) $r = 0.05776$ &nbsp; (ii) 23 years',
          ms: ['M1 (i) $e^{12r} = 2$', 'A1 (i) $r = 0.05776$', 'M1 (ii) $e^{rt} = 3.6$', 'A1 (ii) $t = 22.2$', 'A1 (ii) 23 years'],
          steps: [
            { say: 'Doubling means V is 10 000 when t is 12.', show: '$5000e^{12r} = 10000 \\Rightarrow e^{12r} = 2$' },
            { say: 'Take natural logs.', show: '$r = \\dfrac{\\ln2}{12} = 0.05776$' },
            { say: 'Now set V equal to 18 000.', show: '$e^{rt} = 3.6 \\Rightarrow t = \\dfrac{\\ln3.6}{r}$' },
            { say: 'Evaluate using the exact value of r.', show: '$t = \\dfrac{12\\ln3.6}{\\ln2} = 22.18$' },
            { say: 'After 22 complete years it has not yet reached 18 000, so the answer is 23 years.', show: '23 years' } ] } ] },

    { n: 8, points: ['m_dfp', 'm_dx', 'm_stat'],
      q: 'A curve has equation $y = x^2 + \\dfrac{16}{x}$, $x \\gt 0$.',
      parts: [
        { l: 'a', marks: 4, q: 'Find the co-ordinates of the stationary point of the curve.',
          answer: '$(2, 12)$',
          ms: ['M1 $\\frac{dy}{dx} = 2x - 16x^{-2}$', 'M1 set $= 0$', 'A1 $x^3 = 8$, $x = 2$', 'A1 $(2, 12)$'],
          steps: [
            { say: 'Write 16 over x as 16 x to the minus 1, then differentiate.', show: '$\\dfrac{dy}{dx} = 2x - \\dfrac{16}{x^2}$' },
            { say: 'Set the gradient to zero and multiply by x squared.', show: '$2x^3 = 16 \\Rightarrow x^3 = 8$' },
            { say: 'So x is 2.', show: '$x = 2$' },
            { say: 'Find y: 4 plus 8.', show: '$y = 4 + 8 = 12 \\Rightarrow (2, 12)$' } ] },
        { l: 'b', marks: 2, q: 'Determine the nature of the stationary point.',
          answer: 'minimum',
          ms: ['M1 $\\frac{d^2y}{dx^2} = 2 + 32x^{-3}$', 'A1 $= 6 \\gt 0$, minimum'],
          steps: [
            { say: 'Differentiate again.', show: '$\\dfrac{d^2y}{dx^2} = 2 + \\dfrac{32}{x^3}$' },
            { say: 'At x equals 2 this is 2 plus 4.', show: '$2 + 4 = 6$' },
            { say: 'It is positive, so the point is a minimum.', show: '$6 \\gt 0 \\Rightarrow$ minimum' } ] },
        { l: 'c', marks: 4, q: 'Find the equation of the normal to the curve at the point where $x = 1$, giving your answer in the form $ax + by + c = 0$ where $a$, $b$ and $c$ are integers.',
          answer: '$x - 14y + 237 = 0$',
          ms: ['B1 point $(1, 17)$', 'M1 gradient of tangent $-14$', 'M1 normal gradient $\\frac{1}{14}$', 'A1 $x - 14y + 237 = 0$'],
          steps: [
            { say: 'At x equals 1, y is 1 plus 16, which is 17.', show: '$(1, 17)$' },
            { say: 'The gradient of the tangent is 2 minus 16.', show: '$\\dfrac{dy}{dx} = 2 - 16 = -14$' },
            { say: 'The normal is perpendicular, so its gradient is one fourteenth.', show: '$m_{\\text{normal}} = \\dfrac{1}{14}$' },
            { say: 'Use the point and multiply through by 14.', show: '$y - 17 = \\tfrac{1}{14}(x - 1) \\Rightarrow 14y - 238 = x - 1$' },
            { say: 'Rearrange.', show: '$x - 14y + 237 = 0$' } ] },
        { l: 'd', marks: 2, q: 'Find the set of values of $x$ for which $y$ is an increasing function of $x$.',
          answer: '$x \\gt 2$',
          ms: ['M1 $2x - \\frac{16}{x^2} \\gt 0$', 'A1 $x \\gt 2$'],
          steps: [
            { say: 'Increasing means a positive gradient.', show: '$2x - \\dfrac{16}{x^2} \\gt 0$' },
            { say: 'x squared is positive, so multiply through without changing the sign.', show: '$2x^3 \\gt 16 \\Rightarrow x^3 \\gt 8$' },
            { say: 'So y increases for x greater than 2.', show: '$x \\gt 2$' } ] } ] },

    { n: 9, points: ['m_int', 'm_area', 'm_poly'],
      parts: [
        { l: 'a', marks: 2, q: 'Factorise $x^3 - 4x^2 + 3x$ and hence write down where the curve $y = x^3 - 4x^2 + 3x$ meets the $x$-axis.',
          answer: '$x(x - 1)(x - 3)$; $x = 0, 1, 3$',
          ms: ['M1 $x(x^2 - 4x + 3)$', 'A1 $x(x - 1)(x - 3)$; $x = 0, 1, 3$'],
          steps: [
            { say: 'Take out the common factor x.', show: '$x(x^2 - 4x + 3)$' },
            { say: 'Factorise the quadratic.', show: '$x(x - 1)(x - 3)$' },
            { say: 'The curve meets the x axis at 0, 1 and 3.', show: '$x = 0,\\ 1,\\ 3$' } ] },
        { l: 'b', marks: 6, q: 'Find the total area enclosed between the curve and the $x$-axis for $0 \\le x \\le 3$.',
          answer: '$\\frac{37}{12}$ square units',
          ms: ['M1 integrate: $\\frac{x^4}{4} - \\frac{4x^3}{3} + \\frac{3x^2}{2}$', 'M1 split at $x = 1$', 'A1 $\\int_0^1 = \\frac{5}{12}$', 'A1 $\\int_1^3 = -\\frac83$', 'M1 add magnitudes', 'A1 $\\frac{37}{12}$'],
          steps: [
            { say: 'The curve is above the axis from 0 to 1 and below from 1 to 3, so the integral must be split at 1.', show: 'above: $0 \\lt x \\lt 1$; below: $1 \\lt x \\lt 3$' },
            { say: 'Integrate.', show: '$F(x) = \\tfrac{x^4}{4} - \\tfrac{4x^3}{3} + \\tfrac{3x^2}{2}$' },
            { say: 'From 0 to 1.', show: '$F(1) - F(0) = \\tfrac14 - \\tfrac43 + \\tfrac32 = \\tfrac{5}{12}$' },
            { say: 'From 1 to 3. F of 3 is minus 9 over 4.', show: '$F(3) - F(1) = -\\tfrac94 - \\tfrac{5}{12} = -\\tfrac83$' },
            { say: 'Add the sizes of the two areas.', show: '$\\tfrac{5}{12} + \\tfrac83 = \\tfrac{37}{12}$ square units' } ] },
        { l: 'c', marks: 4, q: 'A different curve has gradient function $\\dfrac{dy}{dx} = \\dfrac{(2x - 1)^2}{\\sqrt{x}}$, $x \\gt 0$, and passes through $(1, 1)$. Find its equation.',
          answer: '$y = \\frac85x^{\\frac52} - \\frac83x^{\\frac32} + 2x^{\\frac12} + \\frac{1}{15}$',
          ms: ['M1 expand and divide: $4x^{\\frac32} - 4x^{\\frac12} + x^{-\\frac12}$', 'M1 integrate', 'A1 $\\frac85x^{\\frac52} - \\frac83x^{\\frac32} + 2x^{\\frac12} + c$', 'A1 $c = \\frac{1}{15}$'],
          steps: [
            { say: 'Expand the bracket, then divide each term by x to the one half.', show: '$\\dfrac{4x^2 - 4x + 1}{x^{\\frac12}} = 4x^{\\frac32} - 4x^{\\frac12} + x^{-\\frac12}$' },
            { say: 'Integrate each term: add one to the power and divide by the new power.', show: '$y = \\tfrac85x^{\\frac52} - \\tfrac83x^{\\frac32} + 2x^{\\frac12} + c$' },
            { say: 'Use the point 1, 1.', show: '$1 = \\tfrac85 - \\tfrac83 + 2 + c = \\tfrac{14}{15} + c$' },
            { say: 'So c is one fifteenth.', show: '$c = \\tfrac{1}{15}$' } ] } ] },

    { n: 10, points: ['m_vec', 'm_tri'],
      q: 'Relative to an origin O, the points A and B have position vectors $4\\mathbf i + \\mathbf j$ and $\\mathbf i + 5\\mathbf j$ respectively.',
      parts: [
        { l: 'a', marks: 2, q: 'Find $\\overrightarrow{AB}$ and $|\\overrightarrow{AB}|$.',
          answer: '$-3\\mathbf i + 4\\mathbf j$; $5$',
          ms: ['B1 $-3\\mathbf i + 4\\mathbf j$', 'B1 $5$'],
          steps: [
            { say: 'AB is the position vector of B minus that of A.', show: '$\\overrightarrow{AB} = -3\\mathbf i + 4\\mathbf j$' },
            { say: 'Use Pythagoras.', show: '$\\sqrt{9 + 16} = 5$' },
            { say: 'So the length is 5.', show: '$|\\overrightarrow{AB}| = 5$' } ] },
        { l: 'b', marks: 1, q: 'OABC is a parallelogram. Find the position vector of C.',
          answer: '$-3\\mathbf i + 4\\mathbf j$',
          ms: ['B1 $\\overrightarrow{OC} = \\overrightarrow{AB} = -3\\mathbf i + 4\\mathbf j$'],
          steps: [
            { say: 'In parallelogram O A B C, side OC is parallel and equal to side AB.', show: '$\\overrightarrow{OC} = \\overrightarrow{AB}$' },
            { say: 'So OC equals the vector from part a.', show: '$\\overrightarrow{OC} = -3\\mathbf i + 4\\mathbf j$' },
            { say: 'Check: OA plus OC gives OB.', show: '$(4\\mathbf i + \\mathbf j) + (-3\\mathbf i + 4\\mathbf j) = \\mathbf i + 5\\mathbf j$ ✓' } ] },
        { l: 'c', marks: 2, q: 'Find the size of angle AOB.',
          answer: '$64.7^\\circ$',
          ms: ['M1 directions $\\tan^{-1}\\frac14$ and $\\tan^{-1}5$', 'A1 $64.7^\\circ$'],
          steps: [
            { say: 'Find the angle each vector makes with i.', show: '$\\overrightarrow{OA}: \\tan^{-1}\\tfrac14 = 14.04^\\circ,\\quad \\overrightarrow{OB}: \\tan^{-1}5 = 78.69^\\circ$' },
            { say: 'The angle between them is the difference.', show: '$78.69^\\circ - 14.04^\\circ$' },
            { say: 'So angle AOB is about 64.7 degrees.', show: '$\\angle AOB = 64.7^\\circ$' } ] },
        { l: 'd', marks: 1, q: 'Hence find the area of the parallelogram OABC.',
          answer: '$19$ square units',
          ms: ['B1 $2 \\times \\frac12\\sqrt{17}\\sqrt{26}\\sin 64.7^\\circ = 19$'],
          steps: [
            { say: 'The diagonal OB splits the parallelogram into two equal triangles. Find the area of triangle OAB.', show: '$\\tfrac12|OA||OB|\\sin AOB = \\tfrac12\\sqrt{17}\\sqrt{26}\\sin64.65^\\circ = 9.5$' },
            { say: 'Double it.', show: '$2 \\times 9.5 = 19$' },
            { say: 'The area is 19 square units.', show: '19 square units' } ] } ] }
  ]
});
