import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://neurosparkmarketing.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Neurospark · AI Marketing Operator",
    template: "%s · Neurospark",
  },
  description:
    "Neurospark deploys autonomous AI agents that run marketing for small and mid-size teams — outbound, content, paid media, brand intelligence, automation, and forecasting.",
  keywords: [
    "ai marketing agency",
    "ai marketing operator",
    "autonomous agents",
    "ai content engine",
    "predictive paid media",
    "brand intelligence",
    "growth automation",
    "ai seo",
    "neurospark",
  ],
  openGraph: {
    title: "Neurospark · AI Marketing Operator",
    description:
      "Autonomous agents that run your marketing — content, paid media, SEO, brand intel, automation, forecasting.",
    type: "website",
    siteName: "Neurospark",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurospark · AI Marketing Operator",
    description:
      "Autonomous agents that run your marketing — content, paid media, SEO, brand intel, automation, forecasting.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neurospark",
  url: BASE_URL,
  description:
    "AI marketing operator deploying autonomous agents for small and mid-size teams.",
  services: [
    "AI Agents",
    "Content Engine",
    "Paid Media AI",
    "Brand Intelligence",
    "Growth Automation",
    "Revenue Forecast",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
