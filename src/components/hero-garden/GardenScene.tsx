'use client';

import React, { useState, useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  useAnimations,
  ContactShadows,
  Environment,
  Sparkles,
  Float,
} from '@react-three/drei';
import { EffectComposer, DepthOfField, Bloom, ToneMapping } from '@react-three/postprocessing';
import * as THREE from 'three';
import { CameraController } from './CameraController';

// Preload models for seamless rendering
const MODEL_PATHS = {
  magicTree: '/3dModels/garden/magic_tree.glb',
  bushFlower: '/3dModels/garden/StylizedNaturePack_FreeSampler_v1.2/StylizedNaturePack_FreeSampler/GLB/bush_flower_01.glb',
  rock: '/3dModels/garden/StylizedNaturePack_FreeSampler_v1.2/StylizedNaturePack_FreeSampler/GLB/rock_02.glb',
  rockSandstone: '/3dModels/garden/StylizedNaturePack_FreeSampler_v1.2/StylizedNaturePack_FreeSampler/GLB/rock_sandstone_01.glb',
  mushroomGlow: '/3dModels/garden/StylizedNaturePack_FreeSampler_v1.2/StylizedNaturePack_FreeSampler/GLB/mushroom_glow_01.glb',
};

if (typeof window !== 'undefined') {
  Object.values(MODEL_PATHS).forEach((path) => useGLTF.preload(path));
}

export interface GardenSceneProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  activeLevel?: number; // 1, 2, or 3
  onScrollProgress?: (progress: number) => void;
}

/**
 * Centerpiece Magic Tree with animated gentle wind sway and enhanced morning materials
 */
function CenterpieceTree({ level = 2 }: { level?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATHS.magicTree);
  const { actions } = useAnimations(gltf.animations, groupRef);

  // Custom memoized green materials and enhanced lighting
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.roughness = 0.55;
          mat.metalness = 0.05;

          // If mesh is foliage or leaves, enhance with vibrant lush leaf green
          if (mesh.name.toLowerCase().includes('leaves') || mesh.name.toLowerCase().includes('foliage')) {
            mat.color = new THREE.Color('#22c55e');
            mat.roughness = 0.45;
          }

          // If mesh is the central gem, make it glow with bio-energy
          if (mesh.name.toLowerCase().includes('gem')) {
            mat.color = new THREE.Color('#34d399');
            mat.emissive = new THREE.Color('#10b981');
            mat.emissiveIntensity = 2.4;
            mat.roughness = 0.15;
            mat.metalness = 0.2;
          }

          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [gltf.scene]);

  // Play natural breeze animation
  useEffect(() => {
    if (actions && gltf.animations.length > 0) {
      const firstAction = actions[gltf.animations[0].name] || actions['ArmatureAction'];
      if (firstAction) {
        firstAction.reset().fadeIn(0.6).play();
        firstAction.timeScale = 0.7; // gentle relaxing breeze
      }
    }
  }, [actions, gltf.animations]);

  // Gentle levitation breathing
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = -1.35 + Math.sin(t * 0.8) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.03;
  });

  const scale = level === 1 ? 0.9 : level === 2 ? 1.05 : 1.2;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -1.35, 0]}>
      <primitive object={clonedScene} />

      {/* Internal gem energy core light */}
      <pointLight
        position={[0, 1.3, 0]}
        color="#22c55e"
        intensity={2.8}
        distance={5}
        decay={2}
      />
      <pointLight
        position={[0, 0.4, 0.5]}
        color="#a7f3d0"
        intensity={1.5}
        distance={4}
        decay={2}
      />
    </group>
  );
}

/**
 * Circular Perimeter of smaller bushes, rocks and glowing mushrooms
 */
