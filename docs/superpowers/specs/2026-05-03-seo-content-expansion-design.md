# SEO Content Expansion — Pillar + Cluster Architecture

**Date:** 2026-05-03
**Author:** Claude (with Danilo)
**Status:** Approved for planning
**Related:** Builds on the TERMINAL.OS redesign shipped 2026-05-03 (commits `ebee407` → `d4609f3`)

## Goal

Drive new organic search traffic to neurosparkmarketing.com by expanding from a single homepage + thin /services page to a 16-page commercial-and-informational footprint targeting Minneapolis local + vertical-specific searches.

**Success metric:** within 90 days of deploy, the site ranks on page 1 of Google for at least 3 of the 6 industry-pillar primary keywords (e.g., "dental marketing agency Minneapolis").

## Positioning

- **Hybrid:** industry vertical × Minneapolis local
- **Verticals (with proof):** medical/dental/med-spa, real estate/property, home services
- **Why this works:** local pro-services and home-services SMBs are geographically captive (search "[trade] Minneapolis"), have budget, are underserved by AI-aware marketing agencies, and are exactly the buyer profile already in Neurospark's existing client base.

## Scope

### In scope (16 new commercial/content pages + 2 index pages + /blog refactor)

Page counts:
- 6 industry pillar pages + 6 service cluster pages + 4 blog posts = **16 new content pages**
- 2 index pages (/services restructured, /industries new)
- 2 existing blog posts refactored to TERMINAL.OS theme

**Industry pillar pages** (6, ~1,500 words each):
- `/industries/dental-marketing-minneapolis`
- `/industries/med-spa-marketing-minneapolis`
- `/industries/real-estate-marketing-minneapolis`
- `/industries/hvac-marketing-minneapolis`
- `/industries/plumbing-marketing-minneapolis`
- `/industries/roofing-marketing-minneapolis`

**Service cluster pages** (6, ~600 words each):
- `/services/ai-agents`
- `/services/content-engine`
- `/services/paid-media-ai`
- `/services/brand-intel`
- `/services/growth-automation`
- `/services/revenue-forecast`

**Blog posts** (4, ~1,200 words each):
- `/blog/how-ai-marketing-agents-work`
- `/blog/dental-practice-marketing-2026`
- `/blog/hvac-lead-generation-with-ai`
- `/blog/local-real-estate-seo-playbook`

**Index pages** (2 new/restructured):
- `/services` — restructured from current grid into a 6-card index linking to detail pages
- `/industries` — new index page mirroring the /services pattern

**/blog refactor:**
The two existing posts (`why-every-brand-needs-a-video-strategy`, `anatomy-of-a-high-converting-agency-website`) and the /blog index get refactored from the apple-clean theme to TERMINAL.OS so the four new posts render in the same visual language.

**Navigation + footer:**
- Sub-nav adds a 6th item: `/INDUSTRIES`, between `/SERVICES` and `/WORK`
- Footer adds an "INDUSTRIES" column listing the 6 verticals

**Drafted content:**
All 16 new pages ship with full drafted copy in TERMINAL.OS voice using existing brand language. Danilo reviews and edits before deploy.

### Out of scope

- Wiring real Claude API (separate decision, separate spec)
- Cal.com / calendar booking embed
- Sticky CTA / exit-intent
- Replacing portfolio placeholder gradients with real images
- Real client photos on /about
- Backlink outreach / off-page SEO
- Additional industries (legal, professional services beyond proof set) — wave 3 candidate
- Service detail variants per industry (e.g. `/services/ai-agents/dental`)
- A/B testing framework
- Newsletter signup

## Architecture

### Information architecture (pillar + cluster)

