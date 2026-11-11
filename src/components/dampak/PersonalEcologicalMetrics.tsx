'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Sparkles,
  TrendingUp,
  Leaf,
  ArrowRight,
  Wind,
  Droplets,
  Coins,
  Trees,
  CheckCircle2,
  Check,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';

export interface MetricCardData {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  unit: string;
  decimals?: number;
  colSpan: string;
  isHero?: boolean;
  benchmark: string;
  trendText: string;
  trendPositive: boolean;
  icon: React.ElementType;
}

export interface PersonalEcologicalMetricsProps {
  className?: string;
  userName?: string;
  showSectionHeader?: boolean;
}

const DEFAULT_METRICS: MetricCardData[] = [
  {
    id: 'emissions',
    title: 'Total Emisi Terhindar',
    subtitle: 'Reduksi jejak karbon langsung ke biosfer melalui daur ulang terverifikasi',
    value: 1842.5,
    unit: 'kg CO₂e',
    decimals: 1,
    colSpan: 'lg:col-span-7',
    isHero: true,
    benchmark: 'Setara 7.680 km perjalanan mobil listrik nir-emisi atau 82 hari jejak karbon individu.',
    trendText: '+28.4% vs bulan lalu',
    trendPositive: true,
    icon: Wind,
  },
  {
    id: 'glass',
    title: 'Kaca & Silika Murni',
    subtitle: 'Cullet Grade A kemurnian 99.8% siap peleburan ulang industri',
    value: 485,
    unit: 'kg',
    decimals: 0,
    colSpan: 'lg:col-span-5',
    isHero: false,
    benchmark: 'Siap peleburan ulang industri tanpa degradasi silika murni.',
    trendText: '+15.2% siklus ini',
    trendPositive: true,
    icon: Droplets,
  },
  {
    id: 'points',
    title: 'Poin Reward Ekologis',
    subtitle: 'Saldo token sirkularitas terverifikasi untuk konversi voucher hijau',
    value: 24850,
    unit: 'Pts',
    decimals: 0,
    colSpan: 'lg:col-span-6',
    isHero: false,
    benchmark: 'Estimasi nilai tukar setara Rp 248.500 untuk voucher mitra hijau.',
    trendText: '+3.200 Pts minggu ini',
    trendPositive: true,
    icon: Coins,
  },
  {
    id: 'trees',
    title: 'Bibit Pohon Ditumbuhkan',
    subtitle: 'Mangrove pesisir & kanopi hutan nusantara melalui mitra konservasi',
    value: 36,
    unit: 'Pohon',
    decimals: 0,
    colSpan: 'lg:col-span-6',
    isHero: false,
    benchmark: 'Menyerap ~792 kg CO₂e kumulatif sepanjang siklus hidup pohon.',
    trendText: '+8 Pohon kuartal ini',
    trendPositive: true,
    icon: Trees,
  },
];

