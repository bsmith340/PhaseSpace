// BCSFM app shell: multi-course routing, progress, and every view.
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
function mount(html) { cleanup.forEach(f => { try { f(); } catch { } }); cleanup = []; app().innerHTML = html; renderMath(app()); window.scrollTo(0, 0); }
function renderNav(inCourse) {
  const nav = $('#nav'), sub = $('#brandsub');
  sub.textContent = inCourse ? `${C.short}` : 'Maths & Further Maths';
  const courseLinks = inCourse ? [['', 'Home'], ['spec', 'Spec'], ['book', 'Book'], ['drill', 'Drill'], ['formulae', 'Formulae'], ['papers', 'Papers'], ['progress', 'Progress']].map(([p, l]) => `<a href="#/${C.id}${p ? '/' + p : ''}" data-r="${C.id}/${p}">${l}</a>`).join('') : '';
  const switcher = `<div class="cswitch">${COURSE_ORDER.map(id => `<a href="#/${id}" class="${inCourse && C.id === id ? 'on' : ''}" style="--cc:${COURSES[id].color}">${COURSES[id].short}</a>`).join('')}</div>`;
  nav.innerHTML = `${switcher}${courseLinks}<a href="#/lab" data-r="lab">Lab</a><a href="#/sims" data-r="sims">Sims</a><a href="#/calc" class="navcalc" title="Calculator (Alt+C)" data-r="calc">🧮</a><button id="theme" class="icon-btn" title="Toggle light/dark" aria-label="Toggle theme">◐</button>`;
  $('#theme').onclick = toggleTheme;
}
const crumbs = (...parts) => `<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/${C.id}">${C.short}</a>${parts.map(p => ' / ' + p).join('')}</nav>`;

