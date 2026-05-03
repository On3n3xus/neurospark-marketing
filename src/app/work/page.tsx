import type { Metadata } from "next";
import Link from "next/link";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engagements. Each case is measured against a pre-deployment baseline.",
};

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function WorkPage() {
  return (
    <TerminalShell>
      <PageHero
        route="work"
        title="The receipts."
        intro="Selected engagements. Each case is measured against a pre-deployment baseline our agents establish in the first 14 days."
      />
      <section style={{ paddingBottom: 80 }}>
        <div
          className="work-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {projects.map((p, i) => {
            const headline = p.details.results[0];
            return (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                className="work-card"
                style={{
                  border: "1px solid var(--ns-line)",
                  position: "relative",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color .2s",
                  display: "block",
                }}
              >
                <div
                  className="ns-placeholder"
                  style={{
                    height: 240,
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(135deg, ${p.color}22, transparent), repeating-linear-gradient(135deg, rgba(124,92,255,0.06) 0 8px, transparent 8px 16px)`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      fontFamily: MONO,
                      fontSize: 10,
                      color: "var(--ns-text-faint)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    CASE_{String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      fontFamily: MONO,
                      fontSize: 10,
                      color: p.color,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      borderLeft: `2px solid ${p.color}`,
                      paddingLeft: 8,
                    }}
                  >
                    {p.category}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      right: 14,
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "var(--ns-text-faint)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    {p.tags.map((t) => (
                      <span key={t}>· {t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: 22 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: DISPLAY,
                        fontWeight: 500,
                        fontSize: 22,
                        letterSpacing: "0.02em",
                        color: "var(--ns-text)",
                      }}
                    >
                      {p.title.toUpperCase()}
                    </div>
                  </div>
                  <p
                    style={{
                      marginTop: 10,
                      color: "var(--ns-text-dim)",
                      fontSize: 13,
                      lineHeight: 1.55,
                    }}
                  >
                    {p.description}
                  </p>
                  {headline && (
                    <div
                      style={{
                        marginTop: 18,
                        fontFamily: MONO,
                        fontSize: 24,
                        color: "var(--ns-lime)",
                      }}
                    >
                      {headline.value}
                      <span
                        style={{
                          marginLeft: 10,
                          fontSize: 11,
                          color: "var(--ns-text-faint)",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                      >
                        {headline.metric}
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid var(--ns-line)",
                      fontFamily: MONO,
                      fontSize: 11,
                      color: "var(--ns-violet)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    READ CASE FILE →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <style>{`
        .work-card:hover { border-color: var(--ns-violet) !important; }
        @media (max-width: 880px) {
          .work-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </TerminalShell>
  );
}
