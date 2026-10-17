// BCSFM app shell: routing, progress, views (home, spec, book, points, drill, lab, formulae, calculator, papers, progress).
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const app = () => $('#app');
const STORE = 'bcsfm-v1', OLD_STORE = 'phasespace-fm-a2-v1';
const TP = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const PT = Object.fromEntries(POINTS.map(p => [p.id, p]));
const A2 = TOPICS.filter(t => t.id !== 'xx'), XX = TOPICS.find(t => t.id === 'xx');

window.renderMath = el => {
  if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
};
const tidy = s => s.replace(/([+\-]) 1(?=[a-zA-Z\\])/g, '$1 ');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);

/* ---------- storage ---------- */
let DB;
try { DB = JSON.parse(localStorage.getItem(STORE)) || JSON.parse(localStorage.getItem(OLD_STORE)) || {}; } catch { DB = {}; }
function normDB() { DB.stats ||= {}; DB.days ||= {}; DB.best ||= 0; DB.streak ||= 0; DB.read ||= {}; DB.papers ||= null; DB.bank ||= []; DB.notes ||= []; DB.sprints ||= []; DB.conf ||= {}; }
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
const level = m => m >= 0.8 ? ['Secure', 'lv3'] : m >= 0.4 ? ['Developing', 'lv2'] : m > 0 ? ['Learning', 'lv1'] : ['New', 'lv0'];
const bar = (m, color) => `<div class="bar"><span style="width:${Math.round(m * 100)}%;${color ? `background:${color}` : ''}"></span></div>`;
const badge = p => `<span class="sbadge s-${p.status}" title="${esc(STATUS[p.status][1])}">${STATUS[p.status][0]}</span>`;
const isRead = id => !!DB.read[id];
function totals() { let a = 0, c = 0; for (const s of Object.values(DB.stats)) { a += s.a; c += s.c; } return { a, c }; }
function dayStreak() { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if (DB.days[k]) { n++; d.setDate(d.getDate() - 1); } else if (n === 0 && k === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1); } else break; } return n; }
const chapterOf = p => BOOK[p.id] || null;
const wordsOf = html => html ? html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length : 0;
const readMins = p => Math.max(3, Math.round(wordsOf(chapterOf(p) || p.notes) / 120));

/* ---------- mount ---------- */
let cleanup = [];
function mount(html) { cleanup.forEach(f => { try { f(); } catch { } }); cleanup = []; app().innerHTML = html; renderMath(app()); window.scrollTo(0, 0); }

/* ---------- HOME ---------- */
function viewHome() {
  const { a, c } = totals(), a2pts = A2.flatMap(t => t.points);
  const read = a2pts.filter(p => isRead(p.id)).length, secure = a2pts.filter(p => mastery(p.id) >= 0.8).length;
  const nextRead = a2pts.find(p => !isRead(p.id)), weakest = a2pts.filter(p => st(p.id).a > 0).sort((x, y) => mastery(x.id) - mastery(y.id))[0];
  const tiles = [['#/spec', '📋', 'Specification', 'Every A2 1 point, status and progress'], ['#/book', '📖', 'Textbook', `${a2pts.length} chapters with full proofs`], ['#/drill', '🎯', 'Smart drill', 'Endless questions, weakest first'],
    ['#/lab', '🧪', 'Lab', 'Grapher, complex, matrices, calculus, ODEs'], ['#/formulae', '∑', 'Formula book', 'Every result, searchable'], ['#/calc', '🧮', 'Calculator', 'Full scientific + complex'],
    ['#/papers', '📝', 'Past papers', 'Official links, tracker, your question bank'], ['#/sims', '🌀', 'Simulations', `${Object.keys(SIMS).length} interactive models`]];
  mount(`
  <section class="hero">
    <div>
      <p class="kicker">CCEA GCE Further Mathematics · Unit A2 1 Pure</p>
      <h1><span class="grad">BCSFM</span><br>The complete self-study guide.</h1>
      <p class="lead">Read the textbook (definitions → full proofs → worked examples) → see it in a simulation → drill it until it's secure → test yourself on real past papers. ${a2pts.length} A2 1 spec points, ${POINTS.reduce((s, p) => s + p.drills.length, 0)} question generators.</p>
      <div class="cta">${nextRead ? `<a class="btn primary" href="#/point/${nextRead.id}?tab=learn">📖 ${read ? 'Continue' : 'Start'} reading: ${nextRead.code} ${esc(nextRead.title)}</a>` : `<a class="btn primary" href="#/drill">🎯 Everything read — drill it</a>`}<a class="btn" href="#/sprint">⏱ 10-question sprint</a></div>
    </div>
    <div class="stats">
      <div class="stat"><b>${read}/${a2pts.length}</b><span>chapters read</span></div>
      <div class="stat"><b>${secure}/${a2pts.length}</b><span>points secure</span></div>
      <div class="stat"><b>${a}</b><span>questions · ${a ? Math.round(100 * c / a) : 0}%</span></div>
      <div class="stat"><b>${dayStreak()}</b><span>day streak</span></div>
      ${weakest ? `<a class="stat wide" href="#/point/${weakest.id}?tab=drill"><span>Weakest attempted</span><b class="small">${weakest.code} ${esc(weakest.title)}</b></a>` : ''}
    </div>
  </section>
  <section class="grid tiles">${tiles.map(([h, i, t, d]) => `<a class="card tile" href="${h}"><span class="ti">${i}</span><b>${t}</b><small>${d}</small></a>`).join('')}</section>
  <h2 class="sech">A2 1 topics</h2>
  <section class="grid topics">${A2.map(topicCard).join('')}</section>
  <h2 class="sech">Prerequisites & extension</h2>
  <section class="grid topics">${topicCard(XX)}</section>
  <div class="card roadmap"><h3>Suggested self-study order</h3><ol>
    <li><b>Proof by induction</b> (1) and <b>Algebra</b> (2) — partial fractions and series are used everywhere later.</li>
    <li><b>Complex numbers</b> (3) — needs Maclaurin series (2.3) for Euler's formula.</li>
    <li><b>Hyperbolic functions</b> (5) and <b>Further calculus</b> (6) — learn these together.</li>
    <li><b>Polar coordinates</b> (4) — uses integration techniques from 6.</li>
    <li><b>Differential equations</b> (7) — uses everything above, including complex numbers.</li>
    <li>For each point: Textbook → Simulate → Drill until <span class="pill lv3">Secure</span> → add real past-paper questions in <a href="#/papers">Papers</a>.</li></ol></div>`);
}
function topicCard(t) {
  const rd = t.points.filter(p => isRead(p.id)).length;
  return `<a class="card topic" href="#/topic/${t.id}" style="--tc:${t.color}"><div class="ticon">${t.icon}</div>
    <div class="tbody"><h3><span class="code">${t.code}</span> ${t.title}</h3><p>${t.blurb}</p>${bar(topicMastery(t), t.color)}<small>${t.points.length} points · ${rd} read · ${Math.round(topicMastery(t) * 100)}% mastered</small></div></a>`;
}

