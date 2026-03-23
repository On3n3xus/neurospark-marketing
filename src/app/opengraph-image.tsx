import { ImageResponse } from "next/og";

export const alt = "Neurospark Marketing — Full-Service Creative Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
          position: "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Title */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.04em",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          NEUROSPARK
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "16px",
            fontFamily: "sans-serif",
          }}
        >
          Full-Service Creative Agency
        </p>

        {/* Neon line */}
        <div
          style={{
            width: "120px",
            height: "2px",
            background: "linear-gradient(90deg, #00f0ff, #ff00aa)",
            marginTop: "24px",
            borderRadius: "1px",
          }}
        />

        {/* Services */}
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255,255,255,0.3)",
            marginTop: "24px",
            fontFamily: "sans-serif",
          }}
        >
          Branding • Web Development • Video Production • Social Media • Advertising
        </p>
      </div>
    ),
    { ...size }
  );
}
