"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  className?: string;
  color?: "yellow" | "cyan" | "green";
}

export function ProgressBar({
  progress,
  label,
  showPercentage = true,
  className,
  color = "yellow",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  const gradientMap = {
    yellow: "from-[#f0b90b] to-[#f5c842]",
    cyan: "from-[#00d4ff] to-[#00a3ff]",
    green: "from-[#0ecb81] to-[#10b981]",
  };

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-medium text-[#848e9c]">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="font-mono text-[#eaecef] font-semibold">{clamped}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-[#14171c] overflow-hidden p-0.5 border border-[rgba(255,255,255,0.06)]">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", gradientMap[color])}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
