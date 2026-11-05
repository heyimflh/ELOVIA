'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function FloatingOrbs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none -z-10"
    >
      {/* Base Light Mode Ambient Surface (mist-50: #F6FAF7) */}
      <div className="absolute inset-0 bg-[#F6FAF7]" />

      {/* Subtle Eco-Tech Dot Grid Texture (PRD Section 14.1) */}
      <div className="absolute inset-0 bg-eco-grid opacity-35" />

      {/* 
        =======================================================================
        CREEM.IO-INSPIRED DREAMY FLOATING GLOWING ORBS
        Uses large blurred radial shapes with gentle, continuous drifting motion
        to create an atmospheric, luminous glassmorphic backdrop in Light Mode.
        =======================================================================
      */}

      {/* Orb 1: Soft Mint-200 (#D3EBDB) Top-Left / Center Drift */}
      <motion.div
        className="absolute -top-[15%] left-[5%] w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] lg:w-[680px] lg:h-[680px] rounded-full bg-[#D3EBDB]/75 blur-[90px] sm:blur-[120px] lg:blur-[140px] transform-gpu"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 45, -35, 20, 0],
                y: [0, -40, 30, -20, 0],
                scale: [1, 1.08, 0.94, 1.05, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb 2: Soft Teal-100 (#DDF3F1) Right / Center Drift */}
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] lg:w-[640px] lg:h-[640px] rounded-full bg-[#DDF3F1]/85 blur-[90px] sm:blur-[120px] lg:blur-[135px] transform-gpu"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -50, 40, -25, 0],
                y: [0, 45, -35, 20, 0],
                scale: [1, 0.93, 1.07, 0.96, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb 3: Luminous Mint/White Ambient Core Center-Bottom */}
      <motion.div
        className="absolute -bottom-[20%] left-[25%] w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full bg-gradient-to-tr from-[#D3EBDB]/60 via-[#E8F4EC]/80 to-[#DDF3F1]/70 blur-[80px] sm:blur-[110px] lg:blur-[130px] transform-gpu"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 35, -45, 15, 0],
                y: [0, -30, 40, -15, 0],
                scale: [1, 1.05, 0.96, 1.03, 1],
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glass Light Reflection / Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/40 via-transparent to-[#F6FAF7]/80 pointer-events-none" />
    </div>
  );
}

