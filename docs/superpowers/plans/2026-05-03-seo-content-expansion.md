# SEO Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 16 new SEO-optimized pages (6 industry pillars + 6 service clusters + 4 blog posts) plus 2 index pages, plus a /blog refactor to TERMINAL.OS theme, in two atomic deploy waves.

**Architecture:** Pillar+cluster SEO model. Industry pillars are deep (~1,500w) and target `[vertical] marketing agency Minneapolis`. Service clusters are shorter (~600w) and link UP to industries. Blog posts link UP to whichever pillar/cluster they support. All pages wrapped in existing `TerminalShell`; routes use dynamic `[slug]` patterns matching the existing `/work/[slug]` setup.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, MDX (existing `@next/mdx`), `next/og` for dynamic OG images, JSON-LD via `<script type="application/ld+json">`, no test framework (verification is visual + structural).

**Spec:** [`docs/superpowers/specs/2026-05-03-seo-content-expansion-design.md`](../specs/2026-05-03-seo-content-expansion-design.md)

**Project root:** `/Users/nexus/Documents/ Vibe Coding Projects/Neurospark Marketing/neurospark-marketing/`

---

## File structure (locked before tasks)

### New files

```
src/lib/industries-data.ts                              # 6 industries, full content
src/components/terminal/FAQ.tsx                          # accordion + FAQPage JSON-LD
src/components/terminal/PillarChips.tsx                  # cross-link strip
src/components/terminal/PillarPage.tsx                   # 7-section industry layout
src/components/terminal/ServiceDetailPage.tsx            # 6-section service layout
src/components/terminal/BlogTerminalShell.tsx            # dark MDX article wrapper
src/components/terminal/JsonLd.tsx                       # generic <script type="application/ld+json">
src/app/services/[slug]/page.tsx                         # dynamic service detail
src/app/services/[slug]/opengraph-image.tsx              # per-service OG
src/app/industries/page.tsx                              # industries index
src/app/industries/[slug]/page.tsx                       # dynamic industry detail
src/app/industries/[slug]/opengraph-image.tsx            # per-industry OG
src/content/blog/how-ai-marketing-agents-work.mdx        # new blog post
src/content/blog/dental-practice-marketing-2026.mdx      # new blog post
src/content/blog/hvac-lead-generation-with-ai.mdx        # new blog post
src/content/blog/local-real-estate-seo-playbook.mdx      # new blog post
```

### Modified files

```
src/lib/services-data.ts          # extend Service type with seo + content fields, add TIERS
src/lib/terminal-data.ts          # add 'industries' to TERMINAL_ROUTES
src/lib/blog.ts                   # add 4 new BlogPost entries
src/components/terminal/SubNav.tsx                # add industries to HREF map
src/components/terminal/Footer.tsx                # add INDUSTRIES column
src/components/terminal/ServicesGrid.tsx          # wrap cards in <Link>
src/app/services/page.tsx                         # restructure as index (still renders ServicesGrid + PricingGrid)
src/app/blog/page.tsx                             # refactor to TerminalShell
src/app/blog/[slug]/page.tsx                      # refactor to TerminalShell + dark prose
src/app/sitemap.ts                                # include all new URLs
```

---

# Wave 1 — Foundations

Goal: ship the engine — components, data shapes, /blog refactor — without yet exposing the new content surface. One atomic commit at the end.

---

## Task 1: Extend `services-data.ts` with SEO fields and TIERS constant

**Files:**
- Modify: `src/lib/services-data.ts`

- [ ] **Step 1: Read the current file**

```bash
cat src/lib/services-data.ts
```

Expected: 6 services with `id`, `title`, `description`, `icon`. No SEO fields.

- [ ] **Step 2: Replace the file with the extended version**

Write to `src/lib/services-data.ts`:

```typescript
export type ServiceSlug =
  | "ai-agents"
  | "content-engine"
  | "paid-media-ai"
  | "brand-intel"
  | "growth-automation"
  | "revenue-forecast";

export type IndustrySlug =
  | "dental-marketing-minneapolis"
  | "med-spa-marketing-minneapolis"
  | "real-estate-marketing-minneapolis"
  | "hvac-marketing-minneapolis"
  | "plumbing-marketing-minneapolis"
  | "roofing-marketing-minneapolis";

export interface Service {
  // Legacy fields (still used by existing site copy where present)
  id: string;
  title: string;
  description: string;
  icon: string;

  // New fields
  slug: ServiceSlug;
  code: string;                      // e.g. "01"
  name: string;                      // e.g. "AI AGENTS"
  tag: string;                       // e.g. "autonomous · 24/7"
  metric: string;                    // e.g. "+340%"
  metricLabel: string;               // e.g. "pipeline / qtr"
  shortDesc: string;                 // 1-line tagline for cards
  longDescription: string;           // 2-3 paragraphs for detail page hero/what
  targetKeyword: string;             // primary SEO target
  secondaryKeywords: string[];       // 2-4 supporting keywords
  industriesServed: IndustrySlug[];  // for PillarChips on detail page
  includedInTiers: ("STARTER" | "OPERATOR" | "COMMAND")[];
}

export interface Tier {
  tier: "STARTER" | "OPERATOR" | "COMMAND";
  price: string;
  mo: string;
  mods: string;
  best: string;
  recommended?: boolean;
}

export const TIERS: Tier[] = [
  { tier: "STARTER",  price: "$8K",  mo: "/mo", mods: "2 modules",   best: "For teams of 2–10" },
  { tier: "OPERATOR", price: "$22K", mo: "/mo", mods: "4 modules",   best: "For teams of 10–50", recommended: true },
  { tier: "COMMAND",  price: "$48K", mo: "/mo", mods: "All 6 modules", best: "For teams of 50+" },
];

const ALL_INDUSTRIES: IndustrySlug[] = [
  "dental-marketing-minneapolis",
  "med-spa-marketing-minneapolis",
  "real-estate-marketing-minneapolis",
  "hvac-marketing-minneapolis",
  "plumbing-marketing-minneapolis",
  "roofing-marketing-minneapolis",
];

export const services: Service[] = [
  {
    id: "ai-agents",
    slug: "ai-agents",
    code: "01",
    name: "AI AGENTS",
    title: "AI Agents",
    tag: "autonomous · 24/7",
    icon: "diamond",
    description:
      "Always-on agents that handle outbound, support and SEO research while your team sleeps.",
    shortDesc: "Always-on outbound, inbound, and research agents.",
    longDescription:
      "Neurospark deploys named agents — Aria for outbound, Beam for content, Helix for paid — each trained on your CRM, brand voice and product data. They don't sit in a slide deck waiting for approval; they live in your stack and ship work every hour. Most clients run 3–4 agents in parallel and replace 2–3 contractor seats within the first quarter.",
    metric: "+340%",
    metricLabel: "pipeline / qtr",
    targetKeyword: "AI marketing agent",
    secondaryKeywords: ["marketing automation agent", "AI outbound agent", "AI sales agent"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["STARTER", "OPERATOR", "COMMAND"],
  },
  {
    id: "content-engine",
    slug: "content-engine",
    code: "02",
    name: "CONTENT ENGINE",
    title: "Content Engine",
    tag: "generative · multi-channel",
    icon: "cube",
    description:
      "Brand-trained models writing site copy, ads and posts indistinguishable from your senior editor.",
    shortDesc: "Brand-trained generative content for site, ads, and social.",
    longDescription:
      "Most generative content reads like generative content. Ours doesn't, because we fine-tune on your existing high-performing copy, your product knowledge base, and a style guide we extract in week one. The Content Engine ships site copy, ad variants, social posts, email sequences and SEO briefs — at 8x the velocity of a human writer, with a senior editor's voice.",
    metric: "8.4x",
    metricLabel: "output velocity",
    targetKeyword: "AI content marketing agency",
    secondaryKeywords: ["AI blog writing", "generative content marketing", "AI copywriter"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["OPERATOR", "COMMAND"],
  },
  {
    id: "paid-media-ai",
    slug: "paid-media-ai",
    code: "03",
    name: "PAID MEDIA AI",
    title: "Paid Media AI",
    tag: "predictive · self-tuning",
    icon: "play",
    description:
      "Bidding agents that re-allocate spend across Google, Meta and TikTok every 90 seconds.",
    shortDesc: "Self-tuning bidding agents across Google, Meta, TikTok.",
    longDescription:
      "The Paid Media AI module is a bidding agent that watches your campaigns at 90-second granularity and reallocates spend toward the placements actually converting. It plugs into Google Ads, Meta Ads Manager and TikTok Ads, ingests your CRM conversion data, and runs a self-tuning loop that drops CPA 30–45% in the first quarter for most accounts.",
    metric: "−42%",
    metricLabel: "cpa average",
    targetKeyword: "AI ad management",
    secondaryKeywords: ["automated PPC", "AI Google Ads management", "AI ad bidding"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["OPERATOR", "COMMAND"],
  },
  {
    id: "brand-intel",
    slug: "brand-intel",
    code: "04",
    name: "BRAND INTEL",
    title: "Brand Intel",
    tag: "real-time · listening",
    icon: "nodes",
    description:
      "A neural map of every mention, review and competitor move. Updated continuously.",
    shortDesc: "Real-time monitoring of mentions, reviews, and competitor moves.",
    longDescription:
      "Brand Intel is a continuously-updated map of every mention, review, competitor launch and category signal that matters to you. It triages new reviews to whoever should respond, flags negative-sentiment spikes within minutes, and feeds the Content Engine with the topics your audience is actually talking about — not the topics a planner guessed at last quarter.",
    metric: "12k",
    metricLabel: "signals / day",
    targetKeyword: "brand monitoring software",
    secondaryKeywords: ["AI brand intelligence", "social listening tool", "review monitoring"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["COMMAND"],
  },
  {
    id: "growth-automation",
    slug: "growth-automation",
    code: "05",
    name: "GROWTH AUTOMATION",
    title: "Growth Automation",
    tag: "workflows · integrations",
    icon: "target",
    description:
      "AI-routed CRM, inbox triage and lifecycle journeys. From lead to loyal in zero touch.",
    shortDesc: "AI-routed CRM, inbox triage, and lifecycle journeys.",
    longDescription:
      "Growth Automation is the connective tissue. We wire your CRM, inbox, calendar, payment system and product analytics into a single graph of your customer's journey, then deploy automation agents that handle the touches a human would otherwise miss — recall calls, re-engagement emails, NPS follow-ups, win-back sequences. Most clients automate 90%+ of lifecycle touches without losing the personal feel.",
    metric: "94%",
    metricLabel: "tasks automated",
    targetKeyword: "marketing automation agency",
    secondaryKeywords: ["AI lifecycle marketing", "CRM automation", "lead routing AI"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["OPERATOR", "COMMAND"],
  },
  {
    id: "revenue-forecast",
    slug: "revenue-forecast",
    code: "06",
    name: "REVENUE FORECAST",
    title: "Revenue Forecast",
    tag: "simulation · attribution",
    icon: "document",
    description:
      "Monte-Carlo models project the next 4 quarters under any scenario you type into the prompt.",
    shortDesc: "Monte-Carlo revenue projections under any scenario.",
    longDescription:
      "Revenue Forecast is a simulation layer over your marketing data. Type a scenario into the prompt — \"what if we 3x ad spend in Q3 and add a referral program?\" — and it runs a Monte-Carlo projection across the next 4 quarters with explicit confidence intervals. CFOs use it to defend marketing spend; founders use it to know which lever to pull next.",
    metric: "±3.1%",
    metricLabel: "forecast error",
    targetKeyword: "marketing revenue forecasting",
    secondaryKeywords: ["marketing attribution AI", "revenue projection software"],
    industriesServed: ALL_INDUSTRIES,
    includedInTiers: ["COMMAND"],
  },
];
```

