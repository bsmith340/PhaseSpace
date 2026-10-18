// BCSFM maths engine: expression parser (real + complex), number recognition, numerics.
'use strict';

/* ---------- complex arithmetic: numbers are [re, im] ---------- */
const Cx = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  neg: a => [-a[0], -a[1]],
  abs: a => Math.hypot(a[0], a[1]),
  arg: a => Math.atan2(a[1], a[0]),
  conj: a => [a[0], -a[1]],
  exp: a => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; },
  log: a => [Math.log(Math.hypot(a[0], a[1])), Math.atan2(a[1], a[0])],
  sqrt: a => { const r = Math.hypot(a[0], a[1]); const re = Math.sqrt(Math.max(0, (r + a[0]) / 2)), im = Math.sqrt(Math.max(0, (r - a[0]) / 2)); return [re, a[1] < 0 ? -im : im]; },
  pow(a, b) {
    if (b[1] === 0 && Number.isInteger(b[0]) && Math.abs(b[0]) <= 256) {
      let r = [1, 0], base = a, n = Math.abs(b[0]);
      while (n) { if (n & 1) r = Cx.mul(r, base); base = Cx.mul(base, base); n >>= 1; }
      return b[0] < 0 ? Cx.div([1, 0], r) : r;
    }
    if (a[0] === 0 && a[1] === 0) return [0, 0];
    return Cx.exp(Cx.mul(b, Cx.log(a)));
  },
  sin: a => [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])],
  cos: a => [Math.cos(a[0]) * Math.cosh(a[1]), -Math.sin(a[0]) * Math.sinh(a[1])],
  sinh: a => [Math.sinh(a[0]) * Math.cos(a[1]), Math.cosh(a[0]) * Math.sin(a[1])],
  cosh: a => [Math.cosh(a[0]) * Math.cos(a[1]), Math.sinh(a[0]) * Math.sin(a[1])],
};
Cx.tan = a => Cx.div(Cx.sin(a), Cx.cos(a));
Cx.tanh = a => Cx.div(Cx.sinh(a), Cx.cosh(a));
const I = [0, 1], ONE = [1, 0];
Cx.asin = z => Cx.mul([0, -1], Cx.log(Cx.add(Cx.mul(I, z), Cx.sqrt(Cx.sub(ONE, Cx.mul(z, z))))));
Cx.acos = z => Cx.sub([Math.PI / 2, 0], Cx.asin(z));
Cx.atan = z => Cx.mul([0, 0.5], Cx.sub(Cx.log(Cx.sub(ONE, Cx.mul(I, z))), Cx.log(Cx.add(ONE, Cx.mul(I, z)))));
Cx.asinh = z => Cx.log(Cx.add(z, Cx.sqrt(Cx.add(Cx.mul(z, z), ONE))));
Cx.acosh = z => Cx.log(Cx.add(z, Cx.mul(Cx.sqrt(Cx.add(z, ONE)), Cx.sqrt(Cx.sub(z, ONE)))));
Cx.atanh = z => Cx.mul([0.5, 0], Cx.sub(Cx.log(Cx.add(ONE, z)), Cx.log(Cx.sub(ONE, z))));
const inv = f => (z => Cx.div(ONE, f(z)));

/* ---------- gamma / factorial ---------- */
function gamma(x) {
  if (Number.isInteger(x)) { if (x <= 0) return NaN; let r = 1; for (let k = 2; k < x; k++) r *= k; return r; }
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  const g = 7, p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  x -= 1; let a = p[0]; const t = x + g + 0.5;
  for (let i = 1; i < 9; i++) a += p[i] / (x + i);
  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}
const factorial = n => gamma(n + 1);
const nCr = (n, r) => (Number.isInteger(n) && Number.isInteger(r)) ? (r < 0 || r > n ? 0 : Math.round(factorial(n) / (factorial(r) * factorial(n - r)))) : gamma(n + 1) / (gamma(r + 1) * gamma(n - r + 1));
const nPr = (n, r) => (r < 0 || r > n) ? 0 : Math.round(factorial(n) / factorial(n - r));

