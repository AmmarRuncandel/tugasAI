# 🧠 212 — NetExpert AI
### Sistem Pakar Diagnosis Gangguan Jaringan Komputer Berbasis SWI-Prolog & Next.js
> **Tugas Besar Mata Kuliah Kecerdasan Buatan (Artificial Intelligence)**  
> **Program Studi Informatika — Fakultas Teknik — Universitas Siliwangi**  
> **Dosen Pengampu:** Dr. Aradea, S.T., M.T.

---

## 👥 Tim Pengembang (Kelompok Mahasiswa)

| No | Nama Mahasiswa | NPM | Peran & Kontribusi |
|:---:|:---|:---:|:---|
| **1** | **Muhammad Ammar Luthfi Azzufar** | `247006111118` | Knowledge Base Formulation, Rule Design & Fullstack Integration |
| **2** | **Muhammad Adryan Suryaman** | `247006111060` | Knowledge Acquisition, Symptom Verification & Test Validation |
| **3** | **Muhammad Ziya Pasya Alghifari** | `247006111111` | UI/UX Architecture, Data Analysis & Topology Representation |

---

## 📌 Deskripsi Sistem

**NetExpert AI (212)** adalah aplikasi Sistem Pakar modern yang mengintegrasikan paradigma **pemrograman deklaratif logika murni (SWI-Prolog)** sebagai mesin penalaran (*Inference Engine*) dengan antarmuka web modern (*Next.js 16 & TypeScript*). 

Sistem ini dirancang untuk mendiagnosis **7 jenis kerusakan jaringan komputer** yang mencakup lapisan OSI (*Physical, Data Link, Network, hingga Application Layer*) berdasarkan analisis **13 fakta gejala** menggunakan metode penalaran **Backward-Chaining (Goal-Driven)**.

### ✨ Fitur Unggulan
1. **Real SWI-Prolog Subprocess Bridge**: Bukan simulasi JavaScript, melainkan penalaran langsung yang diproses oleh binary SWI-Prolog melalui `child_process`.
2. **Explanatory Interface**: Menampilkan transparansi justifikasi penalaran mengapa kesimpulan ditarik dan daftar gejala apa saja yang memicunya.
3. **Interactive Diagnosis Stepper**: Kuesioner diagnosis bertahap dengan animasi halus (*Framer Motion*) dan dukungan shortcut keyboard (`Y` untuk Ya, `T` untuk Tidak, `B` untuk Kembali).
4. **Knowledge Base Explorer**: Modul verifikasi akademik berisi **5 Query Prolog** sesuai silabus perkuliahan AI (Ekstraksi Variabel, Conjunctive Query, Rekursi Topologi, Operasi List Irisan Gejala, dan Seluruh Ontologi KB).
5. **Dark Modern UI/UX**: Desain antarmuka gelap premium terinspirasi dari Binance & macOS Frosted Glass.

---

## 🛠️ Prasyarat Sistem (Prerequisites)

Sebelum menjalankan aplikasi, pastikan komputer/laptop telah terpasang:

1. **Node.js**: Versi `v18.17+` atau disarankan `v20+` / `v24+`.  
   *Cek versi:* `node -v`
