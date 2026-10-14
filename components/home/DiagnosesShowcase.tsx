"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DIAGNOSIS_LIST } from "@/lib/constants";
import { formatOSILayer, formatSeverity, getOSILayerColor } from "@/lib/utils";

import { GlassCard } from "@/components/ui/GlassCard";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function DiagnosesShowcase() {
  const [selectedLayer, setSelectedLayer] = useState<string>("all");

  const layers = [
    { id: "all", label: "Semua Layer (7 Kasus)" },
    { id: "physical_layer", label: "Physical (L1)" },
    { id: "data_link_layer", label: "Data Link (L2)" },
    { id: "network_layer", label: "Network (L3)" },
    { id: "application_layer", label: "Application (L7)" },
  ];

  const filtered =
    selectedLayer === "all"
      ? DIAGNOSIS_LIST
      : DIAGNOSIS_LIST.filter((d) => d.layer === selectedLayer);

  return (
    <section className="py-20 bg-[#0b0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
              Ontologi Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#eaecef] mt-2">
              7 Kerusakan Jaringan yang Mampu Didiagnosis
            </h2>
            <p className="text-sm text-[#848e9c] mt-2 max-w-xl">
              Setiap entitas masalah dihubungkan dengan serangkaian premis gejala spesifik dan tindakan solutif.
            </p>
          </div>

          {/* Layer Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#161a1f] rounded-xl border border-[rgba(255,255,255,0.06)]">
            {layers.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedLayer(l.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedLayer === l.id
                    ? "bg-[#2b3139] text-[#eaecef] shadow-sm font-semibold border border-[rgba(255,255,255,0.1)]"
                    : "text-[#848e9c] hover:text-[#eaecef]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnoses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((diag, index) => {
            const layerStyle = getOSILayerColor(diag.layer);
            const sev = formatSeverity(diag.keparahan);

            return (
              <motion.div
                key={diag.kode}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard isHoverable className="p-5 h-full flex flex-col justify-between">
                  <div>
                    {/* Top Row: Icon + Badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          background: layerStyle.bg,
                          borderColor: layerStyle.border,
                          color: layerStyle.text,
                        }}
                      >
                        <DynamicIcon name={diag.iconName} size={20} />
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-semibold border"
                          style={{
                            background: layerStyle.bg,
                            borderColor: layerStyle.border,
                            color: layerStyle.text,
                          }}
                        >
                          {formatOSILayer(diag.layer)}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-semibold border"
                          style={{
                            background: sev.bg,
                            borderColor: sev.border,
                            color: sev.text,
                          }}
                        >
                          {sev.label}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#eaecef] mb-1.5">{diag.nama}</h3>
                    <p className="text-xs font-mono text-[#848e9c] mb-3">
                      rule: <span className="text-[#f0b90b]">diagnosis({diag.kode})</span>
                    </p>

                    {/* Solusi Preview */}
                    <div className="p-3 rounded-lg bg-[#14171c] border border-[rgba(255,255,255,0.04)] mb-4">
                      <div className="text-[11px] font-semibold text-[#848e9c] mb-1">
                        Rekomendasi Penanganan:
                      </div>
                      <p className="text-xs text-[#eaecef] leading-relaxed line-clamp-2">
                        {diag.solusi}
                      </p>
                    </div>
                  </div>

                  {/* Gejala Trigger Count */}
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#848e9c]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#0ecb81]" />
                      <span>{diag.gejalaSyarat.length} Gejala Syarat</span>
                    </div>
                    <Link
                      href="/diagnose"
                      className="text-[#f0b90b] hover:underline flex items-center gap-1 text-[11px] font-semibold"
                    >
                      Uji Kasus <ChevronRight size={12} />
                    </Link>
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
