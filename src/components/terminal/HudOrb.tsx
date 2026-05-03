"use client";

import { useEffect, useState } from "react";

const POINTS = [
  { a: 30, r: 150, l: "AGENT.07" },
  { a: 110, r: 130, l: "OUTBOUND" },
  { a: 200, r: 165, l: "SEO.RANK" },
  { a: 290, r: 140, l: "BID.MGR" },
  { a: 350, r: 110, l: "BRAND.AI" },
];

export default function HudOrb() {
  const [sweep, setSweep] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      setSweep(((t - t0) / 30) % 360);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: 460,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <defs>
          <radialGradient id="d1orb" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#7C5CFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="d1ring" x1="0" x2="1">
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="d1sweep" x1="0" x2="1">
            <stop offset="0%" stopColor="#C6FF3C" stopOpacity="0" />
            <stop offset="100%" stopColor="#C6FF3C" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="160" fill="url(#d1orb)" />
        {[60, 90, 120, 150, 180].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="url(#d1ring)"
            strokeWidth="0.6"
            opacity={0.3 + i * 0.08}
            strokeDasharray={i % 2 ? "4 6" : "1 4"}
            style={{
              animation: `ns-rotate ${20 + i * 8}s linear ${
                i % 2 ? "reverse" : ""
              } infinite`,
              transformOrigin: "200px 200px",
            }}
          />
        ))}
        <line
          x1="200"
          y1="20"
          x2="200"
          y2="380"
          stroke="rgba(124,92,255,0.2)"
          strokeDasharray="2 4"
        />
        <line
          x1="20"
          y1="200"
          x2="380"
          y2="200"
          stroke="rgba(124,92,255,0.2)"
          strokeDasharray="2 4"
        />
        {POINTS.map((p, i) => {
          const x = 200 + Math.cos((p.a * Math.PI) / 180) * p.r;
          const y = 200 + Math.sin((p.a * Math.PI) / 180) * p.r;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#C6FF3C" />
              <circle
                cx={x}
                cy={y}
                r="3"
                fill="#C6FF3C"
                opacity="0.4"
                style={{ animation: "ns-pulse 2s infinite" }}
              />
              <text
                x={x + 8}
                y={y + 3}
                fill="#22D3EE"
                fontSize="9"
                fontFamily="var(--font-jetbrains-mono), monospace"
                letterSpacing="0.1em"
              >
                {p.l}
              </text>
            </g>
          );
        })}
        <g transform={`rotate(${sweep} 200 200)`}>
          <path
            d={`M 200 200 L ${200 + Math.cos(-0.6) * 180} ${
              200 + Math.sin(-0.6) * 180
            } A 180 180 0 0 1 ${200 + Math.cos(0) * 180} ${
              200 + Math.sin(0) * 180
            } Z`}
            fill="url(#d1sweep)"
          />
        </g>
        <circle
          cx="200"
          cy="200"
          r="28"
          fill="#0A0B10"
          stroke="#7C5CFF"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="14"
          fill="#7C5CFF"
          opacity="0.8"
          style={{ animation: "ns-pulse 3s infinite" }}
        />
        <text
          x="200"
          y="204"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontFamily="var(--font-jetbrains-mono), monospace"
          letterSpacing="0.15em"
          fontWeight="600"
        >
          CORE
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10,
          color: "var(--ns-text-faint)",
          letterSpacing: "0.15em",
        }}
      >
        FIG_01.OPERATIONAL_MAP
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10,
          color: "var(--ns-violet)",
          letterSpacing: "0.15em",
        }}
      >
        ● LIVE · 147 NODES
      </div>
    </div>
  );
}
