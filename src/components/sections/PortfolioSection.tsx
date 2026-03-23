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
              {/* Color placeholder area */}
              <div
                className="h-[200px]"
                style={{ background: `${project.color}10` }}
              />
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
      </div>
    </section>
  );
}
