"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DiagnosisApiResponse } from "@/lib/types";
import { formatOSILayer, formatSeverity, getOSILayerColor } from "@/lib/utils";
import { SEMUA_GEJALA } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  Terminal,
  ChevronDown,
  ChevronUp,
  Cpu,
} from "lucide-react";

interface DiagnoseResultViewProps {
  isLoading: boolean;
  result: DiagnosisApiResponse | null;
  selectedGejalaIds: string[];
  onRestart: () => void;
}

export function DiagnoseResultView({
  isLoading,
  result,
  selectedGejalaIds,
  onRestart,
}: DiagnoseResultViewProps) {
  const [showRaw, setShowRaw] = useState(false);

  // Helper to get text for symptom ID
  const getSymptomLabel = (id: string) => {
    return SEMUA_GEJALA.find((g) => g.id === id)?.pertanyaan ?? id;
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto w-full text-center py-16">
        <GlassCard className="p-10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#f0b90b]/10 border border-[#f0b90b]/30 flex items-center justify-center text-[#f0b90b] mb-6 shadow-[0_0_30px_rgba(240,185,11,0.2)]">
            <Cpu size={32} className="animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-[#eaecef]">
            Mesin Inferensi SWI-Prolog Sedang Menalar...
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#848e9c] max-w-md">
            Mengevaluasi {selectedGejalaIds.length} fakta gejala dengan aturan produksi Backward-Chaining
            di basis pengetahuan.
          </p>
        </GlassCard>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const isSuccess = result.success && result.diagnosis;
  const diag = result.diagnosis;

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard className="p-6 sm:p-8">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  isSuccess
                    ? "bg-[#0ecb81]/15 border-[#0ecb81]/30 text-[#0ecb81]"
                    : "bg-[#f7931a]/15 border-[#f7931a]/30 text-[#f7931a]"
                }`}
              >
                {isSuccess ? <CheckCircle size={26} /> : <AlertTriangle size={26} />}
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#848e9c]">
                  Hasil Penalaran Sistem Pakar
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-[#eaecef]">
                  {isSuccess ? diag?.nama : "Gejala Tidak Memenuhi Rule"}
                </h1>
              </div>
            </div>

            {isSuccess && diag && (
              <div className="flex items-center gap-2">
                {/* Layer Badge */}
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    background: getOSILayerColor(diag.layer).bg,
                    borderColor: getOSILayerColor(diag.layer).border,
                    color: getOSILayerColor(diag.layer).text,
                  }}
                >
                  {formatOSILayer(diag.layer)}
                </span>
                {/* Severity Badge */}
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    background: formatSeverity(diag.keparahan).bg,
                    borderColor: formatSeverity(diag.keparahan).border,
                    color: formatSeverity(diag.keparahan).text,
                  }}
                >
                  {formatSeverity(diag.keparahan).label}
                </span>
              </div>
            )}
          </div>

          {/* If No Match Found */}
          {!isSuccess && (
            <div className="py-6 space-y-4">
              <div className="p-4 rounded-xl bg-[rgba(247,147,26,0.1)] border border-[rgba(247,147,26,0.25)] text-xs text-[#f7931a] leading-relaxed">
                {result.message ||
                  "Kombinasi gejala yang dimasukkan belum memenuhi aturan produksi spesifik pada basis pengetahuan (pakar_jaringan.pl)."}
              </div>
              <p className="text-xs text-[#848e9c]">
                Gejala yang kamu tandai YA:{" "}
                <span className="font-mono text-[#eaecef]">
                  {selectedGejalaIds.length > 0 ? selectedGejalaIds.join(", ") : "Tidak ada"}
                </span>
              </p>
            </div>
          )}

          {/* If Match Found */}
          {isSuccess && diag && (
            <div className="py-6 space-y-6">
              {/* Explanatory Interface: Justifikasi Gejala */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00d4ff] mb-3">
                  <Lightbulb size={14} />
                  <span>Explanatory Interface Justifikasi Jalur Penalaran</span>
                </div>
                <div className="p-4 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.06)] space-y-2.5">
                  <p className="text-xs text-[#848e9c] mb-2">
                    Kesimpulan diagnosis <strong className="text-[#f0b90b]">diagnosis({diag.kode})</strong> ditarik
                    oleh SWI-Prolog karena seluruh klausa gejala berikut bernilai{" "}
                    <span className="text-[#0ecb81] font-semibold">TRUE</span>:
                  </p>
                  <ul className="space-y-2">
                    {diag.gejalaTerpenuhi.map((gId) => (
                      <li key={gId} className="flex items-start gap-2.5 text-xs text-[#eaecef]">
                        <CheckCircle2 size={15} className="text-[#0ecb81] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[#00d4ff] font-medium mr-2">[{gId}]</span>
                          <span>{getSymptomLabel(gId)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Solution */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0ecb81] mb-3">
                  <CheckCircle size={14} />
                  <span>Rekomendasi Tindakan & Solusi Pakar</span>
                </div>
                <div className="p-4 rounded-xl bg-[rgba(14,203,129,0.08)] border border-[rgba(14,203,129,0.2)] text-xs sm:text-sm text-[#eaecef] leading-relaxed">
                  {diag.solusi}
                </div>
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRaw(!showRaw)}
              leftIcon={<Terminal size={14} />}
              rightIcon={showRaw ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            >
              {showRaw ? "Sembunyikan Terminal Output" : "Lihat Raw Output Prolog"}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onRestart}
              leftIcon={<RotateCcw size={16} />}
            >
              Diagnosa Ulang / Kasus Baru
            </Button>
          </div>

          {/* Collapsible Raw Output */}
          {showRaw && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6"
            >
              <CodeBlock
                code={
                  result.rawOutput ||
                  `% Prolog Goal Executed:\n?- diagnosa_batch([${selectedGejalaIds.join(",")}]).\n\nRESULT:${diag?.kode || "tidak_ditemukan"}`
                }
                title="Prolog Subprocess Output"
              />
            </motion.div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
