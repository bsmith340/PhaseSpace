// BcsMaths course registry. Each course arranges points from the shared pool into its specification structure.
// status: 'core'  = directly covers a learning outcome quoted from the CCEA specification
//         'check' = supporting material (an example context or a technique a listed outcome needs)
'use strict';

const STATUS = {
  core: ['On spec', 'Directly covers a learning outcome in the CCEA specification for this unit'],
  check: ['Supporting', 'Supports a listed outcome (an example context or a technique it needs) but is not named in the specification'],
  beyond: ['Not on spec', 'Not part of this unit — kept only in the archive'],
};
const POOL = Object.fromEntries(POINTS.map(p => [p.id, p]));
TOPICS.length = 0; POINTS.length = 0;
const COURSES = {};
const COURSE_ORDER = [];

function defineCourse(def) {
  const c = { ...def, topics: [], points: [] };
  for (const t of def.spec) {
    // applied units list plain strings: their codes are the topic code plus a letter (M2a, M2b, …)
    const outs = t.outcomes.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: t.code + 'abcdefghijklmnopqrstuvwxyz'[i], text: o }));
    const pts = t.points.map(([id, status, title, ref, covers], i) => {
      const p = POOL[id]; if (!p) throw new Error('course ' + def.id + ': missing point ' + id);
      p.code = `${t.code}.${i + 1}`; p.topic = t.id; p.status = status; p.course = def.id; if (title) p.title = title; if (ref) p.ref = ref;
      p.covers = (covers || []).map(c => outs.find(o => o.code === c)).filter(Boolean);
      return p;
    });
    outs.forEach(o => { o.points = pts.filter(p => p.covers.includes(o)); });
    const topicObj = { ...t, outcomes: outs, course: def.id, points: pts };
    c.topics.push(topicObj); c.points.push(...pts);
    TOPICS.push(topicObj); POINTS.push(...pts);
  }
  // archived points: still reachable by link, never in drills/sprints/spec
  const arch = { id: def.id + '-archive', code: 'Archive', title: 'Archive (not on this unit\'s spec)', icon: '🗄', color: '#8e8e93', course: def.id, hidden: true, outcomes: [], blurb: '', points: [] };
  (def.archive || []).forEach((id, i) => { const p = POOL[id]; if (!p) return; p.code = `A.${i + 1}`; p.topic = arch.id; p.status = 'beyond'; p.course = def.id; p.covers = []; arch.points.push(p); POINTS.push(p); });
  c.archiveTopic = arch; TOPICS.push(arch);
  COURSES[def.id] = c; COURSE_ORDER.push(def.id);
  return c;
}

