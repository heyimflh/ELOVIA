import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Home, ScanLine } from 'lucide-react';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Fitur Segera Hadir — ELOVIA',
  description: 'Halaman ini sedang dalam tahap kurasi dan pengembangan oleh tim ELOVIA.',
};

export default function ComingSoonPage() {
  return (
    <div className="w-full min-h-screen bg-[#F6FAF7] flex flex-col justify-between selection:bg-mint-100 selection:text-green-800">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-mint-200/80 shadow-xl text-center font-jakarta relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} className="text-emerald-600 animate-pulse" />
            <span>Dalam Pengembangan</span>
          </div>

          {/* Heading */}
          <h1 className="font-fraunces text-3xl sm:text-4xl text-slate-900 font-bold mb-4 tracking-tight">
            Fitur Segera Hadir
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-md mx-auto">
            Halaman ini sedang dalam tahap finalisasi kurasi standar sirkularitas oleh tim ELOVIA. Silakan jelajahi fitur aktif kami yang lain.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Home size={16} />
              <span>Kembali ke Beranda</span>
            </Link>

            <Link
              href="/pindai"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-bold shadow-xs transition-all active:scale-95"
            >
              <ScanLine size={16} className="text-emerald-600" />
              <span>Pindai Nilai Sampah</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

