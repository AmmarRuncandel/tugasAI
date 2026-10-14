% ======================================================================
% SISTEM PAKAR DIAGNOSIS GANGGUAN JARINGAN KOMPUTER (AI WITH PROLOG)
% Berdasarkan Teknik: Logic, Rules, and Representation
% Program Studi: Informatika, Fakultas Teknik, Universitas Siliwangi
% Dosen Pengampu: Dr. Aradea, S.T., M.T.
%
% Anggota Kelompok:
% 1. Muhammad Ammar Luthfi Azzufar (NPM: 247006111118)
% 2. Muhammad Adryan Suryaman       (NPM: 247006111060)
% 3. Muhammad Ziya Pasya Alghifari  (NPM: 247006111111)
% ======================================================================

:- dynamic gejala_ya/1.
:- dynamic gejala_tidak/1.

%
% 1. KNOWLEDGE BASE: FAKTA ONTOLOGI & DETAIL DIAGNOSIS (Slide 23-28, 51)
% Format: detail_diagnosis(Kode, Nama, KategoriLayer, TingkatKeparahan).
%

detail_diagnosis(kabel_lan_rusak, 'Kerusakan Fisik Kabel / Port LAN', physical_layer, tinggi).
detail_diagnosis(wifi_signal_weak, 'Interferensi / Sinyal WiFi Lemah', physical_layer, sedang).
detail_diagnosis(ip_conflict, 'Konflik Alamat IP (IP Address Conflict)', network_layer, tinggi).
detail_diagnosis(gateway_down, 'Kegagalan Default Gateway / Router Lokal', network_layer, tinggi).
detail_diagnosis(dns_failure, 'Kegagalan Resolusi DNS (DNS Server Error)', application_layer, sedang).
detail_diagnosis(isp_outage, 'Gangguan Jalur Utama ISP (Internet Service Provider)', network_layer, tinggi).
detail_diagnosis(driver_adapter_error, 'Masalah Driver Network Adapter', data_link_layer, tinggi).

%
% Fakta Pertanyaan Gejala
%

tanya_gejala(lampu_lan_mati, 'Apakah lampu indikator pada port LAN mati saat kabel dipasang?').
tanya_gejala(status_cable_unplugged, 'Apakah muncul status Network Cable Unplugged di komputer?').
tanya_gejala(sinyal_wifi_satu_bar, 'Apakah indikator sinyal WiFi hanya 1 bar atau sering putus-nyambung?').
tanya_gejala(kecepatan_lambat, 'Apakah kecepatan akses jaringan terasa sangat lambat (high latency)?').
tanya_gejala(muncul_notif_ip_conflict, 'Apakah muncul pesan peringatan IP Address Conflict di layar?').
tanya_gejala(ip_apipa_169, 'Apakah alamat IP komputer berubah menjadi 169.254.x.x (APIPA)?').
tanya_gejala(terhubung_wifi_atau_lan, 'Apakah perangkat sudah terhubung ke WiFi atau LAN tanpa tanda silang merah?').
tanya_gejala(ping_gateway_gagal, 'Apakah hasil test ping ke IP Default Gateway (misal 192.168.1.1) Request Timed Out?').
tanya_gejala(ping_gateway_berhasil, 'Apakah hasil test ping ke IP Default Gateway berhasil (Reply)?').
tanya_gejala(ping_ip_publik_gagal, 'Apakah hasil test ping ke IP publik (8.8.8.8) gagal / Request Timed Out?').
tanya_gejala(ping_ip_publik_berhasil, 'Apakah hasil test ping ke IP publik (8.8.8.8) berhasil (Reply)?').
tanya_gejala(buka_domain_gagal, 'Apakah situs web gagal dibuka saat diketik nama domainnya di browser?').
tanya_gejala(adapter_tanda_seru, 'Apakah terdapat ikon tanda seru kuning pada Network Adapter di Device Manager?').

%
% Fakta Solusi Penanganan
%

