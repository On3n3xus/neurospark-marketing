import SectionHead from "./SectionHead";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-space-grotesk), system-ui, sans-serif";

const TIERS = [
  {
    tier: "STARTER",
    price: "$8K",
    mo: "/mo",
    mods: "2 modules",
    best: "For teams of 2–10",
    cta: "OPEN_CHANNEL",
  },
  {
    tier: "OPERATOR",
    price: "$22K",
    mo: "/mo",
    mods: "4 modules",
    best: "For teams of 10–50",
    cta: "OPEN_CHANNEL",
    recommended: true,
  },
  {
    tier: "COMMAND",
    price: "$48K",
    mo: "/mo",
    mods: "All 6 modules",
    best: "For teams of 50+",
    cta: "OPEN_CHANNEL",
  },
];

export default function PricingGrid() {
  return (
    <section
      id="pricing"
      style={{ padding: "80px 0", borderTop: "1px solid var(--ns-line)" }}
    >
      <SectionHead
        label="// PRICING"
        title="Flat retainer. No surprises."
        sub="Pricing scales with the number of active modules. Pause or swap any time."
      />
      <div
        className="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          marginTop: 48,
          border: "1px solid var(--ns-line)",
        }}
      >
        {TIERS.map((p, i) => (
          <div
            key={p.tier}
            className="pricing-cell"
            style={{
              padding: 32,
              borderRight: i < 2 ? "1px solid var(--ns-line)" : "none",
              background: p.recommended
                ? "rgba(124,92,255,0.06)"
                : "transparent",
              position: "relative",
            }}
          >
            {p.recommended && (
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  fontFamily: MONO,
                  fontSize: 9,
                  color: "var(--ns-lime)",
                  letterSpacing: "0.2em",
                  border: "1px solid var(--ns-lime)",
                  padding: "3px 6px",
                }}
              >
                RECOMMENDED
              </div>
            )}
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: "var(--ns-violet)",
                letterSpacing: "0.2em",
              }}
            >
              {p.tier}
            </div>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "baseline",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 56,
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  color: "var(--ns-text)",
                }}
              >
                {p.price}
              </span>
              <span
                style={{
                  color: "var(--ns-text-faint)",
                  fontFamily: MONO,
                  fontSize: 13,
                }}
              >
                {p.mo}
              </span>
            </div>
            <div
              style={{
                marginTop: 8,
                color: "var(--ns-text-dim)",
                fontFamily: MONO,
                fontSize: 12,
              }}
            >
              {p.mods}
            </div>
            <div
              style={{
                marginTop: 24,
                color: "var(--ns-text-dim)",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              {p.best}
            </div>
            <a
              href="/contact"
              style={{
                display: "inline-block",
                marginTop: 28,
                padding: "10px 16px",
                background: p.recommended ? "var(--ns-violet)" : "transparent",
                color: p.recommended ? "white" : "var(--ns-violet)",
                border: "1px solid var(--ns-violet)",
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 2,
              }}
            >
              [ {p.cta} ↗ ]
            </a>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 880px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-cell { border-right: none !important; border-bottom: 1px solid var(--ns-line) !important; }
        }
      `}</style>
    </section>
  );
}
