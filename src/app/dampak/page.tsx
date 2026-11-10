import type { Metadata } from 'next';
import {
  ImpactHero,
  PersonalEcologicalMetrics,
  AchievementBadgesSection,
  BentoBreakdownSection,
  EcoLeaderboardSection,
} from '@/components/dampak';
import { ShieldCheck, Sparkles, Sprout, Wind, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Taman Dampak 3D — ELOVIA | Visualisasi Ekosistem Sirkular',
  description:
    'Saksikan metamorfosis kontribusi daur ulang Anda dalam bentuk taman 3D interaktif real-time. Setiap gram material bernilai meregenerasi biosfer.',
};

export default function DampakPage() {
  return (
    /*
     * The fixed hero background (Layer 1) is z-0 / position: fixed.
     * Everything in the page flow sits in its normal stacking context.
     * The supporting section and footer carry their own background so the
     * hero image doesn't bleed through them.
     */
    <div className="w-full min-h-screen">
      {/* ── Hero Impact Garden (Hybrid 2D/3D) ─────────────── */}
      <ImpactHero />

      {/* ── Unified Glassmorphism Fixed Background Sections (Metrics -> Eco-Leaderboard) ── */}
      <div
        className="relative min-h-screen bg-fixed bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/images/dampak/background.png')" }}
      >
        {/* Aesthetic Contrast Overlay: Darkens bright mountain clouds while preserving teal contours and gold accents */}
        <div
          className="absolute inset-0 bg-slate-950/60 z-0 mix-blend-multiply pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient atmospheric radial glows to enhance glass refraction and depth */}
        <div
          className="absolute top-1/4 -left-36 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0"
          aria-hidden="true"
        />
        <div
          className="absolute top-2/3 -right-36 w-[32rem] h-[32rem] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Section Contents Layer (relative z-10 above the overlay) */}
        <div className="relative z-10 divide-y divide-white/[0.06]">
          {/* ── Section 2: Personal Ecological Metrics Bento Grid ── */}
          <PersonalEcologicalMetrics />

          {/* ── Section 3: Achievement Badges & Circular Certificates ── */}
          <AchievementBadgesSection />

          {/* ── Section 4: Bento Breakdown & Contribution Visual Diagram ── */}
          <BentoBreakdownSection />

          {/* ── Section 5: Eco-Leaderboard & Community Rank ──────── */}
          <EcoLeaderboardSection />
        </div>
      </div>

      {/* ── Supporting Methodology Section ───────────────── */}
      <section
        id="impact-ledger"
        className="relative z-30 bg-gradient-to-b from-[#f0fdf4] via-white to-white py-24 px-4 sm:px-6 lg:px-8 border-t border-emerald-100"
      >
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-jetbrains text-[#177a47] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
              Sains &amp; Metodologi Konversi
            </div>
            <h2 className="font-inter-tight text-3xl sm:text-4xl font-extrabold text-[#0f2922] tracking-tight">
              Bagaimana Sampah Menjadi Kehidupan di Biosfer Digital ELOVIA?
            </h2>
            <p className="text-sm sm:text-base text-[#0f2922]/75 leading-relaxed font-medium">
              Setiap transaksi material bekas yang dipindai melalui AI scanner ELOVIA
              dialokasikan ke dalam formula reduksi karbon dan penanaman vegetasi nyata
              bersama mitra terverifikasi.
            </p>
          </div>

          {/* Three methodology cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-emerald-100 hover:border-[#22c55e]/50 transition-all duration-300 shadow-sm hover:shadow-lg group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="font-inter-tight text-xl font-bold text-[#0f2922] mb-3">
                Reduksi Emisi GHG
              </h3>
              <p className="text-sm text-[#0f2922]/65 leading-relaxed mb-4">
                Setiap 1 kg plastik PET daur ulang mencegah hingga 1.8 kg emisi CO₂e
                dibanding manufaktur virgin-plastic baru.
              </p>
              <div className="font-jetbrains text-xs text-emerald-600 font-bold">
                Emisi Tercatat: -1.8× CO₂e/kg
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-teal-100 hover:border-teal-500/50 transition-all duration-300 shadow-sm hover:shadow-lg group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/12 border border-teal-500/25 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-inter-tight text-xl font-bold text-[#0f2922] mb-3">
                Biomassa Nyata
              </h3>
              <p className="text-sm text-[#0f2922]/65 leading-relaxed mb-4">
                Poin sirkularitas terakumulasi dikonversikan menjadi bibit bakau dan
                pohon kanopi tropis di kawasan restorasi hutan nusantara.
              </p>
              <div className="font-jetbrains text-xs text-teal-600 font-bold">
                Konversi: 500 Poin = 1 Bibit
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-emerald-100 hover:border-[#22c55e]/50 transition-all duration-300 shadow-sm hover:shadow-lg group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-inter-tight text-xl font-bold text-[#0f2922] mb-3">
                Audit Terverifikasi
              </h3>
              <p className="text-sm text-[#0f2922]/65 leading-relaxed mb-4">
                Seluruh riwayat penimbangan terikat dengan sertifikat digital
                transparan standar SNI dan ISCC Plus untuk integritas data.
              </p>
              <div className="font-jetbrains text-xs text-emerald-600 font-bold">
                Standar: ISCC Plus &amp; SNI
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-inter-tight text-2xl sm:text-3xl font-bold">
                Mulai Tumbuhkan Taman Karbon Anda
              </h4>
              <p className="text-sm text-emerald-50 max-w-lg font-medium">
                Pindai sampah Anda sekarang untuk mengestimasi nilai rupiah dan
                kontribusi ekologisnya.
              </p>
            </div>
            <Link
              href="/pindai"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-[#0f2922] font-bold text-sm tracking-wide shadow-lg transition-all hover:scale-105 shrink-0"
            >
              <span>Pindai Sampah Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#22c55e]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div className="relative z-30 bg-white">
        <Footer />
      </div>
    </div>
  );
}


