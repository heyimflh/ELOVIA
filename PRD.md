# PRD — ELOVIA

> **Product Requirements Document · Platform Web Ekonomi Sirkular**
> *A New Value for Every Resource.*

| Atribut | Isi |
| --- | --- |
| **Nama produk** | **ELOVIA** |
| **Kepanjangan** | **E**kosistem **L**imbah untuk **O**lah, **V**alue, **I**novasi, dan **A**lam |
| **Tagline** | *A New Value for Every Resource.* |
| **Jenis produk** | Platform web responsif (mobile-first) dengan area publik, area pengguna, portal mitra, dan panel admin |
| **Versi dokumen** | 2.2 |
| **Tanggal** | 31 Oktober 2026 |
| **Pemilik produk** | Fakhri |
| **Status** | Draft final untuk review dan persetujuan |
| **Bahasa produk** | Bahasa Indonesia (UI & konten); tagline dan nama fitur memakai Bahasa Inggris sesuai identitas brand |

**Riwayat revisi**

| Versi | Perubahan |
| --- | --- |
| 1.0 | Draf awal |
| 2.0 | Disusun ulang sebagai PRD produk produksi: fokus pada sistem web, peran pengguna, model data, API, keamanan, operasional, dan rilis bertahap |
| 2.1 | Arah visual (UI/UX) diubah menjadi **light mode** bertema *green tech & sustainable environment* (putih, bersih, hijau adem). Bagian lain tidak berubah |
| 2.2 | Nama produk diganti dari ELOVIAH HIJAU (ELOVIA) menjadi **ELOVIA**, beserta kepanjangan dan tagline baru. Isi dokumen lainnya tidak berubah |

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Latar Belakang & Masalah](#2-latar-belakang--masalah)
3. [Tujuan, Non-Tujuan & Metrik](#3-tujuan-non-tujuan--metrik)
4. [Brand & Positioning](#4-brand--positioning)
5. [Pengguna, Peran & Hak Akses](#5-pengguna-peran--hak-akses)
6. [Prinsip Produk & Integritas Data](#6-prinsip-produk--integritas-data)
7. [Konsep Inti: Waste-to-Value Journey](#7-konsep-inti-waste-to-value-journey)
8. [Ruang Lingkup & Fase Rilis](#8-ruang-lingkup--fase-rilis)
9. [Arsitektur Informasi & Navigasi](#9-arsitektur-informasi--navigasi)
10. [Kebutuhan Fungsional per Modul](#10-kebutuhan-fungsional-per-modul)
11. [Aturan Bisnis, Status & Rumus](#11-aturan-bisnis-status--rumus)
12. [Model Data](#12-model-data)
13. [Spesifikasi API](#13-spesifikasi-api)
14. [Design System & UX](#14-design-system--ux)
15. [Motion & Interaksi](#15-motion--interaksi)
16. [Konten & Microcopy](#16-konten--microcopy)
17. [Tech Stack & Arsitektur Teknis](#17-tech-stack--arsitektur-teknis)
18. [Kebutuhan Non-Fungsional](#18-kebutuhan-non-fungsional)
19. [Analitik & Tracking Plan](#19-analitik--tracking-plan)
20. [Strategi QA & Pengujian](#20-strategi-qa--pengujian)
21. [DevOps, Lingkungan & Rilis](#21-devops-lingkungan--rilis)
22. [Roadmap, Tim & Kesiapan Operasional](#22-roadmap-tim--kesiapan-operasional)
23. [Risiko & Mitigasi](#23-risiko--mitigasi)
24. [Keputusan & Pertanyaan Terbuka](#24-keputusan--pertanyaan-terbuka)
25. [Lampiran](#25-lampiran)

---

## 1. Ringkasan Produk

**ELOVIA** adalah platform web ekonomi sirkular yang membantu masyarakat mengubah **sampah terpilah** menjadi **nilai ekonomi**, dari masyarakat untuk masyarakat. ELOVIA menyatukan empat kemampuan dalam satu perjalanan pengguna:

1. **Informasi nilai** — pengguna mengetahui jenis material yang bernilai, cara memilahnya, dan faktor yang menentukan harganya.
2. **Pencocokan penyalur** — pengguna menemukan dan membandingkan bank sampah, pengepul, dan mitra daur ulang yang menerima material tersebut.
3. **Penyaluran** — pengguna mengajukan penjemputan atau pengantaran material dan memantau statusnya sampai selesai.
4. **Pencatatan hasil** — pendapatan dan kontribusi lingkungan dari material yang benar-benar tersalurkan tercatat dan divisualisasikan.

### 1.1 Pembeda utama

ELOVIA bukan sekadar aplikasi bank sampah yang menampilkan saldo, daftar transaksi, dan grafik. Pembedanya adalah **Waste-to-Value Journey**: perjalanan material dari sesuatu yang dianggap tidak berguna menjadi sumber daya yang memiliki nilai ekonomi dan lingkungan, yang divisualisasikan secara konsisten di seluruh produk.

### 1.2 Prinsip nilai

Tidak semua sampah otomatis menghasilkan uang. Nilai bergantung pada jenis material, kondisi, kebersihan, berat, permintaan pembeli, dan biaya pengumpulan. **Transparansi tentang hal ini adalah bagian dari produk**, bukan kelemahan yang disembunyikan.

### 1.3 Fokus pengguna awal

**Masyarakat umum dan rumah tangga.** Bank sampah, pengepul, dan mitra daur ulang berperan sebagai **pihak yang membantu menyalurkan material** dan memiliki portal sendiri untuk mengelola penawaran serta permintaan masuk.

### 1.4 Modul produk

| # | Modul | Fungsi inti |
| --- | --- | --- |
| 1 | **Waste Value Scanner** | Memandu pengguna memilih material, berat, dan kualitas, lalu menghasilkan estimasi nilai dan panduan pemilahan |
| 2 | **Recycle Marketplace** | Direktori dan perbandingan mitra penerima material beserta harga indikatif dan syarat penyerahan |
| 3 | **Pickup & Drop-off** | Pengajuan penjemputan/pengantaran, penjadwalan, dan pelacakan status |
| 4 | **EcoWallet — My Waste Earnings** | Pencatatan nilai, transaksi, dan riwayat penyaluran pengguna |
| 5 | **Impact Garden** | Visualisasi dampak yang tumbuh seiring kontribusi terverifikasi |
| 6 | **Circular Champions** | Kelompok, tantangan, dan peringkat berbasis kontribusi terverifikasi |
| 7 | **Portal Mitra** | Pengelolaan profil, harga, ketersediaan, dan permintaan masuk oleh mitra |
| 8 | **Panel Admin** | Pengelolaan data referensi, mitra, konten, pengguna, dan pemantauan operasional |

---

## 2. Latar Belakang & Masalah

### 2.1 Gambaran masalah

Rumah tangga menghasilkan kardus, botol plastik, kaleng, kertas, dan kaca bekas setiap hari. Material ini sering **tercampur atau langsung dibuang** karena pemiliknya:

- tidak tahu bahwa material tersebut memiliki nilai jual;
- tidak tahu cara memilah dan menyiapkannya;
- tidak tahu ke mana harus menyalurkannya;
- tidak yakin berapa harga yang wajar;
- tidak melihat hasil nyata dari kebiasaan memilah.

### 2.2 Akar masalah

| # | Masalah | Dampak |
| --- | --- | --- |
| M1 | Informasi nilai material tersebar dan sulit dipahami | Material berharga terbuang |
| M2 | Pengguna tidak tahu penyalur yang relevan di sekitarnya | Material menumpuk atau dibuang |
| M3 | Harga dan syarat penyerahan tidak jelas | Rasa tidak percaya, ragu mencoba |
| M4 | Tidak ada pencatatan hasil yang jelas | Motivasi memilah menurun |
| M5 | Dampak lingkungan terasa abstrak | Tidak ada rasa pencapaian |
| M6 | Memilah terasa sebagai usaha sendirian | Kebiasaan tidak bertahan |
| M7 | Mitra kesulitan menjangkau pemasok rumah tangga yang tertib | Pasokan material tidak stabil |

### 2.3 Peluang

Menyatukan edukasi nilai, pencocokan mitra, penyaluran, pencatatan, dan visualisasi dampak dalam satu platform web yang mudah diakses tanpa instalasi, dapat dibagikan lewat tautan, dan nyaman di ponsel maupun desktop.

---

## 3. Tujuan, Non-Tujuan & Metrik

### 3.1 Visi

> Menjadikan setiap rumah tangga mampu melihat, memilah, dan menyalurkan sampahnya sebagai **sumber daya bernilai**.

### 3.2 Tujuan produk

| ID | Tujuan | Indikator keberhasilan |
| --- | --- | --- |
| G1 | Pengguna baru memahami nilai dan cara kerja ELOVIA dengan cepat | ≥ 60% pengunjung baru menyelesaikan estimasi pertama dalam sesi yang sama |
| G2 | Pengguna dapat menyalurkan material end-to-end tanpa bantuan | ≥ 60% pengajuan yang dikonfirmasi mitra berakhir *Selesai* |
| G3 | Mitra menanggapi permintaan tepat waktu | ≥ 80% permintaan ditanggapi mitra ≤ 24 jam |
| G4 | Data harga dan klaim dampak dapat dipercaya | 100% harga bertanggal & bersumber; 0 klaim dampak tanpa faktor perhitungan |
| G5 | Kebiasaan memilah bertahan | ≥ 35% pengguna dengan satu penyaluran selesai melakukan penyaluran kedua dalam 60 hari |
| G6 | Pengalaman cepat, responsif, dan inklusif | Lighthouse ≥ 90 pada halaman publik utama; WCAG 2.2 AA |

> Seluruh target di atas adalah **target awal berbasis hipotesis**; ditinjau ulang setelah baseline pilot terkumpul.

Arah dampak: seluruh fitur dirancang agar mendukung pengurangan sampah, pemanfaatan sumber daya, dan kontribusi iklim yang terukur secara transparan (selaras SDG 12 dan 13).

### 3.3 Non-tujuan (di luar cakupan versi 1)

- Pemrosesan pembayaran di dalam platform (top-up, transfer, penarikan, payment gateway).
- Pengenalan material otomatis dari foto (computer vision).
- Harga real-time dari bursa/pasar.
- Armada logistik milik ELOVIA; penjemputan dilakukan oleh mitra.
- Aplikasi native iOS/Android (web responsif dan PWA dipertimbangkan pada rilis berikutnya).
- Marketplace jual-beli barang bekas antar-pengguna.

### 3.4 Metrik

**North Star Metric:** total **kilogram material yang tersalurkan dan terverifikasi** per bulan.

| Kategori | Metrik | Definisi |
| --- | --- | --- |
| Akuisisi | Pengunjung unik, sumber trafik | Analitik web |
| Aktivasi | Estimation rate | % sesi yang menghasilkan ≥ 1 estimasi |
| Konversi | Basket-to-request rate | % keranjang yang menjadi pengajuan |
| Penyelesaian | Completion rate | % pengajuan terkonfirmasi berstatus *Selesai* |
| Kualitas layanan | Partner response time | Median waktu dari *Diajukan* ke *Dikonfirmasi/Ditolak* |
| Retensi | Repeat rate 60 hari | % pengguna dengan ≥ 2 penyaluran selesai |
| Pasokan | Mitra aktif, cakupan material | Jumlah mitra dengan harga diperbarui ≤ 14 hari |
| Dampak | Total kg tersalurkan, nilai tercatat | Dari transaksi berstatus *Selesai* |
| Komunitas | Kelompok aktif, partisipasi tantangan | Kelompok dengan kontribusi ≥ 1 dalam 30 hari |
| **Guardrail** | Dispute rate, no-show rate, harga basi | Ambang peringatan: dispute > 10%, no-show > 15%, harga basi > 20% |

---

## 4. Brand & Positioning

### 4.1 Nama

**ELOVIA** — *Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam.* Nama merangkum arah produk: limbah diolah menjadi sumber daya yang bernilai (*Value*) melalui inovasi, dengan alam sebagai tujuan akhirnya. Kepanjangan ditampilkan sebagai ekspansi brand di halaman Tentang dan footer. Kata *Value* diterjemahkan secara produk menjadi komitmen **transparansi nilai dan akuntabilitas**.

### 4.2 Kesan brand

| Kesan | Penerjemahan di produk |
| --- | --- |
| **Dekat dengan masyarakat** | Bahasa sehari-hari, contoh material rumah tangga, nada hangat, fokus pada rumah tangga, RT, kelas, dan kampus |
| **Ekonomis** | Angka rupiah selalu menonjol dan terformat lokal; perbandingan harga jelas |
| **Mudah dipahami** | Satu alur utama, status yang jelas, tidak ada jargon tanpa penjelasan |

### 4.3 Positioning

> *A circular economy platform that turns everyday waste into economic opportunity and measurable environmental impact.*

Bukan sekadar tempat mencari pengepul, bukan sekadar dashboard statistik sampah, dan bukan aplikasi yang menjanjikan semua sampah pasti menghasilkan uang.

### 4.4 Tagline & pesan kunci

| Elemen | Teks |
| --- | --- |
| Tagline brand | **A New Value for Every Resource.** |
| Eyebrow | CIRCULAR ECONOMY PLATFORM |
| Kicker | WASTE IS NOT THE END. |
| Headline | **Your waste has another worth.** |
| Subheadline | Discover value in discarded materials. Turn better waste habits into real opportunities. |
| CTA utama | Explore material value ↗ |
| Pendamping (usulan) | *"Sampahmu, rupiahmu."* — keputusan di Bagian 24 |

### 4.5 Nada suara

Hangat dan lugas; jujur (konsisten memakai *estimasi*, *indikatif*, *dalam proses*, *terkonfirmasi*); memotivasi tanpa janji berlebihan (hindari "pasti untung", "dijamin"); informal-sopan.

### 4.6 Aset identitas

Wordmark **ELOVIA** dengan tagline *A New Value for Every Resource.*; simbol gabungan *loop sirkular*, huruf *E*, dan elemen *nilai (koin)* (hindari ikon daun generik); varian utama (di latar terang), varian *reversed* putih (di atas permukaan hijau/foto), dan mono; favicon satu warna; area aman logo = tinggi huruf "E"; ukuran minimum 24 px.

---

## 5. Pengguna, Peran & Hak Akses

### 5.1 Segmentasi

| Segmen | Peran dalam produk | Prioritas |
| --- | --- | --- |
| **Masyarakat umum & rumah tangga** | Pemilik material; pengguna utama | **Utama** |
| **Kelompok komunitas** (kelas, kampus, RT/RW, komunitas) | Pengguna yang berkontribusi bersama | Utama (rilis 2) |
| **Mitra** (bank sampah, pengepul, mitra daur ulang) | Penerima material, pengelola harga & jadwal | Utama (sisi pasokan) |
| **Tim operasional ELOVIA** | Mengelola data, mitra, konten, dan dukungan | Internal |

### 5.2 Persona

**Ibu Rina (38), ibu rumah tangga** — banyak kardus dan botol; takut ditipu soal harga; ingin tahu mana yang bernilai, cara menyiapkannya, dan ke mana menjual. Perangkat: Android, koneksi sedang.

**Dimas (20), mahasiswa** — tinggal di kos, aktif di kegiatan peduli lingkungan; ingin cara seru dan kompetitif untuk konsisten memilah; mencari Impact Garden dan tantangan kelompok.

**Pak Joko (45), pengurus RT** — ingin menggerakkan warga dan menunjukkan manfaat ekonomi serta dampaknya; mencari kelompok, tantangan, dan perbandingan kontribusi antar-RT.

**Bu Sari (42), pengelola bank sampah** — ingin pasokan material terpilah yang tertib dan jadwal penjemputan yang teratur; mencari portal sederhana untuk mengelola harga, jadwal, dan permintaan masuk dari ponsel.

### 5.3 Jobs-to-be-done

| JTBD | Modul |
| --- | --- |
| "Saat punya material bekas, saya ingin tahu apakah bernilai dan berapa." | Waste Value Scanner |
| "Saat siap menyalurkan, saya ingin tahu siapa yang menerima dan syaratnya." | Recycle Marketplace |
| "Saat sudah memilih mitra, saya ingin menyerahkan material dengan mudah dan tahu statusnya." | Pickup & Drop-off |
| "Saat transaksi selesai, saya ingin melihat hasilnya dengan jelas." | EcoWallet |
| "Saat terus memilah, saya ingin merasakan dampaknya." | Impact Garden |
| "Saat ingin konsisten, saya ingin dorongan komunitas." | Circular Champions |
| "Sebagai mitra, saya ingin menerima permintaan yang jelas dan terjadwal." | Portal Mitra |

### 5.4 Peran sistem

| Peran | Deskripsi |
| --- | --- |
| **Tamu** | Pengunjung tanpa akun |
| **Pengguna** | Akun terdaftar |
| **Admin Kelompok** | Pengguna yang mengelola satu kelompok |
| **Staf Mitra** | Anggota tim mitra (Pemilik atau Staf) |
| **Admin Operasional** | Tim ELOVIA: data referensi, mitra, konten, moderasi |
| **Super Admin** | Pengelolaan konfigurasi sistem, peran, dan audit |

### 5.5 Matriks hak akses

| Kemampuan | Tamu | Pengguna | Admin Kelompok | Staf Mitra | Admin Ops | Super Admin |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| Lihat landing, edukasi, metodologi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gunakan Scanner & lihat estimasi | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lihat direktori & bandingkan mitra | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Simpan keranjang permanen | ❌ (lokal) | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ajukan penyaluran | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Lihat EcoWallet & Impact Garden sendiri | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Buat/kelola kelompok | ❌ | ✅ (buat) | ✅ (kelola) | ❌ | ✅ | ✅ |
| Kelola profil, harga, jadwal mitra | ❌ | ❌ | ❌ | ✅ (milik sendiri) | ✅ | ✅ |
| Tanggapi & timbang permintaan | ❌ | ❌ | ❌ | ✅ (milik sendiri) | ✅ (bantuan) | ✅ |
| Kelola material, harga acuan, faktor emisi | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Setujui/tangguhkan mitra | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Moderasi konten & pengguna | ❌ | ❌ | ❌ (kelompok sendiri) | ❌ | ✅ | ✅ |
| Kelola peran & konfigurasi sistem | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Lihat audit log | ❌ | ❌ | ❌ | ❌ | ✅ (terbatas) | ✅ |

**Aturan akses data:** setiap sumber daya terikat pemilik (pengguna/mitra/kelompok); pemeriksaan otorisasi dilakukan **di sisi server** pada setiap permintaan, bukan hanya di UI.

---

## 6. Prinsip Produk & Integritas Data

| # | Prinsip | Penerapan |
| --- | --- | --- |
| P1 | **Transparan soal nilai** | Estimasi berupa rentang; rumus, asumsi, dan faktor penentu harga dapat dibuka (*Bagaimana dihitung?*) |
| P2 | **Tiga status nilai yang selalu dibedakan** | *Estimasi*, *Dalam proses*, *Terkonfirmasi* — tidak pernah dijumlahkan menjadi satu "saldo" |
| P3 | **Harga indikatif ≠ penawaran terkonfirmasi** | Harga mitra berlabel *Indikatif* sampai mitra mengonfirmasi pada permintaan tertentu |
| P4 | **Data harga bertanggal dan bersumber** | Setiap harga menampilkan waktu pembaruan; harga basi diberi peringatan atau disembunyikan |
| P5 | **Dampak lingkungan berdasar** | Angka emisi hanya tampil bila faktor perhitungan beserta sumbernya tersedia; selalu berlabel *estimasi* |
| P6 | **Tidak ada klaim yang melampaui kemampuan sistem** | Tidak mengklaim pengenalan gambar otomatis, harga real-time, atau jaminan pendapatan |
| P7 | **Kontribusi dihitung dari kejadian terverifikasi** | Impact Garden, wallet, dan peringkat hanya bertambah pada transaksi *Selesai* |
| P8 | **Satu alur utama yang jelas** | Kenali → ketahui nilai → temukan penyalur → salurkan → catat → pahami dampak |
| P9 | **Privasi sejak desain** | Data pribadi minimal, alamat dilindungi, persetujuan jelas |
| P10 | **Mobile-first dan inklusif** | Responsif, aksesibel, hemat data |
| P11 | **Visual yang bercerita** | Journey dan Garden menjadi identitas produk, bukan hiasan |

---

## 7. Konsep Inti: Waste-to-Value Journey

### 7.1 Empat tahap

| Tahap | Nama | Makna | Modul |
| --- | --- | --- | --- |
| **01** | **Waste** | Material bekas yang dimiliki masyarakat | Material Discovery |
| **02** | **Identify & Value** | Identifikasi material, berat, kualitas, dan estimasi harga | Waste Value Scanner |
| **03** | **Connect & Exchange** | Menghubungkan material dengan pembeli atau mitra pengelolaan | Recycle Marketplace, Pickup & Drop-off |
| **04** | **Value Created** | Pencatatan pendapatan, material tersalurkan, dan estimasi dampak | EcoWallet, Impact Garden, Circular Champions |

Perjalanan ini menjadi **identitas visual dan struktur navigasi** seluruh produk.

### 7.2 Alur pengguna

```
Kenali material → Ketahui nilainya → Temukan penyalur → Catat pendapatan → Pahami dampaknya
   (Scanner)        (Scanner)         (Marketplace +       (EcoWallet)       (Impact Garden +
                                       Pickup & Drop-off)                      Champions)
```

### 7.3 Core loop sistem

```
┌───────────────────┐ tambah ┌──────────────────┐ ajukan ┌───────────────────────┐
│ Waste Value Scanner│───────▶│ Keranjang Material│───────▶│ Pickup & Drop-off      │
│   (ESTIMASI)       │        │   (ESTIMASI)      │        │ (DALAM PROSES)         │
└───────────────────┘        └──────────────────┘        └───────────┬───────────┘
          ▲                                                           │ mitra timbang →
          │                                                           │ pengguna konfirmasi / otomatis
┌───────────────────┐ kontribusi ┌──────────────────┐  catat ┌───────▼───────────┐
│ Circular Champions │◀───────────│   Impact Garden   │◀───────│     EcoWallet      │
│ (terverifikasi)    │            │ (tumbuh saat      │        │ (TERKONFIRMASI)    │
└───────────────────┘            │  transaksi Selesai)│        └───────────────────┘
                                 └──────────────────┘
```

**Aturan emas:** Impact Garden, EcoWallet (sisi terkonfirmasi), dan Circular Champions hanya bertambah ketika transaksi berstatus **Selesai**. Estimasi tidak pernah menambah dampak.

### 7.4 Faktor penentu nilai

Jenis material · kondisi · kebersihan · berat · permintaan pembeli · biaya pengumpulan. Keenam faktor ini ditampilkan melalui komponen *Value Factors* di Scanner, Marketplace, dan halaman Metodologi.

---

## 8. Ruang Lingkup & Fase Rilis

### 8.1 Definisi prioritas

| Prioritas | Arti | Rilis |
| --- | --- | --- |
| **P0** | Wajib ada agar core loop berjalan end-to-end | **R1 — MVP** |
| **P1** | Meningkatkan retensi, kualitas, dan efisiensi operasional | **R2** |
| **P2** | Perluasan dan optimasi | **R3** |

> **Dependensi penting:** Impact Garden dan EcoWallet hanya bermakna jika ada transaksi *Selesai*. Karena itu versi minimal Penyaluran, Portal Mitra, dan pencatatan transaksi termasuk **P0**.

### 8.2 Matriks cakupan

| Area | Fitur | Prioritas |
| --- | --- | --- |
| Publik | Landing 7 section, Material Discovery, Metodologi, Edukasi dasar, halaman legal | **P0** |
| Akun | Registrasi/login (magic link, Google), profil, alamat tersimpan | **P0** |
| Scanner | Pilih material, berat, kualitas, estimasi rentang, panduan pemilahan | **P0** |
| Keranjang | Keranjang tamu (lokal) dan akun (server), penggabungan saat login | **P0** |
| Marketplace | Direktori mitra, filter, perbandingan, syarat penyerahan, harga indikatif bertanggal | **P0** |
| Penyaluran (dasar) | Jemput/antar, jadwal, ringkasan, status, pembatalan, timbang & konfirmasi | **P0** |
| Portal Mitra (dasar) | Profil, harga, jadwal, tanggapi permintaan, input timbangan | **P0** |
| EcoWallet (dasar) | Ringkasan tiga status, riwayat, detail transaksi | **P0** |
| Impact Garden | Taman, tahap, progress ring, pencapaian, emisi bersyarat | **P0** |
| Panel Admin (dasar) | Material, harga acuan, mitra, faktor emisi, pencapaian | **P0** |
| Notifikasi | In-app + email transaksional | **P0** |
| EcoWallet (lanjutan) | Grafik mingguan/bulanan, filter lanjutan, ekspor CSV | P1 |
| Circular Champions | Kelompok, tantangan, leaderboard, lencana | P1 |
| Penyaluran (lanjutan) | Kapasitas slot, ubah jadwal, keberatan (dispute), lampiran foto | P1 |
| Peta interaktif | Peta penuh dengan pin dan pencarian area | P1 |
| Portal Mitra (lanjutan) | Analitik mitra, multi-staf, ekspor | P1 |
| Panel Admin (lanjutan) | Laporan, moderasi, CMS konten edukasi | P1 |
| Notifikasi WhatsApp, PWA, i18n (EN) | — | P2 |
| Integrasi pembayaran | Evaluasi setelah pilot | P2 |
| Klasifikasi gambar material | Eksplorasi; tidak diklaim sebelum akurasi teruji | P2 |
| API publik/integrasi mitra | — | P2 |

### 8.3 Kriteria siap peluncuran (pilot)

- Seluruh P0 lolos kriteria penerimaan dan uji UAT.
- Wilayah pilot ditetapkan dan **≥ 5 mitra aktif** ter-onboarding, dengan setiap kategori material memiliki **≥ 2 mitra** *(target awal; konfirmasi di Q-01)*.
- Seluruh harga acuan dan harga mitra bersumber dan bertanggal; tidak ada data uji tersisa di produksi.
- Dokumen legal (Kebijakan Privasi, Syarat & Ketentuan) ditinjau dan dipublikasikan.
- Pemantauan, backup, dan prosedur insiden aktif.
- Prosedur dukungan pengguna dan mitra tersedia.

---

## 9. Arsitektur Informasi & Navigasi

### 9.1 Sitemap

```
PUBLIK
/                         Beranda (Landing)
/pindai                   Waste Value Scanner
/material                 Katalog material
/material/[slug]          Detail material
/pasar                    Recycle Marketplace (direktori)
/pasar/[slug]             Profil mitra
/edukasi                  Pusat edukasi pemilahan
/edukasi/[slug]           Artikel/panduan
/metodologi               Metodologi & transparansi
/tentang                  Tentang ELOVIA & kredit
/bantuan                  Pusat bantuan (FAQ)
/kebijakan-privasi        Kebijakan privasi
/syarat-ketentuan         Syarat & ketentuan

AKUN (login)
/masuk                    Login / registrasi
/akun                     Profil & pengaturan
/akun/alamat              Alamat tersimpan
/keranjang                Keranjang material
/salur                    Daftar & pengajuan penyaluran
/salur/baru               Wizard pengajuan
/salur/[id]               Detail & status
/dompet                   EcoWallet
/dompet/[id]              Detail transaksi
/taman                    Impact Garden
/komunitas                Circular Champions (R2)
/komunitas/[id]           Detail kelompok
/notifikasi               Pusat notifikasi

PORTAL MITRA
/mitra                    Dashboard mitra
/mitra/permintaan         Permintaan masuk
/mitra/permintaan/[id]    Detail & aksi
/mitra/harga              Kelola harga
/mitra/jadwal             Ketersediaan & titik antar
/mitra/profil             Profil & syarat

ADMIN
/admin                    Dashboard operasional
/admin/material           Material & kategori
/admin/harga-acuan        Harga acuan
/admin/faktor-emisi       Faktor emisi
/admin/mitra              Onboarding & status mitra
/admin/permintaan         Pemantauan permintaan
/admin/pengguna           Pengguna
/admin/komunitas          Kelompok, tantangan, pencapaian
/admin/konten             Konten edukasi (R2)
/admin/laporan            Laporan
/admin/audit              Audit log
/admin/pengaturan         Konfigurasi sistem
```

### 9.2 Navigasi

**Desktop (≥ 1024px):** Logo · Pindai Nilai · Marketplace · Edukasi · EcoWallet · Impact Garden · Komunitas · Keranjang (badge) · Notifikasi · Akun/Masuk.

**Mobile (< 1024px):** top bar ringkas (logo, keranjang, notifikasi) + **bottom navigation** 5 item (Beranda, Pindai, Pasar, Dompet, Taman); menu lain dalam panel *More*.

**Global:** *skip link*; **Journey Progress Indicator** (4 tahap) pada halaman fitur; breadcrumb pada halaman detail.

### 9.3 Pemetaan halaman ke tahap Journey

| Halaman | Tahap |
| --- | --- |
| Beranda, Material | 01 Waste |
| Pindai, Keranjang | 02 Identify & Value |
| Pasar, Salur | 03 Connect & Exchange |
| Dompet, Taman, Komunitas | 04 Value Created |

---

## 10. Kebutuhan Fungsional per Modul

**Konvensi:** ID `FR-<MODUL>-<NN>`; prioritas P0/P1/P2; kriteria penerimaan (AC) dalam format *Given / When / Then*.

### 10.1 Platform & Global (GLB)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-GLB-01 | Format uang `Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'})`; tanggal `id-ID`; zona waktu WIB (Asia/Jakarta) sebagai default; penyimpanan waktu dalam UTC. | P0 |
| FR-GLB-02 | Komponen **ValueStatus** (Estimasi / Dalam proses / Terkonfirmasi) dipakai konsisten di seluruh produk (Bagian 11.1). | P0 |
| FR-GLB-03 | Halaman 404, 500, dan *maintenance* bergaya brand; *error boundary* per rute. | P0 |
| FR-GLB-04 | Banner persetujuan cookie/analitik sesuai kebijakan privasi; analitik hanya aktif setelah persetujuan (bila diwajibkan). | P0 |
| FR-GLB-05 | Setiap halaman memiliki metadata (title, description, Open Graph) unik; `sitemap.xml` dan `robots.txt` dibuat otomatis. | P0 |
| FR-GLB-06 | Toast dan pesan error konsisten; semua aksi tulis memiliki umpan balik (sukses/gagal) dan mencegah kirim ganda. | P0 |
| FR-GLB-07 | Semua halaman fungsional berfungsi pada koneksi lambat dengan *skeleton* dan penanganan *offline* yang jelas. | P0 |
| FR-GLB-08 | Feature flag untuk merilis modul bertahap (mis. Komunitas, peta interaktif). | P1 |
| FR-GLB-09 | Struktur teks terpusat agar toggle bahasa (EN) dapat ditambahkan. | P2 |

### 10.2 Landing Page / Beranda (LND)

**Tujuan:** pengunjung memahami masalah, solusi, dan manfaat ELOVIA dalam hitungan menit dan terdorong memulai alur inti.

| # | Section | Isi & tujuan |
| --- | --- | --- |
| 1 | **Hero — Waste Into Worth** | Headline kuat, visual material artistik, CTA eksplorasi |
| 2 | **Material Discovery** | Empat kartu: Paper & Cardboard, Plastic, Metal, Glass; CTA `Check material value` |
| 3 | **How It Works** | Journey 4 tahap yang bergerak mengikuti scroll + blok *Mengapa tidak semua sampah bernilai?* |
| 4 | **Marketplace Preview** | Tiga mitra nyata (terdaftar, aktif), kategori material, harga acuan bertanggal |
| 5 | **Impact Garden** | Pratinjau taman interaktif ringan |
| 6 | **Community Challenge** | Tantangan aktif, progres komunitas, pratinjau leaderboard |
| 7 | **Closing CTA** | Ajakan mengubah kebiasaan membuang menjadi kebiasaan menciptakan nilai |

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-LND-01 | Hero memuat eyebrow, kicker, headline, subheadline, dan CTA primer yang terlihat tanpa scroll pada 360×640 dan 1366×768. | P0 |
| FR-LND-02 | Gambar LCP hero memakai prioritas muat; LCP ≤ 2,5 dtk pada 4G mobile. | P0 |
| FR-LND-03 | Animasi masuk hero bertahap (teks → visual → CTA); nonaktif pada `prefers-reduced-motion`. | P0 |
| FR-LND-04 | Empat kartu kategori; hover/fokus menampilkan pratinjau sub-jenis dan kisaran harga acuan (bertanggal). | P0 |
| FR-LND-05 | Kartu kategori mengarah ke `/pindai?kategori=<id>` dengan kategori terpilih. | P0 |
| FR-LND-06 | Journey 4 tahap dengan indikator progres terhubung ke posisi scroll; fallback statis untuk reduced-motion. | P0 |
| FR-LND-07 | Blok *Value Factors* memuat 6 faktor dan tautan ke `/metodologi`. | P0 |
| FR-LND-08 | Marketplace Preview mengambil data mitra aktif dari server (ISR); bila < 3 mitra, tampilkan jumlah yang tersedia tanpa placeholder. | P0 |
| FR-LND-09 | Pratinjau Impact Garden interaktif ringan (animasi pertumbuhan contoh) dengan penjelasan bahwa ini ilustrasi, plus CTA ke `/taman`. | P0 |
| FR-LND-10 | Section Community Challenge menampilkan tantangan aktif nyata bila tersedia; bila belum, tampilkan ajakan bergabung/daftar notifikasi. | P1 |
| FR-LND-11 | Closing CTA memuat satu aksi utama ke `/pindai` dan satu aksi sekunder ke `/metodologi`. | P0 |
| FR-LND-12 | Footer: navigasi, kepanjangan ELOVIA, tautan legal, kontak/bantuan, kredit & lisensi aset. | P0 |

**AC-LND-05:** *Given* pengunjung di Material Discovery, *When* menekan `Check material value` pada kartu Plastic, *Then* `/pindai` terbuka dengan kategori Plastic terpilih.

### 10.3 Autentikasi & Akun (AUTH)

**Keputusan metode:** tanpa kata sandi — **magic link email** dan **Google OAuth**; OTP WhatsApp/SMS pada P2.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-AUTH-01 | Registrasi/login via magic link email (kedaluwarsa 15 menit, sekali pakai). | P0 |
| FR-AUTH-02 | Login via Google OAuth. | P0 |
| FR-AUTH-03 | Pada registrasi pertama, pengguna menyetujui Syarat & Ketentuan dan Kebijakan Privasi (rekam versi & waktu persetujuan). | P0 |
| FR-AUTH-04 | Profil: nama tampilan (dapat berupa nama panggilan), foto opsional, nomor telepon (untuk koordinasi penyaluran), preferensi notifikasi. | P0 |
| FR-AUTH-05 | Alamat tersimpan: label, alamat lengkap, patokan, koordinat (dari pin peta/geocoding), catatan akses; maks 5 alamat. | P0 |
| FR-AUTH-06 | Sesi aman (cookie `HttpOnly`, `Secure`, `SameSite=Lax`), masa berlaku dan perpanjangan sesi, logout dari semua perangkat. | P0 |
| FR-AUTH-07 | Saat login, keranjang tamu (lokal) digabung ke keranjang akun tanpa duplikasi. | P0 |
| FR-AUTH-08 | Hapus akun: permintaan penghapusan; data transaksi dianonimkan sesuai kebijakan retensi (Bagian 18.5). | P0 |
| FR-AUTH-09 | Unduh data pribadi pengguna (ekspor JSON/CSV). | P1 |
| FR-AUTH-10 | Pembatasan laju (rate limit) pada permintaan magic link dan percobaan login. | P0 |

### 10.4 Waste Value Scanner (SCN) — *"Kenali sampah, ketahui potensinya."*

**Tujuan:** memandu pengguna memilih material, berat, dan kualitas, lalu menampilkan **estimasi nilai** beserta panduan pemilahan dan asumsi yang transparan.

**Aturan kejujuran sistem:** "pemindaian" adalah **animasi visual yang menggambarkan pemeriksaan data acuan**. Identifikasi material dilakukan pengguna secara manual. Antarmuka **tidak boleh** menyatakan atau menyiratkan bahwa sistem mengenali gambar secara otomatis.

**Alur**

1. **Pilih material** — kategori → sub-jenis, melalui kartu besar bergambar.
2. **Isi detail** — berat (kg) dan kualitas (Bersih-kering / Cukup / Kotor-basah).
3. **Pemeriksaan** — animasi 1,5–2 dtk (dapat dilewati).
4. **Hasil** — label jenis & kualitas; rentang estimasi muncul bertahap; panduan pemilahan; faktor penentu nilai; *Bagaimana dihitung?*
5. **Aksi lanjut** — `Tambah ke Keranjang`, `Lihat mitra yang menerima`, `Cek material lain`.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-SCN-01 | Pilih kategori dan sub-jenis dari katalog material (data server); mendukung prasetel via query `?kategori=&material=`. | P0 |
| FR-SCN-02 | Input berat: desimal (koma/titik), min **0,1 kg**, maks **500 kg**; *stepper* dan *quick chips* (1, 2, 5, 10 kg). | P0 |
| FR-SCN-03 | Selektor kualitas 3 tingkat dengan penjelasan singkat dan pengaruhnya pada nilai. | P0 |
| FR-SCN-04 | Animasi pemeriksaan dengan status teks `aria-live`; dapat dilewati; versi statis pada reduced-motion. | P0 |
| FR-SCN-05 | Hasil menampilkan **rentang estimasi** (min–maks), prefiks "≈", gaya status *Estimasi*, dan tanggal pembaruan harga acuan. | P0 |
| FR-SCN-06 | Angka muncul bertahap berurutan: label → berat → faktor kualitas → rentang nilai. | P0 |
| FR-SCN-07 | Panel **Panduan Pemilahan** (Lakukan/Hindari) per kategori (Lampiran C), bersumber dari konten terkelola. | P0 |
| FR-SCN-08 | Disclosure **Bagaimana dihitung?**: rumus, harga acuan beserta sumber & tanggal, faktor kualitas, dan catatan bahwa hasil adalah estimasi. | P0 |
| FR-SCN-09 | `Tambah ke Keranjang` menyimpan item (tamu: lokal; pengguna: server) dan memperbarui badge. | P0 |
| FR-SCN-10 | `Lihat mitra yang menerima` membuka `/pasar` dengan filter material terpilih. | P0 |
| FR-SCN-11 | Validasi input dengan pesan jelas; tombol aksi nonaktif saat input tidak valid. | P0 |
| FR-SCN-12 | Perhitungan memakai fungsi bersama (shared) dan divalidasi ulang di server ketika disimpan/diajukan. | P0 |
| FR-SCN-13 | Komponen *Value Factors* pada hasil. | P0 |
| FR-SCN-14 | Jika nilai estimasi sangat rendah, tampilkan pesan jujur dan manfaat penyaluran yang benar. | P0 |
| FR-SCN-15 | Edit berat/kualitas pada hasil tanpa memulai ulang. | P1 |
| FR-SCN-16 | Pratinjau foto lokal (opsional, tidak diunggah, tidak dianalisis) dengan label jelas. | P1 |
| FR-SCN-17 | Bila harga acuan material lebih lama dari ambang kebasian, hasil tetap tampil dengan peringatan *Harga acuan belum diperbarui*. | P0 |

**AC-SCN-05:** *Given* kardus, 5 kg, kualitas Cukup, *When* pengguna menjalankan pemeriksaan, *Then* sistem menampilkan rentang bergaya *Estimasi*, tautan *Bagaimana dihitung?*, dan tanggal pembaruan harga acuan.

**AC-SCN-16:** *Given* pengguna memilih foto, *When* pratinjau tampil, *Then* tidak ada teks yang menyatakan sistem "mengenali/mendeteksi" gambar, dan foto tidak dikirim ke server.

### 10.5 Keranjang Material (BSK)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-BSK-01 | Menampilkan item (material, berat, kualitas, estimasi rentang) dengan status *Estimasi*. | P0 |
| FR-BSK-02 | Ubah berat/kualitas, hapus item, kosongkan keranjang. | P0 |
| FR-BSK-03 | Total estimasi gabungan (rentang) dan total berat. | P0 |
| FR-BSK-04 | `Pilih mitra penerima` → `/pasar` berkonteks keranjang; `Ajukan penyaluran` → `/salur/baru` (wajib login). | P0 |
| FR-BSK-05 | Keranjang tamu tersimpan lokal; keranjang akun tersimpan di server dan tersinkron lintas perangkat. | P0 |
| FR-BSK-06 | Keadaan kosong dengan ajakan ke Scanner. | P0 |
| FR-BSK-07 | Peringatan bila item di keranjang tidak diterima oleh mitra terpilih. | P0 |

Tampilan: *drawer* (desktop: panel kanan; mobile: bottom sheet) dan halaman penuh `/keranjang`.

### 10.6 Recycle Marketplace (MKT) — *"Temukan nilai di balik setiap material."*

**Peran:** direktori dan pencocokan mitra. **Transaksi finansial pada versi 1 terjadi langsung antara pengguna dan mitra saat serah terima**; ELOVIA mencatat hasilnya.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-MKT-01 | Kartu mitra: nama, tipe, jarak dari lokasi pengguna/area, material diterima, harga indikatif per kg (bertanggal), metode (jemput/antar), jam operasional, skor kelengkapan profil. | P0 |
| FR-MKT-02 | **Filter:** kategori material, sub-jenis, kondisi diterima, tipe mitra, metode penyerahan, area layanan. **Urutkan:** harga tertinggi, terdekat, terbaru diperbarui. | P0 |
| FR-MKT-03 | **Mode per-material:** pilih material → mitra penerima + harga per kg berdampingan. | P0 |
| FR-MKT-04 | **Perbandingan** hingga 3 mitra: harga per material, syarat, metode, biaya, jam, tanggal pembaruan harga. | P0 |
| FR-MKT-05 | `Lihat syarat penyerahan`: kondisi material, pengemasan, berat minimum, jam, biaya jemput, area layanan. | P0 |
| FR-MKT-06 | Label harga: **Indikatif** (profil mitra) vs **Terkonfirmasi mitra** (pada permintaan tertentu setelah dikonfirmasi). | P0 |
| FR-MKT-07 | Harga yang lebih lama dari ambang kebasian ditandai *Perlu diperbarui*; lebih lama dari ambang maksimum disembunyikan (konfigurasi, Bagian 11.5). | P0 |
| FR-MKT-08 | Dengan keranjang aktif, tampilkan **estimasi nilai keranjang per mitra** dan sorot yang tertinggi. | P0 |
| FR-MKT-09 | Profil mitra publik: deskripsi, foto, lokasi, jam, syarat, material & harga, metrik layanan (mis. waktu respons median) bila tersedia. | P0 |
| FR-MKT-10 | Pencarian lokasi: pengguna memasukkan alamat/pin untuk menghitung jarak dan menyaring area layanan. | P0 |
| FR-MKT-11 | Peta interaktif dengan pin mitra, tersinkron dengan daftar. | P1 |
| FR-MKT-12 | Filter tersimpan di URL agar dapat dibagikan. | P0 |
| FR-MKT-13 | Keadaan kosong dengan saran melonggarkan filter atau memperluas area. | P0 |
| FR-MKT-14 | Tombol `Pilih mitra ini` meneruskan mitra ke wizard penyaluran. | P0 |
| FR-MKT-15 | Mitra berstatus *ditangguhkan/nonaktif* tidak tampil dan tidak dapat dipilih. | P0 |

**AC-MKT-03:** *Given* pengguna memilih Botol PET, *When* mode per-material aktif, *Then* hanya mitra aktif yang menerima PET dan memiliki harga tidak basi yang tampil, berlabel *Indikatif* dengan tanggal pembaruan.

### 10.7 Pickup & Drop-off (PKP) — *"Penyaluran material tanpa kebingungan."*

**Wizard pengajuan (5 langkah)**

1. **Metode** — Jemput / Antar.
2. **Mitra & lokasi** — mitra (dari Marketplace) dan alamat (jemput) atau titik antar.
3. **Jadwal** — kalender + slot sesuai ketersediaan mitra.
4. **Rincian** — material, berat, kualitas, catatan, (P1) foto lampiran.
5. **Ringkasan & ajukan** — rentang estimasi, biaya, syarat mitra, persetujuan.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-PKP-01 | Pilih metode jemput atau antar; opsi tidak tersedia dinonaktifkan dengan alasan. | P0 |
| FR-PKP-02 | Validasi area layanan mitra terhadap alamat jemput; pesan jelas bila di luar area. | P0 |
| FR-PKP-03 | Kalender hanya menampilkan tanggal dan slot yang tersedia (jendela waktu per hari, lead time minimum, maks. 14 hari ke depan). | P0 |
| FR-PKP-04 | Validasi syarat mitra: berat minimum jemput, kondisi material, jenis yang diterima. | P0 |
| FR-PKP-05 | Ringkasan menampilkan material, berat, rentang estimasi, biaya jemput (bila ada), syarat, dan checklist kesiapan material. | P0 |
| FR-PKP-06 | Pengajuan dikirim dengan **idempotency key** untuk mencegah duplikasi; membuat `HandoverRequest` berstatus **Diajukan**. | P0 |
| FR-PKP-07 | **Timeline status:** Diajukan → Dikonfirmasi → Diterima → Selesai, dengan waktu dan pelaku tiap langkah. | P0 |
| FR-PKP-08 | Privasi alamat: mitra melihat **area perkiraan** saat *Diajukan* dan **alamat lengkap hanya setelah *Dikonfirmasi***. | P0 |
| FR-PKP-09 | Pada *Dikonfirmasi*, tampilkan **harga terkonfirmasi mitra** dan jelaskan selisih terhadap estimasi. | P0 |
| FR-PKP-10 | Pada *Diterima*, tampilkan **berat akhir** dan **kualitas akhir** hasil timbang mitra, serta nilai akhir. Pengguna dapat `Konfirmasi` atau (P1) `Ajukan keberatan`. | P0 |
| FR-PKP-11 | **Auto-konfirmasi** menjadi *Selesai* setelah jendela konfirmasi (default 48 jam) tanpa keberatan. | P0 |
| FR-PKP-12 | Pengguna dapat membatalkan sebelum *Dikonfirmasi*, dan setelahnya hingga batas waktu sebelum jadwal (default 2 jam), dengan alasan. | P0 |
| FR-PKP-13 | Permintaan yang tidak ditanggapi mitra melewati batas SLA (default 24 jam) menjadi **Kedaluwarsa**; pengguna diberi opsi mengajukan ke mitra lain. | P0 |
| FR-PKP-14 | Mitra dapat **Menolak** dengan alasan terstandar (material tidak sesuai, di luar area, jadwal penuh, lainnya). | P0 |
| FR-PKP-15 | Pelacakan status memperbarui otomatis (polling berkala) dan memicu notifikasi. | P0 |
| FR-PKP-16 | Lampiran foto material (maks 3 foto, JPG/PNG/WebP ≤ 5 MB; data lokasi EXIF dihapus; penyimpanan privat). | P1 |
| FR-PKP-17 | Ubah jadwal dengan persetujuan mitra. | P1 |
| FR-PKP-18 | Keberatan (dispute) atas timbangan/kualitas dengan alur penyelesaian oleh Admin Ops. | P1 |
| FR-PKP-19 | Kapasitas slot (batas permintaan per slot/hari) dikelola mitra. | P1 |
| FR-PKP-20 | Tanda *no-show* (pengguna/mitra) dengan dampak pada metrik layanan. | P1 |

**State machine:** Bagian 11.2.

**AC-PKP-11:** *Given* permintaan berstatus *Diterima* dan pengguna tidak merespons 48 jam, *When* batas waktu tercapai, *Then* status menjadi *Selesai*, transaksi *Terkonfirmasi* tercatat, dan Impact Garden diperbarui.

### 10.8 Portal Mitra (PTM)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-PTM-01 | Onboarding mitra: formulir pendaftaran (profil usaha, kontak, area layanan, material, dokumen verifikasi) → status **Menunggu verifikasi** → disetujui/ditolak Admin Ops. | P0 |
| FR-PTM-02 | Dashboard: permintaan baru, terjadwal, menunggu timbang, ringkasan kinerja (volume, waktu respons). | P0 |
| FR-PTM-03 | Kelola profil publik: nama, deskripsi, logo/foto, alamat, koordinat, jam operasional, syarat penyerahan, biaya. | P0 |
| FR-PTM-04 | Kelola **harga per material** (rentang indikatif, kondisi diterima) dengan stempel waktu otomatis; pengingat bila mendekati kebasian. | P0 |
| FR-PTM-05 | Kelola ketersediaan: hari/jam jemput, area layanan, titik antar, lead time, libur. | P0 |
| FR-PTM-06 | Daftar permintaan masuk dengan aksi **Konfirmasi** (harga & jadwal), **Tolak** (alasan), dan lihat detail (alamat lengkap setelah konfirmasi). | P0 |
| FR-PTM-07 | **Input timbangan**: berat akhir dan kualitas per material, harga final per kg, biaya; sistem menghitung nilai akhir dan meminta konfirmasi pengguna. | P0 |
| FR-PTM-08 | Riwayat permintaan & transaksi mitra dengan filter dan ekspor CSV. | P1 |
| FR-PTM-09 | Multi-staf dengan peran Pemilik/Staf. | P1 |
| FR-PTM-10 | Analitik mitra: volume per material, waktu respons, tingkat penyelesaian. | P1 |
| FR-PTM-11 | Notifikasi permintaan baru via email (P0) dan WhatsApp (P2). | P0/P2 |
| FR-PTM-12 | Seluruh aksi mitra tercatat pada audit log. | P0 |

### 10.9 EcoWallet — My Waste Earnings (WLT) — *"Lacak nilai ekonomi yang dihasilkan."*

**Penting:** EcoWallet adalah **catatan (ledger) pendapatan dan penyaluran**, bukan dompet pembayaran. Tidak ada top-up, transfer, atau penarikan di dalam platform.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-WLT-01 | Menampilkan **tiga angka terpisah**: *Estimasi* (keranjang), *Dalam proses* (pengajuan aktif), *Terkonfirmasi* (transaksi Selesai). | P0 |
| FR-WLT-02 | Angka *Terkonfirmasi* tampil dominan dengan animasi penghitung. | P0 |
| FR-WLT-03 | Riwayat transaksi: tanggal, mitra, material, berat, nilai bersih, status; pagination dan filter dasar (periode, status). | P0 |
| FR-WLT-04 | Detail transaksi: berat, harga per kg, faktor kualitas, biaya, **nilai bersih**, jejak status, mitra. | P0 |
| FR-WLT-05 | Estimasi dan terkonfirmasi tidak pernah dijumlahkan menjadi satu "saldo". | P0 |
| FR-WLT-06 | Ledger **tak dapat diubah (immutable)**; koreksi dilakukan melalui entri penyesuaian dengan alasan dan audit. | P0 |
| FR-WLT-07 | Keadaan kosong dengan ajakan menjalankan Scanner. | P0 |
| FR-WLT-08 | Grafik pendapatan terkonfirmasi mingguan/bulanan (toggle) dengan tabel alternatif. | P1 |
| FR-WLT-09 | Perbandingan berat terkumpul vs nilai terjual per kategori. | P1 |
| FR-WLT-10 | Filter lanjutan (kategori, mitra, rentang tanggal) dan ekspor CSV/PDF ringkasan. | P1 |

**AC-WLT-05:** *Given* keranjang berestimasi Rp 10.000 dan satu transaksi terkonfirmasi Rp 8.200, *When* pengguna membuka EcoWallet, *Then* kedua angka tampil terpisah dengan gaya berbeda dan tidak ada angka gabungan berlabel "saldo".

### 10.10 Impact Garden (GDN) — *"Dampak lingkungan yang tumbuh bersama kontribusi pengguna."*

Visualisasi motivasi dan ringkasan dampak; **bukan** klaim bahwa satu kilogram sampah selalu menghasilkan penghematan emisi tertentu.

| Material | Elemen taman (usulan desain) |
| --- | --- |
| Paper & Cardboard | Pohon / ranting bertunas |
| Plastic | Teratai / bunga air |
| Metal | Batu & kristal mineral |
| Glass | Kolam / embun jernih |
| Lainnya (P2) | Serangga penyerbuk / kupu-kupu |

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-GDN-01 | Taman tumbuh **hanya** dari transaksi berstatus *Selesai*. | P0 |
| FR-GDN-02 | Jumlah/ukuran elemen ditentukan berat per kategori sesuai konfigurasi (Bagian 11.6). | P0 |
| FR-GDN-03 | Lima tahap taman: Tunas → Tumbuh → Rimbun → Ekosistem → Hutan Kecil; animasi pertumbuhan saat elemen/tahap bertambah. | P0 |
| FR-GDN-04 | *Progress ring* total berat menuju tahap berikutnya. | P0 |
| FR-GDN-05 | Kartu pencapaian (mis. *First 10 kg Recycled*) dengan status terkunci/terbuka dan syarat jelas; dikelola admin. | P0 |
| FR-GDN-06 | **Estimasi emisi berpotensi dihindari** hanya tampil bila faktor emisi (beserta sumber, tahun, asumsi) tersedia; berlabel *estimasi*, dengan tautan ke `/metodologi`. | P0 |
| FR-GDN-07 | Bila faktor tidak tersedia untuk suatu material, tampilkan "—" dan alasan; tidak dijumlahkan. | P0 |
| FR-GDN-08 | Ringkasan dampak: total berat, jumlah transaksi, rincian per kategori. | P0 |
| FR-GDN-09 | Keadaan awal (tanpa kontribusi) menampilkan "bibit" dan ajakan memulai. | P0 |
| FR-GDN-10 | Hover/tap pada elemen menampilkan asal kontribusi (material, tanggal, berat). | P1 |
| FR-GDN-11 | Alternatif teks/tabel yang menjelaskan isi taman untuk pembaca layar. | P0 |
| FR-GDN-12 | Bagikan pencapaian/taman sebagai gambar atau tautan publik (opt-in, tanpa data pribadi). | P1 |

**AC-GDN-01:** *Given* pengguna memiliki keranjang dan pengajuan *Dalam proses*, *When* membuka `/taman`, *Then* taman tidak bertambah; elemen baru muncul hanya setelah transaksi berstatus *Selesai*.

**AC-GDN-07:** *Given* material tanpa faktor emisi, *When* ringkasan dampak tampil, *Then* emisi untuk material itu "—" dan tidak masuk jumlah.

### 10.11 Circular Champions (CMP) — *"Jadikan kebiasaan memilah sebagai gerakan komunitas."*

**Prinsip keadilan:** penilaian komunitas berdasarkan **kontribusi terverifikasi** (transaksi *Selesai* dengan timbangan mitra), bukan klaim mandiri.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-CMP-01 | Buat kelompok (nama, jenis: kelas/kampus/RT-RW/komunitas, deskripsi, visibilitas publik/privat) dan kode undangan. | P1 |
| FR-CMP-02 | Gabung kelompok via kode/tautan; keluar kelompok; Admin Kelompok dapat mengelola anggota. | P1 |
| FR-CMP-03 | **Leaderboard** kelompok dan individu berdasar **berat terverifikasi** per periode (minggu/bulan); *tie-breaker*: jumlah transaksi, lalu waktu tercapai. | P1 |
| FR-CMP-04 | Nama tampil individu bersifat opt-in; default memakai nama panggilan/pseudonim. | P1 |
| FR-CMP-05 | **Tantangan mingguan** (dibuat admin): target, kategori, periode, aturan verifikasi, progres kelompok & individu. | P1 |
| FR-CMP-06 | Lencana pencapaian dan *progress bar* individu & kelompok. | P1 |
| FR-CMP-07 | Perbandingan kontribusi per kategori antar kelompok. | P1 |
| FR-CMP-08 | Panel *Bagaimana peringkat dihitung?* menjelaskan mekanisme verifikasi. | P1 |
| FR-CMP-09 | Pelaporan konten/kelompok tidak pantas; moderasi oleh Admin Ops. | P1 |
| FR-CMP-10 | Animasi perubahan peringkat halus dan dapat dinonaktifkan. | P2 |

**AC-CMP-03:** *Given* kontribusi berstatus *Dalam proses*, *When* peringkat dihitung, *Then* kontribusi tersebut tidak dihitung hingga *Selesai*.

### 10.12 Notifikasi (NTF)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-NTF-01 | Pusat notifikasi in-app dengan penanda belum dibaca. | P0 |
| FR-NTF-02 | Email transaksional: magic link, pengajuan diterima, dikonfirmasi/ditolak/kedaluwarsa, pengingat jadwal, timbangan menunggu konfirmasi, selesai. | P0 |
| FR-NTF-03 | Pengaturan preferensi notifikasi (kategori & kanal); email transaksional kritis tidak dapat dimatikan. | P0 |
| FR-NTF-04 | Notifikasi ke mitra untuk permintaan baru, perubahan, pembatalan, dan pengingat SLA. | P0 |
| FR-NTF-05 | Notifikasi pencapaian & tantangan. | P1 |
| FR-NTF-06 | WhatsApp untuk pengingat jadwal (opt-in). | P2 |

### 10.13 Edukasi & Metodologi (EDU)

**Tujuan:** membangun kepercayaan dengan membuka cara kerja angka dan membantu pengguna memilah dengan benar.

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-EDU-01 | Halaman **Metodologi**: 6 faktor penentu nilai; rumus estimasi; faktor kualitas; perbedaan tiga status nilai; harga indikatif vs terkonfirmasi; cara peringkat dihitung. | P0 |
| FR-EDU-02 | Menampilkan **sumber & tanggal** untuk harga acuan dan faktor emisi, atau menyatakan belum tersedia. | P0 |
| FR-EDU-03 | Menyatakan **batasan sistem** (tanpa pengenalan gambar otomatis, harga bukan real-time, tidak ada pemrosesan pembayaran). | P0 |
| FR-EDU-04 | Katalog material dengan halaman detail (deskripsi, contoh, cara menyiapkan, faktor nilai, mitra penerima). | P0 |
| FR-EDU-05 | Pusat edukasi: panduan pemilahan per kategori (Lampiran C diperluas), FAQ, tips. | P0 |
| FR-EDU-06 | Glosarium. | P1 |
| FR-EDU-07 | Pengelolaan konten edukasi melalui panel admin. | P1 |

### 10.14 Panel Admin (ADM)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-ADM-01 | CRUD kategori & material (nama, slug, foto, deskripsi, panduan pemilahan, status). | P0 |
| FR-ADM-02 | Kelola **harga acuan** per material (rentang, sumber, tanggal pengamatan, riwayat); tidak menimpa histori. | P0 |
| FR-ADM-03 | Kelola **faktor emisi** (nilai, satuan, sumber, tahun, asumsi, status verifikasi). | P0 |
| FR-ADM-04 | Antrean onboarding mitra: tinjau, minta perbaikan, setujui/tolak; tangguhkan/aktifkan kembali. | P0 |
| FR-ADM-05 | Pemantauan permintaan: daftar, filter status, intervensi (mis. batalkan, hubungi mitra). | P0 |
| FR-ADM-06 | Kelola pencapaian dan parameter taman (ambang tahap, unit elemen). | P0 |
| FR-ADM-07 | Peringatan harga basi per mitra dan harga acuan. | P0 |
| FR-ADM-08 | Manajemen pengguna: lihat, tangguhkan, bantu pemulihan akun. | P0 |
| FR-ADM-09 | **Audit log** untuk seluruh aksi admin dan perubahan data sensitif (siapa, apa, kapan, nilai sebelum/sesudah). | P0 |
| FR-ADM-10 | Konfigurasi sistem: faktor kualitas, SLA, jendela konfirmasi, ambang kebasian, batas berat, tahap taman. Perubahan hanya Super Admin dan tercatat. | P0 |
| FR-ADM-11 | Dashboard operasional: pengajuan hari ini, tingkat respons mitra, volume kg, harga basi, antrean dispute. | P1 |
| FR-ADM-12 | Penanganan dispute (tinjau bukti, putuskan, catat penyesuaian ledger). | P1 |
| FR-ADM-13 | Kelola tantangan & kelompok; moderasi laporan. | P1 |
| FR-ADM-14 | Laporan & ekspor (volume, nilai, dampak per periode/wilayah). | P1 |

### 10.15 Halaman Legal & Statis (LGL)

| ID | Kebutuhan | Prio |
| --- | --- | --- |
| FR-LGL-01 | Kebijakan Privasi: data yang dikumpulkan, tujuan, dasar pemrosesan, retensi, hak subjek data, kontak. | P0 |
| FR-LGL-02 | Syarat & Ketentuan: peran ELOVIA sebagai perantara informasi & pencatatan, tanggung jawab pengguna dan mitra, ketentuan penyerahan, pembatasan tanggung jawab. | P0 |
| FR-LGL-03 | Tentang ELOVIA (kepanjangan nama), kontak, tim. | P0 |
| FR-LGL-04 | **Kredit & Lisensi** untuk foto, ilustrasi, font, dan pustaka. | P0 |
| FR-LGL-05 | Pusat bantuan/FAQ dengan kanal kontak dukungan. | P0 |

---

## 11. Aturan Bisnis, Status & Rumus

### 11.1 Tiga status nilai (ValueStatus)

| Status | Arti | Sumber | Pengodean visual | Contoh tampilan |
| --- | --- | --- | --- | --- |
| **Estimasi** | Perkiraan dari harga acuan; belum diajukan | Hasil Scanner, Keranjang | Garis putus, ikon "≈", ochre, teks "Estimasi" | `≈ Rp 6.400–10.600` |
| **Dalam proses** | Pengajuan aktif; belum *Selesai* | Status Diajukan / Dikonfirmasi / Diterima | Ikon jam/cincin parsial, biru-keabuan, teks "Dalam proses" | `Rp 8.000 (dalam proses)` |
| **Terkonfirmasi** | Transaksi *Selesai* dan tercatat di ledger | Status Selesai | Isi solid hijau, ikon centang, teks "Terkonfirmasi" | `Rp 8.200` |

**Aksesibilitas:** status tidak hanya dibedakan warna — selalu ikon + teks + pola. **Penjumlahan:** nilai dari status berbeda tidak dijumlahkan.

### 11.2 State machine pengajuan penyaluran

```
DRAFT ──kirim──▶ DIAJUKAN ──mitra konfirmasi──▶ DIKONFIRMASI ──mitra timbang──▶ DITERIMA ──pengguna konfirmasi / auto 48 jam──▶ SELESAI
                    │  │                              │                              │
                    │  └─ mitra tolak ─▶ DITOLAK      └─ batal ─▶ DIBATALKAN         └─ keberatan (P1) ─▶ DIPERSELISIHKAN ─▶ SELESAI (disesuaikan) / DIBATALKAN
                    └─ lewat SLA ─▶ KEDALUWARSA
                    └─ batal ─▶ DIBATALKAN
```

| Transisi | Pemicu | Efek |
| --- | --- | --- |
| DRAFT → DIAJUKAN | Pengguna mengirim | Kuota slot dikunci; mitra dinotifikasi; item keranjang ditandai *Dalam proses* |
| DIAJUKAN → DIKONFIRMASI | Mitra konfirmasi | Harga & jadwal terkonfirmasi; alamat lengkap terbuka bagi mitra |
| DIAJUKAN → DITOLAK | Mitra tolak | Alasan dikirim; item kembali ke keranjang |
| DIAJUKAN → KEDALUWARSA | Melewati SLA (default 24 jam) | Notifikasi; opsi ajukan ke mitra lain |
| DIKONFIRMASI → DITERIMA | Mitra input timbangan | Nilai akhir dihitung; jendela konfirmasi 48 jam mulai |
| DITERIMA → SELESAI | Pengguna konfirmasi atau auto-konfirmasi | **Transaksi ledger dibuat**; Garden & Champions diperbarui |
| * → DIBATALKAN | Pengguna/Admin membatalkan (sebelum DITERIMA) | Tidak ada efek ke ledger/garden; slot dibebaskan |
| DITERIMA → DIPERSELISIHKAN (P1) | Pengguna ajukan keberatan | Auto-konfirmasi dihentikan; Admin Ops meninjau |

Setiap transisi dicatat pada `RequestStatusHistory` (pelaku, waktu, catatan).

### 11.3 Rumus estimasi nilai

**Notasi:** `W` berat (kg) · `P_min`/`P_max` harga per kg (rentang) · `Fq` faktor kualitas · `B` biaya (mis. jemput) · `R` pembulatan ke Rp 100 terdekat.

**Faktor kualitas (parameter terkelola di Admin):**

| Kualitas | Deskripsi | `Fq` awal |
| --- | --- | --- |
| A — Bersih & kering | Dipilah, tidak berminyak/basah | 1,00 |
| B — Cukup | Sedikit kotor/kurang rapi | 0,85 |
| C — Kotor/basah | Berminyak, basah, bercampur | 0,60 |

```
Nilai_kotor_min  = R( W × P_min × Fq )
Nilai_kotor_maks = R( W × P_maks × Fq )
Nilai_bersih_min  = max(0, Nilai_kotor_min  − B)
Nilai_bersih_maks = max(0, Nilai_kotor_maks − B)
```

**Contoh (angka ilustrasi untuk menjelaskan rumus):** kardus, `W = 5 kg`, kualitas B (`Fq = 0,85`), harga `1.500–2.500 /kg` → min `5×1.500×0,85 = 6.375 → Rp 6.400`; maks `5×2.500×0,85 = 10.625 → Rp 10.600`; tampil **≈ Rp 6.400–10.600**.

**Aturan:**
1. Selalu tampilkan rentang pada status *Estimasi*.
2. Scanner memakai **harga acuan umum**; Marketplace/keranjang-per-mitra memakai **harga indikatif mitra**.
3. Pada transaksi *Diterima/Selesai*, nilai akhir = `Σ(berat_akhir × harga_terkonfirmasi × Fq_akhir) − B` (satu angka pasti).
4. Biaya hanya dikurangkan bila berlaku untuk metode terpilih dan tampil sebagai baris terpisah.
5. Perhitungan kanonik terjadi **di server**; klien hanya menampilkan.
6. Semua nilai uang disimpan sebagai **integer rupiah**; berat sebagai desimal terbatas (gram atau 3 digit desimal).

### 11.4 Rumus dampak

```
Emisi_dihindari_estimasi (kg CO₂e) = Σ ( berat_Selesai_material × FE_material )
```

- `FE_material` wajib memiliki nilai, satuan, **sumber**, tahun, dan asumsi (batas sistem).
- Bila `FE` tidak tersedia → tampilkan "—" dan **jangan** dijumlahkan.
- Selalu berlabel **estimasi**, bukan hasil pengukuran, dengan tautan metodologi.
- Nilai `FE` **tidak ditetapkan dalam PRD**; diisi tim operasional dari sumber yang dapat diperiksa (Q-05).

### 11.5 Kebasian harga (price freshness)

| Parameter | Default (konfigurasi) | Perilaku |
| --- | --- | --- |
| Ambang peringatan | 14 hari | Label *Perlu diperbarui* |
| Ambang sembunyi | 30 hari | Harga tidak ditampilkan/tidak dipakai untuk perbandingan; mitra diminta memperbarui |
| Harga acuan umum | 30 hari | Peringatan di Scanner; alert ke Admin Ops |

### 11.6 Aturan Impact Garden

```
total_kg  = Σ berat_Selesai
tahap     = ambang(total_kg)
elemen_k  = floor( berat_kategori_k / UNIT_ELEMEN_k )
```

| Tahap | Nama | Ambang total berat (awal, konfigurable) |
| --- | --- | --- |
| 1 | Tunas | ≥ 0,1 kg |
| 2 | Tumbuh | ≥ 5 kg |
| 3 | Rimbun | ≥ 10 kg (membuka *First 10 kg Recycled*) |
| 4 | Ekosistem | ≥ 25 kg |
| 5 | Hutan Kecil | ≥ 50 kg |

Ambang adalah parameter gamifikasi, bukan standar ilmiah; dapat disesuaikan setelah data penggunaan terkumpul.

### 11.7 Aturan Champions

- Peringkat = Σ berat **Selesai** anggota/kelompok pada periode.
- Kontribusi dihitung pada periode saat statusnya menjadi *Selesai*.
- Seri → jumlah transaksi, lalu waktu tercapai.
- Transaksi yang dikoreksi/dibatalkan setelah *Selesai* memicu penghitungan ulang peringkat.
- Anti-penyalahgunaan: batas wajar berat per hari per pengguna (dipantau), deteksi pola anomali (mis. mitra–pengguna yang sama berulang dengan berat identik) ditandai untuk tinjauan.

### 11.8 Parameter konfigurasi sistem

| Parameter | Default |
| --- | --- |
| Berat min/maks per item | 0,1 / 500 kg |
| SLA tanggapan mitra | 24 jam |
| Jendela konfirmasi pengguna | 48 jam |
| Batas pembatalan sebelum jadwal | 2 jam |
| Rentang jadwal ke depan | 14 hari |
| Faktor kualitas A / B / C | 1,00 / 0,85 / 0,60 |
| Ambang kebasian | 14 / 30 hari |
| Maks alamat per pengguna | 5 |
| Retensi alamat pada permintaan selesai | 12 bulan, lalu dianonimkan |

---

## 12. Model Data

### 12.1 Entitas utama

| Entitas | Deskripsi | Field kunci |
| --- | --- | --- |
| `User` | Akun pengguna | id, email, name, phone?, avatarUrl?, role, status, consentVersion, consentAt, createdAt |
| `Address` | Alamat tersimpan | id, userId, label, fullAddress, landmark?, lat, lng, accessNotes?, isDefault |
| `MaterialCategory` | Kategori (paper, plastic, metal, glass) | id, slug, name, sortOrder |
| `Material` | Sub-jenis material | id, categoryId, slug, name, description, photoUrl, sortingGuide(json), isActive |
| `ReferencePrice` | Harga acuan bertanggal | id, materialId, minIdr, maxIdr, source, observedAt, createdBy |
| `EmissionFactor` | Faktor emisi bersumber | id, materialId, value, unit, source, year, assumption, verified |
| `Partner` | Mitra | id, slug, name, type, description, logoUrl, address, lat, lng, hours(json), terms(json), status, verifiedAt |
| `PartnerStaff` | Relasi staf–mitra | id, partnerId, userId, role(owner/staff) |
| `PartnerOffer` | Harga indikatif mitra | id, partnerId, materialId, minIdr, maxIdr, acceptedGrades[], isActive, updatedAt |
| `PartnerService` | Layanan & ketersediaan | id, partnerId, method(pickup/dropoff), serviceArea(geo/json), minWeightKg?, feeIdr?, leadTimeHours, availability(json), capacityPerSlot? |
| `BasketItem` | Item keranjang akun | id, userId, materialId, weightKg, grade, createdAt |
| `HandoverRequest` | Pengajuan penyaluran | id, userId, partnerId, method, addressSnapshot, scheduledAt, status, idempotencyKey, notes, createdAt |
| `HandoverRequestItem` | Item pada pengajuan | id, requestId, materialId, declaredWeightKg, declaredGrade, estMinIdr, estMaxIdr, confirmedPricePerKg?, finalWeightKg?, finalGrade? |
| `RequestStatusHistory` | Jejak status | id, requestId, fromStatus, toStatus, actorId, actorRole, note, at |
| `RequestAttachment` | Foto lampiran (P1) | id, requestId, storageKey, mime, sizeBytes |
| `Transaction` | Ledger (immutable) | id, requestId, userId, partnerId, completedAt, feeIdr, netValueIdr, kind(normal/adjustment), adjustsTransactionId? |
| `TransactionLine` | Baris transaksi | id, transactionId, materialId, weightKg, pricePerKg, grade, lineValueIdr |
| `Achievement` | Definisi pencapaian | id, code, title, description, conditionType, threshold, category? |
| `UserAchievement` | Pencapaian terbuka | userId, achievementId, unlockedAt |
| `Group` | Kelompok (P1) | id, name, kind, visibility, inviteCode, ownerId |
| `GroupMember` | Anggota | groupId, userId, role, showRealName |
| `Challenge` | Tantangan (P1) | id, title, targetKg, categories[], startsAt, endsAt, rules, scope |
| `ChallengeProgress` | Progres tantangan | challengeId, subjectType(user/group), subjectId, verifiedKg |
| `Notification` | Notifikasi in-app | id, userId, type, payload(json), readAt?, createdAt |
| `AuditLog` | Jejak audit | id, actorId, action, entity, entityId, before(json), after(json), ip?, at |
| `SystemConfig` | Parameter sistem | key, value(json), updatedBy, updatedAt |
| `ContentPage` | Konten edukasi (R2 bila via CMS) | id, slug, title, body, status, updatedAt |

### 12.2 Relasi (ringkas)

```
User 1─* Address            User 1─* BasketItem          User 1─* HandoverRequest
Partner 1─* PartnerOffer    Partner 1─* PartnerService    Partner *─* User (PartnerStaff)
HandoverRequest 1─* HandoverRequestItem   HandoverRequest 1─* RequestStatusHistory
HandoverRequest 1─0..1 Transaction  ─1─* TransactionLine
Material *─1 MaterialCategory   Material 1─* ReferencePrice   Material 1─0..* EmissionFactor
Group 1─* GroupMember *─1 User  Challenge 1─* ChallengeProgress
```

### 12.3 Tipe domain inti (TypeScript)

```ts
export type MaterialCategoryId = 'paper' | 'plastic' | 'metal' | 'glass';
export type QualityGrade = 'A' | 'B' | 'C';
export type PartnerType = 'bank_sampah' | 'pengepul' | 'mitra_daur_ulang';
export type PartnerStatus = 'pending' | 'active' | 'suspended' | 'rejected';
export type HandoverMethod = 'pickup' | 'dropoff';
export type ValueStatus = 'estimate' | 'in_progress' | 'confirmed';
export type RequestStatus =
  | 'draft' | 'submitted' | 'confirmed' | 'received' | 'completed'
  | 'rejected' | 'expired' | 'cancelled' | 'disputed';

export interface PriceRange { minIdr: number; maxIdr: number; }       // Rp per kg, integer

export interface ReferencePrice extends PriceRange {
  materialId: string; source: string; observedAt: string;             // ISO UTC
}

export interface EmissionFactor {
  materialId: string; value: number; unit: 'kgCO2e_per_kg';
  source: string; year: number; assumption: string; verified: boolean;
}

export interface Estimate {
  materialId: string; weightKg: number; grade: QualityGrade;
  grossMinIdr: number; grossMaxIdr: number;
  priceObservedAt: string; priceStale: boolean;
  status: 'estimate';
}

export interface FinalLine {
  materialId: string; finalWeightKg: number; finalGrade: QualityGrade;
  confirmedPricePerKg: number; lineValueIdr: number;
}

export interface Transaction {
  id: string; requestId: string; partnerId: string; completedAt: string;
  lines: FinalLine[]; feeIdr: number; netValueIdr: number;
  kind: 'normal' | 'adjustment'; status: 'confirmed';
}
```

### 12.4 Aturan integritas data

- Uang: integer rupiah; berat: disimpan dalam gram (integer) atau desimal presisi tetap.
- **Snapshot** alamat, harga terkonfirmasi, dan faktor kualitas disimpan pada pengajuan/transaksi sehingga perubahan data referensi tidak mengubah histori.
- `Transaction` tidak dapat diubah/dihapus; koreksi melalui transaksi `adjustment`.
- Penghapusan akun menganonimkan data pribadi; transaksi dipertahankan tanpa identitas untuk integritas statistik.
- Soft-delete untuk material, mitra, dan kelompok; semua perubahan data referensi masuk `AuditLog`.
- Indeks: `(partnerId, materialId)` pada offer; `(userId, status)` pada request; geospasial pada mitra; `(completedAt)` pada transaksi.

### 12.5 Data awal (seed)

Seed hanya untuk **lingkungan pengembangan dan staging**; produksi diisi data nyata.

| Data | Isi seed |
| --- | --- |
| Kategori | Paper & Cardboard, Plastic, Metal, Glass |
| Material | Kardus, Kertas HVS/putih, Koran/majalah; Botol PET, Gelas plastik (PP), Botol/jerigen HDPE; Kaleng aluminium, Besi/kaleng bekas; Botol kaca bening, Botol kaca berwarna |
| Pencapaian | Pilah Pertama, First 10 kg Recycled, Tiga Jenis Material, Lima Transaksi, Konsisten 4 Minggu |
| Konfigurasi | Parameter pada Bagian 11.8 |
| Harga & mitra (staging) | Data uji berlabel jelas; **dilarang** dimigrasikan ke produksi |

> Harga acuan produksi diisi tim operasional dari sumber terverifikasi (mis. pengamatan harga langsung ke mitra) dengan sumber dan tanggal pengamatan tercatat.

---

## 13. Spesifikasi API

**Konvensi:** REST + JSON di bawah `/api/v1`; autentikasi berbasis sesi cookie; validasi skema (Zod) di setiap endpoint; kesalahan memakai format `application/problem+json`; paginasi berbasis *cursor*; `Idempotency-Key` pada pembuatan pengajuan; header batas laju (`RateLimit-*`). Otorisasi diperiksa per sumber daya.

| Metode | Path | Akses | Deskripsi |
| --- | --- | --- | --- |
| GET | `/materials` | Publik | Daftar kategori & material |
| GET | `/materials/{slug}` | Publik | Detail material + harga acuan terbaru |
| POST | `/estimates` | Publik | Hitung estimasi (stateless) |
| GET | `/partners` | Publik | Direktori: filter material, tipe, metode, area, urutan |
| GET | `/partners/{slug}` | Publik | Profil mitra + penawaran |
| GET | `/partners/compare?ids=` | Publik | Perbandingan hingga 3 mitra |
| GET/POST/PATCH/DELETE | `/basket/items` | Pengguna | CRUD item keranjang |
| POST | `/basket/merge` | Pengguna | Gabung keranjang tamu |
| GET/POST/PATCH/DELETE | `/addresses` | Pengguna | Alamat tersimpan |
| POST | `/requests` | Pengguna | Buat pengajuan (idempoten) |
| GET | `/requests`, `/requests/{id}` | Pengguna | Daftar & detail |
| POST | `/requests/{id}/cancel` | Pengguna | Batalkan |
| POST | `/requests/{id}/confirm-receipt` | Pengguna | Konfirmasi hasil timbang |
| POST | `/requests/{id}/dispute` | Pengguna | Ajukan keberatan (P1) |
| POST | `/requests/{id}/attachments` | Pengguna | Unggah foto (P1) |
| GET | `/wallet/summary` | Pengguna | Tiga angka status |
| GET | `/wallet/transactions`, `/{id}` | Pengguna | Riwayat & detail |
| GET | `/garden` | Pengguna | Status taman, tahap, elemen, emisi bersyarat |
| GET | `/achievements` | Pengguna | Pencapaian & progres |
| GET/POST | `/groups`, `/groups/join` | Pengguna | Kelompok (P1) |
| GET | `/groups/{id}/leaderboard`, `/leaderboard` | Pengguna | Peringkat (P1) |
| GET/POST | `/challenges`, `/challenges/{id}/join` | Pengguna | Tantangan (P1) |
| GET/POST | `/notifications`, `/notifications/{id}/read` | Pengguna | Notifikasi |
| GET | `/partner/requests`, `/partner/requests/{id}` | Mitra | Permintaan masuk |
| POST | `/partner/requests/{id}/confirm` · `/reject` · `/receive` | Mitra | Aksi permintaan |
| PUT | `/partner/offers` · `/partner/availability` | Mitra | Harga & ketersediaan |
| PATCH | `/partner/profile` | Mitra | Profil & syarat |
| CRUD | `/admin/materials` · `/reference-prices` · `/emission-factors` | Admin | Data referensi |
| POST | `/admin/partners/{id}/approve` · `/suspend` | Admin | Status mitra |
| CRUD | `/admin/achievements` · `/challenges` · `/config` | Admin | Gamifikasi & konfigurasi |
| GET | `/admin/requests` · `/users` · `/audit-logs` · `/reports` | Admin | Operasional & audit |

**Kontrak kunci**

- `POST /estimates` — input `{ materialId, weightKg, grade }`; output `Estimate` (rentang, tanggal harga, flag kebasian). Tidak menyimpan data.
- `POST /requests` — input `{ partnerId, method, addressId?, scheduledAt, items[], notes }`; output `HandoverRequest` status `submitted`; server **menghitung ulang** estimasi dan memvalidasi syarat mitra, area, dan slot.
- `POST /partner/requests/{id}/receive` — input `{ lines: [{ materialId, finalWeightKg, finalGrade, pricePerKg }], feeIdr }`; server menghitung `netValueIdr`, mengubah status ke `received`, memulai jendela konfirmasi.

**Tugas terjadwal (cron/queue):** kedaluwarsa permintaan melewati SLA; auto-konfirmasi `received → completed`; pengingat jadwal; peringatan harga basi; penghitungan ulang peringkat.

---

## 14. Design System & UX

### 14.1 Arah visual

**Fresh Green Tech — Light Mode.** Tampilan **terang, putih, bersih, dengan hijau yang adem**, selaras dengan subtema *green tech and sustainable environment*. Seluruh produk (area publik, akun, Portal Mitra, dan Admin) memakai **satu tema terang**.

| Pilar | Makna | Penerjemahan visual |
| --- | --- | --- |
| **Putih & lapang** | Bersih, tenang, mudah dibaca | Latar putih dominan, ruang kosong (whitespace) lapang, grid rapi, hierarki tipografi tegas |
| **Hijau adem** | Segar, alami, berkelanjutan | Mint & sage lembut sebagai permukaan; hijau medium hanya untuk aksi dan penekanan |
| **Green tech** | Presisi, data, inovasi | Garis tipis, motif dot-grid halus, angka monospace, kartu bergaya kaca ringan, animasi presisi, visual data yang rapi |
| **Lingkungan lestari** | Alami, tulus, dekat dengan masyarakat | Fotografi material bercahaya alami, bentuk organik lembut, ilustrasi Garden |

**Aturan komposisi halaman**

- **Tidak ada section berlatar gelap.** Kontras dibangun lewat tipografi, warna aksen, dan ruang, bukan lewat latar gelap.
- **Ritme latar:** putih → `mist-50` → `mint-100` secara bergantian antar section agar halaman terasa berlapis tanpa berat.
- **Hero** terang: gradien putih ke mint yang sangat lembut, tipografi display besar, foto material dalam kartu berradius besar, dan chip data melayang (mis. kisaran estimasi).
- **Closing CTA** berupa panel `mint-100` berradius besar dengan tombol hijau; **footer** juga terang (`mist-50` dengan garis pemisah mint).
- **Mode tampilan:** hanya light mode pada versi 1 (`color-scheme: light`); tidak ada mode gelap (lihat Q-12).

**Elemen signature**

- Motif **loop sirkular** bergaris tipis sebagai penanda Journey, pemisah section, dan loader.
- **Dot-grid** halus (opasitas 4–6%) pada latar tertentu untuk kesan teknologi.
- **Bentuk organik** (blob) mint/sage di balik foto dan ilustrasi.
- **Highlight marker** lime lembut di balik kata kunci pada headline.
- Garis pindai bergradien teal → hijau pada Scanner.

**Penerapan per area**

| Area | Perlakuan visual |
| --- | --- |
| Landing & Hero | Latar putih → mist; foto material dalam kartu radius besar; chip data melayang; Journey bergaris hijau tipis |
| Scanner | Panggung putih bersih; garis pindai teal → hijau; hasil pada kartu `mint-100` dengan angka monospace |
| Marketplace | Latar `mist-50`; kartu putih berborder mint; harga monospace hijau; label kebasian berwarna lembut |
| Penyaluran | Wizard putih satu langkah per layar; timeline status dengan tiga warna status |
| EcoWallet | Angka terkonfirmasi besar berwarna hijau; grafik garis hijau–teal dengan area gradien lembut |
| Impact Garden | Adegan SVG pada latar mint terang; elemen berpalet hijau, sage, dan teal |
| Circular Champions | Leaderboard putih bersih; lencana hijau lembut; progress bar lime–hijau |
| Portal Mitra & Admin | UI padat dan rapi; sidebar putih/mist; tabel dengan zebra tipis `mist-50`; aksen hijau minimal |

**Hindari:** hijau neon atau hijau pekat/hitam kehijauan sebagai latar, deretan kartu putih seragam tanpa hierarki, ikon daun klise, gradien default (ungu/biru), bayangan berat, dan terlalu banyak warna aksen.

### 14.2 Token warna

**Permukaan & netral**

| Token | Hex (usulan) | Penggunaan |
| --- | --- | --- |
| `white` | `#FFFFFF` | Latar utama, kartu, panel |
| `mist-50` | `#F6FAF7` | Latar section alternatif, footer, zebra tabel |
| `mint-100` | `#E8F4EC` | Permukaan lembut, chip, panel hasil, closing CTA |
| `mint-200` | `#D3EBDB` | Border, divider, kontur kartu |
| `sage-300` | `#A9D3B8` | Ilustrasi, elemen dekoratif, bentuk organik |

**Hijau (aksi & penekanan)**

| Token | Hex (usulan) | Penggunaan |
| --- | --- | --- |
| `green-500` | `#2FA866` | Isi dekoratif, grafik, ikon besar (bukan teks kecil) |
| `green-600` | `#177A47` | **Primer:** tombol utama (teks putih), tautan, angka terkonfirmasi |
| `green-700` | `#0F5F37` | Hover/pressed |
| `green-800` | `#0B4A2B` | Teks hijau pekat, judul beraksen |

**Aksen**

| Token | Hex (usulan) | Penggunaan |
| --- | --- | --- |
| `lime-200` | `#E3F6B5` | Highlight marker headline, badge lembut |
| `lime-500` | `#A8D93A` | Progress/isi dekoratif (bukan teks) |
| `teal-600` | `#0E7C7B` | Aksen tech: garis pindai, grafik sekunder, tautan sekunder |
| `teal-100` | `#DDF3F1` | Latar chip/aksen tech lembut |

**Teks**

| Token | Hex (usulan) | Penggunaan |
| --- | --- | --- |
| `ink-900` | `#0F1F17` | Teks utama |
| `ink-600` | `#4A5D52` | Teks sekunder |
| `ink-500` | `#5D7065` | Caption, placeholder |

**Status & sistem**

| Token | Teks/ikon | Isi latar | Penggunaan |
| --- | --- | --- | --- |
| `status-estimate` | `#9A5B00` | `#FFF3D6` | Status *Estimasi* |
| `status-progress` | `#2F6F9F` | `#E3F0FA` | Status *Dalam proses* |
| `status-confirmed` | `#177A47` | `#E3F5EA` | Status *Terkonfirmasi* |
| `danger-600` | `#B3261E` | `#FDECEA` | Error/pembatalan/penolakan |

**Gradien & bayangan**

| Token | Nilai | Penggunaan |
| --- | --- | --- |
| `gradient-hero` | `linear-gradient(180deg, #FFFFFF 0%, #F6FAF7 60%, #E8F4EC 100%)` + *radial glow* mint sangat lembut | Latar hero |
| `shadow-soft` | `0 1px 2px rgba(15,31,23,0.06), 0 8px 24px rgba(15,31,23,0.06)` | Kartu terangkat, drawer, popover |

**Pasangan teks/latar yang disarankan** *(rasio kontras perkiraan; verifikasi dengan alat sebelum dikunci)*

| Pasangan | Perkiraan rasio | Catatan |
| --- | --- | --- |
| `ink-900` di atas `white` / `mist-50` / `mint-100` | > 14 : 1 | Teks utama |
| `ink-600` di atas `white` | ≈ 7 : 1 | Teks sekunder |
| `ink-500` di atas `white` | ≈ 5,3 : 1 | Caption/placeholder |
| `white` di atas `green-600` | ≈ 5,4 : 1 | Tombol primer |
| `green-600` di atas `white` | ≈ 5,4 : 1 | Tautan dan angka hijau |
| `teal-600` di atas `white` | ≈ 5,0 : 1 | Aksen tech |
| Teks status di atas isi latar status | ≥ 4,5 : 1 | Badge status |

> Nilai adalah usulan awal; verifikasi kontras WCAG AA untuk setiap pasangan teks/latar. **`green-500`, `lime-500`, dan `sage-300` tidak dipakai untuk teks kecil** karena kontrasnya di atas putih tidak memadai.

**Gaya komponen kunci**

| Komponen | Spesifikasi |
| --- | --- |
| Button primer | Isi `green-600`, teks putih, radius pil; hover `green-700`; fokus ring jelas |
| Button sekunder | Isi putih, border `green-600`, teks `green-700`; hover isi `mint-100` |
| Button ghost/tersier | Tanpa border, teks `green-700`; hover isi `mint-100` |
| Kartu | Putih, border 1 px `mint-200`, radius 16, `shadow-soft` hanya pada elemen terangkat |
| Chip/Badge | Isi `mint-100` atau `teal-100`, teks `green-800`; badge status memakai pasangan isi/teks status |
| Input | Putih, border `mint-200`; fokus border `green-600` + ring; error border `danger-600` + pesan teks |
| Tabel | Header `mist-50`, baris zebra tipis, angka monospace rata kanan |
| Grafik | Garis `green-600`/`teal-600`, area gradien putih→`mint-100`, grid `mint-200`; label ≥ 12 px |

### 14.3 Tipografi

| Peran | Font (usulan) |
| --- | --- |
| Display/headline | **Fraunces** (variable) atau **Instrument Serif** |
| UI/Body | **Plus Jakarta Sans** |
| Angka/Data | **JetBrains Mono** atau **Geist Mono** (`tabular-nums`) |

Dimuat via `next/font` (self-host, `display: swap`, subset latin). Skala fluid (`clamp`): Display XL `clamp(2.75rem, 7vw, 6rem)`, H1 `clamp(2.25rem, 5vw, 4rem)`, H2 `clamp(1.75rem, 3.5vw, 2.75rem)`, H3 `1.5rem`, Body `1rem/1.6`, Small `0.875rem`. Panjang baris ideal 60–75 karakter.

### 14.4 Layout & bentuk

| Aspek | Spesifikasi |
| --- | --- |
| Grid | 12 kolom (desktop), 8 (tablet), 4 (mobile); container maks 1280 px |
| Breakpoint | 360 · 640 · 768 · 1024 · 1280 · 1536 (mobile-first) |
| Spasi | Basis 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| Radius | 8 / 16 / 28 / pil |
| Elevasi | Minim bayangan; mengandalkan border 1 px `mint-200` dan perbedaan permukaan (putih di atas `mist-50`); `shadow-soft` hanya untuk elemen terangkat |
| Target sentuh | ≥ 44×44 px |

### 14.5 Ikonografi, ilustrasi, dan fotografi

- Set ikon konsisten (stroke 1,5 px; mis. Phosphor/Lucide) + **ikon material kustom** (kardus, PET, kaleng, kaca).
- Ilustrasi Journey dan elemen Garden dibuat khusus (SVG) agar konsisten dengan palet dan dapat dianimasikan.
- **Fotografi:** tampak atas (flat lay) dan close-up bertekstur, cahaya alami yang cerah, latar putih/mint/krem lembut, tanpa foto gelap atau *low-key*. Semua foto berlisensi jelas (foto sendiri atau lisensi bebas) dan tercatat pada halaman Kredit & Lisensi; tidak ada *hotlink*.
- Gambar disajikan AVIF/WebP responsif; hero ≤ 200 KB terkompres.

### 14.6 Inventaris komponen

| Kelompok | Komponen |
| --- | --- |
| Fondasi | Button, IconButton, Link, Badge/Chip, Tooltip, Tabs, Dialog, Drawer/Sheet, Toast, Skeleton, EmptyState, Disclosure, Form field, Select, DatePicker/SlotPicker |
| Navigasi | Navbar, MobileBottomNav, Breadcrumb, JourneyProgress, SkipLink |
| Data & status | **ValueStatusBadge**, **PriceRangeBar**, StatCounter, ProgressRing, StatusTimeline, DataTable, ChartCard, FreshnessTag |
| Material | MaterialCard, MaterialPicker, WeightInput, QualitySelector, ValueFactors, SortingGuide |
| Scanner | ScannerStage, ScanLine, ValueReveal |
| Marketplace | PartnerCard, PartnerCompareTable, FilterBar, TermsPanel, MapView |
| Penyaluran | RequestWizard, AddressPicker, RequestSummary |
| Wallet | EarningsSummary, TransactionRow, TransactionDetail |
| Garden | GardenScene, GardenElement, StageIndicator, AchievementCard |
| Komunitas | Leaderboard, ChallengeCard, BadgeMedal, GroupSelector |
| Portal & Admin | RequestInbox, WeighInForm, PriceEditor, AvailabilityEditor, AuditTable, ConfigForm |
| Global | Footer, Logo, CookieBanner, ConfirmDialog |

### 14.7 Pola UX kunci

- **Progressive disclosure:** detail rumus dan syarat tersedia sebagai *disclosure*, tidak memenuhi layar utama.
- **Status selalu terlihat:** timeline pada setiap pengajuan; ValueStatus pada setiap angka uang.
- **Keadaan lengkap:** setiap tampilan data memiliki keadaan memuat, kosong, error, dan terbatas (tanpa izin).
- **Form:** validasi *inline*, pesan spesifik, simpan draf pada wizard panjang, kunci kirim ganda.
- **Mobile:** aksi utama dalam jangkauan ibu jari; wizard satu langkah per layar; tabel berubah menjadi kartu.

### 14.8 Aksesibilitas visual

Kontras teks ≥ 4,5:1 (teks besar ≥ 3:1), komponen UI ≥ 3:1; fokus terlihat (ring 2 px `green-600` dengan offset 2 px; ring `ink-900` di atas permukaan hijau pekat); status tidak hanya warna; grafik dan Garden memiliki alternatif teks/tabel.

---

## 15. Motion & Interaksi

### 15.1 Prinsip

1. **Bermakna** — animasi menjelaskan alur (material → nilai → dampak).
2. **Halus dan cepat** — 150–400 ms untuk mikro-interaksi; hingga 800 ms untuk momen signature.
3. **Hanya `transform` dan `opacity`** untuk animasi utama.
4. **Hormati `prefers-reduced-motion`** — ganti dengan fade/statik.
5. **Progressive enhancement** — konten utuh tanpa animasi.

Easing standar: `cubic-bezier(0.22, 1, 0.36, 1)`; stagger 60–90 ms.

### 15.2 Momen animasi

| Momen | Deskripsi | Prio |
| --- | --- | --- |
| Hero masuk | Teks → visual → CTA bertahap; elemen koin/loop bergerak ringan | P0 |
| Material Discovery | Kartu naik + zoom foto saat hover; label muncul | P0 |
| **Journey scroll-linked** | Garis perjalanan terisi mengikuti scroll; tiap tahap memicu mikro-animasi | P0 |
| Scanner | Garis pindai melintas kartu; label muncul; angka *reveal* bertahap | P0 |
| Count-up uang | Penghitung angka dengan `tabular-nums` | P0 |
| Garden grow | Elemen tumbuh (scale + path draw); kenaikan tahap | P0 |
| Status timeline | Progres garis & ikon saat status berubah | P0 |
| Toast & drawer | Slide + fade | P0 |
| Transisi halaman | Fade/slide singkat antar rute | P1 |
| Leaderboard | Perubahan peringkat dengan *layout animation* | P2 |

### 15.3 Anggaran performa animasi

Maks 1 animasi berat per viewport; jeda animasi di luar viewport (`IntersectionObserver`); efek 3D hanya P2, *lazy-load*, dengan fallback statis.

### 15.4 Interaksi

Setiap interaksi hover memiliki padanan fokus/ketuk; Dialog, Tabs, SlotPicker, dan peta dapat dioperasikan dengan keyboard; gestur geser hanya tambahan.

---

## 16. Konten & Microcopy

### 16.1 Prinsip

Bahasa Indonesia sehari-hari, ringkas, aktif. Istilah baku: **Estimasi**, **Indikatif**, **Dalam proses**, **Terkonfirmasi**. Hindari janji absolut.

### 16.2 Contoh teks kunci

| Konteks | Teks |
| --- | --- |
| Label estimasi | "Estimasi nilai — bisa berbeda saat material ditimbang mitra." |
| Label harga mitra | "Harga indikatif per [tanggal]. Harga final dikonfirmasi mitra saat permintaan diterima." |
| Hasil Scanner | "Material kamu berpotensi bernilai sekitar ≈ Rp 6.400–10.600." |
| Nilai rendah | "Nilai jualnya kecil, tapi tetap bermanfaat bila disalurkan dengan benar." |
| Harga basi | "Harga ini belum diperbarui sejak [tanggal]. Hubungi mitra untuk memastikan." |
| Pemeriksaan | "Memeriksa data harga acuan…" (bukan "Mengenali gambar…") |
| Taman kosong | "Tamanmu masih bibit. Salurkan material pertamamu untuk menumbuhkannya." |
| Emisi tersedia | "Estimasi emisi yang berpotensi dihindari: … (berdasarkan faktor [sumber, tahun])." |
| Emisi tidak tersedia | "Faktor perhitungan untuk material ini belum tersedia, jadi belum ditampilkan." |
| Wallet | "Ini catatan hasil penyaluranmu — pembayaran dilakukan langsung antara kamu dan mitra." |
| Konfirmasi timbang | "Mitra sudah menimbang materialmu. Cek rinciannya, lalu konfirmasi atau ajukan keberatan." |
| Kedaluwarsa | "Mitra belum menanggapi. Kamu bisa mengajukan ke mitra lain." |
| 404 | "Halaman ini sudah didaur ulang. Kembali ke beranda?" |

### 16.3 Pesan error

- Berat kosong: "Masukkan berat material dulu, ya."
- Terlalu kecil: "Berat minimal 0,1 kg."
- Terlalu besar: "Berat maksimal per item 500 kg. Untuk jumlah lebih besar, hubungi mitra."
- Di luar area: "Alamatmu belum masuk area layanan mitra ini. Coba mitra lain atau antar langsung."
- Filter kosong: "Belum ada mitra yang cocok. Coba longgarkan filter."

---

## 17. Tech Stack & Arsitektur Teknis

### 17.1 Prinsip pemilihan

Optimal untuk **frontend visual premium** sekaligus memadai sebagai produk produksi: satu basis kode TypeScript end-to-end, performa tinggi, aksesibilitas kuat, dan operasional sederhana untuk tim kecil.

### 17.2 Stack yang direkomendasikan

| Lapisan | Pilihan | Alasan |
| --- | --- | --- |
| Framework | **Next.js (App Router)** — versi stabil terbaru saat inisiasi | SSG/ISR/SSR, routing, optimasi gambar/font, Server Actions & Route Handlers |
| UI | **React** (sesuai Next.js) | Ekosistem komponen & animasi |
| Bahasa | **TypeScript** (`strict`) | Keamanan tipe untuk domain, uang, dan status |
| Styling | **Tailwind CSS v4** + CSS variables untuk token | Cepat, konsisten, responsif |
| Primitif UI | **Radix UI** (headless) | Aksesibilitas tanpa memaksakan gaya |
| Animasi | **Motion** (Framer Motion) + **GSAP/ScrollTrigger** (journey) ; Lenis opsional | Layout animation, scroll-linked, reduced-motion |
| Grafik | **Recharts** (custom) + SVG kustom | Wallet & statistik; Garden dibuat SVG sendiri |
| State klien | **Zustand** (UI & keranjang tamu) | Ringan |
| State server | **TanStack Query** | Cache, polling status, mutasi optimistik |
| Form & validasi | **React Hook Form** + **Zod** (skema dibagi klien & server) | Satu sumber skema |
| Tanggal | **date-fns** (locale `id`) | Format & kalkulasi |
| Database | **PostgreSQL** (+ **PostGIS** untuk geospasial) | Relasional, transaksi, query area/jarak |
| ORM & migrasi | **Prisma** atau **Drizzle** | Tipe aman, migrasi terversi |
| Autentikasi | **Auth.js** (magic link email + Google) | Tanpa kata sandi |
| Penyimpanan berkas | Object storage S3-kompatibel (mis. Cloudflare R2 / Supabase Storage) | Logo mitra, lampiran foto privat |
| Email | Penyedia transaksional (mis. Resend/Postmark) | Magic link & notifikasi |
| Cache & rate limit | **Redis** (mis. Upstash) | Pembatasan laju, antrean ringan |
| Job terjadwal | Cron platform / worker kecil | SLA, auto-konfirmasi, pengingat |
| Peta | **MapLibre GL** + penyedia tiles/geocoding | Peta interaktif (P1); direktori memakai daftar + jarak pada P0 |
| Observabilitas | **Sentry** (error), log terstruktur, uptime monitor | Deteksi dini |
| Analitik | Analitik berfokus privasi (mis. Plausible/PostHog) | Tracking plan (Bagian 19) |
| Ikon | Phosphor/Lucide + SVG kustom | Konsistensi |
| Font | `next/font` | Self-host, performa |
| Testing | Vitest, Testing Library, Playwright, axe-core | Unit, komponen, E2E, a11y |
| CI/CD | GitHub Actions + preview deployment | Kualitas & rilis terotomasi |
| Hosting | Vercel (atau setara) + Postgres terkelola | Operasional ringan |
| Manajer paket | pnpm | Cepat & hemat ruang |

> Penyedia pada kolom "Pilihan" bersifat usulan; keputusan akhir mengikuti biaya, lokasi data, dan kebijakan (Q-08).

### 17.3 Arsitektur logis

```
 Browser (Next.js client: React, Tailwind, Motion)
        │  HTTPS
 Next.js server (App Router)
   ├─ Halaman publik: SSG/ISR (landing, material, edukasi, profil mitra)
   ├─ Halaman akun/portal/admin: SSR dinamis + Client Components
   ├─ Route Handlers /api/v1/*  ─► Service layer ─► Repositori (ORM) ─► PostgreSQL (+PostGIS)
   │                                   ├─► Redis (rate limit, antrean)
   │                                   ├─► Object storage (lampiran, logo)
   │                                   └─► Penyedia email
   └─ Job terjadwal (SLA, auto-konfirmasi, pengingat, peringatan harga basi)
```

### 17.4 Strategi rendering

| Area | Strategi |
| --- | --- |
| Beranda, Material, Edukasi, Metodologi, Profil mitra | SSG/ISR (revalidasi saat data berubah) |
| Marketplace (direktori) | ISR + data dinamis sisi klien untuk filter/jarak |
| Pindai | SSG shell + Client Components; kalkulasi lewat fungsi bersama |
| Keranjang, Salur, Dompet, Taman, Komunitas | SSR dinamis (terautentikasi) + Client Components |
| Portal Mitra, Admin | SSR dinamis; Client Components untuk formulir & tabel |
| Garden, Chart, Peta | `dynamic import` (lazy) dengan skeleton |

### 17.5 Struktur proyek (usulan)

```
elovia/
├─ prisma/ (schema, migrations, seed)
├─ public/ (images, icons, og)
├─ src/
│  ├─ app/
│  │  ├─ (publik)/  page.tsx, pindai, material, pasar, edukasi, metodologi, tentang, bantuan
│  │  ├─ (akun)/    keranjang, salur, dompet, taman, komunitas, akun, notifikasi
│  │  ├─ mitra/     dashboard, permintaan, harga, jadwal, profil
│  │  ├─ admin/     material, harga-acuan, faktor-emisi, mitra, permintaan, pengguna, audit, pengaturan
│  │  ├─ api/v1/    route handlers
│  │  └─ globals.css  (token CSS)
│  ├─ components/ (ui, layout, landing, scanner, marketplace, pickup, wallet, garden, champions, portal, admin)
│  ├─ features/   (logika per modul: hooks, selectors)
│  ├─ server/     (services, repositories, auth, jobs, mailers, authz)
│  ├─ lib/        (calc, format, geo, garden, validation/zod)
│  ├─ store/      (zustand)
│  ├─ types/
│  └─ config/     (parameter default, feature flags)
├─ tests/ (unit, integration, e2e)
└─ README.md, .env.example
```

### 17.6 Prinsip arsitektur kode

1. **Domain logic murni** (kalkulasi, state machine, peringkat) di `lib/` dan `server/services`, teruji unit; tidak bergantung pada UI/ORM.
2. **Satu sumber skema** (Zod) untuk validasi klien dan server.
3. **Server sebagai otoritas:** nilai, status, dan hak akses selalu divalidasi ulang di server.
4. **Transaksi database** untuk transisi status yang menyentuh ledger, garden, dan peringkat (atomik).
5. **Idempoten** untuk aksi berisiko duplikasi (pengajuan, konfirmasi, job).
6. **Derived state** dihitung (selector/query), bukan disimpan ganda, kecuali untuk performa terukur (mis. materialisasi peringkat).
7. **Token desain tunggal** di CSS variables yang diekspos ke Tailwind.
8. **Feature flag** untuk rilis bertahap.

---

## 18. Kebutuhan Non-Fungsional

### 18.1 Performa

| Metrik | Target (mobile, 4G simulasi) |
| --- | --- |
| LCP | ≤ 2,5 dtk |
| INP | ≤ 200 ms |
| CLS | ≤ 0,1 |
| TBT | ≤ 200 ms |
| JS awal rute landing (gzip) | ≤ ~200 KB (di luar chunk lazy) |
| Total gambar landing | ≤ ~1,5 MB |
| Lighthouse Performance (halaman publik) | ≥ 90 |
| Latensi API p95 (baca) / (tulis) | ≤ 300 ms / ≤ 600 ms |

**Taktik:** SSG/ISR, `next/font`, AVIF/WebP, prioritas LCP, lazy-load Garden/Chart/Peta, *code-splitting* per rute, indeks DB tepat, cache edge untuk data publik.

### 18.2 Kapasitas & skalabilitas

Asumsi awal untuk dimensi sistem (divalidasi setelah pilot): hingga **10.000 pengguna aktif bulanan**, **200 pengguna bersamaan**, **500 pengajuan/hari**. Arsitektur stateless memungkinkan penskalaan horizontal; basis data dapat ditingkatkan vertikal dan diberi *read replica* bila perlu.

### 18.3 Keandalan & pemulihan

| Aspek | Target |
| --- | --- |
| Ketersediaan produksi | ≥ 99,5% per bulan |
| Backup basis data | Harian otomatis + *point-in-time recovery* |
| RPO / RTO | ≤ 24 jam / ≤ 4 jam *(target awal; sesuaikan kemampuan penyedia)* |
| Kegagalan layanan eksternal (email/peta) | Degradasi anggun; antrean ulang untuk email |
| Idempotensi job | Job aman dijalankan ulang |

### 18.4 Keamanan

- **Otorisasi server-side** pada setiap sumber daya; uji *Insecure Direct Object Reference* pada semua endpoint.
- Validasi dan sanitasi seluruh input (Zod); *output encoding* bawaan React; **CSP** ketat; header keamanan (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- Perlindungan CSRF untuk mutasi; cookie sesi `HttpOnly`/`Secure`/`SameSite`.
- **Rate limiting** pada login, estimasi, pengajuan, unggah.
- Unggahan: validasi tipe & ukuran, pembersihan metadata (EXIF), penyimpanan privat dengan URL bertanda tangan berumur pendek.
- Manajemen rahasia melalui variabel lingkungan terkelola; tidak ada rahasia di repo; rotasi berkala.
- Pemindaian dependensi otomatis (mis. Dependabot) dan *lockfile* terkunci.
- **Audit log** untuk aksi admin/mitra dan perubahan data sensitif.
- Mitigasi penyalahgunaan: deteksi pengajuan spam/duplikat, batas permintaan aktif per pengguna, mekanisme pelaporan.
- Peninjauan terhadap risiko OWASP Top 10 sebelum rilis pilot; uji penetrasi ringan bila memungkinkan.

### 18.5 Privasi & kepatuhan data pribadi

- Kepatuhan terhadap **UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022)**; **tinjauan hukum** atas Kebijakan Privasi dan Syarat & Ketentuan sebelum peluncuran.
- **Minimisasi data:** hanya nama panggilan, email, telepon (untuk koordinasi), dan alamat (untuk jemput).
- **Persetujuan** tercatat (versi dokumen & waktu); preferensi notifikasi dapat diubah.
- **Perlindungan alamat:** mitra hanya melihat area perkiraan sebelum konfirmasi; alamat lengkap setelah *Dikonfirmasi* dan hanya pada permintaan terkait.
- **Hak pengguna:** akses, koreksi, unduh, dan penghapusan data.
- **Retensi:** alamat pada permintaan selesai dianonimkan setelah 12 bulan (default); log akses dibatasi masa simpannya.
- Peringkat dan taman publik bersifat **opt-in** dan tanpa data pribadi; nama tampil default pseudonim.
- Lokasi pengguna hanya diproses atas izin eksplisit dan tidak disimpan di luar kebutuhan penyaluran.

### 18.6 Aksesibilitas (WCAG 2.2 AA)

Landmark semantik dan urutan heading logis; *skip link*; semua kontrol dapat diakses keyboard dengan fokus terlihat; `aria-live` untuk hasil Scanner dan perubahan status; label & pesan error terhubung (`aria-describedby`); alt text bermakna; grafik dan Garden dengan alternatif teks/tabel; target sentuh ≥ 44 px; dukungan `prefers-reduced-motion`; diuji dengan pembaca layar pada alur inti.

### 18.7 Kompatibilitas & responsivitas

Chrome, Edge, Firefox, Safari (macOS/iOS) dua versi mayor terakhir dan Android Chrome. Uji pada 360×640, 390×844, 768×1024, 1024×768, 1366×768, 1920×1080. Tidak ada *horizontal scroll* tak disengaja; tabel lebar scroll di dalam kontainer sendiri atau menjadi kartu di mobile.

### 18.8 SEO & berbagi

Halaman publik (landing, material, edukasi, metodologi, profil mitra) dapat diindeks dengan metadata unik, `sitemap.xml`, `robots.txt`, dan data terstruktur (Organization/WebSite/LocalBusiness untuk mitra yang menyetujui). Area akun, portal, dan admin ditandai `noindex`.

### 18.9 Observabilitas

Error tracking dengan konteks rilis; log terstruktur dengan *correlation ID*; metrik inti (jumlah pengajuan, waktu respons, kegagalan job, latensi API); peringatan untuk ambang kritis (job gagal, lonjakan error, kegagalan email, DB hampir penuh); halaman status internal.

### 18.10 Internasionalisasi

Default `id-ID`; seluruh teks UI dipusatkan agar tambahan bahasa (EN) tidak memerlukan perubahan struktural (P2).

---

## 19. Analitik & Tracking Plan

**Prinsip:** privasi dulu — tanpa data pribadi pada event; persetujuan sesuai kebijakan; nama event konsisten (`objek_aksi`).

| Event | Properti kunci | Tujuan |
| --- | --- | --- |
| `landing_cta_clicked` | cta_id, section | Efektivitas halaman |
| `material_selected` | category, material | Minat material |
| `estimate_calculated` | material, weight_bucket, grade, price_stale | Aktivasi |
| `howitworks_opened` | — | Minat transparansi |
| `basket_item_added` | material | Konversi |
| `partner_listed` | filter_set, result_count | Kualitas pencarian |
| `partner_compared` | count | Perilaku evaluasi |
| `partner_selected` | partner_type | Konversi |
| `request_submitted` | method, partner_type, item_count | Konversi inti |
| `request_status_changed` | to_status, duration_bucket | Kinerja layanan |
| `request_completed` | total_kg_bucket | Penyelesaian |
| `garden_viewed` | stage | Keterlibatan |
| `achievement_unlocked` | code | Retensi |
| `group_joined` / `challenge_joined` | kind | Komunitas |
| `signup_completed` | method | Akuisisi |
| `error_displayed` | code, area | Kualitas |

**Corong utama:** Landing → Estimasi → Keranjang → Pilih mitra → Ajukan → Dikonfirmasi → Selesai → Penyaluran kedua.

---

## 20. Strategi QA & Pengujian

### 20.1 Piramida pengujian

| Level | Cakupan | Alat |
| --- | --- | --- |
| Unit | Kalkulasi, state machine, peringkat, format, validasi | Vitest |
| Integrasi | Service + DB (transaksi, otorisasi, job) | Vitest + DB uji |
| Komponen | ValueStatusBadge, WeightInput, StatusTimeline, PartnerCard, forms | Testing Library |
| E2E | Alur kritis lintas peran | Playwright |
| Aksesibilitas | Seluruh halaman | axe-core + audit manual keyboard/pembaca layar |
| Performa | Landing, Pindai, Pasar | Lighthouse CI |
| Keamanan | Otorisasi, input, header, dependensi | Uji IDOR, SAST/dep-scan, tinjauan OWASP |
| UAT | Pengguna & mitra pilot | Skenario terstruktur |

### 20.2 Kasus uji unit penting

| ID | Kasus | Hasil diharapkan |
| --- | --- | --- |
| UT-01 | Kardus, 5 kg, B, 1.500–2.500 | Rp 6.400–10.600 |
| UT-02 | 0,1 kg, kualitas C | Rentang valid, tidak negatif |
| UT-03 | Biaya > nilai kotor | Nilai bersih = 0 |
| UT-04 | Input "2,5" dan "2.5" | Keduanya 2,5 kg |
| UT-05 | Berat 0 / negatif / 501 | Ditolak dengan pesan |
| UT-06 | Material tanpa faktor emisi | Emisi "—", tidak dijumlah |
| UT-07 | Total 10 kg *Selesai* | Membuka *First 10 kg Recycled* & tahap *Rimbun* |
| UT-08 | Kontribusi *Dalam proses* | Tidak masuk peringkat/taman |
| UT-09 | Estimasi + terkonfirmasi | Tidak pernah dijumlahkan |
| UT-10 | Transisi status tidak valid | Ditolak oleh state machine |
| UT-11 | Harga lebih tua dari ambang sembunyi | Tidak tampil/tidak dipakai |
| UT-12 | Pengajuan dikirim dua kali (idempotency key sama) | Satu pengajuan terbentuk |

### 20.3 Skenario E2E

1. **Alur inti:** Landing → Pindai (PET 2 kg, A) → Tambah ke keranjang → Pasar (bandingkan 2–3 mitra) → Pilih mitra → Login → Wizard (jadwal) → Ajukan → Mitra konfirmasi → Mitra timbang → Pengguna konfirmasi → Selesai → Dompet menampilkan transaksi *Terkonfirmasi* → Taman bertambah.
2. **Auto-konfirmasi:** tanpa respons 48 jam → *Selesai* otomatis.
3. **Kedaluwarsa & tolak:** mitra tidak merespons / menolak → opsi ajukan ke mitra lain; item kembali ke keranjang.
4. **Pembatalan:** sebelum dikonfirmasi dan setelahnya (dalam batas) → tidak ada efek ledger/garden.
5. **Otorisasi:** pengguna A tidak dapat mengakses permintaan pengguna B; mitra tidak melihat alamat lengkap sebelum konfirmasi.
6. **Keranjang tamu → login:** penggabungan tanpa duplikasi.
7. **Harga basi:** harga melewati ambang → label & penyembunyian sesuai aturan.
8. **Reduced motion & keyboard-only:** seluruh alur inti dapat diselesaikan.
9. **Persistensi lintas perangkat:** keranjang akun muncul di perangkat lain.

### 20.4 Definition of Done (per fitur)

1. Memenuhi seluruh AC dan kebutuhan terkait.
2. Responsif 360–1920 px dan lolos uji keyboard + axe.
3. Memiliki keadaan memuat, kosong, error, dan tanpa izin.
4. Logika bisnis memiliki unit/integrasi test; otorisasi teruji.
5. Event analitik terpasang sesuai tracking plan.
6. Tidak menurunkan metrik performa di bawah target.
7. Microcopy ditinjau (kejujuran & konsistensi istilah).
8. Dokumentasi teknis dan *changelog* diperbarui.

---

## 21. DevOps, Lingkungan & Rilis

### 21.1 Lingkungan

| Lingkungan | Tujuan | Data |
| --- | --- | --- |
| Lokal | Pengembangan | Seed |
| Preview (per PR) | Review visual & fungsional | Seed |
| Staging | UAT & uji integrasi | Data uji berlabel |
| Produksi | Pengguna nyata | Data nyata |

Variabel lingkungan terpisah per lingkungan; **tidak ada** data atau kredensial produksi di lingkungan lain.

### 21.2 CI/CD

- Pada setiap PR: *lint*, *typecheck*, unit & integrasi test, build, Playwright (alur kritis), axe, Lighthouse CI, pemindaian dependensi.
- Merge ke `main` → deploy otomatis ke staging; **produksi dengan persetujuan** (rilis terkontrol).
- Migrasi basis data terversi, dijalankan otomatis dan **backward-compatible** (expand → migrate → contract).
- *Rollback* cepat (versi aplikasi sebelumnya) dan rencana pemulihan data.

### 21.3 Strategi rilis

Feature flag + rilis bertahap: (1) internal, (2) mitra pilot + pengguna undangan, (3) publik di wilayah pilot, (4) perluasan wilayah. Setiap tahap memiliki kriteria lolos berbasis metrik (error rate, completion rate, waktu respons mitra).

### 21.4 Operasional

- **Runbook:** insiden, rollback, restore backup, penangguhan mitra, penghapusan data atas permintaan.
- **Dukungan:** kanal bantuan untuk pengguna & mitra dengan SLA internal dan template jawaban.
- **Pemeliharaan data:** peninjauan mingguan harga basi, antrean onboarding mitra, dispute, dan laporan konten.
- **Pemantauan biaya** infrastruktur dengan alert ambang.

---

## 22. Roadmap, Tim & Kesiapan Operasional

### 22.1 Fase pengembangan

> Estimasi untuk tim kecil (≈ 2 developer, 1 desainer, 1 koordinator operasional/mitra); divalidasi pada Fase 0.

| Fase | Fokus | Keluaran utama | Estimasi |
| --- | --- | --- | --- |
| **F0** | Discovery & desain | Keputusan Q-01…Q-10, alur & wireframe, design system v1, arsitektur & skema DB | 3 minggu |
| **F1** | Fondasi | Repo, CI/CD, auth, layout global, token & komponen dasar, skema DB & seed, observabilitas | 2 minggu |
| **F2** | Publik & Scanner | Landing 7 section, katalog material, Scanner + kalkulasi (teruji), keranjang, Metodologi, legal | 4 minggu |
| **F3** | Marketplace & Admin dasar | Direktori mitra, filter, perbandingan, profil mitra, admin material/harga/mitra/emisi | 4 minggu |
| **F4** | Core loop | Wizard penyaluran, Portal Mitra dasar, state machine & job, EcoWallet dasar, Impact Garden, notifikasi email | 6 minggu |
| **F5** | Hardening & pilot | Performa, aksesibilitas, keamanan, UAT, perbaikan, kesiapan operasional | 3 minggu |
| **Peluncuran pilot (R1)** | — | Rilis di wilayah pilot | — |
| **R2** | Retensi & efisiensi | Champions, grafik wallet, peta interaktif, dispute, kapasitas slot, lampiran foto, dashboard & laporan admin, CMS edukasi | ≈ 8–10 minggu |
| **R3** | Perluasan | WhatsApp, PWA, i18n, evaluasi pembayaran, eksplorasi klasifikasi gambar, API mitra | Menyesuaikan |

**Total menuju R1 ≈ 22 minggu** (estimasi awal; jalur kritis: F4 dan kesiapan mitra).

### 22.2 Gate per fase

| Gate | Syarat |
| --- | --- |
| G0 | PRD, desain alur, skema DB, dan keputusan kunci disetujui |
| G1 | Pipeline CI/CD & lingkungan siap; auth berfungsi; komponen dasar siap |
| G2 | Scanner & Landing lolos AC; kalkulasi teruji; konten Metodologi final |
| G3 | Direktori & admin data berfungsi dengan data nyata awal |
| G4 | Core loop end-to-end lolos E2E pada staging |
| G5 | Target performa, aksesibilitas, dan keamanan terpenuhi; UAT disetujui; kriteria siap peluncuran (8.3) terpenuhi |

### 22.3 Kesiapan operasional (paralel dengan pengembangan)

| Aliran kerja | Isi | Penanggung jawab (usulan) |
| --- | --- | --- |
| Onboarding mitra | Identifikasi, verifikasi, pelatihan penggunaan portal, pengisian harga & syarat | Koordinator operasional |
| Data harga | Sumber, metode pengamatan, jadwal pembaruan | Operasional |
| Faktor emisi | Pemilihan sumber yang dapat dipertanggungjawabkan | Operasional + produk |
| Konten | Panduan pemilahan, FAQ, artikel edukasi, copy | Produk/konten |
| Fotografi & aset | Foto material, ilustrasi, logo final, lisensi | Desain |
| Legal | Kebijakan Privasi, Syarat & Ketentuan, perjanjian kemitraan | Produk + penasihat hukum |
| Dukungan | Kanal, template, SLA | Operasional |
| Komunikasi peluncuran | Materi sosialisasi pilot | Produk/komunikasi |

### 22.4 Peran tim (usulan)

| Peran | Tanggung jawab |
| --- | --- |
| Product owner | Prioritas, keputusan produk, penerimaan |
| Desainer UI/UX | Riset ringan, wireframe, design system, aset visual |
| Developer frontend | UI, animasi, aksesibilitas |
| Developer backend/full-stack | API, DB, job, keamanan |
| QA (dapat dirangkap) | Skenario uji, otomasi, UAT |
| Koordinator operasional | Mitra, data, dukungan |

---

## 23. Risiko & Mitigasi

| # | Risiko | Dampak | Kemungkinan | Mitigasi |
| --- | --- | --- | --- | --- |
| R1 | Adopsi mitra rendah atau mitra tidak aktif memperbarui harga | Tinggi | Sedang | Onboarding terdampingi; portal sederhana & mobile; pengingat harga; metrik layanan; kriteria minimum mitra sebelum peluncuran |
| R2 | Harga basi/tidak akurat menurunkan kepercayaan | Tinggi | Tinggi | Stempel waktu, aturan kebasian, alert admin, penyembunyian otomatis, sumber harga acuan terdokumentasi |
| R3 | Selisih timbangan/kualitas memicu dispute | Sedang | Sedang | Jendela konfirmasi, rincian transparan, alur keberatan (R2), metrik dispute, panduan kualitas yang jelas |
| R4 | No-show penjemputan | Sedang | Sedang | Pengingat, lead time, pembatalan terstruktur, metrik no-show per mitra/pengguna |
| R5 | Kebocoran data pribadi (alamat/telepon) | Tinggi | Rendah | Perlindungan alamat bertahap, otorisasi ketat, enkripsi transit & at-rest, audit log, pengujian IDOR |
| R6 | Klaim dampak/emisi tanpa dasar | Tinggi | Sedang | Hanya tampilkan bila faktor bersumber; label estimasi; halaman Metodologi; tinjauan konten |
| R7 | Penyalahgunaan (pengajuan palsu, manipulasi peringkat) | Sedang | Sedang | Rate limit, verifikasi timbangan mitra, deteksi anomali, batas wajar, moderasi |
| R8 | Cakupan terlalu luas dan jadwal molor | Tinggi | Sedang | Prioritas P0/P1/P2, gate fase, fitur flag, MVP ketat |
| R9 | Pengguna mengira EcoWallet adalah dompet pembayaran | Sedang | Sedang | Penamaan dan microcopy jelas, penegasan "catatan hasil", pembayaran langsung dengan mitra |
| R10 | Animasi berat menurunkan performa di ponsel | Sedang | Sedang | Anggaran animasi, lazy-load, fallback reduced-motion, Lighthouse CI |
| R11 | Biaya infrastruktur membengkak | Sedang | Rendah | Arsitektur sederhana, cache edge, pemantauan biaya |
| R12 | Ketergantungan pada penyedia pihak ketiga (email, peta, auth) | Sedang | Sedang | Abstraksi layanan, antrean ulang, rencana alternatif penyedia |
| R13 | Aset/foto tanpa lisensi jelas | Sedang | Sedang | Foto sendiri atau lisensi bebas, halaman Kredit & Lisensi |
| R14 | Kepatuhan data pribadi dan legal belum memadai | Tinggi | Sedang | Tinjauan hukum sebelum peluncuran, rekam persetujuan, prosedur hak subjek data |
| R15 | Ketergantungan pada satu-dua orang kunci | Sedang | Sedang | Dokumentasi, README, runbook, review kode bersama |
| R16 | Cakupan wilayah terlalu luas untuk jumlah mitra | Sedang | Sedang | Mulai dari satu wilayah pilot; perluasan bertahap berbasis metrik |

---

## 24. Keputusan & Pertanyaan Terbuka

### 24.1 Keputusan yang ditetapkan dalam PRD ini

| ID | Keputusan |
| --- | --- |
| D-01 | Nama produk **ELOVIA** (Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam); tagline *A New Value for Every Resource.* |
| D-02 | Fokus pengguna awal: **masyarakat umum & rumah tangga**; mitra sebagai penyalur dengan portal sendiri |
| D-03 | Arah visual: **Light mode — Fresh Green Tech** (putih bersih, hijau adem, bertema *green tech & sustainable environment*) |
| D-04 | Identitas utama: **Waste-to-Value Journey** (4 tahap) |
| D-05 | Versi 1 **tidak memproses pembayaran**; penyelesaian langsung pengguna–mitra; EcoWallet = ledger pencatatan |
| D-06 | Tiga status nilai (*Estimasi / Dalam proses / Terkonfirmasi*) wajib konsisten dan tidak dijumlahkan |
| D-07 | Estimasi tampil sebagai **rentang**; perhitungan kanonik di server |
| D-08 | Garden, ledger terkonfirmasi, dan peringkat hanya dari transaksi **Selesai** |
| D-09 | Autentikasi tanpa kata sandi: magic link + Google |
| D-10 | Identifikasi material manual; **tanpa klaim pengenalan gambar** pada versi 1 |
| D-11 | Alamat lengkap hanya terbuka bagi mitra setelah *Dikonfirmasi* |
| D-12 | Auto-konfirmasi hasil timbang setelah 48 jam tanpa keberatan |
| D-13 | Stack: Next.js (App Router), TypeScript, Tailwind v4, PostgreSQL, Auth.js, Radix, Motion |
| D-14 | Rilis bertahap R1 (P0) → R2 (P1) → R3 (P2) dengan feature flag |
| D-15 | Sapaan UI "kamu" (informal-sopan) — dapat diubah |

### 24.2 Pertanyaan terbuka

| ID | Pertanyaan | Dibutuhkan sebelum |
| --- | --- | --- |
| Q-01 | **Wilayah pilot** dan target jumlah mitra awal (usulan ≥ 5 mitra, ≥ 2 per kategori)? | F0 |
| Q-02 | **Model bisnis/pendanaan** (gratis, komisi, langganan mitra, hibah) — memengaruhi syarat, laporan, dan roadmap pembayaran | F0 |
| Q-03 | Entitas hukum penyelenggara, kontak resmi, dan perjanjian kemitraan dengan mitra? | F2 |
| Q-04 | Kriteria **verifikasi mitra** (dokumen, survei lokasi, referensi)? | F3 |
| Q-05 | Sumber **harga acuan** dan **faktor emisi** yang akan dipakai (agar dapat diperiksa)? | F2 |
| Q-06 | Bahasa final: seluruh UI Indonesia, atau hero/nama fitur tetap Inggris seperti identitas brand? (PRD ini: body Indonesia, hero & nama fitur Inggris) | F0 |
| Q-07 | Tagline Indonesia pendamping ("Sampahmu, rupiahmu.") dipakai atau tidak? | F2 |
| Q-08 | Penyedia infrastruktur final (hosting, DB, email, peta, storage) dan lokasi data? | F0 |
| Q-09 | Kebijakan retensi data dan prosedur permintaan hak subjek data (hasil tinjauan hukum)? | F5 |
| Q-10 | Domain, kanal dukungan (email/WhatsApp), dan identitas visual final (logo)? | F1 |
| Q-11 | Sumber & kepemilikan foto (foto sendiri vs lisensi bebas)? | F2 |
| Q-12 | Versi 1 hanya *light mode*. Apakah mode gelap opsional perlu dipertimbangkan pada rilis berikutnya? | F0 |

---

## 25. Lampiran

### Lampiran A — Matriks keterlacakan (konsep → PRD)

| Elemen konsep | Bagian PRD |
| --- | --- |
| Platform ekonomi sirkular; sampah → nilai ekonomi dari masyarakat untuk masyarakat | 1, 3 |
| Informasi harga, pencocokan mitra, penjemputan, pencatatan | 1.4, 7, 10 |
| Tidak semua sampah menghasilkan uang; transparansi sebagai keunggulan | 1.2, 6, 7.4, 10.13 |
| Waste-to-Value Journey (Waste → Identify & Value → Connect & Exchange → Value Created) | 7, 10.2 |
| Waste Value Scanner | 10.4 |
| Recycle Marketplace (harga indikatif vs terkonfirmasi) | 10.6, 11.1 |
| Pickup & Drop-off | 10.7, 11.2 |
| EcoWallet (estimasi vs proses vs terkonfirmasi) | 10.9, 11.1 |
| Impact Garden (visual motivasi; emisi bersyarat) | 10.10, 11.4, 11.6 |
| Circular Champions (kontribusi terverifikasi) | 10.11, 11.7 |
| Arah visual light mode: Fresh Green Tech (green tech & sustainable environment) | 14 |
| Homepage 7 section | 10.2 |
| Prioritas implementasi | 8 |
| Kejujuran terhadap kemampuan sistem | 6, 3.3, 10.4 |
| Kesan brand (dekat dengan masyarakat, ekonomis, mudah dipahami) | 4.2 |
| Fokus pengguna awal: masyarakat umum & rumah tangga | 1.3, 5 |
| Arah dampak (pengurangan sampah, pemanfaatan sumber daya, kontribusi iklim terukur) | 3.2, 10.10, 11.4 |

### Lampiran B — Glosarium

| Istilah | Arti |
| --- | --- |
| **ELOVIA** | Nama produk: Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam |
| **Waste-to-Value Journey** | Perjalanan 4 tahap dari sampah menjadi nilai |
| **Estimasi** | Perkiraan nilai dari harga acuan, belum diajukan |
| **Harga indikatif** | Harga acuan mitra di profil; bukan penawaran terkonfirmasi |
| **Terkonfirmasi** | Nilai/transaksi berstatus *Selesai* dan tercatat di ledger |
| **Ledger** | Catatan transaksi yang tidak dapat diubah |
| **Bank sampah** | Pengelola/penampung sampah terpilah di tingkat komunitas |
| **Pengepul** | Pihak yang mengumpulkan dan membeli material bekas |
| **Mitra daur ulang** | Pihak yang mengolah material menjadi bahan baku |
| **Faktor kualitas (`Fq`)** | Pengali nilai berdasarkan kebersihan/kondisi |
| **Faktor emisi (`FE`)** | Koefisien emisi per kg material (wajib bersumber) |
| **SLA** | Batas waktu layanan (mis. tanggapan mitra) |
| **Kebasian harga** | Umur data harga sejak pembaruan terakhir |
| **Idempotensi** | Pengulangan permintaan yang sama tidak menimbulkan efek ganda |

### Lampiran C — Panduan pemilahan (konten awal)

> Panduan bersifat umum; selalu ikuti ketentuan masing-masing mitra.

| Kategori | Lakukan | Hindari |
| --- | --- | --- |
| **Paper & Cardboard** | Jaga tetap kering; ratakan kardus; lepas lakban/plastik bila memungkinkan; pisahkan HVS dari koran | Kertas basah/berminyak; tercampur sampah makanan |
| **Plastic** | Kosongkan dan bilas; pisahkan per jenis bila mitra meminta; ratakan botol; lepas tutup/label sesuai syarat mitra | Plastik berminyak/bersisa makanan; mencampur semua jenis tanpa panduan |
| **Metal** | Bilas kaleng; ratakan bila diminta; pisahkan aluminium dari besi | Kaleng bekas bahan berbahaya/bertekanan; logam tajam tanpa dibungkus |
| **Glass** | Bilas dan keringkan; pisahkan bening vs berwarna; bungkus pecahan dengan aman | Mencampur pecahan lampu/keramik/kaca tahan panas dengan botol |

### Lampiran D — Rencana aset

| Aset | Jumlah awal | Catatan |
| --- | --- | --- |
| Foto hero (material tampak atas) | 1–2 | Prioritas foto sendiri |
| Foto kategori (Paper, Plastic, Metal, Glass) | 4–8 | Close-up bertekstur |
| Foto sub-jenis material | 10+ | Untuk katalog & Scanner |
| Ikon material kustom | 10–12 | SVG, stroke konsisten |
| Ilustrasi Journey (4 tahap) | 4 | SVG, dapat dianimasikan |
| Elemen Garden | 5 jenis × 3 tahap | SVG per kategori |
| Logo/wordmark & favicon | 1 set | Varian utama/reversed/mono |
| Gambar Open Graph | 1–3 | 1200×630 |
| Foto/logo mitra | Per mitra | Izin tertulis dari mitra |

### Lampiran E — Daftar periksa kesiapan rilis pilot

- [ ] Seluruh P0 lolos AC dan UAT
- [ ] Mitra pilot aktif dan terlatih; harga & syarat terisi dan bertanggal
- [ ] Tidak ada data uji di produksi
- [ ] Kebijakan Privasi & Syarat & Ketentuan ditinjau dan dipublikasikan
- [ ] Persetujuan pengguna terekam; hak subjek data dapat dilayani
- [ ] Backup & prosedur pemulihan teruji
- [ ] Pemantauan, alert, dan runbook insiden aktif
- [ ] Uji keamanan (otorisasi/IDOR, header, rate limit) selesai
- [ ] Lighthouse & axe memenuhi target
- [ ] Kanal dukungan dan template jawaban siap
- [ ] Halaman Kredit & Lisensi lengkap
- [ ] Analitik dan tracking plan terverifikasi

### Lampiran F — Daftar periksa tinjauan PRD

- [ ] Alur inti dan status disetujui pemilik produk
- [ ] Keputusan D-01…D-15 dikonfirmasi
- [ ] Pertanyaan Q-01…Q-12 mendapat penanggung jawab dan tenggat
- [ ] Prioritas P0/P1/P2 disetujui
- [ ] Estimasi roadmap dan komposisi tim divalidasi

---

*— Akhir dokumen PRD ELOVIA v2.2 —*
