"use client";

import React from "react";
import { KBQueryItem, QueryResult } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { QueryResultDisplay } from "./QueryResultDisplay";
import { Play, BookOpen } from "lucide-react";

interface QueryExecutorProps {
  query: KBQueryItem;
  isLoading: boolean;
  result: QueryResult | null;
  onRunQuery: () => void;
}

export function QueryExecutor({
  query,
  isLoading,
  result,
  onRunQuery,
}: QueryExecutorProps) {
  return (
    <GlassCard className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f0b90b]">
            {query.badge}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#eaecef]">{query.label}</h2>
        <p className="text-xs sm:text-sm text-[#848e9c] mt-2 leading-relaxed">
          {query.desc}
        </p>
      </div>

      {/* Code Block */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#848e9c] flex items-center gap-1.5">
            <BookOpen size={13} />
            Sintaks Query Prolog (Live Subprocess):
          </span>
        </div>
        <CodeBlock code={query.code} title={`Query — ${query.id}`} language="prolog" />
      </div>

      {/* Run Action Button */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Button
          variant="primary"
          size="md"
          isLoading={isLoading}
          onClick={onRunQuery}
          leftIcon={<Play size={15} className="fill-current" />}
          className="shadow-[0_0_15px_rgba(240,185,11,0.25)]"
        >
          {isLoading ? "Mengeksekusi Query..." : "Jalankan Query Live"}
        </Button>

        <span className="text-xs text-[#5e6673] font-mono hidden sm:inline">
          Backend: SWI-Prolog child_process
        </span>
      </div>

      {/* Results Section */}
      {result && (
        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
          <QueryResultDisplay result={result} queryId={query.id} />
        </div>
      )}
    </GlassCard>
  );
}
