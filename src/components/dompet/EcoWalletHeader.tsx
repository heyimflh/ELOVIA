'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface EcoWalletHeaderProps {
  /**
   * User name to be displayed in the personalized greeting.
   * @default 'Lestari'
   */
  userName?: string;

  /**
   * The first part of the headline rendered in crisp white text.
   * @default 'My Waste'
   */
  headlineLead?: string;

  /**
   * The emphasized part of the headline rendered with a soft luxury gradient.
   * @default 'Earnings'
   */
  headlineAccent?: string;

  /**
   * Optional custom subtitle prefix before the user's name.
   * @default 'Lihat nilai yang telah kamu ciptakan dari memilah sampah,'
   */
  subtitlePrefix?: string;

  /**
   * Optional badge label floating subtly above the headline.
   * Defaults to 'EcoWallet • Nilai Sirkular Terverifikasi'
   * Pass null or empty string to hide.
   */
  badgeText?: string | null;

  /**
   * Additional custom class names for the outer <header> container.
   */
  className?: string;
}

// Dreamy "waking up from a dream" Framer Motion variants
const dreamyFadeVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function EcoWalletHeader({
  userName = 'Lestari',
  headlineLead = 'My Waste',
  headlineAccent = 'Earnings',
  subtitlePrefix = 'Lihat nilai yang telah kamu ciptakan dari memilah sampah,',
  badgeText = 'EcoWallet • Portofolio Finansial Sirkular',
  className = '',
}: EcoWalletHeaderProps) {
  return (
    <header
      className={`relative w-full pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* ── 1. Dreamy Glow / Radial Blur Underlay (No solid card box) ── */}
      {/* Subtle, expansive radial gradient ensuring perfect contrast against the mountain landscape */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Atmospheric secondary emerald aura for ethereal depth */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-44 -z-10 bg-emerald-500/10 rounded-full blur-[110px]"
        aria-hidden="true"
      />

      {/* ── 2. Optional Ethereal Pill Badge (Entrance: 0.0s) ── */}
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-emerald-300/90 font-mono">
            {badgeText}
          </span>
        </motion.div>
      )}

      {/* ── 3. Luxurious Headline (Entrance: 0.0s) ── */}
      <motion.h1
        variants={dreamyFadeVariants}
        initial="initial"
        animate="animate"
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance max-w-4xl leading-[1.15]"
      >
        <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          {headlineLead}{' '}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-teal-100 drop-shadow-[0_2px_16px_rgba(52,211,153,0.3)]">
          {headlineAccent}
        </span>
      </motion.h1>

      {/* ── 4. Personal Greeting Subtitle (Entrance: Staggered +0.2s) ── */}
      <motion.p
        variants={dreamyFadeVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.2,
          delay: 0.2, // Staggered by 0.2s as specified
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-4 text-slate-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed text-balance"
      >
        {subtitlePrefix}{' '}
        <span className="inline-flex items-center font-medium text-white group cursor-default">
          <span className="relative">
            <span className="text-emerald-200/90">{userName}</span>
            {/* Subtle glow underline accent */}
            <span
              className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-gradient-to-r from-emerald-400/40 via-teal-300/60 to-transparent"
              aria-hidden="true"
            />
          </span>

          {/* Micro-interaction: continuous scale & 360° rotation */}
          <motion.span
            className="inline-flex items-center ml-2 text-emerald-300 origin-center select-none"
            animate={{
              rotate: 360,
              scale: [1, 1.18, 1],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-300 filter drop-shadow-[0_0_8px_rgba(110,231,183,0.7)]" />
          </motion.span>
        </span>
        .
      </motion.p>
    </header>
  );
}

export default EcoWalletHeader;

