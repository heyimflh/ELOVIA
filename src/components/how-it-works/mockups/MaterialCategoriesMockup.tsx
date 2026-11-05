'use client';

import { FileText, Layers, Box, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'paper',
    title: 'Paper & Cardboard',
    subtitle: 'Kardus, Arsip, Dupleks',
    price: 'Rp 1.500 – 3.200 / kg',
    tag: 'Daur Ulang Tinggi',
    icon: FileText,
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    popular: true,
  },
  {
    id: 'plastic',
    title: 'Plastic',
    subtitle: 'Botol PET, Tutup HDPE, PP',
    price: 'Rp 2.000 – 5.500 / kg',
    tag: 'Permintaan Tinggi',
    icon: Layers,
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
    popular: false,
  },
  {
    id: 'metal',
    title: 'Metal',
    subtitle: 'Besi Padu, Tembaga, Kaleng',
    price: 'Rp 4.000 – 85.000 / kg',
    tag: 'Nilai Tertinggi',
    icon: Box,
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    popular: false,
  },
  {
    id: 'glass',
    title: 'Glass',
    subtitle: 'Botol Sirup, Kaca Amber, Bening',
    price: 'Rp 400 – 1.200 / kg',
    tag: 'Siklus Utuh 100%',
    icon: Sparkles,
    accent: 'bg-teal-50 text-teal-700 border-teal-200',
    popular: false,
  },
];

export function MaterialCategoriesMockup() {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl bg-white border border-[#D3EBDB] shadow-[0_20px_50px_rgba(15,31,23,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(23,122,71,0.1)]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F6FAF7] border-b border-[#D3EBDB]/80 text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="ml-2 font-mono text-[11px] text-[#4A5D52] font-medium hidden sm:inline">
            elovia-material-catalog.sys
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#177A47] bg-[#E8F4EC] px-2.5 py-0.5 rounded-full font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#177A47] animate-pulse" />
          4 Kategori Terdaftar
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-[#0F1F17]">
              Pilih Kategori Material
            </h4>
            <p className="text-xs text-[#5D7065] mt-0.5">
              Material anorganik terpilah berdasarkan potensi daur ulang industri
            </p>
          </div>
          <span className="text-[11px] font-mono font-medium text-[#177A47] bg-[#E8F4EC] px-2 py-1 rounded-md hidden sm:block">
            SNI Standard
          </span>
        </div>

        {/* 2x2 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`relative p-3 sm:p-3.5 rounded-xl border text-left transition-all ${
                  cat.popular
                    ? 'border-[#177A47] bg-[#F6FAF7] ring-1 ring-[#177A47]/30 shadow-sm'
                    : 'border-[#D3EBDB]/80 bg-white hover:border-[#177A47]/50 hover:bg-[#F6FAF7]/50'
                }`}
              >
                {cat.popular && (
                  <span className="absolute -top-2 right-3 font-mono text-[9px] uppercase tracking-wider bg-[#177A47] text-white px-2 py-0.5 rounded-full font-semibold shadow-xs">
                    Terbanyak
                  </span>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border ${cat.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-[#0F1F17]">
                        {cat.title}
                      </h5>
                      <p className="text-[10px] text-[#5D7065] line-clamp-1">{cat.subtitle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#5D7065] shrink-0 opacity-60" />
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#D3EBDB]/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-[#177A47]">
                    {cat.price}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white text-[#4A5D52] border border-[#D3EBDB]">
                    {cat.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Verification Bar */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6FAF7] border border-[#D3EBDB] text-xs text-[#4A5D52]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#E8F4EC] flex items-center justify-center text-[#177A47]">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span className="text-[11px] text-[#0F1F17] font-medium">
              Data harga indikatif diperbarui berkala bersama 48+ mitra agregator
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#177A47] font-medium hidden md:inline">
            100% Terbuka
          </span>
        </div>
      </div>
    </div>
  );
}

