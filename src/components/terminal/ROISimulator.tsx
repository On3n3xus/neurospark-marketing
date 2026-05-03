"use client";

import { useMemo, useState } from "react";
import SectionHead from "./SectionHead";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

type Tone = "violet" | "cyan" | "lime" | "magenta";
const colorFor = (t: Tone) =>
  t === "lime"
    ? "var(--ns-lime)"
    : t === "cyan"
    ? "var(--ns-cyan)"
    : t === "magenta"
    ? "var(--ns-magenta)"
    : "var(--ns-violet)";

export default function ROISimulator() {
  const [spend, setSpend] = useState(20000);
  const [aov, setAov] = useState(180);
  const [margin, setMargin] = useState(40);
  const [funnel, setFunnel] = useState(2.4);
  const [ai, setAi] = useState(true);

  const { revenue, profit, roas, cpc, months, maxRev } = useMemo(() => {
    const cpc = ai ? 1.42 : 2.18;
    const clicks = spend / cpc;
    const convs = clicks * (funnel / 100);
    const revenue = convs * aov;
    const profit = revenue * (margin / 100) - spend;
    const roas = revenue / spend;
    const months = Array.from({ length: 12 }, (_, i) => {
      const factor = ai ? 1 + i * 0.085 : 1 + i * 0.018;
      return {
        m: i + 1,
        rev: Math.round(revenue * factor),
        prof: Math.round(profit * factor),
      };
    });
    const maxRev = Math.max(...months.map((m) => m.rev));
    return { revenue, profit, roas, cpc, months, maxRev };
  }, [spend, aov, margin, funnel, ai]);

  const num = (n: number) => "$" + Math.round(n).toLocaleString();

  const controls: {
    l: string;
    v: number;
    set: (n: number) => void;
    min: number;
    max: number;
    step: number;
    fmt: (v: number) => string;
  }[] = [
    {
      l: "monthly_spend",
      v: spend,
      set: setSpend,
      min: 5000,
      max: 200000,
      step: 1000,
      fmt: (v) => "$" + v.toLocaleString(),
    },
    {
      l: "avg_order_value",
      v: aov,
      set: setAov,
      min: 30,
      max: 1500,
      step: 5,
      fmt: (v) => "$" + v,
    },
    {
      l: "gross_margin_%",
      v: margin,
      set: setMargin,
      min: 10,
      max: 90,
      step: 1,
      fmt: (v) => v + "%",
    },
    {
      l: "funnel_conv_%",
      v: funnel,
      set: setFunnel,
      min: 0.2,
      max: 8,
      step: 0.1,
      fmt: (v) => v.toFixed(1) + "%",
    },
  ];

  const stats: { l: string; v: string; tone: Tone }[] = [
    { l: "projected_revenue / mo", v: num(revenue), tone: "violet" },
    { l: "projected_profit / mo", v: num(profit), tone: profit > 0 ? "lime" : "magenta" },
    { l: "roas", v: roas.toFixed(2) + "x", tone: "cyan" },
    { l: "avg_cpc", v: "$" + cpc.toFixed(2), tone: "violet" },
  ];

  return (
    <section
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// LIVE · ROI.SIM"
        title="Project the next 12 months."
        sub="Move the dials. Toggle Neurospark on or off. The model recomputes a 12-month revenue trajectory in real time."
      />
      <div
        className="roi-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 32,
          marginTop: 40,
        }}
      >
        <div
          style={{
            background: "rgba(15,16,24,0.6)",
            border: "1px solid var(--ns-line-strong)",
            padding: 22,
            fontFamily: MONO,
            fontSize: 11,
          }}
        >
          {controls.map((c) => (
            <div key={c.l} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--ns-text-faint)",
                  letterSpacing: "0.15em",
                  marginBottom: 6,
                }}
              >
                <span>{c.l}</span>
                <span style={{ color: "var(--ns-violet)" }}>{c.fmt(c.v)}</span>
              </div>
              <input
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={c.v}
                onChange={(e) => c.set(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ns-violet)" }}
              />
            </div>
          ))}
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: "1px dashed var(--ns-line-strong)",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={ai}
                onChange={(e) => setAi(e.target.checked)}
                style={{ accentColor: "var(--ns-violet)" }}
              />
              <span style={{ color: "var(--ns-text)", letterSpacing: "0.15em" }}>
                NEUROSPARK_DEPLOYED
              </span>
            </label>
            <div
              style={{
                marginTop: 6,
                color: "var(--ns-text-faint)",
                fontSize: 10,
              }}
            >
              {ai
                ? "agents tuning bids · cpc lower · funnel optimized"
                : "baseline · no agents · cpc avg"}
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--ns-line-strong)",
            padding: 22,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="roi-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16,
              marginBottom: 22,
            }}
          >
            {stats.map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "var(--ns-text-faint)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 28,
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    marginTop: 4,
                    color: colorFor(s.tone),
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <svg
            viewBox="0 0 720 180"
            width="100%"
            height="200"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="d1bar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((p) => (
              <line
                key={p}
                x1="0"
                y1={20 + p * 140}
                x2="720"
                y2={20 + p * 140}
                stroke="rgba(124,92,255,0.12)"
                strokeDasharray="2 4"
              />
            ))}
            {months.map((m, i) => {
              const x = 20 + i * 58;
              const h = Math.max(2, (m.rev / maxRev) * 140);
              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={160 - h}
                    width={42}
                    height={h}
                    fill="url(#d1bar)"
                    stroke="var(--ns-violet)"
                    strokeWidth="0.5"
                    style={{
                      transition:
                        "height .35s cubic-bezier(.2,.7,.3,1), y .35s",
                    }}
                  />
                  <text
                    x={x + 21}
                    y={174}
                    textAnchor="middle"
                    fontFamily="var(--font-jetbrains-mono), monospace"
                    fontSize="8"
                    fill="rgba(232,230,240,0.4)"
                    letterSpacing="0.1em"
                  >
                    M{m.m}
                  </text>
                </g>
              );
            })}
            <polyline
              fill="none"
              stroke="var(--ns-lime)"
              strokeWidth="1.4"
              points={months
                .map(
                  (m, i) =>
                    `${20 + i * 58 + 21},${160 - Math.max(2, (m.rev / maxRev) * 140)}`
                )
                .join(" ")}
              style={{ transition: "all .35s" }}
            />
          </svg>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-text-faint)",
              marginTop: 8,
              letterSpacing: "0.15em",
              flexWrap: "wrap",
            }}
          >
            <span>● MONTHLY REVENUE</span>
            <span style={{ color: "var(--ns-lime)" }}>● TREND</span>
            <span style={{ flex: 1 }} />
            <span>{ai ? "NEUROSPARK · ENABLED" : "BASELINE · NO AGENTS"}</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .roi-grid { grid-template-columns: 1fr !important; }
          .roi-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
