import type { ReactNode } from "react";
import TerminalShell from "./TerminalShell";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function BlogTerminalShell({
  meta,
  children,
}: {
  meta?: {
    title: string;
    date: string;
    author: string;
    readingTime: string;
  };
  children: ReactNode;
}) {
  return (
    <TerminalShell>
      {meta && (
        <header style={{ padding: "60px 0 40px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-violet)",
              letterSpacing: "0.2em",
            }}
          >
            // /BLOG
          </div>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 64px)",
              letterSpacing: "-0.04em",
              margin: "12px 0 18px",
              color: "var(--ns-text)",
              lineHeight: 1.05,
            }}
          >
            {meta.title}
          </h1>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "var(--ns-text-faint)",
              letterSpacing: "0.15em",
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span>{new Date(meta.date).toISOString().slice(0, 10)}</span>
            <span>· {meta.author}</span>
            <span>· {meta.readingTime}</span>
          </div>
        </header>
      )}
      <article
        className="ns-prose"
        style={{
          maxWidth: 760,
          padding: "0 0 80px",
          fontFamily: DISPLAY,
          fontSize: 17,
          lineHeight: 1.7,
          color: "var(--ns-text)",
        }}
      >
        {children}
      </article>
      <style>{`
        .ns-prose h2 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-weight: 400; font-size: 28px; letter-spacing: -0.02em;
          margin: 48px 0 16px; color: var(--ns-text);
        }
        .ns-prose h3 {
          font-family: var(--font-space-grotesk), system-ui, sans-serif;
          font-weight: 500; font-size: 20px; letter-spacing: -0.01em;
          margin: 32px 0 12px; color: var(--ns-text);
        }
        .ns-prose p { margin: 0 0 18px; color: var(--ns-text-dim); }
        .ns-prose a { color: var(--ns-violet); text-decoration: underline; text-decoration-color: var(--ns-line-strong); }
        .ns-prose a:hover { text-decoration-color: var(--ns-violet); }
        .ns-prose ul, .ns-prose ol { padding-left: 24px; margin: 0 0 18px; color: var(--ns-text-dim); }
        .ns-prose li { margin-bottom: 6px; }
        .ns-prose blockquote {
          margin: 24px 0; padding: 18px 24px;
          border-left: 3px solid var(--ns-violet);
          background: rgba(124,92,255,0.06);
          color: var(--ns-text);
        }
        .ns-prose code {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 14px; padding: 2px 6px;
          background: rgba(124,92,255,0.12); color: var(--ns-violet);
          border-radius: 2px;
        }
        .ns-prose pre {
          background: rgba(15,16,24,0.8);
          border: 1px solid var(--ns-line-strong);
          padding: 18px; overflow-x: auto;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 13px; line-height: 1.6;
        }
        .ns-prose pre code { background: transparent; padding: 0; color: var(--ns-text); }
        .ns-prose hr { border: none; border-top: 1px dashed var(--ns-line-strong); margin: 32px 0; }
      `}</style>
    </TerminalShell>
  );
}
