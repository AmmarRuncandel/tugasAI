"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  Cpu,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

interface DiagnoseIntroProps {
  onStart: () => void;
  totalGejala: number;
}

export function DiagnoseIntro({ onStart, totalGejala }: DiagnoseIntroProps) {
  const highlights = [
    {
      icon: Clock,
      text: "Estimasi waktu pemeriksaan: ~2 menit",
      color: "text-[#f0b90b]",
    },
    {
      icon: Cpu,
      text: "Diproses langsung oleh SWI-Prolog Engine (Backward-Chaining)",
      color: "text-[#00d4ff]",
    },
    {
      icon: CheckCircle2,
      text: `Jawab Ya / Tidak untuk setiap ${totalGejala} gejala jaringan`,
      color: "text-[#0ecb81]",
    },
    {
      icon: Lightbulb,
      text: "Dilengkapi Explanatory Interface (Justifikasi penalaran sistem)",
      color: "text-[#f7931a]",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard className="p-8 sm:p-10 text-center">
          {/* Animated Header Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f0b90b]/20 to-[#00d4ff]/10 border border-[rgba(240,185,11,0.3)] flex items-center justify-center text-[#f0b90b] mx-auto mb-6 shadow-[0_0_24px_rgba(240,185,11,0.2)]">
            <Wrench size={30} className="animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#eaecef] tracking-tight">
            Diagnosis Gangguan Jaringan
          </h1>
          <p className="mt-3 text-sm text-[#848e9c] leading-relaxed max-w-lg mx-auto">
            Sistem pakar akan mengajukan serangkaian pertanyaan gejala fisik, nirkabel, IP, dan
            konektivitas secara bertahap untuk mengidentifikasi akar permasalahan jaringan kamu.
          </p>

          {/* Highlights checklist */}
          <div className="mt-8 mb-8 p-5 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.06)] text-left space-y-3.5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#848e9c]">
                  <Icon size={16} className={`shrink-0 ${item.color}`} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onStart}
            rightIcon={<ArrowRight size={18} />}
            className="w-full text-base font-bold shadow-[0_0_20px_rgba(240,185,11,0.3)]"
          >
            Mulai Sesi Konsultasi
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
