import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { DiagnosesShowcase } from "@/components/home/DiagnosesShowcase";
import { ArchitectureWorkflow } from "@/components/home/ArchitectureWorkflow";

export const metadata: Metadata = {
  title: "212 PCExpert AI — Sistem Pakar Konsultan Perakitan PC & Kompatibilitas",
  description:
    "Sistem Pakar cerdas berbasis SWI-Prolog dengan Constraint Logic untuk merekomendasikan rakitan PC dan memvalidasi kompatibilitas hardware secara otomatis dan transparan.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <DiagnosesShowcase />
      <ArchitectureWorkflow />
    </div>
  );
}
