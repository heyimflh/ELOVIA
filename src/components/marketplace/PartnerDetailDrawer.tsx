'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Navigation,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  Package,
  Layers,
  Phone,
} from 'lucide-react';
import type { PartnerItem, PriceCatalogItem } from './partnerData';

interface PartnerDetailDrawerProps {
  partner: PartnerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPartner: (partner: PartnerItem) => void;
}

// Crisp, dedicated SVG icons for material categories
function MaterialIcon({ category, name }: { category: string; name: string }) {
  const lowerName = name.toLowerCase();

  // Glass item
  if (category === 'glass' || lowerName.includes('kaca') || lowerName.includes('beling')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100/80 text-teal-700 flex items-center justify-center shrink-0 shadow-2xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M8 2h8" />
          <path d="M9 2v3a4 4 0 0 1-.8 2.4L7 9a6 6 0 0 0-1 3.3V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7.7a6 6 0 0 0-1-3.3L15.8 7.4A4 4 0 0 1 15 5V2" />
          <line x1="6" y1="14" x2="18" y2="14" />
        </svg>
      </div>
    );
  }

  // Metal item
  if (
    category === 'metal' ||
    lowerName.includes('logam') ||
    lowerName.includes('kaleng') ||
    lowerName.includes('aluminium') ||
    lowerName.includes('tembaga') ||
    lowerName.includes('besi')
  ) {
    return (
      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      </div>
    );
  }

  // Paper / Cardboard item
  if (
    category === 'paper' ||
    lowerName.includes('kertas') ||
    lowerName.includes('kardus') ||
    lowerName.includes('hvs') ||
    lowerName.includes('arsip') ||
    lowerName.includes('buku')
  ) {
    return (
      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/80 text-orange-700 flex items-center justify-center shrink-0 shadow-2xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      </div>
    );
  }

  // Default / Plastic Bottle (PET/HDPE/PP)
  return (
    <div className="w-10 h-10 rounded-xl bg-mint-100 border border-mint-200/80 text-green-700 flex items-center justify-center shrink-0 shadow-2xs">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M10 2h4" />
        <path d="M10 2v3a2 2 0 0 1-.6 1.4L8.5 7.3A3 3 0 0 0 7.5 9.5V20a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9.5a3 3 0 0 0-1-2.2l-.9-.9A2 2 0 0 1 14 5V2" />
        <line x1="7.5" y1="13" x2="16.5" y2="13" />
      </svg>
    </div>
  );
}

