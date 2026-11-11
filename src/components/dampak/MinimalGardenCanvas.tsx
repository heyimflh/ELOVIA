'use client';

/**
 * MinimalGardenCanvas.tsx / GardenScene
 * ───────────────────────────────────────────────────────────
 * ELOVIA Impact Garden — Next.js & React Three Fiber (R3F)
 * Refined 3D Diorama Island with grounded geometry, cinematic lighting,
 * restricted orbit controls, and organic animated growth level transitions.
 *
 * Growth Stages:
 *  - Level 1 (Tunas / Seedling): Serene island with central sprout, river stones & starter grass.
 *  - Level 2 (Rimbun / Growing): + 3 perimeter pine trees, flat organic log, bushes & grass.
 *  - Level 3 (Hutan / Lush): + Giant centerpiece orange-canopy tree, tall framing pines,
 *                              front accent pine, and dense perimeter biodiversity.
 *
 * Animation Engine:
 *  - Organic spring physics (tension: 170, friction: 14) with bouncy scale overshoot.
 *  - Staggered delays (50ms - 300ms) for natural blooming effect.
 */

import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Suspense,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  useProgress,
  OrbitControls,
  ContactShadows,
  Environment,
  Sparkles,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { GardenLevel } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// 1. ASSET PRELOADS (Absolute paths from public/3dModels/garden/)
// ─────────────────────────────────────────────────────────────────────────────
useGLTF.preload('/3dModels/garden/tree_4.glb');
useGLTF.preload('/3dModels/garden/tree_pine_2.glb');
useGLTF.preload('/3dModels/garden/grass_4.glb');
useGLTF.preload('/3dModels/garden/bush_2.glb');
useGLTF.preload('/3dModels/garden/log_2.glb');

export interface MinimalGardenCanvasHandle {
  camera: THREE.PerspectiveCamera | null;
}

export interface MinimalGardenCanvasProps {
  level?: GardenLevel;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. SAFE HTML LOADING SPINNER WITH useProgress (PURE DOM OVERLAY)
// ─────────────────────────────────────────────────────────────────────────────
export function Loader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [active, progress]);

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-300"
      aria-live="polite"
    >
      <div className="flex flex-col items-center justify-center gap-2.5 px-6 py-4 rounded-3xl bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(0,15,10,0.08)] text-[#0f2922] select-none">
        <div className="w-7 h-7 border-3 border-[#22c55e]/25 border-t-[#22c55e] rounded-full animate-spin" />
        <span className="font-mono text-xs font-bold tracking-wider text-[#0f2922]">
          {progress.toFixed(0)}% Loading 3D Garden...
        </span>
      </div>
    </div>
  );
}

