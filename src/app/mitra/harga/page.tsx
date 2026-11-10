import type { Metadata } from 'next';
import { MitraPricingManager } from '@/components/mitra';

export const metadata: Metadata = {
  title: 'Katalog Harga Material — Bank Sampah Berkah Mandiri | ELOVIA',
  description:
    'Kelola rentang harga beli indikatif per kilogram untuk seluruh kategori sampah daur ulang. Pantau batas kebasian harga 14 hari sesuai standar SNI & PRD ELOVIA.',
  openGraph: {
    title: 'Katalog Harga Material — Bank Sampah Berkah Mandiri | ELOVIA',
    description:
      'Kelola rentang harga beli indikatif per kilogram. Pembaruan harga berkala meningkatkan kepercayaan dan konversi transaksi warga.',
  },
};

export default function MitraPricingPage() {
  return <MitraPricingManager />;
}

