// BCS Academy app shell: multi-course routing, progress, and every view.
// Routes: #/ (course chooser) · #/<course>/… (home, spec, book, topic/:id, point/:id, drill, sprint, formulae, papers, progress, archive) · shared: #/lab, #/lab/:tool, #/sims, #/sim/:id, #/calc
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const app = () => $('#app');
const STORE = 'bcsfm-v1', OLD_STORE = 'phasespace-fm-a2-v1';
const TP = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const PT = Object.fromEntries(POINTS.map(p => [p.id, p]));
const CREDIT = 'Created by Ben Smith';
let C = COURSES[COURSE_ORDER[0]]; // current course
const cr = path => `#/${C.id}/${path}`;

window.renderMath = el => {
  if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
};
const tidy = s => s.replace(/([+\-]) 1(?=[a-zA-Z\\])/g, '$1 ').replace(/(^|[=(\s$])-1(?=[a-zA-Z(])/g, '$1-');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);

/* ---------- storage ---------- */
let DB;
try { DB = JSON.parse(localStorage.getItem(STORE)) || JSON.parse(localStorage.getItem(OLD_STORE)) || {}; } catch { DB = {}; }
function normDB() {
  DB.stats ||= {}; DB.days ||= {}; DB.best ||= 0; DB.streak ||= 0; DB.read ||= {}; DB.bank ||= []; DB.notes ||= []; DB.sprints ||= []; DB.conf ||= {};
  if (Array.isArray(DB.papers)) DB.papers = { fm: DB.papers }; DB.papers ||= {};
}
normDB();
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(DB)); } catch { /* private mode */ } };
const st = id => DB.stats[id] ||= { a: 0, c: 0, r: [] };
function record(id, ok) {
  const s = st(id); s.a++; if (ok) s.c++; s.r.push(ok ? 1 : 0); if (s.r.length > 10) s.r.shift();
  DB.streak = ok ? DB.streak + 1 : 0; DB.best = Math.max(DB.best, DB.streak);
  const d = new Date().toISOString().slice(0, 10); DB.days[d] = (DB.days[d] || 0) + 1; save();
}
const mastery = id => { const s = DB.stats[id]; return s ? s.r.reduce((a, b) => a + b, 0) / 10 : 0; };
const topicMastery = t => t.points.reduce((s, p) => s + mastery(p.id), 0) / t.points.length;
const courseMastery = c => c.points.reduce((s, p) => s + mastery(p.id), 0) / c.points.length;
const level = m => m >= 0.8 ? ['Secure', 'lv3'] : m >= 0.4 ? ['Developing', 'lv2'] : m > 0 ? ['Learning', 'lv1'] : ['New', 'lv0'];
const bar = (m, color) => `<div class="bar"><span style="width:${Math.round(m * 100)}%;${color ? `background:${color}` : ''}"></span></div>`;
const badge = p => `<span class="sbadge s-${p.status}" title="${esc(STATUS[p.status][1])}">${STATUS[p.status][0]}</span>${p.ref ? ` <span class="sref" title="CCEA specification reference">CCEA ${esc(p.ref)}</span>` : ''}`;
const isRead = id => !!DB.read[id];
function totals(pts) { let a = 0, c = 0; for (const p of pts) { const s = DB.stats[p.id]; if (s) { a += s.a; c += s.c; } } return { a, c }; }
function dayStreak() { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if (DB.days[k]) { n++; d.setDate(d.getDate() - 1); } else if (n === 0 && k === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1); } else break; } return n; }
const chapterOf = p => BOOK[p.id] || null;
const wordsOf = html => html ? html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
const readMins = p => Math.max(3, Math.round(wordsOf(chapterOf(p) || p.notes) / 120));
const courseOf = p => COURSES[p.course] || C;

/* ---------- mount & nav ---------- */
let cleanup = [];
function unmount() { cleanup.forEach(f => { try { f(); } catch { } }); cleanup = []; }
function mount(html) { unmount(); app().innerHTML = html; renderMath(app()); window.scrollTo(0, 0); }
/* ---------- qualifications, units, sections & routes ---------- */
// Three subjects × four units. Maths units are courses (applied units split their topics into lettered sections);
// Physics units come from the physics lab engine (js/physics.js) through the PHYS object.
const QUALS = {
  maths: { name: 'Mathematics', short: 'Maths', mini: 'Maths', board: 'CCEA GCE Mathematics (2018)', color: 'var(--m-fill)', tag: 'Pure maths, mechanics and statistics.',
    blurb: 'Pure mathematics with mechanics and statistics. AS 1 and AS 2 make the AS; add A2 1 and A2 2 for the A level.',
    structure: [['AS 1', 'Pure Mathematics', '1 h 45 min', '60% of AS · 24% of A level'], ['AS 2', 'Applied Mathematics (mechanics and statistics)', '1 h 15 min', '40% of AS · 16% of A level'],
      ['A2 1', 'Pure Mathematics', '2 h 30 min', '36% of A level'], ['A2 2', 'Applied Mathematics (mechanics and statistics)', '1 h 30 min', '24% of A level']] },
  further: { name: 'Further Mathematics', short: 'Further Maths', mini: 'Further', board: 'CCEA GCE Further Mathematics (2018)', color: 'var(--f-fill)', tag: 'Further pure, mechanics, statistics and decision maths.',
    blurb: 'Further pure, plus two applied units where you choose your sections from Mechanics, Statistics and Discrete & Decision Mathematics.',
    structure: [['AS 1', 'Pure Mathematics', '1 h 30 min', '50% of AS · 20% of A level'], ['AS 2', 'Applied Mathematics (choose two sections)', '1 h 30 min', '50% of AS · 20% of A level'],
      ['A2 1', 'Pure Mathematics', '2 h 15 min', '30% of A level'], ['A2 2', 'Applied Mathematics (choose two sections)', '2 h 15 min', '30% of A level']] },
  physics: { name: 'Physics', short: 'Physics', mini: 'Physics', board: 'CCEA GCE Physics (2016)', color: 'var(--p-fill)', tag: 'A live lab for every section, with notes, drills and mock tests.',
    blurb: 'Live simulations and virtual practicals for every section, with revision notes, randomised exam drills, timed mock tests and a tutor you can ask anything.',
    structure: [['AS 1', 'Forces, Energy and Electricity', '1 h 45 min', '40% of AS · 16% of A level'], ['AS 2', 'Waves, Photons and Astronomy', '1 h 45 min', '40% of AS · 16% of A level'],
      ['AS 3', 'Practical Techniques and Data Analysis', '2 × 1 h', '20% of AS · 8% of A level'],
      ['A2 1', 'Deformation of Solids, Thermal Physics, Circular Motion, Oscillations and Atomic and Nuclear Physics', '2 h', '24% of A level'], ['A2 2', 'Fields, Capacitors and Particle Physics', '2 h', '24% of A level'],
      ['A2 3', 'Practical Techniques and Data Analysis', '2 × 1 h', '12% of A level']] },
};
const SUBJECTS = ['maths', 'further', 'physics'];
const SUBJ_ICON = { maths: '∫', further: 'ℂ', physics: '<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="16" rx="12" ry="6.5" transform="rotate(-30 16 16)" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="24.6" cy="10.2" r="2.8" fill="currentColor"/><circle cx="16" cy="16" r="2.4" fill="currentColor"/></svg>' };
const UNIT_RANK = ['AS 1', 'AS 2', 'A2 1', 'A2 2'];
COURSE_ORDER.sort((x, y) => { const a = COURSES[x], b = COURSES[y]; return (a.qual === b.qual ? 0 : a.qual === 'maths' ? -1 : 1) || UNIT_RANK.indexOf(a.unitNo) - UNIT_RANK.indexOf(b.unitNo); });
const unitsOf = q => COURSE_ORDER.filter(id => COURSES[id].qual === q);
const routeOf = c => (c.routes && PREFS.routes && PREFS.routes[c.id]) || '';
const inRoute = (c, t) => !t || !t.section || !routeOf(c) || routeOf(c).includes(t.section);
// the points a drill or sprint may use: on-route, and on-spec unless supporting chapters are switched on
const drillable = c => c.points.filter(p => (PREFS.support || p.status === 'core') && inRoute(c, TP[p.topic]));
const sectionOf = (c, id) => (c.sections || []).find(s => s.id === id);
// render topics grouped under "Section A · Mechanics 1" headings (pure units have no sections)
function bySection(c, topics, render, head = s => `<h2 class="sech">Section ${s.id} · ${s.title}</h2>`) {
  if (!c.sections) return render(topics);
  return c.sections.map(s => { const ts = topics.filter(t => t.section === s.id); return ts.length ? `<div class="secblock${inRoute(c, ts[0]) ? '' : ' offroute'}">${head(s)}${render(ts)}</div>` : ''; }).join('');
}

