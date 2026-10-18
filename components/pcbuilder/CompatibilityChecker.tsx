"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  ChevronDown,
  Search,
  X,
} from "lucide-react";

// Skenario Pengujian Ujian Akademik AI — no emoji, use color indicator
const DEMO_SCENARIOS = [
  {
    name: "100% Valid & Kompatibel",
    desc: "Platform AM5 + RAM DDR5 + RTX 4060 + PSU 650W + Case Mid-Tower",
    expected: "kompatibel",
    color: "#0ecb81",
    values: {
      cpu: "cpu_ryzen_5_7600x",
      mobo: "mobo_b650m_ddr5",
      ram: "ram_g_skill_ddr5_32gb_6000",
      gpu: "gpu_nvidia_rtx_4060",
      psu: "psu_psu_650w_bronze",
      casing: "case_lian_li_case_15",
    },
  },
  {
    name: "Konflik Socket CPU vs Mobo",
    desc: "Prosesor Intel LGA1700 dipasang pada Motherboard AMD AM5",
    expected: "tidak_kompatibel",
    color: "#f6465d",
    values: {
      cpu: "cpu_i5_12400f",
      mobo: "mobo_b650m_ddr5",
      ram: "ram_g_skill_ddr5_32gb_6000",
      gpu: "gpu_nvidia_rtx_4060",
      psu: "psu_psu_650w_bronze",
      casing: "case_lian_li_case_15",
    },
  },
  {
    name: "Konflik Generasi RAM DDR",
    desc: "Keping RAM DDR4 dipasang pada slot Motherboard DDR5",
    expected: "tidak_kompatibel",
    color: "#f6465d",
    values: {
      cpu: "cpu_ryzen_5_7600x",
      mobo: "mobo_b650m_ddr5",
      ram: "ram_corsair_ddr4_16gb_3200",
      gpu: "gpu_nvidia_rtx_4060",
      psu: "psu_psu_650w_bronze",
      casing: "case_lian_li_case_15",
    },
  },
  {
    name: "Daya PSU Kurang",
    desc: "GPU RTX 4070 (butuh min 650W) dipasangkan dengan PSU 450W",
    expected: "tidak_kompatibel",
    color: "#f6465d",
    values: {
      cpu: "cpu_ryzen_9_5900x",
      mobo: "mobo_b550m_ddr4",
      ram: "ram_corsair_ddr4_16gb_3200",
      gpu: "gpu_nvidia_rtx_4070",
      psu: "psu_cooler_master_450w_bronze",
      casing: "case_ant_esports_case_50",
    },
  },
  {
    name: "Casing Terlalu Kecil",
    desc: "Motherboard ukuran ATX dipasang pada Casing Micro-ATX (mATX)",
    expected: "tidak_kompatibel",
    color: "#f6465d",
    values: {
      cpu: "cpu_ryzen_9_5950x",
      mobo: "mobo_x570_ddr4",
      ram: "ram_corsair_ddr4_16gb_3200",
      gpu: "gpu_nvidia_rtx_3060",
      psu: "psu_psu_650w_bronze",
      casing: "case_deepcool_matrexx_30",
    },
  },
];

// Custom styled select — matches dark UI theme with embedded search
interface StyledSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; nama: string; harga: number }[];
  accentColor?: string;
}

