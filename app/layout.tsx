import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "212 — PCExpert AI",
  description:
    "Sistem Pakar Konsultan Perakitan PC & Kompatibilitas Hardware berbasis representasi logika SWI-Prolog dan penalaran Constraint Satisfaction.",
  keywords: "212, sistem pakar, perakitan pc, komputer, SWI-Prolog, AI, rekomendasi pc, kompatibilitas hardware",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased bg-[#0b0e11] text-[#eaecef]" style={{ fontFamily: "var(--font-sans)" }}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
