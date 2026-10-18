// Graph tab and Lab grapher. By default the BCSFM grapher (graph.js) is used: presets load instantly and it works offline.
// If you have a Desmos API key (Settings → Calculator & graphs) and choose Desmos there, the same presets load into
// the real Desmos calculator instead. "Copy for Desmos" works either way.
'use strict';

const DESMOS_KEY_STORE = 'bcsfm-desmos-key';
const getDesmosKey = () => { try { return localStorage.getItem(DESMOS_KEY_STORE) || ''; } catch { return ''; } };
const DESMOS_PRESETS = GRAPH_PRESETS; // older code paths look for this name

let desmosLoading = null;
function loadDesmosAPI(key) {
  if (window.Desmos) return Promise.resolve(window.Desmos);
  if (desmosLoading) return desmosLoading;
  desmosLoading = new Promise((res, rej) => { const s = document.createElement('script'); s.src = `https://www.desmos.com/api/v1.9/calculator.js?apiKey=${encodeURIComponent(key)}`; s.onload = () => (window.Desmos ? res(window.Desmos) : rej(new Error('no Desmos'))); s.onerror = () => { desmosLoading = null; rej(new Error('Desmos API failed to load')); }; document.head.append(s); });
  return desmosLoading;
}

const useDesmos = () => typeof PREFS !== 'undefined' && PREFS.graph === 'desmos' && !!getDesmosKey();
function mountGraphTab(el, presets, opts = {}) { return useDesmos() ? mountDesmosAPI(el, presets) : mountGraph(el, presets, opts); }

// Real Desmos via the API (only with your own key)
function mountDesmosAPI(el, presets) {
  const groups = Array.isArray(presets) ? { '': presets } : presets, flat = Object.entries(groups).flatMap(([g, ps]) => ps.map(p => ({ ...p, label: (g ? g + ' — ' : '') + p.title })));
  el.innerHTML = `<div class="dz"><div class="dz-side"><label class="lf"><span>Preset</span><select class="dz-sel">${flat.map((p, i) => `<option value="${i}">${esc(p.label)}</option>`).join('')}</select></label><p class="dz-note muted small"></p><p class="muted small">Using Desmos with your API key. Switch back to the BCSFM grapher in <a href="#/settings">Settings</a>.</p></div><div class="dz-frame"><div class="dz-calc" style="width:100%;height:520px"></div></div></div>`;
  let calc = null, alive = true; const sel = el.querySelector('.dz-sel');
  const load = () => { const p = flat[+sel.value]; el.querySelector('.dz-note').textContent = p.note || ''; if (!calc) return; calc.setBlank(); calc.updateSettings({ degreeMode: !!p.deg }); p.exprs.forEach((src, i) => calc.setExpression({ id: 'e' + i, latex: G_.toDesmos(src) })); if (p.bounds) calc.setMathBounds({ left: p.bounds[0], right: p.bounds[1], bottom: p.bounds[2], top: p.bounds[3] }); };
  sel.onchange = load;
  loadDesmosAPI(getDesmosKey()).then(D => { if (!alive) return; calc = D.GraphingCalculator(el.querySelector('.dz-calc'), { expressionsCollapsed: false }); load(); }).catch(() => { el.querySelector('.dz-frame').innerHTML = '<p class="lab-err">Desmos could not load (check the API key and your connection). Using the BCSFM grapher instead.</p>'; const box = document.createElement('div'); el.append(box); mountGraph(box, presets); });
  load();
  return () => { alive = false; if (calc) calc.destroy(); };
}

LAB.graph = {
  title: 'Interactive grapher', icon: '📈', course: 'both', desc: 'Desmos-style graphing: type expressions, sliders appear automatically, drag points, see roots, turning points and intersections. Every spec preset for both courses, or a blank graph.',
  mount(el) {
    const groups = {};
    for (const id of COURSE_ORDER) for (const p of COURSES[id].points) if (GRAPH_PRESETS[p.id]) groups[`${COURSES[id].short} ${p.code} ${p.title}`] = GRAPH_PRESETS[p.id];
    return mountGraphTab(el, groups, { free: true });
  },
};
// show the grapher first in the Lab
{ const rest = { ...LAB }; Object.keys(LAB).forEach(k => delete LAB[k]); LAB.graph = rest.graph; Object.assign(LAB, rest); }
