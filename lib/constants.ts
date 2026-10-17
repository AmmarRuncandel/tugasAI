import {
  PCComponent,
  KBQueryItem,
  ArchitectureComponent,
  TeamMember,
} from "./types";
import extractedComponents from "./extracted_components.json";

export const ALL_COMPONENTS: PCComponent[] = extractedComponents as PCComponent[];

export const BUILD_PRESETS = [
  {
    id: "office_coding",
    nama: "Office, Pelajar & Coding",
    badge: "Budget Ringan",
    kisaran: "Rp 5 - 8 Juta",
    deskripsi: "Sistem hemat daya, responsif untuk multitasking dokumen, web browsing, dan pemrograman santai.",
    warna: "#00d4ff",
  },
  {
    id: "esports_gaming",
    nama: "Esports Gaming 1080p High FPS",
    badge: "Paling Populer",
    kisaran: "Rp 9 - 13 Juta",
    deskripsi: "Sangat optimal untuk Valorant, CS2, Dota 2, Apex Legends, dan game AAA 1080p setting medium-high.",
    warna: "#f0b90b",
  },
  {
    id: "intel_arc_edition",
    nama: "Intel Arc Creator & Gaming Edition",
    badge: "Special Intel Arc",
    kisaran: "Rp 10 - 12 Juta",
    deskripsi: "Menggunakan GPU Intel Arc A750 8GB dengan dual AV1 hardware encoder & XMX AI cores, siap libas game 1080p & editing video.",
    warna: "#38bdf8",
  },
  {
    id: "aaa_gaming",
    nama: "AAA Gaming 1440p & Streaming",
    badge: "Next-Gen AM5",
    kisaran: "Rp 15 - 20 Juta",
    deskripsi: "Platform modern AM5 & DDR5, siap libas game berat Cyberpunk & Black Myth Wukong 1440p dengan DLSS 3.",
    warna: "#0ecb81",
  },
  {
    id: "content_creation",
    nama: "Content Creation & 4K Editing",
    badge: "Workstation Pro",
    kisaran: "Rp 22 - 30 Juta",
    deskripsi: "16-core CPU untuk rendering Premiere Pro 4K, After Effects, dan akselerasi CUDA 3D Blender.",
    warna: "#f7931a",
  },
  {
    id: "enthusiast_flagship",
    nama: "Ultimate Gaming Flagship",
    badge: "Tanpa Kompromi",
    kisaran: "> Rp 35 Juta",
    deskripsi: "Kombinasi CPU gaming terbaik dunia (7800X3D) dan GPU 4K RTX 4080 SUPER 16GB.",
    warna: "#c084fc",
  },
];

export const QUICK_PROMPTS = [
  { label: "🎮 Rakit PC Gaming 10 Juta", value: "rekomendasi esports_gaming" },
  { label: "🔵 Rakit PC Intel Arc A750 (~10 Juta)", value: "rekomendasi intel_arc_edition" },
  { label: "🚀 Rakit PC 1440p AM5 (15-20 Juta)", value: "rekomendasi aaa_gaming" },
  { label: "💼 PC Coding & Office Murah", value: "rekomendasi office_coding" },
  { label: "🎬 PC Editing Video 4K & Render", value: "rekomendasi content_creation" },
  { label: "👑 PC Sultan Flagship 4K", value: "rekomendasi enthusiast_flagship" },
  { label: "🔍 Cek Kompatibilitas Hardware", value: "cek_kompatibilitas" },
];

