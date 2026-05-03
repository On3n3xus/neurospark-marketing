import Link from "next/link";
import { services } from "@/lib/services-data";
import type { Industry } from "@/lib/industries-data";
import TerminalShell from "./TerminalShell";
import SectionHead from "./SectionHead";
import FAQ from "./FAQ";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function PillarPage({ industry }: { industry: Industry }) {
  const usedServices = industry.servicesUsed
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Neurospark Marketing",
    url: `https://neurosparkmarketing.com/industries/${industry.slug}`,
    description: industry.hero.subhead,
    areaServed: {
      "@type": "City",
      name: "Minneapolis",
      containedInPlace: { "@type": "State", name: "Minnesota" },
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: industry.targetKeyword,
    provider: { "@type": "Organization", name: "Neurospark Marketing" },
    areaServed: { "@type": "City", name: "Minneapolis" },
  };

  return (
    <TerminalShell>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <section style={{ padding: "60px 0 40px" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // /INDUSTRIES/{industry.slug.toUpperCase().replace(/-/g, "_")}
        </div>
        <h1 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: "-0.04em",
          margin: "12px 0 18px", color: "var(--ns-text)", lineHeight: 1.04,
        }}>
          {industry.hero.headline}
        </h1>
        <p style={{
          maxWidth: 720, color: "var(--ns-text-dim)", fontSize: 18, lineHeight: 1.6, margin: 0,
        }}>
          {industry.hero.subhead}
        </p>
        {industry.hero.metricBadge && (
          <div style={{
            marginTop: 24, fontFamily: MONO, fontSize: 11,
            color: "var(--ns-lime)", letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}>
            ● {industry.hero.metricBadge}
          </div>
        )}
        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/contact" style={{
            padding: "14px 22px", background: "var(--ns-violet)", color: "white",
            border: "none", borderRadius: 2, fontFamily: MONO, fontSize: 12,
            fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
            textDecoration: "none",
            boxShadow: "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
          }}>
            [ {industry.cta.label.replace(/Book a /i, "book_").toLowerCase().replace(/[^a-z0-9_]/g, "_")} ↗ ]
          </Link>
          <Link href="/contact" style={{
            padding: "14px 22px", background: "transparent", color: "var(--ns-text)",
            border: "1px solid var(--ns-line-strong)", borderRadius: 2,
            fontFamily: MONO, fontSize: 12, fontWeight: 500,
            letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
          }}>
            [ open_channel ]
          </Link>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label={`// PROBLEM · ${industry.name.toUpperCase()}`} title={`Why ${industry.name.toLowerCase()} marketing is broken in 2026.`} />
        <div style={{ marginTop: 32, maxWidth: 760 }}>
          {industry.problem.paragraphs.map((p, i) => (
            <p key={i} style={{ color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7, margin: "0 0 18px" }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* SOLUTION (4 service cards) */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// SOLUTION" title={`Your ${industry.name.toLowerCase()} marketing stack.`} sub="Each module ships in 21 days. Click a module for the deep dive." />
        <div className="solution-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0,
          marginTop: 32, border: "1px solid var(--ns-line)",
        }}>
          {usedServices.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="sol-cell" style={{
              padding: 28, textDecoration: "none", color: "inherit",
              borderRight: i % 2 === 0 ? "1px solid var(--ns-line)" : "none",
              borderBottom: i < usedServices.length - 2 ? "1px solid var(--ns-line)" : "none",
              cursor: "pointer", transition: "background .2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.18em" }}>{s.code}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: "var(--ns-text-faint)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.tag}</div>
              </div>
              <div style={{ marginTop: 24, fontFamily: DISPLAY, fontWeight: 500, fontSize: 22, letterSpacing: "0.04em", color: "var(--ns-text)" }}>{s.name}</div>
              <p style={{ marginTop: 12, color: "var(--ns-text-dim)", fontSize: 13, lineHeight: 1.55 }}>{s.shortDesc}</p>
              <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.15em" }}>READ MODULE →</div>
            </Link>
          ))}
        </div>
        <style>{`
          .sol-cell:hover { background: rgba(124,92,255,0.05); }
          @media (max-width: 880px) {
            .solution-grid { grid-template-columns: 1fr !important; }
            .sol-cell { border-right: none !important; border-bottom: 1px solid var(--ns-line) !important; }
          }
        `}</style>
      </section>

      {/* STACK */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <SectionHead label="// STACK" title={`Wired into your ${industry.name.toLowerCase()} stack.`} />
        <p style={{ marginTop: 24, maxWidth: 760, color: "var(--ns-text)", fontSize: 17, lineHeight: 1.7 }}>
          {industry.stack.description}
        </p>
        <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {industry.stack.integrations.map((it) => (
            <span key={it} style={{
              fontFamily: MONO, fontSize: 11, padding: "8px 14px",
              border: "1px solid var(--ns-line-strong)", color: "var(--ns-cyan)",
              borderRadius: 2, letterSpacing: "0.1em",
            }}>
              {it}
            </span>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
        <div style={{
          padding: 32, border: "1px solid var(--ns-line-strong)",
          background: "linear-gradient(135deg, rgba(124,92,255,0.08), transparent 70%)",
        }}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em", marginBottom: 16 }}>
            // BENCHMARK
          </div>
          <p style={{
            fontFamily: DISPLAY, fontWeight: 300,
            fontSize: "clamp(20px, 2.4vw, 26px)",
            lineHeight: 1.5, color: "var(--ns-text)", margin: 0,
          }}>
            {industry.proof.caseQuote}
          </p>
          <div style={{
            marginTop: 18, fontFamily: MONO, fontSize: 11,
            color: "var(--ns-text-dim)", letterSpacing: "0.15em",
          }}>
            — {industry.proof.clientLabel}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={industry.faq} title={`Common questions about ${industry.name.toLowerCase()} marketing.`} />

      {/* CTA */}
      <section style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)", textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
          // NEXT.STEP
        </div>
        <h3 style={{
          fontFamily: DISPLAY, fontWeight: 300,
          fontSize: "clamp(32px, 4.5vw, 48px)", letterSpacing: "-0.03em",
          margin: "16px auto 16px", maxWidth: 720, color: "var(--ns-text)",
        }}>
          {industry.cta.label}.
        </h3>
        <p style={{ maxWidth: 580, margin: "0 auto 32px", color: "var(--ns-text-dim)", fontSize: 15, lineHeight: 1.6 }}>
          {industry.cta.subcopy}
        </p>
        <Link href="/contact" style={{
          display: "inline-block", padding: "14px 22px",
          background: "var(--ns-violet)", color: "white",
          border: "none", borderRadius: 2,
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
