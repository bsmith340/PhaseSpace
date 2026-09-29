// App shell: routing, progress, drill engine.
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const app = () => $('#app');
const STORE = 'phasespace-fm-a2-v1';
const TP = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const PT = Object.fromEntries(POINTS.map(p => [p.id, p]));

window.renderMath = el => {
  if (window.renderMathInElement) renderMathInElement(el, { delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }], throwOnError: false });
};
const tidy = s => s.replace(/([+\-]) 1(?=[a-zA-Z\\])/g, '$1 ');

/* ---------- progress ---------- */
let DB;
try { DB = JSON.parse(localStorage.getItem(STORE)) || {}; } catch { DB = {}; }
DB.stats ||= {}; DB.days ||= {}; DB.best ||= 0; DB.streak ||= 0;
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
function totals() { let a = 0, c = 0; for (const s of Object.values(DB.stats)) { a += s.a; c += s.c; } return { a, c }; }
function dayStreak() { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if (DB.days[k]) { n++; d.setDate(d.getDate() - 1); } else if (n === 0 && k === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1); } else break; } return n; }

/* ---------- views ---------- */
let cleanup = [];
function mount(html) { cleanup.forEach(f => { try { f(); } catch { } }); cleanup = []; app().innerHTML = html; renderMath(app()); window.scrollTo(0, 0); }
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function viewHome() {
  const { a, c } = totals(), weakest = POINTS.filter(p => st(p.id).a > 0).sort((x, y) => mastery(x.id) - mastery(y.id))[0];
  const secure = POINTS.filter(p => mastery(p.id) >= 0.8).length;
  mount(`
  <section class="hero">
    <div>
      <p class="kicker">CCEA A2 Further Mathematics · Unit A2 1 Pure</p>
      <h1>Every spec point. <span class="grad">Simulated. Drilled.</span></h1>
      <p class="lead">${POINTS.length} spec points · ${POINTS.reduce((s, p) => s + p.drills.length, 0)} question generators (endless, randomised) · ${Object.keys(SIMS).length} interactive simulations. Learn it → see it → drill it until it's secure.</p>
      <div class="cta"><a class="btn primary" href="#/drill">⚡ Smart drill (weakest first)</a><a class="btn" href="#/sprint">⏱ 10-question sprint</a><a class="btn ghost" href="#/sims">Simulations</a></div>
    </div>
    <div class="stats">
      <div class="stat"><b>${a}</b><span>questions</span></div>
      <div class="stat"><b>${a ? Math.round(100 * c / a) : 0}%</b><span>accuracy</span></div>
      <div class="stat"><b>${secure}/${POINTS.length}</b><span>points secure</span></div>
      <div class="stat"><b>${dayStreak()}</b><span>day streak</span></div>
      ${weakest ? `<a class="stat wide" href="#/point/${weakest.id}?tab=drill"><span>Weakest attempted</span><b class="small">${weakest.code} ${weakest.title}</b></a>` : ''}
    </div>
  </section>
  <section class="grid topics">
    ${TOPICS.map(t => `<a class="card topic" href="#/topic/${t.id}" style="--tc:${t.color}">
      <div class="ticon">${t.icon}</div>
      <div class="tbody"><h3><span class="code">${t.code}</span> ${t.title}</h3><p>${t.blurb}</p>
      ${bar(topicMastery(t), t.color)}<small>${t.points.length} spec points · ${Math.round(topicMastery(t) * 100)}% mastered</small></div></a>`).join('')}
  </section>`);
}

function viewTopic(id) {
  const t = TP[id]; if (!t) return viewHome();
  mount(`<nav class="crumbs"><a href="#/">Home</a> / ${t.title}</nav>
  <header class="phead" style="--tc:${t.color}"><div class="ticon big">${t.icon}</div><div><h1><span class="code">${t.code}</span> ${t.title}</h1><p>${t.blurb}</p></div>
  <a class="btn primary" href="#/drill?topics=${t.id}">Drill whole topic</a></header>
  <section class="plist">${t.points.map(p => { const m = mastery(p.id), [lv, cls] = level(m), s = st(p.id); return `
    <div class="card point" style="--tc:${t.color}">
      <div class="pmain"><h3><span class="code">${p.code}</span> ${p.title}</h3>
      <div class="meta"><span class="pill ${cls}">${lv}</span> ${s.a} attempted · ${s.a ? Math.round(100 * s.c / s.a) : 0}% correct · ${p.drills.length} generator${p.drills.length > 1 ? 's' : ''}${p.sims.length ? ' · sim' : ''}</div>${bar(m, t.color)}</div>
      <div class="pact"><a class="btn small" href="#/point/${p.id}?tab=learn">Learn</a>${p.sims.length ? `<a class="btn small" href="#/point/${p.id}?tab=sim">Simulate</a>` : ''}<a class="btn small primary" href="#/point/${p.id}?tab=drill">Drill</a></div>
    </div>`; }).join('')}</section>`);
}

