"use client";

import React, { useState } from "react";
import { QueryResult } from "@/lib/types";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  Terminal,
  ChevronDown,
  ChevronUp,
  AlertCircle,
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
    <div className="space-y-4">
      {/* Description header */}
      <div className="flex items-center justify-between text-xs text-[#848e9c]">
        <div className="flex items-center gap-1.5 text-[#0ecb81] font-semibold">
          <CheckCircle2 size={14} />
          <span>Hasil Eksekusi Prolog Berhasil ({result.items.length} Data)</span>
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
        /* Topology recursive chain visualization */
        <div className="p-4 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="text-xs text-[#848e9c]">
            Rute Node yang dapat dijangkau dari <strong className="text-[#f0b90b]">pc_klien</strong>:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-[#f0b90b]/15 text-[#f0b90b] font-mono text-xs font-bold border border-[#f0b90b]/30">
              pc_klien
            </span>
            {result.items.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[#5e6673] font-bold">➔</span>
                <span className="px-3 py-1 rounded-lg bg-[#00d4ff]/15 text-[#00d4ff] font-mono text-xs font-semibold border border-[#00d4ff]/30">
                  {item[1] || item[0]}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : queryId === "list" ? (
        /* List irisan visualization */
        <div className="p-4 rounded-xl bg-[#14171c] border border-[rgba(255,255,255,0.06)] space-y-3">
          <div className="text-xs text-[#848e9c]">
            Irisan Gejala (<code className="text-[#f7931a]">member_both</code>):
          </div>
          <div className="flex flex-wrap gap-2">
            {result.items.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#f7931a]/15 text-[#f7931a] font-mono text-xs font-semibold border border-[#f7931a]/30"
              >
                {item[1] || item[0]}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Tabular view for query 1, 2, 5 */
        <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#14171c] overflow-hidden">
          <table className="w-full text-left text-xs text-[#eaecef]">
            <thead className="bg-[#1a1f26] text-[#848e9c] font-semibold uppercase tracking-wider text-[10px] border-b border-[rgba(255,255,255,0.06)]">
              <tr>
                <th className="py-2.5 px-4">#</th>
                <th className="py-2.5 px-4">Identifier / Kode</th>
                <th className="py-2.5 px-4">Deskripsi / Nilai Unifikasi</th>
                {queryId === "all_diagnosis" && <th className="py-2.5 px-4">Layer</th>}
                {queryId === "all_diagnosis" && <th className="py-2.5 px-4">Tingkat</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] font-mono">
              {result.items.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#1e2329]/50 transition-colors">
                  <td className="py-2 px-4 text-[#5e6673]">{idx + 1}</td>
                  <td className="py-2 px-4 text-[#f0b90b] font-medium">{row[0]}</td>
                  <td className="py-2 px-4 text-[#eaecef] font-sans text-xs">{row[1] || "-"}</td>
                  {queryId === "all_diagnosis" && (
                    <td className="py-2 px-4 text-[#00d4ff] text-xs">{row[2] || "-"}</td>
                  )}
                  {queryId === "all_diagnosis" && (
                    <td className="py-2 px-4 text-[#f6465d] text-xs">{row[3] || "-"}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}