/* ---------- parser ---------- */
const FN_ARITY = {
  sin: 1, cos: 1, tan: 1, sec: 1, cosec: 1, csc: 1, cot: 1,
  arcsin: 1, arccos: 1, arctan: 1, asin: 1, acos: 1, atan: 1,
  sinh: 1, cosh: 1, tanh: 1, sech: 1, cosech: 1, csch: 1, coth: 1,
  arsinh: 1, arcosh: 1, artanh: 1, arcsinh: 1, arccosh: 1, arctanh: 1, asinh: 1, acosh: 1, atanh: 1,
  sqrt: 1, cbrt: 1, ln: 1, log: [1, 2], exp: 1, abs: 1, root: 2, ncr: 2, npr: 2, floor: 1, ceil: 1, round: 1, sign: 1,
  re: 1, im: 1, arg: 1, conj: 1, max: [1, 99], min: [1, 99], gamma: 1, mod: 2, frac: 1,
};
const ALIAS = { asin: 'arcsin', acos: 'arccos', atan: 'arctan', csc: 'cosec', csch: 'cosech', arcsinh: 'arsinh', arccosh: 'arcosh', arctanh: 'artanh', asinh: 'arsinh', acosh: 'arcosh', atanh: 'artanh' };
const CONSTS = ['pi', 'e', 'i', 'ans'];

function normalise(s) {
  return s.replace(/π/g, 'pi').replace(/θ/g, 'theta').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/[−–]/g, '-').replace(/\*\*/g, '^')
    .replace(/nCr/g, 'ncr').replace(/nPr/g, 'npr');
}
function lex(src, vars) {
  const s = normalise(src), out = [];
  const names = [...Object.keys(FN_ARITY), ...CONSTS, ...vars].sort((a, b) => b.length - a.length);
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) { i++; continue; }
    const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if (m) { out.push({ t: 'n', v: parseFloat(m[1]) }); i += m[1].length; continue; }
    if ('+-*/^(),!²³°√'.includes(c)) { out.push({ t: c }); i++; continue; }
    const low = s.slice(i).toLowerCase();
    const exact = vars.filter(v => s.startsWith(v, i)).sort((a, b) => b.length - a.length)[0];
    let name = names.find(n => low.startsWith(n.toLowerCase()) && (vars.includes(n) ? s.startsWith(n, i) : true));
    if (exact && (!name || exact.length >= name.length)) name = exact; // a variable typed with exact case beats a same-length function/constant
    if (name) {
      i += name.length;
      if (vars.includes(name)) out.push({ t: 'v', v: name });
      else if (CONSTS.includes(name)) out.push({ t: 'c', v: name });
      else out.push({ t: 'f', v: ALIAS[name] || name });
      continue;
    }
    throw new Error(`Unexpected "${c}"`);
  }
  return out;
}
// AST nodes: ['n', v] ['c', name] ['v', name] ['neg', a] ['+', a, b] ... ['f', name, args] ['!', a]
function parse(src, vars = []) {
  const tk = lex(src, vars); let p = 0;
  if (!tk.length) throw new Error('Empty');
  const peek = () => tk[p], eat = t => (tk[p] && tk[p].t === t ? (p++, true) : false);
  const starts = k => k && (k.t === 'n' || k.t === 'c' || k.t === 'v' || k.t === 'f' || k.t === '(' || k.t === '√');
  function expr() { let a = term(); for (;;) { if (eat('+')) a = ['+', a, term()]; else if (eat('-')) a = ['-', a, term()]; else return a; } }
  function term() {
    let a = unary();
    for (;;) {
      if (eat('*')) a = ['*', a, unary()];
      else if (eat('/')) a = ['/', a, unary()];
      else if (starts(peek())) a = ['*', a, power()];
      else return a;
    }
  }
  function unary() { if (eat('-')) return ['neg', unary()]; if (eat('+')) return unary(); return power(); }
  function power() { const b = postfix(); if (eat('^')) return ['^', b, unary()]; return b; }
  function postfix() {
    let a = atom();
    for (;;) {
      if (eat('!')) a = ['!', a]; else if (eat('²')) a = ['^', a, ['n', 2]]; else if (eat('³')) a = ['^', a, ['n', 3]];
      else if (eat('°')) a = ['*', a, ['n', Math.PI / 180]]; else return a;
    }
  }
  function atom() {
    const k = tk[p++];
    if (!k) throw new Error('Unexpected end');
    if (k.t === 'n') return ['n', k.v];
    if (k.t === 'c') return ['c', k.v];
    if (k.t === 'v') return ['v', k.v];
    if (k.t === '√') return ['f', 'sqrt', [power()]];
    if (k.t === '(') { const e = expr(); if (!eat(')')) throw new Error('Missing )'); return e; }
    if (k.t === 'f') {
      let ex = null;
      if (eat('^')) ex = postfix(); // sin^2(x)
      let args;
      if (peek() && peek().t === '(') {
        p++; args = [expr()]; while (eat(',')) args.push(expr());
        if (!eat(')')) throw new Error('Missing )');
      } else args = [power()];
      const ar = FN_ARITY[k.v], [lo, hi] = Array.isArray(ar) ? ar : [ar, ar];
      if (args.length < lo || args.length > hi) throw new Error(`${k.v} takes ${lo === hi ? lo : lo + '–' + hi} argument${hi > 1 ? 's' : ''}`);
      const node = ['f', k.v, args];
      return ex ? ['^', node, ex] : node;
    }
    throw new Error(`Unexpected "${k.t}"`);
  }
  const ast = expr();
  if (p !== tk.length) throw new Error(`Unexpected "${tk[p].t === 'n' ? tk[p].v : tk[p].v || tk[p].t}"`);
  return ast;
}

