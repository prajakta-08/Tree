# Tech Reference — Implementation Cookbook

Companion to `HANDOFF.md`. Each section below is a complete recipe: the *what*, the *why this approach*, the *exact files to add or edit*, and the *acceptance test* so you know when it's done.

Numbering matches the punch-list in HANDOFF.md.

---

## §1 — Custom domain `themangoseed.com`

**Time:** ~15 min once registrar credentials exist
**Owner of decision:** Dhruv (purchase) → Tech team (DNS wiring)

### Recommended registrars (cheapest first)
| Registrar | Yr 1 | Renewal | WHOIS privacy |
|---|---|---|---|
| **Cloudflare** | ~$10.44 | $10.44 | Free |
| Porkbun | ~$10 | $11 | Free |
| Namecheap | ~$6–10 promo | $15 | Free first yr |
| GoDaddy | $12–22 | $22+ | Paid |

Pick **Cloudflare** — cheapest over time, zero upsells, free DNS.

### Steps
1. Dhruv buys `themangoseed.com` at Cloudflare.
2. In Vercel dashboard → Project `app` → Settings → Domains → **Add Domain** → `themangoseed.com` AND `www.themangoseed.com`.
3. Vercel will show **2 DNS records** (A or CNAME) — copy them.
4. In Cloudflare DNS panel → add those records exactly. Set Cloudflare proxy to **DNS only** (grey cloud) for the apex if Vercel requests it.
5. Within ~1 min HTTPS auto-provisions. Vercel auto-redirects `www` → apex (or vice versa per your config).
6. Update any hardcoded `themangoseed.vercel.app` references:
   - `src/components/Seo.tsx` → `SITE_URL`
   - `index.html` → all `og:url`, `twitter:image`, canonical
   - `public/sitemap.xml` → all `<loc>`
   - `public/robots.txt` → sitemap pointer
7. Redeploy: `npx vercel --prod`

### Acceptance test
```bash
curl -I https://themangoseed.com           # 200 OK
curl -I https://www.themangoseed.com       # 301 → themangoseed.com (or vv)
nslookup themangoseed.com                  # resolves to Vercel
```

---

## §2 — Email service signup (Brevo recommended)

**Time:** 30 min + DNS propagation
**Why Brevo:** GDPR-native (EU-hosted), generous free tier (300/day), good API, supports both transactional and marketing emails in one platform. Mailchimp/ConvertKit are fine alternatives but pricier.

### Steps
1. Sign up at https://www.brevo.com — use `admin@ziqsy.com` or new `hello@themangoseed.com`.
2. **Authenticate the domain** for sending:
   - Brevo → Senders & IP → Domains → Add domain `themangoseed.com`
   - Brevo shows DKIM, SPF, DMARC records to add to Cloudflare DNS
   - Wait for "Verified" status (~10–60 min)
3. **Create two lists** in Brevo:
   - `Newsletter` (marketing emails)
   - `Contact-form` (form submissions for follow-up)
4. **Get the API key:** Brevo → Account → SMTP & API → API keys → "Generate v3 API key" → copy.
5. **Add it to Vercel env vars** (NOT the repo):
   - Vercel dashboard → Project `app` → Settings → Environment Variables
   - Add `BREVO_API_KEY` = the key, Production + Preview environments

### Acceptance test
- Send a test transactional email via Brevo's "Send a test" UI
- DKIM/SPF/DMARC all green in the domain config

---

## §3 — Newsletter API: `POST /api/newsletter`

**Frontend status:** Form built, fully functional UI, currently fails on POST. See `src/sections/NewsletterSection.tsx` + `src/components/Footer.tsx` + `src/lib/forms.ts`.

### Payload shape (what the frontend sends)

```ts
POST /api/newsletter
Content-Type: application/json

{
  "email": "reader@example.com",
  "source": "home",          // 'home' | 'footer' | other identifiers
  "company": ""              // HONEYPOT — if non-empty, reject silently
}
```

### Expected responses
- Success: `200 { ok: true }`
- Validation error: `400 { error: "Invalid email" }`
- Server error: `500 { error: "..." }`

