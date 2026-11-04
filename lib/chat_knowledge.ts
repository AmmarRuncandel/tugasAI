export interface ChatSuggestion {
  id: string;
  label: string;
  value: string;
  category: "rakit" | "masalah" | "harga" | "arsitektur";
  iconName: string;
  badge?: string;
}

export const CATEGORY_TABS = [
  { id: "all", label: "Semua Saran", count: 35 },
  { id: "rakit", label: "Rakit & Budget", count: 8 },
  { id: "masalah", label: "Analisis Masalah", count: 11 },
  { id: "harga", label: "Cek Komponen", count: 8 },
  { id: "arsitektur", label: "Arsitektur & Prolog", count: 8 },
] as const;

export const CHAT_SUGGESTIONS: ChatSuggestion[] = [
  // 1. RAKIT & BUDGET (8 Saran)
  {
    id: "r1",
    label: "Rakit PC Gaming 10-12 Juta (Esports)",
    value: "rekomendasi esports_gaming",
    category: "rakit",
    iconName: "Gamepad2",
    badge: "Populer",
  },
  {
    id: "r2",
    label: "Rakit PC Budget 5-8 Juta (Office/Coding)",
    value: "rekomendasi office_coding",
    category: "rakit",
    iconName: "Briefcase",
  },
  {
    id: "r3",
    label: "Rakit PC 1440p AM5 DDR5 (15-20 Juta)",
    value: "rekomendasi aaa_gaming",
    category: "rakit",
    iconName: "Monitor",
    badge: "AM5",
  },
  {
    id: "r4",
    label: "Rakit PC Video Editing 4K (22-30 Juta)",
    value: "rekomendasi content_creation",
    category: "rakit",
    iconName: "Film",
  },
  {
    id: "r5",
    label: "Rakit PC Intel Arc A750 Edition",
    value: "rekomendasi intel_arc_edition",
    category: "rakit",
    iconName: "Zap",
  },
  {
    id: "r6",
    label: "Rakit PC Sultan Flagship RTX 3090 (>35 Jt)",
    value: "rekomendasi enthusiast_flagship",
    category: "rakit",
    iconName: "Crown",
    badge: "Flagship",
  },
  {
    id: "r7",
    label: "Rakit PC Gaming Hemat 8 Juta",
    value: "rakit pc gaming hemat 8 juta",
    category: "rakit",
    iconName: "TrendingDown",
  },
  {
    id: "r8",
    label: "Panduan Memilih Budget Rakit PC",
    value: "panduan memilih tier budget rakit pc",
    category: "rakit",
    iconName: "Sliders",
  },

  // 2. ANALISIS MASALAH & EDUKASI HARDWARE (11 Saran)
  {
    id: "m1",
    label: "Apakah 2 RAM beda tipe/speed bikin bottleneck?",
    value: "apakah ram beda speed atau beda tipe menyebabkan bottleneck?",
    category: "masalah",
    iconName: "AlertTriangle",
    badge: "Solusi RAM",
  },
  {
    id: "m2",
    label: "Apakah PSU 500W aman untuk RTX 3070?",
    value: "apakah psu 500w cukup untuk rtx 3070 atau 4060?",
    category: "masalah",
    iconName: "ZapOff",
  },
  {
    id: "m3",
    label: "Bottleneck CPU vs GPU pada 1080p vs 4K",
    value: "bagaimana bottleneck cpu dan gpu bekerja pada resolusi 1080p vs 4k?",
    category: "masalah",
    iconName: "Layers",
  },
  {
    id: "m4",
    label: "Bisa pasang SSD PCIe 4.0 di slot PCIe 3.0?",
    value: "apakah ssd nvme pcie 4.0 bisa dipasang di slot pcie 3.0?",
    category: "masalah",
    iconName: "HardDrive",
  },
  {
    id: "m5",
    label: "Kenapa Socket AM4 tidak bisa pakai RAM DDR5?",
    value: "kenapa socket am4 tidak bisa menggunakan ram ddr5?",
    category: "masalah",
    iconName: "Cpu",
  },
  {
    id: "m6",
    label: "Beda performa Single Channel vs Dual Channel RAM",
    value: "apa perbedaan performa single channel vs dual channel ram?",
    category: "masalah",
    iconName: "Gauge",
  },
  {
    id: "m7",
    label: "Penyebab & Solusi Thermal Throttling CPU",
    value: "apa penyebab thermal throttling cpu dan bagaimana cara mengatasinya?",
    category: "masalah",
    iconName: "Flame",
  },
  {
    id: "m8",
    label: "Apakah Motherboard mATX muat di Casing ATX?",
    value: "apakah motherboard matx bisa dipasang di casing atx?",
    category: "masalah",
    iconName: "Box",
  },
  {
    id: "m9",
    label: "Berapa kapasitas VRAM ideal untuk game modern?",
    value: "berapa vram gpu yang dibutuhkan untuk gaming modern?",
    category: "masalah",
    iconName: "HardDriveDownload",
  },
  {
    id: "m10",
    label: "Kapan harus upgrade CPU vs upgrade GPU?",
    value: "kapan harus upgrade cpu dibanding upgrade gpu?",
    category: "masalah",
    iconName: "ArrowUpRight",
  },
  {
    id: "m11",
    label: "SATA SSD vs NVMe M.2 untuk gaming & OS",
    value: "apa perbedaan sata ssd vs nvme m.2 untuk gaming?",
    category: "masalah",
    iconName: "Sparkles",
  },

  // 3. CEK HARGA & DATASET 946 KOMPONEN (8 Saran)
  {
    id: "h1",
    label: "Cek harga & spek AMD Ryzen 5 5600X",
    value: "berapa harga ryzen 5 5600x",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h2",
    label: "Cek harga & spek Intel Core i5-12400F",
    value: "berapa harga intel core i5 12400f",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h3",
    label: "Cek harga & spek GPU Intel Arc A750 8GB",
    value: "berapa harga intel arc a750",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h4",
    label: "Cek harga & spek NVIDIA RTX 4060 8GB",
    value: "berapa harga rtx 4060",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h5",
    label: "Cek harga RAM Corsair DDR4 16GB 3200MHz",
    value: "berapa harga ram corsair ddr4 16gb",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h6",
    label: "Cek harga Motherboard B650M AM5",
    value: "berapa harga motherboard b650m",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h7",
    label: "Cek harga PSU 650W Bronze/Gold",
    value: "berapa harga psu 650w",
    category: "harga",
    iconName: "Search",
  },
  {
    id: "h8",
    label: "Cari Storage SSD NVMe 1TB di dataset",
    value: "cari ssd 1tb di dataset",
    category: "harga",
    iconName: "Database",
  },

  // 4. ARSITEKTUR & PROLOG LOGIC (8 Saran)
  {
    id: "a1",
    label: "Bagaimana Prolog verifikasi kompatibilitas?",
    value: "bagaimana logika swi prolog memverifikasi kompatibilitas hardware?",
    category: "arsitektur",
    iconName: "Binary",
  },
  {
    id: "a2",
    label: "Aturan Horn Clause cocok_cpu_mobo/2",
    value: "jelaskan aturan cocok cpu mobo pada prolog",
    category: "arsitektur",
    iconName: "Code2",
  },
  {
    id: "a3",
    label: "Formula perhitungan daya PSU di Prolog",
    value: "bagaimana prolog menghitung kecukupan daya psu?",
    category: "arsitektur",
    iconName: "Calculator",
  },
  {
    id: "a4",
    label: "Apa itu Explanatory Interface di AI 212?",
    value: "apa itu explanatory interface pada sistem pakar 212?",
    category: "arsitektur",
    iconName: "HelpCircle",
  },
  {
    id: "a5",
    label: "Bagaimana dataset Kaggle diubah jadi fakta Prolog?",
    value: "bagaimana dataset 946 komponen dimodelkan menjadi fakta prolog?",
    category: "arsitektur",
    iconName: "FileSpreadsheet",
  },
  {
    id: "a6",
    label: "Uji Kompatibilitas Hardware di Kalkulator",
    value: "cek_kompatibilitas",
    category: "arsitektur",
    iconName: "CheckCircle2",
  },
  {
    id: "a7",
    label: "Urutan langkah merakit PC bagi pemula",
    value: "bagaimana urutan dan langkah perakitan pc pemula yang benar?",
    category: "arsitektur",
    iconName: "Wrench",
  },
  {
    id: "a8",
    label: "Tips perawatan PC agar awet bertahun-tahun",
    value: "tips perawatan pc rakitan agar awet dan tidak cepat rusak",
    category: "arsitektur",
    iconName: "ShieldCheck",
  },
];

