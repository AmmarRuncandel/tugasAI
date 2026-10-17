# 🧠 212 — PCExpert AI
### Sistem Pakar Konsultan Perakitan PC & Kompatibilitas Hardware Berbasis SWI-Prolog & Next.js
> **Tugas Besar Mata Kuliah Kecerdasan Buatan (Artificial Intelligence)**  
> **Program Studi Informatika — Fakultas Teknik — Universitas Siliwangi**  
> **Dosen Pengampu:** Dr. Aradea, S.T., M.T.  
> **Sesuai Ketentuan:** Sistem Cerdas • Logic, Rules and Representation • Logic Programming (PROLOG)

---

## 👥 Tim Pengembang (Kelompok Mahasiswa)

| No | Nama Mahasiswa | NPM | Peran & Kontribusi Utama |
|:---:|:---|:---:|:---|
| **1** | **Muhammad Ammar Luthfi Azzufar** | `247006111118` | Knowledge Base Formulation, Rule Design & Fullstack Integration |
| **2** | **Muhammad Adryan Suryaman** | `247006111060` | Hardware Acquisition, Compatibility Verification & Test Validation |
| **3** | **Muhammad Ziya Pasya Alghifari** | `247006111111` | UI/UX Architecture, Data Analysis & Topology Representation |

---

## 📌 1. Deskripsi & Domain Permasalahan Sistem

**PCExpert AI (212)** adalah sistem pakar cerdas yang memadukan paradigma **pemrograman deklaratif logika murni (SWI-Prolog)** sebagai mesin penalaran (*Inference Engine*) dengan antarmuka web modern (*Next.js 16, TypeScript, Tailwind CSS, & Framer Motion*).

Sistem ini bertindak sebagai **Konsultan Perakitan Komputer Ahli** yang memecahkan masalah pemilihan komponen hardware PC. Merakit PC melibatkan ratusan aturan kompatibilitas fisik dan elektrikal yang ketat:
* **Kompatibilitas Socket:** Prosesor Intel LGA1700 hanya dapat dipasang pada Motherboard socket LGA1700 (H610/B660/B760). Prosesor AMD AM5 hanya cocok dengan Motherboard AM5 (A620/B650/X670).
* **Kompatibilitas Generasi Memori (RAM):** Motherboard DDR4 hanya dapat menerima keping RAM DDR4, sedangkan Motherboard DDR5 hanya menerima RAM DDR5.
* **Kecukupan Daya Elektrikal (PSU):** Kartu grafis (GPU) berdaya tinggi (misal RTX 4070 SUPER / RTX 3090) membutuhkan daya minimum PSU 650W - 850W. Memasang PSU 450W akan memicu *system crash* / kerusakan hardware.
* **Kompatibilitas Form Factor Casing:** Motherboard ukuran standar ATX tidak akan muat di dalam Casing Micro-ATX (mATX).

---

## 📊 2. Integrasi Dataset Kaggle & Standarisasi Harga (IDR)

Proyek ini mengintegrasikan seluruh dataset nyata dari Kaggle yang tersimpan pada folder `data/` (total **12.797 baris data mentah**):
* `CPU.csv` (1.440 baris data prosesor $\rightarrow$ 437 CPU unik valid)
* `GPU.csv` (600 baris data kartu grafis $\rightarrow$ 164 GPU unik valid, termasuk varian **Intel Arc Series**)
* `MotherBoard.csv` (1.440 baris data $\rightarrow$ 93 Motherboard unik valid)
* `PowerSupply.csv` (1.120 baris data $\rightarrow$ 38 PSU unik valid)
* `RAM.csv` (1.440 baris data $\rightarrow$ 80 Modul RAM unik valid)
* `StorageSSD.csv` (2.640 baris data $\rightarrow$ 84 SSD NVMe/SATA unik valid)
* `cabinates.csv` (3.120 baris data casing $\rightarrow$ 50 Casing PC unik valid)

### 🧹 Alasan Pembersihan & Filtrasi (Data Wrangling)
Mengapa dari 12.797 baris dihasilkan **946 komponen unik terdaftar**?  
Karena dataset Kaggle merupakan hasil crawling e-commerce India (Amazon/Flipkart) yang memuat ribuan duplikasi penjual pada produk yang sama serta sampah non-hardware (pasta termal, braket kipas, caddy laptop, stun gun, gantungan rak). Proses ekstraksi menyaring dan menstandarisasi seluruh atribut teknis hardware asli menjadi **946 komponen PC siap rakit**.

### 💵 Formula Konversi Kurs Rupee (INR) ke Rupiah (IDR)
Data harga asli dalam mata uang Rupee India (INR / `₹`) secara otomatis dikonversi ke Rupiah Indonesia (IDR) menggunakan rumus kurs:
$$\text{Harga IDR} = \text{Harga INR} \times 190$$

*Contoh Pembuktian:*
* Intel Core i5-12400F: $\text{₹}13.008 \times 190 = \mathbf{\text{Rp } 2.471.520}$ *(Sesuai harga pasar Indonesia)*.
* AMD Ryzen 5 3600: $\text{₹}9.800 \times 190 = \mathbf{\text{Rp } 1.862.000}$.
* Intel Arc A750 8GB GDDR6: $\text{₹}18.150 \times 190 = \mathbf{\text{Rp } 3.450.000}$.
* NVIDIA GeForce RTX 3060 12GB: $\text{₹}30.000 \times 190 = \mathbf{\text{Rp } 5.700.000}$.

