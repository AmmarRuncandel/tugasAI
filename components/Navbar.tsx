"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Activity,
  Database,
  Info,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/diagnose", label: "Mulai Diagnosis", icon: Activity },
  { href: "/explorer", label: "KB Explorer", icon: Database },
  { href: "/about", label: "Tentang Sistem", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b0e11]/85 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#161a1f] border border-[rgba(240,185,11,0.4)] flex items-center justify-center font-mono font-black text-xs text-[#f0b90b] shadow-[0_0_12px_rgba(240,185,11,0.15)] group-hover:border-[#f0b90b] group-hover:shadow-[0_0_16px_rgba(240,185,11,0.3)] transition-all">
            212
          </div>
          <div className="flex items-center gap-1.5 font-extrabold text-base tracking-tight text-[#eaecef]">
            <span>212</span>
            <span className="text-[#f0b90b]">NetExpert</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(240,185,11,0.15)] text-[#f0b90b] border border-[rgba(240,185,11,0.3)] ml-0.5">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#161a1f]/70 p-1 rounded-full border border-[rgba(255,255,255,0.06)]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 transition-colors ${
                  isActive ? "text-[#eaecef]" : "text-[#848e9c] hover:text-[#eaecef]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#2b3139] rounded-full border border-[rgba(255,255,255,0.1)] shadow-inner"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon size={14} className={isActive ? "text-[#f0b90b]" : "text-[#848e9c]"} />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Status indicator + Action button */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <StatusIndicator />
          </div>

          <Link href="/diagnose" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight size={13} />}
            >
              Diagnosa
            </Button>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#848e9c] hover:text-[#eaecef] hover:bg-[#1e2329] border border-[rgba(255,255,255,0.08)] cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[rgba(255,255,255,0.08)] bg-[#161a1f] px-4 py-4 space-y-2"
          >
            <div className="pb-2">
              <StatusIndicator className="w-full justify-center" />
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#2b3139] text-[#f0b90b] border border-[rgba(240,185,11,0.2)]"
                      : "text-[#848e9c] hover:text-[#eaecef] hover:bg-[#1e2329]"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link href="/diagnose" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <Button variant="primary" size="md" className="w-full">
                  Mulai Diagnosis Sekarang
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
