import type { Metadata } from "next";
import TerminalShell from "@/components/terminal/TerminalShell";
import PageHero from "@/components/terminal/PageHero";
import ServicesGrid from "@/components/terminal/ServicesGrid";
import PricingGrid from "@/components/terminal/PricingGrid";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six AI marketing modules: agents, content engine, paid media AI, brand intel, growth automation, revenue forecast. Each ships in 21 days.",
};

export default function ServicesPage() {
  return (
    <TerminalShell>
      <PageHero
        route="services"
        title={
          <>
            Six systems.
            <br />
            Deployable in 21 days.
          </>
        }
        intro="Each module is an autonomous operator wired into your stack. Mix and match — pause or swap any time."
      />
      <ServicesGrid />
      <PricingGrid />
    </TerminalShell>
  );
}
