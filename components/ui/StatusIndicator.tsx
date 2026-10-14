"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusIndicator({ className }: { className?: string }) {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/diagnose")
      .then((r) => r.json())
      .then((d) => {
        if (isMounted) {
          setStatus(d.status === "connected" ? "connected" : "error");
        }
      })
      .catch(() => {
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const config = {
    checking: {
      text: "Memeriksa Prolog...",
      dotColor: "bg-[#f7931a]",
      glowColor: "rgba(247,147,26,0.3)",
      textColor: "text-[#848e9c]",
    },
    connected: {
      text: "SWI-Prolog Online",
      dotColor: "bg-[#0ecb81]",
      glowColor: "rgba(14,203,129,0.4)",
      textColor: "text-[#0ecb81]",
    },
    error: {
      text: "Prolog Offline",
      dotColor: "bg-[#f6465d]",
      glowColor: "rgba(246,70,93,0.4)",
      textColor: "text-[#f6465d]",
    },
  };

  const curr = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2329]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] select-none",
        className
      )}
    >
      <Terminal size={13} className="text-[#848e9c]" />
      <span className="relative flex h-2 w-2">
        {status === "connected" && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ecb81] opacity-75" />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", curr.dotColor)} />
      </span>
      <span className={cn("text-xs font-mono font-medium", curr.textColor)}>
        {curr.text}
      </span>
    </div>
  );
}
