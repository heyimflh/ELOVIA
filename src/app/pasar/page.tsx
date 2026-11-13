import type { Metadata } from 'next';
import { MarketplaceDirectory } from '@/components/marketplace';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Recycle Marketplace — Temukan Mitra Daur Ulang Terdekat | ELOVIA',
  description:
    'Salurkan material terpilah Anda ke bank sampah, pusat daur ulang, atau agregator terpercaya dengan harga transparan.',
};

export default function PasarPage() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-slate-50" suppressHydrationWarning>
      {/* Interactive Marketplace Directory with 3D Parallax Header & Filters */}
      <MarketplaceDirectory />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