function StyledSelect({ value, onChange, options, accentColor = "#f0b90b" }: StyledSelectProps) {
  const selected = options.find((o) => o.id === value);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearch("");
    }
  }, [open]);

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const query = search.toLowerCase().trim();
    return options.filter((opt) => opt.nama.toLowerCase().includes(query));
  }, [options, search]);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full bg-[#161a22] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)] focus:border-[#f0b90b] rounded-xl px-3 py-2.5 text-xs text-left text-[#eaecef] flex items-center justify-between gap-2 transition-colors cursor-pointer focus:outline-none"
        style={{ borderColor: open ? accentColor : undefined }}
      >
        <span className="line-clamp-2 leading-snug break-words flex-1 min-w-0">
          {selected ? (
            <>
              <span className="font-medium text-[#eaecef]">{selected.nama}</span>
              <span className="text-[#848e9c] ml-1.5 font-mono text-[11px]">— {formatRupiah(selected.harga)}</span>
            </>
          ) : (
            <span className="text-[#5e6673]">Pilih komponen...</span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-[#5e6673] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown with Search Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />

          <div className="absolute top-full mt-1.5 left-0 right-0 z-20 rounded-xl bg-[#1a1f2a] border border-[rgba(255,255,255,0.14)] shadow-[0_12px_40px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
            {/* Search Menu Header */}
            <div className="p-2 border-b border-[rgba(255,255,255,0.08)] bg-[#151922]">
              <div className="relative flex items-center">
                <Search size={13} className="absolute left-2.5 text-[#848e9c] pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setOpen(false);
                    }
                  }}
                  placeholder="Cari komponen..."
                  className="w-full bg-[#0e1117] border border-[rgba(255,255,255,0.1)] focus:border-[rgba(240,185,11,0.6)] text-xs text-[#eaecef] placeholder-[#5e6673] rounded-lg pl-8 pr-7 py-2 outline-none transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-2 text-[#848e9c] hover:text-[#eaecef] p-0.5 rounded cursor-pointer"
                    title="Hapus pencarian"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-[#5e6673]">
                <span>{filteredOptions.length} komponen ditemukan</span>
                {search && <span className="text-[#f0b90b] font-medium">Filter aktif</span>}
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-56 overflow-y-auto py-1 divide-y divide-[rgba(255,255,255,0.03)]">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isActive = opt.id === value;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onChange(opt.id);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs transition-colors flex items-start justify-between gap-2.5 cursor-pointer ${
                        isActive
                          ? "bg-[rgba(240,185,11,0.12)] text-[#f0b90b]"
                          : "text-[#848e9c] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#eaecef]"
                      }`}
                    >
                      <span className="line-clamp-2 leading-snug font-medium break-words flex-1 min-w-0" title={opt.nama}>
                        {opt.nama}
                      </span>
                      <span className={`shrink-0 font-mono text-[11px] mt-0.5 ${isActive ? "text-[#f0b90b]" : "text-[#5e6673]"}`}>
                        {formatRupiah(opt.harga)}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="py-6 px-4 text-center space-y-1">
                  <p className="text-xs text-[#eaecef] font-medium">Komponen tidak ditemukan</p>
                  <p className="text-[11px] text-[#5e6673]">
                    Tidak ada hasil untuk &quot;{search}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function CompatibilityChecker() {
  const cpus   = ALL_COMPONENTS.filter((c) => c.kategori === "cpu");
  const mobos  = ALL_COMPONENTS.filter((c) => c.kategori === "motherboard");
  const rams   = ALL_COMPONENTS.filter((c) => c.kategori === "ram");
  const gpus   = ALL_COMPONENTS.filter((c) => c.kategori === "gpu");
  const psus   = ALL_COMPONENTS.filter((c) => c.kategori === "psu");
  const cases  = ALL_COMPONENTS.filter((c) => c.kategori === "casing");

  const [selectedCpu,   setSelectedCpu]   = useState(cpus[0]?.id  || "cpu_ryzen_5_7600x");
  const [selectedMobo,  setSelectedMobo]  = useState(mobos[0]?.id || "mobo_b650m_ddr5");
  const [selectedRam,   setSelectedRam]   = useState(rams[0]?.id  || "ram_g_skill_ddr5_32gb_6000");
  const [selectedGpu,   setSelectedGpu]   = useState(gpus[0]?.id  || "gpu_nvidia_rtx_4060");
  const [selectedPsu,   setSelectedPsu]   = useState(psus[0]?.id  || "psu_psu_650w_bronze");
  const [selectedCase,  setSelectedCase]  = useState(cases[0]?.id || "case_lian_li_case_15");

  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<CompatibilityAnalysis | null>(null);

  const executeCheck = async (
    c  = selectedCpu,
    m  = selectedMobo,
    r  = selectedRam,
    g  = selectedGpu,
    p  = selectedPsu,
    cs = selectedCase
  ) => {
    setLoading(true);
    setResult(null);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "check_compatibility",
          cpu: c, mobo: m, ram: r, gpu: g, psu: p, casing: cs,
        }),
      });
      const data = await resp.json();
      if (data.success && data.compatibility) {
        setResult(data.compatibility);
        // No scrollIntoView — stay at current position, result renders in-place
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

  const applyScenario = (s: (typeof DEMO_SCENARIOS)[0]) => {
    setSelectedCpu(s.values.cpu);
    setSelectedMobo(s.values.mobo);
    setSelectedRam(s.values.ram);
    setSelectedGpu(s.values.gpu);
    setSelectedPsu(s.values.psu);
    setSelectedCase(s.values.casing);
    executeCheck(s.values.cpu, s.values.mobo, s.values.ram, s.values.gpu, s.values.psu, s.values.casing);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Demo Scenario Bar */}
      <div className="p-5 rounded-2xl bg-[#141720] border border-[rgba(240,185,11,0.2)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#f0b90b]" />
            <span className="text-xs font-bold text-[#eaecef]">
              Skenario Pengujian Logika Cepat (Uji Akademik Prolog):
            </span>
          </div>
          <span className="text-[11px] text-[#848e9c] hidden sm:inline">
            Klik 1 tombol untuk membuktikan aturan Horn clause
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEMO_SCENARIOS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => applyScenario(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a1f29] hover:bg-[#252c3a] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)] text-[#eaecef] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title={s.desc}
            >
              {/* Color dot indicator instead of emoji */}
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

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
              Pilih kombinasi dari 946 produk — SWI-Prolog menguji socket, DDR, watt PSU, dan form factor.
            </p>
          </div>
        </div>

        {/* Custom Dropdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CPU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Cpu size={14} className="text-[#00d4ff]" />
              <span>Prosesor (CPU)</span>
            </label>
            <StyledSelect value={selectedCpu} onChange={setSelectedCpu} options={cpus} accentColor="#00d4ff" />
          </div>

          {/* Motherboard */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <CircuitBoard size={14} className="text-[#f0b90b]" />
              <span>Motherboard</span>
            </label>
            <StyledSelect value={selectedMobo} onChange={setSelectedMobo} options={mobos} accentColor="#f0b90b" />
          </div>

          {/* RAM */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Layers size={14} className="text-[#0ecb81]" />
              <span>Memori (RAM)</span>
            </label>
            <StyledSelect value={selectedRam} onChange={setSelectedRam} options={rams} accentColor="#0ecb81" />
          </div>

          {/* GPU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <HardDrive size={14} className="text-[#f7931a]" />
              <span>Kartu Grafis (GPU / VGA)</span>
            </label>
            <StyledSelect value={selectedGpu} onChange={setSelectedGpu} options={gpus} accentColor="#f7931a" />
          </div>

          {/* PSU */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Zap size={14} className="text-[#c084fc]" />
              <span>Power Supply Unit (PSU)</span>
            </label>
            <StyledSelect value={selectedPsu} onChange={setSelectedPsu} options={psus} accentColor="#c084fc" />
          </div>

          {/* Casing */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#848e9c]">
              <Box size={14} className="text-[#38bdf8]" />
              <span>Casing Komputer</span>
            </label>
            <StyledSelect value={selectedCase} onChange={setSelectedCase} options={cases} accentColor="#38bdf8" />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#5e6673] font-mono">
            Predikat: batch_cek_kompatibilitas/6
          </span>
          <Button
            variant="primary"
            size="lg"
            onClick={() => executeCheck()}
            disabled={loading}
            className="w-full sm:w-auto px-8 font-bold shadow-[0_0_20px_rgba(240,185,11,0.25)]"
          >
            {loading ? "Mengevaluasi SWI-Prolog..." : "Uji Kompatibilitas dengan SWI-Prolog"}
          </Button>
        </div>
      </GlassCard>

      {/* Result Section — renders in place with smooth framer-motion entrance */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <GlassCard
              className={`p-6 sm:p-8 border ${
                result.status === "kompatibel"
                  ? "border-[#0ecb81]/40 bg-[#0ecb81]/5 shadow-[0_0_30px_rgba(14,203,129,0.1)]"
                  : "border-[#f6465d]/40 bg-[#f6465d]/5 shadow-[0_0_30px_rgba(246,70,93,0.1)]"
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
                    {result.status === "kompatibel" ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-[#848e9c]">
                      Hasil Deduksi Logika SWI-Prolog
                    </span>
                    <h3 className="text-xl font-black text-[#eaecef]">
                      {result.status === "kompatibel"
                        ? "100% KOMPATIBEL & AMAN DIRAKIT"
                        : "TERDAPAT KONTRADIKSI / TIDAK KOMPATIBEL"}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-[#848e9c]">Estimasi Total 6 Komponen</span>
                  <div className="text-xl font-extrabold text-[#f0b90b] font-mono">
                    {formatRupiah(result.totalHarga)}
                  </div>
                </div>
              </div>

              {/* Explanatory Interface */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#eaecef]">
                  <HelpCircle size={14} className="text-[#00d4ff]" />
                  <span>Explanatory Interface (Justifikasi Penalaran Formal):</span>
                </div>
                <div className="space-y-2">
                  {result.alasan.map((alasan, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl text-xs flex items-start gap-3 ${
                        result.status === "kompatibel"
                          ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                          : "bg-[#f6465d]/15 text-[#f6465d] border border-[#f6465d]/30"
                      }`}
                    >
                      {result.status === "kompatibel" ? (
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[#0ecb81]" />
                      ) : (
                        <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[#f6465d]" />
                      )}
                      <span className="leading-relaxed font-medium">{alasan}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
