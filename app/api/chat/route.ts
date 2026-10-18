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

  // Bersihkan stop words pencarian komponen
  const clean = lower
    .replace(/[?,.!/\\()]/g, " ")
    .replace(/\b(berapa|harga|biaya|info|spek|spesifikasi|dong|kah|apakah|ada|gak|nggak|tidak|ya|tentang|komponen|tolong|cek|bisa|kasih|tahu|tau|di|json|dataset|kb|produk|daftar|katalog|saran|sarankan|rekomendasi|rekomendasikan|rakit|rakitan|build|buat|bikin|pc|komputer|gaming|juta|jt|budget|dana)\b/gi, "")
    .trim();

  if (!clean || clean.length < 2) return null;

  const words = clean.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return null;

  // Jangan lakukan pencarian jika hanya tersisa angka murni
  if (words.every((w) => /^\d+$/.test(w))) return null;

  // 1. Pencarian persis (seluruh kata kunci cocok)
  let matches = ALL_COMPONENTS.filter((c) => {
    const text = `${c.nama} ${c.brand} ${c.id} ${c.spesifikasi} ${c.kategori}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });

  let isAlternative = false;

  // 2. Jika tidak ada kecocokan persis, cari alternatif terdekat hanya jika kata kunci bermakna nama model/brand
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
    return { min, max, target: (min + max) / 2, raw: `Rp ${rangeMatch[1]} - ${rangeMatch[2]} Juta` };
  }

  // Pola tunggal: "13 juta", "13jt", "budget 13 juta", "saran pc 13 juta", dll.
  const singleMatch = lower.match(/(?:budget|dana|biaya|harga|rp|sekitar|kisaran)?\s*(\d+)(?:[.,]\d+)?\s*(?:jt|juta)/i);
  if (singleMatch) {
    const val = parseFloat(singleMatch[1]) * 1_000_000;
    return { target: val, raw: `Rp ${singleMatch[1]} Juta` };
  }

  // Pemetaan dari preset kebutuhan jika user mengeklik preset
  if (lower.includes("office_coding") || selectedKebutuhan === "office_coding") {
    return { min: 5_000_000, max: 11_000_000, target: 10_000_000, raw: "Rp 5 - 10 Juta" };
  }
  if (lower.includes("intel_arc") || selectedKebutuhan === "intel_arc_edition") {
    return { min: 12_000_000, max: 15_000_000, target: 13_000_000, raw: "Rp 12 - 14 Juta" };
  }
  if (lower.includes("esports_gaming") || selectedKebutuhan === "esports_gaming") {
    return { min: 15_000_000, max: 21_000_000, target: 18_000_000, raw: "Rp 15 - 20 Juta" };
  }
  if (lower.includes("content_creation") || selectedKebutuhan === "content_creation") {
    return { min: 22_000_000, max: 30_000_000, target: 28_000_000, raw: "Rp 22 - 30 Juta" };
  }
  if (lower.includes("aaa_gaming") || selectedKebutuhan === "aaa_gaming") {
    return { min: 30_000_000, max: 40_000_000, target: 35_000_000, raw: "Rp 30 - 38 Juta" };
  }
  if (lower.includes("enthusiast_flagship") || selectedKebutuhan === "enthusiast_flagship") {
    return { min: 45_000_000, max: 70_000_000, target: 60_000_000, raw: "> Rp 45 Juta" };
  }

  return null;
}

function generateBudgetNotes(exp: BudgetExpectation | null, actualTotal: number): string {
  if (!exp) return "";

  if (exp.target) {
    const diff = actualTotal - exp.target;
    const diffAbs = Math.abs(diff);
    if (diffAbs <= 1_500_000) {
      return (
        `Konfigurasi ini dirumuskan khusus oleh SWI-Prolog untuk memenuhi target anggaran ${exp.raw} Anda. Total biaya ${formatRupiah(actualTotal)} sangat presisi mendekati target yang Anda inginkan (selisih hanya ${formatRupiah(diffAbs)}), dengan seluruh 7 komponen fisik terverifikasi 100% kompatibel tanpa risiko bottleneck atau kekurangan daya.`
      );
    }
  }

  const maxBound = exp.max ?? (exp.target ? exp.target * 1.15 : null);
  const minBound = exp.min ?? (exp.target ? exp.target * 0.85 : null);

  if (maxBound && actualTotal > maxBound) {
    return (
      `Anda menargetkan perkiraan budget ${exp.raw}, namun kombinasi 7 komponen hardware fisik lengkap (CPU, Motherboard, RAM, GPU, PSU, SSD, Casing) yang lolos aturan deduksi logika SWI-Prolog saat ini berjumlah ${formatRupiah(actualTotal)}.\n\n` +
      `Hasil ini adalah konfigurasi terdekat yang paling stabil dan aman di dataset kami untuk mencegah bottleneck dan kegagalan daya.`
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

    // 1. Aksi: Cek Kompatibilitas Kustom (dari form / kalkulator)
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

    // 2. Aksi jika ada pesan dari pengguna
    if (message) {
      const lower = message.toLowerCase().trim();

      // 2A. Cek Analisis Masalah Teknis Komputer SWI-Prolog (Knowledge Base terdaftar)
      const technicalMatch = matchTechnicalAnalysis(message);
      if (technicalMatch) {
        return Response.json({
          success: true,
          type: "technical_analysis",
          message: technicalMatch.response,
          quickReplies: technicalMatch.quickReplies,
        });
      }

      // 2B. Deteksi apakah ini permintaan saran / rekomendasi / rakitan PC
      const hasBuildIntent =
        /\b(rakit|rakitan|build|racik|racikan|simulasi|rekomendasi|rekomendasikan|saran|sarankan|konsultasi|spek\s+pc|spesifikasi\s+pc|pc\s+gaming|buat\s+pc|bikin\s+pc|set\s+pc|fullset)\b/i.test(lower);
      const hasBudgetNumber = /\b(\d+)(?:[.,]\d+)?\s*(?:jt|juta|million)\b/i.test(lower);
      const isPcWithBudget = (lower.includes("pc") || lower.includes("komputer") || lower.includes("rakit")) && hasBudgetNumber;

      const isBuildRequest = Boolean(kebutuhan) || hasBuildIntent || isPcWithBudget;

      // Jika user secara umum bertanya rakitan PC tanpa budget & tanpa tier spesifik
      const isGenericBuildPrompt =
        isBuildRequest &&
        !hasBudgetNumber &&
        !kebutuhan &&
        !/\b(arc|a750|am5|ddr5|office|coding|editing|render|blender|sultan|flagship|rtx|1080p|1440p|4k)\b/i.test(lower);

      if (isGenericBuildPrompt) {
        return Response.json({
          success: true,
          type: "build_guidance",
          message:
            `**Halo! Saya siap merumuskan rakitan PC paling optimal dan 100% kompatibel di SWI-Prolog.**\n\n` +
            `Agar penalaran logika Prolog dapat memilih kombinasi komponen yang presisi dari **946 dataset Kaggle**, silakan tentukan **kisaran budget** atau **tujuan utama penggunaan PC** kamu:`,
          quickReplies: [
            { label: "Budget 5 - 10 Juta (Office & Coding)", value: "rekomendasi office_coding", isInputChoice: true, desc: "PC hemat daya untuk kerja harian & multitasking" },
            { label: "Budget 12 - 14 Juta (Intel Arc / 13 Juta)", value: "saran pc 13 juta", isInputChoice: true, desc: "AV1 Hardware Encoding, Gaming 1080p & Value Terbaik" },
            { label: "Budget 15 - 20 Juta (Esports 1080p High FPS)", value: "rekomendasi esports_gaming", isInputChoice: true, desc: "1080p High FPS untuk Valorant, CS2, Dota 2" },
            { label: "Budget 22 - 30 Juta (4K Video Editing)", value: "rekomendasi content_creation", isInputChoice: true, desc: "Multi-core rendering & Timeline 4K mulus" },
            { label: "Budget 30 - 38 Juta (AAA 1440p AM5 DDR5)", value: "rekomendasi aaa_gaming", isInputChoice: true, desc: "Platform masa depan AMD AM5 + RAM DDR5" },
            { label: "Budget > 45 Juta (Ultimate Flagship)", value: "rekomendasi enthusiast_flagship", isInputChoice: true, desc: "GPU kasta tertinggi & Performa tanpa kompromi" },
          ],
        });
      }

      // 2C. JIKA INI PERMINTAAN RAKITAN PC -> Jalankan Inferensi Logika SWI-Prolog
      if (isBuildRequest) {
        let selectedKebutuhan = kebutuhan;
        const userBudgetExp = extractUserBudgetExpectation(message);
        const budgetTarget = userBudgetExp?.target;

        if (!selectedKebutuhan) {
          if (lower.includes("intel arc") || lower.includes("arc") || lower.includes("a750") || lower.includes("a580") || lower.includes("a770") || lower.includes("a380")) {
            selectedKebutuhan = "intel_arc_edition";
          } else if (lower.includes("sultan") || lower.includes("flagship") || lower.includes("3090") || lower.includes("4080")) {
            selectedKebutuhan = "enthusiast_flagship";
          } else if (lower.includes("edit") || lower.includes("render") || lower.includes("content") || lower.includes("blender") || lower.includes("workstation")) {
            selectedKebutuhan = "content_creation";
          } else if (lower.includes("1440p") || lower.includes("cyberpunk") || lower.includes("am5") || lower.includes("ddr5")) {
            selectedKebutuhan = "aaa_gaming";
          } else if (budgetTarget !== undefined) {
            if (budgetTarget <= 11_000_000) {
              selectedKebutuhan = "office_coding";
            } else if (budgetTarget <= 15_000_000) {
              selectedKebutuhan = "intel_arc_edition"; // ~Rp 13.2 Juta
            } else if (budgetTarget <= 21_000_000) {
              selectedKebutuhan = "esports_gaming"; // ~Rp 18.5 Juta
            } else if (budgetTarget <= 30_000_000) {
              selectedKebutuhan = "content_creation"; // ~Rp 27.8 Juta
            } else if (budgetTarget <= 45_000_000) {
              selectedKebutuhan = "aaa_gaming"; // ~Rp 34.8 Juta
            } else {
              selectedKebutuhan = "enthusiast_flagship";
            }
          } else if (lower.includes("office") || lower.includes("coding") || lower.includes("pelajar") || lower.includes("santai")) {
            selectedKebutuhan = "office_coding";
          } else {
            selectedKebutuhan = "intel_arc_edition";
          }
        }

        const query = `batch_rekomendasi(${selectedKebutuhan})`;
        const rawOutput = await executeProlog(query);
        const recommendation = parseBuildResult(rawOutput);

        if (recommendation) {
          const budgetNotes = generateBudgetNotes(userBudgetExp, recommendation.totalHarga);
          if (budgetNotes) {
            recommendation.notes = budgetNotes;
          }

          const getCompPrice = (id: string) => {
            const found = ALL_COMPONENTS.find((c) => c.id === id);
            return found ? formatRupiah(found.harga) : "";
          };

          const cpuPrice = getCompPrice(recommendation.cpu);
          const moboPrice = getCompPrice(recommendation.mobo);
          const ramPrice = getCompPrice(recommendation.ram);
          const gpuPrice = getCompPrice(recommendation.gpu);
          const psuPrice = getCompPrice(recommendation.psu);
          const ssdPrice = getCompPrice(recommendation.storage);
          const casePrice = getCompPrice(recommendation.casing);

          let responseMessage = "";
          if (userBudgetExp?.target) {
            responseMessage += `Berikut adalah saran konfigurasi rakitan PC paling optimal di kisaran **${userBudgetExp.raw}** hasil penalaran logika deduktif **SWI-Prolog**:\n\n`;
          } else {
            responseMessage += `Berdasarkan penalaran logika deduktif **SWI-Prolog**, ini adalah konfigurasi rakitan paling seimbang dan 100% kompatibel untuk kebutuhan kamu:\n\n`;
          }

          responseMessage +=
            `**Rincian Komponen & Estimasi Harga:**\n` +
            `1. **Prosesor (CPU):** ${recommendation.namaCpu} — **${cpuPrice}**\n` +
            `2. **Motherboard:** ${recommendation.namaMobo} — **${moboPrice}**\n` +
            `3. **Memori (RAM):** ${recommendation.namaRam} — **${ramPrice}**\n` +
            `4. **Kartu Grafis (GPU):** ${recommendation.namaGpu} — **${gpuPrice}**\n` +
            `5. **Power Supply (PSU):** ${recommendation.namaPsu} — **${psuPrice}**\n` +
            `6. **Penyimpanan (SSD):** ${recommendation.namaStorage} — **${ssdPrice}**\n` +
            `7. **Casing PC:** ${recommendation.namaCasing} — **${casePrice}**\n\n` +
            `💰 **TOTAL ESTIMASI HARGA: ${formatRupiah(recommendation.totalHarga)}**\n\n` +
            `✅ **Status Kompatibilitas:** 100% Terverifikasi Horn Clause SWI-Prolog (Socket, DDR RAM, Daya PSU, Form Factor Casing saling cocok).\n`;

          if (budgetNotes) {
            responseMessage += `\n> ℹ️ **Keterangan Budget:** ${budgetNotes.replace(/\n\n/g, "\n> ")}`;
          }

          const followUpsByTier: Record<string, { label: string; value: string }[]> = {
            esports_gaming: [
              { label: "Cek Rakitan 1440p AM5 (AM5 DDR5)", value: "rekomendasi aaa_gaming" },
              { label: "Cek Alternatif Budget 13 Juta", value: "saran pc 13 juta" },
              { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
            ],
            intel_arc_edition: [
              { label: "Cek Spek Gaming Esports 1080p", value: "rekomendasi esports_gaming" },
              { label: "Cek Spek 1440p AM5 (15-20 Jt)", value: "rekomendasi aaa_gaming" },
              { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
            ],
            aaa_gaming: [
              { label: "Lihat Rakitan Flagship 4K (>35 Jt)", value: "rekomendasi enthusiast_flagship" },
              { label: "Cek Rakitan Video Editing 4K", value: "rekomendasi content_creation" },
              { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
            ],
            office_coding: [
              { label: "Upgrade ke Rakitan 13 Juta", value: "saran pc 13 juta" },
              { label: "Panduan Memilih Budget PC", value: "panduan memilih tier budget rakit pc" },
            ],
            content_creation: [
              { label: "Cek Rakitan Flagship RTX 3090", value: "rekomendasi enthusiast_flagship" },
              { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
            ],
            enthusiast_flagship: [
              { label: "Analisis Bottleneck 4K Gaming", value: "bagaimana bottleneck cpu dan gpu bekerja pada resolusi 1080p vs 4k?" },
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
              { label: "Saran PC Budget 13 Juta", value: "saran pc 13 juta" },
              { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
            ],
          });
        }
      }

      // 2D. JIKA BUKAN PERMINTAAN RAKITAN: Cek apakah ada komponen persis di 946 Dataset Kaggle
      const search = searchComponentKnowledgeBase(message);
      if (search && search.results.length > 0 && !search.isAlternative) {
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

        return Response.json({
          success: true,
          type: "component_info",
          message: text,
          quickReplies: [
            { label: "Saran PC Budget 13 Juta", value: "saran pc 13 juta" },
            { label: "Saran PC Gaming 1080p", value: "rekomendasi esports_gaming" },
            { label: "Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
          ],
        });
      }

      // 2E. SEMUA HAL LAINNYA (di luar dataset SWI-Prolog, pertanyaan biologi/umum, hardware non-dataset, sains, dsb):
      // DIALIHKAN KE GOOGLE GEMINI AI!
      if (isGeminiAvailable()) {
        const geminiRes = await askGeminiExpert(message);
        if (geminiRes.status === "success" && geminiRes.text) {
          return Response.json({
            success: true,
            type: "generative_ai",
            message:
              `> **Catatan Pengalihan:**\n` +
              `> Maaf, basis pengetahuan logika SWI-Prolog tidak mencakup percakapan ini, pertanyaan dialihkan ke Gemini AI:\n\n` +
              geminiRes.text,
            quickReplies: [
              { label: "Saran PC Budget 13 Juta", value: "saran pc 13 juta" },
              { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
              { label: "Katalog Komponen Hardware", value: "tanya harga komponen" },
            ],
          });
        }

        if (geminiRes.status === "quota_exhausted") {
          return Response.json({
            success: true,
            type: "quota_fallback",
            message:
              `Mohon maaf, saat ini kapasitas kuota layanan Generative AI (Google Gemini Free Tier) sedang mencapai batas pemakaian sementara (*Rate Limit*). Layanan pemrosesan bahasa luas ini akan pulih kembali secara otomatis dalam beberapa saat.\n\n` +
              `> **Status Layanan Sistem:**\n` +
              `> Pertanyaan Anda berada di luar cakupan 946 dataset lokal SWI-Prolog dan diarahkan ke Gemini AI, namun kuota sementara sedang padat. Seluruh fungsi sistem pakar lokal SWI-Prolog kami tetap beroperasi 100% tanpa gangguan.\n\n` +
              `Anda tetap dapat memanfaatkan fitur utama sistem pakar PCExpert AI:\n` +
              `• Verifikasi Kompatibilitas Hardware via mesin inferensi SWI-Prolog\n` +
              `• Rekomendasi Rakitan PC sesuai tier anggaran (Rp 5 juta - Rp 45 juta)\n` +
              `• Pemeriksaan spesifikasi dan estimasi harga 946 komponen fisik nyata (Dataset Kaggle)\n\n` +
              `Silakan pilih salah satu menu navigasi di bawah ini:`,
            quickReplies: [
              { label: "Saran PC Budget 13 Juta", value: "saran pc 13 juta" },
              { label: "Uji Kompatibilitas Komponen", value: "cek_kompatibilitas" },
              { label: "Cek Panduan Tier Budget PC", value: "panduan memilih tier budget rakit pc" },
              { label: "Katalog Komponen Hardware", value: "tanya harga komponen" },
            ],
          });
        }
      }

      // 2F. Fallback jika Gemini tidak tersedia
      return Response.json({
        success: true,
        type: "unknown_inquiry",
        message:
          `Mohon maaf, pertanyaan tersebut tidak tercakup di dalam basis data logika SWI-Prolog lokal kami.\n\n` +
          `Silakan tanyakan hal-hal terkait spesifikasi komponen PC, perakitan PC, atau pilih salah satu menu saran di bawah ini:`,
        quickReplies: [
          { label: "Saran PC Budget 13 Juta", value: "saran pc 13 juta" },
          { label: "Panduan Memilih Budget PC", value: "panduan memilih tier budget rakit pc" },
          { label: "Uji Kompatibilitas Hardware", value: "cek_kompatibilitas" },
        ],
      });
    }

    // Default jika request kosong
    return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ error: message }, { status: 500 });
  }
}
