# The Mango Seed — Tech Team Handoff

**Project:** Marketing site for *The Mango Seed* by Dhruv Jain
**Stack:** Vite + React + TypeScript + Tailwind, deployed on Vercel
**Live:** https://themangoseed.vercel.app
**Launch date:** 13 July 2026 (hard deadline)
**Code:** `C:\Users\dhruv\OneDrive - TECHNICOLOGYLTD\Apps\Claude_Code\Kimi_Agent_Book Launch Marketing Blueprint\app`

---

## 📌 TL;DR — Your punch list

Everything in the **frontend is done**. The site is live, indexed, social-share-ready, accessible, and code-split. What's left is **server integrations**, **third-party accounts/keys**, **content placeholders**, and **launch-day plumbing**. The TECH_REFERENCE.md companion file has copy-paste code for each item below.

Priority order — work top to bottom:

| P | Task | Why now | See ref |
|---|---|---|---|
| 🔴 P0 | **Custom domain** `themangoseed.com` → Vercel | Everything else assumes the canonical URL | §1 |
| 🔴 P0 | **Email service signup** (Brevo recommended) + DNS verification | Blocker for newsletter & contact form | §2 |
| 🔴 P0 | **Newsletter API** `/api/newsletter` (Vercel serverless function) | Form is built; just needs the endpoint | §3 |
| 🔴 P0 | **Contact API** `/api/contact` (Vercel serverless function) | Same | §4 |
| 🟠 P1 | **Real Privacy + Terms** content (replace placeholders) | Legal requirement before collecting emails | §5 |
| 🟠 P1 | **GA4 + GTM** install, gated on cookie consent | Measurement before launch traffic arrives | §6 |
| 🟠 P1 | **Pre-order checkout** wiring (Razorpay India + Stripe rest-of-world) | Whole site funnels here | §7 |
| 🟠 P1 | **Amazon Author Central** + pre-order ASIN link on `/preorder` | The biggest single sales channel | §8 |
| 🟡 P2 | **Backups** (daily DB + form data export) | Compliance + insurance | §9 |
| 🟡 P2 | **Monitoring + uptime** (Vercel Analytics + Sentry) | Catch errors before customers do | §10 |
| 🟡 P2 | **CRM connection** — pipe form submissions into HubSpot / Brevo CRM | Audience nurturing post-launch | §11 |
| 🟢 P3 | **Future enhancements** — chatbot, membership portal, merch | Post-launch, see roadmap | — |

---

## 🔐 Open assumptions for Dhruv to confirm

Block these by the next standup — they affect copy, schema, and links across the site:

1. **Social handles** — confirm or correct:
   - Instagram `@themangoseed`
   - X `@TheMangoSeed`
   - LinkedIn `dhruvjain` (the public URL slug)
   - YouTube `@themangoseed`
   - Patch in: `src/components/Footer.tsx`, `src/pages/Author.tsx`
2. **Email aliases on `themangoseed.com`** — to create when domain is bought:
   - `hello@themangoseed.com` (contact form sink)
   - `press@themangoseed.com` (press kit page)
   - `privacy@themangoseed.com` (GDPR requests)
3. **Pricing confirmation** — see `src/pages/Preorder.tsx` → `editions` array. Currently:
   - E-Book: $7.99 / £6.99 / AED 29 / ₹349
   - Paperback: $16.99 / £13.99 / AED 62 / ₹599
   - Hardcover: $29.99 / £23.99 / AED 110 / ₹1,199
   - Audiobook: $14.99 / £12.99 / AED 55 / ₹499
4. **ISBN** once minted by publisher — patch into `src/lib/seo-schemas.ts` (`bookSchema.workExample[*].isbn`)
5. **Publisher name** — currently "[To be announced]" in `src/pages/Contact.tsx` and `src/pages/Preorder.tsx`
6. **Final page count** — currently 384 (in book schema and preorder bonus list)
7. **Final cover artwork** — replace `public/book-cover-mockup.jpg` if different from current
8. **YouTube book trailer** — currently `public/hero-tree-breeze.mp4` and `public/book-trailer.mp4`. Final asset?
9. **Audiobook sample** — file path/URL for the sample preview
10. **Goodreads** — set up author profile so we can deep-link

---

## ✅ Already shipped (do not redo)

So you don't waste time re-implementing what's done:

- **SEO**: per-route `<title>`, meta description, canonical URL, Open Graph + Twitter cards. See `src/components/Seo.tsx` and per-page usage.
- **JSON-LD**: Book, Person, Organization, WebSite schemas in `src/lib/seo-schemas.ts`.
- **Favicon set** + PWA manifest (`public/site.webmanifest`, `public/icon-*.png`, `public/favicon.ico`)
- **OG image** generated at `public/og-image.jpg` (1200×630, cover + tagline)
- **`robots.txt` + `sitemap.xml`** at `public/`
- **Routing**: BrowserRouter with `vercel.json` SPA rewrite. URLs are clean (`/preorder`, not `/#/preorder`).
- **Pages**: Home, Book, Author, Excerpts, Preorder, Press, Contact, Privacy, Terms, 404 — all live and styled.
- **Code-splitting**: `React.lazy` per route. Main chunk ~600KB → routes lazy-load.
- **Accessibility**: skip-to-content link, `:focus-visible` rings, aria-labels on icon buttons, honeypots on forms.
- **Cookie consent banner** at `src/components/CookieConsent.tsx`. Choice persisted to `localStorage["mangoseed.cookieConsent"]` and set on `window.__cookieConsent` ('accepted' | 'rejected'). Fires `window.dispatchEvent(new CustomEvent('cookieConsentChange'))` when chosen.
- **Forms** (UI only — server endpoints needed): newsletter form on Home, footer mini-form, contact form. All include honeypot, validation, loading/success/error states. See `src/lib/forms.ts` for shared helpers.
- **Currency selector** on `/preorder` with localStorage persistence and locale auto-detect (USD/GBP/AED/INR).
- **100 books** from the book's Appendix A in `src/lib/books-data.ts` (shared between `/book` and homepage `BooksSection`).
- **20 Core Laws** restyled (Playfair Display typography, gold display numerals).
- **Verbatim Chapter 1 + Chapter 6** excerpts (sourced from manuscript).
- **404 page** with branded copy.

