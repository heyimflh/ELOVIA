'use client';

import { Star, ShieldCheck, MapPin, Truck, Clock, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function MarketplaceMockup() {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl bg-white border border-[#D3EBDB] shadow-[0_20px_50px_rgba(15,31,23,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(23,122,71,0.1)]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F6FAF7] border-b border-[#D3EBDB]/80 text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="ml-2 font-mono text-[11px] text-[#4A5D52] font-medium hidden sm:inline">
            elovia-recycle-exchange.hub
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#177A47] bg-[#E8F4EC] px-2.5 py-0.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#177A47] animate-pulse" />
          Mitra Terhubung: 3 Dekat Anda
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4">
        {/* Selected Partner Highlight Card */}
        <div className="relative p-3.5 sm:p-4 rounded-2xl border-2 border-[#177A47] bg-[#F6FAF7] shadow-xs">
          <div className="absolute -top-2.5 right-4 font-mono text-[9px] uppercase tracking-wider bg-[#177A47] text-white px-2.5 py-0.5 rounded-full font-bold shadow-xs">
            Rekomendasi Terbaik
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E8F4EC] border border-[#D3EBDB] flex items-center justify-center text-[#177A47] font-bold text-base shrink-0">
                BS
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h5 className="text-sm font-semibold text-[#0F1F17]">Bank Sampah Berseri</h5>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#177A47] bg-white border border-[#D3EBDB] px-1.5 py-0.2 rounded-md">
                    <ShieldCheck className="w-3 h-3 text-[#177A47]" /> Terverifikasi
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#5D7065] mt-0.5">
                  <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.95
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-[#4A5D52]" /> 1.2 km
                  </span>
                  <span>·</span>
                  <span className="font-mono text-[11px] text-[#177A47]">184 transaksi</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between pt-1 sm:pt-0 border-t sm:border-t-0 border-[#D3EBDB]/60">
              <span className="text-[10px] text-[#5D7065] font-mono">Harga Indikatif</span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#177A47]">
                Rp 2.800 <span className="text-xs font-normal text-[#5D7065]">/kg</span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Timeline Tracker */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#D3EBDB] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#177A47] animate-ping" />
              <span className="text-xs font-semibold text-[#0F1F17]">Status Logistik Penjemputan</span>
            </div>
            <span className="text-[10px] font-mono text-[#5D7065] bg-[#F6FAF7] px-2 py-0.5 rounded border border-[#D3EBDB]">
              ID: #ELV-8821
            </span>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#177A47] text-white flex items-center justify-center text-xs shadow-xs z-10">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[11px] font-semibold text-[#0F1F17] mt-1.5">Permintaan</span>
              <span className="text-[9px] font-mono text-[#5D7065]">08:30 WIB</span>
            </div>

            {/* Step 2 (Active) */}
            <div className="relative flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#E8F4EC] border-2 border-[#177A47] text-[#177A47] flex items-center justify-center text-xs z-10 animate-pulse">
                <Truck className="w-3.5 h-3.5 text-[#177A47]" />
              </div>
              <span className="text-[11px] font-bold text-[#177A47] mt-1.5">Kurir Menuju</span>
              <span className="text-[9px] font-mono text-[#177A47]">Sedang Berjalan</span>
            </div>

            {/* Step 3 (Pending) */}
            <div className="relative flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-[#F6FAF7] border border-[#D3EBDB] text-[#5D7065] flex items-center justify-center text-xs z-10">
                <Clock className="w-3.5 h-3.5 text-[#5D7065]" />
              </div>
              <span className="text-[11px] font-medium text-[#5D7065] mt-1.5">Timbang Fisik</span>
              <span className="text-[9px] font-mono text-[#5D7065]">Est. 09:20 WIB</span>
            </div>
          </div>

          {/* Micro status info */}
          <div className="mt-2 p-2 rounded-lg bg-[#F6FAF7] border border-[#D3EBDB]/80 flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#4A5D52] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#177A47]" /> Driver: Supriadi (Mobil Pickup Terdaftar)
            </span>
            <span className="text-[10px] font-mono font-medium text-[#177A47] bg-[#E8F4EC] px-1.5 py-0.5 rounded">
              Lacak Posisi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

