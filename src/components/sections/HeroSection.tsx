"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import CTAButton from "@/components/ui/CTAButton";
import NeuralNetwork from "@/components/3d/NeuralNetwork";

interface HeroSectionProps {
  scrollProgress: React.RefObject<number>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!overlayRef.current) return;
    const t = scrollProgress.current ?? 0;
    // Fade out hero text as user scrolls
    const opacity = Math.max(0, 1 - t * 5);
    overlayRef.current.style.opacity = String(opacity);
  });

  return (
    <group position={[0, 0, 0]}>
      <NeuralNetwork scrollProgress={scrollProgress} />

      {/* Hero text overlay */}
      <Html
        center
        position={[0, 0.5, 3]}
        style={{ pointerEvents: "none" }}
      >
        <div ref={overlayRef} className="text-center select-none pt-12">
          <h1
            className="glitch-text text-7xl md:text-9xl font-medium tracking-[-0.06em] text-white mb-4"
            data-text="NEUROSPARK"
          >
            NEUROSPARK
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light tracking-[0.2em] uppercase mb-8">
            Full-Service Creative Agency
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-8">
            <CTAButton label="Start Your Project" />
            <div className="flex items-center justify-center gap-2 text-white/30 hidden md:flex">
              <span className="font-mono text-xs">scroll to explore</span>
              <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
                <div className="w-1 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
