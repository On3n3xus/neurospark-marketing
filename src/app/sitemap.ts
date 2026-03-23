import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neurospark.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectPages,
  ];
}
