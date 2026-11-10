'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Scan,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Leaf,
  Layers,
  Coins,
  Compass,
} from 'lucide-react';

export interface EmptyWalletJourneyStateProps {
  className?: string;
  onExploreMarketplaceClick?: () => void;
}

export function EmptyWalletJourneyState({
  className = '',
}: EmptyWalletJourneyStateProps) {
  const shouldReduceMotion = useReducedMotion();

  // Floating animation variants for 3D wallet
  const floatingWalletVariants = {
    initial: { y: 0 },
    animate: shouldReduceMotion
      ? {}
      : {
          y: [-8, 8, -8],
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        },
  };

  // Subtle drifting particles
  const particleVariants = (delay: number, distance: number) => ({
    initial: { y: 0, opacity: 0.6 },
    animate: shouldReduceMotion
      ? {}
      : {
          y: [-distance, distance, -distance],
          opacity: [0.4, 0.85, 0.4],
          transition: {
            duration: 5 + delay,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay,
          },
        },
  });

  return (
    <div
      className={`relative w-full rounded-[2.5rem] bg-gradient-to-b from-white/95 via-emerald-50/20 to-white/95 backdrop-blur-xl border border-emerald-100/70 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.08)] p-6 sm:p-10 lg:p-14 overflow-hidden text-center flex flex-col items-center justify-center ${className}`}
    >
      {/* ── Background & Ambient Lighting Atmosphere ── */}
      {/* 1. Large Central Radial Emerald Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-emerald-400/18 via-teal-300/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2. Top Subtle Ambient Horizon Light */}
      <div
        className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 3. Tactile Micro-Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay -z-10"
        style={{
          backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* ── Main 3D Empty Wallet Illustration Composition ── */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] mx-auto mb-8 flex items-center justify-center">
        {/* Ambient shadow underneath */}
        <div
          className="absolute -bottom-6 w-3/4 h-8 bg-emerald-950/10 rounded-full blur-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Ethereal Floating Particles */}
        <motion.div
          variants={particleVariants(0, 10)}
          initial="initial"
          animate="animate"
          className="absolute -top-3 left-4 sm:left-8 w-8 h-8 rounded-full bg-emerald-100/80 backdrop-blur-md border border-emerald-300/40 flex items-center justify-center text-emerald-600 shadow-[0_4px_16px_rgba(16,185,129,0.2)] pointer-events-none z-10"
        >
          <Leaf className="w-4 h-4 stroke-[2.2]" />
        </motion.div>

        <motion.div
          variants={particleVariants(1.2, 14)}
          initial="initial"
          animate="animate"
          className="absolute -bottom-1 right-6 sm:right-10 w-9 h-9 rounded-full bg-teal-100/80 backdrop-blur-md border border-teal-300/40 flex items-center justify-center text-teal-600 shadow-[0_4px_16px_rgba(20,184,166,0.2)] pointer-events-none z-10"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>

        {/* Secondary Pill Badge: 0 TRANSACTIONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-4 right-1 sm:right-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-emerald-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-2 pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-slate-800 tracking-wide">
            0 TRANSACTIONS
          </span>
        </motion.div>

        {/* 3D Wallet Main Focal Point */}
        <motion.div
          variants={floatingWalletVariants}
          initial="initial"
          animate="animate"
          className="relative z-0 select-none pointer-events-none"
        >
          <Image
            src="/images/dompet/empty-wallet-3d.png"
            alt="ELOVIA 3D Eco-Wallet Waiting for First Earnings"
            width={480}
            height={480}
            priority
            className="w-full h-auto max-w-[280px] sm:max-w-[340px] md:max-w-[380px] object-contain drop-shadow-[0_20px_35px_rgba(16,185,129,0.18)]"
          />
        </motion.div>
      </div>

      {/* ── Content & Typography Hierarchy ── */}
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-4 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>YOUR JOURNEY STARTS HERE</span>
        </motion.div>

        {/* Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] max-w-xl font-jakarta"
        >
          Your Wallet is Waiting to Grow
        </motion.h3>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-3.5 text-slate-500 text-sm sm:text-base font-light max-w-lg leading-relaxed"
        >
          Setiap sampah yang kamu pilah punya nilai. Mulai langkah pertamamu dan
          ubah material menjadi penghasilan yang berarti bagi lingkungan dan
          dompetmu.
        </motion.p>

        {/* ── Primary CTA Button (Scan Material) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="mt-8 w-full sm:w-auto"
        >
          <Link
            href="/pindai"
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm sm:text-base shadow-[0_12px_32px_-8px_rgba(16,185,129,0.45)] hover:shadow-[0_18px_40px_-6px_rgba(16,185,129,0.55)] transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {/* Soft pulse glow behind button */}
            <span
              className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-md group-hover:bg-emerald-400/30 transition-all pointer-events-none"
              aria-hidden="true"
            />

            <Scan className="w-5 h-5 text-emerald-100 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10 tracking-tight">
              Pindai Nilai Material Pertamamu
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </Link>
        </motion.div>

        {/* Small Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3.5 text-xs text-slate-400 flex items-center justify-center gap-1.5 font-light"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Ready for your first contribution &bull; 100% transparan tanpa biaya
            tersembunyi
          </span>
        </motion.p>

        {/* ── Micro-Perks / Trust Highlights Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl text-left"
        >
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Deteksi AI Cepat
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kenali jenis sampah seketika
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Harga Pasar Wajar
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Estimasi transparan & riil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100/90 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 leading-tight">
                Mitra Resmi
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Bank Sampah & Agregator legal
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EmptyWalletJourneyState;