/* ---------- SPEC ---------- */
function viewSpec() {
  const row = p => { const m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="#/point/${p.id}?tab=learn">${esc(p.title)}</a> ${badge(p)}</td><td>${isRead(p.id) ? '✓' : '—'}</td><td><span class="pill ${cls}">${lv}</span></td>
    <td><select data-conf="${p.id}">${['', 'Not started', 'Shaky', 'OK', 'Confident'].map(o => `<option ${DB.conf[p.id] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></td></tr>`; };
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Specification</nav>
  <header class="phead slim"><div><h1>📋 A2 1 Pure Mathematics — specification map</h1><p>Every topic and learning outcome, linked to its chapter, simulation and drills. Rate your confidence as you go.</p></div></header>
  <div class="box notice"><b>About this map.</b> CCEA's specification PDF couldn't be read directly when BCSFM was built, so the outcomes below are <b>BCSFM's summary</b> of the A2 1 content, compiled from public descriptions (sources below), not CCEA's official wording or numbering. Badges: ${Object.entries(STATUS).map(([k, [l, d]]) => `<span class="sbadge s-${k}">${l}</span> ${d}`).join(' · ')}. <b>Always cross-check against the official specification.</b></div>
  <div class="box"><b>Assessment.</b> A2 1 (paper code <b>AFM11</b>) is a written examination; public CCEA addenda list it as 2 h 30 min (2 h 15 min in the adapted 2021–22 series). Check the current specification for the duration, weighting, and which formulae are given in the <a href="${SPEC_SOURCES[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet.</div>
  ${TOPICS.map(t => `<section class="card spect" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2>
    <ul class="outc">${t.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
    <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Read</th><th>Mastery</th><th>Confidence</th></tr>${t.points.map(row).join('')}</table></section>`).join('')}
  <div class="box"><b>Sources</b><ul>${SPEC_SOURCES.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`).join('')}</ul></div>`);
  app().querySelectorAll('[data-conf]').forEach(s => s.onchange = () => { DB.conf[s.dataset.conf] = s.value; save(); });
}

/* ---------- BOOK ---------- */
function viewBook() {
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Textbook</nav>
  <header class="phead slim"><div><h1>📖 The BCSFM textbook</h1><p>One chapter per spec point. Each one has the big picture, definitions, theorems with <b>full proofs and derivations</b>, worked examples, common mistakes, exam technique, check-yourself questions and an original exam-style question with a model solution.</p></div></header>
  ${TOPICS.map(t => `<section class="card booktoc" style="--tc:${t.color}"><h2><span class="code">${t.code}</span> ${t.title}</h2><ol>${t.points.map(p => `<li class="${isRead(p.id) ? 'done' : ''}"><a href="#/point/${p.id}?tab=learn"><span class="code">${p.code}</span> ${esc(p.title)}</a> ${badge(p)} <span class="muted small">· ${readMins(p)} min${isRead(p.id) ? ' · ✓ read' : ''}</span></li>`).join('')}</ol></section>`).join('')}`);
}

/* ---------- TOPIC ---------- */
function viewTopic(id) {
  const t = TP[id]; if (!t) return viewHome();
  mount(`<nav class="crumbs"><a href="#/">Home</a> / ${t.title}</nav>
  <header class="phead" style="--tc:${t.color}"><div class="ticon big">${t.icon}</div><div><h1><span class="code">${t.code}</span> ${t.title}</h1><p>${t.blurb}</p></div>
  <a class="btn primary" href="#/drill?topics=${t.id}">Drill whole topic</a></header>
  <ul class="outc card">${t.outcomes.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
  <section class="plist">${t.points.map(p => { const m = mastery(p.id), [lv, cls] = level(m), s = st(p.id); return `
    <div class="card point" style="--tc:${t.color}">
      <div class="pmain"><h3><span class="code">${p.code}</span> ${esc(p.title)} ${badge(p)}</h3>
      <div class="meta">${isRead(p.id) ? '✓ read · ' : ''}<span class="pill ${cls}">${lv}</span> ${s.a} attempted · ${s.a ? Math.round(100 * s.c / s.a) : 0}% correct · ${p.drills.length} generator${p.drills.length > 1 ? 's' : ''}</div>${bar(m, t.color)}</div>
      <div class="pact"><a class="btn small" href="#/point/${p.id}?tab=learn">📖 Read</a>${p.sims.length ? `<a class="btn small" href="#/point/${p.id}?tab=sim">Simulate</a>` : ''}<a class="btn small primary" href="#/point/${p.id}?tab=drill">Drill</a></div>
    </div>`; }).join('')}</section>`);
}

/* ---------- POINT ---------- */
function viewPoint(id, tab = 'learn') {
  const p = PT[id]; if (!p) return viewHome();
  const t = TP[p.topic], idx = POINTS.indexOf(p), prev = POINTS[idx - 1], next = POINTS[idx + 1];
  const nPP = DB.bank.filter(b => b.pid === id).length + DB.notes.filter(b => b.pid === id).length;
  const tabs = [['learn', '📖 Textbook'], ['summary', '⚡ Summary'], ...(p.sims.length ? [['sim', '🧪 Simulate']] : []), ['drill', '🎯 Drill'], ['papers', `📝 Past papers${nPP ? ` (${nPP})` : ''}`]];
  if (!tabs.find(x => x[0] === tab)) tab = 'learn';
  mount(`<nav class="crumbs"><a href="#/">Home</a> / <a href="#/topic/${t.id}">${t.title}</a> / ${p.code}</nav>
  <header class="phead slim" style="--tc:${t.color}"><div><h1><span class="code">${p.code}</span> ${esc(p.title)}</h1><p>${badge(p)} ${isRead(p.id) ? '<span class="muted small">✓ read</span>' : ''}</p></div>
  <div class="mast">${bar(mastery(p.id), t.color)}<small>${level(mastery(p.id))[0]} · ${Math.round(mastery(p.id) * 100)}%</small></div></header>
  <div class="tabs">${tabs.map(([k, l]) => `<a class="tab ${k === tab ? 'on' : ''}" href="#/point/${p.id}?tab=${k}">${l}</a>`).join('')}</div>
  <section id="pane"></section>
  <nav class="pn">${prev ? `<a class="btn ghost" href="#/point/${prev.id}?tab=${tab}">← ${prev.code} ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/point/${next.id}?tab=${tab}">${next.code} ${esc(next.title)} →</a>` : ''}</nav>`);
  const pane = $('#pane');
  if (tab === 'learn') {
    const ch = chapterOf(p);
    pane.innerHTML = `<article class="card book">${ch ? '' : `<div class="box notice">This is a ${p.status === 'beyond' ? 'prerequisite / extension' : ''} topic outside the A2 1 core, so it has a condensed chapter.</div>`}
      <div class="ctoc"></div><div class="bookc">${ch || p.notes}</div>
      <div class="bookend"><button class="btn ${isRead(p.id) ? '' : 'primary'}" id="markread">${isRead(p.id) ? '✓ Marked as read' : 'Mark chapter as read'}</button>
      ${p.sims.length ? `<a class="btn" href="#/point/${p.id}?tab=sim">🧪 See it in the simulation</a>` : ''}<a class="btn" href="#/point/${p.id}?tab=drill">🎯 Drill it</a><button class="btn ghost" onclick="window.print()">🖨 Print</button></div></article>`;
    const toc = pane.querySelector('.ctoc'), hs = [...pane.querySelectorAll('.bookc h3')];
    if (hs.length > 2) toc.innerHTML = `<b>In this chapter:</b> ` + hs.map((h, i) => { h.id = 'sec' + i; return `<a href="javascript:void 0" data-sec="sec${i}">${esc(h.textContent)}</a>`; }).join('');
    toc.addEventListener('click', e => { const s = e.target.dataset.sec; if (s) document.getElementById(s).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    renderMath(pane);
    $('#markread').onclick = () => { if (isRead(p.id)) delete DB.read[p.id]; else DB.read[p.id] = Date.now(); save(); viewPoint(id, 'learn'); };
  } else if (tab === 'summary') {
    pane.innerHTML = `<article class="notes card">${p.notes}</article><p class="muted center">The one-page summary. For full explanations and proofs use the 📖 Textbook tab.</p>`;
    renderMath(pane);
  } else if (tab === 'sim') {
    p.sims.forEach(sid => { const [k, opt] = sid.split(':'), S = SIMS[k]; const box = document.createElement('div'); box.className = 'card simcard'; box.innerHTML = `<h3>${S.title}</h3><p class="muted">${S.desc}</p>`; pane.append(box); cleanup.push(S.mount(box, opt)); });
  } else if (tab === 'papers') {
    papersForPoint(pane, p);
  } else {
    drillPanel(pane, { pool: [p.id] });
  }
}

/* ---------- DRILL & SPRINT ---------- */
function viewDrill(qs) {
  const def = A2.map(t => t.id).join(',');
  const sel = new Set((qs.get('topics') || def).split(',').filter(id => TP[id]));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Smart drill</nav>
  <header class="phead slim"><div><h1>🎯 Smart drill</h1><p>Questions weighted toward spec points you haven't secured. Endless. Press Enter to check and continue.</p></div></header>
  <div class="filters">${TOPICS.map(t => `<label class="fchip" style="--tc:${t.color}"><input type="checkbox" value="${t.id}" ${sel.has(t.id) ? 'checked' : ''}> ${t.title}</label>`).join('')}</div>
  <section id="pane"></section>`);
  document.querySelectorAll('.filters input').forEach(c => c.addEventListener('change', () => { const on = [...document.querySelectorAll('.filters input:checked')].map(x => x.value); location.hash = '#/drill?topics=' + (on.join(',') || A2[0].id); }));
  drillPanel($('#pane'), { pool: POINTS.filter(p => sel.has(p.topic)).map(p => p.id) });
}
function viewSprint() {
  const N = 10;
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Sprint</nav>
  <header class="phead slim"><div><h1>⏱ 10-question sprint</h1><p>Mixed across A2 1. First answer counts. Beat your time.</p></div><div class="timer" id="timer">0:00</div></header>
  <section id="pane"></section>`);
  const t0 = performance.now(), tm = $('#timer'), iv = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); tm.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 250);
  cleanup.push(() => clearInterval(iv));
  drillPanel($('#pane'), {
    pool: A2.flatMap(t => t.points).map(p => p.id), sprint: N, onDone: log => {
      clearInterval(iv); const secs = (performance.now() - t0) / 1000, score = log.filter(l => l.ok).length;
      DB.sprints.push({ d: Date.now(), score, secs }); save();
      const best = DB.sprints.reduce((b, s) => (s.score > b.score || (s.score === b.score && s.secs < b.secs)) ? s : b, DB.sprints[0]);
      $('#pane').innerHTML = `<div class="card result"><h2>${score}/${N}</h2><p>${Math.floor(secs / 60)}m ${Math.round(secs % 60)}s · best ${best.score}/${N} in ${Math.round(best.secs)}s</p>
      <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Result</th><th>Time</th></tr>${log.map((l, i) => `<tr><td>${i + 1}</td><td><a href="#/point/${l.pid}?tab=learn">${PT[l.pid].code} ${esc(PT[l.pid].title)}</a></td><td class="${l.ok ? 'ok' : 'bad'}">${l.ok ? '✓' : '✗'}</td><td>${l.t.toFixed(0)}s</td></tr>`).join('')}</table>
      <div class="cta center"><a class="btn primary" href="#/sprint?r=${Date.now()}">Go again</a><a class="btn" href="#/drill">Smart drill</a></div></div>`;
    },
  });
}

/* ---------- SIMS ---------- */
function viewSims() {
  const used = {}; POINTS.forEach(p => p.sims.forEach(s => { const k = s.split(':')[0]; (used[k] ||= []).push(p); }));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Simulations</nav>
  <header class="phead slim"><div><h1>🌀 Simulations</h1><p>${Object.keys(SIMS).length} interactive models, each linked to the spec points it supports. For free-form exploration use the <a href="#/lab">Lab</a>.</p></div></header>
  <section class="grid sims">${Object.entries(SIMS).map(([k, S]) => `<a class="card simtile" href="#/sim/${k}"><h3>${S.title}</h3><p>${S.desc}</p><small>${[...new Set((used[k] || []).map(p => p.code))].join(' · ')}</small></a>`).join('')}</section>`);
}
function viewSim(k) {
  const S = SIMS[k]; if (!S) return viewSims();
  const pts = POINTS.filter(p => p.sims.some(s => s.split(':')[0] === k));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / <a href="#/sims">Simulations</a> / ${S.title}</nav><div class="card simcard" id="sb"><h3>${S.title}</h3><p class="muted">${S.desc}</p></div>
  <p class="muted">Used in: ${pts.map(p => `<a href="#/point/${p.id}?tab=learn">${p.code} ${esc(p.title)}</a>`).join(' · ')}</p>`);
  cleanup.push(S.mount($('#sb')));
}

/* ---------- LAB ---------- */
function viewLab(tool) {
  if (!tool || !LAB[tool]) {
    mount(`<nav class="crumbs"><a href="#/">Home</a> / Lab</nav>
    <header class="phead slim"><div><h1>🧪 The Lab</h1><p>Open-ended tools to check your working, explore ideas and test conjectures. Everything here accepts full expressions: <code>2sqrt(3)</code>, <code>arsinh(x)</code>, <code>e^(i pi/3)</code>.</p></div></header>
    <section class="grid sims">${Object.entries(LAB).map(([k, L]) => `<a class="card simtile" href="#/lab/${k}"><h3>${L.icon} ${L.title}</h3><p>${L.desc}</p></a>`).join('')}<a class="card simtile" href="#/calc"><h3>🧮 Scientific calculator</h3><p>Full-page calculator with SHIFT/HYP, degrees/radians, complex numbers and exact-value recognition.</p></a></section>`);
    return;
  }
  const L = LAB[tool];
  mount(`<nav class="crumbs"><a href="#/">Home</a> / <a href="#/lab">Lab</a> / ${L.title}</nav>
  <div class="labtabs">${Object.entries(LAB).map(([k, x]) => `<a class="tab ${k === tool ? 'on' : ''}" href="#/lab/${k}">${x.icon} ${x.title}</a>`).join('')}</div>
  <div class="card"><h3>${L.icon} ${L.title}</h3><p class="muted">${L.desc}</p><div id="labroot"></div></div>`);
  cleanup.push(L.mount($('#labroot')));
}

/* ---------- CALCULATOR ---------- */
function viewCalc() {
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Calculator</nav>
  <div class="calcpage"><div class="card" id="cpage"></div>
  <div class="card calchelp"><h3>How to use it</h3><ul>
    <li>Type directly or tap keys. <b>Enter</b> evaluates, <b>↑/↓</b> recall history, <b>Esc</b> clears. Click a history line to reuse it.</li>
    <li><b>SHIFT</b> gives inverses (arcsin, eˣ, 10ˣ, ∛, x³, nPr). <b>HYP</b> gives sinh/cosh/tanh; SHIFT+HYP gives arsinh/arcosh/artanh.</li>
    <li><b>DRG</b> toggles degrees/radians (affects trig only; hyperbolic functions don't use angles).</li>
    <li>Use <code>i</code> anywhere and it switches to complex mode: <code>(1+i)^8</code>, <code>e^(i pi)</code>, <code>sqrt(-4)</code>, <code>arg(1+i)</code>.</li>
    <li>It recognises exact values: fractions, surds, multiples of π, logs — e.g. <code>sin(pi/3)</code> shows <b>= √3/2</b>.</li>
    <li>Functions: sin cos tan sec cosec cot, arcsin…, sinh…, arsinh…, ln, log(x) or log(x, base), exp, sqrt, cbrt, root(x, n), abs, nCr(n, r), nPr, x!, floor, ceil, re, im, arg, conj, gamma.</li>
    <li>Open the pop-up calculator from any page with the 🧮 button or <b>Alt + C</b>.</li></ul>
    <p class="muted small">Exam note: in the exam you'll use an approved calculator — practise with your own model too.</p></div></div>`);
  const c = mountCalc($('#cpage')); c.focus();
}

