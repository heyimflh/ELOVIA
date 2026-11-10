'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Scale,
  Layers,
  Recycle,
  Wallet,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export interface EcoWalletBentoDashboardProps {
  userName?: string;
  confirmedBalance?: number;
  inProgressBalance?: number;
  estimatedBalance?: number;
  className?: string;
}

// Staggered container animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Card entrance animation variants (dreamy subtle lift & blur)
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Mock data for mini charts
const CONFIRMED_SPARKLINE_DATA = [
  { name: '1', val: 8 },
  { name: '2', val: 14 },
  { name: '3', val: 12 },
  { name: '4', val: 19 },
  { name: '5', val: 16 },
  { name: '6', val: 22 },
  { name: '7', val: 24.5 },
];

const ESTIMASI_AREA_DATA = [
  { day: 'Sen', amount: 12 },
  { day: 'Sel', amount: 18 },
  { day: 'Rab', amount: 15 },
  { day: 'Kam', amount: 26 },
  { day: 'Jum', amount: 22 },
  { day: 'Sab', amount: 31 },
  { day: 'Min', amount: 38.2 },
];

const WASTE_COMPOSITION_DATA = [
  { name: 'Plastik (PET/HDPE)', value: 55, color: '#10B981', weight: '26.5 kg' },
  { name: 'Kertas & Kardus', value: 27, color: '#F59E0B', weight: '13.0 kg' },
  { name: 'Logam & Kaleng', value: 18, color: '#06B6D4', weight: '8.7 kg' },
];

const RECENT_ACTIVITIES = [
  {
    id: 'tx-1',
    partner: 'Bank Sampah Resik',
    type: 'PET Bening (A)',
    weight: '12.4 kg',
    amount: '+Rp 15.000',
    status: 'Selesai',
    glowColor: 'from-emerald-500 to-teal-400',
    time: 'Hari ini, 10:14',
  },
  {
    id: 'tx-2',
    partner: 'EcoBali Aggregator',
    type: 'Kardus Box Cokelat',
    weight: '8.0 kg',
    amount: '+Rp 9.500',
    status: 'Selesai',
    glowColor: 'from-amber-400 to-orange-500',
    time: 'Kemarin, 14:30',
  },
  {
    id: 'tx-3',
    partner: 'Komunitas Sirkular Lestari',
    type: 'Kaleng Alumunium',
    weight: '4.2 kg',
    amount: 'Rp 6.300',
    status: 'Proses Timbang',
    glowColor: 'from-cyan-400 to-blue-500',
    time: '08 Nov, 09:20',
  },
];