---

## ⚡ 3. Aturan Logika Kompatibilitas Formal (`pakar_pc.pl`)

Aturan inferensi Prolog dirumuskan dalam klausa Horn implikasi `:-`:

```prolog
% Aturan 1: Socket CPU harus sama dengan Socket Motherboard
cocok_cpu_mobo(CPU, Mobo) :-
    cpu(CPU, _, _, Socket, _, _, _),
    motherboard(Mobo, _, Socket, _, _, _).

% Aturan 2: Generasi RAM harus sama dengan slot Motherboard
cocok_mobo_ram(Mobo, RAM) :-
    motherboard(Mobo, _, _, TipeRAM, _, _),
    ram(RAM, _, TipeRAM, _, _, _).

% Aturan 3: Daya PSU harus >= Kebutuhan Minimal Daya GPU
daya_psu_cukup(GPU, PSU) :-
    gpu(GPU, _, _, MinWatt, _, _, _),
    psu(PSU, _, Watt, _, _),
    Watt >= MinWatt.

% Aturan 4: Motherboard muat di Casing
cocok_mobo_casing(Mobo, Casing) :-
    motherboard(Mobo, _, _, _, FormMobo, _),
    casing(Casing, _, FormCasing, _),
    ( FormCasing == atx ; FormCasing == FormMobo ).
```

---

## 🖥️ 4. Dua Fitur Interaktif Utama

1. **AI Chatbot Konsultan (`/diagnose`):**
   * Pengguna dapat berkonsultasi luwes (misal: *"Rakit PC 10 juta buat Valorant"*, *"Rakit PC 1440p AM5"*, *"Berapa harga Ryzen 5 3600?"*, *"Cek harga Intel Arc A750"*).
   * Menghasilkan rakitan 7 komponen 100% kompatibel dan seimbang bebas bottleneck dengan rincian biaya dan justifikasi penalaran ilmiah.
2. **Kalkulator Kompatibilitas Mandiri (`/diagnose`):**
   * Pengguna bebas memilih kombinasi CPU, Mobo, RAM, GPU, PSU, dan Casing.
   * Prolog membuktikan secara formal apakah susunan tersebut valid atau memiliki kontradiksi fisik/daya.
   * Dilengkapi **5 Skenario Uji Cepat** untuk membuktikan aturan logika secara langsung.

---

## 🧪 5. Pembuktian 5 Query Akademik (KB Explorer `/explorer`)

1. **Query 1 — Ekstraksi Variabel Hardware:**
   `?- cpu(Kode, Nama, _, am5, _, Harga, Tier).` (Memfilter seluruh prosesor Socket AM5 via unifikasi).
2. **Query 2 — Conjunctive Query (Multi-Kondisi AND):**
   `?- gpu(Kode, Nama, nvidia, MinWatt, VRAM, Harga, _), VRAM >= 12, Harga =< 12000000.` (NVIDIA AND VRAM >= 12GB AND Harga <= 12 Juta).
3. **Query 3 — Rekursi Penjumlahan Harga Komponen:**
   `?- hitung_total_harga([...], Total).` (Menerapkan struktur rekursif `[Head|Tail]` dengan base case list kosong).
4. **Query 4 — Operasi List Irisan Form Factor (`member_both`):**
   `?- findall(F, form_factor_irisan(F, [atx, matx], [matx]), Irisan).` (Mencari form factor bersama antara mobo dan casing).
5. **Query 5 — Seluruh Fakta Ontologi di Basis Pengetahuan:**
   `?- cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier).` (Menampilkan 437 CPU dari 946 komponen terdaftar).

---

## 🚀 6. Panduan Menjalankan Sistem

### A. Melalui Antarmuka Web (Next.js + SWI-Prolog Bridge)
1. **Jalankan server lokal:**
   ```bash
   npm run dev
   ```
2. **Buka di browser:**
   `http://localhost:3000`
3. Cek indikator di Navbar: pastikan bertuliskan **`● SWI-Prolog Online`** berwarna hijau.
4. Buka menu **"Konsultasi & Cek PC"** untuk mencoba Chatbot AI dan Kalkulator Kompatibilitas.

### B. Melalui Konsol Terminal Standalone (SWI-Prolog Langsung)
Sistem juga dapat dijalankan secara konsol interaktif tanpa browser:
1. Buka terminal di folder proyek:
   ```bash
   swipl pakar_pc.pl
   ```
2. Ketik perintah utama:
   ```prolog
   ?- mulai.
   ```
3. Pilih nomor kebutuhan (1-6 diakhiri tanda titik, misal: `2.`). Prolog akan langsung mengeluarkan rincian rakitan, estimasi biaya, dan justifikasi logikanya di layar terminal.

---

## ⚙️ 7. Konfigurasi Environment (`.env.local`)
Aplikasi memiliki **auto-detection fallback** yang secara otomatis mengenali SWI-Prolog di path default Windows (`D:\swipl\bin\swipl.exe` atau `C:\Program Files\swipl\bin\swipl.exe`) dan sistem `PATH`.

Jika Anda menginstal SWI-Prolog di lokasi kustom, salin `.env.example` ke `.env.local`:
```env
SWIPL_PATH=D:\swipl\bin\swipl.exe
```

---
© 2026 **212 PCExpert AI** • Program Studi Informatika Universitas Siliwangi
