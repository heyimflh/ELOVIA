'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Sparkles,
  Droplets,
  Scale,
  TrendingUp,
  Truck,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Check,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export function ValueFactors() {
  // Interactive state for Card 1 (Polymer type comparison)
  const [polymerTab, setPolymerTab] = useState<'mono' | 'multi'>('mono');

  // Interactive state for Card 4 (Weight scale stepper)
  const [weightKg, setWeightKg] = useState<number>(15);

  // Interactive state for Card 6 (Logistics mode)
  const [logisticsMode, setLogisticsMode] = useState<'dropoff' | 'pickup'>('dropoff');

  const handleWeightDelta = (delta: number) => {
    setWeightKg((prev) => Math.max(3, Math.min(60, prev + delta)));
  };

  return (
    <div className="relative mt-24 sm:mt-32 pt-12">
      {/* Connector line and center node at top (Reference: SIAGA Trust Infrastructure) */}
      <div className="flex flex-col items-center justify-center mb-8" aria-hidden="true">
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#177A47] to-[#D3EBDB]" />
        <div className="w-7 h-7 rounded-full border-2 border-[#177A47] bg-white flex items-center justify-center shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-[#177A47] animate-pulse" />
        </div>
      </div>

      {/* Header Block */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] font-mono text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs"
        >
          <Info className="w-3.5 h-3.5 text-[#177A47]" />
          [ TRANSPARANSI NILAI ]
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1F17] leading-[1.2]"
        >
          Transparansi Penuh, dengan{' '}
          <span className="text-[#177A47] relative inline-block">
            Enam Faktor Nilai.
            <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[#E3F6B5] -z-10 rounded-full" />
          </span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-jakarta text-sm sm:text-base text-[#4A5D52] mt-4 max-w-2xl mx-auto leading-relaxed"
        >
          Tidak semua sampah otomatis bernilai tinggi. ELOVIA menerapkan sistem penilaian terbuka
          berbasis 6 faktor objektif agar adil, presisi, dan dapat dipertanggungjawabkan.
        </motion.p>
      </div>

      {/* 6 Interactive Cards Grid (Reference: SIAGA Trust Infrastructure 4-column style, adapted to 6 factors) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {/* ========================================================
            CARD 01: Jenis Material (Kemurnian Polimer)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#177A47]/60 hover:shadow-[0_20px_45px_rgba(23,122,71,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#177A47]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Polymer Purity Matrix */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Purity Matrix:</span>
                <span className="text-[#177A47] font-semibold">Sentuh untuk membandingkan</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPolymerTab('mono')}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    polymerTab === 'mono'
                      ? 'bg-white border-[#177A47] ring-1 ring-[#177A47]/30 shadow-xs'
                      : 'bg-white/60 border-[#D3EBDB] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-[10px] font-bold text-[#177A47] flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" /> Monomaterial
                  </div>
                  <div className="text-[11px] font-semibold text-[#0F1F17] mt-0.5">PET / Kardus</div>
                  <div className="mt-1.5 w-full bg-[#E8F4EC] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#177A47] h-full w-[95%]" />
                  </div>
                  <div className="text-[9px] font-mono text-[#177A47] mt-1 font-bold">Grade A+ (95%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPolymerTab('multi')}
                  className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                    polymerTab === 'multi'
                      ? 'bg-white border-amber-600 ring-1 ring-amber-600/30 shadow-xs'
                      : 'bg-white/60 border-[#D3EBDB] opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-[10px] font-bold text-amber-700 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Multilayer
                  </div>
                  <div className="text-[11px] font-semibold text-[#0F1F17] mt-0.5">Sachet Campur</div>
                  <div className="mt-1.5 w-full bg-amber-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full w-[25%]" />
                  </div>
                  <div className="text-[9px] font-mono text-amber-700 mt-1 font-bold">Grade D (25%)</div>
                </button>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Kemurnian Jenis Material
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Polimer murni (seperti botol PET bening atau kardus kraft) bernilai daur ulang tertinggi
                karena mudah dilebur kembali oleh pabrik tanpa proses pemisahan kimia yang rumit.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#177A47]">Bobot 35%</span>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 02: Kondisi Fisik (Keutuhan Serat)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#0E7C7B]/60 hover:shadow-[0_20px_45px_rgba(14,124,123,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#0E7C7B]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Structural Integrity Gauge */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Integrity Gauge:</span>
                <span className="text-[#0E7C7B] font-bold">● 98% Serat Utuh</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#D3EBDB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs">
                    📦
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0F1F17]">Kardus Utuh & Kering</div>
                    <div className="text-[10px] text-[#5D7065]">Struktur serat karton kokoh</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#E8F4EC] text-[#177A47] px-2 py-0.5 rounded">
                  1.0x Rate
                </span>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#0E7C7B] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Kondisi Fisik Terjaga
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Kardus yang tidak robek hancur atau botol kaca yang tidak pecah berkeping menjaga
                kekuatan serat alami, menghemat tenaga sortir manual, dan mencegah bahaya pecahan bagi kurir.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#0E7C7B]">Bobot 20%</span>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 03: Kebersihan (Bebas Residu)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#2FA866]/60 hover:shadow-[0_20px_45px_rgba(47,168,102,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#2FA866]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Wash & Purity Checklist */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Purity Scanner:</span>
                <span className="text-[#2FA866] font-bold">0% Residu Minyak</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-md bg-white border border-[#D3EBDB] text-[10px] font-medium text-[#177A47] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#177A47] shrink-0" />
                  <span>Dibilas Bersih</span>
                </div>
                <div className="p-1.5 rounded-md bg-white border border-[#D3EBDB] text-[10px] font-medium text-[#177A47] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#177A47] shrink-0" />
                  <span>Kering Total</span>
                </div>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#2FA866] flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Standar Kebersihan Higienis
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Material yang telah dibilas dan bebas residu minyak atau sisa makanan menghemat jutaan liter air
                pencucian di fasilitas daur ulang, sehingga langsung dihargai dengan tarif tertinggi.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#2FA866]">Bobot 20%</span>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 04: Berat & Kuantitas (Skala Logistik)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#0F5F37]/60 hover:shadow-[0_20px_45px_rgba(15,95,55,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#0F5F37]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Scale Stepper */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Timbangan Interaktif:</span>
                <span className="text-[#0F5F37] font-bold">
                  {weightKg >= 15 ? 'Skala Optimal' : 'Ambang Dasar'}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white border border-[#D3EBDB] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleWeightDelta(-5)}
                  className="w-7 h-7 rounded-md bg-[#F6FAF7] hover:bg-[#E8F4EC] border border-[#D3EBDB] flex items-center justify-center text-[#0F1F17] cursor-pointer"
                  aria-label="Kurang berat"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="text-center">
                  <span className="font-mono text-base font-bold text-[#0F1F17]">
                    {weightKg.toFixed(1)} kg
                  </span>
                  <div className="text-[9px] font-mono text-[#177A47]">
                    {weightKg >= 15 ? '✓ Gratis Jemput Armada' : 'Min. jemput 10 kg'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleWeightDelta(5)}
                  className="w-7 h-7 rounded-md bg-[#F6FAF7] hover:bg-[#E8F4EC] border border-[#D3EBDB] flex items-center justify-center text-[#0F1F17] cursor-pointer"
                  aria-label="Tambah berat"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-[#E8F4EC] border border-[#D3EBDB] text-[#0F5F37] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Kuantitas & Efisiensi Berat
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Mitra pengumpul memiliki biaya operasional armada tetap. Mengumpulkan kuantitas yang lebih
                besar menekan rasio biaya logistik per kilogram dan menghasilkan margin yang lebih menguntungkan.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#0F5F37]">Bobot 15%</span>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 05: Permintaan Industri (Pasar Sekunder)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#D97706]/60 hover:shadow-[0_20px_45px_rgba(217,119,6,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#D97706]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Secondary Market Demand Index */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Indeks Pasar Industri:</span>
                <span className="text-[#D97706] font-bold">● Likuiditas Tinggi</span>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#D3EBDB] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#5D7065] font-mono">Daya Serap Off-Taker</div>
                  <div className="font-mono text-sm font-bold text-[#177A47] flex items-center gap-1">
                    +14.8% <span className="text-[10px] text-[#5D7065] font-normal">Bulan Ini</span>
                  </div>
                </div>

                {/* Micro Sparkline Trend Graphic */}
                <svg className="w-16 h-7 overflow-visible" viewBox="0 0 60 24" fill="none">
                  <path
                    d="M2 18 L16 14 L28 17 L42 8 L58 4"
                    stroke="#D97706"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="58" cy="4" r="3" fill="#D97706" className="animate-ping" />
                  <circle cx="58" cy="4" r="2.5" fill="#D97706" />
                </svg>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Permintaan Pabrik Off-Taker
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Harga beli bergerak mengikuti siklus bahan baku komoditas daur ulang dan kuota serap pabrik
                manufaktur. ELOVIA menyajikan data acuan ini secara terbuka tanpa manipulasi.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#D97706]">Dinamis Pasar</span>
          </div>
        </motion.div>

        {/* ========================================================
            CARD 06: Biaya Pengumpulan (Opsi Logistik)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4, transition: { duration: 0.25 } }}
          className="relative rounded-2xl bg-white border border-[#D3EBDB] shadow-[0_15px_35px_rgba(15,31,23,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#16A34A]/60 hover:shadow-[0_20px_45px_rgba(22,163,74,0.08)] transition-all"
        >
          {/* Top colored accent line */}
          <div className="h-1.5 w-full bg-[#16A34A]" />

          <div className="p-5 sm:p-6 space-y-4">
            {/* Interactive Micro-Widget: Logistics Switcher */}
            <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5D7065]">
                <span>Opsi Penyerahan:</span>
                <span className="text-[#16A34A] font-bold">1.2 km dari Anda</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setLogisticsMode('dropoff')}
                  className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                    logisticsMode === 'dropoff'
                      ? 'bg-white border-[#16A34A] ring-1 ring-[#16A34A]/30 font-bold text-[#16A34A]'
                      : 'bg-white/60 border-[#D3EBDB] text-[#5D7065]'
                  }`}
                >
                  <div className="text-[10px]">Drop-off Mandiri</div>
                  <div className="text-[9px] font-mono font-bold text-[#177A47]">100% Nilai Bersih</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLogisticsMode('pickup')}
                  className={`p-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                    logisticsMode === 'pickup'
                      ? 'bg-white border-[#16A34A] ring-1 ring-[#16A34A]/30 font-bold text-[#16A34A]'
                      : 'bg-white/60 border-[#D3EBDB] text-[#5D7065]'
                  }`}
                >
                  <div className="text-[10px]">Jemput Armada</div>
                  <div className="text-[9px] font-mono text-[#4A5D52]">Praktis di Rumah</div>
                </button>
              </div>
            </div>

            {/* Icon Badge */}
            <div className="w-10 h-10 rounded-xl bg-lime-50 border border-lime-200 text-[#16A34A] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>

            {/* Title & Description */}
            <div>
              <h4 className="font-jakarta text-base sm:text-lg font-bold text-[#0F1F17] mb-2">
                Efisiensi Biaya Logistik
              </h4>
              <p className="font-jakarta text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                Jarak penjemputan armada dan tenaga sortir memengaruhi margin akhir. Anda bebas memilih opsi
                penjemputan ke alamat atau menyetor mandiri (drop-off) demi imbal hasil maksimal.
              </p>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-3 bg-[#F6FAF7] border-t border-[#D3EBDB]/70 flex items-center justify-between text-xs font-mono text-[#5D7065]">
            <span>Faktor Pengaruh:</span>
            <span className="font-bold text-[#16A34A]">Pilihan Fleksibel</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Methodology Audit Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#D3EBDB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] flex items-center justify-center text-[#177A47] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#0F1F17]">
              Semua rumus estimasi dan faktor bobot mutu dapat diaudit secara terbuka.
            </p>
            <p className="text-[11px] text-[#5D7065]">
              Prinsip integritas data ELOVIA P1 – P11 mengikat seluruh algoritma perhitungan.
            </p>
          </div>
        </div>

        <Link
          href="/metodologi"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F6FAF7] hover:bg-[#E8F4EC] border border-[#D3EBDB] text-xs sm:text-sm font-semibold text-[#177A47] hover:text-[#0F5F37] transition-all cursor-pointer shrink-0"
        >
          <span>Pelajari Metodologi Penentuan Nilai Kami</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
