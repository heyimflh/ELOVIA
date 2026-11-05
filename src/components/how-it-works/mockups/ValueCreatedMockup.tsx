'use client';

import { motion } from 'framer-motion';
import { Wallet, Sprout, TrendingUp, ShieldCheck, CheckCircle2, Leaf, Award } from 'lucide-react';

export function ValueCreatedMockup() {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl bg-white border border-[#D3EBDB] shadow-[0_20px_50px_rgba(15,31,23,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(23,122,71,0.1)]">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#F6FAF7] border-b border-[#D3EBDB]/80 text-xs text-[#4A5D52]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="ml-2 font-mono text-[11px] text-[#4A5D52] font-medium hidden sm:inline">
            ecowallet-impact-ledger.sys
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#177A47] bg-[#E8F4EC] px-2.5 py-0.5 rounded-full font-medium">
          <ShieldCheck className="w-3 h-3 text-[#177A47]" />
          Ledger Terverifikasi
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-4 sm:p-5 md:p-6 space-y-4">
        {/* EcoWallet Balance Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F6FAF7] via-white to-[#E8F4EC]/40 border border-[#D3EBDB] relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#E8F4EC] text-[#177A47]">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs text-[#5D7065] font-medium">EcoWallet Balance</span>
              </div>
              <div className="mt-2 font-mono text-2xl sm:text-3xl font-extrabold text-[#0F1F17] tracking-tight">
                Rp 148.500
              </div>
            </div>

            {/* Terkonfirmasi Pill */}
            <div className="flex flex-col items-end gap-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F4EC] border border-[#D3EBDB] text-[#177A47] font-mono text-[11px] font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#177A47] animate-pulse" />
                Terkonfirmasi
              </span>
              <span className="text-[10px] text-[#5D7065] font-mono">Status: Selesai</span>
            </div>
          </div>

          {/* Sub-Ledger Status Separation (PRD Rule) */}
          <div className="mt-3 pt-3 border-t border-[#D3EBDB]/70 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-white/80 border border-[#D3EBDB]/60">
              <div className="text-[10px] text-[#5D7065] font-mono">Dalam Proses</div>
              <div className="font-mono text-xs font-semibold text-[#0F1F17]">Rp 32.000</div>
            </div>
            <div className="p-2 rounded-lg bg-white/80 border border-[#D3EBDB]/60">
              <div className="text-[10px] text-[#5D7065] font-mono">Estimasi Keranjang</div>
              <div className="font-mono text-xs font-semibold text-[#5D7065]">Rp 15.000</div>
            </div>
          </div>
        </div>

        {/* Impact Garden Seedling Widget */}
        <div className="p-4 rounded-2xl bg-white border border-[#D3EBDB] relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#E8F4EC] text-[#177A47]">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#0F1F17]">Impact Garden</h5>
                <p className="text-[10px] text-[#5D7065]">Tumbuh seiring transaksi Selesai</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#E8F4EC] text-[#177A47] border border-[#D3EBDB]">
              <Award className="w-3 h-3" /> Level 3: Tunas Lestari
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Custom SVG Sprouting Seedling with subtle floating motion */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center bg-gradient-to-b from-[#F6FAF7] to-[#E8F4EC] rounded-2xl border border-[#D3EBDB]">
              {/* Pulsing root ring */}
              <motion.div
                className="absolute w-12 h-12 rounded-full border border-[#177A47]/20"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.2, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              <svg
                viewBox="0 0 64 64"
                className="w-14 h-14 sm:w-16 sm:h-16 overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Soil mound */}
                <ellipse cx="32" cy="54" rx="18" ry="4.5" fill="#A9D3B8" opacity="0.6" />
                <ellipse cx="32" cy="53" rx="13" ry="3" fill="#177A47" opacity="0.25" />

                {/* Sprouting Main Stem */}
                <motion.path
                  d="M32 52 C32 40, 31 30, 32 20"
                  stroke="#177A47"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.8 }}
                  animate={{ pathLength: [0.85, 1, 0.85] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Left Leaf */}
                <motion.path
                  d="M32 32 C23 30, 16 23, 17 17 C25 17, 30 24, 32 30"
                  fill="#2FA866"
                  stroke="#177A47"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '32px 30px' }}
                />
                {/* Left Leaf Vein */}
                <path d="M30 28 C25 24, 21 21, 19 19" stroke="#E8F4EC" strokeWidth="1" strokeLinecap="round" />

                {/* Right Leaf */}
                <motion.path
                  d="M32 26 C41 24, 48 18, 47 12 C39 12, 34 19, 32 24"
                  fill="#177A47"
                  stroke="#0F5F37"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  animate={{ rotate: [2, -2, 2] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '32px 24px' }}
                />
                {/* Right Leaf Vein */}
                <path d="M34 22 C39 18, 43 15, 45 14" stroke="#E8F4EC" strokeWidth="1" strokeLinecap="round" />

                {/* Tiny top bud */}
                <circle cx="32" cy="18" r="2.2" fill="#E3F6B5" stroke="#177A47" strokeWidth="1" />
              </svg>
            </div>

            {/* Metrics Info */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5D7065] flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-[#177A47]" /> Material Tersalurkan
                </span>
                <span className="font-mono font-bold text-[#0F1F17]">38.5 kg</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#E8F4EC] overflow-hidden">
                <div className="h-full bg-[#177A47] rounded-full w-[78%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#5D7065] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#0E7C7B]" /> Reduksi Emisi
                </span>
                <span className="font-mono font-bold text-[#0E7C7B]">21.4 kg CO₂e</span>
              </div>
              <div className="text-[10px] text-[#5D7065]">
                Menuju Level 4: Rimbun Harmoni (Kurang 11.5 kg)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

