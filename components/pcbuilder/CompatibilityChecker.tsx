"use client";

import React, { useState } from "react";
import { ALL_COMPONENTS } from "@/lib/constants";
import { CompatibilityAnalysis } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Cpu,
  CircuitBoard,
  Layers,
  HardDrive,
  Zap,
  Box,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

export function CompatibilityChecker() {
  const cpus = ALL_COMPONENTS.filter((c) => c.kategori === "cpu");
  const mobos = ALL_COMPONENTS.filter((c) => c.kategori === "motherboard");
  const rams = ALL_COMPONENTS.filter((c) => c.kategori === "ram");
  const gpus = ALL_COMPONENTS.filter((c) => c.kategori === "gpu");
  const psus = ALL_COMPONENTS.filter((c) => c.kategori === "psu");
  const cases = ALL_COMPONENTS.filter((c) => c.kategori === "casing");

  const [selectedCpu, setSelectedCpu] = useState(cpus[5].id); // Ryzen 5 7600
  const [selectedMobo, setSelectedMobo] = useState(mobos[6].id); // B650M DDR5
  const [selectedRam, setSelectedRam] = useState(rams[3].id); // DDR5 32GB
  const [selectedGpu, setSelectedGpu] = useState(gpus[3].id); // RTX 4060
  const [selectedPsu, setSelectedPsu] = useState(psus[2].id); // 650W
  const [selectedCase, setSelectedCase] = useState(cases[1].id); // ATX Mid

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityAnalysis | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "check_compatibility",
          cpu: selectedCpu,
          mobo: selectedMobo,
          ram: selectedRam,
          gpu: selectedGpu,
          psu: selectedPsu,
          casing: selectedCase,
        }),
      });
      const data = await resp.json();
      if (data.success && data.compatibility) {
        setResult(data.compatibility);
      }
    } catch {
      setResult({
        status: "tidak_kompatibel",
        totalHarga: 0,
        alasan: ["Gagal terhubung ke SWI-Prolog engine."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
          <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/15 border border-[#00d4ff]/30 text-[#00d4ff] flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#eaecef]">
              Kalkulator Kompatibilitas Hardware Mandiri
            </h2>
            <p className="text-xs text-[#848e9c]">
              Pilih kombinasi komponen yang kamu inginkan. Mesin logika Prolog akan menguji apakah socket, DDR, daya PSU, dan ukuran form factor saling cocok.
            </p>
          </div>
        </div>

        {/* Dropdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CPU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Cpu size={14} className="text-[#00d4ff]" />
              <span>Prosesor (CPU)</span>
            </label>
            <select
              value={selectedCpu}
              onChange={(e) => setSelectedCpu(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {cpus.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nama} — {formatRupiah(c.harga)}
                </option>
              ))}
            </select>
          </div>

          {/* Motherboard */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <CircuitBoard size={14} className="text-[#f0b90b]" />
              <span>Motherboard</span>
            </label>
            <select
              value={selectedMobo}
              onChange={(e) => setSelectedMobo(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {mobos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nama} — {formatRupiah(m.harga)}
                </option>
              ))}
            </select>
          </div>

          {/* RAM */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Layers size={14} className="text-[#0ecb81]" />
              <span>Memori (RAM)</span>
            </label>
            <select
              value={selectedRam}
              onChange={(e) => setSelectedRam(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {rams.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nama} — {formatRupiah(r.harga)}
                </option>
              ))}
            </select>
          </div>

          {/* GPU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <HardDrive size={14} className="text-[#f7931a]" />
              <span>Kartu Grafis (GPU / VGA)</span>
            </label>
            <select
              value={selectedGpu}
              onChange={(e) => setSelectedGpu(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {gpus.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nama} — {formatRupiah(g.harga)}
                </option>
              ))}
            </select>
          </div>

          {/* PSU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Zap size={14} className="text-[#c084fc]" />
              <span>Power Supply Unit (PSU)</span>
            </label>
            <select
              value={selectedPsu}
              onChange={(e) => setSelectedPsu(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {psus.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama} — {formatRupiah(p.harga)}
                </option>
              ))}
            </select>
          </div>

          {/* Casing */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Box size={14} className="text-[#38bdf8]" />
              <span>Casing Komputer</span>
            </label>
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] rounded-xl px-3 py-2.5 text-xs text-[#eaecef] focus:outline-none focus:border-[#f0b90b]"
            >
              {cases.map((cs) => (
                <option key={cs.id} value={cs.id}>
                  {cs.nama} — {formatRupiah(cs.harga)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)] flex justify-end">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCheck}
            disabled={loading}
            className="w-full sm:w-auto px-8 font-bold"
          >
            {loading ? "Menganalisis Aturan Logika..." : "Uji Kompatibilitas dengan SWI-Prolog"}
          </Button>
        </div>
      </GlassCard>

      {/* Result Section */}
      {result && (
        <GlassCard
          className={`p-6 sm:p-8 border ${
            result.status === "kompatibel"
              ? "border-[#0ecb81]/30 bg-[#0ecb81]/5"
              : "border-[#f6465d]/30 bg-[#f6465d]/5"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  result.status === "kompatibel"
                    ? "bg-[#0ecb81]/20 border-[#0ecb81]/40 text-[#0ecb81]"
                    : "bg-[#f6465d]/20 border-[#f6465d]/40 text-[#f6465d]"
                }`}
              >
                {result.status === "kompatibel" ? (
                  <CheckCircle2 size={26} />
                ) : (
                  <XCircle size={26} />
                )}
              </div>
              <div>
                <span className="text-xs uppercase font-semibold text-[#848e9c]">
                  Hasil Deduksi SWI-Prolog
                </span>
                <h3 className="text-xl font-black text-[#eaecef]">
                  {result.status === "kompatibel"
                    ? "100% KOMPATIBEL & AMAN"
                    : "KOMPONEN TIDAK KOMPATIBEL"}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-[#848e9c]">Total Harga 6 Komponen</span>
              <div className="text-xl font-extrabold text-[#f0b90b] font-mono">
                {formatRupiah(result.totalHarga)}
              </div>
            </div>
          </div>

          {/* List Alasan Explanatory Interface */}
          <div className="mt-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#eaecef]">
              <HelpCircle size={14} className="text-[#00d4ff]" />
              <span>Justifikasi Explanatory Interface:</span>
            </div>
            <div className="space-y-2">
              {result.alasan.map((alasan, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg text-xs flex items-start gap-2.5 ${
                    result.status === "kompatibel"
                      ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/25"
                      : "bg-[#f6465d]/15 text-[#f6465d] border border-[#f6465d]/25"
                  }`}
                >
                  {result.status === "kompatibel" ? (
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                  )}
                  <span>{alasan}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
