# BCS Academy · CCEA Maths, Further Maths & Physics

A complete self-study course for **CCEA GCE Mathematics**, **CCEA GCE Further Mathematics** (2018 specifications) and **CCEA GCE Physics** (2016 specification). It covers all twelve written units, including every section of the applied units. It is a static site: no build step and no server. Created by Ben Smith.

| Qualification | AS 1 | AS 2 | A2 1 | A2 2 |
|---|---|---|---|---|
| Mathematics | Pure | Mechanics + Statistics | Pure | Mechanics + Statistics |
| Further Mathematics | Pure | Mechanics 1, Mechanics 2, Statistics, Discrete & Decision | Pure | Mechanics 1, Mechanics 2, Statistics, Discrete & Decision |
| Physics | Forces, Energy and Electricity | Waves, Photons and Astronomy | Deformation of Solids, Thermal Physics, Circular Motion, Oscillations and Atomic and Nuclear Physics | Fields, Capacitors and Particle Physics |

The home page (`#/`) has one card per subject, each in its own colour: Mathematics blue, Further Mathematics purple, Physics orange. The colour follows you through that subject's pages (buttons, links, sims, the logo). `#/maths`, `#/further` and `#/physics` show each subject's unit structure, exam lengths and weightings.

On the two Further Maths applied units you answer two of the four sections in the exam: A+B, A+C, A+D or C+D. Pick your pair on the unit's home page, and the drills, sprints and home page then focus on those sections.

## What every unit has

- **Specification map** (`#/<unit>/spec`).
  - Every learning outcome is **quoted from the CCEA specification**, grouped by section and topic and linked to the chapters that teach it.
  - Outcome codes such as A2c or C11 are BCS Academy labels; CCEA prints its bullets unnumbered.
- **Textbook** (`#/<unit>/book`). There is one chapter per spec point, and each chapter contains:
  - the big picture and definitions;
  - theorems with proofs: every result in Further Maths; in Mathematics only the proofs CCEA's spec asks for (tagged "On the spec"), with other derivations marked "Optional" and closed by default;
  - worked examples;
  - common mistakes and exam technique;
  - check-yourself questions;
  - an **original** exam-style question with a mark-scheme-style solution.
- **Drills**:
  - randomised question generators with worked solutions;
  - *Smart drill* targets your weakest points;
  - *Sprint* gives 10 timed questions.
- **Formula book**: each formula is linked to its chapter and tagged *In booklet* or *Learn it*, checked against CCEA's Mathematical Formulae and Tables booklet.
- **Past papers**:
  - links to the official CCEA papers, mark schemes and Chief Examiner's Reports;
  - a score tracker;
  - your own bank of real past-paper questions.

BCS Academy never invents CCEA questions or examiner comments. Every exam-style question is labelled "BCS Academy original · not a CCEA past paper".

## Physics

Physics (`#/physics/…`) is built around live labs rather than textbook chapters. It is the Phase Space physics engine, restyled to match and running inside BCS Academy:

- **36 sections, 87 labs, 159 spec outcomes** across AS 1, AS 2, A2 1 and A2 2. AS 3 and A2 3 (the practical units) have no unit of their own; the virtual practicals in each section practise those skills.
- **Section pages** (`#/physics/<section>/<lab>`): an interactive simulation with its controls, readouts, embedded exam drills, equations, exam traps and the section's spec outcomes.
- **Revision notes** for every section (`#/physics/<section>/notes`) with a printable layout.
- **Unit pages** (`#/physics/as1` …): section cards with animated thumbnails, progress, and weak areas.
- **Spec checklist** (`#/physics/<unit>/spec`) and **equations** (`#/physics/<unit>/equations`) for each unit.
- **Practice** (`#/physics/practice`): timed mock tests and endless drills drawn from every lab's question generators, with difficulty levels and a weak-area tracker.
- **Tutor** (`#/physics/tutor`, plus a floating chat button on physics pages): searches every section's notes offline. Optionally it can call Claude with your own Anthropic API key (set in Settings → Physics; billed to that key and stored only in your browser).

Physics progress is part of the BCS Academy progress file. Settings also loads a progress file exported from the old stand-alone Phase Space site.

## Shared tools