solusi(kabel_lan_rusak, 'Ganti kabel UTP/RJ45, periksa crimping konektor, atau pindah ke port switch lain.').
solusi(wifi_signal_weak, 'Dekatkan posisi perangkat ke Access Point atau pindahkan kanal frekuensi WiFi (2.4GHz ke 5GHz).').
solusi(ip_conflict, 'Jalankan perintah ipconfig /release dan ipconfig /renew di CMD, atau atur IP statis yang unik.').
solusi(gateway_down, 'Periksa kondisi daya router utama/mikrotik dan pastikan konfigurasi subnet mask sudah sesuai.').
solusi(dns_failure, 'Ubah konfigurasi DNS ke Public DNS (8.8.8.8 / 8.8.4.4) lalu jalankan ipconfig /flushdns.').
solusi(isp_outage, 'Restart modem ONT/Router ISP. Jika lampu LOS merah menyala, segera hubungi teknisi ISP.').
solusi(driver_adapter_error, 'Lakukan Reinstall atau Rollback driver Network Adapter melalui Device Manager.').

%
% Fakta Daftar Gejala per Diagnosis (Untuk Explanatory Interface & Operasi List - Slide 39-43)
%

syarat_gejala(kabel_lan_rusak, [lampu_lan_mati, status_cable_unplugged]).
syarat_gejala(wifi_signal_weak, [sinyal_wifi_satu_bar, kecepatan_lambat]).
syarat_gejala(ip_conflict, [muncul_notif_ip_conflict, ip_apipa_169]).
syarat_gejala(gateway_down, [terhubung_wifi_atau_lan, ping_gateway_gagal]).
syarat_gejala(dns_failure, [terhubung_wifi_atau_lan, ping_ip_publik_berhasil, buka_domain_gagal]).
syarat_gejala(isp_outage, [terhubung_wifi_atau_lan, ping_gateway_berhasil, ping_ip_publik_gagal]).
syarat_gejala(driver_adapter_error, [adapter_tanda_seru]).

%
% 2. CONTOH PENERAPAN TOPOLOGI RUTE JARINGAN REKURSIF (Adaptasi Slide 44-46)
%

link_langsung(pc_klien, switch_lantai1).
link_langsung(switch_lantai1, router_kampus).
link_langsung(router_kampus, firewall_utama).
link_langsung(firewall_utama, modem_isp).
link_langsung(modem_isp, server_internet).

% Base case: terkoneksi jika ada link langsung
koneksi_jaringan(X, Y) :- link_langsung(X, Y).

% Recursive case: terkoneksi jika ada link dari X ke Z, dan Z terkoneksi ke Y
koneksi_jaringan(X, Y) :- link_langsung(X, Z), koneksi_jaringan(Z, Y).

%
% 3. OPERASI LIST & REKURSI (Adaptasi Slide 39-50)
%

% Mengecek apakah X anggota dari List (Slide 42-43)
anggota(X, [X|_]).
anggota(X, [_|Tail]) :- anggota(X, Tail).

% Mencari elemen yang ada di kedua List (member_both - Slide 47-48)
gejala_irisan(X, List1, List2) :-
    anggota(X, List1),
    anggota(X, List2).

% Mencetak isi list secara rekursif untuk Explanatory Interface (Slide 40-41)
cetak_list_gejala([]).
cetak_list_gejala([Head|Tail]) :-
    tanya_gejala(Head, TeksPertanyaan),
    write(' => TERPENUHI '), write(Head), write(' : '), write(TeksPertanyaan), nl,
    cetak_list_gejala(Tail).

%
% 4. INFERENCE ENGINE: PRODUCTION RULES (Backward Chaining - Slide 11-12, 35)
%

diagnosis(kabel_lan_rusak) :- cek_gejala(lampu_lan_mati), cek_gejala(status_cable_unplugged).
diagnosis(wifi_signal_weak) :- cek_gejala(sinyal_wifi_satu_bar), cek_gejala(kecepatan_lambat).
diagnosis(ip_conflict) :- cek_gejala(muncul_notif_ip_conflict), cek_gejala(ip_apipa_169).
diagnosis(gateway_down) :- cek_gejala(terhubung_wifi_atau_lan), cek_gejala(ping_gateway_gagal).
diagnosis(dns_failure) :- cek_gejala(terhubung_wifi_atau_lan), cek_gejala(ping_ip_publik_berhasil), cek_gejala(buka_domain_gagal).
diagnosis(isp_outage) :- cek_gejala(terhubung_wifi_atau_lan), cek_gejala(ping_gateway_berhasil), cek_gejala(ping_ip_publik_gagal).
diagnosis(driver_adapter_error) :- cek_gejala(adapter_tanda_seru).

