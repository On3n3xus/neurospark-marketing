import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://neurospark.agency";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Neurospark Marketing | Full-Service Creative Agency",
    template: "%s | Neurospark Marketing",
  },
  description:
    "Neurospark Marketing is a full-service creative agency specializing in branding, web development, video production, social media, paid advertising, and content strategy.",
  keywords: [
    "creative agency",
    "branding",
    "web development",
    "video production",
    "social media marketing",
    "digital marketing",
    "content strategy",
    "paid advertising",
  ],
  openGraph: {
    title: "Neurospark Marketing | Full-Service Creative Agency",
    description: "We build brands, websites, and campaigns that spark growth.",
    type: "website",
    siteName: "Neurospark Marketing",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neurospark Marketing | Full-Service Creative Agency",
    description: "We build brands, websites, and campaigns that spark growth.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Neurospark Marketing",
  url: BASE_URL,
  description:
    "Full-service creative agency specializing in branding, web development, video production, social media, paid advertising, and content strategy.",
  services: [
    "Branding",
    "Web Development",
    "Video Production",
    "Social Media Marketing",
    "Paid Advertising",
    "Content Strategy",
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