/* ---------- FORMULAE ---------- */
function viewFormulae() {
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Formula book</nav>
  <header class="phead slim"><div><h1>∑ Formula book</h1><p>Every key result in A2 1. Click a formula's link to jump to the chapter that proves it.</p></div><input class="search" id="fsearch" placeholder="Search formulae… (e.g. arsinh, area, De Moivre)"></header>
  <div class="box notice">CCEA provides a <a href="${SPEC_SOURCES[2].url}" target="_blank" rel="noopener">Mathematical Formulae and Tables</a> booklet in the exam. Check which of these are given there and <b>learn the rest by heart</b> — anything derived in the textbook you should be able to reproduce.</div>
  <div id="flist">${FORMULAE.map(sec => `<section class="card fsec" style="--tc:${sec.c}"><h2>${sec.t}</h2><div class="fgrid">${sec.f.map(([n, tex, note, pid]) => `<div class="fitem" data-s="${esc((sec.t + ' ' + n + ' ' + note + ' ' + tex).toLowerCase())}"><div class="fn">${esc(n)}${note ? ` <span class="muted small">· ${esc(note)}</span>` : ''}${pid && PT[pid] ? ` <a class="small" href="#/point/${pid}?tab=learn">${PT[pid].code} →</a>` : ''}</div><div class="ftex">$$${tex}$$</div></div>`).join('')}</div></section>`).join('')}</div>`);
  $('#fsearch').addEventListener('input', e => { const q = e.target.value.toLowerCase().trim(); app().querySelectorAll('.fitem').forEach(f => f.style.display = !q || f.dataset.s.includes(q) ? '' : 'none'); app().querySelectorAll('.fsec').forEach(s => s.style.display = [...s.querySelectorAll('.fitem')].some(f => f.style.display !== 'none') ? '' : 'none'); });
}

/* ---------- PAST PAPERS ---------- */
const OFFICIAL = [
  ['CCEA GCE Further Mathematics (2018) — subject page (past papers, mark schemes, reports, support)', 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018'],
  ['CCEA — GCE past papers & mark schemes index', 'https://ccea.org.uk/post-16/gce/past-papers-mark-schemes'],
  ['CCEA — Further Mathematics support materials', 'https://ccea.org.uk/post-16/gce/subjects/gce-further-mathematics-2018/support'],
  ["Chief Examiner's Report — Summer 2025 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2025/GCE%20Further%20Mathematics%20%282018%29-Summer2025-Report_0.pdf'],
  ["Chief Examiner's Report — Summer 2024 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2024/GCE%20Further%20Mathematics%20%282018%29-Summer2024-Report_0.pdf'],
  ["Chief Examiner's Report — Summer 2022 (PDF)", 'https://ccea.org.uk/downloads/docs/ExamMod-Reports/GCE/GCE%20Further%20Mathematics%20%282018%29/2022/GCE%20Further%20Mathematics%20%282018%29-Summer2022-Report_0.pdf'],
  ['A2 1 Pure Mathematics question paper — Summer 2023 (PDF)', 'https://www.ccea.org.uk/downloads/docs/Past-Papers/cleared/GCE/GCE%20Further%20Mathematics%20(2018)/2023-Summer/Standard/0/GCE-Further%20Mathematics-506-Summer2023-A2%201,%20Pure%20Mathematics-Paper.pdf'],
  ['A2 1 Pure Mathematics mark scheme — Summer 2021 (PDF)', 'https://ccea.org.uk/downloads/docs/Past-Papers/cleared/GCE/GCE%20Further%20Mathematics%20(2018)/2021-Summer/Standard/0/GCE-Further%20Mathematics-506-Summer2021-A2%201,%20Pure%20Mathematics-MS.pdf'],
  ['Mathematical Formulae and Tables booklet (PDF)', SPEC_SOURCES[2].url],
  ['GCE Further Mathematics Elaboration Document (PDF)', SPEC_SOURCES[3].url],
  ['Maths Genie — CCEA Further Maths past papers (third-party index)', 'https://www.mathsgenie.co.uk/a-level/further-maths/ccea'],
];
const DEFAULT_PAPERS = ['Summer 2025 · AFM11', 'Summer 2024 · AFM11', 'Summer 2023 · AFM11', 'Summer 2022 · AFM11', 'Summer 2021 · A2 1', 'Specimen (SAM) · A2 1'];
const pointOptions = sel => POINTS.map(p => `<option value="${p.id}" ${p.id === sel ? 'selected' : ''}>${p.code} ${esc(p.title)}</option>`).join('');
function qForm(pid) {
  return `<form class="pform card" id="qform"><h3>➕ Add a real past-paper question</h3>
    <div class="lab-row"><label class="lf"><span>Spec point</span><select name="pid">${pointOptions(pid)}</select></label><label class="lf"><span>Source (paper, year, question)</span><input name="src" placeholder="e.g. CCEA AFM11 Summer 2023 Q7(a)" required></label><label class="lf"><span>Marks</span><input name="mk" size="3"></label></div>
    <label class="lf"><span>Question (type it, use $...$ for maths, e.g. $r=2+\\cos\\theta$)</span><textarea name="q" rows="3" required></textarea></label>
    <label class="lf"><span>Your solution / mark-scheme notes (optional)</span><textarea name="sol" rows="3"></textarea></label>
    <button class="btn primary">Save question</button></form>
  <form class="pform card" id="nform"><h3>➕ Add an examiner's comment</h3>
    <div class="lab-row"><label class="lf"><span>Spec point</span><select name="pid">${pointOptions(pid)}</select></label><label class="lf"><span>Source (report, year, page)</span><input name="src" placeholder="e.g. Chief Examiner's Report Summer 2024, A2 1, p.3" required></label></div>
    <label class="lf"><span>Quote (copy it exactly)</span><textarea name="quote" rows="2" required></textarea></label><button class="btn primary">Save quote</button></form>`;
}
function bindForms(root, after) {
  const qf = root.querySelector('#qform'), nf = root.querySelector('#nform');
  qf.onsubmit = e => { e.preventDefault(); const f = new FormData(qf); DB.bank.push({ id: uid(), pid: f.get('pid'), src: f.get('src'), mk: f.get('mk'), q: f.get('q'), sol: f.get('sol'), status: 'todo', t: Date.now() }); save(); after(); };
  nf.onsubmit = e => { e.preventDefault(); const f = new FormData(nf); DB.notes.push({ id: uid(), pid: f.get('pid'), src: f.get('src'), quote: f.get('quote'), t: Date.now() }); save(); after(); };
}
const qCard = b => `<div class="card qcard s-${b.status}"><div class="qh"><b>${esc(b.src)}</b>${b.mk ? ` <span class="pill lv0">${esc(b.mk)} marks</span>` : ''} <a href="#/point/${b.pid}?tab=learn" class="small">${PT[b.pid] ? PT[b.pid].code : ''}</a>
  <select data-status="${b.id}">${[['todo', 'To do'], ['done', 'Done ✓'], ['redo', 'Redo ↻']].map(([v, l]) => `<option value="${v}" ${b.status === v ? 'selected' : ''}>${l}</option>`).join('')}</select><button class="gx" data-delq="${b.id}" title="Delete">✕</button></div>
  <div class="qq">${esc(b.q).replace(/\n/g, '<br>')}</div>${b.sol ? `<details><summary>Solution notes</summary><div>${esc(b.sol).replace(/\n/g, '<br>')}</div></details>` : ''}</div>`;
const nCard = n => `<blockquote class="quote">“${esc(n.quote)}”<footer>— ${esc(n.src)} · <a href="#/point/${n.pid}?tab=learn">${PT[n.pid] ? PT[n.pid].code + ' ' + esc(PT[n.pid].title) : ''}</a> <button class="gx" data-deln="${n.id}" title="Delete">✕</button></footer></blockquote>`;
function bindCards(root, after) {
  root.querySelectorAll('[data-status]').forEach(s => s.onchange = () => { const b = DB.bank.find(x => x.id === s.dataset.status); if (b) { b.status = s.value; save(); after(); } });
  root.querySelectorAll('[data-delq]').forEach(x => x.onclick = () => { if (confirm('Delete this question?')) { DB.bank = DB.bank.filter(b => b.id !== x.dataset.delq); save(); after(); } });
  root.querySelectorAll('[data-deln]').forEach(x => x.onclick = () => { if (confirm('Delete this quote?')) { DB.notes = DB.notes.filter(b => b.id !== x.dataset.deln); save(); after(); } });
}
function papersForPoint(pane, p) {
  const qs = DB.bank.filter(b => b.pid === p.id), ns = DB.notes.filter(n => n.pid === p.id);
  pane.innerHTML = `<div class="box notice">BCSFM doesn't reproduce CCEA papers or reports (they're CCEA's copyright, and they couldn't be fetched when this site was built). Open them from the <a href="#/papers">Past papers</a> page, then save the questions and examiner comments for <b>${p.code}</b> here — they'll show up on this tab and in your question bank.</div>
    <h3>Examiner comments on ${p.code}</h3>${ns.length ? ns.map(nCard).join('') : '<p class="muted">None saved yet.</p>'}
    <h3>Your past-paper questions on ${p.code}</h3>${qs.length ? qs.map(qCard).join('') : '<p class="muted">None saved yet.</p>'}
    <p class="muted">Need practice now? Every chapter in the 📖 Textbook ends with an original exam-style question with a model solution.</p>${qForm(p.id)}`;
  renderMath(pane); bindCards(pane, () => papersForPoint(pane, p)); bindForms(pane, () => papersForPoint(pane, p));
}
function viewPapers() {
  if (!DB.papers) { DB.papers = DEFAULT_PAPERS.map(n => ({ id: uid(), name: n, score: '', out: '', date: '', notes: '' })); save(); }
  const bank = DB.bank.slice().sort((a, b) => (PT[a.pid] ? POINTS.indexOf(PT[a.pid]) : 0) - (PT[b.pid] ? POINTS.indexOf(PT[b.pid]) : 0));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Past papers</nav>
  <header class="phead slim"><div><h1>📝 Past papers & examiner reports</h1><p>Real CCEA papers, your scores, your bank of real questions sorted by spec point, and examiner comments with their sources.</p></div>
  <div class="cta"><button class="btn" id="exp">⬇ Export backup</button><label class="btn ghost">⬆ Import<input type="file" id="imp" accept="application/json" hidden></label></div></header>
  <div class="box notice"><b>Why aren't the papers built in?</b> CCEA past papers and Chief Examiner's Reports are CCEA's copyright, and CCEA's site couldn't be reached when BCSFM was built — so no question or quote here is invented. Use the official links below, then add questions and quotes yourself. They're stored in this browser; use <b>Export backup</b> to keep a copy.</div>
  <div class="grid two">
    <section class="card"><h2>Official sources</h2><ul class="links">${OFFICIAL.map(([l, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${esc(l)} ↗</a></li>`).join('')}</ul>
      <p class="muted small">What's publicly known: the Summer 2023 A2 1 paper (AFM11) includes proof by induction for a sequence (Q1), a polar curve (Q7) and hyperbolic functions (Q9), according to search-engine summaries of the paper.</p></section>
    <section class="card"><h2>Paper tracker</h2><table class="tbl ptrack"><tr><th>Paper</th><th>Score</th><th>/</th><th>Date</th><th></th></tr>
      ${DB.papers.map(r => `<tr data-r="${r.id}"><td><input data-k="name" value="${esc(r.name)}"></td><td><input data-k="score" size="3" value="${esc(r.score)}"></td><td><input data-k="out" size="3" value="${esc(r.out)}"></td><td><input data-k="date" type="date" value="${esc(r.date)}"></td><td>${r.score && r.out ? `<b>${Math.round(100 * r.score / r.out)}%</b>` : ''}</td></tr>`).join('')}</table>
      <button class="btn small" id="addp">+ Add paper</button></section></div>
  <h2 class="sech">Examiner comments (${DB.notes.length})</h2>${DB.notes.length ? DB.notes.map(nCard).join('') : '<p class="muted">Copy useful lines from the Chief Examiner\'s Reports — e.g. what candidates commonly got wrong — and tag them to a spec point. They appear on that point\'s 📝 tab.</p>'}
  <h2 class="sech">Question bank (${DB.bank.length}) · ${DB.bank.filter(b => b.status === 'done').length} done · ${DB.bank.filter(b => b.status === 'redo').length} to redo</h2>
  ${bank.length ? bank.map(qCard).join('') : '<p class="muted">Add questions from real papers below. Mark them Done or Redo to build a revision list.</p>'}
  ${qForm(POINTS[0].id)}`);
  const root = app(); renderMath(root);
  root.querySelectorAll('.ptrack input').forEach(i => i.onchange = () => { const r = DB.papers.find(x => x.id === i.closest('tr').dataset.r); r[i.dataset.k] = i.value; save(); viewPapers(); });
  $('#addp').onclick = () => { DB.papers.push({ id: uid(), name: 'New paper', score: '', out: '', date: '', notes: '' }); save(); viewPapers(); };
  bindCards(root, viewPapers); bindForms(root, viewPapers);
  $('#exp').onclick = () => { const blob = new Blob([JSON.stringify(DB, null, 1)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `bcsfm-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); };
  $('#imp').onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { const d = JSON.parse(t); if (typeof d !== 'object' || !d.stats) throw 0; if (confirm('Replace all progress on this device with the backup?')) { DB = d; normDB(); save(); viewPapers(); } } catch { alert('That file is not a BCSFM backup.'); } }); };
}

