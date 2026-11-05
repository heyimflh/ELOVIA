'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedDotGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 
        Slowly moving dot-grid pattern.
        Pattern size is 28px by 28px. Moving by 28px diagonally produces a seamless continuous cycle.
      */}
      <motion.div
        className="absolute -inset-10 opacity-5"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 28],
                y: [0, 28],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 1.5px 1.5px, #177A47 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
          backgroundPosition: '0 0',
        }}
      />

      {/* Gentle radial vignette mask so dots fade out naturally near section boundaries */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(255, 255, 255, 0.85) 90%, #FFFFFF 100%)',
        }}
      />
    </div>
  );
}

