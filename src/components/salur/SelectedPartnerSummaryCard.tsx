'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, MapPin, Scale, RefreshCcw } from 'lucide-react';

export interface SelectedPartnerSummaryCardProps {
  /** Partner display name */
  partnerName?: string;
  /** Partner facility cover image */
  partnerImage?: string;
  /** Rating value (e.g. 4.9) */
  rating?: number | string;
  /** Distance string (e.g. "1.2 km dari Anda") */
  distance?: string;
  /** Minimum pickup weight requirement (e.g. "Min. Jemput: 10 kg") */
  minPickupWeight?: string;
  /** Verification badge label */
  verificationBadgeText?: string;
  /** Optional callback when user clicks 'Ganti Mitra' */
  onChangePartner?: () => void;
  /** Fallback URL when user clicks 'Ganti Mitra' (defaults to '/pasar') */
  changePartnerHref?: string;
  /** Optional additional CSS classes */
  className?: string;
}

export function SelectedPartnerSummaryCard({
  partnerName = 'Bank Sampah Resik Kebumen',
  partnerImage = '/images/Marketplace/Modern Recycling Facility2.jpeg',
  rating = '4.9',
  distance = '1.2 km dari Anda',
  minPickupWeight = 'Min. Jemput: 10 kg',
  verificationBadgeText = 'Mitra Terverifikasi',
  onChangePartner,
  changePartnerHref = '/pasar',
  className = '',
}: SelectedPartnerSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative w-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 rounded-[2rem] shadow-inner transition-colors duration-300 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden isolate ${className}`}
      suppressHydrationWarning
    >
      {/* Subtle Background Glow: Radial gradient tucked in top-left corner */}
      <div
        className="absolute top-0 left-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-500/20 via-green-400/10 to-transparent -z-10 pointer-events-none rounded-tl-[2rem]"
        aria-hidden="true"
      />

      {/* 2. The Visual Identity Area (Left) */}
      <div className="relative w-full md:w-36 h-32 md:h-auto md:aspect-square flex-shrink-0">
        {/* Main Facility Cover */}
        <div className="relative w-full h-full md:w-36 h-32 md:h-auto md:aspect-square flex-shrink-0 rounded-2xl overflow-hidden border border-white/20">
          <Image
            src={partnerImage}
            alt={partnerName}
            fill
            sizes="(max-width: 768px) 100vw, 144px"
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Floating Avatar Overlay (Brand Integration) */}
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-full p-1.5 shadow-lg ring-2 ring-white/30 border border-white/20 z-10 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/logo/Minimalist Green Leaf Emblem.png"
              alt="ELOVIA Official Emblem"
              fill
              sizes="48px"
              className="object-contain w-full h-full drop-shadow"
            />
          </div>
        </div>
      </div>

      {/* 3. The Information Hub (Middle) */}
      <div className="flex flex-col flex-1 gap-2.5">
        {/* Top Row: Verification Badge */}
        <div className="bg-green-500/20 text-green-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 w-fit border border-green-400/30 font-jakarta">
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span>{verificationBadgeText}</span>
        </div>

        {/* Title in 'Fraunces' font */}
        <h2 className="font-fraunces text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">
          {partnerName}
        </h2>

        {/* Meta Info Row: Rating & Distance */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 text-white/90 text-sm font-semibold">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{rating}</span>
          </div>

          <div className="flex items-center gap-1 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-green-400" />
            <span>{distance}</span>
          </div>
        </div>

        {/* Logistics Requirement */}
        <div className="bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-semibold px-3 py-1.5 rounded-xl inline-flex items-center gap-2 w-fit mt-1">
          <Scale className="w-3.5 h-3.5 text-amber-300" />
          <span>{minPickupWeight}</span>
        </div>
      </div>

      {/* 4. The Action Area (Right) */}
      <div className="md:ml-auto mt-2 md:mt-0 w-full md:w-auto">
        {onChangePartner ? (
          <button
            type="button"
            onClick={onChangePartner}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white/90 hover:text-white font-bold transition-all group cursor-pointer shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 text-white/70 group-hover:text-green-400" />
            <span>Ganti Mitra</span>
          </button>
        ) : (
          <Link
            href={changePartnerHref}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white/90 hover:text-white font-bold transition-all group cursor-pointer shadow-sm"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 text-white/70 group-hover:text-green-400" />
            <span>Ganti Mitra</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// Named alias export
export { SelectedPartnerSummaryCard as SelectedPartnerCard };
