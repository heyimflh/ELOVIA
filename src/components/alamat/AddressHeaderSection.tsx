'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, MapPin, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export interface AddressHeaderSectionProps {
  /**
   * Jumlah alamat tersimpan saat ini
   */
  savedCount?: number;
  /**
   * Batas maksimal alamat (default: 5)
   */
  maxCount?: number;
  /**
   * Callback saat tombol "+ Tambah Alamat Baru" diklik
   */
  onAddNew?: () => void;
  /**
   * Status apakah kuota alamat sudah penuh
   */
  isQuotaFull?: boolean;
  /**
   * ClassName tambahan
   */
  className?: string;
}

export function AddressHeaderSection({
  savedCount = 2,
  maxCount = 5,
  onAddNew,
  isQuotaFull = false,
  className = '',
}: AddressHeaderSectionProps) {
  const isAtCapacity = isQuotaFull || savedCount >= maxCount;
  const remainingSlots = Math.max(0, maxCount - savedCount);
  const formattedCount = String(savedCount).padStart(2, '0');
  const formattedMax = String(maxCount).padStart(2, '0');

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`relative w-full rounded-[2.25rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#123D2F] via-[#0E3528] to-[#082219] text-white border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden ${className}`}
    >
      {/* ── Background Atmospheric Ambient Glows ── */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-teal-400/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle organic light sheen on top border */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Main Two-Column Layout ── */}
      <div className="relative z-10 p-7 sm:p-10 md:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ── LEFT COLUMN: Information Area (7 Cols) ── */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-4 shadow-xs select-none">
            <Sparkles size={12} className="text-emerald-400" />
            <span>YOUR PICKUP LOCATIONS</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-3">
            Buku Alamat Penjemputan
          </h1>

          {/* Description */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl font-light mb-8">
            Semua lokasi penjemputan dalam satu tempat. Atur alamat favoritmu dan buat setiap proses
            penyaluran sampah terpilah menjadi lebih praktis dan tepat waktu.
          </p>

          {/* Quota Progress Indicator Panel */}
          <div className="w-full max-w-md p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-mono font-bold tracking-wider text-emerald-300">
                {formattedCount} / {formattedMax} ALAMAT TERSIMPAN
              </span>
              <span className="text-white/60 text-[11px] font-medium">
                {isAtCapacity ? (
                  <span className="text-amber-300 font-semibold">Kuota Penuh</span>
                ) : (
                  `${remainingSlots} slot alamat masih tersedia`
                )}
              </span>
            </div>

            {/* 5-Segmented Visual Bar */}
            <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={savedCount} aria-valuemin={0} aria-valuemax={maxCount}>
              {Array.from({ length: maxCount }).map((_, index) => {
                const isActive = index < savedCount;
                return (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                        : 'bg-white/15'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={onAddNew}
            disabled={isAtCapacity}
            aria-label="Tambah Alamat Baru"
            className="group px-7 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm md:text-base rounded-2xl shadow-[0_12px_28px_rgba(18,184,134,0.35)] hover:shadow-[0_16px_36px_rgba(18,184,134,0.45)] transition-all duration-300 flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 select-none"
          >
            <div className="w-6 h-6 rounded-lg bg-slate-950/15 flex items-center justify-center text-slate-950 transition-transform duration-300 group-hover:rotate-90">
              <Plus size={16} className="stroke-[3]" />
            </div>
            <span>+ Tambah Alamat Baru</span>
          </button>
        </div>

        {/* ── RIGHT COLUMN: 3D Illustration Area (5 Cols) ── */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          {/* Glowing pedestal behind the visual frame */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-300/10 rounded-3xl blur-2xl transform scale-95 pointer-events-none"
            aria-hidden="true"
          />

          {/* 3D Neighborhood Image Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/40 group">
            <Image
              src="/images/login/header.png"
              alt="Miniature 3D Eco Neighborhood ELOVIA"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center scale-105 transition-transform duration-700 ease-out group-hover:scale-100"
            />

            {/* Subtle soft gradient mask to preserve daylight clarity while blending edges */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating Glassmorphism Element 1: Location Verification Chip (Top-Left) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white shadow-lg flex items-center gap-2 text-xs font-bold text-[#19372D] select-none"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin size={13} className="text-emerald-600 shrink-0" />
              <span>Area Jemput Terverifikasi</span>
            </motion.div>

            {/* Floating Glassmorphism Element 2: GPS Courier Accuracy (Bottom-Right) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-3.5 right-3.5 bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2.5 text-xs text-white select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Compass size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/60 uppercase font-mono tracking-wider">
                  Presisi GPS Kurir
                </p>
                <p className="font-semibold text-emerald-300 font-mono text-xs">
                  100% Akurat Pin
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
