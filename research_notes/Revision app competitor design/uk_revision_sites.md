# UK Revision Sites: Product and UX Teardown (Save My Exams, PMT, Corbettmaths, Dr Frost Maths)

> **Method caveat (read first):** In this session, direct page fetches to all four sites were blocked: WebFetch returned DNS errors and the egress proxy refused CONNECT to savemyexams.com and the others. All findings below come from web-search result snippets of the sites' own pages (help centre, pricing FAQ, study-tool pages), third-party reviews and Trustpilot. Search snippets can lose context, so the exact on-screen details (above-the-fold layout, colours, click counts, exact button labels) are mostly **not verified**. Where I add observations from prior knowledge, they are marked **[unverified, prior knowledge]** and should be checked by opening the site. Date context: today is 2026-10-22.

## Home page, onboarding and how a student reaches the first question

### Takeaway
Two models: (1) **no-account content libraries** (PMT, Corbettmaths), where navigation is Subject → Level → Board → resource list and the first question is 2–4 clicks from the home page with no sign-in; (2) **account-centric platforms**, where content is browsable but practice, progress and AI features push towards sign-up. Save My Exams (SME) is freemium with weekly allowances. Dr Frost Maths (DFM) needs a free account for interactive practice. For CCEA A level specifically, coverage is thin across all four. This is a real gap for a CCEA-specific app.

