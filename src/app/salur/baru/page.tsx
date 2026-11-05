'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  SalurHeader,
  SelectedPartnerSummaryCard,
  DeliveryMethodSwitcher,
  DynamicLocationForm,
  DateTimeSlotPicker,
  StickyOrderSummaryPanel,
  type DeliveryMethod,
  type DateOption,
  type TimeSlotOption,
} from '@/components/salur';
import { Footer } from '@/components/footer';

export default function FormPenyaluranBaruPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotOption | null>(null);

  const handleConfirmOrder = () => {
    alert('Penyaluran berhasil diajukan! Mitra akan segera memproses armada.');
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-between selection:bg-mint-100 selection:text-green-700"
      suppressHydrationWarning
    >
      {/* 1. True Background Isolation (Dedicated Physical Layer at Absolute Root) */}
      <div className="fixed inset-0 z-[-50] bg-[#0a150f] pointer-events-none transform-gpu">
        <Image
          src="/images/booking/background.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover"
        />
      </div>

      {/* 2. Natural Window Scrolling Container (Transparent, No Nested Scroll Container) */}
      <main
        className="relative w-full min-h-screen pt-24 pb-12 px-4 sm:px-8 flex justify-center"
        suppressHydrationWarning
      >
        {/* Grand Master Glass Panel with GPU Compositing & Layer Isolation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-7xl bg-white/10 backdrop-blur-[60px] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.5)] rounded-[3rem] p-6 lg:p-12 flex flex-col gap-8 transform-gpu isolate backface-hidden"
          suppressHydrationWarning
        >
          {/* Top: Restored Hero Header Banner with Title, Subtitle, and Stepper */}
          <SalurHeader />

          {/* Inner 12-col layout: Left (8 cols) for forms, Right (4 cols) for sticky receipt */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" suppressHydrationWarning>
            {/* Left Column (8-col section) */}
            <div className="lg:col-span-8 space-y-8" suppressHydrationWarning>
              {/* Selected Partner Summary Card */}
              <SelectedPartnerSummaryCard />

              {/* 3D Delivery Method Switcher */}
              <DeliveryMethodSwitcher
                value={deliveryMethod}
                onChange={setDeliveryMethod}
              />

              {/* Dynamic Location Form (Sits below 3D Switcher) */}
              <DynamicLocationForm method={deliveryMethod} />

              {/* Custom Interactive Date & Time Slot Picker */}
              <DateTimeSlotPicker
                method={deliveryMethod}
                onDateChange={setSelectedDate}
                onTimeSlotChange={setSelectedSlot}
              />
            </div>

            {/* Right Column (4-col section): Sticky Order Summary & Receipt Panel */}
            <StickyOrderSummaryPanel
              deliveryMethod={deliveryMethod}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              partnerName="Bank Sampah Resik Kebumen"
              onSubmit={handleConfirmOrder}
            />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