// Helper: clone scene and ensure all meshes cast and receive shadows
function prepareScene(scene: THREE.Group): THREE.Group {
  const clone = scene.clone(true);
  clone.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return clone;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ANIMATED ORGANIC GROWTH SPRING WRAPPER
//    Underdamped spring physics (tension: 170, friction: 14) with bouncy scale
//    overshoot and staggered delay support.
// ─────────────────────────────────────────────────────────────────────────────
interface AnimatedGrowthProps {
  visible: boolean;
  targetScale?: [number, number, number] | number;
  delay?: number; // Delay in seconds for blooming stagger
  position?: [number, number, number];
  rotation?: [number, number, number];
  children: React.ReactNode;
}

function AnimatedGrowth({
  visible,
  targetScale = 1,
  delay = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  children,
}: AnimatedGrowthProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentScale = useRef(visible ? 1 : 0);
  const velocity = useRef(0);
  const elapsed = useRef(0);
  const isPending = useRef(false);

  // Normalize target scale tuple
  const [tx, ty, tz] = useMemo(() => {
    if (typeof targetScale === 'number') {
      return [targetScale, targetScale, targetScale];
    }
    return targetScale;
  }, [targetScale]);

  // When visibility changes, initiate timer for stagger delay
  const prevVisible = useRef(visible);
  useEffect(() => {
    if (prevVisible.current !== visible) {
      prevVisible.current = visible;
      elapsed.current = 0;
      isPending.current = true;
    }
  }, [visible]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Cap frame delta to prevent physics explosion on tab-switching
    const dt = Math.min(delta, 0.04);

    let target = visible ? 1 : 0;

    if (visible && isPending.current) {
      elapsed.current += dt;
      if (elapsed.current < delay) {
        target = 0;
      } else {
        isPending.current = false;
        target = 1;
      }
    }

    // Underdamped Harmonic Spring Equation (Apple / react-spring feel)
    // F = -tension * (x - target) - friction * v
    const tension = 170;
    const friction = 14;
    const force = -tension * (currentScale.current - target) - friction * velocity.current;

    velocity.current += force * dt;
    currentScale.current += velocity.current * dt;

    // Guard against negative scale (prevents face-inversion artifacts)
    if (currentScale.current < 0) {
      currentScale.current = 0;
      velocity.current = 0;
    }

    const s = currentScale.current;

    // Optimize draw calls: hide group completely when scale is zero
    if (s <= 0.002 && !visible) {
      groupRef.current.visible = false;
      groupRef.current.scale.set(0, 0, 0);
    } else {
      groupRef.current.visible = true;
      groupRef.current.scale.set(s * tx, s * ty, s * tz);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} visible={visible}>
      {children}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. LOW-POLY RIVER STONES (Level 1 Starter Accents)
// ─────────────────────────────────────────────────────────────────────────────
function LowPolyRock({
  scale = [0.35, 0.28, 0.32],
  color = '#64748b',
}: {
  scale?: [number, number, number];
  color?: string;
}) {
  return (
    <mesh castShadow receiveShadow scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.88}
        metalness={0.08}
        flatShading
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. FALLING FLOWER PETALS (Dynamic Foreground Particle System)
// ─────────────────────────────────────────────────────────────────────────────
interface PetalData {
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number;
  drift: number;
  spin: number;
  scale: number;
}

function Petal({
  data,
  material,
}: {
  data: PetalData;
  material: THREE.MeshStandardMaterial;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const offset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() + offset.current;

    mesh.current.position.y -= data.speed * 0.012;
    // Recycle when reaching island floor level (grounded at y = -3)
    if (mesh.current.position.y < -2.95) {
      mesh.current.position.y = 8.5 + Math.random() * 2.5;
      mesh.current.position.x = data.position[0];
    }

    mesh.current.position.x = data.position[0] + Math.sin(t * data.drift) * 0.55;
    mesh.current.position.z = data.position[2] + Math.cos(t * data.drift * 0.5) * 0.35;

    mesh.current.rotation.x = t * data.spin * 0.4;
    mesh.current.rotation.y = t * data.spin * 0.6;
    mesh.current.rotation.z = Math.sin(t * data.drift) * 0.4;
  });

  return (
    <mesh
      ref={mesh}
      position={data.position}
      rotation={data.rotation}
      scale={data.scale}
      material={material}
      castShadow={false}
      receiveShadow={false}
    >
      <sphereGeometry args={[1, 7, 5]} />
    </mesh>
  );
}

function FallingPetals() {
  const sharedMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f9a8d4',
        roughness: 0.55,
        metalness: 0.05,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    []
  );

  const petals = useMemo<PetalData[]>(() => {
    const rng = (min: number, max: number) => min + Math.random() * (max - min);
    return Array.from({ length: 45 }, () => ({
      position: [rng(-6, 6), rng(-1, 8), rng(-4, 4)] as [number, number, number],
      rotation: [rng(0, Math.PI), rng(0, Math.PI), rng(0, Math.PI)] as [number, number, number],
      speed: rng(0.4, 0.9),
      drift: rng(0.3, 0.8),
      spin: rng(0.2, 0.7),
      scale: rng(0.045, 0.095),
    }));
  }, []);

  return (
    <>
      {petals.map((data, i) => (
        <Petal key={i} data={data} material={sharedMat} />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. DIORAMA ISLAND GROUND BASE (Stationary Anchor)
// ─────────────────────────────────────────────────────────────────────────────
function DioramaIsland() {
  return (
    <group position={[0, -2, 0]}>
      {/* Primary Turf Top: lush emerald/forest green surface */}
      <mesh receiveShadow castShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[5.2, 5.2, 0.3, 64]} />
        <meshStandardMaterial
          color="#2d6a4f"
          roughness={0.72}
          metalness={0.06}
          flatShading={false}
        />
      </mesh>

      {/* Earthy Sub-soil Cliff: warm dark fertile bedrock layer tapering down */}
      <mesh receiveShadow castShadow position={[0, -0.65, 0]}>
        <cylinderGeometry args={[5.2, 4.3, 0.7, 64]} />
        <meshStandardMaterial
          color="#1b4332"
          roughness={0.88}
          metalness={0.04}
          flatShading={false}
        />
      </mesh>

      {/* Stylized Beveled Rim Ring: bright emerald contour */}
      <mesh receiveShadow position={[0, 0.005, 0]}>
        <ringGeometry args={[4.85, 5.2, 64]} />
        <meshStandardMaterial
          color="#40916c"
          roughness={0.65}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. MAIN <Garden /> COMPOSITION (Orchestrated by Level)
// ─────────────────────────────────────────────────────────────────────────────
export function Garden({ level = 3 }: { level?: GardenLevel }) {
  // Load models from public/3dModels/garden/[filename].glb
  const tree4Gltf = useGLTF('/3dModels/garden/tree_4.glb');
  const pineGltf = useGLTF('/3dModels/garden/tree_pine_2.glb');
  const grassGltf = useGLTF('/3dModels/garden/grass_4.glb');
  const bushGltf = useGLTF('/3dModels/garden/bush_2.glb');
  const logGltf = useGLTF('/3dModels/garden/log_2.glb');

  // Prepare scenes with castShadow and receiveShadow enabled
  const tree4 = useMemo(() => prepareScene(tree4Gltf.scene), [tree4Gltf.scene]);
  const pine = useMemo(() => prepareScene(pineGltf.scene), [pineGltf.scene]);
  const grass = useMemo(() => prepareScene(grassGltf.scene), [grassGltf.scene]);
  const bush = useMemo(() => prepareScene(bushGltf.scene), [bushGltf.scene]);
  const log = useMemo(() => prepareScene(logGltf.scene), [logGltf.scene]);

  return (
    <group position={[0, -1.0, 0]}>
      {/* ── 0. DIORAMA ISLAND GROUND BASE (Always visible) ──────────── */}
      <DioramaIsland />

      {/* ══════════════════════════════════════════════════════════════
          LEVEL 1 (Tunas / Seedling): Minimalist, young sprout & pebbles
         ══════════════════════════════════════════════════════════════ */}
      {/* Center seedling sprout (visible at Level 1 & 2; grows into tree at Level 3) */}
      <AnimatedGrowth
        visible={level < 3}
        targetScale={[0.55, 0.6, 0.55]}
        position={[0, -2, 0]}
        rotation={[0, 0.4, 0]}
        delay={0.0}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      {/* Level 1 River Stones */}
      <AnimatedGrowth
        visible={level >= 1}
        targetScale={[0.42, 0.32, 0.38]}
        position={[0.7, -1.98, 0.3]}
        rotation={[0.2, 0.8, -0.1]}
        delay={0.04}
      >
        <LowPolyRock color="#64748b" />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 1}
        targetScale={[0.3, 0.24, 0.28]}
        position={[-0.6, -1.98, -0.4]}
        rotation={[-0.3, 1.4, 0.2]}
        delay={0.08}
      >
        <LowPolyRock color="#94a3b8" />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 1}
        targetScale={[0.26, 0.2, 0.24]}
        position={[0.3, -1.98, -0.6]}
        rotation={[0.1, -0.9, 0.3]}
        delay={0.12}
      >
        <LowPolyRock color="#475569" />
      </AnimatedGrowth>

      {/* Level 1 Starter Grass Tufts */}
      <AnimatedGrowth
        visible={level >= 1}
        targetScale={[1.1, 1.1, 1.1]}
        position={[-0.4, -2, 0.6]}
        rotation={[0, 0.5, 0]}
        delay={0.06}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 1}
        targetScale={[1.0, 1.0, 1.0]}
        position={[0.5, -2, -0.2]}
        rotation={[0, -0.8, 0]}
        delay={0.1}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      {/* ══════════════════════════════════════════════════════════════
          LEVEL 2 (Rimbun / Growing): Pines around perimeter, log, bushes
         ══════════════════════════════════════════════════════════════ */}
      {/* Pine Mid-Left */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.95, 0.95, 0.95]}
        position={[-2.4, -2, 0.9]}
        rotation={[0, 0.8, 0]}
        delay={0.05}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Pine Mid-Right */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.9, 0.9, 0.9]}
        position={[2.4, -2, 0.7]}
        rotation={[0, -0.9, 0]}
        delay={0.1}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Pine Back-Center */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.95, 0.95, 0.95]}
        position={[-0.9, -2, -2.4]}
        rotation={[0, 1.3, 0]}
        delay={0.15}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Fallen Organic Log Flat on Ground */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.9, 0.9, 0.9]}
        position={[0.4, -2, 1.4]}
        rotation={[0, -0.55, 0]}
        delay={0.18}
      >
        <primitive object={log} />
      </AnimatedGrowth>

      {/* Level 2 Bushes */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.85, 0.85, 0.85]}
        position={[-1.0, -2, 0.5]}
        rotation={[0, 0.3, 0]}
        delay={0.12}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.8, 0.8, 0.8]}
        position={[1.0, -2, 0.3]}
        rotation={[0, -0.8, 0]}
        delay={0.16}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[0.75, 0.75, 0.75]}
        position={[-1.6, -2, 1.2]}
        rotation={[0, 1.1, 0]}
        delay={0.2}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      {/* Level 2 Grass Tufts */}
      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[1.25, 1.25, 1.25]}
        position={[-0.5, -2, 1.9]}
        rotation={[0, 0.4, 0]}
        delay={0.14}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[1.2, 1.2, 1.2]}
        position={[1.2, -2, 1.8]}
        rotation={[0, -0.6, 0]}
        delay={0.18}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level >= 2}
        targetScale={[1.2, 1.2, 1.2]}
        position={[1.6, -2, 0.8]}
        rotation={[0, -1.3, 0]}
        delay={0.22}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      {/* ══════════════════════════════════════════════════════════════
          LEVEL 3 (Hutan / Lush): Giant centerpiece tree, dense pines, bushes
         ══════════════════════════════════════════════════════════════ */}
      {/* Centerpiece Giant Tree (The Masterpiece) */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.15, 1.15, 1.15]}
        position={[0, -2, -0.5]}
        rotation={[0, 0.25, 0]}
        delay={0.0}
      >
        <primitive object={tree4} />
      </AnimatedGrowth>

      {/* Tall Framing Pine 1 (Back-Left) */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.3, 1.3, 1.3]}
        position={[-3.0, -2, -1.8]}
        rotation={[0, 0.45, 0]}
        delay={0.06}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Tall Framing Pine 2 (Back-Right) */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.25, 1.25, 1.25]}
        position={[2.8, -2, -1.6]}
        rotation={[0, -0.7, 0]}
        delay={0.1}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Deep North Pine */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.9, 0.9, 0.9]}
        position={[1.5, -2, -2.4]}
        rotation={[0, -1.1, 0]}
        delay={0.14}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Front Accent Pine */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.75, 0.75, 0.75]}
        position={[-1.7, -2, 2.0]}
        rotation={[0, 1.5, 0]}
        delay={0.18}
      >
        <primitive object={pine.clone(true)} />
      </AnimatedGrowth>

      {/* Level 3 Dense Perimeter Bushes */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.8, 0.8, 0.8]}
        position={[-3.3, -2, -0.9]}
        rotation={[0, 2.0, 0]}
        delay={0.16}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.85, 0.85, 0.85]}
        position={[3.1, -2, -0.7]}
        rotation={[0, -2.2, 0]}
        delay={0.2}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.7, 0.7, 0.7]}
        position={[1.8, -2, 1.5]}
        rotation={[0, -1.4, 0]}
        delay={0.22}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.75, 0.75, 0.75]}
        position={[-1.8, -2, 1.3]}
        rotation={[0, 1.1, 0]}
        delay={0.25}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[0.65, 0.65, 0.65]}
        position={[0.2, -2, 2.2]}
        rotation={[0, 0.6, 0]}
        delay={0.28}
      >
        <primitive object={bush.clone(true)} />
      </AnimatedGrowth>

      {/* Level 3 Dense Wild Grass Tufts */}
      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.3, 1.3, 1.3]}
        position={[-1.3, -2, 0.9]}
        rotation={[0, 1.2, 0]}
        delay={0.2}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.3, 1.3, 1.3]}
        position={[-2.2, -2, 1.5]}
        rotation={[0, 1.9, 0]}
        delay={0.24}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.15, 1.15, 1.15]}
        position={[2.1, -2, 1.6]}
        rotation={[0, -0.4, 0]}
        delay={0.26}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.3, 1.3, 1.3]}
        position={[-0.8, -2, -1.2]}
        rotation={[0, -1.8, 0]}
        delay={0.28}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>

      <AnimatedGrowth
        visible={level === 3}
        targetScale={[1.25, 1.25, 1.25]}
        position={[0.8, -2, -1.1]}
        rotation={[0, 0.7, 0]}
        delay={0.3}
      >
        <primitive object={grass.clone(true)} />
      </AnimatedGrowth>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CAMERA BRIDGE (Forwards R3F camera to parent components)
