"use client";

import React from "react";
import { KB_QUERIES } from "@/lib/constants";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Badge } from "@/components/ui/Badge";
import { ChevronRight } from "lucide-react";

interface QueryCardListProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export function QueryCardList({ activeId, onSelect }: QueryCardListProps) {
  return (
    <div className="space-y-2.5">
      {KB_QUERIES.map((q) => {
        const isActive = activeId === q.id;

        return (
          <button
            key={q.id}
            onClick={() => onSelect(q.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              isActive
                ? "bg-[#1e2329] border-[#f0b90b] shadow-[0_0_15px_rgba(240,185,11,0.15)]"
                : "bg-[#14171c] border-[rgba(255,255,255,0.06)] hover:bg-[#1a1f26] hover:border-[rgba(255,255,255,0.12)]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                  isActive
                    ? "bg-[#f0b90b]/15 border-[#f0b90b]/30 text-[#f0b90b]"
                    : "bg-[#1e2329] border-[rgba(255,255,255,0.06)] text-[#848e9c]"
                }`}
              >
                <DynamicIcon name={q.iconName} size={18} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`text-sm font-bold ${
                      isActive ? "text-[#eaecef]" : "text-[#848e9c]"
                    }`}
                  >
                    {q.label}
                  </h3>
                </div>
                <Badge variant={isActive ? "primary" : "neutral"} size="sm">
                  {q.badge}
                </Badge>
              </div>
            </div>

            <ChevronRight
              size={16}
              className={`shrink-0 transition-transform ${
                isActive ? "text-[#f0b90b] translate-x-1" : "text-[#5e6673]"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
