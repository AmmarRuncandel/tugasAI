"use client";

import React, { useState } from "react";
import { SEMUA_GEJALA } from "@/lib/constants";
import { DiagnosisApiResponse } from "@/lib/types";
import { DiagnoseIntro } from "@/components/diagnose/DiagnoseIntro";
import { DiagnoseQuiz } from "@/components/diagnose/DiagnoseQuiz";
import { DiagnoseResultView } from "@/components/diagnose/DiagnoseResultView";

export default function DiagnosePage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "done">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "ya" | "tidak">>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisApiResponse | null>(null);

  const totalGejala = SEMUA_GEJALA.length;
  const currentGejala = SEMUA_GEJALA[currentIdx];

  const handleStart = () => {
    setPhase("quiz");
    setCurrentIdx(0);
    setAnswers({});
    setResult(null);
  };

  const submitDiagnosis = async (finalAnswers: Record<string, "ya" | "tidak">) => {
    setPhase("done");
    setLoading(true);
    setResult(null);

    const gejalaDipilih = Object.entries(finalAnswers)
      .filter(([, ans]) => ans === "ya")
      .map(([id]) => id);

    try {
      const resp = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gejala: gejalaDipilih }),
      });
      const data: DiagnosisApiResponse = await resp.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Gagal berkomunikasi dengan server backend. Pastikan server aktif.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: "ya" | "tidak") => {
    const updated = { ...answers, [currentGejala.id]: answer };
    setAnswers(updated);

    if (currentIdx < totalGejala - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      submitDiagnosis(updated);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentIdx(0);
    setAnswers({});
    setResult(null);
  };

  const selectedGejalaIds = Object.entries(answers)
    .filter(([, ans]) => ans === "ya")
    .map(([id]) => id);

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 bg-[#0b0e11]">
      {phase === "intro" && (
        <DiagnoseIntro onStart={handleStart} totalGejala={totalGejala} />
      )}

      {phase === "quiz" && (
        <DiagnoseQuiz
          currentGejala={currentGejala}
          currentIndex={currentIdx}
          totalGejala={totalGejala}
          currentAnswer={answers[currentGejala.id] ?? null}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {phase === "done" && (
        <DiagnoseResultView
          isLoading={loading}
          result={result}
          selectedGejalaIds={selectedGejalaIds}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
