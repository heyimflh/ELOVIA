'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  TreeDeciduous,
  Leaf,
  Layers,
  ChevronDown,
  Search,
  Bell,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Activity,
  Home,
  Sliders,
  Wind,
  Droplets,
  Sun,
  Flame,
} from 'lucide-react';
import { GardenScene } from './GardenScene';

// Material dataset for Right Column
const CONVERTED_MATERIALS = [
  {
    id: 'plastic',
    name: 'Recycled PET Plastic',
    category: 'Polymer Upcycling',
    quantity: '430 kg',
    purity: '99.8%',
    iconBg: 'bg-emerald-500/15 text-emerald-600',
    color: '#22c55e',
  },
  {
    id: 'cellulose',
    name: 'Regenerated Cellulose',
    category: 'Bio-Pulp Plant Fiber',
    quantity: '480 kg',
    purity: '99.2%',
    iconBg: 'bg-teal-500/15 text-teal-600',
    color: '#14b8a6',
  },
  {
    id: 'resin',
    name: 'Bio-Composite Resin',
    category: 'Structural Eco-Matrix',
    quantity: '320 kg',
    purity: '98.6%',
    iconBg: 'bg-lime-500/20 text-lime-700',
    color: '#84cc16',
  },
  {
    id: 'humus',
    name: 'Organic Humus Nutrient',
    category: 'Enriched Biosphere Soil',
    quantity: '890 kg',
    purity: '100%',
    iconBg: 'bg-emerald-600/15 text-emerald-700',
    color: '#16a34a',
  },
];