function CircularPerimeterFlora() {
  const bushGltf = useGLTF(MODEL_PATHS.bushFlower);
  const rockGltf = useGLTF(MODEL_PATHS.rock);
  const sandstoneGltf = useGLTF(MODEL_PATHS.rockSandstone);
  const mushroomGltf = useGLTF(MODEL_PATHS.mushroomGlow);

  // Clone with memoized materials
  const clonedBush = useMemo(() => {
    const clone = bushGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [bushGltf.scene]);

  const clonedRock = useMemo(() => {
    const clone = rockGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [rockGltf.scene]);

  const clonedSandstone = useMemo(() => {
    const clone = sandstoneGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [sandstoneGltf.scene]);

  const clonedMushroom = useMemo(() => {
    const clone = mushroomGltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.emissive = new THREE.Color('#22d3ee');
          mat.emissiveIntensity = 1.8;
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [mushroomGltf.scene]);

  return (
    <group position={[0, -1.35, 0]}>
      {/* 1. Flowering Bush at 0 deg (front right) */}
      <primitive
        object={clonedBush.clone(true)}
        position={[2.4, 0.05, 1.2]}
        rotation={[0, 0.4, 0]}
        scale={[0.85, 0.85, 0.85]}
      />

      {/* 2. Sandstone Rock at ~50 deg */}
      <primitive
        object={clonedSandstone.clone(true)}
        position={[2.7, 0.0, -1.1]}
        rotation={[0.1, 1.2, -0.05]}
        scale={[0.75, 0.75, 0.75]}
      />

      {/* 3. Glowing Mushroom Cluster at ~110 deg */}
      <group position={[1.1, 0.02, -2.5]}>
        <primitive
          object={clonedMushroom.clone(true)}
          rotation={[0, -0.6, 0]}
          scale={[0.8, 0.8, 0.8]}
        />
        <pointLight color="#22d3ee" intensity={1.2} distance={3} decay={2} position={[0, 0.4, 0]} />
      </group>

      {/* 4. Flowering Bush at ~170 deg (back left) */}
      <primitive
        object={clonedBush.clone(true)}
        position={[-1.8, 0.05, -2.2]}
        rotation={[0, 2.1, 0]}
        scale={[0.75, 0.75, 0.75]}
      />

      {/* 5. Mossy Boulder at ~225 deg (left) */}
      <primitive
        object={clonedRock.clone(true)}
        position={[-2.8, 0.0, -0.4]}
        rotation={[0.2, -1.4, 0]}
        scale={[0.9, 0.9, 0.9]}
      />

      {/* 6. Flowering Bush at ~280 deg (front left) */}
      <primitive
        object={clonedBush.clone(true)}
        position={[-2.2, 0.05, 1.6]}
        rotation={[0, -0.8, 0]}
        scale={[0.8, 0.8, 0.8]}
      />

      {/* 7. Walkthrough Feature Detail: Glowing Moss Rock & Sensor Mast at front-right orbit zone */}
      <group position={[1.7, 0.0, 2.1]}>
        {/* Glowing Moss Rock */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial
            color="#27272a"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        {/* Bioluminescent moss veins */}
        <mesh position={[0.08, 0.38, 0.22]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#10b981"
            emissiveIntensity={2.5}
            roughness={0.3}
          />
        </mesh>
        <pointLight color="#34d399" intensity={1.8} distance={3.5} decay={2} position={[0, 0.5, 0.2]} />

        {/* Futuristic IoT Sensor Mast */}
        <group position={[0.6, 0, -0.4]}>
          {/* Mast column */}
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.05, 1.5, 16]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Pulsing ring beacon */}
          <mesh position={[0, 1.45, 0]}>
            <torusGeometry args={[0.14, 0.025, 16, 32]} />
            <meshStandardMaterial
              color="#22c55e"
              emissive="#22c55e"
              emissiveIntensity={3}
            />
          </mesh>
          {/* Glass telemetry lens */}
          <mesh position={[0, 1.45, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
          <pointLight color="#22c55e" intensity={1.5} distance={2.5} decay={2} position={[0, 1.5, 0]} />
        </group>
      </group>
    </group>
  );
}

/**
 * Beautiful Floating Island Base with terraced rock and lush grass top
 */
function FloatingIslandBase() {
  const grassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22c55e'),
      roughness: 0.65,
      metalness: 0.05,
      flatShading: false,
    });
  }, []);

  const stoneMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#475569'),
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true,
    });
  }, []);

  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#86efac'),
      roughness: 0.5,
      metalness: 0.1,
    });
  }, []);

  return (
    <group position={[0, -1.5, 0]}>
      {/* 1. Main Grassy Top Plateau */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.35, 0.4, 48]} />
        <primitive object={grassMaterial} attach="material" />
      </mesh>

      {/* 2. Decorative Outer Grass Rim */}
      <mesh position={[0, 0.22, 0]} receiveShadow>
        <torusGeometry args={[4.25, 0.08, 16, 48]} />
        <primitive object={rimMaterial} attach="material" />
      </mesh>

      {/* 3. Mid Terraced Rock Shelf */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[4.2, 3.4, 0.6, 24]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* 4. Lower Inverted Rock Cone (Floating Keel) */}
      <mesh position={[0, -1.05, 0]} castShadow receiveShadow>
        <coneGeometry args={[3.3, 1.2, 16]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.9}
          metalness={0.15}
          flatShading
        />
      </mesh>
    </group>
  );
}

