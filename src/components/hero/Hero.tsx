'use client';

import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CircularLoopsBackground } from './CircularLoopsBackground';
import { CursorRevealLayer } from './CursorRevealLayer';
import { ActionPill } from './ActionPill';
import { PartnerLogos } from './PartnerLogos';
import { RefreshCw } from 'lucide-react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Staggered entrance animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white selection:bg-[#E8F4EC] selection:text-[#0F1F17]"
    >
      {/* 1. Fresh Green Tech Background with Subtle Circular Loop Motifs (z-0) */}
      <CircularLoopsBackground />

      {/* 2. Cursor-Following Character Reveal Effect (Base Image z-[1], Reveal Image z-[2] with 260px spotlight) */}
      <CursorRevealLayer containerRef={sectionRef} />

      {/* 3. Subtle Cinema Contrast Vignette (z-[5]): Guarantees 100% text readability over both dark night & bright day reveal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-black/45 via-black/20 to-black/55 select-none"
      />

      {/* 4. Hero Center Block (z-20) with clearance for Fixed Global Navbar */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 min-[390px]:pt-24 sm:pt-28 pb-8 sm:pb-10 flex-1 flex flex-col justify-center items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center"
        >
          {/* Top Pill / Badge in Pure White / Light Mint */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/45 border border-white/25 text-[#E8F4EC] text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <RefreshCw className="w-3.5 h-3.5 text-[#E8F4EC] animate-[spin_10s_linear_infinite]" />
              <span>CIRCULAR ECONOMY PLATFORM</span>
            </div>
          </motion.div>

          {/* Main Headline: Strictly ONE single line without breaking, with dreamy aesthetic keyword coloring */}
          <motion.h1
            variants={itemVariants}
            className="font-fraunces text-[1.45rem] min-[380px]:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-none tracking-tight font-normal text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] max-w-none mx-auto mb-3.5 sm:mb-6 whitespace-nowrap select-none"
          >
            Your{' '}
            <span className="relative inline-block bg-gradient-to-r from-[#A7F3D0] via-[#6EE7B7] to-[#5EEAD4] bg-clip-text text-transparent font-medium drop-shadow-[0_0_24px_rgba(110,231,183,0.55)]">
              waste
            </span>{' '}
            has another{' '}
            <span className="relative inline-block italic font-normal bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_0_26px_rgba(252,211,77,0.65)]">
              worth.
            </span>
          </motion.h1>

          {/* Supporting Subheadline in Light Mint / Pure White */}
          <motion.p
            variants={itemVariants}
            className="font-jakarta text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl text-[#E8F4EC] max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-medium mb-6 sm:mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] px-2 sm:px-0"
          >
            Discover value in discarded materials. Turn better waste habits into
            real opportunities.
          </motion.p>

          {/* Action Placement: Primary CTA 'Explore material value ↗' and Secondary 'Learn Methodology' */}
          <motion.div variants={itemVariants} className="w-full">
            <ActionPill />
          </motion.div>
        </motion.div>
      </div>

      {/* 6. Bottom Text Area & Partner Logos (z-20) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="relative z-20 w-full pb-8 sm:pb-12 pt-4 sm:pt-6"
      >
        <PartnerLogos />
      </motion.div>
    </section>
  );
}
