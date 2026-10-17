import type { Metadata } from "next";
import { ARCHITECTURE_LAYERS } from "@/lib/constants";
import { ArchitectureModuleCard } from "@/components/about/ArchitectureModuleCard";
import { TechStackSection } from "@/components/about/TechStackSection";
import { TeamSection } from "@/components/about/TeamSection";
import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Sistem — 212 PCExpert AI",
  description:
    "Arsitektur sistem pakar 212 konsultan perakitan PC & kompatibilitas hardware berbasis SWI-Prolog.",
};

export default function AboutPage() {
  return (
    <div className="flex-1 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a1f] border border-[rgba(240,185,11,0.25)] text-[#f0b90b] text-xs font-semibold">
          <Brain size={14} />
          <span>Arsitektur Sistem Pakar Berbasis Logika</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#eaecef]">
          Tentang <span className="bg-gradient-to-r from-[#f0b90b] to-[#00d4ff] bg-clip-text text-transparent">212 PCExpert AI</span>
        </h1>
        <p className="text-sm sm:text-base text-[#848e9c] leading-relaxed">
          PCExpert AI menggabungkan paradigma pemrograman deklaratif logika SWI-Prolog
          dengan antarmuka web modern untuk mewujudkan sistem konsultan perakitan PC dan
          validasi kompatibilitas hardware yang cerdas, akurat, dan memiliki transparansi jalur penalaran (Explanatory Interface).
        </p>
      </div>

      {/* 4 Pilar Arsitektur Sistem Pakar */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f0b90b]">
            Komponen Inti
          </span>
          <h2 className="text-2xl font-bold text-[#eaecef] mt-1">
            4 Komponen Sistem Pakar Klasik
          </h2>
          <p className="text-xs text-[#848e9c] mt-2">
            Mengikuti standar keilmuan Kecerdasan Buatan (AI) berbasis aturan produksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARCHITECTURE_LAYERS.map((module) => (
            <ArchitectureModuleCard key={module.num} module={module} />
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <TechStackSection />

      {/* Team Kelompok 3 Orang */}
      <TeamSection />
    </div>
  );
}
