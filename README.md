# Papyrus360 — papyrus360.com

Public marketing site for **Papyrus360**, the brand of **Netique Infotech Pvt Ltd.** — providing 360-degree services to the Indian paper industry: software products and consultancy.

Founded by domain experts with **35+ years of paper industry experience**. Company incorporated 2002 (CIN: U72200TN2002PTC049220).

## What's on the site

| Section | Content |
|---|---|
| `/` | Hero, featured products, services, trust points |
| `/about` | Company story, milestones (2002–2026), mission |
| `/products` | 7 software products grouped by status (Active / Custom / Legacy) |
| `/products/[slug]` | Per-product detail page |
| `/services` | 3 software services + 11 paper industry consultancy services |
| `/services/[slug]` | Per-service detail page |
| `/clients` | 38 mill deployments — interactive Leaflet map, testimonials, regional breakdown |
| `/blog` | Sanity-backed (not yet wired — placeholder) |
| `/contact` | Resend-powered form → vs@papyrus360.com |

### Products

- **BPApp** — 44-module cloud ERP (links out to `bpapperp.papyrus360.com`)
- **Optrim** / **Optrim Web** — desktop & browser deckle matching
- **Papy ERP** — custom order & production management
- **PDN Process App** — conversion handling (custom engagement)
- **Paper Agent**, **NDM** — legacy products

### Services

**Software (3):** Software Implementation · IT Support · IT Infrastructure

**Consultancy (11):** Process Improvement · Product Development · Marketing & Campaigns · Sales Support · Factory or Machine Erections · Manpower & Staffing · Management Consulting · Compliance (GST/TDS/FEMA/PF/ESI) · Procurement · Raw Material Import/Export · Finished Goods Trade

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** — dark theme (`#080808` base, amber `#F59E0B` accent)
- **Framer Motion** — page transitions, scroll animations
- **Leaflet** + **react-leaflet** — interactive client map
- **Resend** — contact form email delivery
- **Lucide** — icon set
- **next-sanity** — blog CMS (scaffolded, not yet wired)
- **Cloudflare Workers AI** (flux-1-schnell) — image generation pipeline

## Local development

```bash
git clone https://github.com/anandaravi/Papyrus360WebPortal.git
cd Papyrus360WebPortal
npm install
cp .env.local.example .env.local   # fill values (see below)
npm run dev
```

App runs at **http://localhost:4000** (`dev` script binds to port 4000 — sister BPApp site uses 3000).

## Environment variables

`.env.local` (gitignored):

```
# Required for contact form
RESEND_API_KEY=

# Required to regenerate AI images (optional for normal dev)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID2=   # fallback account for daily quota
CLOUDFLARE_API_TOKEN2=

# Sanity (when blog is wired)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

## Project structure

```
src/
├── app/
│   ├── about/                  Company story, milestones, founder background
│   ├── api/contact/            Resend POST handler
│   ├── blog/                   Sanity placeholder
│   ├── clients/                38-mill roster + Leaflet map
│   ├── contact/                Form
│   ├── products/               Listing + dynamic [slug]
│   ├── services/               Listing + dynamic [slug]
│   ├── layout.tsx              Root layout, fonts, navbar/footer
│   └── page.tsx                Homepage
├── components/
│   ├── clients/                Leaflet map components
│   ├── layout/                 Navbar, Footer, NavLinks
│   └── ui/                     Button, PageHero, PageTransition
└── lib/
    ├── clients.ts              38 paper mills (lat/lon, grade, testimonials)
    ├── products.ts             7 software products
    ├── services.ts             14 services (3 software + 11 consultancy)
    └── cn.ts                   Tailwind class merge helper

public/
├── images/                     32+ AI-generated images across home, about,
│                               products, services, clients, blog, contact
├── papyrus360.png              Brand logo (DO NOT regenerate)
└── ...

scripts/
└── generate-images.py          Cloudflare flux-1-schnell batch generator
```

## Image generation

All marketing images are generated via Cloudflare Workers AI:

```bash
export CLOUDFLARE_ACCOUNT_ID=...
export CLOUDFLARE_API_TOKEN=...
python3 scripts/generate-images.py
```

Skips existing files >10 KB. Falls back to a second Cloudflare account on HTTP 429. Default model: `@cf/black-forest-labs/flux-1-schnell` (4 steps).

## Design system

- **Background:** `#080808`
- **Accent:** Amber `#F59E0B`
- **Fonts:** Geist Sans + Geist Mono (via `next/font`)
- **Cards:** `amber-card` custom class — subtle amber border on hover
- **Animations:** Framer Motion `whileInView` for scroll-triggered fades; `PageTransition` wraps route changes

Design tokens copied from sister site `~/development/webportal` (BPApp portal) for consistency across the two Papyrus360 brand surfaces.

## Build

```bash
npm run build
npm start
```

**WSL note:** Next.js 16 can fail prerendering certain special pages when `NODE_ENV=development` is set in shell. Force production for local builds:

```bash
NODE_ENV=production npm run build
```

Vercel always builds in production mode — this is local-only.

## Deployment

Designed for Vercel. Build command: `next build`. Set `RESEND_API_KEY` in Vercel project env vars before deploying.

## Sister sites

- **BPApp portal:** `https://bpapperp.papyrus360.com` — product-specific marketing for BPApp ERP. Source: `~/development/webportal`.
- **Legacy site:** `https://www.papyrus360.com/360/` — WordPress, to be replaced when this deploys to root.

## License

Proprietary — Netique Infotech Pvt Ltd.
