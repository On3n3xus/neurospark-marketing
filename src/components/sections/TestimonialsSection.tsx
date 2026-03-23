import { testimonials } from "@/lib/testimonials-data";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.02em] text-text-primary">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-8">
              {/* Decorative quote mark */}
              <div className="text-5xl font-serif text-accent/20 leading-none mb-2">
                &ldquo;
              </div>
              <p className="text-base text-text-primary leading-relaxed italic mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: t.color }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
