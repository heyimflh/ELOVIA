'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, X, SlidersHorizontal } from 'lucide-react';
import { MaterialCategory } from './catalogData';

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
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center flex flex-col items-center relative z-10">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4 shadow-sm"
      >
        <Sparkles size={14} className="text-emerald-600 animate-pulse" />
        Ensiklopedia Daur Ulang ELOVIA
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-2xl font-jakarta leading-[1.15]"
      >
        Katalog & Harga Material Terkini
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-slate-600 text-base max-w-xl mt-3 leading-relaxed"
      >
        Cari jenis sampahmu, ketahui estimasi harga pasar real-time, dan pelajari cara preparasinya sebelum disalurkan.
      </motion.p>

      {/* Live Search Bar Container */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-2xl mt-8 relative flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 p-2 transition-all duration-300 focus-within:shadow-[0_12px_36px_rgba(16,185,129,0.15)] focus-within:border-emerald-300"
      >
        <Search size={20} className="absolute left-5 text-slate-400 pointer-events-none transition-colors duration-200 group-focus-within:text-emerald-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari material (mis: Kardus, Botol PET, Jelantah)..."
          aria-label="Cari jenis material daur ulang"
          className="w-full bg-transparent pl-12 pr-10 py-3.5 text-slate-900 placeholder-slate-400 outline-none text-base font-normal"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            aria-label="Hapus pencarian"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>

      {/* Quick Filter Badges */}
      <motion.nav
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        aria-label="Kategori Material"
        className="flex flex-wrap justify-center gap-2 mt-4"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-500/20'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60 shadow-sm'
              }`}
            >
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-700/60 text-emerald-100' : 'bg-slate-100 text-slate-500'
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
          className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium"
        >
          <SlidersHorizontal size={13} className="text-emerald-600" />
          <span>
            Menemukan <strong className="text-slate-800 font-bold">{totalResults}</strong> material
            {searchQuery ? ` untuk "${searchQuery}"` : ''}
            {selectedCategory !== 'all' ? ` di kategori ${selectedCategory}` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
            }}
            className="text-emerald-700 font-bold hover:underline ml-1 cursor-pointer"
          >
            Reset Filter
          </button>
        </motion.div>
      )}
    </header>
  );
}

