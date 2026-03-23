"use client";

import { useState, useCallback, useEffect, useRef } from "react";

const navItems = [
  { label: "Home", scrollTo: 0 },
  { label: "Services", scrollTo: 0.2 },
  { label: "Work", scrollTo: 0.37 },
  { label: "Testimonials", scrollTo: 0.52 },
  { label: "About", scrollTo: 0.7 },
  { label: "Contact", scrollTo: 0.88 },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollTo = useCallback((progress: number) => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: docHeight * progress,
      behavior: "smooth",
    });
    setMenuOpen(false);
  }, []);

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo(0)}
          className="text-lg font-medium tracking-[-0.03em] text-white hover:text-[var(--neon-cyan)] transition-colors"
        >
          NEUROSPARK
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.scrollTo)}
              className="text-sm text-white/50 hover:text-white transition-colors font-light"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-px bg-white transition-transform ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`w-5 h-px bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-px bg-white transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 p-6 rounded-xl bg-black/90 border border-white/5 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.scrollTo)}
              className="block w-full text-left py-3 text-white/60 hover:text-white transition-colors text-lg"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
