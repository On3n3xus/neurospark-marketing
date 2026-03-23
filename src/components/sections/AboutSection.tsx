import { team, stats } from "@/lib/team-data";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-surface-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">About Us</p>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.02em] text-text-primary mb-6">
            Who We Are
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-[640px] mx-auto leading-relaxed">
            A collective of strategists, designers, developers, and storytellers
            obsessed with building brands that break through the noise.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-16 py-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-8 md:gap-12"
            >
              <div className="text-center">
                <p className="text-3xl md:text-[40px] font-bold text-text-primary tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[13px] text-text-secondary mt-1">
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-12 bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="card p-6 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold text-white mx-auto mb-4"
                style={{ background: member.color }}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <p className="text-base font-semibold text-text-primary">
                {member.name}
              </p>
              <p className="text-[13px] text-text-secondary mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
