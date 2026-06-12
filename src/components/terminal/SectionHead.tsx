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
            color: "var(--ns-violet)",
            letterSpacing: "0.2em",
          }}
        >
          {label}
        </div>
        <h2
          style={{
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(36px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "12px 0 0",
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