/* ---------- compile to closures ---------- */
function compileReal(ast, { deg = false } = {}) {
  const k = deg ? Math.PI / 180 : 1, ki = deg ? 180 / Math.PI : 1;
  const F = {
    sin: x => Math.sin(x * k), cos: x => Math.cos(x * k), tan: x => Math.tan(x * k), sec: x => 1 / Math.cos(x * k), cosec: x => 1 / Math.sin(x * k), cot: x => 1 / Math.tan(x * k),
    arcsin: x => Math.asin(x) * ki, arccos: x => Math.acos(x) * ki, arctan: x => Math.atan(x) * ki,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, sech: x => 1 / Math.cosh(x), cosech: x => 1 / Math.sinh(x), coth: x => 1 / Math.tanh(x),
    arsinh: Math.asinh, arcosh: Math.acosh, artanh: Math.atanh,
    sqrt: Math.sqrt, cbrt: Math.cbrt, ln: Math.log, log: (x, b) => b === undefined ? Math.log10(x) : Math.log(x) / Math.log(b), exp: Math.exp, abs: Math.abs,
    root: (x, n) => (x < 0 && Math.round(n) % 2 === 1 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n)), ncr: nCr, npr: nPr,
    floor: Math.floor, ceil: Math.ceil, round: Math.round, sign: Math.sign, re: x => x, im: () => 0, arg: x => (x < 0 ? Math.PI : 0) * ki, conj: x => x,
    max: Math.max, min: Math.min, gamma, mod: (a, b) => ((a % b) + b) % b, frac: x => x - Math.trunc(x),
  };
  function c(n) {
    switch (n[0]) {
      case 'n': { const v = n[1]; return () => v; }
      case 'c': { const nm = n[1]; if (nm === 'pi') return () => Math.PI; if (nm === 'e') return () => Math.E; if (nm === 'i') return () => NaN; return env => (env.ans ?? 0); }
      case 'v': { const nm = n[1]; return env => env[nm]; }
      case 'neg': { const a = c(n[1]); return e => -a(e); }
      case '+': { const a = c(n[1]), b = c(n[2]); return e => a(e) + b(e); }
      case '-': { const a = c(n[1]), b = c(n[2]); return e => a(e) - b(e); }
      case '*': { const a = c(n[1]), b = c(n[2]); return e => a(e) * b(e); }
      case '/': { const a = c(n[1]), b = c(n[2]); return e => a(e) / b(e); }
      case '^': { const a = c(n[1]), b = c(n[2]); return e => { const x = a(e), y = b(e); if (x < 0 && !Number.isInteger(y)) { const q = 1 / y; if (Number.isInteger(Math.round(q * 1e9) / 1e9) && Math.round(q) % 2) return -Math.pow(-x, y); } return Math.pow(x, y); }; }
      case '!': { const a = c(n[1]); return e => factorial(a(e)); }
      case 'f': { const f = F[n[1]], as = n[2].map(c); return as.length === 1 ? (e => f(as[0](e))) : (e => f(...as.map(g => g(e)))); }
    }
    throw new Error('bad node');
  }
  return c(ast);
}
function compileComplex(ast) {
  const lift = f => (z => (z[1] === 0 ? [f(z[0]), 0] : [NaN, NaN]));
  const F = {
    sin: Cx.sin, cos: Cx.cos, tan: Cx.tan, sec: inv(Cx.cos), cosec: inv(Cx.sin), cot: inv(Cx.tan),
    arcsin: Cx.asin, arccos: Cx.acos, arctan: Cx.atan, sinh: Cx.sinh, cosh: Cx.cosh, tanh: Cx.tanh,
    sech: inv(Cx.cosh), cosech: inv(Cx.sinh), coth: inv(Cx.tanh), arsinh: Cx.asinh, arcosh: Cx.acosh, artanh: Cx.atanh,
    sqrt: Cx.sqrt, cbrt: z => Cx.pow(z, [1 / 3, 0]), ln: Cx.log, log: (z, b) => b ? Cx.div(Cx.log(z), Cx.log(b)) : Cx.div(Cx.log(z), [Math.LN10, 0]), exp: Cx.exp,
    abs: z => [Cx.abs(z), 0], root: (z, n) => Cx.pow(z, Cx.div(ONE, n)), re: z => [z[0], 0], im: z => [z[1], 0], arg: z => [Cx.arg(z), 0], conj: Cx.conj,
    ncr: (a, b) => [nCr(a[0], b[0]), 0], npr: (a, b) => [nPr(a[0], b[0]), 0], gamma: lift(gamma), floor: lift(Math.floor), ceil: lift(Math.ceil), round: lift(Math.round), sign: lift(Math.sign),
    max: (...a) => [Math.max(...a.map(z => z[0])), 0], min: (...a) => [Math.min(...a.map(z => z[0])), 0], mod: (a, b) => [((a[0] % b[0]) + b[0]) % b[0], 0], frac: lift(x => x - Math.trunc(x)),
  };
  function c(n) {
    switch (n[0]) {
      case 'n': { const v = [n[1], 0]; return () => v; }
      case 'c': { const nm = n[1]; if (nm === 'pi') return () => [Math.PI, 0]; if (nm === 'e') return () => [Math.E, 0]; if (nm === 'i') return () => I; return env => env.ans || [0, 0]; }
      case 'v': { const nm = n[1]; return env => env[nm]; }
      case 'neg': { const a = c(n[1]); return e => Cx.neg(a(e)); }
      case '+': { const a = c(n[1]), b = c(n[2]); return e => Cx.add(a(e), b(e)); }
      case '-': { const a = c(n[1]), b = c(n[2]); return e => Cx.sub(a(e), b(e)); }
      case '*': { const a = c(n[1]), b = c(n[2]); return e => Cx.mul(a(e), b(e)); }
      case '/': { const a = c(n[1]), b = c(n[2]); return e => Cx.div(a(e), b(e)); }
      case '^': { const a = c(n[1]), b = c(n[2]); return e => Cx.pow(a(e), b(e)); }
      case '!': { const a = c(n[1]); return e => [factorial(a(e)[0]), 0]; }
      case 'f': { const f = F[n[1]], as = n[2].map(c); return e => f(...as.map(g => g(e))); }
    }
    throw new Error('bad node');
  }
  return c(ast);
}
function hasI(n) { if (!Array.isArray(n)) return false; if (n[0] === 'c' && n[1] === 'i') return true; return n.slice(1).some(x => Array.isArray(x) && (typeof x[0] === 'string' ? hasI(x) : x.some(hasI))); }

