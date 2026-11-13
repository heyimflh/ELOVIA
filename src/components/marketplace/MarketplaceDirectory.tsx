'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  RotateCw,
  Compass,
  Sparkles,
  MapPin,
  Building,
  CheckCircle2,
  Check,
  TrendingUp,
  Activity,
  Globe,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { MarketplaceHeader } from './MarketplaceHeader';
import { MarketplaceTransitionBridge } from './MarketplaceTransitionBridge';
import { TrustQualityBanner } from './TrustQualityBanner';
import { PartnerDetailDrawer } from './PartnerDetailDrawer';
import { FloatingPartnerListings } from './FloatingPartnerListings';
import { FacilitySlideshow, type SlideItem } from './FacilitySlideshow';
import { PARTNERS_DATA, type PartnerItem } from './partnerData';
import { useMarketplaceFilters } from './useMarketplaceFilters';

// Dynamic SSR-safe import for MapLibre 3D Globe
const MapLibreGlobe = dynamic(() => import('./MapLibreGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
      <div className="w-16 h-16 rounded-3xl bg-mint-950/80 flex items-center justify-center text-green-400 mb-4 animate-pulse border border-green-800/60">
        <Sparkles className="w-8 h-8 animate-spin text-green-400" />
      </div>
      <p className="font-jakarta text-sm font-bold text-white">
        Memuat 3D Interactive Globe ELOVIA...
      </p>
      <span className="text-xs text-green-300/80 font-mono mt-1">
        Menghubungkan jaringan sentra sirkular Nusantara
      </span>
    </div>
  ),
});

interface MarketplaceDirectoryProps {
  initialSlug?: string;
}

