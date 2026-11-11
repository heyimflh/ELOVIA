'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TreePine, Flower2, Gem, Droplets, Sparkles } from 'lucide-react';
import { MATERIAL_ELEMENTS, GardenStageId, GARDEN_STAGES } from './types';

interface MaterialLegendProps {
  currentStage: GardenStageId;
  activeHighlight: string | null;
  onHoverElement: (elementId: string | null) => void;
  onClickElement: (elementId: 'paper' | 'plastic' | 'metal' | 'glass') => void;
}

export function MaterialLegend({
  currentStage,
  activeHighlight,
  onHoverElement,
  onClickElement,
}: MaterialLegendProps) {
  const [mounted, setMounted] = useState(false);
  const rawReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted && Boolean(rawReducedMotion);
  const currentStageData = GARDEN_STAGES.find((s) => s.id === currentStage) || GARDEN_STAGES[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'paper':
        return TreePine;
      case 'plastic':
        return Flower2;
      case 'metal':
        return Gem;
      case 'glass':
      default:
        return Droplets;
    }
  };

  return (
    <div className="w-full space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#177A47]" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F1F17] font-mono">
            Transformasi 4 Material Daur Ulang
          </h4>
        </div>
        <span className="text-[11px] text-[#5D7065] font-mono">
          Sorot untuk melihat di pulau
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
        {MATERIAL_ELEMENTS.map((item) => {
          const Icon = getIcon(item.id);
          const isHighlighted = activeHighlight === item.id;
          const currentStageDesc = currentStageData.elementsDescription[item.id];

          return (
            <motion.button
              key={item.id}
              onClick={() => onClickElement(item.id)}
              onMouseEnter={() => onHoverElement(item.id)}
              onMouseLeave={() => onHoverElement(null)}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className={`relative p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                isHighlighted
                  ? 'bg-white border-[#177A47] ring-2 ring-[#177A47]/30 shadow-md shadow-[#177A47]/15'
                  : 'bg-white/70 backdrop-blur-lg border-white/60 shadow-sm hover:bg-white/90 hover:border-[#A9D3B8]'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform shrink-0 shadow-2xs"
                  style={{ backgroundColor: item.lightBg, color: item.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/90 text-[#4A5D52] border border-[#D3EBDB]/60">
                  {item.categoryName.split(' ')[0]}
                </span>
              </div>

              <div className="space-y-1">
                <h5 className="text-xs sm:text-sm font-bold text-[#0F1F17]">
                  {item.gardenRepresentation}
                </h5>
                <p className="text-[11px] sm:text-xs text-[#177A47] font-semibold leading-tight">
                  {currentStageDesc}
                </p>
                <p className="text-[11px] text-[#5D7065] leading-relaxed line-clamp-2 pt-0.5">
                  {item.description}
                </p>
              </div>

              {isHighlighted && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#177A47] animate-ping" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