export function EcoWalletBentoDashboard({
  userName = 'Lestari',
  confirmedBalance = 24500,
  inProgressBalance = 12800,
  estimatedBalance = 38200,
  className = '',
}: EcoWalletBentoDashboardProps) {
  // Mounting state to ensure smooth client-side Recharts rendering without hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<'30D' | '90D' | 'ALL'>('30D');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full max-w-[1400px] mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}
    >
      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 1: MAIN HERO PANEL (The Anchor - Top Left)
          Classes: col-span-1 lg:col-span-8 lg:row-span-2 relative overflow-hidden rounded-[2rem]
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-8 lg:row-span-2 relative overflow-hidden rounded-[2rem] min-h-[480px] lg:min-h-[540px] flex flex-col justify-between p-6 sm:p-8 lg:p-10 border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.6)] group"
      >
        {/* Background Image: Dreamy misty mountain landscape */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out group-hover:scale-105"
          style={{ backgroundImage: "url('/images/dompet/hero.jpg')" }}
          aria-hidden="true"
        />

        {/* Cinematic dark gradients overlay: heavy at bottom, subtle at top */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#121319] via-[#121319]/70 to-slate-950/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-950/50 via-transparent to-transparent"
          aria-hidden="true"
        />

        {/* Top Header Row inside Hero Panel */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/15 text-xs font-mono text-emerald-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>EcoWallet &bull; Circular Dashboard</span>
          </div>

          {/* Timeframe Filter Tabs */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-950/60 backdrop-blur-xl border border-white/10 text-xs">
            {(['30D', '90D', 'ALL'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTimeframe(tab)}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-200 ${
                  activeTimeframe === tab
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === '30D' ? '30 Hari' : tab === '90D' ? '3 Bulan' : 'Semua'}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Content: Cinematic Headline & Personal Greeting at Bottom-Left */}
        <div className="relative z-10 mt-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]">
              <span className="text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                My Waste{' '}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 drop-shadow-[0_2px_16px_rgba(52,211,153,0.35)]">
                Earnings
              </span>
            </h1>

            <p className="mt-3 text-slate-300 text-base sm:text-lg font-light max-w-xl leading-relaxed">
              Lihat nilai yang telah kamu ciptakan dari memilah sampah,{' '}
              <span className="inline-flex items-center font-medium text-white group/name">
                <span className="relative">
                  <span className="text-emerald-200">{userName}</span>
                  <span
                    className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent"
                    aria-hidden="true"
                  />
                </span>
                <motion.span
                  className="inline-flex items-center ml-2 text-emerald-300"
                  animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300 filter drop-shadow-[0_0_8px_rgba(110,231,183,0.7)]" />
                </motion.span>
              </span>
              .
            </p>
          </motion.div>

          {/* Micro Stat Badges Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Kontribusi Terverifikasi</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs text-slate-200">
              <Scale className="w-3.5 h-3.5 text-teal-400" />
              <span>48.2 kg Total Material</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 2: TOP RIGHT PANEL (Mini Stats / "Dalam Proses")
          Classes: col-span-1 lg:col-span-4 rounded-[2rem] p-6
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-4 rounded-[2rem] p-6 sm:p-7 bg-[#161720]/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden group"
      >
        {/* Subtle glow behind card */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top: 5 Circular Avatar-like Step Indicators inspired by reference */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Alur Verifikasi
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium">
              2 Transaksi
            </span>
          </div>

          {/* Stepper Dots with Glowing Active State */}
          <div className="flex items-center justify-between px-2 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
            {[
              { label: 'Pindai', status: 'done', color: 'bg-emerald-400' },
              { label: 'Jadwal', status: 'done', color: 'bg-emerald-400' },
              { label: 'Timbang', status: 'active', color: 'bg-amber-400 animate-pulse' },
              { label: 'Verifikasi', status: 'pending', color: 'bg-slate-700' },
              { label: 'Selesai', status: 'pending', color: 'bg-slate-700' },
            ].map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                      step.status === 'done'
                        ? 'border-emerald-400/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : step.status === 'active'
                        ? 'border-amber-400/60 bg-amber-500/25 text-amber-200 shadow-[0_0_14px_rgba(245,158,11,0.5)]'
                        : 'border-white/10 bg-slate-900/60 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {step.status === 'active' && (
                    <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Content: "Dalam Proses" Metric & Organic Curved Sparkline */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
              Dalam Proses
            </p>
            <div className="text-3xl font-bold text-white tracking-tight mt-0.5">
              Rp {inProgressBalance.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-amber-300/80 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Menunggu konfirmasi timbangan mitra
            </p>
          </div>

          {/* Mini aesthetic warm wave SVG */}
          <div className="w-24 h-12 relative overflow-hidden">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <path
                d="M0 32 Q 25 10, 50 25 T 100 12"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0 32 Q 25 10, 50 25 T 100 12 L 100 40 L 0 40 Z"
                fill="url(#amberGlowWave)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="amberGlowWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 3: MIDDLE RIGHT PANEL (Primary Number / "Terkonfirmasi")
          Classes: col-span-1 lg:col-span-4 rounded-[2rem] p-6 flex flex-col justify-center
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-4 rounded-[2rem] p-6 sm:p-7 bg-[#161720]/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center relative overflow-hidden group"
      >
        {/* Ambient emerald & amber glow in background */}
        <div
          className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Terkonfirmasi (Verified)
            </div>
            <p className="text-xs text-slate-400 font-light">
              Hasil transaksi selesai &bull; Siap ditarik kapan saja
            </p>
          </div>

          {/* Reference-inspired Glowing Orb */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 shadow-[0_0_24px_rgba(16,185,129,0.5)] flex items-center justify-center text-slate-950 font-bold shrink-0">
            <Wallet className="w-5 h-5 text-slate-950" />
          </div>
        </div>

        {/* Primary Big Stat */}
        <div className="relative z-10 my-4">
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            Rp {confirmedBalance.toLocaleString('id-ID')}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              +18.4%
            </span>
            <span className="text-xs text-slate-400">vs bulan lalu</span>
          </div>
        </div>

        {/* Mini Sparkline Bar Chart in the Background */}
        <div className="relative z-10 h-14 w-full mt-2 pt-2 border-t border-white/5">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONFIRMED_SPARKLINE_DATA} margin={{ top: 4, bottom: 0, left: 0, right: 0 }}>
                <Bar
                  dataKey="val"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  opacity={0.75}
                  className="transition-all duration-300 hover:opacity-100"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-end justify-between gap-1.5 opacity-60">
              {CONFIRMED_SPARKLINE_DATA.map((d, i) => (
                <div
                  key={i}
                  className="bg-emerald-400 rounded-t-sm flex-1"
                  style={{ height: `${(d.val / 25) * 100}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 4: BOTTOM LEFT PANEL (Donut Chart / Analytics)
          Classes: col-span-1 lg:col-span-4 rounded-[2rem] p-6
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-4 rounded-[2rem] p-6 sm:p-7 bg-[#161720]/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
              <Recycle className="w-4 h-4 text-emerald-400" />
              Komposisi Material
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Proporsi sampah terpilah</p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Total 48.2 kg
          </span>
        </div>

        {/* Circular Donut with glowing center + side legend */}
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Donut Chart with glowing center */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={WASTE_COMPOSITION_DATA}
                    innerRadius={38}
                    outerRadius={56}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {WASTE_COMPOSITION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-28 h-28 rounded-full border-8 border-emerald-400 border-t-amber-400 border-r-cyan-400" />
            )}

            {/* Glowing Center Badge */}
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#121319] border border-white/10 flex flex-col items-center justify-center text-center shadow-[inset_0_0_12px_rgba(0,0,0,0.8)]">
              <span className="text-xs font-extrabold text-white">100%</span>
              <span className="text-[9px] font-mono text-emerald-300">Sirkular</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="flex-1 space-y-2.5">
            {WASTE_COMPOSITION_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: item.color, color: item.color }}
                  />
                  <span className="text-slate-300 font-medium truncate max-w-[90px] sm:max-w-[110px]">
                    {item.name}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-white font-semibold">{item.value}%</span>
                  <span className="text-[10px] text-slate-400 block">{item.weight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Tingkat Kualitas Rata-rata</span>
          <span className="text-emerald-300 font-mono font-medium">Grade A (94%)</span>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 5: BOTTOM MIDDLE PANEL (List or Details)
          Classes: col-span-1 lg:col-span-4 rounded-[2rem] p-6
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-4 rounded-[2rem] p-6 sm:p-7 bg-[#161720]/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              Aktivitas Terakhir
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Riwayat serah terima material</p>
          </div>
          <span className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-0.5">
            Semua <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Minimalist Activity List with Planet-like Spherical Glows */}
        <div className="space-y-3.5 my-auto py-1">
          {RECENT_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-colors group/item"
            >
              <div className="flex items-center gap-3">
                {/* Reference-inspired 3D Spherical Planet Avatar */}
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-tr ${act.glowColor} shadow-[0_0_12px_rgba(255,255,255,0.2)] shrink-0 flex items-center justify-center text-slate-950 font-bold`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/70 shadow-[0_0_4px_white]" />
                </div>

                <div>
                  <h3 className="text-xs font-medium text-white group-hover/item:text-emerald-300 transition-colors">
                    {act.partner}
                  </h3>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <span>{act.type}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="font-mono text-slate-300">{act.weight}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white block">
                  {act.amount}
                </span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                    act.status === 'Selesai'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'
                  }`}
                >
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Sinkronisasi Otomatis</span>
          <span className="text-teal-300 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            Live Ledger
          </span>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          PANEL 6: BOTTOM RIGHT PANEL (Line Chart / "Estimasi")
          Classes: col-span-1 lg:col-span-4 rounded-[2rem] p-6
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        className="col-span-1 lg:col-span-4 rounded-[2rem] p-6 sm:p-7 bg-[#161720]/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden group"
      >
        {/* Ambient warm orange glow */}
        <div
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Estimasi Potensi (Projected)
            </div>
            <p className="text-xs text-slate-400 font-light">
              14.5 kg tersimpan di keranjang siap disalurkan
            </p>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-200">
            13/37 kg
          </span>
        </div>

        {/* Big Number */}
        <div className="relative z-10 my-3">
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Rp {estimatedBalance.toLocaleString('id-ID')}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            Potensi kenaikan +32% jika diajukan minggu ini
          </p>
        </div>

        {/* Smooth Area / Line Chart with Warm Gradient Fill */}
        <div className="relative z-10 h-24 w-full -mb-2">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ESTIMASI_AREA_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="estimasiOrangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900/90 border border-white/10 px-2 py-1 rounded-md text-[11px] font-mono text-amber-300 shadow-lg">
                          Rp {((payload[0].value as number) * 1000).toLocaleString('id-ID')}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#estimasiOrangeGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-gradient-to-t from-amber-500/20 to-transparent rounded-b-xl" />
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default EcoWalletBentoDashboard;

