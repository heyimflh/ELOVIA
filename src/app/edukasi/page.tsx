'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Leaf,
  Sprout,
  ArrowRight,
  ArrowDown,
  Play,
  Clock,
  Recycle,
  Truck,
  Factory,
  Package,
  Box,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Share2,
  Bookmark,
  FileText,
  Check,
} from 'lucide-react';
import { Footer } from '@/components/footer';
import { EdukasiArticlesSection } from '@/components/edukasi';

// ── Types & Data ─────────────────────────────────────────────────────────────

interface LearningPath {
  id: string;
  level: string;
  title: string;
  headline: string;
  description: string;
  colorName: 'emerald' | 'blue' | 'amber' | 'teal';
  duration: string;
  lessonsCount: number;
  icon: typeof Sprout;
  highlights: string[];
  moduleTopics: string[];
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'pemula',
    level: 'Pemula: Panduan Dasar',
    title: '3 Langkah Mudah Pemilahan',
    headline: 'Fondasi Nol Ribet Memilah dari Dapur',
    description:
      'Pelajari prinsip Cuci-Kering-Lipat (CKL) untuk membedakan sampah organik basah, anorganik berharga, dan residu rumah tangga dengan efisien.',
    colorName: 'emerald',
    duration: '15 Menit',
    lessonsCount: 4,
    icon: Sprout,
    highlights: [
      'Metode CKL (Cuci-Kering-Lipat)',
      '6 Kategori Pemilahan Berstandar SNI',
      'Penyimpanan Bebas Bau & Hama',
    ],
    moduleTopics: [
      'Pemisahan Dapur: Sisa Makanan vs Anorganik',
      'Cara Mencuci Botol & Kotak Susu UHT',
      'Wadah Kering Tanpa Kantong Plastik Baru',
      'Checklist Pemilahan Pertama Keluarga',
    ],
  },
  {
    id: 'menengah',
    level: 'Menengah: Ekonomi Sirkular 101',
    title: 'Mengapa sampahmu berharga?',
    headline: 'Menautkan Sampah ke Rantai Pasok Industri',
    description:
      'Kupas tuntas kode resin plastik #1-#7, klasifikasi kardus lembaran, dan bagaimana sistem penentuan harga acuan ELOVIA mengonversi sampah menjadi saldo dompet.',
    colorName: 'blue',
    duration: '30 Menit',
    lessonsCount: 6,
    icon: Recycle,
    highlights: [
      'Peta Kode Resin Plastik #1 - #7',
      'Faktor Mutu Bersih vs Harga Pabrik',
      'Kalkulasi Konversi Saldo Dompet ELOVIA',
    ],
    moduleTopics: [
      'Anatomi Botol PET: Tutup, Badan, & Label',
      'Kardus Corrugated vs Duplex: Nilai & Berat',
      'Rantai Pasok: Dari TPS3R ke Smelter & Pabrik',
      'Menghindari Penalti Kontaminasi Material',
      'Mekanisme Dompet & Tukar Saldo ELOVIA',
      'Simulasi Nilai Riil Kantong Daur Ulangmu',
    ],
  },
  {
    id: 'lanjutan',
    level: 'Lanjutan: Zero Waste Life',
    title: 'Mengurangi sampah dari sumbernya',
    headline: 'Strategi 5R Mutakhir Gaya Hidup Lestari',
    description:
      'Terapkan Refuse, Reduce, Reuse, Repurpose, dan Rot dalam konsumsi harian keluarga modern untuk memangkas timbulan residu ke TPA hingga lebih dari 80%.',
    colorName: 'amber',
    duration: '45 Menit',
    lessonsCount: 8,
    icon: Leaf,
    highlights: [
      'Audit Kantong Sampah Rumah 7 Hari',
      'Metode Kompos Takakura & Biopori',
      'Substitusi Belanja Curah Tanpa Kemasan',
    ],
    moduleTopics: [
      'Prinsip 5R: Menolak Sekali Pakai Sejak Toko',
      'Manajemen Dapur Kompos: Eko-Enzim & Pupuk Organik',
      'Solusi Pembalut Kain, Silicone Pouch, & Beeswax',
      'Mengurangi E-Waste dan Perpanjang Usia Gadget',
      'Membangun Komunitas Minim Sampah RT/RW',
      'Sertifikasi Rumah Mandiri Sirkular',
    ],
  },
  {
    id: 'spesialis',
    level: 'Spesialis: Upcycling & Nilai Tambah',
    title: 'Kreasi Produk & Eko-Wirausaha',
    headline: 'Mentransformasi Residu Menjadi Karya Bernilai Jual',
    description:
      'Teknik peleburan aman tutup botol HDPE, perajutan sisa kain perca, dan pemanfaatan jelantah menjadi lilin aromaterapi bernilai jual tinggi.',
    colorName: 'teal',
    duration: '35 Menit',
    lessonsCount: 5,
    icon: Sparkles,
    highlights: [
      'Moulding Tutup Botol HDPE Jadi Coaster',
      'Lilin Aromaterapi dari Minyak Jelantah',
      'Dasar Bisnis Sirkular Skala Rumahan',
    ],
    moduleTopics: [
      'Peralatan Aman Upcycling Skala Dapur',
      'Teknik Cor Warna & Cetak Lembaran HDPE',
      'Saponifikasi Minyak Jelantah Jadi Sabun Batang',
      'Packaging Ramah Lingkungan untuk Produk Daur Ulang',
      'Etalase Marketplace Sirkular ELOVIA',
    ],
  },
];

