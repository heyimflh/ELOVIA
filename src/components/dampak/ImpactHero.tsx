'use client';

/**
 * ImpactHero.tsx  —  Hero Impact Garden Section
 * ───────────────────────────────────────────────────────────
 * Hybrid 2D/3D Architecture:
 *  - Layer 1 (Z-0)  : 2D Background image (hero.png) with soft vignetting
 *  - Layer 2 (Z-10) : Grounded 3D Diorama Island Canvas with OrbitControls & dynamic petals
 *  - Layer 3 (Z-20) : Glassmorphism UI Overlay (Biomass Telemetry, Atmospheric Absorption, Converted Materials)
 *
 * Polished to SaaS / Apple-grade design standards:
 *  - Uses standard ELOVIA global <Navbar /> at the top
 *  - Hero container wrapped in relative w-full h-[100dvh] pt-24 overflow-hidden
 *  - UI cards wrapped in pointer-events-none flex layout allowing canvas interactions
 */

import React, {
  useState,
  useRef,
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
  background: 'rgba(255, 255, 255, 0.40)',
  backdropFilter: 'blur(18px) saturate(160%)',
  WebkitBackdropFilter: 'blur(18px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.65)',
  borderRadius: '20px',
  color: '#0f2922',
  boxShadow: '0 8px 32px rgba(15, 41, 34, 0.06)',
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
function BiomassGauge({ level }: { level: GardenLevel }) {
  const C = Math.PI * 72; // ≈ 226.19
  const pct = level === 1 ? 0.384 : level === 2 ? 0.725 : 0.982;
  const offset = C * (1 - pct);
  const label = level === 1 ? '38.4%' : level === 2 ? '72.5%' : '98.2%';

  return (
    <div className="relative flex flex-col items-center justify-center my-1">
      <svg
        viewBox="0 0 200 112"
        className="w-44 h-24 overflow-visible"
        fill="none"
        aria-label={`${label} Soil Vitality`}
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
          stroke="rgba(15,41,34,0.12)"
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
        <span className="font-jetbrains text-[1.6rem] font-black leading-none text-[#0f2922] transition-all duration-500">
          {label}
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
  const [activeLevel, setActiveLevel] = useState<GardenLevel>(3);
  const [preset, setPreset] = useState<AtmospherePreset>('purify');
  const [isMounted, setIsMounted] = useState(false);

  // DOM refs for GSAP
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  // R3F canvas ref
  const canvasRef = useRef<MinimalGardenCanvasHandle>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP subtle scroll exit transitions
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Graceful fade & slide outward when user scrolls down to subsequent sections
      gsap.to([leftColRef.current, rightColRef.current], {
        opacity: 0,
        y: 20,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(bottomBarRef.current, {
        opacity: 0,
        y: 30,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleLevel = useCallback((l: GardenLevel) => setActiveLevel(l), []);
  const handlePreset = useCallback((p: AtmospherePreset) => setPreset(p), []);

  const scrollToNext = useCallback(() => {
    const nextElem = document.getElementById('personal-metrics') || document.getElementById('impact-ledger');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] pt-24 overflow-hidden"
      aria-label="ELOVIA Impact Garden Hero"
    >
      {/* ════════════════════════════════════════════════════════
          LAYER 1 — Fixed 2D Background Image (Z-0)
         ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src="/images/dampak/hero.png"
          alt="Magical blooming cherry tree with morning mist and sun rays"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        {/* Soft vignette to enhance glass card contrast and depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/40 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════
          LAYER 2 — Transparent Grounded 3D Diorama Canvas (Z-10)
         ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-10 pointer-events-auto"
        suppressHydrationWarning
      >
        {isMounted ? (
          <CanvasErrorBoundary>
            <React.Suspense fallback={null}>
              <MinimalGardenCanvas ref={canvasRef} level={activeLevel} />
            </React.Suspense>
          </CanvasErrorBoundary>
        ) : null}
      </div>

      {/* ════════════════════════════════════════════════════════
          LAYER 3 — Glassmorphism UI Overlay (Z-20)
          pointer-events-none container allowing 3D canvas interaction
         ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pt-28 pb-10 px-8 flex justify-between items-center pointer-events-none z-10">

        {/* ── LEFT COLUMN ──────────────────────────────────── */}
        <div
          ref={leftColRef}
          className="w-72 sm:w-80 flex flex-col gap-4 pointer-events-auto hidden lg:flex"
        >
          {/* Card 1 — Biomass Telemetry */}
          <div
            style={GLASS}
            className="p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-inter-tight text-sm font-bold text-[#0f2922]">
                Biomass Telemetry
              </span>
              <Leaf className="w-4 h-4 text-[#22c55e]" />
            </div>

            <BiomassGauge level={activeLevel} />

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
            className="p-5"
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
            <div className="bg-white/40 border border-white/60 rounded-2xl p-3 mb-3 flex items-center justify-between">
              <div>
                <p className="font-jetbrains text-xl font-black text-[#0f2922] leading-none transition-all duration-300">
                  {activeLevel === 1 ? '12 Trees / Yr' : activeLevel === 2 ? '34 Trees / Yr' : '62 Trees / Yr'}
                </p>
                <p className="font-inter-tight text-[10px] text-[#0f2922]/65 mt-0.5 transition-all duration-300">
                  {activeLevel === 1 ? '≈ 240 kg CO₂e offset' : activeLevel === 2 ? '≈ 685 kg CO₂e offset' : '≈ 1,248 kg CO₂e offset'}
                </p>
              </div>
              {/* Temperature dial */}
              <div className="w-11 h-11 rounded-full bg-white/70 border border-white flex flex-col items-center justify-center shadow-xs">
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

        {/* ── RIGHT COLUMN ─────────────────────────────────── */}
        <div
          ref={rightColRef}
          className="w-80 pointer-events-auto hidden lg:block"
        >
          {/* Card — Converted Materials */}
          <div style={GLASS} className="p-5">
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
      </div>

      {/* ── BOTTOM BAR — Level Toggle + Smooth Scroll Indicator ──── */}
      <div
        ref={bottomBarRef}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-auto z-20"
      >
        {/* Level toggle pill */}
        <div
          style={{ ...GLASS, borderRadius: '9999px', padding: '4px' }}
          className="flex items-center gap-1 shadow-md"
        >
          {([1, 2, 3] as GardenLevel[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLevel(l)}
              className={`px-4 py-1.5 rounded-full font-inter-tight text-xs font-bold transition-all duration-200 ${
                activeLevel === l
                  ? 'bg-emerald-500 text-white shadow-[0_3px_12px_rgba(16,185,129,0.35)] scale-105'
                  : 'text-[#0f2922]/70 hover:text-[#0f2922] hover:bg-white/40'
              }`}
            >
              Level {l}
            </button>
          ))}
        </div>

        {/* Scroll hint button */}
        <button
          type="button"
          onClick={scrollToNext}
          className="flex items-center gap-1.5 text-[#0f2922]/75 hover:text-[#177A47] font-inter-tight text-xs font-semibold transition-colors duration-200 group"
          aria-label="Scroll ke rincian metrik ekologis"
        >
          <ChevronDown className="w-3.5 h-3.5 text-[#22c55e] transition-transform group-hover:translate-y-0.5 animate-bounce" />
          <span>Scroll untuk Eksplorasi Metrik</span>
        </button>
      </div>
    </section>
  );
}

export default ImpactHero;
