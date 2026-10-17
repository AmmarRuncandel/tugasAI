export type ComponentCategory =
  | "cpu"
  | "motherboard"
  | "ram"
  | "gpu"
  | "psu"
  | "storage"
  | "casing";

export type BuildTier = "entry" | "mid" | "high" | "flagship";

export interface PCComponent {
  id: string;
  nama: string;
  kategori: ComponentCategory;
  brand: string;
  harga: number;
  spesifikasi: string;
  iconName: string;
}

export interface BuildRecommendation {
  kebutuhan: string;
  labelKebutuhan: string;
  cpu: string;
  namaCpu: string;
  mobo: string;
  namaMobo: string;
  ram: string;
  namaRam: string;
  gpu: string;
  namaGpu: string;
  psu: string;
  namaPsu: string;
  storage: string;
  namaStorage: string;
  casing: string;
  namaCasing: string;
  totalHarga: number;
  justifikasi: string;
}

export interface CompatibilityAnalysis {
  status: "kompatibel" | "tidak_kompatibel";
  totalHarga: number;
  alasan: string[];
}

export interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  recommendation?: BuildRecommendation;
  compatibility?: CompatibilityAnalysis;
  quickReplies?: { label: string; value: string }[];
}

export interface QueryResult {
  success: boolean;
  description: string;
  items: string[][];
  rawOutput: string;
  error?: string;
}

export interface KBQueryItem {
  id: string;
  label: string;
  badge: string;
  iconName: string;
  color: string;
  code: string;
  desc: string;
}

export interface ArchitectureComponent {
  num: string;
  title: string;
  iconName: string;
  color: string;
  bg: string;
  desc: string;
  code: string;
}

export interface TeamMember {
  nama: string;
  nim: string;
  peran: string;
  avatarColor: string;
}