2. **SWI-Prolog**: Versi `9.x` atau yang lebih baru.  
   *Unduh gratis di situs resmi:* [https://www.swi-prolog.org/download/stable](https://www.swi-prolog.org/download/stable)  
   *(Pastikan memilih opsi **"Add swipl to system PATH"** saat instalasi jika menggunakan installer Windows).*
3. **Git**: Untuk clone dan pull repository.

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan program di komputer kamu:

### 1. Clone Repository & Masuk Direktori
```bash
git clone <URL_REPOSITORY_GITHUB>
cd tugasAI
```

### 2. Install Dependencies
Jalankan perintah berikut untuk mengunduh semua library (Next.js, Framer Motion, Lucide React, dll.):
```bash
npm install
```

### 3. Konfigurasi Environment (`.env.local`)
Sistem secara otomatis mencoba mendeteksi lokasi instalasi SWI-Prolog di komputermu. Namun, agar lebih pasti dan menghindari perbedaan letak folder antar komputer anggota tim:

1. Duplikat file template `.env.example` menjadi `.env.local`:
   * **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env.local
     ```
   * **Linux / macOS:**
     ```bash
     cp .env.example .env.local
     ```
2. Buka file `.env.local` dan sesuaikan lokasi file biner `swipl` di komputermu:
   * **Windows (Lokasi Default Drive C):**
     ```env
     SWIPL_PATH=C:\Program Files\swipl\bin\swipl.exe
     ```
   * **Windows (Jika Terinstall di Drive D):**
     ```env
     SWIPL_PATH=D:\swipl\bin\swipl.exe
     ```
   * **macOS (Homebrew Apple Silicon):**
     ```env
     SWIPL_PATH=/opt/homebrew/bin/swipl
     ```
   * **Linux (Ubuntu/Debian via apt):**
     ```env
     SWIPL_PATH=/usr/bin/swipl
     ```
   *(Catatan: File `.env.local` sudah diabaikan oleh `.gitignore`, sehingga konfigurasi pribadi kamu tidak akan saling menimpa saat `git pull` atau `git push`).*

### 4. Jalankan Development Server
```bash
npm run dev
```

### 5. Buka Aplikasi di Browser
Buka browser favoritmu (Chrome, Edge, Firefox) dan akses:
👉 **[http://localhost:3000](http://localhost:3000)**

*(Periksa indikator status di pojok kanan atas Navbar. Jika tertulis **`● SWI-Prolog Online`** berwarna hijau, artinya backend web telah sukses berkomunikasi dengan runtime SWI-Prolog).*

---

## 🧭 Panduan Navigasi & Modul Halaman

| Halaman | URL | Penjelasan & Fungsi |
|:---|:---|:---|
| **Beranda** | `/` | Showcase 7 jenis kerusakan jaringan, 4 pilar sistem pakar, dan diagram alur inferensi sistem. |
| **Mulai Diagnosis** | `/diagnose` | Konsultasi interaktif penelusuran 13 gejala jaringan. Menghasilkan analisis diagnosis, derajat keparahan, solusi perbaikan, dan justifikasi penalaran Explanatory Interface. |
| **KB Explorer** | `/explorer` | Verifikasi langsung 5 query akademik Prolog (ekstraksi variabel ontologi, conjunctive logic, traversal rekursi rute topologi kampus, dan irisan list). |
| **Tentang Sistem** | `/about` | Pembahasan 4 pilar sistem pakar klasik (*Knowledge Acquisition, Knowledge Base, Inference Engine, Explanatory Interface*), teknologi yang dipakai, dan identitas tim pengembang. |

---

## 🗂️ Ontologi Knowledge Base (`pakar_jaringan.pl`)

Knowledge Base memuat **7 Aturan Produksi (Production Rules)** yang diklasifikasikan berdasarkan hierarki Model OSI:

| Kode Diagnosis | Nama Masalah Jaringan | Kategori OSI Layer | Tingkat Keparahan | Gejala Syarat Pemicu |
|:---|:---|:---|:---:|:---|
| `kabel_lan_rusak` | Kerusakan Fisik Kabel / Port LAN | Physical Layer (L1) | Tinggi | Lampu LAN mati, kabel status unplugged |
| `wifi_signal_weak` | Sinyal WiFi Lemah / Interferensi | Physical Layer (L1) | Sedang | Sinyal 1 bar, latency sangat lambat |
| `ip_conflict` | Konflik Alamat IP (IP Conflict) | Network Layer (L3) | Tinggi | Muncul notif IP conflict, IP APIPA 169.254.x.x |
| `gateway_down` | Default Gateway / Router Down | Network Layer (L3) | Tinggi | Terhubung LAN/WiFi, ping ke gateway gagal |
| `dns_failure` | Kegagalan Resolusi DNS Server | Application Layer (L7) | Sedang | Ping IP 8.8.8.8 berhasil, namun buka domain web gagal |
| `isp_outage` | Gangguan Jalur Utama ISP | Network Layer (L3) | Tinggi | Ping gateway berhasil, namun ping IP publik 8.8.8.8 gagal |
| `driver_adapter_error` | Masalah Driver Network Adapter | Data Link Layer (L2) | Tinggi | Tanda seru kuning pada Device Manager |

---

## 📁 Struktur Direktori Proyek

```
tugasAI/
├── app/
│   ├── about/page.tsx        # Halaman Tentang Sistem & Arsitektur
│   ├── api/
│   │   ├── diagnose/route.ts # Endpoint API inferensi batch diagnosis Prolog
│   │   └── query/route.ts    # Endpoint API pengujian 5 query akademik Prolog
│   ├── diagnose/page.tsx     # Halaman konsultasi kuesioner diagnosis
│   ├── explorer/page.tsx     # Halaman Knowledge Base Explorer
│   ├── globals.css           # Styling dasar, tema gelap, & CSS variables
│   ├── icon.svg              # Vektor favicon resmi "212"
│   ├── layout.tsx            # Root layout, font Inter & JetBrains Mono, Nav & Footer
│   └── page.tsx              # Halaman Beranda (Landing Page)
├── components/
│   ├── about/                # Komponen halaman Tentang Sistem & Tim
│   ├── diagnose/             # Komponen quiz, stepper kuesioner, & hasil Explanatory
│   ├── explorer/             # Komponen selector query & penampil hasil eksekusi
│   ├── home/                 # Komponen hero, feature grid, & showcase ontologi
│   ├── layout/               # Navbar & Footer
│   └── ui/                   # Reusable components (GlassCard, Button, Badge, CodeBlock)
├── lib/
│   ├── constants.ts          # Dataset gejala, diagnosis, query, & identitas tim
│   ├── prolog.ts             # Bridge subprocess SWI-Prolog & auto path resolution
│   ├── types.ts              # Definisi interface TypeScript
│   └── utils.ts              # Utility class Tailwind cn() & formatters
├── pakar_jaringan.pl         # Knowledge Base, Fakta, Aturan, & Topologi Prolog
├── .env.example              # Template variabel konfigurasi environment
├── .env.local                # Konfigurasi lokal (diabaikan oleh Git)
├── package.json              # Daftar dependensi package project
└── README.md                 # Dokumentasi panduan lengkap proyek
```

---

## ❓ FAQ & Troubleshooting

### Q1: Navbar menampilkan indikator "Prolog Offline" warna merah?
**Solusi:**
1. Pastikan software SWI-Prolog sudah terinstall di komputermu.
2. Buka file `.env.local`, periksa kembali apakah path `SWIPL_PATH` sudah mengarah ke file `swipl.exe` yang benar di komputermu (misal: `C:\Program Files\swipl\bin\swipl.exe`).
3. Restart server pengembangan dengan menekan `Ctrl + C` di terminal, lalu jalankan `npm run dev` kembali.

### Q2: Port 3000 sudah terpakai oleh aplikasi lain (*EADDRINUSE*)?
**Solusi:**
Jalankan dev server di port lain:
```bash
npm run dev -- -p 3001
```
Lalu buka browser di `http://localhost:3001`.

### Q3: Apakah bisa dijalankan langsung dari Terminal SWI-Prolog biasa tanpa web?
**Bisa.** File `pakar_jaringan.pl` mendukung mode interaktif konsol:
1. Buka terminal, masuk ke folder project:
   ```bash
   swipl pakar_jaringan.pl
   ```
2. Ketik perintah:
   ```prolog
   ?- mulai.
   ```
3. Jawab pertanyaan interaktif dengan mengetik `y.` atau `t.` (diakhiri titik).

---

## 📜 Lisensi & Hak Cipta
Dikembangkan sebagai pemenuhan Tugas Besar Mata Kuliah Kecerdasan Buatan (AI) Tahun Akademik 2026.  
**Universitas Siliwangi — Jurusan Informatika.**