```
neurosparkmarketing.com/
├── /                                          existing — TERMINAL.OS home
├── /services                                  UPDATED — index of 6 cards
│   ├── /services/ai-agents                    cluster (~600w)
│   ├── /services/content-engine               cluster
│   ├── /services/paid-media-ai                cluster
│   ├── /services/brand-intel                  cluster
│   ├── /services/growth-automation            cluster
│   └── /services/revenue-forecast             cluster
├── /industries                                NEW — index of 6 cards
│   ├── /industries/dental-marketing-minneapolis     pillar (~1,500w)
│   ├── /industries/med-spa-marketing-minneapolis    pillar
│   ├── /industries/real-estate-marketing-minneapolis pillar
│   ├── /industries/hvac-marketing-minneapolis       pillar
│   ├── /industries/plumbing-marketing-minneapolis   pillar
│   └── /industries/roofing-marketing-minneapolis    pillar
├── /work                                      existing
├── /about                                     existing
├── /contact                                   existing
└── /blog                                      REFACTORED to TERMINAL.OS
    ├── /blog/why-every-brand-needs-a-video-strategy     existing
    ├── /blog/anatomy-of-a-high-converting-agency-website existing
    ├── /blog/how-ai-marketing-agents-work               new (~1,200w)
    ├── /blog/dental-practice-marketing-2026             new
    ├── /blog/hvac-lead-generation-with-ai               new
    └── /blog/local-real-estate-seo-playbook             new
```

### Internal linking rules

- **Industry pillar → Services:** every pillar links DOWN to the 4 most relevant service clusters (named "Your [vertical] marketing stack"). Not all 6 — only the ones that make sense for the vertical.
- **Service cluster → Industries:** every service has a "Industries running this module" chip strip linking UP to all 6 industry pillars.
- **Blog post → Pillar/Cluster:** every blog post ends with a "Read next" panel linking UP to its corresponding pillar (or to /services if cross-cutting).
- **Index pages:** /industries cross-links to /services in a footer band, and vice-versa.
- **Sub-nav:** /HOME, /SERVICES, /INDUSTRIES, /WORK, /ABOUT, /CONTACT (6 items).

## Route structure

Following the existing `/work/[slug]` pattern:

- `src/app/services/page.tsx` — index page (restructured from current single-page grid)
- `src/app/services/[slug]/page.tsx` — dynamic route, one per service, with `generateStaticParams()` reading from `services-data.ts`
- `src/app/services/[slug]/opengraph-image.tsx` — per-service OG image
- `src/app/industries/page.tsx` — new index page
- `src/app/industries/[slug]/page.tsx` — dynamic route, one per industry, with `generateStaticParams()` reading from `industries-data.ts`
- `src/app/industries/[slug]/opengraph-image.tsx` — per-industry OG image

This keeps the codebase consistent with `/work/[slug]` and makes adding new services or industries a data-only change.

The existing `/services/page.tsx` (currently renders `ServicesGrid + PricingGrid`) becomes the index. The `PricingGrid` stays on the index because pricing is tier-based across all modules, not per-service. Each service cluster page references the tier system via a "see all pricing" link back to `/services#pricing`.

## Components to add

| Component | Path | Purpose |
|---|---|---|
| `PillarPage` | `src/components/terminal/PillarPage.tsx` | Wraps the 7-section industry pillar layout, takes industry data prop |
| `ServiceDetailPage` | `src/components/terminal/ServiceDetailPage.tsx` | Wraps the 6-section service cluster layout |
| `FAQ` | `src/components/terminal/FAQ.tsx` | Accordion with `schema.org/FAQPage` JSON-LD baked in |
| `PillarChips` | `src/components/terminal/PillarChips.tsx` | Links UP from services to industries (and vice versa) |
| `BlogTerminalShell` | `src/components/terminal/BlogTerminalShell.tsx` | Refactored blog template in TERMINAL.OS aesthetic |

All wrapped in the existing `TerminalShell` (TopBar + CommandBar + SubNav + Footer).

## Data files

### `src/lib/industries-data.ts` (new)

```ts
export type Industry = {
  slug: string;                      // e.g. "dental-marketing-minneapolis"
  name: string;                      // e.g. "Dental Practices"
  vertical: "medical" | "real-estate" | "home-services";
  hero: { headline: string; subhead: string; metricBadge?: string };
  problem: { paragraphs: string[] };
  servicesUsed: ServiceId[];         // 4 of 6 service slugs
  stack: { integrations: string[]; description: string };
  proof: { caseQuote: string; clientLabel: string };
  faq: { q: string; a: string }[];   // 6 questions for FAQPage schema
  cta: { label: string; subcopy: string };
  targetKeyword: string;             // primary
  secondaryKeywords: string[];
};
```

