'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  Tag,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  FileCheck2,
  Sparkles,
} from 'lucide-react';

interface AccordionPillar {
  id: string;
  number: string;
  title: string;
  desc: string;
  badge: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACCORDION_PILLARS: AccordionPillar[] = [
  {
    id: 'timbangan-presisi',
    number: '01',
    title: 'Timbangan Presisi',
    desc: 'Berat material dipastikan akurat, terkalibrasi resmi, dan bebas manipulasi.',
    badge: 'Kalibrasi ISO/IEC 17025',
    image: '/images/Marketplace/timbangan-presisi.jpg',
    icon: Scale,
  },
  {
    id: 'harga-acuan',
    number: '02',
    title: 'Harga Acuan Real-time',
    desc: 'Estimasi nilai rupiah selalu mengikuti standar harga agregator daur ulang resmi secara transparan.',
    badge: 'Indeks Pasar Terbuka',
    image: '/images/Marketplace/harga-acuan.jpg',
    icon: Tag,
  },
  {
    id: 'mitra-legal',
    number: '03',
    title: 'Mitra Legal Terverifikasi',
    desc: 'Seluruh fasilitas telah melewati audit kelayakan dan terdaftar resmi berstandar SNI.',
    badge: 'Audit 100% KBLI Daur Ulang',
    image: '/images/Marketplace/mitra-legal.jpg',
    icon: ShieldCheck,
  },
];

export function TrustQualityBanner() {
  const [activePanel, setActivePanel] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* =====================================================================
          1. THE SEAMLESS TRANSITION BACKGROUND (Light Mode / Tema Terang)
          Crisp, eco-tech daylight aesthetic consistent with the ELOVIA design system.
          ===================================================================== */}
      <section
        id="trust-quality-assurance"
        aria-labelledby="trust-banner-heading"
        suppressHydrationWarning
        className="relative w-full min-h-screen py-24 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#F4FAF6] via-white to-[#F6FAF7] border-t border-mint-200/80"
      >
        {/* Subtle Eco-Dot Grid Texture */}
        <div
          className="absolute inset-0 bg-eco-grid opacity-60 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient Soft Mint Glow in Background */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-mint-200/35 blur-[140px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Ambient Soft Lime Glow Accent */}
        <div
          className="absolute bottom-12 right-12 w-[550px] h-[400px] rounded-full bg-lime-100/40 blur-[120px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* =====================================================================
            2. GRAND HEADLINE AREA (Top - Light Mode)
            ===================================================================== */}
        <div className="w-full max-w-7xl mx-auto px-6 mb-12 text-center md:text-left z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-100/90 border border-mint-200 text-green-800 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>KEPERCAYAAN &amp; TRANSPARANSI</span>
          </div>

          {/* Headline in 'Fraunces' font */}
          <h2
            id="trust-banner-heading"
            className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-ink-900 leading-tight tracking-tight mb-4"
          >
            Jaminan Penyaluran Berstandar SNI.
          </h2>

          {/* Subtitle */}
          <p className="text-ink-600 text-base sm:text-lg md:text-xl max-w-2xl font-jakarta leading-relaxed">
            Setiap langkah penyaluran material Anda dijamin aman, terukur, dan
            menguntungkan.
          </p>
        </div>

        {/* =====================================================================
            3. THE HORIZONTAL EXPANDING HOVER CARDS (Accordion Gallery)
            ===================================================================== */}
        <div className="w-full max-w-7xl mx-auto h-[620px] md:h-[600px] flex flex-col md:flex-row gap-4 px-6 z-10">
          {ACCORDION_PILLARS.map((pillar, index) => {
            const isActive = activePanel === index;
            const IconComponent = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                onMouseEnter={() => setActivePanel(index)}
                onClick={() => {
                  setActivePanel(index);
                  if (isActive) {
                    setModalOpen(true);
                  }
                }}
                animate={{
                  flex: isActive ? 3 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 30,
                }}
                className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer group transition-all duration-500 border ${
                  isActive
                    ? 'border-emerald-400/90 shadow-[0_20px_50px_rgba(23,122,71,0.18)] ring-2 ring-emerald-400/30'
                    : 'border-mint-200/90 bg-white shadow-soft hover:shadow-lg hover:border-mint-300'
                }`}
              >
                {/* 1. Background Image with subtle cinematic zoom */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* 2. Light Theme Gradient Overlay for Contrast & Readability */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    isActive
                      ? 'bg-gradient-to-t from-white via-white/85 to-transparent'
                      : 'bg-gradient-to-t from-white/95 via-white/80 to-white/30 group-hover:from-white/90 group-hover:via-white/70'
                  }`}
                  aria-hidden="true"
                />

                {/* Subtle Inner Mint Sheen */}
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-300 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* =============================================================
                    COLLAPSED VIEW (When Inactive - Light Theme)
                    Desktop: Clean vertical rotated title & pillar badge
                    Mobile: Horizontal title strip
                    ============================================================= */}
                {!isActive && (
                  <>
                    {/* Desktop Collapsed View */}
                    <div className="hidden md:flex absolute inset-0 p-8 flex-col justify-between items-start pointer-events-none z-10">
                      {/* Top Pill Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-mint-200 flex items-center justify-center text-green-700 shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-green-700" />
                      </div>

                      {/* Vertically Rotated Title */}
                      <div className="origin-bottom-left -rotate-90 translate-x-5 mb-10 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-green-700 tracking-widest mr-3">
                          {pillar.number}
                        </span>
                        <span className="font-jakarta font-extrabold text-lg text-ink-900 tracking-wide uppercase">
                          {pillar.title}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Collapsed View */}
                    <div className="flex md:hidden absolute inset-0 p-5 items-center justify-between pointer-events-none z-10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-green-700">
                          {pillar.number}
                        </span>
                        <span className="font-jakarta font-bold text-base text-ink-900">
                          {pillar.title}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-white/90 border border-mint-200 flex items-center justify-center text-green-700 shadow-2xs">
                        <IconComponent className="w-4 h-4 text-green-700" />
                      </div>
                    </div>
                  </>
                )}

                {/* =============================================================
                    EXPANDED VIEW (When Active - Light Theme)
                    Dynamic rich typography & animated description
                    ============================================================= */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 p-8 md:p-10 w-full flex flex-col justify-end h-full z-10 pointer-events-auto"
                    >
                      {/* Top Badge on Active Card */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className="mb-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/90 self-start text-xs font-mono font-medium text-ink-900 shadow-sm"
                      >
                        <span className="text-green-700 font-bold">{pillar.number}</span>
                        <span className="text-ink-400">/</span>
                        <span className="font-semibold text-ink-800">{pillar.badge}</span>
                      </motion.div>

                      {/* Content Block */}
                      <div className="pr-14 md:pr-16">
                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 24,
                            delay: 0.08,
                          }}
                          className="font-jakarta text-2xl sm:text-3xl md:text-4xl text-ink-900 font-extrabold mb-3 tracking-tight"
                        >
                          {pillar.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 240,
                            damping: 24,
                            delay: 0.14,
                          }}
                          className="font-jakarta text-ink-700 text-sm sm:text-base leading-relaxed max-w-xl mb-2 font-medium"
                        >
                          {pillar.desc}
                        </motion.p>
                      </div>

                      {/* Circular "ArrowRight" CTA Icon */}
                      <motion.button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalOpen(true);
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.25, delay: 0.1 }}
                        aria-label={`Pelajari standar ${pillar.title}`}
                        className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg shadow-green-600/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0 z-20 group/btn"
                      >
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          STANDAR MUTU SNI MODAL (Interactive Educational Drawer)
          Triggered when user clicks card action
          ===================================================================== */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="sni-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink-900/40 backdrop-blur-md animate-fadeIn"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-mint-200/80 font-jakarta max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Tutup modal standar SNI"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-mint-50 hover:bg-mint-100 flex items-center justify-center text-ink-600 hover:text-ink-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-mint-100 text-green-700 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-green-700 tracking-wider uppercase">
                  Regulasi &amp; Kualitas Mutu
                </span>
                <h3
                  id="sni-modal-title"
                  className="font-fraunces text-2xl font-bold text-ink-900"
                >
                  Standar Mutu Penyaluran ELOVIA
                </h3>
              </div>
            </div>

            <p className="text-sm text-ink-600 mb-6 leading-relaxed">
              ELOVIA mengintegrasikan parameter Standar Nasional Indonesia (SNI)
              untuk memastikan setiap gram material terpilah memenuhi spesifikasi
              industri manufaktur daur ulang.
            </p>

            {/* Checklist of Guidelines */}
            <div className="space-y-3.5 mb-8">
              <div className="p-4 rounded-2xl bg-mint-50/70 border border-mint-200/70 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-ink-700">
                  <strong className="text-ink-900 block font-semibold mb-0.5">
                    SNI 8474:2018 (Pengelolaan Material Daur Ulang)
                  </strong>
                  Klasifikasi material plastik bebas kontaminan berbahaya dengan
                  tingkat kemurnian di atas 95%.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mint-50/70 border border-mint-200/70 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-ink-700">
                  <strong className="text-ink-900 block font-semibold mb-0.5">
                    Metrologi Legal &amp; Kalibrasi Rutin
                  </strong>
                  Perangkat timbangan digital di seluruh sentra mitra wajib tera
                  ulang berkala oleh instansi Metrologi Kementerian Perdagangan RI.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-mint-50/70 border border-mint-200/70 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-ink-700">
                  <strong className="text-ink-900 block font-semibold mb-0.5">
                    Transparansi Index Agregator Real-time
                  </strong>
                  Perhitungan valuasi rupiah merujuk pada fluktuasi indeks komoditas
                  daur ulang nasional yang diverifikasi secara real-time.
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-ink-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-ink-200 text-ink-700 text-xs font-semibold hover:bg-mist-50 transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <Link
                href="/pindai"
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-semibold transition-colors shadow-md"
              >
                <span>Mulai Pindai &amp; Salurkan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrustQualityBanner;
