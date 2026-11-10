'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Droplets,
  Scissors,
  Minimize2,
  Check,
  PackageCheck,
  ShieldCheck,
  Scale,
  Leaf,
  Info,
} from 'lucide-react';
import { CatalogMaterial } from './catalogData';
import { cartActions } from '@/lib/cart-store';

interface MaterialPrepDrawerProps {
  material: CatalogMaterial | null;
  onClose: () => void;
  onItemAdded?: (material: CatalogMaterial) => void;
}

export function MaterialPrepDrawer({
  material,
  onClose,
  onItemAdded,
}: MaterialPrepDrawerProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [estimatedKg, setEstimatedKg] = useState<number>(5);

  // Reset state when material changes
  useEffect(() => {
    setIsAdded(false);
    setEstimatedKg(5);
  }, [material]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!material) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [material, onClose]);

  if (!material) return null;

  const handleAddToCart = () => {
    // Add item to cart store
    cartActions.addItem({
      id: `cart-${material.id}-${Date.now()}`,
      materialId: material.id,
      name: material.name,
      category: material.category,
      tag: material.tag,
      weightKg: estimatedKg,
      qualityGrade: 'Bersih & Terpilah 1.0x',
      qualityMultiplier: 1.0,
      minPricePerKg: material.minPrice,
      maxPricePerKg: material.maxPrice,
      totalMinPrice: Math.round(estimatedKg * material.minPrice),
      totalMaxPrice: Math.round(estimatedKg * material.maxPrice),
      co2ePerKg: material.co2ePerKg,
      totalCo2e: Number((estimatedKg * material.co2ePerKg).toFixed(1)),
      image: material.image,
      icon: '♻️',
      color: '#10B981',
      badge: material.categoryCode,
    });

    setIsAdded(true);
    if (onItemAdded) {
      onItemAdded(material);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop Overlay with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity cursor-pointer"
          aria-hidden="true"
        />

        {/* Slide-Over Drawer Container */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="prep-guide-title"
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border-l border-white/80 shadow-2xl h-full flex flex-col z-10 overflow-hidden"
        >
          {/* Ambient Glow in Drawer */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-300/20 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-teal-200/25 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Drawer Header */}
          <div className="p-6 sm:p-7 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl flex items-start justify-between gap-4 sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {material.category}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {material.categoryCode}
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <TrendingUp size={12} /> {material.trend.text}
                </span>
              </div>
              <h2
                id="prep-guide-title"
                className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-jakarta"
              >
                {material.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Panduan Preparasi Standar Pabrik & Agregator ELOVIA
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
              aria-label="Tutup panduan preparasi"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 text-slate-800">
            {/* Quick Material Snapshot Card */}
            <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-100/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white shadow-md bg-white">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                    Estimasi Nilai Pasar
                  </span>
                  <p className="text-lg sm:text-xl font-mono font-bold text-emerald-900">
                    {material.priceRange}
                  </p>
                  <p className="text-xs text-emerald-700/80 mt-0.5">
                    Tersertifikasi verifikasi timbangan presisi
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-emerald-200/60">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-800 font-semibold bg-white/80 px-2.5 py-1 rounded-full shadow-xs">
                  <Leaf size={13} className="text-emerald-600" />
                  ~{material.co2ePerKg} kg CO₂e / kg
                </span>
                <span className="text-[11px] text-emerald-600/90 mt-1">
                  Demand: {material.specs.typicalDemand}
                </span>
              </div>
            </div>

            {/* 3 Step-by-Step Illustrated Checklist (PRD Spec) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-600" />
                  3 Langkah Preparasi Sederhana
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  Standar SNI & PRD
                </span>
              </div>

              <div className="space-y-4">
                {/* Step 1: Buang Sisa Cairan */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all duration-300 relative group">
                  <div className="flex items-start gap-4">
                    {/* Visual Graphic Badge 01 */}
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-700 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Droplets size={20} className="text-cyan-600" />
                      <span className="text-[10px] font-bold font-mono">01</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-slate-900">
                          {material.prepSteps[0]?.title || 'Buang Sisa Cairan'}
                        </h4>
                        <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full">
                          {material.prepSteps[0]?.badge || '100% Kering'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                        {material.prepSteps[0]?.description ||
                          'Pastikan botol/kemasan benar-benar kosong dari sisa air atau minuman.'}
                      </p>
                      <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                        <Info size={14} className="text-cyan-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tips Praktis:</strong> {material.prepSteps[0]?.tip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Lepas Label & Tutup */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all duration-300 relative group">
                  <div className="flex items-start gap-4">
                    {/* Visual Graphic Badge 02 */}
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Scissors size={20} className="text-amber-600" />
                      <span className="text-[10px] font-bold font-mono">02</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-slate-900">
                          {material.prepSteps[1]?.title || 'Lepas Label & Tutup'}
                        </h4>
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          {material.prepSteps[1]?.badge || 'Pemisahan Polimer'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                        {material.prepSteps[1]?.description ||
                          'Pisahkan tutup botol plastik atau label kertas luar jika diperlukan.'}
                      </p>
                      <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                        <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tips Praktis:</strong> {material.prepSteps[1]?.tip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Remukkan / Pipihkan */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all duration-300 relative group">
                  <div className="flex items-start gap-4">
                    {/* Visual Graphic Badge 03 */}
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex flex-col items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Minimize2 size={20} className="text-emerald-600" />
                      <span className="text-[10px] font-bold font-mono">03</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="text-base font-bold text-slate-900">
                          {material.prepSteps[2]?.title || 'Remukkan / Pipihkan'}
                        </h4>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {material.prepSteps[2]?.badge || 'Hemat Ruang'}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                        {material.prepSteps[2]?.description ||
                          'Tekan atau pipihkan material untuk menghemat ruang penyimpanan saat dijemput armada.'}
                      </p>
                      <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                        <Info size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>
                          <strong>Tips Praktis:</strong> {material.prepSteps[2]?.tip}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Do's and Don'ts Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Do Checklist */}
              <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-200/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2.5">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  Direkomendasikan (Do)
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {material.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don't Checklist */}
              <div className="p-4 rounded-3xl bg-rose-50/50 border border-rose-200/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider mb-2.5">
                  <AlertTriangle size={15} className="text-rose-600" />
                  Hindari (Don&apos;t)
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {material.donts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <X size={13} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weight Input Estimator */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Perkiraan Berat Anda Saat Ini
                </p>
                <p className="text-[11px] text-slate-500">
                  Bisa disesuaikan kembali saat kurir menimbang di lokasi
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={estimatedKg}
                  onChange={(e) => setEstimatedKg(Math.max(1, Number(e.target.value) || 1))}
                  className="w-18 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-center font-mono font-bold text-slate-900 text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-600">kg</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-slate-200/80 bg-white/90 backdrop-blur-xl flex flex-col gap-3">
            {!isAdded ? (
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <PackageCheck size={20} />
                <span>Paham, Masukkan ke Daftar Penyaluran</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold">
                        Berhasil masuk daftar penyaluran!
                      </p>
                      <p className="text-[11px] text-emerald-800">
                        {estimatedKg} kg {material.name} tersimpan di keranjang.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-900">
                    Rp {(estimatedKg * material.minPrice).toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
                  >
                    Lanjut Eksplorasi
                  </button>
                  <Link
                    href="/salur/baru"
                    className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm text-center"
                  >
                    <span>Lanjut Penyaluran</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}

            <p className="text-[11px] text-center text-slate-400">
              ELOVIA menjamin transparansi harga bersama mitra bank sampah & agregator berizin.
            </p>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}

