'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, X, SlidersHorizontal, ArrowUpRight } from 'lucide-react';

interface MaterialHeroSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: { id: string; label: string; count: number }[];
  totalResults: number;
}

export function MaterialHeroSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  totalResults,
}: MaterialHeroSearchProps) {
  return (
    <header className="relative w-full max-w-[96%] mx-auto mt-24 mb-16 rounded-[3rem] overflow-hidden min-h-[500px] flex flex-col items-center justify-center pt-16 pb-20 px-4 sm:px-6 shadow-[0_20px_60px_rgba(16,185,129,0.15)] border border-emerald-500/20">
      {/* ── 1. The Background 3D Glass Bottle & Landscape Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-[center_top_15%] scale-105 pointer-events-none transition-transform duration-1000 ease-out"
        style={{ backgroundImage: "url('/images/materials/header.png')" }}
        aria-hidden="true"
      />

      {/* ── 2. Atmospheric Gradient Overlays for High Legibility ── */}
      {/* Main cinematic fade */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-emerald-900/40 to-slate-900/80 backdrop-blur-[2px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Radial spotlight on search bar */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-slate-900/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle interior rim glow */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── 3. Typography & Badges ── */}
      {/* Ensiklopedia Badge */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider uppercase mb-6 shadow-sm"
      >
        <Sparkles size={14} className="text-emerald-300 animate-pulse" />
        Ensiklopedia Daur Ulang ELOVIA
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl text-center drop-shadow-lg font-jakarta leading-[1.12]"
      >
        Katalog & Harga Material Terkini
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 text-white/85 text-base md:text-lg max-w-2xl mt-4 leading-relaxed text-center font-light drop-shadow-md"
      >
        Cari jenis sampahmu, ketahui estimasi harga pasar real-time, dan pelajari cara preparasinya sebelum disalurkan.
      </motion.p>

      {/* Hero CTA: Uji Simulasi Rumus */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="relative z-10 mt-5"
      >
        <Link
          href="/pindai"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <span>Uji Simulasi Rumus</span>
          <ArrowUpRight size={15} />
        </Link>
      </motion.div>

      {/* ── 4. The Search Bar (Ultra-Premium Frosted Glass) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 w-full max-w-2xl mt-10 p-2 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.2)] flex items-center transition-all focus-within:bg-white/25 focus-within:border-white/60 focus-within:shadow-[0_12px_40px_rgba(16,185,129,0.3)]"
      >
        <Search size={24} className="absolute left-6 text-white/70 pointer-events-none transition-colors group-focus-within:text-emerald-300" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari material (mis: Kardus, Botol PET, Jelantah)..."
          aria-label="Cari jenis material daur ulang"
          className="w-full bg-transparent pl-14 pr-12 py-4 text-white placeholder-white/60 outline-none text-base sm:text-lg font-medium"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-5 p-1.5 rounded-full hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Hapus pencarian"
          >
            <X size={18} />
          </button>
        )}
      </motion.div>

      {/* ── 5. Quick Filter Badges ── */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        aria-label="Kategori Material"
        className="relative z-10 flex flex-wrap justify-center gap-2.5 mt-8"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-500 text-white px-5 py-2 font-bold shadow-md shadow-emerald-500/30 border border-emerald-400'
                  : 'bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2 font-medium border border-white/20'
              }`}
            >
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-600/70 text-white' : 'bg-white/20 text-white/90'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* Dynamic Results Counter & Active Filter Badge */}
      {(searchQuery.trim() !== '' || selectedCategory !== 'all') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="relative z-10 mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 text-xs text-white/90 font-medium shadow-sm"
        >
          <SlidersHorizontal size={13} className="text-emerald-300" />
          <span>
            Menemukan <strong className="text-white font-bold">{totalResults}</strong> material
            {searchQuery ? ` untuk "${searchQuery}"` : ''}
            {selectedCategory !== 'all' ? ` di kategori ${selectedCategory}` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
            }}
            className="text-emerald-300 font-bold hover:underline ml-1 cursor-pointer"
          >
            Reset
          </button>
        </motion.div>
      )}
    </header>
  );
}
