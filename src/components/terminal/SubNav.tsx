"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TERMINAL_ROUTES } from "@/lib/terminal-data";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

const HREF: Record<string, string> = {
  home: "/",
  services: "/services",
  work: "/work",
  about: "/about",
  contact: "/contact",
};

export default function SubNav() {
  const pathname = usePathname();
  const active =
    pathname === "/"
      ? "home"
      : TERMINAL_ROUTES.find((r) => r !== "home" && pathname.startsWith(`/${r}`)) ||
        "home";

  return (
    <div
      style={{
        padding: "8px 24px",
        borderBottom: "1px solid var(--ns-line)",
        display: "flex",
        gap: 24,
        fontFamily: MONO,
        fontSize: 11,
        color: "var(--ns-text-faint)",
        letterSpacing: "0.15em",
        flexWrap: "wrap",
      }}
    >
      {TERMINAL_ROUTES.map((r) => (
        <Link
          key={r}
          href={HREF[r]}
          style={{
            color: active === r ? "var(--ns-violet)" : "var(--ns-text-faint)",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.15em",
            padding: 0,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color .2s",
          }}
        >
          /{r}
          {active === r && (
            <span style={{ marginLeft: 6, color: "var(--ns-lime)" }}>●</span>
          )}
        </Link>
      ))}
      <span style={{ flex: 1 }} />
      <span>SCROLL ↓</span>
    </div>
  );
}
