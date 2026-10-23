// A small, dependency-free TeX → HTML (and → plain text) converter for the static /learn/ pages.
// It covers the subset the BCS Academy content uses (fractions, powers, roots, matrices, Greek, operators, arrows,
// accents, \text, \mathbf, \mathbb …). The output is readable with CSS only: no JavaScript, no fonts to download.

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SYM = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ϵ', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ', vartheta: 'ϑ', iota: 'ι', kappa: 'κ',
  lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', varpi: 'ϖ', rho: 'ρ', varrho: 'ϱ', sigma: 'σ', varsigma: 'ς', tau: 'τ', upsilon: 'υ', phi: 'ϕ', varphi: 'φ',
  chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Theta: 'Θ', Lambda: 'Λ', Xi: 'Ξ', Pi: 'Π', Sigma: 'Σ', Upsilon: 'Υ', Phi: 'Φ', Psi: 'Ψ', Omega: 'Ω',
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', ast: '∗', star: '⋆', circ: '∘', bullet: '•', le: '≤', leq: '≤', ge: '≥', geq: '≥', lt: '<', gt: '>',
  ne: '≠', neq: '≠', approx: '≈', sim: '∼', simeq: '≃', cong: '≅', equiv: '≡', propto: '∝', ll: '≪', gg: '≫', infty: '∞', partial: '∂', nabla: '∇',
  int: '∫', iint: '∬', oint: '∮', sum: '∑', prod: '∏', to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔',
  iff: '⇔', implies: '⇒', impliedby: '⇐', Longrightarrow: '⟹', Longleftarrow: '⟸', Longleftrightarrow: '⟺', longrightarrow: '⟶', leftrightarrow: '↔', mapsto: '↦',
  uparrow: '↑', downarrow: '↓', in: '∈', notin: '∉', ni: '∋', subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇', cup: '∪', cap: '∩', emptyset: '∅',
  varnothing: '∅', forall: '∀', exists: '∃', neg: '¬', lnot: '¬', land: '∧', lor: '∨', wedge: '∧', vee: '∨', therefore: '∴', because: '∵', perp: '⊥',
  parallel: '∥', angle: '∠', triangle: '△', degree: '°', prime: '′', dots: '…', ldots: '…', cdots: '⋯', vdots: '⋮', ddots: '⋱', blacksquare: '■', square: '□',
  qed: '∎', hbar: 'ħ', ell: 'ℓ', Re: 'ℜ', Im: 'ℑ', aleph: 'ℵ', mid: '∣', vert: '|', Vert: '‖', lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉', langle: '⟨',
  rangle: '⟩', backslash: '\\', setminus: '∖', oplus: '⊕', otimes: '⊗', dagger: '†', checkmark: '✓', surd: '√', S: '§', pounds: '£', lbrace: '{', rbrace: '}',
};
const FUNCS = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cosec', 'cot', 'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh', 'coth', 'sech', 'cosech', 'csch',
  'arsinh', 'arcosh', 'artanh', 'ln', 'log', 'lg', 'exp', 'lim', 'liminf', 'limsup', 'max', 'min', 'sup', 'inf', 'det', 'arg', 'deg', 'gcd', 'dim', 'ker', 'mod', 'bmod', 'Pr', 'tr']);
const BB = { R: 'ℝ', Z: 'ℤ', N: 'ℕ', Q: 'ℚ', C: 'ℂ', P: 'ℙ', E: '𝔼' };
const SPACE = { ',': ' ', ':': ' ', ';': ' ', ' ': ' ', '!': '', quad: ' ', qquad: '  ', enspace: ' ', thinspace: ' ' };
const IGNORE = new Set(['displaystyle', 'textstyle', 'scriptstyle', 'limits', 'nolimits', 'left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr',
  'biggl', 'biggr', 'middle', 'nonumber', 'notag', 'phantom', 'strut', 'normalsize', 'small', 'large', 'Large']);
const ACCENT = { hat: '̂', widehat: '̂', tilde: '̃', widetilde: '̃', dot: '̇', ddot: '̈', check: '̌', breve: '̆', acute: '́', grave: '̀' };
const SUPC = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻', '−': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ', x: 'ˣ', T: 'ᵀ' };
const SUBC = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', '+': '₊', '-': '₋', '−': '₋', '=': '₌', '(': '₍', ')': '₎', n: 'ₙ', r: 'ᵣ', i: 'ᵢ', k: 'ₖ', x: 'ₓ' };
const REL = new Set(['=', '<', '>', '≤', '≥', '≠', '≈', '≡', '→', '⇒', '⇐', '⇔', '⟹', '⟺', '∈', '∉', '⊂', '⊆', '∼', '≅', '∝', '↦', '←', '↔', '⟶', '∴']);
const BIN = new Set(['+', '−', '×', '÷', '±', '∓', '·', '∪', '∩']);

