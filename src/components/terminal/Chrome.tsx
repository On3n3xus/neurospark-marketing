import type { ReactNode } from "react";
import ParticleField from "./motion/ParticleField";
import ScrollProgress from "./motion/ScrollProgress";

export default function Chrome({ children }: { children: ReactNode }) {
  return (
    <div
      className="ns"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--ns-bg)",
        color: "var(--ns-text)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,92,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,92,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          animation: "ns-grid-drift 14s linear infinite",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 95%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Neural particle network */}
      <ParticleField />
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* Vignette violet glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 80% -10%, rgba(124,92,255,0.25), transparent 50%), radial-gradient(circle at 10% 110%, rgba(34,211,238,0.12), transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Scanline */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 180,
            background:
              "linear-gradient(to bottom, transparent, rgba(124,92,255,0.06), transparent)",
            animation: "ns-scan 8s linear infinite",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}
