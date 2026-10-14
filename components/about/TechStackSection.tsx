"use client";

import React from "react";
import { TECH_STACK } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { DynamicIcon } from "@/components/ui/DynamicIcon";

export function TechStackSection() {
  return (
    <div className="space-y-4">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
          Modern Engineering
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#eaecef] mt-1">
          Teknologi & Library Pendukung
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TECH_STACK.map((item) => (
          <GlassCard key={item.name} isHoverable className="p-4 flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-[rgba(255,255,255,0.08)] bg-[#14171c]"
              style={{ color: item.color }}
            >
              <DynamicIcon name={item.iconName} size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-[#eaecef]">{item.name}</div>
              <div className="text-xs text-[#848e9c]">{item.role}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
