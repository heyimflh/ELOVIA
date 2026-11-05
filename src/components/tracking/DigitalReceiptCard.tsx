'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Download,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  Truck,
  Hash,
  ExternalLink,
} from 'lucide-react';

interface DigitalReceiptCardProps {
  orderId?: string;
  referenceNumber?: string;
  onDownloadPdf?: () => void;
  onShare?: () => void;
}

export function DigitalReceiptCard({
  orderId = 'ORD-ELV-20261104-089',
  referenceNumber = 'REF-20261104-ELV89',
  onDownloadPdf,
  onShare,
}: DigitalReceiptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="w-full bg-white/5 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-6 md:p-8 transform-gpu backface-hidden shadow-2xl relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 -right-20 w-80 h-80 bg-green-500/10 blur-[90px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* 2-column layout (Grid 5:7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column (Glowing QR Code Verification) - 5 cols */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Holographic Glass Frame */}
          <div className="w-full aspect-square max-w-[240px] mx-auto bg-white/10 border border-white/30 rounded-3xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group transform-gpu">
            {/* Holographic HUD corner brackets */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-green-400 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-green-400 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-green-400 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-green-400 rounded-br-sm pointer-events-none" />

            {/* Laser Scan Effect (Framer Motion loop animation) */}
            <motion.div
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_#22c55e] z-20 pointer-events-none"
              animate={{
                top: ['6%', '90%', '6%'],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Soft green scan glow trailing line */}
            <motion.div
              className="absolute inset-x-0 h-12 bg-gradient-to-b from-green-400/20 via-green-500/5 to-transparent z-10 pointer-events-none"
              animate={{
                top: ['2%', '84%', '2%'],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Crisp QR Code SVG overlaying ELOVIA leaf logo in center */}
            <div className="relative w-full h-full bg-white rounded-2xl p-3 flex items-center justify-center shadow-inner">
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full text-black"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Top-Left Finder */}
                <rect x="10" y="10" width="38" height="38" rx="6" fill="#0F1F17" />
                <rect x="16" y="16" width="26" height="26" rx="4" fill="#FFFFFF" />
                <rect x="22" y="22" width="14" height="14" rx="3" fill="#177A47" />

                {/* Top-Right Finder */}
                <rect x="112" y="10" width="38" height="38" rx="6" fill="#0F1F17" />
                <rect x="118" y="16" width="26" height="26" rx="4" fill="#FFFFFF" />
                <rect x="124" y="22" width="14" height="14" rx="3" fill="#177A47" />

                {/* Bottom-Left Finder */}
                <rect x="10" y="112" width="38" height="38" rx="6" fill="#0F1F17" />
                <rect x="16" y="118" width="26" height="26" rx="4" fill="#FFFFFF" />
                <rect x="22" y="124" width="14" height="14" rx="3" fill="#177A47" />

                {/* Simulated high-density QR modules */}
                {/* Row 1 */}
                <rect x="56" y="12" width="6" height="6" rx="1.5" />
                <rect x="68" y="12" width="6" height="6" rx="1.5" />
                <rect x="80" y="12" width="6" height="6" rx="1.5" />
                <rect x="94" y="12" width="6" height="6" rx="1.5" />
                {/* Row 2 */}
                <rect x="56" y="24" width="6" height="6" rx="1.5" />
                <rect x="74" y="24" width="6" height="6" rx="1.5" />
                <rect x="86" y="24" width="6" height="6" rx="1.5" />
                {/* Row 3 */}
                <rect x="62" y="36" width="6" height="6" rx="1.5" />
                <rect x="74" y="36" width="6" height="6" rx="1.5" />
                <rect x="92" y="36" width="6" height="6" rx="1.5" />
                {/* Row 4 */}
                <rect x="56" y="48" width="6" height="6" rx="1.5" />
                <rect x="68" y="48" width="6" height="6" rx="1.5" />
                <rect x="86" y="48" width="6" height="6" rx="1.5" />
                {/* Middle Left / Right Modules */}
                <rect x="12" y="56" width="6" height="6" rx="1.5" />
                <rect x="24" y="56" width="6" height="6" rx="1.5" />
                <rect x="36" y="56" width="6" height="6" rx="1.5" />
                <rect x="12" y="68" width="6" height="6" rx="1.5" />
                <rect x="30" y="68" width="6" height="6" rx="1.5" />
                <rect x="18" y="80" width="6" height="6" rx="1.5" />
                <rect x="36" y="80" width="6" height="6" rx="1.5" />
                <rect x="12" y="92" width="6" height="6" rx="1.5" />
                <rect x="24" y="92" width="6" height="6" rx="1.5" />

                {/* Right side modules */}
                <rect x="114" y="56" width="6" height="6" rx="1.5" />
                <rect x="126" y="56" width="6" height="6" rx="1.5" />
                <rect x="138" y="56" width="6" height="6" rx="1.5" />
                <rect x="120" y="68" width="6" height="6" rx="1.5" />
                <rect x="138" y="68" width="6" height="6" rx="1.5" />
                <rect x="114" y="80" width="6" height="6" rx="1.5" />
                <rect x="132" y="80" width="6" height="6" rx="1.5" />
                <rect x="120" y="92" width="6" height="6" rx="1.5" />
                <rect x="138" y="92" width="6" height="6" rx="1.5" />

                {/* Bottom modules */}
                <rect x="56" y="114" width="6" height="6" rx="1.5" />
                <rect x="68" y="114" width="6" height="6" rx="1.5" />
                <rect x="86" y="114" width="6" height="6" rx="1.5" />
                <rect x="62" y="126" width="6" height="6" rx="1.5" />
                <rect x="80" y="126" width="6" height="6" rx="1.5" />
                <rect x="94" y="126" width="6" height="6" rx="1.5" />
                <rect x="56" y="138" width="6" height="6" rx="1.5" />
                <rect x="74" y="138" width="6" height="6" rx="1.5" />
                <rect x="86" y="138" width="6" height="6" rx="1.5" />
                <rect x="100" y="138" width="6" height="6" rx="1.5" />
                <rect x="114" y="138" width="6" height="6" rx="1.5" />
                <rect x="132" y="138" width="6" height="6" rx="1.5" />
                <rect x="114" y="114" width="6" height="6" rx="1.5" />
                <rect x="126" y="126" width="6" height="6" rx="1.5" />
              </svg>

              {/* Center ELOVIA Leaf Emblem Badge */}
              <div className="absolute w-11 h-11 bg-[#0a150f] rounded-xl border border-green-400/60 p-1.5 shadow-[0_0_12px_rgba(34,197,94,0.5)] flex items-center justify-center">
                <Image
                  src="/logo/Minimalist Green Leaf Emblem.png"
                  alt="ELOVIA Leaf Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Verification Code below in JetBrains Mono font */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-white font-mono font-bold tracking-widest text-sm drop-shadow">
              {orderId}
            </span>
            <button
              type="button"
              onClick={handleCopyCode}
              title="Salin Kode Verifikasi"
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <span className="text-[11px] font-mono text-green-400/80 mt-1">
            ISO/IEC 18004 • VERIFIED CRYPTO-HASH
          </span>
        </div>

        {/* Right Column (Quick Actions & Receipt Identity) - 7 cols */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-bold uppercase tracking-wider mb-2 font-jakarta">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Dokumen Bukti Serah Terima Resmi</span>
          </div>

          {/* Header */}
          <h2 className="text-2xl md:text-3xl font-bold text-white font-jakarta tracking-tight">
            Resi Digital Transaksi SNI
          </h2>

          {/* Subtitle */}
          <p className="text-white/70 text-sm mb-6 max-w-xl font-jakarta leading-relaxed">
            Tunjukkan QR code ini kepada petugas driver atau mitra saat penyerahan material untuk otentikasi timbangan digital dan pencairan dana seketika.
          </p>

          {/* Key Receipt Metadata Breakdown */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-black/30 border border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-white/80">
              <Calendar className="w-4 h-4 text-green-400 shrink-0" />
              <div>
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  Jadwal Penjemputan
                </span>
                <span className="font-semibold text-white">Kamis, 5 Nov 2026 • 14:00 WIB</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <Truck className="w-4 h-4 text-green-400 shrink-0" />
              <div>
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  Tipe Penyaluran
                </span>
                <span className="font-semibold text-white">Penjemputan Armada L300</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <Hash className="w-4 h-4 text-green-400 shrink-0" />
              <div>
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  No. Referensi
                </span>
                <span className="font-mono font-bold text-white">{referenceNumber}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-white/80">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <div>
                <span className="text-white/50 block text-[10px] uppercase font-mono">
                  Standar Mutu
                </span>
                <span className="font-semibold text-green-300">SNI 8455:2017 &amp; Tera Legal</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="w-full flex flex-wrap items-center gap-3">
            {/* Primary Button: "Unduh Resi PDF" */}
            <button
              type="button"
              onClick={onDownloadPdf}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95 shadow-lg hover:shadow-green-500/10 cursor-pointer"
            >
              <Download className="w-4 h-4 text-green-400" />
              <span>Unduh Resi PDF</span>
            </button>

            {/* Secondary Button: "Bagikan Status" */}
            <button
              type="button"
              onClick={onShare}
              className="bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-white/70" />
              <span>Bagikan Status</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

