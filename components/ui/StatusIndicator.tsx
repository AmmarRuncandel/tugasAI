"use client";

import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusIndicator({ className }: { className?: string }) {
  const [status, setStatus] = useState<"checking" | "connected" | "cloud" | "error">("checking");

  useEffect(() => {
    let isMounted = true;
    fetch("/api/diagnose")
      .then((r) => r.json())
      .then((d) => {
        if (isMounted) {
          if (d.status === "connected") {
            setStatus(d.isNative ? "connected" : "cloud");
          } else {
            setStatus("error");
          }
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
      text: "SWI-Prolog Online (Native)",
      dotColor: "bg-[#0ecb81]",
      glowColor: "rgba(14,203,129,0.4)",
      textColor: "text-[#0ecb81]",
    },
    cloud: {
      text: "Prolog Cloud Engine",
      dotColor: "bg-[#00d4ff]",
      glowColor: "rgba(0,212,255,0.4)",
      textColor: "text-[#00d4ff]",
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
      title={
        status === "connected"
          ? "SWI-Prolog Native Subprocess terdeteksi di sistem"
          : status === "cloud"
          ? "Mesin Inferensi Prolog Cloud Engine aktif (Akses Lancar Tanpa Instalasi Lokal)"
          : undefined
      }
    >
      <Terminal size={13} className={status === "cloud" ? "text-[#00d4ff]" : "text-[#848e9c]"} />
      <span className="relative flex h-2 w-2">
        {(status === "connected" || status === "cloud") && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              curr.dotColor
            )}
          />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", curr.dotColor)} />
      </span>
      <span className={cn("text-xs font-mono font-medium", curr.textColor)}>
        {curr.text}
      </span>
    </div>
  );
}