### `src/lib/services-data.ts` (extend existing)

Add: `slug`, `targetKeyword`, `secondaryKeywords`, `longDescription`, `metric`, `metricLabel`, `demoComponent` (optional reference to AgentDemo etc.), `industriesServed: IndustrySlug[]`.

## Page templates (sections per type)

### Industry pillar (~1,500 words)
1. **HERO** — H1 with primary keyword, subhead, two CTAs (Cal.com-friendly anchor + open channel), hero metric badge
2. **PROBLEM** — 3-paragraph vertical-specific problem statement
3. **SOLUTION** — 4-card grid showing the 4 services that matter for this vertical, each linking to its cluster page
4. **STACK** — Diagram naming actual integrations (e.g., Dentrix/Open Dental for dental, ServiceTitan for HVAC) + Neurospark agents
5. **PROOF** — Anonymized case quote pulled from real client work
6. **FAQ** — 6 questions with `FAQPage` schema markup
7. **CTA** — Vertical-specific (e.g., "Book a 15-min dental practice audit")

### Service cluster (~600 words)
1. **HERO** — H1 + 2-line subhead + status badge (matches existing TERMINAL.OS aesthetic)
2. **WHAT** — 3 short paragraphs naming the 3 most common agents/use-cases
3. **DEMO** — Reuses existing `AgentDemo` (or appropriate live demo) component where applicable
4. **INDUSTRIES** — Chip-links to all 6 industry pillars (`PillarChips`)
5. **METRIC** — Single metric callout (matches existing TERMINAL.OS metric style)
6. **CTA** — Generic "Open a channel"

### Blog post (~1,200 words)
1. **HEADER** — Title, date, author (Danilo), read time — TERMINAL.OS-styled
2. **PROSE** — MDX with `// LIVE INSIGHT` mono-styled callouts; Tailwind typography restyled for dark
3. **READ NEXT** — Panel linking UP to relevant pillar
4. **CTA** — Newsletter or contact CTA

### Index pages (~300 words each)
1. **HERO** — `PageHero` with route headline ("Six modules. One operator." / "Six verticals. One operator.")
2. **GRID** — 2x3 card grid linking to detail pages (each card: code, name, 1-line tagline, metric, hover state)
3. **CROSS-LINK** — Footer band ("Looking by service? → /services" on /industries, vice versa)

## Keyword targeting

| Page | Primary keyword | Secondary |
|---|---|---|
| `/industries/dental-marketing-minneapolis` | dental marketing agency Minneapolis | dental SEO Minnesota, AI for dental practices |
| `/industries/med-spa-marketing-minneapolis` | med spa marketing agency Minneapolis | aesthetic clinic marketing Minnesota |
| `/industries/real-estate-marketing-minneapolis` | real estate marketing agency Minneapolis | realtor marketing Minnesota, AI for realtors |
| `/industries/hvac-marketing-minneapolis` | HVAC marketing agency Minneapolis | HVAC lead generation, AI for HVAC contractors |
| `/industries/plumbing-marketing-minneapolis` | plumbing marketing agency Minneapolis | plumber lead generation MN |
| `/industries/roofing-marketing-minneapolis` | roofing marketing agency Minneapolis | roofing leads Minnesota, storm response marketing |
| `/services/ai-agents` | AI marketing agent | marketing automation agent, AI outbound agent |
| `/services/content-engine` | AI content marketing agency | AI blog writing, generative content marketing |
| `/services/paid-media-ai` | AI ad management | automated PPC, AI Google Ads management |
| `/services/brand-intel` | brand monitoring software | AI brand intelligence, social listening tool |
| `/services/growth-automation` | marketing automation agency | AI lifecycle marketing, CRM automation |
| `/services/revenue-forecast` | marketing revenue forecasting | marketing attribution AI |
| `/blog/how-ai-marketing-agents-work` | how do AI marketing agents work | informational, links UP to all services |
| `/blog/dental-practice-marketing-2026` | dental practice marketing strategies | links UP to /industries/dental |
| `/blog/hvac-lead-generation-with-ai` | HVAC lead generation | links UP to /industries/hvac |
| `/blog/local-real-estate-seo-playbook` | real estate SEO local | links UP to /industries/real-estate |

