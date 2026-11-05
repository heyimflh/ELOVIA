'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { TrackingHeaderBanner } from './TrackingHeaderBanner';
import { AnimatedLiveStepper } from './AnimatedLiveStepper';
import { DigitalReceiptCard } from './DigitalReceiptCard';
import { FleetPartnerInfoCard } from './FleetPartnerInfoCard';
import { MaterialWeighingSection } from './MaterialWeighingSection';
import { InstantImpactSection } from './InstantImpactSection';
import { ReceiptPrintModal } from './ReceiptPrintModal';
import type { TrackingStepId, DeliveryMethod } from './types';

interface LiveTrackingClientProps {
  orderId?: string;
}

export function LiveTrackingClient({
  orderId = 'ORD-ELV-20261104-089',
}: LiveTrackingClientProps) {
  // Stepper state: default is step 2 ("2. Dalam Perjalanan (Active)")
  const [currentStep, setCurrentStep] = useState<TrackingStepId>(2);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleShare = async () => {
    const shareData = {
      title: `ELOVIA Live Tracking: ${orderId}`,
      text: `Pantau status penyaluran material real-time untuk nomor resi ${orderId}.`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Tautan pelacakan berhasil disalin ke papan klip!');
    }
  };

  const handleDownloadPdf = () => {
    setIsReceiptModalOpen(true);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-between selection:bg-mint-100 selection:text-green-700"
      suppressHydrationWarning
    >
      {/* 1. CRITICAL PERFORMANCE RULE: Physical fixed background in a separate GPU layer at the root level */}
      <div className="fixed inset-0 z-[-50] bg-[#0a150f] pointer-events-none transform-gpu">
        <Image
          src="/images/booking/background.png"
          alt="Atmospheric Background"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        {/* Soft radial ambient glows behind glass panels */}
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Natural Window Scrolling Container (Transparent, No Nested Scroll Containers) */}
      <main
        className="relative w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center"
        suppressHydrationWarning
      >
        {/* CRITICAL STRUCTURE RULE: ONE Grand Master Glass Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-[60px] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-[3rem] p-6 lg:p-10 flex flex-col gap-8 transform-gpu backface-hidden isolate"
          suppressHydrationWarning
        >
          {/* ========================================================= */}
          {/* SECTION 1: HEADER BANNER & LIVE ANIMATED STEPPER CARD     */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-6 w-full">
            <TrackingHeaderBanner
              orderId={orderId}
              estimatedArrival="14.30 WIB (±15 Menit)"
              remainingDistance="2.4 km"
            />
            <AnimatedLiveStepper
              currentStep={currentStep}
              onStepChange={(newStep) => {
                setCurrentStep(newStep);
                showToast(`Status diperbarui ke Tahap 0${newStep}`);
              }}
            />
          </div>

          {/* ========================================================= */}
          {/* SECTION 2: DIGITAL RECEIPT & INTERACTIVE GLOWING QR CODE */}
          {/* ========================================================= */}
          <DigitalReceiptCard
            orderId={orderId}
            referenceNumber="REF-20261104-ELV89"
            onDownloadPdf={handleDownloadPdf}
            onShare={handleShare}
          />

          {/* ========================================================= */}
          {/* SECTION 3: KARTU INFORMASI ARMADA & MITRA PENYALUR        */}
          {/* ========================================================= */}
          <FleetPartnerInfoCard
            initialMethod={deliveryMethod}
            onMethodChange={setDeliveryMethod}
            orderId={orderId}
          />

          {/* ========================================================= */}
          {/* SECTION 4: RINCIAN MATERIAL & TIMBANGAN DIGITAL REAL-TIME */}
          {/* ========================================================= */}
          <MaterialWeighingSection currentStep={currentStep} />

          {/* ========================================================= */}
          {/* SECTION 5: METRIK DAMPAK EKOLOGIS INSTAN & IMPACT CTA     */}
          {/* ========================================================= */}
          <InstantImpactSection
            carbonOffset="+12.4 kg CO2e"
            greenPoints="+120 Green Points"
            waterSaved="48 Liter"
          />
        </motion.div>
      </main>

      {/* Floating Glassmorphic Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0F1F17]/90 text-white border border-green-400/40 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-jakarta text-xs sm:text-sm font-semibold pointer-events-none"
          >
            <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Digital Invoice / Manifest Print Modal */}
      <ReceiptPrintModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        orderId={orderId}
        referenceNumber="REF-20261104-ELV89"
        driverName="Budi Pratama"
        partnerName="Bank Sampah Resik Kebumen"
        payoutAmount="Rp 74.500"
      />
    </div>
  );
}

