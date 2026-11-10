'use client';

import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Center,
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
  useGLTF,
} from '@react-three/drei';

function TruckModel() {
  const { scene } = useGLTF('/3dModels/1950s-pickup-truck.glb');
  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if ((child as any).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <Center top>
      <primitive
        object={cloned}
        scale={1.1}
      />
    </Center>
  );
}

function YardModel() {
  const { scene } = useGLTF('/3dModels/Recycling Centre and Waste Transfer Yard.glb');
  const cloned = useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if ((child as any).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <Center top>
      <primitive
        object={cloned}
        scale={0.16}
      />
    </Center>
  );
}

// Preload models for instant display
useGLTF.preload('/3dModels/1950s-pickup-truck.glb');
useGLTF.preload('/3dModels/Recycling Centre and Waste Transfer Yard.glb');

export interface Delivery3DStageProps {
  type: 'pickup' | 'dropoff';
}

export function Delivery3DStage({ type }: Delivery3DStageProps) {
  return (
    <div className="w-full h-full relative z-0 transform-gpu">
      {/* 1. Strict Premium Isometric Camera Setup */}
      <Canvas
        camera={{ position: [5, 4, 5], fov: 45 }}
        className="pointer-events-none [&>canvas]:pointer-events-auto [&>canvas]:touch-pan-y"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        shadows
      >
        {/* 2. Ban Over-exposure: Neutral Lighting & Crisp Directional Highlights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <hemisphereLight args={['#f8fafc', '#cbd5e1', 0.8]} position={[0, 20, 0]} />
        <Environment resolution={128}>
          <mesh scale={100}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial side={THREE.BackSide} color="#f8fafc" />
          </mesh>
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        </Environment>

        {/* 5. Refined OrbitControls: Controlled Auto-Rotation & Clamped Polar Angles */}
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
          target={[0, 0.5, 0]}
        />

        {/* 3. Auto-Centering & Scaling: Locked at y = 0 */}
        <Suspense fallback={null}>
          {type === 'pickup' ? <TruckModel /> : <YardModel />}
        </Suspense>

        {/* 4. Perfect Grounding Contact Shadows */}
        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.7}
          scale={10}
          blur={2}
          resolution={512}
          color="#177A47"
        />
      </Canvas>
    </div>
  );
}
