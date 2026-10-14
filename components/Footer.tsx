import React from "react";
import Link from "next/link";
import { GraduationCap, Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#0b0e11] text-[#848e9c] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#161a1f] border border-[rgba(240,185,11,0.4)] flex items-center justify-center font-mono font-black text-[10px] text-[#f0b90b]">
                212
              </div>
              <span className="font-bold text-sm text-[#eaecef]">
                212 <span className="text-[#f0b90b]">NetExpert</span> AI
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-[#848e9c]">
              Sistem Pakar Diagnosis Gangguan Jaringan Komputer berbasis representasi logika,
              aturan produksi (IF-THEN), dan penalaran Backward-Chaining menggunakan SWI-Prolog.
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
                  Mulai Diagnosis Interaktif
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="hover:text-[#f0b90b] transition-colors flex items-center gap-1">
                  KB Explorer (5 Query Akademik)
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
                <span>Engine: SWI-Prolog 9.x</span>
              </li>
              <li>Metode: Backward-Chaining</li>
              <li>Total Kasus: 7 Gangguan Jaringan</li>
              <li>Jumlah Gejala: 13 Aturan Fakta</li>
              <li className="text-[#f0b90b]">Dosen: Dr. Aradea, S.T., M.T.</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5e6673]">
          <div>
            © 2026 212 NetExpert AI. Proyek Tugas Besar Kecerdasan Buatan.
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.04)] text-[#848e9c]">
              Kelompok 3 Mahasiswa
            </span>
            <span className="text-[#0ecb81]">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