### Implementation — create file `api/newsletter.ts`

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API = 'https://api.brevo.com/v3';
const NEWSLETTER_LIST_ID = Number(process.env.BREVO_NEWSLETTER_LIST_ID || '0');

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, source = 'unknown', company } = req.body || {};

  // Honeypot — bot fills it; return 200 so they don't retry
  if (company && String(company).trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const brevoRes = await fetch(`${BREVO_API}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: NEWSLETTER_LIST_ID ? [NEWSLETTER_LIST_ID] : [],
        attributes: { SOURCE: source },
        updateEnabled: true,        // upsert if already exists
      }),
    });

    if (!brevoRes.ok) {
      const body = await brevoRes.text();
      console.error('Brevo error', brevoRes.status, body);
      // Don't leak Brevo errors to the client
      return res.status(500).json({ error: 'Could not subscribe right now.' });
    }

    // TODO: trigger double opt-in confirmation email via Brevo Automation
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Network error.' });
  }
}
```

### Required env vars (Vercel dashboard)
| Name | Example | Notes |
|---|---|---|
| `BREVO_API_KEY` | `xkeysib-…` | from §2 |
| `BREVO_NEWSLETTER_LIST_ID` | `2` | Brevo → Contacts → Lists → click list → ID in URL |

### Double opt-in (UK/EU GDPR requirement)
In Brevo → Automation → Templates → "Double opt-in confirmation". When a contact is added via API with `updateEnabled: true`, set this template as the trigger. The user clicks the confirmation link; their `optInStatus` becomes `true`. Only opted-in contacts receive newsletters.

### Acceptance test
```bash
# Should add the email to Brevo list
curl -X POST https://themangoseed.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test+1@example.com","source":"test"}'
# Expect: {"ok":true}

# Honeypot should silently return 200
curl -X POST https://themangoseed.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"bot@example.com","company":"acme"}'
# Expect: {"ok":true} BUT no contact added in Brevo

# Bad email should 400
curl -X POST https://themangoseed.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email"}'
# Expect: 400 {"error":"..."}
```

Then in browser: visit `themangoseed.com`, scroll to newsletter section, submit → "Welcome to the journey" success card appears.

---

## §4 — Contact API: `POST /api/contact`

**Frontend status:** `src/pages/Contact.tsx` form ready, calls `submitContact()` from `src/lib/forms.ts`.

### Payload shape

```ts
POST /api/contact
{
  "name": "Reader Name",
  "email": "reader@example.com",
  "message": "Hello, I'd love to interview you.",
  "company": ""    // honeypot
}
```

### Implementation — `api/contact.ts`

Uses Brevo's transactional email API to forward the message to `hello@themangoseed.com`.

```ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API = 'https://api.brevo.com/v3';
const INBOX = process.env.CONTACT_INBOX || 'hello@themangoseed.com';
const SENDER = process.env.CONTACT_SENDER || 'no-reply@themangoseed.com';

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message, company } = req.body || {};

  // Honeypot
  if (company && String(company).trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message too long.' });
  }

  if (!process.env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set');
    return res.status(500).json({ error: 'Service not configured.' });
  }

  const html = `
    <h2>New message via themangoseed.com</h2>
    <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <hr>
    <p style="white-space:pre-line">${escapeHtml(message)}</p>
  `;

  try {
    const brevoRes = await fetch(`${BREVO_API}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { email: SENDER, name: 'The Mango Seed' },
        to: [{ email: INBOX, name: 'The Mango Seed Inbox' }],
        replyTo: { email, name },          // so you can hit Reply directly
        subject: `Contact form — ${name}`,
        htmlContent: html,
      }),
    });

    if (!brevoRes.ok) {
      const body = await brevoRes.text();
      console.error('Brevo SMTP error', brevoRes.status, body);
      return res.status(500).json({ error: 'Could not send right now.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Network error.' });
  }
}
```

### Required env vars
| Name | Example |
|---|---|
| `BREVO_API_KEY` | (shared with §3) |
| `CONTACT_INBOX` | `hello@themangoseed.com` |
| `CONTACT_SENDER` | `no-reply@themangoseed.com` |

### Acceptance test
Submit the form on `/contact` → email arrives at `hello@themangoseed.com` within 10s, with "Reply" pointing at the user, not no-reply.

---

## §5 — Real Privacy + Terms

**Status:** placeholders at `src/pages/Legal.tsx`.

### Action
Have a solicitor draft real text. Cheap shortcut: use Termly or iubenda generator (~$10/mo) for first-pass GDPR-compliant text, then have a lawyer review only sections that mention payments and IP. Replace the content in `src/pages/Legal.tsx` — the structure (sections array, headings) is already there; just swap the body strings.

### Required disclosures (UK/EU)
- Who you are (controller name + registered address)
- What data you collect (email, name, message, IP via Vercel logs)
- Legal basis (consent for marketing; legitimate interest for security logs)
- How long you keep it (newsletter: until unsubscribe; contact form: 12 months)
- Transfers (Brevo is EU; if using US tools list them)
- Rights (access, rectification, erasure, portability, complain to ICO/DPC)
- Cookies disclosure (link to consent settings)
- Contact for DSAR: `privacy@themangoseed.com`

### Acceptance test
Both `/privacy` and `/terms` render real legal text. Footer links work. Cookie banner links to `/privacy`.

---

## §6 — GA4 + GTM, gated on cookie consent

**Status:** not installed. Frontend is wired to read consent via `window.__cookieConsent` and emits a `cookieConsentChange` event.

### Steps
1. Create GA4 property → get the `G-XXXXXXX` Measurement ID.
2. Create GTM container → get the `GTM-XXXXXXX` Container ID.
3. Add a Vercel env var `VITE_GTM_ID = GTM-XXXXXXX` (the `VITE_` prefix is required so the bundler exposes it).

### Implementation — create `src/lib/analytics.ts`

```ts
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