- **Simulations** (`#/sims`). Examples include:
  - SHM and damping;
  - projectiles and collisions;
  - centres of mass and toppling;
  - the normal, binomial, Poisson, t and χ² distributions;
  - the central limit theorem and hypothesis tests;
  - Cayley tables;
  - Prim, Dijkstra and critical path analysis;
  - Pólya necklace counting;
  - complex roots and 2D transformations;
  - plus the pure-maths sims.
- **Lab** (`#/lab`), grouped into pure, further pure, mechanics, statistics and decision tools. Among them:
  - a grapher;
  - distribution, suvat and force calculators;
  - matrix and complex-number tools.
- **Interactive grapher** (`graph.js`). It works offline and has about 50 presets linked to spec points. Desmos is optional.
- **Scientific calculator**: SHIFT/HYP, DEG/RAD and complex numbers. Answer boxes accept expressions such as `sqrt(3)/2`, `5pi/6` and `4.2E7`. A capital E means scientific notation; a lower-case e is Euler's number.
- **Settings** (`#/settings`):
  - progress save/load as a file or a code;
  - theme and text size;
  - start page;
  - section choices for each unit;
  - resets.
- **About** (`#/about`): why BCS Academy exists. Edit the story in the `ABOUT` object in `js/about.js`.

## Design

The interface follows Apple's design language:
- system typography;
- a frosted global bar with a sticky unit bar;
- an iOS-style tab bar on phones;
- segmented controls;
- spring physics (`js/ui.js`).

It respects reduced motion, reduced transparency and increased contrast.

## Progress between deploys

Progress lives in the browser's localStorage for one web address. Before moving to a new address, download a progress file from ⚙ Settings, then load it on the new site.

## Deploy from GitHub (Cloudflare Pages)

The site needs no build step: the `further-maths` folder is served as it is.

1. Cloudflare dashboard → Workers & Pages → Create application → Pages → Connect to Git, and pick this repository.
2. Production branch `main`. Framework preset None, build command blank, build output directory `further-maths`.
3. Save and deploy. Every push to `main` goes live; other branches get preview addresses.
4. Custom domain: the Pages project → Custom domains → Set up a custom domain. A root domain (example.com) needs the domain's DNS on Cloudflare (change the nameservers at the registrar); a subdomain (www.example.com) can be a CNAME to the project's `pages.dev` address.

Netlify reads `netlify.toml`, which publishes the same folder.

## Deploy (Netlify Drop)

```bash
python3 tools/build_netlify.py      # → bcs-academy-netlify.zip (a single index.html at the root)
```

Drag `bcs-academy-netlify.zip` (or the `dist/netlify` folder) onto https://app.netlify.com/drop.

## Run locally

Open `further-maths/index.html`, or run `cd further-maths && python3 -m http.server 8000`.

## Source layout

| Files | Contents |
|---|---|
| `js/physics.js`, `css/physics.css` | Physics: the lab engine (every section's simulations, notes, drills, practice, tutor) in one scope, exposed to the shell as `PHYS` |
| `js/content-*.js` | spec points: notes and drill generators. `m1`–`m4` are Maths AS 1–A2 2; `f1`, `f2a/b`, `f4a/b` are FM AS 1, AS 2 and A2 2; `content-1/2/3`, `content-fm2` are FM A2 1 |
| `js/spec*.js` | course registry (`defineCourse`), the spec structure with quoted outcomes, sections and routes, sources, formula books |
| `js/book-*.js` | textbook chapters, with the same unit naming |
| `js/sims*.js` | simulations |
| `js/lab*.js` | Lab tools |
| `js/stats.js` | distributions, inverse CDFs, critical values (checked against the CCEA tables), summary statistics, χ² |
| `js/figs.js` | theme-aware SVG diagrams for the textbook (forces, beams, ladders, graphs, Venn, trees, networks) |
| `js/formulae.js` | FM A2 1 formula book and the booklet tags for every unit |
| `js/mathengine.js`, `js/util.js` | expression parser (real and complex), answer checking, helpers |
| `js/graph.js`, `js/graph-presets.js`, `js/desmos.js` | grapher and presets |
| `js/ui.js`, `js/drill.js`, `js/settings.js`, `js/about.js`, `js/app.js` | motion and icons, drill engine, settings, About page, routing and views |