// WhatsApp Icon component
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function PartnerDetailDrawer({
  partner,
  isOpen,
  onClose,
  onSelectPartner,
}: PartnerDetailDrawerProps) {
  // Lock body scroll and register escape key listener when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle WhatsApp inquiry
  const handleTanyaMitra = useCallback(() => {
    if (!partner) return;
    const phone = partner.phone ? partner.phone.replace(/[^0-9]/g, '') : '6281288901122';
    const text = encodeURIComponent(
      `Halo ${partner.name}, saya melihat profil Anda di ELOVIA dan tertarik untuk menyalurkan material terpilah.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }, [partner]);

  if (!partner) return null;

  // Fallback high-res facility header image
  const headerImage =
    partner.headerImage || '/images/Marketplace/Aerial Recycling Plant.jpeg';

  // Fallback price catalog if not provided
  const priceCatalog: PriceCatalogItem[] = partner.priceCatalog && partner.priceCatalog.length > 0
    ? partner.priceCatalog
    : [
        {
          id: 'fb-1',
          name: 'Botol PET Bening',
          category: 'plastic',
          price: 'Rp 3.200 /kg',
          priceNumeric: 3200,
          unit: '/kg',
          grade: 'Bersih & Tanpa Label',
        },
        {
          id: 'fb-2',
          name: 'Kardus Box Corrugated',
          category: 'paper',
          price: 'Rp 2.400 /kg',
          priceNumeric: 2400,
          unit: '/kg',
          grade: 'Kering & Terlipat Rapi',
        },
        {
          id: 'fb-3',
          name: 'Kaleng Minuman Aluminium',
          category: 'metal',
          price: 'Rp 14.500 /kg',
          priceNumeric: 14500,
          unit: '/kg',
          grade: 'Press Pipih & Kering',
        },
        {
          id: 'fb-4',
          name: 'Gelas Plastik PP Bening',
          category: 'plastic',
          price: 'Rp 2.800 /kg',
          priceNumeric: 2800,
          unit: '/kg',
          grade: 'Bebas Seal Penutup',
        },
      ];

  const pickupRadius = partner.pickupRadius || '15 km';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* =================================================================
              1. BACKDROP OVERLAY
              Fixed inset-0 bg-black/30 backdrop-blur-md z-40. Opacity 0 -> 1
              ================================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-40"
            aria-hidden="true"
          />

          {/* =================================================================
              2. DRAWER CONTAINER (GLIDES IN FROM RIGHT EDGE)
              Slide in from { x: "100%" } to { x: 0 } with smooth spring:
              type: "spring", bounce: 0, duration: 0.6
              ================================================================= */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Detail Mitra ${partner.name}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className="fixed top-0 right-0 w-full max-w-2xl h-screen bg-white/90 backdrop-blur-3xl shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-50 overflow-y-auto custom-scrollbar rounded-l-[2.5rem] flex flex-col justify-between"
          >
            {/* Inner Content Wrapper */}
            <div className="flex-1">
              {/* ===============================================================
                  CINEMATIC HEADER (Edge-to-Edge Visuals)
                  =============================================================== */}
              <div className="relative w-full h-72 shrink-0">
                {/* Floating Glass Circular Close 'X' Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup Detail Mitra"
                  className="absolute top-6 left-6 z-20 bg-white/50 backdrop-blur-md hover:bg-white text-ink-900 p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/60"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* High-res Facility Header Image (takes up top 30% of drawer) */}
                <img
                  src={headerImage}
                  alt={`Fasilitas ${partner.name}`}
                  className="w-full h-72 object-cover relative select-none"
                  loading="eager"
                />

                {/* Gradient Fade: blends perfectly into the white content area below */}
                <div className="bg-gradient-to-t from-white via-white/80 to-transparent absolute inset-0 pointer-events-none" />

                {/* Avatar & Verification: overlaps the bottom edge of the header image */}
                <div className="absolute -bottom-8 left-8 flex items-end gap-4 z-10 pointer-events-auto">
                  {/* Avatar Container with ring & shadow */}
                  <div className="relative">
                    <div
                      className={`w-24 h-24 rounded-3xl object-cover ring-4 ring-white bg-mint-50 shadow-lg flex items-center justify-center ${partner.avatarBorder || 'border-mint-200'} border overflow-hidden`}
                    >
                      {partner.avatarImage ? (
                        <img
                          src={partner.avatarImage}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full ${partner.avatarBg || 'bg-mint-100'} ${partner.avatarColor || 'text-green-700'} flex flex-col items-center justify-center font-mono font-black text-2xl tracking-tighter`}
                        >
                          <span>{partner.avatarText || partner.name.slice(0, 3).toUpperCase()}</span>
                          <span className="text-[9px] uppercase tracking-widest font-jakarta font-semibold opacity-70 mt-0.5">
                            Mitra
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Floating Green Verified Check Dot on Avatar */}
                    {partner.verified && (
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Floating 'SNI Terpadu' Green Check Pill attached to avatar */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md tracking-tight border border-emerald-500/80 mb-1 select-none">
                    <CheckCircle2 className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
                    <span>SNI Terpadu</span>
                  </div>
                </div>
              </div>

              {/* ===============================================================
                  PARTNER PROFILE & INFO HUB (Body)
                  Container: px-8 pt-12 pb-32 flex flex-col gap-8
                  =============================================================== */}
              <div className="px-8 pt-12 pb-32 flex flex-col gap-8 font-jakarta">
                {/* 1. Title Area */}
                <div className="space-y-3">
                  {/* Partner Category Tag */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${partner.typeBadgeColor || 'bg-mint-100 text-green-800 border-mint-200'}`}
                    >
                      {partner.type}
                    </span>
                    {partner.highlightBadge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-100/90 text-green-900 text-[11px] font-semibold border border-lime-200">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{partner.highlightBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Partner Name in 'Fraunces' font, text-4xl font-black text-ink-900 leading-tight */}
                  <h1 className="font-fraunces text-3xl sm:text-4xl font-black text-ink-900 leading-tight tracking-tight">
                    {partner.name}
                  </h1>

                  {/* Tagline / Mission */}
                  {partner.tagline && (
                    <p className="text-sm text-ink-600 leading-relaxed font-normal">
                      {partner.tagline}
                    </p>
                  )}

                  {/* Meta Info: A row of elegant pills ([⭐ 4.9 Rating], [📍 1.8 km - Kebumen], [🕒 Senin-Sabtu: 08.00-16.00]) */}
                  <div className="flex items-center gap-2.5 flex-wrap pt-1">
                    {/* [⭐ 4.9 Rating] */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50/90 border border-amber-200/70 text-ink-900 text-xs font-bold font-mono shadow-2xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{partner.rating.toFixed(1)} Rating</span>
                      <span className="text-[10px] text-ink-400 font-normal">
                        ({partner.reviewsCount} ulasan)
                      </span>
                    </div>

                    {/* [📍 1.8 km - Kebumen] */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-mint-50/90 border border-mint-200 text-green-900 text-xs font-bold font-mono shadow-2xs">
                      <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span>{partner.distance}</span>
                    </div>

                    {/* [🕒 Senin-Sabtu: 08.00-16.00] */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50/80 border border-teal-200/60 text-teal-900 text-xs font-semibold font-mono shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span>{partner.operatingHours}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Address & Radius Box */}
                {/* A small soft-gray box (bg-ink-50 rounded-2xl p-4) containing the full address and note */}
                <div className="bg-ink-50 rounded-2xl p-4.5 border border-ink-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-green-700 shadow-2xs shrink-0 mt-0.5 border border-mint-100">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-ink-500 font-mono">
                        Lokasi Sentra
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-ink-900 leading-snug">
                        {partner.address}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-mint-200/80 text-green-800 text-xs font-semibold shrink-0 shadow-2xs self-start sm:self-auto font-mono">
                    <Navigation className="w-3.5 h-3.5 text-green-600 shrink-0" />
                    <span>Layanan Penjemputan hingga radius {pickupRadius}</span>
                  </div>
                </div>

                {/* 3. The Price Catalog (Ban Generic Tables) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-ink-900 tracking-tight font-jakarta">
                      Katalog Harga Beli Material
                    </h2>
                    <span className="text-xs text-ink-500 font-mono">
                      {partner.updatedAt}
                    </span>
                  </div>

                  {/* Grid: grid grid-cols-1 md:grid-cols-2 gap-3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {priceCatalog.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-mint-100 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-md hover:border-mint-200 transition-all group"
                      >
                        {/* Left: Icon + Material Name & Grade */}
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <MaterialIcon category={item.category} name={item.name} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h3
                                className="font-bold text-xs sm:text-sm text-ink-900 truncate font-jakarta group-hover:text-green-800 transition-colors"
                                title={item.name}
                              >
                                {item.name}
                              </h3>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded-md bg-mint-100 text-green-800 text-[9px] font-bold shrink-0">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.grade ? (
                              <p className="text-[11px] text-ink-500 truncate mt-0.5">
                                {item.grade}
                              </p>
                            ) : (
                              <p className="text-[11px] text-ink-400 capitalize truncate mt-0.5">
                                Kategori {item.category}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Price in 'JetBrains Mono' font text-green-700 font-bold text-lg */}
                        <div className="text-right shrink-0 pl-1">
                          <span className="font-mono font-bold text-base sm:text-lg text-green-700 tracking-tight whitespace-nowrap block">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Terms & Requirements Box */}
                {/* Beautifully styled alert box: bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-4 text-orange-900 */}
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 flex gap-4 text-orange-900 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0 border border-orange-200/80">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                    <div className="font-bold text-orange-950 flex items-center gap-1.5">
                      <span>Ketentuan Penyerahan Material</span>
                    </div>
                    <p className="text-orange-900/90 font-medium">
                      Minimal berat 10 kg untuk layanan penjemputan (Pickup). Jika
                      kurang, silakan gunakan opsi Antar Sendiri (Drop-off).
                    </p>
                  </div>
                </div>

                {/* Operational Info Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white border border-mint-100/90 shadow-2xs space-y-1">
                    <span className="text-[10px] text-ink-400 uppercase font-mono font-bold block">
                      Metode Serah
                    </span>
                    <span className="text-xs font-bold text-ink-900">
                      {partner.handoverMethods.includes('pickup') &&
                      partner.handoverMethods.includes('dropoff')
                        ? 'Jemput & Antar'
                        : partner.handoverMethods.includes('pickup')
                        ? 'Jemput Langsung'
                        : 'Antar Sendiri'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-mint-100/90 shadow-2xs space-y-1">
                    <span className="text-[10px] text-ink-400 uppercase font-mono font-bold block">
                      Status Legalitas
                    </span>
                    <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      SNI Terverifikasi
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white border border-mint-100/90 shadow-2xs space-y-1">
                    <span className="text-[10px] text-ink-400 uppercase font-mono font-bold block">
                      Timbangan
                    </span>
                    <span className="text-xs font-bold text-ink-900">
                      Digital Kalibrasi BMKG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================================
                5. STICKY GLASS CTA FOOTER (Always Accessible)
                Container: sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl
                border-t border-white/60 p-6 z-20 shadow-[0_-10px_40px_rgba(23,122,71,0.05)]
                flex justify-between items-center rounded-bl-[2.5rem]
                ================================================================= */}
            <div className="sticky bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/60 p-5 sm:p-6 z-20 shadow-[0_-10px_40px_rgba(23,122,71,0.05)] flex items-center justify-between gap-3 sm:gap-4 rounded-bl-[2.5rem]">
              {/* Secondary CTA: Outline button "Tanya Mitra" (WhatsApp icon) */}
              <button
                type="button"
                onClick={handleTanyaMitra}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl border border-mint-200/90 hover:border-green-600 bg-white/90 hover:bg-mint-50/70 text-ink-800 hover:text-green-800 font-bold text-sm sm:text-base transition-all shadow-2xs hover:shadow-sm cursor-pointer shrink-0 font-jakarta group"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Tanya Mitra</span>
              </button>

              {/* Primary CTA: Massive, glowing green button */}
              {/* bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_8px_25px_rgba(22,163,74,0.3)] hover:-translate-y-0.5 transition-all */}
              <button
                type="button"
                onClick={() => {
                  onSelectPartner(partner);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold text-base sm:text-lg px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-[0_8px_25px_rgba(22,163,74,0.3)] hover:shadow-[0_12px_32px_rgba(22,163,74,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer font-jakarta text-center tracking-tight"
              >
                <span className="truncate">Pilih & Salurkan ke Mitra Ini</span>
                <span className="text-xl leading-none">↗</span>
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

