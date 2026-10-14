"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Database } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-radial from-[#1e2329]/40 via-[#0b0e11] to-[#0b0e11]">
      {/* Background ambient glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#f0b90b]/10 to-[#00d4ff]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e2329]/80 border border-[rgba(240,185,11,0.25)] text-[#f0b90b] text-xs font-semibold mb-8 shadow-[0_0_20px_rgba(240,185,11,0.15)]"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span>Tugas Besar Kecerdasan Buatan • Universitas Siliwangi</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#eaecef] max-w-4xl mx-auto leading-[1.15]"
        >
          Sistem Pakar Diagnosis{" "}
          <span className="bg-gradient-to-r from-[#f0b90b] via-[#f5c842] to-[#00d4ff] bg-clip-text text-transparent">
            Gangguan Jaringan
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#848e9c] max-w-2xl mx-auto leading-relaxed"
        >
          Diagnosa 7 jenis kerusakan jaringan komputer secara otomatis dan transparan
          menggunakan representasi logika SWI-Prolog dan penalaran{" "}
          <strong className="text-[#eaecef] font-medium">Backward-Chaining</strong>.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/diagnose">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              className="text-base font-bold shadow-[0_0_25px_rgba(240,185,11,0.35)]"
            >
              Mulai Diagnosis Interaktif
            </Button>
          </Link>

          <Link href="/explorer">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Database size={18} className="text-[#00d4ff]" />}
            >
              Jalankan 5 Query KB
            </Button>
          </Link>
        </motion.div>

        {/* Highlight Stats Badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-8 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          <div className="p-3 rounded-xl bg-[#161a1f]/60 border border-[rgba(255,255,255,0.06)]">
            <div className="text-xl md:text-2xl font-bold font-mono text-[#f0b90b]">7 Kasus</div>
            <div className="text-xs text-[#848e9c] mt-0.5">Gangguan Jaringan</div>
          </div>
          <div className="p-3 rounded-xl bg-[#161a1f]/60 border border-[rgba(255,255,255,0.06)]">
            <div className="text-xl md:text-2xl font-bold font-mono text-[#00d4ff]">13 Fakta</div>
            <div className="text-xs text-[#848e9c] mt-0.5">Gejala Terstandar</div>
          </div>
          <div className="p-3 rounded-xl bg-[#161a1f]/60 border border-[rgba(255,255,255,0.06)]">
            <div className="text-xl md:text-2xl font-bold font-mono text-[#0ecb81]">100% Native</div>
            <div className="text-xs text-[#848e9c] mt-0.5">SWI-Prolog Engine</div>
          </div>
          <div className="p-3 rounded-xl bg-[#161a1f]/60 border border-[rgba(255,255,255,0.06)]">
            <div className="text-xl md:text-2xl font-bold font-mono text-[#f7931a]">Explainable</div>
            <div className="text-xs text-[#848e9c] mt-0.5">Justifikasi Penalaran</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
