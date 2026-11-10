'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Check,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export interface PendingTransaction {
  id: string;
  avatar: string;
  partner: string;
  material: string;
  amount: string;
  status: string;
  statusType: 'timbang' | 'jadwal' | 'selesai';
}

export interface DailyBarData {
  day: string;
  mintVal: number;
  tealVal: number;
  amount: string;
}

export interface ThreePillarLedgerCardsProps {
  inProgressBalance?: number;
  confirmedBalance?: number;
  estimatedBalance?: number;
  pendingTransactions?: PendingTransaction[];
  dailyChartData?: DailyBarData[];
  monthlyTargetKg?: number;
  currentWeightKg?: number;
  potentialIncreasePercent?: number;
  className?: string;
}

const DEFAULT_PENDING_TRANSACTIONS: PendingTransaction[] = [
  {
    id: 'tx-1',
    avatar: 'BS',
    partner: 'Bank Sampah Resik',
    material: '12.4 kg • PET Bening',
    amount: 'Rp 15.000',
    status: 'Timbang',
    statusType: 'timbang',
  },
  {
    id: 'tx-2',
    avatar: 'EB',
    partner: 'EcoBali Center',
    material: '8.0 kg • Kardus Box',
    amount: 'Rp 9.500',
    status: 'Jadwal',
    statusType: 'jadwal',
  },
];

const DEFAULT_BAR_DATA: DailyBarData[] = [
  { day: 'Sen', mintVal: 40, tealVal: 70, amount: 'Rp 18.000' },
  { day: 'Sel', mintVal: 25, tealVal: 50, amount: 'Rp 12.500' },
  { day: 'Rab', mintVal: 60, tealVal: 90, amount: 'Rp 22.000' },
  { day: 'Kam', mintVal: 35, tealVal: 65, amount: 'Rp 16.000' },
  { day: 'Jum', mintVal: 50, tealVal: 85, amount: 'Rp 20.500' },
  { day: 'Sab', mintVal: 45, tealVal: 75, amount: 'Rp 19.000' },
  { day: 'Min', mintVal: 70, tealVal: 100, amount: 'Rp 24.500' },
];

const BUTTERY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: BUTTERY_EASE,
    },
  },
};

