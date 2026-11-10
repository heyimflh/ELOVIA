'use client';

/**
 * MinimalGardenCanvas.tsx / GardenScene
 * ───────────────────────────────────────────────────────────
 * ELOVIA Impact Garden — Next.js & React Three Fiber (R3F)
 * Built for INVOFEST 2026.
 *
 * Performance & React 19 Fixes:
 *  1. DOM-based CanvasLoader (outside Canvas) using useProgress to prevent
 *     synchronous root unmount and removeChild errors in React 19.
 *  2. Full-width, full-height responsive Canvas with shadows enabled.
 *  3. Balanced sunlight & ambient lighting + Environment preset="sunset".
 *  4. Mesh shadow casting/receiving + ContactShadows grounding.
 *  5. Complete <Garden /> composition:
 *     - tree_4.glb (centerpiece)
 *     - tree_pine_2.glb (scattered in background)
 *     - bush_2.glb and grass_4.glb (lush living base)
 *     - log_2.glb (natural grounded organic touch)
 *     - Dynamic floating flower petals & soft firefly sparkles
 *  6. Initial camera position [0, 5, 10], fov 45 with auto-rotating OrbitControls.
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
  Float,
} from '@react-three/drei';
import * as THREE from 'three';

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

// ─────────────────────────────────────────────────────────────────────────────
// 2. SAFE HTML LOADING SPINNER WITH useProgress (PURE DOM OVERLAY)
//    Never renders inside R3F <Canvas> or <Html> to prevent React 19 unmount crashes.
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
// 3. FALLING FLOWER PETALS (Dynamic Foreground Particle System)
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
    if (mesh.current.position.y < -1.5) {
      mesh.current.position.y = 8.0 + Math.random() * 2.5;
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
      position: [rng(-6, 6), rng(0, 8), rng(-4, 4)] as [number, number, number],
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
// 4. MAIN <Garden /> COMPOSITION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function Garden() {
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
    <group position={[0, -0.1, 0]}>
      {/* ── 1. CENTERPIECE TREE (tree_4.glb) ───────────────────────── */}
      <primitive
        object={tree4}
        position={[0, 0, 0]}
        scale={[0.9, 0.9, 0.9]}
        rotation={[0, 0.2, 0]}
      />

      {/* ── 2. SCATTERED BACKGROUND PINE TREES (tree_pine_2.glb) ──── */}
      {/* Pine 1: Back left */}
      <primitive
        object={pine.clone(true)}
        position={[-3.4, 0, -2.6]}
        scale={[0.85, 0.85, 0.85]}
        rotation={[0, 0.5, 0]}
      />
      {/* Pine 2: Back right */}
      <primitive
        object={pine.clone(true)}
        position={[3.1, 0, -2.2]}
        scale={[0.75, 0.75, 0.75]}
        rotation={[0, -0.8, 0]}
      />
      {/* Pine 3: Deep center-back */}
      <primitive
        object={pine.clone(true)}
        position={[-0.9, 0, -3.8]}
        scale={[0.65, 0.65, 0.65]}
        rotation={[0, 1.4, 0]}
      />

      {/* ── 3. FALLEN ORGANIC LOG (log_2.glb) ──────────────────────── */}
      <primitive
        object={log}
        position={[1.5, 0.05, 1.2]}
        scale={[0.9, 0.9, 0.9]}
        rotation={[0.02, -0.6, 0.05]}
      />

      {/* ── 4. LUSH BUSHES (bush_2.glb) ────────────────────────────── */}
      <primitive
        object={bush.clone(true)}
        position={[-1.8, 0, 1.4]}
        scale={[0.9, 0.9, 0.9]}
        rotation={[0, 0.4, 0]}
      />
      <primitive
        object={bush.clone(true)}
        position={[2.2, 0, -0.4]}
        scale={[1.05, 1.05, 1.05]}
        rotation={[0, -1.1, 0]}
      />
      <primitive
        object={bush.clone(true)}
        position={[-2.5, 0, -0.8]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 1.9, 0]}
      />
      <primitive
        object={bush.clone(true)}
        position={[0.7, 0, 2.0]}
        scale={[0.75, 0.75, 0.75]}
        rotation={[0, -0.5, 0]}
      />

      {/* ── 5. GRASS CLUMPS (grass_4.glb) ──────────────────────────── */}
      <primitive
        object={grass.clone(true)}
        position={[-0.8, 0, 1.7]}
        scale={[1.5, 1.5, 1.5]}
        rotation={[0, 0.5, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[1.2, 0, 1.8]}
        scale={[1.4, 1.4, 1.4]}
        rotation={[0, -0.7, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[-1.3, 0, 0.7]}
        scale={[1.6, 1.6, 1.6]}
        rotation={[0, 1.2, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[1.9, 0, 0.5]}
        scale={[1.3, 1.3, 1.3]}
        rotation={[0, -1.5, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[-2.2, 0, 1.1]}
        scale={[1.5, 1.5, 1.5]}
        rotation={[0, 2.1, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[2.4, 0, 1.2]}
        scale={[1.25, 1.25, 1.25]}
        rotation={[0, -0.3, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[0.2, 0, 2.3]}
        scale={[1.4, 1.4, 1.4]}
        rotation={[0, 0.9, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[-1.6, 0, -1.8]}
        scale={[1.6, 1.6, 1.6]}
        rotation={[0, -2.0, 0]}
      />
      <primitive
        object={grass.clone(true)}
        position={[1.6, 0, -1.5]}
        scale={[1.4, 1.4, 1.4]}
        rotation={[0, 0.3, 0]}
      />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CAMERA BRIDGE (Forwards R3F camera to parent components/GSAP controllers)
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
// 6. MAIN EXPORTED CANVAS SCENE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalGardenCanvas = forwardRef<MinimalGardenCanvasHandle>(
  function MinimalGardenCanvas(_props, ref) {
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    // Forward camera reference to GSAP controller
    useImperativeHandle(ref, () => ({
      get camera() {
        return cameraRef.current;
      },
    }));

    return (
      <div className="relative w-full h-full min-h-[500px]">
        {/* Pure DOM Loader (rendered outside Canvas, never crashes React 19) */}
        <Loader />

        {/* Full-width, full-height Canvas */}
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 5, 10], fov: 45 }}
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
          {/* Camera Bridge for parent ref */}
          <CameraBridge
            onCamera={(cam) => {
              cameraRef.current = cam;
            }}
          />

          {/* Smooth slow rotating camera */}
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 6}
          />

          {/* ── Soft base lighting ───────────────────────────────────── */}
          <ambientLight intensity={0.6} />

          {/* ── Sunlight directional with soft shadows ─────────── */}
          <directionalLight
            castShadow
            position={[10, 10, 5]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0004}
            shadow-camera-near={0.5}
            shadow-camera-far={25}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
          />

          {/* ── Procedural Sunset Reflection Map (Zero network dependency, 100% offline-safe) ── */}
          <Environment resolution={128}>
            <mesh scale={100}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial side={THREE.BackSide} color="#fef3c7" />
            </mesh>
            <mesh position={[0, -20, 0]} scale={[120, 40, 120]}>
              <cylinderGeometry args={[1, 1, 1, 32, 1, true]} />
              <meshBasicMaterial side={THREE.BackSide} color="#dcfce7" />
            </mesh>
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fed7aa" />
          </Environment>

          {/* ── Warm hemisphere ambient light for realistic sky/ground bounce ──── */}
          <hemisphereLight
            args={['#fef3c7', '#dcfce7', 0.85]}
            position={[0, 20, 0]}
          />

          {/* ── Warm sunset rim fill light ─────────────────────────────────────── */}
          <directionalLight
            position={[-8, 6, -5]}
            intensity={0.5}
            color="#fde047"
          />

          {/* ── Main Garden Composition: Native 3D Suspense (no HTML unmount crash) ── */}
          <Suspense fallback={null}>
            <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.08}>
              <Garden />
            </Float>
            <FallingPetals />
          </Suspense>

          {/* ── Grounding Contact Shadow ─────────────────────────────── */}
          <ContactShadows
            opacity={0.7}
            scale={10}
            blur={2}
            far={4}
            position={[0, -0.01, 0]}
            color="#072314"
          />

          {/* ── Magical Morning Pollen & Fireflies ───────────────────── */}
          <Sparkles
            count={45}
            scale={[12, 6, 10]}
            size={3.2}
            speed={0.25}
            color="#bbf7d0"
            opacity={0.65}
            position={[0, 2, 0]}
          />
          <Sparkles
            count={25}
            scale={[10, 5, 8]}
            size={4.0}
            speed={0.2}
            color="#fef08a"
            opacity={0.6}
            position={[0, 2.5, 0]}
          />
        </Canvas>
      </div>
    );
  }
);

MinimalGardenCanvas.displayName = 'MinimalGardenCanvas';
export default MinimalGardenCanvas;
