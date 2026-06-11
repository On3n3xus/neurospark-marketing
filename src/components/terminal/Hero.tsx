"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./motion/gsap-setup";
import DecodeText from "./motion/DecodeText";
import Magnetic from "./motion/Magnetic";
import HudOrb from "./HudOrb";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const PHRASES = ["MARKETING.", "GROWTH.", "REVENUE.", "PIPELINE.", "BRAND."];

/* Each h1 line sits in an overflow-hidden mask so it can slide up into view */
function MaskedLine({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <span className="hero-line" style={{ display: "block" }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % PHRASES.length), 2600);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.9 },
        });
        tl.from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.6 })
          .from(
            ".hero-line",
            { yPercent: 110, stagger: 0.12, duration: 1 },
            "-=0.2"
          )
          .from(".hero-copy", { autoAlpha: 0, y: 24 }, "-=0.5")
          .from(".hero-ctas", { autoAlpha: 0, y: 20 }, "-=0.6")
          .from(
            ".hero-orb",
            { autoAlpha: 0, scale: 0.85, duration: 1.2, ease: "power2.out" },
            "-=0.9"
          );
      });

      // subtle cursor parallax on the orb
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover)",
        () => {
          const el = ref.current;
          const orb = orbRef.current;
          if (!el || !orb) return;
          const xTo = gsap.quickTo(orb, "x", { duration: 0.8, ease: "power3" });
          const yTo = gsap.quickTo(orb, "y", { duration: 0.8, ease: "power3" });
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo(((e.clientX - r.left) / r.width - 0.5) * 24);
            yTo(((e.clientY - r.top) / r.height - 0.5) * 18);
          };
          el.addEventListener("mousemove", onMove);
          return () => el.removeEventListener("mousemove", onMove);
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} style={{ padding: "80px 0 60px", position: "relative" }}>
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
            className="hero-eyebrow"
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
            <MaskedLine>We deploy</MaskedLine>
            <MaskedLine>
              <span style={{ color: "var(--ns-violet)", fontWeight: 500 }}>
                autonomous
              </span>
            </MaskedLine>
            <MaskedLine>agents to run</MaskedLine>
            <MaskedLine>
              your{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "6ch",
                }}
              >
                <DecodeText
                  text={PHRASES[i]}
                  style={{ color: "var(--ns-lime)", fontWeight: 500 }}
                />
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
            </MaskedLine>
          </h1>
          <p
            className="hero-copy"
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
            className="hero-ctas"
            style={{
              marginTop: 36,
              display: "flex",
              gap: 14,
              fontFamily: MONO,
              fontSize: 12,
              flexWrap: "wrap",
            }}
          >
            <Magnetic>
              <a
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
                [ deploy_agents ↗ ]
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#agent-demo"
                style={{
                  display: "inline-block",
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
            </Magnetic>
          </div>
        </div>

        <div ref={orbRef} className="hero-orb" style={{ willChange: "transform" }}>
          <HudOrb />
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
