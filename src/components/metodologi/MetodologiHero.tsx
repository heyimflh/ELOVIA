'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Scale,
  Leaf,
  ChevronRight,
  Home,
  TrendingUp,
} from 'lucide-react';

export function MetodologiHero() {
  const scrollToSimulator = () => {
    const el = document.getElementById('formula-simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 md:pt-32 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="inline-flex items-center gap-2 text-xs md:text-sm font-medium bg-[#EEF4E1] px-4 py-2 rounded-full border border-[#D5E3BD] text-[#3B5433]">
            <li>
              <Link
                href="/"
                className="text-[#4E6B44] hover:text-[#23381D] transition-colors flex items-center gap-1.5"
              >
                <Home size={14} className="text-[#5E7F54]" />
                <span>Beranda</span>
              </Link>
            </li>
            <ChevronRight size={13} className="text-[#7E9E72]" />
            <li className="text-[#20361A] font-bold flex items-center gap-1.5">
              <Scale size={14} className="text-[#7EA02A]" />
              <span>Metodologi Penentuan Nilai</span>
            </li>
          </ol>
        </nav>

        {/* ── Main Hero Layout (2 Columns matching reference) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Serif Copy & Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Eyebrow in olive green */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#7EA02A] tracking-[0.2em] uppercase font-jakarta mb-3">
              <span className="w-2 h-2 rounded-full bg-[#7EA02A]" />
              <span>DARI BAHAN MENTAH HINGGA DOMPET DIGITAL</span>
            </div>

            {/* Big Elegant Serif Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#1C2E1F] tracking-tight leading-[1.12] mb-5">
              Setiap Gram Sampahmu, Dihitung dengan{' '}
              <span className="italic font-normal text-[#7EA02A]">
                Presisi Algoritma
              </span>
              .
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-[#3F5441] leading-relaxed font-normal max-w-xl mb-8">
              Kami meyakini keterbukaan adalah fondasi utama ekonomi sirkular.
              Pelajari bagaimana ELOVIA menghitung nilai bersih daur ulang secara
              logis, adil, dan terverifikasi tanpa biaya siluman.
            </p>

            {/* CTA Buttons & Seal Badge Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10 w-full sm:w-auto">
              {/* Primary Green Pill Button */}
              <button
                type="button"
                onClick={scrollToSimulator}
                className="px-6 py-3.5 rounded-full bg-[#7EA02A] hover:bg-[#6D8C24] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-[#7EA02A]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer group"
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={13} className="stroke-[3]" />
                </span>
                <span>Uji Simulasi Rumus</span>
              </button>

              {/* Secondary Outlined Pill */}
              <Link
                href="/material"
                className="px-6 py-3.5 rounded-full bg-[#EEF4E1] hover:bg-[#E3ECCF] text-[#293E23] border border-[#CCDDB1] text-xs sm:text-sm font-bold tracking-wide transition-all duration-300"
              >
                <span>Buka Katalog Material</span>
              </Link>

              {/* Circular Decorative Seal Stamp (Matching Reference Image) */}
              <div className="hidden sm:flex items-center gap-3 pl-2">
                <div className="relative w-16 h-16 rounded-full bg-[#7EA02A] text-white flex flex-col items-center justify-center text-center shadow-md p-1.5 border-2 border-white/60 rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
                  <Leaf size={16} className="text-[#E7F3B5] mb-0.5" />
                  <span className="text-[8px] font-mono font-black uppercase tracking-tighter leading-none">
                    100%
                  </span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#F0F7D4]">
                    ADIL
                  </span>
                </div>
                <div className="text-xs leading-tight text-[#4E6B44]">
                  <span className="font-bold block text-[#1C2E1F]">Standar Terbuka</span>
                  <span className="text-[11px]">Tera SNI &amp; Agregat B2B</span>
                </div>
              </div>
            </div>

            {/* 4 Feature Value Pills (Matching reference checkmarks) */}
            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#D5E3BD] w-full max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#293E23]">
                <div className="w-4 h-4 rounded-full bg-[#7EA02A] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={11} className="stroke-[3]" />
                </div>
                <span>100% Tanpa Biaya Tersembunyi</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#293E23]">
                <div className="w-4 h-4 rounded-full bg-[#7EA02A] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={11} className="stroke-[3]" />
                </div>
                <span>Timbangan Digital Tera SNI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#293E23]">
                <div className="w-4 h-4 rounded-full bg-[#7EA02A] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={11} className="stroke-[3]" />
                </div>
                <span>Audit Mutu Grade A/B/C</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#293E23]">
                <div className="w-4 h-4 rounded-full bg-[#7EA02A] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 size={11} className="stroke-[3]" />
                </div>
                <span>Insentif EcoPoints Karbon</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Arched Window Photo Display (Direct Signature Style from Reference) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* The Main Tall Arch Window ("Tombstone Arch" from Reference Image) */}
            <div className="relative w-full max-w-sm sm:max-w-md h-[460px] sm:h-[520px] rounded-t-[12rem] rounded-b-[3rem] overflow-hidden border-8 border-white shadow-[0_25px_60px_rgba(28,46,31,0.14)] bg-[#E8EFE0]">
              <Image
                src="/images/metodologi/header.jpeg"
                alt="Presisi Algoritma ELOVIA"
                fill
                priority
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 450px"
              />

              {/* Bottom Subtle Gradient for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2E1F]/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Badge Over Image */}
              <div className="absolute bottom-6 inset-x-6 z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-lg text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7EA02A]">
                    METROLOGI RESMI
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7EA02A] text-white font-bold">
                    TERVERIFIKASI
                  </span>
                </div>
                <div className="text-sm font-bold text-[#1C2E1F]">
                  Indeks Pabrik Daur Ulang Nasional
                </div>
                <div className="text-xs text-[#526D48] mt-0.5">
                  Diperbarui berkala bersama APDUPI &amp; KLHK
                </div>
              </div>
            </div>

            {/* Floating Supporting Accent Badge (Left Side) */}
            <div className="absolute -left-4 sm:-left-8 top-1/3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D5E3BD] shadow-xl text-left hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4E1] text-[#7EA02A] flex items-center justify-center font-bold">
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#5E7F54] uppercase block font-bold">
                  Indeks Harian
                </span>
                <span className="text-xs font-bold text-[#1C2E1F]">
                  Transparan 100%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
