import type { Metadata } from 'next';
import { MitraRequestsView } from '@/components/mitra';

export const metadata: Metadata = {
  title: 'Antrean Permintaan Penyaluran — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Kelola pengajuan penjemputan dan pengantaran sampah pilah dari warga. Konfirmasi tiket masuk, pantau status armada, dan input verifikasi timbangan SNI.',
};

export default function MitraRequestsPage() {
  return <MitraRequestsView />;
}

