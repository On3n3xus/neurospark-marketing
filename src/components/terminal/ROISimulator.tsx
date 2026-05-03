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

const CPC_AI = 1.42;
const CPC_BASE = 2.18;
const GROWTH_AI = 0.085;
const GROWTH_BASE = 0.018;

const fmtMoney = (n: number) => {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + "M";
  if (n >= 1_000) return "$" + Math.round(n / 1_000) + "K";
  return "$" + Math.round(n);
};
const fmtFull = (n: number) => "$" + Math.round(n).toLocaleString();

function projection(
  spend: number,
  aov: number,
  funnel: number,
  margin: number,
  cpc: number,
  growth: number
) {
  const clicks = spend / cpc;
  const convs = clicks * (funnel / 100);
  const revenue = convs * aov;
  const profit = revenue * (margin / 100) - spend;
  const months = Array.from({ length: 12 }, (_, i) => {
    const factor = 1 + i * growth;
    return {
      m: i + 1,
      rev: Math.round(revenue * factor),
      prof: Math.round(profit * factor),
    };
  });
  return { revenue, profit, roas: revenue / spend, cpc, months };
}

export default function ROISimulator() {
  const [spend, setSpend] = useState(20000);
  const [aov, setAov] = useState(180);
  const [margin, setMargin] = useState(40);
  const [funnel, setFunnel] = useState(2.4);
  const [ai, setAi] = useState(true);

  const { active, ghost, niceMax, ticks } = useMemo(() => {
    const aiProj = projection(spend, aov, funnel, margin, CPC_AI, GROWTH_AI);
    const baseProj = projection(spend, aov, funnel, margin, CPC_BASE, GROWTH_BASE);
    const active = ai ? aiProj : baseProj;
    const ghost = ai ? baseProj : aiProj;
    // Chart ceiling: tallest bar across BOTH series, rounded up to a
    // clean tick. Using both series ensures the comparison stays visible
    // and the bar HEIGHTS reflect absolute revenue (so sliders move them).
    const peak = Math.max(
      ...aiProj.months.map((m) => m.rev),
      ...baseProj.months.map((m) => m.rev)
    );
    const niceMax = niceCeiling(peak * 1.08);
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => niceMax * p);
    return { active, ghost, niceMax, ticks };
  }, [spend, aov, margin, funnel, ai]);

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
    { l: "projected_revenue / mo", v: fmtFull(active.revenue), tone: "violet" },
    {
      l: "projected_profit / mo",
      v: fmtFull(active.profit),
      tone: active.profit > 0 ? "lime" : "magenta",
    },
    { l: "roas", v: active.roas.toFixed(2) + "x", tone: "cyan" },
    { l: "avg_cpc", v: "$" + active.cpc.toFixed(2), tone: "violet" },
  ];

  // Layout constants for SVG
  const PAD_L = 60;
  const PAD_R = 16;
  const TOP = 12;
  const BOT = 160;
  const PLOT_W = 720 - PAD_L - PAD_R;
  const PLOT_H = BOT - TOP;
  const STEP = PLOT_W / 12;
  const BAR_W = STEP - 12;

  const barH = (rev: number) => Math.max(2, (rev / niceMax) * PLOT_H);
  const yFor = (rev: number) => BOT - barH(rev);
  const xFor = (i: number) => PAD_L + i * STEP + STEP / 2 - BAR_W / 2;

  return (
    <section
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// LIVE · ROI.SIM"
        title="Project the next 12 months."
        sub="Move the dials. Toggle Neurospark on or off. The model recomputes a 12-month revenue trajectory in real time — bars and trend update live."
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
            viewBox="0 0 720 200"
            width="100%"
            height="220"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="roibar" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="roighost" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {/* Y-axis gridlines + dollar tick labels */}
            {ticks
              .slice()
              .reverse()
              .map((tickVal, idx) => {
                const p = idx / (ticks.length - 1);
                const y = TOP + p * PLOT_H;
                return (
                  <g key={p}>
                    <line
                      x1={PAD_L}
                      y1={y}
                      x2={720 - PAD_R}
                      y2={y}
                      stroke="rgba(124,92,255,0.12)"
                      strokeDasharray="2 4"
                    />
                    <text
                      x={PAD_L - 8}
                      y={y + 3}
                      textAnchor="end"
                      fontFamily="var(--font-jetbrains-mono), monospace"
                      fontSize="9"
                      fill="rgba(232,230,240,0.45)"
                      letterSpacing="0.05em"
                      style={{ transition: "all .35s" }}
                    >
                      {fmtMoney(tickVal)}
                    </text>
                  </g>
                );
              })}

            {/* Ghost (alternative-path) outline bars */}
            {ghost.months.map((m, i) => {
              const h = barH(m.rev);
              return (
                <rect
                  key={`g${i}`}
                  x={xFor(i)}
                  y={BOT - h}
                  width={BAR_W}
                  height={h}
                  fill="url(#roighost)"
                  stroke="rgba(34,211,238,0.45)"
                  strokeWidth="0.7"
                  strokeDasharray="2 3"
                  style={{
                    transition:
                      "height .35s cubic-bezier(.2,.7,.3,1), y .35s",
                  }}
                />
              );
            })}

            {/* Active bars */}
            {active.months.map((m, i) => {
              const h = barH(m.rev);
              return (
                <g key={`a${i}`}>
                  <rect
                    x={xFor(i) + 4}
                    y={BOT - h}
                    width={BAR_W - 8}
                    height={h}
                    fill="url(#roibar)"
                    stroke="var(--ns-violet)"
                    strokeWidth="0.6"
                    style={{
                      transition:
                        "height .35s cubic-bezier(.2,.7,.3,1), y .35s",
                    }}
                  />
                  <text
                    x={xFor(i) + BAR_W / 2}
                    y={BOT + 14}
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

            {/* Active trend line */}
            <polyline
              fill="none"
              stroke="var(--ns-lime)"
              strokeWidth="1.6"
              points={active.months
                .map(
                  (m, i) =>
                    `${xFor(i) + BAR_W / 2},${yFor(m.rev)}`
                )
                .join(" ")}
              style={{ transition: "all .35s" }}
            />

            {/* Ghost trend line */}
            <polyline
              fill="none"
              stroke="rgba(34,211,238,0.45)"
              strokeWidth="1"
              strokeDasharray="3 3"
              points={ghost.months
                .map(
                  (m, i) =>
                    `${xFor(i) + BAR_W / 2},${yFor(m.rev)}`
                )
                .join(" ")}
              style={{ transition: "all .35s" }}
            />

            {/* M12 callout */}
            <g style={{ transition: "all .35s" }}>
              <line
                x1={xFor(11) + BAR_W / 2}
                y1={yFor(active.months[11].rev) - 12}
                x2={xFor(11) + BAR_W / 2}
                y2={yFor(active.months[11].rev) - 4}
                stroke="var(--ns-lime)"
                strokeWidth="1"
              />
              <text
                x={xFor(11) + BAR_W / 2}
                y={yFor(active.months[11].rev) - 16}
                textAnchor="middle"
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize="9"
                fill="var(--ns-lime)"
                letterSpacing="0.08em"
                fontWeight="600"
              >
                {fmtMoney(active.months[11].rev)}
              </text>
            </g>
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
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--ns-violet)" }}>■ {ai ? "WITH NEUROSPARK" : "BASELINE"}</span>
            <span style={{ color: "var(--ns-cyan)" }}>□ {ai ? "BASELINE (NO AGENTS)" : "WITH NEUROSPARK"}</span>
            <span style={{ color: "var(--ns-lime)" }}>● TREND</span>
            <span style={{ flex: 1 }} />
            <span>
              GAP @ M12:{" "}
              <span
                style={{
                  color: ai ? "var(--ns-lime)" : "var(--ns-magenta)",
                }}
              >
                {ai ? "+" : "−"}
                {fmtMoney(
                  Math.abs(active.months[11].rev - ghost.months[11].rev)
                )}
              </span>
            </span>
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

// Round a number up to a clean tick boundary so Y-axis labels stay readable
// across the full range from $1K to $30M.
function niceCeiling(n: number) {
  if (n <= 0) return 1000;
  const exp = Math.pow(10, Math.floor(Math.log10(n)));
  const f = n / exp;
  let nice: number;
  if (f <= 1) nice = 1;
  else if (f <= 2) nice = 2;
  else if (f <= 2.5) nice = 2.5;
  else if (f <= 5) nice = 5;
  else nice = 10;
  return nice * exp;
}