- [ ] **Step 3: Run typecheck via build to confirm no type breakage**

```bash
npx tsc --noEmit
```

Expected: clean (no errors). The `services` array still has `id`, `title`, `description`, `icon` so any existing consumers (homepage `ServicesGrid` and `/services/page.tsx`) still work.

---

## Task 2: Create `industries-data.ts` with stub records for all 6 industries

**Files:**
- Create: `src/lib/industries-data.ts`

The stubs ship in Wave 1 so the data shape is locked. Wave 2 fills in the long-form content.

- [ ] **Step 1: Create the file**

Write to `src/lib/industries-data.ts`:

```typescript
import type { ServiceSlug, IndustrySlug } from "./services-data";

export type Vertical = "medical" | "real-estate" | "home-services";

export interface Industry {
  slug: IndustrySlug;
  name: string;                            // e.g. "Dental Practices"
  vertical: Vertical;
  hero: {
    headline: string;                      // H1, contains primary keyword
    subhead: string;
    metricBadge?: string;                  // e.g. "12 dental clients · +280% new patient volume avg"
  };
  problem: { paragraphs: string[] };       // 3 paragraphs
  servicesUsed: ServiceSlug[];             // 4 of 6 — the cards rendered in SOLUTION section
  stack: {
    description: string;                   // 1 paragraph
    integrations: string[];                // e.g. ["Dentrix", "Open Dental", "Weave"]
  };
  proof: {
    caseQuote: string;                     // benchmark statement (per spec decision)
    clientLabel: string;                   // e.g. "Industry benchmark, 12 dental engagements"
  };
  faq: { q: string; a: string }[];         // 6 entries for FAQPage schema
  cta: {
    label: string;                         // e.g. "Book a 15-min dental practice audit"
    subcopy: string;
  };
  targetKeyword: string;                   // primary
  secondaryKeywords: string[];             // 2-3 supporting
}

// Wave 1 stubs — shape only, with target keyword. Long-form content fills in Wave 2.
const STUB_PARAS = ["Wave 2 placeholder.", "Wave 2 placeholder.", "Wave 2 placeholder."];
const STUB_FAQ = [1, 2, 3, 4, 5, 6].map((n) => ({
  q: `Wave 2 placeholder question ${n}`,
  a: `Wave 2 placeholder answer ${n}`,
}));

export const industries: Industry[] = [
  {
    slug: "dental-marketing-minneapolis",
    name: "Dental Practices",
    vertical: "medical",
    hero: {
      headline: "AI Marketing for Minneapolis Dental Practices",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "brand-intel"],
    stack: { description: "Wave 2 placeholder", integrations: ["Dentrix", "Open Dental", "Weave"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min dental practice audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "dental marketing agency Minneapolis",
    secondaryKeywords: ["dental SEO Minnesota", "AI for dental practices"],
  },
  {
    slug: "med-spa-marketing-minneapolis",
    name: "Med Spas & Aesthetic Clinics",
    vertical: "medical",
    hero: {
      headline: "AI Marketing for Minneapolis Med Spas",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "content-engine", "brand-intel"],
    stack: { description: "Wave 2 placeholder", integrations: ["Aesthetic Record", "Boulevard", "Mindbody"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min med spa marketing audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "med spa marketing agency Minneapolis",
    secondaryKeywords: ["aesthetic clinic marketing Minnesota", "med spa AI marketing"],
  },
  {
    slug: "real-estate-marketing-minneapolis",
    name: "Real Estate & Property",
    vertical: "real-estate",
    hero: {
      headline: "AI Marketing for Minneapolis Real Estate",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "content-engine", "growth-automation"],
    stack: { description: "Wave 2 placeholder", integrations: ["Follow Up Boss", "kvCORE", "BoomTown"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min realtor marketing audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "real estate marketing agency Minneapolis",
    secondaryKeywords: ["realtor marketing Minnesota", "AI for realtors"],
  },
  {
    slug: "hvac-marketing-minneapolis",
    name: "HVAC Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis HVAC Contractors",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "brand-intel"],
    stack: { description: "Wave 2 placeholder", integrations: ["ServiceTitan", "Housecall Pro", "Jobber"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min HVAC marketing audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "HVAC marketing agency Minneapolis",
    secondaryKeywords: ["HVAC lead generation", "AI for HVAC contractors"],
  },
  {
    slug: "plumbing-marketing-minneapolis",
    name: "Plumbing Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis Plumbers",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "content-engine"],
    stack: { description: "Wave 2 placeholder", integrations: ["ServiceTitan", "Housecall Pro", "Jobber"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min plumbing marketing audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "plumbing marketing agency Minneapolis",
    secondaryKeywords: ["plumber lead generation MN", "AI for plumbers"],
  },
  {
    slug: "roofing-marketing-minneapolis",
    name: "Roofing Contractors",
    vertical: "home-services",
    hero: {
      headline: "AI Marketing for Minneapolis Roofers",
      subhead: "Wave 2 placeholder",
    },
    problem: { paragraphs: STUB_PARAS },
    servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "content-engine"],
    stack: { description: "Wave 2 placeholder", integrations: ["AccuLynx", "JobNimbus", "Roofr"] },
    proof: { caseQuote: "Wave 2 placeholder", clientLabel: "Industry benchmark" },
    faq: STUB_FAQ,
    cta: { label: "Book a 15-min roofing marketing audit", subcopy: "Wave 2 placeholder" },
    targetKeyword: "roofing marketing agency Minneapolis",
    secondaryKeywords: ["roofing leads Minnesota", "storm response marketing"],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 3: Add `JsonLd` helper component

**Files:**
- Create: `src/components/terminal/JsonLd.tsx`

- [ ] **Step 1: Create the component**

Write to `src/components/terminal/JsonLd.tsx`:

```typescript
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

