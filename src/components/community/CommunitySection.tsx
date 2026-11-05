'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import {
  Users,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { AnimatedDotGrid } from './AnimatedDotGrid';
import { ActiveChallengeCard } from './ActiveChallengeCard';
import { LeaderboardPreview } from './LeaderboardPreview';

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for smooth entrance
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="community-challenge"
      aria-labelledby="community-heading"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-white selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* =====================================================================
          1. LIVELY BACKGROUND: PURE WHITE WITH SUBTLE ANIMATED DOT-GRID
          Moving slowly in the background to make the section feel alive
          ===================================================================== */}
      <AnimatedDotGrid />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* =====================================================================
            2. SECTION HEADER (PRD Compliant Typography)
            Eyebrow: CIRCULAR CHAMPIONS
            Headline: Make It a Community Movement (Fraunces font)
            Subheadline: Plus Jakarta Sans
            ===================================================================== */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] text-xs font-semibold tracking-widest text-[#177A47] uppercase font-jakarta shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#177A47]" />
            <span>CIRCULAR CHAMPIONS</span>
          </div>

          {/* Section Headline (Fraunces font) */}
          <h2
            id="community-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-tight text-[#0F1F17] font-fraunces leading-[1.15]"
          >
            Make It a Community Movement
          </h2>

          {/* Subheadline (Plus Jakarta Sans) */}
          <p className="text-base sm:text-lg text-[#4A5D52] leading-relaxed font-jakarta max-w-2xl mx-auto">
            Bergabung dengan kelompok, selesaikan tantangan bersama, dan lihat dampak kolektif
            komunitasmu tumbuh.
          </p>
        </motion.div>

        {/* =====================================================================
            3. MODERN ASYMMETRICAL BENTO BOX GRID LAYOUT
            Left Box (lg:col-span-7): Active Challenge Card (Spanning Larger)
            Right Box (lg:col-span-5): Leaderboard Preview Card (Glass-like list)
            Stacks elegantly on mobile (Active Challenge on top, Leaderboard below)
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-14">
          {/* Left Bento: Active Challenge Card (spanning 7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <ActiveChallengeCard />
          </div>

          {/* Right Bento: Leaderboard Preview Card (spanning 5 columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <LeaderboardPreview />
          </div>
        </div>

        {/* =====================================================================
            4. BOTTOM CTA & PRD DISCLAIMER
            CTA: Primary Green (bg-green-600 hover:bg-green-700) -> /komunitas
            Disclaimer: Peringkat dihitung otomatis berdasarkan berat material...
            ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          {/* Primary Green CTA Button */}
          <Link
            href="/komunitas"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#177A47] hover:bg-[#0F5F37] text-white font-jakarta font-semibold text-base shadow-[0_4px_16px_rgba(23,122,71,0.22)] hover:shadow-[0_8px_24px_rgba(23,122,71,0.3)] transition-all duration-300 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-[#177A47]/40 active:scale-[0.98]"
          >
            <span>Lihat Peringkat &amp; Gabung Kelompok</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* PRD Disclaimer Text (small, muted) */}
          <div className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-[13px] text-[#5D7065] max-w-xl font-jakarta">
            <ShieldCheck className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
            <p>
              Peringkat dihitung otomatis berdasarkan berat material yang terverifikasi selesai.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

