# Architecture Patterns

**Domain:** Agency marketing website — MDX blog, portfolio image pipeline, analytics
**Researched:** 2026-03-23
**Overall confidence:** HIGH (sourced from local Next.js 16 docs at `node_modules/next/dist/docs/`)

---

## Current Architecture Baseline

The existing site is a statically-generated Next.js 16 App Router application. Key structural facts from the codebase:

- **Root layout** (`src/app/layout.tsx`): Server Component. Owns global metadata, JSON-LD, Geist font variables, `globals.css`. No analytics hooks yet.
- **Home page** (`src/app/page.tsx`): Server Component. Composes section components. No data fetching — all data is imported from TypeScript files in `src/lib/`.
- **Case study pages** (`src/app/work/[slug]/page.tsx`): Server Component. Uses `generateStaticParams` to pre-render all slugs from `portfolio-data.ts` at build time. Pattern: `params` is a `Promise<{ slug: string }>` — must be awaited (Next.js 16 App Router convention).
- **Data layer** (`src/lib/`): Pure TypeScript files (`portfolio-data.ts`, `services-data.ts`, etc.) — no database, no CMS, no runtime fetching.
- **Config** (`next.config.ts`): Minimal. Turbopack enabled via `turbopack: { root: "." }`. No `pageExtensions`, no `images` config yet.
- **Portfolio cards** (`PortfolioSection.tsx`): Color placeholder `div` used where project images will go — the image field does not yet exist on the `Project` type.

---

## Recommended Architecture for P0 Additions

### Three independent subsystems, one shared layout shell

```
src/
├── app/
│   ├── layout.tsx              ← ADD: <Analytics /> + <SpeedInsights /> here
│   ├── blog/
│   │   ├── layout.tsx          ← NEW: blog shell (nav + prose wrapper)
│   │   ├── page.tsx            ← NEW: blog index (reads metadata from MDX files)
│   │   └── [slug]/
│   │       └── page.tsx        ← NEW: dynamic MDX renderer
│   └── work/
│       └── [slug]/
│           └── page.tsx        ← MODIFY: swap color div for next/image
├── content/
│   └── blog/
│       ├── post-one.mdx        ← NEW: MDX source files live here, NOT in /app
│       └── post-two.mdx
├── lib/
│   ├── blog.ts                 ← NEW: metadata reader (fs + gray-matter)
│   └── portfolio-data.ts       ← MODIFY: add `image` field to Project type
├── components/
│   └── blog/
│       ├── PostCard.tsx        ← NEW: blog index card
│       └── ProseLayout.tsx     ← NEW: typography wrapper for MDX content
└── mdx-components.tsx          ← NEW: required by @next/mdx for App Router
```

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `src/app/layout.tsx` | Global shell: fonts, metadata, analytics scripts | All pages via `children`; injects `<Analytics />` and `<SpeedInsights />` as leaf Client Components |
| `src/app/blog/layout.tsx` | Blog-specific shell: Navigation + prose container | `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx` via `children` |
| `src/app/blog/page.tsx` | Blog index: renders list of `PostCard` components | Reads from `src/lib/blog.ts` (build-time metadata scan) |
| `src/app/blog/[slug]/page.tsx` | Individual post renderer | Dynamic-imports MDX file from `src/content/blog/`; uses `generateStaticParams` + `dynamicParams = false` |
| `src/lib/blog.ts` | Metadata extractor: scans `src/content/blog/` directory, reads frontmatter | Called server-side only at build time; returns typed array of `PostMeta` |
| `src/content/blog/*.mdx` | Authored content: frontmatter (title, date, description, slug) + MDX body | Consumed by `blog/[slug]/page.tsx` via dynamic import; metadata consumed by `blog/page.tsx` via `blog.ts` |
| `mdx-components.tsx` (project root) | Global MDX component overrides: maps `h1`/`h2`/`img` etc. to Tailwind-styled or `next/image` equivalents | Required by `@next/mdx`; applied to all MDX renders |
| `src/components/blog/ProseLayout.tsx` | Applies `@tailwindcss/typography` prose classes to MDX output | Used by `blog/layout.tsx` |
| `src/components/blog/PostCard.tsx` | Renders a blog post summary card for the index page | Receives `PostMeta` props from `blog/page.tsx` |
| `src/lib/portfolio-data.ts` | Project data + image paths | `PortfolioSection.tsx` (home page cards) and `work/[slug]/page.tsx` (case study hero) |
| `src/components/sections/PortfolioSection.tsx` | Portfolio grid with real images | Reads `projects` array; renders `next/image` inside card |
| `src/app/work/[slug]/page.tsx` | Case study detail | Reads `project.image`; renders `next/image` as hero |
| Vercel Analytics (`@vercel/analytics`) | Page-view tracking via Vercel dashboard | Injected in root layout as `<Analytics />` Client Component |
| Vercel Speed Insights (`@vercel/speed-insights`) | Core Web Vitals reporting to Vercel dashboard | Injected in root layout as `<SpeedInsights />` Client Component |

