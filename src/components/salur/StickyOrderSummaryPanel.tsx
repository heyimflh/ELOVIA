'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Leaf,
  Truck,
  Building2,
  CalendarCheck,
  Sparkles,
} from 'lucide-react';
import { useCart, INITIAL_DEMO_ITEMS, type CartItem } from '@/lib/cart-store';
import type { DeliveryMethod } from './DeliveryMethodSwitcher';
import type { DateOption, TimeSlotOption } from './DateTimeSlotPicker';
import { MainCheckoutCTAButton } from './MainCheckoutCTAButton';

export interface StickyOrderSummaryPanelProps {
  /** Delivery method: pickup or dropoff */
  deliveryMethod?: DeliveryMethod;
  /** Selected date */
  selectedDate?: DateOption | null;
  /** Selected time slot */
  selectedSlot?: TimeSlotOption | null;
  /** Partner display name */
  partnerName?: string;
  /** Optional custom items override */
  items?: CartItem[];
  /** Target order ID for routing (defaults to 'ORD-12345') */
  orderId?: string;
  /** Optional callback when user clicks confirmation */
  onSubmit?: () => Promise<void> | void;
  /** Optional additional CSS classes */
  className?: string;
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function StickyOrderSummaryPanel({
  deliveryMethod = 'pickup',
  selectedDate,
  selectedSlot,
  partnerName = 'Bank Sampah Resik Kebumen',
  items: customItems,
  orderId = 'ORD-12345',
  onSubmit,
  className = '',
}: StickyOrderSummaryPanelProps) {
  const cart = useCart();

  // Use custom items if provided, or store items, fallback to INITIAL_DEMO_ITEMS
  const displayItems = useMemo(() => {
    if (customItems && customItems.length > 0) return customItems;
    if (cart.isLoaded && cart.items && cart.items.length > 0) return cart.items;
    return INITIAL_DEMO_ITEMS;
  }, [customItems, cart.items, cart.isLoaded]);

  const totalMin = useMemo(() => {
    return displayItems.reduce((acc, item) => acc + item.totalMinPrice, 0);
  }, [displayItems]);

  const totalCo2e = useMemo(() => {
    const sum = displayItems.reduce((acc, item) => acc + (item.totalCo2e || 0), 0);
    return Number(sum.toFixed(1));
  }, [displayItems]);

  return (
    <aside
      className={`col-span-1 lg:col-span-4 relative ${className}`}
      suppressHydrationWarning
    >
      {/* Sticky container that stays in viewport as user scrolls the left form */}
      <div className="sticky top-28 space-y-4 isolate transform-gpu">
        {/* Main Digital Receipt Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 rounded-[2rem] shadow-inner transition-colors duration-300 p-6 md:p-8 flex flex-col gap-6 overflow-hidden relative isolate"
        >
          {/* Subtle Background Radial Gradient inside the card */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/20 via-green-400/10 to-transparent blur-2xl -z-10 pointer-events-none rounded-tr-[2rem]"
            aria-hidden="true"
          />

          {/* 1. Header & Partner Context */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-[11px] font-bold text-green-300 uppercase tracking-wider font-jakarta">
                <Sparkles className="w-3 h-3 text-green-400" />
                Resi Digital Penyaluran
              </span>
              <span className="text-[11px] font-semibold text-white/70 font-jakarta">
                {displayItems.length} Material
              </span>
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-md font-jakarta">
              Ringkasan Penyaluran
            </h3>
            <p className="text-xs text-white/70 font-jakarta mt-0.5">
              Mitra:{' '}
              <span className="font-semibold text-white">{partnerName}</span>
            </p>
          </div>

          {/* 2. Itemized Material List */}
          <div className="flex flex-col gap-4 mt-2">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between group"
              >
                {/* Left (Icon & Name) */}
                <div className="flex items-center min-w-0 pr-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shrink-0 relative">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-lg">{item.icon || '♻️'}</span>
                    )}
                  </div>
                  <div className="flex flex-col ml-3 min-w-0">
                    <span className="text-sm font-bold text-white font-jakarta truncate">
                      {item.name}
                    </span>
                    <span className="text-xs text-white/70 font-medium font-jakarta">
                      {item.weightKg} kg
                    </span>
                  </div>
                </div>

                {/* Right (Price) */}
                <span className="text-sm font-bold text-white font-[family:var(--font-jetbrains)] shrink-0">
                  Rp {formatRupiah(item.totalMinPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* Receipt-style dashed line divider */}
          <div className="w-full border-t-2 border-dashed border-white/15 my-2" />

          {/* 3. The Total Value Calculation */}
          <div>
            <span className="text-sm font-semibold text-white/70 uppercase tracking-wider font-jakarta block">
              Estimasi Total Nilai
            </span>
            <div className="text-4xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.4)] leading-none mt-1 flex items-baseline gap-1 font-[family:var(--font-jetbrains)] tracking-tight">
              <span className="text-2xl text-green-400/70 font-normal select-none">
                ≈
              </span>
              <span>Rp {formatRupiah(totalMin || 249800)}</span>
            </div>
          </div>

          {/* 4. Ecological Impact Metric */}
          <div className="bg-white/5 border border-white/15 rounded-2xl p-4 flex items-center gap-4 mt-2 shadow-inner">
            <div className="bg-green-500/20 border border-green-400/30 p-2 rounded-full text-green-300 shrink-0">
              <Leaf className="w-5 h-5 text-green-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-300 uppercase font-jakarta">
                Dampak Ekologis
              </span>
              <span className="text-sm font-semibold text-white/90 font-jakarta mt-0.5">
                🌱 Mencegah {totalCo2e || 12.4} kg CO2e
              </span>
            </div>
          </div>

          {/* 5. Transparency Guarantee Note */}
          <div className="bg-white/5 rounded-xl p-4 flex gap-3 items-start mt-2 border border-white/10">
            <ShieldCheck className="text-white/50 w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-xs text-white/70 font-medium leading-relaxed font-jakarta">
              Estimasi harga bersifat indikatif. Timbangan final dan pembayaran
              akan dilakukan secara presisi oleh petugas mitra di lokasi.
            </p>
          </div>

          {/* 6. Delivery & Schedule Context Metadata */}
          <div className="pt-2 border-t border-white/10 space-y-2 text-xs font-jakarta text-white/70">
            <div className="flex items-center justify-between">
              <span>Metode Pengiriman</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                {deliveryMethod === 'pickup' ? (
                  <>
                    <Truck className="w-3.5 h-3.5 text-green-400" /> Jemput Mitra
                  </>
                ) : (
                  <>
                    <Building2 className="w-3.5 h-3.5 text-teal-300" /> Antar
                    Mandiri
                  </>
                )}
              </span>
            </div>

            {selectedDate && selectedSlot && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <CalendarCheck className="w-3.5 h-3.5 text-green-400" />
                  Jadwal Dipilih
                </span>
                <span className="font-semibold text-white font-mono text-[11px]">
                  {selectedDate.fullDayName}, {selectedDate.dateNum}{' '}
                  {selectedDate.monthName} ({selectedSlot.time})
                </span>
              </div>
            )}
          </div>

          {/* 7. Main Checkout CTA Button & Trust Badge */}
          <MainCheckoutCTAButton
            orderId={orderId}
            onConfirm={onSubmit}
          />
        </motion.div>
      </div>
    </aside>
  );
}

export default StickyOrderSummaryPanel;