let loaded = false;

function loadGtm() {
  if (loaded || !GTM_ID || typeof window === 'undefined') return;
  loaded = true;

  // GTM snippet
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);

  // dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const tryLoad = () => {
    if (window.__cookieConsent === 'accepted') loadGtm();
  };

  // 1. If they've already accepted on a previous visit
  tryLoad();

  // 2. Listen for changes (banner click)
  window.addEventListener('cookieConsentChange', (e) => {
    const detail = (e as CustomEvent).detail;
    if (detail === 'accepted') loadGtm();
  });
}

export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (window.__cookieConsent !== 'accepted') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event: name, ...props });
}
```

### Wire it in — edit `src/main.tsx`

```tsx
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'

initAnalytics()

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
)
```

### Track page views — add to `src/components/Layout.tsx` inside the `useEffect` that listens to `location.pathname`:

```tsx
import { trackEvent } from '../lib/analytics'
// ...
useEffect(() => {
  window.scrollTo(0, 0)
  lenisRef.current?.scrollTo(0, { immediate: true })
  ScrollTrigger.refresh()
  trackEvent('page_view', { path: location.pathname })
}, [location.pathname])
```

### Useful events to track
- `page_view` (above)
- `newsletter_submit` — in `NewsletterSection.tsx` after `setStatus('success')`
- `contact_submit` — in `Contact.tsx` similarly
- `preorder_cta_click` — in `Preorder.tsx` on each edition card button
- `currency_change` — in the Currency selector
- `social_click` — on Footer social icons

### Acceptance test
1. Open site in incognito → cookie banner appears → no `dataLayer` in window
2. Click **Accept** → `dataLayer` exists, GTM script loaded, GA4 sees the page view in real-time reports
3. Click **Reject** → no GTM script, `dataLayer` not initialised
4. Refresh after Reject → still no GTM
5. localStorage has `mangoseed.cookieConsent` = `'accepted' | 'rejected'`

---

## §7 — Pre-order checkout (Razorpay India + Stripe rest-of-world)

**Frontend status:** Edition cards built. Each card has a CTA button that currently doesn't link anywhere. See `src/pages/Preorder.tsx` → `editions` array (keys: `ebook`, `paperback`, `hardcover`, `audiobook`).

### Strategy
- **India (INR):** Razorpay — lowest fees in India, supports UPI/cards/netbanking
- **UK/EU/US/AE:** Stripe — best international card support
- Detect by current currency: `INR` → Razorpay, else Stripe
- One server-side order/intent creation per click; client confirms with hosted checkout
- Confirmation webhook → fulfilment + Brevo "Order confirmation" email

### Pre-orders specifically
You're collecting payment now, fulfilling on 13 July 2026.
- **Capture mode:** Authorize-only for cards. Capture on fulfilment day. Reduces refund risk.
- For UPI/wallets: full capture (no auth-only available). Hold funds in escrow account if compliance requires.

### Acceptance criteria (high level)
1. Clicking a card button creates a server-side order with correct currency + amount
2. Hosted checkout opens (Razorpay modal or Stripe hosted page)
3. On success, redirect to `/preorder/success?order_id=…`
4. Webhook hits `/api/webhooks/{razorpay,stripe}` and records the order in DB
5. Brevo sends "Pre-order confirmed" email
6. Order appears in admin dashboard (recommend Vercel KV or Supabase for simplicity)

### Implementation outline

Add `STRIPE_SECRET_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` to Vercel env.

**`api/checkout/stripe.ts`** (sketch):
```ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  const { edition, currency, quantity = 1 } = req.body;
  const price = PRICES[edition][currency]; // server-side price table
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_intent_data: { capture_method: 'manual' }, // auth only
    line_items: [{
      price_data: {
        currency: currency.toLowerCase(),
        product_data: { name: `The Mango Seed — ${edition}` },
        unit_amount: Math.round(price * 100),
      },
      quantity,
    }],
    success_url: 'https://themangoseed.com/preorder/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://themangoseed.com/preorder',
    automatic_tax: { enabled: true }, // configure tax in Stripe dashboard first
  });
  res.json({ url: session.url });
}
```

**`api/checkout/razorpay.ts`** (sketch):
```ts
import Razorpay from 'razorpay';
const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req, res) {
  const { edition, quantity = 1 } = req.body;
  const price = PRICES[edition].INR;
  const order = await rzp.orders.create({
    amount: Math.round(price * 100 * quantity),
    currency: 'INR',
    receipt: `mango-${Date.now()}`,
    payment_capture: 1,
  });
  res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID });
}
```

**Wire the CTA buttons** in `src/pages/Preorder.tsx`:
```tsx
const handlePreorder = async (key: 'ebook' | 'paperback' | 'hardcover' | 'audiobook') => {
  if (currency === 'INR') {
    const r = await fetch('/api/checkout/razorpay', { method: 'POST', body: JSON.stringify({ edition: key }) });
    const { orderId, keyId } = await r.json();
    // load Razorpay checkout.js then:
    new (window as any).Razorpay({
      key: keyId, order_id: orderId, name: 'The Mango Seed', currency: 'INR',
      handler: (resp: any) => { window.location.href = `/preorder/success?order=${resp.razorpay_order_id}`; }
    }).open();
  } else {
    const r = await fetch('/api/checkout/stripe', { method: 'POST', body: JSON.stringify({ edition: key, currency }) });
    const { url } = await r.json();
    window.location.href = url;
  }
};
```

### Webhooks
- Stripe: `/api/webhooks/stripe` — verify with `stripe.webhooks.constructEvent` using `STRIPE_WEBHOOK_SECRET`
- Razorpay: `/api/webhooks/razorpay` — verify with HMAC-SHA256 using `RAZORPAY_WEBHOOK_SECRET`
- Both: write `{ orderId, amount, currency, email, edition, status, createdAt }` to Vercel KV or Supabase
- Then call Brevo to send confirmation email

### Recommended DB
Vercel KV (Redis) for simplicity, or Supabase Postgres if you want SQL + auth + RLS for free. Both Vercel-native.

### Acceptance test (per gateway)
1. Click "Buy paperback" with currency = INR → Razorpay modal opens → pay with test card → redirect to `/preorder/success` → DB has new row → confirmation email arrives at test address
2. Same for currency = USD → Stripe hosted page → success → DB → email
3. Webhook idempotency: replay the same webhook event → no duplicate row, no duplicate email

---

## §8 — Amazon Author Central + ASIN linking

**Why this matters:** Amazon is the single biggest book sales channel. The site must deep-link to the product page on launch day.

### Steps
1. Dhruv sets up Amazon Author Central account: https://author.amazon.com
2. Once the book has an ASIN (Amazon assigns it during the KDP publishing flow), add the ASIN to the site:
   - File: create `src/lib/external-links.ts`
     ```ts
     export const AMAZON = {
       INR: 'https://www.amazon.in/dp/B0XXXXXXXX',
       USD: 'https://www.amazon.com/dp/B0XXXXXXXX',
       GBP: 'https://www.amazon.co.uk/dp/B0XXXXXXXX',
       AED: 'https://www.amazon.ae/dp/B0XXXXXXXX',
     } as const
     export const GOODREADS = 'https://www.goodreads.com/book/show/…'
     ```
3. Add "Buy on Amazon" buttons on each edition card in `src/pages/Preorder.tsx`, picking the URL based on `currency`. Track clicks via `trackEvent('amazon_click', { currency, edition })`.
4. Add Amazon affiliate tags (`?tag=themangoseed-21` for IN, `themangoseed-20` for US, etc.) — apply to Amazon Associates accounts in each region first.

### Acceptance test
- Each "Buy on Amazon" button opens the correct regional store
- Affiliate tag is in the URL
- GA4 event `amazon_click` fires (after cookie consent)

---

## §9 — Backups

**What to back up:**
- Newsletter subscriber list (Brevo exports daily CSV → S3)
- Contact form submissions (forwarded by email already; also store in DB if you do §7)
- Order records (DB from §7)
- The repo itself — push to GitHub if not already

### Recommended
- **Brevo daily export:** Brevo → Contacts → Export → schedule weekly CSV email to `admin@ziqsy.com`
- **Vercel KV / Supabase backups:** both have built-in PITR or daily snapshots — enable them
- **Repo backup:** GitHub mirror

---

## §10 — Monitoring + uptime

### Minimal setup
1. **Vercel Analytics** — free in dashboard, gives real-user metrics (LCP, CLS, FID per route)
2. **Vercel Speed Insights** — install one npm package, get Core Web Vitals live:
   ```bash
   npm install @vercel/speed-insights
   ```
   Then in `main.tsx`:
   ```tsx
   import { SpeedInsights } from '@vercel/speed-insights/react'
   // ...
   <HelmetProvider>
     <BrowserRouter>
       <App />
       <SpeedInsights />
     </BrowserRouter>
   </HelmetProvider>
   ```
3. **Sentry** — free tier 5k errors/mo, catches client + server errors:
   ```bash
   npm install @sentry/react
   ```
   Init early in `main.tsx`:
   ```tsx
   import * as Sentry from '@sentry/react'
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     tracesSampleRate: 0.1,
   })
   ```
   Add `VITE_SENTRY_DSN` to Vercel env.
4. **Uptime ping** — UptimeRobot free → checks `https://themangoseed.com` every 5 min → email/SMS if down

