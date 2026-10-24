# BCS Academy: handoff (24 Oct 2026)

Paste this into a new chat to carry on.

## The project
- **What:** BCS Academy, a free CCEA A level revision site for Maths, Further Maths and Physics. The owner is a student founder, Ben Smith.
- **Repo:** `bsmith340/PhaseSpace`. The only branch is `claude/hopeful-hopper-2bzeui`; there is no `main` yet. Ask if you want one created so pull requests have somewhere to merge.
- **App:** a vanilla-JS single-page app in `further-maths/`. Routes use `#/` links, scripts load in `index.html` order, and maths renders with KaTeX. There is no build step for the app itself.
- **Units:**
  - Maths: `m1`–`m4`
  - Further Maths: `f1`, `f2`, `fm` (A2 1) and `f4`
  - Physics: `as1`, `as2`, `a21`, `a22`, inside `js/physics.js` (the `PHYS` module)
- **Live today:** bcsmath.netlify.app (old version until the owner uploads the new zip). The old physics address bcs35.netlify.app redirects to it.
- **Build brief and rules for agents:** `docs/build/BRIEF.md`.

## Done and pushed
- **Rebrand to BCS Academy.** Old BcsMaths/BCSFM progress files and codes still load.
- **Proofs removed from all Maths units.** The Proof topic (m1) and proof by contradiction (m3) are gone and topics renumbered. Further Maths keeps its proofs.
- **Accounts on Supabase:**
  - `supabase/schema.sql` with row-level security
  - `js/account.js` for sign up, sign in, magic link, reset and deleting an account
  - `js/cloud.js` syncs progress
  - `js/report.js` adds "Report a problem" on every topic, with an admin page at `#/admin/reports`
  - `.github/workflows/db-backup.yml` takes nightly backups
  - Guides: `docs/backend/SETUP.md`, plus a draft privacy notice
- **Ask tutor:**
  - `js/chat.js` is the chat window; `functions/api/chat.js` is a Cloudflare Pages Function calling Claude Haiku
  - Hints first, UK helplines on distress, daily limits, history kept only on the device
  - Guide: `docs/chat/SETUP.md`
- **Past papers (`js/papers.js`, `js/ccea-papers.js`):**
  - **By paper:** every real CCEA series for all 12 units, linking to CCEA, with per-question score tracking
  - **By topic:** questions grouped per topic, weakest first
  - **Choose 2 of 4 sections:** supported for Further Maths AS 2 and A2 2
- **36 BCS Academy papers:** `js/bcsp-<unit>.js`, easy, medium and hard per unit, with mark schemes. Every answer was checked by computation.
- **Walkthroughs (`js/walkthrough.js`):** narrated step-by-step players on every paper question and every textbook worked example. They stand in for "AI videos", which can't be produced here.
- **Brand:**
  - logo and icons in `further-maths/assets/`
  - `manifest.webmanifest`, and an offline service worker `sw.js` with an "Update available" toast
  - `.well-known/assetlinks.json` template
  - Play Store plan: `docs/play-store/PLAY-STORE.md`
- **Google:** `node tools/build-seo.mjs` builds 254 static pages under `/learn/` plus `sitemap.xml`. Plan: `docs/seo/SEO-PLAN.md`.
- **Research:**
  - `docs/research/competitor-design.md` (11 competitors, 12 ranked patterns)
  - business plan and sprint plan PDFs in `docs/`

## Not done yet
1. **Design and speed pass.** It was paused part-way; the unfinished work is in `git stash` ("design agent: unfinished lazy-loading and CSS work"). It covers:
   - loading only the code each page needs (about 3 MB of JS currently loads up front)
   - Apple-style polish from the research report
   - the Android back gesture closing pop-ups
   - the floating Ask button no longer covering content on phones

   Either finish the stashed work or redo it. Then run the tests below.
2. **Code review** of everything above. The owner asked for it and it has not been run.
3. **Canonical and Open Graph addresses** point to `https://bcs-academy.pages.dev`. Switch them to the owner's own domain once it's known: `further-maths/index.html`, `further-maths/js/config.js` (`siteUrl`) and the SEO build.
4. **bcs35 redirect** (`bcs35-redirect/`) still points to bcsmath.netlify.app. Update it when the domain is live.

## Owner to-do (the dates matter)
1. **Google Play account, by 26 Oct:**
   - A parent registers the Google Play developer account ($25; the owner must be 18 or over).
   - Personal accounts need **12 testers for 14 days** of closed testing before the app can go public.
   - Countdown: closed test starts by 5 Nov (latest 13 Nov), apply for production by 20 Nov (latest 28 Nov), submit by 30 Nov (latest 5 Dec), launch 12 Dec.
2. **Supabase:**
   - Create a project in the London region and run `supabase/schema.sql`.
   - Paste the URL and anon key into `further-maths/js/config.js`, and add `contactEmail`.
   - Make yourself admin with the SQL in SETUP.md.
3. **Anthropic API key** with a spend cap, added as a Cloudflare Pages secret `ANTHROPIC_API_KEY`, plus the `CHAT_KV` binding. About $15 a month at 100 daily users.
4. **Cloudflare Pages:**
   - Connect the repo.
   - Production branch `claude/hopeful-hopper-2bzeui` (or `main` once it exists).
   - Build command `node tools/build-seo.mjs`, output directory `further-maths`, `NODE_VERSION=20`.
   - Add the custom domain: the root domain needs its DNS on Cloudflare; `www` can use a CNAME.
5. **Google Search Console:** add the domain, submit `sitemap.xml`, and request indexing for the top pages.
6. **Before launch:** click through several CCEA past-paper links and check that the unit times and marks match the CCEA spec. CCEA's site couldn't be reached from the build environment.

## Quick deploy without Cloudflare
- Run `node tools/build-seo.mjs`, then zip the contents of `further-maths/`.
- Drag the zip onto the Netlify site's Deploys page.
- Accounts and the tutor show "not connected" until the steps above are done.

## Tests
The scripts are scratch files and are not in the repo:
- **Maths:** 218,748 generated questions with 0 errors; 205 textbook chapters.
- **Physics:** all pages, with no errors.
- **Accounts:** 74 Playwright checks.
- **Chat:** 11 unit tests and 30 browser checks.
- **Papers:** 282 checks, plus a 32-check section-choice test.
- **Layout:** no overflow at 320, 360 or 390 px.
- **Service worker:** the site loads offline.

When rebuilding the tests, at minimum load `further-maths/index.html` in Playwright, visit every route with external network blocked, and assert there are no page errors and no horizontal overflow at 320 and 390 px.
