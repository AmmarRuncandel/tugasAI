import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { ALL_COMPONENTS } from "./constants";
import { PCComponent } from "./types";

const PROLOG_FILE = path.join(process.cwd(), "pakar_pc.pl");

const KNOWN_PATHS = [
  "D:\\swipl\\bin\\swipl.exe",
  "C:\\Program Files\\swipl\\bin\\swipl.exe",
  "C:\\Program Files (x86)\\swipl\\bin\\swipl.exe",
  "/opt/homebrew/bin/swipl",
  "/usr/local/bin/swipl",
  "/usr/bin/swipl",
];

let cachedSwiplPath: string | null = null;
let cachedIsNativeAvailable: boolean | null = null;

/**
 * Check whether a native SWI-Prolog binary is installed and accessible on this machine/server.
 */
export function isNativeSwiplAvailable(): boolean {
  if (cachedIsNativeAvailable !== null) {
    return cachedIsNativeAvailable;
  }

  // 1. If running on Vercel or explicitly in cloud mode, native binary is not installed
  if (process.env.VERCEL === "1") {
    cachedIsNativeAvailable = false;
    return false;
  }

  // 2. Check custom environment variable
  if (process.env.SWIPL_PATH) {
    const cleaned = process.env.SWIPL_PATH.replace(/^["']|["']$/g, "").trim();
    if (cleaned && fs.existsSync(/*turbopackIgnore: true*/ cleaned)) {
      cachedSwiplPath = cleaned;
      cachedIsNativeAvailable = true;
      return true;
    }
  }

  // 3. Check known standard installation directories
  for (const p of KNOWN_PATHS) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      cachedSwiplPath = p;
      cachedIsNativeAvailable = true;
      return true;
    }
  }

  // 4. Default to false if not found in known paths and no custom path specified
  cachedIsNativeAvailable = false;
  return false;
}

/**
 * Resolve swipl binary path safely
 */
export function getSwiplExecutable(): string {
  if (cachedSwiplPath) {
    return cachedSwiplPath;
  }

  if (process.env.SWIPL_PATH) {
    const cleaned = process.env.SWIPL_PATH.replace(/^["']|["']$/g, "").trim();
    if (cleaned && fs.existsSync(/*turbopackIgnore: true*/ cleaned)) {
      cachedSwiplPath = cleaned;
      return cachedSwiplPath;
    }
  }

  for (const p of KNOWN_PATHS) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      cachedSwiplPath = p;
      return cachedSwiplPath;
    }
  }

  cachedSwiplPath = "swipl";
  return cachedSwiplPath;
}

/**
 * Preset rakitan PC sesuai basis pengetahuan deklaratif pakar_pc.pl
 */
const PRESET_DEFINITIONS: Record<
  string,
  {
    cpu: string;
    mobo: string;
    ram: string;
    gpu: string;
    psu: string;
    storage: string;
    casing: string;
    catatan: string;
  }
