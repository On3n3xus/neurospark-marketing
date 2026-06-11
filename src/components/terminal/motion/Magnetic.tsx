"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap-setup";

/** Magnetic hover — children gently follow the cursor and snap back on leave. */
export default function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover)",
        () => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const onLeave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
            });
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </div>
  );
}
