'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Search,
  ShieldCheck,
  X,
  Sparkles,
  Layers,
  FileText,
  Package,
  Wine,
  Truck,
  Building2,
  ArrowDown,
} from 'lucide-react';
import type {
  MarketplaceFilters,
  MarketplaceCategory,
  MarketplaceMethod,
} from './types';

export interface MarketplaceHeaderProps {
  /** Optional controlled filters state */
  filters?: MarketplaceFilters;
  /** Optional callback fired whenever any filter changes */
  onFilterChange?: (filters: MarketplaceFilters) => void;
  /** Optional ID of listings section to scroll to on click */
  targetSectionId?: string;
  /** Optional additional CSS classes */
  className?: string;
}

const CATEGORIES: {
  id: MarketplaceCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'semua', label: 'Semua', icon: Sparkles },
  { id: 'plastik', label: 'Plastik', icon: Package },
  { id: 'kertas', label: 'Kertas', icon: FileText },
  { id: 'logam', label: 'Logam', icon: Layers },
  { id: 'kaca', label: 'Kaca', icon: Wine },
];

export function MarketplaceHeader({
  filters: controlledFilters,
  onFilterChange,
  targetSectionId = 'marketplace-listings',
  className = '',
}: MarketplaceHeaderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Internal state when component is uncontrolled
  const [internalFilters, setInternalFilters] = useState<MarketplaceFilters>({
    searchQuery: '',
    selectedCategory: 'semua',
    selectedMethod: 'all',
    isVerifiedOnly: false,
  });

  const activeFilters = controlledFilters ?? internalFilters;

  const updateFilters = (updater: (prev: MarketplaceFilters) => MarketplaceFilters) => {
    const next = updater(activeFilters);
    if (!controlledFilters) {
      setInternalFilters(next);
    }
    onFilterChange?.(next);
  };

  // Detect low-performance / mobile viewport (< 768px) to disable mouse tracking on touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isMouseTrackingDisabled = prefersReducedMotion || isMobile;

  // Track vertical page scroll for standard scroll parallax
  const { scrollY } = useScroll();

  // =========================================================================
  // 1. INTERACTIVE 3D PARALLAX MOUSE MECHANICS (damping: 30, stiffness: 90)
  // Normalized range: -0.5 (left/top) to +0.5 (right/bottom)
  // =========================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMouseTrackingDisabled) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    // Smoothly return 3D rotations and translations back to neutral 0
    mouseX.set(0);
    mouseY.set(0);
  };

  // Smooth scroll helper
  const handleScrollToListings = () => {
    const el = document.getElementById(targetSectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // =========================================================================
  // 2. PARALLAX TRANSFORM MAPPINGS (Scroll + Mouse Dynamics)
  // =========================================================================

  // Scroll parallax mapping
  const bgScrollY = useTransform(scrollY, [0, 600], [0, 110]);
  const fgScrollY = useTransform(scrollY, [0, 600], [0, -20]);

  // Background 3D mappings: subtle counter-rotation and panning
  const bgMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);
  const bgMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [-16, 16]);
  const bgRotX = useTransform(smoothMouseY, [-0.5, 0.5], [2.2, -2.2]);
  const bgRotY = useTransform(smoothMouseX, [-0.5, 0.5], [-2.2, 2.2]);

  // Foreground text & console translation
  const fgMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]);
  const fgMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  // Stagger entrance animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`h-screen h-[100vh] max-h-screen relative w-full overflow-hidden flex items-center justify-start [perspective:1200px] perspective-[1200px] ${className}`}
    >
      {/* =====================================================================
          1. BACKGROUND ASSET & 3D MOUSE PARALLAX SETUP
          - Strictly pointer-events-none so it NEVER blocks user interactions
          - HeroSection.png kept crisp, sharp, rich in color (no blur)
          - Scaled to scale-110 to prevent edge borders during 3D tilting
          ===================================================================== */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : bgScrollY,
        }}
        className="absolute inset-0 pointer-events-none z-0 will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : bgMouseX,
            y: isMouseTrackingDisabled ? 0 : bgMouseY,
            rotateX: isMouseTrackingDisabled ? 0 : bgRotX,
            rotateY: isMouseTrackingDisabled ? 0 : bgRotY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full scale-110 will-change-transform pointer-events-none"
        >
          <Image
            src="/images/Marketplace/HeroSection.png"
            alt="ELOVIA Recycle Marketplace - Toko & Pusat Daur Ulang Ramah Lingkungan"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center filter-none pointer-events-none select-none"
          />
        </motion.div>
      </motion.div>

      {/* =====================================================================
          GRADIENT OVERLAYS (ASYMMETRIC COMPOSITION)
          All strictly pointer-events-none z-[1]
          ===================================================================== */}
      {/* Primary Bottom-Left Radial Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-black/85 via-black/45 to-transparent pointer-events-none z-[1]"
      />

      {/* Left Linear Gradient reinforcement for razor-sharp typography contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full sm:w-3/4 lg:w-3/5 bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-[1]"
      />

      {/* Top subtle vignette for global navbar legibility */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/60 via-black/15 to-transparent pointer-events-none z-[1]"
      />

      {/* Bottom subtle grounding transition into #F6FAF7 */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#F6FAF7] via-transparent to-transparent pointer-events-none z-[1]"
      />

      {/* =====================================================================
          2. LEFT-ALIGNED TYPOGRAPHY & CONSOLE BLOCK (The Hook)
          - STRICTLY z-40 and pointer-events-auto
          - Perfectly proportioned to fit within 100vh without vertical overflow
          ===================================================================== */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : fgScrollY,
        }}
        className="relative z-40 pointer-events-auto w-full max-w-2xl px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 will-change-transform"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : fgMouseX,
            y: isMouseTrackingDisabled ? 0 : fgMouseY,
          }}
          className="w-full flex flex-col items-start pointer-events-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-start text-left pointer-events-auto"
          >
            {/* EYEBROW: 'MITRA DAUR ULANG TERVERIFIKASI 🌿' */}
            <motion.div variants={itemVariants} className="mb-2 sm:mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-green-400 font-jakarta shadow-sm select-none">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span>MITRA DAUR ULANG TERVERIFIKASI 🌿</span>
              </div>
            </motion.div>

            {/* HEADLINE: 'Temukan Mitra Daur Ulang Terdekat' in 'Fraunces' */}
            <motion.h1
              variants={itemVariants}
              className="text-left text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.08] mb-2 sm:mb-3 font-fraunces tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)] select-none"
            >
              Temukan Mitra Daur Ulang Terdekat
            </motion.h1>

            {/* SUBTITLE: 'Salurkan material terpilah Anda...' */}
            <motion.p
              variants={itemVariants}
              className="text-left text-white/80 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 font-jakarta leading-relaxed max-w-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] select-none"
            >
              Salurkan material terpilah Anda ke bank sampah atau agregator terpercaya
              dengan harga transparan.
            </motion.p>

            {/* ===================================================================
                3. THE SEARCH & FILTER CONSOLE (Redesigned for the Left Column)
                Compact, responsive, strictly pointer-events-auto and z-50
                =================================================================== */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl flex flex-col gap-2.5 sm:gap-3.5 text-left mb-3 sm:mb-4 pointer-events-auto relative z-50"
            >
              {/* ROW 1: Sleek, responsive, fully functional search input */}
              <div
                className="relative w-full group pointer-events-auto"
                onClick={() => searchInputRef.current?.focus()}
              >
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors pointer-events-none z-10">
                  <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>

                <input
                  ref={searchInputRef}
                  type="text"
                  value={activeFilters.searchQuery}
                  onChange={(e) =>
                    updateFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  placeholder="Cari nama mitra, kota, atau kecamatan..."
                  className="w-full bg-white/20 hover:bg-white/25 focus:bg-white/30 text-white placeholder:text-white/60 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm font-jakarta border border-white/15 focus:border-white/40 focus:ring-2 focus:ring-green-400/50 focus:outline-none transition-all shadow-inner pointer-events-auto select-text cursor-text relative z-10"
                />

                {activeFilters.searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateFilters((prev) => ({ ...prev, searchQuery: '' }));
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Bersihkan pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer pointer-events-auto z-20"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* ROW 2: Horizontal scrollable flex container for Material filters */}
              <div className="w-full overflow-x-auto no-scrollbar py-0.5 pointer-events-auto">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeFilters.selectedCategory === cat.id;
                    const Icon = cat.icon;

                    return (
                      <motion.button
                        key={cat.id}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          updateFilters((prev) => ({
                            ...prev,
                            selectedCategory: cat.id,
                          }))
                        }
                        className={`relative inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold font-jakarta transition-all duration-200 cursor-pointer select-none whitespace-nowrap pointer-events-auto ${
                          isActive
                            ? 'bg-green-500 text-white shadow-[0_2px_12px_rgba(34,197,94,0.35)] border border-green-400'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        <Icon
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            isActive ? 'text-white' : 'text-white/70'
                          }`}
                        />
                        <span>{cat.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ROW 3: Method & Verification Toggles Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-0.5 pointer-events-auto">
                {/* Toggle 1: Pickup vs Drop-off Segmented Pill */}
                <div className="flex items-center justify-between p-1 bg-white/10 border border-white/15 rounded-xl pointer-events-auto">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      updateFilters((prev) => ({
                        ...prev,
                        selectedMethod:
                          prev.selectedMethod === 'pickup' ? 'all' : 'pickup',
                      }))
                    }
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] sm:text-xs font-semibold font-jakarta transition-all cursor-pointer select-none pointer-events-auto ${
                      activeFilters.selectedMethod === 'pickup'
                        ? 'bg-green-500 text-white shadow-sm border border-green-400'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Pickup</span>
                  </motion.button>

                  <div className="w-px h-3.5 bg-white/15 mx-1" />

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      updateFilters((prev) => ({
                        ...prev,
                        selectedMethod:
                          prev.selectedMethod === 'dropoff' ? 'all' : 'dropoff',
                      }))
                    }
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] sm:text-xs font-semibold font-jakarta transition-all cursor-pointer select-none pointer-events-auto ${
                      activeFilters.selectedMethod === 'dropoff'
                        ? 'bg-green-500 text-white shadow-sm border border-green-400'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Drop-off</span>
                  </motion.button>
                </div>

                {/* Toggle 2: SNI Terpadu Only with Switch */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    updateFilters((prev) => ({
                      ...prev,
                      isVerifiedOnly: !prev.isVerifiedOnly,
                    }))
                  }
                  className={`flex items-center justify-between px-3 py-1.5 sm:py-2 bg-white/10 border rounded-xl transition-all cursor-pointer select-none pointer-events-auto ${
                    activeFilters.isVerifiedOnly
                      ? 'border-green-400/80 bg-green-500/20 text-white shadow-[0_0_15px_rgba(74,222,128,0.25)]'
                      : 'border-white/15 text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                  aria-pressed={activeFilters.isVerifiedOnly}
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        activeFilters.isVerifiedOnly
                          ? 'text-green-400'
                          : 'text-white/60'
                      }`}
                    />
                    <span className="text-[11px] sm:text-xs font-semibold font-jakarta whitespace-nowrap">
                      SNI Terpadu Only
                    </span>
                  </div>

                  {/* Switch Pill */}
                  <div
                    className={`w-7 sm:w-8 h-4 sm:h-4.5 rounded-full p-0.5 transition-colors flex items-center ${
                      activeFilters.isVerifiedOnly
                        ? 'bg-green-500 justify-end'
                        : 'bg-white/20 justify-start'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-white shadow-xs"
                    />
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* ===================================================================
                4. QUICK STATS (Bottom Left - building trust)
                "100+ Mitra" | "10,000+ Transaksi" | "100% Harga Transparan"
                =================================================================== */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-3 border-t border-white/15 w-full select-none"
            >
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-bold font-fraunces text-white tracking-tight">
                  100+
                </span>
                <span className="text-[10px] sm:text-xs text-white/70 font-jakarta tracking-wide">
                  Mitra Terdaftar
                </span>
              </div>

              <div className="h-6 w-px bg-white/20" />

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-bold font-fraunces text-white tracking-tight">
                  10.000+
                </span>
                <span className="text-[10px] sm:text-xs text-white/70 font-jakarta tracking-wide">
                  Transaksi Sukses
                </span>
              </div>

              <div className="h-6 w-px bg-white/20" />

              <div className="flex flex-col">
                <span className="text-lg sm:text-xl md:text-2xl font-bold font-fraunces text-white tracking-tight">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs text-white/70 font-jakarta tracking-wide">
                  Harga Transparan
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          5. VISUAL BALANCE & SCROLL TO EXPLORE PROMPT (Bottom Right)
          Leaves the right half of the screen completely clear, with a subtle
          call-to-action scroll prompt inspired by premium travel/landing heroes
          ===================================================================== */}
      <div className="hidden lg:flex absolute bottom-8 right-12 z-40 pointer-events-auto flex-col items-center gap-2">
        <motion.button
          onClick={handleScrollToListings}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex flex-col items-center gap-2 text-white/75 hover:text-white transition-colors cursor-pointer"
          aria-label="Gulir ke direktori mitra di bawah"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase font-jakarta text-white/60 group-hover:text-white transition-colors drop-shadow-sm select-none">
            SCROLL TO EXPLORE
          </span>
          <div className="w-9 h-9 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:border-green-400 group-hover:bg-white/20 transition-all shadow-lg">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:translate-y-0.5 transition-transform" />
          </div>
        </motion.button>
      </div>
    </header>
  );
}
