"use client";

import { useEffect, useState, type CSSProperties } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

/** Character scramble that decodes into the target text whenever it changes. */
export default function DecodeText({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = 16;
    const id = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(id);
        return;
      }
      const progress = frame / totalFrames;
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < progress * text.length || c === " "
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
    }, 35);
    return () => clearInterval(id);
  }, [text]);

  return <span style={style}>{display}</span>;
}
