export default function Logo({ size = 22 }: { size?: number }) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 22 22"
        style={{ animation: "ns-rotate 24s linear infinite" }}
      >
        <circle cx="11" cy="11" r="3" fill="var(--ns-violet)" />
        {angles.map((a) => (
          <line
            key={a}
            x1="11"
            y1="11"
            x2={11 + Math.cos((a * Math.PI) / 180) * 9}
            y2={11 + Math.sin((a * Math.PI) / 180) * 9}
            stroke="var(--ns-violet)"
            strokeWidth="0.7"
            opacity="0.8"
          />
        ))}
        {angles.map((a) => (
          <circle
            key={`d${a}`}
            cx={11 + Math.cos((a * Math.PI) / 180) * 9}
            cy={11 + Math.sin((a * Math.PI) / 180) * 9}
            r="1"
            fill="var(--ns-violet)"
          />
        ))}
        <circle
          cx="11"
          cy="11"
          r="10"
          fill="none"
          stroke="var(--ns-violet)"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.18em",
          color: "var(--ns-text)",
        }}
      >
        NEUROSPARK
      </span>
    </div>
  );
}