/* ===================== Further Mathematics A2 1 ===================== */
// Outcomes are quoted from the CCEA GCE Further Mathematics (2018) specification, Unit A2 1 (pages 20–22).
// Each point lists the outcome codes it covers; codes are BcsMaths labels (CCEA prints the bullets without numbers).
defineCourse({
  id: 'fm', short: 'FM A2 1', name: 'Further Mathematics', unit: 'A2 1 Pure Mathematics', qual: 'further', level: 'A2', unitNo: 'A2 1', uname: 'Pure Mathematics', board: 'CCEA GCE Further Mathematics (2018)',
  icon: '∫', color: '#007aff', paper: 'AFM11', specRef: 'CCEA GCE Further Mathematics (2018) specification, Section 3.4 (pp. 20–22)',
  exam: 'External written examination · 2 hours 15 minutes · 7–12 questions · 150 raw marks',
  assumes: 'Assumes knowledge of GCE Mathematics Units AS 1 and A2 1 and Unit AS 1 of GCE Further Mathematics.',
  tagline: 'Induction, series, complex numbers, further calculus, polar coordinates, hyperbolic functions, differential equations.',
  sources: [
    { label: 'CCEA — GCE Further Mathematics (2018) subject page', url: 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018' },
    { label: 'CCEA — GCE Further Mathematics (2018) specification (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Specifications/GCE/GCE%20Further%20Mathematics%20%282018%29/GCE%20Further%20Mathematics%20%282018%29-specification-Standard_2.pdf' },
    { label: 'CCEA — Mathematical Formulae and Tables booklet (PDF)', url: 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf' },
  ],
  official: [
    ['CCEA GCE Further Mathematics (2018) — subject page (past papers, mark schemes, reports)', 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018'],
    ['CCEA — GCE past papers & mark schemes index', 'https://ccea.org.uk/post-16/gce/past-papers-mark-schemes'],
    ["Chief Examiner's Report — Summer 2025 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2025/GCE%20Further%20Mathematics%20%282018%29-Summer2025-Report_0.pdf'],
    ["Chief Examiner's Report — Summer 2024 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2024/GCE%20Further%20Mathematics%20%282018%29-Summer2024-Report_0.pdf'],
    ["Chief Examiner's Report — Summer 2022 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2022/GCE%20Further%20Mathematics%20%282018%29-Summer2022-Report_0.pdf'],
    ['A2 1 question paper — Summer 2023 (PDF)', 'https://www.ccea.org.uk/downloads/docs/Past-Papers/cleared/GCE/GCE%20Further%20Mathematics%20(2018)/2023-Summer/Standard/0/GCE-Further%20Mathematics-506-Summer2023-A2%201,%20Pure%20Mathematics-Paper.pdf'],
    ['A2 1 mark scheme — Summer 2021 (PDF)', 'https://ccea.org.uk/downloads/docs/Past-Papers/cleared/GCE/GCE%20Further%20Mathematics%20(2018)/2021-Summer/Standard/0/GCE-Further%20Mathematics-506-Summer2021-A2%201,%20Pure%20Mathematics-MS.pdf'],
    ['Mathematical Formulae and Tables booklet (PDF)', 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf'],
    ['Maths Genie — CCEA Further Maths past papers (third-party index)', 'https://www.mathsgenie.co.uk/a-level/further-maths/ccea'],
  ],
  known: 'Search-engine summaries of the papers show: Summer 2023 AFM11 includes induction for a sequence (Q1), proving a tan 5θ identity with De Moivre, a polar curve (Q7) and hyperbolic functions (Q9); the Summer 2021 mark scheme uses De Moivre on powers of (1 ± i) in [r, θ] form.',
  defaultPapers: ['Summer 2026 · AFM11', 'Summer 2025 · AFM11', 'Summer 2024 · AFM11', 'Summer 2023 · AFM11', 'Summer 2022 · AFM11', 'Summer 2021 · A2 1'],
  formulae: () => FORMULAE,
  spec: [
    { id: 'pf', code: '1', title: 'Proof', icon: 'n→', color: '#ff3b30', blurb: 'Proof by mathematical induction.',
      outcomes: [['P1', 'construct proofs using mathematical induction (contexts may, for example, include sums of series, divisibility and powers of matrices);']],
      points: [['pi2', 'core', 'Induction: sums of series', '', ['P1']], ['pi1', 'core', 'Induction: divisibility & powers of matrices', '', ['P1']], ['pi3', 'check', 'Induction in other contexts: sequences & recurrences', '', ['P1']]] },
    { id: 'al', code: '2', title: 'Further Algebra and Functions', icon: 'Σ', color: '#af52de', blurb: 'Partial fractions, summation of series, Maclaurin series, small angle approximations.',
      outcomes: [
        ['A1', 'decompose rational functions into partial fractions (including denominators with quadratic factors);'],
        ['A2', 'demonstrate understanding of and use formulae for the sums of integers, squares and cubes and use these to sum other series;'],
        ['A3', 'demonstrate understanding of and use the method of differences for summation of series including use of partial fractions;'],
        ['A4', 'find the Maclaurin series of a function, including the general term;'],
        ['A5', 'recognise and use the Maclaurin series for eˣ, ln(1 + x), sin x, cos x and (1 + x)ⁿ and be aware of the range of values of x for which they are valid;'],
        ['A6', 'derive the series expansions of simple compound functions;'],
        ['A7', 'demonstrate understanding of and use the standard small angle approximations of sine, cosine and tangent: sin x ≈ x, cos x ≈ 1 − x²/2, tan x ≈ x, where x is in radians;']],
      points: [['al1', 'core', 'Partial fractions (including quadratic factors)', '', ['A1']], ['al2', 'core', 'Sums of integers, squares & cubes; method of differences', '', ['A2', 'A3']], ['sr1', 'core', 'Maclaurin series: general term, standard series, validity, compound functions', '', ['A4', 'A5', 'A6']], ['sa1', 'core', 'Small angle approximations', '', ['A7']]] },
    { id: 'cn', code: '3', title: 'Complex Numbers', icon: 'ℂ', color: '#007aff', blurb: "De Moivre's theorem (multiple angles and sums of series), eⁱᶿ, nth roots and roots of unity.",
      outcomes: [
        ['C1', "demonstrate understanding of De Moivre's theorem and use it to find multiple angle formulae and sums of series."],
        ['C2', 'demonstrate understanding of and use the definition eⁱᶿ = cos θ + i sin θ and the form z = reⁱᶿ;'],
        ['C3', 'find the nth roots of reⁱᶿ for r ≠ 0 and demonstrate knowledge that they form the vertices of a regular n-gon in the Argand diagram;'],
        ['C4', 'use complex roots of unity to solve geometric problems;']],
      points: [['cx1', 'core', 'eⁱᶿ and the form z = reⁱᶿ', 'C2', ['C2']], ['cx2', 'core', "De Moivre's theorem & multiple angle formulae", 'C1', ['C1']], ['cx5', 'core', "Sums of series using De Moivre's theorem", 'C1', ['C1']], ['cx3', 'core', 'nth roots, roots of unity & geometric problems', 'C3, C4', ['C3', 'C4']]] },
    { id: 'fc', code: '4', title: 'Further Calculus', icon: '∫', color: '#ff9500', blurb: 'Improper integrals, partial fractions, inverse trig, trig substitutions, repeated parts, reduction formulae.',
      outcomes: [
        ['F1', 'evaluate improper integrals where either the integrand is undefined at a value in the range of integration or the range of integration extends to infinity;'],
        ['F2', 'integrate using partial fractions (extend to include quadratic factors in the denominator);'],
        ['F3', 'differentiate inverse trigonometric functions;'],
        ['F4', 'integrate functions of the form (a² − x²)^(−1/2) and (a² + x²)^(−1) and choose trigonometric substitutions to integrate associated functions;'],
        ['F5', 'use repeated integration by parts;'],
        ['F6', 'demonstrate understanding of and use simple reduction formulae in integration;']],
      points: [['ca5', 'core', 'Improper integrals', '', ['F1']], ['ca6', 'core', 'Integration using partial fractions', '', ['F2']], ['ca1', 'core', 'Differentiating inverse trigonometric functions', '', ['F3']], ['ca2', 'core', 'Integrating (a² − x²)^−½ and (a² + x²)^−1; trigonometric substitutions', '', ['F4']], ['ca7', 'core', 'Repeated integration by parts', '', ['F5']], ['ca3', 'core', 'Reduction formulae', '', ['F6']]] },
    { id: 'po', code: '5', title: 'Polar Co-ordinates', icon: 'r,θ', color: '#30b0c7', blurb: 'Polar co-ordinates, sketching r = f(θ), area enclosed.',
      outcomes: [
        ['R1', 'demonstrate understanding of and use polar co-ordinates and convert between polar and Cartesian co-ordinates;'],
        ['R2', 'sketch curves with r given as a function of θ (including use of trigonometric functions);'],
        ['R3', 'find the area enclosed by a polar curve;']],
      points: [['pl1', 'core', 'Polar co-ordinates, conversion & sketching curves', '', ['R1', 'R2']], ['pl2', 'core', 'Area enclosed by a polar curve', '', ['R3']]] },
    { id: 'hf', code: '6', title: 'Hyperbolic Functions', icon: 'cosh', color: '#ff2d55', blurb: 'Definitions and graphs, calculus, inverse functions and their log forms, standard integrals.',
      outcomes: [
        ['H1', 'demonstrate understanding of the definitions of hyperbolic functions sinh x, cosh x and tanh x, including their domains and ranges, and sketch their graphs;'],
        ['H2', 'differentiate and integrate hyperbolic functions.'],
        ['H3', 'demonstrate understanding of and use the definitions of the inverse hyperbolic functions and their domains and ranges;'],
        ['H4', 'derive and use the logarithmic forms of the inverse hyperbolic functions;'],
        ['H5', 'integrate functions of the form (x² + a²)^(−1/2) and (x² − a²)^(−1/2) and choose substitutions to integrate associated functions;']],
      points: [['hy1', 'core', 'Definitions, domains, ranges & graphs (with identities)', '', ['H1']], ['hy4', 'core', 'Differentiating & integrating hyperbolic functions', '', ['H2']], ['hy2', 'core', 'Inverse hyperbolic functions & their logarithmic forms', '', ['H3', 'H4']], ['hy5', 'core', 'Integrals of (x² + a²)^−½ and (x² − a²)^−½; substitutions', '', ['H5']], ['hy3', 'check', 'Solving hyperbolic equations', '', ['H1', 'H4']]] },
    { id: 'de', code: '7', title: 'Differential Equations', icon: 'dy', color: '#34c759', blurb: 'Integrating factor; second order with constant coefficients (CF + PI); modelling.',
      outcomes: [
        ['D1', 'find and use an integrating factor to solve differential equations of the form dy/dx + P(x)y = Q(x) and recognise when it is appropriate to do so;'],
        ['D2', 'find both general and particular solutions to differential equations;'],
        ['D3', 'use differential equations in modelling;'],
        ['D4', 'solve differential equations of the form y″ + ay′ + by = 0 where a and b are constants, by using the auxiliary equation;'],
        ['D5', 'solve differential equations of the form y″ + ay′ + by = f(x) where a and b are constants, by solving the homogeneous case and adding a particular integral to the complementary function (in cases where f(x) is a polynomial, exponential or trigonometric function, but not a solution of the corresponding homogeneous equation); and'],
        ['D6', 'demonstrate understanding of and use the relationship between the cases when the discriminant of the auxiliary equation is positive, zero and negative and the form of the solution of the differential equation.']],
      points: [['de1', 'core', 'First order: the integrating factor', '', ['D1', 'D2']], ['de2', 'core', 'Second order homogeneous: auxiliary equation & discriminant cases', '', ['D4', 'D6']], ['de3', 'core', 'Particular integrals; general & particular solutions', '', ['D5', 'D2']], ['de4', 'core', 'Modelling with differential equations', '', ['D3']]] },
  ],
  archive: ['pl3', 'sr2', 'mx1', 'mx2', 'mx3', 'mx4', 'vc1', 'vc2', 'vc3', 'cx4', 'ca4', 'sr3'],
});

// Simulation assignments for spec points (keeps every sim on-spec)
Object.entries({ al1: ['pfrac'], al2: ['telescope'], ca6: ['pfrac'], ca5: ['improper'], ca2: [], ca1: [], ca3: [], ca7: [], sr2: ['maclaurin'], hy5: [] })
  .forEach(([id, sims]) => { if (POOL[id]) POOL[id].sims = sims; });
