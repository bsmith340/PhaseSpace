# PhaseSpace · Further Maths A2 1

Static study site for **CCEA GCE Further Mathematics, Unit A2 1 (Pure)**: notes, interactive simulations and endless randomised drills, organised by spec point.

## What's inside

| Topic | Spec points | Simulations |
|---|---|---|
| 1 Complex numbers | 1.1 exponential form · 1.2 de Moivre · 1.3 nth roots · 1.4 loci | Argand multiplier, de Moivre spiral, roots polygon, loci explorer |
| 2 Matrices | 2.1 3×3 det/inverse · 2.2 eigen · 2.3 diagonalisation/Cayley–Hamilton · 2.4 systems of planes | 2×2 transformation + eigenvectors, 3D three-planes |
| 3 Vectors | 3.1 vector/triple product · 3.2 lines & planes · 3.3 angles & distances | 3D line–plane, skew lines |
| 4 Hyperbolic functions | 4.1 definitions/Osborn · 4.2 log forms · 4.3 equations · 4.4 calculus | Unit hyperbola + graphs |
| 5 Further calculus | 5.1 inverse trig derivatives · 5.2 standard integrals · 5.3 reduction formulae · 5.4 arc length/surface area · 5.5 improper integrals & volumes | Arc length / surface / volume |
| 6 Series | 6.1 Maclaurin · 6.2 limits · 6.3 Taylor | Maclaurin/Taylor polynomials |
| 7 Polar | 7.1 sketching · 7.2 area · 7.3 tangents | Polar plotter with area + tangents |
| 8 Differential equations | 8.1 integrating factor · 8.2 CF · 8.3 PI & IVPs · 8.4 SHM/damping | Slope field, damped/forced oscillator |
| 9 Induction | 9.1 divisibility & matrices · 9.2 series & inequalities | Induction checker |

- **Drills**: every question is generated with random parameters and a full worked solution. Answers are checked numerically, so exact forms (`5pi/12`, `2sqrt(3)`, `ln(3/2)`, `e^2/6`) and 3 s.f. decimals both work.
- **Smart drill** weights questions toward spec points you haven't secured. **Sprint** = 10 timed mixed questions.
- **Progress** (mastery = correct out of last 10 per spec point) is stored in `localStorage` only.

Spec numbering is PhaseSpace's own grouping of the A2 1 content — cross-check against the official CCEA specification.

## Run locally

No build step. Open `index.html` directly, or serve the folder:

```bash
cd further-maths && python3 -m http.server 8000
```

## Deploy

- **GitHub Pages**: Settings → Pages → Source: *GitHub Actions*. The workflow `.github/workflows/deploy-further-maths.yml` publishes this folder on every push to `main`.
- **Netlify / Vercel / Cloudflare Pages**: publish directory `further-maths` (a root `netlify.toml` is included). Or drag-and-drop the folder into Netlify Drop.

## Editing content

- `js/content-1.js` — Complex numbers, Matrices, Vectors
- `js/content-2.js` — Hyperbolics, Calculus, Series, Polar, DEs, Induction
- `js/sims.js` — simulations; `js/app.js` — routing, drill engine, progress; `js/util.js` — helpers and answer parser

Each spec point is `{ id, code, title, notes, sims, drills }`; each drill is a function returning `{ q, fields | mc, sol, hint? }`.
