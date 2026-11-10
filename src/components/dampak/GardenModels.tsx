'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GardenLevel } from './types';

// Preload models for instant seamless rendering
useGLTF.preload('/3dModels/garden/magic_tree.glb');
useGLTF.preload('/3dModels/garden/prehistoric-plants-set.glb');

interface GardenModelsProps {
  level: GardenLevel;
  scaleProgress: number; // For morphing/scaling during transitions
}

/**
 * Centerpiece Magic Tree with animated levitation, floating gem and glowing foliage
 */
export function MagicTree({
  scale = 1.0,
  glowBoost = 1.0,
}: {
  scale?: number;
  glowBoost?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/3dModels/garden/magic_tree.glb');

  // Clone scene so multiple instances or hot-reloads don't mutate shared GLTF
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Enhance materials for glowing bloom and deep cinematic contrast
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => enhanceMaterial(m));
        } else if (mesh.material) {
          mesh.material = enhanceMaterial(mesh.material);
        }
      }
    });
    return clone;
  }, [gltf.scene]);

  const { actions } = useAnimations(gltf.animations, groupRef);

  useEffect(() => {
    if (actions && gltf.animations.length > 0) {
      const firstAction = actions[gltf.animations[0].name] || actions['ArmatureAction'];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
        firstAction.timeScale = 0.8;
      }
    }
  }, [actions, gltf.animations]);

  // Subtle floating sway
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = -1.75 + Math.sin(t * 0.9) * 0.04;
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={clonedScene} position={[0, 0, 0]} />
      {/* Internal gem energy core light */}
      <pointLight
        position={[0, 1.4, 0]}
        color="#10B981"
        intensity={2.8 * glowBoost}
        distance={6}
        decay={2}
      />
      <pointLight
        position={[0, 0.4, 0.6]}
        color="#34D399"
        intensity={1.6 * glowBoost}
        distance={4.5}
        decay={2}
      />
    </group>
  );
}

/**
 * Supporting Prehistoric Flora Ecosystem (Conifers, Cycads, Tree Ferns, Mossy Logs)
 */
export function PrehistoricEnvironment({ density = 1 }: { density?: number }) {
  const gltf = useGLTF('/3dModels/garden/prehistoric-plants-set.glb');

  const clonedScene1 = useMemo(() => cloneFlora(gltf.scene), [gltf.scene]);
  const clonedScene2 = useMemo(() => cloneFlora(gltf.scene), [gltf.scene]);
  const clonedScene3 = useMemo(() => cloneFlora(gltf.scene), [gltf.scene]);
  const clonedScene4 = useMemo(() => cloneFlora(gltf.scene), [gltf.scene]);

  return (
    <group>
      {/* Cluster 1: Deep North-West forest thicket */}
      <primitive
        object={clonedScene1}
        position={[-3.4, -1.8, -2.4]}
        rotation={[0, 0.6, 0]}
        scale={[0.075, 0.075, 0.075]}
      />

      {/* Cluster 2: North-East canopy framing */}
      <primitive
        object={clonedScene2}
        position={[3.2, -1.8, -2.1]}
        rotation={[0, -1.1, 0]}
        scale={[0.068, 0.068, 0.068]}
      />

      {/* Cluster 3: South-West foreground tree-fern */}
      {density >= 2 && (
        <primitive
          object={clonedScene3}
          position={[-2.8, -1.8, 1.4]}
          rotation={[0, 2.2, 0]}
          scale={[0.052, 0.052, 0.052]}
        />
      )}

      {/* Cluster 4: South-East mossy flora & cycads */}
      {density >= 3 && (
        <primitive
          object={clonedScene4}
          position={[2.7, -1.8, 1.6]}
          rotation={[0, -0.4, 0]}
          scale={[0.058, 0.058, 0.058]}
        />
      )}
    </group>
  );
}

/**
 * Level 1: Luminous Seedling / Sprout model with floating crystal spore
 */
export function SeedlingSprout({ scale = 1.0 }: { scale?: number }) {
  const sproutRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!sproutRef.current) return;
    const t = state.clock.getElapsedTime();
    sproutRef.current.position.y = -1.7 + Math.sin(t * 1.5) * 0.03;
    sproutRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={sproutRef} scale={[scale, scale, scale]}>
      {/* Floating Luminescent Seed Heart */}
      <mesh position={[0, 0.9, 0]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#34D399"
          emissive="#10B981"
          emissiveIntensity={2.5}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* Sprout Stem */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.9, 16]} />
        <meshStandardMaterial
          color="#064E3B"
          emissive="#047857"
          emissiveIntensity={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Leaf 1 */}
      <mesh position={[0.22, 0.72, 0]} rotation={[0.4, 0, -0.6]}>
        <boxGeometry args={[0.42, 0.03, 0.22]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#059669"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Leaf 2 */}
      <mesh position={[-0.22, 0.65, 0.1]} rotation={[-0.3, 0.4, 0.6]}>
        <boxGeometry args={[0.38, 0.03, 0.2]} />
        <meshStandardMaterial
          color="#34D399"
          emissive="#10B981"
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Base Moss Mound */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.9, 1.2, 0.3, 24]} />
        <meshStandardMaterial
          color="#064E3B"
          roughness={0.8}
        />
      </mesh>

      {/* Core light */}
      <pointLight position={[0, 0.9, 0]} color="#34D399" intensity={2.8} distance={5} />
    </group>
  );
}

/**
 * Floating Island Base Disc with Moss, Subterranean Soil & Bio-luminescent Edge
 */
export function IslandGround() {
  return (
    <group position={[0, -1.95, 0]}>
      {/* Top Meadow Island */}
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[5.2, 4.8, 0.35, 64]} />
        <meshStandardMaterial
          color="#062F1F"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Subterranean Loam Strata */}
      <mesh receiveShadow position={[0, -0.4, 0]}>
        <cylinderGeometry args={[4.8, 3.2, 0.7, 64]} />
        <meshStandardMaterial
          color="#03160E"
          roughness={0.95}
        />
      </mesh>

      {/* Bioluminescent Outer Energy Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.28, 0]}>
        <ringGeometry args={[4.9, 5.15, 64]} />
        <meshBasicMaterial
          color="#059669"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Helpers
function enhanceMaterial(mat: THREE.Material): THREE.Material {
  const m = mat.clone();
  if ('roughness' in m) (m as THREE.MeshStandardMaterial).roughness = 0.55;

  const matName = m.name?.toUpperCase() || '';

  // Gem and glow enhancements
  if (matName.includes('GEM') || matName.includes('DROP')) {
    if ('emissive' in m) {
      (m as THREE.MeshStandardMaterial).emissive = new THREE.Color('#10B981');
      (m as THREE.MeshStandardMaterial).emissiveIntensity = 2.8;
      (m as THREE.MeshStandardMaterial).roughness = 0.08;
      (m as THREE.MeshStandardMaterial).metalness = 0.9;
    }
  } else if (matName.includes('LEAF') || matName.includes('FOLIAGE')) {
    if ('emissive' in m) {
      (m as THREE.MeshStandardMaterial).emissive = new THREE.Color('#03351F');
      (m as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
    }
  }
  return m;
}

function cloneFlora(sourceScene: THREE.Group): THREE.Group {
  const clone = sourceScene.clone(true);
  clone.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else {
          mesh.material = mesh.material.clone();
        }
      }
    }
  });
  return clone;
}

