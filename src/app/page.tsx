import SceneLoader from "@/components/canvas/SceneLoader";
import ContactOverlay from "@/components/ui/ContactOverlay";
import TestimonialsOverlay from "@/components/ui/TestimonialsOverlay";
import AboutOverlay from "@/components/ui/AboutOverlay";
import SeoContent from "@/components/ui/SeoContent";
import ClientOnly from "@/components/ui/ClientOnly";

export default function Home() {
  return (
    <>
      {/* 3D Canvas Layer */}
      <SceneLoader />

      {/* Full-page HTML overlays — client-only to avoid hydration mismatch from GSAP ScrollTrigger */}
      <ClientOnly>
        <TestimonialsOverlay />
        <AboutOverlay />
        <ContactOverlay />
      </ClientOnly>

      {/* Scroll container — drives the camera through 3D space */}
      <div className="relative z-10" style={{ height: "700vh" }}>
        {/* SEO-friendly content (visually behind the canvas, crawlable) */}
        <SeoContent />
      </div>
    </>
  );
}
