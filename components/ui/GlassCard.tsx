"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  isHoverable?: boolean;
  glowColor?: "yellow" | "cyan" | "green" | "none";
}

export function GlassCard({
  children,
  className,
  isHoverable = false,
  glowColor = "none",
  ...props
}: GlassCardProps) {
  const glowStyles = {
    yellow: "hover:border-[rgba(240,185,11,0.35)] hover:shadow-[0_8px_30px_rgba(240,185,11,0.1)]",
    cyan: "hover:border-[rgba(0,212,255,0.35)] hover:shadow-[0_8px_30px_rgba(0,212,255,0.1)]",
    green: "hover:border-[rgba(14,203,129,0.35)] hover:shadow-[0_8px_30px_rgba(14,203,129,0.1)]",
    none: "hover:border-[rgba(255,255,255,0.14)]",
  };

  return (
    <motion.div
      whileHover={isHoverable ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "relative rounded-2xl bg-[#1e2329]/80 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all",
        isHoverable && glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