/* ---------- nav ---------- */
// Three layers, as on apple.com and iOS: a global bar (qualifications + shared tools), a local bar for the open unit,
// and on phones a bottom tab bar for the five places used most.
const NAV_LOCAL = [['', 'Overview'], ['spec', 'Spec'], ['book', 'Book'], ['drill', 'Drill'], ['formulae', 'Formulae'], ['papers', 'Papers'], ['progress', 'Progress']];
const SECTION = { point: 'book', topic: '', sprint: 'drill', archive: 'spec' }; // the local-nav item each page lives under
function renderNav(inCourse, qual) {
  const cid = inCourse ? C.id : (COURSES[DB.lastCourse] ? DB.lastCourse : C.id), q = inCourse ? C.qual : qual;
  document.body.classList.toggle('in-course', inCourse);
  const qs = `<div class="cswitch" role="group" aria-label="Qualification">${Object.entries(QUALS).map(([k, Q]) => `<a href="#/${k}" class="${q === k ? 'on' : ''}"><span class="q-long">${Q.short}</span><span class="q-short">${Q.mini}</span></a>`).join('')}</div>`;
  $('#nav').innerHTML = `${qs}<a href="#/lab" data-r="lab" class="g-lab">${ico('lab')}<span class="gtext">Lab</span></a><a href="#/sims" data-r="sims" title="Simulations">${ico('sims')}<span class="gtext">Simulations</span></a><a href="#/about" data-r="about" class="g-about"><span class="gtext">About</span></a><a href="#/calc" class="gico g-calc" title="Calculator (Alt+C)" aria-label="Calculator" data-r="calc">${ico('calc')}</a><a href="#/settings" class="gico" title="Settings — save and load progress" aria-label="Settings" data-r="settings">${ico('gear')}</a><button id="theme" class="icon-btn gico" title="Light or dark appearance" aria-label="Switch between light and dark appearance">${ico('theme')}</button>`;
  $('#theme').onclick = toggleTheme;
  const ln = $('#lnav'); ln.hidden = !inCourse;
  ln.innerHTML = inCourse ? `<div class="lnav-in"><a class="lnav-title" href="#/${C.qual}">${QUALS[C.qual].name}</a>
    <div class="cswitch useg" role="group" aria-label="Unit">${unitsOf(C.qual).map(id => `<a href="#/${id}" class="${id === C.id ? 'on' : ''}" title="${esc(COURSES[id].name + ' ' + COURSES[id].unit)}">${COURSES[id].unitNo}</a>`).join('')}</div>
    <div class="lnav-links">${NAV_LOCAL.map(([p, l]) => `<a href="#/${C.id}${p ? '/' + p : ''}" data-r="${C.id}/${p}">${l}</a>`).join('')}</div>
    <a class="btn primary small lnav-cta" href="#/${C.id}/sprint">Sprint</a></div>` : '';
  $('#tabbar').innerHTML = [[`#/${cid}`, `${cid}/`, 'overview', 'Overview'], [`#/${cid}/book`, `${cid}/book`, 'book', 'Book'], [`#/${cid}/drill`, `${cid}/drill`, 'drill', 'Drill'], ['#/lab', 'lab', 'lab', 'Lab'], ['#/calc', 'calc', 'calc', 'Calculator']]
    .map(([h, r, i, l]) => `<a href="${h}" data-r="${r}"${r === 'calc' ? ' class="tcalc"' : ''}>${ico(i)}<span>${l}</span></a>`).join('');
}
// Physics has its own unit bar and tab bar; everything below them is drawn by PHYS.route()
function renderPhysNav(sub) {
  const u = PHYS.unitFor(sub), [a, b] = sub;
  renderNav(false, 'physics'); document.body.classList.add('in-course');
  const key = PHYS.UNITS.some(x => x.id === a) ? `physics/${a}${b === 'spec' || b === 'equations' ? '/' + b : ''}` : a === 'practice' || a === 'tutor' ? `physics/${a}` : `physics/${u.id}`;
  const ln = $('#lnav'); ln.hidden = false;
  ln.innerHTML = `<div class="lnav-in"><a class="lnav-title" href="#/physics">Physics</a>
    <div class="cswitch useg" role="group" aria-label="Unit">${PHYS.UNITS.map(x => `<a href="#/physics/${x.id}" class="${x === u ? 'on' : ''}" title="${esc(x.title)}">${x.no}</a>`).join('')}</div>
    <div class="lnav-links">${[['', 'Overview'], ['/spec', 'Spec'], ['/equations', 'Equations']].map(([p, l]) => `<a href="#/physics/${u.id}${p}" data-r="physics/${u.id}${p}">${l}</a>`).join('')}<a href="#/physics/practice" data-r="physics/practice">Practice</a><a href="#/physics/tutor" data-r="physics/tutor">Tutor</a></div>
    <a class="btn primary small lnav-cta" href="#/physics/practice/${u.id}">Mock test</a></div>`;
  $('#tabbar').innerHTML = [[`#/physics/${u.id}`, `physics/${u.id}`, 'overview', 'Overview'], [`#/physics/${u.id}/spec`, `physics/${u.id}/spec`, 'spec', 'Spec'], ['#/physics/practice', 'physics/practice', 'drill', 'Practice'], ['#/physics/tutor', 'physics/tutor', 'chat', 'Tutor'], ['#/calc', 'calc', 'calc', 'Calculator']]
    .map(([h, r, i, l]) => `<a href="${h}" data-r="${r}"${r === 'calc' ? ' class="tcalc"' : ''}>${ico(i)}<span>${l}</span></a>`).join('');
  highlight(key);
}
const crumbs = (...parts) => `<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/${C.qual}">${QUALS[C.qual].short}</a> / <a href="#/${C.id}">${C.unitNo}</a>${parts.map(p => ' / ' + p).join('')}</nav>`;

