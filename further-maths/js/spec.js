// BCSFM course registry. Each course arranges points from the shared pool into its specification structure.
// status: 'core'  = named in the CCEA specification or public descriptions of the unit
//         'check' = usually taught in this unit; confirm the wording against the official specification
'use strict';

const STATUS = {
  core: ['On spec', 'Named in the CCEA specification / public outlines of this unit'],
  check: ['Check spec', 'Normally taught in this unit; confirm the exact wording in the CCEA specification'],
  beyond: ['Not on spec', 'Not part of this unit — kept only in the archive'],
};
const POOL = Object.fromEntries(POINTS.map(p => [p.id, p]));
TOPICS.length = 0; POINTS.length = 0;
const COURSES = {};
const COURSE_ORDER = [];

function defineCourse(def) {
  const c = { ...def, topics: [], points: [] };
  for (const t of def.spec) {
    const pts = t.points.map(([id, status, title, ref], i) => {
      const p = POOL[id]; if (!p) throw new Error('course ' + def.id + ': missing point ' + id);
      p.code = `${t.code}.${i + 1}`; p.topic = t.id; p.status = status; p.course = def.id; if (title) p.title = title; if (ref) p.ref = ref;
      return p;
    });
    const topicObj = { ...t, course: def.id, points: pts };
    c.topics.push(topicObj); c.points.push(...pts);
    TOPICS.push(topicObj); POINTS.push(...pts);
  }
  // archived points: still reachable by link, never in drills/sprints/spec
  const arch = { id: def.id + '-archive', code: 'Archive', title: 'Archive (not on this unit\'s spec)', icon: '🗄', color: '#8a93ad', course: def.id, hidden: true, outcomes: [], blurb: '', points: [] };
  (def.archive || []).forEach((id, i) => { const p = POOL[id]; if (!p) return; p.code = `A.${i + 1}`; p.topic = arch.id; p.status = 'beyond'; p.course = def.id; arch.points.push(p); POINTS.push(p); });
  c.archiveTopic = arch; TOPICS.push(arch);
  COURSES[def.id] = c; COURSE_ORDER.push(def.id);
  return c;
}

