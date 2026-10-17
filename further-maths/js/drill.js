// BCSFM drill engine: weighted question selection, answer checking, sprint mode.
'use strict';

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
        <button class="btn ghost" data-a="calc" title="Open calculator (Alt+C)">🧮</button>
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
    box.querySelector('.dact').addEventListener('click', e => { const a = e.target.closest('[data-a]')?.dataset.a; if (a === 'check') check(); else if (a === 'next') next(); else if (a === 'sol') reveal(); else if (a === 'calc') window.toggleCalc && window.toggleCalc(true); else if (a === 'hint') box.querySelector('.fb').innerHTML = `<div class="hint">💡 ${esc(cur.hint)}</div>`; });
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
  const key = e => { if (e.key !== 'Enter' || !box.isConnected || (e.target.closest && e.target.closest('.calc, .lab-side, .pform'))) return; e.preventDefault(); if (cur.done || (sprint && counted)) next(); else if (!cur.mc) check(); };
  document.addEventListener('keydown', key); cleanup.push(() => document.removeEventListener('keydown', key));
  next();
}

