'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck } from 'lucide-react';

export function PickupReadinessBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative rounded-[2.5rem] bg-gradient-to-r from-[#123D2F] via-[#154636] to-[#0D3024] text-white p-8 sm:p-10 md:p-12 overflow-hidden shadow-[0_20px_50px_rgba(4,47,46,0.18)] hover:shadow-[0_25px_60px_rgba(4,47,46,0.25)] transition-shadow duration-500 border border-white/10 mb-16"
    >
      {/* ── Ambient Radial Glows & Sheen ── */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 left-1/3 w-96 h-96 bg-teal-300/15 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative leaf logo watermark */}
      <div className="absolute right-6 -bottom-6 w-56 h-56 opacity-5 pointer-events-none">
        <Image
          src="/logo/Minimalist Green Leaf Emblem.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 lg:gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-[11px] font-bold tracking-widest uppercase mb-3 shadow-2xs">
            <Truck size={12} className="text-emerald-400" />
            <span>SIAP DIJEMPUT KAPAN SAJA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
            Ready for Your Next Green Impact?
          </h2>

          <p className="text-sm md:text-base text-white/80 font-light mt-2.5 leading-relaxed">
            Alamat penjemputan yang lengkap membantu proses penyaluran sampah menjadi lebih mudah,
            cepat, dan terkoordinasi langsung dengan armada mitra terdekat.
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <Link
            href="/salur/baru"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm md:text-base shadow-[0_12px_28px_rgba(18,184,134,0.35)] hover:shadow-[0_16px_36px_rgba(18,184,134,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Mulai Penyaluran</span>
            <ArrowRight size={18} className="stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

