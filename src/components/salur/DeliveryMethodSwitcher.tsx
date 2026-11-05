'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import type { Delivery3DStageProps } from './Delivery3DStage';

export type DeliveryMethod = 'pickup' | 'dropoff';

export interface DeliveryMethodSwitcherProps {
  /** Selected method if controlled externally */
  value?: DeliveryMethod;
  /** Callback fired when delivery method changes */
  onChange?: (method: DeliveryMethod) => void;
  /** Additional CSS class names */
  className?: string;
}

// Sleek glowing placeholder for 3D stage while loading
function Model3DPlaceholder({ type }: { type: DeliveryMethod }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative pointer-events-none">
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Glowing ring animation */}
        <div className="absolute inset-0 rounded-full border-2 border-white/20 border-t-green-400 animate-spin" />
        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-lg shadow-inner">
          {type === 'pickup' ? '🚚' : '🏬'}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-white/70 font-mono tracking-tight animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-green-400" />
        <span>Memuat Model 3D...</span>
      </div>
    </div>
  );
}

// Dynamically import 3D Canvas with ssr: false to prevent SSR hydration errors
const Delivery3DStage = dynamic(
  () => import('./Delivery3DStage').then((mod) => mod.Delivery3DStage),
  {
    ssr: false,
    loading: () => <Model3DPlaceholder type="pickup" />,
  }
);

interface OptionConfig {
  id: DeliveryMethod;
  emoji: string;
  title: string;
  description: string;
}

const OPTIONS: OptionConfig[] = [
  {
    id: 'pickup',
    emoji: '🚚',
    title: 'Penjemputan',
    description: 'Armada mitra akan menjemput ke lokasi Anda.',
  },
  {
    id: 'dropoff',
    emoji: '🏬',
    title: 'Antar Sendiri',
    description: 'Bawa material ke fasilitas terdekat secara mandiri.',
  },
];

export function DeliveryMethodSwitcher({
  value,
  onChange,
  className = '',
}: DeliveryMethodSwitcherProps) {
  const [internalMethod, setInternalMethod] = useState<DeliveryMethod>('pickup');

  const activeMethod = value !== undefined ? value : internalMethod;

  const handleSelect = (selected: DeliveryMethod) => {
    if (value === undefined) {
      setInternalMethod(selected);
    }
    onChange?.(selected);
  };

  return (
    <div className={`w-full ${className}`} suppressHydrationWarning>
      {/* Section Header */}
      <div className="mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md font-jakarta">
          Pilih Metode Penyaluran
        </h2>
        <p className="text-sm text-white/70 mt-1 font-jakarta">
          Pilih metode serah terima material daur ulang yang paling nyaman bagi Anda.
        </p>
      </div>

      {/* 1. The Layout & Container (Deep Glassmorphism Grid) */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-6"
        role="radiogroup"
        aria-label="Pilih Metode Penyaluran"
      >
        {OPTIONS.map((opt) => {
          const isActive = activeMethod === opt.id;

          return (
            <motion.div
              key={opt.id}
              role="radio"
              aria-checked={isActive}
              tabIndex={0}
              onClick={() => handleSelect(opt.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(opt.id);
                }
              }}
              whileTap={{ scale: 0.99 }}
              className={`group relative overflow-hidden rounded-[2rem] p-6 md:p-8 cursor-pointer border backdrop-blur-sm transition-all duration-300 select-none shadow-inner isolate ${
                isActive
                  ? 'bg-white/15 border-green-400/50 ring-2 ring-green-400/50 shadow-[0_0_40px_rgba(34,197,94,0.25)]'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-white/70'
              }`}
            >
              {/* 2. Dynamic Glowing Aura (Behind the 3D Model) */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-green-500/50 blur-[100px] pointer-events-none transition-opacity duration-700 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />

              {/* 4. The Checkmark Indicator */}
              <div className="absolute top-6 right-6 z-30 pointer-events-none">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="active-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 24,
                      }}
                      className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.6)] border border-green-400/50"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Immersive 3D Canvas (R3F & Drei Integration) - Strict Stacking Context */}
              <div className="w-full h-[200px] md:h-[240px] relative z-0 transform-gpu isolate">
                <Suspense fallback={<Model3DPlaceholder type={opt.id} />}>
                  <Delivery3DStage type={opt.id} />
                </Suspense>
              </div>

              {/* 4. Typography & Micro-Interactions */}
              <div className="relative z-20 text-center mt-4">
                <h3
                  className={`text-2xl font-black transition-colors duration-300 font-jakarta flex items-center justify-center gap-2 ${
                    isActive
                      ? 'text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.5)]'
                      : 'text-white/60 group-hover:text-white/90'
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">{opt.emoji}</span>
                  <span>{opt.title}</span>
                </h3>
                <p
                  className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                    isActive ? 'text-white/90' : 'text-white/50'
                  }`}
                >
                  {opt.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
