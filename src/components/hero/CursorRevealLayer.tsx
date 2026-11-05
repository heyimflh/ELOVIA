'use client';

import { useEffect, useRef, useState } from 'react';

interface CursorRevealLayerProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function CursorRevealLayer({ containerRef }: CursorRevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveredRef = useRef(false);

  // Position references for lerp (smoothing)
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Radius as required: 260px
    const RADIUS = 260;
    // Lerp factor for slight smooth easing/inertia
    const LERP_FACTOR = 0.15;

    const applyMask = (x: number, y: number) => {
      if (!revealRef.current) return;
      // Soft feathered/glowing edge CSS radial-gradient mask
      const gradient = `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, black 0%, black 140px, rgba(0,0,0,0.75) 195px, rgba(0,0,0,0.25) 235px, transparent ${RADIUS}px)`;
      revealRef.current.style.maskImage = gradient;
      revealRef.current.style.webkitMaskImage = gradient;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetPos.current = { x, y };

      if (!isHoveredRef.current) {
        // First entry: snap immediately to avoid lerping from (0,0)
        currentPos.current = { x, y };
        isHoveredRef.current = true;
        applyMask(x, y);
        setIsVisible(true);
      }
    };

    const handlePointerLeave = () => {
      isHoveredRef.current = false;
      setIsVisible(false);
    };

    const handlePointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      targetPos.current = { x, y };
      currentPos.current = { x, y };
      isHoveredRef.current = true;
      applyMask(x, y);
      setIsVisible(true);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerenter', handlePointerEnter);

    // Smooth animation frame loop for easing/lerp
    let animId: number;
    const animate = () => {
      if (isHoveredRef.current) {
        const dx = targetPos.current.x - currentPos.current.x;
        const dy = targetPos.current.y - currentPos.current.y;

        // Apply slight easing / lerp
        currentPos.current.x += dx * LERP_FACTOR;
        currentPos.current.y += dy * LERP_FACTOR;

        applyMask(currentPos.current.x, currentPos.current.y);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerenter', handlePointerEnter);
      cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  return (
    <>
      {/* 1. Base Image Layer (public/images/BG_IMAGE1.png) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] select-none overflow-hidden"
      >
        <img
          src="/images/BG_IMAGE1.png"
          alt="Base background"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* 2. Reveal Image Layer (public/images/BG_IMAGE2.png) with cursor-following circular spotlight */}
      <div
        ref={revealRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] select-none overflow-hidden transition-opacity duration-300 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      >
        <img
          src="/images/BG_IMAGE2.png"
          alt="Reveal character scene"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </>
  );
}

