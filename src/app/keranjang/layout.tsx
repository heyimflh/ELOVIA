import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keranjang Material — Tinjau & Lanjutkan Penyaluran | ELOVIA',
  description:
    'Tinjau estimasi nilai material terpilah Anda, hitung potensi ekonomi dan reduksi emisi CO2e, serta temukan mitra penyaluran terverifikasi dengan ELOVIA.',
  openGraph: {
    title: 'Keranjang Material — ELOVIA Circular Economy',
    description:
      'Tinjau material daur ulang Anda sebelum disalurkan ke mitra terverifikasi.',
  },
};

export default function KeranjangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

