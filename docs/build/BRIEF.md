# BCS Academy build brief (shared by every agent)

Site: vanilla-JS single-page app in `further-maths/` (hash routes `#/…`, deferred scripts in `index.html` order, KaTeX from cdnjs, no build step). Units:

| Subject | Unit ids (course id) | Spec data |
|---|---|---|
| Maths | m1 (AS 1 Pure), m2 (AS 2 Applied), m3 (A2 1 Pure), m4 (A2 2 Applied) | `js/spec-m1.js` … `js/spec-m4.js` (`COURSES[id].points`) |
| Further Maths | f1 (AS 1 Pure), f2 (AS 2 Applied), fm (A2 1 Pure), f4 (A2 2 Applied) | `js/spec-f1.js`, `js/spec-f2.js`, `js/spec.js` (fm), `js/spec-f4.js` |
| Physics | as1, as2, a21, a22 | `js/physics.js` → `PHYS.UNITS`, `PHYS.TOPICS` |

## Hard rules

- **Never** edit files you don't own (table below). Never `git commit`/`push`. The lead integrates and commits.
- `further-maths/js/app.js`, `index.html`, `css/app.css`, `js/settings.js` are lead-owned (except the design agent, phase 2). If you need a hook there, describe it in your final report as an exact snippet.
- Everything must still work with no network and from `file://` (tests open `further-maths/index.html` directly). Online features degrade to a clear "not connected yet" state.
- Never invent CCEA material. No CCEA question text, mark scheme text or examiner quotes. BCS Academy originals are labelled "BCS Academy original · not a CCEA paper".
- Maths must be correct. Verify every numeric answer by computation (node/python) before you finish.
- Match the existing code style: plain JS, small helpers, `esc()` for user text, `renderMath(el)` after inserting TeX, CSS variables `--accent`, `--panel`, `--text`, `--muted`, `--hair`, `--ctl`, Apple look (system font, rounded 14–18px cards, quiet colour).
- External scripts only from cdnjs.cloudflare.com or cdn.jsdelivr.net with an exact version.
- Final report to the lead: under 250 words: files created, the integration snippet(s), how you tested, anything unfinished.

## Shared data formats

### BCS Academy papers (`js/bcsp.js` defines the registry; content files call `BCSP.add`)

```js
BCSP.add({
  id: 'm1-easy', unit: 'm1', level: 'easy',            // level: 'easy' | 'medium' | 'hard'
  title: 'Maths AS 1 · Paper A (Easy)', minutes: 105, calc: true,
  questions: [{
    n: 1, points: ['1.2.3'],                            // spec point ids (maths: COURSES[unit].points[].id; physics: PHYS topic ids)
    q: 'Stem HTML, TeX in $…$ or \\(…\\)',            // optional shared stem
    parts: [{
      l: 'a', marks: 3, q: 'Part HTML',
      answer: 'short final answer HTML',
      ms: ['M1 differentiate correctly', 'A1 $x = 2$'],  // mark scheme lines, CCEA style M/A/B codes
      steps: [{ say: 'Plain-English narration, read aloud.', show: 'HTML/TeX shown on screen for this step' }]
    }]
  }]
});
```

Paper size: match the real CCEA unit's time and total marks (state your source for them in your report; if unsure use AS 100 marks/1 h 45, A2 100 marks/2 h 30 for maths; physics as in the CCEA spec). Easy = mostly AO1 routine; Medium = typical paper; Hard = top-band problem solving. Every part needs `answer`, `ms` and 3–7 `steps`.

### Walkthrough steps
`steps[]` above is what the walkthrough player (`js/walkthrough.js`) animates: one step at a time, `show` fades in, `say` is spoken with the Web Speech API (captions always on). Textbook worked examples (`B.ex(n, q, steps)`) are converted automatically, so you don't write steps for those.

### Runtime config (`js/config.js`, lead-owned, already agreed)
```js
const BCS_CONFIG = { supabaseUrl: '', supabaseAnonKey: '', chatEndpoint: '/api/chat', siteUrl: 'https://bcs-academy.pages.dev' };
```
Empty strings mean "not connected": features show their offline state.

## File ownership

| Agent | Owns (create/edit only these) |
|---|---|
| accounts | `js/account.js`, `js/cloud.js`, `js/report.js`, `css/account.css`, `supabase/**`, `.github/workflows/db-backup.yml`, `docs/backend/**` |
| chat | `js/chat.js`, `css/chat.css`, `functions/**` (Cloudflare Pages Functions at repo root), `docs/chat/**` |
| proofs | `js/book-m*.js`, `js/content-m*.js`, `js/spec-m*.js`, `js/sims-m*.js`, `js/lab-m1.js` |
| papers-ui | `js/bcsp.js`, `js/papers.js`, `js/ccea-papers.js`, `js/walkthrough.js`, `css/papers.css` |
| paper content N | `js/bcsp-<unit>.js` for your units only |
| brand | `assets/**`, `further-maths/assets/**`, `further-maths/manifest.webmanifest`, `further-maths/sw.js`, `further-maths/.well-known/**`, `docs/play-store/**` |
| seo | `tools/build-seo.mjs`, `tools/seo/**`, `docs/seo/**`, `further-maths/robots.txt`, `further-maths/_headers`, `further-maths/_redirects` |
| design (phase 2) | `css/app.css`, `css/physics.css`, markup classes in `app.js` view templates only |
