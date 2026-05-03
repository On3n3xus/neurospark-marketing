"use client";

import { useEffect, useState } from "react";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const LABELS = [
  "out.email",
  "seo.crawl",
  "bid.adjust",
  "brand.scan",
  "crm.route",
  "content.gen",
  "agent.spawn",
  "forecast.run",
  "ad.refresh",
];
const TONES: ("violet" | "cyan" | "lime")[] = [
  "violet",
  "cyan",
  "lime",
  "violet",
  "cyan",
  "lime",
  "violet",
  "cyan",
  "lime",
];

const color = (t: string) =>
  t === "lime"
    ? "var(--ns-lime)"
    : t === "cyan"
    ? "var(--ns-cyan)"
    : "var(--ns-violet)";

type Sig = { id: number; label: string; v: number; tone: "violet" | "cyan" | "lime" };

export default function LiveSignals() {
  const [sigs, setSigs] = useState<Sig[]>(
    LABELS.map((label, i) => ({
      id: i,
      label,
      v: 35 + ((i * 17) % 50),
      tone: TONES[i],
    }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSigs((prev) =>
        prev.map((s) => ({
          ...s,
          v: Math.max(8, Math.min(98, s.v + (Math.random() * 40 - 20))),
        }))
      );
    }, 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        borderTop: "1px solid var(--ns-line)",
        borderBottom: "1px solid var(--ns-line)",
        padding: "20px 0",
        display: "grid",
        gridTemplateColumns: "repeat(9, 1fr)",
        gap: 14,
      }}
      className="live-signals"
    >
      {sigs.map((s) => (
        <div
          key={s.id}
          style={{ display: "flex", flexDirection: "column", gap: 6 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
              height: 36,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((b) => {
              const h = Math.max(3, ((s.v + b * 7) % 100) * 0.36);
              return (
                <div
                  key={b}
                  style={{
                    flex: 1,
                    height: h,
                    background: color(s.tone),
                    opacity: 0.6 + b / 14,
                    transition: "height .8s cubic-bezier(.2,.7,.3,1)",
                  }}
                />
              );
            })}
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
            {s.label}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: color(s.tone),
            }}
          >
            {Math.round(s.v)}
            <span style={{ color: "var(--ns-text-faint)" }}>/100</span>
          </div>
        </div>
      ))}
      <style>{`
        @media (max-width: 1024px) { .live-signals { grid-template-columns: repeat(3, 1fr) !important; } }
      `}</style>
    </section>
  );
}
