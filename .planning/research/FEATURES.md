# Feature Landscape

**Domain:** Production agency marketing website (Next.js 16, App Router, MDX blog, portfolio, analytics)
**Researched:** 2026-03-23
**Scope:** P0 improvements — blog, portfolio visuals, analytics, social links, env docs
**Overall confidence:** MEDIUM-HIGH (WebSearch verified against official Next.js docs and multiple credible sources)

---

## Table Stakes

Features users expect from a production agency website. Missing = the site feels incomplete, unprofessional, or loses trust.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Blog: published date + author** | Readers use dates to judge freshness; undated content signals neglect | Low | Pulled from MDX frontmatter — `date`, `author` fields |
| **Blog: post listing page** | Without an index, blog content is undiscoverable | Low | `/blog` route with sorted post list |
| **Blog: individual post pages** | Content needs a stable, shareable URL | Low | `/blog/[slug]` dynamic route |
| **Blog: reading time estimate** | Sets expectation, improves engagement; standard on all modern blogs | Low | ~200 wpm calculation from word count; zero deps |
| **Blog: open graph image per post** | Social shares look broken without per-post OG images | Med | Next.js already has OG image infra — extend to blog routes |
| **Blog: meta description per post** | Missing = Google generates a random snippet, hurts CTR | Low | From frontmatter `description` field |
| **Blog: JSON-LD structured data (Article)** | Required for Google rich results (author, date, headline) | Low | Already have JSON-LD infra for site — extend to posts |
| **Blog: mobile-readable typography** | Long-form content on mobile is useless without proper prose styling | Low | Tailwind `@tailwindcss/typography` plugin |
| **Portfolio: real project visuals** | Color placeholder cards signal a demo, not a live agency | Med | Actual screenshots, mockups, or project photography |
| **Portfolio: consistent visual hierarchy** | Project grid must communicate at a glance: name, category, result | Low | Structured card component — already exists, improve with visuals |
| **Analytics: basic page view tracking** | Without data, you can't know which pages convert or where users drop | Low | Vercel Analytics — zero-config for Vercel-deployed Next.js |
| **Social links: footer placement** | Visitors expect social icons in footer; absence signals inactivity | Low | LinkedIn, Instagram, X/Twitter icon links in footer |
| **Env docs: `.env.example`** | Any developer who clones or deploys the project needs this; missing = broken deploy | Low | Document all required env vars with placeholder values |

---

## Differentiators

Features that set the site apart. Not universally expected, but meaningfully raise perceived quality and trust.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Blog: table of contents (TOC)** | Long-form posts become scannable; signals content depth; rare on agency blogs | Med | Parse headings from MDX AST; sticky sidebar or top-of-post anchor list |
| **Blog: category / tag filtering** | Helps visitors find relevant content; improves internal linking and SEO | Med | Add `tags` frontmatter field; filter on listing page |
| **Blog: social share buttons (copy-link + native share)** | Amplifies organic reach; easy to add; most agency blogs skip it | Low | `navigator.share` API + clipboard fallback — no external deps |
| **Blog: related posts** | Reduces bounce, increases session depth; signals content maturity | Med | Simple tag-overlap scoring from static data — no DB needed |
| **Blog: syntax highlighting for code** | Signals technical credibility if articles discuss dev/marketing tech | Low | `rehype-pretty-code` or `shiki` — works natively with @next/mdx |
| **Portfolio: before/after or metric callouts** | Numbers in the visual hierarchy (e.g. "+250% engagement") stop the scroll | Med | Structured card overlay or dedicated stat badge component |
| **Portfolio: filter by service category** | Lets prospects find relevant work instantly; reduces cognitive load | Med | Client-side filter on TypeScript data — no backend needed |
| **Portfolio: lightbox / expanded view** | Lets visitors zoom into visual details without leaving the page | Med | `yet-another-react-lightbox` or CSS-only modal — keep it simple |
| **Analytics: Vercel Speed Insights** | Free Core Web Vitals tracking per deployment; Vercel-native; no extra setup | Low | `@vercel/speed-insights` alongside `@vercel/analytics` |
| **Analytics: goal/event tracking** | Know whether visitors click CTA buttons or submit forms | Med | Vercel Analytics custom events (`va.track()`) — zero cost |
| **Social links: hover animations** | Subtle icon scale/color transition elevates perceived polish | Low | Tailwind `transition hover:scale-110` — 1–2 lines per icon |

---

## Anti-Features

