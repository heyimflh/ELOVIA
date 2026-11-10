'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  Sparkles,
  Layers,
  Leaf,
  Scale,
} from 'lucide-react';
import { CatalogMaterial } from './catalogData';

interface MaterialPriceGridProps {
  materials: CatalogMaterial[];
  onSelectMaterial: (material: CatalogMaterial) => void;
  onResetFilters: () => void;
}

export function MaterialPriceGrid({
  materials,
  onSelectMaterial,
  onResetFilters,
}: MaterialPriceGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 relative z-10">
      {/* Dynamic Grid / Results List */}
      <AnimatePresence mode="popLayout">
        {materials.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {materials.map((item, idx) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.3) }}
                onClick={() => onSelectMaterial(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectMaterial(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Buka panduan preparasi untuk ${item.name}`}
                className="bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 rounded-[2rem] p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 relative overflow-hidden"
              >
                {/* Subtle card top gradient shimmer */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-500/30 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Header: Category Badge + Price Trend Indicator */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-max border border-emerald-100/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.category}
                      <span className="text-[10px] text-emerald-600/80 font-mono">({item.categoryCode})</span>
                    </span>

                    {/* Trend Indicator */}
                    {item.trend.direction === 'up' && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/60">
                        <TrendingUp size={12} className="text-emerald-600" />
                        <span>{item.trend.text}</span>
                      </div>
                    )}
                    {item.trend.direction === 'down' && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                        <TrendingDown size={12} className="text-amber-600" />
                        <span>{item.trend.text}</span>
                      </div>
                    )}
                    {item.trend.direction === 'stable' && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                        <Minus size={12} className="text-slate-500" />
                        <span>{item.trend.text}</span>
                      </div>
                    )}
                  </div>

                  {/* Material Visual & Title */}
                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {/* Compact thumbnail tag */}
                      <div className="relative w-11 h-11 rounded-2xl overflow-hidden shrink-0 border border-slate-200/70 bg-slate-100 shadow-inner">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="44px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Environmental Quick Metric */}
                  <div className="mt-3.5 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                      <Leaf size={12} className="text-emerald-500" />
                      Reduksi ~{item.co2ePerKg} kg CO₂e/kg
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Scale size={12} className="text-slate-400" />
                      Min. {item.specs.minimumWeight.split(' ')[0]} {item.specs.minimumWeight.split(' ')[1] || 'kg'}
                    </span>
                  </div>
                </div>

                <div>
                  {/* Price Range (The Core Value) */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 flex justify-between items-center group-hover:border-emerald-200/80 group-hover:bg-emerald-50/40 transition-colors">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Rentang Harga Mitra</p>
                      <p className="text-[11px] text-slate-400">Acuan agregator terverifikasi</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-emerald-700 text-base tracking-tight">
                        {item.priceRange}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action Hint */}
                  <div className="text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors mt-4 flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-emerald-500/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Klik untuk lihat panduan preparasi
                    </span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full py-16 px-6 text-center bg-white/70 backdrop-blur-xl border border-white/90 rounded-[2.5rem] shadow-sm flex flex-col items-center justify-center max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Material Belum Ditemukan
            </h3>
            <p className="text-slate-500 text-sm mt-2 max-w-md leading-relaxed">
              Tidak ada material daur ulang yang cocok dengan pencarian Anda. Coba kata kunci lain atau pilih dari kategori umum kami.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Tampilkan Semua Material (12)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

