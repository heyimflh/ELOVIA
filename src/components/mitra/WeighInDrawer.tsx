'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Scale,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  ArrowRight,
  Info,
  Check,
  FileCheck,
} from 'lucide-react';
import { WasteQualityGrade, WeighInMaterialItem, WeighInTicketData } from './types';
import { useMitra } from './MitraContext';

interface WeighInDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  ticket?: WeighInTicketData;
  onComplete?: (ticketId: string, finalTotal: number) => void;
}

// Multipliers for quality grade based on SNI standards
const QUALITY_MULTIPLIERS: Record<WasteQualityGrade, number> = {
  A: 1.0,
  B: 0.85,
  C: 0.7,
};

// Format IDR currency
function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  return `Rp ${rounded.toLocaleString('id-ID')}`;
}

export function WeighInDrawer({
  isOpen,
  onClose,
  ticket,
  onComplete,
}: WeighInDrawerProps) {
  const { addToast } = useMitra();

  // Fallback ticket data if none provided
  const activeTicket: WeighInTicketData = useMemo(() => {
    if (ticket && ticket.materials && ticket.materials.length > 0) {
      return ticket;
    }
    return {
      ticketId: 'REQ-ELV-2481',
      customerName: 'Budi Santoso',
      customerAvatar: 'BS',
      location: 'Jl. Ir. H. Juanda No. 120, Coblong',
      method: 'pickup',
      materials: [
        {
          id: 'mat-kardus',
          name: 'Kardus Cokelat',
          estimatedWeight: 14.5,
          actualWeight: 14.5,
          basePricePerKg: 2000,
          quality: 'A',
        },
        {
          id: 'mat-pet',
          name: 'Botol PET Bening',
          estimatedWeight: 4.0,
          actualWeight: 4.0,
          basePricePerKg: 3250,
          quality: 'A',
        },
      ],
    };
  }, [ticket]);

  // Local state for material inputs: weights & qualities
  const [materialsState, setMaterialsState] = useState<WeighInMaterialItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qualityNote, setQualityNote] = useState('');

  // Sync internal state whenever activeTicket changes or drawer opens
  useEffect(() => {
    if (isOpen) {
      setMaterialsState(
        activeTicket.materials.map((m) => ({
          ...m,
          actualWeight: m.actualWeight || m.estimatedWeight || 0,
          quality: m.quality || 'A',
        }))
      );
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen, activeTicket]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Update actual weight of an item
  const handleWeightChange = (materialId: string, rawVal: string) => {
    const val = parseFloat(rawVal);
    setMaterialsState((prev) =>
      prev.map((item) =>
        item.id === materialId
          ? {
              ...item,
              actualWeight: isNaN(val) || val < 0 ? 0 : val,
            }
          : item
      )
    );
  };

  // Update quality grade of an item
  const handleQualityChange = (materialId: string, quality: WasteQualityGrade) => {
    setMaterialsState((prev) =>
      prev.map((item) =>
        item.id === materialId
          ? {
              ...item,
              quality,
            }
          : item
      )
    );
  };

  // Calculate live price per item: weight * basePrice * qualityMultiplier
  const calculateItemPrice = (item: WeighInMaterialItem): number => {
    const multiplier = QUALITY_MULTIPLIERS[item.quality] || 1.0;
    return Math.round(item.actualWeight * item.basePricePerKg * multiplier);
  };

  // Calculate total price of all items
  const totalValue = useMemo(() => {
    return materialsState.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  }, [materialsState]);

  // Handle final ledger commitment
  const handleSubmitLedger = async () => {
    if (isSubmitting || totalValue <= 0) return;

    setIsSubmitting(true);

    try {
      // Simulate realistic cryptographic ledger signing latency
      await new Promise((resolve) => setTimeout(resolve, 850));

      setIsSuccess(true);

      // Dispatch real toast to mitra
      addToast({
        title: 'Timbangan Terverifikasi & Ledger ELOVIA Tercatat!',
        description: `Penyaluran ${activeTicket.ticketId} (${activeTicket.customerName}) senilai ${formatRupiah(
          totalValue
        )} berhasil dicatat ke Ledger ELOVIA. Saldo warga telah dikreditkan.`,
        type: 'success',
      });

      onComplete?.(activeTicket.ticketId, totalValue);

      // Gracefully close after celebration
      setTimeout(() => {
        onClose();
      }, 700);
    } catch {
      addToast({
        title: 'Gagal Mencatat ke Ledger',
        description: 'Terjadi kendala saat menandatangani transaksi ledger. Coba lagi.',
        type: 'error',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-jakarta">
          {/* ── BACKDROP ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              if (!isSubmitting) onClose();
            }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
          />

          {/* ── DRAWER PANEL (Slide in from right) ── */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] lg:w-[600px] bg-white/95 backdrop-blur-2xl border-l border-white/60 shadow-[0_40px_80px_rgba(0,0,0,0.15)] z-50 flex flex-col"
          >
            {/* ── DRAWER HEADER ── */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-white/50 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <Scale size={18} className="stroke-[2.2]" />
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Verifikasi Timbangan Akhir
                  </h2>
                </div>
                <p className="text-sm text-slate-500 font-mono mt-1">
                  {activeTicket.ticketId} • {activeTicket.customerName}
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="hover:bg-slate-100 rounded-full p-2 transition text-slate-400 hover:text-slate-700 cursor-pointer disabled:opacity-40"
                aria-label="Tutup panel"
              >
                <X size={20} />
              </button>
            </div>

            {/* ── METROLOGI & SNI BADGE STRIP ── */}
            <div className="px-6 py-2.5 bg-emerald-50/60 border-b border-emerald-100/70 flex items-center justify-between text-xs text-emerald-800 shrink-0">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Standar SNI 19-3964-1994 Terverifikasi</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                Tera Metrologi Legal
              </span>
            </div>

            {/* ── MAIN SCROLLABLE CONTENT (THE WEIGH-IN FORM) ── */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
              {/* Context Hint */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-3">
                <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Masukkan bobot timbangan aktual dan tentukan grade kualitas fisik material.
                  Kalkulasi nilai saldo dilakukan secara otomatis dan akan langsung dikreditkan
                  ke <strong>Dompet Sirkular ELOVIA</strong> warga saat dicatat ke ledger.
                </p>
              </div>

              {/* Per-Material Cards */}
              <div className="flex flex-col gap-6">
                {materialsState.map((item, index) => {
                  const calculatedPrice = calculateItemPrice(item);
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 relative transition-all duration-200 hover:border-slate-200"
                    >
                      {/* Material Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                            {index === 0 ? (
                              <Package size={16} className="text-amber-600" />
                            ) : (
                              <Layers size={16} className="text-teal-600" />
                            )}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-slate-900 leading-tight">
                              {item.name} • Est. {item.estimatedWeight.toFixed(1)} kg
                            </h3>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              Harga dasar: {formatRupiah(item.basePricePerKg)}/kg (Kualitas A)
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 uppercase">
                          Item #{index + 1}
                        </span>
                      </div>

                      {/* Inputs Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Input 1: Berat Aktual */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Berat Aktual
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={item.actualWeight === 0 ? '' : item.actualWeight}
                              onChange={(e) => handleWeightChange(item.id, e.target.value)}
                              placeholder="0.0"
                              className="text-3xl font-mono font-bold text-slate-900 bg-white border border-slate-200 rounded-xl p-4 w-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition pr-16 shadow-2xs"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl pointer-events-none select-none">
                              kg
                            </span>
                          </div>
                        </div>

                        {/* Input 2: Kualitas Akhir (Segmented Control) */}
                        <div className="flex flex-col">
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Kualitas Akhir
                          </label>
                          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 h-full items-center">
                            {(['A', 'B', 'C'] as WasteQualityGrade[]).map((grade) => {
                              const isActive = item.quality === grade;
                              return (
                                <button
                                  key={grade}
                                  type="button"
                                  onClick={() => handleQualityChange(item.id, grade)}
                                  className={`rounded-lg flex-1 py-3 text-center text-sm transition select-none cursor-pointer ${
                                    isActive
                                      ? 'bg-white shadow-sm font-bold text-emerald-700 border border-slate-200/50'
                                      : 'hover:bg-slate-200/50 font-medium text-slate-500'
                                  }`}
                                >
                                  Kualitas {grade}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Quality description indicator */}
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>
                          {item.quality === 'A' && 'Kondisi prima: bersih, kering, bebas kontaminan (100%)'}
                          {item.quality === 'B' && 'Kondisi baik: sedikit residu/lembab (85%)'}
                          {item.quality === 'C' && 'Kondisi campur: perlu sortir lanjutan (70%)'}
                        </span>
                        <span className="font-mono text-slate-500">
                          Multiplier: {QUALITY_MULTIPLIERS[item.quality] * 100}%
                        </span>
                      </div>

                      {/* Live Price Preview */}
                      <div className="mt-3 pt-3 border-t border-slate-100/80 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          Subtotal {item.name}
                        </span>
                        <div className="font-mono text-emerald-600 text-sm font-medium text-right">
                          Nilai Dihitung: {formatRupiah(calculatedPrice)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quality Inspection Checklist / Partner Note */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileCheck size={14} className="text-emerald-600" />
                  Catatan Inspeksi Fisik (Opsional)
                </span>
                <input
                  type="text"
                  value={qualityNote}
                  onChange={(e) => setQualityNote(e.target.value)}
                  placeholder="Contoh: Wadah bersih, kardus kering tersegel rapi..."
                  className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            {/* ── STICKY FOOTER (THE CHECKOUT / LEDGER ACTION) ── */}
            <div className="p-6 border-t border-slate-100 bg-white/80 backdrop-blur-md flex flex-col gap-4 shrink-0">
              {/* Total Calculation */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-500 block">
                    Total Nilai Bersih
                  </span>
                  <span className="text-xs text-slate-400">
                    Akumulasi seluruh material terverifikasi
                  </span>
                </div>
                <div className="text-4xl font-mono font-bold text-emerald-600 tracking-tight">
                  {formatRupiah(totalValue)}
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleSubmitLedger}
                disabled={isSubmitting || totalValue <= 0}
                className="w-full py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-lg shadow-emerald-200 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mencatat ke Smart Ledger...</span>
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2">
                    <Check size={20} className="stroke-[3]" />
                    <span>Tercatat Berhasil!</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    <span>Selesaikan & Catat Ledger</span>
                  </>
                )}
              </button>

              {/* Subtle Trust Signature */}
              <p className="text-[11px] text-center text-slate-400">
                🔒 Transaksi ini akan ditandatangani secara kriptografis & saldo warga langsung
                dikreditkan.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

