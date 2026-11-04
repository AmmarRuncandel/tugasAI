import { NextRequest } from "next/server";
import { executeProlog } from "@/lib/prolog";

// POST /api/query
// Body: { type: 'ontology' | 'conjunctive' | 'recursive' | 'list' | 'all_diagnosis' }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type: string = body.type ?? "";

    let query = "";
    let description = "";

    switch (type) {
      case "ontology":
        // Query 1: Ekstraksi Variabel - Semua CPU Socket AM5 (Slide 31-51)
        query = `forall(cpu(Kode, Nama, _, am5, _, Harga, Tier), (write('ITEM:'), write(Kode), write('|'), write(Nama), write('|Socket AM5|Tier '), write(Tier), write('|Rp '), write(Harga), nl))`;
        description = "Query 1 — Ekstraksi Variabel: Semua Prosesor (CPU) berbasis Socket AM5";
        break;

      case "conjunctive":
        // Query 2: Conjunctive Query - GPU NVIDIA dengan VRAM >= 12GB AND Harga <= 12 Juta (Slide 32-34)
        query = `forall((gpu(Kode, Nama, nvidia, MinWatt, VRAM, Harga, _), VRAM >= 12, Harga =< 12000000), (write('ITEM:'), write(Kode), write('|'), write(Nama), write('|VRAM '), write(VRAM), write('GB|Min PSU '), write(MinWatt), write('W|Rp '), write(Harga), nl))`;
        description = "Query 2 — Conjunctive Query: GPU NVIDIA VRAM >= 12GB dengan harga <= 12 Juta";
        break;

      case "recursive":
        // Query 3: Rekursi Perhitungan Harga Komponen PC (Slide 44-46)
        query = `hitung_total_harga([cpu_ryzen_5_7600x, mobo_b650m_ddr5, ram_g_skill_ddr5_32gb_6000, gpu_nvidia_rtx_4060, psu_psu_650w_bronze, ssd_western_digital_1000gb_nvme, case_lian_li_case_15], Total), write('ITEM:Total Estimasi Biaya Rakitan 1440p AM5|7 Komponen Kompatibel|Rp '), write(Total), nl`;
        description = "Query 3 — Rekursi List: Penjumlahan harga seluruh komponen rakitan secara rekursif";
        break;

      case "list":
        // Query 4: Operasi List & Irisan Form Factor Motherboard vs Casing (Slide 47-48)
        query = `findall(F, form_factor_irisan(F, [atx, matx], [matx]), Irisan), write('ITEM:Irisan Dukungan Form Factor Casing Micro-ATX vs Motherboard|'), write(Irisan), nl`;
        description = "Query 4 — Operasi List: Irisan (member_both) dukungan form factor antara motherboard & casing";
        break;

      case "all_diagnosis":
        // Query 5: Seluruh Fakta CPU di Basis Pengetahuan
        query = `forall(cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier), (write('ITEM:'), write(Kode), write('|'), write(Nama), write('|'), write(Brand), write('|'), write(Socket), write('|'), write(TDP), write('W|Rp '), write(Harga), nl))`;
        description = "Query 5 — Seluruh Fakta Prosesor di Basis Pengetahuan Prolog";
        break;

      default:
        return Response.json({ error: "Tipe query tidak dikenali." }, { status: 400 });
    }

    const rawOutput = await executeProlog(query);

    // Parse baris ITEM:...
    const items = rawOutput
      .split("\n")
      .filter((l) => l.startsWith("ITEM:"))
      .map((l) => l.replace("ITEM:", "").split("|"));

    return Response.json({ success: true, description, items, rawOutput });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ error: message }, { status: 500 });
  }
}
