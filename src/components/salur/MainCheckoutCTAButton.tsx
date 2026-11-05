'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader2, ShieldCheck } from 'lucide-react';

export interface MainCheckoutCTAButtonProps {
  /** Target order ID for routing (defaults to 'ORD-12345') */
  orderId?: string;
  /** Optional callback fired before routing */
  onConfirm?: () => Promise<void> | void;
  /** External disabled flag */
  disabled?: boolean;
  /** Additional CSS class names */
  className?: string;
}

export function MainCheckoutCTAButton({
  orderId = 'ORD-12345',
  onConfirm,
  disabled = false,
  className = '',
}: MainCheckoutCTAButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (isSubmitting || disabled) return;

    try {
      setIsSubmitting(true);

      // Optional parent confirm hook
      if (onConfirm) {
        await onConfirm();
      }

      // Simulate API network latency for tactile feedback
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to the Live Tracking page
      router.push(`/salur/${orderId}`);
    } catch (error) {
      console.error('Error creating order:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full mt-6 ${className}`} suppressHydrationWarning>
      {/* 1. Main CTA Button (Spatial Glowing Action) */}
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isSubmitting || disabled}
        whileHover={!isSubmitting && !disabled ? { scale: 1.01 } : {}}
        whileTap={!isSubmitting && !disabled ? { scale: 0.98 } : {}}
        className="relative w-full bg-green-500 hover:bg-green-400 text-white border border-green-400/50 shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] font-bold text-[15px] md:text-lg px-8 py-4.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group disabled:opacity-80 disabled:cursor-wait cursor-pointer font-jakarta"
      >
        {/* The Glass Shimmer Effect */}
        <div
          className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] group-hover:animate-shimmer pointer-events-none"
          aria-hidden="true"
        />

        {/* 2. Typography & Iconography / 3. Loading State */}
        {isSubmitting ? (
          <div className="relative z-10 flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-white shrink-0" />
            <span className="font-semibold tracking-wide">
              Memproses Pesanan...
            </span>
          </div>
        ) : (
          <div className="relative z-10 flex items-center gap-2">
            <span className="tracking-wide">Konfirmasi &amp; Buat Pesanan</span>
            <ArrowUpRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
          </div>
        )}
      </motion.button>

      {/* 4. Trust & Security Badge */}
      <div className="flex items-center justify-center gap-2 mt-4 select-none">
        <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
        <span className="text-xs font-medium text-white/60 font-jakarta">
          Transaksi Terlindungi &amp; Terverifikasi ELOVIA
        </span>
      </div>
    </div>
  );
}

export default MainCheckoutCTAButton;
