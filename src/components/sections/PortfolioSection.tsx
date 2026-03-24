import Link from "next/link";
import { projects } from "@/lib/portfolio-data";

export default function PortfolioSection() {
  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Our Work</p>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.02em] text-text-primary">
            Selected Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="card overflow-hidden group"
            >
              {/* Gradient hero area */}
              <div
                className="h-[200px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}08 40%, #f5f5f7 100%)`,
                }}
              >
                {/* Abstract decorative shapes */}
                <div
                  className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
                  style={{ background: project.color }}
                />
                <div
                  className="absolute right-16 bottom-4 w-16 h-16 rounded-full opacity-10"
                  style={{ background: project.color }}
                />
                <div
                  className="absolute left-8 bottom-8 w-24 h-1 rounded-full opacity-15"
                  style={{ background: project.color }}
                />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-3 py-1 rounded-full bg-surface-alt border border-border text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="#contact" className="btn-pill px-8 py-3.5">
            Start a Project Like These
          </Link>
        </div>
      </div>
    </section>
  );
}
