'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { GardenLevel } from './types';
import { MagicTree, PrehistoricEnvironment, SeedlingSprout, IslandGround } from './GardenModels';
import { TransitionParticles } from './TransitionParticles';
import { CameraController } from './CameraController';

interface ImpactSceneProps {
  level: GardenLevel;
  onBloomPulse?: (intensity: number) => void;
  containerRef?: React.RefObject<HTMLElement | null>;
  scrollProgressRef?: React.MutableRefObject<number>;
}

export function ImpactScene({
  level,
  onBloomPulse,
  containerRef,
  scrollProgressRef,
}: ImpactSceneProps) {
  // Model display state with transition support
  const [displayedLevel, setDisplayedLevel] = useState<GardenLevel>(level);
  const [isBurstActive, setIsBurstActive] = useState<boolean>(false);
  const targetLevelRef = useRef<GardenLevel>(level);

  // Model scale animation state
  const modelScaleRef = useRef(1.0);
  const targetScaleRef = useRef(1.0);
  const transitionPhaseRef = useRef<'idle' | 'shrink' | 'grow'>('idle');
  const phaseTimerRef = useRef(0);

  // Detect level changes to initiate the cinematic particle burst
  useEffect(() => {
    if (level !== displayedLevel && transitionPhaseRef.current === 'idle') {
      targetLevelRef.current = level;
      transitionPhaseRef.current = 'shrink';
      phaseTimerRef.current = 0;
      setIsBurstActive(true);

      // Trigger intense bloom flash
      if (onBloomPulse) {
        onBloomPulse(4.5);
      }
    }
  }, [level, displayedLevel, onBloomPulse]);

  useFrame((_, delta) => {
    // Morphing scale spring dynamics
    if (transitionPhaseRef.current === 'shrink') {
      phaseTimerRef.current += delta;
      // Recoil and scale down slightly
      modelScaleRef.current = THREE.MathUtils.damp(modelScaleRef.current, 0.45, 12, delta);

      if (phaseTimerRef.current > 0.35) {
        // Swap model mesh at peak particle burst
        setDisplayedLevel(targetLevelRef.current);
        transitionPhaseRef.current = 'grow';
        phaseTimerRef.current = 0;
        modelScaleRef.current = 0.05; // start from seed center
      }
    } else if (transitionPhaseRef.current === 'grow') {
      phaseTimerRef.current += delta;
      // Elastic pop-up expansion: overshoot then settle to 1.0
      targetScaleRef.current = 1.0;
      modelScaleRef.current = THREE.MathUtils.damp(modelScaleRef.current, 1.0, 7.5, delta);

      if (phaseTimerRef.current > 0.85 && Math.abs(modelScaleRef.current - 1.0) < 0.02) {
        modelScaleRef.current = 1.0;
        transitionPhaseRef.current = 'idle';
      }
    } else {
      modelScaleRef.current = THREE.MathUtils.damp(modelScaleRef.current, 1.0, 6, delta);
    }
  });

  const handleParticleComplete = () => {
    setIsBurstActive(false);
  };

  const currentScale = modelScaleRef.current;

  return (
    <>
      {/* Background & Depth Fog */}
      <color attach="background" args={['#040D09']} />
      <fog attach="fog" args={['#040D09', 8, 28]} />

      {/* Cinematic Lighting System */}
      {/* 1. Deep Forest Ambient */}
      <ambientLight intensity={0.24} color="#0D3524" />

      {/* 2. Moonlight Directional (Cool Cyan) with Soft Shadows */}
      <directionalLight
        position={[10, 16, -7]}
        intensity={1.8}
        color="#A5F3FC"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />

      {/* 3. Warm Emerald Life Energy Core */}
      <pointLight
        position={[0, 1.2, 0]}
        intensity={2.8}
        color="#10B981"
        distance={11}
        decay={2}
      />

      {/* 4. Warm Golden Biosphere Radiance */}
      <pointLight
        position={[0, 0.4, 0.8]}
        intensity={1.8}
        color="#FDE047"
        distance={7}
        decay={2}
      />

      {/* 5. Rim / Silhouette Accent Light */}
      <directionalLight
        position={[-10, 8, -9]}
        intensity={1.1}
        color="#06B6D4"
      />

      {/* Camera GSAP Controller */}
      <CameraController
        containerRef={containerRef}
        scrollProgressRef={scrollProgressRef}
      />

      {/* Floating Island Ground Base */}
      <IslandGround />

      {/* 3D Models with Suspense Fallback */}
      <Suspense fallback={<LoadingEcosystem />}>
        {displayedLevel === 1 && (
          <SeedlingSprout scale={currentScale} />
        )}

        {displayedLevel === 2 && (
          <>
            <MagicTree scale={currentScale * 1.0} glowBoost={1.0} />
            <PrehistoricEnvironment density={2} />
          </>
        )}

        {displayedLevel === 3 && (
          <>
            <MagicTree scale={currentScale * 1.15} glowBoost={1.5} />
            <PrehistoricEnvironment density={3} />
          </>
        )}
      </Suspense>

      {/* Level-Up Explosive Particle Burst */}
      <TransitionParticles
        active={isBurstActive}
        onComplete={handleParticleComplete}
        colorTheme={displayedLevel === 3 ? 'gold' : 'emerald'}
      />

      {/* Cinematic Firefly Swarm (<Sparkles>) */}
      {/* Glowing Emerald Fireflies */}
      <Sparkles
        count={120}
        scale={[11, 7, 11]}
        size={4.5}
        speed={0.4}
        color="#34D399"
        opacity={0.85}
        position={[0, 0.5, 0]}
      />

      {/* Warm Golden Pollen Fireflies */}
      <Sparkles
        count={75}
        scale={[8, 5, 8]}
        size={5.5}
        speed={0.3}
        color="#FDE047"
        opacity={0.9}
        position={[0, 0.8, 0]}
      />

      {/* Cyan Bioluminescent Spores */}
      <Sparkles
        count={50}
        scale={[12, 6, 12]}
        size={3.2}
        speed={0.5}
        color="#22D3EE"
        opacity={0.75}
        position={[0, 0.2, 0]}
      />
    </>
  );
}

/**
 * Aesthetic Fallback while GLTF models stream in
 */
function LoadingEcosystem() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 1.5;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#34D399"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
      <pointLight color="#10B981" intensity={3} distance={5} />
    </group>
  );
}