Things to deliberately NOT build for this project and milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Headless CMS (Contentful, Sanity, etc.)** | Adds runtime dependency, cost, and config overhead for content volume that doesn't justify it. PROJECT.md explicitly ruled out Database/CMS for v1 | MDX files in `/content/blog/` — editable in any editor, version-controlled, zero ops |
| **Google Analytics 4** | Cookie banners required in EU; steep learning curve; massive bundle weight; overkill for agency site traffic; creates GDPR liability | Vercel Analytics (privacy-safe, no cookies, free on all Vercel plans, zero-config) |
| **Comments system (Disqus, etc.)** | Third-party iframes hurt performance and privacy; agency blogs rarely get enough comments to justify; Disqus injects ads | Social share buttons + LinkedIn post linking as engagement channel |
| **Newsletter / email capture on blog** | Requires email provider setup, unsubscribe flows, GDPR compliance — deferred to v2 in PROJECT.md | CTAs linking to contact form; convert readers → leads directly |
| **Pagination on blog listing** | Premature for a site with 0–20 posts; adds complexity with no user benefit | Simple sorted list; add pagination only when list exceeds 30–40 posts |
| **Full-text search (Algolia, etc.)** | Not needed at single-digit post count; adds API key management | Category filtering handles discovery at this content volume |
| **Animated portfolio transitions (WebGL, canvas)** | Previously used and removed in redesign for good reason (slower, niche appeal); inconsistent with Apple-clean aesthetic | GSAP ScrollTrigger on section entry — already in place |
| **Portfolio CMS / admin UI** | Overkill for TypeScript data files managed by one team | Update `portfolio-data.ts` directly; it's readable and typed |
| **Social login / sharing widgets (AddThis, ShareThis)** | Heavy JS, tracking scripts, privacy issues | Native Web Share API + clipboard — no external scripts |
| **Dark mode** | Explicitly out of scope in PROJECT.md; Apple-clean light theme is intentional | Leave as-is; revisit in v2 |

---

## Feature Dependencies

```
MDX frontmatter (date, author, description, tags)
  → Blog post listing page          (needs date for sort)
  → Blog post meta / JSON-LD        (needs description, date, author)
  → Blog OG image                   (needs title, description)
  → Related posts                   (needs tags)
  → Category filtering              (needs tags)

Blog post listing page
  → Reading time                    (can be co-located in listing)
  → Category filtering              (extends listing page)

Real portfolio visuals
  → Portfolio filter by category    (filter is low-value without good visuals)
  → Metric callouts / stat badges   (overlaid on real images)
  → Lightbox                        (depends on having real images worth zooming)

Vercel Analytics (@vercel/analytics)
  → Vercel Speed Insights           (separate package, same infra — install together)
  → Goal/event tracking             (extends Analytics with va.track())

.env.example
  → No dependencies — standalone documentation artifact
```

---

## P0 MVP Recommendation

The five active requirements in PROJECT.md map to these priorities:

**Build first (table stakes, low effort):**
1. `.env.example` — pure documentation, 30 min, unblocks any developer setup
2. Social media links in footer — 3 icon links, zero deps, 1 hr
3. Vercel Analytics — `npm install @vercel/analytics`, 2 lines in layout, 1 hr
4. Real portfolio visuals — source/export actual project images, swap placeholders

**Build second (core blog infrastructure):**
5. Blog listing + post pages with MDX via `@next/mdx` (preferred over `next-mdx-remote` for Next.js 16 App Router)
6. Frontmatter: `title`, `date`, `author`, `description`, `tags`
7. Reading time (co-located with listing)
8. Per-post OG images (extend existing OG image infra)
9. Per-post meta description + JSON-LD Article schema
10. Prose typography (`@tailwindcss/typography`)

**Defer to v2 (differentiators):**
- Table of contents
- Blog category filtering
- Related posts
- Portfolio lightbox
- Portfolio filter by category
- Speed Insights (low effort but not P0)

---

## MDX Implementation Decision

Use `@next/mdx` (the official Next.js integration), not `next-mdx-remote`.

**Rationale:**
- `next-mdx-remote` is poorly maintained as of 2025; App Router support is marked unstable
- `@next/mdx` is the first-party solution, works natively with Server Components, ships zero MDX runtime to client
- Files-from-filesystem pattern (MDX as static files) is the right fit for this project's no-CMS constraint
- Official Next.js docs (nextjs.org/docs/app/guides/mdx) recommend `@next/mdx` for this pattern

**Confidence:** MEDIUM (multiple dev community sources agree; verified against official Next.js docs URL pattern)

---

## Vercel Analytics Decision

Use Vercel Analytics (`@vercel/analytics`) as the primary tool. Do not add Google Analytics 4.

**Rationale:**
- 44x smaller bundle than GA4
- No cookie consent banner required (privacy-safe by design)
- Zero-config for Vercel-deployed projects
- GA4 is 4,432x more popular but offers cohort/funnel analysis this site will never need
- Agency site goal is lead generation, not multi-touch attribution — page views + CTAs are sufficient

**Confidence:** MEDIUM (Vercel official blog + third-party comparisons via jigz.dev, stackfix.com)

---

## Sources

- Next.js MDX guide (official): https://nextjs.org/docs/app/guides/mdx
- `@next/mdx` vs `next-mdx-remote` analysis: https://www.cyishere.dev/blog/next-mdx-or-next-mdx-remote
- MDX integration strategies (LogRocket): https://blog.logrocket.com/mdx-integration-strategies-next-js/
- Vercel Web Analytics announcement: https://vercel.com/blog/vercel-web-analytics-is-now-generally-available
- Vercel vs Google Analytics comparison: https://www.jigz.dev/blogs/google-analytics-vs-vercel-analytics
- Analytics comparison matrix: https://www.stackfix.com/compare/google-product-analytics/vercel-product-analytics
- Portfolio case study best practices: https://influenceflow.io/resources/guide-to-portfolio-case-studies-showcase-your-work-land-more-opportunities-in-2026/
- Portfolio design trends 2026: https://elements.envato.com/learn/portfolio-trends
- Blog layout & SEO guide: https://thedigitalelevator.com/blog/blog-layout/
- Footer social links best practices: https://www.neue.world/insights/best-website-footer-design-examples
- Marketing portfolio guide: https://lovable.dev/guides/how-to-build-marketing-portfolio-gets-clients
