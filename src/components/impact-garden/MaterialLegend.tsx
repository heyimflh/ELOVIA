'use client';

import React from 'react';
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
  const shouldReduceMotion = useReducedMotion();
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
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#177A47]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1F17] font-mono">
            Transformasi 4 Material Daur Ulang
          </h4>
        </div>
        <span className="text-[11px] text-[#5D7065] font-mono">
          Sorot untuk melihat di pulau
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
              className={`relative p-3 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                isHighlighted
                  ? 'bg-white border-[#177A47] ring-2 ring-[#177A47]/25 shadow-md shadow-[#177A47]/10'
                  : 'bg-white/80 hover:bg-white border-[#D3EBDB]/80 shadow-2xs hover:border-[#A9D3B8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform"
                  style={{ backgroundColor: item.lightBg, color: item.color }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#F6FAF7] text-[#4A5D52] border border-[#D3EBDB]/50">
                  {item.categoryName.split(' ')[0]}
                </span>
              </div>

              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-[#0F1F17]">
                  {item.gardenRepresentation}
                </h5>
                <p className="text-[11px] text-[#177A47] font-medium leading-tight">
                  {currentStageDesc}
                </p>
                <p className="text-[10px] text-[#5D7065] leading-snug line-clamp-1 pt-0.5">
                  {item.description}
                </p>
              </div>

              {isHighlighted && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#177A47] animate-ping" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