export function HeroGardenLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);
  const solutionsOverlayRef = useRef<HTMLDivElement>(null);

  // Active level state (Level 1, 2, 3)
  const [level, setLevel] = useState<number>(2);
  // Audio player state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'nutrients' | 'converted'>('converted');
  const [activePreset, setActivePreset] = useState<'cooling' | 'purify' | 'sync'>('purify');

  // GSAP ScrollTrigger timeline for UI translation and fading
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = containerRef.current;
    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      // 0% - 48%: Smoothly fade out and translate outwards horizontally
      tl.to(
        leftColRef.current,
        {
          x: -140,
          opacity: 0,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        rightColRef.current,
        {
          x: 140,
          opacity: 0,
          filter: 'blur(10px)',
          pointerEvents: 'none',
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        bottomBarRef.current,
        {
          y: 60,
          opacity: 0,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        headerBarRef.current,
        {
          y: -40,
          opacity: 0,
          ease: 'power2.inOut',
        },
        0
      );

      // 50% - 100%: Phase 2 Solutions & Metrics Overlay slides up from bottom
      tl.fromTo(
        solutionsOverlayRef.current,
        {
          y: 120,
          opacity: 0,
          filter: 'blur(10px)',
          pointerEvents: 'none',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto',
          ease: 'power2.out',
        },
        0.52
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-gradient-to-br from-[#e0f2fe] via-[#e6f4f1] to-[#dcfce7] selection:bg-[#22c55e]/20 selection:text-[#0f2922]"
      style={{
        background: 'linear-gradient(135deg, #e0f2fe 0%, #e6f4f1 45%, #dcfce7 100%)',
      }}
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        {/* Soft Dreamy Morning Ambient Lighting Orbs */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sky-200/40 blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-32 w-[650px] h-[650px] rounded-full bg-emerald-200/45 blur-[130px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full bg-teal-100/35 blur-[140px] pointer-events-none"
        />

        {/* 1. React Three Fiber Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <GardenScene
            containerRef={containerRef}
            activeLevel={level}
          />
        </div>

        {/* 2. Frosted Glassmorphism UI Overlay Layer */}
        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-6 sm:p-8">
          {/* =========================================================================
              HEADER BAR (Adapted from reference top bar with center & right pills)
             ========================================================================= */}
          <div
            ref={headerBarRef}
            className="w-full flex items-center justify-between gap-4 pointer-events-auto"
          >
            {/* Left Brand Badge */}
            <div className="flex items-center gap-2">
              <div
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
                }}
                className="px-4 py-2 rounded-full flex items-center gap-2.5 transition-all hover:bg-white/60"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
                </span>
                <span className="font-inter-tight text-xs font-bold uppercase tracking-wider text-[#0f2922]">
                  ELOVIA IMPACT GARDEN
                </span>
                <span className="hidden sm:inline-block font-jetbrains text-[10px] px-2 py-0.5 rounded-full bg-[#22c55e]/15 text-[#0f2922] font-semibold border border-[#22c55e]/30">
                  REAL-TIME 3D
                </span>
              </div>
            </div>

            {/* Center Floating Navigation Pill (adapted from reference) */}
            <div
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="hidden md:flex items-center gap-6 px-6 py-2.5 rounded-full"
            >
              <button
                type="button"
                className="text-[#0f2922] hover:text-[#22c55e] transition-colors p-1"
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="text-[#22c55e] p-1 relative"
                aria-label="Garden"
              >
                <TreeDeciduous className="w-4 h-4" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#22c55e]" />
              </button>
              <button
                type="button"
                className="text-[#0f2922]/70 hover:text-[#22c55e] transition-colors p-1"
                aria-label="Telemetry"
              >
                <Activity className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="text-[#0f2922]/70 hover:text-[#22c55e] transition-colors p-1"
                aria-label="Verification"
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>

            {/* Right Control & Profile Pill (adapted from reference) */}
            <div className="flex items-center gap-3">
              {/* Search Pill */}
              <div
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  border: '1px solid var(--glass-border)',
                }}
                className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full shadow-xs"
              >
                <Search className="w-3.5 h-3.5 text-[#0f2922]/60" />
                <input
                  type="text"
                  placeholder="Search biosfer..."
                  className="bg-transparent border-none text-xs text-[#0f2922] placeholder-[#0f2922]/50 focus:outline-none w-28 font-inter-tight"
                />
              </div>

              {/* Notification Button */}
              <button
                type="button"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  border: '1px solid var(--glass-border)',
                }}
                className="relative p-2.5 rounded-full hover:bg-white/60 transition-colors shadow-xs text-[#0f2922]"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#22c55e]" />
              </button>

              {/* Profile Avatar */}
              <div
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  border: '1px solid var(--glass-border)',
                }}
                className="p-1 rounded-full shadow-xs flex items-center"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#22c55e] to-emerald-300 flex items-center justify-center font-jetbrains text-xs font-bold text-white shadow-xs">
                  EL
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CENTER BRAND WATERMARK (Keeps center wide open for the 3D garden)
             ========================================================================= */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="font-jetbrains text-[11px] font-bold tracking-[0.25em] text-[#0f2922]/60 uppercase">
              CIRCULAR HARVEST BIOSHERE
            </span>
          </div>

          {/* =========================================================================
              LEFT COLUMN (Telemetry & Controls)
              Width 340px, absolute left-8 top-1/2 -translate-y-1/2, flex column, gap 24px
             ========================================================================= */}
          <div
            ref={leftColRef}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-[340px] flex flex-col gap-6 pointer-events-auto"
          >
            {/* Panel 1 (Biomass Telemetry with Semi-Circular SVG Dial) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="p-6 transition-all hover:shadow-[0_12px_40px_rgba(0,15,10,0.08)] group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-inter-tight text-sm font-bold text-[#0f2922] tracking-wide">
                  Biomass Telemetry
                </span>
                <span className="p-1.5 rounded-xl bg-white/50 text-[#22c55e]">
                  <Leaf className="w-4 h-4" />
                </span>
              </div>

              {/* Semi-Circular SVG Gauge Dial */}
              <div className="relative flex flex-col items-center justify-center my-2">
                <svg
                  className="w-48 h-32 overflow-visible"
                  viewBox="0 0 200 130"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="60%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  {/* Background Track Arc (from 180° to 0°) */}
                  <path
                    d="M 20 120 A 80 80 0 0 1 180 120"
                    fill="none"
                    stroke="rgba(15, 41, 34, 0.08)"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* Active Gradient Arc (98.2% fill) */}
                  <path
                    d="M 20 120 A 80 80 0 0 1 180 120"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset="8.5"
                    style={{
                      transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />

                  {/* Needle / Value Marker Dot */}
                  <circle
                    cx="176"
                    cy="114"
                    r="6.5"
                    fill="#ffffff"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    className="drop-shadow-sm"
                  />
                </svg>

                {/* Center Percentage in JetBrains Mono font */}
                <div className="absolute top-12 flex flex-col items-center text-center">
                  <span className="font-jetbrains text-3xl font-extrabold tracking-tight text-[#0f2922]">
                    98.2%
                  </span>
                  <span className="font-inter-tight text-[11px] font-semibold text-[#0f2922]/70 uppercase tracking-wider mt-0.5">
                    Soil Vitality
                  </span>
                </div>
              </div>

              {/* 4 Small Circular Indicator Dots (adapted from reference) */}
              <div className="flex items-center justify-center gap-3 mt-1 mb-4">
                {[
                  { label: 'Moisture', val: '88%' },
                  { label: 'pH', val: '6.8' },
                  { label: 'Nitrogen', val: '94%' },
                  { label: 'Mycelium', val: '99%' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] inline-block" />
                    <span className="font-jetbrains text-[9px] text-[#0f2922]/70 font-medium">
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Feature Link */}
              <div className="pt-3 border-t border-white/60 flex items-center justify-between text-[#0f2922]/70 text-xs hover:text-[#0f2922] transition-colors cursor-pointer">
                <span className="font-inter-tight font-medium">Real-time Soil Ecosystem</span>
                <span className="font-jetbrains text-[10px] text-[#22c55e] font-semibold">ACTIVE ●</span>
              </div>
            </motion.div>

            {/* Panel 2 (Atmosphere & Equivalent Carbon Absorption) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="p-6 transition-all hover:shadow-[0_12px_40px_rgba(0,15,10,0.08)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-inter-tight text-sm font-bold text-[#0f2922] tracking-wide">
                  Atmospheric Absorption
                </span>
                <span className="flex items-center gap-1.5 font-jetbrains text-[11px] text-[#22c55e] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Equivalent Carbon Absorption Metric Widget */}
              <div className="flex items-center justify-between bg-white/40 border border-white/70 rounded-2xl p-4 mb-4">
                <div className="space-y-0.5">
                  <span className="font-jetbrains text-2xl font-black text-[#0f2922] tracking-tight block">
                    62 Trees / Yr
                  </span>
                  <span className="font-inter-tight text-xs text-[#0f2922]/70 font-medium">
                    ≈ 1,248 kg CO₂e Equivalence
                  </span>
                </div>

                {/* Mini Equilibrium Dial (24°C, adapted from reference temperature dial) */}
                <div className="w-14 h-14 rounded-full bg-white/70 border border-white shadow-xs flex flex-col items-center justify-center">
                  <span className="font-jetbrains text-xs font-bold text-[#0f2922]">
                    24°C
                  </span>
                  <span className="text-[8px] font-inter-tight text-[#22c55e] font-semibold">
                    Optimal
                  </span>
                </div>
              </div>

              {/* 3 Pill Toggle Buttons (adapted from Cold | Wind | Sleep in reference) */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cooling', label: 'Cooling', icon: Wind },
                  { id: 'purify', label: 'Purify', icon: Droplets },
                  { id: 'sync', label: 'Carbon Sync', icon: Sun },
                ].map((btn) => {
                  const Icon = btn.icon;
                  const isActive = activePreset === btn.id;
                  return (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setActivePreset(btn.id as any)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[11px] font-inter-tight font-semibold transition-all ${
                        isActive
                          ? 'bg-[#22c55e] text-white shadow-[0_4px_12px_rgba(34,197,94,0.35)]'
                          : 'bg-white/50 text-[#0f2922]/80 hover:bg-white/80'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 mb-1" />
                      <span>{btn.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (Circular Nutrients / Converted Materials Leaderboard)
              Width 360px, absolute right-8 top-1/2 -translate-y-1/2
             ========================================================================= */}
          <div
            ref={rightColRef}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-[360px] flex flex-col gap-5 pointer-events-auto"
          >
            {/* Panel 1 (List of Converted Materials styled like playlist in reference) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="p-5 transition-all hover:shadow-[0_12px_40px_rgba(0,15,10,0.08)]"
            >
              {/* Segmented Pill Header Tabs (Shows | Movies in reference -> Nutrients | Converted) */}
              <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-white/60">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('converted')}
                    className={`font-inter-tight text-xs font-bold transition-colors ${
                      activeTab === 'converted' ? 'text-[#0f2922]' : 'text-[#0f2922]/50 hover:text-[#0f2922]'
                    }`}
                  >
                    Converted Materials
                  </button>
                  <span className="text-[#0f2922]/30 text-xs">|</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('nutrients')}
                    className={`font-inter-tight text-xs font-bold transition-colors ${
                      activeTab === 'nutrients' ? 'text-[#0f2922]' : 'text-[#0f2922]/50 hover:text-[#0f2922]'
                    }`}
                  >
                    Nutrient Output
                  </button>
                </div>

                <span className="font-jetbrains text-[10px] px-2 py-0.5 rounded-md bg-white/60 text-[#0f2922] font-semibold border border-white">
                  4 ITEMS
                </span>
              </div>

              {/* Converted Material Playlist Rows */}
              <div className="space-y-2">
                {CONVERTED_MATERIALS.map((mat) => (
                  <div
                    key={mat.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/35 hover:bg-white/65 border border-white/40 transition-all cursor-pointer group"
                  >
                    {/* Left: Circular Icon & Info */}
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${mat.iconBg} flex items-center justify-center shadow-xs transition-transform group-hover:scale-105`}>
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-inter-tight text-xs font-bold text-[#0f2922] tracking-tight group-hover:text-[#22c55e] transition-colors">
                          {mat.name}
                        </div>
                        <div className="text-[10px] text-[#0f2922]/60 font-inter-tight">
                          {mat.category}
                        </div>
                      </div>
                    </div>

                    {/* Right: Quantity in JetBrains Mono font */}
                    <div className="text-right">
                      <div className="font-jetbrains text-xs font-bold text-[#0f2922]">
                        {mat.quantity}
                      </div>
                      <div className="font-jetbrains text-[10px] text-[#22c55e] font-semibold">
                        {mat.purity} pure
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots (matching • • • — — in reference) */}
              <div className="flex items-center justify-center gap-1.5 pt-4">
                <span className="w-4 h-1.5 rounded-full bg-[#22c55e]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f2922]/20" />
              </div>
            </motion.div>

            {/* Panel 2 (Bottom Acoustic / Stream Player - matching reference music player) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="p-4 transition-all hover:shadow-[0_12px_40px_rgba(0,15,10,0.08)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-0.5">
                  <span className="font-inter-tight text-xs font-bold text-[#0f2922] block">
                    Acoustic Biosphere Feed
                  </span>
                  <span className="text-[10px] text-[#0f2922]/60 font-jetbrains">
                    432 Hz Morning Canopy Audio
                  </span>
                </div>
                <div className="flex items-center gap-0.5 h-4">
                  {[40, 90, 60, 100, 50].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 rounded-full bg-[#22c55e] animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Scrubber Progress Bar */}
              <div className="w-full bg-black/10 rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="bg-[#22c55e] h-full w-2/3 rounded-full" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between text-[#0f2922]">
                <span className="font-jetbrains text-[9px] text-[#0f2922]/60">02:14 / 04:30</span>
                <div className="flex items-center gap-3">
                  <button type="button" className="text-[#0f2922]/70 hover:text-[#0f2922] transition-colors">
                    <SkipBack className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center hover:bg-[#16a34a] transition-all shadow-xs"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                  <button type="button" className="text-[#0f2922]/70 hover:text-[#0f2922] transition-colors">
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button type="button" className="text-[#0f2922]/60 hover:text-[#0f2922]">
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              BOTTOM BAR (Level Up & Scroll Hint)
              Absolute bottom-8 left-1/2 -translate-x-1/2
             ========================================================================= */}
          <div
            ref={bottomBarRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-auto"
          >
            {/* Pill-shaped glass container holding 3 toggle buttons with a lime active state */}
            <div
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid var(--glass-border)',
                borderRadius: '9999px',
                boxShadow: '0 8px 32px rgba(0, 15, 10, 0.05)',
              }}
              className="p-1.5 flex items-center gap-1.5 shadow-lg"
            >
              {[
                { id: 1, label: 'Level 1: Emergence' },
                { id: 2, label: 'Level 2: Vitality' },
                { id: 3, label: 'Level 3: Transcendence' },
              ].map((lvl) => {
                const isActive = level === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setLevel(lvl.id)}
                    className={`px-5 py-2 rounded-full font-inter-tight text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#22c55e] text-white shadow-[0_4px_16px_rgba(34,197,94,0.35)] scale-105'
                        : 'text-[#0f2922]/75 hover:text-[#0f2922] hover:bg-white/50'
                    }`}
                  >
                    {lvl.label}
                  </button>
                );
              })}
            </div>

            {/* Scroll Hint */}
            <div className="flex items-center gap-1.5 text-[#0f2922]/70 font-inter-tight text-xs font-semibold animate-bounce">
              <ChevronDown className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Scroll for Scrollytelling 3D</span>
            </div>
          </div>

          {/* =========================================================================
              PHASE 2 OVERLAY ("Solutions/Metrics" Glassmorphism Card)
              Revealed during Scroll Progress 50% - 100%
             ========================================================================= */}
          <div
            ref={solutionsOverlayRef}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl pointer-events-none opacity-0"
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(28px) saturate(160%)',
                border: '1px solid rgba(255, 255, 255, 0.85)',
                borderRadius: '32px',
                boxShadow: '0 20px 60px rgba(0, 25, 15, 0.12)',
              }}
              className="p-8 sm:p-10 pointer-events-auto"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/15 text-[#0f2922] border border-[#22c55e]/30 font-jetbrains text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 text-[#22c55e]" />
                    Verified Environmental Solutions
                  </div>
                  <h2 className="font-inter-tight text-2xl sm:text-3xl font-extrabold text-[#0f2922] tracking-tight">
                    Circular Impact Ledger & Solutions
                  </h2>
                </div>

                <a
                  href="#metrics-ledger"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-inter-tight text-xs font-bold shadow-md transition-all self-start sm:self-auto hover:scale-105"
                >
                  <span>Explore Verification Ledger</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Metric Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-white/50 border border-white/80">
                  <span className="font-jetbrains text-[10px] text-[#0f2922]/60 uppercase tracking-wider block mb-1">
                    Net Carbon Captured
                  </span>
                  <span className="font-jetbrains text-2xl font-black text-[#0f2922] block">
                    1,248.5 <span className="text-xs text-[#22c55e]">kg</span>
                  </span>
                  <span className="text-[10px] text-[#22c55e] font-semibold mt-1 inline-block">
                    +14.2% this month
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/50 border border-white/80">
                  <span className="font-jetbrains text-[10px] text-[#0f2922]/60 uppercase tracking-wider block mb-1">
                    Conversion Efficiency
                  </span>
                  <span className="font-jetbrains text-2xl font-black text-[#0f2922] block">
                    99.4%
                  </span>
                  <span className="text-[10px] text-[#22c55e] font-semibold mt-1 inline-block">
                    Zero-landfill certified
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/50 border border-white/80">
                  <span className="font-jetbrains text-[10px] text-[#0f2922]/60 uppercase tracking-wider block mb-1">
                    Restored Canopy
                  </span>
                  <span className="font-jetbrains text-2xl font-black text-[#0f2922] block">
                    4.8 <span className="text-xs text-[#22c55e]">Ha</span>
                  </span>
                  <span className="text-[10px] text-[#22c55e] font-semibold mt-1 inline-block">
                    Rainforest sanctuary
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/50 border border-white/80">
                  <span className="font-jetbrains text-[10px] text-[#0f2922]/60 uppercase tracking-wider block mb-1">
                    Verification ID
                  </span>
                  <span className="font-jetbrains text-xs font-bold text-[#0f2922] block mt-1 truncate">
                    #ELOVIA-89247-BIO
                  </span>
                  <span className="text-[10px] text-[#0f2922]/60 font-jetbrains mt-2 inline-block">
                    Smart contract verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

