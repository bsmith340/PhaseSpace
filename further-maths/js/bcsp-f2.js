// BCS Academy original papers · not CCEA papers. Original practice questions in the style of CCEA GCE Further Mathematics Unit AS 2 (Applied Mathematics).
BCSP.add({
 "id": "f2-easy",
 "unit": "f2",
 "level": "easy",
 "title": "Further Maths AS 2 · Paper A (Easy)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f2_hooke",
    "f2_energy"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A light elastic string has natural length $0.8$ m and modulus of elasticity $24$ N. One end is fixed and a particle $P$ hangs in equilibrium from the other end, with an extension of $0.2$ m. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the tension in the string and the mass of $P$.",
     "answer": "$T = 6$ N, $m = 0.612$ kg",
     "ms": [
      "M1 $T = \\dfrac{\\lambda x}{l}$",
      "A1 $6$ N",
      "A1 $0.612$ kg"
     ],
     "steps": [
      {
       "say": "Hooke’s law: tension equals modulus times extension over natural length.",
       "show": "$T = \\dfrac{24 \\times 0.2}{0.8} = 6\\ \\mathrm{N}$"
      },
      {
       "say": "In equilibrium the tension balances the weight.",
       "show": "$mg = 6$"
      },
      {
       "say": "Divide by g.",
       "show": "$m = \\dfrac{6}{9.8} = 0.612\\ \\mathrm{kg}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the elastic potential energy stored in the string.",
     "answer": "$0.6$ J",
     "ms": [
      "M1 $\\dfrac{\\lambda x^2}{2l}$",
      "A1 $0.6$ J"
     ],
     "steps": [
      {
       "say": "Elastic potential energy is lambda x squared over two l.",
       "show": "$\\mathrm{EPE} = \\dfrac{\\lambda x^2}{2l}$"
      },
      {
       "say": "Substitute the values.",
       "show": "$= \\dfrac{24 \\times 0.2^2}{2 \\times 0.8}$"
      },
      {
       "say": "This is 0.6 joules.",
       "show": "$= 0.6\\ \\mathrm{J}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State two modelling assumptions you have made.",
     "answer": "e.g. the string is light; Hooke’s law holds (elastic limit not exceeded); air resistance is negligible; $P$ is a particle",
     "ms": [
      "B1 one valid assumption",
      "B1 a second valid assumption"
     ],
     "steps": [
      {
       "say": "The string is modelled as light, so its own weight is ignored.",
       "show": "light string"
      },
      {
       "say": "The string obeys Hooke’s law, which means the elastic limit is not exceeded.",
       "show": "within the elastic limit"
      },
      {
       "say": "Other valid answers: the particle has no size, and there is no air resistance.",
       "show": "particle; no air resistance"
      }
     ]
    },
    {
     "l": "d",
     "marks": 5,
     "q": "$P$ is pulled down a further $0.1$ m and released from rest. Find the speed of $P$ as it passes through the equilibrium position.",
     "answer": "$0.7\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 energy equation with EPE, GPE and KE",
      "B1 initial EPE $1.35$ J",
      "B1 GPE gain $0.6$ J",
      "M1 KE $= 1.35 - 0.6 - 0.6$",
      "A1 $0.7$"
     ],
     "steps": [
      {
       "say": "At release the extension is 0.3 metres, so the elastic energy is 1.35 joules.",
       "show": "$\\dfrac{24 \\times 0.3^2}{1.6} = 1.35\\ \\mathrm{J}$"
      },
      {
       "say": "At the equilibrium position the extension is 0.2 metres, so the elastic energy is 0.6 joules.",
       "show": "$0.6\\ \\mathrm{J}$"
      },
      {
       "say": "The particle has risen 0.1 metres, gaining potential energy m g times 0.1, which is 0.6 joules because m g is six newtons.",
       "show": "$\\Delta\\mathrm{GPE} = 6 \\times 0.1 = 0.6\\ \\mathrm{J}$"
      },
      {
       "say": "The kinetic energy is what is left over.",
       "show": "$\\tfrac12 mv^2 = 1.35 - 0.6 - 0.6 = 0.15$"
      },
      {
       "say": "Solve for v.",
       "show": "$v^2 = \\dfrac{0.3}{0.612} = 0.49 \\Rightarrow v = 0.7\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f2_power",
    "f2_work"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A car of mass $1200$ kg has an engine with maximum power $30$ kW. The resistance to motion is a constant $600$ N. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the maximum speed of the car on a level road.",
     "answer": "$50\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $\\dfrac{P}{v} = 600$",
      "A1 $50$"
     ],
     "steps": [
      {
       "say": "At maximum speed the acceleration is zero, so the driving force equals the resistance.",
       "show": "$F = 600$"
      },
      {
       "say": "Power equals force times speed.",
       "show": "$30\\,000 = 600v$"
      },
      {
       "say": "So v is fifty metres per second.",
       "show": "$v = 50\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the acceleration of the car on a level road at the instant its speed is $20\\ \\mathrm{m\\,s^{-1}}$ and the engine is working at maximum power.",
     "answer": "$0.75\\ \\mathrm{m\\,s^{-2}}$",
     "ms": [
      "M1 $F = \\dfrac{30\\,000}{20}$",
      "M1 $F - 600 = 1200a$",
      "A1 $0.75$"
     ],
     "steps": [
      {
       "say": "The driving force is power over speed.",
       "show": "$F = \\dfrac{30\\,000}{20} = 1500\\ \\mathrm{N}$"
      },
      {
       "say": "Apply Newton’s second law.",
       "show": "$1500 - 600 = 1200a$"
      },
      {
       "say": "So the acceleration is 0.75.",
       "show": "$a = 0.75\\ \\mathrm{m\\,s^{-2}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "The car climbs a hill inclined at $\\alpha$ to the horizontal, where $\\sin\\alpha = \\tfrac{1}{20}$, at a constant $15\\ \\mathrm{m\\,s^{-1}}$. The resistance is still $600$ N. Find the power of the engine.",
     "answer": "$17.8$ kW",
     "ms": [
      "M1 $F = 600 + mg\\sin\\alpha$",
      "A1 $1188$ N",
      "A1 $17.8$ kW"
     ],
     "steps": [
      {
       "say": "At constant speed the forces along the slope balance: driving force equals resistance plus the weight component.",
       "show": "$F = 600 + 1200 \\times 9.8 \\times \\tfrac{1}{20}$"
      },
      {
       "say": "That is 1188 newtons.",
       "show": "$F = 1188\\ \\mathrm{N}$"
      },
      {
       "say": "Multiply by the speed.",
       "show": "$P = 1188 \\times 15 = 17\\,820\\ \\mathrm{W} \\approx 17.8\\ \\mathrm{kW}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "A different particle moves along the $x$-axis under a force of $(3x^2 + 2)$ N acting in the positive $x$-direction. Find the work done by the force as the particle moves from $x = 0$ to $x = 2$.",
     "answer": "$12$ J",
     "ms": [
      "M1 $\\int F\\,\\mathrm{d}x$",
      "A1 $x^3 + 2x$",
      "A1 $12$"
     ],
     "steps": [
      {
       "say": "For a variable force, work done is the integral of F with respect to x.",
       "show": "$W = \\displaystyle\\int_0^2 (3x^2 + 2)\\,\\mathrm{d}x$"
      },
      {
       "say": "Integrate.",
       "show": "$= \\left[x^3 + 2x\\right]_0^2$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 8 + 4 = 12\\ \\mathrm{J}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f2_energy",
    "f2_work",
    "f2_power"
   ],
   "q": "<b>Section A (Mechanics 1)</b>  Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "A particle of mass $2$ kg is released from rest at the top of a rough slope of length $5$ m inclined at $30^\\circ$ to the horizontal. Find the loss in gravitational potential energy as it slides to the bottom.",
     "answer": "$49$ J",
     "ms": [
      "M1 height $5\\sin30^\\circ = 2.5$",
      "A1 $49$ J"
     ],
     "steps": [
      {
       "say": "The vertical drop is the slope length times sine thirty degrees.",
       "show": "$h = 5\\sin30^\\circ = 2.5\\ \\mathrm{m}$"
      },
      {
       "say": "Loss of potential energy is m g h.",
       "show": "$2 \\times 9.8 \\times 2.5$"
      },
      {
       "say": "That is forty nine joules.",
       "show": "$49\\ \\mathrm{J}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "The frictional force is constant and equal to $4$ N. Use the work-energy principle to find the speed of the particle at the bottom of the slope.",
     "answer": "$\\sqrt{29} \\approx 5.39\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "B1 work against friction $20$ J",
      "M1 $\\tfrac12(2)v^2 = 49 - 20$",
      "A1 $5.39$"
     ],
     "steps": [
      {
       "say": "The work done against friction is force times distance.",
       "show": "$4 \\times 5 = 20\\ \\mathrm{J}$"
      },
      {
       "say": "The kinetic energy gained is the potential energy lost minus the work against friction.",
       "show": "$\\tfrac12 \\times 2 \\times v^2 = 49 - 20 = 29$"
      },
      {
       "say": "So v squared is twenty nine.",
       "show": "$v = \\sqrt{29} \\approx 5.39\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "A constant force $\\mathbf{F} = (3\\mathbf{i} + 4\\mathbf{j})$ N moves a particle from the point $(1, 2)$ to the point $(5, 5)$, distances in metres. Find the work done by $\\mathbf{F}$.",
     "answer": "$24$ J",
     "ms": [
      "B1 displacement $4\\mathbf{i} + 3\\mathbf{j}$",
      "M1 $\\mathbf{F}\\cdot\\mathbf{d}$",
      "A1 $24$"
     ],
     "steps": [
      {
       "say": "Find the displacement vector.",
       "show": "$\\mathbf{d} = (5 - 1)\\mathbf{i} + (5 - 2)\\mathbf{j} = 4\\mathbf{i} + 3\\mathbf{j}$"
      },
      {
       "say": "Work done is the scalar product of force and displacement.",
       "show": "$W = \\mathbf{F}\\cdot\\mathbf{d} = 3 \\times 4 + 4 \\times 3$"
      },
      {
       "say": "So the work done is twenty four joules.",
       "show": "$W = 24\\ \\mathrm{J}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "A pump raises water from a tank and ejects it at a point $8$ m above the water surface with speed $4\\ \\mathrm{m\\,s^{-1}}$. The pump lifts $0.05\\ \\mathrm{m^3}$ of water each second. The density of water is $1000\\ \\mathrm{kg\\,m^{-3}}$. Find the useful power of the pump.",
     "answer": "$4.32$ kW",
     "ms": [
      "B1 $50$ kg per second",
      "M1 PE per second $50 \\times 9.8 \\times 8$",
      "M1 KE per second $\\tfrac12 \\times 50 \\times 4^2$",
      "A1 $4320$ W"
     ],
     "steps": [
      {
       "say": "Each second the pump moves 0.05 cubic metres, which is fifty kilograms of water.",
       "show": "$0.05 \\times 1000 = 50\\ \\mathrm{kg\\,s^{-1}}$"
      },
      {
       "say": "Potential energy given each second.",
       "show": "$50 \\times 9.8 \\times 8 = 3920\\ \\mathrm{J}$"
      },
      {
       "say": "Kinetic energy given each second.",
       "show": "$\\tfrac12 \\times 50 \\times 4^2 = 400\\ \\mathrm{J}$"
      },
      {
       "say": "Power is energy per second, so add them.",
       "show": "$P = 3920 + 400 = 4320\\ \\mathrm{W} = 4.32\\ \\mathrm{kW}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f2_circ",
    "f2_conical"
   ],
   "q": "<b>Section A (Mechanics 1)</b>  Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A particle of mass $0.3$ kg is attached to one end of a light inextensible string of length $0.5$ m. The other end is fixed to a point on a smooth horizontal table. The particle moves in a horizontal circle on the table, making $2$ revolutions per second. Find its angular speed, its speed and the tension in the string.",
     "answer": "$\\omega = 4\\pi\\ \\mathrm{rad\\,s^{-1}}$, $v = 2\\pi \\approx 6.28\\ \\mathrm{m\\,s^{-1}}$, $T = 2.4\\pi^2 \\approx 23.7$ N",
     "ms": [
      "B1 $\\omega = 4\\pi$",
      "B1 $v = r\\omega = 2\\pi$",
      "M1 $T = mr\\omega^2$",
      "A1 $2.4\\pi^2$",
      "A1 $23.7$ N"
     ],
     "steps": [
      {
       "say": "Each revolution is two pi radians, so two revolutions per second is four pi radians per second.",
       "show": "$\\omega = 2 \\times 2\\pi = 4\\pi\\ \\mathrm{rad\\,s^{-1}}$"
      },
      {
       "say": "Speed is radius times angular speed.",
       "show": "$v = 0.5 \\times 4\\pi = 2\\pi \\approx 6.28\\ \\mathrm{m\\,s^{-1}}$"
      },
      {
       "say": "The tension provides the force towards the centre.",
       "show": "$T = mr\\omega^2 = 0.3 \\times 0.5 \\times 16\\pi^2$"
      },
      {
       "say": "That is 2.4 pi squared, about 23.7 newtons.",
       "show": "$T = 2.4\\pi^2 \\approx 23.7\\ \\mathrm{N}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "A conical pendulum consists of a particle of mass $0.4$ kg on a light inextensible string of length $1.2$ m. The particle moves in a horizontal circle with the string at $30^\\circ$ to the vertical. Find the tension in the string and the angular speed of the particle.",
     "answer": "$T = 4.53$ N, $\\omega = 3.07\\ \\mathrm{rad\\,s^{-1}}$",
     "ms": [
      "M1 resolves vertically $T\\cos30^\\circ = mg$",
      "A1 $4.53$ N",
      "B1 radius $1.2\\sin30^\\circ = 0.6$",
      "M1 $T\\sin30^\\circ = mr\\omega^2$",
      "M1 solves for $\\omega$",
      "A1 $3.07$"
     ],
     "steps": [
      {
       "say": "There is no vertical acceleration, so the vertical component of tension balances the weight.",
       "show": "$T\\cos30^\\circ = 0.4 \\times 9.8$"
      },
      {
       "say": "So the tension is about 4.53 newtons.",
       "show": "$T = \\dfrac{3.92}{\\cos30^\\circ} = 4.53\\ \\mathrm{N}$"
      },
      {
       "say": "The radius of the circle is the string length times sine thirty degrees.",
       "show": "$r = 1.2\\sin30^\\circ = 0.6\\ \\mathrm{m}$"
      },
      {
       "say": "Horizontally, the tension component gives the central acceleration.",
       "show": "$T\\sin30^\\circ = 0.4 \\times 0.6 \\times \\omega^2$"
      },
      {
       "say": "Solve for omega.",
       "show": "$\\omega^2 = \\dfrac{2.263}{0.24} = 9.43 \\Rightarrow \\omega = 3.07\\ \\mathrm{rad\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A car travels round a bend on a smooth road banked at $15^\\circ$ to the horizontal. The car moves in a horizontal circle of radius $80$ m. Find the speed at which the car can travel round the bend.",
     "answer": "$14.5\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $R\\cos15^\\circ = mg$",
      "M1 $R\\sin15^\\circ = \\dfrac{mv^2}{r}$",
      "M1 $v^2 = rg\\tan15^\\circ$",
      "A1 $14.5$"
     ],
     "steps": [
      {
       "say": "On a smooth banked road the only forces are the weight and the normal reaction.",
       "show": "$R\\cos15^\\circ = mg$"
      },
      {
       "say": "The horizontal component of the reaction provides the central force.",
       "show": "$R\\sin15^\\circ = \\dfrac{mv^2}{80}$"
      },
      {
       "say": "Divide the equations to eliminate R and m.",
       "show": "$\\tan15^\\circ = \\dfrac{v^2}{80g}$"
      },
      {
       "say": "Solve for v.",
       "show": "$v^2 = 80 \\times 9.8 \\times \\tan15^\\circ = 210.1 \\Rightarrow v = 14.5\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f2_dim"
   ],
   "q": "<b>Section B (Mechanics 2)</b> Use $M$, $L$ and $T$ for the dimensions of mass, length and time.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Write down the dimensions of force and of power.",
     "answer": "$[F] = MLT^{-2}$, $[P] = ML^2T^{-3}$",
     "ms": [
      "B1 $MLT^{-2}$",
      "B1 $ML^2T^{-3}$"
     ],
     "steps": [
      {
       "say": "Force is mass times acceleration.",
       "show": "$[F] = M \\times LT^{-2} = MLT^{-2}$"
      },
      {
       "say": "Power is force times velocity.",
       "show": "$[P] = MLT^{-2} \\times LT^{-1}$"
      },
      {
       "say": "So power has dimensions M L squared T to the minus three.",
       "show": "$[P] = ML^2T^{-3}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Show that the equation $v^2 = u^2 + 2as$ is dimensionally consistent.",
     "answer": "Each term has dimensions $L^2T^{-2}$",
     "ms": [
      "M1 finds dimensions of each term",
      "A1 all $L^2T^{-2}$"
     ],
     "steps": [
      {
       "say": "The left side is a velocity squared.",
       "show": "$[v^2] = L^2T^{-2}$"
      },
      {
       "say": "On the right, u squared is the same, and a times s is acceleration times length.",
       "show": "$[as] = LT^{-2} \\times L = L^2T^{-2}$"
      },
      {
       "say": "Every term has the same dimensions, so the equation is consistent. The number two is dimensionless.",
       "show": "consistent"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "The period $t$ of a simple pendulum is thought to depend on the mass $m$ of the bob, the length $l$ of the string and $g$, in the form $t = km^\\alpha l^\\beta g^\\gamma$, where $k$ is a dimensionless constant. Find $\\alpha$, $\\beta$ and $\\gamma$.",
     "answer": "$\\alpha = 0,\\ \\beta = \\tfrac12,\\ \\gamma = -\\tfrac12$",
     "ms": [
      "M1 sets up $T = M^\\alpha L^\\beta (LT^{-2})^\\gamma$",
      "M1 equates powers of $M$, $L$, $T$",
      "A1 $\\gamma = -\\tfrac12$",
      "A1 $\\alpha = 0,\\ \\beta = \\tfrac12$"
     ],
     "steps": [
      {
       "say": "Write the dimensions of each side.",
       "show": "$T = M^\\alpha L^\\beta (LT^{-2})^\\gamma$"
      },
      {
       "say": "Compare the powers of M, L and T.",
       "show": "$M: \\alpha = 0,\\quad L: \\beta + \\gamma = 0,\\quad T: -2\\gamma = 1$"
      },
      {
       "say": "So gamma is minus one half and beta is one half.",
       "show": "$\\gamma = -\\tfrac12,\\ \\beta = \\tfrac12$"
      },
      {
       "say": "The period does not depend on the mass at all.",
       "show": "$t = k\\sqrt{\\dfrac{l}{g}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 6,
   "points": [
    "f2_resv",
    "f2_relv"
   ],
   "q": "<b>Section B (Mechanics 2)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A river is $30$ m wide and flows at $1.5\\ \\mathrm{m\\,s^{-1}}$ between straight parallel banks. A boat that can travel at $4\\ \\mathrm{m\\,s^{-1}}$ in still water is steered perpendicular to the banks. Find the resultant speed of the boat, the time to cross, and how far downstream it lands.",
     "answer": "$4.27\\ \\mathrm{m\\,s^{-1}}$; $7.5$ s; $11.25$ m",
     "ms": [
      "M1 Pythagoras for resultant",
      "A1 $4.27$",
      "M1 time $= 30 \\div 4$",
      "A1 $7.5$ s",
      "A1 $11.25$ m"
     ],
     "steps": [
      {
       "say": "The resultant velocity is the boat velocity plus the current velocity. These are at right angles.",
       "show": "$v = \\sqrt{4^2 + 1.5^2} = 4.27\\ \\mathrm{m\\,s^{-1}}$"
      },
      {
       "say": "Only the component across the river, four metres per second, gets the boat across.",
       "show": "$t = \\dfrac{30}{4} = 7.5\\ \\mathrm{s}$"
      },
      {
       "say": "Meanwhile the current carries it downstream.",
       "show": "$1.5 \\times 7.5 = 11.25\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Two ships $A$ and $B$ have velocities $(3\\mathbf{i} + 4\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$ and $(-\\mathbf{i} + 2\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$ respectively. Find the velocity of $A$ relative to $B$.",
     "answer": "$(4\\mathbf{i} + 2\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$",
     "ms": [
      "M1 $\\mathbf{v}_A - \\mathbf{v}_B$",
      "A1 $4\\mathbf{i} + 2\\mathbf{j}$"
     ],
     "steps": [
      {
       "say": "The velocity of A relative to B is A’s velocity minus B’s velocity.",
       "show": "$\\mathbf{v}_A - \\mathbf{v}_B$ is the velocity of $A$ relative to $B$: $\\mathbf{v}_{AB} = \\mathbf{v}_A - \\mathbf{v}_B$"
      },
      {
       "say": "Subtract the components.",
       "show": "$(3 + 1)\\mathbf{i} + (4 - 2)\\mathbf{j}$"
      },
      {
       "say": "So the relative velocity is four i plus two j.",
       "show": "$4\\mathbf{i} + 2\\mathbf{j}\\ \\mathrm{km\\,h^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "At noon $A$ is at the origin and $B$ is at the point with position vector $(8\\mathbf{i} + 6\\mathbf{j})$ km. Find the time at which the ships are closest together and their least distance apart.",
     "answer": "$14{:}12$ (after $2.2$ h); $1.79$ km",
     "ms": [
      "M1 relative position $\\mathbf{r}_A - \\mathbf{r}_B = (-8 + 4t)\\mathbf{i} + (-6 + 2t)\\mathbf{j}$",
      "M1 minimises $d^2$ (or uses perpendicular condition)",
      "A1 $t = 2.2$",
      "A1 $14{:}12$",
      "M1 substitutes $t$",
      "A1 $1.79$ km"
     ],
     "steps": [
      {
       "say": "Find the position of A relative to B after t hours.",
       "show": "$\\mathbf{r}_A - \\mathbf{r}_B = (-8 + 4t)\\mathbf{i} + (-6 + 2t)\\mathbf{j}$"
      },
      {
       "say": "Square the distance.",
       "show": "$d^2 = (4t - 8)^2 + (2t - 6)^2$"
      },
      {
       "say": "Differentiate and set to zero.",
       "show": "$8(4t - 8) + 4(2t - 6) = 0 \\Rightarrow 40t = 88 \\Rightarrow t = 2.2$"
      },
      {
       "say": "2.2 hours is two hours twelve minutes after noon.",
       "show": "$14{:}12$"
      },
      {
       "say": "Substitute to find the least distance.",
       "show": "$d = \\sqrt{0.8^2 + (-1.6)^2} = \\sqrt{3.2} = 1.79\\ \\mathrm{km}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 7,
   "points": [
    "f2_vcirc"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A particle of mass $0.5$ kg is attached to a light inextensible string of length $0.8$ m and moves in a vertical circle about the fixed end $O$. At the lowest point its speed is $7\\ \\mathrm{m\\,s^{-1}}$. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the speed of the particle at the highest point.",
     "answer": "$4.2\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 energy with height $1.6$ m",
      "A1 $v^2 = 17.64$",
      "A1 $4.2$"
     ],
     "steps": [
      {
       "say": "Use conservation of energy between the lowest and highest points. The particle rises two radii, 1.6 metres.",
       "show": "$\\tfrac12 m(7^2) = \\tfrac12 mv^2 + mg(1.6)$"
      },
      {
       "say": "Cancel m and rearrange.",
       "show": "$v^2 = 49 - 2 \\times 9.8 \\times 1.6 = 17.64$"
      },
      {
       "say": "So the speed at the top is 4.2.",
       "show": "$v = 4.2\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the tension in the string when the particle is at the highest point.",
     "answer": "$6.125$ N",
     "ms": [
      "M1 $T + mg = \\dfrac{mv^2}{r}$",
      "A1 correct substitution",
      "A1 $6.13$ N"
     ],
     "steps": [
      {
       "say": "At the top, both the tension and the weight act downwards, towards the centre.",
       "show": "$T + mg = \\dfrac{mv^2}{r}$"
      },
      {
       "say": "Substitute the values.",
       "show": "$T = \\dfrac{0.5 \\times 17.64}{0.8} - 0.5 \\times 9.8$"
      },
      {
       "say": "This gives about 6.13 newtons.",
       "show": "$T = 11.025 - 4.9 = 6.125\\ \\mathrm{N}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the tension in the string when the particle is at the lowest point.",
     "answer": "$35.5$ N",
     "ms": [
      "M1 $T - mg = \\dfrac{mu^2}{r}$",
      "A1 $35.5$ N"
     ],
     "steps": [
      {
       "say": "At the bottom the tension acts up towards the centre and the weight acts down.",
       "show": "$T - mg = \\dfrac{mu^2}{r}$"
      },
      {
       "say": "Substitute.",
       "show": "$T = \\dfrac{0.5 \\times 49}{0.8} + 4.9$"
      },
      {
       "say": "The tension is about 35.5 newtons.",
       "show": "$T = 35.525 \\approx 35.5\\ \\mathrm{N}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the least speed at the lowest point for which the particle would complete full circles.",
     "answer": "$\\sqrt{5gr} = 6.26\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $T \\ge 0$ at top gives $v^2 \\ge gr$",
      "M1 $u^2 = v^2 + 4gr$",
      "A1 $6.26$"
     ],
     "steps": [
      {
       "say": "The string must stay taut at the top, so the tension there must be at least zero. That needs v squared at least g r.",
       "show": "$v_{\\text{top}}^2 \\ge gr$"
      },
      {
       "say": "Energy links the speeds at the bottom and the top.",
       "show": "$u^2 = v_{\\text{top}}^2 + 4gr \\ge 5gr$"
      },
      {
       "say": "Substitute r equals 0.8.",
       "show": "$u = \\sqrt{5 \\times 9.8 \\times 0.8} = \\sqrt{39.2} = 6.26\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f2_grav"
   ],
   "q": "<b>Section B (Mechanics 2)</b> Take $G = 6.67 \\times 10^{-11}\\ \\mathrm{N\\,m^2\\,kg^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the magnitude of the gravitational force between two particles of masses $50$ kg and $80$ kg which are $2$ m apart.",
     "answer": "$6.67 \\times 10^{-8}$ N",
     "ms": [
      "M1 $F = \\dfrac{Gm_1m_2}{d^2}$",
      "A1 $6.67 \\times 10^{-8}$"
     ],
     "steps": [
      {
       "say": "Use Newton’s law of gravitation.",
       "show": "$F = \\dfrac{Gm_1m_2}{d^2}$"
      },
      {
       "say": "Substitute.",
       "show": "$F = \\dfrac{6.67 \\times 10^{-11} \\times 50 \\times 80}{2^2}$"
      },
      {
       "say": "The force is tiny.",
       "show": "$F = 6.67 \\times 10^{-8}\\ \\mathrm{N}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "A satellite moves in a circular orbit of radius $r$ about the centre of the Earth, which has mass $M$. Show that the period of the orbit is given by $T^2 = \\dfrac{4\\pi^2r^3}{GM}$.",
     "answer": "$\\dfrac{GMm}{r^2} = mr\\omega^2$ with $\\omega = \\dfrac{2\\pi}{T}$",
     "ms": [
      "M1 gravitational force provides central force",
      "M1 $mr\\omega^2$ or $\\dfrac{mv^2}{r}$",
      "M1 $\\omega = \\dfrac{2\\pi}{T}$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "Gravity provides the force towards the centre.",
       "show": "$\\dfrac{GMm}{r^2} = mr\\omega^2$"
      },
      {
       "say": "The period is the time for one revolution, so omega is two pi over T.",
       "show": "$\\omega = \\dfrac{2\\pi}{T}$"
      },
      {
       "say": "Substitute and cancel m.",
       "show": "$\\dfrac{GM}{r^2} = r\\dfrac{4\\pi^2}{T^2}$"
      },
      {
       "say": "Rearrange.",
       "show": "$T^2 = \\dfrac{4\\pi^2r^3}{GM}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "A geostationary satellite has a period of $24$ hours. Taking $GM = 3.99 \\times 10^{14}\\ \\mathrm{m^3\\,s^{-2}}$, find the radius of its orbit.",
     "answer": "$4.23 \\times 10^7$ m",
     "ms": [
      "B1 $T = 86\\,400$ s",
      "M1 $r^3 = \\dfrac{GMT^2}{4\\pi^2}$",
      "A1 $4.23 \\times 10^7$ m"
     ],
     "steps": [
      {
       "say": "Convert the period into seconds.",
       "show": "$T = 24 \\times 3600 = 86\\,400\\ \\mathrm{s}$"
      },
      {
       "say": "Rearrange the formula for r cubed.",
       "show": "$r^3 = \\dfrac{3.99 \\times 10^{14} \\times 86\\,400^2}{4\\pi^2}$"
      },
      {
       "say": "Take the cube root.",
       "show": "$r = 4.23 \\times 10^7\\ \\mathrm{m}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f2_equil",
    "f2_hooke"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A particle of mass $2$ kg rests on a rough plane inclined at $30^\\circ$ to the horizontal. The coefficient of friction is $0.25$. The particle is attached to one end of a light elastic string of natural length $1$ m and modulus $40$ N; the other end is fixed to a point $A$ on the plane, up the line of greatest slope from the particle. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "The particle is in limiting equilibrium, on the point of slipping down the plane. Find the length of the string.",
     "answer": "$1.14$ m",
     "ms": [
      "M1 $R = mg\\cos30^\\circ$",
      "A1 $F = 4.24$ N",
      "M1 resolves along the plane $T + F = mg\\sin30^\\circ$",
      "A1 $T = 5.56$ N",
      "M1 Hooke’s law for $x$",
      "A1 $1.14$ m"
     ],
     "steps": [
      {
       "say": "Resolve perpendicular to the plane.",
       "show": "$R = 2 \\times 9.8 \\cos30^\\circ = 16.97\\ \\mathrm{N}$"
      },
      {
       "say": "Limiting friction is mu R. It acts up the plane, because the particle is about to slip down.",
       "show": "$F = 0.25 \\times 16.97 = 4.24\\ \\mathrm{N}$"
      },
      {
       "say": "Resolve along the plane: tension plus friction balance the weight component.",
       "show": "$T + 4.24 = 2 \\times 9.8 \\sin30^\\circ = 9.8$"
      },
      {
       "say": "So the tension is about 5.56 newtons.",
       "show": "$T = 5.56\\ \\mathrm{N}$"
      },
      {
       "say": "Use Hooke’s law to find the extension, then add the natural length.",
       "show": "$x = \\dfrac{5.56 \\times 1}{40} = 0.139 \\Rightarrow AP = 1.14\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the length of the string when the particle is on the point of slipping up the plane.",
     "answer": "$1.35$ m",
     "ms": [
      "M1 friction now acts down the plane",
      "A1 $T = 14.04$ N",
      "A1 $1.35$ m"
     ],
     "steps": [
      {
       "say": "Now friction acts down the plane, helping the weight component.",
       "show": "$T = 9.8 + 4.24 = 14.04\\ \\mathrm{N}$"
      },
      {
       "say": "Find the extension.",
       "show": "$x = \\dfrac{14.04}{40} = 0.351\\ \\mathrm{m}$"
      },
      {
       "say": "So the length is about 1.35 metres.",
       "show": "$AP = 1.35\\ \\mathrm{m}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f2_samp"
   ],
   "q": "<b>Section C (Statistics)</b> A school has 240 boys and 360 girls. The principal wants a sample of 50 pupils to complete a survey.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Describe how a stratified sample of 50 pupils could be taken.",
     "answer": "20 boys and 30 girls, each chosen by simple random sampling within the stratum",
     "ms": [
      "M1 proportional allocation",
      "A1 20 boys, 30 girls",
      "B1 random selection within each stratum"
     ],
     "steps": [
      {
       "say": "In a stratified sample each group is represented in proportion to its size.",
       "show": "$\\dfrac{240}{600} \\times 50 = 20,\\quad \\dfrac{360}{600} \\times 50 = 30$"
      },
      {
       "say": "So choose twenty boys and thirty girls.",
       "show": "20 boys, 30 girls"
      },
      {
       "say": "Within each group, number the pupils and use random numbers to choose the required number.",
       "show": "simple random sample within each stratum"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Give one advantage and one disadvantage of using an opportunity sample instead.",
     "answer": "Advantage: quick, easy, cheap. Disadvantage: unlikely to be representative / biased",
     "ms": [
      "B1 advantage",
      "B1 disadvantage"
     ],
     "steps": [
      {
       "say": "An opportunity sample uses whoever is available, such as the first fifty pupils through the door.",
       "show": "opportunity sample"
      },
      {
       "say": "It is quick, cheap and convenient.",
       "show": "advantage: convenient"
      },
      {
       "say": "But it is unlikely to be representative, for example it might contain pupils from only one year group.",
       "show": "disadvantage: likely biased"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Explain the main difference between quota sampling and stratified sampling.",
     "answer": "Both fill fixed numbers from each group, but quota sampling does not select randomly within groups",
     "ms": [
      "B1 both use groups with set numbers",
      "B1 quota is non-random within groups"
     ],
     "steps": [
      {
       "say": "Both methods divide the population into groups and decide how many to take from each.",
       "show": "groups with set numbers"
      },
      {
       "say": "In stratified sampling the members of each group are chosen at random.",
       "show": "random within strata"
      },
      {
       "say": "In quota sampling the interviewer chooses anyone who fits the group until the quota is filled, so it is not random.",
       "show": "quota: not random"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 11,
   "points": [
    "f2_perm",
    "f2_pprob"
   ],
   "q": "<b>Section C (Statistics)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the number of different arrangements of the letters of the word PARABOLA.",
     "answer": "$6720$",
     "ms": [
      "M1 $\\dfrac{8!}{3!}$",
      "A1 $6720$"
     ],
     "steps": [
      {
       "say": "There are eight letters, with the letter A appearing three times.",
       "show": "8 letters, A three times"
      },
      {
       "say": "Divide eight factorial by three factorial for the repeated A.",
       "show": "$\\dfrac{8!}{3!}$"
      },
      {
       "say": "That is 6720.",
       "show": "$6720$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the number of these arrangements in which the three As are all together.",
     "answer": "$720$",
     "ms": [
      "M1 treats AAA as one block",
      "A1 $720$"
     ],
     "steps": [
      {
       "say": "Glue the three As together into a single block.",
       "show": "$[\\mathrm{AAA}],\\ \\mathrm{P},\\ \\mathrm{R},\\ \\mathrm{B},\\ \\mathrm{O},\\ \\mathrm{L}$"
      },
      {
       "say": "That gives six distinct items to arrange.",
       "show": "$6!$"
      },
      {
       "say": "So there are 720 arrangements.",
       "show": "$720$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A committee of 5 is chosen from 6 men and 4 women. Find the total number of possible committees, and the number that contain at least 2 women.",
     "answer": "$252$; $186$",
     "ms": [
      "B1 $\\binom{10}{5} = 252$",
      "M1 subtracts cases with $0$ or $1$ woman",
      "A1 $6 + 60$",
      "A1 $186$"
     ],
     "steps": [
      {
       "say": "Choose any five from ten people.",
       "show": "$\\binom{10}{5} = 252$"
      },
      {
       "say": "It is easier to subtract the committees with fewer than two women. With no women, choose five men.",
       "show": "$\\binom65 = 6$"
      },
      {
       "say": "With exactly one woman, choose one woman and four men.",
       "show": "$\\binom41\\binom64 = 4 \\times 15 = 60$"
      },
      {
       "say": "Subtract.",
       "show": "$252 - 6 - 60 = 186$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "The committee is chosen at random. Find the probability that it contains exactly 2 women.",
     "answer": "$\\tfrac{10}{21}$",
     "ms": [
      "M1 $\\dfrac{\\binom42\\binom63}{252}$",
      "A1 $\\tfrac{10}{21}$"
     ],
     "steps": [
      {
       "say": "Count committees with two women and three men.",
       "show": "$\\binom42\\binom63 = 6 \\times 20 = 120$"
      },
      {
       "say": "Divide by the total number of committees.",
       "show": "$\\dfrac{120}{252}$"
      },
      {
       "say": "Simplify.",
       "show": "$\\dfrac{10}{21} \\approx 0.476$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 12,
   "points": [
    "f2_drv"
   ],
   "q": "<b>Section C (Statistics)</b> The discrete random variable $X$ has probability function $\\mathrm{P}(X = x) = kx$ for $x = 1, 2, 3, 4$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the value of $k$.",
     "answer": "$k = \\tfrac{1}{10}$",
     "ms": [
      "M1 sum of probabilities $= 1$",
      "A1 $\\tfrac{1}{10}$"
     ],
     "steps": [
      {
       "say": "The probabilities must add up to one.",
       "show": "$k + 2k + 3k + 4k = 1$"
      },
      {
       "say": "So ten k equals one.",
       "show": "$10k = 1$"
      },
      {
       "say": "k is one tenth.",
       "show": "$k = \\tfrac{1}{10}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find $\\mathrm{E}(X)$ and $\\mathrm{Var}(X)$.",
     "answer": "$\\mathrm{E}(X) = 3$, $\\mathrm{Var}(X) = 1$",
     "ms": [
      "M1 $\\sum x\\,\\mathrm{P}(X = x)$",
      "A1 $3$",
      "M1 $\\mathrm{E}(X^2) = 10$",
      "M1 $\\mathrm{E}(X^2) - [\\mathrm{E}(X)]^2$",
      "A1 $1$"
     ],
     "steps": [
      {
       "say": "The expectation is the sum of x times its probability.",
       "show": "$\\mathrm{E}(X) = \\tfrac{1}{10}(1 + 4 + 9 + 16) = 3$"
      },
      {
       "say": "Now find the expectation of x squared.",
       "show": "$\\mathrm{E}(X^2) = \\tfrac{1}{10}(1 + 8 + 27 + 64) = 10$"
      },
      {
       "say": "The variance is the mean of the squares minus the square of the mean.",
       "show": "$\\mathrm{Var}(X) = 10 - 3^2 = 1$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find $\\mathrm{E}(3X - 2)$ and $\\mathrm{Var}(3X - 2)$.",
     "answer": "$7$ and $9$",
     "ms": [
      "B1 $\\mathrm{E}(3X - 2) = 7$",
      "B1 $\\mathrm{Var}(3X - 2) = 9$"
     ],
     "steps": [
      {
       "say": "Expectation is linear.",
       "show": "$\\mathrm{E}(3X - 2) = 3 \\times 3 - 2 = 7$"
      },
      {
       "say": "For variance, the multiplier is squared and the constant has no effect.",
       "show": "$\\mathrm{Var}(3X - 2) = 3^2 \\times 1$"
      },
      {
       "say": "So the variance is nine.",
       "show": "$9$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 13,
   "points": [
    "f2_geo",
    "f2_pois"
   ],
   "q": "<b>Section C (Statistics)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A fair die is rolled repeatedly until a six is obtained. $X$ is the number of rolls needed. Find $\\mathrm{P}(X = 4)$, $\\mathrm{P}(X > 3)$ and $\\mathrm{E}(X)$.",
     "answer": "$0.0965$; $0.579$; $6$",
     "ms": [
      "M1 $\\left(\\tfrac56\\right)^3\\tfrac16$",
      "A1 $0.0965$",
      "M1 $\\left(\\tfrac56\\right)^3$",
      "A1 $0.579$",
      "B1 $6$"
     ],
     "steps": [
      {
       "say": "X has a geometric distribution with p equal to one sixth.",
       "show": "$X \\sim \\mathrm{Geo}\\left(\\tfrac16\\right)$"
      },
      {
       "say": "Four rolls means three failures then a success.",
       "show": "$\\mathrm{P}(X = 4) = \\left(\\tfrac56\\right)^3\\tfrac16 = \\tfrac{125}{1296} = 0.0965$"
      },
      {
       "say": "More than three rolls means the first three are all failures.",
       "show": "$\\mathrm{P}(X > 3) = \\left(\\tfrac56\\right)^3 = 0.579$"
      },
      {
       "say": "The mean of a geometric distribution is one over p.",
       "show": "$\\mathrm{E}(X) = 6$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "Emails arrive in an inbox at random at an average rate of 2.5 per hour. Find the probability that (i) exactly 3 arrive in one hour, (ii) at most 1 arrives in one hour, (iii) at least 2 arrive in a two-hour period.",
     "answer": "(i) $0.214$ (ii) $0.287$ (iii) $0.960$",
     "ms": [
      "M1 Poisson with $\\lambda = 2.5$",
      "A1 $0.214$",
      "M1 $\\mathrm{e}^{-2.5}(1 + 2.5)$",
      "A1 $0.287$",
      "B1 $\\lambda = 5$ for two hours",
      "M1 $1 - \\mathrm{e}^{-5}(1 + 5)$",
      "A1 $0.960$"
     ],
     "steps": [
      {
       "say": "The number of emails in an hour follows a Poisson distribution with mean 2.5.",
       "show": "$X \\sim \\mathrm{Po}(2.5)$"
      },
      {
       "say": "Use the Poisson formula for three.",
       "show": "$\\mathrm{P}(X = 3) = \\dfrac{\\mathrm{e}^{-2.5}2.5^3}{3!} = 0.214$"
      },
      {
       "say": "At most one means zero or one.",
       "show": "$\\mathrm{P}(X \\le 1) = \\mathrm{e}^{-2.5}(1 + 2.5) = 0.287$"
      },
      {
       "say": "For two hours, the mean doubles to five.",
       "show": "$Y \\sim \\mathrm{Po}(5)$"
      },
      {
       "say": "Use the complement.",
       "show": "$\\mathrm{P}(Y \\ge 2) = 1 - \\mathrm{e}^{-5}(1 + 5) = 0.960$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f2_pmcc",
    "f2_reg"
   ],
   "q": "<b>Section C (Statistics)</b> A teacher records the number of hours of practice, $x$, and the test score out of 30, $y$, for 8 students. The summary statistics are\n$$n = 8,\\ \\textstyle\\sum x = 40,\\ \\sum y = 96,\\ \\sum x^2 = 240,\\ \\sum y^2 = 1250,\\ \\sum xy = 530.$$",
   "parts": [
    {
     "l": "a",
     "marks": 1,
     "q": "State which variable is the explanatory variable.",
     "answer": "$x$, the hours of practice",
     "ms": [
      "B1 hours of practice"
     ],
     "steps": [
      {
       "say": "The explanatory variable is the one that is set or controlled and may explain changes in the other.",
       "show": "explanatory variable"
      },
      {
       "say": "Here the hours of practice may explain the score.",
       "show": "$x$"
      },
      {
       "say": "The score is the response variable.",
       "show": "response: $y$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Calculate the product-moment correlation coefficient.",
     "answer": "$r = 0.799$",
     "ms": [
      "M1 $S_{xx} = 40$ and $S_{yy} = 98$",
      "M1 $S_{xy} = 50$",
      "A1 $0.799$"
     ],
     "steps": [
      {
       "say": "Calculate S x x and S y y.",
       "show": "$S_{xx} = 240 - \\dfrac{40^2}{8} = 40,\\quad S_{yy} = 1250 - \\dfrac{96^2}{8} = 98$"
      },
      {
       "say": "Calculate S x y.",
       "show": "$S_{xy} = 530 - \\dfrac{40 \\times 96}{8} = 50$"
      },
      {
       "say": "Combine them.",
       "show": "$r = \\dfrac{50}{\\sqrt{40 \\times 98}} = 0.799$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 1,
     "q": "Interpret this value in context.",
     "answer": "Fairly strong positive correlation: more practice tends to go with higher scores",
     "ms": [
      "B1 interpretation in context"
     ],
     "steps": [
      {
       "say": "The value is positive and quite close to one.",
       "show": "$r = 0.799$"
      },
      {
       "say": "So there is fairly strong positive linear correlation.",
       "show": "strong positive"
      },
      {
       "say": "Students who practise more tend to score higher. This does not prove that practice causes the higher scores.",
       "show": "in context"
      }
     ]
    },
    {
     "l": "d",
     "marks": 4,
     "q": "Find the equation of the least squares regression line of $y$ on $x$.",
     "answer": "$y = 5.75 + 1.25x$",
     "ms": [
      "M1 $b = \\dfrac{S_{xy}}{S_{xx}}$",
      "A1 $1.25$",
      "M1 $a = \\bar y - b\\bar x$",
      "A1 $y = 5.75 + 1.25x$"
     ],
     "steps": [
      {
       "say": "The gradient is S x y over S x x.",
       "show": "$b = \\dfrac{50}{40} = 1.25$"
      },
      {
       "say": "The line passes through the mean point.",
       "show": "$\\bar x = 5,\\quad \\bar y = 12$"
      },
      {
       "say": "Find the intercept.",
       "show": "$a = 12 - 1.25 \\times 5 = 5.75$"
      },
      {
       "say": "Write the equation.",
       "show": "$y = 5.75 + 1.25x$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "Estimate the score for a student who practises for 6 hours. Explain why it would be unwise to use the line to estimate the score for a student who practises for 25 hours.",
     "answer": "$13.25$; 25 hours is extrapolation (and the line would give a score near 37, which is over 30)",
     "ms": [
      "B1 $13.25$",
      "B1 extrapolation, outside the data range",
      "B1 sensible context comment (score cannot exceed 30)"
     ],
     "steps": [
      {
       "say": "Substitute x equals six.",
       "show": "$y = 5.75 + 1.25 \\times 6 = 13.25$"
      },
      {
       "say": "Six hours is within the range of the data, so this estimate is reasonable.",
       "show": "interpolation"
      },
      {
       "say": "Twenty five hours is far outside the data, so using the line there is extrapolation. It would predict about thirty seven, which is impossible for a test out of thirty.",
       "show": "$5.75 + 1.25 \\times 25 = 37 > 30$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f2_grp",
    "f2_sub",
    "f2_iso"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> The set $G = \\{1, 3, 5, 7\\}$ is combined under multiplication modulo $8$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Construct the Cayley table.",
     "answer": "Every element squared is $1$; e.g. $3 \\times 5 = 7$, $3 \\times 7 = 5$, $5 \\times 7 = 3$",
     "ms": [
      "M1 most entries correct",
      "A1 fully correct table"
     ],
     "steps": [
      {
       "say": "Multiply each pair and take the remainder on division by eight.",
       "show": "$3 \\times 3 = 9 \\equiv 1,\\quad 3 \\times 5 = 15 \\equiv 7$"
      },
      {
       "say": "Continue for all pairs.",
       "show": "$3 \\times 7 = 21 \\equiv 5,\\quad 5 \\times 7 = 35 \\equiv 3,\\quad 5 \\times 5 \\equiv 1,\\quad 7 \\times 7 \\equiv 1$"
      },
      {
       "say": "The completed table.",
       "show": "$\\begin{array}{c|cccc} \\times_8 & 1 & 3 & 5 & 7 \\\\ \\hline 1 & 1 & 3 & 5 & 7 \\\\ 3 & 3 & 1 & 7 & 5 \\\\ 5 & 5 & 7 & 1 & 3 \\\\ 7 & 7 & 5 & 3 & 1 \\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Show that $G$ forms a group under multiplication modulo $8$.",
     "answer": "Closed, associative, identity 1, each element self-inverse",
     "ms": [
      "B1 closure from table",
      "B1 associativity (multiplication mod 8 is associative)",
      "B1 identity 1",
      "B1 inverses: each element is its own inverse"
     ],
     "steps": [
      {
       "say": "Closure: every entry in the table is in G.",
       "show": "closed"
      },
      {
       "say": "Associativity: multiplication of integers is associative, and so is multiplication modulo eight.",
       "show": "associative"
      },
      {
       "say": "The identity is one, since one times anything leaves it unchanged.",
       "show": "$e = 1$"
      },
      {
       "say": "Each element appears with one on the leading diagonal, so each is its own inverse. All four axioms hold.",
       "show": "$a^{-1} = a$ for all $a$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State the order of the group and the period of each element.",
     "answer": "Order 4; 1 has period 1; 3, 5, 7 have period 2",
     "ms": [
      "B1 order 4",
      "B1 periods"
     ],
     "steps": [
      {
       "say": "The order of a group is the number of elements.",
       "show": "order 4"
      },
      {
       "say": "The identity has period one.",
       "show": "$1^1 = 1$"
      },
      {
       "say": "Each other element squares to one, so each has period two.",
       "show": "$3^2 = 5^2 = 7^2 = 1$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Explain why $G$ is not cyclic, and list its proper subgroups other than $\\{1\\}$.",
     "answer": "No element of period 4; $\\{1,3\\},\\ \\{1,5\\},\\ \\{1,7\\}$",
     "ms": [
      "B1 no element of period 4",
      "B1 the three subgroups of order 2"
     ],
     "steps": [
      {
       "say": "A cyclic group of order four needs a generator with period four.",
       "show": "needs period 4"
      },
      {
       "say": "No element of G has period four, so G is not cyclic.",
       "show": "not cyclic"
      },
      {
       "say": "Each element of period two, with the identity, forms a subgroup of order two, which divides four as Lagrange requires.",
       "show": "$\\{1, 3\\},\\ \\{1, 5\\},\\ \\{1, 7\\}$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 16,
   "points": [
    "f2_graph",
    "f2_trav",
    "f2_tree"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> A graph $H$ has vertices $A, B, C, D, E$ and edges $AB, AC, AD, BC, BD, CD, CE, DE$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "State the number of edges in the complete graph $K_5$ and in the complete bipartite graph $K_{3,3}$.",
     "answer": "$10$ and $9$",
     "ms": [
      "B1 $10$",
      "B1 $9$"
     ],
     "steps": [
      {
       "say": "In K five every pair of the five vertices is joined.",
       "show": "$\\binom52 = 10$"
      },
      {
       "say": "In K three three, each of three vertices joins each of the other three.",
       "show": "$3 \\times 3 = 9$"
      },
      {
       "say": "So ten and nine edges.",
       "show": "$10,\\ 9$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Write down the degree of each vertex of $H$ and verify that the sum of the degrees is twice the number of edges.",
     "answer": "$A3, B3, C4, D4, E2$; sum $16 = 2 \\times 8$",
     "ms": [
      "B1 degrees",
      "B1 verification"
     ],
     "steps": [
      {
       "say": "Count the edges at each vertex.",
       "show": "$A: 3,\\ B: 3,\\ C: 4,\\ D: 4,\\ E: 2$"
      },
      {
       "say": "Add them.",
       "show": "$3 + 3 + 4 + 4 + 2 = 16$"
      },
      {
       "say": "There are eight edges, and each edge adds one to the degree of two vertices.",
       "show": "$16 = 2 \\times 8$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Explain why $H$ is not Eulerian but is semi-Eulerian, and state where an Eulerian trail must start and finish.",
     "answer": "Exactly two odd vertices ($A$ and $B$); a trail must start at one of $A, B$ and end at the other",
     "ms": [
      "B1 Eulerian needs all degrees even",
      "B1 exactly two odd vertices, so semi-Eulerian",
      "B1 start and end at A and B"
     ],
     "steps": [
      {
       "say": "A connected graph is Eulerian only if every vertex has even degree.",
       "show": "all even needed"
      },
      {
       "say": "H has exactly two odd vertices, A and B, so it is semi-Eulerian.",
       "show": "two odd vertices"
      },
      {
       "say": "An Eulerian trail must start at one odd vertex and finish at the other.",
       "show": "start $A$, end $B$ (or reverse)"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Find a Hamiltonian cycle in $H$.",
     "answer": "e.g. $A\\,B\\,C\\,E\\,D\\,A$",
     "ms": [
      "M1 visits every vertex once",
      "A1 valid cycle using edges of H"
     ],
     "steps": [
      {
       "say": "A Hamiltonian cycle visits every vertex exactly once and returns to the start.",
       "show": "every vertex once"
      },
      {
       "say": "E has degree two, so the cycle must use both C E and D E.",
       "show": "$\\ldots C\\,E\\,D \\ldots$"
      },
      {
       "say": "Complete it through A and B.",
       "show": "$A\\,B\\,C\\,E\\,D\\,A$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 1,
     "q": "State the number of edges in a spanning tree of $H$.",
     "answer": "$4$",
     "ms": [
      "B1 $4$"
     ],
     "steps": [
      {
       "say": "A spanning tree connects all the vertices with no cycles.",
       "show": "spanning tree"
      },
      {
       "say": "A tree on n vertices has n minus one edges.",
       "show": "$n - 1$"
      },
      {
       "say": "With five vertices that is four edges.",
       "show": "$4$"
      }
     ]
    },
    {
     "l": "f",
     "marks": 2,
     "q": "Explain whether $H$ is planar.",
     "answer": "Planar: draw triangle $BCD$ with $A$ inside joined to $B$, $C$, $D$, and $E$ outside joined to $C$ and $D$; no edges cross",
     "ms": [
      "M1 attempts a drawing with no crossings",
      "A1 valid planar drawing or argument"
     ],
     "steps": [
      {
       "say": "A graph is planar if it can be drawn in the plane with no edges crossing.",
       "show": "planar definition"
      },
      {
       "say": "A, B, C and D with all six edges form K four, which is planar: draw a triangle B C D with A inside, joined to all three.",
       "show": "$K_4$ is planar"
      },
      {
       "say": "E joins only C and D, so place E just outside the edge C D. Nothing crosses, so H is planar.",
       "show": "H is planar"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 17,
   "points": [
    "f2_prim",
    "f2_dijk",
    "f2_cpa"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> The table gives the lengths, in km, of roads between five villages. A dash means there is no direct road.\n$$\\begin{array}{c|ccccc} & A & B & C & D & E \\\\ \\hline A & - & 7 & 4 & 9 & - \\\\ B & 7 & - & 2 & 5 & 8 \\\\ C & 4 & 2 & - & 6 & 10 \\\\ D & 9 & 5 & 6 & - & 3 \\\\ E & - & 8 & 10 & 3 & - \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Use Prim’s algorithm, starting from $A$, to find a minimum spanning tree. State the order in which you select the edges and the total length. Explain why Prim’s algorithm is described as greedy.",
     "answer": "$AC, CB, BD, DE$; $14$ km; it picks the cheapest available edge at each step",
     "ms": [
      "M1 starts at $A$, chooses $AC$",
      "A1 $CB$",
      "A1 $BD$, $DE$",
      "A1 $14$ km",
      "B1 order stated",
      "B1 greedy: takes the best immediate choice at each stage"
     ],
     "steps": [
      {
       "say": "Start at A. The shortest edge from A is A C, length four.",
       "show": "$AC = 4$"
      },
      {
       "say": "From A or C, the shortest edge to a new vertex is C B, length two.",
       "show": "$CB = 2$"
      },
      {
       "say": "From A, B or C, the shortest edge to a new vertex is B D, length five.",
       "show": "$BD = 5$"
      },
      {
       "say": "Finally D E, length three, joins E.",
       "show": "$DE = 3$"
      },
      {
       "say": "The total is fourteen kilometres. The method is greedy because at each step it simply takes the cheapest edge available, without looking ahead.",
       "show": "$4 + 2 + 5 + 3 = 14\\ \\mathrm{km}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Use Dijkstra’s algorithm to find the shortest route from $A$ to $E$ and its length.",
     "answer": "$A\\,D\\,E$, $12$ km",
     "ms": [
      "M1 labels from $A$",
      "A1 $C = 4$",
      "A1 $B = 6$",
      "A1 $D = 9$",
      "A1 $E = 12$",
      "B1 route $ADE$"
     ],
     "steps": [
      {
       "say": "Give A the permanent label zero. Temporary labels: B seven, C four, D nine.",
       "show": "$A: 0$"
      },
      {
       "say": "The smallest is C, four. Update: B becomes six via C, E becomes fourteen.",
       "show": "$C: 4,\\quad B: \\min(7, 6) = 6$"
      },
      {
       "say": "Make B permanent at six. Update D: six plus five is eleven, worse than nine. E: six plus eight is fourteen.",
       "show": "$B: 6$"
      },
      {
       "say": "Make D permanent at nine. Update E: nine plus three is twelve.",
       "show": "$D: 9,\\quad E: \\min(14, 12) = 12$"
      },
      {
       "say": "E is permanent at twelve. Trace back: E came from D, and D came directly from A.",
       "show": "$A \\to D \\to E,\\ 12\\ \\mathrm{km}$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 18,
   "points": [
    "f2_rec",
    "f2_bool"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "A sequence is defined by $u_{n+2} = 5u_{n+1} - 6u_n$ with $u_0 = 1$ and $u_1 = 4$. Find $u_2$ and $u_3$.",
     "answer": "$u_2 = 14,\\ u_3 = 46$",
     "ms": [
      "B1 $14$",
      "B1 $46$"
     ],
     "steps": [
      {
       "say": "Use the recurrence with n equal to zero.",
       "show": "$u_2 = 5(4) - 6(1) = 14$"
      },
      {
       "say": "Then with n equal to one.",
       "show": "$u_3 = 5(14) - 6(4) = 46$"
      },
      {
       "say": "So u two is fourteen and u three is forty six.",
       "show": "$14,\\ 46$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Solve the recurrence relation to find $u_n$ in terms of $n$.",
     "answer": "$u_n = 2 \\cdot 3^n - 2^n$",
     "ms": [
      "M1 auxiliary equation $r^2 - 5r + 6 = 0$",
      "A1 $r = 2, 3$",
      "M1 general solution $A2^n + B3^n$",
      "M1 uses initial conditions",
      "A1 $u_n = 2 \\cdot 3^n - 2^n$"
     ],
     "steps": [
      {
       "say": "Write the auxiliary equation.",
       "show": "$r^2 - 5r + 6 = 0 \\Rightarrow (r - 2)(r - 3) = 0$"
      },
      {
       "say": "The general solution combines powers of the two roots.",
       "show": "$u_n = A \\cdot 2^n + B \\cdot 3^n$"
      },
      {
       "say": "Use u zero equals one and u one equals four.",
       "show": "$A + B = 1,\\quad 2A + 3B = 4$"
      },
      {
       "say": "Solving gives B equals two and A equals minus one.",
       "show": "$u_n = 2 \\cdot 3^n - 2^n$"
      },
      {
       "say": "Check: u two is eighteen minus four, which is fourteen.",
       "show": "$u_2 = 18 - 4 = 14\\ \\checkmark$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Hence find $u_{10}$.",
     "answer": "$117\\,074$",
     "ms": [
      "M1 substitutes $n = 10$",
      "A1 $117\\,074$"
     ],
     "steps": [
      {
       "say": "Substitute n equals ten.",
       "show": "$u_{10} = 2 \\times 3^{10} - 2^{10}$"
      },
      {
       "say": "Three to the ten is 59049 and two to the ten is 1024.",
       "show": "$= 118\\,098 - 1024$"
      },
      {
       "say": "So u ten is 117074.",
       "show": "$117\\,074$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 7,
     "q": "Use truth tables to prove that (i) $\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q$ and (ii) $p \\to q \\equiv \\neg q \\to \\neg p$.",
     "answer": "The final columns agree in every row in each case",
     "ms": [
      "M1 four-row table with all combinations of p, q",
      "A1 column for not (p and q)",
      "A1 column for not p or not q",
      "B1 conclusion for (i)",
      "M1 columns for p implies q",
      "A1 column for not q implies not p",
      "B1 conclusion for (ii)"
     ],
     "steps": [
      {
       "say": "List all four combinations of truth values for p and q.",
       "show": "$p, q \\in \\{\\mathrm{T}, \\mathrm{F}\\}$"
      },
      {
       "say": "For part one, not p and q is false only when both are true. Not p or not q is also false only when both are true.",
       "show": "$\\begin{array}{cc|cc} p & q & \\neg(p \\wedge q) & \\neg p \\vee \\neg q \\\\ \\hline \\mathrm{T} & \\mathrm{T} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{T} & \\mathrm{F} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{F} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{F} & \\mathrm{F} & \\mathrm{T} & \\mathrm{T} \\end{array}$"
      },
      {
       "say": "The columns are identical, so the statements are equivalent.",
       "show": "$\\neg(p \\wedge q) \\equiv \\neg p \\vee \\neg q$"
      },
      {
       "say": "For part two, p implies q is false only when p is true and q is false. The contrapositive is false only when not q is true and not p is false, which is the same row.",
       "show": "$\\begin{array}{cc|cc} p & q & p \\to q & \\neg q \\to \\neg p \\\\ \\hline \\mathrm{T} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{T} & \\mathrm{F} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{F} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{F} & \\mathrm{F} & \\mathrm{T} & \\mathrm{T} \\end{array}$"
      },
      {
       "say": "Again the columns match in every row.",
       "show": "$p \\to q \\equiv \\neg q \\to \\neg p$"
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
   "marks": 50
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 50
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 50
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 50
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
 "id": "f2-medium",
 "unit": "f2",
 "level": "medium",
 "title": "Further Maths AS 2 · Paper B (Medium)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f2_hooke",
    "f2_energy"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A particle of mass $0.5$ kg is attached to one end of a light elastic string of natural length $1.2$ m and modulus $29.4$ N. The other end is attached to a fixed point $O$. The particle is released from rest at $O$ and falls vertically. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the extension of the string when the particle is in equilibrium.",
     "answer": "$0.2$ m",
     "ms": [
      "M1 $mg = \\dfrac{\\lambda e}{l}$",
      "A1 $0.2$ m"
     ],
     "steps": [
      {
       "say": "In equilibrium the tension equals the weight.",
       "show": "$\\dfrac{29.4e}{1.2} = 0.5 \\times 9.8$"
      },
      {
       "say": "Solve for the extension.",
       "show": "$e = \\dfrac{4.9 \\times 1.2}{29.4}$"
      },
      {
       "say": "The extension is 0.2 metres.",
       "show": "$e = 0.2\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the greatest extension of the string in the subsequent motion.",
     "answer": "$0.921$ m",
     "ms": [
      "M1 energy: GPE lost $= $ EPE gained",
      "A1 $4.9(1.2 + x) = \\dfrac{29.4x^2}{2.4}$",
      "M1 forms a quadratic",
      "A1 $x^2 - 0.4x - 0.48 = 0$",
      "A1 $0.921$"
     ],
     "steps": [
      {
       "say": "At the lowest point the particle is momentarily at rest. It has fallen the natural length plus the extension x.",
       "show": "$\\text{fall} = 1.2 + x$"
      },
      {
       "say": "All the lost potential energy has become elastic energy.",
       "show": "$0.5 \\times 9.8(1.2 + x) = \\dfrac{29.4x^2}{2 \\times 1.2}$"
      },
      {
       "say": "Simplify: 12.25 x squared minus 4.9 x minus 5.88 equals zero. Divide by 12.25.",
       "show": "$x^2 - 0.4x - 0.48 = 0$"
      },
      {
       "say": "Take the positive root.",
       "show": "$x = \\dfrac{0.4 + \\sqrt{0.16 + 1.92}}{2} = 0.921\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the greatest speed of the particle.",
     "answer": "$5.05\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "B1 greatest speed at equilibrium position (extension $0.2$ m)",
      "M1 energy equation",
      "A1 $v^2 = 25.48$",
      "A1 $5.05$"
     ],
     "steps": [
      {
       "say": "The speed is greatest where the acceleration is zero, at the equilibrium position. There the particle has fallen 1.4 metres.",
       "show": "fall $= 1.2 + 0.2 = 1.4\\ \\mathrm{m}$"
      },
      {
       "say": "Energy: potential lost equals kinetic plus elastic energy.",
       "show": "$0.5 \\times 9.8 \\times 1.4 = \\tfrac12(0.5)v^2 + \\dfrac{29.4 \\times 0.2^2}{2.4}$"
      },
      {
       "say": "So 6.86 equals a quarter v squared plus 0.49.",
       "show": "$0.25v^2 = 6.37 \\Rightarrow v^2 = 25.48$"
      },
      {
       "say": "Take the square root.",
       "show": "$v = 5.05\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 1,
     "q": "State one modelling assumption about the string.",
     "answer": "e.g. light; obeys Hooke’s law throughout (elastic limit not exceeded)",
     "ms": [
      "B1 valid assumption"
     ],
     "steps": [
      {
       "say": "The string is light, so its mass is ignored.",
       "show": "light"
      },
      {
       "say": "It obeys Hooke’s law throughout, so the elastic limit is not exceeded.",
       "show": "within elastic limit"
      },
      {
       "say": "Either answer earns the mark.",
       "show": "one assumption"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f2_work",
    "f2_energy"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A particle of mass $2$ kg moves along the $x$-axis. It starts from rest at the origin and is acted on by a single force of $(6x - x^2)$ N in the positive $x$-direction, where $x$ m is its displacement from the origin.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the work done by the force as the particle moves from $x = 0$ to $x = 3$.",
     "answer": "$18$ J",
     "ms": [
      "M1 $\\int_0^3 (6x - x^2)\\,\\mathrm{d}x$",
      "A1 $3x^2 - \\tfrac{x^3}{3}$",
      "A1 $18$"
     ],
     "steps": [
      {
       "say": "Work done by a variable force is the integral of F with respect to x.",
       "show": "$W = \\displaystyle\\int_0^3 (6x - x^2)\\,\\mathrm{d}x$"
      },
      {
       "say": "Integrate.",
       "show": "$= \\left[3x^2 - \\tfrac{x^3}{3}\\right]_0^3$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 27 - 9 = 18\\ \\mathrm{J}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Hence find the speed of the particle when $x = 3$.",
     "answer": "$\\sqrt{18} = 4.24\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 work $=$ gain in KE",
      "A1 $4.24$"
     ],
     "steps": [
      {
       "say": "The work done equals the gain in kinetic energy, because it started from rest.",
       "show": "$\\tfrac12 \\times 2 \\times v^2 = 18$"
      },
      {
       "say": "So v squared is eighteen.",
       "show": "$v^2 = 18$"
      },
      {
       "say": "The speed is about 4.24.",
       "show": "$v = 4.24\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Find the speed of the particle when $x = 6$.",
     "answer": "$6\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $\\int_0^6 = 36$",
      "A1 $6$"
     ],
     "steps": [
      {
       "say": "Integrate from zero to six.",
       "show": "$\\left[3x^2 - \\tfrac{x^3}{3}\\right]_0^6 = 108 - 72 = 36\\ \\mathrm{J}$"
      },
      {
       "say": "Equate to kinetic energy.",
       "show": "$v^2 = 36$"
      },
      {
       "say": "So the speed is six metres per second.",
       "show": "$v = 6\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "A constant force $\\mathbf{F} = (2\\mathbf{i} - \\mathbf{j} + 3\\mathbf{k})$ N moves a different particle from $A(1, 0, 2)$ to $B(4, 2, -1)$, distances in metres. Find the work done by $\\mathbf{F}$ and interpret the sign of your answer.",
     "answer": "$-5$ J: the force does negative work (the particle moves partly against it)",
     "ms": [
      "B1 displacement $3\\mathbf{i} + 2\\mathbf{j} - 3\\mathbf{k}$",
      "M1 scalar product",
      "A1 $-5$ J with interpretation"
     ],
     "steps": [
      {
       "say": "Find the displacement.",
       "show": "$\\overrightarrow{AB} = 3\\mathbf{i} + 2\\mathbf{j} - 3\\mathbf{k}$"
      },
      {
       "say": "Take the scalar product with the force.",
       "show": "$W = 6 - 2 - 9 = -5\\ \\mathrm{J}$"
      },
      {
       "say": "The negative sign means the force acts, overall, against the motion: work is done against F.",
       "show": "negative work"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f2_power"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A car of mass $1500$ kg has a maximum power of $45$ kW. When the car moves at speed $v\\ \\mathrm{m\\,s^{-1}}$ the resistance to motion is $20v$ N. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find the maximum speed of the car on a level road.",
     "answer": "$47.4\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $\\dfrac{45\\,000}{v} = 20v$",
      "A1 $v^2 = 2250$",
      "A1 $47.4$"
     ],
     "steps": [
      {
       "say": "At maximum speed the driving force equals the resistance.",
       "show": "$\\dfrac{45\\,000}{v} = 20v$"
      },
      {
       "say": "Multiply by v.",
       "show": "$v^2 = 2250$"
      },
      {
       "say": "So the maximum speed is about 47.4.",
       "show": "$v = 47.4\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the maximum speed of the car up a road inclined at $\\alpha$ to the horizontal, where $\\sin\\alpha = \\tfrac{1}{15}$.",
     "answer": "$28.9\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "B1 weight component $980$ N",
      "M1 $\\dfrac{45\\,000}{v} = 20v + 980$",
      "M1 quadratic $v^2 + 49v - 2250 = 0$",
      "M1 solves",
      "A1 $28.9$"
     ],
     "steps": [
      {
       "say": "The component of the weight down the slope is m g sine alpha.",
       "show": "$1500 \\times 9.8 \\times \\tfrac{1}{15} = 980\\ \\mathrm{N}$"
      },
      {
       "say": "At maximum speed the driving force balances resistance plus this component.",
       "show": "$\\dfrac{45\\,000}{v} = 20v + 980$"
      },
      {
       "say": "Multiply by v and divide by twenty.",
       "show": "$v^2 + 49v - 2250 = 0$"
      },
      {
       "say": "Take the positive root.",
       "show": "$v = \\dfrac{-49 + \\sqrt{2401 + 9000}}{2} = 28.9\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "A pump raises water from a well $6$ m below ground level and ejects it at ground level through a nozzle of cross-sectional area $0.002\\ \\mathrm{m^2}$ at $12\\ \\mathrm{m\\,s^{-1}}$. The density of water is $1000\\ \\mathrm{kg\\,m^{-3}}$. The pump is $80\\%$ efficient. Find the power input to the pump.",
     "answer": "$3.92$ kW",
     "ms": [
      "B1 $24\\ \\mathrm{kg\\,s^{-1}}$",
      "M1 PE per second",
      "M1 KE per second",
      "A1 useful power $3139.2$ W",
      "A1 input $3920$ W"
     ],
     "steps": [
      {
       "say": "Mass ejected per second is density times area times speed.",
       "show": "$1000 \\times 0.002 \\times 12 = 24\\ \\mathrm{kg\\,s^{-1}}$"
      },
      {
       "say": "Potential energy given per second.",
       "show": "$24 \\times 9.8 \\times 6 = 1411.2\\ \\mathrm{W}$"
      },
      {
       "say": "Kinetic energy given per second.",
       "show": "$\\tfrac12 \\times 24 \\times 12^2 = 1728\\ \\mathrm{W}$"
      },
      {
       "say": "The useful power is the total, 3139.2 watts. That is eighty per cent of the input.",
       "show": "$P_{\\text{in}} = \\dfrac{3139.2}{0.8} = 3924\\ \\mathrm{W} \\approx 3.92\\ \\mathrm{kW}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f2_circ",
    "f2_conical",
    "f2_hooke"
   ],
   "q": "<b>Section A (Mechanics 1)</b>  Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A particle of mass $0.2$ kg is attached to a light inextensible string of length $0.75$ m, the other end of which is fixed. The particle moves as a conical pendulum with angular speed $5\\ \\mathrm{rad\\,s^{-1}}$. Find the tension in the string and the angle the string makes with the vertical.",
     "answer": "$T = 3.75$ N, $58.5^\\circ$",
     "ms": [
      "M1 horizontal: $T\\sin\\theta = m(l\\sin\\theta)\\omega^2$",
      "A1 $T = ml\\omega^2$",
      "A1 $3.75$ N",
      "M1 vertical $T\\cos\\theta = mg$",
      "M1 $\\cos\\theta = \\tfrac{1.96}{3.75}$",
      "A1 $58.5^\\circ$"
     ],
     "steps": [
      {
       "say": "Let theta be the angle with the vertical. The radius of the circle is l sine theta.",
       "show": "$r = 0.75\\sin\\theta$"
      },
      {
       "say": "Horizontally, the tension component gives the central force. Sine theta cancels.",
       "show": "$T\\sin\\theta = 0.2 \\times 0.75\\sin\\theta \\times 25 \\Rightarrow T = 3.75\\ \\mathrm{N}$"
      },
      {
       "say": "Vertically, the forces balance.",
       "show": "$3.75\\cos\\theta = 0.2 \\times 9.8$"
      },
      {
       "say": "Solve for theta.",
       "show": "$\\cos\\theta = 0.5227 \\Rightarrow \\theta = 58.5^\\circ$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "A car of mass $900$ kg travels round a smooth banked track at $20^\\circ$ to the horizontal, in a horizontal circle of radius $50$ m. Find the normal reaction on the car and the speed at which it must travel.",
     "answer": "$R = 9390$ N; $13.4\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $R\\cos20^\\circ = mg$",
      "A1 $9390$ N",
      "M1 $R\\sin20^\\circ = \\dfrac{mv^2}{r}$",
      "M1 $v^2 = rg\\tan20^\\circ$",
      "A1 $13.4$"
     ],
     "steps": [
      {
       "say": "Resolve vertically: the vertical component of the reaction supports the weight.",
       "show": "$R\\cos20^\\circ = 900 \\times 9.8$"
      },
      {
       "say": "So the reaction is about 9390 newtons.",
       "show": "$R = 9386 \\approx 9390\\ \\mathrm{N}$"
      },
      {
       "say": "Horizontally, the other component gives the central force.",
       "show": "$R\\sin20^\\circ = \\dfrac{900v^2}{50}$"
      },
      {
       "say": "Dividing gives v squared equals r g tan twenty.",
       "show": "$v^2 = 50 \\times 9.8 \\times \\tan20^\\circ = 178.3 \\Rightarrow v = 13.4\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A particle of mass $0.25$ kg on a smooth horizontal table is attached to a light elastic string of natural length $0.3$ m and modulus $12$ N, whose other end is fixed to a point $O$ on the table. The particle moves in a horizontal circle with centre $O$ and radius $0.4$ m. Find its speed.",
     "answer": "$2.53\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $T = \\dfrac{12 \\times 0.1}{0.3}$",
      "A1 $4$ N",
      "M1 $T = \\dfrac{mv^2}{r}$",
      "A1 $2.53$"
     ],
     "steps": [
      {
       "say": "The extension is 0.4 minus 0.3, which is 0.1 metres.",
       "show": "$x = 0.1\\ \\mathrm{m}$"
      },
      {
       "say": "Hooke’s law gives the tension.",
       "show": "$T = \\dfrac{12 \\times 0.1}{0.3} = 4\\ \\mathrm{N}$"
      },
      {
       "say": "The tension provides the central force.",
       "show": "$4 = \\dfrac{0.25v^2}{0.4}$"
      },
      {
       "say": "Solve for v.",
       "show": "$v^2 = 6.4 \\Rightarrow v = 2.53\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f2_equil",
    "f2_hooke"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A particle of mass $3$ kg rests on a rough plane inclined at $\\alpha$ to the horizontal, where $\\tan\\alpha = \\tfrac34$. The coefficient of friction is $0.5$. The particle is attached to a light elastic string of natural length $2$ m and modulus $60$ N, whose other end is fixed at a point $A$ on the plane, higher up the line of greatest slope. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the length $AP$ of the string when the particle is in limiting equilibrium and about to slip down the plane.",
     "answer": "$2.196$ m",
     "ms": [
      "B1 $\\sin\\alpha = 0.6,\\ \\cos\\alpha = 0.8$",
      "M1 $R = 3g\\cos\\alpha = 23.52$",
      "A1 $F = 11.76$",
      "M1 $T + F = 3g\\sin\\alpha$",
      "A1 $T = 5.88$",
      "A1 $AP = 2.196$ m"
     ],
     "steps": [
      {
       "say": "From tan alpha equals three quarters, sine alpha is 0.6 and cos alpha is 0.8.",
       "show": "$\\sin\\alpha = 0.6,\\ \\cos\\alpha = 0.8$"
      },
      {
       "say": "Resolve perpendicular to the plane.",
       "show": "$R = 3 \\times 9.8 \\times 0.8 = 23.52\\ \\mathrm{N}$"
      },
      {
       "say": "Limiting friction acts up the plane.",
       "show": "$F = 0.5 \\times 23.52 = 11.76\\ \\mathrm{N}$"
      },
      {
       "say": "Resolve along the plane.",
       "show": "$T + 11.76 = 3 \\times 9.8 \\times 0.6 = 17.64 \\Rightarrow T = 5.88\\ \\mathrm{N}$"
      },
      {
       "say": "Use Hooke’s law for the extension.",
       "show": "$x = \\dfrac{5.88 \\times 2}{60} = 0.196 \\Rightarrow AP = 2.196\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the length of the string when the particle is about to slip up the plane.",
     "answer": "$2.98$ m",
     "ms": [
      "M1 $T = 17.64 + 11.76$",
      "A1 $29.4$ N",
      "A1 $2.98$ m"
     ],
     "steps": [
      {
       "say": "Now friction acts down the plane.",
       "show": "$T = 17.64 + 11.76 = 29.4\\ \\mathrm{N}$"
      },
      {
       "say": "Find the extension.",
       "show": "$x = \\dfrac{29.4 \\times 2}{60} = 0.98\\ \\mathrm{m}$"
      },
      {
       "say": "So the length is 2.98 metres.",
       "show": "$AP = 2.98\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State the set of values of $AP$ for which the particle can rest in equilibrium.",
     "answer": "$2.196 \\le AP \\le 2.98$",
     "ms": [
      "M1 uses both limits",
      "A1 $2.196 \\le AP \\le 2.98$"
     ],
     "steps": [
      {
       "say": "Between the two limiting cases, friction need not be at its maximum, so equilibrium is possible.",
       "show": "between the limits"
      },
      {
       "say": "Use the two lengths found.",
       "show": "$2.196$ and $2.98$"
      },
      {
       "say": "So equilibrium is possible for this range.",
       "show": "$2.196 \\le AP \\le 2.98\\ \\mathrm{m}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 6,
   "points": [
    "f2_relv",
    "f2_resv"
   ],
   "q": "<b>Section B (Mechanics 2)</b> In this question $\\mathbf{i}$ and $\\mathbf{j}$ are unit vectors due east and due north.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A ship $S$ leaves the origin at noon and travels due north at $6\\ \\mathrm{km\\,h^{-1}}$. At noon a launch $L$ is at the point $(10\\mathbf{i})$ km. The launch travels at $10\\ \\mathrm{km\\,h^{-1}}$ in a straight line and intercepts the ship. Find the velocity of the launch, the time of interception, and the bearing on which the launch travels.",
     "answer": "$(-8\\mathbf{i} + 6\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$; $13{:}15$; bearing $307^\\circ$",
     "ms": [
      "M1 velocity $(u, v)$ with $u^2 + v^2 = 100$",
      "M1 equal positions at time $t$",
      "A1 $v = 6$",
      "A1 $u = -8$",
      "A1 $t = 1.25$ h, $13{:}15$",
      "A1 bearing $307^\\circ$"
     ],
     "steps": [
      {
       "say": "Let the launch have velocity u i plus v j, with speed ten.",
       "show": "$u^2 + v^2 = 100$"
      },
      {
       "say": "At interception, after t hours, the positions agree.",
       "show": "$10 + ut = 0,\\quad vt = 6t$"
      },
      {
       "say": "So v equals six, and then u is minus eight, taking the negative root because the launch must head west.",
       "show": "$v = 6,\\ u = -8$"
      },
      {
       "say": "Then t is ten over eight, 1.25 hours, which is quarter past one.",
       "show": "$t = 1.25\\ \\mathrm{h} \\Rightarrow 13{:}15$"
      },
      {
       "say": "The direction minus eight, six is north of west. The angle west of north is the inverse tangent of eight over six, 53.1 degrees.",
       "show": "bearing $360^\\circ - 53.1^\\circ = 306.9^\\circ \\approx 307^\\circ$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "At noon, ship $A$ is at the origin moving with velocity $(4\\mathbf{i} + 3\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$ and ship $B$ is at $(12\\mathbf{i} + 5\\mathbf{j})$ km moving with velocity $(-2\\mathbf{i} + 5\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$. Find the least distance between the ships and the time at which it occurs.",
     "answer": "$8.54$ km at $13{:}33$",
     "ms": [
      "M1 relative velocity $\\mathbf{v}_B - \\mathbf{v}_A = -6\\mathbf{i} + 2\\mathbf{j}$",
      "M1 relative position $(12 - 6t)\\mathbf{i} + (5 + 2t)\\mathbf{j}$",
      "M1 minimises or uses perpendicularity",
      "A1 $t = 1.55$",
      "A1 $13{:}33$",
      "M1 substitutes",
      "A1 $8.54$ km"
     ],
     "steps": [
      {
       "say": "Find the velocity of B relative to A.",
       "show": "$\\mathbf{v}_B - \\mathbf{v}_A = -6\\mathbf{i} + 2\\mathbf{j}$"
      },
      {
       "say": "So the position of B relative to A after t hours is this.",
       "show": "$\\mathbf{r} = (12 - 6t)\\mathbf{i} + (5 + 2t)\\mathbf{j}$"
      },
      {
       "say": "The distance is least when r is perpendicular to the relative velocity.",
       "show": "$-6(12 - 6t) + 2(5 + 2t) = 0 \\Rightarrow 40t = 62$"
      },
      {
       "say": "t is 1.55 hours, which is 1 hour 33 minutes after noon.",
       "show": "$t = 1.55\\ \\mathrm{h} \\Rightarrow 13{:}33$"
      },
      {
       "say": "Substitute to find the least distance.",
       "show": "$\\mathbf{r} = 2.7\\mathbf{i} + 8.1\\mathbf{j},\\quad d = \\sqrt{72.9} = 8.54\\ \\mathrm{km}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 7,
   "points": [
    "f2_vcirc"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A particle of mass $m$ is attached to one end of a light inextensible string of length $a$. The other end is fixed at $O$. The particle is projected horizontally from the point vertically below $O$ with speed $u$ and moves in a vertical circle.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Prove that, when the string makes an angle $\\theta$ with the downward vertical, the tension is $T = m\\left(\\dfrac{u^2}{a} - 2g + 3g\\cos\\theta\\right)$.",
     "answer": "Energy $v^2 = u^2 - 2ga(1 - \\cos\\theta)$, then $T - mg\\cos\\theta = \\dfrac{mv^2}{a}$",
     "ms": [
      "M1 energy equation",
      "A1 $v^2 = u^2 - 2ga(1 - \\cos\\theta)$",
      "M1 radial equation",
      "A1 $T - mg\\cos\\theta = \\dfrac{mv^2}{a}$",
      "A1 result shown"
     ],
     "steps": [
      {
       "say": "When the string is at angle theta to the downward vertical, the particle has risen a times one minus cos theta.",
       "show": "$h = a(1 - \\cos\\theta)$"
      },
      {
       "say": "Conservation of energy gives v squared.",
       "show": "$v^2 = u^2 - 2ga(1 - \\cos\\theta)$"
      },
      {
       "say": "Towards the centre, the tension minus the component of the weight gives the central acceleration.",
       "show": "$T - mg\\cos\\theta = \\dfrac{mv^2}{a}$"
      },
      {
       "say": "Substitute for v squared and simplify.",
       "show": "$T = \\dfrac{m}{a}\\left(u^2 - 2ga + 2ga\\cos\\theta\\right) + mg\\cos\\theta = m\\left(\\dfrac{u^2}{a} - 2g + 3g\\cos\\theta\\right)$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Given that $u^2 = 4ag$, find the angle the string makes with the downward vertical when it becomes slack.",
     "answer": "$\\cos\\theta = -\\tfrac23$, $\\theta = 131.8^\\circ$",
     "ms": [
      "M1 sets $T = 0$",
      "A1 $\\cos\\theta = -\\tfrac23$",
      "A1 $131.8^\\circ$"
     ],
     "steps": [
      {
       "say": "The string goes slack when the tension becomes zero.",
       "show": "$4g - 2g + 3g\\cos\\theta = 0$"
      },
      {
       "say": "Solve for cos theta.",
       "show": "$\\cos\\theta = -\\tfrac23$"
      },
      {
       "say": "So theta is 131.8 degrees from the downward vertical, above the level of O.",
       "show": "$\\theta = 131.8^\\circ$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find, in terms of $a$ and $g$, the speed of the particle at that instant.",
     "answer": "$\\sqrt{\\tfrac{2ag}{3}}$",
     "ms": [
      "M1 energy with $\\cos\\theta = -\\tfrac23$",
      "M1 $4ag - 2ag \\cdot \\tfrac53$",
      "A1 $\\sqrt{\\tfrac{2ag}{3}}$"
     ],
     "steps": [
      {
       "say": "Use the energy equation from part a.",
       "show": "$v^2 = 4ag - 2ag\\left(1 + \\tfrac23\\right)$"
      },
      {
       "say": "Simplify.",
       "show": "$v^2 = 4ag - \\tfrac{10}{3}ag = \\tfrac23ag$"
      },
      {
       "say": "Take the square root.",
       "show": "$v = \\sqrt{\\tfrac{2ag}{3}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f2_grav"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A planet has mass $M$ and radius $R$. The acceleration due to gravity at its surface is $g_0$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Show that $GM = g_0R^2$.",
     "answer": "$\\dfrac{GMm}{R^2} = mg_0$",
     "ms": [
      "M1 weight equals gravitational force",
      "A1 shown"
     ],
     "steps": [
      {
       "say": "At the surface, the weight of a mass m is the gravitational attraction.",
       "show": "$mg_0 = \\dfrac{GMm}{R^2}$"
      },
      {
       "say": "Cancel m.",
       "show": "$g_0 = \\dfrac{GM}{R^2}$"
      },
      {
       "say": "Rearrange.",
       "show": "$GM = g_0R^2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "A satellite moves in a circular orbit at height $R$ above the surface. Show that its speed is $\\sqrt{\\tfrac12g_0R}$.",
     "answer": "$\\dfrac{GMm}{(2R)^2} = \\dfrac{mv^2}{2R} \\Rightarrow v^2 = \\dfrac{GM}{2R} = \\dfrac{g_0R}{2}$",
     "ms": [
      "B1 orbit radius $2R$",
      "M1 gravity $=$ central force",
      "A1 shown"
     ],
     "steps": [
      {
       "say": "The orbit radius is measured from the centre, so it is two R.",
       "show": "$r = 2R$"
      },
      {
       "say": "Gravity provides the central force.",
       "show": "$\\dfrac{GMm}{4R^2} = \\dfrac{mv^2}{2R}$"
      },
      {
       "say": "So v squared is G M over two R. Use G M equals g nought R squared.",
       "show": "$v^2 = \\dfrac{g_0R^2}{2R} = \\tfrac12g_0R$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "For Mars, $R = 3.39 \\times 10^6$ m and $g_0 = 3.72\\ \\mathrm{m\\,s^{-2}}$. Find the period of such a satellite, in hours.",
     "answer": "$4.71$ hours",
     "ms": [
      "M1 $v = \\sqrt{\\tfrac12g_0R}$",
      "M1 $T = \\dfrac{2\\pi(2R)}{v}$",
      "A1 $4.71$ h"
     ],
     "steps": [
      {
       "say": "Find the speed.",
       "show": "$v = \\sqrt{0.5 \\times 3.72 \\times 3.39 \\times 10^6} = 2511\\ \\mathrm{m\\,s^{-1}}$"
      },
      {
       "say": "The period is the circumference of the orbit divided by the speed.",
       "show": "$T = \\dfrac{2\\pi \\times 6.78 \\times 10^6}{2511} = 16\\,965\\ \\mathrm{s}$"
      },
      {
       "say": "Convert to hours.",
       "show": "$T = 4.71\\ \\text{hours}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f2_dim"
   ],
   "q": "<b>Section B (Mechanics 2)</b> The gravitational constant $G$ is defined by $F = \\dfrac{Gm_1m_2}{r^2}$.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the dimensions of $G$.",
     "answer": "$M^{-1}L^3T^{-2}$",
     "ms": [
      "M1 $[G] = \\dfrac{[F][r^2]}{[m]^2}$",
      "A1 $M^{-1}L^3T^{-2}$"
     ],
     "steps": [
      {
       "say": "Rearrange for G.",
       "show": "$G = \\dfrac{Fr^2}{m_1m_2}$"
      },
      {
       "say": "Substitute the dimensions.",
       "show": "$[G] = \\dfrac{MLT^{-2} \\cdot L^2}{M^2}$"
      },
      {
       "say": "Simplify.",
       "show": "$[G] = M^{-1}L^3T^{-2}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "The escape speed $v$ from a planet is thought to depend on $G$, the mass $M$ of the planet and its radius $R$, in the form $v = kG^\\alpha M^\\beta R^\\gamma$, where $k$ is dimensionless. Use dimensional analysis to find $\\alpha$, $\\beta$ and $\\gamma$.",
     "answer": "$\\alpha = \\tfrac12,\\ \\beta = \\tfrac12,\\ \\gamma = -\\tfrac12$",
     "ms": [
      "M1 sets up dimensions",
      "M1 equates powers",
      "A1 $\\alpha = \\tfrac12$",
      "A1 $\\beta = \\tfrac12$",
      "A1 $\\gamma = -\\tfrac12$"
     ],
     "steps": [
      {
       "say": "Write the dimensions of both sides.",
       "show": "$LT^{-1} = (M^{-1}L^3T^{-2})^\\alpha M^\\beta L^\\gamma$"
      },
      {
       "say": "Compare powers of T.",
       "show": "$-1 = -2\\alpha \\Rightarrow \\alpha = \\tfrac12$"
      },
      {
       "say": "Compare powers of M.",
       "show": "$0 = -\\alpha + \\beta \\Rightarrow \\beta = \\tfrac12$"
      },
      {
       "say": "Compare powers of L.",
       "show": "$1 = 3\\alpha + \\gamma \\Rightarrow \\gamma = -\\tfrac12$"
      },
      {
       "say": "So v is k times the square root of G M over R.",
       "show": "$v = k\\sqrt{\\dfrac{GM}{R}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f2_samp"
   ],
   "q": "<b>Section C (Statistics)</b> A council wants to survey households in a large town about recycling. The town is divided into 40 housing estates.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Describe how a cluster sample could be taken.",
     "answer": "Randomly select a few estates (clusters) and survey every household (or a random sample) in those estates",
     "ms": [
      "B1 random selection of estates",
      "B1 survey households within chosen estates"
     ],
     "steps": [
      {
       "say": "Treat each housing estate as a cluster.",
       "show": "estates as clusters"
      },
      {
       "say": "Choose a few estates at random, for example four of the forty.",
       "show": "random choice of clusters"
      },
      {
       "say": "Survey all households in the chosen estates.",
       "show": "everyone in chosen clusters"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Give one advantage and one disadvantage of cluster sampling here.",
     "answer": "Advantage: cheaper and quicker (households close together). Disadvantage: estates may differ, so the sample may not represent the town",
     "ms": [
      "B1 advantage",
      "B1 disadvantage"
     ],
     "steps": [
      {
       "say": "Surveying households close together saves travel time and money.",
       "show": "advantage: cheap, quick"
      },
      {
       "say": "But estates may be very different, for example by type of housing.",
       "show": "clusters may differ"
      },
      {
       "say": "So a few clusters may not represent the whole town.",
       "show": "disadvantage: possible bias"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "A researcher instead interviews people in the town centre until she has spoken to 30 men and 30 women. Name this method and give one criticism of it.",
     "answer": "Quota sampling; non-random, so interviewer bias / people in the town centre may not be typical",
     "ms": [
      "B1 quota sampling",
      "B1 valid criticism"
     ],
     "steps": [
      {
       "say": "She fills fixed numbers in each category without random selection.",
       "show": "fixed numbers per group"
      },
      {
       "say": "This is quota sampling.",
       "show": "quota sampling"
      },
      {
       "say": "It is not random, and people in the town centre at that time may not be typical of all households.",
       "show": "criticism: bias"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 11,
   "points": [
    "f2_perm",
    "f2_pprob"
   ],
   "q": "<b>Section C (Statistics)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "Four-digit codes are made using the digits 1 to 9, with no digit repeated. Find the number of (i) possible codes, (ii) even codes, (iii) even codes greater than 5000.",
     "answer": "(i) $3024$ (ii) $1344$ (iii) $756$",
     "ms": [
      "B1 $^9P_4 = 3024$",
      "M1 last digit from $\\{2, 4, 6, 8\\}$",
      "A1 $1344$",
      "M1 splits by whether the first digit is odd or even",
      "A1 $504$",
      "A1 $252$",
      "A1 $756$"
     ],
     "steps": [
      {
       "say": "Arrange four of nine digits.",
       "show": "$^9P_4 = 9 \\times 8 \\times 7 \\times 6 = 3024$"
      },
      {
       "say": "For an even code, fix the last digit first: four choices. Then arrange three of the remaining eight.",
       "show": "$4 \\times {}^8P_3 = 4 \\times 336 = 1344$"
      },
      {
       "say": "For codes over 5000, the first digit is 5, 6, 7, 8 or 9. Split into cases. If the first digit is 5, 7 or 9, there are four even choices for the last digit.",
       "show": "$3 \\times 4 \\times 7 \\times 6 = 504$"
      },
      {
       "say": "If the first digit is 6 or 8, only three even digits remain for the last place.",
       "show": "$2 \\times 3 \\times 7 \\times 6 = 252$"
      },
      {
       "say": "Add the cases.",
       "show": "$504 + 252 = 756$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Four girls and five boys stand in a row in a random order. Find the probability that no two girls stand next to each other.",
     "answer": "$\\tfrac{5}{42} \\approx 0.119$",
     "ms": [
      "M1 arranges boys $5!$",
      "M1 girls into 6 gaps $^6P_4$",
      "M1 divides by $9!$",
      "A1 $\\tfrac{5}{42}$"
     ],
     "steps": [
      {
       "say": "First arrange the five boys.",
       "show": "$5! = 120$"
      },
      {
       "say": "There are six gaps, including the two ends, and each girl must go in a different gap.",
       "show": "$^6P_4 = 360$"
      },
      {
       "say": "The total number of arrangements is nine factorial.",
       "show": "$9! = 362\\,880$"
      },
      {
       "say": "Divide.",
       "show": "$\\dfrac{120 \\times 360}{362\\,880} = \\dfrac{5}{42} \\approx 0.119$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 12,
   "points": [
    "f2_crv"
   ],
   "q": "<b>Section C (Statistics)</b> The time, $X$ hours, that a machine runs before needing a reset is modelled by the probability density function\n$$\\mathrm{f}(x) = \\begin{cases} k(4x - x^2) & 0 \\le x \\le 3 \\\\ 0 & \\text{otherwise.} \\end{cases}$$",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Show that $k = \\tfrac19$.",
     "answer": "$\\int_0^3 (4x - x^2)\\,\\mathrm{d}x = 9$",
     "ms": [
      "M1 integral $= 1$",
      "A1 shown"
     ],
     "steps": [
      {
       "say": "The total probability is one.",
       "show": "$k\\displaystyle\\int_0^3 (4x - x^2)\\,\\mathrm{d}x = 1$"
      },
      {
       "say": "Integrate.",
       "show": "$k\\left[2x^2 - \\tfrac{x^3}{3}\\right]_0^3 = k(18 - 9) = 9k$"
      },
      {
       "say": "So k is one ninth.",
       "show": "$k = \\tfrac19$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find $\\mathrm{E}(X)$.",
     "answer": "$\\tfrac74$",
     "ms": [
      "M1 $\\int x\\,\\mathrm{f}(x)\\,\\mathrm{d}x$",
      "A1 $\\tfrac19\\left[\\tfrac{4x^3}{3} - \\tfrac{x^4}{4}\\right]_0^3$",
      "A1 $\\tfrac74$"
     ],
     "steps": [
      {
       "say": "The mean is the integral of x times f of x.",
       "show": "$\\mathrm{E}(X) = \\tfrac19\\displaystyle\\int_0^3 (4x^2 - x^3)\\,\\mathrm{d}x$"
      },
      {
       "say": "Integrate.",
       "show": "$= \\tfrac19\\left[\\tfrac{4x^3}{3} - \\tfrac{x^4}{4}\\right]_0^3 = \\tfrac19\\left(36 - \\tfrac{81}{4}\\right)$"
      },
      {
       "say": "Simplify.",
       "show": "$= \\tfrac19 \\times \\tfrac{63}{4} = \\tfrac74$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find $\\mathrm{Var}(X)$.",
     "answer": "$\\tfrac{43}{80}$",
     "ms": [
      "M1 $\\mathrm{E}(X^2)$",
      "A1 $\\tfrac{18}{5}$",
      "A1 $\\tfrac{43}{80}$"
     ],
     "steps": [
      {
       "say": "Find the expectation of x squared.",
       "show": "$\\mathrm{E}(X^2) = \\tfrac19\\displaystyle\\int_0^3 (4x^3 - x^4)\\,\\mathrm{d}x = \\tfrac19\\left(81 - \\tfrac{243}{5}\\right) = \\tfrac{18}{5}$"
      },
      {
       "say": "Subtract the square of the mean.",
       "show": "$\\mathrm{Var}(X) = \\tfrac{18}{5} - \\tfrac{49}{16}$"
      },
      {
       "say": "Use a common denominator of eighty.",
       "show": "$= \\tfrac{288 - 245}{80} = \\tfrac{43}{80}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find $\\mathrm{P}(X > 2)$.",
     "answer": "$\\tfrac{11}{27}$",
     "ms": [
      "M1 $\\int_2^3 \\mathrm{f}(x)\\,\\mathrm{d}x$",
      "M1 correct limits substituted",
      "A1 $\\tfrac{11}{27}$"
     ],
     "steps": [
      {
       "say": "Integrate the density from two to three.",
       "show": "$\\tfrac19\\left[2x^2 - \\tfrac{x^3}{3}\\right]_2^3$"
      },
      {
       "say": "Substitute the limits.",
       "show": "$= \\tfrac19\\left[(18 - 9) - \\left(8 - \\tfrac83\\right)\\right] = \\tfrac19 \\times \\tfrac{11}{3}$"
      },
      {
       "say": "So the probability is eleven over twenty seven.",
       "show": "$\\tfrac{11}{27} \\approx 0.407$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 2,
     "q": "Find $\\mathrm{Var}(2X + 1)$.",
     "answer": "$\\tfrac{43}{20}$",
     "ms": [
      "M1 $2^2\\,\\mathrm{Var}(X)$",
      "A1 $\\tfrac{43}{20}$"
     ],
     "steps": [
      {
       "say": "Adding a constant does not change the variance; multiplying by two multiplies it by four.",
       "show": "$\\mathrm{Var}(2X + 1) = 4\\,\\mathrm{Var}(X)$"
      },
      {
       "say": "Substitute.",
       "show": "$4 \\times \\tfrac{43}{80}$"
      },
      {
       "say": "This is forty three over twenty.",
       "show": "$\\tfrac{43}{20} = 2.15$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 13,
   "points": [
    "f2_pois",
    "f2_geo"
   ],
   "q": "<b>Section C (Statistics)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Faults occur at random in a cable at an average rate of 0.4 per 100 m. Find the probability that a 500 m length of cable has (i) no faults, (ii) at least 3 faults.",
     "answer": "(i) $0.135$ (ii) $0.323$",
     "ms": [
      "B1 $\\lambda = 2$",
      "A1 $\\mathrm{e}^{-2} = 0.135$",
      "M1 $1 - \\mathrm{P}(X \\le 2)$",
      "A1 $0.323$"
     ],
     "steps": [
      {
       "say": "For 500 metres the mean is five times 0.4, which is two.",
       "show": "$X \\sim \\mathrm{Po}(2)$"
      },
      {
       "say": "No faults.",
       "show": "$\\mathrm{P}(X = 0) = \\mathrm{e}^{-2} = 0.135$"
      },
      {
       "say": "At least three is one minus the probability of zero, one or two.",
       "show": "$1 - \\mathrm{e}^{-2}\\left(1 + 2 + \\tfrac{2^2}{2}\\right) = 1 - 5\\mathrm{e}^{-2}$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 0.323$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Each time Sam attempts a driving manoeuvre, the probability of success is 0.35, independently. Find the probability that (i) his first success is on his third attempt, (ii) he needs more than four attempts. (iii) Find the mean and variance of the number of attempts needed.",
     "answer": "(i) $0.148$ (ii) $0.179$ (iii) mean $2.86$, variance $5.31$",
     "ms": [
      "M1 $0.65^2 \\times 0.35$",
      "A1 $0.148$",
      "M1 $0.65^4$",
      "A1 $0.179$",
      "B1 mean $\\tfrac{1}{0.35} = 2.86$",
      "B1 variance $\\tfrac{0.65}{0.35^2} = 5.31$"
     ],
     "steps": [
      {
       "say": "The number of attempts has a geometric distribution with p equal to 0.35.",
       "show": "$X \\sim \\mathrm{Geo}(0.35)$"
      },
      {
       "say": "First success on the third attempt means two failures then a success.",
       "show": "$\\mathrm{P}(X = 3) = 0.65^2 \\times 0.35 = 0.148$"
      },
      {
       "say": "More than four attempts means the first four are failures.",
       "show": "$\\mathrm{P}(X > 4) = 0.65^4 = 0.179$"
      },
      {
       "say": "The mean is one over p and the variance is one minus p over p squared.",
       "show": "$\\mathrm{E}(X) = 2.86,\\quad \\mathrm{Var}(X) = \\dfrac{0.65}{0.1225} = 5.31$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f2_pmcc",
    "f2_reg"
   ],
   "q": "<b>Section C (Statistics)</b> The table shows the temperature, $x\\ ^\\circ\\mathrm{C}$, and the number of ice creams sold, $y$, at a kiosk on six days.\n$$\\begin{array}{c|cccccc} x & 2 & 4 & 5 & 7 & 8 & 10 \\\\ \\hline y & 15 & 19 & 22 & 24 & 28 & 31 \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Calculate the product-moment correlation coefficient.",
     "answer": "$r = 0.992$",
     "ms": [
      "M1 $S_{xx} = 42,\\ S_{yy} = 170.83$",
      "M1 $S_{xy} = 84$",
      "A1 $0.992$"
     ],
     "steps": [
      {
       "say": "Find the sums.",
       "show": "$\\textstyle\\sum x = 36,\\ \\sum y = 139,\\ \\sum x^2 = 258,\\ \\sum y^2 = 3391,\\ \\sum xy = 918$"
      },
      {
       "say": "Calculate the S values.",
       "show": "$S_{xx} = 258 - \\tfrac{36^2}{6} = 42,\\ S_{yy} = 3391 - \\tfrac{139^2}{6} = 170.83,\\ S_{xy} = 918 - \\tfrac{36 \\times 139}{6} = 84$"
      },
      {
       "say": "Combine.",
       "show": "$r = \\dfrac{84}{\\sqrt{42 \\times 170.83}} = 0.992$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the equation of the least squares regression line of $y$ on $x$.",
     "answer": "$y = 11.2 + 2x$",
     "ms": [
      "M1 $b = \\dfrac{S_{xy}}{S_{xx}}$",
      "A1 $b = 2$",
      "M1 $a = \\bar y - b\\bar x$",
      "A1 $a = 11.2$"
     ],
     "steps": [
      {
       "say": "The gradient is S x y over S x x.",
       "show": "$b = \\dfrac{84}{42} = 2$"
      },
      {
       "say": "The means are six and 23.17.",
       "show": "$\\bar x = 6,\\quad \\bar y = 23.17$"
      },
      {
       "say": "Find the intercept.",
       "show": "$a = 23.17 - 2 \\times 6 = 11.17$"
      },
      {
       "say": "Write the line.",
       "show": "$y = 11.2 + 2x$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "Use your line to estimate sales when the temperature is $6^\\circ\\mathrm{C}$, and comment on the reliability of your estimate.",
     "answer": "$23$; reliable, because $6$ is within the data range and $r$ is close to $1$",
     "ms": [
      "B1 $23$ (accept $23.2$)",
      "B1 reliable: interpolation and strong correlation"
     ],
     "steps": [
      {
       "say": "Substitute six into the line.",
       "show": "$y = 11.17 + 12 = 23.17$"
      },
      {
       "say": "So about twenty three ice creams.",
       "show": "$\\approx 23$"
      },
      {
       "say": "This is reliable because six degrees is inside the data range, and the correlation is very strong.",
       "show": "interpolation, r close to 1"
      }
     ]
    },
    {
     "l": "d",
     "marks": 1,
     "q": "Explain why the regression line of $y$ on $x$ is the appropriate one to use.",
     "answer": "Temperature is the explanatory variable; sales are the response",
     "ms": [
      "B1 x explanatory, y response"
     ],
     "steps": [
      {
       "say": "Temperature is not affected by ice cream sales.",
       "show": "temperature explains sales"
      },
      {
       "say": "So temperature is the explanatory variable and sales are the response variable.",
       "show": "$x$ explanatory, $y$ response"
      },
      {
       "say": "We predict y from x, so we use the line of y on x.",
       "show": "$y$ on $x$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f2_grp",
    "f2_sub",
    "f2_iso"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> The set $G = \\{1, 2, 4, 5, 7, 8\\}$ is combined under multiplication modulo $9$.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Construct the Cayley table.",
     "answer": "Rows: $1{:}\\ 1,2,4,5,7,8;\\ 2{:}\\ 2,4,8,1,5,7;\\ 4{:}\\ 4,8,7,2,1,5;\\ 5{:}\\ 5,1,2,7,8,4;\\ 7{:}\\ 7,5,1,8,4,2;\\ 8{:}\\ 8,7,5,4,2,1$",
     "ms": [
      "M1 most entries correct",
      "A1 at most two errors",
      "A1 fully correct"
     ],
     "steps": [
      {
       "say": "Multiply each pair and reduce modulo nine.",
       "show": "$2 \\times 5 = 10 \\equiv 1,\\quad 4 \\times 7 = 28 \\equiv 1$"
      },
      {
       "say": "Continue for all pairs.",
       "show": "$5 \\times 5 = 25 \\equiv 7,\\quad 8 \\times 8 = 64 \\equiv 1$"
      },
      {
       "say": "The completed table.",
       "show": "$\\begin{array}{c|cccccc} \\times_9 & 1 & 2 & 4 & 5 & 7 & 8 \\\\ \\hline 1 & 1 & 2 & 4 & 5 & 7 & 8 \\\\ 2 & 2 & 4 & 8 & 1 & 5 & 7 \\\\ 4 & 4 & 8 & 7 & 2 & 1 & 5 \\\\ 5 & 5 & 1 & 2 & 7 & 8 & 4 \\\\ 7 & 7 & 5 & 1 & 8 & 4 & 2 \\\\ 8 & 8 & 7 & 5 & 4 & 2 & 1 \\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Given that multiplication modulo $9$ is associative, show that $G$ is a group.",
     "answer": "Closed; identity 1; inverses 1-1, 2-5, 4-7, 8-8",
     "ms": [
      "B1 closure",
      "B1 identity 1",
      "B1 every element has an inverse in G"
     ],
     "steps": [
      {
       "say": "Every entry in the table belongs to G, so G is closed.",
       "show": "closed"
      },
      {
       "say": "The identity is one.",
       "show": "$e = 1$"
      },
      {
       "say": "Each row contains a one, so every element has an inverse. Together with associativity, G is a group.",
       "show": "$2^{-1} = 5,\\ 4^{-1} = 7,\\ 8^{-1} = 8$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find the period of each element.",
     "answer": "$1{:}1,\\ 2{:}6,\\ 4{:}3,\\ 5{:}6,\\ 7{:}3,\\ 8{:}2$",
     "ms": [
      "M1 computes successive powers",
      "A1 periods of 2 and 5",
      "A1 all correct"
     ],
     "steps": [
      {
       "say": "The period is the smallest positive power that gives the identity. Powers of two are 2, 4, 8, 7, 5, 1.",
       "show": "$2$ has period $6$"
      },
      {
       "say": "Powers of four are 4, 7, 1, and powers of seven are 7, 4, 1.",
       "show": "$4,\\ 7$ have period $3$"
      },
      {
       "say": "Five has period six, eight has period two, and one has period one.",
       "show": "$5{:}\\,6,\\quad 8{:}\\,2,\\quad 1{:}\\,1$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Explain why $G$ is cyclic and state its generators.",
     "answer": "$2$ and $5$ have period $6$; generators $2$ and $5$",
     "ms": [
      "B1 element of period 6",
      "B1 both generators"
     ],
     "steps": [
      {
       "say": "A group of order six is cyclic if one element has period six.",
       "show": "need period 6"
      },
      {
       "say": "Both two and five have period six.",
       "show": "$\\langle 2 \\rangle = \\langle 5 \\rangle = G$"
      },
      {
       "say": "So G is cyclic with generators two and five.",
       "show": "generators 2, 5"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "Find all the proper subgroups of $G$ with more than one element, and use Lagrange’s theorem to explain why $G$ has no subgroup of order $4$.",
     "answer": "$\\{1, 8\\}$ and $\\{1, 4, 7\\}$; $4$ does not divide $6$",
     "ms": [
      "B1 the subgroup of order 2",
      "B1 the subgroup of order 3",
      "B1 Lagrange argument"
     ],
     "steps": [
      {
       "say": "The element of period two generates a subgroup of order two.",
       "show": "$\\{1, 8\\}$"
      },
      {
       "say": "The elements of period three generate a subgroup of order three.",
       "show": "$\\{1, 4, 7\\}$"
      },
      {
       "say": "By Lagrange’s theorem the order of a subgroup divides the order of the group. Four does not divide six.",
       "show": "no subgroup of order 4"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 16,
   "points": [
    "f2_cpa"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> A project consists of the activities in the table. Durations are in days.\n$$\\begin{array}{c|ccccccc} \\text{Activity} & A & B & C & D & E & F & G \\\\ \\hline \\text{Duration} & 3 & 4 & 2 & 5 & 3 & 4 & 2 \\\\ \\text{Preceded by} & - & - & A & A, B & C & D, E & D \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Draw an activity network for the project.",
     "answer": "Network with start node; $A, B$ from start; $C$ after $A$; $D$ after $A$ and $B$ (dummy from end of $A$); $E$ after $C$; $F$ after $D, E$ (dummy from end of $D$ to end of $E$); $G$ after $D$",
     "ms": [
      "M1 A and B start the network",
      "A1 C, D, E correct (dummy for D)",
      "A1 F and G correct (second dummy), single finish"
     ],
     "steps": [
      {
       "say": "A and B have no predecessors, so they leave the start node.",
       "show": "start $\\to A,\\ B$"
      },
      {
       "say": "C needs only A, but D needs both A and B. Use a dummy from the end of A to the end of B, where D begins.",
       "show": "dummy from A to the start of D"
      },
      {
       "say": "E follows C. F needs D and E, but G needs only D, so a second dummy runs from the end of D to the end of E, where F begins. G leaves the end of D, and F and G meet at the finish.",
       "show": "dummy $D \\to E$ end; $F$ from end of $E$; $G$ from end of $D$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the earliest and latest start times for each activity.",
     "answer": "Earliest: $A0, B0, C3, D4, E5, F9, G9$; latest: $A1, B0, C4, D4, E6, F9, G11$",
     "ms": [
      "M1 forward pass",
      "A1 earliest times",
      "M1 backward pass",
      "A1 latest times"
     ],
     "steps": [
      {
       "say": "Forward pass: C starts at three, D at the larger of three and four, which is four.",
       "show": "$C: 3,\\ D: 4$"
      },
      {
       "say": "E starts at five. F waits for D, which ends at nine, and E, which ends at eight, so F starts at nine. G also starts at nine.",
       "show": "$E: 5,\\ F: 9,\\ G: 9$"
      },
      {
       "say": "The project takes thirteen days. Backward pass: F must start by nine, G by eleven.",
       "show": "$F: 9,\\ G: 11$"
      },
      {
       "say": "D must finish by nine, so start by four. E by six, C by four, A by one, B by zero.",
       "show": "$D: 4,\\ E: 6,\\ C: 4,\\ A: 1,\\ B: 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State the critical path and the minimum completion time.",
     "answer": "$B, D, F$; $13$ days",
     "ms": [
      "B1 B D F",
      "B1 13 days"
     ],
     "steps": [
      {
       "say": "Critical activities have equal earliest and latest start times and no float.",
       "show": "zero float"
      },
      {
       "say": "These are B, D and F.",
       "show": "$B \\to D \\to F$"
      },
      {
       "say": "Their total duration is four plus five plus four, thirteen days.",
       "show": "$13$ days"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find the total float of each non-critical activity.",
     "answer": "$A{:}\\ 1,\\ C{:}\\ 1,\\ E{:}\\ 1,\\ G{:}\\ 2$",
     "ms": [
      "M1 latest finish minus earliest start minus duration",
      "A1 A, C, E",
      "A1 G"
     ],
     "steps": [
      {
       "say": "Total float is the latest start minus the earliest start.",
       "show": "float = LS - ES"
      },
      {
       "say": "A, C and E each have one day of float.",
       "show": "$A: 1 - 0,\\ C: 4 - 3,\\ E: 6 - 5$"
      },
      {
       "say": "G has two days of float.",
       "show": "$G: 11 - 9 = 2$"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 17,
   "points": [
    "f2_bfs",
    "f2_trav",
    "f2_graph",
    "f2_tree"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "A binary search tree has root $8$. The left child of $8$ is $3$ and the right child is $10$. The children of $3$ are $1$ (left) and $6$ (right); the children of $6$ are $4$ (left) and $7$ (right). $10$ has only a right child, $14$, and $14$ has only a left child, $13$. List the order in which the vertices are visited by (i) a breadth first search, (ii) a depth first (pre-order) search, both starting at the root and visiting left before right.",
     "answer": "(i) $8, 3, 10, 1, 6, 14, 4, 7, 13$ (ii) $8, 3, 1, 6, 4, 7, 10, 14, 13$",
     "ms": [
      "M1 BFS level by level",
      "A1 BFS order",
      "M1 DFS goes as deep as possible first",
      "A1 DFS order"
     ],
     "steps": [
      {
       "say": "Breadth first search visits the tree level by level, left to right.",
       "show": "level 0: $8$; level 1: $3, 10$"
      },
      {
       "say": "Continue level by level.",
       "show": "level 2: $1, 6, 14$; level 3: $4, 7, 13$"
      },
      {
       "say": "Depth first search goes down the left branch as far as possible before backtracking.",
       "show": "$8, 3, 1, 6, 4, 7$"
      },
      {
       "say": "Then the right subtree.",
       "show": "$\\ldots, 10, 14, 13$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "For which values of $n$ is the complete graph $K_n$ Eulerian? Give a reason.",
     "answer": "$n$ odd ($n \\ge 3$): every vertex has degree $n - 1$, which must be even",
     "ms": [
      "B1 n odd",
      "B1 reason: degree n - 1 even"
     ],
     "steps": [
      {
       "say": "Each vertex of K n is joined to the other n minus one vertices.",
       "show": "$\\deg = n - 1$"
      },
      {
       "say": "A connected graph is Eulerian when every degree is even.",
       "show": "$n - 1$ even"
      },
      {
       "say": "So n must be odd.",
       "show": "$n$ odd"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "For the complete bipartite graph $K_{2,3}$: (i) state the number of edges, (ii) explain whether it is Eulerian or semi-Eulerian, (iii) explain why it has no Hamiltonian cycle.",
     "answer": "(i) $6$ (ii) semi-Eulerian: two odd vertices of degree 3 (iii) a cycle must alternate between the parts, so the parts would need equal size",
     "ms": [
      "B1 $6$",
      "M1 degrees 3, 3, 2, 2, 2",
      "A1 semi-Eulerian",
      "M1 cycle alternates sides",
      "A1 parts of different sizes, so impossible"
     ],
     "steps": [
      {
       "say": "Each of the two vertices joins each of the three, giving six edges.",
       "show": "$2 \\times 3 = 6$"
      },
      {
       "say": "The two vertices in the smaller part have degree three; the other three have degree two.",
       "show": "degrees $3, 3, 2, 2, 2$"
      },
      {
       "say": "Exactly two vertices have odd degree, so the graph is semi-Eulerian but not Eulerian.",
       "show": "semi-Eulerian"
      },
      {
       "say": "In a bipartite graph, every edge goes between the parts, so a cycle alternates sides and uses equal numbers from each part.",
       "show": "alternates"
      },
      {
       "say": "A Hamiltonian cycle would need to use all five vertices, but the parts have sizes two and three. So there is none.",
       "show": "no Hamiltonian cycle"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 18,
   "points": [
    "f2_rec",
    "f2_bool"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Solve the recurrence relation $u_{n+2} = 4u_{n+1} - 4u_n$, with $u_0 = 2$ and $u_1 = 10$.",
     "answer": "$u_n = (2 + 3n)2^n$",
     "ms": [
      "M1 auxiliary equation $r^2 - 4r + 4 = 0$",
      "A1 repeated root $2$",
      "M1 general solution $(A + Bn)2^n$",
      "M1 uses initial conditions",
      "A1 $A = 2$",
      "A1 $B = 3$"
     ],
     "steps": [
      {
       "say": "Form the auxiliary equation.",
       "show": "$r^2 - 4r + 4 = 0 \\Rightarrow (r - 2)^2 = 0$"
      },
      {
       "say": "With a repeated root, the general solution has a factor of n in the second term.",
       "show": "$u_n = (A + Bn)2^n$"
      },
      {
       "say": "Use u zero equals two.",
       "show": "$A = 2$"
      },
      {
       "say": "Use u one equals ten.",
       "show": "$2(A + B) = 10 \\Rightarrow B = 3$"
      },
      {
       "say": "So the solution is this.",
       "show": "$u_n = (2 + 3n)2^n$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find $u_5$, and check your answer using the recurrence relation.",
     "answer": "$544$",
     "ms": [
      "B1 $17 \\times 32 = 544$",
      "B1 check via $u_2 = 32,\\ u_3 = 88,\\ u_4 = 224$"
     ],
     "steps": [
      {
       "say": "Substitute n equals five.",
       "show": "$u_5 = (2 + 15) \\times 32 = 544$"
      },
      {
       "say": "Use the recurrence: u two is 32, u three is 88, u four is 224.",
       "show": "$u_2 = 32,\\ u_3 = 88,\\ u_4 = 224$"
      },
      {
       "say": "Then u five is four times 224 minus four times 88, which is 544.",
       "show": "$896 - 352 = 544\\ \\checkmark$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 5,
     "q": "Use a truth table to prove that $p \\to (q \\wedge r) \\equiv (p \\to q) \\wedge (p \\to r)$.",
     "answer": "Both columns are F exactly in rows where p is T and at least one of q, r is F",
     "ms": [
      "M1 eight rows",
      "A1 column for q and r",
      "A1 column for the left side",
      "A1 column for the right side",
      "B1 conclusion: columns identical"
     ],
     "steps": [
      {
       "say": "With three variables, the table needs eight rows.",
       "show": "$2^3 = 8$"
      },
      {
       "say": "When p is false, both sides are true, since an implication with a false premise is true.",
       "show": "$p = \\mathrm{F} \\Rightarrow$ both T"
      },
      {
       "say": "When p is true, the left side is true only if q and r are both true. The right side is also true only if both q and r are true.",
       "show": "$\\begin{array}{ccc|cc} p & q & r & p \\to (q \\wedge r) & (p \\to q) \\wedge (p \\to r) \\\\ \\hline \\mathrm{T} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{T} & \\mathrm{T} & \\mathrm{F} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{T} & \\mathrm{F} & \\mathrm{T} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{T} & \\mathrm{F} & \\mathrm{F} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{F} & \\cdot & \\cdot & \\mathrm{T} & \\mathrm{T} \\end{array}$"
      },
      {
       "say": "The last two columns agree in all eight rows (the four rows with p false are all true), so the statements are equivalent.",
       "show": "equivalent"
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
   "marks": 50
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 50
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 50
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 50
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
 "id": "f2-hard",
 "unit": "f2",
 "level": "hard",
 "title": "Further Maths AS 2 · Paper C (Hard)",
 "minutes": 90,
 "calc": true,
 "questions": [
  {
   "n": 1,
   "points": [
    "f2_hooke",
    "f2_energy"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A particle of mass $2$ kg is attached to one end of a light elastic string of natural length $1.5$ m and modulus $49$ N. The other end of the string is fixed at a point $O$ on a smooth plane inclined at $30^\\circ$ to the horizontal. The particle is held at $O$ and released from rest, and moves down the line of greatest slope. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Find the greatest extension of the string.",
     "answer": "$1.29$ m",
     "ms": [
      "M1 GPE lost $= $ EPE gained",
      "A1 $9.8(1.5 + x) = \\dfrac{49x^2}{3}$",
      "M1 forms quadratic",
      "A1 $10x^2 - 6x - 9 = 0$",
      "A1 $1.29$ m"
     ],
     "steps": [
      {
       "say": "When the particle first comes to rest it has moved 1.5 plus x metres down the slope, and so has dropped that distance times sine thirty degrees.",
       "show": "drop $= (1.5 + x)\\sin30^\\circ$"
      },
      {
       "say": "The plane is smooth, so energy is conserved: the potential energy lost becomes elastic energy.",
       "show": "$2 \\times 9.8 \\times 0.5(1.5 + x) = \\dfrac{49x^2}{2 \\times 1.5}$"
      },
      {
       "say": "Multiply by three and divide by 4.9 to simplify.",
       "show": "$10x^2 - 6x - 9 = 0$"
      },
      {
       "say": "Take the positive root.",
       "show": "$x = \\dfrac{6 + \\sqrt{396}}{20} = 1.29\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the greatest speed of the particle.",
     "answer": "$4.02\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 greatest speed where acceleration is zero",
      "A1 extension $0.3$ m",
      "M1 energy equation",
      "A1 $v^2 = 16.17$",
      "A1 $4.02$"
     ],
     "steps": [
      {
       "say": "The speed is greatest where the resultant force is zero: tension equals the weight component down the slope.",
       "show": "$\\dfrac{49e}{1.5} = 2 \\times 9.8 \\times 0.5 = 9.8$"
      },
      {
       "say": "So the extension there is 0.3 metres, and the particle has moved 1.8 metres down the slope.",
       "show": "$e = 0.3,\\quad s = 1.8$"
      },
      {
       "say": "Energy: potential lost equals kinetic plus elastic.",
       "show": "$9.8 \\times 1.8 = \\tfrac12(2)v^2 + \\dfrac{49 \\times 0.09}{3}$"
      },
      {
       "say": "So v squared is 17.64 minus 1.47.",
       "show": "$v^2 = 16.17 \\Rightarrow v = 4.02\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "Find the two distances from $O$, measured down the plane, at which the speed of the particle is $3\\ \\mathrm{m\\,s^{-1}}$ during its first descent.",
     "answer": "$0.918$ m (string slack) and $2.46$ m",
     "ms": [
      "M1 slack phase: $v^2 = 2(4.9)s$",
      "A1 $0.918$ m",
      "M1 energy with extension $x$: $9 = 9.8(1.5 + x) - \\tfrac{49x^2}{3}$",
      "A1 $x = 0.963$, distance $2.46$ m"
     ],
     "steps": [
      {
       "say": "While the string is slack, the acceleration down the slope is g sine thirty, which is 4.9.",
       "show": "$v^2 = 2 \\times 4.9 \\times s$"
      },
      {
       "say": "Setting v equal to three gives s less than 1.5, so the string is indeed still slack.",
       "show": "$s = \\dfrac{9}{9.8} = 0.918\\ \\mathrm{m}$"
      },
      {
       "say": "After the string becomes taut, use energy with extension x.",
       "show": "$\\tfrac12(2)(9) = 9.8(1.5 + x) - \\dfrac{49x^2}{3}$"
      },
      {
       "say": "This gives a quadratic; the positive root is x equals 0.963.",
       "show": "$49x^2 - 29.4x - 17.1 = 0 \\Rightarrow x = 0.963$"
      },
      {
       "say": "So the second distance is 1.5 plus 0.963.",
       "show": "$1.5 + 0.963 = 2.46\\ \\mathrm{m}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 2,
   "points": [
    "f2_power",
    "f2_work"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A car of mass $1000$ kg has an engine working at a constant rate of $24$ kW. When the speed of the car is $v\\ \\mathrm{m\\,s^{-1}}$, the resistance to motion is $(400 + 2v^2)$ N. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Show that the maximum speed of the car on a level road is $20 mathrm{m,s^{-1}}$.",
     "answer": "$v^3 + 200v - 12\\,000 = 0$ has root $v = 20$",
     "ms": [
      "M1 $\\dfrac{24\\,000}{v} = 400 + 2v^2$",
      "A1 $v^3 + 200v - 12\\,000 = 0$",
      "M1 verifies $v = 20$",
      "A1 only real root (increasing cubic)"
     ],
     "steps": [
      {
       "say": "At maximum speed the driving force equals the resistance.",
       "show": "$\\dfrac{24\\,000}{v} = 400 + 2v^2$"
      },
      {
       "say": "Multiply by v and divide by two.",
       "show": "$v^3 + 200v - 12\\,000 = 0$"
      },
      {
       "say": "Substitute v equals twenty: 8000 plus 4000 minus 12000 is zero.",
       "show": "$8000 + 4000 - 12\\,000 = 0$"
      },
      {
       "say": "The cubic is increasing for all v, so this is the only real root. The maximum speed is twenty.",
       "show": "$v = 20\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the acceleration of the car on a level road when its speed is $10\\ \\mathrm{m\\,s^{-1}}$.",
     "answer": "$1.8\\ \\mathrm{m\\,s^{-2}}$",
     "ms": [
      "M1 $F = 2400$",
      "M1 $2400 - 600 = 1000a$",
      "A1 $1.8$"
     ],
     "steps": [
      {
       "say": "The driving force is power over speed.",
       "show": "$F = \\dfrac{24\\,000}{10} = 2400\\ \\mathrm{N}$"
      },
      {
       "say": "The resistance at ten metres per second is 400 plus 200.",
       "show": "$R = 600\\ \\mathrm{N}$"
      },
      {
       "say": "Apply Newton’s second law.",
       "show": "$a = \\dfrac{2400 - 600}{1000} = 1.8\\ \\mathrm{m\\,s^{-2}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "With the engine switched off, the car freewheels down a hill inclined at $\\alpha$ to the horizontal, where $\\sin\\alpha = \\tfrac{1}{20}$. Find the terminal speed of the car.",
     "answer": "$\\sqrt{45} = 6.71\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $mg\\sin\\alpha = 400 + 2v^2$",
      "A1 $490$",
      "A1 $6.71$"
     ],
     "steps": [
      {
       "say": "At terminal speed the weight component down the hill balances the resistance.",
       "show": "$1000 \\times 9.8 \\times \\tfrac{1}{20} = 400 + 2v^2$"
      },
      {
       "say": "So 490 equals 400 plus two v squared.",
       "show": "$2v^2 = 90 \\Rightarrow v^2 = 45$"
      },
      {
       "say": "The terminal speed is about 6.71.",
       "show": "$v = 6.71\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "A force of magnitude $3\\sqrt{x}$ N acts on a particle in the direction of motion as it moves along the $x$-axis from $x = 1$ to $x = 4$. Find the work done.",
     "answer": "$14$ J",
     "ms": [
      "M1 $\\int_1^4 3x^{1/2}\\,\\mathrm{d}x$",
      "A1 $14$"
     ],
     "steps": [
      {
       "say": "Integrate the force with respect to displacement.",
       "show": "$W = \\displaystyle\\int_1^4 3x^{1/2}\\,\\mathrm{d}x$"
      },
      {
       "say": "Integrate.",
       "show": "$= \\left[2x^{3/2}\\right]_1^4$"
      },
      {
       "say": "Evaluate.",
       "show": "$= 16 - 2 = 14\\ \\mathrm{J}$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 3,
   "points": [
    "f2_power",
    "f2_energy"
   ],
   "q": "<b>Section A (Mechanics 1)</b> A pump draws water from a lake and ejects it horizontally through a nozzle $4$ m above the surface of the lake. The nozzle has cross-sectional area $0.003\\ \\mathrm{m^2}$. The pump is $75\\%$ efficient and its power input is $12$ kW. The density of water is $1000\\ \\mathrm{kg\\,m^{-3}}$. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "Find the speed at which the water leaves the nozzle.",
     "answer": "$16.7\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "B1 useful power $9000$ W",
      "B1 mass per second $3v$",
      "M1 power $=$ (PE $+$ KE) per second",
      "A1 $3v\\left(39.2 + \\tfrac12v^2\\right) = 9000$",
      "M1 solves the cubic",
      "A1 $16.7$"
     ],
     "steps": [
      {
       "say": "The useful output is seventy five per cent of twelve kilowatts.",
       "show": "$0.75 \\times 12\\,000 = 9000\\ \\mathrm{W}$"
      },
      {
       "say": "If the water leaves at speed v, the mass ejected each second is density times area times v.",
       "show": "$1000 \\times 0.003 \\times v = 3v\\ \\mathrm{kg\\,s^{-1}}$"
      },
      {
       "say": "Each second this water gains potential and kinetic energy.",
       "show": "$3v\\left(9.8 \\times 4 + \\tfrac12v^2\\right) = 9000$"
      },
      {
       "say": "This is a cubic in v.",
       "show": "$1.5v^3 + 117.6v - 9000 = 0$"
      },
      {
       "say": "Solving with a calculator gives one real root.",
       "show": "$v = 16.7\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 1,
     "q": "State one modelling assumption you have made.",
     "answer": "e.g. no energy lost to friction in the pipe; water starts from rest; nozzle height fixed",
     "ms": [
      "B1 valid assumption"
     ],
     "steps": [
      {
       "say": "We assumed all the useful power goes into the potential and kinetic energy of the water.",
       "show": "no other losses"
      },
      {
       "say": "We also assumed the water starts from rest at the surface of the lake.",
       "show": "starts from rest"
      },
      {
       "say": "Either earns the mark.",
       "show": "one assumption"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 4,
   "points": [
    "f2_conical",
    "f2_circ"
   ],
   "q": "<b>Section A (Mechanics 1)</b>  Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "A particle $P$ of mass $0.5$ kg is attached to two light inextensible strings, each of length $0.5$ m. The other ends are attached to fixed points $A$ and $B$, with $A$ vertically above $B$ and $AB = 0.6$ m. $P$ moves in a horizontal circle with both strings taut, with angular speed $8\\ \\mathrm{rad\\,s^{-1}}$. Find the tension in each string.",
     "answer": "$T_{AP} = 12.1$ N, $T_{BP} = 3.92$ N",
     "ms": [
      "B1 radius $0.4$ m, $\\cos\\theta = 0.6,\\ \\sin\\theta = 0.8$",
      "M1 vertical: $0.6T_1 - 0.6T_2 = mg$",
      "A1 $T_1 - T_2 = 8.17$",
      "M1 horizontal: $0.8(T_1 + T_2) = mr\\omega^2$",
      "A1 $T_1 + T_2 = 16$",
      "A1 $T_1 = 12.1$",
      "A1 $T_2 = 3.92$"
     ],
     "steps": [
      {
       "say": "P is level with the midpoint of A B, 0.3 metres below A. By Pythagoras the radius is 0.4 metres.",
       "show": "$r = \\sqrt{0.5^2 - 0.3^2} = 0.4,\\quad \\cos\\theta = 0.6,\\ \\sin\\theta = 0.8$"
      },
      {
       "say": "Vertically: the upper tension has an upward component, the lower tension a downward one.",
       "show": "$0.6T_1 - 0.6T_2 = 0.5 \\times 9.8$"
      },
      {
       "say": "Horizontally: both strings pull towards the axis.",
       "show": "$0.8(T_1 + T_2) = 0.5 \\times 0.4 \\times 8^2 = 12.8$"
      },
      {
       "say": "So the sum of the tensions is sixteen and the difference is 8.17.",
       "show": "$T_1 + T_2 = 16,\\quad T_1 - T_2 = 8.17$"
      },
      {
       "say": "Solve.",
       "show": "$T_1 = 12.1\\ \\mathrm{N},\\quad T_2 = 3.92\\ \\mathrm{N}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the least angular speed for which the lower string remains taut.",
     "answer": "$5.72\\ \\mathrm{rad\\,s^{-1}}$",
     "ms": [
      "M1 sets $T_2 = 0$",
      "A1 $T_1 = 8.17$",
      "M1 $0.8T_1 = 0.2\\omega^2$",
      "A1 $5.72$"
     ],
     "steps": [
      {
       "say": "At the limit, the lower string just becomes slack, so its tension is zero.",
       "show": "$T_2 = 0$"
      },
      {
       "say": "Vertically, the upper string alone supports the weight.",
       "show": "$0.6T_1 = 4.9 \\Rightarrow T_1 = 8.17$"
      },
      {
       "say": "Horizontally, it alone provides the central force.",
       "show": "$0.8 \\times 8.17 = 0.5 \\times 0.4 \\times \\omega^2$"
      },
      {
       "say": "Solve for omega.",
       "show": "$\\omega^2 = 32.7 \\Rightarrow \\omega = 5.72\\ \\mathrm{rad\\,s^{-1}}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 6,
     "q": "A car travels round a smooth banked track in a horizontal circle of radius $r$ at constant speed $v$. Prove that the angle of banking $\\theta$ satisfies $\\tan\\theta = \\dfrac{v^2}{rg}$. Hence find the angle of banking needed for a speed of $25\\ \\mathrm{m\\,s^{-1}}$ on a bend of radius $120$ m.",
     "answer": "$\\theta = 28.0^\\circ$",
     "ms": [
      "M1 resolves vertically $R\\cos\\theta = mg$",
      "M1 horizontally $R\\sin\\theta = \\dfrac{mv^2}{r}$",
      "M1 divides",
      "A1 result shown",
      "M1 substitutes",
      "A1 $28.0^\\circ$"
     ],
     "steps": [
      {
       "say": "The forces on the car are its weight and the normal reaction, perpendicular to the track.",
       "show": "weight and normal reaction only"
      },
      {
       "say": "There is no vertical acceleration.",
       "show": "$R\\cos\\theta = mg$"
      },
      {
       "say": "The horizontal component of R provides the central force.",
       "show": "$R\\sin\\theta = \\dfrac{mv^2}{r}$"
      },
      {
       "say": "Divide the second equation by the first.",
       "show": "$\\tan\\theta = \\dfrac{v^2}{rg}$"
      },
      {
       "say": "Substitute the values.",
       "show": "$\\tan\\theta = \\dfrac{625}{120 \\times 9.8} = 0.531 \\Rightarrow \\theta = 28.0^\\circ$"
      }
     ]
    }
   ],
   "section": "A"
  },
  {
   "n": 5,
   "points": [
    "f2_equil",
    "f2_hooke"
   ],
   "q": "<b>Section B (Mechanics 2)</b> A particle $P$ of mass $m$ kg rests on a rough plane inclined at $\\alpha$ to the horizontal, where $\\sin\\alpha = 0.6$. The coefficient of friction is $0.4$. $P$ is attached to a light elastic string of natural length $1.5$ m and modulus $45$ N, whose other end is fixed at a point $A$ higher up the line of greatest slope. When $AP = 2.4$ m, $P$ is in limiting equilibrium, on the point of moving up the plane. Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 7,
     "q": "Find $m$.",
     "answer": "$m = 2.99$",
     "ms": [
      "B1 $T = 27$ N",
      "B1 $\\cos\\alpha = 0.8$",
      "M1 $R = 0.8mg$",
      "M1 friction down the plane",
      "M1 $T = mg\\sin\\alpha + \\mu R$",
      "A1 $27 = 9.016m$",
      "A1 $2.99$"
     ],
     "steps": [
      {
       "say": "The extension is 0.9 metres, so the tension is 27 newtons.",
       "show": "$T = \\dfrac{45 \\times 0.9}{1.5} = 27\\ \\mathrm{N}$"
      },
      {
       "say": "Resolve perpendicular to the plane, with cos alpha equal to 0.8.",
       "show": "$R = 0.8 \\times 9.8m = 7.84m$"
      },
      {
       "say": "P is about to move up, so friction acts down the plane at its limiting value.",
       "show": "$F = 0.4 \\times 7.84m = 3.136m$"
      },
      {
       "say": "Resolve along the plane.",
       "show": "$27 = 9.8m(0.6) + 3.136m = 9.016m$"
      },
      {
       "say": "Solve.",
       "show": "$m = 2.99$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Find the least value of $AP$ for which $P$ can rest in equilibrium.",
     "answer": "$1.77$ m",
     "ms": [
      "M1 friction up the plane",
      "M1 $T = m(5.88 - 3.136)$",
      "A1 $T = 8.22$ N",
      "M1 Hooke’s law",
      "A1 $1.77$ m"
     ],
     "steps": [
      {
       "say": "The shortest length is when P is about to slip down, with friction acting up the plane.",
       "show": "limiting, about to slip down"
      },
      {
       "say": "Resolve along the plane.",
       "show": "$T + 3.136m = 5.88m \\Rightarrow T = 2.744m$"
      },
      {
       "say": "Substitute the mass.",
       "show": "$T = 2.744 \\times 2.995 = 8.22\\ \\mathrm{N}$"
      },
      {
       "say": "Find the extension and add the natural length.",
       "show": "$x = \\dfrac{8.22 \\times 1.5}{45} = 0.274 \\Rightarrow AP = 1.77\\ \\mathrm{m}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 6,
   "points": [
    "f2_resv",
    "f2_relv"
   ],
   "q": "<b>Section B (Mechanics 2)</b> In this question $\\mathbf{i}$ and $\\mathbf{j}$ are unit vectors due east and due north.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "An aircraft has airspeed $250\\ \\mathrm{km\\,h^{-1}}$. A wind blows from the west at $60\\ \\mathrm{km\\,h^{-1}}$. The pilot wants the aircraft to travel on a bearing of $045^\\circ$ relative to the ground. Find the bearing on which the aircraft must be headed and its ground speed.",
     "answer": "heading $035.2^\\circ$; ground speed $289\\ \\mathrm{km\\,h^{-1}}$",
     "ms": [
      "B1 wind $60\\mathbf{i}$",
      "M1 air velocity $250(\\sin\\phi\\,\\mathbf{i} + \\cos\\phi\\,\\mathbf{j})$",
      "M1 equal components for bearing $045^\\circ$",
      "A1 $\\cos\\phi - \\sin\\phi = 0.24$",
      "A1 $\\phi = 35.2^\\circ$",
      "A1 $289$"
     ],
     "steps": [
      {
       "say": "A wind from the west blows towards the east, so its velocity is sixty i. Let the heading be the bearing phi.",
       "show": "$\\mathbf{w} = 60\\mathbf{i},\\quad \\mathbf{a} = 250\\sin\\phi\\,\\mathbf{i} + 250\\cos\\phi\\,\\mathbf{j}$"
      },
      {
       "say": "For a ground track on bearing 045, the east and north components of the resultant must be equal.",
       "show": "$250\\sin\\phi + 60 = 250\\cos\\phi$"
      },
      {
       "say": "Rearrange and use the R cos form.",
       "show": "$\\cos\\phi - \\sin\\phi = 0.24 \\Rightarrow \\sqrt2\\cos(\\phi + 45^\\circ) = 0.24$"
      },
      {
       "say": "Solve for phi.",
       "show": "$\\phi + 45^\\circ = 80.2^\\circ \\Rightarrow \\phi = 35.2^\\circ$"
      },
      {
       "say": "Each component of the ground velocity is 250 cos phi, about 204, so the ground speed is root two times that.",
       "show": "$|\\mathbf{v}| = \\sqrt2 \\times 204.2 = 289\\ \\mathrm{km\\,h^{-1}}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "At noon, boat $P$ is at the origin with velocity $(10\\mathbf{i} + 5\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$ and boat $Q$ is at $(20\\mathbf{i} - 10\\mathbf{j})$ km with velocity $(-5\\mathbf{i} + 10\\mathbf{j})\\ \\mathrm{km\\,h^{-1}}$. Visibility is $3.5$ km. Find the least distance between the boats and the time when it occurs, and determine whether the boats come within sight of each other.",
     "answer": "$\\sqrt{10} = 3.16$ km at $13{:}24$; yes, $3.16 < 3.5$",
     "ms": [
      "M1 relative velocity $-15\\mathbf{i} + 5\\mathbf{j}$",
      "M1 relative position $(20 - 15t)\\mathbf{i} + (-10 + 5t)\\mathbf{j}$",
      "M1 minimises",
      "A1 $t = 1.4$",
      "A1 $13{:}24$",
      "A1 $\\sqrt{10}$",
      "B1 within sight, since $3.16 < 3.5$"
     ],
     "steps": [
      {
       "say": "Find the velocity of Q relative to P.",
       "show": "$\\mathbf{v}_Q - \\mathbf{v}_P = -15\\mathbf{i} + 5\\mathbf{j}$"
      },
      {
       "say": "So the position of Q relative to P is this.",
       "show": "$\\mathbf{r} = (20 - 15t)\\mathbf{i} + (-10 + 5t)\\mathbf{j}$"
      },
      {
       "say": "At closest approach r is perpendicular to the relative velocity.",
       "show": "$-15(20 - 15t) + 5(-10 + 5t) = 0 \\Rightarrow 250t = 350$"
      },
      {
       "say": "t is 1.4 hours, which is 1 hour 24 minutes after noon.",
       "show": "$t = 1.4 \\Rightarrow 13{:}24$"
      },
      {
       "say": "Substitute: the relative position is minus i minus three j.",
       "show": "$d = \\sqrt{1 + 9} = \\sqrt{10} = 3.16\\ \\mathrm{km}$"
      },
      {
       "say": "This is less than the visibility of 3.5 kilometres, so the boats do come within sight.",
       "show": "$3.16 < 3.5$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 7,
   "points": [
    "f2_vcirc"
   ],
   "q": "<b>Section B (Mechanics 2)</b>  Take $g = 9.8\\ \\mathrm{m\\,s^{-2}}$.",
   "parts": [
    {
     "l": "a",
     "marks": 6,
     "q": "A particle is placed at the top of a fixed smooth sphere of radius $a$ and is slightly displaced. Prove that it leaves the surface of the sphere when the radius to the particle makes an angle $\\cos^{-1}\\tfrac23$ with the upward vertical.",
     "answer": "$R = mg\\cos\\theta - \\dfrac{mv^2}{a}$, $v^2 = 2ga(1 - \\cos\\theta)$, $R = 0 \\Rightarrow \\cos\\theta = \\tfrac23$",
     "ms": [
      "M1 energy equation",
      "A1 $v^2 = 2ga(1 - \\cos\\theta)$",
      "M1 radial equation",
      "A1 $mg\\cos\\theta - R = \\dfrac{mv^2}{a}$",
      "M1 sets $R = 0$",
      "A1 $\\cos\\theta = \\tfrac23$ shown"
     ],
     "steps": [
      {
       "say": "Let theta be the angle from the upward vertical. The particle has dropped a times one minus cos theta.",
       "show": "$h = a(1 - \\cos\\theta)$"
      },
      {
       "say": "The sphere is smooth, so energy is conserved, and the speed at the top is effectively zero.",
       "show": "$v^2 = 2ga(1 - \\cos\\theta)$"
      },
      {
       "say": "Towards the centre, the weight component minus the normal reaction gives the central force.",
       "show": "$mg\\cos\\theta - R = \\dfrac{mv^2}{a}$"
      },
      {
       "say": "The particle leaves the surface when the reaction becomes zero.",
       "show": "$g\\cos\\theta = 2g(1 - \\cos\\theta)$"
      },
      {
       "say": "Solve for cos theta.",
       "show": "$3\\cos\\theta = 2 \\Rightarrow \\theta = \\cos^{-1}\\tfrac23 \\approx 48.2^\\circ$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 7,
     "q": "A particle on a light inextensible string of length $0.6$ m is projected horizontally from the point directly below the fixed end $O$ with speed $u$. The string becomes slack when it makes an angle of $60^\\circ$ with the upward vertical. Find $u$.",
     "answer": "$4.54\\ \\mathrm{m\\,s^{-1}}$",
     "ms": [
      "M1 $T = 0$ condition at slack point",
      "A1 $v^2 = ga\\cos60^\\circ = 2.94$",
      "B1 height above start $a(1 + \\cos60^\\circ) = 0.9$ m",
      "M1 energy equation",
      "A1 $u^2 = 2.94 + 17.64$",
      "A1 $u^2 = 20.58$",
      "A1 $4.54$"
     ],
     "steps": [
      {
       "say": "At the slack point the tension is zero, so the weight component towards O provides the central force.",
       "show": "$mg\\cos60^\\circ = \\dfrac{mv^2}{a}$"
      },
      {
       "say": "So v squared is g a cos sixty.",
       "show": "$v^2 = 9.8 \\times 0.6 \\times 0.5 = 2.94$"
      },
      {
       "say": "The particle is then a times one plus cos sixty above its starting point.",
       "show": "$h = 0.6(1 + 0.5) = 0.9\\ \\mathrm{m}$"
      },
      {
       "say": "Energy from the lowest point.",
       "show": "$u^2 = v^2 + 2gh = 2.94 + 17.64 = 20.58$"
      },
      {
       "say": "Take the square root.",
       "show": "$u = 4.54\\ \\mathrm{m\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 8,
   "points": [
    "f2_grav"
   ],
   "q": "<b>Section B (Mechanics 2)</b> The Earth may be modelled as a sphere of radius $6.37 \\times 10^6$ m, with $g = 9.8\\ \\mathrm{m\\,s^{-2}}$ at its surface.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "A satellite moves in a circular orbit $600$ km above the Earth’s surface. Find the period of the orbit in minutes.",
     "answer": "$96.6$ minutes",
     "ms": [
      "B1 $GM = gR^2$",
      "B1 $r = 6.97 \\times 10^6$ m",
      "M1 $T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}$",
      "A1 correct substitution",
      "A1 $96.6$"
     ],
     "steps": [
      {
       "say": "At the surface, g equals G M over R squared, so G M equals g R squared.",
       "show": "$GM = 9.8 \\times (6.37 \\times 10^6)^2$"
      },
      {
       "say": "The orbit radius is measured from the centre.",
       "show": "$r = 6.37 \\times 10^6 + 6 \\times 10^5 = 6.97 \\times 10^6\\ \\mathrm{m}$"
      },
      {
       "say": "For a circular orbit, gravity provides the central force, giving this period.",
       "show": "$T = 2\\pi\\sqrt{\\dfrac{r^3}{gR^2}}$"
      },
      {
       "say": "Evaluate and convert to minutes.",
       "show": "$T = 5798\\ \\mathrm{s} = 96.6\\ \\text{minutes}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 2,
     "q": "Find the speed of the satellite.",
     "answer": "$7.55\\ \\mathrm{km\\,s^{-1}}$",
     "ms": [
      "M1 $v = \\sqrt{\\dfrac{gR^2}{r}}$ or $\\dfrac{2\\pi r}{T}$",
      "A1 $7550\\ \\mathrm{m\\,s^{-1}}$"
     ],
     "steps": [
      {
       "say": "Use v squared equals G M over r.",
       "show": "$v = \\sqrt{\\dfrac{gR^2}{r}}$"
      },
      {
       "say": "Substitute.",
       "show": "$v = \\sqrt{\\dfrac{9.8 \\times (6.37 \\times 10^6)^2}{6.97 \\times 10^6}}$"
      },
      {
       "say": "The speed is about 7550 metres per second.",
       "show": "$v = 7550\\ \\mathrm{m\\,s^{-1}} = 7.55\\ \\mathrm{km\\,s^{-1}}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 9,
   "points": [
    "f2_dim"
   ],
   "q": "<b>Section B (Mechanics 2)</b> The volume of liquid flowing per second, $Q$, through a narrow pipe depends on the pressure gradient $p$ (pressure per unit length), the radius $r$ of the pipe and the viscosity $\\eta$ of the liquid, which has dimensions $ML^{-1}T^{-1}$.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Assuming $Q = kp^\\alpha r^\\beta \\eta^\\gamma$, where $k$ is a dimensionless constant, find $\\alpha$, $\\beta$ and $\\gamma$.",
     "answer": "$\\alpha = 1,\\ \\beta = 4,\\ \\gamma = -1$, so $Q = \\dfrac{kpr^4}{\\eta}$",
     "ms": [
      "B1 $[p] = ML^{-2}T^{-2}$",
      "M1 equates powers of $M$, $L$, $T$",
      "A1 $\\alpha = 1$",
      "A1 $\\gamma = -1$",
      "A1 $\\beta = 4$"
     ],
     "steps": [
      {
       "say": "Pressure is force per area, M L to the minus one T to the minus two. Dividing by length gives the gradient.",
       "show": "$[p] = ML^{-2}T^{-2}$"
      },
      {
       "say": "Write the dimensions of both sides. Q is a volume per second.",
       "show": "$L^3T^{-1} = (ML^{-2}T^{-2})^\\alpha L^\\beta (ML^{-1}T^{-1})^\\gamma$"
      },
      {
       "say": "Compare powers.",
       "show": "$M: \\alpha + \\gamma = 0,\\quad T: -2\\alpha - \\gamma = -1,\\quad L: -2\\alpha + \\beta - \\gamma = 3$"
      },
      {
       "say": "From the first two, alpha is one and gamma is minus one. Then beta is four.",
       "show": "$\\alpha = 1,\\ \\gamma = -1,\\ \\beta = 4$"
      },
      {
       "say": "So the flow rate is proportional to the fourth power of the radius.",
       "show": "$Q = \\dfrac{kpr^4}{\\eta}$"
      }
     ]
    }
   ],
   "section": "B"
  },
  {
   "n": 10,
   "points": [
    "f2_samp"
   ],
   "q": "<b>Section C (Statistics)</b> A gym manager wants to estimate the mean time members spend in the gym per visit. She records the times of the first 50 members to arrive on a Monday morning.",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Name this sampling method, explain why the sample may be biased, and describe a better method, explaining why it is better.",
     "answer": "Opportunity sampling; Monday morning members may not be typical (e.g. retired people, early workouts); use stratified sampling by time of day / day of week, with random selection in each stratum, so all groups are represented in proportion",
     "ms": [
      "B1 opportunity sampling",
      "B1 reason for bias in context",
      "M1 names a suitable random method",
      "A1 describes it in context",
      "B1 explains improvement"
     ],
     "steps": [
      {
       "say": "She uses whoever arrives first, which is opportunity sampling.",
       "show": "opportunity sampling"
      },
      {
       "say": "Members on Monday mornings may not be typical, for example they may be retired people or people fitting a short session in before work.",
       "show": "biased in context"
      },
      {
       "say": "A better method is stratified sampling by time slot and day of the week, in proportion to attendance.",
       "show": "stratify by time slot and day"
      },
      {
       "say": "Within each stratum, select visits at random, for example using random numbers on the entry log.",
       "show": "random within strata"
      },
      {
       "say": "This represents all types of visit in the right proportions and removes selection bias.",
       "show": "more representative"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 11,
   "points": [
    "f2_perm",
    "f2_pprob"
   ],
   "q": "<b>Section C (Statistics)</b> The ten letters of the word STATISTICS are written on ten tiles.",
   "parts": [
    {
     "l": "a",
     "marks": 2,
     "q": "Find the number of different arrangements of the ten letters.",
     "answer": "$50\\,400$",
     "ms": [
      "M1 $\\dfrac{10!}{3!\\,3!\\,2!}$",
      "A1 $50\\,400$"
     ],
     "steps": [
      {
       "say": "There are three S, three T, two I, one A and one C.",
       "show": "$S^3\\,T^3\\,I^2\\,A\\,C$"
      },
      {
       "say": "Divide ten factorial by the factorials of the repeats.",
       "show": "$\\dfrac{10!}{3!\\,3!\\,2!}$"
      },
      {
       "say": "That is 50400.",
       "show": "$50\\,400$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find the number of arrangements that begin and end with S.",
     "answer": "$3360$",
     "ms": [
      "M1 fixes S at both ends",
      "M1 $\\dfrac{8!}{3!\\,2!}$",
      "A1 $3360$"
     ],
     "steps": [
      {
       "say": "Place an S at each end. The middle eight letters are one S, three T, two I, A and C.",
       "show": "middle: S, T, T, T, I, I, A, C"
      },
      {
       "say": "Arrange these eight letters.",
       "show": "$\\dfrac{8!}{3!\\,2!}$"
      },
      {
       "say": "That gives 3360.",
       "show": "$3360$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "An arrangement is chosen at random. Find the probability that no two S are next to each other.",
     "answer": "$\\tfrac{7}{15}$",
     "ms": [
      "M1 arranges the 7 non-S letters: $\\dfrac{7!}{3!\\,2!} = 420$",
      "M1 chooses 3 of 8 gaps: $\\binom83$",
      "A1 $23\\,520$",
      "A1 $\\tfrac{7}{15}$"
     ],
     "steps": [
      {
       "say": "First arrange the seven letters that are not S.",
       "show": "$\\dfrac{7!}{3!\\,2!} = 420$"
      },
      {
       "say": "There are eight gaps, including the ends. Choose three of them for the S tiles.",
       "show": "$\\binom83 = 56$"
      },
      {
       "say": "Multiply.",
       "show": "$420 \\times 56 = 23\\,520$"
      },
      {
       "say": "Divide by the total number of arrangements.",
       "show": "$\\dfrac{23\\,520}{50\\,400} = \\dfrac{7}{15}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Four tiles are chosen at random. Find the probability that exactly two of them show T.",
     "answer": "$0.3$",
     "ms": [
      "M1 $\\binom32\\binom72$",
      "M1 $\\div \\binom{10}{4}$",
      "A1 $0.3$"
     ],
     "steps": [
      {
       "say": "Choose two of the three T tiles and two of the seven others.",
       "show": "$\\binom32\\binom72 = 3 \\times 21 = 63$"
      },
      {
       "say": "The total number of selections of four tiles.",
       "show": "$\\binom{10}{4} = 210$"
      },
      {
       "say": "Divide.",
       "show": "$\\dfrac{63}{210} = 0.3$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 12,
   "points": [
    "f2_drv"
   ],
   "q": "<b>Section C (Statistics)</b> The discrete random variable $X$ has the probability distribution below, and $\\mathrm{E}(X) = 1.5$.\n$$\\begin{array}{c|cccc} x & 0 & 1 & 2 & 3 \\\\ \\hline \\mathrm{P}(X = x) & a & b & 0.3 & 0.2 \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find $a$ and $b$.",
     "answer": "$a = 0.2,\\ b = 0.3$",
     "ms": [
      "M1 $b + 0.6 + 0.6 = 1.5$",
      "A1 $b = 0.3$",
      "A1 $a = 0.2$"
     ],
     "steps": [
      {
       "say": "Use the expectation.",
       "show": "$0(a) + 1(b) + 2(0.3) + 3(0.2) = 1.5$"
      },
      {
       "say": "So b plus 1.2 equals 1.5.",
       "show": "$b = 0.3$"
      },
      {
       "say": "The probabilities sum to one.",
       "show": "$a = 1 - 0.3 - 0.3 - 0.2 = 0.2$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Find $\\mathrm{Var}(X)$.",
     "answer": "$1.05$",
     "ms": [
      "M1 $\\mathrm{E}(X^2)$",
      "A1 $3.3$",
      "A1 $1.05$"
     ],
     "steps": [
      {
       "say": "Find the expectation of x squared.",
       "show": "$\\mathrm{E}(X^2) = 0.3 + 4(0.3) + 9(0.2) = 3.3$"
      },
      {
       "say": "Subtract the square of the mean.",
       "show": "$\\mathrm{Var}(X) = 3.3 - 1.5^2$"
      },
      {
       "say": "The variance is 1.05.",
       "show": "$1.05$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Two independent observations of $X$ are taken. Find the probability that their sum is 3.",
     "answer": "$0.26$",
     "ms": [
      "M1 lists pairs $(0,3), (3,0), (1,2), (2,1)$",
      "M1 multiplies and adds",
      "A1 $0.26$"
     ],
     "steps": [
      {
       "say": "The pairs that sum to three are zero and three, three and zero, one and two, two and one.",
       "show": "$(0,3),\\ (3,0),\\ (1,2),\\ (2,1)$"
      },
      {
       "say": "Multiply the probabilities for each pair.",
       "show": "$2(0.2 \\times 0.2) + 2(0.3 \\times 0.3)$"
      },
      {
       "say": "Add.",
       "show": "$0.08 + 0.18 = 0.26$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "The random variable $Y = 10 - 4X$. Find $\\mathrm{E}(Y)$ and $\\mathrm{Var}(Y)$.",
     "answer": "$4$ and $16.8$",
     "ms": [
      "B1 $4$",
      "B1 $16.8$"
     ],
     "steps": [
      {
       "say": "Expectation is linear.",
       "show": "$\\mathrm{E}(Y) = 10 - 4(1.5) = 4$"
      },
      {
       "say": "For the variance, square the multiplier; the sign and the constant do not matter.",
       "show": "$\\mathrm{Var}(Y) = 16 \\times 1.05$"
      },
      {
       "say": "The variance is 16.8.",
       "show": "$16.8$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 13,
   "points": [
    "f2_crv"
   ],
   "q": "<b>Section C (Statistics)</b> The continuous random variable $X$ has probability density function\n$$\\mathrm{f}(x) = \\begin{cases} kx & 0 \\le x \\le 2 \\\\ \\tfrac12k(6 - x) & 2 < x \\le 6 \\\\ 0 & \\text{otherwise.} \\end{cases}$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Find $k$.",
     "answer": "$k = \\tfrac16$",
     "ms": [
      "M1 total area $= 1$",
      "A1 $6k = 1$",
      "A1 $\\tfrac16$"
     ],
     "steps": [
      {
       "say": "The graph of f is a triangle with base from zero to six and peak height two k at x equals two.",
       "show": "peak $\\mathrm{f}(2) = 2k$"
      },
      {
       "say": "The area of the triangle must be one.",
       "show": "$\\tfrac12 \\times 6 \\times 2k = 6k = 1$"
      },
      {
       "say": "So k is one sixth.",
       "show": "$k = \\tfrac16$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find $\\mathrm{E}(X)$.",
     "answer": "$\\tfrac83$",
     "ms": [
      "M1 splits into two integrals",
      "A1 $\\tfrac49$",
      "A1 $\\tfrac{20}{9}$",
      "A1 $\\tfrac83$"
     ],
     "steps": [
      {
       "say": "Integrate x f of x over each piece.",
       "show": "$\\mathrm{E}(X) = \\displaystyle\\int_0^2 \\frac{x^2}{6}\\,\\mathrm{d}x + \\int_2^6 \\frac{x(6 - x)}{12}\\,\\mathrm{d}x$"
      },
      {
       "say": "The first integral is four ninths.",
       "show": "$\\left[\\tfrac{x^3}{18}\\right]_0^2 = \\tfrac49$"
      },
      {
       "say": "The second is twenty ninths.",
       "show": "$\\tfrac{1}{12}\\left[3x^2 - \\tfrac{x^3}{3}\\right]_2^6 = \\tfrac{1}{12}\\left(36 - \\tfrac{28}{3}\\right) = \\tfrac{20}{9}$"
      },
      {
       "say": "Add them.",
       "show": "$\\mathrm{E}(X) = \\tfrac{24}{9} = \\tfrac83$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Find $\\mathrm{Var}(X)$.",
     "answer": "$\\tfrac{14}{9}$",
     "ms": [
      "M1 $\\mathrm{E}(X^2)$ by two integrals",
      "A1 $\\tfrac{26}{3}$",
      "A1 $\\tfrac{14}{9}$"
     ],
     "steps": [
      {
       "say": "Find the expectation of x squared.",
       "show": "$\\displaystyle\\int_0^2 \\frac{x^3}{6}\\,\\mathrm{d}x + \\int_2^6 \\frac{x^2(6 - x)}{12}\\,\\mathrm{d}x = \\tfrac23 + 8$"
      },
      {
       "say": "So the expectation of x squared is twenty six thirds.",
       "show": "$\\mathrm{E}(X^2) = \\tfrac{26}{3}$"
      },
      {
       "say": "Subtract the square of the mean.",
       "show": "$\\mathrm{Var}(X) = \\tfrac{26}{3} - \\tfrac{64}{9} = \\tfrac{14}{9}$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 3,
     "q": "Find $\\mathrm{P}(1 < X < 4)$.",
     "answer": "$\\tfrac34$",
     "ms": [
      "M1 splits at $x = 2$",
      "A1 $\\tfrac14$ and $\\tfrac12$",
      "A1 $\\tfrac34$"
     ],
     "steps": [
      {
       "say": "Split the interval at two, where the formula changes.",
       "show": "$\\displaystyle\\int_1^2 \\frac{x}{6}\\,\\mathrm{d}x + \\int_2^4 \\frac{6 - x}{12}\\,\\mathrm{d}x$"
      },
      {
       "say": "The first part is one quarter, the second is one half.",
       "show": "$\\tfrac{4 - 1}{12} = \\tfrac14,\\quad \\tfrac{1}{12}\\left[6x - \\tfrac{x^2}{2}\\right]_2^4 = \\tfrac{6}{12} = \\tfrac12$"
      },
      {
       "say": "Add.",
       "show": "$\\mathrm{P}(1 < X < 4) = \\tfrac34$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 14,
   "points": [
    "f2_pois",
    "f2_geo"
   ],
   "q": "<b>Section C (Statistics)</b> Telephone calls arrive at a help desk at random at an average rate of 3 every 10 minutes.",
   "parts": [
    {
     "l": "a",
     "marks": 4,
     "q": "Find the probability that (i) exactly 4 calls arrive in a 10-minute period, (ii) at most 1 call arrives in a 5-minute period.",
     "answer": "(i) $0.168$ (ii) $0.558$",
     "ms": [
      "M1 Poisson with $\\lambda = 3$",
      "A1 $0.168$",
      "M1 $\\lambda = 1.5$ and $\\mathrm{e}^{-1.5}(1 + 1.5)$",
      "A1 $0.558$"
     ],
     "steps": [
      {
       "say": "For ten minutes the mean is three.",
       "show": "$X \\sim \\mathrm{Po}(3)$"
      },
      {
       "say": "Use the Poisson formula.",
       "show": "$\\mathrm{P}(X = 4) = \\dfrac{\\mathrm{e}^{-3}3^4}{4!} = 0.168$"
      },
      {
       "say": "For five minutes the mean halves to 1.5.",
       "show": "$Y \\sim \\mathrm{Po}(1.5)$"
      },
      {
       "say": "At most one call.",
       "show": "$\\mathrm{P}(Y \\le 1) = \\mathrm{e}^{-1.5}(1 + 1.5) = 0.558$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 5,
     "q": "Consecutive 10-minute periods are observed. Find the probability that the first period with no calls is the fourth period, and the expected number of periods up to and including the first with no calls.",
     "answer": "$0.0427$; $\\mathrm{e}^3 \\approx 20.1$",
     "ms": [
      "B1 $p = \\mathrm{e}^{-3}$",
      "M1 geometric $(1 - p)^3p$",
      "A1 $0.0427$",
      "M1 $\\mathrm{E} = \\dfrac1p$",
      "A1 $20.1$"
     ],
     "steps": [
      {
       "say": "The probability that a given period has no calls is e to the minus three.",
       "show": "$p = \\mathrm{e}^{-3} = 0.0498$"
      },
      {
       "say": "Periods are independent, so the number of periods until the first quiet one is geometric.",
       "show": "$N \\sim \\mathrm{Geo}(\\mathrm{e}^{-3})$"
      },
      {
       "say": "The first quiet period is the fourth: three busy periods, then a quiet one.",
       "show": "$\\mathrm{P}(N = 4) = (1 - \\mathrm{e}^{-3})^3\\mathrm{e}^{-3} = 0.0427$"
      },
      {
       "say": "The mean of a geometric distribution is one over p.",
       "show": "$\\mathrm{E}(N) = \\mathrm{e}^3 = 20.1$"
      }
     ]
    }
   ],
   "section": "C"
  },
  {
   "n": 15,
   "points": [
    "f2_grp",
    "f2_sub",
    "f2_iso"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> $\\mathbf{I} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$, $\\mathbf{A} = \\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$, $\\mathbf{B} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, $\\mathbf{C} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$. The set $M = \\{\\mathbf{I}, \\mathbf{A}, \\mathbf{B}, \\mathbf{C}\\}$ forms a group under matrix multiplication.",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Construct the Cayley table for $M$.",
     "answer": "$\\mathbf{A}^2 = \\mathbf{I},\\ \\mathbf{AB} = \\mathbf{C},\\ \\mathbf{AC} = \\mathbf{B},\\ \\mathbf{B}^2 = \\mathbf{A},\\ \\mathbf{BC} = \\mathbf{I},\\ \\mathbf{C}^2 = \\mathbf{A}$",
     "ms": [
      "M1 at least three products correct",
      "A1 at most one error",
      "A1 fully correct"
     ],
     "steps": [
      {
       "say": "A is minus the identity, so A times any matrix just changes its sign.",
       "show": "$\\mathbf{A}^2 = \\mathbf{I},\\ \\mathbf{AB} = \\mathbf{C},\\ \\mathbf{AC} = \\mathbf{B}$"
      },
      {
       "say": "B is a quarter turn and C is the opposite quarter turn.",
       "show": "$\\mathbf{B}^2 = \\mathbf{A},\\ \\mathbf{BC} = \\mathbf{I},\\ \\mathbf{C}^2 = \\mathbf{A}$"
      },
      {
       "say": "The completed table. It is symmetric because these matrices commute.",
       "show": "$\\begin{array}{c|cccc} & \\mathbf{I} & \\mathbf{A} & \\mathbf{B} & \\mathbf{C} \\\\ \\hline \\mathbf{I} & \\mathbf{I} & \\mathbf{A} & \\mathbf{B} & \\mathbf{C} \\\\ \\mathbf{A} & \\mathbf{A} & \\mathbf{I} & \\mathbf{C} & \\mathbf{B} \\\\ \\mathbf{B} & \\mathbf{B} & \\mathbf{C} & \\mathbf{A} & \\mathbf{I} \\\\ \\mathbf{C} & \\mathbf{C} & \\mathbf{B} & \\mathbf{I} & \\mathbf{A} \\end{array}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 3,
     "q": "Show that $M$ is cyclic and state its generators.",
     "answer": "$\\mathbf{B}$ has period $4$: $\\mathbf{B}, \\mathbf{A}, \\mathbf{C}, \\mathbf{I}$; generators $\\mathbf{B}$ and $\\mathbf{C}$",
     "ms": [
      "M1 powers of B",
      "A1 period 4 so cyclic",
      "A1 generators B and C"
     ],
     "steps": [
      {
       "say": "Find the powers of B.",
       "show": "$\\mathbf{B}^1 = \\mathbf{B},\\ \\mathbf{B}^2 = \\mathbf{A},\\ \\mathbf{B}^3 = \\mathbf{C},\\ \\mathbf{B}^4 = \\mathbf{I}$"
      },
      {
       "say": "B generates all four elements, so M is cyclic.",
       "show": "cyclic"
      },
      {
       "say": "C is the inverse of B, so it also has period four. A has period two.",
       "show": "generators $\\mathbf{B},\\ \\mathbf{C}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "$H = \\{1, 3, 7, 9\\}$ under multiplication modulo $10$ is a group. Show that $H$ is isomorphic to $M$, stating a suitable mapping.",
     "answer": "$3$ has period 4 in $H$; $\\mathbf{I} \\mapsto 1,\\ \\mathbf{B} \\mapsto 3,\\ \\mathbf{A} \\mapsto 9,\\ \\mathbf{C} \\mapsto 7$",
     "ms": [
      "M1 finds the period of 3 in H",
      "A1 both cyclic of order 4",
      "A1 correct mapping"
     ],
     "steps": [
      {
       "say": "Find the powers of three modulo ten.",
       "show": "$3, 9, 27 \\equiv 7, 81 \\equiv 1$"
      },
      {
       "say": "So three has period four and H is cyclic of order four, just like M.",
       "show": "both cyclic, order 4"
      },
      {
       "say": "Match generator to generator and powers to powers.",
       "show": "$\\mathbf{I} \\mapsto 1,\\ \\mathbf{B} \\mapsto 3,\\ \\mathbf{A} = \\mathbf{B}^2 \\mapsto 9,\\ \\mathbf{C} = \\mathbf{B}^3 \\mapsto 7$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "The group $K = \\{1, 3, 5, 7\\}$ under multiplication modulo $8$ has every non-identity element of period $2$. Explain why $K$ is not isomorphic to $H$.",
     "answer": "Isomorphisms preserve periods; $H$ has an element of period $4$ but $K$ does not",
     "ms": [
      "B1 isomorphism preserves period",
      "B1 H has period-4 element, K has none"
     ],
     "steps": [
      {
       "say": "An isomorphism maps each element to one of the same period.",
       "show": "periods preserved"
      },
      {
       "say": "H contains three, of period four.",
       "show": "period of $3$ in $H$ is $4$"
      },
      {
       "say": "K has no element of period four, so no isomorphism exists.",
       "show": "not isomorphic"
      }
     ]
    },
    {
     "l": "e",
     "marks": 3,
     "q": "List the proper subgroups of $H$, and explain, using Lagrange’s theorem, why no group of order $10$ can have a subgroup of order $4$.",
     "answer": "$\\{1\\},\\ \\{1, 9\\}$; $4$ does not divide $10$",
     "ms": [
      "B1 {1} and {1, 9}",
      "B1 no others",
      "B1 Lagrange"
     ],
     "steps": [
      {
       "say": "Nine has period two, so one and nine form a subgroup.",
       "show": "$\\{1, 9\\}$"
      },
      {
       "say": "Any subgroup containing three or seven contains all their powers, which is the whole group. So the proper subgroups are just these.",
       "show": "$\\{1\\},\\ \\{1, 9\\}$"
      },
      {
       "say": "By Lagrange’s theorem, a subgroup’s order divides the group’s order. Four does not divide ten.",
       "show": "no subgroup of order 4"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 16,
   "points": [
    "f2_prim",
    "f2_dijk",
    "f2_trav",
    "f2_cpa"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> The table shows the lengths of the edges, in metres, of a network of paths. A dash means there is no direct path.\n$$\\begin{array}{c|cccccc} & A & B & C & D & E & F \\\\ \\hline A & - & 5 & 8 & - & - & - \\\\ B & 5 & - & 2 & 6 & 9 & - \\\\ C & 8 & 2 & - & 3 & - & 11 \\\\ D & - & 6 & 3 & - & 4 & 7 \\\\ E & - & 9 & - & 4 & - & 4 \\\\ F & - & - & 11 & 7 & 4 & - \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Apply Prim’s algorithm to the table, starting at $A$, to find a minimum spanning tree. List the edges in the order selected and state the total length.",
     "answer": "$AB, BC, CD, DE, EF$; $18$ m",
     "ms": [
      "M1 starts at $A$ with $AB$",
      "A1 $BC$, $CD$",
      "A1 $DE$",
      "A1 $EF$",
      "A1 $18$"
     ],
     "steps": [
      {
       "say": "Start with column A: the smallest entry is A B, five.",
       "show": "$AB = 5$"
      },
      {
       "say": "From A and B, the smallest entry to a new vertex is B C, two. Then from A, B, C the smallest is C D, three.",
       "show": "$BC = 2,\\ CD = 3$"
      },
      {
       "say": "From A, B, C, D the smallest new entry is D E, four.",
       "show": "$DE = 4$"
      },
      {
       "say": "Finally, the cheapest way to reach F is E F, four, rather than D F at seven.",
       "show": "$EF = 4$"
      },
      {
       "say": "The total length is eighteen metres.",
       "show": "$5 + 2 + 3 + 4 + 4 = 18\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 6,
     "q": "Use Dijkstra’s algorithm to find the shortest route from $A$ to $F$, showing your final labels.",
     "answer": "$A\\,B\\,C\\,D\\,F$, $17$ m",
     "ms": [
      "M1 permanent labels in order",
      "A1 $B5,\\ C7$",
      "A1 $D10$",
      "A1 $E14$",
      "A1 $F17$",
      "B1 route $ABCDF$"
     ],
     "steps": [
      {
       "say": "A is zero. Temporary labels: B five, C eight. B becomes permanent at five.",
       "show": "$A: 0,\\ B: 5$"
      },
      {
       "say": "From B: C becomes seven, D eleven, E fourteen. C is permanent at seven.",
       "show": "$C: \\min(8, 7) = 7$"
      },
      {
       "say": "From C: D becomes ten, F eighteen. D is permanent at ten.",
       "show": "$D: \\min(11, 10) = 10$"
      },
      {
       "say": "From D: E stays fourteen, F becomes seventeen. E is permanent at fourteen; from E, F would be eighteen, so F stays seventeen.",
       "show": "$E: 14,\\ F: \\min(18, 17, 18) = 17$"
      },
      {
       "say": "Trace back: F from D, D from C, C from B, B from A.",
       "show": "$A \\to B \\to C \\to D \\to F,\\ 17\\ \\mathrm{m}$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 4,
     "q": "A gardener wants to walk along every path exactly once. Explain whether this is possible and, if so, where the walk must start and finish. State, with a reason, whether Prim’s algorithm is a greedy algorithm.",
     "answer": "Possible: only $E$ and $F$ have odd degree, so the walk starts at one and ends at the other; Prim is greedy",
     "ms": [
      "M1 degrees $A2, B4, C4, D4, E3, F3$",
      "A1 semi-Eulerian, so possible",
      "A1 start and finish at $E$ and $F$",
      "B1 greedy: best local choice at each step"
     ],
     "steps": [
      {
       "say": "Find the degree of each vertex by counting entries in each row.",
       "show": "$A: 2,\\ B: 4,\\ C: 4,\\ D: 4,\\ E: 3,\\ F: 3$"
      },
      {
       "say": "Exactly two vertices, E and F, have odd degree, so the network is semi-Eulerian.",
       "show": "two odd vertices"
      },
      {
       "say": "An Eulerian trail exists, starting at E and finishing at F, or the other way round.",
       "show": "start $E$, end $F$"
      },
      {
       "say": "Prim’s algorithm is greedy: at every step it takes the shortest available edge, never revisiting a choice.",
       "show": "greedy"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 17,
   "points": [
    "f2_cpa"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> The activities in a project are shown below, with durations in hours.\n$$\\begin{array}{c|ccccccc} \\text{Activity} & A & B & C & D & E & F & G \\\\ \\hline \\text{Duration} & 4 & 6 & 3 & 5 & 4 & 6 & 3 \\\\ \\text{Preceded by} & - & - & A & A, B & C & D & D, E \\end{array}$$",
   "parts": [
    {
     "l": "a",
     "marks": 3,
     "q": "Draw an activity network, using dummy activities where necessary.",
     "answer": "Two dummies: from end of $A$ to end of $B$ (start of $D$); from end of $D$ to end of $E$ (start of $G$)",
     "ms": [
      "M1 A, B from start; C after A",
      "A1 dummy so D follows A and B",
      "A1 dummy so G follows D and E, with F after D only"
     ],
     "steps": [
      {
       "say": "A and B start at the source. C follows A only.",
       "show": "start $\\to A, B$; $A \\to C$"
      },
      {
       "say": "D needs both A and B, while C needs only A, so a dummy runs from the end of A to the end of B, where D starts.",
       "show": "dummy 1"
      },
      {
       "say": "G needs D and E, but F needs only D, so a second dummy runs from the end of D to the end of E, where G starts. F and G finish at the sink.",
       "show": "dummy 2"
      }
     ]
    },
    {
     "l": "b",
     "marks": 4,
     "q": "Find the earliest and latest event times and hence the minimum completion time.",
     "answer": "Earliest starts $A0, B0, C4, D6, E7, F11, G11$; latest starts $A2, B0, C7, D6, E10, F11, G14$; $17$ hours",
     "ms": [
      "M1 forward pass",
      "A1 earliest times, 17 hours",
      "M1 backward pass",
      "A1 latest times"
     ],
     "steps": [
      {
       "say": "Forward pass: C starts at four. D waits for A and B, starting at six.",
       "show": "$C: 4,\\ D: 6$"
      },
      {
       "say": "E starts at seven and ends at eleven. F and G start at eleven.",
       "show": "$E: 7,\\ F: 11,\\ G: 11$"
      },
      {
       "say": "F ends at seventeen and G at fourteen, so the project takes seventeen hours.",
       "show": "$17$ hours"
      },
      {
       "say": "Backward pass: G must start by fourteen, F by eleven, so D must finish by eleven and start by six. E must finish by fourteen, so start by ten.",
       "show": "$G: 14,\\ F: 11,\\ D: 6,\\ E: 10$"
      },
      {
       "say": "C must start by seven, A by two, B by zero.",
       "show": "$C: 7,\\ A: 2,\\ B: 0$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 2,
     "q": "State the critical path.",
     "answer": "$B, D, F$",
     "ms": [
      "M1 zero float activities",
      "A1 B D F"
     ],
     "steps": [
      {
       "say": "Critical activities have zero float.",
       "show": "zero float"
      },
      {
       "say": "These are B, D and F.",
       "show": "$B \\to D \\to F$"
      },
      {
       "say": "Their durations add to six plus five plus six, seventeen hours.",
       "show": "$6 + 5 + 6 = 17$"
      }
     ]
    },
    {
     "l": "d",
     "marks": 2,
     "q": "Find the total float of each non-critical activity.",
     "answer": "$A{:}\\ 2,\\ C{:}\\ 3,\\ E{:}\\ 3,\\ G{:}\\ 3$",
     "ms": [
      "M1 latest start minus earliest start",
      "A1 all four"
     ],
     "steps": [
      {
       "say": "Total float is the latest start minus the earliest start.",
       "show": "LS minus ES"
      },
      {
       "say": "A has two hours of float.",
       "show": "$A: 2 - 0 = 2$"
      },
      {
       "say": "C, E and G each have three hours.",
       "show": "$C: 7 - 4,\\ E: 10 - 7,\\ G: 14 - 11$"
      }
     ]
    },
    {
     "l": "e",
     "marks": 1,
     "q": "Activity C is delayed by 4 hours. State the effect on the minimum completion time.",
     "answer": "Increases by $1$ hour to $18$ hours",
     "ms": [
      "B1 18 hours"
     ],
     "steps": [
      {
       "say": "C has only three hours of float.",
       "show": "float 3"
      },
      {
       "say": "A delay of four hours uses all the float and one more hour.",
       "show": "$4 - 3 = 1$"
      },
      {
       "say": "So the project takes eighteen hours.",
       "show": "$18$ hours"
      }
     ]
    }
   ],
   "section": "D"
  },
  {
   "n": 18,
   "points": [
    "f2_rec",
    "f2_bool"
   ],
   "q": "<b>Section D (Discrete &amp; Decision)</b> ",
   "parts": [
    {
     "l": "a",
     "marks": 5,
     "q": "Solve the recurrence relation $u_{n+2} = u_{n+1} + 6u_n$, where $u_1 = 1$ and $u_2 = 7$.",
     "answer": "$u_n = \\dfrac{3^{n+1} - (-2)^{n+1}}{5}$",
     "ms": [
      "M1 $r^2 - r - 6 = 0$",
      "A1 $r = 3, -2$",
      "M1 general form and initial conditions",
      "A1 $A = \\tfrac35,\\ B = \\tfrac25$",
      "A1 correct $u_n$ o.e."
     ],
     "steps": [
      {
       "say": "Form the auxiliary equation.",
       "show": "$r^2 - r - 6 = 0 \\Rightarrow (r - 3)(r + 2) = 0$"
      },
      {
       "say": "The general solution is a combination of powers of three and minus two.",
       "show": "$u_n = A \\cdot 3^n + B(-2)^n$"
      },
      {
       "say": "Use the initial conditions with n equals one and two.",
       "show": "$3A - 2B = 1,\\quad 9A + 4B = 7$"
      },
      {
       "say": "Solving gives A equals three fifths and B equals two fifths.",
       "show": "$A = \\tfrac35,\\ B = \\tfrac25$"
      },
      {
       "say": "This can be written neatly.",
       "show": "$u_n = \\dfrac{3^{n+1} - (-2)^{n+1}}{5}$"
      }
     ]
    },
    {
     "l": "b",
     "marks": 1,
     "q": "Find $u_6$.",
     "answer": "$463$",
     "ms": [
      "B1 $463$"
     ],
     "steps": [
      {
       "say": "Substitute n equals six.",
       "show": "$u_6 = \\dfrac{3^7 + 2^7}{5}$"
      },
      {
       "say": "That is 2187 plus 128 over five.",
       "show": "$\\dfrac{2315}{5} = 463$"
      },
      {
       "say": "Check with the recurrence: 13, 55, 133, 463.",
       "show": "$u_3 = 13,\\ u_4 = 55,\\ u_5 = 133,\\ u_6 = 463$"
      }
     ]
    },
    {
     "l": "c",
     "marks": 3,
     "q": "Use a truth table to prove that $(p \\wedge \\neg q) \\vee (\\neg p \\wedge q) \\equiv (p \\vee q) \\wedge \\neg(p \\wedge q)$.",
     "answer": "Both columns are T exactly when p and q differ",
     "ms": [
      "M1 table with intermediate columns",
      "A1 both final columns correct",
      "B1 conclusion"
     ],
     "steps": [
      {
       "say": "Build the table with columns for each part.",
       "show": "$\\begin{array}{cc|cc} p & q & (p \\wedge \\neg q) \\vee (\\neg p \\wedge q) & (p \\vee q) \\wedge \\neg(p \\wedge q) \\\\ \\hline \\mathrm{T} & \\mathrm{T} & \\mathrm{F} & \\mathrm{F} \\\\ \\mathrm{T} & \\mathrm{F} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{F} & \\mathrm{T} & \\mathrm{T} & \\mathrm{T} \\\\ \\mathrm{F} & \\mathrm{F} & \\mathrm{F} & \\mathrm{F} \\end{array}$"
      },
      {
       "say": "The left side is true when exactly one of p and q is true. So is the right side: at least one, but not both.",
       "show": "exclusive or"
      },
      {
       "say": "The final columns agree in every row, so the statements are equivalent.",
       "show": "equivalent"
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
   "marks": 50
  },
  {
   "id": "B",
   "title": "Section B: Mechanics 2",
   "marks": 50
  },
  {
   "id": "C",
   "title": "Section C: Statistics",
   "marks": 50
  },
  {
   "id": "D",
   "title": "Section D: Discrete & Decision",
   "marks": 50
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
