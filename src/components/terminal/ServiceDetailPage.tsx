import Link from "next/link";
import { industries } from "@/lib/industries-data";
import type { Service } from "@/lib/services-data";
import TerminalShell from "./TerminalShell";
import SectionHead from "./SectionHead";
import PillarChips from "./PillarChips";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function ServiceDetailPage({ service }: { service: Service }) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Services", item: "https://neurosparkmarketing.com/services" },
      { "@type": "ListItem", position: 2, name: service.name, item: `https://neurosparkmarketing.com/services/${service.slug}` },
    ],
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.targetKeyword,
    provider: { "@type": "Organization", name: "Neurospark Marketing" },
    description: service.description,
  };

  const chips = industries
    .filter((i) => service.industriesServed.includes(i.slug))
    .map((i) => ({ label: i.name, href: `/industries/${i.slug}` }));

  return (
    <TerminalShell>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <section style={{ padding: "60px 0 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // /SERVICES/{service.code}
        </div>
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(40px, 6vw, 64px)", letterSpacing: "-0.04em",
          margin: "12px 0 18px", color: "var(--ns-text)", lineHeight: 1.04,
        }}>
          {service.name}.
        </h1>
        <p style={{ maxWidth: 720, color: "var(--ns-text-dim)", fontSize: 18, lineHeight: 1.6, margin: 0 }}>
          {service.description}
        </p>
        <div style={{
          marginTop: 24, fontFamily: MONO, fontSize: 11,
          color: "var(--ns-lime)", letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}>
          ● AGENT.{service.code} · {service.tag.toUpperCase()}
        </div>
      </section>

      {/* WHAT */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// WHAT" title="What this module does." />
        <p style={{ marginTop: 24, maxWidth: 760, color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7 }}>
          {service.longDescription}
        </p>
      </section>

      {/* METRIC + TIER */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--ns-line)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 56, fontWeight: 300, color: "var(--ns-lime)", letterSpacing: "-0.03em" }}>
            {service.metric}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-text-faint)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            {service.metricLabel}
          </span>
        </div>
        <div style={{
          marginTop: 18, fontFamily: MONO, fontSize: 12,
          color: "var(--ns-text-dim)", letterSpacing: "0.1em",
        }}>
          Included in:{" "}
          {service.includedInTiers.map((t, i) => (
            <span key={t} style={{ color: t === "OPERATOR" ? "var(--ns-lime)" : "var(--ns-violet)" }}>
              {t}{i < service.includedInTiers.length - 1 ? " · " : ""}
            </span>
          ))}
          {" "}—{" "}
          <Link href="/services#pricing" style={{ color: "var(--ns-violet)", textDecoration: "underline" }}>
            see all pricing →
          </Link>
        </div>
      </section>

      {/* INDUSTRIES (PillarChips) */}
      <PillarChips label="// INDUSTRIES RUNNING THIS MODULE" chips={chips} />

      {/* CTA */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <Link href="/contact" style={{
          display: "inline-block", padding: "14px 22px",
          background: "var(--ns-violet)", color: "white", border: "none", borderRadius: 2,
          fontFamily: MONO, fontSize: 12, fontWeight: 600,
          letterSpacing: "0.15em", textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
        }}>
          [ open_channel ↗ ]
        </Link>
      </section>
    </TerminalShell>
  );
}
