"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatbotView } from "@/components/pcbuilder/ChatbotView";
import { CompatibilityChecker } from "@/components/pcbuilder/CompatibilityChecker";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

export default function DiagnosePage() {
  const [activeTab, setActiveTab] = useState<"chat" | "checker">("chat");

  return (
    <div className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 bg-[#0b0e11] min-h-screen">
      {/* Header with Smooth Motion */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-8 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a22] border border-[rgba(240,185,11,0.25)] text-[#f0b90b] text-xs font-semibold">
          <Sparkles size={13} />
          <span>Sistem Pakar Konsultan Hardware PC</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#eaecef] tracking-tight">
          Konsultasi &amp; Uji Kompatibilitas PC
        </h1>
        <p className="text-xs sm:text-sm text-[#848e9c] leading-relaxed">
          Didukung oleh mesin inferensi logika <strong>SWI-Prolog</strong> untuk merumuskan konfigurasi hardware seimbang, bebas bottleneck, dan 100% kompatibel.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-[#14171f] border border-[rgba(255,255,255,0.08)] mt-4">
          <button
            onClick={() => setActiveTab("chat")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-[#f0b90b] text-[#0e1116] shadow-[0_0_15px_rgba(240,185,11,0.3)]"
                : "text-[#848e9c] hover:text-[#eaecef]"
            }`}
          >
            <MessageSquare size={14} />
            <span>AI Chatbot Konsultan</span>
          </button>
          <button
            onClick={() => setActiveTab("checker")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "checker"
                ? "bg-[#00d4ff] text-[#0e1116] shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                : "text-[#848e9c] hover:text-[#eaecef]"
            }`}
          >
            <ShieldCheck size={14} />
            <span>Kalkulator Kompatibilitas</span>
          </button>
        </div>
      </motion.div>

      {/* Main Container with AnimatePresence */}
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {activeTab === "chat" ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <ChatbotView />
            </motion.div>
          ) : (
            <motion.div
              key="checker"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <CompatibilityChecker />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
