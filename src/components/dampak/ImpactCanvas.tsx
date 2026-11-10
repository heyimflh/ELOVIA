'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { GardenLevel } from './types';
import { ImpactScene } from './ImpactScene';

interface ImpactCanvasProps {
  level: GardenLevel;
  containerRef?: React.RefObject<HTMLElement | null>;
  scrollProgressRef?: React.MutableRefObject<number>;
}

export function ImpactCanvas({
  level,
  containerRef,
  scrollProgressRef,
}: ImpactCanvasProps) {
  // Client-side hydration guard for WebGL
  const [isMounted, setIsMounted] = useState(false);

  // Dynamic Bloom intensity state with flash surge capability
  const [bloomIntensity, setBloomIntensity] = useState(1.25);
  const bloomAnimRef = useRef({ intensity: 1.25 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Trigger bloom flash during level transitions
  const handleBloomPulse = useCallback((flashValue = 4.2) => {
    bloomAnimRef.current.intensity = flashValue;
    setBloomIntensity(flashValue);

    gsap.killTweensOf(bloomAnimRef.current);
    gsap.to(bloomAnimRef.current, {
      intensity: 1.25,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        setBloomIntensity(bloomAnimRef.current.intensity);
      },
    });
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full h-full bg-[#040D09] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400/80">
            Memuat Biosfer 3D ELOVIA...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#040D09] select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        camera={{
          position: [0, 4.4, 9.8],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
        className="w-full h-full"
      >
        {/* Main 3D World */}
        <ImpactScene
          level={level}
          onBloomPulse={handleBloomPulse}
          containerRef={containerRef}
          scrollProgressRef={scrollProgressRef}
        />

        {/* Post-Processing Cinematic Glow Pipeline */}
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
