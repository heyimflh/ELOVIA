'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ChevronUp } from 'lucide-react';
import type { MaterialItem } from './materialData';

interface MaterialCardProps {
  item: MaterialItem;
  offset: number; // -1 (left), 0 (active center), 1 (right), or other
  isActive: boolean;
  onSelect: () => void;
}

export function MaterialCard({ item, offset, isActive, onSelect }: MaterialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Position and depth mapping based on offset distance from active center
  const isLeft = offset === -1;
  const isRight = offset === 1;

  // Spring transition tuned to cinematic cover-flow gallery
  const springTransition = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
    mass: 0.85,
  };

  // --- 3D TILT HOVER EFFECT IMPLEMENTATION (Framer Motion) ---
  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Silky spring physics for realistic, fluid mouse tracking
  const mouseXSpring = useSpring(mouseX, { stiffness: 220, damping: 25, mass: 0.5 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 220, damping: 25, mass: 0.5 });

  // 3D Rotations: rotateX tilts along horizontal axis (cursor up/down), rotateY tilts along vertical axis (cursor left/right)
  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Dynamic light glare/specular highlight following mouse
  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]) =>
      `radial-gradient(circle 380px at ${(Number(xVal) + 0.5) * 100}% ${(Number(yVal) + 0.5) * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 50%, transparent 80%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isActive || shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      // Normalize position to [-0.5, 0.5]
      const xPct = xPos / rect.width - 0.5;
      const yPct = yPos / rect.height - 0.5;

      mouseX.set(xPct);
      mouseY.set(yPct);
    },
    [isActive, mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (isActive) {
      setIsHovered(true);
    }
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    // Reset tilt spring back to flat neutral
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsMobileExpanded(false);
  }, [mouseX, mouseY]);

  // Card cover-flow position variants for outer wrapper
  const getCoverFlowVariants = () => {
    if (isActive) {
      return {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 30,
        filter: 'blur(0px)',
      };
    }
    if (isLeft) {
      return {
        x: '-68%',
        scale: 0.86,
        opacity: 0.65,
        zIndex: 20,
        filter: 'blur(1px)',
      };
    }
    if (isRight) {
      return {
        x: '68%',
        scale: 0.86,
        opacity: 0.65,
        zIndex: 20,
        filter: 'blur(1px)',
      };
    }
    // Far cards (hidden behind)
    return {
      x: offset > 0 ? '120%' : '-120%',
      scale: 0.7,
      opacity: 0,
      zIndex: 10,
      filter: 'blur(4px)',
    };
  };

  const showOverlay = isActive && (isHovered || isMobileExpanded);

  return (
    // Outer positioning wrapper: preserves 3D perspective and handles Cover-Flow sliding
    <motion.div
      layout
      variants={{
        initial: getCoverFlowVariants(),
        animate: getCoverFlowVariants(),
      }}
      initial="initial"
      animate="animate"
      transition={springTransition}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="absolute w-[300px] sm:w-[360px] md:w-[400px] lg:w-[420px] h-[480px] sm:h-[520px] md:h-[560px]"
    >
      {/* Inner Card Container: Applies 3D tilt tracking, shadows, and content layers */}
      <motion.div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isActive && !shouldReduceMotion ? tiltRotateX : 0,
          rotateY: isActive && !shouldReduceMotion ? tiltRotateY : isLeft ? 10 : isRight ? -10 : 0,
        }}
        onClick={() => {
          if (!isActive) {
            onSelect();
          } else {
            // On mobile / touch screens, tap toggles reveal overlay
            setIsMobileExpanded((prev) => !prev);
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="group"
        aria-roledescription="slide"
        aria-label={`${item.categoryNumber} dari 4: ${item.title}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (!isActive) {
              e.preventDefault();
              onSelect();
            }
          }
        }}
        className={`relative w-full h-full cursor-pointer select-none rounded-[28px] overflow-hidden bg-white border flex flex-col transition-shadow duration-300 ${
          isActive
            ? 'border-[#D3EBDB] shadow-[0_20px_50px_rgba(15,31,23,0.12),0_4px_16px_rgba(23,122,71,0.06)] ring-1 ring-[#177A47]/15'
            : 'border-[#D3EBDB]/80 shadow-[0_8px_24px_rgba(15,31,23,0.04)] hover:border-[#177A47]/40'
        }`}
      >
        {/* Dynamic 3D Glare Overlay (active card only) */}
        {isActive && !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            className={`pointer-events-none absolute inset-0 z-35 rounded-[28px] transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top Header Floating Badge Area */}
        <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] text-[#0F1F17] shadow-sm">
            <span className="font-mono text-[11px] font-bold text-[#177A47]">
              CAT {item.categoryNumber}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A9D3B8]" />
            <span className="font-jakarta text-[11px] font-semibold text-[#4A5D52]">
              {item.badge.text.split('·')[0].trim()}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] flex items-center justify-center text-[#177A47] shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Main Flat-lay Image Container */}
        <div className="relative w-full h-[64%] sm:h-[66%] overflow-hidden bg-[#F6FAF7]">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={isActive}
            sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, 420px"
            className={`object-cover transition-transform duration-700 ease-out ${
              isActive && isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Soft bottom vignette overlay for seamless visual integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
        </div>

        {/* Bottom Content Area: Default View (when not hovered) */}
        <div className="relative flex-1 p-5 sm:p-6 bg-white flex flex-col justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#177A47] font-jakarta">
                {item.localName}
              </span>
            </div>

            <h3 className="font-fraunces text-2xl sm:text-3xl font-normal text-[#0F1F17] tracking-tight leading-tight">
              {item.title}
            </h3>
          </div>

          {/* Ambient Hint Pill / Price Teaser */}
          <div className="pt-2 border-t border-[#D3EBDB]/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5D7065] font-jakarta font-medium">
                Estimasi Acuan
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#177A47] tabular-nums">
                {item.priceRange} <span className="text-xs font-normal text-[#4A5D52]">{item.priceUnit}</span>
              </span>
            </div>

            {isActive ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4EC] text-[#177A47] text-xs font-medium border border-[#D3EBDB]/70 group-hover:bg-[#177A47] group-hover:text-white transition-colors duration-200">
                <ChevronUp className="w-3.5 h-3.5 animate-bounce" />
                <span className="font-jakarta text-[11px] sm:text-xs font-semibold">
                  Hover to reveal
                </span>
              </div>
            ) : (
              <span className="text-xs text-[#5D7065] font-jakarta">Klik untuk fokus</span>
            )}
          </div>
        </div>

        {/* Hover Reveal Effect Overlay (PRD Requirement):
            Smoothly transitions an overlay (soft mint-100 or glassmorphism effect) from the bottom.
            Reveals:
            1. Sub-categories brief list (e.g., 'Botol PET, Gelas PP, Jerigen')
            2. Indicative price range in JetBrains Mono font
            3. Primary CTA button reading 'Check material value' linking to /pindai?kategori=[id]
        */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 32,
                mass: 0.8,
              }}
              style={{
                transformStyle: 'preserve-3d',
                transform: 'translateZ(20px)', // Lift slightly in 3D for layered depth
              }}
              className="absolute inset-x-0 bottom-0 z-40 rounded-b-[28px] bg-[#E8F4EC]/95 backdrop-blur-md border-t border-[#D3EBDB] shadow-2xl p-5 sm:p-6 flex flex-col justify-between"
            >
              {/* Overlay Header with Title & Eco Tag */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#D3EBDB] text-[10px] font-bold uppercase tracking-wider text-[#177A47] font-jakarta">
                    <CheckCircle2 className="w-3 h-3 text-[#177A47]" />
                    {item.badge.text}
                  </span>
                  <span className="text-[10px] font-mono text-[#5D7065]">{item.priceDate}</span>
                </div>

                <h4 className="font-fraunces text-2xl font-normal text-[#0F1F17] leading-tight mb-3">
                  {item.title}
                </h4>

                {/* Requirement 1: Brief list of sub-categories */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-[#4A5D52] uppercase tracking-wider font-jakarta mb-1.5">
                    Sub-Kategori Terpilah:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subCategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full bg-white/85 border border-[#D3EBDB] text-xs font-medium text-[#0F1F17] font-jakarta shadow-2xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requirement 2: Indicative price range beautifully formatted in JetBrains Mono font */}
                <div className="mb-5 p-3 rounded-2xl bg-white/90 border border-[#D3EBDB] shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#5D7065] block font-jakarta">
                      Rentang Nilai Indikatif
                    </span>
                    <div className="font-mono text-2xl font-bold text-[#177A47] tracking-tight tabular-nums flex items-baseline gap-1">
                      <span>{item.priceRange}</span>
                      <span className="text-xs font-sans text-[#4A5D52] font-semibold">{item.priceUnit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#5D7065] block font-jakarta">Potensi Emisi</span>
                    <span className="text-xs font-bold text-[#0E7C7B] font-jakarta">Tereduksi</span>
                  </div>
                </div>
              </div>

              {/* Requirement 3: Primary CTA button reading 'Check material value' linking to /pindai?kategori=[id] */}
              <div className="pt-1">
                <Link
                  href={item.ctaUrl}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#177A47] hover:bg-[#0F5F37] text-white font-semibold font-jakarta text-sm shadow-[0_4px_16px_rgba(23,122,71,0.25)] hover:shadow-[0_6px_20px_rgba(23,122,71,0.35)] transition-all duration-200 active:scale-[0.98] focus:outline-hidden focus:ring-2 focus:ring-[#177A47] focus:ring-offset-2"
                >
                  <span>Check material value</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>

                <p className="mt-2 text-center text-[10px] text-[#5D7065] font-jakarta">
                  Estimasi akurat berdasarkan berat & kualitas di Scanner
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
