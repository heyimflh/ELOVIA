'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MarketplaceTransitionBridge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const springConfig = { stiffness: 40, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(mouseXSpring, [-500, 500], [25, -25]);
  const parallaxY = useTransform(mouseYSpring, [-500, 500], [25, -25]);

  const invertedParallaxX = useTransform(parallaxX, (v) => -v);
  const invertedParallaxY = useTransform(parallaxY, (v) => -v);

  // Grouped words data for clean typography wrapping on mobile
  const wordsGrouped = [
    {
      word: 'Setiap',
      letters: [
        { letter: 'S', color: '#111827' },
        { letter: 'e', color: '#111827' },
        { letter: 't', color: '#111827' },
        { letter: 'i', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 'p', color: '#111827' },
      ],
    },
    {
      word: 'material',
      letters: [
        { letter: 'm', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 't', color: '#111827' },
        { letter: 'e', color: '#111827' },
        { letter: 'r', color: '#111827' },
        { letter: 'i', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 'l', color: '#111827' },
      ],
    },
    {
      word: 'terpilah',
      letters: [
        { letter: 't', color: '#111827' },
        { letter: 'e', color: '#111827' },
        { letter: 'r', color: '#111827' },
        { letter: 'p', color: '#111827' },
        { letter: 'i', color: '#111827' },
        { letter: 'l', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 'h', color: '#111827' },
      ],
    },
    {
      word: 'memiliki',
      letters: [
        { letter: 'm', color: '#16A34A' },
        { letter: 'e', color: '#16A34A' },
        { letter: 'm', color: '#16A34A' },
        { letter: 'i', color: '#16A34A' },
        { letter: 'l', color: '#16A34A' },
        { letter: 'i', color: '#16A34A' },
        { letter: 'k', color: '#16A34A' },
        { letter: 'i', color: '#16A34A' },
      ],
    },
    {
      word: 'nilai',
      letters: [
        { letter: 'n', color: '#16A34A' },
        { letter: 'i', color: '#16A34A' },
        { letter: 'l', color: '#16A34A' },
        { letter: 'a', color: '#16A34A' },
        { letter: 'i', color: '#16A34A' },
      ],
    },
    {
      word: 'untuk',
      letters: [
        { letter: 'u', color: '#111827' },
        { letter: 'n', color: '#111827' },
        { letter: 't', color: '#111827' },
        { letter: 'u', color: '#111827' },
        { letter: 'k', color: '#111827' },
      ],
    },
    {
      word: 'masa',
      letters: [
        { letter: 'm', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 's', color: '#111827' },
        { letter: 'a', color: '#111827' },
      ],
    },
    {
      word: 'depan.',
      letters: [
        { letter: 'd', color: '#111827' },
        { letter: 'e', color: '#111827' },
        { letter: 'p', color: '#111827' },
        { letter: 'a', color: '#111827' },
        { letter: 'n', color: '#111827' },
        { letter: '.', color: '#111827' },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      const textContainer = textRef.current;
      const bottomCard = bottomTextRef.current;
      if (!container || !textContainer) return;

      const isMobile = window.innerWidth < 768;
      const letters = container.querySelectorAll('.letter');

      if (!isMobile) {
        const pinnedDistance = 3500;
        const scrollTween = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${pinnedDistance}`,
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        scrollTween
          .fromTo(
            textContainer,
            { x: '100vw' },
            { x: '50vw', ease: 'none', duration: 1 }
          )
          .to(textContainer, {
            x: () => -(textContainer.scrollWidth - window.innerWidth / 2),
            ease: 'none',
            duration: 2.2,
          });

        if (bottomCard) {
          gsap.fromTo(
            bottomCard,
            { scale: 0.85, opacity: 0, y: 50 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 20%',
                end: 'top -20%',
                scrub: 0.8,
              },
            }
          );
        }

        if (arrowRef.current) {
          const arrowPaths = arrowRef.current.querySelectorAll('path');
          arrowPaths.forEach((arrowPath: SVGPathElement) => {
            const pathLen = arrowPath.getTotalLength ? arrowPath.getTotalLength() : 500;
            gsap.set(arrowPath, {
              strokeDasharray: pathLen,
              strokeDashoffset: pathLen,
            });
            gsap.to(arrowPath, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 30%',
                end: 'top 0%',
                scrub: 0.8,
              },
            });
          });
        }

        // Desktop Elastic Throwing Letters:
        // Guaranteed substantial scatter distance (±160px to ±340px) that stays in-bounds
        // Widen runway (100% to 18%) so letters actively oscillate across 82% of the screen!
        letters.forEach((letter: Element, index: number) => {
          const isUp = index % 2 === 0 ? 1 : -1;
          const yDistance = isUp * (160 + ((index * 47) % 180));
          const rotAngle = -isUp * (35 + ((index * 31) % 65));
          const startScale = 0.6 + ((index * 19) % 50) / 100;

          gsap.fromTo(
            letter,
            {
              y: yDistance,
              rotation: rotAngle,
              scale: startScale,
              opacity: 0.25,
            },
            {
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: 'elastic.out(1.8, 0.35)',
              scrollTrigger: {
                trigger: letter,
                containerAnimation: scrollTween,
                start: 'left 100%',
                end: 'left 18%',
                scrub: 0.8,
              },
            }
          );
        });

        // Recalculate ScrollTrigger measurements cleanly
        ScrollTrigger.refresh();
      } else {
        if (bottomCard) {
          gsap.fromTo(
            bottomCard,
            { scale: 0.9, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: bottomCard,
                start: 'top 90%',
                end: 'top 75%',
                scrub: true,
              },
            }
          );
        }

        letters.forEach((letter: Element, idx: number) => {
          const isUp = idx % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            letter,
            {
              y: isUp * 80,
              opacity: 0,
              scale: 0.35,
              rotate: -isUp * 50,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              ease: 'elastic.out(1.8, 0.4)',
              scrollTrigger: {
                trigger: letter,
                start: 'top 95%',
                end: 'top 70%',
                scrub: 0.6,
              },
            }
          );
        });

        if (arrowRef.current) {
          gsap.fromTo(
            arrowRef.current,
            { scale: 0.5, opacity: 0, rotate: -20 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: arrowRef.current,
                start: 'top 85%',
                end: 'top 70%',
                scrub: true,
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="marketplace-bridge-view"
      ref={sectionRef}
      className="relative w-full h-auto min-h-screen md:h-screen bg-[#F6FAF7] overflow-hidden font-[family:var(--font-jakarta)] select-none py-24 md:py-0"
      onMouseMove={handleMouseMove}
    >
      {/* =====================================================================
          1. AMBIENT BACKGROUND & MINT PATTERN
          ===================================================================== */}
      {/* Subtle Mint Dot Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#177A47 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top & Bottom Gradient Overlay for Seamless Blend with Hero & Globe */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-black/20 pointer-events-none z-[1]" />

      {/* Massive Glowing Mint/Teal Central Orb with Mouse Parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] md:w-[720px] h-[340px] sm:h-[580px] md:h-[720px] bg-gradient-to-tr from-[#2FA866] via-[#177A47] to-[#0E7C7B] rounded-full blur-[140px] opacity-20 z-0 pointer-events-none"
      />

      {/* =====================================================================
          2. SECTION CONTENT & MARQUEE
          ===================================================================== */}
      <div className="relative w-full h-full md:h-screen flex flex-col justify-between items-center z-10 px-4">
        <div className="w-full flex-1 flex flex-col justify-center items-center py-12 md:py-0 relative">
          {/* Animated Green Arrow SVG (Saverish loop-de-loop curve) */}
          <motion.div
            style={{ x: invertedParallaxX, y: invertedParallaxY }}
            className="w-full max-w-4xl flex justify-center mb-6 md:mb-0 md:absolute md:-top-24 md:left-1/2 md:-translate-x-1/2 drop-shadow-[0_15px_30px_rgba(23,122,71,0.25)] z-20"
          >
            <svg
              ref={arrowRef}
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 sm:w-24 md:w-32 lg:w-[200px]"
              viewBox="0 0 386 127"
              fill="none"
            >
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5"
                stroke="#177A47"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97"
                stroke="#177A47"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          {/* Marquee Text Container with Fraunces Serif Editorial Typography */}
          <div
            ref={textRef}
            className="w-full md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 whitespace-normal md:whitespace-nowrap flex items-center justify-center md:justify-start md:pr-[50vw]"
            style={{
              paddingLeft: '0',
              paddingRight: '50vw',
            }}
          >
            <h2 className="text-[12vw] md:text-[140px] lg:text-[160px] font-black uppercase tracking-tighter leading-none font-[family:var(--font-fraunces)] flex flex-wrap md:flex-nowrap items-center justify-center text-center md:text-left gap-y-2">
              {wordsGrouped.map((wordObj, wIdx) => (
                <span
                  key={wordObj.word}
                  className="inline-block whitespace-nowrap overflow-visible"
                >
                  {wordObj.letters.map((item, idx) => (
                    <span
                      key={`${wordObj.word}-${idx}`}
                      className="letter inline-block select-none font-black uppercase origin-center"
                      style={{
                        color: item.color,
                        textShadow:
                          item.color === '#16A34A'
                            ? '0 0 40px rgba(22, 163, 74, 0.45)'
                            : 'none',
                        willChange: 'transform, opacity',
                      }}
                    >
                      {item.letter}
                    </span>
                  ))}
                  {wIdx < wordsGrouped.length - 1 && (
                    <span className="inline-block select-none font-black">
                      {'\u00A0'}
                    </span>
                  )}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* =====================================================================
            3. FLOATING GLASS BOTTOM CARD (The Mission Statement)
            ===================================================================== */}
        <div
          ref={bottomTextRef}
          className="w-full px-4 mb-4 md:mb-0 md:absolute md:left-1/2 md:bottom-[10%] md:-translate-x-1/2 text-center z-20"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[32px] shadow-[0_30px_60px_-15px_rgba(23,122,71,0.08)] max-w-[300px] sm:max-w-lg md:max-w-2xl mx-auto transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(23,122,71,0.16)]">
            <p className="text-ink-700 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed font-[family:var(--font-jakarta)]">
              Setiap kilogram sampah yang Anda daur ulang menciptakan efek bola salju bagi pelestarian lingkungan. Bergabunglah bersama kami menciptakan{' '}
              <span className="text-green-600 font-bold">ekosistem sirkular</span>{' '}
              yang menguntungkan Anda dan bumi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MarketplaceTransitionBridge;
