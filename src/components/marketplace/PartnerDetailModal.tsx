'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  MapPin,
  Star,
  Clock,
  Phone,
  Truck,
  Building,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import type { PartnerItem } from './partnerData';

interface PartnerDetailModalProps {
  partner: PartnerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPartner: (partner: PartnerItem) => void;
}

export function PartnerDetailModal({
  partner,
  isOpen,
  onClose,
  onSelectPartner,
}: PartnerDetailModalProps) {
  if (!partner) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F1F17]/50 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-2xl p-6 sm:p-7 overflow-hidden z-10"
          >
            {/* Modal Header Visual Banner */}
            {partner.headerImage && (
              <div className="relative -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 h-32 overflow-hidden mb-5">
                <img
                  src={partner.headerImage}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
              </div>
            )}

            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-600 to-teal-400" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-ink-500 hover:text-ink-900 hover:bg-mint-100/60 transition-colors"
              aria-label="Tutup dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-5 pt-1">
              <div
                className={`w-14 h-14 rounded-2xl ${partner.avatarBg} ${partner.avatarBorder} border flex items-center justify-center ${partner.avatarColor} font-mono font-bold text-lg shadow-sm shrink-0`}
              >
                <span>{partner.avatarText}</span>
              </div>
              <div className="min-w-0 pr-8">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-jakarta font-bold text-lg sm:text-xl text-ink-900 tracking-tight">
                    {partner.name}
                  </h3>
                  {partner.verified && (
                    <span
                      title="Mitra SNI Terverifikasi ELOVIA"
                      className="inline-flex items-center text-green-700"
                    >
                      <ShieldCheck className="w-4 h-4 fill-mint-100 text-green-700" />
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-600 flex-wrap">
                  <span className="inline-flex items-center gap-1 font-mono text-green-800 bg-mint-100/60 px-2 py-0.5 rounded-full font-medium">
                    <MapPin className="w-3 h-3 text-green-700" />
                    {partner.distance}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-ink-900 font-semibold font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {partner.rating.toFixed(2)} ({partner.reviewsCount} ulasan)
                  </span>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-sm text-ink-700 font-jakarta leading-relaxed mb-5 bg-[#F4FAF6] p-3 rounded-xl border border-mint-200/70">
              &ldquo;{partner.tagline}&rdquo;
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5 text-xs font-jakarta">
              <div className="p-3 rounded-xl bg-white border border-mint-200/80 space-y-1">
                <div className="text-[10px] uppercase font-semibold text-ink-500 tracking-wider">
                  Harga Acuan Mitra
                </div>
                <div className="font-mono text-base font-bold text-green-800">
                  {partner.indicativePrice}
                </div>
                <div className="text-[11px] text-ink-600 truncate">{partner.priceDetail}</div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-mint-200/80 space-y-1">
                <div className="text-[10px] uppercase font-semibold text-ink-500 tracking-wider">
                  Tier Insentif
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-mint-100 text-green-800">
                  {partner.priceTierBadge}
                </div>
                <div className="text-[11px] text-ink-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-green-600" /> {partner.updatedAt}
                </div>
              </div>
            </div>

            {/* Accepted Materials */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-ink-600 uppercase tracking-wider mb-2 font-jakarta">
                Material Diterima
              </div>
              <div className="flex flex-wrap gap-2">
                {partner.acceptedMaterials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-mint-50 border border-mint-200 text-xs font-medium text-ink-900"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                    {mat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Address & Operational Hours */}
            <div className="space-y-2 mb-6 text-xs text-ink-700 font-jakarta bg-white/70 p-3.5 rounded-xl border border-mint-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>{partner.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-700 shrink-0" />
                <span>{partner.operatingHours}</span>
              </div>
              {partner.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-700 shrink-0" />
                  <span className="font-mono">{partner.phone}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-mint-200/70">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-mint-200 text-ink-800 hover:bg-mint-50 text-xs font-semibold font-jakarta transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPartner(partner);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold font-jakarta shadow-md shadow-green-600/20 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Pilih Mitra Ini</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

