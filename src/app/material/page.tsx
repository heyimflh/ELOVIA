import type { Metadata } from 'next';
import { MaterialCatalogClient } from '@/components/katalog-material';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Katalog & Harga Material Daur Ulang Terkini — Ensiklopedia ELOVIA',
  description:
    'Cari jenis material sampahmu, ketahui estimasi harga beli pasar real-time mitra agregator terverifikasi, dan pelajari panduan preparasi sebelum disalurkan.',
  keywords: [
    'katalog daur ulang',
    'harga botol plastik PET',
    'harga kardus bekas per kg',
    'minyak jelantah UCO',
    'harga kaleng aluminium daur ulang',
    'panduan preparasi sampah pilah',
    'ELOVIA circular economy',
  ],
  openGraph: {
    title: 'Katalog & Harga Material Daur Ulang Terkini | ELOVIA',
    description:
      'Ensiklopedia interaktif dan menu harga daur ulang terpilah dengan transparansi pasar real-time & panduan preparasi praktis.',
    type: 'website',
    locale: 'id_ID',
    url: '/material',
  },
};

export default function MaterialPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50">
      {/* Interactive Material Catalog Experience */}
      <MaterialCatalogClient />

      {/* Global ELOVIA Footer */}
      <Footer />
    </main>
  );
}
