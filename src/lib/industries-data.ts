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
