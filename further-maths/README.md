# BCSFM · Further Maths A2 1

The complete self-study guide to **CCEA GCE Further Mathematics, Unit A2 1 (Pure)**. It's a static site with no build step and no server.

## What's inside

- **Specification map** (`#/spec`): every A2 1 topic and outcome, linked to its chapter, simulation and drills. Each point is tagged *A2 1* (named in public course outlines), *Check spec* (usually taught alongside A2 1) or *AS 1 / Extension*. The outcome wording is BCSFM's summary, not CCEA's official text.
- **Textbook** (`#/book`): one chapter per spec point. Each chapter has the big picture, definitions, theorems with full proofs and derivations, step-by-step worked examples, common mistakes, exam technique, check-yourself questions and an **original** exam-style question with a mark-scheme-style solution.
- **Drills**: about 100 randomised question generators with worked solutions. *Smart drill* serves your weakest points first; *Sprint* is 10 timed questions.
- **Simulations**: 13 interactive models (Argand diagram, roots of unity, loci, polar areas, hyperbola, Maclaurin, slope fields, oscillator, and more).
- **Lab**: a graph plotter (y = f(x), parametric, polar; roots, turning points, intersections, areas), a complex-number workbench, a matrix calculator (eigenvalues and eigenvectors), calculus and series tools (integrals including improper ones, derivatives, Taylor coefficients, limits, Σ sums), an ODE solver, polynomial roots and partial fractions.
- **Scientific calculator**: SHIFT/HYP, DEG/RAD, complex numbers, exact-value recognition (fractions, surds, multiples of π, logs) and history. It's available as a pop-up on every page (🧮 or Alt+C) or as a full page.
- **Formula book**: searchable, with each formula linked to the chapter that proves it.
- **Past papers**: links to the official CCEA papers, mark schemes and Chief Examiner's Reports, a score tracker, and your own bank of real past-paper questions and examiner quotes (with sources), tagged by spec point. Export and import your backups as JSON.

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
| `js/content-*.js` | spec points: summary notes and drill generators |
| `js/spec.js` | A2 1 structure, status tags, sources |
| `js/book-*.js` | textbook chapters |
| `js/formulae.js` | formula book |
| `js/sims.js`, `js/lab.js`, `js/calc.js` | simulations, lab tools, calculator |
| `js/drill.js`, `js/app.js` | drill engine; routing and views |
