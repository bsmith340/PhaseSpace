// BCS Academy original papers · not CCEA papers. Original practice questions in the style of CCEA GCE Further Mathematics Unit AS 1 (Pure Mathematics).
BCSP.add({
 "id": "f1-easy",
 "unit": "f1",
 "level": "easy",
 "title": "Further Maths AS 1 · Paper A (Easy)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f1_roots",
    "f1_trans"
   ],
   "q": "The roots of the equation $2x^2 - 6x + 3 = 0$ are $\\alpha$ and $\\beta$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Write down the values of $\\alpha + \\beta$ and $\\alpha\\beta$.",
     "answer": "$\\alpha+\\beta = 3,\\ \\alpha\\beta = \\tfrac{3}{2}$",
     "ms": [
      "B1 $\\alpha+\\beta = 3$",
      "B1 $\\alpha\\beta = \\tfrac32$"
     ],
     "steps": [
      {
       "say": "For a quadratic a x squared plus b x plus c, the sum of the roots is minus b over a.",
       "show": "$\\alpha+\\beta = -\\dfrac{b}{a} = -\\dfrac{-6}{2} = 3$"
      },
      {
       "say": "The product of the roots is c over a.",
       "show": "$\\alpha\\beta = \\dfrac{c}{a} = \\dfrac{3}{2}$"
      },
      {
       "say": "So the sum is three and the product is three halves.",
       "show": "$\\alpha+\\beta=3,\\quad \\alpha\\beta=\\tfrac32$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the value of $\\alpha^2 + \\beta^2$.",
     "answer": "$6$",
     "ms": [
      "M1 uses $(\\alpha+\\beta)^2 - 2\\alpha\\beta$",
      "A1 $6$"
     ],
     "steps": [
      {
       "say": "Alpha squared plus beta squared is the square of the sum, minus twice the product.",
       "show": "$\\alpha^2+\\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta$"
      },
      {
       "say": "Substitute three and three halves.",
       "show": "$= 3^2 - 2\\times\\tfrac32 = 9 - 3$"
      },
      {
       "say": "So the value is six.",
       "show": "$\\alpha^2+\\beta^2 = 6$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find a quadratic equation, with integer coefficients, whose roots are $\\alpha^2$ and $\\beta^2$.",
     "answer": "$4x^2 - 24x + 9 = 0$",
     "ms": [
      "M1 sum of new roots $= \\alpha^2+\\beta^2$",
      "A1 sum $= 6$",
      "M1 product $= (\\alpha\\beta)^2$",
      "A1 $4x^2 - 24x + 9 = 0$ o.e."
     ],
     "steps": [
      {
       "say": "The new sum of roots is alpha squared plus beta squared, which we found is six.",
       "show": "$\\alpha^2+\\beta^2 = 6$"
      },
      {
       "say": "The new product is alpha squared times beta squared, which is the product squared.",
       "show": "$\\alpha^2\\beta^2 = \\left(\\tfrac32\\right)^2 = \\tfrac94$"
      },
      {
       "say": "A quadratic with these roots is x squared, minus the sum times x, plus the product.",
       "show": "$x^2 - 6x + \\tfrac94 = 0$"
      },
      {
       "say": "Multiply through by four to clear the fraction.",
       "show": "$4x^2 - 24x + 9 = 0$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Show that $\\alpha^3 + \\beta^3 = \\tfrac{27}{2}$.",
     "answer": "$\\alpha^3+\\beta^3 = 27 - \\tfrac{27}{2} = \\tfrac{27}{2}$",
     "ms": [
      "M1 uses $(\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)$",
      "A1 $\\tfrac{27}{2}$ shown convincingly"
     ],
     "steps": [
      {
       "say": "Use the identity: alpha cubed plus beta cubed equals the sum cubed, minus three times the product times the sum.",
       "show": "$\\alpha^3+\\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)$"
      },
      {
       "say": "Substitute the values.",
       "show": "$= 27 - 3\\times\\tfrac32\\times 3 = 27 - \\tfrac{27}{2}$"
      },
      {
       "say": "This gives twenty seven over two, as required.",
       "show": "$= \\tfrac{27}{2}$"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "f1_cx",
    "f1_argand"
   ],
   "q": "The complex numbers $z$ and $w$ are given by $z = 3 + 4i$ and $w = 1 - 2i$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $zw$ in the form $x + iy$.",
     "answer": "$11 - 2i$",
     "ms": [
      "M1 expands with $i^2 = -1$",
      "A1 $11 - 2i$"
     ],
     "steps": [
      {
       "say": "Expand the brackets like any two binomials.",
       "show": "$(3+4i)(1-2i) = 3 - 6i + 4i - 8i^2$"
      },
      {
       "say": "Replace i squared by minus one.",
       "show": "$= 3 - 2i + 8$"
      },
      {
       "say": "Collect the real and imaginary parts.",
       "show": "$zw = 11 - 2i$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find $\\dfrac{z}{w}$ in the form $x + iy$.",
     "answer": "$-1 + 2i$",
     "ms": [
      "M1 multiplies numerator and denominator by $w^* = 1 + 2i$",
      "M1 denominator $= 5$",
      "A1 $-1 + 2i$"
     ],
     "steps": [
      {
       "say": "To divide, multiply top and bottom by the conjugate of the denominator.",
       "show": "$\\dfrac{3+4i}{1-2i}\\times\\dfrac{1+2i}{1+2i}$"
      },
      {
       "say": "The denominator becomes one squared plus two squared, which is five.",
       "show": "$(1-2i)(1+2i) = 1 + 4 = 5$"
      },
      {
       "say": "Expand the numerator.",
       "show": "$(3+4i)(1+2i) = 3 + 6i + 4i - 8 = -5 + 10i$"
      },
      {
       "say": "Divide each part by five.",
       "show": "$\\dfrac{z}{w} = -1 + 2i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find $|z|$ and $\\arg z$, giving the argument in radians to 3 significant figures.",
     "answer": "$|z| = 5,\\ \\arg z = 0.927$",
     "ms": [
      "B1 $|z| = 5$",
      "M1 $\\tan^{-1}\\tfrac43$ with $z$ in the first quadrant",
      "A1 $0.927$"
     ],
     "steps": [
      {
       "say": "The modulus is the distance from the origin, using Pythagoras.",
       "show": "$|z| = \\sqrt{3^2 + 4^2} = 5$"
      },
      {
       "say": "The point three, four is in the first quadrant, so the argument is the inverse tangent of four over three.",
       "show": "$\\arg z = \\tan^{-1}\\tfrac43$"
      },
      {
       "say": "Working in radians, this is 0.927 to three significant figures.",
       "show": "$\\arg z = 0.927$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Express $z^2$ in the form $x + iy$ and state its real part and its imaginary part.",
     "answer": "$z^2 = -7 + 24i$; real part $-7$, imaginary part $24$",
     "ms": [
      "M1 expands $(3+4i)^2$",
      "A1 $-7 + 24i$ with $\\mathrm{Re} = -7,\\ \\mathrm{Im} = 24$"
     ],
     "steps": [
      {
       "say": "Square three plus four i.",
       "show": "$(3+4i)^2 = 9 + 24i + 16i^2$"
      },
      {
       "say": "Use i squared equals minus one.",
       "show": "$= 9 + 24i - 16 = -7 + 24i$"
      },
      {
       "say": "The real part is minus seven and the imaginary part is twenty four, which is a real number.",
       "show": "$\\mathrm{Re}(z^2) = -7,\\quad \\mathrm{Im}(z^2) = 24$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 2,
     "q": "Solve the equation $x^2 + 4x + 13 = 0$.",
     "answer": "$x = -2 \\pm 3i$",
     "ms": [
      "M1 quadratic formula or completing the square with $\\sqrt{-36} = 6i$",
      "A1 $-2 \\pm 3i$"
     ],
     "steps": [
      {
       "say": "Complete the square.",
       "show": "$(x+2)^2 + 9 = 0$"
      },
      {
       "say": "So x plus two squared is minus nine, and the square root of minus nine is plus or minus three i.",
       "show": "$x + 2 = \\pm 3i$"
      },
      {
       "say": "The roots are a conjugate pair.",
       "show": "$x = -2 \\pm 3i$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "f1_poly",
    "f1_argand"
   ],
   "q": "$\\mathrm{f}(x) = x^3 - 6x^2 + 13x - 10$",
   "parts": [
    {
     "l": "a",
     "marks": 1,
     "q": "Show that $x = 2$ is a root of $\\mathrm{f}(x) = 0$.",
     "answer": "$\\mathrm{f}(2) = 8 - 24 + 26 - 10 = 0$",
     "ms": [
      "B1 $\\mathrm{f}(2) = 0$ shown"
     ],
     "steps": [
      {
       "say": "Substitute x equals two.",
       "show": "$\\mathrm{f}(2) = 8 - 24 + 26 - 10$"
      },
      {
       "say": "This comes to zero.",
       "show": "$\\mathrm{f}(2) = 0$"
      },
      {
       "say": "By the factor theorem, x equals two is a root.",
       "show": "$(x - 2)$ is a factor"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Hence find the other two roots of $\\mathrm{f}(x) = 0$.",
     "answer": "$x = 2 \\pm i$",
     "ms": [
      "M1 divides by $(x-2)$",
      "A1 $x^2 - 4x + 5$",
      "M1 solves the quadratic factor",
      "A1 $2 \\pm i$"
     ],
     "steps": [
      {
       "say": "Divide the cubic by x minus two.",
       "show": "$x^3 - 6x^2 + 13x - 10 = (x-2)(x^2 - 4x + 5)$"
      },
      {
       "say": "Now solve the quadratic factor by completing the square.",
       "show": "$x^2 - 4x + 5 = (x-2)^2 + 1 = 0$"
      },
      {
       "say": "So x minus two is plus or minus i.",
       "show": "$x - 2 = \\pm i$"
      },
      {
       "say": "The other roots are the conjugate pair two plus i and two minus i.",
       "show": "$x = 2 + i,\\ 2 - i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Show all three roots on an Argand diagram and find the modulus of each non-real root.",
     "answer": "Points $(2,0),\\ (2,1),\\ (2,-1)$; $|2 \\pm i| = \\sqrt5$",
     "ms": [
      "B1 real root on the real axis",
      "B1 conjugate pair symmetric in the real axis",
      "B1 $\\sqrt5$"
     ],
     "steps": [
      {
       "say": "The real root two sits on the real axis.",
       "show": "$2 \\to (2, 0)$"
      },
      {
       "say": "The conjugate pair are reflections of each other in the real axis.",
       "show": "$2 + i \\to (2, 1),\\quad 2 - i \\to (2, -1)$"
      },
      {
       "say": "Both non-real roots have modulus root five.",
       "show": "$|2 \\pm i| = \\sqrt{4 + 1} = \\sqrt5$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "f1_mat",
    "f1_det"
   ],
   "q": "$\\mathbf{A} = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$ and $\\mathbf{B} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 2 \\end{pmatrix}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $\\mathbf{AB}$.",
     "answer": "$\\begin{pmatrix} 2 & 0 \\\\ 3 & 5 \\end{pmatrix}$",
     "ms": [
      "M1 row-by-column multiplication",
      "A1 correct matrix"
     ],
     "steps": [
      {
       "say": "Multiply each row of A by each column of B.",
       "show": "Row 1: $(2)(1) + (1)(0) = 2,\\ (2)(-1) + (1)(2) = 0$"
      },
      {
       "say": "Now the second row of A.",
       "show": "Row 2: $(3)(1) + (4)(0) = 3,\\ (3)(-1) + (4)(2) = 5$"
      },
      {
       "say": "So the product is this matrix.",
       "show": "$\\mathbf{AB} = \\begin{pmatrix} 2 & 0 \\\\ 3 & 5 \\end{pmatrix}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find $\\det\\mathbf{A}$ and $\\mathbf{A}^{-1}$.",
     "answer": "$\\det\\mathbf{A} = 5,\\ \\mathbf{A}^{-1} = \\tfrac15\\begin{pmatrix} 4 & -1 \\\\ -3 & 2 \\end{pmatrix}$",
     "ms": [
      "B1 $\\det\\mathbf{A} = 5$",
      "M1 swaps leading diagonal and negates the other",
      "A1 correct inverse"
     ],
     "steps": [
      {
       "say": "The determinant is a d minus b c.",
       "show": "$\\det\\mathbf{A} = 2\\times4 - 1\\times3 = 5$"
      },
      {
       "say": "Swap the leading diagonal entries and change the sign of the other two.",
       "show": "$\\begin{pmatrix} 4 & -1 \\\\ -3 & 2 \\end{pmatrix}$"
      },
      {
       "say": "Divide by the determinant.",
       "show": "$\\mathbf{A}^{-1} = \\tfrac15\\begin{pmatrix} 4 & -1 \\\\ -3 & 2 \\end{pmatrix}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "A triangle of area $4$ square units is transformed by the matrix $\\mathbf{A}$. Find the area of its image.",
     "answer": "$20$ square units",
     "ms": [
      "M1 area $\\times |\\det\\mathbf{A}|$",
      "A1 $20$"
     ],
     "steps": [
      {
       "say": "The determinant of a transformation matrix is the area scale factor.",
       "show": "scale factor $= |\\det\\mathbf{A}| = 5$"
      },
      {
       "say": "Multiply the original area by five.",
       "show": "$4 \\times 5 = 20$ square units"
      },
      {
       "say": "The image has area twenty square units.",
       "show": "area $= 20$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the matrix $\\mathbf{C}$ such that $\\mathbf{AC} = \\mathbf{B}$.",
     "answer": "$\\mathbf{C} = \\tfrac15\\begin{pmatrix} 4 & -6 \\\\ -3 & 7 \\end{pmatrix}$",
     "ms": [
      "M1 $\\mathbf{C} = \\mathbf{A}^{-1}\\mathbf{B}$ (correct order)",
      "M1 multiplies",
      "A1 correct matrix"
     ],
     "steps": [
      {
       "say": "Pre-multiply both sides by A inverse. The order matters: A inverse goes on the left.",
       "show": "$\\mathbf{A}^{-1}\\mathbf{AC} = \\mathbf{A}^{-1}\\mathbf{B} \\Rightarrow \\mathbf{C} = \\mathbf{A}^{-1}\\mathbf{B}$"
      },
      {
       "say": "Multiply the inverse by B.",
       "show": "$\\tfrac15\\begin{pmatrix} 4 & -1 \\\\ -3 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & -1 \\\\ 0 & 2 \\end{pmatrix}$"
      },
      {
       "say": "Row by column gives this.",
       "show": "$\\mathbf{C} = \\tfrac15\\begin{pmatrix} 4 & -6 \\\\ -3 & 7 \\end{pmatrix}$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "f1_tr",
    "f1_invar"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Write down the matrix $\\mathbf{R}$ representing a rotation of $90^\\circ$ anticlockwise about the origin, and the matrix $\\mathbf{M}$ representing a reflection in the line $y = x$.",
     "answer": "$\\mathbf{R} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix},\\ \\mathbf{M} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
     "ms": [
      "B1 $\\mathbf{R}$",
      "B1 $\\mathbf{M}$"
     ],
     "steps": [
      {
       "say": "The columns of a matrix are the images of the unit vectors i and j.",
       "show": "$\\mathbf{R}: (1,0) \\to (0,1),\\ (0,1) \\to (-1,0)$"
      },
      {
       "say": "So the rotation matrix is this.",
       "show": "$\\mathbf{R} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$"
      },
      {
       "say": "Reflecting in y equals x swaps the coordinates.",
       "show": "$\\mathbf{M} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The rotation is followed by the reflection. Find the single matrix for the combined transformation and describe it fully.",
     "answer": "$\\mathbf{MR} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$: reflection in the $x$-axis",
     "ms": [
      "M1 uses $\\mathbf{MR}$ (correct order)",
      "A1 correct matrix",
      "B1 reflection in the $x$-axis"
     ],
     "steps": [
      {
       "say": "The first transformation goes on the right, so we need M times R.",
       "show": "$\\mathbf{MR} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$"
      },
      {
       "say": "Multiply out.",
       "show": "$\\mathbf{MR} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$"
      },
      {
       "say": "This keeps x the same and changes the sign of y, so it is a reflection in the x axis.",
       "show": "$(x, y) \\to (x, -y)$: reflection in $y = 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The transformation $T$ is represented by $\\mathbf{T} = \\begin{pmatrix} 3 & -2 \\\\ 1 & 0 \\end{pmatrix}$. Show that $T$ has a line of invariant points and find its equation.",
     "answer": "$y = x$",
     "ms": [
      "M1 sets $\\mathbf{T}\\binom{x}{y} = \\binom{x}{y}$",
      "M1 forms the equations",
      "A1 $y = x$"
     ],
     "steps": [
      {
       "say": "An invariant point maps to itself.",
       "show": "$\\begin{pmatrix} 3 & -2 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x \\\\ y \\end{pmatrix}$"
      },
      {
       "say": "This gives two equations.",
       "show": "$3x - 2y = x,\\quad x = y$"
      },
      {
       "say": "The first simplifies to two x equals two y, which is the same as the second. So every point on y equals x is invariant.",
       "show": "line of invariant points: $y = x$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the equations of the two invariant lines of $T$ that pass through the origin.",
     "answer": "$y = x$ and $y = \\tfrac12 x$",
     "ms": [
      "M1 maps $(x, mx)$",
      "M1 $2m^2 - 3m + 1 = 0$",
      "A1 both lines"
     ],
     "steps": [
      {
       "say": "Take a general point on y equals m x and find its image.",
       "show": "$\\mathbf{T}\\begin{pmatrix} x \\\\ mx \\end{pmatrix} = \\begin{pmatrix} (3 - 2m)x \\\\ x \\end{pmatrix}$"
      },
      {
       "say": "For the line to be invariant the image must also satisfy y equals m x.",
       "show": "$x = m(3 - 2m)x$"
      },
      {
       "say": "Divide by x and rearrange into a quadratic in m.",
       "show": "$2m^2 - 3m + 1 = 0 \\Rightarrow (2m - 1)(m - 1) = 0$"
      },
      {
       "say": "So m is one or one half.",
       "show": "$y = x,\\quad y = \\tfrac12 x$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "mx1",
    "mx4"
   ],
   "q": "$\\mathbf{M} = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 3 \\\\ 2 & 0 & 1 \\end{pmatrix}$",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $\\det\\mathbf{M}$.",
     "answer": "$13$",
     "ms": [
      "M1 expands along a row or column",
      "A1 $13$"
     ],
     "steps": [
      {
       "say": "Expand along the first row.",
       "show": "$\\det\\mathbf{M} = 1\\begin{vmatrix} 1 & 3 \\\\ 0 & 1 \\end{vmatrix} - 2\\begin{vmatrix} 0 & 3 \\\\ 2 & 1 \\end{vmatrix} + 0$"
      },
      {
       "say": "Work out the two by two determinants.",
       "show": "$= 1(1) - 2(0 - 6)$"
      },
      {
       "say": "This gives thirteen.",
       "show": "$\\det\\mathbf{M} = 13$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find $\\mathbf{M}^{-1}$.",
     "answer": "$\\mathbf{M}^{-1} = \\tfrac{1}{13}\\begin{pmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{pmatrix}$",
     "ms": [
      "M1 matrix of minors",
      "M1 cofactors (sign pattern)",
      "M1 transposes",
      "A1 adjugate correct",
      "A1 divides by $13$"
     ],
     "steps": [
      {
       "say": "Find the minor of every element, then apply the checkerboard of signs to get the cofactors.",
       "show": "cofactors $= \\begin{pmatrix} 1 & 6 & -2 \\\\ -2 & 1 & 4 \\\\ 6 & -3 & 1 \\end{pmatrix}$"
      },
      {
       "say": "Transpose the cofactor matrix to get the adjugate.",
       "show": "$\\operatorname{adj}\\mathbf{M} = \\begin{pmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{pmatrix}$"
      },
      {
       "say": "Divide by the determinant, thirteen.",
       "show": "$\\mathbf{M}^{-1} = \\tfrac{1}{13}\\begin{pmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{pmatrix}$"
      },
      {
       "say": "A quick check: M times this matrix should give the identity.",
       "show": "$\\mathbf{M}\\mathbf{M}^{-1} = \\mathbf{I}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Hence solve the simultaneous equations\n$$x + 2y = 5,\\quad y + 3z = 5,\\quad 2x + z = 3.$$",
     "answer": "$x = 1,\\ y = 2,\\ z = 1$",
     "ms": [
      "M1 writes as $\\mathbf{M}\\mathbf{x} = \\mathbf{b}$ and uses $\\mathbf{x} = \\mathbf{M}^{-1}\\mathbf{b}$",
      "M1 multiplies",
      "A1 all three values"
     ],
     "steps": [
      {
       "say": "The coefficient matrix is M, so the solution is M inverse times the right hand side.",
       "show": "$\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\tfrac{1}{13}\\begin{pmatrix} 1 & -2 & 6 \\\\ 6 & 1 & -3 \\\\ -2 & 4 & 1 \\end{pmatrix}\\begin{pmatrix} 5 \\\\ 5 \\\\ 3 \\end{pmatrix}$"
      },
      {
       "say": "Multiply out.",
       "show": "$= \\tfrac{1}{13}\\begin{pmatrix} 13 \\\\ 26 \\\\ 13 \\end{pmatrix}$"
      },
      {
       "say": "So x is one, y is two and z is one.",
       "show": "$x = 1,\\ y = 2,\\ z = 1$"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "f1_v3",
    "f1_line"
   ],
   "q": "The points $A$ and $B$ have coordinates $(1, 2, -1)$ and $(3, -1, 4)$ respectively.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $\\overrightarrow{AB}$ and $|\\overrightarrow{AB}|$.",
     "answer": "$2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k}$, $\\sqrt{38}$",
     "ms": [
      "B1 $\\overrightarrow{AB}$",
      "B1 $\\sqrt{38}$"
     ],
     "steps": [
      {
       "say": "Subtract the position vector of A from that of B.",
       "show": "$\\overrightarrow{AB} = (3 - 1)\\mathbf{i} + (-1 - 2)\\mathbf{j} + (4 + 1)\\mathbf{k}$"
      },
      {
       "say": "This is two i minus three j plus five k.",
       "show": "$\\overrightarrow{AB} = 2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k}$"
      },
      {
       "say": "Its magnitude uses three dimensional Pythagoras.",
       "show": "$|\\overrightarrow{AB}| = \\sqrt{4 + 9 + 25} = \\sqrt{38}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Write down a vector equation of the line $AB$.",
     "answer": "$\\mathbf{r} = \\mathbf{i} + 2\\mathbf{j} - \\mathbf{k} + \\lambda(2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k})$",
     "ms": [
      "M1 point plus parameter times direction",
      "A1 correct equation"
     ],
     "steps": [
      {
       "say": "A line needs a point on it and a direction.",
       "show": "point $A$, direction $\\overrightarrow{AB}$"
      },
      {
       "say": "Use the position vector of A plus lambda times the direction.",
       "show": "$\\mathbf{r} = \\mathbf{i} + 2\\mathbf{j} - \\mathbf{k} + \\lambda(2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k})$"
      },
      {
       "say": "Any point on the line and any multiple of the direction would also be accepted.",
       "show": "e.g. $\\mathbf{r} = 3\\mathbf{i} - \\mathbf{j} + 4\\mathbf{k} + \\mu(2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k})$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 1,
     "q": "Write the equation of the line $AB$ in Cartesian form.",
     "answer": "$\\dfrac{x - 1}{2} = \\dfrac{y - 2}{-3} = \\dfrac{z + 1}{5}$",
     "ms": [
      "B1 correct Cartesian form"
     ],
     "steps": [
      {
       "say": "Each coordinate gives an expression for lambda.",
       "show": "$x = 1 + 2\\lambda,\\ y = 2 - 3\\lambda,\\ z = -1 + 5\\lambda$"
      },
      {
       "say": "Make lambda the subject of each and set them equal.",
       "show": "$\\dfrac{x - 1}{2} = \\dfrac{y - 2}{-3} = \\dfrac{z + 1}{5}$"
      },
      {
       "say": "This is the Cartesian form.",
       "show": "$\\left(= \\lambda\\right)$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Show that the point $C(5, -4, 9)$ lies on the line $AB$.",
     "answer": "$\\lambda = 2$ gives $(5, -4, 9)$",
     "ms": [
      "M1 finds $\\lambda$ from one coordinate",
      "A1 checks all three coordinates"
     ],
     "steps": [
      {
       "say": "Use the x coordinate to find lambda.",
       "show": "$1 + 2\\lambda = 5 \\Rightarrow \\lambda = 2$"
      },
      {
       "say": "Check the other coordinates with lambda equals two.",
       "show": "$y = 2 - 6 = -4,\\quad z = -1 + 10 = 9$"
      },
      {
       "say": "All three agree, so C lies on the line.",
       "show": "$C(5, -4, 9)$ is on $AB$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "Find the acute angle between the line $AB$ and a line with direction $\\mathbf{i} + \\mathbf{j} + \\mathbf{k}$.",
     "answer": "$68.0^\\circ$",
     "ms": [
      "M1 scalar product of directions $= 4$",
      "M1 $\\cos\\theta = \\dfrac{4}{\\sqrt{38}\\sqrt3}$",
      "A1 $68.0^\\circ$"
     ],
     "steps": [
      {
       "say": "The angle between two lines is the angle between their direction vectors.",
       "show": "$\\mathbf{d}_1 = 2\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k},\\quad \\mathbf{d}_2 = \\mathbf{i} + \\mathbf{j} + \\mathbf{k}$"
      },
      {
       "say": "Find the scalar product.",
       "show": "$\\mathbf{d}_1 \\cdot \\mathbf{d}_2 = 2 - 3 + 5 = 4$"
      },
      {
       "say": "Divide by the product of the magnitudes.",
       "show": "$\\cos\\theta = \\dfrac{4}{\\sqrt{38}\\,\\sqrt3}$"
      },
      {
       "say": "The angle is 68.0 degrees, which is already acute.",
       "show": "$\\theta = 68.0^\\circ$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "vc2",
    "vc3"
   ],
   "q": "The plane $\\Pi$ has equation $2x - y + 2z = 9$.",
   "parts": [
    {
     "l": "a",
     "marks": 1,
     "q": "Show that the point $(1, 1, 4)$ lies in $\\Pi$.",
     "answer": "$2 - 1 + 8 = 9$",
     "ms": [
      "B1 substitution shown"
     ],
     "steps": [
      {
       "say": "Substitute the coordinates into the left hand side.",
       "show": "$2(1) - 1 + 2(4)$"
      },
      {
       "say": "This equals nine.",
       "show": "$= 9$"
      },
      {
       "say": "So the point lies in the plane.",
       "show": "$(1, 1, 4) \\in \\Pi$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the perpendicular distance from the point $P(4, -2, 5)$ to $\\Pi$.",
     "answer": "$\\tfrac{11}{3}$",
     "ms": [
      "M1 uses $\\dfrac{|ax_1 + by_1 + cz_1 - d|}{\\sqrt{a^2 + b^2 + c^2}}$",
      "A1 numerator $11$",
      "A1 $\\tfrac{11}{3}$"
     ],
     "steps": [
      {
       "say": "Use the formula for the distance from a point to a plane.",
       "show": "$\\dfrac{|2x_1 - y_1 + 2z_1 - 9|}{\\sqrt{2^2 + 1^2 + 2^2}}$"
      },
      {
       "say": "Substitute the point four, minus two, five.",
       "show": "$\\dfrac{|8 + 2 + 10 - 9|}{3} = \\dfrac{11}{3}$"
      },
      {
       "say": "The distance is eleven thirds of a unit.",
       "show": "$\\tfrac{11}{3} \\approx 3.67$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The line $L$ has equation $\\mathbf{r} = \\mathbf{i} + 2\\mathbf{k} + \\lambda(\\mathbf{i} + \\mathbf{j} + \\mathbf{k})$. Find the coordinates of the point where $L$ meets $\\Pi$.",
     "answer": "$(2, 1, 3)$",
     "ms": [
      "M1 substitutes the general point into the plane",
      "A1 $\\lambda = 1$",
      "A1 $(2, 1, 3)$"
     ],
     "steps": [
      {
       "say": "A general point on L is one plus lambda, lambda, two plus lambda.",
       "show": "$(1 + \\lambda,\\ \\lambda,\\ 2 + \\lambda)$"
      },
      {
       "say": "Substitute into the plane equation.",
       "show": "$2(1 + \\lambda) - \\lambda + 2(2 + \\lambda) = 9 \\Rightarrow 6 + 3\\lambda = 9$"
      },
      {
       "say": "So lambda is one, which gives the point two, one, three.",
       "show": "$\\lambda = 1 \\Rightarrow (2, 1, 3)$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the acute angle between $L$ and $\\Pi$.",
     "answer": "$35.3^\\circ$",
     "ms": [
      "M1 uses normal $2\\mathbf{i} - \\mathbf{j} + 2\\mathbf{k}$ and direction of $L$",
      "M1 $\\sin\\theta = \\dfrac{3}{3\\sqrt3}$ (or finds angle with normal and subtracts from $90^\\circ$)",
      "A1 $35.3^\\circ$"
     ],
     "steps": [
      {
       "say": "The normal to the plane is two, minus one, two. The direction of the line is one, one, one.",
       "show": "$\\mathbf{n} = 2\\mathbf{i} - \\mathbf{j} + 2\\mathbf{k},\\quad \\mathbf{d} = \\mathbf{i} + \\mathbf{j} + \\mathbf{k}$"
      },
      {
       "say": "The scalar product is three. This gives the angle between the line and the normal.",
       "show": "$\\cos\\phi = \\dfrac{2 - 1 + 2}{3\\sqrt3} = \\dfrac{1}{\\sqrt3}$"
      },
      {
       "say": "The angle with the plane is ninety degrees minus that, so we can use sine directly.",
       "show": "$\\sin\\theta = \\dfrac{1}{\\sqrt3}$"
      },
      {
       "say": "This gives 35.3 degrees.",
       "show": "$\\theta = 35.3^\\circ$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "vc1"
   ],
   "q": "$\\mathbf{a} = \\mathbf{i} + 2\\mathbf{j} + 3\\mathbf{k}$ and $\\mathbf{b} = 2\\mathbf{i} - \\mathbf{k}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $\\mathbf{a} \\times \\mathbf{b}$.",
     "answer": "$-2\\mathbf{i} + 7\\mathbf{j} - 4\\mathbf{k}$",
     "ms": [
      "M1 determinant method",
      "A1 correct vector"
     ],
     "steps": [
      {
       "say": "Set up the three by three determinant with i, j, k on the top row.",
       "show": "$\\mathbf{a} \\times \\mathbf{b} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 2 & 3 \\\\ 2 & 0 & -1 \\end{vmatrix}$"
      },
      {
       "say": "Expand along the top row, remembering the minus sign on the j term.",
       "show": "$= \\mathbf{i}(-2 - 0) - \\mathbf{j}(-1 - 6) + \\mathbf{k}(0 - 4)$"
      },
      {
       "say": "So the vector product is this.",
       "show": "$\\mathbf{a} \\times \\mathbf{b} = -2\\mathbf{i} + 7\\mathbf{j} - 4\\mathbf{k}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the area of the triangle with vertices at the origin and the points with position vectors $\\mathbf{a}$ and $\\mathbf{b}$.",
     "answer": "$\\tfrac12\\sqrt{69} \\approx 4.15$",
     "ms": [
      "M1 $\\tfrac12|\\mathbf{a} \\times \\mathbf{b}|$",
      "A1 $\\tfrac12\\sqrt{69}$"
     ],
     "steps": [
      {
       "say": "The magnitude of a cross b is the area of the parallelogram on a and b.",
       "show": "$|\\mathbf{a} \\times \\mathbf{b}| = \\sqrt{4 + 49 + 16} = \\sqrt{69}$"
      },
      {
       "say": "The triangle is half of that parallelogram.",
       "show": "area $= \\tfrac12\\sqrt{69}$"
      },
      {
       "say": "That is about 4.15 square units.",
       "show": "$\\approx 4.15$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the volume of the parallelepiped with edges $\\mathbf{a}$, $\\mathbf{b}$ and $\\mathbf{c} = \\mathbf{i} + \\mathbf{j} + \\mathbf{k}$.",
     "answer": "$1$",
     "ms": [
      "M1 $|\\mathbf{c} \\cdot (\\mathbf{a} \\times \\mathbf{b})|$",
      "A1 $1$"
     ],
     "steps": [
      {
       "say": "The volume is the modulus of the scalar triple product.",
       "show": "$V = |\\mathbf{c} \\cdot (\\mathbf{a} \\times \\mathbf{b})|$"
      },
      {
       "say": "Dot c with the vector product found in part a.",
       "show": "$(1)(-2) + (1)(7) + (1)(-4) = 1$"
      },
      {
       "say": "The volume is one cubic unit.",
       "show": "$V = 1$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Find a unit vector perpendicular to both $\\mathbf{a}$ and $\\mathbf{b}$.",
     "answer": "$\\dfrac{1}{\\sqrt{69}}(-2\\mathbf{i} + 7\\mathbf{j} - 4\\mathbf{k})$",
     "ms": [
      "M1 uses $\\mathbf{a} \\times \\mathbf{b}$",
      "A1 divides by $\\sqrt{69}$"
     ],
     "steps": [
      {
       "say": "The vector product is perpendicular to both a and b.",
       "show": "$\\mathbf{a} \\times \\mathbf{b} = -2\\mathbf{i} + 7\\mathbf{j} - 4\\mathbf{k}$"
      },
      {
       "say": "Divide by its magnitude, root sixty nine, to make it a unit vector.",
       "show": "$\\hat{\\mathbf{n}} = \\dfrac{1}{\\sqrt{69}}(-2\\mathbf{i} + 7\\mathbf{j} - 4\\mathbf{k})$"
      },
      {
       "say": "Its negative is also acceptable.",
       "show": "or $\\dfrac{1}{\\sqrt{69}}(2\\mathbf{i} - 7\\mathbf{j} + 4\\mathbf{k})$"
      }
     ]
    }
   ]
  },
  {
   "n": 10,
   "points": [
    "cx4",
    "f1_mularg"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Sketch, on an Argand diagram, the locus of points satisfying $|z - 2 - i| = 3$.",
     "answer": "Circle, centre $(2, 1)$, radius $3$",
     "ms": [
      "B1 circle centre $2 + i$",
      "B1 radius $3$"
     ],
     "steps": [
      {
       "say": "Write the locus as the modulus of z minus the complex number two plus i.",
       "show": "$|z - (2 + i)| = 3$"
      },
      {
       "say": "This is the set of points a distance three from the point two plus i.",
       "show": "centre $(2, 1)$, radius $3$"
      },
      {
       "say": "So the locus is a circle. It crosses the imaginary axis because the centre is only two units from it.",
       "show": "circle through $(5, 1),\\ (-1, 1),\\ (2, 4),\\ (2, -2)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find, in Cartesian form, the equation of the locus $|z - 2| = |z + 4i|$.",
     "answer": "$x + 2y + 3 = 0$",
     "ms": [
      "M1 substitutes $z = x + iy$ and squares",
      "M1 expands and simplifies",
      "A1 $x + 2y + 3 = 0$ o.e."
     ],
     "steps": [
      {
       "say": "The locus is the perpendicular bisector of the points two and minus four i. Write z as x plus i y.",
       "show": "$|(x - 2) + iy| = |x + i(y + 4)|$"
      },
      {
       "say": "Square both moduli.",
       "show": "$(x - 2)^2 + y^2 = x^2 + (y + 4)^2$"
      },
      {
       "say": "The x squared and y squared terms cancel.",
       "show": "$-4x + 4 = 8y + 16$"
      },
      {
       "say": "Rearrange.",
       "show": "$x + 2y + 3 = 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Sketch the locus $\\arg(z - 1) = \\dfrac{\\pi}{4}$.",
     "answer": "Half-line from $(1, 0)$ (not included) at $45^\\circ$ to the positive real axis",
     "ms": [
      "B1 half-line starting at $1$",
      "B1 correct direction, end point excluded"
     ],
     "steps": [
      {
       "say": "Arg of z minus one is the angle measured at the point one on the real axis.",
       "show": "start point $(1, 0)$"
      },
      {
       "say": "The angle pi over four means forty five degrees above the positive real direction.",
       "show": "direction $45^\\circ$"
      },
      {
       "say": "So the locus is a half-line, not a full line, and the point one itself is not included.",
       "show": "$y = x - 1,\\ x > 1$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "$z_1 = 2\\left(\\cos\\dfrac{\\pi}{3} + i\\sin\\dfrac{\\pi}{3}\\right)$ and $z_2 = 4\\left(\\cos\\dfrac{\\pi}{6} + i\\sin\\dfrac{\\pi}{6}\\right)$. Find $z_1z_2$ and $\\dfrac{z_1}{z_2}$ in modulus-argument form, and write $z_1z_2$ in the form $x + iy$.",
     "answer": "$z_1z_2 = 8\\left(\\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2}\\right) = 8i$; $\\dfrac{z_1}{z_2} = \\tfrac12\\left(\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6}\\right)$",
     "ms": [
      "M1 multiplies moduli, adds arguments",
      "A1 $8\\left(\\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2}\\right)$",
      "B1 $8i$",
      "B1 quotient"
     ],
     "steps": [
      {
       "say": "To multiply, multiply the moduli and add the arguments.",
       "show": "$|z_1z_2| = 2 \\times 4 = 8,\\quad \\arg = \\tfrac{\\pi}{3} + \\tfrac{\\pi}{6} = \\tfrac{\\pi}{2}$"
      },
      {
       "say": "Cos of pi over two is zero and sin is one, so the product is eight i.",
       "show": "$z_1z_2 = 8\\left(\\cos\\tfrac{\\pi}{2} + i\\sin\\tfrac{\\pi}{2}\\right) = 8i$"
      },
      {
       "say": "To divide, divide the moduli and subtract the arguments.",
       "show": "$\\left|\\tfrac{z_1}{z_2}\\right| = \\tfrac24 = \\tfrac12,\\quad \\arg = \\tfrac{\\pi}{3} - \\tfrac{\\pi}{6} = \\tfrac{\\pi}{6}$"
      },
      {
       "say": "So the quotient is one half, cis pi over six.",
       "show": "$\\dfrac{z_1}{z_2} = \\tfrac12\\left(\\cos\\tfrac{\\pi}{6} + i\\sin\\tfrac{\\pi}{6}\\right)$"
      }
     ]
    }
   ]
  }
 ]
});

BCSP.add({
 "id": "f1-medium",
 "unit": "f1",
 "level": "medium",
 "title": "Further Maths AS 1 · Paper B (Medium)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f1_roots",
    "f1_trans"
   ],
   "q": "The roots of the equation $3x^2 + 5x - 1 = 0$ are $\\alpha$ and $\\beta$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the value of $\\alpha^2 + \\beta^2$.",
     "answer": "$\\tfrac{31}{9}$",
     "ms": [
      "B1 $\\alpha+\\beta = -\\tfrac53,\\ \\alpha\\beta = -\\tfrac13$",
      "M1 $(\\alpha+\\beta)^2 - 2\\alpha\\beta$",
      "A1 $\\tfrac{31}{9}$"
     ],
     "steps": [
      {
       "say": "From the coefficients, the sum of the roots is minus five thirds and the product is minus one third.",
       "show": "$\\alpha+\\beta = -\\tfrac53,\\quad \\alpha\\beta = -\\tfrac13$"
      },
      {
       "say": "Alpha squared plus beta squared is the sum squared minus twice the product.",
       "show": "$\\alpha^2+\\beta^2 = \\tfrac{25}{9} + \\tfrac23$"
      },
      {
       "say": "That is thirty one ninths.",
       "show": "$\\alpha^2+\\beta^2 = \\tfrac{31}{9}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find a quadratic equation, with integer coefficients, whose roots are $\\dfrac{\\alpha}{\\beta}$ and $\\dfrac{\\beta}{\\alpha}$.",
     "answer": "$3x^2 + 31x + 3 = 0$",
     "ms": [
      "M1 sum $= \\dfrac{\\alpha^2+\\beta^2}{\\alpha\\beta}$",
      "A1 $-\\tfrac{31}{3}$",
      "B1 product $= 1$",
      "A1 $3x^2 + 31x + 3 = 0$"
     ],
     "steps": [
      {
       "say": "Add the two new roots over a common denominator.",
       "show": "$\\dfrac{\\alpha}{\\beta} + \\dfrac{\\beta}{\\alpha} = \\dfrac{\\alpha^2+\\beta^2}{\\alpha\\beta}$"
      },
      {
       "say": "Substitute the values found already.",
       "show": "$= \\dfrac{31/9}{-1/3} = -\\dfrac{31}{3}$"
      },
      {
       "say": "The product of the new roots is simply one.",
       "show": "$\\dfrac{\\alpha}{\\beta}\\cdot\\dfrac{\\beta}{\\alpha} = 1$"
      },
      {
       "say": "Form x squared minus sum times x plus product, then multiply by three.",
       "show": "$x^2 + \\tfrac{31}{3}x + 1 = 0 \\Rightarrow 3x^2 + 31x + 3 = 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Using a suitable substitution, find a quadratic equation with integer coefficients whose roots are $2\\alpha - 1$ and $2\\beta - 1$.",
     "answer": "$3y^2 + 16y + 9 = 0$",
     "ms": [
      "M1 $x = \\dfrac{y + 1}{2}$ substituted",
      "M1 expands and clears fractions",
      "A1 $3y^2 + 16y + 9 = 0$"
     ],
     "steps": [
      {
       "say": "If y equals two x minus one, then x equals y plus one over two.",
       "show": "$x = \\dfrac{y + 1}{2}$"
      },
      {
       "say": "Substitute into the original equation.",
       "show": "$3\\left(\\dfrac{y+1}{2}\\right)^2 + 5\\left(\\dfrac{y+1}{2}\\right) - 1 = 0$"
      },
      {
       "say": "Multiply by four and expand.",
       "show": "$3(y^2 + 2y + 1) + 10(y + 1) - 4 = 0$"
      },
      {
       "say": "Collect terms.",
       "show": "$3y^2 + 16y + 9 = 0$"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "f1_cx",
    "f1_poly"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Express $\\dfrac{5 + i}{1 - i}$ in the form $x + iy$.",
     "answer": "$2 + 3i$",
     "ms": [
      "M1 multiplies by $\\dfrac{1 + i}{1 + i}$",
      "A1 numerator $4 + 6i$",
      "A1 $2 + 3i$"
     ],
     "steps": [
      {
       "say": "Multiply top and bottom by the conjugate of one minus i.",
       "show": "$\\dfrac{(5 + i)(1 + i)}{(1 - i)(1 + i)}$"
      },
      {
       "say": "The numerator expands to four plus six i; the denominator is two.",
       "show": "$\\dfrac{5 + 5i + i - 1}{2} = \\dfrac{4 + 6i}{2}$"
      },
      {
       "say": "Simplify.",
       "show": "$2 + 3i$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the two complex numbers $w$ such that $w^2 = -5 + 12i$.",
     "answer": "$w = 2 + 3i$ or $w = -2 - 3i$",
     "ms": [
      "M1 $(a + ib)^2 = -5 + 12i$",
      "M1 equates real and imaginary parts",
      "M1 eliminates to a quartic or quadratic in $a^2$",
      "A1 $a = \\pm 2$",
      "A1 both square roots"
     ],
     "steps": [
      {
       "say": "Let w equal a plus i b with a and b real, and square it.",
       "show": "$(a + ib)^2 = a^2 - b^2 + 2abi$"
      },
      {
       "say": "Equate real parts and imaginary parts.",
       "show": "$a^2 - b^2 = -5,\\quad 2ab = 12$"
      },
      {
       "say": "Substitute b equals six over a into the first equation.",
       "show": "$a^2 - \\dfrac{36}{a^2} = -5 \\Rightarrow a^4 + 5a^2 - 36 = 0$"
      },
      {
       "say": "This factorises; a squared must be positive, so a squared is four.",
       "show": "$(a^2 + 9)(a^2 - 4) = 0 \\Rightarrow a = \\pm 2$"
      },
      {
       "say": "Then b is three when a is two, and minus three when a is minus two.",
       "show": "$w = 2 + 3i$ or $w = -2 - 3i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Given that $z = 2 + 3i$ is a root of $z^2 + pz + q = 0$, where $p$ and $q$ are real, find $p$ and $q$.",
     "answer": "$p = -4,\\ q = 13$",
     "ms": [
      "M1 substitutes $z^2 = -5 + 12i$ (or uses conjugate root $2 - 3i$)",
      "A1 $p = -4$",
      "A1 $q = 13$"
     ],
     "steps": [
      {
       "say": "Because the coefficients are real, the other root is the conjugate, two minus three i.",
       "show": "roots $2 \\pm 3i$"
      },
      {
       "say": "The sum of the roots is four, so p is minus four.",
       "show": "$-p = 4 \\Rightarrow p = -4$"
      },
      {
       "say": "The product of the roots is four plus nine, which is thirteen.",
       "show": "$q = (2 + 3i)(2 - 3i) = 13$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "f1_poly",
    "f1_argand"
   ],
   "q": "$\\mathrm{f}(z) = z^4 - 2z^3 + 6z^2 - 8z + 8$. It is given that $2i$ is a root of $\\mathrm{f}(z) = 0$.",
   "parts": [
    {
     "l": "a",
     "marks": 1,
     "q": "Write down another root of $\\mathrm{f}(z) = 0$, giving a reason.",
     "answer": "$-2i$, since the coefficients are real",
     "ms": [
      "B1 $-2i$ with reason"
     ],
     "steps": [
      {
       "say": "The polynomial has real coefficients.",
       "show": "$\\mathrm{f}$ has real coefficients"
      },
      {
       "say": "So non-real roots come in conjugate pairs.",
       "show": "$2i \\Rightarrow (2i)^* = -2i$"
      },
      {
       "say": "Minus two i is also a root.",
       "show": "$z = -2i$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the remaining roots of $\\mathrm{f}(z) = 0$.",
     "answer": "$1 + i,\\ 1 - i$",
     "ms": [
      "M1 forms $z^2 + 4$",
      "M1 divides or compares coefficients",
      "A1 $z^2 - 2z + 2$",
      "M1 solves the quadratic",
      "A1 $1 \\pm i$"
     ],
     "steps": [
      {
       "say": "The roots plus or minus two i give the quadratic factor z squared plus four.",
       "show": "$(z - 2i)(z + 2i) = z^2 + 4$"
      },
      {
       "say": "Divide the quartic by z squared plus four, or compare coefficients.",
       "show": "$z^4 - 2z^3 + 6z^2 - 8z + 8 = (z^2 + 4)(z^2 - 2z + 2)$"
      },
      {
       "say": "Solve the other quadratic factor by completing the square.",
       "show": "$(z - 1)^2 + 1 = 0$"
      },
      {
       "say": "So z is one plus or minus i.",
       "show": "$z = 1 \\pm i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The four roots are represented by points on an Argand diagram. Find the area of the quadrilateral that has these points as its vertices.",
     "answer": "$3$",
     "ms": [
      "B1 points $(0, \\pm 2),\\ (1, \\pm 1)$",
      "M1 trapezium area method",
      "A1 $3$"
     ],
     "steps": [
      {
       "say": "Plot the roots: plus and minus two i on the imaginary axis, and one plus or minus i on the line x equals one.",
       "show": "$(0, 2),\\ (0, -2),\\ (1, 1),\\ (1, -1)$"
      },
      {
       "say": "The shape is a trapezium with parallel vertical sides of length four and two, a distance one apart.",
       "show": "area $= \\tfrac12(a + b)h$"
      },
      {
       "say": "Work out the area.",
       "show": "$\\tfrac12(4 + 2)(1) = 3$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "f1_argand",
    "f1_mularg"
   ],
   "q": "$z = -1 + \\sqrt3\\,i$ and $w = 1 + i$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Express $z$ and $w$ in modulus-argument form, with exact values.",
     "answer": "$z = 2\\left(\\cos\\tfrac{2\\pi}{3} + i\\sin\\tfrac{2\\pi}{3}\\right),\\ w = \\sqrt2\\left(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4}\\right)$",
     "ms": [
      "B1 $|z| = 2$",
      "B1 $\\arg z = \\tfrac{2\\pi}{3}$",
      "B1 $|w| = \\sqrt2$",
      "B1 $\\arg w = \\tfrac{\\pi}{4}$"
     ],
     "steps": [
      {
       "say": "The modulus of z is root of one plus three, which is two.",
       "show": "$|z| = \\sqrt{1 + 3} = 2$"
      },
      {
       "say": "z lies in the second quadrant. The reference angle is pi over three, so the argument is pi minus pi over three.",
       "show": "$\\arg z = \\pi - \\tfrac{\\pi}{3} = \\tfrac{2\\pi}{3}$"
      },
      {
       "say": "w has modulus root two and argument pi over four.",
       "show": "$|w| = \\sqrt2,\\quad \\arg w = \\tfrac{\\pi}{4}$"
      },
      {
       "say": "Write both in the form r times cos theta plus i sin theta.",
       "show": "$z = 2\\left(\\cos\\tfrac{2\\pi}{3} + i\\sin\\tfrac{2\\pi}{3}\\right),\\ w = \\sqrt2\\left(\\cos\\tfrac{\\pi}{4} + i\\sin\\tfrac{\\pi}{4}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Hence find $zw$ and $\\dfrac{z}{w}$ in modulus-argument form.",
     "answer": "$zw = 2\\sqrt2\\left(\\cos\\tfrac{11\\pi}{12} + i\\sin\\tfrac{11\\pi}{12}\\right),\\ \\dfrac{z}{w} = \\sqrt2\\left(\\cos\\tfrac{5\\pi}{12} + i\\sin\\tfrac{5\\pi}{12}\\right)$",
     "ms": [
      "M1 multiplies moduli and adds arguments",
      "A1 $zw$",
      "M1 divides moduli and subtracts arguments",
      "A1 $\\dfrac{z}{w}$"
     ],
     "steps": [
      {
       "say": "For the product, multiply the moduli and add the arguments.",
       "show": "$|zw| = 2\\sqrt2,\\quad \\arg(zw) = \\tfrac{2\\pi}{3} + \\tfrac{\\pi}{4} = \\tfrac{11\\pi}{12}$"
      },
      {
       "say": "For the quotient, divide the moduli and subtract the arguments.",
       "show": "$\\left|\\tfrac{z}{w}\\right| = \\tfrac{2}{\\sqrt2} = \\sqrt2,\\quad \\arg = \\tfrac{2\\pi}{3} - \\tfrac{\\pi}{4} = \\tfrac{5\\pi}{12}$"
      },
      {
       "say": "Both arguments already lie between minus pi and pi.",
       "show": "$\\dfrac{z}{w} = \\sqrt2\\left(\\cos\\tfrac{5\\pi}{12} + i\\sin\\tfrac{5\\pi}{12}\\right)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "By finding $\\dfrac{z}{w}$ in the form $x + iy$, show that $\\cos\\dfrac{5\\pi}{12} = \\dfrac{\\sqrt6 - \\sqrt2}{4}$.",
     "answer": "$\\dfrac{z}{w} = \\dfrac{\\sqrt3 - 1}{2} + \\dfrac{\\sqrt3 + 1}{2}i$, so $\\sqrt2\\cos\\tfrac{5\\pi}{12} = \\tfrac{\\sqrt3 - 1}{2}$",
     "ms": [
      "M1 multiplies by $\\dfrac{1 - i}{1 - i}$",
      "M1 equates real parts",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "Divide in Cartesian form, using the conjugate of w.",
       "show": "$\\dfrac{(-1 + \\sqrt3 i)(1 - i)}{2} = \\dfrac{(\\sqrt3 - 1) + (\\sqrt3 + 1)i}{2}$"
      },
      {
       "say": "The real part must equal root two times cos of five pi over twelve.",
       "show": "$\\sqrt2\\cos\\tfrac{5\\pi}{12} = \\dfrac{\\sqrt3 - 1}{2}$"
      },
      {
       "say": "Divide by root two and rationalise.",
       "show": "$\\cos\\tfrac{5\\pi}{12} = \\dfrac{\\sqrt3 - 1}{2\\sqrt2} = \\dfrac{\\sqrt6 - \\sqrt2}{4}$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "cx4"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "On the same Argand diagram, sketch the loci $|z - 3i| = 2$ and $\\arg(z + 1) = \\dfrac{\\pi}{4}$.",
     "answer": "Circle centre $(0, 3)$ radius $2$; half-line from $(-1, 0)$ at $45^\\circ$",
     "ms": [
      "B1 circle centre $3i$",
      "B1 radius $2$",
      "B1 half-line from $-1$",
      "B1 angle $\\tfrac{\\pi}{4}$, end point excluded"
     ],
     "steps": [
      {
       "say": "The first locus is a circle centred at three i with radius two.",
       "show": "centre $(0, 3)$, radius $2$"
      },
      {
       "say": "The second is a half-line starting at minus one on the real axis.",
       "show": "start $(-1, 0)$, not included"
      },
      {
       "say": "It makes an angle of forty five degrees with the positive real direction, so it lies along y equals x plus one.",
       "show": "$y = x + 1,\\ x > -1$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the complex numbers represented by the points where the two loci intersect.",
     "answer": "$i$ and $2 + 3i$",
     "ms": [
      "M1 circle $x^2 + (y - 3)^2 = 4$",
      "M1 substitutes $y = x + 1$",
      "A1 $2x^2 - 4x = 0$",
      "A1 $x = 0,\\ 2$",
      "A1 $i,\\ 2 + 3i$ (both satisfy $x > -1$)"
     ],
     "steps": [
      {
       "say": "Write the circle in Cartesian form.",
       "show": "$x^2 + (y - 3)^2 = 4$"
      },
      {
       "say": "The half-line is y equals x plus one with x greater than minus one. Substitute.",
       "show": "$x^2 + (x - 2)^2 = 4$"
      },
      {
       "say": "Expand and simplify.",
       "show": "$2x^2 - 4x = 0 \\Rightarrow x = 0$ or $x = 2$"
      },
      {
       "say": "Both values are greater than minus one, so both are on the half-line. The y values are one and three.",
       "show": "$(0, 1),\\ (2, 3)$"
      },
      {
       "say": "So the points represent i and two plus three i.",
       "show": "$z = i,\\quad z = 2 + 3i$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "f1_tr",
    "f1_invar",
    "f1_det"
   ],
   "q": "$\\mathbf{A} = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ and $\\mathbf{B} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Describe fully the transformation represented by $\\mathbf{A}$.",
     "answer": "Shear with the $x$-axis invariant, $(0, 1) \\mapsto (2, 1)$",
     "ms": [
      "B1 shear, $x$-axis invariant",
      "B1 $(0,1) \\mapsto (2,1)$ or $(x, y) \\mapsto (x + 2y, y)$"
     ],
     "steps": [
      {
       "say": "Look at the images of the unit vectors: one, zero stays put.",
       "show": "$(1, 0) \\mapsto (1, 0)$"
      },
      {
       "say": "And zero, one moves to two, one.",
       "show": "$(0, 1) \\mapsto (2, 1)$"
      },
      {
       "say": "Points move parallel to the x axis by twice their y coordinate, so this is a shear with the x axis invariant.",
       "show": "$(x, y) \\mapsto (x + 2y,\\ y)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "The transformation $\\mathbf{A}$ is followed by the transformation $\\mathbf{B}$. Find the matrix $\\mathbf{C}$ representing the combined transformation.",
     "answer": "$\\mathbf{C} = \\begin{pmatrix} 0 & 1 \\\\ -1 & -2 \\end{pmatrix}$",
     "ms": [
      "M1 $\\mathbf{C} = \\mathbf{BA}$",
      "A1 correct matrix"
     ],
     "steps": [
      {
       "say": "A is applied first, so it sits on the right.",
       "show": "$\\mathbf{C} = \\mathbf{BA}$"
      },
      {
       "say": "Multiply.",
       "show": "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$"
      },
      {
       "say": "The result is this matrix.",
       "show": "$\\mathbf{C} = \\begin{pmatrix} 0 & 1 \\\\ -1 & -2 \\end{pmatrix}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Find the invariant line of $\\mathbf{C}$ that passes through the origin, and show that it is not a line of invariant points.",
     "answer": "$y = -x$; only the origin is fixed",
     "ms": [
      "M1 image of $(x, mx)$",
      "M1 $m^2 + 2m + 1 = 0$",
      "A1 $y = -x$",
      "M1 tests for invariant points",
      "A1 only $(0, 0)$ is invariant, so not a line of invariant points"
     ],
     "steps": [
      {
       "say": "Find the image of a general point on y equals m x.",
       "show": "$\\mathbf{C}\\begin{pmatrix} x \\\\ mx \\end{pmatrix} = \\begin{pmatrix} mx \\\\ -x - 2mx \\end{pmatrix}$"
      },
      {
       "say": "For an invariant line, the image must also satisfy y equals m x.",
       "show": "$-x - 2mx = m(mx) \\Rightarrow m^2 + 2m + 1 = 0$"
      },
      {
       "say": "This is a perfect square, so m is minus one.",
       "show": "$(m + 1)^2 = 0 \\Rightarrow y = -x$"
      },
      {
       "say": "For invariant points, the image of x, y must be x, y itself.",
       "show": "$y = x$ and $-x - 2y = y$"
      },
      {
       "say": "These give only x equals y equals zero. For example, one, minus one maps to minus one, one, which is on the line but is a different point.",
       "show": "$(1, -1) \\mapsto (-1, 1)$: invariant line, not a line of invariant points"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "A shape $S$ of area $6$ square units is transformed by $\\mathbf{C}$. State the area of the image and explain whether its orientation is preserved.",
     "answer": "$6$ square units; $\\det\\mathbf{C} = 1 > 0$ so orientation preserved",
     "ms": [
      "B1 $\\det\\mathbf{C} = 1$, area $6$",
      "B1 positive determinant so orientation preserved"
     ],
     "steps": [
      {
       "say": "Find the determinant of C.",
       "show": "$\\det\\mathbf{C} = (0)(-2) - (1)(-1) = 1$"
      },
      {
       "say": "The area scale factor is one, so the area stays six.",
       "show": "area $= 6 \\times 1 = 6$"
      },
      {
       "say": "The determinant is positive, so the orientation is preserved. This makes sense: a shear and a rotation both preserve orientation.",
       "show": "$\\det\\mathbf{C} > 0$"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "mx1",
    "mx4"
   ],
   "q": "Consider the system of equations\n$$x + 2y - z = 3,\\qquad 2x - y + kz = 1,\\qquad x + 7y - 5z = 8.$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the value of $k$ for which the system does not have a unique solution.",
     "answer": "$k = 2$",
     "ms": [
      "M1 determinant of the coefficient matrix",
      "A1 $10 - 5k$",
      "A1 $k = 2$"
     ],
     "steps": [
      {
       "say": "The system has a unique solution exactly when the coefficient matrix is non-singular.",
       "show": "$\\begin{vmatrix} 1 & 2 & -1 \\\\ 2 & -1 & k \\\\ 1 & 7 & -5 \\end{vmatrix}$"
      },
      {
       "say": "Expand along the first row.",
       "show": "$1(5 - 7k) - 2(-10 - k) - 1(14 + 1)$"
      },
      {
       "say": "Simplify.",
       "show": "$= 10 - 5k$"
      },
      {
       "say": "This is zero when k equals two.",
       "show": "$k = 2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Show that when $k$ takes this value the equations are consistent, and find the general solution.",
     "answer": "$x = 1 - 3s,\\ y = 1 + 4s,\\ z = 5s$",
     "ms": [
      "M1 shows third equation $= 3\\times$ first $-$ second (or equivalent elimination)",
      "A1 consistent (RHS $9 - 1 = 8$)",
      "M1 sets a parameter",
      "M1 solves for the other two variables",
      "A1 correct general solution o.e."
     ],
     "steps": [
      {
       "say": "With k equal to two, try to write the third equation as a combination of the first two.",
       "show": "$3(x + 2y - z) - (2x - y + 2z) = x + 7y - 5z$"
      },
      {
       "say": "The right hand sides also match: three times three minus one is eight. So the equations are consistent.",
       "show": "$3(3) - 1 = 8\\ \\checkmark$"
      },
      {
       "say": "Let z equal t and solve the first two equations.",
       "show": "$x + 2y = 3 + t,\\quad 2x - y = 1 - 2t$"
      },
      {
       "say": "Eliminating x gives y; then back substitute.",
       "show": "$y = 1 + \\tfrac45t,\\quad x = 1 - \\tfrac35t$"
      },
      {
       "say": "Putting t equal to five s gives integer coefficients.",
       "show": "$(x, y, z) = (1 - 3s,\\ 1 + 4s,\\ 5s)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Interpret your answer to part (b) geometrically.",
     "answer": "The three planes meet in a common line (a sheaf)",
     "ms": [
      "B1 three planes",
      "B1 meet in a line (sheaf)"
     ],
     "steps": [
      {
       "say": "Each equation represents a plane.",
       "show": "three planes"
      },
      {
       "say": "The solutions form a line with direction minus three, four, five.",
       "show": "$\\mathbf{r} = \\mathbf{i} + \\mathbf{j} + s(-3\\mathbf{i} + 4\\mathbf{j} + 5\\mathbf{k})$"
      },
      {
       "say": "So the three planes share a common line, forming a sheaf.",
       "show": "sheaf of planes"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Solve the system when $k = 0$.",
     "answer": "$x = 1,\\ y = 1,\\ z = 0$",
     "ms": [
      "M1 valid method (inverse matrix or elimination)",
      "M1 reduces to two variables",
      "A1 all three values"
     ],
     "steps": [
      {
       "say": "With k zero, the second equation gives y in terms of x.",
       "show": "$2x - y = 1 \\Rightarrow y = 2x - 1$"
      },
      {
       "say": "Substitute into the first equation.",
       "show": "$x + 2(2x - 1) - z = 3 \\Rightarrow 5x - z = 5$"
      },
      {
       "say": "Substitute into the third equation and divide by five.",
       "show": "$x + 7(2x - 1) - 5z = 8 \\Rightarrow 15x - 5z = 15 \\Rightarrow 3x - z = 3$"
      },
      {
       "say": "Subtract the two equations to get two x equals two, so x is one. Then z is zero and y is one.",
       "show": "$x = 1,\\ z = 0,\\ y = 1$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "f1_line",
    "vc3",
    "vc1"
   ],
   "q": "The lines $l_1$ and $l_2$ have equations\n$$l_1:\\ \\mathbf{r} = \\mathbf{i} - \\mathbf{j} + 2\\mathbf{k} + \\lambda(2\\mathbf{i} + \\mathbf{j} - \\mathbf{k}),\\qquad l_2:\\ \\mathbf{r} = 3\\mathbf{i} + 4\\mathbf{j} - 2\\mathbf{k} + \\mu(\\mathbf{i} + 3\\mathbf{j} + \\mathbf{k}).$$",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Show that $l_1$ and $l_2$ are skew.",
     "answer": "Not parallel; $x$ and $z$ equations give $\\lambda = 2,\\ \\mu = 2$ but then $y$: $1 \\ne 10$",
     "ms": [
      "B1 directions not parallel",
      "M1 equates components",
      "M1 solves two equations",
      "A1 $\\lambda = 2,\\ \\mu = 2$",
      "A1 third equation fails, so skew"
     ],
     "steps": [
      {
       "say": "The direction vectors two, one, minus one and one, three, one are not multiples of each other, so the lines are not parallel.",
       "show": "$(2, 1, -1) \\ne k(1, 3, 1)$"
      },
      {
       "say": "If the lines met, the components would be equal for some lambda and mu.",
       "show": "$1 + 2\\lambda = 3 + \\mu,\\quad -1 + \\lambda = 4 + 3\\mu,\\quad 2 - \\lambda = -2 + \\mu$"
      },
      {
       "say": "Use the first and third equations.",
       "show": "$2\\lambda - \\mu = 2,\\quad \\lambda + \\mu = 4 \\Rightarrow \\lambda = 2,\\ \\mu = 2$"
      },
      {
       "say": "Check the second equation: the left side is one but the right side is ten.",
       "show": "$-1 + 2 = 1 \\ne 4 + 6 = 10$"
      },
      {
       "say": "So the lines do not meet and are not parallel: they are skew.",
       "show": "$l_1,\\ l_2$ skew"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the shortest distance between $l_1$ and $l_2$.",
     "answer": "$\\dfrac{27}{5\\sqrt2} = \\dfrac{27\\sqrt2}{10} \\approx 3.82$",
     "ms": [
      "M1 common perpendicular $\\mathbf{d}_1 \\times \\mathbf{d}_2$",
      "A1 $4\\mathbf{i} - 3\\mathbf{j} + 5\\mathbf{k}$",
      "M1 vector joining the lines, $2\\mathbf{i} + 5\\mathbf{j} - 4\\mathbf{k}$",
      "M1 projects onto the unit normal",
      "A1 $\\tfrac{27\\sqrt2}{10}$"
     ],
     "steps": [
      {
       "say": "The common perpendicular is the vector product of the two directions.",
       "show": "$\\mathbf{n} = (2, 1, -1) \\times (1, 3, 1) = (4, -3, 5)$"
      },
      {
       "say": "Take a vector from a point on l one to a point on l two.",
       "show": "$(3, 4, -2) - (1, -1, 2) = (2, 5, -4)$"
      },
      {
       "say": "The shortest distance is the component of this vector along n.",
       "show": "$d = \\dfrac{|(2, 5, -4)\\cdot(4, -3, 5)|}{|\\mathbf{n}|} = \\dfrac{|8 - 15 - 20|}{\\sqrt{50}}$"
      },
      {
       "say": "This is twenty seven over five root two, about 3.82.",
       "show": "$d = \\dfrac{27}{5\\sqrt2} = \\dfrac{27\\sqrt2}{10} \\approx 3.82$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the acute angle between the directions of $l_1$ and $l_2$.",
     "answer": "$60.5^\\circ$",
     "ms": [
      "M1 scalar product $= 4$",
      "M1 $\\cos\\theta = \\dfrac{4}{\\sqrt6\\sqrt{11}}$",
      "A1 $60.5^\\circ$"
     ],
     "steps": [
      {
       "say": "Find the scalar product of the directions.",
       "show": "$(2, 1, -1)\\cdot(1, 3, 1) = 2 + 3 - 1 = 4$"
      },
      {
       "say": "Divide by the product of the magnitudes, root six and root eleven.",
       "show": "$\\cos\\theta = \\dfrac{4}{\\sqrt{66}}$"
      },
      {
       "say": "So the angle is 60.5 degrees.",
       "show": "$\\theta = 60.5^\\circ$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "vc2",
    "vc3",
    "vc1"
   ],
   "q": "The planes $\\Pi_1$ and $\\Pi_2$ have equations $x + y - z = 2$ and $2x - y + 3z = 7$ respectively.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the acute angle between $\\Pi_1$ and $\\Pi_2$.",
     "answer": "$72.0^\\circ$",
     "ms": [
      "M1 uses the normals",
      "M1 $\\cos\\theta = \\dfrac{|{-2}|}{\\sqrt3\\sqrt{14}}$",
      "A1 $72.0^\\circ$"
     ],
     "steps": [
      {
       "say": "The angle between planes is the angle between their normals.",
       "show": "$\\mathbf{n}_1 = (1, 1, -1),\\quad \\mathbf{n}_2 = (2, -1, 3)$"
      },
      {
       "say": "The scalar product is two minus one minus three, which is minus two. Use its modulus for the acute angle.",
       "show": "$\\cos\\theta = \\dfrac{2}{\\sqrt3\\,\\sqrt{14}} = \\dfrac{2}{\\sqrt{42}}$"
      },
      {
       "say": "This gives 72.0 degrees.",
       "show": "$\\theta = 72.0^\\circ$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find a vector equation of the line of intersection of $\\Pi_1$ and $\\Pi_2$.",
     "answer": "$\\mathbf{r} = 3\\mathbf{i} - \\mathbf{j} + t(2\\mathbf{i} - 5\\mathbf{j} - 3\\mathbf{k})$",
     "ms": [
      "M1 direction $\\mathbf{n}_1 \\times \\mathbf{n}_2$",
      "A1 $2\\mathbf{i} - 5\\mathbf{j} - 3\\mathbf{k}$",
      "M1 finds a common point (e.g. $z = 0$)",
      "A1 $(3, -1, 0)$",
      "A1 correct equation o.e."
     ],
     "steps": [
      {
       "say": "The line lies in both planes, so it is perpendicular to both normals. Its direction is their vector product.",
       "show": "$\\mathbf{n}_1 \\times \\mathbf{n}_2 = (1, 1, -1) \\times (2, -1, 3) = (2, -5, -3)$"
      },
      {
       "say": "Find one point on both planes: set z to zero.",
       "show": "$x + y = 2,\\quad 2x - y = 7$"
      },
      {
       "say": "Adding gives three x equals nine, so x is three and y is minus one.",
       "show": "point $(3, -1, 0)$"
      },
      {
       "say": "Write the line.",
       "show": "$\\mathbf{r} = 3\\mathbf{i} - \\mathbf{j} + t(2\\mathbf{i} - 5\\mathbf{j} - 3\\mathbf{k})$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the perpendicular distance from the origin to $\\Pi_2$.",
     "answer": "$\\dfrac{7}{\\sqrt{14}} = \\dfrac{\\sqrt{14}}{2} \\approx 1.87$",
     "ms": [
      "M1 $\\dfrac{|{-7}|}{\\sqrt{14}}$",
      "A1 $\\tfrac{\\sqrt{14}}{2}$"
     ],
     "steps": [
      {
       "say": "Use the point to plane formula with the origin.",
       "show": "$d = \\dfrac{|0 + 0 + 0 - 7|}{\\sqrt{4 + 1 + 9}}$"
      },
      {
       "say": "This is seven over root fourteen.",
       "show": "$d = \\dfrac{7}{\\sqrt{14}}$"
      },
      {
       "say": "Rationalising, it is root fourteen over two, about 1.87.",
       "show": "$d = \\dfrac{\\sqrt{14}}{2} \\approx 1.87$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "The points $P(3, -1, 0)$ and $Q(1, 2, 1)$ lie in $\\Pi_1$. Use a vector product to find the area of triangle $OPQ$, where $O$ is the origin.",
     "answer": "$\\tfrac12\\sqrt{59} \\approx 3.84$",
     "ms": [
      "M1 $\\overrightarrow{OP} \\times \\overrightarrow{OQ}$",
      "A1 $-\\mathbf{i} - 3\\mathbf{j} + 7\\mathbf{k}$",
      "A1 $\\tfrac12\\sqrt{59}$"
     ],
     "steps": [
      {
       "say": "The area of the triangle is half the magnitude of the vector product of two sides.",
       "show": "area $= \\tfrac12|\\overrightarrow{OP} \\times \\overrightarrow{OQ}|$"
      },
      {
       "say": "Work out the vector product.",
       "show": "$(3, -1, 0) \\times (1, 2, 1) = (-1, -3, 7)$"
      },
      {
       "say": "Its magnitude is root fifty nine, so the area is half of that.",
       "show": "area $= \\tfrac12\\sqrt{1 + 9 + 49} = \\tfrac12\\sqrt{59} \\approx 3.84$"
      }
     ]
    }
   ]
  }
 ]
});

BCSP.add({
 "id": "f1-hard",
 "unit": "f1",
 "level": "hard",
 "title": "Further Maths AS 1 · Paper C (Hard)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f1_roots",
    "f1_trans"
   ],
   "q": "The equation $x^2 - px + q = 0$, where $p$ and $q$ are real and $q \\ne 0$, has roots $\\alpha$ and $\\beta$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Show that $\\alpha^3 + \\beta^3 = p^3 - 3pq$.",
     "answer": "$(\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta) = p^3 - 3pq$",
     "ms": [
      "M1 expands $(\\alpha+\\beta)^3$ or uses the identity",
      "A1 result with $\\alpha+\\beta = p,\\ \\alpha\\beta = q$"
     ],
     "steps": [
      {
       "say": "Here the sum of the roots is p and the product is q.",
       "show": "$\\alpha+\\beta = p,\\quad \\alpha\\beta = q$"
      },
      {
       "say": "Expand the cube of the sum.",
       "show": "$(\\alpha+\\beta)^3 = \\alpha^3 + \\beta^3 + 3\\alpha\\beta(\\alpha+\\beta)$"
      },
      {
       "say": "Rearrange and substitute.",
       "show": "$\\alpha^3+\\beta^3 = p^3 - 3pq$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find, in terms of $p$ and $q$, a quadratic equation with roots $\\dfrac{\\alpha^2}{\\beta}$ and $\\dfrac{\\beta^2}{\\alpha}$.",
     "answer": "$qx^2 - (p^3 - 3pq)x + q^2 = 0$",
     "ms": [
      "M1 sum $= \\dfrac{\\alpha^3+\\beta^3}{\\alpha\\beta}$",
      "A1 $\\dfrac{p^3 - 3pq}{q}$",
      "M1 product $= \\alpha\\beta$",
      "A1 $q$",
      "A1 equation"
     ],
     "steps": [
      {
       "say": "Add the new roots over a common denominator of alpha beta.",
       "show": "$\\dfrac{\\alpha^2}{\\beta} + \\dfrac{\\beta^2}{\\alpha} = \\dfrac{\\alpha^3 + \\beta^3}{\\alpha\\beta} = \\dfrac{p^3 - 3pq}{q}$"
      },
      {
       "say": "Multiply the new roots: alpha squared beta squared over alpha beta is alpha beta.",
       "show": "$\\dfrac{\\alpha^2}{\\beta}\\cdot\\dfrac{\\beta^2}{\\alpha} = \\alpha\\beta = q$"
      },
      {
       "say": "Form the quadratic and multiply through by q.",
       "show": "$x^2 - \\dfrac{p^3 - 3pq}{q}x + q = 0$"
      },
      {
       "say": "So the equation is this.",
       "show": "$qx^2 - (p^3 - 3pq)x + q^2 = 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Given that $p = 3$, that $\\alpha$ and $\\beta$ are real and distinct, and that $\\dfrac{\\alpha^2}{\\beta} + \\dfrac{\\beta^2}{\\alpha} = 6$, find the value of $q$, justifying that it satisfies all the conditions.",
     "answer": "$q = \\tfrac95$",
     "ms": [
      "M1 $\\dfrac{27 - 9q}{q} = 6$",
      "A1 $q = \\tfrac95$",
      "M1 discriminant $p^2 - 4q$",
      "A1 $9 - 7.2 > 0$ so real and distinct"
     ],
     "steps": [
      {
       "say": "Substitute p equals three into the sum found in part b.",
       "show": "$\\dfrac{27 - 9q}{q} = 6$"
      },
      {
       "say": "Solve: twenty seven equals fifteen q.",
       "show": "$27 = 15q \\Rightarrow q = \\tfrac95$"
      },
      {
       "say": "Check the roots are real and distinct with the discriminant of the original equation.",
       "show": "$p^2 - 4q = 9 - \\tfrac{36}{5} = \\tfrac95 > 0$"
      },
      {
       "say": "The discriminant is positive and q is not zero, so q equals nine fifths works.",
       "show": "$q = \\tfrac95$"
      }
     ]
    }
   ]
  },
  {
   "n": 2,
   "points": [
    "f1_cx",
    "f1_argand",
    "f1_mularg"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the complex numbers $z$ which satisfy $zz^* + 2iz = 8 + 4i$, giving your answers in the form $x + iy$ with exact values.",
     "answer": "$z = 2 + (1 + \\sqrt5)i$ or $z = 2 + (1 - \\sqrt5)i$",
     "ms": [
      "M1 $z = x + iy$ substituted",
      "B1 $zz^* = x^2 + y^2$",
      "M1 equates real and imaginary parts",
      "A1 $x = 2$",
      "M1 solves $y^2 - 2y - 4 = 0$",
      "A1 both answers"
     ],
     "steps": [
      {
       "say": "Let z equal x plus i y. Then z times its conjugate is x squared plus y squared, which is real.",
       "show": "$zz^* = x^2 + y^2$"
      },
      {
       "say": "Two i times z is two i x minus two y.",
       "show": "$2iz = -2y + 2xi$"
      },
      {
       "say": "Equate the real parts and the imaginary parts.",
       "show": "$x^2 + y^2 - 2y = 8,\\quad 2x = 4$"
      },
      {
       "say": "So x is two. Substitute to get a quadratic in y.",
       "show": "$y^2 - 2y - 4 = 0 \\Rightarrow y = 1 \\pm \\sqrt5$"
      },
      {
       "say": "There are two solutions.",
       "show": "$z = 2 + (1 \\pm \\sqrt5)i$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the exact modulus and argument of $\\dfrac{1 + \\sqrt3\\,i}{1 - i}$.",
     "answer": "modulus $\\sqrt2$, argument $\\tfrac{7\\pi}{12}$",
     "ms": [
      "M1 moduli $2$ and $\\sqrt2$",
      "M1 arguments $\\tfrac{\\pi}{3}$ and $-\\tfrac{\\pi}{4}$",
      "A1 $\\sqrt2$",
      "A1 $\\tfrac{7\\pi}{12}$"
     ],
     "steps": [
      {
       "say": "Find modulus and argument of the top: modulus two, argument pi over three.",
       "show": "$|1 + \\sqrt3 i| = 2,\\ \\arg = \\tfrac{\\pi}{3}$"
      },
      {
       "say": "The bottom has modulus root two and argument minus pi over four.",
       "show": "$|1 - i| = \\sqrt2,\\ \\arg = -\\tfrac{\\pi}{4}$"
      },
      {
       "say": "Divide the moduli and subtract the arguments.",
       "show": "modulus $= \\tfrac{2}{\\sqrt2} = \\sqrt2$, argument $= \\tfrac{\\pi}{3} + \\tfrac{\\pi}{4} = \\tfrac{7\\pi}{12}$"
      },
      {
       "say": "Seven pi over twelve is between minus pi and pi, so it is the principal argument.",
       "show": "$\\sqrt2,\\ \\tfrac{7\\pi}{12}$"
      }
     ]
    }
   ]
  },
  {
   "n": 3,
   "points": [
    "f1_poly",
    "f1_argand"
   ],
   "q": "It is given that $1 + i$ is a root of the equation $z^4 + az^3 + 9z^2 + bz + 6 = 0$, where $a$ and $b$ are real.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the values of $a$ and $b$.",
     "answer": "$a = -4,\\ b = -10$",
     "ms": [
      "M1 substitutes $z = 1 + i$ with powers $2i,\\ -2 + 2i,\\ -4$",
      "M1 equates real and imaginary parts",
      "A1 $a = -4$",
      "A1 $b = -10$"
     ],
     "steps": [
      {
       "say": "Work out the powers of one plus i.",
       "show": "$(1+i)^2 = 2i,\\ (1+i)^3 = -2 + 2i,\\ (1+i)^4 = -4$"
      },
      {
       "say": "Substitute into the equation.",
       "show": "$-4 + a(-2 + 2i) + 18i + b(1 + i) + 6 = 0$"
      },
      {
       "say": "Equate real parts and imaginary parts to zero.",
       "show": "$2 - 2a + b = 0,\\quad 2a + 18 + b = 0$"
      },
      {
       "say": "Subtracting gives minus four a equals sixteen, so a is minus four and b is minus ten.",
       "show": "$a = -4,\\ b = -10$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the other three roots.",
     "answer": "$1 - i,\\ 1 \\pm \\sqrt2\\,i$",
     "ms": [
      "B1 $1 - i$ (conjugate)",
      "M1 quadratic factor $z^2 - 2z + 2$",
      "M1 other factor $z^2 - 2z + 3$",
      "A1 $1 \\pm \\sqrt2 i$"
     ],
     "steps": [
      {
       "say": "Real coefficients mean the conjugate one minus i is also a root, giving a quadratic factor.",
       "show": "$(z - 1 - i)(z - 1 + i) = z^2 - 2z + 2$"
      },
      {
       "say": "Divide the quartic by this factor.",
       "show": "$z^4 - 4z^3 + 9z^2 - 10z + 6 = (z^2 - 2z + 2)(z^2 - 2z + 3)$"
      },
      {
       "say": "Solve the second factor by completing the square.",
       "show": "$(z - 1)^2 = -2 \\Rightarrow z = 1 \\pm \\sqrt2 i$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Show that all four roots lie on a single straight line in the Argand diagram, and state the modulus of each root.",
     "answer": "All have real part $1$; moduli $\\sqrt2,\\ \\sqrt2,\\ \\sqrt3,\\ \\sqrt3$",
     "ms": [
      "B1 line $\\mathrm{Re}(z) = 1$",
      "B1 $\\sqrt2$ and $\\sqrt3$"
     ],
     "steps": [
      {
       "say": "Every root has real part one.",
       "show": "$1 \\pm i,\\ 1 \\pm \\sqrt2 i$"
      },
      {
       "say": "So the points all lie on the vertical line x equals one.",
       "show": "$\\mathrm{Re}(z) = 1$"
      },
      {
       "say": "The moduli are root two for one plus or minus i, and root three for the other pair.",
       "show": "$|1 \\pm i| = \\sqrt2,\\quad |1 \\pm \\sqrt2 i| = \\sqrt3$"
      }
     ]
    }
   ]
  },
  {
   "n": 4,
   "points": [
    "cx4",
    "f1_argand"
   ],
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find a Cartesian equation of the locus $|z - 4| = |z - 2i|$.",
     "answer": "$y = 2x - 3$",
     "ms": [
      "M1 substitutes $z = x + iy$ and squares",
      "M1 simplifies",
      "A1 $y = 2x - 3$"
     ],
     "steps": [
      {
       "say": "Write z as x plus i y and square both moduli.",
       "show": "$(x - 4)^2 + y^2 = x^2 + (y - 2)^2$"
      },
      {
       "say": "The squared terms cancel.",
       "show": "$-8x + 16 = -4y + 4$"
      },
      {
       "say": "Rearrange.",
       "show": "$y = 2x - 3$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Hence find the least value of $|z|$ for points on this locus.",
     "answer": "$\\dfrac{3}{\\sqrt5} = \\dfrac{3\\sqrt5}{5}$",
     "ms": [
      "M1 recognises perpendicular distance from $O$",
      "M1 $\\dfrac{|{-3}|}{\\sqrt{2^2 + 1^2}}$",
      "A1 $\\tfrac{3\\sqrt5}{5}$"
     ],
     "steps": [
      {
       "say": "The modulus of z is the distance from the origin. The least value is the perpendicular distance from the origin to the line.",
       "show": "$2x - y - 3 = 0$"
      },
      {
       "say": "Use the point to line distance formula.",
       "show": "$d = \\dfrac{|2(0) - 0 - 3|}{\\sqrt{4 + 1}}$"
      },
      {
       "say": "So the least value is three over root five.",
       "show": "$|z|_{\\min} = \\dfrac{3}{\\sqrt5} = \\dfrac{3\\sqrt5}{5}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "The complex number $w$ satisfies $|w - 3 - 4i| = 2$. Find the greatest value of $|w|$ and the greatest value of $\\arg w$, giving the argument in radians to 3 significant figures.",
     "answer": "$|w|_{\\max} = 7$; $(\\arg w)_{\\max} = 1.34$",
     "ms": [
      "M1 distance from $O$ to centre $= 5$",
      "A1 $|w|_{\\max} = 7$",
      "M1 tangent from $O$: half-angle $\\sin^{-1}\\tfrac25$",
      "M1 adds to $\\tan^{-1}\\tfrac43$",
      "A2 $1.34$ (A1 for an unrounded value such as $1.339$)"
     ],
     "steps": [
      {
       "say": "The locus is a circle with centre three plus four i and radius two. The centre is five units from the origin.",
       "show": "centre $(3, 4)$, $r = 2$, $|3 + 4i| = 5$"
      },
      {
       "say": "The furthest point is on the line through the origin and the centre, a further two units out.",
       "show": "$|w|_{\\max} = 5 + 2 = 7$"
      },
      {
       "say": "The greatest argument occurs where a line from the origin is tangent to the circle, above the centre.",
       "show": "tangent from $O$"
      },
      {
       "say": "The tangent meets the radius at right angles, so the angle between the tangent and the line to the centre has sine two over five.",
       "show": "$\\sin\\phi = \\tfrac25 \\Rightarrow \\phi = 0.4115$"
      },
      {
       "say": "Add this to the argument of the centre.",
       "show": "$\\arg w_{\\max} = \\tan^{-1}\\tfrac43 + \\sin^{-1}\\tfrac25 = 0.9273 + 0.4115 = 1.34$"
      }
     ]
    }
   ]
  },
  {
   "n": 5,
   "points": [
    "f1_invar",
    "f1_tr",
    "f1_det"
   ],
   "q": "The transformation $T$ is represented by $\\mathbf{M} = \\begin{pmatrix} 4 & -1 \\\\ 2 & 1 \\end{pmatrix}$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Find the equations of the invariant lines of $T$ that pass through the origin.",
     "answer": "$y = x$ and $y = 2x$",
     "ms": [
      "M1 image of $(x, mx)$",
      "M1 condition $(2 + m) = m(4 - m)$",
      "A1 $m^2 - 3m + 2 = 0$",
      "A1 $m = 1$",
      "A1 $m = 2$"
     ],
     "steps": [
      {
       "say": "Find the image of a general point on the line y equals m x.",
       "show": "$\\mathbf{M}\\begin{pmatrix} x \\\\ mx \\end{pmatrix} = \\begin{pmatrix} (4 - m)x \\\\ (2 + m)x \\end{pmatrix}$"
      },
      {
       "say": "The image lies on the same line, so its y coordinate is m times its x coordinate.",
       "show": "$(2 + m)x = m(4 - m)x$"
      },
      {
       "say": "Divide by x and rearrange.",
       "show": "$m^2 - 3m + 2 = 0 \\Rightarrow (m - 1)(m - 2) = 0$"
      },
      {
       "say": "So there are two invariant lines through the origin.",
       "show": "$y = x,\\quad y = 2x$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Determine whether either of these is a line of invariant points.",
     "answer": "Neither: $(x, x) \\mapsto (3x, 3x)$, $(x, 2x) \\mapsto (2x, 4x)$",
     "ms": [
      "M1 tests points on each line",
      "A1 neither (scale factors $3$ and $2$ along the lines)"
     ],
     "steps": [
      {
       "say": "Apply M to a point on y equals x.",
       "show": "$(x, x) \\mapsto (3x, 3x)$"
      },
      {
       "say": "Apply M to a point on y equals two x.",
       "show": "$(x, 2x) \\mapsto (2x, 4x)$"
      },
      {
       "say": "Points stay on their lines but are stretched by factors three and two, so neither is a line of invariant points.",
       "show": "neither line is pointwise invariant"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A region $R$ of area $5$ square units is transformed by $T$ and the image is then transformed by $\\mathbf{N} = \\begin{pmatrix} 2 & 1 \\\\ k & 3 \\end{pmatrix}$. The final image has area $60$ square units. Find the possible values of $k$.",
     "answer": "$k = 4$ or $k = 8$",
     "ms": [
      "B1 $\\det\\mathbf{M} = 6$",
      "M1 $5 \\times 6 \\times |6 - k| = 60$",
      "A1 $|6 - k| = 2$",
      "A1 both values"
     ],
     "steps": [
      {
       "say": "Each determinant is an area scale factor. The determinant of M is four plus two, which is six.",
       "show": "$\\det\\mathbf{M} = 4 + 2 = 6$"
      },
      {
       "say": "The determinant of N is six minus k. Areas multiply by the modulus of each.",
       "show": "$5 \\times 6 \\times |6 - k| = 60$"
      },
      {
       "say": "So the modulus of six minus k is two.",
       "show": "$|6 - k| = 2$"
      },
      {
       "say": "k is four or eight. With k equal to eight, N reverses orientation but the area is still sixty.",
       "show": "$k = 4$ or $k = 8$"
      }
     ]
    }
   ]
  },
  {
   "n": 6,
   "points": [
    "mx1",
    "mx4"
   ],
   "q": "$\\mathbf{A} = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 4 & k \\end{pmatrix}$. The system $\\mathbf{A}\\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ m \\end{pmatrix}$ is to be solved.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Show that $\\det\\mathbf{A} = k - 7$.",
     "answer": "$1(2k - 12) - 1(k - 3) + 1(4 - 2) = k - 7$",
     "ms": [
      "M1 expansion",
      "A1 $k - 7$ shown"
     ],
     "steps": [
      {
       "say": "Expand along the first row.",
       "show": "$1\\begin{vmatrix} 2 & 3 \\\\ 4 & k \\end{vmatrix} - 1\\begin{vmatrix} 1 & 3 \\\\ 1 & k \\end{vmatrix} + 1\\begin{vmatrix} 1 & 2 \\\\ 1 & 4 \\end{vmatrix}$"
      },
      {
       "say": "Evaluate the minors.",
       "show": "$(2k - 12) - (k - 3) + 2$"
      },
      {
       "say": "This simplifies to k minus seven.",
       "show": "$\\det\\mathbf{A} = k - 7$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "For $k = 5$, find $\\mathbf{A}^{-1}$ and hence solve the system when $m = 0$.",
     "answer": "$\\mathbf{A}^{-1} = -\\tfrac12\\begin{pmatrix} -2 & -1 & 1 \\\\ -2 & 4 & -2 \\\\ 2 & -3 & 1 \\end{pmatrix}$; $x = 2,\\ y = -3,\\ z = 2$",
     "ms": [
      "B1 $\\det\\mathbf{A} = -2$",
      "M1 cofactors",
      "M1 adjugate (transpose)",
      "A1 $\\mathbf{A}^{-1}$",
      "M1 $\\mathbf{A}^{-1}\\mathbf{b}$",
      "A1 $(2, -3, 2)$"
     ],
     "steps": [
      {
       "say": "With k equal to five the determinant is minus two.",
       "show": "$\\det\\mathbf{A} = 5 - 7 = -2$"
      },
      {
       "say": "Find the cofactors and transpose to get the adjugate.",
       "show": "$\\operatorname{adj}\\mathbf{A} = \\begin{pmatrix} -2 & -1 & 1 \\\\ -2 & 4 & -2 \\\\ 2 & -3 & 1 \\end{pmatrix}$"
      },
      {
       "say": "Divide by minus two.",
       "show": "$\\mathbf{A}^{-1} = -\\tfrac12\\begin{pmatrix} -2 & -1 & 1 \\\\ -2 & 4 & -2 \\\\ 2 & -3 & 1 \\end{pmatrix}$"
      },
      {
       "say": "Multiply by the right hand side one, two, zero.",
       "show": "$-\\tfrac12\\begin{pmatrix} -4 \\\\ 6 \\\\ -4 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ -3 \\\\ 2 \\end{pmatrix}$"
      },
      {
       "say": "Check in the third equation: two minus twelve plus ten is zero.",
       "show": "$x = 2,\\ y = -3,\\ z = 2$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "For $k = 7$, find the value of $m$ for which the equations are consistent. Describe the geometrical configuration of the three planes in this case and in the case where $m$ takes any other value.",
     "answer": "$m = 4$: sheaf (common line); otherwise a triangular prism (no common point)",
     "ms": [
      "M1 writes row 3 as $a\\,$row 1 $+ b\\,$row 2",
      "A1 $a = -2,\\ b = 3$",
      "A1 $m = 4$",
      "B1 sheaf when $m = 4$",
      "B1 triangular prism otherwise (no two planes parallel)"
     ],
     "steps": [
      {
       "say": "When k is seven the matrix is singular. Try to write the third row as a combination of the first two.",
       "show": "$(1, 4, 7) = a(1, 1, 1) + b(1, 2, 3)$"
      },
      {
       "say": "From the first two components, a plus b is one and a plus two b is four, so b is three and a is minus two. The third component checks: minus two plus nine is seven.",
       "show": "$a = -2,\\ b = 3$"
      },
      {
       "say": "For consistency the right hand sides must combine the same way.",
       "show": "$m = -2(1) + 3(2) = 4$"
      },
      {
       "say": "When m is four the planes share a common line: a sheaf.",
       "show": "$m = 4$: sheaf"
      },
      {
       "say": "Otherwise there is no solution. No two normals are parallel, so the planes meet in pairs in three parallel lines, forming a triangular prism.",
       "show": "$m \\ne 4$: triangular prism"
      }
     ]
    }
   ]
  },
  {
   "n": 7,
   "points": [
    "vc2",
    "vc3",
    "f1_line"
   ],
   "q": "The line $l$ has Cartesian equation $\\dfrac{x - 1}{2} = \\dfrac{y + 2}{-1} = \\dfrac{z - 3}{2}$ and the point $A$ has coordinates $(2, 0, 1)$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Find a Cartesian equation of the plane $\\Pi$ which contains $l$ and $A$.",
     "answer": "$-2x + 6y + 5z = 1$",
     "ms": [
      "B1 point $B(1, -2, 3)$ and direction $(2, -1, 2)$",
      "M1 $\\overrightarrow{BA} = (1, 2, -2)$",
      "M1 normal by vector product",
      "A1 $(-2, 6, 5)$ o.e.",
      "A1 $-2x + 6y + 5z = 1$ o.e."
     ],
     "steps": [
      {
       "say": "From the Cartesian form, the line passes through B, one, minus two, three, with direction two, minus one, two.",
       "show": "$B(1, -2, 3),\\quad \\mathbf{d} = (2, -1, 2)$"
      },
      {
       "say": "A second direction in the plane is from B to A.",
       "show": "$\\overrightarrow{BA} = (1, 2, -2)$"
      },
      {
       "say": "The normal is the vector product of the two directions.",
       "show": "$\\mathbf{n} = (2, -1, 2) \\times (1, 2, -2) = (-2, 6, 5)$"
      },
      {
       "say": "Use the point A to find the constant.",
       "show": "$\\mathbf{n}\\cdot\\mathbf{a} = -4 + 0 + 5 = 1$"
      },
      {
       "say": "So the plane is minus two x plus six y plus five z equals one.",
       "show": "$\\Pi:\\ -2x + 6y + 5z = 1$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "The point $P$ has coordinates $(-2, 12, 11)$. Find the perpendicular distance from $P$ to $\\Pi$ and the coordinates of the foot of the perpendicular.",
     "answer": "distance $2\\sqrt{65}$; foot $(2, 0, 1)$",
     "ms": [
      "M1 distance formula",
      "A1 $\\dfrac{130}{\\sqrt{65}} = 2\\sqrt{65}$",
      "M1 line $\\mathbf{r} = \\mathbf{p} + s\\mathbf{n}$",
      "M1 substitutes into $\\Pi$",
      "A1 $(2, 0, 1)$"
     ],
     "steps": [
      {
       "say": "Use the point to plane distance formula.",
       "show": "$d = \\dfrac{|-2(-2) + 6(12) + 5(11) - 1|}{\\sqrt{4 + 36 + 25}} = \\dfrac{130}{\\sqrt{65}}$"
      },
      {
       "say": "Simplify: one hundred and thirty over root sixty five is two root sixty five.",
       "show": "$d = 2\\sqrt{65} \\approx 16.1$"
      },
      {
       "say": "The perpendicular from P runs along the normal.",
       "show": "$\\mathbf{r} = (-2, 12, 11) + s(-2, 6, 5)$"
      },
      {
       "say": "Substitute into the plane: one hundred and thirty one plus sixty five s equals one, so s is minus two.",
       "show": "$131 + 65s = 1 \\Rightarrow s = -2$"
      },
      {
       "say": "The foot is the point A itself.",
       "show": "foot $= (2, 0, 1)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the coordinates of the reflection of $P$ in $\\Pi$.",
     "answer": "$(6, -12, -9)$",
     "ms": [
      "M1 uses $s = -4$ (or foot is the midpoint)",
      "A1 $(6, -12, -9)$"
     ],
     "steps": [
      {
       "say": "The foot is the midpoint of P and its reflection, so we go twice as far along the normal.",
       "show": "$s = -4$"
      },
      {
       "say": "Substitute.",
       "show": "$(-2, 12, 11) - 4(-2, 6, 5)$"
      },
      {
       "say": "The reflection is six, minus twelve, minus nine.",
       "show": "$P' = (6, -12, -9)$"
      }
     ]
    }
   ]
  },
  {
   "n": 8,
   "points": [
    "vc3",
    "vc2",
    "vc1"
   ],
   "q": "This question uses the line $l$ and plane $\\Pi:\\ -2x + 6y + 5z = 1$ from Question 7. The point $C$ has coordinates $(4, 1, -2)$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the perpendicular distance from $C$ to the line $l$.",
     "answer": "$\\dfrac{13\\sqrt2}{3} \\approx 6.13$",
     "ms": [
      "M1 $\\overrightarrow{BC} = (3, 3, -5)$",
      "M1 $|\\overrightarrow{BC} \\times \\mathbf{d}|/|\\mathbf{d}|$ (or minimises distance)",
      "A1 $\\sqrt{338}$",
      "A1 $\\tfrac{13\\sqrt2}{3}$"
     ],
     "steps": [
      {
       "say": "Take B, one, minus two, three, on the line and form the vector to C.",
       "show": "$\\overrightarrow{BC} = (3, 3, -5)$"
      },
      {
       "say": "The perpendicular distance is the magnitude of B C cross d, divided by the magnitude of d.",
       "show": "$\\overrightarrow{BC} \\times \\mathbf{d} = (3, 3, -5) \\times (2, -1, 2) = (1, -16, -9)$"
      },
      {
       "say": "The magnitude is root three hundred and thirty eight, which is thirteen root two. The magnitude of d is three.",
       "show": "$|(1, -16, -9)| = \\sqrt{338} = 13\\sqrt2,\\quad |\\mathbf{d}| = 3$"
      },
      {
       "say": "Divide.",
       "show": "$d = \\dfrac{13\\sqrt2}{3} \\approx 6.13$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The line $m$ passes through $C$ with direction $\\mathbf{i} + \\mathbf{j}$. Find the acute angle between $m$ and $\\Pi$.",
     "answer": "$20.5^\\circ$",
     "ms": [
      "M1 $\\mathbf{n}\\cdot\\mathbf{e} = 4$",
      "M1 $\\sin\\theta = \\dfrac{4}{\\sqrt{65}\\sqrt2}$",
      "A1 $20.5^\\circ$"
     ],
     "steps": [
      {
       "say": "Dot the normal of the plane with the direction of the line.",
       "show": "$(-2, 6, 5)\\cdot(1, 1, 0) = 4$"
      },
      {
       "say": "For a line and a plane, the sine of the angle equals this over the product of the magnitudes.",
       "show": "$\\sin\\theta = \\dfrac{4}{\\sqrt{65}\\,\\sqrt2} = \\dfrac{4}{\\sqrt{130}}$"
      },
      {
       "say": "So the angle is 20.5 degrees.",
       "show": "$\\theta = 20.5^\\circ$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the coordinates of the point where $m$ meets $\\Pi$.",
     "answer": "$\\left(\\tfrac{29}{4}, \\tfrac{17}{4}, -2\\right)$",
     "ms": [
      "M1 substitutes $(4 + s, 1 + s, -2)$",
      "A1 $s = \\tfrac{13}{4}$",
      "A1 point"
     ],
     "steps": [
      {
       "say": "A general point on m is four plus s, one plus s, minus two.",
       "show": "$(4 + s,\\ 1 + s,\\ -2)$"
      },
      {
       "say": "Substitute into the plane.",
       "show": "$-2(4 + s) + 6(1 + s) - 10 = 1 \\Rightarrow 4s - 12 = 1$"
      },
      {
       "say": "So s is thirteen quarters, giving this point.",
       "show": "$s = \\tfrac{13}{4} \\Rightarrow \\left(\\tfrac{29}{4}, \\tfrac{17}{4}, -2\\right)$"
      }
     ]
    }
   ]
  },
  {
   "n": 9,
   "points": [
    "vc1",
    "f1_v3"
   ],
   "q": "Relative to the origin $O$, the points $A$, $B$ and $C$ have position vectors $\\mathbf{a} = \\mathbf{i} + 2\\mathbf{j}$, $\\mathbf{b} = \\mathbf{j} + 3\\mathbf{k}$ and $\\mathbf{c} = 2\\mathbf{i} + k\\mathbf{j} + \\mathbf{k}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find $\\mathbf{a} \\times \\mathbf{b}$.",
     "answer": "$6\\mathbf{i} - 3\\mathbf{j} + \\mathbf{k}$",
     "ms": [
      "M1 determinant method",
      "A1 correct"
     ],
     "steps": [
      {
       "say": "Set up the determinant.",
       "show": "$\\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 2 & 0 \\\\ 0 & 1 & 3 \\end{vmatrix}$"
      },
      {
       "say": "Expand along the top row.",
       "show": "$\\mathbf{i}(6 - 0) - \\mathbf{j}(3 - 0) + \\mathbf{k}(1 - 0)$"
      },
      {
       "say": "The result is six i minus three j plus k.",
       "show": "$\\mathbf{a} \\times \\mathbf{b} = 6\\mathbf{i} - 3\\mathbf{j} + \\mathbf{k}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 1,
     "q": "Find the area of the parallelogram with sides $OA$ and $OB$.",
     "answer": "$\\sqrt{46}$",
     "ms": [
      "B1 $\\sqrt{46}$"
     ],
     "steps": [
      {
       "say": "The area of the parallelogram is the magnitude of the vector product.",
       "show": "$|\\mathbf{a} \\times \\mathbf{b}|$"
      },
      {
       "say": "Square and add the components.",
       "show": "$\\sqrt{36 + 9 + 1}$"
      },
      {
       "say": "The area is root forty six.",
       "show": "$\\sqrt{46} \\approx 6.78$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "The parallelepiped with edges $OA$, $OB$ and $OC$ has volume $20$. Find the possible values of $k$.",
     "answer": "$k = -\\tfrac73$ or $k = 11$",
     "ms": [
      "M1 $\\mathbf{c}\\cdot(\\mathbf{a} \\times \\mathbf{b})$",
      "A1 $13 - 3k$",
      "M1 $|13 - 3k| = 20$",
      "A1 both values"
     ],
     "steps": [
      {
       "say": "The volume is the modulus of the scalar triple product.",
       "show": "$V = |\\mathbf{c}\\cdot(\\mathbf{a} \\times \\mathbf{b})|$"
      },
      {
       "say": "Dot c with six, minus three, one.",
       "show": "$12 - 3k + 1 = 13 - 3k$"
      },
      {
       "say": "Set the modulus equal to twenty: thirteen minus three k is twenty or minus twenty.",
       "show": "$13 - 3k = \\pm 20$"
      },
      {
       "say": "Solve both.",
       "show": "$k = -\\tfrac73$ or $k = 11$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Find the value of $k$ for which $O$, $A$, $B$ and $C$ are coplanar.",
     "answer": "$k = \\tfrac{13}{3}$",
     "ms": [
      "M1 triple product $= 0$",
      "A1 $\\tfrac{13}{3}$"
     ],
     "steps": [
      {
       "say": "Four points are coplanar when the parallelepiped has zero volume.",
       "show": "$\\mathbf{c}\\cdot(\\mathbf{a} \\times \\mathbf{b}) = 0$"
      },
      {
       "say": "So thirteen minus three k is zero.",
       "show": "$13 - 3k = 0$"
      },
      {
       "say": "k is thirteen thirds.",
       "show": "$k = \\tfrac{13}{3}$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 2,
     "q": "Prove that, for any vectors $\\mathbf{u}$ and $\\mathbf{v}$, the vector $\\mathbf{u} \\times \\mathbf{v}$ is perpendicular to $\\mathbf{u}$.",
     "answer": "$\\mathbf{u}\\cdot(\\mathbf{u} \\times \\mathbf{v})$ is a determinant with two equal rows, so it is $0$",
     "ms": [
      "M1 writes $\\mathbf{u}\\cdot(\\mathbf{u} \\times \\mathbf{v})$ as a $3 \\times 3$ determinant",
      "A1 two equal rows $\\Rightarrow 0$, hence perpendicular"
     ],
     "steps": [
      {
       "say": "The scalar triple product u dot u cross v can be written as a three by three determinant.",
       "show": "$\\mathbf{u}\\cdot(\\mathbf{u} \\times \\mathbf{v}) = \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}$"
      },
      {
       "say": "A determinant with two identical rows is zero.",
       "show": "$= 0$"
      },
      {
       "say": "A zero scalar product means the vectors are perpendicular, provided neither is the zero vector.",
       "show": "$\\mathbf{u} \\perp \\mathbf{u} \\times \\mathbf{v}$"
      }
     ]
    }
   ]
  }
 ]
});
