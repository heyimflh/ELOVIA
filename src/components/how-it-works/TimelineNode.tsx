'use client';

import { motion } from 'framer-motion';

interface TimelineNodeProps {
  stageNumber: string;
  isActive: boolean;
  className?: string;
}

export function TimelineNode({ stageNumber, isActive, className = '' }: TimelineNodeProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Outer Pulse Glow Ring when Active */}
      {isActive && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.7, 1], opacity: [0.65, 0, 0.65] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-12 h-12 rounded-full bg-[#177A47]/20 pointer-events-none z-10"
        />
      )}

      {/* Main Node Circle:
          With solid opaque background (bg-white) and z-20 so the vertical track line 
          runs strictly behind it, guaranteeing that the stage number is 100% unobstructed.
      */}
      <motion.div
        animate={{
          scale: isActive ? 1.15 : 1,
          borderColor: isActive ? '#177A47' : '#D3EBDB',
          backgroundColor: isActive ? '#FFFFFF' : '#F6FAF7',
          boxShadow: isActive
            ? '0 0 24px rgba(23, 122, 71, 0.3), 0 4px 14px rgba(15, 31, 23, 0.08)'
            : '0 2px 8px rgba(15, 31, 23, 0.04)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="relative w-10 h-10 rounded-full border-2 flex items-center justify-center z-20 select-none cursor-default"
      >
        {/* Stage Number Centered Perfectly Inside The Node */}
        <motion.span
          animate={{
            color: isActive ? '#177A47' : '#A9D3B8',
            scale: isActive ? 1.05 : 0.95,
          }}
          transition={{ duration: 0.25 }}
          className="font-mono text-xs font-bold tracking-tight"
        >
          {stageNumber}
        </motion.span>
      </motion.div>
    </div>
  );
}
