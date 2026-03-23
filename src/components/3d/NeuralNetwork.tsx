"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkProps {
  scrollProgress: React.RefObject<number>;
}

interface Node {
  position: THREE.Vector3;
  layer: number;
}

interface Edge {
  from: number;
  to: number;
}

export default function NeuralNetwork({ scrollProgress }: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const signalRef = useRef<THREE.Mesh[]>([]);
  const signalProgress = useRef<number[]>([]);

  // Generate neural network topology
  const { nodes, edges, nodePositions } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const layers = [4, 6, 6, 4];
    const nodePositions = new Float32Array(
      layers.reduce((a, b) => a + b, 0) * 3
    );
    let offset = 0;

    layers.forEach((count, layerIdx) => {
      const xOffset = (layerIdx - layers.length / 2) * 2;
      for (let i = 0; i < count; i++) {
        const yOffset = (i - (count - 1) / 2) * 1.2;
        const zJitter = (Math.random() - 0.5) * 0.5;
        nodes.push({
          position: new THREE.Vector3(xOffset, yOffset, zJitter),
          layer: layerIdx,
        });

        nodePositions[offset * 3] = xOffset;
        nodePositions[offset * 3 + 1] = yOffset;
        nodePositions[offset * 3 + 2] = zJitter;
        offset++;
      }
    });

    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const currentLayerStart = layers
        .slice(0, layerIdx)
        .reduce((a, b) => a + b, 0);
      const nextLayerStart = currentLayerStart + layers[layerIdx];
      const currentLayerSize = layers[layerIdx];
      const nextLayerSize = layers[layerIdx + 1];

      for (let i = 0; i < currentLayerSize; i++) {
        for (let j = 0; j < nextLayerSize; j++) {
          if (Math.random() < 0.4) {
            edges.push({
              from: currentLayerStart + i,
              to: nextLayerStart + j,
            });
          }
        }
      }
    }

    // Connect some random nodes across non-adjacent layers for visual complexity
    for (let i = 0; i < 5; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      const to = Math.floor(Math.random() * nodes.length);
      if (Math.abs(nodes[from].layer - nodes[to].layer) > 1) {
        edges.push({ from, to });
      }
    }

    return { nodes, edges, nodePositions };
  }, []);

  // Initialize signal progress inside an effect or state instead of during render
  useEffect(() => {
    signalProgress.current = edges.slice(0, 8).map(() => Math.random());
  }, [edges]);

  // Edge line geometry
  const edgeGeometry = useMemo(() => {
    const positions: number[] = [];
    edges.forEach((edge) => {
      const from = nodes[edge.from].position;
      const to = nodes[edge.to].position;
      positions.push(from.x, from.y, from.z);
      positions.push(to.x, to.y, to.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [nodes, edges]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = scrollProgress.current ?? 0;

    // Slow rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;

    // Spread apart on scroll (hero → services transition)
    const spread = Math.max(0, (t - 0.15) / 0.1);
    const scale = 1 + spread * 2;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, scale > 3 ? 0 : scale, 0.02)
    );

    // Fade out
    if (t > 0.2) {
      const opacity = 1 - (t - 0.2) / 0.1;
      groupRef.current.visible = opacity > 0;
    } else {
      groupRef.current.visible = true;
    }

    // Animate signals along edges
    signalProgress.current = signalProgress.current.map(
      (p) => (p + 0.005) % 1
    );

    signalRef.current.forEach((mesh, i) => {
      if (!mesh || i >= edges.length) return;
      const edge = edges[i];
      const from = nodes[edge.from].position;
      const to = nodes[edge.to].position;
      const p = signalProgress.current[i];

      mesh.position.lerpVectors(from, to, p);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Edges */}
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>

      {/* Traveling signals */}
      {edges.slice(0, 8).map((_, i) => (
        <mesh
          key={`signal-${i}`}
          ref={(el) => {
            if (el) signalRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00f0ff" : "#ff00aa"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