// Parse TeX source into a small tree, then render it to HTML or plain text.
function parse(src) {
  let i = 0;
  const peek = () => src[i];
  function readCmd() { // after a backslash
    let j = i;
    if (/[a-zA-Z]/.test(src[j] || '')) { while (/[a-zA-Z]/.test(src[j] || '')) j++; } else j++;
    const name = src.slice(i, j); i = j; return name;
  }
  function skipWs() { while (/\s/.test(src[i] || '')) i++; }
  function group(close) { // read nodes until close char (or end)
    const out = [];
    while (i < src.length) {
      const c = src[i];
      if (close && c === close) { i++; return out; }
      if (close === null && c === '}') { i++; return out; }
      out.push(...atom());
    }
    return out;
  }
  function arg() { // one argument: {…} or a single token
    skipWs();
    if (src[i] === '{') { i++; return group('}'); }
    return atom();
  }
  function optArg() { skipWs(); if (src[i] === '[') { i++; const out = []; while (i < src.length && src[i] !== ']') out.push(...atom()); i++; return out; } return null; }
  function textArg() { skipWs(); if (src[i] !== '{') return atom(); i++; let depth = 1, j = i; while (j < src.length && depth) { if (src[j] === '{') depth++; else if (src[j] === '}') depth--; j++; } const t = src.slice(i, j - 1); i = j; return [{ t: 'text', v: t }]; }
  function env(name) {
    const endTag = `\\end{${name}}`, k = src.indexOf(endTag, i);
    const body = src.slice(i, k < 0 ? src.length : k); i = k < 0 ? src.length : k + endTag.length;
    const rows = body.split(/\\\\/).map(r => r.trim()).filter((r, n, a) => r || n < a.length - 1).map(r => r.split(/(?<!\\)&/).map(c => parse(c)));
    return [{ t: 'env', name, rows }];
  }
  function atom() {
    const c = src[i];
    if (c === undefined) return [];
    if (/\s/.test(c)) { i++; return [{ t: 'ws' }]; }
    if (c === '{') { i++; return [{ t: 'grp', k: group('}') }]; }
    if (c === '}') { i++; return []; }
    if (c === '^' || c === '_') { i++; return [{ t: c === '^' ? 'sup' : 'sub', k: arg() }]; }
    if (c === '~') { i++; return [{ t: 'ch', v: ' ' }]; }
    if (c === '&') { i++; return [{ t: 'ch', v: ' ' }]; }
    if (c === "'") { i++; let n = 1; while (src[i] === "'") { n++; i++; } return [{ t: 'ch', v: n === 1 ? '′' : n === 2 ? '″' : '‴' }]; }
    if (c !== '\\') { i++; return [{ t: /[a-zA-Z]/.test(c) ? 'var' : 'ch', v: c === '-' ? '−' : c === '*' ? '∗' : c }]; }
    i++; const name = readCmd();
    if (name in SPACE) return [{ t: 'sp', v: SPACE[name] }];
    if (name === '\\') return [{ t: 'br' }];
    if ('{}%$&#_|'.includes(name) && name.length === 1) return [{ t: 'ch', v: name === '|' ? '‖' : name }];
    if (IGNORE.has(name)) { if (name === 'left' || name === 'right' || /^big/i.test(name) || name === 'middle') { skipWs(); if (src[i] === '.') { i++; return []; } } if (name === 'phantom') arg(); return []; }
    if (name === 'frac' || name === 'dfrac' || name === 'tfrac' || name === 'cfrac') return [{ t: 'frac', n: arg(), d: arg() }];
    if (name === 'binom' || name === 'dbinom' || name === 'tbinom') return [{ t: 'binom', n: arg(), d: arg() }];
    if (name === 'sqrt') { const idx = optArg(); return [{ t: 'sqrt', idx, k: arg() }]; }
    if (name === 'mathbb') { const a = textArg()[0]; const v = a && a.t === 'text' ? a.v : a ? a.v : ''; return [{ t: 'ch', v: [...v].map(x => BB[x] || x).join('') }]; }
    if (name === 'mathbf' || name === 'boldsymbol' || name === 'bm' || name === 'pmb') return [{ t: 'bold', k: arg() }];
    if (name === 'mathit') return [{ t: 'grp', k: arg() }];
    if (name === 'mathcal' || name === 'mathscr') return [{ t: 'grp', k: arg() }];
    if (['text', 'textrm', 'mathrm', 'textup', 'mbox', 'textnormal', 'textsf', 'mathsf', 'texttt', 'mathtt'].includes(name)) return name === 'mathrm' ? [{ t: 'rm', k: arg() }] : textArg().map(n => n.t === 'text' ? { t: 'text', v: n.v } : n);
    if (name === 'textbf') return [{ t: 'bold', k: textArg() }];
    if (name === 'textit' || name === 'emph') return [{ t: 'it', k: textArg() }];
    if (name === 'operatorname') { const a = textArg(); return [{ t: 'fn', v: a.map(n => n.v || '').join('') }]; }
    if (FUNCS.has(name)) return [{ t: 'fn', v: name === 'csc' ? 'cosec' : name === 'bmod' ? 'mod' : name }];
    if (name === 'bar' || name === 'overline') return [{ t: 'over', k: arg() }];
    if (name === 'underline') return [{ t: 'under', k: arg() }];
    if (name === 'vec' || name === 'overrightarrow' || name === 'overleftrightarrow') return [{ t: 'vec', k: arg() }];
    if (name in ACCENT) return [{ t: 'acc', a: ACCENT[name], k: arg() }];
    if (name === 'underbrace' || name === 'overbrace') { const k = arg(); skipWs(); if (src[i] === '_' || src[i] === '^') { i++; arg(); } return [{ t: 'grp', k }]; }
    if (name === 'stackrel' || name === 'overset') { const top = arg(), base = arg(); return [{ t: 'grp', k: base }, { t: 'sup', k: top }]; }
    if (name === 'pmod') return [{ t: 'ch', v: ' (mod ' }, ...arg(), { t: 'ch', v: ')' }];
    if (name === 'color' || name === 'textcolor') { arg(); return name === 'textcolor' ? [{ t: 'grp', k: arg() }] : []; }
    if (name === 'begin') { const e = textArg()[0]; return env(e && e.v ? e.v : ''); }
    if (name === 'end') { textArg(); return []; }
    if (name === 'not') { const a = atom(); const v = a[0] && a[0].v; const neg = { '=': '≠', '∈': '∉', '<': '≮', '>': '≯', '≡': '≢', '⊂': '⊄' }; return [{ t: 'ch', v: neg[v] || (v || '') + '̸' }]; }
    if (name in SYM) return [{ t: 'ch', v: SYM[name] }];
    // single-letter commands used by the content as accents (\c, \k …) or unknown macros: keep the name readable
    return [{ t: 'rm', k: [{ t: 'text', v: name }] }];
  }
  return group(undefined);
}

