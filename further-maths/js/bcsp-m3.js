// BCS Academy original papers · not CCEA papers. Maths A2 1 Pure Mathematics: three practice papers (easy, medium, hard).
// Format: 2 h 30 min, 150 marks, calculator allowed (CCEA GCE Mathematics A2 1). Points are COURSES.m3.points ids.

BCSP.add({
  id: 'm3-easy',
  unit: 'm3',
  level: 'easy',
  title: 'Maths A2 1 · Paper A (Easy)',
  minutes: 150,
  calc: true,
  questions: [
    {
      n: 1,
      points: ['m3_func'],
      q: 'The functions $f$ and $g$ are defined by $f(x) = 3x - 2,\\ x \\in \\mathbb{R}$ and $g(x) = x^2 + 1,\\ x \\in \\mathbb{R}$.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find an expression for $fg(x)$, simplifying your answer.',
          answer: '$fg(x) = 3x^2 + 1$',
          ms: ['M1 substitutes $g(x)$ into $f$: $3(x^2+1) - 2$', 'A1 $3x^2 + 1$'],
          steps: [
            { say: 'fg of x means do g first, then apply f to the result.', show: '$fg(x) = f\\big(g(x)\\big) = f(x^2+1)$' },
            { say: 'Replace x in f with x squared plus one.', show: '$= 3(x^2+1) - 2$' },
            { say: 'Expand and simplify.', show: '$fg(x) = 3x^2 + 1$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find $f^{-1}(x)$.',
          answer: '$f^{-1}(x) = \\dfrac{x+2}{3}$',
          ms: ['M1 sets $y = 3x - 2$ and rearranges for $x$', 'A1 $f^{-1}(x) = \\frac{x+2}{3}$'],
          steps: [
            { say: 'Write y equals f of x.', show: '$y = 3x - 2$' },
            { say: 'Make x the subject.', show: '$x = \\dfrac{y+2}{3}$' },
            { say: 'Swap the letters to write the inverse as a function of x.', show: '$f^{-1}(x) = \\dfrac{x+2}{3}$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Solve the equation $gf(x) = 10$.',
          answer: '$x = \\tfrac53$ or $x = -\\tfrac13$',
          ms: [
            'M1 $gf(x) = (3x-2)^2 + 1$',
            'M1 $(3x-2)^2 = 9 \\Rightarrow 3x - 2 = \\pm 3$',
            'A1 $x = \\frac53,\\ -\\frac13$'],
          steps: [
            { say: 'This time f is applied first, then g.', show: '$gf(x) = g(3x-2) = (3x-2)^2 + 1$' },
            { say: 'Set it equal to ten and subtract one.', show: '$(3x-2)^2 = 9$' },
            { say: 'Square root both sides, remembering plus or minus.', show: '$3x - 2 = 3 \\ \\text{or}\\ 3x - 2 = -3$' },
            { say: 'Solve each linear equation.', show: '$x = \\tfrac53 \\quad\\text{or}\\quad x = -\\tfrac13$' }] },
        {
          l: 'd',
          marks: 1,
          q: 'State the range of $g$.',
          answer: '$g(x) \\geq 1$',
          ms: ['B1 $g(x) \\geq 1$'],
          steps: [
            { say: 'x squared is never negative, so its smallest value is zero.', show: '$x^2 \\geq 0$' },
            { say: 'Adding one moves everything up by one.', show: '$g(x) = x^2 + 1 \\geq 1$' },
            { say: 'So the range is all values greater than or equal to one.', show: 'Range: $g(x) \\geq 1$' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Explain why $g$ does not have an inverse function.',
          answer: '$g$ is many-to-one (e.g. $g(2) = g(-2) = 5$), so it is not one-to-one.',
          ms: ['B1 many-to-one / not one-to-one, with a reason or example'],
          steps: [
            { say: 'An inverse function only exists if the function is one to one.', show: 'inverse exists $\\iff$ one-to-one' },
            { say: 'Here two different inputs give the same output.', show: '$g(2) = 5 = g(-2)$' },
            { say: 'So g is many to one on all the real numbers and has no inverse.', show: '$g$ is many-to-one $\\Rightarrow$ no inverse' }] }] },
    {
      n: 2,
      points: ['m3_mod', 'm3_trans'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Solve the inequality $|2x - 3| < 5$.',
          answer: '$-1 < x < 4$',
          ms: ['M1 $-5 < 2x - 3 < 5$', 'A1 one correct bound', 'A1 $-1 < x < 4$'],
          steps: [
            { say: 'A modulus less than five means the inside lies between minus five and five.', show: '$-5 < 2x - 3 < 5$' },
            { say: 'Add three throughout.', show: '$-2 < 2x < 8$' },
            { say: 'Divide by two.', show: '$-1 < x < 4$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Solve the equation $|x - 1| = 2x + 4$.',
          answer: '$x = -1$',
          ms: [
            'M1 considers both $x - 1 = 2x + 4$ and $-(x-1) = 2x + 4$',
            'A1 $x = -1$',
            'A1 rejects $x = -5$ with reason (right-hand side negative)'],
          steps: [
            { say: 'Split into the two cases for the modulus.', show: '$x - 1 = 2x + 4 \\quad\\text{or}\\quad -(x - 1) = 2x + 4$' },
            { say: 'The first case gives x equals minus five.', show: '$x = -5$' },
            { say: 'But then the right-hand side is minus six, and a modulus cannot equal a negative number, so reject it.', show: '$2(-5) + 4 = -6 < 0 \\Rightarrow$ reject' },
            { say: 'The second case gives minus x plus one equals two x plus four, so x equals minus one.', show: '$-3x = 3 \\Rightarrow x = -1$' },
            { say: 'Check: the left side is two and the right side is two, so it works.', show: '$|-2| = 2 = 2(-1)+4\\ \\checkmark$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'The curve $y = f(x)$ has a maximum point at $(2, 6)$. Write down the coordinates of the maximum point on (i) $y = 3f(x)$, (ii) $y = f(2x)$.',
          answer: '(i) $(2, 18)$ (ii) $(1, 6)$',
          ms: ['B1 $(2, 18)$', 'B1 $(1, 6)$'],
          steps: [
            { say: 'Three f of x is a vertical stretch by factor three, so the y coordinate is tripled.', show: '$(2, 6) \\mapsto (2, 18)$' },
            { say: 'f of two x is a horizontal stretch by factor one half, so the x coordinate is halved.', show: '$(2, 6) \\mapsto (1, 6)$' },
            { say: 'In each case only one coordinate changes.', show: '(i) $(2,18)$ &nbsp; (ii) $(1,6)$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Write down the coordinates of the maximum point on $y = f(x + 1) - 4$.',
          answer: '$(1, 2)$',
          ms: ['B1 $x$-coordinate 1', 'B1 $y$-coordinate 2'],
          steps: [
            { say: 'f of x plus one is a translation one unit to the left.', show: '$x: 2 \\to 1$' },
            { say: 'Minus four is a translation four units down.', show: '$y: 6 \\to 2$' },
            { say: 'So the maximum moves to one, two.', show: '$(1, 2)$' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Write down the coordinates of the corresponding point on $y = -f(x)$ and state its nature.',
          answer: '$(2, -6)$, a minimum point',
          ms: ['B1 $(2, -6)$ minimum'],
          steps: [
            { say: 'Minus f of x reflects the curve in the x axis.', show: '$(2, 6) \\mapsto (2, -6)$' },
            { say: 'A maximum turns upside down to become a minimum.', show: '$(2, -6)$ is a minimum point' },
            { say: 'So the point on minus f of x is two, minus six, and it is a minimum.', show: '$(2, -6)$, minimum' }] }] },
    {
      n: 3,
      points: ['m3_ratx', 'm3_pf', 'm3_ipf'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Simplify fully $\\dfrac{x^2 - 9}{x^2 + x - 6}$.',
          answer: '$\\dfrac{x-3}{x-2}$',
          ms: ['M1 factorises numerator and denominator', 'A1 $\\frac{x-3}{x-2}$'],
          steps: [
            { say: 'The top is a difference of two squares.', show: '$x^2 - 9 = (x-3)(x+3)$' },
            { say: 'Factorise the bottom.', show: '$x^2 + x - 6 = (x+3)(x-2)$' },
            { say: 'Cancel the common factor x plus three.', show: '$\\dfrac{(x-3)(x+3)}{(x+3)(x-2)} = \\dfrac{x-3}{x-2}$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Find the quotient and remainder when $2x^3 + 3x^2 - 4x + 5$ is divided by $(x + 2)$.',
          answer: 'Quotient $2x^2 - x - 2$, remainder $9$',
          ms: ['M1 division method with first term $2x^2$', 'A1 quotient $2x^2 - x - 2$', 'A1 remainder 9'],
          steps: [
            { say: 'Divide the leading term: two x cubed over x is two x squared.', show: '$2x^2(x+2) = 2x^3 + 4x^2$, leaving $-x^2 - 4x + 5$' },
            { say: 'Next, minus x squared over x is minus x.', show: '$-x(x+2) = -x^2 - 2x$, leaving $-2x + 5$' },
            { say: 'Then minus two x over x is minus two.', show: '$-2(x+2) = -2x - 4$, leaving $9$' },
            { say: 'So the quotient is two x squared minus x minus two and the remainder is nine.', show: '$2x^3 + 3x^2 - 4x + 5 = (x+2)(2x^2 - x - 2) + 9$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Express $\\dfrac{5x + 4}{(x - 1)(x + 2)}$ in partial fractions.',
          answer: '$\\dfrac{3}{x-1} + \\dfrac{2}{x+2}$',
          ms: ['M1 $5x + 4 \\equiv A(x+2) + B(x-1)$', 'A1 $A = 3$', 'A1 $B = 2$'],
          steps: [
            { say: 'Write the fraction as A over x minus one plus B over x plus two.', show: '$\\dfrac{5x+4}{(x-1)(x+2)} \\equiv \\dfrac{A}{x-1} + \\dfrac{B}{x+2}$' },
            { say: 'Multiply through by the denominator.', show: '$5x + 4 \\equiv A(x+2) + B(x-1)$' },
            { say: 'Put x equal to one: nine equals three A, so A is three.', show: '$x = 1:\\ 9 = 3A \\Rightarrow A = 3$' },
            { say: 'Put x equal to minus two: minus six equals minus three B, so B is two.', show: '$x = -2:\\ -6 = -3B \\Rightarrow B = 2$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Hence find the exact value of $\\displaystyle\\int_2^4 \\frac{5x + 4}{(x - 1)(x + 2)}\\,dx$, giving your answer in the form $\\ln k$.',
          answer: '$\\ln\\dfrac{243}{4}$',
          ms: [
            'M1 integrates to $3\\ln|x-1| + 2\\ln|x+2|$',
            'M1 substitutes limits',
            'M1 uses log laws to combine',
            'A1 $\\ln\\frac{243}{4}$'],
          steps: [
            { say: 'Integrate each partial fraction: each gives a natural log.', show: '$\\displaystyle\\int = \\big[3\\ln|x-1| + 2\\ln|x+2|\\big]_2^4$' },
            { say: 'Substitute the limits four and two.', show: '$= (3\\ln 3 + 2\\ln 6) - (3\\ln 1 + 2\\ln 4)$' },
            { say: 'ln one is zero, and two ln six minus two ln four is two ln of one and a half.', show: '$= 3\\ln 3 + 2\\ln\\tfrac32$' },
            { say: 'Use the power law and the product law.', show: '$= \\ln 27 + \\ln\\tfrac94 = \\ln\\dfrac{243}{4}$' }] }] },
    {
      n: 4,
      points: ['m3_ap', 'm3_gp', 'm3_seq', 'm3_binr'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'The third term of an arithmetic sequence is 11 and the eighth term is 31. Find the first term and the common difference.',
          answer: '$a = 3,\\ d = 4$',
          ms: ['M1 forms $a + 2d = 11$ and $a + 7d = 31$', 'A1 $d = 4$', 'A1 $a = 3$'],
          steps: [
            { say: 'Use the nth term a plus n minus one times d.', show: '$a + 2d = 11, \\quad a + 7d = 31$' },
            { say: 'Subtract the equations to remove a.', show: '$5d = 20 \\Rightarrow d = 4$' },
            { say: 'Substitute back.', show: '$a = 11 - 8 = 3$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the sum of the first 20 terms of this sequence.',
          answer: '$820$',
          ms: ['M1 uses $S_n = \\frac n2[2a + (n-1)d]$', 'A1 820'],
          steps: [
            { say: 'Use the sum formula for an arithmetic series.', show: '$S_{20} = \\tfrac{20}{2}\\big[2(3) + 19(4)\\big]$' },
            { say: 'Work out the bracket: six plus seventy six is eighty two.', show: '$= 10 \\times 82$' },
            { say: 'So the sum is eight hundred and twenty.', show: '$S_{20} = 820$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'A geometric series has first term 48 and common ratio $\\tfrac34$. Find its sum to infinity.',
          answer: '$192$',
          ms: ['M1 $\\frac{48}{1 - 3/4}$', 'A1 192'],
          steps: [
            { say: 'The ratio is between minus one and one, so the sum to infinity exists.', show: '$|r| = \\tfrac34 < 1$' },
            { say: 'Use a over one minus r.', show: '$S_\\infty = \\dfrac{48}{1 - \\frac34} = \\dfrac{48}{\\frac14}$' },
            { say: 'That is forty eight times four.', show: '$S_\\infty = 192$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find the sum of the first 6 terms of this geometric series.',
          answer: '$157.828125$ (157.8 to 1 d.p.)',
          ms: ['M1 $\\frac{48(1 - 0.75^6)}{1 - 0.75}$', 'A1 157.8'],
          steps: [
            { say: 'Use the finite geometric sum formula.', show: '$S_6 = \\dfrac{48\\big(1 - (\\frac34)^6\\big)}{1 - \\frac34}$' },
            { say: 'Three quarters to the sixth is about zero point one seven eight.', show: '$(\\tfrac34)^6 = 0.177978\\ldots$' },
            { say: 'Multiply out.', show: '$S_6 = 192(1 - 0.177978) = 157.83$' }] },
        {
          l: 'e',
          marks: 2,
          q: 'A sequence is defined by $u_{n+1} = 0.5u_n + 6$, $u_1 = 2$. Find $u_2$ and $u_3$.',
          answer: '$u_2 = 7,\\ u_3 = 9.5$',
          ms: ['B1 $u_2 = 7$', 'B1 $u_3 = 9.5$'],
          steps: [
            { say: 'Put u one equal to two into the rule.', show: '$u_2 = 0.5(2) + 6 = 7$' },
            { say: 'Now use u two to get u three.', show: '$u_3 = 0.5(7) + 6 = 9.5$' },
            { say: 'The terms are increasing.', show: '$2,\\ 7,\\ 9.5,\\ \\ldots$' }] },
        {
          l: 'f',
          marks: 2,
          q: 'The sequence converges to a limit $L$. Find $L$.',
          answer: '$L = 12$',
          ms: ['M1 $L = 0.5L + 6$', 'A1 $L = 12$'],
          steps: [
            { say: 'In the long run the terms settle, so u n and u n plus one are both L.', show: '$L = 0.5L + 6$' },
            { say: 'Collect the L terms.', show: '$0.5L = 6$' },
            { say: 'So the limit is twelve.', show: '$L = 12$' }] },
        {
          l: 'g',
          marks: 4,
          q: 'Find the binomial expansion of $(1 + 4x)^{\\frac12}$ in ascending powers of $x$ up to and including the term in $x^3$.',
          answer: '$1 + 2x - 2x^2 + 4x^3$',
          ms: ['M1 correct binomial structure with $n = \\frac12$', 'A1 $1 + 2x$', 'A1 $-2x^2$', 'A1 $+4x^3$'],
          steps: [
            { say: 'Use the binomial series with n equal to one half and four x in place of x.', show: '$(1+4x)^{\\frac12} = 1 + \\tfrac12(4x) + \\dfrac{\\frac12(-\\frac12)}{2!}(4x)^2 + \\dfrac{\\frac12(-\\frac12)(-\\frac32)}{3!}(4x)^3$' },
            { say: 'The x term is one half times four x, which is two x.', show: '$\\tfrac12(4x) = 2x$' },
            { say: 'The x squared term is minus one eighth times sixteen x squared.', show: '$-\\tfrac18 \\times 16x^2 = -2x^2$' },
            { say: 'The x cubed term is one sixteenth times sixty four x cubed.', show: '$\\tfrac{1}{16} \\times 64x^3 = 4x^3$' },
            { say: 'Put it together.', show: '$1 + 2x - 2x^2 + 4x^3$' }] },
        {
          l: 'h',
          marks: 1,
          q: 'State the range of values of $x$ for which the expansion is valid.',
          answer: '$|x| < \\tfrac14$',
          ms: ['B1 $|x| < \\frac14$'],
          steps: [
            { say: 'The expansion is valid when the term added to one has modulus less than one.', show: '$|4x| < 1$' },
            { say: 'Divide by four.', show: '$|x| < \\tfrac14$' },
            { say: 'So the expansion is valid for x between minus a quarter and a quarter.', show: '$-\\tfrac14 < x < \\tfrac14$' }] },
        {
          l: 'i',
          marks: 2,
          q: 'Use your expansion with a suitable value of $x$ to estimate $\\sqrt{1.04}$, giving your answer to 6 decimal places.',
          answer: '$1.019804$',
          ms: ['M1 uses $x = 0.01$', 'A1 1.019804'],
          steps: [
            { say: 'We need one plus four x to equal one point zero four, so x is zero point zero one, which is in the valid range.', show: '$1 + 4x = 1.04 \\Rightarrow x = 0.01$' },
            { say: 'Substitute into the expansion.', show: '$1 + 0.02 - 0.0002 + 0.000004$' },
            { say: 'Add up.', show: '$\\sqrt{1.04} \\approx 1.019804$' }] }] },
    {
      n: 5,
      points: ['m_rad', 'm3_rtrig', 'm3_tid'],
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'A sector of a circle has radius 8 cm and angle 1.2 radians. Find the arc length.',
          answer: '$9.6$ cm',
          ms: ['B1 9.6 cm'],
          steps: [
            { say: 'The angle is already in radians, so we can use the radian formulas directly.', show: '$r = 8,\\ \\theta = 1.2$' },
            { say: 'Arc length is r theta, with theta in radians.', show: '$s = r\\theta$' },
            { say: 'Eight times one point two.', show: '$s = 8 \\times 1.2 = 9.6$ cm' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the area of the sector.',
          answer: '$38.4$ cm²',
          ms: ['M1 $\\frac12 r^2\\theta$', 'A1 38.4'],
          steps: [
            { say: 'Sector area is one half r squared theta.', show: '$A = \\tfrac12 r^2\\theta$' },
            { say: 'Substitute radius eight and angle one point two.', show: '$A = \\tfrac12 \\times 64 \\times 1.2$' },
            { say: 'This gives thirty eight point four square centimetres.', show: '$A = 38.4\\ \\text{cm}^2$' }] },
        {
          l: 'c',
          marks: 1,
          q: 'Find the perimeter of the sector.',
          answer: '$25.6$ cm',
          ms: ['B1 25.6 cm (ft their arc)'],
          steps: [
            { say: 'The perimeter is the arc plus two radii.', show: '$P = 9.6 + 8 + 8$' },
            { say: 'So the perimeter is twenty five point six centimetres.', show: '$P = 25.6$ cm' },
            { say: 'Arc nine point six plus sixteen.', show: '$9.6 + 16 = 25.6$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Write down the exact values of (i) $\\sec\\dfrac{\\pi}{3}$, (ii) $\\arcsin\\dfrac{\\sqrt3}{2}$.',
          answer: '(i) $2$ (ii) $\\dfrac{\\pi}{3}$',
          ms: ['B1 2', 'B1 $\\frac\\pi3$'],
          steps: [
            { say: 'Secant is one over cosine, and cos of pi by three is one half.', show: '$\\sec\\frac\\pi3 = \\dfrac{1}{\\cos\\frac\\pi3} = \\dfrac{1}{1/2} = 2$' },
            { say: 'arcsin gives the angle between minus pi by two and pi by two whose sine is root three over two.', show: '$\\sin\\frac\\pi3 = \\frac{\\sqrt3}{2} \\Rightarrow \\arcsin\\frac{\\sqrt3}2 = \\frac\\pi3$' },
            { say: 'So the answers are two and pi over three.', show: '(i) $2$ &nbsp; (ii) $\\tfrac\\pi3$' }] },
        {
          l: 'e',
          marks: 6,
          q: 'Solve the equation $3\\operatorname{cosec}^2\\theta = 5\\cot\\theta + 5$ for $0^\\circ \\leq \\theta \\leq 360^\\circ$, giving answers to 1 decimal place.',
          answer: '$\\theta = 26.6^\\circ,\\ 108.4^\\circ,\\ 206.6^\\circ,\\ 288.4^\\circ$',
          ms: [
            'M1 uses $\\operatorname{cosec}^2\\theta = 1 + \\cot^2\\theta$',
            'M1 forms $3\\cot^2\\theta - 5\\cot\\theta - 2 = 0$',
            'A1 $\\cot\\theta = 2$ or $-\\frac13$',
            'M1 $\\tan\\theta = \\frac12$ or $-3$',
            'A1 26.6°, 206.6°',
            'A1 108.4°, 288.4°'],
          steps: [
            { say: 'Replace cosec squared with one plus cot squared so everything is in cot.', show: '$3(1 + \\cot^2\\theta) = 5\\cot\\theta + 5$' },
            { say: 'Rearrange into a quadratic in cot theta.', show: '$3\\cot^2\\theta - 5\\cot\\theta - 2 = 0$' },
            { say: 'Factorise.', show: '$(3\\cot\\theta + 1)(\\cot\\theta - 2) = 0 \\Rightarrow \\cot\\theta = 2 \\ \\text{or}\\ -\\tfrac13$' },
            { say: 'Turn cot into tan by taking reciprocals.', show: '$\\tan\\theta = \\tfrac12 \\ \\text{or}\\ \\tan\\theta = -3$' },
            { say: 'Tan is one half at twenty six point six degrees, and again one eighty later.', show: '$\\theta = 26.6^\\circ,\\ 206.6^\\circ$' },
            { say: 'Tan is minus three at one hundred and eight point four degrees and two eighty eight point four degrees.', show: '$\\theta = 108.4^\\circ,\\ 288.4^\\circ$' }] }] },
    {
      n: 6,
      points: ['m3_comp', 'm3_rform'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Given that $\\sin A = \\tfrac35$ and $\\cos B = \\tfrac{5}{13}$, where $A$ and $B$ are both acute, find the exact value of $\\sin(A + B)$.',
          answer: '$\\dfrac{63}{65}$',
          ms: [
            'B1 $\\cos A = \\frac45$ and $\\sin B = \\frac{12}{13}$',
            'M1 uses $\\sin A\\cos B + \\cos A\\sin B$',
            'A1 $\\frac{63}{65}$'],
          steps: [
            { say: 'Use Pythagoras with the three four five and five twelve thirteen triangles. Both angles are acute so everything is positive.', show: '$\\cos A = \\tfrac45, \\quad \\sin B = \\tfrac{12}{13}$' },
            { say: 'Use the compound angle formula for sine.', show: '$\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$' },
            { say: 'Substitute.', show: '$= \\tfrac35\\cdot\\tfrac5{13} + \\tfrac45\\cdot\\tfrac{12}{13} = \\tfrac{15}{65} + \\tfrac{48}{65}$' },
            { say: 'Add.', show: '$\\sin(A+B) = \\dfrac{63}{65}$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the exact value of $\\cos 2A$.',
          answer: '$\\dfrac{7}{25}$',
          ms: ['M1 uses $\\cos 2A = 1 - 2\\sin^2 A$ (or equivalent)', 'A1 $\\frac{7}{25}$'],
          steps: [
            { say: 'Use the double angle formula in terms of sine.', show: '$\\cos 2A = 1 - 2\\sin^2 A$' },
            { say: 'Sine A is three fifths, so sine squared is nine over twenty five.', show: '$= 1 - 2\\cdot\\tfrac{9}{25} = 1 - \\tfrac{18}{25}$' },
            { say: 'This gives seven over twenty five.', show: '$\\cos 2A = \\tfrac{7}{25}$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Express $3\\cos\\theta + 4\\sin\\theta$ in the form $R\\cos(\\theta - \\alpha)$, where $R > 0$ and $0^\\circ < \\alpha < 90^\\circ$.',
          answer: '$5\\cos(\\theta - 53.1^\\circ)$',
          ms: ['M1 $R\\cos\\alpha = 3,\\ R\\sin\\alpha = 4$', 'A1 $R = 5$', 'A1 $\\alpha = 53.1^\\circ$'],
          steps: [
            { say: 'Expand R cos of theta minus alpha.', show: '$R\\cos\\theta\\cos\\alpha + R\\sin\\theta\\sin\\alpha$' },
            { say: 'Compare coefficients with three cos theta plus four sin theta.', show: '$R\\cos\\alpha = 3, \\quad R\\sin\\alpha = 4$' },
            { say: 'Square and add to get R.', show: '$R = \\sqrt{3^2 + 4^2} = 5$' },
            { say: 'Divide to get tan alpha.', show: '$\\tan\\alpha = \\tfrac43 \\Rightarrow \\alpha = 53.13^\\circ$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Hence state the maximum value of $3\\cos\\theta + 4\\sin\\theta$ and the value of $\\theta$, $0^\\circ \\leq \\theta \\leq 360^\\circ$, at which it occurs.',
          answer: 'Maximum 5 at $\\theta = 53.1^\\circ$',
          ms: ['B1 maximum 5', 'B1 $\\theta = 53.1^\\circ$'],
          steps: [
            { say: 'Cosine is at most one, so the maximum is R, which is five.', show: '$\\max = 5$' },
            { say: 'This happens when theta minus alpha is zero.', show: '$\\theta - 53.13^\\circ = 0 \\Rightarrow \\theta = 53.1^\\circ$' },
            { say: 'Check: five cos zero is five.', show: '$5\\cos 0^\\circ = 5$' }] },
        {
          l: 'e',
          marks: 3,
          q: 'Solve $3\\cos\\theta + 4\\sin\\theta = 2$ for $0^\\circ \\leq \\theta \\leq 360^\\circ$.',
          answer: '$\\theta = 119.6^\\circ,\\ 346.7^\\circ$',
          ms: ['M1 $\\cos(\\theta - 53.13^\\circ) = 0.4$', 'A1 119.6°', 'A1 346.7°'],
          steps: [
            { say: 'Use the R form.', show: '$5\\cos(\\theta - 53.13^\\circ) = 2 \\Rightarrow \\cos(\\theta - 53.13^\\circ) = 0.4$' },
            { say: 'The principal value of arccos of zero point four is sixty six point four two degrees, and the other value in range is two ninety three point five eight.', show: '$\\theta - 53.13^\\circ = 66.42^\\circ \\ \\text{or}\\ 293.58^\\circ$' },
            { say: 'Add fifty three point one three to each.', show: '$\\theta = 119.6^\\circ \\ \\text{or}\\ 346.7^\\circ$' }] }] },
    {
      n: 7,
      points: ['m3_dstd', 'm3_rules'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Differentiate $y = e^{3x}\\sin 2x$.',
          answer: '$\\dfrac{dy}{dx} = e^{3x}(3\\sin 2x + 2\\cos 2x)$',
          ms: ['M1 product rule', 'B1 $\\frac{d}{dx}\\sin 2x = 2\\cos 2x$', 'A1 $3e^{3x}\\sin 2x + 2e^{3x}\\cos 2x$'],
          steps: [
            { say: 'This is a product, so use u v dash plus v u dash.', show: '$u = e^{3x},\\ v = \\sin 2x$' },
            { say: 'Differentiate each piece.', show: '$u\' = 3e^{3x},\\ v\' = 2\\cos 2x$' },
            { say: 'Combine.', show: '$\\dfrac{dy}{dx} = 3e^{3x}\\sin 2x + 2e^{3x}\\cos 2x$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Differentiate $y = \\dfrac{\\ln x}{x^2}$, simplifying your answer.',
          answer: '$\\dfrac{dy}{dx} = \\dfrac{1 - 2\\ln x}{x^3}$',
          ms: ['M1 quotient rule', 'A1 $\\frac{x^2\\cdot\\frac1x - 2x\\ln x}{x^4}$', 'A1 $\\frac{1 - 2\\ln x}{x^3}$'],
          steps: [
            { say: 'Use the quotient rule with u equal to ln x and v equal to x squared.', show: '$u\' = \\tfrac1x,\\ v\' = 2x$' },
            { say: 'Bottom times derivative of top, minus top times derivative of bottom, all over bottom squared.', show: '$\\dfrac{dy}{dx} = \\dfrac{x^2\\cdot\\frac1x - \\ln x\\cdot 2x}{x^4}$' },
            { say: 'Simplify the numerator to x minus two x ln x.', show: '$= \\dfrac{x - 2x\\ln x}{x^4}$' },
            { say: 'Cancel a factor of x.', show: '$= \\dfrac{1 - 2\\ln x}{x^3}$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Differentiate $y = (2x + 1)^5$.',
          answer: '$10(2x + 1)^4$',
          ms: ['M1 chain rule $5(2x+1)^4 \\times 2$', 'A1 $10(2x+1)^4$'],
          steps: [
            { say: 'This is a function of a function: the inside is two x plus one.', show: '$u = 2x + 1,\\ y = u^5$' },
            { say: 'Use the chain rule: bring down the power and reduce it by one.', show: '$5(2x+1)^4$' },
            { say: 'Then multiply by the derivative of the inside, which is two.', show: '$\\dfrac{dy}{dx} = 5(2x+1)^4 \\times 2 = 10(2x+1)^4$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Find the coordinates of the stationary points on the curve $y = x^2e^{-x}$, giving exact values.',
          answer: '$(0, 0)$ and $(2, 4e^{-2})$',
          ms: [
            'M1 product rule',
            'A1 $\\frac{dy}{dx} = e^{-x}(2x - x^2)$',
            'M1 sets $= 0$, using $e^{-x} \\neq 0$',
            'A1 $(0,0)$ and $(2, 4e^{-2})$'],
          steps: [
            { say: 'Use the product rule.', show: '$\\dfrac{dy}{dx} = 2xe^{-x} - x^2e^{-x} = e^{-x}(2x - x^2)$' },
            { say: 'Stationary points have zero gradient, and e to the minus x is never zero.', show: '$2x - x^2 = 0 \\Rightarrow x(2 - x) = 0$' },
            { say: 'So x is zero or two.', show: '$x = 0, \\ x = 2$' },
            { say: 'Find the y values.', show: '$(0, 0), \\quad (2, 4e^{-2})$' }] },
        {
          l: 'e',
          marks: 2,
          q: 'Determine the nature of each stationary point.',
          answer: '$(0,0)$ is a minimum; $(2, 4e^{-2})$ is a maximum',
          ms: [
            'M1 finds $\\frac{d^2y}{dx^2} = e^{-x}(x^2 - 4x + 2)$ and substitutes',
            'A1 both correct with reasons'],
          steps: [
            { say: 'Differentiate again with the product rule.', show: '$\\dfrac{d^2y}{dx^2} = -e^{-x}(2x - x^2) + e^{-x}(2 - 2x) = e^{-x}(x^2 - 4x + 2)$' },
            { say: 'At x equals zero the second derivative is two, which is positive, so it is a minimum.', show: '$x = 0:\\ 2 > 0 \\Rightarrow$ minimum' },
            { say: 'At x equals two it is minus two e to the minus two, which is negative, so it is a maximum.', show: '$x = 2:\\ -2e^{-2} < 0 \\Rightarrow$ maximum' }] }] },
    {
      n: 8,
      points: ['m3_impl', 'm3_param'],
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'A curve has equation $x^2 + 3xy + y^2 = 11$. Find $\\dfrac{dy}{dx}$ at the point $(1, 2)$.',
          answer: '$-\\dfrac87$',
          ms: [
            'M1 implicit differentiation of $y^2$',
            'M1 product rule on $3xy$',
            'A1 $2x + 3y + 3x\\frac{dy}{dx} + 2y\\frac{dy}{dx} = 0$',
            'A1 $-\\frac87$'],
          steps: [
            { say: 'Differentiate every term with respect to x. Use the product rule on three x y.', show: '$2x + \\left(3y + 3x\\dfrac{dy}{dx}\\right) + 2y\\dfrac{dy}{dx} = 0$' },
            { say: 'Collect the d y d x terms.', show: '$\\dfrac{dy}{dx}(3x + 2y) = -(2x + 3y)$' },
            { say: 'Make d y d x the subject.', show: '$\\dfrac{dy}{dx} = -\\dfrac{2x + 3y}{3x + 2y}$' },
            { say: 'Substitute x equals one and y equals two.', show: '$\\dfrac{dy}{dx} = -\\dfrac{2 + 6}{3 + 4} = -\\dfrac87$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the equation of the tangent to the curve at $(1, 2)$, in the form $ax + by = c$.',
          answer: '$8x + 7y = 22$',
          ms: ['M1 $y - 2 = -\\frac87(x - 1)$', 'A1 $8x + 7y = 22$'],
          steps: [
            { say: 'Use y minus y one equals m times x minus x one.', show: '$y - 2 = -\\tfrac87(x - 1)$' },
            { say: 'Multiply by seven.', show: '$7y - 14 = -8x + 8$' },
            { say: 'Rearrange.', show: '$8x + 7y = 22$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'A second curve is given parametrically by $x = 2t + 1$, $y = t^2 - 3$. Find its Cartesian equation.',
          answer: '$y = \\dfrac{(x-1)^2}{4} - 3$',
          ms: ['M1 $t = \\frac{x-1}{2}$', 'A1 $y = \\frac{(x-1)^2}{4} - 3$'],
          steps: [
            { say: 'Make t the subject of the x equation.', show: '$t = \\dfrac{x - 1}{2}$' },
            { say: 'Substitute into the y equation.', show: '$y = \\left(\\dfrac{x-1}{2}\\right)^2 - 3$' },
            { say: 'So the Cartesian equation is', show: '$y = \\dfrac{(x-1)^2}{4} - 3$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find $\\dfrac{dy}{dx}$ in terms of $t$ and evaluate it when $t = 2$.',
          answer: '$\\dfrac{dy}{dx} = t$; equals 2 when $t = 2$',
          ms: ['M1 $\\frac{dy/dt}{dx/dt} = \\frac{2t}{2}$', 'A1 2'],
          steps: [
            { say: 'Differentiate each with respect to t.', show: '$\\dfrac{dx}{dt} = 2, \\quad \\dfrac{dy}{dt} = 2t$' },
            { say: 'Divide.', show: '$\\dfrac{dy}{dx} = \\dfrac{2t}{2} = t$' },
            { say: 'At t equals two the gradient is two.', show: '$\\dfrac{dy}{dx} = 2$' }] },
        {
          l: 'e',
          marks: 2,
          q: 'Find $\\dfrac{d^2y}{dx^2}$.',
          answer: '$\\dfrac12$',
          ms: ['M1 $\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\div \\frac{dx}{dt}$', 'A1 $\\frac12$'],
          steps: [
            { say: 'Differentiate d y d x with respect to t, then divide by d x d t.', show: '$\\dfrac{d^2y}{dx^2} = \\dfrac{\\frac{d}{dt}(t)}{dx/dt}$' },
            { say: 'That is one over two.', show: '$\\dfrac{d^2y}{dx^2} = \\dfrac12$' },
            { say: 'The second derivative is a constant, which makes sense because the curve is a parabola.', show: '$\\dfrac{d^2y}{dx^2} = \\tfrac12$ (constant)' }] }] },
    {
      n: 9,
      points: ['m3_istd', 'm3_parts', 'm3_subs'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find $\\displaystyle\\int \\left(e^{2x} + \\frac4x + \\cos 3x\\right)dx$.',
          answer: '$\\tfrac12 e^{2x} + 4\\ln|x| + \\tfrac13\\sin 3x + c$',
          ms: ['B1 $\\frac12 e^{2x}$', 'B1 $4\\ln|x|$', 'B1 $\\frac13\\sin 3x + c$'],
          steps: [
            { say: 'e to the two x integrates to a half e to the two x.', show: '$\\int e^{2x}\\,dx = \\tfrac12 e^{2x}$' },
            { say: 'Four over x integrates to four ln of the modulus of x.', show: '$\\int \\tfrac4x\\,dx = 4\\ln|x|$' },
            { say: 'Cos three x integrates to a third sin three x.', show: '$\\int\\cos 3x\\,dx = \\tfrac13\\sin 3x$' },
            { say: 'Don\'t forget the constant.', show: '$\\tfrac12 e^{2x} + 4\\ln|x| + \\tfrac13\\sin 3x + c$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Use integration by parts to find $\\displaystyle\\int xe^{2x}\\,dx$.',
          answer: '$\\tfrac12 xe^{2x} - \\tfrac14 e^{2x} + c$',
          ms: [
            'M1 $u = x,\\ \\frac{dv}{dx} = e^{2x}$',
            'A1 $\\frac12 xe^{2x} - \\int\\frac12 e^{2x}dx$',
            'M1 integrates second term',
            'A1 $\\frac12 xe^{2x} - \\frac14 e^{2x} + c$'],
          steps: [
            { say: 'Choose u equal to x, because it becomes simpler when differentiated.', show: '$u = x,\\ \\dfrac{dv}{dx} = e^{2x} \\Rightarrow \\dfrac{du}{dx} = 1,\\ v = \\tfrac12 e^{2x}$' },
            { say: 'Apply the formula u v minus the integral of v d u d x.', show: '$\\int xe^{2x}\\,dx = \\tfrac12 xe^{2x} - \\int \\tfrac12 e^{2x}\\,dx$' },
            { say: 'Integrate the remaining term.', show: '$= \\tfrac12 xe^{2x} - \\tfrac14 e^{2x} + c$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Use the substitution $u = x^2 + 1$ to find $\\displaystyle\\int_0^1 x(x^2 + 1)^3\\,dx$.',
          answer: '$\\dfrac{15}{8}$',
          ms: [
            'M1 $du = 2x\\,dx$',
            'M1 changes limits to 1 and 2',
            'M1 $\\frac12\\int u^3\\,du = \\frac{u^4}{8}$',
            'A1 $\\frac{15}8$'],
          steps: [
            { say: 'Differentiate the substitution.', show: '$u = x^2 + 1 \\Rightarrow \\dfrac{du}{dx} = 2x \\Rightarrow x\\,dx = \\tfrac12 du$' },
            { say: 'Change the limits: x equals zero gives u equals one, x equals one gives u equals two.', show: '$x: 0 \\to 1 \\quad\\Rightarrow\\quad u: 1 \\to 2$' },
            { say: 'Rewrite the integral in u.', show: '$\\displaystyle\\int_1^2 \\tfrac12 u^3\\,du = \\left[\\tfrac{u^4}{8}\\right]_1^2$' },
            { say: 'Evaluate: sixteen over eight minus one over eight.', show: '$= \\tfrac{16}{8} - \\tfrac18 = \\tfrac{15}{8}$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find the exact value of $\\displaystyle\\int_0^{\\pi/6}\\cos 3x\\,dx$.',
          answer: '$\\dfrac13$',
          ms: ['M1 $\\left[\\frac13\\sin 3x\\right]$', 'A1 $\\frac13$'],
          steps: [
            { say: 'Recall that the integral of cos k x is one over k sin k x.', show: '$\\int\\cos kx\\,dx = \\tfrac1k\\sin kx$' },
            { say: 'Integrate cos three x.', show: '$\\left[\\tfrac13\\sin 3x\\right]_0^{\\pi/6}$' },
            { say: 'At pi by six, three x is pi by two, and sin of pi by two is one.', show: '$= \\tfrac13\\sin\\tfrac\\pi2 - \\tfrac13\\sin 0 = \\tfrac13$' }] }] },
    {
      n: 10,
      points: ['m3_area2', 'm3_vol'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Find the area of the finite region enclosed by the curves $y = x^2$ and $y = 4x - x^2$.',
          answer: '$\\dfrac83$',
          ms: [
            'M1 equates curves',
            'A1 $x = 0,\\ 2$',
            'M1 $\\int_0^2 (4x - x^2 - x^2)\\,dx$',
            'M1 integrates correctly',
            'A1 $\\frac83$'],
          steps: [
            { say: 'Find where the curves meet.', show: '$x^2 = 4x - x^2 \\Rightarrow 2x^2 - 4x = 0 \\Rightarrow x = 0,\\ 2$' },
            { say: 'Between zero and two, four x minus x squared is on top; check x equals one gives three against one.', show: 'top $-$ bottom $= 4x - 2x^2$' },
            { say: 'Integrate.', show: '$\\displaystyle\\int_0^2 (4x - 2x^2)\\,dx = \\left[2x^2 - \\tfrac23 x^3\\right]_0^2$' },
            { say: 'Substitute.', show: '$= 8 - \\tfrac{16}3 = \\tfrac83$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Find the area of the region bounded by $y = \\sqrt x$, the $x$-axis and the lines $x = 1$ and $x = 4$.',
          answer: '$\\dfrac{14}{3}$',
          ms: ['M1 $\\left[\\frac23 x^{3/2}\\right]_1^4$', 'A1 $\\frac{14}3$'],
          steps: [
            { say: 'Write root x as x to the half and integrate.', show: '$\\displaystyle\\int_1^4 x^{\\frac12}\\,dx = \\left[\\tfrac23 x^{\\frac32}\\right]_1^4$' },
            { say: 'Four to the three halves is eight.', show: '$= \\tfrac23(8 - 1) = \\tfrac{14}3$' },
            { say: 'The area is fourteen thirds, about four point six seven.', show: '$\\tfrac{14}{3} \\approx 4.67$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'The region in part (b) is rotated through $2\\pi$ radians about the $x$-axis. Find the exact volume of the solid formed.',
          answer: '$\\dfrac{15\\pi}{2}$',
          ms: ['M1 $\\pi\\int_1^4 x\\,dx$', 'M1 $\\pi\\left[\\frac{x^2}2\\right]_1^4$', 'A1 $\\frac{15\\pi}2$'],
          steps: [
            { say: 'The volume is pi times the integral of y squared, and y squared is just x.', show: '$V = \\pi\\displaystyle\\int_1^4 (\\sqrt x)^2\\,dx = \\pi\\int_1^4 x\\,dx$' },
            { say: 'Integrate.', show: '$= \\pi\\left[\\tfrac{x^2}{2}\\right]_1^4$' },
            { say: 'Eight minus a half is seven and a half.', show: '$= \\pi(8 - \\tfrac12) = \\tfrac{15\\pi}{2}$' }] }] },
    {
      n: 11,
      points: ['m3_cde', 'm3_sde'],
      q: 'A cup of tea is left to cool. Its temperature above the room temperature is $\\theta$ °C at time $t$ minutes. The rate at which $\\theta$ decreases is proportional to $\\theta$.',
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'Write down a differential equation connecting $\\theta$ and $t$.',
          answer: '$\\dfrac{d\\theta}{dt} = -k\\theta$, $k > 0$',
          ms: ['B1 $\\frac{d\\theta}{dt} = -k\\theta$'],
          steps: [
            { say: 'Theta is the variable and t is time, so the rate of change is d theta by d t.', show: 'rate $= \\dfrac{d\\theta}{dt}$' },
            { say: 'Proportional to theta means equal to a constant times theta.', show: '$\\propto \\theta \\Rightarrow k\\theta$' },
            { say: 'Rate of change of theta is d theta d t. It decreases, so there is a minus sign, and proportional means a constant k.', show: '$\\dfrac{d\\theta}{dt} = -k\\theta, \\quad k > 0$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Initially $\\theta = 60$, and when $t = 10$, $\\theta = 40$. Solve the differential equation to find $\\theta$ in terms of $t$.',
          answer: '$\\theta = 60e^{-kt}$ with $k = \\tfrac1{10}\\ln 1.5 \\approx 0.0405$',
          ms: [
            'M1 separates variables',
            'A1 $\\ln\\theta = -kt + c$',
            'M1 uses $\\theta = 60$ at $t = 0$',
            'M1 uses $\\theta = 40$ at $t = 10$',
            'A1 $\\theta = 60e^{-0.0405t}$'],
          steps: [
            { say: 'Separate the variables.', show: '$\\displaystyle\\int\\frac{1}{\\theta}\\,d\\theta = \\int -k\\,dt$' },
            { say: 'Integrate both sides.', show: '$\\ln\\theta = -kt + c \\Rightarrow \\theta = Ae^{-kt}$' },
            { say: 'At time zero theta is sixty, so A is sixty.', show: '$\\theta = 60e^{-kt}$' },
            { say: 'At time ten theta is forty.', show: '$40 = 60e^{-10k} \\Rightarrow e^{-10k} = \\tfrac23$' },
            { say: 'Take logs.', show: '$k = \\tfrac{1}{10}\\ln\\tfrac32 = 0.0405$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find $\\theta$ when $t = 30$.',
          answer: '$17.8$ °C',
          ms: ['M1 substitutes $t = 30$', 'A1 17.8'],
          steps: [
            { say: 'Since e to the minus ten k is two thirds, e to the minus thirty k is two thirds cubed.', show: '$\\theta = 60\\left(\\tfrac23\\right)^3$' },
            { say: 'That is sixty times eight over twenty seven.', show: '$\\theta = 17.8$ °C' },
            { say: 'So after thirty minutes the tea is about seventeen point eight degrees above room temperature.', show: '$\\theta \\approx 17.8$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find the time taken for $\\theta$ to fall to 20.',
          answer: '$27.1$ minutes',
          ms: ['M1 $e^{-kt} = \\frac13$', 'A1 27.1'],
          steps: [
            { say: 'Set theta equal to twenty.', show: '$60e^{-kt} = 20 \\Rightarrow e^{-kt} = \\tfrac13$' },
            { say: 'Take logs.', show: '$t = \\dfrac{\\ln 3}{k} = \\dfrac{10\\ln 3}{\\ln 1.5}$' },
            { say: 'Evaluate.', show: '$t = 27.1$ minutes' }] },
        {
          l: 'e',
          marks: 1,
          q: 'State one limitation of this model.',
          answer: 'e.g. the room temperature may not stay constant; the model says $\\theta$ never actually reaches 0',
          ms: ['B1 any sensible limitation'],
          steps: [
            { say: 'The model assumes the room stays at a fixed temperature, which may not be true.', show: 'room temperature assumed constant' },
            { say: 'Also, the exponential never reaches zero, but in reality the tea does reach room temperature.', show: '$\\theta \\to 0$ but never equals 0' },
            { say: 'Either limitation earns the mark.', show: 'any one sensible limitation' }] }] },
    {
      n: 12,
      points: ['m3_root', 'm3_iter', 'm3_trap'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Show that the equation $x^3 - 3x - 5 = 0$ has a root between $x = 2$ and $x = 3$.',
          answer: '$f(2) = -3 < 0,\\ f(3) = 13 > 0$; sign change and $f$ continuous',
          ms: ['M1 evaluates $f(2)$ and $f(3)$', 'A1 $-3$ and $13$, sign change, continuous, so root'],
          steps: [
            { say: 'Let f of x be x cubed minus three x minus five and work out f at two and three.', show: '$f(2) = 8 - 6 - 5 = -3$' },
            { say: 'Now at three.', show: '$f(3) = 27 - 9 - 5 = 13$' },
            { say: 'f is continuous and changes sign, so there is a root in between.', show: 'sign change, $f$ continuous $\\Rightarrow$ root in $(2, 3)$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Use the Newton–Raphson method with $x_0 = 2$ to find $x_1$ and $x_2$, giving your answers to 4 decimal places.',
          answer: '$x_1 = 2.3333,\\ x_2 = 2.2806$',
          ms: ['B1 $f\'(x) = 3x^2 - 3$', 'M1 $x_1 = 2 - \\frac{-3}{9}$', 'A1 $x_1 = 2.3333$', 'A1 $x_2 = 2.2806$'],
          steps: [
            { say: 'Differentiate f.', show: '$f\'(x) = 3x^2 - 3$' },
            { say: 'Apply the formula with x nought equal to two.', show: '$x_1 = 2 - \\dfrac{f(2)}{f\'(2)} = 2 - \\dfrac{-3}{9} = 2.3333$' },
            { say: 'Repeat from x one.', show: '$x_2 = 2.3333 - \\dfrac{0.7037}{13.3333}$' },
            { say: 'This gives two point two eight zero six.', show: '$x_2 = 2.2806$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Explain why $x_0 = 1$ would not be a suitable starting value.',
          answer: '$f\'(1) = 0$, so the Newton–Raphson formula would divide by zero (the tangent is horizontal).',
          ms: ['M1 evaluates $f\'(1) = 0$', 'A1 explains division by zero / tangent parallel to $x$-axis'],
          steps: [
            { say: 'Work out the derivative at one.', show: '$f\'(1) = 3 - 3 = 0$' },
            { say: 'The formula divides by f dash, so it would break down.', show: '$x_1 = 1 - \\dfrac{f(1)}{0}$ undefined' },
            { say: 'Geometrically, the tangent is horizontal and never meets the x axis.', show: 'tangent parallel to $x$-axis' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Use the trapezium rule with 4 strips to estimate $\\displaystyle\\int_0^2 \\sqrt{1 + x^3}\\,dx$, giving your answer to 3 decimal places.',
          answer: '$3.283$',
          ms: [
            'B1 $h = 0.5$',
            'B1 ordinates 1, 1.0607, 1.4142, 2.0917, 3',
            'M1 correct trapezium structure',
            'A1 3.283'],
          steps: [
            { say: 'Four strips from zero to two gives a width of one half.', show: '$h = 0.5$' },
            { say: 'Work out the five ordinates.', show: '$y$: $1,\\ 1.0607,\\ 1.4142,\\ 2.0917,\\ 3$' },
            { say: 'Apply the rule: half h times ends plus twice the middles.', show: '$\\tfrac12(0.5)\\big[(1 + 3) + 2(1.0607 + 1.4142 + 2.0917)\\big]$' },
            { say: 'Evaluate.', show: '$= 0.25 \\times 13.1331 = 3.283$' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Given that the curve $y = \\sqrt{1 + x^3}$ is concave upwards for $0 < x < 2$, state whether your answer to (d) is an overestimate or an underestimate.',
          answer: 'Overestimate',
          ms: ['B1 overestimate, because the chords lie above the curve'],
          steps: [
            { say: 'Picture the curve between zero and two.', show: '$y = \\sqrt{1 + x^3}$ concave up' },
            { say: 'When a curve bends upwards, each trapezium\'s top edge lies above the curve.', show: 'chords above curve' },
            { say: 'So the trapezium rule gives too much area.', show: 'overestimate' }] }] }] });

BCSP.add({
  id: 'm3-medium',
  unit: 'm3',
  level: 'medium',
  title: 'Maths A2 1 · Paper B (Medium)',
  minutes: 150,
  calc: true,
  questions: [
    {
      n: 1,
      points: ['m3_func', 'm3_mod', 'm3_trans'],
      q: 'The functions $f$ and $g$ are defined by $f(x) = \\dfrac{2x + 3}{x - 1},\\ x \\in \\mathbb{R},\\ x \\neq 1$ and $g(x) = x^2 - 4,\\ x \\in \\mathbb{R}$.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find $f^{-1}(x)$, stating its domain.',
          answer: '$f^{-1}(x) = \\dfrac{x + 3}{x - 2},\\ x \\neq 2$',
          ms: [
            'M1 $y(x - 1) = 2x + 3$ and collects $x$ terms',
            'A1 $\\frac{x+3}{x-2}$',
            'B1 domain $x \\in \\mathbb{R},\\ x \\neq 2$'],
          steps: [
            { say: 'Write y equals f of x and multiply up.', show: '$y(x - 1) = 2x + 3 \\Rightarrow xy - y = 2x + 3$' },
            { say: 'Collect the x terms on one side.', show: '$xy - 2x = y + 3 \\Rightarrow x(y - 2) = y + 3$' },
            { say: 'Divide, then swap x and y.', show: '$f^{-1}(x) = \\dfrac{x + 3}{x - 2}$' },
            { say: 'The domain of the inverse is the range of f, which excludes two.', show: '$x \\in \\mathbb{R},\\ x \\neq 2$' }] },
        {
          l: 'b',
          marks: 1,
          q: 'State the range of $f$.',
          answer: '$f(x) \\in \\mathbb{R},\\ f(x) \\neq 2$',
          ms: ['B1 $f(x) \\neq 2$'],
          steps: [
            { say: 'Look at the inverse: it is undefined at two.', show: '$f^{-1}$ undefined at $x = 2$' },
            { say: 'Inputs of the inverse are outputs of f, so f never equals two.', show: 'range of $f$ = domain of $f^{-1}$' },
            { say: 'So the range is all reals except two; y equals two is the horizontal asymptote.', show: '$f(x) \\neq 2$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Solve the equation $fg(x) = 3$.',
          answer: '$x = \\pm\\sqrt{10}$',
          ms: [
            'M1 $fg(x) = \\frac{2(x^2-4)+3}{x^2-4-1}$',
            'A1 $\\frac{2x^2-5}{x^2-5}$',
            'M1 sets $= 3$ and solves',
            'A1 $x = \\pm\\sqrt{10}$'],
          steps: [
            { say: 'Apply g first, then f.', show: '$fg(x) = \\dfrac{2(x^2 - 4) + 3}{(x^2 - 4) - 1} = \\dfrac{2x^2 - 5}{x^2 - 5}$' },
            { say: 'Set this equal to three and multiply up.', show: '$2x^2 - 5 = 3x^2 - 15$' },
            { say: 'Collect terms.', show: '$x^2 = 10$' },
            { say: 'Both roots are valid because x squared minus four is not one.', show: '$x = \\pm\\sqrt{10}$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Solve the inequality $|3x + 1| > |x - 3|$.',
          answer: '$x < -2$ or $x > \\tfrac12$',
          ms: [
            'M1 squares both sides',
            'A1 $8x^2 + 12x - 8 > 0$',
            'M1 critical values $-2,\\ \\frac12$',
            'A1 $x < -2$ or $x > \\frac12$'],
          steps: [
            { say: 'Both sides are non-negative, so we can square without changing the inequality.', show: '$(3x + 1)^2 > (x - 3)^2$' },
            { say: 'Expand and collect.', show: '$9x^2 + 6x + 1 > x^2 - 6x + 9 \\Rightarrow 8x^2 + 12x - 8 > 0$' },
            { say: 'Divide by four and factorise.', show: '$2x^2 + 3x - 2 > 0 \\Rightarrow (2x - 1)(x + 2) > 0$' },
            { say: 'A positive quadratic is above zero outside its roots.', show: '$x < -2 \\quad\\text{or}\\quad x > \\tfrac12$' }] },
        {
          l: 'e',
          marks: 2,
          q: 'A curve $y = h(x)$ has a minimum point at $(-1, -3)$. Write down the coordinates of the minimum point on $y = 2h(x - 3) + 1$.',
          answer: '$(2, -5)$',
          ms: ['B1 $x = 2$', 'B1 $y = -5$'],
          steps: [
            { say: 'x minus three inside the function shifts the curve three to the right.', show: '$x: -1 \\to 2$' },
            { say: 'Two h then plus one doubles the y coordinate and adds one.', show: '$y: 2(-3) + 1 = -5$' },
            { say: 'A positive stretch keeps it a minimum.', show: '$(2, -5)$' }] },
        {
          l: 'f',
          marks: 1,
          q: 'Write down the coordinates of the minimum point on $y = h\\!\\left(\\tfrac12 x\\right)$.',
          answer: '$(-2, -3)$',
          ms: ['B1 $(-2, -3)$'],
          steps: [
            { say: 'h of a half x is a stretch parallel to the x axis with scale factor two.', show: 'stretch, factor 2, parallel to $x$-axis' },
            { say: 'So the x coordinate doubles and y is unchanged.', show: '$(-1, -3) \\mapsto (-2, -3)$' },
            { say: 'The minimum is at minus two, minus three.', show: '$(-2, -3)$' }] },
        {
          l: 'g',
          marks: 3,
          q: 'Describe fully a sequence of transformations that maps $y = h(x)$ onto $y = 2h(x - 3) + 1$.',
          answer: 'Translation $\\binom{3}{0}$; stretch parallel to the $y$-axis, scale factor 2; translation $\\binom{0}{1}$',
          ms: [
            'B1 translation 3 units in the positive $x$-direction',
            'B1 stretch parallel to $y$-axis, factor 2',
            'B1 then translation 1 unit up (in correct order after the stretch)'],
          steps: [
            { say: 'First, x minus three is a translation three units to the right.', show: 'translation $\\begin{pmatrix}3\\\\0\\end{pmatrix}$' },
            { say: 'Next, multiplying by two is a stretch parallel to the y axis with scale factor two.', show: 'stretch, $y$-direction, factor 2' },
            { say: 'Finally, adding one is a translation one unit up. It must come after the stretch.', show: 'translation $\\begin{pmatrix}0\\\\1\\end{pmatrix}$' }] }] },
    {
      n: 2,
      points: ['m3_pf', 'm3_ipf'],
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'Express $\\dfrac{5x^2 - 2}{(x + 2)(x - 1)^2}$ in partial fractions.',
          answer: '$\\dfrac{2}{x+2} + \\dfrac{3}{x-1} + \\dfrac{1}{(x-1)^2}$',
          ms: [
            'M1 correct form $\\frac{A}{x+2} + \\frac{B}{x-1} + \\frac{C}{(x-1)^2}$ and identity',
            'A1 $A = 2$',
            'A1 $C = 1$',
            'A1 $B = 3$'],
          steps: [
            { say: 'A repeated factor needs both x minus one and x minus one squared.', show: '$\\dfrac{5x^2 - 2}{(x+2)(x-1)^2} \\equiv \\dfrac{A}{x+2} + \\dfrac{B}{x-1} + \\dfrac{C}{(x-1)^2}$' },
            { say: 'Multiply through.', show: '$5x^2 - 2 \\equiv A(x-1)^2 + B(x+2)(x-1) + C(x+2)$' },
            { say: 'Put x equal to one, then x equal to minus two.', show: '$x = 1:\\ 3 = 3C \\Rightarrow C = 1; \\quad x = -2:\\ 18 = 9A \\Rightarrow A = 2$' },
            { say: 'Compare the x squared coefficients.', show: '$5 = A + B \\Rightarrow B = 3$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Hence show that $\\displaystyle\\int_2^3 \\frac{5x^2 - 2}{(x + 2)(x - 1)^2}\\,dx = \\ln\\frac{25}{2} + \\frac12$.',
          answer: '$\\ln\\dfrac{25}{2} + \\dfrac12 \\approx 3.026$',
          ms: [
            'M1 $\\ln$ terms from the linear factors',
            'M1 $-\\frac{1}{x-1}$ from the squared term',
            'A1 all correct: $2\\ln|x+2| + 3\\ln|x-1| - \\frac1{x-1}$',
            'M1 substitutes limits',
            'A1 correctly combined to $\\ln\\frac{25}2 + \\frac12$'],
          steps: [
            { say: 'Integrate term by term. The squared term integrates using the power rule.', show: '$\\left[2\\ln|x+2| + 3\\ln|x-1| - \\dfrac{1}{x-1}\\right]_2^3$' },
            { say: 'Substitute three.', show: '$2\\ln 5 + 3\\ln 2 - \\tfrac12$' },
            { say: 'Substitute two.', show: '$2\\ln 4 + 3\\ln 1 - 1 = 2\\ln 4 - 1$' },
            { say: 'Subtract.', show: '$2\\ln\\tfrac54 + 3\\ln 2 + \\tfrac12$' },
            { say: 'Combine using log laws: twenty five sixteenths times eight is twenty five halves.', show: '$\\ln\\left(\\tfrac{25}{16}\\times 8\\right) + \\tfrac12 = \\ln\\tfrac{25}{2} + \\tfrac12$' }] }] },
    {
      n: 3,
      points: ['m3_gp', 'm3_ap', 'm3_seq', 'm3_seqmod'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'The second term of a geometric series is 12 and the sum to infinity is 64. Find the two possible values of the common ratio and the corresponding first terms.',
          answer: '$r = \\tfrac14,\\ a = 48$ or $r = \\tfrac34,\\ a = 16$',
          ms: [
            'M1 $ar = 12$ and $\\frac{a}{1-r} = 64$',
            'M1 eliminates $a$',
            'A1 $16r^2 - 16r + 3 = 0$',
            'A1 $r = \\frac14$ or $\\frac34$',
            'A1 $a = 48$ or $16$'],
          steps: [
            { say: 'Write down the two facts.', show: '$ar = 12, \\qquad \\dfrac{a}{1 - r} = 64$' },
            { say: 'Replace a with twelve over r.', show: '$\\dfrac{12}{r(1 - r)} = 64 \\Rightarrow 64r - 64r^2 = 12$' },
            { say: 'Tidy into a quadratic.', show: '$16r^2 - 16r + 3 = 0 \\Rightarrow (4r - 1)(4r - 3) = 0$' },
            { say: 'So r is a quarter or three quarters, both with modulus less than one.', show: '$r = \\tfrac14 \\ \\text{or}\\ \\tfrac34$' },
            { say: 'Find a from a equals twelve over r.', show: '$a = 48 \\ \\text{or}\\ a = 16$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'For the series with $r = \\tfrac34$, find the least number of terms for which the sum exceeds 60.',
          answer: '$n = 10$',
          ms: [
            'M1 $64\\left(1 - 0.75^n\\right) > 60$',
            'M1 $0.75^n < \\frac1{16}$ and uses logs',
            'A1 $n > 9.64$',
            'A1 $n = 10$'],
          steps: [
            { say: 'The sum to n terms is sixty four times one minus three quarters to the n.', show: '$S_n = \\dfrac{16(1 - 0.75^n)}{0.25} = 64(1 - 0.75^n)$' },
            { say: 'Set it greater than sixty.', show: '$1 - 0.75^n > \\tfrac{60}{64} \\Rightarrow 0.75^n < \\tfrac1{16}$' },
            { say: 'Take logs. Dividing by log of zero point seven five, which is negative, flips the inequality.', show: '$n > \\dfrac{\\ln(1/16)}{\\ln 0.75} = 9.64$' },
            { say: 'So the least n is ten. Check: S nine is fifty nine point two and S ten is sixty point four.', show: '$n = 10$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Evaluate $\\displaystyle\\sum_{r=1}^{30}(5r - 2)$.',
          answer: '$2265$',
          ms: ['M1 recognises AP with $a = 3,\\ d = 5$', 'M1 $\\frac{30}{2}(3 + 148)$', 'A1 2265'],
          steps: [
            { say: 'Put r equal to one, two and so on: three, eight, thirteen. It is arithmetic with difference five.', show: '$3 + 8 + 13 + \\cdots$' },
            { say: 'The last term is when r is thirty.', show: '$5(30) - 2 = 148$' },
            { say: 'Use n over two times first plus last.', show: '$S = \\tfrac{30}{2}(3 + 148) = 15 \\times 151 = 2265$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Sam saves £50 in the first month and increases the amount saved by £8 each month. Find the month in which Sam\'s total savings first exceed £3000.',
          answer: 'The 23rd month',
          ms: ['M1 $S_n = \\frac n2[100 + 8(n-1)]$', 'A1 $4n^2 + 46n > 3000$', 'M1 solves quadratic', 'A1 23rd month'],
          steps: [
            { say: 'This is an arithmetic series with first term fifty and difference eight.', show: '$S_n = \\tfrac n2\\big[2(50) + 8(n - 1)\\big] = 4n^2 + 46n$' },
            { say: 'We need this to exceed three thousand.', show: '$4n^2 + 46n - 3000 > 0$' },
            { say: 'Solve the quadratic equation for the critical value.', show: '$n = \\dfrac{-46 + \\sqrt{46^2 + 48000}}{8} = 22.2$' },
            { say: 'Check: after twenty two months it is two thousand nine hundred and forty eight, after twenty three it is three thousand one hundred and seventy four.', show: '$S_{22} = 2948,\\ S_{23} = 3174 \\Rightarrow$ month 23' }] }] },
    {
      n: 4,
      points: ['m3_binr'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Find the binomial expansion of $(4 - x)^{-\\frac12}$ in ascending powers of $x$ up to and including the term in $x^2$, and state the range of values of $x$ for which it is valid.',
          answer: '$\\tfrac12 + \\tfrac{1}{16}x + \\tfrac{3}{256}x^2$, valid for $|x| < 4$',
          ms: [
            'M1 takes out $4^{-\\frac12} = \\frac12$',
            'M1 binomial with $n = -\\frac12$ and $-\\frac x4$',
            'A1 $\\frac12 + \\frac1{16}x$',
            'A1 $\\frac3{256}x^2$',
            'B1 $|x| < 4$'],
          steps: [
            { say: 'Take out a factor of four so the bracket starts with one.', show: '$(4 - x)^{-\\frac12} = 4^{-\\frac12}\\left(1 - \\tfrac x4\\right)^{-\\frac12} = \\tfrac12\\left(1 - \\tfrac x4\\right)^{-\\frac12}$' },
            { say: 'Expand with n equal to minus a half.', show: '$\\left(1 - \\tfrac x4\\right)^{-\\frac12} = 1 + \\left(-\\tfrac12\\right)\\left(-\\tfrac x4\\right) + \\dfrac{(-\\frac12)(-\\frac32)}{2}\\left(-\\tfrac x4\\right)^2$' },
            { say: 'Simplify.', show: '$= 1 + \\tfrac x8 + \\tfrac{3x^2}{128}$' },
            { say: 'Multiply by a half.', show: '$\\tfrac12 + \\tfrac{x}{16} + \\tfrac{3x^2}{256}$' },
            { say: 'Valid when x over four has modulus less than one.', show: '$|x| < 4$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Hence find the expansion of $\\dfrac{1 + 2x}{\\sqrt{4 - x}}$ up to and including the term in $x^2$.',
          answer: '$\\tfrac12 + \\tfrac{17}{16}x + \\tfrac{35}{256}x^2$',
          ms: ['M1 multiplies $(1 + 2x)$ by their expansion', 'A1 $\\frac{17}{16}x$', 'A1 $\\frac{35}{256}x^2$'],
          steps: [
            { say: 'Dividing by root four minus x is the same as multiplying by our expansion.', show: '$(1 + 2x)\\left(\\tfrac12 + \\tfrac{x}{16} + \\tfrac{3x^2}{256}\\right)$' },
            { say: 'Collect the x terms: one sixteenth plus one.', show: '$x:\\ \\tfrac1{16} + 1 = \\tfrac{17}{16}$' },
            { say: 'Collect the x squared terms: three over two five six plus two sixteenths.', show: '$x^2:\\ \\tfrac{3}{256} + \\tfrac{32}{256} = \\tfrac{35}{256}$' },
            { say: 'Write the answer.', show: '$\\tfrac12 + \\tfrac{17}{16}x + \\tfrac{35}{256}x^2$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Use your answer to (a) with $x = 0.04$ to find an approximation for $\\dfrac{1}{\\sqrt{3.96}}$, giving your answer to 6 decimal places.',
          answer: '$0.502519$',
          ms: ['M1 substitutes $x = 0.04$', 'A1 0.502519'],
          steps: [
            { say: 'Four minus x is three point nine six when x is zero point zero four, which is well inside the valid range.', show: '$x = 0.04$' },
            { say: 'Substitute.', show: '$0.5 + \\tfrac{0.04}{16} + \\tfrac{3(0.0016)}{256} = 0.5 + 0.0025 + 0.00001875$' },
            { say: 'Round to six decimal places.', show: '$\\approx 0.502519$' }] }] },
    {
      n: 5,
      points: ['m3_tid', 'm3_comp'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Solve $\\cos 2x + 3\\sin x = 2$ for $0 \\leq x \\leq 2\\pi$, giving exact answers.',
          answer: '$x = \\dfrac{\\pi}{6},\\ \\dfrac{\\pi}{2},\\ \\dfrac{5\\pi}{6}$',
          ms: [
            'M1 uses $\\cos 2x = 1 - 2\\sin^2 x$',
            'A1 $2\\sin^2 x - 3\\sin x + 1 = 0$',
            'M1 solves: $\\sin x = 1$ or $\\frac12$',
            'A1 $\\frac\\pi2$',
            'A1 $\\frac\\pi6,\\ \\frac{5\\pi}6$'],
          steps: [
            { say: 'Use the version of cos two x that only contains sine.', show: '$1 - 2\\sin^2 x + 3\\sin x = 2$' },
            { say: 'Rearrange into a quadratic in sin x.', show: '$2\\sin^2 x - 3\\sin x + 1 = 0$' },
            { say: 'Factorise.', show: '$(2\\sin x - 1)(\\sin x - 1) = 0$' },
            { say: 'Sin x equals one gives pi over two.', show: '$\\sin x = 1 \\Rightarrow x = \\tfrac\\pi2$' },
            { say: 'Sin x equals a half gives pi over six and five pi over six.', show: '$\\sin x = \\tfrac12 \\Rightarrow x = \\tfrac\\pi6,\\ \\tfrac{5\\pi}6$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Solve $\\tan^2\\theta = 3\\sec\\theta - 3$ for $0^\\circ \\leq \\theta \\leq 360^\\circ$.',
          answer: '$\\theta = 0^\\circ,\\ 60^\\circ,\\ 300^\\circ,\\ 360^\\circ$',
          ms: [
            'M1 uses $\\tan^2\\theta = \\sec^2\\theta - 1$',
            'A1 $\\sec^2\\theta - 3\\sec\\theta + 2 = 0$',
            'M1 $\\sec\\theta = 1$ or $2$',
            'A1 $0^\\circ, 360^\\circ$',
            'A1 $60^\\circ, 300^\\circ$'],
          steps: [
            { say: 'Replace tan squared with sec squared minus one.', show: '$\\sec^2\\theta - 1 = 3\\sec\\theta - 3$' },
            { say: 'Rearrange and factorise.', show: '$\\sec^2\\theta - 3\\sec\\theta + 2 = 0 \\Rightarrow (\\sec\\theta - 1)(\\sec\\theta - 2) = 0$' },
            { say: 'Convert to cosine.', show: '$\\cos\\theta = 1 \\ \\text{or}\\ \\cos\\theta = \\tfrac12$' },
            { say: 'Cos theta equals one at nought and three sixty degrees.', show: '$\\theta = 0^\\circ,\\ 360^\\circ$' },
            { say: 'Cos theta equals a half at sixty and three hundred degrees.', show: '$\\theta = 60^\\circ,\\ 300^\\circ$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Using $75^\\circ = 45^\\circ + 30^\\circ$, find the exact value of $\\tan 75^\\circ$ in the form $a + \\sqrt b$.',
          answer: '$2 + \\sqrt3$',
          ms: [
            'M1 $\\frac{\\tan 45^\\circ + \\tan 30^\\circ}{1 - \\tan 45^\\circ\\tan 30^\\circ}$',
            'M1 rationalises denominator',
            'A1 $2 + \\sqrt3$'],
          steps: [
            { say: 'Use the tan of a sum formula.', show: '$\\tan 75^\\circ = \\dfrac{1 + \\frac{1}{\\sqrt3}}{1 - \\frac1{\\sqrt3}}$' },
            { say: 'Multiply top and bottom by root three.', show: '$= \\dfrac{\\sqrt3 + 1}{\\sqrt3 - 1}$' },
            { say: 'Rationalise by multiplying by root three plus one.', show: '$= \\dfrac{(\\sqrt3 + 1)^2}{3 - 1} = \\dfrac{4 + 2\\sqrt3}{2}$' },
            { say: 'Simplify.', show: '$\\tan 75^\\circ = 2 + \\sqrt3$' }] }] },
    {
      n: 6,
      points: ['m3_rform', 'm_rad'],
      q: 'The depth of water, $h$ metres, at a harbour entrance $t$ hours after midnight is modelled by $h = 5 + 1.2\\cos(0.5t) + 1.6\\sin(0.5t)$, where $0.5t$ is in radians.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Express $1.2\\cos(0.5t) + 1.6\\sin(0.5t)$ in the form $R\\cos(0.5t - \\alpha)$, where $R > 0$ and $0 < \\alpha < \\frac{\\pi}{2}$.',
          answer: '$2\\cos(0.5t - 0.927)$',
          ms: ['M1 $R\\cos\\alpha = 1.2,\\ R\\sin\\alpha = 1.6$', 'A1 $R = 2$', 'A1 $\\alpha = 0.927$'],
          steps: [
            { say: 'Expand and compare coefficients.', show: '$R\\cos\\alpha = 1.2, \\quad R\\sin\\alpha = 1.6$' },
            { say: 'Square and add.', show: '$R = \\sqrt{1.2^2 + 1.6^2} = 2$' },
            { say: 'Divide.', show: '$\\tan\\alpha = \\tfrac{1.6}{1.2} = \\tfrac43 \\Rightarrow \\alpha = 0.927$ rad' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Find the maximum depth of water and the time at which it first occurs.',
          answer: '7 m at $t = 1.85$ hours (about 01:51)',
          ms: ['B1 7 m', 'M1 $0.5t - 0.927 = 0$', 'A1 $t = 1.85$'],
          steps: [
            { say: 'The cosine is at most one, so the depth is at most five plus two.', show: '$h_{\\max} = 5 + 2 = 7$ m' },
            { say: 'This happens when the angle is zero.', show: '$0.5t - 0.927 = 0$' },
            { say: 'So t is one point eight five hours, about one fifty one in the morning.', show: '$t = 1.85$ h' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Find all times in the first 14 hours when the depth is 6 m.',
          answer: '$t = 3.95$ h and $t = 12.33$ h',
          ms: [
            'M1 $\\cos(0.5t - 0.927) = 0.5$',
            'M1 $0.5t - 0.927 = \\frac\\pi3$ or $\\frac{5\\pi}3$',
            'A1 3.95',
            'A1 12.33'],
          steps: [
            { say: 'Set the depth equal to six.', show: '$5 + 2\\cos(0.5t - 0.927) = 6 \\Rightarrow \\cos(0.5t - 0.927) = 0.5$' },
            { say: 'For t from nought to fourteen, the angle runs from minus zero point nine two seven to six point zero seven three.', show: '$-0.927 \\leq 0.5t - 0.927 \\leq 6.073$' },
            { say: 'In that interval, cosine is a half at pi over three and five pi over three.', show: '$0.5t - 0.927 = 1.047 \\ \\text{or}\\ 5.236$' },
            { say: 'Solve for t.', show: '$t = 3.95 \\ \\text{or}\\ t = 12.33$' }] },
        {
          l: 'd',
          marks: 1,
          q: 'Give one reason why this model may not be reliable.',
          answer: 'e.g. weather (wind, storms) affects the tide; tidal period and range vary over the month',
          ms: ['B1 any sensible reason'],
          steps: [
            { say: 'The model is perfectly periodic.', show: 'same pattern every $4\\pi$ hours' },
            { say: 'Real tides change with the moon\'s phase and with weather.', show: 'spring/neap tides, wind, pressure' },
            { say: 'Any one sensible reason gets the mark.', show: 'B1' }] }] },
    {
      n: 7,
      points: ['m3_dstd', 'm3_rules'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Differentiate $y = x^3\\ln(2x)$.',
          answer: '$3x^2\\ln(2x) + x^2$',
          ms: ['M1 product rule', 'A1 $3x^2\\ln 2x + x^2$'],
          steps: [
            { say: 'Use the product rule.', show: '$u = x^3,\\ v = \\ln 2x$' },
            { say: 'The derivative of ln two x is one over x.', show: '$u\' = 3x^2,\\ v\' = \\tfrac1x$' },
            { say: 'Combine.', show: '$\\dfrac{dy}{dx} = 3x^2\\ln 2x + x^3\\cdot\\tfrac1x = 3x^2\\ln 2x + x^2$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Given $y = \\dfrac{\\sin 2x}{1 + \\cos 2x}$, use the quotient rule to show that $\\dfrac{dy}{dx} = \\sec^2 x$.',
          answer: '$\\dfrac{dy}{dx} = \\dfrac{2}{1 + \\cos 2x} = \\sec^2 x$',
          ms: [
            'M1 quotient rule',
            'A1 numerator simplifies to $2\\cos 2x + 2$',
            'A1 uses $1 + \\cos 2x = 2\\cos^2 x$ to reach $\\sec^2 x$'],
          steps: [
            { say: 'Apply the quotient rule.', show: '$\\dfrac{dy}{dx} = \\dfrac{2\\cos 2x(1 + \\cos 2x) - \\sin 2x(-2\\sin 2x)}{(1 + \\cos 2x)^2}$' },
            { say: 'The numerator is two cos two x plus two cos squared plus two sin squared, which is two cos two x plus two.', show: '$= \\dfrac{2(1 + \\cos 2x)}{(1 + \\cos 2x)^2} = \\dfrac{2}{1 + \\cos 2x}$' },
            { say: 'One plus cos two x is two cos squared x.', show: '$= \\dfrac{2}{2\\cos^2 x} = \\sec^2 x$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Find the $x$-coordinate of the stationary point on the curve $y = e^{2x}\\cos x$ for $0 < x < \\pi$, giving your answer to 3 decimal places.',
          answer: '$x = 1.107$',
          ms: ['M1 product rule', 'A1 $e^{2x}(2\\cos x - \\sin x)$', 'M1 $\\tan x = 2$', 'A1 1.107'],
          steps: [
            { say: 'Use the product rule.', show: '$\\dfrac{dy}{dx} = 2e^{2x}\\cos x - e^{2x}\\sin x = e^{2x}(2\\cos x - \\sin x)$' },
            { say: 'e to the two x is never zero, so the bracket must be zero.', show: '$2\\cos x = \\sin x$' },
            { say: 'Divide by cos x.', show: '$\\tan x = 2$' },
            { say: 'The only solution between nought and pi is arctan two.', show: '$x = 1.107$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Differentiate $y = \\cot(x^2)$.',
          answer: '$-2x\\operatorname{cosec}^2(x^2)$',
          ms: [
            'M1 $-\\operatorname{cosec}^2(x^2) \\times$ derivative of inside',
            'A1 $-2x\\operatorname{cosec}^2(x^2)$'],
          steps: [
            { say: 'The derivative of cot u is minus cosec squared u.', show: '$\\dfrac{d}{du}\\cot u = -\\operatorname{cosec}^2 u$' },
            { say: 'The inside is x squared, with derivative two x.', show: '$u = x^2,\\ u\' = 2x$' },
            { say: 'Chain rule.', show: '$\\dfrac{dy}{dx} = -2x\\operatorname{cosec}^2(x^2)$' }] },
        {
          l: 'e',
          marks: 2,
          q: 'Find the exact gradient of $y = \\sec x$ at $x = \\dfrac{\\pi}{3}$.',
          answer: '$2\\sqrt3$',
          ms: ['M1 $\\sec x\\tan x$', 'A1 $2\\sqrt3$'],
          steps: [
            { say: 'The derivative of sec x is sec x tan x.', show: '$\\dfrac{dy}{dx} = \\sec x\\tan x$' },
            { say: 'At pi over three, sec is two and tan is root three.', show: '$\\sec\\tfrac\\pi3 = 2,\\ \\tan\\tfrac\\pi3 = \\sqrt3$' },
            { say: 'Multiply.', show: '$\\dfrac{dy}{dx} = 2\\sqrt3$' }] }] },
    {
      n: 8,
      points: ['m3_param', 'm3_impl'],
      q: 'A curve $C$ has parametric equations $x = 1 + \\ln t,\\ y = t^2,\\ t > 0$.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Find a Cartesian equation for $C$.',
          answer: '$y = e^{2x - 2}$',
          ms: ['M1 $t = e^{x-1}$', 'A1 $y = e^{2x-2}$'],
          steps: [
            { say: 'Make t the subject of the x equation.', show: '$\\ln t = x - 1 \\Rightarrow t = e^{x-1}$' },
            { say: 'Square it to get y.', show: '$y = \\left(e^{x-1}\\right)^2$' },
            { say: 'Simplify.', show: '$y = e^{2x - 2}$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Find the equation of the normal to $C$ at the point where $t = 1$.',
          answer: '$x + 2y = 3$',
          ms: [
            'M1 $\\frac{dy/dt}{dx/dt}$',
            'A1 $\\frac{dy}{dx} = 2t^2$',
            'B1 point $(1, 1)$',
            'M1 normal gradient $-\\frac12$',
            'A1 $x + 2y = 3$'],
          steps: [
            { say: 'Differentiate with respect to t.', show: '$\\dfrac{dx}{dt} = \\dfrac1t, \\quad \\dfrac{dy}{dt} = 2t$' },
            { say: 'Divide.', show: '$\\dfrac{dy}{dx} = \\dfrac{2t}{1/t} = 2t^2$' },
            { say: 'At t equals one the point is one, one and the gradient is two.', show: '$(1, 1),\\ m = 2$' },
            { say: 'The normal has gradient minus a half.', show: '$y - 1 = -\\tfrac12(x - 1)$' },
            { say: 'Rearrange.', show: '$x + 2y = 3$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find $\\dfrac{d^2y}{dx^2}$ in terms of $t$, and hence state whether $C$ is concave upwards or downwards.',
          answer: '$\\dfrac{d^2y}{dx^2} = 4t^2 > 0$, so concave upwards',
          ms: ['M1 $\\frac{d}{dt}(2t^2) \\div \\frac{dx}{dt}$', 'A1 $4t^2$', 'B1 positive so concave upwards'],
          steps: [
            { say: 'Differentiate d y d x with respect to t and divide by d x d t.', show: '$\\dfrac{d^2y}{dx^2} = \\dfrac{4t}{1/t}$' },
            { say: 'Simplify.', show: '$= 4t^2$' },
            { say: 'This is positive for every t, so the curve is concave upwards everywhere.', show: '$4t^2 > 0 \\Rightarrow$ concave up' }] },
        {
          l: 'd',
          marks: 4,
          q: 'A different curve has equation $x^3 + y^3 = 6xy$. Find the gradient of this curve at the point $(3, 3)$.',
          answer: '$-1$',
          ms: [
            'M1 implicit differentiation of $y^3$',
            'M1 product rule on $6xy$',
            'A1 $\\frac{dy}{dx} = \\frac{2y - x^2}{y^2 - 2x}$',
            'A1 $-1$'],
          steps: [
            { say: 'Differentiate each term with respect to x.', show: '$3x^2 + 3y^2\\dfrac{dy}{dx} = 6y + 6x\\dfrac{dy}{dx}$' },
            { say: 'Collect d y d x terms and divide by three.', show: '$\\dfrac{dy}{dx}(y^2 - 2x) = 2y - x^2$' },
            { say: 'Make it the subject.', show: '$\\dfrac{dy}{dx} = \\dfrac{2y - x^2}{y^2 - 2x}$' },
            { say: 'Substitute three, three.', show: '$\\dfrac{6 - 9}{9 - 6} = -1$' }] }] },
    {
      n: 9,
      points: ['m3_parts', 'm3_subs', 'm3_istd'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Use integration by parts to find the exact value of $\\displaystyle\\int_1^e x^2\\ln x\\,dx$.',
          answer: '$\\dfrac{2e^3 + 1}{9}$',
          ms: [
            'M1 $u = \\ln x,\\ \\frac{dv}{dx} = x^2$',
            'A1 $\\frac{x^3}{3}\\ln x - \\int\\frac{x^2}{3}dx$',
            'A1 $\\frac{x^3}3\\ln x - \\frac{x^3}9$',
            'M1 limits',
            'A1 $\\frac{2e^3+1}9$'],
          steps: [
            { say: 'Choose u equal to ln x, because we cannot easily integrate ln x.', show: '$u = \\ln x,\\ \\dfrac{dv}{dx} = x^2 \\Rightarrow \\dfrac{du}{dx} = \\dfrac1x,\\ v = \\dfrac{x^3}{3}$' },
            { say: 'Apply the formula.', show: '$\\displaystyle\\int x^2\\ln x\\,dx = \\frac{x^3}{3}\\ln x - \\int\\frac{x^2}{3}\\,dx$' },
            { say: 'Integrate the remaining term.', show: '$= \\dfrac{x^3}{3}\\ln x - \\dfrac{x^3}{9}$' },
            { say: 'Substitute e and one; ln e is one and ln one is zero.', show: '$\\left(\\dfrac{e^3}3 - \\dfrac{e^3}9\\right) - \\left(0 - \\dfrac19\\right)$' },
            { say: 'Simplify.', show: '$= \\dfrac{2e^3}{9} + \\dfrac19 = \\dfrac{2e^3 + 1}{9}$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Use the substitution $u = \\cos x$ to find $\\displaystyle\\int_0^{\\pi/2}\\sin x\\cos^3 x\\,dx$.',
          answer: '$\\dfrac14$',
          ms: ['M1 $du = -\\sin x\\,dx$', 'M1 limits $1 \\to 0$', 'M1 $\\int_0^1 u^3\\,du$', 'A1 $\\frac14$'],
          steps: [
            { say: 'Differentiate the substitution.', show: '$u = \\cos x \\Rightarrow du = -\\sin x\\,dx$' },
            { say: 'Change the limits: nought becomes one, pi over two becomes nought.', show: '$x: 0 \\to \\tfrac\\pi2 \\Rightarrow u: 1 \\to 0$' },
            { say: 'The minus sign flips the limits back.', show: '$\\displaystyle\\int_1^0 -u^3\\,du = \\int_0^1 u^3\\,du$' },
            { say: 'Integrate.', show: '$\\left[\\tfrac{u^4}{4}\\right]_0^1 = \\tfrac14$' }] },
        {
          l: 'c',
          marks: 2,
          q: 'Find the exact value of $\\displaystyle\\int_0^1 \\frac{2x + 3}{x^2 + 3x + 2}\\,dx$.',
          answer: '$\\ln 3$',
          ms: ['M1 recognises $\\frac{f\'(x)}{f(x)}$: $\\ln|x^2 + 3x + 2|$', 'A1 $\\ln 3$'],
          steps: [
            { say: 'The numerator is the derivative of the denominator.', show: '$\\dfrac{d}{dx}(x^2 + 3x + 2) = 2x + 3$' },
            { say: 'So the integral is the log of the denominator.', show: '$\\big[\\ln|x^2 + 3x + 2|\\big]_0^1$' },
            { say: 'Evaluate.', show: '$\\ln 6 - \\ln 2 = \\ln 3$' }] }] },
    {
      n: 10,
      points: ['m3_area2', 'm3_vol'],
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'The curves $y = e^x$ and $y = 3 - 2e^{-x}$ intersect at two points. Find the exact area of the finite region enclosed between them.',
          answer: '$3\\ln 2 - 2$',
          ms: [
            'M1 forms $e^{2x} - 3e^x + 2 = 0$',
            'A1 $x = 0,\\ \\ln 2$',
            'M1 $\\int (3 - 2e^{-x} - e^x)\\,dx$',
            'A1 $3x + 2e^{-x} - e^x$',
            'M1 limits',
            'A1 $3\\ln 2 - 2$'],
          steps: [
            { say: 'Set the curves equal and multiply by e to the x.', show: '$e^x = 3 - 2e^{-x} \\Rightarrow e^{2x} - 3e^x + 2 = 0$' },
            { say: 'This is a quadratic in e to the x.', show: '$(e^x - 1)(e^x - 2) = 0 \\Rightarrow x = 0,\\ \\ln 2$' },
            { say: 'Between these, three minus two e to the minus x is on top.', show: '$A = \\displaystyle\\int_0^{\\ln 2}(3 - 2e^{-x} - e^x)\\,dx$' },
            { say: 'Integrate.', show: '$= \\big[3x + 2e^{-x} - e^x\\big]_0^{\\ln 2}$' },
            { say: 'At ln two, e to the minus x is a half and e to the x is two.', show: '$= (3\\ln 2 + 1 - 2) - (0 + 2 - 1) = 3\\ln 2 - 2$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'The region bounded by $y = \\sec x$, the axes and the line $x = \\frac\\pi4$ is rotated through $2\\pi$ about the $x$-axis. Find the exact volume generated.',
          answer: '$\\pi$',
          ms: ['M1 $\\pi\\int\\sec^2 x\\,dx$', 'M1 $\\pi[\\tan x]$', 'A1 $\\pi$'],
          steps: [
            { say: 'Volume is pi times the integral of y squared.', show: '$V = \\pi\\displaystyle\\int_0^{\\pi/4}\\sec^2 x\\,dx$' },
            { say: 'Sec squared integrates to tan.', show: '$= \\pi\\big[\\tan x\\big]_0^{\\pi/4}$' },
            { say: 'Tan of pi over four is one.', show: '$V = \\pi(1 - 0) = \\pi$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the exact volume generated when the region bounded by $y = \\dfrac{2}{x + 1}$, the axes and $x = 3$ is rotated through $2\\pi$ about the $x$-axis.',
          answer: '$3\\pi$',
          ms: ['M1 $\\pi\\int_0^3 \\frac{4}{(x+1)^2}dx$', 'A1 $\\pi\\left[-\\frac{4}{x+1}\\right]_0^3$', 'A1 $3\\pi$'],
          steps: [
            { say: 'Square y.', show: '$y^2 = \\dfrac{4}{(x + 1)^2}$' },
            { say: 'Integrate using the power rule.', show: '$V = \\pi\\left[-\\dfrac{4}{x + 1}\\right]_0^3$' },
            { say: 'Evaluate.', show: '$= \\pi(-1 + 4) = 3\\pi$' }] }] },
    {
      n: 11,
      points: ['m3_cde', 'm3_sde'],
      q: 'Water leaks from a tank. At time $t$ hours the volume of water is $V$ m³. The rate at which $V$ decreases is proportional to $\\sqrt V$.',
      parts: [
        {
          l: 'a',
          marks: 1,
          q: 'Write down a differential equation for $V$.',
          answer: '$\\dfrac{dV}{dt} = -k\\sqrt V$',
          ms: ['B1 $\\frac{dV}{dt} = -k\\sqrt V$'],
          steps: [
            { say: 'The rate of change of volume is d V by d t.', show: '$\\dfrac{dV}{dt}$' },
            { say: 'It decreases, so we need a minus sign, with a positive constant k.', show: '$-k$' },
            { say: 'Proportional to root V.', show: '$\\dfrac{dV}{dt} = -k\\sqrt V$' }] },
        {
          l: 'b',
          marks: 6,
          q: 'Initially $V = 100$, and $V = 64$ when $t = 2$. Solve the differential equation to show that $V = (10 - t)^2$.',
          answer: '$V = (10 - t)^2$',
          ms: [
            'M1 separates variables',
            'A1 $2\\sqrt V = -kt + c$',
            'M1 uses $t = 0,\\ V = 100$',
            'A1 $c = 20$',
            'M1 uses $t = 2,\\ V = 64$',
            'A1 $k = 2$ and $V = (10 - t)^2$'],
          steps: [
            { say: 'Separate the variables.', show: '$\\displaystyle\\int V^{-\\frac12}\\,dV = \\int -k\\,dt$' },
            { say: 'Integrate.', show: '$2\\sqrt V = -kt + c$' },
            { say: 'At t equals nought, root V is ten.', show: '$20 = c$' },
            { say: 'At t equals two, root V is eight.', show: '$16 = -2k + 20 \\Rightarrow k = 2$' },
            { say: 'So root V is ten minus t.', show: '$2\\sqrt V = 20 - 2t \\Rightarrow V = (10 - t)^2$' }] },
        {
          l: 'c',
          marks: 1,
          q: 'Find how long it takes for the tank to empty.',
          answer: '10 hours',
          ms: ['B1 10 hours'],
          steps: [
            { say: 'The tank is empty when V is zero.', show: '$(10 - t)^2 = 0$' },
            { say: 'So t is ten.', show: '$t = 10$' },
            { say: 'It takes ten hours.', show: '10 hours' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find the volume of water after 4 hours and the rate at which it is leaking at that time.',
          answer: '$36$ m³, leaking at $12$ m³ per hour',
          ms: ['B1 36', 'B1 12 m³/h'],
          steps: [
            { say: 'Substitute t equals four.', show: '$V = (10 - 4)^2 = 36$' },
            { say: 'Use the differential equation with k equals two.', show: '$\\dfrac{dV}{dt} = -2\\sqrt{36} = -12$' },
            { say: 'So it is leaking at twelve cubic metres per hour.', show: '12 m³ per hour' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Explain why the formula $V = (10 - t)^2$ is not valid for $t > 10$.',
          answer: 'For $t > 10$ the formula gives $V > 0$ (increasing), but the tank is empty and stays empty',
          ms: ['B1 explanation'],
          steps: [
            { say: 'After ten hours the formula would make V grow again.', show: '$t = 12 \\Rightarrow V = 4$' },
            { say: 'But once empty the tank cannot refill itself.', show: '$V = 0$ for $t \\ge 10$' },
            { say: 'So the model only applies for t up to ten.', show: '$0 \\le t \\le 10$' }] }] },
    {
      n: 12,
      points: ['m3_root', 'm3_iter', 'm3_trap'],
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Show that the equation $e^x - 3x - 1 = 0$ has a root $\\alpha$ between $x = 1$ and $x = 2$.',
          answer: '$f(1) = -1.28,\\ f(2) = 0.389$: sign change, $f$ continuous',
          ms: ['M1 evaluates $f(1)$ and $f(2)$', 'A1 values, sign change and conclusion'],
          steps: [
            { say: 'Let f of x be e to the x minus three x minus one.', show: '$f(1) = e - 4 = -1.28$' },
            { say: 'Now at two.', show: '$f(2) = e^2 - 7 = 0.389$' },
            { say: 'f is continuous and changes sign, so there is a root between one and two.', show: 'sign change $\\Rightarrow 1 < \\alpha < 2$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Use the Newton–Raphson method with $x_0 = 2$ to find $x_1$, $x_2$ and $x_3$, giving your answers to 4 decimal places. Hence state $\\alpha$ to 3 decimal places.',
          answer: '$x_1 = 1.9114,\\ x_2 = 1.9039,\\ x_3 = 1.9038$; $\\alpha = 1.904$',
          ms: [
            'B1 $f\'(x) = e^x - 3$',
            'M1 correct use of formula',
            'A1 $x_1 = 1.9114,\\ x_2 = 1.9039,\\ x_3 = 1.9038$',
            'A1 $\\alpha = 1.904$'],
          steps: [
            { say: 'Differentiate.', show: '$f\'(x) = e^x - 3$' },
            { say: 'First iteration.', show: '$x_1 = 2 - \\dfrac{e^2 - 7}{e^2 - 3} = 1.9114$' },
            { say: 'Repeat.', show: '$x_2 = 1.9039, \\quad x_3 = 1.9038$' },
            { say: 'The iterates agree to three decimal places.', show: '$\\alpha = 1.904$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Use the trapezium rule with 4 strips to estimate $\\displaystyle\\int_1^2 \\ln(1 + x^2)\\,dx$, giving your answer to 3 decimal places.',
          answer: '$1.168$',
          ms: [
            'B1 $h = 0.25$',
            'B1 ordinates 0.6931, 0.9410, 1.1787, 1.4018, 1.6094',
            'M1 trapezium structure',
            'A1 1.168'],
          steps: [
            { say: 'The strip width is a quarter.', show: '$h = 0.25$' },
            { say: 'Work out the five ordinates.', show: '$0.6931,\\ 0.9410,\\ 1.1787,\\ 1.4018,\\ 1.6094$' },
            { say: 'Apply the rule.', show: '$\\tfrac12(0.25)\\big[(0.6931 + 1.6094) + 2(0.9410 + 1.1787 + 1.4018)\\big]$' },
            { say: 'Evaluate.', show: '$= 0.125 \\times 9.3455 = 1.168$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Given that $\\dfrac{d^2}{dx^2}\\ln(1 + x^2) = \\dfrac{2(1 - x^2)}{(1 + x^2)^2}$, state with a reason whether your answer to (c) is an overestimate or an underestimate.',
          answer: 'Underestimate: the second derivative is negative on $1 < x < 2$, so the curve is concave down and the chords lie below it',
          ms: ['M1 second derivative negative for $1 < x < 2$ (curve concave down)', 'A1 underestimate'],
          steps: [
            { say: 'For x between one and two, one minus x squared is negative.', show: '$1 - x^2 < 0$' },
            { say: 'So the curve is concave downwards there.', show: '$\\dfrac{d^2y}{dx^2} < 0$' },
            { say: 'The chords lie below a concave down curve, so the trapezium rule gives too little.', show: 'underestimate' }] }] }] });

BCSP.add({
  id: 'm3-hard',
  unit: 'm3',
  level: 'hard',
  title: 'Maths A2 1 · Paper C (Hard)',
  minutes: 150,
  calc: true,
  questions: [
    {
      n: 1,
      points: ['m3_func', 'm3_mod'],
      q: 'The functions $f$ and $g$ are defined by $f(x) = \\ln(2x - 1),\\ x > \\tfrac12$ and $g(x) = e^x + 2,\\ x \\in \\mathbb{R}$.',
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Find $f^{-1}(x)$ and state its domain and range.',
          answer: '$f^{-1}(x) = \\dfrac{e^x + 1}{2}$, domain $x \\in \\mathbb{R}$, range $f^{-1}(x) > \\tfrac12$',
          ms: [
            'M1 $e^y = 2x - 1$ rearranged',
            'A1 $\\frac{e^x + 1}{2}$',
            'B1 domain $\\mathbb{R}$ and range $> \\frac12$'],
          steps: [
            { say: 'Write y equals ln of two x minus one and exponentiate.', show: '$e^y = 2x - 1$' },
            { say: 'Solve for x and swap the letters.', show: '$x = \\dfrac{e^y + 1}{2} \\Rightarrow f^{-1}(x) = \\dfrac{e^x + 1}{2}$' },
            { say: 'The domain of the inverse is the range of f, which is all reals.', show: 'domain: $x \\in \\mathbb{R}$' },
            { say: 'The range of the inverse is the domain of f.', show: 'range: $f^{-1}(x) > \\tfrac12$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Solve the equation $fg(x) = 2x + \\ln 3$, giving your answer in the form $\\ln\\left(\\dfrac{a + \\sqrt b}{c}\\right)$.',
          answer: '$x = \\ln\\left(\\dfrac{1 + \\sqrt{10}}{3}\\right) \\approx 0.327$',
          ms: [
            'M1 $fg(x) = \\ln(2e^x + 3)$',
            'M1 removes logs: $2e^x + 3 = 3e^{2x}$',
            'A1 $3u^2 - 2u - 3 = 0$ with $u = e^x$',
            'M1 solves, rejecting negative root',
            'A1 $\\ln\\frac{1+\\sqrt{10}}3$'],
          steps: [
            { say: 'Apply g, then f.', show: '$fg(x) = \\ln\\big(2(e^x + 2) - 1\\big) = \\ln(2e^x + 3)$' },
            { say: 'Write the right-hand side as a single log: two x plus ln three is ln of three e to the two x.', show: '$\\ln(2e^x + 3) = \\ln(3e^{2x})$' },
            { say: 'Remove the logs and let u equal e to the x.', show: '$3u^2 - 2u - 3 = 0$' },
            { say: 'Use the quadratic formula. u must be positive, so take the plus root.', show: '$u = \\dfrac{2 + \\sqrt{40}}{6} = \\dfrac{1 + \\sqrt{10}}{3}$' },
            { say: 'Take logs.', show: '$x = \\ln\\left(\\dfrac{1 + \\sqrt{10}}{3}\\right) \\approx 0.327$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Solve $|x^2 - 4| = 3x$.',
          answer: '$x = 1$ or $x = 4$',
          ms: ['M1 $x^2 - 4 = 3x$', 'M1 $-(x^2 - 4) = 3x$', 'A1 $x = 4$ (rejects $-1$)', 'A1 $x = 1$ (rejects $-4$)'],
          steps: [
            { say: 'The left side is never negative, so any solution must have three x at least zero, so x is at least zero.', show: '$3x \\geq 0 \\Rightarrow x \\geq 0$' },
            { say: 'Case one: x squared minus four equals three x.', show: '$x^2 - 3x - 4 = 0 \\Rightarrow x = 4 \\ \\text{or}\\ -1$' },
            { say: 'Case two: four minus x squared equals three x.', show: '$x^2 + 3x - 4 = 0 \\Rightarrow x = 1 \\ \\text{or}\\ -4$' },
            { say: 'Reject the negative values.', show: '$x = 1, \\ x = 4$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Solve the inequality $|x - 2| \\leq 2|x + 1|$.',
          answer: '$x \\leq -4$ or $x \\geq 0$',
          ms: [
            'M1 squares both sides',
            'A1 $3x^2 + 12x \\geq 0$',
            'M1 critical values $0$ and $-4$',
            'A1 $x \\leq -4$ or $x \\geq 0$'],
          steps: [
            { say: 'Both sides are non-negative, so square.', show: '$(x - 2)^2 \\leq 4(x + 1)^2$' },
            { say: 'Expand.', show: '$x^2 - 4x + 4 \\leq 4x^2 + 8x + 4$' },
            { say: 'Collect.', show: '$0 \\leq 3x^2 + 12x = 3x(x + 4)$' },
            { say: 'The quadratic is non-negative outside and on its roots.', show: '$x \\leq -4 \\quad\\text{or}\\quad x \\geq 0$' }] }] },
    {
      n: 2,
      points: ['m3_pf', 'm3_binr', 'm3_ipf'],
      q: '$f(x) = \\dfrac{10x^2 + 4x + 4}{(1 - x)(1 + 2x)^2}$.',
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'Express $f(x)$ in partial fractions.',
          answer: '$\\dfrac{2}{1 - x} - \\dfrac{1}{1 + 2x} + \\dfrac{3}{(1 + 2x)^2}$',
          ms: ['M1 correct form and identity', 'A1 $A = 2$', 'A1 $C = 3$', 'A1 $B = -1$'],
          steps: [
            { say: 'Set up the form with a repeated factor.', show: '$f(x) \\equiv \\dfrac{A}{1 - x} + \\dfrac{B}{1 + 2x} + \\dfrac{C}{(1 + 2x)^2}$' },
            { say: 'Multiply through.', show: '$10x^2 + 4x + 4 \\equiv A(1 + 2x)^2 + B(1 - x)(1 + 2x) + C(1 - x)$' },
            { say: 'Put x equal to one: eighteen equals nine A.', show: '$A = 2$' },
            { say: 'Put x equal to minus a half: four and a half equals one and a half C.', show: '$C = 3$' },
            { say: 'Compare x squared coefficients: ten equals four A minus two B.', show: '$10 = 8 - 2B \\Rightarrow B = -1$' }] },
        {
          l: 'b',
          marks: 6,
          q: 'Hence find the expansion of $f(x)$ in ascending powers of $x$ up to and including the term in $x^2$.',
          answer: '$4 - 8x + 34x^2$',
          ms: [
            'M1 $(1 - x)^{-1}$ expanded',
            'M1 $(1 + 2x)^{-1}$ expanded',
            'M1 $(1 + 2x)^{-2}$ expanded',
            'A1 $2 + 2x + 2x^2$ and $-1 + 2x - 4x^2$',
            'A1 $3 - 12x + 36x^2$',
            'A1 $4 - 8x + 34x^2$'],
          steps: [
            { say: 'Expand each term with the binomial series.', show: '$2(1 - x)^{-1} = 2 + 2x + 2x^2$' },
            { say: 'Next term: minus one times one plus two x to the minus one.', show: '$-(1 + 2x)^{-1} = -1 + 2x - 4x^2$' },
            { say: 'Third term: with n equals minus two, the x squared coefficient is minus two times minus three over two, times four.', show: '$3(1 + 2x)^{-2} = 3(1 - 4x + 12x^2) = 3 - 12x + 36x^2$' },
            { say: 'Add.', show: '$f(x) \\approx 4 - 8x + 34x^2$' },
            { say: 'Check: f of zero is four over one, which is four.', show: '$f(0) = 4\\ \\checkmark$' }] },
        {
          l: 'c',
          marks: 1,
          q: 'State the range of values of $x$ for which the expansion is valid.',
          answer: '$|x| < \\tfrac12$',
          ms: ['B1 $|x| < \\frac12$'],
          steps: [
            { say: 'The first expansion needs modulus of x less than one.', show: '$|x| < 1$' },
            { say: 'The others need modulus of two x less than one.', show: '$|2x| < 1$' },
            { say: 'All must hold, so take the stricter.', show: '$|x| < \\tfrac12$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Find the exact value of $\\displaystyle\\int_0^{1/2} f(x)\\,dx$.',
          answer: '$\\tfrac32\\ln 2 + \\tfrac34$',
          ms: [
            'M1 log terms integrated',
            'A1 $-2\\ln|1 - x| - \\frac12\\ln|1 + 2x|$',
            'A1 $-\\frac{3}{2(1 + 2x)}$',
            'A1 $\\frac32\\ln 2 + \\frac34$'],
          steps: [
            { say: 'Integrate each partial fraction. Watch the inner derivatives: minus one and two.', show: '$\\left[-2\\ln|1 - x| - \\tfrac12\\ln|1 + 2x| - \\dfrac{3}{2(1 + 2x)}\\right]_0^{1/2}$' },
            { say: 'At a half.', show: '$-2\\ln\\tfrac12 - \\tfrac12\\ln 2 - \\tfrac34 = 2\\ln 2 - \\tfrac12\\ln 2 - \\tfrac34$' },
            { say: 'At nought.', show: '$0 - 0 - \\tfrac32$' },
            { say: 'Subtract.', show: '$\\tfrac32\\ln 2 + \\tfrac34 \\approx 1.790$' }] }] },
    {
      n: 3,
      points: ['m3_ap', 'm3_gp', 'm3_seq', 'm3_seqmod'],
      parts: [
        {
          l: 'a',
          marks: 4,
          q: 'The first, third and ninth terms of an arithmetic sequence with non-zero common difference are the first three terms of a geometric sequence. Find the common ratio of the geometric sequence.',
          answer: '$3$',
          ms: ['M1 terms $a,\\ a + 2d,\\ a + 8d$', 'M1 $(a + 2d)^2 = a(a + 8d)$', 'A1 $d = a$', 'A1 $r = 3$'],
          steps: [
            { say: 'Write the three terms of the arithmetic sequence.', show: '$a,\\quad a + 2d,\\quad a + 8d$' },
            { say: 'In a geometric sequence the middle term squared equals the product of its neighbours.', show: '$(a + 2d)^2 = a(a + 8d)$' },
            { say: 'Expand and simplify. d is not zero so we can divide by four d.', show: '$4ad + 4d^2 = 8ad \\Rightarrow d = a$' },
            { say: 'The ratio is the second term over the first.', show: '$r = \\dfrac{a + 2a}{a} = 3$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'Given that the first term of the arithmetic sequence is 2, find the sum of its first 20 terms.',
          answer: '$420$',
          ms: ['M1 $d = 2$ and sum formula', 'A1 420'],
          steps: [
            { say: 'Since d equals a, the common difference is two.', show: '$a = 2,\\ d = 2$' },
            { say: 'Use the sum formula.', show: '$S_{20} = 10\\big[4 + 19(2)\\big]$' },
            { say: 'Evaluate.', show: '$S_{20} = 420$' }] },
        {
          l: 'c',
          marks: 6,
          q: 'A sequence is defined by $u_{n+1} = ku_n + 4$, $u_1 = 2$. Given that $u_3 = 7$ and that the sequence converges, find the exact value of $k$ and the exact limit of the sequence.',
          answer: '$k = \\dfrac{\\sqrt{10} - 2}{2}$, limit $\\dfrac43(4 + \\sqrt{10})$',
          ms: [
            'M1 $u_2 = 2k + 4,\\ u_3 = k(2k + 4) + 4$',
            'A1 $2k^2 + 4k - 3 = 0$',
            'A1 $k = \\frac{-2 \\pm \\sqrt{10}}{2}$',
            'B1 selects $k = \\frac{\\sqrt{10} - 2}2$ since $|k| < 1$',
            'M1 $L = \\frac{4}{1 - k}$',
            'A1 $\\frac43(4 + \\sqrt{10})$'],
          steps: [
            { say: 'Generate the terms.', show: '$u_2 = 2k + 4, \\quad u_3 = k(2k + 4) + 4 = 2k^2 + 4k + 4$' },
            { say: 'Set u three equal to seven.', show: '$2k^2 + 4k - 3 = 0$' },
            { say: 'Solve with the formula.', show: '$k = \\dfrac{-4 \\pm \\sqrt{40}}{4} = \\dfrac{-2 \\pm \\sqrt{10}}{2}$' },
            { say: 'For convergence k must lie between minus one and one; only the plus root, about zero point five eight one, works.', show: '$k = \\dfrac{\\sqrt{10} - 2}{2} \\approx 0.581$' },
            { say: 'The limit satisfies L equals k L plus four.', show: '$L = \\dfrac{4}{1 - k} = \\dfrac{8}{4 - \\sqrt{10}}$' },
            { say: 'Rationalise.', show: '$L = \\dfrac{8(4 + \\sqrt{10})}{6} = \\tfrac43(4 + \\sqrt{10}) \\approx 9.55$' }] },
        {
          l: 'd',
          marks: 5,
          q: 'A patient takes a 200 mg dose of a drug every 6 hours. Just before each new dose, 30% of the drug present immediately after the previous dose remains in the body. (i) Find the long-term amount of drug in the body immediately after a dose. (ii) Find the least number of doses after which the amount immediately after a dose exceeds 285 mg.',
          answer: '(i) $285.7$ mg (ii) 5 doses',
          ms: [
            'M1 $a_n = 200(1 + 0.3 + \\cdots + 0.3^{n-1})$',
            'A1 $\\frac{200}{0.7} = 285.7$',
            'M1 $\\frac{200(1 - 0.3^n)}{0.7} > 285$',
            'M1 logs: $n > 4.98$',
            'A1 $n = 5$'],
          steps: [
            { say: 'After n doses the amount is a geometric series with first term two hundred and ratio zero point three.', show: '$a_n = 200(1 + 0.3 + \\cdots + 0.3^{n-1}) = \\dfrac{200(1 - 0.3^n)}{0.7}$' },
            { say: 'In the long run, zero point three to the n tends to zero.', show: '$a_\\infty = \\dfrac{200}{0.7} = 285.7$ mg' },
            { say: 'Set the amount greater than two eight five.', show: '$1 - 0.3^n > \\dfrac{285 \\times 0.7}{200} = 0.9975 \\Rightarrow 0.3^n < 0.0025$' },
            { say: 'Take logs, flipping the inequality.', show: '$n > \\dfrac{\\ln 0.0025}{\\ln 0.3} = 4.98$' },
            { say: 'So five doses. Check: after four it is two eight three point four, after five it is two eight five point zero two.', show: '$n = 5$' }] }] },
    {
      n: 4,
      points: ['m3_comp', 'm3_tid', 'm3_rtrig'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'Solve $2\\sin\\left(\\theta + \\dfrac{\\pi}{6}\\right) = \\sqrt3\\cos\\theta$ for $0 \\leq \\theta \\leq 2\\pi$, giving answers to 3 significant figures.',
          answer: '$\\theta = 0.400,\\ 3.54$',
          ms: [
            'M1 expands $\\sin(\\theta + \\frac\\pi6)$',
            'A1 $\\sqrt3\\sin\\theta + \\cos\\theta = \\sqrt3\\cos\\theta$',
            'M1 forms $\\tan\\theta = \\frac{\\sqrt3 - 1}{\\sqrt3}$',
            'A1 0.400',
            'A1 3.54'],
          steps: [
            { say: 'Expand with the compound angle formula.', show: '$2\\left(\\sin\\theta\\cdot\\tfrac{\\sqrt3}{2} + \\cos\\theta\\cdot\\tfrac12\\right) = \\sqrt3\\cos\\theta$' },
            { say: 'Simplify.', show: '$\\sqrt3\\sin\\theta + \\cos\\theta = \\sqrt3\\cos\\theta$' },
            { say: 'Collect and divide by root three cos theta.', show: '$\\tan\\theta = \\dfrac{\\sqrt3 - 1}{\\sqrt3} = 0.4226$' },
            { say: 'Principal value.', show: '$\\theta = 0.400$' },
            { say: 'Tan repeats every pi.', show: '$\\theta = 0.400 + \\pi = 3.54$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Solve $3\\cot^2 x - 5\\operatorname{cosec} x + 1 = 0$ for $0^\\circ < x < 360^\\circ$.',
          answer: '$x = 30^\\circ,\\ 150^\\circ$',
          ms: [
            'M1 uses $\\cot^2 x = \\operatorname{cosec}^2 x - 1$',
            'A1 $3\\operatorname{cosec}^2 x - 5\\operatorname{cosec} x - 2 = 0$',
            'M1 $\\operatorname{cosec} x = 2$ or $-\\frac13$',
            'B1 rejects $-\\frac13$ since $|\\operatorname{cosec} x| \\geq 1$',
            'A1 $30^\\circ,\\ 150^\\circ$'],
          steps: [
            { say: 'Replace cot squared with cosec squared minus one.', show: '$3(\\operatorname{cosec}^2 x - 1) - 5\\operatorname{cosec} x + 1 = 0$' },
            { say: 'Simplify and factorise.', show: '$3\\operatorname{cosec}^2 x - 5\\operatorname{cosec} x - 2 = 0 \\Rightarrow (3\\operatorname{cosec} x + 1)(\\operatorname{cosec} x - 2) = 0$' },
            { say: 'Cosec x equals minus a third is impossible, because cosec always has modulus at least one.', show: '$\\operatorname{cosec} x = -\\tfrac13$ rejected' },
            { say: 'So cosec x is two, meaning sin x is a half.', show: '$\\sin x = \\tfrac12$' },
            { say: 'Solutions in range.', show: '$x = 30^\\circ,\\ 150^\\circ$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the exact value of $\\tan\\left(\\arctan\\tfrac12 + \\arctan\\tfrac13\\right)$ and hence find the exact value of $\\arctan\\tfrac12 + \\arctan\\tfrac13$.',
          answer: '$1$; $\\dfrac{\\pi}{4}$',
          ms: [
            'M1 $\\tan(A + B)$ with $\\tan A = \\frac12,\\ \\tan B = \\frac13$',
            'A1 1',
            'A1 $\\frac\\pi4$ with justification that the sum lies in $(0, \\frac\\pi2)$'],
          steps: [
            { say: 'Let A be arctan a half and B be arctan a third, so tan A is a half and tan B is a third.', show: '$\\tan(A + B) = \\dfrac{\\frac12 + \\frac13}{1 - \\frac16}$' },
            { say: 'Five sixths over five sixths is one.', show: '$\\tan(A + B) = 1$' },
            { say: 'Both angles are between nought and pi over four, so the sum is between nought and pi over two, where tan equals one only at pi over four.', show: '$0 < A + B < \\tfrac\\pi2 \\Rightarrow A + B = \\tfrac\\pi4$' }] }] },
    {
      n: 5,
      points: ['m3_rform'],
      parts: [
        {
          l: 'a',
          marks: 3,
          q: 'Express $5\\sin\\theta - 12\\cos\\theta$ in the form $R\\sin(\\theta - \\alpha)$, where $R > 0$ and $0 < \\alpha < \\frac\\pi2$.',
          answer: '$13\\sin(\\theta - 1.176)$',
          ms: ['M1 $R\\cos\\alpha = 5,\\ R\\sin\\alpha = 12$', 'A1 $R = 13$', 'A1 $\\alpha = 1.176$'],
          steps: [
            { say: 'Expand R sin of theta minus alpha.', show: '$R\\sin\\theta\\cos\\alpha - R\\cos\\theta\\sin\\alpha$' },
            { say: 'Compare coefficients.', show: '$R\\cos\\alpha = 5,\\quad R\\sin\\alpha = 12$' },
            { say: 'R is thirteen and tan alpha is twelve fifths.', show: '$R = 13,\\ \\alpha = \\arctan\\tfrac{12}{5} = 1.176$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Find the maximum and minimum values of $\\dfrac{1}{20 + 5\\sin\\theta - 12\\cos\\theta}$.',
          answer: 'Maximum $\\dfrac17$, minimum $\\dfrac1{33}$',
          ms: ['M1 denominator ranges from $20 - 13$ to $20 + 13$', 'A1 max $\\frac17$', 'A1 min $\\frac1{33}$'],
          steps: [
            { say: 'The denominator is twenty plus thirteen sin of theta minus alpha.', show: '$20 + 13\\sin(\\theta - \\alpha)$' },
            { say: 'Sine ranges from minus one to one, so the denominator ranges from seven to thirty three, and is always positive.', show: '$7 \\leq 20 + 13\\sin(\\theta - \\alpha) \\leq 33$' },
            { say: 'The fraction is largest when the denominator is smallest.', show: 'max $= \\tfrac17$, min $= \\tfrac1{33}$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Solve $5\\sin 2x - 12\\cos 2x = 6.5$ for $0 \\leq x \\leq \\pi$, giving answers to 3 decimal places.',
          answer: '$x = 0.850,\\ 1.897$',
          ms: ['M1 $\\sin(2x - 1.176) = 0.5$', 'M1 $2x - 1.176 = \\frac\\pi6$ or $\\frac{5\\pi}6$', 'A1 0.850', 'A1 1.897'],
          steps: [
            { say: 'Use the R form with two x.', show: '$13\\sin(2x - 1.176) = 6.5 \\Rightarrow \\sin(2x - 1.176) = 0.5$' },
            { say: 'Two x minus alpha runs from minus one point one seven six to five point one zero seven.', show: '$-1.176 \\leq 2x - 1.176 \\leq 5.107$' },
            { say: 'Sine is a half at pi over six and five pi over six in that interval.', show: '$2x - 1.176 = 0.5236 \\ \\text{or}\\ 2.6180$' },
            { say: 'Solve for x.', show: '$x = 0.850 \\ \\text{or}\\ 1.897$' }] }] },
    {
      n: 6,
      points: ['m3_rules', 'm3_dstd', 'm3_cde'],
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'Find the exact coordinates of the stationary points on the curve $y = \\dfrac{\\sin x}{2 + \\cos x}$, $0 \\leq x \\leq 2\\pi$.',
          answer: '$\\left(\\dfrac{2\\pi}3, \\dfrac{\\sqrt3}3\\right)$ and $\\left(\\dfrac{4\\pi}3, -\\dfrac{\\sqrt3}3\\right)$',
          ms: [
            'M1 quotient rule',
            'A1 $\\frac{\\cos x(2 + \\cos x) + \\sin^2 x}{(2 + \\cos x)^2}$',
            'A1 simplifies to $\\frac{2\\cos x + 1}{(2 + \\cos x)^2}$',
            'M1 $\\cos x = -\\frac12$',
            'A1 $x = \\frac{2\\pi}3,\\ \\frac{4\\pi}3$',
            'A1 $y = \\pm\\frac{\\sqrt3}3$'],
          steps: [
            { say: 'Use the quotient rule.', show: '$\\dfrac{dy}{dx} = \\dfrac{\\cos x(2 + \\cos x) - \\sin x(-\\sin x)}{(2 + \\cos x)^2}$' },
            { say: 'Cos squared plus sin squared is one.', show: '$= \\dfrac{2\\cos x + 1}{(2 + \\cos x)^2}$' },
            { say: 'Set the numerator to zero.', show: '$\\cos x = -\\tfrac12$' },
            { say: 'Solutions in range.', show: '$x = \\tfrac{2\\pi}3,\\ \\tfrac{4\\pi}3$' },
            { say: 'At two pi over three, sin is root three over two and the denominator is three halves.', show: '$y = \\dfrac{\\sqrt3/2}{3/2} = \\dfrac{\\sqrt3}{3}$; at $\\tfrac{4\\pi}3$, $y = -\\dfrac{\\sqrt3}3$' }] },
        {
          l: 'b',
          marks: 4,
          q: 'Given $y = \\ln(\\operatorname{cosec} x - \\cot x)$, $0 < x < \\pi$, show that $\\dfrac{dy}{dx} = \\operatorname{cosec} x$.',
          answer: '$\\dfrac{dy}{dx} = \\operatorname{cosec} x$',
          ms: [
            'M1 chain rule for $\\ln$',
            'A1 derivative of $\\operatorname{cosec} x - \\cot x$ is $-\\operatorname{cosec} x\\cot x + \\operatorname{cosec}^2 x$',
            'M1 factorises $\\operatorname{cosec} x$',
            'A1 fully correct'],
          steps: [
            { say: 'The derivative of ln u is u dash over u.', show: '$\\dfrac{dy}{dx} = \\dfrac{\\frac{d}{dx}(\\operatorname{cosec} x - \\cot x)}{\\operatorname{cosec} x - \\cot x}$' },
            { say: 'Differentiate the inside.', show: '$\\dfrac{d}{dx}(\\operatorname{cosec} x - \\cot x) = -\\operatorname{cosec} x\\cot x + \\operatorname{cosec}^2 x$' },
            { say: 'Factor out cosec x.', show: '$= \\operatorname{cosec} x(\\operatorname{cosec} x - \\cot x)$' },
            { say: 'Cancel the bracket.', show: '$\\dfrac{dy}{dx} = \\operatorname{cosec} x$' }] },
        {
          l: 'c',
          marks: 4,
          q: 'A spherical balloon is inflated so that its volume increases at a constant rate of 50 cm³ s⁻¹. Find the rate at which the radius is increasing when the radius is 10 cm. [$V = \\frac43\\pi r^3$]',
          answer: '$\\dfrac{1}{8\\pi} \\approx 0.0398$ cm s⁻¹',
          ms: [
            'B1 $\\frac{dV}{dt} = 50$',
            'M1 $\\frac{dV}{dr} = 4\\pi r^2$',
            'M1 $\\frac{dr}{dt} = \\frac{dV}{dt} \\div \\frac{dV}{dr}$',
            'A1 0.0398'],
          steps: [
            { say: 'We are told d V by d t is fifty.', show: '$\\dfrac{dV}{dt} = 50$' },
            { say: 'Differentiate the volume formula with respect to r.', show: '$\\dfrac{dV}{dr} = 4\\pi r^2 = 400\\pi$ at $r = 10$' },
            { say: 'Use the chain rule.', show: '$\\dfrac{dr}{dt} = \\dfrac{dV/dt}{dV/dr} = \\dfrac{50}{400\\pi}$' },
            { say: 'Evaluate.', show: '$\\dfrac{dr}{dt} = \\dfrac{1}{8\\pi} \\approx 0.0398$ cm s⁻¹' }] }] },
    {
      n: 7,
      points: ['m3_impl', 'm3_param'],
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'A curve has equation $x^2 - 2xy + 3y^2 = 9$. Find the exact coordinates of the points on the curve where the tangent is parallel to the $x$-axis.',
          answer: '$\\left(\\dfrac{3\\sqrt2}{2}, \\dfrac{3\\sqrt2}{2}\\right)$ and $\\left(-\\dfrac{3\\sqrt2}{2}, -\\dfrac{3\\sqrt2}{2}\\right)$',
          ms: [
            'M1 implicit differentiation',
            'M1 product rule on $2xy$',
            'A1 $\\frac{dy}{dx} = \\frac{y - x}{3y - x}$',
            'M1 sets numerator 0: $y = x$, substitutes',
            'A1 $2x^2 = 9$',
            'A1 both points'],
          steps: [
            { say: 'Differentiate implicitly.', show: '$2x - 2y - 2x\\dfrac{dy}{dx} + 6y\\dfrac{dy}{dx} = 0$' },
            { say: 'Rearrange.', show: '$\\dfrac{dy}{dx} = \\dfrac{y - x}{3y - x}$' },
            { say: 'Tangent parallel to the x axis means zero gradient, so y equals x.', show: '$y = x$' },
            { say: 'Substitute into the curve.', show: '$x^2 - 2x^2 + 3x^2 = 9 \\Rightarrow x^2 = \\tfrac92$' },
            { say: 'So x is plus or minus three over root two, with the denominator non-zero.', show: '$x = y = \\pm\\dfrac{3\\sqrt2}{2}$' }] },
        {
          l: 'b',
          marks: 2,
          q: 'A curve $C$ has parametric equations $x = t^2 - 2t$, $y = t^3 - 3t$. Show that, for $t \\neq 1$, $\\dfrac{dy}{dx} = \\dfrac{3(t + 1)}{2}$.',
          answer: '$\\dfrac{dy}{dx} = \\dfrac{3(t+1)}{2}$',
          ms: ['M1 $\\frac{3t^2 - 3}{2t - 2}$', 'A1 factorises and cancels'],
          steps: [
            { say: 'Differentiate each.', show: '$\\dfrac{dx}{dt} = 2t - 2, \\quad \\dfrac{dy}{dt} = 3t^2 - 3$' },
            { say: 'Divide.', show: '$\\dfrac{dy}{dx} = \\dfrac{3(t - 1)(t + 1)}{2(t - 1)}$' },
            { say: 'Cancel t minus one.', show: '$= \\dfrac{3(t + 1)}{2}$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find the equation of the tangent to $C$ at the point where $t = 2$.',
          answer: '$y = \\tfrac92 x + 2$',
          ms: ['B1 point $(0, 2)$', 'B1 gradient $\\frac92$', 'A1 $y = \\frac92x + 2$'],
          steps: [
            { say: 'At t equals two, x is nought and y is two.', show: '$(0, 2)$' },
            { say: 'The gradient is three times three over two.', show: '$m = \\tfrac92$' },
            { say: 'Write the line.', show: '$y = \\tfrac92 x + 2$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'The tangent meets $C$ again at the point $Q$. Find the coordinates of $Q$.',
          answer: '$Q\\left(-\\tfrac34, -\\tfrac{11}{8}\\right)$',
          ms: [
            'M1 substitutes parametric equations into tangent',
            'A1 $2t^3 - 9t^2 + 12t - 4 = 0$',
            'M1 uses $(t - 2)^2$ as a factor',
            'A1 $t = \\frac12$, $Q(-\\frac34, -\\frac{11}8)$'],
          steps: [
            { say: 'Substitute x and y in terms of t into the tangent.', show: '$t^3 - 3t = \\tfrac92(t^2 - 2t) + 2$' },
            { say: 'Multiply by two and rearrange.', show: '$2t^3 - 9t^2 + 12t - 4 = 0$' },
            { say: 'A tangent touches at t equals two, so t minus two squared is a factor.', show: '$(t - 2)^2(2t - 1) = 0$' },
            { say: 'So t is a half.', show: '$t = \\tfrac12$' },
            { say: 'Find the coordinates.', show: '$x = \\tfrac14 - 1 = -\\tfrac34,\\quad y = \\tfrac18 - \\tfrac32 = -\\tfrac{11}{8}$' }] }] },
    {
      n: 8,
      points: ['m3_parts', 'm3_subs', 'm3_istd', 'm3_tid'],
      parts: [
        {
          l: 'a',
          marks: 6,
          q: 'Find the exact value of $\\displaystyle\\int_0^{\\pi/2} x^2\\cos x\\,dx$.',
          answer: '$\\dfrac{\\pi^2}{4} - 2$',
          ms: [
            'M1 parts with $u = x^2$',
            'A1 $x^2\\sin x - \\int 2x\\sin x\\,dx$',
            'M1 parts again with $u = 2x$',
            'A1 $x^2\\sin x + 2x\\cos x - 2\\sin x$',
            'M1 limits',
            'A1 $\\frac{\\pi^2}4 - 2$'],
          steps: [
            { say: 'Use parts with u equal to x squared.', show: '$\\displaystyle\\int x^2\\cos x\\,dx = x^2\\sin x - \\int 2x\\sin x\\,dx$' },
            { say: 'Use parts again on two x sin x, with u equal to two x.', show: '$\\displaystyle\\int 2x\\sin x\\,dx = -2x\\cos x + \\int 2\\cos x\\,dx = -2x\\cos x + 2\\sin x$' },
            { say: 'Combine.', show: '$\\displaystyle\\int x^2\\cos x\\,dx = x^2\\sin x + 2x\\cos x - 2\\sin x$' },
            { say: 'Substitute pi over two: sin is one and cos is zero.', show: '$\\left(\\tfrac{\\pi^2}{4} + 0 - 2\\right) - (0 + 0 - 0)$' },
            { say: 'So the answer is pi squared over four minus two.', show: '$\\dfrac{\\pi^2}{4} - 2 \\approx 0.467$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'Use the substitution $u = \\sqrt x$ to find the exact value of $\\displaystyle\\int_1^4 \\frac{1}{x + \\sqrt x}\\,dx$.',
          answer: '$2\\ln\\dfrac32$',
          ms: [
            'M1 $x = u^2,\\ dx = 2u\\,du$',
            'B1 limits 1 and 2',
            'M1 $\\int\\frac{2u}{u^2 + u}du = \\int\\frac{2}{u + 1}du$',
            'A1 $2\\ln|u + 1|$',
            'A1 $2\\ln\\frac32$'],
          steps: [
            { say: 'With u equal to root x, x is u squared and d x is two u d u.', show: '$x = u^2,\\ dx = 2u\\,du$' },
            { say: 'Change the limits: one goes to one, four goes to two.', show: '$x: 1 \\to 4 \\Rightarrow u: 1 \\to 2$' },
            { say: 'Rewrite and cancel u.', show: '$\\displaystyle\\int_1^2 \\frac{2u}{u^2 + u}\\,du = \\int_1^2\\frac{2}{u + 1}\\,du$' },
            { say: 'Integrate.', show: '$\\big[2\\ln(u + 1)\\big]_1^2 = 2\\ln 3 - 2\\ln 2$' },
            { say: 'Simplify.', show: '$= 2\\ln\\tfrac32$' }] },
        {
          l: 'c',
          marks: 3,
          q: 'Find $\\displaystyle\\int\\tan^2 3x\\,dx$.',
          answer: '$\\tfrac13\\tan 3x - x + c$',
          ms: ['M1 $\\tan^2 3x = \\sec^2 3x - 1$', 'A1 $\\frac13\\tan 3x$', 'A1 $- x + c$'],
          steps: [
            { say: 'We cannot integrate tan squared directly, so use the identity.', show: '$\\tan^2 3x = \\sec^2 3x - 1$' },
            { say: 'Sec squared three x integrates to a third tan three x.', show: '$\\int\\sec^2 3x\\,dx = \\tfrac13\\tan 3x$' },
            { say: 'Integrate minus one and add the constant.', show: '$\\tfrac13\\tan 3x - x + c$' }] }] },
    {
      n: 9,
      points: ['m3_area2', 'm3_vol', 'm3_parts'],
      parts: [
        {
          l: 'a',
          marks: 5,
          q: 'The curves $y = \\sin 2x$ and $y = \\sin x$ intersect at $x = 0$ and at $x = \\frac\\pi3$. Find the area of the region enclosed between them for $0 \\leq x \\leq \\frac\\pi3$.',
          answer: '$\\dfrac14$',
          ms: [
            'B1 verifies intersection: $2\\sin x\\cos x = \\sin x \\Rightarrow \\cos x = \\frac12$',
            'M1 $\\int_0^{\\pi/3}(\\sin 2x - \\sin x)\\,dx$',
            'A1 $-\\frac12\\cos 2x + \\cos x$',
            'M1 limits',
            'A1 $\\frac14$'],
          steps: [
            { say: 'Check the intersection: two sin x cos x equals sin x gives sin x equals zero or cos x equals a half.', show: '$x = 0,\\ \\tfrac\\pi3$' },
            { say: 'Sin two x is above sin x in between; at pi over six it is about zero point eight seven against a half.', show: '$A = \\displaystyle\\int_0^{\\pi/3}(\\sin 2x - \\sin x)\\,dx$' },
            { say: 'Integrate.', show: '$= \\left[-\\tfrac12\\cos 2x + \\cos x\\right]_0^{\\pi/3}$' },
            { say: 'Upper limit: cos two pi over three is minus a half, cos pi over three is a half.', show: '$\\left(\\tfrac14 + \\tfrac12\\right) - \\left(-\\tfrac12 + 1\\right)$' },
            { say: 'Evaluate.', show: '$A = \\tfrac34 - \\tfrac12 = \\tfrac14$' }] },
        {
          l: 'b',
          marks: 5,
          q: 'The region bounded by the curve $y = \\sqrt x\\,e^{\\frac12 x}$, the $x$-axis and the line $x = 1$ is rotated through $2\\pi$ radians about the $x$-axis. Find the exact volume of the solid generated.',
          answer: '$\\pi$',
          ms: ['M1 $V = \\pi\\int_0^1 xe^x\\,dx$', 'M1 parts', 'A1 $xe^x - e^x$', 'M1 limits', 'A1 $\\pi$'],
          steps: [
            { say: 'Square y: root x squared is x and e to the half x squared is e to the x.', show: '$y^2 = xe^x$' },
            { say: 'So the volume is pi times the integral of x e to the x.', show: '$V = \\pi\\displaystyle\\int_0^1 xe^x\\,dx$' },
            { say: 'By parts with u equal to x.', show: '$\\displaystyle\\int xe^x\\,dx = xe^x - e^x$' },
            { say: 'Evaluate.', show: '$\\pi\\big[(e - e) - (0 - 1)\\big] = \\pi$' }] }] },
    {
      n: 10,
      points: ['m3_pf', 'm3_sde', 'm3_fmod'],
      q: 'The population $P$ of a species on an island, $t$ years after it was introduced, is modelled by $\\dfrac{dP}{dt} = kP(100 - P)$, where $k$ is a positive constant. Initially $P = 20$, and after 2 years $P = 50$.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Express $\\dfrac{1}{P(100 - P)}$ in partial fractions.',
          answer: '$\\dfrac{1}{100}\\left(\\dfrac1P + \\dfrac{1}{100 - P}\\right)$',
          ms: ['M1 $1 \\equiv A(100 - P) + BP$', 'A1 $A = B = \\frac1{100}$'],
          steps: [
            { say: 'Set up the identity.', show: '$1 \\equiv A(100 - P) + BP$' },
            { say: 'Put P equal to nought, then P equal to one hundred.', show: '$A = \\tfrac{1}{100},\\quad B = \\tfrac1{100}$' },
            { say: 'Write the result.', show: '$\\dfrac{1}{100}\\left(\\dfrac1P + \\dfrac1{100 - P}\\right)$' }] },
        {
          l: 'b',
          marks: 7,
          q: 'Solve the differential equation to show that $P = \\dfrac{100}{1 + 4\\times 2^{-t}}$.',
          answer: '$P = \\dfrac{100}{1 + 4\\times2^{-t}}$',
          ms: [
            'M1 separates variables',
            'M1 integrates using partial fractions',
            'A1 $\\frac1{100}\\ln\\frac{P}{100 - P} = kt + c$',
            'M1 uses $P = 20$ at $t = 0$',
            'M1 uses $P = 50$ at $t = 2$',
            'A1 $\\frac{P}{100 - P} = \\frac14\\,2^t$',
            'A1 rearranges to given form'],
          steps: [
            { say: 'Separate and use the partial fractions.', show: '$\\displaystyle\\frac1{100}\\int\\left(\\frac1P + \\frac1{100 - P}\\right)dP = \\int k\\,dt$' },
            { say: 'Integrate. Note the minus sign from the inner derivative of one hundred minus P.', show: '$\\tfrac1{100}\\big(\\ln P - \\ln(100 - P)\\big) = kt + c$' },
            { say: 'Multiply by one hundred and use t equals nought, P equals twenty.', show: '$\\ln\\dfrac{P}{100 - P} = 100kt + \\ln\\tfrac14$' },
            { say: 'Use t equals two, P equals fifty, where the fraction is one.', show: '$0 = 200k + \\ln\\tfrac14 \\Rightarrow 100k = \\ln 2$' },
            { say: 'Exponentiate.', show: '$\\dfrac{P}{100 - P} = \\tfrac14 e^{t\\ln 2} = \\tfrac14\\cdot 2^t$' },
            { say: 'Solve for P.', show: '$P = \\dfrac{100\\cdot 2^t}{4 + 2^t} = \\dfrac{100}{1 + 4\\times2^{-t}}$' }] },
        {
          l: 'c',
          marks: 1,
          q: 'State the long-term size of the population according to this model.',
          answer: '$100$',
          ms: ['B1 100'],
          steps: [
            { say: 'As t gets large, two to the minus t tends to zero.', show: '$2^{-t} \\to 0$' },
            { say: 'So P tends to one hundred over one.', show: '$P \\to 100$' },
            { say: 'The long-term population is one hundred.', show: '$100$' }] },
        {
          l: 'd',
          marks: 2,
          q: 'Find how long it takes for the population to reach 90.',
          answer: '$t = \\log_2 36 \\approx 5.17$ years',
          ms: ['M1 $2^t = 36$', 'A1 5.17 years'],
          steps: [
            { say: 'Set P equal to ninety.', show: '$\\dfrac{2^t}{4 + 2^t} = 0.9 \\Rightarrow 0.1\\cdot 2^t = 3.6$' },
            { say: 'So two to the t is thirty six.', show: '$2^t = 36$' },
            { say: 'Take logs.', show: '$t = \\dfrac{\\ln 36}{\\ln 2} \\approx 5.17$ years' }] },
        {
          l: 'e',
          marks: 1,
          q: 'Suggest one refinement to the model.',
          answer: 'e.g. allow for seasonal breeding, predators or harvesting, or a carrying capacity that changes over time',
          ms: ['B1 sensible refinement'],
          steps: [
            { say: 'The model assumes a fixed carrying capacity and smooth continuous growth.', show: 'capacity fixed at 100' },
            { say: 'Real populations have seasons, predators and disease.', show: 'seasonal / predation / harvesting term' },
            { say: 'Any sensible refinement earns the mark.', show: 'B1' }] }] },
    {
      n: 11,
      points: ['m3_root', 'm3_iter', 'm3_trap'],
      q: 'The equation $x\\ln x = 2$ has a single root $\\alpha$.',
      parts: [
        {
          l: 'a',
          marks: 2,
          q: 'Show that $\\alpha$ lies between 2 and 3.',
          answer: '$f(2) = -0.614,\\ f(3) = 1.296$ where $f(x) = x\\ln x - 2$; sign change',
          ms: ['M1 evaluates $f(2), f(3)$', 'A1 sign change, continuity, conclusion'],
          steps: [
            { say: 'Let f of x be x ln x minus two.', show: '$f(2) = 2\\ln 2 - 2 = -0.614$' },
            { say: 'Now at three.', show: '$f(3) = 3\\ln 3 - 2 = 1.296$' },
            { say: 'f is continuous for x greater than nought and changes sign.', show: '$2 < \\alpha < 3$' }] },
        {
          l: 'b',
          marks: 3,
          q: 'Use the iteration $x_{n+1} = e^{2/x_n}$ with $x_1 = 2.3$ to find $x_2$, $x_3$ and $x_4$ to 4 decimal places, and describe the behaviour of the iterates.',
          answer: '$x_2 = 2.3859,\\ x_3 = 2.3124,\\ x_4 = 2.3748$; they oscillate about $\\alpha$ and converge slowly',
          ms: ['M1 correct use of iteration', 'A1 all three values', 'B1 oscillating (cobweb), slow convergence'],
          steps: [
            { say: 'Rearranging x ln x equals two gives ln x equals two over x, so x equals e to the two over x.', show: '$x = e^{2/x}$' },
            { say: 'Iterate from two point three.', show: '$x_2 = e^{2/2.3} = 2.3859$' },
            { say: 'Continue.', show: '$x_3 = 2.3124, \\quad x_4 = 2.3748$' },
            { say: 'The values jump either side of the root and close in slowly: a cobweb pattern.', show: 'oscillating, slow convergence' }] },
        {
          l: 'c',
          marks: 4,
          q: 'Use the Newton–Raphson method with $x_0 = 2.3$ to find $\\alpha$ correct to 5 decimal places.',
          answer: '$\\alpha = 2.34575$',
          ms: [
            'B1 $f\'(x) = \\ln x + 1$',
            'M1 correct formula',
            'A1 $x_1 = 2.34600$',
            'A1 $\\alpha = 2.34575$ (with $x_2, x_3$ agreeing)'],
          steps: [
            { say: 'Differentiate using the product rule.', show: '$f\'(x) = \\ln x + 1$' },
            { say: 'First iteration.', show: '$x_1 = 2.3 - \\dfrac{2.3\\ln 2.3 - 2}{\\ln 2.3 + 1} = 2.34600$' },
            { say: 'Next iterations.', show: '$x_2 = 2.34575, \\quad x_3 = 2.34575$' },
            { say: 'They agree to five decimal places, and much faster than part b.', show: '$\\alpha = 2.34575$' }] },
        {
          l: 'd',
          marks: 4,
          q: 'Use the trapezium rule with 4 strips to estimate $\\displaystyle\\int_1^3 x\\ln x\\,dx$, giving your answer to 3 decimal places.',
          answer: '$2.967$',
          ms: ['B1 $h = 0.5$', 'B1 ordinates 0, 0.6082, 1.3863, 2.2907, 3.2958', 'M1 structure', 'A1 2.967'],
          steps: [
            { say: 'The strip width is a half.', show: '$h = 0.5$' },
            { say: 'Ordinates at one, one and a half, two, two and a half, three.', show: '$0,\\ 0.6082,\\ 1.3863,\\ 2.2907,\\ 3.2958$' },
            { say: 'Apply the rule.', show: '$\\tfrac12(0.5)\\big[(0 + 3.2958) + 2(0.6082 + 1.3863 + 2.2907)\\big]$' },
            { say: 'Evaluate.', show: '$= 0.25 \\times 11.8662 = 2.967$' }] }] }] });
