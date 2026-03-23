"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCardProps {
  position: [number, number, number];
  children: React.ReactNode;
  color?: string;
  width?: number;
  height?: number;
  scrollProgress: React.RefObject<number>;
  visibleRange: [number, number]; // [scrollStart, scrollEnd]
  onClick?: () => void;
}

export default function FloatingCard({
  position,
  children,
  color = "#00f0ff",
  width = 2.4,
  height = 3,
  scrollProgress,
  visibleRange,
  onClick,
}: FloatingCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const scaleVal = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = scrollProgress.current ?? 0;
    const isVisible = t >= visibleRange[0] && t <= visibleRange[1];

    // Animate scale based on visibility
    const targetScale = isVisible ? 1 : 0;
    scaleVal.current = THREE.MathUtils.lerp(scaleVal.current, targetScale, 0.05);
    groupRef.current.scale.setScalar(scaleVal.current);

    // Floating bob
    groupRef.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;

    // Hover tilt
    const tiltTarget = hovered ? 0.05 : 0;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      tiltTarget,
      0.1
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={onClick}
    >
      {/* Card background */}
      <RoundedBox args={[width, height, 0.05]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color="#0a0a12"
          transparent
          opacity={0.85}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Neon edge glow */}
      <RoundedBox
        args={[width + 0.04, height + 0.04, 0.02]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, -0.02]}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.4 : 0.12}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* HTML content overlay */}
      <Html
        transform
        distanceFactor={4}
        position={[0, 0, 0.04]}
        style={{
          width: `${width * 80}px`,
          pointerEvents: "none",
        }}
      >
        {children}
      </Html>
    </group>
  );
}