## Structured data (JSON-LD)

| Page type | Schemas |
|---|---|
| Industry pillar | `LocalBusiness` (Neurospark + serviceArea: Minneapolis-St Paul) + `Service` (per industry) + `FAQPage` |
| Service cluster | `Service` + `BreadcrumbList` |
| Blog post | `Article` (already in place, extend with `mainEntityOfPage` and `inLanguage`) |
| Index pages | `CollectionPage` + `BreadcrumbList` |
| Site-wide | Existing `Organization` JSON-LD in root layout (no change) |

## Per-page metadata

Each page exports `generateMetadata()` producing:

- **title** — primary keyword + brand suffix (template already in root layout)
- **description** — 150-character pitch with primary + 1 secondary keyword
- **openGraph** — auto-generated OG image at `/industries/[slug]/opengraph-image.tsx` and `/services/[slug]/opengraph-image.tsx` (matches existing `/work/[slug]` pattern)
- **alternates.canonical** — explicit canonical URL

## Sitemap

Update `src/app/sitemap.ts` to dynamically pull from `industries-data.ts` and `services-data.ts`. Existing blog enumeration handles the four new MDX posts via `getAllPosts()`.

## Deploy plan (two waves)

### Wave 1 — Foundations
- Refactor `/blog` and `/blog/[slug]` to TerminalShell + dark-themed MDX prose
- Build `PillarPage`, `ServiceDetailPage`, `FAQ`, `PillarChips`, `BlogTerminalShell` components
- Add `industries-data.ts` (with stub data — at minimum slug, name, target keyword)
- Extend `services-data.ts` with new fields
- Add `/INDUSTRIES` to sub-nav (with `data-disabled` styling until Wave 2 ships content)
- Verify chrome looks right on existing /blog
- One commit, push, deploy

### Wave 2 — Pages
- Fill `industries-data.ts` with full content for all 6 industries
- Fill `services-data.ts` extensions
- Generate the 16 page files (6 industry pillars, 6 service clusters, 2 indexes, 4 blog MDX posts)
- Wire structured data (JSON-LD components for each schema type)
- Wire `generateMetadata()` per page
- Update `sitemap.ts`
- Add per-route `opengraph-image.tsx` files
- Update Footer to add "INDUSTRIES" column
- One commit, push, deploy
- Submit updated sitemap to Google Search Console (manual one-time step by Danilo)

## Verification checklist (after Wave 2 deploy)

- All 16 new URLs return 200 with correct OG image and correct canonical
- Each pillar page passes the [Google Rich Results test](https://search.google.com/test/rich-results) for FAQPage schema
- `/sitemap.xml` lists all 16 new URLs
- Lighthouse mobile: ≥90 on all 4 categories for one randomly selected pillar
- Internal links spot-check: pillar → cluster → pillar round-trip works for at least 2 verticals
- /blog refactor: existing two posts still render readably with new dark theme
- Sub-nav `/INDUSTRIES` shows active state on all 6 industry pages

## Open items requiring Danilo's input during implementation

- **Real proof statements** for the PROOF section of each industry pillar. The spec assumes anonymized client metrics will be supplied (e.g., "Twin Cities dental group, 3 locations: +218 new patients in Q1"). If no real client data exists for a vertical, the section becomes a generic "what to expect" framework instead.
- **Pricing copy review** — service clusters reference flat retainer pricing; should match the existing 3-tier on /services.
- **CTA targets** — pillar CTAs link to /contact for now (no Cal.com yet). Confirm this is acceptable for Wave 2 ship.