/* ---------- COURSE CHOOSER ---------- */
function viewChooser() {
  mount(`<section class="chooser">
    <p class="kicker">CCEA GCE Mathematics & Further Mathematics</p>
    <h1><span class="grad">BCSFM</span></h1>
    <p class="lead">Pick a course. Each one follows its CCEA specification point by point: textbook with full proofs → simulation → drills → real past papers.</p>
    <div class="grid courses">${COURSE_ORDER.map(id => { const c = COURSES[id], rd = c.points.filter(p => isRead(p.id)).length, t = totals(c.points); return `
      <a class="card course" href="#/${id}" style="--cc:${c.color}"><div class="cicon">${c.icon}</div>
        <div><p class="small muted">${esc(c.board)}</p><h2>${c.name} · ${c.unit}</h2><p>${esc(c.tagline)}</p>
        ${bar(courseMastery(c), c.color)}<small>${c.points.length} spec points · ${rd} chapters read · ${t.a} questions answered · ${Math.round(courseMastery(c) * 100)}% mastered</small>
        <span class="btn primary small cbtn">${DB.lastCourse === id ? 'Continue' : 'Open'} ${c.short} →</span></div></a>`; }).join('')}
      <div class="card course soon"><div class="cicon">＋</div><div><h2>More units coming</h2><p>AS 2 / A2 Maths and the Further Maths applied units can be added on the same system.</p></div></div>
    </div>
    <div class="grid tiles">${[['#/lab', '🧪', 'Lab', 'Desmos, grapher, complex, matrices, calculus, ODEs'], ['#/calc', '🧮', 'Calculator', 'Scientific + complex'], ['#/sims', '🌀', 'Simulations', `${Object.keys(SIMS).length} interactive models`]].map(([h, i, t, d]) => `<a class="card tile" href="${h}"><span class="ti">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}</div>
    <p class="credit">${CREDIT}</p></section>`);
}

/* ---------- COURSE HOME ---------- */
function viewHome() {
  const pts = C.points, { a, c } = totals(pts);
  const read = pts.filter(p => isRead(p.id)).length, secure = pts.filter(p => mastery(p.id) >= 0.8).length;
  const nextRead = pts.find(p => !isRead(p.id)), weakest = pts.filter(p => st(p.id).a > 0).sort((x, y) => mastery(x.id) - mastery(y.id))[0];
  const tiles = [['spec', '📋', 'Specification', 'Every point, status & confidence'], ['book', '📖', 'Textbook', `${pts.length} chapters with full proofs`], ['drill', '🎯', 'Smart drill', 'Endless questions, weakest first'],
    ['formulae', '∑', 'Formula book', 'Every result, searchable'], ['papers', '📝', 'Past papers', 'Official links, tracker, your question bank'], ['sprint', '⏱', 'Sprint', '10 timed mixed questions']];
  mount(`
  <section class="hero">
    <div>
      <p class="kicker">${esc(C.board)} · Unit ${esc(C.unit)}</p>
      <h1>${C.name} <span class="grad">${C.unit.split(' ')[0]} ${C.unit.split(' ')[1]}</span></h1>
      <p class="lead">${esc(C.tagline)} Read the textbook → see it in a simulation → drill it until it's secure → test yourself on real past papers.</p>
      <div class="cta">${nextRead ? `<a class="btn primary" href="${cr('point/' + nextRead.id)}?tab=learn">📖 ${read ? 'Continue' : 'Start'} reading: ${nextRead.code} ${esc(nextRead.title)}</a>` : `<a class="btn primary" href="${cr('drill')}">🎯 Everything read — drill it</a>`}<a class="btn" href="${cr('sprint')}">⏱ 10-question sprint</a></div>
    </div>
    <div class="stats">
      <div class="stat"><b>${read}/${pts.length}</b><span>chapters read</span></div>
      <div class="stat"><b>${secure}/${pts.length}</b><span>points secure</span></div>
      <div class="stat"><b>${a}</b><span>questions · ${a ? Math.round(100 * c / a) : 0}%</span></div>
      <div class="stat"><b>${dayStreak()}</b><span>day streak</span></div>
      ${weakest ? `<a class="stat wide" href="${cr('point/' + weakest.id)}?tab=drill"><span>Weakest attempted</span><b class="small">${weakest.code} ${esc(weakest.title)}</b></a>` : ''}
    </div>
  </section>
  <section class="grid tiles">${tiles.map(([h, i, t, d]) => `<a class="card tile" href="${cr(h)}"><span class="ti">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}</section>
  <h2 class="sech">Specification topics</h2>
  <section class="grid topics">${C.topics.map(topicCard).join('')}</section>`);
}
function topicCard(t) {
  const rd = t.points.filter(p => isRead(p.id)).length;
  return `<a class="card topic" href="${cr('topic/' + t.id)}" style="--tc:${t.color}"><div class="ticon">${t.icon}</div>
    <div class="tbody"><h3><span class="code">${t.code}</span> ${t.title}</h3><p>${t.blurb}</p>${bar(topicMastery(t), t.color)}<small>${t.points.length} points · ${rd} read · ${Math.round(topicMastery(t) * 100)}% mastered</small></div></a>`;
}

/* ---------- SPEC ---------- */
function viewSpec() {
  const row = p => { const m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="${cr('point/' + p.id)}?tab=learn">${esc(p.title)}</a> ${badge(p)}</td><td>${isRead(p.id) ? '✓' : '—'}</td><td><span class="pill ${cls}">${lv}</span></td>
    <td><select data-conf="${p.id}">${['', 'Not started', 'Shaky', 'OK', 'Confident'].map(o => `<option ${DB.conf[p.id] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></td></tr>`; };
  mount(`${crumbs('Specification')}
  <header class="phead slim"><div><h1>📋 ${C.unit} — specification map</h1><p>Every topic and learning outcome for ${esc(C.board)}, linked to its chapter, simulation and drills. Only specification content is in this course.</p></div></header>
  <div class="box notice"><b>About this map.</b> The outcomes are <b>BCSFM's summary</b> of the ${C.unit} content, compiled from CCEA's published materials and public course outlines (sources below), not CCEA's official wording. Badges: ${['core', 'check'].map(k => `<span class="sbadge s-${k}">${STATUS[k][0]}</span> ${STATUS[k][1]}`).join(' · ')}. Where a CCEA reference code is known it's shown next to the point. <b>Cross-check against the official specification.</b></div>
  <div class="box"><b>Assessment.</b> ${esc(C.exam)} (as stated in CCEA's specification and addenda — check the current version). Formulae provided in the exam are in the <a href="${C.sources[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet.</div>
  ${C.topics.map(t => `<section class="card spect" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2>
    <ul class="outc">${t.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
    <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Read</th><th>Mastery</th><th>Confidence</th></tr>${t.points.map(row).join('')}</table></section>`).join('')}
  <div class="box"><b>Sources</b><ul>${C.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul></div>
  ${C.archiveTopic.points.length ? `<p class="muted small">Material that isn't on this unit's specification has been moved to the <a href="${cr('archive')}">archive</a> and is excluded from drills and sprints.</p>` : ''}`);
  app().querySelectorAll('[data-conf]').forEach(s => s.onchange = () => { DB.conf[s.dataset.conf] = s.value; save(); });
}
function viewArchive() {
  mount(`${crumbs('Archive')}<header class="phead slim"><div><h1>🗄 Archive — not on the ${C.unit} specification</h1><p>Kept for reference only (prerequisites from other units or extension). Not used in drills, sprints or the spec map.</p></div></header>
  <section class="plist">${C.archiveTopic.points.map(p => `<div class="card point"><div class="pmain"><h3>${esc(p.title)}</h3></div><div class="pact"><a class="btn small" href="${cr('point/' + p.id)}?tab=learn">Open</a></div></div>`).join('')}</section>`);
}

/* ---------- BOOK ---------- */
function viewBook() {
  mount(`${crumbs('Textbook')}
  <header class="phead slim"><div><h1>📖 The ${C.short} textbook</h1><p>One chapter per spec point: the big picture, definitions, theorems with <b>full proofs and derivations</b>, worked examples, common mistakes, exam technique, check-yourself questions and an original exam-style question with a model solution.</p></div></header>
  ${C.topics.map(t => `<section class="card booktoc" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2><ol>${t.points.map(p => `<li class="${isRead(p.id) ? 'done' : ''}"><a href="${cr('point/' + p.id)}?tab=learn"><span class="code">${p.code}</span> ${esc(p.title)}</a> ${badge(p)} <span class="muted small">· ${readMins(p)} min${isRead(p.id) ? ' · ✓ read' : ''}</span></li>`).join('')}</ol></section>`).join('')}`);
}

/* ---------- TOPIC ---------- */
function viewTopic(id) {
  const t = TP[id]; if (!t || t.course !== C.id) return viewHome();
  mount(`${crumbs(t.title)}
  <header class="phead" style="--tc:${t.color}"><div class="ticon big">${t.icon}</div><div><h1><span class="code">${t.code}</span> ${t.title}</h1><p>${t.blurb}</p></div>
  <a class="btn primary" href="${cr('drill')}?topics=${t.id}">Drill whole topic</a></header>
  <ul class="outc card">${t.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
  <section class="plist">${t.points.map(p => { const m = mastery(p.id), [lv, cls] = level(m), s = st(p.id); return `
    <div class="card point" style="--tc:${t.color}">
      <div class="pmain"><h3><span class="code">${p.code}</span> ${esc(p.title)} ${badge(p)}</h3>
      <div class="meta">${isRead(p.id) ? '✓ read · ' : ''}<span class="pill ${cls}">${lv}</span> ${s.a} attempted · ${s.a ? Math.round(100 * s.c / s.a) : 0}% correct · ${p.drills.length} generator${p.drills.length > 1 ? 's' : ''}</div>${bar(m, t.color)}</div>
      <div class="pact"><a class="btn small" href="${cr('point/' + p.id)}?tab=learn">📖 Read</a>${p.sims.length ? `<a class="btn small" href="${cr('point/' + p.id)}?tab=sim">Simulate</a>` : ''}<a class="btn small primary" href="${cr('point/' + p.id)}?tab=drill">Drill</a></div>
    </div>`; }).join('')}</section>`);
}

/* ---------- POINT ---------- */
function viewPoint(id, tab = 'learn') {
  const p = PT[id]; if (!p) return viewHome();
  if (p.course !== C.id) { C = courseOf(p); renderNav(true); }
  const t = TP[p.topic], list = p.status === 'beyond' ? C.archiveTopic.points : C.points, idx = list.indexOf(p), prev = list[idx - 1], next = list[idx + 1];
  const nPP = DB.bank.filter(b => b.pid === id).length + DB.notes.filter(b => b.pid === id).length;
  const hasDes = typeof DESMOS_PRESETS !== 'undefined' && DESMOS_PRESETS[p.id];
  const tabs = [['learn', '📖 Textbook'], ['summary', '⚡ Summary'], ...(p.sims.length ? [['sim', '🧪 Simulate']] : []), ...(hasDes ? [['desmos', '📈 Desmos']] : []), ['drill', '🎯 Drill'], ['papers', `📝 Past papers${nPP ? ` (${nPP})` : ''}`]];
  if (!tabs.find(x => x[0] === tab)) tab = 'learn';
  mount(`${crumbs(`<a href="${cr('topic/' + t.id)}">${t.title}</a>`, p.code)}
  <header class="phead slim" style="--tc:${t.color}"><div><h1><span class="code">${p.code}</span> ${esc(p.title)}</h1><p>${badge(p)} ${isRead(p.id) ? '<span class="muted small">✓ read</span>' : ''}</p></div>
  <div class="mast">${bar(mastery(p.id), t.color)}<small>${level(mastery(p.id))[0]} · ${Math.round(mastery(p.id) * 100)}%</small></div></header>
  ${p.status === 'beyond' ? `<div class="box notice">⚠ This topic is <b>not on the ${C.unit} specification</b>. It's archived for reference only.</div>` : ''}
  <div class="tabs">${tabs.map(([k, l]) => `<a class="tab ${k === tab ? 'on' : ''}" href="${cr('point/' + p.id)}?tab=${k}">${l}</a>`).join('')}</div>
  <section id="pane"></section>
  <nav class="pn">${prev ? `<a class="btn ghost" href="${cr('point/' + prev.id)}?tab=${tab}">← ${prev.code} ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="${cr('point/' + next.id)}?tab=${tab}">${next.code} ${esc(next.title)} →</a>` : ''}</nav>`);
  const pane = $('#pane');
  if (tab === 'learn') {
    const ch = chapterOf(p);
    pane.innerHTML = `<article class="card book"><div class="ctoc"></div><div class="bookc">${ch || p.notes}</div>
      <div class="bookend"><button class="btn ${isRead(p.id) ? '' : 'primary'}" id="markread">${isRead(p.id) ? '✓ Marked as read' : 'Mark chapter as read'}</button>
      ${p.sims.length ? `<a class="btn" href="${cr('point/' + p.id)}?tab=sim">🧪 See it in the simulation</a>` : ''}${hasDes ? `<a class="btn" href="${cr('point/' + p.id)}?tab=desmos">📈 Explore in Desmos</a>` : ''}<a class="btn" href="${cr('point/' + p.id)}?tab=drill">🎯 Drill it</a><button class="btn ghost" onclick="window.print()">🖨 Print</button></div></article>`;
    const toc = pane.querySelector('.ctoc'), hs = [...pane.querySelectorAll('.bookc h3')];
    if (hs.length > 2) toc.innerHTML = `<b>In this chapter:</b> ` + hs.map((h, i) => { h.id = 'sec' + i; return `<a href="javascript:void 0" data-sec="sec${i}">${esc(h.textContent)}</a>`; }).join('');
    toc.addEventListener('click', e => { const s = e.target.dataset.sec; if (s) document.getElementById(s).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    renderMath(pane);
    $('#markread').onclick = () => { if (isRead(p.id)) delete DB.read[p.id]; else DB.read[p.id] = Date.now(); save(); viewPoint(id, 'learn'); };
  } else if (tab === 'summary') {
    pane.innerHTML = `<article class="notes card">${p.notes}</article><p class="muted center">The one-page summary. For full explanations and proofs use the 📖 Textbook tab.</p>`;
    renderMath(pane);
  } else if (tab === 'sim') {
    p.sims.forEach(sid => { const [k, opt] = sid.split(':'), S = SIMS[k]; if (!S) return; const box = document.createElement('div'); box.className = 'card simcard'; box.innerHTML = `<h3>${S.title}</h3><p class="muted">${S.desc}</p>`; pane.append(box); cleanup.push(S.mount(box, opt)); });
  } else if (tab === 'desmos') {
    const box = document.createElement('div'); box.className = 'card'; pane.append(box); cleanup.push(mountDesmos(box, DESMOS_PRESETS[p.id]));
  } else if (tab === 'papers') {
    papersForPoint(pane, p);
  } else {
    drillPanel(pane, { pool: [p.id] });
  }
}

/* ---------- DRILL & SPRINT ---------- */
function viewDrill(qs) {
  const sel = new Set((qs.get('topics') || C.topics.map(t => t.id).join(',')).split(',').filter(id => TP[id] && TP[id].course === C.id));
  mount(`${crumbs('Smart drill')}
  <header class="phead slim"><div><h1>🎯 Smart drill · ${C.short}</h1><p>Questions weighted toward spec points you haven't secured. Endless. Press Enter to check and continue.</p></div></header>
  <div class="filters">${C.topics.map(t => `<label class="fchip" style="--tc:${t.color}"><input type="checkbox" value="${t.id}" ${sel.has(t.id) ? 'checked' : ''}> ${t.title}</label>`).join('')}</div>
  <section id="pane"></section>`);
  document.querySelectorAll('.filters input').forEach(c => c.addEventListener('change', () => { const on = [...document.querySelectorAll('.filters input:checked')].map(x => x.value); location.hash = cr('drill') + '?topics=' + (on.join(',') || C.topics[0].id); }));
  drillPanel($('#pane'), { pool: C.points.filter(p => sel.has(p.topic)).map(p => p.id) });
}
function viewSprint() {
  const N = 10;
  mount(`${crumbs('Sprint')}
  <header class="phead slim"><div><h1>⏱ 10-question sprint · ${C.short}</h1><p>Mixed across the whole unit. First answer counts. Beat your time.</p></div><div class="timer" id="timer">0:00</div></header>
  <section id="pane"></section>`);
  const t0 = performance.now(), tm = $('#timer'), iv = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); tm.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 250);
  cleanup.push(() => clearInterval(iv));
  drillPanel($('#pane'), {
    pool: C.points.map(p => p.id), sprint: N, onDone: log => {
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
  <header class="phead slim"><div><h1>🌀 Simulations</h1><p>Interactive models, each linked to the spec points it supports. For free-form exploration use the <a href="#/lab">Lab</a> (including Desmos).</p></div></header>
  ${groups.map(([id, ks]) => ks.length ? `<h2 class="sech">${COURSES[id].name} · ${COURSES[id].unit}</h2><section class="grid sims">${ks.map(tile).join('')}</section>` : '').join('')}`);
}
function viewSim(k) {
  const S = SIMS[k]; if (!S) return viewSims();
  const pts = POINTS.filter(p => p.status !== 'beyond' && p.sims.some(s => s.split(':')[0] === k));
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/sims">Simulations</a> / ${S.title}</nav><div class="card simcard" id="sb"><h3>${S.title}</h3><p class="muted">${S.desc}</p></div>
  <p class="muted">Used in: ${pts.map(p => `<a href="#/${p.course}/point/${p.id}?tab=learn">${COURSES[p.course].short} ${p.code} ${esc(p.title)}</a>`).join(' · ')}</p>`);
  cleanup.push(S.mount($('#sb')));
}

/* ---------- LAB (shared) ---------- */
function viewLab(tool) {
  if (!tool || !LAB[tool]) {
    mount(`<nav class="crumbs"><a href="#/">Courses</a> / Lab</nav>
    <header class="phead slim"><div><h1>🧪 The Lab</h1><p>Open-ended tools to check your working, explore ideas and test conjectures. Everything accepts full expressions: <code>2sqrt(3)</code>, <code>arsinh(x)</code>, <code>e^(i pi/3)</code>.</p></div></header>
    <section class="grid sims">${Object.entries(LAB).map(([k, L]) => `<a class="card simtile" href="#/lab/${k}"><h3>${L.icon} ${L.title}</h3><p>${L.desc}</p></a>`).join('')}<a class="card simtile" href="#/calc"><h3>🧮 Scientific calculator</h3><p>Full-page calculator with SHIFT/HYP, degrees/radians, complex numbers and exact-value recognition.</p></a></section>`);
    return;
  }
  const L = LAB[tool];
  mount(`<nav class="crumbs"><a href="#/">Courses</a> / <a href="#/lab">Lab</a> / ${L.title}</nav>
  <div class="labtabs">${Object.entries(LAB).map(([k, x]) => `<a class="tab ${k === tool ? 'on' : ''}" href="#/lab/${k}">${x.icon} ${x.title}</a>`).join('')}</div>
  <div class="card"><h3>${L.icon} ${L.title}</h3><p class="muted">${L.desc}</p><div id="labroot"></div></div>`);
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
    <li>Open the pop-up calculator from any page with 🧮 or <b>Alt + C</b>.</li></ul>
    <p class="muted small">In the exam you'll use an approved calculator — practise with your own model too.</p></div></div>`);
  const c = mountCalc($('#cpage')); c.focus();
}

/* ---------- FORMULAE ---------- */
function viewFormulae() {
  const F = C.formulae();
  mount(`${crumbs('Formula book')}
  <header class="phead slim"><div><h1>∑ Formula book · ${C.short}</h1><p>Every key result in ${C.unit}. Click a formula's link to jump to the chapter that proves it.</p></div><input class="search" id="fsearch" placeholder="Search formulae…"></header>
  <div class="box notice">CCEA provides a <a href="${C.sources[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet in the exam. Check which of these are given there and <b>learn the rest by heart</b>.</div>
  <div id="flist">${F.map(sec => `<section class="card fsec" style="--tc:${sec.c}"><h2>${sec.t}</h2><div class="fgrid">${sec.f.filter(([, , , pid]) => !pid || (PT[pid] && PT[pid].status !== 'beyond')).map(([n, tex, note, pid]) => `<div class="fitem" data-s="${esc((sec.t + ' ' + n + ' ' + note + ' ' + tex).toLowerCase())}"><div class="fn">${esc(n)}${note ? ` <span class="muted small">· ${esc(note)}</span>` : ''}${pid && PT[pid] ? ` <a class="small" href="${cr('point/' + pid)}?tab=learn">${PT[pid].code} →</a>` : ''}</div><div class="ftex">$$${tex}$$</div></div>`).join('')}</div></section>`).join('')}</div>`);
  $('#fsearch').addEventListener('input', e => { const q = e.target.value.toLowerCase().trim(); app().querySelectorAll('.fitem').forEach(f => f.style.display = !q || f.dataset.s.includes(q) ? '' : 'none'); app().querySelectorAll('.fsec').forEach(s => s.style.display = [...s.querySelectorAll('.fitem')].some(f => f.style.display !== 'none') ? '' : 'none'); });
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
  pane.innerHTML = `<div class="box notice">BCSFM doesn't reproduce CCEA papers or reports (they're CCEA's copyright). Open them from the <a href="${cr('papers')}">Past papers</a> page, then save the questions and examiner comments for <b>${p.code}</b> here.</div>
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
  <header class="phead slim"><div><h1>📝 Past papers & examiner reports · ${C.short}</h1><p>Real CCEA papers, your scores, your bank of real questions by spec point, and examiner comments with their sources.</p></div>
  <div class="cta"><button class="btn" id="exp">⬇ Export backup</button><label class="btn ghost">⬆ Import<input type="file" id="imp" accept="application/json" hidden></label></div></header>
  <div class="box notice"><b>Why aren't the papers built in?</b> CCEA past papers and Chief Examiner's Reports are CCEA's copyright, so no question or quote here is invented. Use the official links, then add questions and quotes yourself. They're stored in this browser; use <b>Export backup</b> to keep a copy.</div>
  <div class="grid two">
    <section class="card"><h2>Official sources</h2><ul class="links">${C.official.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(l)} ↗</a></li>`).join('')}</ul>${C.known ? `<p class="muted small">${esc(C.known)}</p>` : ''}</section>
    <section class="card"><h2>Paper tracker</h2><table class="tbl ptrack"><tr><th>Paper</th><th>Score</th><th>/</th><th>Date</th><th></th></tr>
      ${papers.map(r => `<tr data-r="${r.id}"><td><input data-k="name" value="${esc(r.name)}"></td><td><input data-k="score" size="3" value="${esc(r.score)}"></td><td><input data-k="out" size="3" value="${esc(r.out)}"></td><td><input data-k="date" type="date" value="${esc(r.date)}"></td><td>${r.score && r.out ? `<b>${Math.round(100 * r.score / r.out)}%</b>` : ''}</td></tr>`).join('')}</table>
      <button class="btn small" id="addp">+ Add paper</button></section></div>
  <h2 class="sech">Examiner comments (${notes.length})</h2>${notes.length ? notes.map(nCard).join('') : '<p class="muted">Copy useful lines from the Chief Examiner\'s Reports and tag them to a spec point. They appear on that point\'s 📝 tab.</p>'}
  <h2 class="sech">Question bank (${bank.length}) · ${bank.filter(b => b.status === 'done').length} done · ${bank.filter(b => b.status === 'redo').length} to redo</h2>
  ${bank.length ? bank.map(qCard).join('') : '<p class="muted">Add questions from real papers below. Mark them Done or Redo to build a revision list.</p>'}
  ${qForm(C.points[0].id)}`);
  const root = app(); renderMath(root);
  root.querySelectorAll('.ptrack input').forEach(i => i.onchange = () => { const r = papers.find(x => x.id === i.closest('tr').dataset.r); r[i.dataset.k] = i.value; save(); viewPapers(); });
  $('#addp').onclick = () => { papers.push({ id: uid(), name: 'New paper', score: '', out: '', date: '', notes: '' }); save(); viewPapers(); };
  bindCards(root, viewPapers); bindForms(root, viewPapers);
  $('#exp').onclick = () => { const blob = new Blob([JSON.stringify(DB, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `bcsfm-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const d = JSON.parse(t); if (typeof d !== 'object' || !d.stats) throw 0; if (confirm('Replace all progress on this device with the backup?')) { DB = d; normDB(); save(); viewPapers(); } } catch { alert('That file is not a BCSFM backup.'); } }); };
}

