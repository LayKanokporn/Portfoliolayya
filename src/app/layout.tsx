import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Lay · Automation Problem Solver",
  description:
    "Automation Problem Solver — turning business processes into observable, resilient systems with RPA, AI, and ERP. Enterprise SAP automation (S/4HANA, AI Builder OCR), UiPath/Blue Prism/Power Automate in production, plus a personal LINE bot project: 83% ops cut, 0 silent failures, p95 < 1.5s.",
  keywords: [
    "Automation Problem Solver",
    "AI-Augmented Engineering",
    "AI Tools",
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
    title: "Kanokporn Hudsree — Automation Problem Solver",
    description:
      "RPA · AI · ERP — systems that are observable, resilient, accountable. 83% ops cut · 0 silent failures · p95 < 1.5s in production.",
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
    title: "Kanokporn Hudsree — Automation Problem Solver",
    description: "RPA · AI · ERP — observable, resilient, accountable. 83% ops cut · 0 silent failures.",
    images: ["/profile.jpg"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/logo.jpg" }]
  }
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: "2026-07-03",
  mainEntity: {
    "@type": "Person",
    name: "Kanokporn Hudsree",
    alternateName: "Lay",
    jobTitle: "Automation Problem Solver — RPA · AI · ERP",
    description:
      "Turning business processes into observable, resilient systems with RPA, AI, and ERP. Enterprise SAP S/4HANA automation in production at AIS.",
    email: "mailto:laybabaka@gmail.com",
    url: "https://portfolio-kanokporn.vercel.app",
    address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bangkok University" },
    worksFor: { "@type": "Organization", name: "AIS (Advanced Info Service)" },
    knowsAbout: [
      "SAP S/4HANA",
      "SAP Build Process Automation",
      "UiPath",
      "Blue Prism",
      "Power Automate",
      "AI Builder OCR",
      "Robotic Process Automation",
      "Intelligent Document Processing",
      "AI-Augmented Engineering",
      "Python",
      "Google Apps Script",
      "LINE Messaging API",
      "Computer Vision",
    ],
    sameAs: [
      "https://www.linkedin.com/in/laykanokporn",
      "https://github.com/LayKanokporn",
    ],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
