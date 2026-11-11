'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  FilterX,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ChevronUp,
} from 'lucide-react';
import type { PartnerItem } from './partnerData';

interface FloatingPartnerListingsProps {
  partners: PartnerItem[];
  hoveredPartnerId: string | null;
  onHoverPartner: (id: string | null) => void;
  selectedPartnerId?: string | null;
  onSelectPartner: (partner: PartnerItem) => void;
  onViewDetail: (partner: PartnerItem) => void;
  className?: string;
}

type CategoryTab = 'semua' | 'bank_sampah' | 'mitra_daur_ulang' | 'pengepul';

export function FloatingPartnerListings({
  partners,
  hoveredPartnerId,
  onHoverPartner,
  selectedPartnerId,
  onSelectPartner,
  onViewDetail,
  className = '',
}: FloatingPartnerListingsProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>('semua');
  const [searchFilter, setSearchFilter] = useState('');
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Filtered partners based on tab and quick search
  const displayedPartners = useMemo(() => {
    return partners.filter((p) => {
      if (activeTab !== 'semua' && p.typeSlug !== activeTab) {
        return false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.acceptedMaterials.some((m) => m.name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [partners, activeTab, searchFilter]);

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(232, 245, 236, 0.4);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.35);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.6);
        }
      `}</style>

      {/* =====================================================================
          1. DESKTOP FLOATING PANEL (Visible only on lg: screens and up)
          ===================================================================== */}
      <aside
        className={`hidden lg:flex absolute top-6 right-6 z-20 w-96 max-h-[calc(100vh-16rem)] flex-col bg-white/80 backdrop-blur-2xl rounded-3xl p-5 border border-white/60 shadow-xl overflow-hidden font-jakarta pointer-events-auto ${className}`}
      >
        {/* Header with Stats & Search (Non-scrolling fixed header) */}
        <div className="shrink-0 space-y-3 pb-3 border-b border-mint-200/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <h3 className="font-bold text-sm text-ink-900 tracking-tight font-jakarta truncate">
                Mitra Daur Ulang Pilihan
              </h3>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-mint-100 text-green-800 text-[11px] font-mono font-bold border border-mint-200 shrink-0">
              {displayedPartners.length} Mitra
            </span>
          </div>

          {/* Quick Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-ink-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari mitra, kota, atau material..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/90 border border-mint-200/80 text-xs text-ink-900 placeholder:text-ink-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 transition-all font-jakarta shadow-2xs"
            />
          </div>

          {/* Category Tabs Pill Bar */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5 text-[11px]">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'bank_sampah', label: 'Bank Sampah' },
              { id: 'mitra_daur_ulang', label: 'Industri Sirkular' },
              { id: 'pengepul', label: 'Pengepul' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CategoryTab)}
                className={`px-2.5 py-1 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-2xs font-semibold'
                    : 'text-ink-600 hover:text-green-800 hover:bg-mint-100/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Partner List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar min-h-0 pt-3">
          {displayedPartners.length > 0 ? (
            displayedPartners.map((partner) => {
              const isHovered = hoveredPartnerId === partner.id;
              const isSelected = selectedPartnerId === partner.id;

              return (
                <motion.div
                  key={partner.id}
                  id={`partner-list-item-${partner.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => onHoverPartner(partner.id)}
                  onMouseLeave={() => onHoverPartner(null)}
                  onClick={() => onSelectPartner(partner)}
                  className={`p-3 rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isHovered || isSelected
                      ? 'bg-white/95 border-emerald-400 shadow-md ring-2 ring-emerald-400/40 scale-[1.01]'
                      : 'bg-white/60 hover:bg-white/90 border-white/80 hover:border-mint-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2.5 min-w-0">
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-white/80 ring-1 ring-mint-100 bg-mint-100">
                        <img
                          src={partner.headerImage}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {partner.verified && (
                          <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-0.5">
                        <div className="flex items-center gap-1 min-w-0">
                          <h4
                            className="font-bold text-xs text-ink-900 truncate font-jakarta"
                            title={partner.name}
                          >
                            {partner.name}
                          </h4>
                          {partner.verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-green-600 fill-mint-100 shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-ink-600 font-jakarta">
                          <span className="font-mono text-green-800 font-bold shrink-0">
                            {partner.distance.split(' ')[0]} km
                          </span>
                          <span className="text-ink-300">·</span>
                          <span className="truncate">{partner.area.split(',')[0]}</span>
                        </div>

                        {/* Indicative Price Badge */}
                        <div className="flex items-center justify-between min-w-0">
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mint-100/90 border border-mint-200/80 text-[10px] font-mono font-bold text-green-800 shadow-[0_0_8px_rgba(34,197,94,0.15)] max-w-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            <span className="truncate whitespace-nowrap">{partner.indicativePrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="shrink-0 flex flex-col items-end justify-center gap-1 pl-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPartner(partner);
                        }}
                        className="w-16 py-1.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold font-jakarta shadow-2xs shadow-green-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center"
                      >
                        Pilih
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetail(partner);
                        }}
                        className="w-16 py-0.5 text-center text-[10px] text-ink-500 hover:text-green-700 font-semibold font-jakarta transition-colors cursor-pointer"
                      >
                        Detail →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center text-xs text-ink-500 space-y-2">
              <FilterX className="w-6 h-6 mx-auto text-ink-400" />
              <p>Tidak ada mitra pada kategori ini.</p>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="shrink-0 pt-2 mt-2 border-t border-mint-200/60 text-center text-[10px] text-ink-500 font-mono">
          💡 Sorot mitra untuk manuver kamera globe otomatis
        </div>
      </aside>

      {/* =====================================================================
          2. MOBILE TAP-TO-DISMISS BACKDROP (Active when bottom sheet expanded)
          ===================================================================== */}
      <AnimatePresence>
        {isMobileExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileExpanded(false)}
            className="block lg:hidden fixed inset-0 z-25 bg-slate-950/40 backdrop-blur-[2px]"
            aria-label="Tutup daftar mitra"
          />
        )}
      </AnimatePresence>

      {/* =====================================================================
          3. DEDICATED MOBILE BOTTOM SHEET (Visible on < lg screens)
             - Peek state: h-[220px]
             - Expanded state: h-[80dvh]
             - Draggable & Tap-to-expand
          ===================================================================== */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.2 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          if (info.offset.y < -35 || info.velocity.y < -250) {
            setIsMobileExpanded(true);
          } else if (info.offset.y > 35 || info.velocity.y > 250) {
            setIsMobileExpanded(false);
          }
        }}
        className={`block lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-2xl border-t border-white/80 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col pointer-events-auto font-jakarta select-none ${
          isDragging ? '' : 'transition-all duration-300'
        } ${isMobileExpanded ? 'h-[80dvh]' : 'h-[220px]'}`}
      >
        {/* Top Drag Bar Handle */}
        <div
          onClick={() => setIsMobileExpanded((prev) => !prev)}
          className="w-full pt-2.5 pb-1 cursor-grab active:cursor-grabbing flex flex-col items-center shrink-0"
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3" />
        </div>

        {/* Header Bar */}
        <div
          onClick={() => setIsMobileExpanded((prev) => !prev)}
          className="flex items-center justify-between px-5 pb-2.5 cursor-pointer shrink-0"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <h3 className="font-bold text-sm text-slate-900 tracking-tight font-jakarta truncate">
              Mitra Daur Ulang Pilihan
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-mono font-bold border border-emerald-200/80">
              {displayedPartners.length} Mitra
            </span>
            <button
              type="button"
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={isMobileExpanded ? 'Tutup daftar mitra' : 'Buka daftar mitra'}
            >
              <ChevronUp
                className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${
                  isMobileExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Search & Category Pills Filter Bar */}
        <div className="px-5 pb-3 space-y-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              onFocus={() => setIsMobileExpanded(true)}
              placeholder="Cari mitra, kota, atau material..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all font-jakarta shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
            {[
              { id: 'semua', label: 'Semua' },
              { id: 'bank_sampah', label: 'Bank Sampah' },
              { id: 'mitra_daur_ulang', label: 'Industri Sirkular' },
              { id: 'pengepul', label: 'Pengepul' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CategoryTab)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 bg-white/70 border border-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Compact Partner Cards List */}
        <div className="flex-1 overflow-y-auto px-5 pb-8 custom-scrollbar min-h-0 space-y-3">
          {displayedPartners.length > 0 ? (
            displayedPartners.map((partner) => {
              const isHovered = hoveredPartnerId === partner.id;
              const isSelected = selectedPartnerId === partner.id;

              return (
                <div
                  key={partner.id}
                  id={`mobile-partner-item-${partner.id}`}
                  onClick={() => {
                    onHoverPartner(partner.id);
                    onSelectPartner(partner);
                  }}
                  className={`flex items-center justify-between p-3.5 bg-white/70 backdrop-blur-md rounded-2xl border transition-all duration-200 cursor-pointer mb-3 ${
                    isHovered || isSelected
                      ? 'border-emerald-500 bg-white shadow-md ring-2 ring-emerald-500/30'
                      : 'border-slate-100 shadow-sm hover:bg-white/90'
                  }`}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-white/80 bg-mint-100">
                      <img
                        src={partner.headerImage || '/images/Marketplace/Aerial Recycling Plant.jpeg'}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {partner.verified && (
                        <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-1 min-w-0">
                        <h4
                          className="font-bold text-xs text-slate-900 truncate font-jakarta"
                          title={partner.name}
                        >
                          {partner.name}
                        </h4>
                        {partner.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-mint-100 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-jakarta">
                        <span className="inline-flex items-center gap-0.5 font-mono text-emerald-800 font-bold shrink-0">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          {partner.distance.split(' ')[0]} km
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="truncate">{partner.area.split(',')[0]}</span>
                      </div>

                      {/* Clean Indicative Price Badge */}
                      <div className="flex items-center justify-between min-w-0 pt-0.5">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono font-bold text-emerald-800 max-w-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="truncate whitespace-nowrap">{partner.indicativePrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Clean Green Action Button ("Pilih" / "Detail ->") */}
                  <div className="shrink-0 flex flex-col items-end justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPartner(partner);
                      }}
                      className="w-16 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-jakarta shadow-2xs transition-all active:scale-95 cursor-pointer text-center"
                    >
                      Pilih
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(partner);
                      }}
                      className="w-16 text-center text-[10px] text-slate-500 hover:text-emerald-700 font-semibold font-jakarta transition-colors cursor-pointer"
                    >
                      Detail →
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 px-4 text-center text-xs text-slate-500 space-y-2">
              <FilterX className="w-6 h-6 mx-auto text-slate-400" />
              <p>Tidak ada mitra pada kategori ini.</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
