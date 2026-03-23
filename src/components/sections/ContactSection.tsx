import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-surface-alt">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Contact</p>
          <h2 className="text-3xl md:text-[44px] font-semibold tracking-[-0.02em] text-text-primary mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-base text-text-secondary">
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
        </div>

        <div className="card p-8 md:p-10 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
