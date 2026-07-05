"use client";

import { useEffect, useRef } from "react";

export interface DescentProgress {
  /** Scroll progress through the experience, 0 → 1 */
  p: number;
  /** Whether the user has clicked through the preloader */
  entered: boolean;
}

interface Node {
  x: number;
  y: number;
  z: number; // 0.25..1 — depth for parallax, size, speed
  vx: number;
  vy: number;
  phase: number;
  hue: "violet" | "cyan" | "lime";
}

const VIOLET = { r: 124, g: 92, b: 255 };
const CYAN = { r: 34, g: 211, b: 238 };
const LIME = { r: 198, g: 255, b: 60 };

function nodeColor(hue: Node["hue"]) {
  if (hue === "cyan") return CYAN;
  if (hue === "lime") return LIME;
  return VIOLET;
}

/**
 * Fullscreen generative "neural field" — drifting nodes linked by
 * proximity synapses. Scroll progress (via progressRef) drives a
 * vertical parallax descent and dissolves the central core glow.
 */
export default function NeuralCanvas({
  progressRef,
  ambient = false,
}: {
  /** Scroll progress source — omit in ambient mode */
  progressRef?: React.RefObject<DescentProgress>;
  /** Subtle site-wide background: fewer nodes, no core glow, dimmer links */
  ambient?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let nodes: Node[] = [];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const seed = () => {
      const base = W < 768 ? 55 : 115;
      const count = ambient ? Math.round(base * 0.55) : base;
      nodes = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z: 0.25 + Math.random() * 0.75,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.12,
          phase: Math.random() * Math.PI * 2,
          hue: roll > 0.95 ? "lime" : roll > 0.78 ? "cyan" : "violet",
        };
      });
    };

    const draw = (t: number) => {
      const time = t * 0.001;
      const p = ambient ? 0 : progressRef?.current?.p ?? 0;
      const dim = ambient ? 0.45 : 1;

      // Background + vignette
      ctx.fillStyle = "#0A0B10";
      ctx.fillRect(0, 0, W, H);
      const vin = ctx.createRadialGradient(
        W / 2, H / 2, Math.min(W, H) * 0.25,
        W / 2, H / 2, Math.max(W, H) * 0.75
      );
      vin.addColorStop(0, "rgba(10,11,16,0)");
      vin.addColorStop(1, "rgba(4,4,8,0.9)");
      ctx.fillStyle = vin;
      ctx.fillRect(0, 0, W, H);

      // Central core glow — strongest at the top of the descent
      const coreAlpha = ambient ? 0 : Math.max(0, 1 - p / 0.32);
      if (coreAlpha > 0.01) {
        const flicker = 0.92 + 0.08 * Math.sin(time * 7.3) * Math.sin(time * 2.1);
        const R = Math.min(W, H) * (0.30 + p * 0.25);
        const core = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R);
        core.addColorStop(0, `rgba(168,140,255,${0.34 * coreAlpha * flicker})`);
        core.addColorStop(0.35, `rgba(124,92,255,${0.18 * coreAlpha * flicker})`);
        core.addColorStop(1, "rgba(124,92,255,0)");
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, W, H);
      }

      // Descent offset — deeper scroll shifts the field upward, parallaxed by z
      const wrap = H + 120;
      const positions = nodes.map((n) => {
        if (!reduced) {
          n.x += n.vx * n.z;
          n.y += n.vy * n.z;
          if (n.x < -60) n.x = W + 60;
          if (n.x > W + 60) n.x = -60;
          if (n.y < -60) n.y = H + 60;
          if (n.y > H + 60) n.y = -60;
        }
        const sy = (((n.y - p * H * 2.4 * n.z) % wrap) + wrap) % wrap - 60;
        return { sx: n.x, sy };
      });

      // Synapse links
      const maxDist = W < 768 ? 110 : 150;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = positions[i].sx - positions[j].sx;
          const dy = positions[i].sy - positions[j].sy;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const pulse = 0.55 + 0.45 * Math.sin(time * 1.8 + nodes[i].phase + nodes[j].phase);
            const a = (1 - d / maxDist) * 0.28 * pulse * dim;
            const c = nodeColor(nodes[i].hue);
            ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(positions[i].sx, positions[i].sy);
            ctx.lineTo(positions[j].sx, positions[j].sy);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const { sx, sy } = positions[i];
        const c = nodeColor(n.hue);
        const pulse = 0.6 + 0.4 * Math.sin(time * 2.2 + n.phase);
        const r = n.z * 2.1 * pulse + 0.6;
        // soft halo
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${0.10 * pulse * dim})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        // point
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${(0.75 * pulse + 0.2) * dim})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible" && !reduced;
      if (running) {
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    resize();
    if (reduced) {
      draw(0); // single static frame
      running = false;
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [progressRef, ambient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
