export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // 3D geometry type hint
}

export const services: Service[] = [
  {
    id: "branding",
    title: "Branding",
    description:
      "Strategic brand identity that resonates. Logos, visual systems, and brand guidelines that set you apart.",
    icon: "diamond",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "High-performance websites and web applications built with cutting-edge technology.",
    icon: "cube",
  },
  {
    id: "video-production",
    title: "Video Production",
    description:
      "Cinematic video content and motion graphics powered by Remotion. Programmatic video at scale.",
    icon: "play",
  },
  {
    id: "social-media",
    title: "Social Media",
    description:
      "Community-driven social strategies that build engagement and grow your audience organically.",
    icon: "nodes",
  },
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    description:
      "Data-driven ad campaigns across platforms. Maximum ROI through precise targeting and optimization.",
    icon: "target",
  },
  {
    id: "content-strategy",
    title: "Content Strategy",
    description:
      "Content ecosystems that educate, inspire, and convert. SEO-optimized storytelling at its finest.",
    icon: "document",
  },
];
