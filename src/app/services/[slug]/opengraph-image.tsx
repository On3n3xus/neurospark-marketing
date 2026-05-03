import { ImageResponse } from "next/og";
import { services } from "@/lib/services-data";

export const alt = "Neurospark Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", background: "#0A0B10", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 40 }}>
        Not Found
      </div>,
      { ...size }
    );
  }
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: 80,
        background: "linear-gradient(135deg, #0A0B10 0%, #1a0a2e 50%, #0A0B10 100%)",
        position: "relative", color: "#E8E6F0",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#7C5CFF" }} />
        <p style={{ fontSize: 18, color: "#7C5CFF", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
          // {service.code} · {service.tag}
        </p>
        <p style={{ fontSize: 84, fontWeight: 300, letterSpacing: "-0.04em", margin: "24px 0 18px", color: "#fff" }}>
          {service.name}
        </p>
        <p style={{ fontSize: 28, color: "#E8E6F0", maxWidth: 900, margin: 0, lineHeight: 1.4 }}>
          {service.shortDesc}
        </p>
        <p style={{ position: "absolute", bottom: 60, left: 80, fontSize: 18, color: "#C6FF3C", letterSpacing: "0.15em" }}>
          {service.metric} {service.metricLabel}
        </p>
        <p style={{ position: "absolute", bottom: 60, right: 80, fontSize: 16, color: "#22D3EE", letterSpacing: "0.2em" }}>
          NEUROSPARK · LIVE
        </p>
      </div>
    ),
    { ...size }
  );
}
