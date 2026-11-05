'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sprout, Trees, Sparkles } from 'lucide-react';
import { GardenStageId, GARDEN_STAGES } from './types';

interface GrowthControlsProps {
  currentStage: GardenStageId;
  onStageChange: (stage: GardenStageId) => void;
}

export function GrowthControls({ currentStage, onStageChange }: GrowthControlsProps) {
  const shouldReduceMotion = useReducedMotion();

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
    <div className="w-full flex flex-col items-center gap-3">
      {/* 3 Pill-shaped Toggle Buttons */}
      <div
        role="tablist"
        aria-label="Pilih Tahap Pertumbuhan Taman"
        className="relative inline-flex items-center p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D3EBDB] shadow-sm shadow-[#177A47]/5 w-full sm:w-auto"
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
              className={`relative flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] ${
                isSelected ? 'text-white font-semibold' : 'text-[#4A5D52] hover:text-[#0F1F17]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activePillIndicator"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#177A47] to-[#2FA866] shadow-md shadow-[#177A47]/25 -z-10"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0.25, duration: 0.45 }
                  }
                />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#E3F6B5]' : 'text-[#5D7065]'}`} />
              <span className="whitespace-nowrap">{s.name}</span>
              <span
                className={`text-[10px] sm:text-xs font-mono px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-[#E8F4EC] text-[#177A47]'
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
