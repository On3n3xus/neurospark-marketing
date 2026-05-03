export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  readingTime: string;
}

// Blog posts are defined here — add new entries when creating new MDX files
export const posts: BlogPost[] = [
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
  {
    slug: "why-every-brand-needs-a-video-strategy",
    title: "Why Every Brand Needs a Video Strategy in 2026",
    date: "2026-03-20",
    author: "Alex Drummond",
    excerpt:
      "Video isn't optional anymore. Here's why a programmatic video strategy is the highest-ROI marketing investment you can make this year.",
    readingTime: "5 min read",
  },
  {
    slug: "anatomy-of-a-high-converting-agency-website",
    title: "The Anatomy of a High-Converting Agency Website",
    date: "2026-03-15",
    author: "Jordan Blake",
    excerpt:
      "We rebuilt our own site from the ground up. Here's what we learned about design, performance, and conversion — and what you can steal for yours.",
    readingTime: "7 min read",
  },
];

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
