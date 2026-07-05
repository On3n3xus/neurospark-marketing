import type { ReactNode } from "react";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

/**
 * Page hero in the Neural Descent language — ////// mono label,
 * tracked-uppercase display title, dim mono intro.
 */
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
    <section style={{ padding: "72px 0 48px" }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--ns-text-faint)",
          letterSpacing: "0.2em",
        }}
      >
        {"////// "}
        <span style={{ color: "var(--ns-violet)" }}>{route.toUpperCase()}</span>
      </div>
      <h1
        style={{
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: "clamp(30px, 4.6vw, 58px)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: "16px 0 0",
          maxWidth: maxTitle,
          color: "var(--ns-text)",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h1>
      <div
        aria-hidden
        style={{
          marginTop: 20,
          height: 1,
          width: 160,
          background:
            "linear-gradient(to right, rgba(124,92,255,0.7), transparent)",
        }}
      />
      {intro && (
        <p
          style={{
            maxWidth: 620,
            color: "var(--ns-text-dim)",
            fontFamily: MONO,
            fontSize: 13,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          {intro}
        </p>
      )}
    </section>
  );
}
