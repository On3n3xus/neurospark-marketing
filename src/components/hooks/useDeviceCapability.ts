"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "medium" | "low";

/**
 * Detects device GPU/CPU capability and returns a tier.
 * Used to adjust 3D quality and decide whether to show the Canvas at all.
 */
export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTier("low");
      return;
    }

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;

    // Check if mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Simple WebGL check
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) {
      setTier("low");
      return;
    }

    // Get renderer info
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "";

    // Detect integrated/low-end GPUs
    const isLowEndGPU =
      /SwiftShader|llvmpipe|Software/i.test(renderer) ||
      /Intel.*HD|Intel.*UHD/i.test(renderer);

    if (isMobile || cores <= 2 || isLowEndGPU) {
      setTier(isMobile && cores <= 4 ? "low" : "medium");
    } else if (cores >= 8) {
      setTier("high");
    } else {
      setTier("medium");
    }

    canvas.remove();
  }, []);

  return tier;
}