// Real function of named variables, e.g. fn('x^2+1', ['x']) -> (x) => ...
function fn(src, vars = ['x'], opts) { const f = compileReal(parse(src, vars), opts); return (...a) => { const env = {}; vars.forEach((v, i) => env[v] = a[i]); return f(env); }; }
function evalExpr(str, env = {}) { try { return compileReal(parse(str, Object.keys(env).filter(k => k !== 'ans')))(env); } catch { return NaN; } }

/* ---------- recognising exact values ---------- */
function fracOf(x, maxQ = 1000) {
  if (!isFinite(x)) return null;
  // continued fractions
  let h1 = 1, h0 = 0, k1 = 0, k0 = 1, b = x;
  for (let i = 0; i < 25; i++) {
    const a = Math.floor(b), h2 = a * h1 + h0, k2 = a * k1 + k0;
    if (k2 > maxQ) break;
    h0 = h1; h1 = h2; k0 = k1; k1 = k2;
    if (Math.abs(x - h1 / k1) < 1e-11 * Math.max(1, Math.abs(x))) return [h1, k1];
    b = 1 / (b - a); if (!isFinite(b)) break;
  }
  return Math.abs(x - h1 / k1) < 1e-11 * Math.max(1, Math.abs(x)) ? [h1, k1] : null;
}
// Returns {text, tex} for a "nice" closed form of x, or null.
function identify(x) {
  if (!isFinite(x)) return null;
  if (Math.abs(x) < 1e-13) return { text: '0', tex: '0' };
  const f = fracOf(x); if (f) return f[1] === 1 ? { text: '' + f[0], tex: '' + f[0] } : { text: `${f[0]}/${f[1]}`, tex: fr(f[0], f[1]) };
  const tryMul = (base, name, tname, maxQ = 360) => { const q = fracOf(x / base, maxQ); if (!q || Math.abs(q[0]) > 9999) return null; const [n, d] = q; const sN = n < 0 ? '-' : '', a = Math.abs(n); return { text: `${sN}${a === 1 ? '' : a}${name}${d === 1 ? '' : '/' + d}`, tex: d === 1 ? `${sN}${a === 1 ? '' : a}${tname}` : `${sN}\\frac{${a === 1 ? '' : a}${tname}}{${d}}` }; };
  for (const k of [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30]) { const r = tryMul(Math.sqrt(k), `√${k}`, `\\sqrt{${k}}`, 120); if (r) return r; }
  let r = tryMul(Math.PI, 'π', '\\pi'); if (r) return r;
  r = tryMul(Math.PI * Math.PI, 'π²', '\\pi^2', 120); if (r) return r;
  r = tryMul(Math.E, 'e', 'e', 120); if (r) return r;
  for (const k of [2, 3, 5, 6, 7, 10]) { r = tryMul(Math.log(k), `ln${k}`, `\\ln${k}`, 60); if (r) return r; }
  for (const k of [2, 3]) { r = tryMul(Math.PI * Math.sqrt(k), `π√${k}`, `\\pi\\sqrt{${k}}`, 60); if (r) return r; }
  // a + b√k with small rationals
  for (const k of [2, 3, 5]) for (let d = 1; d <= 12; d++) for (let bN = -12; bN <= 12; bN++) { if (!bN) continue; const rest = x - bN * Math.sqrt(k) / d, q = fracOf(rest, 12); if (q && Math.abs(q[0]) < 200) { const A = q[1] === 1 ? '' + q[0] : `${q[0]}/${q[1]}`, B = `${Math.abs(bN) === 1 ? '' : Math.abs(bN)}√${k}${d === 1 ? '' : '/' + d}`; return { text: `${A} ${bN < 0 ? '−' : '+'} ${B}`, tex: `${q[1] === 1 ? q[0] : fr(q[0], q[1])}${bN < 0 ? '-' : '+'}${d === 1 ? `${Math.abs(bN) === 1 ? '' : Math.abs(bN)}\\sqrt{${k}}` : `\\frac{${Math.abs(bN) === 1 ? '' : Math.abs(bN)}\\sqrt{${k}}}{${d}}`}` }; } }
  return null;
}
const fmtNum = (x, sf = 10) => { if (!isFinite(x)) return isNaN(x) ? 'Math error' : (x > 0 ? '∞' : '−∞'); if (Math.abs(x) < 1e-14) return '0'; const s = (+x.toPrecision(sf)).toString(); return s.includes('e') ? (+x.toPrecision(sf)).toExponential(sf - 1).replace(/\.?0+e/, 'e').replace('e', ' × 10^') : s; };
const fmtCx = (z, sf = 8) => { const [a, b] = z.map(v => (Math.abs(v) < 1e-12 ? 0 : v)); if (!b) return fmtNum(a, sf); if (!a) return `${fmtNum(b, sf)}i`.replace(/^1i$/, 'i').replace(/^-1i$/, '-i'); return `${fmtNum(a, sf)} ${b < 0 ? '−' : '+'} ${fmtNum(Math.abs(b), sf)}i`; };

