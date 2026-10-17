"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
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
  { href: "/diagnose", label: "Konsultasi & Cek PC", icon: Activity },
  { href: "/explorer", label: "KB Explorer", icon: Database },
  { href: "/about", label: "Tentang Sistem", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Inactivity auto-hide timer ref
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll direction detection
  const { scrollY } = useScroll();

  // Function to start inactivity auto-hide timer (e.g., 3.2s)
  const startIdleHideTimer = (currentScrollY: number) => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Only auto-hide on idle if scrolled down past top area (> 70px) and not hovered
    if (currentScrollY > 70 && !mobileMenuOpen && !isHovered) {
      idleTimerRef.current = setTimeout(() => {
        setHidden(true);
      }, 1500);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Do not auto-hide when mobile drawer is open or user is hovering over navbar
    if (mobileMenuOpen || isHovered) return;

    if (latest <= 60) {
      // Near top of page: always show navbar and clear any hide timer
      setHidden(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      return;
    }

    if (diff > 6) {
      // Scrolling down -> hide immediately
      setHidden(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    } else if (diff < -3) {
      // Scrolling up even slightly -> show immediately and start idle timer
      setHidden(false);
      startIdleHideTimer(latest);
    }
  });

  // Clear timer on component unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHidden(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startIdleHideTimer(scrollY.get());
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -95, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto rounded-full bg-[#161a1f]/85 backdrop-blur-2xl border border-[rgba(255,255,255,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.55),0_0_20px_rgba(240,185,11,0.05)] px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6 pointer-events-auto transition-all">
        {/* Brand Logo with Square Badge */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0 select-none">
          <div className="w-8 h-8 rounded-md bg-[#14171c] border border-[rgba(240,185,11,0.5)] flex items-center justify-center font-mono font-black text-xs text-[#f0b90b] shadow-[0_0_12px_rgba(240,185,11,0.2)] group-hover:border-[#f0b90b] group-hover:scale-105 transition-all">
            212
          </div>
          <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base tracking-tight text-[#eaecef]">
            <span>212</span>
            <span className="text-[#f0b90b]">PCExpert</span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(240,185,11,0.15)] text-[#f0b90b] border border-[rgba(240,185,11,0.3)] ml-0.5">
              AI
            </span>
          </div>
        </Link>

        {/* Center Nav Links with Floating Active Indicator */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? "text-[#f0b90b]"
                    : "text-[#848e9c] hover:text-[#eaecef]"
                }`}
              >
                <Icon size={14} className={isActive ? "text-[#f0b90b]" : "text-[#848e9c]"} />
                <span>{item.label}</span>

                {/* Glowing bottom bar indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-3 right-3 h-[2.5px] bg-[#f0b90b] rounded-full shadow-[0_0_10px_rgba(240,185,11,0.9)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Status Indicator */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden lg:block">
            <StatusIndicator />
          </div>

          <Link href="/diagnose" className="hidden sm:inline-flex">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight size={13} />}
              className="rounded-full shadow-[0_0_14px_rgba(240,185,11,0.3)] text-xs font-bold px-4"
            >
              Diagnosa Sekarang
            </Button>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#848e9c] hover:text-[#eaecef] hover:bg-[#1e2329] border border-[rgba(255,255,255,0.08)] cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer Card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#161a1f]/95 backdrop-blur-2xl p-4 shadow-2xl space-y-2 pointer-events-auto"
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#2b3139] text-[#f0b90b] border border-[rgba(240,185,11,0.25)]"
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
                <Button variant="primary" size="md" className="w-full rounded-xl font-bold">
                  Mulai Diagnosis Sekarang
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
