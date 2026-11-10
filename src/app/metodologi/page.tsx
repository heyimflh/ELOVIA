import type { Metadata } from 'next';
import {
  MetodologiHero,
  FormulaPipelineSection,
  SixFactorsGrid,
  QualityGradingSection,
  ValueStatusLedger,
  MetodologiCta,
} from '@/components/metodologi';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Metodologi Penentuan Nilai — ELOVIA | Algoritma Transparansi Harga Sampah',
  description:
    'Whitepaper interaktif transparansi penentuan nilai bersih material daur ulang ELOVIA. Pelajari 6 faktor penentu harga, rumus matematis, dan standar grading kualitas.',
};

export default function MetodologiPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAF3] text-[#1C2E1F] overflow-hidden z-0 font-jakarta selection:bg-[#D5E3BD] selection:text-[#1C2E1F]">
      {/* ── Soft Ambient Glow Orbs (Subtle Botanical Hues) ── */}
      <div
        className="absolute top-[12%] -left-32 w-[550px] h-[550px] bg-[#E2EDCE]/50 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-[45%] -right-32 w-[600px] h-[600px] bg-[#D7E8BF]/40 rounded-full blur-[160px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-[#E8F1D7]/40 rounded-full blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* ── Section 1: Hero Section (Editorial Serif + Tombstone Arch Window) ── */}
      <MetodologiHero />

      {/* ── Section 2: Rumus Harga ELOVIA (The Formula Visualized & Simulator) ── */}
      <FormulaPipelineSection />

      {/* ── Section 3: 6 Faktor Penentu Harga (Card Grid) ──────────────────── */}
      <SixFactorsGrid />

      {/* ── Section 4: 3 Tall Arch Cards (Grade A, B, C) & Map Toleransi Residu ── */}
      <QualityGradingSection />

      {/* ── Section 5: Siklus Hidup Transaksi & Batasan Sistem ──────────────── */}
      <ValueStatusLedger />

      {/* ── Section 6: Bottom Olive Call-to-Action Banner ──────────────────── */}
      <MetodologiCta />

      {/* ── Section 7: Global Platform Footer ──────────────────────────────── */}
      <Footer />
    </div>
  );
}
