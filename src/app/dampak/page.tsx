import type { Metadata } from 'next';
import {
  ImpactHero,
  PersonalEcologicalMetrics,
  AchievementBadgesSection,
  BentoBreakdownSection,
  EcoLeaderboardSection,
} from '@/components/dampak';
import { ShieldCheck, Sparkles, Sprout, Wind, ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Taman Dampak 3D — ELOVIA | Visualisasi Ekosistem Sirkular',
  description:
    'Saksikan metamorfosis kontribusi daur ulang Anda dalam bentuk taman 3D interaktif real-time. Setiap gram material bernilai meregenerasi biosfer.',
};

export default function DampakPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9F1]">
      {/* ── Hero Impact Garden (Hybrid 2D/3D Diorama Island) ─────────────── */}
      <ImpactHero />

      {/* ── Content Sections Styled to Editorial Eco-Landscaping Aesthetic ── */}
      <div className="relative w-full bg-[#F8F9F1] overflow-hidden">
        {/* ── Section 1: Personal Ecological Metrics (History & Values Style) ── */}
        <PersonalEcologicalMetrics />

        {/* ── Section 2: Achievement Badges & Circular Certificates (Tombstone Arches) ── */}
        <AchievementBadgesSection />

        {/* ── Section 3: Bento Breakdown & Parametric 3D Composition ── */}
        <BentoBreakdownSection />

        {/* ── Section 4: Eco-Leaderboard & Community (What Our Clients Say Style) ── */}
        <EcoLeaderboardSection />
      </div>

      {/* ── Section 5: Supporting Methodology (3 Arched Service Cards) ── */}
      <section
        id="impact-ledger"
        className="relative z-20 bg-[#F8F9F1] py-28 px-4 sm:px-6 lg:px-8 border-t border-[#DFE7D0]"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
              FROM THE GROUND UP • SAINS &amp; METODOLOGI
            </span>
            <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E2617] tracking-tight leading-[1.1]">
              Bagaimana Sampah Menjadi{' '}
              <span className="italic font-normal text-[#748E33]">Kehidupan Nyata?</span>
            </h2>
            <p className="text-base text-[#58634F] leading-relaxed">
              Setiap transaksi material bekas yang dipindai melalui AI scanner ELOVIA dialokasikan
              ke dalam formula reduksi karbon dan penanaman vegetasi nyata bersama mitra
              terverifikasi.
            </p>
          </div>

          {/* 3 Arched Tombstone Methodology Cards (Matching Reference Centerpiece) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-t-[5rem] rounded-b-3xl bg-white border border-[#DFE7D0] p-8 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EFF3E4] border border-[#DFE7D0] flex items-center justify-center text-[#748E33] group-hover:scale-105 group-hover:bg-[#748E33] group-hover:text-white transition-all">
                  <Wind className="w-7 h-7" />
                </div>
                <h3 className="font-fraunces text-2xl font-normal text-[#1E2617]">
                  Reduksi Emisi GHG
                </h3>
                <p className="text-sm text-[#58634F] leading-relaxed">
                  Setiap 1 kg plastik PET daur ulang mencegah hingga 1.8 kg emisi CO₂e dibanding
                  manufaktur virgin-plastic baru.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono font-bold text-[#748E33]">
                <span>Rasio Emisi:</span>
                <span>-1.8× CO₂e / kg</span>
              </div>
            </div>

            <div className="rounded-t-[5rem] rounded-b-3xl bg-white border border-[#DFE7D0] p-8 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EFF3E4] border border-[#DFE7D0] flex items-center justify-center text-[#748E33] group-hover:scale-105 group-hover:bg-[#748E33] group-hover:text-white transition-all">
                  <Sprout className="w-7 h-7" />
                </div>
                <h3 className="font-fraunces text-2xl font-normal text-[#1E2617]">
                  Biomassa Kanopi Nyata
                </h3>
                <p className="text-sm text-[#58634F] leading-relaxed">
                  Poin sirkularitas terakumulasi dikonversikan menjadi bibit bakau dan pohon kanopi
                  tropis di kawasan restorasi nusantara.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono font-bold text-[#748E33]">
                <span>Alokasi Bibit:</span>
                <span>500 Pts = 1 Bibit</span>
              </div>
            </div>

            <div className="rounded-t-[5rem] rounded-b-3xl bg-white border border-[#DFE7D0] p-8 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#EFF3E4] border border-[#DFE7D0] flex items-center justify-center text-[#748E33] group-hover:scale-110 group-hover:bg-[#748E33] group-hover:text-white transition-all">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="font-fraunces text-2xl font-normal text-[#1E2617]">
                  Audit Terverifikasi
                </h3>
                <p className="text-sm text-[#58634F] leading-relaxed">
                  Seluruh riwayat penimbangan terikat dengan sertifikat digital transparan standar SNI
                  dan ISCC Plus untuk integritas data.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono font-bold text-[#748E33]">
                <span>Sertifikasi:</span>
                <span>SNI &amp; ISCC Plus</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════
              CALL TO ACTION BANNER (MATCHING THE GRASS SILHOUETTE BANNER IN REFERENCE)
             ══════════════════════════════════════════════════════ */}
          <div className="rounded-[3rem] bg-[#748E33] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-lg">
            {/* Stylized Grass Silhouette Blades along the top edge */}
            <div className="absolute top-0 inset-x-0 h-10 pointer-events-none opacity-25">
              <svg className="w-full h-full fill-white" preserveAspectRatio="none" viewBox="0 0 1200 120">
                <path d="M0,120 L20,30 L40,120 L60,10 L80,120 L100,45 L120,120 L140,20 L160,120 L180,50 L200,120 L220,15 L240,120 L260,35 L280,120 L300,10 L320,120 L340,40 L360,120 L380,25 L400,120 L420,55 L440,120 L460,18 L480,120 L500,42 L520,120 L540,12 L560,120 L580,38 L600,120 L620,22 L640,120 L660,48 L680,120 L700,14 L720,120 L740,36 L760,120 L780,24 L800,120 L820,52 L840,120 L860,16 L880,120 L900,44 L920,120 L940,28 L960,120 L980,12 L1000,120 L1020,38 L1040,120 L1060,20 L1080,120 L1100,50 L1120,120 L1140,18 L1160,120 L1180,34 L1200,120 Z" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#CEE045] font-bold block">
                  MULAI SEKARANG • REGENERASI LINGKUNGAN
                </span>
                <h3 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
                  Tumbuhkan Dampak Sirkular Anda Hari Ini
                </h3>
                <p className="text-base text-[#EBF2DA] leading-relaxed">
                  Pindai sampah Anda sekarang dengan teknologi visi komputer ELOVIA untuk
                  mengestimasi nilai rupiah dan kontribusi regeneratifnya ke biosfer.
                </p>
              </div>

              {/* Action Pill Button with circle arrow */}
              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/pindai"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#F8F9F1] text-[#1E2617] font-sans font-bold text-sm tracking-wide shadow-md transition-all hover:scale-105 group"
                >
                  <span>Pindai Sampah Sekarang</span>
                  <span className="w-6 h-6 rounded-full bg-[#748E33] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom Contact / Location Strip (Matching Reference Bottom Panel) */}
            <div className="relative z-10 mt-12 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-[#EBF2DA]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#CEE045]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#CEE045] block font-bold">Layanan Mitra</span>
                  <span className="font-mono text-white font-bold">+62 821-2026-ELV</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#CEE045]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#CEE045] block font-bold">Stasiun Mitra</span>
                  <span className="text-white">Jabodetabek &amp; DIY</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#CEE045]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#CEE045] block font-bold">Audit Emisi</span>
                  <span className="text-white">audit@elovia.id</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#CEE045]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#CEE045] block font-bold">Sinkronisasi</span>
                  <span className="text-white">24/7 Real-Time AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div className="relative z-20 bg-white">
        <Footer />
      </div>
    </div>
  );
}
