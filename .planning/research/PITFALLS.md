# Domain Pitfalls: Next.js 16 Blog, Portfolio Images, Analytics, Social Links

**Domain:** Agency website content system additions (MDX blog, portfolio images, analytics, social links)
**Researched:** 2026-03-23
**Stack context:** Next.js 16.2.1, React 19, Tailwind CSS 4, GSAP 3, App Router, Vercel
**Confidence:** MEDIUM-HIGH (WebSearch verified against official docs for most items)

---

## Critical Pitfalls

Mistakes that cause build failures, broken routes, or rewrites.

---

### Pitfall 1: Async Params in Next.js 16 Dynamic Routes

**What goes wrong:** Blog route `/blog/[slug]` uses `params.slug` synchronously. Works in development but breaks at build time or throws runtime errors in production.

**Why it happens:** Next.js 16 made `params` and `searchParams` fully async (Promises). Synchronous access was deprecated in v15 and fully removed in v16. The codemod exists but is imperfect — it leaves `@next-codemod-error` comments on cases it can't auto-resolve.

**Consequences:** Build fails or routes return `undefined` slugs. All dynamic MDX blog pages, case study pages, and any OG image generators (`opengraph-image.tsx`) are affected.

**Warning signs:**
- `params.slug` returns `undefined` at runtime
- TypeScript types show `params` as `Promise<{ slug: string }>`
- Existing `/work/[slug]` pages on this site already handle async params — check their pattern first

**Prevention strategy:** Write all new dynamic route components as `async` functions and `await params` before destructuring:
```typescript
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // ...
}
```
Apply the same pattern to `generateMetadata`, `generateStaticParams`, `opengraph-image.tsx`, and route handlers.

**Phase:** Blog implementation (MDX `/blog/[slug]` route)

---

### Pitfall 2: `mdx-components.tsx` Missing or Misplaced

**What goes wrong:** `@next/mdx` silently fails or throws a cryptic error because `mdx-components.tsx` is absent or placed inside `src/app/` instead of at the project root (or `src/` root if using `src/` layout).

**Why it happens:** `@next/mdx` with App Router requires this file as a hard convention. It is not auto-created by any installer. Many tutorials skip it or show it in the wrong location.

**Consequences:** Custom component overrides (code blocks, headings, callout boxes) don't apply. Blog posts render unstyled or throw module resolution errors.

**Warning signs:**
- MDX pages render raw HTML elements without Tailwind prose styles
- `Error: You're importing a component that needs useState` inside MDX content
- No `mdx-components.tsx` at `/Users/nexus/Documents/Neurospark Marketing/neurospark-marketing/src/mdx-components.tsx` or project root

**Prevention strategy:** Create `mdx-components.tsx` at `src/` level (same level as `app/`) before wiring up any MDX content. Map standard HTML elements to Tailwind-styled versions here — this is where `prose` typography overrides live.

**Phase:** MDX setup (before writing first blog post)

---

### Pitfall 3: `@next/mdx` Frontmatter Not Supported by Default

**What goes wrong:** Blog posts use YAML frontmatter (`title`, `date`, `description`) expecting it to be available as metadata, but `@next/mdx` doesn't parse frontmatter natively. Frontmatter renders as visible text at the top of the page.

**Why it happens:** `@next/mdx` treats MDX files as page components, not data sources. Frontmatter parsing requires an additional `remark-frontmatter` + `remark-mdx-frontmatter` plugin pair wired into `next.config.ts`.

**Consequences:** Post titles and dates either don't work, render as raw YAML, or require a completely different metadata extraction strategy mid-project.

**Warning signs:**
- `---` and YAML content appear at the top of rendered blog posts
- `export const metadata` is missing from blog MDX files
- No `remarkPlugins` configured in `next.config.ts`

**Prevention strategy:** Decide upfront: either use `export const metadata = {}` inside each MDX file (the `@next/mdx` native pattern — cleaner, no extra deps) or configure `remark-frontmatter` + `remark-mdx-frontmatter` in `next.config.ts` before writing any posts. Mixing approaches mid-project creates inconsistency. The `export const metadata` pattern is preferred for App Router.

**Phase:** MDX setup / first blog post structure

---

### Pitfall 4: Blog Posts Not Included in Sitemap

