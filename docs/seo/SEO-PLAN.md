# BCS Academy · SEO launch checklist

The app runs on hash routes (`/#/m1/point/m_circ`). Google treats everything after `#` as the same page, so the app on its own is **one** indexable URL. `tools/build-seo.mjs` fixes this without touching the router. It writes about 250 static, script-free pages under `/learn/`, one for each spec point and physics section, plus hub pages, `sitemap.xml` and `robots.txt`. Every page links into the app.

## 0. Deploy (Cloudflare Pages)

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `node tools/build-seo.mjs` |
| Build output directory | `further-maths` |
| Root directory | *(repo root)* |
| Environment variable | `NODE_VERSION=20` (any version from 18 up works) |

- The build takes about 1–2 s.
- It fails the deploy if the data can't be read or if any page fails validation (duplicate titles, missing descriptions, broken internal links). In that case the old deploy stays live.
- `node tools/build-seo.mjs --check` re-validates the existing output without rebuilding it.
- `further-maths/learn/` and `further-maths/sitemap.xml` are build output and are gitignored.
- `tools/seo/slugs.json` **is committed**. It pins every page's URL, so a page keeps its address when a point's title is edited later. Commit it whenever the build adds new entries.
- `siteUrl` in `further-maths/js/config.js` drives the canonical URLs, the sitemap and `robots.txt`. **Change it before launch if you move to a custom domain**, otherwise every canonical points at `pages.dev`.

## 1. Day 1: Google Search Console (about 20 minutes)

1. Go to <https://search.google.com/search-console>, choose **Add property**, then **Domain**, and enter your domain (e.g. `bcsacademy.co.uk`).
2. Google shows a `TXT` record (`google-site-verification=…`). In Cloudflare, open **DNS**, choose **Add record**, set Type `TXT`, Name `@`, and paste the value. Click **Verify** (it is usually instant on Cloudflare, and always within an hour).
   - On `*.pages.dev` with no custom domain you can't add DNS. Use a **URL-prefix** property (`https://bcs-academy.pages.dev/`) with the *HTML tag* method instead: the lead adds the `<meta name="google-site-verification">` tag to `index.html`.
   - A custom domain is strongly recommended. Sitelinks, brand trust and the Play Store listing all benefit.
3. **Sitemaps**: submit `https://<domain>/sitemap.xml`. Check the next day that the status is *Success* and that it shows about 255 discovered URLs.
4. **URL inspection, then Request indexing**, for these 10 pages, in this order (there is a daily quota of about 10):
   1. `/` (home)
   2. `/learn/`
   3. `/learn/maths/`
   4. `/learn/further-maths/`
   5. `/learn/physics/`
   6. `/learn/maths/as-1/`
   7. `/learn/further-maths/as-1/`
   8. `/learn/physics/as-1/`
   9. `/learn/maths/a2-1/`
   10. `/learn/further-maths/a2-1/`

   On days 2–3, request the remaining unit hubs (`as-2`, `a2-2` for each subject, plus `/learn/physics/as-2/`, `a2-1` and `a2-2`). The topic pages are discovered from the hubs and the sitemap, so you don't need to request them.
5. Also add the site to **Bing Webmaster Tools** (it can import from Search Console in one click). Bing feeds DuckDuckGo and ChatGPT search.

## 2. Home page (`index.html`, lead-owned)

The app shell renders everything with JavaScript. Google does run JS, but it should still find real text and links in the HTML. Recommended `<head>` additions:

```html
<link rel="canonical" href="https://bcs-academy.pages.dev/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="BCS Academy">
<meta property="og:title" content="BCS Academy · CCEA Maths, Further Maths & Physics">
<meta property="og:description" content="Free self-study guides to every unit of CCEA A level Maths, Further Maths and Physics: notes, drills, simulations, mock tests and a past-paper tracker.">
<meta property="og:url" content="https://bcs-academy.pages.dev/">
<meta property="og:image" content="https://bcs-academy.pages.dev/assets/play-feature.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"BCS Academy","url":"https://bcs-academy.pages.dev/"}</script>
```

- Shorten the meta description to 155 characters or fewer. The current one is about 380 and Google cuts it off: "Free CCEA A level Maths, Further Maths and Physics revision: every unit point by point, with notes, drills, simulations, mock tests and a past-paper tracker."
- Add a crawlable link block inside `<main id="app">`, after the "Loading…" text, and a `<noscript>`:

```html
<noscript><p>BCS Academy needs JavaScript. Browse the <a href="/learn/">revision notes for every CCEA Maths, Further Maths and Physics unit</a> without it.</p></noscript>
```

- Add a visible footer link: `<a href="/learn/">Revision notes</a>`. One plain link from the home page to `/learn/` is the most important internal link on the whole site.

## 3. Internal linking (already built in)

- Index, then subject, then unit, then topic, with breadcrumbs plus BreadcrumbList JSON-LD on every page.
- Each topic page links to the other points in its topic, and to the previous and next point in the unit.
- Each unit page links to CCEA's official past papers and mark schemes. These are links only: no CCEA content is copied.
- Each page has an "Open in BCS Academy" button that deep-links into the app.
- Later wins:
  - Link `/learn/…` pages from the app's own point pages (e.g. "Share this page" can use the clean URL).
  - Ask schools and teachers to link to `/learn/maths/` and similar pages rather than `/#/…`.

