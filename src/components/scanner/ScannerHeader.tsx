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
import { ArrowDown } from 'lucide-react';

interface ScannerHeaderProps {
  /** Optional target ID to smoothly scroll down to (defaults to 'scanner-section') */
  targetSectionId?: string;
  /** Optional custom class name */
  className?: string;
}

export function ScannerHeader({
  targetSectionId = 'scanner-section',
  className = '',
}: ScannerHeaderProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

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

  // Track vertical page scroll
  const { scrollY } = useScroll();

  // =========================================================================
  // 1. INTERACTIVE 3D PARALLAX MOUSE MECHANICS
  // Normalized range: -0.5 (left/top) to +0.5 (right/bottom)
  // Spring config: damping: 30, stiffness: 90, mass: 0.8 for butter-smooth camera movement
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
    // Smoothly returns all 3D rotations and translations back to default 0 via springs
    mouseX.set(0);
    mouseY.set(0);
  };

  // =========================================================================
  // 2. VOLUMETRIC 3D LAYER MOVEMENTS (Reacting to Pointer + Scroll)
  // =========================================================================

  // Scroll Parallax mappings
  const bgScrollY = useTransform(scrollY, [0, 600], [0, 120]);
  const midScrollY = useTransform(scrollY, [0, 600], [0, 50]);
  const foreScrollY = useTransform(scrollY, [0, 600], [0, -60]);
  const uiScrollY = useTransform(scrollY, [0, 600], [0, -40]);

  // Tier 1: Background Layer (The Wall, window, wall decor) - stays deepest
  // rotateX/rotateY: -1 to -2 deg, translateX/translateY: -10px to -15px
  const bgMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const bgMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [-14, 14]);
  const bgRotX = useTransform(smoothMouseY, [-0.5, 0.5], [1.8, -1.8]);
  const bgRotY = useTransform(smoothMouseX, [-0.5, 0.5], [-1.8, 1.8]);

  // Tier 2: Midground Layer (The Bins, wooden tables/crates) - medium response
  // rotateX/rotateY: -3 to -4 deg, translateX/translateY: -25px to -30px
  const midMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [-28, 28]);
  const midMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [-28, 28]);
  const midRotX = useTransform(smoothMouseY, [-0.5, 0.5], [3.6, -3.6]);
  const midRotY = useTransform(smoothMouseX, [-0.5, 0.5], [-3.6, 3.6]);

  // Tier 3: Foreground Layer (Large foliage/plants on far-left and far-right edges) - heavy response
  // rotateX/rotateY: -6 to -8 deg, translateX/translateY: -50px to -65px
  const foreMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [-58, 58]);
  const foreMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [-58, 58]);
  const foreRotX = useTransform(smoothMouseY, [-0.5, 0.5], [7.2, -7.2]);
  const foreRotY = useTransform(smoothMouseX, [-0.5, 0.5], [-7.2, 7.2]);

  // Floating Text & UI Elements - glides above the scene with subtle counter-tilt
  const uiMouseX = useTransform(smoothMouseX, [-0.5, 0.5], [26, -26]);
  const uiMouseY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
  const uiRotX = useTransform(smoothMouseY, [-0.5, 0.5], [-4.5, 4.5]);
  const uiRotY = useTransform(smoothMouseX, [-0.5, 0.5], [4.5, -4.5]);

  // Smooth scroll handler for the Call To Action button
  const handleScrollToScanner = () => {
    const targetElement = document.getElementById(targetSectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight * 0.95,
        behavior: 'smooth',
      });
    }
  };

  // Entrance animations on load
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
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-screen overflow-hidden flex flex-col justify-between bg-transparent [perspective:1200px] select-none ${className}`}
    >
      {/* =========================================================================
          TIER 1: BACKGROUND LAYER (Deepest: Wall, window, wall decor)
          100% sharp, zero blur, over-scaled by 12% to prevent border gaps during 3D panning.
          ========================================================================= */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : bgScrollY,
        }}
        className="absolute inset-0 pointer-events-none z-0 will-change-transform"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : bgMouseX,
            y: isMouseTrackingDisabled ? 0 : bgMouseY,
            rotateX: isMouseTrackingDisabled ? 0 : bgRotX,
            rotateY: isMouseTrackingDisabled ? 0 : bgRotY,
            scale: 1.12,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full will-change-transform"
        >
          <Image
            src="/images/pindai.png"
            alt="Stasiun pemilahan sampah indoor alami ELOVIA"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center filter-none"
          />
        </motion.div>
      </motion.div>

      {/* =========================================================================
          TIER 2: MIDGROUND LAYER (Medium: Colored Bins, wooden tables/crates)
          Feathered radial elliptical mask focused seamlessly on center bins & wall crates.
          Zero blur on the image pixels.
          ========================================================================= */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : midScrollY,
        }}
        className="absolute inset-0 pointer-events-none z-[1] will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : midMouseX,
            y: isMouseTrackingDisabled ? 0 : midMouseY,
            rotateX: isMouseTrackingDisabled ? 0 : midRotX,
            rotateY: isMouseTrackingDisabled ? 0 : midRotY,
            scale: 1.12,
            transformStyle: 'preserve-3d',
            WebkitMaskImage:
              'radial-gradient(ellipse 68% 62% at 50% 58%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            maskImage:
              'radial-gradient(ellipse 68% 62% at 50% 58%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, transparent 95%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
          className="relative w-full h-full will-change-transform"
        >
          <Image
            src="/images/pindai.png"
            alt=""
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center filter-none"
          />
        </motion.div>
      </motion.div>

      {/* =========================================================================
          TIER 3: FOREGROUND LAYER (Heavy: Foliage & potted plants on far-left & far-right)
          Feathered horizontal split mask creating dramatic stereoscopic parallax.
          Zero blur on the image pixels.
          ========================================================================= */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : foreScrollY,
        }}
        className="absolute inset-0 pointer-events-none z-[2] will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : foreMouseX,
            y: isMouseTrackingDisabled ? 0 : foreMouseY,
            rotateX: isMouseTrackingDisabled ? 0 : foreRotX,
            rotateY: isMouseTrackingDisabled ? 0 : foreRotY,
            scale: 1.14,
            transformStyle: 'preserve-3d',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 30%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.4) 30%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
          className="relative w-full h-full will-change-transform"
        >
          <Image
            src="/images/pindai.png"
            alt=""
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center filter-none"
          />
        </motion.div>
      </motion.div>

      {/* Subtle top & bottom grounding gradient overlays (Seamless blend into dark forest background) */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-[3]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-56 sm:h-72 bg-gradient-to-t from-[#0a150f] via-[#0a150f]/70 to-transparent pointer-events-none z-[3]"
      />

      {/* Ultra-smooth invisible radial gradient overlay behind text for flawless contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.2)_40%,transparent_70%)] pointer-events-none z-[4]"
      />

      {/* =========================================================================
          TIER 4: FLOATING TEXT & UI ELEMENTS
          Glides above the scene, tilting and panning gracefully with the mouse.
          ========================================================================= */}
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : uiScrollY,
        }}
        className="relative z-10 w-full h-full flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-8 sm:pb-10 max-w-5xl mx-auto will-change-transform"
      >
        <motion.div
          style={{
            x: isMouseTrackingDisabled ? 0 : uiMouseX,
            y: isMouseTrackingDisabled ? 0 : uiMouseY,
            rotateX: isMouseTrackingDisabled ? 0 : uiRotX,
            rotateY: isMouseTrackingDisabled ? 0 : uiRotY,
            transformStyle: 'preserve-3d',
          }}
          className="w-full flex-1 flex flex-col justify-between items-center"
        >
          {/* CENTER CONTENT BLOCK (Clean, Borderless, Floating Layout) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-4 z-10 flex-1 -mt-6 sm:-mt-8"
          >
            {/* Badge: '• WASTE VALUE SCANNER 🍃' standalone floating pill */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold tracking-widest uppercase shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span className="font-jakarta">WASTE VALUE SCANNER</span>
                <span className="text-sm" aria-hidden="true">🍃</span>
              </div>
            </motion.div>

            {/* Headline: 'Kenali sampah, ketahui potensinya.' with glowing gradient and heavy drop shadows */}
            <motion.h1
              variants={itemVariants}
              className="font-fraunces text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-center max-w-3xl mx-auto leading-tight mb-4"
            >
              <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                Kenali sampah,{' '}
              </span>
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300 drop-shadow-[0_2px_15px_rgba(16,185,129,0.8)] font-serif italic">
                ketahui potensinya.
              </span>
            </motion.h1>

            {/* Subtitle: High legibility pure white with strong shadow */}
            <motion.p
              variants={itemVariants}
              className="mt-3.5 sm:mt-5 text-white/95 text-sm md:text-base lg:text-lg max-w-2xl mx-auto text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium leading-relaxed font-jakarta"
            >
              Pilih material Anda, masukkan beratnya, dan temukan nilai ekonomi yang tersembunyi.
            </motion.p>

            {/* Tiga Pill Bawah:
                '• Formula 6 Faktor Penentu', '■ Harga Acuan Bertanggal', '• Panduan SNI Terpadu' */}
            <motion.div
              variants={itemVariants}
              className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-100"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-md font-semibold font-jakarta text-emerald-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Formula 6 Faktor Penentu
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-md font-semibold font-jakarta text-emerald-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-teal-300" />
                Harga Acuan Bertanggal
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-md font-semibold font-jakarta text-emerald-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                Panduan SNI Terpadu
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              CALL TO ACTION (BOUNCING ARROW ICON & 'MULAI PINDAI NILAI')
              Positioned directly over the bottom green recycling bin
              ========================================================================= */}
          <div className="w-full flex flex-col items-center justify-center pt-2">
            <motion.button
              onClick={handleScrollToScanner}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              aria-label="Gulir ke pemindai interaktif di bawah"
              className="group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 rounded-2xl cursor-pointer p-1 transition-transform active:scale-95"
            >
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-emerald-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] font-jakarta group-hover:text-white transition-colors">
                MULAI PINDAI NILAI
              </span>

              {/* Bouncing circular button with animated arrow down */}
              <motion.div
                animate={
                  prefersReducedMotion || isMobile
                    ? {}
                    : {
                        y: [0, 6, 0],
                      }
                }
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-[0_6px_24px_rgba(16,185,129,0.45)] flex items-center justify-center border border-emerald-300/60 group-hover:scale-105 transition-all duration-300 backdrop-blur-md"
              >
                <ArrowDown className="w-5 h-5 text-white stroke-[2.5] group-hover:translate-y-0.5 transition-transform duration-300" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
