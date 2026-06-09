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

export const metadata: Metadata = {
  title: "Kanokporn Hudsree — ERP Developer & Automation Engineer",
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
    icon: [{ url: "/logo.jpg", type: "image/jpg" }],
    shortcut: ["/logo.jpg"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
