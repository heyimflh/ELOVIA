'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Printer, Download, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

interface ReceiptPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  referenceNumber?: string;
  driverName?: string;
  partnerName?: string;
  payoutAmount?: string;
}

export function ReceiptPrintModal({
  isOpen,
  onClose,
  orderId = 'ORD-ELV-20261104-089',
  referenceNumber = 'REF-20261104-ELV89',
  driverName = 'Budi Pratama',
  partnerName = 'Bank Sampah Resik Kebumen',
  payoutAmount = 'Rp 74.500',
}: ReceiptPrintModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-2xl bg-white text-ink-900 rounded-3xl shadow-2xl overflow-hidden border border-mint-200"
        >
          {/* Header Bar */}
          <div className="bg-[#0F1F17] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo/Minimalist Green Leaf Emblem.png"
                  alt="ELOVIA"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Manifest Resi Penyaluran Digital</h3>
                <span className="text-xs text-green-400 font-mono">STANDAR MUTU SNI 8455:2017</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Receipt Body (Printable Area) */}
          <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar font-jakarta">
            {/* Top Meta Grid */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-mint-100 text-xs">
              <div>
                <span className="text-ink-400 block font-mono text-[10px] uppercase">
                  No. Resi Transaksi
                </span>
                <span className="font-mono font-bold text-ink-900 text-sm">{orderId}</span>
              </div>
              <div>
                <span className="text-ink-400 block font-mono text-[10px] uppercase">
                  Waktu Penerbitan
                </span>
                <span className="font-semibold text-ink-900">5 Nov 2026, 14:00 WIB</span>
              </div>
              <div>
                <span className="text-ink-400 block font-mono text-[10px] uppercase">
                  Mitra Pelaksana
                </span>
                <span className="font-semibold text-ink-900">{partnerName}</span>
              </div>
              <div>
                <span className="text-ink-400 block font-mono text-[10px] uppercase">
                  Petugas Driver Resmi
                </span>
                <span className="font-semibold text-ink-900">{driverName} (L300 - AA 8921 K)</span>
              </div>
            </div>

            {/* Table of items */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-ink-500 mb-3">
                Rincian Manifest Muatan
              </h4>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-mint-200 text-ink-500 font-mono">
                    <th className="pb-2">Deskripsi Material</th>
                    <th className="pb-2 text-center">Estimasi</th>
                    <th className="pb-2 text-center">Hasil Tera</th>
                    <th className="pb-2 text-right">Nilai Tukar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mint-100">
                  <tr>
                    <td className="py-3 font-semibold text-ink-900">
                      Botol PET Bening (Grade A)
                    </td>
                    <td className="py-3 text-center font-mono">20 kg</td>
                    <td className="py-3 text-center font-mono text-green-700 font-bold">21.2 kg</td>
                    <td className="py-3 text-right font-mono font-bold">Rp 64.000</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-ink-900">
                      Kardus Box Gelombang (Kering)
                    </td>
                    <td className="py-3 text-center font-mono">5 kg</td>
                    <td className="py-3 text-center font-mono text-green-700 font-bold">5.4 kg</td>
                    <td className="py-3 text-right font-mono font-bold">Rp 10.500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="bg-mint-50 p-4 rounded-2xl flex items-center justify-between border border-mint-200">
              <div>
                <span className="text-xs font-bold text-ink-900 block">Total Nilai Pencairan</span>
                <span className="text-[11px] text-ink-500">
                  Metode: ELOVIA Wallet (Instan Transfer)
                </span>
              </div>
              <div className="text-xl font-black font-mono text-green-700">{payoutAmount}</div>
            </div>

            {/* Cryptographic verification watermark */}
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>SHA-256: 8a9f24c08e823f99ab76d2994c2560d4</span>
              <span className="text-green-700 font-bold">✓ TERA VALID</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-mint-50/60 p-4 border-t border-mint-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-ink-700 hover:bg-mint-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