export function PersonalEcologicalMetrics({
  className = '',
  userName = 'Rifqi Pratama',
  showSectionHeader = true,
}: PersonalEcologicalMetricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="ecological-metrics"
      aria-label="Metrik Ekologis Anda"
      className={`relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-[#1E2617] ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* ── Section Header (Editorial Landscape Serif Style) ── */}
        {showSectionHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-[#DFE7D0]">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
                FROM THE GROUND UP • METRIK EKOLOGIS
              </span>
              <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E2617] tracking-tight leading-[1.1]">
                Metrik Ekologis &amp;{' '}
                <span className="italic font-normal text-[#748E33]">Nilai Keberlanjutan</span>
              </h2>
              <p className="text-base sm:text-lg text-[#58634F] font-normal leading-relaxed">
                Setiap material yang Anda salurkan melalui sistem AI ELOVIA meregenerasi tanah,
                menyerap karbon atmosfer, dan menumbuhkan kanopi vegetasi nyata di biosfer.
              </p>
            </div>

            {/* Timeframe Filter Switcher (Matching Reference Pill Buttons) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#EFF3E4] border border-[#DFE7D0]">
                {(
                  [
                    { id: 'all', label: 'Semua Waktu' },
                    { id: 'month', label: 'Bulan Ini' },
                    { id: 'week', label: 'Minggu Ini' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTimeframe(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                      timeframe === tab.id
                        ? 'bg-[#748E33] text-white shadow-xs font-semibold'
                        : 'text-[#58634F] hover:text-[#1E2617] hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 4 Values Checkpoints (Matching "History & Values" Section of Reference) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
          {[
            '100% Terverifikasi SNI & ISCC',
            'Audit LCA ISO 14044',
            'Reduksi Emisi Nyata Terukur',
            'Poin Sirkular Dapat Ditukar',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#DFE7D0] shadow-2xs"
            >
              <div className="w-5 h-5 rounded-full bg-[#EFF3E4] text-[#748E33] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-sans font-semibold text-[#1E2617] tracking-tight">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* ── Metrics Grid (Tombstone Arches & Editorial Card Layout) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ══════════════════════════════════════════════════════
              HERO CARD: TOTAL EMISI (Tombstone Arch Shape)
             ══════════════════════════════════════════════════════ */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-7 relative rounded-t-[6rem] sm:rounded-t-[8rem] rounded-b-3xl bg-[#EFF3E4] border-2 border-[#DFE7D0] p-8 sm:p-12 shadow-sm flex flex-col justify-between overflow-hidden"
          >
            {/* Top Arched Header with Rotating Circular Stamp */}
            <div className="flex items-start justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DFE7D0] text-[11px] font-sans font-bold uppercase tracking-wider text-[#748E33]">
                  <Wind className="w-3.5 h-3.5 text-[#748E33]" />
                  <span>Emisi Atmosfer Terhindar</span>
                </div>
                <h3 className="font-fraunces text-2xl sm:text-3xl text-[#1E2617] font-normal tracking-tight">
                  Total Reduksi Jejak Karbon
                </h3>
              </div>

              {/* Signature Rotating Circular Stamp Motif (from Reference Image) */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#748E33] text-white flex items-center justify-center border-2 border-dashed border-[#CEE045] shadow-md shrink-0 animate-[spin_24s_linear_infinite]">
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100">
                  <path
                    id="stampPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] font-sans uppercase font-bold tracking-[2px] fill-white">
                    <textPath href="#stampPath" startOffset="0%">
                      • ELOVIA IMPACT • VERIFIED 2026 •
                    </textPath>
                  </text>
                </svg>
                <Leaf className="w-6 h-6 text-[#CEE045]" />
              </div>
            </div>

            {/* Central Metric Display with CountUp */}
            <div className="my-8 relative z-10 space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-fraunces text-6xl sm:text-7xl lg:text-8xl font-normal text-[#1E2617] tracking-tight leading-none">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={DEFAULT_METRICS[0].value}
                      decimals={DEFAULT_METRICS[0].decimals}
                      duration={2.5}
                      separator="."
                      decimal=","
                    />
                  ) : (
                    '1.842,5'
                  )}
                </span>
                <span className="font-sans text-2xl sm:text-3xl font-bold text-[#748E33]">
                  {DEFAULT_METRICS[0].unit}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#58634F] max-w-lg leading-relaxed">
                {DEFAULT_METRICS[0].benchmark}
              </p>
            </div>

            {/* Footer with Pill Button and Trend */}
            <div className="pt-6 border-t border-[#DFE7D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#748E33] bg-white px-3.5 py-1.5 rounded-full border border-[#DFE7D0]">
                <TrendingUp className="w-4 h-4" />
                <span>+28.4% efisiensi vs bulan lalu</span>
              </div>

              {/* Characteristic Pill Button with Arrow Icon (as seen across the reference image) */}
              <a
                href="#impact-ledger"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#748E33] hover:bg-[#637a2b] text-white font-sans font-semibold text-xs tracking-wide transition-all shadow-xs group"
              >
                <span>Pelajari Metodologi</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════
              RIGHT COLUMN: 3 TOMBSTONE SUPPORTING CARDS
             ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {DEFAULT_METRICS.slice(1).map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  custom={idx + 1}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="rounded-3xl bg-white border border-[#DFE7D0] p-6 sm:p-7 shadow-2xs hover:shadow-md hover:border-[#748E33]/40 transition-all duration-300 flex items-center justify-between gap-6 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#748E33]">
                        {metric.id === 'glass' ? 'Kaca Silika' : metric.id === 'points' ? 'Reward' : 'Vegetasi'}
                      </span>
                      <span className="text-xs text-[#58634F]">• {metric.trendText}</span>
                    </div>

                    <h4 className="font-fraunces text-xl font-normal text-[#1E2617] tracking-tight">
                      {metric.title}
                    </h4>

                    <div className="flex items-baseline gap-1.5 pt-1">
                      <span className="font-fraunces text-3xl sm:text-4xl font-normal text-[#1E2617]">
                        {isInView ? (
                          <CountUp
                            start={0}
                            end={metric.value}
                            duration={2.2}
                            separator="."
                          />
                        ) : (
                          metric.value.toLocaleString('id-ID')
                        )}
                      </span>
                      <span className="font-sans text-sm font-bold text-[#748E33]">
                        {metric.unit}
                      </span>
                    </div>

                    <p className="text-xs text-[#58634F] line-clamp-1">{metric.benchmark}</p>
                  </div>

                  {/* Circular Olive Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-[#EFF3E4] border border-[#DFE7D0] text-[#748E33] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#748E33] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalEcologicalMetrics;
