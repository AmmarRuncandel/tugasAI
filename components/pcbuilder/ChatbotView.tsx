"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { BuildResultCard } from "@/components/pcbuilder/BuildResultCard";
import { Button } from "@/components/ui/Button";
import {
  CHAT_SUGGESTIONS,
  CATEGORY_TABS,
  ChatSuggestion,
} from "@/lib/chat_knowledge";
import {
  Send,
  Bot,
  User,
  Cpu,
  RotateCcw,
  Database,
  Gamepad2,
  Zap,
  Monitor,
  Briefcase,
  Film,
  Crown,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ZapOff,
  Layers,
  HardDrive,
  Gauge,
  Flame,
  Box,
  HardDriveDownload,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Binary,
  Code2,
  Calculator,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  TrendingDown,
  Sliders,
  Info,
} from "lucide-react";

// Helper renderer untuk icon suggestion
function renderSuggestionIcon(name: string) {
  const iconProps = { size: 12 };
  switch (name) {
    case "Gamepad2": return <Gamepad2 {...iconProps} />;
    case "Briefcase": return <Briefcase {...iconProps} />;
    case "Monitor": return <Monitor {...iconProps} />;
    case "Film": return <Film {...iconProps} />;
    case "Zap": return <Zap {...iconProps} />;
    case "Crown": return <Crown {...iconProps} />;
    case "TrendingDown": return <TrendingDown {...iconProps} />;
    case "Sliders": return <Sliders {...iconProps} />;
    case "AlertTriangle": return <AlertTriangle {...iconProps} />;
    case "ZapOff": return <ZapOff {...iconProps} />;
    case "Layers": return <Layers {...iconProps} />;
    case "HardDrive": return <HardDrive {...iconProps} />;
    case "Cpu": return <Cpu {...iconProps} />;
    case "Gauge": return <Gauge {...iconProps} />;
    case "Flame": return <Flame {...iconProps} />;
    case "Box": return <Box {...iconProps} />;
    case "HardDriveDownload": return <HardDriveDownload {...iconProps} />;
    case "ArrowUpRight": return <ArrowUpRight {...iconProps} />;
    case "Sparkles": return <Sparkles {...iconProps} />;
    case "Search": return <Search {...iconProps} />;
    case "Database": return <Database {...iconProps} />;
    case "Binary": return <Binary {...iconProps} />;
    case "Code2": return <Code2 {...iconProps} />;
    case "Calculator": return <Calculator {...iconProps} />;
    case "HelpCircle": return <HelpCircle {...iconProps} />;
    case "FileSpreadsheet": return <FileSpreadsheet {...iconProps} />;
    case "CheckCircle2": return <CheckCircle2 {...iconProps} />;
    case "Wrench": return <Wrench {...iconProps} />;
    case "ShieldCheck": return <ShieldCheck {...iconProps} />;
    default: return <Cpu {...iconProps} />;
  }
}

// Initial default quick prompts for new session
const INITIAL_PROMPTS = [
  { label: "Rakit PC Gaming 10-12 Juta", value: "rekomendasi esports_gaming" },
  { label: "Apakah 2 RAM Beda Bikin Bottleneck?", value: "apakah ram beda speed atau beda tipe menyebabkan bottleneck?" },
  { label: "Apakah PSU 500W Aman untuk RTX 3070?", value: "apakah psu 500w cukup untuk rtx 3070 atau 4060?" },
  { label: "Rakit PC 1440p AM5 DDR5", value: "rekomendasi aaa_gaming" },
  { label: "Panduan Memilih Budget PC", value: "panduan memilih tier budget rakit pc" },
  { label: "Uji Kompatibilitas Hardware", value: "cek_kompatibilitas" },
];

