'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Compass, CheckCircle2 } from 'lucide-react';

interface GuideItem {
  number: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  highlight: string;
}

const GUIDES: GuideItem[] = [
  {
    number: '01',
    icon: MapPin,
    title: 'Titik GPS Akurat',
    description:
      'Pastikan pin lokasi berada tepat di titik temu penjemputan agar armada mitra langsung menuju gerbang atau lobi tanpa tersesat.',
    highlight: 'Akurasi Radius 5 Meter',
  },
  {
    number: '02',
    icon: Phone,
    title: 'Nomor WhatsApp Aktif',
    description:
      'Gunakan nomor yang aktif WhatsApp agar kurir dapat berkoordinasi langsung saat tiba di lokasi atau mengonfirmasi waktu pickup.',
    highlight: 'Koordinasi Real-time',
  },
  {
    number: '03',
    icon: Compass,
    title: 'Patokan yang Jelas',
    description:
      'Tambahkan informasi spesifik seperti warna pagar, nomor rumah, nama gedung, dekat pohon tertentu, atau petunjuk pos satpam.',
    highlight: 'Mempercepat Akses Armada',
  },
];

export function PickupLocationGuideSection() {
  return (
    <section className="mt-20 mb-16">
      {/* ── Section Header ── */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-emerald-700 text-[11px] font-bold tracking-widest uppercase mb-3 shadow-2xs">
          <CheckCircle2 size={12} className="text-emerald-600" />
          PANDUAN PENJEMPUTAN PRIMA
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Perfect Pickup, Every Time.
        </h2>
        <p className="text-sm text-slate-600 mt-2 font-normal leading-relaxed">
          Pastikan armada mitra ELOVIA dapat menemukan titik penjemputanmu secara cepat dan efisien.
        </p>
      </div>

      {/* ── 3 Compact Informational Editorial Cards (True Frosted Glass) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_20px_40px_rgba(0,100,50,0.08)] hover:-translate-y-1 hover:border-emerald-200/60 transition-all duration-300 p-7 flex flex-col justify-between overflow-hidden group"
            >
              {/* Large Subtle Watermark Number */}
              <span
                className="absolute -top-4 -right-3 text-7xl font-mono font-black text-slate-200/50 select-none pointer-events-none group-hover:text-emerald-200/50 transition-colors"
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 text-emerald-600 flex items-center justify-center shadow-xs mb-6 group-hover:scale-105 transition-transform">
                  <Icon size={22} className="stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="relative z-10 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
                  Standar Mutu
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[11px] font-semibold text-emerald-700 shadow-2xs">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
