import TerminalShell from "@/components/terminal/TerminalShell";
import Hero from "@/components/terminal/Hero";
import Telemetry from "@/components/terminal/Telemetry";
import LiveSignals from "@/components/terminal/LiveSignals";
import ServicesGrid from "@/components/terminal/ServicesGrid";
import CampaignGenerator from "@/components/terminal/CampaignGenerator";
import ROISimulator from "@/components/terminal/ROISimulator";
import StrategyPlan from "@/components/terminal/StrategyPlan";
import WorkBand from "@/components/terminal/WorkBand";
import AgentDemo from "@/components/terminal/AgentDemo";
import Reveal from "@/components/terminal/motion/Reveal";

export default function Home() {
  return (
    <TerminalShell>
      <Hero />
      <Telemetry />
      <Reveal y={24}>
        <LiveSignals />
      </Reveal>
      <ServicesGrid limit={6} />
      <Reveal>
        <CampaignGenerator />
      </Reveal>
      <Reveal>
        <ROISimulator />
      </Reveal>
      <Reveal>
        <StrategyPlan />
      </Reveal>
      <WorkBand />
      <Reveal>
        <AgentDemo />
      </Reveal>
    </TerminalShell>
  );
}
