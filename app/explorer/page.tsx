"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { KB_QUERIES } from "@/lib/constants";
import { QueryResult } from "@/lib/types";
import { QueryCardList } from "@/components/explorer/QueryCardList";
import { QueryExecutor } from "@/components/explorer/QueryExecutor";
import { Database, Sparkles } from "lucide-react";

export default function ExplorerPage() {
  const [activeId, setActiveId] = useState<string>(KB_QUERIES[0].id);
  const [results, setResults] = useState<Record<string, QueryResult>>({});
  const [loading, setLoading] = useState(false);

  const activeQuery = KB_QUERIES.find((q) => q.id === activeId) || KB_QUERIES[0];

  const handleRunQuery = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeId }),
      });
      const data: QueryResult = await resp.json();
      setResults((prev) => ({ ...prev, [activeId]: data }));
    } catch {
      setResults((prev) => ({
        ...prev,
        [activeId]: {
          success: false,
          description: "",
          items: [],
          rawOutput: "",
          error: "Gagal terhubung ke SWI-Prolog subprocess.",
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a1f] border border-[rgba(255,255,255,0.08)] text-xs text-[#00d4ff] font-medium mb-3">
          <Database size={13} />
          <span>Interactive Knowledge Base Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#eaecef] tracking-tight">
          Prolog Knowledge Base Explorer
        </h1>
        <p className="mt-2 text-sm text-[#848e9c] max-w-2xl leading-relaxed">
          Verifikasi kebenaran ontologi hardware, aturan logika deduktif kecocokan socket,
          penjumlahan rekursif harga rakitan, dan operasi irisan form factor sesuai 5 kriteria pengujian akademik.
        </p>
      </motion.div>

      {/* Grid: Left query selector, Right executor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-[#848e9c] mb-3">
            Daftar 5 Query Akademik
          </div>
          <QueryCardList activeId={activeId} onSelect={(id) => setActiveId(id)} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <QueryExecutor
            query={activeQuery}
            isLoading={loading}
            result={results[activeId] || null}
            onRunQuery={handleRunQuery}
          />
        </motion.div>
      </div>
    </div>
  );
}
