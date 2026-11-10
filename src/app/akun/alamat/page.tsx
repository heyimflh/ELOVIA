import type { Metadata } from 'next';
import AddressManagementClient from './AddressManagementClient';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Buku Alamat Penjemputan — ELOVIA | Kelola Titik Penjemputan Sirkular',
  description:
    'Semua lokasi penjemputan sampah terpilah dalam satu tempat. Atur alamat favoritmu dan buat setiap proses penyaluran menjadi lebih praktis.',
};

export default function AlamatPage() {
  return (
    <div
      className="relative min-h-screen bg-slate-50 text-slate-900 font-jakarta selection:bg-emerald-100 selection:text-emerald-800"
      suppressHydrationWarning
    >
      {/* ── Main Content Area ── */}
      <main className="relative z-10" suppressHydrationWarning>
        <AddressManagementClient />
      </main>

      <Footer />
    </div>
  );
}
