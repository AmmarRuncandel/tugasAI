# 🧠 Analisis Komprehensif Sistem Pakar: 212 PCExpert AI
### Sistem Pakar Konsultan Perakitan PC & Kompatibilitas Hardware Berbasis SWI-Prolog & Next.js

> **Tugas Besar Mata Kuliah:** Kecerdasan Buatan (*Artificial Intelligence*)  
> **Program Studi / Fakultas:** Informatika — Fakultas Teknik — Universitas Siliwangi  
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

## 1. Ringkasan & Domain Permasalahan Sistem

**PCExpert AI (212)** adalah sistem pakar cerdas yang memadukan paradigma **pemrograman deklaratif logika murni (SWI-Prolog)** sebagai mesin inferensi (*Inference Engine*) dengan antarmuka web modern (**Next.js 16, TypeScript, Tailwind CSS, & Framer Motion**).

Sistem ini bertindak sebagai **Konsultan Perakitan Komputer Ahli** yang memecahkan masalah pemilihan komponen hardware PC. Merakit PC melibatkan ratusan aturan kompatibilitas fisik dan elektrikal yang ketat:
* **Kompatibilitas Socket:** Prosesor Intel LGA1700 hanya dapat dipasang pada Motherboard socket LGA1700 (H610/B760/Z790). Prosesor AMD AM5 hanya cocok dengan Motherboard AM5 (A620/B650/X670).
* **Kompatibilitas Generasi Memori:** Motherboard DDR4 hanya dapat menerima keping RAM DDR4, sedangkan Motherboard DDR5 hanya menerima RAM DDR5.
* **Kecukupan Daya Elektrikal (PSU):** Kartu grafis (GPU) berdaya tinggi (misal RTX 4070 SUPER) membutuhkan daya minimum PSU 650W. Memasang PSU 450W akan memicu *system crash* / kerusakan hardware.
* **Kompatibilitas Form Factor Casing:** Motherboard ukuran ATX tidak akan muat di dalam Casing Micro-ATX (mATX).

---

## 2. Dua Fitur Interaktif Utama

Berbeda dengan sistem kuesioner kaku, PCExpert AI menyediakan dua modul interaktif di mana **pengguna yang mengajukan pertanyaan kepada kecerdasan buatan**:

### A. AI Chatbot Konsultan (Question-Answering & Recommendation)
Pengguna dapat berkonsultasi secara luwes via chat:
* Contoh pertanyaan: *"Rakit PC gaming budget 10 juta"*, *"Rakit PC 1440p AM5"*, *"PC murah untuk coding dan office"*, atau *"PC sultan 4K"*.
* Mesin SWI-Prolog mengevaluasi aturan batasan (*Constraint Logic*) dan menyusun rakitan 7 komponen yang 100% kompatibel dan seimbang bebas bottleneck.
* Dilengkapi kartu visual spesifikasi, rincian biaya, serta **Explanatory Interface** yang membeberkan justifikasi penalarannya.

### B. Kalkulator Kompatibilitas Hardware Mandiri (Compatibility Checker)
Pengguna dapat memilih kombinasi komponen kustom yang mereka inginkan:
* Dropdown interaktif CPU, Motherboard, RAM, GPU, PSU, dan Casing.
* Prolog membuktikan secara formal apakah susunan tersebut valid atau memiliki kontradiksi.
* Jika tidak cocok, sistem membeberkan letak kesalahannya (misal: *Socket CPU dan Motherboard berbeda*, *DDR4 vs DDR5 bentrok*, atau *Daya PSU kurang*).

---

## 3. Ontologi Knowledge Base (`pakar_pc.pl`)

Knowledge Base memuat **946 Fakta Komponen Hardware Terverifikasi** yang diekstrak dan dibersihkan dari total **12.797 baris data CSV Kaggle** serta aturan kompatibilitas logika formal.