/* ---------- numerics ---------- */
// Polynomial roots (coefficients highest power first), Durand–Kerner
function polyRoots(coeffs) {
  let c = coeffs.map(v => (Array.isArray(v) ? v : [v, 0]));
  while (c.length && Cx.abs(c[0]) < 1e-14) c.shift();
  const n = c.length - 1; if (n < 1) return [];
  c = c.map(v => Cx.div(v, c[0]));
  const evalP = z => c.reduce((s, a) => Cx.add(Cx.mul(s, z), a), [0, 0]);
  const R = 1 + Math.max(...c.slice(1).map(Cx.abs));
  let z = Array.from({ length: n }, (_, k) => Cx.mul([R * 0.9, 0], Cx.exp([0, 2 * Math.PI * k / n + 0.4])));
  for (let it = 0; it < 800; it++) {
    let mx = 0;
    z = z.map((zi, i) => { let d = ONE; z.forEach((zj, j) => { if (i !== j) d = Cx.mul(d, Cx.sub(zi, zj)); }); const step = Cx.div(evalP(zi), d); mx = Math.max(mx, Cx.abs(step)); return Cx.sub(zi, step); });
    if (mx < 1e-15) break;
  }
  // polish with Newton
  const dc = c.slice(0, -1).map((a, i) => Cx.mul(a, [n - i, 0]));
  const evalD = zz => dc.reduce((s, a) => Cx.add(Cx.mul(s, zz), a), [0, 0]);
  z = z.map(zi => { for (let k = 0; k < 5; k++) { const d = evalD(zi); if (Cx.abs(d) < 1e-14) break; zi = Cx.sub(zi, Cx.div(evalP(zi), d)); } return zi; });
  return z.map(v => v.map(x => (Math.abs(x) < 1e-10 ? 0 : x))).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
}
// Solve Ax = b (Gaussian elimination, partial pivoting). Returns null if singular.
function solveLinear(A, b) {
  const n = A.length, M2 = A.map((r, i) => [...r, b[i]]);
  for (let col = 0; col < n; col++) {
    let piv = col; for (let r = col + 1; r < n; r++) if (Math.abs(M2[r][col]) > Math.abs(M2[piv][col])) piv = r;
    if (Math.abs(M2[piv][col]) < 1e-12) return null;
    [M2[col], M2[piv]] = [M2[piv], M2[col]];
    for (let r = 0; r < n; r++) if (r !== col) { const f = M2[r][col] / M2[col][col]; for (let k = col; k <= n; k++) M2[r][k] -= f * M2[col][k]; }
  }
  return M2.map((r, i) => r[n] / r[i]);
}
// Adaptive Simpson
function integrate(f, a, b, eps = 1e-10) {
  const S = (a, b, fa, fm, fb) => (b - a) / 6 * (fa + 4 * fm + fb);
  function rec(a, b, fa, fm, fb, whole, eps, depth) {
    const m = (a + b) / 2, lm = (a + m) / 2, rm = (m + b) / 2, flm = f(lm), frm = f(rm);
    const left = S(a, m, fa, flm, fm), right = S(m, b, fm, frm, fb);
    if (depth <= 0 || Math.abs(left + right - whole) <= 15 * eps) return left + right + (left + right - whole) / 15;
    return rec(a, m, fa, flm, fm, left, eps / 2, depth - 1) + rec(m, b, fm, frm, fb, right, eps / 2, depth - 1);
  }
  const fa = f(a), fb = f(b), fm = f((a + b) / 2);
  return rec(a, b, fa, fm, fb, S(a, b, fa, fm, fb), eps, 40);
}
// Integral handling infinite limits / endpoint singularities via substitution
function integrateSmart(f, a, b) {
  if (a === b) return 0;
  if (a > b) return -integrateSmart(f, b, a);
  const g = x => { const v = f(x); return isFinite(v) ? v : 0; };
  if (!isFinite(a) && !isFinite(b)) return integrateSmart(f, -Infinity, 0) + integrateSmart(f, 0, Infinity);
  if (!isFinite(b)) return integrate(t => { const x = a + t / (1 - t); return g(x) / ((1 - t) * (1 - t)); }, 0, 1 - 1e-12, 1e-9);
  if (!isFinite(a)) return integrate(t => { const x = b - t / (1 - t); return g(x) / ((1 - t) * (1 - t)); }, 0, 1 - 1e-12, 1e-9);
  // tanh-sinh style endpoint softening: x = a + (b-a)(1-cos u)/2
  return integrate(u => g(a + (b - a) * (1 - Math.cos(u)) / 2) * (b - a) * Math.sin(u) / 2, 0, Math.PI, 1e-11);
}
// Taylor coefficients of f (complex-capable compiled fn) about a, via Cauchy integral on a circle of radius r
function taylorCoeffs(fc, a, n, r = 0.5, N = 256) {
  const out = [];
  const vals = []; for (let k = 0; k < N; k++) { const th = 2 * Math.PI * k / N; vals.push(fc([a + r * Math.cos(th), r * Math.sin(th)])); }
  for (let m = 0; m <= n; m++) {
    let s = [0, 0]; for (let k = 0; k < N; k++) { const th = -2 * Math.PI * k * m / N; s = Cx.add(s, Cx.mul(vals[k], [Math.cos(th), Math.sin(th)])); }
    out.push(s[0] / N / Math.pow(r, m));
  }
  return out;
}
// RK4 for systems: f(x, Y) -> dY/dx
function rk4(f, x0, Y0, x1, steps = 1000) {
  const h = (x1 - x0) / steps, pts = [[x0, ...Y0]]; let x = x0, Y = Y0.slice();
  const add = (A, B, k) => A.map((v, i) => v + k * B[i]);
  for (let i = 0; i < steps; i++) {
    const k1 = f(x, Y), k2 = f(x + h / 2, add(Y, k1, h / 2)), k3 = f(x + h / 2, add(Y, k2, h / 2)), k4 = f(x + h, add(Y, k3, h));
    Y = Y.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])); x += h;
    if (!Y.every(isFinite)) break;
    pts.push([x, ...Y]);
  }
  return pts;
}
