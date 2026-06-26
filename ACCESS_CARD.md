# The Mango Seed — Tech Team Access Card

> **Single source of truth for everything a tech team needs to start work.**
> Share this card. Everything they need is below or linked from it.

---

## 1. The project, in one paragraph

The Mango Seed is the marketing site for Dhruv Jain's debut novel, launching **13 July 2026**. The site is **live and functional** at `https://themangoseed.vercel.app`. The frontend is complete (SEO, OG cards, JSON-LD, all 9 routes, currency selector, cookie banner, forms with honeypots, etc.). What remains is **server integrations** (newsletter API, contact API, payments), **third-party account setup** (Brevo, Razorpay, Stripe, GA4), **domain purchase** (`themangoseed.com`), and **content finalisation** (real Privacy/Terms). Full work breakdown in `HANDOFF.md` and `TECH_REFERENCE.md`.

---

## 2. 📂 Code repository

| Item | Detail |
|---|---|
| Currently lives at | `C:\Users\dhruv\OneDrive - TECHNICOLOGYLTD\Apps\Claude_Code\Kimi_Agent_Book Launch Marketing Blueprint\app` (local only) |
| **Action needed** | Push to GitHub before sharing — see §10 below |
| Recommended repo URL | `https://github.com/ceo734/themangoseed` (private) |
| Branching model | `main` = production. PRs reviewed before merge. |
| Tech stack | Vite + React 19 + TypeScript + Tailwind v3 + react-router v7 + framer-motion + gsap |
| Package manager | npm |
| Node version | 22.x (Vercel default) |

### How tech team gets access (once on GitHub)
1. Send them their GitHub username
2. Repo → Settings → Collaborators → invite as **Write** access (not Admin)
3. They accept the email, clone:
   ```bash
   git clone https://github.com/ceo734/themangoseed.git
   cd themangoseed
   npm install
   npm run dev   # http://localhost:3000
   ```

---

## 3. 🌐 Live deployment

| Item | Detail |
|---|---|
| Production URL | https://themangoseed.vercel.app |
| Custom domain | `themangoseed.com` — **NOT YET PURCHASED** (action item) |
| Hosting | Vercel |
| Vercel account | `ziqsy` (org/team scope) |
| Vercel project | `app` (full path: `ziqsy/app`) |
| Deployment protection | OFF (public) |
| SPA routing | `vercel.json` rewrites `/*` → `/index.html` |

### How tech team gets Vercel access
1. Dhruv logs in to https://vercel.com/ziqsy
2. **Settings → Members → Invite Member**
3. Enter their email, role: **Member** (can deploy; cannot delete project)
4. They accept the invite email, run `npx vercel login` then `npx vercel link` from the repo root

---

## 4. 🪪 Account ownership matrix

| Account | Status | Owner | Where to access | Notes |
|---|---|---|---|---|
| **GitHub** | ✅ exists | Dhruv (`ceo734`) | github.com | Repo to be created — see §10 |
| **Vercel** | ✅ exists | Dhruv (`ziqsy` scope) | vercel.com/ziqsy | Invite tech team as Member |
| **OneDrive (current code)** | ✅ exists | Dhruv | onedrive.live.com | Stop using this once GitHub is up |
| **Domain registrar** | ❌ to create | Dhruv | Cloudflare recommended (~$10/yr) | See TECH_REFERENCE §1 |
| **Brevo** (email service) | ❌ to create | Dhruv (signup) → Tech (API key) | brevo.com | Free tier 300/day. See TECH_REFERENCE §2 |
| **Razorpay** (India payments) | ❌ to create | Dhruv (KYC) → Tech (keys) | razorpay.com | Needs Indian bank acct + KYC |
| **Stripe** (intl payments) | ❌ to create | Dhruv (KYC) → Tech (keys) | stripe.com | Needs UK/UAE/Ireland bank acct |
| **Google Analytics 4** | ❌ to create | Dhruv (creates property) → Tech (Measurement ID) | analytics.google.com | Use a Google account you control long-term |
| **Google Tag Manager** | ❌ to create | Dhruv → Tech | tagmanager.google.com | Same Google account |
| **Google Search Console** | ❌ to create | Dhruv | search.google.com/search-console | Verify via Cloudflare DNS TXT after §1 |
| **Sentry** (error tracking) | ❌ to create | Tech team | sentry.io | Free tier 5k errors/mo |
| **UptimeRobot** | ❌ to create | Tech team | uptimerobot.com | Free for 50 monitors |
| **Amazon KDP + Author Central** | ❌ to create | Dhruv | kdp.amazon.com | Required for book ASIN |
| **Goodreads Author Program** | ❌ to create | Dhruv | goodreads.com/author/program | After Amazon listing exists |

> **Rule of thumb:** Dhruv signs up for every account (so HE owns billing + identity), then grants the tech team **operator/developer** seats. Never let a contractor own a root account.

---

## 5. 📄 Documents to share with tech team

Send these 3 files together (they reference each other):

| File | Purpose |
|---|---|
| `app/HANDOFF.md` | **Read first.** Punch list of work, priorities, hard constraints, 10 open assumptions |
| `app/TECH_REFERENCE.md` | Implementation cookbook — copy-paste code for every task |
| `app/ACCESS_CARD.md` | **This file.** Single source for repo, deployment, and account access |