### 🌟 Integrasi Dataset Kaggle & Konversi Rupee (INR) ke Rupiah (IDR)
Proyek ini mengintegrasikan seluruh dataset nyata dari Kaggle yang tersimpan pada folder `data/` (total 12.797 baris data):
* `CPU.csv` (1.440 baris data prosesor $\rightarrow$ 437 CPU unik valid)
* `GPU.csv` (600 baris data kartu grafis $\rightarrow$ 164 GPU unik valid, termasuk **Intel Arc Series**)
* `MotherBoard.csv` (1.440 baris data $\rightarrow$ 93 Motherboard unik valid)
* `PowerSupply.csv` (1.120 baris data $\rightarrow$ 38 PSU unik valid)
* `RAM.csv` (1.440 baris data $\rightarrow$ 80 Modul RAM unik valid)
* `StorageSSD.csv` (2.640 baris data $\rightarrow$ 84 SSD NVMe & SATA unik valid)
* `cabinates.csv` (3.120 baris data casing $\rightarrow$ 50 Casing PC unik valid)

> **Catatan Analisis Data:** Mengapa dari 12.797 baris dihasilkan 946 produk unik? Karena dataset Kaggle merupakan hasil crawling toko online India (Amazon/Flipkart) yang memuat ribuan duplikasi penjual pada produk yang sama (misal 1 model i5-3570 terdaftar 40 kali) serta sampah scraping non-komponen PC (pasta termal, braket kipas, caddy laptop, stun gun, gantungan rak). Proses ekstraksi menyaring dan menstandarisasi seluruh atribut teknis hardware asli menjadi **946 komponen PC siap rakit**.

**Formula Konversi Mata Uang:**  
Data harga asli dalam mata uang Rupee India (INR / `₹`) secara otomatis dikonversi ke Rupiah Indonesia (IDR) menggunakan rumus kurs:
$$\text{Harga IDR} = \text{Harga INR} \times 190$$
*Contoh Pembuktian:*
* Intel Core i5-12400F: $\text{₹}13.008 \times 190 = \mathbf{\text{Rp } 2.471.520}$ *(Sesuai harga pasar Indonesia)*.
* AMD Ryzen 5 3600: $\text{₹}9.800 \times 190 = \mathbf{\text{Rp } 1.862.000}$.
* NVIDIA RTX 3060 12GB: $\text{₹}30.000 \times 190 = \mathbf{\text{Rp } 5.700.000}$.
* Intel Arc A750 8GB: $\text{₹}18.150 \times 190 = \mathbf{\text{Rp } 3.450.000}$.


### A. Ontologi Fakta Komponen Hardware
1. **CPU (`cpu/7`):** Kode, Nama, Brand (Intel/AMD), Socket (LGA1700/AM4/AM5), TDP Watt, Harga, Tier.
2. **Motherboard (`motherboard/6`):** Kode, Nama, Socket, TipeRAM (DDR4/DDR5), FormFactor (ATX/mATX), Harga.
3. **RAM (`ram/6`):** Kode, Nama, TipeRAM, KapasitasGB, SpeedMHz, Harga.
4. **GPU (`gpu/7`):** Kode, Nama, Brand (NVIDIA/AMD), MinWattPSU, VRAM_GB, Harga, Tier.
5. **PSU (`psu/5`):** Kode, Nama, Watt, Sertifikasi (Bronze/Gold), Harga.
6. **Storage (`storage/5`):** Kode, Nama, Tipe (NVMe), KapasitasGB, Harga.
7. **Casing (`casing/4`):** Kode, Nama, FormFactorSupport (ATX/mATX), Harga.

### B. Aturan Logika Kompatibilitas (Inference Rules)
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

