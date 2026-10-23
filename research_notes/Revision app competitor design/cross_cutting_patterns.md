# Cross-cutting UX best practice for a UK A-level revision web app shipped as an Android TWA (Apple-style design)

Research method note: www.gov.uk, ico.org.uk and developer.chrome.com could not be fetched directly from this environment (DNS failure), so regulatory and platform points rely on search-result excerpts of those pages, archived copies (e.g. dera.ioe.ac.uk mirror of the DfE page), trade press, and reputable secondary summaries. Where a figure comes only from a secondary source, that is flagged. Report writer should treat exact regulatory wording as "verify against GOV.UK/ICO" before quoting as a direct quotation.

## 1. Worked-solution walkthrough design (video vs narrated step animation vs static steps; worked examples, fading, self-explanation, segmenting, length)

### Takeaway
The evidence favours short, learner-paced, segmented worked examples with self-explanation prompts and faded (progressively incomplete) steps over long continuous video; worked examples give a medium benefit over plain problem-solving, self-explanation adds a moderate effect (g ≈ 0.55), and segmenting gives small-to-medium gains. Engagement with video drops sharply beyond roughly six minutes. Note a direct tension with the DfE 2026 AI standards: an AI tutor should not hand out full worked solutions by default (this applies to the AI tutor, not to authored mark-scheme walkthroughs).

