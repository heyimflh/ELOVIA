'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, ShieldCheck, ChevronRight, Layers } from 'lucide-react';
import { FloatingOrbs } from './FloatingOrbs';
import { PartnerCard } from './PartnerCard';
import { PARTNERS_DATA } from './partnerData';

export function MarketplacePreview() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Header animation variant
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Handle scroll snap detection on mobile
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const cardWidth = target.offsetWidth * 0.85;
    if (cardWidth > 0) {
      const newIndex = Math.round(scrollLeft / cardWidth);
      setMobileActiveIndex(Math.min(Math.max(newIndex, 0), PARTNERS_DATA.length - 1));
    }
  };

  const scrollToMobileIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setMobileActiveIndex(index);
    }
  };

  return (
    <section
      ref={containerRef}
      id="marketplace-preview"
      aria-labelledby="marketplace-preview-heading"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#F6FAF7] selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* =====================================================================
          1. DREAMY AESTHETIC BACKGROUND (Creem.io Inspired)
          Soft mint-200 (#D3EBDB) and teal-100 (#DDF3F1) floating orbs drifting
          gently behind content, producing an ethereal, glowing ambient light.
          ===================================================================== */}
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* =====================================================================
            2. SECTION HEADER (Sleek & Centered)
            Eyebrow: 'CONNECT & EXCHANGE'
            Main Title: 'Meet Your Circular Partners' (Fraunces)
            Subtitle: 'Discover verified collectors and recycling partners near you...'
            ===================================================================== */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20 space-y-4"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#D3EBDB] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#177A47] animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#177A47]">
              CONNECT &amp; EXCHANGE
            </span>
          </div>

          {/* Main Title using Fraunces */}
          <h2
            id="marketplace-preview-heading"
            className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F1F17] leading-[1.15]"
          >
            Meet Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 italic font-normal text-[#177A47]">Circular Partners</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 right-0 h-3 bg-[#E3F6B5]/60 -rotate-1 rounded-sm -z-0"
              />
            </span>
          </h2>

          {/* Subtitle using Plus Jakarta Sans */}
          <p className="font-jakarta text-base sm:text-lg text-[#4A5D52] leading-relaxed max-w-2xl mx-auto">
            Discover verified collectors and recycling partners near you, offering transparent
            indicative prices.
          </p>

          {/* Trust Guarantees Strip */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-jakarta text-[#5D7065] flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#177A47]" /> 100% Mitra Terverifikasi
            </span>
            <span className="text-[#D3EBDB]">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#177A47]" /> Nilai Acuan Bertanggal
            </span>
            <span className="text-[#D3EBDB]">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#177A47]" /> Penjemputan Langsung
            </span>
          </div>
        </motion.div>

        {/* =====================================================================
            3 & 4. PARTNER CARDS GRID (PRD Compliance)
            - Desktop: Sleek 3-column grid
            - Mobile: Smooth horizontal swipe/scroll container with snap & peek
            - Cards have pure white background, 1px mint-200 border, shadow-soft
            - Hover: lifts -translate-y-2, subtle green border glow, deepened shadow
            ===================================================================== */}
        
        {/* Desktop & Tablet Grid (>= sm) */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {PARTNERS_DATA.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </motion.div>

        {/* Mobile Horizontal Snap Scroll (< sm) */}
        <div className="sm:hidden -mx-4 px-4">
          <div
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-2 no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {PARTNERS_DATA.map((partner, index) => (
              <div
                key={partner.id}
                className="w-[85vw] max-w-[340px] shrink-0 snap-center h-full flex flex-col"
              >
                <PartnerCard partner={partner} index={index} />
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {PARTNERS_DATA.map((partner, index) => (
              <button
                key={partner.id}
                onClick={() => scrollToMobileIndex(index)}
                aria-label={`Lihat mitra ${partner.name}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  mobileActiveIndex === index
                    ? 'w-6 bg-[#177A47]'
                    : 'w-2 bg-[#D3EBDB] hover:bg-[#A9D3B8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* =====================================================================
            5. NAVIGATION / CTA: Minimalist 'View all partners →'
            Transparent background, green-700 text (#0F5F37), hovers to mint-100 (#E8F4EC)
            Linking to /pasar.
            ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <Link
              href="/pasar"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-transparent hover:bg-[#E8F4EC] text-[#0F5F37] border border-transparent hover:border-[#D3EBDB] font-jakarta font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] focus-visible:ring-offset-2 cursor-pointer shadow-none hover:shadow-2xs active:scale-[0.98]"
            >
              <span>View all partners</span>
              <span className="font-mono text-base transition-transform duration-200 group-hover:translate-x-1.5 text-[#177A47]">
                →
              </span>
            </Link>

            <p className="text-xs text-[#5D7065] font-jakarta">
              Jelajahi lebih dari <span className="font-mono font-bold text-[#177A47]">40+</span> mitra bank sampah, pengepul, dan agregator berizin resmi
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
