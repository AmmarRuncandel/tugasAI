"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Terminal, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-[rgba(255,255,255,0.08)] bg-[#0b0e11] text-[#848e9c] text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group select-none">
              <div className="w-7 h-7 rounded-md bg-[#14171c] border border-[rgba(240,185,11,0.5)] flex items-center justify-center shadow-[0_0_12px_rgba(240,185,11,0.2)] group-hover:border-[#f0b90b] group-hover:scale-105 transition-all">
                <span className="font-mono font-black text-[10px] text-[#f0b90b]">PC</span>
              </div>
              <div className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight text-[#eaecef]">
                <span className="text-[#f0b90b]">PCExpert</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(240,185,11,0.15)] text-[#f0b90b] border border-[rgba(240,185,11,0.3)]">
                  AI
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm text-[#848e9c]">
              Sistem Pakar Konsultan Perakitan PC & Kompatibilitas Hardware berbasis representasi logika,
              aturan produksi (IF-THEN), dan penalaran Constraint Satisfaction menggunakan SWI-Prolog.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#5e6673]">
              <GraduationCap size={14} className="text-[#f0b90b]" />
              <span>Universitas Siliwangi • Program Studi Informatika • AI Course</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#eaecef]">
              Navigasi Halaman
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-[#f0b90b] transition-colors flex items-center gap-1">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/diagnose" className="hover:text-[#f0b90b] transition-colors flex items-center gap-1">
                  Konsultasi & Cek PC
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="hover:text-[#f0b90b] transition-colors flex items-center gap-1">
                  KB Explorer
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#f0b90b] transition-colors flex items-center gap-1">
                  Arsitektur & Tentang Sistem
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#eaecef]">
              Spesifikasi Proyek
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px] text-[#848e9c]">
              <li className="flex items-center gap-1.5">
                <Terminal size={12} className="text-[#00d4ff]" />
                <span>Engine: SWI-Prolog 9.x / 10.x</span>
              </li>
              <li>Metode: Constraint Logic & Rules</li>
              <li>Modul: Chatbot & Compatibility Checker</li>
              <li>Knowledge Base: pakar_pc.pl</li>
              <li className="text-[#f0b90b]">Dosen: Dr. Aradea, S.T., M.T.</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5e6673]">
          <div>
            © 2026 212 PCExpert AI. Proyek Tugas Besar Kecerdasan Buatan.
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] text-[#848e9c]">
              Kelompok 3 Mahasiswa
            </span>
            <span className="text-[#0ecb81]">All Systems Operational</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
