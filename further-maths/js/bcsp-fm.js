// BCS Academy original papers · not CCEA papers
// Further Maths A2 1 Pure Mathematics (CCEA format: 2 h 15 min, 150 marks, answer all questions): three original practice papers (easy, medium, hard) registered with BCSP (js/bcsp.js).
BCSP.add({
 "id": "fm-easy",
 "unit": "fm",
 "level": "easy",
 "title": "Further Maths A2 1 · Paper A (Easy)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "pi2",
    "pi1"
   ],
   "q": "Use mathematical induction throughout this question.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Prove by induction that, for all positive integers $n$, $$\\sum_{r=1}^{n} r(r+1) = \\frac{n(n+1)(n+2)}{3}.$$",
     "answer": "Base case and inductive step shown; true for all $n \\in \\mathbb{Z}^+$.",
     "ms": [
      "B1 base case $n=1$: both sides equal $2$",
      "M1 assume true for $n=k$ and add the $(k+1)$th term $(k+1)(k+2)$",
      "M1 take out the common factor $(k+1)(k+2)$",
      "A1 obtain $\\frac{(k+1)(k+2)(k+3)}{3}$",
      "A1 this is the formula with $n = k+1$",
      "B1 full conclusion: true for $n=1$, and true for $k$ implies true for $k+1$, so true for all positive integers $n$"
     ],
     "steps": [
      {
       "say": "First check n equals 1. The left side is 1 times 2, which is 2. The right side is 1 times 2 times 3 over 3, which is also 2.",
       "show": "$n=1$: LHS $=1\\times2=2$, RHS $=\\frac{1\\cdot2\\cdot3}{3}=2$ ✓"
      },
      {
       "say": "Assume the result holds when n equals k.",
       "show": "Assume $\\sum_{r=1}^{k} r(r+1) = \\frac{k(k+1)(k+2)}{3}$"
      },
      {
       "say": "Add the next term, which is k plus 1 times k plus 2.",
       "show": "$\\sum_{r=1}^{k+1} r(r+1) = \\frac{k(k+1)(k+2)}{3} + (k+1)(k+2)$"
      },
      {
       "say": "Take out the common factor k plus 1 times k plus 2, leaving k over 3 plus 1, which is k plus 3 over 3.",
       "show": "$= (k+1)(k+2)\\left(\\frac{k}{3}+1\\right) = \\frac{(k+1)(k+2)(k+3)}{3}$"
      },
      {
       "say": "That is exactly the formula with n replaced by k plus 1, so by induction it is true for every positive integer n.",
       "show": "$=\\frac{(k+1)\\big((k+1)+1\\big)\\big((k+1)+2\\big)}{3}$, so true for all $n \\ge 1$."
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Prove by induction that $7^n - 1$ is divisible by $6$ for all positive integers $n$.",
     "answer": "$7^{k+1}-1 = 7(7^k-1)+6$, so divisible by 6 for all $n$.",
     "ms": [
      "B1 $n=1$: $7-1=6$, divisible by 6",
      "M1 assume $7^k - 1 = 6m$",
      "M1 write $7^{k+1}-1$ in terms of $7^k-1$",
      "A1 $7^{k+1}-1 = 7(7^k-1)+6 = 6(7m+1)$",
      "B1 conclusion by induction"
     ],
     "steps": [
      {
       "say": "When n equals 1, 7 minus 1 is 6, which is divisible by 6.",
       "show": "$n=1$: $7^1-1=6$ ✓"
      },
      {
       "say": "Assume 7 to the k minus 1 is a multiple of 6, say 6m.",
       "show": "Assume $7^k - 1 = 6m$, $m\\in\\mathbb{Z}$"
      },
      {
       "say": "Write 7 to the k plus 1 minus 1 as 7 times 7 to the k, minus 1, and rearrange to bring in the assumed expression.",
       "show": "$7^{k+1}-1 = 7\\cdot7^k - 7 + 6 = 7(7^k-1)+6$"
      },
      {
       "say": "Substitute 6m. Both terms are multiples of 6, so the whole expression is a multiple of 6, and by induction the result holds for all n.",
       "show": "$= 42m + 6 = 6(7m+1)$ ✓ for all $n\\ge1$"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "al1",
    "ca6"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Express $\\dfrac{5x^2+3x+4}{(x+1)(x^2+1)}$ in partial fractions.",
     "answer": "$\\dfrac{3}{x+1} + \\dfrac{2x+1}{x^2+1}$",
     "ms": [
      "M1 correct form $\\frac{A}{x+1}+\\frac{Bx+C}{x^2+1}$",
      "A1 $A=3$",
      "M1 compare coefficients or substitute values to find $B$ and $C$",
      "A1 $B=2,\\ C=1$"
     ],
     "steps": [
      {
       "say": "The quadratic factor x squared plus 1 does not factorise, so it needs a linear numerator.",
       "show": "$\\frac{5x^2+3x+4}{(x+1)(x^2+1)} = \\frac{A}{x+1}+\\frac{Bx+C}{x^2+1}$"
      },
      {
       "say": "Multiply through and put x equal to minus 1. The right side gives 2A and the left gives 6, so A is 3.",
       "show": "$5x^2+3x+4 = A(x^2+1)+(Bx+C)(x+1)$; $x=-1$: $6=2A \\Rightarrow A=3$"
      },
      {
       "say": "Subtract 3 times x squared plus 1 from the numerator to leave 2x squared plus 3x plus 1, which factorises as 2x plus 1 times x plus 1.",
       "show": "$2x^2+3x+1 = (2x+1)(x+1) \\Rightarrow B=2,\\ C=1$"
      },
      {
       "say": "So the partial fractions are 3 over x plus 1, plus 2x plus 1 over x squared plus 1.",
       "show": "$\\frac{3}{x+1}+\\frac{2x+1}{x^2+1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Hence show that $\\displaystyle\\int_0^1 \\frac{5x^2+3x+4}{(x+1)(x^2+1)}\\,dx = 4\\ln 2 + \\frac{\\pi}{4}.$",
     "answer": "$4\\ln2 + \\frac{\\pi}{4}$",
     "ms": [
      "M1 split $\\frac{2x+1}{x^2+1}$ into $\\frac{2x}{x^2+1}+\\frac{1}{x^2+1}$",
      "A1 $3\\ln|x+1|$",
      "A1 $\\ln(x^2+1)$",
      "A1 $\\tan^{-1}x$",
      "M1 substitute limits",
      "A1 $4\\ln2+\\frac{\\pi}{4}$ convincingly shown"
     ],
     "steps": [
      {
       "say": "Split the second fraction so that one piece has the derivative of its denominator on top.",
       "show": "$\\int\\left(\\frac{3}{x+1}+\\frac{2x}{x^2+1}+\\frac{1}{x^2+1}\\right)dx$"
      },
      {
       "say": "Integrate each piece: a log, another log, and an inverse tangent.",
       "show": "$=\\big[3\\ln(x+1)+\\ln(x^2+1)+\\tan^{-1}x\\big]_0^1$"
      },
      {
       "say": "At 1 we get 3 ln 2 plus ln 2 plus pi over 4. At 0 everything is zero.",
       "show": "$=3\\ln2+\\ln2+\\frac{\\pi}{4} - 0$"
      },
      {
       "say": "Collect the logarithms.",
       "show": "$=4\\ln2+\\frac{\\pi}{4}$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "al2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Use the standard results for $\\sum r$ and $\\sum r^2$ to show that $\\displaystyle\\sum_{r=1}^{n} r(2r-1) = \\frac{n(n+1)(4n-1)}{6}.$",
     "answer": "$\\frac{n(n+1)(4n-1)}{6}$",
     "ms": [
      "M1 write as $2\\sum r^2 - \\sum r$",
      "A1 $\\frac{n(n+1)(2n+1)}{3}-\\frac{n(n+1)}{2}$",
      "M1 take out the factor $\\frac{n(n+1)}{6}$",
      "A1 $\\frac{n(n+1)(4n-1)}{6}$ shown"
     ],
     "steps": [
      {
       "say": "Expand the general term to 2r squared minus r, and split the sum.",
       "show": "$\\sum r(2r-1) = 2\\sum r^2 - \\sum r$"
      },
      {
       "say": "Use the standard formulas for the sum of squares and the sum of integers.",
       "show": "$= \\frac{2n(n+1)(2n+1)}{6} - \\frac{n(n+1)}{2}$"
      },
      {
       "say": "Take out n times n plus 1 over 6. Inside the bracket we get 4n plus 2 minus 3.",
       "show": "$= \\frac{n(n+1)}{6}\\big[(4n+2)-3\\big] = \\frac{n(n+1)(4n-1)}{6}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Hence evaluate $\\displaystyle\\sum_{r=11}^{20} r(2r-1)$.",
     "answer": "$4815$",
     "ms": [
      "M1 use $S(20)-S(10)$",
      "A1 $5530$ and $715$",
      "A1 $4815$"
     ],
     "steps": [
      {
       "say": "Sum from 11 to 20 is the sum to 20 minus the sum to 10.",
       "show": "$S(20)-S(10)$"
      },
      {
       "say": "Substitute into the formula.",
       "show": "$S(20)=\\frac{20\\cdot21\\cdot79}{6}=5530,\\quad S(10)=\\frac{10\\cdot11\\cdot39}{6}=715$"
      },
      {
       "say": "Subtract.",
       "show": "$5530-715 = 4815$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "(i) Show that $\\dfrac{2}{r(r+2)} = \\dfrac{1}{r} - \\dfrac{1}{r+2}$.<br>(ii) Hence use the method of differences to find $\\displaystyle\\sum_{r=1}^{n} \\frac{2}{r(r+2)}$ in terms of $n$, and state the limit of the sum as $n \\to \\infty$.",
     "answer": "$\\frac{3}{2} - \\frac{1}{n+1} - \\frac{1}{n+2}$; limit $\\frac{3}{2}$",
     "ms": [
      "B1 (i) shown",
      "M1 write out terms, at least first three and last two",
      "M1 identify cancelling terms",
      "A1 $1+\\frac12$ remain at the start",
      "A1 $\\frac32 - \\frac{1}{n+1}-\\frac{1}{n+2}$",
      "B1 limit $\\frac32$"
     ],
     "steps": [
      {
       "say": "Combine the right-hand side over r times r plus 2: the numerator is r plus 2 minus r, which is 2.",
       "show": "$\\frac1r-\\frac1{r+2}=\\frac{(r+2)-r}{r(r+2)}=\\frac{2}{r(r+2)}$"
      },
      {
       "say": "Write out the terms. Each negative term cancels a positive term two places later.",
       "show": "$\\left(1-\\tfrac13\\right)+\\left(\\tfrac12-\\tfrac14\\right)+\\left(\\tfrac13-\\tfrac15\\right)+\\dots+\\left(\\tfrac1{n-1}-\\tfrac1{n+1}\\right)+\\left(\\tfrac1n-\\tfrac1{n+2}\\right)$"
      },
      {
       "say": "Only 1 and one half survive at the start, and minus 1 over n plus 1 and minus 1 over n plus 2 survive at the end.",
       "show": "$\\sum = \\frac32 - \\frac1{n+1} - \\frac1{n+2}$"
      },
      {
       "say": "As n grows, the last two fractions tend to zero, so the sum tends to three halves.",
       "show": "$\\to \\frac32$ as $n\\to\\infty$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "sr1",
    "sa1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Using the Maclaurin series for $e^x$ and $\\sin x$, find the series expansion of $e^x\\sin x$ up to and including the term in $x^3$.",
     "answer": "$x + x^2 + \\frac{x^3}{3}$",
     "ms": [
      "B1 both standard series quoted",
      "M1 multiply and collect terms up to $x^3$",
      "A1 $x + x^2$",
      "A1 $\\frac{x^3}{3}$"
     ],
     "steps": [
      {
       "say": "Write down the two standard series as far as x cubed.",
       "show": "$e^x = 1+x+\\frac{x^2}{2}+\\frac{x^3}{6}+\\dots,\\quad \\sin x = x - \\frac{x^3}{6}+\\dots$"
      },
      {
       "say": "Multiply, keeping only terms up to x cubed.",
       "show": "$\\left(1+x+\\frac{x^2}{2}\\right)\\left(x-\\frac{x^3}{6}\\right) = x + x^2 + \\frac{x^3}{2} - \\frac{x^3}{6}+\\dots$"
      },
      {
       "say": "Collect the x cubed terms: a half minus a sixth is a third.",
       "show": "$e^x\\sin x \\approx x + x^2 + \\frac{x^3}{3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Hence find $\\displaystyle\\lim_{x\\to0}\\frac{e^x\\sin x - x}{x^2}$.",
     "answer": "$1$",
     "ms": [
      "M1 substitute the series and divide by $x^2$",
      "A1 limit $=1$"
     ],
     "steps": [
      {
       "say": "Subtract x from the series and divide by x squared.",
       "show": "$\\frac{x^2+\\frac{x^3}{3}+\\dots}{x^2} = 1 + \\frac{x}{3}+\\dots$"
      },
      {
       "say": "As x tends to zero only the constant term remains.",
       "show": "limit $= 1$"
      },
      {
       "say": "So the limit is 1.",
       "show": "$\\lim = 1$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the first three non-zero terms in the Maclaurin series for $\\ln(1+2x)$ and state the range of values of $x$ for which the series is valid.",
     "answer": "$2x - 2x^2 + \\frac{8x^3}{3}$; $-\\frac12 \\lt x \\le \\frac12$",
     "ms": [
      "M1 replace $x$ by $2x$ in the series for $\\ln(1+x)$",
      "A1 $2x-2x^2+\\frac{8}{3}x^3$",
      "B1 $-\\frac12\\lt x\\le\\frac12$"
     ],
     "steps": [
      {
       "say": "Start from the standard series for ln of 1 plus x, valid for x greater than minus 1 and up to and including 1.",
       "show": "$\\ln(1+x) = x - \\frac{x^2}{2}+\\frac{x^3}{3}-\\dots,\\ \\ -1\\lt x\\le1$"
      },
      {
       "say": "Replace x by 2x.",
       "show": "$\\ln(1+2x) = 2x - \\frac{4x^2}{2} + \\frac{8x^3}{3} - \\dots = 2x - 2x^2 + \\frac{8x^3}{3}$"
      },
      {
       "say": "The validity condition becomes minus 1 less than 2x, which is at most 1. Halve throughout.",
       "show": "$-\\frac12 \\lt x \\le \\frac12$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Use small angle approximations to show that, for small $x$ (in radians), $\\dfrac{1-\\cos 2x}{x\\tan x} \\approx 2$.",
     "answer": "$\\frac{2x^2}{x^2} = 2$",
     "ms": [
      "M1 $\\cos2x \\approx 1 - \\frac{(2x)^2}{2}$",
      "M1 $\\tan x \\approx x$",
      "A1 $\\approx 2$ shown"
     ],
     "steps": [
      {
       "say": "For small angles, cos of 2x is about 1 minus 2x all squared over 2, which is 1 minus 2x squared.",
       "show": "$\\cos2x\\approx1-2x^2 \\Rightarrow 1-\\cos2x \\approx 2x^2$"
      },
      {
       "say": "Tan x is about x, so the denominator is about x squared.",
       "show": "$x\\tan x \\approx x^2$"
      },
      {
       "say": "Divide.",
       "show": "$\\frac{2x^2}{x^2} = 2$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "cx1",
    "cx2",
    "cx5"
   ],
   "q": "The complex number $z = 1 + \\sqrt3\\,i$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Express $z$ in the form $re^{i\\theta}$, where $r \\gt 0$ and $-\\pi \\lt \\theta \\le \\pi$.",
     "answer": "$2e^{i\\pi/3}$",
     "ms": [
      "B1 $r = 2$",
      "B1 $\\theta = \\frac{\\pi}{3}$"
     ],
     "steps": [
      {
       "say": "The modulus is the square root of 1 plus 3, which is 2.",
       "show": "$r = \\sqrt{1^2+(\\sqrt3)^2}=2$"
      },
      {
       "say": "The argument has tangent root 3 in the first quadrant, so it is pi over 3.",
       "show": "$\\theta=\\tan^{-1}\\sqrt3 = \\frac{\\pi}{3}$"
      },
      {
       "say": "So z equals 2 e to the i pi over 3.",
       "show": "$z = 2e^{i\\pi/3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Use De Moivre's theorem to find $z^4$ in the form $a+bi$.",
     "answer": "$-8-8\\sqrt3\\,i$",
     "ms": [
      "M1 $2^4 e^{4i\\pi/3}$",
      "M1 evaluate $\\cos\\frac{4\\pi}{3}$ and $\\sin\\frac{4\\pi}{3}$",
      "A1 $-8-8\\sqrt3\\,i$"
     ],
     "steps": [
      {
       "say": "Raise the modulus to the fourth power and multiply the argument by 4.",
       "show": "$z^4 = 16e^{4\\pi i/3}$"
      },
      {
       "say": "Four pi over three is in the third quadrant: cosine is minus a half and sine is minus root 3 over 2.",
       "show": "$=16\\left(-\\frac12 - \\frac{\\sqrt3}{2}i\\right)$"
      },
      {
       "say": "Multiply out.",
       "show": "$z^4 = -8-8\\sqrt3\\,i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "Use De Moivre's theorem to show that $\\cos3\\theta = 4\\cos^3\\theta - 3\\cos\\theta$.",
     "answer": "Shown.",
     "ms": [
      "M1 $(\\cos\\theta+i\\sin\\theta)^3 = \\cos3\\theta + i\\sin3\\theta$",
      "M1 binomial expansion of $(c+is)^3$",
      "A1 real part $c^3 - 3cs^2$",
      "M1 equate real parts",
      "M1 use $s^2 = 1-c^2$",
      "A1 $4c^3-3c$ shown"
     ],
     "steps": [
      {
       "say": "By De Moivre, cos 3 theta plus i sin 3 theta equals cos theta plus i sin theta, all cubed. Write c for cos theta and s for sin theta.",
       "show": "$\\cos3\\theta+i\\sin3\\theta = (c+is)^3$"
      },
      {
       "say": "Expand with the binomial theorem.",
       "show": "$(c+is)^3 = c^3 + 3c^2(is) + 3c(is)^2 + (is)^3 = c^3 + 3ic^2s - 3cs^2 - is^3$"
      },
      {
       "say": "Equate the real parts.",
       "show": "$\\cos3\\theta = c^3 - 3cs^2$"
      },
      {
       "say": "Replace s squared by 1 minus c squared and simplify.",
       "show": "$= c^3 - 3c(1-c^2) = 4c^3 - 3c$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "Let $w = e^{i\\pi/3}$. By summing a geometric series, show that $\\displaystyle\\sum_{r=0}^{5} w^r = 0$, and hence show that $\\displaystyle\\sum_{r=0}^{5}\\cos\\frac{r\\pi}{3} = 0$.",
     "answer": "Shown.",
     "ms": [
      "M1 $\\frac{1-w^6}{1-w}$",
      "A1 $w^6 = e^{2\\pi i} = 1$ so the sum is $0$",
      "M1 $w^r = \\cos\\frac{r\\pi}{3}+i\\sin\\frac{r\\pi}{3}$ by De Moivre",
      "A1 equate real parts to obtain $0$"
     ],
     "steps": [
      {
       "say": "The sum is a geometric series with first term 1 and common ratio w, which is not 1.",
       "show": "$\\sum_{r=0}^{5}w^r = \\frac{1-w^6}{1-w}$"
      },
      {
       "say": "W to the 6 is e to the 2 pi i, which equals 1, so the numerator is zero.",
       "show": "$w^6 = e^{2\\pi i} = 1 \\Rightarrow \\sum w^r = 0$"
      },
      {
       "say": "By De Moivre, each w to the r is cos of r pi over 3 plus i sin of r pi over 3.",
       "show": "$\\sum_{r=0}^{5}\\left(\\cos\\frac{r\\pi}{3}+i\\sin\\frac{r\\pi}{3}\\right) = 0$"
      },
      {
       "say": "The real part of zero is zero, so the cosines add to zero.",
       "show": "$\\sum_{r=0}^{5}\\cos\\frac{r\\pi}{3} = 0$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "cx3"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Solve the equation $z^3 = 8i$, giving your answers in the form $a + bi$.",
     "answer": "$\\sqrt3 + i,\\ -\\sqrt3+i,\\ -2i$",
     "ms": [
      "B1 $8i = 8e^{i\\pi/2}$",
      "M1 $|z| = 2$",
      "M1 arguments $\\frac{\\pi}{6} + \\frac{2k\\pi}{3}$",
      "A1 two correct roots",
      "A1 all three correct"
     ],
     "steps": [
      {
       "say": "Write 8i in exponential form: modulus 8, argument pi over 2.",
       "show": "$8i = 8e^{i(\\pi/2 + 2k\\pi)}$"
      },
      {
       "say": "Take the cube root of the modulus, and divide the argument by 3, adding multiples of 2 pi over 3.",
       "show": "$z = 2e^{i(\\pi/6 + 2k\\pi/3)},\\ k=0,1,2$"
      },
      {
       "say": "The arguments are pi over 6, 5 pi over 6 and minus pi over 2.",
       "show": "$\\theta = \\frac{\\pi}{6},\\ \\frac{5\\pi}{6},\\ -\\frac{\\pi}{2}$"
      },
      {
       "say": "Convert each to Cartesian form.",
       "show": "$z=\\sqrt3+i,\\ \\ -\\sqrt3+i,\\ \\ -2i$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The roots are represented by points in an Argand diagram. State the shape formed by joining the points and find its exact area.",
     "answer": "Equilateral triangle, area $3\\sqrt3$",
     "ms": [
      "B1 equilateral triangle",
      "M1 side $2\\sqrt3$ or area of three triangles $3\\times\\frac12\\cdot2\\cdot2\\sin\\frac{2\\pi}{3}$",
      "A1 $3\\sqrt3$"
     ],
     "steps": [
      {
       "say": "The three roots are equally spaced on a circle of radius 2, so they form an equilateral triangle.",
       "show": "Regular 3-gon: equilateral triangle on the circle $|z|=2$"
      },
      {
       "say": "Split the triangle into three triangles from the origin, each with two sides of 2 and an angle of 2 pi over 3.",
       "show": "Area $= 3\\times\\frac12\\cdot2\\cdot2\\cdot\\sin\\frac{2\\pi}{3}$"
      },
      {
       "say": "Sine of 2 pi over 3 is root 3 over 2, giving 3 root 3.",
       "show": "$= 6\\cdot\\frac{\\sqrt3}{2} = 3\\sqrt3$"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "ca5",
    "ca1",
    "ca2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Evaluate the improper integral $\\displaystyle\\int_1^{\\infty}\\frac{1}{x^3}\\,dx$, showing the limiting process.",
     "answer": "$\\frac12$",
     "ms": [
      "M1 replace $\\infty$ by $t$ and integrate to $-\\frac{1}{2x^2}$",
      "M1 let $t\\to\\infty$ with $\\frac{1}{2t^2}\\to0$",
      "A1 $\\frac12$"
     ],
     "steps": [
      {
       "say": "Replace the infinite limit by t and integrate.",
       "show": "$\\int_1^t x^{-3}dx = \\left[-\\frac{1}{2x^2}\\right]_1^t = \\frac12 - \\frac{1}{2t^2}$"
      },
      {
       "say": "As t tends to infinity, 1 over 2t squared tends to zero.",
       "show": "$\\frac{1}{2t^2}\\to 0$"
      },
      {
       "say": "So the integral converges to one half.",
       "show": "$\\int_1^\\infty x^{-3}dx = \\frac12$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Evaluate $\\displaystyle\\int_0^{4}\\frac{1}{\\sqrt x}\\,dx$, explaining why it is an improper integral.",
     "answer": "$4$",
     "ms": [
      "B1 integrand undefined at $x=0$",
      "M1 $\\big[2\\sqrt x\\big]_a^4$ with $a\\to0^+$",
      "A1 $4$"
     ],
     "steps": [
      {
       "say": "The integrand is not defined at x equals zero, so the integral is improper. Use a lower limit a and let a tend to zero.",
       "show": "$\\int_a^4 x^{-1/2}dx = \\big[2\\sqrt x\\big]_a^4 = 4 - 2\\sqrt a$"
      },
      {
       "say": "As a tends to zero from above, 2 root a tends to zero.",
       "show": "$2\\sqrt a \\to 0$"
      },
      {
       "say": "So the integral equals 4.",
       "show": "$=4$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Differentiate $\\sin^{-1}(3x)$ with respect to $x$.",
     "answer": "$\\frac{3}{\\sqrt{1-9x^2}}$",
     "ms": [
      "M1 $\\frac{1}{\\sqrt{1-u^2}}$ with chain rule",
      "A1 $\\frac{3}{\\sqrt{1-9x^2}}$"
     ],
     "steps": [
      {
       "say": "The derivative of inverse sine of u is 1 over root of 1 minus u squared, times du by dx.",
       "show": "$\\frac{d}{dx}\\sin^{-1}u = \\frac{u'}{\\sqrt{1-u^2}}$"
      },
      {
       "say": "Here u is 3x, so u dash is 3.",
       "show": "$\\frac{3}{\\sqrt{1-(3x)^2}}$"
      },
      {
       "say": "Simplify.",
       "show": "$=\\frac{3}{\\sqrt{1-9x^2}}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 6,
     "q": "Find the exact value of (i) $\\displaystyle\\int_0^{3/2}\\frac{1}{\\sqrt{9-x^2}}\\,dx$ (ii) $\\displaystyle\\int_0^{2}\\frac{1}{4+x^2}\\,dx$.",
     "answer": "(i) $\\frac{\\pi}{6}$ (ii) $\\frac{\\pi}{8}$",
     "ms": [
      "M1 (i) $\\sin^{-1}\\frac{x}{3}$",
      "M1 (i) substitute limits",
      "A1 (i) $\\frac{\\pi}{6}$",
      "M1 (ii) $\\frac12\\tan^{-1}\\frac{x}{2}$",
      "M1 (ii) substitute limits",
      "A1 (ii) $\\frac{\\pi}{8}$"
     ],
     "steps": [
      {
       "say": "The first integral is a standard form with a equals 3.",
       "show": "$\\int\\frac{dx}{\\sqrt{9-x^2}} = \\sin^{-1}\\frac{x}{3}$"
      },
      {
       "say": "At three halves we get inverse sine of a half, which is pi over 6; at zero we get zero.",
       "show": "$\\sin^{-1}\\frac12 - 0 = \\frac{\\pi}{6}$"
      },
      {
       "say": "The second is the other standard form with a equals 2.",
       "show": "$\\int\\frac{dx}{4+x^2} = \\frac12\\tan^{-1}\\frac{x}{2}$"
      },
      {
       "say": "At 2 we get a half times pi over 4.",
       "show": "$\\frac12\\tan^{-1}1 - 0 = \\frac{\\pi}{8}$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "ca7",
    "ca3"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Use integration by parts twice to find $\\displaystyle\\int x^2e^x\\,dx$.",
     "answer": "$e^x(x^2-2x+2)+c$",
     "ms": [
      "M1 first application: $x^2e^x - \\int 2xe^x\\,dx$",
      "A1 correct",
      "M1 second application on $\\int 2xe^x\\,dx$",
      "A1 $2xe^x - 2e^x$",
      "A1 $x^2e^x - 2xe^x + 2e^x$",
      "B1 $+c$ and tidy form"
     ],
     "steps": [
      {
       "say": "Let u be x squared and dv be e to the x. Then du is 2x and v is e to the x.",
       "show": "$\\int x^2e^x dx = x^2e^x - \\int 2xe^x dx$"
      },
      {
       "say": "Apply parts again to 2x e to the x, with u equal to 2x.",
       "show": "$\\int 2xe^x dx = 2xe^x - \\int 2e^x dx = 2xe^x - 2e^x$"
      },
      {
       "say": "Substitute back, minding the minus sign.",
       "show": "$\\int x^2e^x dx = x^2e^x - 2xe^x + 2e^x + c$"
      },
      {
       "say": "Factorise.",
       "show": "$= e^x(x^2-2x+2)+c$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Given $I_n = \\displaystyle\\int_0^1 x^n e^x\\,dx$, show that $I_n = e - nI_{n-1}$ for $n \\ge 1$.",
     "answer": "Shown.",
     "ms": [
      "M1 parts with $u = x^n$, $dv = e^x$",
      "A1 $\\big[x^ne^x\\big]_0^1 = e$",
      "A1 $I_n = e - nI_{n-1}$"
     ],
     "steps": [
      {
       "say": "Integrate by parts with u equal to x to the n.",
       "show": "$I_n = \\big[x^ne^x\\big]_0^1 - \\int_0^1 nx^{n-1}e^x dx$"
      },
      {
       "say": "The bracket is e at the top and 0 at the bottom, since n is at least 1.",
       "show": "$\\big[x^ne^x\\big]_0^1 = e - 0$"
      },
      {
       "say": "The remaining integral is n times I n minus 1.",
       "show": "$I_n = e - nI_{n-1}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Hence find $I_3$ in terms of $e$.",
     "answer": "$I_3 = 6 - 2e$",
     "ms": [
      "B1 $I_0 = e-1$",
      "M1 use the formula repeatedly",
      "A1 $6-2e$"
     ],
     "steps": [
      {
       "say": "Start with I zero, the integral of e to the x from 0 to 1, which is e minus 1.",
       "show": "$I_0 = e-1$"
      },
      {
       "say": "Apply the formula to get I 1 and I 2.",
       "show": "$I_1 = e - (e-1) = 1,\\quad I_2 = e - 2(1) = e-2$"
      },
      {
       "say": "Then I 3.",
       "show": "$I_3 = e - 3(e-2) = 6-2e$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "pl1",
    "pl2"
   ],
   "q": "The curve $C$ has polar equation $r = 2(1+\\cos\\theta)$, $0 \\le \\theta \\lt 2\\pi$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the Cartesian coordinates of the point on $C$ where $\\theta = \\frac{\\pi}{3}$.",
     "answer": "$(\\tfrac32, \\tfrac{3\\sqrt3}{2})$",
     "ms": [
      "M1 $r = 3$ and use of $x = r\\cos\\theta,\\ y = r\\sin\\theta$",
      "A1 $\\left(\\frac32,\\frac{3\\sqrt3}{2}\\right)$"
     ],
     "steps": [
      {
       "say": "At theta equals pi over 3, r is 2 times 1 plus a half, which is 3.",
       "show": "$r = 2(1+\\tfrac12) = 3$"
      },
      {
       "say": "Convert using x equals r cos theta and y equals r sin theta.",
       "show": "$x = 3\\cos\\frac{\\pi}{3} = \\frac32,\\quad y = 3\\sin\\frac{\\pi}{3} = \\frac{3\\sqrt3}{2}$"
      },
      {
       "say": "So the point is three halves, 3 root 3 over 2.",
       "show": "$\\left(\\frac32,\\frac{3\\sqrt3}{2}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Show that the area enclosed by $C$ is $6\\pi$.",
     "answer": "$6\\pi$",
     "ms": [
      "M1 $\\frac12\\int r^2\\,d\\theta$ with correct limits",
      "M1 expand $(1+\\cos\\theta)^2$",
      "M1 use $\\cos^2\\theta = \\frac12(1+\\cos2\\theta)$",
      "A1 correct integration",
      "M1 substitute limits",
      "A1 $6\\pi$"
     ],
     "steps": [
      {
       "say": "Area is a half the integral of r squared, over a full turn.",
       "show": "$A = \\frac12\\int_0^{2\\pi} 4(1+\\cos\\theta)^2\\,d\\theta = 2\\int_0^{2\\pi}(1+2\\cos\\theta+\\cos^2\\theta)\\,d\\theta$"
      },
      {
       "say": "Use the double angle identity for cos squared.",
       "show": "$=2\\int_0^{2\\pi}\\left(\\frac32 + 2\\cos\\theta + \\frac12\\cos2\\theta\\right)d\\theta$"
      },
      {
       "say": "Integrate.",
       "show": "$=2\\left[\\frac32\\theta + 2\\sin\\theta + \\frac14\\sin2\\theta\\right]_0^{2\\pi}$"
      },
      {
       "say": "The sine terms vanish at both limits, leaving 2 times 3 pi.",
       "show": "$=2(3\\pi) = 6\\pi$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The curve $D$ has polar equation $r = 4\\cos\\theta$. Find a Cartesian equation for $D$ and describe $D$.",
     "answer": "$(x-2)^2+y^2 = 4$: circle, centre $(2,0)$, radius 2",
     "ms": [
      "M1 multiply by $r$: $r^2 = 4r\\cos\\theta$",
      "A1 $x^2+y^2=4x$",
      "A1 circle centre $(2,0)$, radius $2$"
     ],
     "steps": [
      {
       "say": "Multiply both sides by r so we can use r squared equals x squared plus y squared and r cos theta equals x.",
       "show": "$r^2 = 4r\\cos\\theta \\Rightarrow x^2+y^2 = 4x$"
      },
      {
       "say": "Complete the square in x.",
       "show": "$(x-2)^2 + y^2 = 4$"
      },
      {
       "say": "This is a circle with centre 2, 0 and radius 2.",
       "show": "Circle, centre $(2,0)$, radius $2$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Find the values of $\\theta$, $-\\pi \\lt \\theta \\le \\pi$, at which $C$ meets the circle $r = 3$.",
     "answer": "$\\theta = \\pm\\frac{\\pi}{3}$",
     "ms": [
      "M1 $2+2\\cos\\theta = 3$",
      "A1 $\\pm\\frac{\\pi}{3}$"
     ],
     "steps": [
      {
       "say": "Set the two expressions for r equal.",
       "show": "$2(1+\\cos\\theta) = 3$"
      },
      {
       "say": "So cos theta is a half.",
       "show": "$\\cos\\theta = \\frac12$"
      },
      {
       "say": "In the given range that gives plus or minus pi over 3.",
       "show": "$\\theta = \\pm\\frac{\\pi}{3}$"
      }
     ]
    }
   ]
  },
  {
   "n": 10,
   "points": [
    "hy1",
    "hy2",
    "hy3",
    "hy4",
    "hy5"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Using the definitions in terms of exponentials, show that $\\cosh^2x - \\sinh^2x = 1$.",
     "answer": "Shown.",
     "ms": [
      "M1 both definitions used and squared",
      "M1 subtract",
      "A1 $=1$ shown"
     ],
     "steps": [
      {
       "say": "Write cosh and sinh using exponentials.",
       "show": "$\\cosh x = \\frac{e^x+e^{-x}}{2},\\quad \\sinh x = \\frac{e^x-e^{-x}}{2}$"
      },
      {
       "say": "Square each.",
       "show": "$\\cosh^2x = \\frac{e^{2x}+2+e^{-2x}}{4},\\quad \\sinh^2x = \\frac{e^{2x}-2+e^{-2x}}{4}$"
      },
      {
       "say": "Subtracting, everything cancels except 2 plus 2 over 4.",
       "show": "$\\cosh^2x-\\sinh^2x = \\frac{4}{4}=1$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Solve $2\\cosh x - \\sinh x = 2$, giving exact answers.",
     "answer": "$x = 0$ or $x = \\ln 3$",
     "ms": [
      "M1 substitute exponential definitions",
      "A1 $\\frac12e^x + \\frac32e^{-x} = 2$",
      "M1 form quadratic in $e^x$",
      "A1 $e^{2x}-4e^x+3=0$",
      "A1 $x=0,\\ \\ln3$"
     ],
     "steps": [
      {
       "say": "Substitute the exponential forms.",
       "show": "$(e^x+e^{-x}) - \\frac12(e^x - e^{-x}) = 2$"
      },
      {
       "say": "Simplify: a half e to the x plus three halves e to the minus x equals 2.",
       "show": "$\\frac12e^x+\\frac32e^{-x}=2$"
      },
      {
       "say": "Multiply by 2 e to the x to get a quadratic in e to the x.",
       "show": "$e^{2x}-4e^x+3=0 \\Rightarrow (e^x-1)(e^x-3)=0$"
      },
      {
       "say": "So e to the x is 1 or 3.",
       "show": "$x = 0$ or $x=\\ln3$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the exact value of $\\displaystyle\\int_0^1 x\\cosh x\\,dx$, giving your answer in terms of $e$.",
     "answer": "$1 - e^{-1}$",
     "ms": [
      "M1 parts: $x\\sinh x - \\int\\sinh x\\,dx$",
      "A1 $x\\sinh x - \\cosh x$",
      "M1 substitute limits",
      "A1 $1-\\frac1e$"
     ],
     "steps": [
      {
       "say": "Integrate by parts with u equal to x.",
       "show": "$\\int x\\cosh x\\,dx = x\\sinh x - \\int\\sinh x\\,dx = x\\sinh x - \\cosh x$"
      },
      {
       "say": "Substitute the limits.",
       "show": "$(\\sinh1 - \\cosh1) - (0 - 1)$"
      },
      {
       "say": "Sinh 1 minus cosh 1 equals minus e to the minus 1.",
       "show": "$=-e^{-1}+1 = 1-\\frac1e$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "Show that $\\sinh^{-1}x = \\ln\\left(x+\\sqrt{x^2+1}\\right)$.",
     "answer": "Shown.",
     "ms": [
      "M1 $y=\\sinh^{-1}x \\Rightarrow x = \\frac{e^y-e^{-y}}{2}$",
      "M1 quadratic $e^{2y}-2xe^y-1=0$",
      "A1 $e^y = x\\pm\\sqrt{x^2+1}$",
      "A1 reject negative root and take logs"
     ],
     "steps": [
      {
       "say": "Let y be inverse sinh x, so x is sinh y.",
       "show": "$x = \\frac{e^y-e^{-y}}{2}$"
      },
      {
       "say": "Multiply by 2 e to the y to get a quadratic in e to the y.",
       "show": "$e^{2y} - 2xe^y - 1 = 0$"
      },
      {
       "say": "Solve with the quadratic formula.",
       "show": "$e^y = x \\pm\\sqrt{x^2+1}$"
      },
      {
       "say": "The minus sign gives a negative value, but e to the y is positive, so take the plus sign and then logs.",
       "show": "$y = \\ln\\left(x+\\sqrt{x^2+1}\\right)$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "Find the exact value of $\\displaystyle\\int_0^3\\frac{1}{\\sqrt{x^2+9}}\\,dx$ in logarithmic form.",
     "answer": "$\\ln(1+\\sqrt2)$",
     "ms": [
      "M1 $\\sinh^{-1}\\frac{x}{3}$",
      "M1 $\\sinh^{-1}1$",
      "A1 $\\ln(1+\\sqrt2)$"
     ],
     "steps": [
      {
       "say": "This is a standard form with a equals 3.",
       "show": "$\\int\\frac{dx}{\\sqrt{x^2+9}} = \\sinh^{-1}\\frac{x}{3}$"
      },
      {
       "say": "Between 0 and 3 we get inverse sinh of 1.",
       "show": "$\\sinh^{-1}1 - 0$"
      },
      {
       "say": "Use the log form from part d.",
       "show": "$=\\ln(1+\\sqrt2)$"
      }
     ]
    }
   ]
  },
  {
   "n": 11,
   "points": [
    "de1",
    "de4"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "Find the solution of $\\dfrac{dy}{dx} + \\dfrac{2y}{x} = x$, $x \\gt 0$, for which $y = 1$ when $x = 1$.",
     "answer": "$y = \\frac{x^2}{4} + \\frac{3}{4x^2}$",
     "ms": [
      "M1 integrating factor $e^{\\int 2/x\\,dx}$",
      "A1 $x^2$",
      "M1 $\\frac{d}{dx}(x^2y) = x^3$",
      "A1 $x^2y = \\frac{x^4}{4}+c$",
      "M1 use $y(1)=1$",
      "A1 $c=\\frac34$",
      "A1 $y = \\frac{x^2}{4}+\\frac{3}{4x^2}$"
     ],
     "steps": [
      {
       "say": "The equation is linear, with P of x equal to 2 over x. The integrating factor is e to the integral of 2 over x.",
       "show": "$\\text{IF} = e^{2\\ln x} = x^2$"
      },
      {
       "say": "Multiply through: the left side becomes the derivative of x squared y.",
       "show": "$\\frac{d}{dx}(x^2y) = x^3$"
      },
      {
       "say": "Integrate both sides.",
       "show": "$x^2y = \\frac{x^4}{4} + c$"
      },
      {
       "say": "Use y equals 1 when x equals 1: 1 equals a quarter plus c.",
       "show": "$c = \\frac34$"
      },
      {
       "say": "Divide by x squared.",
       "show": "$y = \\frac{x^2}{4} + \\frac{3}{4x^2}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "A particle moves in a straight line. Its velocity $v$ m s$^{-1}$ at time $t$ s is modelled by $\\dfrac{dv}{dt} + 2v = 10$, with $v = 0$ when $t = 0$. Find $v$ in terms of $t$ and state the speed the particle approaches in the long run.",
     "answer": "$v = 5(1-e^{-2t})$; approaches $5$ m s$^{-1}$",
     "ms": [
      "M1 IF $e^{2t}$",
      "A1 $ve^{2t} = 5e^{2t} + c$",
      "M1 use $v(0)=0$",
      "A1 $v = 5-5e^{-2t}$",
      "B1 $5$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The integrating factor is e to the 2t.",
       "show": "$\\frac{d}{dt}(ve^{2t}) = 10e^{2t}$"
      },
      {
       "say": "Integrate.",
       "show": "$ve^{2t} = 5e^{2t}+c$"
      },
      {
       "say": "At t equals 0, v is 0, so c is minus 5.",
       "show": "$0 = 5 + c \\Rightarrow c=-5$"
      },
      {
       "say": "Divide by e to the 2t. As t grows, the exponential term dies away.",
       "show": "$v = 5(1 - e^{-2t}) \\to 5$"
      }
     ]
    }
   ]
  },
  {
   "n": 12,
   "points": [
    "de2",
    "de3"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the complementary function for $\\dfrac{d^2y}{dx^2} - 5\\dfrac{dy}{dx} + 6y = 12$.",
     "answer": "$y_c = Ae^{2x}+Be^{3x}$",
     "ms": [
      "M1 auxiliary equation $m^2-5m+6=0$",
      "A1 $Ae^{2x}+Be^{3x}$"
     ],
     "steps": [
      {
       "say": "Write down the auxiliary equation.",
       "show": "$m^2 - 5m + 6 = 0$"
      },
      {
       "say": "It factorises with roots 2 and 3.",
       "show": "$(m-2)(m-3)=0$"
      },
      {
       "say": "Two distinct real roots give two exponentials.",
       "show": "$y_c = Ae^{2x}+Be^{3x}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find a particular integral and hence write down the general solution.",
     "answer": "$y = Ae^{2x}+Be^{3x}+2$",
     "ms": [
      "M1 try $y = k$",
      "A1 $k=2$ and general solution"
     ],
     "steps": [
      {
       "say": "The right side is a constant, so try y equals a constant k.",
       "show": "$y=k \\Rightarrow 6k = 12$"
      },
      {
       "say": "So k is 2.",
       "show": "$y_p = 2$"
      },
      {
       "say": "Add the complementary function.",
       "show": "$y = Ae^{2x}+Be^{3x}+2$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the particular solution for which $y = 0$ and $\\dfrac{dy}{dx} = 1$ when $x = 0$.",
     "answer": "$y = 5e^{3x} - 7e^{2x} + 2$",
     "ms": [
      "M1 $A + B + 2 = 0$",
      "M1 differentiate: $2A+3B = 1$",
      "A1 $A=-7,\\ B=5$",
      "A1 $y = 5e^{3x}-7e^{2x}+2$"
     ],
     "steps": [
      {
       "say": "Put x equals 0 in the general solution.",
       "show": "$0 = A + B + 2$"
      },
      {
       "say": "Differentiate and put x equals 0.",
       "show": "$y' = 2Ae^{2x}+3Be^{3x} \\Rightarrow 1 = 2A+3B$"
      },
      {
       "say": "Solve the pair: A is minus 7 and B is 5.",
       "show": "$A=-7,\\ B=5$"
      },
      {
       "say": "Write the particular solution.",
       "show": "$y = 5e^{3x}-7e^{2x}+2$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Without solving fully, use the discriminant of the auxiliary equation to state the form of the general solution of $\\dfrac{d^2y}{dx^2} + 2\\dfrac{dy}{dx} + 5y = 0$.",
     "answer": "$y = e^{-x}(A\\cos2x + B\\sin2x)$",
     "ms": [
      "M1 discriminant $4 - 20 \\lt 0$",
      "A1 roots $-1\\pm2i$",
      "A1 $e^{-x}(A\\cos2x+B\\sin2x)$"
     ],
     "steps": [
      {
       "say": "The auxiliary equation is m squared plus 2m plus 5 equals 0. Its discriminant is 4 minus 20, which is negative.",
       "show": "$b^2-4ac = 4-20 = -16 \\lt 0$"
      },
      {
       "say": "So the roots are complex: minus 1 plus or minus 2i.",
       "show": "$m = -1\\pm2i$"
      },
      {
       "say": "Complex roots p plus or minus qi give e to the px times a combination of cos qx and sin qx.",
       "show": "$y = e^{-x}(A\\cos2x+B\\sin2x)$"
      }
     ]
    }
   ]
  }
 ]
});
BCSP.add({
 "id": "fm-medium",
 "unit": "fm",
 "level": "medium",
 "title": "Further Maths A2 1 · Paper B (Medium)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "pi1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "The matrix $\\mathbf{A} = \\begin{pmatrix} 3 & -2 \\\\ 2 & -1 \\end{pmatrix}$. Prove by induction that, for all positive integers $n$, $$\\mathbf{A}^n = \\begin{pmatrix} 2n+1 & -2n \\\\ 2n & 1-2n \\end{pmatrix}.$$",
     "answer": "Proved by induction.",
     "ms": [
      "B1 $n=1$ gives $\\mathbf{A}$",
      "M1 assume true for $n=k$",
      "M1 form $\\mathbf{A}^{k+1} = \\mathbf{A}^k\\mathbf{A}$ (or $\\mathbf{A}\\mathbf{A}^k$)",
      "A1 one row of the product correct",
      "A1 all four entries correct: $\\begin{pmatrix} 2k+3 & -2k-2 \\\\ 2k+2 & -2k-1\\end{pmatrix}$",
      "M1 shows this matches the formula with $n = k+1$",
      "A1 full conclusion"
     ],
     "steps": [
      {
       "say": "For n equals 1 the formula gives 3, minus 2, 2, minus 1, which is A itself.",
       "show": "$n=1$: $\\begin{pmatrix} 3 & -2 \\\\ 2 & -1\\end{pmatrix} = \\mathbf{A}$ ✓"
      },
      {
       "say": "Assume the formula holds for n equals k, and multiply by A on the right.",
       "show": "$\\mathbf{A}^{k+1} = \\begin{pmatrix} 2k+1 & -2k \\\\ 2k & 1-2k \\end{pmatrix}\\begin{pmatrix} 3 & -2 \\\\ 2 & -1 \\end{pmatrix}$"
      },
      {
       "say": "Multiply out each entry.",
       "show": "$= \\begin{pmatrix} 3(2k+1)-4k & -2(2k+1)+2k \\\\ 6k+2(1-2k) & -4k-(1-2k) \\end{pmatrix} = \\begin{pmatrix} 2k+3 & -2k-2 \\\\ 2k+2 & -2k-1 \\end{pmatrix}$"
      },
      {
       "say": "Compare with the formula when n is k plus 1: 2 of k plus 1, plus 1 is 2k plus 3, and so on. They match.",
       "show": "$\\begin{pmatrix} 2(k+1)+1 & -2(k+1) \\\\ 2(k+1) & 1-2(k+1) \\end{pmatrix}$ ✓"
      },
      {
       "say": "True for 1, and true for k implies true for k plus 1, so true for all positive integers n.",
       "show": "Conclusion by induction"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Prove by induction that $3^{2n} + 7$ is divisible by $8$ for all positive integers $n$.",
     "answer": "$f(k+1) = 9f(k) - 56$, so divisible by 8.",
     "ms": [
      "B1 $f(1) = 16$",
      "M1 assume $f(k) = 3^{2k}+7 = 8m$",
      "M1 express $f(k+1)$ using $f(k)$",
      "A1 $f(k+1) = 9f(k) - 56$",
      "A1 $= 8(9m - 7)$",
      "B1 conclusion"
     ],
     "steps": [
      {
       "say": "When n equals 1, 9 plus 7 is 16, which is 8 times 2.",
       "show": "$f(1) = 9+7 = 16 = 8\\times2$ ✓"
      },
      {
       "say": "Assume f of k is a multiple of 8.",
       "show": "$3^{2k}+7 = 8m$"
      },
      {
       "say": "Write f of k plus 1 as 9 times 3 to the 2k, plus 7, and rewrite in terms of f of k.",
       "show": "$f(k+1) = 9\\cdot3^{2k}+7 = 9(3^{2k}+7) - 56$"
      },
      {
       "say": "Both 9 times 8m and 56 are multiples of 8, so f of k plus 1 is divisible by 8. Conclude by induction.",
       "show": "$= 72m - 56 = 8(9m-7)$ ✓"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "al1",
    "ca6"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Express $\\dfrac{x^2+2x+9}{(x-1)(x^2+3)}$ in partial fractions.",
     "answer": "$\\dfrac{3}{x-1} - \\dfrac{2x}{x^2+3}$",
     "ms": [
      "M1 form $\\frac{A}{x-1}+\\frac{Bx+C}{x^2+3}$",
      "A1 $A=3$",
      "M1 method for $B$ and $C$",
      "A1 $B=-2,\\ C=0$"
     ],
     "steps": [
      {
       "say": "Use a constant over the linear factor and a linear numerator over the quadratic factor.",
       "show": "$x^2+2x+9 = A(x^2+3)+(Bx+C)(x-1)$"
      },
      {
       "say": "Put x equals 1: 12 equals 4A, so A is 3.",
       "show": "$x=1:\\ 12 = 4A \\Rightarrow A=3$"
      },
      {
       "say": "Subtract 3 times x squared plus 3: what is left is minus 2x squared plus 2x, which is minus 2x times x minus 1.",
       "show": "$-2x^2+2x = -2x(x-1) \\Rightarrow B=-2,\\ C=0$"
      },
      {
       "say": "Write the answer.",
       "show": "$\\frac{3}{x-1} - \\frac{2x}{x^2+3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Hence show that $\\displaystyle\\int_2^3 \\frac{x^2+2x+9}{(x-1)(x^2+3)}\\,dx = \\ln\\frac{14}{3}$.",
     "answer": "$\\ln\\frac{14}{3}$",
     "ms": [
      "A1 $3\\ln(x-1)$",
      "A1 $-\\ln(x^2+3)$",
      "M1 substitute limits",
      "M1 combine logarithms",
      "A1 $\\ln\\frac{14}{3}$"
     ],
     "steps": [
      {
       "say": "Integrate each fraction. The second has the derivative of its denominator on top.",
       "show": "$\\big[3\\ln(x-1) - \\ln(x^2+3)\\big]_2^3$"
      },
      {
       "say": "Substitute 3 and 2.",
       "show": "$(3\\ln2 - \\ln12) - (0 - \\ln7)$"
      },
      {
       "say": "Combine into one logarithm: 8 times 7 over 12.",
       "show": "$=\\ln\\frac{8\\times7}{12} = \\ln\\frac{14}{3}$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "al2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Use the method of differences to show that $\\displaystyle\\sum_{r=1}^{n}\\frac{1}{(2r-1)(2r+1)} = \\frac{n}{2n+1}$.",
     "answer": "$\\frac{n}{2n+1}$",
     "ms": [
      "M1 partial fractions $\\frac12\\left(\\frac{1}{2r-1}-\\frac{1}{2r+1}\\right)$",
      "A1 correct",
      "M1 list terms showing cancellation",
      "M1 $\\frac12\\left(1 - \\frac{1}{2n+1}\\right)$",
      "A1 $\\frac{n}{2n+1}$"
     ],
     "steps": [
      {
       "say": "Split into partial fractions.",
       "show": "$\\frac{1}{(2r-1)(2r+1)} = \\frac12\\left(\\frac{1}{2r-1}-\\frac{1}{2r+1}\\right)$"
      },
      {
       "say": "Write out the terms. Each negative part cancels the positive part of the next term.",
       "show": "$\\frac12\\left[\\left(1-\\tfrac13\\right)+\\left(\\tfrac13-\\tfrac15\\right)+\\dots+\\left(\\tfrac1{2n-1}-\\tfrac1{2n+1}\\right)\\right]$"
      },
      {
       "say": "Only the first and last pieces survive.",
       "show": "$=\\frac12\\left(1-\\frac{1}{2n+1}\\right) = \\frac12\\cdot\\frac{2n}{2n+1} = \\frac{n}{2n+1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the smallest value of $n$ for which the sum exceeds $0.499$.",
     "answer": "$n = 250$",
     "ms": [
      "M1 $\\frac{n}{2n+1} \\gt 0.499$",
      "M1 rearrange to $0.002n \\gt 0.499$",
      "A1 $n = 250$"
     ],
     "steps": [
      {
       "say": "Set up the inequality.",
       "show": "$\\frac{n}{2n+1}\\gt0.499 \\Rightarrow n \\gt 0.998n + 0.499$"
      },
      {
       "say": "Collect the n terms.",
       "show": "$0.002n \\gt 0.499 \\Rightarrow n \\gt 249.5$"
      },
      {
       "say": "The smallest integer is 250.",
       "show": "$n = 250$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Show that $\\displaystyle\\sum_{r=n+1}^{2n} r^2 = \\frac{n(2n+1)(7n+1)}{6}$.",
     "answer": "Shown.",
     "ms": [
      "M1 $S(2n) - S(n)$",
      "A1 $\\frac{2n(2n+1)(4n+1)}{6} - \\frac{n(n+1)(2n+1)}{6}$",
      "M1 factorise $\\frac{n(2n+1)}{6}$",
      "A1 $\\frac{n(2n+1)(7n+1)}{6}$"
     ],
     "steps": [
      {
       "say": "The sum from n plus 1 to 2n is the sum to 2n minus the sum to n.",
       "show": "$\\sum_{r=1}^{2n}r^2 - \\sum_{r=1}^{n}r^2$"
      },
      {
       "say": "Use the sum of squares formula with 2n and with n.",
       "show": "$\\frac{2n(2n+1)(4n+1)}{6}-\\frac{n(n+1)(2n+1)}{6}$"
      },
      {
       "say": "Take out n times 2n plus 1 over 6. Inside: 8n plus 2 minus n minus 1.",
       "show": "$\\frac{n(2n+1)}{6}\\big[2(4n+1)-(n+1)\\big] = \\frac{n(2n+1)(7n+1)}{6}$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "sr1",
    "sa1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Find the Maclaurin series for $\\ln(\\cos x)$ up to and including the term in $x^4$.",
     "answer": "$-\\frac{x^2}{2} - \\frac{x^4}{12}$",
     "ms": [
      "M1 write $\\cos x = 1 + u$ with $u = -\\frac{x^2}{2}+\\frac{x^4}{24}$",
      "M1 use $\\ln(1+u) = u - \\frac{u^2}{2}+\\dots$",
      "A1 $u^2 = \\frac{x^4}{4}+\\dots$",
      "A1 $-\\frac{x^2}{2}$",
      "A1 $-\\frac{x^4}{12}$"
     ],
     "steps": [
      {
       "say": "Write cos x as 1 plus u, where u is the rest of the cosine series.",
       "show": "$\\cos x = 1 + u,\\ \\ u = -\\frac{x^2}{2}+\\frac{x^4}{24}-\\dots$"
      },
      {
       "say": "Use the log series in u. Only u and u squared matter up to x to the fourth.",
       "show": "$\\ln(1+u) = u - \\frac{u^2}{2}+\\dots,\\quad u^2 = \\frac{x^4}{4}+\\dots$"
      },
      {
       "say": "Substitute and collect.",
       "show": "$-\\frac{x^2}{2}+\\frac{x^4}{24}-\\frac{x^4}{8} = -\\frac{x^2}{2}-\\frac{x^4}{12}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the series expansion of $\\ln\\left(\\dfrac{1+2x}{1-x}\\right)$ up to and including the term in $x^3$, find an expression for the general term in $x^r$, and state the range of values of $x$ for which the expansion is valid.",
     "answer": "$3x - \\frac32x^2 + 3x^3$; general term $\\frac{(-1)^{r+1}2^r + 1}{r}x^r$; $-\\frac12\\lt x\\le\\frac12$",
     "ms": [
      "M1 $\\ln(1+2x) - \\ln(1-x)$",
      "A1 $3x - \\frac32x^2$",
      "A1 $3x^3$",
      "B1 general term",
      "B1 $-\\frac12 \\lt x \\le \\frac12$"
     ],
     "steps": [
      {
       "say": "Use laws of logs to split into two series.",
       "show": "$\\ln(1+2x) - \\ln(1-x)$"
      },
      {
       "say": "Write out each series.",
       "show": "$\\left(2x - 2x^2 + \\frac{8x^3}{3}\\right) - \\left(-x - \\frac{x^2}{2} - \\frac{x^3}{3}\\right)$"
      },
      {
       "say": "Collect terms.",
       "show": "$=3x - \\frac32x^2 + 3x^3 + \\dots$"
      },
      {
       "say": "The r-th terms are minus 1 to the r plus 1 times 2 to the r over r, and plus 1 over r.",
       "show": "$\\frac{(-1)^{r+1}2^r+1}{r}\\,x^r$"
      },
      {
       "say": "Both series must be valid. The first needs minus a half less than x at most a half; the second needs minus 1 at most x less than 1. Take the overlap.",
       "show": "$-\\frac12 \\lt x\\le\\frac12$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Use small angle approximations to find the limit as $x \\to 0$ of $\\dfrac{\\sin3x\\tan x}{1-\\cos2x}$.",
     "answer": "$\\frac32$",
     "ms": [
      "M1 $\\sin3x\\approx3x$, $\\tan x\\approx x$",
      "M1 $1-\\cos2x\\approx2x^2$",
      "A1 $\\frac32$"
     ],
     "steps": [
      {
       "say": "Replace sin 3x by 3x and tan x by x.",
       "show": "$\\sin3x\\tan x\\approx3x^2$"
      },
      {
       "say": "Cos 2x is about 1 minus 2x squared, so the denominator is about 2x squared.",
       "show": "$1-\\cos2x \\approx 2x^2$"
      },
      {
       "say": "Divide.",
       "show": "$\\frac{3x^2}{2x^2} = \\frac32$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "cx2",
    "cx5",
    "cx1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Let $z = \\cos\\theta + i\\sin\\theta$. Show that $z - \\dfrac1z = 2i\\sin\\theta$ and $z^n - \\dfrac{1}{z^n} = 2i\\sin n\\theta$, and hence show that $$16\\sin^5\\theta = \\sin5\\theta - 5\\sin3\\theta + 10\\sin\\theta.$$",
     "answer": "Shown.",
     "ms": [
      "B1 $z^n - z^{-n} = 2i\\sin n\\theta$ by De Moivre",
      "M1 expand $(z - z^{-1})^5$ binomially",
      "A1 correct expansion",
      "M1 pair terms as $z^n - z^{-n}$",
      "A1 $32i\\sin^5\\theta = 2i\\sin5\\theta - 10i\\sin3\\theta + 20i\\sin\\theta$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "By De Moivre, z to the n is cos n theta plus i sin n theta, and z to the minus n is cos n theta minus i sin n theta. Subtracting gives 2i sin n theta.",
       "show": "$z^n - z^{-n} = 2i\\sin n\\theta$"
      },
      {
       "say": "So 2i sin theta to the fifth equals z minus 1 over z to the fifth. Expand with the binomial theorem.",
       "show": "$(z-z^{-1})^5 = z^5 - 5z^3 + 10z - 10z^{-1} + 5z^{-3} - z^{-5}$"
      },
      {
       "say": "Group the terms in pairs.",
       "show": "$= (z^5 - z^{-5}) - 5(z^3 - z^{-3}) + 10(z - z^{-1})$"
      },
      {
       "say": "Replace each pair, and note 2i to the fifth is 32i.",
       "show": "$32i\\sin^5\\theta = 2i\\sin5\\theta - 10i\\sin3\\theta + 20i\\sin\\theta$"
      },
      {
       "say": "Divide by 2i.",
       "show": "$16\\sin^5\\theta = \\sin5\\theta - 5\\sin3\\theta + 10\\sin\\theta$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Hence find the exact value of $\\displaystyle\\int_0^{\\pi/2}\\sin^5\\theta\\,d\\theta$.",
     "answer": "$\\frac{8}{15}$",
     "ms": [
      "M1 integrate each term",
      "M1 substitute limits",
      "A1 $\\frac{8}{15}$"
     ],
     "steps": [
      {
       "say": "Integrate term by term.",
       "show": "$\\frac1{16}\\left[-\\frac{\\cos5\\theta}{5} + \\frac{5\\cos3\\theta}{3} - 10\\cos\\theta\\right]_0^{\\pi/2}$"
      },
      {
       "say": "At pi over 2 every cosine is zero. At zero the bracket is minus a fifth plus five thirds minus 10, which is minus 128 over 15.",
       "show": "$\\frac1{16}\\left[0 - \\left(-\\frac{128}{15}\\right)\\right]$"
      },
      {
       "say": "Simplify.",
       "show": "$= \\frac{128}{240} = \\frac{8}{15}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "By considering $\\displaystyle\\sum_{r=0}^{\\infty}\\left(\\tfrac12 e^{i\\theta}\\right)^r$, show that $$\\sum_{r=0}^{\\infty}\\frac{\\cos r\\theta}{2^r} = \\frac{4 - 2\\cos\\theta}{5 - 4\\cos\\theta}.$$",
     "answer": "Shown.",
     "ms": [
      "M1 sum to infinity $\\frac{1}{1-\\frac12e^{i\\theta}}$ with $|\\frac12e^{i\\theta}|\\lt1$",
      "M1 multiply numerator and denominator by the conjugate $1 - \\frac12e^{-i\\theta}$",
      "A1 denominator $\\frac54 - \\cos\\theta$",
      "M1 take real part of numerator",
      "A1 $1 - \\frac12\\cos\\theta$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "The series is geometric with ratio a half e to the i theta, whose modulus is a half, so it converges.",
       "show": "$\\sum_{r=0}^\\infty \\left(\\tfrac12e^{i\\theta}\\right)^r = \\frac{1}{1-\\frac12e^{i\\theta}}$"
      },
      {
       "say": "By De Moivre, the real part of the left side is the cosine series we want.",
       "show": "$\\text{Re}\\sum \\tfrac{1}{2^r}e^{ir\\theta} = \\sum \\frac{\\cos r\\theta}{2^r}$"
      },
      {
       "say": "Multiply top and bottom by the conjugate of the denominator.",
       "show": "$\\frac{1-\\frac12e^{-i\\theta}}{\\left(1-\\frac12e^{i\\theta}\\right)\\left(1-\\frac12e^{-i\\theta}\\right)} = \\frac{1-\\frac12e^{-i\\theta}}{1 - \\cos\\theta + \\frac14}$"
      },
      {
       "say": "The real part of the numerator is 1 minus a half cos theta.",
       "show": "$\\frac{1 - \\frac12\\cos\\theta}{\\frac54-\\cos\\theta}$"
      },
      {
       "say": "Multiply top and bottom by 4.",
       "show": "$=\\frac{4-2\\cos\\theta}{5-4\\cos\\theta}$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "cx3"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Solve $z^4 = -8 + 8\\sqrt3\\,i$, giving your answers in the form $re^{i\\theta}$ where $-\\pi\\lt\\theta\\le\\pi$.",
     "answer": "$2e^{i\\pi/6},\\ 2e^{2i\\pi/3},\\ 2e^{-5i\\pi/6},\\ 2e^{-i\\pi/3}$",
     "ms": [
      "B1 $16e^{2\\pi i/3}$",
      "M1 $r = 2$",
      "M1 $\\theta = \\frac{\\pi}{6} + \\frac{k\\pi}{2}$",
      "A1 two correct",
      "A1 all four correct in range"
     ],
     "steps": [
      {
       "say": "Modulus: root of 64 plus 192, which is 16. Argument: second quadrant with tangent minus root 3, so 2 pi over 3.",
       "show": "$-8+8\\sqrt3 i = 16e^{2\\pi i/3}$"
      },
      {
       "say": "Take the fourth root of 16, and divide the argument by 4, adding multiples of pi over 2.",
       "show": "$z = 2e^{i(\\pi/6 + k\\pi/2)}$"
      },
      {
       "say": "Choose k to keep each argument between minus pi and pi.",
       "show": "$\\theta = \\frac{\\pi}{6},\\ \\frac{2\\pi}{3},\\ -\\frac{5\\pi}{6},\\ -\\frac{\\pi}{3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the area of the polygon formed by the four roots in an Argand diagram.",
     "answer": "$8$",
     "ms": [
      "M1 square with vertices on circle of radius 2",
      "A1 area $8$"
     ],
     "steps": [
      {
       "say": "Four roots equally spaced form a square inscribed in a circle of radius 2.",
       "show": "Square, diagonal $= 4$"
      },
      {
       "say": "The area of a square is half the diagonal squared.",
       "show": "$\\frac12\\times4^2$"
      },
      {
       "say": "So the area is 8.",
       "show": "$8$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The point $2 + i$ is one vertex of a square whose centre is the origin. Use complex numbers to find the other three vertices.",
     "answer": "$-1+2i,\\ -2-i,\\ 1-2i$",
     "ms": [
      "M1 multiply by $i$ (rotation through $\\frac{\\pi}{2}$)",
      "A1 two correct",
      "A1 all three correct"
     ],
     "steps": [
      {
       "say": "Rotating about the origin by a quarter turn is multiplying by i.",
       "show": "$i(2+i) = -1+2i$"
      },
      {
       "say": "Multiply by i again for each further quarter turn.",
       "show": "$i(-1+2i) = -2-i,\\quad i(-2-i) = 1-2i$"
      },
      {
       "say": "These are the other three vertices.",
       "show": "$-1+2i,\\ -2-i,\\ 1-2i$"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "ca5",
    "ca2",
    "ca1",
    "ca7"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Evaluate $\\displaystyle\\int_0^\\infty xe^{-2x}\\,dx$, showing clearly how you deal with the infinite limit.",
     "answer": "$\\frac14$",
     "ms": [
      "M1 integration by parts",
      "A1 $-\\frac12xe^{-2x} - \\frac14e^{-2x}$",
      "M1 upper limit $t$, then $t\\to\\infty$",
      "B1 $te^{-2t}\\to0$ stated",
      "A1 $\\frac14$"
     ],
     "steps": [
      {
       "say": "Integrate by parts with u equal to x.",
       "show": "$\\int xe^{-2x}dx = -\\frac12xe^{-2x} + \\frac12\\int e^{-2x}dx = -\\frac12xe^{-2x} - \\frac14e^{-2x}$"
      },
      {
       "say": "Use an upper limit t.",
       "show": "$\\int_0^t = -\\frac12te^{-2t} - \\frac14e^{-2t} + \\frac14$"
      },
      {
       "say": "As t tends to infinity, t e to the minus 2t and e to the minus 2t both tend to zero.",
       "show": "$te^{-2t}\\to0,\\ e^{-2t}\\to0$"
      },
      {
       "say": "So the integral is one quarter.",
       "show": "$\\frac14$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Use the substitution $x = 2\\sin\\theta$ to show that $\\displaystyle\\int_0^{\\sqrt3}\\frac{x^2}{\\sqrt{4-x^2}}\\,dx = \\frac{2\\pi}{3} - \\frac{\\sqrt3}{2}$.",
     "answer": "$\\frac{2\\pi}{3}-\\frac{\\sqrt3}{2}$",
     "ms": [
      "M1 $dx = 2\\cos\\theta\\,d\\theta$ and $\\sqrt{4-x^2} = 2\\cos\\theta$",
      "A1 $\\int 4\\sin^2\\theta\\,d\\theta$",
      "B1 limits $0$ and $\\frac{\\pi}{3}$",
      "M1 $\\sin^2\\theta = \\frac12(1-\\cos2\\theta)$",
      "A1 $2\\theta - \\sin2\\theta$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "With x equal to 2 sin theta, dx is 2 cos theta d theta and the root becomes 2 cos theta.",
       "show": "$\\frac{4\\sin^2\\theta}{2\\cos\\theta}\\cdot2\\cos\\theta\\,d\\theta = 4\\sin^2\\theta\\,d\\theta$"
      },
      {
       "say": "Change the limits: x equals root 3 gives sin theta equals root 3 over 2, so theta is pi over 3.",
       "show": "$x: 0\\to\\sqrt3 \\ \\Rightarrow\\ \\theta: 0\\to\\frac{\\pi}{3}$"
      },
      {
       "say": "Use the double angle identity and integrate.",
       "show": "$\\int_0^{\\pi/3}2(1-\\cos2\\theta)\\,d\\theta = \\big[2\\theta - \\sin2\\theta\\big]_0^{\\pi/3}$"
      },
      {
       "say": "Substitute.",
       "show": "$=\\frac{2\\pi}{3} - \\sin\\frac{2\\pi}{3} = \\frac{2\\pi}{3}-\\frac{\\sqrt3}{2}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find $\\dfrac{dy}{dx}$ when $y = \\tan^{-1}\\sqrt{x}$, $x\\gt0$, simplifying your answer.",
     "answer": "$\\frac{1}{2\\sqrt x(1+x)}$",
     "ms": [
      "M1 $\\frac{1}{1+u^2}\\cdot\\frac{du}{dx}$",
      "A1 $\\frac{1}{1+x}\\cdot\\frac{1}{2\\sqrt x}$",
      "A1 simplified"
     ],
     "steps": [
      {
       "say": "Use the chain rule with u equal to root x.",
       "show": "$\\frac{dy}{dx} = \\frac{1}{1+u^2}\\cdot\\frac{du}{dx}$"
      },
      {
       "say": "U squared is x and du by dx is 1 over 2 root x.",
       "show": "$=\\frac{1}{1+x}\\cdot\\frac{1}{2\\sqrt x}$"
      },
      {
       "say": "Combine.",
       "show": "$=\\frac{1}{2\\sqrt x(1+x)}$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "ca3",
    "ca7"
   ],
   "q": "Let $I_n = \\displaystyle\\int_0^{\\pi/2} x^n\\sin x\\,dx$, $n \\ge 0$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Show that, for $n \\ge 2$, $I_n = n\\left(\\dfrac{\\pi}{2}\\right)^{n-1} - n(n-1)I_{n-2}$.",
     "answer": "Shown.",
     "ms": [
      "M1 first integration by parts",
      "A1 $\\big[-x^n\\cos x\\big]_0^{\\pi/2} + n\\int x^{n-1}\\cos x\\,dx$",
      "M1 second integration by parts",
      "A1 $n\\left(\\frac{\\pi}{2}\\right)^{n-1}$ from the boundary terms",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "Integrate by parts with u equal to x to the n and dv equal to sin x.",
       "show": "$I_n = \\big[-x^n\\cos x\\big]_0^{\\pi/2} + n\\int_0^{\\pi/2}x^{n-1}\\cos x\\,dx$"
      },
      {
       "say": "The bracket is zero, because cos pi over 2 is zero and x to the n is zero at the lower limit.",
       "show": "$\\big[-x^n\\cos x\\big]_0^{\\pi/2} = 0$"
      },
      {
       "say": "Integrate by parts again, with u equal to x to the n minus 1.",
       "show": "$n\\Big(\\big[x^{n-1}\\sin x\\big]_0^{\\pi/2} - (n-1)\\int_0^{\\pi/2}x^{n-2}\\sin x\\,dx\\Big)$"
      },
      {
       "say": "The bracket gives pi over 2 to the n minus 1.",
       "show": "$I_n = n\\left(\\frac{\\pi}{2}\\right)^{n-1} - n(n-1)I_{n-2}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Hence find the exact value of $I_4$.",
     "answer": "$\\frac{\\pi^3}{2} - 12\\pi + 24$",
     "ms": [
      "B1 $I_0 = 1$",
      "M1 $I_2 = \\pi - 2$",
      "M1 $I_4 = 4\\left(\\frac{\\pi}{2}\\right)^3 - 12I_2$",
      "A1 $\\frac{\\pi^3}{2}-12\\pi+24$"
     ],
     "steps": [
      {
       "say": "I zero is the integral of sin x from 0 to pi over 2, which is 1.",
       "show": "$I_0 = 1$"
      },
      {
       "say": "Use the formula with n equals 2.",
       "show": "$I_2 = 2\\cdot\\frac{\\pi}{2} - 2I_0 = \\pi - 2$"
      },
      {
       "say": "Then n equals 4.",
       "show": "$I_4 = 4\\cdot\\frac{\\pi^3}{8} - 12(\\pi-2) = \\frac{\\pi^3}{2}-12\\pi+24$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "pl1",
    "pl2"
   ],
   "q": "The curves $C_1$ and $C_2$ have polar equations $C_1: r = 3\\cos\\theta$ and $C_2: r = 1 + \\cos\\theta$, for $-\\frac{\\pi}{2}\\le\\theta\\le\\frac{\\pi}{2}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the polar coordinates of the points where $C_1$ and $C_2$ intersect, other than the pole.",
     "answer": "$\\left(\\frac32, \\frac{\\pi}{3}\\right)$ and $\\left(\\frac32, -\\frac{\\pi}{3}\\right)$",
     "ms": [
      "M1 $3\\cos\\theta = 1+\\cos\\theta$",
      "A1 $\\theta = \\pm\\frac{\\pi}{3}$",
      "A1 $r = \\frac32$"
     ],
     "steps": [
      {
       "say": "Set the r values equal.",
       "show": "$3\\cos\\theta = 1+\\cos\\theta \\Rightarrow \\cos\\theta = \\frac12$"
      },
      {
       "say": "So theta is plus or minus pi over 3.",
       "show": "$\\theta = \\pm\\frac{\\pi}{3}$"
      },
      {
       "say": "Then r is 3 times a half.",
       "show": "$r = \\frac32$: points $\\left(\\frac32,\\pm\\frac{\\pi}{3}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Show that the area of the region inside $C_1$ and outside $C_2$ is $\\pi$.",
     "answer": "$\\pi$",
     "ms": [
      "M1 $\\frac12\\int(r_1^2 - r_2^2)\\,d\\theta$",
      "B1 limits $\\pm\\frac{\\pi}{3}$ (or double $0$ to $\\frac{\\pi}{3}$)",
      "M1 expand to $8\\cos^2\\theta - 2\\cos\\theta - 1$",
      "M1 double angle formula",
      "A1 $3\\theta + 2\\sin2\\theta - 2\\sin\\theta$",
      "M1 substitute limits",
      "A1 $\\pi$"
     ],
     "steps": [
      {
       "say": "The region lies between the intersection angles, with C 1 on the outside.",
       "show": "$A = \\frac12\\int_{-\\pi/3}^{\\pi/3}\\big(9\\cos^2\\theta - (1+\\cos\\theta)^2\\big)d\\theta$"
      },
      {
       "say": "Use symmetry and expand.",
       "show": "$A = \\int_0^{\\pi/3}\\big(8\\cos^2\\theta - 2\\cos\\theta - 1\\big)d\\theta$"
      },
      {
       "say": "Replace 8 cos squared theta by 4 plus 4 cos 2 theta.",
       "show": "$=\\int_0^{\\pi/3}\\big(3 + 4\\cos2\\theta - 2\\cos\\theta\\big)d\\theta$"
      },
      {
       "say": "Integrate.",
       "show": "$=\\big[3\\theta + 2\\sin2\\theta - 2\\sin\\theta\\big]_0^{\\pi/3}$"
      },
      {
       "say": "The two sine terms are each root 3, so they cancel, leaving pi.",
       "show": "$=\\pi + \\sqrt3 - \\sqrt3 = \\pi$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find a Cartesian equation for $C_1$ and state its centre and radius.",
     "answer": "$\\left(x-\\frac32\\right)^2+y^2 = \\frac94$; centre $\\left(\\frac32,0\\right)$, radius $\\frac32$",
     "ms": [
      "M1 $r^2 = 3r\\cos\\theta$",
      "A1 $x^2+y^2 = 3x$",
      "A1 centre and radius"
     ],
     "steps": [
      {
       "say": "Multiply by r.",
       "show": "$r^2 = 3r\\cos\\theta \\Rightarrow x^2+y^2 = 3x$"
      },
      {
       "say": "Complete the square.",
       "show": "$\\left(x-\\frac32\\right)^2+y^2 = \\frac94$"
      },
      {
       "say": "Read off the centre and radius.",
       "show": "Centre $\\left(\\frac32, 0\\right)$, radius $\\frac32$"
      }
     ]
    }
   ]
  },
  {
   "n": 10,
   "points": [
    "hy1",
    "hy4",
    "hy2",
    "hy3",
    "hy5"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Show that $\\tanh^{-1}x = \\dfrac12\\ln\\left(\\dfrac{1+x}{1-x}\\right)$ for $|x|\\lt1$.",
     "answer": "Shown.",
     "ms": [
      "M1 $x = \\frac{e^{2y}-1}{e^{2y}+1}$",
      "M1 make $e^{2y}$ the subject",
      "A1 $e^{2y} = \\frac{1+x}{1-x}$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "Let y be inverse tanh x, so x is tanh y. Multiply top and bottom of the exponential form by e to the y.",
       "show": "$x = \\frac{e^y-e^{-y}}{e^y+e^{-y}} = \\frac{e^{2y}-1}{e^{2y}+1}$"
      },
      {
       "say": "Rearrange to make e to the 2y the subject.",
       "show": "$xe^{2y} + x = e^{2y} - 1 \\Rightarrow e^{2y}(1-x) = 1+x$"
      },
      {
       "say": "Take logs and halve.",
       "show": "$y = \\frac12\\ln\\left(\\frac{1+x}{1-x}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Solve $3\\sinh^2x - 2\\cosh x - 2 = 0$, giving your answers in logarithmic form.",
     "answer": "$x = \\pm\\ln3$",
     "ms": [
      "M1 use $\\sinh^2x = \\cosh^2x - 1$",
      "A1 $3\\cosh^2x - 2\\cosh x - 5 = 0$",
      "M1 solve: $\\cosh x = \\frac53$ or $-1$",
      "A1 reject $-1$ since $\\cosh x\\ge1$",
      "A1 $x=\\pm\\ln3$"
     ],
     "steps": [
      {
       "say": "Replace sinh squared by cosh squared minus 1.",
       "show": "$3(\\cosh^2x-1) - 2\\cosh x - 2 = 0 \\Rightarrow 3\\cosh^2x - 2\\cosh x - 5 = 0$"
      },
      {
       "say": "Factorise.",
       "show": "$(3\\cosh x - 5)(\\cosh x + 1) = 0$"
      },
      {
       "say": "Cosh x is never less than 1, so only five thirds is possible.",
       "show": "$\\cosh x = \\frac53$"
      },
      {
       "say": "Use the log form of inverse cosh, plus or minus. Root of 25 over 9 minus 1 is four thirds.",
       "show": "$x = \\pm\\ln\\left(\\frac53+\\frac43\\right) = \\pm\\ln3$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the exact value of $\\displaystyle\\int_3^5\\frac{1}{\\sqrt{x^2-9}}\\,dx$.",
     "answer": "$\\ln3$",
     "ms": [
      "M1 $\\cosh^{-1}\\frac{x}{3}$",
      "M1 limits",
      "A1 $\\ln3$"
     ],
     "steps": [
      {
       "say": "Standard integral with a equals 3.",
       "show": "$\\int\\frac{dx}{\\sqrt{x^2-9}} = \\cosh^{-1}\\frac{x}{3}$"
      },
      {
       "say": "Evaluate between 3 and 5. Inverse cosh of 1 is 0.",
       "show": "$\\cosh^{-1}\\frac53 - \\cosh^{-1}1$"
      },
      {
       "say": "From part b, inverse cosh of five thirds is ln 3.",
       "show": "$=\\ln3$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "By completing the square, show that $\\displaystyle\\int_0^4\\frac{1}{\\sqrt{x^2+6x+25}}\\,dx = \\ln\\left(\\frac{7+\\sqrt{65}}{8}\\right)$.",
     "answer": "Shown.",
     "ms": [
      "M1 $(x+3)^2+16$",
      "A1 $\\sinh^{-1}\\frac{x+3}{4}$",
      "M1 log forms of $\\sinh^{-1}\\frac74$ and $\\sinh^{-1}\\frac34$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "Complete the square.",
       "show": "$x^2+6x+25 = (x+3)^2 + 16$"
      },
      {
       "say": "This is a standard inverse sinh form with a equals 4.",
       "show": "$\\Big[\\sinh^{-1}\\frac{x+3}{4}\\Big]_0^4 = \\sinh^{-1}\\frac74 - \\sinh^{-1}\\frac34$"
      },
      {
       "say": "Use the log form for each.",
       "show": "$\\ln\\left(\\frac74+\\frac{\\sqrt{65}}{4}\\right) - \\ln\\left(\\frac34+\\frac54\\right)$"
      },
      {
       "say": "The second log is ln 2. Combine.",
       "show": "$=\\ln\\frac{7+\\sqrt{65}}{4} - \\ln2 = \\ln\\frac{7+\\sqrt{65}}{8}$"
      }
     ]
    }
   ]
  },
  {
   "n": 11,
   "points": [
    "de1",
    "de4"
   ],
   "q": "The amount $y$ grams of a chemical in a reactor at time $t$ hours is modelled by $$(t+1)\\frac{dy}{dt} + 2y = 4(t+1)^2,\\quad t\\ge0,$$ with $y = 3$ when $t = 0$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Show that $y = (t+1)^2 + \\dfrac{2}{(t+1)^2}$.",
     "answer": "Shown.",
     "ms": [
      "M1 standard form $\\frac{dy}{dt} + \\frac{2}{t+1}y = 4(t+1)$",
      "M1 IF $= e^{\\int\\frac{2}{t+1}dt}$",
      "A1 $(t+1)^2$",
      "A1 $y(t+1)^2 = (t+1)^4 + c$",
      "M1 use $y(0)=3$",
      "A1 $c=2$ and result"
     ],
     "steps": [
      {
       "say": "Divide by t plus 1 to get standard form.",
       "show": "$\\frac{dy}{dt} + \\frac{2}{t+1}y = 4(t+1)$"
      },
      {
       "say": "The integrating factor is e to the 2 ln of t plus 1, which is t plus 1 squared.",
       "show": "$\\text{IF} = (t+1)^2$"
      },
      {
       "say": "Multiply through and integrate.",
       "show": "$\\frac{d}{dt}\\big(y(t+1)^2\\big) = 4(t+1)^3 \\Rightarrow y(t+1)^2 = (t+1)^4 + c$"
      },
      {
       "say": "Use y equals 3 when t equals 0: 3 equals 1 plus c.",
       "show": "$c = 2$"
      },
      {
       "say": "Divide by t plus 1 squared.",
       "show": "$y = (t+1)^2 + \\frac{2}{(t+1)^2}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the amount of chemical when $t = 1$.",
     "answer": "$4.5$ g",
     "ms": [
      "M1 substitute $t=1$",
      "A1 $4.5$"
     ],
     "steps": [
      {
       "say": "Substitute t equals 1, so t plus 1 is 2.",
       "show": "$y = 4 + \\frac{2}{4}$"
      },
      {
       "say": "Add.",
       "show": "$y = 4.5$"
      },
      {
       "say": "So there are 4.5 grams.",
       "show": "$4.5$ g"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the minimum amount of chemical in the reactor, and the time at which it occurs.",
     "answer": "$2\\sqrt2$ g at $t = 2^{1/4}-1 \\approx 0.189$ h",
     "ms": [
      "M1 differentiate: $2(t+1) - 4(t+1)^{-3}$",
      "M1 set to zero: $(t+1)^4 = 2$",
      "A1 $t = 2^{1/4}-1\\approx0.189$",
      "A1 $y = 2\\sqrt2$"
     ],
     "steps": [
      {
       "say": "Differentiate y with respect to t.",
       "show": "$\\frac{dy}{dt} = 2(t+1) - \\frac{4}{(t+1)^3}$"
      },
      {
       "say": "Set equal to zero.",
       "show": "$(t+1)^4 = 2 \\Rightarrow t = 2^{1/4}-1 \\approx 0.189$"
      },
      {
       "say": "Then t plus 1 squared is root 2, so y is root 2 plus 2 over root 2.",
       "show": "$y = \\sqrt2 + \\frac{2}{\\sqrt2} = 2\\sqrt2 \\approx 2.83$"
      },
      {
       "say": "The derivative changes from negative to positive here, so it is a minimum.",
       "show": "Minimum $2\\sqrt2$ g"
      }
     ]
    }
   ]
  },
  {
   "n": 12,
   "points": [
    "de2",
    "de3",
    "de4"
   ],
   "q": "A particle attached to a spring moves along a horizontal line through a medium that resists its motion, and it is driven by a periodic force. Its displacement $x$ m from a fixed point at time $t$ s satisfies $$\\frac{d^2x}{dt^2} + 4\\frac{dx}{dt} + 5x = 10\\cos t.$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the complementary function, and explain how the discriminant of the auxiliary equation determines its form.",
     "answer": "$e^{-2t}(A\\cos t + B\\sin t)$",
     "ms": [
      "M1 $m^2+4m+5=0$",
      "B1 discriminant $16-20\\lt0$ so complex roots $-2\\pm i$",
      "A1 $e^{-2t}(A\\cos t+B\\sin t)$"
     ],
     "steps": [
      {
       "say": "The auxiliary equation is m squared plus 4m plus 5 equals 0.",
       "show": "$m^2+4m+5=0$"
      },
      {
       "say": "Its discriminant is 16 minus 20, which is negative, so the roots are complex: minus 2 plus or minus i.",
       "show": "$m = -2\\pm i$"
      },
      {
       "say": "Complex roots give decaying oscillations.",
       "show": "$x_c = e^{-2t}(A\\cos t+B\\sin t)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find a particular integral.",
     "answer": "$\\frac54(\\cos t + \\sin t)$",
     "ms": [
      "M1 try $a\\cos t + b\\sin t$",
      "M1 substitute and compare coefficients",
      "A1 $a + b = \\frac52$, $b - a = 0$",
      "A1 $a = b = \\frac54$"
     ],
     "steps": [
      {
       "say": "Try a cos t plus b sin t, and differentiate twice.",
       "show": "$x' = -a\\sin t + b\\cos t,\\quad x'' = -a\\cos t - b\\sin t$"
      },
      {
       "say": "Substitute into the equation and collect.",
       "show": "$(4a+4b)\\cos t + (4b-4a)\\sin t = 10\\cos t$"
      },
      {
       "say": "Compare coefficients: a plus b is five halves, and b equals a.",
       "show": "$a = b = \\frac54$"
      },
      {
       "say": "So the particular integral is five quarters of cos t plus sin t.",
       "show": "$x_p = \\frac54(\\cos t+\\sin t)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Given that the particle starts at rest with $x = 0$, find $x$ in terms of $t$.",
     "answer": "$x = -\\frac54e^{-2t}(\\cos t + 3\\sin t) + \\frac54(\\cos t+\\sin t)$",
     "ms": [
      "M1 general solution $x_c + x_p$",
      "M1 $x(0)=0$: $A + \\frac54 = 0$",
      "M1 differentiate and use $x'(0)=0$",
      "A1 $A = -\\frac54$, $B = -\\frac{15}{4}$",
      "A1 correct particular solution"
     ],
     "steps": [
      {
       "say": "Add the complementary function and the particular integral.",
       "show": "$x = e^{-2t}(A\\cos t+B\\sin t) + \\frac54(\\cos t+\\sin t)$"
      },
      {
       "say": "At t equals 0, x is 0, so A plus five quarters is 0.",
       "show": "$A = -\\frac54$"
      },
      {
       "say": "Differentiate and put t equals 0: minus 2A plus B plus five quarters equals 0.",
       "show": "$-2A + B + \\frac54 = 0 \\Rightarrow B = -\\frac{15}{4}$"
      },
      {
       "say": "Substitute back.",
       "show": "$x = -\\frac54e^{-2t}(\\cos t + 3\\sin t) + \\frac54(\\cos t+\\sin t)$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Describe the motion for large $t$, stating its amplitude.",
     "answer": "Oscillation $\\frac54(\\cos t + \\sin t)$, amplitude $\\frac{5\\sqrt2}{4}\\approx1.77$ m",
     "ms": [
      "B1 transient term $\\to0$, leaving $\\frac54(\\cos t+\\sin t)$",
      "B1 amplitude $\\frac{5\\sqrt2}{4}$"
     ],
     "steps": [
      {
       "say": "The exponential factor e to the minus 2t tends to zero, so the complementary part dies away.",
       "show": "$e^{-2t}(\\dots)\\to0$"
      },
      {
       "say": "What is left is a steady oscillation with period 2 pi.",
       "show": "$x\\approx\\frac54(\\cos t+\\sin t)$"
      },
      {
       "say": "Cos t plus sin t has amplitude root 2, so the amplitude is 5 root 2 over 4, about 1.77 metres.",
       "show": "$\\frac{5\\sqrt2}{4}\\approx1.77$ m"
      }
     ]
    }
   ]
  }
 ]
});
BCSP.add({
 "id": "fm-hard",
 "unit": "fm",
 "level": "hard",
 "title": "Further Maths A2 1 · Paper C (Hard)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "pi3",
    "pi1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A sequence is defined by $u_1 = 1$ and $u_{n+1} = 3u_n + 2^n$ for $n \\ge 1$. Prove by induction that $u_n = 3^n - 2^n$ for all positive integers $n$.",
     "answer": "Proved: $u_{k+1} = 3^{k+1}-2^{k+1}$.",
     "ms": [
      "B1 $u_1 = 3 - 2 = 1$",
      "M1 assume $u_k = 3^k - 2^k$",
      "M1 substitute into the recurrence",
      "A1 $3^{k+1} - 3\\cdot2^k + 2^k$",
      "A1 $= 3^{k+1} - 2^{k+1}$",
      "B1 conclusion"
     ],
     "steps": [
      {
       "say": "Check n equals 1: 3 minus 2 is 1, matching u 1.",
       "show": "$3^1 - 2^1 = 1 = u_1$ ✓"
      },
      {
       "say": "Assume u k equals 3 to the k minus 2 to the k.",
       "show": "$u_k = 3^k - 2^k$"
      },
      {
       "say": "Use the recurrence to build u k plus 1.",
       "show": "$u_{k+1} = 3(3^k - 2^k) + 2^k = 3^{k+1} - 3\\cdot2^k + 2^k$"
      },
      {
       "say": "Minus 3 lots of 2 to the k plus 1 lot is minus 2 lots, which is 2 to the k plus 1.",
       "show": "$= 3^{k+1} - 2\\cdot2^k = 3^{k+1} - 2^{k+1}$"
      },
      {
       "say": "This is the formula for n equals k plus 1, so by induction it holds for all n.",
       "show": "True for all $n\\in\\mathbb{Z}^+$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Prove by induction that $2^{n+2} + 3^{2n+1}$ is divisible by $7$ for all positive integers $n$.",
     "answer": "$f(k+1) = 2f(k) + 7\\cdot3^{2k+1}$, so divisible by 7.",
     "ms": [
      "B1 $f(1) = 8 + 27 = 35$",
      "M1 assume $f(k) = 7m$",
      "M1 write $f(k+1) = 2\\cdot2^{k+2} + 9\\cdot3^{2k+1}$",
      "A1 $= 2f(k) + 7\\cdot3^{2k+1}$",
      "A1 $= 7(2m + 3^{2k+1})$",
      "B1 conclusion"
     ],
     "steps": [
      {
       "say": "When n is 1: 2 cubed plus 3 cubed is 35, which is 5 sevens.",
       "show": "$f(1) = 8+27 = 35 = 7\\times5$ ✓"
      },
      {
       "say": "Assume f of k is 7m.",
       "show": "$2^{k+2} + 3^{2k+1} = 7m$"
      },
      {
       "say": "Increasing n by 1 doubles the first term and multiplies the second by 9.",
       "show": "$f(k+1) = 2\\cdot2^{k+2} + 9\\cdot3^{2k+1}$"
      },
      {
       "say": "Write 9 as 2 plus 7 so that 2 times f of k appears.",
       "show": "$= 2\\big(2^{k+2}+3^{2k+1}\\big) + 7\\cdot3^{2k+1} = 14m + 7\\cdot3^{2k+1}$"
      },
      {
       "say": "Both terms are multiples of 7, so by induction the result holds for all n.",
       "show": "$=7\\big(2m+3^{2k+1}\\big)$ ✓"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "al1",
    "ca6",
    "ca5"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Express $\\dfrac{x+1}{x(x^2+1)}$ in partial fractions.",
     "answer": "$\\dfrac1x + \\dfrac{1-x}{x^2+1}$",
     "ms": [
      "M1 correct form",
      "A1 $A=1$",
      "A1 $B=-1$, $C=1$"
     ],
     "steps": [
      {
       "say": "Use A over x plus Bx plus C over x squared plus 1.",
       "show": "$x+1 = A(x^2+1) + (Bx+C)x$"
      },
      {
       "say": "Put x equals 0 to get A equals 1.",
       "show": "$A = 1$"
      },
      {
       "say": "Compare x squared and x coefficients: A plus B is 0 and C is 1.",
       "show": "$B=-1,\\ C=1 \\Rightarrow \\frac1x + \\frac{1-x}{x^2+1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Hence show that $\\displaystyle\\int_1^\\infty\\frac{x+1}{x(x^2+1)}\\,dx = \\frac{\\pi}{4} + \\frac12\\ln2$, justifying the limiting process carefully.",
     "answer": "$\\frac{\\pi}{4}+\\frac12\\ln2$",
     "ms": [
      "A1 $\\ln x - \\frac12\\ln(x^2+1) + \\tan^{-1}x$",
      "M1 upper limit $t$",
      "M1 combine logs as $\\ln\\frac{t}{\\sqrt{t^2+1}}$",
      "A1 $\\ln\\frac{t}{\\sqrt{t^2+1}} \\to \\ln1 = 0$",
      "B1 $\\tan^{-1}t\\to\\frac{\\pi}{2}$",
      "M1 lower limit value $-\\frac12\\ln2 + \\frac{\\pi}{4}$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "Integrate the partial fractions.",
       "show": "$\\int\\left(\\frac1x - \\frac{x}{x^2+1}+\\frac{1}{x^2+1}\\right)dx = \\ln x - \\frac12\\ln(x^2+1) + \\tan^{-1}x$"
      },
      {
       "say": "Replace infinity by t. Separately, ln t and a half ln of t squared plus 1 both diverge, so combine them first.",
       "show": "$\\Big[\\ln\\frac{x}{\\sqrt{x^2+1}} + \\tan^{-1}x\\Big]_1^t$"
      },
      {
       "say": "As t tends to infinity, t over root of t squared plus 1 tends to 1, so its log tends to 0; inverse tan t tends to pi over 2.",
       "show": "$\\ln\\frac{t}{\\sqrt{t^2+1}}\\to0,\\quad \\tan^{-1}t\\to\\frac{\\pi}{2}$"
      },
      {
       "say": "At the lower limit we get ln of 1 over root 2 plus pi over 4.",
       "show": "$\\ln\\frac{1}{\\sqrt2}+\\frac{\\pi}{4} = -\\frac12\\ln2 + \\frac{\\pi}{4}$"
      },
      {
       "say": "Subtract.",
       "show": "$\\frac{\\pi}{2} - \\frac{\\pi}{4} + \\frac12\\ln2 = \\frac{\\pi}{4} + \\frac12\\ln2$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "al2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Show that $\\dfrac{1}{r(r+1)(r+2)} = \\dfrac12\\left[\\dfrac{1}{r(r+1)} - \\dfrac{1}{(r+1)(r+2)}\\right]$ and hence find $\\displaystyle\\sum_{r=1}^{n}\\frac{1}{r(r+1)(r+2)}$ in terms of $n$.",
     "answer": "$\\frac14 - \\frac{1}{2(n+1)(n+2)}$",
     "ms": [
      "M1 combine the bracket over a common denominator",
      "A1 identity shown",
      "M1 write out terms",
      "M1 cancellation leaving first and last",
      "A1 $\\frac12\\left[\\frac12 - \\frac{1}{(n+1)(n+2)}\\right]$",
      "A1 $\\frac14 - \\frac{1}{2(n+1)(n+2)}$"
     ],
     "steps": [
      {
       "say": "Combine the bracket: the numerator is r plus 2 minus r, which is 2, cancelling the half.",
       "show": "$\\frac12\\cdot\\frac{(r+2)-r}{r(r+1)(r+2)} = \\frac{1}{r(r+1)(r+2)}$"
      },
      {
       "say": "Let f of r be 1 over r times r plus 1. Each term is a half of f of r minus f of r plus 1.",
       "show": "$\\sum = \\frac12\\sum_{r=1}^{n}\\big(f(r) - f(r+1)\\big)$"
      },
      {
       "say": "The sum telescopes, leaving f of 1 minus f of n plus 1.",
       "show": "$=\\frac12\\left[\\frac12 - \\frac{1}{(n+1)(n+2)}\\right]$"
      },
      {
       "say": "Simplify.",
       "show": "$=\\frac14 - \\frac{1}{2(n+1)(n+2)}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Hence show that $\\displaystyle\\sum_{r=n}^{2n}\\frac{1}{r(r+1)(r+2)} = \\frac{3n+2}{4n(n+1)(2n+1)}$.",
     "answer": "Shown.",
     "ms": [
      "M1 $S(2n) - S(n-1)$",
      "A1 $S(n-1) = \\frac14 - \\frac{1}{2n(n+1)}$",
      "A1 $S(2n) = \\frac14 - \\frac{1}{2(2n+1)(2n+2)}$",
      "M1 common denominator $4n(n+1)(2n+1)$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "The sum from n to 2n is S of 2n minus S of n minus 1.",
       "show": "$S(2n) - S(n-1)$"
      },
      {
       "say": "Replace n by n minus 1 and by 2n in the formula.",
       "show": "$S(n-1) = \\frac14 - \\frac{1}{2n(n+1)},\\quad S(2n) = \\frac14 - \\frac{1}{4(2n+1)(n+1)}$"
      },
      {
       "say": "The quarters cancel.",
       "show": "$\\frac{1}{2n(n+1)} - \\frac{1}{4(n+1)(2n+1)}$"
      },
      {
       "say": "Use the common denominator 4n times n plus 1 times 2n plus 1.",
       "show": "$=\\frac{2(2n+1) - n}{4n(n+1)(2n+1)} = \\frac{3n+2}{4n(n+1)(2n+1)}$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "sr1",
    "sa1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Given $y = e^{\\sin x}$, show that $\\dfrac{dy}{dx} = y\\cos x$. By repeated differentiation, find the Maclaurin series for $e^{\\sin x}$ up to and including the term in $x^4$.",
     "answer": "$1 + x + \\frac{x^2}{2} - \\frac{x^4}{8}$",
     "ms": [
      "B1 $y' = y\\cos x$",
      "M1 $y'' = y'\\cos x - y\\sin x$",
      "M1 $y''' = y''\\cos x - 2y'\\sin x - y\\cos x$",
      "A1 $y'''(0) = 0$",
      "A1 $y^{(4)}(0) = -3$",
      "A1 series $1+x+\\frac{x^2}{2}-\\frac{x^4}{8}$"
     ],
     "steps": [
      {
       "say": "By the chain rule, the derivative of e to the sin x is cos x times e to the sin x, which is y cos x.",
       "show": "$y' = y\\cos x$"
      },
      {
       "say": "Differentiate repeatedly using the product rule.",
       "show": "$y'' = y'\\cos x - y\\sin x,\\quad y''' = y''\\cos x - 2y'\\sin x - y\\cos x$"
      },
      {
       "say": "Once more.",
       "show": "$y^{(4)} = y'''\\cos x - 3y''\\sin x - 3y'\\cos x + y\\sin x$"
      },
      {
       "say": "At x equals 0: y is 1, y dash is 1, y double dash is 1, y triple dash is 1 minus 1 which is 0, and the fourth derivative is minus 3.",
       "show": "$y(0)=1,\\ y'(0)=1,\\ y''(0)=1,\\ y'''(0)=0,\\ y^{(4)}(0)=-3$"
      },
      {
       "say": "Build the Maclaurin series. The fourth term is minus 3 over 24, which is minus an eighth.",
       "show": "$e^{\\sin x} \\approx 1 + x + \\frac{x^2}{2} + 0x^3 - \\frac{x^4}{8}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Show that the Maclaurin series for $(1+x)\\ln(1+x)$ is $$x + \\sum_{r=2}^{\\infty}\\frac{(-1)^r}{r(r-1)}x^r,$$ and state the values of $x$ for which it is valid.",
     "answer": "Shown; $-1 \\lt x \\le 1$",
     "ms": [
      "M1 multiply $\\sum\\frac{(-1)^{r+1}x^r}{r}$ by $(1+x)$",
      "M1 shift index of $x\\ln(1+x)$ to obtain $\\sum_{r\\ge2}\\frac{(-1)^r x^r}{r-1}$",
      "M1 combine coefficients of $x^r$ for $r\\ge2$",
      "A1 $\\frac{(-1)^r}{r(r-1)}$",
      "B1 $-1\\lt x\\le1$"
     ],
     "steps": [
      {
       "say": "Start from the series for ln of 1 plus x.",
       "show": "$\\ln(1+x) = \\sum_{r=1}^{\\infty}\\frac{(-1)^{r+1}x^r}{r}$"
      },
      {
       "say": "Multiply by x and relabel so the power is x to the r.",
       "show": "$x\\ln(1+x) = \\sum_{r=2}^{\\infty}\\frac{(-1)^{r}x^{r}}{r-1}$"
      },
      {
       "say": "For r at least 2, add the two coefficients of x to the r.",
       "show": "$(-1)^r\\left(\\frac{1}{r-1} - \\frac1r\\right) = \\frac{(-1)^r}{r(r-1)}$"
      },
      {
       "say": "The x term comes only from the first series. Validity is that of ln of 1 plus x.",
       "show": "$x + \\sum_{r\\ge2}\\frac{(-1)^r x^r}{r(r-1)},\\ \\ -1\\lt x\\le1$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Use small angle approximations to show that, for small $x$, $\\dfrac{\\cos x}{1+\\sin x} \\approx 1 - x + \\dfrac{x^2}{2}$.",
     "answer": "Shown.",
     "ms": [
      "M1 $\\frac{1-\\frac{x^2}{2}}{1+x}$",
      "M1 $(1+x)^{-1}\\approx1-x+x^2$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "Replace cos x and sin x by their small angle approximations.",
       "show": "$\\frac{1-\\frac12x^2}{1+x}$"
      },
      {
       "say": "Expand 1 over 1 plus x binomially as far as x squared.",
       "show": "$\\left(1-\\frac12x^2\\right)(1-x+x^2)$"
      },
      {
       "say": "Multiply, ignoring terms beyond x squared.",
       "show": "$\\approx 1 - x + x^2 - \\frac12x^2 = 1 - x + \\frac{x^2}{2}$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "cx1",
    "cx5",
    "cx2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "By considering $(1 + e^{i\\theta})^n$, show that $$\\sum_{r=0}^{n}\\binom{n}{r}\\cos r\\theta = 2^n\\cos^n\\frac{\\theta}{2}\\cos\\frac{n\\theta}{2}.$$",
     "answer": "Shown.",
     "ms": [
      "M1 binomial expansion $\\sum\\binom nr e^{ir\\theta}$",
      "M1 real part gives the required sum (De Moivre)",
      "M1 factor $e^{i\\theta/2}$: $1+e^{i\\theta} = e^{i\\theta/2}(e^{-i\\theta/2}+e^{i\\theta/2})$",
      "A1 $= 2\\cos\\frac{\\theta}{2}e^{i\\theta/2}$",
      "M1 raise to the power $n$",
      "A1 $2^n\\cos^n\\frac\\theta2 e^{in\\theta/2}$",
      "A1 take real parts"
     ],
     "steps": [
      {
       "say": "Expand with the binomial theorem; e to the i theta to the r is e to the i r theta by De Moivre.",
       "show": "$(1+e^{i\\theta})^n = \\sum_{r=0}^{n}\\binom nr e^{ir\\theta}$"
      },
      {
       "say": "The real part of the right side is the sum we want.",
       "show": "$\\text{Re} = \\sum\\binom nr\\cos r\\theta$"
      },
      {
       "say": "Now take out e to the i theta over 2 from 1 plus e to the i theta. The bracket left is 2 cos of theta over 2.",
       "show": "$1+e^{i\\theta} = e^{i\\theta/2}\\big(e^{-i\\theta/2}+e^{i\\theta/2}\\big) = 2\\cos\\frac\\theta2\\,e^{i\\theta/2}$"
      },
      {
       "say": "Raise to the n.",
       "show": "$(1+e^{i\\theta})^n = 2^n\\cos^n\\frac\\theta2\\,e^{in\\theta/2}$"
      },
      {
       "say": "Its real part is 2 to the n cos to the n of theta over 2 times cos of n theta over 2.",
       "show": "$\\sum_{r=0}^n\\binom nr\\cos r\\theta = 2^n\\cos^n\\frac\\theta2\\cos\\frac{n\\theta}{2}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Use De Moivre's theorem to show that $\\tan4\\theta = \\dfrac{4t - 4t^3}{1 - 6t^2 + t^4}$, where $t = \\tan\\theta$.",
     "answer": "Shown.",
     "ms": [
      "M1 expand $(c+is)^4$",
      "A1 real part $c^4 - 6c^2s^2 + s^4$",
      "A1 imaginary part $4c^3s - 4cs^3$",
      "M1 divide to get $\\tan4\\theta$ and divide through by $c^4$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "By De Moivre, cos 4 theta plus i sin 4 theta equals c plus i s to the fourth.",
       "show": "$(c+is)^4 = c^4 + 4ic^3s - 6c^2s^2 - 4ics^3 + s^4$"
      },
      {
       "say": "Equate real and imaginary parts.",
       "show": "$\\cos4\\theta = c^4-6c^2s^2+s^4,\\quad \\sin4\\theta = 4c^3s-4cs^3$"
      },
      {
       "say": "Divide sin by cos, then divide top and bottom by c to the fourth so that s over c becomes t.",
       "show": "$\\tan4\\theta = \\frac{4t-4t^3}{1-6t^2+t^4}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Hence find the four roots of $t^4 + 4t^3 - 6t^2 - 4t + 1 = 0$ in the form $\\tan\\alpha$.",
     "answer": "$t = \\tan\\frac{\\pi}{16},\\ \\tan\\frac{5\\pi}{16},\\ \\tan\\frac{9\\pi}{16},\\ \\tan\\frac{13\\pi}{16}$",
     "ms": [
      "M1 recognise equation as $\\tan4\\theta = 1$",
      "A1 $4\\theta = \\frac{\\pi}{4} + k\\pi$",
      "A1 four distinct values"
     ],
     "steps": [
      {
       "say": "Rearranging, the equation says 4t minus 4t cubed equals 1 minus 6t squared plus t to the fourth, so tan 4 theta equals 1.",
       "show": "$\\tan4\\theta = 1$"
      },
      {
       "say": "So 4 theta is pi over 4 plus a multiple of pi.",
       "show": "$\\theta = \\frac{\\pi}{16} + \\frac{k\\pi}{4}$"
      },
      {
       "say": "Taking k from 0 to 3 gives four different values of tan theta.",
       "show": "$t = \\tan\\frac{\\pi}{16},\\ \\tan\\frac{5\\pi}{16},\\ \\tan\\frac{9\\pi}{16},\\ \\tan\\frac{13\\pi}{16}$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "cx3",
    "cx1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Solve $z^5 = 16 + 16\\sqrt3\\,i$, giving your answers in the form $re^{i\\theta}$, $-\\pi\\lt\\theta\\le\\pi$.",
     "answer": "$2e^{i\\theta}$, $\\theta = \\frac{\\pi}{15},\\ \\frac{7\\pi}{15},\\ \\frac{13\\pi}{15},\\ -\\frac{11\\pi}{15},\\ -\\frac{\\pi}{3}$",
     "ms": [
      "B1 $32e^{i\\pi/3}$",
      "M1 $r=2$",
      "M1 $\\theta = \\frac{\\pi}{15}+\\frac{2k\\pi}{5}$",
      "A1 three correct",
      "A1 all five in range"
     ],
     "steps": [
      {
       "say": "The modulus is root of 256 plus 768, which is 32, and the argument is pi over 3.",
       "show": "$16+16\\sqrt3 i = 32e^{i\\pi/3}$"
      },
      {
       "say": "Take the fifth root of 32, which is 2, and divide the argument by 5, adding multiples of 2 pi over 5.",
       "show": "$z = 2e^{i(\\pi/15 + 2k\\pi/5)}$"
      },
      {
       "say": "Bring each argument into the range minus pi to pi.",
       "show": "$\\theta = \\frac{\\pi}{15},\\ \\frac{7\\pi}{15},\\ \\frac{13\\pi}{15},\\ -\\frac{11\\pi}{15},\\ -\\frac{5\\pi}{15}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "The points $A$ and $B$ represent $1 + 2i$ and $4 + 3i$ in an Argand diagram. Triangle $ABC$ is equilateral. Use complex numbers to find the two possible numbers represented by $C$, in exact form.",
     "answer": "$\\frac{5-\\sqrt3}{2} + \\frac{5+3\\sqrt3}{2}i$ or $\\frac{5+\\sqrt3}{2} + \\frac{5-3\\sqrt3}{2}i$",
     "ms": [
      "M1 $\\overrightarrow{AC} = (B-A)e^{\\pm i\\pi/3}$",
      "B1 $B - A = 3+i$",
      "M1 multiply out $(3+i)\\left(\\frac12\\pm\\frac{\\sqrt3}{2}i\\right)$",
      "A1 one product correct",
      "A1 first $C$",
      "A1 second $C$"
     ],
     "steps": [
      {
       "say": "Rotating the vector from A to B by plus or minus 60 degrees about A gives the vector from A to C.",
       "show": "$C = A + (B-A)e^{\\pm i\\pi/3}$"
      },
      {
       "say": "B minus A is 3 plus i.",
       "show": "$B - A = 3 + i$"
      },
      {
       "say": "Multiply by a half plus root 3 over 2 i.",
       "show": "$(3+i)\\left(\\tfrac12+\\tfrac{\\sqrt3}{2}i\\right) = \\frac{3-\\sqrt3}{2} + \\frac{3\\sqrt3+1}{2}i$"
      },
      {
       "say": "Add A to get the first position.",
       "show": "$C_1 = \\frac{5-\\sqrt3}{2} + \\frac{5+3\\sqrt3}{2}i$"
      },
      {
       "say": "With the minus sign instead.",
       "show": "$(3+i)\\left(\\tfrac12-\\tfrac{\\sqrt3}{2}i\\right) = \\frac{3+\\sqrt3}{2} + \\frac{1-3\\sqrt3}{2}i \\Rightarrow C_2 = \\frac{5+\\sqrt3}{2} + \\frac{5-3\\sqrt3}{2}i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Let $\\omega = e^{2\\pi i/5}$. Show that $1 + \\omega + \\omega^2 + \\omega^3 + \\omega^4 = 0$ and deduce that $\\cos\\frac{2\\pi}{5} + \\cos\\frac{4\\pi}{5} = -\\frac12$.",
     "answer": "Shown.",
     "ms": [
      "M1 geometric series with $\\omega^5 = 1$, $\\omega\\ne1$",
      "M1 real parts, using $\\cos\\frac{6\\pi}{5} = \\cos\\frac{4\\pi}{5}$ and $\\cos\\frac{8\\pi}{5} = \\cos\\frac{2\\pi}{5}$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "The sum is a geometric series: 1 minus omega to the 5, over 1 minus omega. Omega to the 5 is 1, so it is zero.",
       "show": "$\\frac{1-\\omega^5}{1-\\omega} = 0$"
      },
      {
       "say": "Take real parts. Cos of 6 pi over 5 equals cos of 4 pi over 5, and cos of 8 pi over 5 equals cos of 2 pi over 5.",
       "show": "$1 + 2\\cos\\frac{2\\pi}{5} + 2\\cos\\frac{4\\pi}{5} = 0$"
      },
      {
       "say": "Rearrange.",
       "show": "$\\cos\\frac{2\\pi}{5}+\\cos\\frac{4\\pi}{5} = -\\frac12$"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "ca1",
    "ca2",
    "hy5",
    "hy2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Show that $\\dfrac{d}{dx}\\left(x\\sin^{-1}x + \\sqrt{1-x^2}\\right) = \\sin^{-1}x$, and hence find the exact value of $\\displaystyle\\int_0^{1/2}\\sin^{-1}x\\,dx$.",
     "answer": "$\\frac{\\pi}{12} + \\frac{\\sqrt3}{2} - 1$",
     "ms": [
      "M1 product rule with $\\frac{1}{\\sqrt{1-x^2}}$",
      "A1 $\\sin^{-1}x + \\frac{x}{\\sqrt{1-x^2}} - \\frac{x}{\\sqrt{1-x^2}}$",
      "A1 shown",
      "M1 use limits",
      "A1 $\\frac{\\pi}{12}+\\frac{\\sqrt3}{2}-1$"
     ],
     "steps": [
      {
       "say": "Differentiate x inverse sin x by the product rule, and root of 1 minus x squared by the chain rule.",
       "show": "$\\sin^{-1}x + \\frac{x}{\\sqrt{1-x^2}} - \\frac{x}{\\sqrt{1-x^2}}$"
      },
      {
       "say": "The two fractions cancel.",
       "show": "$=\\sin^{-1}x$"
      },
      {
       "say": "So the integral is the bracket evaluated between 0 and a half.",
       "show": "$\\Big[x\\sin^{-1}x + \\sqrt{1-x^2}\\Big]_0^{1/2} = \\frac12\\cdot\\frac{\\pi}{6} + \\frac{\\sqrt3}{2} - 1$"
      },
      {
       "say": "Simplify.",
       "show": "$=\\frac{\\pi}{12}+\\frac{\\sqrt3}{2}-1$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Use the substitution $x = 2\\sinh u$ to find the exact value of $\\displaystyle\\int_0^2\\sqrt{x^2+4}\\,dx$.",
     "answer": "$2\\sqrt2 + 2\\ln(1+\\sqrt2)$",
     "ms": [
      "M1 $dx = 2\\cosh u\\,du$, $\\sqrt{x^2+4} = 2\\cosh u$",
      "A1 $\\int4\\cosh^2u\\,du$",
      "M1 $\\cosh^2u = \\frac12(1+\\cosh2u)$",
      "A1 $2u + \\sinh2u$",
      "M1 upper limit $u = \\sinh^{-1}1 = \\ln(1+\\sqrt2)$ with $\\cosh u = \\sqrt2$",
      "A1 $2\\ln(1+\\sqrt2) + 2\\sqrt2$"
     ],
     "steps": [
      {
       "say": "With x equal to 2 sinh u, the root becomes 2 cosh u and dx is 2 cosh u du.",
       "show": "$\\int 4\\cosh^2u\\,du$"
      },
      {
       "say": "Use the double angle identity for cosh squared.",
       "show": "$\\int 2(1+\\cosh2u)\\,du = 2u + \\sinh2u = 2u + 2\\sinh u\\cosh u$"
      },
      {
       "say": "When x is 2, sinh u is 1, so u is ln of 1 plus root 2 and cosh u is root 2. When x is 0, u is 0.",
       "show": "$u = \\ln(1+\\sqrt2),\\ \\sinh u = 1,\\ \\cosh u = \\sqrt2$"
      },
      {
       "say": "Substitute.",
       "show": "$2\\ln(1+\\sqrt2) + 2(1)(\\sqrt2) = 2\\sqrt2 + 2\\ln(1+\\sqrt2)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the exact value of $\\displaystyle\\int_{-2}^{1}\\frac{1}{x^2+4x+13}\\,dx$.",
     "answer": "$\\frac{\\pi}{12}$",
     "ms": [
      "M1 $(x+2)^2+9$",
      "A1 $\\frac13\\tan^{-1}\\frac{x+2}{3}$",
      "A1 $\\frac{\\pi}{12}$"
     ],
     "steps": [
      {
       "say": "Complete the square.",
       "show": "$x^2+4x+13 = (x+2)^2 + 9$"
      },
      {
       "say": "Use the inverse tan standard form with a equals 3.",
       "show": "$\\Big[\\frac13\\tan^{-1}\\frac{x+2}{3}\\Big]_{-2}^{1}$"
      },
      {
       "say": "At 1 we get a third of pi over 4; at minus 2 we get 0.",
       "show": "$=\\frac13\\cdot\\frac{\\pi}{4} = \\frac{\\pi}{12}$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "ca3",
    "ca7"
   ],
   "q": "Let $I_n = \\displaystyle\\int_0^{\\pi/4}\\tan^n x\\,dx$, $n\\ge0$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Show that $I_n + I_{n-2} = \\dfrac{1}{n-1}$ for $n \\ge 2$.",
     "answer": "Shown.",
     "ms": [
      "M1 $I_n + I_{n-2} = \\int\\tan^{n-2}x(\\tan^2x+1)\\,dx$",
      "M1 use $1+\\tan^2x = \\sec^2x$",
      "A1 $\\Big[\\frac{\\tan^{n-1}x}{n-1}\\Big]_0^{\\pi/4}$",
      "A1 $\\frac{1}{n-1}$"
     ],
     "steps": [
      {
       "say": "Add the two integrals and take out tan to the n minus 2.",
       "show": "$I_n + I_{n-2} = \\int_0^{\\pi/4}\\tan^{n-2}x\\,(\\tan^2x+1)\\,dx$"
      },
      {
       "say": "One plus tan squared is sec squared, which is the derivative of tan x.",
       "show": "$=\\int_0^{\\pi/4}\\tan^{n-2}x\\sec^2x\\,dx$"
      },
      {
       "say": "This integrates directly by reverse chain rule.",
       "show": "$=\\Big[\\frac{\\tan^{n-1}x}{n-1}\\Big]_0^{\\pi/4} = \\frac{1}{n-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the exact value of $I_5$.",
     "answer": "$\\frac12\\ln2 - \\frac14$",
     "ms": [
      "B1 $I_1 = \\frac12\\ln2$",
      "M1 $I_3 = \\frac12 - I_1$",
      "A1 $I_5 = \\frac14 - \\frac12 + \\frac12\\ln2$"
     ],
     "steps": [
      {
       "say": "I 1 is the integral of tan x, which is ln sec x; between 0 and pi over 4 that is ln root 2.",
       "show": "$I_1 = \\ln\\sqrt2 = \\frac12\\ln2$"
      },
      {
       "say": "Use the relation with n equals 3.",
       "show": "$I_3 = \\frac12 - \\frac12\\ln2$"
      },
      {
       "say": "Then n equals 5.",
       "show": "$I_5 = \\frac14 - I_3 = \\frac12\\ln2 - \\frac14$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Explain why $I_{n+2} \\lt I_n$ for $n\\ge0$, and hence show that $\\dfrac{1}{2(n+1)} \\lt I_n \\lt \\dfrac{1}{2(n-1)}$ for $n\\ge2$.",
     "answer": "Shown.",
     "ms": [
      "B1 $0\\lt\\tan x\\lt1$ on $\\left(0,\\frac\\pi4\\right)$ so $\\tan^{n+2}x\\lt\\tan^nx$",
      "M1 $\\frac{1}{n+1} = I_{n+2}+I_n \\lt 2I_n$",
      "M1 $2I_n \\lt I_n + I_{n-2} = \\frac{1}{n-1}$",
      "A1 both inequalities"
     ],
     "steps": [
      {
       "say": "On the interval, tan x lies between 0 and 1, so higher powers are smaller. So I n plus 2 is less than I n.",
       "show": "$0\\lt\\tan x\\lt1 \\Rightarrow I_{n+2}\\lt I_n$"
      },
      {
       "say": "Use the relation with n plus 2 instead of n.",
       "show": "$\\frac{1}{n+1} = I_{n+2}+I_n \\lt 2I_n$"
      },
      {
       "say": "Use the relation itself.",
       "show": "$2I_n \\lt I_n + I_{n-2} = \\frac{1}{n-1}$"
      },
      {
       "say": "Halve both.",
       "show": "$\\frac{1}{2(n+1)}\\lt I_n\\lt\\frac{1}{2(n-1)}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 5,
     "q": "Use integration by parts twice to find the exact value of $\\displaystyle\\int_0^{\\pi}e^x\\sin x\\,dx$.",
     "answer": "$\\frac{e^\\pi+1}{2}$",
     "ms": [
      "M1 first application",
      "A1 $\\big[-e^x\\cos x\\big]_0^\\pi + \\int e^x\\cos x\\,dx$",
      "M1 second application",
      "M1 recognise the original integral and solve",
      "A1 $\\frac{e^\\pi+1}{2}$"
     ],
     "steps": [
      {
       "say": "Call the integral J. Integrate by parts with u equal to e to the x and dv equal to sin x.",
       "show": "$J = \\big[-e^x\\cos x\\big]_0^\\pi + \\int_0^\\pi e^x\\cos x\\,dx = (e^\\pi + 1) + \\int_0^\\pi e^x\\cos x\\,dx$"
      },
      {
       "say": "Integrate by parts again, now with dv equal to cos x.",
       "show": "$\\int_0^\\pi e^x\\cos x\\,dx = \\big[e^x\\sin x\\big]_0^\\pi - J = 0 - J$"
      },
      {
       "say": "The original integral reappears.",
       "show": "$J = e^\\pi + 1 - J$"
      },
      {
       "say": "Solve for J.",
       "show": "$J = \\frac{e^\\pi+1}{2}$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "pl1",
    "pl2"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "The curve $L$ has polar equation $r^2 = \\sin2\\theta$. Find a Cartesian equation for $L$.",
     "answer": "$(x^2+y^2)^2 = 2xy$",
     "ms": [
      "M1 $\\sin2\\theta = 2\\sin\\theta\\cos\\theta$",
      "M1 multiply by $r^2$",
      "A1 $(x^2+y^2)^2 = 2xy$"
     ],
     "steps": [
      {
       "say": "Use the double angle formula.",
       "show": "$r^2 = 2\\sin\\theta\\cos\\theta$"
      },
      {
       "say": "Multiply both sides by r squared, so the right side becomes 2 times r sin theta times r cos theta.",
       "show": "$r^4 = 2(r\\cos\\theta)(r\\sin\\theta)$"
      },
      {
       "say": "Replace with x and y.",
       "show": "$(x^2+y^2)^2 = 2xy$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "State the values of $\\theta$ in $[0,2\\pi)$ for which $L$ exists, and find the area of one loop of $L$.",
     "answer": "$0\\le\\theta\\le\\frac\\pi2$ or $\\pi\\le\\theta\\le\\frac{3\\pi}{2}$; area $\\frac12$",
     "ms": [
      "B1 $\\sin2\\theta\\ge0$ ranges",
      "M1 $\\frac12\\int_0^{\\pi/2}\\sin2\\theta\\,d\\theta$",
      "M1 integrate",
      "A1 $\\frac12$"
     ],
     "steps": [
      {
       "say": "r squared cannot be negative, so sin 2 theta must be at least zero.",
       "show": "$0\\le\\theta\\le\\frac\\pi2,\\quad \\pi\\le\\theta\\le\\frac{3\\pi}{2}$"
      },
      {
       "say": "One loop is traced for theta from 0 to pi over 2. Use a half the integral of r squared.",
       "show": "$A = \\frac12\\int_0^{\\pi/2}\\sin2\\theta\\,d\\theta$"
      },
      {
       "say": "Integrate.",
       "show": "$=\\frac12\\Big[-\\frac12\\cos2\\theta\\Big]_0^{\\pi/2} = \\frac12\\left(\\frac12+\\frac12\\right) = \\frac12$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 7,
     "q": "The circles $C_1: r = 4\\sin\\theta$ and $C_2: r = 4\\cos\\theta$, $0\\le\\theta\\le\\frac\\pi2$, meet at the pole and at one other point $P$. Find the polar coordinates of $P$ and find the exact area of the region inside both circles.",
     "answer": "$P\\left(2\\sqrt2, \\frac\\pi4\\right)$; area $2\\pi - 4$",
     "ms": [
      "B1 $P = \\left(2\\sqrt2,\\frac\\pi4\\right)$",
      "M1 region bounded by $C_1$ for $0\\le\\theta\\le\\frac\\pi4$ and by $C_2$ for $\\frac\\pi4\\le\\theta\\le\\frac\\pi2$",
      "M1 use symmetry about $\\theta = \\frac\\pi4$: $2\\times\\frac12\\int_0^{\\pi/4}16\\sin^2\\theta\\,d\\theta$",
      "M1 $\\sin^2\\theta = \\frac12(1-\\cos2\\theta)$",
      "A1 $8\\theta - 4\\sin2\\theta$",
      "M1 limits",
      "A1 $2\\pi-4$"
     ],
     "steps": [
      {
       "say": "Set 4 sin theta equal to 4 cos theta: tan theta is 1, so theta is pi over 4 and r is 4 times root 2 over 2.",
       "show": "$P = \\left(2\\sqrt2, \\frac\\pi4\\right)$"
      },
      {
       "say": "Near the initial line, the inner boundary of the common region is the circle r equals 4 sin theta; beyond pi over 4 it is r equals 4 cos theta. By symmetry the two pieces are equal.",
       "show": "$A = 2\\times\\frac12\\int_0^{\\pi/4}16\\sin^2\\theta\\,d\\theta$"
      },
      {
       "say": "Use the double angle identity.",
       "show": "$=\\int_0^{\\pi/4}8(1-\\cos2\\theta)\\,d\\theta = \\big[8\\theta - 4\\sin2\\theta\\big]_0^{\\pi/4}$"
      },
      {
       "say": "Substitute.",
       "show": "$=2\\pi - 4$"
      }
     ]
    }
   ]
  },
  {
   "n": 10,
   "points": [
    "hy1",
    "hy2",
    "hy4"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "State the domain and range of $\\cosh^{-1}x$ (principal value), and prove that $\\cosh^{-1}x = \\ln\\left(x+\\sqrt{x^2-1}\\right)$.",
     "answer": "Domain $x\\ge1$, range $y\\ge0$; shown.",
     "ms": [
      "B1 domain $x\\ge1$ and range $y\\ge0$",
      "M1 $e^{2y} - 2xe^y + 1 = 0$",
      "A1 $e^y = x\\pm\\sqrt{x^2-1}$",
      "M1 reject minus sign since $y\\ge0$ needs $e^y\\ge1$, and $x - \\sqrt{x^2-1}\\le1$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "Cosh is not one to one, so its inverse is defined by restricting to y at least 0. Domain x at least 1, range y at least 0.",
       "show": "$\\cosh^{-1}: [1,\\infty)\\to[0,\\infty)$"
      },
      {
       "say": "Let y equal inverse cosh x, so x equals cosh y. Form a quadratic in e to the y.",
       "show": "$2x = e^y + e^{-y} \\Rightarrow e^{2y} - 2xe^y + 1 = 0$"
      },
      {
       "say": "Solve.",
       "show": "$e^y = x\\pm\\sqrt{x^2-1}$"
      },
      {
       "say": "The two roots multiply to 1, so the minus root is at most 1, giving y at most 0. We need y at least 0, so take the plus sign.",
       "show": "$y = \\ln\\left(x+\\sqrt{x^2-1}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the exact coordinates of the minimum point of the curve $y = 5\\cosh x - 3\\sinh x$.",
     "answer": "$(\\ln2,\\ 4)$",
     "ms": [
      "M1 $y' = 5\\sinh x - 3\\cosh x$",
      "M1 $\\tanh x = \\frac35$",
      "A1 $x = \\frac12\\ln4 = \\ln2$",
      "M1 $\\cosh\\ln2 = \\frac54$, $\\sinh\\ln2 = \\frac34$",
      "A1 $y = 4$"
     ],
     "steps": [
      {
       "say": "Differentiate.",
       "show": "$\\frac{dy}{dx} = 5\\sinh x - 3\\cosh x$"
      },
      {
       "say": "Set equal to zero: tanh x equals three fifths.",
       "show": "$\\tanh x = \\frac35$"
      },
      {
       "say": "Use the log form of inverse tanh.",
       "show": "$x = \\frac12\\ln\\frac{1+\\frac35}{1-\\frac35} = \\frac12\\ln4 = \\ln2$"
      },
      {
       "say": "Cosh of ln 2 is 2 plus a half over 2, which is five quarters; sinh of ln 2 is three quarters.",
       "show": "$y = 5\\cdot\\frac54 - 3\\cdot\\frac34 = \\frac{16}{4} = 4$"
      },
      {
       "say": "The second derivative equals y itself, which is positive, so this is a minimum.",
       "show": "$y'' = 5\\cosh x - 3\\sinh x = y \\gt 0$: minimum at $(\\ln 2, 4)$"
      }
     ]
    }
   ]
  },
  {
   "n": 11,
   "points": [
    "de1"
   ],
   "q": "",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Solve $\\dfrac{dy}{dx} + y\\tan x = \\cos^2x$, $-\\frac\\pi2\\lt x\\lt\\frac\\pi2$, given that $y = 1$ when $x = 0$.",
     "answer": "$y = \\cos x(1 + \\sin x)$",
     "ms": [
      "M1 IF $= e^{\\int\\tan x\\,dx}$",
      "A1 $\\sec x$",
      "M1 $\\frac{d}{dx}(y\\sec x) = \\cos x$",
      "A1 $y\\sec x = \\sin x + c$",
      "M1 use $y(0) = 1$",
      "A1 $y = \\cos x(\\sin x+1)$"
     ],
     "steps": [
      {
       "say": "The integrating factor is e to the integral of tan x, which is e to the ln sec x, which is sec x.",
       "show": "$\\text{IF} = \\sec x$"
      },
      {
       "say": "Multiply through: the left side is the derivative of y sec x, and the right side is cos squared x over cos x.",
       "show": "$\\frac{d}{dx}(y\\sec x) = \\cos x$"
      },
      {
       "say": "Integrate.",
       "show": "$y\\sec x = \\sin x + c$"
      },
      {
       "say": "At x equals 0, y is 1 and sec 0 is 1, so c is 1.",
       "show": "$c = 1$"
      },
      {
       "say": "Multiply by cos x.",
       "show": "$y = \\cos x(\\sin x + 1)$"
      }
     ]
    }
   ]
  },
  {
   "n": 12,
   "points": [
    "de2",
    "de3",
    "de4"
   ],
   "q": "The displacement $x$ m of a particle at time $t$ s satisfies $$\\frac{d^2x}{dt^2} + 2\\frac{dx}{dt} + 2x = 2t + 6.$$ Initially the particle is at rest with $x = 0$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the general solution of the differential equation.",
     "answer": "$x = e^{-t}(A\\cos t + B\\sin t) + t + 2$",
     "ms": [
      "M1 $m^2+2m+2 = 0$",
      "A1 $m = -1\\pm i$",
      "A1 CF $e^{-t}(A\\cos t+B\\sin t)$",
      "M1 PI $at+b$",
      "A1 $a = 1$, $b = 2$",
      "A1 general solution"
     ],
     "steps": [
      {
       "say": "The auxiliary equation has discriminant 4 minus 8, which is negative.",
       "show": "$m^2+2m+2=0 \\Rightarrow m = -1\\pm i$"
      },
      {
       "say": "So the complementary function is a decaying oscillation.",
       "show": "$x_c = e^{-t}(A\\cos t+B\\sin t)$"
      },
      {
       "say": "Try a linear particular integral: x equals at plus b. Substituting gives 2a plus 2at plus 2b.",
       "show": "$2a + 2(at+b) = 2t+6$"
      },
      {
       "say": "Compare: a is 1, and 2 plus 2b is 6, so b is 2.",
       "show": "$x_p = t + 2$"
      },
      {
       "say": "Combine.",
       "show": "$x = e^{-t}(A\\cos t+B\\sin t) + t + 2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the particular solution.",
     "answer": "$x = t + 2 - e^{-t}(2\\cos t + 3\\sin t)$",
     "ms": [
      "M1 $x(0) = 0$: $A + 2 = 0$",
      "M1 differentiate and use $\\dot x(0) = 0$",
      "A1 $A=-2$, $B=-3$",
      "A1 solution"
     ],
     "steps": [
      {
       "say": "At t equals 0: A plus 2 equals 0.",
       "show": "$A = -2$"
      },
      {
       "say": "Differentiate. At t equals 0, the derivative is minus A plus B plus 1.",
       "show": "$\\dot x(0) = -A + B + 1 = 0 \\Rightarrow B = -3$"
      },
      {
       "say": "Substitute.",
       "show": "$x = t+2 - e^{-t}(2\\cos t + 3\\sin t)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Describe the motion of the particle for large values of $t$.",
     "answer": "$x \\approx t + 2$: moves with speed tending to $1$ m s$^{-1}$",
     "ms": [
      "B1 exponential term $\\to 0$",
      "B1 $x\\approx t+2$, velocity tends to $1$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The term with e to the minus t dies away.",
       "show": "$e^{-t}(\\dots)\\to0$"
      },
      {
       "say": "So x is approximately t plus 2.",
       "show": "$x \\approx t+2$"
      },
      {
       "say": "The particle ends up moving steadily with speed close to 1 metre per second.",
       "show": "$\\dot x \\to 1$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "For the equation $\\dfrac{d^2x}{dt^2} + k\\dfrac{dx}{dt} + 9x = 0$ with $k \\ge 0$, find the range of values of $k$ for which the motion is oscillatory.",
     "answer": "$0\\le k\\lt6$",
     "ms": [
      "M1 discriminant $k^2 - 36 \\lt 0$",
      "A1 $0\\le k\\lt6$"
     ],
     "steps": [
      {
       "say": "Oscillation needs complex roots of the auxiliary equation, so the discriminant must be negative.",
       "show": "$k^2 - 36 \\lt 0$"
      },
      {
       "say": "So k is less than 6. With k at least 0 we get the range.",
       "show": "$0\\le k\\lt6$"
      },
      {
       "say": "At k equals 6 the motion is critically damped and does not oscillate.",
       "show": "$k=6$: critical damping"
      }
     ]
    }
   ]
  }
 ]
});