---

## Data Flow

### Blog system

```
Build time:
src/content/blog/*.mdx
    → src/lib/blog.ts (Node fs + gray-matter, server-only)
        → blog/page.tsx (static props → PostCard list)
        → blog/[slug]/page.tsx (generateStaticParams → static HTML per post)

Request time (pre-rendered, static):
Browser → Vercel CDN → cached HTML
```

### Portfolio images

```
Design tool / asset export
    → public/images/portfolio/[project-id].jpg  (or Cloudinary URL)
        → src/lib/portfolio-data.ts  (add `image: string` field)
            → PortfolioSection.tsx  (next/image with sizes prop)
            → work/[slug]/page.tsx  (next/image hero)
                → next/image  → Vercel Image Optimization API
                    → Browser (WebP/AVIF, responsive sizes)
```

### Analytics

```
Browser (client-side):
Root layout renders <Analytics /> and <SpeedInsights />
    → These are 'use client' leaf components (Client Components isolated to avoid
      making the entire layout a Client Component boundary)
        → Vercel Analytics API (page views, custom events)
        → Vercel Speed Insights API (Web Vitals: LCP, CLS, INP, FCP, TTFB)
```

---

## Patterns to Follow

### Pattern 1: Static MDX with dynamic import + `generateStaticParams`

**What:** MDX files live in `src/content/blog/`. The `[slug]/page.tsx` dynamically imports the correct file using `await import(\`@/content/blog/\${slug}.mdx\`)`. `generateStaticParams` enumerates all slugs at build time. `dynamicParams = false` forces 404 on unknown slugs.

**Why:** Avoids filesystem reads at request time. All posts become static HTML at build. Consistent with existing `work/[slug]` pattern in the codebase.

**Example (from official Next.js 16 docs):**
```tsx
// src/app/blog/[slug]/page.tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { default: Post } = await import(`@/content/blog/${slug}.mdx`)
  return <Post />
}

export function generateStaticParams() {
  // enumerate slugs from src/lib/blog.ts
}

export const dynamicParams = false
```

Note: `params` is a `Promise` in Next.js 16 — must be awaited. This matches the existing `work/[slug]/page.tsx` convention.

### Pattern 2: MDX frontmatter via exported `metadata` object

**What:** `@next/mdx` does not parse YAML frontmatter natively. Export a plain object from each MDX file instead:

```mdx
export const metadata = {
  title: 'Post Title',
  date: '2026-03-23',
  description: 'Brief description',
  slug: 'post-title',
}

# Post Title
...
```

**Why:** No additional dependencies (`gray-matter`, `remark-frontmatter`). Works with static imports. `src/lib/blog.ts` imports each MDX file's named `metadata` export at build time to build the index.

**Alternative:** If `gray-matter` is preferred for portability, use it in `src/lib/blog.ts` with `fs.readFileSync` — but this requires Node.js APIs and cannot run on the Edge.

### Pattern 3: Analytics as isolated Client Component leaves

**What:** `<Analytics />` and `<SpeedInsights />` are Client Components from `@vercel/analytics` and `@vercel/speed-insights`. They must be rendered in the root layout but must NOT convert the layout to a Client Component.

**Why:** The Next.js 16 analytics guide is explicit: "create a separate component that the root layout imports — this confines the client boundary exclusively to the WebVitals component." Same logic applies to Vercel's packages.

**Implementation:** Render `<Analytics />` and `<SpeedInsights />` directly in `layout.tsx` body — both packages handle the client boundary internally. No wrapper needed for Vercel's packages (they ship pre-configured Client Components).

### Pattern 4: next/image for portfolio visuals

**What:** Replace the color placeholder `div` in `PortfolioSection.tsx` and add a hero image to case study pages. Use `next/image` with proper `sizes` attribute.

**Why:** Vercel's Image Optimization API handles WebP/AVIF conversion, responsive resizing, and lazy loading for free on Vercel. Zero config needed for local `public/` images.

**Image storage decision:** Store images in `public/images/portfolio/` as static files. This keeps the "no runtime dependencies" constraint from PROJECT.md. No Cloudinary or external CDN needed for v1 volume.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: MDX files inside `/app` directory

**What:** Placing `.mdx` files directly as `page.mdx` inside `src/app/blog/[slug]/`.

**Why bad:** Mixing content with routing logic. Frontmatter export pattern becomes awkward. Harder to batch-read metadata for the index page. Does not match the project's existing pattern of separating data from routing.

**Instead:** Keep MDX in `src/content/blog/`, route files in `src/app/blog/`.

### Anti-Pattern 2: `pageExtensions` for MDX without scoping

