'use client';

import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface StageBullet {
  icon: LucideIcon;
  text: string;
}

export interface StageCardProps {
  stageNumber: string;
  badge: string;
  title: string;
  highlightedWord?: string;
  description: string;
  bullets: StageBullet[];
  align?: 'left' | 'right';
}

export function StageCard({
  stageNumber,
  badge,
  title,
  highlightedWord,
  description,
  bullets,
}: StageCardProps) {
  // Split title if highlightedWord is provided
  const renderTitle = () => {
    if (!highlightedWord || !title.includes(highlightedWord)) {
      return title;
    }
    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#177A47] relative inline-block">
          {highlightedWord}
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#E3F6B5] -z-10 rounded-full" />
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="relative flex flex-col justify-center py-4">
      {/* Huge subtle background stage number (Fraunces font) */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 -left-4 sm:-top-12 sm:-left-6 font-fraunces text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-[#D3EBDB]/35 -z-10 transition-colors"
      >
        {stageNumber}
      </span>

      {/* Stage Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] font-mono text-xs font-semibold uppercase tracking-wider shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#177A47]" />
          {badge}
        </span>
      </div>

      {/* Main Title */}
      <h3 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F1F17] leading-tight tracking-tight mb-3">
        {renderTitle()}
      </h3>

      {/* Main Description */}
      <p className="font-jakarta text-sm sm:text-base text-[#4A5D52] leading-relaxed mb-6 max-w-xl">
        {description}
      </p>

      {/* 3 Micro-feature Bullet Points */}
      <div className="space-y-3 font-jakarta">
        {bullets.map((bullet, idx) => {
          const Icon = bullet.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-start gap-3 text-xs sm:text-sm text-[#0F1F17]"
            >
              <div className="mt-0.5 p-1.5 rounded-lg bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="leading-snug text-[#4A5D52] font-medium pt-0.5">
                {bullet.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