**What goes wrong:** The existing `sitemap.ts` lists static routes only. New blog posts at `/blog/[slug]` never appear in the sitemap, meaning search engines don't discover them.

**Why it happens:** `sitemap.ts` must be updated to dynamically read all MDX files and generate entries. This is a separate step from creating the blog route — easy to defer and forget.

**Consequences:** Blog content is technically published but invisible to search engines until the sitemap is fixed. SEO value of the content investment is lost.

**Warning signs:**
- `sitemap.ts` returns a hardcoded array with no `/blog/` entries
- Google Search Console shows no indexed blog pages after launch

**Prevention strategy:** Update `sitemap.ts` in the same PR as the blog implementation — not a separate task. Use `fs.readdirSync` or a content helper to enumerate MDX files and map them to sitemap entries with `lastModified` from `fs.stat`.

**Phase:** Blog implementation (same phase as route creation)

---

### Pitfall 5: `metadataBase` Missing — OG Images Become Relative URLs

**What goes wrong:** Blog posts have `generateMetadata` returning `openGraph.images` as a relative path (`/og/blog-post`). Social platforms (LinkedIn, Twitter) can't fetch relative URLs and show blank previews.

**Why it happens:** Next.js requires `metadataBase` set in root `layout.tsx` to resolve relative OG image URLs to absolute. This site already has OG images (`opengraph-image.tsx`) — if `metadataBase` isn't set, any new blog OG metadata will be broken even though existing static OG files work.

**Consequences:** Blog posts shared on LinkedIn or Twitter show no preview image. Trust and click-through rates drop.

**Warning signs:**
- Sharing a blog URL on LinkedIn shows no image card
- OG Debugger (Facebook, LinkedIn) reports image URL as relative

**Prevention strategy:** Verify `metadataBase` is already in root `layout.tsx` before adding blog `generateMetadata`. If absent, add it at the start of the blog phase: `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com')`.

**Phase:** Blog implementation / metadata setup

---

## Moderate Pitfalls

Mistakes that degrade quality, performance, or DX without causing complete failures.

---

### Pitfall 6: Global MDX Component Map Inflates Every Page Bundle

**What goes wrong:** Heavy components (charts, embeds, interactive demos) are registered in `mdx-components.tsx` globally. Every blog page pays the bundle cost of every component, even posts that don't use them.

**Why it happens:** `mdx-components.tsx` is loaded for all MDX pages. Registering a 200KB chart library globally means 200KB loads on a simple text post.

**Prevention strategy:** Keep `mdx-components.tsx` to lightweight, always-needed components (headings, code blocks, callout boxes). Use `next/dynamic` with `{ ssr: false }` for any heavy interactive components and import them inline in specific MDX files only.

**Phase:** MDX component design

---

### Pitfall 7: `next/image` Missing `width`/`height` Causes Layout Shift (CLS)

**What goes wrong:** Portfolio images added with `<Image>` but without explicit `width`/`height` (or `fill` + a positioned container) cause layout shift. Lighthouse CLS score drops; Core Web Vitals fail.

**Why it happens:** `next/image` can't reserve space for images without sizing info. Portfolio project images — which are being added to replace color placeholders — are a common source of this because they often have irregular aspect ratios.

**Warning signs:**
- Images pop in after page load, pushing content down
- Lighthouse CLS > 0.1
- `Error: Image is missing required "width" property` in console

**Prevention strategy:** Every `<Image>` must have `width` and `height` OR use `fill` with a parent that has `position: relative` and explicit dimensions. For portfolio cards with variable-ratio images, use `fill` with `aspect-ratio` on the container. Only set `priority` on the single above-the-fold hero image per page.

**Phase:** Portfolio image implementation

---

### Pitfall 8: `remotePatterns` Not Configured for External Portfolio Images

**What goes wrong:** Portfolio images hosted externally (e.g., client CDN, Cloudinary, Unsplash) trigger `Error: Invalid src prop` because `next.config.ts` doesn't have `remotePatterns` configured.

**Why it happens:** `next/image` blocks external hostnames by default as a security measure. The deprecated `images.domains` array still appears in older tutorials — mixing it with `remotePatterns` causes conflicts.

**Warning signs:**
- `Error: Invalid src prop ... hostname "..." is not configured under images` in browser
- Images work locally but fail on Vercel

