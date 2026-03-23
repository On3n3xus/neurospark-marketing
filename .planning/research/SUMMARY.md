# Project Research Summary

**Project:** Neurospark Marketing — P0 Site Improvements
**Domain:** Production agency marketing website (Next.js 16 App Router, MDX blog, portfolio images, analytics, social links)
**Researched:** 2026-03-23
**Confidence:** HIGH

---

## Executive Summary

Neurospark Marketing is an existing production Next.js 16 App Router site on Vercel that needs four targeted improvements: a content blog (MDX), real portfolio visuals, analytics, and social links in the footer. The stack is already well-chosen and requires only additive packages — no rewrites, no CMS, no database. The correct implementation pattern is static MDX files via `@next/mdx` (first-party, RSC-native), `next/image` for portfolio assets (zero new dependency), and Vercel Analytics (zero-config, privacy-safe). Every piece fits the existing "no runtime dependencies, statically generated" constraint already in place.

The recommended build order is: (1) portfolio images — highest visual impact, simplest dependency footprint, validates the data model; (2) analytics — trivial to add and should be live before blog traffic arrives; (3) blog — most complex, benefits from a stable foundation and active analytics from day one. Social links and `.env.example` are sub-hour tasks that can slot into any phase. This ordering avoids over-engineering and ensures each phase delivers independent, shippable value.

The primary risks are all technical gotchas specific to the Next.js 16 upgrade cycle: async `params` in dynamic routes, a required `mdx-components.tsx` file that many tutorials omit, the Tailwind CSS 4 plugin API change (CSS-first, not `tailwind.config.js`), and missing `metadataBase` causing broken OG images on social shares. All are avoidable with upfront decisions baked into phase setup steps. No risk is architecture-level — this is a well-understood domain with high-confidence official documentation.

---

## Key Findings

### Recommended Stack

The existing stack (Next.js 16.2.1, React 19, Tailwind CSS 4, GSAP, Vercel) requires only these additions:

**Install:**
- `@next/mdx` + `@mdx-js/loader` + `@mdx-js/react` + `@types/mdx` — official first-party MDX solution for App Router; zero MDX runtime shipped to client
- `remark-gfm` — GitHub Flavored Markdown (tables, lists, task lists); de-facto standard
- `rehype-pretty-code` + `shiki` — syntax highlighting with VS Code themes; zero client JS; ESM-only (requires `next.config.mjs`)
- `@tailwindcss/typography` (dev) — `prose` utility classes for MDX HTML; v4-compatible via `@plugin` CSS directive
- `@vercel/analytics` + `@vercel/speed-insights` — Vercel-native, privacy-safe, no GDPR cookie banner required; MIT license

**Do not install:**
- `next-mdx-remote` — poorly maintained, App Router RSC support marked unstable
- `contentlayer` — unmaintained since 2023
- `react-icons` — ~200 KB for 3 footer icons; use inline SVG
- Google Analytics — 90 KB script, cookie consent overhead, GDPR liability; Vercel Analytics is sufficient
- Any headless CMS — overkill for file-based content at this scale

**One config change required:** Rename `next.config.ts` to `next.config.mjs` (or keep `.ts` — Next.js 16 supports TS config, but verify `rehype-pretty-code` ESM compatibility). Add `withMDX()` wrapper and `pageExtensions` array.

See `/Users/nexus/Documents/Neurospark Marketing/neurospark-marketing/.planning/research/STACK.md` for full installation commands and version rationale.

### Expected Features

**Must have — table stakes (P0):**
- Blog: post listing page at `/blog` + individual pages at `/blog/[slug]`
- Blog: published date, author, reading time, meta description
- Blog: per-post OG images (extend existing infra) + JSON-LD Article schema
- Blog: prose typography via `@tailwindcss/typography`
- Portfolio: real project screenshots/mockups replacing color placeholder `div`s
- Analytics: basic page view tracking via Vercel Analytics
- Social links: LinkedIn, Instagram, X/Twitter icons in footer
- `.env.example`: all required env vars documented with placeholder values

