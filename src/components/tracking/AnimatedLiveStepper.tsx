'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Scale, Truck, Sparkles } from 'lucide-react';
import type { TrackingStepId } from './types';

interface AnimatedLiveStepperProps {
  currentStep: TrackingStepId;
  onStepChange?: (step: TrackingStepId) => void;
}

interface StepItem {
  id: TrackingStepId;
  label: string;
  tagline: string;
  subtext: string;
  icon: typeof Clock;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    label: '1. Menunggu Konfirmasi',
    tagline: 'Pesanan Masuk',
    subtext: 'Verifikasi jadwal & mitra',
    icon: Clock,
  },
  {
    id: 2,
    label: '2. Dalam Perjalanan (Active)',
    tagline: 'Armada Menuju Lokasi',
    subtext: 'Driver bergerak via GPS',
    icon: Truck,
  },
  {
    id: 3,
    label: '3. Penimbangan Lokasi',
    tagline: 'Tera Presisi Digital',
    subtext: 'Verifikasi fisik material',
    icon: Scale,
  },
  {
    id: 4,
    label: '4. Transaksi Selesai',
    tagline: 'Pencairan Otomatis',
    subtext: 'Saldo masuk ke dompet',
    icon: CheckCircle2,
  },
];

export function AnimatedLiveStepper({
  currentStep = 2,
  onStepChange,
}: AnimatedLiveStepperProps) {
  // Calculate percentage width for progress bar:
  // step 1: 12%, step 2: 45%, step 3: 78%, step 4: 100%
  const progressPercentages = {
    1: '12%',
    2: '45%',
    3: '78%',
    4: '100%',
  };

  return (
    <div
      className="w-full bg-white/5 backdrop-blur-xl border border-white/15 rounded-[2rem] p-4 md:p-6 shadow-xl relative overflow-hidden transform-gpu backface-hidden"
      suppressHydrationWarning
    >
      {/* Background radial glow behind active step */}
      <div
        className="absolute -top-10 left-1/3 w-72 h-32 bg-green-500/15 blur-[60px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Header bar of Stepper Card with Live pulse and interactive step simulator badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <h2 className="text-sm font-bold text-white tracking-wide uppercase font-jakarta">
            Alur Penyaluran &amp; Pelacakan Status
          </h2>
        </div>

        {/* Interactive Simulation Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 border border-white/10 rounded-full p-1 text-[11px] text-white/70">
          <span className="px-2 font-mono text-white/50 text-[10px]">Simulasi:</span>
          {([1, 2, 3, 4] as TrackingStepId[]).map((stepNum) => (
            <button
              key={stepNum}
              type="button"
              onClick={() => onStepChange?.(stepNum)}
              className={`px-2 py-0.5 rounded-full font-mono font-bold transition-all ${
                currentStep === stepNum
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              Step {stepNum}
            </button>
          ))}
        </div>
      </div>

      {/* Progressive Progress Track (Desktop) */}
      <div className="relative mb-6 hidden md:block">
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.8)]"
            initial={false}
            animate={{ width: progressPercentages[currentStep] }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Grid container for 4 status steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              onClick={() => onStepChange?.(step.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer overflow-hidden border ${
                isActive
                  ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)] text-white font-bold border-green-300/80 ring-2 ring-green-400/30'
                  : isCompleted
                  ? 'bg-green-950/40 border-green-500/30 text-white/90 hover:bg-green-950/60'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              {/* Active pulsing glow layer */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-white/10 pointer-events-none"
                  animate={{ opacity: [0.1, 0.25, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Top row: step number + icon */}
              <div className="flex items-center justify-between mb-2.5 relative z-10">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-black/30 text-white'
                      : isCompleted
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  Tahap 0{step.id}
                </span>

                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                    isActive
                      ? 'bg-white text-green-700 shadow-md'
                      : isCompleted
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-white/5 text-white/30 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="relative z-10">
                <h3
                  className={`text-sm tracking-tight leading-snug mb-0.5 ${
                    isActive
                      ? 'text-white font-extrabold drop-shadow'
                      : isCompleted
                      ? 'text-white font-semibold'
                      : 'text-white/60 font-medium'
                  }`}
                >
                  {step.label}
                </h3>
                <p
                  className={`text-xs ${
                    isActive
                      ? 'text-white/90 font-medium'
                      : isCompleted
                      ? 'text-green-300/80'
                      : 'text-white/40'
                  }`}
                >
                  {step.subtext}
                </p>
              </div>

              {/* Status Indicator pill */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] relative z-10">
                <span
                  className={
                    isActive
                      ? 'text-white font-bold inline-flex items-center gap-1.5'
                      : isCompleted
                      ? 'text-green-400 font-medium'
                      : 'text-white/40'
                  }
                >
                  {isActive ? (
                    <>
                      <Sparkles className="w-3 h-3 text-white animate-spin" />
                      Sedang Berlangsung
                    </>
                  ) : isCompleted ? (
                    '✓ Telah Diverifikasi'
                  ) : (
                    'Menunggu Giliran'
                  )}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

