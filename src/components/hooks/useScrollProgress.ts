"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref containing the normalized scroll progress [0, 1].
 * Read via ref.current in useFrame to avoid re-renders.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.current = docHeight > 0 ? scrollTop / docHeight : 0;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial value

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
