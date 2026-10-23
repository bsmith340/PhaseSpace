#!/usr/bin/env node
// BCS Academy · static SEO pages.
// The app uses hash routes (#/m1/point/…), which search engines do not index as separate pages. This build reads the
// same data files the app loads and writes one real, crawlable HTML page per spec point / physics topic under
// further-maths/learn/, plus hub pages, sitemap.xml and robots.txt. Every page links into the app.
//
//   node tools/build-seo.mjs           build (and validate) — the Cloudflare Pages build command
//   node tools/build-seo.mjs --check   validate the existing output only (unique titles, descriptions, links)
//
// Node 18+, no dependencies. Output is deterministic for the same data, except <lastmod> (the build date).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadData } from './seo/load-data.mjs';
import { mathInHTML, mathInText, texToHTML } from './seo/tex.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'further-maths');
const OUT = path.join(SITE, 'learn');
const SLUGS_FILE = path.join(ROOT, 'tools', 'seo', 'slugs.json');
const BRAND = 'BCS Academy';
const t0 = Date.now();

const fail = msg => { console.error(`\n✗ build-seo: ${msg}\n`); process.exit(1); };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = html => String(html || '').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<(details|summary)[^>]*>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const plain = html => strip(mathInText(String(html || ''))).replace(/\s+([,.;:)])/g, '$1').replace(/\(\s+/g, '(');
function clip(s, n) { s = s.trim(); if (s.length <= n) return s; const cut = s.slice(0, n - 1); const sp = cut.lastIndexOf(' '); return (sp > n * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s,;:.\-–—(]+$/, '') + '…'; }
const unitSlug = no => no.toLowerCase().replace(/\s+/g, '-');           // 'AS 1' → 'as-1', 'A2 1' → 'a2-1'
const GREEK = { α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', θ: 'theta', λ: 'lambda', μ: 'mu', π: 'pi', σ: 'sigma', ω: 'omega', χ: 'chi', Σ: 'sigma', Δ: 'delta', ρ: 'rho', φ: 'phi', ϕ: 'phi', τ: 'tau', ε: 'epsilon', ν: 'nu' };
function slugify(title) {
  let s = String(title).replace(/[αβγδθλμπσωχΣΔρφϕτεν]/g, c => ' ' + GREEK[c] + ' ').replace(/&/g, ' and ').replace(/[²]/g, '2').replace(/[³]/g, '3').replace(/ⁿ/g, 'n').replace(/ˣ/g, 'x')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (s.length > 64) { s = s.slice(0, 64); s = s.slice(0, s.lastIndexOf('-') > 30 ? s.lastIndexOf('-') : 64); }
  return s || 'page';
}
const jsonld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

/* ---------------- read the app's data ---------------- */
const CHECK_ONLY = process.argv.includes('--check');
let data;
if (!CHECK_ONLY) {
  try { data = loadData(SITE); } catch (e) { fail(e.message); }
  for (const w of data.warnings) console.warn('  (ui script skipped under stubs) ' + w);
}

/* ---------------- validation (also run after every build) ---------------- */
function walk(dir) { const out = []; for (const f of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, f.name); if (f.isDirectory()) out.push(...walk(p)); else out.push(p); } return out; }
function check() {
  if (!fs.existsSync(OUT)) fail(`no output at ${path.relative(ROOT, OUT)} — run the build first`);
  const files = walk(OUT).filter(f => f.endsWith('.html'));
  const errors = [], titles = new Map(), descs = new Map(); let longTitles = 0;
  const exists = href => {
    const p = decodeURI(href.split('#')[0].split('?')[0]);
    if (p === '/') return fs.existsSync(path.join(SITE, 'index.html'));
    const f = path.join(SITE, p);
    return p.endsWith('/') ? fs.existsSync(path.join(f, 'index.html')) : fs.existsSync(f);
  };
  for (const f of files) {
    const rel = '/' + path.relative(SITE, f).replace(/index\.html$/, '');
    const h = fs.readFileSync(f, 'utf8');
    const title = ((h.match(/<title>([^<]*)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&');
    const desc = ((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
    if (!title) errors.push(`${rel}: no <title>`); else { if (titles.has(title)) errors.push(`${rel}: duplicate title "${title}" (also ${titles.get(title)})`); titles.set(title, rel); if (title.length > 60) longTitles++; }
    if (!desc || desc.length < 50) errors.push(`${rel}: meta description missing or too short`); else { if (desc.length > 160) errors.push(`${rel}: description longer than 160 chars`); if (descs.has(desc)) errors.push(`${rel}: duplicate description (also ${descs.get(desc)})`); descs.set(desc, rel); }
    if (!canon || !canon.endsWith(rel)) errors.push(`${rel}: canonical missing or wrong (${canon})`);
    if (!/<html lang="en-GB"/.test(h)) errors.push(`${rel}: <html lang> missing`);
    if ((h.match(/<h1[\s>]/g) || []).length !== 1) errors.push(`${rel}: needs exactly one <h1>`);
    if (!/class="cta" href="\/(#\/[^"]*)?"/.test(h)) errors.push(`${rel}: no "Open in BCS Academy" button`);
    for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { errors.push(`${rel}: invalid JSON-LD`); } }
    for (const m of h.matchAll(/href="([^"]*)"/g)) {
      const href = m[1];
      if (href.startsWith('/#/') || href.startsWith('#') || /^(https?:|mailto:)/.test(href)) continue;
      if (!href.startsWith('/')) { errors.push(`${rel}: relative link ${href}`); continue; }
      if (!exists(href)) errors.push(`${rel}: broken internal link ${href}`);
    }
  }
  // sitemap ↔ pages
  const sm = path.join(SITE, 'sitemap.xml');
  if (!fs.existsSync(sm)) errors.push('sitemap.xml missing');
  else { const locs = [...fs.readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]); if (locs.length < files.length) errors.push(`sitemap.xml lists ${locs.length} URLs for ${files.length} pages`); }
  if (errors.length) { console.error(errors.slice(0, 60).join('\n')); fail(`${errors.length} problem(s) in ${files.length} pages`); }
  console.log(`✓ check: ${files.length} pages · titles unique (${longTitles} over 60 chars) · descriptions present & unique · internal links OK · JSON-LD parses`);
  return files.length;
}
if (CHECK_ONLY) { check(); process.exit(0); }

/* ---------------- model ---------------- */
const { COURSES, COURSE_ORDER, BOOK, PHYS, CONFIG } = data;
const SITE_URL = String((CONFIG && CONFIG.siteUrl) || '').replace(/\/+$/, '');
if (!/^https:\/\//.test(SITE_URL)) fail('BCS_CONFIG.siteUrl in further-maths/js/config.js must be an https:// URL');
const abs = p => SITE_URL + p;
const ogImage = ['assets/og-image.png', 'assets/play-feature.png', 'assets/icon-512.png'].find(f => fs.existsSync(path.join(SITE, f)));
const favicon = fs.existsSync(path.join(SITE, 'assets/favicon.svg')) ? '/assets/favicon.svg' : null;
const figCSS = (() => { try { return fs.readFileSync(path.join(SITE, 'css/app.css'), 'utf8').split('\n').filter(l => /^\.fig[\s.{]/.test(l)).join('\n'); } catch { return ''; } })();

const SUBJ = {
  maths: { slug: 'maths', name: 'Mathematics', label: 'Maths', board: 'CCEA GCE Mathematics (2018)', app: '/#/maths', tint: 'm',
    lead: 'Revision notes for every unit of CCEA GCE Mathematics: pure maths, mechanics and statistics, following the specification point by point.' },
  further: { slug: 'further-maths', name: 'Further Mathematics', label: 'Further Maths', board: 'CCEA GCE Further Mathematics (2018)', app: '/#/further', tint: 'f',
    lead: 'Revision notes for every unit of CCEA GCE Further Mathematics: further pure, mechanics, statistics and discrete & decision maths, with full proofs.' },
  physics: { slug: 'physics', name: 'Physics', label: 'Physics', board: 'CCEA GCE Physics (2016)', app: '/#/physics', tint: 'p',
    lead: 'Revision notes for CCEA GCE Physics AS 1, AS 2, A2 1 and A2 2: key ideas, equations and common mistakes for every section, with live labs in the app.' },
};
const UNIT_ORDER = ['AS 1', 'AS 2', 'A2 1', 'A2 2'];

// stable slugs: once a page has a URL it keeps it, even if its title changes later (tools/seo/slugs.json)
let SLUGS = {}; try { SLUGS = JSON.parse(fs.readFileSync(SLUGS_FILE, 'utf8')); } catch { }
const slugsBefore = JSON.stringify(SLUGS);
const usedPaths = new Set();
function stableSlug(key, title, prefix) {
  let s = SLUGS[key];
  if (!s || usedPaths.has(prefix + s)) { const base = slugify(title); s = base; for (let n = 2; usedPaths.has(prefix + s); n++) s = `${base}-${n}`; SLUGS[key] = s; }
  usedPaths.add(prefix + s); return s;
}

const units = []; // { subj, no, title, path, app, items: [...], groups, course? , phys? }
for (const q of ['maths', 'further']) {
  const ids = COURSE_ORDER.filter(id => COURSES[id].qual === q).sort((a, b) => UNIT_ORDER.indexOf(COURSES[a].unitNo) - UNIT_ORDER.indexOf(COURSES[b].unitNo));
  for (const id of ids) {
    const c = COURSES[id], upath = `/learn/${SUBJ[q].slug}/${unitSlug(c.unitNo)}/`;
    const u = { subj: q, no: c.unitNo, title: c.uname, path: upath, app: `/#/${id}`, course: c, items: [] };
    for (const t of c.topics) for (const p of t.points) {
      const slug = stableSlug(`${id}:${p.id}`, p.title, upath);
      u.items.push({ kind: 'point', id: p.id, p, t, code: p.code, title: p.title, path: upath + slug + '/', app: `/#/${id}/point/${p.id}`, drill: `/#/${id}/point/${p.id}?tab=drill` });
    }
    units.push(u);
  }
}
for (const pu of PHYS.UNITS) {
  const upath = `/learn/physics/${unitSlug(pu.no)}/`;
  const u = { subj: 'physics', no: pu.no, title: pu.title, short: pu.short, path: upath, app: `/#/physics/${pu.id}`, phys: pu, items: [] };
  for (const t of PHYS.TOPICS.filter(t => t.unit === pu.no)) {
    const slug = stableSlug(`physics:${t.id}`, t.title, upath);
    u.items.push({ kind: 'phys', id: t.id, t, code: t.code, title: t.title, path: upath + slug + '/', app: `/#/physics/${t.id}` });
  }
  units.push(u);
}
for (const u of units) if (!u.items.length) fail(`${u.subj} ${u.no} has no pages`);

/* ---------------- titles & descriptions ---------------- */
const unitLabel = u => `CCEA ${SUBJ[u.subj].label} ${u.no}`;
function pickTitle(cands) { return (cands.find(t => t.length <= 60) || cands[cands.length - 1]).replace(/\s+/g, ' ').trim(); }
function itemTitle(it, u) {
  const full = it.title.replace(/\s*\([^)]*\)\s*$/, m => m.length > 18 ? '' : m), short = full.split(/[:;]/)[0].trim();
  const L = unitLabel(u);
  return pickTitle([`${full} · ${L} · ${BRAND}`, `${full} · ${L}`, `${short} · ${L} · ${BRAND}`, `${short} · ${L}`, `${full} · ${L}`]);
}

/* ---------------- HTML shell ---------------- */
const CSS = `:root{--bg:#f5f5f7;--panel:#fff;--panel2:#f5f5f7;--ctl:rgba(118,118,128,.12);--ctl2:rgba(118,118,128,.2);--text:#1d1d1f;--muted:#6e6e73;--line:#d2d2d7;--hair:rgba(0,0,0,.08);--accent:#0066cc;--fillc:#0071e3;--on:#fff;--fill:rgba(0,113,227,.13);--axis:#8e8e93;--c1:#007aff;--c2:#ff2d55;--c3:#ff9500;--c4:#34c759;--good:#248a3d;--warn:#b25000;--sans:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Inter,system-ui,"Segoe UI",Roboto,sans-serif;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#000;--panel:#1c1c1e;--panel2:#2c2c2e;--ctl:rgba(118,118,128,.24);--ctl2:rgba(118,118,128,.36);--text:#f5f5f7;--muted:#a1a1a6;--line:#424245;--hair:rgba(255,255,255,.1);--accent:#2997ff;--fill:rgba(10,132,255,.2);--c1:#0a84ff;--c2:#ff375f;--c3:#ff9f0a;--c4:#30d158;--good:#30d158;--warn:#ff9f0a;color-scheme:dark}}
.s-f{--accent:#7a3fd8;--fillc:#7a3fd8;--fill:rgba(122,63,216,.14)}.s-p{--accent:#b8520a;--fillc:#b8520a;--fill:rgba(184,82,10,.13)}
@media (prefers-color-scheme:dark){.s-f{--accent:#b77cff;--fill:rgba(183,124,255,.2)}.s-p{--accent:#ff9f0a;--fillc:#ff9f0a;--on:#1d1d1f;--fill:rgba(255,159,10,.2)}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}body{margin:0;background:var(--bg);color:var(--text);font:17px/1.55 var(--sans);-webkit-font-smoothing:antialiased}
a{color:var(--accent);text-underline-offset:2px}a:focus-visible,summary:focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:6px}
:target,h2[id]{scroll-margin-top:64px}.skip{position:absolute;left:-999px;top:8px;background:var(--panel);padding:8px 14px;border-radius:10px;z-index:9}.skip:focus{left:8px}
.top{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid var(--hair)}
.top-in,.wrap,.foot-in{max-width:760px;margin:0 auto;padding:0 16px}.top-in{display:flex;align-items:center;justify-content:space-between;height:52px;gap:12px}
.brand{display:flex;align-items:center;gap:8px;font-weight:650;color:var(--text);text-decoration:none;letter-spacing:-.01em}.logo{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;color:#fff;font-weight:700;background:linear-gradient(150deg,#2997ff,#7a3fd8 55%,#ff8a00)}
.top .open{font-size:15px;font-weight:600;text-decoration:none;padding:6px 14px;border-radius:980px;background:var(--fillc);color:var(--on);white-space:nowrap}
.crumbs{font-size:14px;color:var(--muted);margin:18px 0 0}.crumbs ol{list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:4px}.crumbs li+li::before{content:"›";margin-right:4px}.crumbs a{color:var(--muted)}
.kicker{color:var(--accent);font-weight:600;font-size:14px;margin:22px 0 4px;letter-spacing:.01em}
h1{font-size:clamp(28px,7vw,40px);line-height:1.12;letter-spacing:-.022em;margin:0 0 10px;font-weight:700}h2{font-size:22px;letter-spacing:-.015em;margin:34px 0 10px;line-height:1.25}h3{font-size:18px;margin:22px 0 8px}
.lead{font-size:19px;color:var(--muted);margin:0 0 18px}
.cta-row{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 8px}.cta{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 22px;border-radius:980px;background:var(--fillc);color:var(--on);font-weight:600;text-decoration:none;font-size:17px}
.cta.ghost{background:var(--ctl);color:var(--accent)}.cta:hover{filter:brightness(1.06)}
.card{background:var(--panel);border-radius:18px;padding:18px 20px;margin:14px 0;box-shadow:0 1px 2px rgba(0,0,0,.04),0 6px 20px rgba(0,0,0,.05)}
@media (prefers-color-scheme:dark){.card{box-shadow:0 0 0 1px rgba(255,255,255,.06)}}
.list{list-style:none;padding:0;margin:0}.list li{border-top:1px solid var(--hair)}.list li:first-child{border-top:0}.list a{display:flex;gap:12px;padding:12px 2px;text-decoration:none;color:var(--text);align-items:baseline}
.list a:hover .t{color:var(--accent)}.list .c{color:var(--muted);font-variant-numeric:tabular-nums;min-width:2.6em;font-size:15px}.list .d{display:block;color:var(--muted);font-size:15px}
.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.grid .card{margin:0}.grid a.card{text-decoration:none;color:var(--text);display:block}.grid a.card b{display:block;font-size:19px;margin-bottom:4px;color:var(--accent)}
.outs{padding-left:0;list-style:none}.outs li{margin:8px 0;padding-left:0}.outs code{font:600 13px/1 var(--sans);background:var(--ctl);border-radius:6px;padding:3px 6px;margin-right:6px;color:var(--muted)}
.pill{display:inline-block;font-size:13px;font-weight:600;border-radius:980px;padding:2px 10px;background:var(--fill);color:var(--accent);vertical-align:middle}
.box{background:var(--panel);border-radius:16px;padding:14px 18px;margin:16px 0;border-left:4px solid var(--line)}.box .lbl{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);margin-bottom:6px}
.box.def,.box.thm,.box.key{border-left-color:var(--accent)}.box.warn{border-left-color:var(--c2)}.box.exam,.box.tipb{border-left-color:var(--c3)}.box.ex,.box.examq{border-left-color:var(--c4)}.box.beyond{opacity:.85}
.box>:last-child{margin-bottom:0}.steps{padding-left:22px}.steps li{margin:6px 0}.exq{font-weight:500;margin-bottom:6px}
details{background:var(--panel2);border-radius:12px;padding:10px 14px;margin:10px 0}summary{cursor:pointer;font-weight:600}.ptag{font-size:12px;font-weight:700;background:var(--ctl);border-radius:6px;padding:1px 6px;margin:0 4px}.qed{text-align:right;margin:0}
.notes,.chapter{overflow-wrap:anywhere}.notes table,.chapter table{border-collapse:collapse;margin:10px 0;display:block;overflow-x:auto}.notes td,.notes th,.chapter td,.chapter th{border:1px solid var(--line);padding:6px 10px}
.m{white-space:normal;font-family:"Times New Roman",Cambria,"STIX Two Math",serif;font-size:1.08em}.m i,.md i{font-style:italic}.tt{font-style:normal;font-family:var(--sans);font-size:.93em}
.md{font-family:"Times New Roman",Cambria,"STIX Two Math",serif;font-size:1.12em;text-align:center;margin:12px 0;overflow-x:auto;padding:2px 0}
.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 .12em;font-size:.92em;line-height:1.15}.fr>.nu{border-bottom:1px solid currentColor;padding:0 .15em}.fr>.de{padding:0 .15em}.fr.nb>.nu{border-bottom:0}
.ov{border-top:1px solid currentColor;padding-top:1px}.vec{position:relative;display:inline-block;padding-top:.35em}.vec::before{content:"→";position:absolute;top:-.25em;left:0;right:0;text-align:center;font-size:.75em}
.mx{display:inline-table;vertical-align:middle;margin:2px .2em;padding:0 .2em}.mr{display:table-row}.mc{display:table-cell;padding:1px 6px;text-align:center;vertical-align:middle}.mx.al .mc{text-align:left}.mx.sm{font-size:.8em}
.mx.pm{border-left:1.5px solid;border-right:1.5px solid;border-radius:.7em/50%}.mx.vm{border-left:1.2px solid;border-right:1.2px solid}.mx.bm{border:1.5px solid;border-top-color:transparent;border-bottom-color:transparent;box-shadow:inset 6px 0 0 -4.5px,inset -6px 0 0 -4.5px}.mx.cs{border-left:1.5px solid;border-radius:.5em 0 0 .5em/50% 0 0 50%;padding-left:.4em}
sup,sub{line-height:0;font-size:.72em}
.pn{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:30px 0}.pn a{display:block;background:var(--panel);border-radius:14px;padding:12px 14px;text-decoration:none;color:var(--text);font-size:15px}.pn a span{display:block;color:var(--muted);font-size:13px}.pn .nx{text-align:right;grid-column:2}
.foot{border-top:1px solid var(--hair);margin-top:40px;padding:22px 0 40px;color:var(--muted);font-size:13px}.foot a{color:var(--muted)}
${figCSS}`;

function page({ path: p, title, desc, subj, crumbs, body, ld = [], type = 'article', appHref }) {
  const url = abs(p), tint = subj ? ` class="s-${SUBJ[subj].tint}"` : '';
  const bc = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: abs(c[1]) })) };
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
${favicon ? `<link rel="icon" href="${favicon}" type="image/svg+xml">\n` : ''}<meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_GB">
${ogImage ? `<meta property="og:image" content="${abs('/' + ogImage)}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
${[bc, ...ld].map(jsonld).join('\n')}
<style>${CSS}</style>
</head>
<body${tint}>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="top-in"><a class="brand" href="/learn/"><span class="logo" aria-hidden="true">B</span>${BRAND}</a><a class="open" href="${appHref || '/'}">Open app</a></div></header>
<div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs.map((c, i) => i === crumbs.length - 1 ? `<li><span aria-current="page">${esc(c[0])}</span></li>` : `<li><a href="${c[1]}">${esc(c[0])}</a></li>`).join('')}</ol></nav>
<main id="main">
${body}
</main>
</div>
<footer class="foot"><div class="foot-in"><p><b>${BRAND}</b> · free self-study guides to CCEA GCE Mathematics, Further Mathematics and Physics. Created by Ben Smith.</p>
<p>Independent: not affiliated with or endorsed by CCEA. Learning outcomes are quoted from the CCEA specifications; check <a href="https://ccea.org.uk/">ccea.org.uk</a> for the latest version. Exam-style questions are BCS Academy originals, not CCEA past papers.</p>
<p><a href="/learn/">All revision notes</a> · <a href="/learn/maths/">Maths</a> · <a href="/learn/further-maths/">Further Maths</a> · <a href="/learn/physics/">Physics</a> · <a href="/">Open BCS Academy</a></p></div></footer>
</body>
</html>
`;
}

