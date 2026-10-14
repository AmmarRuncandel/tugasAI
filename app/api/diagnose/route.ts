import { NextRequest } from 'next/server';
import { executeProlog } from '@/lib/prolog';

function parseResult(output: string) {
  const line = output.split('\n').find(l => l.startsWith('RESULT:'));
  if (!line) return null;

  const parts = line.replace('RESULT:', '').split('|');
  if (parts.length < 6) return null;

  const [kode, nama, layer, keparahan, solusi, gejalaTerpenuhi] = parts;

  // Parse list Prolog: [gejala1,gejala2,...] → string[]
  const gejalaParsed = gejalaTerpenuhi
    .replace(/[\[\]]/g, '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  return { kode, nama, layer, keparahan, solusi, gejalaTerpenuhi: gejalaParsed };
}

// POST /api/diagnose
// Body: { gejala: string[] }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const gejalaList: string[] = body.gejala ?? [];

    if (!Array.isArray(gejalaList) || gejalaList.length === 0) {
      return Response.json({ error: 'Harap sertakan minimal satu gejala.' }, { status: 400 });
    }

    // Sanitasi input: hanya izinkan huruf kecil, angka, underscore
    const safe = gejalaList.every(g => /^[a-z0-9_]+$/.test(g));
    if (!safe) {
      return Response.json({ error: 'Format gejala tidak valid.' }, { status: 400 });
    }

    const gejalaTerm = `[${gejalaList.join(',')}]`;
    const query = `diagnosa_batch(${gejalaTerm})`;

    const output = await executeProlog(query);
    const result = parseResult(output);

    if (!result) {
      return Response.json({
        success: false,
        message: 'Tidak ada diagnosis yang cocok dengan kombinasi gejala ini.',
        rawOutput: output,
      });
    }

    if (result.kode === 'tidak_ditemukan') {
      return Response.json({
        success: false,
        message: result.solusi,
        rawOutput: output,
      });
    }

    return Response.json({
      success: true,
      diagnosis: result,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error tidak diketahui.';
    return Response.json({ error: message }, { status: 500 });
  }
}

// GET /api/diagnose — health check / tes koneksi swipl
export async function GET() {
  try {
    const output = await executeProlog("write('SWIPL_OK')");
    const ok = output.includes('SWIPL_OK');
    return Response.json({
      status: ok ? 'connected' : 'error',
      message: ok ? 'SWI-Prolog terkoneksi dan siap.' : 'Respons tidak valid dari swipl.',
      output,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error tidak diketahui.';
    return Response.json({ status: 'error', message }, { status: 500 });
  }
}