%
% 5. KNOWLEDGE ACQUISITION & INTERACTIVE INTERFACE (mode interaktif console)
%

cek_gejala(G) :- gejala_ya(G), !.
cek_gejala(G) :- gejala_tidak(G), !, fail.
cek_gejala(G) :-
    tanya_gejala(G, Pertanyaan),
    write('? '), write(Pertanyaan), write(' (y/t): '),
    read(Jawaban),
    proses_jawaban(G, Jawaban).

proses_jawaban(G, y) :- assertz(gejala_ya(G)).
proses_jawaban(G, t) :- assertz(gejala_tidak(G)), fail.

bersihkan_memori :-
    retractall(gejala_ya(_)),
    retractall(gejala_tidak(_)).

%
% 6. EXPLANATORY INTERFACE & MAIN PROGRAM (Slide 7-9)
%

mulai :-
    bersihkan_memori, nl,
    write('=============================================================='), nl,
    write(' SISTEM PAKAR DIAGNOSIS GANGGUAN JARINGAN KOMPUTER (PROLOG) '), nl,
    write('=============================================================='), nl,
    write('Jawablah pertanyaan dengan mengetik y. atau t. (akhiri titik)'), nl, nl,
    (   diagnosis(Kode)
    ->  detail_diagnosis(Kode, Nama, Layer, Keparahan),
        solusi(Kode, Saran),
        syarat_gejala(Kode, ListGejala), nl,
        write('=============================================================='), nl,
        write(' HASIL PENALARAN SISTEM PAKAR (INFERENCE RESULT)'), nl,
        write('=============================================================='), nl,
        write(' * Kode Diagnosis  : '), write(Kode), nl,
        write(' * Nama Masalah    : '), write(Nama), nl,
        write(' * Kategori Layer  : '), write(Layer), nl,
        write(' * Tingkat Keparahan: '), write(Keparahan), nl,
        write(' * Rekomendasi     : '), write(Saran), nl, nl,
        write(' EXPLANATORY INTERFACE - JUSTIFIKASI JALUR PENALARAN:'), nl,
        write(' Kesimpulan ditarik karena aturan produksi berikut bernilai TRUE:'), nl,
        cetak_list_gejala(ListGejala),
        write('=============================================================='), nl
    ;   nl,
        write('=============================================================='), nl,
        write(' ! Kombinasi gejala tidak cocok dengan aturan di KB.'), nl,
        write('Silakan lakukan pemeriksaan lebih lanjut secara manual.'), nl,
        write('=============================================================='), nl
    ).

%
% 7. MODE BATCH (untuk dipanggil dari Web UI / Node.js)
% Dipanggil via: swipl -g "diagnosa_batch([gejala1,gejala2,...]),halt." pakar_jaringan.pl
%

diagnosa_batch(ListGejala) :-
    bersihkan_memori,
    assertz_semua(ListGejala),
    (   diagnosis(Kode)
    ->  detail_diagnosis(Kode, Nama, Layer, Keparahan),
        solusi(Kode, Saran),
        syarat_gejala(Kode, GejalaTerpenuhi),
        format(atom(Output), 'RESULT:~w|~w|~w|~w|~w|~w~n',
               [Kode, Nama, Layer, Keparahan, Saran, GejalaTerpenuhi]),
        write(Output)
    ;   write('RESULT:tidak_ditemukan|Tidak ada diagnosis yang cocok|unknown|unknown|Lakukan pemeriksaan manual lebih lanjut|[]'), nl
    ).

assertz_semua([]).
assertz_semua([H|T]) :-
    assertz(gejala_ya(H)),
    assertz_semua(T).

%
% 8. QUERY TOPOLOGY (untuk query demonstrasi)
%

tampilkan_semua_rute :-
    write('=== TOPOLOGI JARINGAN KAMPUS ==='), nl,
    forall(
        koneksi_jaringan(X, Y),
        (write(X), write(' --> '), write(Y), nl)
    ).