### Cited Findings
- SME organises content by level hubs (/gcse/, /a-level/, /igcse/) and then by subject and board, e.g. a "CCEA A Level Maths Past Papers [PDFs & Mark Schemes]" page at /a-level/maths/ccea/past-papers/ — [SME A Level hub](https://www.savemyexams.com/a-level/); [SME CCEA A Level Maths past papers](https://www.savemyexams.com/a-level/maths/ccea/past-papers/)
- SME's CCEA A Level Maths page covers exam code A2212. It lists papers by year (June 2025, 2024 and 2023 Unit 1 Pure Mathematics and Unit 2 Applied Mathematics, each with question paper and mark scheme), going back to about 2019. I found no sign of CCEA-specific topic notes or topic questions — [SME CCEA past papers](https://www.savemyexams.com/a-level/maths/ccea/past-papers/) (via search snippet)
- SME's Physics subject page has a CCEA section, but it seems to point only to CCEA **GCSE** Physics past papers. I found no evidence of CCEA A Level Physics — [SME Physics](https://www.savemyexams.com/subjects/physics/) (via search snippet)
- SME markets "Trusted by 3m+ users" on its US home page — [SME US](https://www.savemyexams.com/us/)
- PMT's home page links subject revision hubs (Maths Revision, Physics Revision, Chemistry Revision…). These split by level and board, e.g. /physics-revision/a-level-aqa/ and /physics-revision/a-level-caie/ — [PMT](https://www.physicsandmathstutor.com/); [PMT Physics Revision](https://www.physicsandmathstutor.com/physics-revision/); [PMT AQA Physics](https://www.physicsandmathstutor.com/physics-revision/a-level-aqa/)
- A third-party guide says all PMT resources are free with no account or sign-in required — [PMT guide (search snippet)](https://www.pmt.education/blog/students/physics-and-maths-tutor-resources/)
- A Cognito comparison (written by a competitor) says PMT has run since 2013 and covers nine subjects across GCSE, IGCSE and A-Level. SME's own comparison says "operating since 2019", so the start dates conflict — [Cognito](https://cognito.org/blog/physics-and-maths-tutor-vs-save-my-exams); [SME vs PMT](https://www.savemyexams.com/learning-hub/support/physics-and-maths-tutor-alternative/)
- The PMT pages that came up in search for CCEA were CAIE and WJEC/Eduqas Physics. I found no CCEA A level page on PMT. Other sites (RevisionScience, RevisionMaths.com) host CCEA A level papers by unit code: Physics APH11/APH21/APH31/APH32; Maths AS SMT11/SMT21, A2 AMT11/AMT21 — [RevisionScience CCEA Physics](https://revisionscience.com/a2-level-level-revision/physics-level-revision/physics-level-past-papers/ccea-level-physics-past-papers); [RevisionMaths CCEA](https://RevisionMaths.com/level-maths/level-maths-past-papers/ccea-level-maths-past-papers)
- Corbettmaths navigation includes "5-a-day GCSE 9-1", "5-a-day Primary", "5-a-day Further Maths" and a "Further Maths" item under "More". A separate A-level category says "Corbettmaths A-level resources - videos, worksheets, solutions and much more" — [Corbettmaths (search snippet)](https://corbettmaths.com/155/); [Corbettmaths A-level](https://corbettmaths.com/category/a-level/)
- A separate domain, corbettmathsalevel.com/5-a-day/, lists daily sheets labelled "AS Pure" and "AS Stats+Mechs". The cached copy was about 2,870 days old (roughly 2018), so it may no longer be maintained — [Corbettmaths A level 5-a-day](https://corbettmathsalevel.com/5-a-day/)
- DFM registration has a separate route for "students learning independently": a free personal account not linked to a school, which asks for a personal email address. Students at subscribing schools are told to join via their teacher's invite instead — [DFM Registration](https://www.drfrost.org/registration); [DFM Student Registration](https://www.drfrost.org/registration/student)

### Inferences
- For a CCEA student, SME offers only CCEA Maths past-paper PDFs. PMT and Corbettmaths appear to have no CCEA A level structure. DFM's past papers list AQA/Edexcel/OCR/WJEC "and more" (CCEA not confirmed). A CCEA-native unit structure (AS 1, AS 2, A2 1, A2 2, with codes like SMT11/AMT11, APH11) is a real differentiator.
- The lowest-friction pattern to copy is PMT's no-login path, Subject → Level/Board → topic list → PDF. A modern app could reach "first question" in 2 taps (course chip, then topic) without an account.
- **[unverified, prior knowledge]** The SME home page hero has a level/subject picker plus a large search bar. PMT's home page is a grid of subject tiles with level sub-links. Corbettmaths' home page is a WordPress-style blog layout with big coloured buttons (Videos, Worksheets, 5-a-day, Textbook). DFM's logged-in home is a dashboard with "Practise" and "Tasks". Check all of these live.

### Gaps
- Exact above-the-fold content, hero copy and click counts for each site could not be verified, because direct fetch was blocked.
- Whether DFM's past-paper library includes CCEA papers is not confirmed.

## Account sign-up, social login and free vs paid gating

### Takeaway
SME is the only one with consumer paid tiers: Free (weekly allowance), Essential (charged at sign-up, no trial) and Premium (7-day trial, AI marking). Billing and cancellation are its biggest complaint source. PMT and Corbettmaths need no account. DFM is free for independent students and earns from schools (£650 + VAT per year).

### Cited Findings
- **SME Free:** "a weekly allowance of revision notes", sample exam questions, past paper downloads, flashcards, limited Target Tests and the two chat helpers, plus a Study Plan. Learning Hub articles are open to everyone, and a free account "unlocks more previews and personalised study features" — [SME: Why pay? Free vs Essential vs Premium](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- **SME Essential:** unlimited revision notes and exam questions, mock exams with answers, unlimited flashcards, chat helpers and Study Plan. Target Tests and Test Builder still have limits. "Essential doesn't include a free trial and is charged at sign-up" — [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- **SME Premium:** "Unlimited model answers. Unlimited Target Tests. Unlimited exam question assessment and feedback, including Smart Mark where it's available for your course. Strengths & Weaknesses insights without the limits… PDF downloads of revision notes and exam questions." It has a 7-day free trial — [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- Price: one third-party review says Essential costs £12 a month, or £4 a month billed annually (not checked against an official page). SME itself says prices vary by location, account type and offers — [useaicademy alternatives](https://useaicademy.com/blog/save-my-exams-alternatives); [SME Is it worth it?](https://www.savemyexams.com/learning-hub/support/is-save-my-exams-worth-it/)
- A third-party article says a free SME account gets "one topic question and five revision notes a month". This conflicts with the official "weekly allowance" wording — [useaicademy free vs paid](https://useaicademy.com/blog/save-my-exams-free-vs-paid)
- Free registered SME users get a Smart Mark taster on 1 question per course. Unlimited Smart Mark is for paying members — [SME Smart Mark article](https://www.savemyexams.com/learning-hub/useful-resources/get-immediate-exam-specific-feedback-with-smart-mark/)
- SME says Mark Schemes and Model Answers for its Exam Questions cannot be downloaded or edited "due to copyright reasons" — [SME How to use Exam Questions](https://www.savemyexams.com/learning-hub/sme-articles/how-to-use-exam-questions/)
- To cancel SME: Account Settings → Membership & Billing → Manage Subscription → Cancel Subscription. Paid access lasts until the end of the billing period, then the account reverts to Free — [SME cancel guide](https://www.savemyexams.com/learning-hub/support/how-to-cancel-save-my-exams-subscription/)
- **DFM:** "Dr Frost Maths is free for every independent learner." UK schools pay £650 + VAT and international schools £750, for a 12-month all-inclusive subscription. Schools get a 60-day free trial with no payment details — [DFM support: subscription cost](https://support.drfrost.org/hc/en-gb/articles/4546170606239-What-is-the-subscription-cost-for-Dr-Frost); [DFM free without subscription](https://support.drfrost.org/hc/en-gb/articles/5132733395103-What-can-I-use-for-free-if-my-school-doesn-t-have-a-subscription); [DFM school trial](https://support.drfrost.org/hc/en-gb/articles/4970267483039-Can-my-school-trial-Dr-Frost)
- In 2024, DFM tweeted that the school price was £600 a year (now superseded by £650), that students could use it independently for free, as could 1 teacher with up to 3 classes, and that discounts of 25% or 50% need an application — [Dr Frost on X (2024, older)](https://x.com/DrFrostMaths/status/1780119410457403733)
- The DFM pricing FAQ puts task assignment with deadlines, class management and progress tracking in the paid school subscription, not the free student tier — [DFM Pricing](https://www.drfrost.org/pricing) (via search snippet)
- DFM's teacher getting-started guide mentions sign-up with Google or Microsoft 365, and linking an account to Google or Office 365. It is not confirmed whether student accounts offer this — [DFM Getting Started for Teachers (PDF)](https://www.drfrost.org/docs/DrFrost-GettingStartedForTeachers.pdf)
- DFM is run by Dr Frost Learning, which describes itself as a registered charity in England and Wales (no 1194954) — [DFM teacher guide PDF](https://www.drfrost.org/docs/DrFrost-GettingStartedForTeachers.pdf) (title snippet)
- Corbettmaths sells printed revision cards (Higher, Foundation, Level 2) at £10.99 according to a 2024 review. Its order page describes "90 revision cards… 10+ hours of video tutorials… 1000+ Questions/Answers". I found no A level card set — [Edumentors review 2024](https://edumentors.co.uk/blog/corbettmaths-review-2023-is-it-useful/); [Corbettmaths order](https://corbettmaths.com/2018/04/12/onlineorder/)

### Inferences
- For a free app: copy DFM and PMT (everything free), but keep an optional account (or none, using local storage) only for syncing progress. SME's meter (weekly allowance) and its "model answers only in Premium" gating cause friction that a free competitor can simply leave out.
- SME separating "mark scheme" (all tiers) from "model answer" (Premium) shows that model answers are seen as the high-value asset. A free app that gives worked model answers for every CCEA question would be a clear selling point.

### Gaps
- Official SME GBP prices for Essential and Premium (monthly and annual) were not confirmed from a primary page.
- Required sign-up fields for SME (e.g. year group, subjects, exam board) and its social-login options were not found.

## Navigation: subject → unit → topic, search, breadcrumbs

### Takeaway
All four use a strict tree (board/level → subject → module or unit → topic). PMT's tree matches the old modular spec (C1–C4, FP1–3, M1–5, S1–4) as well as newer pages. DFM adds a skill-level layer below topics ("Key Skills") and recommends skills.

### Cited Findings
- PMT A-level Maths "Past Paper Questions By Topic" splits into Core, Mechanics, Statistics and Further Pure modules, with topic-separated questions for each — [PMT A-level Maths by topic](https://www.physicsandmathstutor.com/a-level-maths/past-paper-questions-by-topic/)
- PMT CAIE Physics 9702 lists topics by paper, e.g. "Topic 1 Physical Quantities and Units" to "Topic 11 Particle Physics" for Papers 1 and 2, with Paper 4 topics after — [PMT CAIE Physics](https://www.physicsandmathstutor.com/physics-revision/a-level-caie/)
- The PMT A-level Maths Papers hub lists, under each module, past papers, worksheets and a "Solution bank for Edexcel" link. Solution-bank pages (M2, S1, FP2…) list chapters and review exercises as PDFs — [PMT A-level Maths Papers](https://www.physicsandmathstutor.com/a-level-maths-papers/); [FP2 Solution Bank](https://www.physicsandmathstutor.com/a-level-maths-papers/fp2-solutionbank/)
- In DFM Key Skills, students pick skills by topic, can mix topics, and can start a practice set. Topics are listed on the left with expandable drop-downs. The platform recommends skills based on current activity and mastery — [DFM Getting Started for Students (PDF)](https://drfrost.org/docs/DFM-GettingStartedForStudents.pdf)
- DFM claims "3,000+ question generators, known as Key Skills". A third-party listing says 1,000 generators and 40,000+ exam questions, so counts vary by source and date — [DFM Students](https://www.drfrost.org/students); [EdTech Impact](https://edtechimpact.com/products/drfrostmaths/)

### Inferences
- A mirror of the CCEA unit structure (Unit → spec section → topic → skill) with a DFM-style left-hand expandable topic tree works well on desktop. On mobile, a drill-down list with a sticky breadcrumb ("FM › A2 1 › Complex numbers") is the standard pattern.

### Gaps
- No details found on site search behaviour or breadcrumb implementation for any of the four.

## Past papers, topic questions, mark schemes, progress and difficulty filters

### Takeaway
PMT gives static PDFs: whole papers, plus "questions by topic" compiled into a PDF with a mark-scheme PDF. SME turns topic questions into interactive items with Easy/Medium/Hard/Very Hard tiers, reveal-mark-scheme, self-marking, Target Tests and a Strengths & Weaknesses report that unlocks after 10 questions. DFM makes past papers self-marking and tracks mastery from 1 to 100.

### Cited Findings
- SME Exam Questions are tagged Easy, Medium, Hard and Very Hard. A teacher page says "up to four difficulty levels", and another mentions only easy, medium or hard. Depending on subject, questions are listed by difficulty or by topic — [SME Exam Questions](https://www.savemyexams.com/study-tools/exam-questions/); [SME Teachers US](https://www.savemyexams.com/us/teachers/)
- The SME workflow is: answer on paper or in your head, then click to reveal the mark scheme (and the model answer if available), then self-assess. Model answers are not available for every question — [SME How to use Exam Questions](https://www.savemyexams.com/learning-hub/sme-articles/how-to-use-exam-questions/)
- SME Strengths & Weaknesses gives a topic-by-topic breakdown once at least 10 Exam Questions are completed — [SME How to use effectively](https://www.savemyexams.com/learning-hub/sme-articles/how-to-use-save-my-exams-effectively/) (via search snippet)
- SME Target Tests let you choose topics, question difficulty and question types, and set a time limit. Test Builder is the teacher version — [SME Exam Questions](https://www.savemyexams.com/study-tools/exam-questions/); [SME Test Builder](https://www.savemyexams.com/teacher-tools/test-builder/)
- SME also offers Mock Exams, Flashcards and a Study Plan (tiered as described above) — [SME Mock Exams](https://www.savemyexams.com/study-tools/mock-exams/); [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- DFM past papers: "real past papers from AQA, Edexcel, OCR & more. Free & self-marking!" for GCSE and A-Level, including WJEC — [DFM Past Papers](https://www.drfrost.org/revision/papers)
- DFM mastery: correct answers raise a mastery score from 1 to 100, with dotted threshold lines showing what is needed to reach the next level. Points are separate from mastery, and schools can run leaderboards (e.g. one school updates its leaderboard fortnightly and gives prizes) — [DFM Getting Started for Students](https://drfrost.org/docs/DFM-GettingStartedForStudents.pdf); [Bewdley School page](https://www.bewdley.worcs.sch.uk/?p=262)
- DFM's equivalence checking: "an automated algorithm… detects equivalent algebraic expressions", but strictness varies by question. For example, a factorisation question accepts x(x+1) or x(1+x) but not x+x² — [DFM Platform Manual (Scribd)](https://www.scribd.com/document/440705974/DrFrostMaths-Guide) (older document, likely pre-2020)
- Corbettmaths 5-a-day: one page of five short mixed questions per day. Further Maths 5-a-day is organised by month with answers. Older daily pages include "5-a-day Video Solutions" — [Jackpot Maths guide](https://www.jackpotmaths.com/2025/04/18/making-the-most-of-corbett-maths-5-a-day-sheets-a-guide-for-parents/); [Corbettmaths 5-a-day Further Maths](https://corbettmaths.com/5-a-day/further-maths/); [Numeracy 3rd May](https://corbettmaths.com/2020/04/03/numeracy-3rd-may/)
- Corbettmaths Textbook Exercises come with answers and video tutorials, and worksheets have "Workout" and "Apply" sections — [Corbettmaths Textbook Exercise](https://corbettmaths.com/category/textbook-exercise/)

### Inferences
- The features worth copying for a free CCEA app:
  1. Topic questions tagged by CCEA unit and difficulty (SME's 4-tier labels).
  2. Reveal-then-self-mark with a "marks I got: _/n" entry (SME), stored locally to drive a per-topic strengths view. A low threshold like "after 10 questions" is a sensible unlock rule.
  3. DFM-style mastery bar from 0 to 100 per skill, with visible thresholds.
  4. A daily "5-a-day" mixed set (Corbettmaths), which is cheap to build from an existing question bank and creates a habit.
- Paper-by-paper and topic-by-topic views should share one question database, so a tick in one view shows in the other.

### Gaps
- Whether SME shows ticks or % complete per topic on its topic lists was not verified.
- PMT has no progress tracking that I could find (expected, since it has no accounts).

## Worked solutions: video vs written

### Takeaway
Corbettmaths and DFM lean on short videos (DFM: 2–4 minute worked examples behind a "Watch Worked Example" button after each answer). PMT is written PDFs (solution banks, mark schemes). SME uses written mark schemes, model answers and worked solutions inline below each question.

### Cited Findings
- DFM: each Key Skill has an example button, and a video icon opens a worked example of typically 2–4 minutes. After any answer, right or wrong, students see an explanation, and a "Watch Worked Example" button opens the video. The guide says wrong attempts carry no penalty — [DFM Getting Started for Students](https://drfrost.org/docs/DFM-GettingStartedForStudents.pdf)
- DFM student page promises "unlimited practice questions, video explainers and past exam papers" free — [DFM Students](https://www.drfrost.org/students)
- PMT hosts textbook solution banks (Edexcel Heinemann, C/D/FP/M/S modules) as PDFs. These are old-spec, and a newer page covers the 2017+ spec — [PMT Solution Banks](https://www.physicsandmathstutor.com/a-level-maths/solution-banks-edexcel-heinemann-textbooks/)
- Cognito (a competitor) lists PMT weaknesses as: static site, and no video lessons, flashcards, quizzes or AI marking — [Cognito](https://cognito.org/blog/physics-and-maths-tutor-vs-save-my-exams)
- SME: each question comes with a full mark scheme, and worked solutions where available. Model answers are Premium-unlimited — [SME How to use Exam Questions](https://www.savemyexams.com/learning-hub/sme-articles/how-to-use-exam-questions/); [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)

### Inferences
- A solo founder can't easily produce videos for everything. Written step-by-step solutions revealed one step at a time, attached directly to each question, give most of the DFM "explanation after answer" benefit. Videos can be added later for the highest-traffic topics.

### Gaps
- Whether SME has video solutions for A level Maths was not confirmed.

## AI tutor / chat features

### Takeaway
SME is the only one of the four with prominent AI. Smart Mark is examiner-style AI marking of written answers (not MCQ or calculation questions), with "Explain my feedback" and "Improve my answer" follow-ups. There are also two chat helpers. I found no AI features for PMT, Corbettmaths or DFM.

### Cited Findings
- Smart Mark grades typed or handwritten answers against the exam board's mark scheme, then explains which marks were dropped and how to recover them. Flow: on a supported question, click "Mark my answer", type and submit, then get quick feedback, with "Explain my feedback" and "Improve my answer" options. It "does not currently mark Multiple Choice Questions or calculation questions" — [SME Smart Mark tool](https://www.savemyexams.com/study-tools/smart-mark/); [SME Smart Mark article](https://www.savemyexams.com/learning-hub/useful-resources/get-immediate-exam-specific-feedback-with-smart-mark/)
- SME claims Smart Mark is "69% more accurate than ChatGPT". This is company-reported, not an independent benchmark — [SME accuracy claim](https://www.savemyexams.com/learning-hub/insights/smart-mark-marks-your-answers-more-accurately-than-general-chatgpt/)
- SME markets Smart Mark on TikTok as "Exam board specific" — [SME TikTok](https://www.tiktok.com/@savemyexams/video/7480227621586898198)
- SME has an "AI study tools that know your exam" page, and an explainer "Is Save My Exams AI? What Powers Our Study Tools". The free tier includes limited use of "the two chat helpers" — [SME AI study tools](https://www.savemyexams.com/study-tools/ai-study-tools/); [Is SME AI?](https://www.savemyexams.com/learning-hub/sme-articles/is-save-my-exams-ai/); [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- A recent Trustpilot review complains that some SME notes (IGCSE 0478) "are written completely by AI" — [Trustpilot SME](https://www.trustpilot.com/review/www.savemyexams.com)

### Inferences
- Smart Mark excludes calculation questions, which is most of A level Maths and Physics. So for maths-heavy CCEA content, AI marking of working is not a feature competitors already cover well. Structured answer checking (DFM-style equivalence checking) is more relevant.
- If you add AI, present it SME-style: tied to a specific question, framed as "Mark my answer", with feedback in mark-scheme language. Be open about content authorship, because "AI-written notes" is already a trust complaint.

### Gaps
- The names and exact UI of SME's "two chat helpers" were not confirmed.

## Report-an-error / feedback flows

### Takeaway
No reliable information was found on in-product error reporting for any of the four sites.

### Cited Findings
- A search for SME "report an issue/error" returned only other platforms' patterns. Albert.io uses a three-dot menu, then "Question Feedback" with issue types. RevisionDojo has "Report question" on questions only. MRCEM Success has a "Something wrong?" button on questions and notes — [Albert](https://help.albert.io/en/articles/3952795-how-do-i-leave-feedback-on-a-question); [RevisionDojo](https://www.revisiondojo.com/help-center/report-content-error); [MRCEM Success](https://mrcemsuccess.com/?p=100762)
- A Trustpilot review of PMT mentions typos in AQA maths content — [Trustpilot PMT](https://www.trustpilot.com/review/physicsandmathstutor.com)

### Inferences
- The cheap pattern to copy is a "Something wrong?" link on every question and solution. It should pre-fill the question ID, unit and topic, with a short issue-type picker (typo / wrong answer / unclear / other).

### Gaps
- SME, PMT, Corbettmaths and DFM error-report UIs are all unverified.

## Progress dashboards, mobile layout and visual style

### Takeaway
Only SME (Strengths & Weaknesses, Study Plan) and DFM (mastery, points, school leaderboards, teacher tasks) have real dashboards. PMT and Corbettmaths are static, account-free sites. Visual style could not be verified because direct page access was blocked.

### Cited Findings
- SME: Strengths & Weaknesses (topic breakdown after 10 questions, limited on Free and Essential), Study Plan (all tiers) — [SME: Why pay?](https://www.savemyexams.com/learning-hub/support/why-pay-for-save-my-exams/)
- SME reviewers mention the study planner and tracking of weak areas — [SME Reviews](https://www.savemyexams.com/reviews/)
- DFM: mastery 1–100 per skill, points, recommended skills. Teacher-set tasks with deadlines are in the paid school tier — [DFM Students guide](https://drfrost.org/docs/DFM-GettingStartedForStudents.pdf); [DFM Pricing](https://www.drfrost.org/pricing)
- PMT Trustpilot reviews mention an "outdated UI" — [Trustpilot PMT summary](https://www.trustpilot.com/review/physicsandmathstutor.com)
- SME's tech stack is listed on StackShare (not examined in detail) — [StackShare](https://stackshare.io/save-my-exams)

### Inferences
- **[unverified, prior knowledge]** SME uses a white background with a deep blue/purple brand colour and colour-coded difficulty chips, and is card-dense. PMT uses a green/white WordPress-style theme with ad slots and long link lists. Corbettmaths is bright and colourful with large button tiles. DFM uses a blue brand with a dense app UI. Verify against live pages before citing.
- A free app's progress screen needs only: per-unit % of topics practised, per-topic mastery bar, a recent-mistakes list, and a streak or "5-a-day" counter.

### Gaps
- No verified data on mobile layouts, native apps, or app-store ratings. A search turned up no App Store rating for SME, and no PMT, Corbettmaths or DFM app listings were found.

## Known user complaints

### Takeaway
SME complaints centre on billing (charges after cancelling, trial auto-renewal, hard-to-find cancel option) and AI-written content. PMT complaints are about video ads and crashes or slowness near exams. DFM complaints are about rigid answer-format marking. Reddit threads did not appear in search results.

### Cited Findings
- SME Trustpilot shows about 2,015 reviews with a TrustScore of 4.5 (one snapshot). SME's own pages cite 4.6 from "over 1,800" or "over 1,900" reviews, with 83% five-star. SME's /reviews page claims "15,000+ reviews" across sources, and says 97% of members report better grades (survey of 1,917 students; self-reported) — [Trustpilot SME](https://www.trustpilot.com/review/www.savemyexams.com); [SME Is it trusted?](https://www.savemyexams.com/learning-hub/support/is-save-my-exams-trusted/); [SME Reviews](https://www.savemyexams.com/reviews/)
- SME billing complaints: "they are still taking money from my bank" after cancelling, and "good apart from the subscription". A third-party site notes SME warns that cancelling too close to the trial end may be too late, with the annual charge applying anyway. An aggregator review mentions a "Kinda frustrating cancellation process" with slow support — [Trustpilot SME](https://www.trustpilot.com/review/www.savemyexams.com); [GeniusPal](https://www.geniuspal.app/blog/comparisons/save-my-exams-alternatives); [Worthepenny](https://savemyexams.worthepenny.com/)
- SME content complaint: "some notes such as igcse 0478 are written completely by AI" — [Trustpilot SME](https://www.trustpilot.com/review/www.savemyexams.com)
- PMT: "they've got so greedy with the ads", ads "are always videos, which is super distracting", the site "crashes and doesn't load" when exam stakes are high, plus typos and an outdated UI. The Trustpilot score varies by snapshot (4.0, 3.8, 2.8 on an older page with 15 reviews; latest about 21 reviews). There is also a Student Room thread titled "physics and maths tutor ads" — [Trustpilot PMT](https://www.trustpilot.com/review/physicsandmathstutor.com); [TSR thread](https://www.thestudentroom.co.uk/showthread.php?t=7547553)
- DFM: "I need to put everything in the order that they want for it to count", marked wrong for not putting "4a at the end", it "hates when you use 3.142 instead of pi", and correct answers marked wrong — [Trustpilot DFM (drfrostmaths.com)](https://uk.trustpilot.com/review/www.drfrostmaths.com); [Trustpilot DFM page 2](https://www.trustpilot.com/review/www.drfrostmaths.com?page=2)
- Corbettmaths: a 2024 review frames it as a supplementary tool alongside lessons. I found no notable complaint corpus — [Edumentors](https://edumentors.co.uk/blog/corbettmaths-review-2023-is-it-useful/)

### Inferences
- These complaints map directly onto selling points for a free app: no subscription or billing at all, no ads, fast static hosting that stays up in exam season (an offline-capable PWA), and lenient, transparent answer checking. For that last point, accept equivalent forms and π vs 3.142 within a tolerance, and show "accepted forms" when an answer is marked wrong.

### Gaps
- No Reddit (r/6thForm, r/GCSE, r/alevel) threads surfaced through search. Student sentiment there is not captured.
- No app-store reviews were found for any of the four.
