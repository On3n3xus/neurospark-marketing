"use client";

import { useEffect, useState } from "react";

/**
 * Boot gate — counter runs 0→100, then the CONNECT button appears.
 * Mirrors the reference site's "CLICK TO DESCEND" preloader.
 */
export default function Preloader({ onEnter }: { onEnter: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1700;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / DURATION, 1), 3);
      setCount(Math.round(eased * 100));
      if (elapsed < DURATION) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    onEnter();
    window.setTimeout(() => setGone(true), 900);
  };

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ns-bg transition-opacity duration-700 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-display text-2xl font-semibold tracking-[0.35em] text-ns-text">
        NEUROSPARK
        <sup className="ml-1 font-jetbrains text-[9px] tracking-[0.2em] text-ns-violet">OS</sup>
      </p>

      <p className="mt-14 font-jetbrains text-7xl font-light tabular-nums text-ns-text/25 md:text-8xl">
        {String(count).padStart(3, "0")}
      </p>

      <div className="mt-6 h-px w-56 bg-ns-violet/25">
        <div
          className="h-px bg-ns-violet transition-[width] duration-150"
          style={{ width: `${count}%` }}
        />
      </div>

      <p className="mt-4 font-jetbrains text-[11px] tracking-[0.15em] text-ns-text/40">
        {count < 100 ? "// the network is waking up…" : "// the network is awake."}
      </p>

      <button
        type="button"
        onClick={handleEnter}
        disabled={count < 100}
        className={`mt-12 rounded-full border px-8 py-3 font-jetbrains text-xs tracking-[0.3em] transition-all duration-500 ${
          count >= 100
            ? "cursor-pointer border-ns-violet/60 text-ns-text opacity-100 hover:bg-ns-violet/15 hover:shadow-[0_0_24px_rgba(124,92,255,0.35)]"
            : "border-ns-text/10 text-ns-text/20 opacity-40"
        }`}
      >
        CLICK TO CONNECT
      </button>
    </div>
  );
}
