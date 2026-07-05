import type { ReactNode } from "react";
import Chrome from "./Chrome";
import SiteHeader from "@/components/experience/SiteHeader";
import CommandBar from "./CommandBar";
import Footer from "./Footer";

export default function TerminalShell({ children }: { children: ReactNode }) {
  return (
    <Chrome>
      <SiteHeader />
      <CommandBar />
      <main
        style={{
          padding: "0 24px",
          maxWidth: 1480,
          width: "100%",
          margin: "0 auto",
          flex: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </Chrome>
  );
}
