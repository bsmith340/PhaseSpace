// BCS Academy original papers · not CCEA papers
// Further Maths A2 2 Applied Mathematics (CCEA format: 2 h 15 min, four sections of 75 marks, answer two: 150 marks): three original practice papers (easy, medium, hard) registered with BCSP (js/bcsp.js).
BCSP.add({
 "id": "f4-easy",
 "unit": "f4",
 "level": "easy",
 "title": "Further Maths A2 2 · Paper A (Easy)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f4_shm"
   ],
   "q": "Answer the questions in <b>two</b> sections only: A and B, A and C, A and D, or C and D. Each section carries 75 marks, so your paper is out of 150. Take $g = 9.8$ m s$^{-2}$.<br><b>Section A · Mechanics 1</b> (75 marks)<br>A particle moves with simple harmonic motion along a straight line about a centre $O$. The amplitude is $0.5$ m and the period is $\\pi$ s.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the maximum speed of the particle.",
     "answer": "$1$ m s$^{-1}$",
     "ms": [
      "M1 $\\omega = \\frac{2\\pi}{T}$",
      "A1 $\\omega = 2$",
      "A1 $v_{\\max} = a\\omega = 1$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The period is 2 pi over omega, and the period is pi, so omega is 2.",
       "show": "$\\omega = \\frac{2\\pi}{\\pi} = 2$"
      },
      {
       "say": "The maximum speed occurs at the centre and equals amplitude times omega.",
       "show": "$v_{\\max} = a\\omega$"
      },
      {
       "say": "So the maximum speed is 0.5 times 2, which is 1 metre per second.",
       "show": "$v_{\\max} = 0.5\\times2 = 1$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the speed of the particle when it is $0.3$ m from $O$.",
     "answer": "$0.8$ m s$^{-1}$",
     "ms": [
      "M1 $v^2 = \\omega^2(a^2 - x^2)$",
      "A1 $4(0.25 - 0.09)$",
      "A1 $0.8$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "Use the standard result linking speed and displacement.",
       "show": "$v^2 = \\omega^2(a^2-x^2)$"
      },
      {
       "say": "Substitute omega equals 2, a equals 0.5 and x equals 0.3.",
       "show": "$v^2 = 4(0.25-0.09) = 0.64$"
      },
      {
       "say": "Take the square root.",
       "show": "$v = 0.8$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the maximum magnitude of the acceleration.",
     "answer": "$2$ m s$^{-2}$",
     "ms": [
      "M1 $\\omega^2a$",
      "A1 $2$ m s$^{-2}$"
     ],
     "steps": [
      {
       "say": "The acceleration is minus omega squared x, so it is greatest at the ends of the motion.",
       "show": "$|\\ddot x|_{\\max} = \\omega^2a$"
      },
      {
       "say": "Substitute.",
       "show": "$4\\times0.5$"
      },
      {
       "say": "So the maximum acceleration is 2 metres per second squared.",
       "show": "$2$ m s$^{-2}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "Find the time taken for the particle to move directly from $O$ to a point $0.25$ m from $O$.",
     "answer": "$\\frac{\\pi}{12}\\approx0.262$ s",
     "ms": [
      "M1 $x = a\\sin\\omega t$ (starting at $O$)",
      "A1 $0.25 = 0.5\\sin2t$",
      "M1 $\\sin2t = \\frac12$",
      "A1 $t = \\frac{\\pi}{12} = 0.262$ s"
     ],
     "steps": [
      {
       "say": "Starting from the centre, the displacement is a sin omega t.",
       "show": "$x = 0.5\\sin2t$"
      },
      {
       "say": "Set x equal to 0.25.",
       "show": "$\\sin2t = 0.5$"
      },
      {
       "say": "The first time this happens is when 2t equals pi over 6.",
       "show": "$2t = \\frac{\\pi}{6}$"
      },
      {
       "say": "So t is pi over 12, about 0.262 seconds.",
       "show": "$t = \\frac{\\pi}{12}\\approx0.262$ s"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f4_pend",
    "f4_elosc"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "A seconds pendulum has a period of $2$ s. Find its length.",
     "answer": "$0.993$ m",
     "ms": [
      "M1 $T = 2\\pi\\sqrt{\\frac{l}{g}}$",
      "M1 $l = \\frac{gT^2}{4\\pi^2}$",
      "A1 $0.993$ m"
     ],
     "steps": [
      {
       "say": "The period of a simple pendulum is 2 pi root l over g.",
       "show": "$2 = 2\\pi\\sqrt{\\frac{l}{9.8}}$"
      },
      {
       "say": "Rearrange for l.",
       "show": "$l = \\frac{9.8\\times4}{4\\pi^2} = \\frac{9.8}{\\pi^2}$"
      },
      {
       "say": "Evaluate.",
       "show": "$l \\approx 0.993$ m"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the period of a simple pendulum of length $0.5$ m.",
     "answer": "$1.42$ s",
     "ms": [
      "M1 substitution into $2\\pi\\sqrt{l/g}$",
      "A1 $1.42$ s"
     ],
     "steps": [
      {
       "say": "Substitute l equals 0.5 into the period formula.",
       "show": "$T = 2\\pi\\sqrt{\\frac{0.5}{9.8}}$"
      },
      {
       "say": "Evaluate.",
       "show": "$T\\approx1.42$ s"
      },
      {
       "say": "So the period is about 1.42 seconds.",
       "show": "$1.42$ s"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "A particle of mass $0.5$ kg hangs in equilibrium from one end of a light elastic string of natural length $0.8$ m and modulus of elasticity $19.6$ N. The other end of the string is fixed. Find the extension of the string.",
     "answer": "$0.2$ m",
     "ms": [
      "M1 $T = \\frac{\\lambda e}{l}$",
      "M1 $T = mg$",
      "A1 $e = 0.2$ m"
     ],
     "steps": [
      {
       "say": "In equilibrium the tension balances the weight.",
       "show": "$T = 0.5\\times9.8 = 4.9$ N"
      },
      {
       "say": "Hooke's law gives tension equals lambda e over l.",
       "show": "$4.9 = \\frac{19.6e}{0.8}$"
      },
      {
       "say": "Solve for e.",
       "show": "$e = 0.2$ m"
      }
     ]
    },
    {
     "l": "d",
     "marks": 5,
     "q": "The particle is pulled down a further distance and released. While the string is taut, let $x$ m be the displacement of the particle below its equilibrium position. Show that the particle moves with simple harmonic motion and find its period.",
     "answer": "$\\ddot x = -49x$; period $\\frac{2\\pi}{7}\\approx0.898$ s",
     "ms": [
      "M1 Newton's second law with tension $\\frac{19.6(0.2+x)}{0.8}$",
      "A1 $0.5\\ddot x = 4.9 - 24.5(0.2+x)$",
      "A1 $\\ddot x = -49x$",
      "M1 $\\omega = 7$",
      "A1 $T = \\frac{2\\pi}{7} = 0.898$ s"
     ],
     "steps": [
      {
       "say": "At displacement x below equilibrium, the extension is 0.2 plus x.",
       "show": "$T = \\frac{19.6(0.2+x)}{0.8} = 24.5(0.2+x)$"
      },
      {
       "say": "Apply Newton's second law downwards.",
       "show": "$0.5\\ddot x = 4.9 - 24.5(0.2+x) = -24.5x$"
      },
      {
       "say": "Divide by 0.5. This is the SHM equation with omega squared equal to 49.",
       "show": "$\\ddot x = -49x$"
      },
      {
       "say": "So omega is 7 and the period is 2 pi over 7.",
       "show": "$T = \\frac{2\\pi}{7}\\approx0.898$ s"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "The particle is released from rest $0.1$ m below its equilibrium position. Explain why the string remains taut throughout the motion, and find the maximum speed of the particle.",
     "answer": "Amplitude $0.1 \\lt 0.2$; $v_{\\max} = 0.7$ m s$^{-1}$",
     "ms": [
      "B1 amplitude $0.1$ m is less than equilibrium extension $0.2$ m",
      "M1 $v_{\\max} = a\\omega$",
      "A1 $0.7$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The particle rises at most 0.1 metres above equilibrium, but the string only becomes slack 0.2 metres above it.",
       "show": "$a = 0.1 \\lt 0.2 = e$"
      },
      {
       "say": "So SHM applies throughout, and the maximum speed is amplitude times omega.",
       "show": "$v_{\\max} = a\\omega$"
      },
      {
       "say": "That is 0.1 times 7.",
       "show": "$v_{\\max} = 0.7$ m s$^{-1}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f4_damp"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A particle of mass $1$ kg is attached to a spring and moves in a resisting medium. Its displacement $x$ m from equilibrium at time $t$ s satisfies $$\\frac{d^2x}{dt^2} + 4\\frac{dx}{dt} + 13x = 0.$$ It is released from rest with $x = 0.2$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Show that the motion is lightly damped.",
     "answer": "Discriminant $16 - 52 \\lt 0$",
     "ms": [
      "M1 auxiliary equation $m^2+4m+13=0$",
      "A1 discriminant negative so light damping (oscillatory)"
     ],
     "steps": [
      {
       "say": "Write the auxiliary equation.",
       "show": "$m^2 + 4m + 13 = 0$"
      },
      {
       "say": "Its discriminant is 16 minus 52, which is negative.",
       "show": "$b^2 - 4ac = -36 \\lt 0$"
      },
      {
       "say": "Complex roots mean the particle oscillates while the amplitude decays: light damping.",
       "show": "Lightly damped"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find $x$ in terms of $t$.",
     "answer": "$x = e^{-2t}\\left(0.2\\cos3t + \\frac{2}{15}\\sin3t\\right)$",
     "ms": [
      "M1 roots $-2\\pm3i$",
      "A1 $x = e^{-2t}(A\\cos3t+B\\sin3t)$",
      "B1 $A = 0.2$",
      "M1 differentiate and use $\\dot x(0)=0$: $-2A+3B = 0$",
      "A1 $B = \\frac{2}{15}$"
     ],
     "steps": [
      {
       "say": "Solve the auxiliary equation.",
       "show": "$m = -2\\pm3i$"
      },
      {
       "say": "So the general solution is a decaying oscillation.",
       "show": "$x = e^{-2t}(A\\cos3t+B\\sin3t)$"
      },
      {
       "say": "At t equals 0, x is 0.2, so A is 0.2.",
       "show": "$A = 0.2$"
      },
      {
       "say": "The velocity at t equals 0 is minus 2A plus 3B, which must be zero.",
       "show": "$-0.4 + 3B = 0 \\Rightarrow B = \\frac{2}{15}$"
      },
      {
       "say": "Write the solution.",
       "show": "$x = e^{-2t}\\left(0.2\\cos3t+\\frac{2}{15}\\sin3t\\right)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the time between successive instants at which the particle passes through the equilibrium position moving in the same direction.",
     "answer": "$\\frac{2\\pi}{3}\\approx2.09$ s",
     "ms": [
      "M1 period of the trigonometric factor $\\frac{2\\pi}{3}$",
      "A1 $2.09$ s"
     ],
     "steps": [
      {
       "say": "The particle is at equilibrium when the trigonometric bracket is zero.",
       "show": "$A\\cos3t+B\\sin3t = 0$"
      },
      {
       "say": "That bracket repeats every 2 pi over 3 seconds.",
       "show": "$\\frac{2\\pi}{3}$"
      },
      {
       "say": "So the time is about 2.09 seconds.",
       "show": "$\\approx2.09$ s"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "The resistance is changed so the equation becomes $\\ddot x + k\\dot x + 13x = 0$. Find the value of $k$ for critical damping.",
     "answer": "$k = 2\\sqrt{13}\\approx7.21$",
     "ms": [
      "M1 $k^2 = 52$",
      "A1 $2\\sqrt{13}$"
     ],
     "steps": [
      {
       "say": "Critical damping happens when the auxiliary equation has a repeated root.",
       "show": "$k^2 - 4(13) = 0$"
      },
      {
       "say": "So k squared is 52.",
       "show": "$k^2 = 52$"
      },
      {
       "say": "Take the positive root.",
       "show": "$k = 2\\sqrt{13}\\approx7.21$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f4_com1",
    "f4_lam",
    "f4_susp"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Particles of mass $2$ kg, $3$ kg and $5$ kg are placed at the points $(0,0)$, $(4,0)$ and $(2,3)$ respectively. Find the coordinates of their centre of mass.",
     "answer": "$(2.2,\\ 1.5)$",
     "ms": [
      "M1 $\\bar x = \\frac{\\sum mx}{\\sum m}$",
      "A1 $\\bar x = 2.2$",
      "M1 same for $\\bar y$",
      "A1 $\\bar y = 1.5$"
     ],
     "steps": [
      {
       "say": "The total mass is 10 kilograms.",
       "show": "$\\sum m = 10$"
      },
      {
       "say": "Take moments about the y-axis.",
       "show": "$10\\bar x = 2(0)+3(4)+5(2) = 22 \\Rightarrow \\bar x = 2.2$"
      },
      {
       "say": "Take moments about the x-axis.",
       "show": "$10\\bar y = 0+0+5(3) = 15\\Rightarrow\\bar y = 1.5$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "A uniform rectangular lamina $OABC$ has $O(0,0)$, $A(6,0)$, $B(6,4)$ and $C(0,4)$, in cm. The square with vertices $(4,2)$, $(6,2)$, $(6,4)$ and $(4,4)$ is removed. Find the centre of mass of the remaining lamina.",
     "answer": "$(2.6,\\ 1.8)$",
     "ms": [
      "B1 areas $24$, $4$, $20$",
      "B1 centres $(3,2)$ and $(5,3)$",
      "M1 subtraction of moments",
      "A1 $\\bar x = 2.6$",
      "A1 $\\bar y = 1.8$"
     ],
     "steps": [
      {
       "say": "Mass is proportional to area. The rectangle has area 24 and centre 3, 2. The square has area 4 and centre 5, 3. The remainder has area 20.",
       "show": "Rectangle: $24$ at $(3,2)$; square: $4$ at $(5,3)$; remainder $20$"
      },
      {
       "say": "The moment of the rectangle equals the moment of the square plus the moment of the remainder.",
       "show": "$24(3) = 4(5) + 20\\bar x \\Rightarrow \\bar x = \\frac{52}{20} = 2.6$"
      },
      {
       "say": "Do the same for y.",
       "show": "$24(2) = 4(3) + 20\\bar y \\Rightarrow \\bar y = \\frac{36}{20} = 1.8$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The lamina in (b) is freely suspended from $O$ and hangs in equilibrium. Find the angle between $OA$ and the vertical.",
     "answer": "$34.7°$",
     "ms": [
      "M1 $OG$ vertical",
      "M1 $\\tan\\alpha = \\frac{1.8}{2.6}$",
      "A1 $34.7°$"
     ],
     "steps": [
      {
       "say": "When suspended from O, the centre of mass G hangs directly below O.",
       "show": "Line $OG$ is vertical"
      },
      {
       "say": "The angle between OA, which lies along the x-axis, and OG has tangent y bar over x bar.",
       "show": "$\\tan\\alpha = \\frac{1.8}{2.6}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\alpha \\approx 34.7°$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f4_frame"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>Three light rods $AB$, $BC$ and $CA$, each of length $2$ m, are smoothly pin-jointed to form an equilibrium framework in the shape of an equilateral triangle, in a vertical plane with $AB$ horizontal and $C$ above $AB$. The framework is smoothly pinned to a fixed support at $A$ and rests on a smooth roller at $B$, so the reaction at $B$ is vertical. A load of $60$ N hangs from $C$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the reactions at $A$ and $B$.",
     "answer": "$30$ N vertically at each; no horizontal reaction at $A$",
     "ms": [
      "M1 moments about $A$",
      "A1 $R_B = 30$ N",
      "A1 $R_A = 30$ N vertical (horizontal component $0$)"
     ],
     "steps": [
      {
       "say": "C is directly above the midpoint of AB. Take moments about A.",
       "show": "$R_B\\times2 = 60\\times1 \\Rightarrow R_B = 30$ N"
      },
      {
       "say": "Resolve vertically for the framework.",
       "show": "$R_A + R_B = 60 \\Rightarrow R_A = 30$ N"
      },
      {
       "say": "No other external force is horizontal, so the reaction at A has no horizontal component.",
       "show": "$H_A = 0$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the force in rod $AC$, stating whether it is a tension or a thrust.",
     "answer": "Thrust $20\\sqrt3\\approx34.6$ N",
     "ms": [
      "M1 resolve vertically at joint $A$",
      "A1 $30 + T_{AC}\\sin60° = 0$",
      "A1 $T_{AC} = -20\\sqrt3$",
      "A1 thrust of $34.6$ N"
     ],
     "steps": [
      {
       "say": "At joint A, take tensions as pulling away from A along each rod. Rod AC pulls at 60 degrees above the horizontal.",
       "show": "Forces at $A$: $R_A = 30$ up, $T_{AC}$ along $AC$, $T_{AB}$ along $AB$"
      },
      {
       "say": "Resolve vertically.",
       "show": "$30 + T_{AC}\\sin60° = 0$"
      },
      {
       "say": "Solve: the force is negative, so the rod is in compression.",
       "show": "$T_{AC} = -\\frac{30}{\\sin60°} = -20\\sqrt3 \\approx -34.6$ N"
      },
      {
       "say": "So rod AC carries a thrust of about 34.6 newtons.",
       "show": "Thrust $34.6$ N"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the force in rod $AB$, stating whether it is a tension or a thrust. Hence write down the force in $BC$.",
     "answer": "$AB$: tension $10\\sqrt3\\approx17.3$ N; $BC$: thrust $34.6$ N",
     "ms": [
      "M1 resolve horizontally at $A$",
      "A1 $T_{AB} + T_{AC}\\cos60° = 0$",
      "A1 tension $17.3$ N",
      "B1 $BC$ thrust $34.6$ N by symmetry"
     ],
     "steps": [
      {
       "say": "Resolve horizontally at A.",
       "show": "$T_{AB} + T_{AC}\\cos60° = 0$"
      },
      {
       "say": "Substitute the value of T AC.",
       "show": "$T_{AB} = 20\\sqrt3\\times\\frac12 = 10\\sqrt3\\approx17.3$ N"
      },
      {
       "say": "It is positive, so AB is in tension.",
       "show": "Tension $17.3$ N"
      },
      {
       "say": "The framework and loads are symmetric, so BC matches AC: a thrust of 34.6 newtons.",
       "show": "$BC$: thrust $34.6$ N"
      }
     ]
    },
    {
     "l": "d",
     "marks": 1,
     "q": "State one modelling assumption you have used.",
     "answer": "e.g. rods are light; joints are smooth",
     "ms": [
      "B1 any valid assumption, e.g. rods light so forces act along them"
     ],
     "steps": [
      {
       "say": "The rods are modelled as light.",
       "show": "Light rods"
      },
      {
       "say": "So each rod exerts force only along its length.",
       "show": "Forces act along the rods"
      },
      {
       "say": "The joints are also assumed smooth.",
       "show": "Smooth pin-joints"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 6,
   "points": [
    "f4_bank"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A car travels round a bend of radius $50$ m on a road banked at $20°$ to the horizontal. The coefficient of friction between the tyres and the road is $0.3$. Model the car as a particle.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the speed at which there is no tendency for the car to slip.",
     "answer": "$13.4$ m s$^{-1}$",
     "ms": [
      "M1 resolve vertically $R\\cos20° = mg$",
      "M1 horizontally $R\\sin20° = \\frac{mv^2}{50}$",
      "M1 $v^2 = 50g\\tan20°$",
      "A1 $13.4$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "With no friction, only the normal reaction and weight act. Resolve vertically.",
       "show": "$R\\cos20° = mg$"
      },
      {
       "say": "Horizontally, the component of R provides the centripetal force.",
       "show": "$R\\sin20° = \\frac{mv^2}{50}$"
      },
      {
       "say": "Divide the equations.",
       "show": "$v^2 = 50\\times9.8\\tan20°$"
      },
      {
       "say": "Evaluate.",
       "show": "$v\\approx13.4$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the greatest speed at which the car can travel round the bend without slipping.",
     "answer": "$19.1$ m s$^{-1}$",
     "ms": [
      "B1 friction $0.3R$ down the slope",
      "M1 vertical: $R\\cos20° - 0.3R\\sin20° = mg$",
      "M1 horizontal: $R\\sin20° + 0.3R\\cos20° = \\frac{mv^2}{50}$",
      "M1 eliminate $R$ and $m$",
      "A1 $19.1$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "At top speed the car tends to slide up the slope, so limiting friction acts down the slope.",
       "show": "$F = 0.3R$ down the slope"
      },
      {
       "say": "Resolve vertically.",
       "show": "$R\\cos20° - 0.3R\\sin20° = mg$"
      },
      {
       "say": "Resolve horizontally, towards the centre.",
       "show": "$R\\sin20° + 0.3R\\cos20° = \\frac{mv^2}{50}$"
      },
      {
       "say": "Divide to eliminate R and m.",
       "show": "$v^2 = 50g\\,\\frac{\\sin20°+0.3\\cos20°}{\\cos20°-0.3\\sin20°}$"
      },
      {
       "say": "Evaluate.",
       "show": "$v\\approx19.1$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the least speed at which the car can travel round the bend without slipping.",
     "answer": "$5.32$ m s$^{-1}$",
     "ms": [
      "M1 friction now acts up the slope",
      "M1 $v^2 = 50g\\,\\frac{\\sin20°-0.3\\cos20°}{\\cos20°+0.3\\sin20°}$",
      "A1 $5.32$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "At the lowest speed the car tends to slide down, so friction acts up the slope. The signs of the friction terms change.",
       "show": "$R\\cos20° + 0.3R\\sin20° = mg,\\quad R\\sin20° - 0.3R\\cos20° = \\frac{mv^2}{50}$"
      },
      {
       "say": "Divide.",
       "show": "$v^2 = 50g\\,\\frac{\\sin20°-0.3\\cos20°}{\\cos20°+0.3\\sin20°}$"
      },
      {
       "say": "Evaluate.",
       "show": "$v\\approx5.32$ m s$^{-1}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 7,
   "points": [
    "f4_kin3"
   ],
   "q": "<b>Section B · Mechanics 2</b> (75 marks)<br>A particle moves so that its position vector at time $t$ s is $\\mathbf r = t^2\\mathbf i + (3t-1)\\mathbf j + 2t^3\\mathbf k$ m.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the velocity and the speed of the particle when $t = 1$.",
     "answer": "$2\\mathbf i + 3\\mathbf j + 6\\mathbf k$; speed $7$ m s$^{-1}$",
     "ms": [
      "M1 differentiate",
      "A1 $\\mathbf v = 2t\\mathbf i + 3\\mathbf j + 6t^2\\mathbf k$",
      "A1 $2\\mathbf i+3\\mathbf j+6\\mathbf k$",
      "A1 speed $7$"
     ],
     "steps": [
      {
       "say": "Differentiate each component with respect to t.",
       "show": "$\\mathbf v = 2t\\mathbf i + 3\\mathbf j + 6t^2\\mathbf k$"
      },
      {
       "say": "Put t equals 1.",
       "show": "$\\mathbf v = 2\\mathbf i + 3\\mathbf j + 6\\mathbf k$"
      },
      {
       "say": "The speed is the magnitude: root of 4 plus 9 plus 36, which is 7.",
       "show": "$|\\mathbf v| = \\sqrt{49} = 7$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the acceleration when $t = 2$.",
     "answer": "$2\\mathbf i + 24\\mathbf k$ m s$^{-2}$",
     "ms": [
      "M1 differentiate $\\mathbf v$",
      "A1 $2\\mathbf i + 24\\mathbf k$"
     ],
     "steps": [
      {
       "say": "Differentiate the velocity.",
       "show": "$\\mathbf a = 2\\mathbf i + 12t\\mathbf k$"
      },
      {
       "say": "Put t equals 2.",
       "show": "$\\mathbf a = 2\\mathbf i + 24\\mathbf k$"
      },
      {
       "say": "There is no j component because the j velocity is constant.",
       "show": "$2\\mathbf i + 24\\mathbf k$ m s$^{-2}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "A second particle has acceleration $\\mathbf a = 6t\\mathbf i - 2\\mathbf j + 4\\mathbf k$ m s$^{-2}$. At $t = 0$ it is at the origin with velocity $\\mathbf i + 2\\mathbf k$ m s$^{-1}$. Find its position vector when $t = 1$.",
     "answer": "$2\\mathbf i - \\mathbf j + 4\\mathbf k$ m",
     "ms": [
      "M1 integrate $\\mathbf a$",
      "A1 $\\mathbf v = (3t^2+1)\\mathbf i - 2t\\mathbf j + (4t+2)\\mathbf k$",
      "M1 integrate $\\mathbf v$",
      "A1 $\\mathbf r = (t^3+t)\\mathbf i - t^2\\mathbf j + (2t^2+2t)\\mathbf k$",
      "A1 $2\\mathbf i - \\mathbf j + 4\\mathbf k$"
     ],
     "steps": [
      {
       "say": "Integrate the acceleration and use the initial velocity for the constant.",
       "show": "$\\mathbf v = (3t^2+1)\\mathbf i - 2t\\mathbf j + (4t+2)\\mathbf k$"
      },
      {
       "say": "Integrate again. The particle starts at the origin, so there is no constant.",
       "show": "$\\mathbf r = (t^3+t)\\mathbf i - t^2\\mathbf j + (2t^2+2t)\\mathbf k$"
      },
      {
       "say": "Put t equals 1.",
       "show": "$\\mathbf r = 2\\mathbf i - \\mathbf j + 4\\mathbf k$ m"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f4_varacc"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A particle starts from rest and moves in a straight line with acceleration $(4 - 0.5v)$ m s$^{-2}$, where $v$ m s$^{-1}$ is its velocity at time $t$ s. Find $v$ in terms of $t$ and state the limiting speed.",
     "answer": "$v = 8(1 - e^{-t/2})$; limiting speed $8$ m s$^{-1}$",
     "ms": [
      "M1 separate variables $\\int\\frac{dv}{4-0.5v} = \\int dt$",
      "A1 $-2\\ln(4-0.5v) = t + c$",
      "M1 use $v=0$ at $t=0$",
      "A1 $v = 8(1-e^{-t/2})$",
      "B1 $8$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "Write a as dv by dt and separate the variables.",
       "show": "$\\int\\frac{dv}{4-0.5v} = \\int dt$"
      },
      {
       "say": "Integrate.",
       "show": "$-2\\ln(4-0.5v) = t + c$"
      },
      {
       "say": "At t equals 0, v is 0, so c is minus 2 ln 4.",
       "show": "$-2\\ln\\frac{4-0.5v}{4} = t$"
      },
      {
       "say": "Rearrange.",
       "show": "$1 - \\frac{v}{8} = e^{-t/2} \\Rightarrow v = 8(1-e^{-t/2})$"
      },
      {
       "say": "As t grows, the exponential tends to zero, so v tends to 8.",
       "show": "$v\\to8$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "A particle moves along the $x$-axis with acceleration $4x$ m s$^{-2}$, where $x$ m is its displacement from $O$. It passes through $O$ with speed $2$ m s$^{-1}$. Find its speed when $x = 1.5$.",
     "answer": "$\\sqrt{13}\\approx3.61$ m s$^{-1}$",
     "ms": [
      "M1 $v\\frac{dv}{dx} = 4x$",
      "A1 $\\frac12v^2 = 2x^2 + c$",
      "M1 use $v = 2$ at $x = 0$",
      "A1 $\\sqrt{13}$"
     ],
     "steps": [
      {
       "say": "Acceleration is a function of x, so use v dv by dx.",
       "show": "$v\\frac{dv}{dx} = 4x$"
      },
      {
       "say": "Integrate.",
       "show": "$\\frac12v^2 = 2x^2 + c$"
      },
      {
       "say": "At x equals 0, v is 2, so c is 2.",
       "show": "$v^2 = 4x^2 + 4$"
      },
      {
       "say": "Put x equals 1.5.",
       "show": "$v^2 = 9 + 4 = 13 \\Rightarrow v = \\sqrt{13}\\approx3.61$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A car of mass $1000$ kg moves along a straight horizontal road with its engine working at a constant power of $20$ kW. The resistance to motion is constant at $400$ N. Find the maximum speed of the car, and its acceleration when its speed is $20$ m s$^{-1}$.",
     "answer": "$50$ m s$^{-1}$; $0.6$ m s$^{-2}$",
     "ms": [
      "M1 driving force $\\frac{P}{v}$",
      "A1 $v_{\\max} = \\frac{20000}{400} = 50$",
      "M1 $\\frac{20000}{20} - 400 = 1000a$",
      "A1 $0.6$ m s$^{-2}$"
     ],
     "steps": [
      {
       "say": "The driving force is power divided by speed.",
       "show": "$F = \\frac{20000}{v}$"
      },
      {
       "say": "At maximum speed there is no acceleration, so the driving force equals the resistance.",
       "show": "$\\frac{20000}{v} = 400 \\Rightarrow v = 50$ m s$^{-1}$"
      },
      {
       "say": "At 20 metres per second the driving force is 1000 newtons. Apply Newton's second law.",
       "show": "$1000 - 400 = 1000a$"
      },
      {
       "say": "So the acceleration is 0.6.",
       "show": "$a = 0.6$ m s$^{-2}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f4_comcal"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A uniform lamina occupies the region bounded by the curve $y = x^2$, the $x$-axis and the line $x = 2$. Find the coordinates of its centre of mass.",
     "answer": "$(1.5,\\ 1.2)$",
     "ms": [
      "B1 area $\\frac83$",
      "M1 $\\bar x = \\frac{\\int xy\\,dx}{\\int y\\,dx}$",
      "A1 $\\bar x = 1.5$",
      "M1 $\\bar y = \\frac{\\int\\frac12y^2\\,dx}{\\int y\\,dx}$",
      "A1 $\\int_0^2\\frac12x^4\\,dx = \\frac{16}{5}$",
      "A1 $\\bar y = 1.2$"
     ],
     "steps": [
      {
       "say": "Find the area.",
       "show": "$A = \\int_0^2x^2\\,dx = \\frac83$"
      },
      {
       "say": "For x bar, take moments of thin vertical strips.",
       "show": "$\\bar x = \\frac{\\int_0^2x^3\\,dx}{8/3} = \\frac{4}{8/3} = 1.5$"
      },
      {
       "say": "For y bar, each strip has its centre at half its height, so use a half y squared.",
       "show": "$\\int_0^2\\frac12x^4\\,dx = \\frac{16}{5}$"
      },
      {
       "say": "Divide by the area.",
       "show": "$\\bar y = \\frac{16/5}{8/3} = \\frac65 = 1.2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "The region bounded by $y = \\sqrt x$, the $x$-axis and the line $x = 4$ is rotated through $2\\pi$ about the $x$-axis to form a uniform solid. Find the distance of its centre of mass from $O$.",
     "answer": "$\\frac83$",
     "ms": [
      "M1 $\\bar x = \\frac{\\int\\pi xy^2\\,dx}{\\int\\pi y^2\\,dx}$",
      "A1 $\\int_0^4x^2\\,dx = \\frac{64}{3}$",
      "A1 $\\int_0^4x\\,dx = 8$",
      "A1 $\\frac83$"
     ],
     "steps": [
      {
       "say": "For a solid of revolution, slice into discs of volume pi y squared dx.",
       "show": "$\\bar x = \\frac{\\int_0^4\\pi x\\cdot y^2\\,dx}{\\int_0^4\\pi y^2\\,dx}$"
      },
      {
       "say": "Here y squared is x.",
       "show": "$\\bar x = \\frac{\\int_0^4x^2\\,dx}{\\int_0^4x\\,dx} = \\frac{64/3}{8}$"
      },
      {
       "say": "Simplify.",
       "show": "$\\bar x = \\frac83$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f4_comp",
    "f4_topple"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A uniform solid consists of a cylinder of radius $3$ cm and height $8$ cm, with a solid hemisphere of radius $3$ cm joined to one end so that the plane faces coincide. Find the distance of the centre of mass of the solid from the plane end of the cylinder. (A uniform solid hemisphere of radius $r$ has its centre of mass $\\frac38r$ from its plane face.)",
     "answer": "$5.025$ cm",
     "ms": [
      "B1 volumes $72\\pi$ and $18\\pi$",
      "B1 positions $4$ and $8 + \\frac98$",
      "M1 moments equation",
      "A1 $90\\pi\\bar x = 72\\pi(4) + 18\\pi(9.125)$",
      "M1 solve",
      "A1 $5.025$ cm"
     ],
     "steps": [
      {
       "say": "The cylinder has volume pi times 9 times 8, which is 72 pi. The hemisphere has volume two thirds pi times 27, which is 18 pi.",
       "show": "$V_{cyl} = 72\\pi,\\ V_{hem} = 18\\pi$"
      },
      {
       "say": "Measure from the plane end of the cylinder. The cylinder's centre is 4 cm along; the hemisphere's is 8 plus three eighths of 3.",
       "show": "$4$ and $8 + 1.125 = 9.125$"
      },
      {
       "say": "Take moments.",
       "show": "$90\\pi\\bar x = 72\\pi(4) + 18\\pi(9.125)$"
      },
      {
       "say": "Solve.",
       "show": "$\\bar x = \\frac{288 + 164.25}{90} = 5.025$ cm"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The solid is freely suspended from a point on the circumference of its plane end. Find the angle between the axis of symmetry and the vertical.",
     "answer": "$30.8°$",
     "ms": [
      "M1 $G$ vertically below suspension point",
      "M1 $\\tan\\alpha = \\frac{3}{5.025}$",
      "A1 $30.8°$"
     ],
     "steps": [
      {
       "say": "The centre of mass hangs directly below the point of suspension.",
       "show": "Suspension point, $G$ in a vertical line"
      },
      {
       "say": "The suspension point is 3 cm from the axis, and G is 5.025 cm along the axis from the plane end.",
       "show": "$\\tan\\alpha = \\frac{3}{5.025}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\alpha\\approx30.8°$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "A uniform rectangular block of width $0.4$ m and height $1.2$ m rests on a rough plane, with its width up the slope. The coefficient of friction is $0.5$. The angle $\\theta$ of the plane is slowly increased. Determine whether the block slides or topples first.",
     "answer": "Topples first, at $18.4°$ (sliding would need $26.6°$)",
     "ms": [
      "M1 slides when $\\tan\\theta \\gt \\mu$",
      "A1 $26.6°$",
      "M1 topples when the line of action of the weight passes outside the lower edge: $\\tan\\theta \\gt \\frac{0.2}{0.6}$",
      "A1 $18.4°$",
      "A1 topples first"
     ],
     "steps": [
      {
       "say": "On the point of sliding, friction is limiting and tan theta equals mu.",
       "show": "$\\tan\\theta = 0.5 \\Rightarrow \\theta = 26.6°$"
      },
      {
       "say": "On the point of toppling, the weight acts through the lower edge. The centre of mass is 0.2 m across and 0.6 m up from that edge.",
       "show": "$\\tan\\theta = \\frac{0.2}{0.6} = \\frac13 \\Rightarrow\\theta = 18.4°$"
      },
      {
       "say": "The toppling angle is smaller, so the block topples first.",
       "show": "Topples first at $18.4°$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 5,
     "q": "The same block, of weight $50$ N, stands on rough horizontal ground with coefficient of friction $0.3$. A horizontal force $P$ N is applied at the top of the block, perpendicular to a vertical face of width $0.4$ m, and is gradually increased. Determine whether equilibrium is broken by sliding or toppling, and the value of $P$ at which this happens.",
     "answer": "Topples when $P = 8.33$ N (sliding needs $15$ N)",
     "ms": [
      "M1 slides when $P = 0.3\\times50$",
      "A1 $15$ N",
      "M1 moments about the far bottom edge: $1.2P = 50\\times0.2$",
      "A1 $8.33$ N",
      "A1 topples first"
     ],
     "steps": [
      {
       "say": "For sliding, P must overcome limiting friction.",
       "show": "$P = 0.3\\times50 = 15$ N"
      },
      {
       "say": "For toppling, take moments about the bottom edge furthest from where P pushes. P has arm 1.2 m and the weight has arm 0.2 m.",
       "show": "$1.2P = 50\\times0.2 \\Rightarrow P = 8.33$ N"
      },
      {
       "say": "The smaller force wins, so the block topples when P reaches about 8.33 newtons.",
       "show": "Topples at $Papprox8.33$ N"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 11,
   "points": [
    "f4_forces"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>Three forces act in the plane of the coordinate axes (units N and m): $\\mathbf F_1 = 3\\mathbf i + 4\\mathbf j$ at $(1,0)$, $\\mathbf F_2 = -\\mathbf i + 2\\mathbf j$ at $(0,2)$ and $\\mathbf F_3 = 2\\mathbf i - \\mathbf j$ at $(2,3)$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the magnitude of the resultant force and the angle it makes with $\\mathbf i$.",
     "answer": "$\\sqrt{41}\\approx6.40$ N at $51.3°$",
     "ms": [
      "M1 add the forces",
      "A1 $4\\mathbf i + 5\\mathbf j$",
      "A1 $6.40$ N at $51.3°$"
     ],
     "steps": [
      {
       "say": "Add the components.",
       "show": "$\\mathbf R = (3-1+2)\\mathbf i + (4+2-1)\\mathbf j = 4\\mathbf i + 5\\mathbf j$"
      },
      {
       "say": "Find the magnitude.",
       "show": "$|\\mathbf R| = \\sqrt{16+25} = \\sqrt{41}\\approx6.40$ N"
      },
      {
       "say": "Find the direction.",
       "show": "$\\tan^{-1}\\frac54\\approx51.3°$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the total moment of the forces about $O$, and the equation of the line of action of the resultant.",
     "answer": "$2$ N m clockwise; $5x - 4y + 2 = 0$",
     "ms": [
      "M1 moment $xF_y - yF_x$ for each force",
      "A1 $4 + 2 - 8 = -2$",
      "M1 resultant at $(x,y)$ has moment $5x - 4y$",
      "A1 $5x - 4y + 2 = 0$"
     ],
     "steps": [
      {
       "say": "Use moment equals x times F y minus y times F x, anticlockwise positive.",
       "show": "$\\mathbf F_1: 1(4) - 0 = 4;\\ \\mathbf F_2: 0 - 2(-1) = 2;\\ \\mathbf F_3: 2(-1) - 3(2) = -8$"
      },
      {
       "say": "Add: the total is minus 2, so 2 newton metres clockwise.",
       "show": "$M_O = -2$ N m"
      },
      {
       "say": "If the resultant acts through x, y, its moment about O is 5x minus 4y. This must equal minus 2.",
       "show": "$5x - 4y = -2$"
      },
      {
       "say": "So the line of action is 5x minus 4y plus 2 equals 0.",
       "show": "$5x - 4y + 2 = 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The system is to be replaced by a single force acting at $(2,0)$ together with a couple. Find the force and the couple.",
     "answer": "$4\\mathbf i + 5\\mathbf j$ at $(2,0)$ with a couple of $12$ N m clockwise",
     "ms": [
      "B1 force $4\\mathbf i + 5\\mathbf j$",
      "M1 $G = M_O - (2\\times5 - 0\\times4)$",
      "A1 $12$ N m clockwise"
     ],
     "steps": [
      {
       "say": "The force must equal the resultant.",
       "show": "$4\\mathbf i + 5\\mathbf j$ at $(2,0)$"
      },
      {
       "say": "Its moment about O is 2 times 5, which is 10. The couple must make up the difference to the original moment of minus 2.",
       "show": "$G = -2 - 10 = -12$"
      },
      {
       "say": "So the couple is 12 newton metres clockwise.",
       "show": "$12$ N m clockwise"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 12,
   "points": [
    "f4_rest"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>Two smooth spheres $A$ and $B$, of equal radius and masses $2$ kg and $3$ kg, move in the same direction along a straight line on a smooth horizontal surface with speeds $5$ m s$^{-1}$ and $1$ m s$^{-1}$ respectively. $A$ catches up and collides directly with $B$. The coefficient of restitution between the spheres is $0.5$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the velocities of $A$ and $B$ immediately after the collision.",
     "answer": "$A$: $1.4$ m s$^{-1}$, $B$: $3.4$ m s$^{-1}$, both in the original direction",
     "ms": [
      "M1 conservation of momentum",
      "A1 $2v_A + 3v_B = 13$",
      "M1 Newton's law of restitution",
      "A1 $v_B - v_A = 2$",
      "M1 solve simultaneously",
      "A1 $1.4$ and $3.4$"
     ],
     "steps": [
      {
       "say": "Momentum is conserved.",
       "show": "$2(5) + 3(1) = 2v_A + 3v_B \\Rightarrow 2v_A + 3v_B = 13$"
      },
      {
       "say": "Newton's law: the speed of separation is e times the speed of approach.",
       "show": "$v_B - v_A = 0.5(5-1) = 2$"
      },
      {
       "say": "Substitute v B equals v A plus 2.",
       "show": "$2v_A + 3v_A + 6 = 13 \\Rightarrow v_A = 1.4$"
      },
      {
       "say": "Then v B is 3.4.",
       "show": "$v_B = 3.4$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the loss of kinetic energy in the collision.",
     "answer": "$7.2$ J",
     "ms": [
      "M1 KE before and after",
      "A1 $26.5$ and $19.3$",
      "A1 $7.2$ J"
     ],
     "steps": [
      {
       "say": "Kinetic energy before: a half times 2 times 25, plus a half times 3 times 1.",
       "show": "$25 + 1.5 = 26.5$ J"
      },
      {
       "say": "After: a half times 2 times 1.96, plus a half times 3 times 11.56.",
       "show": "$1.96 + 17.34 = 19.3$ J"
      },
      {
       "say": "Subtract.",
       "show": "Loss $= 7.2$ J"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "$B$ then strikes a smooth vertical wall at right angles. The coefficient of restitution between $B$ and the wall is $0.5$. Find the speed of $B$ after it rebounds and show that $A$ and $B$ collide again.",
     "answer": "$1.7$ m s$^{-1}$; they now move towards each other",
     "ms": [
      "M1 rebound speed $e\\times3.4$",
      "A1 $1.7$ m s$^{-1}$ away from the wall",
      "A1 $B$ moves towards $A$, which is still moving towards the wall, so they collide"
     ],
     "steps": [
      {
       "say": "The rebound speed is e times the approach speed.",
       "show": "$0.5\\times3.4 = 1.7$ m s$^{-1}$"
      },
      {
       "say": "B now moves back towards A.",
       "show": "B: $1.7$ m s$^{-1}$ away from the wall"
      },
      {
       "say": "A is still moving towards the wall at 1.4, so the two spheres are approaching each other and must collide again.",
       "show": "Second collision occurs"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 13,
   "points": [
    "f4_lin",
    "f4_lnorm"
   ],
   "q": "<b>Section C · Statistics</b> (75 marks)<br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "$X$ and $Y$ are independent random variables with $E(X) = 10$, $\\text{Var}(X) = 4$, $E(Y) = 6$ and $\\text{Var}(Y) = 9$. Find $E(3X - 2Y)$ and $\\text{Var}(3X - 2Y)$.",
     "answer": "$18$; $72$",
     "ms": [
      "M1 $3E(X) - 2E(Y)$",
      "A1 $18$",
      "M1 $9\\text{Var}(X) + 4\\text{Var}(Y)$",
      "A1 $72$"
     ],
     "steps": [
      {
       "say": "Expectation is linear.",
       "show": "$E(3X-2Y) = 3(10) - 2(6) = 18$"
      },
      {
       "say": "For independent variables, variances add, with each coefficient squared. The minus sign becomes plus.",
       "show": "$\\text{Var}(3X-2Y) = 9(4) + 4(9)$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 72$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "The mass of a bag of flour is $X \\sim N(1010, 8^2)$ grams. Four bags are chosen at random. Find the probability that their total mass is less than $4000$ g.",
     "answer": "$0.00621$",
     "ms": [
      "M1 total mean $4040$",
      "M1 total variance $4\\times64 = 256$",
      "M1 standardise $\\frac{4000-4040}{16}$",
      "A1 $0.00621$"
     ],
     "steps": [
      {
       "say": "The total of four independent bags has mean 4 times 1010.",
       "show": "$E(T) = 4040$"
      },
      {
       "say": "The variance is 4 times 64, not 16 times 64, because the bags are independent.",
       "show": "$\\text{Var}(T) = 256,\\ \\sigma = 16$"
      },
      {
       "say": "Standardise.",
       "show": "$P(T\\lt4000) = P(Z \\lt -2.5)$"
      },
      {
       "say": "Read from tables.",
       "show": "$= 0.00621$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Explain why the distribution of $X_1 + X_2$ is different from that of $2X$, giving the variance of each.",
     "answer": "$\\text{Var}(X_1+X_2) = 128$; $\\text{Var}(2X) = 256$",
     "ms": [
      "B1 $X_1+X_2$: two independent bags, variance $128$",
      "B1 $2X$: one bag doubled, variance $256$",
      "B1 explanation: independent errors partly cancel in a sum"
     ],
     "steps": [
      {
       "say": "X 1 plus X 2 is the total of two different bags, so the variances add.",
       "show": "$\\text{Var}(X_1+X_2) = 64+64 = 128$"
      },
      {
       "say": "2X is one bag's mass doubled, so the variance is multiplied by 4.",
       "show": "$\\text{Var}(2X) = 4\\times64 = 256$"
      },
      {
       "say": "Both have mean 2020, but in the sum the two bags' deviations can partly cancel, so it is less spread out.",
       "show": "Same mean, different spread"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "Two bags $A$ and $B$ are chosen at random. Find the probability that $A$ is more than $10$ g heavier than $B$.",
     "answer": "$0.188$",
     "ms": [
      "M1 $D = A - B$, mean $0$",
      "M1 $\\text{Var}(D) = 128$",
      "M1 $P\\left(Z\\gt\\frac{10}{\\sqrt{128}}\\right)$",
      "A1 $0.188$"
     ],
     "steps": [
      {
       "say": "Let D be A minus B. Its mean is 0.",
       "show": "$E(D) = 0$"
      },
      {
       "say": "Its variance is 64 plus 64.",
       "show": "$\\text{Var}(D) = 128$"
      },
      {
       "say": "Standardise.",
       "show": "$P(D \\gt 10) = P\\left(Z \\gt \\frac{10}{\\sqrt{128}}\\right) = P(Z\\gt0.884)$"
      },
      {
       "say": "Read from tables.",
       "show": "$\\approx0.188$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f4_est",
    "f4_ci",
    "f4_clt"
   ],
   "q": "<b>Section C · Statistics</b><br>The times, $x$ minutes, taken by a random sample of $50$ customers to complete an online form are summarised by $\\sum x = 1240$ and $\\sum x^2 = 31460$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Calculate unbiased estimates of the population mean and variance.",
     "answer": "$\\bar x = 24.8$; $s^2 = 14.45$",
     "ms": [
      "B1 $\\bar x = 24.8$",
      "M1 $s^2 = \\frac{1}{n-1}\\left(\\sum x^2 - \\frac{(\\sum x)^2}{n}\\right)$",
      "A1 $\\frac{708}{49}$",
      "A1 $14.45$"
     ],
     "steps": [
      {
       "say": "The sample mean is the total divided by 50.",
       "show": "$\\bar x = \\frac{1240}{50} = 24.8$"
      },
      {
       "say": "The unbiased estimate of variance divides by n minus 1.",
       "show": "$s^2 = \\frac{1}{49}\\left(31460 - \\frac{1240^2}{50}\\right)$"
      },
      {
       "say": "Evaluate.",
       "show": "$= \\frac{708}{49}\\approx14.45$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Calculate a $95\\%$ confidence interval for the population mean time.",
     "answer": "$(23.75,\\ 25.85)$",
     "ms": [
      "M1 standard error $\\sqrt{\\frac{s^2}{50}}$",
      "A1 $0.5376$",
      "B1 $z = 1.96$",
      "M1 $\\bar x \\pm 1.96\\times\\text{SE}$",
      "A1 $(23.75, 25.85)$"
     ],
     "steps": [
      {
       "say": "The standard error of the mean is the root of s squared over n.",
       "show": "$\\text{SE} = \\sqrt{\\frac{14.45}{50}}\\approx0.5376$"
      },
      {
       "say": "For 95 percent, use z equals 1.96.",
       "show": "$1.96\\times0.5376\\approx1.054$"
      },
      {
       "say": "Add and subtract from the mean.",
       "show": "$24.8\\pm1.054 = (23.75,\\ 25.85)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Explain why it is not necessary to assume that the times are normally distributed.",
     "answer": "$n = 50$ is large, so by the CLT $\\bar X$ is approximately normal",
     "ms": [
      "B1 sample size large ($\\ge30$)",
      "B1 central limit theorem: $\\bar X$ approximately normal"
     ],
     "steps": [
      {
       "say": "The sample size is 50, which is large.",
       "show": "$n = 50 \\ge 30$"
      },
      {
       "say": "By the central limit theorem, the sample mean is approximately normally distributed whatever the shape of the population.",
       "show": "$\\bar X \\approx N\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$"
      },
      {
       "say": "So the interval is valid without assuming normal times.",
       "show": "No normality assumption needed"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "The website claims the mean time is $26$ minutes. Comment on this claim.",
     "answer": "$26$ lies above the interval, so the claim is not supported",
     "ms": [
      "B1 $26$ is outside the interval",
      "B1 evidence (at the 5% level) that the mean is not 26; it appears lower"
     ],
     "steps": [
      {
       "say": "Compare 26 with the interval from 23.75 to 25.85.",
       "show": "$26 \\gt 25.85$"
      },
      {
       "say": "26 is outside the interval.",
       "show": "Not in the interval"
      },
      {
       "say": "So the data suggest the true mean is less than 26 minutes and the claim is doubtful.",
       "show": "Claim not supported"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f4_t1"
   ],
   "q": "<b>Section C · Statistics</b><br>A machine fills bottles with a nominal $12.0$ ml of perfume. The volumes are normally distributed. A random sample of $8$ bottles gave these volumes in ml:<br>$12.1,\\ 11.8,\\ 12.6,\\ 12.4,\\ 11.5,\\ 12.0,\\ 12.9,\\ 12.3$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate the sample mean and an unbiased estimate of the population variance.",
     "answer": "$\\bar x = 12.2$, $s^2 = 0.2$",
     "ms": [
      "B1 $\\bar x = 12.2$",
      "M1 $s^2 = \\frac{\\sum x^2 - 8\\bar x^2}{7}$ with $\\sum x^2 = 1192.12$",
      "A1 $s^2 = 0.2$"
     ],
     "steps": [
      {
       "say": "Add the volumes: 97.6. Divide by 8.",
       "show": "$\\bar x = \\frac{97.6}{8} = 12.2$"
      },
      {
       "say": "The sum of squares is 1192.12.",
       "show": "$\\sum x^2 = 1192.12$"
      },
      {
       "say": "Use the n minus 1 formula.",
       "show": "$s^2 = \\frac{1192.12 - 8(12.2)^2}{7} = \\frac{1.4}{7} = 0.2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Test, at the $5\\%$ significance level, whether the mean volume is greater than $12.0$ ml.",
     "answer": "$t = 1.265 \\lt 1.895$: do not reject $H_0$",
     "ms": [
      "B1 $H_0: \\mu = 12$, $H_1: \\mu \\gt 12$",
      "B1 $t$-distribution with $7$ degrees of freedom",
      "M1 $t = \\frac{\\bar x - 12}{s/\\sqrt8}$",
      "A1 $t = 1.265$",
      "B1 critical value $1.895$",
      "M1 compare",
      "A1 conclusion in context: insufficient evidence that the mean exceeds $12.0$ ml"
     ],
     "steps": [
      {
       "say": "State the hypotheses.",
       "show": "$H_0: \\mu = 12.0,\\quad H_1: \\mu \\gt 12.0$"
      },
      {
       "say": "The population variance is unknown and the sample is small, so use a t-test with 7 degrees of freedom.",
       "show": "$\\nu = 7$"
      },
      {
       "say": "Calculate the test statistic.",
       "show": "$t = \\frac{12.2 - 12.0}{\\sqrt{0.2}/\\sqrt8} = \\frac{0.2}{0.1581}\\approx1.265$"
      },
      {
       "say": "The one-tailed 5 percent critical value for 7 degrees of freedom is 1.895.",
       "show": "$t_{7}(0.05) = 1.895$"
      },
      {
       "say": "1.265 is less than 1.895, so we do not reject H nought.",
       "show": "$1.265 \\lt 1.895$"
      },
      {
       "say": "There is not enough evidence that the mean volume is more than 12 ml.",
       "show": "Do not reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Explain why a $t$-test, rather than a $z$-test, is appropriate here.",
     "answer": "Small sample from a normal population with unknown variance",
     "ms": [
      "B1 population variance unknown, estimated by $s^2$",
      "B1 small sample ($n = 8$) from a normal population"
     ],
     "steps": [
      {
       "say": "The population variance is not known; we estimated it from the sample.",
       "show": "$\\sigma^2$ unknown"
      },
      {
       "say": "The sample is small, so the estimate is unreliable and the CLT cannot be used.",
       "show": "$n = 8$"
      },
      {
       "say": "Because the population is normal, the t-distribution applies exactly.",
       "show": "Use $t_{n-1}$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 16,
   "points": [
    "f4_t2"
   ],
   "q": "<b>Section C · Statistics</b><br>Six students took a reading test before and after a short course. Their scores were:<br><table class=\"data\"><tr><th>Student</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Before</td><td>54</td><td>61</td><td>48</td><td>70</td><td>65</td><td>58</td></tr><tr><td>After</td><td>58</td><td>63</td><td>50</td><td>71</td><td>70</td><td>60</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Explain why a paired $t$-test is appropriate.",
     "answer": "Two scores for each student; the samples are not independent",
     "ms": [
      "B1 each student gives a pair of results",
      "B1 test the mean of the differences"
     ],
     "steps": [
      {
       "say": "Each pair of scores comes from the same student.",
       "show": "Data are paired"
      },
      {
       "say": "The before and after samples are not independent.",
       "show": "Not two independent samples"
      },
      {
       "say": "So we analyse the differences, one per student.",
       "show": "$d = \\text{after} - \\text{before}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 8,
     "q": "Test, at the $5\\%$ level, whether the course increases the mean score. State any assumption you make.",
     "answer": "$t = 4.34 \\gt 2.015$: reject $H_0$; differences assumed normal",
     "ms": [
      "B1 differences $4, 2, 2, 1, 5, 2$",
      "B1 $H_0: \\mu_d = 0$, $H_1: \\mu_d\\gt0$",
      "B1 $\\bar d = 2.667$",
      "M1 $s_d = 1.506$",
      "M1 $t = \\frac{\\bar d}{s_d/\\sqrt6}$",
      "A1 $4.34$",
      "B1 critical value $2.015$ ($\\nu = 5$)",
      "B1 reject $H_0$: evidence that the course increases the mean score; differences assumed normally distributed"
     ],
     "steps": [
      {
       "say": "Find each difference, after minus before.",
       "show": "$d: 4,\\ 2,\\ 2,\\ 1,\\ 5,\\ 2$"
      },
      {
       "say": "State the hypotheses about the mean difference.",
       "show": "$H_0: \\mu_d = 0,\\quad H_1: \\mu_d \\gt 0$"
      },
      {
       "say": "The mean difference is 16 over 6. The sum of squares is 54.",
       "show": "$\\bar d = 2.667,\\quad s_d^2 = \\frac{54 - 6(2.667)^2}{5} = 2.267,\\ s_d = 1.506$"
      },
      {
       "say": "Calculate t.",
       "show": "$t = \\frac{2.667}{1.506/\\sqrt6}\\approx4.34$"
      },
      {
       "say": "The critical value with 5 degrees of freedom, one tail, 5 percent, is 2.015. Our t is larger.",
       "show": "$4.34 \\gt 2.015$"
      },
      {
       "say": "Reject H nought: there is evidence that the course increases the mean score. We assumed the differences are normally distributed.",
       "show": "Reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Without further calculation, explain whether the conclusion would change at the $1\\%$ level, given that the critical value is $3.365$.",
     "answer": "No: $4.34 \\gt 3.365$, still reject $H_0$",
     "ms": [
      "M1 compare $4.34$ with $3.365$",
      "A1 still significant"
     ],
     "steps": [
      {
       "say": "Compare the test statistic with the new critical value.",
       "show": "$4.34 \\gt 3.365$"
      },
      {
       "say": "It is still bigger.",
       "show": "Still in the critical region"
      },
      {
       "say": "So the conclusion does not change at 1 percent.",
       "show": "Reject $H_0$ at 1%"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 17,
   "points": [
    "f4_gof"
   ],
   "q": "<b>Section C · Statistics</b><br>A six-sided dice is rolled 120 times with these results:<br><table class=\"data\"><tr><th>Score</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Frequency</td><td>15</td><td>25</td><td>18</td><td>22</td><td>17</td><td>23</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "State suitable hypotheses for a test of whether the dice is fair, and find the expected frequencies.",
     "answer": "$H_0$: fair; all expected frequencies $20$",
     "ms": [
      "B1 $H_0$: dice fair (uniform distribution); $H_1$: not fair",
      "B1 each expected frequency $20$"
     ],
     "steps": [
      {
       "say": "The null hypothesis is that all scores are equally likely.",
       "show": "$H_0$: $P(\\text{each score}) = \\frac16$"
      },
      {
       "say": "The alternative is that the dice is biased.",
       "show": "$H_1$: not fair"
      },
      {
       "say": "Each expected frequency is 120 over 6.",
       "show": "$E = 20$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Calculate the value of the $\\chi^2$ test statistic.",
     "answer": "$3.8$",
     "ms": [
      "M1 $\\sum\\frac{(O-E)^2}{E}$",
      "A1 squared deviations $25, 25, 4, 4, 9, 9$",
      "M1 divide by $20$ and add",
      "A1 $\\frac{76}{20}$",
      "A1 $3.8$"
     ],
     "steps": [
      {
       "say": "Find O minus E for each score: minus 5, 5, minus 2, 2, minus 3, 3.",
       "show": "$O - E: -5,\\ 5,\\ -2,\\ 2,\\ -3,\\ 3$"
      },
      {
       "say": "Square them.",
       "show": "$25,\\ 25,\\ 4,\\ 4,\\ 9,\\ 9$"
      },
      {
       "say": "Divide each by 20 and add.",
       "show": "$\\chi^2 = \\frac{76}{20} = 3.8$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "State the number of degrees of freedom, explaining your answer, and complete the test at the $5\\%$ level.",
     "answer": "$\\nu = 5$; $3.8 \\lt 11.07$, do not reject $H_0$",
     "ms": [
      "B1 $\\nu = 6 - 1 = 5$ (one constraint: totals agree)",
      "B1 critical value $11.07$",
      "M1 compare",
      "A1 no evidence the dice is biased"
     ],
     "steps": [
      {
       "say": "There are 6 classes and one constraint, that the expected total equals 120. No parameters were estimated.",
       "show": "$\\nu = 6 - 1 = 5$"
      },
      {
       "say": "The 5 percent critical value for 5 degrees of freedom is 11.07.",
       "show": "$\\chi^2_5(0.05) = 11.07$"
      },
      {
       "say": "3.8 is less than 11.07, so do not reject H nought.",
       "show": "$3.8 \\lt 11.07$"
      },
      {
       "say": "There is no evidence that the dice is biased.",
       "show": "Do not reject $H_0$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 18,
   "points": [
    "f4_cont"
   ],
   "q": "<b>Section C · Statistics</b><br>A college compares two teaching methods. The results of a test for 100 students are:<br><table class=\"data\"><tr><th></th><th>Pass</th><th>Fail</th><th>Total</th></tr><tr><td>Method A</td><td>30</td><td>20</td><td>50</td></tr><tr><td>Method B</td><td>18</td><td>32</td><td>50</td></tr><tr><td>Total</td><td>48</td><td>52</td><td>100</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate the expected frequencies under the hypothesis that the result is independent of the method.",
     "answer": "$24, 26, 24, 26$",
     "ms": [
      "M1 $\\frac{\\text{row total}\\times\\text{column total}}{\\text{grand total}}$",
      "A1 $24$ for pass",
      "A1 $26$ for fail"
     ],
     "steps": [
      {
       "say": "Each expected frequency is row total times column total over the grand total.",
       "show": "$E = \\frac{50\\times48}{100}$"
      },
      {
       "say": "For pass in either method.",
       "show": "$E = 24$"
      },
      {
       "say": "For fail in either method.",
       "show": "$E = \\frac{50\\times52}{100} = 26$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Test, at the $5\\%$ level, whether the result is independent of the teaching method.",
     "answer": "$\\chi^2 = 4.85 \\gt 3.841$: reject $H_0$",
     "ms": [
      "B1 $H_0$: result independent of method",
      "B1 Yates' correction for a $2\\times2$ table",
      "M1 $\\sum\\frac{(|O-E| - 0.5)^2}{E}$",
      "A1 $5.5^2\\left(\\frac{2}{24}+\\frac{2}{26}\\right)$",
      "A1 $4.85$",
      "B1 $\\nu = 1$, critical value $3.841$",
      "B1 reject $H_0$: evidence of an association between method and result"
     ],
     "steps": [
      {
       "say": "State the hypotheses.",
       "show": "$H_0$: result and method independent; $H_1$: not independent"
      },
      {
       "say": "For a 2 by 2 table, use Yates' correction: subtract a half from each absolute difference.",
       "show": "$|O-E| = 6 \\Rightarrow (6-0.5)^2 = 30.25$"
      },
      {
       "say": "Divide by each expected frequency and add.",
       "show": "$\\chi^2 = 30.25\\left(\\frac{1}{24}+\\frac{1}{26}+\\frac{1}{24}+\\frac{1}{26}\\right)\\approx4.85$"
      },
      {
       "say": "Degrees of freedom: 2 minus 1 times 2 minus 1, which is 1. Critical value 3.841.",
       "show": "$\\nu = 1,\\ \\chi^2_1(0.05) = 3.841$"
      },
      {
       "say": "4.85 is greater than 3.841, so reject H nought.",
       "show": "$4.85 \\gt 3.841$"
      },
      {
       "say": "There is evidence that the pass rate depends on the method.",
       "show": "Reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Comment on the result of the test at the $1\\%$ level, where the critical value is $6.635$.",
     "answer": "Not significant at 1%",
     "ms": [
      "M1 compare with $6.635$",
      "A1 not significant at the 1% level, so the evidence is not strong"
     ],
     "steps": [
      {
       "say": "Compare 4.85 with 6.635.",
       "show": "$4.85 \\lt 6.635$"
      },
      {
       "say": "It is not in the 1 percent critical region.",
       "show": "Do not reject at 1%"
      },
      {
       "say": "So the evidence of an association is only moderate.",
       "show": "Significant at 5% only"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 19,
   "points": [
    "f4_pie",
    "f4_rook"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b> (75 marks)<br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Use the principle of inclusion and exclusion to find how many integers from $1$ to $300$ inclusive are divisible by at least one of $3$, $5$ and $7$.",
     "answer": "$162$",
     "ms": [
      "B1 single counts $100, 60, 42$",
      "B1 pairs $20, 14, 8$",
      "B1 triple $2$",
      "M1 inclusion–exclusion formula",
      "A1 $162$"
     ],
     "steps": [
      {
       "say": "Count multiples of each number.",
       "show": "$|A_3| = 100,\\ |A_5| = 60,\\ |A_7| = 42$"
      },
      {
       "say": "Count multiples of each pair: 15, 21 and 35.",
       "show": "$|A_3\\cap A_5| = 20,\\ |A_3\\cap A_7| = 14,\\ |A_5\\cap A_7| = 8$"
      },
      {
       "say": "Multiples of all three, that is of 105.",
       "show": "$|A_3\\cap A_5\\cap A_7| = 2$"
      },
      {
       "say": "Add the singles, subtract the pairs, add back the triple.",
       "show": "$202 - 42 + 2 = 162$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Five letters are placed at random in five addressed envelopes, one in each. Find the probability that no letter is in its correct envelope.",
     "answer": "$\\frac{44}{120} = \\frac{11}{30}$",
     "ms": [
      "M1 derangement formula $D_5 = 5!\\left(1 - \\frac1{1!}+\\frac1{2!}-\\frac1{3!}+\\frac1{4!}-\\frac1{5!}\\right)$",
      "A1 $D_5 = 44$",
      "M1 divide by $5!$",
      "A1 $\\frac{11}{30}$"
     ],
     "steps": [
      {
       "say": "We need the number of derangements of 5 objects.",
       "show": "$D_5 = 5!\\left(1 - 1 + \\frac12 - \\frac16 + \\frac1{24} - \\frac1{120}\\right)$"
      },
      {
       "say": "Evaluate.",
       "show": "$D_5 = 60 - 20 + 5 - 1 = 44$"
      },
      {
       "say": "Divide by the 120 possible arrangements.",
       "show": "$P = \\frac{44}{120} = \\frac{11}{30}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Three workers $W_1$, $W_2$, $W_3$ are to be given three different jobs $J_1$, $J_2$, $J_3$, one each. $W_1$ cannot do $J_1$ and $W_2$ cannot do $J_2$. Find the rook polynomial of the board of forbidden squares, and hence the number of possible allocations.",
     "answer": "$R(x) = 1 + 2x + x^2$; $3$ allocations",
     "ms": [
      "B1 forbidden squares in different rows and columns",
      "B1 $R(x) = 1 + 2x + x^2$",
      "M1 $3! - 2\\cdot2! + 1\\cdot1!$",
      "A1 $3$"
     ],
     "steps": [
      {
       "say": "The forbidden squares are W 1 J 1 and W 2 J 2. They are in different rows and columns, so rooks on them never attack each other.",
       "show": "$r_0 = 1,\\ r_1 = 2,\\ r_2 = 1$"
      },
      {
       "say": "So the rook polynomial is 1 plus 2x plus x squared.",
       "show": "$R(x) = 1 + 2x + x^2$"
      },
      {
       "say": "The number of allowed allocations is the sum of minus 1 to the k, r k, times 3 minus k factorial.",
       "show": "$3! - 2(2!) + 1(1!) = 6 - 4 + 1 = 3$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 20,
   "points": [
    "f4_col",
    "f4_match"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Six exams $A$–$F$ must be timetabled. Exams that share a candidate cannot be held in the same session. The pairs that clash are $AB$, $AC$, $BC$, $BD$, $CE$, $DE$, $DF$ and $EF$. By modelling this as a vertex colouring problem, find the least number of sessions needed and give a suitable timetable.",
     "answer": "$3$ sessions, e.g. $\\{A, D\\}$, $\\{B, E\\}$, $\\{C, F\\}$",
     "ms": [
      "B1 graph with vertices for exams and edges for clashes",
      "B1 triangle $ABC$ means at least $3$ colours",
      "M1 attempt at a colouring",
      "A1 valid 3-colouring",
      "A1 $3$ sessions"
     ],
     "steps": [
      {
       "say": "Draw a graph: one vertex per exam, and an edge for each clash. Sessions are colours.",
       "show": "Vertices $A$–$F$; edges as listed"
      },
      {
       "say": "A, B and C all clash with each other, forming a triangle, so we need at least 3 colours.",
       "show": "$\\chi(G)\\ge3$"
      },
      {
       "say": "Colour greedily: A 1, B 2, C 3. D clashes with B, so D can be 1. E clashes with C and D, so E is 2. F clashes with D and E, so F is 3.",
       "show": "$A,D \\to 1;\\ B,E\\to2;\\ C,F\\to3$"
      },
      {
       "say": "So 3 sessions are enough, and that is the minimum.",
       "show": "$\\chi(G) = 3$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Four volunteers $P, Q, R, S$ are to be matched to four tasks $1$–$4$. $P$ can do tasks $1$ or $2$; $Q$ can do task $1$ only; $R$ can do tasks $2$, $3$ or $4$; $S$ can do task $3$ only. An initial matching is $P$–$1$, $R$–$3$. Use alternating paths to obtain a complete matching.",
     "answer": "$P$–$2$, $Q$–$1$, $R$–$4$, $S$–$3$",
     "ms": [
      "M1 alternating path from an unmatched vertex",
      "A1 $Q$–$1$–$P$–$2$",
      "A1 new matching $P$–$2$, $Q$–$1$, $R$–$3$",
      "M1 second alternating path",
      "A1 $S$–$3$–$R$–$4$",
      "A1 complete matching"
     ],
     "steps": [
      {
       "say": "Q and S are unmatched. Start an alternating path at Q: Q to 1 is not in the matching, 1 to P is, P to 2 is not, and 2 is unmatched.",
       "show": "$Q - 1 = P - 2$"
      },
      {
       "say": "Switch the status of each edge on the path.",
       "show": "$Q$–$1$, $P$–$2$, $R$–$3$"
      },
      {
       "say": "Now start at S: S to 3, 3 to R in the matching, R to 4, which is unmatched.",
       "show": "$S - 3 = R - 4$"
      },
      {
       "say": "Switch again to get a complete matching.",
       "show": "$P$–$2,\\ Q$–$1,\\ R$–$4,\\ S$–$3$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "In a different problem, five people $A$–$E$ must be matched to five jobs. $A$, $B$ and $C$ can each do only jobs $1$ or $2$. Use Hall's marriage theorem to explain why no complete matching exists.",
     "answer": "$\\{A, B, C\\}$ has only $2$ neighbours",
     "ms": [
      "B1 Hall's condition: every set $X$ needs $|N(X)|\\ge|X|$",
      "M1 $X = \\{A,B,C\\}$",
      "A1 $|N(X)| = 2 \\lt 3$, so no complete matching"
     ],
     "steps": [
      {
       "say": "Hall's theorem says a complete matching exists only if every set of people can do at least as many jobs as there are people in the set.",
       "show": "$|N(X)|\\ge|X|$ for all $X$"
      },
      {
       "say": "Take the set A, B, C.",
       "show": "$N(\\{A,B,C\\}) = \\{1, 2\\}$"
      },
      {
       "say": "Three people but only two jobs, so the condition fails and no complete matching is possible.",
       "show": "$2 \\lt 3$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 21,
   "points": [
    "f4_flow",
    "f4_nn"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "A network has source $S$ and sink $T$, with arcs and capacities: $SA$ 9, $SB$ 5, $AC$ 4, $AT$ 3, $BC$ 2, $BT$ 4, $CT$ 6.<br>(i) Find the capacity of the cut that separates $\\{S, A\\}$ from $\\{B, C, T\\}$.<br>(ii) Find a flow of value $12$.<br>(iii) Explain why $12$ is the maximum flow.",
     "answer": "(i) $12$ (ii) e.g. $SA$ 7, $SB$ 5, $AC$ 4, $AT$ 3, $BC$ 1, $BT$ 4, $CT$ 5 (iii) max-flow min-cut",
     "ms": [
      "M1 add capacities of arcs from the $S$ side to the $T$ side",
      "A1 $5 + 4 + 3 = 12$",
      "M1 flow satisfying capacities and conservation",
      "A1 values correct",
      "A1 total $12$",
      "M1 flow value equals a cut capacity",
      "A1 by max-flow min-cut theorem the flow is maximal"
     ],
     "steps": [
      {
       "say": "The arcs crossing from S and A to the other side are S B, A C and A T.",
       "show": "$5 + 4 + 3 = 12$"
      },
      {
       "say": "Send 7 along S A, split as 4 to C and 3 to T. Send 5 along S B, split as 4 to T and 1 to C.",
       "show": "$SA = 7,\\ AC = 4,\\ AT = 3,\\ SB = 5,\\ BT = 4,\\ BC = 1$"
      },
      {
       "say": "C receives 5 and sends 5 to T, within its capacity of 6. The total reaching T is 3 plus 4 plus 5.",
       "show": "$CT = 5$; value $= 12$"
      },
      {
       "say": "A flow of 12 equals the capacity of a cut, so by the max-flow min-cut theorem no larger flow is possible.",
       "show": "Maximum flow $= 12$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "The table gives distances in km between five towns.<table class=\"data\"><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><td>A</td><td>–</td><td>7</td><td>4</td><td>9</td><td>6</td></tr><tr><td>B</td><td>7</td><td>–</td><td>5</td><td>8</td><td>3</td></tr><tr><td>C</td><td>4</td><td>5</td><td>–</td><td>6</td><td>10</td></tr><tr><td>D</td><td>9</td><td>8</td><td>6</td><td>–</td><td>7</td></tr><tr><td>E</td><td>6</td><td>3</td><td>10</td><td>7</td><td>–</td></tr></table>Use the nearest neighbour algorithm, starting at $A$, to find a Hamiltonian cycle, and state its length.",
     "answer": "$ACBEDA$, $28$ km",
     "ms": [
      "M1 nearest neighbour from $A$: $C$",
      "A1 $C\\to B$",
      "A1 $B\\to E\\to D$",
      "A1 return to $A$",
      "A1 $28$ km"
     ],
     "steps": [
      {
       "say": "From A the nearest town is C, at 4.",
       "show": "$A\\to C$ (4)"
      },
      {
       "say": "From C, the nearest unvisited town is B, at 5.",
       "show": "$C\\to B$ (5)"
      },
      {
       "say": "From B, the nearest unvisited is E, at 3. Then from E, only D remains, at 7.",
       "show": "$B\\to E$ (3), $E\\to D$ (7)"
      },
      {
       "say": "Return to A, at 9.",
       "show": "$D\\to A$ (9)"
      },
      {
       "say": "Add.",
       "show": "$4+5+3+7+9 = 28$ km"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 22,
   "points": [
    "f4_pert"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>A project has the following activities, with optimistic ($a$), most likely ($m$) and pessimistic ($b$) times in days.<br><table class=\"data\"><tr><th>Activity</th><th>Preceded by</th><th>a</th><th>m</th><th>b</th></tr><tr><td>A</td><td>–</td><td>2</td><td>4</td><td>6</td></tr><tr><td>B</td><td>–</td><td>3</td><td>5</td><td>13</td></tr><tr><td>C</td><td>A</td><td>1</td><td>3</td><td>5</td></tr><tr><td>D</td><td>A</td><td>4</td><td>5</td><td>6</td></tr><tr><td>E</td><td>B, C</td><td>2</td><td>3</td><td>4</td></tr><tr><td>F</td><td>D, E</td><td>1</td><td>2</td><td>9</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate the expected time for each activity.",
     "answer": "A 4, B 6, C 3, D 5, E 3, F 3",
     "ms": [
      "M1 $\\frac{a+4m+b}{6}$",
      "A1 at least four correct",
      "A1 all correct"
     ],
     "steps": [
      {
       "say": "In PERT the expected time is a plus 4m plus b, all over 6.",
       "show": "$t_e = \\frac{a+4m+b}{6}$"
      },
      {
       "say": "For B this is 3 plus 20 plus 13, over 6, which is 6. For F it is 1 plus 8 plus 9 over 6, which is 3.",
       "show": "$t_B = 6,\\ t_F = 3$"
      },
      {
       "say": "The rest give 4, 3, 5 and 3.",
       "show": "A 4, B 6, C 3, D 5, E 3, F 3"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the critical path and the expected project duration.",
     "answer": "$A$–$C$–$E$–$F$, $13$ days",
     "ms": [
      "M1 forward pass for earliest times",
      "A1 project time $13$",
      "A1 critical path $ACEF$"
     ],
     "steps": [
      {
       "say": "Forward pass: A ends at 4, B at 6. C ends at 7, D at 9. E starts at the later of 6 and 7, so ends at 10.",
       "show": "$E$: start $7$, end $10$"
      },
      {
       "say": "F starts at the later of D, 9, and E, 10, so ends at 13.",
       "show": "Project time $= 13$ days"
      },
      {
       "say": "The chain with no slack is A, C, E, F.",
       "show": "Critical path $A$–$C$–$E$–$F$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the variance of the project duration, and estimate the probability that the project is completed within $15$ days.",
     "answer": "Variance $2.78$; probability $0.885$",
     "ms": [
      "M1 $\\left(\\frac{b-a}{6}\\right)^2$ for critical activities",
      "A1 $\\frac{4}{9}+\\frac49+\\frac19+\\frac{16}{9} = \\frac{25}{9}$",
      "M1 $P\\left(Z\\lt\\frac{15-13}{5/3}\\right)$",
      "A1 $0.885$"
     ],
     "steps": [
      {
       "say": "The variance of each activity is b minus a over 6, squared. Add the variances along the critical path.",
       "show": "$\\frac{16}{36}+\\frac{16}{36}+\\frac{4}{36}+\\frac{64}{36} = \\frac{25}{9}\\approx2.78$"
      },
      {
       "say": "So the standard deviation is five thirds.",
       "show": "$\\sigma = \\frac53$"
      },
      {
       "say": "Assume the duration is approximately normal.",
       "show": "$P(T \\lt 15) = P\\left(Z\\lt\\frac{2}{5/3}\\right) = P(Z\\lt1.2)$"
      },
      {
       "say": "From tables.",
       "show": "$\\approx0.885$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 23,
   "points": [
    "f4_simplex"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Maximise $P = 3x + 4y$ subject to $x + y \\le 4$, $x + 3y\\le 6$, $x\\ge0$, $y\\ge0$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Introduce slack variables and write down the initial simplex tableau.",
     "answer": "Rows: $s_1$: $1, 1, 1, 0 \\mid 4$; $s_2$: $1, 3, 0, 1\\mid 6$; $P$: $-3, -4, 0, 0\\mid 0$",
     "ms": [
      "B1 constraints with slack variables",
      "B1 objective row $P - 3x - 4y = 0$"
     ],
     "steps": [
      {
       "say": "Add slack variables to turn each inequality into an equation.",
       "show": "$x + y + s_1 = 4,\\quad x + 3y + s_2 = 6$"
      },
      {
       "say": "Write the objective as P minus 3x minus 4y equals 0.",
       "show": "$P - 3x - 4y = 0$"
      },
      {
       "say": "Set out the tableau with columns x, y, s 1, s 2 and value.",
       "show": "$\\begin{array}{c|cccc|c} & x & y & s_1 & s_2 & \\\\ \\hline s_1 & 1 & 1 & 1 & 0 & 4\\\\ s_2 & 1 & 3 & 0 & 1 & 6 \\\\ P & -3 & -4 & 0 & 0 & 0\\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Perform iterations of the simplex algorithm until the optimal tableau is reached.",
     "answer": "Pivot on $y$ (row 2), then on $x$ (row 1); final $P$ row $0, 0, \\frac52, \\frac12 \\mid 13$",
     "ms": [
      "M1 choose $y$ column (most negative) and ratio test",
      "A1 pivot in $s_2$ row ($6/3 = 2 \\lt 4$)",
      "A1 first tableau: $P$ row $-\\frac53, 0, 0, \\frac43\\mid8$",
      "M1 second pivot on $x$ column, row 1 (ratio $3 \\lt 6$)",
      "A1 rows $x$: $1, 0, \\frac32, -\\frac12 \\mid 3$; $y$: $0, 1, -\\frac12, \\frac12\\mid1$",
      "A1 $P$ row $0, 0, \\frac52, \\frac12\\mid13$"
     ],
     "steps": [
      {
       "say": "The most negative entry in the P row is minus 4, in the y column. Ratios: 4 over 1 is 4, and 6 over 3 is 2. The smaller is 2, so pivot on the 3.",
       "show": "Pivot: row $s_2$, column $y$"
      },
      {
       "say": "Divide the pivot row by 3, then clear the y column.",
       "show": "$\\begin{array}{c|cccc|c} s_1 & \\frac23 & 0 & 1 & -\\frac13 & 2\\\\ y & \\frac13 & 1 & 0 & \\frac13 & 2\\\\ P & -\\frac53 & 0 & 0 & \\frac43 & 8\\end{array}$"
      },
      {
       "say": "There is still a negative in the x column. Ratios: 2 over two thirds is 3, and 2 over a third is 6. Pivot on two thirds.",
       "show": "Pivot: row $s_1$, column $x$"
      },
      {
       "say": "Divide that row by two thirds, then clear the x column.",
       "show": "$\\begin{array}{c|cccc|c} x & 1 & 0 & \\frac32 & -\\frac12 & 3\\\\ y & 0 & 1 & -\\frac12 & \\frac12 & 1\\\\ P & 0 & 0 & \\frac52 & \\frac12 & 13\\end{array}$"
      },
      {
       "say": "No negatives remain in the P row, so this is optimal.",
       "show": "Optimal"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State the optimal values of $x$, $y$ and $P$.",
     "answer": "$x = 3,\\ y = 1,\\ P = 13$",
     "ms": [
      "B1 $x=3$, $y=1$",
      "B1 $P = 13$"
     ],
     "steps": [
      {
       "say": "Read the basic variables from the final tableau.",
       "show": "$x = 3,\\ y = 1$"
      },
      {
       "say": "The slack variables are zero, so both constraints are tight.",
       "show": "$s_1 = s_2 = 0$"
      },
      {
       "say": "The maximum value of P is 13.",
       "show": "$P_{\\max} = 13$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 24,
   "points": [
    "f4_gf",
    "f4_sym",
    "f4_polya"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "A child chooses $6$ sweets from three flavours, with at most $3$ of each flavour. Write down a generating function for the number of choices, and find the number of possible choices.",
     "answer": "$(1+x+x^2+x^3)^3$; $10$",
     "ms": [
      "B1 $(1+x+x^2+x^3)^3$",
      "M1 find coefficient of $x^6$",
      "A1 $10$"
     ],
     "steps": [
      {
       "say": "Each flavour can contribute 0, 1, 2 or 3 sweets, giving a factor 1 plus x plus x squared plus x cubed.",
       "show": "$G(x) = (1+x+x^2+x^3)^3$"
      },
      {
       "say": "We want the coefficient of x to the 6. Count solutions of a plus b plus c equals 6 with each at most 3.",
       "show": "$(3,3,0)\\times3,\\ (3,2,1)\\times6,\\ (2,2,2)\\times1$"
      },
      {
       "say": "That gives 3 plus 6 plus 1.",
       "show": "$10$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "By considering $(1+x)^n$, show that $\\displaystyle\\sum_{r=0}^{n}\\binom nr = 2^n$ and $\\displaystyle\\sum_{r=0}^{n}r\\binom nr = n2^{n-1}$.",
     "answer": "Shown.",
     "ms": [
      "B1 $(1+x)^n = \\sum\\binom nr x^r$",
      "B1 $x = 1$ gives $2^n$",
      "B1 differentiate then $x=1$ gives $n2^{n-1}$"
     ],
     "steps": [
      {
       "say": "The binomial theorem gives the generating function.",
       "show": "$(1+x)^n = \\sum_{r=0}^n\\binom nr x^r$"
      },
      {
       "say": "Put x equals 1.",
       "show": "$2^n = \\sum\\binom nr$"
      },
      {
       "say": "Differentiate both sides, then put x equals 1.",
       "show": "$n(1+x)^{n-1} = \\sum r\\binom nr x^{r-1} \\Rightarrow n2^{n-1} = \\sum r\\binom nr$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "The four vertices of a square are to be coloured, each either black or white. Colourings are regarded as the same if one can be rotated onto the other. List the elements of the rotation group $C_4$ and show that its cycle index is $\\frac14\\left(x_1^4 + x_2^2 + 2x_4\\right)$.",
     "answer": "Shown.",
     "ms": [
      "B1 four rotations $0°, 90°, 180°, 270°$",
      "B1 identity gives $x_1^4$",
      "B1 $180°$ gives $x_2^2$",
      "B1 $90°$ and $270°$ each give $x_4$"
     ],
     "steps": [
      {
       "say": "The rotation group has four elements: rotations by 0, 90, 180 and 270 degrees.",
       "show": "$C_4 = \\{e, r, r^2, r^3\\}$"
      },
      {
       "say": "The identity fixes each vertex: four 1-cycles. A half turn swaps opposite vertices: two 2-cycles.",
       "show": "$e: x_1^4,\\quad r^2: x_2^2$"
      },
      {
       "say": "A quarter turn in either direction moves all four vertices in one 4-cycle.",
       "show": "$r, r^3: x_4$"
      },
      {
       "say": "Average over the four elements.",
       "show": "$P_G = \\frac14(x_1^4 + x_2^2 + 2x_4)$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 6,
     "q": "Use Pólya's enumeration theorem to find (i) the number of distinct colourings with black and white, (ii) the number with exactly two black vertices, and (iii) the number of distinct colourings if three colours are available.",
     "answer": "(i) $6$ (ii) $2$ (iii) $24$",
     "ms": [
      "M1 substitute $x_i = 2$",
      "A1 $6$",
      "M1 pattern inventory $P_G(b+w, b^2+w^2, b^4+w^4)$ and coefficient of $b^2w^2$",
      "A1 $2$",
      "M1 substitute $x_i = 3$",
      "A1 $24$"
     ],
     "steps": [
      {
       "say": "With two colours, put every x i equal to 2.",
       "show": "$\\frac14(16 + 4 + 2\\cdot2) = 6$"
      },
      {
       "say": "For exactly two black, use the pattern inventory and find the coefficient of b squared w squared. The first term gives 6, the second gives 2, and the third gives none.",
       "show": "$\\frac14\\big(\\binom42 + 2 + 0\\big) = \\frac{8}{4} = 2$"
      },
      {
       "say": "These are two adjacent blacks, or two opposite blacks.",
       "show": "2 colourings"
      },
      {
       "say": "With three colours, put every x i equal to 3.",
       "show": "$\\frac14(81 + 9 + 2\\cdot3) = \\frac{96}{4} = 24$"
      }
     ]
    }
   ],
   "section": "D"
  }
 ],
 "sections": [
  {
   "id": "A",
   "title": "Section A: Mechanics 1",
   "marks": 75
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 75
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 75
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 75
  }
 ],
 "choose": {
  "count": 2,
  "routes": [
   [
    "A",
    "B"
   ],
   [
    "A",
    "C"
   ],
   [
    "A",
    "D"
   ],
   [
    "C",
    "D"
   ]
  ],
  "note": "Answer two sections: A and B, A and C, A and D, or C and D."
 }
});
BCSP.add({
 "id": "f4-medium",
 "unit": "f4",
 "level": "medium",
 "title": "Further Maths A2 2 · Paper B (Medium)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f4_shm"
   ],
   "q": "Answer the questions in <b>two</b> sections only: A and B, A and C, A and D, or C and D. Each section carries 75 marks, so your paper is out of 150. Take $g = 9.8$ m s$^{-2}$.<br><b>Section A · Mechanics 1</b> (75 marks)<br>A particle $P$ moves with simple harmonic motion between two points $A$ and $B$, which are $0.8$ m apart. The centre of the motion is $O$. The maximum speed of $P$ is $1.2$ m s$^{-1}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the period of the motion.",
     "answer": "$\\frac{2\\pi}{3}\\approx2.09$ s",
     "ms": [
      "B1 $a = 0.4$",
      "M1 $1.2 = 0.4\\omega$",
      "A1 $T = \\frac{2\\pi}{3}$"
     ],
     "steps": [
      {
       "say": "The amplitude is half of AB, which is 0.4 metres.",
       "show": "$a = 0.4$"
      },
      {
       "say": "Maximum speed equals a omega.",
       "show": "$1.2 = 0.4\\omega \\Rightarrow \\omega = 3$"
      },
      {
       "say": "The period is 2 pi over omega.",
       "show": "$T = \\frac{2\\pi}{3}\\approx2.09$ s"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "The point $C$ lies between $A$ and $B$ with $AC = 0.1$ m. Find the time taken for $P$ to move directly from $A$ to $C$.",
     "answer": "$0.241$ s",
     "ms": [
      "M1 $x = 0.4\\cos3t$ (starting at $A$)",
      "B1 $C$ is at $x = 0.3$",
      "M1 $\\cos3t = 0.75$",
      "A1 $0.241$ s"
     ],
     "steps": [
      {
       "say": "Measure x from O, with P starting at A where x is 0.4, at rest. Then x is a cos omega t.",
       "show": "$x = 0.4\\cos3t$"
      },
      {
       "say": "C is 0.1 from A, so it is 0.3 from O.",
       "show": "$x_C = 0.3$"
      },
      {
       "say": "Solve.",
       "show": "$\\cos3t = 0.75 \\Rightarrow 3t = 0.7227$"
      },
      {
       "say": "So t is about 0.241 seconds.",
       "show": "$t\\approx0.241$ s"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the speed of $P$ as it passes $C$.",
     "answer": "$0.794$ m s$^{-1}$",
     "ms": [
      "M1 $v^2 = \\omega^2(a^2-x^2)$",
      "A1 $9(0.16 - 0.09)$",
      "A1 $0.794$"
     ],
     "steps": [
      {
       "say": "Use the speed–displacement formula.",
       "show": "$v^2 = 9(0.4^2 - 0.3^2) = 0.63$"
      },
      {
       "say": "Take the root.",
       "show": "$v = \\sqrt{0.63}$"
      },
      {
       "say": "So the speed is about 0.794 metres per second.",
       "show": "$v\\approx0.794$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the total time in each complete oscillation for which the speed of $P$ exceeds $0.6$ m s$^{-1}$.",
     "answer": "$\\frac{4\\pi}{9}\\approx1.40$ s",
     "ms": [
      "M1 $v \\gt 0.6 \\iff |x| \\lt \\sqrt{0.12}$",
      "M1 time from $O$ to $x = \\sqrt{0.12}$: $\\sin3t = \\frac{\\sqrt{0.12}}{0.4}$, $t = \\frac{\\pi}{9}$",
      "A1 $4\\times\\frac{\\pi}{9} = 1.40$ s"
     ],
     "steps": [
      {
       "say": "The speed exceeds 0.6 when x is close enough to O.",
       "show": "$9(0.16 - x^2) \\gt 0.36 \\Rightarrow |x| \\lt \\sqrt{0.12}\\approx0.346$"
      },
      {
       "say": "Starting from O, x is 0.4 sin 3t. Find when x reaches root 0.12.",
       "show": "$\\sin3t = \\frac{\\sqrt{0.12}}{0.4} = \\frac{\\sqrt3}{2} \\Rightarrow t = \\frac{\\pi}{9}$"
      },
      {
       "say": "By symmetry, this happens four times per oscillation: either side of O, going each way.",
       "show": "$4\\times\\frac{\\pi}{9} = \\frac{4\\pi}{9}\\approx1.40$ s"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f4_elosc",
    "f4_pend"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A particle of mass $0.2$ kg is attached to one end of a light elastic string of natural length $0.5$ m and modulus of elasticity $4.9$ N. The other end of the string is attached to a fixed point $O$ and the particle hangs in equilibrium.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the extension of the string in equilibrium.",
     "answer": "$0.2$ m",
     "ms": [
      "M1 $0.2g = \\frac{4.9e}{0.5}$",
      "A1 $0.2$ m"
     ],
     "steps": [
      {
       "say": "The tension equals the weight.",
       "show": "$\\frac{4.9e}{0.5} = 0.2\\times9.8 = 1.96$"
      },
      {
       "say": "Solve for e.",
       "show": "$e = \\frac{1.96\\times0.5}{4.9}$"
      },
      {
       "say": "So e is 0.2 metres.",
       "show": "$e = 0.2$ m"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "The particle is pulled down a further $0.3$ m and released from rest. Show that, while the string is taut, the particle moves with SHM, and state the value of $\\omega$.",
     "answer": "$\\ddot x = -49x$, $\\omega = 7$",
     "ms": [
      "M1 equation of motion at displacement $x$ below equilibrium",
      "A1 $0.2\\ddot x = 1.96 - 9.8(0.2+x)$",
      "A1 $\\ddot x = -49x$",
      "A1 $\\omega = 7$"
     ],
     "steps": [
      {
       "say": "At displacement x below equilibrium, the extension is 0.2 plus x, so the tension is 9.8 times 0.2 plus x.",
       "show": "$T = \\frac{4.9(0.2+x)}{0.5} = 9.8(0.2+x)$"
      },
      {
       "say": "Newton's second law, downwards positive.",
       "show": "$0.2\\ddot x = 1.96 - 9.8(0.2 + x) = -9.8x$"
      },
      {
       "say": "Divide by 0.2.",
       "show": "$\\ddot x = -49x$, so SHM with $\\omega = 7$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the speed of the particle at the instant the string becomes slack.",
     "answer": "$1.57$ m s$^{-1}$",
     "ms": [
      "B1 string slack at $x = -0.2$",
      "M1 $v^2 = 49(0.3^2 - 0.2^2)$",
      "A1 $1.57$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The amplitude is 0.3, but the string goes slack when the particle is 0.2 above equilibrium, at the natural length.",
       "show": "$x = -0.2$"
      },
      {
       "say": "Use the SHM speed formula up to that point.",
       "show": "$v^2 = 49(0.09 - 0.04) = 2.45$"
      },
      {
       "say": "Take the root.",
       "show": "$v\\approx1.57$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "A pendulum clock keeps correct time with a seconds pendulum where $g = 9.8$ m s$^{-2}$. It is moved to a place where $g = 9.75$ m s$^{-2}$. Find how many seconds the clock loses in one day.",
     "answer": "About $221$ s",
     "ms": [
      "M1 $T' = 2\\sqrt{\\frac{9.8}{9.75}}$",
      "A1 $T' = 2.00512$ s",
      "M1 clock reading $= 86400\\times\\frac{2}{T'}$",
      "A1 loses $221$ s"
     ],
     "steps": [
      {
       "say": "The length is unchanged, so the period scales with one over root g.",
       "show": "$T' = 2\\sqrt{\\frac{9.8}{9.75}}\\approx2.00512$ s"
      },
      {
       "say": "The clock counts oscillations and records 2 seconds for each one.",
       "show": "$\\text{reading} = 2\\times\\frac{86400}{T'} = 86400\\sqrt{\\frac{9.75}{9.8}}$"
      },
      {
       "say": "That is about 86179 seconds.",
       "show": "$\\approx86179.3$ s"
      },
      {
       "say": "So the clock loses about 221 seconds, nearly 4 minutes, per day.",
       "show": "$86400 - 86179.3\\approx221$ s"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f4_damp"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A particle of mass $2$ kg is attached to a spring. It moves along a horizontal line through a medium which exerts a resistance of $c\\,v$ N when its speed is $v$ m s$^{-1}$. The equation of motion is $2\\ddot x + c\\dot x + 18x = 0$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the value of $c$ for which the motion is critically damped, and describe the motion in this case.",
     "answer": "$c = 12$; returns to equilibrium without oscillating",
     "ms": [
      "M1 $c^2 = 4\\times2\\times18$",
      "A1 $c = 12$",
      "B1 no oscillation: returns towards equilibrium as quickly as possible without overshooting"
     ],
     "steps": [
      {
       "say": "Critical damping means the auxiliary equation has equal roots.",
       "show": "$2m^2 + cm + 18 = 0$, discriminant $c^2 - 144 = 0$"
      },
      {
       "say": "So c squared is 144.",
       "show": "$c^2 = 144$"
      },
      {
       "say": "Take c equals 12. With critical damping the particle does not oscillate; it returns to equilibrium without overshooting.",
       "show": "$c = 12$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Take $c = 12$. The particle is released from rest with $x = 0.5$. Find $x$ in terms of $t$.",
     "answer": "$x = (0.5 + 1.5t)e^{-3t}$",
     "ms": [
      "M1 $m^2 + 6m + 9 = 0$",
      "A1 $m = -3$ repeated",
      "A1 $x = (A + Bt)e^{-3t}$",
      "M1 use initial conditions",
      "A1 $A = 0.5$, $B = 1.5$"
     ],
     "steps": [
      {
       "say": "Divide by 2. The auxiliary equation is m squared plus 6m plus 9.",
       "show": "$(m+3)^2 = 0 \\Rightarrow m = -3$ (repeated)"
      },
      {
       "say": "A repeated root gives this form.",
       "show": "$x = (A+Bt)e^{-3t}$"
      },
      {
       "say": "At t equals 0, x is 0.5, so A is 0.5.",
       "show": "$A = 0.5$"
      },
      {
       "say": "Differentiate: at t equals 0, the velocity is B minus 3A, which is zero.",
       "show": "$B = 3A = 1.5$"
      },
      {
       "say": "Write the solution.",
       "show": "$x = (0.5+1.5t)e^{-3t}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Show that the particle never passes through the equilibrium position, and find the greatest speed of the particle.",
     "answer": "$x \\gt 0$ for all $t$; max speed $\\frac{1.5}{e}\\approx0.552$ m s$^{-1}$",
     "ms": [
      "B1 $0.5 + 1.5t \\gt 0$ and $e^{-3t}\\gt0$, so $x\\gt0$",
      "M1 $\\dot x = -4.5te^{-3t}$",
      "M1 $\\frac{d}{dt}(te^{-3t}) = 0$",
      "A1 $t = \\frac13$",
      "A1 $\\frac{1.5}{e}\\approx0.552$"
     ],
     "steps": [
      {
       "say": "For t at least 0, both factors are positive, so x never reaches zero.",
       "show": "$x = (0.5+1.5t)e^{-3t} \\gt 0$"
      },
      {
       "say": "Differentiate and simplify.",
       "show": "$\\dot x = 1.5e^{-3t} - 3(0.5+1.5t)e^{-3t} = -4.5te^{-3t}$"
      },
      {
       "say": "The speed is 4.5 t e to the minus 3t. Differentiate this and set to zero.",
       "show": "$4.5e^{-3t}(1 - 3t) = 0 \\Rightarrow t = \\frac13$"
      },
      {
       "say": "Substitute.",
       "show": "$v_{\\max} = 4.5\\cdot\\frac13e^{-1} = \\frac{1.5}{e}\\approx0.552$ m s$^{-1}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f4_lam",
    "f4_com1",
    "f4_susp"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A uniform lamina consists of a rectangle with vertices $(0,0)$, $(6,0)$, $(6,4)$, $(0,4)$ joined along its top edge to a triangle with vertices $(0,4)$, $(6,4)$, $(3,7)$. Lengths are in cm. The lamina has mass $3.3$ kg.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the coordinates of the centre of mass of the lamina.",
     "answer": "$(3,\\ 2.82)$",
     "ms": [
      "B1 $\\bar x = 3$ by symmetry",
      "B1 areas $24$ and $9$",
      "B1 centroid of triangle at $(3, 5)$",
      "M1 moments about the $x$-axis",
      "A1 $33\\bar y = 24(2) + 9(5)$",
      "A1 $\\bar y = \\frac{31}{11}\\approx2.82$"
     ],
     "steps": [
      {
       "say": "The lamina is symmetric about x equals 3.",
       "show": "$\\bar x = 3$"
      },
      {
       "say": "The rectangle has area 24 with centre at height 2. The triangle has area a half times 6 times 3, which is 9.",
       "show": "Rectangle $24$; triangle $9$"
      },
      {
       "say": "The centroid of a triangle is a third of the way up from its base, so at height 4 plus 1.",
       "show": "Triangle centre $(3, 5)$"
      },
      {
       "say": "Take moments.",
       "show": "$33\\bar y = 48 + 45 = 93 \\Rightarrow \\bar y = \\frac{31}{11}\\approx2.82$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "A particle of mass $1.1$ kg is attached at $(6,0)$. Find the centre of mass of the combined body.",
     "answer": "$(3.75,\\ 2.11)$",
     "ms": [
      "M1 combine with total mass $4.4$",
      "A1 $\\bar x = 3.75$",
      "A1 $\\bar y = 2.11$"
     ],
     "steps": [
      {
       "say": "Total mass is 4.4 kilograms.",
       "show": "$M = 4.4$"
      },
      {
       "say": "Take moments in x.",
       "show": "$4.4\\bar x = 3.3(3) + 1.1(6) = 16.5 \\Rightarrow \\bar x = 3.75$"
      },
      {
       "say": "Take moments in y.",
       "show": "$4.4\\bar y = 3.3\\left(\\frac{31}{11}\\right) + 0 = 9.3 \\Rightarrow \\bar y\\approx2.11$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The combined body is freely suspended from the vertex $(3,7)$. Find the angle between the line $x = 3$ and the vertical.",
     "answer": "$8.73°$",
     "ms": [
      "M1 $G$ directly below $(3,7)$",
      "M1 $\\tan\\alpha = \\frac{0.75}{7 - 2.114}$",
      "A1 $8.73°$"
     ],
     "steps": [
      {
       "say": "G hangs vertically below the point of suspension.",
       "show": "Line from $(3,7)$ to $G$ is vertical"
      },
      {
       "say": "G is 0.75 across from the line x equals 3, and 7 minus 2.114 below the vertex.",
       "show": "$\\tan\\alpha = \\frac{0.75}{4.886}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\alpha\\approx8.73°$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f4_frame"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A light framework consists of rods $AB$, $BC$ and $CA$, smoothly jointed at $A(0,0)$, $B(4,0)$ and $C(4,3)$, in metres, in a vertical plane with $AB$ horizontal. It is smoothly pinned to a fixed point at $A$ and rests on a smooth roller at $B$, which exerts a vertical force. At $C$ a vertical load of $60$ N and a horizontal force of $30$ N in the direction $\\overrightarrow{AB}$ are applied.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the reaction at $B$ and the horizontal and vertical components of the force on the framework at $A$.",
     "answer": "$R_B = 82.5$ N up; at $A$: $30$ N horizontally (towards $-x$), $22.5$ N vertically downwards",
     "ms": [
      "M1 moments about $A$",
      "A1 $4R_B = 60(4) + 30(3)$, $R_B = 82.5$",
      "A1 horizontal at $A$: $30$ N opposite to the applied force",
      "A1 vertical at $A$: $22.5$ N downwards"
     ],
     "steps": [
      {
       "say": "Take moments about A for the whole framework. The 60 newton load has arm 4 and the 30 newton force has arm 3.",
       "show": "$4R_B = 240 + 90 \\Rightarrow R_B = 82.5$ N"
      },
      {
       "say": "Resolve horizontally: A must supply 30 newtons in the negative x direction.",
       "show": "$H_A = -30$ N"
      },
      {
       "say": "Resolve vertically: 82.5 is more than 60, so A pulls down with 22.5 newtons.",
       "show": "$V_A = 60 - 82.5 = -22.5$ N"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the force in rod $AC$, stating whether it is a tension or a thrust.",
     "answer": "Tension $37.5$ N",
     "ms": [
      "M1 resolve horizontally at $C$",
      "A1 $30 - 0.8T_{AC} = 0$",
      "A1 tension $37.5$ N"
     ],
     "steps": [
      {
       "say": "At C, rod AC pulls towards A, in the direction minus 0.8, minus 0.6. Rod BC is vertical so has no horizontal component.",
       "show": "$\\cos\\angle = \\frac45$"
      },
      {
       "say": "Resolve horizontally at C.",
       "show": "$30 - 0.8T_{AC} = 0$"
      },
      {
       "say": "So T AC is 37.5, positive, meaning tension.",
       "show": "$T_{AC} = 37.5$ N (tension)"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the force in rod $BC$, stating whether it is a tension or a thrust.",
     "answer": "Thrust $82.5$ N",
     "ms": [
      "M1 resolve vertically at $C$",
      "A1 thrust $82.5$ N"
     ],
     "steps": [
      {
       "say": "Resolve vertically at C, with tensions pulling away from C.",
       "show": "$-0.6(37.5) - T_{BC} - 60 = 0$"
      },
      {
       "say": "Solve.",
       "show": "$T_{BC} = -82.5$"
      },
      {
       "say": "Negative, so BC is in compression: a thrust of 82.5 newtons.",
       "show": "Thrust $82.5$ N"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Show that the force in $AB$ is zero.",
     "answer": "Shown.",
     "ms": [
      "M1 resolve horizontally at $B$",
      "A1 only $AB$ has a horizontal component, so $T_{AB} = 0$"
     ],
     "steps": [
      {
       "say": "At B the forces are the roller reaction, which is vertical, rod BC, which is vertical, and rod AB, which is horizontal.",
       "show": "Forces at $B$"
      },
      {
       "say": "Resolving horizontally, only AB contributes.",
       "show": "$T_{AB} = 0$"
      },
      {
       "say": "As a check, vertically at B: 82.5 up from the roller balances the 82.5 thrust in BC.",
       "show": "$82.5 - 82.5 = 0$ ✓"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 6,
   "points": [
    "f4_bank"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A lorry travels round a bend of radius $40$ m on a road banked at $10°$ to the horizontal. Its centre of mass is $1.5$ m above the road, midway between its wheels, which are $2$ m apart. The lorry is modelled as a rigid body moving in a horizontal circle.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the speed at which there is no frictional force across the road.",
     "answer": "$8.31$ m s$^{-1}$",
     "ms": [
      "M1 $R\\cos10° = mg$ and $R\\sin10° = \\frac{mv^2}{40}$",
      "M1 $v^2 = 40g\\tan10°$",
      "A1 $8.31$"
     ],
     "steps": [
      {
       "say": "With no friction, resolve vertically and horizontally.",
       "show": "$R\\cos10° = mg,\\quad R\\sin10° = \\frac{mv^2}{40}$"
      },
      {
       "say": "Divide.",
       "show": "$v^2 = 40\\times9.8\\tan10°$"
      },
      {
       "say": "Evaluate.",
       "show": "$v\\approx8.31$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Assuming the lorry does not slide, find the greatest speed at which it can travel without overturning.",
     "answer": "$19.4$ m s$^{-1}$",
     "ms": [
      "B1 on the point of overturning, the reaction on the inner wheels is zero",
      "M1 moments about $G$: $N\\times1 = F\\times1.5$",
      "A1 $\\frac FN = \\frac23$",
      "M1 vertical: $N\\cos10° - F\\sin10° = mg$",
      "M1 horizontal: $N\\sin10° + F\\cos10° = \\frac{mv^2}{40}$",
      "M1 eliminate to get $v^2 = 40g\\frac{\\sin10° + \\frac23\\cos10°}{\\cos10° - \\frac23\\sin10°}$",
      "A1 $19.4$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "When the lorry is about to overturn, the inner wheels lift, so the whole reaction N and friction F act at the outer wheels. Friction acts down the slope.",
       "show": "Only outer wheels in contact"
      },
      {
       "say": "The lorry is not rotating, so moments about G balance. N has arm 1 metre along the road, and F has arm 1.5 metres.",
       "show": "$N(1) = F(1.5) \\Rightarrow \\frac{F}{N} = \\frac23$"
      },
      {
       "say": "Resolve vertically and horizontally.",
       "show": "$N\\cos10° - F\\sin10° = mg,\\quad N\\sin10° + F\\cos10° = \\frac{mv^2}{40}$"
      },
      {
       "say": "Divide, then divide top and bottom by N.",
       "show": "$\\frac{v^2}{40g} = \\frac{\\sin10° + \\frac23\\cos10°}{\\cos10° - \\frac23\\sin10°}$"
      },
      {
       "say": "Evaluate.",
       "show": "$v^2 \\approx 374.5 \\Rightarrow v\\approx19.4$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The coefficient of friction between the tyres and the road is $0.5$. Determine whether the lorry slides or overturns first as its speed is increased.",
     "answer": "Slides first, at about $17.1$ m s$^{-1}$",
     "ms": [
      "M1 sliding when $\\frac FN = 0.5$",
      "A1 $0.5 \\lt \\frac23$",
      "A1 slides first (at about $17.1$ m s$^{-1}$)"
     ],
     "steps": [
      {
       "say": "As speed increases, the ratio F over N needed increases. Sliding starts when it reaches mu, which is 0.5.",
       "show": "$\\frac FN = 0.5$"
      },
      {
       "say": "Overturning needs a ratio of two thirds, which is larger, so sliding comes first.",
       "show": "$0.5 \\lt \\frac23$"
      },
      {
       "say": "Using 0.5 in the same formula gives a sliding speed of about 17.1 metres per second.",
       "show": "$v^2 = 40g\\frac{\\sin10°+0.5\\cos10°}{\\cos10°-0.5\\sin10°}\\Rightarrow v\\approx17.1$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 7,
   "points": [
    "f4_kin3"
   ],
   "q": "<b>Section B · Mechanics 2</b> (75 marks)<br>Two particles $P$ and $Q$ have position vectors at time $t$ s given by $$\\mathbf r_P = 2t\\,\\mathbf i + (t^2-1)\\mathbf j + 3\\mathbf k,\\qquad \\mathbf r_Q = (t+2)\\mathbf i + 3\\mathbf j + (5-t)\\mathbf k$$ in metres.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the distance between the particles when $t = 0$.",
     "answer": "$\\sqrt{24}\\approx4.90$ m",
     "ms": [
      "M1 $\\mathbf r_P - \\mathbf r_Q$ at $t=0$",
      "A1 $-2\\mathbf i - 4\\mathbf j - 2\\mathbf k$",
      "A1 $4.90$ m"
     ],
     "steps": [
      {
       "say": "At t equals 0, P is at 0, minus 1, 3 and Q is at 2, 3, 5.",
       "show": "$\\mathbf r_P - \\mathbf r_Q = -2\\mathbf i - 4\\mathbf j - 2\\mathbf k$"
      },
      {
       "say": "Find the magnitude.",
       "show": "$\\sqrt{4+16+4} = \\sqrt{24}$"
      },
      {
       "say": "So the distance is about 4.90 metres.",
       "show": "$\\approx4.90$ m"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Show that the particles collide, and find the position vector of the point of collision.",
     "answer": "At $t = 2$, at $4\\mathbf i + 3\\mathbf j + 3\\mathbf k$",
     "ms": [
      "M1 $\\mathbf r_P - \\mathbf r_Q = (t-2)\\mathbf i + (t^2-4)\\mathbf j + (t-2)\\mathbf k$",
      "M1 all components zero simultaneously",
      "A1 $t = 2$",
      "A1 $4\\mathbf i + 3\\mathbf j + 3\\mathbf k$"
     ],
     "steps": [
      {
       "say": "Find the relative position.",
       "show": "$\\mathbf r_P - \\mathbf r_Q = (t-2)\\mathbf i + (t^2-4)\\mathbf j + (t-2)\\mathbf k$"
      },
      {
       "say": "The i and k components are zero only at t equals 2, and the j component is zero then too.",
       "show": "$t = 2$"
      },
      {
       "say": "Substitute t equals 2 into either position vector.",
       "show": "$\\mathbf r = 4\\mathbf i + 3\\mathbf j + 3\\mathbf k$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Find the angle between the directions of motion of $P$ and $Q$ at the instant of collision.",
     "answer": "$71.6°$",
     "ms": [
      "M1 differentiate both",
      "A1 $\\mathbf v_P = 2\\mathbf i + 4\\mathbf j$, $\\mathbf v_Q = \\mathbf i - \\mathbf k$ at $t=2$",
      "M1 scalar product",
      "A1 $\\cos\\theta = \\frac{2}{\\sqrt{20}\\sqrt2}$",
      "A1 $71.6°$"
     ],
     "steps": [
      {
       "say": "Differentiate each position vector.",
       "show": "$\\mathbf v_P = 2\\mathbf i + 2t\\mathbf j,\\quad \\mathbf v_Q = \\mathbf i - \\mathbf k$"
      },
      {
       "say": "At t equals 2.",
       "show": "$\\mathbf v_P = 2\\mathbf i + 4\\mathbf j,\\quad\\mathbf v_Q = \\mathbf i - \\mathbf k$"
      },
      {
       "say": "Use the scalar product.",
       "show": "$\\cos\\theta = \\frac{(2)(1) + 0 + 0}{\\sqrt{20}\\sqrt2} = \\frac{2}{\\sqrt{40}}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\theta\\approx71.6°$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f4_varacc"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A boat moving in a straight line switches off its engine when its speed is $20$ m s$^{-1}$. Its deceleration is then $0.05v^2$ m s$^{-2}$. Find the distance it travels while its speed falls to $5$ m s$^{-1}$.",
     "answer": "$20\\ln4\\approx27.7$ m",
     "ms": [
      "M1 $v\\frac{dv}{dx} = -0.05v^2$",
      "M1 separate: $\\int\\frac{dv}{v} = -0.05\\int dx$",
      "A1 $\\ln v = -0.05x + c$",
      "A1 $v = 20e^{-0.05x}$",
      "A1 $27.7$ m"
     ],
     "steps": [
      {
       "say": "Deceleration depends on v and we want distance, so use v dv by dx.",
       "show": "$v\\frac{dv}{dx} = -0.05v^2 \\Rightarrow \\frac{dv}{dx} = -0.05v$"
      },
      {
       "say": "Separate and integrate.",
       "show": "$\\ln v = -0.05x + c$"
      },
      {
       "say": "At x equals 0, v is 20.",
       "show": "$v = 20e^{-0.05x}$"
      },
      {
       "say": "Set v equal to 5.",
       "show": "$e^{-0.05x} = \\frac14 \\Rightarrow x = 20\\ln4\\approx27.7$ m"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the time taken for the speed to fall from $20$ to $5$ m s$^{-1}$.",
     "answer": "$3$ s",
     "ms": [
      "M1 $\\frac{dv}{dt} = -0.05v^2$",
      "A1 $\\frac1v = 0.05t + \\frac1{20}$",
      "A1 $t = 3$"
     ],
     "steps": [
      {
       "say": "Now use dv by dt.",
       "show": "$\\int\\frac{dv}{v^2} = -0.05\\int dt \\Rightarrow \\frac1v = 0.05t + c$"
      },
      {
       "say": "At t equals 0, v is 20, so c is a twentieth.",
       "show": "$\\frac1v = 0.05t + 0.05$"
      },
      {
       "say": "Put v equals 5: a fifth equals 0.05 t plus 0.05.",
       "show": "$t = 3$ s"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "A car of mass $800$ kg moves on a level road with its engine working at a constant $24$ kW. The resistance is $15v$ N. Show that $800v^2\\dfrac{dv}{dx} = 24000 - 15v^2$, and find the distance travelled while the speed increases from $10$ to $20$ m s$^{-1}$.",
     "answer": "$93.6$ m",
     "ms": [
      "M1 driving force $\\frac{24000}{v}$ and $F = ma$ with $a = v\\frac{dv}{dx}$",
      "A1 equation shown",
      "M1 $x = \\int_{10}^{20}\\frac{800v^2}{24000-15v^2}\\,dv$",
      "M1 rewrite integrand as $\\frac{800}{15}\\left(-1 + \\frac{1600}{1600-v^2}\\right)$",
      "A1 $93.6$ m"
     ],
     "steps": [
      {
       "say": "The driving force is power over speed. Newton's second law, with acceleration v dv by dx.",
       "show": "$800v\\frac{dv}{dx} = \\frac{24000}{v} - 15v$"
      },
      {
       "say": "Multiply by v.",
       "show": "$800v^2\\frac{dv}{dx} = 24000 - 15v^2$"
      },
      {
       "say": "Separate the variables.",
       "show": "$x = \\int_{10}^{20}\\frac{800v^2}{24000-15v^2}dv = \\frac{800}{15}\\int_{10}^{20}\\left(-1 + \\frac{1600}{1600-v^2}\\right)dv$"
      },
      {
       "say": "The second part is a partial fractions integral giving 20 ln of 40 plus v over 40 minus v.",
       "show": "$=\\frac{800}{15}\\Big[-v + 20\\ln\\frac{40+v}{40-v}\\Big]_{10}^{20} = \\frac{800}{15}\\left(-10 + 20\\ln\\frac95\\right)$"
      },
      {
       "say": "Evaluate.",
       "show": "$x\\approx93.6$ m"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f4_comcal"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "Prove, using integration, that the centre of mass of a uniform solid hemisphere of radius $r$ is at a distance $\\frac38r$ from its plane face.",
     "answer": "Proved.",
     "ms": [
      "M1 hemisphere as rotation of $x^2 + y^2 = r^2$, $0\\le x\\le r$, about the $x$-axis",
      "M1 $\\bar x = \\frac{\\int\\pi y^2x\\,dx}{\\int\\pi y^2\\,dx}$",
      "A1 $\\int_0^r(r^2 - x^2)x\\,dx = \\frac{r^4}{4}$",
      "A1 $\\int_0^r(r^2-x^2)\\,dx = \\frac{2r^3}{3}$",
      "M1 divide",
      "A1 $\\frac{3r}{8}$",
      "B1 clear statement that $\\bar x$ is measured from the plane face (by symmetry $G$ lies on the axis)"
     ],
     "steps": [
      {
       "say": "Rotate the quarter circle x squared plus y squared equals r squared, for x from 0 to r, about the x-axis. The plane face is at x equals 0.",
       "show": "$y^2 = r^2 - x^2$"
      },
      {
       "say": "Slice into discs. By symmetry G is on the axis.",
       "show": "$\\bar x = \\frac{\\int_0^r\\pi(r^2-x^2)x\\,dx}{\\int_0^r\\pi(r^2-x^2)\\,dx}$"
      },
      {
       "say": "The top integral is r to the fourth over 2 minus r to the fourth over 4.",
       "show": "$\\int_0^r(r^2x - x^3)dx = \\frac{r^4}{4}$"
      },
      {
       "say": "The bottom integral is r cubed minus r cubed over 3.",
       "show": "$\\int_0^r(r^2 - x^2)dx = \\frac{2r^3}{3}$"
      },
      {
       "say": "Divide.",
       "show": "$\\bar x = \\frac{r^4/4}{2r^3/3} = \\frac{3r}{8}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "A uniform lamina occupies the region between $y = \\sin x$ and the $x$-axis for $0 \\le x \\le \\pi$. Find its centre of mass.",
     "answer": "$\\left(\\frac\\pi2, \\frac\\pi8\\right)$",
     "ms": [
      "B1 $\\bar x = \\frac\\pi2$ by symmetry",
      "B1 area $2$",
      "M1 $\\bar y = \\frac{\\int\\frac12\\sin^2x\\,dx}{2}$",
      "A1 $\\frac\\pi8$"
     ],
     "steps": [
      {
       "say": "The region is symmetric about x equals pi over 2.",
       "show": "$\\bar x = \\frac\\pi2$"
      },
      {
       "say": "The area is the integral of sin x from 0 to pi, which is 2.",
       "show": "$A = 2$"
      },
      {
       "say": "For y bar, use a half y squared. The integral of sin squared from 0 to pi is pi over 2.",
       "show": "$\\int_0^\\pi\\frac12\\sin^2x\\,dx = \\frac\\pi4$"
      },
      {
       "say": "Divide by the area.",
       "show": "$\\bar y = \\frac{\\pi/4}{2} = \\frac\\pi8$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f4_comp",
    "f4_topple"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A toy consists of a uniform solid hemisphere of radius $r$ joined at its plane face to a uniform solid right circular cone of base radius $r$ and height $h$, made of the same material. Show that the centre of mass of the toy is at a distance $$\\frac{3r^2 - h^2}{4(2r + h)}$$ from the common plane face, on the side of the hemisphere. (The centre of mass of a solid cone is $\\frac h4$ from its base.)",
     "answer": "Shown.",
     "ms": [
      "B1 masses proportional to $\\frac23\\pi r^3$ and $\\frac13\\pi r^2h$",
      "B1 positions $\\frac38r$ (hemisphere side) and $\\frac h4$ (cone side)",
      "M1 moments with consistent signs",
      "A1 $\\left(\\frac23r^3 + \\frac13r^2h\\right)\\bar d = \\frac23r^3\\cdot\\frac{3r}{8} - \\frac13r^2h\\cdot\\frac h4$",
      "A1 simplified to given result"
     ],
     "steps": [
      {
       "say": "The masses are proportional to volumes.",
       "show": "$m_H \\propto \\frac23\\pi r^3,\\quad m_C\\propto\\frac13\\pi r^2h$"
      },
      {
       "say": "Measure distance from the plane face towards the hemisphere. The hemisphere centre is at plus 3r over 8 and the cone centre is at minus h over 4.",
       "show": "$+\\frac{3r}{8}$ and $-\\frac h4$"
      },
      {
       "say": "Take moments, cancelling pi.",
       "show": "$\\left(\\frac23r^3+\\frac13r^2h\\right)\\bar d = \\frac{r^4}{4} - \\frac{r^2h^2}{12}$"
      },
      {
       "say": "Multiply through by 12 over r squared.",
       "show": "$(8r + 4h)\\bar d = 3r^2 - h^2 \\Rightarrow \\bar d = \\frac{3r^2-h^2}{4(2r+h)}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The toy rests with its curved surface on a horizontal table. Explain why it returns to the upright position when slightly tilted, provided $h \\lt \\sqrt3\\,r$.",
     "answer": "$G$ lies inside the hemisphere, below the centre of the plane face",
     "ms": [
      "B1 normal reaction always passes through the centre $O$ of the plane face",
      "M1 $G$ below $O$ when $3r^2 - h^2 \\gt 0$",
      "A1 weight then gives a restoring moment about the contact point"
     ],
     "steps": [
      {
       "say": "The table's reaction is perpendicular to the curved surface, so it always passes through the centre O of the plane face.",
       "show": "Reaction through $O$"
      },
      {
       "say": "If h is less than root 3 r, the distance in part a is positive, so G lies below O.",
       "show": "$3r^2 - h^2 \\gt 0$"
      },
      {
       "say": "When tilted, the weight acting through G then has a moment that turns the toy back upright.",
       "show": "Restoring moment"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "A uniform rectangular block of width $0.6$ m, height $1.0$ m and weight $120$ N rests on a rough horizontal floor, coefficient of friction $0.4$. A force $P$ N is applied at the midpoint of one top edge, pulling away from the block at $30°$ above the horizontal, in the vertical plane through the centre of mass perpendicular to that edge. $P$ is increased gradually. Determine whether the block slides or tips first.",
     "answer": "Tips first when $P = 41.6$ N (sliding needs $45.0$ N)",
     "ms": [
      "M1 normal reaction $120 - P\\sin30°$",
      "M1 sliding: $P\\cos30° = 0.4(120 - P\\sin30°)$",
      "A1 $P = 45.0$",
      "M1 tipping: moments about the bottom edge below the pulled edge",
      "A1 $P\\cos30°\\times1.0 = 120\\times0.3$, $P = 41.6$",
      "A1 tips first"
     ],
     "steps": [
      {
       "say": "The vertical component of P reduces the normal reaction.",
       "show": "$R = 120 - P\\sin30°$"
      },
      {
       "say": "For sliding, the horizontal component equals limiting friction.",
       "show": "$P\\cos30° = 0.4(120 - 0.5P) \\Rightarrow P = \\frac{48}{\\cos30° + 0.2}\\approx45.0$ N"
      },
      {
       "say": "For tipping, take moments about the bottom edge directly below the pulled edge. The vertical part of P passes through that edge, so only the horizontal part has a moment, with arm 1.0 metre. The weight has arm 0.3 metres.",
       "show": "$P\\cos30°(1.0) = 120(0.3)$"
      },
      {
       "say": "Solve.",
       "show": "$P = \\frac{36}{\\cos30°}\\approx41.6$ N"
      },
      {
       "say": "41.6 is less than 45.0, so the block tips first.",
       "show": "Tips first"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 11,
   "points": [
    "f4_forces"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>$ABCD$ is a square of side $2$ m with $A(0,0)$, $B(2,0)$, $C(2,2)$, $D(0,2)$. Forces of magnitude $3$ N, $4$ N, $5$ N and $2$ N act along $AB$, $BC$, $CD$ and $DA$ respectively, in the directions indicated by the order of the letters.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the magnitude and direction of the resultant.",
     "answer": "$2\\sqrt2\\approx2.83$ N in direction $-\\mathbf i + \\mathbf j$ ($135°$ to $\\overrightarrow{AB}$)",
     "ms": [
      "M1 sum components",
      "A1 $-2\\mathbf i + 2\\mathbf j$",
      "A1 $2.83$ N at $135°$"
     ],
     "steps": [
      {
       "say": "Write each force as a vector: 3 i, 4 j, minus 5 i, minus 2 j.",
       "show": "$\\mathbf R = (3-5)\\mathbf i + (4-2)\\mathbf j = -2\\mathbf i + 2\\mathbf j$"
      },
      {
       "say": "Find the magnitude.",
       "show": "$|\\mathbf R| = 2\\sqrt2\\approx2.83$ N"
      },
      {
       "say": "It points up and to the left, at 135 degrees to AB.",
       "show": "$135°$ to $\\overrightarrow{AB}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the moment of the system about $A$, and find where the line of action of the resultant meets the line $AB$ (extended).",
     "answer": "$18$ N m anticlockwise; at $(9, 0)$",
     "ms": [
      "M1 moments of each force about $A$",
      "A1 $0 + 8 + 10 + 0 = 18$",
      "M1 resultant at $(x, 0)$ has moment $2x$",
      "A1 $x = 9$"
     ],
     "steps": [
      {
       "say": "Moments about A, anticlockwise positive. AB and DA pass through A. BC has arm 2 and CD has arm 2.",
       "show": "$M_A = 0 + 4(2) + 5(2) + 0 = 18$ N m"
      },
      {
       "say": "If the resultant acts at the point x, 0, its moment about A is x times 2 minus 0.",
       "show": "$x(2) - 0(-2) = 2x$"
      },
      {
       "say": "Set equal to 18.",
       "show": "$2x = 18 \\Rightarrow x = 9$"
      },
      {
       "say": "So it meets AB extended 9 metres from A.",
       "show": "$(9, 0)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A further force $\\mathbf F$ is added at $C$ so that the system reduces to a couple. Find $\\mathbf F$ and the moment of the couple.",
     "answer": "$\\mathbf F = 2\\mathbf i - 2\\mathbf j$; couple $10$ N m anticlockwise",
     "ms": [
      "M1 $\\mathbf F = -\\mathbf R$",
      "A1 $2\\mathbf i - 2\\mathbf j$",
      "M1 moment of $\\mathbf F$ about $A$: $2(-2) - 2(2)$",
      "A1 $18 - 8 = 10$ N m anticlockwise"
     ],
     "steps": [
      {
       "say": "For a couple, the resultant force must be zero, so F is minus R.",
       "show": "$\\mathbf F = 2\\mathbf i - 2\\mathbf j$"
      },
      {
       "say": "Find the moment of F at C about A.",
       "show": "$x F_y - y F_x = 2(-2) - 2(2) = -8$"
      },
      {
       "say": "Add it to the original moment.",
       "show": "$18 - 8 = 10$"
      },
      {
       "say": "So the system reduces to a couple of 10 newton metres anticlockwise.",
       "show": "$10$ N m anticlockwise"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 12,
   "points": [
    "f4_rest"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>A smooth sphere $A$ of mass $m$ moving with speed $u$ on a smooth horizontal floor collides directly with a smooth sphere $B$ of mass $2m$ at rest. The coefficient of restitution is $e$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Find the velocities of $A$ and $B$ after the collision in terms of $u$ and $e$.",
     "answer": "$v_A = \\frac{u(1-2e)}{3}$, $v_B = \\frac{u(1+e)}{3}$",
     "ms": [
      "M1 momentum: $mu = mv_A + 2mv_B$",
      "M1 restitution: $v_B - v_A = eu$",
      "M1 solve",
      "A1 $v_B = \\frac{u(1+e)}{3}$",
      "A1 $v_A = \\frac{u(1-2e)}{3}$"
     ],
     "steps": [
      {
       "say": "Conserve momentum, dividing by m.",
       "show": "$u = v_A + 2v_B$"
      },
      {
       "say": "Newton's law of restitution.",
       "show": "$v_B - v_A = eu$"
      },
      {
       "say": "Add the equations to eliminate v A.",
       "show": "$3v_B = u(1+e) \\Rightarrow v_B = \\frac{u(1+e)}{3}$"
      },
      {
       "say": "Then find v A.",
       "show": "$v_A = v_B - eu = \\frac{u(1-2e)}{3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Show that $A$ reverses its direction of motion if $e \\gt \\frac12$.",
     "answer": "$v_A \\lt 0 \\iff 1 - 2e \\lt 0$",
     "ms": [
      "M1 $v_A \\lt 0$",
      "A1 $e\\gt\\frac12$"
     ],
     "steps": [
      {
       "say": "A reverses if its new velocity is negative.",
       "show": "$\\frac{u(1-2e)}{3} \\lt 0$"
      },
      {
       "say": "Since u is positive, this needs 1 minus 2e to be negative.",
       "show": "$1 - 2e \\lt 0$"
      },
      {
       "say": "So e is greater than a half.",
       "show": "$e\\gt\\frac12$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Take $e = \\frac34$. $B$ then strikes a fixed smooth vertical wall at right angles, the coefficient of restitution between $B$ and the wall being $\\frac12$. Show that $B$ will collide with $A$ again.",
     "answer": "$B$ returns at $\\frac{7u}{24}$, faster than $A$'s $\\frac{4u}{24}$",
     "ms": [
      "A1 $v_A = -\\frac u6$, $v_B = \\frac{7u}{12}$",
      "M1 rebound speed $\\frac12\\times\\frac{7u}{12}$",
      "A1 $\\frac{7u}{24}$",
      "A1 $\\frac{7u}{24}\\gt\\frac{u}{6}$, both moving away from the wall, so $B$ catches $A$"
     ],
     "steps": [
      {
       "say": "Substitute e equals three quarters.",
       "show": "$v_A = \\frac{u(1 - 1.5)}{3} = -\\frac u6,\\quad v_B = \\frac{1.75u}{3} = \\frac{7u}{12}$"
      },
      {
       "say": "B rebounds from the wall with half its speed.",
       "show": "$\\frac12\\cdot\\frac{7u}{12} = \\frac{7u}{24}$"
      },
      {
       "say": "Both spheres now move away from the wall. A moves at u over 6, which is 4u over 24; B moves at 7u over 24.",
       "show": "$\\frac{7u}{24} \\gt \\frac{4u}{24}$"
      },
      {
       "say": "B is faster and behind A, so it catches A: there is a second collision.",
       "show": "Second collision"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "For $e = \\frac34$, find the fraction of the kinetic energy lost in the first collision.",
     "answer": "$\\frac{7}{24}$",
     "ms": [
      "M1 KE after: $\\frac12m\\left(\\frac u6\\right)^2 + \\frac12(2m)\\left(\\frac{7u}{12}\\right)^2$",
      "A1 $\\frac{102}{144}\\times\\frac12mu^2$",
      "A1 fraction lost $\\frac{7}{24}$"
     ],
     "steps": [
      {
       "say": "The kinetic energy before is a half m u squared.",
       "show": "$\\text{KE}_0 = \\frac12mu^2$"
      },
      {
       "say": "After: a half m times u over 6 squared, plus m times 7u over 12 squared.",
       "show": "$\\frac12mu^2\\left(\\frac{1}{36} + \\frac{98}{144}\\right) = \\frac12mu^2\\cdot\\frac{102}{144}$"
      },
      {
       "say": "The fraction lost is 1 minus 102 over 144.",
       "show": "$\\frac{42}{144} = \\frac{7}{24}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 13,
   "points": [
    "f4_lnorm",
    "f4_lin"
   ],
   "q": "<b>Section C · Statistics</b> (75 marks)<br>The masses of adults using a lift are normally distributed with mean $78$ kg and standard deviation $12$ kg. The masses of children are normally distributed with mean $35$ kg and standard deviation $8$ kg. All masses are independent.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "The lift has a safe load of $800$ kg. Find the probability that $8$ adults and $4$ children together exceed the safe load.",
     "answer": "$0.169$",
     "ms": [
      "M1 mean $8(78) + 4(35) = 764$",
      "M1 variance $8(144) + 4(64)$",
      "A1 $1408$",
      "M1 standardise $\\frac{800 - 764}{\\sqrt{1408}}$",
      "A1 $0.169$"
     ],
     "steps": [
      {
       "say": "The total T is a sum of 12 independent masses. Add the means.",
       "show": "$E(T) = 8(78) + 4(35) = 764$"
      },
      {
       "say": "Add the variances, one for each person.",
       "show": "$\\text{Var}(T) = 8(144) + 4(64) = 1408,\\ \\sigma\\approx37.52$"
      },
      {
       "say": "Standardise.",
       "show": "$P(T \\gt 800) = P\\left(Z\\gt\\frac{36}{37.52}\\right) = P(Z\\gt0.959)$"
      },
      {
       "say": "From tables.",
       "show": "$\\approx0.169$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "One adult and one child are chosen at random. Find the probability that the adult's mass is more than twice the child's mass.",
     "answer": "$0.655$",
     "ms": [
      "M1 $D = A - 2C$",
      "A1 $E(D) = 8$",
      "M1 $\\text{Var}(D) = 144 + 4(64)$",
      "A1 $400$",
      "A1 $P(D\\gt0) = P(Z\\gt-0.4) = 0.655$"
     ],
     "steps": [
      {
       "say": "Let D be A minus 2C. We need D to be positive.",
       "show": "$D = A - 2C$"
      },
      {
       "say": "Its mean is 78 minus 70.",
       "show": "$E(D) = 8$"
      },
      {
       "say": "Its variance is 144 plus 4 times 64, because the coefficient 2 is squared.",
       "show": "$\\text{Var}(D) = 400,\\ \\sigma = 20$"
      },
      {
       "say": "Standardise.",
       "show": "$P(D\\gt0) = P\\left(Z\\gt-\\frac{8}{20}\\right) = P(Z\\gt-0.4)\\approx0.655$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find $P(3A \\gt 260)$ and $P(A_1 + A_2 + A_3 \\gt 260)$, where $A$, $A_1$, $A_2$, $A_3$ are adult masses, and explain why the answers differ.",
     "answer": "$0.235$ and $0.105$",
     "ms": [
      "M1 $3A\\sim N(234, 1296)$",
      "A1 $0.235$",
      "A1 sum $\\sim N(234, 432)$, $0.105$",
      "B1 a single mass tripled has more variability than three independent masses added"
     ],
     "steps": [
      {
       "say": "3A is one adult's mass tripled: variance 9 times 144.",
       "show": "$3A\\sim N(234, 36^2)$: $P(Z\\gt0.722)\\approx0.235$"
      },
      {
       "say": "The sum of three different adults has variance 3 times 144.",
       "show": "$\\sum A_i\\sim N(234, 432)$: $P(Z\\gt1.251)\\approx0.105$"
      },
      {
       "say": "Three independent masses partly balance each other out, so their total is less spread out than one mass multiplied by 3.",
       "show": "Smaller variance, smaller tail probability"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f4_clt",
    "f4_est",
    "f4_ci"
   ],
   "q": "<b>Section C · Statistics</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "The number of emails a help desk receives per hour has mean $4$ and variance $4$. Use the central limit theorem to estimate the probability that the mean number per hour over a random sample of $40$ hours exceeds $4.5$.",
     "answer": "$0.0569$",
     "ms": [
      "M1 $\\bar X\\approx N\\left(4, \\frac{4}{40}\\right)$",
      "A1 SE $0.316$",
      "M1 $P\\left(Z\\gt\\frac{0.5}{0.316}\\right)$",
      "A1 $0.0569$"
     ],
     "steps": [
      {
       "say": "By the central limit theorem, the sample mean of 40 hours is approximately normal.",
       "show": "$\\bar X\\approx N\\left(4, \\frac{4}{40}\\right) = N(4, 0.1)$"
      },
      {
       "say": "The standard error is root 0.1.",
       "show": "$\\sigma_{\\bar X}\\approx0.3162$"
      },
      {
       "say": "Standardise.",
       "show": "$P(\\bar X\\gt4.5) = P(Z\\gt1.581)\\approx0.0569$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "A random sample of $60$ observations of a variable $Y$ gives $\\sum y = 2550$ and $\\sum(y - \\bar y)^2 = 3540$. Calculate unbiased estimates of the mean and variance of $Y$, and a $99\\%$ confidence interval for the population mean.",
     "answer": "$\\bar y = 42.5$, $s^2 = 60$; $(39.92,\\ 45.08)$",
     "ms": [
      "B1 $\\bar y = 42.5$",
      "B1 $s^2 = \\frac{3540}{59} = 60$",
      "M1 SE $= \\sqrt{\\frac{60}{60}} = 1$",
      "B1 $z = 2.576$",
      "A1 $(39.92, 45.08)$"
     ],
     "steps": [
      {
       "say": "The mean is 2550 over 60.",
       "show": "$\\bar y = 42.5$"
      },
      {
       "say": "The unbiased variance divides the sum of squared deviations by n minus 1.",
       "show": "$s^2 = \\frac{3540}{59} = 60$"
      },
      {
       "say": "The standard error is root of 60 over 60, which is 1.",
       "show": "$\\text{SE} = 1$"
      },
      {
       "say": "For 99 percent use z equals 2.576.",
       "show": "$42.5\\pm2.576 = (39.92,\\ 45.08)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Using $s^2 = 60$ as the population variance, find the smallest sample size for which the width of a $95\\%$ confidence interval for the mean would be at most $2$.",
     "answer": "$n = 231$",
     "ms": [
      "M1 width $2\\times1.96\\sqrt{\\frac{60}{n}}$",
      "M1 $\\le 2$",
      "A1 $n \\ge 230.5$",
      "A1 $n = 231$"
     ],
     "steps": [
      {
       "say": "The width of the interval is twice 1.96 times the standard error.",
       "show": "$2\\times1.96\\sqrt{\\frac{60}{n}} \\le 2$"
      },
      {
       "say": "Rearrange.",
       "show": "$\\sqrt{\\frac{60}{n}}\\le\\frac{1}{1.96} \\Rightarrow n\\ge1.96^2\\times60$"
      },
      {
       "say": "Evaluate.",
       "show": "$n \\ge 230.5$"
      },
      {
       "say": "n must be a whole number, so round up.",
       "show": "$n = 231$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f4_t1"
   ],
   "q": "<b>Section C · Statistics</b><br>A manufacturer states that the mean breaking strain of its fishing line is $50$ N. The breaking strains are normally distributed. A random sample of $10$ lengths gave $\\sum x = 482$ and $\\sum x^2 = 23290$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate unbiased estimates of the population mean and variance.",
     "answer": "$48.2$; $6.4$",
     "ms": [
      "B1 $\\bar x = 48.2$",
      "M1 $s^2 = \\frac{1}{9}\\left(23290 - \\frac{482^2}{10}\\right)$",
      "A1 $6.4$"
     ],
     "steps": [
      {
       "say": "The sample mean is 482 over 10.",
       "show": "$\\bar x = 48.2$"
      },
      {
       "say": "Use the n minus 1 formula.",
       "show": "$s^2 = \\frac{23290 - 23232.4}{9} = \\frac{57.6}{9}$"
      },
      {
       "say": "So s squared is 6.4.",
       "show": "$s^2 = 6.4,\\ s\\approx2.530$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Test, at the $5\\%$ significance level, whether the mean breaking strain differs from $50$ N.",
     "answer": "$|t| = 2.25 \\lt 2.262$: do not reject $H_0$",
     "ms": [
      "B1 $H_0: \\mu = 50$, $H_1: \\mu\\ne50$",
      "B1 $t$ with $9$ degrees of freedom",
      "M1 $t = \\frac{48.2 - 50}{\\sqrt{6.4/10}}$",
      "A1 $t = -2.25$",
      "B1 two-tailed critical value $2.262$",
      "M1 compare $|t|$ with $2.262$",
      "A1 do not reject $H_0$: insufficient evidence that the mean differs from 50 N"
     ],
     "steps": [
      {
       "say": "The alternative is two-sided because the question asks whether the mean differs.",
       "show": "$H_0: \\mu = 50,\\quad H_1: \\mu\\ne50$"
      },
      {
       "say": "The standard error is the root of 6.4 over 10, which is 0.8.",
       "show": "$\\frac{s}{\\sqrt n} = 0.8$"
      },
      {
       "say": "Calculate t.",
       "show": "$t = \\frac{48.2 - 50}{0.8} = -2.25$"
      },
      {
       "say": "With 9 degrees of freedom, the two-tailed 5 percent critical value is 2.262.",
       "show": "$t_9(0.025) = 2.262$"
      },
      {
       "say": "The absolute value 2.25 is just less than 2.262, so it is not in the critical region.",
       "show": "$|-2.25| \\lt 2.262$"
      },
      {
       "say": "Do not reject H nought. The evidence is only borderline, so we cannot conclude the mean differs from 50 newtons.",
       "show": "Do not reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State, with a reason, whether a $10\\%$ significance level would change the conclusion, given the critical value $1.833$.",
     "answer": "Yes: $2.25 \\gt 1.833$, reject $H_0$ at 10%",
     "ms": [
      "M1 compare $2.25$ with $1.833$",
      "A1 reject $H_0$ at 10%"
     ],
     "steps": [
      {
       "say": "Compare the size of t with the new critical value.",
       "show": "$2.25 \\gt 1.833$"
      },
      {
       "say": "Now t is in the critical region.",
       "show": "In critical region"
      },
      {
       "say": "So at the 10 percent level we would conclude that the mean differs from 50 newtons.",
       "show": "Reject $H_0$ at 10%"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 16,
   "points": [
    "f4_t2"
   ],
   "q": "<b>Section C · Statistics</b><br>Two independent random samples of plants were grown with different fertilisers. Heights in cm:<br>Fertiliser $X$: $n_1 = 8$, $\\bar x_1 = 25.0$, $s_1^2 = 4.2$.<br>Fertiliser $Y$: $n_2 = 10$, $\\bar x_2 = 22.8$, $s_2^2 = 5.0$.<br>($s_1^2$ and $s_2^2$ are unbiased estimates of the population variances.)",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "State the conditions required for a two-sample $t$-test to be valid.",
     "answer": "Independent random samples; normal populations; equal population variances",
     "ms": [
      "B1 independent random samples",
      "B1 both populations normally distributed",
      "B1 common (equal) population variance"
     ],
     "steps": [
      {
       "say": "The two samples must be random and independent of each other.",
       "show": "Independent random samples"
      },
      {
       "say": "Both populations of heights must be normally distributed.",
       "show": "Normal populations"
      },
      {
       "say": "The two populations must have the same variance, so we can pool the estimates.",
       "show": "$\\sigma_1^2 = \\sigma_2^2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Calculate the pooled estimate of the common variance.",
     "answer": "$4.65$",
     "ms": [
      "M1 $s_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1+n_2-2}$",
      "A1 $\\frac{7(4.2)+9(5.0)}{16}$",
      "A1 $4.65$"
     ],
     "steps": [
      {
       "say": "Weight each sample variance by its degrees of freedom.",
       "show": "$s_p^2 = \\frac{7(4.2) + 9(5.0)}{16}$"
      },
      {
       "say": "Evaluate the numerator: 29.4 plus 45 is 74.4.",
       "show": "$s_p^2 = \\frac{74.4}{16}$"
      },
      {
       "say": "So the pooled variance is 4.65.",
       "show": "$s_p^2 = 4.65$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 8,
     "q": "Test, at the $5\\%$ level, whether fertiliser $X$ produces taller plants on average.",
     "answer": "$t = 2.15 \\gt 1.746$: reject $H_0$",
     "ms": [
      "B1 $H_0: \\mu_X = \\mu_Y$, $H_1: \\mu_X \\gt \\mu_Y$",
      "M1 SE $= \\sqrt{4.65\\left(\\frac18+\\frac1{10}\\right)}$",
      "A1 $1.0229$",
      "M1 $t = \\frac{25.0-22.8}{1.0229}$",
      "A1 $2.15$",
      "B1 $\\nu = 16$, critical value $1.746$",
      "M1 compare",
      "A1 reject $H_0$: evidence that $X$ gives taller plants on average"
     ],
     "steps": [
      {
       "say": "State the hypotheses, one-tailed.",
       "show": "$H_0: \\mu_X = \\mu_Y,\\quad H_1: \\mu_X\\gt\\mu_Y$"
      },
      {
       "say": "The standard error of the difference uses the pooled variance.",
       "show": "$\\sqrt{4.65\\left(\\frac18+\\frac1{10}\\right)} = \\sqrt{1.04625}\\approx1.0229$"
      },
      {
       "say": "Calculate t.",
       "show": "$t = \\frac{2.2}{1.0229}\\approx2.15$"
      },
      {
       "say": "Degrees of freedom: 8 plus 10 minus 2 is 16. The one-tailed 5 percent value is 1.746.",
       "show": "$t_{16}(0.05) = 1.746$"
      },
      {
       "say": "2.15 is greater than 1.746, so reject H nought.",
       "show": "$2.15\\gt1.746$"
      },
      {
       "say": "There is evidence that fertiliser X produces taller plants on average.",
       "show": "Reject $H_0$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 17,
   "points": [
    "f4_gof"
   ],
   "q": "<b>Section C · Statistics</b><br>In a germination trial, 4 seeds were planted in each of 100 pots and the number germinating in each pot was recorded.<br><table class=\"data\"><tr><th>Number germinating</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr><tr><td>Number of pots</td><td>5</td><td>18</td><td>30</td><td>32</td><td>15</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Estimate the probability $p$ that a seed germinates.",
     "answer": "$0.585$",
     "ms": [
      "M1 mean $= 2.34$",
      "A1 $p = \\frac{2.34}{4} = 0.585$"
     ],
     "steps": [
      {
       "say": "Find the mean number per pot.",
       "show": "$\\bar x = \\frac{0+18+60+96+60}{100} = 2.34$"
      },
      {
       "say": "For a binomial with 4 trials, the mean is 4p.",
       "show": "$4p = 2.34$"
      },
      {
       "say": "So p is 0.585.",
       "show": "$p = 0.585$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the expected frequencies for a $B(4, 0.585)$ model, to 2 decimal places.",
     "answer": "$2.97,\\ 16.72,\\ 35.36,\\ 33.23,\\ 11.71$",
     "ms": [
      "M1 $100\\binom4r p^r(1-p)^{4-r}$",
      "A1 $2.97$, $16.72$",
      "A1 $35.36$",
      "A1 $33.23$, $11.71$"
     ],
     "steps": [
      {
       "say": "Each expected frequency is 100 times the binomial probability.",
       "show": "$E_r = 100\\binom4r(0.585)^r(0.415)^{4-r}$"
      },
      {
       "say": "For 0 and 1.",
       "show": "$E_0 = 2.97,\\ E_1 = 16.72$"
      },
      {
       "say": "For 2, 3 and 4.",
       "show": "$E_2 = 35.36,\\ E_3 = 33.23,\\ E_4 = 11.71$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Test, at the $5\\%$ level, whether a binomial distribution is a suitable model.",
     "answer": "$\\chi^2 = 2.34 \\lt 5.991$: binomial model is suitable",
     "ms": [
      "B1 combine $0$ and $1$ since $E_0 \\lt 5$",
      "M1 $\\sum\\frac{(O-E)^2}{E}$ over four classes",
      "A1 $2.34$",
      "B1 $\\nu = 4 - 1 - 1 = 2$, critical value $5.991$",
      "A1 do not reject $H_0$: binomial model is suitable"
     ],
     "steps": [
      {
       "say": "The expected frequency for 0 is below 5, so combine 0 and 1: observed 23, expected 19.69.",
       "show": "$O: 23, 30, 32, 15;\\quad E: 19.69, 35.36, 33.23, 11.71$"
      },
      {
       "say": "Calculate the statistic.",
       "show": "$\\chi^2 = \\frac{3.31^2}{19.69}+\\frac{5.36^2}{35.36}+\\frac{1.23^2}{33.23}+\\frac{3.29^2}{11.71}\\approx2.34$"
      },
      {
       "say": "There are 4 classes. Subtract 1 for the total and 1 because p was estimated from the data.",
       "show": "$\\nu = 2$, $\\chi^2_2(0.05) = 5.991$"
      },
      {
       "say": "2.34 is less than 5.991, so do not reject H nought: the binomial model fits.",
       "show": "Do not reject $H_0$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 18,
   "points": [
    "f4_cont"
   ],
   "q": "<b>Section C · Statistics</b><br>A survey asked 150 people which of two designs they preferred.<br><table class=\"data\"><tr><th></th><th>Under 30</th><th>30–50</th><th>Over 50</th><th>Total</th></tr><tr><td>Design A</td><td>28</td><td>35</td><td>17</td><td>80</td></tr><tr><td>Design B</td><td>12</td><td>25</td><td>33</td><td>70</td></tr><tr><td>Total</td><td>40</td><td>60</td><td>50</td><td>150</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the expected frequencies if preference is independent of age group.",
     "answer": "A: $21.33, 32, 26.67$; B: $18.67, 28, 23.33$",
     "ms": [
      "M1 row total $\\times$ column total $\\div 150$",
      "A1 row A",
      "A1 row B"
     ],
     "steps": [
      {
       "say": "Each expected frequency is row total times column total over 150.",
       "show": "$E = \\frac{80\\times40}{150} = 21.33$"
      },
      {
       "say": "Complete row A.",
       "show": "$21.33,\\ 32,\\ 26.67$"
      },
      {
       "say": "Row B is the column total minus row A.",
       "show": "$18.67,\\ 28,\\ 23.33$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Test, at the $5\\%$ level, whether preference is independent of age group.",
     "answer": "$\\chi^2 = 12.58 \\gt 5.991$: reject $H_0$",
     "ms": [
      "B1 $H_0$: preference independent of age group",
      "M1 $\\sum\\frac{(O-E)^2}{E}$",
      "A1 at least three contributions correct",
      "A1 $12.58$",
      "B1 $\\nu = (2-1)(3-1) = 2$, critical $5.991$",
      "A1 reject $H_0$: preference depends on age"
     ],
     "steps": [
      {
       "say": "State the hypotheses.",
       "show": "$H_0$: independent; $H_1$: not independent"
      },
      {
       "say": "Calculate each contribution: for example, 28 minus 21.33, squared, over 21.33 is 2.08.",
       "show": "$2.08,\\ 0.28,\\ 3.50,\\ 2.38,\\ 0.32,\\ 4.00$"
      },
      {
       "say": "Add.",
       "show": "$\\chi^2\\approx12.58$"
      },
      {
       "say": "There are 2 rows and 3 columns, so 2 degrees of freedom. No Yates correction is needed.",
       "show": "$\\nu = 2,\\ \\chi^2_2(0.05) = 5.991$"
      },
      {
       "say": "12.58 is much bigger than 5.991, so reject H nought.",
       "show": "Reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Comment on how preference appears to depend on age.",
     "answer": "Younger people favour A; over-50s favour B",
     "ms": [
      "B1 under 30 prefer A more than expected",
      "B1 over 50 prefer B more than expected"
     ],
     "steps": [
      {
       "say": "Under 30s chose A 28 times, more than the 21.33 expected.",
       "show": "$28 \\gt 21.33$"
      },
      {
       "say": "Over 50s chose B 33 times, more than the 23.33 expected.",
       "show": "$33\\gt23.33$"
      },
      {
       "say": "So younger people tend to prefer design A and older people design B.",
       "show": "Age-related preference"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 19,
   "points": [
    "f4_pie",
    "f4_rook"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b> (75 marks)<br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Use the principle of inclusion and exclusion to find the number of ways of giving $6$ different presents to $3$ children so that every child receives at least one present.",
     "answer": "$540$",
     "ms": [
      "B1 total $3^6 = 729$",
      "M1 subtract ways missing a child: $3\\times2^6$",
      "M1 add back ways missing two children: $3\\times1^6$",
      "A1 $540$"
     ],
     "steps": [
      {
       "say": "Without restriction, each present can go to any of 3 children.",
       "show": "$3^6 = 729$"
      },
      {
       "say": "Let A i be the set where child i gets nothing. Each has 2 to the 6 elements; each pair has 1.",
       "show": "$|A_i| = 64,\\ |A_i\\cap A_j| = 1,\\ |A_1\\cap A_2\\cap A_3| = 0$"
      },
      {
       "say": "Subtract by inclusion and exclusion.",
       "show": "$729 - 3(64) + 3(1) - 0 = 540$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Six guests leave their hats at a party and the hats are handed back at random. Find the number of ways in which (i) no guest gets their own hat, (ii) exactly two guests get their own hats.",
     "answer": "(i) $265$ (ii) $135$",
     "ms": [
      "M1 $D_6 = 6!\\sum_{k=0}^{6}\\frac{(-1)^k}{k!}$",
      "A1 $265$",
      "M1 $\\binom62 D_4$",
      "A1 $15\\times9 = 135$"
     ],
     "steps": [
      {
       "say": "The number of derangements of 6 objects.",
       "show": "$D_6 = 720\\left(1 - 1 + \\frac12 - \\frac16 + \\frac1{24} - \\frac1{120} + \\frac1{720}\\right) = 265$"
      },
      {
       "say": "For exactly two correct, choose which two guests are right, then derange the other four.",
       "show": "$\\binom62 D_4$"
      },
      {
       "say": "D 4 is 9.",
       "show": "$15\\times9 = 135$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 8,
     "q": "Four people $1$–$4$ are assigned to four tasks $a$–$d$, one each. The forbidden assignments are: person 1 to $a$ or $b$; person 2 to $b$; person 3 to $c$; person 4 to $c$ or $d$. (i) Find the rook polynomial of the board of forbidden squares. (ii) Hence find the number of allowed assignments.",
     "answer": "(i) $1 + 6x + 11x^2 + 6x^3 + x^4$ (ii) $5$",
     "ms": [
      "B1 board splits into two disjoint sub-boards (rows 1–2 / columns $a$–$b$ and rows 3–4 / columns $c$–$d$)",
      "M1 rook polynomial of one sub-board",
      "A1 $1 + 3x + x^2$",
      "M1 product rule for disjoint boards",
      "A1 $1+6x+11x^2+6x^3+x^4$",
      "M1 $\\sum(-1)^kr_k(4-k)!$",
      "A1 $24 - 36 + 22 - 6 + 1$",
      "A1 $5$"
     ],
     "steps": [
      {
       "say": "The forbidden squares split into two blocks that share no row or column: persons 1 and 2 with tasks a and b, and persons 3 and 4 with tasks c and d.",
       "show": "$B_1 = \\{1a, 1b, 2b\\},\\ B_2 = \\{3c, 4c, 4d\\}$"
      },
      {
       "say": "In B 1, one rook can go on any of 3 squares; two non-attacking rooks only on 1a and 2b.",
       "show": "$R(B_1) = 1 + 3x + x^2$"
      },
      {
       "say": "B 2 has the same shape. For disjoint boards, multiply the rook polynomials.",
       "show": "$R = (1+3x+x^2)^2 = 1 + 6x + 11x^2 + 6x^3 + x^4$"
      },
      {
       "say": "Count allowed permutations: the sum of minus 1 to the k, r k, times 4 minus k factorial.",
       "show": "$24 - 6(6) + 11(2) - 6(1) + 1(1)$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 5$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 20,
   "points": [
    "f4_match",
    "f4_col"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Five workers $A$–$E$ are to be matched to five jobs $1$–$5$. $A$ can do jobs 1 or 3; $B$: 1 or 2; $C$: 2 or 4; $D$: 3 or 5; $E$: 4 only. The initial matching is $A$–1, $B$–2, $C$–4, $D$–3. Find an alternating path starting from $E$, and hence a complete matching.",
     "answer": "$E$–4–$C$–2–$B$–1–$A$–3–$D$–5; matching $A$–3, $B$–1, $C$–2, $D$–5, $E$–4",
     "ms": [
      "M1 path starts at $E$ and alternates non-matching / matching edges",
      "A1 $E - 4 = C - 2 = B - 1$",
      "A1 continues $= A - 3 = D - 5$",
      "M1 change status of edges",
      "A1 four correct pairs",
      "A1 complete matching"
     ],
     "steps": [
      {
       "say": "E can only do job 4, which is held by C. C's other job is 2, held by B.",
       "show": "$E - 4 = C - 2 = B$"
      },
      {
       "say": "B's other job is 1, held by A. A's other job is 3, held by D. D's other job is 5, which is free.",
       "show": "$B - 1 = A - 3 = D - 5$"
      },
      {
       "say": "The full alternating path ends at an unmatched job, so the matching can be improved.",
       "show": "$E - 4 = C - 2 = B - 1 = A - 3 = D - 5$"
      },
      {
       "say": "Swap edges along the path: each worker moves to the next job.",
       "show": "$A$–3, $B$–1, $C$–2, $D$–5, $E$–4"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "State, with reasons, the chromatic index (edge chromatic number) of (i) $K_{3,3}$ (ii) $K_5$.",
     "answer": "(i) $3$ (ii) $5$",
     "ms": [
      "B1 $K_{3,3}$: every vertex has degree $3$ so at least $3$",
      "B1 three colours suffice (bipartite graph: index equals max degree), e.g. $a_ib_j$ coloured $i + j \\bmod 3$",
      "B1 $K_5$: $10$ edges, each colour class at most $2$ edges, so at least $5$",
      "B1 $5$ achievable, e.g. edge $ij$ coloured $i+j \\bmod 5$"
     ],
     "steps": [
      {
       "say": "In K 3 3, every vertex has degree 3, so at least 3 colours are needed.",
       "show": "$\\chi'(K_{3,3})\\ge3$"
      },
      {
       "say": "Label the parts a 0 to a 2 and b 0 to b 2, and colour edge a i b j with i plus j mod 3. Edges at any vertex get different colours.",
       "show": "$\\chi'(K_{3,3}) = 3$"
      },
      {
       "say": "K 5 has 10 edges. A colour class is a matching, which in 5 vertices has at most 2 edges, so we need at least 5 colours.",
       "show": "$\\chi'(K_5)\\ge\\frac{10}{2} = 5$"
      },
      {
       "say": "Colouring edge i j with i plus j mod 5 works, so the index is 5.",
       "show": "$\\chi'(K_5) = 5$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 21,
   "points": [
    "f4_flow"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>A pipe network has source $S$ and sink $T$. The arcs and capacities (litres per second) are: $SA$ 10, $SB$ 8, $AB$ 4, $AC$ 6, $BD$ 9, $DC$ 3, $CT$ 8, $DT$ 6.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the capacities of the cuts $\\{S, A, B\\}\\mid\\{C, D, T\\}$ and $\\{S, A, B, C, D\\}\\mid\\{T\\}$.",
     "answer": "$15$ and $14$",
     "ms": [
      "M1 arcs from source side to sink side only",
      "A1 $AC + BD = 15$",
      "A1 $CT + DT = 14$"
     ],
     "steps": [
      {
       "say": "For the first cut, the arcs leaving S, A, B into the other side are A C and B D.",
       "show": "$6 + 9 = 15$"
      },
      {
       "say": "For the second cut, the arcs into T are C T and D T.",
       "show": "$8 + 6 = 14$"
      },
      {
       "say": "Only arcs pointing from the source side to the sink side count.",
       "show": "Cut capacities $15$ and $14$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find a flow of $14$ litres per second through the network.",
     "answer": "e.g. $SA$ 6, $SB$ 8, $AC$ 6, $BD$ 8, $DC$ 2, $CT$ 8, $DT$ 6",
     "ms": [
      "M1 flow conserved at every intermediate vertex",
      "A1 within capacities",
      "A1 value $14$"
     ],
     "steps": [
      {
       "say": "Fill C T and D T, which need 8 into C and 8 into D.",
       "show": "$CT = 8,\\ DT = 6,\\ DC = 2$"
      },
      {
       "say": "C gets 6 from A and 2 from D. D gets 8 from B.",
       "show": "$AC = 6,\\ BD = 8$"
      },
      {
       "say": "So S sends 6 to A and 8 to B.",
       "show": "$SA = 6,\\ SB = 8$: value $14$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 1,
     "q": "Explain why this flow is maximal.",
     "answer": "It equals the capacity of a cut",
     "ms": [
      "B1 flow $14$ = cut capacity $14$, so maximal by max-flow min-cut"
     ],
     "steps": [
      {
       "say": "Any flow is at most the capacity of any cut.",
       "show": "$\\text{flow}\\le14$"
      },
      {
       "say": "Our flow equals 14.",
       "show": "$14 = 14$"
      },
      {
       "say": "By the max-flow min-cut theorem it is a maximum flow.",
       "show": "Maximal"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "The capacity of $CT$ is increased to $10$. Find the new maximum flow, justifying your answer.",
     "answer": "$15$",
     "ms": [
      "B1 cut $\\{S, A, B\\}$ still has capacity $15$",
      "M1 a flow of $15$, e.g. $SA$ 7, $AB$ 1, $AC$ 6, $SB$ 8, $BD$ 9, $DC$ 3, $DT$ 6, $CT$ 9",
      "A1 maximum $15$"
     ],
     "steps": [
      {
       "say": "The cut separating S, A and B still has capacity 15, so the flow cannot exceed 15.",
       "show": "$\\text{flow}\\le15$"
      },
      {
       "say": "Send 9 along B D, using 8 from S and 1 from A. D splits 3 to C and 6 to T. C gets 6 from A plus 3, sending 9 to T.",
       "show": "$BD = 9,\\ DC = 3,\\ DT = 6,\\ AC = 6,\\ CT = 9$"
      },
      {
       "say": "S sends 7 to A and 8 to B. The value is 15, equal to the cut, so it is maximal.",
       "show": "Maximum flow $15$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 22,
   "points": [
    "f4_pert"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Times are in weeks.<br><table class=\"data\"><tr><th>Activity</th><th>Preceded by</th><th>a</th><th>m</th><th>b</th></tr><tr><td>A</td><td>–</td><td>3</td><td>5</td><td>7</td></tr><tr><td>B</td><td>–</td><td>2</td><td>6</td><td>10</td></tr><tr><td>C</td><td>A</td><td>4</td><td>6</td><td>14</td></tr><tr><td>D</td><td>A</td><td>2</td><td>3</td><td>4</td></tr><tr><td>E</td><td>B, D</td><td>5</td><td>7</td><td>9</td></tr><tr><td>F</td><td>C</td><td>1</td><td>2</td><td>3</td></tr><tr><td>G</td><td>E, F</td><td>2</td><td>4</td><td>6</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Calculate the expected duration of each activity.",
     "answer": "A 5, B 6, C 7, D 3, E 7, F 2, G 4",
     "ms": [
      "M1 $\\frac{a+4m+b}{6}$",
      "A1 all correct"
     ],
     "steps": [
      {
       "say": "Use the PERT estimate.",
       "show": "$t_e = \\frac{a+4m+b}{6}$"
      },
      {
       "say": "For example, C is 4 plus 24 plus 14, over 6, which is 7.",
       "show": "$t_C = 7$"
      },
      {
       "say": "The rest.",
       "show": "A 5, B 6, C 7, D 3, E 7, F 2, G 4"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the critical path and the expected project duration.",
     "answer": "$A$–$D$–$E$–$G$, $19$ weeks",
     "ms": [
      "M1 forward pass",
      "A1 $19$ weeks",
      "A1 $ADEG$"
     ],
     "steps": [
      {
       "say": "Forward pass: A ends 5, B 6, C 12, D 8. E starts at the later of 6 and 8, ending at 15. F ends at 14.",
       "show": "$E: 8\\to15,\\ F: 12\\to14$"
      },
      {
       "say": "G starts at the later of 15 and 14, so the project ends at 19.",
       "show": "Duration $19$ weeks"
      },
      {
       "say": "The path with zero float is A, D, E, G.",
       "show": "Critical path $A$–$D$–$E$–$G$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Estimate the probability that the project is completed within $21$ weeks.",
     "answer": "$0.952$",
     "ms": [
      "M1 variances $\\left(\\frac{b-a}{6}\\right)^2$ on the critical path",
      "A1 $\\frac49 + \\frac19 + \\frac49 + \\frac49 = \\frac{13}{9}$",
      "M1 $P\\left(Z \\lt \\frac{2}{\\sqrt{13/9}}\\right)$",
      "A1 $0.952$"
     ],
     "steps": [
      {
       "say": "Add the variances along the critical path.",
       "show": "$\\frac{16}{36}+\\frac{4}{36}+\\frac{16}{36}+\\frac{16}{36} = \\frac{13}{9}$"
      },
      {
       "say": "The standard deviation is about 1.202.",
       "show": "$\\sigma\\approx1.202$"
      },
      {
       "say": "Standardise.",
       "show": "$P(T\\le21) = P\\left(Z\\le\\frac{2}{1.202}\\right) = P(Z\\le1.664)$"
      },
      {
       "say": "From tables.",
       "show": "$\\approx0.952$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the deadline that gives a $99\\%$ chance of completion, and give one criticism of this PERT analysis.",
     "answer": "$21.8$ weeks; e.g. near-critical path $ACFG$ (18 weeks) has large variance",
     "ms": [
      "M1 $19 + 2.326\\sigma$",
      "A1 $21.8$ weeks",
      "B1 valid criticism, e.g. path $ACFG$ is only 1 week shorter but has variance $\\frac{34}{9}$ so could become critical"
     ],
     "steps": [
      {
       "say": "Use the 99 percent point of the normal distribution, 2.326.",
       "show": "$19 + 2.326\\times1.202$"
      },
      {
       "say": "That is about 21.8 weeks.",
       "show": "$\\approx21.8$"
      },
      {
       "say": "PERT uses only the critical path. Path A C F G takes 18 weeks but activity C is very uncertain, so that path could easily take longer.",
       "show": "$\\text{Var}(ACFG) = \\frac{34}{9}$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 23,
   "points": [
    "f4_simplex"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Maximise $P = 2x + 3y$ subject to $$x + 2y\\le14,\\quad 3x + 2y \\le 18,\\quad x - y\\le 2,\\quad x, y\\ge0.$$",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Write down the initial simplex tableau, using slack variables $s_1$, $s_2$, $s_3$.",
     "answer": "See tableau",
     "ms": [
      "B1 three constraint rows",
      "B1 objective row $-2, -3$"
     ],
     "steps": [
      {
       "say": "Add a slack variable to each constraint.",
       "show": "$x+2y+s_1 = 14,\\ 3x+2y+s_2 = 18,\\ x-y+s_3 = 2$"
      },
      {
       "say": "Write P minus 2x minus 3y equals 0.",
       "show": "$P - 2x - 3y = 0$"
      },
      {
       "say": "The tableau.",
       "show": "$\\begin{array}{c|ccccc|c} & x & y & s_1 & s_2 & s_3 & \\\\ \\hline s_1 & 1 & 2 & 1 & 0 & 0 & 14\\\\ s_2 & 3 & 2 & 0 & 1 & 0 & 18\\\\ s_3 & 1 & -1 & 0 & 0 & 1 & 2\\\\ P & -2 & -3 & 0 & 0 & 0 & 0\\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Use the simplex algorithm to find the optimal solution, showing each tableau.",
     "answer": "Two iterations; final $P$ row $0, 0, 1.25, 0.25, 0\\mid22$",
     "ms": [
      "M1 pivot column $y$, ratios $7, 9$ (negative entry ignored)",
      "A1 pivot on $s_1$ row",
      "A1 first tableau with $P$ row $-\\frac12, 0, \\frac32, 0, 0\\mid21$",
      "M1 second pivot column $x$, ratios $14, 2, 6$",
      "A1 pivot on $s_2$ row",
      "A1 rows: $y$: $0,1,\\frac34,-\\frac14,0\\mid6$; $x$: $1,0,-\\frac12,\\frac12,0\\mid2$; $s_3$: $0,0,\\frac54,-\\frac34,1\\mid6$",
      "A1 $P$ row $0,0,\\frac54,\\frac14,0\\mid22$, optimal"
     ],
     "steps": [
      {
       "say": "The most negative entry is minus 3 in the y column. Ratios: 14 over 2 is 7, 18 over 2 is 9; the third row has a negative entry so is ignored. Pivot on row 1.",
       "show": "Pivot: $s_1$ row, $y$ column"
      },
      {
       "say": "Divide row 1 by 2 and clear the y column.",
       "show": "$\\begin{array}{c|ccccc|c} y & \\frac12 & 1 & \\frac12 & 0 & 0 & 7\\\\ s_2 & 2 & 0 & -1 & 1 & 0 & 4\\\\ s_3 & \\frac32 & 0 & \\frac12 & 0 & 1 & 9\\\\ P & -\\frac12 & 0 & \\frac32 & 0 & 0 & 21\\end{array}$"
      },
      {
       "say": "Now the x column has minus a half. Ratios: 14, 2 and 6. Pivot on the s 2 row.",
       "show": "Pivot: $s_2$ row, $x$ column"
      },
      {
       "say": "Divide that row by 2 and clear the x column.",
       "show": "$\\begin{array}{c|ccccc|c} y & 0 & 1 & \\frac34 & -\\frac14 & 0 & 6\\\\ x & 1 & 0 & -\\frac12 & \\frac12 & 0 & 2\\\\ s_3 & 0 & 0 & \\frac54 & -\\frac34 & 1 & 6\\\\ P & 0 & 0 & \\frac54 & \\frac14 & 0 & 22\\end{array}$"
      },
      {
       "say": "No negative entries remain in the objective row, so this is optimal.",
       "show": "Optimal"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "State the optimal solution and interpret the value of $s_3$.",
     "answer": "$x = 2$, $y = 6$, $P = 22$; $s_3 = 6$: third constraint has slack 6",
     "ms": [
      "B1 $x = 2$, $y = 6$",
      "B1 $P = 22$",
      "B1 $s_3 = 6$ means $x - y$ is $6$ below its limit (constraint not binding)"
     ],
     "steps": [
      {
       "say": "Read off the basic variables.",
       "show": "$x = 2,\\ y = 6$"
      },
      {
       "say": "The maximum value.",
       "show": "$P = 22$"
      },
      {
       "say": "s 3 equals 6, so x minus y is minus 4, which is 6 less than the limit of 2. That constraint is not binding.",
       "show": "$x - y = -4 = 2 - 6$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 24,
   "points": [
    "f4_gf",
    "f4_sym",
    "f4_polya"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "By considering the coefficient of $x^n$ in $(1+x)^{2n} = (1+x)^n(1+x)^n$, prove that $\\displaystyle\\sum_{r=0}^{n}\\binom nr^2 = \\binom{2n}{n}$.",
     "answer": "Proved.",
     "ms": [
      "B1 coefficient of $x^n$ on the left is $\\binom{2n}{n}$",
      "M1 on the right, sum of products $\\binom nr\\binom n{n-r}$",
      "M1 use $\\binom n{n-r} = \\binom nr$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "On the left, the coefficient of x to the n is 2n choose n.",
       "show": "$[x^n](1+x)^{2n} = \\binom{2n}{n}$"
      },
      {
       "say": "On the right, an x to the n term is formed by x to the r from the first bracket and x to the n minus r from the second.",
       "show": "$[x^n](1+x)^n(1+x)^n = \\sum_{r=0}^n\\binom nr\\binom n{n-r}$"
      },
      {
       "say": "By symmetry n choose n minus r equals n choose r.",
       "show": "$\\sum_{r=0}^n\\binom nr^2 = \\binom{2n}{n}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "The rotation group of a regular tetrahedron, acting on its four vertices, has cycle index $$P_G = \\frac{1}{12}\\left(x_1^4 + 8x_1x_3 + 3x_2^2\\right).$$ Explain the origin of each term.",
     "answer": "Identity; 8 rotations about vertex–face axes; 3 half-turns about edge-midpoint axes",
     "ms": [
      "B1 $12$ rotations in total",
      "B1 identity: $x_1^4$",
      "B1 $8$ rotations of $\\pm120°$ about the $4$ axes through a vertex and the centre of the opposite face, each fixing one vertex and 3-cycling the rest: $x_1x_3$",
      "B1 $3$ half-turns about axes through midpoints of opposite edges, swapping two pairs: $x_2^2$"
     ],
     "steps": [
      {
       "say": "The rotation group has 12 elements. The identity leaves all four vertices fixed.",
       "show": "$x_1^4$"
      },
      {
       "say": "There are 4 axes through a vertex and the centre of the opposite face. Turning by 120 or 240 degrees fixes that vertex and cycles the other three: 8 rotations.",
       "show": "$8x_1x_3$"
      },
      {
       "say": "There are 3 axes through midpoints of opposite edges. A half-turn swaps two pairs of vertices.",
       "show": "$3x_2^2$"
      },
      {
       "say": "Dividing by 12 averages over the group.",
       "show": "$\\frac{1}{12}(1 + 8 + 3) = 1$ check"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the number of distinct colourings of the vertices of the tetrahedron, up to rotation, using (i) two colours (ii) three colours.",
     "answer": "(i) $5$ (ii) $15$",
     "ms": [
      "M1 substitute $x_i = 2$",
      "A1 $5$",
      "M1 substitute $x_i = 3$",
      "A1 $15$"
     ],
     "steps": [
      {
       "say": "With 2 colours, put every x i equal to 2.",
       "show": "$\\frac{1}{12}(16 + 8\\cdot4 + 3\\cdot4) = \\frac{60}{12} = 5$"
      },
      {
       "say": "These are: all black, three black, two black, one black, all white.",
       "show": "5 colourings"
      },
      {
       "say": "With 3 colours, put every x i equal to 3.",
       "show": "$\\frac{1}{12}(81 + 8\\cdot9 + 3\\cdot9) = \\frac{180}{12} = 15$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Use the pattern inventory to find the number of distinct colourings with exactly two black and two white vertices.",
     "answer": "$1$",
     "ms": [
      "M1 $P_G(b+w, b^2+w^2, b^3+w^3)$",
      "M1 coefficient of $b^2w^2$: $6$, $0$, $2$ from the three terms",
      "A1 $\\frac{6 + 0 + 3\\times2}{12} = 1$"
     ],
     "steps": [
      {
       "say": "Replace x 1 by b plus w, x 2 by b squared plus w squared, and x 3 by b cubed plus w cubed.",
       "show": "$\\frac1{12}\\big[(b+w)^4 + 8(b+w)(b^3+w^3) + 3(b^2+w^2)^2\\big]$"
      },
      {
       "say": "Find the coefficient of b squared w squared in each term: 6 from the first, none from the second, and 2 from the third.",
       "show": "$6,\\ 0,\\ 2$"
      },
      {
       "say": "Combine.",
       "show": "$\\frac{6 + 0 + 6}{12} = 1$"
      }
     ]
    }
   ],
   "section": "D"
  }
 ],
 "sections": [
  {
   "id": "A",
   "title": "Section A: Mechanics 1",
   "marks": 75
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 75
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 75
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 75
  }
 ],
 "choose": {
  "count": 2,
  "routes": [
   [
    "A",
    "B"
   ],
   [
    "A",
    "C"
   ],
   [
    "A",
    "D"
   ],
   [
    "C",
    "D"
   ]
  ],
  "note": "Answer two sections: A and B, A and C, A and D, or C and D."
 }
});
BCSP.add({
 "id": "f4-hard",
 "unit": "f4",
 "level": "hard",
 "title": "Further Maths A2 2 · Paper C (Hard)",
 "minutes": 135,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f4_elosc",
    "f4_shm"
   ],
   "q": "Answer the questions in <b>two</b> sections only: A and B, A and C, A and D, or C and D. Each section carries 75 marks, so your paper is out of 150. Take $g = 9.8$ m s$^{-2}$.<br><b>Section A · Mechanics 1</b> (75 marks)<br>Two fixed points $A$ and $B$ are $2.0$ m apart on a smooth horizontal table. A particle $P$ of mass $0.5$ kg is attached to $A$ by a light elastic string of natural length $0.6$ m and modulus $15$ N, and to $B$ by a light elastic string of natural length $0.8$ m and modulus $20$ N. $P$ moves along the line $AB$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the distance $AP$ when $P$ is in equilibrium.",
     "answer": "$0.9$ m",
     "ms": [
      "M1 Hooke's law for both strings",
      "A1 $25e_1 = 25e_2$",
      "M1 $e_1 + e_2 = 0.6$",
      "A1 $AP = 0.9$ m"
     ],
     "steps": [
      {
       "say": "Let the extensions be e 1 in AP and e 2 in PB. Hooke's law gives each tension.",
       "show": "$T_1 = \\frac{15e_1}{0.6} = 25e_1,\\quad T_2 = \\frac{20e_2}{0.8} = 25e_2$"
      },
      {
       "say": "In equilibrium the tensions are equal, so the extensions are equal.",
       "show": "$e_1 = e_2$"
      },
      {
       "say": "The total length is 2.0 metres, and the natural lengths add to 1.4, so the extensions add to 0.6.",
       "show": "$e_1 + e_2 = 0.6 \\Rightarrow e_1 = e_2 = 0.3$"
      },
      {
       "say": "So AP is 0.6 plus 0.3.",
       "show": "$AP = 0.9$ m"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "$P$ is displaced $x$ m from its equilibrium position towards $B$, where $|x| \\lt 0.3$. Show that $P$ moves with simple harmonic motion and state its period.",
     "answer": "$\\ddot x = -100x$; period $\\frac{\\pi}{5}$ s",
     "ms": [
      "M1 tensions $25(0.3+x)$ and $25(0.3-x)$",
      "M1 equation of motion",
      "A1 $0.5\\ddot x = -50x$",
      "A1 $\\ddot x = -100x$, period $\\frac{2\\pi}{10}$"
     ],
     "steps": [
      {
       "say": "Moving x towards B stretches AP by x more and shortens the extension of PB by x. Both stay taut while x is less than 0.3 in size.",
       "show": "$T_{AP} = 25(0.3 + x),\\quad T_{PB} = 25(0.3 - x)$"
      },
      {
       "say": "Newton's second law towards B.",
       "show": "$0.5\\ddot x = 25(0.3 - x) - 25(0.3 + x) = -50x$"
      },
      {
       "say": "Divide by 0.5.",
       "show": "$\\ddot x = -100x$"
      },
      {
       "say": "This is SHM with omega equal to 10, so the period is pi over 5.",
       "show": "$T = \\frac{2\\pi}{10} = \\frac{\\pi}{5}\\approx0.628$ s"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "$P$ is released from rest $0.2$ m from equilibrium. Find its maximum speed.",
     "answer": "$2$ m s$^{-1}$",
     "ms": [
      "M1 $a\\omega$ with $a = 0.2$ (both strings taut throughout)",
      "A1 $2$ m s$^{-1}$"
     ],
     "steps": [
      {
       "say": "The amplitude 0.2 is less than 0.3, so both strings stay taut and the motion is SHM throughout.",
       "show": "$a = 0.2 \\lt 0.3$"
      },
      {
       "say": "Maximum speed is a omega.",
       "show": "$v_{\\max} = 0.2\\times10$"
      },
      {
       "say": "So 2 metres per second.",
       "show": "$2$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Instead, $P$ is released from rest at the point $0.4$ m from equilibrium towards $B$. Find the speed of $P$ when string $PB$ first becomes taut.",
     "answer": "$2.55$ m s$^{-1}$",
     "ms": [
      "M1 with $PB$ slack, $0.5\\ddot x = -25(0.3+x)$",
      "M1 SHM about $x = -0.3$, $\\omega^2 = 50$, amplitude $0.7$",
      "A1 at $x = 0.3$: $v = \\sqrt{50(0.49 - 0.36)} = 2.55$"
     ],
     "steps": [
      {
       "say": "At x equals 0.4, PB is slack, since its extension would be negative. Only AP acts.",
       "show": "$0.5\\ddot x = -25(0.3 + x) \\Rightarrow \\ddot y = -50y,\\ y = x + 0.3$"
      },
      {
       "say": "This is SHM about the point y equals 0, with omega squared 50. It starts at rest at y equals 0.7, so the amplitude is 0.7.",
       "show": "$a = 0.7$"
      },
      {
       "say": "PB becomes taut at x equals 0.3, which is y equals 0.6.",
       "show": "$v^2 = 50(0.7^2 - 0.6^2) = 6.5$"
      },
      {
       "say": "So the speed is about 2.55 metres per second.",
       "show": "$v\\approx2.55$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "Find the speed of $P$ as it passes through the equilibrium position in this motion.",
     "answer": "$3.94$ m s$^{-1}$",
     "ms": [
      "M1 new SHM with $\\omega = 10$ from $x = 0.3$, $v^2 = 6.5$",
      "M1 $a^2 = 0.3^2 + \\frac{6.5}{100}$",
      "A1 $v = 10\\sqrt{0.155} = 3.94$"
     ],
     "steps": [
      {
       "say": "Once both strings are taut, the SHM of part b applies, with omega equal to 10.",
       "show": "$v^2 = 100(a^2 - x^2)$"
      },
      {
       "say": "Use x equals 0.3 and v squared equals 6.5 to find the new amplitude.",
       "show": "$a^2 = 0.09 + 0.065 = 0.155$"
      },
      {
       "say": "At equilibrium, x is 0.",
       "show": "$v = 10\\sqrt{0.155}\\approx3.94$ m s$^{-1}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f4_pend"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Show that if the length of a simple pendulum is increased by a small fraction $k$, its period increases by approximately the fraction $\\frac12k$.",
     "answer": "$T' \\approx T(1 + \\tfrac12k)$",
     "ms": [
      "M1 $T' = 2\\pi\\sqrt{\\frac{l(1+k)}{g}}$",
      "M1 binomial: $(1+k)^{1/2}\\approx1+\\frac12k$",
      "A1 result"
     ],
     "steps": [
      {
       "say": "The new period uses length l times 1 plus k.",
       "show": "$T' = 2\\pi\\sqrt{\\frac{l(1+k)}{g}} = T(1+k)^{1/2}$"
      },
      {
       "say": "For small k, use the binomial approximation.",
       "show": "$(1+k)^{1/2}\\approx1 + \\frac12k$"
      },
      {
       "say": "So the period increases by about half the fraction.",
       "show": "$T'\\approx T\\left(1 + \\frac12k\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "A pendulum clock, designed as a seconds pendulum, is found to lose $30$ s per day. By what percentage must the length of the pendulum be changed so that it keeps correct time? State whether it should be lengthened or shortened.",
     "answer": "Shortened by about $0.069\\%$",
     "ms": [
      "M1 clock records $86370$ s in a real day",
      "M1 $\\frac{T_{\\text{actual}}}{2} = \\frac{86400}{86370}$",
      "M1 $l\\propto T^2$",
      "A1 new length factor $\\left(\\frac{86370}{86400}\\right)^2 = 0.999306$",
      "A1 shorten by $0.069\\%$"
     ],
     "steps": [
      {
       "say": "Losing 30 seconds means that in a real day of 86400 seconds the clock counts only 86370 seconds. Its period is too long.",
       "show": "$\\frac{T}{2} = \\frac{86400}{86370}$"
      },
      {
       "say": "The period must be reduced by the factor 86370 over 86400.",
       "show": "$T_{\\text{new}} = T\\times\\frac{86370}{86400}$"
      },
      {
       "say": "Length is proportional to the period squared.",
       "show": "$\\frac{l_{\\text{new}}}{l} = \\left(\\frac{86370}{86400}\\right)^2 \\approx 0.999306$"
      },
      {
       "say": "So the pendulum should be shortened by about 0.069 percent.",
       "show": "$\\approx0.069\\%$ shorter"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f4_damp"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A particle of mass $1$ kg is attached to a spring, which exerts a restoring force of $6x$ N when the extension is $x$ m. The particle moves in a horizontal line through a fluid that exerts a resistance of $5v$ N. Initially the particle is at its equilibrium position and is given a speed of $2$ m s$^{-1}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Show that $\\ddot x + 5\\dot x + 6x = 0$, and explain why the motion is heavily damped.",
     "answer": "Shown; discriminant $25 - 24 \\gt 0$",
     "ms": [
      "M1 Newton's second law with both forces opposing motion",
      "A1 equation shown",
      "B1 discriminant positive so heavily damped (no oscillation)"
     ],
     "steps": [
      {
       "say": "Both the spring force and the resistance oppose positive x and positive velocity.",
       "show": "$1\\cdot\\ddot x = -6x - 5\\dot x$"
      },
      {
       "say": "Rearrange.",
       "show": "$\\ddot x + 5\\dot x + 6x = 0$"
      },
      {
       "say": "The auxiliary equation has discriminant 25 minus 24, which is positive: two real roots, so the motion is heavily damped.",
       "show": "$m^2 + 5m + 6 = 0$, $\\Delta = 1 \\gt 0$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find $x$ in terms of $t$.",
     "answer": "$x = 2(e^{-2t} - e^{-3t})$",
     "ms": [
      "M1 roots $-2$ and $-3$",
      "A1 $x = Ae^{-2t} + Be^{-3t}$",
      "M1 $A + B = 0$",
      "M1 $-2A - 3B = 2$",
      "A1 $A = 2$, $B = -2$"
     ],
     "steps": [
      {
       "say": "Factorise the auxiliary equation.",
       "show": "$(m+2)(m+3) = 0$"
      },
      {
       "say": "So the general solution is a sum of two decaying exponentials.",
       "show": "$x = Ae^{-2t} + Be^{-3t}$"
      },
      {
       "say": "At t equals 0, x is 0.",
       "show": "$A + B = 0$"
      },
      {
       "say": "At t equals 0, the velocity is 2.",
       "show": "$-2A - 3B = 2 \\Rightarrow A = 2,\\ B = -2$"
      },
      {
       "say": "So the solution is",
       "show": "$x = 2(e^{-2t} - e^{-3t})$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the greatest displacement of the particle from equilibrium and the time at which it occurs.",
     "answer": "$\\frac{8}{27}$ m at $t = \\ln1.5 \\approx 0.405$ s",
     "ms": [
      "M1 $\\dot x = -4e^{-2t} + 6e^{-3t} = 0$",
      "A1 $e^{-t} = \\frac23$, $t = \\ln\\frac32$",
      "M1 substitute",
      "A1 $\\frac{8}{27}$"
     ],
     "steps": [
      {
       "say": "Differentiate and set the velocity to zero.",
       "show": "$\\dot x = -4e^{-2t} + 6e^{-3t} = 0$"
      },
      {
       "say": "Divide by 2 e to the minus 3t.",
       "show": "$-2e^{t} + 3 = 0 \\Rightarrow e^{-t} = \\frac23,\\ t = \\ln1.5\\approx0.405$ s"
      },
      {
       "say": "Substitute: e to the minus 2t is four ninths and e to the minus 3t is eight twenty-sevenths.",
       "show": "$x = 2\\left(\\frac49 - \\frac{8}{27}\\right) = \\frac{8}{27}\\approx0.296$ m"
      }
     ]
    },
    {
     "l": "d",
     "marks": 1,
     "q": "Describe the motion for large $t$.",
     "answer": "Returns towards equilibrium without passing through it",
     "ms": [
      "B1 $x\\to0$ from above; never passes through equilibrium again"
     ],
     "steps": [
      {
       "say": "Both exponentials decay, and the e to the minus 2t term dominates.",
       "show": "$x\\approx2e^{-2t}$"
      },
      {
       "say": "So x stays positive and tends to zero.",
       "show": "$x\\to0^+$"
      },
      {
       "say": "The particle creeps back towards equilibrium without passing through it.",
       "show": "No oscillation"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f4_lam",
    "f4_susp",
    "f4_com1"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "A uniform circular disc has centre $O$ and radius $6$ cm. A circular hole of radius $2$ cm, centred at the point $(3, 0)$, is cut from it, with $O$ as origin. Find the centre of mass of the remaining lamina.",
     "answer": "$(-0.375,\\ 0)$",
     "ms": [
      "B1 areas $36\\pi$, $4\\pi$, $32\\pi$",
      "M1 moments: $36\\pi(0) = 4\\pi(3) + 32\\pi\\bar x$",
      "A1 $\\bar x = -0.375$",
      "B1 $\\bar y = 0$ by symmetry"
     ],
     "steps": [
      {
       "say": "Mass is proportional to area. The disc has area 36 pi, the hole 4 pi, so the remainder is 32 pi.",
       "show": "$36\\pi,\\ 4\\pi,\\ 32\\pi$"
      },
      {
       "say": "The disc's centre is at O, so its moment is zero. It equals the moment of the hole plus that of the remainder.",
       "show": "$0 = 4\\pi(3) + 32\\pi\\bar x$"
      },
      {
       "say": "Solve; y bar is 0 by symmetry about the x-axis.",
       "show": "$\\bar x = -\\frac{12}{32} = -0.375,\\quad\\bar y = 0$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "A particle is fixed to the rim of the lamina at $(6, 0)$ so that the centre of mass of the combined body is at $O$. Find the mass of the particle as a fraction of the mass of the lamina.",
     "answer": "$\\frac1{16}$",
     "ms": [
      "M1 $M(-0.375) + m(6) = 0$",
      "A1 ratio",
      "A1 $\\frac{1}{16}$"
     ],
     "steps": [
      {
       "say": "Let the lamina have mass M and the particle mass m. The combined centre is at O, so moments about O balance.",
       "show": "$M(-0.375) + m(6) = 0$"
      },
      {
       "say": "Rearrange.",
       "show": "$\\frac mM = \\frac{0.375}{6}$"
      },
      {
       "say": "So the particle is one sixteenth of the lamina's mass.",
       "show": "$\\frac{1}{16}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Without the particle, the lamina is freely suspended from the point $(0, 6)$ on its rim. Find the angle between the vertical and the line from the point of suspension to $O$.",
     "answer": "$3.58°$",
     "ms": [
      "M1 $G$ vertically below the point of suspension",
      "M1 $\\tan\\alpha = \\frac{0.375}{6}$",
      "A1 $3.58°$"
     ],
     "steps": [
      {
       "say": "G hangs directly below the point of suspension, which is 6 cm above O.",
       "show": "$S = (0,6),\\ G = (-0.375, 0)$"
      },
      {
       "say": "The angle between S O, which is along the y-axis, and S G has tangent 0.375 over 6.",
       "show": "$\\tan\\alpha = \\frac{0.375}{6}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\alpha\\approx3.58°$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "A uniform wire is bent into the shape of a triangle with vertices $(0,0)$, $(4,0)$ and $(0,3)$. Find the centre of mass of the wire frame.",
     "answer": "$(1.5,\\ 1)$",
     "ms": [
      "B1 sides of lengths $4$, $3$, $5$",
      "B1 midpoints $(2,0)$, $(0,1.5)$, $(2,1.5)$",
      "M1 weighted average by length",
      "A1 $(1.5, 1)$"
     ],
     "steps": [
      {
       "say": "Each side is a uniform rod with mass proportional to its length, and its centre at its midpoint.",
       "show": "$4$ at $(2,0)$; $3$ at $(0, 1.5)$; $5$ at $(2, 1.5)$"
      },
      {
       "say": "Total length 12. Moments about the y-axis.",
       "show": "$12\\bar x = 4(2) + 0 + 5(2) = 18 \\Rightarrow \\bar x = 1.5$"
      },
      {
       "say": "Moments about the x-axis.",
       "show": "$12\\bar y = 0 + 3(1.5) + 5(1.5) = 12\\Rightarrow\\bar y = 1$"
      },
      {
       "say": "Note this is not the same as the centroid of a triangular lamina, which would be four thirds, 1.",
       "show": "$(1.5, 1)$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f4_frame"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A light framework is made of seven rods, each of length $2$ m, smoothly jointed at $A(0,0)$, $B(2,0)$, $C(4,0)$, $D(1,\\sqrt3)$ and $E(3,\\sqrt3)$, in metres. The rods are $AB$, $BC$, $AD$, $BD$, $BE$, $CE$ and $DE$. The framework is in a vertical plane, smoothly pinned at $A$ and resting on a smooth roller at $C$ (vertical reaction). A load of $60$ N hangs from $E$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the reactions at $A$ and $C$.",
     "answer": "$R_A = 15$ N, $R_C = 45$ N, both vertical",
     "ms": [
      "M1 moments about $A$",
      "A1 $R_C = 45$",
      "A1 $R_A = 15$ (no horizontal component)"
     ],
     "steps": [
      {
       "say": "Take moments about A. The load at E has horizontal distance 3 from A.",
       "show": "$4R_C = 60\\times3 \\Rightarrow R_C = 45$ N"
      },
      {
       "say": "Resolve vertically.",
       "show": "$R_A = 60 - 45 = 15$ N"
      },
      {
       "say": "There is no other horizontal force, so the reaction at A is vertical.",
       "show": "$H_A = 0$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the forces in $CE$ and $BC$, stating whether each is a tension or a thrust.",
     "answer": "$CE$: thrust $30\\sqrt3\\approx52.0$ N; $BC$: tension $15\\sqrt3\\approx26.0$ N",
     "ms": [
      "M1 resolve vertically at $C$",
      "A1 $T_{CE} = -30\\sqrt3$, thrust",
      "M1 resolve horizontally at $C$",
      "A1 $T_{BC} = 15\\sqrt3$, tension"
     ],
     "steps": [
      {
       "say": "At C, rod CE points up and to the left at 60 degrees to the horizontal. Resolve vertically, taking tensions away from C.",
       "show": "$45 + T_{CE}\\sin60° = 0 \\Rightarrow T_{CE} = -30\\sqrt3$"
      },
      {
       "say": "Negative means a thrust of about 52.0 newtons.",
       "show": "Thrust $52.0$ N"
      },
      {
       "say": "Resolve horizontally at C: rod BC points to the left.",
       "show": "$-T_{BC} - T_{CE}\\cos60° = 0 \\Rightarrow T_{BC} = 15\\sqrt3$"
      },
      {
       "say": "Positive, so BC is in tension, about 26.0 newtons.",
       "show": "Tension $26.0$ N"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "By considering the joints $A$ and $D$, find the force in $DE$, stating whether it is a tension or a thrust.",
     "answer": "$DE$: thrust $10\\sqrt3\\approx17.3$ N",
     "ms": [
      "M1 joint $A$ vertically: $15 + T_{AD}\\sin60° = 0$",
      "A1 $T_{AD} = -10\\sqrt3$",
      "M1 joint $D$ vertically gives $T_{BD} = -T_{AD} = 10\\sqrt3$",
      "M1 joint $D$ horizontally: $-T_{AD}\\cos60° + T_{BD}\\cos60° + T_{DE} = 0$",
      "A1 $T_{DE} = -10\\sqrt3$: thrust $17.3$ N"
     ],
     "steps": [
      {
       "say": "At A, resolve vertically. Rod AD points up at 60 degrees.",
       "show": "$15 + T_{AD}\\sin60° = 0 \\Rightarrow T_{AD} = -10\\sqrt3$"
      },
      {
       "say": "At D there is no load. Rod DA points down-left, DB down-right and DE to the right. Resolve vertically.",
       "show": "$-T_{AD}\\sin60° - T_{BD}\\sin60° = 0 \\Rightarrow T_{BD} = 10\\sqrt3$"
      },
      {
       "say": "Resolve horizontally at D.",
       "show": "$-\\frac12T_{AD} + \\frac12T_{BD} + T_{DE} = 0$"
      },
      {
       "say": "Substitute.",
       "show": "$5\\sqrt3 + 5\\sqrt3 + T_{DE} = 0 \\Rightarrow T_{DE} = -10\\sqrt3$"
      },
      {
       "say": "So DE is in compression: a thrust of about 17.3 newtons.",
       "show": "Thrust $17.3$ N"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 6,
   "points": [
    "f4_bank"
   ],
   "q": "<b>Section A · Mechanics 1</b><br>A car moves round a bend of radius $80$ m on a track banked at $30°$ to the horizontal. The coefficient of friction between the tyres and the track is $\\mu$. Model the car as a particle.",
   "parts": [
    {
     "l": "a",
     "marks": 8,
     "q": "Given that $\\mu = 0.25$, find the range of speeds at which the car can travel round the bend without slipping.",
     "answer": "$15.0 \\le v \\le 27.5$ m s$^{-1}$",
     "ms": [
      "M1 at minimum speed friction acts up the slope",
      "M1 both resolutions for the minimum",
      "A1 $v^2 = 80g\\frac{\\sin30° - 0.25\\cos30°}{\\cos30°+0.25\\sin30°}$",
      "A1 $v_{\\min} = 15.0$",
      "M1 at maximum speed friction acts down the slope",
      "M1 both resolutions for the maximum",
      "A1 $v^2 = 80g\\frac{\\sin30°+0.25\\cos30°}{\\cos30°-0.25\\sin30°}$",
      "A1 $v_{\\max} = 27.5$"
     ],
     "steps": [
      {
       "say": "At the lowest speed the car tends to slip down, so limiting friction acts up the slope.",
       "show": "$R\\cos30° + \\mu R\\sin30° = mg,\\quad R\\sin30° - \\mu R\\cos30° = \\frac{mv^2}{80}$"
      },
      {
       "say": "Divide to eliminate R and m.",
       "show": "$v_{\\min}^2 = 80g\\,\\frac{\\sin30°-0.25\\cos30°}{\\cos30°+0.25\\sin30°}\\Rightarrow v_{\\min}\\approx15.0$"
      },
      {
       "say": "At the highest speed the car tends to slip up, so friction acts down the slope.",
       "show": "$R\\cos30° - \\mu R\\sin30° = mg,\\quad R\\sin30° + \\mu R\\cos30° = \\frac{mv^2}{80}$"
      },
      {
       "say": "Divide again.",
       "show": "$v_{\\max}^2 = 80g\\,\\frac{\\sin30°+0.25\\cos30°}{\\cos30°-0.25\\sin30°}\\Rightarrow v_{\\max}\\approx27.5$"
      },
      {
       "say": "So the safe range is from about 15.0 to 27.5 metres per second.",
       "show": "$15.0\\le v\\le27.5$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Show that if $\\mu \\ge \\sqrt3$ there is no upper limit to the speed at which the car can travel round the bend without slipping.",
     "answer": "Shown: $\\cos30° - \\mu\\sin30° \\le 0$",
     "ms": [
      "M1 vertical equation $R(\\cos30° - \\mu\\sin30°) = mg$ at maximum speed",
      "M1 requires $\\cos30° - \\mu\\sin30° \\gt 0$ for a finite limiting speed",
      "A1 $\\mu \\ge \\cot30° = \\sqrt3$ makes this impossible",
      "A1 so friction never becomes limiting: no upper limit"
     ],
     "steps": [
      {
       "say": "For the limiting case at high speed, the vertical equation is R times cos 30 minus mu sin 30 equals mg.",
       "show": "$R(\\cos30° - \\mu\\sin30°) = mg$"
      },
      {
       "say": "Since R and mg are positive, a limiting speed exists only if the bracket is positive.",
       "show": "$\\cos30° - \\mu\\sin30°\\gt0 \\iff \\mu \\lt \\cot30°$"
      },
      {
       "say": "Cot 30 degrees is root 3.",
       "show": "$\\cot30° = \\sqrt3$"
      },
      {
       "say": "If mu is at least root 3, friction can never reach its limit going up the slope, so there is no maximum speed in this model.",
       "show": "No upper limit"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 7,
   "points": [
    "f4_kin3"
   ],
   "q": "<b>Section B · Mechanics 2</b> (75 marks)<br>A particle $P$ moves so that its position vector at time $t$ s is $\\mathbf r = \\cos2t\\,\\mathbf i + \\sin2t\\,\\mathbf j + t\\,\\mathbf k$ m.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Show that the speed of $P$ is constant.",
     "answer": "$\\sqrt5$ m s$^{-1}$",
     "ms": [
      "M1 $\\mathbf v = -2\\sin2t\\,\\mathbf i + 2\\cos2t\\,\\mathbf j + \\mathbf k$",
      "M1 $|\\mathbf v|^2 = 4\\sin^22t + 4\\cos^22t + 1$",
      "A1 $\\sqrt5$"
     ],
     "steps": [
      {
       "say": "Differentiate.",
       "show": "$\\mathbf v = -2\\sin2t\\,\\mathbf i + 2\\cos2t\\,\\mathbf j + \\mathbf k$"
      },
      {
       "say": "Find the speed squared.",
       "show": "$|\\mathbf v|^2 = 4(\\sin^22t + \\cos^22t) + 1 = 5$"
      },
      {
       "say": "So the speed is always root 5.",
       "show": "$|\\mathbf v| = \\sqrt5$ m s$^{-1}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Show that the acceleration of $P$ is always perpendicular to its velocity, and find its magnitude.",
     "answer": "$\\mathbf a\\cdot\\mathbf v = 0$; $|\\mathbf a| = 4$",
     "ms": [
      "M1 $\\mathbf a = -4\\cos2t\\,\\mathbf i - 4\\sin2t\\,\\mathbf j$",
      "M1 scalar product",
      "A1 $=0$",
      "A1 $|\\mathbf a| = 4$"
     ],
     "steps": [
      {
       "say": "Differentiate again.",
       "show": "$\\mathbf a = -4\\cos2t\\,\\mathbf i - 4\\sin2t\\,\\mathbf j$"
      },
      {
       "say": "Take the scalar product with v.",
       "show": "$\\mathbf a\\cdot\\mathbf v = 8\\sin2t\\cos2t - 8\\sin2t\\cos2t + 0 = 0$"
      },
      {
       "say": "So the acceleration is perpendicular to the velocity, as expected when the speed is constant.",
       "show": "Perpendicular"
      },
      {
       "say": "Its magnitude is 4.",
       "show": "$|\\mathbf a| = \\sqrt{16\\cos^22t+16\\sin^22t} = 4$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the distance travelled by $P$ between $t = 0$ and $t = \\pi$.",
     "answer": "$\\sqrt5\\,\\pi\\approx7.02$ m",
     "ms": [
      "M1 distance $= \\int|\\mathbf v|\\,dt$",
      "A1 $\\sqrt5\\pi$"
     ],
     "steps": [
      {
       "say": "Distance travelled is the integral of speed.",
       "show": "$\\int_0^\\pi\\sqrt5\\,dt$"
      },
      {
       "say": "The speed is constant.",
       "show": "$=\\sqrt5\\,\\pi$"
      },
      {
       "say": "That is about 7.02 metres.",
       "show": "$\\approx7.02$ m"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the values of $t$ in $0\\le t\\le\\pi$ at which the velocity of $P$ is perpendicular to $\\mathbf i + \\mathbf j$.",
     "answer": "$t = \\frac{\\pi}{8},\\ \\frac{5\\pi}{8}$",
     "ms": [
      "M1 $\\mathbf v\\cdot(\\mathbf i+\\mathbf j) = -2\\sin2t + 2\\cos2t = 0$",
      "A1 $\\tan2t = 1$",
      "A1 $t = \\frac\\pi8, \\frac{5\\pi}{8}$"
     ],
     "steps": [
      {
       "say": "Set the scalar product to zero.",
       "show": "$-2\\sin2t + 2\\cos2t = 0$"
      },
      {
       "say": "So tan 2t is 1.",
       "show": "$2t = \\frac\\pi4 + n\\pi$"
      },
      {
       "say": "In the range 0 to pi.",
       "show": "$t = \\frac\\pi8,\\ \\frac{5\\pi}{8}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f4_varacc"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A ball of mass $m$ is projected vertically upwards with speed $U$. Air resistance has magnitude $mkv^2$, where $v$ is the speed. Show that the greatest height reached is $\\dfrac{1}{2k}\\ln\\left(1 + \\dfrac{kU^2}{g}\\right)$.",
     "answer": "Shown.",
     "ms": [
      "M1 $mv\\frac{dv}{dx} = -mg - mkv^2$",
      "M1 separate: $\\int\\frac{v}{g+kv^2}dv = -\\int dx$",
      "A1 $\\frac{1}{2k}\\ln(g+kv^2) = -x + c$",
      "M1 use $v = U$ at $x = 0$",
      "M1 $v = 0$ at maximum height",
      "A1 result"
     ],
     "steps": [
      {
       "say": "On the way up, both gravity and resistance act downwards. Use v dv by dx.",
       "show": "$v\\frac{dv}{dx} = -(g + kv^2)$"
      },
      {
       "say": "Separate the variables.",
       "show": "$\\int\\frac{v\\,dv}{g+kv^2} = -\\int dx$"
      },
      {
       "say": "Integrate.",
       "show": "$\\frac1{2k}\\ln(g+kv^2) = -x + c$"
      },
      {
       "say": "At x equals 0, v is U. At the top, v is 0.",
       "show": "$H = \\frac1{2k}\\big[\\ln(g+kU^2) - \\ln g\\big]$"
      },
      {
       "say": "Combine the logs.",
       "show": "$H = \\frac{1}{2k}\\ln\\left(1 + \\frac{kU^2}{g}\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 8,
     "q": "A train of mass $2\\times10^5$ kg moves on a level track with its engine working at a constant $500$ kW. The resistance is $kv$ N, and the maximum speed is $50$ m s$^{-1}$. (i) Find $k$. (ii) Find the time taken for the speed to increase from $10$ to $20$ m s$^{-1}$. (iii) Find the distance travelled in this time.",
     "answer": "(i) $200$ (ii) $500\\ln\\frac87\\approx66.8$ s (iii) $\\approx1046$ m",
     "ms": [
      "B1 $k = \\frac{500000}{50^2} = 200$",
      "M1 $2\\times10^5\\frac{dv}{dt} = \\frac{500000}{v} - 200v$",
      "M1 $t = \\int_{10}^{20}\\frac{1000v}{2500 - v^2}dv$",
      "A1 $500\\ln\\frac{2400}{2100}$",
      "A1 $66.8$ s",
      "M1 $x = \\int_{10}^{20}\\frac{1000v^2}{2500-v^2}dv$",
      "M1 $\\frac{v^2}{2500-v^2} = -1 + \\frac{2500}{2500 - v^2}$ and partial fractions",
      "A1 $1046$ m"
     ],
     "steps": [
      {
       "say": "At maximum speed the driving force P over v equals the resistance.",
       "show": "$\\frac{500000}{50} = 50k \\Rightarrow k = 200$"
      },
      {
       "say": "Newton's second law, then divide by 200.",
       "show": "$1000\\frac{dv}{dt} = \\frac{2500 - v^2}{v}$"
      },
      {
       "say": "Separate and integrate for the time.",
       "show": "$t = \\int_{10}^{20}\\frac{1000v}{2500-v^2}dv = \\Big[-500\\ln(2500-v^2)\\Big]_{10}^{20} = 500\\ln\\frac{2400}{2100}$"
      },
      {
       "say": "So t is 500 ln of eight sevenths.",
       "show": "$t\\approx66.8$ s"
      },
      {
       "say": "For distance, use v dv by dx instead.",
       "show": "$x = \\int_{10}^{20}\\frac{1000v^2}{2500-v^2}dv = 1000\\Big[-v + 25\\ln\\frac{50+v}{50-v}\\Big]_{10}^{20}$"
      },
      {
       "say": "Evaluate.",
       "show": "$x = 1000\\left(-10 + 25\\ln\\frac{14}{9}\\right)\\approx1046$ m"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f4_comcal"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Prove, by integration, that the centre of mass of a uniform solid right circular cone of height $h$ and base radius $r$ is at a distance $\\frac h4$ from its base.",
     "answer": "Proved.",
     "ms": [
      "M1 cone as rotation of $y = \\frac rhx$, $0\\le x\\le h$, vertex at $O$",
      "M1 $\\bar x = \\frac{\\int\\pi y^2x\\,dx}{\\int\\pi y^2\\,dx}$",
      "A1 $\\int_0^h\\frac{r^2}{h^2}x^3\\,dx = \\frac{r^2h^2}{4}$",
      "A1 $\\int_0^h\\frac{r^2}{h^2}x^2\\,dx = \\frac{r^2h}{3}$",
      "A1 $\\bar x = \\frac{3h}{4}$ from the vertex",
      "B1 hence $\\frac h4$ from the base"
     ],
     "steps": [
      {
       "say": "Place the vertex at the origin with the axis along the x-axis, and rotate the line y equals r over h times x.",
       "show": "$y = \\frac rh x,\\ 0\\le x\\le h$"
      },
      {
       "say": "Slice into discs. By symmetry G lies on the axis.",
       "show": "$\\bar x = \\frac{\\int_0^h\\pi\\frac{r^2}{h^2}x^3\\,dx}{\\int_0^h\\pi\\frac{r^2}{h^2}x^2\\,dx}$"
      },
      {
       "say": "Integrate.",
       "show": "$\\bar x = \\frac{h^4/4}{h^3/3} = \\frac{3h}{4}$"
      },
      {
       "say": "That is measured from the vertex, so G is h over 4 from the base.",
       "show": "$h - \\frac{3h}{4} = \\frac h4$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "A uniform lamina occupies the region enclosed by the curve $y^2 = 4x$ and the line $x = 4$. Find its centre of mass.",
     "answer": "$(2.4,\\ 0)$",
     "ms": [
      "B1 $\\bar y = 0$ by symmetry",
      "M1 $\\bar x = \\frac{\\int_0^4x\\cdot4\\sqrt x\\,dx}{\\int_0^4 4\\sqrt x\\,dx}$",
      "A1 $2.4$"
     ],
     "steps": [
      {
       "say": "The region is symmetric about the x-axis, so y bar is 0. A vertical strip at x has length 2y, which is 4 root x.",
       "show": "strip length $= 4\\sqrt x$"
      },
      {
       "say": "Take moments.",
       "show": "$\\bar x = \\frac{\\int_0^4 x^{3/2}\\,dx}{\\int_0^4x^{1/2}\\,dx} = \\frac{\\frac25\\cdot32}{\\frac23\\cdot8}$"
      },
      {
       "say": "Simplify.",
       "show": "$\\bar x = \\frac{64/5}{16/3} = \\frac{12}{5} = 2.4$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "The region bounded by $y = e^x$, the axes and the line $x = 1$ is rotated through $2\\pi$ about the $x$-axis. Find the exact $x$-coordinate of the centre of mass of the uniform solid formed.",
     "answer": "$\\frac{e^2+1}{2(e^2-1)}\\approx0.657$",
     "ms": [
      "M1 $\\bar x = \\frac{\\int_0^1xe^{2x}\\,dx}{\\int_0^1e^{2x}\\,dx}$",
      "M1 integration by parts",
      "A1 $\\frac{e^2+1}{4}$ and $\\frac{e^2-1}{2}$",
      "A1 $\\frac{e^2+1}{2(e^2-1)}$"
     ],
     "steps": [
      {
       "say": "For a solid of revolution, y squared is e to the 2x.",
       "show": "$\\bar x = \\frac{\\int_0^1xe^{2x}dx}{\\int_0^1e^{2x}dx}$"
      },
      {
       "say": "Integrate by parts for the top.",
       "show": "$\\int_0^1xe^{2x}dx = \\Big[\\frac x2e^{2x} - \\frac14e^{2x}\\Big]_0^1 = \\frac{e^2}{4}+\\frac14$"
      },
      {
       "say": "The bottom is e squared minus 1, over 2.",
       "show": "$\\int_0^1e^{2x}dx = \\frac{e^2-1}{2}$"
      },
      {
       "say": "Divide.",
       "show": "$\\bar x = \\frac{e^2+1}{2(e^2-1)}\\approx0.657$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f4_comp",
    "f4_topple"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>A uniform solid cylinder has radius $r$ and height $2r$. A cone of base radius $r$ and height $r$ is drilled out of one end, so that the base of the cone coincides with that end of the cylinder.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Show that the centre of mass of the remaining solid is at a distance $\\frac{17}{20}r$ from the intact plane end.",
     "answer": "Shown.",
     "ms": [
      "B1 volumes $2\\pi r^3$ and $\\frac13\\pi r^3$",
      "B1 cylinder centre at $r$; cone centre at $2r - \\frac r4 = \\frac{7r}{4}$",
      "M1 moment equation with subtraction",
      "A1 $\\frac53\\pi r^3\\bar z = 2\\pi r^4 - \\frac{7}{12}\\pi r^4$",
      "M1 solve",
      "A1 $\\frac{17r}{20}$"
     ],
     "steps": [
      {
       "say": "The cylinder has volume 2 pi r cubed; the cone has volume a third pi r cubed; the remainder has five thirds pi r cubed.",
       "show": "$V_{rem} = \\frac53\\pi r^3$"
      },
      {
       "say": "Measure from the intact end. The cylinder's centre is at r. The cone's base is at 2r and its centre is a quarter of its height from the base, inside the cylinder.",
       "show": "$z_{cone} = 2r - \\frac r4 = \\frac{7r}{4}$"
      },
      {
       "say": "Take moments: the full cylinder equals remainder plus cone.",
       "show": "$2\\pi r^3(r) = \\frac53\\pi r^3\\bar z + \\frac13\\pi r^3\\cdot\\frac{7r}{4}$"
      },
      {
       "say": "Solve.",
       "show": "$\\frac53\\bar z = 2r - \\frac{7r}{12} = \\frac{17r}{12} \\Rightarrow \\bar z = \\frac{17r}{20}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "The solid stands with its intact plane end on a rough plane. The inclination $\\alpha$ of the plane is gradually increased from zero. The coefficient of friction is $1.0$. Determine whether the solid slides or topples first, giving the angle at which this happens.",
     "answer": "Slides first at $45°$ (toppling would need $49.6°$)",
     "ms": [
      "M1 sliding when $\\tan\\alpha = \\mu$",
      "A1 $45°$",
      "M1 toppling when $\\tan\\alpha = \\frac{r}{17r/20}$",
      "A1 $49.6°$",
      "M1 compare",
      "A1 slides first at $45°$"
     ],
     "steps": [
      {
       "say": "Sliding begins when tan alpha equals mu, which is 1.",
       "show": "$\\alpha = 45°$"
      },
      {
       "say": "Toppling begins when the vertical through G passes through the lowest point of the base. G is 17r over 20 above the base, on the axis, and the base edge is r from the axis.",
       "show": "$\\tan\\alpha = \\frac{r}{17r/20} = \\frac{20}{17}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\alpha\\approx49.6°$"
      },
      {
       "say": "Sliding needs the smaller angle, so the solid slides first, at 45 degrees.",
       "show": "Slides first"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 11,
   "points": [
    "f4_forces"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>$ABC$ is an equilateral triangle of side $2a$, with $A(0,0)$, $B(2a,0)$ and $C(a,\\sqrt3a)$. Forces of magnitude $P$, $2P$ and $3P$ act along $AB$, $BC$ and $CA$ respectively, in the directions given by the order of the letters.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the magnitude of the resultant, and the angle it makes with $\\overrightarrow{AB}$.",
     "answer": "$\\sqrt3P$, at $210°$ to $\\overrightarrow{AB}$ (pointing down and to the left at $30°$ below $\\overrightarrow{BA}$)",
     "ms": [
      "M1 unit vectors along the sides",
      "A1 $\\mathbf R = P\\left(-\\frac32, -\\frac{\\sqrt3}{2}\\right)$",
      "A1 $|\\mathbf R| = \\sqrt3P$",
      "A1 direction"
     ],
     "steps": [
      {
       "say": "Unit vectors: AB is 1, 0; BC is minus a half, root 3 over 2; CA is minus a half, minus root 3 over 2.",
       "show": "$\\mathbf R = P(1,0) + 2P\\left(-\\tfrac12,\\tfrac{\\sqrt3}{2}\\right) + 3P\\left(-\\tfrac12,-\\tfrac{\\sqrt3}{2}\\right)$"
      },
      {
       "say": "Add.",
       "show": "$\\mathbf R = P\\left(-\\frac32, -\\frac{\\sqrt3}{2}\\right)$"
      },
      {
       "say": "Magnitude: root of nine quarters plus three quarters.",
       "show": "$|\\mathbf R| = \\sqrt3\\,P$"
      },
      {
       "say": "The direction has tangent one over root 3 in the third quadrant: 30 degrees below the direction from B to A.",
       "show": "$210°$ to $\\overrightarrow{AB}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the total moment about $A$ and the point where the line of action of the resultant meets the line $AB$, produced if necessary.",
     "answer": "$2\\sqrt3aP$ anticlockwise; at $(-4a, 0)$, a distance $4a$ beyond $A$",
     "ms": [
      "M1 only the force along $BC$ has a moment about $A$",
      "A1 $2a\\times2P\\sin60° = 2\\sqrt3aP$",
      "M1 resultant at $(x,0)$: $x\\left(-\\frac{\\sqrt3}{2}P\\right) = 2\\sqrt3aP$",
      "A1 $x = -4a$"
     ],
     "steps": [
      {
       "say": "The forces along AB and CA pass through A, so they have no moment about A.",
       "show": "Only $BC$ contributes"
      },
      {
       "say": "The 2P force acts at B, a distance 2a from A, at 60 degrees to AB.",
       "show": "$M_A = 2a\\cdot2P\\sin60° = 2\\sqrt3aP$ anticlockwise"
      },
      {
       "say": "If the resultant passes through x, 0, its moment about A is x times its y component.",
       "show": "$x\\left(-\\frac{\\sqrt3}{2}P\\right) = 2\\sqrt3aP$"
      },
      {
       "say": "Solve.",
       "show": "$x = -4a$: on $BA$ produced, $4a$ beyond $A$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The system is replaced by a force acting at the centroid $G$ of the triangle together with a couple. Find the moment of the couple.",
     "answer": "$2\\sqrt3aP$ anticlockwise",
     "ms": [
      "B1 $G = \\left(a, \\frac{a}{\\sqrt3}\\right)$",
      "M1 moment of $\\mathbf R$ at $G$ about $A$",
      "A1 it is $0$, so the couple is $2\\sqrt3aP$ anticlockwise"
     ],
     "steps": [
      {
       "say": "The centroid is at a, a over root 3.",
       "show": "$G = \\left(a,\\frac{a}{\\sqrt3}\\right)$"
      },
      {
       "say": "The moment of R acting at G about A is x R y minus y R x.",
       "show": "$a\\left(-\\frac{\\sqrt3}{2}P\\right) - \\frac{a}{\\sqrt3}\\left(-\\frac32P\\right) = -\\frac{\\sqrt3}{2}aP + \\frac{\\sqrt3}{2}aP = 0$"
      },
      {
       "say": "So the couple must supply the entire moment.",
       "show": "$G = 2\\sqrt3aP$ anticlockwise"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 12,
   "points": [
    "f4_rest"
   ],
   "q": "<b>Section B · Mechanics 2</b><br>Three smooth spheres $A$, $B$, $C$ of equal radius and masses $m$, $2m$ and $4m$ lie at rest in a straight line on a smooth horizontal table, in that order. $A$ is projected towards $B$ with speed $u$. The coefficient of restitution between any two spheres is $e$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the velocities of $A$ and $B$ after the first collision.",
     "answer": "$v_A = \\frac{u(1-2e)}{3}$, $v_B = \\frac{u(1+e)}{3}$",
     "ms": [
      "M1 momentum",
      "M1 restitution",
      "A1 $v_B$",
      "A1 $v_A$"
     ],
     "steps": [
      {
       "say": "Conserve momentum, dividing by m.",
       "show": "$u = v_A + 2v_B$"
      },
      {
       "say": "Newton's law.",
       "show": "$v_B - v_A = eu$"
      },
      {
       "say": "Solve.",
       "show": "$v_B = \\frac{u(1+e)}{3},\\quad v_A = \\frac{u(1-2e)}{3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "$B$ then collides with $C$. Find the velocities of $B$ and $C$ after this collision.",
     "answer": "$v_B' = \\frac{u(1+e)(1-2e)}{9}$, $v_C = \\frac{u(1+e)^2}{9}$",
     "ms": [
      "M1 momentum: $2mv_B = 2mv_B' + 4mv_C$",
      "M1 restitution: $v_C - v_B' = ev_B$",
      "A1 $v_C = \\frac{(1+e)v_B}{3}$",
      "A1 $v_B' = \\frac{(1-2e)v_B}{3}$ in terms of $u$"
     ],
     "steps": [
      {
       "say": "This collision has the same mass ratio, 1 to 2, as the first one.",
       "show": "$v_B = v_B' + 2v_C,\\quad v_C - v_B' = ev_B$"
      },
      {
       "say": "So the results have the same form, with v B in place of u.",
       "show": "$v_C = \\frac{(1+e)v_B}{3},\\quad v_B' = \\frac{(1-2e)v_B}{3}$"
      },
      {
       "say": "Substitute v B.",
       "show": "$v_C = \\frac{u(1+e)^2}{9},\\quad v_B' = \\frac{u(1+e)(1-2e)}{9}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Show that there are no further collisions if and only if $e \\ge \\frac12$.",
     "answer": "Shown.",
     "ms": [
      "B1 $v_B' \\le v_C$ always",
      "M1 no further collision iff $v_A \\le v_B'$",
      "M1 $\\frac{u(1-2e)}{3} - \\frac{u(1+e)(1-2e)}{9} \\le 0$",
      "A1 $\\frac{u(1-2e)(2-e)}{9}\\le0$",
      "A1 $2 - e\\gt0$ so $e\\ge\\frac12$"
     ],
     "steps": [
      {
       "say": "B cannot catch C again, because C moves at least as fast: 1 plus e is at least 1 minus 2e.",
       "show": "$v_C - v_B' = ev_B \\ge 0$"
      },
      {
       "say": "So there are no more collisions exactly when A does not catch B.",
       "show": "$v_A \\le v_B'$"
      },
      {
       "say": "Subtract and factorise.",
       "show": "$v_A - v_B' = \\frac{u(1-2e)}{9}\\big[3 - (1+e)\\big] = \\frac{u(1-2e)(2-e)}{9}$"
      },
      {
       "say": "Since e is at most 1, 2 minus e is positive. So the difference is at most zero exactly when 1 minus 2e is at most zero.",
       "show": "$e\\ge\\frac12$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 13,
   "points": [
    "f4_lnorm",
    "f4_lin"
   ],
   "q": "<b>Section C · Statistics</b> (75 marks)<br>The mass of a tin of beans is $T\\sim N(400, 10^2)$ grams. The mass of an empty packing box is $B\\sim N(500, 20^2)$ grams. A full box contains $24$ tins. All masses are independent.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the probability that a full box has mass greater than $10.2$ kg.",
     "answer": "$0.0294$",
     "ms": [
      "M1 mean $24(400) + 500 = 10100$",
      "M1 variance $24(100) + 400 = 2800$",
      "M1 standardise $\\frac{100}{\\sqrt{2800}}$",
      "A1 $0.0294$"
     ],
     "steps": [
      {
       "say": "A full box is the sum of 24 independent tins and one box.",
       "show": "$F = T_1 + \\dots + T_{24} + B$"
      },
      {
       "say": "Mean and variance.",
       "show": "$E(F) = 10100,\\quad\\text{Var}(F) = 2400 + 400 = 2800$"
      },
      {
       "say": "Standardise.",
       "show": "$P(F\\gt10200) = P\\left(Z\\gt\\frac{100}{52.92}\\right) = P(Z\\gt1.890)$"
      },
      {
       "say": "From tables.",
       "show": "$\\approx0.0294$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Two full boxes are chosen at random. Find the probability that their masses differ by more than $100$ g.",
     "answer": "$0.181$",
     "ms": [
      "M1 $D = F_1 - F_2$, mean $0$",
      "A1 $\\text{Var}(D) = 5600$",
      "M1 $2P\\left(Z\\gt\\frac{100}{\\sqrt{5600}}\\right)$",
      "A1 $0.181$"
     ],
     "steps": [
      {
       "say": "Let D be the difference. Its mean is 0 and its variance is twice 2800.",
       "show": "$D\\sim N(0, 5600)$"
      },
      {
       "say": "We need the size of D to exceed 100, which is two tails.",
       "show": "$P(|D|\\gt100) = 2P\\left(Z\\gt\\frac{100}{74.83}\\right)$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 2P(Z\\gt1.336)\\approx0.181$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the probability that the mean mass of the $24$ tins in a box is within $2$ g of $400$ g.",
     "answer": "$0.673$",
     "ms": [
      "M1 $\\bar T\\sim N\\left(400, \\frac{100}{24}\\right)$",
      "M1 $P(|Z|\\lt0.980)$",
      "A1 $0.673$"
     ],
     "steps": [
      {
       "say": "The mean of 24 tins has variance 100 over 24.",
       "show": "$\\bar T\\sim N(400, 4.167)$, $\\sigma\\approx2.041$"
      },
      {
       "say": "Standardise both limits.",
       "show": "$P(398\\lt\\bar T\\lt402) = P(|Z|\\lt0.980)$"
      },
      {
       "say": "From tables.",
       "show": "$= 2\\Phi(0.980) - 1\\approx0.673$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the probability that a randomly chosen tin weighs more than $\\frac34$ of a randomly chosen empty box.",
     "answer": "$0.917$",
     "ms": [
      "M1 $T - 0.75B$, mean $25$",
      "A1 variance $100 + 0.5625(400) = 325$",
      "A1 $P(Z\\gt-1.387) = 0.917$"
     ],
     "steps": [
      {
       "say": "Let W be T minus three quarters of B. We want W positive.",
       "show": "$E(W) = 400 - 375 = 25$"
      },
      {
       "say": "The variance uses the coefficient squared.",
       "show": "$\\text{Var}(W) = 100 + \\frac{9}{16}(400) = 325$"
      },
      {
       "say": "Standardise.",
       "show": "$P(W\\gt0) = P\\left(Z\\gt-\\frac{25}{18.03}\\right) = P(Z\\gt-1.387)\\approx0.917$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f4_est",
    "f4_ci",
    "f4_clt"
   ],
   "q": "<b>Section C · Statistics</b><br>The waiting times, $x$ minutes, of $80$ randomly chosen patients at a clinic are summarised by $\\sum x = 344$ and $\\sum x^2 = 2120$. The distribution of waiting times is known to be strongly skewed.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate unbiased estimates of the population mean and variance.",
     "answer": "$4.3$; $8.11$",
     "ms": [
      "B1 $\\bar x = 4.3$",
      "M1 $s^2 = \\frac{1}{79}\\left(2120 - \\frac{344^2}{80}\\right)$",
      "A1 $8.11$"
     ],
     "steps": [
      {
       "say": "The mean is 344 over 80.",
       "show": "$\\bar x = 4.3$"
      },
      {
       "say": "Use the n minus 1 formula.",
       "show": "$s^2 = \\frac{2120 - 1479.2}{79} = \\frac{640.8}{79}$"
      },
      {
       "say": "Evaluate.",
       "show": "$s^2\\approx8.11$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Calculate a $98\\%$ confidence interval for the mean waiting time.",
     "answer": "$(3.56,\\ 5.04)$",
     "ms": [
      "M1 SE $\\sqrt{\\frac{8.11}{80}} = 0.3184$",
      "B1 $z = 2.326$",
      "M1 $4.3\\pm2.326\\times0.3184$",
      "A1 $(3.56, 5.04)$"
     ],
     "steps": [
      {
       "say": "The standard error.",
       "show": "$\\text{SE} = \\sqrt{\\frac{8.111}{80}}\\approx0.3184$"
      },
      {
       "say": "For 98 percent, z is 2.326.",
       "show": "$2.326\\times0.3184\\approx0.741$"
      },
      {
       "say": "Form the interval.",
       "show": "$4.3\\pm0.741 = (3.56,\\ 5.04)$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Explain why the interval is valid even though the waiting times are skewed.",
     "answer": "Large sample: CLT makes $\\bar X$ approximately normal",
     "ms": [
      "B1 $n = 80$ large",
      "B1 by the CLT the sample mean is approximately normal regardless of the population shape"
     ],
     "steps": [
      {
       "say": "The sample size, 80, is large.",
       "show": "$n = 80$"
      },
      {
       "say": "The central limit theorem says the sample mean is then approximately normal, whatever the shape of the population.",
       "show": "$\\bar X\\approx N\\left(\\mu,\\frac{\\sigma^2}{80}\\right)$"
      },
      {
       "say": "So the interval based on z is valid; s squared is also a good estimate of the variance.",
       "show": "Valid by CLT"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Ten independent $98\\%$ confidence intervals for the mean are calculated from ten different samples. Find the probability that at least one of them does not contain the true mean.",
     "answer": "$0.183$",
     "ms": [
      "M1 $1 - 0.98^{10}$",
      "A1 $0.183$"
     ],
     "steps": [
      {
       "say": "Each interval contains the mean with probability 0.98, independently.",
       "show": "$P(\\text{all contain}) = 0.98^{10}$"
      },
      {
       "say": "Subtract from 1.",
       "show": "$1 - 0.98^{10}$"
      },
      {
       "say": "Evaluate.",
       "show": "$\\approx0.183$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 2,
     "q": "The clinic claims that the mean waiting time is $5$ minutes. Comment on this claim.",
     "answer": "$5$ lies inside the interval, so it is plausible",
     "ms": [
      "B1 $5$ is inside $(3.56, 5.04)$",
      "B1 not rejected at the 2% level, though it is near the upper end"
     ],
     "steps": [
      {
       "say": "Compare 5 with the interval.",
       "show": "$3.56 \\lt 5 \\lt 5.04$"
      },
      {
       "say": "It lies inside, so the claim is consistent with the data at the 2 percent level.",
       "show": "Plausible"
      },
      {
       "say": "However 5 is close to the upper limit, so the evidence suggests the mean is probably lower.",
       "show": "Near the upper limit"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f4_t1"
   ],
   "q": "<b>Section C · Statistics</b><br>The lengths, in mm, of $9$ randomly selected components from a normally distributed population are:<br>$15.2,\\ 14.8,\\ 16.1,\\ 15.9,\\ 14.5,\\ 15.0,\\ 16.4,\\ 15.6,\\ 15.3$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate the sample mean and an unbiased estimate of the population variance.",
     "answer": "$\\bar x = 15.42$, $s^2 = 0.394$",
     "ms": [
      "B1 $\\sum x = 138.8$, $\\bar x = 15.42$",
      "M1 $s^2 = \\frac{2143.76 - 138.8^2/9}{8}$",
      "A1 $0.394$"
     ],
     "steps": [
      {
       "say": "Add the lengths: 138.8. Divide by 9.",
       "show": "$\\bar x = 15.422$"
      },
      {
       "say": "The sum of squares is 2143.76.",
       "show": "$s^2 = \\frac{2143.76 - 2140.604}{8}$"
      },
      {
       "say": "Evaluate.",
       "show": "$s^2\\approx0.394,\\ s\\approx0.628$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Test, at the $5\\%$ level, whether the mean length differs from $15.0$ mm.",
     "answer": "$t = 2.02 \\lt 2.306$: do not reject $H_0$",
     "ms": [
      "B1 $H_0: \\mu = 15$, $H_1:\\mu\\ne15$",
      "M1 $t = \\frac{15.422 - 15}{0.628/3}$",
      "A1 $2.02$",
      "B1 $\\nu = 8$, critical $2.306$",
      "M1 compare",
      "A1 insufficient evidence that the mean differs from 15.0 mm"
     ],
     "steps": [
      {
       "say": "Two-sided hypotheses.",
       "show": "$H_0:\\mu = 15.0,\\quad H_1:\\mu\\ne15.0$"
      },
      {
       "say": "The standard error is s over root 9.",
       "show": "$\\frac{0.628}{3}\\approx0.2093$"
      },
      {
       "say": "Calculate t.",
       "show": "$t = \\frac{0.4222}{0.2093}\\approx2.02$"
      },
      {
       "say": "With 8 degrees of freedom, the two-tailed critical value is 2.306.",
       "show": "$2.02\\lt2.306$"
      },
      {
       "say": "Do not reject H nought: no significant evidence that the mean differs from 15 mm.",
       "show": "Do not reject $H_0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the set of values of $\\mu_0$ for which the hypothesis $H_0: \\mu = \\mu_0$ would not be rejected by this two-tailed test at the $5\\%$ level.",
     "answer": "$14.94 \\lt \\mu_0 \\lt 15.90$",
     "ms": [
      "M1 $\\left|\\frac{15.422 - \\mu_0}{0.2093}\\right| \\lt 2.306$",
      "M1 $15.422\\pm2.306\\times0.2093$",
      "A1 $14.94\\lt\\mu_0\\lt15.90$"
     ],
     "steps": [
      {
       "say": "H nought is not rejected when the size of t is less than 2.306.",
       "show": "$|15.422 - \\mu_0| \\lt 2.306\\times0.2093$"
      },
      {
       "say": "The right side is about 0.483.",
       "show": "$|15.422 - \\mu_0|\\lt0.483$"
      },
      {
       "say": "So mu nought lies between about 14.94 and 15.90.",
       "show": "$14.94\\lt\\mu_0\\lt15.90$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 16,
   "points": [
    "f4_t2"
   ],
   "q": "<b>Section C · Statistics</b><br>Two independent groups of trainees were timed (minutes) on the same task after different training.<br>Group X: 12, 15, 11, 14, 13, 16<br>Group Y: 10, 12, 9, 13, 11, 10, 12",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Explain why a two-sample test, rather than a paired test, is appropriate.",
     "answer": "Different trainees in each group; no natural pairing",
     "ms": [
      "B1 groups are independent, different people",
      "B1 different sample sizes; no pairing exists"
     ],
     "steps": [
      {
       "say": "The two groups contain different people.",
       "show": "Independent samples"
      },
      {
       "say": "There is no natural way to match a trainee in X with one in Y; the sample sizes even differ.",
       "show": "$6\\ne7$"
      },
      {
       "say": "So a two-sample t-test is used.",
       "show": "Two-sample test"
      }
     ]
    },
    {
     "l": "b",
     "marks": 9,
     "q": "Test, at the $5\\%$ level, whether there is a difference between the mean times for the two types of training.",
     "answer": "$t = 2.74 \\gt 2.201$: reject $H_0$",
     "ms": [
      "B1 $H_0:\\mu_X = \\mu_Y$, $H_1:\\mu_X\\ne\\mu_Y$",
      "B1 $\\bar x = 13.5$, $\\bar y = 11$",
      "B1 $s_X^2 = 3.5$",
      "B1 $s_Y^2 = 2.0$",
      "M1 pooled $s_p^2 = \\frac{5(3.5) + 6(2)}{11}$",
      "A1 $2.682$",
      "M1 $t = \\frac{2.5}{\\sqrt{2.682\\left(\\frac16+\\frac17\\right)}}$",
      "A1 $2.74$",
      "B1 $\\nu = 11$, critical $2.201$; reject $H_0$: evidence of a difference in mean times"
     ],
     "steps": [
      {
       "say": "State two-sided hypotheses.",
       "show": "$H_0:\\mu_X = \\mu_Y,\\quad H_1:\\mu_X\\ne\\mu_Y$"
      },
      {
       "say": "Sample means: 81 over 6 and 77 over 7.",
       "show": "$\\bar x = 13.5,\\quad\\bar y = 11$"
      },
      {
       "say": "Unbiased variances, using sums of squares 1111 and 859.",
       "show": "$s_X^2 = \\frac{1111 - 6(13.5)^2}{5} = 3.5,\\quad s_Y^2 = \\frac{859 - 7(11)^2}{6} = 2.0$"
      },
      {
       "say": "Pool them.",
       "show": "$s_p^2 = \\frac{5(3.5) + 6(2.0)}{11} = \\frac{29.5}{11}\\approx2.682$"
      },
      {
       "say": "Calculate t.",
       "show": "$t = \\frac{2.5}{\\sqrt{2.682\\left(\\frac16+\\frac17\\right)}} = \\frac{2.5}{0.911}\\approx2.74$"
      },
      {
       "say": "With 11 degrees of freedom the two-tailed 5 percent value is 2.201. Reject H nought: the mean times differ.",
       "show": "$2.74\\gt2.201$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State two assumptions needed for this test.",
     "answer": "Normal populations with equal variances",
     "ms": [
      "B1 both populations normal",
      "B1 equal population variances"
     ],
     "steps": [
      {
       "say": "Each population of times must be normally distributed.",
       "show": "Normality"
      },
      {
       "say": "The two populations must have a common variance, which justifies pooling.",
       "show": "$\\sigma_X^2 = \\sigma_Y^2$"
      },
      {
       "say": "The sample variances 3.5 and 2.0 are reasonably similar, so this is plausible.",
       "show": "Reasonable"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 17,
   "points": [
    "f4_gof"
   ],
   "q": "<b>Section C · Statistics</b><br>The number of calls arriving at a switchboard was recorded in each of 200 one-minute intervals.<br><table class=\"data\"><tr><th>Calls</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Frequency</td><td>22</td><td>51</td><td>58</td><td>38</td><td>19</td><td>9</td><td>3</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 1,
     "q": "Calculate the mean number of calls per minute.",
     "answer": "$2.1$",
     "ms": [
      "B1 $\\frac{420}{200} = 2.1$"
     ],
     "steps": [
      {
       "say": "Multiply each value by its frequency and add: 0 plus 51 plus 116 plus 114 plus 76 plus 45 plus 18.",
       "show": "$\\sum fx = 420$"
      },
      {
       "say": "Divide by 200.",
       "show": "$\\bar x = 2.1$"
      },
      {
       "say": "This estimates the Poisson parameter.",
       "show": "$\\lambda = 2.1$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Using a Poisson distribution with this mean, calculate the expected frequencies for $0, 1, 2, 3, 4$ and \"5 or more\".",
     "answer": "$24.49, 51.43, 54.00, 37.80, 19.85, 12.43$",
     "ms": [
      "M1 $200e^{-2.1}\\frac{2.1^r}{r!}$",
      "A1 $24.49$, $51.43$",
      "A1 $54.00$, $37.80$, $19.85$",
      "A1 $12.43$ by subtraction"
     ],
     "steps": [
      {
       "say": "Each expected frequency is 200 times the Poisson probability.",
       "show": "$E_r = 200e^{-2.1}\\frac{2.1^r}{r!}$"
      },
      {
       "say": "For r from 0 to 4.",
       "show": "$24.49,\\ 51.43,\\ 54.00,\\ 37.80,\\ 19.85$"
      },
      {
       "say": "The last class takes what is left, so the totals agree.",
       "show": "$200 - 187.57 = 12.43$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "Test, at the $5\\%$ level, whether a Poisson distribution is a suitable model.",
     "answer": "$\\chi^2 = 0.60\\lt9.488$: Poisson model is suitable",
     "ms": [
      "B1 classes $5$ and $6$ combined; observed $12$",
      "M1 $\\sum\\frac{(O-E)^2}{E}$",
      "A1 $0.60$",
      "B1 $\\nu = 6 - 1 - 1 = 4$",
      "B1 critical $9.488$",
      "A1 do not reject $H_0$; Poisson model fits"
     ],
     "steps": [
      {
       "say": "The last class is 5 or more: observed 9 plus 3, which is 12. All expected frequencies are at least 5.",
       "show": "$O: 22, 51, 58, 38, 19, 12$"
      },
      {
       "say": "Calculate the statistic.",
       "show": "$\\chi^2 = \\frac{2.49^2}{24.49}+\\frac{0.43^2}{51.43}+\\frac{4.00^2}{54.00}+\\frac{0.20^2}{37.80}+\\frac{0.85^2}{19.85}+\\frac{0.43^2}{12.43}\\approx0.60$"
      },
      {
       "say": "Six classes, minus 1 for the total, minus 1 because lambda was estimated.",
       "show": "$\\nu = 4,\\ \\chi^2_4(0.05) = 9.488$"
      },
      {
       "say": "0.60 is far below 9.488, so do not reject H nought: a Poisson model fits well.",
       "show": "Do not reject $H_0$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 1,
     "q": "Give a reason, in context, why a Poisson model might be expected.",
     "answer": "Calls arrive singly, independently, at a constant average rate",
     "ms": [
      "B1 calls occur randomly, independently and at a constant mean rate"
     ],
     "steps": [
      {
       "say": "Calls usually arrive independently of one another.",
       "show": "Independent"
      },
      {
       "say": "They arrive one at a time.",
       "show": "Singly"
      },
      {
       "say": "And at a roughly constant average rate over the period, which are the conditions for a Poisson model.",
       "show": "Constant rate"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 18,
   "points": [
    "f4_cont"
   ],
   "q": "<b>Section C · Statistics</b><br>Grades awarded to 150 students from three schools:<br><table class=\"data\"><tr><th></th><th>Grade A</th><th>Grade B</th><th>Grade C</th><th>Total</th></tr><tr><td>School P</td><td>20</td><td>30</td><td>10</td><td>60</td></tr><tr><td>School Q</td><td>25</td><td>35</td><td>20</td><td>80</td></tr><tr><td>School R</td><td>3</td><td>4</td><td>3</td><td>10</td></tr><tr><td>Total</td><td>48</td><td>69</td><td>33</td><td>150</td></tr></table>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Calculate the expected frequencies under independence, and explain why rows must be combined before a $\\chi^2$ test is carried out.",
     "answer": "Row R expected $3.2, 4.6, 2.2$, all below 5: combine R with Q",
     "ms": [
      "M1 row × column ÷ total",
      "A1 row P: $19.2, 27.6, 13.2$",
      "A1 row R: $3.2, 4.6, 2.2$",
      "B1 expected frequencies below 5 so combine R with another row"
     ],
     "steps": [
      {
       "say": "Each expected frequency is row total times column total over 150.",
       "show": "$E_{PA} = \\frac{60\\times48}{150} = 19.2$"
      },
      {
       "say": "Row P: 19.2, 27.6, 13.2. Row Q: 25.6, 36.8, 17.6. Row R: 3.2, 4.6, 2.2.",
       "show": "Expected table"
      },
      {
       "say": "All the expected frequencies for school R are below 5, so the chi-squared approximation would be unreliable. Combine R with Q.",
       "show": "Q+R: $28.8,\\ 41.4,\\ 19.8$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "After combining, test at the $5\\%$ level whether grade is independent of school.",
     "answer": "$\\chi^2 = 1.70\\lt5.991$: no evidence of association",
     "ms": [
      "B1 combined observed $28, 39, 23$",
      "B1 $H_0$: grade independent of school",
      "M1 $\\sum\\frac{(O-E)^2}{E}$",
      "A1 $1.70$",
      "B1 $\\nu = (2-1)(3-1) = 2$",
      "B1 critical $5.991$",
      "A1 do not reject $H_0$: grades appear independent of school"
     ],
     "steps": [
      {
       "say": "Combine Q and R: observed 28, 39 and 23.",
       "show": "$O_{QR} = 28,\\ 39,\\ 23$"
      },
      {
       "say": "Hypotheses.",
       "show": "$H_0$: grade independent of school; $H_1$: not independent"
      },
      {
       "say": "Calculate the statistic over the 2 by 3 table.",
       "show": "$\\chi^2 = \\frac{0.8^2}{19.2}+\\frac{2.4^2}{27.6}+\\frac{3.2^2}{13.2}+\\frac{0.8^2}{28.8}+\\frac{2.4^2}{41.4}+\\frac{3.2^2}{19.8}\\approx1.70$"
      },
      {
       "say": "Degrees of freedom are 1 times 2.",
       "show": "$\\nu = 2,\\ \\chi^2_2(0.05) = 5.991$"
      },
      {
       "say": "1.70 is less than 5.991, so do not reject H nought.",
       "show": "Do not reject $H_0$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 19,
   "points": [
    "f4_pie",
    "f4_rook"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b> (75 marks)<br>",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Use the principle of inclusion and exclusion to find the number of solutions of $x_1 + x_2 + x_3 = 15$ in integers with $0 \\le x_i\\le6$.",
     "answer": "$10$",
     "ms": [
      "B1 unrestricted $\\binom{17}{2} = 136$",
      "M1 $x_i\\ge7$: substitute $x_i' = x_i - 7$",
      "A1 $3\\binom{10}{2} = 135$",
      "A1 two variables $\\ge7$: $3\\binom32 = 9$",
      "A1 $136 - 135 + 9 = 10$"
     ],
     "steps": [
      {
       "say": "Without upper limits, the number of non-negative solutions is 17 choose 2.",
       "show": "$\\binom{17}{2} = 136$"
      },
      {
       "say": "If x 1 is at least 7, write x 1 as 7 plus y; then the variables add to 8, giving 10 choose 2. The same holds for each variable.",
       "show": "$|A_i| = \\binom{10}{2} = 45$"
      },
      {
       "say": "If two variables are at least 7, the rest add to 1: 3 choose 2 solutions. All three cannot be at least 7.",
       "show": "$|A_i\\cap A_j| = 3,\\ |A_1\\cap A_2\\cap A_3| = 0$"
      },
      {
       "say": "Apply inclusion and exclusion.",
       "show": "$136 - 3(45) + 3(3) = 10$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "By considering where object $1$ is placed, explain why the number of derangements satisfies $D_n = (n-1)(D_{n-1} + D_{n-2})$, and verify this for $n = 5$.",
     "answer": "Argument given; $4(9 + 2) = 44$",
     "ms": [
      "B1 object 1 goes to position $k\\ne1$: $n-1$ choices",
      "B1 if object $k$ goes to position 1: $D_{n-2}$ ways",
      "B1 if not: equivalent to a derangement of $n-1$ objects, $D_{n-1}$",
      "B1 $D_5 = 4(D_4 + D_3) = 4(9+2) = 44$"
     ],
     "steps": [
      {
       "say": "Object 1 must go to some other position k: there are n minus 1 choices.",
       "show": "$n-1$ choices of $k$"
      },
      {
       "say": "Case 1: object k goes to position 1. The other n minus 2 objects must be deranged.",
       "show": "$D_{n-2}$"
      },
      {
       "say": "Case 2: object k does not go to position 1. Treat position 1 as k's forbidden place; this is a derangement of n minus 1 objects.",
       "show": "$D_{n-1}$"
      },
      {
       "say": "So D n is n minus 1 times the sum. Check with n equals 5.",
       "show": "$D_5 = 4(D_4 + D_3) = 4(9+2) = 44$ ✓"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Three people $1, 2, 3$ are to be given three seats $a, b, c$, one each. Persons $1$ and $2$ refuse seats $a$ and $b$, and person $3$ refuses seat $c$. Find the rook polynomial of the forbidden board, and deduce the number of acceptable seatings. Explain the answer directly.",
     "answer": "$R(x) = (1+4x+2x^2)(1+x) = 1 + 5x + 6x^2 + 2x^3$; $0$ seatings",
     "ms": [
      "M1 decompose into a $2\\times2$ block and a single square",
      "A1 $1 + 4x + 2x^2$ for the block",
      "A1 product $1+5x+6x^2+2x^3$",
      "M1 $3! - 5(2!) + 6(1!) - 2(0!)$",
      "A1 $0$, since persons 1 and 2 would both need seat $c$"
     ],
     "steps": [
      {
       "say": "The forbidden squares are a 2 by 2 block, persons 1 and 2 with seats a and b, and a separate single square, person 3 with seat c.",
       "show": "$B_1$: $2\\times2$ block; $B_2$: one square"
      },
      {
       "say": "For the block, one rook has 4 places, and two non-attacking rooks have 2 arrangements.",
       "show": "$R(B_1) = 1 + 4x + 2x^2,\\quad R(B_2) = 1 + x$"
      },
      {
       "say": "Multiply.",
       "show": "$R(x) = 1 + 5x + 6x^2 + 2x^3$"
      },
      {
       "say": "Count.",
       "show": "$6 - 5(2) + 6(1) - 2(1) = 0$"
      },
      {
       "say": "Directly: persons 1 and 2 can only sit in seat c, but there is only one seat c, so no seating works.",
       "show": "No acceptable seating"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 20,
   "points": [
    "f4_col",
    "f4_nn"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Explain why any graph containing a cycle of odd length cannot be vertex coloured with two colours.",
     "answer": "Colours must alternate round the cycle, impossible for odd length",
     "ms": [
      "B1 adjacent vertices on the cycle must have different colours",
      "B1 with two colours they alternate",
      "B1 an odd cycle returns to the start vertex with a clash"
     ],
     "steps": [
      {
       "say": "Go round the cycle. Adjacent vertices must have different colours.",
       "show": "Alternate colours"
      },
      {
       "say": "With only two colours, the colours must alternate: 1, 2, 1, 2 and so on.",
       "show": "1, 2, 1, 2, …"
      },
      {
       "say": "After an odd number of steps we are back at the first vertex but on the opposite colour: a contradiction.",
       "show": "At least 3 colours"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "The wheel $W$ consists of a cycle of $5$ vertices $v_1, \\dots, v_5$ and a hub $h$ joined to every $v_i$. Find its chromatic number.",
     "answer": "$4$",
     "ms": [
      "M1 rim is an odd cycle needing 3 colours",
      "A1 hub adjacent to all: $4$"
     ],
     "steps": [
      {
       "say": "The rim is a 5-cycle, which is odd, so it needs 3 colours.",
       "show": "$\\chi(C_5) = 3$"
      },
      {
       "say": "The hub is adjacent to every rim vertex, so it needs a fourth colour.",
       "show": "$\\chi(W) = 4$"
      },
      {
       "say": "Four colours are enough: colour the rim 1, 2, 1, 2, 3 and the hub 4.",
       "show": "Chromatic number $4$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Show that the edges of $W$ can be coloured with $5$ colours, and explain why fewer will not do.",
     "answer": "Hub edge $hv_i$ colour $i$, rim edge $v_iv_{i+1}$ colour $i+3 \\pmod 5$; hub has degree 5",
     "ms": [
      "B1 hub has degree $5$ so at least $5$ colours",
      "M1 a systematic colouring",
      "A1 checked valid at every vertex"
     ],
     "steps": [
      {
       "say": "The hub has degree 5, so its five edges need five different colours.",
       "show": "$\\chi'(W)\\ge5$"
      },
      {
       "say": "Colour hub edge h v i with colour i, and rim edge v i v i plus 1 with colour i plus 3, working mod 5 with colours 1 to 5.",
       "show": "$hv_i\\to i,\\quad v_iv_{i+1}\\to i+3$"
      },
      {
       "say": "At v i the three colours are i, i plus 2 and i plus 3, which are all different. So 5 colours suffice.",
       "show": "$\\chi'(W) = 5$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 6,
     "q": "The distances in km between five depots are given below.<table class=\"data\"><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><td>A</td><td>–</td><td>12</td><td>8</td><td>15</td><td>10</td></tr><tr><td>B</td><td>12</td><td>–</td><td>9</td><td>7</td><td>14</td></tr><tr><td>C</td><td>8</td><td>9</td><td>–</td><td>11</td><td>6</td></tr><tr><td>D</td><td>15</td><td>7</td><td>11</td><td>–</td><td>13</td></tr><tr><td>E</td><td>10</td><td>14</td><td>6</td><td>13</td><td>–</td></tr></table>Apply the nearest neighbour algorithm starting from $A$ and starting from $D$. State the best upper bound obtained for the length of the shortest Hamiltonian cycle.",
     "answer": "From $A$: $ACEDBA$, $46$; from $D$: $DBCEAD$, $47$; best upper bound $46$ km",
     "ms": [
      "M1 nearest neighbour from $A$",
      "A1 $A\\to C\\to E\\to D\\to B\\to A$",
      "A1 $46$",
      "M1 from $D$",
      "A1 $D\\to B\\to C\\to E\\to A\\to D$, $47$",
      "B1 best upper bound $46$"
     ],
     "steps": [
      {
       "say": "From A the nearest is C at 8. From C the nearest unvisited is E at 6. From E, D at 13 beats B at 14. From D, B at 7. Return to A, 12.",
       "show": "$ACEDBA$: $8+6+13+7+12 = 46$"
      },
      {
       "say": "From D the nearest is B at 7. From B, C at 9. From C, E at 6. From E, A at 10. Return to D, 15.",
       "show": "$DBCEAD$: $7+9+6+10+15 = 47$"
      },
      {
       "say": "Each is a genuine Hamiltonian cycle, so each gives an upper bound. The smaller is better.",
       "show": "Best upper bound $46$ km"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 21,
   "points": [
    "f4_match",
    "f4_flow"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Five applicants $A$–$E$ apply for five posts $1$–$5$. $A$ is suitable for posts 1 or 2; $B$ for post 1 only; $C$ for posts 1 or 2; $D$ for posts 2, 3, 4 or 5; $E$ for posts 3, 4 or 5.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Use Hall's marriage theorem to show that a complete matching is impossible.",
     "answer": "$N(\\{A, B, C\\}) = \\{1, 2\\}$",
     "ms": [
      "B1 statement of Hall's condition",
      "M1 identify $\\{A,B,C\\}$",
      "A1 $|N| = 2\\lt3$"
     ],
     "steps": [
      {
       "say": "Hall's theorem: a complete matching exists if and only if every set of applicants is suitable for at least as many posts as it has members.",
       "show": "$|N(X)|\\ge|X|$"
      },
      {
       "say": "A, B and C are suitable only for posts 1 and 2.",
       "show": "$N(\\{A,B,C\\}) = \\{1,2\\}$"
      },
      {
       "say": "Three applicants, two posts: the condition fails.",
       "show": "$2\\lt3$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find a matching of size $4$.",
     "answer": "e.g. $B$–1, $A$–2, $D$–3, $E$–4",
     "ms": [
      "M1 at most two of $A, B, C$ matched",
      "A1 four valid pairs",
      "A1 distinct posts"
     ],
     "steps": [
      {
       "say": "B must take post 1 if B is matched. Then A can take post 2.",
       "show": "$B$–1, $A$–2"
      },
      {
       "say": "D and E share posts 3, 4 and 5.",
       "show": "$D$–3, $E$–4"
      },
      {
       "say": "That is a matching of size 4, leaving C unmatched.",
       "show": "Size $4$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "The problem is modelled as a network with a source $S$ joined to each applicant and each post joined to a sink $T$, every arc having capacity $1$, and each suitable applicant–post pair joined by an arc of capacity $1$. Find a cut of capacity $4$, and hence prove that the maximum matching has size $4$.",
     "answer": "Cut: $\\{S, A, B, C, 1, 2\\}\\mid$ rest, capacity $4$",
     "ms": [
      "B1 maximum flow equals maximum matching",
      "M1 source side $\\{S, A, B, C, 1, 2\\}$",
      "A1 crossing arcs $SD$, $SE$, $1T$, $2T$: capacity $4$",
      "A1 max flow $\\le4$ and matching of size 4 exists, so maximum is 4"
     ],
     "steps": [
      {
       "say": "In this network, an integer flow corresponds to a matching, and its value is the matching size.",
       "show": "Flow value = matching size"
      },
      {
       "say": "Put S, A, B, C, 1 and 2 on the source side. A, B and C only connect to posts 1 and 2, so none of their arcs cross the cut.",
       "show": "$X = \\{S, A, B, C, 1, 2\\}$"
      },
      {
       "say": "The arcs that cross are S D, S E, 1 T and 2 T, each of capacity 1.",
       "show": "$\\text{capacity} = 4$"
      },
      {
       "say": "So no flow exceeds 4. The matching in part b has size 4, so it is maximum by max-flow min-cut.",
       "show": "Maximum matching $= 4$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "An extra post $6$ is created, for which $C$ is suitable. Explain whether a complete matching of the five applicants is now possible.",
     "answer": "Yes: e.g. $B$–1, $A$–2, $C$–6, $D$–3, $E$–4",
     "ms": [
      "M1 Hall's condition now holds or an explicit matching",
      "A1 complete matching given"
     ],
     "steps": [
      {
       "say": "Now C has a post outside 1 and 2.",
       "show": "$N(\\{A,B,C\\}) = \\{1,2,6\\}$"
      },
      {
       "say": "Try B 1, A 2, C 6, D 3, E 4.",
       "show": "$B$–1, $A$–2, $C$–6, $D$–3, $E$–4"
      },
      {
       "say": "Every applicant gets a different suitable post, so a complete matching exists.",
       "show": "Yes"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 22,
   "points": [
    "f4_pert"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Times in days.<br><table class=\"data\"><tr><th>Activity</th><th>Preceded by</th><th>a</th><th>m</th><th>b</th></tr><tr><td>A</td><td>–</td><td>4</td><td>6</td><td>8</td></tr><tr><td>B</td><td>–</td><td>2</td><td>7</td><td>12</td></tr><tr><td>C</td><td>A</td><td>3</td><td>5</td><td>7</td></tr><tr><td>D</td><td>B</td><td>5</td><td>6</td><td>7</td></tr><tr><td>E</td><td>C</td><td>2</td><td>3</td><td>4</td></tr><tr><td>F</td><td>D</td><td>1</td><td>2</td><td>3</td></tr></table>The project is complete when E and F are both complete.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the expected time of each activity.",
     "answer": "A 6, B 7, C 5, D 6, E 3, F 2",
     "ms": [
      "M1 $\\frac{a+4m+b}{6}$",
      "A1 all correct"
     ],
     "steps": [
      {
       "say": "Use the PERT formula.",
       "show": "$t_e = \\frac{a+4m+b}{6}$"
      },
      {
       "say": "For example, B is 2 plus 28 plus 12, over 6, which is 7.",
       "show": "$t_B = 7$"
      },
      {
       "say": "The rest.",
       "show": "A 6, B 7, C 5, D 6, E 3, F 2"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Identify the critical path and the expected project duration.",
     "answer": "$B$–$D$–$F$, $15$ days",
     "ms": [
      "M1 two independent chains $ACE$ and $BDF$",
      "A1 $BDF$, $15$ days"
     ],
     "steps": [
      {
       "say": "There are two separate chains: A, C, E and B, D, F.",
       "show": "$ACE: 6+5+3 = 14$"
      },
      {
       "say": "The second chain is longer.",
       "show": "$BDF: 7+6+2 = 15$"
      },
      {
       "say": "So the critical path is B, D, F, with expected duration 15 days.",
       "show": "Critical path $BDF$, 15 days"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Using only the critical path, estimate the probability that the project is completed within $16$ days.",
     "answer": "$0.718$",
     "ms": [
      "M1 variance $\\frac{100}{36}+\\frac4{36}+\\frac4{36} = 3$",
      "M1 $P\\left(Z\\lt\\frac{1}{\\sqrt3}\\right)$",
      "A1 $0.718$"
     ],
     "steps": [
      {
       "say": "Add the variances along B, D, F.",
       "show": "$\\left(\\frac{10}{6}\\right)^2+\\left(\\frac26\\right)^2+\\left(\\frac26\\right)^2 = 3$"
      },
      {
       "say": "Standardise.",
       "show": "$P(T\\le16) = P\\left(Z\\le\\frac{1}{\\sqrt3}\\right) = P(Z\\le0.577)$"
      },
      {
       "say": "From tables.",
       "show": "$\\approx0.718$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "The path $A$–$C$–$E$ shares no activities with $B$–$D$–$F$. Taking both paths into account, give an improved estimate of the probability that the project is completed within $16$ days.",
     "answer": "$0.702$",
     "ms": [
      "M1 variance of $ACE$: $\\frac{16}{36}+\\frac{16}{36}+\\frac{4}{36} = 1$",
      "A1 $P(ACE\\le16) = \\Phi(2) = 0.977$",
      "M1 independent paths: multiply",
      "A1 $0.718\\times0.977\\approx0.702$"
     ],
     "steps": [
      {
       "say": "The other path has mean 14 and variance 1.",
       "show": "$\\text{Var}(ACE) = \\frac{16+16+4}{36} = 1$"
      },
      {
       "say": "So it finishes within 16 days with probability Phi of 2.",
       "show": "$P(ACE\\le16) = \\Phi(2)\\approx0.977$"
      },
      {
       "say": "The project needs both paths finished. They share no activities, so treat them as independent and multiply.",
       "show": "$0.718\\times0.977\\approx0.702$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 1,
     "q": "Comment on your answers to (c) and (d).",
     "answer": "Using only the critical path overestimates the probability",
     "ms": [
      "B1 the critical-path-only method is optimistic because a near-critical path can also delay the project"
     ],
     "steps": [
      {
       "say": "The answer in part d is lower than in part c.",
       "show": "$0.702\\lt0.718$"
      },
      {
       "say": "The path A C E can sometimes take longer than B D F.",
       "show": "Near-critical path matters"
      },
      {
       "say": "So using only the critical path gives an over-optimistic probability.",
       "show": "Overestimate"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 23,
   "points": [
    "f4_simplex"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>Maximise $P = 5x + 4y$ subject to $$6x + 4y\\le24,\\quad x + 2y\\le6,\\quad -x + y\\le1,\\quad y\\le2,\\quad x, y\\ge0.$$",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Write down the initial simplex tableau, with slack variables $s_1$ to $s_4$.",
     "answer": "See tableau",
     "ms": [
      "B1 four constraint rows",
      "B1 objective row"
     ],
     "steps": [
      {
       "say": "Add slack variables.",
       "show": "$6x+4y+s_1 = 24,\\ x+2y+s_2 = 6,\\ -x+y+s_3 = 1,\\ y+s_4 = 2$"
      },
      {
       "say": "The objective row is P minus 5x minus 4y equals 0.",
       "show": "$P - 5x - 4y = 0$"
      },
      {
       "say": "Set out the tableau.",
       "show": "$\\begin{array}{c|cccccc|c} & x & y & s_1 & s_2 & s_3 & s_4 & \\\\ \\hline s_1 & 6 & 4 & 1 & 0 & 0 & 0 & 24\\\\ s_2 & 1 & 2 & 0 & 1 & 0 & 0 & 6\\\\ s_3 & -1 & 1 & 0 & 0 & 1 & 0 & 1\\\\ s_4 & 0 & 1 & 0 & 0 & 0 & 1 & 2\\\\ P & -5 & -4 & 0 & 0 & 0 & 0 & 0\\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 8,
     "q": "Perform the simplex algorithm, showing each tableau, until the optimum is reached.",
     "answer": "Pivot $x$ in row $s_1$, then $y$ in row $s_2$; $P = 21$",
     "ms": [
      "M1 pivot column $x$; ratios $4$ and $6$ (rows with non-positive entries excluded)",
      "A1 pivot row $s_1$",
      "A1 tableau after first iteration with $P$ row $0, -\\frac23, \\frac56, 0, 0, 0\\mid20$",
      "M1 pivot column $y$; ratios $6, \\frac32, 3, 2$",
      "A1 pivot row $s_2$",
      "A1 rows $x$: $1, 0, \\frac14, -\\frac12, 0, 0\\mid3$ and $y$: $0, 1, -\\frac18, \\frac34, 0, 0\\mid\\frac32$",
      "A1 rows $s_3$: $\\ldots\\mid\\frac52$, $s_4$: $\\ldots\\mid\\frac12$",
      "A1 $P$ row $0, 0, \\frac34, \\frac12, 0, 0\\mid21$: optimal"
     ],
     "steps": [
      {
       "say": "Most negative in the P row is minus 5, column x. Ratios: 24 over 6 is 4, and 6 over 1 is 6; the s 3 and s 4 rows have no positive entry. Pivot on the 6.",
       "show": "Pivot: $s_1$ row, $x$ column"
      },
      {
       "say": "Divide row 1 by 6 and clear the x column.",
       "show": "$\\begin{array}{c|cccccc|c} x & 1 & \\frac23 & \\frac16 & 0 & 0 & 0 & 4\\\\ s_2 & 0 & \\frac43 & -\\frac16 & 1 & 0 & 0 & 2\\\\ s_3 & 0 & \\frac53 & \\frac16 & 0 & 1 & 0 & 5\\\\ s_4 & 0 & 1 & 0 & 0 & 0 & 1 & 2\\\\ P & 0 & -\\frac23 & \\frac56 & 0 & 0 & 0 & 20\\end{array}$"
      },
      {
       "say": "Now the y column has minus two thirds. Ratios: 6, three halves, 3 and 2. The smallest is three halves, in the s 2 row.",
       "show": "Pivot: $s_2$ row, $y$ column"
      },
      {
       "say": "Divide that row by four thirds and clear the y column.",
       "show": "$\\begin{array}{c|cccccc|c} x & 1 & 0 & \\frac14 & -\\frac12 & 0 & 0 & 3\\\\ y & 0 & 1 & -\\frac18 & \\frac34 & 0 & 0 & \\frac32\\\\ s_3 & 0 & 0 & \\frac38 & -\\frac54 & 1 & 0 & \\frac52\\\\ s_4 & 0 & 0 & \\frac18 & -\\frac34 & 0 & 1 & \\frac12\\\\ P & 0 & 0 & \\frac34 & \\frac12 & 0 & 0 & 21\\end{array}$"
      },
      {
       "say": "No negative entries remain in the objective row, so this tableau is optimal.",
       "show": "Optimal"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "State the optimal solution and interpret the entry $\\frac34$ in the objective row under $s_1$.",
     "answer": "$x = 3$, $y = 1.5$, $P = 21$; each extra unit on the first constraint's limit raises $P$ by $0.75$",
     "ms": [
      "B1 $x = 3$, $y = 1.5$",
      "B1 $P = 21$",
      "B1 shadow price interpretation: $P$ increases by $\\frac34$ per unit increase in the right-hand side 24 (for small changes)"
     ],
     "steps": [
      {
       "say": "Read off the solution.",
       "show": "$x = 3,\\ y = 1.5,\\ P = 21$"
      },
      {
       "say": "The first two constraints are tight, since s 1 and s 2 are zero; s 3 is 2.5 and s 4 is 0.5.",
       "show": "$s_1 = s_2 = 0$"
      },
      {
       "say": "The objective row reads P equals 21 minus three quarters s 1 minus a half s 2. So relaxing the first limit from 24 by one unit would raise P by three quarters.",
       "show": "Shadow price $0.75$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 24,
   "points": [
    "f4_gf",
    "f4_sym",
    "f4_polya"
   ],
   "q": "<b>Section D · Discrete &amp; Decision</b><br>",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Explain why the number of ways of choosing $r$ items from $n$ types, with unlimited repetition, is the coefficient of $x^r$ in $(1-x)^{-n}$, and hence show it equals $\\binom{n+r-1}{r}$. Find the number of ways of choosing $3$ scoops of ice cream from $4$ flavours.",
     "answer": "$\\binom{n+r-1}{r}$; $20$",
     "ms": [
      "B1 each type contributes $1 + x + x^2 + \\dots = (1-x)^{-1}$",
      "M1 coefficient of $x^r$ in $(1-x)^{-n}$ via the binomial series",
      "A1 $\\binom{n+r-1}{r}$",
      "A1 $\\binom63 = 20$"
     ],
     "steps": [
      {
       "say": "Choosing k items of one type is represented by x to the k, so each type contributes 1 plus x plus x squared and so on, which is 1 over 1 minus x.",
       "show": "$\\left(\\frac{1}{1-x}\\right)^n = (1-x)^{-n}$"
      },
      {
       "say": "By the binomial series, the coefficient of x to the r in 1 minus x to the minus n is n times n plus 1 up to n plus r minus 1, over r factorial.",
       "show": "$\\frac{n(n+1)\\cdots(n+r-1)}{r!} = \\binom{n+r-1}{r}$"
      },
      {
       "say": "With n equals 4 and r equals 3.",
       "show": "$\\binom63 = 20$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "The rotation group of a cube acting on its six faces has cycle index $$\\frac{1}{24}\\left(x_1^6 + 6x_1^2x_4 + 3x_1^2x_2^2 + 6x_2^3 + 8x_3^2\\right).$$ Use Pólya's enumeration theorem to find the number of distinct colourings of the faces using (i) two colours (ii) three colours (iii) two colours with exactly three faces of each colour.",
     "answer": "(i) $10$ (ii) $57$ (iii) $2$",
     "ms": [
      "M1 substitute $x_i = 2$",
      "A1 $10$",
      "M1 substitute $x_i = 3$",
      "A1 $57$",
      "M1 coefficient of $b^3w^3$ in the pattern inventory: $20, 0, 12, 0, 16$",
      "A1 $2$"
     ],
     "steps": [
      {
       "say": "Two colours: set each x i to 2.",
       "show": "$\\frac{1}{24}(64 + 48 + 48 + 48 + 32) = \\frac{240}{24} = 10$"
      },
      {
       "say": "Three colours: set each x i to 3.",
       "show": "$\\frac{1}{24}(729 + 162 + 243 + 162 + 72) = \\frac{1368}{24} = 57$"
      },
      {
       "say": "For exactly three of each, substitute b to the k plus w to the k for x k and find the coefficient of b cubed w cubed in each term.",
       "show": "$(b+w)^6: 20;\\ (b+w)^2(b^4+w^4): 0;\\ (b+w)^2(b^2+w^2)^2: 4;\\ (b^2+w^2)^3: 0;\\ (b^3+w^3)^2: 2$"
      },
      {
       "say": "Weight by the coefficients and divide by 24.",
       "show": "$\\frac{20 + 0 + 3(4) + 0 + 8(2)}{24} = \\frac{48}{24} = 2$"
      },
      {
       "say": "The two are: three faces meeting at a corner, or three faces in a band.",
       "show": "Two colourings"
      }
     ]
    }
   ],
   "section": "D"
  }
 ],
 "sections": [
  {
   "id": "A",
   "title": "Section A: Mechanics 1",
   "marks": 75
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 75
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 75
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 75
  }
 ],
 "choose": {
  "count": 2,
  "routes": [
   [
    "A",
    "B"
   ],
   [
    "A",
    "C"
   ],
   [
    "A",
    "D"
   ],
   [
    "C",
    "D"
   ]
  ],
  "note": "Answer two sections: A and B, A and C, A and D, or C and D."
 }
});
