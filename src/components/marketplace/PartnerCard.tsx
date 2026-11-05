'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Star,
  MapPin,
  Truck,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import type { PartnerItem } from './partnerData';

interface PartnerCardProps {
  partner: PartnerItem;
  index: number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onSelect?: (partner: PartnerItem) => void;
  onViewDetail?: (partner: PartnerItem) => void;
}

export function PartnerCard({
  partner,
  index,
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  onSelect,
  onViewDetail,
}: PartnerCardProps) {
  // Fallback header image if not provided
  const headerImage =
    partner.headerImage || '/images/Marketplace/Aerial Recycling Plant.jpeg';

  return (
    <motion.article
      id={`partner-card-${partner.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(23,122,71,0.06)] hover:shadow-[0_20px_40px_rgba(23,122,71,0.12)] hover:ring-1 hover:ring-mint-300 transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
        isHovered
          ? 'ring-2 ring-green-500 shadow-[0_20px_45px_rgba(23,122,71,0.2)] bg-white/95 scale-[1.01] -translate-y-1'
          : ''
      }`}
    >
      {/* =====================================================================
          1. VISUAL HEADER WITH LOCAL ASSET & FLOATING GLASS PILLS
          ===================================================================== */}
      <div className="relative w-full h-32 overflow-hidden rounded-t-3xl bg-mint-100">
        {/* Header Visual Image */}
        <img
          src={headerImage}
          alt={partner.name}
          className="w-full h-32 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Soft bottom-to-top gradient blending into white content below */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        {/* Floating Glass Pills Over Header Image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {/* Left Pill: Distance [📍 1.2 km] */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 text-xs font-semibold text-green-900 shadow-sm font-mono pointer-events-auto">
            <MapPin className="w-3.5 h-3.5 text-green-700" />
            <span>{partner.distance.split(' ')[0]} km</span>
          </div>

          {/* Right Pills: Rating [⭐ 4.9] & Highlight Badge */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {partner.highlightBadge && (
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-600/90 backdrop-blur-md text-white text-[10px] font-bold shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-lime-200" />
                <span className="hidden sm:inline">{partner.highlightBadge}</span>
              </div>
            )}
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/80 text-xs font-bold text-ink-900 shadow-sm font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{partner.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. PROFILE CONTENT (Overlapping Avatar, Name & Metadata)
          ===================================================================== */}
      <div className="px-5 pb-5 pt-0 space-y-4">
        {/* Overlapping Avatar Row */}
        <div className="flex items-end justify-between -mt-8 relative z-10">
          {/* Logo / Avatar with thick white border */}
          <div
            className={`w-14 h-14 rounded-2xl ring-4 ring-white shadow-sm flex items-center justify-center font-mono font-bold text-base shrink-0 relative overflow-hidden transition-transform duration-300 group-hover:scale-105 ${partner.avatarBg} ${partner.avatarColor} border border-mint-200/80`}
          >
            <span>{partner.avatarText}</span>
            {/* Live active dot */}
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-white" />
          </div>

          {/* Partner Type Chip */}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${partner.typeBadgeColor} font-jakarta shadow-2xs`}
          >
            {partner.type}
          </span>
        </div>

        {/* Partner Name & Location Strip */}
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-ink-900 font-bold text-lg font-jakarta tracking-tight group-hover:text-green-700 transition-colors truncate">
              {partner.name}
            </h3>
            {partner.verified && (
              <span title="Mitra SNI Terverifikasi ELOVIA" className="inline-flex items-center text-green-600 shrink-0">
                <ShieldCheck className="w-4 h-4 fill-mint-100 text-green-600" />
              </span>
            )}
          </div>
          <p className="text-xs text-ink-600 font-jakarta mt-0.5 line-clamp-1">
            {partner.area} · {partner.tagline}
          </p>
        </div>

        {/* ===================================================================
            3. REFINED PRICE AREA: Large JetBrains Mono in bg-mint-50/50 container
            =================================================================== */}
        <div className="bg-mint-50/50 rounded-xl p-3 border border-mint-200/60 space-y-1 transition-colors group-hover:border-mint-200">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-green-800 border border-mint-200 font-jakarta shadow-2xs">
              {partner.priceTierBadge}
            </span>
            <span className="text-[10px] text-ink-500 font-mono">
              {partner.updatedAt}
            </span>
          </div>

          <div className="font-mono text-xl text-green-700 font-extrabold tracking-tight">
            {partner.indicativePrice}
          </div>

          <p className="text-[11px] text-ink-600 font-jakarta truncate" title={partner.priceDetail}>
            {partner.priceDetail}
          </p>
        </div>

        {/* ===================================================================
            4. REFINED MATERIAL TAGS & SERVICE METHODS
            - Material Tags: Clean solid chips (bg-ink-100 text-ink-800 text-xs px-2.5 py-1 rounded-full)
            =================================================================== */}
        <div className="space-y-2">
          {/* Material Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {partner.acceptedMaterials.map((mat, idx) => (
              <span
                key={idx}
                className="bg-ink-100 text-ink-800 text-xs px-2.5 py-1 rounded-full font-medium font-jakarta transition-colors group-hover:bg-mint-100 group-hover:text-green-900"
              >
                {mat.name}
              </span>
            ))}
          </div>

          {/* Methods & Hours Row */}
          <div className="flex items-center gap-2 pt-1 text-xs text-ink-600 font-jakarta">
            {partner.handoverMethods.includes('pickup') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-mint-100/70 text-green-800 text-[11px] font-semibold">
                <Truck className="w-3 h-3 text-green-700" />
                Pickup
              </span>
            )}
            {partner.handoverMethods.includes('dropoff') && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#DDF3F1]/80 text-[#0E7C7B] text-[11px] font-semibold">
                <Building className="w-3 h-3 text-[#0E7C7B]" />
                Drop-off
              </span>
            )}
            <span className="text-[11px] text-ink-500 font-mono ml-auto truncate">
              {partner.operatingHours.split('·')[0]}
            </span>
          </div>
        </div>

        {/* ===================================================================
            5. PROMINENT ACTION BUTTON: Wide 'Pilih Mitra' CTA + Detail link
            =================================================================== */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(partner);
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md text-center flex items-center justify-center gap-2 font-jakarta text-sm cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Pilih Mitra</span>
          </button>

          {onViewDetail && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(partner);
              }}
              className="w-full py-1 text-center text-xs font-semibold text-ink-600 hover:text-green-700 transition-colors cursor-pointer font-jakarta flex items-center justify-center gap-1"
            >
              <span>Lihat Detail &amp; Jam Operasional</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
