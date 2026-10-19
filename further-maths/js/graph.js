// BcsMaths Graph — a Desmos-style interactive grapher that runs entirely in the page (no key, works offline).
// One expression per line:
//   a = 2 [0, 5]            slider (optional range)        f(x) = x^3 - 3x       function you can reuse
//   y = a(x - p)^2 + q      curve y = f(x)                 x = y^2 - 1           curve x = g(y)
//   r = 2(1 + cos(θ))       polar curve                    x^2 + y^2 = 25        implicit curve
//   y < x^2 - 4  ·  0 < y < f(x) {1 <= x <= 3}   shaded region (chains allowed, {…} restricts)
//   (a, b)                  point — draggable if both coordinates are sliders
//   (cos(t), sin(2t))       parametric curve (t from 0 to 2π, or restrict {0 <= t <= T})
//   (cos(2πk/n), sin(2πk/n)) for k = 0..n-1      list of points;  polygon(...) for k = …   closed polygon
//   vector((0,0), (a,b)) · segment(P, Q)          arrows and line segments
//   A = int(x^2, 0, 3) · S = sum(1/k^2, k, 1, n)  computed values (sum also works inside curves)
'use strict';

const GRAPH_RESERVED = new Set(['x', 'y', 't', 'r', 'theta', 'e', 'i', 'pi', 'ans']);
const GRAPH_COLORS = ['#3b6cff', '#e5484d', '#12a37f', '#e59a00', '#8e4ec6', '#0091c2', '#d6409f', '#666'];

