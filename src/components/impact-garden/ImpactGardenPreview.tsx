'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Scale,
  CloudSun,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { GardenStageId, GARDEN_STAGES } from './types';
import { FloatingParticles } from './FloatingParticles';
import { GardenScene } from './GardenScene';
import { GrowthControls } from './GrowthControls';
import { MaterialLegend } from './MaterialLegend';

export function ImpactGardenPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  // Active growth stage state
  const [currentStage, setCurrentStage] = useState<GardenStageId>('rimbun');
  // Highlighted material element state (from hover or click)
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const activeStageObj = GARDEN_STAGES.find((s) => s.id === currentStage) || GARDEN_STAGES[0];

  // Animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="impact-garden-preview"
      aria-labelledby="impact-garden-heading"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-[#F6FAF7] to-[#E8F4EC] selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* =====================================================================
          1. SOOTHING AMBIENT LIGHTING & ECO TECH PATTERN
          ===================================================================== */}
      <div
        className="absolute inset-0 bg-eco-grid opacity-55 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D3EBDB]/45 via-[#E8F4EC]/60 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#A9D3B8]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* =====================================================================
            2. SECTION HEADER
            ===================================================================== */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D3EBDB] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#177A47] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#177A47]">
              YOUR IMPACT
            </span>
          </div>

          {/* Section Headline using Fraunces */}
          <h2
            id="impact-garden-heading"
            className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F1F17] leading-[1.15]"
          >
            Grow Your <span className="italic font-normal text-[#177A47]">Impact Garden</span>
          </h2>

          {/* Subheadline using Plus Jakarta Sans */}
          <p className="font-jakarta text-base sm:text-lg text-[#4A5D52] max-w-2xl mx-auto leading-relaxed">
            Setiap material yang terverifikasi selesai disalurkan akan menumbuhkan taman virtual Anda.
            Saksikan dampak nyata dari kebiasaan kecil.
          </p>
        </motion.div>

        {/* =====================================================================
            3. COCKPIT LAYOUT (SPLIT SCREEN: ISLAND ON LEFT, DASHBOARD ON RIGHT)
            Solves Issue #1: User can see both the island and material cards
            simultaneously without scrolling up and down!
            ===================================================================== */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-6xl mx-auto"
        >
          {/* ===================================================================
              LEFT COLUMN (7 cols): THE 2.5D REALISTIC ISOMETRIC ISLAND STAGE
              =================================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full rounded-3xl p-4 sm:p-6 bg-white/50 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(23,122,71,0.08)] ring-1 ring-[#D3EBDB]/60 overflow-hidden">
              {/* Floating fireflies and pollen particles */}
              <FloatingParticles count={18} />

              {/* Status Header inside the Island Frame */}
              <div className="relative flex items-center justify-between gap-3 mb-2 px-2 z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#D3EBDB] text-xs font-semibold text-[#0F1F17] shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#177A47]" />
                  <span className="font-mono text-[11px] text-[#177A47]">
                    Taman Aktif • Terverifikasi
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5D7065] bg-white/80 px-2.5 py-1 rounded-full border border-[#D3EBDB]/60">
                  <span className="w-2 h-2 rounded-full bg-[#177A47]" />
                  <span>Ambang: {activeStageObj.weight}</span>
                </div>
              </div>

              {/* The 2.5D Realistic Isometric SVG Garden */}
              <div className="relative z-10">
                <GardenScene
                  stage={currentStage}
                  activeHighlight={activeHighlight}
                  onElementClick={(el) => setActiveHighlight((prev) => (prev === el ? null : el))}
                />
              </div>

              {/* Dynamic Active Hotspot Callout (If element is selected) */}
              {activeHighlight && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="relative z-20 mt-2 p-2.5 rounded-xl bg-white/95 border border-[#177A47]/30 shadow-md text-center max-w-sm mx-auto"
                >
                  <p className="text-xs text-[#0F1F17] font-semibold">
                    Elemen disorot:{' '}
                    <span className="text-[#177A47]">
                      {activeHighlight === 'paper' && '🌿 Pohon & Dedaunan Rimbun (Kertas)'}
                      {activeHighlight === 'plastic' && '🪷 Kolam Jernih & Teratai (Plastik)'}
                      {activeHighlight === 'metal' && '💎 Kristal Mineral & Geode (Logam)'}
                      {activeHighlight === 'glass' && '💧 Embun Kristal & Mata Air (Kaca)'}
                    </span>
                  </p>
                </motion.div>
              )}

              {/* Growth Stage Controls (Pills directly below island) */}
              <div className="relative z-20 mt-4 pt-4 border-t border-[#D3EBDB]/60">
                <GrowthControls
                  currentStage={currentStage}
                  onStageChange={(newStage) => setCurrentStage(newStage)}
                />
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN (5 cols): LIVE IMPACT GARDEN COCKPIT & METRICS
              =================================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Real Impact Live Verified Stats Card */}
            <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#D3EBDB] shadow-sm shadow-[#177A47]/5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#177A47]">
                    KONTRIBUSI TERVERIFIKASI
                  </span>
                  <h3 className="font-fraunces text-xl font-bold text-[#0F1F17]">
                    {activeStageObj.name}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F4EC] text-[#177A47] border border-[#A9D3B8]">
                  {activeStageObj.badge}
                </span>
              </div>

              {/* 2 Live Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F6FAF7] border border-[#D3EBDB]/70">
                  <div className="flex items-center gap-1.5 text-[#5D7065] text-xs mb-1">
                    <Scale className="w-3.5 h-3.5 text-[#177A47]" />
                    <span>Berat Disalurkan</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#0F1F17]">
                    {activeStageObj.verifiedKg} <span className="text-xs text-[#5D7065]">kg</span>
                  </div>
                  <span className="text-[10px] text-[#177A47] font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {activeStageObj.transactionsCount} setoran selesai
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6FAF7] border border-[#D3EBDB]/70">
                  <div className="flex items-center gap-1.5 text-[#5D7065] text-xs mb-1">
                    <CloudSun className="w-3.5 h-3.5 text-[#0E7C7B]" />
                    <span>Emisi Dicegah</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-[#0F1F17]">
                    ~{activeStageObj.emissionsAvoidedKg} <span className="text-xs text-[#5D7065]">kg CO₂e</span>
                  </div>
                  <Link
                    href="/metodologi"
                    className="text-[10px] text-[#0E7C7B] hover:underline flex items-center gap-0.5 mt-1"
                  >
                    <span>Estimasi berdasar metodologi</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>

              {/* Verified Partner Stamp */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#E8F4EC]/60 text-xs text-[#2A4B37]">
                <ShieldCheck className="w-4 h-4 text-[#177A47] shrink-0" />
                <span className="leading-tight">
                  Diverifikasi oleh: <strong className="font-semibold">{activeStageObj.partnerName}</strong>
                </span>
              </div>

              {/* Milestone Achieved Banner */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#E8F4EC] to-[#F6FAF7] border border-[#D3EBDB]">
                <div className="w-8 h-8 rounded-xl bg-[#177A47] text-white flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F1F17]">
                    {activeStageObj.milestoneTitle}
                  </h4>
                  <p className="text-[11px] text-[#4A5D52] leading-snug">
                    {activeStageObj.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Transformasi 4 Material Daur Ulang (Side by Side in Cockpit) */}
            <div className="p-5 rounded-3xl bg-white/80 backdrop-blur-xl border border-[#D3EBDB] shadow-sm shadow-[#177A47]/5">
              <MaterialLegend
                currentStage={currentStage}
                activeHighlight={activeHighlight}
                onHoverElement={(el) => setActiveHighlight(el)}
                onClickElement={(el) => setActiveHighlight((prev) => (prev === el ? null : el))}
              />
            </div>

            {/* Primary Action Button */}
            <div className="space-y-2 pt-1">
              <Link
                href="/taman"
                className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#177A47] hover:bg-[#0F5F37] text-white text-sm sm:text-base font-semibold shadow-lg shadow-[#177A47]/20 hover:shadow-xl hover:shadow-[#177A47]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#177A47]"
              >
                <span>Mulai Tumbuhkan Tamanmu</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <span
                  className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-[11px] text-center text-[#5D7065] leading-relaxed">
                Taman Anda tumbuh permanen setiap kali transaksi penyaluran material diselesaikan.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Screen Reader Alternative for Accessibility */}
        <div className="sr-only" aria-live="polite">
          <p>
            Impact Garden ELOVIA menyajikan pulau isometrik 2.5D yang berkembang dalam 3 tahap: Tunas,
            Rimbun, dan Hutan Kecil. Pertumbuhan merefleksikan 4 jenis sampah terpilah: Kertas menumbuhkan
            pohon rimbun, Plastik membentuk kolam jernih dengan bunga teratai mekar, Logam menghasilkan batu
            mineral dan kristal geode, serta Kaca menghasilkan embun kristal dan aliran mata air alami.
          </p>
        </div>
      </div>
    </section>
  );
}
