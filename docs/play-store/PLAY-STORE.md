# BCS Academy on Google Play: Trusted Web Activity plan

Target: **live on Google Play on Saturday 12 December 2026.**
Package name (suggested): `academy.bcs.app`. Site: `https://bcs-academy.pages.dev` (from `BCS_CONFIG.siteUrl`).
Rules last checked: 23 October 2026 (sources at the end). Re-check the Play Console Help pages the week you register, because Google changes these rules often.

---

## 1. The rules that drive the timeline (verified)

| Rule | What it means for us | Source |
|---|---|---|
| **Minimum age 18** to sign up for a Play Console account | If the person running BCS Academy is under 18, a parent or guardian must own the developer account in their own name (ID, card and legal name all theirs). | [1] |
| **US$25 one-time registration fee**, credit/debit card, no prepaid cards | Budget £20 or so. The fee is **not refunded** if the ID/card details are judged invalid, so use matching legal names. | [1] |
| **Identity verification**: legal name, address, phone and email (confirmed by one-time codes), government ID if asked | Google gives no turnaround time. Allow a week. | [1], [3] |
| **Android device verification** for new personal accounts, done with the Play Console mobile app | You need a real Android phone signed in to the developer account. | [3] |
| **Closed testing for personal accounts created after 13 Nov 2023: at least 12 testers opted in continuously for at least 14 days** before you can apply for production access | Production and pre-registration stay locked until then. If you drop below 12 opted-in testers, the 14 days effectively restart (third-party reports), so recruit 15 to 20. When you apply you answer questions about the test (how you found testers, the feedback, what you changed). | [2], [4], [5] |
| Organization accounts (D-U-N-S number) are exempt from the 12-tester rule | Only worth it if BCS Academy is a registered organisation; a D-U-N-S number takes time to get. Plan on a personal account. | [3], [5] |
| **Target API level**: new apps and updates must target **Android 16 (API 36)** from 31 Aug 2026 | Bubblewrap's generated project must have `targetSdkVersion 36` or higher. Check `app/build.gradle` after `bubblewrap init`/`update`. | [6] |
| Android developer verification for sideloaded apps starts 30 Sep 2026 in Brazil, Indonesia, Singapore and Thailand, then worldwide in 2027 | Does not change a Play launch in the UK. A Play developer account already covers it. | [7] |

### Countdown to 12 December 2026

Today is 23 October 2026, so **50 days remain**. The closed test alone needs 14 days plus Google's review time, so there is little slack. "Hard latest" is the last safe day. Aim for the "target" dates.

