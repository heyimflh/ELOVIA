# ELOVIA — Circular Economy Platform
> **Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam**  
> *A New Value for Every Resource.*

---

## 🌿 Tentang ELOVIA

**ELOVIA** adalah platform web modern untuk ekonomi sirkular yang menghubungkan masyarakat, mitra pengolah limbah, dan industri dalam pengelolaan serta daur ulang sampah berkelanjutan. ELOVIA mengubah limbah menjadi nilai tambah (waste-to-value journey) melalui transparansi data, penjemputan cerdas, marketplace daur ulang terintegrasi, dan visualisasi interaktif 3D.

---

## 🚀 Fitur Utama

- **Interactive 3D & Parallax Experience**: Visualisasi proses pengelolaan limbah berbasis Three.js (`@react-three/fiber`, `@react-three/drei`) dan GSAP ScrollTrigger.
- **Waste-to-Value Booking & Tracking**: Penjemputan limbah terjadwal dengan penentuan lokasi interaktif dan estimasi dampak lingkungan (CO₂ reduction).
- **Circular Marketplace Directory**: Direktori komprehensif mitra daur ulang berlisensi, harga acuan material per kilogram, serta sertifikasi mitra.
- **Smart Material Scanner & Calculator**: Simulasi estimasi nilai ekonomi dan jejak karbon dari material daur ulang (kaca, kertas/karton, logam, plastik).
- **Responsive & Green Tech UI**: Antarmuka modern bernuansa *light clean green tech* yang dioptimalkan untuk mobile dan desktop.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Animations & 3D**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [GSAP](https://greensock.com/gsap/), [Framer Motion](https://www.framer.com/motion/)
- **Maps & Geo**: [Leaflet](https://leafletjs.com/), [MapLibre GL](https://maplibre.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📦 Menjalankan Proyek Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (v18.x atau lebih baru)
- npm atau pnpm

### Instalasi

1. Clone repositori:
```bash
git clone https://github.com/heyimflh/ELOVIA.git
cd ELOVIA
```

2. Instal dependensi:
```bash
npm install
```

3. Jalankan server pengembangan:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Build Produksi

Untuk membuat build produksi:
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori

```text
ELOVIA/
├── public/                 # Aset statis (gambar, 3D models .glb, video, logo)
├── scripts/                # Script utilitas (e.g. frame generators)
├── src/
│   ├── app/                # Next.js App Router (pages & layout)
│   ├── components/         # Komponen UI modular (Hero, Marketplace, Booking, dll.)
│   └── lib/                # Konfigurasi, helper, & utilitas
├── PRD.md                  # Product Requirements Document
├── package.json            # Daftar dependensi & scripts
└── tsconfig.json           # Konfigurasi TypeScript
```

---

## 📄 Lisensi & Kontributor

Dikembangkan untuk **INVOFEST 2026** oleh Tim ELOVIA.

