"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import Typer from "./Typer";
import { nsAsk } from "./use-ns-ask";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const SYSTEM = `You are Neurospark's campaign-generation agent. Output exactly three lines, no preamble, no numbering. Each line MUST be in this format: "TITLE — channel — one-line tactical hook." Use bold, plain English. No emojis.`;

export default function CampaignGenerator() {
  const [brand, setBrand] = useState(
    "A small accounting SaaS for freelancers and contractors."
  );
  const [goal, setGoal] = useState("Triple paid-trial signups in Q3.");
  const [busy, setBusy] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);

  const run = async () => {
    if (busy || !brand.trim()) return;
    setBusy(true);
    setIdeas([]);
    const prompt = `Brand: "${brand}". Goal: "${goal}". Generate 3 distinct, concrete marketing campaign ideas.`;
    const a = await nsAsk(prompt, SYSTEM);
    const lines = a
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !/^brand/i.test(l) && !/^goal/i.test(l))
      .slice(0, 3);
    setIdeas(lines);
    setBusy(false);
  };

  return (
    <section
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// LIVE · CAMPAIGN.GEN"
        title="Generate three campaign ideas."
        sub="Drop in your brand and a goal. The agent returns three distinct, channel-specific campaign hooks in real time."
      />
      <div
        className="cg-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
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
            BRAND
          </div>
          <textarea
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            rows={2}
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
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
              margin: "14px 0 8px",
            }}
          >
            GOAL
          </div>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={2}
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
            {busy ? "[ generating… ]" : "[ generate_ideas ↗ ]"}
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ideas.length === 0 && !busy && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ns-text-faint)",
                padding: 22,
                border: "1px dashed var(--ns-line-strong)",
              }}
            >
              ▢ awaiting brief…
            </div>
          )}
          {busy && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                color: "var(--ns-violet)",
                padding: 22,
                border: "1px dashed var(--ns-violet)",
              }}
            >
              <span className="ns-ai-thinking">computing 3 vectors</span>
            </div>
          )}
          {ideas.map((idea, i) => (
            <div
              key={i}
              style={{
                padding: 22,
                border: "1px solid var(--ns-line-strong)",
                background:
                  "linear-gradient(90deg, rgba(124,92,255,0.08), transparent)",
                animation: `ns-rise .5s ${i * 0.15}s both`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: "var(--ns-violet)",
                    letterSpacing: "0.2em",
                  }}
                >
                  VECTOR_{String(i + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    color: "var(--ns-lime)",
                    letterSpacing: "0.2em",
                  }}
                >
                  ● READY
                </div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: DISPLAY,
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--ns-text)",
                }}
              >
                <Typer text={idea} speed={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .cg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
