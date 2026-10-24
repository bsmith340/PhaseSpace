// Past papers hub for all 12 units: real CCEA papers (links + per-question mark tracking), BCS Academy original papers
// (timed exam → self-mark → saved attempts, narrated walkthroughs, print), and a topic-by-topic view.
// Routes (wired by app.js): #/<unit>/papers[/ccea/<key>|/bcs/<paperId>|/topics], and #/physics/<unit>/papers… likewise.
// PAPERS.route(unit, parts, mount)   parts = path segments after "papers"; mount = app mount(html) fn or an element
// PAPERS.forPoint(pane, unit, pointId)   the per-point "Past papers" tab
// Storage (site DB, saved with the app's save()):
//   DB.papers[unit] = [{ id, v: 2, key, name, status: ''|'started'|'done', date, notes, score, out, qs: [{ n, mk, out, pt }] }]
//     (old tracker rows { id, name, score, out, date, notes } are upgraded in place: nothing is dropped)
//   DB.bcsp[paperId] = { attempts: [{ id, at, secs, score, out, parts: { '1a': got }, ticks, ans }], draft }
'use strict';

const PAPERS = (() => {
  const h = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const persist = () => { if (typeof save === 'function') save(); };
  const db = () => { DB.papers ||= {}; DB.bcsp ||= {}; return DB; };
  const math = el => { if (window.renderMath) window.renderMath(el); };
  const id8 = () => Math.random().toString(36).slice(2, 10);
  const num = v => (v === '' || v == null || isNaN(+v)) ? null : +v;
  const pct = (a, b) => b ? Math.round((100 * a) / b) : null;
  const LEVELS = [['easy', 'Easy'], ['medium', 'Medium'], ['hard', 'Hard']];
  const ORIGINAL = 'BCS Academy original · not a CCEA paper';
  const hasPhys = () => typeof PHYS !== 'undefined' && PHYS.UNITS;
  const fmtT = s => { s = Math.max(0, Math.round(s)); const hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60; return (hh ? hh + ':' + String(mm).padStart(2, '0') : mm) + ':' + String(ss).padStart(2, '0'); };
  const mins = m => m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ' ' + (m % 60) + ' min' : ''}` : `${m} min`;
  const day = t => { try { return new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); } catch { return ''; } };

  /* ---------- units ---------- */
  function U(unit) {
    if (typeof COURSES !== 'undefined' && COURSES[unit]) {
      const c = COURSES[unit], Q = typeof QUALS !== 'undefined' ? QUALS[c.qual] : null;
      const groups = c.topics.map(t => ({ id: t.id, code: t.code, title: t.title, color: t.color, points: t.points.map(p => ({ id: p.id, code: p.code, title: p.title, href: `#/${unit}/point/${p.id}?tab=papers` })) }));
      return { id: unit, phys: false, base: `#/${unit}/papers`, home: `#/${unit}`, qual: c.qual, qualName: Q ? Q.short : c.name, qualHref: `#/${c.qual}`, no: c.unitNo, short: c.short, title: `${c.name} ${c.unit}`, groups };
    }
    const u = hasPhys() && PHYS.UNITS.find(x => x.id === unit);
    if (!u) return null;
    const ts = PHYS.topicsIn ? PHYS.topicsIn(u) : PHYS.TOPICS.filter(t => t.unit === u.no);
    return { id: unit, phys: true, base: `#/physics/${unit}/papers`, home: `#/physics/${unit}`, qual: 'physics', qualName: 'Physics', qualHref: '#/physics', no: u.no, short: `Physics ${u.no}`, title: `Physics ${u.no} ${u.title}`,
      groups: [{ id: unit, code: u.no, title: u.short || u.title, points: ts.map(t => ({ id: t.id, code: t.code, title: t.title, href: `#/physics/${t.id}` })) }] };
  }
  const pointsOf = u => u.groups.flatMap(g => g.points);
  // a question's spec tag → a point of this unit (physics outcome codes like 1.4.2 fold into their section 1.4)
  function resolve(u, id) {
    const pts = pointsOf(u), p = pts.find(x => x.id === id);
    if (p) return p;
    if (u.phys) { const t = pts.find(x => String(id).startsWith(x.code + '.') || x.code === String(id)); if (t) return t; }
    if (typeof PT !== 'undefined' && PT[id]) return { id, code: PT[id].code, title: PT[id].title, href: `#/${PT[id].course}/point/${id}?tab=papers`, other: true };
    return null;
  }
  const qPoints = (u, q, part) => { const seen = new Map(); for (const id of ((part && part.points) || q.points || [])) { const p = resolve(u, id); if (p && !seen.has(p.id)) seen.set(p.id, p); } return [...seen.values()]; };

  /* ---------- BCS papers: marks ---------- */
  const papersFor = unit => (typeof BCSP !== 'undefined' ? BCSP.forUnit(unit) : []).slice().sort((a, b) => LEVELS.findIndex(l => l[0] === a.level) - LEVELS.findIndex(l => l[0] === b.level));
  const partKey = (q, p, j) => `${q.n}${p.l || (q.parts.length > 1 ? String.fromCharCode(97 + j) : '')}`;
  const partLabel = (q, p) => `${q.n}${p.l ? `(${p.l})` : ''}`;
  const eachPart = (paper, f) => paper.questions.forEach(q => (q.parts || []).forEach((p, j) => f(q, p, partKey(q, p, j), j)));
  const totalOf = paper => { let t = 0; eachPart(paper, (q, p) => { t += +p.marks || 0; }); return t; };
  const MSRE = /^\s*((?:SC|DM|dM|[MABCE])\d+)\b\s*(.*)$/s;
  // value of a mark-scheme line = sum of every mark code in it ("(i) B1 … ; B1 …" is worth 2); no code → 1
  const CODES = /(?:^|[^A-Za-z0-9])(SC|DM|dM|[MABCE])(\d+)(?![\d.])/g;
  const msParse = line => { const L = String(line), m = MSRE.exec(L), all = [...L.matchAll(CODES)].reduce((s, x) => s + (+x[2] || 0), 0); return m ? { code: m[1], val: all || 1, text: m[2] } : { code: '', val: all || 1, text: L }; };
  // levels-of-response parts ("Band A (5–6): …") are marked by choosing a mark, not by ticking lines
  const banded = p => (p.ms || []).some(l => /^\s*Band\s/i.test(l));
  const partGot = (p, ticks) => { if (ticks && !Array.isArray(ticks) && typeof ticks.b === 'number') return Math.min(+p.marks || 0, ticks.b); return Math.min(+p.marks || 0, (p.ms || []).reduce((s, l, j) => s + (Array.isArray(ticks) && ticks[j] ? msParse(l).val : 0), 0)); };
  const store = pid => (db().bcsp[pid] ||= { attempts: [] });
  const best = pid => { const a = (DB.bcsp && DB.bcsp[pid] && DB.bcsp[pid].attempts) || []; return a.length ? a.reduce((m, x) => (x.score / x.out > m.score / m.out ? x : m)) : null; };
  const latest = pid => { const a = (DB.bcsp && DB.bcsp[pid] && DB.bcsp[pid].attempts) || []; return a[a.length - 1] || null; };

  /* ---------- real papers: records & migration ---------- */
  function migrate(unit) {
    const D = db(); let list = D.papers[unit], changed = false;
    if (!Array.isArray(list)) { list = D.papers[unit] = list && typeof list === 'object' ? Object.values(list) : []; changed = true; }
    const used = new Set(list.filter(r => r.v === 2 && r.key).map(r => r.key));
    for (const r of list) {
      if (r.v === 2) continue;
      r.v = 2; r.qs = Array.isArray(r.qs) ? r.qs : []; changed = true;
      if (r.status == null) r.status = (r.score !== '' && r.score != null) ? 'done' : '';
      if (!r.key) { const y = /(20\d\d)/.exec(r.name || ''), k = y && typeof CCEA_PAPERS !== 'undefined' && CCEA_PAPERS.get(`${unit}-${y[1]}`) ? `${unit}-${y[1]}` : ''; r.key = k && !used.has(k) && !/reserve|specimen|mock/i.test(r.name) ? k : ''; if (r.key) used.add(r.key); }
      ['score', 'out', 'date', 'notes', 'name'].forEach(f => { if (r[f] == null) r[f] = ''; });
    }
    if (changed) persist();
    return list;
  }
  const recs = unit => migrate(unit);
  const recFor = (unit, key) => recs(unit).find(r => r.key === key) || null;
  const recById = (unit, id) => recs(unit).find(r => r.id === id) || null;
  function ensureRec(unit, key) { let r = recFor(unit, key); if (!r) { const c = CCEA_PAPERS.get(key); r = { id: id8(), v: 2, key, name: c ? c.name : key, status: '', date: '', notes: '', score: '', out: '', qs: [] }; recs(unit).push(r); } return r; }
  function recTotal(r) {
    const qs = (r.qs || []).filter(q => num(q.mk) != null || num(q.out) != null);
    if (qs.length) { const s = qs.reduce((a, q) => a + (num(q.mk) || 0), 0), o = qs.reduce((a, q) => a + (num(q.out) || 0), 0); return { s, o, p: pct(s, o), from: 'qs' }; }
    const s = num(r.score), o = num(r.out); return s != null && o ? { s, o, p: pct(s, o), from: 'overall' } : { s: null, o: null, p: null, from: '' };
  }
  const recName = (r, c) => c ? c.name : (r.name || 'Untitled paper');
  const recRoute = (u, r) => `${u.base}/ccea/${r.key ? r.key : 'my-' + r.id}`;
  const STATUS = { '': ['Not started', 'st0'], started: ['Started', 'st1'], done: ['Done', 'st2'] };

  /* ---------- topic progress ---------- */
  // per point: BCS parts tagged (all papers), their latest marks, and the student's tagged real-paper questions
  function topicData(u) {
    const map = new Map(pointsOf(u).map(p => [p.id, { p, bcs: [], real: [], got: 0, out: 0, tried: 0 }]));
    for (const paper of papersFor(u.id)) {
      const last = latest(paper.id);
      eachPart(paper, (q, part, k) => qPoints(u, q, part).forEach(pt => {
        const t = map.get(pt.id); if (!t) return;
        const got = last && last.parts && last.parts[k] != null ? last.parts[k] : null;
        t.bcs.push({ paper, q, part, k, got });
        if (got != null) { t.got += got; t.out += +part.marks || 0; t.tried++; }
      }));
    }
    for (const r of recs(u.id)) for (const q of r.qs || []) {
      const t = q.pt && map.get(q.pt); if (!t) continue;
      t.real.push({ r, q });
      if (num(q.mk) != null && num(q.out)) { t.got += num(q.mk); t.out += num(q.out); t.tried++; }
    }
    return map;
  }
  const countForPoint = (unit, pid) => { const u = U(unit); if (!u) return 0; const t = topicData(u).get(pid); return t ? t.bcs.length + t.real.length : 0; };

  /* ---------- shell ---------- */
  let live = null; // teardown for the current view (timers, listeners)
  const kill = () => { if (live) { const f = live; live = null; try { f(); } catch { } } };
  function put(mount, html) {
    kill();
    let root;
    if (typeof mount === 'function') { mount(html); root = document.getElementById('app'); }
    else { root = mount instanceof Element ? mount : document.getElementById('app'); root.innerHTML = html; window.scrollTo(0, 0); }
    math(root);
    return root;
  }
  const onLeave = f => { const prev = live; live = () => { prev && prev(); f(); }; try { if (typeof cleanup !== 'undefined' && Array.isArray(cleanup)) cleanup.push(kill); } catch { } };
  const crumbs = (u, ...parts) => `<nav class="crumbs"><a href="#/">Courses</a> / <a href="${u.qualHref}">${h(u.qualName)}</a> / <a href="${u.home}">${h(u.no)}</a>${parts.length ? ` / <a href="${u.base}">Past papers</a>` : ' / Past papers'}${parts.map(p => ' / ' + p).join('')}</nav>`;
  const tabs = (u, on) => `<nav class="tabs pp-tabs" aria-label="Past papers views">${[['', 'Paper by paper'], ['topics', 'Topic by topic']].map(([k, l]) => `<a class="tab ${k === on ? 'on' : ''}" href="${u.base}${k ? '/' + k : ''}"${k === on ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`;
  const meter = (p, cls = '') => `<div class="pp-meter ${cls}" role="img" aria-label="${p == null ? 'not attempted' : p + '%'}"><span style="width:${p || 0}%"></span></div>`;
  const ext = (href, label, cls = 'btn small') => `<a class="${cls}" href="${h(href)}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span><span class="pp-vh"> (opens CCEA's website in a new tab)</span></a>`;

  function route(unit, parts, mount) {
    const u = U(unit); parts = (parts || []).filter(Boolean);
    if (!u) return put(mount, `<div class="pp"><h1>Past papers</h1><p class="muted">Unknown unit.</p></div>`);
    migrate(unit);
    document.title = `Past papers · ${u.short} · BCS Academy`;
    const [a, b] = parts;
    if (a === 'ccea' && b) return viewReal(u, b, mount);
    if (a === 'bcs' && b) return viewBcs(u, b, mount);
    if (a === 'topics') return viewTopics(u, mount);
    return viewHub(u, mount);
  }

  /* ---------- hub ---------- */
  function viewHub(u, mount) {
    const papers = papersFor(u.id), cc = typeof CCEA_PAPERS !== 'undefined' ? CCEA_PAPERS.forUnit(u.id) : [], rs = recs(u.id);
    const others = rs.filter(r => !r.key || !cc.some(c => c.key === r.key));
    const subj = typeof CCEA_PAPERS !== 'undefined' && CCEA_PAPERS.UNITS[u.id] ? CCEA_PAPERS.SUBJ[CCEA_PAPERS.UNITS[u.id].subj] : null;
    const done = cc.filter(c => { const r = recFor(u.id, c.key); return r && r.status === 'done'; }).length;
    const bcsCard = p => {
      const tot = totalOf(eff(p, (DB.bcsp[p.id] || {}).route)), st = DB.bcsp[p.id], at = (st && st.attempts) || [], bst = best(p.id), draft = st && st.draft;
      return `<article class="pp-card card lvl-${h(p.level)}"><div class="pp-card-h"><span class="pp-lvl">${h((LEVELS.find(l => l[0] === p.level) || [, p.level])[1])}</span>${p.calc === false ? '<span class="pp-chip">No calculator</span>' : ''}</div>
        <h3>${h(p.title)}</h3><p class="muted small">${mins(+p.minutes || 0)} · ${tot} marks${routesOf(p) ? chooseLabel(p) : ` · ${p.questions.length} questions`}</p>
        <p class="pp-orig">${ORIGINAL}</p>
        ${bst ? `<div class="pp-best"><b>${bst.score}/${bst.out}</b> best · ${pct(bst.score, bst.out)}% ${meter(pct(bst.score, bst.out))}<span class="muted small">${at.length} attempt${at.length > 1 ? 's' : ''}</span></div>` : '<div class="pp-best muted small">Not attempted yet</div>'}
        <div class="pp-acts"><a class="btn primary small" href="${u.base}/bcs/${encodeURIComponent(p.id)}">${draft ? 'Resume' : at.length ? 'Open' : 'Start'}</a><button class="btn small ghost" data-print="${h(p.id)}">Print</button></div></article>`;
    };
    const realRow = c => {
      const r = recFor(u.id, c.key), t = r ? recTotal(r) : { p: null }, [sl, sc] = STATUS[(r && r.status) || ''];
      return `<li class="pp-row"><a class="pp-row-main" href="${u.base}/ccea/${c.key}"><span class="pp-yr">${c.year}</span><span class="pp-row-t"><b>${h(c.series)} ${c.year}</b> · ${h(c.code)}${c.notSat ? ' <span class="pp-chip warn" title="Summer 2021 exams were cancelled; CCEA published the paper">Published, not sat</span>' : ''}${c.ev === 'inferred' ? ' <span class="pp-chip" title="This series ran, but we could not confirm the files are still on CCEA\'s site">Check availability</span>' : ''}</span>
        <span class="pp-st ${sc}">${sl}</span>${t.p != null ? `<span class="pp-score"><b>${t.s}/${t.o}</b> ${t.p}%</span>` : '<span class="pp-score muted">—</span>'}</a>
        ${ext(c.page, 'CCEA', 'btn small ghost pp-ext')}</li>`;
    };
    const legacy = (typeof PT !== 'undefined' ? (DB.bank || []).filter(b => { const p = resolve(u, b.pid); return p && !p.other; }) : []);
    const root = put(mount, `<div class="pp">${crumbs(u)}
      <header class="phead slim"><div><h1>Past papers · ${h(u.short)}</h1><p>Real CCEA papers with your marks question by question, plus three BCS Academy practice papers you can sit, mark and watch worked through.</p></div></header>
      ${tabs(u, '')}
      <h2 class="sech pp-h">BCS Academy papers</h2>
      ${papers.length ? `<div class="pp-cards">${papers.map(bcsCard).join('')}</div>` : `<div class="box notice pp-empty">The BCS Academy practice papers for ${h(u.short)} are being written. They'll appear here as soon as they're ready.</div>`}
      <h2 class="sech pp-h">Real CCEA papers <span class="muted pp-sub">${done}/${cc.length} done</span></h2>
      <div class="box notice">CCEA's papers, mark schemes and Chief Examiner's reports are CCEA's copyright, so they aren't copied here. Each paper opens CCEA's past-papers page in a new tab; log your marks here question by question. CCEA keeps recent series online; older ones may have been removed.${subj ? ` ${ext(subj.page, 'CCEA ' + h(subj.name) + ' past papers', 'pp-inline')}` : ''}</div>
      ${cc.length ? `<ul class="pp-list card">${cc.map(realRow).join('')}</ul>` : ''}
      <h3 class="pp-h3">Your other papers</h3>
      ${others.length ? `<ul class="pp-list card">${others.map(r => { const t = recTotal(r), [sl, sc] = STATUS[r.status || '']; return `<li class="pp-row"><a class="pp-row-main" href="${recRoute(u, r)}"><span class="pp-yr">✎</span><span class="pp-row-t"><b>${h(r.name || 'Untitled paper')}</b></span><span class="pp-st ${sc}">${sl}</span>${t.p != null ? `<span class="pp-score"><b>${t.s}/${t.o}</b> ${t.p}%</span>` : '<span class="pp-score muted">—</span>'}</a></li>`; }).join('')}</ul>` : '<p class="muted small">Specimen papers, a new series CCEA has just published, or a mock: add it to track it the same way.</p>'}
      <button class="btn small" id="pp-add">+ Add a paper</button>
      ${legacy.length ? `<details class="pp-legacy card"><summary>Questions saved with the old tracker (${legacy.length})</summary><ul>${legacy.map(b => { const p = resolve(u, b.pid); return `<li><b>${h(b.src)}</b>${b.mk ? ` · ${h(b.mk)} marks` : ''} · <a href="${p.href}">${h(p.code)} ${h(p.title)}</a> · ${h(b.status || 'todo')}</li>`; }).join('')}</ul><p class="muted small">Still on each point's Past papers tab.</p></details>` : ''}
    </div>`);
    root.querySelector('#pp-add').onclick = () => { const r = { id: id8(), v: 2, key: '', name: 'New paper', status: '', date: '', notes: '', score: '', out: '', qs: [] }; recs(u.id).push(r); persist(); location.hash = recRoute(u, r); };
    root.querySelectorAll('[data-print]').forEach(b => b.onclick = () => { const p = papersFor(u.id).find(x => x.id === b.dataset.print); if (p) printPaper(u, eff(p, (DB.bcsp[p.id] || {}).route), true); });
  }

  /* ---------- one real paper ---------- */
  function viewReal(u, key, mount) {
    const custom = key.startsWith('my-'), c = custom ? null : CCEA_PAPERS.get(key);
    let r = custom ? recById(u.id, key.slice(3)) : recFor(u.id, key);
    if (!custom && (!c || c.unit !== u.id)) return put(mount, `<div class="pp">${crumbs(u, 'Not found')}<p>That paper isn't in the list for ${h(u.short)}. <a href="${u.base}">Back to past papers</a></p></div>`);
    if (custom && !r) return put(mount, `<div class="pp">${crumbs(u, 'Not found')}<p>That paper was deleted. <a href="${u.base}">Back to past papers</a></p></div>`);
    const get = () => r || (r = ensureRec(u.id, key));
    const view = r || { status: '', date: '', notes: '', score: '', out: '', qs: [], name: c.name };
    const pts = pointsOf(u);
    const opts = sel => `<option value="">—</option>${pts.map(p => `<option value="${h(p.id)}"${p.id === sel ? ' selected' : ''}>${h(p.code)} ${h(p.title)}</option>`).join('')}`;
    const row = (q, i) => `<tr data-i="${i}"><td><input class="pp-in pp-qno" data-f="n" value="${h(q.n)}" aria-label="Question number" placeholder="Q"></td><td><input class="pp-in pp-num" data-f="mk" inputmode="decimal" value="${h(q.mk)}" aria-label="Marks scored"></td><td><input class="pp-in pp-num" data-f="out" inputmode="decimal" value="${h(q.out)}" aria-label="Out of"></td><td class="pp-ptc"><select class="pp-in" data-f="pt" aria-label="Spec point (optional)">${opts(q.pt)}</select></td><td><button class="gx pp-del" data-del="${i}" aria-label="Delete row">✕</button></td></tr>`;
    const title = recName(view, c);
    const root = put(mount, `<div class="pp">${crumbs(u, h(c ? `${c.series} ${c.year}` : view.name || 'Paper'))}
      <header class="phead slim"><div><h1>${h(title)}</h1><p>${c ? `CCEA ${h(c.code)} · ${h(c.evText)}${c.notSat ? ' · Summer 2021 exams were cancelled; CCEA published this paper, but nobody sat it.' : ''}` : 'Your own paper (not from the CCEA list).'}</p></div></header>
      ${c ? `<div class="pp-links">${ext(c.page, 'Question paper &amp; mark scheme', 'btn primary small')}${c.report ? ext(c.report, 'Chief Examiner\'s report (PDF)') : ext(c.page, 'Chief Examiner\'s report')}${ext(c.index, 'All CCEA GCE past papers', 'btn small ghost')}</div>` : `<label class="lf pp-namef"><span>Paper name</span><input class="pp-in" id="pp-name" value="${h(view.name)}"></label>`}
      <section class="card pp-track">
        <div class="pp-track-h"><div class="seg" role="group" aria-label="Status" id="pp-status">${Object.entries(STATUS).map(([k, [l]]) => `<button data-s="${k}" class="${(view.status || '') === k ? 'on' : ''}" aria-pressed="${(view.status || '') === k}">${l}</button>`).join('')}</div>
          <label class="lf"><span>Date</span><input type="date" class="pp-in" id="pp-date" value="${h(view.date)}"></label></div>
        <div class="pp-total" id="pp-total"></div>
        <div class="pp-tblw"><table class="tbl pp-qtbl"><thead><tr><th>Q</th><th>Mark</th><th>Out of</th><th>Spec point (optional)</th><th><span class="pp-vh">Delete</span></th></tr></thead><tbody id="pp-rows">${(view.qs || []).map(row).join('')}</tbody></table></div>
        <div class="pp-acts"><button class="btn small" id="pp-addq">+ Question</button>${(view.qs || []).length ? '' : '<button class="btn small ghost" id="pp-addten">Add Q1–Q10</button>'}</div>
        <details class="pp-overall"${(view.qs || []).length || !(view.score || view.out) ? '' : ' open'}><summary>Just the total? Enter an overall score</summary><div class="lab-row"><label class="lf"><span>Score</span><input class="pp-in pp-num" id="pp-score" inputmode="decimal" value="${h(view.score)}"></label><label class="lf"><span>Out of</span><input class="pp-in pp-num" id="pp-out" inputmode="decimal" value="${h(view.out)}"></label></div><p class="muted small">Used only when no question rows have marks.</p></details>
        <label class="lf pp-notes"><span>Notes (what went wrong, what to revise)</span><textarea class="pp-in" id="pp-notes" rows="3">${h(view.notes)}</textarea></label>
        ${custom ? '<button class="btn small bad" id="pp-delpaper">Delete this paper</button>' : ''}
      </section>
      <p class="muted small">Percentages are raw marks only; CCEA's grade boundaries change every year, so no grade is shown.</p>
      <p><a href="${u.base}">← All past papers</a></p></div>`);
    const showTotal = () => { const t = recTotal(get()); root.querySelector('#pp-total').innerHTML = t.p != null ? `<span class="pp-big">${t.s}<small>/${t.o}</small></span><span class="pp-pct">${t.p}%</span>${meter(t.p)}` : '<span class="muted">Add your marks to see a total.</span>'; };
    if (r) showTotal(); else root.querySelector('#pp-total').innerHTML = '<span class="muted">Add your marks to see a total.</span>';
    const rerender = () => viewReal(u, key, mount);
    root.querySelector('#pp-status').onclick = e => { const b = e.target.closest('button'); if (!b) return; get().status = b.dataset.s; if (b.dataset.s && !get().date) get().date = new Date().toISOString().slice(0, 10); persist(); rerender(); };
    root.querySelector('#pp-date').onchange = e => { get().date = e.target.value; persist(); };
    root.querySelector('#pp-notes').onchange = e => { get().notes = e.target.value; persist(); };
    root.querySelector('#pp-score').onchange = e => { get().score = e.target.value; persist(); showTotal(); };
    root.querySelector('#pp-out').onchange = e => { get().out = e.target.value; persist(); showTotal(); };
    const nm = root.querySelector('#pp-name'); if (nm) nm.onchange = e => { get().name = e.target.value; persist(); };
    root.querySelector('#pp-rows').addEventListener('input', e => {
      const el = e.target.closest('[data-f]'); if (!el) return; const i = +el.closest('tr').dataset.i, R = get();
      R.qs[i][el.dataset.f] = el.value; if (!R.status) R.status = 'started'; persist(); showTotal();
    });
    root.querySelector('#pp-rows').addEventListener('change', e => { if (e.target.dataset.f === 'pt') { persist(); } });
    root.querySelector('#pp-rows').addEventListener('click', e => { const b = e.target.closest('[data-del]'); if (!b) return; get().qs.splice(+b.dataset.del, 1); persist(); rerender(); });
    const addQ = n => { const R = get(); const last = R.qs[R.qs.length - 1]; R.qs.push({ n: n != null ? String(n) : last && /^\d+$/.test(last.n) ? String(+last.n + 1) : String(R.qs.length + 1), mk: '', out: '', pt: '' }); persist(); };
    root.querySelector('#pp-addq').onclick = () => { addQ(); rerender(); const ins = document.querySelectorAll('#pp-rows .pp-num'); if (ins.length) ins[ins.length - 2].focus(); };
    const ten = root.querySelector('#pp-addten'); if (ten) ten.onclick = () => { for (let k = 1; k <= 10; k++) addQ(k); rerender(); };
    const del = root.querySelector('#pp-delpaper'); if (del) del.onclick = () => { if (!confirm('Delete this paper and its marks?')) return; DB.papers[u.id] = recs(u.id).filter(x => x !== r); persist(); location.hash = u.base; };
  }

  /* ---------- BCS paper player ---------- */
  const qHTML = (q, inner) => `<section class="pp-q card" id="pp-q${h(q.n)}"><header class="pp-qh"><span class="pp-qn">${h(q.n)}</span><span class="muted small">${(q.parts || []).reduce((s, p) => s + (+p.marks || 0), 0)} marks</span></header>${q.q ? `<div class="pp-stem">${q.q}</div>` : ''}${inner}</section>`;
  const partQ = (q, p) => `<div class="pp-pq">${p.l ? `<b class="pp-pl">(${h(p.l)})</b> ` : ''}<div class="pp-pqt">${p.q || ''}</div><span class="pp-mk">[${+p.marks || 0}]</span></div>`;

  // optional paper sections ({ sections: [{ id, title, marks }] } + question.section): headings and per-section totals
  const secOf = (paper, id) => (paper.sections || []).find(x => x.id === id);
  const secMarks = (paper, id) => paper.questions.filter(q => q.section === id).reduce((s, q) => s + (q.parts || []).reduce((a, p) => a + (+p.marks || 0), 0), 0);
  const secHead = (paper, cls = 'pp-sec') => { let prev = null; return q => { if (!paper.sections || !paper.sections.length || q.section === prev) return ''; prev = q.section; const S = secOf(paper, q.section); return S ? `<h2 class="${cls}" data-sec="${h(S.id)}">${h(S.title || 'Section ' + S.id)} <span class="muted pp-sub">${secMarks(paper, S.id)} marks</span></h2>` : ''; }; };
  const secGot = (paper, parts) => (paper.sections || []).map(S => { let g = 0, o = 0; paper.questions.filter(q => q.section === S.id).forEach(q => (q.parts || []).forEach((p, j) => { g += (parts || {})[partKey(q, p, j)] || 0; o += +p.marks || 0; })); return { S, g, o }; });

  // "choose" papers (e.g. FM AS 2: answer one route of two sections): every view works on the chosen route only
  const routesOf = paper => (paper.choose && Array.isArray(paper.choose.routes) && paper.choose.routes.length) ? paper.choose.routes : null;
  const routeName = (paper, r) => r.map(id => { const S = secOf(paper, id); return S ? (S.title || 'Section ' + id) : 'Section ' + id; }).join(' + ');
  function eff(paper, route) {
    const base = paper.base || paper, rs = routesOf(base);
    if (!rs) return base;
    const r = rs.find(x => route && x.join() === [].concat(route).join()) || rs[0];
    return { ...base, base, route: r, questions: base.questions.filter(q => !q.section || r.includes(q.section)), sections: (base.sections || []).filter(S => r.includes(S.id)) };
  }
  const chooseLabel = paper => { const b = paper.base || paper; return routesOf(b) ? ` · choose ${b.choose.count || routesOf(b)[0].length} of ${(b.sections || []).length} sections` : ''; };

  function viewBcs(u, pid, mount) {
    const paper = papersFor(u.id).find(p => p.id === pid);
    if (!paper) return put(mount, `<div class="pp">${crumbs(u, 'Not found')}<p>That BCS Academy paper isn't available. <a href="${u.base}">Back to past papers</a></p></div>`);
    const S = store(pid), d = S.draft;
    if (d && d.phase === 'exam') { d.running = false; return exam(u, paper, mount); } // reopened exams start paused
    if (d && d.phase === 'mark') return mark(u, paper, mount);
    return intro(u, paper, mount);
  }
  const head = (u, paper, sub) => `<div class="pp">${crumbs(u, h(paper.title))}
    <header class="phead slim"><div><h1>${h(paper.title)}</h1><p><span class="pp-orig">${ORIGINAL}</span> · ${mins(+paper.minutes || 0)} · ${totalOf(routesOf(paper.base || paper) && !paper.route ? eff(paper) : paper)} marks${paper.route ? ' · ' + h(routeName(paper, paper.route)) : chooseLabel(paper)}${paper.calc === false ? ' · no calculator' : ''}${sub ? ' · ' + sub : ''}</p></div></header>`;

  function intro(u, paper, mount, showAttempt) {
    paper = paper.base || paper;
    const S = store(paper.id), at = S.attempts || [], rs = routesOf(paper);
    let pick = eff(paper, S.route); // the route the student plans to answer (remembered per paper)
    const a = showAttempt ? at.find(x => x.id === showAttempt) : null;
    if (a) return results(u, paper, mount, a);
    const root = put(mount, `${head(u, paper)}
      <section class="card pp-intro"><h2>Before you start</h2>${rs ? `<div class="pp-choose"><p><b>${h(paper.choose.note || 'Choose which sections to answer.')}</b></p><div class="seg" role="group" aria-label="Sections you will answer" id="pp-route">${rs.map(r => `<button data-r="${h(r.join())}" class="${r === pick.route ? 'on' : ''}" aria-pressed="${r === pick.route}">${r.map(h).join(' + ')}</button>`).join('')}</div><p class="muted small" id="pp-routet">${h(routeName(paper, pick.route))} · ${totalOf(pick)} marks</p></div>` : ''}<ul>${!rs && paper.sections && paper.sections.length ? `<li>${paper.sections.map(S => `${h(S.title || 'Section ' + S.id)} (${secMarks(paper, S.id)} marks)`).join(' · ')}.</li>` : ''}<li>Answer every question. Show your working: method marks need it.</li><li>The clock runs from ${mins(+paper.minutes || 0)}; you can pause it, and you can keep going after time is up (overtime is shown).</li><li>${paper.calc === false ? 'No calculator.' : 'You may use a calculator.'} Have CCEA's formula booklet ready if the unit uses one.</li><li>When you submit, you mark your own answers against the mark scheme, then watch any part worked through.</li></ul>
        <div class="pp-acts"><button class="btn primary" id="pp-start">Start the exam</button><button class="btn" data-pr="0">Print paper</button><button class="btn ghost" data-pr="1">Print with mark scheme</button></div></section>
      ${at.length ? `<h2 class="sech pp-h">Your attempts</h2><ul class="pp-list card">${at.slice().reverse().map(x => `<li class="pp-row"><a class="pp-row-main" href="javascript:void 0" data-att="${h(x.id)}"><span class="pp-yr">${pct(x.score, x.out)}%</span><span class="pp-row-t"><b>${x.score}/${x.out}</b>${x.route ? ' · ' + x.route.map(h).join(' + ') : ''} · ${day(x.at)} · ${fmtT(x.secs || 0)}</span><span class="pp-st st2">Review</span></a></li>`).join('')}</ul>` : ''}
      <p><a href="${u.base}">← All past papers</a></p></div>`);
    const rp = root.querySelector('#pp-route');
    if (rp) rp.onclick = e => { const b = e.target.closest('button[data-r]'); if (!b) return; pick = eff(paper, b.dataset.r.split(',')); S.route = pick.route; persist(); rp.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); }); root.querySelector('#pp-routet').textContent = `${routeName(paper, pick.route)} · ${totalOf(pick)} marks`; };
    root.querySelector('#pp-start').onclick = () => { S.draft = { phase: 'exam', started: Date.now(), elapsed: 0, ans: {}, ticks: {}, running: true, route: pick.route || null }; persist(); exam(u, paper, mount); };
    root.querySelectorAll('[data-pr]').forEach(b => b.onclick = () => printPaper(u, pick, b.dataset.pr === '1'));
    root.querySelectorAll('[data-att]').forEach(b => b.onclick = () => results(u, paper, mount, at.find(x => x.id === b.dataset.att)));
  }

  function exam(u, paper, mount) {
    const S = store(paper.id), d = S.draft; paper = eff(paper, d.route); const limit = (+paper.minutes || 0) * 60;
    let since = d.running ? performance.now() : 0; // resumes running only when started this visit
    const elapsed = () => d.elapsed + (since ? (performance.now() - since) / 1000 : 0);
    const root = put(mount, `${head(u, paper, 'exam mode')}
      <div class="pp-bar" role="toolbar" aria-label="Exam controls"><span class="pp-clock" id="pp-clock" role="timer" aria-live="off">--:--</span><span class="pp-clockl muted small" id="pp-clockl">left</span><span class="pp-sp"></span><button class="btn small" id="pp-pause">Pause</button><button class="btn primary small" id="pp-submit">Submit &amp; mark</button></div>
      <div class="pp-exam" id="pp-exam">${(sh => paper.questions.map(q => sh(q) + qHTML(q, (q.parts || []).map((p, j) => { const k = partKey(q, p, j); return `<div class="pp-part">${partQ(q, p)}<label class="pp-ans"><span class="pp-vh">Your answer to ${partLabel(q, p)}</span><textarea data-k="${h(k)}" rows="3" placeholder="Your answer and working…">${h(d.ans[k] || '')}</textarea></label></div>`; }).join(''))).join(''))(secHead(paper))}</div>
      <div class="pp-paused" id="pp-paused" hidden><div class="card"><h2>Paused</h2><p class="muted">The clock has stopped and the questions are hidden.</p><button class="btn primary" id="pp-resume">Resume</button></div></div>
      <p class="pp-endsubmit"><button class="btn primary" id="pp-submit2">Submit &amp; mark</button></p></div>`);
    const clock = root.querySelector('#pp-clock'), lab = root.querySelector('#pp-clockl'), ex = root.querySelector('#pp-exam'), paused = root.querySelector('#pp-paused'), pb = root.querySelector('#pp-pause');
    const keep = () => { d.elapsed = elapsed(); if (since) since = performance.now(); persist(); };
    const tick = () => {
      if (!root.isConnected || !clock.isConnected) return stop();
      const e = elapsed(), left = limit - e;
      clock.textContent = left >= 0 ? fmtT(left) : '+' + fmtT(-left); lab.textContent = left >= 0 ? 'left' : 'over time';
      clock.classList.toggle('over', left < 0); clock.classList.toggle('low', left >= 0 && left < 300);
    };
    const setRun = on => {
      if (on && !since) since = performance.now(); if (!on && since) { d.elapsed = elapsed(); since = 0; }
      d.running = on; persist(); ex.hidden = !on; paused.hidden = on; pb.textContent = on ? 'Pause' : 'Resume'; root.classList.toggle('pp-is-paused', !on); tick();
    };
    let iv = setInterval(tick, 1000), sv = setInterval(() => { if (since) keep(); }, 15000), deb = 0;
    const onHide = () => { if (since) keep(); };
    window.addEventListener('pagehide', onHide);
    function stop() { clearInterval(iv); clearInterval(sv); clearTimeout(deb); iv = sv = 0; window.removeEventListener('pagehide', onHide); if (S.draft === d && d.phase === 'exam') { d.elapsed = elapsed(); since = 0; persist(); } }
    onLeave(stop);
    ex.addEventListener('input', e => { const t = e.target.closest('textarea[data-k]'); if (!t) return; d.ans[t.dataset.k] = t.value; clearTimeout(deb); deb = setTimeout(keep, 600); });
    pb.onclick = () => setRun(!since);
    root.querySelector('#pp-resume').onclick = () => setRun(true);
    const submit = () => {
      const blank = []; eachPart(paper, (q, p, k) => { if (!(d.ans[k] || '').trim()) blank.push(partLabel(q, p)); });
      if (blank.length && !confirm(`${blank.length} part${blank.length > 1 ? 's are' : ' is'} unanswered (${blank.slice(0, 6).join(', ')}${blank.length > 6 ? '…' : ''}). Submit anyway?`)) return;
      d.elapsed = elapsed(); since = 0; d.phase = 'mark'; d.running = false; persist(); stop(); mark(u, paper, mount);
    };
    root.querySelector('#pp-submit').onclick = submit; root.querySelector('#pp-submit2').onclick = submit;
    // a reloaded or revisited exam opens paused so time away isn't counted
    setRun(!!since);
  }

  function mark(u, paper, mount, editAttempt) {
    const S = store(paper.id), d = editAttempt ? { phase: 'mark', elapsed: editAttempt.secs || 0, ans: editAttempt.ans || {}, ticks: JSON.parse(JSON.stringify(editAttempt.ticks || {})) } : S.draft;
    paper = eff(paper, d.route || (editAttempt && editAttempt.route));
    const total = totalOf(paper);
    const root = put(mount, `${head(u, paper, 'mark your answers')}
      <div class="box notice">Tick each mark-scheme line your answer earns. M = method, A = accuracy (needs the method), B = independent mark. A part can't score more than its marks.</div>
      <div class="pp-exam pp-marking">${(sh => paper.questions.map(q => sh(q) + qHTML(q, (q.parts || []).map((p, j) => { const k = partKey(q, p, j), t = d.ticks[k] || (banded(p) ? { b: 0 } : []); return `<div class="pp-part" data-k="${h(k)}">${partQ(q, p)}
        <div class="pp-yours"><span class="pp-lbl">Your answer</span><div class="pp-anstext">${(d.ans[k] || '').trim() ? h(d.ans[k]) : '<i class="muted">No answer</i>'}</div></div>
        <div class="pp-final"><span class="pp-lbl">Answer</span><div>${p.answer || ''}</div></div>
        ${banded(p) ? `<ul class="pp-ms pp-bands" aria-label="Mark scheme for ${partLabel(q, p)}">${(p.ms || []).map(l => `<li>${l}</li>`).join('')}</ul><label class="lf pp-bandsel"><span>Marks awarded (choose the band, then the mark)</span><select data-band="${h(k)}">${Array.from({ length: (+p.marks || 0) + 1 }, (_, v) => `<option value="${v}"${t && t.b === v ? ' selected' : ''}>${v}</option>`).join('')}</select></label>`
          : `<ul class="pp-ms" aria-label="Mark scheme for ${partLabel(q, p)}">${(p.ms || []).map((l, jj) => { const m = msParse(l); return `<li><label><input type="checkbox" data-k="${h(k)}" data-j="${jj}"${Array.isArray(t) && t[jj] ? ' checked' : ''}>${m.code ? `<span class="pp-code">${h(m.code)}</span>` : ''}<span class="pp-mst">${m.text}</span>${m.val > 1 && !(m.code && m.val === +m.code.replace(/\D/g, '')) ? ` <span class="pp-mk">(${m.val})</span>` : ''}</label></li>`; }).join('')}</ul>`}
        <div class="pp-pt"><span>Marks <b class="pp-got" data-got="${h(k)}">${partGot(p, t)}</b> / ${+p.marks || 0}</span>${(p.steps || []).length ? `<button class="btn small pp-watch" data-walk="${h(k)}"><span aria-hidden="true">▶</span> Watch the walkthrough</button>` : ''}</div></div>`; }).join(''))).join(''))(secHead(paper))}</div>
      <div class="pp-bar pp-bar-b"><span>Total <b id="pp-tot">0</b> / ${total} · <b id="pp-pc">0%</b></span>${(paper.sections || []).map(S => `<span class="pp-secTot small">${h(S.id)} <b data-sect="${h(S.id)}">0</b>/${secMarks(paper, S.id)}</span>`).join('')}<span class="pp-sp"></span>${editAttempt ? '' : '<button class="btn small ghost" id="pp-back">Back to answers</button>'}<button class="btn primary small" id="pp-save">Save marks</button></div></div>`);
    const parts = {}; eachPart(paper, (q, p, k) => { parts[k] = { q, p }; });
    const sum = () => { let s = 0; for (const k in parts) s += partGot(parts[k].p, d.ticks[k]); root.querySelector('#pp-tot').textContent = s; root.querySelector('#pp-pc').textContent = pct(s, total) + '%'; const g = {}; for (const k in parts) g[k] = partGot(parts[k].p, d.ticks[k]); secGot(paper, g).forEach(x => { const el = root.querySelector(`[data-sect="${CSS.escape(x.S.id)}"]`); if (el) el.textContent = x.g; }); return s; };
    sum();
    const mk = root.querySelector('.pp-marking'); // listen on this view, not the shared #app root
    mk.addEventListener('change', e => {
      const sel = e.target.closest('select[data-band]'), c = e.target.closest('input[type=checkbox][data-k]'); if (!c && !sel) return; const k = sel ? sel.dataset.band : c.dataset.k;
      if (sel) d.ticks[k] = { b: +sel.value }; else { if (!Array.isArray(d.ticks[k])) d.ticks[k] = []; d.ticks[k][+c.dataset.j] = c.checked; }
      root.querySelector(`[data-got="${CSS.escape(k)}"]`).textContent = partGot(parts[k].p, d.ticks[k]); sum(); if (!editAttempt) persist();
    });
    mk.addEventListener('click', e => { const b = e.target.closest('[data-walk]'); if (!b) return; const { q, p } = parts[b.dataset.walk]; watch(paper, q, p); });
    const back = root.querySelector('#pp-back'); if (back) back.onclick = () => { d.phase = 'exam'; d.running = false; persist(); exam(u, paper, mount); };
    root.querySelector('#pp-save').onclick = () => {
      const got = {}; let s = 0; for (const k in parts) { got[k] = partGot(parts[k].p, d.ticks[k]); s += got[k]; }
      let a;
      if (editAttempt) { a = editAttempt; Object.assign(a, { score: s, out: total, parts: got, ticks: d.ticks }); }
      else { a = { id: id8(), at: Date.now(), secs: Math.round(d.elapsed || 0), score: s, out: total, parts: got, ticks: d.ticks, ans: d.ans, route: paper.route || null }; (S.attempts ||= []).push(a); delete S.draft; }
      persist(); results(u, paper, mount, a);
    };
  }

  function watch(paper, q, p) {
    if (typeof WALK === 'undefined') return;
    const steps = [{ say: `Question ${q.n}${p.l ? ', part ' + p.l : ''}. ${WALK.sayOf({ show: p.q || '' })}`, show: `<div class="walk-q">${q.q ? `<div class="pp-stem">${q.q}</div>` : ''}${p.l ? `<b>(${h(p.l)})</b> ` : ''}${p.q || ''}</div>` }, ...(p.steps || [])];
    WALK.open(steps, { title: `${paper.title} · Q${partLabel(q, p)}` });
  }

  function results(u, paper, mount, a) {
    paper = eff(paper, a.route);
    const by = new Map(); const rows = [];
    paper.questions.forEach(q => { let g = 0, o = 0; (q.parts || []).forEach((p, j) => { const k = partKey(q, p, j), got = (a.parts || {})[k] || 0; g += got; o += +p.marks || 0; qPoints(u, q, p).forEach(pt => { const t = by.get(pt.id) || { pt, g: 0, o: 0 }; t.g += got; t.o += +p.marks || 0; by.set(pt.id, t); }); }); rows.push({ q, g, o }); });
    const topics = [...by.values()].sort((x, y) => x.g / x.o - y.g / y.o), P = pct(a.score, a.out);
    const root = put(mount, `${head(u, paper, 'results')}
      <section class="card pp-res"><div class="pp-total"><span class="pp-big">${a.score}<small>/${a.out}</small></span><span class="pp-pct">${P}%</span>${meter(P)}</div>
        <p class="muted small">${day(a.at)} · time used ${fmtT(a.secs || 0)} of ${mins(+paper.minutes || 0)} · raw marks, no grade (BCS Academy papers have no grade boundaries).</p>
        <div class="pp-acts"><button class="btn" id="pp-remark">Change marks</button><button class="btn primary" id="pp-retake">Sit it again</button><a class="btn ghost" href="${u.base}/topics">Topic by topic</a></div></section>
      ${paper.sections && paper.sections.length ? `<section class="card pp-secres"><h2>By section</h2><table class="tbl pp-btbl"><tbody>${secGot(paper, a.parts).map(x => `<tr><td>${h(x.S.title || 'Section ' + x.S.id)}</td><td class="pp-r">${x.g}/${x.o}</td><td class="pp-mc">${meter(pct(x.g, x.o))}</td></tr>`).join('')}</tbody></table></section>` : ''}
      <div class="pp-two">
        <section class="card"><h2>By topic</h2><p class="muted small">Weakest first. A question tagged to two topics counts towards both.</p><table class="tbl pp-btbl"><tbody>${topics.map(t => `<tr><td><a href="${t.pt.href}">${h(t.pt.code)} ${h(t.pt.title)}</a></td><td class="pp-r">${t.g}/${t.o}</td><td class="pp-mc">${meter(pct(t.g, t.o))}</td></tr>`).join('') || '<tr><td class="muted">No topic tags on this paper.</td></tr>'}</tbody></table></section>
        <section class="card"><h2>By question</h2><table class="tbl pp-btbl"><tbody>${rows.map(r => `<tr><td>Q${h(r.q.n)}</td><td class="pp-r">${r.g}/${r.o}</td><td class="pp-mc">${meter(pct(r.g, r.o))}</td><td><button class="btn small ghost" data-wq="${h(r.q.n)}" aria-label="Watch question ${h(r.q.n)} worked through">▶ Watch</button></td></tr>`).join('')}</tbody></table></section>
      </div>
      <p><a href="${u.base}/bcs/${encodeURIComponent(paper.id)}" id="pp-tointro">← This paper</a> · <a href="${u.base}">All past papers</a></p></div>`);
    root.querySelector('#pp-remark').onclick = () => mark(u, paper, mount, a);
    root.querySelector('#pp-retake').onclick = () => { store(paper.id).draft = { phase: 'exam', started: Date.now(), elapsed: 0, ans: {}, ticks: {}, running: true, route: paper.route || null }; persist(); exam(u, paper, mount); };
    root.querySelector('#pp-tointro').onclick = e => { e.preventDefault(); intro(u, paper, mount); };
    root.querySelectorAll('[data-wq]').forEach(b => b.onclick = () => {
      const q = paper.questions.find(x => String(x.n) === b.dataset.wq); if (!q || typeof WALK === 'undefined') return;
      const steps = []; (q.parts || []).forEach(p => { steps.push({ say: `Part ${p.l || ''}. ${WALK.sayOf({ show: p.q || '' })}`, show: `<div class="walk-q">${p.l ? `<b>(${h(p.l)})</b> ` : ''}${p.q || ''}</div>` }); steps.push(...(p.steps || [])); });
      WALK.open([...(q.q ? [{ say: `Question ${q.n}. ${WALK.sayOf({ show: q.q })}`, show: `<div class="walk-q">${q.q}</div>` }] : []), ...steps], { title: `${paper.title} · Q${q.n}` });
    });
  }

  /* ---------- print ---------- */
  function printPaper(u, paper, withMs) {
    document.querySelectorAll('.pp-print').forEach(x => x.remove());
    const box = document.createElement('div'); box.className = 'pp-print';
    box.innerHTML = `<section class="pp-pcover"><p class="pp-pboard">BCS Academy · ${h(u.title)}</p><h1>${h(paper.title)}</h1><p class="pp-orig">${ORIGINAL}</p>
      <p>Time: ${mins(+paper.minutes || 0)} · Total: ${totalOf(paper)} marks · ${paper.calc === false ? 'No calculator' : 'Calculator allowed'}</p>
      <ul><li>Answer all questions.</li><li>Show clearly the full development of your answers.</li><li>The marks for each part are shown in brackets.</li></ul><p class="pp-pname">Name ______________________ Date __________</p></section>
      ${(sh => paper.questions.map(q => sh(q) + `<section class="pp-pq-print"><h2>${h(q.n)}</h2>${q.q ? `<div>${q.q}</div>` : ''}${(q.parts || []).map(p => `<div class="pp-pp">${p.l ? `<b>(${h(p.l)})</b> ` : ''}${p.q || ''} <span class="pp-mk">[${+p.marks || 0}]</span><div class="pp-space" style="height:${Math.min(12, 2 + (+p.marks || 1) * 1.6)}em"></div></div>`).join('')}</section>`).join(''))(secHead(paper, 'pp-psec'))}
      ${withMs ? `<section class="pp-pms"><h1>Mark scheme · ${h(paper.title)}</h1><p class="pp-orig">${ORIGINAL}</p>${paper.questions.map(q => (q.parts || []).map(p => `<div class="pp-msq"><h3>${partLabel(q, p)} <span class="pp-mk">[${+p.marks || 0}]</span></h3><p><b>Answer:</b> ${p.answer || ''}</p><ul>${(p.ms || []).map(l => { const m = msParse(l); return `<li>${m.code ? `<b>${h(m.code)}</b> ` : ''}${m.text}</li>`; }).join('')}</ul></div>`).join('')).join('')}</section>` : ''}`;
    document.body.append(box); math(box); document.body.classList.add('pp-printing');
    const done = () => { box.remove(); document.body.classList.remove('pp-printing'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    try { window.print(); } catch { }
    return box;
  }

  /* ---------- topic by topic ---------- */
  function viewTopics(u, mount) {
    let mode = 'spec'; try { mode = localStorage.getItem('bcs-pp-sort') || 'spec'; } catch { }
    const data = topicData(u);
    const card = t => {
      const P = pct(t.got, t.out);
      return `<details class="pp-topic card"><summary><span class="pp-tc">${h(t.p.code)}</span><span class="pp-tt">${h(t.p.title)}</span><span class="pp-tm">${P != null ? `<b>${P}%</b>` : '<span class="muted">—</span>'}${meter(P, P == null ? '' : P < 50 ? 'lo' : P < 75 ? 'mid' : 'hi')}</span><span class="pp-tn muted small">${t.tried}/${t.bcs.length + t.real.length} tried</span></summary>
        <div class="pp-tbody">${t.bcs.length ? `<h4>BCS Academy questions</h4><ul>${t.bcs.map(x => `<li><a href="${u.base}/bcs/${encodeURIComponent(x.paper.id)}">${h(x.paper.title)} · Q${partLabel(x.q, x.part)}</a> <span class="muted small">${+x.part.marks || 0} marks</span>${x.got != null ? ` · <b>${x.got}/${+x.part.marks || 0}</b>` : ''}</li>`).join('')}</ul>` : ''}
        ${t.real.length ? `<h4>Your real-paper questions</h4><ul>${t.real.map(x => `<li><a href="${recRoute(u, x.r)}">${h(recName(x.r, x.r.key && CCEA_PAPERS.get(x.r.key)))} · Q${h(x.q.n)}</a>${num(x.q.mk) != null ? ` · <b>${h(x.q.mk)}/${h(x.q.out)}</b>` : ''}</li>`).join('')}</ul>` : ''}
        ${!t.bcs.length && !t.real.length ? '<p class="muted small">Nothing tagged yet. When you log a real paper, tag each question with its spec point and it appears here.</p>' : ''}
        <a class="small" href="${t.p.href}">Open ${h(t.p.code)} →</a></div></details>`;
    };
    const all = [...data.values()];
    const weakest = () => all.slice().sort((a, b) => { const pa = a.out ? a.got / a.out : null, pb = b.out ? b.got / b.out : null; if (pa != null && pb != null) return pa - pb; if (pa != null) return -1; if (pb != null) return 1; return (b.bcs.length + b.real.length) - (a.bcs.length + a.real.length); });
    const body = () => mode === 'weak' ? `<div class="pp-topics">${weakest().map(card).join('')}</div>` : u.groups.map(g => `<h3 class="pp-gh">${u.phys ? '' : h(g.code) + ' · '}${h(g.title)}</h3><div class="pp-topics">${g.points.map(p => card(data.get(p.id))).join('')}</div>`).join('');
    const tried = all.filter(t => t.out), G = tried.reduce((s, t) => s + t.got, 0), O = tried.reduce((s, t) => s + t.out, 0);
    const root = put(mount, `<div class="pp">${crumbs(u, 'Topic by topic')}
      <header class="phead slim"><div><h1>Topic by topic · ${h(u.short)}</h1><p>Every spec point with the BCS Academy questions on it and the real-paper questions you've tagged. ${tried.length} of ${all.length} points attempted${O ? ` · ${pct(G, O)}% of marks overall` : ''}.</p></div></header>
      ${tabs(u, 'topics')}
      <div class="seg" role="group" aria-label="Sort" id="pp-sort"><button data-m="spec" class="${mode === 'spec' ? 'on' : ''}" aria-pressed="${mode === 'spec'}">Spec order</button><button data-m="weak" class="${mode === 'weak' ? 'on' : ''}" aria-pressed="${mode === 'weak'}">Weakest first</button></div>
      <div id="pp-tbody">${body()}</div></div>`);
    root.querySelector('#pp-sort').onclick = e => { const b = e.target.closest('button'); if (!b) return; mode = b.dataset.m; try { localStorage.setItem('bcs-pp-sort', mode); } catch { } root.querySelectorAll('#pp-sort button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); }); const tb = root.querySelector('#pp-tbody'); tb.innerHTML = body(); math(tb); };
  }

  /* ---------- per-point tab ---------- */
  function forPoint(pane, unit, pointId) {
    const u = U(unit); if (!u) { pane.innerHTML = '<p class="muted">No past papers for this unit.</p>'; return; }
    migrate(unit);
    const t = topicData(u).get(pointId) || { p: resolve(u, pointId) || { id: pointId, code: '', title: '' }, bcs: [], real: [], got: 0, out: 0, tried: 0 }, P = pct(t.got, t.out);
    const cc = typeof CCEA_PAPERS !== 'undefined' ? CCEA_PAPERS.forUnit(unit) : [], others = recs(unit).filter(r => !r.key);
    const bank = (DB.bank || []).filter(b => b.pid === pointId), notes = (DB.notes || []).filter(n => n.pid === pointId);
    pane.innerHTML = `<div class="pp pp-point">
      <div class="pp-total">${P != null ? `<span class="pp-big">${t.got}<small>/${t.out}</small></span><span class="pp-pct">${P}%</span>${meter(P)}` : '<span class="muted">No marks on this point yet.</span>'}<a class="btn small ghost" href="${u.base}/topics">All topics</a></div>
      <h3>BCS Academy questions on ${h(t.p.code)}</h3>
      ${t.bcs.length ? `<ul class="pp-plist">${t.bcs.map(x => `<li><a href="${u.base}/bcs/${encodeURIComponent(x.paper.id)}">${h(x.paper.title)} · Q${partLabel(x.q, x.part)}</a> <span class="muted small">${+x.part.marks || 0} marks · ${ORIGINAL}</span>${x.got != null ? ` · <b>${x.got}/${+x.part.marks || 0}</b>` : ''} ${(x.part.steps || []).length ? `<button class="btn small ghost" data-w="${h(x.paper.id)}|${h(x.k)}">▶ Watch</button>` : ''}</li>`).join('')}</ul>` : '<p class="muted">None yet.</p>'}
      <h3>Your real CCEA questions on ${h(t.p.code)}</h3>
      ${t.real.length ? `<ul class="pp-plist">${t.real.map(x => `<li><a href="${recRoute(u, x.r)}">${h(recName(x.r, x.r.key && CCEA_PAPERS.get(x.r.key)))} · Q${h(x.q.n)}</a>${num(x.q.mk) != null ? ` · <b>${h(x.q.mk)}/${h(x.q.out)}</b>` : ''}</li>`).join('')}</ul>` : '<p class="muted">None tagged yet.</p>'}
      <form class="card pp-tagf" id="pp-tagf"><h4>Log a real-paper question on ${h(t.p.code)}</h4><div class="lab-row">
        <label class="lf"><span>Paper</span><select name="paper" required>${cc.map(c => `<option value="${c.key}">${h(c.series)} ${c.year} · ${h(c.code)}</option>`).join('')}${others.map(r => `<option value="my-${h(r.id)}">${h(r.name)}</option>`).join('')}</select></label>
        <label class="lf"><span>Question</span><input name="n" size="5" placeholder="e.g. 7(b)" required></label><label class="lf"><span>Mark</span><input name="mk" size="3" inputmode="decimal"></label><label class="lf"><span>Out of</span><input name="out" size="3" inputmode="decimal"></label>
        <button class="btn primary small">Save</button></div><p class="muted small">Open the paper on <a href="${u.base}">the Past papers page</a> (it links to CCEA). Only your marks are stored, never CCEA's questions.</p></form>
      ${bank.length || notes.length ? `<h3>Saved earlier</h3>${notes.map(n => `<blockquote class="quote">“${h(n.quote)}”<footer>— ${h(n.src)}</footer></blockquote>`).join('')}${bank.map(b => `<div class="card pp-old"><b>${h(b.src)}</b>${b.mk ? ` · ${h(b.mk)} marks` : ''} · ${h(b.status || 'todo')}<div class="pp-oldq">${h(b.q).replace(/\n/g, '<br>')}</div></div>`).join('')}` : ''}
    </div>`;
    math(pane);
    pane.querySelector('#pp-tagf').onsubmit = e => {
      e.preventDefault(); const f = new FormData(e.target), k = f.get('paper');
      const r = k.startsWith('my-') ? recById(unit, k.slice(3)) : ensureRec(unit, k); if (!r) return;
      r.qs.push({ n: String(f.get('n')).trim(), mk: f.get('mk'), out: f.get('out'), pt: pointId }); if (!r.status) r.status = 'started'; persist(); forPoint(pane, unit, pointId);
    };
    pane.querySelectorAll('[data-w]').forEach(b => b.onclick = () => { const [pid, k] = b.dataset.w.split('|'), paper = papersFor(unit).find(p => p.id === pid); if (!paper) return; eachPart(paper, (q, p, kk) => { if (kk === k) watch(paper, q, p); }); });
  }

  return { route, forPoint, countForPoint, migrate, printPaper, topicData, U, msParse };
})();
