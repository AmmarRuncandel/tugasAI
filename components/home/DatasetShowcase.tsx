"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  Database,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  Box,
  HardDrive,
  CircuitBoard,
  Filter,
  ShieldCheck,
  Check,
} from "lucide-react";

const DATASET_STATS = [
  { label: "Prosesor (CPU)", clean: 437, icon: Cpu, color: "#00d4ff", priceRange: "Rp 1,1 jt – Rp 14 jt" },
  { label: "Kartu Grafis (GPU)", clean: 164, icon: HardDrive, color: "#f0b90b", priceRange: "Rp 1,2 jt – Rp 18 jt" },
  { label: "Motherboard", clean: 93, icon: CircuitBoard, color: "#0ecb81", priceRange: "Rp 1,4 jt – Rp 8 jt" },
  { label: "Power Supply (PSU)", clean: 38, icon: Zap, color: "#f7931a", priceRange: "Rp 400 rb – Rp 3,2 jt" },
  { label: "Memori (RAM)", clean: 80, icon: Layers, color: "#38bdf8", priceRange: "Rp 400 rb – Rp 4,5 jt" },
  { label: "Storage (SSD NVMe)", clean: 84, icon: Database, color: "#a78bfa", priceRange: "Rp 400 rb – Rp 6 jt" },
  { label: "Casing Komputer", clean: 50, icon: Box, color: "#c084fc", priceRange: "Rp 300 rb – Rp 3,5 jt" },
];

const PRICE_EXAMPLES = [
  { name: "Intel Core i5-12400F", idr: "Rp 2.471.520", note: "Prosesor mid-range terbaik Intel Gen 12", tier: "Mid-range" },
  { name: "AMD Ryzen 5 3600", idr: "Rp 1.862.000", note: "Best-value prosesor platform AM4", tier: "Value" },
  { name: "Intel Arc A750 8GB", idr: "Rp 3.450.000", note: "GPU dengan dual AV1 hardware encoder", tier: "Mid-range" },
  { name: "NVIDIA RTX 3060 12GB", idr: "Rp 5.700.000", note: "12GB VRAM untuk rendering & gaming 1080p", tier: "High" },
];

const TIER_COLOR: Record<string, string> = {
  Value: "#0ecb81",
  "Mid-range": "#00d4ff",
  High: "#f0b90b",
};