function viewPoint(id, tab = 'learn') {
  const p = PT[id]; if (!p) return viewHome();
  const t = TP[p.topic], idx = POINTS.indexOf(p), prev = POINTS[idx - 1], next = POINTS[idx + 1];
  const tabs = [['learn', '📘 Learn'], ...(p.sims.length ? [['sim', '🧪 Simulate']] : []), ['drill', '🎯 Drill']];
  if (!tabs.find(x => x[0] === tab)) tab = 'learn';
  mount(`<nav class="crumbs"><a href="#/">Home</a> / <a href="#/topic/${t.id}">${t.title}</a> / ${p.code}</nav>
  <header class="phead slim" style="--tc:${t.color}"><div><h1><span class="code">${p.code}</span> ${p.title}</h1></div>
  <div class="mast">${bar(mastery(p.id), t.color)}<small>${level(mastery(p.id))[0]} · ${Math.round(mastery(p.id) * 100)}%</small></div></header>
  <div class="tabs">${tabs.map(([k, l]) => `<a class="tab ${k === tab ? 'on' : ''}" href="#/point/${p.id}?tab=${k}">${l}</a>`).join('')}</div>
  <section id="pane"></section>
  <nav class="pn">${prev ? `<a class="btn ghost" href="#/point/${prev.id}?tab=${tab}">← ${prev.code} ${prev.title}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/point/${next.id}?tab=${tab}">${next.code} ${next.title} →</a>` : ''}</nav>`);
  const pane = $('#pane');
  if (tab === 'learn') {
    pane.innerHTML = `<article class="notes card">${p.notes}</article><div class="cta center">${p.sims.length ? `<a class="btn" href="#/point/${p.id}?tab=sim">See it in the simulation →</a>` : ''}<a class="btn primary" href="#/point/${p.id}?tab=drill">Drill it →</a></div>`;
    renderMath(pane);
  } else if (tab === 'sim') {
    p.sims.forEach(sid => { const [k, opt] = sid.split(':'), S = SIMS[k]; const box = document.createElement('div'); box.className = 'card simcard'; box.innerHTML = `<h3>${S.title}</h3><p class="muted">${S.desc}</p>`; pane.append(box); cleanup.push(S.mount(box, opt)); });
  } else {
    drillPanel(pane, { pool: [p.id] });
  }
}

/* ---------- drill engine ---------- */
function weightedPick(pool, last) {
  const ws = pool.map(id => { const s = st(id); return (id === last && pool.length > 1 ? 0.2 : 1) * (1 + 3 * (1 - mastery(id)) + (s.a === 0 ? 2 : 0)); });
  let r = Math.random() * ws.reduce((a, b) => a + b, 0);
  for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
}
function genQuestion(pid, lastGen) {
  const p = PT[pid]; let gi = ri(0, p.drills.length - 1); if (p.drills.length > 1 && gi === lastGen) gi = (gi + 1) % p.drills.length;
  for (let tries = 0; tries < 20; tries++) {
    try { const q = p.drills[gi](); if (q && q.q) return { ...cleanQ(q), pid, gi }; } catch (e) { console.warn('drill error', pid, gi, e); }
  }
  return { pid, gi, q: 'Generator error — skip.', fields: [{ label: 'x', ans: 0 }], sol: '' };
}

function drillPanel(el, { pool, sprint = 0, onDone }) {
  let cur = null, counted = false, lastPid = null, lastGen = -1, n = 0, log = [], tStart = 0;
  const box = document.createElement('div'); box.className = 'drill card'; el.append(box);
  function next() {
    if (sprint && n >= sprint) return onDone && onDone(log);
    const pid = pool.length === 1 ? pool[0] : weightedPick(pool, lastPid);
    cur = genQuestion(pid, pid === lastPid ? lastGen : -1); lastPid = pid; lastGen = cur.gi; counted = false; n++; tStart = performance.now();
    render();
  }
  function render() {
    const p = PT[cur.pid], t = TP[p.topic];
    const fieldsHtml = cur.mc ? `<div class="mc">${cur.mc.options.map((o, i) => `<button class="opt" data-i="${i}"><span>${String.fromCharCode(65 + i)}</span> ${o}</button>`).join('')}</div>`
      : `<div class="fields">${cur.fields.map((f, i) => `<label class="field"><span class="flab">${esc(f.label)}${f.set ? ' <em>(list, any order)</em>' : f.vec ? ` <em>(${f.vec.length} numbers${f.prop ? ', any multiple' : ''})</em>` : ''}</span>
          <input data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text" placeholder="${f.set ? 'e.g. 2, -3' : f.vec ? 'e.g. 1, -2, 3' : 'e.g. 3/4, sqrt(2), pi/3, ln(2)'}"><span class="prev" data-p="${i}"></span><span class="mark" data-m="${i}"></span></label>`).join('')}</div>`;
    box.innerHTML = `
      <div class="dhead"><span class="chip" style="--tc:${t.color}">${p.code} ${p.title}</span>${sprint ? `<span class="chip">Q ${n}/${sprint}</span>` : ''}<span class="chip streak">🔥 ${DB.streak}</span></div>
      <div class="q">${tidy(cur.q)}</div>
      ${fieldsHtml}
      <div class="dact">
        ${cur.mc ? '' : '<button class="btn primary" data-a="check">Check ⏎</button>'}
        ${cur.hint ? '<button class="btn ghost" data-a="hint">Hint</button>' : ''}
        <button class="btn ghost" data-a="sol">${sprint ? 'Skip' : 'Show solution'}</button>
        <button class="btn" data-a="next">Next →</button>
      </div>
      <div class="fb"></div><div class="sol hidden"><h4>Worked solution</h4>${tidy(cur.sol)}</div>
      <p class="help">Type exact or 3 s.f. — <code>3/4</code>, <code>2sqrt(3)</code>, <code>5pi/12</code>, <code>ln(3/2)</code>, <code>e^2/6</code>, <code>arsinh(2)</code> all work.</p>`;
    renderMath(box);
    box.querySelectorAll('input').forEach(inp => inp.addEventListener('input', () => {
      const f = cur.fields[+inp.dataset.i], pv = box.querySelector(`[data-p="${inp.dataset.i}"]`), s = inp.value.trim();
      if (!s) { pv.textContent = ''; return; }
      const vals = (f.set || f.vec ? splitList(s.replace(/[()[\]]/g, '')) : [s]).map(evalExpr);
      pv.textContent = vals.every(isFinite) ? '= ' + vals.map(v => +v.toPrecision(6)).join(', ') : '…';
    }));
    const first = box.querySelector('input'); if (first && !('ontouchstart' in window)) first.focus();
    box.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => answerMC(+b.dataset.i)));
    box.querySelector('.dact').addEventListener('click', e => { const a = e.target.closest('[data-a]')?.dataset.a; if (a === 'check') check(); else if (a === 'next') next(); else if (a === 'sol') reveal(); else if (a === 'hint') box.querySelector('.fb').innerHTML = `<div class="hint">💡 ${esc(cur.hint)}</div>`; });
  }
  function count(ok) {
    if (counted) return; counted = true; record(cur.pid, ok);
    log.push({ pid: cur.pid, ok, t: (performance.now() - tStart) / 1000 });
    const sc = box.querySelector('.streak'); if (sc) sc.textContent = '🔥 ' + DB.streak;
  }
  function feedback(ok) {
    const fb = box.querySelector('.fb');
    fb.innerHTML = ok ? `<div class="good">✔ Correct${DB.streak > 2 ? ` — ${DB.streak} in a row` : ''}. Press Enter for the next one.</div>` : `<div class="badm">✘ Not quite. ${sprint ? 'Moving on after you check the solution.' : 'Try again, or open the solution.'}</div>`;
    if (ok || sprint) box.querySelector('.sol').classList.remove('hidden');
  }
  function check() {
    if (cur.mc) return;
    const inputs = [...box.querySelectorAll('input')]; let ok = true;
    inputs.forEach(inp => { const i = +inp.dataset.i, good = checkField(cur.fields[i], inp.value), m = box.querySelector(`[data-m="${i}"]`); m.textContent = good ? '✓' : '✗'; m.className = 'mark ' + (good ? 'ok' : 'bad'); ok = ok && good; });
    count(ok); feedback(ok); cur.done = ok;
  }
  function answerMC(i) {
    const ok = i === cur.mc.correct;
    box.querySelectorAll('.opt').forEach((b, j) => { b.classList.toggle('right', j === cur.mc.correct && (ok || counted || sprint)); b.classList.toggle('wrong', j === i && !ok); });
    count(ok); feedback(ok); cur.done = ok;
  }
  function reveal() { count(false); box.querySelector('.sol').classList.remove('hidden'); if (cur.mc) box.querySelectorAll('.opt').forEach((b, j) => b.classList.toggle('right', j === cur.mc.correct)); if (sprint) setTimeout(next, 0); }
  const key = e => { if (e.key !== 'Enter' || !box.isConnected) return; e.preventDefault(); if (cur.done || (sprint && counted)) next(); else if (!cur.mc) check(); };
  document.addEventListener('keydown', key); cleanup.push(() => document.removeEventListener('keydown', key));
  next();
}