/* ===================== Further Mathematics A2 1 ===================== */
defineCourse({
  id: 'fm', short: 'FM A2 1', name: 'Further Mathematics', unit: 'A2 1 Pure Mathematics', board: 'CCEA GCE Further Mathematics (2018)',
  icon: '∫', color: '#7c9cff', paper: 'AFM11',
  exam: 'External written exam · 2 h 30 min · 150 raw marks · 7–12 questions',
  tagline: 'Induction, series, complex numbers, polar, hyperbolics, further calculus, differential equations.',
  sources: [
    { label: 'CCEA — GCE Further Mathematics (2018) subject page', url: 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018' },
    { label: 'CCEA — GCE Further Mathematics (2018) specification (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Specifications/GCE/GCE%20Further%20Mathematics%20%282018%29/GCE%20Further%20Mathematics%20%282018%29-specification-Standard_2.pdf' },
    { label: 'CCEA — Mathematical Formulae and Tables booklet (PDF)', url: 'https://ccea.org.uk/downloads/docs/Support/General/2019/Mathematical%20Formulae%20and%20Tables.pdf' },
    { label: 'CCEA — GCE Further Mathematics Elaboration Document (PDF)', url: 'https://www.ccea.org.uk/downloads/docs/Support/General/2019/GCE%20Further%20Mathematics%20Elaboration%20Document.pdf' },
    { label: 'Aquinas Diocesan Grammar School — Further Mathematics course outline', url: 'https://www.aquinasgrammar.com/Learning/Further-Mathematics/' },
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
    { id: 'pf', code: '1', title: 'Proof', icon: 'n→', color: '#ff6b6b', blurb: 'Proof by mathematical induction: series, divisibility, sequences, inequalities, matrix powers.',
      outcomes: ['Prove results by mathematical induction, including sums of series, divisibility, recurrence-defined sequences and powers of matrices.'],
      points: [['pi2', 'core', 'Induction: series & inequalities'], ['pi1', 'core', 'Induction: divisibility & matrix powers'], ['pi3', 'core']] },
    { id: 'al', code: '2', title: 'Further Algebra & Functions', icon: 'Σ', color: '#9d7bff', blurb: 'Partial fractions, summation of series, Maclaurin series.',
      outcomes: ['Express rational functions in partial fractions, including repeated linear and irreducible quadratic factors.', 'Sum series using standard results and the method of differences.', 'Find and use Maclaurin series, including composite functions.'],
      points: [['al1', 'core'], ['al2', 'core'], ['sr1', 'core'], ['sr2', 'check']] },
    { id: 'cn', code: '3', title: 'Complex Numbers', icon: 'ℂ', color: '#7c9cff', blurb: "Exponential form, De Moivre's theorem, multiple angles, nth roots, roots of unity and polygon geometry.",
      outcomes: ["C1 · De Moivre's theorem: powers, multiple angles (cos nθ, sin nθ, tan nθ), powers of sin/cos in multiple angles.", 'C2 · Exponential form re^{iθ} and the [r, θ] notation.', 'C3 · nth roots of a complex number.', 'C4 · Roots of unity and their geometry (regular polygons, area, rotation c + (v − c)ωᵏ).'],
      points: [['cx1', 'core', 'Exponential form & [r, θ]', 'C2'], ['cx2', 'core', "De Moivre's theorem & multiple angles", 'C1'], ['cx3', 'core', 'nth roots, roots of unity & polygons', 'C3, C4']] },
    { id: 'po', code: '4', title: 'Polar Coordinates', icon: 'r,θ', color: '#5ad1ff', blurb: 'Polar curves, conversion, area enclosed, tangents.',
      outcomes: ['Convert between polar and Cartesian coordinates and sketch polar curves.', 'Find areas enclosed by polar curves using ½∫r² dθ.', 'Find tangents parallel or perpendicular to the initial line.'],
      points: [['pl1', 'core'], ['pl2', 'core'], ['pl3', 'check']] },
    { id: 'hf', code: '5', title: 'Hyperbolic Functions', icon: 'cosh', color: '#f06fb0', blurb: 'Definitions, identities, inverse functions as logarithms, equations, calculus.',
      outcomes: ['Define and sketch hyperbolic functions; prove and use identities.', 'Derive and use the logarithmic forms of the inverse hyperbolic functions.', 'Solve hyperbolic equations.', 'Differentiate and integrate hyperbolic and inverse hyperbolic functions.'],
      points: [['hy1', 'core'], ['hy2', 'core'], ['hy3', 'core'], ['hy4', 'core']] },
    { id: 'fc', code: '6', title: 'Further Calculus', icon: '∫', color: '#ffd166', blurb: 'Partial fractions in integration, repeated parts, reduction formulae, improper integrals.',
      outcomes: ['Integrate using partial fractions.', 'Use repeated integration by parts.', 'Derive and use simple reduction formulae.', 'Evaluate improper integrals.', 'Inverse trig derivatives and standard inverse trig/hyperbolic integrals.'],
      points: [['ca6', 'core'], ['ca7', 'core'], ['ca3', 'core'], ['ca5', 'core'], ['ca1', 'check'], ['ca2', 'check']] },
    { id: 'de', code: '7', title: 'Differential Equations', icon: 'dy', color: '#7ee081', blurb: 'Integrating factor; second-order linear with constant coefficients; modelling.',
      outcomes: ['Solve first-order differential equations, including by an integrating factor.', 'Solve second-order linear differential equations with constant coefficients (CF + PI).', 'Apply initial conditions and interpret solutions.'],
      points: [['de1', 'core'], ['de2', 'core'], ['de3', 'core'], ['de4', 'check']] },
  ],
  archive: ['mx1', 'mx2', 'mx3', 'mx4', 'vc1', 'vc2', 'vc3', 'cx4', 'ca4', 'sr3'],
});

// Simulation assignments for spec points (keeps every sim on-spec)
Object.entries({ al1: ['pfrac'], al2: ['telescope'], ca6: ['pfrac'], ca5: ['improper'], ca2: [], ca1: [], ca3: [], ca7: [], sr2: ['maclaurin'] })
  .forEach(([id, sims]) => { if (POOL[id]) POOL[id].sims = sims; });
