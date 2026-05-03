import type { Metadata } from "next";
import Link from "next/link";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import ServicesGrid from "@/components/terminal/ServicesGrid";
import PricingGrid from "@/components/terminal/PricingGrid";
import JsonLd from "@/components/terminal/JsonLd";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six AI marketing modules: agents, content engine, paid media AI, brand intel, growth automation, revenue forecast. Each ships in 21 days.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "https://neurosparkmarketing.com/services" },
    ],
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services offered by Neurospark",
    url: "https://neurosparkmarketing.com/services",
  };

  return (
    <TerminalShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collection} />
      <PageHero
        route="services"
        title={
          <>
            Six systems.
            <br />
            Deployable in 21 days.
          </>
        }
        intro="Each module is an autonomous operator wired into your stack. Mix and match — pause or swap any time."
      />
      <ServicesGrid />
      <PricingGrid />
      <section style={{ paddingBottom: 60 }}>
        <div style={{
          padding: "20px 24px",
          border: "1px dashed var(--ns-line-strong)",
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          color: "var(--ns-text-dim)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <span>Looking by industry instead?</span>
          <Link href="/industries" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
            → Browse all 6 verticals
          </Link>
        </div>
      </section>
    </TerminalShell>
  );
}
