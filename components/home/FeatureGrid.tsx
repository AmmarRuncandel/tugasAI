"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitBranch, Layers, Lightbulb, Terminal } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURES = [
  {
    icon: GitBranch,
    title: "Backward-Chaining Logic",
    desc: "Penalaran goal-driven di mana mesin inferensi Prolog menguji hipotesis diagnosis dan membuktikan setiap premis gejala secara otomatis.",
    color: "#f0b90b",
    glowColor: "yellow" as const,
  },
  {
    icon: Layers,
    title: "Cakupan 7 Gangguan Layer OSI",
    desc: "Meliputi Physical, Data Link, Network, hingga Application Layer sesuai hierarki standar protokol jaringan komputer.",
    color: "#00d4ff",
    glowColor: "cyan" as const,
  },
  {
    icon: Lightbulb,
    title: "Explanatory Interface",
    desc: "Transparansi penalaran AI — setiap hasil diagnosis disertai daftar gejala yang memicu kesimpulan dan rekomendasi penanganan.",
    color: "#0ecb81",
    glowColor: "green" as const,
  },
  {
    icon: Terminal,
    title: "Real Live SWI-Prolog Subprocess",
    desc: "Bukan simulasi dummy JavaScript. Frontend terhubung langsung ke runtime binary SWI-Prolog via child_process bridge.",
    color: "#f7931a",
    glowColor: "yellow" as const,
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 bg-[#0e1116] border-y border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f0b90b]">
            Fondasi Teknologi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#eaecef] mt-2">
            Pilar Utama Arsitektur Sistem Pakar
          </h2>
          <p className="text-sm text-[#848e9c] mt-3">
            Dirancang berdasarkan kaidah Logic, Rules, & Knowledge Representation pada mata kuliah Kecerdasan Buatan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard isHoverable glowColor={feat.glowColor} className="p-6 h-full flex flex-col">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                    style={{
                      background: `rgba(${feat.color === "#f0b90b" ? "240,185,11" : feat.color === "#00d4ff" ? "0,212,255" : feat.color === "#0ecb81" ? "14,203,129" : "247,147,26"}, 0.12)`,
                      borderColor: `rgba(${feat.color === "#f0b90b" ? "240,185,11" : feat.color === "#00d4ff" ? "0,212,255" : feat.color === "#0ecb81" ? "14,203,129" : "247,147,26"}, 0.25)`,
                      color: feat.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-[#eaecef] mb-2">{feat.title}</h3>
                  <p className="text-xs text-[#848e9c] leading-relaxed flex-1">{feat.desc}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
