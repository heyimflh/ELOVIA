import type { Metadata } from 'next';
import { MitraProfileManager } from '@/components/mitra';

export const metadata: Metadata = {
  title: 'Pengaturan & Profil Toko — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Kelola informasi publik, alamat operasional, titik koordinat penjemputan armada, dan syarat penyerahan material untuk warga di Recycle Marketplace ELOVIA.',
  openGraph: {
    title: 'Pengaturan & Profil Toko — Bank Sampah Berkah Mandiri | ELOVIA',
    description:
      'Kelola identitas usaha bank sampah, kontak operasional, radius layanan penjemputan, dan syarat penyerahan warga.',
  },
};

export default function MitraProfilePage() {
  return <MitraProfileManager />;
}