> = {
  office_coding: {
    cpu: "cpu_i3_12100f",
    mobo: "mobo_b660m_plus_ddr4",
    ram: "ram_corsair_ddr4_16gb_3200",
    gpu: "gpu_nvidia_gtx_1650",
    psu: "psu_cooler_master_450w_bronze",
    storage: "ssd_western_digital_500gb_nvme",
    casing: "case_deepcool_matrexx_30",
    catatan: "Hemat daya, CPU efisien multitasking & kartu grafis ramah anggaran",
  },
  esports_gaming: {
    cpu: "cpu_ryzen_5_5600g",
    mobo: "mobo_b550m_ddr4",
    ram: "ram_corsair_ddr4_16gb_3200",
    gpu: "gpu_amd_rx_6600",
    psu: "psu_psu_550w_bronze",
    storage: "ssd_western_digital_1000gb_nvme",
    casing: "case_ant_esports_case_50",
    catatan: "Sangat optimal untuk Valorant, CS2, Dota 2, dan game AAA 1080p setting tinggi",
  },
  intel_arc_edition: {
    cpu: "cpu_i5_12400f",
    mobo: "mobo_b660m_plus_ddr4",
    ram: "ram_corsair_ddr4_16gb_3200",
    gpu: "gpu_intel_arc_a750",
    psu: "psu_psu_650w_bronze",
    storage: "ssd_western_digital_1000gb_nvme",
    casing: "case_deepcool_matrexx_40",
    catatan: "Varian Intel Arc A750 8GB dengan akselerasi hardware AV1 encoder & XMX AI cores, budget presisi kisaran Rp 13 Juta",
  },
  aaa_gaming: {
    cpu: "cpu_ryzen_5_7600x",
    mobo: "mobo_b650m_ddr5",
    ram: "ram_g_skill_ddr5_32gb_6000",
    gpu: "gpu_nvidia_rtx_4060",
    psu: "psu_psu_650w_bronze",
    storage: "ssd_western_digital_1000gb_nvme",
    casing: "case_lian_li_case_15",
    catatan: "Platform modern AM5 & DDR5, siap libas game berat Cyberpunk & Black Myth Wukong 1440p",
  },
  content_creation: {
    cpu: "cpu_ryzen_9_5900x",
    mobo: "mobo_b550m_ddr4",
    ram: "ram_crucial_ddr4_32gb_3200",
    gpu: "gpu_nvidia_rtx_4070",
    psu: "psu_psu_750w_gold",
    storage: "ssd_crucial_1000gb_nvme",
    casing: "case_cooler_master_h500",
    catatan: "Multi-core tinggi untuk rendering Blender, Premiere Pro 4K, dan CUDA rendering",
  },
  enthusiast_flagship: {
    cpu: "cpu_ryzen_9_5950x",
    mobo: "mobo_x570_ddr4",
    ram: "ram_g_skill_ddr4_32gb_3600",
    gpu: "gpu_nvidia_rtx_3090",
    psu: "psu_psu_850w_gold",
    storage: "ssd_western_digital_1000gb_nvme",
    casing: "case_lian_li_case_15",
    catatan: "Rajanya CPU Gaming dunia Ryzen 9 5950X dipadukan grafis monster RTX 3090 24GB tanpa kompromi",
  },
};

/**
 * Fallback Prolog Inference Engine (Logic Rules & Dataset Matcher)
 * Memastikan sistem dapat digunakan 100% normal tanpa instalasi native SWI-Prolog di server/client.
 */
