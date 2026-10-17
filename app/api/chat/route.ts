import { NextRequest } from "next/server";
import { executeProlog } from "@/lib/prolog";
import { ALL_COMPONENTS, BUILD_PRESETS, QUICK_PROMPTS } from "@/lib/constants";
import { BuildRecommendation, CompatibilityAnalysis, PCComponent } from "@/lib/types";
import { formatRupiah } from "@/lib/utils";

function searchComponentKnowledgeBase(message: string): { query: string; totalMatches: number; results: PCComponent[] } | null {
  const lower = message.toLowerCase();

  // Bersihkan stop words pencarian
  const clean = lower
    .replace(/[?,.!/\\()]/g, " ")
    .replace(/\b(berapa|harga|biaya|info|spek|spesifikasi|dong|kah|apakah|ada|gak|nggak|tidak|ya|tentang|komponen|tolong|cek|bisa|kasih|tahu|tau|di|json|dataset|kb|produk|daftar|katalog)\b/gi, "")
    .trim();

  if (!clean || clean.length < 2) return null;

  const words = clean.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return null;

  // Filter komponen yang cocok di ALL_COMPONENTS
  const matches = ALL_COMPONENTS.filter((c) => {
    const text = `${c.nama} ${c.brand} ${c.id} ${c.spesifikasi} ${c.kategori}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });

  if (matches.length === 0) return null;

  return {
    query: clean,
    totalMatches: matches.length,
    results: matches.slice(0, 5),
  };
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

    // 2. Aksi: Cek Harga & Informasi Komponen Spesifik (Question Answering)
    if (message) {
      const lower = message.toLowerCase();
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
              `🔍 **Ditemukan Komponen di Basis Pengetahuan (Kaggle Dataset):**\n\n` +
              `📌 **${c.nama}**\n` +
              `• Kategori: **${c.kategori.toUpperCase()}** (${c.brand})\n` +
              `• Estimasi Harga Pasar: **${formatRupiah(c.harga)}**\n` +
              `• Spesifikasi Teknis: ${c.spesifikasi}\n` +
              `• Kode Prolog: \`${c.id}\`\n\n`;

            if (c.kategori === "cpu") {
              text += `💡 *Penalaran Logika Prolog:* Prosesor ini harus dipasangkan pada Motherboard dengan socket yang identik sesuai aturan Horn clause \`cocok_cpu_mobo/2\`.`;
            } else if (c.kategori === "gpu") {
              text += `💡 *Penalaran Logika Prolog:* Kartu grafis ini mewajibkan kapasitas daya minimum PSU terpenuhi sesuai aturan \`daya_psu_cukup/2\` untuk mencegah lonjakan daya saat beban kerja penuh.`;
            } else if (c.kategori === "motherboard") {
              text += `💡 *Penalaran Logika Prolog:* Perhatikan dukungan slot RAM (DDR4 vs DDR5) dan ukuran casing (ATX vs mATX) saat memilih motherboard ini.`;
            } else if (c.kategori === "ram") {
              text += `💡 *Penalaran Logika Prolog:* Pastikan motherboard kamu mendukung slot generasi yang sama (aturan \`cocok_mobo_ram/2\`).`;
            } else if (c.kategori === "psu") {
              text += `💡 *Penalaran Logika Prolog:* Kapasitas daya PSU ini akan dibandingkan dengan kebutuhan minimum kartu grafis (GPU) dalam aturan \`daya_psu_cukup/2\`.`;
            }
          } else {
            text = `🔍 **Ditemukan ${count} komponen yang sesuai di Basis Pengetahuan:**\n\n`;
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
            text += `💡 *Tips:* Kamu bisa menguji komponen ini di **Kalkulator Kompatibilitas** (tab atas) atau minta saya merakitkan PC lengkap dengan menyebutkan budget kamu!`;
          }

          return Response.json({
            success: true,
            type: "component_info",
            message: text,
            quickReplies: [
              { label: "🎮 Buatkan Rakitan PC Gaming", value: "rekomendasi esports_gaming" },
              { label: "🔵 Buatkan Rakitan PC Intel Arc", value: "rekomendasi intel_arc_edition" },
              { label: "🔍 Uji di Kalkulator Kompatibilitas", value: "cek_kompatibilitas" },
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
              `Kamu bisa langsung menyebutkan nama komponen yang ingin kamu cek harganya, misalnya:\n` +
              `• *"Berapa harga Ryzen 5 3600?"*\n` +
              `• *"Harga Intel Arc A750 berapa?"*\n` +
              `• *"Berapa harga RTX 4070?"*\n` +
              `• *"Berapa harga RAM Corsair DDR4 16GB?"*\n` +
              `• *"Harga motherboard B650M?"*\n\n` +
              `Silakan ketik nama komponen yang ingin kamu tanyakan!`,
            quickReplies: [
              { label: "💰 Cek Harga Intel Arc A750", value: "berapa harga Intel Arc A750" },
              { label: "💰 Cek Harga Ryzen 5 3600", value: "berapa harga Ryzen 5 3600" },
              { label: "💰 Cek Harga RTX 4070", value: "berapa harga RTX 4070" },
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
      } else if (lower.includes("sultan") || lower.includes("flagship") || lower.includes("4080") || lower.includes("35 juta") || lower.includes("40 juta")) {
        selectedKebutuhan = "enthusiast_flagship";
      } else if (lower.includes("edit") || lower.includes("render") || lower.includes("content") || lower.includes("blender") || lower.includes("workstation") || lower.includes("25 juta")) {
        selectedKebutuhan = "content_creation";
      } else if (lower.includes("1440p") || lower.includes("aaa") || lower.includes("am5") || lower.includes("cyberpunk") || lower.includes("15 juta") || lower.includes("20 juta")) {
        selectedKebutuhan = "aaa_gaming";
      } else if (lower.includes("game") || lower.includes("gaming") || lower.includes("valorant") || lower.includes("esport") || lower.includes("10 juta") || lower.includes("12 juta")) {
        selectedKebutuhan = "esports_gaming";
      } else if (lower.includes("office") || lower.includes("kantor") || lower.includes("coding") || lower.includes("pelajar") || lower.includes("murah") || lower.includes("5 juta") || lower.includes("7 juta")) {
        selectedKebutuhan = "office_coding";
      } else {
        selectedKebutuhan = "esports_gaming"; // default fallback
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
        message: "Gagal menarik kesimpulan dari basis pengetahuan Prolog.",
        rawOutput,
      });
    }

    return Response.json({
      success: true,
      type: "recommendation",
      recommendation,
      rawOutput,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ error: message }, { status: 500 });
  }
}