interface JourneyNode {
  step: number;
  label: string;
  sublabel: string;
  icon: typeof Box;
  title: string;
  description: string;
  metric: string;
  impactScore: string;
  flowTime: string;
  actor: string;
  actionDetails: string[];
}

const JOURNEY_NODES: JourneyNode[] = [
  {
    step: 1,
    label: 'Pemilahan Warga',
    sublabel: 'Sumber Primer',
    icon: Box,
    title: 'Tahap 1: Pemilahan di Tangan Warga',
    description:
      'Warga memisahkan botol PET bening, melepas ring segel, mencuci kering, dan mencatat estimasi kuantitas melalui Waste Value Scanner ELOVIA.',
    metric: '100% Bebas Kontaminasi Makanan',
    impactScore: '+15 Poin Biosfer ELOVIA',
    flowTime: 'Hari ke-0',
    actor: 'Warga / Rumah Tangga',
    actionDetails: [
      'Botol minuman dibilas bersih untuk mencegah fermentasi aroma.',
      'Tutup HDPE dan label film dipisahkan sesuai jenis resin.',
      'Material dikemas rapi dalam kantong transparan atau kardus bersih.',
      'Jadwal penjemputan dipilih via aplikasi ELOVIA.',
    ],
  },
  {
    step: 2,
    label: 'Penjemputan Mitra',
    sublabel: 'Logistik Sirkular',
    icon: Truck,
    title: 'Tahap 2: Penjemputan Rendah Emisi',
    description:
      'Mitra logistik terdekat menjemput material terpilah menggunakan armada rute teroptimasi AI, menimbang secara akurat dengan timbangan Bluetooth bersertifikat, dan menyetujui transaksi.',
    metric: 'Reduksi Emisi Rute Hingga 34%',
    impactScore: 'Pencairan Saldo Instan',
    flowTime: 'Hari ke-1 s/d ke-2',
    actor: 'Mitra Kolektor ELOVIA',
    actionDetails: [
      'Verifikasi berat riil disaksikan warga secara transparan.',
      'Sertifikat digital fraksi material diterbitkan ke ledger sirkular.',
      'Saldo e-wallet langsung dikreditkan ke dompet digital warga.',
      'Material dikonsolidasikan di Hub Sirkular Mikro kecamatan.',
    ],
  },
  {
    step: 3,
    label: 'Pemrosesan Pabrik',
    sublabel: 'Daur Ulang Mekanik',
    icon: Factory,
    title: 'Tahap 3: Pemrosesan & Ekstrusi Pabrik',
    description:
      'Material dipilah warna, dicacah menjadi serpihan (flakes), dicuci termal dengan enzim ramah lingkungan, lalu diekstrusi menjadi biji rPET murni berstandar mutu industri.',
    metric: 'Hemat 65% Energi vs Polimer Baru',
    impactScore: '0% Limbah Kimia Beracun',
    flowTime: 'Hari ke-4 s/d ke-7',
    actor: 'Fasilitas Reklamasi Partner',
    actionDetails: [
      'Flakes dicuci dengan sistem air tertutup sirkular (water closed-loop).',
      'Sortir spektrum optik memisahkan polimer non-PET hingga kemurnian 99,8%.',
      'Pemanasan ekstrusi memintal polimer menjadi benang sintetis tahan aus.',
      'Pengujian kualitas kekuatan tarik setara bahan baku primer.',
    ],
  },
  {
    step: 4,
    label: 'Produk Baru',
    sublabel: 'Sepatu Lari Baru',
    icon: Package,
    title: 'Tahap 4: Menjadi Sepatu Lari Sirkular Baru',
    description:
      'Benang hasil daur ulang ditenun menjadi rajutan bagian atas (upper) sepatu lari berperforma tinggi. Sampah yang dahulu dibuang kini menjadi produk bernilai fungsional tinggi.',
    metric: '5 Botol PET = 1 Pasang Sepatu Lari',
    impactScore: '1,8 kg CO₂e Berhasil Dicegah',
    flowTime: 'Produk Siap Pakai',
    actor: 'Manufaktur Sepatu & Konsumen',
    actionDetails: [
      'Upper sepatu memiliki elastisitas tinggi dan sirkulasi udara optimal.',
      'Sepatu dirancang modular agar mudah dibongkar dan didaur ulang kembali di akhir umur pakai.',
      'Label QR traceability menampilkan jejak asal botol dari rumah tangga warga.',
      'Dipasarkan di ELOVIA Marketplace dengan sertifikat jejak karbon netral.',
    ],
  },
];



