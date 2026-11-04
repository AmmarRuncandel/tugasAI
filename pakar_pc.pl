% ======================================================================
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
% Total Hardware Terverifikasi: 946 Komponen
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
cpu(cpu_ryzen_5_3600, 'amd Ryzen 5 3600 with Wraith Stealth 3.6 Ghz Upt', amd, am4, 65, 1860000, mid).
cpu(cpu_ryzen_9_5900x, 'amd Ryzen 9 5900X 3.7 GHz Upto 4.8 GHz AM4 Socke', amd, am4, 105, 6630000, flagship).
cpu(cpu_i5_3570k, 'GIGASTAR 3.4 GHz LGA 1155 Intel i5-3570K For H61', intel, lga1155, 65, 360000, mid).
cpu(cpu_i5_12400f, 'Intel i5-12400F 4.4 GHz Upto 4.4 GHz LGA1700 Soc', intel, lga1700, 65, 2470000, mid).
cpu(cpu_ryzen_5_5600g, 'amd Ryzen 5 5600G 3.9 GHz Upto 4.4 GHz AM4 Socke', amd, am4, 65, 2370000, mid).
cpu(cpu_ryzen_5_5600x, 'amd Ryzen 5 5600X 3.7 GHz Upto 4.6 GHz AM4 Socke', amd, am4, 65, 3150000, mid).
cpu(cpu_i3_10105f, 'Intel i3-10105F 3.7 GHz Upto 3.7 GHz LGA 1200 So', intel, lga1200, 58, 1350000, entry).
cpu(cpu_ryzen_7_3700x, 'amd Ryzen 7 3700X with Wraith Prism & RGB LED 3.', amd, am4, 65, 5320000, high).
cpu(cpu_ryzen_9_3900xt, 'amd Ryzen 9 3900XT 3.8 GHz Upto 4.7 GHz AM4 Sock', amd, am4, 65, 8170000, flagship).
cpu(cpu_core_i3_10100, 'Intel Core i3-10100 3.6 GHz Upto 4.3 GHz LGA 120', intel, lga1200, 58, 1820000, entry).
cpu(cpu_ryzen_3_3200g, 'amd Ryzen 3 3200G with Radeon Vega 8 Graphics 3.', amd, am4, 58, 1500000, entry).
cpu(cpu_cpu_14, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_ryzen_5_7600x, 'amd Ryzen 5 7600X 4.7 GHz Upto 5.3 GHz AM5 Socke', amd, am5, 65, 4540000, mid).
cpu(cpu_ryzen_7_3800xt, 'amd Ryzen 7 3800XT 3.9 GHz Upto 4.7 GHz AM4 Sock', amd, am4, 65, 6720000, high).
cpu(cpu_ryzen_9_5950x, 'amd Ryzen 9 5950X 3.4 GHz Upto 4.9 GHz AM4 Socke', amd, am4, 105, 9860000, flagship).
cpu(cpu_i5_13600k, 'Intel i5-13600K 2.6 GHz LGA1700 Socket 6 Cores', intel, am4, 65, 5490000, mid).
cpu(cpu_cpu_20, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_core_i3_6100, 'betaohm 3.7 GHz LGA 1151 Intel Core i3-6100 6th ', intel, lga1151, 58, 370000, entry).
cpu(cpu_i3_12100f, 'Intel i3-12100F 4.3 GHz Upto 4.3 GHz LGA1700 Soc', intel, lga1700, 58, 1640000, entry).
cpu(cpu_ryzen_7_5700g, 'amd Ryzen 7 5700G 3.8 GHz Upto 4.6 GHz AM4 Socke', amd, am4, 65, 3550000, high).
cpu(cpu_cpu_24, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_25, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_26, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_ryzen_7_5800x, 'amd Ryzen 7 5800X 3.8 GHz Upto 4.7 GHz AM4 Socke', amd, am4, 65, 4460000, high).
cpu(cpu_core_i5_2500k, 'Intel Core i5-2500K 3.3 GHz Upto 3.7 GHz LGA 115', intel, lga1155, 65, 440000, mid).
cpu(cpu_ryzen_5_5600, 'amd Ryzen 5 5600 3.5 GHz Upto 4.4 GHz AM4 Socket', amd, am4, 65, 3000000, mid).
cpu(cpu_core_i5_3570, 'Intel Core i5-3570 3.4 GHz Upto 3.8 GHz LGA 1155', intel, lga1155, 65, 470000, mid).
cpu(cpu_core_i5_4570, 'Intel Core i5-4570 Quad-Core 6MB Cache 3.2 GHz L', intel, lga1150, 65, 460000, mid).
cpu(cpu_ryzen_5_5500, 'amd Ryzen 5 5500 3.6 GHz Upto 4.2 GHz AM4 Socket', amd, am4, 65, 2240000, mid).
cpu(cpu_cpu_33, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_i7_12700f, 'Intel i7-12700F 4.9 GHz Upto 4.9 GHz LGA1700 Soc', intel, lga1700, 105, 5210000, high).
cpu(cpu_i7_11700f, 'Intel I7-11700F 4.9 GHz Upto 4.9 GHz LGA 1200 So', intel, lga1200, 105, 5040000, high).
cpu(cpu_cpu_37, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_i5_4590, 'Intel I5-4590 6 MB Cache 3.3 GHz LGA 1150 Socket', intel, lga1150, 65, 640000, mid).
cpu(cpu_cpu_54, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_60, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_64, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_65, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_66, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_73, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_77, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_i5_12600k, 'Intel i5-12600K 4.9 GHz Upto 4.9 GHz LGA1700 Soc', intel, lga1700, 65, 5220000, mid).
cpu(cpu_i3_10105, 'Intel i3-10105 4.4 GHz Upto 4.4 GHz LGA 1200 Soc', intel, lga1200, 58, 1900000, entry).
cpu(cpu_i9_12900, 'Intel i9-12900 5.1 GHz Upto 5.1 GHz LGA1700 Sock', intel, lga1700, 105, 9120000, flagship).
cpu(cpu_cpu_89, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_92, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_core_i9_10850k, 'Intel Core i9-10850K 3.6 GHz Upto 5.2 GHz LGA 12', intel, lga1200, 105, 7210000, flagship).
cpu(cpu_ryzen_9_7950x, 'amd Ryzen 9 7950X 4.5 GHz Upto 5.7 GHz AM5 Socke', amd, am5, 105, 11590000, flagship).
cpu(cpu_i5_4590s, 'Intel i5-4590S 6MB Cache, 3 GHz LGA 1150 Socket ', intel, lga1150, 65, 510000, mid).
cpu(cpu_ryzen_7_5700x, 'amd Ryzen 7 5700X 3.4 GHz Upto 4.6 GHz AM4 Socke', amd, am4, 65, 3730000, high).
cpu(cpu_ryzen_7_7700x, 'amd Ryzen 7 7700X 4.5 GHz Upto 5.4 GHz AM5 Socke', amd, am5, 65, 6270000, high).
cpu(cpu_i5_4460, 'Intel i5-4460 6 MB Smart Cache, 3.2 GHz LGA 1150', intel, lga1150, 65, 600000, mid).
cpu(cpu_i5_4590t, 'Intel i5-4590T 6MB Cache, 2 GHz LGA 1150 Socket ', intel, lga1150, 65, 550000, mid).
cpu(cpu_pentium_gold, 'Intel Pentium Gold G6400 4 GHz LGA 1200 Socket 2', intel, lga1200, 58, 1220000, entry).
cpu(cpu_cpu_108, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_core_i5_4570s, 'Intel Core i5-4570S Quad-Core 6MB Cache 2.9 GHz ', intel, lga1150, 65, 530000, mid).
cpu(cpu_core_i7_10700k, 'Intel Core i7-10700K 3.8 GHz Upto 5.1 GHz LGA 12', intel, lga1200, 105, 5410000, high).
cpu(cpu_cpu_111, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_core_i5_10600k, 'Intel Core i5-10600K 4.1 GHz Upto 4.8 GHz LGA 12', intel, lga1200, 65, 4270000, mid).
cpu(cpu_i7_10700f, 'Intel Core i7-10700F 2.9 GHz LGA 1200 Socket 8 C', intel, lga1200, 105, 4750000, high).
cpu(cpu_i9_12900f, 'Intel i9-12900F 5.1 GHz Upto 5.1 GHz LGA1700 Soc', intel, lga1700, 105, 8930000, flagship).
cpu(cpu_cpu_115, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_core_i5_3470, 'Intel Core i5-3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 520000, mid).
cpu(cpu_i7_11700k, 'Intel I7-11700K 5 Ghz Upto 5 GHz LGA 1200 Socket', intel, lga1200, 105, 5890000, high).
cpu(cpu_cpu_118, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_ryzen_9_7900x, 'amd Ryzen 9 7900X 4.7 GHz Upto 5.6 GHz AM5 Socke', amd, am5, 105, 8430000, flagship).
cpu(cpu_cpu_134, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_140, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_144, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_145, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_146, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_153, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_157, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_169, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_172, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_188, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_191, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_195, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_198, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_203, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_core_i9_9980xe, 'Intel Core i9-9980XE Extreme Edition 3 GHz Upto ', intel, lga1200, 105, 15200000, flagship).
cpu(cpu_i9_12900kf, 'Intel I9-12900KF 5.2 GHz Upto 5.2 GHz LGA1700 So', intel, lga1700, 105, 9390000, flagship).
cpu(cpu_ryzen_5_4500, 'amd Ryzen 5 4500 3.6 GHz Upto 4.1 GHz AM4 Socket', amd, am4, 65, 2110000, mid).
cpu(cpu_cpu_212, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_core_i9_10900x, 'Intel Core i9-10900X X-series 3.7 GHz LGA 2066 S', intel, lga1200, 105, 12160000, flagship).
cpu(cpu_core_i5_4670, 'Intel Core i5-4670 Quad-Core 6MB Cache 3.4 GHz L', intel, lga1150, 65, 570000, mid).
cpu(cpu_core_i9_10900kf, 'Intel Core i9-10900KF 3.7 GHz Upto 5.3 GHz LGA 1', intel, lga1200, 105, 8170000, flagship).
cpu(cpu_cpu_218, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_i5_11500, 'Intel I5-11500 4.6 GHz Upto 4.6 GHz LGA 1200 Soc', intel, lga1200, 65, 3990000, mid).
cpu(cpu_ryzen_5_3500x, 'amd Ryzen 5 3500X 6 Cores & 6 Threads up to 4.1G', amd, am4, 65, 2040000, mid).
cpu(cpu_cpu_224, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_core_i9_10980xe, 'Intel Core i9-10980XE Extreme Edition 3 GHz Upto', intel, lga1200, 105, 16600000, flagship).
cpu(cpu_i9_10940x, 'Intel i9-10940X 4.6 GHz Upto 4.6 GHz LGA 2066 So', intel, lga1200, 105, 13300000, flagship).
cpu(cpu_i7_11700, 'Intel i7-11700 2.5 GHz Upto 2.5 GHz LGA 1200 Soc', intel, lga1200, 105, 5110000, high).
cpu(cpu_i3_10100f, 'Intel I3-10100F LGA1200 3.6 GHz Upto 4.3 GHz LGA', intel, lga1200, 58, 1330000, entry).
cpu(cpu_cpu_230, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_232, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_233, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_234, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_237, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_238, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_239, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_254, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_260, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_264, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_265, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_266, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_273, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_277, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_289, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_292, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_308, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_311, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_315, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_318, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_323, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_cpu_332, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_cpu_338, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_cpu_344, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_350, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_352, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_353, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_354, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_357, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_358, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_359, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_362, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_363, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_i5_4670, 'Intel i5-4670 6 MB Smart Cache, 3.4 GHz LGA 1150', intel, lga1150, 65, 560000, mid).
cpu(cpu_cpu_368, 'Intel Core i5 3570 Best Performance 3rd Generati', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_369, 'Gigatech 4 GHz LGA 1151 core i7 6th generation', intel, lga1151, 105, 2150000, high).
cpu(cpu_cpu_374, 'Intel I5 6500 3.2 GHz LGA 1151 Socket 4 Cores', intel, lga1151, 65, 990000, mid).
cpu(cpu_core_i3_3240, 'KAVTRON 3.4 GHz LGA 1155 3rd Gen in-tel Core i3-', intel, lga1155, 58, 430000, entry).
cpu(cpu_i5_11400, 'Intel i5-11400 4.4 GHz Upto 4.4 GHz LGA 1200 Soc', intel, lga1200, 65, 2820000, mid).
cpu(cpu_i5_11400f, 'Intel i5-11400F 4.4 GHz Upto 2.6 GHz LGA 1200 So', intel, lga1200, 65, 2470000, mid).
cpu(cpu_core_i5_6500, 'betaohm 3.2 GHz LGA 1151 Intel Core I5-6500 3.2 ', intel, lga1151, 65, 980000, mid).
cpu(cpu_cpu_382, 'Intel 6100 3.7 GHz LGA 1151 Socket 2 Cores 4 Thr', intel, lga1151, 65, 490000, mid).
cpu(cpu_cpu_383, 'Intel 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_i5_4690, 'Intel i5-4690 6 MB Smart Cache, 3.5 GHz LGA 1150', intel, lga1150, 65, 630000, mid).
cpu(cpu_cpu_385, 'TAJ PC 3.4 GHz LGA 1155 I5 3570 3rd generation', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_388, 'GIGASTAR 3.2 GHz LGA 1151 INTEL CORE I3 6100T', intel, lga1151, 58, 1280000, entry).
cpu(cpu_cpu_389, 'Intel 2400 3.1 GHz LGA 1155 Socket 8 Cores', intel, lga1155, 65, 440000, mid).
cpu(cpu_cpu_390, 'wnd 3.4 GHz LGA 1155 Intel Core i5 3570 Best Per', intel, lga1155, 65, 410000, mid).
cpu(cpu_i9_10920x, 'Intel i9-10920X 4.6 GHz Upto 4.6 GHz LGA 2066 So', intel, lga1200, 105, 11590000, flagship).
cpu(cpu_cpu_393, 'suryaasys 3.6 GHz LGA 1151 I3 8100', intel, lga1151, 58, 950000, entry).
cpu(cpu_cpu_395, 'Intel I5 2500 3.3 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_396, 'aby 3.3 GHz LGA 1156 INTEL CORE I5 4590', intel, lga1200, 65, 660000, mid).
cpu(cpu_i3_3220, 'Intel I3-3220 3.3 GHz LGA 775 Socket 2 Cores 4 T', intel, lga1200, 58, 380000, entry).
cpu(cpu_i3_12100, 'Intel i3-12100 4.3 GHz Upto 4.3 GHz LGA1700 Sock', intel, lga1700, 58, 2470000, entry).
cpu(cpu_cpu_414, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_420, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_424, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_425, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_426, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_433, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_437, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_449, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_452, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_468, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_471, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_475, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_478, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_483, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_cpu_492, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_cpu_498, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_cpu_504, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_510, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_512, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_513, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_514, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_517, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_518, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_519, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_522, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_523, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_528, 'Intel Core i5 3570 Best Performance 3rd Generati', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_529, 'Gigatech 4 GHz LGA 1151 core i7 6th generation', intel, lga1151, 105, 2150000, high).
cpu(cpu_cpu_534, 'Intel I5 6500 3.2 GHz LGA 1151 Socket 4 Cores', intel, lga1151, 65, 990000, mid).
cpu(cpu_cpu_542, 'Intel 6100 3.7 GHz LGA 1151 Socket 2 Cores 4 Thr', intel, lga1151, 65, 490000, mid).
cpu(cpu_cpu_543, 'Intel 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_545, 'TAJ PC 3.4 GHz LGA 1155 I5 3570 3rd generation', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_548, 'GIGASTAR 3.2 GHz LGA 1151 INTEL CORE I3 6100T', intel, lga1151, 58, 1280000, entry).
cpu(cpu_cpu_549, 'Intel 2400 3.1 GHz LGA 1155 Socket 8 Cores', intel, lga1155, 65, 440000, mid).
cpu(cpu_cpu_550, 'wnd 3.4 GHz LGA 1155 Intel Core i5 3570 Best Per', intel, lga1155, 65, 410000, mid).
cpu(cpu_cpu_553, 'suryaasys 3.6 GHz LGA 1151 I3 8100', intel, lga1151, 58, 950000, entry).
cpu(cpu_cpu_555, 'Intel I5 2500 3.3 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_556, 'aby 3.3 GHz LGA 1156 INTEL CORE I5 4590', intel, lga1200, 65, 660000, mid).
cpu(cpu_cpu_563, 'ITFY TECH 3.7 GHz LGA 1150 I5 4590S', intel, lga1150, 65, 660000, mid).
cpu(cpu_cpu_568, 'suryaasys 3.2 GHz LGA 1366 I7 960', intel, lga1200, 105, 550000, high).
cpu(cpu_cpu_572, 'Intel I3 4150 3.5 GHz LGA 1150 Socket 2 Cores De', intel, lga1150, 58, 740000, entry).
cpu(cpu_cpu_575, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I5 4TH GEN', intel, lga1155, 65, 530000, mid).
cpu(cpu_cpu_576, 'WDNET 3.7 GHz LGA 1151 Intel Core i3 6th Generat', intel, lga1151, 58, 570000, entry).
cpu(cpu_i5_2500, 'betaohm 3.3 GHz LGA 1155 Intel Core i5 2500 i5-2', intel, lga1155, 65, 370000, mid).
cpu(cpu_cpu_578, 'suryaasys 3.7 GHz LGA 1151 I3 6100', intel, lga1151, 58, 460000, entry).
cpu(cpu_core_i3_7100, 'Intel Core i3-7100 3MB Smart Cache 3.9 GHz LGA 1', intel, lga1151, 58, 1900000, entry).
cpu(cpu_cpu_581, 'Intel 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 460000, mid).
cpu(cpu_cpu_582, 'Intel I5 3470 3.2 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 450000, mid).
cpu(cpu_core_i5_2400, 'Intel Core i5-2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 530000, mid).
cpu(cpu_i3_7100, 'processsor Ultra 3.9 GHz LGA 1155 I3-7100', intel, lga1151, 58, 590000, entry).
cpu(cpu_ryzen_5_3500, 'amd RYZEN 5 3500 3.6 GHz Upto 4.1 GHz AM4 Socket', amd, am4, 65, 3040000, mid).
cpu(cpu_cpu_592, 'Intel G5900 3.4 GHz LGA 1200 Socket 2 Cores', intel, am4, 105, 1140000, mid).
cpu(cpu_cpu_593, 'Intel I5 2400 3.4 GHz LGA 1156 Socket 4 Cores', intel, lga1200, 65, 420000, mid).
cpu(cpu_cpu_594, 'wnd 3.7 GHz LGA 1150 Intel Core i5 4th Generatio', intel, lga1150, 65, 510000, mid).
cpu(cpu_cpu_595, 'Intel 6100T 3.2 GHz LGA 1151 Socket 2 Cores 4 Th', intel, lga1151, 65, 430000, mid).
cpu(cpu_cpu_597, 'amd A6-7400K 3.5 GHz Upto 3.9 GHz FM2 Socket 2 C', amd, am4, 65, 1050000, mid).
cpu(cpu_cpu_598, 'Intel CORE I5 3570 3.4 GHz Upto 3.8 GHz LGA 1155', intel, lga1155, 65, 550000, mid).
cpu(cpu_cpu_614, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_620, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_624, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_625, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_626, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_633, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_637, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_649, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_652, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_668, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_671, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_675, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_678, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_683, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_cpu_692, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_cpu_698, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_cpu_704, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_710, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_712, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_713, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_714, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_717, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_718, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_719, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_722, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_723, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_728, 'Intel Core i5 3570 Best Performance 3rd Generati', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_729, 'Gigatech 4 GHz LGA 1151 core i7 6th generation', intel, lga1151, 105, 2150000, high).
cpu(cpu_cpu_734, 'Intel I5 6500 3.2 GHz LGA 1151 Socket 4 Cores', intel, lga1151, 65, 990000, mid).
cpu(cpu_cpu_742, 'Intel 6100 3.7 GHz LGA 1151 Socket 2 Cores 4 Thr', intel, lga1151, 65, 490000, mid).
cpu(cpu_cpu_743, 'Intel 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_745, 'TAJ PC 3.4 GHz LGA 1155 I5 3570 3rd generation', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_748, 'GIGASTAR 3.2 GHz LGA 1151 INTEL CORE I3 6100T', intel, lga1151, 58, 1280000, entry).
cpu(cpu_cpu_749, 'Intel 2400 3.1 GHz LGA 1155 Socket 8 Cores', intel, lga1155, 65, 440000, mid).
cpu(cpu_cpu_750, 'wnd 3.4 GHz LGA 1155 Intel Core i5 3570 Best Per', intel, lga1155, 65, 410000, mid).
cpu(cpu_cpu_753, 'suryaasys 3.6 GHz LGA 1151 I3 8100', intel, lga1151, 58, 950000, entry).
cpu(cpu_cpu_755, 'Intel I5 2500 3.3 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_756, 'aby 3.3 GHz LGA 1156 INTEL CORE I5 4590', intel, lga1200, 65, 660000, mid).
cpu(cpu_cpu_763, 'ITFY TECH 3.7 GHz LGA 1150 I5 4590S', intel, lga1150, 65, 660000, mid).
cpu(cpu_cpu_768, 'suryaasys 3.2 GHz LGA 1366 I7 960', intel, lga1200, 105, 550000, high).
cpu(cpu_cpu_772, 'Intel I3 4150 3.5 GHz LGA 1150 Socket 2 Cores De', intel, lga1150, 58, 740000, entry).
cpu(cpu_cpu_775, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I5 4TH GEN', intel, lga1155, 65, 530000, mid).
cpu(cpu_cpu_776, 'WDNET 3.7 GHz LGA 1151 Intel Core i3 6th Generat', intel, lga1151, 58, 570000, entry).
cpu(cpu_cpu_778, 'suryaasys 3.7 GHz LGA 1151 I3 6100', intel, lga1151, 58, 460000, entry).
cpu(cpu_cpu_781, 'Intel 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 460000, mid).
cpu(cpu_cpu_782, 'Intel I5 3470 3.2 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_792, 'Intel G5900 3.4 GHz LGA 1200 Socket 2 Cores', intel, am4, 105, 1140000, mid).
cpu(cpu_cpu_793, 'Intel I5 2400 3.4 GHz LGA 1156 Socket 4 Cores', intel, lga1200, 65, 420000, mid).
cpu(cpu_cpu_794, 'wnd 3.7 GHz LGA 1150 Intel Core i5 4th Generatio', intel, lga1150, 65, 510000, mid).
cpu(cpu_cpu_795, 'Intel 6100T 3.2 GHz LGA 1151 Socket 2 Cores 4 Th', intel, lga1151, 65, 430000, mid).
cpu(cpu_cpu_797, 'amd A6-7400K 3.5 GHz Upto 3.9 GHz FM2 Socket 2 C', amd, am4, 65, 1050000, mid).
cpu(cpu_cpu_798, 'Intel CORE I5 3570 3.4 GHz Upto 3.8 GHz LGA 1155', intel, lga1155, 65, 550000, mid).
cpu(cpu_cpu_804, 'Intel i5 QHVZ 2.2G 35W for LGA 1151 2.2 GHz LGA ', intel, lga1151, 65, 1900000, mid).
cpu(cpu_cpu_808, 'Intel I5 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 540000, mid).
cpu(cpu_core_i3_4150, 'KAVTRON 3.5 GHz LGA 1150 4th Gen in-tel Core i3-', intel, lga1150, 58, 650000, entry).
cpu(cpu_cpu_813, 'amd ThreadRipper 1900X 3.8 Upto 4 AM4 Socket 8 C', amd, am4, 65, 12540000, flagship).
cpu(cpu_cpu_818, 'E 3.1 GHz LGA 1155 i5 2nd gen i5 2400', intel, lga1155, 65, 380000, mid).
cpu(cpu_i5_2nd, 'GIGASTAR 2.5 GHz LGA 1150 i5-2nd gen-2400', intel, lga1150, 65, 380000, mid).
cpu(cpu_i5_3470, 'Intel I5-3470 3.2 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 520000, mid).
cpu(cpu_cpu_826, 'srigs 3.2 GHz LGA 1151 i7 8700', intel, lga1151, 105, 3230000, high).
cpu(cpu_i5_4th, 'GIGASTAR 2 GHz LGA 1150 i5-4th gen-4590', intel, lga1150, 65, 550000, mid).
cpu(cpu_cpu_830, 'LAPTECH WORLD 3 GHz LGA 1155 intel I5, 3rd Gen 3', intel, lga1155, 65, 420000, mid).
cpu(cpu_ryzen7_7800x, 'amd Ryzen7 7800X 3D 4.2 GHz AM5 Socket 8 Cores', amd, am5, 105, 8700000, high).
cpu(cpu_core_i7_10700, 'Intel Core i7-10700 2.9 GHz Upto 4.8 GHz LGA 120', intel, lga1200, 105, 5020000, high).
cpu(cpu_i5_11600k, 'Intel i5-11600K 3.9 GHz Upto 3.9 GHz LGA 1200 So', intel, lga1200, 65, 4560000, mid).
cpu(cpu_cpu_854, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_860, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_864, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_865, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_866, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_873, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_877, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_889, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_892, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_908, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_911, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_915, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_918, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_923, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_cpu_932, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_cpu_938, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_cpu_944, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_950, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_952, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_953, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_954, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_957, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_958, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_959, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_962, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_963, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_968, 'Intel Core i5 3570 Best Performance 3rd Generati', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_969, 'Gigatech 4 GHz LGA 1151 core i7 6th generation', intel, lga1151, 105, 2150000, high).
cpu(cpu_cpu_974, 'Intel I5 6500 3.2 GHz LGA 1151 Socket 4 Cores', intel, lga1151, 65, 990000, mid).
cpu(cpu_cpu_982, 'Intel 6100 3.7 GHz LGA 1151 Socket 2 Cores 4 Thr', intel, lga1151, 65, 490000, mid).
cpu(cpu_cpu_983, 'Intel 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_985, 'TAJ PC 3.4 GHz LGA 1155 I5 3570 3rd generation', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_988, 'GIGASTAR 3.2 GHz LGA 1151 INTEL CORE I3 6100T', intel, lga1151, 58, 1280000, entry).
cpu(cpu_cpu_989, 'Intel 2400 3.1 GHz LGA 1155 Socket 8 Cores', intel, lga1155, 65, 440000, mid).
cpu(cpu_cpu_990, 'wnd 3.4 GHz LGA 1155 Intel Core i5 3570 Best Per', intel, lga1155, 65, 410000, mid).
cpu(cpu_cpu_993, 'suryaasys 3.6 GHz LGA 1151 I3 8100', intel, lga1151, 58, 950000, entry).
cpu(cpu_cpu_995, 'Intel I5 2500 3.3 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_996, 'aby 3.3 GHz LGA 1156 INTEL CORE I5 4590', intel, lga1200, 65, 660000, mid).
cpu(cpu_cpu_1003, 'ITFY TECH 3.7 GHz LGA 1150 I5 4590S', intel, lga1150, 65, 660000, mid).
cpu(cpu_cpu_1008, 'suryaasys 3.2 GHz LGA 1366 I7 960', intel, lga1200, 105, 550000, high).
cpu(cpu_cpu_1012, 'Intel I3 4150 3.5 GHz LGA 1150 Socket 2 Cores De', intel, lga1150, 58, 740000, entry).
cpu(cpu_cpu_1015, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I5 4TH GEN', intel, lga1155, 65, 530000, mid).
cpu(cpu_cpu_1016, 'WDNET 3.7 GHz LGA 1151 Intel Core i3 6th Generat', intel, lga1151, 58, 570000, entry).
cpu(cpu_cpu_1018, 'suryaasys 3.7 GHz LGA 1151 I3 6100', intel, lga1151, 58, 460000, entry).
cpu(cpu_cpu_1021, 'Intel 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 460000, mid).
cpu(cpu_cpu_1022, 'Intel I5 3470 3.2 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_1032, 'Intel G5900 3.4 GHz LGA 1200 Socket 2 Cores', intel, am4, 105, 1140000, mid).
cpu(cpu_cpu_1033, 'Intel I5 2400 3.4 GHz LGA 1156 Socket 4 Cores', intel, lga1200, 65, 420000, mid).
cpu(cpu_cpu_1034, 'wnd 3.7 GHz LGA 1150 Intel Core i5 4th Generatio', intel, lga1150, 65, 510000, mid).
cpu(cpu_cpu_1035, 'Intel 6100T 3.2 GHz LGA 1151 Socket 2 Cores 4 Th', intel, lga1151, 65, 430000, mid).
cpu(cpu_cpu_1037, 'amd A6-7400K 3.5 GHz Upto 3.9 GHz FM2 Socket 2 C', amd, am4, 65, 1050000, mid).
cpu(cpu_cpu_1038, 'Intel CORE I5 3570 3.4 GHz Upto 3.8 GHz LGA 1155', intel, lga1155, 65, 550000, mid).
cpu(cpu_cpu_1044, 'Intel i5 QHVZ 2.2G 35W for LGA 1151 2.2 GHz LGA ', intel, lga1151, 65, 1900000, mid).
cpu(cpu_cpu_1048, 'Intel I5 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 540000, mid).
cpu(cpu_cpu_1053, 'amd ThreadRipper 1900X 3.8 Upto 4 AM4 Socket 8 C', amd, am4, 65, 12540000, flagship).
cpu(cpu_cpu_1058, 'E 3.1 GHz LGA 1155 i5 2nd gen i5 2400', intel, lga1155, 65, 380000, mid).
cpu(cpu_cpu_1066, 'srigs 3.2 GHz LGA 1151 i7 8700', intel, lga1151, 105, 3230000, high).
cpu(cpu_cpu_1070, 'LAPTECH WORLD 3 GHz LGA 1155 intel I5, 3rd Gen 3', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_1082, 'Intel Core i3 4150 3.5 GHz LGA 1150 Socket 2 Cor', intel, lga1150, 58, 360000, entry).
cpu(cpu_cpu_1083, 'GIG SN 3.5 GHz LGA 1200 I5 11400f', intel, lga1200, 65, 3800000, mid).
cpu(cpu_core_i5_4570t, 'Intel Core i5-4570T 6MB Cache 2.9 GHz LGA 1150 S', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_1085, 'Intel I3 6100T 3.2 GHz LGA 1151 Socket 2 Cores', intel, lga1151, 58, 1240000, entry).
cpu(cpu_core_i3_4130t, 'Intel Core i3-4130T 2.9 GHz LGA 1150 Socket 2 Co', intel, lga1150, 58, 790000, entry).
cpu(cpu_pentium_g4400, 'Intel Pentium G4400 3.3 GHz LGA 1150 Socket 2 Co', intel, lga1150, 65, 640000, entry).
cpu(cpu_i5_3470t, 'Intel i5-3470T 2.9 GHz LGA 1155 Socket 2 Cores', intel, lga1155, 65, 550000, mid).
cpu(cpu_cpu_1092, 'KAVTRON 3.7 GHz LGA 1150 KAV-INT-4170', intel, lga1150, 65, 1140000, mid).
cpu(cpu_cpu_1094, 'Dtech 3.3 GHz LGA 1150 G4400', intel, lga1150, 65, 480000, mid).
cpu(cpu_cpu_1101, 'Intel G4400 3.3 GHz LGA 1151 Socket 2 Cores', intel, lga1151, 65, 950000, mid).
cpu(cpu_core_i5_3550, 'Intel Core i5-3550 Quad-Core 6MB Cache 3.3 GHz L', intel, lga1155, 65, 460000, mid).
cpu(cpu_core_i7_2600k, 'srigs 3.4 GHz LGA 1155 Intel Core i7-2600k', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_1104, 'betaohm 3 GHz LGA 1155 I5 3rd genration with Rgb', intel, lga1155, 65, 400000, mid).
cpu(cpu_core_i3_2120, 'KAVTRON 3.3 GHz LGA 1155 2nd Gen in-tel Core i3-', intel, lga1155, 58, 490000, entry).
cpu(cpu_cpu_1107, 'suryaasys 3.4 GHz LGA 1151 I7 6700', intel, lga1151, 105, 1710000, high).
cpu(cpu_core_i5_3550p, 'Intel Core i5-3550P Quad-Core 6MB Cache 3.1 GHz ', intel, lga1155, 65, 460000, mid).
cpu(cpu_cpu_1110, 'suryaasys 3.8 GHz LGA 1151 core i5 7500', intel, lga1151, 65, 1460000, mid).
cpu(cpu_cpu_1111, 'suryaasys 3.8 GHz LGA 1155 2600S', intel, lga1155, 65, 670000, mid).
cpu(cpu_cpu_1115, 'srigs 3.2 GHz LGA 1151 intel core i7 8700', intel, lga1151, 105, 3130000, high).
cpu(cpu_cpu_1116, 'Intel core I5 2500k 3.3 GHz LGA 1155 Socket 4 Co', intel, lga1155, 65, 490000, mid).
cpu(cpu_cpu_1119, 'MD Tech 2.9 GHz LGA 2011-v3 e5-2697 v2', intel, lga1200, 65, 1520000, mid).
cpu(cpu_cpu_1134, 'Intel I5 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_1140, 'Intel i5 3570 3.4 GHz Upto 4 GHz LGA 1155 Socket', intel, lga1155, 65, 630000, mid).
cpu(cpu_cpu_1144, 'Intel I7 3770 3.9 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 910000, high).
cpu(cpu_cpu_1145, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 850000, high).
cpu(cpu_cpu_1146, 'Intel I7 3770 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 105, 940000, high).
cpu(cpu_cpu_1153, 'Intel i5 4570 3.3 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 65, 600000, mid).
cpu(cpu_cpu_1157, 'Intel Core i3 10th Gen 10100f 3.6 GHz LGA 1200 S', intel, lga1200, 58, 1510000, entry).
cpu(cpu_cpu_1169, 'Intel core I5 3rd Gen 3570 3.4 GHz LGA 1155 Sock', intel, lga1155, 65, 480000, mid).
cpu(cpu_cpu_1172, 'Intel i5 650 LGA 1156 3.2 GHz LGA 1156 Socket 2 ', intel, lga1200, 65, 360000, mid).
cpu(cpu_cpu_1188, 'Intel I7 4770 3.4 GHz LGA 1150 Socket 2 Cores', intel, lga1150, 105, 1170000, high).
cpu(cpu_cpu_1191, 'Intel CORE I5 4590 3.3 GHz Upto 3.7 GHz LGA 1150', intel, lga1150, 65, 590000, mid).
cpu(cpu_cpu_1195, 'Refurb 3.2 GHz LGA 1150 Corei5 4th', intel, lga1150, 65, 380000, mid).
cpu(cpu_cpu_1198, 'suryaasys 3.7 GHz LGA 1150 core i5 4590', intel, lga1150, 65, 460000, mid).
cpu(cpu_cpu_1203, 'Intel G6405 4.1 GHz Upto 4.1 GHz LGA 1200 Socket', intel, lga1200, 65, 1040000, mid).
cpu(cpu_cpu_1212, 'amd Ryzen� 5 7600 3.8 GHz Upto 5.1 GHz AM5 Socke', amd, am5, 65, 4330000, mid).
cpu(cpu_cpu_1218, 'E 3.2 GHz LGA 1150 I3 6TH 6100T', intel, lga1150, 58, 680000, entry).
cpu(cpu_cpu_1224, 'amd R7 3700X 3.6 GHz Upto 4.4 GHz AM4 Socket 8 C', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_1230, 'Intel Core i7 7700 3.6 GHz LGA 1151 Socket 4 Cor', intel, am5, 105, 2680000, high).
cpu(cpu_cpu_1232, 'Intel CORE I5 2400 3.1 GHz Upto 3.4 GHz LGA 1155', intel, lga1155, 65, 430000, mid).
cpu(cpu_cpu_1233, 'WDNET 3.4 GHz LGA 1151 INTEL CORE I5 6TH GEN', intel, lga1151, 65, 1230000, mid).
cpu(cpu_cpu_1234, 'Intel CORE I5 3470 3.2 GHz Upto 3.6 GHz LGA 1155', intel, lga1155, 65, 610000, mid).
cpu(cpu_cpu_1237, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I3 4TH GEN', intel, lga1155, 58, 570000, entry).
cpu(cpu_cpu_1238, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_1239, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_1242, 'amd Ryzen� 9 7900X 3D 4.4 GHz Upto 5.6 GHz AM5 S', amd, am5, 105, 10640000, mid).
cpu(cpu_cpu_1243, 'Intel I7 4790 4 GHz LGA 1150 Socket 4 Cores', intel, lga1150, 105, 1200000, high).
cpu(cpu_cpu_1248, 'Intel Core i5 3570 Best Performance 3rd Generati', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_1249, 'Gigatech 4 GHz LGA 1151 core i7 6th generation', intel, lga1151, 105, 2150000, high).
cpu(cpu_cpu_1254, 'Intel I5 6500 3.2 GHz LGA 1151 Socket 4 Cores', intel, lga1151, 65, 990000, mid).
cpu(cpu_cpu_1262, 'Intel 6100 3.7 GHz LGA 1151 Socket 2 Cores 4 Thr', intel, lga1151, 65, 490000, mid).
cpu(cpu_cpu_1263, 'Intel 3570 3.8 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_1265, 'TAJ PC 3.4 GHz LGA 1155 I5 3570 3rd generation', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_1268, 'GIGASTAR 3.2 GHz LGA 1151 INTEL CORE I3 6100T', intel, lga1151, 58, 1280000, entry).
cpu(cpu_cpu_1269, 'Intel 2400 3.1 GHz LGA 1155 Socket 8 Cores', intel, lga1155, 65, 440000, mid).
cpu(cpu_cpu_1270, 'wnd 3.4 GHz LGA 1155 Intel Core i5 3570 Best Per', intel, lga1155, 65, 410000, mid).
cpu(cpu_cpu_1273, 'suryaasys 3.6 GHz LGA 1151 I3 8100', intel, lga1151, 58, 950000, entry).
cpu(cpu_cpu_1275, 'Intel I5 2500 3.3 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 360000, mid).
cpu(cpu_cpu_1276, 'aby 3.3 GHz LGA 1156 INTEL CORE I5 4590', intel, lga1200, 65, 660000, mid).
cpu(cpu_cpu_1283, 'ITFY TECH 3.7 GHz LGA 1150 I5 4590S', intel, lga1150, 65, 660000, mid).
cpu(cpu_cpu_1288, 'suryaasys 3.2 GHz LGA 1366 I7 960', intel, lga1200, 105, 550000, high).
cpu(cpu_cpu_1292, 'Intel I3 4150 3.5 GHz LGA 1150 Socket 2 Cores De', intel, lga1150, 58, 740000, entry).
cpu(cpu_cpu_1295, 'WDNET 3.3 GHz LGA 1155 INTEL CORE I5 4TH GEN', intel, lga1155, 65, 530000, mid).
cpu(cpu_cpu_1296, 'WDNET 3.7 GHz LGA 1151 Intel Core i3 6th Generat', intel, lga1151, 58, 570000, entry).
cpu(cpu_cpu_1298, 'suryaasys 3.7 GHz LGA 1151 I3 6100', intel, lga1151, 58, 460000, entry).
cpu(cpu_cpu_1301, 'Intel 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 460000, mid).
cpu(cpu_cpu_1302, 'Intel I5 3470 3.2 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 450000, mid).
cpu(cpu_cpu_1312, 'Intel G5900 3.4 GHz LGA 1200 Socket 2 Cores', intel, am4, 105, 1140000, mid).
cpu(cpu_cpu_1313, 'Intel I5 2400 3.4 GHz LGA 1156 Socket 4 Cores', intel, lga1200, 65, 420000, mid).
cpu(cpu_cpu_1314, 'wnd 3.7 GHz LGA 1150 Intel Core i5 4th Generatio', intel, lga1150, 65, 510000, mid).
cpu(cpu_cpu_1315, 'Intel 6100T 3.2 GHz LGA 1151 Socket 2 Cores 4 Th', intel, lga1151, 65, 430000, mid).
cpu(cpu_cpu_1317, 'amd A6-7400K 3.5 GHz Upto 3.9 GHz FM2 Socket 2 C', amd, am4, 65, 1050000, mid).
cpu(cpu_cpu_1318, 'Intel CORE I5 3570 3.4 GHz Upto 3.8 GHz LGA 1155', intel, lga1155, 65, 550000, mid).
cpu(cpu_cpu_1324, 'Intel i5 QHVZ 2.2G 35W for LGA 1151 2.2 GHz LGA ', intel, lga1151, 65, 1900000, mid).
cpu(cpu_cpu_1328, 'Intel I5 3570K 3.4 GHz LGA 1155 Socket 4 Cores', intel, lga1155, 65, 540000, mid).
cpu(cpu_cpu_1333, 'amd ThreadRipper 1900X 3.8 Upto 4 AM4 Socket 8 C', amd, am4, 65, 12540000, flagship).
cpu(cpu_cpu_1338, 'E 3.1 GHz LGA 1155 i5 2nd gen i5 2400', intel, lga1155, 65, 380000, mid).
cpu(cpu_cpu_1346, 'srigs 3.2 GHz LGA 1151 i7 8700', intel, lga1151, 105, 3230000, high).
cpu(cpu_cpu_1350, 'LAPTECH WORLD 3 GHz LGA 1155 intel I5, 3rd Gen 3', intel, lga1155, 65, 420000, mid).
cpu(cpu_cpu_1362, 'Intel Core i3 4150 3.5 GHz LGA 1150 Socket 2 Cor', intel, lga1150, 58, 360000, entry).
cpu(cpu_cpu_1363, 'GIG SN 3.5 GHz LGA 1200 I5 11400f', intel, lga1200, 65, 3800000, mid).
cpu(cpu_cpu_1365, 'Intel I3 6100T 3.2 GHz LGA 1151 Socket 2 Cores', intel, lga1151, 58, 1240000, entry).
cpu(cpu_cpu_1372, 'KAVTRON 3.7 GHz LGA 1150 KAV-INT-4170', intel, lga1150, 65, 1140000, mid).
cpu(cpu_cpu_1374, 'Dtech 3.3 GHz LGA 1150 G4400', intel, lga1150, 65, 480000, mid).
cpu(cpu_cpu_1381, 'Intel G4400 3.3 GHz LGA 1151 Socket 2 Cores', intel, lga1151, 65, 950000, mid).
cpu(cpu_cpu_1384, 'betaohm 3 GHz LGA 1155 I5 3rd genration with Rgb', intel, lga1155, 65, 400000, mid).
cpu(cpu_cpu_1387, 'suryaasys 3.4 GHz LGA 1151 I7 6700', intel, lga1151, 105, 1710000, high).
cpu(cpu_cpu_1390, 'suryaasys 3.8 GHz LGA 1151 core i5 7500', intel, lga1151, 65, 1460000, mid).
cpu(cpu_cpu_1391, 'suryaasys 3.8 GHz LGA 1155 2600S', intel, lga1155, 65, 670000, mid).
cpu(cpu_cpu_1395, 'srigs 3.2 GHz LGA 1151 intel core i7 8700', intel, lga1151, 105, 3130000, high).
cpu(cpu_cpu_1396, 'Intel core I5 2500k 3.3 GHz LGA 1155 Socket 4 Co', intel, lga1155, 65, 490000, mid).
cpu(cpu_cpu_1399, 'MD Tech 2.9 GHz LGA 2011-v3 e5-2697 v2', intel, lga1200, 65, 1520000, mid).
cpu(cpu_cpu_1400, 'GREEN SOUL Monster Ult. Multi-Functional Ergonom', intel, lga1200, 65, 3610000, mid).
cpu(cpu_cpu_1402, 'suryaasys 4.1 GHz LGA 1151 core i5 8500', intel, lga1151, 65, 2130000, mid).
cpu(cpu_cpu_1403, 'Dtech 3.2 GHz LGA 1155 Intel Core i5 3470', intel, lga1155, 65, 580000, mid).
cpu(cpu_cpu_1405, 'suryaasys 3.3 GHz LGA 1151 core i5 7500t', intel, lga1151, 65, 1410000, mid).
cpu(cpu_cpu_1409, 'Intel G4560 3.5 GHz LGA 1151 Socket 2 Cores', intel, lga1151, 65, 1140000, mid).
cpu(cpu_cpu_1411, 'Reklinex Multi-Functional Ergonomic with Lumbar ', intel, lga1200, 65, 1610000, mid).
cpu(cpu_cpu_1412, 'Intel Core I5 3570 3.8 GHz LGA 1155 Socket 4 Cor', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_1413, 'suryaasys 3.1 GHz LGA 1151 core i5 6500T', intel, lga1151, 65, 990000, mid).
cpu(cpu_cpu_1414, 'suryaasys 3.9 GHz LGA 1151 I3 7100', intel, lga1151, 58, 590000, entry).
cpu(cpu_cpu_1417, 'GREEN SOUL Xtreme Gaming Chair', intel, lga1200, 65, 3230000, mid).
cpu(cpu_cpu_1422, 'rahul 3.48 GHz LGA 2011-v3', intel, lga1200, 65, 1330000, mid).
cpu(cpu_cpu_1424, 'suryaasys 3.4 GHz LGA 1155 I5 3570', intel, lga1155, 65, 390000, mid).
cpu(cpu_cpu_1426, 'REKART Multi-Functional Ergonomic Gaming Chair A', intel, lga1200, 65, 1610000, mid).
cpu(cpu_cpu_1433, 'ryzen 3.9 GHz AM4 5600G', amd, am4, 65, 2850000, mid).
cpu(cpu_cpu_1434, 'amd Ryzen 7 series 3.7 GHz AM4 Socket 8 Cores Se', amd, am4, 65, 5320000, mid).
cpu(cpu_cpu_1439, 'Dtech 3.2 GHz FM2+, FM2 AMD A8-5500B AD550BOKA44', amd, am4, 65, 470000, mid).

% B. FAKTA MOTHERBOARD
% motherboard(Kode, Nama, Socket, TipeRAM, FormFactor, Harga).
motherboard(mobo_b450m_hdv_ddr4, 'ASRock B450M-HDV', am4, ddr4, matx, 1080000).
motherboard(mobo_h81m2_ddr3, 'ZEBRONICS ZEB-H81M2 with PCIE M.2 / NVMe Slot', lga1150, ddr3, matx, 470000).
motherboard(mobo_h61m2_ddr3, 'ZEBRONICS Zeb H61M2 with M2 slot LGA 1155 Socket', lga1155, ddr3, matx, 440000).
motherboard(mobo_h610m_e_ddr3, 'ASUS PRIME H610M-E D4', lga1700, ddr3, matx, 1700000).
motherboard(mobo_b550m_ddr4, 'MSI B550M PRO-VDH WIFI', am4, ddr4, matx, 2470000).
motherboard(mobo_b550m_a_ddr4, 'ASUS PRIME B550M-A WIFI II', am4, ddr4, matx, 2660000).
motherboard(mobo_a320m_k_ddr4, 'ASUS PRIME A320M-K', am4, ddr4, matx, 1140000).
motherboard(mobo_h61_ddr3, 'ZEBRONICS ZEB-H61', lga1155, ddr3, matx, 440000).
motherboard(mobo_b450m_a_ii_ddr4, 'ASUS Prime-B450M-A-II', am4, ddr4, matx, 1710000).
motherboard(mobo_a520m_ddr4, 'GIGABYTE A520M K', am4, ddr4, matx, 1120000).
motherboard(mobo_z590_e_ddr4, 'ASUS ROG STRIX Z590-E Gaming Wi-Fi', lga1200, ddr4, matx, 6370000).
motherboard(mobo_h410m_e_ddr4, 'ASUS ?PRIME H410M-E', lga1200, ddr4, matx, 1330000).
motherboard(mobo_h510m_b_ddr4, 'MSI PRO H510M-B , Micro-ATX', lga1200, ddr4, atx, 1140000).
motherboard(mobo_z790_h_ddr5, 'ASUS ?ROG STRIX Z790-H GAMING WIFI', lga1700, ddr5, matx, 6750000).
motherboard(mobo_b550m_ds3h_ddr4, 'GIGABYTE B550M-DS3H', am4, ddr4, matx, 1860000).
motherboard(mobo_b550_plus_ddr4, 'ASUS TUF Gaming B550-PLUS', am4, ddr4, matx, 3030000).
motherboard(mobo_x670e_ddr5, 'ASUS ROG STRIX X670E A GAMING WIFI', am5, ddr5, matx, 7930000).
motherboard(mobo_b450m_ddr4, 'MSI B450M PRO-VDH MAX Mini-ATX AM4 Gaming', am4, ddr4, atx, 1690000).
motherboard(mobo_b560m_plus_ddr4, 'ASUS TUF Gaming B560M-Plus', lga1200, ddr4, matx, 2750000).
motherboard(mobo_h81_ddr3, 'LAPCARE h81', lga1150, ddr3, matx, 630000).
motherboard(mobo_b560_ddr4, 'ASRock B560 Steel Legend', lga1200, ddr4, matx, 2230000).
motherboard(mobo_z590_ddr4, 'MSI MEG Z590 GODLIKE', lga1200, ddr4, matx, 18810000).
motherboard(mobo_z590_f_ddr4, 'ASUS ROG STRIX Z590-F Gaming Wi-Fi', lga1200, ddr4, matx, 5700000).
motherboard(mobo_b550_ddr4, 'ASRock B550 PG Riptide', am4, ddr4, matx, 2310000).
motherboard(mobo_z690_ddr4, 'ASRock Z690 Pro RS', lga1700, ddr4, matx, 3420000).
motherboard(mobo_z690_a_ddr4, 'ASUS Prime Z690-A', lga1700, ddr4, matx, 5690000).
motherboard(mobo_h410m_b_ddr4, 'MSI PRO H410M-B', lga1200, ddr4, matx, 1330000).
motherboard(mobo_z690_p_ddr4, 'ASUS Prime Z690-P D4', lga1700, ddr4, matx, 4080000).
motherboard(mobo_z490_f_ddr4, 'ASUS ROG Strix Z490-F Gaming', lga1200, ddr4, matx, 4890000).
motherboard(mobo_h610m_hdv_ddr3, 'ASRock H610M-HDV/M.2', lga1700, ddr3, matx, 1330000).
motherboard(mobo_b550m_k_ddr4, 'ASUS Prime B550M-K', am4, ddr4, matx, 1970000).
motherboard(mobo_a320m_a_ddr4, 'MSI A320M-A PRO AMD AM4 m-ATX DDR4', am4, ddr4, atx, 1140000).
motherboard(mobo_b650m_ddr5, 'GIGABYTE B650M K', am5, ddr5, matx, 2760000).
motherboard(mobo_h110_d4_ddr4, 'ZEBRONICS Zeb H110-D4 LGA 1151 Socket', lga1151, ddr4, matx, 820000).
motherboard(mobo_b550m_e_ddr4, 'ASUS TUF-GAMING-B550M-E', am4, ddr4, matx, 2500000).
motherboard(mobo_b450_aorus_ddr4, 'GIGABYTE B450-Aorus Elite V2', am4, ddr4, matx, 1910000).
motherboard(mobo_h110mad4_ddr4, 'Ant Value H110MAD4', lga1151, ddr4, matx, 810000).
motherboard(mobo_b660_a_ddr4, 'MSI PRO B660-A DDR4', lga1700, ddr4, matx, 4650000).
motherboard(mobo_b450_s2h_ddr4, 'GIGABYTE B450-S2H', am4, ddr4, matx, 1280000).
motherboard(mobo_x570_ddr4, 'ASRock X570 Phantom Gaming4', am4, ddr4, matx, 2710000).
motherboard(mobo_b660m_plus_ddr4, 'ASUS TUF GAMING B660M-PLUS WIFI D4', lga1700, ddr4, matx, 3580000).
motherboard(mobo_h510m_e_ddr4, 'ASUS Prime H510M-E', lga1200, ddr4, matx, 1420000).
motherboard(mobo_b660_ddr4, 'ASRock B660 Pro RS', lga1700, ddr4, matx, 2180000).
motherboard(mobo_b760maorusproax_ddr4, 'GIGABYTE MBG-B760MAORUSPROAX', lga1700, ddr4, matx, 4560000).
motherboard(mobo_b550_f_ddr4, 'ASUS ROG STRIX B550-F GAMING WIFI II', am4, ddr4, matx, 4560000).
motherboard(mobo_b560m_h_ddr4, 'GIGABYTE B560M-H V2', lga1200, ddr4, matx, 1360000).
motherboard(mobo_b560m_ddr4, 'MSI B560M PRO-E', lga1200, ddr4, matx, 1610000).
motherboard(mobo_b550_gaming_ddr4, 'GIGABYTE B550-Gaming X V2', am4, ddr4, matx, 2330000).
motherboard(mobo_x670_p_ddr5, 'ASUS PRIME X670-P CSM', am5, ddr5, matx, 5350000).
motherboard(mobo_z790_ddr5, 'ASRock Z790 Steel legend WiFi', lga1700, ddr5, matx, 5760000).
motherboard(mobo_h81m_s_ddr3, 'Dtech Gigabyte H81M-S', lga1150, ddr3, matx, 660000).
motherboard(mobo_b650e_ddr5, 'ASRock B650E Steel Legend WiFi', am5, ddr5, matx, 5210000).
motherboard(mobo_b550_ds3h_ac_ddr4, 'GIGABYTE B550-DS3H-AC', am4, ddr4, matx, 2090000).
motherboard(mobo_b650m_plus_ddr5, 'ASUS TUF GAMING B650M-PLUS WIFI', am5, ddr5, matx, 4400000).
motherboard(mobo_b660m_v5_ddr4, 'ASUS EX-B660M-V5 D4', lga1700, ddr4, matx, 2270000).
motherboard(mobo_h110m4_c2h_ddr4, 'Dtech H110M4-C2H', lga1151, ddr4, matx, 570000).
motherboard(mobo_z490i_ddr4, 'MSI MEG Z490I UNIFY Mini-ATX LGA 1200 Gaming', lga1200, ddr4, atx, 3740000).
motherboard(mobo_h61mad3_ddr3, 'Ant Value H61MAD3', lga1155, ddr3, matx, 1040000).
motherboard(mobo_b550_aorus_ddr4, 'GIGABYTE B550-Aorus Elite AX V2', am4, ddr4, matx, 3190000).
motherboard(mobo_b650_ddr5, 'ASRock B650 PG Lightning', am5, ddr5, matx, 3950000).
motherboard(mobo_z690m_itx_ddr4, 'ASRock Z690M-ITX/ax', lga1700, ddr4, matx, 4080000).
motherboard(mobo_b660_creator_ddr4, 'ASUS PROART B660-CREATOR D4', lga1700, ddr4, matx, 4870000).
motherboard(mobo_z490_a_ddr4, 'MSI Z490-A PRO ATX LGA 1200 Gaming', lga1200, ddr4, atx, 2470000).
motherboard(mobo_b760m_ddr4, 'GIGABYTE ?B760M DS3H AX', lga1700, ddr4, matx, 3320000).
motherboard(mobo_z690_plus_ddr4, 'ASUS Tuf Gaming Z690-Plus D4', lga1700, ddr4, matx, 4840000).
motherboard(mobo_z490_ddr4, 'MSI MPG Z490 GAMING CARBON WIFI ATX LGA 1200 Gam', lga1200, ddr4, atx, 5300000).
motherboard(mobo_z690m_plus_ddr4, 'ASUS Prime Z690M-Plus', lga1700, ddr4, matx, 3990000).
motherboard(mobo_z790_plus_ddr5, 'ASUS ?TUF GAMING Z790-PLUS WIFI', lga1700, ddr5, matx, 6840000).
motherboard(mobo_z790m_ddr5, 'ASRock Z790M PG Lightning/D4', lga1700, ddr5, matx, 3620000).
motherboard(mobo_z690m_ddr4, 'ASRock Z690M Phantom Gaming 4', lga1700, ddr4, matx, 2560000).
motherboard(mobo_b660_plus_ddr4, 'ASUS PRIME B660-PLUS D4', lga1700, ddr4, matx, 3230000).
motherboard(mobo_z590_plus_ddr4, 'ASUS TUF GAMING Z590-PLUS', lga1200, ddr4, matx, 3760000).
motherboard(mobo_b460m_v5_ddr4, 'ASUS EX B460M-V5', lga1200, ddr4, matx, 1660000).
motherboard(mobo_x670_ddr5, 'ASUS PRIME X670 P WIFI CSM', am5, ddr5, matx, 5700000).
motherboard(mobo_z590i_ddr4, 'MSI MEG Z590I UNIFY', lga1200, ddr4, matx, 7110000).
motherboard(mobo_b660m_a_ddr4, 'ASUS PRIME B660M-A D4', lga1700, ddr4, matx, 2750000).
motherboard(mobo_h110_ddr4, 'Frontech H110/1151 DDR4', lga1151, ddr4, matx, 730000).
motherboard(mobo_h61m_s_ddr3, 'Dtech Gigabyte GA-H61M-S', lga1155, ddr3, matx, 470000).
motherboard(mobo_b560m_ds2h_ac_ddr4, 'GIGABYTE B560M-DS2H-AC', lga1200, ddr4, matx, 2360000).
motherboard(mobo_b660a_gaming_wifi_ddr4, 'ASUS ROG STRIX B660A-GAMING-WiFi D4', lga1700, ddr4, matx, 4460000).
motherboard(mobo_h61h2_ddr3, 'Dtech ECS H61H2 Intel G2020 Processor 2Gb Adata ', lga1155, ddr3, matx, 530000).
motherboard(mobo_h81_m1_ddr3, 'Dtech Acer H81-M1', lga1150, ddr3, matx, 470000).
motherboard(mobo_h61m_ddr3, 'Dtech Asus P8H61M LX3', lga1155, ddr3, matx, 850000).
motherboard(mobo_mobo_lga1155_1084_ddr3, 'ZEBRONICS Zeb H-61M2 LGA 1155 Socket with M2 slo', lga1155, ddr3, matx, 470000).
motherboard(mobo_h81m_h_ddr3, 'GIGABYTE H81M-H', lga1150, ddr3, matx, 1200000).
motherboard(mobo_b650_plus_ddr5, 'ASUS TUF GAMING B650-PLUS', am5, ddr5, matx, 4750000).
motherboard(mobo_z690ud_ddr4, 'GIGABYTE Z690UD', lga1700, ddr4, matx, 4750000).
motherboard(mobo_mobo_lga1155_1364_ddr3, 'ZEBRONICS Zeb H-61M2 LGA 1155 Socket with M2 slo', lga1155, ddr3, matx, 470000).
motherboard(mobo_a520m_e_ddr4, 'ASUS Prime A520M-E', am4, ddr4, matx, 1330000).
motherboard(mobo_b450_ddr4, 'GIGABYTE B450', am4, ddr4, matx, 1900000).
motherboard(mobo_h510_ddr4, 'LAPCARE', lga1200, ddr4, matx, 1420000).
motherboard(mobo_h613_ddr3, 'KRYSTAA KST-H613', lga1155, ddr3, matx, 460000).
motherboard(mobo_h61m2p_ddr3, 'ZEBRONICS Zeb-h61m2p', lga1155, ddr3, matx, 440000).

% C. FAKTA MEMORI (RAM)
% ram(Kode, Nama, TipeRAM, KapasitasGB, SpeedMHz, Harga).
ram(ram_xpg_ddr4_16gb_3200, 'XPG RAM DDR4 16 GB PC DDR4 3200MHz U-DIMM - AX4U', ddr4, 16, 3200, 630000).
ram(ram_adata_ddr4_8gb_3200, 'ADATA XPG GAMMIX D30 DDR4 8 GB PC DDR4', ddr4, 8, 3200, 380000).
ram(ram_xpg_ddr4_8gb_3200, 'XPG GAMMIX D30 3200mhz DDR4 8 GB PC SD RAM', ddr4, 8, 3200, 370000).
ram(ram_corsair_ddr4_16gb_3600, 'Corsair Vengeance LPX DDR4 16 GB PC 3600MHz C18', ddr4, 16, 3600, 760000).
ram(ram_hynix_ddr3_8gb_1600, 'Hynix 1600MHZ DDR3 8 GB PC', ddr3, 8, 1600, 150000).
ram(ram_crucial_ddr4_8gb_3200, 'Crucial CT DDR4 8 GB PC DRAM', ddr4, 8, 3200, 280000).
ram(ram_corsair_ddr4_8gb_3200, 'Corsair Vengeance RGB RS 8 GB 3200MHz C16 Memory', ddr4, 8, 3200, 540000).
ram(ram_geonix_ddr3_8gb_1600, 'GEONIX RAM DDR3 8 GB PC SD RAM', ddr3, 8, 1600, 150000).
ram(ram_generic_ddr3_8gb_1600, 'Simmtronic U-DIMM DDR3 8 GB PC 8GB DDR3L', ddr3, 8, 1600, 200000).
ram(ram_corsair_ddr4_16gb_3200, 'Corsair Vengeance RGB RS 16 GB 3200MHz C16 Memor', ddr4, 16, 3200, 810000).
ram(ram_g_skill_ddr4_32gb_3600, 'G.Skill Trident DDR4 32 GB PC', ddr4, 32, 3600, 6380000).
ram(ram_adata_ddr4_16gb_3200, 'ADATA SPECTRIX D60G DDR4 16 GB PC 3200 MHz AX4U3', ddr4, 16, 3200, 2660000).
ram(ram_crucial_ddr4_4gb_3200, 'Crucial Basic DDR4 4 GB PC', ddr4, 4, 3200, 170000).
ram(ram_generic_ddr4_8gb_3200, 'Thermaltake TOUGHRAM RGB DDR4 8 GB PC', ddr4, 8, 3200, 2160000).
ram(ram_crucial_ddr4_32gb_3200, 'Crucial Memory DDR4 32 GB PC DRAM', ddr4, 32, 3200, 2430000).
ram(ram_crucial_ddr4_16gb_3200, 'Crucial Basic DDR4 16 GB PC DDR4 16GB', ddr4, 16, 3200, 490000).
ram(ram_xpg_ddr5_16gb_6000, 'XPG LANCER RGB DDR5 16 GB PC', ddr5, 16, 6000, 6270000).
ram(ram_kingston_ddr3_8gb_1333, 'KINGSTON DDR3 1333Mhz Desktop PC DDR3 8 GB PC', ddr3, 8, 1333, 510000).
ram(ram_g_skill_ddr4_16gb_2666, 'G.Skill Aegis DDR4 16 GB PC', ddr4, 16, 2666, 1980000).
ram(ram_crucial_ddr3_4gb_1600, 'Crucial CT Series DDR3 4 GB PC DDR3L-1600', ddr3, 4, 1600, 170000).
ram(ram_xpg_ddr4_8gb_3000, 'XPG RAM DDR4 8 GB PC DDR4', ddr4, 8, 3000, 380000).
ram(ram_g_skill_ddr5_32gb_6000, 'G.Skill Trident DDR5 32 GB PC', ddr5, 32, 6000, 16910000).
ram(ram_generic_ddr4_8gb_2666, 'ZEBRONICS DDR4 8GB 2666mhz DDR4 8 GB PC', ddr4, 8, 2666, 340000).
ram(ram_crucial_ddr3_8gb_1600, 'Crucial CT Series DDR3 8 GB PC DDR3L', ddr3, 8, 1600, 310000).
ram(ram_kingston_ddr3_4gb_1600, 'KINGSTON Value DDR3 4 GB PC', ddr3, 4, 1600, 320000).
ram(ram_corsair_ddr4_16gb_3000, 'Corsair VENGEANCE LPX DDR4 16 GB PC 3000MHz C16', ddr4, 16, 3000, 840000).
ram(ram_hynix_ddr4_8gb_3200, 'Hynix PC4-2666V 1RX8 DDR2 8 GB PC', ddr4, 8, 3200, 250000).
ram(ram_generic_ddr4_16gb_2666, 'BRYT Standard DDR4 16 GB PC DRAM', ddr4, 16, 2666, 450000).
ram(ram_generic_ddr3_4gb_1600, 'EVM DDR3 4 GB PC DRAM', ddr3, 4, 1600, 160000).
ram(ram_g_skill_ddr4_16gb_3600, 'G.Skill Trident DDR4 16 GB PC', ddr4, 16, 3600, 3190000).
ram(ram_generic_ddr4_4gb_2666, 'BRYT Standard DDR4 4 GB PC DRAM', ddr4, 4, 2666, 160000).
ram(ram_crucial_ddr4_8gb_2400, 'Crucial CT8G4DFS824A DDR4 8 GB PC', ddr4, 8, 2400, 310000).
ram(ram_samsung_ddr4_4gb_2400, 'SAMSUNG 2400Mhz DDR4 4 GB PC', ddr4, 4, 2400, 310000).
ram(ram_kingston_ddr3_8gb_1600, 'KINGSTON RAM DDR3 8 GB PC ValueRAM', ddr3, 8, 1600, 430000).
ram(ram_generic_ddr4_8gb_2400, 'Simmtronic U-DIMM 2400MHZ DDR4 8 GB PC DDR4 DESK', ddr4, 8, 2400, 280000).
ram(ram_generic_ddr3_8gb_1333, 'simtronics 8GB DDR3 1333 Desktop DDR3 8 GB PC', ddr3, 8, 1333, 250000).
ram(ram_g_skill_ddr4_8gb_3200, 'G.Skill Ripjaws DDR4 8 GB PC', ddr4, 8, 3200, 1330000).
ram(ram_corsair_ddr4_4gb_2400, 'Corsair Vengeance LPX DDR4 4 GB PC 2400MHz)', ddr4, 4, 2400, 340000).
ram(ram_kingston_ddr4_8gb_3000, 'HyperX FURY RGB DDR4 8 GB PC', ddr4, 8, 3000, 650000).
ram(ram_kingston_ddr4_8gb_3200, 'KINGSTON BEAST KF432C16BB/8 DDR4 8 GB PC', ddr4, 8, 3200, 440000).
ram(ram_generic_ddr4_16gb_3200, 'gskill Ripjaws V 3200mhz DDR4 16 GB PC', ddr4, 16, 3200, 630000).
ram(ram_kingston_ddr3_4gb_1333, 'KINGSTON KVR1333d3n9/4 DDR3 4 GB PC', ddr3, 4, 1333, 250000).
ram(ram_adata_ddr4_4gb_3200, 'ADATA NA DDR4 4 GB PC', ddr4, 4, 3200, 480000).
ram(ram_kingston_ddr4_4gb_3200, 'KINGSTON ValueRAM 4GB 800MHz DDR2 4 GB PC', ddr4, 4, 3200, 300000).
ram(ram_crucial_ddr4_4gb_2666, 'Crucial Crucial Basic Series 2666 Mhz with 10 Ye', ddr4, 4, 2666, 190000).
ram(ram_generic_ddr4_4gb_3200, 'Simmtronics DDR4 4 GB PC', ddr4, 4, 3200, 210000).
ram(ram_hynix_ddr4_8gb_2666, 'Hynix 2666 DDR4 8 GB PC', ddr4, 8, 2666, 250000).
ram(ram_generic_ddr4_4gb_2133, 'Simmtronics 2133 MHZ DDR4 4 GB PC', ddr4, 4, 2133, 310000).
ram(ram_generic_ddr4_4gb_2400, 'zione 4GB DDR4 2400 MHz DDR4 4 GB PC', ddr4, 4, 2400, 340000).
ram(ram_crucial_ddr4_4gb_2400, 'Crucial CT-2400 MHz DDR4 4 GB PC', ddr4, 4, 2400, 180000).
ram(ram_generic_ddr3_2gb_1600, 'Starlite DDR3PC1333S DDR3 2 GB PC', ddr3, 2, 1600, 150000).
ram(ram_crucial_ddr4_8gb_2666, 'Crucial DDR4 DDR4 8 GB PC', ddr4, 8, 2666, 340000).
ram(ram_geonix_ddr4_8gb_2666, 'GEONIX DDR4 8 GB PC', ddr4, 8, 2666, 250000).
ram(ram_crucial_ddr5_16gb_4800, 'Crucial 4800MHz CL40 CT16G48C40U5 DDR5 16 GB PC ', ddr5, 16, 4800, 1050000).
ram(ram_samsung_ddr3_4gb_1600, 'SAMSUNG 1600mhz Desktop 1Rx8 RAM DDR3 4 GB PC', ddr3, 4, 1600, 170000).
ram(ram_crucial_ddr5_8gb_4800, 'Crucial 4800MHz CL40 CT8G48C40U5 DDR5 8 GB PC DR', ddr5, 8, 4800, 470000).
ram(ram_generic_ddr4_64gb_3200, 'simtronics SIMMTRONICS DDR 64 GB PC', ddr4, 64, 3200, 240000).
ram(ram_kingston_ddr4_16gb_3200, 'KINGSTON Valueram DDR4 16 GB PC DDR4', ddr4, 16, 3200, 840000).
ram(ram_generic_ddr4_8gb_2133, 'Simmtronics DDR4 8 GB PC', ddr4, 8, 2133, 500000).
ram(ram_generic_ddr4_8gb_3600, 'HyperX 3600MHZ DDR4 8 GB PC, Server', ddr4, 8, 3600, 660000).
ram(ram_generic_ddr4_2gb_3200, 'simtronics 2GB DDR2 667MHZ DDR2 2 GB PC', ddr4, 2, 3200, 170000).
ram(ram_kingston_ddr3_2gb_1600, 'KINGSTON Value RAM DDR3 2 GB PC', ddr3, 2, 1600, 190000).
ram(ram_hynix_ddr4_8gb_2400, 'Sk Hynix 2400MHz DDR4 8 GB PC DDR4', ddr4, 8, 2400, 250000).
ram(ram_crucial_ddr5_32gb_4800, 'Crucial 4800MHz CL40 CT32G48C40U5 DDR5 32 GB PC ', ddr5, 32, 4800, 1650000).
ram(ram_generic_ddr4_2gb_5300, 'STELLULAR 667/5300MHZ DDR2 2 GB PC', ddr4, 2, 5300, 160000).
ram(ram_samsung_ddr3_4gb_1333, 'SAMSUNG DDR3 1333mhz DDR3 4 GB PC', ddr3, 4, 1333, 150000).
ram(ram_samsung_ddr4_2gb_3200, 'SAMSUNG Original DDR2 2 GB PC', ddr4, 2, 3200, 260000).
ram(ram_generic_ddr4_32gb_3200, 'Simmtronics DDR4 32 GB PC', ddr4, 32, 3200, 1330000).
ram(ram_generic_ddr3_1gb_1600, 'AVN ULTRA DDR3 1 GB PC', ddr3, 1, 1600, 460000).
ram(ram_generic_ddr4_8gb_5600, 'STELLULAR 3200/25600MHZ DDR4 8 GB PC', ddr4, 8, 5600, 360000).
ram(ram_generic_ddr4_4gb_1300, 'STELLULAR 2666/21300MHZ DDR4 4 GB PC', ddr4, 4, 1300, 220000).
ram(ram_g_skill_ddr4_16gb_3200, 'G.Skill Trident Z Neo 3200 Mhz DDR4 16 GB PC', ddr4, 16, 3200, 3230000).
ram(ram_g_skill_ddr4_8gb_2400, 'G.Skill Ripjaws V DDR4 8 GB PC', ddr4, 8, 2400, 950000).
ram(ram_g_skill_ddr4_8gb_3600, 'G.Skill Ripjaws DDR4 8 GB PC', ddr4, 8, 3600, 1440000).
ram(ram_g_skill_ddr4_32gb_3200, 'G.Skill Ripjaws DDR4 32 GB PC', ddr4, 32, 3200, 5430000).
ram(ram_kingston_ddr4_8gb_2400, 'KINGSTON RAM DDR4 8 GB PC 288-Pin DDR4', ddr4, 8, 2400, 510000).
ram(ram_generic_ddr4_1gb_3200, 'Simmtronics DDR2 1 GB PC', ddr4, 1, 3200, 390000).
ram(ram_generic_ddr3_4gb_1333, 'Starlite 4GB DDR3 PC1333U DDR3 4 GB PC', ddr3, 4, 1333, 250000).
ram(ram_generic_ddr4_16gb_2400, 'Simmtronics 2400 MHz DDR4 16 GB PC', ddr4, 16, 2400, 530000).
ram(ram_generic_ddr4_16gb_2133, 'Simmtronics 2133 MHz DDR4 16 GB PC', ddr4, 16, 2133, 1010000).

% D. FAKTA KARTU GRAFIS (GPU - Termasuk Intel Arc)
% gpu(Kode, Nama, Brand, MinWattPSU, VRAM_GB, Harga, Tier).
gpu(gpu_intel_arc_a380, 'Intel Arc A380 6GB GDDR6', intel, 450, 6, 2150000, entry).
gpu(gpu_intel_arc_a580, 'Intel Arc A580 8GB GDDR6', intel, 500, 8, 2850000, mid).
gpu(gpu_intel_arc_a750, 'Intel Arc A750 8GB GDDR6', intel, 550, 8, 3450000, mid).
gpu(gpu_intel_arc_a770, 'Intel Arc A770 16GB GDDR6', intel, 600, 16, 5200000, mid_high).
gpu(gpu_nvidia_gpu_0, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gt_730, 'ASUS NVIDIA GeForce GT 730 2 GB GDDR5', nvidia, 450, 2, 840000, entry).
gpu(gpu_nvidia_gt610, 'ZEBRONICS NVIDIA ZEB-GT610 2 GB DDR3', nvidia, 450, 2, 390000, mid).
gpu(gpu_nvidia_gt_710, 'ASUS NVIDIA Geforce GT 710 2 GB DDR3', nvidia, 450, 2, 870000, entry).
gpu(gpu_nvidia_gpu_5, 'GIGABYTE NVIDIA GV-N710D3-2GL 2 GB DDR3', nvidia, 450, 2, 760000, entry).
gpu(gpu_nvidia_gt730, 'GEONIX NVIDIA GX GT730 4GB D3 4 GB DDR3', nvidia, 450, 4, 570000, entry).
gpu(gpu_nvidia_gtx1650amp, 'ZOTAC NVIDIA GTX1650AMP 4 GB GDDR6', nvidia, 450, 4, 2650000, entry).
gpu(gpu_amd_rx550, 'ASUS AMD Radeon PH-RX550-4G-EVO 4 GB GDDR5', amd, 450, 4, 1900000, entry).
gpu(gpu_nvidia_gpu_10, 'GEONIX NVIDIA Geonix610 2 GB DDR3', nvidia, 450, 2, 360000, mid).
gpu(gpu_nvidia_gtx_1660, 'Inno3D NVIDIA GEFORCE GTX 1660 Super Twin X2 6 G', nvidia, 450, 6, 4100000, mid).
gpu(gpu_nvidia_gpu_12, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GD 4 GB GDDR6', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_rtx_3060, 'ZOTAC NVIDIA RTX 3060 Twin Edge OC 12 GB GDDR6', nvidia, 550, 12, 5700000, mid).
gpu(gpu_amd_rx_6500, 'amd by Sapphire AMD Radeon Radeon RX 6500 XT 4 G', amd, 450, 4, 3300000, mid).
gpu(gpu_amd_rx_580, 'mytechvision AMD Radeon RX 580 8 GB GDDR5', amd, 450, 8, 2090000, mid).
gpu(gpu_nvidia_rtx_4070, 'ZOTAC NVIDIA GAMING GeForce RTX 4070 Twin Edge O', nvidia, 650, 12, 11750000, high).
gpu(gpu_nvidia_gtx_1650, 'ZOTAC NVIDIA GeForce GTX 1650 OC 4 GB GDDR6', nvidia, 450, 4, 2640000, entry).
gpu(gpu_amd_rx6600xt, 'ASRock AMD Radeon RX6600XT PGD 8 GB GDDR6', amd, 450, 8, 7600000, mid).
gpu(gpu_nvidia_gpu_22, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GB 4 GB GDDR6', nvidia, 450, 4, 2620000, mid).
gpu(gpu_nvidia_gt_1030, 'ZOTAC NVIDIA GeForce GT 1030 2 GB DDR5', nvidia, 450, 2, 1500000, entry).
gpu(gpu_nvidia_gt_610, 'FRONTECH NVIDIA GT 610 with 64 Bits PCIe 2.0, Hi', nvidia, 450, 2, 370000, mid).
gpu(gpu_amd_rx6600, 'ASRock AMD Radeon RX6600 CLD 8 GB GDDR6', amd, 450, 8, 6270000, mid).
gpu(gpu_nvidia_rtx_4060, 'ZOTAC NVIDIA GEFORCE RTX 4060 TWIN EDGE OC White', nvidia, 550, 8, 6320000, mid).
gpu(gpu_nvidia_gpu_28, 'GIGABYTE NVIDIA GV-N3050WF2OC-8GD 8 GB GDDR6', nvidia, 450, 8, 4540000, mid).
gpu(gpu_amd_gpu_29, 'GIGABYTE AMD Radeon GV-R66XTGAMING OC-8GD 8 GB G', amd, 450, 8, 9310000, mid).
gpu(gpu_nvidia_gtx1050, 'Inno3D NVIDIA GeForce GTX1050 TI 4 GB GDDR5', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gtx_1630, 'ZOTAC NVIDIA Geforce GTX 1630 4 GB GDDR6 4 GB GD', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gpu_33, 'GIGABYTE NVIDIA GV-n3060WF2OC-12GB 12 GB GDDR6', nvidia, 550, 12, 5420000, mid).
gpu(gpu_nvidia_gpu_34, 'Colorful NVIDIA GTX-1660 6 GB GDDR6', nvidia, 450, 6, 4370000, mid).
gpu(gpu_nvidia_rtx_3070, 'MSI NVIDIA GeForce RTX 3070 VENTUS 3X PLUS 8G OC', nvidia, 650, 8, 11020000, high).
gpu(gpu_nvidia_gpu_39, 'GIGABYTE NVIDIA GV-N308TGAMING OC-12GD 12 GB GDD', nvidia, 450, 12, 21850000, mid).
gpu(gpu_nvidia_gpu_40, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_45, 'GIGABYTE NVIDIA GV-N710D3-2GL 2 GB DDR3', nvidia, 450, 2, 760000, entry).
gpu(gpu_nvidia_gpu_50, 'GEONIX NVIDIA Geonix610 2 GB DDR3', nvidia, 450, 2, 360000, mid).
gpu(gpu_nvidia_gpu_52, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GD 4 GB GDDR6', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gpu_62, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GB 4 GB GDDR6', nvidia, 450, 4, 2620000, mid).
gpu(gpu_nvidia_gpu_68, 'GIGABYTE NVIDIA GV-N3050WF2OC-8GD 8 GB GDDR6', nvidia, 450, 8, 4540000, mid).
gpu(gpu_amd_gpu_69, 'GIGABYTE AMD Radeon GV-R66XTGAMING OC-8GD 8 GB G', amd, 450, 8, 9310000, mid).
gpu(gpu_nvidia_gpu_73, 'GIGABYTE NVIDIA GV-n3060WF2OC-12GB 12 GB GDDR6', nvidia, 550, 12, 5420000, mid).
gpu(gpu_nvidia_gpu_74, 'Colorful NVIDIA GTX-1660 6 GB GDDR6', nvidia, 450, 6, 4370000, mid).
gpu(gpu_nvidia_gpu_79, 'GIGABYTE NVIDIA GV-N308TGAMING OC-12GD 12 GB GDD', nvidia, 450, 12, 21850000, mid).
gpu(gpu_nvidia_gpu_80, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_rx6700xt, 'ASRock AMD Radeon RX6700XT CLD 12 GB GDDR6', amd, 550, 12, 11460000, mid).
gpu(gpu_nvidia_rtx_3050, 'ZOTAC NVIDIA RTX 3050 Twin Edge 8 GB GDDR6', nvidia, 450, 8, 4470000, mid).
gpu(gpu_nvidia_gtx_1050, 'MSI NVIDIA GeForce GTX 1050 Ti 4GT OCV1 4 GB GDD', nvidia, 450, 4, 2850000, mid).
gpu(gpu_amd_gpu_87, 'GIGABYTE AMD Radeon GV-R65XTGAMING OC-4GD 4 GB G', amd, 450, 4, 4940000, mid).
gpu(gpu_amd_rx_6650xt, 'ASUS AMD Radeon Dual RX 6650XT OC 8 GB GDDR6', amd, 450, 8, 7600000, mid).
gpu(gpu_nvidia_rtx_3080, 'Inno3D NVIDIA GEFORCE RTX 3080 Ti X3 12 GB GDDR6', nvidia, 750, 12, 24700000, flagship).
gpu(gpu_nvidia_rtx_3090, 'MSI NVIDIA RTX 3090 VENTUS 24 GB GDDR6X', nvidia, 850, 24, 38950000, flagship).
gpu(gpu_nvidia_gpu_94, 'MSI NVIDIA N730K-4GD3 4 GB DDR3', nvidia, 450, 4, 1230000, entry).
gpu(gpu_amd_rx_6400, 'MSI AMD Radeon Radeon RX 6400 AERO ITX 4G 4 GB G', amd, 450, 4, 3040000, mid).
gpu(gpu_amd_gpu_103, 'GIGABYTE AMD Radeon GV-R68XTGAMING OC-16GD 16 GB', amd, 450, 16, 19950000, mid).
gpu(gpu_amd_gpu_104, 'GIGABYTE AMD Radeon GV-R69XTAORUS M-16GD 16 GB G', amd, 450, 16, 28500000, mid).
gpu(gpu_nvidia_rtx_2060, 'Inno3D NVIDIA GeForce RTX 2060 Super Twin X2 OC ', nvidia, 550, 8, 8550000, mid).
gpu(gpu_nvidia_gpu_115, 'Colorful NVIDIA GT-1050 4 GB DDR5', nvidia, 450, 4, 3700000, mid).
gpu(gpu_nvidia_gpu_116, 'Colorful NVIDIA RTX-3050 8 GB GDDR6', nvidia, 450, 8, 5510000, mid).
gpu(gpu_nvidia_gpu_120, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_125, 'GIGABYTE NVIDIA GV-N710D3-2GL 2 GB DDR3', nvidia, 450, 2, 760000, entry).
gpu(gpu_nvidia_gpu_130, 'GEONIX NVIDIA Geonix610 2 GB DDR3', nvidia, 450, 2, 360000, mid).
gpu(gpu_nvidia_gpu_132, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GD 4 GB GDDR6', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gpu_142, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GB 4 GB GDDR6', nvidia, 450, 4, 2620000, mid).
gpu(gpu_nvidia_gpu_148, 'GIGABYTE NVIDIA GV-N3050WF2OC-8GD 8 GB GDDR6', nvidia, 450, 8, 4540000, mid).
gpu(gpu_amd_gpu_149, 'GIGABYTE AMD Radeon GV-R66XTGAMING OC-8GD 8 GB G', amd, 450, 8, 9310000, mid).
gpu(gpu_nvidia_gpu_153, 'GIGABYTE NVIDIA GV-n3060WF2OC-12GB 12 GB GDDR6', nvidia, 550, 12, 5420000, mid).
gpu(gpu_nvidia_gpu_154, 'Colorful NVIDIA GTX-1660 6 GB GDDR6', nvidia, 450, 6, 4370000, mid).
gpu(gpu_nvidia_gpu_159, 'GIGABYTE NVIDIA GV-N308TGAMING OC-12GD 12 GB GDD', nvidia, 450, 12, 21850000, mid).
gpu(gpu_nvidia_gpu_160, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_167, 'GIGABYTE AMD Radeon GV-R65XTGAMING OC-4GD 4 GB G', amd, 450, 4, 4940000, mid).
gpu(gpu_nvidia_gpu_174, 'MSI NVIDIA N730K-4GD3 4 GB DDR3', nvidia, 450, 4, 1230000, entry).
gpu(gpu_amd_gpu_183, 'GIGABYTE AMD Radeon GV-R68XTGAMING OC-16GD 16 GB', amd, 450, 16, 19950000, mid).
gpu(gpu_amd_gpu_184, 'GIGABYTE AMD Radeon GV-R69XTAORUS M-16GD 16 GB G', amd, 450, 16, 28500000, mid).
gpu(gpu_nvidia_gpu_195, 'Colorful NVIDIA GT-1050 4 GB DDR5', nvidia, 450, 4, 3700000, mid).
gpu(gpu_nvidia_gpu_196, 'Colorful NVIDIA RTX-3050 8 GB GDDR6', nvidia, 450, 8, 5510000, mid).
gpu(gpu_nvidia_gpu_200, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_203, 'GIGABYTE AMD Radeon GV-R65XTEAGLE-4GD 4 GB GDDR6', amd, 450, 4, 4460000, mid).
gpu(gpu_amd_rx_6600, 'amd AMD Radeon Sapphire NITRO+ Radeon™ RX 6600 X', amd, 450, 8, 9400000, mid).
gpu(gpu_amd_rx_6700, 'amd AMD Radeon RX 6700 XT 12 GB GDDR6', amd, 550, 12, 11590000, mid).
gpu(gpu_amd_rx6500xt, 'ASRock AMD Radeon RX6500XT PGD 4 GB GDDR6', amd, 450, 4, 3990000, mid).
gpu(gpu_amd_rx_6800, 'amd AMD Radeon Sapphire Pulse Radeon™ RX 6800 Gr', amd, 450, 16, 19000000, high).
gpu(gpu_amd_gpu_214, 'PowerColor AMD Radeon Fighter 6700XT 12 GB GDDR6', amd, 550, 12, 11950000, mid).
gpu(gpu_amd_gpu_216, 'GIGABYTE AMD Radeon GV-R69XTGAMING OC-16GD 16 GB', amd, 450, 16, 26600000, mid).
gpu(gpu_nvidia_gpu_218, 'GIGABYTE NVIDIA 1650-1 Fan 4 GB GDDR6', nvidia, 450, 4, 2510000, entry).
gpu(gpu_nvidia_gpu_223, 'Colorful NVIDIA RTX-3080 Ti 12 GB GDDR6X', nvidia, 750, 12, 19000000, flagship).
gpu(gpu_amd_rx6800xt, 'ASRock AMD Radeon RX6800XT PGD 16 GB GDDR6', amd, 450, 16, 18050000, high).
gpu(gpu_amd_rx_6500xt, 'ASUS AMD Radeon Dual RX 6500XT OC 4 GB GDDR6', amd, 450, 4, 3420000, mid).
gpu(gpu_nvidia_rtx3080, 'ASUS NVIDIA ROG-STRIX-RTX3080-O10G-V2 10 GB GDDR', nvidia, 750, 10, 15200000, flagship).
gpu(gpu_nvidia_gpu_240, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_245, 'GIGABYTE NVIDIA GV-N710D3-2GL 2 GB DDR3', nvidia, 450, 2, 760000, entry).
gpu(gpu_nvidia_gpu_250, 'GEONIX NVIDIA Geonix610 2 GB DDR3', nvidia, 450, 2, 360000, mid).
gpu(gpu_nvidia_gpu_252, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GD 4 GB GDDR6', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gpu_262, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GB 4 GB GDDR6', nvidia, 450, 4, 2620000, mid).
gpu(gpu_nvidia_gpu_268, 'GIGABYTE NVIDIA GV-N3050WF2OC-8GD 8 GB GDDR6', nvidia, 450, 8, 4540000, mid).
gpu(gpu_amd_gpu_269, 'GIGABYTE AMD Radeon GV-R66XTGAMING OC-8GD 8 GB G', amd, 450, 8, 9310000, mid).
gpu(gpu_nvidia_gpu_273, 'GIGABYTE NVIDIA GV-n3060WF2OC-12GB 12 GB GDDR6', nvidia, 550, 12, 5420000, mid).
gpu(gpu_nvidia_gpu_274, 'Colorful NVIDIA GTX-1660 6 GB GDDR6', nvidia, 450, 6, 4370000, mid).
gpu(gpu_nvidia_gpu_279, 'GIGABYTE NVIDIA GV-N308TGAMING OC-12GD 12 GB GDD', nvidia, 450, 12, 21850000, mid).
gpu(gpu_nvidia_gpu_280, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_287, 'GIGABYTE AMD Radeon GV-R65XTGAMING OC-4GD 4 GB G', amd, 450, 4, 4940000, mid).
gpu(gpu_nvidia_gpu_294, 'MSI NVIDIA N730K-4GD3 4 GB DDR3', nvidia, 450, 4, 1230000, entry).
gpu(gpu_amd_gpu_303, 'GIGABYTE AMD Radeon GV-R68XTGAMING OC-16GD 16 GB', amd, 450, 16, 19950000, mid).
gpu(gpu_amd_gpu_304, 'GIGABYTE AMD Radeon GV-R69XTAORUS M-16GD 16 GB G', amd, 450, 16, 28500000, mid).
gpu(gpu_nvidia_gpu_315, 'Colorful NVIDIA GT-1050 4 GB DDR5', nvidia, 450, 4, 3700000, mid).
gpu(gpu_nvidia_gpu_316, 'Colorful NVIDIA RTX-3050 8 GB GDDR6', nvidia, 450, 8, 5510000, mid).
gpu(gpu_nvidia_gpu_320, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_323, 'GIGABYTE AMD Radeon GV-R65XTEAGLE-4GD 4 GB GDDR6', amd, 450, 4, 4460000, mid).
gpu(gpu_amd_gpu_334, 'PowerColor AMD Radeon Fighter 6700XT 12 GB GDDR6', amd, 550, 12, 11950000, mid).
gpu(gpu_amd_gpu_336, 'GIGABYTE AMD Radeon GV-R69XTGAMING OC-16GD 16 GB', amd, 450, 16, 26600000, mid).
gpu(gpu_nvidia_gpu_338, 'GIGABYTE NVIDIA 1650-1 Fan 4 GB GDDR6', nvidia, 450, 4, 2510000, entry).
gpu(gpu_nvidia_gpu_343, 'Colorful NVIDIA RTX-3080 Ti 12 GB GDDR6X', nvidia, 750, 12, 19000000, flagship).
gpu(gpu_nvidia_gpu_360, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_362, 'Colorful NVIDIA RTX-3070 Ti 8 GB GDDR6', nvidia, 650, 8, 12350000, high).
gpu(gpu_amd_gpu_370, 'sillora AMD Radeon AMD 8 GB GDDR5', amd, 450, 8, 2050000, mid).
gpu(gpu_amd_gpu_371, 'GIGABYTE AMD Radeon GV-R66EAGLE-8GD 8 GB GDDR6', amd, 450, 8, 7880000, mid).
gpu(gpu_amd_gpu_382, 'Selito AMD Radeon AMD RADEON 8 GB DDR5', amd, 450, 8, 2050000, mid).
gpu(gpu_nvidia_gpu_387, 'GIGABYTE NVIDIA GeForce RTX™ 3060 VISION OC 12G ', nvidia, 550, 12, 16830000, mid).
gpu(gpu_nvidia_gtx_1060, 'Selito NVIDIA GTX 1060 3 GB GDDR5', nvidia, 450, 3, 2470000, mid).
gpu(gpu_nvidia_gpu_392, 'Etzin NVIDIA NVIDIA PCIe x1 to 4 USB Hub PCI-Exp', nvidia, 450, 1, 570000, mid).
gpu(gpu_nvidia_rtx3060, 'ASUS NVIDIA DUAL-RTX3060-O12G 12 GB GDDR6', nvidia, 550, 12, 16150000, mid).
gpu(gpu_nvidia_gpu_396, 'GIGABYTE NVIDIA GeForce RTX™ 2060 D6 6G 6 GB GDD', nvidia, 550, 6, 10360000, mid).
gpu(gpu_nvidia_gpu_400, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_405, 'GIGABYTE NVIDIA GV-N710D3-2GL 2 GB DDR3', nvidia, 450, 2, 760000, entry).
gpu(gpu_nvidia_gpu_410, 'GEONIX NVIDIA Geonix610 2 GB DDR3', nvidia, 450, 2, 360000, mid).
gpu(gpu_nvidia_gpu_412, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GD 4 GB GDDR6', nvidia, 450, 4, 2850000, mid).
gpu(gpu_nvidia_gpu_422, 'GIGABYTE NVIDIA GV-N1656WF2OC-4GB 4 GB GDDR6', nvidia, 450, 4, 2620000, mid).
gpu(gpu_nvidia_gpu_428, 'GIGABYTE NVIDIA GV-N3050WF2OC-8GD 8 GB GDDR6', nvidia, 450, 8, 4540000, mid).
gpu(gpu_amd_gpu_429, 'GIGABYTE AMD Radeon GV-R66XTGAMING OC-8GD 8 GB G', amd, 450, 8, 9310000, mid).
gpu(gpu_nvidia_gpu_433, 'GIGABYTE NVIDIA GV-n3060WF2OC-12GB 12 GB GDDR6', nvidia, 550, 12, 5420000, mid).
gpu(gpu_nvidia_gpu_434, 'Colorful NVIDIA GTX-1660 6 GB GDDR6', nvidia, 450, 6, 4370000, mid).
gpu(gpu_nvidia_gpu_439, 'GIGABYTE NVIDIA GV-N308TGAMING OC-12GD 12 GB GDD', nvidia, 450, 12, 21850000, mid).
gpu(gpu_nvidia_gpu_440, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_447, 'GIGABYTE AMD Radeon GV-R65XTGAMING OC-4GD 4 GB G', amd, 450, 4, 4940000, mid).
gpu(gpu_nvidia_gpu_454, 'MSI NVIDIA N730K-4GD3 4 GB DDR3', nvidia, 450, 4, 1230000, entry).
gpu(gpu_amd_gpu_463, 'GIGABYTE AMD Radeon GV-R68XTGAMING OC-16GD 16 GB', amd, 450, 16, 19950000, mid).
gpu(gpu_amd_gpu_464, 'GIGABYTE AMD Radeon GV-R69XTAORUS M-16GD 16 GB G', amd, 450, 16, 28500000, mid).
gpu(gpu_nvidia_gpu_475, 'Colorful NVIDIA GT-1050 4 GB DDR5', nvidia, 450, 4, 3700000, mid).
gpu(gpu_nvidia_gpu_476, 'Colorful NVIDIA RTX-3050 8 GB GDDR6', nvidia, 450, 8, 5510000, mid).
gpu(gpu_nvidia_gpu_480, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_amd_gpu_483, 'GIGABYTE AMD Radeon GV-R65XTEAGLE-4GD 4 GB GDDR6', amd, 450, 4, 4460000, mid).
gpu(gpu_amd_gpu_494, 'PowerColor AMD Radeon Fighter 6700XT 12 GB GDDR6', amd, 550, 12, 11950000, mid).
gpu(gpu_amd_gpu_496, 'GIGABYTE AMD Radeon GV-R69XTGAMING OC-16GD 16 GB', amd, 450, 16, 26600000, mid).
gpu(gpu_nvidia_gpu_498, 'GIGABYTE NVIDIA 1650-1 Fan 4 GB GDDR6', nvidia, 450, 4, 2510000, entry).
gpu(gpu_nvidia_gpu_503, 'Colorful NVIDIA RTX-3080 Ti 12 GB GDDR6X', nvidia, 750, 12, 19000000, flagship).
gpu(gpu_nvidia_gpu_520, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_522, 'Colorful NVIDIA RTX-3070 Ti 8 GB GDDR6', nvidia, 650, 8, 12350000, high).
gpu(gpu_amd_gpu_530, 'sillora AMD Radeon AMD 8 GB GDDR5', amd, 450, 8, 2050000, mid).
gpu(gpu_amd_gpu_531, 'GIGABYTE AMD Radeon GV-R66EAGLE-8GD 8 GB GDDR6', amd, 450, 8, 7880000, mid).
gpu(gpu_amd_gpu_542, 'Selito AMD Radeon AMD RADEON 8 GB DDR5', amd, 450, 8, 2050000, mid).
gpu(gpu_nvidia_gpu_547, 'GIGABYTE NVIDIA GeForce RTX™ 3060 VISION OC 12G ', nvidia, 550, 12, 16830000, mid).
gpu(gpu_nvidia_gpu_552, 'Etzin NVIDIA NVIDIA PCIe x1 to 4 USB Hub PCI-Exp', nvidia, 450, 1, 570000, mid).
gpu(gpu_nvidia_gpu_556, 'GIGABYTE NVIDIA GeForce RTX™ 2060 D6 6G 6 GB GDD', nvidia, 550, 6, 10360000, mid).
gpu(gpu_nvidia_gpu_560, 'ITSNAVAKER NVIDIA CONSISTENT G210 1 GB DDR3', nvidia, 450, 1, 460000, mid).
gpu(gpu_nvidia_gpu_572, 'srigs NVIDIA zeb-gt-4gd3 4 GB DDR3', nvidia, 450, 4, 730000, mid).
gpu(gpu_nvidia_gpu_578, 'ZOTAC NVIDIA ZT-T20600H-10M 6 GB GDDR6', nvidia, 550, 6, 6650000, mid).
gpu(gpu_amd_gpu_581, 'REO AMD/ATI AMDR5340 2 GB DDR3', amd, 450, 2, 800000, mid).
gpu(gpu_nvidia_gpu_583, 'Etzin NVIDIA NVIDIA PCI-E 1X to SATA pcie to sat', nvidia, 450, 1, 1520000, mid).
gpu(gpu_amd_gpu_586, 'amd AMD Radeon Sapphire Nitro 16 GB GDDR6', amd, 450, 16, 20480000, mid).
gpu(gpu_amd_gpu_587, 'GIGABYTE AMD Radeon GV-R66XTEAGLE-8GD 8 GB GDDR6', amd, 450, 8, 8930000, mid).
gpu(gpu_nvidia_gpu_589, 'LipiWorld NVIDIA Pack Of 6 VER011-PRO Riser Card', nvidia, 450, 16, 570000, mid).
gpu(gpu_nvidia_gpu_592, 'LipiWorld NVIDIA VER-14Pro V014 Pro PCI-E 1X to ', nvidia, 450, 16, 630000, mid).
gpu(gpu_nvidia_gpu_593, 'Etzin NVIDIA NVIDIA 6 Port SATA 3 PCI Express Ex', nvidia, 450, 1, 950000, mid).
gpu(gpu_nvidia_gpu_597, 'LipiWorld NVIDIA Pcie Splitter 1 to 4 PCI Riser ', nvidia, 450, 16, 360000, mid).

% E. FAKTA POWER SUPPLY (PSU)
% psu(Kode, Nama, Watt, Sertifikasi, Harga).
psu(psu_ant_esports_450w_bronze, 'Ant Esports VS450L 450 Watts', 450, bronze, 310000).
psu(psu_zebronics_500w_bronze, 'ZEBRONICS ZEB-VS500Z 500 Watts', 500, bronze, 380000).
psu(psu_cooler_master_450w_bronze, 'COOLER MASTER MWE 450 Bronze V2 230v, 80 Plus Br', 450, bronze, 640000).
psu(psu_deepcool_850w_bronze, 'Deepcool PM850D 850 Watts', 850, bronze, 1530000).
psu(psu_cooler_master_1250w_gold, 'COOLER MASTER MWE Gold V2, FM 1250W A/IN Cable 1', 1250, gold, 3990000).
psu(psu_psu_500w_gold, 'artis VIP500 GOLD Super Silent 500 Watts', 500, gold, 420000).
psu(psu_psu_400w_bronze, 'BTronics 12V 33A / 400W DC Switched 400 Watts', 400, bronze, 250000).
psu(psu_psu_750w_bronze, 'EVGA 110-BQ-0750-VN BQ 750 Watts', 750, bronze, 1460000).
psu(psu_psu_1300w_bronze, 'EVGA 220-GT-1300-XN SupernovaGT 1300 Watts', 1300, bronze, 4920000).
psu(psu_psu_650w_bronze, 'ASUS TUF Gaming 650B 650 Watts', 650, bronze, 1580000).
psu(psu_psu_850w_gold, 'Nzxt 850 W 80+ GOLD FULL MODULAR 850 Watts', 850, gold, 2060000).
psu(psu_deepcool_1000w_gold, 'Deepcool DQ1000M-V3L 80 Plus Gold Fully Modular ', 1000, gold, 2410000).
psu(psu_psu_850w_bronze, 'EVGA 220-GT-0850-YN SupernovaGT 850 Watts', 850, bronze, 2090000).
psu(psu_thermaltake_750w_bronze, 'Thermaltake Smart BX1 750W 750 Watts', 750, bronze, 1330000).
psu(psu_cooler_master_750w_gold, 'COOLER MASTER V SFX Gold 750W A/UK Cable 750 Wat', 750, gold, 2450000).
psu(psu_cooler_master_850w_gold, 'COOLER MASTER MWE Gold V2 FM 850W A/UK Cable 850', 850, gold, 2050000).
psu(psu_thermaltake_650w_bronze, 'Thermaltake Litepower RGB 650W 650 Watts', 650, bronze, 890000).
psu(psu_psu_1000w_gold, 'Nzxt 1000 W 80+ GOLD FULL MODULAR 1000 Watts', 1000, gold, 2960000).
psu(psu_deepcool_1200w_gold, 'Deepcool PX1200G 80 Plus Gold /Cybenetics_Platin', 1200, gold, 3790000).
psu(psu_psu_550w_bronze, 'ASUS TUF Gaming 550B 550 Watts', 550, bronze, 1420000).
psu(psu_deepcool_750w_bronze, 'Deepcool PK750D 750 Watts', 750, bronze, 1110000).
psu(psu_psu_750w_gold, 'Nzxt 750 W 80+ GOLD FULL MODULAR 750 Watts', 750, gold, 1800000).
psu(psu_psu_1000w_bronze, 'EVGA 220-GT-1000-XN SupernovaGT 1000 Watts', 1000, bronze, 3400000).
psu(psu_msi_650w_bronze, 'MSI MAG A650BN 650 Watts', 650, bronze, 1020000).
psu(psu_cooler_master_1050w_gold, 'COOLER MASTER MWE Gold V2, Fully modular 1050W A', 1050, gold, 3320000).
psu(psu_psu_600w_bronze, 'artis 600 Watt High Performance 600 Watts', 600, bronze, 760000).
psu(psu_psu_350w_bronze, 'Omron S8FS-C35024 350 Watts', 350, bronze, 590000).
psu(psu_psu_700w_bronze, 'DHRUV-PRO 12V Switched Rainproof 700 Watts', 700, bronze, 400000).
psu(psu_thermaltake_850w_bronze, 'Thermaltake Toughpower GF 850W 850 Watts', 850, bronze, 2180000).
psu(psu_psu_500w_bronze, 'Fingers BlackBox-500 500 Watts', 500, bronze, 420000).
psu(psu_thermaltake_1000w_bronze, 'Thermaltake Toughpower GF1 1000W 80 1000 Watts', 1000, bronze, 3420000).
psu(psu_psu_450w_bronze, 'Micrologics ML 222T 60 Watts', 450, bronze, 1290000).
psu(psu_corsair_600w_bronze, 'discounthub Corsair 600W 12+4 pin PCIe 5.0 12VHP', 600, bronze, 280000).
psu(psu_corsair_450w_bronze, 'SUPERTRON Corsair Premium Individually ATX 24-Pi', 450, bronze, 420000).
psu(psu_ant_esports_500w_bronze, 'Ant Esports VS500L 500 Watts', 500, bronze, 380000).
psu(psu_ant_esports_600w_bronze, 'Ant Esports VS600L 600 Watts', 600, bronze, 440000).
psu(psu_cooler_master_650w_bronze, 'COOLER MASTER CM MWE 650 Bronze V2 230v, 80 Plus', 650, bronze, 1040000).
psu(psu_cooler_master_700w_gold, 'COOLER MASTER G700 Gold 80 Plus Gold Certified ,', 700, gold, 1290000).

% F. FAKTA STORAGE SSD
% storage(Kode, Nama, Tipe, KapasitasGB, Harga).
storage(ssd_ssd_256gb_sata, 'ZEBRONICS ZEB-SD26 256 GB Laptop, Desktop Intern', sata, 256, 210000).
storage(ssd_western_digital_240gb_sata, 'WESTERN DIGITAL WD Green SATA 240 GB Desktop, La', sata, 240, 260000).
storage(ssd_crucial_240gb_sata, 'Crucial BX500 240 GB Laptop, Desktop Internal', sata, 240, 270000).
storage(ssd_crucial_500gb_sata, 'Crucial BX500 3D NAND 2.5-inch 500 GB Desktop, L', sata, 500, 410000).
storage(ssd_western_digital_500gb_nvme, 'WESTERN DIGITAL WD Blue NVMe SN570 500 GB Laptop', nvme, 500, 490000).
storage(ssd_crucial_500gb_nvme, 'Crucial CT500P3SSD8 500 GB Desktop, Laptop Inter', nvme, 500, 470000).
storage(ssd_crucial_1000gb_sata, 'Crucial BX500 1 TB Desktop, Laptop Internal', sata, 1000, 800000).
storage(ssd_western_digital_480gb_sata, 'WESTERN DIGITAL WD Green SATA 480 GB Desktop, La', sata, 480, 400000).
storage(ssd_samsung_500gb_sata, 'SAMSUNG 870 Evo 500 GB Laptop, Desktop Internal', sata, 500, 700000).
storage(ssd_samsung_1000gb_sata, 'SAMSUNG 970 EVO Plus 1 TB Laptop, Desktop Intern', sata, 1000, 1150000).
storage(ssd_western_digital_1000gb_nvme, 'WESTERN DIGITAL WD Blue NVMe SN570 1 TB Laptop, ', nvme, 1000, 820000).
storage(ssd_western_digital_500gb_sata, 'WESTERN DIGITAL WD Blue SATA 500 GB Desktop, Lap', sata, 500, 580000).
storage(ssd_ssd_512gb_sata, 'ZEBRONICS ZEB-SD52 512 GB Desktop, Laptop Intern', sata, 512, 360000).
storage(ssd_ssd_512gb_nvme, 'ZEBRONICS m.2 nvme 512 GB All in One PC''s Intern', nvme, 512, 470000).
storage(ssd_crucial_1000gb_nvme, 'Crucial CT1000P3SSD8 1000 GB Desktop, Laptop Int', nvme, 1000, 740000).
storage(ssd_western_digital_1000gb_sata, 'WESTERN DIGITAL WD Black SN770 1 TB Desktop, Lap', sata, 1000, 980000).
storage(ssd_crucial_250gb_sata, 'Crucial CT 250 GB Laptop, Desktop Internal )', sata, 250, 360000).
storage(ssd_wd_240gb_sata, 'WD SN350 240 GB Desktop, Laptop, All in One PC''s', sata, 240, 340000).
storage(ssd_wd_500gb_sata, 'WD Blue™ SA510 500 GB Desktop, Laptop Internal', sata, 500, 700000).
storage(ssd_ssd_1000gb_sata, 'ZEBRONICS SD102 1 TB All in One PC''s Internal', sata, 1000, 740000).
storage(ssd_ssd_128gb_nvme, 'ZEBRONICS NVME SSD M.2 2280 FORM FACTOR 128 GB D', nvme, 128, 230000).
storage(ssd_wd_480gb_sata, 'WD Green 480 GB Laptop, Desktop Internal', sata, 480, 440000).
storage(ssd_western_digital_240gb_nvme, 'WESTERN DIGITAL WD Green M.2 240 GB Desktop, Lap', nvme, 240, 260000).
storage(ssd_ssd_1000gb_nvme, 'EVM NVME PCIE 1 TB Desktop, Laptop, All in One P', nvme, 1000, 760000).
storage(ssd_crucial_480gb_sata, 'Crucial BX500 480 GB Laptop, Desktop Internal', sata, 480, 400000).
storage(ssd_ssd_256gb_nvme, 'EVM SSD 256 GB Laptop, Desktop, All in One PC''s ', nvme, 256, 250000).
storage(ssd_wd_500gb_nvme, 'WD Blue™ SN570 M.2 NVMe 500 GB Desktop, Laptop, ', nvme, 500, 620000).
storage(ssd_ssd_240gb_sata, 'GIGABYTE SATA 240 GB Laptop, All in One PC''s, De', sata, 240, 340000).
storage(ssd_seagate_240gb_sata, 'Seagate BarraCuda SATA SSD 240 GB Laptop, Deskto', sata, 240, 340000).
storage(ssd_ssd_128gb_sata, 'ZEBRONICS Smart 128 GB Desktop, Laptop, All in O', sata, 128, 180000).
storage(ssd_kingston_240gb_sata, 'KINGSTON A 400 240 GB All in One PC''s, Desktop, ', sata, 240, 340000).
storage(ssd_wd_250gb_sata, 'WD Blue 3D 250 GB Laptop, Desktop, Servers, Surv', sata, 250, 460000).
storage(ssd_samsung_512gb_sata, 'SAMSUNG 860 Pro 512 GB Laptop, Desktop Internal', sata, 512, 2300000).
storage(ssd_crucial_2000gb_sata, 'Crucial CT 2000 GB Laptop, Desktop Internal', sata, 2000, 1810000).
storage(ssd_seagate_1000gb_nvme, 'Seagate Firecuda 520 with PCIe Gen4 x4 NVMe 1.3 ', nvme, 1000, 2580000).
storage(ssd_samsung_4000gb_sata, 'SAMSUNG 870 QVO 4 TB Laptop, Desktop Internal', sata, 4000, 5350000).
storage(ssd_ssd_500gb_nvme, 'HP EX900 M.2 PCIe 3.1 x4 NVMe 3D TLC NAND 500 GB', nvme, 500, 650000).
storage(ssd_samsung_8000gb_sata, 'SAMSUNG 870 QVO 8 TB Laptop, Desktop Internal', sata, 8000, 10500000).
storage(ssd_wd_2000gb_sata, 'WD SN850 without Heatsink 2 TB Laptop, All in On', sata, 2000, 4770000).
storage(ssd_wd_480gb_nvme, 'WD Green SN350 M.2 NVMe 480 GB Desktop Internal', nvme, 480, 610000).
storage(ssd_ssd_120gb_sata, 'KingSpec SATA III 120 GB Desktop, Laptop Interna', sata, 120, 210000).
storage(ssd_western_digital_2000gb_nvme, 'WESTERN DIGITAL WD Green Nvme SN350 2 TB Desktop', nvme, 2000, 1910000).
storage(ssd_ssd_250gb_nvme, 'HP EX900 250GB NVME 250 GB Laptop Internal', nvme, 250, 490000).
storage(ssd_kingston_500gb_sata, 'KINGSTON SSD NV2 4.0 500 GB Desktop Internal', sata, 500, 520000).
storage(ssd_wd_1000gb_sata, 'WD SN850 without Heatsink 1 TB Laptop, All in On', sata, 1000, 2040000).
storage(ssd_kingston_250gb_nvme, 'KINGSTON NV2 250 GB Laptop, Desktop, All in One ', nvme, 250, 470000).
storage(ssd_wd_120gb_sata, 'WD Green SATA 2.5/7mm disque 120 GB Laptop, All ', sata, 120, 320000).
storage(ssd_samsung_250gb_sata, 'SAMSUNG 970 EVO Plus 250 GB Laptop, Desktop Inte', sata, 250, 580000).
storage(ssd_kingston_480gb_sata, 'KINGSTON SATA 480 GB Laptop, Desktop Internal', sata, 480, 480000).
storage(ssd_western_digital_250gb_nvme, 'WESTERN DIGITAL WD Blue M.2 250 GB Desktop, Lapt', nvme, 250, 370000).
storage(ssd_ssd_120gb_nvme, 'HP S700 120 GB Laptop, Desktop Internal', nvme, 120, 300000).
storage(ssd_seagate_4000gb_nvme, 'Seagate Firecuda 530 - M.2 PCIe Gen4, Heatsink 4', nvme, 4000, 23340000).
storage(ssd_samsung_256gb_sata, 'SAMSUNG 860 Pro 256 GB Laptop, Desktop Internal', sata, 256, 1270000).
storage(ssd_ssd_250gb_sata, 'HP SSD S700 2.5 250 GB All in One PC''s, Laptop, ', sata, 250, 390000).
storage(ssd_western_digital_250gb_sata, 'WESTERN DIGITAL WD Blue SATA 250 GB Desktop, Lap', sata, 250, 370000).
storage(ssd_ssd_500gb_sata, 'HP S700 2.5 500 GB Laptop, Desktop Internal', sata, 500, 630000).
storage(ssd_seagate_2000gb_nvme, 'Seagate Firecuda 520 with PCIe Gen4 x4 NVMe 1.3 ', nvme, 2000, 4410000).
storage(ssd_kingston_960gb_sata, 'KINGSTON A400 960 GB Laptop, Desktop Internal', sata, 960, 860000).
storage(ssd_xpg_128gb_nvme, 'ADATA XPG SX6000 LITE PCIe NVMe M.2 2280 128 GB ', nvme, 128, 630000).
storage(ssd_ssd_480gb_sata, 'GIGABYTE SATA SSD 480 GB Desktop, Laptop, All in', sata, 480, 440000).
storage(ssd_ssd_4gb_sata, 'ZEBRONICS H61 Motherboard + 4GB DDR3 1600MHz Des', sata, 4, 990000).
storage(ssd_crucial_4000gb_nvme, 'Crucial CT4000P3SSD8 4000 GB Desktop, Laptop Int', nvme, 4000, 4560000).
storage(ssd_wd_1000gb_nvme, 'WD Blue™ SN570 1 TB Desktop Internal', nvme, 1000, 1490000).
storage(ssd_samsung_2000gb_sata, 'SAMSUNG 870 Evo 2 TB Laptop, Desktop Internal', sata, 2000, 2950000).
storage(ssd_wd_250gb_nvme, 'WD WD Blue NVMe SN550 250 GB Desktop, Laptop Int', nvme, 250, 500000).
storage(ssd_ssd_6gb_nvme, 'Simmtronics M.2 2280 SATA 6GB/S SSD 256 GB Lapto', nvme, 6, 250000).
storage(ssd_sandisk_1000gb_sata, 'SanDisk Portable SSD SDSSDE30-1T00-G25 1 TB Exte', sata, 1000, 1350000).
storage(ssd_sandisk_2000gb_sata, 'SanDisk Extreme Portable SDSSDE61-2T00-G25 2 TB ', sata, 2000, 2790000).
storage(ssd_seagate_1000gb_sata, 'Seagate One Touch with up to 1030 Mb/s for Windo', sata, 1000, 1710000).
storage(ssd_seagate_500gb_sata, 'Seagate Expansion SSD for PC Laptop, Mac with 3 ', sata, 500, 1140000).
storage(ssd_wd_240gb_nvme, 'WD M.2 WDS240G2G0B 240 GB Laptop, Desktop Intern', nvme, 240, 390000).
storage(ssd_crucial_2000gb_nvme, 'Crucial CT2000P3SSD8 2000 GB Desktop, Laptop Int', nvme, 2000, 1950000).
storage(ssd_wd_4000gb_sata, 'WD WD Blue 4 TB Desktop Internal', sata, 4000, 4590000).
storage(ssd_samsung_500gb_nvme, 'SAMSUNG SSD-008 500 GB Laptop Internal Internal ', nvme, 500, 1140000).
storage(ssd_seagate_500gb_nvme, 'Seagate Firecuda 530 - M.2 PCIe Gen4 and 3-Years', nvme, 500, 1230000).
storage(ssd_kingston_500gb_nvme, 'KINGSTON A2000 M.2 2280 NVMe PCIe Interface 500 ', nvme, 500, 930000).
storage(ssd_ssd_960gb_sata, 'HyperX Fury RGB 960 GB Desktop Internal', sata, 960, 3740000).
storage(ssd_samsung_250gb_nvme, 'SAMSUNG SSD-009 250 GB Laptop Internal Internal ', nvme, 250, 1050000).
storage(ssd_ssd_6gb_sata, 'scuda 6GB /S Speed 128 GB Desktop, Laptop, All i', sata, 6, 270000).
storage(ssd_ssd_240gb_nvme, 'ADATA Ultimate SU650 240 GB Desktop Internal', nvme, 240, 450000).
storage(ssd_ssd_1024gb_sata, 'Simmtronics SSD 1024 GB All in One PC''s, Desktop', sata, 1024, 720000).
storage(ssd_ssd_0gb_nvme, 'Etzin NA 0 GB All in One PC''s Internal', nvme, 0, 440000).
storage(ssd_samsung_1000gb_nvme, 'SAMSUNG SSD-003 1 TB Laptop Internal Internal )', nvme, 1000, 2740000).
storage(ssd_kingston_120gb_sata, 'KINGSTON A400 120 GB Desktop, Laptop, All in One', sata, 120, 430000).

% G. FAKTA CASING PC
% casing(Kode, Nama, FormFactorSupport, Harga).
casing(case_case_ice_120a, 'Ant Antice-120A Cabinate', atx, 660000).
casing(case_case_case_4, 'Matrix MTXCC009 MINI TOWER', matx, 340000).
casing(case_deepcool_matrexx_40, 'Deepcool MATREXX 40 Mid Tower MATX Case', matx, 530000).
casing(case_zebronics_case_9, 'ZEBRONICS ZEB-877B-CRONUS Mid Tower', atx, 570000).
casing(case_ant_esports_case_10, 'Ant Esports 690 Air Mid- Tower', atx, 1260000).
casing(case_galax_case_12, 'GALAX PC Case Revolution 05 White mid tower', atx, 950000).
casing(case_case_case_14, 'artis G8301 Full Tower', atx, 700000).
casing(case_lian_li_case_15, 'Lian Li Lancool II Mesh - Type C Mid- Tower', atx, 1890000).
casing(case_case_case_16, 'ENTWINO WARRIOR ,Supports 7 RGB Fans,Tempered Gl', atx, 1320000).
casing(case_cooler_master_d500d, 'COOLER MASTER MCB-D500D-KGNN-S01 Mid Tower', atx, 1630000).
casing(case_case_case_19, 'Matrix MTXCC006 MINI TOWER', matx, 340000).
casing(case_case_case_20, 'artis 2220 2.0C Micro ATX', matx, 430000).
casing(case_deepcool_matrexx_50, 'Deepcool MATREXX 50 MESH 4FS Mini Tower', matx, 920000).
casing(case_deepcool_matrexx_30, 'Deepcool MATREXX 30 SI Mini Tower', matx, 470000).
casing(case_msi_mag_forge, 'MSI MAG FORGE 110R Mid Tower', atx, 730000).
casing(case_cooler_master_h500, 'COOLER MASTER H500-KGNN-S00 Mid Tower', atx, 2010000).
casing(case_case_case_31, 'artis G8306 Gaming Full Tower', atx, 740000).
casing(case_galax_case_32, 'GALAX Revolution - 01 Mid Tower Gaming Case with', atx, 910000).
casing(case_case_case_34, 'ASUS ROG Strix Helios GX601 MID Tower', atx, 6860000).
casing(case_msi_case_38, 'MSI MPG SEKIRA 100R Mid Tower', atx, 1800000).
casing(case_galax_case_39, 'GALAX Mid Tower Gaming Case with 4 ARGB Fans - C', atx, 950000).
casing(case_case_case_44, 'Matrix MTXCC009 MINI TOWER', matx, 340000).
casing(case_zebronics_case_49, 'ZEBRONICS ZEB-877B-CRONUS Mid Tower', atx, 570000).
casing(case_ant_esports_case_50, 'Ant Esports 690 Air Mid- Tower', atx, 1260000).
casing(case_galax_case_52, 'GALAX PC Case Revolution 05 White mid tower', atx, 950000).
casing(case_case_case_54, 'artis G8301 Full Tower', atx, 700000).
casing(case_lian_li_case_55, 'Lian Li Lancool II Mesh - Type C Mid- Tower', atx, 1890000).
casing(case_case_case_56, 'ENTWINO WARRIOR ,Supports 7 RGB Fans,Tempered Gl', atx, 1320000).
casing(case_case_case_59, 'Matrix MTXCC006 MINI TOWER', matx, 340000).
casing(case_case_case_60, 'artis 2220 2.0C Micro ATX', matx, 430000).
casing(case_case_case_71, 'artis G8306 Gaming Full Tower', atx, 740000).
casing(case_galax_case_72, 'GALAX Revolution - 01 Mid Tower Gaming Case with', atx, 910000).
casing(case_case_case_74, 'ASUS ROG Strix Helios GX601 MID Tower', atx, 6860000).
casing(case_msi_case_78, 'MSI MPG SEKIRA 100R Mid Tower', atx, 1800000).
casing(case_galax_case_79, 'GALAX Mid Tower Gaming Case with 4 ARGB Fans - C', atx, 950000).
casing(case_case_case_82, 'FINGERS RGB-WildBox Full ATX', atx, 570000).
casing(case_galax_case_83, 'GALAX Revolution - 01 Mid Tower Gaming Case with', atx, 910000).
casing(case_case_case_84, 'Thermaltake View 51 TG Mid Tower', atx, 3770000).
casing(case_case_case_85, 'Thermaltake Commander C31 MID TOWER', atx, 1880000).
casing(case_case_case_88, 'ASUS TUF Gaming GT501 MID Tower', atx, 2580000).
casing(case_case_case_89, 'Jyothi Rgb for pc Rgb lighting', atx, 380000).
casing(case_case_case_90, 'Thermaltake Core P5 TG Mid Tower', atx, 3670000).
casing(case_msi_mag_vampiric, 'MSI MAG VAMPIRIC 300R Mid Tower', atx, 1430000).
casing(case_ant_esports_ice_5000, 'Ant Esports ICE-5000 RGB Mid Tower', atx, 1380000).
casing(case_case_case_96, 'XPG BATTLECRUISER Super Mid-Tower Mid Tower', atx, 2190000).
casing(case_case_case_97, 'PMW SU1U400A1G233 computer', atx, 680000).
casing(case_ant_esports_ice_100, 'Ant Esports ICE-100 Computer / Gaming Case ll Su', atx, 590000).
casing(case_case_case_99, 'Ant Ice511mt', atx, 610000).
casing(case_galax_case_101, 'GALAX Revolution-05 Mid Tower Gaming Case with 4', atx, 770000).
casing(case_deepcool_case_103, 'Deepcool CG560 Mini Tower', matx, 1110000).

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

% Kebutuhan 3: Intel Arc Creator & Gaming Edition (Budget ~ Rp 12-14 Juta)
rekomendasi(intel_arc_edition, CPU, Mobo, RAM, GPU, PSU, Storage, Casing, TotalHarga, 'Varian Intel Arc A750 8GB dengan akselerasi hardware AV1 encoder & XMX AI cores, budget presisi kisaran Rp 13 Juta') :-
    CPU = cpu_i5_12400f,
    Mobo = mobo_b660m_plus_ddr4,
    RAM = ram_corsair_ddr4_16gb_3200,
    GPU = gpu_intel_arc_a750,
    PSU = psu_psu_650w_bronze,
    Storage = ssd_western_digital_1000gb_nvme,
    Casing = case_deepcool_matrexx_40,
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
    \+ cocok_cpu_mobo(CPU, Mobo).

cek_alasan_mobo_ram(Mobo, RAM, ok) :- cocok_mobo_ram(Mobo, RAM), !.
cek_alasan_mobo_ram(Mobo, RAM, 'Tipe generasi RAM (DDR4 vs DDR5 vs DDR3) tidak sesuai dengan slot motherboard') :-
    \+ cocok_mobo_ram(Mobo, RAM).

cek_alasan_psu(GPU, PSU, ok) :- daya_psu_cukup(GPU, PSU), !.
cek_alasan_psu(GPU, PSU, 'Daya PSU terlalu kecil untuk kebutuhan daya minimum kartu grafis (GPU)') :-
    \+ daya_psu_cukup(GPU, PSU).

cek_alasan_casing(Mobo, Casing, ok) :- cocok_mobo_casing(Mobo, Casing), !.
cek_alasan_casing(Mobo, Casing, 'Ukuran Motherboard ATX terlalu besar untuk Casing Micro-ATX') :-
    \+ cocok_mobo_casing(Mobo, Casing).

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
    write('   Basis Pengetahuan: 946 Komponen Hardware Kaggle Dataset   '), nl,
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
