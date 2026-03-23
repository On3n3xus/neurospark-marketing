# Neurospark Marketing Website

## What This Is

Production website for Neurospark Marketing, a full-service creative agency. Apple-clean light theme built with Next.js 16, Tailwind CSS 4, and GSAP scroll animations. Deployed on Vercel with a contact form that sends leads to an n8n automation webhook. Currently has 6 sections (Hero, Services, Portfolio, Testimonials, About, Contact), 6 case study pages, SEO foundation, and dynamic OG images.

## Core Value

The website must convert visitors into leads by clearly communicating what Neurospark does, showing proof of results, and making it effortless to get in touch.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Hero section with CTA — v1
- ✓ Services grid (6 services) — v1
- ✓ Portfolio section with 6 project cards — v1
- ✓ Case study pages at /work/[slug] with metrics — v1
- ✓ Testimonials section (4 client quotes) — v1
- ✓ About section (team + stats) — v1
- ✓ Contact form with Zod validation → n8n webhook — v1
- ✓ Rate limiting on contact API (5 req/min) — v1
- ✓ Navigation with mobile menu, scroll-aware blur — v1
- ✓ SEO: sitemap, robots.txt, favicon, OG images, JSON-LD — v1
- ✓ Custom 404, error boundary, loading pages — v1
- ✓ GSAP ScrollTrigger animations on all sections — v1
- ✓ Responsive design (mobile-first Tailwind) — v1
- ✓ Deployed on Vercel with GitHub auto-deploy — v1

### Active

<!-- Current scope. Building toward these. -->

- [ ] Blog/content section with MDX articles
- [ ] Real portfolio project visuals (replace color placeholders)
- [ ] Vercel Analytics integration
- [ ] Social media links in footer (LinkedIn, Twitter/X, Instagram)
- [ ] `.env.example` documenting all required environment variables

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Dark mode toggle — Apple-clean light theme is intentional; revisit in v2
- Pricing page — Agency prefers custom quotes over published pricing
- Real-time chat widget — Contact form + n8n pipeline is sufficient
- User authentication — No client portal in v1
- Database/CMS — Static data files are sufficient for current content volume
- Newsletter signup — Defer to v2 (requires email provider setup)
- Client logo carousel — Defer to v2 (needs real client permissions)
- E-commerce/payments — Not applicable

## Context

- **Stack**: Next.js 16 (App Router), React 19, Tailwind CSS 4, GSAP 3, react-hook-form + Zod, Geist fonts
- **Deployment**: Vercel, auto-deploy from GitHub (On3n3xus/neurospark-marketing)
- **Contact pipeline**: Form → /api/contact (Zod + rate limit) → n8n webhook at hstgr.cloud
- **Design**: Apple-clean light theme (#fafafa bg, #1d1d1f text, #0071e3 accent), frosted glass nav
- **Previously had**: Full WebGL 3D dark cyber theme (removed in redesign)
- **Content**: All data in TypeScript files (services-data, portfolio-data, testimonials-data, team-data)

## Constraints

- **Tech stack**: Next.js 16 + Tailwind CSS 4 — already committed, don't change
- **Design**: Apple-clean light aesthetic — maintain consistency
- **Hosting**: Vercel — all features must work on Vercel's platform
- **Dependencies**: Keep minimal — avoid heavy CMS or database for v1
- **Performance**: Must maintain fast Lighthouse scores with any new features

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Apple-clean light theme over 3D dark | Better readability, faster load, broader appeal | ✓ Good |
| Static data files over CMS | Simpler, no runtime dependencies, easy to update | — Pending |
| n8n webhook over Resend email | Integrates with existing automation pipeline | ✓ Good |
| react-hook-form + Zod over basic useState | Better validation UX, type-safe | ✓ Good |
| MDX for blog (planned) | Native Next.js support, component flexibility | — Pending |

---
*Last updated: 2026-03-23 after initialization*