export default function JsonLd({ data }: { data: JsonValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 4: Build the `FAQ` component (with FAQPage schema baked in)

**Files:**
- Create: `src/components/terminal/FAQ.tsx`

- [ ] **Step 1: Create the component**

Write to `src/components/terminal/FAQ.tsx`:

```typescript
"use client";

import { useState } from "react";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export type FAQItem = { q: string; a: string };

export default function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
      <JsonLd data={schema} />
      <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
        // FAQ
      </div>
      <h2 style={{
        fontFamily: DISPLAY, fontWeight: 300, fontSize: "clamp(36px, 4.4vw, 56px)",
        lineHeight: 1.05, letterSpacing: "-0.03em", margin: "12px 0 32px",
        color: "var(--ns-text)",
      }}>
        {title || "Common questions."}
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, border: "1px solid var(--ns-line)" }}>
        {items.map((it, i) => {
          const open = openIdx === i;
          return (
            <li
              key={i}
              style={{ borderBottom: i < items.length - 1 ? "1px solid var(--ns-line)" : "none" }}
            >
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "20px 24px",
                  background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  color: "var(--ns-text)", fontFamily: DISPLAY, fontSize: 17,
                  fontWeight: 500, letterSpacing: "-0.01em",
                }}
              >
                <span>{it.q}</span>
                <span style={{ color: "var(--ns-violet)", fontFamily: MONO, fontSize: 14 }}>
                  {open ? "[ − ]" : "[ + ]"}
                </span>
              </button>
              {open && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    color: "var(--ns-text-dim)", fontSize: 15, lineHeight: 1.65,
                    maxWidth: 760,
                  }}
                >
                  {it.a}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 5: Build the `PillarChips` component

**Files:**
- Create: `src/components/terminal/PillarChips.tsx`

- [ ] **Step 1: Create the component**

Write to `src/components/terminal/PillarChips.tsx`:

```typescript
import Link from "next/link";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export type Chip = { label: string; href: string };

export default function PillarChips({
  label,
  chips,
}: {
  label: string;
  chips: Chip[];
}) {
  return (
    <section
      style={{
        padding: "40px 0",
        borderTop: "1px solid var(--ns-line)",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--ns-violet)",
          letterSpacing: "0.2em",
          marginBottom: 18,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              padding: "8px 14px",
              border: "1px solid var(--ns-line-strong)",
              color: "var(--ns-text)",
              textDecoration: "none",
              borderRadius: 2,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "border-color .2s, color .2s, background .2s",
            }}
            className="pchip"
          >
            → {c.label}
          </Link>
        ))}
      </div>
      <style>{`
        .pchip:hover { border-color: var(--ns-violet); color: var(--ns-violet); background: rgba(124,92,255,0.05); }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 6: Build `BlogTerminalShell` and refactor `/blog` index

**Files:**
- Create: `src/components/terminal/BlogTerminalShell.tsx`
- Modify: `src/app/blog/page.tsx`

- [ ] **Step 1: Create the BlogTerminalShell component**

Write to `src/components/terminal/BlogTerminalShell.tsx`:

```typescript
import type { ReactNode } from "react";
import TerminalShell from "./TerminalShell";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function BlogTerminalShell({
  meta,
  children,
}: {
  meta?: {
    title: string;
    date: string;
    author: string;
    readingTime: string;
  };
  children: ReactNode;
}) {
  return (
    <TerminalShell>
      {meta && (
        <header style={{ padding: "60px 0 40px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
            }}
          >
            // /BLOG
          </div>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: "-0.04em",
              margin: "12px 0 18px",
              color: "var(--ns-text)",
              lineHeight: 1.05,
            }}
          >
            {meta.title}
          </h1>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-text-faint)",
              letterSpacing: "0.15em",
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span>{new Date(meta.date).toISOString().slice(0, 10)}</span>
            <span>· {meta.author}</span>
            <span>· {meta.readingTime}</span>
          </div>
        </header>
      )}
      <article
        className="ns-prose"
        style={{
          maxWidth: 760,
          padding: "0 0 80px",
          fontFamily: DISPLAY,
          fontSize: 17,
          lineHeight: 1.7,
          color: "var(--ns-text)",
        }}
      >
        {children}
      </article>
      <style>{`
        .ns-prose h2 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-weight: 400; font-size: 28px; letter-spacing: -0.02em;
          margin: 48px 0 16px; color: var(--ns-text);
        }
        .ns-prose h3 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-weight: 500; font-size: 20px; letter-spacing: -0.01em;
          margin: 32px 0 12px; color: var(--ns-text);
        }
        .ns-prose p { margin: 0 0 18px; color: var(--ns-text-dim); }
        .ns-prose a { color: var(--ns-violet); text-decoration: underline; text-decoration-color: var(--ns-line-strong); }
        .ns-prose a:hover { text-decoration-color: var(--ns-violet); }
        .ns-prose ul, .ns-prose ol { padding-left: 24px; margin: 0 0 18px; color: var(--ns-text-dim); }
        .ns-prose li { margin-bottom: 6px; }
        .ns-prose blockquote {
          margin: 24px 0; padding: 18px 24px;
          border-left: 3px solid var(--ns-violet);
          background: rgba(124,92,255,0.06);
          color: var(--ns-text);
        }
        .ns-prose code {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px; padding: 2px 6px;
          background: rgba(124,92,255,0.12); color: var(--ns-violet);
          border-radius: 2px;
        }
        .ns-prose pre {
          background: rgba(15,16,24,0.8);
          border: 1px solid var(--ns-line-strong);
          padding: 18px; overflow-x: auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px; line-height: 1.6;
        }
        .ns-prose pre code { background: transparent; padding: 0; color: var(--ns-text); }
        .ns-prose hr { border: none; border-top: 1px dashed var(--ns-line-strong); margin: 32px 0; }
      `}</style>
    </TerminalShell>
  );
}
```

- [ ] **Step 2: Replace `src/app/blog/page.tsx` with the TERMINAL.OS version**

Write to `src/app/blog/page.tsx`:

```typescript
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from Neurospark — AI marketing operator playbooks, case files, and tactical breakdowns for small and mid-size teams.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <TerminalShell>
      <PageHero
        route="blog"
        title="Field notes."
        intro="Operator playbooks, case files, and tactical breakdowns for small and mid-size marketing teams."
      />
      <section style={{ paddingBottom: 80 }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid var(--ns-line)",
          }}
        >
          {posts.map((post, i) => (
            <li
              key={post.slug}
              style={{
                borderBottom:
                  i < posts.length - 1 ? "1px solid var(--ns-line)" : "none",
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="post-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 160px 80px 40px",
                  gap: 20,
                  alignItems: "center",
                  padding: "26px 24px",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background .2s",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "var(--ns-violet)",
                    letterSpacing: "0.18em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 500,
                      fontSize: 20,
                      color: "var(--ns-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "var(--ns-text-dim)",
                    }}
                  >
                    {post.excerpt}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {post.author}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {post.readingTime}
                </div>
                <div
                  className="post-arr"
                  style={{
                    color: "var(--ns-text-faint)",
                    textAlign: "right",
                  }}
                >
                  ↗
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <style>{`
        .post-row:hover { background: rgba(124,92,255,0.04); }
        .post-row:hover .post-arr { color: var(--ns-violet); }
        @media (max-width: 880px) {
          .post-row { grid-template-columns: 40px 1fr 30px !important; gap: 12px !important; }
          .post-row > *:nth-child(3), .post-row > *:nth-child(4) { display: none; }
        }
      `}</style>
    </TerminalShell>
  );
}
```

- [ ] **Step 3: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 7: Refactor `/blog/[slug]` to TERMINAL.OS

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Read the current file to understand the existing slug-resolution pattern**

```bash
cat 'src/app/blog/[slug]/page.tsx'
```

Note the existing imports for `getPostBySlug`, `notFound`, `generateStaticParams`, etc. The MDX import pattern uses dynamic import.

- [ ] **Step 2: Replace the file with the TerminalShell version**

Write to `src/app/blog/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/blog";
import BlogTerminalShell from "@/components/terminal/BlogTerminalShell";
import JsonLd from "@/components/terminal/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Dynamic MDX import — content lives in src/content/blog/[slug].mdx
  let MDXContent: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    MDXContent = mod.default;
  } catch {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://neurosparkmarketing.com/blog/${slug}` },
    inLanguage: "en-US",
  };

  return (
    <BlogTerminalShell meta={post}>
      <JsonLd data={articleSchema} />
      <MDXContent />
      <hr />
      <p style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-text-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
        // Read next
      </p>
      <p>
        Want this for your team?{" "}
        <Link href="/contact">Open a channel</Link> · or{" "}
        <Link href="/services">browse the modules</Link>.
      </p>
    </BlogTerminalShell>
  );
}
```

- [ ] **Step 3: Verify the existing posts still build**

```bash
npm run build 2>&1 | tail -30
```

Expected: clean build, `/blog`, `/blog/why-every-brand-needs-a-video-strategy`, and `/blog/anatomy-of-a-high-converting-agency-website` all listed in the route table.

---

## Task 8: Wave 1 — visual smoke test, commit, push, deploy

- [ ] **Step 1: Start dev server**

```bash
PORT=3100 npm run dev > /tmp/np-dev.log 2>&1 &
sleep 4
tail -5 /tmp/np-dev.log
```

Expected: `✓ Ready in ...ms` on port 3100.

- [ ] **Step 2: Smoke-test all existing routes still work**

```bash
for path in "/" "/services" "/work" "/about" "/contact" "/blog" "/blog/why-every-brand-needs-a-video-strategy"; do
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "http://localhost:3100$path")
  echo "$code  $path"
