'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  glowColor: string;
  delay: number;
  duration: number;
  xRange: number;
  yRange: number;
}

export function FloatingParticles({ count = 22 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const particles: Particle[] = useMemo(() => {
    const colors = [
      { color: '#FCD34D', glow: 'rgba(251, 191, 36, 0.55)' }, // Golden pollen
      { color: '#6EE7B7', glow: 'rgba(52, 211, 153, 0.55)' }, // Emerald firefly
      { color: '#A7F3D0', glow: 'rgba(110, 231, 183, 0.5)' },  // Mint light
      { color: '#BAE6FD', glow: 'rgba(56, 189, 248, 0.45)' }, // Dew spark
      { color: '#FEF08A', glow: 'rgba(254, 240, 138, 0.6)' }, // Soft yellow
    ];

    // Seeded-like fixed distribution around central island area
    const positions = [
      { top: '18%', left: '22%' },
      { top: '24%', left: '76%' },
      { top: '32%', left: '15%' },
      { top: '38%', left: '84%' },
      { top: '45%', left: '26%' },
      { top: '48%', left: '72%' },
      { top: '56%', left: '18%' },
      { top: '60%', left: '80%' },
      { top: '68%', left: '30%' },
      { top: '72%', left: '68%' },
      { top: '28%', left: '48%' },
      { top: '36%', left: '34%' },
      { top: '42%', left: '60%' },
      { top: '52%', left: '44%' },
      { top: '58%', left: '56%' },
      { top: '64%', left: '38%' },
      { top: '20%', left: '62%' },
      { top: '78%', left: '50%' },
      { top: '15%', left: '38%' },
      { top: '82%', left: '28%' },
      { top: '80%', left: '74%' },
      { top: '26%', left: '88%' },
    ];

    return Array.from({ length: Math.min(count, positions.length) }, (_, i) => {
      const palette = colors[i % colors.length];
      const pos = positions[i];
      return {
        id: i,
        top: pos.top,
        left: pos.left,
        size: (i % 3 === 0 ? 5 : i % 2 === 0 ? 4 : 3),
        color: palette.color,
        glowColor: palette.glow,
        delay: (i * 0.35) % 3,
        duration: 4.5 + (i % 4) * 0.8,
        xRange: (i % 2 === 0 ? 1 : -1) * (10 + (i % 8) * 2),
        yRange: (i % 3 === 0 ? -1 : 1) * (14 + (i % 6) * 3),
      };
    });
  }, [count]);

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-15" aria-hidden="true">
        {particles.slice(0, 8).map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-40"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.glowColor}`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${p.glowColor}, 0 0 ${p.size * 5}px ${p.glowColor}`,
          }}
          animate={{
            x: [0, p.xRange, -p.xRange * 0.5, 0],
            y: [0, p.yRange, p.yRange * 0.4, 0],
            opacity: [0.15, 0.85, 0.4, 0.9, 0.15],
            scale: [0.8, 1.25, 0.9, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

