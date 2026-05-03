"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNsAsk } from "./use-ns-ask";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const ROUTE_TARGETS: Record<string, string> = {
  home: "/",
  services: "/services",
  work: "/work",
  about: "/about",
  contact: "/contact",
};

export default function CommandBar() {
  const ai = useNsAsk();
  const router = useRouter();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = input.trim();
    if (!q) return;
    const lower = q.toLowerCase();

    for (const r of Object.keys(ROUTE_TARGETS)) {
      if (lower === r || lower === `/${r}` || lower === `/${r}/`) {
        router.push(ROUTE_TARGETS[r]);
        setInput("");
        ai.reset();
        return;
      }
    }
    if (lower === "/" || lower === "index") {
      router.push("/");
      setInput("");
      ai.reset();
      return;
    }
    ai.ask(q);
  };

  const suggest = [
    "What does Neurospark do?",
    "Show me your work",
    "Pricing for a 12-person team",
    "How do AI agents work here?",
  ];

  return (
    <div
      style={{
        borderBottom: "1px solid var(--ns-line)",
        padding: "14px 24px",
        background: "linear-gradient(to bottom, rgba(124,92,255,0.04), transparent)",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: MONO,
          fontSize: 13,
        }}
      >
        <span style={{ color: "var(--ns-violet)", fontWeight: 600 }}>{">_"}</span>
        <span style={{ color: "var(--ns-text-faint)" }}>ask</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask anything · or type: services / work / about / contact"
          aria-label="Ask Neurospark"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--ns-text)",
            fontFamily: MONO,
            fontSize: 13,
            caretColor: "var(--ns-violet)",
          }}
        />
        <span
          style={{
            color: "var(--ns-text-faint)",
            fontSize: 10,
            letterSpacing: "0.1em",
          }}
        >
          ENTER ↵
        </span>
        <span
          style={{
            padding: "4px 10px",
            border: "1px solid var(--ns-line-strong)",
            color: "var(--ns-violet)",
            fontSize: 10,
            letterSpacing: "0.15em",
            borderRadius: 2,
          }}
        >
          CLAUDE · LIVE
        </span>
      </form>

      <div
        style={{
          marginTop: 10,
          paddingLeft: 28,
          fontFamily: MONO,
          fontSize: 11,
        }}
      >
        {ai.status === "idle" && (
          <div
            style={{
              display: "flex",
              gap: 14,
              color: "var(--ns-text-faint)",
              flexWrap: "wrap",
            }}
          >
            <span>try:</span>
            {suggest.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setInput(s);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ns-text-dim)",
                  fontFamily: MONO,
                  fontSize: 11,
                  padding: 0,
                  textDecoration: "underline",
                  textDecorationColor: "var(--ns-line-strong)",
                }}
              >
                &quot;{s}&quot;
              </button>
            ))}
          </div>
        )}
        {ai.status === "thinking" && (
          <div style={{ color: "var(--ns-violet)" }}>
            <span style={{ color: "var(--ns-text-faint)" }}>{">"} </span>
            <span>{ai.q}</span>
            <div style={{ marginTop: 6, color: "var(--ns-text-dim)" }}>
              <span className="ns-ai-thinking">processing</span>
            </div>
          </div>
        )}
        {ai.status === "done" && (
          <div>
            <div style={{ color: "var(--ns-text-faint)" }}>
              {">"} {ai.q}
            </div>
            <div
              style={{
                marginTop: 6,
                color: "var(--ns-text)",
                maxWidth: "90ch",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "var(--ns-lime)" }}>::</span> {ai.a}
            </div>
            <button
              type="button"
              onClick={ai.reset}
              style={{
                marginTop: 6,
                background: "transparent",
                border: "none",
                color: "var(--ns-text-faint)",
                fontFamily: MONO,
                fontSize: 10,
                cursor: "pointer",
                padding: 0,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              [ clear ]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
