// Narrated walkthrough player: a video-like stage that reveals a solution one step at a time, reads each step aloud
// (Web Speech API, en-GB voice when available) with captions always on, and auto-advances when the speech ends.
// WALK.play(container, steps, {title})   steps = [{ say, show }]   → controller { play, pause, go, destroy }
// WALK.fromExample(el)                   a textbook worked example (.box.ex: .exq + ol.steps li) → steps
// WALK.enhance(container)                adds "▶ Watch" to every .box.ex inside container (idempotent)
// WALK.open(steps, {title})              plays in a modal sheet (used by "Watch" buttons and the paper player)
'use strict';

const WALK = (() => {
  const SPEEDS = [0.75, 1, 1.25, 1.5];
  const pref = { rate: 1, muted: false };
  try { Object.assign(pref, JSON.parse(localStorage.getItem('bcs-walk') || '{}')); } catch { }
  const keep = () => { try { localStorage.setItem('bcs-walk', JSON.stringify(pref)); } catch { } };
  const escH = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = () => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } };
  const math = el => { if (window.renderMath) window.renderMath(el); };
  const synth = () => (typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined') ? window.speechSynthesis : null;
  let voice = null;
  const pickVoice = () => {
    const s = synth(); if (!s) return null;
    const vs = s.getVoices ? s.getVoices() : [];
    voice = vs.find(v => v.lang === 'en-GB' && /natural|google|daniel|serena|kate/i.test(v.name)) || vs.find(v => v.lang === 'en-GB') || vs.find(v => /^en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
    return voice;
  };
  try { const s = synth(); if (s) { pickVoice(); if ('onvoiceschanged' in s) s.addEventListener('voiceschanged', pickVoice); } } catch { }

  // TeX → words a speech engine can read ("x squared over 2")
  const GREEK = 'alpha beta gamma delta epsilon varepsilon zeta eta theta vartheta iota kappa lambda mu nu xi pi rho sigma tau upsilon phi varphi chi psi omega Gamma Delta Theta Lambda Xi Pi Sigma Phi Psi Omega'.split(' ');
  function texSay(t) {
    let s = ' ' + t + ' ';
    const rep = (re, f) => { let prev; do { prev = s; s = s.replace(re, f); } while (s !== prev); };
    s = s.replace(/\\(displaystyle|textstyle|left|right|big|Big|bigg|Bigg|,|;|!|quad|qquad|limits)/g, ' ');
    s = s.replace(/\\(text|mathrm|mathbf|mathit|operatorname|textbf)\{([^{}]*)\}/g, ' $2 ');
    rep(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, ' $1 over $2 ');
    rep(/\\sqrt\[([^\]]*)\]\{([^{}]*)\}/g, ' the $1th root of $2 ');
    rep(/\\sqrt\{([^{}]*)\}/g, ' root $1 ');
    s = s.replace(/\^\{?2\}?/g, ' squared ').replace(/\^\{?3\}?/g, ' cubed ').replace(/\^\{([^{}]*)\}/g, ' to the power $1 ').replace(/\^(\w)/g, ' to the power $1 ');
    s = s.replace(/_\{([^{}]*)\}/g, ' $1 ').replace(/_(\w)/g, ' $1 ');
    const W = { int: 'the integral of', sum: 'the sum of', prod: 'the product of', lim: 'the limit', infty: 'infinity', to: 'tends to', rightarrow: 'gives', Rightarrow: 'implies', implies: 'implies', iff: 'if and only if', Leftrightarrow: 'if and only if', le: 'is less than or equal to', leq: 'is less than or equal to', ge: 'is greater than or equal to', geq: 'is greater than or equal to', lt: 'is less than', gt: 'is greater than', ne: 'is not equal to', neq: 'is not equal to', approx: 'is approximately', equiv: 'is identical to', times: 'times', cdot: 'times', div: 'divided by', pm: 'plus or minus', mp: 'minus or plus', in: 'in', therefore: 'therefore', because: 'because', sin: 'sine', cos: 'cos', tan: 'tan', sec: 'sec', cosec: 'cosec', csc: 'cosec', cot: 'cot', ln: 'log', log: 'log', exp: 'exp', sinh: 'shine', cosh: 'cosh', tanh: 'than', degree: 'degrees', circ: 'degrees', partial: 'partial', nabla: 'del', mathbb: '', vec: 'vector', overrightarrow: 'vector', hat: '', bar: 'bar', dot: 'dot', ldots: 'and so on', cdots: 'and so on', dots: 'and so on' };
    s = s.replace(/\\([a-zA-Z]+)/g, (m, w) => GREEK.includes(w) ? ' ' + w + ' ' : W[w] !== undefined ? ' ' + W[w] + ' ' : ' ');
    s = s.replace(/=/g, ' equals ').replace(/\+/g, ' plus ').replace(/(\s|^)-(?=\s*\S)/g, ' minus ').replace(/(\w)\s*-\s*(\w)/g, '$1 minus $2').replace(/</g, ' is less than ').replace(/>/g, ' is greater than ').replace(/\//g, ' over ').replace(/[{}$&\\]/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }
  // the readable text of a DOM node: rendered KaTeX becomes its TeX source read as words, raw $…$ likewise
  function plain(node) {
    const c = node.cloneNode(true);
    c.querySelectorAll('.katex-display, .katex').forEach(k => {
      if (!c.contains(k)) return; // already replaced with its display wrapper
      const a = k.querySelector('annotation'); k.replaceWith(document.createTextNode(' ' + texSay(a ? a.textContent : k.textContent) + ' '));
    });
    c.querySelectorAll('script, style, button, .walk-btn').forEach(x => x.remove());
    let t = c.textContent || '';
    t = t.replace(/\$\$([^$]+)\$\$|\$([^$]+)\$|\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g, (m, a, b, d, e) => ' ' + texSay(a || b || d || e) + ' ');
    return t.replace(/\s+/g, ' ').trim();
  }
  const sayOf = st => st.say != null && st.say !== '' ? String(st.say) : (() => { const d = document.createElement('div'); d.innerHTML = st.show || ''; return plain(d); })();

  function fromExample(el) {
    const q = el.querySelector('.exq'), lbl = el.querySelector('.lbl'), steps = [];
    if (q) steps.push({ say: `${lbl ? lbl.textContent.trim() + '. ' : ''}${plain(q)}`, show: `<div class="walk-q">${q.innerHTML}</div>` });
    el.querySelectorAll('ol.steps > li').forEach(li => steps.push({ say: plain(li), show: li.innerHTML }));
    const note = el.querySelector('.exnote'); if (note) steps.push({ say: plain(note), show: `<p class="walk-note">${note.innerHTML}</p>` });
    return steps;
  }

  function play(container, steps, opt = {}) {
    steps = (steps || []).filter(Boolean);
    const n = steps.length, title = opt.title || 'Walkthrough';
    container.innerHTML = `<div class="walk" tabindex="0" role="region" aria-label="${escH(title)} walkthrough player">
      <div class="walk-top"><b class="walk-title">${escH(title)}</b><span class="walk-count" aria-live="off">0 / ${n}</span></div>
      <div class="walk-stage" aria-live="polite"></div>
      <div class="walk-cap" aria-live="polite"><span class="walk-cap-t"></span></div>
      <div class="walk-scrub" role="slider" tabindex="0" aria-label="Step" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="1"><div class="walk-fill"></div>${steps.map((_, i) => `<button class="walk-mk" data-i="${i}" style="left:${n > 1 ? (i / n) * 100 : 0}%" aria-label="Step ${i + 1}" tabindex="-1"></button>`).join('')}</div>
      <div class="walk-ctl">
        <button class="walk-b" data-a="prev" aria-label="Previous step" title="Previous (←)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M19 5l-10 7 10 7z" fill="currentColor"/></svg></button>
        <button class="walk-b walk-pp" data-a="toggle" aria-label="Play" title="Play / pause (space)"><svg viewBox="0 0 24 24" aria-hidden="true" class="i-play"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg><svg viewBox="0 0 24 24" aria-hidden="true" class="i-pause"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor"/></svg></button>
        <button class="walk-b" data-a="next" aria-label="Next step" title="Next (→)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M5 5l10 7-10 7z" fill="currentColor"/></svg></button>
        <span class="walk-sp"></span>
        <label class="walk-speed" title="Speed"><span class="walk-vh">Speed</span><select data-a="speed">${SPEEDS.map(s => `<option value="${s}"${s === pref.rate ? ' selected' : ''}>${s}×</option>`).join('')}</select></label>
        <button class="walk-b walk-mute" data-a="mute" aria-pressed="${pref.muted}" aria-label="Mute narration" title="Mute (m)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path class="w-on" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/><path class="w-off" d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
      </div>
      ${synth() ? '' : '<p class="walk-nospeech">Narration isn\'t available in this browser, so captions play on a timer.</p>'}
    </div>`;
    const root = container.querySelector('.walk'), stage = root.querySelector('.walk-stage'), cap = root.querySelector('.walk-cap-t'), fill = root.querySelector('.walk-fill'), count = root.querySelector('.walk-count'), scrub = root.querySelector('.walk-scrub');
    let i = -1, playing = false, timer = 0, raf = 0, t0 = 0, dur = 1, utt = null, dead = false, token = 0;
    const words = s => (s.match(/\S+/g) || []).length;
    const estimate = s => Math.max(2200, words(s) * 400 + 700) / pref.rate; // ms at ≈150 wpm
    const stopTimers = () => { clearTimeout(timer); timer = 0; cancelAnimationFrame(raf); raf = 0; };
    const hush = () => { token++; const s = synth(); if (s && (utt || s.speaking)) { try { s.cancel(); } catch { } } utt = null; };
    const setFill = frac => { fill.style.width = `${Math.min(100, ((Math.max(0, i) + frac) / Math.max(1, n)) * 100)}%`; };
    const anim = () => { if (dead || !root.isConnected) return destroy(); setFill(Math.min(0.98, (performance.now() - t0) / dur)); raf = requestAnimationFrame(anim); };
    function render() {
      stage.querySelectorAll('.walk-step').forEach((el, k) => { el.classList.toggle('now', k === i); el.classList.toggle('past', k < i); el.hidden = k > i; });
      let cur = stage.querySelector(`.walk-step[data-i="${i}"]`);
      if (!cur && i >= 0) {
        for (let k = stage.children.length; k <= i; k++) {
          const d = document.createElement('div'); d.className = 'walk-step' + (k === i ? ' now' : ' past') + (reduced() ? '' : ' enter'); d.dataset.i = k;
          d.innerHTML = steps[k].show || `<p>${escH(sayOf(steps[k]))}</p>`; stage.append(d); math(d);
        }
        cur = stage.querySelector(`.walk-step[data-i="${i}"]`);
      }
      if (cur) { const top = cur.offsetTop - stage.offsetTop; stage.scrollTo ? stage.scrollTo({ top: Math.max(0, top - 12), behavior: reduced() ? 'auto' : 'smooth' }) : (stage.scrollTop = top); }
      cap.textContent = i >= 0 ? sayOf(steps[i]) : (n ? 'Press play to start the walkthrough.' : 'No steps to show.');
      count.textContent = `${Math.max(0, i + 1)} / ${n}`;
      scrub.setAttribute('aria-valuenow', String(Math.max(1, i + 1)));
      root.querySelectorAll('.walk-mk').forEach((m, k) => m.classList.toggle('done', k <= i));
      root.classList.toggle('playing', playing);
      const pp = root.querySelector('.walk-pp'); pp.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      root.querySelector('.walk-mute').setAttribute('aria-pressed', String(pref.muted)); root.classList.toggle('muted', pref.muted);
      root.querySelector('[data-a=prev]').disabled = i <= 0; root.querySelector('[data-a=next]').disabled = i >= n - 1;
      setFill(playing ? 0 : 1);
    }
    function speakStep() {
      stopTimers(); hush();
      if (!playing || i < 0) return;
      const text = sayOf(steps[i]), my = ++token, s = synth();
      dur = estimate(text); t0 = performance.now(); if (!reduced()) raf = requestAnimationFrame(anim);
      const done = () => { if (my !== token || dead || !playing) return; stopTimers(); setFill(1); timer = setTimeout(advance, 650 / pref.rate); };
      if (s && !pref.muted) {
        try {
          const u = new SpeechSynthesisUtterance(text); utt = u;
          u.lang = 'en-GB'; if (voice || pickVoice()) u.voice = voice; u.rate = pref.rate;
          u.onend = done; u.onerror = e => { if (my === token && e && e.error !== 'interrupted' && e.error !== 'canceled') { timer = setTimeout(done, dur); } };
          s.speak(u);
          timer = setTimeout(done, dur * 2.5 + 4000); // safety net if the engine never fires onend
        } catch { timer = setTimeout(done, dur); }
      } else timer = setTimeout(done, dur);
    }
    function advance() { if (i < n - 1) { i++; render(); speakStep(); } else { playing = false; stopTimers(); hush(); render(); setFill(1); cap.textContent = cap.textContent; } }
    function go(k, keepPlaying = playing) { if (!n) return; i = Math.max(0, Math.min(n - 1, k)); playing = keepPlaying; render(); if (playing) speakStep(); else { stopTimers(); hush(); setFill(1); } }
    function doPlay() { if (!n) return; if (i >= n - 1 && !playing) i = -1; playing = true; if (i < 0) i = 0; render(); speakStep(); }
    function pause() { playing = false; stopTimers(); hush(); render(); setFill(1); }
    function destroy() { if (dead) return; dead = true; playing = false; stopTimers(); hush(); document.removeEventListener('visibilitychange', onVis); }
    const onVis = () => { if (document.hidden && playing) pause(); };
    document.addEventListener('visibilitychange', onVis);
    root.addEventListener('click', e => {
      const b = e.target.closest('[data-a], .walk-mk'); if (!b || b.tagName === 'SELECT') return;
      if (b.classList.contains('walk-mk')) { e.stopPropagation(); return go(+b.dataset.i); }
      const a = b.dataset.a;
      if (a === 'toggle') playing ? pause() : doPlay();
      else if (a === 'prev') go(i - 1); else if (a === 'next') go(i + 1);
      else if (a === 'mute') { pref.muted = !pref.muted; keep(); render(); if (playing) speakStep(); }
    });
    scrub.addEventListener('click', e => { if (e.target.closest('.walk-mk')) return; const r = scrub.getBoundingClientRect(); go(Math.floor(((e.clientX - r.left) / Math.max(1, r.width)) * n)); });
    root.querySelector('select[data-a=speed]').addEventListener('change', e => { pref.rate = +e.target.value || 1; keep(); if (playing) speakStep(); });
    root.addEventListener('keydown', e => {
      if (e.target.tagName === 'SELECT' || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); playing ? pause() : doPlay(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); } else if (e.key === 'End') { e.preventDefault(); go(n - 1); }
      else if (e.key === 'm') { pref.muted = !pref.muted; keep(); render(); if (playing) speakStep(); }
    });
    render();
    if (n) { i = 0; render(); }
    if (opt.autoplay && n) doPlay();
    const ctl = { play: doPlay, pause, go: k => go(k), destroy, get index() { return i; }, get playing() { return playing; }, root };
    container._walk = ctl;
    return ctl;
  }

  // modal sheet
  let openCtl = null;
  function open(steps, opt = {}) {
    close();
    const back = document.createElement('div'); back.className = 'walk-modal'; back.setAttribute('role', 'dialog'); back.setAttribute('aria-modal', 'true'); back.setAttribute('aria-label', opt.title || 'Walkthrough');
    back.innerHTML = `<div class="walk-sheet"><button class="walk-x" aria-label="Close walkthrough" title="Close (Esc)">✕</button><div class="walk-host"></div></div>`;
    document.body.append(back); document.body.classList.add('walk-open');
    const prevFocus = document.activeElement;
    const ctl = play(back.querySelector('.walk-host'), steps, { ...opt, autoplay: opt.autoplay !== false });
    const shut = () => close();
    back.querySelector('.walk-x').onclick = shut;
    back.addEventListener('click', e => { if (e.target === back) shut(); });
    back.addEventListener('keydown', e => { if (e.key === 'Escape') { e.preventDefault(); shut(); } });
    const onHash = () => shut(); window.addEventListener('hashchange', onHash);
    openCtl = { ctl, back, done: () => { window.removeEventListener('hashchange', onHash); try { prevFocus && prevFocus.focus && prevFocus.focus(); } catch { } } };
    ctl.root.focus({ preventScroll: true });
    return ctl;
  }
  function close() { if (!openCtl) return; const o = openCtl; openCtl = null; o.ctl.destroy(); o.back.remove(); document.body.classList.remove('walk-open'); o.done(); }

  function enhance(container) {
    if (!container) return 0;
    let k = 0;
    container.querySelectorAll('.box.ex').forEach(ex => {
      if (ex.querySelector(':scope > .walk-btn')) return;
      if (!ex.querySelector('ol.steps > li')) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'walk-btn'; b.innerHTML = '<span aria-hidden="true">▶</span> Watch';
      const lbl = ex.querySelector('.lbl'); b.setAttribute('aria-label', `Watch ${lbl ? lbl.textContent.trim() : 'this worked example'} as a narrated walkthrough`);
      b.onclick = () => open(fromExample(ex), { title: lbl ? lbl.textContent.trim() : 'Worked example' });
      if (lbl) lbl.after(b); else ex.prepend(b);
      k++;
    });
    return k;
  }

  return { play, open, close, fromExample, enhance, texSay, plain, sayOf };
})();
