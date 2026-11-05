'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  Star,
  CheckCircle2,
  Clock,
  Phone,
  Truck,
  Building2,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import type { DeliveryMethod } from './types';

interface FleetPartnerInfoCardProps {
  initialMethod?: DeliveryMethod;
  onMethodChange?: (method: DeliveryMethod) => void;
  orderId?: string;
}

// Crisp inline WhatsApp SVG icon
function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" fill="none" />
      <path
        d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
        fill="currentColor"
      />
    </svg>
  );
}

export function FleetPartnerInfoCard({
  initialMethod = 'pickup',
  onMethodChange,
  orderId = 'ORD-ELV-20261104-089',
}: FleetPartnerInfoCardProps) {
  const [method, setMethod] = useState<DeliveryMethod>(initialMethod);

  const handleToggle = (newMethod: DeliveryMethod) => {
    setMethod(newMethod);
    onMethodChange?.(newMethod);
  };

  const whatsappMessage = encodeURIComponent(
    `Halo Mas Budi Pratama (Driver ELOVIA), saya pemilik pesanan ${orderId} untuk penjemputan material sirkular hari ini.`
  );
  const whatsappUrl = `https://wa.me/6281234567890?text=${whatsappMessage}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=-7.6698,109.6521`;

  return (
    <div
      className="w-full bg-white/5 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-6 md:p-8 transform-gpu backface-hidden shadow-2xl relative overflow-hidden flex flex-col gap-6"
      suppressHydrationWarning
    >
      {/* Top Bar with Mode Switcher Pills for Instant Testing */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider font-jakarta">
            Informasi Serah Terima &amp; Logistik
          </span>
        </div>

        {/* Pickup vs Drop-off Toggle Selector */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/15 p-1 rounded-2xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleToggle('pickup')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              method === 'pickup'
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Jemput Mitra (Pickup)</span>
          </button>
          <button
            type="button"
            onClick={() => handleToggle('dropoff')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              method === 'dropoff'
                ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Antar Sendiri (Drop-off)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {method === 'pickup' ? (
          /* ========================================================= */
          /* IF PICKUP STATE                                           */
          /* ========================================================= */
          <motion.div
            key="pickup-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full"
          >
            {/* Left: Driver Identity & Details */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Driver Avatar Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-white/30 shadow-lg shrink-0 border border-white/20 bg-green-950">
                <Image
                  src="/images/liveTracking/driver-budi.jpg"
                  alt="Driver Budi Pratama"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-[#0a150f]" />
              </div>

              {/* Driver Meta */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-jakarta">
                    Budi Pratama
                  </h3>
                  {/* Verified Badge */}
                  <span className="bg-green-500/20 border border-green-400/40 text-green-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    <span>Driver Resmi ELOVIA</span>
                  </span>
                </div>

                {/* Rating & Performance Subtext */}
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>4.9</span>
                  </span>
                  <span>•</span>
                  <span>142 Penjemputan Terverifikasi</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline font-mono text-white/50">ID: ELV-DRV-042</span>
                </div>

                {/* Vehicle Badge */}
                <div className="mt-1">
                  <div className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl text-white/90 text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-inner">
                    <span>🚚 Pickup L300 • AA 8921 K</span>
                    <span className="text-white/40">|</span>
                    <span className="text-green-300 text-xs">Kapasitas 1.2 Ton</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Hubungi Driver via WhatsApp</span>
              </a>
            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* IF DROP-OFF STATE                                         */
          /* ========================================================= */
          <motion.div
            key="dropoff-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full"
          >
            {/* Left: Partner Facility Profile */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Facility Avatar */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-white/30 shadow-lg shrink-0 border border-white/20 bg-emerald-950">
                <Image
                  src="/images/Marketplace/Modern Recycling Facility2.jpeg"
                  alt="Bank Sampah Resik Kebumen"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Facility Meta */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-jakarta">
                    Bank Sampah Resik Kebumen
                  </h3>
                  {/* Operational Hours badge */}
                  <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>08.00 - 16.00 WIB</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/70">
                  <MapPin className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  <span>Jl. Pemuda No. 45, Panjer, Kebumen (1.8 km)</span>
                </div>

                <div className="mt-1">
                  <div className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl text-white/90 text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
                    <span>🏢 Loket Drop-Off 01 • Penerimaan Material Langsung</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink-900 hover:bg-black text-white border border-white/20 font-bold px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 text-sm sm:text-base shadow-xl cursor-pointer"
              >
                <Navigation className="w-5 h-5 text-green-400" />
                <span>Buka Navigasi Google Maps</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

