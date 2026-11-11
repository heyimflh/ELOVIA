'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Mail,
  ArrowUpRight,
  Phone,
  Leaf,
  Clock,
  Sparkles,
} from 'lucide-react';

/* =========================================================================
   CUSTOM SOCIAL ICONS (SVG)
   Clean, minimalist stroke icons matching reference design
   ========================================================================= */
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGRadialGradientElement>(null);

  const rawReducedMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(rawReducedMotion);

  // Parallax scroll tracking across footer viewport
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Smooth parallax translation for the background image
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-14%', '6%']
  );

  // Smooth cursor tracking coordinates inside the SVG viewBox (0 0 1200 240)
  const [isHovered, setIsHovered] = useState(false);
  const targetCoordsRef = useRef({ x: 600, y: 120 });
  const currentCoordsRef = useRef({ x: 600, y: 120 });

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 1200 / rect.width;
    const scaleY = 240 / rect.height;
    targetCoordsRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    setIsHovered(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || !e.touches[0]) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 1200 / rect.width;
    const scaleY = 240 / rect.height;
    targetCoordsRef.current = {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // RAF loop for smooth spotlight glide across SVG letters
  useEffect(() => {
    let rafId: number;
    const updateSpotlight = () => {
      const grad = gradientRef.current;
      if (grad) {
        const diffX = targetCoordsRef.current.x - currentCoordsRef.current.x;
        const diffY = targetCoordsRef.current.y - currentCoordsRef.current.y;
        currentCoordsRef.current.x += diffX * 0.32;
        currentCoordsRef.current.y += diffY * 0.32;

        grad.setAttribute('cx', currentCoordsRef.current.x.toFixed(1));
        grad.setAttribute('cy', currentCoordsRef.current.y.toFixed(1));
      }
      rafId = requestAnimationFrame(updateSpotlight);
    };

    rafId = requestAnimationFrame(updateSpotlight);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      suppressHydrationWarning
      aria-labelledby="footer-heading"
      className="relative w-full overflow-hidden bg-[#0F1F17] text-white selection:bg-[#E8F4EC] selection:text-[#177A47] pt-24 sm:pt-32 lg:pt-36"
    >
      <h2 id="footer-heading" className="sr-only">
        Navigasi Footer ELOVIA
      </h2>

      {/* =====================================================================
          1. PARALLAX SUNSET VALLEY BACKGROUND LAYER (image3_2.png)
          Full-width background image with physical depth parallax scrolling.
          ===================================================================== */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 inset-x-0 w-full h-[145%] pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <Image
          src="/images/image3_2.png"
          alt="Lembah Matahari Terbenam ELOVIA"
          fill
          priority={false}
          className="object-cover object-top filter brightness-[0.95] contrast-[1.04]"
          sizes="100vw"
        />
      </motion.div>

      {/* =====================================================================
          2. GRADIENT OVERLAYS (Light Blend Top -> Deep Ink-900 Gradient Bottom)
          ===================================================================== */}

      {/* Top transition from preceding section (Closing CTA) */}
      <div
        className="absolute top-0 inset-x-0 h-32 sm:h-40 bg-gradient-to-b from-[#F6FAF7] via-[#F6FAF7]/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Main deep bottom gradient: from pure ink-900 at bottom up to transparent */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0F1F17] via-[#0F1F17]/90 via-55% to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Radial soft emerald lighting glow behind footer content */}
      <div
        className="absolute bottom-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(23,122,71,0.22)_0%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* =====================================================================
          3. FOREGROUND CONTENT CONTAINER
          ===================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─────────────────────────────────────────────────────────────────
            BRAND EXPANSION BAND (PRD Section 4.1 & FR-LND-12)
            "ELOVIA — Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam"
            ───────────────────────────────────────────────────────────────── */}
        <div className="mb-14 sm:mb-16 pb-8 border-b border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Image
              src="/logo/ELOVIA Circular Green Value Logo.png"
              alt="ELOVIA Logo"
              width={180}
              height={60}
              className="h-12 md:h-16 w-auto object-contain mb-4"
            />
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#A9D3B8] uppercase font-jakarta">
              <Leaf className="w-3.5 h-3.5 text-[#2FA866]" />
              <span>CIRCULAR ECONOMY PLATFORM INDONESIA</span>
            </div>
            <p className="font-fraunces text-xl sm:text-2xl md:text-3xl text-white font-normal tracking-tight">
              Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-[#E8F4EC] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E3F6B5]" />
            <span>A New Value for Every Resource.</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            MAIN MULTI-COLUMN CONTENT AREA (Structured Reference Layout)
            Columns 1-3: Navigation Links with horizontal separator lines
            Column 4: Minimalist circular social media icon buttons
            Column 5: Right-aligned contact info and address
            ───────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 sm:pb-12">

          {/* ── COLUMN 1: Platform ── */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-fraunces text-lg text-white font-medium tracking-wide">
              Platform
            </h3>
            {/* Thin elegant separator line under column header */}
            <div className="w-full h-px bg-white/20" aria-hidden="true" />
            <ul className="space-y-2.5 pt-1 text-sm font-jakarta text-[#E8F4EC]/85">
              <li>
                <Link
                  href="/pindai"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Pindai Nilai Material</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pasar"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Recycle Marketplace</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/salur/baru"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Pickup &amp; Drop-off</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/impact-garden"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Impact Garden</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dompet"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>EcoWallet</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 2: Metodologi & Edukasi ── */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-fraunces text-lg text-white font-medium tracking-wide">
              Metodologi
            </h3>
            <div className="w-full h-px bg-white/20" aria-hidden="true" />
            <ul className="space-y-2.5 pt-1 text-sm font-jakarta text-[#E8F4EC]/85">
              <li>
                <Link
                  href="/metodologi"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Metodologi Nilai</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/metodologi#faktor"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>6 Faktor Penentu Harga</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/edukasi"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Panduan Pemilahan</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/material"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Katalog Mutu Material</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Circular Champions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 3: Perusahaan & Bantuan ── */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-fraunces text-lg text-white font-medium tracking-wide">
              Perusahaan
            </h3>
            <div className="w-full h-px bg-white/20" aria-hidden="true" />
            <ul className="space-y-2.5 pt-1 text-sm font-jakarta text-[#E8F4EC]/85">
              <li>
                <Link
                  href="/metodologi"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Tentang ELOVIA</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/mitra"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Portal Mitra</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Pusat Bantuan &amp; FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                >
                  <span>Syarat &amp; Ketentuan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 4: Minimalist Circular Social Media Icons ── */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-fraunces text-lg text-white font-medium tracking-wide">
              Komunitas &amp; Media
            </h3>
            <div className="w-full h-px bg-white/20" aria-hidden="true" />
            <div className="pt-2 space-y-4">
              {/* Minimalist circular border icons matching reference image style */}
              <div className="flex items-center gap-3">
                <a
                  href="mailto:halo@elovia.id"
                  aria-label="Email ELOVIA"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-[#2FA866] hover:bg-[#177A47]/30 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram ELOVIA"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-[#2FA866] hover:bg-[#177A47]/30 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn ELOVIA"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-[#2FA866] hover:bg-[#177A47]/30 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube ELOVIA"
                  className="w-10 h-10 rounded-full border border-white/35 hover:border-[#2FA866] hover:bg-[#177A47]/30 flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shadow-xs"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-[#E8F4EC]/70 font-jakarta leading-relaxed max-w-xs">
                Bergabung dalam gerakan ekonomi sirkular Indonesia. Ubah sampah terpilah menjadi nilai nyata bersama ribuan rumah tangga.
              </p>
            </div>
          </div>

          {/* ── COLUMN 5: Contact Information & Address (Far Right Aligned) ── */}
          <div className="lg:col-span-3 space-y-3 text-left lg:text-right flex flex-col items-start lg:items-end">
            <h3 className="font-fraunces text-xl text-white font-semibold tracking-wide">
              elovia.id
            </h3>
            <div className="w-full h-px bg-white/20" aria-hidden="true" />
            <div className="pt-1 space-y-2 text-sm font-jakarta text-[#E8F4EC]/85">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1.5 transition-colors duration-200"
              >
                <span>Gedung Circular Innovation Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A9D3B8]" />
              </a>

              <div className="text-xs text-[#E8F4EC]/75 leading-relaxed">
                Jl. Jenderal Sudirman Kav. 52-53, DKI Jakarta 12190
              </div>

              <div className="pt-1">
                <a
                  href="tel:+622150882026"
                  className="hover:text-white inline-flex items-center gap-1.5 font-mono text-xs text-[#E8F4EC] transition-colors duration-200"
                >
                  <span>tel.: +62 21 5088 2026</span>
                  <Phone className="w-3.5 h-3.5 text-[#2FA866]" />
                </a>
              </div>

              <div>
                <a
                  href="mailto:halo@elovia.id"
                  className="hover:text-white inline-flex items-center gap-1.5 font-mono text-xs text-[#E8F4EC] transition-colors duration-200"
                >
                  <span>email: halo@elovia.id</span>
                  <Mail className="w-3.5 h-3.5 text-[#2FA866]" />
                </a>
              </div>

              {/* Operational badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-[#E8F4EC] font-mono">
                  <Clock className="w-3 h-3 text-[#E3F6B5]" />
                  <span>Senin – Sabtu, 08:00 – 17:00 WIB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            4. MASSIVE BRAND HOVER REVEAL SHOWCASE (Pure Vector SVG Typography)
            Screen-width vector typography reading 'ELOVIA'.
            Uses SVG-native radialGradient on glyphs so hover spotlight is 100%
            confined to the letterforms — ZERO background leak, ZERO bounding box!
            ===================================================================== */}
        <div
          className="relative w-full overflow-hidden flex items-center justify-center select-none py-2 sm:py-6 md:py-8 cursor-default"
          aria-label="ELOVIA Showcase"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1200 240"
            className="w-full h-auto overflow-visible select-none max-h-[22vw]"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseLeave={handleMouseLeave}
            role="img"
            aria-label="ELOVIA"
          >
            <defs>
              {/* Dynamic mouse-following radial gradient mapped to SVG user coordinates */}
              <radialGradient
                id="eloviaSpotlightGrad"
                ref={gradientRef}
                gradientUnits="userSpaceOnUse"
                cx="600"
                cy="120"
                r="300"
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="25%" stopColor="#E3F6B5" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#2FA866" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#177A47" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0F5F37" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── LAYER A: BASE HOLLOW OUTLINE TEXT (Always visible) ── */}
            <text
              x="50%"
              y="68%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
              style={{
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.045em',
                fontSize: '235px',
              }}
            >
              ELOVIA
            </text>

            {/* ── LAYER B: REVEAL SPOTLIGHT LAYER (Only illuminates the glyphs under cursor) ── */}
            <text
              x="50%"
              y="68%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="url(#eloviaSpotlightGrad)"
              stroke="url(#eloviaSpotlightGrad)"
              strokeWidth="2"
              className="pointer-events-none transition-opacity duration-300"
              style={{
                fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.045em',
                fontSize: '235px',
                opacity: isHovered ? 1 : 0,
              }}
            >
              ELOVIA
            </text>
          </svg>
        </div>

        {/* =====================================================================
            5. REPOSITIONED MINIMALIST LEGAL INFO BOTTOM BAR
            Directly below the giant 'ELOVIA' text, separated by thin line (white/10)
            Left: Copyright | Right: Privacy Policy, Terms & Conditions, Licenses
            ===================================================================== */}
        <div className="w-full border-t border-white/10 py-6 sm:py-8 mt-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/50 font-jakarta">

            {/* Left: Copyright */}
            <div className="text-center sm:text-left">
              &copy; 2026 ELOVIA. All rights reserved.
            </div>

            {/* Right: Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 text-xs sm:text-sm">
              <Link
                href="/coming-soon"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/coming-soon"
                className="hover:text-white transition-colors duration-200"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/coming-soon"
                className="hover:text-white transition-colors duration-200"
              >
                Licenses
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
