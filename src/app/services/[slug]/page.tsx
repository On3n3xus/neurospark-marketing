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
