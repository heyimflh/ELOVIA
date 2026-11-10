'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CameraControllerProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  scrollProgressRef?: React.MutableRefObject<number>;
  manualLevel?: number;
}

export function CameraController({
  containerRef,
  scrollProgressRef,
}: CameraControllerProps) {
  const { camera } = useThree();

  // Internal smooth progress value
  const progressVal = useRef(0);
  const targetProgress = useRef(0);

  // Look-at target vectors for smooth dampening
  const currentLookAt = useRef(new THREE.Vector3(0, 0.8, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.8, 0));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const targetEl = containerRef?.current;
    if (!targetEl) return;

    const st = ScrollTrigger.create({
      trigger: targetEl,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
        if (scrollProgressRef) {
          scrollProgressRef.current = self.progress;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [containerRef, scrollProgressRef]);

  useFrame((state, delta) => {
    // Smoothly damp progress
    progressVal.current = THREE.MathUtils.damp(
      progressVal.current,
      targetProgress.current,
      3.5,
      delta
    );

    const p = progressVal.current;

    // Cinematic path calculations:
    // Start: Wide, slightly high-angle view (radius: 9.8, height: 4.6, angle: 0)
    // End: Cinematic intimate orbit (radius: 5.4, height: 1.1, angle: ~85 deg)
    const startRadius = 9.8;
    const endRadius = 5.6;
    const radius = THREE.MathUtils.lerp(startRadius, endRadius, p);

    const startY = 4.4;
    const endY = 1.15;
    const baseY = THREE.MathUtils.lerp(startY, endY, p);

    // Orbit angle from 0 to ~82 degrees (1.43 radians)
    const maxOrbitAngle = Math.PI * 0.46;
    const angle = p * maxOrbitAngle;

    // Subtle cursor parallax
    const mouseX = state.pointer.x * 0.65;
    const mouseY = state.pointer.y * 0.35;

    // Gentle breathing idle motion
    const idleTime = state.clock.getElapsedTime();
    const idleY = Math.sin(idleTime * 0.6) * 0.06;
    const idleX = Math.cos(idleTime * 0.4) * 0.04;

    const posX = Math.sin(angle) * radius + mouseX + idleX;
    const posY = baseY + mouseY + idleY;
    const posZ = Math.cos(angle) * radius;

    // Smoothly apply position to camera
    camera.position.x = THREE.MathUtils.damp(camera.position.x, posX, 4.0, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, posY, 4.0, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, posZ, 4.0, delta);

    // Dynamic LookAt: starts near ground/base and tilts up to the glowing canopy
    const lookAtY = THREE.MathUtils.lerp(0.6, 1.45, p);
    targetLookAt.current.set(0, lookAtY, 0);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 4.0, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 4.0, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 4.0, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

