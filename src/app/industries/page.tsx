import type { Metadata } from "next";
import Link from "next/link";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import { industries } from "@/lib/industries-data";
import JsonLd from "@/components/terminal/JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Industries · Minneapolis AI Marketing for SMBs",
  description:
    "AI marketing operator deployments for Minneapolis dental practices, med spas, real estate, HVAC, plumbing, and roofing contractors.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesIndex() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Industries", item: "https://neurosparkmarketing.com/industries" },
    ],
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industries served by Neurospark",
    url: "https://neurosparkmarketing.com/industries",
  };

  return (
    <TerminalShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={collection} />
      <PageHero
        route="industries"
        title={<>Six verticals.<br />One operator.</>}
        intro="We deploy AI marketing operators into local Minneapolis pro-services and home-services businesses — dental, med spa, real estate, HVAC, plumbing, roofing."
      />
      <section style={{ padding: "0 0 80px" }}>
        <div className="ind-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0,
          border: "1px solid var(--ns-line)",
        }}>
          {industries.map((i, idx) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} className="ind-cell" style={{
              padding: 28, textDecoration: "none", color: "inherit",
              borderRight: (idx % 3 !== 2) ? "1px solid var(--ns-line)" : "none",
              borderBottom: idx < industries.length - 3 ? "1px solid var(--ns-line)" : "none",
              transition: "background .2s",
            }}>
              <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.18em" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div style={{ marginTop: 18, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, letterSpacing: "0.04em", color: "var(--ns-text)" }}>
                {i.name.toUpperCase()}
              </div>
              <p style={{ marginTop: 10, color: "var(--ns-text-dim)", fontSize: 13, lineHeight: 1.55, minHeight: 60 }}>
                {i.hero.subhead}
              </p>
              <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.15em" }}>
                READ PILLAR →
              </div>
            </Link>
          ))}
        </div>
        <div style={{
          marginTop: 32, padding: "20px 24px",
          border: "1px dashed var(--ns-line-strong)",
          fontFamily: MONO, fontSize: 12, color: "var(--ns-text-dim)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span>Looking by service instead?</span>
          <Link href="/services" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
            → Browse all 6 modules
          </Link>
        </div>
      </section>
      <style>{`
        .ind-cell:hover { background: rgba(124,92,255,0.05); }
        @media (max-width: 1180px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 720px) { .ind-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </TerminalShell>
  );
}
