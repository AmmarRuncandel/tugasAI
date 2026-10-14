"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  className?: string;
  maxHeight?: number | string;
}

export function CodeBlock({
  code,
  title = "Prolog Console",
  language = "prolog",
  className,
  maxHeight = "360px",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#14171c] overflow-hidden shadow-2xl",
        className
      )}
    >
      {/* macOS Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a1f26] border-b border-[rgba(255,255,255,0.06)] select-none">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="text-xs font-mono text-[#848e9c] ml-2">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#5e6673] px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-[#848e9c] hover:text-[#eaecef] transition-colors p-1 rounded hover:bg-[rgba(255,255,255,0.06)] cursor-pointer"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#0ecb81]" />
                <span className="text-[11px] text-[#0ecb81]">Tersalin</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="text-[11px]">Salin</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div
        className="p-4 font-mono text-xs md:text-sm text-[#eaecef] overflow-x-auto leading-relaxed"
        style={{ maxHeight, overflowY: "auto" }}
      >
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}