**Prevention strategy:** Use only `remotePatterns` (not `domains`) in `next.config.ts`. Add patterns before placing any external image. Always include `protocol` and `hostname`; add `port` if using localhost during development.

**Phase:** Portfolio image implementation

---

### Pitfall 9: Vercel Analytics Loaded Without Consent Mechanism (GDPR Risk)

**What goes wrong:** `<Analytics />` component added unconditionally to root layout. Users who opt out of tracking are still tracked. In EU markets, this violates GDPR.

**Why it happens:** The Vercel Analytics quickstart shows unconditional placement. GDPR consent is not built into the component.

**Warning signs:**
- No cookie consent banner on the site
- `<Analytics />` renders on every page regardless of user preference

**Prevention strategy:** For an agency site serving EU clients, wrap `<Analytics />` in a consent-aware component that checks consent state before rendering. At minimum, add a cookie consent banner before enabling analytics. If the site has no EU traffic and consent is not a current requirement, document the decision explicitly in project notes.

**Phase:** Analytics integration

---

### Pitfall 10: Tailwind CSS 4 Typography Plugin Requires Different Setup

**What goes wrong:** `@tailwindcss/typography` installed and `prose` classes added to MDX wrappers, but no styling appears. Tailwind CSS 4 changed the plugin configuration API.

**Why it happens:** Tailwind CSS 4 moves to a CSS-first configuration model. The `require('@tailwindcss/typography')` pattern in `tailwind.config.js` no longer applies — the plugin is now imported via `@import "@tailwindcss/typography"` in CSS or via `@plugin` directive. Many tutorials still show the v3 approach.

**Warning signs:**
- `prose` class has no effect on MDX content
- No typography styles visible in rendered blog posts
- Console shows no errors (silent failure)

**Prevention strategy:** Check `@tailwindcss/typography` docs for the v4 integration pattern before installing. The `@plugin` directive approach is the correct path for this project's Tailwind CSS 4 setup. Restart the dev server after any plugin changes — Tailwind CSS 4 doesn't always hot-reload config changes.

**Phase:** MDX blog styling

---

### Pitfall 11: GSAP ScrollTrigger Hydration Errors on Blog Pages

**What goes wrong:** Blog post pages share the same root layout as the existing animated homepage. GSAP ScrollTrigger injects a `style` attribute on `<body>` during SSR, causing React hydration mismatches.

**Why it happens:** This project already uses `@gsap/react` and `ScrollTrigger` on all sections. Blog pages that don't initialize any ScrollTrigger can still inherit hydration issues from the root layout if GSAP registration runs server-side.

**Warning signs:**
- `Error: Hydration failed because the initial UI does not match what was rendered on the server` on blog pages
- `Extra attributes from the server: style` warning

**Prevention strategy:** GSAP registration (`ScrollTrigger.register`) must only run client-side. Use the existing `useGSAP()` pattern already in the project — don't move GSAP initialization to module scope or global layout. Call `ScrollTrigger.refresh()` after any dynamic content loads (e.g., after MDX content mounts) to realign trigger positions.

**Phase:** Blog implementation (verify no new hydration issues introduced)

---

## Minor Pitfalls

Mistakes that cause friction or inconsistency without breaking functionality.

---

### Pitfall 12: Social Link `rel` Attributes Missing

**What goes wrong:** Footer social links to LinkedIn, Twitter/X, Instagram use plain `<a href="...">` without `rel="noopener noreferrer"`. Opens security vulnerability (reverse tabnapping) and may affect SEO if `nofollow` is desired.

**Prevention strategy:** All external social links must include `rel="noopener noreferrer"`. Use `target="_blank"` with it. Add `aria-label` for accessibility (screen readers need descriptive labels for icon-only links).

**Phase:** Social links implementation

---

### Pitfall 13: `.env.example` Missing Variables Causes Broken Deployments

**What goes wrong:** New environment variables added during blog/analytics work (`NEXT_PUBLIC_SITE_URL` for metadataBase, any new analytics IDs) aren't documented in `.env.example`. Next developer (or future deployment) breaks because required vars are missing.

**Prevention strategy:** Update `.env.example` in the same commit as any code that reads a new `process.env.*` variable. This is listed as an explicit Active requirement in PROJECT.md — treat it as a definition-of-done gate for every phase.

**Phase:** All phases (enforce as done-criteria)

