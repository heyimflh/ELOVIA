'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, ChevronRight, Layers } from 'lucide-react';

export interface SlideItem {
  id: string;
  image: string;
  facilityName: string;
  location: string;
  materials: string[];
  partnerId: string;
  coordinates: { lng: number; lat: number };
}

export const SLIDESHOW_DATA: SlideItem[] = [
  {
    id: 's-1',
    image: '/images/Marketplace/Aerial Recycling Plant.jpeg',
    facilityName: 'Bank Sampah Resik Kebumen',
    location: 'Kebumen, Jawa Tengah',
    materials: ['Kertas', 'Plastik', 'Logam'],
    partnerId: 'p-1',
    coordinates: { lng: 109.6520, lat: -7.6698 },
  },
  {
    id: 's-2',
    image: '/images/Marketplace/Modern Recycling Facility2.jpeg',
    facilityName: 'Pusat Daur Ulang EcoBali',
    location: 'Denpasar, Bali',
    materials: ['Botol PET', 'Kemasan Industri'],
    partnerId: 'p-2',
    coordinates: { lng: 115.2166, lat: -8.6705 },
  },
  {
    id: 's-3',
    image: '/images/Marketplace/White Industrial Building with Tropical Plants.avif',
    facilityName: 'Agregator Plastik Sejahtera',
    location: 'Pasar Minggu, Jakarta Selatan',
    materials: ['HDPE', 'PP Cup', 'Aluminium'],
    partnerId: 'p-3',
    coordinates: { lng: 106.8436, lat: -6.2842 },
  },
  {
    id: 's-4',
    image: '/images/Marketplace/Modern Recycling Facility.jpeg',
    facilityName: 'Bank Sampah Berkah Mandiri',
    location: 'Dago, Bandung, Jawa Barat',
    materials: ['Kertas HVS', 'Kardus'],
    partnerId: 'p-4',
    coordinates: { lng: 107.6191, lat: -6.9175 },
  },
];

interface FacilitySlideshowProps {
  onSelectSlide?: (slide: SlideItem) => void;
  className?: string;
}

export function FacilitySlideshow({ onSelectSlide, className = '' }: FacilitySlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slideshow every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_DATA.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = SLIDESHOW_DATA[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onSelectSlide?.(currentSlide)}
      className={`relative w-full h-full select-none cursor-pointer group overflow-hidden rounded-2xl ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 rounded-2xl overflow-hidden"
        >
          {/* Background Facility Image */}
          <img
            src={currentSlide.image}
            alt={currentSlide.facilityName}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />

          {/* Deep Aesthetic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 rounded-2xl" />
        </motion.div>
      </AnimatePresence>

      {/* Top Floating Badge Strip */}
      <div className="absolute top-2.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-mono font-bold text-white tracking-wider uppercase shadow-xs">
          <Sparkles className="w-3 h-3 text-[#E3F6B5]" />
          <span>Sentra Unggulan</span>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-mono text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Aktif</span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-2.5 left-3.5 right-3.5 z-10 space-y-1">
        <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-mono font-medium truncate">
          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">{currentSlide.location}</span>
        </div>

        <div className="flex items-end justify-between gap-2 min-w-0">
          <div className="min-w-0 flex-1">
            <h4 className="font-fraunces font-bold text-xs sm:text-sm text-white tracking-tight leading-snug drop-shadow-sm truncate">
              {currentSlide.facilityName}
            </h4>

            {/* Material tags */}
            <div className="flex items-center gap-1 mt-1 overflow-hidden">
              {currentSlide.materials.slice(0, 3).map((mat, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-[9px] text-white/90 font-jakarta font-medium border border-white/10 truncate"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Mini explore CTA button */}
          <div className="shrink-0 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-green-600 transition-colors shadow-xs">
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1 pt-0.5">
          {SLIDESHOW_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`Lihat fasilitas ${slide.facilityName}`}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

