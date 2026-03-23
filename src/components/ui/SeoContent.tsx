import { services } from "@/lib/services-data";
import { projects } from "@/lib/portfolio-data";
import { testimonials } from "@/lib/testimonials-data";
import { team } from "@/lib/team-data";

export default function SeoContent() {
  return (
    <div className="sr-only">
      <h1>Neurospark Marketing — Full-Service Creative Agency</h1>
      <p>
        We specialize in branding, web development, video production, social
        media, paid advertising, and content strategy.
      </p>

      <h2>Our Services</h2>
      {services.map((service) => (
        <section key={service.id}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </section>
      ))}

      <h2>Our Work</h2>
      {projects.map((project) => (
        <section key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
          <p>{project.description}</p>
        </section>
      ))}

      <h2>What Our Clients Say</h2>
      {testimonials.map((t) => (
        <section key={t.id}>
          <blockquote>{t.quote}</blockquote>
          <p>
            {t.name}, {t.role} at {t.company}
          </p>
        </section>
      ))}

      <h2>About Our Team</h2>
      {team.map((member) => (
        <p key={member.id}>
          {member.name} — {member.role}
        </p>
      ))}

      <h2>Contact Us</h2>
      <p>
        Ready to spark your next project? Get in touch with Neurospark
        Marketing.
      </p>
    </div>
  );
}