---

### Pitfall 14: Blog Route Conflicts with Existing `/work/[slug]` Route

**What goes wrong:** New `/blog/[slug]` and existing `/work/[slug]` both use `generateStaticParams`. If slugs overlap (e.g., a blog post slug matches a case study slug), or if the sitemap logic conflates them, routes return wrong content.

**Prevention strategy:** Blog slugs and work slugs live in separate route namespaces (`/blog/` vs `/work/`) — no functional conflict. But the sitemap and any "all posts" listing utilities must query only their respective content directories. Keep blog content at `src/app/blog/[slug]/` and case study content at `src/app/work/[slug]/` without shared utility functions that scan both.

**Phase:** Blog implementation

---

## Phase-Specific Warnings

| Phase Topic | Pitfall | Mitigation |
|---|---|---|
| MDX setup | `mdx-components.tsx` missing | Create before any other MDX work |
| MDX setup | Frontmatter strategy not decided | Choose `export const metadata` pattern upfront |
| MDX setup | `next.config.ts` not updated with `@next/mdx` | Add `withMDX` wrapper before writing posts |
| Blog route | Async params in Next.js 16 | Use `await params` pattern; check existing `/work/[slug]` as reference |
| Blog route | Sitemap not updated | Update `sitemap.ts` in same PR as route |
| Blog route | `metadataBase` missing | Verify in root layout before adding OG metadata |
| Blog styling | Tailwind CSS 4 typography plugin | Use `@plugin` directive, not v3 `require()` |
| Blog styling | Heavy components in global MDX map | Use `next/dynamic` for anything >50KB |
| Portfolio images | CLS from unsized images | Always provide `width`/`height` or `fill` |
| Portfolio images | External images blocked | Configure `remotePatterns` first |
| Analytics | Unconditional tracking | Add consent check or document GDPR decision |
| Analytics | `NEXT_PUBLIC_*` vars missing | Update `.env.example` immediately |
| Social links | Missing `rel` attributes | `rel="noopener noreferrer"` + `aria-label` on all |
| All phases | `.env.example` drift | Enforce as definition-of-done |

---

## Sources

- [Next.js MDX Guide (official)](https://nextjs.org/docs/app/guides/mdx) — HIGH confidence
- [Next.js 16 Upgrade Guide (official)](https://nextjs.org/docs/app/guides/upgrading/version-16) — HIGH confidence
- [Async params/searchParams in Next.js 16 — DEV Community](https://dev.to/peterlidee/async-params-and-searchparams-in-next-16-5ge9) — MEDIUM confidence
- [App Router Pitfalls: imidef.com (Feb 2026)](https://imidef.com/en/2026-02-11-app-router-pitfalls) — MEDIUM confidence
- [Fixing Broken Dynamic Routes After Upgrading to Next.js 16](https://coffey.codes/articles/fixing-broken-routes-after-nextjs-16-upgrade) — MEDIUM confidence
- [Next.js generateMetadata (official)](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — HIGH confidence
- [Next.js Image Component (official)](https://nextjs.org/docs/app/api-reference/components/image) — HIGH confidence
- [Vercel Analytics Quickstart (official)](https://vercel.com/docs/analytics/quickstart) — HIGH confidence
- [GDPR-Compliant Vercel Analytics Integration](https://www.buildwithmatija.com/blog/gdpr-compliant-vercel-analytics) — MEDIUM confidence
- [@next/mdx vs next-mdx-remote comparison](https://www.cyishere.dev/blog/next-mdx-or-next-mdx-remote) — MEDIUM confidence
- [MDX Integration Strategies — LogRocket](https://blog.logrocket.com/mdx-integration-strategies-next-js/) — MEDIUM confidence
- [GSAP ScrollTrigger hydration error in Next.js 15 — GSAP Community](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/) — MEDIUM confidence
- [Tailwind CSS Typography + Next.js MDX — GitHub Discussion](https://github.com/vercel/next.js/discussions/44252) — MEDIUM confidence
- [Next.js searchParams Disables Static Generation — buildwithmatija.com](https://www.buildwithmatija.com/blog/nextjs-searchparams-static-generation-fix) — MEDIUM confidence
- [React Server Components Performance Mistakes — LogRocket](https://blog.logrocket.com/react-server-components-performance-mistakes) — MEDIUM confidence
