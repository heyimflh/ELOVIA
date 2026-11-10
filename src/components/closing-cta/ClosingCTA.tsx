'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import {
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Wind,
  Building2,
  SunMedium,
  ArrowUpRight,
  Recycle,
} from 'lucide-react';

const TOTAL_FRAMES = 300;
const FRAME_PATH_PREFIX = '/images/frames/ezgif-frame-';

export function ClosingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rawReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(rawReducedMotion);

  // Cached frame images
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // Current frame interpolation refs
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Track progress and phase
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4>(1);
  const [progressVal, setProgressVal] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  // Scroll tracking pinned across the 320vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* =========================================================================
     1. HIGH-PERFORMANCE CANVAS RENDERER
     Draws the given frame with object-cover aspect ratio scaling.
     ========================================================================= */
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

    // Find requested frame or the closest loaded frame to avoid blank flickers
    let imgToDraw = imagesRef.current[clampedIndex];
    if (!imgToDraw || !isLoadedRef.current[clampedIndex]) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = clampedIndex - offset;
        const next = clampedIndex + offset;
        if (prev >= 0 && isLoadedRef.current[prev] && imagesRef.current[prev]) {
          imgToDraw = imagesRef.current[prev];
          break;
        }
        if (next < TOTAL_FRAMES && isLoadedRef.current[next] && imagesRef.current[next]) {
          imgToDraw = imagesRef.current[next];
          break;
        }
      }
    }

    if (!imgToDraw) return;

    const imgWidth = 1280;
    const imgHeight = 720;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let dw: number, dh: number, dx: number, dy: number;
    if (canvasRatio > imgRatio) {
      dw = canvasWidth;
      dh = canvasWidth / imgRatio;
      dx = 0;
      dy = (canvasHeight - dh) / 2;
    } else {
      dh = canvasHeight;
      dw = canvasHeight * imgRatio;
      dx = (canvasWidth - dw) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(imgToDraw, dx, dy, dw, dh);
  }, []);

  /* =========================================================================
     2. PROGRESSIVE & STAGGERED FRAME PRELOADING
     - Priority 1: Frame 1 loaded immediately to paint canvas instantly.
     - Priority 2: Staggered sample frames across timeline (every 8th frame).
     - Priority 3: All intermediate frames loaded in the background.
     ========================================================================= */
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (isLoadedRef.current[index]) {
          resolve();
          return;
        }

        const img = new Image();
        const frameNum = String(index + 1).padStart(3, '0');
        img.src = `${FRAME_PATH_PREFIX}${frameNum}.jpg`;

        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[index] = img;
          isLoadedRef.current[index] = true;
          loadedCount++;

          if (index === 0) {
            setIsInitialReady(true);
            renderFrame(0);
          }

          setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    const preloadAll = async () => {
      // 1. Immediately load first frame
      await loadSingleFrame(0);

      // 2. Load staggered keyframes across entire scroll sequence
      const sampleIndices: number[] = [];
      for (let i = 8; i < TOTAL_FRAMES; i += 8) {
        sampleIndices.push(i);
      }
      sampleIndices.push(TOTAL_FRAMES - 1);

      await Promise.all(sampleIndices.map((idx) => loadSingleFrame(idx)));

      // 3. Load all remaining frames progressively
      const remainingIndices: number[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!isLoadedRef.current[i]) {
          remainingIndices.push(i);
        }
      }

      // Batch load in chunks of 12 to avoid connection congestion
      const chunkSize = 12;
      for (let i = 0; i < remainingIndices.length; i += chunkSize) {
        if (isCancelled) break;
        const chunk = remainingIndices.slice(i, i + chunkSize);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
      }
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  /* =========================================================================
     3. HIGH-DPI CANVAS RESIZE LISTENER
     ========================================================================= */
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  /* =========================================================================
     4. BUTTERY SMOOTH LERP FRAME INTERPOLATION (60-120 FPS RAF)
     Synchronizes user scroll directly to the 300 frame sequence.
     ========================================================================= */
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgressVal(latest);

      // Map scroll progress (0 to 1) directly to frame index (0 to 299)
      const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(latest * TOTAL_FRAMES)));
      targetFrameRef.current = targetIdx;

      // Update phase indicator
      let nextPhase: 1 | 2 | 3 | 4 = 1;
      if (latest < 0.28) nextPhase = 1;
      else if (latest < 0.58) nextPhase = 2;
      else if (latest < 0.78) nextPhase = 3;
      else nextPhase = 4;

      setCurrentPhase(nextPhase);
      setIsInteractive(latest >= 0.76);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    let rafId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      // Smooth momentum easing towards target frame
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.26;
        renderFrame(Math.round(currentFrameRef.current));
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [renderFrame]);

  // Jump smoothly to a specific phase on click
  const handleSelectPhase = useCallback((phase: 1 | 2 | 3 | 4) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    const targets: Record<1 | 2 | 3 | 4, number> = {
      1: 0.05,
      2: 0.38,
      3: 0.67,
      4: 0.92,
    };

    window.scrollTo({
      top: scrollTop + totalScrollable * targets[phase],
      behavior: 'smooth',
    });
  }, []);

  /* =========================================================================
     5. HARDWARE-ACCELERATED TRANSFORMS FOR TEXT REVEALS
     Exact synchronization with the 300 frame visual scenes:
     - Phase 1 (Turbines): Frames 1 - 95 (Scroll 0.00 - 0.28)
     - Phase 2 (City Lake): Frames 96 - 195 (Scroll 0.28 - 0.58)
     - Phase 3 (Sunset Valley): Frames 196 - 250 (Scroll 0.58 - 0.78)
     - Phase 4 (CTA Panel): Frames 250 - 300 (Scroll 0.78 - 1.00)
     ========================================================================= */

  // Phase 1 (Turbines): "Waste is not the end."
  const p1Opacity = useTransform(
    scrollYProgress,
    [0.0, 0.06, 0.20, 0.27],
    shouldReduceMotion ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );
  const p1Y = useTransform(
    scrollYProgress,
    [0.0, 0.06, 0.20, 0.27],
    shouldReduceMotion ? [0, 0, 0, 0] : [28, 0, 0, -22]
  );

  // Phase 2 (City Lake): "It is a new beginning."
  const p2Opacity = useTransform(
    scrollYProgress,
    [0.28, 0.36, 0.50, 0.57],
    shouldReduceMotion ? [0, 1, 1, 0] : [0, 1, 1, 0]
  );
  const p2Y = useTransform(
    scrollYProgress,
    [0.28, 0.36, 0.50, 0.57],
    shouldReduceMotion ? [0, 0, 0, 0] : [28, 0, 0, -22]
  );

  // Phase 3 (Sunset Valley): "A New Value for Every Resource."
  const p3Opacity = useTransform(
    scrollYProgress,
    [0.57, 0.64, 0.73, 0.79],
    shouldReduceMotion ? [0, 1, 1, 0] : [0, 1, 1, 0]
  );
  const p3Y = useTransform(
    scrollYProgress,
    [0.57, 0.64, 0.73, 0.79],
    shouldReduceMotion ? [0, 0, 0, 0] : [28, 0, 0, -20]
  );

  // Phase 4: Final CTA Panel (Grand entrance: scale 0.95 -> 1 with spring)
  const ctaRawScale = useTransform(
    scrollYProgress,
    [0.78, 0.88, 1.0],
    shouldReduceMotion ? [1, 1, 1] : [0.95, 1, 1]
  );
  const ctaScale = useSpring(ctaRawScale, { stiffness: 140, damping: 22, mass: 0.6 });

  const ctaRawY = useTransform(
    scrollYProgress,
    [0.78, 0.88, 1.0],
    shouldReduceMotion ? [0, 0, 0] : [40, 0, 0]
  );
  const ctaY = useSpring(ctaRawY, { stiffness: 140, damping: 22, mass: 0.6 });

  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.86, 1.0], [0, 1, 1]);

  // Scroll hint opacity (fades out within first 5% of scroll)
  const scrollHintOpacity = useTransform(scrollYProgress, [0.0, 0.05], [1, 0]);

  const phaseNavItems = [
    { id: 1 as const, icon: Wind, label: 'Turbines' },
    { id: 2 as const, icon: Building2, label: 'City' },
    { id: 3 as const, icon: SunMedium, label: 'Valley' },
    { id: 4 as const, icon: ArrowUpRight, label: 'Action' },
  ];

  return (
    <section
      ref={containerRef}
      id="closing-cta"
      aria-label="Closing Call To Action — Waste to Value Journey"
      className="relative w-full h-[320vh] bg-[#F6FAF7] selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* =====================================================================
          PINNED VIEWPORT (sticky top-0 h-screen w-full overflow-hidden)
          Pins during the 320vh scroll, scrubbing the 300 frames effortlessly.
          ===================================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* =====================================================================
            1. HARDWARE-ACCELERATED CANVAS LAYER (300 FRAMES)
            Renders frame 001 to 300 directly with sub-millisecond drawImage.
            ===================================================================== */}
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none bg-[#0F1F17]">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transform-gpu"
            aria-hidden="true"
          />

          {/* =====================================================================
              LIGHT-MODE GLASSMORPHISM TINT & SPOTLIGHT
              Soft mist overlay ensures text contrast >14:1 for ink-900.
              ===================================================================== */}
          <div
            className="absolute inset-0 bg-white/20 sm:bg-[#F6FAF7]/25 pointer-events-none"
            aria-hidden="true"
          />

          {/* Radial light spotlight in center to make text pop effortlessly */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(255,255,255,0.48)_0%,rgba(246,250,247,0.18)_60%,transparent_100%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Top seamless transition gradient from previous section */}
          <div
            className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#F6FAF7] via-[#F6FAF7]/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom subtle ambient gradient for depth */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#E8F4EC]/50 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* =====================================================================
            TOP NAVIGATION & PHASE TRACKER (Interactive desktop pills)
            ===================================================================== */}
        <div className="absolute top-5 sm:top-7 inset-x-0 z-30 flex justify-center px-4 pointer-events-auto">
          <nav
            aria-label="Navigasi tahap cinematic"
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D3EBDB]/80 shadow-md shadow-[#0F1F17]/5 text-xs font-jakarta transition-all duration-300"
          >
            {phaseNavItems.map((phase) => {
              const Icon = phase.icon;
              const isActive = currentPhase === phase.id;
              const isPast = currentPhase > phase.id;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => handleSelectPhase(phase.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#177A47] text-white font-semibold shadow-xs'
                      : isPast
                        ? 'bg-[#E8F4EC] text-[#177A47] font-medium'
                        : 'text-[#4A5D52] hover:text-[#0F1F17] hover:bg-[#E8F4EC]/50'
                  }`}
                  aria-label={`Tahap ${phase.id}: ${phase.label}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isPast ? 'text-[#177A47]' : 'text-[#A9D3B8]'}`} />
                  <span className="text-[11px] tracking-wide">{phase.label}</span>
                </button>
              );
            })}

            {/* Scroll progress bar */}
            <div className="w-12 h-1.5 bg-[#E8F4EC] rounded-full mx-1.5 overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-gradient-to-r from-[#177A47] to-[#2FA866] rounded-full transition-all duration-100 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progressVal * 100))}%` }}
              />
            </div>
          </nav>
        </div>

        {/* =====================================================================
            2. SEQUENTIAL TEXT REVEALS (TIED TO 300 FRAMES SCROLL)
            Compositor thread execution with zero frame drops.
            ===================================================================== */}

        {/* Phase 1: Turbines -> "Waste is not the end." */}
        <motion.div
          style={{ opacity: p1Opacity, y: p1Y }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 sm:px-8 text-center pointer-events-none transform-gpu will-change-transform"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
            {/* Phase eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] text-[11px] font-bold tracking-[0.15em] text-[#177A47] uppercase font-jakarta shadow-xs">
              <Wind className="w-3.5 h-3.5" />
              <span>THE TURBINES · TAHAP 01</span>
            </div>

            {/* Headline — Fraunces, ink-900 */}
            <h2 className="font-fraunces text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#0F1F17] leading-[1.12] text-balance">
              Waste is not the end.
            </h2>

            {/* Subline */}
            <p className="font-jakarta text-sm sm:text-base md:text-lg text-[#4A5D52] max-w-lg mx-auto leading-relaxed">
              Material bekas yang terpilah menyimpan potensi energi baru dan siklus kehidupan yang berkelanjutan.
            </p>
          </div>
        </motion.div>

        {/* Phase 2: City Lake -> "It is a new beginning." */}
        <motion.div
          style={{ opacity: p2Opacity, y: p2Y }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 sm:px-8 text-center pointer-events-none transform-gpu will-change-transform"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] text-[11px] font-bold tracking-[0.15em] text-[#177A47] uppercase font-jakarta shadow-xs">
              <Building2 className="w-3.5 h-3.5" />
              <span>THE CITY LAKE · TAHAP 02</span>
            </div>

            <h2 className="font-fraunces text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#0F1F17] leading-[1.12] text-balance">
              It is a new beginning.
            </h2>

            <p className="font-jakarta text-sm sm:text-base md:text-lg text-[#4A5D52] max-w-lg mx-auto leading-relaxed">
              Transformasi ekonomi sirkular menghubungkan rumah tangga, kota, dan ekosistem daur ulang modern.
            </p>
          </div>
        </motion.div>

        {/* Phase 3: Sunset Valley -> "A New Value for Every Resource." */}
        <motion.div
          style={{ opacity: p3Opacity, y: p3Y }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-5 sm:px-8 text-center pointer-events-none transform-gpu will-change-transform"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] text-[11px] font-bold tracking-[0.15em] text-[#177A47] uppercase font-jakarta shadow-xs">
              <SunMedium className="w-3.5 h-3.5" />
              <span>A NEW VALUE · TAHAP 03</span>
            </div>

            <h2 className="font-fraunces text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#0F1F17] leading-[1.12] text-balance italic">
              A New Value for Every Resource.
            </h2>

            <p className="font-jakarta text-sm sm:text-base md:text-lg text-[#4A5D52] max-w-lg mx-auto leading-relaxed">
              Dari limbah tak berharga menjadi nilai ekonomi nyata — bagi masyarakat, bagi bumi.
            </p>
          </div>
        </motion.div>

        {/* =====================================================================
            3. THE FINAL CTA PANEL (STRICT PRD COMPLIANCE)
            Grand entrance: bg-mint-100/95 (#E8F4EC/95), backdrop blur, rounded-[2rem],
            1px mint-200 border, soft spring scale 0.95 -> 1.
            ===================================================================== */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
            y: ctaY,
          }}
          className={`relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 transform-gpu will-change-transform transition-opacity duration-200 ${
            isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Main Card Container */}
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-3xl bg-[#E8F4EC]/95 backdrop-blur-xl border border-[#D3EBDB] shadow-2xl shadow-green-950/10 p-7 sm:p-11 md:p-14 lg:p-16 text-center">

            {/* Subtle decorative glowing background spots */}
            <div
              className="absolute -top-24 -right-24 w-60 h-60 bg-[#A9D3B8]/30 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#0E7C7B]/10 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Subtle circular motif (PRD signature element) */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-[0.07] pointer-events-none" aria-hidden="true">
              <Recycle className="w-24 h-24 sm:w-32 sm:h-32 text-[#177A47]" strokeWidth={0.8} />
            </div>

            {/* Eyebrow Badge */}
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#D3EBDB] text-[11px] font-bold tracking-wider text-[#177A47] uppercase font-jakarta mb-5 sm:mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2FA866]" />
              <span>WASTE-TO-VALUE MOVEMENT</span>
            </div>

            {/* Final Message (Requirement 4: Fraunces, text-balance, ink-900) */}
            <h2 className="relative font-fraunces text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-medium tracking-tight text-[#0F1F17] leading-[1.22] text-balance max-w-3xl mx-auto">
              Turn the habit of throwing away into the habit of{' '}
              <span className="relative inline-block">
                creating value
                {/* Lime highlight marker behind key phrase (PRD signature element) */}
                <span
                  className="absolute -inset-x-1 bottom-0.5 h-[0.35em] bg-[#E3F6B5]/75 -z-10 rounded-xs"
                  aria-hidden="true"
                />
              </span>
              .
            </h2>

            {/* Supporting Microcopy */}
            <p className="relative mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#4A5D52] font-jakarta max-w-2xl mx-auto leading-relaxed">
              Mulai dari rumah tangga Anda hari ini. Cek estimasi nilai material secara transparan,
              pilih mitra penyalur terverifikasi, dan pantau dampak lingkungan secara nyata.
            </p>

            {/* =====================================================================
                4. REQUIRED PRD ACTION BUTTONS (Requirement 4)
                Primary: 'Pindai Material Sekarang ↗' (green-600 -> green-700, /pindai)
                Secondary: 'Pelajari Metodologi' (Ghost/outline, green-700, /metodologi)
                Stacks vertically on mobile, row on desktop (Requirement 5)
                ===================================================================== */}
            <div className="relative mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary Action Button */}
              <Link
                href="/pindai"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#177A47] hover:bg-[#0F5F37] active:bg-[#0B4A2B] text-white font-semibold text-sm sm:text-base font-jakarta transition-all duration-200 shadow-lg shadow-[#177A47]/25 hover:shadow-xl hover:shadow-[#0F5F37]/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] focus-visible:ring-offset-2"
              >
                <span>Pindai Material Sekarang</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary Action Button */}
              <Link
                href="/metodologi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white/70 hover:bg-white border border-[#D3EBDB] hover:border-[#177A47]/40 text-[#0F5F37] font-semibold text-sm sm:text-base font-jakarta transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] focus-visible:ring-offset-2"
              >
                <span>Pelajari Metodologi</span>
              </Link>
            </div>

            {/* PRD Transparency & Trust Badges */}
            <div className="relative mt-8 sm:mt-10 pt-6 border-t border-[#D3EBDB]/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-[#4A5D52] font-jakarta">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
                <span>100% Harga Acuan Bertanggal</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
                <span>Mitra Terverifikasi &amp; Transparan</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
                <span>Dampak Lingkungan Terukur</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================================
            SCROLL HINT (At the bottom of viewport in Phase 1)
            ===================================================================== */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#D3EBDB]/80 text-xs font-medium text-[#4A5D52] shadow-xs font-jakarta">
            <span>Gulir untuk mengontrol perjalanan</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#177A47] animate-bounce" />
          </div>
        </motion.div>

        {/* =====================================================================
            MOBILE PHASE DOTS (bottom-center on small screens)
            ===================================================================== */}
        <div className="absolute bottom-14 inset-x-0 z-20 flex md:hidden items-center justify-center gap-2 pointer-events-none">
          {[1, 2, 3, 4].map((phase) => (
            <div
              key={phase}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentPhase === phase
                  ? 'bg-[#177A47] w-6'
                  : currentPhase > phase
                    ? 'bg-[#177A47]/40 w-1.5'
                    : 'bg-[#D3EBDB] w-1.5'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
