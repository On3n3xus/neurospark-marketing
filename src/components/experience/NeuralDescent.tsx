"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import NeuralCanvas, { type DescentProgress } from "./NeuralCanvas";
import Preloader from "./Preloader";
import HudFrame from "./HudFrame";
import { HeroScene, ChamberScene, FinaleScene, CHAMBER_SERVICES } from "./scenes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_QUERY).matches;
}
function getServerReducedMotion() {
  return false;
}

/**
 * Neural Descent — the cinematic homepage experience.
 * Native scroll over a 600vh container drives a pinned (CSS sticky)
 * viewport through Hero → Chamber (3 systems) → Finale.
 */
export default function NeuralDescent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<DescentProgress>({ p: 0, entered: false });
  const [entered, setEntered] = useState(false);

  // Reduced-motion detection — SSR-safe, reacts to OS setting changes
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );

  // Scroll lock while the preloader gate is up
  useEffect(() => {
    if (!entered) {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      progressRef.current.entered = true;
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [entered]);

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current.p = self.progress;
          },
        },
      });

      // Hero dissolves as the descent begins
      tl.to(".scene-hero", { autoAlpha: 0, y: -80, duration: 0.08 }, 0.14);

      // Chamber label
      tl.fromTo(
        ".chamber-label",
        { autoAlpha: 0, x: -40 },
        { autoAlpha: 1, x: 0, duration: 0.05 },
        0.2
      );
      tl.to(".chamber-label", { autoAlpha: 0, duration: 0.05 }, 0.72);

      // Three systems, sequential reveal
      gsap.utils.toArray<HTMLElement>(".chamber-item").forEach((el, i) => {
        const start = 0.24 + i * 0.16;
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 0.05 },
          start
        );
        tl.to(el, { autoAlpha: 0, y: -60, duration: 0.05 }, start + 0.1);
      });

      // Finale
      tl.fromTo(
        ".scene-finale",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.08 },
        0.78
      );

      // Pad the timeline to exactly 1 so position values map 1:1 to
      // scroll progress (otherwise scrub rescales to total duration).
      tl.set({}, {}, 1);
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  if (reduced) return <ReducedFallback />;

  return (
    <main className="relative bg-ns-bg text-ns-text">
      <NeuralCanvas progressRef={progressRef} />
      <HudFrame progressRef={progressRef} />
      {!entered && <Preloader onEnter={() => setEntered(true)} />}

      <div ref={containerRef} className="relative h-[600vh]">
        <div className="pointer-events-none sticky top-0 z-10 h-screen overflow-hidden">
          <HeroScene />
          <ChamberScene />
          <FinaleScene />
        </div>
      </div>
    </main>
  );
}

/** prefers-reduced-motion: plain stacked sections, no pinning or particles. */
function ReducedFallback() {
  return (
    <main className="relative bg-ns-bg text-ns-text">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-jetbrains text-[11px] tracking-[0.4em] text-ns-violet/80">
          SIGNAL ACQUIRED
        </p>
        <h1 className="mt-4 font-display text-6xl font-semibold tracking-[0.12em] md:text-8xl">
          NEUROSPARK
        </h1>
        <p className="mt-5 font-jetbrains text-xs tracking-[0.3em] text-ns-text/50">
          AUTONOMOUS MARKETING SYSTEMS — EST. 2025
        </p>
        <p className="mt-10 max-w-md font-jetbrains text-sm leading-relaxed text-ns-text/70">
          We build autonomous marketing systems — agents that live in your
          stack and ship work every hour, even while you sleep.
        </p>
      </section>

      {CHAMBER_SERVICES.map((s) => (
        <section
          key={s.slug}
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-jetbrains text-[11px] tracking-[0.3em] text-ns-text/40">
            {s.code} / 03
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-[0.3em] md:text-5xl">
            {s.name}
          </h2>
          <p className="mt-4 font-jetbrains text-[11px] tracking-[0.2em] text-ns-cyan/80">
            {s.tag}
          </p>
          <p className="mt-4 max-w-xs font-jetbrains text-xs leading-relaxed text-ns-text/60">
            {s.shortDesc}
          </p>
          <p className="mt-6 font-display text-3xl font-semibold text-ns-lime">
            {s.metric}
            <span className="ml-2 font-jetbrains text-[10px] font-normal tracking-[0.2em] text-ns-text/45">
              {s.metricLabel}
            </span>
          </p>
        </section>
      ))}

      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h2 className="font-display text-3xl font-medium tracking-[0.3em] md:text-5xl">
          THE NETWORK NEVER SLEEPS.
        </h2>
        <Link
          href="/contact"
          className="mt-10 rounded-full border border-ns-violet/60 px-8 py-3 font-jetbrains text-xs tracking-[0.3em]"
        >
          INITIATE CONTACT →
        </Link>
      </section>
    </main>
  );
}