### Acceptance
- Open Vercel Analytics → see real visits
- Force a `throw new Error('test')` somewhere → see it in Sentry within ~30s
- UptimeRobot shows green check

---

## §11 — CRM connection

**Recommended:** Skip a separate CRM at launch. Brevo's free tier includes basic contact-management (segments, tags, automation). For Phase 1, segment Brevo lists by tag:
- `pre-orderer` (from §7 webhook)
- `engaged-reader` (opened 3+ newsletters)
- `vip` (manual tag for journalists, etc.)

Run nurturing automations in Brevo (welcome series, launch countdown, "you might also like…" post-launch).

If you outgrow it, migrate to HubSpot or ActiveCampaign — but not before launch.

---

## §12 — Future enhancements (post-launch)

These are flagged in the original roadmap. Pick up after launch is stable:
- Reader membership portal (Stripe subscriptions + gated content)
- Discussion forum (Discourse hosted, or Circle)
- AI chatbot — answers questions about the book using the book PDF as context (RAG with Pinecone + Claude/OpenAI)
- Merch (Printify + Shopify Lite)
- More titles by Dhruv as they're written

---

## Appendix A — Environment variables reference

Set in **Vercel dashboard → Project → Settings → Environment Variables**. Mark for Production + Preview (skip Development unless local dev needs them).

