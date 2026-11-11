'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export function MarketplaceTransitionBridge() {
  const handleScrollToGlobe = () => {
    const el = document.getElementById('marketplace-globe-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="marketplace-bridge-view"
      className="relative w-full min-h-[85vh] md:min-h-screen bg-[#F6FAF7] overflow-hidden flex flex-col justify-center items-center py-20 sm:py-24 md:py-28 select-none"
    >
      {/* =====================================================================
          1. AMBIENT BACKGROUND & MINT DOTTED PATTERN
          ===================================================================== */}
      {/* Subtle Mint Dot Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#177A47 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Top and Bottom Gradient Blends for Seamless Integration */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/40 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Ambient Radial Glowing Orbs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[540px] md:w-[700px] h-[320px] sm:h-[540px] md:h-[700px] bg-gradient-to-tr from-[#2FA866]/15 via-[#177A47]/10 to-[#0E7C7B]/10 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* =====================================================================
          2. STATIC EDITORIAL TYPOGRAPHY & HERO HEADLINE
          Clean, rock-solid responsive container that never breaks on mobile
          ===================================================================== */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Subtle Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-2xs select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ELOVIA Marketplace</span>
        </motion.div>

        {/* Massive Editorial Headline with Hand-Drawn Arrow */}
        <div className="relative w-full">
          {/* Hand-drawn Green Arrow SVG Ornament (Hidden on mobile to ensure zero overlap) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block absolute -top-12 lg:-top-14 right-2 lg:right-12 pointer-events-none z-20 text-[#177A47] drop-shadow-sm"
            aria-hidden="true"
          >
            <svg
              className="w-24 sm:w-28 lg:w-36 h-auto"
              viewBox="0 0 386 127"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Clean Static Headline: Solid Dark Text + Vibrant Gradient Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tight text-slate-900 leading-[1.12] md:leading-[1.1] mb-6 font-jakarta"
          >
            Setiap Material <br className="hidden sm:block" />
            Memiliki{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 font-serif italic pr-1">
              Nilai Baru.
            </span>
          </motion.h1>
        </div>

        {/* Clean, Readable Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal"
        >
          Temukan pembeli yang tepat untuk material daur ulang Anda atau pasok kebutuhan
          industri Anda langsung dari sumber terverifikasi.
        </motion.p>

        {/* Action Button & Telemetry Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-md mx-auto"
        >
          <button
            type="button"
            onClick={handleScrollToGlobe}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-emerald-200 group-hover:rotate-45 transition-transform" />
            <span>Jelajahi Peta Sentra Sirkular</span>
            <ArrowDown className="w-4 h-4 text-emerald-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>50+ Mitra Terverifikasi SNI</span>
          </div>
        </motion.div>

        {/* =====================================================================
            3. FLOATING GLASS MISSION CARD
            ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white p-5 sm:p-7 rounded-[28px] sm:rounded-[32px] shadow-[0_20px_50px_-15px_rgba(16,185,129,0.08)] transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.12)]">
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
              Setiap kilogram sampah yang Anda daur ulang menciptakan efek bola salju bagi
              pelestarian lingkungan. Bergabunglah bersama kami menciptakan{' '}
              <span className="text-emerald-700 font-bold">ekosistem sirkular</span> yang
              menguntungkan Anda dan bumi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MarketplaceTransitionBridge;
