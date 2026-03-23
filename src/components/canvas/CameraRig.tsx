"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CAMERA_WAYPOINTS } from "@/lib/constants";

interface CameraRigProps {
  scrollProgress: React.RefObject<number>;
}

const _pos = new THREE.Vector3();
const _target = new THREE.Vector3();

export default function CameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();
  const smoothPos = useRef(new THREE.Vector3(0, 2, 8));
  const smoothTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress.current ?? 0));

    // Find which segment we're in
    let segIdx = 0;
    for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
      if (t >= CAMERA_WAYPOINTS[i + 1].scrollStart) {
        segIdx = i + 1;
      }
    }

    const fromIdx = Math.max(0, segIdx);
    const toIdx = Math.min(segIdx + 1, CAMERA_WAYPOINTS.length - 1);

    // If we're past the last waypoint start, just hold at the last position
    if (fromIdx === toIdx) {
      _pos.copy(CAMERA_WAYPOINTS[fromIdx].position);
      _target.copy(CAMERA_WAYPOINTS[fromIdx].target);
    } else {
      const from = CAMERA_WAYPOINTS[fromIdx];
      const to = CAMERA_WAYPOINTS[toIdx];

      // Normalize t within this segment
      const segStart = from.scrollStart;
      const segEnd = to.scrollStart; // use the START of the next waypoint as the end
      const segLen = segEnd - segStart;
      const localT = segLen > 0 ? Math.max(0, Math.min(1, (t - segStart) / segLen)) : 0;

      // Smoothstep easing
      const eased = localT * localT * (3 - 2 * localT);

      _pos.copy(from.position).lerp(to.position, eased);
      _target.copy(from.target).lerp(to.target, eased);
    }

    // Damp for cinematic smoothness
    smoothPos.current.lerp(_pos, 0.06);
    smoothTarget.current.lerp(_target, 0.06);

    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothTarget.current);
  });

  return null;
}
