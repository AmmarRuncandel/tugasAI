import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { DiagnosesShowcase } from "@/components/home/DiagnosesShowcase";
import { DatasetShowcase } from "@/components/home/DatasetShowcase";
import { ArchitectureWorkflow } from "@/components/home/ArchitectureWorkflow";

export const metadata: Metadata = {
  description:
    "Sistem Pakar cerdas berbasis SWI-Prolog dengan Constraint Logic untuk merekomendasikan rakitan PC dan memvalidasi kompatibilitas hardware secara otomatis dan transparan.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <DiagnosesShowcase />
      <DatasetShowcase />
      <ArchitectureWorkflow />
    </div>
  );
}
