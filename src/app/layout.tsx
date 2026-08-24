import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lay · Automation Engineer",
  description:
    "ERP Developer & Automation Engineer at AIS. Enterprise SAP automation (S/4HANA, Build Process Automation, BTP), RPA (UiPath, Blue Prism, Power Automate), Document AI, and self-built LINE Bot production system. First-Class Honors graduate in Computer & Robotics Engineering.",
  keywords: [
    "ERP Developer",
    "Automation Engineer",
    "Process Automation Specialist",
    "SAP S/4HANA",
    "SAP Build Process Automation",
    "SAP BTP",
    "SAP Document AI",
    "SAP AI Core",
    "UiPath",
    "Blue Prism",
    "Power Automate",
    "RPA Developer",
    "Financial Process Automation",
    "Intelligent Document Processing",
    "IDP",
    "Digital Transformation",
    "Enterprise Automation",
    "LINE Messaging API",
    "Google Apps Script",
    "Python",
    "Kanokporn Hudsree",
    "Lay",
    "Bangkok"
  ],
  authors: [{ name: "Kanokporn Hudsree" }],
  openGraph: {
    title: "Kanokporn Hudsree — ERP Developer & Automation Engineer",
    description:
      "Enterprise Automation across SAP, RPA, and AI-powered Workflows — built with production-grade logging, error handling, and measurable outcomes.",
    url: "https://laykanokporn.com",
    siteName: "Kanokporn Hudsree — Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Kanokporn Hudsree — Process Automation Specialist"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanokporn Hudsree — ERP Developer & Automation Engineer",
    description: "SAP · UiPath · Power Automate · SAP Build · Production-Grade Automation.",
    images: ["/profile.jpg"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/logo.jpg" }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
