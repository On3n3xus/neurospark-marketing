"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PARTICLES } from "@/lib/constants";

const vertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uTime;

  void main() {
    vColor = aColor;
    vec3 pos = position;

    // Gentle floating motion
    pos.x += sin(uTime * 0.3 + position.z * 0.5) * 0.3;
    pos.y += cos(uTime * 0.2 + position.x * 0.3) * 0.4;
    pos.z += sin(uTime * 0.1 + position.y * 0.2) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    // Soft circular particle with glow
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= 0.6;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = PARTICLES.count }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const uniformsRef = useRef({ uTime: { value: 0 } });

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorOptions = [
      new THREE.Color("#00f0ff"), // Cyan
      new THREE.Color("#ff00aa"), // Magenta
      new THREE.Color("#8b5cf6"), // Purple
      new THREE.Color("#007bff"), // Blue (example, assuming HEX_COLORS.blue was intended)
    ];

    for (let i = 0; i < count; i++) {
      // Distribute particles across the full scene depth (z: +10 to -60)
      positions[i * 3] = (Math.random() - 0.5) * PARTICLES.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * PARTICLES.spread * 0.5;
      positions[i * 3 + 2] = Math.random() * -90 + 10;

      sizes[i] = Math.random() * 3 + 0.5;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
