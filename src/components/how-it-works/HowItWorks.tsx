'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  FileText,
  Layers,
  Sparkles,
  Compass,
  Scale,
  Calculator,
  ShieldCheck,
  Truck,
  Clock,
  Wallet,
  Sprout,
  TrendingUp,
} from 'lucide-react';

import { StageCard, type StageBullet } from './StageCard';
import { TimelineNode } from './TimelineNode';
import { TiltCard } from './TiltCard';
import { ValueFactors } from './ValueFactors';
import { MaterialCategoriesMockup } from './mockups/MaterialCategoriesMockup';
import { ScannerMockup } from './mockups/ScannerMockup';
import { MarketplaceMockup } from './mockups/MarketplaceMockup';
import { ValueCreatedMockup } from './mockups/ValueCreatedMockup';

interface StageData {
  number: string;
  badge: string;
  title: string;
  highlightedWord: string;
  description: string;
  bullets: StageBullet[];
  mockup: React.ReactNode;
}

const STAGES: StageData[] = [
  {
    number: '01',
    badge: 'Tahap 01 · Kenali',
    title: 'Material Bekas Bukan Akhir, Melainkan Awal',
    highlightedWord: 'Bukan Akhir',
    description:
      'Material bekas bukan akhir, melainkan awal. Kenali jenis material yang Anda miliki. Setiap sampah anorganik terpilah memiliki potensi siklus hidup baru dan nilai ekonomi yang nyata.',
    bullets: [
      {
        icon: FileText,
        text: '4 Kategori material utama: Kertas & Karton, Plastik, Logam, dan Kaca.',
      },
      {
        icon: Layers,
        text: 'Panduan pemilahan berbasis standar mutu SNI dan kebutuhan industri daur ulang.',
      },
      {
        icon: Compass,
        text: 'Akses katalog terbuka tanpa hambatan registrasi di awal.',
      },
    ],
    mockup: <MaterialCategoriesMockup />,
  },
  {
    number: '02',
    badge: 'Tahap 02 · Pindai',
    title: 'Gunakan Waste Value Scanner untuk Nilai Transparan',
    highlightedWord: 'Nilai Transparan',
    description:
      'Gunakan Waste Value Scanner. Masukkan berat dan kualitas untuk melihat estimasi potensi nilainya yang transparan.',
    bullets: [
      {
        icon: Scale,
        text: 'Input berat presisi mulai 0,1 kg dengan chip estimasi cepat.',
      },
      {
        icon: Sparkles,
        text: 'Evaluasi mutu 3 tingkat: Bersih-kering, Cukup, dan Kotor-basah.',
      },
      {
        icon: Calculator,
        text: 'Rentang nilai objektif berdasarkan harga acuan mitra agregator terverifikasi.',
      },
    ],
    mockup: <ScannerMockup />,
  },
  {
    number: '03',
    badge: 'Tahap 03 · Salurkan',
    title: 'Temukan Mitra Terdekat & Jadwalkan Penyaluran',
    highlightedWord: 'Mitra Terdekat',
    description:
      'Temukan mitra terdekat, bandingkan harga indikatif, dan jadwalkan penjemputan atau pengantaran dengan mudah.',
    bullets: [
      {
        icon: ShieldCheck,
        text: 'Direktori bank sampah, agregator resmi, dan pengepul berizin resmi.',
      },
      {
        icon: Truck,
        text: 'Dua opsi fleksibel: Penjemputan ke alamat (Pickup) atau Antar mandiri (Drop-off).',
      },
      {
        icon: Clock,
        text: 'Pelacakan armada dan verifikasi timbangan transparan di lokasi.',
      },
    ],
    mockup: <MarketplaceMockup />,
  },
  {
    number: '04',
    badge: 'Tahap 04 · Dampak',
    title: 'Pencatatan Saldo Nyata di EcoWallet & Impact Garden',
    highlightedWord: 'Saldo Nyata',
    description:
      'Material yang tersalurkan dicatat sebagai pendapatan di EcoWallet dan menumbuhkan Impact Garden Anda.',
    bullets: [
      {
        icon: Wallet,
        text: 'Saldo terkonfirmasi masuk ke buku besar digital tanpa potongan tersembunyi.',
      },
      {
        icon: Sprout,
        text: 'Visualisasi Impact Garden mekar bertahap saat transaksi berstatus Selesai.',
      },
      {
        icon: TrendingUp,
        text: 'Laporan metrik reduksi jejak karbon (CO₂e) dan poin Circular Champions.',
      },
    ],
    mockup: <ValueCreatedMockup />,
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 70%'],
  });

  // Track height transform for the fill-line
  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['100%', '100%'] : ['0%', '100%']
  );

  // Active state for each node
  const [activeNodes, setActiveNodes] = useState<boolean[]>([true, false, false, false]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (shouldReduceMotion) {
      setActiveNodes([true, true, true, true]);
      return;
    }
    setActiveNodes([
      latest >= 0.05,
      latest >= 0.32,
      latest >= 0.58,
      latest >= 0.82,
    ]);
  });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#F6FAF7] text-[#0F1F17] overflow-hidden selection:bg-[#E8F4EC] selection:text-[#177A47]"
    >
      {/* 1. Subtle 4-6% Opacity Dot-Grid Pattern (bg-mist-50) */}
      <div
        className="absolute inset-0 bg-eco-grid opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Concentric Radar Rings Background Accent (Reference Style) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[720px] sm:w-[960px] sm:h-[960px] rounded-full border border-[#D3EBDB]/40 pointer-events-none -z-0">
        <div className="absolute inset-[15%] rounded-full border border-[#D3EBDB]/30" />
        <div className="absolute inset-[32%] rounded-full border border-[#D3EBDB]/25" />
        <div className="absolute inset-[50%] rounded-full border border-[#D3EBDB]/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] font-mono text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#177A47] animate-pulse" />
            [ HOW IT WORKS ]
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F1F17] leading-[1.15]"
          >
            Empat Langkah.{' '}
            <span className="text-[#177A47] relative inline-block">
              Tanpa Ribet.
              <span className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-[#E3F6B5] -z-10 rounded-full" />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-jakarta text-base sm:text-lg text-[#4A5D52] mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            Dari mengenali material bekas di tangan Anda hingga laporan saldo riil di EcoWallet —
            semua berlangsung transparan dan terukur dalam Waste-to-Value Journey.
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Central Vertical Track Line (Desktop lg+) */}
          <div
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-10 bottom-16 w-[2px] bg-[#D3EBDB]/80 z-0"
            aria-hidden="true"
          >
            {/* Animated Fill Line in Primary Green (#177A47) */}
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#177A47] shadow-[0_0_10px_rgba(23,122,71,0.5)] origin-top rounded-full"
            />
          </div>

          {/* 4 Stages in Alternating Zig-Zag Layout */}
          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {STAGES.map((stage, index) => {
              const isEvenStage = index % 2 === 1; // Stage 2 & 4 (0-indexed: 1 & 3)
              const isActive = activeNodes[index];

              return (
                <div key={stage.number} className="relative">
                  {/* Center Timeline Node (Desktop lg+) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <TimelineNode
                      stageNumber={stage.number}
                      isActive={isActive}
                    />
                  </div>

                  {/* Desktop Layout (lg:grid lg:grid-cols-2) */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                    {/* Stage 1 & 3: Text Left, Mockup Right */}
                    {!isEvenStage ? (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="pr-6"
                        >
                          <StageCard
                            stageNumber={stage.number}
                            badge={stage.badge}
                            title={stage.title}
                            highlightedWord={stage.highlightedWord}
                            description={stage.description}
                            bullets={stage.bullets}
                            align="left"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="pl-6"
                        >
                          <TiltCard maxTilt={8} glare={true}>
                            {stage.mockup}
                          </TiltCard>
                        </motion.div>
                      </>
                    ) : (
                      /* Stage 2 & 4: Mockup Left, Text Right */
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="pr-6"
                        >
                          <TiltCard maxTilt={8} glare={true}>
                            {stage.mockup}
                          </TiltCard>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="pl-6"
                        >
                          <StageCard
                            stageNumber={stage.number}
                            badge={stage.badge}
                            title={stage.title}
                            highlightedWord={stage.highlightedWord}
                            description={stage.description}
                            bullets={stage.bullets}
                            align="right"
                          />
                        </motion.div>
                      </>
                    )}
                  </div>

                  {/* Mobile & Tablet Fallback (< lg): Clean vertical stack with left step indicator */}
                  <div className="lg:hidden flex flex-col space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white border-2 border-[#177A47] flex items-center justify-center font-mono text-xs font-bold text-[#177A47] shrink-0 shadow-2xs">
                        {stage.number}
                      </div>
                      <div className="h-[2px] flex-1 bg-[#D3EBDB]" />
                    </div>

                    <StageCard
                      stageNumber={stage.number}
                      badge={stage.badge}
                      title={stage.title}
                      highlightedWord={stage.highlightedWord}
                      description={stage.description}
                      bullets={stage.bullets}
                      align="left"
                    />

                    <div className="pt-2">
                      <TiltCard maxTilt={6} glare={true}>
                        {stage.mockup}
                      </TiltCard>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. 'Value Factors' Block (PRD Requirement - Refined based on SIAGA Trust Infrastructure) */}
        <ValueFactors />
      </div>
    </section>
  );
}