export function MarketplaceDirectory({ initialSlug }: MarketplaceDirectoryProps = {}) {
  const {
    filters,
    searchQuery,
    selectedCategory,
    selectedMethod,
    isVerifiedOnly,
    setSearchQuery,
    setSelectedCategory,
    setSelectedMethod,
    setIsVerifiedOnly,
    resetFilters,
    filterPartners,
  } = useMarketplaceFilters();

  // Find initial partner if initialSlug is passed
  const initialPartner = useMemo(() => {
    if (!initialSlug) return null;
    return PARTNERS_DATA.find((p) => p.slug === initialSlug) || null;
  }, [initialSlug]);

  // Two-way interactive state binding
  const [hoveredPartnerId, setHoveredPartnerId] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(Boolean(initialPartner));
  const [drawerPartner, setDrawerPartner] = useState<PartnerItem | null>(initialPartner);
  const [autoSpinEnabled, setAutoSpinEnabled] = useState(true);

  // Selection confirmation toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/pasar\/([^/]+)/);
      if (match && match[1]) {
        const found = PARTNERS_DATA.find((item) => item.slug === match[1]);
        if (found) {
          setDrawerPartner(found);
          setDrawerOpen(true);
          return;
        }
      }
      if (pathname === '/pasar') {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter partners based on active criteria
  const filteredPartners = useMemo(() => {
    return filterPartners(PARTNERS_DATA);
  }, [filterPartners]);

  // Handle partner selection
  const handleSelectPartner = useCallback((partner: PartnerItem) => {
    setSelectedPartner(partner);
    setToastMessage(`Mitra "${partner.name}" berhasil dipilih!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  }, []);

  // Handle opening partner detail drawer (and sync URL)
  const handleViewDetail = useCallback((partner: PartnerItem) => {
    setDrawerPartner(partner);
    setDrawerOpen(true);
    if (typeof window !== 'undefined' && window.location.pathname !== `/pasar/${partner.slug}`) {
      window.history.pushState(null, '', `/pasar/${partner.slug}`);
    }
  }, []);

  // Handle closing partner detail drawer (and restore URL)
  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/pasar/')) {
      window.history.pushState(null, '', '/pasar');
    }
  }, []);

  // Handle hover from globe marker to scroll listing item into view
  const handleHoverPartnerFromGlobe = useCallback((id: string | null) => {
    setHoveredPartnerId(id);
    if (id && typeof window !== 'undefined') {
      const itemElement = document.getElementById(`partner-list-item-${id}`);
      if (itemElement) {
        itemElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, []);

  // Handle clicking slideshow item
  const handleSelectSlide = useCallback((slide: SlideItem) => {
    setHoveredPartnerId(slide.partnerId);
    const partner = PARTNERS_DATA.find((p) => p.id === slide.partnerId);
    if (partner) {
      setSelectedPartner(partner);
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F6FAF7] relative">
      {/* =====================================================================
          1. DESKTOP-ONLY HEADER & SMART SEARCH / FILTER SECTION
          ===================================================================== */}
      <div className="hidden lg:block">
        <MarketplaceHeader
          filters={filters}
          onFilterChange={(newFilters) => {
            setSearchQuery(newFilters.searchQuery);
            setSelectedCategory(newFilters.selectedCategory);
            setSelectedMethod(newFilters.selectedMethod);
            setIsVerifiedOnly(newFilters.isVerifiedOnly);
          }}
          targetSectionId="marketplace-bridge-view"
        />
      </div>

      {/* =====================================================================
          2. HERO SECTION / CINEMATIC TRANSITION BRIDGE
          Cleanly rendered at the top of the mobile page with typography:
          "Setiap Material Memiliki Nilai Baru."
          ===================================================================== */}
      <MarketplaceTransitionBridge />

      {/* =====================================================================
          3. SCOPED 3D INTERACTIVE GLOBE SECTION
          Container: relative w-full h-[85dvh] lg:h-screen overflow-hidden bg-slate-900
          Boundary for all scoped absolute controls and the mobile bottom sheet
          ===================================================================== */}
      <section
        id="marketplace-globe-view"
        suppressHydrationWarning
        className="relative w-full h-[85dvh] lg:h-screen overflow-hidden bg-slate-900"
      >
        {/* ===================================================================
            A. BASE LAYER: MapLibre GL JS 3D Satellite Globe Canvas
            =================================================================== */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <MapLibreGlobe
            partners={filteredPartners}
            hoveredPartnerId={hoveredPartnerId}
            onHoverPartner={handleHoverPartnerFromGlobe}
            selectedPartnerId={selectedPartner?.id}
            onSelectPartner={handleSelectPartner}
            autoSpin={autoSpinEnabled}
          />
        </div>

        {/* ===================================================================
            B. LEFT OVERLAY PANEL: Sirkulasi Nasional Stats Card
            Position: hidden lg:block absolute top-6 left-6 z-20 w-80
            =================================================================== */}
        <div className="hidden lg:block absolute top-6 left-6 z-20 w-80 max-w-[calc(100vw-3rem)] bg-white/80 backdrop-blur-2xl rounded-3xl p-5 border border-white/60 shadow-xl pointer-events-auto font-jakarta">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-mint-200/60 gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-mint-100 flex items-center justify-center text-green-700 border border-mint-200 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500 font-mono truncate">
                  Sirkular Nasional
                </div>
                <div className="text-xs font-bold text-ink-900 truncate">
                  Kepulauan Indonesia
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 text-[10px] font-bold font-mono shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Large Financial / Impact Metric */}
          <div className="pt-3 pb-2 space-y-1">
            <span className="text-[11px] text-ink-600 font-medium truncate block">
              Total Nilai Material Tersalurkan
            </span>
            <div className="font-mono text-2xl font-extrabold text-green-800 tracking-tight truncate">
              Rp 248.500.000
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium truncate">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">+32.4% peningkatan volume bulan ini</span>
            </div>
          </div>

          {/* Activity Mini Sparkline Bar Chart */}
          <div className="py-2.5">
            <div className="flex items-end justify-between gap-1 h-12 pt-2 px-1 bg-mint-50/50 rounded-xl border border-mint-200/50">
              {[35, 45, 60, 40, 75, 90, 65, 80, 95, 70, 85, 100].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className="flex-1 bg-gradient-to-t from-emerald-500 to-green-600 rounded-t-xs hover:brightness-110 transition-all cursor-pointer"
                  title={`Minggu ke-${idx + 1}: ${val * 10} kg`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-ink-400 font-mono pt-1">
              <span>Agt 2026</span>
              <span>Sep 2026</span>
              <span>Okt 2026</span>
              <span>Nov 2026</span>
            </div>
          </div>

          {/* Status Breakdown Bar */}
          <div className="pt-2 border-t border-mint-200/60 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-ink-600 font-medium truncate">Distribusi Alur:</span>
              <span className="font-mono font-bold text-ink-900 shrink-0">100% Terverifikasi</span>
            </div>
            <div className="w-full h-2 rounded-full bg-mint-100 overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: '45%' }} title="Pilah Bersih (45%)" />
              <div className="h-full bg-green-600" style={{ width: '35%' }} title="Jemput Terjadwal (35%)" />
              <div className="h-full bg-[#0E7C7B]" style={{ width: '20%' }} title="Olah Industri (20%)" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-ink-500 font-mono pt-0.5">
              <span className="flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" /> Pilah 45%
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" /> Jemput 35%
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E7C7B] shrink-0" /> Industri 20%
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
            C. RIGHT OVERLAY PANEL / MOBILE BOTTOM SHEET: Mitra Daur Ulang Pilihan
            Desktop: floating panel top-right
            Mobile: draggable/collapsible bottom sheet
            =================================================================== */}
        <FloatingPartnerListings
          partners={filteredPartners}
          hoveredPartnerId={hoveredPartnerId}
          onHoverPartner={setHoveredPartnerId}
          selectedPartnerId={selectedPartner?.id}
          onSelectPartner={handleSelectPartner}
          onViewDetail={handleViewDetail}
        />

        {/* ===================================================================
            D. BOTTOM-RIGHT SHOWCASE PANEL: Sentra Fasilitas Unggulan Carousel
            Position: hidden lg:block absolute bottom-6 right-6 z-30 w-96 h-44
            =================================================================== */}
        <div className="hidden lg:block absolute bottom-6 right-6 z-30 w-96 h-44 bg-white/85 backdrop-blur-2xl rounded-3xl p-3 border border-white/80 shadow-2xl overflow-hidden pointer-events-auto">
          <FacilitySlideshow onSelectSlide={handleSelectSlide} />
        </div>

        {/* ===================================================================
            E1. MOBILE FLOATING GLOBE CONTROLS (Top Floating Dock)
            Position: lg:hidden absolute top-6 left-1/2 -translate-x-1/2 z-20
            Scoped strictly inside the relative 3D Globe section container
            =================================================================== */}
        <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/60 shadow-md text-xs font-semibold text-slate-800 pointer-events-auto select-none font-jakarta">
          <div className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-2xs flex items-center gap-1.5 shrink-0">
            <Globe className="w-3.5 h-3.5" />
            <span>3D Globe</span>
          </div>

          <button
            type="button"
            onClick={() => setAutoSpinEnabled((prev) => !prev)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
              autoSpinEnabled
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-100'
            }`}
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${autoSpinEnabled ? 'animate-spin' : ''}`}
              style={{ animationDuration: '6s' }}
            />
            <span>{autoSpinEnabled ? 'Putar' : 'Jeda'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHoveredPartnerId(null);
            }}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-700 hover:text-emerald-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Pusatkan</span>
          </button>
        </div>

        {/* ===================================================================
            E2. DESKTOP BOTTOM-CENTER CONTROLS PILL: Globe Navigation
            Position: hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30
            =================================================================== */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-mint-200 shadow-lg flex items-center gap-2 sm:gap-3 font-jakarta whitespace-nowrap">
            <div className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 shrink-0">
              <Globe className="w-3.5 h-3.5" />
              <span>3D Globe</span>
            </div>

            <button
              type="button"
              onClick={() => setAutoSpinEnabled((prev) => !prev)}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                autoSpinEnabled
                  ? 'bg-mint-100 text-green-800'
                  : 'text-ink-600 hover:text-green-800 hover:bg-mint-50'
              }`}
            >
              <RotateCw
                className={`w-3.5 h-3.5 ${autoSpinEnabled ? 'animate-spin' : ''}`}
                style={{ animationDuration: '6s' }}
              />
              <span>{autoSpinEnabled ? 'Putar' : 'Jeda'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setHoveredPartnerId(null);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold text-ink-600 hover:text-green-800 hover:bg-mint-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Pusatkan</span>
            </button>
          </div>
        </div>

        {/* Soft bottom edge fade bridging to the light theme banner below (desktop only) */}
        <div className="hidden lg:block absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#F4FAF6] via-[#F4FAF6]/40 to-transparent pointer-events-none z-10" />
      </section>

      {/* =====================================================================
          4. TRUST & QUALITY ASSURANCE BANNER (Banner Penjaminan Kualitas)
          Seamless visual bridge transitioning from dark 3D Globe to light Footer
          ===================================================================== */}
      <TrustQualityBanner />

      {/* =====================================================================
          QUICK-VIEW PARTNER DETAIL DRAWER (/pasar/[slug])
          Ultra-premium Slide-over Drawer that glides in from the right edge
          ===================================================================== */}
      <PartnerDetailDrawer
        partner={drawerPartner}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onSelectPartner={handleSelectPartner}
      />

      {/* =====================================================================
          FLOATING CONFIRMATION TOAST
          ===================================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 lg:bottom-10 right-4 sm:right-8 z-50 bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-jakarta text-xs sm:text-sm border border-emerald-600/60 backdrop-blur-md"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">{toastMessage}</span>
            {selectedPartner && (
              <Link
                href={`/salur/baru?mitra=${selectedPartner.slug}`}
                className="ml-2 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <span>Salur</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
