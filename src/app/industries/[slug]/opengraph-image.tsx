import { ImageResponse } from "next/og";
import { industries } from "@/lib/industries-data";

export const alt = "Neurospark Industry Pillar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) {
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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#FF3DAA" }} />
        <p style={{ fontSize: 18, color: "#FF3DAA", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
          // INDUSTRY · MINNEAPOLIS
        </p>
        <p style={{ fontSize: 64, fontWeight: 300, letterSpacing: "-0.04em", margin: "24px 0 18px", color: "#fff", maxWidth: 1040, lineHeight: 1.05 }}>
          {industry.hero.headline}
        </p>
        <p style={{ fontSize: 24, color: "#E8E6F0", maxWidth: 900, margin: 0, lineHeight: 1.4 }}>
          {industry.hero.subhead}
        </p>
        <p style={{ position: "absolute", bottom: 60, right: 80, fontSize: 16, color: "#22D3EE", letterSpacing: "0.2em" }}>
          NEUROSPARK · LIVE
        </p>
      </div>
    ),
    { ...size }
  );
}