done
```

Expected: all `200`.

- [ ] **Step 3: Visual check of /blog and a /blog/[slug]**

Use the Chrome MCP (or another browser tool) to navigate to `http://localhost:3100/blog` and one slug, screenshot, confirm:
- /blog shows TERMINAL.OS dark theme with bordered post rows
- /blog/[slug] shows dark prose with violet links and mono blockquote callouts
- Sub-nav highlights `/HOME` (since /blog isn't in TERMINAL_ROUTES yet — that's expected)

- [ ] **Step 4: Stop dev server**

```bash
lsof -ti:3100 -P 2>/dev/null | xargs -r kill 2>/dev/null
```

- [ ] **Step 5: Stage Wave 1 files only (not industries-data.ts content yet — it's stub)**

```bash
git add src/lib/services-data.ts src/lib/industries-data.ts \
  src/components/terminal/JsonLd.tsx \
  src/components/terminal/FAQ.tsx \
  src/components/terminal/PillarChips.tsx \
  src/components/terminal/BlogTerminalShell.tsx \
  src/app/blog/page.tsx 'src/app/blog/[slug]/page.tsx'
git status --short
```

Expected: 7 staged files, no other working-tree changes besides ignored.

- [ ] **Step 6: Commit Wave 1**

```bash
git commit -m "$(cat <<'EOF'
feat(seo): wave 1 — foundations for pillar+cluster content

- Extend services-data.ts with slug/SEO/tier metadata + TIERS const
- Add industries-data.ts with stub records for 6 verticals (slug,
  name, target keyword, services-used, integrations) — Wave 2
  fills in long-form content
- Add JsonLd, FAQ (with FAQPage schema), PillarChips,
  BlogTerminalShell components
- Refactor /blog index + /blog/[slug] to TerminalShell with
  dark MDX prose; existing 2 posts still render

No new content surface yet — Wave 2 ships /services/[slug],
/industries/[slug], 4 new MDX posts, sitemap updates.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds.

- [ ] **Step 7: Push to GitHub**

```bash
git push origin main
```

Expected: `main → main` push success.

- [ ] **Step 8: Deploy Wave 1 to Vercel production**

```bash
vercel --prod --yes 2>&1 | tail -10
```

Expected: `Production: https://...vercel.app` with `Aliased: https://neurosparkmarketing.com`.

- [ ] **Step 9: Smoke-test prod /blog**

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}\n" https://neurosparkmarketing.com/blog
/usr/bin/curl -s https://neurosparkmarketing.com/blog | grep -oE "Field notes\.|why-every-brand"
```

Expected: HTTP 200, both strings present.

---

# Wave 2 — Pages

Goal: ship all 16 new pages with drafted content, structured data, sitemap updates, and the /INDUSTRIES nav addition. One atomic commit at the end.

---

## Task 9: Fill `industries-data.ts` with full content for all 6 industries

**Files:**
- Modify: `src/lib/industries-data.ts`

**Voice/tone guidelines** (apply to all industries):
- "Confident, quiet, premium sentences. No hype, no emojis." (matches existing `ai-bridge` system prompt)
- TERMINAL.OS aesthetic — terse, technical, mono-friendly phrasing
- Each industry is a deployment thesis, not a sales pitch
- Include the primary keyword in the headline AND first paragraph of the problem section
- FAQ answers are 2-3 sentences max each
- Industry-benchmark proof statements per the spec decision (e.g., "Our dental engagements target +180–220% new-patient inquiry volume within 90 days, sustained at +35–60% over baseline at month 12.")

- [ ] **Step 1: Read the stub and replace each industry record with full content**

For each of the 6 industries, replace the stub fields with:

- `hero.subhead` — 1-sentence positioning (~15 words)
- `hero.metricBadge` — e.g. "12 dental engagements · industry benchmark"
- `problem.paragraphs` — 3 paragraphs (~80-120 words each), vertical-specific pain
- `stack.description` — 1 paragraph (~60 words) describing how the agents wire into the named integrations
- `proof.caseQuote` — 2-3 sentences in benchmark format per spec decision
- `proof.clientLabel` — e.g. "Industry benchmark, 12 dental engagements"
- `faq` — 6 real questions with 2-3 sentence answers covering: timeline, pricing, replacement-or-augment, multi-location, integrations, switching cost
- `cta.subcopy` — 1 sentence

Worked example for the **dental** industry (model the others on this):

```typescript
{
  slug: "dental-marketing-minneapolis",
  name: "Dental Practices",
  vertical: "medical",
  hero: {
    headline: "AI Marketing for Minneapolis Dental Practices",
    subhead: "Replace generic SEO firms and overwhelmed front-desk recall with autonomous agents that book new patients while you're chairside.",
    metricBadge: "12 dental engagements · industry benchmark",
  },
  problem: {
    paragraphs: [
      "Dental marketing in 2026 is a tax on busy practices. Google Ads CPCs in the Twin Cities have climbed 60% in three years for terms like \"dentist near me\" and \"dental implants Minneapolis,\" while generic SEO firms produce blog posts your patients never read. Meanwhile your front desk spends two hours a day chasing recall and re-booking missed appointments.",
      "Most practices respond by hiring a marketing coordinator or signing with a national dental-marketing chain. Both approaches share the same flaw: they treat marketing as a cost center to be managed, not a system to be deployed. Your competitors who figure out the deployment model will compound advantage you can't catch.",
      "AI doesn't replace the marketing coordinator — it gives the practice a coordinator who works 24/7, never forgets a recall call, and learns from every booked-vs-no-show pattern in your PMS. That's what Neurospark deploys.",
    ],
  },
  servicesUsed: ["ai-agents", "paid-media-ai", "growth-automation", "brand-intel"],
  stack: {
    description:
      "We wire your practice management system (Dentrix, Open Dental, Eaglesoft) into a single agent layer that handles inbound chat, recall outreach, review monitoring, and Google/Meta ad bid management. The agents read appointment availability in real time and never double-book, never miss a recall window, and route every negative review to the practice owner within minutes.",
    integrations: ["Dentrix", "Open Dental", "Eaglesoft", "Weave", "Solutionreach"],
  },
  proof: {
    caseQuote:
      "Our dental engagements target +180–220% new-patient inquiry volume within 90 days, with cost-per-acquisition dropping 35–50% versus baseline Google Ads spend. Sustained lift averages +35–60% over baseline at month 12.",
    clientLabel: "Industry benchmark across 12 Minneapolis-area dental engagements",
  },
  faq: [
    {
      q: "How long until we see new patients?",
      a: "First booked new-patient appointments within 21 days of agent deployment is typical. The full lift curve compounds over 90 days as the bid agents learn your conversion data.",
    },
    {
      q: "Do we need to switch our practice management software?",
      a: "No. We integrate with whatever PMS you already run — Dentrix, Open Dental, Eaglesoft are the ones we deploy on most often. The agents read your real-time appointment availability through your existing PMS.",
    },
    {
      q: "Will you replace our existing marketing coordinator?",
      a: "Most of our dental clients keep their coordinator and free them to focus on community partnerships and case studies. The AI agents handle the work that's repetitive and high-volume — recall calls, review responses, ad bid adjustments.",
    },
    {
      q: "What does pricing look like for a single-location practice?",
      a: "Most single-location practices run on the Operator tier at $22K/month, which includes 4 modules: AI Agents, Paid Media AI, Growth Automation, and Brand Intel. Multi-location groups typically need Command at $48K/month.",
    },
    {
      q: "How do you handle HIPAA and patient data?",
      a: "We never store PHI. All patient-identifying data stays inside your PMS; the agents read it via your existing API and act on availability and category signals only. We sign a BAA with every dental practice we onboard.",
    },
    {
      q: "What's the switching cost if we want to leave?",
      a: "Month-to-month, no annual lockup. We hand back any custom training data, prompts, and agent configurations on request. Most practices stay because the agents pay for themselves inside the first quarter.",
    },
  ],
  cta: {
    label: "Book a 15-min dental practice audit",
    subcopy: "We'll review your current ad spend, recall workflow, and review profile, and send you a 4-step deployment plan within 24 hours.",
  },
  targetKeyword: "dental marketing agency Minneapolis",
  secondaryKeywords: ["dental SEO Minnesota", "AI for dental practices", "Minneapolis dental marketing"],
},
```

Replicate the same pattern for the other 5 industries — adjusting:
- Industry-specific pain points in problem section
- Integrations in stack section
- Industry-specific FAQ ("How quickly can roofers get storm-response ad campaigns live?", "Do you work with med spas pre-license?", etc.)
- Industry-specific CTA copy

For **HVAC**, use ServiceTitan/Housecall Pro, emphasize emergency-response ad bidding and seasonal demand patterns.

For **plumbing**, mirror HVAC tooling but emphasize water-emergency response time and recurring-maintenance plan upsells.

For **roofing**, emphasize storm-chasing ad campaigns, drone inspection lead capture, and insurance-claim timing.

For **real estate**, use Follow Up Boss/kvCORE, emphasize listing-velocity content engine and nurture sequences for buyer/seller leads.

For **med spas**, use Aesthetic Record/Boulevard, emphasize membership program nurture, before/after content workflows, and HIPAA-aware ad targeting.

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 10: Build the `PillarPage` component

**Files:**
- Create: `src/components/terminal/PillarPage.tsx`

- [ ] **Step 1: Create the component**

Write to `src/components/terminal/PillarPage.tsx`:

```typescript
import Link from "next/link";
import { services, type ServiceSlug } from "@/lib/services-data";
import type { Industry } from "@/lib/industries-data";
import TerminalShell from "./TerminalShell";
import SectionHead from "./SectionHead";
import FAQ from "./FAQ";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function PillarPage({ industry }: { industry: Industry }) {
  const usedServices = industry.servicesUsed
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Neurospark Marketing",
    url: `https://neurosparkmarketing.com/industries/${industry.slug}`,
    description: industry.hero.subhead,
    areaServed: {
      "@type": "City",
      name: "Minneapolis",
      containedInPlace: { "@type": "State", name: "Minnesota" },
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: industry.targetKeyword,
    provider: { "@type": "Organization", name: "Neurospark Marketing" },
    areaServed: { "@type": "City", name: "Minneapolis" },
  };

  return (
    <TerminalShell>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <section style={{ padding: "60px 0 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // /INDUSTRIES/{industry.slug.toUpperCase().replace(/-/g, "_")}
        </div>
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: "-0.04em",
          margin: "12px 0 18px", color: "var(--ns-text)", lineHeight: 1.04,
        }}>
          {industry.hero.headline}
        </h1>
        <p style={{
          maxWidth: 720, color: "var(--ns-text-dim)", fontSize: 18, lineHeight: 1.6, margin: 0,
        }}>
          {industry.hero.subhead}
        </p>
        {industry.hero.metricBadge && (
          <div style={{
            marginTop: 24, fontFamily: MONO, fontSize: 11,
            color: "var(--ns-lime)", letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            ● {industry.hero.metricBadge}
          </div>
        )}
        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/contact" style={{
            padding: "14px 22px", background: "var(--ns-violet)", color: "white",
            border: "none", borderRadius: 2, fontFamily: MONO, fontSize: 12,
            fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
          }}>
            [ {industry.cta.label.replace(/Book a /i, "book_").toLowerCase().replace(/[^a-z0-9_]/g, "_")} ↗ ]
          </Link>
          <Link href="/contact" style={{
            padding: "14px 22px", background: "transparent", color: "var(--ns-text)",
            border: "1px solid var(--ns-line-strong)", borderRadius: 2,
            fontFamily: MONO, fontSize: 12, fontWeight: 500,
            letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
          }}>
            [ open_channel ]
          </Link>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label={`// PROBLEM · ${industry.name.toUpperCase()}`} title={`Why ${industry.name.toLowerCase()} marketing is broken in 2026.`} />
        <div style={{ marginTop: 32, maxWidth: 760 }}>
          {industry.problem.paragraphs.map((p, i) => (
            <p key={i} style={{ color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7, margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* SOLUTION (4 service cards) */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// SOLUTION" title={`Your ${industry.name.toLowerCase()} marketing stack.`} sub="Each module ships in 21 days. Click a module for the deep dive." />
        <div className="solution-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0,
          marginTop: 32, border: "1px solid var(--ns-line)",
        }}>
          {usedServices.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="sol-cell" style={{
              padding: 28, textDecoration: "none", color: "inherit",
              borderRight: i % 2 === 0 ? "1px solid var(--ns-line)" : "none",
              borderBottom: i < usedServices.length - 2 ? "1px solid var(--ns-line)" : "none",
              cursor: "pointer", transition: "background .2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.18em" }}>{s.code}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: "var(--ns-text-faint)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.tag}</div>
              </div>
              <div style={{ marginTop: 24, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, letterSpacing: "0.04em", color: "var(--ns-text)" }}>{s.name}</div>
              <p style={{ marginTop: 12, color: "var(--ns-text-dim)", fontSize: 13, lineHeight: 1.55 }}>{s.shortDesc}</p>
              <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.15em" }}>READ MODULE →</div>
            </Link>
          ))}
        </div>
        <style>{`
          .sol-cell:hover { background: rgba(124,92,255,0.05); }
          @media (max-width: 880px) {
            .solution-grid { grid-template-columns: 1fr !important; }
            .sol-cell { border-right: none !important; border-bottom: 1px solid var(--ns-line) !important; }
          }
        `}</style>
      </section>

      {/* STACK */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// STACK" title={`Wired into your ${industry.name.toLowerCase()} stack.`} />
        <p style={{ marginTop: 24, maxWidth: 760, color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7 }}>
          {industry.stack.description}
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {industry.stack.integrations.map((it) => (
            <span key={it} style={{
              fontFamily: MONO, fontSize: 11, padding: "8px 14px",
              border: "1px solid var(--ns-line-strong)", color: "var(--ns-cyan)",
              borderRadius: 2, letterSpacing: "0.1em",
            }}>
              {it}
            </span>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <div style={{
          padding: 32, border: "1px solid var(--ns-line-strong)",
          background: "linear-gradient(135deg, rgba(124,92,255,0.08), transparent 70%)",
        }}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em", marginBottom: 16 }}>
            // BENCHMARK
          </div>
          <p style={{
            fontFamily: DISPLAY, fontWeight: 300,
            fontSize: "clamp(20px, 2.4vw, 26px)",
            lineHeight: 1.5, color: "var(--ns-text)", margin: 0,
          }}>
            {industry.proof.caseQuote}
          </p>
          <div style={{
            marginTop: 18, fontFamily: MONO, fontSize: 11,
            color: "var(--ns-text-dim)", letterSpacing: "0.15em",
          }}>
            — {industry.proof.clientLabel}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={industry.faq} title={`Common questions about ${industry.name.toLowerCase()} marketing.`} />

      {/* CTA */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)", textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // NEXT.STEP
        </div>
        <h3 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(32px, 4.5vw, 48px)", letterSpacing: "-0.03em",
          margin: "16px auto 16px", maxWidth: 720, color: "var(--ns-text)",
        }}>
          {industry.cta.label}.
        </h3>
        <p style={{ maxWidth: 580, margin: "0 auto 32px", color: "var(--ns-text-dim)", fontSize: 15, lineHeight: 1.6 }}>
          {industry.cta.subcopy}
        </p>
        <Link href="/contact" style={{
          display: "inline-block", padding: "14px 22px",
          background: "var(--ns-violet)", color: "white",
          border: "none", borderRadius: 2,
          fontFamily: MONO, fontSize: 12, fontWeight: 600,
          letterSpacing: "0.15em", textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
        }}>
          [ open_channel ↗ ]
        </Link>
      </section>
    </TerminalShell>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 11: Build the `ServiceDetailPage` component

**Files:**
- Create: `src/components/terminal/ServiceDetailPage.tsx`

- [ ] **Step 1: Create the component**

Write to `src/components/terminal/ServiceDetailPage.tsx`:

```typescript
import Link from "next/link";
import { industries } from "@/lib/industries-data";
import type { Service } from "@/lib/services-data";
import TerminalShell from "./TerminalShell";
import SectionHead from "./SectionHead";
import PillarChips from "./PillarChips";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function ServiceDetailPage({ service }: { service: Service }) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "https://neurosparkmarketing.com/services" },
      { "@type": "ListItem", position: 2, name: service.name, item: `https://neurosparkmarketing.com/services/${service.slug}` },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.targetKeyword,
    provider: { "@type": "Organization", name: "Neurospark Marketing" },
    description: service.description,
  };

  const chips = industries
    .filter((i) => service.industriesServed.includes(i.slug))
    .map((i) => ({ label: i.name, href: `/industries/${i.slug}` }));

  return (
    <TerminalShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <section style={{ padding: "60px 0 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // /SERVICES/{service.code}
        </div>
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(40px, 6vw, 64px)", letterSpacing: "-0.04em",
          margin: "12px 0 18px", color: "var(--ns-text)", lineHeight: 1.04,
        }}>
          {service.name}.
        </h1>
        <p style={{ maxWidth: 720, color: "var(--ns-text-dim)", fontSize: 18, lineHeight: 1.6, margin: 0 }}>
          {service.description}
        </p>
        <div style={{
          marginTop: 24, fontFamily: MONO, fontSize: 11,
          color: "var(--ns-lime)", letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          ● AGENT.{service.code} · {service.tag.toUpperCase()}
        </div>
      </section>

      {/* WHAT */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// WHAT" title="What this module does." />
        <p style={{ marginTop: 24, maxWidth: 760, color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7 }}>
          {service.longDescription}
        </p>
      </section>

      {/* METRIC + TIER */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--ns-line)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 300, color: "var(--ns-lime)", letterSpacing: "-0.03em" }}>
            {service.metric}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-text-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {service.metricLabel}
          </span>
        </div>
        <div style={{
          marginTop: 18, fontFamily: MONO, fontSize: 12,
          color: "var(--ns-text-dim)", letterSpacing: "0.1em",
        }}>
          Included in:{" "}
          {service.includedInTiers.map((t, i) => (
            <span key={t} style={{ color: t === "OPERATOR" ? "var(--ns-lime)" : "var(--ns-violet)" }}>
              {t}{i < service.includedInTiers.length - 1 ? " · " : ""}
            </span>
          ))}
          {" "}—{" "}
          <Link href="/services#pricing" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
            see all pricing →
          </Link>
        </div>
      </section>

      {/* INDUSTRIES (PillarChips) */}
      <PillarChips label="// INDUSTRIES RUNNING THIS MODULE" chips={chips} />

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <Link href="/contact" style={{
          display: "inline-block", padding: "14px 22px",
          background: "var(--ns-violet)", color: "white", border: "none", borderRadius: 2,
          fontFamily: MONO, fontSize: 12, fontWeight: 600,
          letterSpacing: "0.15em", textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
        }}>
          [ open_channel ↗ ]
        </Link>
      </section>
    </TerminalShell>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 12: Wire dynamic `/services/[slug]` route + per-slug OG image

**Files:**
- Create: `src/app/services/[slug]/page.tsx`
- Create: `src/app/services/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create the dynamic route page**

Write to `src/app/services/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/services-data";
import ServiceDetailPage from "@/components/terminal/ServiceDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — ${service.targetKeyword}`,
    description:
      service.longDescription.slice(0, 155).replace(/\s+\S*$/, "") + "…",
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.name} · Neurospark`,
      description: service.shortDesc,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
```

- [ ] **Step 2: Create the OG image route (mirrors /work/[slug] pattern)**

Write to `src/app/services/[slug]/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";
import { services } from "@/lib/services-data";

export const alt = "Neurospark Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0A0B10", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 40 }}>
        Not Found
      </div>,
      { ...size }
    );
  }
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80,
        background: "linear-gradient(135deg, #0A0B10 0%, #1a0a2e 50%, #0A0B10 100%)",
        position: "relative", color: "#E8E6F0",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#7C5CFF" }} />
        <p style={{ fontSize: 18, color: "#7C5CFF", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
          // {service.code} · {service.tag}
        </p>
        <p style={{ fontSize: 84, fontWeight: 300, letterSpacing: "-0.04em", margin: "24px 0 18px", color: "#fff" }}>
          {service.name}
        </p>
        <p style={{ fontSize: 28, color: "#E8E6F0", maxWidth: 900, margin: 0, lineHeight: 1.4 }}>
          {service.shortDesc}
        </p>
        <p style={{ position: "absolute", bottom: 60, left: 80, fontSize: 18, color: "#C6FF3C", letterSpacing: "0.15em" }}>
          {service.metric} {service.metricLabel}
        </p>
        <p style={{ position: "absolute", bottom: 60, right: 80, fontSize: 16, color: "#22D3EE", letterSpacing: "0.2em" }}>
          NEUROSPARK · LIVE
        </p>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 13: Wire dynamic `/industries/[slug]` route + per-slug OG image

**Files:**
- Create: `src/app/industries/[slug]/page.tsx`
- Create: `src/app/industries/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create the dynamic route page**

Write to `src/app/industries/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { industries } from "@/lib/industries-data";
import PillarPage from "@/components/terminal/PillarPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: industry.hero.headline,
    description:
      industry.hero.subhead.slice(0, 155).replace(/\s+\S*$/, "") + "…",
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: industry.hero.headline,
      description: industry.hero.subhead,
      type: "website",
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();
  return <PillarPage industry={industry} />;
}
```

- [ ] **Step 2: Create the OG image route**

Write to `src/app/industries/[slug]/opengraph-image.tsx`:

```typescript
import { ImageResponse } from "next/og";
import { industries } from "@/lib/industries-data";

export const alt = "Neurospark Industry Pillar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0A0B10", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 40 }}>
        Not Found
      </div>,
      { ...size }
    );
  }
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80,
        background: "linear-gradient(135deg, #0A0B10 0%, #1a0a2e 50%, #0A0B10 100%)",
        position: "relative", color: "#E8E6F0",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#FF3DAA" }} />
        <p style={{ fontSize: 18, color: "#FF3DAA", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
          // INDUSTRY · MINNEAPOLIS
        </p>
        <p style={{ fontSize: 64, fontWeight: 300, letterSpacing: "-0.04em", margin: "24px 0 18px", color: "#fff", maxWidth: 1040, lineHeight: 1.05 }}>
          {industry.hero.headline}
        </p>
        <p style={{ fontSize: 24, color: "#E8E6F0", maxWidth: 900, margin: 0, lineHeight: 1.4 }}>
          {industry.hero.subhead}
        </p>
        <p style={{ position: "absolute", bottom: 60, right: 80, fontSize: 16, color: "#22D3EE", letterSpacing: "0.2em" }}>
          NEUROSPARK · LIVE
        </p>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 14: Create `/industries/page.tsx` index + restructure `/services/page.tsx` index

**Files:**
- Create: `src/app/industries/page.tsx`
- Modify: `src/app/services/page.tsx`
- Modify: `src/components/terminal/ServicesGrid.tsx`

- [ ] **Step 1: Modify `ServicesGrid.tsx` to wrap cards in `<Link>`**

Read current `src/components/terminal/ServicesGrid.tsx`. Find the inner `<div className="service-cell">...</div>` block. Replace each cell wrapper:

Change:
```typescript
<div
  key={s.id}
  className="service-cell"
  style={{ ... }}
>
```

To:
```typescript
<Link
  key={s.id}
  href={`/services/${s.slug ?? s.id}`}
  className="service-cell"
  style={{ ... textDecoration: "none", color: "inherit", ... }}
>
```

Remove the closing `</div>` for that cell and replace with `</Link>`. Add `import Link from "next/link";` at top.

The `service-cell:hover` CSS already adds the violet bg — works for Links too.

- [ ] **Step 2: Create `src/app/industries/page.tsx`**

Write to `src/app/industries/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import { industries } from "@/lib/industries-data";
import JsonLd from "@/components/terminal/JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Industries · Minneapolis AI Marketing for SMBs",
  description:
    "AI marketing operator deployments for Minneapolis dental practices, med spas, real estate, HVAC, plumbing, and roofing contractors.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndex() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Industries", item: "https://neurosparkmarketing.com/industries" },
    ],
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries served by Neurospark",
    url: "https://neurosparkmarketing.com/industries",
  };

  return (
    <TerminalShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collection} />
      <PageHero
        route="industries"
        title={<>Six verticals.<br />One operator.</>}
        intro="We deploy AI marketing operators into local Minneapolis pro-services and home-services businesses — dental, med spa, real estate, HVAC, plumbing, roofing."
      />
      <section style={{ padding: "0 0 80px" }}>
        <div className="ind-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          border: "1px solid var(--ns-line)",
        }}>
          {industries.map((i, idx) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="ind-cell" style={{
              padding: 28, textDecoration: "none", color: "inherit",
              borderRight: (idx % 3 !== 2) ? "1px solid var(--ns-line)" : "none",
              borderBottom: idx < industries.length - 3 ? "1px solid var(--ns-line)" : "none",
              transition: "background .2s",
            }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.18em" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div style={{ marginTop: 18, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, letterSpacing: "0.04em", color: "var(--ns-text)" }}>
                {i.name.toUpperCase()}
              </div>
              <p style={{ marginTop: 10, color: "var(--ns-text-dim)", fontSize: 13, lineHeight: 1.55, minHeight: 60 }}>
                {i.hero.subhead}
              </p>
              <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.15em" }}>
                READ PILLAR →
              </div>
            </Link>
          ))}
        </div>
        <div style={{
          marginTop: 32, padding: "20px 24px",
          border: "1px dashed var(--ns-line-strong)",
          fontFamily: MONO, fontSize: 12, color: "var(--ns-text-dim)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span>Looking by service instead?</span>
          <Link href="/services" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
            → Browse all 6 modules
          </Link>
        </div>
      </section>
      <style>{`
        .ind-cell:hover { background: rgba(124,92,255,0.05); }
        @media (max-width: 1180px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 720px) { .ind-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </TerminalShell>
  );
}
```

- [ ] **Step 3: Update `src/app/services/page.tsx` to be the services index**

Read the current file (it already renders `ServicesGrid` + `PricingGrid` inside `TerminalShell`). Three changes:

(a) Add `id="pricing"` anchor on the pricing section so cluster pages can deep-link. In `src/components/terminal/PricingGrid.tsx`, find the `<section` opening tag and add the id:

```typescript
<section
  id="pricing"
  style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
>
```

(b) Add CollectionPage + BreadcrumbList JSON-LD and a cross-link footer band to `src/app/services/page.tsx`. Add these imports at the top:

```typescript
import Link from "next/link";
import JsonLd from "@/components/terminal/JsonLd";
```

Inside the `ServicesPage` component, before the existing `<PageHero ... />` add the JSON-LD blocks:

```typescript
const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Services", item: "https://neurosparkmarketing.com/services" },
  ],
};
const collection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Services offered by Neurospark",
  url: "https://neurosparkmarketing.com/services",
};
```

And inside the `<TerminalShell>` JSX, before `<PageHero ... />`:

```typescript
<JsonLd data={breadcrumbs} />
<JsonLd data={collection} />
```

(c) After `<PricingGrid />` and before closing `</TerminalShell>`, add a cross-link footer band:

```typescript
<section style={{ paddingBottom: 60 }}>
  <div style={{
    padding: "20px 24px",
    border: "1px dashed var(--ns-line-strong)",
    fontFamily: "var(--font-jetbrains-mono), monospace",
    fontSize: 12,
    color: "var(--ns-text-dim)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  }}>
    <span>Looking by industry instead?</span>
    <Link href="/industries" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
      → Browse all 6 verticals
    </Link>
  </div>
</section>
```

- [ ] **Step 4: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

---

## Task 15: Create the 4 new MDX blog posts + extend `blog.ts`

**Files:**
- Create: `src/content/blog/how-ai-marketing-agents-work.mdx`
- Create: `src/content/blog/dental-practice-marketing-2026.mdx`
- Create: `src/content/blog/hvac-lead-generation-with-ai.mdx`
- Create: `src/content/blog/local-real-estate-seo-playbook.mdx`
- Modify: `src/lib/blog.ts`

- [ ] **Step 1: Add the 4 new entries to `src/lib/blog.ts`**

Find the `posts` array. Prepend the 4 new entries (so they show first in chronological order):

```typescript
{
  slug: "how-ai-marketing-agents-work",
  title: "How AI Marketing Agents Actually Work",
  date: "2026-05-03",
  author: "Danilo",
  excerpt:
    "Strip away the hype: a technical breakdown of how named AI agents (Aria, Beam, Helix) handle outbound, content, and paid media inside a real marketing stack.",
  readingTime: "9 min read",
},
{
  slug: "dental-practice-marketing-2026",
  title: "Dental Practice Marketing in 2026: The Operator Playbook",
  date: "2026-05-03",
  author: "Danilo",
  excerpt:
    "Why generic dental SEO is a tax on busy practices, and what to deploy instead — recall automation, review monitoring, and AI-tuned Google Ads.",
  readingTime: "8 min read",
},
{
  slug: "hvac-lead-generation-with-ai",
  title: "HVAC Lead Generation with AI: Beyond Google LSAs",
  date: "2026-05-03",
  author: "Danilo",
  excerpt:
    "How AI-tuned bid agents and automated dispatch outperform Google Local Service Ads for HVAC contractors in seasonal demand spikes.",
  readingTime: "7 min read",
},
{
  slug: "local-real-estate-seo-playbook",
  title: "The Local Real Estate SEO Playbook for 2026",
  date: "2026-05-03",
  author: "Danilo",
  excerpt:
    "A page-by-page SEO playbook for solo realtors and small brokerages competing against Zillow, Redfin, and franchise giants in a single metro.",
  readingTime: "10 min read",
},
```

- [ ] **Step 2: Draft each MDX post body**

Each post should:
- Open with a 1-2 sentence hook
- Use H2 / H3 headings (the BlogTerminalShell styles them)
- 4-6 sections per post
- Hit the target keyword in the first paragraph
- Include 1-2 internal links to relevant pillar/cluster pages
- End with a 1-paragraph "What to do next" pointing to `/contact` or `/services`
- Voice matches the existing TERMINAL.OS aesthetic (see ai-bridge system prompt for tone reference)

Example structure for **how-ai-marketing-agents-work.mdx**:

```mdx
What everyone calls "AI marketing" is really three different things welded together. This post pulls them apart and shows what an AI marketing agent actually does inside a working stack.

## The three layers

There's the model layer (Claude, GPT, Gemini), the agent layer (a wrapper that gives the model tools and a job), and the orchestration layer (whatever decides which agent runs when). Most "AI marketing" products bundle all three and call the bundle "an agent." That makes pricing easier and architecture worse.

## What an agent actually does

Take Aria, our outbound agent. Her job is to research a target account, write a personalized opener, send it through your sequencing tool, and route the reply to whoever should handle it. To do that, she needs:

- A model (we use Claude Sonnet 4.6 for the writing, Haiku for the research)
- Tools (Apollo for company data, your CRM for context, your calendar for booking)
- A prompt that knows your brand voice
- A job description with success criteria

Without all four, she's just a chatbot.

## Why this matters for marketing

[2-3 paragraphs on why marketing benefits specifically from agentic patterns vs traditional automation]

## How to deploy one

The fastest way is to start with one agent doing one job for one segment of your market. Don't try to build "an AI marketing platform" — build Aria, get her to book three meetings this week, then add Beam.

## What to do next

If you want to see what an agent looks like in practice, [the Aria demo on our home page](/) is wired to a real model — try giving her a prompt. If you want one deployed in your stack, [open a channel](/contact) and we'll send you a 90-day deployment plan.
```

Repeat the pattern for the other 3 posts, hitting their respective target keywords:
- `dental-practice-marketing-2026.mdx` — links UP to `/industries/dental-marketing-minneapolis`
- `hvac-lead-generation-with-ai.mdx` — links UP to `/industries/hvac-marketing-minneapolis`
- `local-real-estate-seo-playbook.mdx` — links UP to `/industries/real-estate-marketing-minneapolis`

Each ~1,200 words.

- [ ] **Step 3: Verify build picks up the new posts**

```bash
npm run build 2>&1 | tail -30
```

Expected: route table shows `/blog/how-ai-marketing-agents-work`, `/blog/dental-practice-marketing-2026`, `/blog/hvac-lead-generation-with-ai`, `/blog/local-real-estate-seo-playbook` (alongside the 2 existing ones).

---

## Task 16: Update `sitemap.ts` to include all new URLs

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Read current sitemap**

```bash
cat src/app/sitemap.ts
```

- [ ] **Step 2: Replace with the version that pulls from data files**

Write to `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { services } from "@/lib/services-data";
import { industries } from "@/lib/industries-data";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://neurosparkmarketing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes];
}
```

- [ ] **Step 3: Verify**

```bash
npm run build 2>&1 | tail -30
```

Expected: clean build.

---

## Task 17: Update `SubNav` to include `/INDUSTRIES` + `Footer` to add column

**Files:**
- Modify: `src/lib/terminal-data.ts`
- Modify: `src/components/terminal/SubNav.tsx`
- Modify: `src/components/terminal/Footer.tsx`

- [ ] **Step 1: Add 'industries' to TERMINAL_ROUTES**

Read `src/lib/terminal-data.ts`. Find:

```typescript
export const TERMINAL_ROUTES = [
  "home",
  "services",
  "work",
  "about",
  "contact",
] as const;
```

Replace with:

```typescript
export const TERMINAL_ROUTES = [
  "home",
  "services",
  "industries",
  "work",
  "about",
  "contact",
] as const;
```

- [ ] **Step 2: Update SubNav HREF map**

Read `src/components/terminal/SubNav.tsx`. Find the `HREF` map. Add `industries: "/industries",` between services and work:

```typescript
const HREF: Record<string, string> = {
  home: "/",
  services: "/services",
  industries: "/industries",
  work: "/work",
  about: "/about",
  contact: "/contact",
};
```

- [ ] **Step 3: Add INDUSTRIES column to Footer**

Read `src/components/terminal/Footer.tsx`. Find the `COLS` array. Insert a new INDUSTRIES column before COMPANY:

```typescript
const COLS = [
  { h: "OPERATIONS", items: ["Agents", "Content Engine", "Paid Media", "Brand Intel"] },
  { h: "INDUSTRIES", items: ["Dental", "Med Spa", "Real Estate", "HVAC", "Plumbing", "Roofing"] },
  { h: "COMPANY", items: ["About", "Work", "Team", "Press"] },
  {
    h: "CONTACT",
    items: ["Danilo@neurosparkmarketing.com", "Minneapolis · Remote"],
  },
];
```

Then update the footer grid template to fit 5 columns instead of 4. Find:

```typescript
gridTemplateColumns: "2fr 1fr 1fr 1fr",
```

Replace with:

```typescript
gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.4fr",
```

- [ ] **Step 4: Verify typecheck and build**

```bash
npx tsc --noEmit && npm run build 2>&1 | tail -30
```

Expected: clean. Route table shows all 6 services, 6 industries, 6 blog posts (2 existing + 4 new), and both index pages.

---

## Task 18: Wave 2 — full smoke test, commit, push, deploy, post-deploy verification

- [ ] **Step 1: Start dev server and smoke-test all 16 new URLs**

```bash
PORT=3100 npm run dev > /tmp/np-dev.log 2>&1 &
sleep 5

PATHS=(
  "/services/ai-agents" "/services/content-engine" "/services/paid-media-ai"
  "/services/brand-intel" "/services/growth-automation" "/services/revenue-forecast"
  "/industries/dental-marketing-minneapolis" "/industries/med-spa-marketing-minneapolis"
  "/industries/real-estate-marketing-minneapolis" "/industries/hvac-marketing-minneapolis"
  "/industries/plumbing-marketing-minneapolis" "/industries/roofing-marketing-minneapolis"
  "/blog/how-ai-marketing-agents-work" "/blog/dental-practice-marketing-2026"
  "/blog/hvac-lead-generation-with-ai" "/blog/local-real-estate-seo-playbook"
  "/services" "/industries"
)
for p in "${PATHS[@]}"; do
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "http://localhost:3100$p")
  echo "$code  $p"
done
```

Expected: all `200`.

- [ ] **Step 2: Visual check via browser MCP**

Navigate to one industry pillar (e.g., `/industries/dental-marketing-minneapolis`) and one service cluster (e.g., `/services/ai-agents`). Confirm:
- Pillar shows hero, problem (3 paragraphs), 4-card solution grid, stack with chip integrations, benchmark proof block, FAQ accordion (clicking expands), CTA
- Cluster shows hero, what, metric+tier line, PillarChips strip, CTA
- Sub-nav highlights `/INDUSTRIES` on industry page, `/SERVICES` on service page
- Footer shows 5 columns including INDUSTRIES

- [ ] **Step 3: Verify FAQ schema in HTML source**

```bash
/usr/bin/curl -s http://localhost:3100/industries/dental-marketing-minneapolis | grep -oE '"@type":"FAQPage"' | head -1
```

Expected: `"@type":"FAQPage"` present.

- [ ] **Step 4: Verify sitemap includes new URLs**

```bash
/usr/bin/curl -s http://localhost:3100/sitemap.xml | grep -cE "(industries/|services/[a-z])"
```

Expected: 12 (6 industries + 6 services).

- [ ] **Step 5: Stop dev server**

```bash
lsof -ti:3100 -P 2>/dev/null | xargs -r kill 2>/dev/null
```

- [ ] **Step 6: Stage all Wave 2 files**

```bash
git add src/lib/industries-data.ts src/lib/terminal-data.ts src/lib/blog.ts \
  src/components/terminal/PillarPage.tsx src/components/terminal/ServiceDetailPage.tsx \
  src/components/terminal/SubNav.tsx src/components/terminal/Footer.tsx \
  src/components/terminal/ServicesGrid.tsx src/components/terminal/PricingGrid.tsx \
  src/app/services/page.tsx src/app/industries 'src/app/services/[slug]' \
  src/app/sitemap.ts \
  src/content/blog/how-ai-marketing-agents-work.mdx \
  src/content/blog/dental-practice-marketing-2026.mdx \
  src/content/blog/hvac-lead-generation-with-ai.mdx \
  src/content/blog/local-real-estate-seo-playbook.mdx
git status --short
```

Expected: all Wave 2 files staged.

- [ ] **Step 7: Commit Wave 2**

```bash
git commit -m "$(cat <<'EOF'
feat(seo): wave 2 — 16 pages live, sitemap + nav updated

- 6 industry pillar pages at /industries/[slug] (dental, med-spa,
  real-estate, hvac, plumbing, roofing — Minneapolis local)
  with FAQPage + LocalBusiness + Service schema
- 6 service cluster pages at /services/[slug] with Service +
  BreadcrumbList schema and PillarChips linking UP to industries
- 4 new blog posts targeting informational long-tail, each linking
  UP to its corresponding pillar
- New /industries index page mirroring restructured /services index
- Per-route OG images at /services/[slug]/opengraph-image.tsx and
  /industries/[slug]/opengraph-image.tsx
- /INDUSTRIES added to sub-nav (6 items now)
- INDUSTRIES column added to footer (5-col grid)
- sitemap.ts dynamically pulls all service + industry + blog slugs
- ServicesGrid cards now link to /services/[slug]
- /services#pricing anchor for cluster page deep-links

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 8: Push and deploy**

```bash
git push origin main
vercel --prod --yes 2>&1 | grep -E "Production:|Aliased:"
```

Expected: deploy succeeds, alias to neurosparkmarketing.com.

- [ ] **Step 9: Post-deploy smoke test on production**

```bash
PATHS=(
  "/services/ai-agents" "/services/content-engine" "/services/paid-media-ai"
  "/services/brand-intel" "/services/growth-automation" "/services/revenue-forecast"
  "/industries/dental-marketing-minneapolis" "/industries/med-spa-marketing-minneapolis"
  "/industries/real-estate-marketing-minneapolis" "/industries/hvac-marketing-minneapolis"
  "/industries/plumbing-marketing-minneapolis" "/industries/roofing-marketing-minneapolis"
  "/blog/how-ai-marketing-agents-work" "/blog/dental-practice-marketing-2026"
  "/blog/hvac-lead-generation-with-ai" "/blog/local-real-estate-seo-playbook"
  "/services" "/industries" "/sitemap.xml"
)
for p in "${PATHS[@]}"; do
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "https://neurosparkmarketing.com$p")
  echo "$code  https://neurosparkmarketing.com$p"
done
```

Expected: all `200`.

- [ ] **Step 10: Verify FAQ schema on production**

```bash
/usr/bin/curl -s https://neurosparkmarketing.com/industries/dental-marketing-minneapolis | grep -cE '"@type":"(FAQPage|LocalBusiness|Service)"'
```

Expected: 3 (one each).

- [ ] **Step 11: Manual one-time step (Danilo runs)**

Submit the updated sitemap to Google Search Console:
1. Open https://search.google.com/search-console
2. Property → Sitemaps → Add a new sitemap → enter `sitemap.xml`
3. Verify it shows `Success` status within ~5 minutes.

- [ ] **Step 12: Sample Lighthouse run**

Open Chrome DevTools → Lighthouse on `https://neurosparkmarketing.com/industries/dental-marketing-minneapolis`. Run mobile audit. Expected: ≥90 on Performance, Accessibility, Best Practices, SEO.

If any score < 90, log the issue and fix in a follow-up commit.

---

## Done

The site now has:
- 16 new content pages targeting Minneapolis local + vertical-specific commercial searches
- 2 restructured/new index pages
- /blog refactored to TERMINAL.OS theme
- Pillar+cluster internal linking architecture
- Full structured data (FAQPage, LocalBusiness, Service, Article, BreadcrumbList, CollectionPage, Organization)
- Updated sitemap submitted to Google Search Console

Next likely work (out of scope for this plan):
- Real client quotes swapped into `industries-data.ts` `proof.caseQuote` fields as engagements close
- Cal.com booking integration to replace `/contact` CTA target on industry pillars
- More industry pages (legal, professional services) in a Wave 3
- ANTHROPIC_API_KEY wiring so the live AI demos drop the fallback
