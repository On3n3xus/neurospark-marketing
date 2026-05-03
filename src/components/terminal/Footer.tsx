import Link from "next/link";
import Logo from "./Logo";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

type FooterItem = { label: string; href?: string };

const COLS: { h: string; items: FooterItem[] }[] = [
  {
    h: "OPERATIONS",
    items: [
      { label: "Agents", href: "/services/ai-agents" },
      { label: "Content Engine", href: "/services/content-engine" },
      { label: "Paid Media", href: "/services/paid-media-ai" },
      { label: "Brand Intel", href: "/services/brand-intel" },
      { label: "Growth Automation", href: "/services/growth-automation" },
      { label: "Revenue Forecast", href: "/services/revenue-forecast" },
    ],
  },
  {
    h: "INDUSTRIES",
    items: [
      { label: "Dental", href: "/industries/dental-marketing-minneapolis" },
      { label: "Med Spa", href: "/industries/med-spa-marketing-minneapolis" },
      { label: "Real Estate", href: "/industries/real-estate-marketing-minneapolis" },
      { label: "HVAC", href: "/industries/hvac-marketing-minneapolis" },
      { label: "Plumbing", href: "/industries/plumbing-marketing-minneapolis" },
      { label: "Roofing", href: "/industries/roofing-marketing-minneapolis" },
    ],
  },
  {
    h: "COMPANY",
    items: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    h: "CONTACT",
    items: [
      { label: "Danilo@neurosparkmarketing.com", href: "mailto:Danilo@neurosparkmarketing.com" },
      { label: "Minneapolis · Remote" },
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
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.4fr",
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
                  key={it.label}
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "var(--ns-text-dim)",
                  }}
                >
                  {it.href ? (
                    it.href.startsWith("mailto:") ? (
                      <a
                        href={it.href}
                        className="footer-link"
                        style={{
                          color: "var(--ns-text-dim)",
                          textDecoration: "none",
                          transition: "color .2s",
                        }}
                      >
                        {it.label}
                      </a>
                    ) : (
                      <Link
                        href={it.href}
                        className="footer-link"
                        style={{
                          color: "var(--ns-text-dim)",
                          textDecoration: "none",
                          transition: "color .2s",
                        }}
                      >
                        {it.label}
                      </Link>
                    )
                  ) : (
                    <span>{it.label}</span>
                  )}
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
      <style>{`
        .footer-link:hover { color: var(--ns-violet) !important; }
      `}</style>
    </footer>
  );
}
