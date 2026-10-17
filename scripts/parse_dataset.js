const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const INR_TO_IDR = 190;

function parsePrice(mrpStr) {
  if (!mrpStr) return 0;
  const clean = mrpStr.replace(/[₹",\s]/g, '');
  const inr = parseFloat(clean);
  if (isNaN(inr)) return 0;
  return Math.round((inr * INR_TO_IDR) / 10000) * 10000; // bulatkan ke puluhan ribu
}

function parseCSVLines(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV row parser handling quotes
    const match = line.match(/^(\d+)?,?(.*?),"?([₹0-9,]+)"?$/);
    if (match) {
      rows.push({
        text: match[2].replace(/^["']|["']$/g, '').trim(),
        price: parsePrice(match[3])
      });
    } else {
      // Fallback split by comma
      const parts = line.split(',');
      if (parts.length >= 2) {
        const pStr = parts[parts.length - 1];
        const text = parts.slice(1, parts.length - 1).join(' ').replace(/^["']|["']$/g, '').trim();
        rows.push({
          text,
          price: parsePrice(pStr)
        });
      }
    }
  }
  return rows;
}

console.log('--- Membaca Dataset Kaggle di folder /data ---');

// 1. Parse CPUs
const cpuRows = parseCSVLines(path.join(DATA_DIR, 'CPU.csv'));
console.log(`Ditemukan ${cpuRows.length} baris CPU.`);

// 2. Parse GPUs
const gpuRows = parseCSVLines(path.join(DATA_DIR, 'GPU.csv'));
console.log(`Ditemukan ${gpuRows.length} baris GPU.`);

// 3. Parse Motherboards
const moboRows = parseCSVLines(path.join(DATA_DIR, 'MotherBoard.csv'));
console.log(`Ditemukan ${moboRows.length} baris Motherboard.`);

// 4. Parse PowerSupply
const psuRows = parseCSVLines(path.join(DATA_DIR, 'PowerSupply.csv'));
console.log(`Ditemukan ${psuRows.length} baris PSU.`);

// 5. Parse RAM
const ramRows = parseCSVLines(path.join(DATA_DIR, 'RAM.csv'));
console.log(`Ditemukan ${ramRows.length} baris RAM.`);

// 6. Parse Storage
const ssdRows = parseCSVLines(path.join(DATA_DIR, 'StorageSSD.csv'));
console.log(`Ditemukan ${ssdRows.length} baris Storage.`);

// 7. Parse Cabinets
const caseRows = parseCSVLines(path.join(DATA_DIR, 'cabinates.csv'));
console.log(`Ditemukan ${caseRows.length} baris Casing.`);

console.log('Semua file CSV berhasil dibaca dan siap dikonversi ke Rupiah (x 190)!');
