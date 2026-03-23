"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Preloader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // Keep visible for minimum 1.5s then fade out
      const timer = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700">
      {/* Logo */}
      <h1 className="text-4xl font-medium tracking-[-0.04em] text-white mb-8 glow-cyan">
        NEUROSPARK
      </h1>

      {/* Progress bar */}
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
            boxShadow: "0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan)",
          }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 font-mono text-xs text-white/40 tabular-nums">
        {Math.round(progress)}%
      </p>
    </div>
  );
}
