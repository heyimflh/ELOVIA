import type { Metadata } from 'next';
import { MitraScheduleManager } from '@/components/mitra';

export const metadata: Metadata = {
  title: 'Jadwal & Kapasitas Armada — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Atur ketersediaan hari kerja, rentang jam buka penjemputan warga, kuota tiket harian armada, dan SLA waktu persiapan pesanan pada Portal Mitra ELOVIA.',
  openGraph: {
    title: 'Jadwal & Kapasitas Armada — Bank Sampah Berkah Mandiri | ELOVIA',
    description:
      'Kelola jadwal operasional mingguan dan batas maksimal penjemputan harian armada penjemputan sirkular terverifikasi ELOVIA.',
  },
};

export default function MitraSchedulePage() {
  return <MitraScheduleManager />;
}