---

## 🧭 Where to start: 30-minute onboarding

1. Clone/pull the repo (path above).
2. `npm install`
3. `npm run dev` → http://localhost:3000 — explore every page.
4. Open `HANDOFF.md` (this file) and `TECH_REFERENCE.md` side-by-side.
5. Read `vercel.json` and `package.json` — note Vite + react-helmet-async + react-router-dom v7.
6. `npm run build && npx tsc -b --noEmit` — confirm clean baseline.
7. `npx vercel login` then `npx vercel link` to connect to the existing project (`ziqsy/app`).
8. Start at §3 (Newsletter API) — that unblocks the most.

---

## 📦 Build, test, deploy

```bash
npm install
npm run dev           # http://localhost:3000
npm run build         # → dist/
npx tsc -b --noEmit   # type-check
npx vercel --prod     # deploy
npx vercel alias set <new-deployment-url> themangoseed.vercel.app
```

Vercel project: `ziqsy/app`. Production alias: `themangoseed.vercel.app`.
Deployment Protection is **off** (public). Keep it off after deploys.

---

## 📁 File map

```
app/
├── HANDOFF.md              ← this file
├── TECH_REFERENCE.md       ← copy-paste code for each P0/P1 task
├── tracesteps.txt          ← execution audit trail (do not delete)
├── vercel.json             ← SPA rewrite
├── package.json
├── index.html              ← static meta + OG fallback
├── public/
│   ├── og-image.jpg, favicon.ico, icon-*.png, site.webmanifest
│   ├── robots.txt, sitemap.xml
│   ├── author-dhruv.jpg, book-cover-mockup.jpg, book-trailer.mp4
│   └── (other section images)
└── src/
    ├── App.tsx             ← routes (lazy-loaded)
    ├── main.tsx            ← BrowserRouter + HelmetProvider
    ├── index.css           ← design tokens + focus rings
    ├── components/
    │   ├── Layout.tsx      ← navbar/footer/cookie banner/skip-link
    │   ├── Navbar.tsx
    │   ├── Footer.tsx      ← incl. mini newsletter form
    │   ├── Seo.tsx         ← per-route Helmet wrapper
    │   ├── CookieConsent.tsx
    │   └── (others)
    ├── lib/
    │   ├── forms.ts        ← validateNewsletter, submitNewsletter, validateContact, submitContact
    │   ├── books-data.ts   ← 100 books from Appendix A
    │   ├── seo-schemas.ts  ← JSON-LD payloads
    │   └── utils.ts
    ├── pages/
    │   ├── Home.tsx
    │   ├── Book.tsx        ← 100 books + 20 Core Laws + testimonials
    │   ├── Author.tsx
    │   ├── Excerpts.tsx    ← Ch 1 + Ch 6 verbatim
    │   ├── Preorder.tsx    ← currency selector + 4 editions
    │   ├── Press.tsx
    │   ├── Contact.tsx
    │   ├── Legal.tsx       ← Privacy + Terms (placeholders)
    │   └── NotFound.tsx
    └── sections/           ← homepage + book-page sections
```

---

## 🚨 Hard constraints

- **No lock-in to a CMS pre-launch.** The roadmap mentions WordPress/Strapi/Sanity migration. **Hold this until post-launch.** Migrating now adds 6+ weeks of risk for zero launch-day benefit. Dhruv's content lives in code; we edit and ship.
- **No hash routing.** We migrated from HashRouter → BrowserRouter for SEO. Don't switch back.
- **No analytics until cookie consent.** GA4/GTM scripts must check `window.__cookieConsent === 'accepted'`. Code pattern in TECH_REFERENCE §6.
- **No client-side payment processing.** All payment flows must use server-side intent/order creation + webhook confirmation.
- **No real user data without GDPR-compliant storage.** EU/UK users will hit this site. Newsletter signup is opt-in only; document data retention.

---

## 📞 Escalation

- **Site down / DNS broken:** check Vercel deployment status, then domain registrar DNS.
- **Form spam:** the honeypot field is `company`. If filled, ignore the submission silently (return 200).
- **Content errors:** see `tracesteps.txt` for the audit trail of content corrections done so far. The book PDF at `C:\Users\dhruv\OneDrive - TECHNICOLOGYLTD\Apps\Claude_Code\The mango seed\out\202604222054-STANDARD-the-mango-seed\the-mango-seed-STANDARD.pdf` is the source of truth.
- **Dhruv directly:** admin@ziqsy.com
