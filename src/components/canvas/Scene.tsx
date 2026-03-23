"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import PostProcessing from "./PostProcessing";
import ParticleField from "@/components/3d/ParticleField";
import GridFloor from "@/components/3d/GridFloor";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import Navigation from "@/components/ui/Navigation";
import { useScrollProgress } from "@/components/hooks/useScrollProgress";
import { useDeviceCapability } from "@/components/hooks/useDeviceCapability";

export default function Scene() {
  const scrollProgress = useScrollProgress();
  const tier = useDeviceCapability();

  // Low-tier devices get CSS-only fallback
  if (tier === "low") {
    return <LowTierFallback />;
  }

  const particleCount = tier === "high" ? 3000 : 1500;

  return (
    <>
      <Navigation />
      <div className="fixed inset-0 z-0">
        <Canvas
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, tier === "high" ? 2 : 1.5]}
          camera={{ fov: 60, near: 0.1, far: 200, position: [0, 2, 8] }}
        >
          <Suspense fallback={null}>
            {/* Ambient lighting */}
            <ambientLight intensity={0.15} />
            <pointLight
              position={[10, 10, 10]}
              intensity={0.3}
              color="#00f0ff"
            />
            <pointLight
              position={[-10, -5, -10]}
              intensity={0.2}
              color="#ff00aa"
            />

            {/* Camera controller */}
            <CameraRig scrollProgress={scrollProgress} />

            {/* Background elements */}
            <ParticleField count={particleCount} />
            <GridFloor />

            {/* Sections */}
            <HeroSection scrollProgress={scrollProgress} />
            <ServicesSection scrollProgress={scrollProgress} />
            <PortfolioSection scrollProgress={scrollProgress} />
            <ContactSection scrollProgress={scrollProgress} />

            {/* Post-processing effects */}
            <PostProcessing quality={tier} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scanline overlay */}
      <div className="scanlines pointer-events-none fixed inset-0 z-30" />
    </>
  );
}

function LowTierFallback() {
  return (
    <>
      <Navigation />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-[#050510] to-black">
        {/* CSS grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </>
  );
}
