"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NeonRing from "@/components/3d/NeonRing";
import { SECTION_POSITIONS } from "@/lib/constants";

interface ContactSectionProps {
  scrollProgress: React.RefObject<number>;
}

// 3D background only — the form is rendered as a full-page HTML overlay in ContactOverlay
export default function ContactSection({
  scrollProgress,
}: ContactSectionProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const t = scrollProgress.current ?? 0;

    if (groupRef.current) {
      groupRef.current.visible = t > 0.78;
      const target = t > 0.82 ? 1 : 0;
      const scale = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        target,
        0.03
      );
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, SECTION_POSITIONS.contact]}>
      <NeonRing position={[0, 0, -3]} color="#00f0ff" radius={5} />
      <NeonRing position={[2, 1, -5]} color="#ff00aa" radius={3} tube={0.015} />
      <NeonRing position={[-3, -1, -2]} color="#8b5cf6" radius={4} tube={0.01} />
    </group>
  );
}
