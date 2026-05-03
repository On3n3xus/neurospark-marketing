"use client";

import { useEffect, useState } from "react";
import HudOrb from "./HudOrb";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const PHRASES = ["MARKETING.", "GROWTH.", "REVENUE.", "PIPELINE.", "BRAND."];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % PHRASES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: "80px 0 60px", position: "relative" }}>
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 60,
          alignItems: "end",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
              marginBottom: 24,
            }}
          >
            // [ NEUROSPARK · AI MARKETING OPERATOR · EST 2023 ]
          </div>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(56px, 8.5vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "var(--ns-text)",
            }}
          >
            We deploy
            <br />
            <span style={{ color: "var(--ns-violet)", fontWeight: 500 }}>
              autonomous
            </span>
            <br />
            agents to run
            <br />
            your{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                minWidth: "6ch",
              }}
            >
              <span style={{ color: "var(--ns-lime)", fontWeight: 500 }}>
                {PHRASES[i]}
              </span>
              <span
                style={{
                  position: "absolute",
                  right: -14,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: "var(--ns-lime)",
                  animation: "ns-blink 1s infinite",
                }}
              />
            </span>
          </h1>
          <p
            style={{
              marginTop: 32,
              maxWidth: 520,
              fontFamily: DISPLAY,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ns-text-dim)",
            }}
          >
            Neurospark builds AI systems for small and mid-size teams who want to
            ship faster than companies ten times their size. We embed agents into
            your stack — not slides into your inbox.
          </p>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 14,
              fontFamily: MONO,
              fontSize: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/contact"
              style={{
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
              [ deploy_agents ↗ ]
            </a>
            <a
              href="#agent-demo"
              style={{
                padding: "14px 22px",
                background: "transparent",
                color: "var(--ns-text)",
                border: "1px solid var(--ns-line-strong)",
                borderRadius: 2,
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              [ book_briefing ]
            </a>
          </div>
        </div>

        <HudOrb />
      </div>
      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