function viewDrill(qs) {
  const sel = new Set((qs.get('topics') || TOPICS.map(t => t.id).join(',')).split(',').filter(id => TP[id]));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Smart drill</nav>
  <header class="phead slim"><div><h1>⚡ Smart drill</h1><p>Questions weighted toward spec points you haven't secured. Endless.</p></div></header>
  <div class="filters">${TOPICS.map(t => `<label class="fchip" style="--tc:${t.color}"><input type="checkbox" value="${t.id}" ${sel.has(t.id) ? 'checked' : ''}> ${t.title}</label>`).join('')}</div>
  <section id="pane"></section>`);
  document.querySelectorAll('.filters input').forEach(c => c.addEventListener('change', () => { const on = [...document.querySelectorAll('.filters input:checked')].map(x => x.value); location.hash = '#/drill?topics=' + (on.join(',') || TOPICS[0].id); }));
  drillPanel($('#pane'), { pool: POINTS.filter(p => sel.has(p.topic)).map(p => p.id) });
}

function viewSprint(qs) {
  const N = 10;
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Sprint</nav>
  <header class="phead slim"><div><h1>⏱ 10-question sprint</h1><p>Mixed across all of A2 1. First answer counts. Beat your time.</p></div><div class="timer" id="timer">0:00</div></header>
  <section id="pane"></section>`);
  const t0 = performance.now(), tm = $('#timer'), iv = setInterval(() => { const s = Math.floor((performance.now() - t0) / 1000); tm.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }, 250);
  cleanup.push(() => clearInterval(iv));
  drillPanel($('#pane'), {
    pool: POINTS.map(p => p.id), sprint: N, onDone: log => {
      clearInterval(iv); const secs = (performance.now() - t0) / 1000, score = log.filter(l => l.ok).length;
      DB.sprints ||= []; DB.sprints.push({ d: Date.now(), score, secs }); save();
      const best = DB.sprints.reduce((b, s) => (s.score > b.score || (s.score === b.score && s.secs < b.secs)) ? s : b, DB.sprints[0]);
      $('#pane').innerHTML = `<div class="card result"><h2>${score}/${N}</h2><p>${Math.floor(secs / 60)}m ${Math.round(secs % 60)}s · best ${best.score}/${N} in ${Math.round(best.secs)}s</p>
      <table class="tbl"><tr><th>#</th><th>Spec point</th><th>Result</th><th>Time</th></tr>${log.map((l, i) => `<tr><td>${i + 1}</td><td><a href="#/point/${l.pid}?tab=learn">${PT[l.pid].code} ${PT[l.pid].title}</a></td><td class="${l.ok ? 'ok' : 'bad'}">${l.ok ? '✓' : '✗'}</td><td>${l.t.toFixed(0)}s</td></tr>`).join('')}</table>
      <div class="cta center"><a class="btn primary" href="#/sprint?r=${Date.now()}">Go again</a><a class="btn" href="#/drill">Smart drill</a></div></div>`;
    },
  });
}

