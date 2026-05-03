"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import Typer from "./Typer";
import { nsAsk } from "./use-ns-ask";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const SYSTEM = `You are Neurospark's strategy agent. Output exactly four lines, no preamble. Each line MUST start with "STEP 0X — title — one tactical sentence." (replace X with 1..4). Use Neurospark agents (SEO, content, paid, brand intel, automation) where they fit. No emojis, no numbering beyond the STEP prefix.`;

export default function StrategyPlan() {
  const [biz, setBiz] = useState(
    "A 14-person mid-market HR-tech SaaS launching in the EU."
  );
  const [busy, setBusy] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);

  const run = async () => {
    if (busy || !biz.trim()) return;
    setBusy(true);
    setPlan([]);
    const a = await nsAsk(`Business: "${biz}". Build a 4-step 90-day AI marketing plan.`, SYSTEM);
    const lines = a
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /STEP/i.test(l))
      .slice(0, 4);
    for (let i = 0; i < lines.length; i++) {
      await new Promise((r) => setTimeout(r, 220));
      setPlan((p) => [...p, lines[i]]);
    }
    setBusy(false);
  };

  return (
    <section
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// LIVE · STRATEGY.GEN"
        title="Generate a 90-day plan."
        sub="Describe your business. The strategy agent returns a 4-step deployment plan, sequenced by impact."
      />
      <div
        className="sp-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 32,
          marginTop: 40,
        }}
      >
        <div
          style={{
            background: "rgba(15,16,24,0.6)",
            border: "1px solid var(--ns-line-strong)",
            padding: 22,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
              marginBottom: 8,
            }}
          >
            BUSINESS
          </div>
          <textarea
            value={biz}
            onChange={(e) => setBiz(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              background: "rgba(6,7,10,0.6)",
              border: "1px solid var(--ns-line)",
              padding: 12,
              color: "var(--ns-text)",
              fontFamily: MONO,
              fontSize: 12,
              outline: "none",
              resize: "vertical",
              lineHeight: 1.5,
            }}
          />
          <button
            onClick={run}
            disabled={busy}
            style={{
              marginTop: 14,
              padding: "12px 18px",
              background: "var(--ns-violet)",
              color: "white",
              border: "none",
              cursor: busy ? "wait" : "pointer",
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              borderRadius: 2,
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "[ planning… ]" : "[ generate_plan ↗ ]"}
          </button>
        </div>
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 6,
              bottom: 6,
              width: 2,
              background:
                "linear-gradient(to bottom, var(--ns-violet), transparent)",
            }}
          />
          {plan.length === 0 && !busy && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ns-text-faint)",
                padding: 22,
                border: "1px dashed var(--ns-line-strong)",
              }}
            >
              ▢ awaiting business profile…
            </div>
          )}
          {busy && plan.length === 0 && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ns-violet)",
              }}
            >
              <span className="ns-ai-thinking">sequencing 4 steps</span>
            </div>
          )}
          {plan.map((step, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                marginBottom: 14,
                padding: "18px 20px",
                border: "1px solid var(--ns-line-strong)",
                background:
                  "linear-gradient(90deg, rgba(124,92,255,0.07), transparent)",
                animation: "ns-rise .45s both",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -28,
                  top: 22,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--ns-bg)",
                  border: "2px solid var(--ns-violet)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "var(--ns-violet)",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--ns-text)",
                }}
              >
                <Typer text={step} speed={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .sp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
