import type { Metadata } from "next";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import SectionHead from "@/components/terminal/SectionHead";
import { team, stats } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Neurospark builds and operates AI marketing systems for small and mid-size teams. Operators who ship, not agencies who deck.",
};

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function AboutPage() {
  return (
    <TerminalShell>
      <PageHero
        route="about"
        title={
          <>
            We believe the next decade of marketing belongs to{" "}
            <span style={{ color: "var(--ns-violet)" }}>
              operators who ship
            </span>
            , not agencies who deck.
          </>
        }
      />

      <section
        style={{
          padding: "40px 0 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
        }}
        className="about-2col"
      >
        <div
          style={{
            color: "var(--ns-text-dim)",
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          Neurospark started with a simple thesis: AI doesn&apos;t replace
          marketers — it gives the small team the firepower of a hundred-person
          org. We build, deploy and operate AI systems that produce measurable
          revenue lift inside 90 days. We do not sell licenses. We do not run
          pitches. We deploy operators and stay accountable to the metric.
        </div>
        <div
          className="ns-placeholder"
          style={{
            height: 320,
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, rgba(124,92,255,0.18), transparent 60%), repeating-linear-gradient(135deg, rgba(124,92,255,0.06) 0 8px, transparent 8px 16px)",
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
            HQ_PORTRAIT.IMG
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 14,
              right: 14,
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
            }}
          >
            ● MINNEAPOLIS · REMOTE
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section
        style={{
          borderTop: "1px solid var(--ns-line)",
          borderBottom: "1px solid var(--ns-line)",
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32,
        }}
      >
        {stats.map((s, i) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "var(--ns-text-faint)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 32,
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: i % 3 === 0 ? "var(--ns-lime)" : i % 3 === 1 ? "var(--ns-cyan)" : "var(--ns-violet)",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </section>

      {/* Crew */}
      <section
        style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}
      >
        <SectionHead label="// CREW" title="Small team. Loud results." />
        <div
          className="crew-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 40,
          }}
        >
          {team.map((t) => (
            <div key={t.id}>
              <div
                className="ns-placeholder"
                style={{
                  height: 240,
                  position: "relative",
                  overflow: "hidden",
                  background: `linear-gradient(135deg, ${t.color}40, transparent 60%), repeating-linear-gradient(135deg, rgba(124,92,255,0.06) 0 8px, transparent 8px 16px)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    right: 14,
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.2em",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>OPERATOR_{t.id.toUpperCase()}</span>
                  <span style={{ color: t.color }}>● ACTIVE</span>
                </div>
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: DISPLAY,
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                  color: "var(--ns-text)",
                  textTransform: "uppercase",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "var(--ns-text-dim)",
                  marginTop: 4,
                  letterSpacing: "0.05em",
                }}
              >
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto block */}
      <section
        style={{
          padding: "80px 0",
          borderTop: "1px solid var(--ns-line)",
        }}
      >
        <div
          style={{
            padding: 40,
            border: "1px solid var(--ns-line-strong)",
            background:
              "linear-gradient(135deg, rgba(124,92,255,0.08), transparent 70%)",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
              marginBottom: 18,
            }}
          >
            // OPERATING.PRINCIPLES
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {[
              {
                k: "01",
                t: "Ship, don't pitch.",
                d: "Every engagement starts with a deployed system inside 21 days.",
              },
              {
                k: "02",
                t: "Measure or move on.",
                d: "Each module is judged against a baseline metric we set in week 2.",
              },
              {
                k: "03",
                t: "Agents over slides.",
                d: "We embed operators in your stack — not strategy decks in your inbox.",
              },
              {
                k: "04",
                t: "Pause anytime.",
                d: "Flat retainer, month-to-month. No annual lockups, no hidden fees.",
              },
            ].map((p) => (
              <li key={p.k} style={{ display: "flex", gap: 14 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "var(--ns-violet)",
                    letterSpacing: "0.2em",
                    flexShrink: 0,
                  }}
                >
                  {p.k}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 18,
                      fontWeight: 500,
                      color: "var(--ns-text)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.t}
                  </div>
                  <p
                    style={{
                      marginTop: 6,
                      color: "var(--ns-text-dim)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {p.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <style>{`
        @media (max-width: 880px) {
          .about-2col { grid-template-columns: 1fr !important; }
          .crew-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .crew-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </TerminalShell>
  );
}
