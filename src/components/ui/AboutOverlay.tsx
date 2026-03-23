"use client";

import { useRef } from "react";
import { team, stats } from "@/lib/team-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: () =>
        (document.documentElement.scrollHeight - window.innerHeight) * 0.63,
      end: () =>
        (document.documentElement.scrollHeight - window.innerHeight) * 0.82,
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
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-white mb-3 text-center">
          Who We Are
        </h2>
        <p className="text-base md:text-lg text-white/40 mb-10 text-center max-w-2xl mx-auto">
          A collective of strategists, designers, developers, and storytellers
          obsessed with building brands that break through the noise.
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[var(--neon-cyan)] font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(10, 10, 15, 0.7)",
                border: `1px solid ${member.color}15`,
              }}
            >
              {/* Avatar placeholder or Real Image */}
              {member.image ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-black shrink-0"
                  style={{ background: member.color }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-white">{member.name}</p>
                <p className="text-xs text-white/40">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <CTAButton label="Work with our experts" variant="secondary" />
        </div>
      </div>
    </div>
  );
}
