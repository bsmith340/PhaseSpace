// BCSFM spec map: arranges every point into the A2 1 structure and tags its status.
// status: 'core'   = listed in public descriptions of CCEA A2 1 (see SPEC_SOURCES)
//         'check'  = taught alongside A2 1 in most courses; confirm against the official spec
//         'beyond' = AS 1 prerequisite or extension beyond A2 1
'use strict';

const SPEC_SOURCES = [
  { label: 'CCEA — GCE Further Mathematics (2018) subject page', url: 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018' },
  { label: 'CCEA — GCE Further Mathematics (2018) specification (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Specifications/GCE/GCE%20Further%20Mathematics%20%282018%29/GCE%20Further%20Mathematics%20%282018%29-specification-Standard_2.pdf' },
  { label: 'CCEA — Mathematical Formulae and Tables booklet (PDF)', url: 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf' },
  { label: 'CCEA — GCE Further Mathematics Elaboration Document (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Support/General/2019/GCE%20Further%20Mathematics%20Elaboration%20Document.pdf' },
  { label: 'Aquinas Diocesan Grammar School — Further Mathematics course outline', url: 'https://www.aquinasgrammar.com/Learning/Further-Mathematics/' },
];

const SPEC = [
  {
    id: 'pf', code: '1', title: 'Proof', icon: 'n→', color: '#ff6b6b', blurb: 'Proof by mathematical induction: series, divisibility, sequences, matrices, inequalities.',
    outcomes: ['Prove results by mathematical induction, including sums of series, divisibility, recurrence-defined sequences and (where relevant) powers of matrices.'],
    points: [['pi2', 'core', 'Induction: series & inequalities'], ['pi1', 'core', 'Induction: divisibility & matrix powers'], ['pi3', 'core']],
  },
  {
    id: 'al', code: '2', title: 'Further Algebra & Functions', icon: 'Σ', color: '#9d7bff', blurb: 'Partial fractions, summation of series, Maclaurin series.',
    outcomes: ['Express rational functions in partial fractions, including repeated linear and irreducible quadratic factors.', 'Sum series using standard results for Σr, Σr², Σr³ and the method of differences.', 'Find and use Maclaurin series of functions, including composite functions; use series to evaluate limits.'],
    points: [['al1', 'core'], ['al2', 'core'], ['sr1', 'core'], ['sr2', 'check']],
  },
  {
    id: 'cn', code: '3', title: 'Complex Numbers', icon: 'ℂ', color: '#7c9cff', blurb: "Exponential form, De Moivre's theorem, multiple angles, nth roots and roots of unity.",
    outcomes: ["Use the modulus–argument and exponential forms of a complex number.", "Prove and use De Moivre's theorem; derive multiple-angle identities and express powers of sin/cos in multiple angles.", 'Find nth roots of complex numbers, including the roots of unity, and use their geometric and algebraic properties.'],
    points: [['cx1', 'check'], ['cx2', 'core'], ['cx3', 'core']],
  },
  {
    id: 'po', code: '4', title: 'Polar Coordinates', icon: 'r,θ', color: '#5ad1ff', blurb: 'Polar curves, conversion, area enclosed, tangents.',
    outcomes: ['Convert between polar and Cartesian coordinates and sketch polar curves.', 'Find areas enclosed by polar curves using ½∫r² dθ.', 'Find tangents parallel or perpendicular to the initial line.'],
    points: [['pl1', 'core'], ['pl2', 'core'], ['pl3', 'check']],
  },
  {
    id: 'hf', code: '5', title: 'Hyperbolic Functions', icon: 'cosh', color: '#f06fb0', blurb: 'Definitions, identities, inverse functions as logarithms, equations, calculus.',
    outcomes: ['Define and sketch sinh, cosh, tanh and their reciprocals; prove and use hyperbolic identities.', 'Derive and use the logarithmic forms of the inverse hyperbolic functions.', 'Solve equations involving hyperbolic functions.', 'Differentiate and integrate hyperbolic and inverse hyperbolic functions.'],
    points: [['hy1', 'core'], ['hy2', 'core'], ['hy3', 'core'], ['hy4', 'core']],
  },
  {
    id: 'fc', code: '6', title: 'Further Calculus', icon: '∫', color: '#ffd166', blurb: 'Partial fractions in integration, repeated parts, reduction formulae, improper integrals, inverse-trig forms.',
    outcomes: ['Integrate using partial fractions.', 'Use repeated integration by parts.', 'Derive and use simple reduction formulae.', 'Evaluate improper integrals.', 'Differentiate inverse trigonometric functions and integrate using standard inverse trig/hyperbolic forms.'],
    points: [['ca6', 'core'], ['ca7', 'core'], ['ca3', 'core'], ['ca5', 'core'], ['ca1', 'check'], ['ca2', 'check']],
  },
  {
    id: 'de', code: '7', title: 'Differential Equations', icon: 'dy', color: '#7ee081', blurb: 'Integrating factor; second-order linear with constant coefficients; modelling.',
    outcomes: ['Solve first-order linear differential equations using an integrating factor.', 'Solve second-order linear differential equations with constant coefficients: complementary function and particular integral.', 'Apply initial/boundary conditions and interpret solutions in context.'],
    points: [['de1', 'core'], ['de2', 'core'], ['de3', 'core'], ['de4', 'check']],
  },
  {
    id: 'xx', code: 'X', title: 'Prerequisites & Extension', icon: '+', color: '#8a93ad', blurb: 'AS 1 material A2 1 builds on (matrices, vectors, loci) plus extension topics. Not A2 1 content.',
    outcomes: ['Matrices, vectors and Argand-diagram loci (AS 1 Further Pure).', 'Extension: arc length and surface area, Taylor series about x = a.'],
    points: [['mx1', 'beyond'], ['mx2', 'beyond'], ['mx3', 'beyond'], ['mx4', 'beyond'], ['vc1', 'beyond'], ['vc2', 'beyond'], ['vc3', 'beyond'], ['cx4', 'beyond'], ['ca4', 'beyond'], ['sr3', 'beyond']],
  },
];
const STATUS = {
  core: ['A2 1', 'Named in public outlines of CCEA A2 1'],
  check: ['Check spec', 'Normally taught with this A2 1 topic. Confirm the exact wording in the CCEA specification'],
  beyond: ['AS 1 / Extension', 'Not A2 1 content: a prerequisite or an extension'],
};

(function rebuild() {
  const pool = Object.fromEntries(POINTS.map(p => [p.id, p]));
  TOPICS.length = 0; POINTS.length = 0;
  for (const t of SPEC) {
    const pts = t.points.map(([id, status, title], i) => {
      const p = pool[id]; if (!p) throw new Error('spec: missing point ' + id);
      p.code = `${t.code}.${i + 1}`; p.topic = t.id; p.status = status; if (title) p.title = title;
      return p;
    });
    TOPICS.push({ ...t, points: pts });
    POINTS.push(...pts);
  }
})();
