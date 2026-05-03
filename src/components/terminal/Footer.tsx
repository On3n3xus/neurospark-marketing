import Logo from "./Logo";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const COLS = [
  { h: "OPERATIONS", items: ["Agents", "Content Engine", "Paid Media", "Brand Intel"] },
  { h: "COMPANY", items: ["About", "Work", "Team", "Press"] },
  {
    h: "CONTACT",
    items: [
      "hello@neurosparkmarketing.com",
      "+1 (651) 408-5082",
      "Minneapolis · Remote",
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "60px 24px 40px",
        borderTop: "1px solid var(--ns-line)",
        marginTop: 40,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 40,
          maxWidth: 1480,
          margin: "0 auto",
        }}
      >
        <div>
          <Logo />
          <p
            style={{
              marginTop: 16,
              color: "var(--ns-text-dim)",
              fontSize: 13,
              maxWidth: 320,
              lineHeight: 1.6,
            }}
          >
            AI marketing operator for small and mid-size teams. Minneapolis ·
            Remote-first · Founded 2023.
          </p>
        </div>
        {COLS.map((c) => (
          <div key={c.h}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: "var(--ns-violet)",
                letterSpacing: "0.2em",
                marginBottom: 14,
              }}
            >
              {c.h}
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {c.items.map((it) => (
                <li
                  key={it}
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "var(--ns-text-dim)",
                  }}
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 60,
          padding: "14px 0",
          borderTop: "1px solid var(--ns-line)",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: MONO,
          fontSize: 10,
          color: "var(--ns-text-faint)",
          letterSpacing: "0.15em",
          maxWidth: 1480,
          margin: "60px auto 0",
        }}
      >
        <span>© {new Date().getFullYear()} NEUROSPARK MARKETING</span>
        <span>BUILT BY HUMANS — RUN BY AGENTS</span>
        <span>v4.2.1</span>
      </div>
    </footer>
  );
}
