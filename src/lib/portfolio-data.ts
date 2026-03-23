export interface ProjectResult {
  metric: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: string;
  details: {
    challenge: string;
    approach: string;
    results: ProjectResult[];
    testimonial?: {
      quote: string;
      name: string;
      role: string;
    };
  };
}

export const projects: Project[] = [
  {
    id: "project-aurora",
    title: "Project Aurora",
    category: "Branding & Web",
    description:
      "Complete brand overhaul and immersive web experience for a next-gen fintech startup.",
    tags: ["Branding", "Web Development", "Motion"],
    color: "#00f0ff",
    details: {
      challenge:
        "Aurora Fintech had a dated brand identity that failed to convey the innovation behind their AI-driven financial products. Their website had a 78% bounce rate and poor conversion on their flagship product page.",
      approach:
        "We rebuilt Aurora's brand from the ground up — a new visual identity rooted in precision and trust, paired with an immersive Next.js website featuring interactive 3D product demos, scroll-driven storytelling, and a streamlined onboarding funnel.",
      results: [
        { metric: "Bounce Rate Reduction", value: "62%" },
        { metric: "Lead Generation Increase", value: "3.2x" },
        { metric: "Time on Site", value: "+180%" },
        { metric: "Brand Recognition Score", value: "94/100" },
      ],
      testimonial: {
        quote:
          "Neurospark completely transformed how people perceive our brand. The new website generates 3x more qualified leads.",
        name: "Sarah Chen",
        role: "CEO, Aurora Fintech",
      },
    },
  },
  {
    id: "neon-campaigns",
    title: "Neon Campaigns",
    category: "Paid Advertising",
    description:
      "Multi-platform ad campaign that achieved 340% ROAS across Meta, Google, and TikTok.",
    tags: ["Paid Ads", "Analytics", "Strategy"],
    color: "#ff00aa",
    details: {
      challenge:
        "Neon Fitness was spending $50K/month on ads with inconsistent returns. Their creative was stale, targeting was broad, and attribution was broken across platforms.",
      approach:
        "We audited their entire ad stack, rebuilt tracking with server-side events, created 40+ creative variants for split testing, and implemented a unified attribution model. Campaign strategy shifted to interest-layered lookalikes with dynamic creative optimization.",
      results: [
        { metric: "ROAS", value: "340%" },
        { metric: "Cost Per Acquisition", value: "-58%" },
        { metric: "Monthly Revenue", value: "+$220K" },
        { metric: "Creative Variants Tested", value: "40+" },
      ],
      testimonial: {
        quote:
          "They turned our ad spend from a question mark into our most predictable growth channel.",
        name: "James Nakamura",
        role: "VP of Growth, Neon Fitness",
      },
    },
  },
  {
    id: "synthwave-studios",
    title: "Synthwave Studios",
    category: "Video Production",
    description:
      "Programmatic video pipeline generating 500+ personalized videos monthly using Remotion.",
    tags: ["Video", "Remotion", "Automation"],
    color: "#8b5cf6",
    details: {
      challenge:
        "Synthwave Studios needed to produce hundreds of personalized recruitment videos for their clients, but manual video production couldn't scale beyond 20 per week without sacrificing quality.",
      approach:
        "We built a programmatic video pipeline using Remotion that pulls candidate data from their ATS, generates personalized video content with dynamic text, branded templates, and AI-narrated voiceovers — all rendered automatically in the cloud.",
      results: [
        { metric: "Videos Per Month", value: "500+" },
        { metric: "Production Cost Reduction", value: "85%" },
        { metric: "Candidate Response Rate", value: "+240%" },
        { metric: "Time to Produce", value: "< 30 sec" },
      ],
      testimonial: {
        quote:
          "They built a system that produces in 30 seconds what used to take our team 4 hours.",
        name: "Marcus Rivera",
        role: "Head of Marketing, Synthwave Studios",
      },
    },
  },
  {
    id: "cipher-social",
    title: "Cipher Social",
    category: "Social Media",
    description:
      "Social media strategy that grew a cybersecurity brand from 2K to 180K followers in 8 months.",
    tags: ["Social Media", "Content", "Growth"],
    color: "#00ff88",
    details: {
      challenge:
        "Cipher Security had deep expertise but zero social presence. Their previous agency posted generic cybersecurity tips that got no engagement. They needed to become a thought leader in the space.",
      approach:
        "We developed a content engine mixing educational threads, behind-the-scenes hacking demos, animated explainers, and timely takes on breaking security news. We paired this with strategic community engagement and LinkedIn thought leadership for the founder.",
      results: [
        { metric: "Follower Growth", value: "2K → 180K" },
        { metric: "Average Engagement Rate", value: "8.4%" },
        { metric: "Inbound Leads from Social", value: "45/month" },
        { metric: "Brand Mentions", value: "+1,200%" },
      ],
      testimonial: {
        quote:
          "Neurospark turned our social media from an afterthought into our primary lead generation channel.",
        name: "Aisha Patel",
        role: "Founder, Cipher Security",
      },
    },
  },
  {
    id: "quantum-commerce",
    title: "Quantum Commerce",
    category: "Web Development",
    description:
      "High-performance e-commerce platform with 3D product visualization and real-time inventory.",
    tags: ["E-commerce", "3D", "Next.js"],
    color: "#4444ff",
    details: {
      challenge:
        "Quantum's existing Shopify store couldn't handle their 10,000+ SKU catalog with the interactive 3D product views their luxury goods demanded. Page load times exceeded 8 seconds and mobile conversion was abysmal.",
      approach:
        "We built a custom Next.js storefront with React Three Fiber for 3D product visualization, Vercel Edge Functions for real-time inventory, and a headless Shopify backend. Aggressive image optimization and ISR brought page loads under 1.5 seconds.",
      results: [
        { metric: "Page Load Time", value: "1.2s" },
        { metric: "Mobile Conversion", value: "+165%" },
        { metric: "Average Order Value", value: "+38%" },
        { metric: "3D Product Views", value: "2.8M/month" },
      ],
    },
  },
  {
    id: "pulse-content",
    title: "Pulse Content",
    category: "Content Strategy",
    description:
      "Content ecosystem that drove 12x organic traffic growth through data-driven SEO and storytelling.",
    tags: ["SEO", "Content", "Strategy"],
    color: "#00f0ff",
    details: {
      challenge:
        "Pulse Health's blog had 200 articles but minimal organic traffic. Content was unfocused, keywords were competitive, and there was no content distribution strategy beyond 'publish and hope'.",
      approach:
        "We performed a full content audit, pruned 60% of underperforming pages, built topical authority clusters around 8 key health topics, optimized existing winners, and launched a distribution engine across email, social, and syndication partners.",
      results: [
        { metric: "Organic Traffic Growth", value: "12x" },
        { metric: "Keywords in Top 10", value: "340+" },
        { metric: "Content-Attributed Revenue", value: "$1.8M" },
        { metric: "Email Subscribers", value: "+28K" },
      ],
      testimonial: {
        quote:
          "They didn't just write content — they built an entire growth system around it.",
        name: "David Kim",
        role: "CMO, Pulse Health",
      },
    },
  },
];
