import type { Metadata } from "next";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import ContactForm from "@/components/terminal/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open a channel with Neurospark. Tell us your team size and the metric you want to move — we'll respond within 24 hours.",
};

const MONO = "var(--font-jetbrains-mono), ui-monospace, monospace";

export default function ContactPage() {
  return (
    <TerminalShell>
      <PageHero
        route="contact"
        title="Open a channel."
        intro="Drop a brief. An operator responds within 24 hours, every weekday."
      />

      <section
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 60,
          paddingBottom: 80,
        }}
      >
        <ContactForm />
        <aside
          style={{
            fontFamily: MONO,
            fontSize: 13,
            color: "var(--ns-text-dim)",
            lineHeight: 1.8,
          }}
        >
          <div
            style={{
              color: "var(--ns-violet)",
              letterSpacing: "0.18em",
              marginBottom: 14,
            }}
          >
            DIRECT
          </div>
          <a
            href="mailto:hello@neurosparkmarketing.com"
            style={{
              color: "var(--ns-text)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ns-line-strong)",
              paddingBottom: 1,
            }}
          >
            hello@neurosparkmarketing.com
          </a>
          <br />
          <a
            href="tel:+16514085082"
            style={{
              color: "var(--ns-text)",
              textDecoration: "none",
              borderBottom: "1px solid var(--ns-line-strong)",
              paddingBottom: 1,
            }}
          >
            +1 (651) 408-5082
          </a>
          <br />
          <br />
          <div
            style={{
              color: "var(--ns-violet)",
              letterSpacing: "0.18em",
              marginBottom: 14,
            }}
          >
            VOICE_AGENT
          </div>
          Call our line — Danilo (the AI receptionist) will route you. Calls
          are logged to the CRM in real time.
          <br />
          <br />
          <div
            style={{
              color: "var(--ns-violet)",
              letterSpacing: "0.18em",
              marginBottom: 14,
            }}
          >
            NODE
          </div>
          Minneapolis, MN · Remote-first
          <br />
          <br />
          <div
            style={{
              color: "var(--ns-violet)",
              letterSpacing: "0.18em",
              marginBottom: 14,
            }}
          >
            RESPONSE_TIME
          </div>
          <span style={{ color: "var(--ns-lime)" }}>● &lt; 24 hours</span>,
          every weekday.
        </aside>
      </section>
      <style>{`
        @media (max-width: 880px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </TerminalShell>
  );
}
