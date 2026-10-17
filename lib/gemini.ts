import { GoogleGenAI } from "@google/genai";

function getAiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY?.trim() || "";
  if (!key) return null;
  try {
    return new GoogleGenAI({ apiKey: key });
  } catch {
    return null;
  }
}

export function isGeminiAvailable(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

const SYSTEM_INSTRUCTION = `
Anda adalah 212 PCExpert AI, asisten sistem pakar konsultan perakitan PC, troubleshooting hardware komputer, dan verifikasi kompatibilitas berbasis logika SWI-Prolog yang dikembangkan oleh Tim Mahasiswa Informatika Universitas Siliwangi.

Pedoman Karakter & Respons:
1. Berikan jawaban yang cerdas, luwes, teknis-akurat, edukatif, dan ramah seperti AI percakapan modern (layaknya ChatGPT atau Gemini).
2. Basis data Anda berakar pada 946 komponen fisik nyata (ekstraksi Kaggle PC Components Dataset dalam mata uang Rupiah IDR) dan kaidah logika deduktif Horn clause SWI-Prolog (seperti cocok_cpu_mobo/2, cocok_mobo_ram/2, daya_psu_cukup/2, cocok_mobo_casing/2).
3. PENTING: DILARANG MENGGUNAKAN EMOTICON ATAU EMOJI dalam teks jawaban. Gunakan penulisan Markdown profesional, bullet points, dan penekanan bold/italic yang bersih.
4. Jika pengguna menanyakan kendala hardware (seperti RAM tidak sesuai, PSU kurang daya, bottleneck, suhu panas), jelaskan akar penyebab teknis arsitektur komputer dan berikan solusi pencegahannya.
5. Jika pengguna menanyakan rakitan di luar batas atau hal yang membutuhkan komponen di katalog, beri tahu dengan jujur mengenai batas dataset 946 komponen fisik dan rekomendasikan alternatif terdekat.
`;

export interface GeminiResult {
  status: "success" | "quota_exhausted" | "error" | "unavailable";
  text?: string;
  quickReplies?: { label: string; value: string }[];
  errorMessage?: string;
}

export async function askGeminiExpert(userMessage: string): Promise<GeminiResult> {
  const client = getAiClient();
  if (!client) {
    return { status: "unavailable" };
  }

  const candidateModels = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-flash-latest"];
  let isRateLimited = false;
  let lastErrorMessage = "";

  for (const modelName of candidateModels) {
    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: userMessage,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 900,
        },
      });

      const text = response.text?.trim();
      if (text) {
        return {
          status: "success",
          text,
          quickReplies: [
            { label: "Rekomendasi Rakitan Gaming 1080p", value: "rekomendasi esports_gaming" },
            { label: "Uji Kompatibilitas di Kalkulator", value: "cek_kompatibilitas" },
            { label: "Cek Panduan Tier Budget PC", value: "panduan memilih tier budget rakit pc" },
          ],
        };
      }
    } catch (err) {
      const msg = (err as Error)?.message || "";
      lastErrorMessage = msg;
      if (
        msg.includes("429") ||
        msg.includes("RESOURCE_EXHAUSTED") ||
        msg.toLowerCase().includes("quota") ||
        msg.toLowerCase().includes("rate limit")
      ) {
        isRateLimited = true;
      }
      console.warn(`Model ${modelName} attempt failed:`, msg.substring(0, 80));
    }
  }

  if (isRateLimited) {
    return {
      status: "quota_exhausted",
      errorMessage: lastErrorMessage,
    };
  }

  return {
    status: "error",
    errorMessage: lastErrorMessage,
  };
}