**Should have — differentiators (v1.x):**
- Blog: syntax highlighting for code blocks (`rehype-pretty-code` — minimal extra effort during blog setup)
- Analytics: Vercel Speed Insights (pairs with Analytics, same install moment)
- Social links: hover animations (2 lines of Tailwind)
- Portfolio: metric callouts / stat badges overlaid on real images

**Defer to v2+:**
- Blog: table of contents, category/tag filtering, related posts
- Portfolio: lightbox, filter by service category
- Blog: newsletter capture, comments, pagination, full-text search
- Dark mode (explicitly out of scope per PROJECT.md)

See `/Users/nexus/Documents/Neurospark Marketing/neurospark-marketing/.planning/research/FEATURES.md` for full feature dependency graph and anti-features list.

### Architecture Approach

Three independent subsystems bolt onto the existing static App Router shell without touching any existing routes. The blog introduces the only new route tree (`/blog/*`) and the only new data layer (`src/lib/blog.ts` + `src/content/blog/*.mdx`). Portfolio and analytics are modifications to existing files only.

**Major components:**
1. `src/app/layout.tsx` — ADD `<Analytics />` and `<SpeedInsights />` as isolated Client Component leaves (do not make layout a Client Component)
2. `src/app/blog/` route tree — NEW: `layout.tsx` (prose shell), `page.tsx` (index), `[slug]/page.tsx` (MDX renderer via dynamic import + `generateStaticParams`)
3. `src/lib/blog.ts` — NEW: build-time metadata reader that imports `metadata` exports from each MDX file
4. `src/content/blog/*.mdx` — NEW: authored content with `export const metadata = {}` frontmatter (native `@next/mdx` pattern; no `gray-matter` needed)
5. `mdx-components.tsx` — NEW: required at project root; maps HTML elements to Tailwind-styled versions
6. `src/lib/portfolio-data.ts` — MODIFY: add `image: string` field to `Project` type
7. `src/components/sections/PortfolioSection.tsx` — MODIFY: swap color `div` for `next/image`
8. `src/app/sitemap.ts` — MODIFY: extend to include `/blog/*` routes dynamically

**Critical pattern:** `params` in Next.js 16 dynamic routes is a `Promise` — must be `await`ed. The existing `work/[slug]/page.tsx` already follows this pattern; mirror it exactly for blog routes.

See `/Users/nexus/Documents/Neurospark Marketing/neurospark-marketing/.planning/research/ARCHITECTURE.md` for full file tree, data flow diagrams, and annotated code examples.

### Critical Pitfalls

1. **Async params in Next.js 16** — All dynamic route components (`/blog/[slug]`, OG image generators) must `await params` before destructuring. Synchronous access builds in dev but breaks in production. Mirror the existing `work/[slug]/page.tsx` pattern.

2. **`mdx-components.tsx` missing or misplaced** — `@next/mdx` requires this file at project root (alongside `src/`). Not auto-created by the installer. Missing it causes a cryptic build failure. Create it before writing any MDX content.

3. **Frontmatter strategy not decided upfront** — `@next/mdx` does not parse YAML frontmatter. Decide before writing the first post: use `export const metadata = {}` inside each MDX file (recommended — no extra deps, type-safe, native to `@next/mdx`).

4. **Tailwind CSS 4 typography plugin uses a different API** — The v3 `require('@tailwindcss/typography')` in `tailwind.config.js` does not work. Use `@plugin "@tailwindcss/typography"` in the main CSS file. Restart the dev server after adding it (Tailwind CSS 4 does not always hot-reload plugin changes).