| Variable | Section | Description |
|---|---|---|
| `BREVO_API_KEY` | §2, §3, §4 | Brevo v3 API key |
| `BREVO_NEWSLETTER_LIST_ID` | §3 | Newsletter list numeric ID |
| `CONTACT_INBOX` | §4 | `hello@themangoseed.com` |
| `CONTACT_SENDER` | §4 | `no-reply@themangoseed.com` |
| `VITE_GTM_ID` | §6 | GTM Container ID (note `VITE_` prefix — exposes to client bundle) |
| `STRIPE_SECRET_KEY` | §7 | Stripe live key |
| `STRIPE_WEBHOOK_SECRET` | §7 | Stripe webhook signing secret |
| `RAZORPAY_KEY_ID` | §7 | Razorpay live key |
| `RAZORPAY_KEY_SECRET` | §7 | Razorpay live secret |
| `RAZORPAY_WEBHOOK_SECRET` | §7 | Razorpay webhook secret |
| `VITE_SENTRY_DSN` | §10 | Sentry DSN |

⚠️ **Never commit any of these to the repo.** `.env*` files should be in `.gitignore` already.

---

## Appendix B — Frontend ↔ backend contracts (machine-readable)

### POST /api/newsletter
```json
// Request
{ "email": "string", "source": "string?", "company": "string? (honeypot)" }
// Success
200 { "ok": true }
// Validation
400 { "error": "human-readable message" }
// Server error
500 { "error": "human-readable message" }
```

