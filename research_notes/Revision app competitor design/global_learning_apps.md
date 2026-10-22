# Global Learning Apps: Product & UX Teardown (Khan Academy/Khanmigo, Brilliant, Quizlet, Duolingo)

Research date: 2026-10-22. Method note: WebFetch could not resolve any domain in this session (DNS failure for khanacademy.org, brilliant.org, duolingo.com, lennysnewsletter.com, screensdesign.com), so findings below come from search-result extracts of the cited pages, not full-page reads. Treat exact wording as close paraphrase. Several sources are 2020–2024 and are flagged as such.

## Onboarding and sign-up (questions, goal setting, time to first lesson, when sign-up is requested, fields, social login, age gates, parental consent)

### Takeaway
The best-performing pattern is "value before sign-up": Duolingo (and, per a teardown, Brilliant) let a guest pick a goal and complete a first lesson before asking for an account, then nudge sign-up as a way to save progress. Khan Academy is the reference for teen and child accounts: under-13s get restricted, parent-linked accounts with no email required. Neither model needs much data at sign-up.

### Cited Findings
- Duolingo delays account creation as long as possible. A quick exercise comes first, and sign-up appears after users have seen how easy the product is, "usually until the moment when users must register in order to progress further" — [Appcues GoodUX](https://goodux.appcues.com/blog/duolingo-user-onboarding); [Taplytics: Duolingo A/B tested delayed sign-ups](https://taplytics.com/blog/duolingo-ab-test-onboarding)
- Duolingo's sign-up prompts recur after lessons and get more persuasive over time ("keep your progress"), and some features are locked for guests — [ReallyGoodUX](https://www.reallygoodux.io/blog/duolingo-user-onboarding)
- UXCam contrasts the usual "sign up, then use" flow with Duolingo's "use, then sign up" — [UXCam](https://uxcam.com/blog/10-apps-with-great-user-onboarding/). A claimed +20% day-one retention from this change is unsourced, so it is unverified — [Momentum Inspired](https://momentuminspired.beehiiv.com/p/how-to-nail-your-user-onboarding-for-maximum-retention)
- In Duolingo's onboarding, a streak-goal selection screen reportedly improved retention even though the chosen goal was not used afterwards (commitment effect). This is a secondhand account of a practitioner thread, not verified — [Lazyweb](https://experiments.lazyweb.com/research/duolingo-streak-goals-retention)
- Lenny's Newsletter (Duolingo retention PM interview) reports that retention is most fragile in the first 7 days, and that letting users opt out of the streak-length goal gave them ownership and "significantly increased retention" — [Lenny's Newsletter](https://lennysnewsletter.com/p/behind-the-product-duolingo-streaks)
- Brilliant: a third-party teardown describes a roughly 12-step onboarding that personalises goals before asking for an account, then shows a paywall with a trial timeline. This is outside analysis, not confirmed internally — [ScreensDesign](https://screensdesign.com/showcase/brilliant-learn-by-doing)
- Brilliant release notes mention a revised onboarding flow "to get learners started in the right spot", a simplified Course page and faster lesson loading — [APKMirror: Brilliant 7.6.0](https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-7-6-0-release)
- Khan Academy under-13 options:
  - A parent creates a child account at khanacademy.org/parent ("Add your child"), and the parent becomes the child's permanent coach.
  - A child who signs up directly is asked for a parent email. The parent must approve within 7 days or the account is permanently deleted, though the child can use the site in the meantime.
  - A child can join via a Google Classroom invitation or a class code.

  — [Khan Help: under-13 login options](https://support.khanacademy.org/hc/en-us/articles/202487460-If-my-child-is-under-age-13-what-login-options-are-there-); [Khan Help: Google Classroom under 13](https://support.khanacademy.org/hc/en-us/articles/203444450-How-can-students-under-13-create-a-Khan-Academy-account-using-Google-Classroom)
- Khan child accounts are restricted for privacy. They need no email (username and password only), only the parent can change the password, and the parent controls whether other coaches can be added — [Khan Help: set up a new account](https://support.khanacademy.org/hc/en-us/articles/202487450-How-do-I-set-up-a-new-user-account); [Khan Parent Quick Start](https://support.khanacademy.org/hc/articles/360040168512-Parent-Quick-Start-Guide)

### Inferences
- For a free UK A-level app (users mostly 16–18), the Duolingo pattern fits: no account needed. Let the student pick a course/unit and do a 3–5 question drill straight away. Then offer "Save your progress" (Google sign-in plus an optional email) after the first session or when they want to sync across devices.
- Under UK GDPR, the age of digital consent is 13, so most A-level students can consent themselves. The Khan under-13 parental flow is probably unnecessary, though a simple "I'm 13 or over" gate is cheap. The UK ICO Age Appropriate Design Code (Children's Code) still applies to under-18s: high-privacy defaults, no nudging dark patterns. Not researched here; verify with the ICO.
- Onboarding questions worth copying: "Which course(s)?" (Maths / Further Maths / Physics, AS or A2), "When is your exam?" and a daily goal (e.g. 5/10/20 min). The Duolingo evidence suggests the act of committing helps even if the goal is lightly used.

### Gaps
- Exact current (2026) onboarding question lists for Duolingo, Brilliant and Khan could not be read in full (fetch failed).
- Duolingo's own data on delayed sign-up was not found. Figures come from secondary teardowns.
- Quizlet's onboarding and sign-up flow was not researched (no results surfaced).

## Navigation and structure (course maps, unit/lesson structure, Khan mastery levels, Brilliant's interactive lesson design)

### Takeaway
Khan's mastery system is the most copyable "clear progress" model. Each skill is worth 100 points across four visible levels (Attempted → Familiar → Proficient → Mastered), and mixed-skill quizzes and unit tests are what take a skill to Mastered. Brilliant's model is a short lesson of many small interactive screens, built around manipulating something rather than reading.

### Cited Findings
- Khan mastery points: each skill is worth 100 points. Familiar = 50, Proficient = 80, Mastered = 100. A unit's total = 100 × number of skills — [Khan Help: How do mastery levels work?](https://support.khanacademy.org/hc/tr/articles/5548760867853)
- Khan level thresholds (per the levels article):
  - 70–99% correct on an exercise → Familiar
  - 100% correct → Proficient
  - below 70% → back to Attempted
  - Mastered = already Proficient, then answering correctly on that skill in a mixed-skill assessment (quiz, unit test, course challenge)

  — [Khan Help: mastery levels](https://support.khanacademy.org/hc/tr/articles/5548760867853)
- Conflict: an older "self-paced Mastery" article gives Familiar as 70–85% and says Mastered requires all questions on the skill correct in a Unit Test or Course Challenge — [Khan Help: What is self-paced Mastery](https://support.khanacademy.org/hc/fr/articles/360007253831-What-is-self-paced-Mastery). The levels article appears newer.
- Brilliant's lesson experience is described in its job postings as a "core layout engine" with modules for progressive discovery, branching paths, hints and feedback. The hard interaction problems named are symbolic maths entry and drag-and-drop code authoring. The postings are closed, so they reflect past priorities — [Dynamite Jobs: Brilliant Lead Product Designer](https://dynamitejobs.com/company/brilliantorg/remote-job/lead-product-designer-learning-experience); [read.cv Brilliant](https://read.cv/teams/brilliant/lead-product-designer-learning-experience-RcZSztuOYYHt0bzlcNPs)
- A review notes most Brilliant lessons ask you to manipulate something on screen. Brilliant's own copy: "Every session is visual and interactive... you play with concepts until they click" — [Headway review](https://makeheadway.com/blog/brilliant-review/); [Brilliant tutor page](https://brilliant.org/cs/tutor/)
- Brilliant 5.0.0 release: courses easier to browse and progress easier to see, with less scrolling on course pages (older release) — [APKMirror Brilliant 5.0.0](https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-5-0-0-release)

### Inferences
- Mapping to CCEA:
  - course = unit (AS 1, AS 2, A2 1, ...)
  - Khan "unit" = topic
  - Khan "skill" = spec point
  - a drill set of about 4–7 questions gives Familiar/Proficient
  - a mixed "topic quiz" or "unit test" promotes to Mastered

  Showing a mastery percentage per unit (points / (100 × skills)) gives a single clear number.
- Rule worth copying: a skill can only reach "Mastered" through interleaved, mixed practice. This builds retrieval, and Khan uses it to stop single-exercise grinding.
- Brilliant-style lessons for A-level fit Physics and mechanics sims well: one idea per screen, an interactive widget, a prediction question, then feedback.

### Gaps
- Whether Khan mastery levels decay over time, and the exact 2026 quiz/unit-test cadence, could not be confirmed (fetch failed).
- No official Brilliant design case study or redesign write-up was found. Everything above comes from job ads, release notes and reviews.

## Practice UX (question format, hints, step-by-step solutions, wrong-answer feedback)

### Takeaway
Khan's practice pattern is clear and cheap to build. Each multi-step question has one hint per step, the final hint reveals the full worked solution, and using a hint makes the question count as wrong for mastery. A "Report a problem" link on every question captures exactly which item and what state the student was in.

### Cited Findings
- Khan multi-step practice problems usually include a hint for each step. The blog advises trying first, before using a hint — [Khan Academy Blog: How should people practice](https://blog.khanacademy.org/?p=963)
- Hints let students view a step-by-step solution, and using a hint counts the question as wrong (0 points). This is from a staff reply on the support community, not formal documentation — [Khan Help community](https://support.khanacademy.org/hc/vi/community/posts/360057834552-Answer-keys)
- Khan has no answer keys for practice problems — [same thread](https://support.khanacademy.org/hc/da/community/posts/360057834552-Answer-keys)
- Brilliant lessons include hints, feedback and branching paths as core modules — [Dynamite Jobs posting](https://dynamitejobs.com/company/brilliantorg/remote-job/lead-product-designer-learning-experience)
- Quizlet Learn mode is described as tracking which terms you struggle with and showing them more often. Memory Score uses spaced repetition to estimate retention. These are secondary sources (a review and a university help page) — [Atomi Systems review, Apr 2026](https://atomisystems.com/elearning/quizlet-review-2026-pros-cons-and-comparison); [SNHU Academic Resource Center](https://snhuacademicresourcecenter.screenstepslive.com/a/1935882-introduction-to-quizlet-ai)
- Duolingo's Explain My Answer (AI explanation of why an answer was wrong) became free for all users in January 2026 — [Nibble: Is Duolingo Max worth it](https://nibble-app.com/blog/is-duolingo-max-worth-it)

### Inferences
- For A-level maths, copy the stepped reveal: Hint 1 (first method step), Hint 2 (...), then "Show full solution", ideally with mark-scheme style M1/A1 annotations. Taking a hint should cost mastery credit without costing streak credit.
- Worth copying from Quizlet: resurface weak items more often (simple spaced repetition), which is easy to do offline with localStorage.

### Gaps
- Specific Khan wrong-answer feedback (e.g. targeted misconception messages) and its current "Get help" menu wording were not verifiable.
- The design of Brilliant's wrong-answer screens was not documented in accessible sources.

## AI tutor UX (Khanmigo, Quizlet AI, Duolingo Max: placement, entry points, limits, teen safety)

### Takeaway
Khanmigo is built around not giving the answer: it is Socratic, asks for the next step and asks students to explain their reasoning. Teen safety is layered:
- moderation that flags unsafe text and images and alerts the linked adult
- chat logs visible to parents and teachers
- daily interaction limits
- explicit "AI can be wrong" messaging

Quizlet shut down its chat tutor (Q-Chat) in 2025 and moved its AI toward generating study materials. Duolingo made answer explanations free in 2026 and kept conversation features paid.

### Cited Findings
- Khanmigo uses the Socratic method. A student asking for a solution may get a question about the next step, or a request to explain their reasoning — [Control Alt Achieve](https://www.controlaltachieve.com/2023/12/edtech-cool-tool-khanmigo.html) (2023); [Yahoo/Tech report](https://tech.yahoo.com/general/articles/khanmigo-gpt-4-learning-tool-183642060.html)
- Sal Khan on GPT-3.5: "even if you tell it not to tell the answer, it will still kind of give the answer". This motivated building on GPT-4 (2023) — [Yahoo Tech](https://tech.yahoo.com/general/articles/khanmigo-gpt-4-learning-tool-183642060.html)
- Khan's prompt engineering for Khanmigo follows a 7-step approach. It starts from the ideal tutor-student relationship and aligns prompts with learning-science literature — [Khan Academy Blog: 7-step approach](https://blog.khanacademy.org/khan-academys-7-step-approach-to-prompt-engineering-for-khanmigo)
- Entry point: Khanmigo chat can be opened from within any Khan Academy course, alongside the content — [School Data Leadership](https://www.schooldataleadership.org/systems/ai-tools/khanmigo.html)
- Moderation scans text and images for inappropriate, harmful or unsafe content. A flag sends an email and an in-platform notification to the linked adult:
  - parent-provided access → parent
  - district access → the assigning teacher (not co-teachers)
  - admins → only above a severity threshold, if the district opted in

  — [Khan Help: Khanmigo moderation](https://support.khanacademy.org/hc/bg/articles/14394814244365)
- Students are told their chat history is visible to parents or guardians and teachers. Khan limits daily AI interaction because long sessions drift or repeat. In-product messaging says Khanmigo may be wrong and should not replace teachers or parents — [Khan Help](https://support.khanacademy.org/hc/hu/articles/14394569357069)
- Student access (current help page): only district-partner schools, homeschool children enabled by parents, and adults 18+ who pay themselves. It is free for teachers in many countries (a review says 44+, supported by Microsoft). A family plan is cited at about $4/month (secondary source) — [Khan Help: Can I give my students access](https://support.khanacademy.org/hc/en-us/articles/14799155077261-Can-I-give-my-students-access-to-Khanmigo); [Khanmigo.ai](https://khanmigo.ai/); [AI Tools Bakery](https://aitoolsbakery.com/?p=6592)
- Quizlet:
  - Q-Chat (AI tutor) was reportedly discontinued in June 2025. The source is a competitor blog; an April 2026 review still lists it, which looks outdated — [Quizgecko](https://quizgecko.com/de/blog/best-q-chat-alternative); [Atomi Systems](https://atomisystems.com/elearning/quizlet-review-2026-pros-cons-and-comparison)
  - Magic Notes turns uploaded notes or PDFs into flashcards, practice tests and outlines (launched 2023) — [Fortune](https://fortune.com/education/articles/quizlet-ai-powered-tools-q-chat-magic-notes-quick-summary-gpt)
  - In February 2026, Quizlet added AI tools spanning explanations → practice-material generation → study methods, and acquired Coconote (audio/video → notes and quizzes) — [THE Journal, 13 Feb 2026](https://thejournal.com/Articles/2026/02/13/Quizlet-Adds-AI-Powered-Tools-for-Active-Practice-Notetaking.aspx)
  - In March 2026, Quizlet launched as an app inside ChatGPT — [StreetInsider/PRNewswire](https://www.streetinsider.com/PRNewswire/Quizlet+Launches+as+Native+App+in+ChatGPT+to+Transform+AI-Powered+Learning/26142955.html)
- Duolingo Max (2026): Explain My Answer is now free. Max's value is Video Call with the AI character Lily (adapts to level, remembers past calls, gives a transcript, no penalty for mistakes) and human-written Roleplay scenarios. Price is about $29.99/month or $168/year; regional prices vary — [Nibble](https://nibble-app.com/blog/is-duolingo-max-worth-it); [StoryLearning review](https://storylearning.com/duolingo-max-review)
- Brilliant has an AI tutor, Koji, that tracks what you have mastered and where you are stuck, and builds practice around the gaps — [Stork.ai](https://www.stork.ai/en/brilliant-org); [Brilliant tutor page](https://brilliant.org/cs/tutor/)

### Inferences
- For a free solo-built app, the safest AI pattern is a contextual "Explain this step" or "Why is my answer wrong?" button attached to a specific question. It has a fixed system prompt (Socratic, no final answers on first ask, CCEA notation), a daily cap and a visible "AI can make mistakes — check the worked solution" note. This is the Duolingo Explain My Answer placement combined with Khanmigo's guardrails.
- Inference: an open-ended chat tutor carries the most safety and cost burden (moderation, logs, alerts). Khanmigo's adult-notification system needs linked accounts, which a free anonymous app won't have. Scoping AI tightly to questions is more realistic.

### Gaps
- Khanmigo's exact daily limit numbers and the full 7 steps were not retrievable.
- Quizlet's own announcement on retiring Q-Chat was not found.
- Duolingo Max's language/platform availability conflicts between sources.

## Habit loops (streaks, goals, reminders, XP, leagues; evidence and criticism)

### Takeaway
Streaks with forgiveness are the best-evidenced lever. Duolingo has run 600+ streak experiments, and its reminder timing uses a published bandit algorithm. Leagues and leaderboards are the most criticised element, linked to anxiety and to "gaming" XP instead of learning.

### Cited Findings
- Duolingo learners who reach a 7-day streak are 3.6× more likely to complete their course (correlational) — [Duolingo Blog: How the streak builds habit](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
- Allowing up to 2 Streak Freezes equipped at once raised daily active learners by +0.38% (relative). Duolingo cites UPenn/UCLA research that "slack" in goals motivates more than rigid rules — [Duolingo Blog](https://blog.duolingo.com/how-duolingo-streak-builds-habit)
- 600+ experiments on streaks in about 4 years (secondary summary of Lenny's Podcast with Jackson Shuttleworth) — [Recall summary](https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team)
- Duolingo reminders use a "Recovering Difference Softmax" sleeping/recovering bandit to pick notification templates, which handles novelty effects. Results: +2% new-user retention and +0.5% DAU over the baseline (KDD 2020) — [Yancey & Settles, KDD 2020](https://research.Duolingo.com/papers/yancey.kdd20.pdf); [Duolingo Blog: Hi it's Duo](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)
- Brilliant streak rule: complete 3 problems or 1 full lesson per day. A missed day uses a "streak charge" and the streak stays the same — [Brilliant Help: streak](https://brilliant.org/help/using-brilliant/what-is-a-streak); [Brilliant Help: streak charge](https://brilliant.org/help/using-brilliant/what-is-a-streak-charge)
- Brilliant leagues: weekly, reset Sunday 8pm PT. Each league has 30 players (you plus 29), with promotion, staying and demotion — [Stork.ai summary of Brilliant help](https://www.stork.ai/en/brilliant-org)
- Duolingo leagues rank users by weekly XP, with promotion and a demotion zone — [arXiv 2203.16175](https://arxiv.org/pdf/2203.16175)
- Criticism: a qualitative study (forum posts plus 15 interviews) found "gamification misuse", where users fixate on XP and leagues, wasting time and hurting learning — [arXiv 2203.16175](https://arxiv.org/pdf/2203.16175)
- A systematic mapping of gamified education software found badges, leaderboards, competition and points are the elements most often reported as having negative effects — [arXiv 2305.08346](https://arxiv.org/pdf/2305.08346)
- A student thesis found streaks, leaderboards and XP encourage regular practice, but some users reported pressure or anxiety about keeping rankings or streaks — [UKWMS thesis](https://repositori.ukwms.ac.id/47113/6/BAB%205.pdf)
- A CMU student UX analysis argues streak freezes can become a crutch (opinion, no data) — [CMU UXA](https://cmu-uxa.notion.site/Performative-Progress-Strava-Mules-Duolingo-Streaks-1c18eb2b3ca480f59cd2e4123ac0d7d2)

### Inferences
- Copy these:
  - a low daily bar (e.g. 3 questions, like Brilliant)
  - streak freezes or "charges" earned through practice
  - a 7-day early milestone
  - an optional, user-chosen goal
- Avoid public leagues for a small, free teen app. They need critical mass and carry the most evidence of harm. Instead, use private progress against exam countdown and spec coverage.
- Reminders: a web or Android app can only use local notifications or Web Push with consent. Use a few rotating message templates and respect the UK Children's Code (no guilt-tripping, defaults off). The Children's Code point is not researched here.

### Gaps
- No controlled study shows leagues improve learning outcomes.
- The full Duolingo/Lenny article contents could not be fetched, so only search extracts were used.

## Progress dashboards, mobile layout, visual style ("Apple-like" clean feel)

### Takeaway
Little primary design documentation exists. What is citable: Brilliant has repeatedly simplified its course pages (less scrolling, clearer progress), and Khan's unit mastery percentage and four-level skill states give a dashboard its structure. Claims about Brilliant's "Apple-like" look are not documented in the sources I could reach.

### Cited Findings
- Brilliant's course pages were simplified for easier browsing and progress visibility (v5.0.0), and the Course page layout was simplified again later (v7.6.0) — [APKMirror 5.0.0](https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-5-0-0-release); [APKMirror 7.6.0](https://www.apkmirror.com/apk/brilliant-org/brilliant/brilliant-7-6-0-release)
- Khan's unit mastery is computed from 100 points per skill, with level states Attempted/Familiar/Proficient/Mastered — [Khan Help](https://support.khanacademy.org/hc/tr/articles/5548760867853)
- Khanmigo chat logs can be reviewed in the parent/guardian dashboard — [Khan Help](https://support.khanacademy.org/hc/hu/articles/14394569357069)
- No source specifically evaluating Brilliant's minimalist design was found (search returned none).

### Inferences
- A dashboard pattern to copy: a per-unit ring or percentage (mastery points), a skill list with four-state chips, a "next up" card, streak and daily goal at the top, and an exam countdown.
- Inference, not sourced: Brilliant's clean feel comes from one interaction per screen, generous whitespace, a single accent colour per course, and a large primary "Continue" button pinned to the bottom on mobile.

### Gaps
- No design system, fonts or colour specifics for Brilliant, Khan or Duolingo were retrievable.
- Mobile layout specifics (tab bars, etc.) went unverified because page fetches failed.

## Report-an-error / feedback flows

### Takeaway
Khan puts a "Report a problem" link on every exercise (lower right), which sends the exact question and the student's steps to the content team. Non-question issues go to a help-centre request with screenshots.

### Cited Findings
- Khan: use the "Report a problem" link in the lower right of the exercise. This lets the content team see exactly which question you were on and the steps you took. Issues not tied to one question go through a Help Center request, with steps and screenshots — [Khan Help: report a problem](https://support.khanacademy.org/hc/de/articles/202445304)

### Inferences
- Copy this: a small "Report a problem" link on every question. It auto-attaches the question ID, spec point, app version, the student's answer and the hint state, and offers 3 quick reasons (wrong answer / typo / unclear) plus an optional text box. For a solo founder with no backend, a pre-filled mailto: link or a Google Form URL with query parameters works.

### Gaps
- Report flows for Brilliant, Duolingo and Quizlet were not found in accessible sources.
