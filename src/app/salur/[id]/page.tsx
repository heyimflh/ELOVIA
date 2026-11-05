import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
  ArrowLeft,
  Share2,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Footer } from '@/components/footer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: 'ORD-12345' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Pelacakan Penyaluran ${id} — ELOVIA Live Tracking`,
    description: `Pantau status penjemputan dan verifikasi material pesanan ${id} secara real-time di ELOVIA.`,
  };
}

export default async function OrderTrackingPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="relative min-h-screen bg-mist-50 flex flex-col justify-between selection:bg-mint-100 selection:text-green-700">
      <main className="relative z-10 flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/salur/baru"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Formulir Penyaluran</span>
          </Link>
        </div>

        {/* Success Banner Card */}
        <div className="bg-white/80 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-[0_30px_60px_rgba(23,122,71,0.08)] p-6 md:p-10 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-mint-200/25 blur-[120px] -z-10 rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-mint-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-bold text-green-700 uppercase tracking-wider font-jakarta mb-2">
                <Sparkles className="w-3.5 h-3.5 text-green-600" />
                Pesanan Berhasil Diajukan
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-ink-900 font-jakarta">
                Pelacakan Penyaluran Material
              </h1>
              <p className="text-sm text-ink-500 font-mono mt-1">
                ID Transaksi: <span className="font-bold text-ink-900">{id}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-white border border-mint-200 text-xs font-bold text-ink-700 hover:text-green-700 shadow-2xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Resi</span>
              </button>
            </div>
          </div>

          {/* Stepper Status */}
          <div className="py-8 border-b border-mint-100">
            <h2 className="text-base font-bold text-ink-900 font-jakarta mb-6">
              Status Penyaluran Real-Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 relative">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-[10px] font-bold text-green-700 uppercase">Selesai</span>
                </div>
                <h3 className="text-sm font-bold text-ink-900">Pesanan Diterima</h3>
                <p className="text-xs text-ink-500 mt-1">Data pemohon &amp; material terverifikasi.</p>
              </div>

              {/* Step 2 (Active) */}
              <div className="p-4 rounded-2xl bg-mint-100/60 border-2 border-green-500 relative shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <Truck className="w-5 h-5 text-green-700 animate-bounce" />
                  <span className="text-[10px] font-bold text-green-800 uppercase animate-pulse">Berlangsung</span>
                </div>
                <h3 className="text-sm font-bold text-ink-900">Armada Dijadwalkan</h3>
                <p className="text-xs text-ink-600 mt-1">Pengemudi menuju titik koordinat Anda.</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-white/70 border border-mint-100 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-5 h-5 text-ink-400" />
                  <span className="text-[10px] font-bold text-ink-400 uppercase">Menunggu</span>
                </div>
                <h3 className="text-sm font-bold text-ink-900">Penimbangan Presisi</h3>
                <p className="text-xs text-ink-500 mt-1">Verifikasi timbangan digital di lokasi.</p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-white/70 border border-mint-100 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <ShieldCheck className="w-5 h-5 text-ink-400" />
                  <span className="text-[10px] font-bold text-ink-400 uppercase">Menunggu</span>
                </div>
                <h3 className="text-sm font-bold text-ink-900">Pencairan Nilai</h3>
                <p className="text-xs text-ink-500 mt-1">Transfer instan ke dompet / rekening Anda.</p>
              </div>
            </div>
          </div>

          {/* Details & QR Verification */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3 text-sm text-ink-600 font-jakarta">
              <div className="flex justify-between items-center py-1.5 border-b border-mint-100/70">
                <span>Mitra Pelaksana</span>
                <span className="font-bold text-ink-900">Bank Sampah Resik Kebumen</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-mint-100/70">
                <span>Metode Serah Terima</span>
                <span className="font-bold text-ink-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-green-600" /> Jemput Mitra
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-mint-100/70">
                <span>Estimasi Kedatangan</span>
                <span className="font-bold text-green-700 font-mono">09.00 - 12.00 WIB</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span>Estimasi Nilai Tukar</span>
                <span className="font-mono text-lg font-black text-green-700">≈ Rp 249.800</span>
              </div>
            </div>

            {/* QR Card */}
            <div className="p-4 rounded-2xl bg-mint-50/70 border border-mint-200/80 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white rounded-xl border border-mint-200 flex items-center justify-center shadow-xs mb-2">
                <QrCode className="w-16 h-16 text-ink-900" />
              </div>
              <span className="text-xs font-bold text-ink-800 font-jakarta">Kode Resi Digital</span>
              <span className="text-[11px] text-ink-500 font-mono mt-0.5">Tunjukkan ke pengemudi</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