/* ---------- PROGRESS ---------- */
function viewProgress() {
  const { a, c } = totals();
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Progress</nav>
  <header class="phead slim"><div><h1>📈 Progress by spec point</h1><p>${a} answered · ${a ? Math.round(100 * c / a) : 0}% accuracy · best streak ${DB.best} · ${Object.keys(DB.read).length} chapters read. Mastery = correct out of your last 10 attempts.</p></div>
  <button class="btn ghost" id="reset">Reset progress</button></header>
  <table class="tbl prog"><tr><th>Spec</th><th>Point</th><th>Read</th><th>Attempts</th><th>Accuracy</th><th>Mastery</th><th></th></tr>
  ${POINTS.map(p => { const s = st(p.id), m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="#/point/${p.id}?tab=learn">${esc(p.title)}</a> ${badge(p)}</td><td>${isRead(p.id) ? '✓' : ''}</td><td>${s.a}</td><td>${s.a ? Math.round(100 * s.c / s.a) + '%' : '—'}</td><td><span class="pill ${cls}">${lv}</span>${bar(m, TP[p.topic].color)}</td><td><a class="btn small" href="#/point/${p.id}?tab=drill">Drill</a></td></tr>`; }).join('')}</table>`);
  $('#reset').onclick = () => { if (confirm('Reset drill progress and reading status on this device? (Your question bank is kept.)')) { DB.stats = {}; DB.days = {}; DB.best = 0; DB.streak = 0; DB.read = {}; save(); viewProgress(); } };
}

/* ---------- router ---------- */
function route() {
  const [path, query] = (location.hash.slice(1) || '/').split('?'), qs = new URLSearchParams(query || ''), parts = path.split('/').filter(Boolean);
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#/' + (parts[0] || '')));
  const r = parts[0]; document.body.dataset.route = r || 'home';
  if (!r) return viewHome();
  if (r === 'topic') return viewTopic(parts[1]);
  if (r === 'point') return viewPoint(parts[1], qs.get('tab') || 'learn');
  if (r === 'spec') return viewSpec();
  if (r === 'book') return viewBook();
  if (r === 'drill') return viewDrill(qs);
  if (r === 'sprint') return viewSprint();
  if (r === 'sims') return viewSims();
  if (r === 'sim') return viewSim(parts[1]);
  if (r === 'lab') return viewLab(parts[1]);
  if (r === 'calc') return viewCalc();
  if (r === 'formulae') return viewFormulae();
  if (r === 'papers') return viewPapers();
  if (r === 'progress') return viewProgress();
  viewHome();
}
window.addEventListener('hashchange', route);

// theme
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
try { applyTheme(localStorage.getItem(STORE + '-theme')); } catch { }
$('#theme').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark'; applyTheme(t); try { localStorage.setItem(STORE + '-theme', t); } catch { } route();
});

window.toggleCalc = setupCalcDrawer();
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
window.addEventListener('load', () => renderMath(app()));
