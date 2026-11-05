'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Scale, Sparkles, CheckCircle2, Clock, Wallet, ShieldCheck, ArrowRight } from 'lucide-react';
import type { TrackingStepId } from './types';

interface MaterialWeighingSectionProps {
  currentStep?: TrackingStepId;
}

export function MaterialWeighingSection({
  currentStep = 2,
}: MaterialWeighingSectionProps) {
  const isWeighed = currentStep >= 3;

  const materials = [
    {
      id: 'mat-1',
      name: 'Botol PET Bening',
      category: 'Plastik SNI Grade A',
      estWeight: '20 kg',
      finalWeight: isWeighed ? '21.2 kg' : 'Pending...',
      unitPrice: 'Rp 3.200 / kg',
      estValue: 'Rp 64.000',
      finalValue: isWeighed ? 'Rp 67.840' : 'Rp 64.000',
      image: '/images/materials/plastic.jpg',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    },
    {
      id: 'mat-2',
      name: 'Kardus Box Gelombang',
      category: 'Kertas & Karton Kering',
      estWeight: '5 kg',
      finalWeight: isWeighed ? '5.4 kg' : 'Pending...',
      unitPrice: 'Rp 2.100 / kg',
      estValue: 'Rp 10.500',
      finalValue: isWeighed ? 'Rp 11.340' : 'Rp 10.500',
      image: '/images/materials/paper_cardboard.jpg',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    },
  ];

  const totalFinalPayout = isWeighed ? '≈ Rp 79.180' : '≈ Rp 74.500';

  return (
    <div
      className="w-full bg-white/5 backdrop-blur-xl border border-white/15 rounded-[2.5rem] p-6 md:p-8 transform-gpu backface-hidden shadow-2xl relative overflow-hidden"
      suppressHydrationWarning
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 w-96 h-48 bg-green-500/10 blur-[80px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white font-jakarta tracking-tight">
            Rincian &amp; Hasil Timbangan Material
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-jakarta mt-1">
            Data timbangan diintegrasikan otomatis via kalibrasi sensor IoT Metrologi Legal.
          </p>
        </div>

        {/* Live sync badge */}
        <div className="inline-flex items-center gap-2 bg-black/40 border border-green-500/30 text-green-300 px-3.5 py-1.5 rounded-full text-xs font-mono self-start sm:self-auto shadow-sm">
          <Scale className="w-3.5 h-3.5 text-green-400" />
          <span>{isWeighed ? 'TERA SELESAI (VALID)' : 'SINKRONISASI AKTIF'}</span>
          <span className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-white/50">
              <th className="pb-3 pl-2 font-medium">Material</th>
              <th className="pb-3 text-center font-medium">Estimasi Berat</th>
              <th className="pb-3 text-center font-medium">Hasil Timbang Final</th>
              <th className="pb-3 text-right pr-2 font-medium">Potensi Nilai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-jakarta">
            {materials.map((mat) => (
              <tr key={mat.id} className="hover:bg-white/5 transition-colors group">
                {/* Material Info */}
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/40">
                      <Image
                        src={mat.image}
                        alt={mat.name}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <span className="text-white font-bold text-base block group-hover:text-green-300 transition-colors">
                        {mat.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${mat.badgeColor}`}
                        >
                          {mat.category}
                        </span>
                        <span className="text-[11px] text-white/40 font-mono">
                          {mat.unitPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Estimasi Berat */}
                <td className="py-4 text-center">
                  <span className="font-mono text-white/80 font-semibold text-sm bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                    {mat.estWeight}
                  </span>
                </td>

                {/* Hasil Timbang Final */}
                <td className="py-4 text-center">
                  {isWeighed ? (
                    <span className="font-mono font-bold text-sm bg-green-500/20 text-green-300 border border-green-400/40 px-3 py-1 rounded-xl inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      {mat.finalWeight}
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-amber-300/90 bg-amber-500/10 border border-amber-400/30 px-3 py-1 rounded-xl inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-300 animate-pulse" />
                      {mat.finalWeight}
                    </span>
                  )}
                </td>

                {/* Potensi Nilai */}
                <td className="py-4 text-right pr-2">
                  <div className="font-mono font-bold text-base text-white">
                    {mat.finalValue}
                  </div>
                  {isWeighed && (
                    <span className="text-[10px] text-green-400 font-mono block">
                      Telah disesuaikan
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-3">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                <Image src={mat.image} alt={mat.name} fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{mat.name}</h4>
                <span className="text-[11px] text-white/50 font-mono block">{mat.unitPrice}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-xl">
                <span className="text-white/40 block text-[10px] uppercase font-mono">
                  Estimasi Berat
                </span>
                <span className="font-mono text-white font-semibold">{mat.estWeight}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl">
                <span className="text-white/40 block text-[10px] uppercase font-mono">
                  Hasil Timbang Final
                </span>
                <span className="font-mono text-green-300 font-bold">{mat.finalWeight}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-white/60">Potensi Nilai:</span>
              <span className="font-mono font-bold text-white text-base">{mat.finalValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Payout Highlight Glowing Box */}
      <div className="mt-6 bg-green-500/10 border border-green-400/30 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden shadow-xl">
        {/* Glow backdrop inside payout box */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-500/15 via-emerald-400/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Left Info */}
        <div className="relative z-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <Wallet className="w-4 h-4 text-green-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-jakarta">
              Total Nilai Tukar Final
            </h3>
            <span className="bg-green-400/20 text-green-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-green-400/30">
              GARANSI TRANSPARAN
            </span>
          </div>
          <p className="text-white/70 text-xs sm:text-sm font-jakarta max-w-xl">
            Akan otomatis ditransfer ke Saldo ELOVIA Wallet setelah status Selesai.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 text-[11px] font-mono text-white/50">
            <span>Dukungan Pencairan:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">ELOVIA Wallet</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">GoPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">OVO</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">DANA</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white/80">BCA</span>
          </div>
        </div>

        {/* Right Typography */}
        <div className="relative z-10 text-center md:text-right shrink-0">
          <span className="text-[11px] uppercase tracking-wider text-green-300/80 font-mono block">
            {isWeighed ? 'Nilai Akurat Terverifikasi' : 'Estimasi Akumulasi'}
          </span>
          <div className="text-3xl md:text-4xl font-black text-green-400 font-mono tracking-tight drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            {totalFinalPayout}
          </div>
        </div>
      </div>
    </div>
  );
}

