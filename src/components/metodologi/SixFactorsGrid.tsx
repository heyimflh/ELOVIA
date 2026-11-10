'use client';

import { motion, type Variants } from 'framer-motion';
import {
  TrendingUp,
  Sparkles,
  MapPin,
  Scale,
  Calculator,
  ShieldCheck,
} from 'lucide-react';

interface FactorCard {
  number: string;
  title: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  summary: string;
  description: string;
  formulaImpact: string;
}

const FACTORS: FactorCard[] = [
  {
    number: '01',
    title: 'Fluktuasi Pasar B2B',
    tag: 'BASE INDEX',
    icon: TrendingUp,
    badge: 'Indeks Agregat Nasional',
    summary:
      'Menyesuaikan indeks pabrik daur ulang nasional secara berkala dan terverifikasi.',
    description:
      'Harga bahan mentah daur ulang (flake PET, bubur kertas, bijih besi) bergerak mengikuti permintaan industri manufaktur. ELOVIA mengagregasi penawaran pembeli skala industri resmi tanpa potongan sepihak.',
    formulaImpact: 'Menentukan Angka Dasar Harga Pokok (Rp/kg)',
  },
  {
    number: '02',
    title: 'Ketersucian & Kualitas',
    tag: 'QUALITY MULTIPLIER',
    icon: Sparkles,
    badge: 'Pengali 0.65x — 1.00x',
    summary:
      'Material bersih tanpa residu mendapat perkalian harga maksimal.',
    description:
      'Sampah yang dicuci, dikeringkan, dan dipisahkan dari kontaminan (minyak, tanah, sisa cairan) tidak membutuhkan proses pencucian ulang yang mahal di pabrik, sehingga nilai ekonomisnya 100% terjaga.',
    formulaImpact: 'Pengali Mutu: Grade A (1.00x), B (0.85x), C (0.65x)',
  },
  {
    number: '03',
    title: 'Jarak Logistik Penjemputan',
    tag: 'LOGISTICS SLA',
    icon: MapPin,
    badge: 'Efisiensi Rute Terjadwal',
    summary:
      'Efisiensi rute penjemputan armada mitra ELOVIA secara clustering.',
    description:
      'Sistem ELOVIA menggabungkan jadwal penjemputan per klaster zonasi RT/RW untuk menekan konsumsi BBM armada kurir. Warga yang memilih drop-off mandiri ke Bank Sampah dibebaskan 100% dari biaya ini.',
    formulaImpact: 'Pengurang Logistik (Rp 0 - Rp 500/kg)',
  },
  {
    number: '04',
    title: 'Volume & Bobot Kumulatif',
    tag: 'BULK INCENTIVE',
    icon: Scale,
    badge: 'Bonus Skala Ekonomi',
    summary:
      'Setoran dalam kuantitas besar (bulk) mendapatkan insentif bonus tambahan.',
    description:
      'Penyetoran material di atas threshold (misal > 20 kg per transaksi) menurunkan ongkos penanganan per kilogram di fasilitas mitra. Efisiensi skala ini kami kembalikan langsung ke pengguna berupa bonus rate.',
    formulaImpact: 'Insentif Volume Tambahan (+2% s/d +8%)',
  },
  {
    number: '05',
    title: 'Fee Operasional Mitra',
    tag: 'BANK SAMPAH COMPENSATION',
    icon: Calculator,
    badge: 'Fair Labor Standard',
    summary:
      'Kompensasi sortir dan pemrosesan awal di Bank Sampah Mitra.',
    description:
      'Petugas sortir dan pengepresan di bank sampah lokal mendapatkan kompensasi transparan. Margin ini dipatok adil melalui standar platform agar tidak menekan harga yang diterima warga.',
    formulaImpact: 'Transparansi Biaya Pemrosesan Awal',
  },
  {
    number: '06',
    title: 'Carbon Credit & Impact Bonus',
    tag: 'ECOWALLET POINTS',
    icon: ShieldCheck,
    badge: 'Nilai Ekologis Nyata',
    summary:
      'Nilai tambah poin EcoWallet dari reduksi emisi karbon terverifikasi.',
    description:
      'Setiap kilogram material yang terselamatkan dari TPA dikonversi ke faktor emisi GHG resmi (IPCC & KLHK). Nilai reduksi karbon ini dihadiahkan sebagai EcoPoints yang dapat ditukar reward voucher.',
    formulaImpact: 'Bonus Ekologis: EcoPoints + Regenerasi Pohon',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SixFactorsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* ── Section Title (Serif) ── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4E1] border border-[#D5E3BD] text-[#3B5433] text-xs font-bold uppercase tracking-widest mb-3">
          <Scale className="w-3.5 h-3.5 text-[#7EA02A]" />
          <span>DEKONSTRUKSI VARIABEL BIAYA</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1C2E1F] tracking-tight">
          6 Variabel Utama Penentu Harga
        </h2>
        <p className="text-sm sm:text-base text-[#4F674D] max-w-2xl mx-auto mt-3 font-normal">
          Setiap angka yang tertera di aplikasi ELOVIA dapat dipertanggungjawabkan
          berdasarkan 6 parameter objektif berikut.
        </p>
      </div>

      {/* ── Grid of 6 Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FACTORS.map((factor) => {
          const Icon = factor.icon;
          return (
            <motion.div
              key={factor.number}
              variants={cardVariants}
              className="bg-white border border-[#E2EBD3] hover:border-[#7EA02A] rounded-3xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header: Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF4E1] border border-[#D5E3BD] text-[#7EA02A] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAF3] border border-[#DFE8D1] text-[#556F4F] font-bold tracking-wider">
                      {factor.tag}
                    </span>
                    <span className="font-mono text-2xl font-black text-[#D5E3BD] group-hover:text-[#7EA02A] transition-colors">
                      {factor.number}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mb-2">
                  <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EEF4E1] text-[#3B5433] border border-[#D5E3BD]">
                    {factor.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-serif text-[#1C2E1F] mb-2 group-hover:text-[#2E4A1E] transition-colors">
                  {factor.title}
                </h3>

                {/* Summary */}
                <p className="text-xs font-bold text-[#3B5433] mb-2 leading-relaxed">
                  {factor.summary}
                </p>

                {/* Detailed Description */}
                <p className="text-xs text-[#526D48] leading-relaxed font-normal">
                  {factor.description}
                </p>
              </div>

              {/* Bottom Formula Role Impact */}
              <div className="mt-6 pt-4 border-t border-[#EDF3E3] flex items-center justify-between text-[11px]">
                <span className="text-[#6D8A65] font-mono font-medium">Dampak Formula:</span>
                <span className="text-[#1C2E1F] font-bold text-right truncate max-w-[200px]">
                  {factor.formulaImpact}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