/* ---------- COURSE CHOOSER ---------- */
function unitCard(id) {
  const c = COURSES[id], rd = c.points.filter(p => isRead(p.id)).length, t = totals(c.points), m = courseMastery(c);
  return `<a class="card unit" href="#/${id}" style="--cc:${QUALS[c.qual].color}"><div class="uhead"><div class="cicon sm">${c.unitNo}</div><div><p class="eyebrow">${c.level} · ${QUALS[c.qual].name}</p><h3>${c.uname}</h3></div></div>
    <p class="utag">${esc(c.tagline)}</p><div class="cmeter">${bar(m, QUALS[c.qual].color)}<span>${Math.round(m * 100)}%</span></div>
    <small>${c.points.length} spec points · ${rd} read · ${t.a} answered${DB.lastCourse === id ? ' · <b>last opened</b>' : ''}</small></a>`;
}
function physUnitCard(u) {
  const t = PHYS.stats().by[u.id], m = t.outs ? t.ticked / t.outs : 0;
  return `<a class="card unit" href="#/physics/${u.id}" style="--cc:${QUALS.physics.color}"><div class="uhead"><div class="cicon sm">${u.no}</div><div><p class="eyebrow">${u.level} · Physics</p><h3 title="${esc(u.title)}">${u.short || u.title}</h3></div></div>
    <p class="utag">${PHYS.topicsIn(u).map(x => x.short || x.title).join(' · ')}</p><div class="cmeter">${bar(m, QUALS.physics.color)}<span>${Math.round(m * 100)}%</span></div>
    <small>${t.sections} sections · ${t.labs} labs · ${t.ticked}/${t.outs} outcomes ticked${DB.lastCourse === 'physics' && PHYS.lastUnit() === u ? ' · <b>last opened</b>' : ''}</small></a>`;
}
// one card per subject: its colour, its four units one tap away, and how far through you are
function subjectCard(k) {
  const Q = QUALS[k];
  let units, m, line;
  if (k === 'physics') {
    const t = PHYS.stats(); units = PHYS.UNITS.map(u => [`#/physics/${u.id}`, u.no]); m = t.outs ? t.ticked / t.outs : 0;
    line = `${t.sections} sections · ${t.labs} live labs · ${t.ticked}/${t.outs} outcomes ticked`;
  } else {
    const pts = unitsOf(k).flatMap(id => COURSES[id].points); units = unitsOf(k).map(id => [`#/${id}`, COURSES[id].unitNo]);
    m = pts.reduce((a, p) => a + mastery(p.id), 0) / pts.length; line = `${pts.length} spec points · ${pts.filter(p => isRead(p.id)).length} chapters read`;
  }
  return `<article class="card subj s-${k}"><a class="subj-main" href="#/${k}"><span class="sicon">${SUBJ_ICON[k]}</span><div><h2>${Q.name}</h2><p>${Q.tag}</p></div>${ico('chevron')}</a>
    <nav class="subj-units" aria-label="${Q.name} units">${units.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}</nav>
    <div class="cmeter">${bar(m)}<span>${Math.round(m * 100)}%</span></div><small>${line}</small></article>`;
}
function continueLink() {
  if (DB.lastCourse === 'physics') { const u = PHYS.lastUnit(); return [`#/physics/${u.id}`, `Continue Physics ${u.no}`]; }
  const last = COURSES[DB.lastCourse];
  return last ? [`#/${last.id}`, `Continue ${last.short}`] : ['#/m1', 'Start with Maths AS 1'];
}
function viewChooser() {
  const [ch, cl] = continueLink();
  const tool = ([h, i, t]) => `<a class="tool" href="${h}">${ico(i)}<span>${t}</span></a>`;
  mount(`${backupBanner()}<section class="chooser">
    <p class="kicker">CCEA A level · Maths, Further Maths and Physics</p>
    <h1><span class="grad">BCS Academy</span></h1>
    <p class="lead">Every unit of all three subjects, every specification point, in order.</p>
    <div class="cta center"><a class="btn primary" href="${ch}">${cl} ${ico('chevron')}</a><a class="btn" href="#/about">Why I built this ${ico('chevron')}</a></div>
  </section>
  <section class="grid subjects">${SUBJECTS.map(subjectCard).join('')}</section>
  <nav class="tools" aria-label="Tools">${[['#/lab', 'lab', 'Lab'], ['#/sims', 'sims', 'Simulations'], ['#/calc', 'calc', 'Calculator'], ['#/settings', 'gear', 'Settings']].map(tool).join('')}</nav>
  <p class="credit center">${CREDIT}</p>`);
}
function viewQual(k) {
  const Q = QUALS[k];
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / ${Q.short}</nav>
  <section class="hero"><p class="kicker">${esc(Q.board)}</p><h1>${Q.name.replace(/^(Further )?/, m => m)}</h1><p class="lead">${Q.blurb}</p></section>
  <div class="grid units">${k === 'physics' ? PHYS.UNITS.map(physUnitCard).join('') : unitsOf(k).map(unitCard).join('')}</div>
  <h2 class="sech">How it's assessed</h2>
  <div class="card"><table class="tbl"><tr><th>Unit</th><th>Content</th><th>Exam</th><th>Weighting</th></tr>${Q.structure.map(([u, c, e, w]) => `<tr><td><b>${u}</b></td><td>${c}</td><td>${e}</td><td>${w}</td></tr>`).join('')}</table>
  <p class="muted small">From the "Specification at a glance" table of the ${esc(Q.board)} specification. ${k === 'further' ? 'In each applied unit you answer the questions from two sections: A and B, A and C, A and D, or C and D.' : k === 'physics' ? 'AS 3 and A2 3 assess practical techniques and data analysis. They have no unit of their own here: the virtual practicals in each section practise those skills.' : 'In each applied unit you answer every question in both sections (mechanics and statistics).'}</p></div>`);
}

/* ---------- COURSE HOME ---------- */
function routePicker() {
  if (!C.routes) return '';
  const cur = routeOf(C), name = r => r.split('').map(x => `${x} ${sectionOf(C, x).title}`).join(' + ');
  return `<div class="card routecard"><div><h3>Your sections</h3><p class="muted small">In the exam you answer the questions from two of the four sections: ${C.routes.map(r => r.split('').join(' and ')).join(', ')}. Pick yours to focus the home page, drills and sprints.</p></div>
    <div class="seg" id="routeseg"><button data-r="" class="${cur ? '' : 'on'}">All sections</button>${C.routes.map(r => `<button data-r="${r}" class="${cur === r ? 'on' : ''}" title="${esc(name(r))}">${r.split('').join(' + ')}</button>`).join('')}</div></div>`;
}
function viewHome() {
  const pts = C.points, { a, c } = totals(pts), route = routeOf(C), mine = drillable(C);
  const read = pts.filter(p => isRead(p.id)).length, secure = pts.filter(p => mastery(p.id) >= 0.8).length;
  const nextRead = pts.find(p => !isRead(p.id) && inRoute(C, TP[p.topic])), weakest = mine.filter(p => st(p.id).a > 0).sort((x, y) => mastery(x.id) - mastery(y.id))[0];
  const tiles = [['spec', 'spec', '#0a84ff', 'Specification', 'Every outcome, status and confidence'], ['book', 'book', '#ff9500', 'Textbook', C.qual === 'maths' ? `${pts.length} chapters, worked examples first` : `${pts.length} chapters with full ${C.sections ? 'derivations' : 'proofs'}`], ['drill', 'drill', '#ff2d55', 'Smart drill', 'Endless questions, weakest first'],
    ['formulae', 'sigma', '#5e5ce6', 'Formula book', 'Every result, searchable'], ['papers', 'papers', '#34c759', 'Past papers', 'Official links, tracker, question bank'], ['sprint', 'sprint', '#ff9f0a', 'Sprint', `${PREFS.sprintN} timed mixed questions`]];
  // on a chosen route, list its sections first
  const order = route ? [...C.topics.filter(t => inRoute(C, t)), ...C.topics.filter(t => !inRoute(C, t))] : C.topics;
  const secs = C.sections && route ? [...C.sections.filter(s => route.includes(s.id)), ...C.sections.filter(s => !route.includes(s.id))] : C.sections;
  mount(`${backupBanner()}
  <section class="hero">
    <p class="kicker">${esc(C.board)} · Unit ${esc(C.unit)}</p>
    <h1>${C.name} <span class="grad">${C.unitNo}</span></h1>
    <p class="lead">${esc(C.tagline)}</p>
    <div class="cta center">${nextRead ? `<a class="btn primary" href="${cr('point/' + nextRead.id)}?tab=learn">${read ? 'Continue' : 'Start'} reading <span class="btn-sub">${nextRead.code} ${esc(nextRead.title)}</span></a>` : `<a class="btn primary" href="${cr('drill')}">Everything read — drill it</a>`}<a class="btn" href="${cr('sprint')}">${PREFS.sprintN}-question sprint ${ico('chevron')}</a></div>
  </section>
  <section class="stats">
    <div class="stat"><b>${read}<i>/${pts.length}</i></b><span>chapters read</span></div>
    <div class="stat"><b>${secure}<i>/${pts.length}</i></b><span>points secure</span></div>
    <div class="stat"><b>${a ? Math.round(100 * c / a) : 0}<i>%</i></b><span>accuracy · ${a} answered</span></div>
    <div class="stat"><b>${dayStreak()}</b><span>day streak</span></div>
    ${weakest ? `<a class="stat wide" href="${cr('point/' + weakest.id)}?tab=drill"><span>Weakest attempted — drill it</span><b class="small">${weakest.code} ${esc(weakest.title)}</b>${ico('chevron')}</a>` : ''}
  </section>
  <section class="grid tiles">${tiles.map(([h, i, col, t, d]) => `<a class="card tile" href="${cr(h)}" style="--tc:${col}"><span class="ti">${ico(i)}</span><b>${t}</b><small>${d}</small></a>`).join('')}</section>
  ${routePicker()}
  ${C.sections ? bySection({ ...C, sections: secs }, order, ts => `<section class="grid topics">${ts.map(topicCard).join('')}</section>`, s => `<h2 class="sech">Section ${s.id} <span class="muted">· ${s.title}</span></h2>`)
    : `<h2 class="sech">Specification topics</h2><section class="grid topics">${C.topics.map(topicCard).join('')}</section>`}`);
  const rs = $('#routeseg');
  if (rs) rs.onclick = e => { const b = e.target.closest('button'); if (!b) return; PREFS.routes = { ...(PREFS.routes || {}), [C.id]: b.dataset.r }; savePrefs(); viewHome(); };
}
function topicCard(t) {
  const rd = t.points.filter(p => isRead(p.id)).length;
  return `<a class="card topic" href="${cr('topic/' + t.id)}" style="--tc:${t.color}"><div class="ticon">${t.icon}</div>
    <div class="tbody"><h3><span class="code">${t.code}</span> ${t.title}</h3><p>${t.blurb}</p>${bar(topicMastery(t), t.color)}<small>${t.points.length} point${t.points.length === 1 ? '' : 's'} · ${rd} read · ${Math.round(topicMastery(t) * 100)}% mastered</small></div></a>`;
}

/* ---------- SPEC ---------- */
function viewSpec() {
  const row = p => { const m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="${cr('point/' + p.id)}?tab=learn">${esc(p.title)}</a> ${badge(p)}</td><td>${isRead(p.id) ? '✓' : '—'}</td><td><span class="pill ${cls}">${lv}</span></td>
    <td><select data-conf="${p.id}">${['', 'Not started', 'Shaky', 'OK', 'Confident'].map(o => `<option ${DB.conf[p.id] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></td></tr>`; };
  mount(`${crumbs('Specification')}
  <header class="phead slim"><div><h1>${C.unit} — specification map</h1><p>Every topic and learning outcome for ${esc(C.board)}, linked to its chapter, simulation and drills. Only specification content is in this course.</p></div></header>
  <div class="box notice"><b>Official wording.</b> Every learning outcome below is quoted from the ${esc(C.specRef)}. The codes (${C.topics[0].outcomes[0].code}, …) are BCS Academy labels — CCEA prints the bullets unnumbered. Next to each outcome are the chapters that cover it, so you can see that nothing is missing and nothing extra is included. Badges: ${['core', 'check'].map(k => `<span class="sbadge s-${k}">${STATUS[k][0]}</span> ${STATUS[k][1]}`).join(' · ')}.</div>
  <div class="box"><b>Assessment.</b> ${esc(C.exam)}. ${esc(C.assumes || '')} Formulae provided in the exam are in the <a href="${C.sources[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet — see the <a href="${cr('formulae')}">formula book</a> for what is given and what you must learn.</div>
  ${bySection(C, C.topics, ts => ts.map(t => `<section class="card spect" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2>
    <p class="muted small">Students should be able to:</p>
    <ul class="outc coded">${t.outcomes.map(o => `<li><span class="ocode">${o.code}</span><span class="otext">${esc(o.text)}</span><span class="olinks">${o.points.length ? o.points.map(p => `<a href="${cr('point/' + p.id)}?tab=learn" class="olink ${isRead(p.id) ? 'done' : ''}">${p.code}</a>`).join('') : '<span class="bad small">not covered</span>'}</span></li>`).join('')}</ul>
    <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Read</th><th>Mastery</th><th>Confidence</th></tr>${t.points.map(row).join('')}</table></section>`).join(''))}
  <div class="box"><b>Sources</b><ul>${C.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul></div>
  ${C.archiveTopic.points.length ? `<p class="muted small">Material that isn't on this unit's specification has been moved to the <a href="${cr('archive')}">archive</a> and is excluded from drills and sprints.</p>` : ''}`);
  app().querySelectorAll('[data-conf]').forEach(s => s.onchange = () => { DB.conf[s.dataset.conf] = s.value; save(); });
}
function viewArchive() {
  mount(`${crumbs('Archive')}<header class="phead slim"><div><h1>Archive — not on the ${C.unit} specification</h1><p>Kept for reference only (prerequisites from other units or extension). Not used in drills, sprints or the spec map.</p></div></header>
  <section class="plist">${C.archiveTopic.points.map(p => `<div class="card point"><div class="pmain"><h3>${esc(p.title)}</h3></div><div class="pact"><a class="btn small" href="${cr('point/' + p.id)}?tab=learn">Open</a></div></div>`).join('')}</section>`);
}

/* ---------- BOOK ---------- */
function viewBook() {
  mount(`${crumbs('Textbook')}
  <header class="phead slim"><div><h1>The ${C.short} textbook</h1><p>One chapter per spec point: the big picture, definitions, theorems${C.qual === 'maths' ? '' : ' with <b>full proofs and derivations</b>'}, worked examples, common mistakes, exam technique, check-yourself questions and an original exam-style question with a model solution.</p></div></header>
  ${bySection(C, C.topics, ts => ts.map(t => `<section class="card booktoc" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2><ol>${t.points.map(p => `<li class="${isRead(p.id) ? 'done' : ''}"><a href="${cr('point/' + p.id)}?tab=learn"><span class="code">${p.code}</span> ${esc(p.title)}</a> ${badge(p)} <span class="muted small">· ${readMins(p)} min${isRead(p.id) ? ' · ✓ read' : ''}</span></li>`).join('')}</ol></section>`).join(''))}`);
}

/* ---------- TOPIC ---------- */
function viewTopic(id) {
  const t = TP[id]; if (!t || t.course !== C.id) return viewHome();
  mount(`${crumbs(t.title)}
  <header class="phead" style="--tc:${t.color}"><div class="ticon big">${t.icon}</div><div><h1><span class="code">${t.code}</span> ${t.title}</h1><p>${t.blurb}</p></div>
  <a class="btn primary" href="${cr('drill')}?topics=${t.id}">Drill whole topic</a></header>
  <ul class="outc coded card">${t.outcomes.map(o => `<li><span class="ocode">${o.code}</span><span class="otext">${esc(o.text)}</span></li>`).join('')}</ul>
  <section class="plist">${t.points.map(p => { const m = mastery(p.id), [lv, cls] = level(m), s = st(p.id); return `
    <div class="card point" style="--tc:${t.color}">
      <div class="pmain"><h3><span class="code">${p.code}</span> ${esc(p.title)} ${badge(p)}</h3>
      <div class="meta">${isRead(p.id) ? '✓ read · ' : ''}<span class="pill ${cls}">${lv}</span> ${s.a} attempted · ${s.a ? Math.round(100 * s.c / s.a) : 0}% correct · ${p.drills.length} generator${p.drills.length > 1 ? 's' : ''}</div>${bar(m, t.color)}</div>
      <div class="pact"><a class="btn small" href="${cr('point/' + p.id)}?tab=learn">Read</a>${p.sims.length ? `<a class="btn small" href="${cr('point/' + p.id)}?tab=sim">Simulate</a>` : ''}<a class="btn small primary" href="${cr('point/' + p.id)}?tab=drill">Drill</a></div>
    </div>`; }).join('')}</section>`);
}

/* ---------- POINT ---------- */
function viewPoint(id, tab = 'learn') {
  const p = PT[id]; if (!p) return viewHome();
  if (p.course !== C.id) { C = courseOf(p); renderNav(true); }
  const t = TP[p.topic], list = p.status === 'beyond' ? C.archiveTopic.points : C.points, idx = list.indexOf(p), prev = list[idx - 1], next = list[idx + 1];
  const nPP = DB.bank.filter(b => b.pid === id).length + DB.notes.filter(b => b.pid === id).length;
  const hasDes = typeof GRAPH_PRESETS !== 'undefined' && GRAPH_PRESETS[p.id];
  if (tab === 'desmos') tab = 'graph';
  const tabs = [['learn', 'Textbook'], ['summary', 'Summary'], ...(p.sims.length ? [['sim', 'Simulate']] : []), ...(hasDes ? [['graph', 'Graph']] : []), ['drill', 'Drill'], ['papers', `Past papers${nPP ? ` (${nPP})` : ''}`]];
  if (!tabs.find(x => x[0] === tab)) tab = 'learn';
  mount(`${crumbs(`<a href="${cr('topic/' + t.id)}">${t.title}</a>`, p.code)}
  <header class="phead slim" style="--tc:${t.color}"><div><h1><span class="code">${p.code}</span> ${esc(p.title)}</h1><p>${badge(p)} ${isRead(p.id) ? '<span class="muted small">✓ read</span>' : ''}</p></div>
  <div class="mast">${bar(mastery(p.id), t.color)}<small>${level(mastery(p.id))[0]} · ${Math.round(mastery(p.id) * 100)}%</small></div></header>
  ${p.status === 'beyond' ? `<div class="box notice">This topic is <b>not on the ${C.unit} specification</b>. It's archived for reference only.</div>` : ''}
  ${p.covers && p.covers.length ? `<div class="box specsays"><div class="lbl">The specification says — students should be able to:</div><ul>${p.covers.map(o => `<li><span class="ocode">${o.code}</span> ${esc(o.text)}</li>`).join('')}</ul>${p.status === 'check' ? '<p class="muted small">This chapter supports these outcomes (an example context or a technique they rely on) rather than being named outright.</p>' : ''}</div>` : ''}
  <div class="tabs">${tabs.map(([k, l]) => `<a class="tab ${k === tab ? 'on' : ''}" href="${cr('point/' + p.id)}?tab=${k}">${l}</a>`).join('')}</div>
  <section id="pane"></section>
  <nav class="pn">${prev ? `<a class="btn ghost" href="${cr('point/' + prev.id)}?tab=${tab}">← ${prev.code} ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="${cr('point/' + next.id)}?tab=${tab}">${next.code} ${esc(next.title)} →</a>` : ''}</nav>`);
  const pane = $('#pane');
  if (tab === 'learn') {
    const ch = chapterOf(p);
    pane.innerHTML = `<article class="card book"><div class="ctoc"></div><div class="bookc">${ch || p.notes}</div>
      <div class="bookend"><button class="btn ${isRead(p.id) ? '' : 'primary'}" id="markread">${isRead(p.id) ? ico('check') + ' Marked as read' : 'Mark chapter as read'}</button>
      ${p.sims.length ? `<a class="btn" href="${cr('point/' + p.id)}?tab=sim">${ico('sims')} See it in the simulation</a>` : ''}${hasDes ? `<a class="btn" href="${cr('point/' + p.id)}?tab=graph">${ico('graph')} Explore the graph</a>` : ''}<a class="btn" href="${cr('point/' + p.id)}?tab=drill">${ico('drill')} Drill it</a><button class="btn ghost" onclick="window.print()">${ico('print')} Print</button></div></article>`;
    const toc = pane.querySelector('.ctoc'), hs = [...pane.querySelectorAll('.bookc h3')];
    if (hs.length > 2) toc.innerHTML = `<b>In this chapter:</b> ` + hs.map((h, i) => { h.id = 'sec' + i; return `<a href="javascript:void 0" data-sec="sec${i}">${esc(h.textContent)}</a>`; }).join('');
    toc.addEventListener('click', e => { const s = e.target.dataset.sec; if (s) document.getElementById(s).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    renderMath(pane);
    $('#markread').onclick = () => { if (isRead(p.id)) delete DB.read[p.id]; else DB.read[p.id] = Date.now(); save(); viewPoint(id, 'learn'); };
  } else if (tab === 'summary') {
    pane.innerHTML = `<article class="notes card">${p.notes}</article><p class="muted center">The one-page summary. For full explanations use the Textbook tab.</p>`;
    renderMath(pane);
  } else if (tab === 'sim') {
    p.sims.forEach(sid => { const [k, opt] = sid.split(':'), S = SIMS[k]; if (!S) return; const box = document.createElement('div'); box.className = 'card simcard'; box.innerHTML = `<h3>${S.title}</h3><p class="muted">${S.desc}</p>`; pane.append(box); cleanup.push(S.mount(box, opt)); });
  } else if (tab === 'graph') {
    const box = document.createElement('div'); box.className = 'card'; pane.append(box); cleanup.push(mountGraphTab(box, GRAPH_PRESETS[p.id]));
  } else if (tab === 'papers') {
    papersForPoint(pane, p);
  } else {
    drillPanel(pane, { pool: [p.id] });
  }
}

/* ---------- DRILL & SPRINT ---------- */
function viewDrill(qs) {
  const sel = new Set((qs.get('topics') || C.topics.filter(t => inRoute(C, t)).map(t => t.id).join(',')).split(',').filter(id => TP[id] && TP[id].course === C.id));
  mount(`${crumbs('Smart drill')}
  <header class="phead slim"><div><h1>Smart drill · ${C.short}</h1><p>Questions weighted toward spec points you haven't secured. Endless. Press Enter to check and continue.</p></div></header>
  <div class="filters">${C.topics.map(t => `<label class="fchip" style="--tc:${t.color}"><input type="checkbox" value="${t.id}" ${sel.has(t.id) ? 'checked' : ''}> ${t.title}</label>`).join('')}</div>
  <section id="pane"></section>`);
  document.querySelectorAll('.filters input').forEach(c => c.addEventListener('change', () => { const on = [...document.querySelectorAll('.filters input:checked')].map(x => x.value); location.hash = cr('drill') + '?topics=' + (on.join(',') || C.topics[0].id); }));
  drillPanel($('#pane'), { pool: C.points.filter(p => sel.has(p.topic) && (PREFS.support || p.status === 'core')).map(p => p.id) });
}
function viewSprint() {
  const N = PREFS.sprintN || 10;
  mount(`${crumbs('Sprint')}
  <header class="phead slim"><div><h1>${N}-question sprint · ${C.short}</h1><p>Mixed across the whole unit. First answer counts. Beat your time.</p></div><div class="timer" id="timer">0:00</div></header>
  <section id="pane"></section>`);
  const t0 = performance.now(), tm = $('#timer'), iv = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); tm.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 250);
  cleanup.push(() => clearInterval(iv));
  drillPanel($('#pane'), {
    pool: drillable(C).map(p => p.id), sprint: N, onDone: log => {
      clearInterval(iv); const secs = (performance.now() - t0) / 1000, score = log.filter(l => l.ok).length;
      DB.sprints.push({ d: Date.now(), score, secs, c: C.id }); save();
      const mine = DB.sprints.filter(s => (s.c || 'fm') === C.id), best = mine.reduce((b, s) => (s.score > b.score || (s.score === b.score && s.secs < b.secs)) ? s : b, mine[0]);
      $('#pane').innerHTML = `<div class="card result"><h2>${score}/${N}</h2><p>${Math.floor(secs / 60)}m ${Math.round(secs % 60)}s · best ${best.score}/${N} in ${Math.round(best.secs)}s</p>
      <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Result</th><th>Time</th></tr>${log.map((l, i) => `<tr><td>${i + 1}</td><td><a href="${cr('point/' + l.pid)}?tab=learn">${PT[l.pid].code} ${esc(PT[l.pid].title)}</a></td><td class="${l.ok ? 'ok' : 'bad'}">${l.ok ? '✓' : '✗'}</td><td>${l.t.toFixed(0)}s</td></tr>`).join('')}</table>
      <div class="cta center"><a class="btn primary" href="${cr('sprint')}?r=${Date.now()}">Go again</a><a class="btn" href="${cr('drill')}">Smart drill</a></div></div>`;
    },
  });
}

/* ---------- SIMS (shared) ---------- */
function viewSims() {
  const used = {}; POINTS.filter(p => p.status !== 'beyond').forEach(p => p.sims.forEach(s => { const k = s.split(':')[0]; (used[k] ||= []).push(p); }));
  const groups = COURSE_ORDER.map(id => [id, Object.keys(SIMS).filter(k => (used[k] || []).some(p => p.course === id))]);
  const tile = k => { const S = SIMS[k]; return `<a class="card simtile" href="#/sim/${k}"><h3>${S.title}</h3><p>${S.desc}</p><small>${[...new Set((used[k] || []).map(p => `${COURSES[p.course].short} ${p.code}`))].join(' · ')}</small></a>`; };
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / Simulations</nav>
  <header class="phead slim"><div><h1>Simulations</h1><p>Interactive models, each linked to the spec points it supports. For free-form exploration use the <a href="#/lab">Lab</a> (including Desmos).</p></div></header>
  ${groups.map(([id, ks]) => ks.length ? `<h2 class="sech">${COURSES[id].name} · ${COURSES[id].unit}</h2><section class="grid sims">${ks.map(tile).join('')}</section>` : '').join('')}
  <h2 class="sech">Physics</h2><p class="muted">Every physics section is built around its own live labs. Open a unit to see them.</p>
  <section class="grid sims">${PHYS.UNITS.map(u => { const t = PHYS.stats().by[u.id]; return `<a class="card simtile" href="#/physics/${u.id}"><h3>Physics ${u.no}</h3><p>${u.title}</p><small>${t.labs} live labs across ${t.sections} sections</small></a>`; }).join('')}</section>`);
}
function viewSim(k) {
  const S = SIMS[k]; if (!S) return viewSims();
  const pts = POINTS.filter(p => p.status !== 'beyond' && p.sims.some(s => s.split(':')[0] === k));
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/sims">Simulations</a> / ${S.title}</nav><div class="card simcard" id="sb"><h3>${S.title}</h3><p class="muted">${S.desc}</p></div>
  <p class="muted">Used in: ${pts.map(p => `<a href="#/${p.course}/point/${p.id}?tab=learn">${COURSES[p.course].short} ${p.code} ${esc(p.title)}</a>`).join(' · ')}</p>`);
  cleanup.push(S.mount($('#sb')));
}

/* ---------- LAB (shared) ---------- */
// Tools are grouped by area rather than unit: most serve several units (the distribution calculator serves four).
const LAB_AREAS = [['pure', 'Pure: graphs, algebra & calculus', '#0a84ff'], ['fpure', 'Further pure: complex numbers, matrices, vectors', '#5e5ce6'], ['mech', 'Mechanics', '#ff9500'], ['stats', 'Statistics', '#34c759'], ['dec', 'Discrete & decision', '#af52de']];
const LAB_DEFAULT_AREA = { complex: 'fpure', matrix: 'fpure', ode: 'fpure' };
const labArea = k => LAB[k].area || LAB_DEFAULT_AREA[k] || (LAB[k].course === 'fm' ? 'fpure' : 'pure');
function viewLab(tool) {
  if (!tool || !LAB[tool]) {
    let pick = LAB_AREAS.some(([k]) => k === PREFS.labArea) ? PREFS.labArea : 'all';
    const col = k => LAB_AREAS.find(([a]) => a === labArea(k))[2];
    const tile = ([k, L]) => `<a class="card simtile labtile" href="#/lab/${k}" style="--tc:${col(k)}"><span class="ticon sm">${L.icon}</span><h3>${L.title}</h3><p>${L.desc}</p></a>`;
    mount(`<nav class="crumbs"><a href="#/">Courses</a> / Lab</nav>
    <header class="phead slim"><div><h1>The Lab</h1><p>Tools to check your working, explore ideas and test conjectures. Everything accepts full expressions: <code>2sqrt(3)</code>, <code>arsinh(x)</code>, <code>e^(i pi/3)</code>.</p></div></header>
    <div class="seg" id="labseg">${[['all', 'All tools'], ...LAB_AREAS.map(([k, l]) => [k, l.split(':')[0]])].map(([k, l]) => `<button data-c="${k}" class="${k === pick ? 'on' : ''}">${l}</button>`).join('')}</div>
    ${LAB_AREAS.map(([g, label]) => { const ts = Object.entries(LAB).filter(([k]) => labArea(k) === g); return ts.length || g === 'pure' ? `<section class="labgroup" data-g="${g}"><h2>${label}</h2><div class="grid sims">${ts.map(tile).join('')}${g === 'pure' ? `<a class="card simtile labtile" href="#/calc" style="--tc:#8e8e93"><span class="ticon sm">${ico('calc')}</span><h3>Scientific calculator</h3><p>Full-page calculator with SHIFT/HYP, degrees/radians, complex numbers and exact answers.</p></a>` : ''}</div></section>` : ''; }).join('')}`);
    const apply = () => app().querySelectorAll('.labgroup').forEach(s => (s.style.display = pick === 'all' || s.dataset.g === pick ? '' : 'none'));
    $('#labseg').onclick = e => { const b = e.target.closest('button'); if (!b) return; pick = b.dataset.c; PREFS.labArea = pick; savePrefs(); $('#labseg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); apply(); };
    apply();
    return;
  }
  const L = LAB[tool], g = labArea(tool), sib = Object.entries(LAB).filter(([k]) => labArea(k) === g);
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/lab">Lab</a> / ${L.title}</nav>
  <div class="labtabs">${sib.map(([k, x]) => `<a class="tab ${k === tool ? 'on' : ''}" href="#/lab/${k}">${x.title}</a>`).join('')}</div>
  <div class="card"><h3>${L.title} <span class="sref">${LAB_AREAS.find(([a]) => a === g)[1].split(':')[0]}</span></h3><p class="muted">${L.desc}</p><div id="labroot"></div></div>`);
  cleanup.push(L.mount($('#labroot')));
}

