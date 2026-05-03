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
