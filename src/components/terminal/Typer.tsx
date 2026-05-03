"use client";

import { useEffect, useState, type CSSProperties } from "react";

export default function Typer({
  text,
  speed = 28,
  style,
  className,
}: {
  text: string;
  speed?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
  }, [text]);
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => setI(i + 1), speed);
      return () => clearTimeout(t);
    }
  }, [i, text, speed]);
  return (
    <span className={className} style={style}>
      {text.slice(0, i)}
      <span
        style={{
          color: "var(--ns-violet)",
          animation: "ns-blink 1s steps(2) infinite",
        }}
      >
        ▌
      </span>
    </span>
  );
}
