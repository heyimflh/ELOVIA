'use client';

import { motion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';

interface CartHeaderProps {
  itemCount: number;
}

export function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8 lg:mb-10"
    >
      {/* Top Eyebrows & Stage Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {/* Eyebrow text ('TINJAU PENYALURAN', tracked out, text-green-700) */}
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#0F5F37] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#177A47] animate-pulse" />
          TINJAU PENYALURAN
        </span>

        {/* PRD Journey Indicator Pill (02 Identify & Value) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#D3EBDB]/60 text-[11px] font-semibold text-[#4A5D52] shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-[#177A47]" />
          <span>Tahap 02 / 04 • Identify & Value</span>
        </div>

        {/* Active items count pill */}
        {itemCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F4EC] text-[#0F5F37] text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-[#2FA866]" />
            {itemCount} Material Siap Salur
          </span>
        )}
      </div>

      {/* Main Title in 'Fraunces' font, massive and elegant */}
      <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-[#0F1F17] tracking-tight leading-[1.08] font-bold">
        Siap menciptakan <br className="hidden sm:inline" />
        <span className="italic font-normal bg-gradient-to-r from-[#177A47] via-[#2FA866] to-[#0E7C7B] bg-clip-text text-transparent">
          nilai baru?
        </span>
      </h1>

      {/* Subtitle in Plus Jakarta Sans */}
      <p className="mt-3.5 text-base sm:text-lg text-[#4A5D52] font-jakarta max-w-2xl leading-relaxed">
        Tinjau material Anda sebelum memilih mitra penyaluran. Pastikan kualitas dan berat
        material sesuai untuk mendapatkan nilai tukar optimal.
      </p>
    </motion.header>
  );
}