**What:** Adding `'md'` and `'mdx'` to `pageExtensions` globally in `next.config.ts`.

**Why bad:** With Turbopack enabled, this changes how ALL files are treated. Can create unintended routes if any `.md` documentation files exist in the project. Also required for the dynamic-import pattern anyway — `pageExtensions` is only needed if MDX files ARE the page files.

**Instead:** Use the dynamic import pattern (`await import('@/content/blog/${slug}.mdx')`). This requires `pageExtensions` to include `'mdx'` only if using file-based routing for MDX — NOT required for the import pattern.

**Clarification:** The dynamic import pattern (`await import(...)`) DOES require MDX files to be processable by the webpack/Turbopack MDX loader, which means `@next/mdx` must be configured. But `pageExtensions` change is only needed if `.mdx` files serve as route handlers directly.

### Anti-Pattern 3: Client Component boundary on root layout

**What:** Adding `'use client'` to `layout.tsx` to use analytics hooks.

**Why bad:** Converts the entire layout subtree to client rendering, losing RSC benefits for all pages.

**Instead:** Analytics via `@vercel/analytics` and `@vercel/speed-insights` are already Client Components internally. Import and render them in the Server Component layout body.

### Anti-Pattern 4: Missing `mdx-components.tsx`

**What:** Setting up `@next/mdx` without creating `mdx-components.tsx` at the project root (alongside `src/`).

**Why bad:** This file is **required** by `@next/mdx` when using App Router. The app will fail to build without it.

**Instead:** Create `mdx-components.tsx` at `neurospark-marketing/mdx-components.tsx` (same level as `next.config.ts`, not inside `src/`).

---

## Build Order (Dependencies Between Components)

The three subsystems are largely independent but share one ordering constraint:

```
1. IMAGE PIPELINE  (no dependencies on blog or analytics)
   a. Add `image` field to Project type in portfolio-data.ts
   b. Export images to public/images/portfolio/
   c. Update PortfolioSection.tsx: color div → next/image
   d. Update work/[slug]/page.tsx: add hero next/image
   ↓
   Unblocks: visually complete portfolio before blog launch

2. ANALYTICS  (no dependencies on blog or images)
   a. npm install @vercel/analytics @vercel/speed-insights
   b. Add <Analytics /> and <SpeedInsights /> to layout.tsx body
   c. Verify in Vercel dashboard
   ↓
   Unblocks: baseline data collection before blog drives traffic

3. BLOG  (depends on: nothing, but benefits from analytics being live first)
   a. npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
   b. Update next.config.ts: wrap with createMDX, add pageExtensions
   c. Create mdx-components.tsx at project root
   d. Create src/lib/blog.ts (metadata reader)
   e. Create src/content/blog/ + first posts
   f. Create src/app/blog/layout.tsx (prose shell)
   g. Create src/app/blog/page.tsx (index)
   h. Create src/app/blog/[slug]/page.tsx (renderer)
   i. Update sitemap.ts to include /blog/* routes
   j. Add blog link to Footer and Navigation
```

**Why this order:**
- Images first: highest visual impact, zero new dependencies, validates the `Project` data shape before blog adds its own data patterns.
- Analytics second: trivial to add, gets tracking live before blog posts attract organic traffic.
- Blog last: most complex (new dependencies, config changes, new route tree), but building on a stable foundation. Also benefits from having analytics active to measure content performance from day one.

---

## next.config.ts Changes Required

The current config only has Turbopack. MDX requires two additions:

```ts
import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

Note: `next.config.ts` (TypeScript) is supported in Next.js 16. The `createMDX` import is ESM-compatible with `.ts` config files.

---

## Sitemap Extension

The existing `sitemap.ts` must be extended to include blog routes once posts exist. Pattern mirrors the existing project pages expansion:

```ts
// Add alongside existing projectPages mapping:
const blogPosts = getAllPosts().map((post) => ({
  url: `${BASE_URL}/blog/${post.slug}`,
  lastModified: new Date(post.date),
  changeFrequency: "monthly" as const,
  priority: 0.6,
}))
```

This keeps all SEO metadata centralized in one file, matching the existing convention.

---

## Sources

- Next.js 16 MDX guide: `node_modules/next/dist/docs/01-app/02-guides/mdx.md` (HIGH confidence — local official docs)
- Next.js 16 analytics guide: `node_modules/next/dist/docs/01-app/02-guides/analytics.md` (HIGH confidence)
- Next.js 16 instrumentation guide: `node_modules/next/dist/docs/01-app/02-guides/instrumentation.md` (HIGH confidence)
- Next.js 16 Image component: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (HIGH confidence)
- Existing codebase: `src/app/work/[slug]/page.tsx`, `src/lib/portfolio-data.ts`, `src/app/layout.tsx`, `next.config.ts` (HIGH confidence — direct inspection)
