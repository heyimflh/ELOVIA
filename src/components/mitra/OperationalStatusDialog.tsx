'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Power,
  Store,
  CheckCircle2,
  Clock,
  Truck,
  ShieldAlert,
  Loader2,
  X,
} from 'lucide-react';
import { OperationalStatus } from './types';

interface OperationalStatusDialogProps {
  isOpen: boolean;
  targetStatus: OperationalStatus;
  storeName: string;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function OperationalStatusDialog({
  isOpen,
  targetStatus,
  storeName,
  isSubmitting,
  onConfirm,
  onCancel,
}: OperationalStatusDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onCancel();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isSubmitting, onCancel]);

  const isEnabling = targetStatus === 'open';

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (!isSubmitting) onCancel();
            }}
            className="fixed inset-0 bg-[#0F1F17]/55 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E6ECE7] p-6 sm:p-8 shadow-[0_24px_64px_-12px_rgba(15,31,23,0.18)] z-10 overflow-hidden"
          >
            {/* Top decorative ambient gradient strip */}
            <div
              className={`absolute top-0 inset-x-0 h-1.5 ${
                isEnabling
                  ? 'bg-gradient-to-r from-[#238B57] via-[#10B981] to-[#34D399]'
                  : 'bg-gradient-to-r from-amber-500 via-rose-500 to-slate-400'
              }`}
            />

            {/* Header section */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isEnabling
                      ? 'bg-[#EAF5ED] text-[#238B57] border-[#D3EBDB]'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  <Power className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span
                    className={`inline-block text-[11px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border mb-1 ${
                      isEnabling
                        ? 'bg-[#EAF5ED] text-[#177A47] border-[#D3EBDB]'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {isEnabling ? 'Konfirmasi Pembukaan' : 'Konfirmasi Penonaktifan'}
                  </span>
                  <h3
                    id="dialog-title"
                    className="text-lg sm:text-xl font-bold tracking-tight text-[#17251D]"
                  >
                    {isEnabling ? 'Buka Operasional Toko?' : 'Tutup Operasional Sementara?'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="text-[#84928A] hover:text-[#17251D] p-2 rounded-xl transition-colors hover:bg-[#F4FAF6] disabled:opacity-50"
                aria-label="Tutup dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content summary */}
            <div className="mt-5 space-y-4">
              <p className="text-sm text-[#4A5D52] leading-relaxed">
                Anda akan mengubah status operasional untuk{' '}
                <strong className="text-[#17251D] font-semibold">{storeName}</strong>.
                Periksa konsekuensi operasional berikut sebelum melanjutkan:
              </p>

              {/* Consequence card list */}
              <div className="rounded-2xl border border-[#E6ECE7] bg-[#F8FAF7] p-4 space-y-3">
                {isEnabling ? (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#238B57] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D3D33] leading-normal">
                        Toko ditandai <span className="font-semibold text-[#177A47]">Sedang Beroperasi</span> di Marketplace ELOVIA dan dapat ditemukan oleh pengguna sekitar.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-4 h-4 text-[#238B57] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D3D33] leading-normal">
                        Masyarakat dapat kembali menjadwalkan penjemputan armada atau drop-off langsung ke lokasi.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#238B57] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D3D33] leading-normal">
                        SLA respons pesanan normal kembali berlaku (target konfirmasi ≤ 24 jam).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D3D33] leading-normal">
                        Toko akan ditandai <span className="font-semibold text-amber-700">Operasional Ditutup</span> dan tidak menerima pengajuan penjemputan baru.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-[#2D3D33] leading-normal">
                        Pesanan dan jadwal yang <span className="font-semibold text-[#17251D]">sudah terkonfirmasi</span> sebelumnya tetap wajib diselesaikan sesuai komitmen.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Store className="w-4 h-4 text-[#84928A] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#5D7065] leading-normal">
                        Anda dapat mengaktifkan kembali status buka kapan saja melalui sakelar ini.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E6ECE7] bg-white text-sm font-semibold text-[#4A5D52] hover:text-[#17251D] hover:bg-[#F4FAF6] transition-all disabled:opacity-50"
              >
                Batalkan
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isSubmitting}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isEnabling
                    ? 'bg-[#238B57] hover:bg-[#177A47] focus:ring-[#238B57]'
                    : 'bg-[#17251D] hover:bg-black focus:ring-[#17251D]'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memperbarui Status...</span>
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4" />
                    <span>Ya, Ubah Status</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

