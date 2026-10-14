"use client";

import React from "react";
import { ArchitectureComponent } from "@/lib/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface ArchitectureModuleCardProps {
  module: ArchitectureComponent;
}

export function ArchitectureModuleCard({ module }: ArchitectureModuleCardProps) {
  return (
    <GlassCard className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
      <div>
        {/* Header: Number and Icon */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-3xl font-black text-[rgba(255,255,255,0.15)]">
            {module.num}
          </span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{
              background: module.bg,
              borderColor: module.color,
              color: module.color,
            }}
          >
            <DynamicIcon name={module.iconName} size={20} />
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#eaecef] mb-2">{module.title}</h3>
        <p className="text-xs sm:text-sm text-[#848e9c] leading-relaxed mb-6">
          {module.desc}
        </p>
      </div>

      {/* Code Snippet in macOS Terminal */}
      <div>
        <div className="text-[11px] font-mono text-[#848e9c] mb-1.5">
          Contoh Implementasi Prolog:
        </div>
        <CodeBlock code={module.code} title={module.title} maxHeight="180px" />
      </div>
    </GlassCard>
  );
}
