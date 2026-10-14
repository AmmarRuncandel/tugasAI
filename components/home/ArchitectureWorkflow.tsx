"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckSquare, ArrowRight, Binary, FileText } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const STEPS = [
  {
    step: "01",
    title: "Input Gejala Pengguna",
    desc: "Pengguna menjawab pertanyaan interaktif seputar status fisik LAN, sinyal WiFi, IP, ping gateway, dan DNS.",
    icon: CheckSquare,
    color: "#f0b90b",
  },
  {
    step: "02",
    title: "Batch Term Translation",
    desc: "Next.js mengemas daftar fakta yang dipilih menjadi term list Prolog: diagnosa_batch([gejala1, gejala2, ...]).",
    icon: Binary,
    color: "#00d4ff",
  },
  {
    step: "03",
    title: "Backward-Chaining Execution",
    desc: "SWI-Prolog membuktikan hipotesis secara rekursif melalui aturan produksi :- dan mencocokkan fakta di memori kerja.",
    icon: ArrowRight,
    color: "#0ecb81",
  },
  {
    step: "04",
    title: "Explanatory Output",
    desc: "Sistem mengembalikan diagnosis beserta justifikasi daftar gejala yang terpenuhi serta solusi praktis.",
    icon: FileText,
    color: "#c084fc",
  },
];

export function ArchitectureWorkflow() {
  return (
    <section className="py-20 bg-[#0e1116] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0ecb81]">
            Alur Penalaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#eaecef] mt-2">
            Bagaimana NetExpert AI Menarik Kesimpulan?
          </h2>
          <p className="text-sm text-[#848e9c] mt-3">
            Integrasi hybrid antara frontend web modern dan mesin inferensi berbasis logika deklaratif SWI-Prolog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-[rgba(255,255,255,0.15)]">
                        {s.step}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          background: `rgba(${s.color === "#f0b90b" ? "240,185,11" : s.color === "#00d4ff" ? "0,212,255" : s.color === "#0ecb81" ? "14,203,129" : "192,132,252"}, 0.12)`,
                          borderColor: `rgba(${s.color === "#f0b90b" ? "240,185,11" : s.color === "#00d4ff" ? "0,212,255" : s.color === "#0ecb81" ? "14,203,129" : "192,132,252"}, 0.25)`,
                          color: s.color,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#eaecef] mb-2">{s.title}</h3>
                    <p className="text-xs text-[#848e9c] leading-relaxed">{s.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
