import type { Metadata } from 'next';
import { MitraOverviewView } from '@/components/mitra';

export const metadata: Metadata = {
  title: 'Ringkasan Operasional — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Ringkasan aktivitas operasional bank sampah terverifikasi ELOVIA. Pantau metrik harian, slot armada aktif, dan antrean permintaan penyaluran warga.',
};

export default function MitraPage() {
  return <MitraOverviewView />;
}
