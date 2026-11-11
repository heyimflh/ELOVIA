'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, ArrowDown, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES & DESKTOP MARQUEE WORDS
// ─────────────────────────────────────────────────────────────────────────────

interface LetterItem {
  letter: string;
  color: string;
}

interface WordGroup {
  word: string;
  isAccent?: boolean;
  letters: LetterItem[];
}

const DESKTOP_WORDS: WordGroup[] = [
  {
    word: 'Setiap',
    isAccent: false,
    letters: [
      { letter: 'S', color: '#0F172A' },
      { letter: 'e', color: '#0F172A' },
      { letter: 't', color: '#0F172A' },
      { letter: 'i', color: '#0F172A' },
      { letter: 'a', color: '#0F172A' },
      { letter: 'p', color: '#0F172A' },
    ],
  },
  {
    word: 'Material',
    isAccent: false,
    letters: [
      { letter: 'M', color: '#0F172A' },
      { letter: 'a', color: '#0F172A' },
      { letter: 't', color: '#0F172A' },
      { letter: 'e', color: '#0F172A' },
      { letter: 'r', color: '#0F172A' },
      { letter: 'i', color: '#0F172A' },
      { letter: 'a', color: '#0F172A' },
      { letter: 'l', color: '#0F172A' },
    ],
  },
  {
    word: 'Memiliki',
    isAccent: false,
    letters: [
      { letter: 'M', color: '#0F172A' },
      { letter: 'e', color: '#0F172A' },
      { letter: 'm', color: '#0F172A' },
      { letter: 'i', color: '#0F172A' },
      { letter: 'l', color: '#0F172A' },
      { letter: 'i', color: '#0F172A' },
      { letter: 'k', color: '#0F172A' },
      { letter: 'i', color: '#0F172A' },
    ],
  },
  {
    word: 'Nilai',
    isAccent: true,
    letters: [
      { letter: 'N', color: '#10B981' },
      { letter: 'i', color: '#10B981' },
      { letter: 'l', color: '#14B8A6' },
      { letter: 'a', color: '#14B8A6' },
      { letter: 'i', color: '#059669' },
    ],
  },
  {
    word: 'Baru.',
    isAccent: true,
    letters: [
      { letter: 'B', color: '#10B981' },
      { letter: 'a', color: '#14B8A6' },
      { letter: 'r', color: '#0D9488' },
      { letter: 'u', color: '#059669' },
      { letter: '.', color: '#059669' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 1. DESKTOP ANIMATED HERO (Saverish Horizontal Scroll + Elastic Letter Scattering)
// ─────────────────────────────────────────────────────────────────────────────

interface HeroProps {
  handleScrollToGlobe: () => void;
}

function DesktopAnimatedHero({ handleScrollToGlobe }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Springs
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      const textContainer = textRef.current;
      const bottomCard = bottomTextRef.current;
      if (!container || !textContainer) return;

      const letters = container.querySelectorAll('.desktop-letter');
      const pinnedDistance = 3500;

      // Master Pinned Scroll Timeline
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

      // Horizontal Marquee Scrub
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

      // Mission statement fade-in & scale
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

      // Draw SVG Loop Arrow
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

      // Elastic Throwing Letters Physics (Guaranteed substantial scatter distance)
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

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="marketplace-bridge-view"
      ref={sectionRef}
      suppressHydrationWarning
      className="relative w-full h-screen bg-[#F6FAF7] overflow-hidden font-jakarta select-none"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Subtle Mint Dot Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#177A47 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* 2. Top & Bottom Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/40 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* 3. Glowing Mint/Teal Central Orb with Mouse Parallax */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[760px] h-[600px] lg:h-[760px] bg-gradient-to-tr from-[#2FA866]/20 via-[#177A47]/15 to-[#0E7C7B]/15 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 4. Top Eyebrow Badge */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase shadow-2xs select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ELOVIA Marketplace</span>
        </div>
      </div>

      {/* 5. Animated Green Arrow SVG (Saverish Loop Curve) */}
      <motion.div
        style={{ x: invertedParallaxX, y: invertedParallaxY }}
        className="w-full max-w-4xl flex justify-center absolute top-16 lg:top-20 left-1/2 -translate-x-1/2 drop-shadow-[0_15px_30px_rgba(23,122,71,0.25)] z-20 pointer-events-none"
      >
        <svg
          ref={arrowRef}
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 md:w-32 lg:w-[200px]"
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

      {/* 6. Marquee Text Container with Fraunces Typography & Staggered Letters */}
      <div
        ref={textRef}
        className="w-full absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap flex items-center justify-start pr-[50vw] pointer-events-none"
        style={{
          paddingLeft: '0',
          paddingRight: '50vw',
        }}
      >
        <h2 className="text-[120px] lg:text-[145px] xl:text-[165px] font-black uppercase tracking-tighter leading-none font-fraunces flex flex-nowrap items-center text-left">
          {DESKTOP_WORDS.map((wordObj, wIdx) => (
            <span
              key={wordObj.word}
              className={`inline-block whitespace-nowrap overflow-visible ${
                wordObj.isAccent ? 'italic font-serif' : ''
              }`}
            >
              {wordObj.letters.map((item, idx) => (
                <span
                  key={`${wordObj.word}-${idx}`}
                  className={`desktop-letter inline-block select-none font-black uppercase origin-center ${
                    wordObj.isAccent
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500'
                      : 'text-[#0F172A]'
                  }`}
                  style={{
                    color: wordObj.isAccent ? '#10B981' : item.color,
                    filter: wordObj.isAccent
                      ? 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.45))'
                      : 'none',
                    willChange: 'transform, opacity',
                  }}
                >
                  {item.letter}
                </span>
              ))}
              {wIdx < DESKTOP_WORDS.length - 1 && (
                <span className="inline-block select-none font-black text-[#0F172A]">
                  {'\u00A0'}
                </span>
              )}
            </span>
          ))}
        </h2>
      </div>

      {/* 7. Floating Glass Mission Card & Direct Call to Action */}
      <div
        ref={bottomTextRef}
        className="w-full px-6 absolute left-1/2 bottom-8 lg:bottom-12 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-center pointer-events-auto"
      >
        <div className="bg-white/85 backdrop-blur-2xl border border-white/70 p-6 rounded-[32px] shadow-[0_25px_60px_-15px_rgba(23,122,71,0.12)] max-w-2xl mx-auto transition-all duration-300 hover:shadow-[0_30px_70px_-15px_rgba(23,122,71,0.18)]">
          <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed font-jakarta">
            Setiap kilogram sampah yang Anda daur ulang menciptakan efek bola salju bagi pelestarian lingkungan. Bergabunglah bersama kami menciptakan{' '}
            <span className="text-emerald-700 font-bold">ekosistem sirkular</span>{' '}
            yang menguntungkan Anda dan bumi.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleScrollToGlobe}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-emerald-200 group-hover:rotate-45 transition-transform" />
            <span>Jelajahi Peta Sentra Sirkular</span>
            <ArrowDown className="w-4 h-4 text-emerald-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>50+ Mitra Terverifikasi SNI</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MOBILE STATIC HERO (Clean, Rock-Solid Static Typography for Screens < lg)
// ─────────────────────────────────────────────────────────────────────────────

function MobileStaticHero({ handleScrollToGlobe }: HeroProps) {
  return (
    <section
      id="marketplace-bridge-view"
      suppressHydrationWarning
      className="relative w-full min-h-[85vh] bg-[#F6FAF7] overflow-hidden flex flex-col justify-center items-center py-20 sm:py-24 select-none"
    >
      {/* Subtle Mint Dot Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#177A47 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Top and Bottom Gradient Blends */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/40 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Ambient Radial Glowing Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-tr from-[#2FA866]/15 via-[#177A47]/10 to-[#0E7C7B]/10 rounded-full blur-[100px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Section Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-2xs select-none"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ELOVIA Marketplace</span>
        </motion.div>

        {/* Headline Container with Hand-Drawn Arrow */}
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:block absolute -top-12 right-4 pointer-events-none z-20 text-[#177A47] drop-shadow-sm"
            aria-hidden="true"
          >
            <svg
              className="w-24 sm:w-28 h-auto"
              viewBox="0 0 386 127"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12] mb-6 font-jakarta"
          >
            Setiap Material <br className="hidden sm:block" />
            Memiliki{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-green-600 font-serif italic pr-1">
              Nilai Baru.
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 font-normal font-jakarta"
        >
          Temukan pembeli yang tepat untuk material daur ulang Anda atau pasok kebutuhan
          industri Anda langsung dari sumber terverifikasi.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 w-full max-w-md mx-auto"
        >
          <button
            type="button"
            onClick={handleScrollToGlobe}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer group"
          >
            <Compass className="w-4 h-4 text-emerald-200 group-hover:rotate-45 transition-transform" />
            <span>Jelajahi Peta Sentra Sirkular</span>
            <ArrowDown className="w-4 h-4 text-emerald-200 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/90 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>50+ Mitra Terverifikasi SNI</span>
          </div>
        </motion.div>

        {/* Mission Statement Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white p-5 sm:p-7 rounded-[28px] shadow-[0_20px_50px_-15px_rgba(16,185,129,0.08)]">
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed font-jakarta">
              Setiap kilogram sampah yang Anda daur ulang menciptakan efek bola salju bagi
              pelestarian lingkungan. Bergabunglah bersama kami menciptakan{' '}
              <span className="text-emerald-700 font-bold">ekosistem sirkular</span> yang
              menguntungkan Anda dan bumi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MASTER COMPONENT WITH CONDITIONAL DEVICE ROUTING & ZERO HYDRATION MISMATCH
// ─────────────────────────────────────────────────────────────────────────────

export function MarketplaceTransitionBridge() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDevice = () => setIsDesktop(window.innerWidth >= 1024);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleScrollToGlobe = () => {
    const el = document.getElementById('marketplace-globe-view');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div suppressHydrationWarning className="w-full">
      {/* DESKTOP VIEW (>= lg / 1024px): Complex Saverish Elastic Letter Scattering Animation */}
      {isDesktop && mounted && (
        <DesktopAnimatedHero handleScrollToGlobe={handleScrollToGlobe} />
      )}

      {/* MOBILE VIEW (< lg) & INITIAL SSR PASS: Rock-Solid Static Responsive Typography */}
      {(!isDesktop || !mounted) && (
        <MobileStaticHero handleScrollToGlobe={handleScrollToGlobe} />
      )}
    </div>
  );
}

export default MarketplaceTransitionBridge;