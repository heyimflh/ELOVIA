import type { Metadata } from 'next';
import { ScannerHeader } from '@/components/scanner/ScannerHeader';
import { InteractiveScanner } from '@/components/scanner/InteractiveScanner';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Waste Value Scanner — Kenali sampah, ketahui potensinya | ELOVIA',
  description:
    'Pilih material Anda, masukkan beratnya, dan temukan nilai ekonomi yang tersembunyi dengan Waste Value Scanner ELOVIA.',
};

export default function PindaiPage() {
  return (
    <main className="w-full min-h-screen bg-[#F6FAF7]">
      {/* 1. Header Section with Multi-Layer Parallax Background & Glassmorphic Overlay */}
      <ScannerHeader targetSectionId="scanner-section" />

      {/* 2. Interactive Waste Value Scanner Calculator Section */}
      <InteractiveScanner />

      {/* 3. Global Footer */}
      <Footer />
    </main>
  );
}

