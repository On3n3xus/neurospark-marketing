const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

export default function SectionHead({
  label,
  title,
  sub,
}: {
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div
      className="section-head"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "end",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: "var(--ns-text-faint)",
            letterSpacing: "0.2em",
          }}
        >
          {"////// "}
          <span style={{ color: "var(--ns-violet)" }}>
            {label.replace(/^\/+\s*/, "").toUpperCase()}
          </span>
        </div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 500,
            fontSize: "clamp(24px, 3.2vw, 40px)",
            lineHeight: 1.2,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "14px 0 0",
            color: "var(--ns-text)",
          }}
        >
          {title}
        </h2>
      </div>
      {sub && (
        <p
          style={{
            color: "var(--ns-text-dim)",
            fontSize: 14,
            lineHeight: 1.6,
            maxWidth: 460,
          }}
        >
          {sub}
        </p>
      )}
      <style>{`
        @media (max-width: 720px) {
          .section-head {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            align-items: start !important;
          }
        }
      `}</style>
    </div>
  );
}