Plus the `tracesteps.txt` file (audit trail of work done so far — useful if they want to understand history).

---

## 6. 📧 Email aliases to create (on `themangoseed.com` domain)

Create these once the domain is bought + email is set up (Brevo or Google Workspace):

| Alias | Used for | Visible on site? |
|---|---|---|
| `hello@themangoseed.com` | Contact form sink, general enquiries | Yes (`/contact`, footer) |
| `press@themangoseed.com` | Press kit page | Yes (`/press`) |
| `privacy@themangoseed.com` | GDPR requests | Yes (`/privacy`) |
| `no-reply@themangoseed.com` | Outbound sender (forms, transactional) | No |
| `admin@themangoseed.com` | Owner/superuser mailbox (forwards to Dhruv) | No |

Cheapest setup: forwarding aliases via Cloudflare Email Routing (FREE, forwards to one real mailbox). Upgrade to Google Workspace (~$6/user/mo) if you need real inboxes.

---

## 7. ❓ 10 open assumptions (decide BEFORE tech team starts)

These block real work. Confirm or correct each:

1. **Social handles** — Instagram `@themangoseed`, X `@TheMangoSeed`, LinkedIn slug `dhruvjain`, YouTube `@themangoseed` → ✅ / ✏️ / ⛔
2. **Email aliases** — list in §6 → approved? ✅ / ✏️
3. **Pricing** — Paperback $16.99 / £13.99 / AED 62 / ₹599 (other tiers in HANDOFF.md) → ✅ / ✏️
4. **ISBN** — once minted, paste here: `___________________`
5. **Publisher name** — currently placeholder. Final: `___________________`
6. **Page count** — currently 384. Final: `_____`
7. **Final cover artwork** — using `public/book-cover-mockup.jpg` for now. Replace with: `___________________`
8. **Book trailer file** — current placeholder `public/hero-tree-breeze.mp4`. Final: `___________________`
9. **Audiobook sample preview** — file path: `___________________`
10. **Goodreads URL** — once author profile is up: `___________________`

---

## 8. 🚨 Hard rules for tech team (do NOT violate)

- ❌ No CMS migration (WordPress/Strapi/Sanity) before launch. Post-launch only.
- ❌ No analytics/tracking scripts loaded until cookie consent is `'accepted'`. See `window.__cookieConsent` pattern in TECH_REFERENCE §6.
- ❌ No reverting to HashRouter. URLs must stay clean.
- ❌ No client-side payment processing (Stripe/Razorpay keys go server-only).
- ❌ Don't commit `.env*` files or any API keys.
- ❌ Don't push to `main` directly — PR review required.
- ✅ All env vars set in Vercel dashboard (Production + Preview environments).
- ✅ All new endpoints under `/api/*` (Vercel automatically routes serverless functions there).

---

## 9. 📞 Escalation + contacts

| Issue | Contact |
|---|---|
| Anything site-related | Dhruv Jain — `admin@ziqsy.com` |
| Vercel billing/account | Dhruv (account owner) |
| Domain registrar | Whoever sets it up (Dhruv) |
| Brevo / Stripe / Razorpay billing | Dhruv |
| Code-level questions | The PR reviewer (see GitHub) |

---

## 10. ⚡ Pre-share checklist (DO THIS BEFORE SHARING)

Before sending this card to anyone external:

- [ ] **Push code to GitHub** (Claude can do this — say "push to GitHub")
- [ ] **Invite tech team as Vercel Member** (3 clicks in vercel.com/ziqsy)
- [ ] **Buy domain** OR decide who buys it (Dhruv recommended)
- [ ] **Decide on Brevo vs alternatives** — recommended Brevo (TECH_REFERENCE §2)
- [ ] **Confirm 10 open assumptions in §7**
- [ ] **Choose tech team contact** for code review / merge approval
- [ ] (Optional but recommended) Create a private Slack/WhatsApp channel for fast questions

---

## 11. 📨 Suggested handover email

```
Subject: The Mango Seed website — handover & access

Hi [team],

Thanks for picking this up. The marketing site for my novel "The Mango Seed"
(launching 13 July 2026) is live at https://themangoseed.vercel.app —
the frontend is complete, and what's left is server-side integration,
third-party accounts, and content finalisation.

Three documents in the repo, please read in order:

  1. ACCESS_CARD.md   — this card, all access & account details
  2. HANDOFF.md       — prioritised work list and what's already shipped
  3. TECH_REFERENCE.md — implementation cookbook (copy-paste code per task)

Repo: https://github.com/ceo734/themangoseed
You'll receive a collaborator invite shortly.

Vercel project: ziqsy/app — you'll get a Member invite to deploy.

Before starting work, please confirm or correct the 10 open assumptions
in HANDOFF.md (§ "Open assumptions for Dhruv"). Those decisions affect copy,
schema, and links across the site.

Priority order: P0 items first (custom domain, Brevo, newsletter API,
contact API). Everything else can run in parallel after that.

Direct line for anything: admin@ziqsy.com

Looking forward to working together.

— Dhruv
```

---

End of access card.
