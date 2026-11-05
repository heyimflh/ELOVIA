'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import {
  Sparkles,
  Clock,
  ShieldCheck,
  Users,
  Target,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
} from 'lucide-react';
import type { ChallengeItem } from './types';

interface ActiveChallengeCardProps {
  challenge?: ChallengeItem;
}

const DEFAULT_CHALLENGE: ChallengeItem = {
  id: 'nov-kampus-bebas-plastik',
  title: 'Tantangan November: Kampus Bebas Plastik',
  subtitle:
    'Aksi kolektif antar-kampus dan komunitas warga untuk memilah serta menyalurkan plastik PET & HDPE bersih terverifikasi.',
  category: 'Plastik PET & HDPE',
  scope: 'Kampus & Komunitas Nasional',
  currentKg: 750,
  targetKg: 1000,
  participantsGroups: 48,
  participantsUsers: 1240,
  daysRemaining: 12,
  hoursRemaining: 4,
  countdownText: 'Berakhir dalam: 12 Hari 4 Jam',
};

export function ActiveChallengeCard({ challenge = DEFAULT_CHALLENGE }: ActiveChallengeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  // Animated counter state for verified kg (ticking up from 0 to 750)
  const [displayKg, setDisplayKg] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplayKg(challenge.currentKg);
      return;
    }

    const controls = animate(0, challenge.currentKg, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplayKg(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, challenge.currentKg, shouldReduceMotion]);

  const percentage = Math.round((challenge.currentKg / challenge.targetKg) * 100);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col justify-between h-full bg-white rounded-2xl sm:rounded-3xl border border-[#D3EBDB] p-6 sm:p-8 lg:p-9 shadow-[0_10px_30px_rgba(23,122,71,0.05),0_1px_3px_rgba(15,31,23,0.04)] shadow-[inset_0_0_36px_rgba(232,244,236,0.55)] overflow-hidden"
    >
      {/* Decorative subtle ambient mint glow circle in the top corner */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-[#E8F4EC] to-transparent rounded-full blur-2xl pointer-events-none opacity-60"
      />

      {/* Main card contents */}
      <div className="relative z-10 space-y-6 sm:space-y-7">
        {/* ===================================================================
            HEADER: Status Pill, Category, and Countdown
            =================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Active Status Badge with Pulsing Live Dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4EC] border border-[#A9D3B8] text-xs font-semibold text-[#177A47]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FA866] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#177A47]" />
            </span>
            <span className="tracking-wide">TANTANGAN AKTIF</span>
          </div>

          {/* Sleek Countdown Timer */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6FAF7] border border-[#D3EBDB] text-xs text-[#0F1F17] shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#177A47]" />
            <span className="text-[#4A5D52] font-medium">Berakhir dalam:</span>
            <span className="font-mono font-semibold text-[#177A47] tracking-tight">
              12 Hari 4 Jam
            </span>
          </div>
        </div>

        {/* ===================================================================
            CHALLENGE INFO: Title, Subtitle, and Material Category Tag
            =================================================================== */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-[#4A5D52]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#F6FAF7] border border-[#D3EBDB] font-jakarta">
              <Layers className="w-3 h-3 text-[#2FA866]" />
              {challenge.category}
            </span>
            <span className="hidden sm:inline-block text-[#A9D3B8]">•</span>
            <span className="hidden sm:inline-block text-[#5D7065]">{challenge.scope}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F1F17] tracking-tight font-jakarta leading-snug">
            {challenge.title}
          </h3>

          <p className="text-sm sm:text-base text-[#4A5D52] leading-relaxed font-jakarta">
            {challenge.subtitle}
          </p>
        </div>

        {/* ===================================================================
            PROGRESS SECTION: Animated Counter & Percentage Bar
            =================================================================== */}
        <div className="space-y-3.5 pt-2">
          {/* Metrics Row: Current vs Target */}
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5D7065] block mb-1">
                Terkumpul Saat Ini
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#177A47] tabular-nums tracking-tight">
                  {displayKg.toLocaleString('id-ID')}
                </span>
                <span className="font-mono text-base sm:text-lg font-semibold text-[#0F1F17]">
                  kg
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5D7065] block mb-1">
                Target Komunitas
              </span>
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#4A5D52] tabular-nums">
                  {challenge.targetKg.toLocaleString('id-ID')}
                </span>
                <span className="font-mono text-sm font-medium text-[#5D7065]">
                  kg
                </span>
              </div>
            </div>
          </div>

          {/* Thick, Beautiful Progress Bar (lime-400 to green-600) */}
          <div className="relative w-full h-6 sm:h-7 bg-[#E8F4EC] rounded-full p-1 border border-[#D3EBDB] overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="relative h-full rounded-full bg-gradient-to-r from-lime-400 via-[#2FA866] to-[#177A47] shadow-[0_2px_8px_rgba(23,122,71,0.25)] flex items-center justify-end pr-2.5"
            >
              {/* Shimmer sweep effect */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: 'linear',
                  repeatDelay: 1.2,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none"
              />

              {/* Progress percentage pill inside or beside the bar */}
              <span className="relative z-10 text-[11px] sm:text-xs font-mono font-bold text-white drop-shadow-xs">
                {percentage}%
              </span>
            </motion.div>
          </div>

          {/* Milestone markers */}
          <div className="flex justify-between items-center text-[11px] font-mono text-[#5D7065] px-1 pt-0.5">
            <span>0 kg</span>
            <span className="hidden sm:inline">250 kg (25%)</span>
            <span className="hidden sm:inline">500 kg (50%)</span>
            <span className="font-semibold text-[#177A47]">750 kg (75%)</span>
            <span className="font-bold text-[#0F1F17]">1.000 kg (Target)</span>
          </div>
        </div>

        {/* ===================================================================
            COMMUNITY IMPACT INDICATORS
            =================================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {/* Metric 1: Groups */}
          <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]">
            <div className="flex items-center gap-1.5 text-xs text-[#5D7065] mb-1">
              <Users className="w-3.5 h-3.5 text-[#177A47]" />
              <span>Kelompok Terlibat</span>
            </div>
            <div className="font-mono text-base sm:text-lg font-bold text-[#0F1F17]">
              48 Kelompok
            </div>
          </div>

          {/* Metric 2: Contributors */}
          <div className="p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]">
            <div className="flex items-center gap-1.5 text-xs text-[#5D7065] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2FA866]" />
              <span>Kontributor Aktif</span>
            </div>
            <div className="font-mono text-base sm:text-lg font-bold text-[#0F1F17]">
              1.240+ Orang
            </div>
          </div>

          {/* Metric 3: Verification */}
          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB]">
            <div className="flex items-center gap-1.5 text-xs text-[#5D7065] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#177A47]" />
              <span>Verifikasi</span>
            </div>
            <div className="font-jakarta text-xs sm:text-sm font-semibold text-[#177A47] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2FA866]" />
              Timbangan Mitra
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info note */}
      <div className="relative z-10 mt-6 pt-5 border-t border-[#D3EBDB]/80 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D7065]">
        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-[#177A47]" />
          <span>Tersisa <strong>250 kg</strong> lagi untuk membuka lencana sirkular edisi terbatas</span>
        </div>
        <div className="inline-flex items-center gap-1 text-[#177A47] font-medium font-jakarta">
          <span>Periode: 1 – 30 Nov 2026</span>
        </div>
      </div>
    </motion.div>
  );
}

