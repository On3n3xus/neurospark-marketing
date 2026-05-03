export type TerminalService = {
  id: string;
  code: string;
  name: string;
  tag: string;
  desc: string;
  metric: string;
  metricLabel: string;
};

export type TerminalCase = {
  client: string;
  sector: string;
  delta: string;
  when: string;
};

export type Telemetry = {
  k: string;
  v: string;
  tone: "lime" | "cyan" | "violet";
};

export const TERMINAL_ROUTES = [
  "home",
  "services",
  "industries",
  "work",
  "about",
  "contact",
] as const;
export type TerminalRoute = (typeof TERMINAL_ROUTES)[number];

export const TERMINAL_SERVICES: TerminalService[] = [
  {
    id: "agents",
    code: "01",
    name: "AI AGENTS",
    tag: "autonomous · 24/7",
    desc:
      "Always-on agents that handle outbound, support and SEO research while your team sleeps.",
    metric: "+340%",
    metricLabel: "pipeline / qtr",
  },
  {
    id: "content",
    code: "02",
    name: "CONTENT ENGINE",
    tag: "generative · multi-channel",
    desc:
      "Brand-trained models writing site copy, ads and posts indistinguishable from your senior editor.",
    metric: "8.4x",
    metricLabel: "output velocity",
  },
  {
    id: "paid",
    code: "03",
    name: "PAID MEDIA AI",
    tag: "predictive · self-tuning",
    desc:
      "Bidding agents that re-allocate spend across Google, Meta and TikTok every 90 seconds.",
    metric: "−42%",
    metricLabel: "cpa average",
  },
  {
    id: "brand",
    code: "04",
    name: "BRAND INTEL",
    tag: "real-time · listening",
    desc:
      "A neural map of every mention, review and competitor move. Updated continuously.",
    metric: "12k",
    metricLabel: "signals / day",
  },
  {
    id: "auto",
    code: "05",
    name: "GROWTH AUTOMATION",
    tag: "workflows · integrations",
    desc:
      "AI-routed CRM, inbox triage and lifecycle journeys. From lead to loyal in zero touch.",
    metric: "94%",
    metricLabel: "tasks automated",
  },
  {
    id: "forecast",
    code: "06",
    name: "REVENUE FORECAST",
    tag: "simulation · attribution",
    desc:
      "Monte-Carlo models project the next 4 quarters under any scenario you type into the prompt.",
    metric: "±3.1%",
    metricLabel: "forecast error",
  },
];

export const TERMINAL_WORK: TerminalCase[] = [
  { client: "NORTHWIND CO.", sector: "D2C · skincare", delta: "+218% ROAS", when: "2026 Q1" },
  { client: "KAITEN ROBOTICS", sector: "B2B · industrial", delta: "11x SQL volume", when: "2025 Q4" },
  { client: "LUMA PROVISIONS", sector: "F&B · grocery", delta: "−54% CAC", when: "2025 Q4" },
  { client: "ORBIT FINANCIAL", sector: "Fintech · SMB", delta: "+92 NPS", when: "2025 Q3" },
];

export const TERMINAL_TELEMETRY: Telemetry[] = [
  { k: "agents.online", v: "147 / 147", tone: "lime" },
  { k: "campaigns.active", v: "38", tone: "cyan" },
  { k: "tokens.today", v: "2.3M", tone: "violet" },
  { k: "uptime.30d", v: "99.998%", tone: "lime" },
];