| Step | Target | Hard latest |
|---|---|---|
| Write the privacy policy page and the account-deletion page (section 6). Make the PWA installable (manifest + SW live on the site). | Sun 25 Oct | Sun 1 Nov |
| **Register the Play developer account** (personal; adult owner) and pay $25 | **Mon 26 Oct** | Wed 28 Oct |
| Identity and device verification complete | Mon 2 Nov | Wed 4 Nov |
| Recruit 15 to 20 testers (classmates, parents, teachers) and collect their Google account emails into a Google Group | Mon 2 Nov | Tue 10 Nov |
| Build the signed AAB with Bubblewrap, create the app, fill Store listing + App content (section 5), upload to **Closed testing**, send the opt-in link | Wed 4 Nov | Wed 11 Nov |
| **Closed test starts: 12+ testers opted in** (day 1) | **Thu 5 Nov** | **Fri 13 Nov** |
| Mid-test: ship at least one update from tester feedback (Google asks what you changed) | Thu 12 Nov | Fri 20 Nov |
| Day 14 completed with 12+ still opted in | Thu 19 Nov | Fri 27 Nov |
| **Apply for production access** (Dashboard) | **Fri 20 Nov** | **Sat 28 Nov** |
| Production access granted (no official SLA; allow about a week) | Fri 27 Nov | Fri 4 Dec |
| Submit the production release with **managed publishing ON** (so it doesn't go live early) | Mon 30 Nov | Sat 5 Dec |
| Release approved; publish manually | by Thu 10 Dec | Fri 11 Dec |
| **Launch** | **Sat 12 Dec 2026** | |

---

## 2. One-time setup

```bash
# Node 18+ and a JDK 17 are needed; Bubblewrap offers to download the JDK and Android SDK itself.
npm i -g @bubblewrap/cli
bubblewrap doctor                      # checks JDK + Android SDK paths
```

Before `init`, confirm the live site serves (all from the deployed root, i.e. the `further-maths/` folder):
`/manifest.webmanifest`, `/sw.js`, `/assets/icon-512.png`, `/assets/icon-maskable-512.png`, `/.well-known/assetlinks.json`.
Digital Asset Links only work at the **domain root** (`https://bcs-academy.pages.dev/.well-known/assetlinks.json`). If the site is ever served from a sub-path, move the file to the domain root.

## 3. Build the Android app

```bash
mkdir bcs-twa && cd bcs-twa
bubblewrap init --manifest=https://bcs-academy.pages.dev/manifest.webmanifest
```
Answer the wizard:
- Domain `bcs-academy.pages.dev`, URL path `/#/`
- Application name `BCS Academy`, short name `BCS Academy`
- Application ID **`academy.bcs.app`**
- Version code `1`, version name `1.0.0`
- Display mode `standalone`, orientation `default`
- Theme colour `#F5F5F7`, background `#F5F5F7`, navigation bar `#F5F5F7`; dark variants (`themeColorDark`, `navigationColorDark` in `twa-manifest.json`) `#000000`
- Icon `https://bcs-academy.pages.dev/assets/icon-512.png`, maskable icon `.../assets/icon-maskable-512.png`
- Splash fade-out 300 ms; notifications **off** (no push yet)
- Play Billing **off**, location delegation **off**
- Signing key: **create new**, path `./android.keystore`, alias `android`

Then:
```bash
grep -n targetSdk app/build.gradle    # must be 36 or higher (Play rule from 31 Aug 2026)
bubblewrap build                       # -> app-release-bundle.aab (upload this) + app-release-signed.apk (sideload tests)
keytool -list -v -keystore android.keystore -alias android | grep SHA256   # upload key fingerprint
```

Later releases: bump `appVersionCode` in `twa-manifest.json`, then `bubblewrap update && bubblewrap build`. Content changes on the website need **no** new app release: the app shows the live site.

### Signing key backup (do this the same day)
Use **Play App Signing** (default for new apps): Google holds the app signing key, and `android.keystore` is only the *upload* key. Losing it means asking Google support for an upload key reset, which takes days. So:
1. Copy `android.keystore`, `twa-manifest.json` and the two passwords into a password manager (e.g. Bitwarden/1Password secure note + attachment).
2. Keep a second copy offline (encrypted USB stick, `zip -e` or `gpg -c android.keystore`).
3. **Never commit** the keystore or passwords to git. Add `bcs-twa/android.keystore` to `.gitignore` if the TWA project goes in this repo.

### Asset links (removes the browser URL bar)
After the first upload, open Play Console > **Test and release > App integrity > App signing**, copy the **App signing key certificate SHA-256**, then:
```bash
bubblewrap fingerprint add <PLAY_APP_SIGNING_SHA256>
bubblewrap fingerprint add <UPLOAD_KEY_SHA256>      # so sideloaded test APKs also verify
bubblewrap fingerprint generateAssetLinks           # writes assetlinks.json
```
Copy the two fingerprints into `further-maths/.well-known/assetlinks.json` (template in the repo), deploy, then check
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://bcs-academy.pages.dev&relation=delegate_permission/common.handle_all_urls`.
If the installed app still shows a URL bar, the fingerprint or package name is wrong. [8]

Alternative: **PWABuilder** (pwabuilder.com > enter the URL > Package for stores > Android) produces the same TWA project and assetlinks file through a web UI, using Bubblewrap internally. Use it if Bubblewrap's JDK/SDK setup fails on the build machine.

---

## 4. Store listing assets

| Asset | Play requirement | Our file |
|---|---|---|
| App icon | 512 x 512, 32-bit PNG, up to 1 MB, full-bleed square (Play rounds the corners itself) | `docs/play-store/assets/play-icon-512.png` (1024 master: `play-icon-1024.png`) — kept out of `further-maths/` so it isn't shipped to every visitor; the feature graphic below doubles as the site's social-share image, which is why it stays in the deployed `assets/` folder |
| Feature graphic | 1024 x 500, JPEG or 24-bit PNG (no transparency) | `further-maths/assets/play-feature.png` |
| Phone screenshots | 2 to 8; PNG or JPEG; each side 320 to 3840 px; 16:9 or 9:16. Use at least 4 at 1080 x 1920 or more to be eligible for promotion | **To make**: 1080 x 1920 portrait of Home, a textbook chapter with maths, a simulation, a practice paper/walkthrough, progress, AI tutor |
| 7-inch tablet screenshots | Optional but recommended, same file rules (e.g. 1200 x 1920) | **To make** |
| 10-inch tablet screenshots | Optional but recommended (e.g. 1600 x 2560 or 2560 x 1600) | **To make** |
| Short description | Up to 80 characters | "Free CCEA A level Maths, Further Maths and Physics guides, practice and tutor." |
| Full description | Up to 4000 characters | Reuse the About page. Include "Independent: not affiliated with or endorsed by CCEA." |

Screenshots: capture with playwright at a 412 x 732 viewport and `deviceScaleFactor` 2.625 (gives 1081 x 1921; crop to 1080 x 1920), in light mode, with the BCS logo visible. Show no CCEA exam material.

App category: **Education**. Tags: Education, Study aids. Contact email is required and is shown publicly. Use a dedicated address, not a personal one.

---

## 5. App content declarations

### Privacy policy (required)
Every app needs a privacy policy URL on a public, non-geofenced web page (not a PDF). Our Data safety answers say we collect personal data, so the policy must name BCS Academy, list what we collect (below), say why, who processes it (Supabase for accounts and storage, Cloudflare for hosting and the chat function, the AI model provider for chat), how long we keep it, and how to delete it.
**Use a plain static page**, e.g. `https://bcs-academy.pages.dev/privacy.html`, not only a `#/privacy` hash route, because reviewers and crawlers may not run JavaScript.

### Account deletion (required because the app has accounts)
- An in-app path to delete the account (Settings > Account > Delete account), **and**
- A web URL where users can request deletion without reinstalling the app (e.g. `https://bcs-academy.pages.dev/delete-account.html`). The Data safety form asks for this URL.

### Data safety form (answers for: accounts with email + display name, synced progress, AI chat)
- Does the app collect or share user data? **Yes, collects.** Shared with third parties: **No** (Supabase, Cloudflare and the AI provider act as service providers for us; Google says transfers to service providers are not "sharing").
- Is all data encrypted in transit? **Yes** (HTTPS only).
- Can users request deletion? **Yes** (in-app and web URL above).
- Data types:

| Category > type | Collected | Optional? | Purpose | Notes |
|---|---|---|---|---|
| Personal info > **Email address** | Yes | Optional (app works without an account) | Account management, App functionality | Sign-in |
| Personal info > **Name** (display name) | Yes | Optional | Account management, App functionality | Shown on reports |
| App activity > **App interactions** (progress, scores, topics done) | Yes | Optional | App functionality, Analytics only if we add analytics | Cloud sync |
| App activity > **Other user-generated content** (questions typed into the AI tutor) | Yes | Optional | App functionality | Sent to the AI provider to answer; say in the policy whether chats are stored, and for how long |
| App info and performance > Crash logs / Diagnostics | Only if we add error logging | | | Otherwise **not collected** |
| Location, contacts, photos, financial, health, device IDs | **Not collected** | | | |

Data processed only on the device (local progress in browser storage) is not "collected" and is not declared.

### Content rating (IARC questionnaire)
Category: **Reference, News, or Educational**. Violence, sex, language, drugs, gambling: **none**. User-generated content / users can interact: **No** user-to-user communication. Answer the questions about AI/generated content honestly (it has an AI chat). Expected rating: **PEGI 3 / Everyone**.

### AI-generated content policy
Google Play's AI-Generated Content policy applies to apps with generative AI chat. The tutor must refuse harmful content and must have an **in-app way to report or flag** an offensive AI answer (e.g. a "Report answer" button that saves the message and reason). Build this before the closed test starts.

### Target audience and content
- Real audience: A level students aged **16 to 18**, plus teachers and parents.
- Select age groups **16-17 and 18+**. **Do not select 13-15 or younger.**
- Families policy implications: the Families policy applies to any app whose target age groups "include children". Google warns that 16-17 *may be considered children in some countries*, and that for users under 21 you must check local law (in the UK, children's data comes under the ICO Age Appropriate Design Code until age 18). In practice:
  - **No ads** (we have none). If ads are ever added, only Families Self-Certified Ads SDKs could be used.
  - No precise location, no device identifiers, data minimisation, high-privacy defaults.
  - Store listing art and wording should be clearly for older students (no cartoon/child imagery), so Google doesn't judge it "appealing to children".
  - Google may still ask for extra review. Allow for this in the countdown.
  - Do **not** opt into the "Teacher Approved" / Kids programme.
- "Appeals to children?" **No.**

### Other App content items
News app: **No**. COVID-19 app: **No**. Government app: **No**. Financial features: **None**. Health: **None**. Ads: **No ads**. App access: if any feature needs sign-in, give reviewers a test account (email + password) under **App access**.

---

## 6. Website checklist before the closed test
- [ ] `manifest.webmanifest`, `sw.js`, icons deployed. Chrome DevTools > Application shows "Installable", no manifest errors.
- [ ] `.well-known/assetlinks.json` with real fingerprints, served as `application/json` at the domain root.
- [ ] `privacy.html` and `delete-account.html` live, linked from the About page footer.
- [ ] Offline launch works (airplane mode after first open): the TWA quality criteria expect the start URL to load offline.
- [ ] "Report answer" in the AI tutor.
- [ ] Sign-in works inside the Android app (Custom Tabs / TWA). Supabase redirect URLs include `https://bcs-academy.pages.dev/*`.

---

## Sources (checked 23 Oct 2026)
1. Google Play Console Help, "Get started with Play Console" / "Required information to create a Play Console developer account": 18+, US$25 fee, ID and card in your legal name, fee not refunded if invalid. https://support.google.com/googleplay/android-developer/answer/6112435 and https://support.google.com/googleplay/android-developer/answer/113468
2. Google Play Console Help, "App testing requirements for new personal developer accounts": 12 testers opted in continuously for 14 days, apply on the Dashboard, questions about the test. https://support.google.com/googleplay/android-developer/answer/14151465
3. Google Play Console Help, "Verify your Play Console developer account" (identity, phone/email OTP, Android device verification with the Play Console app, D-U-N-S for organisations). https://support.google.com/googleplay/android-developer/answer/14177239 and https://support.google.com/googleplay/android-developer/answer/14316361
4. Extendsclass, "Google Play's closed testing requirement: what developers need to know in 2026". https://extendsclass.com/blog/google-plays-closed-testing-requirement-what-developers-need-to-know-in-2026
5. Choicely, "Google Play 12 tester rule" (20 testers reduced to 12 in Dec 2024; organisation accounts exempt). https://www.choicely.com/blog/google-play-12-tester-rule
6. Android Developers, "Meet Google Play's target API level requirement": API 36 for new apps/updates from 31 Aug 2026 (extension to 1 Nov 2026 on request). https://developer.android.com/google/play/requirements/target-sdk
7. Android Authority, "Android sideloading changes timeline" (developer verification from 30 Sep 2026 in BR/ID/SG/TH, worldwide 2027). https://www.androidauthority.com/android-sideloading-changes-timeline-3679204/
8. Google Codelab, "Adding your Progressive Web App to Google Play" (Bubblewrap init/build, Play App Signing fingerprint for assetlinks). https://developers.google.com/codelabs/pwa-in-play
9. Google Play Console Help, "Manage target audience and app content settings" (Families policy applies if any target group includes children; 16-17 may count as children in some countries; check local law for users under 21). https://support.google.com/googleplay/android-developer/answer/9867159

Not re-verified on 23 Oct 2026 (Google's help site could not be fetched directly from the build environment; these come from Play Console Help as last known): screenshot and graphic dimensions, account-deletion URL requirement, the AI-Generated Content reporting requirement, and production-access review time (no official SLA). Check each in Play Console when you fill the forms.
