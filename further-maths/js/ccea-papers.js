// Real CCEA exam series for the 12 BCS Academy units. Links only: no CCEA question, mark-scheme or report text
// is reproduced anywhere on the site. Students open CCEA's own pages (new tab) and log their marks in js/papers.js.
//
// EVIDENCE (checked Oct 2026 by web search; ccea.org.uk itself was not reachable from the build container):
// • Specs: GCE Mathematics (2018) and Further Mathematics (2018) are first taught Sept 2018, first AS award Summer 2019,
//   first A level award Summer 2020 (FM specification, "first award" box). GCE Physics (2016): first teaching Sept 2016,
//   first AS award 2017, first A level award 2018 (Physics specimen assessment materials cover).
// • Summer 2020 and Summer 2021 exams were cancelled in Northern Ireland (Minister's announcements Mar 2020 / 6 Jan 2021;
//   CCEA "Summer 2020" page; Centre Determined Grades 2021). CCEA nonetheless published the Summer 2021 papers and mark
//   schemes for some units (they were prepared, never sat): official PDFs found at ccea.org.uk/downloads/docs/Past-Papers/
//   cleared/GCE/... for Maths AS 1 (2021 MS) and FM A2 1 (2021 MS); SaveMyExams lists 2021 for all four FM units and for
//   Maths Unit 1 only. No 2021 evidence for Maths AS 2, A2 1, A2 2 or for Physics, so those are not listed.
// • No January or autumn GCE series exist for these specifications (CCEA's linear GCE timetables are summer-only; no
//   evidence of a CCEA autumn 2020 GCE series was found — the autumn 2020 series was England's). A "Summer Reserve
//   Series" 2022 AFM21 paper appears on SaveMyExams; it is not listed separately (unconfirmed elsewhere).
// • Summer 2022–2025: CCEA Chief Examiner's Reports exist on ccea.org.uk for GCE Mathematics (2018), Further
//   Mathematics (2018) and Physics (2016) for each of 2022, 2023, 2024, 2025 (…/ExamMod-Reports/GCE/<spec>/<year>/
//   <spec>-Summer<year>-Report_0.pdf), so every unit was sat those years. Official question papers / mark schemes also
//   seen: Maths AS 2 2022 MS, AS 2 2023 paper; FM A2 1 2023 paper; Physics AS 1 2024 MS.
// • Summer 2019: SaveMyExams / RevisionMaths list Maths SMT11 and SMT21 June 2019; Maths Genie lists FM SFM11 June 2019.
//   FM SFM21 2019 is inferred (first AS award). Physics 2017–2019: third-party sites list SPH11 June 2017 and June 2018;
//   other physics units in 2017–2019 are inferred from the first-award dates (normal exam years).
// ev: 'official' = file/report seen on ccea.org.uk · 'third' = third-party index lists it · 'inferred' = see above.
// CCEA keeps only recent series online, so older entries may no longer be downloadable from CCEA.
'use strict';

const CCEA_PAPERS = (() => {
  const SUBJ = {
    maths: { name: 'GCE Mathematics (2018)', page: 'https://ccea.org.uk/post-16/gce/subjects/gce-mathematics-2018/past-papers-mark-schemes', rep: 'GCE%20Mathematics%20%282018%29' },
    further: { name: 'GCE Further Mathematics (2018)', page: 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018/past-papers-mark-schemes', rep: 'GCE%20Further%20Mathematics%20%282018%29' },
    physics: { name: 'GCE Physics (2016)', page: 'https://ccea.org.uk/post-16/gce/subjects/gce-physics-2016/past-papers-mark-schemes', rep: 'GCE%20Physics%20%282016%29' },
  };
  const INDEX = 'https://ccea.org.uk/post-16/gce/past-papers-mark-schemes';
  // year → evidence; 2021 entries are flagged "published, not sat"
  const S = (o) => o;
  const UNITS = {
    m1: { subj: 'maths', no: 'AS 1', code: 'SMT11', title: 'Pure Mathematics', years: S({ 2019: 'third', 2021: 'official', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    m2: { subj: 'maths', no: 'AS 2', code: 'SMT21', title: 'Applied Mathematics', years: S({ 2019: 'third', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    m3: { subj: 'maths', no: 'A2 1', code: 'AMT11', title: 'Pure Mathematics', years: S({ 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    m4: { subj: 'maths', no: 'A2 2', code: 'AMT21', title: 'Applied Mathematics', years: S({ 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    f1: { subj: 'further', no: 'AS 1', code: 'SFM11', title: 'Pure Mathematics', years: S({ 2019: 'third', 2021: 'third', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    f2: { subj: 'further', no: 'AS 2', code: 'SFM21', title: 'Applied Mathematics', years: S({ 2019: 'inferred', 2021: 'third', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    fm: { subj: 'further', no: 'A2 1', code: 'AFM11', title: 'Pure Mathematics', years: S({ 2021: 'official', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    f4: { subj: 'further', no: 'A2 2', code: 'AFM21', title: 'Applied Mathematics', years: S({ 2021: 'third', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    as1: { subj: 'physics', no: 'AS 1', code: 'SPH11', title: 'Forces, Energy and Electricity', years: S({ 2017: 'third', 2018: 'third', 2019: 'inferred', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    as2: { subj: 'physics', no: 'AS 2', code: 'SPH21', title: 'Waves, Photons and Astronomy', years: S({ 2017: 'inferred', 2018: 'inferred', 2019: 'inferred', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    a21: { subj: 'physics', no: 'A2 1', code: 'APH11', title: 'Deformation of Solids, Thermal Physics, Circular Motion, Oscillations and Atomic and Nuclear Physics', years: S({ 2018: 'inferred', 2019: 'inferred', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
    a22: { subj: 'physics', no: 'A2 2', code: 'APH21', title: 'Fields, Capacitors and Particle Physics', years: S({ 2018: 'inferred', 2019: 'inferred', 2022: 'official', 2023: 'official', 2024: 'official', 2025: 'official' }) },
  };
  const REPORT_YEARS = [2022, 2023, 2024, 2025]; // report PDFs confirmed on ccea.org.uk
  const EV = { official: 'Seen on ccea.org.uk', third: 'Listed by third-party past-paper sites', inferred: 'Exam year; not confirmed online' };
  const make = (unit, y) => {
    const u = UNITS[unit], s = SUBJ[u.subj];
    return {
      key: `${unit}-${y}`, unit, year: +y, series: 'Summer', code: u.code, no: u.no, title: u.title, subj: u.subj,
      name: `Summer ${y} · ${u.no} ${u.title}`, notSat: +y === 2021, ev: u.years[y], evText: EV[u.years[y]],
      page: s.page, index: INDEX,
      report: REPORT_YEARS.includes(+y) ? `https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/${s.rep}/${y}/${s.rep}-Summer${y}-Report_0.pdf` : '',
    };
  };
  const forUnit = unit => UNITS[unit] ? Object.keys(UNITS[unit].years).sort((a, b) => b - a).map(y => make(unit, y)) : [];
  const get = key => { const m = /^([a-z0-9]+)-(\d{4})$/.exec(key || ''); return m && UNITS[m[1]] && UNITS[m[1]].years[m[2]] ? make(m[1], m[2]) : null; };
  return { SUBJ, UNITS, INDEX, forUnit, get };
})();