export function ThreePillarLedgerCards({
  inProgressBalance = 12800,
  confirmedBalance = 24500,
  estimatedBalance = 38200,
  pendingTransactions = DEFAULT_PENDING_TRANSACTIONS,
  dailyChartData = DEFAULT_BAR_DATA,
  monthlyTargetKg = 37,
  currentWeightKg = 13,
  potentialIncreasePercent = 32,
  className = '',
}: ThreePillarLedgerCardsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const targetPercentage = Math.round((currentWeightKg / monthlyTargetKg) * 100);

  return (
    <div
      className={`relative z-20 max-w-6xl mx-auto px-6 w-full -mt-32 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch ${className}`}
    >
      {/* ───────────────────────────────────────────────────────────────────────
          CARD 1: DALAM PROSES (Left Card)
          - Header: Clock icon with soft amber/gold circle + 2 Pending badge
          - Stat: NILAI SEDANG DIVERIFIKASI -> Rp 12.800
          - Simulated Transaction Timeline List (Bank Sampah Resik, EcoBali Center)
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.22, duration: 0.85, ease: BUTTERY_EASE }}
        className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 group"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Dalam Proses</h2>
                <p className="text-xs text-slate-500 font-light">Status penyaluran berjalan</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80">
              {pendingTransactions.length} Pending
            </span>
          </div>

          {/* Stat Value */}
          <div className="my-5">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              NILAI SEDANG DIVERIFIKASI
            </span>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono mt-0.5">
              {mounted ? (
                <CountUp
                  start={0}
                  end={inProgressBalance}
                  duration={2.0}
                  separator="."
                  prefix="Rp "
                />
              ) : (
                `Rp ${inProgressBalance.toLocaleString('id-ID')}`
              )}
            </div>
          </div>

          {/* Simulated Transaction Timeline List */}
          <div className="space-y-2.5">
            {pendingTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100/90 flex items-center justify-between hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shadow-sm">
                    {tx.avatar}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-800">{tx.partner}</h3>
                    <p className="text-[11px] text-slate-500">{tx.material}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-900 block">
                    {tx.amount}
                  </span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      tx.statusType === 'timbang'
                        ? 'text-amber-600 bg-amber-100/60'
                        : 'text-slate-500 bg-slate-200/60'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Estimasi Selesai</span>
          <span className="text-slate-600 font-medium">Hari ini, ~16:00 WIB</span>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          CARD 2: TERKONFIRMASI (Center Card - Prominent & Taller)
          - Header: Terkonfirmasi (Verified) pill + Saldo Kas Aktif
          - Stat: TOTAL NILAI SIRKULAR -> Rp 24.500 (Huge font)
          - Growth badge: +18.4% vs bulan lalu • 48.2 kg
          - Minimalist Dual-tone Teal/Mint Bar Chart (Sen - Min)
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.08, duration: 0.85, ease: BUTTERY_EASE }}
        className="bg-white rounded-3xl p-7 sm:p-8 shadow-[0_25px_50px_-12px_rgba(16,185,129,0.16),0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-emerald-100 md:scale-105 md:-translate-y-2 flex flex-col justify-between hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.22)] transition-all duration-300 relative overflow-hidden group"
      >
        {/* Subtle Emerald Sheen */}
        <div
          className="absolute top-0 right-0 w-36 h-36 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div>
          {/* Header with Verified Pill */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Terkonfirmasi (Verified)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Saldo Kas Aktif</span>
          </div>

          {/* Large Monospace Confirmed Value */}
          <div className="my-6">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              TOTAL NILAI SIRKULAR
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono mt-1">
              {mounted ? (
                <CountUp
                  start={0}
                  end={confirmedBalance}
                  duration={2.5}
                  separator="."
                  prefix="Rp "
                />
              ) : (
                `Rp ${confirmedBalance.toLocaleString('id-ID')}`
              )}
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                +18.4%
              </span>
              <span className="text-xs text-slate-500 font-light">vs bulan lalu • 48.2 kg</span>
            </div>
          </div>

          {/* Minimalist Dual-tone Teal/Mint Bar Chart */}
          <div className="pt-2 relative">
            {/* Interactive Tooltip on Active Bar */}
            {activeBarIndex !== null && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap">
                {dailyChartData[activeBarIndex].day}: {dailyChartData[activeBarIndex].amount}
              </div>
            )}

            <div className="flex items-end justify-between h-20 gap-2 px-1">
              {dailyChartData.map((bar, i) => (
                <div
                  key={bar.day}
                  onMouseEnter={() => setActiveBarIndex(i)}
                  onMouseLeave={() => setActiveBarIndex(null)}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group/bar"
                >
                  <div className="w-full flex items-end justify-center gap-1 h-14">
                    <div
                      className={`w-1.5 sm:w-2 bg-emerald-200 rounded-t-full transition-all duration-300 ${
                        activeBarIndex === i ? 'bg-emerald-400' : 'group-hover/bar:bg-emerald-300'
                      }`}
                      style={{ height: `${bar.mintVal}%` }}
                    />
                    <div
                      className={`w-1.5 sm:w-2 bg-teal-600 rounded-t-full transition-all duration-300 ${
                        activeBarIndex === i ? 'bg-teal-500' : 'group-hover/bar:bg-teal-700'
                      }`}
                      style={{ height: `${bar.tealVal}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono group-hover/bar:text-slate-800">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Status Penarikan</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Dapat Dicairkan
          </span>
        </div>
      </motion.div>

      {/* ───────────────────────────────────────────────────────────────────────
          CARD 3: ESTIMASI (Right Card)
          - Header: Sparkles icon with teal circle + 14.5 kg badge
          - Stat: PROYEKSI TAMBAHAN -> Rp 38.200
          - Circular Gauge: 78% Target
          - Target Bulanan (13 / 37 kg) & Kenaikan Potensi (+32%)
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.32, duration: 0.85, ease: BUTTERY_EASE }}
        className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 group"
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Estimasi</h2>
                <p className="text-xs text-slate-500 font-light">Potensi dari keranjang</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
              14.5 kg
            </span>
          </div>

          {/* Stat Value */}
          <div className="my-5">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              PROYEKSI TAMBAHAN
            </span>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono mt-0.5">
              {mounted ? (
                <CountUp
                  start={0}
                  end={estimatedBalance}
                  duration={2.2}
                  separator="."
                  prefix="Rp "
                />
              ) : (
                `Rp ${estimatedBalance.toLocaleString('id-ID')}`
              )}
            </div>
          </div>

          {/* Circular Gauge & Dashed Box Aesthetic */}
          <div className="rounded-2xl border border-dashed border-slate-200 p-3.5 bg-slate-50/50 flex items-center justify-between gap-3">
            {/* Mini Circular Gauge */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600"
                  strokeDasharray={`${targetPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {targetPercentage}%
                </span>
                <span className="text-[8px] text-slate-400 font-medium">Target</span>
              </div>
            </div>

            {/* Right Details in Dashed Box */}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Target Bulanan</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentWeightKg} / {monthlyTargetKg} kg
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Kenaikan Potensi</span>
                <span className="font-mono font-bold text-emerald-600">
                  +{potentialIncreasePercent}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight pt-0.5">
                Jika diajukan sebelum akhir pekan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Material Terpilah</span>
          <span className="text-teal-700 font-medium">PET, Kardus &amp; Kaleng</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ThreePillarLedgerCards;
