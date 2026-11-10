'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Star,
  Power,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Inbox,
  Scale,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { MitraProfile, OperationalStatus } from './types';
import { OPERATIONAL_METRICS } from './mitraData';

interface MitraCommandCenterHeroProps {
  profile: MitraProfile;
  status: OperationalStatus;
  onRequestToggleStatus: () => void;
  onActionToast?: (title: string, desc: string) => void;
}

export function MitraCommandCenterHero({
  profile,
  status,
  onRequestToggleStatus,
  onActionToast,
}: MitraCommandCenterHeroProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const isOpen = status === 'open';

  const handleCopyProfileLink = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/pasar/bank-sampah-berkah-mandiri`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    onActionToast?.(
      'Tautan Profil Disalin',
      'Tautan halaman publik toko berhasil disalin ke clipboard.'
    );
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1F17] text-white">
      {/* ── 1. Photographic Hero Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={profile.heroImage || '/images/mitra/hero.jpeg'}
          alt="Modern Eco Facility - Bank Sampah Berkah Mandiri"
          fill
          priority
          className="object-cover object-center transform scale-105"
        />

        {/* Multi-layer High-Precision Tech Gradient Veil for Visual Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0F1F17]/96 via-[#0F1F17]/88 to-[#174D35]/80 z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0F1F17] via-transparent to-[#0F1F17]/40 z-10"
          aria-hidden="true"
        />

        {/* Ambient Emerald Green Glow for Fresh Green Tech Vibe */}
        <div
          className="absolute -top-32 right-1/4 w-96 h-96 bg-[#238B57]/25 rounded-full blur-[120px] pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-10 w-80 h-80 bg-[#10B981]/20 rounded-full blur-[100px] pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Subtle Tech Dot Grid Overlay */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#238B57_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* ── 2. Command Center Foreground Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-12 lg:pb-16">
        {/* Top Badges Strip */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold tracking-wider uppercase text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>OPERATIONAL COMMAND CENTER</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5ED]/20 backdrop-blur-md border border-[#D3EBDB]/30 text-xs font-medium text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{profile.sniStandard}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300">
            <span>ID:</span>
            <span className="font-bold text-white tracking-wider">#{profile.code}</span>
          </div>
        </div>

        {/* Main Grid: Store Identity (Left) vs Operational Status Console (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Store Identity & Quick Credentials (col-span-7) ── */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#238B57] to-[#10B981] flex items-center justify-center font-bold font-mono text-base sm:text-lg text-white shadow-[0_8px_20px_rgba(35,139,87,0.35)] shrink-0 border border-white/20">
                  {profile.storeAvatarText}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 font-semibold">
                    {profile.type}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-jakarta">
                    {profile.name}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                {profile.tagline}
              </p>
            </div>

            {/* Structured Store Identity Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{profile.address}</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.operatingHours}</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white font-semibold">{profile.rating}</strong> (164 Penilaian Terverifikasi)
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-slate-200">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{profile.phone}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyProfileLink}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tautan Profil Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Link Profil Publik</span>
                  </>
                )}
              </button>

              <Link
                href="/pasar/bank-sampah-berkah-mandiri"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-transparent hover:bg-white/5 border border-white/15 text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <span>Lihat Tampilan Warga</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ── Right Column: Interactive Operational Status Command Card (col-span-5) ── */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white/[0.08] backdrop-blur-xl border border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden">
              {/* Subtle accent corner glow */}
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl transition-colors duration-500 pointer-events-none ${
                  isOpen ? 'bg-emerald-500/30' : 'bg-amber-500/20'
                }`}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Power
                    className={`w-4 h-4 ${isOpen ? 'text-emerald-400' : 'text-slate-400'}`}
                  />
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-300">
                    KONTROL STATUS OPERASIONAL
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                      : 'bg-slate-700/50 text-slate-300 border-slate-600'
                  }`}
                >
                  LIVE SYSTEM
                </span>
              </div>

              {/* Hero Status Display Box */}
              <div
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-gradient-to-br from-emerald-950/60 to-emerald-900/30 border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)]'
                    : 'bg-gradient-to-br from-slate-900/80 to-slate-800/40 border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        {isOpen && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${
                            isOpen ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]' : 'bg-slate-400'
                          }`}
                        />
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-mono tracking-tight text-white uppercase">
                        {isOpen ? 'SEDANG BEROPERASI' : 'OPERASIONAL DITUTUP'}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal font-light">
                      {isOpen
                        ? 'Toko aktif menerima pengajuan jemput & drop-off langsung dari warga.'
                        : 'Penerimaan pesanan baru dihentikan sementara. Selesaikan tiket aktif.'}
                    </p>
                  </div>

                  {/* Interactive Toggle Switch */}
                  <button
                    type="button"
                    onClick={onRequestToggleStatus}
                    role="switch"
                    aria-checked={isOpen}
                    aria-label={`Ubah status operasional (saat ini: ${isOpen ? 'Buka' : 'Tutup'})`}
                    className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0F1F17] shadow-inner ${
                      isOpen ? 'bg-emerald-500 shadow-emerald-600/50' : 'bg-slate-600'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`w-6 h-6 rounded-full bg-white shadow-md transform ${
                        isOpen ? 'translate-x-6' : 'translate-x-0'
                      } flex items-center justify-center`}
                    >
                      <Power
                        className={`w-3.5 h-3.5 ${
                          isOpen ? 'text-emerald-600' : 'text-slate-500'
                        }`}
                      />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Real-time Operational Insights */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Kapasitas Slot Hari Ini
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white font-mono">180 / 250 kg</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">(72%)</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[72%]" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Kecepatan Tanggapan
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white font-mono">12 Menit</span>
                    <span className="text-[10px] text-emerald-300 font-medium">Optimal</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">
                    Batas toleransi SLA ≤ 24 jam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. High-Density Operational Metrics Bar (Overlapping/Bottom) ── */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {OPERATIONAL_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] hover:bg-white/[0.1] backdrop-blur-md border border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-xs text-slate-300 font-medium truncate">
                  {metric.label}
                </span>
                {metric.badge && (
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {metric.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs text-slate-400 font-mono">
                    {metric.unit}
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] text-slate-400 truncate">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

