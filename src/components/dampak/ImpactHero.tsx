'use client';

/**
 * ImpactHero.tsx  —  Hero Impact Garden Section
 * ───────────────────────────────────────────────────────────
 * Hybrid 2D/3D Architecture:
 *
 *  Z-0  │ Layer 1 — Next.js <Image> fixed background (hero.png)
 *  Z-10 │ Layer 2 — MinimalGardenCanvas (transparent R3F, petals + island)
 *  Z-20 │ Layer 3 — Glassmorphism UI overlay (GSAP-animated)
 *
 * The <section> is h-[300vh] so scroll has room to trigger animations.
 * Everything inside the sticky <div> stays in the viewport.
 *
 * GSAP ScrollTrigger drives:
 *  0% → 40%  : Left/Right UI columns fade + translate outward (DOM only).
 *  10% → 60% : Camera dollies forward on Z (lightweight camera.position.z write).
 *  60% → 100%: Camera rotates slightly; bottom overlay slides up.
 */

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  lazy,
} from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Leaf,
  ChevronDown,
  Wind,
  Droplets,
  Sun,
  ShieldCheck,
  Sparkles as SparklesIcon,
  ArrowRight,
  Activity,
  TreeDeciduous,
  ExternalLink,
} from 'lucide-react';

// Lazy-load the R3F canvas so it never blocks the first meaningful paint
const MinimalGardenCanvas = lazy(
  () => import('./MinimalGardenCanvas')
);

import type { MinimalGardenCanvasHandle } from './MinimalGardenCanvas';

// ─────────────────── Static data ─────────────────────────────────
const CONVERTED_MATERIALS = [
  {
    id: 'plastic',
    label: 'Recycled PET Plastic',
    sub: 'Polymer Upcycling',
    value: '430 kg',
    purity: '99.8%',
    dot: '#22c55e',
  },
  {
    id: 'cellulose',
    label: 'Regenerated Cellulose',
    sub: 'Bio-Pulp Plant Fiber',
    value: '480 kg',
    purity: '99.2%',
    dot: '#14b8a6',
  },
  {
    id: 'resin',
    label: 'Bio-Composite Resin',
    sub: 'Structural Eco-Matrix',
    value: '320 kg',
    purity: '98.6%',
    dot: '#84cc16',
  },
  {
    id: 'humus',
    label: 'Organic Humus Nutrient',
    sub: 'Enriched Biosphere Soil',
    value: '890 kg',
    purity: '100%',
    dot: '#16a34a',
  },
];

const ATMOSPHERE_PRESETS = [
  { id: 'cooling', label: 'Cooling', Icon: Wind },
  { id: 'purify', label: 'Purify', Icon: Droplets },
  { id: 'sync', label: 'Carbon Sync', Icon: Sun },
] as const;

type AtmospherePreset = 'cooling' | 'purify' | 'sync';
type GardenLevel = 1 | 2 | 3;

// ─────────── Shared glassmorphism CSS-in-JS object ───────────────
const GLASS: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.30)',
  backdropFilter: 'blur(16px) saturate(160%)',
  WebkitBackdropFilter: 'blur(16px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.50)',
  borderRadius: '20px',
  color: '#0f2922',
};

