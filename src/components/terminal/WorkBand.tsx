"use client";

import SectionHead from "./SectionHead";
import { TERMINAL_WORK } from "@/lib/terminal-data";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function WorkBand() {
  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}>
      <SectionHead label="// SELECT WORK" title="Operators in production." />
      <div style={{ marginTop: 48 }}>
        {TERMINAL_WORK.map((w, i) => (
          <a
            key={i}
            href="/work"
            className="work-row"
            style={{
              display: "grid",
              gridTemplateColumns: "60px 2fr 2fr 1fr 1fr 60px",
              gap: 24,
              alignItems: "center",
              padding: "24px 0",
              borderTop: "1px solid var(--ns-line)",
              borderBottom:
                i === TERMINAL_WORK.length - 1
                  ? "1px solid var(--ns-line)"
                  : "none",
              fontFamily: MONO,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              transition: "background .2s",
            }}
          >
            <div
              style={{
                color: "var(--ns-violet)",
                letterSpacing: "0.15em",
              }}
            >
              0{i + 1}
            </div>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "var(--ns-text)",
              }}
            >
              {w.client}
            </div>
            <div style={{ color: "var(--ns-text-dim)" }}>{w.sector}</div>
            <div style={{ color: "var(--ns-lime)" }}>{w.delta}</div>
            <div style={{ color: "var(--ns-text-faint)" }}>{w.when}</div>
            <div
              className="work-arr"
              style={{
                color: "var(--ns-text-faint)",
                textAlign: "right",
                transition: "color .2s",
              }}
            >
              ↗
            </div>
          </a>
        ))}
      </div>
      <style>{`
        .work-row:hover { background: rgba(124,92,255,0.04); }
        .work-row:hover .work-arr { color: var(--ns-violet) !important; }
        @media (max-width: 880px) {
          .work-row { grid-template-columns: 40px 1fr 1fr !important; gap: 12px !important; }
          .work-row > *:nth-child(4), .work-row > *:nth-child(5), .work-row > *:nth-child(6) { display: none; }
        }
      `}</style>
    </section>
  );
}
