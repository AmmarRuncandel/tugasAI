export type OSIlayer =
  | "physical_layer"
  | "data_link_layer"
  | "network_layer"
  | "application_layer";

export type SeverityLevel = "rendah" | "sedang" | "tinggi";

export interface Gejala {
  id: string;
  pertanyaan: string;
  konteks: string;
  category: "Kabel & Port" | "Nirkabel (WiFi)" | "IP & Konfigurasi" | "Konektivitas Ping" | "DNS & Layanan" | "Hardware / Adapter";
  iconName: string;
}

export interface DiagnosisInfo {
  kode: string;
  nama: string;
  layer: OSIlayer;
  keparahan: SeverityLevel;
  solusi: string;
  gejalaSyarat: string[];
  iconName: string;
}

export interface DiagnosisResultData {
  kode: string;
  nama: string;
  layer: string;
  keparahan: string;
  solusi: string;
  gejalaTerpenuhi: string[];
}

export interface DiagnosisApiResponse {
  success: boolean;
  diagnosis?: DiagnosisResultData;
  message?: string;
  error?: string;
  rawOutput?: string;
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