// a + or − is binary only after an operand (not at the start, or after '(', ',', a relation or another operator)
function isBinary(ns, j) { let k = j - 1; while (k >= 0 && (ns[k].t === 'ws' || ns[k].t === 'sp')) k--; if (k < 0) return false; const p = ns[k]; return !(p.t === 'ch' && (REL.has(p.v) || BIN.has(p.v) || '([{,|:;'.includes(p.v))); }
const flatText = ns => ns.map(n => n.v != null ? n.v : n.k ? flatText(n.k) : '').join('');
const simple = ns => { const s = ns.filter(n => n.t !== 'ws'); return s.length === 1 && (s[0].t === 'var' || s[0].t === 'ch') ; };

function toHTML(ns) {
  let out = '';
  for (let j = 0; j < ns.length; j++) {
    const n = ns[j];
    switch (n.t) {
      case 'ws': break;
      case 'var': out += `<i>${esc(n.v)}</i>`; break;
      case 'ch': out += REL.has(n.v) ? ` ${esc(n.v)} ` : BIN.has(n.v) && isBinary(ns, j) ? ` ${esc(n.v)} ` : n.v === ',' ? ', ' : esc(n.v); break;
      case 'sp': out += n.v; break;
      case 'br': out += '<br>'; break;
      case 'text': out += `<span class="tt">${esc(n.v)}</span>`; break;
      case 'rm': out += `<span class="tt">${toHTML(n.k)}</span>`; break;
      case 'grp': out += toHTML(n.k); break;
      case 'bold': out += `<b>${toHTML(n.k).replace(/<\/?i>/g, '')}</b>`; break;
      case 'it': out += `<i>${toHTML(n.k)}</i>`; break;
      case 'fn': out += `<span class="tt">${esc(n.v)}</span> `; break;
      case 'sup': out += `<sup>${toHTML(n.k)}</sup>`; break;
      case 'sub': out += `<sub>${toHTML(n.k)}</sub>`; break;
      case 'frac': out += `<span class="fr"><span class="nu">${toHTML(n.n)}</span><span class="de">${toHTML(n.d)}</span></span>`; break;
      case 'binom': out += `(<span class="fr nb"><span class="nu">${toHTML(n.n)}</span><span class="de">${toHTML(n.d)}</span></span>)`; break;
      case 'sqrt': out += `${n.idx ? `<sup>${toHTML(n.idx)}</sup>` : ''}√<span class="ov">${toHTML(n.k)}</span>`; break;
      case 'over': out += `<span class="ov">${toHTML(n.k)}</span>`; break;
      case 'under': out += `<u>${toHTML(n.k)}</u>`; break;
      case 'vec': out += `<span class="vec">${toHTML(n.k)}</span>`; break;
      case 'acc': out += simple(n.k) ? `${toHTML(n.k).replace(/(<\/i>)?$/, m => n.a + m)}` : `<span class="ov">${toHTML(n.k)}</span>`; break;
      case 'env': {
        const kind = { pmatrix: ' pm', bmatrix: ' bm', vmatrix: ' vm', Vmatrix: ' vm', cases: ' cs' }[n.name] || '';
        const rows = n.rows.map(r => `<span class="mr">${r.map(c => `<span class="mc">${toHTML(c)}</span>`).join('')}</span>`).join('');
        out += `<span class="mx${kind}${n.name === 'cases' || n.name.startsWith('align') ? ' al' : ''}${n.name === 'smallmatrix' ? ' sm' : ''}">${rows}</span>`;
        break;
      }
    }
  }
  return out.replace(/ {2,}/g, ' ');
}

