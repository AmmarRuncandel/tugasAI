import { NextRequest } from "next/server";
import { executeProlog } from "@/lib/prolog";
import { ALL_COMPONENTS, BUILD_PRESETS, QUICK_PROMPTS } from "@/lib/constants";
import { BuildRecommendation, CompatibilityAnalysis, PCComponent } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";
import { matchTechnicalAnalysis } from "@/lib/chat_knowledge";
import { isGeminiAvailable, askGeminiExpert } from "@/lib/gemini";

interface SearchResult {
  query: string;
  totalMatches: number;
  results: PCComponent[];
  isAlternative?: boolean;
}

function searchComponentKnowledgeBase(message: string): SearchResult | null {
  const lower = message.toLowerCase();

  // Bersihkan stop words pencarian
  const clean = lower
    .replace(/[?,.!/\\()]/g, " ")
    .replace(/\b(berapa|harga|biaya|info|spek|spesifikasi|dong|kah|apakah|ada|gak|nggak|tidak|ya|tentang|komponen|tolong|cek|bisa|kasih|tahu|tau|di|json|dataset|kb|produk|daftar|katalog)\b/gi, "")
    .trim();

  if (!clean || clean.length < 2) return null;

  const words = clean.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return null;

  // 1. Pencarian persis (seluruh kata kunci cocok)
  let matches = ALL_COMPONENTS.filter((c) => {
    const text = `${c.nama} ${c.brand} ${c.id} ${c.spesifikasi} ${c.kategori}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });

  let isAlternative = false;

  // 2. Jika tidak ada kecocokan persis, cari alternatif terdekat
  if (matches.length === 0 && words.length > 1) {
    matches = ALL_COMPONENTS.filter((c) => {
      const text = `${c.nama} ${c.brand} ${c.id} ${c.spesifikasi} ${c.kategori}`.toLowerCase();
      const matchCount = words.filter((w) => text.includes(w)).length;
      return matchCount >= Math.ceil(words.length / 2);
    });
    if (matches.length > 0) {
      isAlternative = true;
    }
  }

  if (matches.length === 0) return null;

  return {
    query: clean,
    totalMatches: matches.length,
    results: matches.slice(0, 5),
    isAlternative,
  };
}

interface BudgetExpectation {
  raw: string;
  min?: number;
  max?: number;
  target?: number;
}

function extractUserBudgetExpectation(message: string, selectedKebutuhan?: string): BudgetExpectation | null {
  const lower = message.toLowerCase();

  // Pola rentang angka: "5-8 juta", "5 - 8 juta", "5 sampai 8 jt", dll.
  const rangeMatch = lower.match(/(\d+)(?:[.,]\d+)?\s*(?:-|sampai|hingga|\/)\s*(\d+)(?:[.,]\d+)?\s*(?:jt|juta|million)/i);
  if (rangeMatch) {
    const min = parseFloat(rangeMatch[1]) * 1_000_000;
    const max = parseFloat(rangeMatch[2]) * 1_000_000;
    return { min, max, raw: `Rp ${rangeMatch[1]} - ${rangeMatch[2]} Juta` };
  }

  // Pola tunggal: "5 juta", "10jt", "8 juta", "budget 7 juta", dll.
  const singleMatch = lower.match(/(?:budget|dana|biaya|harga|rp)?\s*(\d+)(?:[.,]\d+)?\s*(?:jt|juta)/i);
  if (singleMatch) {
    const val = parseFloat(singleMatch[1]) * 1_000_000;
    return { target: val, raw: `Rp ${singleMatch[1]} Juta` };
  }

  // Pemetaan dari preset kebutuhan jika user mengeklik preset
  if (lower.includes("office_coding") || selectedKebutuhan === "office_coding") {
    return { min: 5_000_000, max: 8_000_000, raw: "Rp 5 - 8 Juta" };
  }
  if (lower.includes("esports_gaming") || selectedKebutuhan === "esports_gaming") {
    return { min: 9_000_000, max: 13_000_000, raw: "Rp 9 - 13 Juta" };
  }
  if (lower.includes("intel_arc") || selectedKebutuhan === "intel_arc_edition") {
    return { min: 10_000_000, max: 12_000_000, raw: "Rp 10 - 12 Juta" };
  }
  if (lower.includes("aaa_gaming") || selectedKebutuhan === "aaa_gaming") {
    return { min: 15_000_000, max: 20_000_000, raw: "Rp 15 - 20 Juta" };
  }
  if (lower.includes("content_creation") || selectedKebutuhan === "content_creation") {
    return { min: 22_000_000, max: 30_000_000, raw: "Rp 22 - 30 Juta" };
  }

  return null;
}

function generateBudgetNotes(exp: BudgetExpectation | null, actualTotal: number): string {
  if (!exp) return "";

  const maxBound = exp.max ?? (exp.target ? exp.target * 1.15 : null);
  const minBound = exp.min ?? (exp.target ? exp.target * 0.85 : null);

  if (maxBound && actualTotal > maxBound) {
    return (
      `Anda menargetkan perkiraan budget ${exp.raw}, namun kombinasi 7 komponen hardware fisik lengkap (CPU, Motherboard, RAM, GPU, PSU, SSD, Casing) yang lolos aturan deduksi logika SWI-Prolog saat ini berjumlah ${formatRupiah(actualTotal)}.\n\n` +
      `Hasil ini belum dapat memenuhi target anggaran Anda secara persis akibat keterbatasan variasi stok komponen low-end pada 946 dataset Kaggle referensi. Demi mencegah risiko bottleneck dan kegagalan daya, sistem memilih kombinasi komponen fisik terdekat yang terbukti 100% kompatibel dan aman.`
    );
  }

  if (minBound && actualTotal < minBound) {
    return (
      `Total konfigurasi yang dihasilkan berada pada ${formatRupiah(actualTotal)}, lebih ekonomis dibanding batas anggaran yang Anda harapkan (${exp.raw}). Sisa anggaran dapat dialokasikan untuk peripheral tambahan atau upgrade monitor.`
    );
  }

  return "";
}

function parseBuildResult(output: string): BuildRecommendation | null {
  const line = output.split("\n").find((l) => l.startsWith("RESULT_BUILD:"));
  if (!line) return null;

  const parts = line.replace("RESULT_BUILD:", "").split("|");
  if (parts.length < 16) return null;

  const [
    kebutuhan,
    cpu,
    namaCpu,
    mobo,
    namaMobo,
    ram,
    namaRam,
    gpu,
    namaGpu,
    psu,
    namaPsu,
    storage,
    namaStorage,
    casing,
    namaCasing,
    totalHargaStr,
  ] = parts;

  const justifikasiLine = output
    .split("\n")
    .find((l) => l.startsWith("JUSTIFIKASI:"))
    ?.replace("JUSTIFIKASI:", "")
    .trim() ?? "Komponen lolos verifikasi kompatibilitas logika.";

  const preset = BUILD_PRESETS.find((p) => p.id === kebutuhan);

  return {
    kebutuhan,
    labelKebutuhan: preset?.nama ?? kebutuhan,
    cpu,
    namaCpu,
    mobo,
    namaMobo,
    ram,
    namaRam,
    gpu,
    namaGpu,
    psu,
    namaPsu,
    storage,
    namaStorage,
    casing,
    namaCasing,
    totalHarga: parseInt(totalHargaStr, 10) || 0,
    justifikasi: justifikasiLine,
  };
}

function parseCheckResult(output: string): CompatibilityAnalysis | null {
  const line = output.split("\n").find((l) => l.startsWith("RESULT_CHECK:"));
  if (!line) return null;

  const parts = line.replace("RESULT_CHECK:", "").split("|");
  if (parts.length < 3) return null;

  const [status, totalHargaStr, alasanRaw] = parts;

  // Parse alasan Prolog: [alasan1, alasan2, ...]
  const alasanList = alasanRaw
    .replace(/[\[\]]/g, "")
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter((s) => s && s !== "ok");

  return {
    status: status === "kompatibel" ? "kompatibel" : "tidak_kompatibel",
    totalHarga: parseInt(totalHargaStr, 10) || 0,
    alasan: alasanList.length > 0 ? alasanList : ["Seluruh komponen saling kompatibel dan lolos uji daya PSU."],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, kebutuhan, message, cpu, mobo, ram, gpu, psu, casing } = body;

    // 1. Aksi: Cek Kompatibilitas Kustom
    if (action === "check_compatibility") {
      if (!cpu || !mobo || !ram || !gpu || !psu) {
        return Response.json(
          { error: "Harap pilih minimal CPU, Motherboard, RAM, GPU, dan PSU." },
          { status: 400 }
        );
      }

      const caseSelected = casing || "case_atx_mid";
      const query = `batch_cek_kompatibilitas(${cpu}, ${mobo}, ${ram}, ${gpu}, ${psu}, ${caseSelected})`;
      const rawOutput = await executeProlog(query);
      const compatibility = parseCheckResult(rawOutput);

      return Response.json({
        success: true,
        type: "compatibility",
        compatibility,
        rawOutput,
      });
    }

    // 2. Aksi: Analisis Masalah Teknis Komputer & Pertanyaan Edukasi Kompatibilitas
    if (message) {
      const technicalMatch = matchTechnicalAnalysis(message);
      if (technicalMatch) {
        return Response.json({
          success: true,
          type: "technical_analysis",
          message: technicalMatch.response,
          quickReplies: technicalMatch.quickReplies,
        });
      }

      const lower = message.toLowerCase();

      // Cek apakah user menanyakan rakitan umum tanpa menyebutkan budget/tier spesifik
      const isGenericBuildPrompt =
        /^(ingin rakit pc|mau rakit pc|rekomendasi pc|rakit pc|bantu rakit pc|rekomendasikan rakitan pc|konsultasi rakit pc|mau build pc|panduan rakit pc)$/i.test(lower.trim()) ||
        (lower.includes("rakit pc") && !lower.includes("juta") && !lower.includes("esport") && !lower.includes("arc") && !lower.includes("am5") && !lower.includes("office") && !lower.includes("flagship") && !lower.includes("editing"));

      if (isGenericBuildPrompt && !kebutuhan) {
        return Response.json({
          success: true,
          type: "build_guidance",
          message:
            `**Halo! Saya siap merumuskan rakitan PC paling optimal dan 100% kompatibel di SWI-Prolog.**\n\n` +
            `Agar penalaran logika Prolog dapat memilih kombinasi komponen yang presisi dari **946 dataset Kaggle**, silakan tentukan **kisaran budget** atau **tujuan utama penggunaan PC** kamu:`,
          quickReplies: [
            { label: "Budget 5 - 8 Juta (Office & Coding)", value: "rekomendasi office_coding", isInputChoice: true, desc: "PC hemat daya untuk kerja harian & multitasking" },
            { label: "Budget 9 - 13 Juta (Esports 1080p)", value: "rekomendasi esports_gaming", isInputChoice: true, desc: "1080p High FPS untuk Valorant, CS2, Dota 2" },
            { label: "Budget 10 - 12 Juta (Intel Arc Edition)", value: "rekomendasi intel_arc_edition", isInputChoice: true, desc: "AV1 Hardware Encoding & Value Terbaik" },
            { label: "Budget 15 - 20 Juta (AAA 1440p AM5)", value: "rekomendasi aaa_gaming", isInputChoice: true, desc: "Platform masa depan AMD AM5 + RAM DDR5" },
            { label: "Budget 22 - 30 Juta (4K Video Editing)", value: "rekomendasi content_creation", isInputChoice: true, desc: "Multi-core rendering & Timeline 4K mulus" },
            { label: "Budget > 35 Juta (Ultimate Flagship)", value: "rekomendasi enthusiast_flagship", isInputChoice: true, desc: "GPU kasta tertinggi & Performa tanpa kompromi" },
          ],
        });
      }

      // Cek Harga & Informasi Komponen Spesifik (Question Answering)
      const isExplicitBuild =
        /\b(rakit|build|racik|rekomendasi|simulasi|kombinasi|fullset|set\s+pc|budget)\b/i.test(lower) &&
        !/\b(berapa|harga|biaya|spek|spesifikasi|cek\s+harga)\b/i.test(lower);

      const isPriceOrInfoInquiry =
        /\b(harga|berapa|biaya|spek|spesifikasi|cek|info|apakah\s+ada|ada\s+gak|ada\s+nggak|ada\s+tidak|cari|katalog|tanya)\b/i.test(lower) ||
        !isExplicitBuild;

      if (!kebutuhan && isPriceOrInfoInquiry && !isExplicitBuild) {
        const search = searchComponentKnowledgeBase(message);

        if (search && search.results.length > 0) {
          let text = "";
          const count = search.totalMatches;

          if (count === 1) {
            const c = search.results[0];
            text =
              `**Ditemukan Komponen di Basis Pengetahuan (Kaggle Dataset):**\n\n` +
              `**${c.nama}**\n` +
              `• Kategori: **${c.kategori.toUpperCase()}** (${c.brand})\n` +
              `• Estimasi Harga Pasar: **${formatRupiah(c.harga)}**\n` +
              `• Spesifikasi Teknis: ${c.spesifikasi}\n` +
              `• Kode Prolog: \`${c.id}\`\n\n`;

            if (c.kategori === "cpu") {
              text += `*Penalaran Logika Prolog:* Prosesor ini harus dipasangkan pada Motherboard dengan socket yang identik sesuai aturan Horn clause \`cocok_cpu_mobo/2\`.`;
            } else if (c.kategori === "gpu") {
              text += `*Penalaran Logika Prolog:* Kartu grafis ini mewajibkan kapasitas daya minimum PSU terpenuhi sesuai aturan \`daya_psu_cukup/2\` untuk mencegah lonjakan daya saat beban kerja penuh.`;
            } else if (c.kategori === "motherboard") {
              text += `*Penalaran Logika Prolog:* Perhatikan dukungan slot RAM (DDR4 vs DDR5) dan ukuran casing (ATX vs mATX) saat memilih motherboard ini.`;
            } else if (c.kategori === "ram") {
              text += `*Penalaran Logika Prolog:* Pastikan motherboard kamu mendukung slot generasi yang sama (aturan \`cocok_mobo_ram/2\`).`;
            } else if (c.kategori === "psu") {
              text += `*Penalaran Logika Prolog:* Kapasitas daya PSU ini akan dibandingkan dengan kebutuhan minimum kartu grafis (GPU) dalam aturan \`daya_psu_cukup/2\`.`;
            }
          } else {
            text = `**Ditemukan ${count} komponen yang sesuai di Basis Pengetahuan:**\n\n`;
            search.results.forEach((c, idx) => {
              text +=
                `${idx + 1}. **${c.nama}**\n` +
                `   • Kategori: ${c.kategori.toUpperCase()} | Brand: ${c.brand}\n` +
                `   • Harga: **${formatRupiah(c.harga)}**\n` +
                `   • Spek: ${c.spesifikasi}\n\n`;
            });

            if (count > 5) {
              text += `*(Menampilkan 5 teratas dari ${count} komponen terkait)*\n\n`;
            }
            text += `*Tips:* Kamu bisa menguji komponen ini di **Kalkulator Kompatibilitas** (tab atas) atau minta saya merakitkan PC lengkap dengan menyebutkan budget kamu!`;
          }

          if (search.isAlternative) {
            text =
              `> ⚠️ **Catatan Keterbatasan Basis Data:**\n` +
              `> Komponen spesifik yang Anda cari ("${search.query}") belum terdaftar secara persis di katalog 946 hardware Kaggle kami. Kecerdasan sistem pakar menampilkan alternatif terdekat yang kompatibel untuk pertimbangan Anda:\n\n` +
              text;
          }

          return Response.json({
            success: true,
            type: "component_info",
            message: text,
            quickReplies: [
              { label: "Buatkan Rakitan PC Gaming", value: "rekomendasi esports_gaming" },
              { label: "Buatkan Rakitan PC Intel Arc", value: "rekomendasi intel_arc_edition" },
              { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
            ],
          });
        }

        const cleanQuery = lower
          .replace(/[?,.!/\\()]/g, " ")
          .replace(/\b(berapa|harga|biaya|info|spek|spesifikasi|dong|kah|apakah|ada|gak|nggak|tidak|ya|tentang|komponen|tolong|cek|bisa|kasih|tahu|tau|di|json|dataset|kb|produk|daftar|katalog)\b/gi, "")
          .trim();

        const isExplicitComponentInquiry = /\b(harga|berapa|biaya|cari|katalog|stok|apakah\s+ada|ada\s+gak|ada\s+nggak|ada\s+tidak|spek|spesifikasi)\b/i.test(lower);

        // Jika user secara eksplisit mencari komponen tapi tidak ditemukan di dataset
        if (!search && cleanQuery.length >= 3 && isExplicitComponentInquiry) {
          return Response.json({
            success: true,
            type: "component_not_found",
            message:
              `Mohon maaf, komponen atau spesifikasi hardware **"${cleanQuery}"** belum tercatat di dalam **946 katalog dataset Kaggle** sistem kami saat ini.\n\n` +
              `> **Catatan Keterbatasan Basis Data:**\n` +
              `> Basis pengetahuan sistem pakar 212 memuat 946 komponen fisik hasil ekstraksi dataset referensi resmi (CPU, Motherboard, RAM DDR4/DDR5, GPU RTX/RX/Arc, PSU, SSD NVMe, Casing). Karena batasan cakupan katalog saat ini, varian atau seri komponen yang Anda tanyakan belum terdaftar.\n\n` +
              `Silakan coba sebutkan kata kunci komponen lain (misalnya: *Ryzen 5 5600X*, *RTX 4060*, *RAM Corsair*, *Motherboard B650M*, *PSU 650W*), atau pilih salah satu rekomendasi rakitan di bawah ini:`,
            quickReplies: [
              { label: "Cek Rakitan Gaming 1080p", value: "rekomendasi esports_gaming" },
              { label: "Cek Rakitan 1440p AM5", value: "rekomendasi aaa_gaming" },
              { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
            ],
          });
        }

        // Jika user secara umum menanyakan apakah bisa cek harga komponen
        if (/\b(harga|tanya|bisa|ada|json|dataset|komponen)\b/i.test(lower) && !search) {
          return Response.json({
            success: true,
            type: "component_info",
            message:
              `Tentu saja bisa! Basis data sistem pakar kami memuat **946 komponen hardware** (CPU, GPU, Motherboard, RAM, PSU, SSD, Casing) yang diekstrak langsung dari dataset Kaggle dengan harga Rupiah (IDR).\n\n` +
              `Anda dapat langsung menyebutkan nama komponen yang ingin Anda cek harganya, misalnya:\n` +
              `• *"Berapa harga Ryzen 5 3600?"*\n` +
              `• *"Harga Intel Arc A750 berapa?"*\n` +
              `• *"Berapa harga RTX 4070?"*\n` +
              `• *"Berapa harga RAM Corsair DDR4 16GB?"*\n` +
              `• *"Harga motherboard B650M?"*\n\n` +
              `Silakan ketik nama komponen yang ingin Anda tanyakan!`,
            quickReplies: [
              { label: "Cek Harga Intel Arc A750", value: "berapa harga Intel Arc A750" },
              { label: "Cek Harga Ryzen 5 3600", value: "berapa harga Ryzen 5 3600" },
              { label: "Cek Harga RTX 4070", value: "berapa harga RTX 4070" },
            ],
          });
        }
      }
    }

    // 3. Aksi: Rekomendasi Rakitan (Explicit kebutuhan atau deteksi keyword pesan)
    let selectedKebutuhan = kebutuhan;

    if (!selectedKebutuhan && message) {
      const lower = message.toLowerCase();
      if (lower.includes("intel arc") || lower.includes("arc") || lower.includes("a750") || lower.includes("a580") || lower.includes("a770") || lower.includes("a380")) {
        selectedKebutuhan = "intel_arc_edition";
      } else if (lower.includes("sultan") || lower.includes("flagship") || lower.includes("3090") || lower.includes("4080") || lower.includes("35 juta") || lower.includes("40 juta")) {
        selectedKebutuhan = "enthusiast_flagship";
      } else if (lower.includes("edit") || lower.includes("render") || lower.includes("content") || lower.includes("blender") || lower.includes("workstation") || lower.includes("25 juta") || lower.includes("22 juta") || lower.includes("30 juta")) {
        selectedKebutuhan = "content_creation";
      } else if (lower.includes("1440p") || lower.includes("aaa") || lower.includes("am5") || lower.includes("cyberpunk") || lower.includes("15 juta") || lower.includes("20 juta")) {
        selectedKebutuhan = "aaa_gaming";
      } else if (lower.includes("office") || lower.includes("coding") || lower.includes("pelajar") || lower.includes("santai") || lower.includes("5 juta") || lower.includes("6 juta") || lower.includes("7 juta") || lower.includes("5-8 juta")) {
        selectedKebutuhan = "office_coding";
      } else if (lower.includes("game") || lower.includes("gaming") || lower.includes("valorant") || lower.includes("esport") || lower.includes("10 juta") || lower.includes("12 juta") || lower.includes("8 juta") || lower.includes("hemat")) {
        selectedKebutuhan = "esports_gaming";
      } else {
        // Cek apakah ada indikasi kata kunci build / komputer
        const isBuildKeyword = /\b(rakit|build|racik|rekomendasi|simulasi|kombinasi|fullset|set\s+pc|budget|komputer|hardware|spek|spesifikasi)\b/i.test(lower);
        if (isBuildKeyword) {
          selectedKebutuhan = "esports_gaming";
        } else {
          // Jika GEMINI_API_KEY disetel di environment, delegasikan ke Generative AI
          if (isGeminiAvailable()) {
            const geminiRes = await askGeminiExpert(message);
            if (geminiRes.status === "success" && geminiRes.text) {
              return Response.json({
                success: true,
                type: "generative_ai",
                message: geminiRes.text,
                quickReplies: geminiRes.quickReplies,
              });
            }

            if (geminiRes.status === "quota_exhausted") {
              return Response.json({
                success: true,
                type: "quota_fallback",
                message:
                  `Mohon maaf, saat ini kapasitas kuota layanan Generative AI (Google Gemini Free Tier) sedang mencapai batas pemakaian sementara (*Rate Limit*). Layanan pemrosesan bahasa luas ini akan pulih kembali secara otomatis dalam beberapa saat.\n\n` +
                  `> **Status Layanan Sistem:**\n` +
                  `> Antrean permintaan per menit (*Requests Per Minute*) pada penyedia AI eksternal sedang padat. Namun, seluruh fungsi sistem pakar lokal kami tetap beroperasi 100% tanpa gangguan.\n\n` +
                  `Anda tetap dapat memanfaatkan seluruh fitur utama sistem pakar PCExpert AI secara instan dan tanpa batasan kuota:\n` +
                  `• Verifikasi Kompatibilitas Hardware via mesin inferensi SWI-Prolog\n` +
                  `• Rekomendasi Rakitan PC sesuai tier anggaran (Rp 5 juta - Rp 40 juta)\n` +
                  `• Pemeriksaan spesifikasi dan estimasi harga 946 komponen fisik nyata (Dataset Kaggle)\n\n` +
                  `Silakan pilih salah satu menu navigasi di bawah ini:`,
                quickReplies: [
                  { label: "Cek Rakitan Gaming 1080p", value: "rekomendasi esports_gaming" },
                  { label: "Uji Kompatibilitas Komponen", value: "cek_kompatibilitas" },
                  { label: "Cek Panduan Tier Budget PC", value: "panduan memilih tier budget rakit pc" },
                  { label: "Katalog Komponen Hardware", value: "tanya harga komponen" },
                ],
              });
            }
          }

          return Response.json({
            success: true,
            type: "unknown_inquiry",
            message:
              `Mohon maaf, model AI dan sistem pakar PCExpert AI saat ini belum memiliki data atau aturan inferensi yang spesifik mengenai topik tersebut.\n\n` +
              `> **Catatan Keterbatasan Pengetahuan & Dataset:**\n` +
              `> Sistem kami dikembangkan secara khusus untuk berfokus pada domain **perakitan PC, verifikasi kompatibilitas 946 komponen hardware nyata (Dataset Kaggle)**, kaidah logika **SWI-Prolog**, serta analisis teknis hardware komputer (seperti manajemen RAM, form factor casing, dan kapasitas daya PSU).\n\n` +
              `Silakan coba tanyakan hal-hal terkait spesifikasi komponen, konsultasi masalah hardware, atau pilih salah satu menu saran di bawah ini:`,
            quickReplies: [
              { label: "Panduan Memilih Budget Rakit PC", value: "panduan memilih tier budget rakit pc" },
              { label: "Apakah 2 RAM Beda Bikin Bottleneck?", value: "apakah ram beda speed atau beda tipe menyebabkan bottleneck?" },
              { label: "Cek Harga Komponen Hardware", value: "tanya harga komponen" },
              { label: "Uji Kompatibilitas Hardware", value: "cek_kompatibilitas" },
            ],
          });
        }
      }
    }

    if (!selectedKebutuhan) {
      selectedKebutuhan = "esports_gaming";
    }

    const query = `batch_rekomendasi(${selectedKebutuhan})`;
    const rawOutput = await executeProlog(query);
    const recommendation = parseBuildResult(rawOutput);

    if (!recommendation) {
      return Response.json({
        success: false,
        message:
          "Mohon maaf, sistem inferensi SWI-Prolog saat ini belum menemukan kombinasi komponen yang memenuhi seluruh batasan (constraints) tersebut di dalam basis data. Coba sesuaikan kriteria budget atau pilih salah satu rekomendasi cepat yang tersedia.",
        rawOutput,
      });
    }

    // Evaluasi deviasi anggaran pengguna vs ketersediaan komponen di dataset Kaggle
    const userBudgetExp = extractUserBudgetExpectation(message || "", selectedKebutuhan);
    const budgetNotes = generateBudgetNotes(userBudgetExp, recommendation.totalHarga);
    if (budgetNotes) {
      recommendation.notes = budgetNotes;
    }

    let responseMessage = "Berdasarkan penalaran logika deduktif SWI-Prolog, ini adalah konfigurasi rakitan paling seimbang dan 100% kompatibel untuk kebutuhan kamu:";
    if (budgetNotes) {
      responseMessage += `\n\n> ⚠️ **Catatan Penyesuaian Anggaran & Keterbatasan Basis Data:**\n> ${budgetNotes.replace(/\n\n/g, "\n> ")}`;
    }

    // Contextual follow-up quick replies sesuai tier rakitan yang diberikan
    const followUpsByTier: Record<string, { label: string; value: string }[]> = {
      esports_gaming: [
        { label: "Cek Rakitan 1440p AM5 (AM5 DDR5)", value: "rekomendasi aaa_gaming" },
        { label: "Cek Alternatif Intel Arc A750", value: "rekomendasi intel_arc_edition" },
        { label: "Apakah PSU 550W Cukup Aman?", value: "apakah psu 500w cukup untuk rtx 3070 atau 4060?" },
        { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
      ],
      aaa_gaming: [
        { label: "Lihat Rakitan Flagship 4K (>35 Jt)", value: "rekomendasi enthusiast_flagship" },
        { label: "Cek Rakitan Video Editing 4K", value: "rekomendasi content_creation" },
        { label: "Kenapa Socket AM4 Beda dengan AM5?", value: "kenapa socket am4 tidak bisa menggunakan ram ddr5?" },
        { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
      ],
      office_coding: [
        { label: "Upgrade ke Rakitan Gaming 1080p", value: "rekomendasi esports_gaming" },
        { label: "Beda SATA SSD vs NVMe M.2", value: "apa perbedaan sata ssd vs nvme m.2 untuk gaming?" },
        { label: "Panduan Memilih Budget PC", value: "panduan memilih tier budget rakit pc" },
      ],
      content_creation: [
        { label: "Cek Rakitan Flagship RTX 3090", value: "rekomendasi enthusiast_flagship" },
        { label: "Bottleneck CPU vs GPU di Resolusi Tinggi", value: "bagaimana bottleneck cpu dan gpu bekerja pada resolusi 1080p vs 4k?" },
        { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
      ],
      intel_arc_edition: [
        { label: "Cek Spek Gaming Esports 1080p", value: "rekomendasi esports_gaming" },
        { label: "Cek Spek 1440p AM5", value: "rekomendasi aaa_gaming" },
        { label: "Cek Harga Intel Arc A750 di Dataset", value: "berapa harga intel arc a750" },
      ],
      enthusiast_flagship: [
        { label: "Analisis Bottleneck 4K Gaming", value: "bagaimana bottleneck cpu dan gpu bekerja pada resolusi 1080p vs 4k?" },
        { label: "Berapa VRAM Ideal Game Modern?", value: "berapa vram gpu yang dibutuhkan untuk gaming modern?" },
        { label: "Tips Perawatan PC Agar Awet", value: "tips perawatan pc rakitan agar awet dan tidak cepat rusak" },
      ],
    };

    return Response.json({
      success: true,
      type: "recommendation",
      message: responseMessage,
      recommendation,
      rawOutput,
      quickReplies: followUpsByTier[selectedKebutuhan] || [
        { label: "Rekomendasi Esports Gaming", value: "rekomendasi esports_gaming" },
        { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
      ],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ error: message }, { status: 500 });
  }
}
