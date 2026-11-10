'use client';

import Image from 'next/image';
import {
  Sun,
  Truck,
  PackageCheck,
  TrendingUp,
  Leaf,
  Clock,
  Coins,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { MitraProfile } from './types';

interface MitraHeroBannerCardProps {
  profile: MitraProfile;
}

export function MitraHeroBannerCard({ profile }: MitraHeroBannerCardProps) {
  return (
    <div className="relative bg-white/60 border border-white/40 shadow-sm rounded-3xl p-0 flex flex-col md:flex-row overflow-hidden shrink-0 min-h-[160px] backdrop-blur-md transition hover:shadow-md">
      {/* ── Left Side: Illustrative Photo (shrink-0, w-full md:w-1/3, min-h-[160px]) ── */}
      <div className="relative shrink-0 w-full md:w-1/3 min-h-[180px] sm:min-h-[200px] md:min-h-full overflow-hidden group">
        <Image
          src="/images/mitra/hero.jpeg"
          alt="Fasilitas Sirkular ELOVIA - Bank Sampah Berkah Mandiri"
          fill
          priority
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Frosted Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

        {/* Top Pill on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/40 text-[11px] font-semibold text-emerald-900 shadow-2xs">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>Fasilitas Terpilah SNI</span>
        </div>

        {/* Bottom Card Overlay on Image */}
        <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/50 text-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">
              Kapasitas Gudang
            </span>
            <span className="font-mono font-bold text-emerald-700">
              180 / 250 kg (72%)
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200/80 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-[72%]" />
          </div>
        </div>
      </div>

      {/* ── Right Side: Text & Operational Stats (p-5 md:p-6 flex-1 flex flex-col justify-between) ── */}
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between gap-4">
        {/* Top 3 Core Highlight Cards (Weather, Active Slots, Expected Inbound) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 1. Today's Weather / Eco Climate */}
          <div className="p-3.5 rounded-2xl bg-white/60 border border-white/50 shadow-2xs backdrop-blur-sm">
            <div className="flex items-center justify-between gap-1 text-slate-500 text-xs mb-1">
              <span>Cuaca Operasional</span>
              <Sun className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900 font-jakarta">
                26°C
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                Cerah
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              Optimal armada jemput
            </p>
          </div>

          {/* 2. Total Active Slots */}
          <div className="p-3.5 rounded-2xl bg-white/60 border border-white/50 shadow-2xs backdrop-blur-sm">
            <div className="flex items-center justify-between gap-1 text-slate-500 text-xs mb-1">
              <span>Slot Armada Aktif</span>
              <Truck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900 font-jakarta">
                12
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 16 slot</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              4 unit armada beroperasi
            </p>
          </div>

          {/* 3. Expected Inbound Volume */}
          <div className="p-3.5 rounded-2xl bg-white/60 border border-white/50 shadow-2xs backdrop-blur-sm">
            <div className="flex items-center justify-between gap-1 text-slate-500 text-xs mb-1">
              <span>Estimasi Inbound</span>
              <PackageCheck className="w-4 h-4 text-teal-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-slate-900 font-jakarta">
                340
              </span>
              <span className="text-xs font-mono text-slate-500">kg</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
              8 pengajuan terjadwal
            </p>
          </div>
        </div>

        {/* Bottom 4 Sub-KPI Micro Sparkline Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-200/50">
          <div className="p-2.5 rounded-xl bg-white/40 border border-white/30">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Volume Hari Ini
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold font-mono text-slate-900">
                185 kg
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                +12%
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/30">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Nilai Transaksi
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold font-mono text-slate-900 truncate">
                Rp 540k
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Aktif
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/30">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Reduksi CO₂e
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold font-mono text-slate-900">
                428 kg
              </span>
              <span className="text-[10px] text-teal-600 font-semibold">
                SNI
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white/40 border border-white/30">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">
              Kecepatan SLA
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold font-mono text-slate-900">
                12 mnt
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Prima
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
