'use client';

import React from 'react';
import {
  BadgeCheck,
  Search,
  Recycle,
  FileText,
  Layers,
  Wine,
  Truck,
  Store,
  Sparkles,
  X,
} from 'lucide-react';
import type {
  MarketplaceFilters,
  MarketplaceCategory,
  MarketplaceMethod,
} from './types';

export interface MarketplaceMobileHeroProps {
  filters?: MarketplaceFilters;
  onFilterChange?: (filters: MarketplaceFilters) => void;
  targetGlobeId?: string;
  className?: string;
}

const CATEGORIES: {
  id: MarketplaceCategory;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { id: 'semua', label: 'Semua', icon: Sparkles },
  { id: 'plastik', label: 'Plastik', icon: Recycle },
  { id: 'kertas', label: 'Kertas', icon: FileText },
  { id: 'logam', label: 'Logam', icon: Layers },
  { id: 'kaca', label: 'Kaca', icon: Wine },
];

export function MarketplaceMobileHero({
  filters,
  onFilterChange,
  targetGlobeId = 'marketplace-globe-view',
  className = '',
}: MarketplaceMobileHeroProps) {
  const searchQuery = filters?.searchQuery ?? '';
  const selectedCategory = filters?.selectedCategory ?? 'semua';
  const selectedMethod = filters?.selectedMethod ?? 'all';

  const updateFilters = (updater: (prev: MarketplaceFilters) => MarketplaceFilters) => {
    if (!onFilterChange) return;
    const current: MarketplaceFilters = filters ?? {
      searchQuery: '',
      selectedCategory: 'semua',
      selectedMethod: 'all',
      isVerifiedOnly: false,
    };
    onFilterChange(updater(current));
  };

  const handleScrollToGlobe = () => {
    const el = document.getElementById(targetGlobeId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`relative w-full min-h-[90dvh] flex flex-col justify-center px-5 pt-28 pb-16 overflow-hidden ${className}`}
    >
      {/* 2. CINEMATIC BACKGROUND & OVERLAY */}
      <img
        src="/images/Marketplace/HeroSection.png"
        alt="ELOVIA Marketplace Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="eager"
      />
      {/* Crucial gradient overlay for mobile text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/90 z-0"
        aria-hidden="true"
      />

      {/* 3. TYPOGRAPHY (Z-Index 10, Stacked Layout) */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col">
        {/* Verified Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold tracking-widest uppercase w-fit mb-5 shadow-sm font-jakarta">
          <BadgeCheck size={14} className="text-emerald-400 shrink-0" />
          <span>Mitra Daur Ulang Terverifikasi</span>
        </div>

        {/* Headline in Fraunces Serif */}
        <h1 className="text-4xl sm:text-5xl font-bold font-fraunces text-white leading-[1.15] mb-4 tracking-tight drop-shadow-md">
          Temukan Mitra <br /> Daur Ulang <br /> Terdekat
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-300 leading-relaxed mb-8 font-jakarta drop-shadow-sm">
          Salurkan material terpilah Anda ke bank sampah atau agregator terpercaya
          dengan harga transparan.
        </p>

        {/* 4. THE GLASSMORPHISM SEARCH PANEL (Mobile Compact Version) */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-5 shadow-2xl flex flex-col gap-4 font-jakarta">
          {/* Search Input */}
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                updateFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              placeholder="Cari nama mitra, kota..."
              className="w-full bg-slate-900/50 text-white placeholder-slate-400 rounded-2xl py-3.5 pl-11 pr-10 border border-white/10 focus:border-emerald-400 outline-none text-sm transition-all focus:ring-2 focus:ring-emerald-400/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => updateFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                aria-label="Bersihkan pencarian"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Categories (Horizontal Scroll) */}
          <div className="flex overflow-x-auto gap-2 custom-scrollbar pb-1 text-xs">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    updateFilters((prev) => ({ ...prev, selectedCategory: cat.id }))
                  }
                  className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-xl flex gap-1.5 items-center transition-all cursor-pointer whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-slate-300'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Toggles (Pickup / Drop-off) */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                updateFilters((prev) => ({
                  ...prev,
                  selectedMethod: prev.selectedMethod === 'pickup' ? 'all' : 'pickup',
                }))
              }
              className={`flex-1 border text-xs py-2.5 rounded-xl flex justify-center items-center gap-2 transition-all cursor-pointer select-none ${
                selectedMethod === 'pickup'
                  ? 'bg-emerald-500 border-emerald-400 text-white font-semibold shadow-sm'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <Truck size={14} />
              <span>Pickup</span>
            </button>

            <button
              type="button"
              onClick={() =>
                updateFilters((prev) => ({
                  ...prev,
                  selectedMethod: prev.selectedMethod === 'dropoff' ? 'all' : 'dropoff',
                }))
              }
              className={`flex-1 border text-xs py-2.5 rounded-xl flex justify-center items-center gap-2 transition-all cursor-pointer select-none ${
                selectedMethod === 'dropoff'
                  ? 'bg-emerald-500 border-emerald-400 text-white font-semibold shadow-sm'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <Store size={14} />
              <span>Drop-off</span>
            </button>
          </div>
        </div>

        {/* 5. THE STATS (Bottom of Hero) */}
        <div className="relative z-10 w-full max-w-md mx-auto grid grid-cols-3 gap-2 mt-10 pt-6 border-t border-white/15">
          <div className="flex flex-col">
            <span className="text-xl font-bold font-fraunces text-white">100+</span>
            <span className="text-[10px] text-slate-400 font-jakarta">Mitra Terdaftar</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-fraunces text-white">10.000+</span>
            <span className="text-[10px] text-slate-400 font-jakarta">Transaksi Sukses</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-fraunces text-white">100%</span>
            <span className="text-[10px] text-slate-400 font-jakarta">Harga Transparan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