## 4. Keywords and target pages

| Search phrase | Target page |
|---|---|
| CCEA A level maths revision | `/learn/maths/` |
| CCEA further maths revision / notes | `/learn/further-maths/` |
| CCEA A level physics revision | `/learn/physics/` |
| CCEA AS maths pure / AS 1 maths notes | `/learn/maths/as-1/` |
| CCEA AS 2 maths mechanics statistics | `/learn/maths/as-2/` |
| CCEA A2 maths pure revision | `/learn/maths/a2-1/` |
| CCEA further maths past papers | `/learn/further-maths/as-1/` and `/a2-1/` ("Past papers and mark schemes" section, linking to CCEA plus the app's tracker) |
| CCEA maths past papers | `/learn/maths/as-1/` and the other maths unit hubs |
| CCEA physics AS 1 notes | `/learn/physics/as-1/` |
| CCEA physics AS 2 waves notes | `/learn/physics/as-2/` |
| CCEA A2 physics fields capacitors | `/learn/physics/a2-2/` |
| CCEA further maths complex numbers / matrices | `/learn/further-maths/as-1/<topic>/` |
| Long tail, e.g. "CCEA circles AS maths", "CCEA projectiles physics" | the matching topic page (title = "<Topic> · CCEA <Subject> <Unit>") |

- Brand searches ("BCS Academy") will rank within days of indexing.
- The past-papers queries are competitive (CCEA, Maths Genie, PMT). Expect topic pages to win long-tail traffic first.

## 5. How long it takes

- **Discovery**: 1–4 days after the sitemap is submitted and the requested URLs are inspected.
- **Indexing**: the 10 requested pages are usually indexed within about a week. Most of the remaining ~250 pages follow within 2–6 weeks. New sites are crawled cautiously, and some pages may sit in "Discovered – currently not indexed" for a while. That is normal. Better internal links and a few external links speed it up.
- **Ranking for competitive terms**: 2–6 months. Exam season (Jan, Apr–Jun) brings the biggest jump in search demand, so launch before February.
- Check **Search Console, then Pages**, weekly. Fix anything under "Not indexed" that isn't simply "Discovered" or "Crawled – currently not indexed".

## 6. Core Web Vitals and speed

- The `/learn/` pages have no JS, no web fonts and inline CSS, so they should be well inside "Good" (LCP < 2.5 s, INP < 200 ms, CLS < 0.1).
- To measure:
  - <https://pagespeed.web.dev/> on a topic page and on `/`. Use the "Mobile" tab.
  - Search Console, then **Core Web Vitals**. It needs about 28 days of real Chrome traffic before data appears.
  - Cloudflare, then **Web Analytics**: free, cookie-less, and shows real-user LCP/INP/CLS. Enable it in the Pages project's Metrics tab.
- The app shell is the heavier page: about 3 MB of deferred JS. Most of that is `physics.js` (885 KB) plus the textbook files. If PageSpeed flags it:
  - Lazy-load `physics.js` and the `book-*.js` chapters on first use.
  - Long-cache versioned file names (see below).

## 7. Security and caching headers (`further-maths/_headers`)

- **All paths**:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`: camera, mic, geolocation, payment, usb and topics all off. Change `microphone=()` to `microphone=(self)` if voice input is ever added.
  - `X-Frame-Options: SAMEORIGIN`
- **`/learn/*`**: an enforced, strict CSP (`default-src 'none'`, inline styles only). These pages run no scripts.
- **App shell CSP**: `Content-Security-Policy-Report-Only`. It allows cdnjs, jsdelivr, Google Fonts, `*.supabase.co` (https + wss), Desmos and `api.anthropic.com`.
  - Enforcing it straight away risks breaking an untested path (Desmos loads more scripts, and so do the Supabase and chat agents' code).
  - Run with the site for a week and look at the DevTools console on the main routes (home, a point page, the Desmos graph, physics labs, sign-in, the tutor). If there are no `[Report Only]` violations, rename the header to `Content-Security-Policy`.
  - `'unsafe-inline'` for scripts can only be dropped once `index.html` has no inline `<script>` or `on*=` handlers.
- **Caching**:
  - HTML revalidates every time.
  - `/learn/*`: 10 min, then stale-while-revalidate.
  - `/js/*` and `/css/*`: 5 min, then stale-while-revalidate. Long cache is deliberately **not** used, because the file names aren't fingerprinted and a year-long cache would leave visitors on a mix of old and new scripts after a deploy. Once the build adds a version to the file names (`app.3f2a.js` or `app.js?v=…`), switch these to `public, max-age=31536000, immutable`.
  - `/assets/*`: 7 days.
  - `sw.js` and `manifest.webmanifest`: `no-cache`.
- `_redirects` isn't needed. Pages already redirects `/learn/maths` to `/learn/maths/`.

## 8. Every deploy, automatically

- The pages and sitemap are rebuilt from the same data the app uses, so new spec points appear on Google with no extra work.
- `lastmod` is the build date.
- After a big content update, resubmit the sitemap in Search Console (optional, since Google re-reads it anyway).
