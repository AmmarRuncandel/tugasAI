"use client";

import React, { useState } from "react";
import { BuildRecommendation } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Cpu,
  CircuitBoard,
  Layers,
  HardDrive,
  Zap,
  Database,
  Box,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
} from "lucide-react";

interface BuildResultCardProps {
  build: BuildRecommendation;
}

export function BuildResultCard({ build }: BuildResultCardProps) {
  const [copied, setCopied] = useState(false);

  const parts = [
    { label: "Prosesor (CPU)", name: build.namaCpu, icon: Cpu, color: "#00d4ff" },
    { label: "Motherboard", name: build.namaMobo, icon: CircuitBoard, color: "#f0b90b" },
    { label: "Memori (RAM)", name: build.namaRam, icon: Layers, color: "#0ecb81" },
    { label: "Kartu Grafis (GPU)", name: build.namaGpu, icon: HardDrive, color: "#f7931a" },
    { label: "Power Supply (PSU)", name: build.namaPsu, icon: Zap, color: "#c084fc" },
    { label: "Penyimpanan (SSD)", name: build.namaStorage, icon: Database, color: "#38bdf8" },
    { label: "Casing PC", name: build.namaCasing, icon: Box, color: "#a78bfa" },
  ];

  const handleCopy = () => {
    const text = [
      `[SPESIFIKASI RAKITAN PC: ${build.labelKebutuhan}]`,
      `Estimasi Biaya: ${formatRupiah(build.totalHarga)}`,
      `---------------------------------------`,
      `• CPU         : ${build.namaCpu}`,
      `• Motherboard : ${build.namaMobo}`,
      `• RAM         : ${build.namaRam}`,
      `• GPU         : ${build.namaGpu}`,
      `• PSU         : ${build.namaPsu}`,
      `• Storage     : ${build.namaStorage}`,
      `• Casing      : ${build.namaCasing}`,
      `---------------------------------------`,
      `Justifikasi Prolog: ${build.justifikasi}`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="p-5 sm:p-6 border border-[rgba(240,185,11,0.25)] bg-[#12151a]/90 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(255,255,255,0.08)]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0b90b]/15 text-[#f0b90b] text-xs font-semibold mb-1">
            <Sparkles size={12} />
            <span>Rekomendasi Rakitan Logika Prolog</span>
          </div>
          <h3 className="text-lg font-bold text-[#eaecef]">{build.labelKebutuhan}</h3>
        </div>
        <div className="text-left sm:text-right flex items-center sm:flex-col sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] text-[#848e9c] block">Estimasi Total Biaya</span>
            <div className="text-xl font-extrabold text-[#f0b90b] font-mono">
              {formatRupiah(build.totalHarga)}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#1a1f29] hover:bg-[#252c3a] text-[#848e9c] hover:text-[#eaecef] border border-[rgba(255,255,255,0.08)] transition-all cursor-pointer"
            title="Salin Rincian ke Clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-[#0ecb81]" />
                <span className="text-[#0ecb81]">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Salin Spek</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid Komponen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {parts.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#181c24] border border-[rgba(255,255,255,0.05)] text-xs"
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${p.color}15`, color: p.color }}
              >
                <Icon size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-[#848e9c] uppercase font-semibold block mb-0.5 tracking-wider">
                  {p.label}
                </span>
                <p
                  className="font-medium text-[#eaecef] line-clamp-2 leading-snug break-words text-xs"
                  title={p.name}
                >
                  {p.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Justifikasi Explanatory Interface */}
      <div className="p-3.5 rounded-xl bg-[#0ecb81]/10 border border-[#0ecb81]/25 text-xs text-[#0ecb81] space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <CheckCircle2 size={14} />
          <span>Explanatory Interface (Justifikasi Penalaran):</span>
        </div>
        <p className="text-[#848e9c] text-xs leading-relaxed">
          {build.justifikasi}
        </p>
      </div>

      {/* Catatan Penyesuaian Anggaran & Keterbatasan Basis Data */}
      {build.notes && (
        <div className="p-3.5 rounded-xl bg-[#f0b90b]/10 border border-[#f0b90b]/30 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#f0b90b]">
            <AlertTriangle size={14} className="shrink-0" />
            <span>Catatan Penyesuaian Anggaran &amp; Keterbatasan Basis Data:</span>
          </div>
          <p className="text-[#eaecef]/90 text-xs leading-relaxed">
            {build.notes}
          </p>
        </div>
      )}
    </GlassCard>
  );
}
