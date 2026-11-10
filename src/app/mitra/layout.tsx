import type { Metadata } from 'next';
import { MitraLayoutClient } from '@/components/mitra/MitraLayoutClient';

export const metadata: Metadata = {
  title: 'Portal Mitra — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Portal manajemen operasional bank sampah terverifikasi ELOVIA. Kelola antrean permintaan penjemputan, status buka toko, verifikasi timbangan SNI, dan jadwal armada.',
  openGraph: {
    title: 'Portal Mitra ELOVIA — Bank Sampah Berkah Mandiri',
    description:
      'The Operational Command Center: Kelola aktivitas sirkular, SLA respon armada, dan transaksi daur ulang terverifikasi.',
    images: [
      {
        url: '/images/mitra/hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Pusat Kendali Operasional Mitra ELOVIA',
      },
    ],
  },
};

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MitraLayoutClient>{children}</MitraLayoutClient>;
}

