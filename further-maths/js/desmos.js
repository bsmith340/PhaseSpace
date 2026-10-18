// Desmos integration: per-point presets, an embedded calculator, and a Lab tab.
// Without an API key the free embed (iframe) is used and presets are copied to the clipboard to paste in.
// With your own free Desmos API key (Lab → Desmos → settings) presets load directly into the graph.
'use strict';

const DESMOS_KEY_STORE = 'bcsfm-desmos-key';
const getDesmosKey = () => { try { return localStorage.getItem(DESMOS_KEY_STORE) || ''; } catch { return ''; } };
const P_ = (title, note, exprs, bounds) => ({ title, note, exprs, bounds });

const DESMOS_PRESETS = {
  /* ---------- Further Maths A2 1 ---------- */
  cx1: [P_('Multiplying complex numbers', 'Drag the sliders: zw has modulus |z||w| and argument arg z + arg w.', ['r_1=2', 'a_1=0.5', 'r_2=1.5', 'a_2=1', 'Z=(r_1\\cos a_1,r_1\\sin a_1)', 'W=(r_2\\cos a_2,r_2\\sin a_2)', 'P=(r_1r_2\\cos(a_1+a_2),r_1r_2\\sin(a_1+a_2))', 'x^2+y^2=1'], [-5, 5, -5, 5])],
  cx2: [P_('cos 5θ as a polynomial in cos θ', 'The two curves coincide: cos 5θ = 16cos⁵θ − 20cos³θ + 5cos θ.', ['y=\\cos(5x)', 'y=16\\cos(x)^5-20\\cos(x)^3+5\\cos(x)'], [-4, 4, -1.5, 1.5]),
    P_('tan 3θ identity', 'tan 3θ = (3t − t³)/(1 − 3t²) with t = tan θ.', ['y=\\tan(3x)', 'y=\\frac{3\\tan(x)-\\tan(x)^3}{1-3\\tan(x)^2}'], [-3, 3, -6, 6]),
    P_('Powers of z spiral', 'z^k for k = 0…n: modulus rᵏ, argument kθ.', ['r=1.1', 'a=0.5', 'n=12', 'K=[0...n]', '(r^K\\cos(aK),r^K\\sin(aK))'], [-4, 4, -4, 4])],
  cx3: [P_('Roots of zⁿ = R e^{iφ}', 'A regular n-gon of radius R^{1/n}. Change n, R and φ.', ['n=5', 'R=8', 'f=1', 'K=[0...n-1]', 'P=(R^{1/n}\\cos((f+2\\pi K)/n),R^{1/n}\\sin((f+2\\pi K)/n))', '\\operatorname{polygon}(P)', 'A=\\frac{n}{2}R^{2/n}\\sin(2\\pi/n)'], [-3, 3, -3, 3]),
    P_('Off-centre polygon c + (v − c)ωᵏ', 'Centre c = (p, q), first vertex v = (s, t).', ['n=4', 'p=2', 'q=1', 's=4', 't=2', 'K=[0...n-1]', 'Q=(p+(s-p)\\cos(2\\pi K/n)-(t-q)\\sin(2\\pi K/n),q+(s-p)\\sin(2\\pi K/n)+(t-q)\\cos(2\\pi K/n))', '\\operatorname{polygon}(Q)', '(p,q)'], [-3, 7, -4, 6])],
  pl1: [P_('Limaçon family', 'r = a(p + q cos θ): q = p gives a cardioid; p ≥ 2q is convex.', ['a=1', 'p=1', 'q=1', 'r=a(p+q\\cos\\theta)'], [-3, 3, -3, 3]),
    P_('Rose curves', 'r = a cos nθ.', ['a=2', 'n=3', 'r=a\\cos(n\\theta)'], [-3, 3, -3, 3])],
  pl2: [P_('Area of a polar region', 'Shaded: ½∫r²dθ between α and β (value shown as A).', ['a=2', 'b_1=0', 'b_2=\\pi', 'r=a(1+\\cos\\theta)', 'r\\le a(1+\\cos\\theta)\\left\\{b_1\\le\\theta\\le b_2\\right\\}', 'A=\\frac{1}{2}\\int_{b_1}^{b_2}(a(1+\\cos t))^2dt'], [-2, 5, -3, 3])],
  pl3: [P_('Tangents parallel to the initial line', 'y = r sin θ is stationary where the tangent is horizontal.', ['a=2', 'r=a(1+\\cos\\theta)', 'y=a(1+\\cos(\\pi/3))\\sin(\\pi/3)', 'y=-a(1+\\cos(\\pi/3))\\sin(\\pi/3)'], [-2, 5, -3, 3])],
  hy1: [P_('sinh, cosh, tanh', 'Note cosh x ≥ 1, |tanh x| < 1.', ['y=\\sinh(x)', 'y=\\cosh(x)', 'y=\\tanh(x)', 'y=\\frac{e^x}{2}'], [-4, 4, -4, 4]),
    P_('The unit hyperbola', '(cosh t, sinh t) lies on x² − y² = 1.', ['x^2-y^2=1', 't=1', '(\\cosh(t),\\sinh(t))'], [-1, 5, -3, 3])],
  hy2: [P_('Inverse hyperbolics as logs', 'Each pair of curves coincides.', ['y=\\operatorname{arcsinh}(x)', 'y=\\ln(x+\\sqrt{x^2+1})', 'y=\\operatorname{arccosh}(x)', 'y=\\ln(x+\\sqrt{x^2-1})'], [-4, 4, -3, 3])],
  hy3: [P_('Solving a cosh x + b sinh x = c', 'Intersections are the solutions.', ['a=5', 'b=-3', 'c=5', 'y=a\\cosh(x)+b\\sinh(x)', 'y=c'], [-3, 3, -2, 12])],
  sr1: [P_('Maclaurin polynomials of eˣ', 'Increase n and watch the polynomial hug the curve.', ['n=3', 'y=e^x', 'y=\\sum_{k=0}^{n}\\frac{x^k}{k!}'], [-5, 5, -2, 10]),
    P_('Maclaurin polynomials of sin x', '', ['n=3', 'y=\\sin(x)', 'y=\\sum_{k=0}^{n}\\frac{(-1)^kx^{2k+1}}{(2k+1)!}'], [-8, 8, -3, 3]),
    P_('ln(1 + x) — radius of convergence', 'Beyond x = 1 the polynomials peel away however large n is.', ['n=6', 'y=\\ln(1+x)', 'y=\\sum_{k=1}^{n}\\frac{(-1)^{k+1}x^k}{k}'], [-1.5, 3, -3, 2])],
  ca5: [P_('Improper integral ∫₁^∞ x^{-p} dx', 'p > 1 converges to 1/(p − 1); push t larger.', ['p=2', 't=10', 'y=x^{-p}\\left\\{x>0\\right\\}', '0\\le y\\le x^{-p}\\left\\{1\\le x\\le t\\right\\}', 'I=\\int_{1}^{t}x^{-p}dx'], [0, 12, -0.5, 2])],
  de1: [P_('Family of solutions', "y = eˣ/3 + Ce^{−2x} solves y′ + 2y = eˣ. Vary C.", ['C=1', 'y=\\frac{e^x}{3}+Ce^{-2x}'], [-2, 3, -4, 6])],
  de2: [P_('Damping regimes', 'y = e^{−kx}cos(wx): change k and w.', ['k=0.5', 'w=3', 'y=e^{-kx}\\cos(wx)', 'y=e^{-kx}', 'y=-e^{-kx}'], [0, 10, -1.5, 1.5])],
  de4: [P_('Simple harmonic motion', 'x = R cos(ωt − φ).', ['R=2', 'w=1.5', 'f=0.5', 'y=R\\cos(wx-f)'], [0, 10, -3, 3])],
  /* ---------- Maths AS 1 ---------- */
  m_quad: [P_('Completed square form', 'Vertex (−p, q). Compare with the general form.', ['a=1', 'p=-2', 'q=-1', 'y=a(x+p)^2+q', '(-p,q)'], [-5, 8, -5, 8]),
    P_('Discriminant', 'Number of x-intercepts = sign of b² − 4ac.', ['a=1', 'b=2', 'c=-3', 'y=ax^2+bx+c', 'D=b^2-4ac'], [-6, 6, -6, 6])],
  m_sim: [P_('Line meets curve', 'Intersections = solutions of the simultaneous equations.', ['m=1', 'c=1', 'y=x^2-2x', 'y=mx+c'], [-4, 6, -3, 10])],
  m_ineq: [P_('Quadratic inequality', 'Shaded where the quadratic is negative.', ['y=x^2-x-6', 'y<0\\left\\{x^2-x-6<0\\right\\}'], [-5, 6, -8, 6])],
  m_poly: [P_('Factor theorem', 'Roots of the cubic ↔ linear factors.', ['a=1', 'b=-2', 'c=-5', 'd=6', 'f(x)=ax^3+bx^2+cx+d', 'y=f(x)'], [-4, 5, -12, 12])],
  m_graph: [P_('Transformations y = a f(b(x − c)) + d', 'Base f(x) = x³ − 3x. Change one parameter at a time.', ['a=1', 'b=1', 'c=0', 'd=0', 'f(x)=x^3-3x', 'y=f(x)', 'y=af(b(x-c))+d'], [-5, 5, -6, 6])],
  m_line: [P_('Perpendicular lines', 'm₁m₂ = −1.', ['m=2', 'c=1', 'y=mx+c', 'y=-\\frac{1}{m}x+3'], [-6, 6, -6, 6])],
  m_circ: [P_('Circle and line', 'Tangent ⇔ the line touches once.', ['a=1', 'b=2', 'r=3', '(x-a)^2+(y-b)^2=r^2', 'm=1', 'c=0', 'y=mx+c'], [-6, 8, -5, 8])],
  m_tgraph: [P_('y = a sin(b(x − c)) + d', 'Amplitude, period 2π/b, phase shift, vertical shift (radians).', ['a=2', 'b=1', 'c=0', 'd=0', 'y=a\\sin(b(x-c))+d'], [-7, 7, -4, 4])],
  m_teq: [P_('Solutions of sin x = k', 'Every intersection is a solution; read off those in the range.', ['k=0.5', 'y=\\sin(x)', 'y=k'], [0, 6.3, -1.5, 1.5])],
  m_exp: [P_('Exponentials', 'All pass through (0, 1); y = 0 is an asymptote.', ['a=2', 'y=a^x', 'y=e^x', 'y=a^{-x}'], [-4, 4, -1, 8])],
  m_log: [P_('Logs are inverse exponentials', 'Reflection in y = x.', ['a=2', 'y=a^x', 'y=\\log_{a}(x)', 'y=x'], [-4, 6, -4, 6])],
  m_model: [P_('Linearising y = axⁿ', 'Plot of log y against log x is a straight line of gradient n.', ['a=2', 'n=1.5', 'y=\\log(a)+nx'], [-1, 2, -1, 4])],
  m_dfp: [P_('Chord → tangent (first principles)', 'Shrink h towards 0: the chord gradient approaches f′(a).', ['f(x)=x^2', 'a=1', 'h=1', 'y=f(x)', 'A=(a,f(a))', 'B=(a+h,f(a+h))', 'y=\\frac{f(a+h)-f(a)}{h}(x-a)+f(a)', 'g=\\frac{f(a+h)-f(a)}{h}'], [-3, 4, -2, 8])],
  m_dx: [P_('Tangent and normal', 'Tangent gradient f′(a); normal −1/f′(a).', ['f(x)=x^3-3x+1', 'a=1.5', 'y=f(x)', 'y=f\'(a)(x-a)+f(a)', 'y=-\\frac{1}{f\'(a)}(x-a)+f(a)'], [-4, 4, -4, 6])],
  m_stat: [P_('f and f′ together', "Stationary points of f line up with the roots of f′.", ['f(x)=x^3-3x^2+1', 'y=f(x)', "y=f'(x)"], [-3, 5, -6, 6])],
  m_area: [P_('Area under a curve', 'Signed area; split at roots for total area.', ['a=0', 'b=3', 'f(x)=x^2-4x+3', 'y=f(x)', '0\\le y\\le f(x)\\left\\{a\\le x\\le b\\right\\}', 'f(x)\\le y\\le0\\left\\{a\\le x\\le b\\right\\}', 'I=\\int_{a}^{b}f(x)dx'], [-1, 5, -2, 4])],
  m_vec: [P_('Adding vectors', 'a + b is the diagonal of the parallelogram.', ['A=(3,1)', 'B=(1,2)', '\\operatorname{vector}((0,0),A)', '\\operatorname{vector}((0,0),B)', '\\operatorname{vector}((0,0),A+B)'], [-1, 6, -1, 5])],
};

