import { NextRequest } from 'next/server';
import { executeProlog } from '@/lib/prolog';

// POST /api/query
// Body: { type: 'topology' | 'conjunctive' | 'recursive' | 'list' | 'ontology' }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type: string = body.type ?? '';

    let query = '';
    let description = '';

    switch (type) {
      case 'ontology':
        // Query 1: Ekstraksi variabel (Slide 31-51)
        query = `forall(detail_diagnosis(Kode, Nama, network_layer, _), (write('ITEM:'), write(Kode), write('|'), write(Nama), nl))`;
        description = 'Query 1 — Ekstraksi Variabel: Semua diagnosis pada Network Layer';
        break;

      case 'conjunctive':
        // Query 2: Gabungan query / Conjunctive Query (Slide 32-34)
        query = `forall((detail_diagnosis(Kode, _, network_layer, tinggi), solusi(Kode, Sol)), (write('ITEM:'), write(Kode), write('|'), write(Sol), nl))`;
        description = 'Query 2 — Conjunctive Query: Diagnosis Network Layer dengan keparahan tinggi & solusinya';
        break;

      case 'recursive':
        // Query 3: Rekursi koneksi topologi jaringan (Slide 44-46)
        query = `forall(koneksi_jaringan(pc_klien, Tujuan), (write('ITEM:pc_klien|'), write(Tujuan), nl))`;
        description = 'Query 3 — Rekursi Topologi: Semua node yang bisa dijangkau dari pc_klien';
        break;

      case 'list':
        // Query 4: Manipulasi List & Irisan Gejala member_both (Slide 47-48)
        query = `findall(G, gejala_irisan(G, [terhubung_wifi_atau_lan, ping_ip_publik_berhasil], [terhubung_wifi_atau_lan, ping_gateway_gagal]), Irisan), write('ITEM:irisan|'), write(Irisan), nl`;
        description = 'Query 4 — Operasi List: Irisan gejala antara DNS Failure dan Gateway Down';
        break;

      case 'all_diagnosis':
        // Semua diagnosis di KB
        query = `forall(detail_diagnosis(Kode, Nama, Layer, Kep), (write('ITEM:'), write(Kode), write('|'), write(Nama), write('|'), write(Layer), write('|'), write(Kep), nl))`;
        description = 'Seluruh aturan produksi di Knowledge Base';
        break;

      default:
        return Response.json({ error: 'Tipe query tidak dikenali.' }, { status: 400 });
    }

    const rawOutput = await executeProlog(query);

    // Parse baris ITEM:...
    const items = rawOutput
      .split('\n')
      .filter(l => l.startsWith('ITEM:'))
      .map(l => l.replace('ITEM:', '').split('|'));

    return Response.json({ success: true, description, items, rawOutput });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error tidak diketahui.';
    return Response.json({ error: message }, { status: 500 });
  }
}