function renderFormattedMessage(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1 leading-relaxed">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

        const parts = line.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g);
        return (
          <p key={lIdx} className="whitespace-pre-wrap">
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={pIdx} className="font-bold text-[#f0b90b]">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith("`") && part.endsWith("`")) {
                return (
                  <code
                    key={pIdx}
                    className="px-1.5 py-0.5 rounded bg-[#101318] text-[#00d4ff] font-mono text-[11px] border border-[rgba(255,255,255,0.06)]"
                  >
                    {part.slice(1, -1)}
                  </code>
                );
              }
              if (part.startsWith("*") && part.endsWith("*")) {
                return (
                  <em key={pIdx} className="italic text-[#848e9c]">
                    {part.slice(1, -1)}
                  </em>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

export function ChatbotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Halo! Saya PCExpert AI, konsultan perakitan PC & analis masalah hardware cerdas berbasis SWI-Prolog. Saya memuat **946 komponen Kaggle Dataset** dan aturan logika deduktif komputer untuk merekomendasikan rakitan, menganalisis kendala hardware (seperti bottleneck, RAM, daya PSU), hingga memverifikasi kompatibilitas. Apa kebutuhan atau pertanyaan kamu hari ini?",
      timestamp: "Baru saja",
      quickReplies: INITIAL_PROMPTS,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSuggestionMsgId, setExpandedSuggestionMsgId] = useState<string | null>(null);
  const [inChatCategory, setInChatCategory] = useState<string>("all");

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const inChatSuggestions = CHAT_SUGGESTIONS.filter((s) => {
    if (inChatCategory === "all") return true;
    return s.category === inChatCategory;
  });

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await resp.json();

      if (data.success && data.recommendation) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.message || `Berdasarkan penalaran logika deduktif SWI-Prolog, ini adalah konfigurasi rakitan paling seimbang dan 100% kompatibel untuk kebutuhan kamu:`,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          recommendation: data.recommendation,
          quickReplies: data.quickReplies && data.quickReplies.length > 0 ? data.quickReplies : INITIAL_PROMPTS,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.message || "Mohon maaf, model AI dan sistem pakar belum menemukan informasi atau aturan yang cocok untuk permintaan tersebut. Silakan pilih salah satu saran pertanyaan di atas.",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          quickReplies: data.quickReplies && data.quickReplies.length > 0 ? data.quickReplies : INITIAL_PROMPTS,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Mohon maaf, terjadi kendala saat menghubungkan dengan server inferensi SWI-Prolog. Pastikan backend server tetap aktif, lalu silakan coba kirim ulang pertanyaan kamu.",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial-reset",
        sender: "bot",
        text: "Sesi konsultasi telah direset. Mau rakit PC, cek harga komponen, atau konsultasi masalah hardware apa hari ini?",
        timestamp: "Baru saja",
        quickReplies: INITIAL_PROMPTS,
      },
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[780px] bg-[#12151a]/95 border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {/* Top Bar Chat */}
      <div className="px-5 sm:px-6 py-3.5 border-b border-[rgba(255,255,255,0.08)] bg-[#161a22] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f0b90b]/20 to-[#00d4ff]/20 border border-[rgba(240,185,11,0.3)] flex items-center justify-center text-[#f0b90b] shadow-[0_0_15px_rgba(240,185,11,0.15)]">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#eaecef]">PCExpert AI Assistant</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#0ecb81]/15 text-[#0ecb81] text-[10px] font-semibold border border-[#0ecb81]/30">
                SWI-Prolog Engine
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f0b90b]/10 text-[#f0b90b] text-[10px] font-mono border border-[#f0b90b]/20">
                <Database size={10} />
                946 Komponen
              </span>
            </div>
            <p className="text-xs text-[#848e9c]">
              Konsultan Hardware, Analisis Masalah &amp; Rekomendasi Rakitan
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#848e9c] hover:text-[#eaecef] hover:bg-[#1f242e] border border-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
          title="Reset Percakapan"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>
      </div>

      {/* Chat Messages Body with Smooth Entrance Animation */}
      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-start gap-3 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  m.sender === "user"
                    ? "bg-[#00d4ff]/15 border-[#00d4ff]/30 text-[#00d4ff]"
                    : "bg-[#f0b90b]/15 border-[#f0b90b]/30 text-[#f0b90b]"
                }`}
              >
                {m.sender === "user" ? <User size={15} /> : <Bot size={15} />}
              </div>

              {/* Message Bubble Container */}
              <div
                className={`max-w-[88%] space-y-3 ${
                  m.sender === "user" ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white rounded-tr-none shadow-md"
                      : "bg-[#181c24] text-[#eaecef] border border-[rgba(255,255,255,0.08)] rounded-tl-none"
                  }`}
                >
                  {renderFormattedMessage(m.text)}
                </div>

                {/* Build Recommendation Card */}
                {m.recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full mt-3"
                  >
                    <BuildResultCard build={m.recommendation} />
                  </motion.div>
                )}

                {/* Contextual Options / Input Choices / Suggestions */}
                {m.quickReplies && m.quickReplies.length > 0 && (() => {
                  const isInputChoiceGroup = m.quickReplies.some(
                    (qr) => qr.isInputChoice || qr.label.toLowerCase().startsWith("budget ")
                  );
                  const isInitialOrReset = m.id.startsWith("initial");
                  const isExpanded = expandedSuggestionMsgId === m.id;

                  if (isInputChoiceGroup) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full space-y-2 pt-2"
                      >
                        <div className="text-[11px] font-semibold text-[#848e9c] flex items-center gap-1.5 px-0.5">
                          <Sliders size={12} className="text-[#f0b90b]" />
                          <span>Pilih Opsi untuk Melanjutkan:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                          {m.quickReplies.map((qr, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(qr.value)}
                              disabled={loading}
                              className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#181d26] to-[#1e2430] hover:from-[#222938] hover:to-[#2b3548] border border-[rgba(240,185,11,0.25)] hover:border-[#f0b90b] text-left transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_24px_rgba(240,185,11,0.2)] hover:-translate-y-0.5 cursor-pointer w-full"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-[#f0b90b]/15 border border-[#f0b90b]/30 flex items-center justify-center text-[#f0b90b] group-hover:scale-110 group-hover:bg-[#f0b90b] group-hover:text-[#0b0e11] transition-all shrink-0">
                                  <Sparkles size={16} />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-xs sm:text-sm text-[#eaecef] group-hover:text-[#f0b90b] transition-colors leading-snug">
                                    {qr.label}
                                  </div>
                                  {qr.desc && (
                                    <div className="text-[11px] text-[#848e9c] mt-0.5 leading-tight truncate">
                                      {qr.desc}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="w-6 h-6 rounded-md bg-[#12151b] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#848e9c] group-hover:text-[#f0b90b] group-hover:border-[#f0b90b]/50 group-hover:translate-x-0.5 transition-all shrink-0 ml-2">
                                <ArrowRight size={13} />
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className="space-y-3 pt-1 w-full"
                    >
                      {/* Deretan Saran Utama */}
                      <div className="flex flex-wrap gap-2">
                        {m.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(qr.value)}
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181d26] hover:bg-[#232936] text-[#f0b90b] hover:text-white border border-[rgba(240,185,11,0.25)] hover:border-[rgba(240,185,11,0.5)] text-xs font-medium transition-all shadow-sm cursor-pointer"
                          >
                            <span className="shrink-0 opacity-80">
                              <Sparkles size={11} />
                            </span>
                            <span>{qr.label}</span>
                          </button>
                        ))}

                        {/* Toggle Tampilkan Lebih Banyak (35 Saran) di jajaran yang sama */}
                        {isInitialOrReset && (
                          <button
                            onClick={() =>
                              setExpandedSuggestionMsgId((prev) => (prev === m.id ? null : m.id))
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b222c] hover:bg-[#252f3e] text-[#00d4ff] hover:text-white border border-[rgba(0,212,255,0.3)] hover:border-[#00d4ff] text-xs font-semibold transition-all shadow-sm cursor-pointer"
                          >
                            <Sparkles size={11} className="text-[#00d4ff]" />
                            <span>
                              {isExpanded
                                ? "Tampilkan Lebih Sedikit"
                                : "Tampilkan Lebih Banyak (35 Saran)"}
                            </span>
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        )}
                      </div>

                      {/* Panel In-Chat Expandable Suggestions */}
                      {isInitialOrReset && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="p-3.5 rounded-xl bg-[#141820] border border-[rgba(0,212,255,0.2)] space-y-2.5 shadow-md w-full"
                        >
                          {/* Category Filter Selection */}
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            {CATEGORY_TABS.map((cat) => (
                              <button
                                key={cat.id}
                                onClick={() => setInChatCategory(cat.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                                  inChatCategory === cat.id
                                    ? "bg-[#f0b90b] text-[#0b0e11] shadow-[0_0_10px_rgba(240,185,11,0.3)]"
                                    : "bg-[#181d26] text-[#848e9c] hover:text-[#eaecef] hover:bg-[#222936]"
                                }`}
                              >
                                {cat.label} ({cat.count})
                              </button>
                            ))}
                          </div>

                          {/* List saran terfilter di jajaran chat */}
                          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
                            {inChatSuggestions.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => handleSend(s.value)}
                                disabled={loading}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181d26] hover:bg-[#232936] text-[#eaecef] hover:text-[#f0b90b] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(240,185,11,0.4)] text-xs font-medium transition-all shadow-sm cursor-pointer group text-left"
                              >
                                <span className="text-[#f0b90b] opacity-80 group-hover:opacity-100 shrink-0">
                                  {renderSuggestionIcon(s.iconName)}
                                </span>
                                <span>{s.label}</span>
                                {s.badge && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#f0b90b]/15 text-[#f0b90b] font-bold border border-[#f0b90b]/30">
                                    {s.badge}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })()}

                <span className="block text-[10px] text-[#5e6673] px-1">
                  {m.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading / Reasoning State Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 text-xs text-[#848e9c]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#f0b90b]/15 border border-[#f0b90b]/30 flex items-center justify-center text-[#f0b90b] shadow-[0_0_12px_rgba(240,185,11,0.15)]">
              <Cpu size={15} className="animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#181c24] border border-[rgba(255,255,255,0.08)] text-xs text-[#848e9c] flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#f0b90b] animate-ping" />
              <span className="text-[#eaecef] font-medium">SWI-Prolog sedang menalar dan mengevaluasi aturan logika...</span>
            </div>
          </motion.div>
        )}

        {/* Notes / Disclaimer layaknya Gemini di bagian bawah isi percakapan */}
        <div className="pt-3 pb-1">
          <div className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14171f]/80 border border-[rgba(255,255,255,0.05)] text-center max-w-xl mx-auto shadow-sm">
            <Info size={13} className="text-[#848e9c] shrink-0" />
            <p className="text-[10px] sm:text-[11px] text-[#848e9c] leading-snug">
              PCExpert AI dapat melakukan kekeliruan atau ketidaktelitian informasi. Pastikan untuk selalu memverifikasi kembali spesifikasi fisik dan harga pasar terkini sebelum membeli komponen.
            </p>
          </div>
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="p-4 bg-[#161a22] border-t border-[rgba(255,255,255,0.08)] space-y-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pertanyaan masalah PC, budget, atau nama komponen..."
            className="flex-1 bg-[#0e1116] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#eaecef] placeholder-[#5e6673] focus:outline-none focus:border-[#f0b90b] transition-colors"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!input.trim() || loading}
            className="h-11 px-5 text-xs sm:text-sm font-bold shrink-0 shadow-[0_0_15px_rgba(240,185,11,0.2)]"
            rightIcon={<Send size={15} />}
          >
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
}
