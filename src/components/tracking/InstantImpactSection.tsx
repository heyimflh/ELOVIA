'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Leaf, Trees, Droplets } from 'lucide-react';

interface InstantImpactSectionProps {
  carbonOffset?: string;
  greenPoints?: string;
  waterSaved?: string;
}

export function InstantImpactSection({
  carbonOffset = '+12.4 kg CO2e',
  greenPoints = '+120 Green Points',
  waterSaved = '48 Liter',
}: InstantImpactSectionProps) {
  return (
    <div
      className="w-full bg-gradient-to-r from-green-900/40 via-emerald-950/25 to-transparent border border-green-500/30 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 transform-gpu backface-hidden shadow-2xl relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background ambient shine */}
      <div
        className="absolute top-0 left-10 w-80 h-32 bg-green-400/15 blur-[70px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Impact Metrics Widget (Left) */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 relative z-10">
        {/* Glowing Eco Badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold font-jakarta inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            <span className="text-sm">🌱</span>
            <span>{carbonOffset} Dicegah</span>
          </div>

          <div className="bg-amber-500/20 border border-amber-400/40 text-amber-300 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold font-jakarta inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <span className="text-sm">⭐</span>
            <span>{greenPoints} Diperoleh</span>
          </div>

          <div className="hidden sm:inline-flex bg-teal-500/20 border border-teal-400/40 text-teal-300 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold font-jakarta items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-teal-300" />
            <span>{waterSaved} Air Dilestarikan</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-white font-jakarta tracking-tight">
          Kontribusi Ekologis Anda Terdistribusi!
        </h3>

        {/* Subtitle */}
        <p className="text-white/70 text-xs sm:text-sm max-w-xl font-jakarta leading-relaxed">
          Setiap gram sampah yang disalurkan membantu memulihkan ekosistem lokal Kebumen dan langsung menumbuhkan bibit pohon di kebun digital Anda.
        </p>
      </div>

      {/* Impact CTA Button (Right) */}
      <div className="relative z-10 shrink-0">
        <Link
          href="/taman"
          className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-green-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95 text-sm sm:text-base"
        >
          <span>Lihat Kebun Digital Anda</span>
          <ArrowUpRight className="w-4 h-4 text-green-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