/* ---------- PROGRESS ---------- */
function viewProgress() {
  const { a, c } = totals(C.points);
  mount(`${crumbs('Progress')}
  <header class="phead slim"><div><h1>📈 Progress · ${C.short}</h1><p>${a} answered · ${a ? Math.round(100 * c / a) : 0}% accuracy · best streak ${DB.best} · ${C.points.filter(p => isRead(p.id)).length} chapters read. Mastery = correct out of your last 10 attempts.</p></div>
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
  if (COURSES[r]) {
    C = COURSES[r]; DB.lastCourse = r; save(); renderNav(true);
    const v = parts[1];
    highlight(`${r}/${v || ''}`);
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
  renderNav(false); highlight(r || '');
  if (r === 'sims') return viewSims();
  if (r === 'sim') return viewSim(parts[1]);
  if (r === 'lab') return viewLab(parts[1]);
  if (r === 'calc') return viewCalc();
  viewChooser();
}
function highlight(key) { document.querySelectorAll('#nav a[data-r]').forEach(a => a.classList.toggle('on', a.dataset.r === key)); }
window.addEventListener('hashchange', route);

// theme
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
try { applyTheme(localStorage.getItem(STORE + '-theme')); } catch { }
function toggleTheme() {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark'; applyTheme(t); try { localStorage.setItem(STORE + '-theme', t); } catch { } route();
}

window.toggleCalc = setupCalcDrawer();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
window.addEventListener('load', () => renderMath(app()));
