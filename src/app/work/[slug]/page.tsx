import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/portfolio-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Neurospark Marketing`,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const { details } = project;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back link */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <div className="mb-16">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-4 border"
            style={{
              color: project.color,
              borderColor: `${project.color}30`,
              background: `${project.color}08`,
            }}
          >
            Case Study
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Neon divider */}
        <div
          className="h-px w-full mb-16"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
        />

        {/* Challenge */}
        <section className="mb-16">
          <h2
            className="text-sm font-mono uppercase tracking-widest mb-4"
            style={{ color: project.color }}
          >
            The Challenge
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/70">
            {details.challenge}
          </p>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2
            className="text-sm font-mono uppercase tracking-widest mb-4"
            style={{ color: project.color }}
          >
            Our Approach
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-white/70">
            {details.approach}
          </p>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2
            className="text-sm font-mono uppercase tracking-widest mb-6"
            style={{ color: project.color }}
          >
            Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {details.results.map((result) => (
              <div
                key={result.metric}
                className="rounded-xl p-5 text-center"
                style={{
                  background: `${project.color}08`,
                  border: `1px solid ${project.color}20`,
                }}
              >
                <p
                  className="text-2xl md:text-3xl font-bold font-mono tabular-nums"
                  style={{ color: project.color }}
                >
                  {result.value}
                </p>
                <p className="text-xs text-white/40 mt-2 uppercase tracking-wider">
                  {result.metric}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        {details.testimonial && (
          <section className="mb-16">
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: `${project.color}05`,
                border: `1px solid ${project.color}15`,
              }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-6 italic">
                &ldquo;{details.testimonial.quote}&rdquo;
              </p>
              <p className="text-sm text-white/50">
                — {details.testimonial.name}, {details.testimonial.role}
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-12">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Ready to start your project?
          </h3>
          <p className="text-white/40 mb-8">
            Let&apos;s create something extraordinary together.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-xl text-lg font-semibold text-black bg-[var(--neon-cyan)] hover:brightness-110 transition-all glow-box-cyan"
          >
            Get in Touch
          </Link>
        </section>
      </main>
    </div>
  );
}
