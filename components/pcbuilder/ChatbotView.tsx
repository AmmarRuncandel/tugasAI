"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { QUICK_PROMPTS } from "@/lib/constants";
import { BuildResultCard } from "@/components/pcbuilder/BuildResultCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Cpu,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export function ChatbotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "Halo! Saya PCExpert AI, konsultan perakitan komputer cerdas berbasis SWI-Prolog. Saya siap membantu merekomendasikan rakitan PC optimal yang 100% kompatibel secara logika fisika hardware, atau mengecek kecocokan komponen yang ingin kamu beli. Apa kebutuhan komputasi atau budget kamu hari ini?",
      timestamp: "Baru saja",
      quickReplies: QUICK_PROMPTS,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
          text: `Berdasarkan penalaran logika deduktif SWI-Prolog, ini adalah konfigurasi rakitan paling seimbang dan 100% kompatibel untuk kebutuhan kamu:`,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          recommendation: data.recommendation,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.message || "Maaf, sistem tidak menemukan kombinasi aturan yang cocok. Coba pilih salah satu rekomendasi cepat di bawah.",
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          quickReplies: QUICK_PROMPTS,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Gagal berkomunikasi dengan mesin SWI-Prolog. Pastikan backend server aktif.",
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
        text: "Sesi konsultasi telah direset. Mau rakit PC untuk kebutuhan apa hari ini?",
        timestamp: "Baru saja",
        quickReplies: QUICK_PROMPTS,
      },
    ]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[750px] bg-[#12151a]/95 border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {/* Top Bar Chat */}
      <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#161a22] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f0b90b]/20 to-[#00d4ff]/20 border border-[rgba(240,185,11,0.3)] flex items-center justify-center text-[#f0b90b] shadow-[0_0_15px_rgba(240,185,11,0.15)]">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#eaecef]">PCExpert AI Assistant</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#0ecb81]/15 text-[#0ecb81] text-[10px] font-semibold border border-[#0ecb81]/30">
                Prolog Powered
              </span>
            </div>
            <p className="text-xs text-[#848e9c]">
              Konsultan Logika Kompatibilitas & Rekomendasi Hardware
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#848e9c] hover:text-[#eaecef] hover:bg-[#1f242e] border border-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
          title="Reset Percakapan"
        >
          <RotateCcw size={13} />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
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

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] space-y-3 ${
                  m.sender === "user" ? "items-end text-right" : "items-start text-left"
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white rounded-tr-none shadow-md"
                      : "bg-[#181c24] text-[#eaecef] border border-[rgba(255,255,255,0.08)] rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>

                {/* Build Recommendation Card */}
                {m.recommendation && (
                  <div className="w-full mt-3">
                    <BuildResultCard build={m.recommendation} />
                  </div>
                )}

                {/* Quick Replies */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {m.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qr.value)}
                        className="px-3 py-1.5 rounded-full bg-[#181d26] hover:bg-[#232936] text-[#f0b90b] hover:text-white border border-[rgba(240,185,11,0.25)] text-xs font-medium transition-all shadow-sm cursor-pointer"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="block text-[10px] text-[#5e6673] px-1">
                  {m.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-xs text-[#848e9c]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#f0b90b]/15 border border-[#f0b90b]/30 flex items-center justify-center text-[#f0b90b]">
              <Cpu size={15} className="animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-[#181c24] border border-[rgba(255,255,255,0.08)] text-xs text-[#848e9c] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#f0b90b] animate-ping" />
              <span>SWI-Prolog sedang menalar dan memvalidasi aturan kompatibilitas...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar */}
      <div className="p-4 bg-[#161a22] border-t border-[rgba(255,255,255,0.08)] space-y-2">
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
            placeholder="Tanyakan rakitan PC (contoh: 'Rakit PC 10 juta buat game Valorant', 'PC 20 juta')..."
            className="flex-1 bg-[#0e1116] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#eaecef] placeholder-[#5e6673] focus:outline-none focus:border-[#f0b90b] transition-colors"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!input.trim() || loading}
            className="h-11 px-5 text-xs sm:text-sm font-bold shrink-0"
            rightIcon={<Send size={15} />}
          >
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
}
