import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { DiagnosesShowcase } from "@/components/home/DiagnosesShowcase";
import { ArchitectureWorkflow } from "@/components/home/ArchitectureWorkflow";

export const metadata: Metadata = {
  title: "212 NetExpert AI — Sistem Pakar Diagnosis Gangguan Jaringan",
  description:
    "Sistem Pakar 212 berbasis SWI-Prolog dengan Backward-Chaining untuk mendiagnosis 7 jenis gangguan jaringan komputer secara otomatis dan transparan.",
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