export const KB_QUERIES: KBQueryItem[] = [
  {
    id: "ontology",
    label: "Query 1 — Ekstraksi Variabel Hardware",
    badge: "Slide 31-51",
    iconName: "Variable",
    color: "var(--accent-cyan)",
    code: "?- cpu(Kode, Nama, _, am5, _, Harga, _).",
    desc: "Mengekstraksi seluruh prosesor yang berbasis Socket AM5 generasi terbaru menggunakan unifikasi variabel Prolog.",
  },
  {
    id: "conjunctive",
    label: "Query 2 — Conjunctive Query (Multi-Kondisi AND)",
    badge: "Slide 32-34",
    iconName: "Combine",
    color: "var(--accent-primary)",
    code: "?- gpu(Kode, Nama, nvidia, _, VRAM, Harga, _),\n   VRAM >= 12,\n   Harga =< 12000000.",
    desc: "Menggabungkan beberapa kondisi secara serentak: cari GPU NVIDIA dengan VRAM minimal 12GB AND harga di bawah 12 juta.",
  },
  {
    id: "recursive",
    label: "Query 3 — Rekursi Perhitungan Harga Komponen",
    badge: "Slide 44-46",
    iconName: "GitFork",
    color: "var(--accent-green)",
    code: "?- hitung_total_harga([\n     cpu_ryzen_5_7600x,\n     mobo_b650m_ddr5,\n     ram_g_skill_ddr5_32gb_6000,\n     gpu_nvidia_rtx_4060,\n     psu_psu_650w_bronze,\n     ssd_western_digital_1000gb_nvme,\n     case_lian_li_case_15\n   ], TotalHarga).",
    desc: "Menerapkan rekursi [Head|Tail] untuk menjumlahkan harga seluruh komponen rakitan PC hingga base case list kosong.",
  },
  {
    id: "list",
    label: "Query 4 — Operasi List & Irisan Kompatibilitas",
    badge: "Slide 47-48",
    iconName: "ListFilter",
    color: "var(--accent-orange)",
    code: "?- form_factor_irisan(F, [atx, matx], [matx]).",
    desc: "Mencari irisan (member_both) kesesuaian form factor antara motherboard dengan ukuran casing yang didukung.",
  },
  {
    id: "all_diagnosis",
    label: "Query 5 — Seluruh Ontologi Hardware di KB",
    badge: "Ontologi Lengkap",
    iconName: "Database",
    color: "#c084fc",
    code: "?- cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier).",
    desc: "Menampilkan seluruh 437 prosesor (CPU) dari 946 komponen yang terdaftar di basis pengetahuan logika Prolog.",
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureComponent[] = [
  {
    num: "01",
    title: "Knowledge Acquisition",
    iconName: "DownloadCloud",
    color: "var(--accent-cyan)",
    bg: "rgba(0, 212, 255, 0.12)",
    desc: "Proses perolehan data spesifikasi dan kompatibilitas hardware (Socket CPU, Generasi DDR RAM, Daya Minimum PSU, dan Form Factor). Diekstrak langsung dari 12.797 baris data Kaggle dan dikonversi ke Rupiah (IDR).",
    code: "gpu(gpu_intel_arc_a750, 'Intel Arc A750 8GB GDDR6',\n  intel, 550, 8, 3450000, mid).\ncpu(cpu_ryzen_5_7600x, 'amd Ryzen 5 7600X 4.7 GHz',\n  amd, am5, 65, 4540000, mid).",
  },
  {
    num: "02",
    title: "Knowledge Base",
    iconName: "Database",
    color: "var(--accent-primary)",
    bg: "rgba(240, 185, 11, 0.12)",
    desc: "File pakar_pc.pl bertindak sebagai basis pengetahuan representasi logika. Memuat 946 fakta komponen hardware terverifikasi serta aturan produksi kecocokan fisik berbasis klausa Horn.",
    code: "cocok_cpu_mobo(CPU, Mobo) :-\n  cpu(CPU, _, _, Socket, _, _, _),\n  motherboard(Mobo, _, Socket, _, _, _).",
  },
  {
    num: "03",
    title: "Inference Engine",
    iconName: "Cpu",
    color: "var(--accent-green)",
    bg: "rgba(14, 203, 129, 0.12)",
    desc: "Mesin penalaran SWI-Prolog memproses pembuktian kendala (Constraint Satisfaction) dan Goal-Driven Reasoning. Mencari kombinasi komponen yang terbukti valid tanpa konflik dan memenuhi kriteria budget pengguna.",
    code: "% Prolog membuktikan rakitan valid:\n?- rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing).\nCPU = ryzen_5_7600,\nMobo = b650m_ddr5... % Evaluasi bernilai TRUE",
  },
  {
    num: "04",
    title: "Explanatory Interface",
    iconName: "Lightbulb",
    color: "var(--accent-orange)",
    bg: "rgba(247, 147, 26, 0.12)",
    desc: "Modul penjelas yang menyajikan transparansi justifikasi penalaran sistem pakar. Memberikan penjelasan mengapa komponen cocok, atau jika tidak cocok, menjelaskan alasan spesifik ketidaksesuaiannya.",
    code: "JUSTIFIKASI:\nKomponen 100% kompatibel di socket am5,\nRAM ddr5, PSU 650W mencukupi.\nCatatan: Siap libas gaming 1440p.",
  },
];

export const TECH_STACK = [
  { name: "SWI-Prolog", role: "Constraint Reasoning & Hardware KB Logic", iconName: "Binary", color: "var(--accent-cyan)" },
  { name: "Next.js 16 (App Router)", role: "Full-Stack React Framework & Subprocess Bridge", iconName: "Zap", color: "var(--text-primary)" },
  { name: "TypeScript", role: "Strict Type Safety & Robust API Contract", iconName: "FileCode", color: "#3b82f6" },
  { name: "Kaggle Dataset", role: "11,000+ PC Components Converted to IDR (x190)", iconName: "Database", color: "#f59e0b" },
  { name: "Framer Motion", role: "Fluid Chat Micro-Animations & Dynamic UI", iconName: "Sparkles", color: "#ec4899" },
  { name: "Tailwind CSS & CSS Vars", role: "macOS + Cyberpunk Dark Glassmorphism", iconName: "Palette", color: "var(--accent-green)" },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    nama: "Muhammad Ammar Luthfi Azzufar",
    nim: "NPM : 247006111118",
    peran: "Knowledge Base Formulation, Rule Design & Fullstack Integration",
    avatarColor: "var(--accent-primary)",
  },
  {
    nama: "Muhammad Adryan Suryaman",
    nim: "NPM : 247006111060",
    peran: "Hardware Acquisition, Compatibility Verification & Test Validation",
    avatarColor: "var(--accent-cyan)",
  },
  {
    nama: "Muhammad Ziya Pasya Alghifari",
    nim: "NPM : 247006111111",
    peran: "UI/UX Architecture, Data Analysis & Topology Representation",
    avatarColor: "var(--accent-green)",
  },
];
