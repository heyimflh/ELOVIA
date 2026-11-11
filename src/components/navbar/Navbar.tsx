'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '@/lib/cart-store';

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const NAV_LINKS: NavItem[] = [
  {
    label: 'Pindai Nilai',
    href: '/pindai',
    description: 'Estimasi nilai material bekas seketika',
  },
  {
    label: 'Marketplace',
    href: '/pasar',
    description: 'Direktori mitra & harga acuan terverifikasi',
  },
  {
    label: 'Metodologi',
    href: '/metodologi',
    description: 'Formula 6 faktor penentu harga & transparansi',
  },
  {
    label: 'Impact Garden',
    href: '/impact-garden',
    description: 'Visualisasi dampak ekologis dan reduksi karbon',
  },
  {
    label: 'Edukasi',
    href: '/edukasi',
    description: 'Panduan pemilahan 6 kategori standar SNI',
  },
];

export function Navbar() {
  const rawPathname = usePathname();
  const pathname = rawPathname || '';
  const { itemCount } = useCart();
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDelta = useRef(0);

  // Dedicated Partner Portal & Auth pages have their own custom Top Header & Command Center
  const isMitraPortal = pathname.startsWith('/mitra');
  const isAuthPage = pathname === '/masuk' || pathname === '/daftar';

  // Automatically style as floating glass pill on light background pages like /keranjang, /metodologi, or /dampak
  const isLightPage = Boolean(
    pathname.startsWith('/keranjang') ||
    pathname.startsWith('/metodologi') ||
    pathname.startsWith('/akun') ||
    pathname.startsWith('/material') ||
    pathname.startsWith('/dampak') ||
    pathname.startsWith('/impact-garden') ||
    pathname.startsWith('/coming-soon')
  );
  const effectiveScrolled = (mounted && isScrolled) || isLightPage;

  const mobileMenuOpenRef = useRef(mobileMenuOpen);
  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  // Sync scroll position & track scroll direction safely inside useEffect (after mount)
  useEffect(() => {
    setMounted(true);
    const currentY = window.scrollY;
    if (currentY > 60) {
      setIsScrolled(true);
    }
    lastScrollY.current = currentY;

    // Smooth Headroom scroll direction tracking with jitter filtering
    const unsubscribe = scrollY.on('change', (latest) => {
      const previous = lastScrollY.current;
      const diff = latest - previous;

      // 1. Hero vs Scrolled Floating Pill state
      // When within top 60px: ALWAYS Hero design (full-width transparent, white text)
      if (latest <= 60) {
        setIsScrolled(false);
        setHidden(false);
        lastScrollY.current = latest;
        scrollDelta.current = 0;
        return;
      }

      // Past 60px: transform into floating glassmorphism pill
      setIsScrolled(true);

      // Keep visible if mobile menu is active
      if (mobileMenuOpenRef.current) {
        setHidden(false);
        lastScrollY.current = latest;
        return;
      }

      // Accumulate scroll delta in the same direction to filter micro-jitters
      if ((diff > 0 && scrollDelta.current < 0) || (diff < 0 && scrollDelta.current > 0)) {
        scrollDelta.current = 0;
      }
      scrollDelta.current += diff;

      // 2. Smooth Headroom hide & show with directional hysteresis
      // Only hide when scrolling DOWN with meaningful movement (> 22px accumulated)
      if (latest > 120 && scrollDelta.current > 22) {
        setHidden(true);
      }
      // Only show when scrolling UP with intentional movement (< -14px accumulated)
      else if (scrollDelta.current < -14) {
        setHidden(false);
      }

      lastScrollY.current = latest;
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setHidden(false);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Don't render consumer navbar on Mitra Portal or Auth pages (Login/Register)
  if (isMitraPortal || isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Outer Floating Wrapper: Animates in/out with ultra-smooth spring physics */}
      <motion.header
        suppressHydrationWarning
        variants={{
          visible: {
            y: 0,
            opacity: 1,
            scale: 1,
          },
          hidden: {
            y: -100,
            opacity: 0,
            scale: 0.98,
          },
        }}
        initial="visible"
        animate={hidden && !mobileMenuOpen ? 'hidden' : 'visible'}
        transition={{
          y: {
            type: 'spring',
            stiffness: 240,
            damping: 26,
            mass: 0.8,
          },
          opacity: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          },
          scale: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none transition-[top,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          effectiveScrolled
            ? 'top-3 sm:top-4 px-3 sm:px-6'
            : 'top-0 px-6 sm:px-10 lg:px-16 pt-5 sm:pt-7'
        }`}
      >
        {/* Dynamic Morphing Container:
            - At Hero: Full-width transparent with pure white text (matches reference image)
            - Scrolled: Floating pill with frosted glassmorphism & dark ink-900 typography
        */}
        <div
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            effectiveScrolled
              ? 'w-full max-w-5xl xl:max-w-6xl rounded-full bg-white/80 dark:bg-white/85 backdrop-blur-md border border-[#D3EBDB]/80 shadow-[0_8px_32px_rgba(15,31,23,0.08)] px-5 sm:px-6 py-2.5 sm:py-3 gap-4 sm:gap-8'
              : 'w-full max-w-7xl rounded-full bg-transparent border border-transparent shadow-none px-0 py-1'
          }`}
        >
          {/* Left: Brand Logo (Fraunces + Circular Loop Symbol) */}
          <Link
            href="/"
            className="group flex items-center outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] rounded-full transition-transform duration-200 hover:scale-[1.02]"
            aria-label="ELOVIA Beranda"
          >
            {/* Desktop Brand Logo (md screens and above) */}
            <Image
              src="/logo/ELOVIA Circular Green Value Logo.png"
              alt="ELOVIA Logo"
              width={140}
              height={40}
              className="hidden md:block h-8 md:h-10 w-auto object-contain"
              priority
            />
            {/* Mobile Brand Emblem (< md screens) */}
            <Image
              src="/logo/Minimalist Green Leaf Emblem.png"
              alt="ELOVIA Logo"
              width={32}
              height={32}
              className="block md:hidden h-8 w-8 object-contain"
              priority
            />
          </Link>

          {/* Center: Desktop Navigation Links (Floating Smart Pill Navbar) */}
          <nav
            aria-label="Navigasi Utama"
            className={`hidden lg:flex items-center gap-1 xl:gap-1.5 transition-all duration-300 ${
              effectiveScrolled
                ? ''
                : 'bg-black/35 backdrop-blur-md border border-white/20 px-2 py-1 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)]'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 group font-jakarta outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] rounded-full ${
                    effectiveScrolled
                      ? isActive
                        ? 'bg-[#E8F4EC] text-[#177A47] font-semibold'
                        : 'text-[#4A5D52] hover:text-[#0F1F17] hover:bg-[#E8F4EC]/60'
                      : isActive
                        ? 'bg-white/25 text-white font-semibold shadow-xs border border-white/30'
                        : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  <span>{link.label}</span>

                  {/* Subtle active / hover indicator dot or bar (toggled via CSS to prevent DOM hydration mismatches) */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className={`w-1 h-1 rounded-full bg-[#A7F3D0] ml-1.5 align-middle transition-opacity duration-300 ${
                        effectiveScrolled ? 'hidden' : 'inline-block'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Cart Badge + CTA Masuk + Mobile Hamburger Trigger) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Minimalist Cart Icon with Dynamic Notification Badge */}
            <Link
              href="/keranjang"
              aria-label={`Keranjang Material (${itemCount} item)`}
              className={`relative p-2 rounded-full transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] group ${
                effectiveScrolled
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-[#E8F4EC]/70'
                  : 'text-white hover:text-white hover:bg-white/15 drop-shadow-sm'
              }`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />

              {/* Dynamic Notification Badge */}
              {itemCount > 0 && (
                <span
                  suppressHydrationWarning
                  className={`absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-300 shadow-xs ${
                    effectiveScrolled
                      ? 'bg-[#177A47] text-white ring-2 ring-white'
                      : 'bg-[#177A47] text-white ring-2 ring-black/40'
                  }`}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Primary CTA: 'Masuk' (Pill-shaped, solid emerald on light/scrolled, glass at dark hero) */}
            <Link
              href="/masuk"
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                effectiveScrolled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25 hover:shadow-lg'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md hover:border-white/40 drop-shadow-sm'
              }`}
            >
              Masuk
            </Link>

            {/* Mobile Hamburger Menu Toggle (< lg) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] ${
                effectiveScrolled
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-[#E8F4EC]'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Glassmorphism Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#0B1710]/98 backdrop-blur-2xl text-white flex flex-col justify-between p-5 sm:p-8 pt-5 pb-8 overflow-y-auto"
            aria-label="Menu Navigasi Mobile"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
                aria-label="ELOVIA Beranda"
              >
                <Image
                  src="/logo/ELOVIA Circular Green Value Logo.png"
                  alt="ELOVIA Logo"
                  width={140}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#177A47]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Staggered Entrance */}
            <div className="flex flex-col gap-2 my-auto py-6">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A9D3B8] px-2 mb-1">
                Navigasi Utama
              </span>

              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * (idx + 1), duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-3.5 px-4 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all border border-transparent hover:border-white/10"
                  >
                    <div>
                      <span className="font-fraunces text-2xl font-semibold tracking-tight text-white group-hover:text-[#A7F3D0] transition-colors block leading-tight">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="text-xs text-[#E8F4EC]/65 group-hover:text-[#E8F4EC]/90 transition-colors mt-0.5 block">
                          {link.description}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#A9D3B8] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Actions & User Quick-Launch */}
            <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
              {/* Quick Cart Pill */}
              <Link
                href="/keranjang"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#177A47]/40 text-[#A7F3D0] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Keranjang Material</p>
                    <p className="text-[11px] text-[#E8F4EC]/65">2 item tersimpan</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#177A47] text-white">
                  Buka
                </span>
              </Link>

              {/* Primary Masuk Action */}
              <Link
                href="/masuk"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#177A47] hover:bg-[#2FA866] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
              >
                <span>Masuk ke Akun ELOVIA</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Brand Expansion / Footer Microcopy */}
              <p className="text-[11px] text-center text-[#E8F4EC]/50 font-jakarta leading-relaxed pt-1">
                Ekosistem Limbah untuk Olah, Value, Inovasi, dan Alam.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
