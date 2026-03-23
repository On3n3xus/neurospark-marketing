"use client";

import FloatingCard from "@/components/3d/FloatingCard";
import { services } from "@/lib/services-data";
import { SECTION_POSITIONS, HEX_COLORS } from "@/lib/constants";

interface ServicesSectionProps {
  scrollProgress: React.RefObject<number>;
}

const cardColors = [
  HEX_COLORS.cyan,
  HEX_COLORS.magenta,
  HEX_COLORS.purple,
  HEX_COLORS.green,
  HEX_COLORS.blue,
  HEX_COLORS.cyan,
];

// Arrange cards in a 3x2 grid centered on the section
function getCardPosition(index: number): [number, number, number] {
  const cols = 3;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const x = (col - (cols - 1) / 2) * 3.2;
  const y = row === 0 ? 1.2 : -1.8;
  const z = SECTION_POSITIONS.services + Math.abs(col - 1) * 0.5;
  return [x, y, z];
}

export default function ServicesSection({
  scrollProgress,
}: ServicesSectionProps) {
  return (
    <group>
      {services.map((service, i) => (
        <FloatingCard
          key={service.id}
          position={getCardPosition(i)}
          color={cardColors[i]}
          width={2.6}
          height={2.8}
          scrollProgress={scrollProgress}
          visibleRange={[0.12, 0.38]}
        >
          <div className="p-5 text-center">
            <div
              className="text-3xl mb-3"
              style={{ filter: `drop-shadow(0 0 8px ${cardColors[i]})` }}
            >
              {service.icon === "diamond" && "◆"}
              {service.icon === "cube" && "⬡"}
              {service.icon === "play" && "▶"}
              {service.icon === "nodes" && "◎"}
              {service.icon === "target" && "◉"}
              {service.icon === "document" && "▤"}
            </div>
            <h3
              className="text-base font-medium tracking-tight text-white mb-2"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {service.title}
            </h3>
            <p
              className="text-xs leading-relaxed text-white/50"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {service.description}
            </p>
          </div>
        </FloatingCard>
      ))}
    </group>
  );
}
