import { services } from "@/lib/services-data";

const iconMap: Record<string, string> = {
  diamond: "◆",
  cube: "⬡",
  play: "▶",
  nodes: "◎",
  target: "◉",
  document: "▤",
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-3">What We Do</p>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.02em] text-text-primary">
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card p-8">
              <div className="text-[32px] text-text-primary mb-4">
                {iconMap[service.icon] || "●"}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
