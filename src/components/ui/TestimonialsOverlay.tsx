"use client";

import { useRef } from "react";
import { testimonials } from "@/lib/testimonials-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: () =>
        (document.documentElement.scrollHeight - window.innerHeight) * 0.47,
      end: () =>
        (document.documentElement.scrollHeight - window.innerHeight) * 0.65,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        if (!containerRef.current || !contentRef.current) return;
        gsap.to(containerRef.current, {
          opacity: self.isActive ? 1 : 0,
          pointerEvents: self.isActive ? "auto" : "none",
          duration: 0.7,
        });
        gsap.to(contentRef.current, {
          y: self.isActive ? 0 : 40,
          duration: 0.7,
        });
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 flex items-center justify-center"
      style={{ opacity: 0, pointerEvents: "none" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
        style={{ transform: "translateY(40px)" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-white mb-3 text-center">
          What Clients Say
        </h2>
        <p className="text-base md:text-lg text-white/40 mb-12 text-center">
          Results that speak for themselves
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(10, 10, 15, 0.8)",
                border: `1px solid ${t.color}20`,
                boxShadow: `0 0 30px ${t.color}08`,
              }}
            >
              {/* Quote */}
              <p className="text-sm md:text-base leading-relaxed text-white/70 mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black"
                  style={{ background: t.color }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <CTAButton label="Become our next success story" />
        </div>
      </div>
    </div>
  );
}