// app HTML → static HTML: TeX to readable math (never inside SVG figures), app links to absolute app routes
function content(html) {
  if (!html) return '';
  html = Array.isArray(html) ? html.join('') : String(html);
  return html.split(/(<svg[\s\S]*?<\/svg>)/).map((part, i) => i % 2 ? part : mathInHTML(part)).join('')
    .replace(/href="#\//g, 'href="/#/').replace(/<details class="proof( req)?" open>/g, '<details class="proof$1" open>').replace(/<h3>/g, '<h3>').replace(/<script[\s\S]*?<\/script>/gi, '');
}
const provider = { '@type': 'Organization', name: BRAND, url: SITE_URL + '/' };
const crumbsFor = (u, extra) => [['Learn', '/learn/'], [SUBJ[u.subj].name, `/learn/${SUBJ[u.subj].slug}/`], [`${u.no}`, u.path], ...(extra ? [extra] : [])];
const courseLd = u => ({ '@type': 'Course', name: `${SUBJ[u.subj].board.replace(/ \(\d{4}\)/, '')} ${u.no}: ${u.title}`, url: abs(u.path), provider, educationalLevel: u.no.startsWith('AS') ? 'AS level' : 'A2 level (A level)', inLanguage: 'en-GB' });

/* ---------------- pages ---------------- */
const pages = []; // { path, html }
const add = (p, html) => pages.push({ path: p, html });

function pointPage(u, it, i) {
  const { p, t } = it, c = u.course, prev = u.items[i - 1], next = u.items[i + 1], S = SUBJ[u.subj];
  const chapter = BOOK[p.id], notes = p.notes;
  const why = chapter ? (String(Array.isArray(chapter) ? chapter.join('') : chapter).match(/<div class="box why">([\s\S]*?)<\/div>/) || [])[1] : '';
  const descSrc = plain(notes) || plain(why) || plain(t.blurb) || it.title;
  const desc = clip(`${unitLabel(u)} revision: ${descSrc}`, 155);
  const sect = c.sections && t.section ? c.sections.find(s => s.id === t.section) : null;
  const outs = (p.covers || []).filter(o => o && o.text);
  const sib = t.points.filter(x => x.id !== p.id).map(x => u.items.find(y => y.id === x.id)).filter(Boolean);
  const body = `<p class="kicker">${esc(S.board)} · ${esc(u.no)} ${esc(c.uname)}${sect ? ` · ${esc(sect.title)}` : ''}</p>
<h1>${esc(it.title)}</h1>
<p class="lead">Spec point ${esc(p.code)} in ${esc(t.code)} ${esc(t.title)}. <span class="pill">${p.status === 'core' ? 'On the spec' : 'Supporting'}</span></p>
<div class="cta-row"><a class="cta" href="${it.app}">Open in ${BRAND}</a><a class="cta ghost" href="${it.drill}">Practise with drills</a></div>
${outs.length ? `<section class="card" aria-labelledby="spec"><h2 id="spec" style="margin-top:4px">What the CCEA specification says</h2><ul class="outs">${outs.map(o => `<li><code>${esc(o.code)}</code>${esc(o.text.replace(/[;.]?( and)?$/, ''))}</li>`).join('')}</ul></section>` : ''}
${notes ? `<section aria-labelledby="sum"><h2 id="sum">Summary</h2><div class="card notes">${content(notes)}</div></section>` : ''}
${chapter ? `<section aria-labelledby="ch"><h2 id="ch">Textbook chapter</h2><div class="chapter">${content(chapter)}</div></section>` : ''}
<div class="cta-row"><a class="cta" href="${it.app}">Drills, simulations and past-paper tracker in the app</a></div>
${sib.length ? `<h2>More in ${esc(t.code)} ${esc(t.title)}</h2><ul class="list card">${sib.map(x => `<li><a href="${x.path}"><span class="c">${esc(x.code)}</span><span class="t">${esc(x.title)}</span></a></li>`).join('')}</ul>` : ''}
<nav class="pn" aria-label="Previous and next">${prev ? `<a href="${prev.path}" rel="prev"><span>Previous · ${esc(prev.code)}</span>${esc(prev.title)}</a>` : ''}${next ? `<a class="nx" href="${next.path}" rel="next"><span>Next · ${esc(next.code)}</span>${esc(next.title)}</a>` : ''}</nav>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'LearningResource', name: it.title, description: desc, url: abs(it.path), inLanguage: 'en-GB', isAccessibleForFree: true,
    learningResourceType: ['Revision notes', 'Textbook chapter'], educationalLevel: u.no.startsWith('AS') ? 'AS level' : 'A2 level (A level)', provider, publisher: provider,
    author: { '@type': 'Person', name: 'Ben Smith' }, isPartOf: courseLd(u),
    ...(outs.length ? { teaches: outs.map(o => o.text.replace(/[;.]?( and)?$/, '')), educationalAlignment: outs.map(o => ({ '@type': 'AlignmentObject', alignmentType: 'teaches', educationalFramework: S.board, targetName: o.code, targetDescription: o.text.replace(/[;.]?( and)?$/, '') })) } : {}) }];
  add(it.path, page({ path: it.path, title: itemTitle(it, u), desc, subj: u.subj, crumbs: crumbsFor(u, [it.title, it.path]), body, ld, appHref: it.app }));
}

function physPage(u, it, i) {
  const { t } = it, prev = u.items[i - 1], next = u.items[i + 1], S = SUBJ.physics;
  const notes = Array.isArray(t.notes) ? t.notes : [];
  const desc = clip(`${unitLabel(u)} revision: ${plain(t.blurb) || plain(notes[0] && notes[0][1]) || t.title}`, 155);
  const body = `<p class="kicker">${esc(S.board)} · ${esc(u.no)} ${esc(u.title)}</p>
<h1>${esc(t.code)} ${esc(t.title)}</h1>
<p class="lead">${content(t.blurb)}</p>
<div class="cta-row"><a class="cta" href="${it.app}">Open the live lab in ${BRAND}</a><a class="cta ghost" href="/#/physics/practice">Practise exam questions</a></div>
${(t.outcomes || []).length ? `<section class="card" aria-labelledby="spec"><h2 id="spec" style="margin-top:4px">What the CCEA specification says</h2><ul class="outs">${t.outcomes.map(([code, text]) => `<li><code>${esc(code)}</code>${esc(String(text).replace(/[;.]?( and)?$/, ''))}</li>`).join('')}</ul></section>` : ''}
${notes.length ? `<section aria-labelledby="notes"><h2 id="notes">Revision notes</h2><div class="card notes">${notes.map(([h, b]) => `<h3>${esc(strip(h))}</h3>${/^\s*</.test(b) ? content(b) : `<p>${content(b)}</p>`}`).join('')}</div></section>` : ''}
${(t.equations || []).length ? `<section aria-labelledby="eq"><h2 id="eq">Key equations</h2><div class="card"><ul class="list">${t.equations.map(([e, note]) => `<li style="padding:8px 0">${texToHTML(e, false)}${note ? ` <span class="d">${content(note)}</span>` : ''}</li>`).join('')}</ul></div></section>` : ''}
${(t.traps || []).length ? `<section aria-labelledby="traps"><h2 id="traps">Common mistakes</h2><div class="box warn"><ul>${t.traps.map(x => `<li>${content(x)}</li>`).join('')}</ul></div></section>` : ''}
${(t.labs || []).length ? `<section aria-labelledby="labs"><h2 id="labs">Live labs for this section</h2><ul class="list card">${t.labs.map(l => `<li><a href="/#/physics/${t.id}/${l.id}"><span class="c">${esc(l.letter || '')}</span><span class="t">${esc(l.title)}<span class="d">${esc(l.hint || '')}${l.spec && l.spec.length ? ` · spec ${esc(l.spec.join(', '))}` : ''}</span></span></a></li>`).join('')}</ul></section>` : ''}
<nav class="pn" aria-label="Previous and next">${prev ? `<a href="${prev.path}" rel="prev"><span>Previous · ${esc(prev.code)}</span>${esc(prev.title)}</a>` : ''}${next ? `<a class="nx" href="${next.path}" rel="next"><span>Next · ${esc(next.code)}</span>${esc(next.title)}</a>` : ''}</nav>`;
  const ld = [{ '@context': 'https://schema.org', '@type': 'LearningResource', name: `${t.code} ${t.title}`, description: desc, url: abs(it.path), inLanguage: 'en-GB', isAccessibleForFree: true,
    learningResourceType: ['Revision notes', 'Simulation'], educationalLevel: u.no.startsWith('AS') ? 'AS level' : 'A2 level (A level)', provider, publisher: provider, author: { '@type': 'Person', name: 'Ben Smith' }, isPartOf: courseLd(u),
    teaches: (t.outcomes || []).map(o => String(o[1]).replace(/[;.]?( and)?$/, '')),
    educationalAlignment: (t.outcomes || []).map(([code, text]) => ({ '@type': 'AlignmentObject', alignmentType: 'teaches', educationalFramework: S.board, targetName: code, targetDescription: String(text) })) }];
  add(it.path, page({ path: it.path, title: itemTitle(it, u), desc, subj: 'physics', crumbs: crumbsFor(u, [`${t.code} ${t.title}`, it.path]), body, ld, appHref: it.app }));
}

function unitPage(u) {
  const S = SUBJ[u.subj], c = u.course;
  const exam = c ? c.exam : '';
  const groups = [];
  if (c) {
    for (const t of c.topics) { const its = t.points.map(p => u.items.find(x => x.id === p.id)).filter(Boolean); if (its.length) groups.push({ head: `${t.code} ${t.title}`, sect: c.sections && t.section ? c.sections.find(s => s.id === t.section) : null, blurb: t.blurb, its }); }
  } else groups.push({ head: `${u.no} sections`, its: u.items });
  let lastSect = null;
  const lists = groups.map(g => { const sh = g.sect && g.sect !== lastSect ? `<h2>Section ${esc(g.sect.id)}: ${esc(g.sect.title)}</h2>` : ''; lastSect = g.sect || lastSect;
    return `${sh}<section class="card"><h3 style="margin-top:2px">${esc(g.head)}</h3>${g.blurb ? `<p class="d" style="color:var(--muted);margin:0 0 6px">${esc(strip(g.blurb))}</p>` : ''}<ul class="list">${g.its.map(x => `<li><a href="${x.path}"><span class="c">${esc(x.code)}</span><span class="t">${esc(x.title)}${x.kind === 'phys' && x.t.blurb ? `<span class="d">${esc(clip(plain(x.t.blurb), 110))}</span>` : ''}</span></a></li>`).join('')}</ul></section>`; }).join('\n');
  const official = c && c.official ? c.official.filter(([, url]) => /ccea\.org\.uk/.test(url)) : [];
  const papersApp = c ? `/#/${c.id}/papers` : '/#/physics/practice';
  const name = `${S.name} ${u.no}: ${u.title}`;
  const tag = c ? c.tagline : u.title;
  const desc = clip(`${unitLabel(u)} ${u.title} revision notes: ${plain(tag)} ${u.items.length} topics, each with notes and a link to drills and past-paper practice.`, 155);
  const title = pickTitle([`${unitLabel(u)} ${u.title} revision · ${BRAND}`, `${unitLabel(u)} ${u.short || u.title} · ${BRAND}`, `${unitLabel(u)} revision notes · ${BRAND}`]);
  const body = `<p class="kicker">${esc(S.board)}</p>
<h1>CCEA ${esc(S.label)} ${esc(u.no)}: ${esc(u.title)}</h1>
<p class="lead">${content(tag)}</p>
${exam ? `<p style="color:var(--muted);font-size:15px">${esc(exam)}</p>` : ''}
<div class="cta-row"><a class="cta" href="${u.app}">Open ${esc(S.label)} ${esc(u.no)} in ${BRAND}</a><a class="cta ghost" href="${papersApp}">${c ? 'Past-paper tracker' : 'Practice questions'}</a></div>
${lists}
<section class="card" aria-labelledby="pp"><h2 id="pp" style="margin-top:4px">Past papers and mark schemes</h2>
<p>CCEA publishes past papers, mark schemes and examiners' reports on its own website. ${BRAND} links to them and tracks which ones you have done; it never copies CCEA questions.</p>
<ul>${official.length ? official.map(([l, url]) => `<li><a href="${esc(url)}" rel="noopener">${esc(l)}</a></li>`).join('') : `<li><a href="https://ccea.org.uk/post-16/gce/past-papers-mark-schemes" rel="noopener">CCEA GCE past papers and mark schemes</a></li>`}</ul>
<p><a href="${papersApp}">Open the ${esc(S.label)} ${esc(u.no)} ${c ? 'past-paper tracker' : 'practice and mock tests'} in ${BRAND}</a></p></section>`;
  add(u.path, page({ path: u.path, title, desc, subj: u.subj, crumbs: crumbsFor(u), body, type: 'website', appHref: u.app,
    ld: [{ '@context': 'https://schema.org', ...courseLd(u), description: desc, hasPart: u.items.map(x => ({ '@type': 'LearningResource', name: x.title, url: abs(x.path) })) }] }));
}

function subjectPage(q) {
  const S = SUBJ[q], us = units.filter(u => u.subj === q), p = `/learn/${S.slug}/`;
  const title = pickTitle([`CCEA A level ${S.label} revision notes · ${BRAND}`, `CCEA ${S.label} revision notes · ${BRAND}`]);
  const desc = clip(`Free CCEA A level ${S.label} revision: ${S.lead.replace(/^Revision notes for /, '')}`, 155);
  const body = `<p class="kicker">${esc(S.board)}</p><h1>CCEA A level ${esc(S.label)} revision</h1><p class="lead">${esc(S.lead)}</p>
<div class="cta-row"><a class="cta" href="${S.app}">Open ${esc(S.label)} in ${BRAND}</a></div>
<div class="grid">${us.map(u => `<a class="card" href="${u.path}"><b>${esc(u.no)}</b>${esc(u.title)}<span class="d" style="display:block;color:var(--muted);font-size:15px;margin-top:6px">${u.items.length} topics${u.course ? ' · ' + esc(clip(plain(u.course.tagline), 90)) : ''}</span></a>`).join('')}</div>
${us.map(u => `<h2><a href="${u.path}">${esc(S.label)} ${esc(u.no)}: ${esc(u.title)}</a></h2><ul class="list card">${u.items.map(x => `<li><a href="${x.path}"><span class="c">${esc(x.code)}</span><span class="t">${esc(x.title)}</span></a></li>`).join('')}</ul>`).join('\n')}`;
  add(p, page({ path: p, title, desc, subj: q, crumbs: [['Learn', '/learn/'], [S.name, p]], body, type: 'website', appHref: S.app,
    ld: [{ '@context': 'https://schema.org', '@type': 'ItemList', name: `CCEA ${S.label} units`, itemListElement: us.map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(u.path), name: `${S.label} ${u.no}` })) }] }));
}

