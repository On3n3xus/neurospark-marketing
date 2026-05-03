import type { ReactNode } from "react";
import Chrome from "./Chrome";
import TopBar from "./TopBar";
import CommandBar from "./CommandBar";
import SubNav from "./SubNav";
import Footer from "./Footer";

export default function TerminalShell({ children }: { children: ReactNode }) {
  return (
    <Chrome>
      <TopBar />
      <CommandBar />
      <SubNav />
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