### C. 5 Kategori Rakitan Optimal yang Dikenali Prolog
1. **`office_coding`** (~ Rp 5 - 8 Juta): Intel Core i3-12100F, H610M DDR4, 16GB RAM, GTX 1650 4GB, PSU 450W, SSD 500GB NVMe, Case mATX.
2. **`esports_gaming`** (~ Rp 9 - 13 Juta): Intel Core i5-12400F, B760M DDR4, 16GB RAM, RX 6600 8GB GDDR6, PSU 550W Bronze, SSD 1TB NVMe, Case mATX.
3. **`aaa_gaming`** (~ Rp 15 - 20 Juta): AMD Ryzen 5 7600 (AM5), B650M DDR5, 32GB RAM DDR5 6000MHz, RTX 4060 8GB, PSU 650W, SSD 1TB, Case ATX Mid.
4. **`content_creation`** (~ Rp 22 - 30 Juta): Intel Core i7-13700K (16C/24T), Z790 DDR5, 32GB RAM DDR5, RTX 4070 SUPER 12GB, PSU 750W Gold, SSD 2TB, Case ATX.
5. **`enthusiast_flagship`** (> Rp 35 Juta): AMD Ryzen 7 7800X3D (King of Gaming CPU), B650M DDR5, 64GB RAM DDR5, RTX 4080 SUPER 16GB, PSU 850W Gold ATX 3.0, SSD 2TB, Case Panoramic Glass.

---

## 4. Penerapan 4 Pilar Sistem Pakar Klasik

```
┌─────────────────────────┐       ┌────────────────────────┐
│ 1. Knowledge Acquisition │ ────> │   2. Knowledge Base    │
│    (Spesifikasi Hardware │       │   (Fakta & Aturan .pl) │
│     Socket, DDR, Watt)  │       └───────────┬────────────┘
└─────────────────────────┘                   │
                                              ▼
┌─────────────────────────┐       ┌────────────────────────┐
│ 4. Explanatory Interface│ <──── │  3. Inference Engine   │
│    (Justifikasi Logika  │       │     (SWI-Prolog        │
│     Kecocokan Hardware) │       │ Constraint Reasoning)  │
└─────────────────────────┘       └────────────────────────┘
```

1. **Knowledge Acquisition (Akuisisi Pengetahuan):**  
   Pengumpulan data spesifikasi teknis dari manual vendor (Intel, AMD, NVIDIA) mengenai soket, kebutuhan daya TDP, dan kompatibilitas form factor yang diformulasikan ke dalam fakta relasional.
2. **Knowledge Base (`pakar_pc.pl`):**  
   Menyimpan ontologi komponen dan relasi logika klausa Horn menggunakan operator implikasi `:-`.
3. **Inference Engine (Mesin Inferensi):**  
   Mengeksekusi penalaran berbasis batasan (*Constraint Satisfaction Problem*), unifikasi variabel, dan rekursi pemecahan masalah kombinatorial.
4. **Explanatory Interface (Antarmuka Penjelas):**  
   Sistem tidak bertindak sebagai *black box*. Setiap keputusan dilengkapi transparansi alasan:
   * Mengapa rakitan valid: *"Komponen 100% kompatibel di socket AM5, RAM DDR5, PSU 650W mencukupi."*
   * Mengapa rakitan gagal: *"Socket CPU dan Motherboard berbeda (tidak muat secara fisik)"*, atau *"Daya PSU terlalu kecil"*.

---

## 5. Mengapa Harus Menggunakan SWI-Prolog (SWI)?

Pertanyaan krusial untuk ujian dan presentasi:

1. **Hakikat Pemrograman Deklaratif (*What is True vs How to Solve*):**  
   Jika menggunakan JavaScript/Python biasa, programmer harus menulis algoritma pencarian kombinasi dengan tumpukan *nested loops* dan puluhan `if-else` yang rumit. Di Prolog, kita hanya mendefinisikan fakta dan batasan (*constraints*), lalu mesin nalar Prolog secara otomatis mencari kombinasi yang valid melalui **Unifikasi dan Backtracking**.