export default function EdukasiPage() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');

  // Carousel Scroll Ref
  const carouselRef = useRef<HTMLDivElement>(null);

  // Interactive Visualizer Selected Step
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Active Modals State
  const [activeModalModule, setActiveModalModule] = useState<LearningPath | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Carousel Navigation Helpers
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const activeNode = JOURNEY_NODES[activeStepIndex];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden z-0 font-jakarta selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Ambient Mesh Glows (Behind Content) ── */}
      <div
        className="absolute top-[15%] left-[-10%] w-[600px] h-[600px] bg-emerald-300/30 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute top-[50%] right-[-5%] w-[700px] h-[700px] bg-amber-200/30 rounded-full blur-[160px] pointer-events-none -z-10 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute top-[75%] left-[10%] w-[500px] h-[500px] bg-teal-200/25 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-multiply"
        aria-hidden="true"
      />

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: HERO BANNER & SPOTLIGHT (The Greenhouse Library)          */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[3rem] overflow-hidden min-h-[520px] flex flex-col items-center justify-center p-8 md:p-16 text-center shadow-[0_20px_60px_rgba(16,185,129,0.15)] border border-emerald-500/20"
        >
          {/* Background Hero Greenhouse Library Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out hover:scale-110"
            style={{ backgroundImage: "url('/images/edukasi/hero.png')" }}
          />

          {/* Masking / Overlay for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-emerald-950/60 to-slate-900/40 backdrop-blur-[1px]" />

          {/* Atmospheric Inner Radial Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-black/30 pointer-events-none" />

          {/* Content (z-10 relative) */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm hover:bg-white/25 transition-colors"
            >
              <BookOpen size={14} className="text-emerald-300" />
              <span>ELOVIA Circular Academy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight text-white mb-6 drop-shadow-lg leading-[1.1] font-fraunces"
            >
              Pelajari. Terapkan.{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
                Lestarikan.
              </span>
            </motion.h1>

            {/* Sub-headline description */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-slate-200 max-w-2xl text-base sm:text-lg mb-8 leading-relaxed font-normal drop-shadow-sm"
            >
              Pusat kurikulum literasi sirkular Indonesia. Jelajahi panduan praktis
              pemilahan berbasis SNI, strategi zero waste harian, dan metamorfosis
              sampah rumah tangga menjadi nilai ekonomi nyata.
            </motion.p>

            {/* Search Bar: Ultra-premium frosted glass */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-2xl mt-4 p-2 rounded-full bg-white/15 backdrop-blur-2xl border border-white/40 shadow-xl flex items-center group focus-within:border-emerald-300/80 focus-within:bg-white/25 transition-all"
            >
              <div className="pl-4 pr-2 text-white/80">
                <Search size={20} className="group-focus-within:text-emerald-300 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari panduan plastik PET, Takakura, B3 baterai, kardus..."
                className="w-full bg-transparent border-none text-white placeholder-white/70 text-sm sm:text-base focus:outline-none focus:ring-0 px-2 py-1.5"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors mr-1"
                  aria-label="Bersihkan pencarian"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-emerald-500/30 shrink-0"
              >
                Cari Materi
              </button>
            </motion.div>

            {/* Quick Keyword Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-300"
            >
              <span className="text-white/60 font-medium">Topik Populer:</span>
              {[
                'Plastik PET #1',
                'Kompos Takakura',
                'Minyak Jelantah',
                'B3 Lithium',
                'Kardus Corrugated',
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur text-white text-xs transition-colors"
                >
                  {tag}
                </button>
              ))}
            </motion.div>

            {/* Hero CTA: Mulai Perjalanan */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-8 flex items-center justify-center"
            >
              <a
                href="#jalur-belajar"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <span>Mulai Perjalanan</span>
                <ArrowDown size={15} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: JALUR PEMBELAJARAN (LEARNING PATHS CAROUSEL)              */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section id="jalur-belajar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sprout size={14} />
              <span>Kurikulum Terstruktur</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-fraunces">
              Mulai Perjalanan Sirkularmu
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Dipandu langkah demi langkah dari kebiasaan rumah tangga paling
              sederhana hingga menjadi pelopor ekonomi sirkular mandiri.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="w-11 h-11 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-md flex items-center justify-center text-slate-700 hover:text-emerald-700 transition-all active:scale-95"
              aria-label="Geser ke kiri"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="w-11 h-11 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-md flex items-center justify-center text-slate-700 hover:text-emerald-700 transition-all active:scale-95"
              aria-label="Geser ke kanan"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x custom-scrollbar pb-8 pt-4 select-none"
        >
          {LEARNING_PATHS.map((path, idx) => {
            const IconComponent = path.icon;

            // Palette styles mapping
            const colorStyles = {
              emerald: {
                accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                iconBox: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                badge: 'bg-emerald-100 text-emerald-800',
                pill: 'bg-emerald-500 text-white',
                glow: 'group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.18)]',
              },
              blue: {
                accentBg: 'bg-blue-50 text-blue-700 border-blue-200',
                iconBox: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
                badge: 'bg-blue-100 text-blue-800',
                pill: 'bg-blue-600 text-white',
                glow: 'group-hover:shadow-[0_20px_40px_rgba(37,99,235,0.18)]',
              },
              amber: {
                accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
                iconBox: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
                badge: 'bg-amber-100 text-amber-900',
                pill: 'bg-amber-600 text-white',
                glow: 'group-hover:shadow-[0_20px_40px_rgba(217,119,6,0.18)]',
              },
              teal: {
                accentBg: 'bg-teal-50 text-teal-800 border-teal-200',
                iconBox: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
                badge: 'bg-teal-100 text-teal-900',
                pill: 'bg-teal-600 text-white',
                glow: 'group-hover:shadow-[0_20px_40px_rgba(13,148,136,0.18)]',
              },
            }[path.colorName];

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveModalModule(path)}
                className={`min-w-[300px] md:min-w-[360px] bg-white/60 hover:bg-white/95 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 snap-center group cursor-pointer flex flex-col gap-4 relative overflow-hidden ${colorStyles.glow}`}
              >
                {/* Subtle decorative background light inside card */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/60 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* Top Header: Icon & Level Tag */}
                <div className="flex items-center justify-between z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${colorStyles.iconBox} transition-transform group-hover:scale-110 duration-300`}
                  >
                    <IconComponent size={28} />
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${colorStyles.badge}`}
                  >
                    {path.duration}
                  </span>
                </div>

                {/* Level Title */}
                <div className="z-10 mt-1">
                  <div className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-1">
                    {path.level}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {path.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed z-10 flex-1">
                  {path.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 z-10">
                  {path.highlights.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link Footer */}
                <div className="pt-3 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors z-10">
                  <span>Buka {path.lessonsCount} Modul Materi</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: VISUALIZER INTERAKTIF (THE CIRCULAR JOURNEY)              */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl text-white border border-slate-800"
        >
          {/* Subtle Dark Mesh Gradients inside the box */}
          <div
            className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Section Header */}
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-4">
              <Recycle size={14} className="animate-spin-slow" />
              <span>Siklus Tertutup (Closed Loop)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-fraunces">
              Jejak Daur Ulang: Dari Tanganmu Menjadi Nilai Baru
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Klik setiap simpul siklus untuk melihat proses transformasi riil
              dari botol plastik yang Anda buang menjadi sepasang sepatu lari
              berkualitas dunia.
            </p>
          </div>

          {/* Timeline Layout with Connected Dashed Line */}
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Horizontal Dashed Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-16 right-16 h-0.5 border-t-2 border-dashed border-white/20 -z-0" />

            {/* Glowing animated pulse along the line */}
            <div
              className="hidden md:block absolute top-8 left-16 h-0.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 shadow-[0_0_12px_#34d399] transition-all duration-500 -z-0"
              style={{
                width: `${(activeStepIndex / (JOURNEY_NODES.length - 1)) * 100}%`,
              }}
            />

            {/* Step Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {JOURNEY_NODES.map((node, index) => {
                const IconComp = node.icon;
                const isActive = activeStepIndex === index;
                const isPassed = activeStepIndex >= index;

                return (
                  <div
                    key={node.step}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveStepIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStepIndex(index);
                      }
                    }}
                    className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                  >
                    {/* Glowing Glass Circle */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 border-2 border-emerald-300 shadow-[0_0_30px_rgba(52,211,153,0.6)] scale-110'
                          : isPassed
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                          : 'bg-white/10 border border-white/20 backdrop-blur-md text-white/70 hover:bg-white/20 hover:scale-105'
                      }`}
                    >
                      <IconComp
                        size={26}
                        className={isActive ? 'animate-bounce-subtle' : ''}
                      />

                      {/* Small Step Number Badge */}
                      <span
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center border ${
                          isActive
                            ? 'bg-slate-900 text-emerald-300 border-emerald-300'
                            : 'bg-slate-800 text-slate-300 border-white/20'
                        }`}
                      >
                        {node.step}
                      </span>
                    </div>

                    {/* Node Text Label */}
                    <div className="mt-4">
                      <div
                        className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                          isActive ? 'text-emerald-300' : 'text-slate-400'
                        }`}
                      >
                        {node.sublabel}
                      </div>
                      <div
                        className={`text-base font-bold mt-0.5 transition-colors ${
                          isActive
                            ? 'text-white drop-shadow'
                            : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {node.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Detail Spotlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mt-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-10 shadow-xl relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                  <div className="max-w-2xl space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                        {activeNode.actor}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                        Waktu: {activeNode.flowTime}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-fraunces">
                      {activeNode.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {activeNode.description}
                    </p>

                    {/* Step micro-actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {activeNode.actionDetails.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-2 text-xs text-slate-200 font-medium"
                        >
                          <Check
                            size={14}
                            className="text-emerald-400 shrink-0 mt-0.5"
                          />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Metric Pillar */}
                  <div className="w-full lg:w-auto shrink-0 bg-slate-950/60 border border-white/15 rounded-2xl p-6 flex flex-col gap-3 min-w-[260px] text-center lg:text-left shadow-lg">
                    <div className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                      Dampak Terukur
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {activeNode.metric}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-1.5">
                      <Sparkles size={14} className="text-amber-300" />
                      <span>{activeNode.impactScore}</span>
                    </div>

                    <Link
                      href="/pindai"
                      className="mt-2 w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide transition-all text-center"
                    >
                      Mulai Pindai Materialmu
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: ARTIKEL & TIPS TERKINI (GRID CARDS)                       */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <EdukasiArticlesSection />

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: VIDEO EDUKASI / MINI-WEBINAR (FLOATING CINEMATIC PLAYER)  */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-32 relative z-10">
        {/* Outer Ambient Glow (Behind the video) */}
        <div className="absolute inset-0 top-32 bg-emerald-400/20 blur-[100px] -z-10 rounded-[3rem] w-[80%] mx-auto h-[70%] pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles size={14} className="text-emerald-600" /> Masterclass
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Memahami Ekonomi Sirkular
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
            Tonton animasi singkat dari Low Carbon Development Indonesia (Bappenas RI) untuk memahami bagaimana sampah fisikmu bertransformasi menjadi nilai baru yang berkelanjutan.
          </p>
        </div>

        {/* Video Player Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(4,47,46,0.15)] border border-white/80 bg-slate-900 group"
        >
          {!isPlaying ? (
            /* CONDITIONAL RENDERING (IF !isPlaying - The Custom Dreamy Thumbnail) */
            <>
              {/* Mock Background (Fetch YT MaxRes Thumbnail) */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-700"
                style={{
                  backgroundImage:
                    "url('https://img.youtube.com/vi/mrF0tdUIMhE/maxresdefault.jpg')",
                }}
              ></div>

              {/* Glass Overlay & Glowing Play Button */}
              <div
                className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 backdrop-blur-[2px] transition-all duration-500 cursor-pointer flex items-center justify-center"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/60 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                  <Play size={40} className="text-white ml-2 fill-white drop-shadow-md" />
                </div>
              </div>

              {/* Bottom Subtle Overlay Bar */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none flex items-center justify-between text-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-300 border border-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                    <Clock size={12} /> Bappenas RI • Pembangunan Rendah Karbon
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white drop-shadow">
                    Mengenal Ekonomi Sirkular untuk Mendukung Pembangunan Rendah Karbon di Indonesia
                  </h3>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold shadow-md">
                  <Play size={14} className="fill-slate-950" />
                  <span>Putar Video</span>
                </div>
              </div>
            </>
          ) : (
            /* CONDITIONAL RENDERING (IF isPlaying - The Actual YouTube iFrame) */
            <div className="relative w-full h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/mrF0tdUIMhE?autoplay=1&rel=0&modestbranding=1"
                title="Mengenal Ekonomi Sirkular"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full relative z-10"
              ></iframe>
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur border border-white/30 shadow-lg flex items-center gap-1.5 transition-all opacity-80 hover:opacity-100"
                aria-label="Kembali ke thumbnail"
              >
                <X size={14} />
                <span>Tutup Pemutar</span>
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* SECTION 6: POCKET GUIDE DOWNLOAD & PINDAI CTA BANNER                  */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-900 rounded-[3rem] p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-emerald-500/30">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
              <FileText size={14} />
              <span>Unduh Panduan PDF Gratis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-fraunces leading-snug">
              Siap Mewujudkan Rumah Bebas Sampah Bersama ELOVIA?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Unduh lembar panduan saku (Pocket Guide) klasifikasi 6 fraksi
              sampah rumah tangga yang siap dicetak dan ditempel di kulkas Anda.
              Lalu uji potensi saldo material Anda dengan Waste Value Scanner.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/pindai"
                className="px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-emerald-400/30 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Pindai Sampah Sekarang</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="/images/edukasi/hero.png"
                download="ELOVIA-Circular-Pocket-Guide.png"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur text-white font-bold text-sm tracking-wide transition-all inline-flex items-center gap-2"
              >
                <Bookmark size={16} />
                <span>Simpan Wallpaper Panduan</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE MODAL: DETAIL MODUL KURIKULUM                            */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeModalModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalModule(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button
                type="button"
                onClick={() => setActiveModalModule(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Tutup modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {activeModalModule.level}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activeModalModule.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 font-fraunces">
                {activeModalModule.title}
              </h3>
              <p className="text-emerald-700 font-semibold text-sm mb-4">
                {activeModalModule.headline}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activeModalModule.description}
              </p>

              {/* Module Lessons Breakdown */}
              <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200/80">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-3">
                  Silabus & Pokok Pembahasan:
                </h4>
                <div className="space-y-2.5">
                  {activeModalModule.moduleTopics.map((topic, i) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 text-sm text-slate-800 bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalModule(null)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
                >
                  Tutup
                </button>
                <Link
                  href="/pindai"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  Praktikkan Sekarang
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>





      {/* ── Global ELOVIA Footer ────────────────────────────────────────── */}
      <div className="relative z-30 bg-white">
        <Footer />
      </div>
    </div>
  );
}

