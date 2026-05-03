"use client";

import { useState } from "react";
import SectionHead from "./SectionHead";
import { nsAsk } from "./use-ns-ask";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const SAMPLES = [
  "draft 3 cold emails for fintech CFOs",
  "summarize this week's pipeline",
  "find competitors of Northwind Co.",
];

const ARIA_SYSTEM = `You are 'Aria', an outbound AI agent at Neurospark. Reply in 2 short lines maximum, in lowercase technical voice with one mono term in CAPS. No preamble, no emojis.`;

type Msg = { role: "agent" | "user"; text: string };

export default function AgentDemo() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "agent",
      text: "Aria here. I run your outbound. What would you like me to do today?",
    },
  ]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim() || busy) return;
    const q = input;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    const a = await nsAsk(`User said: ${q}`, ARIA_SYSTEM);
    setMessages((m) => [...m, { role: "agent", text: a }]);
    setBusy(false);
  };

  return (
    <section
      id="agent-demo"
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// LIVE"
        title="Talk to an agent."
        sub="This panel is wired to a real model. Ask it to draft something — it will."
      />
      <div
        className="ad-grid"
        style={{
          marginTop: 48,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}
      >
        <div
          style={{
            background: "rgba(15,16,24,0.6)",
            border: "1px solid var(--ns-line-strong)",
            borderRadius: 4,
            fontFamily: MONO,
            fontSize: 12,
            minHeight: 380,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid var(--ns-line)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--ns-text-faint)",
              letterSpacing: "0.15em",
              fontSize: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--ns-lime)",
                boxShadow: "0 0 8px var(--ns-lime)",
              }}
            />
            agent.aria · outbound · session_8842
            <span style={{ flex: 1 }} />
            <span>uptime 71d</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: 18,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <span
                  style={{
                    color:
                      m.role === "agent"
                        ? "var(--ns-violet)"
                        : "var(--ns-cyan)",
                    flexShrink: 0,
                  }}
                >
                  {m.role === "agent" ? "aria>" : "you>"}
                </span>
                <span
                  style={{
                    color:
                      m.role === "agent"
                        ? "var(--ns-text)"
                        : "var(--ns-text-dim)",
                    lineHeight: 1.6,
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))}
            {busy && (
              <div style={{ color: "var(--ns-violet)" }}>
                aria&gt; <span className="ns-ai-thinking">routing</span>
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            style={{
              padding: 14,
              borderTop: "1px solid var(--ns-line)",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--ns-violet)" }}>{">"}</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="instruct your agent…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--ns-text)",
                fontFamily: MONO,
                fontSize: 12,
                caretColor: "var(--ns-violet)",
              }}
            />
            <button
              type="submit"
              disabled={busy}
              style={{
                padding: "6px 12px",
                background: "var(--ns-violet)",
                color: "white",
                border: "none",
                borderRadius: 2,
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.15em",
                cursor: busy ? "wait" : "pointer",
                textTransform: "uppercase",
                opacity: busy ? 0.5 : 1,
              }}
            >
              SEND
            </button>
          </form>
        </div>
        <div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-text-faint)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Try a prompt
          </div>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {SAMPLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setInput(s)}
                className="ad-sample"
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  background: "transparent",
                  border: "1px solid var(--ns-line)",
                  color: "var(--ns-text)",
                  fontFamily: MONO,
                  fontSize: 12,
                  cursor: "pointer",
                  borderRadius: 2,
                  transition: "border-color .2s, color .2s",
                }}
              >
                › {s}
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 28,
              padding: 18,
              border: "1px dashed var(--ns-line-strong)",
              borderRadius: 2,
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-text-dim)",
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: "var(--ns-violet)", marginBottom: 8 }}>
              NOTE //
            </div>
            Agents come trained on your CRM, brand voice and product data. The
            one above is a public demo running on a sandbox account.
          </div>
        </div>
      </div>
      <style>{`
        .ad-sample:hover { border-color: var(--ns-violet) !important; color: var(--ns-violet) !important; }
        @media (max-width: 880px) {
          .ad-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
