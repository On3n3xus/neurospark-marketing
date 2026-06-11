"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap-setup";

/**
 * Counts numeric segments of a string up from 0 when scrolled into view.
 * Handles mixed values like "147 / 147", "2.3M", "99.998%".
 */
export default function CountUp({
  value,
  style,
}: {
  value: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const segments = value.split(/([\d.]+)/);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const proxy = { p: 0 };
        const render = () => {
          el.textContent = segments
            .map((seg) => {
              if (!/^[\d.]+$/.test(seg)) return seg;
              const target = parseFloat(seg);
              const decimals = (seg.split(".")[1] ?? "").length;
              return (target * proxy.p).toFixed(decimals);
            })
            .join("");
        };
        gsap.to(proxy, {
          p: 1,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: render,
          onComplete: () => {
            el.textContent = value;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} style={style}>
      {value}
    </span>
  );
}
