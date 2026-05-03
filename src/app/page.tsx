import Chrome from "@/components/terminal/Chrome";
import TopBar from "@/components/terminal/TopBar";
import CommandBar from "@/components/terminal/CommandBar";
import SubNav from "@/components/terminal/SubNav";
import Hero from "@/components/terminal/Hero";
import Telemetry from "@/components/terminal/Telemetry";
import LiveSignals from "@/components/terminal/LiveSignals";
import ServicesGrid from "@/components/terminal/ServicesGrid";
import CampaignGenerator from "@/components/terminal/CampaignGenerator";
import ROISimulator from "@/components/terminal/ROISimulator";
import StrategyPlan from "@/components/terminal/StrategyPlan";
import WorkBand from "@/components/terminal/WorkBand";
import AgentDemo from "@/components/terminal/AgentDemo";
import Footer from "@/components/terminal/Footer";

export default function Home() {
  return (
    <Chrome>
      <TopBar />
      <CommandBar />
      <SubNav />
      <main style={{ padding: "0 24px", maxWidth: 1480, width: "100%", margin: "0 auto", flex: 1 }}>
        <Hero />
        <Telemetry />
        <LiveSignals />
        <ServicesGrid limit={6} />
        <CampaignGenerator />
        <ROISimulator />
        <StrategyPlan />
        <WorkBand />
        <AgentDemo />
      </main>
      <Footer />
    </Chrome>
  );
}
