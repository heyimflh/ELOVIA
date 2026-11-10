'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Receipt,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Scale,
  ArrowRight,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Truck,
  ExternalLink,
} from 'lucide-react';
import {
  type LedgerTransaction,
  type LedgerStatus,
} from './transactionLedgerData';
import { formatCurrencyIDR } from './confirmedEarningsData';

export interface TransactionDetailDrawerProps {
  transaction: LedgerTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailDrawer({
  transaction,
  isOpen,
  onClose,
}: TransactionDetailDrawerProps) {
  const [copied, setCopied] = React.useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!transaction) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: LedgerStatus) => {
    switch (status) {
      case 'TERKONFIRMASI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            TERKONFIRMASI
          </span>
        );
      case 'DALAM PROSES':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            DALAM PROSES
          </span>
        );
      case 'ESTIMASI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            ESTIMASI
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container (Desktop: Right Slide, Mobile: Bottom Sheet) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-50 w-full max-w-lg h-full bg-white/95 backdrop-blur-2xl border-l border-slate-200/80 shadow-[0_0_60px_rgba(0,0,0,0.25)] flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            {/* Top Bar with Title & Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white/90 backdrop-blur-md border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="drawer-title" className="text-sm font-bold text-slate-900 tracking-tight">
                    Detail Catatan Ledger
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">Immutable Eco-Financial Record</p>
                </div>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Tutup detail transaksi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* ── A. Transaction Header Card ── */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-4">
                <div className="flex items-center justify-between">
                  {getStatusBadge(transaction.status)}
                  <button
                    onClick={handleCopyId}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600 hover:text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 transition-colors shadow-2xs"
                    title="Salin ID Transaksi"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{transaction.id}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Waktu Pencatatan:</span>
                  <span className="font-mono text-slate-700 font-medium">
                    {transaction.date}, {transaction.time}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Metode Penyerahan:</span>
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    {transaction.deliveryMethod}
                  </span>
                </div>
              </div>

              {/* ── B. Net Earnings Highlight Card ── */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-[#0F291E] to-[#0A1812] text-white shadow-[0_10px_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                    NET EARNINGS
                  </span>
                  <span className="text-[10px] text-emerald-200/80 font-mono bg-white/10 px-2 py-0.5 rounded">
                    Total Bersih
                  </span>
                </div>

                <div className="relative z-10 text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight my-2">
                  {formatCurrencyIDR(transaction.netEarnings)}
                </div>

                <p className="relative z-10 text-xs text-slate-300 font-light flex items-center gap-1.5 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Total nilai bersih tercatat dan terjamin tanpa penalti.
                </p>
              </div>

              {/* ── Collector Partner Details ── */}
              <div className="rounded-2xl border border-slate-200 p-4 bg-white shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center font-bold font-mono text-emerald-800 text-sm shrink-0">
                    {transaction.collectorPartner.avatarInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {transaction.collectorPartner.name}
                      </h4>
                      {transaction.collectorPartner.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{transaction.collectorPartner.location}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ── C. Material Breakdown Table ── */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-600" />
                    Rincian Material Terpilah
                  </h4>
                  <span className="font-mono text-slate-500 font-medium">
                    Total {transaction.totalWeightKg.toFixed(2)} kg
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50/90 border-b border-slate-200/80 text-slate-500 font-medium">
                      <tr>
                        <th className="py-2.5 px-3 text-left">Material</th>
                        <th className="py-2.5 px-2 text-center">Bobot</th>
                        <th className="py-2.5 px-2 text-right">Harga/kg</th>
                        <th className="py-2.5 px-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transaction.materials.map((mat, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {mat.name}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {mat.category}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                            {mat.weightKg.toFixed(1)} kg
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-slate-500">
                            {formatCurrencyIDR(mat.pricePerKg)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrencyIDR(mat.subtotal)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── D. Financial Breakdown ── */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Perhitungan Finansial Transparan</h4>
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Total Nilai Kotor Material</span>
                    <span className="font-mono font-medium">
                      {formatCurrencyIDR(transaction.financials?.grossMaterialValue ?? transaction.netEarnings)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span>Biaya Angkut / Logistik</span>
                    <span className="font-mono text-amber-700">
                      {(transaction.financials?.logisticsFee ?? 0) > 0
                        ? `- ${formatCurrencyIDR(transaction.financials?.logisticsFee)}`
                        : 'Rp 0 (Mandiri / Gratis)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500">
                    <span>Biaya Layanan Platform</span>
                    <span className="font-mono text-amber-700">
                      {(transaction.financials?.serviceFee ?? 0) > 0
                        ? `- ${formatCurrencyIDR(transaction.financials?.serviceFee)}`
                        : 'Rp 0 (Bebas Biaya)'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-sm font-bold text-slate-900">
                    <span>Nilai Bersih (Masuk Dompet)</span>
                    <span className="font-mono text-emerald-700 text-base">
                      {formatCurrencyIDR(transaction.financials?.netEarnings ?? transaction.netEarnings)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── E. Transaction Timeline ── */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Jejak Status Transaksi</h4>
                <div className="relative pl-6 space-y-4 border-l-2 border-slate-100 ml-2">
                  {transaction.timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Node Dot */}
                      <span
                        className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          step.completed
                            ? 'bg-emerald-500 border-white text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {step.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>

                      <div>
                        <h5
                          className={`text-xs font-semibold ${
                            step.completed ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 font-light mt-0.5">
                          {step.description}
                        </p>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          {step.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {transaction.notes && (
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed">
                  <span className="font-semibold">Catatan Mitra: </span>
                  {transaction.notes}
                </div>
              )}
            </div>

            {/* Bottom Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                type="button"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Tutup Detail
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default TransactionDetailDrawer;