5. **`metadataBase` missing causes broken OG previews** — If `metadataBase` is not set in root `layout.tsx`, relative OG image URLs won't resolve on LinkedIn/Twitter. Verify it exists before adding any `generateMetadata` to blog routes. Add `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com')` if absent.

6. **Sitemap not updated alongside blog** — Blog posts at `/blog/[slug]` are invisible to search engines unless `sitemap.ts` is extended. Update `sitemap.ts` in the same PR as the blog route — treat it as part of definition-of-done.

See `/Users/nexus/Documents/Neurospark Marketing/neurospark-marketing/.planning/research/PITFALLS.md` for all 14 pitfalls with phase-specific warnings.

---

## Implications for Roadmap

### Phase 1: Quick Wins (Social Links, `.env.example`, Analytics)

**Rationale:** These three items share zero dependencies with each other or the blog. Each is under 2 hours. Completing them first establishes a pattern for the project (small, shippable), gets tracking live immediately, and closes out the "easy" P0 items before the higher-effort blog work begins. Analytics especially must be live before blog traffic arrives.

**Delivers:** Footer with social links, all env vars documented, page-view and Core Web Vitals tracking active.

**Addresses:** Social links (table stakes), `.env.example` (table stakes), Vercel Analytics + Speed Insights (table stakes + differentiator combo).

**Avoids:**
- Missing `rel="noopener noreferrer"` + `aria-label` on social icon links (Pitfall 12)
- Analytics `NEXT_PUBLIC_SITE_URL` not in `.env.example` before blog work begins (Pitfall 13)
- GDPR decision deferred — make and document the call now (Pitfall 9)

### Phase 2: Portfolio Visuals

**Rationale:** Highest visual impact per hour of work, zero new npm dependencies, and validates the `Project` data type before the blog introduces its own data patterns. A polished portfolio is also the primary conversion driver — it should ship before blog traffic arrives. All work is isolated to two files (`portfolio-data.ts`, `PortfolioSection.tsx`) and the `public/images/portfolio/` directory.

**Delivers:** Real project screenshots in portfolio grid and case study hero images; `next/image` with WebP/AVIF optimization via Vercel Edge.

**Addresses:** Portfolio real visuals (table stakes), lays groundwork for v2 metric callouts and lightbox.

**Stack used:** `next/image` (built-in, no new packages).

**Avoids:**
- CLS from unsized images — use `fill` with an `aspect-ratio` container for cards (Pitfall 7)
- External image `remotePatterns` error — store images locally in `public/images/portfolio/` to avoid this entirely (Pitfall 8)

### Phase 3: MDX Blog

**Rationale:** Most complex phase — new npm packages, config changes, new route tree, new data patterns. Builds on a now-stable foundation (images done, analytics live, env vars documented). Benefits from having analytics active from the first published post.

**Delivers:** `/blog` index and `/blog/[slug]` post pages with prose typography, reading time, per-post OG images, JSON-LD Article schema, meta descriptions, and sitemap entries. First post published.

**Stack used:** `@next/mdx`, `remark-gfm`, `rehype-pretty-code`, `shiki`, `@tailwindcss/typography`.

**Implements:** Blog route tree, `src/lib/blog.ts` metadata reader, `src/content/blog/` content directory, `mdx-components.tsx`, sitemap extension.

**Avoids (all critical — must be setup steps, not afterthoughts):**
- Create `mdx-components.tsx` at project root as step 1 (Pitfall 2)
- Decide `export const metadata` pattern before writing first post (Pitfall 3)
- Verify `metadataBase` in root layout before adding `generateMetadata` (Pitfall 5)
- Use `await params` in all dynamic route components (Pitfall 1)
- Update `sitemap.ts` in same PR as routes (Pitfall 4)
- Use `@plugin` directive for `@tailwindcss/typography`, not v3 `require()` (Pitfall 10)
- Keep `mdx-components.tsx` lightweight; use `next/dynamic` for any heavy components (Pitfall 6)
- Verify no GSAP hydration errors on blog pages (Pitfall 11)

### Phase Ordering Rationale

- **Quick wins first:** Establishes momentum, ships observable value immediately, gets analytics baseline before content work begins.
- **Portfolio before blog:** Higher conversion impact, simpler execution, validates data patterns. A site with real portfolio images but no blog is still a strong agency site. A site with a blog but placeholder portfolio images looks like a demo.
- **Blog last:** Highest complexity, most config changes, requires analytics already active, most pitfall exposure. Building last means every prior phase is stable and the developer can focus entirely on the new MDX system.
- **`.env.example` as cross-phase gate:** Treat it as a definition-of-done requirement for every phase — any new `process.env.*` var introduced in any phase must appear in `.env.example` in the same commit.

### Research Flags

**Standard patterns — skip research-phase:**
- Phase 1 (Social Links, Analytics, env docs): Entirely documented; no unknowns. Official Vercel Analytics docs are authoritative.
- Phase 2 (Portfolio Images): `next/image` is well-documented in local `node_modules/next/dist/docs/`. No external research needed.

**May benefit from quick verification before execution:**
- Phase 3 (Blog): Before starting, read `node_modules/next/dist/docs/01-app/02-guides/mdx.md` directly (already flagged in AGENTS.md as the canonical source). The `next.config.ts` vs `.mjs` rename question should be validated against that local doc before any config changes.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core recommendations verified against official Next.js 16.2.1 docs (local `node_modules`) and official Vercel docs |
| Features | MEDIUM-HIGH | Table stakes verified against multiple industry sources; priority ranking is opinionated but well-supported |
| Architecture | HIGH | Sourced directly from local `node_modules/next/dist/docs/` — highest possible confidence for this stack version |
| Pitfalls | MEDIUM-HIGH | Critical pitfalls (async params, `mdx-components.tsx`, Tailwind CSS 4 plugin API) confirmed via official docs; moderate pitfalls from community sources |

**Overall confidence:** HIGH

### Gaps to Address

- **`next.config.ts` vs `next.config.mjs` for ESM plugins:** STACK.md recommends renaming to `.mjs` for `rehype-pretty-code` (ESM-only), but ARCHITECTURE.md shows a `.ts` config example and notes Next.js 16 supports TS config. Validate against `node_modules/next/dist/docs/01-app/02-guides/mdx.md` before Phase 3 config changes. If `.ts` works with ESM imports via `import()`, no rename needed.

- **GDPR / consent strategy for analytics:** Whether to add a consent gate before `<Analytics />` depends on the agency's client geography. Document the decision explicitly before Phase 1 ships. No implementation gap — the technical options are clear (Pitfall 9).

- **Portfolio image sourcing:** ARCHITECTURE.md recommends `public/images/portfolio/` as static storage. Actual image assets (screenshots, mockups) must be sourced from the design tool or client deliverables before Phase 2 can complete. This is a content dependency, not a technical gap.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16 local docs (`node_modules/next/dist/docs/`) — MDX guide, analytics guide, image component, dynamic routes
- Vercel Analytics Quickstart + Package docs — analytics integration
- `@vercel/analytics` + `@vercel/speed-insights` GitHub releases (2026-03-10/12)

### Secondary (MEDIUM confidence)
- `rehype-pretty-code` official docs at rehype-pretty.pages.dev
- `@tailwindcss/typography` GitHub README (v4 `@plugin` directive pattern)
- `next-mdx-remote` limitations analysis — cyishere.dev, mdxblog.io
- GSAP hydration issue in Next.js — GSAP community forums
- Vercel vs Google Analytics comparison — jigz.dev, stackfix.com
- Portfolio and blog design best practices — influenceflow.io, thedigitalelevator.com

### Tertiary (community confirmation)
- Tailwind CSS 4 typography v4 compatibility — community GitHub discussion
- App Router pitfalls — imidef.com, coffey.codes

---

*Research completed: 2026-03-23*
*Ready for roadmap: yes*
