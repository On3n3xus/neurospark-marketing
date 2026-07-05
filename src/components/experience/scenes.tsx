import Link from "next/link";
import { services } from "@/lib/services-data";

/** The three flagship systems shown in the descent chamber. */
export const CHAMBER_SERVICES = services.slice(0, 3);

export function HeroScene() {
  return (
    <div className="scene-hero absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="font-jetbrains text-[11px] tracking-[0.4em] text-ns-violet/80">
        SIGNAL ACQUIRED
      </p>
      <h1 className="mt-4 font-display text-[13vw] font-semibold leading-none tracking-[0.12em] text-ns-text md:text-[8vw]">
        NEUROSPARK
      </h1>
      <p className="mt-5 font-jetbrains text-[11px] tracking-[0.3em] text-ns-text/50 md:text-xs">
        AUTONOMOUS MARKETING SYSTEMS — EST. 2025
      </p>
    </div>
  );
}

export function ChamberScene() {
  return (
    <>
      {/* chamber section label — left side */}
      <div className="chamber-label absolute inset-y-0 left-6 hidden max-w-[240px] flex-col justify-center md:left-10 md:flex lg:left-20">
        <p className="font-jetbrains text-[10px] tracking-[0.15em] text-ns-text/35">
          {"////// Chamber — descent"}
        </p>
        <h2 className="mt-3 font-display text-xl font-medium tracking-[0.25em] text-ns-text md:text-2xl">
          WITHIN THE NETWORK
        </h2>
        <p className="mt-3 font-jetbrains text-xs leading-relaxed text-ns-text/50">
          Three systems, always awake.
        </p>
      </div>

      {/* the three service "instruments" — right side, revealed sequentially */}
      {CHAMBER_SERVICES.map((s) => (
        <div
          key={s.slug}
          data-chamber={s.code}
          className="chamber-item absolute inset-x-6 inset-y-0 flex flex-col items-center justify-center text-center md:inset-x-auto md:right-10 md:max-w-md md:items-end md:text-right lg:right-20"
        >
          <p className="font-jetbrains text-[11px] tracking-[0.3em] text-ns-text/40">
            {s.code} / 03
          </p>
          <h3 className="mt-3 font-display text-4xl font-medium tracking-[0.3em] text-ns-text md:text-5xl">
            {s.name}
          </h3>
          <div className="mt-4 h-px w-40 bg-gradient-to-l from-ns-violet/70 to-transparent" />
          <p className="mt-3 font-jetbrains text-[11px] tracking-[0.2em] text-ns-cyan/80">
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
        </div>
      ))}
    </>
  );
}

export function FinaleScene() {
  return (
    <div className="scene-finale absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="font-jetbrains text-[10px] tracking-[0.2em] text-ns-text/40">
        {"////// Transmission"}
      </p>
      <h2 className="mt-5 font-display text-3xl font-medium tracking-[0.3em] text-ns-text md:text-5xl">
        THE NETWORK NEVER SLEEPS.
      </h2>

      <Link
        href="/contact"
        className="pointer-events-auto mt-10 rounded-full border border-ns-violet/60 px-8 py-3 font-jetbrains text-xs tracking-[0.3em] text-ns-text transition-all duration-300 hover:bg-ns-violet/15 hover:shadow-[0_0_24px_rgba(124,92,255,0.35)]"
      >
        INITIATE CONTACT →
      </Link>

      <nav className="pointer-events-auto mt-12 flex gap-10 font-display text-lg tracking-[0.3em] text-ns-text/85 md:text-xl">
        <Link href="/services" className="transition-colors hover:text-ns-violet">
          SERVICES
        </Link>
        <Link href="/work" className="transition-colors hover:text-ns-violet">
          WORK
        </Link>
        <Link href="/contact" className="transition-colors hover:text-ns-violet">
          CONTACT
        </Link>
      </nav>

      <p className="absolute bottom-20 font-jetbrains text-[10px] tracking-[0.25em] text-ns-text/30">
        NEUROSPARK — 44.98°N 93.27°W — MINNEAPOLIS — EST. 2025
      </p>
    </div>
  );
}
