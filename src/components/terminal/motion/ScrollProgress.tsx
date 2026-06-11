"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap-setup";

/** Fixed violet→cyan progress bar tracking page scroll. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(el, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 50,
        transform: "scaleX(0)",
        transformOrigin: "left",
        background:
          "linear-gradient(90deg, var(--ns-violet), var(--ns-cyan), var(--ns-lime))",
        boxShadow: "0 0 12px rgba(124,92,255,0.6)",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
