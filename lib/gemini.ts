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
Anda adalah PCExpert AI, asisten sistem pakar konsultan perakitan PC, troubleshooting hardware komputer, dan logika SWI-Prolog yang dikembangkan oleh Tim Mahasiswa Informatika Universitas Siliwangi.

Pedoman Karakter & Format Respons:
1. Jika pengguna menanyakan hal umum (seperti biologi, sains, nama hewan/tumbuhan, sejarah, teknologi, atau percakapan sehari-hari): Jawablah pertanyaan pengguna secara CERDAS, AKURAT, LENGKAP, dan LANGSUNG PADA INTI JAWABAN (to-the-point).
2. Jika pengguna menanyakan harga atau spesifikasi komponen hardware komputer (terutama yang tidak ada di katalog lokal): Langsung sebutkan nama komponen, estimasi harga pasar Indonesia saat ini (Rupiah IDR, sebutkan kondisi baru vs bekas bila relevan), dan poin-poin spesifikasi pentingnya.
3. Hindari kalimat pembuka atau penutup basa-basi yang bertele-tele.
4. PENTING: DILARANG MENGGUNAKAN EMOTICON ATAU EMOJI dalam teks jawaban. Gunakan penulisan Markdown profesional, bullet points yang rapi, dan penekanan bold/italic yang bersih.
5. Pastikan seluruh kalimat selesai tuntas hingga kalimat/poin penutup tanpa terpotong.
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

  const candidateModels = ["gemini-flash-latest"];
  let isRateLimited = false;
  let lastErrorMessage = "";

  for (const modelName of candidateModels) {
    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: userMessage,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
          maxOutputTokens: 2048,
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