2. **Standar De Facto Dunia AI (ISO Standard Compliance):**  
   SWI-Prolog adalah implementasi standar internasional ISO/IEC 13211-1 yang stabil, cepat, dan mendukung manipulasi list rekursif `[Head|Tail]`, meta-predikat `forall/2`, `findall/3`, dan operator kontrol logika.
3. **Kemampuan Headless Subprocess Bridge:**  
   SWI-Prolog menyediakan argumen command-line bersih `-g "...,halt."` dan `--quiet` yang memungkinkan Node.js berkomunikasi dua arah via pipa `stdout`/`stderr` tanpa jeda.
4. **Otentisitas Akademik:**  
   Bukan sekadar kalkulator tiruan JavaScript. Keputusan benar-benar dihasilkan dari deduksi mesin logika biner SWI-Prolog asli.

---

## 6. Pembuktian 5 Query Akademik (KB Explorer)

Pada halaman **KB Explorer (`/explorer`)**, disajikan 5 query pengujian akademik sesuai silabus mata kuliah AI:

1. **Query 1 — Ekstraksi Variabel:**
   ```prolog
   ?- cpu(Kode, Nama, _, am5, _, Harga, Tier).
   ```
   *Tujuan:* Membuktikan kemampuan unifikasi variabel Prolog dalam memfilter prosesor berbasis Socket AM5.
2. **Query 2 — Conjunctive Query (Multi-Kondisi AND):**
   ```prolog
   ?- gpu(Kode, Nama, nvidia, MinWatt, VRAM, Harga, _), VRAM >= 12, Harga =< 12000000.
   ```
   *Tujuan:* Menguji pembuktian gabungan kondisi secara serentak (NVIDIA AND VRAM >= 12GB AND Harga <= 12 Juta).
3. **Query 3 — Rekursi Penjumlahan Harga Komponen:**
   ```prolog
   ?- hitung_total_harga([ryzen_5_7600, b650m_ddr5, ddr5_32gb_6000, rtx_4060, psu_650w, ssd_1tb, case_atx_mid], Total).
   ```
   *Tujuan:* Menerapkan struktur rekursif `[Head|Tail]` dengan *base case* list kosong untuk menjumlahkan harga rakitan PC.
4. **Query 4 — Operasi List Irisan Kompatibilitas Form Factor (`member_both`):**
   ```prolog
   ?- findall(F, form_factor_irisan(F, [atx, matx], [matx]), Irisan).
   ```
   *Tujuan:* Menguji pencarian elemen bersama antara form factor motherboard dengan ukuran casing.
5. **Query 5 — Seluruh Fakta Ontologi di Basis Pengetahuan:**
   ```prolog
   ?- cpu(Kode, Nama, Brand, Socket, TDP, Harga, Tier).
   ```
   *Tujuan:* Memverifikasi seluruh repositori fakta komponen yang terdaftar di sistem.

---

## 7. Panduan Menjalankan Sistem

### A. Melalui Antarmuka Web (Next.js + SWI-Prolog Bridge)
1. Pastikan server lokal berjalan:
   ```bash
   npm run dev
   ```
2. Akses browser pada alamat: **`http://localhost:3000`**
3. Cek indikator di pojok kanan atas Navbar: pastikan bertuliskan **`● SWI-Prolog Online`** berwarna hijau.
4. Buka menu **"Konsultasi & Cek PC"** untuk mencoba Chatbot AI dan Kalkulator Kompatibilitas Hardware.

### B. Melalui Konsol Terminal Standalone (SWI-Prolog Langsung)
Sistem juga dapat dijalankan secara konsol interaktif tanpa membuka browser:
1. Buka terminal di folder proyek:
   ```bash
   swipl pakar_pc.pl
   ```
2. Ketik perintah utama:
   ```prolog
   ?- mulai.
   ```
3. Pilih nomor kebutuhan (1-5 diakhiri tanda titik, misal `2.`). Prolog akan langsung mengeluarkan rincian rakitan, estimasi biaya, dan justifikasi logikanya di layar terminal.