/* ---------- CALCULATOR (shared) ---------- */
function viewCalc() {
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / Calculator</nav>
  <div class="calcpage"><div class="card" id="cpage"></div>
  <div class="card calchelp"><h3>How to use it</h3><ul>
    <li>Type directly or tap keys. <b>Enter</b> evaluates, <b>↑/↓</b> recall history, <b>Esc</b> clears. Click a history line to reuse it.</li>
    <li><b>SHIFT</b> gives inverses (arcsin, eˣ, 10ˣ, ∛, x³, nPr). <b>HYP</b> gives sinh/cosh/tanh; SHIFT+HYP gives arsinh/arcosh/artanh.</li>
    <li><b>DRG</b> toggles degrees/radians (affects trig only).</li>
    <li>Use <code>i</code> anywhere for complex mode: <code>(1+i)^8</code>, <code>e^(i pi)</code>, <code>arg(1+i)</code>. Real-mode results like <code>ln(-1)</code> fall back to complex.</li>
    <li>Exact values are recognised: fractions, surds, multiples of π, logs — e.g. <code>sin(pi/3)</code> shows <b>= √3/2</b>.</li>
    <li>Functions: sin cos tan sec cosec cot, arcsin…, sinh…, arsinh…, ln, log(x) or log(x, base), exp, sqrt, cbrt, root(x, n), abs, nCr(n, r), nPr, x!, floor, ceil, re, im, arg, conj, gamma.</li>
    <li>Open the pop-up calculator from any page with the calculator button or <b>Alt + C</b>.</li></ul>
    <p class="muted small">In the exam you'll use an approved calculator — practise with your own model too.</p></div></div>`);
  const c = mountCalc($('#cpage')); c.focus();
}

