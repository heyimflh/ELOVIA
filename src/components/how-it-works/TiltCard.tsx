'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 8)
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for silky 3D response
  const mouseXSpring = useSpring(mouseX, { stiffness: 240, damping: 24, mass: 0.6 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 240, damping: 24, mass: 0.6 });

  // 3D Rotations
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${maxTilt}deg`, `-${maxTilt}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${maxTilt}deg`, `${maxTilt}deg`]
  );

  // Dynamic light glare following mouse
  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]) =>
      `radial-gradient(circle 380px at ${(Number(xVal) + 0.5) * 100}% ${(Number(yVal) + 0.5) * 100}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 50%, transparent 80%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      // Normalize to [-0.5, 0.5]
      const xPct = xPos / rect.width - 0.5;
      const yPct = yPos / rect.height - 0.5;

      mouseX.set(xPct);
      mouseY.set(yPct);
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  return (
    <div
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        whileHover={{
          scale: shouldReduceMotion ? 1 : 1.02,
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        className="relative w-full h-full rounded-2xl md:rounded-3xl transition-shadow duration-300"
      >
        {/* Child Content */}
        {children}

        {/* Specular Glare Overlay */}
        {glare && isHovered && !shouldReduceMotion && (
          <motion.div
            style={{ background: glareBackground }}
            className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none z-30 transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  );
}

