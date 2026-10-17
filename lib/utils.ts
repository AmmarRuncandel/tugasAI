import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names safely with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Maps OSI layer key from Prolog to human-readable label
 */
export function formatOSILayer(layer: string): string {
  const map: Record<string, string> = {
    physical_layer: "Physical Layer (L1)",
    data_link_layer: "Data Link Layer (L2)",
    network_layer: "Network Layer (L3)",
    application_layer: "Application Layer (L7)",
  };
  return map[layer] || layer;
}

/**
 * Return CSS color or theme variable for OSI layer
 */
export function getOSILayerColor(layer: string): { text: string; bg: string; border: string } {
  switch (layer) {
    case "physical_layer":
      return {
        text: "#ff7b72",
        bg: "rgba(255, 123, 114, 0.12)",
        border: "rgba(255, 123, 114, 0.25)",
      };
    case "data_link_layer":
      return {
        text: "var(--accent-orange, #f7931a)",
        bg: "rgba(247, 147, 26, 0.12)",
        border: "rgba(247, 147, 26, 0.25)",
      };
    case "network_layer":
      return {
        text: "var(--accent-primary, #f0b90b)",
        bg: "rgba(240, 185, 11, 0.12)",
        border: "rgba(240, 185, 11, 0.25)",
      };
    case "application_layer":
      return {
        text: "var(--accent-cyan, #00d4ff)",
        bg: "rgba(0, 212, 255, 0.12)",
        border: "rgba(0, 212, 255, 0.25)",
      };
    default:
      return {
        text: "var(--text-secondary, #848e9c)",
        bg: "rgba(255, 255, 255, 0.06)",
        border: "rgba(255, 255, 255, 0.1)",
      };
  }
}

/**
 * Return formatting for severity level
 */
export function formatSeverity(sev: string): { label: string; text: string; bg: string; border: string } {
  switch (sev?.toLowerCase()) {
    case "tinggi":
      return {
        label: "Tinggi (Critical)",
        text: "#f6465d",
        bg: "rgba(246, 70, 93, 0.15)",
        border: "rgba(246, 70, 93, 0.3)",
      };
    case "sedang":
      return {
        label: "Sedang (Moderate)",
        text: "#f7931a",
        bg: "rgba(247, 147, 26, 0.15)",
        border: "rgba(247, 147, 26, 0.3)",
      };
    case "rendah":
      return {
        label: "Rendah (Low)",
        text: "#0ecb81",
        bg: "rgba(14, 203, 129, 0.15)",
        border: "rgba(14, 203, 129, 0.3)",
      };
    default:
      return {
        label: sev || "Informasi",
        text: "var(--text-secondary)",
        bg: "rgba(255, 255, 255, 0.08)",
        border: "rgba(255, 255, 255, 0.12)",
      };
  }
}

/**
 * Format angka ke format mata uang Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

