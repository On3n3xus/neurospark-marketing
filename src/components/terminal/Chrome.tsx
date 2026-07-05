import type { ReactNode } from "react";
import NeuralCanvas from "@/components/experience/NeuralCanvas";
import ScrollProgress from "./motion/ScrollProgress";

/**
 * Site-wide shell background — the Neural Descent particle field in
 * ambient mode, matching the homepage experience.
 */
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
      {/* Ambient neural particle field (shared with homepage descent) */}
      <NeuralCanvas ambient />
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* Vignette violet glow */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(circle at 80% -10%, rgba(124,92,255,0.18), transparent 50%), radial-gradient(circle at 10% 110%, rgba(34,211,238,0.08), transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
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
