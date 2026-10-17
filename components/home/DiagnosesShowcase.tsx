"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BUILD_PRESETS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { MessageSquare, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function DiagnosesShowcase() {
  return (
    <section className="py-20 bg-[#0b0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
              Ontologi Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#eaecef] mt-2">
              5 Kategori Rakitan PC Cerdas yang Dikenali Prolog
            </h2>
            <p className="text-sm text-[#848e9c] mt-2 max-w-xl">
              Setiap konfigurasi dihitung dan diverifikasi otomatis oleh aturan logika SWI-Prolog untuk memastikan keseimbangan performa, kompatibilitas socket, dan efisiensi daya.
            </p>
          </div>

          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#f0b90b] hover:text-[#ffd13b] transition-colors"
          >
            <span>Buka Konsultan Chatbot</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid Presets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUILD_PRESETS.map((preset, idx) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard
                isHoverable
                className="p-6 h-full flex flex-col justify-between border border-[rgba(255,255,255,0.06)] hover:border-[rgba(240,185,11,0.3)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                      style={{
                        backgroundColor: `${preset.warna}15`,
                        color: preset.warna,
                        borderColor: `${preset.warna}30`,
                      }}
                    >
                      {preset.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#eaecef]">
                      {preset.kisaran}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#eaecef] mb-2">{preset.nama}</h3>
                  <p className="text-xs sm:text-sm text-[#848e9c] leading-relaxed mb-6">
                    {preset.deskripsi}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#0ecb81]">
                    <CheckCircle2 size={13} />
                    <span>100% Kompatibel</span>
                  </div>

                  <Link
                    href={`/diagnose`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#f0b90b] hover:underline"
                  >
                    <span>Konsultasikan</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
