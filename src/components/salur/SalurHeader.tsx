'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export interface CheckoutStep {
  id: number;
  label: string;
  href?: string;
}

export interface SalurHeaderProps {
  /**
   * The currently active step index (1-based, defaults to 3: '3. Detail & Jadwal')
   */
  currentStep?: number;
  /**
   * Optional custom headline (defaults to 'Finalisasi Penyaluran Material')
   */
  title?: string;
  /**
   * Optional custom subtitle
   */
  subtitle?: string;
  /**
   * Optional custom steps array
   */
  steps?: CheckoutStep[];
  /**
   * Optional additional class name for the outer wrapper
   */
  className?: string;
}

const DEFAULT_STEPS: CheckoutStep[] = [
  { id: 1, label: '1. Keranjang', href: '/keranjang' },
  { id: 2, label: '2. Pilih Mitra', href: '/pasar' },
  { id: 3, label: '3. Detail & Jadwal', href: '/salur/baru' },
  { id: 4, label: '4. Konfirmasi' },
];

export function SalurHeader({
  currentStep = 3,
  title = 'Finalisasi Penyaluran Material',
  subtitle = 'Lengkapi detail lokasi dan jadwal untuk mengubah material sirkular Anda menjadi nilai nyata.',
  steps = DEFAULT_STEPS,
  className = '',
}: SalurHeaderProps) {
  return (
    <div
      className={`relative w-full min-h-[16rem] md:h-64 rounded-t-[2rem] md:rounded-[2rem] overflow-hidden mb-8 shrink-0 isolate transform-gpu ${className}`}
      suppressHydrationWarning
    >
      {/* 1. Restored Hero Banner Image */}
      <Image
        src="/images/booking/hero.png"
        alt="Hero Header"
        fill
        className="object-cover"
        priority
      />

      {/* 2. Gradient overlays to blend into glass panel & preserve legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-white/10 via-black/40 to-black/10 mix-blend-overlay z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Title, Subtitle, and Glass Stepper positioned at bottom left */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
        }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 max-w-4xl pr-4 flex flex-col items-start"
      >
        {/* Headline */}
        <h1 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] tracking-tight mb-1">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-jakarta">
          {subtitle}
        </p>

        {/* The Spatial Glassmorphism Visual Stepper */}
        <nav
          aria-label="Proses Penyaluran"
          className="inline-flex flex-wrap items-center gap-1.5 md:gap-2 bg-black/40 hover:bg-black/50 backdrop-blur-md border border-white/20 p-1.5 md:p-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-colors duration-300 mt-4"
        >
          {steps.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isFuture = step.id > currentStep;
            const isLast = idx === steps.length - 1;

            return (
              <Fragment key={step.id}>
                {/* Completed Steps */}
                {isCompleted &&
                  (step.href ? (
                    <Link
                      href={step.href}
                      className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold text-white/90 hover:bg-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                      title={`Kembali ke ${step.label}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      <span>{step.label}</span>
                    </Link>
                  ) : (
                    <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-semibold text-white/90 hover:bg-white/15 transition-colors flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 shrink-0" />
                      <span>{step.label}</span>
                    </div>
                  ))}

                {/* Active Step */}
                {isActive && (
                  <div
                    aria-current="step"
                    className="bg-green-500 text-white px-3.5 py-1 md:px-5 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-[0_0_25px_rgba(34,197,94,0.7)] border border-green-400/60 flex items-center gap-1.5"
                  >
                    <span>{step.label}</span>
                  </div>
                )}

                {/* Future Step */}
                {isFuture && (
                  <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium text-white/50 flex items-center gap-1.5">
                    <span>{step.label}</span>
                  </div>
                )}

                {/* Separators strictly between the step pills */}
                {!isLast && (
                  <ChevronRight
                    className="text-white/40 w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </Fragment>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
}

// Named alias export
export { SalurHeader as TopHeaderCheckoutStepper };
