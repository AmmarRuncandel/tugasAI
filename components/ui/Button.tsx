"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-[#f0b90b] text-[#0b0e11] font-semibold hover:bg-[#f5c842] shadow-[0_0_16px_rgba(240,185,11,0.25)] border-transparent",
    secondary:
      "bg-[#2b3139] text-[#eaecef] font-medium hover:bg-[#363d47] border-[rgba(255,255,255,0.08)]",
    outline:
      "bg-transparent text-[#eaecef] font-medium border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[#f0b90b]",
    ghost:
      "bg-transparent text-[#848e9c] font-medium hover:text-[#eaecef] hover:bg-[rgba(255,255,255,0.06)] border-transparent",
    danger:
      "bg-[rgba(246,70,93,0.15)] text-[#f6465d] border-[rgba(246,70,93,0.3)] hover:bg-[rgba(246,70,93,0.25)]",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-base rounded-xl gap-2.5 font-semibold",
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center justify-center border transition-all cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin shrink-0" size={size === "sm" ? 14 : 18} />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
}