/**
 * Daylight Environment with safe offline/sandbox fallback
 */
function SoftDaylightEnvironment() {
  return (
    <>
      <Environment resolution={128}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial side={THREE.BackSide} color="#e0f2fe" />
        </mesh>
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      </Environment>
      <hemisphereLight
        args={['#e0f2fe', '#bbf7d0', 0.9]}
        position={[0, 50, 0]}
      />
    </>
  );
}

/**
 * GardenScene - Main R3F Canvas and Models Assembly
 */
export function GardenScene({
  containerRef,
  activeLevel = 2,
  onScrollProgress,
}: GardenSceneProps) {
  // Client mount check to avoid SSR hydration issues
  const [isMounted, setIsMounted] = useState(false);
  const [dof, setDof] = useState({ bokehScale: 0, focusDistance: 0.02 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#dcfce7]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin" />
          <span className="font-jetbrains text-xs tracking-widest text-[#0f2922] font-semibold uppercase">
            Loading 3D Impact Garden...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        camera={{
          position: [0, 5, 15],
          fov: 42,
          near: 0.1,
          far: 60,
        }}
        className="w-full h-full"
      >
        {/* Soft morning sky fog & ambient light */}
        <fog attach="fog" args={['#e6f4f1', 14, 40]} />
        <ambientLight intensity={0.6} color="#dbeafe" />

        {/* Diffuse daylight preset with soft fallback */}
        <SoftDaylightEnvironment />

        {/* Directional Sun Light: position={[10, 20, 10]} intensity={1.5} color="#ffffff" castShadow */}
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          color="#ffffff"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={1}
          shadow-camera-far={45}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.0004}
        />

        {/* Warm Morning Rim Accent */}
        <directionalLight
          position={[-10, 8, -8]}
          intensity={0.5}
          color="#fef08a"
        />

        {/* GSAP Camera Controller */}
        <CameraController
          containerRef={containerRef}
          onProgressChange={onScrollProgress}
          onDofChange={setDof}
        />

        {/* Floating Island Ground Base */}
        <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.15}>
          <FloatingIslandBase />

          {/* Centerpiece Magic Tree with animations & enhanced foliage */}
          <Suspense fallback={null}>
            <CenterpieceTree level={activeLevel} />
            <CircularPerimeterFlora />
          </Suspense>

          {/* Soft Contact Shadows grounding the floating island */}
          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.6}
            blur={2.5}
            width={16}
            height={16}
            far={4}
            color="#0f2922"
          />
        </Float>

        {/* Lush Morning Pollen & Dewdrop Sparkles */}
        <Sparkles
          count={55}
          scale={[12, 6, 12]}
          size={3.8}
          speed={0.3}
          color="#22c55e"
          opacity={0.65}
          position={[0, 0.5, 0]}
        />
        <Sparkles
          count={35}
          scale={[10, 5, 10]}
          size={4.2}
          speed={0.25}
          color="#fef08a"
          opacity={0.7}
          position={[0, 1.0, 0]}
        />

        {/* Post-Processing: Depth of Field & Soft Morning Bloom */}
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <DepthOfField
            focusDistance={dof.focusDistance}
            focalLength={0.05}
            bokehScale={dof.bokehScale}
            height={480}
          />
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

