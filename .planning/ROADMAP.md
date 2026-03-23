# Roadmap: Neurospark Marketing P0

## Overview

Three phases of additive improvements to an existing production site. Phase 1 ships analytics and social presence (zero dependencies, sub-hour tasks). Phase 2 replaces placeholder portfolio visuals with real images (highest conversion impact, no new packages). Phase 3 builds the MDX blog system (new route tree, new dependencies, most complex). Each phase is independently shippable and leaves the site better than it found it.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Quick Wins** - Ship analytics, social links, and env documentation with zero new dependencies
- [ ] **Phase 2: Portfolio Visuals** - Replace color placeholder blocks with real project images using next/image
- [ ] **Phase 3: MDX Blog** - Build the full blog system with listing page, post pages, OG images, and SEO

## Phase Details

### Phase 1: Quick Wins
**Goal**: The site tracks visitors, documents its environment variables, and shows social links in the footer
**Depends on**: Nothing (first phase)
**Requirements**: QW-01, QW-02, QW-03, QW-04
**Success Criteria** (what must be TRUE):
  1. Footer displays LinkedIn, Twitter/X, and Instagram icons that open in a new tab with correct aria-labels
  2. A visitor clicking a social icon lands on the correct Neurospark social profile
  3. `.env.example` exists at the repo root and documents every `process.env.*` variable used in the codebase
  4. Vercel Analytics and Speed Insights components render in the root layout and report page views to the Vercel dashboard
**Plans**: TBD

Plans:
- [ ] 01-01: Add social links to footer and Vercel Analytics/Speed Insights to root layout
- [ ] 01-02: Create .env.example documenting all environment variables

### Phase 2: Portfolio Visuals
**Goal**: Portfolio cards and case study pages display real project images instead of color placeholder blocks
**Depends on**: Phase 1
**Requirements**: PORT-01, PORT-02, PORT-03, PORT-04
**Success Criteria** (what must be TRUE):
  1. Each of the 6 portfolio cards shows a high-quality gradient or real project image (not a flat color block)
  2. Portfolio images progressively load with a blur placeholder before the full image appears
  3. Each case study page displays a project hero image at the top of the page
  4. The `Project` type in `portfolio-data.ts` includes an `image` field that accepts a string path
**Plans**: TBD

Plans:
- [ ] 02-01: Update portfolio data type, add images to public directory, and wire next/image into portfolio section and case study pages

### Phase 3: MDX Blog
**Goal**: The site has a functional blog at /blog with post listing and individual post pages, full SEO, and at least 2 published posts
**Depends on**: Phase 2
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06, BLOG-07, BLOG-08, BLOG-09, BLOG-10, BLOG-11
**Success Criteria** (what must be TRUE):
  1. Visiting /blog shows a listing of all posts with title, date, author, reading time, and excerpt
  2. Clicking a post loads the full MDX content styled with Tailwind typography prose classes
  3. Each post page includes a dynamic OG image and JSON-LD Article schema visible in page source
  4. The sitemap at /sitemap.xml includes all blog post URLs
  5. Navigation includes a "Blog" link that leads to /blog
**Plans**: TBD

Plans:
- [ ] 03-01: Install packages, configure next.config, create mdx-components.tsx, and build blog route tree
- [ ] 03-02: Create src/lib/blog.ts metadata reader, write 2 seed posts, and extend sitemap

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Quick Wins | 0/2 | Not started | - |
| 2. Portfolio Visuals | 0/1 | Not started | - |
| 3. MDX Blog | 0/2 | Not started | - |