### Cited Findings
- Barbieri, Miller-Cotto, Clerjuste & Chawla (2023), "A meta-analysis of the worked examples effect on mathematics performance", Educational Psychology Review 35(1), 11 (DOI 10.1007/s10648-023-09745-1); summaries report a medium benefit of worked examples relative to unguided problem-solving. Study count differs across summaries (55 studies vs "more than 100"; poster reports 185 effect sizes) — [Learning Scientists guest post](https://www.learningscientists.org/blog/2024/1/25-1); [UDel poster](https://www.cehd.udel.edu/wp-content/uploads/2022/02/Worked-Examples-Meta-Poster_022722_SC.pdf); [UDel news](https://www.cehd.udel.edu/in-the-news-christina-barbieri/)
- A separate study of 6th-graders on geometry found fading showed the largest pre-to-post effect sizes, with only prior knowledge moderating the fading effect (not a Barbieri finding) — [eScholarship PDF](https://escholarship.org/content/qt2854h4v0/qt2854h4v0.pdf)
- Worked-example principle is a core chapter of the Cambridge Handbook of Multimedia Learning (Renkl) — [Cambridge](https://resolve-he.cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/worked-example-principle-in-multimedia-learning/CDECDB094C169A37A79F589994C8F641)
- Renkl's work argues learning from examples depends on learners' explicit reasoning about the solution (self-explanation principle); Wittwer & Renkl (2010) found instructional explanations added to worked examples had effects not significantly different from zero on near or far transfer — i.e. telling isn't enough; prompting the learner to explain is the active ingredient — [Renkl transition paper](https://www.researchgate.net/profile/Alexander-Renkl/publication/252065774_Learning_from_worked-out_examples_The_transition_from_instructional_explanations_to_self-explanation_prompts/links/0c96053bbcc1ac1622000000/Learning-from-worked-out-examples-The-transition-from-instructional-explanations-to-self-explanation-prompts.pdf)
- Self-explanation meta-analysis (Bisra et al., 2018): 69 effect sizes, random-effects weighted mean g = 0.55; prompted self-explanations may be less finely adapted to the learner's knowledge gaps than spontaneous ones — [Bisra et al. 2018, Educ Psych Rev](https://www.doi.org/10.1007/S10648-018-9456-4); [PDF mirror](https://www.Gwern.net/doc/psychology/spaced-repetition/2018-bisra.pdf)
- Segmenting principle meta-analysis: 56 investigations / 88 comparisons, significant small-to-medium effects on retention and transfer; segmentation reduced overall cognitive load and increased learning time — [IJETHE 2022 via DOAJ](https://doaj.org/article/d1fdb305193948a5a5bced1627ecef50)
- Meta-analysis of Mayer's multimedia corpus (92 articles, 591 effects): overall g = 0.37; largest significant effects for removing seductive detail, modality, personalization, multimedia, sentence-level coherence, and self-explanation — [UCR assessment PDF](https://assess.ucr.edu/media/741/download)
- Guo, Kim & Rubin (2014), 6.9 million edX video-watching sessions: shorter videos are much more engaging; engagement drops sharply after ~6 minutes (6-minute figure from secondary summaries, not verified in abstract) — [Guo et al. L@S 2014 PDF](https://up.csail.mit.edu/other-pubs/las2014-pguo-engagement.pdf?_blank); [UBC summary](https://blogs.ubc.ca/videolearninghub/?p=569)
- DfE Generative AI product safety standards (updated 19 Jan 2026): AI products are expected "not to provide final answers, full solutions, or complete worked examples by default" — [Third Space Learning summary](https://thirdspacelearning.com/blog/dfe-generative-ai-product-safety-standards/); [GOV.UK collection](https://www.gov.uk/government/publications/generative-ai-product-safety-standards)

### Inferences
- Recommended pattern: static-first, step-revealed walkthrough (one step per "tap to reveal next step"), each step with a short line of justification in words beside the maths, optional micro-animation of the line transformation. This is learner-paced (segmenting), avoids the pacing problem of continuous video, is cheap on low-end phones, and is accessible/searchable.
- Add a self-explanation prompt at key steps ("Why can we divide by cos x here?" with a reveal) and a "try the next step yourself" faded mode on second exposure. Fading from full example to partial to independent problem aligns with both the fading and expertise-sensitivity evidence.
- If video is used, keep each clip under ~6 minutes, ideally one clip per question part, with chapter markers matching steps.
- Avoid decorative "seductive detail" (mascots, background music, irrelevant animation) inside walkthroughs — coherence is among the largest multimedia effects. This aligns naturally with Apple-style restraint.
- Authored mark-scheme walkthroughs are not "AI outputs", so the DfE default-no-full-solution expectation applies to the AI tutor; but it is sensible to gate walkthroughs behind an attempt ("Show solution" after the student marks themselves) to respect the same cognitive-offloading concern.

### Gaps
- Could not retrieve Barbieri et al.'s moderator results on fading or on learner prior knowledge (expertise reversal); full paper needed.
- No direct head-to-head study found comparing narrated step animation vs static steps vs video for A-level maths specifically.
- Exact 6-minute wording in Guo et al. not verified against full text.

## 2. Past-paper practice UX (timed mode, self-marking against mark schemes, retrieval practice and spacing, topic vs whole paper)

### Takeaway
Practice testing and distributed practice are the two highest-utility study techniques (Dunlosky et al. 2013), and retrieval practice beats restudying with a moderate-to-large effect (g ≈ 0.61 per secondary summary of Adesope et al. 2017), with the largest effects when the gap before the final test is 1–6 days. Past-paper UX should therefore make retrieval the default action, schedule return visits, and provide feedback via mark schemes.

### Cited Findings
- Dunlosky et al. (2013): of ten techniques, practice testing and distributed practice received the only "high" utility ratings, benefiting learners of different ages/abilities across many tasks and in educational contexts; highlighting/underlining rated low — [APS press release](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html); [ScienceDaily](https://www.sciencedaily.com/releases/2013/01/130110111734.htm)
- Adesope, Trevisan & Sundararajan (2017), Review of Educational Research: practice tests more beneficial than restudying and all other comparison conditions; 272 effect sizes (~15,4xx participants — counts differ slightly across summaries); cited g = 0.61 (fixed) / 0.70 (random) from secondary blog only; largest effects with a 1–6 day lag between practice test and final test, robust across intervals; feedback matters — [Learning Scientists summary](https://www.learningscientists.org/blog/2017/2/9-1); [WSU record](https://rex.libraries.wsu.edu/esploro/outputs/journalArticle/Rethinking-the-Use-of-Tests-A/99900601154801842)
- Bastani et al. (PNAS 2025): unrestricted AI access during practice improved practice performance but reduced later unassisted exam grades by 17% (GPT Base), because students used it as a crutch — relevant to keeping "reveal answer" from short-circuiting retrieval — [SSRN](https://papers.ssrn.com/abstract=4895486); [Wharton Knowledge](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education)

### Inferences
- Two modes: (a) Topic practice: questions filtered by spec point, untimed, instant self-mark per part — best early in revision and for spaced review; (b) Exam mode: whole paper, countdown timer matching real duration, mark scheme locked until submit, then guided self-marking — best in final weeks for stamina and timing.
- Self-marking UI: show the mark scheme one mark point at a time (M1/A1/B1) with tick/cross per point, sum to a score; ask the student to commit their answer (photo or "I've written it") before revealing — preserves the retrieval attempt. Store per-question score to drive spacing.
- Spaced repetition scheduling: resurface questions marked low after ~1–6 days (matches Adesope lag finding), then expanding intervals; show a "Due today" queue on the home screen.
- Timer UX: allow pause in topic mode but not exam mode; give 10/5-minute warnings; on Android ensure timer survives app backgrounding (store start timestamp, not a running counter).

### Gaps
- Did not find peer-reviewed evidence specifically on student self-marking accuracy against mark schemes (likely overconfidence issue) — worth noting as unverified risk.
- No direct evidence found comparing topic-by-topic vs whole-paper practice outcomes; interleaving literature (not searched here) is relevant.
- Primary Dunlosky and Adesope texts not retrieved; effect sizes from secondary summaries.

## 3. Report-an-error / content feedback flows

### Takeaway
The best-documented model is Duolingo's in-context flag: a report control right next to the item, a short menu of error types tailored to the context, optional free text, and backend triage — because most reports are not actual errors (~10% valid). Closing the loop (telling reporters what happened) is a common user complaint and a differentiator; Glossika shows a closed-loop pattern.

### Cited Findings
- Duolingo: "Report" flag appears next to the solution after an answer is checked; the menu of error types varies by exercise type and by whether the answer was graded correct/incorrect — [Duolingo blog: how user reports improve course content](https://blog.duolingo.com/how-user-reports-improve-course-content)
- Duolingo receives ~200,000 reports/day; "My answer should have been accepted" is ~72% of reports; only ~10% of reports are correct and require a fix, so they built ML triage (previously sorted by frequency) — [Duolingo blog: ML prioritisation](https://blog.duolingo.com/how-machine-learning-helps-duolingo-prioritize-course-improvements)
- Users complain the catch-all "Something else went wrong" option gives no way to specify the issue, and that they never got feedback on reports (anecdotal) — [Substack: Duolingo annoyances](https://mvanec.substack.com/p/duolingo-annoyances)
- Glossika: flagged sentences are immediately removed from the learner's session, sent to a linguistic team, and corrected versions added back after expert approval — [Glossika help](https://help.glossika.com/en/articles/1245025-report-errors-how-do-i-report-problems-with-sentences-what-happens-if-i-flag-a-sentence)
- Khan Academy community has requested a visible "Report errors" button (indicates demand for in-context reporting) — [Khan Academy community](https://support.khanacademy.org/hc/fr/community/posts/360073597532--Report-Errors-button)

### Inferences
- Recommended fields: auto-captured context (question ID, step number, spec point, app version, device, theme) + one-tap category (Typo / Maths error / Mark scheme wrong / Diagram broken / Doesn't display / Other) + optional free text + optional "Notify me when fixed" (needs account; for under-18s keep opt-in, minimal data, per ICO). No screenshot upload by default (data minimisation), maybe optional.
- Place a small flag icon on every question/step/walkthrough, in a consistent corner; open as a bottom sheet (Apple/Material both use sheets for this).
- Triage: aggregate by item; prioritise items with multiple reports; for maths, many "wrong answer" reports will be student error — show "Check: common mistake here is..." before submission to deflect.
- Close the loop: in-app "Your reports" list with status (Received / Fixed / Not an error + reason) and a changelog entry on fixed content.

### Gaps
- Wikipedia and Stack Overflow flagging flows were not researched in this pass (tool budget).
- No quantitative evidence found on whether notifying reporters increases future reporting.

## 4. AI tutor chat UX in education (Socratic, guardrails, citations, placement, rate limits, safety for 16–18; DfE and ICO)

### Takeaway
Unguarded AI harms learning (−17% on unassisted exam) while a Socratic, guardrailed tutor largely removes the harm (but did not show a clear gain). The DfE's January 2026 Generative AI product safety standards turn this into explicit expectations for learner-facing tools: no final answers/full solutions by default, monitoring of cognitive offloading, no anthropomorphic agency claims, time limits, distress detection with signposting to humans, no manipulative or upsell nudges, plus filtering, logging and data protection. The ICO Children's Code applies to under-18 users: high-privacy defaults, profiling off by default, no nudges to weaken privacy.

### Cited Findings
- Bastani et al., "Generative AI without guardrails can harm learning: Evidence from high school mathematics", PNAS 122(26), 2025: ~1,000 high-school students; GPT access improved practice performance (+48% GPT Base, +127% GPT Tutor) but after access removed GPT Base students scored 17% lower than controls; GPT Tutor's safeguards (teacher-designed prompts giving hints not answers) largely mitigated the harm — [IDEAS/RePEc](https://ideas.repec.org/a/nas/journl/v122y2025pe2422633122.html); [SSRN](https://papers.ssrn.com/abstract=4895486)
- Wharton summary: GPT Tutor group scored about the same as control on the exam (avoided harm rather than clear gain); short-term outcomes only — [Wharton Knowledge](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education); [PsyPost](https://www.psypost.org/unrestricted-generative-ai-harms-high-school-math-learning-by-acting-as-a-crutch/)
- Khanmigo is designed to refuse direct answers and redirect ("What do you think the first step should be?"); reviewers note students used to Photomath-style tools find it frustrating; a secondary report claims frequent session abandonment when answers were withheld (unverified) — [JetLearn](https://www.jetlearn.com/blog/how-uk-students-are-using-khanmigo-socratic-and-ai-tutors----and-whats-actually-worth-your-time); [AI Weekly](https://aiweekly.co/alerts/khanmigo-ai-tutor-falls-short-of-khan-academy-hype)
- DfE Generative AI product safety standards: first published Jan 2025, updated 19 Jan 2026 adding cognitive development, emotional and social development, mental health, and manipulation; aimed at edtech suppliers; not legally binding but tied to existing UK law — [GOV.UK collection](https://www.gov.uk/government/publications/generative-ai-product-safety-standards); [DERA archived copy](https://dera.ioe.ac.uk/id/eprint/41822/1/Generative%20AI%20product%20safety%20standards%20-%20GOV.UK.pdf); [Stone King](https://quickreads.stoneking.co.uk/post/102m2ic/the-dfe-updates-its-gen-ai-product-safety-standards)
- DfE 2026 specifics (as summarised): products should not provide final answers, full solutions or complete worked examples by default; monitor and report rate of cognitive-offloading requests; drop self-descriptions/conversational modes implying the product has its own agency; include time limits on use; detect signs of learner distress and signpost to human help; do not deceive, portray unjustified confidence, use peer pressure to drive engagement, or steer users to paid options through biased wording/layouts — [Third Space Learning](https://thirdspacelearning.com/blog/dfe-generative-ai-product-safety-standards/); [Schools Week](https://schoolsweek.co.uk/ai-used-in-schools-should-detect-signs-of-learner-distress/); [Connected by Data](https://connectedbydata.org/blog/2026/01/19/ai-product-safety-expectations)
- The standards cover purpose, content filtering, data protection, governance and wellbeing; filtering requirements apply to learner-facing platforms; 13 standards in total per one summary — [Third Space Learning](https://thirdspacelearning.com/blog/dfe-generative-ai-product-safety-standards/); [Education Business UK](https://educationbusinessuk.net/node/10369)
- ICO Children's Code (Age Appropriate Design Code): 15 flexible standards with best interests of the child primary; Std 7 high-privacy default settings; Std 8 data minimisation; Std 9 data sharing; Std 10 geolocation off by default; Std 11 parental controls; Std 12 profiling off by default unless appropriate safeguards; Std 13 no nudge techniques that lead children to give unnecessary data or weaken privacy; Std 15 online tools for exercising rights — [ICO code PDF](https://ico.org.uk/media/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services-2-1.pdf); [Brodies](https://brodies.com/insights/ip-technology-and-data/what-do-you-need-to-know-about-the-icos-age-appropriate-design-code/); [GOV.UK child online safety](https://gov.uk/guidance/child-online-safety-data-protection-and-privacy)

### Inferences
- Default tutor behaviour: hint ladder (nudge → next-step hint → partial step), never the full solution unless the student has attempted and explicitly opens the authored walkthrough. Log hint-level requests to measure offloading (DfE expectation).
- Placement: contextual inline entry point on each question ("Stuck? Get a hint") rather than a global floating chat bubble — keeps help tied to the problem, supports Socratic framing, avoids a general-purpose chatbot. A floating button (FAB) conflicts with Apple-style restraint and covers content on small screens.
- Grounding/citations: the tutor should reference the specific spec point, mark-scheme line or textbook section it used ("Based on: Mark scheme Q4(b) M1"), with tap-through links; avoid confident claims (DfE: no unjustified confidence) — include "AI can make mistakes; check with your teacher".
- Persona: neutral tool naming ("Hints"), no human name/avatar, no "I feel" language (DfE anti-anthropomorphism).
- Rate limits/time limits: daily message cap and session time limits double as DfE time-limit expectation and cost control; message gently, not as an upsell (DfE manipulation standard).
- Safety: input/output filtering, self-harm/distress classifier with signposting (e.g. talk to a trusted adult, Childline/Shout links), retention-limited logs, no training on student chats by default, profiling off by default (ICO).
- Accounts for 16–18: high-privacy defaults, no public profiles, analytics minimised, DPIA required before launch (ICO standard 2 — not directly verified in this pass).

### Gaps
- Could not fetch the GOV.UK page itself; exact must/should wording and the full list of 13 headings need verification.
- DfE's separate policy paper "Generative AI in education" (for schools) not reviewed here.
- No evidence found on optimal rate limits for student AI tutors.

## 5. Sign-up conversion (value before sign-up, social login vs email, minimal fields)

### Takeaway
Forcing account creation is a measurable conversion killer (19% of shoppers have abandoned an order because they did not want to create an account, Baymard), so a revision app should let students use content immediately and ask for an account only when it unlocks something (sync, saved progress, AI tutor). For under-18s, the ICO Children's Code also pushes toward minimal data collection.

### Cited Findings
- Baymard survey (1,026 US adults): 19% abandoned an order because they did not want to create an account; 62% of sites fail to make guest checkout the most prominent option, and a hard-to-spot guest option is nearly as bad as none — [Baymard: reduce cart abandonment](https://baymard.com/blog/reduce-cart-abandonment); [Baymard: current state of checkout UX](https://baymard.com/blog/current-state-of-checkout-ux)
- Secondary sources report ~24–25% for the same complaint (likely a different denominator) — [Amazon Pay summary of Baymard](https://pay.amazon.com/blog/the-baymard-report-series-how-forcing-sign-ups-drives-down-sales)
- ICO Children's Code standard 8 (data minimisation) and 13 (no nudges to give unnecessary data) — [ICO code PDF](https://ico.org.uk/media/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services-2-1.pdf)

### Inferences
- Pattern: anonymous local progress by default (already possible in a static PWA), with a "Save your progress across devices" prompt after a meaningful moment (e.g. completing first topic quiz), not on launch.
- Offer Google sign-in (natural on Android/TWA; Credential Manager / one-tap) and passkey/email magic link; avoid passwords. Ask only for email (or provider identity) — no name, school, DOB unless needed; if age assurance is needed, a self-declared age band is the lightest option.
- Don't use dark patterns (pre-ticked marketing consent, guilt copy) — both ICO standard 13 and DfE manipulation expectations.

### Gaps
- Baymard data is e-commerce; no education-app-specific sign-up benchmarks found.
- NN/g research on login walls and social-login adoption rates not retrieved in this pass.

## 6. Apple HIG principles for the web + Android/Material expectations for a TWA

### Takeaway
Translate Apple's HIG through measurable tokens: 44×44pt minimum tap targets, 17pt body text with 11pt absolute minimum, scalable type (respect user font size), restraint, clarity and depth via translucent materials, and motion that respects reduced-motion. On Android the TWA must still behave natively: system back must navigate in-app history, content must handle edge-to-edge/display cutouts (Android 15 enforces edge-to-edge for apps targeting API 35) via viewport-fit=cover and env(safe-area-inset-*).

### Cited Findings
- HIG (via secondary summaries): minimum tap target 44×44 points for all interactive elements; body text 17pt, caption2 11pt as absolute minimum; custom fonts should scale with Dynamic Type relative to a text style — [ios-design-guidelines skill summary](https://skills.cat/skills/ehmo/platform-design-skills/ios-design-guidelines); [ios-hig reference](https://skills.cat/skills/beshkenadze/claude-skills-marketplace/ios-hig-reference) (third-party summaries; verify against Apple HIG Layout/Accessibility/Typography pages)
- Android 15: edge-to-edge is default/enforced for apps targeting API 35; unprepared apps get content under status/nav bars; for SDK 35 non-floating windows, cutout mode is effectively LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS — [Android 15 UI changes](https://docs.airnativeextensions.com/news/2025/08/08/android-35-ui-changes); [Android display cutout docs](https://developer.android.com/guide/topics/display-cutout)
- Web side: viewport-fit=cover lets the page draw under the cutout; use env() safe-area insets to pad content — [Chromium display cutout doc](https://chromium.googlesource.com/chromium/src.git/+/fafff21/docs/ui/android/display_cutout.md)
- TWA quality: TWAs must meet PWA installability criteria and load fast; original Chromium guidance cited a Lighthouse performance score of 80; apps failing TWA quality or Play policy may be denied or delisted; in-app purchases of digital goods must comply with Play payments policy — [Chromium Blog (2019)](https://developers-jp.googleblog.com/2019/03/trusted-web-activity.html?m=1); [i-programmer](https://www.i-programmer.info/news/81-web-general/12521-pwa-becomes-twa-and-enters-play-store.html)
- Recommendation from developer walkthrough: privacy policy accessible without login (secondary) — [Medium](https://akamboj18.medium.com/pwa-web-app-as-twa-and-publish-on-google-play-store-c4e6431b9405)

### Inferences
- Tokens: min 44px interactive (≥48dp also satisfies Material's commonly cited 48dp target — Material figure not verified in this pass), 17px body using rem so Android font-size scaling works, SF-like system stack (`-apple-system, system-ui, "Segoe UI", Roboto`) — on Android this resolves to Roboto, which is fine.
- Materials: use `backdrop-filter` blur sparingly (nav bar only); it's GPU-costly on low-end devices — provide solid fallback.
- Motion: spring-like ease for sheets and step reveals, 200–350ms, disable under `prefers-reduced-motion`.
- Back behaviour: every in-app screen (sheet, modal, step) must push history state so Android system back/predictive back closes the sheet or goes back a screen rather than exiting the app; only exit at root. Hash routing already provides this if each view change pushes history.
- Safe areas: `viewport-fit=cover` + padding with `env(safe-area-inset-top/bottom)` on header and bottom tab bar; set theme-color for status bar; test gesture nav bar overlap.
- Ship as TWA with Digital Asset Links verified (otherwise Chrome shows URL bar), offline fallback page via service worker.

### Gaps
- Could not fetch Apple HIG or Chrome TWA quality-criteria pages directly; current (2026) TWA quality criteria may have moved from a Lighthouse score to Core Web Vitals — unverified.
- Predictive back interaction with TWAs not documented in sources found.

## 7. Performance on low-end Android (Core Web Vitals, JS budget)

### Takeaway
Target "good" Core Web Vitals at the 75th percentile of mobile page loads: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. For JavaScript, Alex Russell's budget for the global P75 device/network is roughly 150 KiB HTML/CSS/fonts plus 300–350 KiB gzipped JS (2023) — and far less is better for markup-centric sites.

### Cited Findings
- Thresholds: LCP good ≤2.5 s (poor >4.0 s), INP good ≤200 ms (poor >500 ms), CLS good ≤0.1 (poor >0.25); assessed at the 75th percentile of page views, split mobile/desktop; a page passes only if all three are good — [web.dev: defining CWV thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds); [Calibre](https://calibreapp.com/docs/metrics/thresholds)
- Field data from CrUX over a rolling 28-day window; Lighthouse lab results only approximate; INP replaced FID in March 2024 — [Agile Brand Guide](https://www.agilebrandguide.com/wiki/metrics/core-web-vitals-cwv/); [Pulsetic](https://pulsetic.com/glossary/core-web-vitals/)
- Alex Russell, Performance Inequality Gap 2023: for global P75 devices/networks, ~150 KiB HTML/CSS/fonts and ~300–350 KiB gzipped JS; 2024 edition splits budgets for JS-heavy vs markup-centric stacks — [Infrequently Noted 2022/12](https://infrequently.org/2022/12/); [Infrequently Noted index](https://www.infrequently.org/page/2/)
- Russell 2017 baseline: $200 Android phone on slow 3G (400 ms RTT / 400 Kbps), ≈130 KB gzipped JS (per Simon Willison's write-up) — [Infrequently Noted 2017](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets); [Simon Willison](https://simonwillison.net/2017/Oct/23/web-performance-budgets)

### Inferences
- For a maths content app with KaTeX/MathJax, Desmos-like graphers and physics simulations: keep the app shell well under ~150 KiB gzipped JS, lazy-load simulations, graphing and AI chat on demand; pre-render maths to HTML/SVG at build time where possible rather than client-side typesetting (big INP/LCP win).
- Avoid layout shift from late-loading fonts and math rendering (reserve space) to keep CLS ≤ 0.1.
- Test on a real ~£100 Android (or Moto G-class emulation with CPU 4× slowdown) as the reference device.

### Gaps
- 2024/2026 Russell JS budget numbers could not be parsed reliably; 2026 claim that fewer than half of origins pass CWV on mobile is secondhand.
- No UK-specific device-distribution data for 16–18 year olds found.
