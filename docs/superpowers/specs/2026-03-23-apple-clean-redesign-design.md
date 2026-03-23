# Neurospark Marketing — Apple-Clean Full Redesign

## Overview

Full redesign of all 6 sections of the Neurospark Marketing website. Dropping the Three.js 3D scroll-driven experience in favor of a pure HTML/CSS site with GSAP scroll animations. Visual direction inspired by Apple.com: clean light theme, generous whitespace, premium typography, and minimal color accents.

## Design Decisions

- **No 3D**: Remove Three.js, React Three Fiber, Drei, and all 3D components. The site will be pure HTML/CSS with GSAP for scroll animations.
- **Light theme**: White (#ffffff) and near-white (#fafafa, #f5f5f7) backgrounds. Dark text (#1d1d1f). Muted gray (#6e6e73) for secondary text.
- **Blue accent**: Primary accent #0071e3 (Apple blue) for CTAs, links, and highlights.
- **Flowing layout**: Sections stack naturally with generous spacing. Only the hero is full viewport height.
- **Geist font**: Keep Geist Sans (body) and Geist Mono (code/labels). Already installed.
- **Tailwind CSS v4**: Keep Tailwind for utility classes. Define color tokens as CSS custom properties in globals.css and reference them in Tailwind utilities. Components use Tailwind classes for layout, spacing, typography.
- **GSAP ScrollTrigger**: Sections fade + slide up on scroll entry. Subtle, not flashy.
- **Remove Lenis**: Drop smooth scroll library. Use native scroll with CSS `scroll-behavior: smooth` + GSAP ScrollTrigger for animations.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| --background | #fafafa | Page background |
| --surface | #ffffff | Card backgrounds |
| --surface-alt | #f5f5f7 | Alternating section backgrounds |
| --text-primary | #1d1d1f | Headings, body text |
| --text-secondary | #6e6e73 | Subtitles, descriptions |
| --text-tertiary | #86868b | Labels, metadata |
| --accent | #0071e3 | CTAs, links, highlights |
| --border | #d2d2d7 | Card borders, dividers |
| --card-shadow | rgba(0,0,0,0.04) | Subtle card shadows |

## Typography

- **Hero headline**: 64–80px, weight 700, #1d1d1f, tight line-height (1.05)
- **Section headings**: 40–48px, weight 600, #1d1d1f
- **Card titles**: 18–20px, weight 600, #1d1d1f
- **Body text**: 15–17px, weight 400, #6e6e73, line-height 1.5
- **Labels**: 11–12px, uppercase, letter-spacing 0.08em, #86868b
- **All text**: Geist Sans. Monospace accents in Geist Mono where appropriate.

## Navigation

Sticky top bar, always visible:
- Background: white/80 with backdrop-blur-xl
- Thin bottom border (#d2d2d7)
- Left: "Neurospark" logo/wordmark
- Right: Section links (Services, Work, About, Contact) in #1d1d1f, hover #0071e3
- Far right: Blue pill CTA button "Get Started" (#0071e3 bg, white text, border-radius 980px)
- Mobile: Hamburger menu with slide-down panel
- Height: ~52px

## Section 1 — Hero

Full viewport height, centered content:
- Small uppercase label: "AI-POWERED CREATIVE AGENCY" in --text-tertiary, Geist Mono, 12px, tracking 0.08em
- Headline: "Where AI Meets Creativity." — 64–80px, weight 700, #1d1d1f
- Subtitle: "We craft brands, build digital experiences, and drive growth — powered by intelligence." — 17px, #6e6e73, max-width 520px, centered
- CTA row: Blue pill "Get Started" + text link "See our work →" in #0071e3
- Optional: subtle gradient wash or abstract shape below the fold (CSS only)
- No 3D elements, no particles, no neural network

## Section 2 — Services

Background: #fafafa (same as page)
- Section label: "WHAT WE DO" — small uppercase, Geist Mono
- Section heading: "Services" — 40–48px, weight 600, centered
- 3-column responsive grid (gap 24px), 2 rows = 6 cards
- Each card:
  - White background, 1px border (#d2d2d7), border-radius 16px
  - Padding 32px
  - Icon top: mapped from data field → Unicode: "diamond"→"◆", "cube"→"⬡", "play"→"▶", "nodes"→"◎", "target"→"◉", "document"→"▤". 32px, #1d1d1f
  - Title: 18px, weight 600, #1d1d1f
  - Description: 14px, #6e6e73, line-height 1.5
  - Hover: subtle shadow increase + slight translateY(-2px)
- Responsive: 2-col on tablet, 1-col on mobile
- Data source: services-data.ts (keep existing 6 services)

## Section 3 — Portfolio / Work

Background: #f5f5f7 (alternating)
- Section label: "OUR WORK" — small uppercase, Geist Mono
- Section heading: "Selected Work" — 40–48px, weight 600, centered
- 2-column grid (gap 24px), 3 rows = 6 project cards
- Each card:
  - White background, border-radius 16px, overflow hidden
  - Top: gradient/color placeholder area (200px height, using project's theme color at 10% opacity)
  - Category label: small uppercase, #0071e3, Geist Mono
  - Project name: 20px, weight 600, #1d1d1f
  - Description: 14px, #6e6e73
  - Tags: small pills (bg #f5f5f7, border #d2d2d7, border-radius 980px, 11px)
  - Hover: shadow + slight scale(1.01)
  - Click: navigates to `/work/[slug]` detail page (existing route at src/app/work/[slug]/page.tsx, to be restyled)
- Responsive: 1-col on mobile
- Data source: portfolio-data.ts (keep existing 6 projects)

## Section 4 — Testimonials

Background: #fafafa (same as page)
- Section label: "TESTIMONIALS" — small uppercase, Geist Mono
- Section heading: "What Our Clients Say" — 40–48px, weight 600, centered
- 2-column grid (gap 24px)
- Each testimonial card:
  - White background, 1px border (#d2d2d7), border-radius 16px
  - Padding 32px
  - Large blue opening quote mark (decorative, #0071e3 at 20% opacity)
  - Quote text: 16px, #1d1d1f, line-height 1.6, slight italic
  - Bottom: avatar circle (40px, colored initials) + name (weight 600) + "{role}, {company}" (#6e6e73)
  - Hover: subtle shadow
- Responsive: 1-col on mobile
- Data source: testimonials-data.ts (keep existing 4 testimonials)

## Section 5 — About / Team

Background: #f5f5f7 (alternating)
- Section label: "ABOUT US" — small uppercase, Geist Mono
- Section heading: "Who We Are" — 40–48px, weight 600, centered
- Mission paragraph: 17px, #6e6e73, max-width 640px, centered

### Stats Row
- 4 stats in a horizontal row, centered, gap 48px
- Each stat: large number (40px, weight 700, #1d1d1f) + label below (13px, #6e6e73)
- Values: 6+ Years, 200+ Projects, 85+ Clients, 12 Team Members
- Separated by thin vertical dividers on desktop
- Data source: team-data.ts (keep existing stats)

### Team Grid
- 3-column grid (gap 24px)
- Each member card:
  - White background, border-radius 16px, padding 24px, text-align center
  - Avatar circle (64px, colored initials or image)
  - Name: 16px, weight 600, #1d1d1f
  - Role: 13px, #6e6e73
  - Hover: subtle lift
- Responsive: 2-col on tablet, 1-col on mobile
- Data source: team-data.ts (keep existing 6 team members)

## Section 6 — Contact

Background: #f5f5f7 with a white card container centered
- Section label: "CONTACT" — small uppercase, Geist Mono
- Section heading: "Let's Work Together" — 40–48px, weight 600, centered
- Subtitle: "Tell us about your project and we'll get back to you within 24 hours." — #6e6e73

### Form (inside white card, border-radius 16px, padding 40px, subtle shadow)
- Fields:
  - Name: text input (required, min 2 chars)
  - Email: email input (required, valid email)
  - Project Type: select dropdown (Branding, Web Development, Video Production, Social Media, Paid Advertising, Content Strategy, Full Service)
  - Message: textarea, 4 rows (required, min 10 chars)
- Input styling: #f5f5f7 background, 1px #d2d2d7 border, border-radius 12px, 14px text, focus: border #0071e3
- Submit: blue pill button, full width, "Send Message". Shows loading spinner and disabled state during submission.
- Validation: Zod on client (react-hook-form) + server (API route — update server Zod schema to match simplified fields)
- Success state: green checkmark + "Thank you! We'll be in touch."
- Error state: red text below each field
- POST to /api/contact

## Footer

Background: #ffffff, top border (#d2d2d7)
- Left: "© {currentYear} Neurospark Marketing" (dynamic year via `new Date().getFullYear()`)
- Right: minimal links if needed
- Padding: 24px
- Text: 13px, #86868b

## Animations (GSAP ScrollTrigger)

- Each section fades in (opacity 0→1) and slides up (y: 40→0) when entering viewport
- Stagger children within grids (0.1s between cards)
- Duration: 0.6–0.8s, ease: "power2.out"
- Trigger: top of element hits 85% of viewport
- Cards: CSS transitions for hover (transform 0.2s, box-shadow 0.2s)
- Nav: transition opacity on scroll if needed

## Files to Remove

### 3D Components (delete entirely)
- src/components/3d/ParticleField.tsx
- src/components/3d/GridFloor.tsx
- src/components/3d/NeuralNetwork.tsx
- src/components/3d/FloatingCard.tsx
- src/components/3d/HolographicMaterial.tsx
- src/components/3d/NeonRing.tsx

### Canvas/Scene (delete entirely)
- src/components/canvas/Scene.tsx
- src/components/canvas/CameraRig.tsx
- src/components/canvas/PostProcessing.tsx
- src/components/canvas/SceneLoader.tsx
- src/components/canvas/Preloader.tsx

### UI Overlays (replaced by inline sections)
- src/components/ui/TestimonialsOverlay.tsx
- src/components/ui/AboutOverlay.tsx
- src/components/ui/ContactOverlay.tsx

### Hooks (no longer needed)
- src/components/hooks/useScrollProgress.ts
- src/components/hooks/useDeviceCapability.ts

### Other
- src/components/ui/SeoContent.tsx (content moves inline)
- src/components/ui/ClientOnly.tsx (no hydration issues without 3D)

## Files to Keep & Modify

- **src/app/page.tsx** — complete rewrite: Server Component with all 6 sections inline, imports data directly
- **src/app/layout.tsx** — update: remove dark class, keep Geist font, update metadata
- **src/app/globals.css** — complete rewrite: new light theme with Tailwind v4, remove all neon/glitch/scanline CSS
- **src/components/ui/Navigation.tsx** — restyle: frosted glass sticky nav, light theme
- **src/components/ui/ContactForm.tsx** — simplify fields (drop company, budget), restyle for light theme
- **src/components/ui/CTAButton.tsx** — restyle: blue pill button
- **src/lib/constants.ts** — strip all Three.js imports and 3D-specific exports (COLORS, SECTION_POSITIONS, CAMERA_WAYPOINTS, PARTICLES). Keep only plain string hex color values if needed, or gut entirely.
- **src/app/api/contact/route.ts** — update Zod schema to match simplified form fields (remove company and budget validation)
- **src/app/not-found.tsx** — restyle for light theme
- **src/app/work/[slug]/page.tsx** — restyle for light theme
- **src/components/sections/HeroSection.tsx** — complete rewrite: pure HTML hero (Server Component)
- **src/components/sections/ServicesSection.tsx** — complete rewrite: HTML grid (Server Component)
- **src/components/sections/PortfolioSection.tsx** — complete rewrite: HTML grid with links to /work/[slug] (Server Component)
- **src/components/sections/ContactSection.tsx** — complete rewrite: inline section with form

## Files to Keep Unchanged

- src/lib/services-data.ts
- src/lib/portfolio-data.ts
- src/lib/testimonials-data.ts
- src/lib/team-data.ts
- src/app/sitemap.ts
- src/app/robots.ts
- src/app/error.tsx
- src/app/loading.tsx
- src/app/icon.tsx
- src/app/opengraph-image.tsx
- src/app/work/[slug]/opengraph-image.tsx

## New Files

- **src/components/sections/TestimonialsSection.tsx** — new inline section (Server Component)
- **src/components/sections/AboutSection.tsx** — new inline section (Server Component)
- **src/components/sections/Footer.tsx** — new footer component (Server Component)
- **src/components/ui/ScrollAnimations.tsx** — 'use client' wrapper for GSAP ScrollTrigger initialization

## NPM Dependencies

### Remove
- three
- @types/three
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- postprocessing
- lenis

### Keep
- gsap, @gsap/react (for scroll animations)
- react-hook-form, @hookform/resolvers
- zod
- geist

### Add
- None expected

## Client/Server Boundaries

- All section components are **Server Components** (no 'use client')
- **'use client' only on**:
  - ContactForm.tsx (form interactivity)
  - ScrollAnimations.tsx (GSAP requires DOM access)
  - Navigation.tsx (mobile menu toggle, scroll detection)