/* ---------- FORMULAE ---------- */
function viewFormulae() {
  const F = C.formulae(), BK = (typeof BOOKLET !== 'undefined' && BOOKLET[C.id]) || new Set();
  const items = sec => sec.f.filter(([, , , pid]) => !pid || (PT[pid] && PT[pid].status !== 'beyond'));
  const all = F.flatMap(items), nB = all.filter(([n]) => BK.has(n)).length;
  mount(`${crumbs('Formula book')}
  <header class="phead slim"><div><h1>∑ Formula book · ${C.short}</h1><p>Every key result in ${C.unit}, tagged against CCEA's <a href="${C.sources[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet. Click a formula's link to jump to the chapter that covers it.</p></div><input class="search" id="fsearch" placeholder="Search formulae…"></header>
  <div class="box notice"><b>${nB} of ${all.length}</b> results here are <span class="fbk b">In booklet</span> — printed in the booklet you get in the exam. The other ${all.length - nB} are <span class="fbk l">Learn it</span> — you must know them by heart.</div>
  <div class="seg" id="fseg"><button class="on" data-f="all">All</button><button data-f="l">Must learn (${all.length - nB})</button><button data-f="b">In booklet (${nB})</button></div>
  <div id="flist">${F.map(sec => items(sec).length ? `<section class="card fsec" style="--tc:${sec.c}"><h2>${sec.t}</h2><div class="fgrid">${items(sec).map(([n, tex, note, pid]) => { const inB = BK.has(n); return `<div class="fitem" data-k="${inB ? 'b' : 'l'}" data-s="${esc((sec.t + ' ' + n + ' ' + note + ' ' + tex).toLowerCase())}"><div class="fn">${esc(n)} <span class="fbk ${inB ? 'b' : 'l'}">${inB ? 'In booklet' : 'Learn it'}</span>${note ? ` <span class="muted small">· ${esc(note)}</span>` : ''}${pid && PT[pid] ? ` <a class="small" href="${cr('point/' + pid)}?tab=learn">${PT[pid].code} →</a>` : ''}</div><div class="ftex">$$${tex}$$</div></div>`; }).join('')}</div></section>` : '').join('')}</div>`);
  let kind = 'all';
  const apply = () => { const q = $('#fsearch').value.toLowerCase().trim(); app().querySelectorAll('.fitem').forEach(f => f.style.display = (!q || f.dataset.s.includes(q)) && (kind === 'all' || f.dataset.k === kind) ? '' : 'none'); app().querySelectorAll('.fsec').forEach(s => s.style.display = [...s.querySelectorAll('.fitem')].some(f => f.style.display !== 'none') ? '' : 'none'); };
  $('#fsearch').addEventListener('input', apply);
  $('#fseg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; kind = b.dataset.f; $('#fseg').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); apply(); });
}

/* ---------- PAST PAPERS ---------- */
const pointOptions = sel => C.points.map(p => `<option value="${p.id}" ${p.id === sel ? 'selected' : ''}>${p.code} ${esc(p.title)}</option>`).join('');
function qForm(pid) {
  return `<form class="pform card" id="qform"><h3>➕ Add a real past-paper question</h3>
    <div class="lab-row"><label class="lf"><span>Spec point</span><select name="pid">${pointOptions(pid)}</select></label><label class="lf"><span>Source (paper, year, question)</span><input name="src" placeholder="e.g. CCEA ${C.paper} Summer 2023 Q7(a)" required></label><label class="lf"><span>Marks</span><input name="mk" size="3"></label></div>
    <label class="lf"><span>Question (use $...$ for maths, e.g. $r=2+\\cos\\theta$)</span><textarea name="q" rows="3" required></textarea></label>
    <label class="lf"><span>Your solution / mark-scheme notes (optional)</span><textarea name="sol" rows="3"></textarea></label>
    <button class="btn primary">Save question</button></form>
  <form class="pform card" id="nform"><h3>➕ Add an examiner's comment</h3>
    <div class="lab-row"><label class="lf"><span>Spec point</span><select name="pid">${pointOptions(pid)}</select></label><label class="lf"><span>Source (report, year, page)</span><input name="src" placeholder="e.g. Chief Examiner's Report Summer 2024, p.3" required></label></div>
    <label class="lf"><span>Quote (copy it exactly)</span><textarea name="quote" rows="2" required></textarea></label><button class="btn primary">Save quote</button></form>`;
}
function bindForms(root, after) {
  const qf = root.querySelector('#qform'), nf = root.querySelector('#nform');
  qf.onsubmit = e => { e.preventDefault(); const f = new FormData(qf); DB.bank.push({ id: uid(), pid: f.get('pid'), src: f.get('src'), mk: f.get('mk'), q: f.get('q'), sol: f.get('sol'), status: 'todo', t: Date.now() }); save(); after(); };
  nf.onsubmit = e => { e.preventDefault(); const f = new FormData(nf); DB.notes.push({ id: uid(), pid: f.get('pid'), src: f.get('src'), quote: f.get('quote'), t: Date.now() }); save(); after(); };
}
const qCard = b => `<div class="card qcard s-${b.status}"><div class="qh"><b>${esc(b.src)}</b>${b.mk ? ` <span class="pill lv0">${esc(b.mk)} marks</span>` : ''} <a href="${cr('point/' + b.pid)}?tab=learn" class="small">${PT[b.pid] ? PT[b.pid].code : ''}</a>
  <select data-status="${b.id}">${[['todo', 'To do'], ['done', 'Done ✓'], ['redo', 'Redo ↻']].map(([v, l]) => `<option value="${v}" ${b.status === v ? 'selected' : ''}>${l}</option>`).join('')}</select><button class="gx" data-delq="${b.id}" title="Delete">✕</button></div>
  <div class="qq">${esc(b.q).replace(/\n/g, '<br>')}</div>${b.sol ? `<details><summary>Solution notes</summary><div>${esc(b.sol).replace(/\n/g, '<br>')}</div></details>` : ''}</div>`;
const nCard = n => `<blockquote class="quote">“${esc(n.quote)}”<footer>— ${esc(n.src)} · <a href="${cr('point/' + n.pid)}?tab=learn">${PT[n.pid] ? PT[n.pid].code + ' ' + esc(PT[n.pid].title) : ''}</a> <button class="gx" data-deln="${n.id}" title="Delete">✕</button></footer></blockquote>`;
function bindCards(root, after) {
  root.querySelectorAll('[data-status]').forEach(s => s.onchange = () => { const b = DB.bank.find(x => x.id === s.dataset.status); if (b) { b.status = s.value; save(); after(); } });
  root.querySelectorAll('[data-delq]').forEach(x => x.onclick = () => { if (confirm('Delete this question?')) { DB.bank = DB.bank.filter(b => b.id !== x.dataset.delq); save(); after(); } });
  root.querySelectorAll('[data-deln]').forEach(x => x.onclick = () => { if (confirm('Delete this quote?')) { DB.notes = DB.notes.filter(b => b.id !== x.dataset.deln); save(); after(); } });
}
function papersForPoint(pane, p) {
  const qs = DB.bank.filter(b => b.pid === p.id), ns = DB.notes.filter(n => n.pid === p.id);
  pane.innerHTML = `<div class="box notice">BCS Academy doesn't reproduce CCEA papers or reports (they're CCEA's copyright). Open them from the <a href="${cr('papers')}">Past papers</a> page, then save the questions and examiner comments for <b>${p.code}</b> here.</div>
    <h3>Examiner comments on ${p.code}</h3>${ns.length ? ns.map(nCard).join('') : '<p class="muted">None saved yet.</p>'}
    <h3>Your past-paper questions on ${p.code}</h3>${qs.length ? qs.map(qCard).join('') : '<p class="muted">None saved yet.</p>'}
    <p class="muted">Every textbook chapter also ends with an original exam-style question with a model solution.</p>${qForm(p.id)}`;
  renderMath(pane); bindCards(pane, () => papersForPoint(pane, p)); bindForms(pane, () => papersForPoint(pane, p));
}
function viewPapers() {
  if (!DB.papers[C.id]) { DB.papers[C.id] = C.defaultPapers.map(n => ({ id: uid(), name: n, score: '', out: '', date: '', notes: '' })); save(); }
  const papers = DB.papers[C.id], mine = new Set(C.points.map(p => p.id));
  const bank = DB.bank.filter(b => mine.has(b.pid)).sort((a, b) => C.points.indexOf(PT[a.pid]) - C.points.indexOf(PT[b.pid])), notes = DB.notes.filter(n => mine.has(n.pid));
  mount(`${crumbs('Past papers')}
  <header class="phead slim"><div><h1>Past papers & examiner reports · ${C.short}</h1><p>Real CCEA papers, your scores, your bank of real questions by spec point, and examiner comments with their sources.</p></div>
  <div class="cta"><button class="btn" id="exp">${ico('down')} Download progress</button><label class="btn ghost">${ico('up')} Load progress<input type="file" id="imp" accept=".json,application/json" hidden></label><a class="btn ghost" href="#/settings">${ico('gear')} Settings</a></div></header>
  <div class="box notice"><b>Why aren't the papers built in?</b> CCEA past papers and Chief Examiner's Reports are CCEA's copyright, so no question or quote here is invented. Use the official links, then add questions and quotes yourself. They're stored in this browser; use <b>Export backup</b> to keep a copy.</div>
  <div class="grid two">
    <section class="card"><h2>Official sources</h2><ul class="links">${C.official.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(l)} ↗</a></li>`).join('')}</ul>${C.known ? `<p class="muted small">${esc(C.known)}</p>` : ''}</section>
    <section class="card"><h2>Paper tracker</h2><table class="tbl ptrack"><tr><th>Paper</th><th>Score</th><th>/</th><th>Date</th><th></th></tr>
      ${papers.map(r => `<tr data-r="${r.id}"><td><input data-k="name" value="${esc(r.name)}"></td><td><input data-k="score" size="3" value="${esc(r.score)}"></td><td><input data-k="out" size="3" value="${esc(r.out)}"></td><td><input data-k="date" type="date" value="${esc(r.date)}"></td><td>${r.score && r.out ? `<b>${Math.round(100 * r.score / r.out)}%</b>` : ''}</td></tr>`).join('')}</table>
      <button class="btn small" id="addp">+ Add paper</button></section></div>
  <h2 class="sech">Examiner comments (${notes.length})</h2>${notes.length ? notes.map(nCard).join('') : '<p class="muted">Copy useful lines from the Chief Examiner\'s Reports and tag them to a spec point. They appear on that point\'s Past papers tab.</p>'}
  <h2 class="sech">Question bank (${bank.length}) · ${bank.filter(b => b.status === 'done').length} done · ${bank.filter(b => b.status === 'redo').length} to redo</h2>
  ${bank.length ? bank.map(qCard).join('') : '<p class="muted">Add questions from real papers below. Mark them Done or Redo to build a revision list.</p>'}
  ${qForm(C.points[0].id)}`);
  const root = app(); renderMath(root);
  root.querySelectorAll('.ptrack input').forEach(i => i.onchange = () => { const r = papers.find(x => x.id === i.closest('tr').dataset.r); r[i.dataset.k] = i.value; save(); viewPapers(); });
  $('#addp').onclick = () => { papers.push({ id: uid(), name: 'New paper', score: '', out: '', date: '', notes: '' }); save(); viewPapers(); };
  bindCards(root, viewPapers); bindForms(root, viewPapers);
  $('#exp').onclick = downloadProgress;
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const pl = readPayload(JSON.parse(t)); if (confirm('Merge this progress file with the progress on this device? (Cancel to stop. To replace instead, use Settings.)')) { applyPayload(pl, 'merge'); viewPapers(); } } catch { alert('That file is not a BCS Academy progress file.'); } }); };
}

/* ---------- PROGRESS ---------- */
function viewProgress() {
  const { a, c } = totals(C.points);
  mount(`${crumbs('Progress')}
  <header class="phead slim"><div><h1>Progress · ${C.short}</h1><p>${a} answered · ${a ? Math.round(100 * c / a) : 0}% accuracy · best streak ${DB.best} · ${C.points.filter(p => isRead(p.id)).length} chapters read. Mastery = correct out of your last 10 attempts.</p></div>
  <button class="btn ghost" id="reset">Reset this course</button></header>
  <table class="tbl prog"><tr><th>Spec</th><th>Point</th><th>Read</th><th>Attempts</th><th>Accuracy</th><th>Mastery</th><th></th></tr>
  ${C.points.map(p => { const s = st(p.id), m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="${cr('point/' + p.id)}?tab=learn">${esc(p.title)}</a> ${badge(p)}</td><td>${isRead(p.id) ? '✓' : ''}</td><td>${s.a}</td><td>${s.a ? Math.round(100 * s.c / s.a) + '%' : '—'}</td><td><span class="pill ${cls}">${lv}</span>${bar(m, TP[p.topic].color)}</td><td><a class="btn small" href="${cr('point/' + p.id)}?tab=drill">Drill</a></td></tr>`; }).join('')}</table>`);
  $('#reset').onclick = () => { if (confirm(`Reset drill progress and reading status for ${C.short} on this device? (Your question bank is kept.)`)) { C.points.forEach(p => { delete DB.stats[p.id]; delete DB.read[p.id]; }); save(); viewProgress(); } };
}

/* ---------- router ---------- */
const LEGACY = ['point', 'topic', 'spec', 'book', 'drill', 'sprint', 'formulae', 'papers', 'progress'];
function route() {
  const [path, query] = (location.hash.slice(1) || '/').split('?'), qs = new URLSearchParams(query || ''), parts = path.split('/').filter(Boolean);
  let r = parts[0];
  if (LEGACY.includes(r)) { location.replace('#/fm/' + parts.join('/') + (query ? '?' + query : '')); return; }
  document.body.dataset.route = r || 'home';
  const subj = COURSES[r] ? COURSES[r].qual : QUALS[r] ? r : '';
  if (subj) document.documentElement.dataset.subject = subj; else delete document.documentElement.dataset.subject;
  if (r === 'physics' && parts.length > 1) { unmount(); DB.lastCourse = 'physics'; save(); const sub = parts.slice(1); renderPhysNav(sub); return PHYS.route(sub); }
  PHYS.leave();
  if (COURSES[r]) {
    C = COURSES[r]; DB.lastCourse = r; save(); renderNav(true);
    const v = parts[1];
    highlight(`${r}/${SECTION[v] ?? (v || '')}`);
    if (!v) return viewHome();
    if (v === 'topic') return viewTopic(parts[2]);
    if (v === 'point') return viewPoint(parts[2], qs.get('tab') || 'learn');
    if (v === 'spec') return viewSpec();
    if (v === 'book') return viewBook();
    if (v === 'drill') return viewDrill(qs);
    if (v === 'sprint') return viewSprint();
    if (v === 'formulae') return viewFormulae();
    if (v === 'papers') return viewPapers();
    if (v === 'progress') return viewProgress();
    if (v === 'archive') return viewArchive();
    return viewHome();
  }
  renderNav(false, QUALS[r] ? r : ''); highlight(r === 'sim' ? 'sims' : r || '');
  if (QUALS[r]) return viewQual(r);
  if (r === 'about') return viewAbout();
  if (r === 'sims') return viewSims();
  if (r === 'sim') return viewSim(parts[1]);
  if (r === 'lab') return viewLab(parts[1]);
  if (r === 'calc') return viewCalc();
  if (r === 'settings') return viewSettings();
  viewChooser();
}
function highlight(key) {
  document.querySelectorAll('#nav [data-r], #lnav [data-r], #tabbar [data-r]').forEach(a => { const on = a.dataset.r === key; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
}
// the tab bar's Calculator opens the sheet in place rather than leaving the page
$('#tabbar').addEventListener('click', e => { if (e.target.closest('.tcalc') && document.body.dataset.route !== 'calc') { e.preventDefault(); window.toggleCalc(); } });
// hairline under the global bar only once content scrolls beneath it
const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 2);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('hashchange', route);

// theme
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
try { applyTheme(localStorage.getItem(STORE + '-theme')); } catch { }
function toggleTheme() {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark', h = document.documentElement; h.classList.add('theming'); applyTheme(t); try { localStorage.setItem(STORE + '-theme', t); } catch { } route();
  clearTimeout(toggleTheme.t); toggleTheme.t = setTimeout(() => h.classList.remove('theming'), 450);
}

window.toggleCalc = setupCalcDrawer();
function boot() { if (!location.hash || location.hash === '#' || location.hash === '#/') { const s = PREFS.start === 'last' ? DB.lastCourse : PREFS.start; if (s && COURSES[s]) { location.replace('#/' + s); return; } if (s === 'physics') { location.replace('#/physics/' + PHYS.lastUnit().id); return; } } route(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
window.addEventListener('load', () => renderMath(app()));

// offline app: the service worker caches the site; a new deploy shows "Update available" instead of swapping files under the reader
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  let asked = false;
  const offer = w => {
    if (document.querySelector('.uptoast')) return;
    const t = document.createElement('div'); t.className = 'uptoast'; t.setAttribute('role', 'status');
    t.innerHTML = '<span>A new version of BCS Academy is ready.</span><button type="button">Update</button>';
    t.querySelector('button').onclick = () => { asked = true; w.postMessage({ type: 'SKIP_WAITING' }); };
    document.body.append(t);
  };
  navigator.serviceWorker.register('sw.js').then(r => {
    if (r.waiting && navigator.serviceWorker.controller) offer(r.waiting);
    r.addEventListener('updatefound', () => { const w = r.installing; if (w) w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w); }); });
  }).catch(() => { });
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (asked) { asked = false; location.reload(); } });
}
