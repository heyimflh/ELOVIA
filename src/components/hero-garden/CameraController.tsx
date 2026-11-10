'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface CameraControllerProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  onProgressChange?: (progress: number) => void;
  onDofChange?: (dof: { bokehScale: number; focusDistance: number }) => void;
}

/**
 * CameraController - GSAP ScrollTrigger Camera Choreography
 * 
 * 0% (Hero): Wide shot [0, 5, 15] with subtle idle breathing and mouse parallax.
 * 1% - 50% (The Fly-In): Pushes IN and sweeps LOW to [4, 1.5, 6], lookAt trunk [0, 0.9, 0].
 * 50% - 100% (The Walkthrough): Orbits 45° around the tree revealing glowing moss rock and telemetry sensor mast.
 */
export function CameraController({
  containerRef,
  onProgressChange,
  onDofChange,
}: CameraControllerProps) {
  const { camera } = useThree();

  // Progress trackers
  const progressVal = useRef(0);
  const targetProgress = useRef(0);

  // Look-at targets
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  // Current camera position vector for smooth dampening
  const currentPos = useRef(new THREE.Vector3(0, 5, 15));

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = containerRef?.current;
    if (!triggerElement) return;

    const st = ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        targetProgress.current = self.progress;
        if (onProgressChange) {
          onProgressChange(self.progress);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [containerRef, onProgressChange]);

  useFrame((state, delta) => {
    // Smooth dampening on progress to prevent jitter
    progressVal.current = THREE.MathUtils.damp(
      progressVal.current,
      targetProgress.current,
      4.5,
      delta
    );

    const p = progressVal.current;

    // Base coordinates
    const heroPos = new THREE.Vector3(0, 5, 15);
    const flyInPos = new THREE.Vector3(4, 1.5, 6);

    let destX = 0;
    let destY = 5;
    let destZ = 15;
    let lookY = 1.2;
    let bokeh = 0;

    if (p <= 0.5) {
      // 0% - 50%: The Fly-In
      // Normalize t from 0 to 1
      const t = p / 0.5;
      // Smooth cubic easing
      const easedT = t * t * (3 - 2 * t);

      destX = THREE.MathUtils.lerp(heroPos.x, flyInPos.x, easedT);
      destY = THREE.MathUtils.lerp(heroPos.y, flyInPos.y, easedT);
      destZ = THREE.MathUtils.lerp(heroPos.z, flyInPos.z, easedT);

      // LookAt descends smoothly to the trunk of magic_tree
      lookY = THREE.MathUtils.lerp(1.2, 0.9, easedT);

      // Bokeh scale increases as we push into foreground foliage
      bokeh = THREE.MathUtils.lerp(0.0, 3.2, easedT);
    } else {
      // 50% - 100%: The Walkthrough Orbit (45 degrees)
      const t = (p - 0.5) / 0.5;
      const easedT = t * t * (3 - 2 * t);

      // Starting angle from flyInPos [4, 1.5, 6] relative to tree center [0,0,0]
      const startAngle = Math.atan2(flyInPos.x, flyInPos.z); // ~0.588 rad (33.7°)
      const orbitAngle = startAngle + easedT * (Math.PI * 0.25); // +45 degrees (0.785 rad)
      const radius = Math.hypot(flyInPos.x, flyInPos.z); // ~7.21

      destX = Math.sin(orbitAngle) * radius;
      destZ = Math.cos(orbitAngle) * radius;
      // Gentle vertical arch during the walkthrough
      destY = flyInPos.y + Math.sin(easedT * Math.PI) * 0.35;

      // LookAt gently reveals the detail zone (glowing moss rock & sensor mast at [1.5, 0.6, 1.2])
      const targetLookX = THREE.MathUtils.lerp(0, 0.8, easedT);
      const targetLookZ = THREE.MathUtils.lerp(0, 0.6, easedT);
      lookY = THREE.MathUtils.lerp(0.9, 0.75, easedT);

      targetLookAt.current.set(targetLookX, lookY, targetLookZ);
      bokeh = 3.2;
    }

    if (p <= 0.5) {
      targetLookAt.current.set(0, lookY, 0);
    }

    // Gentle organic breathing idle motion & pointer parallax
    const idleTime = state.clock.getElapsedTime();
    const idleY = Math.sin(idleTime * 0.65) * 0.05;
    const idleX = Math.cos(idleTime * 0.45) * 0.04;

    const pointerParallaxX = state.pointer.x * (1 - p * 0.5) * 0.5;
    const pointerParallaxY = state.pointer.y * (1 - p * 0.5) * 0.25;

    // Apply target position with smooth damp
    currentPos.current.x = THREE.MathUtils.damp(
      currentPos.current.x,
      destX + idleX + pointerParallaxX,
      4.0,
      delta
    );
    currentPos.current.y = THREE.MathUtils.damp(
      currentPos.current.y,
      destY + idleY + pointerParallaxY,
      4.0,
      delta
    );
    currentPos.current.z = THREE.MathUtils.damp(
      currentPos.current.z,
      destZ,
      4.0,
      delta
    );

    camera.position.copy(currentPos.current);

    // Apply lookAt with smooth damp
    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetLookAt.current.x,
      4.0,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      targetLookAt.current.y,
      4.0,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      4.0,
      delta
    );

    camera.lookAt(currentLookAt.current);

    // Notify DepthOfField changes
    if (onDofChange) {
      onDofChange({
        bokehScale: bokeh,
        focusDistance: 0.02,
      });
    }
  });

  return null;
}