function viewSims() {
  const used = {}; POINTS.forEach(p => p.sims.forEach(s => { const k = s.split(':')[0]; (used[k] ||= []).push(p); }));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Simulations</nav>
  <header class="phead slim"><div><h1>🧪 Simulations</h1><p>${Object.keys(SIMS).length} interactive models. Each links to the spec points it supports.</p></div></header>
  <section class="grid sims">${Object.entries(SIMS).map(([k, S]) => `<a class="card simtile" href="#/sim/${k}"><h3>${S.title}</h3><p>${S.desc}</p><small>${(used[k] || []).map(p => p.code).filter((v, i, a) => a.indexOf(v) === i).join(' · ')}</small></a>`).join('')}</section>`);
}
function viewSim(k) {
  const S = SIMS[k]; if (!S) return viewSims();
  const pts = POINTS.filter(p => p.sims.some(s => s.split(':')[0] === k));
  mount(`<nav class="crumbs"><a href="#/">Home</a> / <a href="#/sims">Simulations</a> / ${S.title}</nav><div class="card simcard" id="sb"><h3>${S.title}</h3><p class="muted">${S.desc}</p></div>
  <p class="muted">Used in: ${pts.map(p => `<a href="#/point/${p.id}?tab=drill">${p.code} ${p.title}</a>`).join(' · ')}</p>`);
  cleanup.push(S.mount($('#sb')));
}

function viewProgress() {
  const { a, c } = totals();
  mount(`<nav class="crumbs"><a href="#/">Home</a> / Progress</nav>
  <header class="phead slim"><div><h1>📈 Progress by spec point</h1><p>${a} answered · ${a ? Math.round(100 * c / a) : 0}% accuracy · best streak ${DB.best}. Mastery = correct out of your last 10 attempts.</p></div>
  <button class="btn ghost" id="reset">Reset progress</button></header>
  <table class="tbl prog"><tr><th>Spec</th><th>Point</th><th>Attempts</th><th>Accuracy</th><th>Mastery</th><th></th></tr>
  ${POINTS.map(p => { const s = st(p.id), m = mastery(p.id), [lv, cls] = level(m); return `<tr><td class="code">${p.code}</td><td><a href="#/point/${p.id}?tab=learn">${p.title}</a></td><td>${s.a}</td><td>${s.a ? Math.round(100 * s.c / s.a) + '%' : '—'}</td><td><span class="pill ${cls}">${lv}</span>${bar(m, TP[p.topic].color)}</td><td><a class="btn small" href="#/point/${p.id}?tab=drill">Drill</a></td></tr>`; }).join('')}</table>`);
  $('#reset').onclick = () => { if (confirm('Reset all progress on this device?')) { DB = { stats: {}, days: {}, best: 0, streak: 0 }; save(); viewProgress(); } };
}

/* ---------- router ---------- */
function route() {
  const [path, query] = (location.hash.slice(1) || '/').split('?'), qs = new URLSearchParams(query || ''), parts = path.split('/').filter(Boolean);
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#/' + (parts[0] || '')));
  if (!parts.length) return viewHome();
  if (parts[0] === 'topic') return viewTopic(parts[1]);
  if (parts[0] === 'point') return viewPoint(parts[1], qs.get('tab') || 'learn');
  if (parts[0] === 'drill') return viewDrill(qs);
  if (parts[0] === 'sprint') return viewSprint(qs);
  if (parts[0] === 'sims') return viewSims();
  if (parts[0] === 'sim') return viewSim(parts[1]);
  if (parts[0] === 'progress') return viewProgress();
  viewHome();
}
window.addEventListener('hashchange', route);

// theme
const themeBtn = $('#theme');
function applyTheme(t) { if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme; }
try { applyTheme(localStorage.getItem(STORE + '-theme')); } catch { }
themeBtn.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const t = dark ? 'light' : 'dark'; applyTheme(t); try { localStorage.setItem(STORE + '-theme', t); } catch { } route();
});

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', route); else route();
// KaTeX loads deferred; re-render once it's ready
window.addEventListener('load', () => renderMath(app()));
