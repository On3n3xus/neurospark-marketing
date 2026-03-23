"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeonRingProps {
  position?: [number, number, number];
  color?: string;
  radius?: number;
  tube?: number;
}

export default function NeonRing({
  position = [0, 0, 0],
  color = "#00f0ff",
  radius = 3,
  tube = 0.02,
}: NeonRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}
