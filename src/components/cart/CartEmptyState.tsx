'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scan, Sparkles, RotateCcw, ArrowRight, ShoppingBag, Leaf } from 'lucide-react';

interface CartEmptyStateProps {
  onResetDemo: () => void;
}

export function CartEmptyState({ onResetDemo }: CartEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-full max-w-2xl mx-auto w-full py-12 px-6 sm:px-12 text-center"
    >
      {/* Tactile Glass Container */}
      <div className="relative bg-white/75 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(23,122,71,0.06)] border border-white/80 overflow-hidden">
        {/* Soft Ambient Glows inside card */}
        <div
          className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#D3EBDB]/50 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-[#E8F4EC]/60 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Glowing 3D Illustration Placeholder */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 flex items-center justify-center">
          {/* Animated concentric soft halo rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D3EBDB]/40 via-[#A9D3B8]/30 to-[#E8F4EC]/40 animate-ping duration-[4000ms] pointer-events-none" />
          <div className="absolute inset-2 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] shadow-[0_12px_28px_rgba(23,122,71,0.12)] flex items-center justify-center">
            {/* 3D Glass Shopping Bag & Eco Leaf floating icon */}
            <div className="relative">
              <ShoppingBag className="w-12 h-12 text-[#177A47] stroke-[1.8]" />
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#2FA866] text-white flex items-center justify-center shadow-md border-2 border-white"
              >
                <Leaf className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Header Text */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#0F5F37] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3 h-3 text-[#2FA866]" />
          Belum Ada Material
        </span>

        <h2 className="font-fraunces text-3xl sm:text-4xl text-[#0F1F17] font-bold tracking-tight mb-3">
          Keranjang Anda masih kosong
        </h2>

        <p className="text-[#4A5D52] font-jakarta text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          Belum ada material terpilah yang ditambahkan. Gunakan Waste Value Scanner untuk
          mengidentifikasi jenis sampah, menimbang beratnya, dan menemukan potensi nilai
          ekonominya.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Primary CTA linking back to Scanner (/pindai) */}
          <Link
            href="/pindai"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#177A47] hover:bg-[#0F5F37] text-white font-jakarta font-bold text-sm shadow-[0_8px_20px_rgba(23,122,71,0.25)] hover:shadow-[0_12px_28px_rgba(23,122,71,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Scan className="w-4 h-4 stroke-[2.2]" />
            <span>Buka Waste Value Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary CTA: Reset/Load Demo Items for easy evaluation */}
          <button
            type="button"
            onClick={onResetDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#0F5F37] border border-[#D3EBDB] font-semibold text-sm transition-all duration-300 hover:shadow-xs active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Muat Contoh Material (Demo)</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

