'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TransitionParticlesProps {
  active: boolean;
  onComplete?: () => void;
  colorTheme?: 'emerald' | 'gold' | 'cyan';
}

const PARTICLE_COUNT = 450;

export function TransitionParticles({
  active,
  onComplete,
  colorTheme = 'emerald',
}: TransitionParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseLightRef = useRef<THREE.PointLight>(null);

  // Animation timeline state
  const timeRef = useRef(0);
  const isRunningRef = useRef(false);

  // Pre-generate particle initial directions, speeds, and variations
  const particleData = useMemo(() => {
    const data = [];
    const colors =
      colorTheme === 'emerald'
        ? ['#10B981', '#34D399', '#6EE7B7', '#22D3EE', '#FDE047']
        : ['#F59E0B', '#FBBF24', '#34D399', '#10B981', '#FFFFFF'];

    const dummyColor = new THREE.Color();
    const colorArray = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random spherical coordinates with upward bias
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1) * 0.7; // bias upwards
      const speed = 2.8 + Math.random() * 4.5;
      const swirlSpeed = (Math.random() - 0.5) * 8.0;
      const scale = 0.5 + Math.random() * 1.2;

      data.push({
        dir: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi) * 1.2, // upward lift
          Math.sin(phi) * Math.sin(theta)
        ).normalize(),
        speed,
        swirlSpeed,
        scale,
        baseScale: scale,
        originOffset: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          Math.random() * 1.5 - 0.5,
          (Math.random() - 0.5) * 0.8
        ),
      });

      dummyColor.set(colors[Math.floor(Math.random() * colors.length)]);
      dummyColor.toArray(colorArray, i * 3);
    }

    return { data, colorArray };
  }, [colorTheme]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Trigger effect when active changes to true
  useEffect(() => {
    if (active) {
      isRunningRef.current = true;
      timeRef.current = 0;
    }
  }, [active]);

  // Set instance colors on mount
  useEffect(() => {
    if (meshRef.current) {
      const colorAttr = new THREE.InstancedBufferAttribute(particleData.colorArray, 3);
      meshRef.current.geometry.setAttribute('color', colorAttr);
    }
  }, [particleData]);

  useFrame((_, delta) => {
    if (!isRunningRef.current) return;

    // Normalizing animation over ~1.6 seconds
    timeRef.current += delta * 0.65;
    const t = Math.min(timeRef.current, 1.0);

    // 1. Shockwave ground ring
    if (ringRef.current) {
      const ringScale = Math.sin(t * Math.PI * 0.5) * 9.0;
      ringRef.current.scale.set(ringScale, ringScale, 1);
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      ringMat.opacity = Math.max(0, (1 - t) * 0.85);
    }

    // 2. Pulse Light Flash
    if (pulseLightRef.current) {
      if (t < 0.2) {
        pulseLightRef.current.intensity = (t / 0.2) * 14;
      } else {
        pulseLightRef.current.intensity = Math.max(0, (1 - (t - 0.2) / 0.8) * 14);
      }
    }

    // 3. Particles physics
    if (meshRef.current) {
      const meshMat = meshRef.current.material as THREE.MeshBasicMaterial;

      // Opacity envelope
      if (t < 0.15) {
        meshMat.opacity = t / 0.15;
      } else if (t > 0.75) {
        meshMat.opacity = Math.max(0, (1 - (t - 0.75) / 0.25));
      } else {
        meshMat.opacity = 1.0;
      }

      particleData.data.forEach((p, i) => {
        let posX = 0;
        let posY = 0;
        let posZ = 0;
        let currentScale = p.scale;

        if (t < 0.45) {
          // Outward explosion phase
          const easeOut = 1 - Math.pow(1 - t / 0.45, 3);
          const dist = p.speed * easeOut;

          posX = p.originOffset.x + p.dir.x * dist;
          posY = p.originOffset.y + p.dir.y * dist + t * 1.5;
          posZ = p.originOffset.z + p.dir.z * dist;

          // Swirl
          const angle = t * p.swirlSpeed;
          const rotatedX = posX * Math.cos(angle) - posZ * Math.sin(angle);
          const rotatedZ = posX * Math.sin(angle) + posZ * Math.cos(angle);
          posX = rotatedX;
          posZ = rotatedZ;
        } else {
          // Implosion / convergence vortex phase towards new tree center
          const vortexProgress = (t - 0.45) / 0.55;
          const converge = 1 - Math.pow(vortexProgress, 2);

          const maxDist = p.speed * 0.95;
          const currentRadius = maxDist * converge + 0.1;
          const angle = 0.45 * p.swirlSpeed + vortexProgress * (p.swirlSpeed * 2.2);

          posX = Math.cos(angle) * currentRadius;
          posZ = Math.sin(angle) * currentRadius;
          posY = (p.originOffset.y + p.dir.y * maxDist) * converge + 0.8 + vortexProgress * 1.2;

          currentScale = p.scale * (1 - vortexProgress * 0.6);
        }

        dummy.position.set(posX, posY, posZ);
        dummy.scale.setScalar(Math.max(0.001, currentScale));
        dummy.updateMatrix();

        meshRef.current?.setMatrixAt(i, dummy.matrix);
      });

      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (t >= 1.0) {
      isRunningRef.current = false;
      if (onComplete) onComplete();
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Shockwave Energy Ground Ring */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.65, 0]}
        scale={[0.01, 0.01, 1]}
      >
        <ringGeometry args={[0.3, 0.5, 48]} />
        <meshBasicMaterial
          color="#34D399"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Central Burst Point Light */}
      <pointLight
        ref={pulseLightRef}
        color="#34D399"
        intensity={0}
        distance={10}
        decay={2}
        position={[0, 0.5, 0]}
      />

      {/* 450 Glowing Energy Debris Particles */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[0.07, 0]} />
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}

