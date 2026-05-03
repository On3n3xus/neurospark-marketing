"use client";

import { useState } from "react";
import JsonLd from "./JsonLd";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export type FAQItem = { q: string; a: string };

export default function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section style={{ padding: "60px 0", borderTop: "1px solid var(--ns-line)" }}>
      <JsonLd data={schema} />
      <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--ns-violet)", letterSpacing: "0.2em" }}>
        // FAQ
      </div>
      <h2 style={{
        fontFamily: DISPLAY, fontWeight: 300, fontSize: "clamp(36px, 4.4vw, 56px)",
        lineHeight: 1.05, letterSpacing: "-0.03em", margin: "12px 0 32px",
        color: "var(--ns-text)",
      }}>
        {title || "Common questions."}
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, border: "1px solid var(--ns-line)" }}>
        {items.map((it, i) => {
          const open = openIdx === i;
          return (
            <li
              key={i}
              style={{ borderBottom: i < items.length - 1 ? "1px solid var(--ns-line)" : "none" }}
            >
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                style={{
                  width: "100%", textAlign: "left", padding: "20px 24px",
                  background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                  color: "var(--ns-text)", fontFamily: DISPLAY, fontSize: 17,
                  fontWeight: 500, letterSpacing: "-0.01em",
                }}
              >
                <span>{it.q}</span>
                <span style={{ color: "var(--ns-violet)", fontFamily: MONO, fontSize: 14 }}>
                  {open ? "[ − ]" : "[ + ]"}
                </span>
              </button>
              {open && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    color: "var(--ns-text-dim)", fontSize: 15, lineHeight: 1.65,
                    maxWidth: 760,
                  }}
                >
                  {it.a}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