export interface TechnicalQA {
  keywords: string[];
  response: string;
  quickReplies: { label: string; value: string }[];
}

export const TECHNICAL_KNOWLEDGE: TechnicalQA[] = [
  // 1. RAM Tidak Sesuai / Beda Tipe / Beda Speed / Potensi Error pada PC
  {
    keywords: [
      "ram tidak sesuai",
      "ram tidak cocok",
      "ram salah",
      "ram error",
      "ram beda",
      "beda speed",
      "beda tipe",
      "campur ram",
      "ram berbeda",
      "pasang 2 ram beda",
      "apakah jika ram tidak sesuai",
      "efek ram tidak sesuai",
      "dampak ram tidak cocok",
      "ram bikin error",
      "ram menyebabkan error",
      "ram incompatible",
      "ram bsod",
      "ram blue screen",
      "no post ram",
    ],
    response:
      `**Analisis Dampak Teknis: Apakah RAM yang Tidak Sesuai Menyebabkan Error pada PC?**\n\n` +
      `**Jawabannya: Ya, pasti menyebabkan error.** Derajat keparahan error berkisar dari penurunan performa hingga PC gagal menyala total (*No POST*), bergantung pada jenis ketidaksesuaiannya:\n\n` +
      `1. **Ketidaksesuaian Generasi Fisik (Contoh: DDR4 dipasang ke slot DDR5):**\n` +
      `   • **Dampak Error:** Secara fisik tidak bisa dipasang. Pin (288 pin) memiliki letak lekukan (*notch*) dan voltase yang bertolak belakang (1.2V vs 1.1V). Jika dipaksa, slot motherboard atau pin RAM akan patah dan rusak permanen.\n` +
      `   • *Kaidah Deduksi Prolog:* Aturan logika formal \`cocok_mobo_ram(Mobo, RAM)\` akan langsung mendeteksi kontradiksi dan memvonis rakitan tidak kompatibel.\n\n` +
      `2. **Ketidaksesuaian Frekuensi / Voltase Maksimal Motherboard:**\n` +
      `   • **Gejala Error:** PC mengalami **No POST / Black Screen** (kipas menyala namun layar monitor tidak menampilkan display sama sekali). Lampu indikator *DRAM Debug LED* pada motherboard akan menyala merah/kuning, atau terdengar bunyi *beep code* berulang dari BIOS.\n\n` +
      `3. **Memasang 2 RAM Berbeda (Beda Kecepatan, Beda Merek, atau Beda Timing IC):**\n` +
      `   • **Blue Screen of Death (BSOD):** Sering memicu crash Windows dengan kode error stop code \`MEMORY_MANAGEMENT\`, \`IRQL_NOT_LESS_OR_EQUAL\`, atau \`PAGE_FAULT_IN_NONPAGED_AREA\`.\n` +
      `   • **Random Freeze & App Crash:** Game atau aplikasi tertutup tiba-tiba (*crash to desktop*) saat beban komputasi memori meningkat.\n` +
      `   • **Downclocking Otomatis:** BIOS motherboard terpaksa menurunkan kecepatan RAM tercepat agar menyamai keping terendah dengan latensi longgar, memangkas bandwidth memori hingga 15-20%.\n\n` +
      `**Rekomendasi Solusi Sistem Pakar 212:**\n` +
      `Selalu gunakan **RAM Dual-Channel Kit Identik** (2 keping dengan nomor seri pabrikan yang sama) dari katalog 946 hardware dataset kami (misal: *Corsair Vengeance DDR4 16GB 3200MHz* seharga ~Rp 850.000) untuk menjamin stabilitas 100% bebas error!`,
    quickReplies: [
      { label: "Beda Single Channel vs Dual Channel", value: "apa perbedaan performa single channel vs dual channel ram?" },
      { label: "Cek Harga RAM Corsair DDR4 16GB", value: "berapa harga ram corsair ddr4 16gb" },
      { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
      { label: "Rekomendasi Rakitan PC Gaming", value: "rekomendasi esports_gaming" },
    ],
  },

  // 2. PSU 500W untuk RTX 3070 / Daya PSU
  {
    keywords: ["psu 500w", "rtx 3070", "daya psu", "psu cukup", "psu aman", "daya listrik"],
    response:
      `**Analisis Kelayakan Daya: PSU 500W dengan RTX 3070 / GPU Menengah ke Atas**\n\n` +
      `Berdasarkan data profil daya di basis pengetahuan SWI-Prolog sistem pakar 212:\n\n` +
      `1. **Kebutuhan Daya RTX 3070:**\n` +
      `   • TDP Nominal RTX 3070 adalah **220 Watt**.\n` +
      `   • Rekomendasi daya minimum resmi dari NVIDIA dan aturan Prolog \`daya_psu_cukup/2\` adalah **minimal 650 Watt**.\n\n` +
      `2. **Risiko Bahaya: Fenomena Transient Power Spikes:**\n` +
      `   • Arsitektur Ampere (RTX 30 series) memiliki lonjakan daya mendadak (*power spike*) hingga 1.5x–2x TDP normal dalam hitungan milidetik (bisa melonjak ke 350W+).\n` +
      `   • Jika menggunakan PSU 500W, sirkuit proteksi daya **OPP (Over Power Protection)** pada PSU akan terpicu dan menyebabkan PC **tiba-tiba mati sendiri (shut down / restart)** saat masuk sesi game berat.\n\n` +
      `3. **Formula Penghitungan Aman Sistem Pakar:**\n` +
      `   • Total Daya = (TDP CPU [65W-125W] + TDP GPU [220W] + 80W Komponen Lain) × 1.3 (Headroom) ≈ **minimal 600W – 650W 80+ Bronze/Gold**.\n\n` +
      `**Kesimpulan:** PSU 500W **TIDAK AMAN** untuk RTX 3070. Namun, PSU 500W sangat aman untuk **RTX 4060** (TDP hanya 115W) atau **GTX 1650 / RX 6600**.`,
    quickReplies: [
      { label: "Cek Harga PSU 650W di Dataset", value: "berapa harga psu 650w" },
      { label: "Cek Harga RTX 4060 Hemat Daya", value: "berapa harga rtx 4060" },
      { label: "Rakit PC 1440p dengan PSU 650W", value: "rekomendasi aaa_gaming" },
      { label: "Uji PSU di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
    ],
  },

  // 3. Bottleneck CPU vs GPU 1080p vs 4K
  {
    keywords: ["bottleneck", "1080p vs 4k", "cpu bottleneck", "gpu bottleneck", "resolusi"],
    response:
      `**Analisis Fenomena Bottleneck: Pengaruh Resolusi 1080p vs 1440p vs 4K**\n\n` +
      `Bottleneck adalah kondisi di mana salah satu komponen mencapai utilisasi 100% sementara komponen lainnya terpaksa menunggu (underutilized):\n\n` +
      `1. **Pada Resolusi 1080p (Full HD — CPU Bound):**\n` +
      `   • Beban rendering grafis per pixel relatif ringan bagi GPU modern.\n` +
      `   • GPU mampu menghasilkan frame rate sangat tinggi (140–240+ FPS), namun setiap frame membutuhkan instruksi *draw call* dan simulasi logika fisika dari CPU.\n` +
      `   • Di 1080p, prosesor dengan single-core speed rendah akan menjadi **CPU Bottleneck** parah meskipun GPU kamu sangat kencang.\n\n` +
      `2. **Pada Resolusi 4K (3840×2160 — GPU Bound):**\n` +
      `   • Jumlah pixel yang diproses melonjak **4 kali lipat** dibanding 1080p (8,3 juta pixel).\n` +
      `   • Beban terbesar berpindah total ke Shader Cores, VRAM, dan Memory Bandwidth GPU.\n` +
      `   • Di 4K, CPU kelas menengah (seperti Ryzen 5 5600X atau i5-12400F) sudah sangat cukup dan hampir tidak mengalami bottleneck karena GPU lah yang bekerja 99-100%.\n\n` +
      `**Rekomendasi Kombinasi Seimbang dari Dataset 212:**\n` +
      `• *Gaming 1080p High FPS:* Ryzen 5 5600X + RX 6600 / RTX 4060.\n` +
      `• *Gaming 1440p:* Ryzen 5 7600X + RTX 4070 / RX 7700 XT.\n` +
      `• *Gaming 4K Ultra:* Ryzen 7 7800X3D / i7 + RTX 4080 / RTX 3090.`,
    quickReplies: [
      { label: "Rakit PC 1440p Seimbang (AM5)", value: "rekomendasi aaa_gaming" },
      { label: "Kapan Harus Upgrade CPU vs GPU?", value: "kapan harus upgrade cpu dibanding upgrade gpu?" },
      { label: "Berapa VRAM Ideal Game Modern?", value: "berapa vram gpu yang dibutuhkan untuk gaming modern?" },
      { label: "Lihat Spek PC Flagship 4K", value: "rekomendasi enthusiast_flagship" },
    ],
  },

  // 4. SSD NVMe PCIe 4.0 di slot PCIe 3.0
  {
    keywords: ["pcie 4.0", "pcie 3.0", "ssd pcie", "slot pcie", "bisa dipasang"],
    response:
      `**Analisis Kompatibilitas Antarmuka: SSD NVMe PCIe Gen 4.0 pada Slot PCIe Gen 3.0**\n\n` +
      `1. **Kompabilitas Fisik & Logika: BISA & 100% KOMPATIBEL**\n` +
      `   • Standar PCI-SIG dirancang dengan sifat **Backward & Forward Compatible** penuh.\n` +
      `   • SSD PCIe Gen 4.0 (konektor M.2 M-Key) akan langsung terdeteksi normal di motherboard dengan slot PCIe 3.0 tanpa perlu adapter tambahan.\n\n` +
      `2. **Dampak Performa (Bandwidth Throttling):**\n` +
      `   • Kecepatan transfer data per lajur (*lane*) PCIe 3.0 adalah ~1 GB/s (total ~3.500 MB/s untuk x4).\n` +
      `   • Kecepatan PCIe 4.0 x4 mencapai ~7.000–7.500 MB/s.\n` +
      `   • Saat SSD Gen 4 dipasang di slot Gen 3, kecepatan sekuensial akan **terkunci di batas maksimum PCIe 3.0 (~3.500 MB/s)**.\n\n` +
      `3. **Dampak Nyata Penggunaan Harian:**\n` +
      `   • Untuk *booting OS Windows*, loading game, dan browsing, **hampir tidak ada perbedaan terasa** karena *Random 4K Read/Write* (bukan sequential) lah yang menentukan kecepatan responsivitas sistem harian.\n\n` +
      `**Tips Pembelian:** Jika harga SSD Gen 4 mirip dengan Gen 3, belilah Gen 4 sebagai bentuk *future-proofing* saat nanti kamu upgrade motherboard ke chipset B550 / B650 / B760!`,
    quickReplies: [
      { label: "Cari SSD 1TB Terbaik di Dataset", value: "cari ssd 1tb di dataset" },
      { label: "Beda SATA SSD vs NVMe M.2", value: "apa perbedaan sata ssd vs nvme m.2 untuk gaming?" },
      { label: "Rakit PC 1440p Modern AM5", value: "rekomendasi aaa_gaming" },
      { label: "Cek di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
    ],
  },

  // 5. Socket AM4 vs AM5 & RAM DDR5
  {
    keywords: ["socket am4", "am4 ddr5", "kenapa am4 tidak bisa", "am4 ram ddr5", "am5 ddr4"],
    response:
      `**Analisis Arsitektur CPU Socket: Mengapa Platform AM4 Tidak Mendukung RAM DDR5?**\n\n` +
      `1. **Fisik Socket & Pin Layout:**\n` +
      `   • **Socket AM4 (PGA 1331 pin):** Jarum pin berada di prosesor dan menancap ke lubang motherboard.\n` +
      `   • **Socket AM5 (LGA 1718 pin):** Pin berada di motherboard, dasar prosesor berupa bantalan kontak emas (*Land Grid Array*).\n\n` +
      `2. **Integrated Memory Controller (IMC) Silikon CPU:**\n` +
      `   • Jalur memori dikontrol langsung oleh silikon mikrokontroler di dalam CPU.\n` +
      `   • Prosesor AM4 (Ryzen seri 1000 hingga 5000) hanya memiliki sirkuit logika memori untuk **DDR4 (voltase 1.2V)**.\n` +
      `   • Prosesor AM5 (Ryzen seri 7000, 8000, 9000) membuang kontroler DDR4 sepenuhnya dan **hanya mendukung DDR5 (voltase 1.1V)**.\n\n` +
      `3. **Aturan Evaluasi Prolog 212:**\n` +
      `   • Sistem pakar kami memverifikasi aturan konjungtif: \`cocok_cpu_mobo(CPU, Mobo)\` AND \`cocok_mobo_ram(Mobo, RAM)\`.\n` +
      `   • Jika CPU AM4 dipasangkan dengan motherboard AM5 atau RAM DDR5, Prolog secara inferensial membuktikan **FALSIFIKASI (Tidak Kompatibel)**.\n\n` +
      `**Rekomendasi Pemilihan Platform:**\n` +
      `• Budget < Rp 12 Juta: Pilih **AM4 (Ryzen 5 5600 + DDR4)** — Value for money terbaik.\n` +
      `• Budget > Rp 15 Juta: Pilih **AM5 (Ryzen 5 7600X + DDR5)** — Masa depan upgrade terjamin hingga 2027+.`,
    quickReplies: [
      { label: "Rakit PC AM4 Hemat (9-13 Jt)", value: "rekomendasi esports_gaming" },
      { label: "Rakit PC AM5 DDR5 (15-20 Jt)", value: "rekomendasi aaa_gaming" },
      { label: "Cek Harga Motherboard B650M", value: "berapa harga motherboard b650m" },
      { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
    ],
  },

  // 6. Single Channel vs Dual Channel RAM
  {
    keywords: ["single channel", "dual channel", "beda single channel", "ram dual channel", "1x16gb vs 2x8gb"],
    response:
      `**Analisis Bandwidth Memori: 1×16GB (Single Channel) vs 2×8GB (Dual Channel)**\n\n` +
      `Perbedaan arsitektur bus memori antara 1 keping vs 2 keping RAM:\n\n` +
      `1. **Lebar Jalur Bus Data:**\n` +
      `   • **Single Channel:** Memori berjalan pada lebar bus data **64-bit** tunggal.\n` +
      `   • **Dual Channel:** Mengaktifkan dua kanal 64-bit independen menjadi **128-bit bus width**, menggandakan bandwidth teoritis transfer data dari RAM ke prosesor.\n\n` +
      `2. **Dampak Performa Nyata (Gaming & Multitasking):**\n` +
      `   • **1% Low FPS & Stuttering:** Dual channel meningkatkan kestabilan frame rate terendah hingga **20–35%**, menghilangkan jeda patah-patah (*micro-stutter*) saat rendering scene game ramai.\n` +
      `   • **Integrated Graphics (iGPU):** Jika kamu menggunakan prosesor ber-VGA onboard (seperti Ryzen 5 5600G di dataset kami), dual channel wajib hukumnya karena iGPU meminjam RAM sistem sebagai VRAM. FPS bisa naik hingga **50-80%**!\n` +
      `   • **Editing & Rendering:** Export timeline Premiere Pro dan dekompresi file 7-Zip berjalan 15-25% lebih cepat.\n\n` +
      `**Aturan Emas:** Jangan pernah membeli 1 keping 16GB jika budget kamu mengizinkan 2 keping 8GB dengan kecepatan yang sama!`,
    quickReplies: [
      { label: "Cek Harga RAM Corsair DDR4 16GB", value: "berapa harga ram corsair ddr4 16gb" },
      { label: "Apakah 2 RAM Beda Bikin Bottleneck?", value: "apakah ram beda speed atau beda tipe menyebabkan bottleneck?" },
      { label: "Rakit PC Gaming Menggunakan Dual Channel", value: "rekomendasi esports_gaming" },
      { label: "Uji Kompatibilitas", value: "cek_kompatibilitas" },
    ],
  },

  // 7. Thermal Throttling CPU
  {
    keywords: ["thermal throttling", "cpu panas", "panas berlebih", "suhu cpu", "cooler", "overheat"],
    response:
      `**Analisis Masalah Sistem: Thermal Throttling pada Prosesor (CPU)**\n\n` +
      `Thermal Throttling adalah mekanisme proteksi perangkat keras otomatis ketika sensor silikon CPU mendeteksi suhu inti mendekati batas toleransi kritis (**TjMax ~95°C – 100°C**):\n\n` +
      `1. **Bagaimana Throttling Bekerja:**\n` +
      `   • Kontroler CPU akan otomatis memangkas clock multiplier dan voltase (misal dari 4.6 GHz turun drastis ke 2.2 GHz).\n` +
      `   • Akibatnya game mengalami *frame drop* parah atau PC terasa sangat lag selama beberapa detik hingga suhu turun kembali.\n\n` +
      `2. **4 Penyebab Utama & Solusinya:**\n` +
      `   • **Pasta Termal Kering/Salah Pasang:** Pasta termal mengeras setelah 1-2 tahun atau plastik pelindung dasar heatsink lupa dilepas saat rakit.\n` +
      `   • **Cooler Kurang Mumpuni:** Menggunakan stock cooler bawaan untuk prosesor ber-TDP tinggi (>105W seperti Ryzen 7 atau Core i7).\n` +
      `   • **Airflow Casing Buruk:** Casing tipe *front solid acrylic* tanpa lubang mesh intake udara segar.\n` +
      `   • **Konfigurasi Kipas Salah:** Jumlah kipas exhaust lebih banyak daripada intake sehingga tercipta tekanan udara negatif berdebu.\n\n` +
      `**Rekomendasi Cooler Sesuai Tier:**\n` +
      `• CPU TDP 65W (Ryzen 5 5600 / i5-12400F): Cukup Air Cooler Tower 4-Heatpipe (~Rp 250.000).\n` +
      `• CPU TDP > 120W (Ryzen 9 / i7): Gunakan Liquid Cooler AIO 240mm / 360mm.`,
    quickReplies: [
      { label: "Cek Casing Airflow Bagus di Dataset", value: "cari casing di dataset" },
      { label: "Tips Perawatan PC Agar Awet", value: "tips perawatan pc rakitan agar awet dan tidak cepat rusak" },
      { label: "Rakit PC Gaming Dingin & Hemat Daya", value: "rekomendasi esports_gaming" },
      { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
    ],
  },

  // 8. Motherboard mATX di Casing ATX
  {
    keywords: ["matx casing atx", "motherboard matx", "casing atx", "muat casing", "form factor casing"],
    response:
      `**Analisis Form Factor: Pemasangan Motherboard Micro-ATX (mATX) pada Casing ATX**\n\n` +
      `1. **Kompabilitas Fisik: BISA & SANGAT UMUM**\n` +
      `   • Casing berukuran **ATX (Mid-Tower / Full-Tower)** selalu memiliki lubang baut dudukan (*standoff brass screws*) standar untuk form factor yang lebih kecil: **ATX, Micro-ATX, dan Mini-ITX**.\n` +
      `   • Aturan form factor Prolog \`cocok_casing_mobo/2\` memverifikasi bahwa ukuran casing >= ukuran motherboard.\n\n` +
      `2. **Hal Penting yang Perlu Diperhatikan:**\n` +
      `   • **Posisi Standoff Baut:** Pastikan memindahkan baut kuningan (*standoff*) casing agar pas dengan 6 lubang baut standar mATX (ATX menggunakan 9-10 baut). Jangan biarkan ada standoff nyasar di bawah motherboard yang bisa memicu *korsleting*!\n` +
      `   • **Estetika:** Motherboard mATX (244×244 mm) akan menyisakan ruang kosong di bagian bawah casing ATX (305×244 mm), namun ruang ini justru mempermudah sirkulasi udara dan manajemen kabel PSU.\n\n` +
      `**Keuntungan Kombinasi Ini:** Motherboard mATX umumnya lebih hemat biaya Rp 300.000–Rp 700.000 dibanding ATX, namun tetap memiliki performa identik!`,
    quickReplies: [
      { label: "Cek Harga Motherboard B650M", value: "berapa harga motherboard b650m" },
      { label: "Cari Casing di Dataset", value: "cari casing di dataset" },
      { label: "Rekomendasi Rakitan mATX Value", value: "rekomendasi esports_gaming" },
      { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
    ],
  },

  // 9. VRAM Ideal Gaming Modern
  {
    keywords: ["vram", "kapasitas vram", "vram ideal", "8gb cukup", "vram habis"],
    response:
      `**Panduan Teknis VRAM GPU: Berapa Kapasitas VRAM yang Dibutuhkan di 2024–2026?**\n\n` +
      `VRAM (*Video Random Access Memory*) menyimpan aset tekstur resolusi tinggi, geometry mesh, buffer bayangan, dan frame buffer Ray Tracing:\n\n` +
      `1. **VRAM 8GB (Entry to Mid Gaming):**\n` +
      `   • Sangat aman untuk game kompetitif (Valorant, CS2, Dota 2, Apex) dan game AAA 1080p setting High.\n` +
      `   • *Peringatan:* Di game AAA terbaru (The Last of Us Part 1, Hogwarts Legacy, Alan Wake 2), VRAM 8GB mulai mengalami batas kritis jika dipaksa di resolusi 1440p tekstur Ultra.\n\n` +
      `2. **VRAM 12GB – 16GB (Sweet Spot 1440p & AI):**\n` +
      `   • Titik paling ideal untuk gaming 1440p Ultra + Ray Tracing + Frame Generation.\n` +
      `   • Wajib untuk beban kerja *Content Creation* (Premiere Pro 4K timeline) dan fine-tuning model AI lokal (LLM / Stable Diffusion).\n\n` +
      `3. **VRAM 24GB (Flagship 4K & Workstation):**\n` +
      `   • Seperti **RTX 3090 24GB** pada opsi flagship dataset kami: siap libas game 4K resolusi asli, rendering 3D Blender resolusi tinggi tanpa takut kehabisan alokasi memori (*Out of Memory*).\n\n` +
      `**Gejala VRAM Habis:** Game tiba-tiba stutter berat dan tekstur objek menjadi buram (*texture pop-in*) karena GPU terpaksa meminjam RAM sistem lewat bus PCIe yang jauh lebih lambat!`,
    quickReplies: [
      { label: "Cek Spek Intel Arc A750 8GB", value: "berapa harga intel arc a750" },
      { label: "Cek Spek RTX 4060 8GB", value: "berapa harga rtx 4060" },
      { label: "Lihat PC Flagship VRAM 24GB", value: "rekomendasi enthusiast_flagship" },
      { label: "Rakit PC 1440p VRAM 12GB+", value: "rekomendasi aaa_gaming" },
    ],
  },

  // 10. Kapan Upgrade CPU vs GPU
  {
    keywords: ["kapan upgrade", "upgrade cpu", "upgrade gpu", "tanda upgrade", "prioritas upgrade"],
    response:
      `**Panduan Keputusan: Kapan Harus Upgrade CPU vs Kapan Harus Upgrade GPU?**\n\n` +
      `Gunakan pemantauan overlay (misal MSI Afterburner) saat bermain game untuk melihat persentase utilisasi:\n\n` +
      `1. **Waktunya UPGRADE GPU jika:**\n` +
      `   • Utilisasi GPU stabil di **98% – 100%**, namun FPS masih di bawah refresh rate monitor kamu (misal < 60 FPS).\n` +
      `   • Sementara utilisasi CPU masih santai di angka **30% – 60%**.\n` +
      `   • Kamu ingin naik resolusi monitor dari 1080p ke 1440p atau 4K, atau ingin mengaktifkan Ray Tracing.\n\n` +
      `2. **Waktunya UPGRADE CPU jika:**\n` +
      `   • Utilisasi GPU rendah (hanya **50% – 70%**), padahal setting grafik sudah rata kiri/rendah.\n` +
      `   • Salah satu core CPU kamu mentok di **100%**.\n` +
      `   • Terjadi *micro-stuttering* parah di game kompetitif multiplayer (Valorant, CS2, Warzone) dengan banyak pemain di satu area.\n` +
      `   • Waktu render video, kompresi zip, atau compile coding terasa lambat.\n\n` +
      `**Tips Hemat:** Seringkali upgrade RAM ke **Dual Channel 16GB/32GB** dan ganti storage ke **NVMe M.2** sudah cukup menyegarkan performa PC tanpa harus ganti CPU/GPU!`,
    quickReplies: [
      { label: "Beda Single vs Dual Channel RAM", value: "apa perbedaan performa single channel vs dual channel ram?" },
      { label: "Analisis Bottleneck 1080p vs 4K", value: "bagaimana bottleneck cpu dan gpu bekerja pada resolusi 1080p vs 4k?" },
      { label: "Konsultasi Rakit PC Baru", value: "panduan memilih tier budget rakit pc" },
      { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
    ],
  },

  // 11. SATA SSD vs NVMe M.2
  {
    keywords: ["sata ssd", "nvme m.2", "beda sata dan nvme", "kecepatan ssd", "hdd vs ssd"],
    response:
      `**Perbandingan Media Penyimpanan: SATA SSD (2.5") vs NVMe M.2 (PCIe)**\n\n` +
      `1. **Kecepatan Sekuensial (Sequential Read/Write):**\n` +
      `   • **HDD Mekik Tradisional:** ~100 – 150 MB/s (sangat lambat untuk OS modern).\n` +
      `   • **SATA SSD 2.5":** ~500 – 550 MB/s (terbatas oleh protokol antarmuka kabel SATA III 6 Gbps).\n` +
      `   • **NVMe M.2 PCIe Gen 3:** ~2.500 – 3.500 MB/s (terhubung langsung ke lajur PCIe CPU).\n` +
      `   • **NVMe M.2 PCIe Gen 4:** ~5.000 – 7.500 MB/s (standar modern tercepat di dataset 212).\n\n` +
      `2. **Kecepatan Akses Acak (Random 4K IOPS):**\n` +
      `   • NVMe memiliki antrian perintah (*queue depth*) hingga 64.000 antrian, sedangkan SATA hanya 32 antrian.\n` +
      `   • Membuat booting Windows 11 menjadi instan (~5–8 detik) dan instalasi aplikasi besar sangat cepat.\n\n` +
      `3. **Dukungan Microsoft DirectStorage:**\n` +
      `   • Game modern generasi baru dapat mendekompresi tekstur langsung dari NVMe SSD ke GPU tanpa melewati CPU, memangkas waktu loading game dari 20 detik menjadi 1-2 detik saja!\n\n` +
      `**Rekomendasi Terbaik:** Gunakan **SSD NVMe M.2 minimal 500GB – 1TB** sebagai drive C: (Windows & Game Utama), dan gunakan HDD/SATA SSD lama hanya untuk arsip dokumen atau file video santai.`,
    quickReplies: [
      { label: "Cari SSD 1TB di Dataset", value: "cari ssd 1tb di dataset" },
      { label: "Bisa Pasang PCIe 4.0 di Slot 3.0?", value: "apakah ssd nvme pcie 4.0 bisa dipasang di slot pcie 3.0?" },
      { label: "Rakit PC Gaming Lengkap dengan NVMe", value: "rekomendasi esports_gaming" },
      { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
    ],
  },

  // 12. Panduan Urutan Perakitan PC
  {
    keywords: ["urutan rakit", "langkah rakit", "cara rakit", "panduan pemula", "tahapan rakit"],
    response:
      `**Panduan Urutan Perakitan PC Langkah Demi Langkah (Aman & Sistematis):**\n\n` +
      `1. **Langkah 1: Siapkan Motherboard di Luar Casing**\n` +
      `   • Letakkan motherboard di atas kotak kardusnya (jangan di atas kantong antistatik bagian luar).\n\n` +
      `2. **Langkah 2: Pasang CPU & SSD M.2**\n` +
      `   • Perhatikan tanda segitiga emas di pojok CPU agar pas dengan tanda di socket. Jangan ditekan paksa!\n` +
      `   • Pasang SSD NVMe M.2 pada slot PCIe utama yang paling dekat dengan CPU (slot ber-heatsink).\n\n` +
      `3. **Langkah 3: Pasang RAM (Dual Channel Slot 2 & 4)**\n` +
      `   • Buka klip slot RAM A2 dan B2. Tekan kedua ujung RAM hingga terdengar suara **'KLIK'** mantap.\n\n` +
      `4. **Langkah 4: Pasang Cooler CPU**\n` +
      `   • Oleskan pasta termal seukuran biji jagung di tengah IHS prosesor jika cooler belum ada pre-applied paste.\n\n` +
      `5. **Langkah 5: Persiapan Casing & PSU**\n` +
      `   • Pasang I/O Shield di belakang casing, pasang PSU dan arahkan kabel penting (24-pin Motherboard, 8-pin CPU EPS).\n\n` +
      `6. **Langkah 6: Pasang Motherboard ke Casing**\n` +
      `   • Pasang standoff baut dan kencangkan sekrup secara diagonal menyilang.\n\n` +
      `7. **Langkah 7: Pasang GPU (Kartu Grafis) Terakhir**\n` +
      `   • Pasang di slot PCIe x16 teratas, pasang kabel power PCIe 6+2 pin, dan kunci baut di bracket casing.\n\n` +
      `**Tips Penting:** Lakukan uji nyala (*test boot*) di luar casing sebelum memasukkan semua komponen ke dalam casing!`,
    quickReplies: [
      { label: "Tips Perawatan PC Agar Awet", value: "tips perawatan pc rakitan agar awet dan tidak cepat rusak" },
      { label: "Uji Kompatibilitas Hardware Pilihan", value: "cek_kompatibilitas" },
      { label: "Rekomendasi Rakit PC Gaming Pemula", value: "rekomendasi esports_gaming" },
      { label: "Rekomendasi PC Office & Coding", value: "rekomendasi office_coding" },
    ],
  },

  // 13. Tips Perawatan PC
  {
    keywords: ["perawatan", "tips awet", "membersihkan pc", "merawat pc", "debu pc"],
    response:
      `**Tips Perawatan PC Rakitan Agar Awet, Dingin, dan Tahan Bertahun-tahun:**\n\n` +
      `1. **Pembersihan Debu Rutin (Tiap 3–6 Bulan):**\n` +
      `   • Gunakan *canned air* (udara bertekanan) atau blower elektrik. **Pegang bilah kipas** saat disemprot agar kipas tidak berputar melebihi RPM aman yang bisa merusak bantalan bearing atau menghasilkan arus balik statis.\n\n` +
      `2. **Penggantian Pasta Termal (Tiap 1.5 – 2 Tahun):**\n` +
      `   • Bersihkan sisa pasta kering menggunakan alkohol isopropil (IPA 90%+) dan aplikasikan pasta termal berkualitas tinggi.\n\n` +
      `3. **Gunakan Stop Kontak Ber-Grounding & UPS / Surge Protector:**\n` +
      `   • Lonjakan voltase petir dan listrik PLN yang tidak stabil adalah pembunuh nomor satu bagi PSU dan Motherboard.\n\n` +
      `4. **Gunakan Penyangga GPU (*Anti-Sag Bracket*):**\n` +
      `   • GPU modern berukuran 3 kipas memiliki bobot 1.5 kg+. Tanpa penyangga, beban ini dapat membengkokkan PCB dan merusak slot PCIe motherboard seiring waktu.\n\n` +
      `5. **Jaga Sirkulasi Udara Ruangan:**\n` +
      `   • Jangan letakkan casing langsung di atas karpet berbulu karena debu akan tersedot langsung ke kipas PSU di bagian bawah.`,
    quickReplies: [
      { label: "Penyebab & Atasi Thermal Throttling", value: "apa penyebab thermal throttling cpu dan bagaimana cara mengatasinya?" },
      { label: "Panduan Urutan Merakit PC", value: "bagaimana urutan dan langkah perakitan pc pemula yang benar?" },
      { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
      { label: "Konsultasi Rakitan Kompatibel", value: "rekomendasi esports_gaming" },
    ],
  },

  // 14. Logika SWI-Prolog & Aturan Inferensi
  {
    keywords: ["swi prolog", "logika prolog", "inferensi", "aturan prolog", "horn clause", "constraint logic"],
    response:
      `**Arsitektur Sistem Pakar 212: Representasi Logika Deduktif SWI-Prolog**\n\n` +
      `Sistem kami tidak sekadar melakukan pencarian teks, melainkan mengeksekusi mesin inferensi logika orde pertama (*First-Order Logic*):\n\n` +
      `1. **Representasi Fakta Hardware (946 Komponen):**\n` +
      `   • Seluruh komponen dari dataset Kaggle dimodelkan sebagai klausa fakta Prolog:\n` +
      `   \`cpu(cpu_ryzen_5_7600x, 'amd Ryzen 5 7600X', amd, am5, 65, 4540000, mid).\`\n` +
      `   \`motherboard(mobo_b650m_ddr5, 'MSI B650M Gaming', am5, ddr5, matx, 2350000).\`\n\n` +
      `2. **Aturan Kecocokan Klausa Horn (Horn Clauses):**\n` +
      `   • Aturan kompatibilitas CPU dan Motherboard:\n` +
      `   \`cocok_cpu_mobo(CPU, Mobo) :- cpu(CPU, _, _, Socket, _, _, _), motherboard(Mobo, _, Socket, _, _, _).\`\n` +
      `   • Aturan verifikasi kecukupan daya PSU:\n` +
      `   \`daya_psu_cukup(GPU, PSU) :- gpu(GPU, _, _, DayaMin, _, _, _), psu(PSU, _, _, Watt, _, _), Watt >= DayaMin.\`\n\n` +
      `3. **Penyelesaian Kendala (Constraint Satisfaction Problem / CSP):**\n` +
      `   • Saat kamu meminta rakitan PC, predikat \`rakitan_valid/7\` membuktikan bahwa ketujuh komponen (CPU, Mobo, RAM, GPU, PSU, Storage, Casing) saling unifikasi secara konsisten tanpa ada kontradiksi kendala fisik.\n\n` +
      `4. **Explanatory Interface:**\n` +
      `   • Memberikan justifikasi transparan mengapa suatu kombinasi dinyatakan *VALID* atau ditolak karena konflik soket/daya.`,
    quickReplies: [
      { label: "Uji Kompatibilitas dengan Prolog", value: "cek_kompatibilitas" },
      { label: "Aturan Horn Clause cocok_cpu_mobo", value: "jelaskan aturan cocok cpu mobo pada prolog" },
      { label: "Formula Daya PSU di Prolog", value: "bagaimana prolog menghitung kecukupan daya psu?" },
      { label: "Minta Rekomendasi Rakitan Prolog", value: "rekomendasi esports_gaming" },
    ],
  },

  // 15. Panduan Memilih Budget Rakit PC
  {
    keywords: ["panduan budget", "memilih budget", "budget berapa", "tier rakitan", "rekomendasi budget"],
    response:
      `**Panduan Pemilihan Tier Budget Rakit PC Sistem Pakar 212:**\n\n` +
      `Sesuaikan budget dengan kebutuhan utama kamu agar alokasi dana tidak berlebih (*overkill*) atau kurang bertenaga:\n\n` +
      `• **Tier 1: Budget Rp 5 – 8 Juta (Office, Pelajar, Coding & Admin)**\n` +
      `  Komposisi: Intel Core i3 / Ryzen 3, 16GB RAM, SSD 500GB NVMe, PSU 450W.\n` +
      `  *Target:* Multitasking skripsi, Microsoft Office, web development, dan game ringan.\n\n` +
      `• **Tier 2: Budget Rp 9 – 13 Juta (Esports Gaming 1080p High FPS)**\n` +
      `  Komposisi: Ryzen 5 5600 / i5-12400F, RX 6600 8GB / RTX 3050, 16GB Dual Channel, PSU 550W.\n` +
      `  *Target:* Valorant 200+ FPS, CS2, Dota 2, dan game AAA grafis Medium-High 1080p.\n\n` +
      `• **Tier 3: Budget Rp 15 – 20 Juta (AAA Gaming 1440p & Platform AM5 DDR5)**\n` +
      `  Komposisi: Ryzen 5 7600X AM5, RTX 4060 / RX 7600 XT, 32GB DDR5 6000MHz, PSU 650W.\n` +
      `  *Target:* Cyberpunk 2077, Black Myth Wukong di 1440p dengan DLSS 3 & Ray Tracing.\n\n` +
      `• **Tier 4: Budget Rp 22 – 30 Juta (Content Creation, 3D Blender & 4K Edit)**\n` +
      `  Komposisi: Ryzen 9 5900X (12C/24T), RTX 4070 12GB VRAM, 32GB RAM, PSU 750W Gold.\n` +
      `  *Target:* Rendering Premiere Pro 4K, After Effects, dan CUDA acceleration.\n\n` +
      `• **Tier 5: Budget > Rp 35 Juta (Ultimate Flagship Tanpa Kompromi)**\n` +
      `  Komposisi: Ryzen 9 5950X / i9, RTX 3090 24GB GDDR6X, 32GB 3600MHz, PSU 850W Gold.\n\n` +
      `Pilih salah satu tier budget di bawah ini untuk saya racikkan spesifikasi lengkapnya:`,
    quickReplies: [
      { label: "Budget 5-8 Juta (Office)", value: "rekomendasi office_coding" },
      { label: "Budget 9-13 Juta (Esports 1080p)", value: "rekomendasi esports_gaming" },
      { label: "Budget 15-20 Juta (AM5 1440p)", value: "rekomendasi aaa_gaming" },
      { label: "Budget 22-30 Juta (4K Edit)", value: "rekomendasi content_creation" },
      { label: "Budget >35 Juta (Flagship)", value: "rekomendasi enthusiast_flagship" },
    ],
  },
];

/**
 * Menganalisis pesan pengguna terhadap pengetahuan teknis komputer dan masalah hardware
 * menggunakan Intelligent Multi-Token Semantic Matcher (Hybrid Concept Co-occurrence).
 */
export function matchTechnicalAnalysis(message: string): { response: string; quickReplies: { label: string; value: string }[] } | null {
  const clean = message.toLowerCase().trim();

  // 1. Direct Keyword / Phrase Substring Matching
  for (const item of TECHNICAL_KNOWLEDGE) {
    const isMatched = item.keywords.some((kw) => clean.includes(kw));
    if (isMatched) {
      return {
        response: item.response,
        quickReplies: item.quickReplies,
      };
    }
  }

  // 2. Intelligent Multi-Token Semantic Concept Matching
  // Menangani variasi kalimat bebas seperti: "apakah jika ram tidak sesuai akan jadi error pada pc?"
  const hasRam = /\b(ram|memori|memory|keping|dimm)\b/i.test(clean);
  const hasRamMismatch = /\b(tidak sesuai|tidak cocok|salah|beda|berbeda|campur|incompatible|bentrok|tertukar|gak cocok|kurang cocok|tidak pas|gak pas|ketinggian|kekecilan)\b/i.test(clean);
  const hasRamError = /\b(error|rusak|masalah|kendala|bsod|blue\s*screen|bluescreen|mati|hang|freeze|restart|beep|no\s*display|gagal|kenapa|dampak|efek|akibat|bahaya)\b/i.test(clean);

  if (hasRam && (hasRamMismatch || hasRamError)) {
    return {
      response: TECHNICAL_KNOWLEDGE[0].response,
      quickReplies: TECHNICAL_KNOWLEDGE[0].quickReplies,
    };
  }

  // PSU & Kebutuhan Daya / Risiko Kurang Daya
  const hasPsu = /\b(psu|power supply|watt|daya|listrik)\b/i.test(clean);
  const hasPowerIssue = /\b(cukup|aman|kurang|kekecilan|kecil|lemah|drop|mati sendiri|overheat|spike|lonjakan|meledak|kuat|kuat gak|sanggup|ngangkat|efek|dampak|bahaya|resiko|risiko)\b/i.test(clean);

  if (hasPsu && hasPowerIssue) {
    return {
      response: TECHNICAL_KNOWLEDGE[1].response,
      quickReplies: TECHNICAL_KNOWLEDGE[1].quickReplies,
    };
  }

  // Bottleneck & Resolusi CPU vs GPU
  const hasBottleneck = /\b(bottleneck|leher botol|terhambat|timpang|seimbang|imbang)\b/i.test(clean);
  const hasCpuGpu = /\b(cpu|prosesor)\b/i.test(clean) && /\b(gpu|vga|kartu grafis)\b/i.test(clean);

  if (hasBottleneck || (hasCpuGpu && /\b(1080p|1440p|4k|resolusi|drop|fps)\b/i.test(clean))) {
    return {
      response: TECHNICAL_KNOWLEDGE[2].response,
      quickReplies: TECHNICAL_KNOWLEDGE[2].quickReplies,
    };
  }

  // Socket CPU vs Motherboard Compatibility
  const hasSocket = /\b(socket|am4|am5|lga1700|lga1200|lga1151|lga1155)\b/i.test(clean);
  const hasMobo = /\b(motherboard|mobo|mainboard)\b/i.test(clean);
  if ((hasSocket && hasMobo) || (hasSocket && /\b(cocok|pasang|bisa|masuk|beda)\b/i.test(clean))) {
    return {
      response: TECHNICAL_KNOWLEDGE[4].response,
      quickReplies: TECHNICAL_KNOWLEDGE[4].quickReplies,
    };
  }

  // Casing & Form Factor
  const hasCase = /\b(casing|case|chassis)\b/i.test(clean);
  const hasFormFactor = /\b(atx|matx|micro atx|mini itx|muat|kesempitan|ukuran)\b/i.test(clean);
  if (hasCase && hasFormFactor) {
    return {
      response: TECHNICAL_KNOWLEDGE[7].response,
      quickReplies: TECHNICAL_KNOWLEDGE[7].quickReplies,
    };
  }

  // Storage NVMe vs SATA
  const hasStorage = /\b(nvme|m\.2|ssd sata|sata ssd|hdd|hardisk|harddisk)\b/i.test(clean);
  if (hasStorage && /\b(beda|perbedaan|bagus mana|kecepatan|speed|gaming)\b/i.test(clean)) {
    return {
      response: TECHNICAL_KNOWLEDGE[10].response,
      quickReplies: TECHNICAL_KNOWLEDGE[10].quickReplies,
    };
  }

  // Suhu / Thermal Paste
  const hasThermal = /\b(panas|suhu|overheat|thermal paste|cooler|dingin|kipas)\b/i.test(clean);
  if (hasThermal) {
    return {
      response: TECHNICAL_KNOWLEDGE[6].response,
      quickReplies: TECHNICAL_KNOWLEDGE[6].quickReplies,
    };
  }

  // VRAM GPU
  const hasVram = /\b(vram|video ram)\b/i.test(clean);
  if (hasVram && /\b(berapa|cukup|butuh|game|8gb|12gb|16gb)\b/i.test(clean)) {
    return {
      response: TECHNICAL_KNOWLEDGE[8].response,
      quickReplies: TECHNICAL_KNOWLEDGE[8].quickReplies,
    };
  }

  // Upgrade Priority
  const hasUpgrade = /\b(upgrade|ganti dulu|mending|prioritas)\b/i.test(clean);
  if (hasUpgrade && (/\b(cpu|gpu|vga|prosesor)\b/i.test(clean))) {
    return {
      response: TECHNICAL_KNOWLEDGE[9].response,
      quickReplies: TECHNICAL_KNOWLEDGE[9].quickReplies,
    };
  }

  // Perawatan PC
  const hasCare = /\b(rawat|perawatan|awet|tahan lama|bersihin|debu)\b/i.test(clean);
  if (hasCare) {
    return {
      response: TECHNICAL_KNOWLEDGE[12].response,
      quickReplies: TECHNICAL_KNOWLEDGE[12].quickReplies,
    };
  }

  // Aturan Deduktif Prolog
  const hasProlog = /\b(prolog|horn clause|inferensi|aturan prolog|deduksi|pakar_pc\.pl)\b/i.test(clean);
  if (hasProlog) {
    return {
      response: TECHNICAL_KNOWLEDGE[13].response,
      quickReplies: TECHNICAL_KNOWLEDGE[13].quickReplies,
    };
  }

  return null;
}
