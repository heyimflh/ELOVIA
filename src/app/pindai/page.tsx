import type { Metadata } from 'next';
import Image from 'next/image';
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
    <div
      className="relative min-h-screen flex flex-col justify-between selection:bg-mint-100 selection:text-green-700"
      suppressHydrationWarning
    >
      {/* 1. Cinematic Nature Background Isolation (Fixed while page content scrolls naturally) */}
      <div className="fixed inset-0 z-[-50] bg-[#0a150f] pointer-events-none transform-gpu">
        <Image
          src="/images/booking/background.png"
          alt="Dreamy Forest Background"
          fill
          priority
          quality={90}
          className="object-cover"
        />
      </div>

      {/* 2. Subtle dark gradient overlay to ensure text readability */}
      <div className="fixed inset-0 w-full h-full bg-slate-900/40 backdrop-blur-[2px] -z-10 pointer-events-none" />

      {/* 3. Ambient Glowing Orbs / Aurora in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
        <div className="absolute top-[15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/15 blur-[140px]" />
        <div className="absolute top-[55%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-500/15 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-lime-400/10 blur-[130px]" />
      </div>

      {/* Main scrolling content */}
      <main className="relative w-full">
        {/* 1. Header Section with Multi-Layer Parallax Background & Glassmorphic Overlay */}
        <ScannerHeader targetSectionId="scanner-section" />

        {/* 2. Interactive Waste Value Scanner Calculator Section */}
        <InteractiveScanner />
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}