const G_ = {
  matchParen(s, i) { let d = 0; for (let j = i; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')') { d--; if (!d) return j; } } return -1; },
  splitTop(s, sep = ',') { const out = []; let d = 0, cur = ''; for (const c of s) { if (c === '(' || c === '[' || c === '{') d++; if (c === ')' || c === ']' || c === '}') d--; if (c === sep && d === 0) { out.push(cur); cur = ''; } else cur += c; } out.push(cur); return out.map(x => x.trim()); },
  subVar(body, v, val) { return body.replace(new RegExp(`(^|[^A-Za-z_])${v}(?![A-Za-z_0-9])`, 'g'), `$1(${val})`); },
  // inline user functions f(…) and expand sum(body, k, lo, hi) / int(body, lo, hi) using current slider values
  expand(src, fns, env, vars, depth = 0) {
    if (depth > 8) throw new Error('functions nest too deeply');
    let s = src.replace(/π/g, 'pi').replace(/θ/g, 'theta').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/[−–]/g, '-').replace(/·/g, '*');
    for (const name of ['sum', 'int']) {
      let i; while ((i = s.search(new RegExp(`(^|[^A-Za-z_])${name}\\(`))) >= 0) {
        const st = s.indexOf(name + '(', i), cl = G_.matchParen(s, st + name.length); if (cl < 0) throw new Error(`missing ) in ${name}`);
        const args = G_.splitTop(s.slice(st + name.length + 1, cl)); let rep;
        if (name === 'sum') { if (args.length !== 4) throw new Error('sum(body, k, from, to)'); const [b, k, lo, hi] = args, L = Math.round(G_.num(lo, fns, env, vars)), H = Math.round(G_.num(hi, fns, env, vars)); if (H - L > 200) throw new Error('sum has too many terms'); const terms = []; for (let j = L; j <= H; j++) terms.push(`(${G_.subVar(b, k, j)})`); rep = terms.length ? `(${terms.join('+')})` : '0'; }
        else { if (args.length !== 3) throw new Error('int(body, from, to)'); const [b, lo, hi] = args, v = /(^|[^A-Za-z_])t(?![A-Za-z_])/.test(b) && !/(^|[^A-Za-z_])x(?![A-Za-z_])/.test(b) ? 't' : 'x', f = G_.fn(b, fns, env, [...vars, v]), a = G_.num(lo, fns, env, vars), c = G_.num(hi, fns, env, vars); rep = `(${integrate(xx => f({ ...env, [v]: xx }), a, c)})`; }
        s = s.slice(0, st) + rep + s.slice(cl + 1);
      }
    }
    for (const [name, [param, body]] of Object.entries(fns)) {
      let guard = 0, i;
      while ((i = s.search(new RegExp(`(^|[^A-Za-z_])${name}\\(`))) >= 0 && guard++ < 50) {
        const st = s.indexOf(name + '(', i), cl = G_.matchParen(s, st + name.length); if (cl < 0) throw new Error(`missing ) after ${name}`);
        s = s.slice(0, st) + `(${G_.expand(G_.subVar(body, param, s.slice(st + name.length + 1, cl)), fns, env, vars, depth + 1)})` + s.slice(cl + 1);
      }
    }
    return s;
  },
  fn(src, fns, env, vars, deg) { const e = G_.expand(src, fns, env, vars); return compileReal(parse(e, vars), { deg }); },
  num(src, fns, env, vars) { const v = G_.fn(src, fns, env, vars)(env); if (!isFinite(v)) throw new Error(`"${src}" is not a number`); return v; },
  niceStep(span) { const raw = span / 8, p = Math.pow(10, Math.floor(Math.log10(raw))); return [1, 2, 5, 10].map(m => m * p).find(s => s >= raw) || raw; },
  toDesmos(src) {
    let s = src.trim().replace(/θ/g, 'theta').replace(/π/g, 'pi').replace(/\s*\[[^\]]*\]\s*$/, '');
    const fnTo = (name, open, close) => { let i; while ((i = s.search(new RegExp(`(^|[^A-Za-z\\\\])${name}\\(`))) >= 0) { const st = s.indexOf(name + '(', i), cl = G_.matchParen(s, st + name.length); if (cl < 0) break; s = s.slice(0, st) + open(G_.splitTop(s.slice(st + name.length + 1, cl))) + close + s.slice(cl + 1); } };
    fnTo('sqrt', a => `\\sqrt{${a[0]}}`, '');
    fnTo('sum', a => `\\left(\\sum_{${a[1]}=${a[2]}}^{${a[3]}}${a[0]}\\right)`, '');
    fnTo('int', a => `\\int_{${a[1]}}^{${a[2]}}${a[0]}d${/(^|[^A-Za-z])t(?![A-Za-z])/.test(a[0]) && !/(^|[^A-Za-z])x(?![A-Za-z])/.test(a[0]) ? 't' : 'x'}`, '');
    s = s.replace(/\bfor\s+([a-z])\s*=\s*(.+?)\s*\.\.\s*(.+)$/, (m, v, a, b) => `\\operatorname{for}${v}=\\left[${a}...${b}\\right]`)
      .replace(/\b(polygon|nCr|ncr)\(/g, (m, f) => `\\operatorname{${f === 'ncr' ? 'nCr' : f}}(`)
      .replace(/\b(arsinh|arcosh|artanh)\(/g, (m, f) => `\\operatorname{arc${f.slice(2)}}(`)
      .replace(/\b(sinh|cosh|tanh|arcsin|arccos|arctan|sin|cos|tan|ln|log|exp)\b/g, '\\$1').replace(/\bpi\b/g, '\\pi').replace(/\btheta\b/g, '\\theta')
      .replace(/<=/g, '\\le ').replace(/>=/g, '\\ge ').replace(/\*/g, '\\cdot ').replace(/\b([A-Za-z])(\d+)\b/g, '$1_{$2}');
    return s;
  },
  fmt: v => (Math.abs(v) < 1e-10 ? '0' : Math.abs(v) >= 1e5 || Math.abs(v) < 1e-3 ? v.toPrecision(4) : (+v.toFixed(4)).toString()),
};

function mountGraph(el, presets, { free = false } = {}) {
  const groups = Array.isArray(presets) ? { '': presets } : presets, keys = Object.keys(groups);
  let gi = 0, pi = 0, items = [], view = null, deg = false, keyPts = true, deleted = false;
  el.innerHTML = `<div class="gx">
    <div class="gx-side">
      ${keys.length > 1 || (groups[keys[0]] || []).length > 1 ? `<label class="lf"><span>Preset</span><select class="gx-preset">${keys.map((k, i) => groups[k].map((p, j) => `<option value="${i}:${j}">${k ? k + ' — ' : ''}${p.title}</option>`).join('')).join('')}${free ? '<option value="free">✎ Blank graph</option>' : ''}</select></label>` : `<h4 class="gx-title"></h4>`}
      <p class="gx-note muted small"></p>
      <div class="gx-list"></div>
      <div class="row gx-btns"><button class="btn small gx-add">+ Expression</button><button class="btn small gx-reset">↺ Reset preset</button></div>
      <div class="row gx-btns"><label class="radio small"><input type="checkbox" class="gx-key" checked> key points</label><label class="radio small"><input type="checkbox" class="gx-deg"> degrees</label></div>
      <div class="row gx-btns"><button class="btn small gx-copy">Copy for Desmos</button><a class="btn small ghost" href="https://www.desmos.com/calculator" target="_blank" rel="noopener">Open Desmos ↗</a></div>
      <details class="gx-help"><summary>How to type expressions</summary><ul class="small">
        <li><code>a = 2 [0, 5]</code> slider · <code>f(x) = x^3 - 3x</code> function</li><li><code>y = …</code>, <code>x = …</code>, <code>r = …θ…</code>, <code>x^2 + y^2 = 9</code></li>
        <li><code>0 &lt; y &lt; f(x) {1 &lt;= x &lt;= 3}</code> shaded region</li><li><code>(a, b)</code> draggable point · <code>(cos(t), sin(t))</code> parametric</li>
        <li><code>(…k…) for k = 0..n-1</code>, <code>polygon(…) for k = …</code>, <code>vector((0,0),(a,b))</code></li><li><code>A = int(x^2, 0, 3)</code>, <code>sum(x^k/k!, k, 0, n)</code></li></ul></details>
    </div>
    <div class="gx-stage"><div class="gx-zoom"><button title="Zoom in">+</button><button title="Zoom out">−</button><button title="Reset view">⌂</button></div><div class="gx-tip" hidden></div></div></div>`;
  const stage = el.querySelector('.gx-stage'), P = makeCanvas(stage, 1.15), list = el.querySelector('.gx-list'), tip = el.querySelector('.gx-tip');
  const cur = () => (gi < 0 ? { title: 'Blank graph', note: 'Type your own expressions.', exprs: ['y = x^2', ''], bounds: [-10, 10, -7, 7], equal: true } : groups[keys[gi]][pi]);

  function load() {
    const p = cur(); deg = !!p.deg; el.querySelector('.gx-deg').checked = deg;
    items = p.exprs.map((src, i) => ({ src, on: true, col: GRAPH_COLORS[i % GRAPH_COLORS.length] }));
    const b = p.bounds || [-10, 10, -7, 7]; view = { x0: b[0], x1: b[1], y0: b[2], y1: b[3] };
    const t = el.querySelector('.gx-title'); if (t) t.textContent = p.title; el.querySelector('.gx-note').textContent = p.note || '';
    renderList(); draw();
  }
  // classify + compile every line against the current slider values
  function analyse() {
    const fns = {}, env = {}, out = [];
    for (const it of items) { it.err = ''; it.kind = ''; it.value = undefined; }
    for (const it of items) { // pass 1: sliders and functions
      const s = it.src.trim().replace(/θ/g, 'theta'); let m;
      if ((m = /^([A-Za-z][A-Za-z0-9_]*)\s*=\s*(-?\d*\.?\d+(?:e-?\d+)?)\s*(?:\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*(?:,\s*([\d.]+)\s*)?\])?$/.exec(s)) && !GRAPH_RESERVED.has(m[1])) {
        const v = +m[2]; it.kind = 'slider'; it.name = m[1];
        if (m[3] !== undefined) { it.min ??= +m[3]; it.max ??= +m[4]; it.step ??= m[5] !== undefined ? +m[5] : undefined; } else { it.min ??= Math.min(-10, v < 0 ? v * 2 : -10); it.max ??= Math.max(10, v > 0 ? v * 2 : 10); }
        it.val = v; env[m[1]] = v;
      } else if ((m = /^([A-Za-z][A-Za-z0-9_]*)\(\s*([a-z]|theta)\s*\)\s*=(.+)$/.exec(s))) { it.kind = 'fn'; fns[m[1]] = [m[2], m[3]]; }
    }
    const sl = Object.keys(env), V = [...new Set(['x', 'y', 't', 'theta', 'r', 'k', ...sl])];
    const compile = src => G_.fn(src, fns, env, V, deg);
    const restrict = txt => { if (!txt) return () => true; const conds = G_.splitTop(txt.replace(/^\{|\}$/g, ''), ',').map(chain); return e => conds.every(c => c(e)); };
    const chain = txt => { const parts = txt.split(/(<=|>=|<|>)/).map(x => x.trim()); if (parts.length < 3) throw new Error('restriction needs <, >, ≤ or ≥'); const fs = [], ops = []; parts.forEach((p, i) => (i % 2 ? ops.push(p) : fs.push(compile(p)))); return e => ops.every((op, i) => { const a = fs[i](e), b = fs[i + 1](e); return op === '<' ? a < b : op === '<=' ? a <= b + 1e-12 : op === '>' ? a > b : a >= b - 1e-12; }); };
    const has = (src, v) => new RegExp(`(^|[^A-Za-z_])${v}(?![A-Za-z_0-9])`).test(src.replace(/θ/g, 'theta'));
    for (const it of items) {
      if (it.kind === 'slider' || it.kind === 'fn' || !it.src.trim()) continue;
      try {
        let s = it.src.trim().replace(/≤/g, '<=').replace(/≥/g, '>='), rs = '', lst = null, m;
        if ((m = /^(.*)\s+for\s+([a-z])\s*=\s*(.+?)\s*\.\.\s*(.+)$/.exec(s))) { const L = Math.round(G_.num(m[3], fns, env, V)), H = Math.round(G_.num(m[4], fns, env, V)); if (H - L > 400) throw new Error('list too long'); lst = { v: m[2], vals: Array.from({ length: Math.max(0, H - L + 1) }, (_, j) => L + j) }; s = m[1].trim(); }
        if ((m = /^(.*?)\s*(\{[^{}]*\})\s*$/.exec(s)) && !/^\s*\{/.test(s)) { rs = m[2]; s = m[1]; }
        if (lst && !/^(\(|polygon\(|vector\(|segment\()/.test(s)) { for (const j of lst.vals) handle(G_.subVar(s, lst.v, j), rs, null, it); continue; }
        handle(s, rs, lst, it);
      } catch (e) { it.err = e.message; }
    }
    return { out, env, sl };

    function handle(s, rs, lst, it) {
        let m;
        const R = restrict(rs), many = src => (lst ? lst.vals.map(j => G_.subVar(src, lst.v, j)) : [src]);
        const pair = src => { const inner = src.trim().replace(/^\(|\)$/g, ''); const parts = G_.splitTop(inner); if (parts.length !== 2) throw new Error('a point needs two coordinates'); return parts; };
        if ((m = /^(polygon|vector|segment)\((.*)\)$/.exec(s))) {
          const kind = m[1]; const shapes = many(m[2]).map(body => { const pts = G_.splitTop(body).map(pair).map(([a, b]) => [G_.num(a, fns, env, V), G_.num(b, fns, env, V)]); return pts; });
          out.push({ it, kind, shapes: kind === 'polygon' && lst && shapes.every(sh => sh.length === 1) ? [shapes.map(sh => sh[0])] : shapes }); it.kind = kind; return;
        }
        if (/^\(.*\)$/.test(s) && G_.splitTop(s.slice(1, -1)).length === 2) {
          const [a, b] = pair(s);
          if (!lst && (has(a, 't') || has(b, 't'))) { const fx = compile(a), fy = compile(b); let t0 = 0, t1 = 2 * Math.PI; if (rs) { const mm = /(-?[^<>=]+?)\s*<=?\s*t\s*<=?\s*([^<>=]+)/.exec(rs.slice(1, -1)); if (mm) { t0 = G_.num(mm[1], fns, env, V); t1 = G_.num(mm[2], fns, env, V); } } out.push({ it, kind: 'param', fx, fy, t0, t1, env }); it.kind = 'param'; return; }
          const pts = many(s).map(p => pair(p)).map(([u, w]) => [G_.num(u, fns, env, V), G_.num(w, fns, env, V)]);
          const drag = !lst && sl.includes(a.trim()) && sl.includes(b.trim()) ? [a.trim(), b.trim()] : null;
          out.push({ it, kind: 'points', pts, drag }); it.kind = 'point'; return;
        }
        if (/<|>/.test(s)) { const parts = s.split(/(<=|>=|<|>)/).map(x => x.trim()), fs = [], ops = []; parts.forEach((p, i) => (i % 2 ? ops.push(p) : fs.push(compile(p)))); out.push({ it, kind: 'region', fs, ops, R, env, polar: has(s, 'r') && !has(s, 'y') }); it.kind = 'region'; return; }
        const eq = s.indexOf('=');
        if (eq < 0) { out.push({ it, kind: 'y', f: compile(s), R, env }); it.kind = 'y'; return; }
        const L = s.slice(0, eq).trim(), Rt = s.slice(eq + 1).trim();
        if (L === 'y' && !has(Rt, 'y')) { out.push({ it, kind: 'y', f: compile(Rt), R, env }); it.kind = 'y'; return; }
        if (L === 'x' && !has(Rt, 'x')) { out.push({ it, kind: 'x', f: compile(Rt), R, env }); it.kind = 'x'; return; }
        if (L === 'r' && !has(Rt, 'r')) { const f = compile(Rt); let t0 = 0, t1 = 2 * Math.PI; if (rs) { const mm = /(-?[^<>=]+?)\s*<=?\s*theta\s*<=?\s*([^<>=]+)/.exec(rs.slice(1, -1).replace(/θ/g, 'theta')); if (mm) { t0 = G_.num(mm[1], fns, env, V); t1 = G_.num(mm[2], fns, env, V); } } out.push({ it, kind: 'polar', f, t0, t1, env }); it.kind = 'polar'; return; }
        const RtE = /(^|[^A-Za-z_])(int|sum)\(/.test(Rt) ? G_.expand(Rt, fns, env, V) : Rt;
        if (/^[A-Za-z][A-Za-z0-9_]*$/.test(L) && !GRAPH_RESERVED.has(L) && !has(RtE, 'x') && !has(RtE, 'y')) { it.kind = 'value'; it.value = G_.num(Rt, fns, env, V); env[L] = it.value; if (!V.includes(L)) V.push(L); return; }
        const fl = compile(L), fr2 = compile(Rt); out.push({ it, kind: 'implicit', F: e => fl(e) - fr2(e), R, env }); it.kind = 'implicit';
    }
  }

  function renderList() {
    list.innerHTML = items.map((it, i) => `<div class="gx-row" data-i="${i}"><button class="gx-dot ${it.on ? '' : 'off'}" style="--c:${it.col}" title="Show/hide"></button><input class="gx-in" value="${esc(it.src)}" spellcheck="false" autocomplete="off"><button class="gx-del" title="Delete">✕</button><div class="gx-extra"></div></div>`).join('');
    list.querySelectorAll('.gx-row').forEach(row => {
      const i = +row.dataset.i, it = items[i];
      row.querySelector('.gx-in').addEventListener('input', e => { it.src = e.target.value; it.min = it.max = undefined; draw(); });
      row.querySelector('.gx-dot').onclick = () => { it.on = !it.on; renderList(); draw(); };
      row.querySelector('.gx-del').onclick = () => { items.splice(i, 1); renderList(); draw(); };
    });
  }
  function refreshExtras() {
    list.querySelectorAll('.gx-row').forEach(row => {
      const it = items[+row.dataset.i], ex = row.querySelector('.gx-extra');
      row.classList.toggle('bad', !!it.err);
      if (it.err) { ex.innerHTML = `<span class="gx-err">${esc(it.err)}</span>`; return; }
      if (it.kind === 'slider') {
        if (!ex.querySelector('input[type=range]')) {
          ex.innerHTML = `<div class="gx-sl"><input class="gx-min" value="${G_.fmt(it.min)}"><input type="range" min="${it.min}" max="${it.max}" step="${it.step || (it.max - it.min) / 200}" value="${it.val}"><input class="gx-max" value="${G_.fmt(it.max)}"></div>`;
          const r = ex.querySelector('input[type=range]'), inp = row.querySelector('.gx-in');
          r.addEventListener('input', () => { it.val = +r.value; it.src = `${it.name} = ${G_.fmt(+r.value)}`; inp.value = it.src; draw(); });
          ex.querySelector('.gx-min').onchange = e => { it.min = +e.target.value; r.min = it.min; r.step = it.step || (it.max - it.min) / 200; };
          ex.querySelector('.gx-max').onchange = e => { it.max = +e.target.value; r.max = it.max; r.step = it.step || (it.max - it.min) / 200; };
        } else { const r = ex.querySelector('input[type=range]'); if (+r.value !== it.val) r.value = it.val; }
      } else if (it.kind === 'value') ex.innerHTML = `<span class="gx-val">= ${G_.fmt(it.value)}</span>`;
      else ex.innerHTML = '';
    });
  }

  let lastScene = null;
  function draw() {
    const scene = analyse(); lastScene = scene; refreshExtras();
    const C = COL(), ctx = P.ctx; P.xmin = view.x0; P.xmax = view.x1;
    if (cur().equal) { const midY = (view.y0 + view.y1) / 2, halfH = (view.x1 - view.x0) / 2 * P.h / P.w; P.ymin = midY - halfH; P.ymax = midY + halfH; } else { P.ymin = view.y0; P.ymax = view.y1; }
    P.clear();
    // grid
    const sx = G_.niceStep(P.xmax - P.xmin), sy = G_.niceStep(P.ymax - P.ymin); ctx.lineWidth = 1; ctx.strokeStyle = C.grid; ctx.beginPath();
    for (let x = Math.ceil(P.xmin / sx) * sx; x <= P.xmax; x += sx) { ctx.moveTo(P.X(x), 0); ctx.lineTo(P.X(x), P.h); }
    for (let y = Math.ceil(P.ymin / sy) * sy; y <= P.ymax; y += sy) { ctx.moveTo(0, P.Y(y)); ctx.lineTo(P.w, P.Y(y)); }
    ctx.stroke(); ctx.strokeStyle = C.axis; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(P.X(0), 0); ctx.lineTo(P.X(0), P.h); ctx.moveTo(0, P.Y(0)); ctx.lineTo(P.w, P.Y(0)); ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = '11px ui-monospace, monospace'; ctx.textAlign = 'center'; const ay = Math.min(P.h - 4, Math.max(12, P.Y(0) + 14)), axp = Math.max(4, Math.min(P.w - 30, P.X(0) + 4));
    for (let x = Math.ceil(P.xmin / sx) * sx; x <= P.xmax; x += sx) if (Math.abs(x) > sx / 2) ctx.fillText(G_.fmt(+x.toPrecision(10)) + (deg ? '°' : ''), P.X(x), ay);
    ctx.textAlign = 'left'; for (let y = Math.ceil(P.ymin / sy) * sy; y <= P.ymax; y += sy) if (Math.abs(y) > sy / 2) ctx.fillText(G_.fmt(+y.toPrecision(10)), axp, P.Y(y) - 3);
    const key = [];
    for (const o of scene.out) {
      if (!o.it.on) continue; const col = o.it.col;
      try {
        if (o.kind === 'region') {
          ctx.fillStyle = col + '33'; const st = 3, e = { ...o.env };
          for (let px = 0; px < P.w; px += st) for (let py = 0; py < P.h; py += st) { e.x = P.ix(px + st / 2); e.y = P.iy(py + st / 2); if (o.polar) { e.r = Math.hypot(e.x, e.y); e.theta = Math.atan2(e.y, e.x); if (e.theta < 0) e.theta += 2 * Math.PI; } let ok = o.R(e); for (let i = 0; ok && i < o.ops.length; i++) { const a = o.fs[i](e), b = o.fs[i + 1](e), op = o.ops[i]; ok = op === '<' ? a < b : op === '<=' ? a <= b : op === '>' ? a > b : a >= b; } if (ok) ctx.fillRect(px, py, st, st); }
        } else if (o.kind === 'y') {
          const e = { ...o.env }, f = x => { e.x = x; return o.R(e) ? o.f(e) : NaN; };
          ctx.strokeStyle = col; ctx.lineWidth = 2.6; ctx.beginPath(); let pen = false, prev = null;
          for (let px = 0; px <= P.w; px += 0.75) { const x = P.ix(px), y = f(x); if (!isFinite(y) || Math.abs(P.Y(y)) > 1e5) { pen = false; prev = null; continue; } const Y = P.Y(y); if (pen && prev !== null && Math.abs(Y - prev) > P.h * 1.5) pen = false; if (pen) ctx.lineTo(px, Y); else ctx.moveTo(px, Y); pen = true; prev = Y; }
          ctx.stroke(); if (keyPts) key.push({ f, col });
        } else if (o.kind === 'x') {
          const e = { ...o.env }; P.param(y => { e.y = y; return o.R(e) ? o.f(e) : NaN; }, y => y, P.ymin, P.ymax, col, 2.6, 1600);
        } else if (o.kind === 'polar') {
          const e = { ...o.env }; P.param(t => { e.theta = t; return o.f(e) * Math.cos(t); }, t => { e.theta = t; return o.f(e) * Math.sin(t); }, o.t0, o.t1, col, 2.6, 2000);
        } else if (o.kind === 'param') {
          const e = { ...o.env }; P.param(t => { e.t = t; return o.fx(e); }, t => { e.t = t; return o.fy(e); }, o.t0, o.t1, col, 2.6, 1600);
        } else if (o.kind === 'implicit') {
          const e = { ...o.env }; implicitPlot(P, (x, y) => { e.x = x; e.y = y; return o.R(e) ? o.F(e) : NaN; }, col, 2.6, 220);
        } else if (o.kind === 'points') {
          o.pts.forEach(([x, y]) => { P.dot(x, y, col, o.drag ? 7 : 5); if (o.pts.length <= 6) P.text(`(${G_.fmt(x)}, ${G_.fmt(y)})`, x, y, C.text, 8, -8, '11px system-ui'); });
          if (o.drag) { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(P.X(o.pts[0][0]), P.Y(o.pts[0][1]), 11, 0, 7); ctx.stroke(); }
        } else if (o.kind === 'polygon') {
          o.shapes.forEach(sh => { if (sh.length < 2) return; ctx.beginPath(); sh.forEach(([x, y], i) => (i ? ctx.lineTo(P.X(x), P.Y(y)) : ctx.moveTo(P.X(x), P.Y(y)))); ctx.closePath(); ctx.fillStyle = col + '22'; ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 2.2; ctx.stroke(); });
        } else if (o.kind === 'vector') { o.shapes.forEach(sh => sh.length === 2 && P.arrow(sh[0][0], sh[0][1], sh[1][0], sh[1][1], col, 2.6)); }
        else if (o.kind === 'segment') { o.shapes.forEach(sh => { for (let i = 0; i + 1 < sh.length; i++) P.line(sh[i][0], sh[i][1], sh[i + 1][0], sh[i + 1][1], col, 2.4); }); }
      } catch (e) { o.it.err = e.message; }
    }
    // key points on y = f(x) curves: roots, turning points, intersections
    lastScene.key = [];
    if (keyPts && typeof LX !== 'undefined') {
      const add = (x, y, label) => { if (isFinite(x) && isFinite(y) && x >= P.xmin && x <= P.xmax && y >= P.ymin && y <= P.ymax) lastScene.key.push({ x, y, label }); };
      const tol = (P.ymax - P.ymin) * 1e-6;
      for (const k of key.slice(0, 6)) {
        LX.roots(k.f, P.xmin, P.xmax, 1500).forEach(x => { if (Math.abs(k.f(x)) < tol) add(x, 0, 'root'); });
        const h = (P.xmax - P.xmin) * 1e-5, d = x => (k.f(x + h) - k.f(x - h)) / (2 * h);
        LX.roots(d, P.xmin, P.xmax, 1500).forEach(x => { const y = k.f(x), l = d(x - 50 * h), r = d(x + 50 * h); if (isFinite(y) && isFinite(l) && isFinite(r) && l * r < 0 && Math.abs(d(x)) < 1e-3 * (1 + Math.abs(l) + Math.abs(r))) add(x, y, l < 0 ? 'min' : 'max'); });
      }
      for (let i = 0; i < Math.min(key.length, 4); i++) for (let j = i + 1; j < Math.min(key.length, 4); j++) LX.roots(x => key[i].f(x) - key[j].f(x), P.xmin, P.xmax, 1500).forEach(x => { if (Math.abs(key[i].f(x) - key[j].f(x)) < tol) add(x, key[i].f(x), 'intersection'); });
      lastScene.key.forEach(p => { ctx.fillStyle = '#8a93ad'; ctx.beginPath(); ctx.arc(P.X(p.x), P.Y(p.y), 4, 0, 7); ctx.fill(); });
    }
    P.handles = scene.out.filter(o => o.kind === 'points' && o.drag && o.it.on).map(o => ({ get: () => o.pts[0], set: (x, y) => { const step = (P.xmax - P.xmin) / 400; const snap = v => Math.round(v / step) * step; setSlider(o.drag[0], snap(x)); setSlider(o.drag[1], snap(y)); draw(); } }));
  }
  function setSlider(name, v) { const it = items.find(t => t.kind === 'slider' && t.name === name); if (!it) return; it.val = +v.toFixed(4); it.src = `${name} = ${G_.fmt(it.val)}`; if (it.val < it.min) it.min = it.val; if (it.val > it.max) it.max = it.val; const row = list.querySelector(`.gx-row[data-i="${items.indexOf(it)}"]`); if (row) { row.querySelector('.gx-in').value = it.src; const r = row.querySelector('input[type=range]'); if (r) { r.min = it.min; r.max = it.max; r.value = it.val; } } }

  // pan / zoom / trace
  let pan = null, moved = false;
  const pos = e => { const r = P.cv.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; return [t.clientX - r.left, t.clientY - r.top]; };
  const onHandle = ([px, py]) => P.handles.some(hd => Math.hypot(P.X(hd.get()[0]) - px, P.Y(hd.get()[1]) - py) < 18);
  const zoom = (f, cx = (view.x0 + view.x1) / 2, cy = (view.y0 + view.y1) / 2) => { view = { x0: cx + (view.x0 - cx) * f, x1: cx + (view.x1 - cx) * f, y0: cy + (view.y0 - cy) * f, y1: cy + (view.y1 - cy) * f }; draw(); };
  let pinch = null;
  P.cv.addEventListener('mousedown', e => { const p = pos(e); if (onHandle(p)) return; pan = { p, v: { ...view } }; moved = false; });
  P.cv.addEventListener('touchstart', e => { if (e.touches.length === 2) { const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); pinch = { d, v: { ...view } }; pan = null; return; } const p = pos(e); if (onHandle(p)) return; pan = { p, v: { ...view } }; moved = false; }, { passive: true });
  const mv = e => {
    if (pinch && e.touches && e.touches.length === 2) { e.preventDefault(); const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY), f = pinch.d / d, cx = (pinch.v.x0 + pinch.v.x1) / 2, cy = (pinch.v.y0 + pinch.v.y1) / 2; view = { x0: cx + (pinch.v.x0 - cx) * f, x1: cx + (pinch.v.x1 - cx) * f, y0: cy + (pinch.v.y0 - cy) * f, y1: cy + (pinch.v.y1 - cy) * f }; draw(); return; }
    if (!pan) return; const [px, py] = pos(e), dx = (px - pan.p[0]) * (pan.v.x1 - pan.v.x0) / P.w, dy = (py - pan.p[1]) * (P.ymax - P.ymin) / P.h; if (Math.abs(px - pan.p[0]) + Math.abs(py - pan.p[1]) > 3) moved = true; if (!moved) return; if (e.cancelable) e.preventDefault();
    view = { x0: pan.v.x0 - dx, x1: pan.v.x1 - dx, y0: pan.v.y0 + dy, y1: pan.v.y1 + dy }; draw();
  };
  const up = e => { if (pan && !moved && e.type === 'mouseup') trace(pos(e)); pan = null; pinch = null; };
  window.addEventListener('mousemove', mv); window.addEventListener('touchmove', mv, { passive: false }); window.addEventListener('mouseup', up); window.addEventListener('touchend', up);
  P.cv.addEventListener('wheel', e => { e.preventDefault(); const [px, py] = pos(e); zoom(e.deltaY > 0 ? 1.15 : 1 / 1.15, P.ix(px), P.iy(py)); }, { passive: false });
  function trace([px, py]) {
    let best = null; const consider = (x, y, label) => { const d = Math.hypot(P.X(x) - px, P.Y(y) - py); if (d < 14 && (!best || d < best.d)) best = { x, y, label, d }; };
    (lastScene.key || []).forEach(k => consider(k.x, k.y, k.label));
    if (!best) for (const o of lastScene.out) if (o.kind === 'y' && o.it.on) { const e = { ...o.env, x: P.ix(px) }; const y = o.R(e) ? o.f(e) : NaN; if (isFinite(y)) consider(e.x, y, ''); }
    if (!best) { tip.hidden = true; return; }
    tip.hidden = false; tip.textContent = `${best.label ? best.label + ': ' : ''}(${G_.fmt(best.x)}${deg ? '°' : ''}, ${G_.fmt(best.y)})`; tip.style.left = Math.min(P.w - 140, P.X(best.x) + 10) + 'px'; tip.style.top = Math.max(0, P.Y(best.y) - 30) + 'px';
  }
  const zb = el.querySelectorAll('.gx-zoom button'); zb[0].onclick = () => zoom(1 / 1.4); zb[1].onclick = () => zoom(1.4); zb[2].onclick = () => { const b = cur().bounds || [-10, 10, -7, 7]; view = { x0: b[0], x1: b[1], y0: b[2], y1: b[3] }; draw(); };
  el.querySelector('.gx-add').onclick = () => { items.push({ src: '', on: true, col: GRAPH_COLORS[items.length % GRAPH_COLORS.length] }); renderList(); list.querySelector('.gx-row:last-child .gx-in').focus(); };
  el.querySelector('.gx-reset').onclick = load;
  el.querySelector('.gx-key').onchange = e => { keyPts = e.target.checked; draw(); };
  el.querySelector('.gx-deg').onchange = e => { deg = e.target.checked; draw(); };
  el.querySelector('.gx-copy').onclick = e => { const txt = items.map(i => i.src).filter(Boolean).map(G_.toDesmos).join('\n'), b = e.target, ok = () => { b.textContent = 'Copied — paste into Desmos'; setTimeout(() => (b.textContent = 'Copy for Desmos'), 2500); }; if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, ok); else ok(); };
  const ps = el.querySelector('.gx-preset'); if (ps) ps.onchange = () => { if (ps.value === 'free') gi = -1; else [gi, pi] = ps.value.split(':').map(Number); load(); };
  P.onresize = () => view && draw();
  load();
  return () => { deleted = true; P.destroy(); window.removeEventListener('mousemove', mv); window.removeEventListener('touchmove', mv); window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
}