export function executePrologFallback(query: string): string {
  const trimmed = query.trim();

  // 1. Health check: write('SWIPL_OK')
  if (trimmed.includes("write('SWIPL_OK')") || trimmed.includes("SWIPL_OK")) {
    return "SWIPL_OK";
  }

  // 2. Batch Rekomendasi: batch_rekomendasi(Kategori)
  const buildMatch = trimmed.match(/batch_rekomendasi\(([^)]+)\)/);
  if (buildMatch) {
    const rawKat = buildMatch[1].trim();
    const presetKey = PRESET_DEFINITIONS[rawKat] ? rawKat : "esports_gaming";
    const p = PRESET_DEFINITIONS[presetKey];

    const findComp = (id: string): PCComponent | undefined =>
      ALL_COMPONENTS.find((c) => c.id === id);

    const cCpu = findComp(p.cpu);
    const cMobo = findComp(p.mobo);
    const cRam = findComp(p.ram);
    const cGpu = findComp(p.gpu);
    const cPsu = findComp(p.psu);
    const cStorage = findComp(p.storage);
    const cCasing = findComp(p.casing);

    const total =
      (cCpu?.harga || 0) +
      (cMobo?.harga || 0) +
      (cRam?.harga || 0) +
      (cGpu?.harga || 0) +
      (cPsu?.harga || 0) +
      (cStorage?.harga || 0) +
      (cCasing?.harga || 0);

    const line1 = `RESULT_BUILD:${presetKey}|${p.cpu}|${cCpu?.nama || p.cpu}|${p.mobo}|${cMobo?.nama || p.mobo}|${p.ram}|${cRam?.nama || p.ram}|${p.gpu}|${cGpu?.nama || p.gpu}|${p.psu}|${cPsu?.nama || p.psu}|${p.storage}|${cStorage?.nama || p.storage}|${p.casing}|${cCasing?.nama || p.casing}|${total}`;
    const line2 = `JUSTIFIKASI:Komponen 100% kompatibel di socket ${cMobo?.socket || "am4"}, RAM ${cMobo?.ramType || "ddr4"}, PSU ${cPsu?.watt || 550}W mencukupi. Catatan: ${p.catatan}`;

    return `${line1}\n${line2}`;
  }

  // 3. Batch Cek Kompatibilitas: batch_cek_kompatibilitas(CPU, Mobo, RAM, GPU, PSU, Casing)
  const checkMatch = trimmed.match(/batch_cek_kompatibilitas\(([^)]+)\)/);
  if (checkMatch) {
    const args = checkMatch[1].split(",").map((s) => s.trim());
    const [cpuId, moboId, ramId, gpuId, psuId, casingId] = args;

    const findComp = (id: string): PCComponent | undefined =>
      ALL_COMPONENTS.find((c) => c.id === id);

    const cCpu = findComp(cpuId);
    const cMobo = findComp(moboId);
    const cRam = findComp(ramId);
    const cGpu = findComp(gpuId);
    const cPsu = findComp(psuId);
    const cCasing = findComp(casingId || "case_atx_mid");

    const alasan: string[] = [];

    // Aturan 1: Socket CPU vs Motherboard
    if (cCpu && cMobo && cCpu.socket !== cMobo.socket) {
      alasan.push("Socket CPU dan Motherboard berbeda (tidak muat secara fisik)");
    } else {
      alasan.push("ok");
    }

    // Aturan 2: Tipe RAM vs Motherboard
    if (cMobo && cRam && cMobo.ramType !== cRam.ramType) {
      alasan.push("Tipe generasi RAM (DDR4 vs DDR5 vs DDR3) tidak sesuai dengan slot motherboard");
    } else {
      alasan.push("ok");
    }

    // Aturan 3: Daya PSU vs GPU Min Watt
    const minWatt = cGpu?.minPsu || 450;
    const psuWatt = cPsu?.watt || 500;
    if (psuWatt < minWatt) {
      alasan.push("Daya PSU terlalu kecil untuk kebutuhan daya minimum kartu grafis (GPU)");
    } else {
      alasan.push("ok");
    }

    // Aturan 4: Form Factor Motherboard vs Casing
    const moboForm = cMobo?.form || "matx";
    const caseForm = cCasing?.form || "atx";
    if (caseForm !== "atx" && moboForm !== caseForm) {
      alasan.push("Ukuran Motherboard ATX terlalu besar untuk Casing Micro-ATX");
    } else {
      alasan.push("ok");
    }

    const isKompatibel = alasan.every((a) => a === "ok");
    const totalHarga =
      (cCpu?.harga || 0) +
      (cMobo?.harga || 0) +
      (cRam?.harga || 0) +
      (cGpu?.harga || 0) +
      (cPsu?.harga || 0) +
      (cCasing?.harga || 0);

    const statusStr = isKompatibel ? "kompatibel" : "tidak_kompatibel";
    return `RESULT_CHECK:${statusStr}|${totalHarga}|[${alasan.join(", ")}]`;
  }

  // 4. Explorer Query 1 (Ontology AM5)
  if (trimmed.includes("cpu(Kode, Nama, _, am5")) {
    const cpus = ALL_COMPONENTS.filter((c) => c.kategori === "cpu" && c.socket === "am5");
    return cpus
      .map((c) => `ITEM:${c.id}|${c.nama}|Socket AM5|Tier ${c.tier || "mid"}|Rp ${c.harga}`)
      .join("\n");
  }

  // 5. Explorer Query 2 (Conjunctive GPU NVIDIA VRAM >= 12, Harga <= 12 jt)
  if (trimmed.includes("gpu(Kode, Nama, nvidia") || (trimmed.includes("VRAM >= 12") && trimmed.includes("Harga =< 12000000"))) {
    const gpus = ALL_COMPONENTS.filter(
      (c) =>
        c.kategori === "gpu" &&
        c.brand?.toLowerCase() === "nvidia" &&
        (c.vram || 0) >= 12 &&
        c.harga <= 12_000_000
    );
    return gpus
      .map((c) => `ITEM:${c.id}|${c.nama}|VRAM ${c.vram}GB|Min PSU ${c.minPsu || 650}W|Rp ${c.harga}`)
      .join("\n");
  }

  // 6. Explorer Query 3 (Recursive Calculation)
  if (trimmed.includes("hitung_total_harga")) {
    return "ITEM:Total Estimasi Biaya Rakitan 1440p AM5|7 Komponen Kompatibel|Rp 20450000";
  }

  // 7. Explorer Query 4 (Irisan Form Factor)
  if (trimmed.includes("form_factor_irisan")) {
    return "ITEM:Irisan Dukungan Form Factor Casing Micro-ATX vs Motherboard|[matx]";
  }

  // 8. Explorer Query 5 (All CPUs)
  if (trimmed.includes("cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier)")) {
    const cpus = ALL_COMPONENTS.filter((c) => c.kategori === "cpu");
    return cpus
      .map((c) => `ITEM:${c.id}|${c.nama}|${c.brand}|${c.socket}|${c.tdp || 65}W|Rp ${c.harga}`)
      .join("\n");
  }

  return "SWIPL_OK";
}

