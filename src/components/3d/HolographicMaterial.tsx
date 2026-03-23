"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const HolographicShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#00f0ff"),
    uColor2: new THREE.Color("#ff00aa"),
    uFresnelPower: 2.0,
    uOpacity: 1.0,
  },
  // Vertex shader
  `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mvPosition.xyz);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uFresnelPower;
    uniform float uOpacity;

    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec2 vUv;

    void main() {
      // Fresnel effect for edge glow
      float fresnel = pow(1.0 - dot(vNormal, vViewDir), uFresnelPower);

      // Rainbow color shift based on view angle and time
      float hue = fresnel * 0.5 + uTime * 0.1 + vUv.y * 0.3;
      vec3 rainbow = mix(uColor1, uColor2, sin(hue * 6.28) * 0.5 + 0.5);

      // Base color with fresnel glow
      vec3 baseColor = mix(vec3(0.02, 0.02, 0.05), rainbow, fresnel * 0.7);

      // Add edge highlight
      float edge = smoothstep(0.0, 0.3, fresnel);
      baseColor += rainbow * edge * 0.5;

      // Subtle scan line effect
      float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.03 + 0.97;

      gl_FragColor = vec4(baseColor * scanline, uOpacity * (0.6 + fresnel * 0.4));
    }
  `
);

extend({ HolographicShaderMaterial });

// Augment R3F types
declare module "@react-three/fiber" {
  interface ThreeElements {
    holographicShaderMaterial: ThreeElement<
      typeof HolographicShaderMaterial,
      typeof HolographicShaderMaterial
    >;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThreeElement<T, C> = any;

interface HolographicMaterialProps {
  color1?: string;
  color2?: string;
  fresnelPower?: number;
  opacity?: number;
}

export default function HolographicMaterial({
  color1 = "#00f0ff",
  color2 = "#ff00aa",
  fresnelPower = 2.0,
  opacity = 1.0,
}: HolographicMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (materialRef.current) {
      (materialRef.current as unknown as { uTime: number }).uTime += delta;
    }
  });

  return (
    <holographicShaderMaterial
      ref={materialRef}
      uColor1={new THREE.Color(color1)}
      uColor2={new THREE.Color(color2)}
      uFresnelPower={fresnelPower}
      uOpacity={opacity}
      transparent
      side={THREE.DoubleSide}
    />
  );
}
