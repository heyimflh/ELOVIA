'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { MATERIAL_ITEMS } from './materialData';
import { MaterialCard } from './MaterialCard';

export function MaterialDiscovery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = MATERIAL_ITEMS.length;
  const shouldReduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeItem = MATERIAL_ITEMS[activeIndex];

  // Navigate next with circular wrap
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  // Navigate prev with circular wrap
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Direct selection
  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation (ArrowLeft and ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if active element is inside carousel or body
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Calculate relative offset of an item from the current activeIndex (-1, 0, 1, or 2/-2)
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    while (diff > totalItems / 2) diff -= totalItems;
    while (diff < -totalItems / 2) diff += totalItems;
    return diff;
  };

  return (
    <section
      id="material-discovery"
      role="region"
      aria-roledescription="carousel"
      aria-label="Katalog Material Discovery ELOVIA"
      className="relative w-full py-20 sm:py-28 lg:py-32 overflow-hidden selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* =========================================================================
          DYNAMIC DREAMY AMBIENT BACKGROUND
          Dynamically matches the open/active center card's image with a smooth,
          dreamy bokeh blur and a light-mode veil that makes the cover-flow gallery
          feel deeply cinematic while keeping text crystal clear.
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0, scale: 1.18 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeItem.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter blur-[40px] md:blur-[48px] scale-110 transform-gpu"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft Dreamy Light-Mode Veil:
            Gently softens the background image so colors and silhouettes bloom through,
            creating that signature cinematic depth-of-field while preserving Light Mode contrast.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-[#F6FAF7]/45 to-white/80 backdrop-blur-[2px]" />

        {/* Subtle Eco-Grid Matrix Overlay */}
        <div className="absolute inset-0 bg-eco-grid opacity-30 mix-blend-multiply" />

        {/* Smooth Top & Bottom Vignette Transitions to neighboring sections */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow / Kicker Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D3EBDB] shadow-xs mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-[#177A47]" />
            <span className="font-jakarta text-xs font-bold tracking-widest uppercase text-[#177A47]">
              MATERIAL DISCOVERY
            </span>
          </motion.div>

          {/* Section Title in Fraunces font */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[#0F1F17] font-normal tracking-tight leading-tight mb-4 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
          >
            Explore the Value of Your Waste
          </motion.h2>

          {/* Sub-headline in Plus Jakarta Sans */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="font-jakarta text-sm sm:text-base md:text-lg text-[#35483D] leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
          >
            Sampah harian bukan akhir dari siklus, melainkan awal sumber daya bernilai. Kenali kategori material,
            rentang harga indikatif, dan potensi ekonominya sebelum disalurkan.
          </motion.p>
        </div>

        {/* Cinematic Cover-Flow Carousel Stage */}
        <div
          ref={carouselRef}
          className="relative w-full flex items-center justify-center min-h-[520px] sm:min-h-[580px] md:min-h-[620px] py-4"
        >
          {/* Circular Left Navigation Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous material category"
            className="absolute left-2 sm:left-4 md:left-8 lg:left-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#E8F4EC] text-[#177A47] border border-[#D3EBDB] shadow-[0_6px_24px_rgba(15,31,23,0.1)] hover:shadow-[0_8px_30px_rgba(23,122,71,0.22)] flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#177A47] focus:ring-offset-2 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Cards Stage Container */}
          <div className="relative w-full max-w-[420px] h-[480px] sm:h-[520px] md:h-[560px] flex items-center justify-center">
            {MATERIAL_ITEMS.map((item, index) => {
              const offset = getOffset(index);
              const isActive = index === activeIndex;

              return (
                <MaterialCard
                  key={item.id}
                  item={item}
                  offset={offset}
                  isActive={isActive}
                  onSelect={() => handleSelect(index)}
                />
              );
            })}
          </div>

          {/* Circular Right Navigation Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next material category"
            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-[#E8F4EC] text-[#177A47] border border-[#D3EBDB] shadow-[0_6px_24px_rgba(15,31,23,0.1)] hover:shadow-[0_8px_30px_rgba(23,122,71,0.22)] flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-hidden focus:ring-2 focus:ring-[#177A47] focus:ring-offset-2 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          {/* Active indicator pills */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] shadow-xs"
            role="tablist"
            aria-label="Pilih kategori material"
          >
            {MATERIAL_ITEMS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Lihat kategori ${item.title}`}
                  onClick={() => handleSelect(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#177A47] shadow-xs'
                      : 'w-2.5 bg-[#D3EBDB] hover:bg-[#A9D3B8]'
                  }`}
                />
              );
            })}
          </div>

          {/* Helper caption with quick hint and counter */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D3EBDB]/70 shadow-2xs text-xs text-[#4A5D52] font-jakarta">
            <span className="font-mono font-semibold text-[#177A47]">
              0{activeIndex + 1} / 0{totalItems}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D3EBDB]" />
            <span className="hidden sm:inline">Gunakan panah keyboard atau geser untuk jelajah</span>
            <span className="sm:hidden">Geser kartu atau sentuh panah untuk navigasi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
