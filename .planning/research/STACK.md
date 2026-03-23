# Technology Stack

**Project:** Neurospark Marketing — P0 Improvements (Blog, Portfolio Visuals, Analytics, Social Links)
**Researched:** 2026-03-23
**Research mode:** Ecosystem — stack dimension only

---

## Context

The project already runs Next.js 16.2.1, React 19, Tailwind CSS 4, and GSAP on Vercel. This document covers only the _additions_ required for the P0 milestone: MDX blog, portfolio image handling, analytics, and social links. Nothing in the existing stack changes.

---

## Recommended Stack

### MDX Blog

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/mdx` | `^16.2.1` (peer-versioned with Next.js) | Transform `.mdx` files into React Server Components | Official Next.js solution; same team, same release cycle. Has native App Router support, no client JS runtime shipped, and is verified in the live Next.js 16.2.1 docs (`/docs/app/guides/mdx`, lastUpdated 2026-03-20). |
| `@mdx-js/loader` | `^3.x` | Webpack/Turbopack loader that `@next/mdx` delegates to | Required peer dep of `@next/mdx`. |
| `@mdx-js/react` | `^3.x` | React context for MDX component mapping | Required for `mdx-components.tsx` global overrides. |
| `@types/mdx` | `^2.x` | TypeScript declarations for `.mdx` imports | Dev dep. Required for TS projects. |
| `remark-gfm` | `^4.x` | GitHub Flavored Markdown (tables, strikethrough, footnotes, task lists) | Agency blog posts will use tables and lists; GFM is the de-facto standard. Compatible with remark 15+ / unified ESM. |
| `rehype-pretty-code` | `^0.14.x` | Syntax highlighting for code blocks via Shiki | Best-in-class syntax highlighting (VS Code themes, line highlights, zero client JS). Shiki 1.x peer dep. ESM-only — requires `next.config.mjs`. |
| `shiki` | `^1.x` | Syntax highlighting engine consumed by rehype-pretty-code | Peer dep; required alongside `rehype-pretty-code`. |

**Frontmatter approach:** Use `export const metadata = {}` directly inside MDX files (native, no extra package). `@next/mdx` does not support YAML frontmatter by default, but exported JS objects work out of the box and are type-safe. For the blog index page, read metadata via dynamic imports + `generateStaticParams`.

### Portfolio Image Handling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` (built-in) | ships with Next.js 16.2.1 | Responsive, optimized portfolio images | Zero new dependency. Verified in Next.js 16 docs: auto-detects intrinsic dimensions from static imports, auto-generates `blurDataURL` for `placeholder="blur"`, converts to WebP, lazy-loads by default. Vercel Edge Network caches optimized variants — ideal for the existing Vercel deployment. |

No external image library is needed. All portfolio images will live in `/public/work/` as static assets.

**Pattern for static imports (recommended for portfolio):**
```tsx
import heroShot from '@/public/work/project-name/hero.jpg'
// width, height, blurDataURL all auto-derived
<Image src={heroShot} alt="..." placeholder="blur" />
```