### POST /api/contact
```json
// Request
{ "name": "string", "email": "string", "message": "string", "company": "string? (honeypot)" }
// Success
200 { "ok": true }
// Validation
400 { "error": "human-readable message" }
// Server error
500 { "error": "human-readable message" }
```

The frontend helpers `submitNewsletter` and `submitContact` in `src/lib/forms.ts` already match this contract — if you change response shape, update those helpers.

---

## Appendix C — Lighthouse / SEO checklist

Before launch run https://pagespeed.web.dev/ on `https://themangoseed.com` and confirm:
- [ ] Performance ≥ 85 (mobile), ≥ 95 (desktop)
- [ ] Accessibility ≥ 95
- [ ] Best Practices = 100
- [ ] SEO = 100
- [ ] All meta tags valid in https://www.opengraph.xyz/
- [ ] Twitter card valid in https://cards-dev.twitter.com/validator
- [ ] Rich results in https://search.google.com/test/rich-results
- [ ] Sitemap submitted to https://search.google.com/search-console
- [ ] Sitemap submitted to https://www.bing.com/webmasters

---

## Appendix D — Launch-day runbook

T-7 days:
- [ ] Final content review (Dhruv signs off all pages)
- [ ] Real Privacy + Terms live
- [ ] Pre-order endpoint smoke-tested in production
- [ ] Brevo automations tested with real test addresses
- [ ] DNS final, no `themangoseed.vercel.app` references remaining
- [ ] Vercel Analytics + Sentry monitoring active
- [ ] Backups verified by doing a test restore

T-1 day:
- [ ] Submit sitemap to Google + Bing
- [ ] Final UptimeRobot check
- [ ] Slack/Discord war room set up
- [ ] Dhruv has on-call number

Launch day (13 July 2026):
- [ ] Flip pre-order CTAs from "Pre-order" to "Buy now"
- [ ] Update `bookSchema.datePublished` if changed
- [ ] Push social posts (pre-scheduled)
- [ ] Monitor Sentry + Vercel Analytics for 4 hours minimum

---

End of reference. Questions → `admin@ziqsy.com`.