let desmosLoading = null;
function loadDesmosAPI(key) {
  if (window.Desmos) return Promise.resolve(window.Desmos);
  if (desmosLoading) return desmosLoading;
  desmosLoading = new Promise((res, rej) => { const s = document.createElement('script'); s.src = `https://www.desmos.com/api/v1.9/calculator.js?apiKey=${encodeURIComponent(key)}`; s.onload = () => (window.Desmos ? res(window.Desmos) : rej(new Error('no Desmos'))); s.onerror = () => { desmosLoading = null; rej(new Error('Desmos API failed to load')); }; document.head.append(s); });
  return desmosLoading;
}

// presets: array of P_ objects (or object {group: [..]} for the lab)
function mountDesmos(el, presets, { showSettings = false } = {}) {
  const groups = Array.isArray(presets) ? [['', presets]] : Object.entries(presets);
  const all = groups.flatMap(([g, ps]) => ps.map(p => ({ ...p, group: g })));
  const key = getDesmosKey();
  el.innerHTML = `<div class="dz">
    <div class="dz-main"><div class="dz-frame"></div>
      <div class="lab-row"><a class="btn small ghost" href="https://www.desmos.com/calculator" target="_blank" rel="noopener">Open Desmos in a new tab ↗</a><span class="muted small dz-mode"></span></div></div>
    <div class="dz-side">
      ${all.length ? `<label class="lf"><span>Preset</span><select class="dz-sel">${(() => { let i = 0; return groups.map(([g, ps]) => (g ? `<optgroup label="${esc(g)}">` : '') + ps.map(p => `<option value="${i++}">${esc(p.title)}</option>`).join('') + (g ? '</optgroup>' : '')).join(''); })()}</select></label>
      <div class="dz-note muted"></div><pre class="dz-code"></pre>
      <div class="lab-row"><button class="btn small primary dz-load">Load into Desmos</button><button class="btn small dz-copy">Copy expressions</button></div>
      <p class="muted small dz-help"></p>` : ''}
      ${showSettings ? `<details class="box dz-set"><summary><b>Desmos settings</b></summary>
        <p class="small">The free embed can't be pre-filled, so presets are copied for you to paste (click in Desmos, Ctrl/Cmd+V). With your own <b>free</b> Desmos API key, presets load straight into the graph. Request one at <a href="https://www.desmos.com/my-api" target="_blank" rel="noopener">desmos.com/my-api</a>, then paste it here (stored only in this browser).</p>
        <div class="lab-row"><input class="dz-key" placeholder="Desmos API key" value="${key.replace(/"/g, '')}"><button class="btn small dz-savekey">Save key</button></div></details>` : ''}
    </div></div>`;
  const frame = el.querySelector('.dz-frame'), mode = el.querySelector('.dz-mode');
  let calc = null;
  const useIframe = () => { frame.innerHTML = `<iframe src="https://www.desmos.com/calculator" title="Desmos graphing calculator" allowfullscreen loading="lazy"></iframe>`; mode.textContent = 'Free embed — use "Copy expressions" then paste into Desmos.'; };
  if (key) {
    mode.textContent = 'Loading Desmos API…';
    loadDesmosAPI(key).then(D => { frame.innerHTML = ''; const host = document.createElement('div'); host.className = 'dz-api'; frame.append(host); calc = D.GraphingCalculator(host, { expressionsCollapsed: false, settingsMenu: true }); mode.textContent = 'Desmos API connected — presets load directly.'; if (all.length) load(); }).catch(() => useIframe());
  } else useIframe();
  const sel = el.querySelector('.dz-sel');
  const cur = () => all[sel ? +sel.value : 0];
  function show() { if (!sel) return; const p = cur(); el.querySelector('.dz-note').textContent = p.note || ''; el.querySelector('.dz-code').textContent = p.exprs.join('\n'); el.querySelector('.dz-help').textContent = calc ? '' : 'Click "Copy expressions", click into the Desmos expression list and paste. Each line becomes one expression; numbers like a=2 become sliders.'; }
  function load() { const p = cur(); if (!calc) { copy(); return; } calc.setBlank(); p.exprs.forEach((latex, i) => calc.setExpression({ id: 'e' + i, latex })); if (p.bounds) calc.setMathBounds({ left: p.bounds[0], right: p.bounds[1], bottom: p.bounds[2], top: p.bounds[3] }); }
  function copy() { const txt = cur().exprs.join('\n'); const btn = el.querySelector('.dz-copy'); const done = () => { btn.textContent = 'Copied ✓ — now paste into Desmos'; setTimeout(() => (btn.textContent = 'Copy expressions'), 2500); }; if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done)); else fallbackCopy(txt, done); }
  function fallbackCopy(txt, done) { const ta = document.createElement('textarea'); ta.value = txt; document.body.append(ta); ta.select(); try { document.execCommand('copy'); done(); } catch { } ta.remove(); }
  if (sel) { sel.onchange = () => { show(); if (calc) load(); }; el.querySelector('.dz-load').onclick = load; el.querySelector('.dz-copy').onclick = copy; show(); }
  const sk = el.querySelector('.dz-savekey'); if (sk) sk.onclick = () => { try { localStorage.setItem(DESMOS_KEY_STORE, el.querySelector('.dz-key').value.trim()); } catch { } location.reload(); };
  return () => { if (calc) calc.destroy(); };
}

const LAB_REST = { ...LAB }; Object.keys(LAB).forEach(k => delete LAB[k]);
LAB.desmos = {
  title: 'Desmos', icon: '📈', desc: 'The full Desmos graphing calculator, with ready-made presets for both courses.',
  mount(el) {
    const groups = {};
    for (const id of COURSE_ORDER) for (const p of COURSES[id].points) if (DESMOS_PRESETS[p.id]) (groups[`${COURSES[id].short} ${p.code} ${p.title}`] = DESMOS_PRESETS[p.id]);
    return mountDesmos(el, groups, { showSettings: true });
  },
};
Object.assign(LAB, LAB_REST);
