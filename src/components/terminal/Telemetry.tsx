import { TERMINAL_TELEMETRY } from "@/lib/terminal-data";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const colorFor = (tone: "lime" | "cyan" | "violet") =>
  tone === "lime"
    ? "var(--ns-lime)"
    : tone === "cyan"
    ? "var(--ns-cyan)"
    : "var(--ns-violet)";

export default function Telemetry() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--ns-line)",
        borderBottom: "1px solid var(--ns-line)",
        padding: "20px 0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 32,
      }}
    >
      {TERMINAL_TELEMETRY.map((t) => (
        <div
          key={t.k}
          style={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: "var(--ns-text-faint)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {t.k}
          </div>
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 28,
              fontWeight: 400,
              color: colorFor(t.tone),
              letterSpacing: "-0.02em",
            }}
          >
            {t.v}
          </div>
        </div>
      ))}
    </section>
  );
}
