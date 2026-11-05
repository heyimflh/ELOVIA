'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, ArrowUpRight, ShieldCheck, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';
import type { CartItem } from '@/lib/cart-store';

interface CartSummaryProps {
  items: CartItem[];
  totalWeight: number;
  totalMinPrice: number;
  totalMaxPrice: number;
  totalCo2e: number;
}

export function CartSummary({
  items,
  totalWeight,
  totalMinPrice,
  totalMaxPrice,
  totalCo2e,
}: CartSummaryProps) {
  const formattedMin = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalMinPrice);

  const formattedMax = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalMaxPrice);

  // Big number string formatted like "≈ Rp 249.800 - 344.700"
  const minClean = formattedMin.replace(',00', '');
  const maxClean = formattedMax.replace('Rp', '').replace(',00', '').trim();
  const bigPriceString = `≈ ${minClean} - ${maxClean}`;

  return (
    <div className="sticky top-28 lg:top-32 w-full">
      {/* Prominent frosted glass card */}
      <div className="bg-white/85 backdrop-blur-2xl rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_40px_rgba(23,122,71,0.08)] border border-white/60 relative overflow-hidden">
        {/* Subtle decorative glowing corner accent */}
        <div
          className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#D3EBDB]/40 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Card Header: "Ringkasan Estimasi" */}
        <div className="flex items-center justify-between pb-5 border-b border-[#D3EBDB]/50">
          <div>
            <h2 className="font-fraunces text-2xl font-bold text-[#0F1F17] tracking-tight">
              Ringkasan Estimasi
            </h2>
            <p className="text-xs text-[#4A5D52] mt-0.5">
              Berdasarkan {items.length} jenis material terpilah
            </p>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-[#E8F4EC] border border-[#D3EBDB] flex items-center justify-center text-[#177A47] shadow-2xs">
            <Scale className="w-5 h-5 stroke-[2.2]" />
          </div>
        </div>

        {/* Line Items List */}
        <div className="py-5 space-y-3.5 border-b border-[#D3EBDB]/50 text-sm">
          {/* Total Berat */}
          <div className="flex items-center justify-between">
            <span className="text-[#4A5D52] font-medium flex items-center gap-1.5">
              <span>Total Berat</span>
              <span className="text-[11px] text-[#5D7065]">({items.length} item)</span>
            </span>
            <span className="font-mono font-bold text-base text-[#0F1F17]">
              {totalWeight} kg
            </span>
          </div>

          {/* Breakdown items brief */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs text-[#5D7065] pl-2 border-l-2 border-[#D3EBDB]"
            >
              <span className="truncate max-w-[170px]">{item.name}</span>
              <span className="font-mono font-medium text-[#4A5D52] shrink-0">
                {item.weightKg} kg
              </span>
            </div>
          ))}

          {/* Status Penyaluran */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[#4A5D52] font-medium">Status Konversi</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5F37] bg-[#E8F4EC] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA866] animate-pulse" />
              Estimasi Siap Salur
            </span>
          </div>
        </div>

        {/* The Big Number (Total Potential Rp) */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D52]">
              Total Potensi Nilai
            </span>
            <span className="text-[11px] text-[#177A47] font-semibold bg-[#F4FAF6] px-2 py-0.5 rounded-md border border-[#D3EBDB]/60">
              Tanpa Potongan Biaya
            </span>
          </div>

          {/* Massive 'JetBrains Mono' typography with subtle green text shadow */}
          <div className="font-mono text-3xl sm:text-4xl text-[#0F1F17] font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(23,122,71,0.15)] leading-tight">
            {bigPriceString}
          </div>

          <p className="text-[11px] text-[#5D7065] mt-2 leading-relaxed">
            *Nilai final ditentukan langsung oleh timbangan mitra terverifikasi saat penyerahan
            material.
          </p>
        </div>

        {/* Eco Impact Highlight: Box showing CO2e Terhindar with cute leaf SVG */}
        <div className="bg-[#E8F4EC]/50 rounded-2xl p-4.5 border border-[#D3EBDB]/70 flex items-center gap-3.5 shadow-2xs">
          {/* Cute Leaf SVG in glowing green bubble */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#177A47] to-[#0F5F37] text-white flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(23,122,71,0.25)]">
            <Leaf className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#0F5F37]">
                CO₂e Terhindar
              </span>
              <span className="text-[10px] text-[#2FA866] font-semibold">Taman Ekologis</span>
            </div>

            <div className="font-mono text-xl font-bold text-[#0F1F17] tracking-tight">
              {totalCo2e} kg CO₂e
            </div>

            <p className="text-[11px] text-[#4A5D52] truncate">
              Setara menumbuhkan bibit pohon selama 6 bulan
            </p>
          </div>
        </div>

        {/* Main CTA Button (PRD Strict):
            Text: "Cari Mitra & Lanjutkan Penyaluran ↗"
            Style: Massive, full-width pill button. bg-green-600 text-white, hovering to glowing bg-green-700 with slight scale-[1.02] spring animation.
        */}
        <div className="mt-6 space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Link
              href="/pasar"
              className="w-full py-4.5 px-6 rounded-full font-jakarta font-bold text-sm sm:text-base text-white bg-[#177A47] hover:bg-[#0F5F37] shadow-[0_10px_25px_rgba(23,122,71,0.3)] hover:shadow-[0_14px_32px_rgba(23,122,71,0.4)] flex items-center justify-center gap-2 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-[#2FA866]/40 cursor-pointer text-center group"
            >
              <span>Cari Mitra & Lanjutkan Penyaluran</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Direct Wizard alternative link */}
          <Link
            href="/salur/baru"
            className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-[#177A47] hover:text-[#0F5F37] hover:bg-[#E8F4EC]/60 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Langsung Buat Pengajuan (Jemput / Antar)</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Guarantees micro-badges */}
        <div className="mt-6 pt-5 border-t border-[#D3EBDB]/50 grid grid-cols-2 gap-2 text-[11px] text-[#4A5D52]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
            <span>Mitra Terverifikasi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
            <span>Bayar Tunai / Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

