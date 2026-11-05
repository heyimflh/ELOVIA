'use client';

import { motion } from 'framer-motion';
import { Scan, Scale, Sparkles, CheckCircle2, Plus, Info, RefreshCw } from 'lucide-react';

export function ScannerMockup() {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl bg-white border border-[#D3EBDB] shadow-[0_20px_50px_rgba(15,31,23,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(14,124,123,0.12)]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F6FAF7] border-b border-[#D3EBDB]/80 text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="ml-2 font-mono text-[11px] text-[#4A5D52] font-medium hidden sm:inline">
            waste-value-scanner-v1.sys
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#0E7C7B] bg-[#E8F4EC] px-2.5 py-0.5 rounded-full font-medium">
          <Scan className="w-3 h-3 text-[#0E7C7B] animate-pulse" />
          Scanner Aktif
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4">
        {/* Scanner Viewport with teal-600 scanning line */}
        <div className="relative rounded-2xl border border-[#D3EBDB] bg-gradient-to-b from-[#F6FAF7] to-white p-4 overflow-hidden">
          {/* Subtle radar / crosshair grid */}
          <div className="absolute inset-0 bg-eco-grid opacity-30 pointer-events-none" />

          {/* Corner Tech Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#0E7C7B]/60 rounded-tl" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#0E7C7B]/60 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0E7C7B]/60 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#0E7C7B]/60 rounded-br" />

          {/* Animated Scanning Line (teal-600) */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0E7C7B] to-transparent z-10 shadow-[0_0_12px_#0E7C7B]"
            animate={{
              top: ['5%', '92%', '5%'],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Center glowing focal point */}
            <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-6 h-2 bg-[#0E7C7B]/30 blur-xs rounded-full" />
          </motion.div>

          {/* Item Being Scanned Preview */}
          <div className="relative z-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 border border-amber-200/80 flex items-center justify-center text-amber-800 shrink-0">
                <span className="text-xl">📦</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h5 className="text-sm font-semibold text-[#0F1F17]">Kardus Box Cokelat</h5>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Kraft
                  </span>
                </div>
                <p className="text-xs text-[#5D7065] mt-0.5">Kategori: Kertas & Karton</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-white border border-[#D3EBDB] shadow-2xs">
                <div className="text-[10px] text-[#5D7065] font-mono flex items-center gap-1">
                  <Scale className="w-2.5 h-2.5 text-[#177A47]" /> Berat
                </div>
                <div className="font-mono text-xs font-bold text-[#0F1F17]">5.4 kg</div>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#E8F4EC] border border-[#D3EBDB] shadow-2xs">
                <div className="text-[10px] text-[#177A47] font-mono flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#177A47]" /> Kualitas
                </div>
                <div className="font-mono text-xs font-bold text-[#177A47]">Bersih & Kering</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Result Panel */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-800 bg-amber-100/80 border border-amber-200 px-2 py-0.5 rounded-full">
                <Info className="w-2.5 h-2.5" />
                Status: Estimasi
              </span>
              <span className="text-[10px] text-[#5D7065] hidden sm:inline">
                (Rentang indikatif pasar)
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#5D7065] flex items-center gap-1">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
              Harga Acuan: Hari ini
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="text-[11px] text-[#5D7065] font-medium">Potensi Nilai Ekonomis:</div>
              <div className="font-mono text-lg sm:text-2xl font-bold text-[#177A47] tracking-tight">
                Rp 9.500 <span className="text-sm font-normal text-[#5D7065]">—</span> Rp 16.200
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-[#5D7065]">Faktor Penentu</div>
              <div className="text-xs font-semibold text-[#0F1F17]">Kualitas Prima (1.0x)</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#D3EBDB]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-[11px] text-[#4A5D52] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
              <span>Memenuhi syarat minimal jemput mitra terdekat</span>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#177A47] hover:bg-[#0F5F37] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah ke Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

