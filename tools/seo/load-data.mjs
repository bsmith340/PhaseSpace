// Load the BCS Academy data files (the same scripts index.html loads, in the same order) into a Node vm
// context with stub browser globals, and return plain data: COURSES, COURSE_ORDER, BOOK, PHYS.UNITS/TOPICS, config.
// Throws (loudly) if a data script fails or the data does not look complete.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

// A "do anything" stub: any property is another stub, calling or constructing it returns a stub,
// and it converts to '' / 0. Enough for UI code that runs at load time (DOM, canvas, observers…).
function stub(name = 'stub') {
  const fn = function () { };
  return new Proxy(fn, {
    get(_, k) {
      if (k === Symbol.toPrimitive) return () => '';
      if (k === Symbol.iterator) return function* () { };
      if (k === 'then') return undefined; // never look like a promise
      if (k === 'toString' || k === 'valueOf') return () => '';
      if (k === 'length') return 0;
      return stub(name + '.' + String(k));
    },
    set() { return true; },
    apply() { return stub(name + '()'); },
    construct() { return stub('new ' + name); },
    has() { return true; },
  });
}

function makeContext() {
  const store = new Map();
  const localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k), clear: () => store.clear(), key: () => null, get length() { return store.size; },
  };
  const listeners = { addEventListener() { }, removeEventListener() { }, dispatchEvent() { return true; } };
  const g = {
    console: { log() { }, info() { }, warn() { }, error() { }, debug() { } },
    setTimeout: () => 0, clearTimeout() { }, setInterval: () => 0, clearInterval() { },
    requestAnimationFrame: () => 0, cancelAnimationFrame() { }, queueMicrotask() { },
    localStorage, sessionStorage: localStorage,
    matchMedia: () => ({ matches: false, media: '', ...listeners, addListener() { }, removeListener() { } }),
    document: stub('document'), navigator: { userAgent: 'node', language: 'en-GB', onLine: false, serviceWorker: undefined },
    location: { hash: '', href: 'https://example.invalid/', protocol: 'https:', host: 'example.invalid', origin: 'https://example.invalid', pathname: '/', search: '', replace() { }, reload() { } },
    history: stub('history'), screen: { width: 1280, height: 800 }, devicePixelRatio: 1, innerWidth: 1280, innerHeight: 800,
    MutationObserver: class { observe() { } disconnect() { } }, ResizeObserver: class { observe() { } unobserve() { } disconnect() { } },
    IntersectionObserver: class { observe() { } unobserve() { } disconnect() { } },
    Event: class { constructor(t) { this.type = t; } }, CustomEvent: class { constructor(t, o) { this.type = t; this.detail = o && o.detail; } },
    Node: class { }, HTMLElement: class { }, Element: class { }, Image: class { },
    AudioContext: undefined, speechSynthesis: undefined, fetch: () => Promise.reject(new Error('offline')),
    performance: { now: () => 0 }, getComputedStyle: () => stub('style'), scrollTo() { }, alert() { }, confirm: () => false, prompt: () => null,
    ...listeners,
    URL, URLSearchParams, TextEncoder, TextDecoder, structuredClone, Intl, Math, JSON, Date, Promise, Symbol, Map, Set, WeakMap, WeakSet,
  };
  g.window = g; g.self = g; g.globalThis = g;
  return vm.createContext(g);
}

export function loadData(siteDir) {
  const html = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script[^>]*\ssrc="(js\/[^"]+)"/g)].map(m => m[1]).filter(s => s !== 'js/app.js');
  if (!scripts.length) throw new Error('No local <script src="js/…"> tags found in index.html');
  if (!scripts.includes('js/config.js')) scripts.unshift('js/config.js'); // config is lead-owned; load it if present
  // physics.js and the past-papers bundle are loaded on demand by the app (see loadBundle() in js/app.js), so
  // index.html no longer references them directly — add them back here, the SEO build still needs their data.
  const LAZY = [
    'js/physics.js',
    'js/bcsp.js', 'js/bcsp-m1.js', 'js/bcsp-m2.js', 'js/bcsp-m3.js', 'js/bcsp-m4.js',
    'js/bcsp-f1.js', 'js/bcsp-f2.js', 'js/bcsp-fm.js', 'js/bcsp-f4.js',
    'js/bcsp-as1.js', 'js/bcsp-as2.js', 'js/bcsp-a21.js', 'js/bcsp-a22.js',
    'js/ccea-papers.js', 'js/walkthrough.js', 'js/papers.js',
  ];
  for (const s of LAZY) if (!scripts.includes(s)) scripts.push(s);
  const ctx = makeContext();
  // only these must load: everything else is UI (sims, labs, calculator) and may fail harmlessly under stubs
  const required = s => /^js\/(config|util|mathengine|content-|spec|book-|figs|physics)/.test(s);
  const warnings = [];
  for (const s of scripts) {
    const file = path.join(siteDir, s);
    if (!fs.existsSync(file)) { if (required(s) && s !== 'js/config.js') throw new Error(`Missing data script ${s}`); continue; }
    try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: s, timeout: 10000 }); }
    catch (e) { if (required(s)) throw new Error(`Data script ${s} failed under the SEO loader: ${e.stack || e}`); warnings.push(`${s}: ${e.message}`); }
  }
  const get = expr => { try { return vm.runInContext(expr, ctx); } catch { return undefined; } };
  const COURSES = get('COURSES'), COURSE_ORDER = get('COURSE_ORDER'), BOOK = get('BOOK'), PHYS = get('PHYS'), CONFIG = get('typeof BCS_CONFIG === "undefined" ? undefined : BCS_CONFIG');
  if (!COURSES || !COURSE_ORDER) throw new Error('COURSES not defined after loading the spec scripts');
  for (const id of ['m1', 'm2', 'm3', 'm4', 'f1', 'f2', 'fm', 'f4']) {
    const c = COURSES[id];
    if (!c || !c.points || !c.points.length) throw new Error(`Course ${id} missing or has no points`);
  }
  if (!BOOK || Object.keys(BOOK).length < 50) throw new Error('BOOK chapters missing');
  if (!PHYS || !Array.isArray(PHYS.UNITS) || !Array.isArray(PHYS.TOPICS) || PHYS.TOPICS.length < 20) throw new Error('PHYS.UNITS / PHYS.TOPICS missing from js/physics.js');
  return { COURSES, COURSE_ORDER, BOOK, PHYS, CONFIG, warnings, scripts };
}