// ─────────────────────────────────────────────────────────────────────────────
function CameraBridge({
  onCamera,
}: {
  onCamera: (cam: THREE.PerspectiveCamera) => void;
}) {
  const { camera } = useThree();
  useEffect(() => {
    onCamera(camera as THREE.PerspectiveCamera);
  }, [camera, onCamera]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. RESPONSIVE CAMERA CONTROLLER
//    Dynamically adjusts distance and target so diorama fits all screen sizes
// ─────────────────────────────────────────────────────────────────────────────
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 640;
    const isTablet = size.width >= 640 && size.width < 1024;

    // Pull camera back further on mobile/tablet to ensure generous negative space
    const targetZ = isMobile ? 22 : isTablet ? 19.5 : 18;
    const targetY = isMobile ? 5.8 : isTablet ? 5.4 : 5.0;

    camera.position.set(0, targetY, targetZ);
    camera.lookAt(0, -1.5, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. MAIN EXPORTED CANVAS SCENE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalGardenCanvas = forwardRef<
  MinimalGardenCanvasHandle,
  MinimalGardenCanvasProps
>(function MinimalGardenCanvas({ level = 3 }, ref) {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Forward camera reference to parent
  useImperativeHandle(ref, () => ({
    get camera() {
      return cameraRef.current;
    },
  }));

  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Pure DOM Loader (rendered outside Canvas, never crashes React 19) */}
      <Loader />

      {/* Full-width, full-height Canvas with shadows enabled */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 18], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        {/* Default PerspectiveCamera pulled back to Z=18 with FOV=50 */}
        <PerspectiveCamera makeDefault position={[0, 5, 18]} fov={50} />

        {/* Responsive camera adjuster based on viewport width */}
        <ResponsiveCamera />

        {/* Camera Bridge for parent ref */}
        <CameraBridge
          onCamera={(cam) => {
            cameraRef.current = cam;
          }}
        />

        {/* Smooth auto-rotating camera with disabled zoom & pan to ensure normal page scrolling */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate={true}
          autoRotateSpeed={0.5}
          target={[0, -1.5, 0]}
        />

        {/* ── 1. High-quality base ambient lighting ─────────────────── */}
        <ambientLight intensity={0.7} />

        {/* ── 2. Cinematic sunlight directional with soft shadows ───── */}
        <directionalLight
          castShadow
          position={[10, 20, 10]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0004}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />

        {/* ── 3. Warm sky/ground fill lighting ─────────────────────── */}
        <hemisphereLight
          args={['#fef3c7', '#dcfce7', 0.5]}
          position={[0, 20, 0]}
        />

        {/* ── 4. Dreamy Dawn Environment preset ────────────────────── */}
        <Suspense fallback={null}>
          <Environment preset="dawn" />
        </Suspense>

        {/* ── 5. Main Grounded Diorama Garden Composition (Level-driven) ── */}
        <Suspense fallback={null}>
          <Garden level={level} />
          <FallingPetals />
        </Suspense>

        {/* ── 6. Grounding Contact Shadow below Lowered Island Base ── */}
        <ContactShadows
          opacity={0.65}
          scale={16}
          blur={2.5}
          far={5}
          position={[0, -4.05, 0]}
          color="#051f14"
        />

        {/* ── 7. Atmospheric Pollen & Fireflies ─────────────────────── */}
        <Sparkles
          count={level === 1 ? 20 : level === 2 ? 30 : 45}
          scale={[12, 6, 10]}
          size={3.0}
          speed={0.25}
          color="#bbf7d0"
          opacity={level === 1 ? 0.35 : level === 2 ? 0.5 : 0.65}
          position={[0, 0, 0]}
        />
        <Sparkles
          count={level === 1 ? 10 : level === 2 ? 16 : 24}
          scale={[10, 5, 8]}
          size={3.8}
          speed={0.2}
          color="#fef08a"
          opacity={level === 1 ? 0.3 : level === 2 ? 0.45 : 0.6}
          position={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
});

MinimalGardenCanvas.displayName = 'MinimalGardenCanvas';
export default MinimalGardenCanvas;
