'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sprout, Trees, Sparkles } from 'lucide-react';
import { GardenStageId, GARDEN_STAGES } from './types';

interface GrowthControlsProps {
  currentStage: GardenStageId;
  onStageChange: (stage: GardenStageId) => void;
}

export function GrowthControls({ currentStage, onStageChange }: GrowthControlsProps) {
  const [mounted, setMounted] = useState(false);
  const rawReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted && Boolean(rawReducedMotion);

  const getStageIcon = (id: GardenStageId) => {
    switch (id) {
      case 'tunas':
        return Sprout;
      case 'rimbun':
        return Trees;
      case 'hutan-kecil':
        return Sparkles;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Scrollable flex row on mobile, centered pill on desktop */}
      <div
        role="tablist"
        aria-label="Pilih Tahap Pertumbuhan Taman"
        className="w-full flex items-center justify-start sm:justify-center overflow-x-auto snap-x custom-scrollbar gap-2 sm:gap-3 p-1.5 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] shadow-sm shadow-[#177A47]/5 pb-2 -mx-1 px-1 sm:mx-0 sm:px-1.5 sm:pb-1.5"
      >
        {GARDEN_STAGES.map((s) => {
          const isSelected = s.id === currentStage;
          const Icon = getStageIcon(s.id);

          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onStageChange(s.id)}
              className={`relative shrink-0 flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 z-10 cursor-pointer snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] ${
                isSelected
                  ? 'text-white font-semibold shadow-xs'
                  : 'text-[#4A5D52] hover:text-[#0F1F17] hover:bg-white/60'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activePillIndicator"
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-gradient-to-r from-emerald-700 to-emerald-600 shadow-md shadow-emerald-700/25 -z-10"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0.25, duration: 0.45 }
                  }
                />
              )}
              <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${isSelected ? 'text-[#E3F6B5]' : 'text-[#5D7065]'}`} />
              <span className="whitespace-nowrap font-medium text-xs sm:text-sm">{s.name}</span>
              <span
                className={`text-[9px] sm:text-xs font-mono px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/25 text-white font-bold' : 'bg-[#E8F4EC] text-[#177A47]'
                }`}
              >
                {s.weight}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
