"use client";

import { useRef } from "react";
import ContactForm from "./ContactForm";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: () =>
        (document.documentElement.scrollHeight - window.innerHeight) * 0.85,
      end: "bottom top", // Keep it visible until the very bottom
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
      {/* Darkened backdrop so form is readable over the 3D scene */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Form container */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-xl mx-auto px-6"
        style={{ transform: "translateY(40px)" }}
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] text-white mb-4 text-center glow-cyan">
          Let&apos;s Create
        </h2>
        <p className="text-lg md:text-xl text-white/50 mb-10 text-center">
          Ready to spark your next project? Get in touch.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
