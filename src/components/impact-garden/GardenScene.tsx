'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GardenStageId } from './types';

interface GardenSceneProps {
  stage: GardenStageId;
  activeHighlight: string | null;
  onElementClick?: (elementId: 'paper' | 'plastic' | 'metal' | 'glass') => void;
}

export function GardenScene({ stage, activeHighlight, onElementClick }: GardenSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  // Organic spring physics transition
  const springTransition = {
    type: 'spring' as const,
    stiffness: 220,
    damping: 18,
    bounce: 0.35,
  };

  const smoothSpring = {
    type: 'spring' as const,
    stiffness: 170,
    damping: 22,
  };

  return (
    <div className="relative w-full aspect-[4/3] max-w-[680px] mx-auto select-none">
      {/* 2.5D Island Container with gentle levitation */}
      <motion.div
        className="w-full h-full"
        animate={
          shouldReduceMotion
            ? { y: 0 }
            : {
                y: [0, -8, 0],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 920 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          role="img"
          aria-label={`Visualisasi 2.5D Impact Garden tahap ${stage}`}
        >
          <defs>
            {/* =========================================================
                ADVANCED GRADIENTS & SHADOW FILTERS (Realistic 2.5D)
               ========================================================= */}
            {/* Soft Ambient Ground Shadow */}
            <radialGradient id="islandGroundShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B4A2B" stopOpacity="0.28" />
              <stop offset="45%" stopColor="#177A47" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#177A47" stopOpacity="0" />
            </radialGradient>

            {/* Grass Meadow Top: Multi-tier lush foliage gradient */}
            <linearGradient id="grassMeadow" x1="160" y1="280" x2="740" y2="480" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8BE2A4" />
              <stop offset="30%" stopColor="#52C482" />
              <stop offset="70%" stopColor="#2BA462" />
              <stop offset="100%" stopColor="#198248" />
            </linearGradient>

            {/* Elevated Moss Hill (Tree Base Mound) */}
            <radialGradient id="mossHillMound" cx="42%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#B6F3CE" />
              <stop offset="40%" stopColor="#62CC8F" />
              <stop offset="85%" stopColor="#239757" />
              <stop offset="100%" stopColor="#146838" />
            </radialGradient>

            {/* Earth Cliff Left: Sunlit warm loam and sandstone strata */}
            <linearGradient id="cliffFaceLeft" x1="180" y1="380" x2="460" y2="570" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B5DCBF" />
              <stop offset="18%" stopColor="#80BD93" />
              <stop offset="45%" stopColor="#55996D" />
              <stop offset="75%" stopColor="#3C7550" />
              <stop offset="100%" stopColor="#255135" />
            </linearGradient>

            {/* Earth Cliff Right: Shaded geological rock and clay strata */}
            <linearGradient id="cliffFaceRight" x1="460" y1="380" x2="740" y2="570" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#55966E" />
              <stop offset="35%" stopColor="#35734E" />
              <stop offset="75%" stopColor="#1E4D31" />
              <stop offset="100%" stopColor="#0F331F" />
            </linearGradient>

            {/* Translucent Glassmorphic Edge Bevel */}
            <linearGradient id="glassBevelRim" x1="180" y1="280" x2="740" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#D1FAE5" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#6EE7B7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
            </linearGradient>

            {/* Pond Water: Multi-depth crystal aqua turquoise */}
            <linearGradient id="pondDeepWater" x1="480" y1="340" x2="680" y2="450" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="25%" stopColor="#38BDF8" />
              <stop offset="65%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            {/* Pond Shore Sandstone Bed */}
            <linearGradient id="pondShoreline" x1="470" y1="330" x2="690" y2="460" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            {/* Realistic Tree Bark Wood Grain */}
            <linearGradient id="sculptedWoodTrunk" x1="280" y1="180" x2="380" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9C663D" />
              <stop offset="25%" stopColor="#784723" />
              <stop offset="60%" stopColor="#573114" />
              <stop offset="100%" stopColor="#3A1C08" />
            </linearGradient>

            {/* Foliage Cloud Gradient: Sunlit Fresh Lime */}
            <radialGradient id="foliageSunlit" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="35%" stopColor="#4ADE80" />
              <stop offset="75%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#14532D" />
            </radialGradient>

            {/* Foliage Cloud Gradient: Deep Verdant Canopy */}
            <radialGradient id="foliageVerdant" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="40%" stopColor="#10B981" />
              <stop offset="80%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </radialGradient>

            {/* Foliage Cloud Gradient: Master Ancient Crown */}
            <radialGradient id="foliageAncientCrown" cx="32%" cy="26%" r="72%">
              <stop offset="0%" stopColor="#DCFCE7" />
              <stop offset="35%" stopColor="#34D399" />
              <stop offset="75%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022C22" />
            </radialGradient>

            {/* Sacred Lotus Petals (Soft Rose Pink to Silky Ivory) */}
            <linearGradient id="lotusSilkPetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFF1F2" />
              <stop offset="65%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>

            {/* Lotus Golden Stamen Pistil */}
            <radialGradient id="lotusGoldenCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Crystal Gem Facets (Emerald Quartz Prism) */}
            <linearGradient id="emeraldFacetA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E6FFFA" />
              <stop offset="40%" stopColor="#6EE7B7" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="emeraldFacetB" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="emeraldFacetC" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="60%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>

            {/* Ultra-clear Glass Dewdrop */}
            <radialGradient id="glassDewSphere" cx="30%" cy="25%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
            </radialGradient>

            {/* Sparkle Sunburst Flare */}
            <radialGradient id="sparkleFlare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#FDE68A" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Claymorphic Soft Shadow Filter */}
            <filter id="softClayShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0B3E22" floodOpacity="0.22" />
            </filter>

            {/* Element Glow Highlight Filter */}
            <filter id="highlightAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* =========================================================
              LAYER 0: ISLAND AMBIENT GROUND SHADOW
             ========================================================= */}
          <ellipse
            cx="460"
            cy="595"
            rx="320"
            ry="48"
            fill="url(#islandGroundShadow)"
            className="transition-all duration-700"
          />

          {/* =========================================================
              LAYER 1: 2.5D REALISTIC ISOMETRIC FLOATING ISLAND
             ========================================================= */}
          <g id="island-3d-base">
            {/* Lower Keel / Floating Bedrock */}
            <path
              d="M 190,370 
                 Q 460,520 730,370 
                 L 730,445 
                 Q 630,520 460,575 
                 Q 290,520 190,445 Z"
              fill="url(#cliffFaceRight)"
              filter="url(#softClayShadow)"
            />

            {/* Left Cliff Face (Lit loam & sandstone) */}
            <path
              d="M 190,370 
                 Q 325,445 460,480 
                 L 460,575 
                 Q 325,520 190,445 Z"
              fill="url(#cliffFaceLeft)"
            />

            {/* Geological Strata Bands */}
            <path
              d="M 215,405 Q 335,475 460,505"
              stroke="#68AE81"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.65"
            />
            <path
              d="M 460,505 Q 585,465 700,405"
              stroke="#266341"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M 245,435 Q 350,495 460,530"
              stroke="#438A5F"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />

            {/* Hanging ivy vines dangling from island cliff */}
            <path
              d="M 230,420 Q 225,455 235,485"
              stroke="#2E7D4E"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="235" cy="485" r="3.5" fill="#52C482" />
            <path
              d="M 270,440 Q 265,470 272,495"
              stroke="#236B40"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="272" cy="495" r="3" fill="#6EE7B7" />

            {/* Orbiting mini-rocks floating in the air */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <polygon points="140,420 152,410 158,426 146,432" fill="#5E9F76" />
              <polygon points="140,420 146,432 158,426 152,438" fill="#366B4A" />
            </motion.g>

            <motion.g
              animate={shouldReduceMotion ? {} : { y: [0, -7, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <polygon points="765,410 780,400 788,418 775,424" fill="#2E6845" />
              <polygon points="765,410 775,424 788,418 782,430" fill="#1B472D" />
            </motion.g>

            {/* Top Meadow Plateau (Tiered Grass Surface) */}
            <path
              d="M 190,370 
                 C 190,295 305,250 460,250 
                 C 615,250 730,295 730,370 
                 C 730,445 615,490 460,490 
                 C 305,490 190,445 190,370 Z"
              fill="url(#grassMeadow)"
            />

            {/* Elevated Tree Hill Mound (Volumetric Moss Plateau) */}
            <ellipse
              cx="355"
              cy="365"
              rx="155"
              ry="80"
              fill="url(#mossHillMound)"
            />

            {/* Stepping River Stones Trail (Winding to Pond) */}
            <g id="stepping-stones" opacity="0.8">
              <ellipse cx="380" cy="385" rx="10" ry="6" fill="#64748B" />
              <ellipse cx="379" cy="384" rx="8" ry="4.5" fill="#94A3B8" />

              <ellipse cx="410" cy="392" rx="12" ry="7" fill="#64748B" />
              <ellipse cx="409" cy="391" rx="10" ry="5.5" fill="#94A3B8" />

              <ellipse cx="445" cy="396" rx="13" ry="7.5" fill="#64748B" />
              <ellipse cx="444" cy="395" rx="11" ry="6" fill="#94A3B8" />
            </g>

            {/* Glassmorphic Edge Bevel Highlight */}
            <path
              d="M 190,370 
                 C 190,295 305,250 460,250 
                 C 615,250 730,295 730,370 
                 C 730,445 615,490 460,490 
                 C 305,490 190,445 190,370 Z"
              stroke="url(#glassBevelRim)"
              strokeWidth="4"
              fill="none"
              opacity="0.9"
            />
          </g>

          {/* =========================================================
              LAYER 2: PLASTIC ELEMENT -> PRISTINE POND & LOTUS
             ========================================================= */}
          <g
            id="element-plastic"
            className="cursor-pointer group"
            onClick={() => onElementClick?.('plastic')}
            filter={activeHighlight === 'plastic' ? 'url(#highlightAura)' : undefined}
          >
            {/* Natural Pond Stone Shoreline Bed */}
            <ellipse
              cx="580"
              cy="390"
              rx="110"
              ry="60"
              fill="url(#pondShoreline)"
              opacity="0.8"
            />
            {/* Crystal Turquoise Pond Basin */}
            <ellipse
              cx="580"
              cy="388"
              rx="102"
              ry="54"
              fill="url(#pondDeepWater)"
            />

            {/* Caustic Water Highlights */}
            <path
              d="M 515,385 C 540,368 575,372 605,382 C 635,392 660,384 668,388"
              stroke="#E0F2FE"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 535,402 C 560,410 600,408 630,398"
              stroke="#BAE6FD"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Golden Koi Fish Swimming in Deep Water (Hutan Kecil) */}
            <AnimatePresence>
              {stage === 'hutan-kecil' && (
                <motion.g
                  key="koi-fish"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={springTransition}
                >
                  <motion.path
                    d="M 550,405 C 560,400 575,402 585,408 C 578,410 565,411 550,405 Z"
                    fill="#EA580C"
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            x: [-10, 10, -10],
                            y: [-4, 4, -4],
                          }
                    }
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.circle
                    cx="585"
                    cy="408"
                    r="2"
                    fill="#FEF08A"
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.4, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Realistic Textured Lily Pads */}
            {/* Primary Lily Pad */}
            <motion.g
              animate={{
                scale: stage === 'tunas' ? 0.8 : stage === 'rimbun' ? 1.05 : 1.25,
                x: stage === 'hutan-kecil' ? -8 : 0,
              }}
              transition={springTransition}
              style={{ originX: '530px', originY: '385px' }}
            >
              <ellipse cx="530" cy="385" rx="24" ry="13" fill="#15803D" />
              <ellipse cx="529" cy="384" rx="21" ry="11" fill="#22C55E" />
              <polygon points="530,384 518,380 520,388" fill="#0284C7" />
              {/* Dewdrop on lily pad */}
              <circle cx="536" cy="382" r="2.5" fill="#FFFFFF" opacity="0.95" />
            </motion.g>

            {/* Secondary Lily Pad (Rimbun & Hutan Kecil) */}
            <AnimatePresence>
              {(stage === 'rimbun' || stage === 'hutan-kecil') && (
                <motion.g
                  key="lily-pad-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ ...springTransition, delay: 0.1 }}
                  style={{ originX: '620px', originY: '395px' }}
                >
                  <ellipse cx="620" cy="395" rx="22" ry="11" fill="#15803D" />
                  <ellipse cx="619" cy="394" rx="19" ry="9.5" fill="#16A34A" />
                  <polygon points="620,394 628,390 627,398" fill="#0284C7" />
                </motion.g>
              )}
            </AnimatePresence>

            {/* =======================================================
                THE SACRED LOTUS FLOWER
               ======================================================= */}
            {/* STAGE 1: Tunas Bud */}
            {stage === 'tunas' && (
              <motion.g
                key="lotus-tunas-bud"
                initial={{ scale: 0, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 15 }}
                transition={springTransition}
                style={{ originX: '575px', originY: '380px' }}
              >
                <line x1="575" y1="390" x2="575" y2="376" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 570,378 C 569,368 575,360 575,360 C 575,360 581,368 580,378 Z" fill="url(#lotusSilkPetal)" />
                <path d="M 572,379 C 572,370 575,363 575,363 C 575,363 578,370 578,379 Z" fill="#FCE7F3" />
                <path d="M 569,380 Q 575,383 581,380 Q 575,386 569,380 Z" fill="#16A34A" />
              </motion.g>
            )}

            {/* STAGE 2 & 3: Fully Blooming Sacred Lotus */}
            {(stage === 'rimbun' || stage === 'hutan-kecil') && (
              <motion.g
                key="lotus-blooming"
                initial={{ scale: 0, rotate: -20 }}
                animate={{
                  scale: stage === 'hutan-kecil' ? 1.3 : 1.05,
                  rotate: 0,
                  y: stage === 'hutan-kecil' ? -5 : 0,
                }}
                exit={{ scale: 0, rotate: 20 }}
                transition={springTransition}
                style={{ originX: '575px', originY: '378px' }}
              >
                {/* Broad Back Petals */}
                <motion.path
                  d="M 575,382 C 550,386 542,372 548,364 C 558,369 571,377 575,382 Z"
                  fill="url(#lotusSilkPetal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, ...springTransition }}
                />
                <motion.path
                  d="M 575,382 C 600,386 608,372 602,364 C 592,369 579,377 575,382 Z"
                  fill="url(#lotusSilkPetal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, ...springTransition }}
                />
                {/* Mid Tier Petals */}
                <motion.path
                  d="M 575,383 C 558,374 556,358 564,351 C 570,360 573,371 575,383 Z"
                  fill="url(#lotusSilkPetal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...springTransition }}
                />
                <motion.path
                  d="M 575,383 C 592,374 594,358 586,351 C 580,360 577,371 575,383 Z"
                  fill="url(#lotusSilkPetal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...springTransition }}
                />
                {/* Center Core Petals */}
                <motion.path
                  d="M 575,384 C 566,370 570,350 575,345 C 580,350 584,370 575,384 Z"
                  fill="url(#lotusSilkPetal)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, ...springTransition }}
                />
                {/* Golden Stamen Filament Core */}
                <motion.circle
                  cx="575"
                  cy="368"
                  r="5"
                  fill="url(#lotusGoldenCore)"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.25, 1],
                        }
                  }
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.g>
            )}

            {/* Extra Lotus in Hutan Kecil */}
            {stage === 'hutan-kecil' && (
              <motion.g
                key="lotus-side-bloom"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 0.9, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ ...springTransition, delay: 0.2 }}
                style={{ originX: '625px', originY: '375px' }}
              >
                <path d="M 625,378 C 612,372 616,360 621,355 C 626,360 628,369 625,378 Z" fill="url(#lotusSilkPetal)" />
                <path d="M 625,378 C 638,372 634,360 629,355 C 624,360 622,369 625,378 Z" fill="url(#lotusSilkPetal)" />
                <circle cx="625,366" r="3.5" fill="url(#lotusGoldenCore)" />
              </motion.g>
            )}

            {/* Concentric Water Wave Rings */}
            <motion.ellipse
              cx="575"
              cy="385"
              rx="28"
              ry="14"
              stroke="#BAE6FD"
              strokeWidth="2"
              fill="none"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.3 }
                  : {
                      rx: [20, 48],
                      ry: [10, 24],
                      opacity: [0.65, 0],
                    }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </g>

          {/* =========================================================
              LAYER 3: METAL ELEMENT -> MINERAL STONES & CRYSTALS
             ========================================================= */}
          <g
            id="element-metal"
            className="cursor-pointer group"
            onClick={() => onElementClick?.('metal')}
            filter={activeHighlight === 'metal' ? 'url(#highlightAura)' : undefined}
          >
            {/* Smooth Bedrock River Stones */}
            <ellipse cx="482" cy="355" rx="26" ry="14" fill="#475569" />
            <ellipse cx="480" cy="353" rx="23" ry="11.5" fill="#64748B" />
            <path
              d="M 468,350 C 475,345 490,345 496,350"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* STAGE 2: Rimbun Crystal Formation */}
            <AnimatePresence>
              {(stage === 'rimbun' || stage === 'hutan-kecil') && (
                <motion.g
                  key="crystal-growth-cluster"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={springTransition}
                  style={{ originX: '480px', originY: '355px' }}
                >
                  {/* Crystal Spire 1 */}
                  <polygon points="468,354 476,312 481,356" fill="url(#emeraldFacetA)" />
                  <polygon points="476,312 486,300 491,354 481,356" fill="url(#emeraldFacetB)" />
                  <polygon points="486,300 494,320 494,354 491,354" fill="url(#emeraldFacetC)" />
                  <line x1="476" y1="312" x2="486" y2="300" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                  {/* Crystal Spire 2 */}
                  <polygon points="494,355 500,328 504,357" fill="url(#emeraldFacetA)" />
                  <polygon points="500,328 506,334 507,357 504,357" fill="url(#emeraldFacetB)" />
                </motion.g>
              )}
            </AnimatePresence>

            {/* STAGE 3: Hutan Kecil Towering Geode Monolith */}
            <AnimatePresence>
              {stage === 'hutan-kecil' && (
                <motion.g
                  key="geode-monolith"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ ...springTransition, delay: 0.1 }}
                  style={{ originX: '475px', originY: '355px' }}
                >
                  <polygon points="460,355 472,255 480,355" fill="url(#emeraldFacetA)" />
                  <polygon points="472,255 482,240 490,353 480,355" fill="url(#emeraldFacetB)" />
                  <polygon points="482,240 496,268 494,353 490,353" fill="url(#emeraldFacetC)" />

                  {/* Golden Vein Seam */}
                  <path
                    d="M 474,272 Q 479,292 478,315 Q 484,332 482,353"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Sun Starburst Specular Flare */}
                  <motion.g
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: [0.85, 1.35, 0.85],
                            rotate: [0, 90, 180],
                          }
                    }
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ originX: '482px', originY: '240px' }}
                  >
                    <circle cx="482" cy="240" r="7" fill="url(#sparkleFlare)" />
                    <line x1="482" y1="228" x2="482" y2="252" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="470" y1="240" x2="494" y2="240" stroke="#FFFFFF" strokeWidth="2" />
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>
          </g>

          {/* =========================================================
              LAYER 4: PAPER ELEMENT -> THE REALISTIC LUSH TREE
             ========================================================= */}
          <g
            id="element-paper"
            className="cursor-pointer group"
            onClick={() => onElementClick?.('paper')}
            filter={activeHighlight === 'paper' ? 'url(#highlightAura)' : undefined}
          >
            {/* Rich Earth Soil Bed */}
            <ellipse cx="350" cy="390" rx="42" ry="20" fill="#2E523A" opacity="0.5" />

            {/* STAGE 1: Tunas (Organic Oak Seedling Sprout) */}
            {stage === 'tunas' && (
              <motion.g
                key="tree-tunas-seedling"
                initial={{ scale: 0, y: 35 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 35 }}
                transition={springTransition}
                style={{ originX: '350px', originY: '390px' }}
              >
                {/* Organic curved stem */}
                <path
                  d="M 350,390 Q 355,340 348,300 Q 344,280 350,265"
                  stroke="#16A34A"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 349,385 Q 353,340 347,300"
                  stroke="#86EFAC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Left tender leaf */}
                <motion.path
                  d="M 347,300 C 320,295 308,275 312,264 C 328,263 344,280 347,300 Z"
                  fill="url(#foliageSunlit)"
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, ...springTransition }}
                  style={{ originX: '347px', originY: '300px' }}
                />
                <path d="M 347,300 Q 330,284 314,268" stroke="#DCFCE7" strokeWidth="1.5" fill="none" />

                {/* Right sun-catching leaf */}
                <motion.path
                  d="M 347,290 C 375,280 392,258 386,246 C 370,246 352,266 347,290 Z"
                  fill="url(#foliageSunlit)"
                  initial={{ scale: 0, rotate: 25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, ...springTransition }}
                  style={{ originX: '347px', originY: '290px' }}
                />
                <path d="M 347,290 Q 366,270 384,250" stroke="#DCFCE7" strokeWidth="1.5" fill="none" />

                {/* Growing apex terminal bud */}
                <circle cx="350" cy="264" r="6" fill="#BBF7D0" />
              </motion.g>
            )}

            {/* STAGE 2: Rimbun (Flourishing Sculptural Tree) */}
            {stage === 'rimbun' && (
              <motion.g
                key="tree-rimbun-lush"
                initial={{ scale: 0.45, opacity: 0, y: 25 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.45, opacity: 0, y: 25 }}
                transition={springTransition}
                style={{ originX: '350px', originY: '390px' }}
              >
                {/* Natural Sculptural Trunk with Roots */}
                <path
                  d="M 334,390 
                     C 336,345 344,295 338,245 
                     C 338,245 324,222 305,208 
                     L 314,200 
                     C 332,216 344,236 348,240 
                     C 354,228 370,208 392,196 
                     L 398,204 
                     C 378,218 364,238 360,252 
                     C 364,300 366,345 368,390 Z"
                  fill="url(#sculptedWoodTrunk)"
                />
                {/* Trunk Specular Grain */}
                <path
                  d="M 342,385 C 344,345 348,300 345,255"
                  stroke="#D79B6C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.85"
                />

                {/* Dense Foliage Cluster: Left Wing */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, ...springTransition }}
                  style={{ originX: '295px', originY: '205px' }}
                >
                  <ellipse cx="295" cy="205" rx="55" ry="42" fill="url(#foliageVerdant)" />
                  <ellipse cx="292" cy="196" rx="46" ry="34" fill="url(#foliageSunlit)" />
                  <circle cx="280" cy="185" r="14" fill="#BBF7D0" opacity="0.65" />
                </motion.g>

                {/* Dense Foliage Cluster: Right Wing */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...springTransition }}
                  style={{ originX: '405px', originY: '198px' }}
                >
                  <ellipse cx="405" cy="200" rx="58" ry="44" fill="url(#foliageVerdant)" />
                  <ellipse cx="401" cy="190" rx="50" ry="36" fill="url(#foliageSunlit)" />
                  <circle cx="420" cy="178" r="16" fill="#BBF7D0" opacity="0.65" />
                </motion.g>

                {/* Dense Foliage Cluster: Master Crown */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, ...springTransition }}
                  style={{ originX: '350px', originY: '155px' }}
                >
                  <ellipse cx="350" cy="158" rx="72" ry="54" fill="url(#foliageVerdant)" />
                  <ellipse cx="347" cy="146" rx="62" ry="44" fill="url(#foliageSunlit)" />
                  <circle cx="330" cy="125" r="22" fill="#DCFCE7" opacity="0.75" />
                  <circle cx="375" cy="138" r="18" fill="#DCFCE7" opacity="0.65" />
                </motion.g>

                {/* Blossoms / Fresh Buds */}
                <circle cx="300" cy="190" r="4.5" fill="#FEF08A" />
                <circle cx="385" cy="175" r="4.5" fill="#FEF08A" />
                <circle cx="350" cy="120" r="5" fill="#FEF08A" />
              </motion.g>
            )}

            {/* STAGE 3: Hutan Kecil (Majestic Ancient Tree with Multi-Tier Canopies) */}
            {stage === 'hutan-kecil' && (
              <motion.g
                key="tree-ancient-canopy"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={springTransition}
                style={{ originX: '350px', originY: '390px' }}
              >
                {/* Ancient Giant Buttressed Trunk */}
                <path
                  d="M 320,392 
                     C 330,330 336,260 330,195 
                     C 322,175 285,152 245,135 
                     L 254,125 
                     C 298,146 334,170 344,185 
                     C 348,155 352,120 350,92 
                     L 362,92 
                     C 364,120 362,158 366,182 
                     C 380,165 418,142 460,126 
                     L 468,135 
                     C 424,154 390,178 376,196 
                     C 372,260 376,330 388,392 Z"
                  fill="url(#sculptedWoodTrunk)"
                />

                {/* Hanging Living Lianas / Vines */}
                <motion.path
                  d="M 270,145 Q 262,190 272,225"
                  stroke="#15803D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={shouldReduceMotion ? {} : { rotate: [-2, 3, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ originX: '270px', originY: '145px' }}
                />
                <motion.path
                  d="M 435,145 Q 442,185 432,220"
                  stroke="#16A34A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  animate={shouldReduceMotion ? {} : { rotate: [2, -3, 2] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  style={{ originX: '435px', originY: '145px' }}
                />

                {/* Tier 1: Grand Left Wing Dome */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, ...springTransition }}
                  style={{ originX: '245px', originY: '135px' }}
                >
                  <ellipse cx="245" cy="138" rx="72" ry="52" fill="url(#foliageAncientCrown)" />
                  <ellipse cx="240" cy="128" rx="62" ry="42" fill="url(#foliageSunlit)" />
                  <circle cx="220" cy="112" r="22" fill="#DCFCE7" opacity="0.75" />
                </motion.g>

                {/* Tier 2: Grand Right Wing Dome */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, ...springTransition }}
                  style={{ originX: '455px', originY: '132px' }}
                >
                  <ellipse cx="455" cy="135" rx="75" ry="54" fill="url(#foliageAncientCrown)" />
                  <ellipse cx="450" cy="125" rx="65" ry="44" fill="url(#foliageSunlit)" />
                  <circle cx="470" cy="110" r="24" fill="#DCFCE7" opacity="0.75" />
                </motion.g>

                {/* Tier 3: Supreme High Crown */}
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, ...springTransition }}
                  style={{ originX: '352px', originY: '85px' }}
                >
                  <ellipse cx="352" cy="88" rx="95" ry="65" fill="url(#foliageAncientCrown)" />
                  <ellipse cx="350" cy="76" rx="82" ry="52" fill="url(#foliageSunlit)" />
                  <ellipse cx="346" cy="65" rx="62" ry="38" fill="#86EFAC" opacity="0.9" />
                  <circle cx="330" cy="50" r="30" fill="#DCFCE7" opacity="0.85" />
                </motion.g>

                {/* Golden Fruit Clusters */}
                <circle cx="295" cy="110" r="5.5" fill="#F59E0B" />
                <circle cx="405" cy="98" r="5" fill="#F59E0B" />
                <circle cx="360" cy="46" r="5.5" fill="#FEF08A" />
                <circle cx="225" cy="148" r="4.5" fill="#F59E0B" />
                <circle cx="485" cy="142" r="5" fill="#F59E0B" />
              </motion.g>
            )}
          </g>

          {/* =========================================================
              LAYER 5: GLASS ELEMENT -> CLEAR DEW & CASCADING WATER
             ========================================================= */}
          <g
            id="element-glass"
            className="cursor-pointer group"
            onClick={() => onElementClick?.('glass')}
            filter={activeHighlight === 'glass' ? 'url(#highlightAura)' : undefined}
          >
            {/* STAGE 1: Tunas Dewdrop on Leaf */}
            {stage === 'tunas' && (
              <motion.g
                key="dewdrop-tunas"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ delay: 0.25, ...springTransition }}
              >
                <circle cx="312" cy="264" r="7" fill="url(#glassDewSphere)" />
                <circle cx="309" cy="261" r="2.5" fill="#FFFFFF" opacity="0.98" />
              </motion.g>
            )}

            {/* STAGE 2: Rimbun Glistening Prismatic Drops */}
            {(stage === 'rimbun' || stage === 'hutan-kecil') && (
              <motion.g
                key="dewdrops-rimbun"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={smoothSpring}
              >
                {/* Left Tree Dew */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.2, 1],
                        }
                  }
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ originX: '255px', originY: '190px' }}
                >
                  <circle cx="255" cy="190" r="6" fill="url(#glassDewSphere)" />
                  <circle cx="253" cy="188" r="2.2" fill="#FFFFFF" />
                </motion.g>

                {/* Right Tree Dew */}
                <motion.g
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: [1, 1.25, 1],
                        }
                  }
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  style={{ originX: '445px', originY: '180px' }}
                >
                  <circle cx="445" cy="180" r="6.5" fill="url(#glassDewSphere)" />
                  <circle cx="443" cy="177" r="2.4" fill="#FFFFFF" />
                </motion.g>

                {/* Crystal Tip Dew */}
                <circle cx="486" cy="300" r="5" fill="url(#glassDewSphere)" />
                <circle cx="484" cy="298" r="1.8" fill="#FFFFFF" />
              </motion.g>
            )}

            {/* STAGE 3: Hutan Kecil Living Waterfall & Spring Trickle */}
            {stage === 'hutan-kecil' && (
              <motion.g
                key="cascading-spring"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={springTransition}
              >
                {/* Water Stream from crystals to pond */}
                <path
                  d="M 495,355 Q 520,368 545,382"
                  stroke="#E0F2FE"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
                <path
                  d="M 496,356 Q 522,370 547,384"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Splash Beads bouncing */}
                <motion.circle
                  cx="548"
                  cy="380"
                  r="3"
                  fill="#FFFFFF"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [-5, 2, -5],
                          opacity: [0.95, 0.4, 0.95],
                        }
                  }
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.circle
                  cx="540"
                  cy="386"
                  r="2.5"
                  fill="#7DD3FC"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [-4, 1, -4],
                          opacity: [0.85, 0.3, 0.85],
                        }
                  }
                  transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
              </motion.g>
            )}
          </g>

          {/* =========================================================
              LAYER 6: INTERACTIVE HOTSPOT PINS DIRECTLY ON THE ISLAND
              Solves Issue #1 completely: no need to scroll back and forth!
             ========================================================= */}
          {/* Tree Hotspot Pin */}
          <g
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onElementClick?.('paper');
            }}
          >
            <motion.circle
              cx="350"
              cy="235"
              r="16"
              fill={activeHighlight === 'paper' ? '#177A47' : 'rgba(255,255,255,0.92)'}
              stroke="#177A47"
              strokeWidth="2.5"
              className="shadow-lg"
              whileHover={{ scale: 1.25 }}
            />
            <text
              x="350"
              y="239"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={activeHighlight === 'paper' ? '#FFFFFF' : '#177A47'}
              className="pointer-events-none select-none font-mono"
            >
              🌿
            </text>
          </g>

          {/* Lotus Pond Hotspot Pin */}
          <g
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onElementClick?.('plastic');
            }}
          >
            <motion.circle
              cx="575"
              cy="345"
              r="16"
              fill={activeHighlight === 'plastic' ? '#0E7C7B' : 'rgba(255,255,255,0.92)'}
              stroke="#0E7C7B"
              strokeWidth="2.5"
              whileHover={{ scale: 1.25 }}
            />
            <text
              x="575"
              y="349"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={activeHighlight === 'plastic' ? '#FFFFFF' : '#0E7C7B'}
              className="pointer-events-none select-none font-mono"
            >
              🪷
            </text>
          </g>

          {/* Mineral Crystals Hotspot Pin */}
          <g
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onElementClick?.('metal');
            }}
          >
            <motion.circle
              cx="486"
              cy="285"
              r="16"
              fill={activeHighlight === 'metal' ? '#D97706' : 'rgba(255,255,255,0.92)'}
              stroke="#D97706"
              strokeWidth="2.5"
              whileHover={{ scale: 1.25 }}
            />
            <text
              x="486"
              y="289"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={activeHighlight === 'metal' ? '#FFFFFF' : '#D97706'}
              className="pointer-events-none select-none font-mono"
            >
              💎
            </text>
          </g>

          {/* Clear Dew Hotspot Pin */}
          <g
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onElementClick?.('glass');
            }}
          >
            <motion.circle
              cx="312"
              cy="245"
              r="15"
              fill={activeHighlight === 'glass' ? '#0284C7' : 'rgba(255,255,255,0.92)'}
              stroke="#0284C7"
              strokeWidth="2.5"
              whileHover={{ scale: 1.25 }}
            />
            <text
              x="312"
              y="249"
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill={activeHighlight === 'glass' ? '#FFFFFF' : '#0284C7'}
              className="pointer-events-none select-none font-mono"
            >
              💧
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
