import type { Metadata } from 'next';
import { LiveTrackingClient } from '@/components/tracking';
import { Footer } from '@/components/footer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: 'ORD-ELV-20261104-089' },
    { id: 'ORD-12345' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || 'ORD-ELV-20261104-089');

  return {
    title: `Live Tracking Resi & Status Penyaluran ${decodedId} — ELOVIA`,
    description: `Pantau pergerakan armada penjemputan, otentikasi QR resi digital SNI, dan verifikasi timbangan real-time untuk transaksi ${decodedId}.`,
    openGraph: {
      title: `Live Tracking Penyaluran ${decodedId} | ELOVIA`,
      description: `Lacak status penyaluran material sirkular, posisi driver armada, dan estimasi pencairan saldo seketika.`,
      images: [
        {
          url: '/images/liveTracking/header.jpeg',
          width: 1200,
          height: 630,
          alt: 'Live Tracking ELOVIA',
        },
      ],
    },
  };
}

export default async function OrderLiveTrackingPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id || 'ORD-ELV-20261104-089');

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Interactive Ultra-Premium Digital Receipt & Real-Time Transaction Tracker */}
      <LiveTrackingClient orderId={decodedId} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
