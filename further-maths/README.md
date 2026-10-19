# BcsMaths · Maths & Further Maths

Self-study guides for **CCEA GCE Further Mathematics, Unit A2 1 (Pure)** and **CCEA GCE Mathematics, Unit AS 1 (Pure)**. It's a static site with no build step and no server. Created by Ben Smith.

You pick a course on the home page (`#/`). Each course has its own spec map, textbook, drills, formula book, past papers and progress. The Lab, Simulations, the grapher and the calculator are shared by both. More units can be added later as further courses.

## What's inside (per course)

- **Specification map** (`#/<course>/spec`): every learning outcome **quoted from the official CCEA specification** (FM: Section 3.4; Maths: Sections 3.1–3.2), with links to the chapters that cover it.
  - Outcome codes (P1, A1–A7, C1–C4, …) are BcsMaths labels; CCEA prints the bullets unnumbered.
  - Each chapter opens with a "The specification says" box listing the outcomes it covers.
  - Points are tagged *On spec* or *Supporting* (an example context or technique an outcome relies on).
  - Content that isn't in the unit is kept in a separate archive and never appears in drills.
- **Textbook** (`#/<course>/book`): one chapter per spec point. Each chapter covers:
  - the big picture and definitions;
  - theorems with full proofs and derivations;
  - worked examples, common mistakes and exam technique;
  - check-yourself questions;
  - an **original** exam-style question with a mark-scheme-style solution.
- **Drills**: randomised question generators with worked solutions. *Smart drill* serves your weakest points first; *Sprint* gives 10 timed questions.
- **Formula book**: searchable, each formula linked to its chapter and tagged *In booklet* or *Learn it* against CCEA's Mathematical Formulae and Tables booklet.
- **Past papers**: links to the official CCEA papers, mark schemes and Chief Examiner's Reports. There's also a score tracker and your own bank of real past-paper questions and examiner quotes (with sources), tagged by spec point. Backups export and import as JSON.

## Shared tools

- **Simulations** (`#/sims`):
  - FM: roots of zⁿ = w and polygon geometry; De Moivre identities; polar sectors; hyperbola; induction; method of differences; partial fractions; improper integrals; and more.
  - AS 1: quadratics; transformations; circles; binomial; sine/cosine rules; unit circle and trig equations; log-linear graphs; first principles; area; vectors.
- **Graph tab / Interactive grapher** (`graph.js`): a Desmos-style grapher that works offline — sliders, draggable points, implicit curves, polar and parametric curves, shaded inequalities, roots/turning points/intersections. Every spec point has presets (`graph-presets.js`). "Copy for Desmos" exports the expressions; with a Desmos API key (Settings) the presets load into real Desmos.
- **Lab**, grouped by course:
  - Both: interactive grapher, graph plotter, calculus & series, polynomials & partial fractions, scientific calculator.
  - Maths AS 1: quadratics & inequalities, simultaneous equations (2/3 unknowns, line & curve), triangle solver (incl. ambiguous case), trig equation solver, lines & circles, binomial expander, exponentials & logs, 2D vectors, tangents & stationary points, area with either axis.
  - FM A2 1: complex numbers, De Moivre multiple angles, polar curves & area, sums of series, ODE solver, matrix powers.
- **Settings** (`#/settings`, gear icon): download/load a progress file, copy/paste a progress code (merge or replace), backup reminders, theme, text size, start page, sprint length, calculator angle mode, graph engine and Desmos key, resets.
- **Scientific calculator**: SHIFT/HYP, DEG/RAD, complex numbers, exact-value recognition and history. Open it on any page from the calculator button (on phones, the Calculator tab) or with Alt+C, or use the full page. On phones it opens as a sheet: drag or flick it down to dismiss.

## Design

The interface follows Apple's design language:
- **Type:** system font (SF Pro where available, Inter elsewhere), with tracking tuned to each size.
- **Colour:** grey and white surfaces with a single blue accent, and Apple's system colours for topics.
- **Navigation:** three layers. A frosted global bar; a local course bar that sticks while you scroll, as on apple.com; and an iOS-style tab bar on phones.
- **Controls:** segmented controls, pill buttons and squircle icons.
- **Motion:** springs defined by damping and response (`js/ui.js`). The calculator sheet tracks your finger 1:1, can be caught mid-animation, rubber-bands at the top and uses the flick's momentum to decide whether to close.
- **Accessibility:** follows reduced motion (cross-fades only), reduced transparency (solid bars) and increased contrast.

BcsMaths does not reproduce CCEA papers or reports. Add them yourself from the official PDFs.

## Progress between deploys

Progress lives in the browser's localStorage for one web address. A new Netlify Drop gives a new address that starts empty, so download your progress file (⚙ Settings) before redeploying and load it on the new site — or redeploy to the same Netlify site to keep the address.

## Deploy (Netlify Drop)

```bash
python3 tools/build_netlify.py      # → bcsfm-netlify.zip (single index.html at the root)
```

Drag `bcsfm-netlify.zip` (or the `dist/netlify` folder) onto https://app.netlify.com/drop.

## Run locally

Open `further-maths/index.html`, or run `cd further-maths && python3 -m http.server 8000`.

## Source layout

| File | Contents |
|---|---|
| `js/mathengine.js` | expression parser (real and complex), exact-value recognition, numerics |
| `js/content-*.js` | spec points: summary notes and drill generators (`content-m1.js` = AS 1) |
| `js/spec.js`, `js/spec-m1.js` | course registry (`defineCourse`), spec structure, sources, AS 1 formula book |
| `js/book-*.js` | textbook chapters (`book-m1a/b/c.js` = AS 1) |
| `js/formulae.js` | FM formula book |
| `js/sims.js`, `js/sims-fm2.js`, `js/sims-m1.js` | simulations (the FM rebuilds override the originals) |
| `js/graph.js`, `js/graph-presets.js`, `js/desmos.js` | grapher, per-point presets, optional Desmos API mode |
| `js/lab-m1.js`, `js/lab-fm2.js` | course-specific Lab tools |
| `js/ui.js` | icon set; springs, momentum projection, rubber-banding |
| `js/settings.js` | settings, progress save/load/merge, backup reminders |
| `js/lab.js`, `js/calc.js` | lab tools, calculator |
| `js/drill.js`, `js/app.js` | drill engine; routing and views |

To add a unit, register its points with `topic()` in a new `content-*.js` file. Then call `defineCourse()` in a new `spec-*.js` file and add both to `index.html`.
