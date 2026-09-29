// Shared helpers: randomness, exact-ish formatting to TeX, vectors, matrices, answer parsing.
'use strict';

const T = String.raw;
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const rnz = (a, b) => { let x; do x = ri(a, b); while (x === 0); return x; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = ri(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const fact = n => n <= 1 ? 1 : n * fact(n - 1);

// Fraction n/d as TeX
function fr(n, d = 1) {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  if (d === 1) return '' + n;
  return (n < 0 ? '-' : '') + `\\frac{${Math.abs(n)}}{${d}}`;
}
// Decimal to 4 s.f., integers kept exact
function num(x, sf = 4) {
  if (!isFinite(x)) return '\\text{undefined}';
  if (Math.abs(x - Math.round(x)) < 1e-9) return '' + Math.round(x);
  return '' + (+x.toPrecision(sf));
}
// Try to express a decimal as a small fraction, else decimal
function nice(x) {
  if (Math.abs(x - Math.round(x)) < 1e-9) return '' + Math.round(x);
  for (let d = 2; d <= 64; d++) { const n = Math.round(x * d); if (Math.abs(n / d - x) < 1e-9) return fr(n, d); }
  return num(x);
}
// sqrt(n) simplified
function surd(n) {
  if (n === 0) return '0';
  let k = 1, m = n;
  for (let i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
  return m === 1 ? '' + k : (k === 1 ? '' : k) + `\\sqrt{${m}}`;
}
// k*pi/n
function pf(k, n = 1) {
  const g = gcd(k, n) || 1; k /= g; n /= g;
  if (n < 0) { k = -k; n = -n; }
  if (k === 0) return '0';
  const s = k < 0 ? '-' : '', a = Math.abs(k), top = (a === 1 ? '' : a) + '\\pi';
  return n === 1 ? s + top : s + `\\frac{${top}}{${n}}`;
}
// Linear combination: [[coef, 'x^2'], [coef, 'x'], [coef, '']] -> "3x^2 - x + 4"
function poly(terms) {
  let s = '';
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const a = Math.abs(c);
    const coef = (a === 1 && v) ? '' : a;
    if (!s) s = (c < 0 ? '-' : '') + coef + v;
    else s += (c < 0 ? ' - ' : ' + ') + coef + v;
  }
  return s || '0';
}
const sgn = c => c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`; // "+ 3" / "- 3"
const par = c => (typeof c === 'string' ? c.startsWith('-') : c < 0) ? `(${c})` : '' + c;

// Vectors
const V = {
  add: (a, b) => a.map((x, i) => x + b[i]),
  sub: (a, b) => a.map((x, i) => x - b[i]),
  mul: (a, k) => a.map(x => x * k),
  dot: (a, b) => a.reduce((s, x, i) => s + x * b[i], 0),
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  norm: a => Math.hypot(...a),
  n2: a => a.reduce((s, x) => s + x * x, 0),
  rnd: (lo = -4, hi = 4) => [ri(lo, hi), ri(lo, hi), ri(lo, hi)],
  isZero: a => a.every(x => x === 0),
  tex: a => `\\begin{pmatrix}${a.map(nice).join('\\\\')}\\end{pmatrix}`,
  row: a => `(${a.map(nice).join(',\\,')})`,
  simplify: a => { const g = a.reduce((g, x) => gcd(g, x), 0) || 1; let v = a.map(x => x / g); if (v.find(x => x !== 0) < 0) v = v.map(x => -x); return v; },
};
const vecStr = (p, d, t = '\\lambda') => `\\mathbf r = ${V.tex(p)} + ${t}${V.tex(d)}`;

// Matrices
const M = {
  det2: m => m[0][0] * m[1][1] - m[0][1] * m[1][0],
  det3: m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]),
  mul: (a, b) => a.map(r => b[0].map((_, j) => r.reduce((s, x, k) => s + x * b[k][j], 0))),
  minor: (m, i, j) => m.filter((_, r) => r !== i).map(r => r.filter((_, c) => c !== j)),
  cof3: (m, i, j) => ((i + j) % 2 ? -1 : 1) * M.det2(M.minor(m, i, j)),
  adj3: m => [0, 1, 2].map(i => [0, 1, 2].map(j => M.cof3(m, j, i))),
  inv2: m => { const d = M.det2(m); return [[m[1][1] / d, -m[0][1] / d], [-m[1][0] / d, m[0][0] / d]]; },
  pow: (m, n) => { let r = m.map((row, i) => row.map((_, j) => +(i === j))); for (let k = 0; k < n; k++) r = M.mul(r, m); return r; },
  tr: m => m.reduce((s, r, i) => s + r[i], 0),
  tex: m => `\\begin{pmatrix}${m.map(r => r.map(nice).join('&')).join('\\\\')}\\end{pmatrix}`,
  rnd: (n, lo = -3, hi = 4) => Array.from({ length: n }, () => Array.from({ length: n }, () => ri(lo, hi))),
};

// Exact rational helper for recurrences
class Q {
  constructor(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; this.n = n / g; this.d = d / g; }
  add(o) { return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return this.add(new Q(-o.n, o.d)); }
  mul(o) { o = typeof o === 'number' ? new Q(o) : o; return new Q(this.n * o.n, this.d * o.d); }
  val() { return this.n / this.d; }
  tex() { return fr(this.n, this.d); }
}

// ---------- answer parsing ----------
const FN = {
  arsinh: Math.asinh, arcosh: Math.acosh, artanh: Math.atanh, arcsinh: Math.asinh, arccosh: Math.acosh, arctanh: Math.atanh,
  arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan, sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
  sech: x => 1 / Math.cosh(x), cosech: x => 1 / Math.sinh(x), coth: x => 1 / Math.tanh(x),
  sin: Math.sin, cos: Math.cos, tan: Math.tan, sec: x => 1 / Math.cos(x), cosec: x => 1 / Math.sin(x), csc: x => 1 / Math.sin(x), cot: x => 1 / Math.tan(x),
  sqrt: Math.sqrt, ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs,
};
const NAMES = [...Object.keys(FN), 'pi', 'e'].sort((a, b) => b.length - a.length);

function tokenize(s) {
  s = s.toLowerCase().replace(/π/g, 'pi').replace(/√/g, 'sqrt').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-').replace(/\*\*/g, '^').replace(/\s+/g, '');
  const out = []; let i = 0;
  while (i < s.length) {
    const c = s[i];
    const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (m) { out.push({ t: 'n', v: parseFloat(m[1]) }); i += m[1].length; continue; }
    if ('+-*/^()'.includes(c)) { out.push({ t: c }); i++; continue; }
    const name = NAMES.find(n => s.startsWith(n, i));
    if (name) { out.push(name === 'pi' ? { t: 'n', v: Math.PI } : name === 'e' ? { t: 'n', v: Math.E } : { t: 'f', v: name }); i += name.length; continue; }
    throw new Error('bad char');
  }
  return out;
}
function evalExpr(str) {
  let toks, p = 0;
  try { toks = tokenize(str); } catch { return NaN; }
  if (!toks.length) return NaN;
  const peek = () => toks[p], eat = t => { if (toks[p] && toks[p].t === t) { p++; return true; } return false; };
  const startsAtom = k => k && (k.t === 'n' || k.t === 'f' || k.t === '(');
  function expr() { let v = term(); for (;;) { if (eat('+')) v += term(); else if (eat('-')) v -= term(); else return v; } }
  function term() {
    let v = unary();
    for (;;) {
      if (eat('*')) v *= unary(); else if (eat('/')) v /= unary();
      else if (startsAtom(peek())) v *= power();
      else return v;
    }
  }
  function unary() { if (eat('-')) return -unary(); if (eat('+')) return unary(); return power(); }
  function power() { const b = atom(); if (eat('^')) return Math.pow(b, unary()); return b; }
  function atom() {
    const k = toks[p++];
    if (!k) throw 0;
    if (k.t === 'n') return k.v;
    if (k.t === '(') { const v = expr(); if (!eat(')')) throw 0; return v; }
    if (k.t === 'f') {
      if (eat('^')) { const e = unary(); return Math.pow(FN[k.v](power()), e); } // sin^2(x)
      return FN[k.v](power());
    }
    throw 0;
  }
  try { const v = expr(); if (p !== toks.length) return NaN; return v; } catch { return NaN; }
}
const splitList = s => s.split(/[,;]/).map(x => x.trim()).filter(x => x.length);
function close(x, a, tol) {
  if (!isFinite(x)) return false;
  const t = tol || { rel: 0.005, abs: 0.0006 };
  return Math.abs(x - a) <= Math.max((t.rel || 0) * Math.abs(a), t.abs || 0);
}
// Check one field against user text. Returns true/false.
function checkField(f, text) {
  if (f.set) {
    const vals = splitList(text).map(evalExpr);
    if (vals.length !== f.set.length || vals.some(v => !isFinite(v))) return false;
    const left = f.set.slice();
    for (const v of vals) { const i = left.findIndex(a => close(v, a, f.tol)); if (i < 0) return false; left.splice(i, 1); }
    return true;
  }
  if (f.vec) {
    const vals = splitList(text.replace(/[()[\]{}<>]/g, '')).map(evalExpr);
    if (vals.length !== f.vec.length || vals.some(v => !isFinite(v))) return false;
    if (!f.prop) return vals.every((v, i) => close(v, f.vec[i], f.tol));
    const a = f.vec, k = V.dot(vals, a) / V.dot(a, a);
    if (Math.abs(k) < 1e-9) return false;
    return vals.every((v, i) => Math.abs(v - k * a[i]) <= 0.005 * V.norm(vals));
  }
  return close(evalExpr(text), f.ans, f.tol);
}

// Snap floating-point dust (e.g. 1e-15) to exact zero in generated answers
function cleanQ(q) {
  const z = v => (Math.abs(v) < 1e-9 ? 0 : v);
  (q.fields || []).forEach(f => { if (f.set) f.set = f.set.map(z); else if (f.vec) f.vec = f.vec.map(z); else f.ans = z(f.ans); });
  return q;
}
