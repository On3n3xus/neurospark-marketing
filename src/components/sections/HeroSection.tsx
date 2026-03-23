import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <p className="section-label mb-4">AI-Powered Creative Agency</p>
      <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.04em] leading-[1.05] text-text-primary max-w-4xl">
        Where AI Meets Creativity.
      </h1>
      <p className="mt-6 text-base md:text-lg text-text-secondary max-w-[520px] leading-relaxed">
        We craft brands, build digital experiences, and drive growth — powered
        by intelligence.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <Link href="#contact" className="btn-pill px-8 py-3.5">
          Get Started
        </Link>
        <Link
          href="#work"
          className="text-accent text-[15px] font-medium hover:underline underline-offset-4"
        >
          See our work →
        </Link>
      </div>
    </section>
  );
}
