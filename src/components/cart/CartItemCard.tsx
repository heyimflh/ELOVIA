'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, X, Plus, Minus, Check, Leaf, ShieldCheck } from 'lucide-react';
import type { CartItem } from '@/lib/cart-store';

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateWeight: (id: string, weight: number) => void;
}

export function CartItemCard({
  item,
  onRemove,
  onUpdateWeight,
}: CartItemCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Slight pause for trigger tactile feedback then remove
    setTimeout(() => {
      onRemove(item.id);
    }, 150);
  };

  const formattedMinPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(item.totalMinPrice);

  const formattedMaxPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(item.totalMaxPrice);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        scale: 0.94,
        transition: {
          opacity: { duration: 0.25 },
          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          marginBottom: { duration: 0.35 },
          paddingTop: { duration: 0.35 },
          paddingBottom: { duration: 0.35 },
        },
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div
        className={`group relative bg-white/70 backdrop-blur-lg rounded-[2rem] p-5 sm:p-6 shadow-soft hover:shadow-md transition-all duration-300 border border-white/50 mb-4 sm:mb-5 ${
          isRemoving ? 'opacity-40 scale-[0.98]' : ''
        }`}
      >
        {/* Minimalist 'X' / Trash icon button that appears clearly on hover */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Hapus ${item.name} dari keranjang`}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-[#5D7065] hover:text-[#B91C1C] hover:bg-red-50/80 active:scale-90 transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 z-20 cursor-pointer shadow-2xs"
          title="Hapus material"
        >
          <X className="w-4 h-4 stroke-[2.2]" />
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
          {/* Left + Middle Content Flex */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 flex-1 min-w-0 pr-6 sm:pr-0">
            {/* Left: Beautifully styled placeholder image / 3D icon with soft colored background */}
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#E8F4EC] p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#E8F4EC] to-[#D3EBDB] flex items-center justify-center text-3xl">
                  {item.icon || '♻️'}
                </div>
              )}

              {/* 3D Icon Overlay Pill */}
              <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs text-xs px-1.5 py-0.5 rounded-md shadow-xs font-semibold text-[#0F5F37] border border-white/60">
                {item.icon || '🌱'}
              </div>
            </div>

            {/* Middle: Material Name, Weight & Quality pill */}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F4FAF6] text-[#0F5F37] border border-[#D3EBDB]/50">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/80 text-[#4A5D52] border border-white/60 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#177A47]" />
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Material Name */}
              <h3 className="font-fraunces text-xl sm:text-2xl font-bold text-[#0F1F17] tracking-tight leading-snug truncate group-hover:text-[#177A47] transition-colors">
                {item.name}
              </h3>

              {/* Weight & Quality pill ('20 kg • Bersih & Kering 1.0x') */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4EC]/90 text-[#0F5F37] text-xs font-semibold tracking-wide border border-[#D3EBDB]/70 shadow-2xs">
                  <span className="font-bold">{item.weightKg} kg</span>
                  <span className="w-1 h-1 rounded-full bg-[#177A47]/40" />
                  <span>{item.qualityGrade}</span>
                </div>

                {/* Interactive Weight Adjustment Micro-controls */}
                <div className="inline-flex items-center gap-1 bg-white/80 rounded-full border border-white/70 px-1 py-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => onUpdateWeight(item.id, Math.max(0.5, item.weightKg - 1))}
                    aria-label={`Kurangi berat ${item.name}`}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#4A5D52] hover:bg-[#E8F4EC] hover:text-[#0F1F17] active:scale-90 transition-all text-xs cursor-pointer"
                    title="Kurangi 1 kg"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] font-mono font-semibold px-1 text-[#0F1F17]">
                    {item.weightKg} kg
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateWeight(item.id, item.weightKg + 1)}
                    aria-label={`Tambah berat ${item.name}`}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[#4A5D52] hover:bg-[#E8F4EC] hover:text-[#0F1F17] active:scale-90 transition-all text-xs cursor-pointer"
                    title="Tambah 1 kg"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The price range in 'JetBrains Mono' font, large and bold */}
          <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#D3EBDB]/40 pt-3 sm:pt-0 shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-[#4A5D52] font-semibold sm:text-right block">
              Estimasi Potensi
            </span>
            <div className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-[#0F1F17] tracking-tight">
              ≈ {formattedMinPrice.replace(',00', '')} - {formattedMaxPrice.replace('Rp', '').replace(',00', '').trim()}
            </div>
            {/* Ecological metric */}
            <div className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#0F5F37] font-medium mt-1 bg-[#F4FAF6] px-2 py-0.5 rounded-md border border-[#D3EBDB]/40">
              <Leaf className="w-3 h-3 text-[#177A47]" />
              <span>+{item.totalCo2e} kg CO2e</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