const wrapPlain = s => (/^[\w.′]+$|^\S$/.test(s) ? s : `(${s})`);
function supPlain(s) { s = s.replace(/\s+/g, ''); return [...s].every(c => SUPC[c]) ? [...s].map(c => SUPC[c]).join('') : '^' + wrapPlain(s); }
function subPlain(s) { s = s.replace(/\s+/g, ''); return [...s].every(c => SUBC[c]) ? [...s].map(c => SUBC[c]).join('') : '_' + wrapPlain(s); }
function toText(ns) {
  let out = '';
  for (let j = 0; j < ns.length; j++) {
    const n = ns[j];
    switch (n.t) {
      case 'ws': break;
      case 'var': out += n.v; break;
      case 'ch': out += REL.has(n.v) || (BIN.has(n.v) && isBinary(ns, j)) ? ` ${n.v} ` : n.v === ',' ? ', ' : n.v; break;
      case 'sp': out += n.v ? ' ' : ''; break;
      case 'br': out += '; '; break;
      case 'text': out += n.v; break;
      case 'fn': out += n.v + ' '; break;
      case 'sup': out += supPlain(toText(n.k).trim()); break;
      case 'sub': out += subPlain(toText(n.k).trim()); break;
      case 'frac': out += `${wrapPlain(toText(n.n).trim())}/${wrapPlain(toText(n.d).trim())}`; break;
      case 'binom': out += `C(${toText(n.n).trim()}, ${toText(n.d).trim()})`; break;
      case 'sqrt': out += '√' + wrapPlain(toText(n.k).trim()); break;
      case 'acc': out += toText(n.k) + n.a; break;
      case 'env': out += '[' + n.rows.map(r => r.map(c => toText(c).trim()).join(', ')).join('; ') + ']'; break;
      default: out += n.k ? toText(n.k) : '';
    }
  }
  return out.replace(/\s{2,}/g, ' ');
}

export const texToHTML = (src, display = false) => {
  let html; try { html = toHTML(parse(src)).trim(); } catch { html = esc(src); }
  return display ? `<div class="md" role="math" aria-label="${esc(texToText(src))}">${html}</div>` : `<span class="m">${html}</span>`;
};
export const texToText = src => { try { return toText(parse(src)).trim(); } catch { return src; } };

// Replace every $$…$$, \[…\], $…$ and \(…\) in an HTML string.
const MATH_RE = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$((?:\\\$|[^$])+?)\$/g;
export const mathInHTML = html => html.replace(MATH_RE, (_, d1, d2, i1, i2) => d1 != null || d2 != null ? texToHTML(d1 ?? d2, true) : texToHTML(i1 ?? i2, false));
export const mathInText = s => s.replace(MATH_RE, (_, d1, d2, i1, i2) => texToText(d1 ?? d2 ?? i1 ?? i2));
