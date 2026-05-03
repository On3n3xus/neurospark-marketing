import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/portfolio-data";
import TerminalShell from "@/components/terminal/TerminalShell";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Neurospark`,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const { details } = project;
  const idx = projects.findIndex((p) => p.id === slug);
  const accent = project.color;

  return (
    <TerminalShell>
      <section style={{ padding: "60px 0 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontFamily: MONO,
            fontSize: 11,
            color: "var(--ns-text-faint)",
            letterSpacing: "0.2em",
          }}
        >
          <Link
            href="/work"
            style={{
              color: "var(--ns-violet)",
              textDecoration: "none",
              letterSpacing: "0.2em",
            }}
          >
            ← /WORK
          </Link>
          <span style={{ color: accent }}>
            CASE_{String(idx + 1).padStart(2, "0")} ·{" "}
            {project.category.toUpperCase()}
          </span>
        </div>

        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(48px, 7vw, 80px)",
            letterSpacing: "-0.04em",
            margin: "30px 0 18px",
            color: "var(--ns-text)",
            lineHeight: 1.04,
          }}
        >
          {project.title}.
        </h1>
        <p
          style={{
            maxWidth: 720,
            color: "var(--ns-text-dim)",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "6px 10px",
                color: accent,
                border: `1px solid ${accent}55`,
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Big banner with project color */}
      <section
        style={{
          marginTop: 48,
          height: 280,
          border: "1px solid var(--ns-line-strong)",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${accent}30, transparent 60%), repeating-linear-gradient(135deg, rgba(124,92,255,0.06) 0 8px, transparent 8px 16px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 80% 20%, ${accent}40, transparent 50%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            fontFamily: MONO,
            fontSize: 10,
            color: "var(--ns-text-faint)",
            letterSpacing: "0.2em",
          }}
        >
          PROJECT.SIGNATURE
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 18,
            fontFamily: MONO,
            fontSize: 10,
            color: accent,
            letterSpacing: "0.2em",
          }}
        >
          ● ARCHIVED
        </div>
      </section>

      {/* Challenge / Approach */}
      <section
        style={{
          padding: "60px 0",
          borderTop: "1px solid var(--ns-line)",
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 60,
        }}
        className="case-2col"
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: accent,
              letterSpacing: "0.2em",
            }}
          >
            // THE CHALLENGE
          </div>
        </div>
        <p
          style={{
            color: "var(--ns-text)",
            fontSize: 18,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {details.challenge}
        </p>
      </section>

      <section
        style={{
          padding: "60px 0",
          borderTop: "1px solid var(--ns-line)",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 60,
        }}
        className="case-2col"
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: accent,
              letterSpacing: "0.2em",
            }}
          >
            // OUR APPROACH
          </div>
        </div>
        <p
          style={{
            color: "var(--ns-text)",
            fontSize: 18,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {details.approach}
        </p>
      </section>

      {/* Results */}
      <section
        style={{
          padding: "60px 0",
          borderTop: "1px solid var(--ns-line)",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: accent,
            letterSpacing: "0.2em",
            marginBottom: 32,
          }}
        >
          // RESULTS
        </div>
        <div
          className="case-results"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            border: "1px solid var(--ns-line)",
          }}
        >
          {details.results.map((r, i) => (
            <div
              key={r.metric}
              style={{
                padding: 28,
                borderRight:
                  i % 4 !== 3 ? "1px solid var(--ns-line)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 40,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  color: accent,
                }}
              >
                {r.value}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: MONO,
                  fontSize: 10,
                  color: "var(--ns-text-faint)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {r.metric}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {details.testimonial && (
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
                color: accent,
                letterSpacing: "0.2em",
                marginBottom: 18,
              }}
            >
              // SIGNAL FROM CLIENT
            </div>
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(20px, 2.4vw, 26px)",
                lineHeight: 1.5,
                color: "var(--ns-text)",
                margin: 0,
                fontWeight: 300,
              }}
            >
              &ldquo;{details.testimonial.quote}&rdquo;
            </p>
            <div
              style={{
                marginTop: 24,
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ns-text-dim)",
                letterSpacing: "0.1em",
              }}
            >
              — {details.testimonial.name},{" "}
              <span style={{ color: accent }}>
                {details.testimonial.role}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          padding: "80px 0",
          borderTop: "1px solid var(--ns-line)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: "var(--ns-violet)",
            letterSpacing: "0.2em",
          }}
        >
          // NEXT.STEP
        </div>
        <h3
          style={{
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(32px, 4.5vw, 48px)",
            letterSpacing: "-0.03em",
            margin: "16px auto 24px",
            maxWidth: 720,
            color: "var(--ns-text)",
          }}
        >
          Want a result like this for your team?
        </h3>
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "14px 22px",
            background: "var(--ns-violet)",
            color: "white",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            boxShadow:
              "0 0 0 1px var(--ns-violet), 0 0 30px rgba(124,92,255,0.4)",
          }}
        >
          [ open_channel ↗ ]
        </Link>
      </section>
      <style>{`
        @media (max-width: 880px) {
          .case-2col { grid-template-columns: 1fr !important; gap: 20px !important; }
          .case-results { grid-template-columns: repeat(2, 1fr) !important; }
          .case-results > div { border-right: 1px solid var(--ns-line) !important; border-bottom: 1px solid var(--ns-line); }
        }
      `}</style>
    </TerminalShell>
  );
}
