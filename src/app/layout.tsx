import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import ParticleBg from "@/components/particle-bg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishabh Yadav | GenAI Engineer • AI Agent Developer",
  description:
    "Portfolio of Rishabh Yadav (Rishabh Scientia), GenAI Engineer, AI Agent Developer, and Data Analyst building intelligent agentic systems and data-driven automation.",
  keywords: [
    "GenAI Engineer",
    "AI Engineer",
    "AI Agent Developer",
    "Data Analyst",
    "Python Developer",
    "LangChain Developer",
    "Portfolio",
    "Rishabh Yadav",
    "Rishabh Scientia",
    "IIIT Kota",
  ],
  authors: [{ name: "Rishabh Yadav", url: "https://github.com/Rishabh-Scientia" }],
  openGraph: {
    title: "Rishabh Yadav | GenAI Engineer & AI Agent Developer",
    description:
      "Building Intelligent AI Systems, Data-Driven Solutions, and the Future of Human-AI Collaboration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Yadav | GenAI Engineer & AI Agent Developer",
    description:
      "Building Intelligent AI Systems, Data-Driven Solutions, and the Future of Human-AI Collaboration.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-dark-bg text-white selection:bg-primary/30 selection:text-white">
        <CustomCursor />
        <ParticleBg />
        {children}
      </body>
    </html>
  );
}
