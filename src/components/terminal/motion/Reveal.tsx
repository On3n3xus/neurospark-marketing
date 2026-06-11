"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsap-setup";

/**
 * Scroll-triggered entrance. Wraps children in a div and rises/fades them in
 * when the wrapper enters the viewport. Pass `stagger` (a CSS selector) to
 * animate matching descendants in sequence instead of the wrapper as a whole.
 */
export default function Reveal({
  children,
  y = 36,
  delay = 0,
  stagger,
  staggerEach = 0.08,
  style,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  stagger?: string;
  staggerEach?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? el.querySelectorAll(stagger) : el;
      if (stagger && (targets as NodeListOf<Element>).length === 0) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          filter: "blur(6px)",
          duration: 0.9,
          delay,
          ease: "power3.out",
          stagger: stagger ? staggerEach : 0,
          clearProps: "filter,willChange",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