function indexPage() {
  const p = '/learn/';
  const n = units.reduce((s, u) => s + u.items.length, 0);
  const body = `<p class="kicker">Free revision for CCEA A level</p><h1>CCEA A level Maths, Further Maths and Physics revision</h1>
<p class="lead">${BRAND} follows the CCEA specifications point by point: ${n} topic pages of notes, definitions and worked examples, and an app with drills, simulations, mock tests and a past-paper tracker.</p>
<div class="cta-row"><a class="cta" href="/">Open ${BRAND}</a></div>
${['maths', 'further', 'physics'].map(q => { const S = SUBJ[q]; return `<h2><a href="/learn/${S.slug}/">${esc(S.name)}</a></h2><p style="color:var(--muted);margin-top:0">${esc(S.lead)}</p><div class="grid">${units.filter(u => u.subj === q).map(u => `<a class="card s-${S.tint}" href="${u.path}"><b>${esc(u.no)}</b>${esc(u.title)}</a>`).join('')}</div>`; }).join('\n')}`;
  add(p, page({ path: p, title: `CCEA A level Maths, Further Maths & Physics revision · ${BRAND}`.length <= 60 ? `CCEA A level Maths, Further Maths & Physics revision · ${BRAND}` : `CCEA A level revision notes · ${BRAND}`,
    desc: `Free CCEA A level revision notes for Maths, Further Maths and Physics: every unit (AS 1, AS 2, A2 1, A2 2) point by point, with drills and past-paper tracking.`,
    crumbs: [['Learn', p]], body, type: 'website', appHref: '/',
    ld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, url: SITE_URL + '/' }, { '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: BRAND, url: SITE_URL + '/', founder: { '@type': 'Person', name: 'Ben Smith' } }] }));
}

for (const u of units) { u.items.forEach((it, i) => (it.kind === 'point' ? pointPage : physPage)(u, it, i)); unitPage(u); }
for (const q of ['maths', 'further', 'physics']) subjectPage(q);
indexPage();

/* ---------------- write ---------------- */
const seen = new Set();
for (const p of pages) { if (seen.has(p.path)) fail(`two pages want ${p.path}`); seen.add(p.path); }
fs.rmSync(OUT, { recursive: true, force: true });
for (const p of pages) { const f = path.join(SITE, p.path, 'index.html'); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, p.html); }
// prune slugs of pages that no longer exist, and keep the file sorted so diffs stay small
const live = new Set([...units.flatMap(u => u.items.map(it => `${u.course ? u.course.id : 'physics'}:${it.id}`))]);
const slugsOut = Object.fromEntries(Object.entries(SLUGS).filter(([k]) => live.has(k)).sort(([a], [b]) => a.localeCompare(b)));
if (JSON.stringify(slugsOut) !== slugsBefore) fs.writeFileSync(SLUGS_FILE, JSON.stringify(slugsOut, null, 1) + '\n');

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...pages.map(p => p.path).sort()];
const pri = p => p === '/' ? '1.0' : p === '/learn/' ? '0.9' : p.split('/').length <= 4 ? '0.8' : p.split('/').length === 5 ? '0.7' : '0.6';
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${abs(u)}</loc><lastmod>${today}</lastmod><priority>${pri(u)}</priority></url>`).join('\n')}\n</urlset>\n`);
const robots = `# BCS Academy — everything may be crawled.\nUser-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`;
const robotsFile = path.join(SITE, 'robots.txt');
if (!fs.existsSync(robotsFile) || fs.readFileSync(robotsFile, 'utf8') !== robots) fs.writeFileSync(robotsFile, robots);

const n = check();
const kb = Math.round(pages.reduce((s, p) => s + Buffer.byteLength(p.html), 0) / 1024);
console.log(`✓ build-seo: ${n} pages (${units.reduce((s, u) => s + u.items.length, 0)} topic pages, ${units.length} units, 3 subjects, 1 index) · ${kb} KB · sitemap ${urls.length} URLs · ${SITE_URL} · ${((Date.now() - t0) / 1000).toFixed(2)} s`);
