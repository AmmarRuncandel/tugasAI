import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "cyan"
  | "success"
  | "danger"
  | "warning"
  | "neutral"
  | "purple";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "neutral",
  icon,
  className,
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: "bg-[rgba(240,185,11,0.12)] text-[#f0b90b] border-[rgba(240,185,11,0.25)]",
    cyan: "bg-[rgba(0,212,255,0.12)] text-[#00d4ff] border-[rgba(0,212,255,0.25)]",
    success: "bg-[rgba(14,203,129,0.12)] text-[#0ecb81] border-[rgba(14,203,129,0.25)]",
    danger: "bg-[rgba(246,70,93,0.15)] text-[#f6465d] border-[rgba(246,70,93,0.3)]",
    warning: "bg-[rgba(247,147,26,0.15)] text-[#f7931a] border-[rgba(247,147,26,0.3)]",
    purple: "bg-[rgba(192,132,252,0.15)] text-[#c084fc] border-[rgba(192,132,252,0.3)]",
    neutral: "bg-[rgba(255,255,255,0.06)] text-[#848e9c] border-[rgba(255,255,255,0.1)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium gap-1",
    md: "px-2.5 py-1 text-xs font-semibold gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
