# BCSFM · Maths & Further Maths

Self-study guides for **CCEA GCE Further Mathematics, Unit A2 1 (Pure)** and **CCEA GCE Mathematics, Unit AS 1 (Pure)**. It's a static site with no build step and no server. Created by Ben Smith.

You pick a course on the home page (`#/`). Each course has its own spec map, textbook, drills, formula book, past papers and progress. The Lab, Simulations, Desmos and the calculator are shared by both. More units can be added later as further courses.

## What's inside (per course)

- **Specification map** (`#/<course>/spec`): every topic and outcome, linked to its chapter, simulation, Desmos presets and drills.
  - Each point is tagged *On spec* or *Check spec* (normally taught in the unit; confirm the wording in the official specification).
  - FM complex-number points show their CCEA codes (C1–C4).
  - Content that isn't in the unit is kept in a separate archive and never appears in drills.
  - The outcome wording is BCSFM's summary, not CCEA's official text.
- **Textbook** (`#/<course>/book`): one chapter per spec point. Each chapter covers:
  - the big picture and definitions;
  - theorems with full proofs and derivations;
  - worked examples, common mistakes and exam technique;
  - check-yourself questions;
  - an **original** exam-style question with a mark-scheme-style solution.
- **Drills**: randomised question generators with worked solutions. *Smart drill* serves your weakest points first; *Sprint* gives 10 timed questions.
- **Formula book**: searchable, with each formula linked to its chapter.
- **Past papers**: links to the official CCEA papers, mark schemes and Chief Examiner's Reports. There's also a score tracker and your own bank of real past-paper questions and examiner quotes (with sources), tagged by spec point. Backups export and import as JSON.

## Shared tools

- **Simulations** (`#/sims`):
  - FM: roots of zⁿ = w and polygon geometry; De Moivre identities; polar sectors; hyperbola; induction; method of differences; partial fractions; improper integrals; and more.
  - AS 1: quadratics; transformations; circles; binomial; sine/cosine rules; unit circle and trig equations; log-linear graphs; first principles; area; vectors.
- **Desmos**: ready-made graphs for each spec point.
  - Without a key, the Desmos calculator is embedded and you copy the expressions into it.
  - With your own free Desmos API key (saved in this browser only), the presets load automatically.
- **Lab**: graph plotter, complex-number workbench, matrix calculator, calculus and series tools, ODE solver, and polynomial roots and partial fractions.
- **Scientific calculator**: SHIFT/HYP, DEG/RAD, complex numbers, exact-value recognition and history. Open it as a pop-up on every page (🧮 or Alt+C) or as a full page.

BCSFM does not reproduce CCEA papers or reports. Add them yourself from the official PDFs.

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
| `js/desmos.js` | Desmos presets and embed |
| `js/lab.js`, `js/calc.js` | lab tools, calculator |
| `js/drill.js`, `js/app.js` | drill engine; routing and views |

To add a unit, register its points with `topic()` in a new `content-*.js` file. Then call `defineCourse()` in a new `spec-*.js` file and add both to `index.html`.
