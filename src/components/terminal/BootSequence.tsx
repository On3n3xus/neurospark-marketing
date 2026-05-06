"use client";

import { useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";

export default function BootSequence() {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !reduced) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section style={{ padding: "100px 0 60px" }}>
      <SectionHead
        label="// FIG_02 · DEPLOY SEQUENCE"
        title="Four agents. One pipeline. Live in seconds."
        sub="When you sign on, this is what gets dropped into your stack — autonomous agents for brand, growth, pipeline, and revenue, wired together and reporting telemetry on day one."
      />

      <div
        style={{
          marginTop: 56,
          position: "relative",
          aspectRatio: "16 / 9",
          width: "100%",
          background: "var(--ns-bg-2)",
          border: "1px solid var(--ns-line-strong)",
          overflow: "hidden",
        }}
      >
        {/* Corner brackets */}
        <span style={cornerTL} />
        <span style={cornerTR} />
        <span style={cornerBL} />
        <span style={cornerBR} />

        <video
          ref={ref}
          src="/agent-deploy.mp4"
          poster="/agent-deploy-poster.jpg"
          muted
          playsInline
          autoPlay={!reduced}
          loop={false}
          preload="metadata"
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
}

const cornerBase: React.CSSProperties = {
  position: "absolute",
  width: 18,
  height: 18,
  pointerEvents: "none",
  zIndex: 2,
};
const cornerTL: React.CSSProperties = {
  ...cornerBase,
  top: -1,
  left: -1,
  borderTop: "1px solid var(--ns-violet)",
  borderLeft: "1px solid var(--ns-violet)",
};
const cornerTR: React.CSSProperties = {
  ...cornerBase,
  top: -1,
  right: -1,
  borderTop: "1px solid var(--ns-violet)",
  borderRight: "1px solid var(--ns-violet)",
};
const cornerBL: React.CSSProperties = {
  ...cornerBase,
  bottom: -1,
  left: -1,
  borderBottom: "1px solid var(--ns-violet)",
  borderLeft: "1px solid var(--ns-violet)",
};
const cornerBR: React.CSSProperties = {
  ...cornerBase,
  bottom: -1,
  right: -1,
  borderBottom: "1px solid var(--ns-violet)",
  borderRight: "1px solid var(--ns-violet)",
};
