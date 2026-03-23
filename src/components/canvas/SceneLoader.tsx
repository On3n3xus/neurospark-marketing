"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-medium tracking-[-0.04em] text-white mb-8 glow-cyan">
        NEUROSPARK
      </h1>
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full w-1/3 rounded-full animate-pulse"
          style={{
            background:
              "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
          }}
        />
      </div>
    </div>
  ),
});

export default function SceneLoader() {
  return <Scene />;
}
