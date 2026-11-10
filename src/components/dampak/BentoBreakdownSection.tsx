'use client';

import React, { useRef, useState, useEffect, Suspense, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  useGLTF,
  Center,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView, type Variants } from 'framer-motion';
import CountUp from 'react-countup';
import {
  BarChart3,
  Layers,
  Sparkles,
  RefreshCw,
  Info,
  ShieldCheck,
  TrendingUp,
  Activity,
  Maximize2,
  Box,
  Cylinder,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   1. 3D ERROR BOUNDARY & SAFE LOADING HELPERS
   ───────────────────────────────────────────────────────────────────────────── */
interface Safe3DProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface Safe3DState {
  hasError: boolean;
}

export class Safe3DErrorBoundary extends Component<Safe3DProps, Safe3DState> {
  state: Safe3DState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: unknown) {
    // Suppress console crash and gracefully render aesthetic physical geometry fallback
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Safe Environment with procedural fallback in case remote city HDR fails
 */
function SafeCityEnvironment() {
  return (
    <Safe3DErrorBoundary
      fallback={
        <Environment resolution={128}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial side={THREE.BackSide} color="#f8fafc" />
          </mesh>
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <ambientLight intensity={0.5} />
        </Environment>
      }
    >
      <Suspense
        fallback={
          <hemisphereLight args={['#f8fafc', '#cbd5e1', 0.8]} position={[0, 20, 0]} />
        }
      >
        <Environment preset="city" />
      </Suspense>
    </Safe3DErrorBoundary>
  );
}

/**
 * GLTF Loader wrapper with automatic fallback to aesthetic basic geometries
 */
useGLTF.preload('/3dModels/items/bottle.glb');
useGLTF.preload('/3dModels/items/box.glb');

function SafeGLTFModelInner({
  url,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: {
  url: string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const cloned = React.useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} position={position} scale={scale} rotation={rotation} />;
}

function SafeGLTFModel({
  url,
  fallback,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: {
  url: string;
  fallback: ReactNode;
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <Safe3DErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <SafeGLTFModelInner url={url} position={position} scale={scale} rotation={rotation} />
      </Suspense>
    </Safe3DErrorBoundary>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. PARAMETRIC 3D STACKED OBJECTS (STRICTLY NO 2D CHARTS)
   ───────────────────────────────────────────────────────────────────────────── */

/**
 * Dynamic Vertical 3D Stack:
 * Stacks N items vertically based on the metric value (e.g., 8 items for 80% plastic)
 */
function ParametricVerticalStack({
  count = 8,
  spacing = 0.32,
  color = '#22c55e',
  type = 'cylinder',
  transmission = 0.95,
  roughness = 0.15,
  thickness = 2.0,
  metalness = 0.1,
  modelUrl,
}: {
  count: number;
  spacing?: number;
  color?: string;
  type?: 'cylinder' | 'box' | 'puck';
  transmission?: number;
  roughness?: number;
  thickness?: number;
  metalness?: number;
  modelUrl?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow continuous ambient rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  const items = Array.from({ length: count }, (_, i) => i);
  const baseOffset = -((count - 1) * spacing) / 2;

  return (
    <group ref={groupRef} position={[0, baseOffset * 0.4, 0]}>
      {items.map((idx) => {
        const yPos = baseOffset + idx * spacing;
        const fallbackMesh = (
          <mesh position={[0, yPos, 0]} castShadow receiveShadow>
            {type === 'cylinder' && <cylinderGeometry args={[0.38, 0.42, spacing * 0.85, 32]} />}
            {type === 'box' && <boxGeometry args={[0.7, spacing * 0.8, 0.7]} />}
            {type === 'puck' && <cylinderGeometry args={[0.44, 0.44, spacing * 0.8, 32]} />}
            <meshPhysicalMaterial
              color={color}
              transmission={transmission}
              roughness={roughness}
              thickness={thickness}
              metalness={metalness}
              ior={1.48}
              transparent
              opacity={0.92}
              clearcoat={transmission > 0.5 ? 1 : 0}
              clearcoatRoughness={0.1}
            />
          </mesh>
        );

        if (modelUrl) {
          return (
            <SafeGLTFModel
              key={idx}
              url={modelUrl}
              position={[0, yPos, 0]}
              scale={0.4}
              fallback={fallbackMesh}
            />
          );
        }

        return <React.Fragment key={idx}>{fallbackMesh}</React.Fragment>;
      })}
    </group>
  );
}

/**
 * Main 3D Multi-Tower Isometric Stage:
 * Renders all 4 material categories simultaneously as 3D physical columns on a stage
 */
function OverallWasteBreakdown3D() {
  const stageRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={stageRef} position={[0, -0.2, 0]}>
      {/* ── Tower 1: Plastic PET (42% -> 8 stacked items) ── */}
      <group position={[-1.2, 0, -0.6]}>
        <ParametricVerticalStack
          count={8}
          spacing={0.24}
          color="#22c55e"
          type="cylinder"
          transmission={0.95}
          roughness={0.15}
          thickness={2.2}
          modelUrl="/3dModels/items/bottle.glb"
        />
      </group>

      {/* ── Tower 2: Silica Glass (28% -> 6 stacked crystal prisms) ── */}
      <group position={[1.2, 0, -0.6]}>
        <ParametricVerticalStack
          count={6}
          spacing={0.26}
          color="#2dd4bf"
          type="cylinder"
          transmission={1.0}
          roughness={0.08}
          thickness={2.8}
          modelUrl="/3dModels/items/bottle.glb"
        />
      </group>

      {/* ── Tower 3: Paper & Cellulose (18% -> 4 stacked amber blocks) ── */}
      <group position={[-0.8, 0, 1.1]}>
        <ParametricVerticalStack
          count={4}
          spacing={0.24}
          color="#fbbf24"
          type="box"
          transmission={0.45}
          roughness={0.35}
          thickness={1.2}
          modelUrl="/3dModels/items/box.glb"
        />
      </group>

      {/* ── Tower 4: Metal & Aluminum (12% -> 3 stacked metallic pucks) ── */}
      <group position={[0.9, 0, 1.1]}>
        <ParametricVerticalStack
          count={3}
          spacing={0.25}
          color="#e2e8f0"
          type="puck"
          transmission={0}
          metalness={0.9}
          roughness={0.22}
        />
      </group>

      {/* Circular Frosted Glass Pedestal */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.15, 48]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.8}
          roughness={0.25}
          thickness={1.5}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. ISOLATED 3D CANVAS WRAPPERS (Clean Architecture Separation)
   ───────────────────────────────────────────────────────────────────────────── */

function MainChartCanvas() {
  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] relative">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.8, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[6, 12, 6]}
          intensity={1.8}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#67e8f9" />
        <SafeCityEnvironment />

        <Center>
          <OverallWasteBreakdown3D />
        </Center>

        <ContactShadows
          opacity={0.65}
          scale={8}
          blur={2.4}
          far={3.5}
          position={[0, -1.21, 0]}
          color="#061c13"
        />
      </Canvas>
    </div>
  );
}

function MiniCategoryCanvas({
  count,
  color,
  type,
  transmission = 0.95,
  roughness = 0.15,
  thickness = 2.0,
  metalness = 0.1,
  modelUrl,
}: {
  count: number;
  color: string;
  type: 'cylinder' | 'box' | 'puck';
  transmission?: number;
  roughness?: number;
  thickness?: number;
  metalness?: number;
  modelUrl?: string;
}) {
  return (
    <div className="w-full h-36 sm:h-44 relative">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.5, 3.2], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight castShadow position={[5, 8, 4]} intensity={1.6} />
        <SafeCityEnvironment />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
          <Center>
            <ParametricVerticalStack
              count={count}
              spacing={0.28}
              color={color}
              type={type}
              transmission={transmission}
              roughness={roughness}
              thickness={thickness}
              metalness={metalness}
              modelUrl={modelUrl}
            />
          </Center>
        </Float>

        <ContactShadows
          opacity={0.5}
          scale={4}
          blur={2}
          far={2.5}
          position={[0, -1.0, 0]}
          color="#061c13"
        />
      </Canvas>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. BENTO BREAKDOWN SECTION (UI OVERLAY + MONOSPACE TYPOGRAPHY)
   ───────────────────────────────────────────────────────────────────────────── */

export function BentoBreakdownSection({
  className = '',
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="bento-breakdown"
      aria-label="Bento Breakdown & Contribution Visual Diagram"
      className={`relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden ${className}`}
    >
      {/* ── Ambient Radial Atmosphere Blobs ───────────────── */}
      <div className="absolute top-1/4 -left-32 w-[32rem] h-[32rem] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-[30rem] h-[30rem] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-lime-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-14">
        {/* ── Section Header ───────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 uppercase tracking-widest shadow-sm font-sans">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Diagram Kontribusi 3D Parametrik</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              Bento Breakdown &amp; <span className="text-emerald-400">Komposisi Sirkular</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl font-normal leading-relaxed font-sans">
              Visualisasi 3D parametrik volume daur ulang real-time tanpa grafik 2D konvensional.
              Tinggi susunan objek merefleksikan rasio massa material secara presisi.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/60 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 self-start md:self-end">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              3D ISOMETRIC ENGINE
            </span>
            <span className="text-white/30">|</span>
            <span>TOTAL: 3.248 KG</span>
          </div>
        </div>

        {/* ── Bento Grid: 1 col on mobile, 3 on md, 4 on lg ───── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ════════════════════════════════════════════════════
              MAIN CARD (md:col-span-2 md:row-span-2)
              Overall Waste Breakdown 3D Isometric Stage
             ════════════════════════════════════════════════════ */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            {/* Specular Highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 via-transparent to-transparent"
              aria-hidden="true"
            />

            {/* Main Card Header Overlay */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-emerald-400 font-bold block mb-1">
                  Komposisi Menyeluruh
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                  Overall Waste Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-white/65 font-sans mt-1">
                  Menara 3D interaktif merefleksikan 4 fraksi material sirkular terverifikasi.
                </p>
              </div>

              {/* Total Aggregate Counter */}
              <div className="text-left sm:text-right p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                <span className="text-[11px] font-sans text-white/50 block">Massa Kumulatif</span>
                <div className="flex items-baseline gap-1 font-mono text-3xl font-black text-white">
                  {isInView ? <CountUp start={0} end={3248} duration={2.5} separator="," /> : '3,248'}
                  <span className="font-sans text-sm font-bold text-emerald-400">kg</span>
                </div>
              </div>
            </div>

            {/* 3D Multi-Tower Canvas */}
            <div className="relative z-10 my-2 flex-1 flex items-center justify-center">
              <MainChartCanvas />
            </div>

            {/* Monospace Axis / Legend Telemetry Footer */}
            <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-sans text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  PET Plastik
                </div>
                <div className="text-base font-extrabold text-white">
                  {isInView ? <CountUp start={0} end={42.4} decimals={1} duration={2.2} /> : '42.4'}%
                </div>
                <span className="text-[11px] text-white/50">1.378 kg (8-Stack)</span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-sans text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  Kaca Cullet
                </div>
                <div className="text-base font-extrabold text-white">
                  {isInView ? <CountUp start={0} end={28.2} decimals={1} duration={2.2} /> : '28.2'}%
                </div>
                <span className="text-[11px] text-white/50">915 kg (6-Stack)</span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-sans text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Selulosa
                </div>
                <div className="text-base font-extrabold text-white">
                  {isInView ? <CountUp start={0} end={18.5} decimals={1} duration={2.2} /> : '18.5'}%
                </div>
                <span className="text-[11px] text-white/50">602 kg (4-Stack)</span>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-sans text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  Aluminium
                </div>
                <div className="text-base font-extrabold text-white">
                  {isInView ? <CountUp start={0} end={10.9} decimals={1} duration={2.2} /> : '10.9'}%
                </div>
                <span className="text-[11px] text-white/50">353 kg (3-Stack)</span>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              SUPPORTING CARD 1: PLASTIC PET (80% Parametric Stack)
             ════════════════════════════════════════════════════ */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-emerald-400/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-400">
                  Fraksi #01
                </span>
                <h4 className="text-lg font-bold text-white font-sans">Plastik PET</h4>
              </div>
              <span className="font-mono text-2xl font-black text-emerald-400">
                {isInView ? <CountUp start={0} end={84.2} decimals={1} duration={2.4} /> : '84.2'}%
              </span>
            </div>

            {/* 3D Stack: 8 translucent vertical items */}
            <MiniCategoryCanvas
              count={8}
              color="#22c55e"
              type="cylinder"
              transmission={0.95}
              roughness={0.15}
              thickness={2.2}
              modelUrl="/3dModels/items/bottle.glb"
            />

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
              <span className="font-sans text-white/50">Kemurnian</span>
              <span className="font-bold text-white">98.6% SNI</span>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              SUPPORTING CARD 2: GLASS CULLET (Crystal Transmission)
             ════════════════════════════════════════════════════ */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-teal-400/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-teal-400">
                  Fraksi #02
                </span>
                <h4 className="text-lg font-bold text-white font-sans">Kaca Cullet</h4>
              </div>
              <span className="font-mono text-2xl font-black text-teal-300">
                {isInView ? <CountUp start={0} end={99.8} decimals={1} duration={2.4} /> : '99.8'}%
              </span>
            </div>

            {/* 3D Stack: 6 crystal glass cylinders */}
            <MiniCategoryCanvas
              count={6}
              color="#2dd4bf"
              type="cylinder"
              transmission={1.0}
              roughness={0.08}
              thickness={2.8}
              modelUrl="/3dModels/items/bottle.glb"
            />

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
              <span className="font-sans text-white/50">Grade Peleburan</span>
              <span className="font-bold text-white">Optic Grade A</span>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              SUPPORTING CARD 3: PAPER & CELLULOSE (Stacked Boxes)
             ════════════════════════════════════════════════════ */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-amber-400/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-400">
                  Fraksi #03
                </span>
                <h4 className="text-lg font-bold text-white font-sans">Kertas Selulosa</h4>
              </div>
              <span className="font-mono text-2xl font-black text-amber-300">
                {isInView ? <CountUp start={0} end={76.4} decimals={1} duration={2.4} /> : '76.4'}%
              </span>
            </div>

            {/* 3D Stack: 5 amber blocks */}
            <MiniCategoryCanvas
              count={5}
              color="#fbbf24"
              type="box"
              transmission={0.4}
              roughness={0.4}
              thickness={1.2}
              modelUrl="/3dModels/items/box.glb"
            />

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
              <span className="font-sans text-white/50">Pulp Recovery</span>
              <span className="font-bold text-white">Bio-Fibres</span>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════
              SUPPORTING CARD 4: METAL & ALUMINUM (Metallic Canisters)
             ════════════════════════════════════════════════════ */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-slate-300/40 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-300">
                  Fraksi #04
                </span>
                <h4 className="text-lg font-bold text-white font-sans">Aluminium Alloy</h4>
              </div>
              <span className="font-mono text-2xl font-black text-slate-200">
                {isInView ? <CountUp start={0} end={94.1} decimals={1} duration={2.4} /> : '94.1'}%
              </span>
            </div>

            {/* 3D Stack: 4 brushed aluminum pucks */}
            <MiniCategoryCanvas
              count={4}
              color="#e2e8f0"
              type="puck"
              transmission={0}
              metalness={0.9}
              roughness={0.2}
            />

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
              <span className="font-sans text-white/50">Efisiensi Energi</span>
              <span className="font-bold text-white">-95% Smelting</span>
            </div>
          </motion.div>
        </div>

        {/* ── Dashboard Precision Ledger Strip ──────────────── */}
        <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-white/70 font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Seluruh kalkulasi volume 3D terikat langsung dengan data sensor timbangan optik ELOVIA AI.
            </span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-white/60">
            <span>ISOMETRIC PROJECTION v2.6</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>LATENCY: 14ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BentoBreakdownSection;
