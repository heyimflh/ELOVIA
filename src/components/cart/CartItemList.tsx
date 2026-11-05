'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, ArrowUpRight, RotateCcw } from 'lucide-react';
import type { CartItem } from '@/lib/cart-store';
import { CartItemCard } from './CartItemCard';

interface CartItemListProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateWeight: (id: string, weight: number) => void;
  onClear: () => void;
  onResetDemo: () => void;
}

export function CartItemList({
  items,
  onRemove,
  onUpdateWeight,
  onClear,
  onResetDemo,
}: CartItemListProps) {
  return (
    <section aria-label="Daftar Material dalam Keranjang" className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between pb-2 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1F17] flex items-center gap-2">
            Material Terpilih
            <span className="w-5 h-5 rounded-full bg-[#E8F4EC] text-[#0F5F37] text-xs flex items-center justify-center font-mono font-bold">
              {items.length}
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Link to Scan More */}
          <Link
            href="/pindai"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#177A47] hover:text-[#0F5F37] transition-colors py-1 px-2.5 rounded-full hover:bg-white/60"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Pindai Material Lain</span>
          </Link>

          {/* Clear Cart button */}
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs text-[#5D7065] hover:text-[#B91C1C] transition-colors py-1 px-2.5 rounded-full hover:bg-red-50/60 cursor-pointer"
            title="Kosongkan seluruh isi keranjang"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Kosongkan</span>
          </button>
        </div>
      </div>

      {/* Animated Items List via Framer Motion AnimatePresence */}
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUpdateWeight={onUpdateWeight}
          />
        ))}
      </AnimatePresence>

      {/* Subtle footer tip */}
      <div className="pt-2 px-2 flex items-center justify-between text-xs text-[#4A5D52]">
        <p className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2FA866]" />
          Harga indikatif mengacu pada standar acuan ELOVIA terverifikasi SNI.
        </p>

        <button
          type="button"
          onClick={onResetDemo}
          className="text-[11px] text-[#177A47] hover:underline flex items-center gap-1 cursor-pointer opacity-75 hover:opacity-100"
          title="Muat ulang data sampel PRD"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Sampel</span>
        </button>
      </div>
    </section>
  );
}

