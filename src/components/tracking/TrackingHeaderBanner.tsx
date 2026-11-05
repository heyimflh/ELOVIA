'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Radio, ShieldCheck } from 'lucide-react';

interface TrackingHeaderBannerProps {
  orderId?: string;
  estimatedArrival?: string;
  remainingDistance?: string;
}

export function TrackingHeaderBanner({
  orderId = 'ORD-ELV-20261104-089',
  estimatedArrival = '14.30 WIB (±15 Menit)',
  remainingDistance = '2.4 km',
}: TrackingHeaderBannerProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Quick Navigation Breadcrumb */}
      <div className="flex items-center justify-between px-2">
        <Link
          href="/salur/baru"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white/70 hover:text-green-400 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Kembali ke Formulir Penyaluran</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>ENKRIPSI TRANSAKSI RESMI SNI</span>
        </div>
      </div>

      {/* Cinematic Edge-to-Edge Banner Header */}
      <div
        className="w-full h-64 md:h-80 rounded-[2rem] overflow-hidden relative border border-white/15 isolate shadow-2xl transform-gpu backface-hidden"
        suppressHydrationWarning
      >
        {/* Cinematic Header Visual */}
        <Image
          src="/images/liveTracking/header.jpeg"
          alt="Pelacakan Penyaluran Real-time"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center scale-[1.02] transform-gpu transition-transform duration-1000 ease-out hover:scale-105"
        />

        {/* Gradient Mask & Overlays */}
        <div
          className="bg-gradient-to-t from-black/95 via-black/50 to-transparent absolute inset-0 z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60 z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle Top-Right Floating Live Telemetry Chip */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white/90 text-xs font-mono shadow-lg">
          <Radio className="w-3.5 h-3.5 text-green-400 animate-pulse" />
          <span>TELEMETRI AKTIF • KEBUMEN</span>
        </div>

        {/* Bottom Container: Split Headline/Meta (Left) and Arrival Estimate Pill (Right) */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-5">
          {/* Headline & Meta (Bottom Left of Header) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-start max-w-2xl"
          >
            {/* Live Indicator Badge */}
            <div className="bg-green-500/20 border border-green-400/40 text-green-300 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>LIVE TRACKING AKTIF</span>
            </div>

            {/* Title in 'Fraunces' font */}
            <h1 className="font-fraunces text-3xl md:text-5xl font-black text-white drop-shadow-md tracking-tight leading-tight mb-2">
              Pelacakan Penyaluran Real-time
            </h1>

            {/* Order Reference Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-white/80 font-jakarta">
              <span className="font-mono text-green-400 font-bold bg-green-950/60 border border-green-500/30 px-2.5 py-0.5 rounded-md">
                {orderId}
              </span>
              <span className="text-white/40">•</span>
              <span>Penjemputan Resmi Mitra ELOVIA</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="hidden sm:inline text-white/70">Kabupaten Kebumen</span>
            </div>
          </motion.div>

          {/* Arrival Estimate Pill (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 md:p-4 rounded-2xl text-left md:text-right text-white shadow-xl flex items-center md:items-end gap-3.5 md:flex-col shrink-0"
          >
            <div className="p-2.5 rounded-xl bg-green-500/20 border border-green-400/40 text-green-300 md:hidden">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center md:justify-end gap-1.5 text-xs text-white/70 font-semibold mb-0.5">
                <Clock className="w-3.5 h-3.5 text-green-400 hidden md:inline" />
                <span>Estimasi Kedatangan Armada</span>
              </div>
              <div className="text-lg md:text-xl font-black text-white font-mono tracking-tight drop-shadow-sm">
                Estimasi Tiba: {estimatedArrival}
              </div>
              <div className="text-xs text-green-300/90 font-medium mt-0.5 flex items-center md:justify-end gap-1">
                <MapPin className="w-3 h-3" />
                <span>Radius {remainingDistance} dari titik penjemputan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

