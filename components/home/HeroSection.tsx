"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Database, MessageSquare, Cpu, GitBranch, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STATS = [
  {
    value: "946",
    label: "Komponen Terdaftar",
    sublabel: "CPU, GPU, RAM, SSD, PSU, Casing",
    color: "#f0b90b",
    icon: Cpu,
  },
  {
    value: "100%",
    label: "Verifikasi Logika",
    sublabel: "Bebas bottleneck & konflik",
    color: "#00d4ff",
    icon: GitBranch,
  },
  {
    value: "SWI",
    label: "Prolog Engine",
    sublabel: "Mesin deduksi logika formal",
    color: "#0ecb81",
    icon: Brain,
  },
  {
    value: "4",
    label: "Aturan Kompatibilitas",
    sublabel: "Socket, DDR, PSU Watt, Form Factor",
    color: "#f7931a",
    icon: Database,
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-radial from-[#1e2329]/40 via-[#0b0e11] to-[#0b0e11]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#f0b90b]/8 to-[#00d4ff]/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[200px] bg-[#0ecb81]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e2329]/80 border border-[rgba(240,185,11,0.25)] text-[#f0b90b] text-xs font-semibold mb-8 shadow-[0_0_20px_rgba(240,185,11,0.15)]"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span>Tugas Besar Kecerdasan Buatan • Universitas Siliwangi</span>
        </motion.div>

        {/* Main Heading — wider max-w for breathing room */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#eaecef] max-w-5xl mx-auto leading-[1.12]"
        >
          Sistem Pakar Konsultan{" "}
          <span className="text-[#f0b90b]">
            Perakitan PC &amp; Kompatibilitas
          </span>
        </motion.h1>

        {/* Subtitle — wider max-w-3xl for less cramped look */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#848e9c] max-w-3xl mx-auto leading-relaxed"
        >
          Rekomendasi rakitan PC cerdas dan validasi kompatibilitas hardware secara otomatis
          menggunakan representasi logika SWI-Prolog dan penalaran{" "}
          <strong className="text-[#eaecef] font-semibold">Constraint Satisfaction &amp; Rules</strong>.
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
              rightIcon={<MessageSquare size={16} />}
              className="text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(240,185,11,0.35)]"
            >
              Konsultasi AI Chatbot
            </Button>
          </Link>

          <Link href="/explorer">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Database size={16} />}
              className="text-sm sm:text-base font-semibold"
            >
              KB Explorer
            </Button>
          </Link>
        </motion.div>


      </div>
    </section>
  );
}
