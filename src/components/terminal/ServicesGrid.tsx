"use client";

import Link from "next/link";
import SectionHead from "./SectionHead";
import Reveal from "./motion/Reveal";
import { TERMINAL_SERVICES } from "@/lib/terminal-data";

/* Cursor spotlight — track pointer position into CSS vars for the ::after glow */
function trackSpotlight(e: React.MouseEvent<HTMLAnchorElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? TERMINAL_SERVICES.slice(0, limit) : TERMINAL_SERVICES;
  return (
    <section style={{ padding: "80px 0" }}>
      <Reveal>
        <SectionHead
          label="// SERVICES"
          title="Six systems. One operator."
          sub="Each module ships in 21 days. Plug into your existing stack — Slack, HubSpot, Shopify, GA4, Snowflake."
        />
      </Reveal>
      <Reveal stagger=".service-cell" staggerEach={0.07}>
      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          marginTop: 48,
          border: "1px solid var(--ns-line)",
        }}
      >
        {items.map((s, i) => (
          <Link
            key={s.id}
            href={`/services/${s.id}`}
            className="service-cell"
            onMouseMove={trackSpotlight}
            style={{
              overflow: "hidden",
              padding: 28,
              borderRight:
                i % 3 !== 2 ? "1px solid var(--ns-line)" : "none",
              borderBottom:
                i < items.length - 3 ? "1px solid var(--ns-line)" : "none",
              position: "relative",
              cursor: "pointer",
              transition: "background .2s",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "var(--ns-violet)",
                  letterSpacing: "0.18em",
                }}
              >
                {s.code}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "var(--ns-text-faint)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {s.tag}
              </div>
            </div>
            <div
              style={{
                marginTop: 24,
                fontFamily: DISPLAY,
                fontWeight: 500,
                fontSize: 22,
                letterSpacing: "0.04em",
                color: "var(--ns-text)",
              }}
            >
              {s.name}
            </div>
            <p
              style={{
                marginTop: 12,
                color: "var(--ns-text-dim)",
                fontSize: 13,
                lineHeight: 1.55,
              }}
            >
              {s.desc}
            </p>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 28,
                  fontWeight: 400,
                  color: "var(--ns-lime)",
                }}
              >
                {s.metric}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: "var(--ns-text-faint)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {s.metricLabel}
              </span>
            </div>
          </Link>
        ))}
      </div>
      </Reveal>
      <style>{`
        .service-cell:hover { background: rgba(124,92,255,0.05); }
        .service-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(124,92,255,0.14), transparent 65%);
          opacity: 0;
          transition: opacity .3s;
          pointer-events: none;
        }
        .service-cell:hover::after { opacity: 1; }
        @media (max-width: 880px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .service-cell { border-right: none !important; border-bottom: 1px solid var(--ns-line) !important; }
        }
        @media (min-width: 881px) and (max-width: 1180px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .service-cell { border-right: 1px solid var(--ns-line); border-bottom: 1px solid var(--ns-line); }
        }
      `}</style>
    </section>
  );
}
