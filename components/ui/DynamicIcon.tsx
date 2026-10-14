"use client";

import React from "react";
import {
  Cable,
  Unplug,
  WifiLow,
  Gauge,
  AlertTriangle,
  Binary,
  CheckCircle2,
  XCircle,
  CheckCircle,
  GlobeX,
  Globe,
  SearchX,
  Cpu,
  WifiOff,
  Layers,
  ServerCrash,
  Globe2,
  RadioTower,
  HardDrive,
  Variable,
  Combine,
  GitFork,
  ListFilter,
  Database,
  DownloadCloud,
  Lightbulb,
  Zap,
  FileCode,
  Sparkles,
  Palette,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Cable,
  Unplug,
  WifiLow,
  Gauge,
  AlertTriangle,
  Binary,
  CheckCircle2,
  XCircle,
  CheckCircle,
  GlobeX,
  Globe,
  SearchX,
  Cpu,
  WifiOff,
  Layers,
  ServerCrash,
  Globe2,
  RadioTower,
  HardDrive,
  Variable,
  Combine,
  GitFork,
  ListFilter,
  Database,
  DownloadCloud,
  Lightbulb,
  Zap,
  FileCode,
  Sparkles,
  Palette,
  HelpCircle,
};

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  className?: string;
}

export function DynamicIcon({ name, size = 18, className = "", ...props }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent size={size} className={className} {...props} />;
}
