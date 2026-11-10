'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Wallet, Sparkles } from 'lucide-react';
import { ThreePillarLedgerCards } from './ThreePillarLedgerCards';

export interface VaultlyEcoWalletHeroProps {
  userName?: string;
  confirmedBalance?: number;
  inProgressBalance?: number;
  estimatedBalance?: number;
  className?: string;
}

// Framer Motion entry variants for header text
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const textFadeUp: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function VaultlyEcoWalletHero({
  userName = 'Lestari',
  confirmedBalance = 24500,
  inProgressBalance = 12800,
  estimatedBalance = 38200,
  className = '',
}: VaultlyEcoWalletHeroProps) {
  return (
    <div
      className={`min-h-screen relative flex flex-col bg-fixed bg-cover bg-center bg-no-repeat overflow-hidden ${className}`}
      style={{ backgroundImage: "url('/images/dompet/hero.jpg')" }}
    >
      {/* ── Layer 1 (Dark Overlay): covers the whole image ── */}
      <div
        className="absolute inset-0 bg-[#0F161E]/70 mix-blend-multiply pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle tactile noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Layer 2 (The Fade to White): sits at the bottom creating a smooth floor ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── 3. Top Content (Header & Text) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center pt-32 pb-48 w-full px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto"
      >
        {/* Pill Badge */}
        <motion.div
          variants={textFadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 border border-white/20 px-4 py-1.5 text-sm font-medium shadow-[0_4px_20px_rgba(0,0,0,0.25)] mb-6"
        >
          <Wallet className="w-4 h-4 text-emerald-300" />
          <span>EcoWallet &bull; Ledger</span>
        </motion.div>

        {/* Headline: Clean sans-serif + Elegant editorial serif italic mix */}
        <motion.h1
          variants={textFadeUp}
          className="text-5xl sm:text-6xl md:text-7xl text-white font-medium tracking-tight mt-6 mb-4 leading-[1.12] drop-shadow-lg"
        >
          My{' '}
          <span className="font-[family-name:var(--font-fraunces)] italic font-light tracking-normal text-emerald-200 drop-shadow-[0_2px_24px_rgba(167,243,208,0.35)]">
            Waste
          </span>{' '}
          Earnings
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={textFadeUp}
          className="text-lg text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Lihat nilai yang telah kamu ciptakan dari memilah sampah,{' '}
          <span className="inline-flex items-center font-medium text-white group cursor-default">
            <span className="text-emerald-300 underline decoration-emerald-400/40 underline-offset-4">
              {userName}
            </span>
            <motion.span
              className="inline-flex items-center ml-2 text-emerald-300"
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="w-4 h-4 text-emerald-300 filter drop-shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
            </motion.span>
          </span>
          .
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={textFadeUp} className="mt-8 flex items-center gap-3.5">
          <button className="px-6 py-2.5 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition shadow-[0_8px_24px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 duration-200">
            Tarik Saldo Kas
          </button>
          <button className="px-6 py-2.5 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-white/15 transition border border-white/20 backdrop-blur-md">
            Riwayat Penyaluran
          </button>
        </motion.div>
      </motion.div>

      {/* ── 4. Restored Original 3-Pillar Stats Cards Design with Full Functionality ── */}
      <ThreePillarLedgerCards
        inProgressBalance={inProgressBalance}
        confirmedBalance={confirmedBalance}
        estimatedBalance={estimatedBalance}
      />
    </div>
  );
}

export default VaultlyEcoWalletHero;
