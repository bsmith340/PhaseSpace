// BcsMaths figures: small theme-aware SVG diagrams for the textbook (forces, planes, pulleys, beams, graphs,
// box plots, histograms, Venn and tree diagrams, networks). Strokes use CSS variables so they follow light/dark.
'use strict';

const FIG = (() => {
  const D = Math.PI / 180, f = x => +x.toFixed(1);
  const wrap = (w, h, body, cap) => `<figure class="fig"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${cap ? cap.replace(/<[^>]+>/g, '').replace(/"/g, '') : 'diagram'}">${body}</svg>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  const txt = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" class="ft${o.cls ? ' ' + o.cls : ''}" text-anchor="${o.a || 'middle'}" dominant-baseline="${o.b || 'middle'}">${s}</text>`;
  const line = (x1, y1, x2, y2, cls = 'fl') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls}"/>`;
  // arrow from (x,y) of length len at angle a (degrees, anticlockwise from +x, screen y down)
  function arrow(x, y, a, len, cls = 'fa1', label = '', lo = 14) {
    const ex = x + len * Math.cos(a * D), ey = y - len * Math.sin(a * D), h = 8;
    const l = ex - h * Math.cos((a - 25) * D), lY = ey + h * Math.sin((a - 25) * D), r = ex - h * Math.cos((a + 25) * D), rY = ey + h * Math.sin((a + 25) * D);
    const lx = ex + lo * Math.cos(a * D), ly = ey - lo * Math.sin(a * D);
    return `<g class="${cls}"><line x1="${f(x)}" y1="${f(y)}" x2="${f(ex)}" y2="${f(ey)}"/><path d="M${f(l)} ${f(lY)}L${f(ex)} ${f(ey)}L${f(r)} ${f(rY)}"/></g>${label ? txt(lx, ly, label, { cls: 'fat' }) : ''}`;
  }
  const arcAngle = (x, y, r, a1, a2, label) => { const p = a => [x + r * Math.cos(a * D), y - r * Math.sin(a * D)], [x1, y1] = p(a1), [x2, y2] = p(a2), m = p((a1 + a2) / 2); return `<path class="fl thin" d="M${f(x1)} ${f(y1)}A${r} ${r} 0 0 0 ${f(x2)} ${f(y2)}" fill="none"/>${label ? txt(m[0] + 10 * Math.cos((a1 + a2) / 2 * D), m[1] - 10 * Math.sin((a1 + a2) / 2 * D), label, { cls: 'fs' }) : ''}`; };

  // forces on a particle: [{a, label, len?, cls?}]
  function forces(list, cap, o = {}) {
    const w = o.w || 280, h = o.h || 220, x = w / 2, y = h / 2;
    return wrap(w, h, `${list.map((F, i) => arrow(x, y, F.a, F.len || 70, F.cls || ['fa1', 'fa2', 'fa3', 'fa4'][i % 4], F.label)).join('')}<circle cx="${x}" cy="${y}" r="6" class="fp"/>${o.angles ? o.angles.map(([a1, a2, l]) => arcAngle(x, y, 28, a1, a2, l)).join('') : ''}`, cap);
  }
  // block on an inclined plane of angle th: forces drawn from the block centre
  function incline(th, list, cap, o = {}) {
    const w = 320, h = 210, x0 = 30, y0 = 185, L = 260, x1 = x0 + L * Math.cos(th * D), y1 = y0 - L * Math.sin(th * D);
    const t = 0.55, bx = x0 + t * L * Math.cos(th * D), by = y0 - t * L * Math.sin(th * D), s = 34;
    const n = [-Math.sin(th * D), -Math.cos(th * D)], u = [Math.cos(th * D), -Math.sin(th * D)];
    const P = (a, b) => [bx + a * u[0] + b * n[0], by + a * u[1] + b * n[1]];
    const c = [P(-s / 2, 0), P(s / 2, 0), P(s / 2, s), P(-s / 2, s)], cx = P(0, s / 2);
    const dir = { up: th, down: th + 180, normal: th + 90, vert: -90, upv: 90 };
    return wrap(w, h, `<path class="fground" d="M${x0} ${y0}L${f(x1)} ${f(y1)}L${f(x1)} ${y0}Z"/>${arcAngle(x0, y0, 34, 0, th, o.angleLabel || `${th}°`)}
      <path class="fbox" d="M${c.map(p => p.map(f).join(' ')).join('L')}Z"/>${o.boxLabel ? txt(cx[0], cx[1], o.boxLabel, { cls: 'fs' }) : ''}
      ${list.map((F, i) => arrow(cx[0], cx[1], F.at !== undefined ? F.at : dir[F.d], F.len || 62, F.cls || ['fa1', 'fa2', 'fa3', 'fa4'][i % 4], F.label)).join('')}`, cap);
  }
  // two particles over a pulley: type 'hang' (both hanging) or 'table' (A on a table, B hanging)
  function pulley(type, A, B, cap) {
    if (type === 'table') return wrap(320, 210, `<path class="fground" d="M10 90H230V200H10Z"/><circle cx="242" cy="90" r="12" class="fpul"/>
      ${line(110, 78, 242, 78, 'fstr')}${line(254, 90, 254, 150, 'fstr')}<rect x="70" y="58" width="40" height="32" rx="4" class="fbox"/>${txt(90, 74, A, { cls: 'fs' })}
      <rect x="236" y="150" width="36" height="34" rx="4" class="fbox"/>${txt(254, 167, B, { cls: 'fs' })}`, cap);
    return wrap(240, 230, `${line(60, 12, 180, 12, 'fl')}${line(120, 12, 120, 38, 'fl')}<circle cx="120" cy="52" r="16" class="fpul"/>${line(104, 52, 104, 150, 'fstr')}${line(136, 52, 136, 110, 'fstr')}
      <rect x="84" y="150" width="40" height="36" rx="4" class="fbox"/>${txt(104, 168, A, { cls: 'fs' })}<rect x="116" y="110" width="40" height="36" rx="4" class="fbox"/>${txt(136, 128, B, { cls: 'fs' })}`, cap);
  }
  // horizontal beam: supports [{x (0..1), label}], loads [{x, label, up?}], length label
  function beam(o, cap) {
    const w = 340, x0 = 30, L = 280, y = 90, X = t => x0 + t * L;
    return wrap(w, 190, `<rect x="${x0}" y="${y - 6}" width="${L}" height="12" rx="3" class="fbeam"/>
      ${(o.supports || []).map(s => `<path class="fsup" d="M${f(X(s.x))} ${y + 6}l-11 18h22z"/>${s.label ? txt(X(s.x), y + 38, s.label, { cls: 'fs' }) : ''}`).join('')}
      ${(o.loads || []).map((l, i) => arrow(X(l.x), l.up ? y - 6 : y - 60, l.up ? 90 : -90, 48, ['fa1', 'fa2', 'fa3', 'fa4'][i % 4], l.label, 12)).join('')}
      ${(o.marks || []).map(m => `${line(X(m[0]), y + 52, X(m[1]), y + 52, 'fl thin')}${txt((X(m[0]) + X(m[1])) / 2, y + 64, m[2], { cls: 'fs' })}`).join('')}
      ${txt(X(0), y - 16, o.ends ? o.ends[0] : 'A', { cls: 'fs' })}${txt(X(1), y - 16, o.ends ? o.ends[1] : 'B', { cls: 'fs' })}`, cap);
  }
  // ladder against a smooth/rough wall at angle th to the ground, with the usual forces
  function ladder(th, cap, o = {}) {
    const gx = 60, gy = 200, L = 210, tx = gx + L * Math.cos(th * D), ty = gy - L * Math.sin(th * D);
    const mx = (gx + tx) / 2, my = (gy + ty) / 2;
    return wrap(320, 230, `<path class="fground" d="M10 ${gy}H${f(tx + 14)}V12H${f(tx + 30)}V${gy + 14}H10Z"/>${line(gx, gy, tx, ty, 'fladder')}${arcAngle(gx, gy, 30, 0, th, `${o.angle || th + '°'}`)}
      ${arrow(gx, gy, 90, 60, 'fa1', o.R || 'R')}${arrow(gx, gy, 180, 50, 'fa3', o.F || 'F')}${arrow(tx, ty, 180, 56, 'fa1', o.S || 'S')}${o.Fw ? arrow(tx, ty, 90, 46, 'fa3', o.Fw) : ''}${arrow(mx, my, -90, 56, 'fa2', o.W || 'W')}`, cap);
  }
  // axes with polylines: {x:[lo,hi], y:[lo,hi], lines:[{pts:[[x,y]...], cls, fill}], xlab, ylab, ticks}
  function plot(o, cap) {
    const w = o.w || 340, h = o.h || 220, m = { l: 40, r: 14, t: 12, b: 32 }, [xa, xb] = o.x, [ya, yb] = o.y;
    const X = x => m.l + (x - xa) / (xb - xa) * (w - m.l - m.r), Y = y => h - m.b - (y - ya) / (yb - ya) * (h - m.t - m.b);
    const tick = (lo, hi, n) => { const st = o.step || niceStep((hi - lo) / n); const out = []; for (let v = Math.ceil(lo / st) * st; v <= hi + 1e-9; v += st) out.push(+v.toFixed(6)); return out; };
    const xt = o.xt || tick(xa, xb, 6), yt = o.yt || tick(ya, yb, 5);
    const ax = `${line(X(xa), Y(Math.max(ya, 0)), X(xb), Y(Math.max(ya, 0)), 'fax')}${line(X(Math.max(xa, 0)), Y(ya), X(Math.max(xa, 0)), Y(yb), 'fax')}
      ${xt.map(v => v ? `${line(X(v), Y(Math.max(ya, 0)) - 3, X(v), Y(Math.max(ya, 0)) + 3, 'fax')}${txt(X(v), Y(Math.max(ya, 0)) + 13, v, { cls: 'fsm' })}` : '').join('')}
      ${yt.map(v => v ? `${line(X(Math.max(xa, 0)) - 3, Y(v), X(Math.max(xa, 0)) + 3, Y(v), 'fax')}${txt(X(Math.max(xa, 0)) - 7, Y(v), v, { cls: 'fsm', a: 'end' })}` : '').join('')}
      ${o.xlab ? txt(w - m.r, h - 8, o.xlab, { cls: 'fs', a: 'end' }) : ''}${o.ylab ? txt(m.l + 6, m.t - 2, o.ylab, { cls: 'fs', a: 'start' }) : ''}`;
    const lines = (o.lines || []).map((L, i) => { const d = L.pts.map(([x, y], k) => `${k ? 'L' : 'M'}${f(X(x))} ${f(Y(y))}`).join('');
      return `${L.fill ? `<path class="ffill" d="${d}L${f(X(L.pts[L.pts.length - 1][0]))} ${f(Y(0))}L${f(X(L.pts[0][0]))} ${f(Y(0))}Z"/>` : ''}<path class="${L.cls || 'fc' + (i + 1)}" d="${d}" fill="none"/>`; }).join('');
    const dots = (o.dots || []).map(([x, y, l]) => `<circle cx="${f(X(x))}" cy="${f(Y(y))}" r="3.4" class="fdot"/>${l ? txt(X(x) + 6, Y(y) - 9, l, { cls: 'fs', a: 'start' }) : ''}`).join('');
    const labels = (o.labels || []).map(([x, y, l]) => txt(X(x), Y(y), l, { cls: 'fs' })).join('');
    return wrap(w, h, ax + lines + dots + labels, cap);
  }
  const niceStep = r => { const p = 10 ** Math.floor(Math.log10(r)), q = r / p; return (q < 1.5 ? 1 : q < 3.5 ? 2 : q < 7.5 ? 5 : 10) * p; };
  // box plot on a scale [lo, hi]: one or more rows {five:[min,q1,med,q3,max], out:[], label}
  function box(rows, scale, cap) {
    const w = 340, rowH = 46, h = rows.length * rowH + 40, [lo, hi] = scale, X = x => 30 + (x - lo) / (hi - lo) * 290;
    const st = niceStep((hi - lo) / 7), ticks = []; for (let v = Math.ceil(lo / st) * st; v <= hi + 1e-9; v += st) ticks.push(+v.toFixed(6));
    const body = rows.map((r, i) => { const y = 18 + i * rowH + 14, [a, q1, m, q3, b] = r.five;
      return `${line(X(a), y, X(q1), y)}${line(X(q3), y, X(b), y)}${line(X(a), y - 7, X(a), y + 7)}${line(X(b), y - 7, X(b), y + 7)}<rect x="${f(X(q1))}" y="${y - 12}" width="${f(X(q3) - X(q1))}" height="24" class="fbx"/>${line(X(m), y - 12, X(m), y + 12, 'fmed')}
        ${(r.out || []).map(o => `<text x="${f(X(o))}" y="${y}" class="ft fout" text-anchor="middle" dominant-baseline="middle">×</text>`).join('')}${r.label ? txt(X(lo), y - 18, r.label, { cls: 'fs', a: 'start' }) : ''}`; }).join('');
    const axY = h - 22;
    return wrap(w, h, body + line(X(lo), axY, X(hi), axY, 'fax') + ticks.map(v => line(X(v), axY, X(v), axY + 4, 'fax') + txt(X(v), axY + 13, v, { cls: 'fsm' })).join(''), cap);
  }
  // histogram: bars [[lo, hi, frequency density]]
  function hist(bars, cap, o = {}) {
    const lo = bars[0][0], hi = bars[bars.length - 1][1], top = Math.max(...bars.map(b => b[2])) * 1.15;
    return plot({ x: [lo, hi], y: [0, top], xlab: o.xlab || '', ylab: o.ylab || 'fd', xt: o.xt || [...new Set(bars.flatMap(b => [b[0], b[1]]))], lines: [], w: 340, h: 220, bars }, cap)
      .replace('</svg>', bars.map(([a, b, d]) => { const X = x => 40 + (x - lo) / (hi - lo) * 286, Y = y => 220 - 32 - y / top * 176; return `<rect x="${f(X(a))}" y="${f(Y(d))}" width="${f(X(b) - X(a))}" height="${f(Y(0) - Y(d))}" class="fbar"/>`; }).join('') + '</svg>');
  }
  // Venn diagram for two or three events with region labels
  function venn(sets, regions, cap, o = {}) {
    const two = sets.length === 2, w = 320, h = two ? 190 : 230;
    const cs = two ? [[125, 95], [195, 95]] : [[130, 92], [190, 92], [160, 146]], r = two ? 66 : 58;
    const pos = two ? { a: [96, 95], ab: [160, 95], b: [224, 95], none: [292, 172] } : { a: [104, 76], b: [216, 76], c: [160, 186], ab: [160, 62], ac: [124, 136], bc: [196, 136], abc: [160, 112], none: [296, 214] };
    return wrap(w, h, `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="10" class="fvbox"/>${txt(18, 20, o.U || 'ξ', { cls: 'fs', a: 'start' })}${cs.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${r}" class="fv fv${i + 1}"/>`).join('')}
      ${sets.map((s, i) => txt(cs[i][0] + (two ? (i ? 40 : -40) : [-46, 46, 0][i]), cs[i][1] + (two ? -72 : [-62, -62, 70][i]), s, { cls: 'fs b' })).join('')}
      ${Object.entries(regions).map(([k, v]) => pos[k] ? txt(pos[k][0], pos[k][1], v, { cls: 'fs' }) : '').join('')}`, cap);
  }
  // probability tree: levels = [[branch labels for each first-stage outcome...]] simplified to 2 stages
  // t = {a:[['A', '0.3'], ["A'", '0.7']], b:[[['B','0.6'],["B'",'0.4']], [['B','0.2'],["B'",'0.8']]], ends:[...]}
  function tree(t, cap) {
    const w = 340, h = 210, x0 = 18, y0 = 105, x1 = 130, x2 = 250, ys1 = [55, 155], ys2 = [[28, 82], [128, 182]];
    let s = '';
    t.a.forEach(([lab, p], i) => { s += line(x0, y0, x1, ys1[i]) + txt(x1 + 10, ys1[i], lab, { cls: 'fs b', a: 'start' }) + txt((x0 + x1) / 2 - 4, (y0 + ys1[i]) / 2 + (i ? 12 : -12), p, { cls: 'fsm' });
      t.b[i].forEach(([l2, p2], j) => { s += line(x1 + 30, ys1[i], x2, ys2[i][j]) + txt(x2 + 10, ys2[i][j], l2, { cls: 'fs b', a: 'start' }) + txt((x1 + 30 + x2) / 2, (ys1[i] + ys2[i][j]) / 2 + (j ? 11 : -11), p2, { cls: 'fsm' });
        if (t.ends) s += txt(x2 + 40, ys2[i][j], t.ends[i * 2 + j], { cls: 'fsm', a: 'start' }); }); });
    return wrap(w, h, s, cap);
  }
  // network: nodes {A:[x,y]} in a 0..100 box, edges [[u, v, weight]], options directed, hi (highlighted edges 'A-B')
  function network(nodes, edges, cap, o = {}) {
    const w = o.w || 340, h = o.h || 220, X = x => 24 + x / 100 * (w - 48), Y = y => 20 + y / 100 * (h - 40), hi = new Set(o.hi || []);
    const es = edges.map(([u, v, wt]) => { const [ax, ay] = nodes[u], [bx, by] = nodes[v], on = hi.has(u + '-' + v) || hi.has(v + '-' + u);
      const x1 = X(ax), y1 = Y(ay), x2 = X(bx), y2 = Y(by), len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len, mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const head = o.directed ? `<path class="${on ? 'fe on' : 'fe'}" d="M${f(x2 - 15 * ux - 5 * uy)} ${f(y2 - 15 * uy + 5 * ux)}L${f(x2 - 13 * ux)} ${f(y2 - 13 * uy)}L${f(x2 - 15 * ux + 5 * uy)} ${f(y2 - 15 * uy - 5 * ux)}"/>` : '';
      return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${on ? 'fe on' : 'fe'}"/>${head}${wt !== undefined && wt !== '' ? `<rect x="${f(mx - 11)}" y="${f(my - 9)}" width="22" height="18" rx="5" class="fwt"/>${txt(mx, my, wt, { cls: 'fsm' })}` : ''}`; }).join('');
    const ns = Object.entries(nodes).map(([k, [x, y]]) => `<circle cx="${f(X(x))}" cy="${f(Y(y))}" r="12" class="fn${(o.hn || []).includes(k) ? ' on' : ''}"/>${txt(X(x), Y(y), k, { cls: 'fs b' })}`).join('');
    return wrap(w, h, es + ns, cap);
  }
  // projectile from the origin with speed u at angle a (degrees), g = 9.8
  function projectile(u, a, cap, o = {}) {
    const g = 9.8, T = 2 * u * Math.sin(a * D) / g, R = u * Math.cos(a * D) * T, H = (u * Math.sin(a * D)) ** 2 / (2 * g), pts = [];
    for (let i = 0; i <= 40; i++) { const t = T * i / 40; pts.push([u * Math.cos(a * D) * t, u * Math.sin(a * D) * t - g * t * t / 2]); }
    return plot({ x: [0, R * 1.08], y: [0, H * 1.35], lines: [{ pts, cls: 'fc1' }], dots: o.dots || [[R / 2, H, 'max height'], [R, 0, 'range']], xlab: 'x (m)', ylab: 'y (m)' }, cap);
  }
  return { forces, incline, pulley, beam, ladder, plot, box, hist, venn, tree, network, projectile, arrow, wrap, txt, line };
})();