### MDX Typography Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@tailwindcss/typography` | `^0.5.x` | `prose` utility classes for MDX-rendered HTML | Official Tailwind Labs plugin. Confirmed v4-compatible: install with `npm install -D @tailwindcss/typography`, then `@plugin "@tailwindcss/typography"` in the main CSS file (new CSS-config API for Tailwind v4). No `tailwind.config.js` required. |

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@vercel/analytics` | `^2.0.1` | Page view and visitor analytics | Latest release (2026-03-12). v2 ships under MIT license with Resilient Intake for script loading. For Next.js App Router: `import { Analytics } from '@vercel/analytics/next'` added to `app/layout.tsx`. No config required — Vercel injects `scriptSrc`/`eventEndpoint` at build time automatically. Must also enable in Vercel Dashboard → Analytics tab. |
| `@vercel/speed-insights` | `^2.0.0` | Core Web Vitals / real-user performance metrics | Latest release (2026-03-10). v2 also MIT. Pair with analytics for full observability. `import { SpeedInsights } from '@vercel/speed-insights/next'` in root layout. Negligible bundle cost (deferred script). |

### Social Links

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| No new package needed | — | Social icon SVGs in footer | Inline SVGs or a minimal icon set. Do NOT add `react-icons` (adds ~200 KB to bundle for 3 icons). Three options in order of preference: (1) copy raw SVG markup inline, (2) use `lucide-react` if already in the project, (3) add a single SVG sprite file. |

---

## Alternatives Considered and Rejected

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| MDX | `@next/mdx` | `next-mdx-remote` | As of 2025-2026, `next-mdx-remote` is poorly maintained, its RSC support is marked unstable, and it cannot handle `import`/`export` inside MDX files. The fork `next-mdx-remote-client` is better maintained but still unnecessary overhead for a local-files-only blog. |
| MDX | `@next/mdx` | Contentlayer | Contentlayer is unmaintained (last release 2023). Community has migrated back to `@next/mdx`. Do not use. |
| MDX Rust compiler | — | `mdxRs: true` in next.config | The Rust-based MDX compiler is marked **experimental** in the official Next.js 16 docs and explicitly not recommended for production. Skip until stable. |
| Syntax highlighting | `rehype-pretty-code` | `@shikijs/rehype` directly | `rehype-pretty-code` wraps Shiki with better ergonomics (line highlighting, word highlighting, title blocks). Minimal overhead over raw Shiki. |
| Analytics | `@vercel/analytics` | Google Analytics / Plausible | Project is already on Vercel; native analytics requires zero external domain config, is privacy-respecting by default, and has no GDPR cookie banner requirement. GA adds ~90 KB script and cookie consent overhead. |
| Image optimization | `next/image` | Cloudinary / `sharp` | `next/image` on Vercel uses Vercel's built-in image optimization (free tier: 1,000 source images/month). No external service needed. `sharp` is auto-installed by Next.js when needed for local builds. |
| Social icons | Inline SVG | `react-icons` | `react-icons` is ~200 KB uncompressed. For 3 social icons in a footer, this is unjustifiable. |

---

## Installation

```bash
# MDX blog core
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# MDX remark/rehype plugins
npm install remark-gfm rehype-pretty-code shiki

# Tailwind typography
npm install -D @tailwindcss/typography

# Analytics + speed insights
npm install @vercel/analytics @vercel/speed-insights
```

**Post-install config steps:**

1. Rename `next.config.ts` → `next.config.mjs` (rehype-pretty-code is ESM-only; `@next/mdx` with remark/rehype plugins requires ESM config).
2. Create `mdx-components.tsx` at project root (required by App Router; will error without it).
3. Add `@plugin "@tailwindcss/typography"` to the project's main CSS entry file (after `@import "tailwindcss"`).
4. Add `<Analytics />` and `<SpeedInsights />` to `app/layout.tsx`.
5. Enable Analytics in Vercel Dashboard.

---

## Confidence Assessment

| Recommendation | Confidence | Source |
|---------------|------------|--------|
| `@next/mdx` as MDX solution | HIGH | Verified against official Next.js 16.2.1 docs, lastUpdated 2026-03-20 |
| `remark-gfm` v4.x | HIGH | Official GitHub, confirmed ESM + remark 15+ compatible |
| `rehype-pretty-code` + `shiki` v1 | HIGH | Official docs at rehype-pretty.pages.dev, confirmed ESM-only |
| `@tailwindcss/typography` v4 compatibility | HIGH | Official GitHub README + community confirmation (`@plugin` CSS directive) |
| `@vercel/analytics` v2.0.1 | HIGH | Verified against official Vercel docs + GitHub releases (2026-03-12) |
| `@vercel/speed-insights` v2.0.0 | HIGH | Verified against GitHub releases (2026-03-10) |
| `next/image` for portfolio | HIGH | Verified against official Next.js 16.2.1 docs, lastUpdated 2026-03-20 |
| Inline SVG for social icons | MEDIUM | Best practice pattern, no official source needed; tradeoff is clear |
| `next.config.mjs` rename required | MEDIUM | Stated in rehype-pretty-code docs and Next.js MDX guide; no counter-evidence found |

---

## Sources

- Next.js 16 MDX Guide (official, lastUpdated 2026-03-20): https://nextjs.org/docs/app/guides/mdx
- Next.js 16 Image Optimization (official, lastUpdated 2026-03-20): https://nextjs.org/docs/app/getting-started/images
- Vercel Analytics Quickstart (official): https://vercel.com/docs/analytics/quickstart
- Vercel Analytics Package Config v2 (official): https://vercel.com/docs/analytics/package
- @vercel/analytics GitHub releases: https://github.com/vercel/analytics/releases
- @vercel/speed-insights GitHub releases: https://github.com/vercel/speed-insights/releases
- rehype-pretty-code official docs: https://rehype-pretty.pages.dev/
- tailwindcss-typography GitHub: https://github.com/tailwindlabs/tailwindcss-typography
- next-mdx-remote limitations (community): https://www.mdxblog.io/blog/next-mdx-remote-limitations
