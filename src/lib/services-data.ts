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