export function DatasetShowcase() {
  const [activeTab, setActiveTab] = useState<"stats" | "prices" | "rules">("stats");

  return (
    <section className="py-20 bg-[#0e1116] border-y border-[rgba(255,255,255,0.06)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a22] border border-[rgba(240,185,11,0.25)] text-[#f0b90b] text-xs font-semibold mb-3">
            <Database size={13} />
            <span>946 Komponen Hardware Terverifikasi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#eaecef] tracking-tight">
            Fondasi Data &amp; Pemodelan Pengetahuan
          </h2>
          <p className="mt-3 text-sm text-[#848e9c] leading-relaxed">
            Sistem pakar ini dibangun di atas{" "}
            <strong className="text-[#eaecef]">946 komponen hardware nyata</strong> yang dikurasi
            secara ketat dari ribuan produk yang tersedia di pasar, mencakup 7 kategori komponen
            PC dari prosesor hingga casing.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] mt-6">
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "stats"
                  ? "bg-[#f0b90b] text-[#0e1116] shadow-[0_0_15px_rgba(240,185,11,0.3)]"
                  : "text-[#848e9c] hover:text-[#eaecef]"
              }`}
            >
              <Filter size={13} />
              <span>946 Komponen</span>
            </button>
            <button
              onClick={() => setActiveTab("prices")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "prices"
                  ? "bg-[#00d4ff] text-[#0e1116] shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                  : "text-[#848e9c] hover:text-[#eaecef]"
              }`}
            >
              <ShieldCheck size={13} />
              <span>Harga Pasar Rupiah</span>
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "rules"
                  ? "bg-[#0ecb81] text-[#0e1116] shadow-[0_0_15px_rgba(14,203,129,0.3)]"
                  : "text-[#848e9c] hover:text-[#eaecef]"
              }`}
            >
              <CheckCircle2 size={13} />
              <span>4 Aturan Logika Formal</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Dataset Stats */}
        {activeTab === "stats" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(240,185,11,0.25)] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">
                    Total Produk Dikurasi
                  </span>
                  <div className="text-3xl font-black text-[#f0b90b] font-mono mt-1">12.797</div>
                </div>
                <div className="text-xs text-[#848e9c] mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  Produk dari berbagai merek & toko
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(0,212,255,0.25)] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">
                    Komponen Unik Terverifikasi
                  </span>
                  <div className="text-3xl font-black text-[#00d4ff] font-mono mt-1">946</div>
                </div>
                <div className="text-xs text-[#848e9c] mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  Terintegrasi ke basis pengetahuan sistem
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(14,203,129,0.25)] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">
                    Duplikasi Dibuang
                  </span>
                  <div className="text-3xl font-black text-[#0ecb81] font-mono mt-1">11.851</div>
                </div>
                <div className="text-xs text-[#848e9c] mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  Listing ganda & data tidak valid dihapus
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(192,132,252,0.25)] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#848e9c] uppercase tracking-wider">
                    Dukungan Seri Modern
                  </span>
                  <div className="text-2xl font-black text-[#c084fc] font-mono mt-1">Intel Arc</div>
                </div>
                <div className="text-xs text-[#848e9c] mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  A380, A580, A750, A770 terintegrasi
                </div>
              </div>
            </div>

            {/* Per-category breakdown */}
            <GlassCard className="p-6">
              <h3 className="text-base font-bold text-[#eaecef] mb-4 flex items-center justify-between flex-wrap gap-2">
                <span>Rincian Komponen per Kategori Hardware</span>
                <span className="text-xs text-[#848e9c] font-normal">7 kategori komponen PC</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#eaecef]">
                  <thead className="bg-[#1a1f26] text-[#848e9c] font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Kategori Hardware</th>
                      <th className="py-2.5 px-4">Komponen Valid</th>
                      <th className="py-2.5 px-4">Rentang Harga (IDR)</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.04)] font-mono">
                    {DATASET_STATS.map((d, idx) => {
                      const Icon = d.icon;
                      return (
                        <tr key={idx} className="hover:bg-[#1e2329]/50 transition-colors">
                          <td className="py-2.5 px-4 font-sans font-bold text-[#eaecef] flex items-center gap-2">
                            <Icon size={14} style={{ color: d.color }} />
                            <span>{d.label}</span>
                          </td>
                          <td className="py-2.5 px-4 font-bold" style={{ color: d.color }}>
                            {d.clean} produk
                          </td>
                          <td className="py-2.5 px-4 text-[#848e9c]">{d.priceRange}</td>
                          <td className="py-2.5 px-4 text-[#0ecb81]">
                            <span className="inline-flex items-center gap-1 font-semibold">
                              <Check size={13} />
                              <span>Aktif</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab 2: Price examples in IDR */}
        {activeTab === "prices" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#00d4ff]/10 via-[#14171f] to-[#f0b90b]/10 border border-[rgba(255,255,255,0.08)]">
              <span className="text-xs font-semibold text-[#00d4ff] uppercase tracking-wider">Harga dalam Rupiah</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#eaecef] mt-1">
                Seluruh harga komponen tersimpan dalam Rupiah (IDR)
              </h3>
              <p className="text-xs text-[#848e9c] leading-relaxed mt-2 max-w-2xl">
                Setiap komponen dalam basis pengetahuan sistem memiliki data harga yang mengacu pada
                nilai pasar hardware di Indonesia, sehingga rekomendasi build yang dihasilkan
                langsung relevan dengan anggaran pengguna.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRICE_EXAMPLES.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#14171f] border border-[rgba(255,255,255,0.06)] flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#eaecef]">{ex.name}</h4>
                    <span className="text-[11px] text-[#848e9c] block mt-0.5">{ex.note}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full font-mono block mb-1"
                      style={{
                        color: TIER_COLOR[ex.tier],
                        backgroundColor: `${TIER_COLOR[ex.tier]}18`,
                      }}
                    >
                      {ex.tier}
                    </span>
                    <span className="text-sm font-extrabold text-[#0ecb81] font-mono">{ex.idr}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: 4 Compatibility Rules */}
        {activeTab === "rules" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#00d4ff]/15 text-[#00d4ff] flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="text-sm font-bold text-[#eaecef]">Kompatibilitas Socket CPU &amp; Motherboard</h4>
              </div>
              <p className="text-xs text-[#848e9c] leading-relaxed">
                Prosesor Intel LGA1700 (contoh: i5-12400F) hanya dapat dipasang pada Motherboard socket LGA1700 (H610/B660/B760). Prosesor AMD AM5 hanya cocok dengan motherboard AM5 (B650/X670).
              </p>
              <CodeBlock
                language="prolog"
                code={`cocok_cpu_mobo(CPU, Mobo) :-\n  cpu(CPU, _, _, Socket, _, _, _),\n  motherboard(Mobo, _, Socket, _, _, _).`}
                title="Aturan 1: cocok_cpu_mobo/2"
              />
            </div>

            <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#f0b90b]/15 text-[#f0b90b] flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="text-sm font-bold text-[#eaecef]">Kompatibilitas Generasi Memori (RAM DDR)</h4>
              </div>
              <p className="text-xs text-[#848e9c] leading-relaxed">
                Slot RAM pada motherboard memiliki takikan fisik berbeda. Keping RAM DDR4 tidak dapat dipasang pada Motherboard DDR5 dan sebaliknya.
              </p>
              <CodeBlock
                language="prolog"
                code={`cocok_mobo_ram(Mobo, RAM) :-\n  motherboard(Mobo, _, _, TipeRAM, _, _),\n  ram(RAM, _, TipeRAM, _, _, _).`}
                title="Aturan 2: cocok_mobo_ram/2"
              />
            </div>

            <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0ecb81]/15 text-[#0ecb81] flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="text-sm font-bold text-[#eaecef]">Kecukupan Daya Elektrikal (PSU vs GPU)</h4>
              </div>
              <p className="text-xs text-[#848e9c] leading-relaxed">
                Kartu grafis berdaya tinggi (misal RTX 4070 / RTX 3090) membutuhkan daya minimum PSU 650W – 850W. Memasang PSU 450W akan memicu PC mati mendadak saat full load.
              </p>
              <CodeBlock
                language="prolog"
                code={`daya_psu_cukup(GPU, PSU) :-\n  gpu(GPU, _, _, MinWatt, _, _, _),\n  psu(PSU, _, Watt, _, _),\n  Watt >= MinWatt.`}
                title="Aturan 3: daya_psu_cukup/2"
              />
            </div>

            <div className="p-5 rounded-2xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#c084fc]/15 text-[#c084fc] flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <h4 className="text-sm font-bold text-[#eaecef]">Kompatibilitas Ukuran Casing (Form Factor)</h4>
              </div>
              <p className="text-xs text-[#848e9c] leading-relaxed">
                Motherboard berukuran standar ATX membutuhkan Casing ATX Mid/Full Tower. Memasang motherboard ATX di casing Micro-ATX (mATX) secara fisik tidak akan muat.
              </p>
              <CodeBlock
                language="prolog"
                code={`cocok_mobo_casing(Mobo, Casing) :-\n  motherboard(Mobo, _, _, _, FormMobo, _),\n  casing(Casing, _, FormCasing, _),\n  ( FormCasing == atx ; FormCasing == FormMobo ).`}
                title="Aturan 4: cocok_mobo_casing/2"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
