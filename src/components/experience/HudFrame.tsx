"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { DescentProgress } from "./NeuralCanvas";

const NAV = [
  { label: "SERVICES", href: "/services" },
  { label: "INDUSTRIES", href: "/industries" },
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

/**
 * Persistent sci-fi HUD overlay — wordmark, manifesto, telemetry
 * readouts. Depth / sync values update from scroll progress via rAF,
 * mirroring the reference site's DEPTH -0000M / SIG 99.97% chrome.
 */
export default function HudFrame({
  progressRef,
}: {
  progressRef: React.RefObject<DescentProgress>;
}) {
  const depthRef = useRef<HTMLSpanElement>(null);
  const syncRef = useRef<HTMLSpanElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const sysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = progressRef.current?.p ?? 0;
      if (depthRef.current) {
        depthRef.current.textContent = `-${String(Math.round(p * 1287)).padStart(4, "0")}M`;
      }
      if (syncRef.current) {
        const sync = 99.97 - Math.sin(p * Math.PI) * 0.06;
        syncRef.current.textContent = `${sync.toFixed(2)}%`;
      }
      if (manifestoRef.current) {
        const o = Math.max(0, Math.min(1, 1 - (p - 0.1) / 0.08));
        manifestoRef.current.style.opacity = String(o);
      }
      if (sysRef.current) {
        // Fade the SYS block while chamber content occupies the right side
        const inChamber = p > 0.18 && p < 0.76;
        sysRef.current.style.opacity = inChamber ? "0" : "1";
      }
      if (hintRef.current) {
        if (p > 0.92) {
          hintRef.current.textContent = "// end of transmission.";
          hintRef.current.style.opacity = "0.5";
        } else {
          hintRef.current.textContent = "Scroll to descend.";
          hintRef.current.style.opacity = String(Math.max(0.5, 1 - p * 2));
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <>
      {/* site nav — interactive, outside the decorative aria-hidden layer.
          Desktop: top-center row. Mobile: vertical right-edge links. */}
      <nav className="pointer-events-auto fixed right-6 top-6 z-40 flex flex-col items-end gap-2 font-jetbrains text-[10px] tracking-[0.25em] md:left-1/2 md:right-auto md:top-8 md:-translate-x-1/2 md:flex-row md:items-center md:gap-7">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-ns-text/40 transition-colors duration-200 hover:text-ns-text"
          >
            /{item.label}
          </Link>
        ))}
      </nav>

    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 font-jetbrains text-[11px] leading-relaxed tracking-[0.12em] text-ns-text/60"
    >
      {/* top-left — wordmark */}
      <div className="absolute left-6 top-6 md:left-10 md:top-8">
        <p className="font-display text-lg font-semibold tracking-[0.3em] text-ns-text">
          NEUROSPARK
          <sup className="ml-1 font-jetbrains text-[8px] tracking-[0.2em] text-ns-violet">OS</sup>
        </p>
        <p className="mt-2 text-[10px] text-ns-text/35">{"// autonomous marketing © 2026"}</p>
        <p className="text-[10px] text-ns-text/35">Neurospark. All rights reserved.</p>
      </div>

      {/* top-right — manifesto */}
      <div
        ref={manifestoRef}
        className="absolute right-6 top-6 hidden max-w-xs text-right md:right-10 md:top-8 md:block"
      >
        <p className="text-[10px] text-ns-text/35">{"////// Manifesto"}</p>
        <p className="mt-3 text-xs leading-relaxed text-ns-text/75">
          We build autonomous marketing systems — agents that live in your
          stack and ship work every hour, even while you sleep.
        </p>
      </div>

      {/* left-mid — decorative sensor tags */}
      <div className="absolute left-6 top-[38%] hidden md:block md:left-10">
        <p className="text-[10px] text-ns-text/30">＋ N2 · FLOW: 0.42</p>
      </div>
      <div className="absolute left-[22%] top-[24%] hidden lg:block">
        <p className="text-[10px] text-ns-text/30">＋ N7 · RES: 7.05</p>
      </div>

      {/* right-mid — system block */}
      <div
        ref={sysRef}
        className="absolute right-6 top-[42%] hidden text-right transition-opacity duration-700 md:right-10 md:block"
      >
        <p className="text-[10px] text-ns-text/35">SYS&nbsp;&nbsp;NET</p>
        <p className="text-[10px] text-ns-violet/60">+++</p>
        <p className="mt-2 text-[10px]">AGNT: 04</p>
        <p className="text-[10px]">MODS: 06</p>
        <p className="text-[10px]">UPTM: 99.9</p>
      </div>

      {/* bottom-left — scroll hint */}
      <p ref={hintRef} className="absolute bottom-6 left-6 text-xs md:bottom-8 md:left-10">
        Scroll to descend.
      </p>

      {/* bottom-right — telemetry */}
      <div className="absolute bottom-6 right-6 text-right text-xs md:bottom-8 md:right-10">
        <p>
          DEPTH <span ref={depthRef} className="text-ns-text">-0000M</span>
        </p>
        <p>
          SYNC <span ref={syncRef} className="text-ns-text">99.97%</span>
        </p>
      </div>
    </div>
    </>
  );
}