// ─────────── Safe Error Boundary for 3D Canvas ───────────────────
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: unknown) {
    console.warn('[ImpactHero] 3D Canvas error caught safely:', err);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ─────────── Biomass Gauge (SVG semi-circle) ──────────────────────
function BiomassGauge() {
  // Arc from 180° to 0° (left to right) around cx=100, cy=100, r=72
  // Full circumference of semicircle ≈ π * 72 = 226.19
  // 98.2% fill → dashoffset = 226.19 * (1 - 0.982) ≈ 4.07
  const C = Math.PI * 72; // ≈ 226.19
  const pct = 0.982;
  const offset = C * (1 - pct);

  return (
    <div className="relative flex flex-col items-center justify-center my-1">
      <svg
        viewBox="0 0 200 112"
        className="w-44 h-24 overflow-visible"
        fill="none"
        aria-label="98.2% Soil Vitality"
      >
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="55%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          stroke="rgba(15,41,34,0.10)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d="M 28 100 A 72 72 0 0 1 172 100"
          stroke="url(#gaugeGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)' }}
        />
        {/* Needle dot */}
        <circle
          cx={28 + (172 - 28) * pct}
          cy={100 - Math.sin(Math.PI * pct) * 72}
          r="6"
          fill="#fff"
          stroke="#22c55e"
          strokeWidth="3"
        />
      </svg>

      {/* Percentage label */}
      <div className="absolute top-9 flex flex-col items-center">
        <span className="font-jetbrains text-[1.6rem] font-black leading-none text-[#0f2922]">
          98.2%
        </span>
        <span className="font-inter-tight text-[10px] font-semibold tracking-widest text-[#0f2922]/70 uppercase mt-0.5">
          Soil Vitality
        </span>
      </div>
    </div>
  );
}

// ─────────────────────── ImpactHero ──────────────────────────────
export function ImpactHero() {
  // ── local state (UI-only, no effect on canvas) ──
  const [level, setLevel] = useState<GardenLevel>(2);
  const [preset, setPreset] = useState<AtmospherePreset>('purify');
  const [isMounted, setIsMounted] = useState(false);

  // ── DOM refs for GSAP (never cause re-renders) ──
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);

  // ── R3F canvas ref (access to live camera) ──
  const canvasRef = useRef<MinimalGardenCanvasHandle>(null);

  // Mount guard for hydration-safe lazy canvas
  useEffect(() => { setIsMounted(true); }, []);

  // ── GSAP ScrollTrigger setup ──────────────────────────────────
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── 1. UI columns: fade + slide outward, 0% → 40% ─────
      const columnTween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '40% top',
          scrub: 1.4,
        },
      });
      columnTween
        .to(leftColRef.current, {
          x: -72,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
        }, 0)
        .to(rightColRef.current, {
          x: 72,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'power2.inOut',
        }, 0)
        .to(headerRef.current, {
          y: -36,
          opacity: 0,
          ease: 'power2.inOut',
        }, 0)
        .to(bottomBarRef.current, {
          y: 48,
          opacity: 0,
          ease: 'power2.inOut',
        }, 0);

      // ── 2. Camera dolly-in: 10% → 60% ─────────────────────
      ScrollTrigger.create({
        trigger: section,
        start: '10% top',
        end: '60% top',
        scrub: 1.8,
        onUpdate: (self) => {
          const cam = canvasRef.current?.camera;
          if (!cam) return;
          // Z goes from 11 → 5.5 (dolly in)
          const startZ = 11;
          const endZ = 5.5;
          cam.position.z = startZ + (endZ - startZ) * self.progress;
          // Slight downward tilt for a cinematic sweep-low
          cam.position.y = 2.5 - self.progress * 1.0;
          cam.lookAt(0, 0.6, 0);
        },
      });

      // ── 3. Camera rotation + next-section overlay: 60% → 100% ──
      ScrollTrigger.create({
        trigger: section,
        start: '60% top',
        end: 'bottom bottom',
        scrub: 1.6,
        onUpdate: (self) => {
          const cam = canvasRef.current?.camera;
          if (!cam) return;
          // Gentle orbit: rotate camera around Y axis by 25°
          const angle = self.progress * (Math.PI * 0.14);
          const r = Math.hypot(cam.position.x, cam.position.z);
          cam.position.x = Math.sin(angle) * r;
          cam.position.z = Math.cos(angle) * (r > 0 ? r : 5.5);
          cam.lookAt(0, 0.5, 0);
        },
      });

      // Next-section card slides up 60% → 100%
      gsap.fromTo(
        nextSectionRef.current,
        { y: 110, opacity: 0, filter: 'blur(10px)', pointerEvents: 'none' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: '62% top',
            end: 'bottom bottom',
            scrub: 1.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Stable callbacks so level/preset changes don't re-create effects
  const handleLevel = useCallback((l: GardenLevel) => setLevel(l), []);
  const handlePreset = useCallback((p: AtmospherePreset) => setPreset(p), []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[300vh]"
      aria-label="ELOVIA Impact Garden Hero"
    >
      {/* ════════════════════════════════════════════════════════
          LAYER 1 — Fixed 2D Background Image (Z-0)
          Never animated; stays perfectly still for zero rendering cost.
         ════════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/images/dampak/hero.png"
          alt="Breathtaking magical blooming tree with morning mist and sun rays"
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover"
          style={{ willChange: 'auto' }} // explicitly opt-out of GPU layer
        />
        {/* Soft vignette to improve glass card readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40 pointer-events-none" />
        {/* Left edge softener */}
        <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        {/* Right edge softener */}
        <div className="absolute inset-y-0 right-0 w-56 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════
          STICKY VIEWPORT — 100vh, everything inside here
         ════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ════════════════════════════════════════════════════
            LAYER 2 — Transparent R3F Canvas (Z-10)
            Separated component → no re-renders when UI state changes.
           ════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 z-10 pointer-events-auto"
          suppressHydrationWarning
        >
          {isMounted ? (
            <CanvasErrorBoundary>
              <React.Suspense fallback={null}>
                <MinimalGardenCanvas ref={canvasRef} />
              </React.Suspense>
            </CanvasErrorBoundary>
          ) : null}
        </div>

        {/* ════════════════════════════════════════════════════
            LAYER 3 — Glassmorphism UI Overlay (Z-20)
           ════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 z-20 pointer-events-none">

          {/* ── HEADER BAR ───────────────────────────────── */}
          <div
            ref={headerRef}
            className="absolute top-0 left-0 right-0 flex items-center justify-between gap-4 px-6 sm:px-8 pt-5 pointer-events-auto"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Brand badge */}
            <div
              style={GLASS}
              className="px-4 py-2 flex items-center gap-2.5 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-[#22c55e] opacity-70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              </span>
              <span className="font-inter-tight text-xs font-bold uppercase tracking-wider text-[#0f2922]">
                ELOVIA Impact Garden
              </span>
              <span className="hidden sm:inline font-jetbrains text-[10px] px-2 py-0.5 rounded-full bg-[#22c55e]/15 text-[#0f2922] font-semibold border border-[#22c55e]/30">
                REAL-TIME 3D
              </span>
            </div>

            {/* Center nav pills */}
            <div
              style={GLASS}
              className="hidden md:flex items-center gap-5 px-6 py-2.5 shadow-sm"
            >
              {[TreeDeciduous, Activity, ShieldCheck].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className={`p-1 transition-colors ${i === 0 ? 'text-[#22c55e]' : 'text-[#0f2922]/60 hover:text-[#22c55e]'}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Stats chip */}
            <div
              style={GLASS}
              className="flex items-center gap-3 px-4 py-2.5 shadow-sm"
            >
              <div>
                <p className="font-jetbrains text-[9px] text-[#0f2922]/60 uppercase tracking-wider">
                  CO₂ Captured
                </p>
                <p className="font-jetbrains text-sm font-black text-[#0f2922] tracking-tight leading-none">
                  1,248.5 <span className="text-[#22c55e] text-[10px]">kg</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── LEFT COLUMN ──────────────────────────────── */}
          <div
            ref={leftColRef}
            className="absolute left-6 sm:left-8 top-1/2 -translate-y-1/2 w-72 flex flex-col gap-5 pointer-events-auto hidden lg:flex"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Card 1 — Biomass Telemetry */}
            <div
              style={GLASS}
              className="p-5 shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-inter-tight text-sm font-bold text-[#0f2922]">
                  Biomass Telemetry
                </span>
                <Leaf className="w-4 h-4 text-[#22c55e]" />
              </div>

              <BiomassGauge />

              {/* 4 mini indicator dots */}
              <div className="flex justify-center gap-4 mt-2 mb-3">
                {[
                  { l: 'Moisture', v: '88%' },
                  { l: 'pH', v: '6.8' },
                  { l: 'N₂', v: '94%' },
                  { l: 'Mycelium', v: '99%' },
                ].map((dot) => (
                  <div key={dot.l} className="flex flex-col items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"
                      style={{ boxShadow: '0 0 7px #22c55e' }}
                    />
                    <span className="font-jetbrains text-[9px] text-[#0f2922]/65 font-medium">
                      {dot.v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/60 pt-3 flex justify-between items-center">
                <span className="font-inter-tight text-[11px] text-[#0f2922]/70 font-medium">
                  Soil Ecosystem
                </span>
                <span className="font-jetbrains text-[10px] font-bold text-[#22c55e]">
                  ACTIVE ●
                </span>
              </div>
            </div>

            {/* Card 2 — Atmospheric Absorption */}
            <div
              style={GLASS}
              className="p-5 shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-inter-tight text-sm font-bold text-[#0f2922]">
                  Atmospheric Absorption
                </span>
                <span className="flex items-center gap-1 font-jetbrains text-[10px] font-bold text-[#22c55e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Main metric */}
              <div className="bg-white/40 border border-white/60 rounded-2xl p-3.5 mb-3 flex items-center justify-between">
                <div>
                  <p className="font-jetbrains text-xl font-black text-[#0f2922] leading-none">
                    62 Trees / Yr
                  </p>
                  <p className="font-inter-tight text-[10px] text-[#0f2922]/65 mt-0.5">
                    ≈ 1,248 kg CO₂e offset
                  </p>
                </div>
                {/* Temperature dial */}
                <div className="w-12 h-12 rounded-full bg-white/70 border border-white flex flex-col items-center justify-center shadow-xs">
                  <span className="font-jetbrains text-xs font-bold text-[#0f2922]">24°C</span>
                  <span className="font-inter-tight text-[7px] text-[#22c55e] font-semibold">Optimal</span>
                </div>
              </div>

              {/* Quick-action pill buttons */}
              <div className="grid grid-cols-3 gap-1.5">
                {ATMOSPHERE_PRESETS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handlePreset(id)}
                    className={`flex flex-col items-center py-2 rounded-xl text-[10px] font-inter-tight font-semibold transition-all duration-200 ${
                      preset === id
                        ? 'bg-[#22c55e] text-white shadow-[0_3px_10px_rgba(34,197,94,0.35)]'
                        : 'bg-white/45 text-[#0f2922]/75 hover:bg-white/70'
                    }`}
                  >
                    <Icon className="w-3 h-3 mb-0.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────── */}
          <div
            ref={rightColRef}
            className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 w-80 pointer-events-auto hidden lg:block"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Card — Converted Materials (playlist style) */}
            <div style={GLASS} className="p-5 shadow-md">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/55">
                <span className="font-inter-tight text-sm font-bold text-[#0f2922]">
                  Converted Materials
                </span>
                <span className="font-jetbrains text-[10px] px-2 py-0.5 rounded-md bg-white/55 text-[#0f2922] font-semibold border border-white">
                  4 ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {CONVERTED_MATERIALS.map((mat) => (
                  <div
                    key={mat.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/30 hover:bg-white/55 border border-white/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Small circular icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{ background: `${mat.dot}22`, border: `1.5px solid ${mat.dot}55` }}
                      >
                        <Leaf className="w-3.5 h-3.5" style={{ color: mat.dot }} />
                      </div>
                      <div>
                        <p className="font-inter-tight text-xs font-bold text-[#0f2922] leading-tight group-hover:text-[#22c55e] transition-colors">
                          {mat.label}
                        </p>
                        <p className="font-inter-tight text-[10px] text-[#0f2922]/55">
                          {mat.sub}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-jetbrains text-xs font-bold text-[#0f2922]">{mat.value}</p>
                      <p className="font-jetbrains text-[9px] text-[#22c55e] font-semibold">{mat.purity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination dots */}
              <div className="flex items-center justify-center gap-1.5 pt-3.5">
                <span className="w-4 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR — Level Toggle + Scroll Hint ──── */}
          <div
            ref={bottomBarRef}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Level toggle pill */}
            <div
              style={{ ...GLASS, borderRadius: '9999px', padding: '5px' }}
              className="flex items-center gap-1 shadow-md"
            >
              {([1, 2, 3] as GardenLevel[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => handleLevel(l)}
                  className={`px-5 py-2 rounded-full font-inter-tight text-xs font-bold transition-all duration-250 ${
                    level === l
                      ? 'bg-[#22c55e] text-white shadow-[0_3px_14px_rgba(34,197,94,0.40)] scale-105'
                      : 'text-[#0f2922]/70 hover:text-[#0f2922] hover:bg-white/40'
                  }`}
                >
                  Level {l}
                </button>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="flex items-center gap-1.5 text-[#0f2922]/75 font-inter-tight text-xs font-semibold animate-bounce">
              <ChevronDown className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Scroll for Scrollytelling 3D</span>
            </div>
          </div>

          {/* ── PHASE 2 OVERLAY — Solutions (slides up at 60%) ── */}
          <div
            ref={nextSectionRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl pointer-events-none opacity-0"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.60)',
                backdropFilter: 'blur(28px) saturate(170%)',
                WebkitBackdropFilter: 'blur(28px) saturate(170%)',
                border: '1px solid rgba(255, 255, 255, 0.80)',
                borderRadius: '28px',
                boxShadow: '0 20px 60px rgba(0, 25, 15, 0.14)',
              }}
              className="p-7 sm:p-10 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 font-jetbrains text-[10px] font-bold text-[#0f2922] uppercase tracking-wider mb-1.5">
                    <SparklesIcon className="w-3 h-3 text-[#22c55e]" />
                    Verified Environmental Solutions
                  </div>
                  <h2 className="font-inter-tight text-xl sm:text-2xl font-extrabold text-[#0f2922] tracking-tight">
                    Circular Impact Ledger & Solutions
                  </h2>
                </div>
                <a
                  href="#impact-ledger"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-inter-tight text-xs font-bold shadow-md transition-all self-start sm:self-auto hover:scale-105"
                >
                  Explore Ledger
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Metric cards grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                {[
                  { label: 'Carbon Captured', value: '1,248.5 kg', note: '+14.2% this month', accent: '#22c55e' },
                  { label: 'Conversion Rate', value: '99.4%', note: 'Zero-landfill cert.', accent: '#14b8a6' },
                  { label: 'Restored Canopy', value: '4.8 Ha', note: 'Rainforest sanctuary', accent: '#84cc16' },
                  { label: 'Verification ID', value: '#ELOVIA-89247', note: 'Smart contract ✓', accent: '#22c55e' },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-white/50 border border-white/80"
                  >
                    <p className="font-jetbrains text-[9px] text-[#0f2922]/55 uppercase tracking-wider mb-1">
                      {m.label}
                    </p>
                    <p className="font-jetbrains text-lg font-black text-[#0f2922] leading-tight truncate">
                      {m.value}
                    </p>
                    <p className="font-inter-tight text-[10px] font-semibold mt-1" style={{ color: m.accent }}>
                      {m.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div> {/* end Layer 3 */}
      </div> {/* end sticky viewport */}
    </section>
  );
}
