"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = mounted && time ? time.toISOString().slice(11, 19) : "--:--:--";
  const date = mounted && time ? time.toISOString().slice(0, 10) : "----.--.--";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--ns-line)",
        padding: "10px 24px",
        fontFamily: MONO,
        fontSize: 11,
        color: "var(--ns-text-dim)",
        letterSpacing: "0.08em",
        gap: 24,
        background: "rgba(10,11,16,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Logo />
      <span style={{ color: "var(--ns-text-faint)" }}>NEUROSPARK//OS · v4.2.1</span>
      <span style={{ color: "var(--ns-lime)" }}>● ONLINE</span>
      <span style={{ flex: 1 }} />
      <span className="hidden md:inline">NODE: SF-WEST-04</span>
      <span style={{ color: "var(--ns-violet)" }}>{t} UTC</span>
      <span style={{ color: "var(--ns-text-faint)" }}>{date}</span>
    </div>
  );
}
