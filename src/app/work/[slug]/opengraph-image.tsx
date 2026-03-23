import { ImageResponse } from "next/og";
import { projects } from "@/lib/portfolio-data";

export const alt = "Neurospark Marketing Case Study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 40 }}>Not Found</span>
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #000 0%, #0a0a1a 50%, #000 100%)",
          position: "relative",
        }}
      >
        {/* Color accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: project.color,
          }}
        />

        {/* Category */}
        <p
          style={{
            fontSize: "18px",
            color: project.color,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
            fontFamily: "monospace",
          }}
        >
          {project.category}
        </p>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1.1,
            fontFamily: "sans-serif",
          }}
        >
          {project.title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            marginTop: "20px",
            lineHeight: 1.5,
            fontFamily: "sans-serif",
          }}
        >
          {project.description}
        </p>

        {/* Footer */}
        <p
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "sans-serif",
          }}
        >
          NEUROSPARK MARKETING
        </p>
      </div>
    ),
    { ...size }
  );
}
