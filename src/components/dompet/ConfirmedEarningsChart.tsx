'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Leaf,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Scale,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  type ChartTimeframe,
  CONFIRMED_TIMEFRAME_SUMMARIES,
  formatCurrencyIDR,
} from './confirmedEarningsData';

export interface ConfirmedEarningsChartProps {
  className?: string;
  defaultTimeframe?: ChartTimeframe;
}

const TIMEFRAMES: ChartTimeframe[] = ['7D', '1M', '3M', '1Y'];

// Custom Tooltip component for floating glassmorphism card
function CustomChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      label: string;
      fullDate: string;
      amount: number;
      verifiedKg: number;
    };
  }>;
}) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-[#0B1510]/95 p-3.5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left min-w-[190px]">
        <div className="text-[11px] font-mono text-emerald-300 font-semibold uppercase tracking-wider flex items-center justify-between">
          <span>{data.fullDate}</span>
        </div>
        <div className="text-xl font-mono font-bold text-white mt-1 tracking-tight">
          {formatCurrencyIDR(data.amount)}
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Terkonfirmasi
          </span>
          <span className="font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded-md">
            {data.verifiedKg} kg
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function ConfirmedEarningsChart({
  className = '',
  defaultTimeframe = '1Y',
}: ConfirmedEarningsChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<ChartTimeframe>(defaultTimeframe);
  const [isMounted, setIsMounted] = useState(false);

  // SSR hydration safety: only render SVG canvas once mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const summary = CONFIRMED_TIMEFRAME_SUMMARIES[selectedTimeframe];

  // Helper for YAxis label formatting (e.g., 50000 -> "50k")
  const formatYAxisTick = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}k`;
    return `${val}`;
  };

  return (
    <section className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}>
      {/* ───────────────────────────────────────────────────────────────────────
          1. SECTION HEADER (Minimalist & Elegant)
          - Eyebrow: FINANCIAL GROWTH + Leaf/Trending icon
          - Title: Your Earnings Growth
          - Subtitle: Setiap kontribusi kecilmu tumbuh menjadi nilai yang berarti...
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mb-3.5 shadow-sm"
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Financial Growth</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-jakarta leading-tight"
        >
          Your Earnings Growth
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-slate-500 text-sm sm:text-base font-light leading-relaxed text-balance"
        >
          Setiap kontribusi kecilmu tumbuh menjadi nilai yang berarti bagi lingkungan.
        </motion.p>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          2. MAIN CHART CARD (Luxury Obsidian-Emerald Glassmorphism)
          - Border: emerald border with low opacity
          - Background: dark emerald translucent with ambient aura
          - Rounded corners: rounded-[2rem]
          - Stacking: Top Header with Value & Segmented Controls -> Area Chart -> Footer
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#0C1A14] via-[#091510] to-[#060E0A] border border-emerald-500/20 shadow-[0_25px_60px_-15px_rgba(16,185,129,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] p-6 sm:p-8 lg:p-10 text-white"
      >
        {/* Soft Ambient Emerald Glows */}
        <div
          className="absolute -top-24 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-0"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-0"
          aria-hidden="true"
        />

        {/* ── Top Card Header & Chart Controls ── */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          {/* Left: Metric Label & Big Confirmed Value */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Confirmed Earnings
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTimeframe}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                >
                  {summary.formattedTotal}
                </motion.div>
              </AnimatePresence>

              {/* Growth Badge & Supporting Text */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  {summary.growthPercentage}
                </span>
                <span className="text-xs text-slate-400 font-light">
                  {summary.comparisonPeriod}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Segmented Controls (7D, 1M, 3M, 1Y) */}
          <div className="flex items-center self-start md:self-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner">
            {TIMEFRAMES.map((tf) => {
              const isActive = selectedTimeframe === tf;
              return (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  type="button"
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                    isActive
                      ? 'text-emerald-950 font-black'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePeriodIndicator"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_16px_rgba(52,211,153,0.5)]"
                    />
                  )}
                  <span className="relative z-10">{tf}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. Smooth Area Chart Visualization (Recharts) ── */}
        <div className="relative z-10 w-full h-[260px] sm:h-[300px] lg:h-[340px] mt-6">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={summary.dataPoints}
                margin={{ top: 20, right: 12, left: -16, bottom: 0 }}
              >
                <defs>
                  {/* Smooth Emerald Area Gradient Fill */}
                  <linearGradient id="emeraldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.45} />
                    <stop offset="50%" stopColor="#059669" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>

                  {/* SVG Neon Line Glow Filter */}
                  <filter id="emeraldNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Subtle Horizontal Grid Only */}
                <CartesianGrid
                  stroke="#FFFFFF"
                  strokeOpacity={0.06}
                  vertical={false}
                  strokeDasharray="4 4"
                />

                {/* X Axis */}
                <XAxis
                  dataKey="label"
                  axisLine={{ stroke: '#FFFFFF', strokeOpacity: 0.1 }}
                  tickLine={false}
                  tick={{
                    fill: '#94A3B8',
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  dy={10}
                />

                {/* Y Axis with formatted Indonesian abbreviations */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#94A3B8',
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  tickFormatter={formatYAxisTick}
                  dx={-4}
                />

                {/* Floating Glassmorphism Tooltip */}
                <Tooltip
                  content={<CustomChartTooltip />}
                  cursor={{
                    stroke: '#10B981',
                    strokeWidth: 1.5,
                    strokeDasharray: '4 4',
                    strokeOpacity: 0.6,
                  }}
                />

                {/* Monotone Smooth Area with Neon Glowing Line */}
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10B981"
                  strokeWidth={3}
                  filter="url(#emeraldNeonGlow)"
                  fill="url(#emeraldAreaGrad)"
                  fillOpacity={1}
                  isAnimationActive={true}
                  animationDuration={1100}
                  animationEasing="ease-out"
                  activeDot={{
                    r: 6,
                    fill: '#10B981',
                    stroke: '#FFFFFF',
                    strokeWidth: 2.5,
                    className: 'filter drop-shadow-[0_0_12px_rgba(16,185,129,0.9)] cursor-pointer',
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            /* Lightweight Skeleton loader before client-side hydration */
            <div className="w-full h-full flex items-end justify-between gap-2 px-4 pb-4 animate-pulse opacity-20">
              <div className="w-full h-1/3 bg-emerald-500 rounded-t-lg" />
              <div className="w-full h-1/2 bg-emerald-500 rounded-t-lg" />
              <div className="w-full h-2/3 bg-emerald-500 rounded-t-lg" />
              <div className="w-full h-3/4 bg-emerald-500 rounded-t-lg" />
              <div className="w-full h-full bg-emerald-500 rounded-t-lg" />
            </div>
          )}
        </div>

        {/* ── 4. Card Bottom Micro-Metrics Strip (Eco-Fintech Quality) ── */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 block font-light">Material Terverifikasi</span>
              <span className="font-mono font-bold text-white text-sm">
                {summary.totalVerifiedKg} kg terkelola
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 block font-light">Standar Akurasi Ledger</span>
              <span className="font-mono font-bold text-emerald-300 text-sm">
                100% Status Selesai
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:justify-end">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Audit Real-time Selesai</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default ConfirmedEarningsChart;

