"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gejala } from "@/lib/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import {
  Check,
  X,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";

interface DiagnoseQuizProps {
  currentGejala: Gejala;
  currentIndex: number;
  totalGejala: number;
  currentAnswer: "ya" | "tidak" | null;
  onAnswer: (answer: "ya" | "tidak") => void;
  onBack: () => void;
}

export function DiagnoseQuiz({
  currentGejala,
  currentIndex,
  totalGejala,
  currentAnswer,
  onAnswer,
  onBack,
}: DiagnoseQuizProps) {
  const progress = Math.round(((currentIndex + 1) / totalGejala) * 100);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is in an input field
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "y" || e.key === "Y") {
        e.preventDefault();
        onAnswer("ya");
      } else if (e.key === "t" || e.key === "T" || e.key === "n" || e.key === "N") {
        e.preventDefault();
        onAnswer("tidak");
      } else if ((e.key === "b" || e.key === "B" || e.key === "Backspace") && currentIndex > 0) {
        e.preventDefault();
        onBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onAnswer, onBack]);

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Header with Back button & Progress bar */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-[#848e9c]">
          <button
            onClick={onBack}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:text-[#eaecef] hover:bg-[#1e2329] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Kembali</span>
          </button>

          <span className="font-mono text-xs text-[#eaecef]">
            Pertanyaan <strong className="text-[#f0b90b]">{currentIndex + 1}</strong> dari {totalGejala}
          </span>
        </div>

        <ProgressBar progress={progress} showPercentage={false} color="yellow" />
      </div>

      {/* Main Question Card with Animated Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGejala.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <GlassCard className="p-6 sm:p-8">
            {/* Category Pill + Icon */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a1f] border border-[rgba(255,255,255,0.08)] text-xs text-[#848e9c]">
                <DynamicIcon name={currentGejala.iconName} size={14} className="text-[#00d4ff]" />
                <span>{currentGejala.category}</span>
              </div>

              <span className="font-mono text-[11px] text-[#5e6673]">
                ID: {currentGejala.id}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#eaecef] leading-snug mb-4">
              {currentGejala.pertanyaan}
            </h2>

            {/* Context / How-To-Check Box */}
            <div className="p-4 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.06)] flex items-start gap-3 mb-8">
              <HelpCircle size={18} className="text-[#f0b90b] shrink-0 mt-0.5" />
              <div className="text-xs text-[#848e9c] leading-relaxed">
                <strong className="text-[#eaecef] block mb-0.5">Cara Memeriksa:</strong>
                {currentGejala.konteks}
              </div>
            </div>

            {/* Action Buttons: YA vs TIDAK */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={currentAnswer === "tidak" ? "secondary" : "outline"}
                size="lg"
                onClick={() => onAnswer("tidak")}
                leftIcon={<X size={18} className="text-[#f6465d]" />}
                className="w-full text-sm sm:text-base border-[rgba(255,255,255,0.1)] hover:border-[#f6465d] hover:bg-[rgba(246,70,93,0.1)]"
              >
                <span>Tidak</span>
                <span className="hidden sm:inline text-[10px] font-mono text-[#5e6673] ml-1.5 px-1 py-0.5 rounded bg-[#1e2329]">
                  [T]
                </span>
              </Button>

              <Button
                variant="primary"
                size="lg"
                onClick={() => onAnswer("ya")}
                leftIcon={<Check size={18} />}
                className="w-full text-sm sm:text-base shadow-[0_0_16px_rgba(240,185,11,0.25)]"
              >
                <span>Ya, Sesuai</span>
                <span className="hidden sm:inline text-[10px] font-mono text-[#0b0e11]/70 ml-1.5 px-1 py-0.5 rounded bg-[#f5c842]">
                  [Y]
                </span>
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
