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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
    <div className="min-h-screen bg-background text-text-primary">
      {/* Back nav */}
      <nav className="sticky top-0 z-40 px-6 py-4 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/#work"
            className="text-sm text-text-secondary hover:text-accent transition-colors"
          >
            ← Back
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {project.category}
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-20">
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] mb-4 text-text-primary">
            {project.title}
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1 rounded-full bg-surface-alt border border-border text-text-tertiary font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border mb-16" />

        {/* Challenge */}
        <section className="mb-16">
          <h2 className="section-label mb-4" style={{ color: project.color }}>
            The Challenge
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-secondary">
            {details.challenge}
          </p>
        </section>

        {/* Approach */}
        <section className="mb-16">
          <h2 className="section-label mb-4" style={{ color: project.color }}>
            Our Approach
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-text-secondary">
            {details.approach}
          </p>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="section-label mb-6" style={{ color: project.color }}>
            Results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {details.results.map((result) => (
              <div
                key={result.metric}
                className="card p-5 text-center"
                style={{ borderColor: `${project.color}20` }}
              >
                <p
                  className="text-2xl md:text-3xl font-bold font-mono tabular-nums"
                  style={{ color: project.color }}
                >
                  {result.value}
                </p>
                <p className="text-xs text-text-tertiary mt-2 uppercase tracking-wider">
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
              className="card p-8 md:p-10"
              style={{ borderColor: `${project.color}20` }}
            >
              <p className="text-lg md:text-xl leading-relaxed text-text-primary mb-6 italic">
                &ldquo;{details.testimonial.quote}&rdquo;
              </p>
              <p className="text-sm text-text-secondary">
                — {details.testimonial.name}, {details.testimonial.role}
              </p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center py-12">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-text-primary">
            Ready to start your project?
          </h3>
          <p className="text-text-secondary mb-8">
            Let&apos;s create something extraordinary together.
          </p>
          <Link href="/#contact" className="btn-pill px-8 py-3.5">
            Get in Touch
          </Link>
        </section>
      </main>
    </div>
  );
}
