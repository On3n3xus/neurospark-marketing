# Requirements: Neurospark Marketing P0

**Defined:** 2026-03-23
**Core Value:** Convert visitors into leads by showing proof of results and making contact effortless

## v1 Requirements

### Quick Wins

- [ ] **QW-01**: Footer displays social media links (LinkedIn, Twitter/X, Instagram) with proper aria-labels and rel attributes
- [ ] **QW-02**: `.env.example` file documents all required environment variables with descriptions
- [ ] **QW-03**: Vercel Analytics component is installed and renders in root layout
- [ ] **QW-04**: Vercel Speed Insights component is installed and renders in root layout

### Portfolio

- [ ] **PORT-01**: Portfolio cards display high-quality gradient placeholder images instead of flat color blocks
- [ ] **PORT-02**: Portfolio images use `next/image` with blur placeholder for progressive loading
- [ ] **PORT-03**: Portfolio data type includes `image` field for future real image support
- [ ] **PORT-04**: Case study pages display project hero image at top

### Blog

- [ ] **BLOG-01**: Blog listing page at `/blog` displays all posts with title, date, author, reading time, and excerpt
- [ ] **BLOG-02**: Blog post pages at `/blog/[slug]` render MDX content with Tailwind typography styling
- [ ] **BLOG-03**: Blog uses `@next/mdx` with exported metadata objects (no gray-matter dependency)
- [ ] **BLOG-04**: `mdx-components.tsx` exists at project root mapping MDX elements to styled components
- [ ] **BLOG-05**: Each blog post calculates and displays reading time
- [ ] **BLOG-06**: Each blog post generates a dynamic OG image via `opengraph-image.tsx`
- [ ] **BLOG-07**: Each blog post includes JSON-LD Article schema in head
- [ ] **BLOG-08**: Sitemap includes all blog post URLs
- [ ] **BLOG-09**: Navigation includes "Blog" link
- [ ] **BLOG-10**: At least 2 seed blog posts ship with launch (real content, not lorem ipsum)
- [ ] **BLOG-11**: `@tailwindcss/typography` prose classes style blog content

## v2 Requirements

### Blog Enhancements

- **BLOG-V2-01**: Blog category/tag filtering
- **BLOG-V2-02**: Related posts section at bottom of each post
- **BLOG-V2-03**: Table of contents sidebar for long posts
- **BLOG-V2-04**: RSS feed at `/blog/feed.xml`
- **BLOG-V2-05**: Search functionality across blog posts

### Site Enhancements

- **SITE-V2-01**: Dark mode toggle
- **SITE-V2-02**: Newsletter signup form
- **SITE-V2-03**: Client logo carousel
- **SITE-V2-04**: FAQ section
- **SITE-V2-05**: Process/How We Work page

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS (Sanity, Contentful) | Static MDX files sufficient for current volume |
| Database | No dynamic content requiring persistence |
| Authentication | No client portal in v1 |
| Comments on blog | Adds moderation burden, low ROI for agency blog |
| GA4 / Google Analytics | Vercel Analytics is lighter, privacy-friendly, sufficient |
| react-icons package | Only 3 social icons needed — inline SVG is lighter |
| gray-matter package | Exported metadata objects avoid extra dependency |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| QW-01 | Phase 1 | Pending |
| QW-02 | Phase 1 | Pending |
| QW-03 | Phase 1 | Pending |
| QW-04 | Phase 1 | Pending |
| PORT-01 | Phase 2 | Pending |
| PORT-02 | Phase 2 | Pending |
| PORT-03 | Phase 2 | Pending |
| PORT-04 | Phase 2 | Pending |
| BLOG-01 | Phase 3 | Pending |
| BLOG-02 | Phase 3 | Pending |
| BLOG-03 | Phase 3 | Pending |
| BLOG-04 | Phase 3 | Pending |
| BLOG-05 | Phase 3 | Pending |
| BLOG-06 | Phase 3 | Pending |
| BLOG-07 | Phase 3 | Pending |
| BLOG-08 | Phase 3 | Pending |
| BLOG-09 | Phase 3 | Pending |
| BLOG-10 | Phase 3 | Pending |
| BLOG-11 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 after initial definition*
