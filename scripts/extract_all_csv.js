const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const INR_TO_IDR = 190;

function parseLine(line) {
  if (!line || !line.trim()) return null;
  const m = line.match(/^(?:\d+,)?(".*?"|.*?),\s*"?₹?([\d,]+)"?\s*$/);
  if (m) {
    const title = m[1].replace(/^["']|["']$/g, '').trim();
    const inr = parseInt(m[2].replace(/,/g, ''), 10);
    if (isNaN(inr) || inr <= 0) return null;
    const priceIdr = Math.round((inr * INR_TO_IDR) / 10000) * 10000;
    return { title, inr, priceIdr };
  }
  return null;
}

function readAllLines(filename) {
  const file = path.join(DATA_DIR, filename);
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, 'utf-8').split('\n').slice(1);
  const results = [];
  for (const l of lines) {
    const item = parseLine(l);
    if (item) results.push(item);
  }
  return results;
}

// ---------------------------------------------------------------------
// 1. CPUS (Total: 1440 baris)
// ---------------------------------------------------------------------
const rawCpus = readAllLines('CPU.csv');
const cpuMap = new Map();

rawCpus.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (price < 350000) return; // filter aksesoris / kabel
  if (/cooler|thermal|heatsink|fan\b/i.test(t) && !/processor|with wraith|cores/i.test(t)) return;

  let brand = 'intel';
  if (/amd|ryzen|athlon|threadripper|epyc/i.test(t)) brand = 'amd';

  let socket = null;
  if (/am5\b/i.test(t) || /7[6789]00/i.test(t)) socket = 'am5';
  else if (/am4\b/i.test(t) || /3[1236789]00|5[56789]00/i.test(t)) socket = 'am4';
  else if (/lga\s*1700/i.test(t) || /12[14679]00|13[14679]00|14[14679]00/i.test(t)) socket = 'lga1700';
  else if (/lga\s*1200/i.test(t) || /10[14679]00|11[14679]00/i.test(t)) socket = 'lga1200';
  else if (/lga\s*1151/i.test(t) || /i[357]-?[6789]\d00/i.test(t)) socket = 'lga1151';
  else if (/lga\s*1150/i.test(t) || /i[357]-?4\d00/i.test(t)) socket = 'lga1150';
  else if (/lga\s*1155/i.test(t) || /i[357]-?[23]\d00/i.test(t)) socket = 'lga1155';
  else if (brand === 'amd') socket = 'am4';
  else socket = 'lga1200';

  let tdp = 65;
  if (/i7|i9|5900|5950|7800|7900|7950|13700|13900|14700|14900/i.test(t)) tdp = 105;
  else if (/i3|3200|4150|g6400|athlon/i.test(t)) tdp = 58;

  let tier = 'mid';
  if (/i3|3200|4150|athlon|pentium|g6400/i.test(t)) tier = 'entry';
  else if (/i7|ryzen\s*7/i.test(t)) tier = 'high';
  else if (/i9|ryzen\s*9|threadripper|7800x3d/i.test(t)) tier = 'flagship';

  // Extract clean model
  let mMatch = t.match(/(Ryzen\s*\d+\s*\d+\w*|Core\s*i[3579]-?\d+\w*|i[3579]-?\d+\w*|Athlon\s*\d+\w*|Pentium\s*\w+)/i);
  let modelKey = mMatch ? mMatch[0].toLowerCase().replace(/[^a-z0-9]/g, '_') : `cpu_${idx}`;
  let cleanName = t.replace(/\(.*?\)/g, '').replace(/desktop processor|processor|cooler/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `cpu_${modelKey}`.replace(/_+/g, '_');
  if (!cpuMap.has(id)) {
    cpuMap.set(id, {
      id,
      nama: cleanName,
      brand: brand.toUpperCase(),
      socket,
      tdp,
      harga: price,
      tier,
      spesifikasi: `Socket ${socket.toUpperCase()}, ${tdp}W TDP (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 2. GPUS (Total: 600 baris + Intel Arc)
// ---------------------------------------------------------------------
const rawGpus = readAllLines('GPU.csv');
const gpuMap = new Map();

// Manual Arc inclusion
[
  { id: 'gpu_intel_arc_a380', nama: 'Intel Arc A380 6GB GDDR6', brand: 'INTEL', minPsu: 450, vram: 6, harga: 2150000, tier: 'entry', spesifikasi: '6GB GDDR6, Min PSU 450W, AV1 Encoder' },
  { id: 'gpu_intel_arc_a580', nama: 'Intel Arc A580 8GB GDDR6', brand: 'INTEL', minPsu: 500, vram: 8, harga: 2850000, tier: 'mid', spesifikasi: '8GB GDDR6, 256-bit, Min PSU 500W' },
  { id: 'gpu_intel_arc_a750', nama: 'Intel Arc A750 8GB GDDR6', brand: 'INTEL', minPsu: 550, vram: 8, harga: 3450000, tier: 'mid', spesifikasi: '8GB GDDR6, 256-bit, Min PSU 550W' },
  { id: 'gpu_intel_arc_a770', nama: 'Intel Arc A770 16GB GDDR6', brand: 'INTEL', minPsu: 600, vram: 16, harga: 5200000, tier: 'mid_high', spesifikasi: '16GB VRAM, Min PSU 600W, Video Editing' },
].forEach(g => gpuMap.set(g.id, g));

rawGpus.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (/caddy|adapter|cable|case|printer|id card|scanner|cooling|paste/i.test(t)) return;
  if (price < 350000) return;

  let brand = 'NVIDIA';
  if (/radeon|rx\s*\d|amd/i.test(t)) brand = 'AMD';
  else if (/arc|intel/i.test(t)) brand = 'INTEL';

  let vramMatch = t.match(/(\d+)\s*GB/i);
  let vram = vramMatch ? parseInt(vramMatch[1], 10) : 4;

  let minPsu = 450;
  if (/4090|3090/i.test(t)) minPsu = 850;
  else if (/4080|3080|7900/i.test(t)) minPsu = 750;
  else if (/4070|3070|7800/i.test(t)) minPsu = 650;
  else if (/4060|3060|7600|6700|2060/i.test(t)) minPsu = 550;
  else if (/1650|1660|580|570|550|730|710/i.test(t)) minPsu = 450;

  let tier = 'mid';
  if (/710|730|1030|1650|550/i.test(t)) tier = 'entry';
  else if (/4070|3070|7800|6800/i.test(t)) tier = 'high';
  else if (/4080|4090|3080|3090|7900/i.test(t)) tier = 'flagship';

  let mMatch = t.match(/(RTX\s*\d+\w*|GTX\s*\d+\w*|GT\s*\d+|RX\s*\d+\w*|Arc\s*A\d+)/i);
  let modelKey = mMatch ? mMatch[0].toLowerCase().replace(/[^a-z0-9]/g, '_') : `gpu_${idx}`;
  let cleanName = t.replace(/\(.*?\)/g, '').replace(/graphics card|video card/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `gpu_${brand.toLowerCase()}_${modelKey}`.replace(/_+/g, '_');
  if (!gpuMap.has(id)) {
    gpuMap.set(id, {
      id,
      nama: cleanName,
      brand,
      minPsu,
      vram,
      harga: price,
      tier,
      spesifikasi: `${vram}GB VRAM, Min PSU ${minPsu}W (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 3. MOTHERBOARDS (Total: 1440 baris)
// ---------------------------------------------------------------------
const rawMobos = readAllLines('MotherBoard.csv');
const moboMap = new Map();

rawMobos.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (/cooler|fan|cable|thermal|processor\s*combo|combo\s*with/i.test(t)) return;
  if (price < 400000) return;

  let socket = null;
  if (/am5|b650|x670|a620/i.test(t)) socket = 'am5';
  else if (/am4|b550|b450|a520|a320|x570/i.test(t)) socket = 'am4';
  else if (/lga\s*1700|h610|b760|z790|b660|z690/i.test(t)) socket = 'lga1700';
  else if (/lga\s*1200|h410|h510|b460|b560|z490|z590/i.test(t)) socket = 'lga1200';
  else if (/lga\s*1151|h110|b250|b360|z370|z390/i.test(t)) socket = 'lga1151';
  else if (/lga\s*1150|h81|b85|z97/i.test(t)) socket = 'lga1150';
  else if (/lga\s*1155|h61/i.test(t)) socket = 'lga1155';

  if (!socket) return;

  let ramType = 'ddr4';
  if (/ddr5/i.test(t) || socket === 'am5' || /z790|x670/i.test(t)) ramType = 'ddr5';
  else if (/ddr3|h61|h81|1155|1150/i.test(t)) ramType = 'ddr3';

  let form = 'matx';
  if (/\batx\b/i.test(t) && !/micro\s*atx|matx/i.test(t)) form = 'atx';

  let mMatch = t.match(/([ABHZX]\d{2,3}M?[\w-]*)/i);
  let modelKey = mMatch ? mMatch[0].toLowerCase().replace(/[^a-z0-9]/g, '_') : `mobo_${socket}_${idx}`;
  let cleanName = t.replace(/\(.*?\)/g, '').replace(/motherboard/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `mobo_${modelKey}_${ramType}`.replace(/_+/g, '_');
  if (!moboMap.has(id)) {
    moboMap.set(id, {
      id,
      nama: cleanName,
      socket,
      ramType,
      form,
      harga: price,
      spesifikasi: `Socket ${socket.toUpperCase()}, ${ramType.toUpperCase()}, ${form.toUpperCase()} (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 4. RAM (Total: 1437 baris)
// ---------------------------------------------------------------------
const rawRams = readAllLines('RAM.csv');
const ramMap = new Map();

rawRams.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (/laptop|sodimm/i.test(t)) return;
  if (price < 150000) return;

  let ramType = 'ddr4';
  if (/ddr5/i.test(t)) ramType = 'ddr5';
  else if (/ddr3/i.test(t)) ramType = 'ddr3';

  let capMatch = t.match(/(\d+)\s*GB/i);
  let cap = capMatch ? parseInt(capMatch[1], 10) : 8;

  let speedMatch = t.match(/(\d{4})\s*MHz/i);
  let speed = speedMatch ? parseInt(speedMatch[1], 10) : (ramType === 'ddr5' ? 5600 : (ramType === 'ddr4' ? 3200 : 1600));

  let brandMatch = t.match(/(Corsair|Kingston|XPG|Crucial|ADATA|G\.Skill|Hynix|Samsung|Geonix|TeamGroup)/i);
  let brand = brandMatch ? brandMatch[0] : 'Generic';

  let cleanName = t.replace(/\(.*?\)/g, '').replace(/desktop memory|desktop ram|sdram/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `ram_${brand.toLowerCase()}_${ramType}_${cap}gb_${speed}`.replace(/[^a-z0-9]/g, '_');
  if (!ramMap.has(id)) {
    ramMap.set(id, {
      id,
      nama: cleanName,
      ramType,
      cap,
      speed,
      harga: price,
      spesifikasi: `${cap}GB, ${ramType.toUpperCase()} ${speed}MHz (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 5. POWER SUPPLY (Total: 1120 baris)
// ---------------------------------------------------------------------
const rawPsus = readAllLines('PowerSupply.csv');
const psuMap = new Map();

rawPsus.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (/controller|led|cabinet|case|adapter/i.test(t)) return;
  if (price < 250000) return;

  let wattMatch = t.match(/(\d{3,4})\s*(?:Watt|Watts|W\b)/i);
  let watt = wattMatch ? parseInt(wattMatch[1], 10) : 450;
  if (watt < 350 || watt > 1500) return;

  let cert = 'bronze';
  if (/gold/i.test(t)) cert = 'gold';
  else if (/platinum/i.test(t)) cert = 'platinum';
  else if (/bronze/i.test(t)) cert = 'bronze';

  let brandMatch = t.match(/(Cooler Master|Corsair|MSI|Deepcool|Seasonic|Antec|Thermaltake|Zebronics|Ant Esports)/i);
  let brand = brandMatch ? brandMatch[0] : 'PSU';

  let cleanName = t.replace(/\(.*?\)/g, '').replace(/power supply unit|power supply|smps|psu/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `psu_${brand.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${watt}w_${cert}`.replace(/_+/g, '_');
  if (!psuMap.has(id)) {
    psuMap.set(id, {
      id,
      nama: cleanName,
      watt,
      cert,
      harga: price,
      spesifikasi: `${watt}W, 80+ ${cert.toUpperCase()} (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 6. STORAGE SSD (Total: 2640 baris)
// ---------------------------------------------------------------------
const rawSsds = readAllLines('StorageSSD.csv');
const ssdMap = new Map();

rawSsds.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (price < 180000) return;

  let tipe = /nvme|m\.2|pcie/i.test(t) ? 'nvme' : 'sata';
  let cap = 500;
  if (/(\d+)\s*TB/i.test(t)) {
    cap = parseInt(t.match(/(\d+)\s*TB/i)[1], 10) * 1000;
  } else if (/(\d+)\s*GB/i.test(t)) {
    cap = parseInt(t.match(/(\d+)\s*GB/i)[1], 10);
  }

  let brandMatch = t.match(/(Samsung|Crucial|Western Digital|WD|Kingston|Seagate|XPG|SanDisk|Kioxia)/i);
  let brand = brandMatch ? brandMatch[0] : 'SSD';

  let cleanName = t.replace(/\(.*?\)/g, '').replace(/solid state drive|internal ssd|\(ssd\)/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  const id = `ssd_${brand.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${cap}gb_${tipe}`.replace(/_+/g, '_');
  if (!ssdMap.has(id)) {
    ssdMap.set(id, {
      id,
      nama: cleanName,
      tipe,
      cap,
      harga: price,
      spesifikasi: `${cap >= 1000 ? cap/1000 + 'TB' : cap + 'GB'} ${tipe.toUpperCase()} M.2 (Kaggle Dataset)`
    });
  }
});

// ---------------------------------------------------------------------
// 7. CASING PC (Total: 3120 baris)
// ---------------------------------------------------------------------
const rawCases = readAllLines('cabinates.csv');
const caseMap = new Map();

rawCases.forEach((item, idx) => {
  const t = item.title;
  const price = item.priceIdr;
  if (/stun gun|shock|flashlight|caddy|lcd cover|hinges|enclosure|fan\b/i.test(t)) return; // filter barang non-casing
  if (price < 300000 || price > 15000000) return;

  let form = 'atx';
  if (/micro\s*atx|mini\s*tower|matx/i.test(t)) form = 'matx';

  let brandMatch = t.match(/(Ant Esports|Deepcool|Cooler Master|MSI|Lian Li|NZXT|Montech|Galax|Corsair|Zebronics)/i);
  let brand = brandMatch ? brandMatch[0] : 'Case';

  let cleanName = t.replace(/\(.*?\)/g, '').replace(/gaming cabinet|cabinet|computer case/gi, '').trim();
  cleanName = cleanName.replace(/\s+/g, ' ').substring(0, 48);

  let mMatch = t.match(/(ICE-\w+|MATREXX\s*\w+|MAG\s*\w+|O11\s*\w+|H500|D500\w*)/i);
  let modelKey = mMatch ? mMatch[0].toLowerCase().replace(/[^a-z0-9]/g, '_') : `case_${idx}`;
  const id = `case_${brand.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${modelKey}`.replace(/_+/g, '_');

  if (!caseMap.has(id) && caseMap.size < 50) {
    caseMap.set(id, {
      id,
      nama: cleanName,
      form,
      harga: price,
      spesifikasi: `Support ${form.toUpperCase()} (Kaggle Dataset)`
    });
  }
});

console.log('\n============================================================');
console.log('HASIL EKSTRAKSI MENYELURUH DARI 12.797 BARIS DATA KAGGLE:');
console.log('============================================================');
console.log(`* Total CPU Unik Valid         : ${cpuMap.size} produk`);
console.log(`* Total GPU Unik Valid         : ${gpuMap.size} produk (Termasuk Intel Arc Series)`);
console.log(`* Total Motherboard Unik Valid : ${moboMap.size} produk`);
console.log(`* Total RAM Unik Valid         : ${ramMap.size} produk`);
console.log(`* Total Power Supply Valid     : ${psuMap.size} produk`);
console.log(`* Total Storage SSD Valid      : ${ssdMap.size} produk`);
console.log(`* Total Casing Valid           : ${caseMap.size} produk`);

const allExtracted = [
  ...Array.from(cpuMap.values()).map(c => ({ ...c, kategori: 'cpu', iconName: 'Cpu' })),
  ...Array.from(moboMap.values()).map(m => ({ ...m, kategori: 'motherboard', iconName: 'CircuitBoard' })),
  ...Array.from(ramMap.values()).map(r => ({ ...r, kategori: 'ram', iconName: 'Layers' })),
  ...Array.from(gpuMap.values()).map(g => ({ ...g, kategori: 'gpu', iconName: 'HardDrive' })),
  ...Array.from(psuMap.values()).map(p => ({ ...p, kategori: 'psu', iconName: 'Zap' })),
  ...Array.from(ssdMap.values()).map(s => ({ ...s, kategori: 'storage', iconName: 'Database' })),
  ...Array.from(caseMap.values()).map(cs => ({ ...cs, kategori: 'casing', iconName: 'Box' })),
];

console.log(`\nTOTAL SELURUH HARDWARE BERSIH TERDAFTAR: ${allExtracted.length} KOMPONEN!`);

// Save to extracted_components.json
fs.writeFileSync(path.join(__dirname, '..', 'lib', 'extracted_components.json'), JSON.stringify(allExtracted, null, 2), 'utf-8');
console.log('Sukses memperbarui lib/extracted_components.json!');

// Update pakar_pc.pl with all facts
let plContent = `% ======================================================================
% SISTEM PAKAR KONSULTAN PERAKITAN PC & CEK KOMPATIBILITAS (AI WITH PROLOG)
% Berdasarkan Teknik: Logic, Rules, and Representation
% Program Studi: Informatika, Fakultas Teknik, Universitas Siliwangi
% Dosen Pengampu: Dr. Aradea, S.T., M.T.
%
% Anggota Kelompok:
% 1. Muhammad Ammar Luthfi Azzufar (NPM: 247006111118)
% 2. Muhammad Adryan Suryaman       (NPM: 247006111060)
% 3. Muhammad Ziya Pasya Alghifari  (NPM: 247006111111)
%
% SUMBER DATA: Kaggle PC Components Dataset (12.797 Baris Data)
% Dikonversi Otomatis dari Mata Uang Rupee (INR) ke Rupiah (IDR x 190)
% Total Hardware Terverifikasi: ${allExtracted.length} Komponen
% ======================================================================

:- dynamic cpu/7.
:- dynamic motherboard/6.
:- dynamic ram/6.
:- dynamic gpu/7.
:- dynamic psu/5.
:- dynamic storage/5.
:- dynamic casing/4.

% ======================================================================
% 1. KNOWLEDGE BASE: FAKTA ONTOLOGI HARDWARE PC LENGKAP
% ======================================================================

% A. FAKTA PROSESOR (CPU)
% cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier).
`;

cpuMap.forEach(c => {
  const safeName = c.nama.replace(/'/g, "''");
  plContent += `cpu(${c.id}, '${safeName}', ${c.brand.toLowerCase()}, ${c.socket}, ${c.tdp}, ${c.harga}, ${c.tier}).\n`;
});

plContent += `\n% B. FAKTA MOTHERBOARD\n% motherboard(Kode, Nama, Socket, TipeRAM, FormFactor, Harga).\n`;
moboMap.forEach(m => {
  const safeName = m.nama.replace(/'/g, "''");
  plContent += `motherboard(${m.id}, '${safeName}', ${m.socket}, ${m.ramType}, ${m.form}, ${m.harga}).\n`;
});

plContent += `\n% C. FAKTA MEMORI (RAM)\n% ram(Kode, Nama, TipeRAM, KapasitasGB, SpeedMHz, Harga).\n`;
ramMap.forEach(r => {
  const safeName = r.nama.replace(/'/g, "''");
  plContent += `ram(${r.id}, '${safeName}', ${r.ramType}, ${r.cap}, ${r.speed}, ${r.harga}).\n`;
});

plContent += `\n% D. FAKTA KARTU GRAFIS (GPU - Termasuk Intel Arc)\n% gpu(Kode, Nama, Brand, MinWattPSU, VRAM_GB, Harga, Tier).\n`;
gpuMap.forEach(g => {
  const safeName = g.nama.replace(/'/g, "''");
  plContent += `gpu(${g.id}, '${safeName}', ${g.brand.toLowerCase()}, ${g.minPsu}, ${g.vram}, ${g.harga}, ${g.tier}).\n`;
});

plContent += `\n% E. FAKTA POWER SUPPLY (PSU)\n% psu(Kode, Nama, Watt, Sertifikasi, Harga).\n`;
psuMap.forEach(p => {
  const safeName = p.nama.replace(/'/g, "''");
  plContent += `psu(${p.id}, '${safeName}', ${p.watt}, ${p.cert}, ${p.harga}).\n`;
});

plContent += `\n% F. FAKTA STORAGE SSD\n% storage(Kode, Nama, Tipe, KapasitasGB, Harga).\n`;
ssdMap.forEach(s => {
  const safeName = s.nama.replace(/'/g, "''");
  plContent += `storage(${s.id}, '${safeName}', ${s.tipe}, ${s.cap}, ${s.harga}).\n`;
});

plContent += `\n% G. FAKTA CASING PC\n% casing(Kode, Nama, FormFactorSupport, Harga).\n`;
caseMap.forEach(cs => {
  const safeName = cs.nama.replace(/'/g, "''");
  plContent += `casing(${cs.id}, '${safeName}', ${cs.form}, ${cs.harga}).\n`;
});

plContent += `
% ======================================================================
% 2. INFERENCE ENGINE: ATURAN KOMPATIBILITAS (LOGIC & RULES)
% ======================================================================

cocok_cpu_mobo(CPU, Mobo) :-
    cpu(CPU, _, _, Socket, _, _, _),
    motherboard(Mobo, _, Socket, _, _, _).

cocok_mobo_ram(Mobo, RAM) :-
    motherboard(Mobo, _, _, TipeRAM, _, _),
    ram(RAM, _, TipeRAM, _, _, _).

daya_psu_cukup(GPU, PSU) :-
    gpu(GPU, _, _, MinWatt, _, _, _),
    psu(PSU, _, Watt, _, _),
    Watt >= MinWatt.

cocok_mobo_casing(Mobo, Casing) :-
    motherboard(Mobo, _, _, _, FormMobo, _),
    casing(Casing, _, FormCasing, _),
    ( FormCasing == atx ; FormCasing == FormMobo ).

rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing) :-
    cocok_cpu_mobo(CPU, Mobo),
    cocok_mobo_ram(Mobo, RAM),
    daya_psu_cukup(GPU, PSU),
    cocok_mobo_casing(Mobo, Casing),
    storage(Storage, _, _, _, _).

% ======================================================================
% 3. OPERASI LIST & REKURSI HARGA & DAYA (Slide 39-50 Silabus AI)
% ======================================================================

harga_item(CPU, H) :- cpu(CPU, _, _, _, _, H, _), !.
harga_item(Mobo, H) :- motherboard(Mobo, _, _, _, _, H), !.
harga_item(RAM, H) :- ram(RAM, _, _, _, _, H), !.
harga_item(GPU, H) :- gpu(GPU, _, _, _, _, H, _), !.
harga_item(PSU, H) :- psu(PSU, _, _, _, H), !.
harga_item(Storage, H) :- storage(Storage, _, _, _, H), !.
harga_item(Casing, H) :- casing(Casing, _, _, H), !.
harga_item(_, 0).

hitung_total_harga([], 0).
hitung_total_harga([Head|Tail], TotalHarga) :-
    harga_item(Head, H),
    hitung_total_harga(Tail, SubTotal),
    TotalHarga is H + SubTotal.

anggota(X, [X|_]).
anggota(X, [_|Tail]) :- anggota(X, Tail).

form_factor_irisan(X, List1, List2) :-
    anggota(X, List1),
    anggota(X, List2).

% ======================================================================
% 4. ATURAN PENALARAN REKOMENDASI SESUAI KEBUTUHAN PENGGUNA
% ======================================================================

% Kebutuhan 1: Office, Pelajar & Coding Santai (Budget Ringan ~ Rp 5-8 Juta)
rekomendasi(office_coding, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Hemat daya, CPU efisien multitasking & kartu grafis ramah anggaran') :-
    CPU = cpu_i3_12100f,
    Mobo = mobo_b660m_plus_ddr4,
    RAM = ram_corsair_ddr4_16gb_3200,
    GPU = gpu_nvidia_gtx_1650,
    PSU = psu_cooler_master_450w_bronze,
    Storage = ssd_western_digital_500gb_nvme,
    Casing = case_deepcool_matrexx_30,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Kebutuhan 2: Esports Gaming 1080p High FPS (Budget ~ Rp 9-13 Juta)
rekomendasi(esports_gaming, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Sangat optimal untuk Valorant, CS2, Dota 2, dan game AAA 1080p setting tinggi') :-
    CPU = cpu_ryzen_5_5600g,
    Mobo = mobo_b550m_ddr4,
    RAM = ram_corsair_ddr4_16gb_3200,
    GPU = gpu_amd_rx_6600,
    PSU = psu_psu_550w_bronze,
    Storage = ssd_western_digital_1000gb_nvme,
    Casing = case_ant_esports_case_50,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Kebutuhan 3: Intel Arc Creator & Gaming Edition
rekomendasi(intel_arc_edition, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Varian Intel Arc A750 8GB dengan akselerasi hardware AV1 encoder & XMX AI cores') :-
    CPU = cpu_i5_12400f,
    Mobo = mobo_b660m_plus_ddr4,
    RAM = ram_corsair_ddr4_16gb_3200,
    GPU = gpu_intel_arc_a750,
    PSU = psu_psu_650w_bronze,
    Storage = ssd_western_digital_1000gb_nvme,
    Casing = case_cooler_master_d500d,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Kebutuhan 4: AAA Gaming 1440p AM5 (Budget ~ Rp 15-20 Juta)
rekomendasi(aaa_gaming, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Platform modern AM5 & DDR5, siap libas game berat Cyberpunk & Black Myth Wukong 1440p') :-
    CPU = cpu_ryzen_5_7600x,
    Mobo = mobo_b650m_ddr5,
    RAM = ram_g_skill_ddr5_32gb_6000,
    GPU = gpu_nvidia_rtx_4060,
    PSU = psu_psu_650w_bronze,
    Storage = ssd_western_digital_1000gb_nvme,
    Casing = case_lian_li_case_15,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Kebutuhan 5: Content Creation & Video Editing 4K / 3D Rendering (Budget ~ Rp 22-30 Juta)
rekomendasi(content_creation, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Multi-core tinggi untuk rendering Blender, Premiere Pro 4K, dan CUDA rendering') :-
    CPU = cpu_ryzen_9_5900x,
    Mobo = mobo_b550m_ddr4,
    RAM = ram_crucial_ddr4_32gb_3200,
    GPU = gpu_nvidia_rtx_4070,
    PSU = psu_psu_750w_gold,
    Storage = ssd_crucial_1000gb_nvme,
    Casing = case_cooler_master_h500,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Kebutuhan 6: Ultimate Enthusiast Gaming Flagship (Budget > Rp 35 Juta)
rekomendasi(enthusiast_flagship, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Rajanya CPU Gaming dunia Ryzen 9 5950X dipadukan grafis monster RTX 3090 24GB tanpa kompromi') :-
    CPU = cpu_ryzen_9_5950x,
    Mobo = mobo_x570_ddr4,
    RAM = ram_g_skill_ddr4_32gb_3600,
    GPU = gpu_nvidia_rtx_3090,
    PSU = psu_psu_850w_gold,
    Storage = ssd_western_digital_1000gb_nvme,
    Casing = case_lian_li_case_15,
    rakitan_valid(CPU, Mobo, RAM, GPU, PSU, Storage, Casing),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Storage, Casing], TotalHarga), !.

% Fallback aman tanpa rekursi tak terbatas
rekomendasi_kebutuhan(Kategori, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, Catatan) :-
    rekomendasi(Kategori, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, Catatan), !.
rekomendasi_kebutuhan(_, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, Catatan) :-
    rekomendasi(esports_gaming, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, Catatan), !.

% ======================================================================
% 5. CEK KOMPATIBILITAS KUSTOM (EXPLANATORY INTERFACE)
% ======================================================================

analisis_kompatibilitas(CPU, Mobo, RAM, GPU, PSU, Casing, Status, ListAlasan) :-
    cek_alasan_cpu_mobo(CPU, Mobo, A1),
    cek_alasan_mobo_ram(Mobo, RAM, A2),
    cek_alasan_psu(GPU, PSU, A3),
    cek_alasan_casing(Mobo, Casing, A4),
    ListAlasan = [A1, A2, A3, A4],
    (   (A1 == ok, A2 == ok, A3 == ok, A4 == ok)
    ->  Status = kompatibel
    ;   Status = tidak_kompatibel
    ).

cek_alasan_cpu_mobo(CPU, Mobo, ok) :- cocok_cpu_mobo(CPU, Mobo), !.
cek_alasan_cpu_mobo(CPU, Mobo, 'Socket CPU dan Motherboard berbeda (tidak muat secara fisik)') :-
    \\+ cocok_cpu_mobo(CPU, Mobo).

cek_alasan_mobo_ram(Mobo, RAM, ok) :- cocok_mobo_ram(Mobo, RAM), !.
cek_alasan_mobo_ram(Mobo, RAM, 'Tipe generasi RAM (DDR4 vs DDR5 vs DDR3) tidak sesuai dengan slot motherboard') :-
    \\+ cocok_mobo_ram(Mobo, RAM).

cek_alasan_psu(GPU, PSU, ok) :- daya_psu_cukup(GPU, PSU), !.
cek_alasan_psu(GPU, PSU, 'Daya PSU terlalu kecil untuk kebutuhan daya minimum kartu grafis (GPU)') :-
    \\+ daya_psu_cukup(GPU, PSU).

cek_alasan_casing(Mobo, Casing, ok) :- cocok_mobo_casing(Mobo, Casing), !.
cek_alasan_casing(Mobo, Casing, 'Ukuran Motherboard ATX terlalu besar untuk Casing Micro-ATX') :-
    \\+ cocok_mobo_casing(Mobo, Casing).

% ======================================================================
% 6. MODE BATCH (INTERFACE KE BACKEND NEXT.JS / NODE.JS)
% ======================================================================

batch_rekomendasi(Kebutuhan) :-
    (   rekomendasi_kebutuhan(Kebutuhan, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, Total, Catatan)
    ->  cpu(CPU, NamaCPU, _, Socket, _, _, _),
        motherboard(Mobo, NamaMobo, _, TipeRAM, _, _),
        ram(RAM, NamaRAM, _, _, _, _),
        gpu(GPU, NamaGPU, _, _, _, _, _),
        psu(PSU, NamaPSU, WattPSU, _, _),
        storage(Storage, NamaSSD, _, _, _),
        casing(Casing, NamaCase, _, _),
        format(atom(Output), 'RESULT_BUILD:~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w|~w~n',
               [Kebutuhan, CPU, NamaCPU, Mobo, NamaMobo, RAM, NamaRAM, GPU, NamaGPU, PSU, NamaPSU, Storage, NamaSSD, Casing, NamaCase, Total]),
        write(Output),
        write('JUSTIFIKASI:Komponen 100% kompatibel di socket '), write(Socket),
        write(', RAM '), write(TipeRAM), write(', PSU '), write(WattPSU), write('W mencukupi. Catatan: '),
        write(Catatan), nl
    ;   write('RESULT_BUILD:error|Kebutuhan tidak dikenali|0'), nl
    ).

batch_cek_kompatibilitas(CPU, Mobo, RAM, GPU, PSU, Casing) :-
    analisis_kompatibilitas(CPU, Mobo, RAM, GPU, PSU, Casing, Status, ListAlasan),
    hitung_total_harga([CPU, Mobo, RAM, GPU, PSU, Casing], TotalHarga),
    format(atom(Output), 'RESULT_CHECK:~w|~w|~w~n', [Status, TotalHarga, ListAlasan]),
    write(Output).

mulai :-
    nl,
    write('================================================================='), nl,
    write('   SISTEM PAKAR KONSULTAN PERAKITAN PC CERDAS (PROLOG AI)        '), nl,
    write('   Basis Pengetahuan: ${allExtracted.length} Komponen Hardware Kaggle Dataset   '), nl,
    write('================================================================='), nl,
    write('Pilih nomor kebutuhan komputasi kamu:'), nl,
    write(' 1. Office, Pelajar & Coding Santai (Budget ~ Rp 5-8 Juta)'), nl,
    write(' 2. Esports Gaming 1080p High FPS (Budget ~ Rp 9-13 Juta)'), nl,
    write(' 3. Intel Arc Special Creator Edition (~ Rp 10-12 Juta)'), nl,
    write(' 4. AAA Gaming 1440p & Streaming (Budget ~ Rp 15-20 Juta)'), nl,
    write(' 5. Content Creation & Video Editing 4K (Budget ~ Rp 22-30 Juta)'), nl,
    write(' 6. Ultimate Enthusiast Gaming Flagship (Budget > Rp 35 Juta)'), nl,
    write('Pilihan kamu (1-6 diakhiri titik, misal: 2.): '),
    read(Pilihan),
    petakan_pilihan(Pilihan, Kategori),
    rekomendasi_kebutuhan(Kategori, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, Total, Catatan),
    cpu(CPU, NCPU, _, S, _, _, _),
    motherboard(Mobo, NMobo, _, TRAM, _, _),
    ram(RAM, NRAM, _, _, _, _),
    gpu(GPU, NGPU, _, _, _, _, _),
    psu(PSU, NPSU, _, _, _),
    storage(Storage, NSSD, _, _, _),
    casing(Casing, NCase, _, _),
    nl,
    write('================================================================='), nl,
    write(' HASIL REKOMENDASI PENALARAN LOGIKA SISTEM PAKAR                 '), nl,
    write('================================================================='), nl,
    format(' * CPU         : ~w (Socket ~w)~n', [NCPU, S]),
    format(' * Motherboard : ~w (Support ~w)~n', [NMobo, TRAM]),
    format(' * RAM         : ~w~n', [NRAM]),
    format(' * GPU         : ~w~n', [NGPU]),
    format(' * Power Supply: ~w~n', [NPSU]),
    format(' * Penyimpanan : ~w~n', [NSSD]),
    format(' * Casing      : ~w~n', [NCase]),
    format(' * Estimasi    : Rp ~:d~n', [Total]),
    write('-----------------------------------------------------------------'), nl,
    format(' EXPLANATORY INTERFACE: ~w~n', [Catatan]),
    write(' Semua komponen terbukti VALID dan LOLOS uji kompatibilitas formal!'), nl,
    write('================================================================='), nl.

petakan_pilihan(1, office_coding).
petakan_pilihan(2, esports_gaming).
petakan_pilihan(3, intel_arc_edition).
petakan_pilihan(4, aaa_gaming).
petakan_pilihan(5, content_creation).
petakan_pilihan(6, enthusiast_flagship).
petakan_pilihan(_, esports_gaming).
`;

fs.writeFileSync(path.join(__dirname, '..', 'pakar_pc.pl'), plContent, 'utf-8');
console.log(`Sukses memperbarui pakar_pc.pl dengan ${allExtracted.length} fakta komponen hardware!`);
