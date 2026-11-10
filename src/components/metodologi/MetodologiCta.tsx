'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calculator, Sparkles, ShieldCheck } from 'lucide-react';

export function MetodologiCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <div className="relative rounded-[3rem] bg-[#7EA02A] text-white p-8 sm:p-14 md:p-16 overflow-hidden shadow-[0_20px_50px_rgba(126,160,42,0.28)] flex flex-col items-center text-center">
        {/* Subtle decorative circles (matching reference aesthetic) */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-[60px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-black/10 rounded-full blur-[60px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-4 border border-white/25 shadow-xs">
          <Sparkles size={13} className="text-[#E7F3B5]" />
          <span>KATALOG HARGA INDIKATIF TERBUKA</span>
        </div>

        {/* Big Serif Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white tracking-tight max-w-2xl leading-tight mb-4">
          Ingin Melihat Daftar Harga Indikatif untuk Semua Jenis Sampah?
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-[#F0F7D4] font-light max-w-xl mb-8 leading-relaxed">
          Eksplorasi puluhan sub-kategori material terpilah, kisaran harga acuan
          regional, serta panduan sortir standar nasional langsung di platform kami.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/material"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#F5FAF0] text-[#1C2E1F] font-bold text-sm tracking-wide shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>Buka Katalog Material</span>
            <span className="w-5 h-5 rounded-full bg-[#7EA02A] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={11} className="stroke-[3]" />
            </span>
          </Link>

          <Link
            href="/pindai"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#6D8C24] hover:bg-[#5E7A1E] text-white border border-white/25 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calculator size={15} className="text-[#E7F3B5]" />
            <span>Pindai Nilai Sekarang</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
