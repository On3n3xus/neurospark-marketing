"use client";

import { useState, useCallback } from "react";
import FloatingCard from "@/components/3d/FloatingCard";
import { projects } from "@/lib/portfolio-data";
import { SECTION_POSITIONS } from "@/lib/constants";

interface PortfolioSectionProps {
  scrollProgress: React.RefObject<number>;
}

// Scatter cards in a staggered layout
function getProjectPosition(index: number): [number, number, number] {
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = (col - 1) * 3.5 + (row % 2 === 1 ? 1.5 : 0);
  const y = 1 - row * 3;
  const z = SECTION_POSITIONS.portfolio + col * 0.8;
  return [x, y, z];
}

export default function PortfolioSection({
  scrollProgress,
}: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleProjectClick = useCallback((id: string) => {
    setSelectedProject((prev) => (prev === id ? null : id));
  }, []);

  return (
    <group>
      {projects.map((project, i) => (
        <FloatingCard
          key={project.id}
          position={getProjectPosition(i)}
          color={project.color}
          width={2.8}
          height={2.4}
          scrollProgress={scrollProgress}
          visibleRange={[0.28, 0.55]}
          onClick={() => handleProjectClick(project.id)}
        >
          <div className="p-4">
            <div
              className="text-[10px] font-mono uppercase tracking-widest mb-2"
              style={{
                color: project.color,
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {project.category}
            </div>
            <h3
              className="text-sm font-medium text-white mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {project.title}
            </h3>
            {selectedProject === project.id && (
              <div className="mt-2">
                <p
                  className="text-[11px] leading-relaxed text-white/50 mb-3"
                  style={{ fontFamily: "var(--font-geist-sans)" }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-white/40 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FloatingCard>
      ))}
    </group>
  );
}
