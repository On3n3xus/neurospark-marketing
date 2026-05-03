import Link from "next/link";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export type Chip = { label: string; href: string };

export default function PillarChips({
  label,
  chips,
}: {
  label: string;
  chips: Chip[];
}) {
  return (
    <section
      style={{
        padding: "40px 0",
        borderTop: "1px solid var(--ns-line)",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 11,
          color: "var(--ns-violet)",
          letterSpacing: "0.2em",
          marginBottom: 18,
        }}
      >
        {label}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {chips.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="pchip"
            style={{
              fontFamily: MONO,
              fontSize: 11,
              padding: "8px 14px",
              border: "1px solid var(--ns-line-strong)",
              color: "var(--ns-text)",
              textDecoration: "none",
              borderRadius: 2,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "border-color .2s, color .2s, background .2s",
            }}
          >
            → {c.label}
          </Link>
        ))}
      </div>
      <style>{`
        .pchip:hover { border-color: var(--ns-violet); color: var(--ns-violet); background: rgba(124,92,255,0.05); }
      `}</style>
    </section>
  );
}
