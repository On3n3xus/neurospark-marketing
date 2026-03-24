"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
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

  return (
    <nav
      ref={menuRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.8)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto h-[52px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-semibold text-text-primary tracking-[-0.01em]"
        >
          Neurospark
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-text-primary hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link href="#contact" className="btn-pill text-sm px-5 py-2">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-px bg-text-primary transition-transform ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
          />
          <span
            className={`w-5 h-px bg-text-primary transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-px bg-text-primary transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-4 border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-text-primary hover:text-accent transition-colors text-base"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-pill mt-3 w-full text-center text-sm"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
