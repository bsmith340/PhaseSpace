# Online tutor: owner setup

The "Ask" tutor (`further-maths/js/chat.js`, `css/chat.css`) talks to a Cloudflare Pages Function, `functions/api/chat.js`, which calls the Anthropic Messages API and streams the answer back. Until the steps below are done, the button shows a calm "not connected yet" notice and points physics students to the offline tutor (`#/physics/tutor`). The rest of the site is unaffected.

The Pages project root must be the repository root (so Pages finds `functions/`), with build output directory `further-maths`.

## 1. Get an Anthropic API key

1. Sign in at <https://platform.claude.com> (create an organisation if asked, and add a payment method under **Billing**).
2. **Settings → API keys → Create key**. Name it `bcs-academy-pages`. Copy it once; it is not shown again.
3. Never put the key in the repository, `js/config.js` or any browser code.

## 2. Add the key as an encrypted Pages secret

Cloudflare dashboard → **Workers & Pages → (your Pages project) → Settings → Variables and secrets**:

| Name | Type | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | **Secret** (encrypted) | the key from step 1 |
| `ALLOWED_ORIGINS` | Text | e.g. `https://bcs-academy.pages.dev,https://*.bcs-academy.pages.dev,https://www.yourdomain.org` |
| `CHAT_MODEL` | Text, optional | default `claude-haiku-5-5`; e.g. `claude-sonnet-5-5` for stronger but ~20× dearer answers |
| `CHAT_EFFORT` | Text, optional | `low`, `medium` (default) or `high`: how hard the model thinks |
| `LIMIT_ANON` | Text, optional | questions per day per network (IP) for guests, default `40` |
| `LIMIT_USER` | Text, optional | questions per day per signed-in student, default `150` |
| `LIMIT_IP_MAX` | Text, optional | ceiling per network for signed-in traffic, default `1000` (schools share one IP) |
| `LIMIT_GLOBAL` | Text, optional | hard site-wide cap per day, e.g. `5000`: a cost circuit-breaker |
| `SUPABASE_URL` | Text, optional | `https://<project>.supabase.co`: lets signed-in students get the user limit |
| `SUPABASE_JWT_SECRET` | **Secret**, optional | Supabase → Project Settings → API → JWT secret (only for projects still on the legacy HS256 secret; projects on the new asymmetric signing keys need only `SUPABASE_URL`, the function reads the public JWKS) |

Set them for **Production** (and **Preview** if you want previews to work), then redeploy (Deployments → ⋯ → Retry deployment). `js/config.js` already has `chatEndpoint: '/api/chat'`.

Without `SUPABASE_*` every student is treated as a guest. A token that fails verification gets a 401 asking the student to sign in again.

## 3. Create and bind the KV namespace (rate limits)

1. **Workers & Pages → KV → Create namespace**, name `bcs-chat-limits`.
2. Pages project → **Settings → Bindings → Add → KV namespace**: variable name **`CHAT_KV`**, namespace `bcs-chat-limits`. Do it for Production and Preview.
3. Redeploy.

Keys look like `ip:<ip>:<YYYY-MM-DD>`, `u:<user-id>:<date>`, `g:<date>` and expire the next day. Limits reset at midnight UTC. If `CHAT_KV` is missing, no per-user limits are enforced (the function still works), so the Anthropic spend limit below is your only cap: bind it before going public.

KV free tier allows 1,000 writes a day; each question writes 1–3 keys, so above roughly 300–500 questions a day you need the Workers Paid plan ($5/month, includes 1M writes/month).

## 4. Set spend limits in the Anthropic console

**platform.claude.com → Settings → Limits**: set a monthly **spend limit** (for example $25 to start) and an email **notification** at 50 % and 80 %. When the limit is hit, the API refuses requests; students see "The tutor is very busy right now", and nothing else on the site breaks. Also consider a separate workspace for this key so its spend is reported on its own.

## 5. Check it works

```sh
curl -N https://bcs-academy.pages.dev/api/chat \
  -H 'Content-Type: application/json' -H 'Origin: https://bcs-academy.pages.dev' \
  -d '{"messages":[{"role":"user","content":"Explain the chain rule in two lines"}],"context":{"unit":"m3"}}'
```

You should see `event: delta` lines then `event: done`. `503 {"code":"no_key"}` means the secret is missing; `403` means the origin is not in `ALLOWED_ORIGINS`.

## Cost estimate

Price for `claude-haiku-5-5` (Anthropic list price, prompts up to 100K tokens, which every tutor request is): **$0.10 per million input tokens, $0.50 per million output tokens** (Claude API price list as of October 2026; check the pricing page before relying on it).

Assumptions per question: about 4,500 input tokens (system prompt about 1,000, page context up to 6,000 characters ≈ 1,500, recent chat history about 2,000) and about 1,000 output tokens (about 350 words of answer plus the model's internal thinking, which is billed as output). That is about **$0.00045 + $0.00050 ≈ $0.001 per question**. Each student asks 5 questions a day, every day, for 30 days.

| Daily active students | Questions / month | Anthropic cost / month |
|---|---|---|
| 100 | 15,000 | **≈ $15** |
| 1,000 | 150,000 | **≈ $145** |

Worst case if every student used the full guest limit of 40 a day: 100 students ≈ $115/month, 1,000 ≈ $1,150/month: that is what `LIMIT_GLOBAL` and the console spend limit protect against. Cloudflare costs are $0 on the free tier at 100 students and $5/month (Workers Paid, for KV writes) at 1,000. Switching `CHAT_MODEL` to `claude-sonnet-5-5` ($2 / $10 per million) multiplies the Anthropic figures by about 20.

## Safety and data protection (DfE generative AI product safety expectations, ICO Children's Code)

- **Hint-first.** The system prompt makes the tutor give hints, next steps and understanding checks on questions the student is working on, rather than final answers; concepts and worked examples can be explained in full. "Stuck? Get a hint" is the first suggestion.
- **Wellbeing.** The prompt tells the model to stop tutoring and signpost help if a message suggests self-harm, abuse or crisis. Separately, a simple keyword check on the newest message (in the function, and the same list in the browser so it works offline) adds a fixed card with Childline 0800 1111, Samaritans 116 123, NHS 111 / 999 and "a trusted adult or teacher". The list is deliberately broad: a false positive only shows a help card.
- **No persona or nudges.** The tutor is described as an AI, told not to claim feelings or a relationship, and not to flatter, upsell or push the student to keep chatting. The sheet always shows "AI can make mistakes — check with your notes or teacher".
- **Honest limits and breaks.** The remaining daily allowance is shown under the chat (from `X-Chat-Remaining` / `X-Chat-Limit` headers) and the limit message says exactly what the limit is. After about 45 minutes of tutor use in a browser session a gentle break note appears once.
- **Data minimisation.**
  - Chat history is stored only in the student's browser (`localStorage` key `bcs-chat-v1`, newest 40 messages). "Clear chat" deletes it.
  - The function keeps no conversation store, writes no message content to KV, and logs only the upstream HTTP status and error type, never message text. KV holds only daily counters keyed by IP address or Supabase user id, and they expire after a day.
  - Requests are sent to Anthropic to generate the answer. Under Anthropic's commercial terms, API inputs and outputs are not used to train models and are kept only for a limited period for safety monitoring (check Anthropic's current data-retention terms). Ask Anthropic about zero-data-retention if your schools need it.
  - Only the current page's visible text, its route and title are sent as context. No name, email or progress data is sent.
  - Do not turn on Cloudflare Logpush or request-body logging for `/api/chat`. Mention the tutor and Anthropic as a processor in the site's privacy notice.
