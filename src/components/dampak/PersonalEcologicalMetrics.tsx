'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Leaf,
  Info,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export interface MetricCardData {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  unit: string;
  decimals?: number;
  iconSrc: string;
  iconAlt: string;
  colSpan: string;
  isHero?: boolean;
  benchmark: string;
  trendText: string;
  trendPositive: boolean;
  accentColor: string;
  glowColor: string;
}

export interface PersonalEcologicalMetricsProps {
  className?: string;
  userName?: string;
  showSectionHeader?: boolean;
  balanceLastCard?: boolean;
}

const DEFAULT_METRICS: MetricCardData[] = [
  {
    id: 'emissions',
    title: 'Total Emisi Terhindar',
    subtitle: 'Total Avoided Carbon Emissions',
    value: 1842.5,
    unit: 'kg CO₂e',
    decimals: 1,
    iconSrc: '/3dModels/icons/emission-cloud-3d.png',
    iconAlt: '3D Floating Emission Cloud Icon',
    colSpan: 'md:col-span-2',
    isHero: true,
    benchmark: '⚡ Setara 7,680 km perjalanan mobil listrik nir-emisi atau 82 hari jejak karbon individu.',
    trendText: '+28.4% vs bulan lalu',
    trendPositive: true,
    accentColor: 'text-emerald-400',
    glowColor: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  {
    id: 'glass',
    title: 'Kaca Didaur Ulang',
    subtitle: 'Recycled Glass Cullet Grade A',
    value: 485,
    unit: 'kg',
    decimals: 0,
    iconSrc: '/3dModels/icons/recycled-glass-3d.png',
    iconAlt: '3D Floating Recycled Glass Bottle Icon',
    colSpan: 'md:col-span-1',
    isHero: false,
    benchmark: 'Kemurnian 99.8% siap peleburan ulang tanpa degradasi silika murni.',
    trendText: '+15.2% siklus ini',
    trendPositive: true,
    accentColor: 'text-teal-300',
    glowColor: 'from-teal-500/20 via-teal-500/5 to-transparent',
  },
  {
    id: 'points',
    title: 'Poin Reward',
    subtitle: 'Circular Eco-Tokens Balance',
    value: 24850,
    unit: 'Pts',
    decimals: 0,
    iconSrc: '/3dModels/icons/reward-points-3d.png',
    iconAlt: '3D Floating Reward Eco-Coin Icon',
    colSpan: 'md:col-span-1',
    isHero: false,
    benchmark: 'Estimasi nilai tukar setara Rp 248.500 untuk voucher mitra hijau.',
    trendText: '+3,200 Pts minggu ini',
    trendPositive: true,
    accentColor: 'text-amber-300',
    glowColor: 'from-amber-500/20 via-amber-500/5 to-transparent',
  },
  {
    id: 'trees',
    title: 'Kontribusi Pohon',
    subtitle: 'Mangrove & Rainforest Canopy',
    value: 36,
    unit: 'Pohon',
    decimals: 0,
    iconSrc: '/3dModels/icons/tree-sprout-3d.png',
    iconAlt: '3D Floating Tree Sprout Icon',
    colSpan: 'md:col-span-1',
    isHero: false,
    benchmark: 'Ditanam di Kawasan Konservasi Mangrove Teluk Jakarta & Banyuwangi.',
    trendText: '+4 pohon terkonversi',
    trendPositive: true,
    accentColor: 'text-emerald-300',
    glowColor: 'from-lime-500/20 via-lime-500/5 to-transparent',
  },
];

export function PersonalEcologicalMetrics({
  className = '',
  userName = 'Rifqi Pratama',
  showSectionHeader = true,
  balanceLastCard = false,
}: PersonalEcologicalMetricsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Handle SSR hydration safety for CountUp
  const [isMounted, setIsMounted] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<'all' | 'year' | 'month'>('all');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Multipliers for timeframe micro-interaction
  const timeframeMultiplier =
    activeTimeframe === 'month' ? 0.28 : activeTimeframe === 'year' ? 0.72 : 1.0;

  // Staggered card entrance variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay: i * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="personal-metrics"
      aria-label="Personal Ecological Metrics"
      className={`relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden ${className}`}
    >
      {/* ── Ambient Radial Atmosphere Blobs ───────────────── */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[28rem] h-[28rem] bg-teal-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle organic grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* ── Section Header ───────────────────────────────── */}
        {showSectionHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Telemetri Ekologis Personal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Metrik Ekologis <span className="text-emerald-400">{userName}</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed">
                Pantau dampak regenerasi biosfer Anda secara transparan. Setiap kilogram sampah
                yang Anda setorkan dikonversi dengan presisi standar SNI &amp; ISCC Plus.
              </p>
            </div>

            {/* Timeframe Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 self-start md:self-end">
              {(
                [
                  { id: 'all', label: 'Semua Waktu' },
                  { id: 'year', label: '2026' },
                  { id: 'month', label: 'Bulan Ini' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTimeframe(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeTimeframe === tab.id
                      ? 'bg-emerald-500 text-white shadow-[0_4px_16px_rgba(34,197,94,0.35)] font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Bento Grid Container ─────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEFAULT_METRICS.map((metric, index) => {
            const isHero = metric.isHero;
            const computedValue =
              metric.decimals && metric.decimals > 0
                ? Number((metric.value * timeframeMultiplier).toFixed(metric.decimals))
                : Math.round(metric.value * timeframeMultiplier);

            // Bento column span mapping: Card 1 is Hero (md:col-span-2), Card 2-4 take 1 column each
            const colSpanClass =
              isHero
                ? 'md:col-span-2'
                : !isHero && index === 3 && balanceLastCard
                ? 'md:col-span-1 lg:col-span-2'
                : 'md:col-span-1';

            return (
              <motion.div
                key={metric.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] ${colSpanClass}`}
              >
                {/* ── Top Glass Specular Reflection Highlight ──── */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 via-white/[0.02] to-transparent"
                  aria-hidden="true"
                />

                {/* ── Card Ambient Glow ────────────────────────── */}
                <div
                  className={`pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br ${metric.glowColor} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                {/* ── Floating 3D Icon Wrapper (Top-Right Corner) ─ */}
                <motion.div
                  className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 pointer-events-none"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                  <div className="relative">
                    <img
                      src={metric.iconSrc}
                      alt={metric.iconAlt}
                      loading="lazy"
                      className={`${
                        isHero
                          ? 'w-20 h-20 sm:w-28 sm:h-28'
                          : 'w-16 h-16 sm:w-20 sm:h-20'
                      } object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] select-none transition-transform duration-500 group-hover:scale-105`}
                      onError={(e) => {
                        // Fallback safety in case the custom image path is missing
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          const fallback = target.parentElement.querySelector('.icon-fallback');
                          if (fallback) (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    {/* Graceful Fallback if image fails */}
                    <div className="icon-fallback hidden w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white/80">
                      <Sparkles className="w-8 h-8 text-emerald-300" />
                    </div>
                  </div>
                </motion.div>

                {/* ── Top Content: Label, Subtitle & Trend Pill ─── */}
                <div className="relative z-10 space-y-2 pr-20 sm:pr-28">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                      {isHero ? 'Metric Utama • Biosfer ELOVIA' : 'Sirkularitas Aktif'}
                    </span>
                  </div>

                  <h3
                    className={`${
                      isHero
                        ? 'text-2xl sm:text-3xl font-extrabold tracking-tight text-white'
                        : 'text-xl sm:text-2xl font-bold tracking-tight text-white'
                    }`}
                  >
                    {metric.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/65 font-medium leading-relaxed">
                    {metric.subtitle}
                  </p>
                </div>

                {/* ── Middle Content: Number Counter with font-mono ─ */}
                <div className={`relative z-10 my-6 sm:my-8 ${isHero ? 'space-y-4' : 'space-y-2'}`}>
                  <div className="flex items-baseline flex-wrap gap-x-2.5 gap-y-1">
                    <span
                      className={`font-mono font-black tracking-tight text-white select-all ${
                        isHero
                          ? 'text-5xl sm:text-6xl lg:text-7xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                          : 'text-4xl sm:text-5xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]'
                      }`}
                    >
                      {isMounted && isInView ? (
                        <CountUp
                          start={0}
                          end={computedValue}
                          duration={2.5}
                          separator=","
                          decimals={metric.decimals || 0}
                          decimal="."
                        />
                      ) : (
                        (0).toLocaleString('en-US', {
                          minimumFractionDigits: metric.decimals || 0,
                          maximumFractionDigits: metric.decimals || 0,
                        })
                      )}
                    </span>

                    <span
                      className={`font-sans font-bold tracking-normal ${metric.accentColor} ${
                        isHero ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'
                      }`}
                    >
                      {metric.unit}
                    </span>
                  </div>

                  {/* Micro-Trend Indicator */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{metric.trendText}</span>
                  </div>
                </div>

                {/* ── Bottom Content: Benchmark / Contextual Note ── */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-start gap-2.5">
                  {isHero ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Leaf className="w-4 h-4 text-emerald-300/80 shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-white/70 leading-relaxed font-normal">
                    {metric.benchmark}
                  </p>
                </div>

                {/* Hero Extra Micro-Telemetry Bar */}
                {isHero && (
                  <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        PET: 34%
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-teal-400" />
                        Kaca: 26%
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-lime-400" />
                        Lainnya: 40%
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-300/90 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      SNI 19-3964-1994 Validated
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Transparency Ledger Note ──────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Seluruh metrik terikat secara kriptografis dengan bukti timbangan digital mitra ELOVIA.
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/60 font-mono text-[11px]">
            <span>Audit Ref: #ELV-2026-BIO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Sync: Real-Time</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalEcologicalMetrics;

