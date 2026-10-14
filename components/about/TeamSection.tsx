"use client";

import React from "react";
import { TEAM_MEMBERS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";


export function TeamSection() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#0ecb81]">
          Kelompok Mahasiswa
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#eaecef] mt-1">
          Tim Pengembang Tugas Besar AI
        </h2>
        <p className="text-xs text-[#848e9c] mt-2">
          Program Studi Informatika • Fakultas Teknik • Universitas Siliwangi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TEAM_MEMBERS.map((m, idx) => (
          <GlassCard key={idx} isHoverable className="p-6 text-center space-y-3">
            <div
              className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center font-bold text-lg border border-[rgba(255,255,255,0.1)] shadow-lg"
              style={{
                background: `rgba(255,255,255,0.05)`,
                color: m.avatarColor,
              }}
            >
              {["AL", "AS", "ZP"][idx] || m.nama.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#eaecef]">{m.nama}</h3>
              <div className="text-xs font-mono text-[#f0b90b] mt-0.5">{m.nim}</div>
            </div>
            <p className="text-xs text-[#848e9c] leading-relaxed pt-2 border-t border-[rgba(255,255,255,0.06)]">
              {m.peran}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
