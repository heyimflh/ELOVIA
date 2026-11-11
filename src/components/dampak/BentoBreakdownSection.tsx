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
  ArrowRight,
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

  componentDidCatch(err: unknown) {}

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

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
          <hemisphereLight args={['#ffffff', '#e2e8f0', 0.8]} position={[0, 20, 0]} />
        }
      >
        <Environment preset="city" />
      </Suspense>
    </Safe3DErrorBoundary>
  );
}

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
   2. PARAMETRIC 3D STACKED OBJECTS
   ───────────────────────────────────────────────────────────────────────────── */

function ParametricVerticalStack({
  count = 8,
  spacing = 0.32,
  color = '#748E33',
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

function OverallWasteBreakdown3D() {
  const stageRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (stageRef.current) {
      stageRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={stageRef} position={[0, -0.2, 0]}>
      <group position={[-1.2, 0, -0.6]}>
        <ParametricVerticalStack
          count={8}
          spacing={0.24}
          color="#748E33"
          type="cylinder"
          transmission={0.95}
          roughness={0.15}
          thickness={2.2}
          modelUrl="/3dModels/items/bottle.glb"
        />
      </group>

      <group position={[1.2, 0, -0.6]}>
        <ParametricVerticalStack
          count={6}
          spacing={0.26}
          color="#5B8E85"
          type="cylinder"
          transmission={1.0}
          roughness={0.08}
          thickness={2.8}
          modelUrl="/3dModels/items/bottle.glb"
        />
      </group>

      <group position={[-0.8, 0, 1.1]}>
        <ParametricVerticalStack
          count={4}
          spacing={0.24}
          color="#CE9B42"
          type="box"
          transmission={0.45}
          roughness={0.35}
          thickness={1.2}
          modelUrl="/3dModels/items/box.glb"
        />
      </group>

      <group position={[0.9, 0, 1.1]}>
        <ParametricVerticalStack
          count={3}
          spacing={0.25}
          color="#8A9684"
          type="puck"
          transmission={0}
          metalness={0.9}
          roughness={0.22}
        />
      </group>

      <mesh position={[0, -1.2, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.7, 0.15, 48]} />
        <meshPhysicalMaterial
          color="#E2EAD5"
          transmission={0.3}
          roughness={0.4}
          thickness={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. ISOLATED 3D CANVAS WRAPPERS
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
        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          position={[6, 12, 6]}
          intensity={1.8}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#CEE045" />
        <SafeCityEnvironment />

        <Center>
          <OverallWasteBreakdown3D />
        </Center>

        <ContactShadows
          opacity={0.4}
          scale={8}
          blur={2.4}
          far={3.5}
          position={[0, -1.21, 0]}
          color="#1E2617"
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
        <ambientLight intensity={0.8} />
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
          opacity={0.3}
          scale={4}
          blur={2}
          far={2.5}
          position={[0, -1.0, 0]}
          color="#1E2617"
        />
      </Canvas>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. BENTO BREAKDOWN SECTION (EDITORIAL ARCHESTYLE)
   ───────────────────────────────────────────────────────────────────────────── */

export function BentoBreakdownSection({
  className = '',
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
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
      className={`relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-[#1E2617] ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* ── Section Header (Editorial Landscape Serif Style) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#DFE7D0]">
          <div className="space-y-3">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
              FROM THE GROUND UP • PARAMETRIC ISOMETRIC
            </span>
            <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E2617] tracking-tight leading-[1.1]">
              Komposisi Fraksi &amp;{' '}
              <span className="italic font-normal text-[#748E33]">Bio-Sirkular 3D</span>
            </h2>
            <p className="text-base text-[#58634F] max-w-2xl font-normal leading-relaxed">
              Visualisasi 3D parametrik rasio daur ulang tanpa grafik 2D konvensional. Tinggi kolom
              merefleksikan massa kilogram secara presisi berdasarkan timbangan sensor optik.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#58634F] bg-white px-4 py-2.5 rounded-full border border-[#DFE7D0] shadow-2xs self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-[#748E33] animate-ping" />
            <span className="font-bold text-[#1E2617]">TOTAL: 3.248 KG</span>
          </div>
        </div>

        {/* ── Grid: Main Arched Stage (Left) + 4 Arched Fraction Cards (Right) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* MAIN 3D ARCHED WINDOW CARD */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="md:col-span-2 md:row-span-2 relative rounded-t-[6rem] sm:rounded-t-[8rem] rounded-b-3xl bg-[#F4F7EC] border-2 border-[#DFE7D0] shadow-sm p-6 sm:p-10 flex flex-col justify-between overflow-hidden"
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-sans tracking-widest text-[#748E33] font-bold block mb-1">
                  Komposisi Menyeluruh
                </span>
                <h3 className="font-fraunces text-3xl font-normal text-[#1E2617] tracking-tight">
                  Overall Waste Breakdown
                </h3>
                <p className="text-xs sm:text-sm text-[#58634F] mt-1">
                  Menara 3D interaktif merefleksikan 4 fraksi material sirkular terverifikasi.
                </p>
              </div>

              <div className="text-left sm:text-right p-3.5 rounded-2xl bg-white border border-[#DFE7D0] shrink-0">
                <span className="text-[11px] font-sans text-[#58634F] block font-medium">
                  Massa Kumulatif
                </span>
                <div className="flex items-baseline gap-1 font-fraunces text-3xl font-normal text-[#1E2617]">
                  {isInView ? <CountUp start={0} end={3248} duration={2.5} separator="." /> : '3.248'}
                  <span className="font-sans text-sm font-bold text-[#748E33]">kg</span>
                </div>
              </div>
            </div>

            {/* 3D Multi-Tower Canvas */}
            <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
              <MainChartCanvas />
            </div>

            {/* Legend / Axis Telemetry */}
            <div className="relative z-10 pt-4 border-t border-[#DFE7D0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-sans text-[#58634F] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#748E33]" />
                  PET Plastik
                </div>
                <div className="text-base font-fraunces font-normal text-[#1E2617]">
                  {isInView ? <CountUp start={0} end={42.4} decimals={1} duration={2.2} /> : '42.4'}%
                </div>
                <span className="text-[11px] text-[#58634F] block">1.378 kg (8-Stack)</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-sans text-[#58634F] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5B8E85]" />
                  Kaca Cullet
                </div>
                <div className="text-base font-fraunces font-normal text-[#1E2617]">
                  {isInView ? <CountUp start={0} end={28.2} decimals={1} duration={2.2} /> : '28.2'}%
                </div>
                <span className="text-[11px] text-[#58634F] block">915 kg (6-Stack)</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-sans text-[#58634F] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CE9B42]" />
                  Selulosa
                </div>
                <div className="text-base font-fraunces font-normal text-[#1E2617]">
                  {isInView ? <CountUp start={0} end={18.5} decimals={1} duration={2.2} /> : '18.5'}%
                </div>
                <span className="text-[11px] text-[#58634F] block">602 kg (4-Stack)</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 font-sans text-[#58634F] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8A9684]" />
                  Aluminium
                </div>
                <div className="text-base font-fraunces font-normal text-[#1E2617]">
                  {isInView ? <CountUp start={0} end={10.9} decimals={1} duration={2.2} /> : '10.9'}%
                </div>
                <span className="text-[11px] text-[#58634F] block">353 kg (3-Stack)</span>
              </div>
            </div>
          </motion.div>

          {/* 4 SUPPORTING CARDS */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 rounded-t-[4rem] rounded-b-3xl bg-white border border-[#DFE7D0] shadow-2xs p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#748E33]">
                  Fraksi #01
                </span>
                <h4 className="font-fraunces text-lg text-[#1E2617]">Plastik PET</h4>
              </div>
              <span className="font-fraunces text-2xl text-[#748E33]">
                {isInView ? <CountUp start={0} end={84.2} decimals={1} duration={2.4} /> : '84.2'}%
              </span>
            </div>

            <MiniCategoryCanvas
              count={8}
              color="#748E33"
              type="cylinder"
              transmission={0.95}
              roughness={0.15}
              thickness={2.2}
              modelUrl="/3dModels/items/bottle.glb"
            />

            <div className="pt-3 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono text-[#58634F]">
              <span>Kemurnian</span>
              <span className="font-bold text-[#1E2617]">98.6% SNI</span>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 rounded-t-[4rem] rounded-b-3xl bg-white border border-[#DFE7D0] shadow-2xs p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#5B8E85]">
                  Fraksi #02
                </span>
                <h4 className="font-fraunces text-lg text-[#1E2617]">Kaca Cullet</h4>
              </div>
              <span className="font-fraunces text-2xl text-[#5B8E85]">
                {isInView ? <CountUp start={0} end={99.8} decimals={1} duration={2.4} /> : '99.8'}%
              </span>
            </div>

            <MiniCategoryCanvas
              count={6}
              color="#5B8E85"
              type="cylinder"
              transmission={1.0}
              roughness={0.08}
              thickness={2.8}
              modelUrl="/3dModels/items/bottle.glb"
            />

            <div className="pt-3 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono text-[#58634F]">
              <span>Grade Peleburan</span>
              <span className="font-bold text-[#1E2617]">Optic Grade A</span>
            </div>
          </motion.div>

          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 rounded-t-[4rem] rounded-b-3xl bg-white border border-[#DFE7D0] shadow-2xs p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#CE9B42]">
                  Fraksi #03
                </span>
                <h4 className="font-fraunces text-lg text-[#1E2617]">Kertas Selulosa</h4>
              </div>
              <span className="font-fraunces text-2xl text-[#CE9B42]">
                {isInView ? <CountUp start={0} end={76.4} decimals={1} duration={2.4} /> : '76.4'}%
              </span>
            </div>

            <MiniCategoryCanvas
              count={5}
              color="#CE9B42"
              type="box"
              transmission={0.4}
              roughness={0.4}
              thickness={1.2}
              modelUrl="/3dModels/items/box.glb"
            />

            <div className="pt-3 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono text-[#58634F]">
              <span>Pulp Recovery</span>
              <span className="font-bold text-[#1E2617]">Bio-Fibres</span>
            </div>
          </motion.div>

          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="col-span-1 rounded-t-[4rem] rounded-b-3xl bg-white border border-[#DFE7D0] shadow-2xs p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8A9684]">
                  Fraksi #04
                </span>
                <h4 className="font-fraunces text-lg text-[#1E2617]">Aluminium Alloy</h4>
              </div>
              <span className="font-fraunces text-2xl text-[#8A9684]">
                {isInView ? <CountUp start={0} end={94.1} decimals={1} duration={2.4} /> : '94.1'}%
              </span>
            </div>

            <MiniCategoryCanvas
              count={4}
              color="#8A9684"
              type="puck"
              transmission={0}
              metalness={0.9}
              roughness={0.2}
            />

            <div className="pt-3 border-t border-[#DFE7D0] flex items-center justify-between text-xs font-mono text-[#58634F]">
              <span>Efisiensi Energi</span>
              <span className="font-bold text-[#1E2617]">-95% Smelting</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BentoBreakdownSection;