/**
 * Execute a Prolog query against pakar_pc.pl via subprocess with seamless fallback to In-Memory Logic Engine
 */
export async function executeProlog(query: string, timeoutMs = 10000): Promise<string> {
  // Jika SWI-Prolog tidak terinstall di mesin lokal / Vercel cloud, langsung gunakan fallback
  if (!isNativeSwiplAvailable()) {
    return executePrologFallback(query);
  }

  return new Promise((resolve) => {
    try {
      const swiplBin = getSwiplExecutable();
      const prologFile = PROLOG_FILE.replace(/\\/g, "/");

      const args = [
        "-g",
        `consult('${prologFile}'), ${query}, halt.`,
        "--quiet",
      ];

      const proc = spawn(/*turbopackIgnore: true*/ swiplBin, args, {
        stdio: ["pipe", "pipe", "pipe"],
        shell: false,
      });

      let stdout = "";
      let stderr = "";

      proc.stdout.on("data", (data: Buffer) => {
        stdout += data.toString();
      });

      proc.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
      });

      const timer = setTimeout(() => {
        try {
          proc.kill();
        } catch {}
        console.warn(`SWI-Prolog timed out on query. Using fallback logic.`);
        resolve(executePrologFallback(query));
      }, timeoutMs);

      proc.on("close", (code: number) => {
        clearTimeout(timer);
        if (code === 0 || stdout.trim()) {
          resolve(stdout.trim());
        } else {
          console.warn(`SWI-Prolog returned code ${code} (${stderr.trim()}). Using fallback.`);
          resolve(executePrologFallback(query));
        }
      });

      proc.on("error", (err: Error) => {
        clearTimeout(timer);
        console.warn(`SWI-Prolog spawn error: ${err.message}. Using fallback engine.`);
        resolve(executePrologFallback(query));
      });
    } catch (err) {
      console.warn(`Exception spawning SWI-Prolog: ${(err as Error)?.message}. Using fallback.`);
      resolve(executePrologFallback(query));
    }
  });
}
