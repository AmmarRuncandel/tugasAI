"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { QueryResult } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Terminal,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Cpu,
  Layers,
  Sparkles,
  Calculator,
} from "lucide-react";

interface QueryResultDisplayProps {
  result: QueryResult | null;
  queryId: string;
}

export function QueryResultDisplay({ result, queryId }: QueryResultDisplayProps) {
  const [showRaw, setShowRaw] = useState(false);

  if (!result) return null;

  if (!result.success) {
    return (
      <div className="p-4 rounded-xl bg-[rgba(246,70,93,0.1)] border border-[rgba(246,70,93,0.3)] text-xs text-[#f6465d] flex items-center gap-2">
        <AlertCircle size={16} />
        <span>{result.error || "Gagal mengeksekusi query Prolog."}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Description header */}
      <div className="flex items-center justify-between text-xs text-[#848e9c]">
        <div className="flex items-center gap-1.5 text-[#0ecb81] font-semibold">
          <CheckCircle2 size={14} />
          <span>Hasil Eksekusi Prolog Berhasil ({result.items.length} Data Deduksi)</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRaw(!showRaw)}
          leftIcon={<Terminal size={12} />}
          rightIcon={showRaw ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          className="text-xs py-0.5"
        >
          {showRaw ? "Sembunyikan Raw Output" : "Raw Output"}
        </Button>
      </div>

      {/* Structured Result Renderers depending on query type */}
      {queryId === "recursive" ? (
        /* Query 3: Recursive Price Summation */
        <div className="p-5 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.08)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f0b90b]">
            <Calculator size={15} />
            <span>Hasil Penalaran Rekursif Prolog [Head|Tail] (Base Case List Kosong):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-[#1c212a] border border-[rgba(240,185,11,0.2)]">
              <span className="text-[11px] text-[#848e9c] uppercase font-semibold">Tujuan Rekursi</span>
              <div className="text-sm font-bold text-[#eaecef] mt-1">
                {result.items[0]?.[0] || "Penjumlahan Harga Rakitan AM5"}
              </div>
              <div className="text-xs text-[#0ecb81] mt-1">
                {result.items[0]?.[1] || "7 Komponen Terverifikasi Kompatibel"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0ecb81]/10 border border-[#0ecb81]/30">
              <span className="text-[11px] text-[#848e9c] uppercase font-semibold">Total Biaya Rekursi</span>
              <div className="text-2xl font-black text-[#0ecb81] font-mono mt-1">
                {result.items[0]?.[2] || "Rp 34.820.000"}
              </div>
              <div className="text-[11px] text-[#848e9c] mt-1">
                Hasil perhitungan deduktif dari basis pengetahuan pakar_pc.pl
              </div>
            </div>
          </div>
        </div>
      ) : queryId === "list" ? (
        /* Query 4: List Irisan Form Factor Motherboard vs Casing */
        <div className="p-5 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.08)] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f7931a]">
            <Layers size={15} />
            <span>Hasil Operasi Irisan List (member_both / form_factor_irisan):</span>
          </div>

          <div className="p-4 rounded-xl bg-[#1c212a] border border-[rgba(247,147,26,0.2)] space-y-3">
            <div className="text-xs text-[#848e9c] leading-relaxed">
              Membuktikan kesesuaian form factor antara Motherboard berukuran <code className="text-[#00d4ff] bg-[#00d4ff]/10 px-1.5 py-0.5 rounded">[atx, matx]</code> dengan Casing Micro-ATX <code className="text-[#f0b90b] bg-[#f0b90b]/10 px-1.5 py-0.5 rounded">[matx]</code>:
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-[#848e9c]">Irisan yang Diterima:</span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0ecb81]/15 text-[#0ecb81] font-mono text-sm font-bold border border-[#0ecb81]/30">
                {result.items[0]?.[1] || "[matx]"} (Micro-ATX)
              </span>
            </div>
            <div className="text-[11px] text-[#848e9c] italic">
              *Motherboard ukuran ATX tidak muat di casing Micro-ATX, sehingga Prolog secara formal menyimpulkan hanya form factor mATX yang lolos.
            </div>
          </div>
        </div>
      ) : (
        /* Tabular view for query 1, 2, 5 */
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#14171c] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#eaecef]">
              <thead className="bg-[#1a1f26] text-[#848e9c] font-semibold uppercase tracking-wider text-[10px] border-b border-[rgba(255,255,255,0.06)]">
                {queryId === "ontology" && (
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Kode Prolog</th>
                    <th className="py-2.5 px-4">Nama Prosesor (CPU)</th>
                    <th className="py-2.5 px-4">Socket</th>
                    <th className="py-2.5 px-4">Tier</th>
                    <th className="py-2.5 px-4">Harga (IDR)</th>
                  </tr>
                )}
                {queryId === "conjunctive" && (
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Kode Prolog</th>
                    <th className="py-2.5 px-4">Nama Kartu Grafis (GPU)</th>
                    <th className="py-2.5 px-4">VRAM</th>
                    <th className="py-2.5 px-4">Min Watt PSU</th>
                    <th className="py-2.5 px-4">Harga (IDR)</th>
                  </tr>
                )}
                {queryId === "all_diagnosis" && (
                  <tr>
                    <th className="py-2.5 px-4">#</th>
                    <th className="py-2.5 px-4">Kode Prolog</th>
                    <th className="py-2.5 px-4">Nama Komponen</th>
                    <th className="py-2.5 px-4">Brand</th>
                    <th className="py-2.5 px-4">Socket</th>
                    <th className="py-2.5 px-4">TDP</th>
                    <th className="py-2.5 px-4">Harga (IDR)</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)] font-mono text-xs">
                {result.items.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1e2329]/50 transition-colors">
                    <td className="py-2 px-4 text-[#5e6673]">{idx + 1}</td>
                    <td className="py-2 px-4 text-[#f0b90b] font-medium">{row[0]}</td>
                    <td className="py-2 px-4 text-[#eaecef] font-sans">{row[1] || "-"}</td>
                    <td className="py-2 px-4 text-[#00d4ff]">{row[2] || "-"}</td>
                    <td className="py-2 px-4 text-[#0ecb81]">{row[3] || "-"}</td>
                    {row[4] && <td className="py-2 px-4 text-[#f7931a]">{row[4]}</td>}
                    {row[5] && <td className="py-2 px-4 text-[#38bdf8]">{row[5]}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Collapsible raw Prolog terminal stdout */}
      {showRaw && (
        <div className="pt-2">
          <CodeBlock
            code={result.rawOutput || "% Tidak ada output mentah"}
            title="Prolog Raw STDOUT"
          />
        </div>
      )}
    </motion.div>
  );
}
