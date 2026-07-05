"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "SERVICES", href: "/services" },
  { label: "INDUSTRIES", href: "/industries" },
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

/**
 * Unified site header in the Neural Descent HUD language — wordmark,
 * mono nav, UTC clock + sync telemetry. Replaces the old terminal
 * TopBar + SubNav pair on every inner page.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ns-line)] bg-ns-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-4">
        <Link href="/" className="shrink-0">
          <span className="font-display text-base font-semibold tracking-[0.3em] text-ns-text">
            NEUROSPARK
            <sup className="ml-1 font-jetbrains text-[8px] tracking-[0.2em] text-ns-violet">
              OS
            </sup>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 font-jetbrains text-[11px] tracking-[0.2em]">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${
                  active
                    ? "text-ns-violet"
                    : "text-ns-text/45 hover:text-ns-text"
                }`}
              >
                /{item.label}
                {active && <span className="ml-1.5 text-ns-lime">●</span>}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-6 font-jetbrains text-[10px] tracking-[0.15em] text-ns-text/40 md:flex">
          <span>44.98°N 93.27°W</span>
          <span className="text-ns-violet">{clock} UTC</span>
          <span>
            SYNC <span className="text-ns-text/70">99.97%</span>
          </span>
        </div>
      </div>
    </header>
  );
}
