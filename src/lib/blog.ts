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
