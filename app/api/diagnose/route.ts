import { NextRequest } from "next/server";
import { executeProlog } from "@/lib/prolog";

// GET /api/diagnose — health check / tes koneksi swipl
export async function GET() {
  try {
    const output = await executeProlog("write('SWIPL_OK')");
    const ok = output.includes("SWIPL_OK");
    return Response.json({
      status: ok ? "connected" : "error",
      message: ok ? "SWI-Prolog terkoneksi dan siap." : "Respons tidak valid dari swipl.",
      output,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ status: "error", message }, { status: 500 });
  }
}

// POST /api/diagnose — fallback redirect to chat API logic
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = `batch_rekomendasi(${body.kebutuhan || "esports_gaming"})`;
    const output = await executeProlog(query);
    return Response.json({ success: true, rawOutput: output });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error tidak diketahui.";
    return Response.json({ error: message }, { status: 500 });
  }
}
