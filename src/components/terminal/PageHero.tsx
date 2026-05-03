import type { ReactNode } from "react";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function PageHero({
  route,
  title,
  intro,
  maxTitle = 1100,
}: {
  route: string;
  title: ReactNode;
  intro?: ReactNode;
  maxTitle?: number;
}) {
  return (
    <section style={{ padding: "60px 0 40px" }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--ns-violet)",
          letterSpacing: "0.2em",
        }}
      >
        // /{route.toUpperCase()}
      </div>
      <h1
        style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: "clamp(48px, 7vw, 80px)",
          letterSpacing: "-0.04em",
          margin: "12px 0 0",
          maxWidth: maxTitle,
          color: "var(--ns-text)",
          lineHeight: 1.04,
        }}
      >
        {title}
      </h1>
      {intro && (
        <p
          style={{
            maxWidth: 620,
            color: "var(--ns-text-dim)",
            fontSize: 16,
            lineHeight: 1.6,
            marginTop: 18,
          }}
        >
          {intro}
        </p>
      )}
    </section>
  );
}
