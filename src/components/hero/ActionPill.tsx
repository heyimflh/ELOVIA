'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ArrowUpRight, BookOpen, X, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

const SAMPLE_MATERIALS: MaterialOption[] = [
  { id: 'kardus', name: 'Kardus Box Bekas', category: 'Paper', minPrice: 1500, maxPrice: 2500 },
  { id: 'pet', name: 'Botol PET Bening', category: 'Plastic', minPrice: 3200, maxPrice: 5000 },
  { id: 'kaleng', name: 'Kaleng Aluminium', category: 'Metal', minPrice: 11000, maxPrice: 16000 },
  { id: 'kaca', name: 'Botol Kaca Bening', category: 'Glass', minPrice: 600, maxPrice: 1200 },
];

export function ActionPill() {
  const [methodologyOpen, setMethodologyOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);

  // Scanner interactive state
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(SAMPLE_MATERIALS[0]);
  const [weightKg, setWeightKg] = useState<number>(5);
  const [grade, setGrade] = useState<'A' | 'B' | 'C'>('A');

  // Value calculation per PRD section 11.3
  const qualityFactor = grade === 'A' ? 1.0 : grade === 'B' ? 0.85 : 0.6;
  const estimatedMin = Math.round((weightKg * selectedMaterial.minPrice * qualityFactor) / 100) * 100;
  const estimatedMax = Math.round((weightKg * selectedMaterial.maxPrice * qualityFactor) / 100) * 100;

  const formatIdr = (val: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="w-full max-w-[560px] mx-auto">
        {/* Floating Capsule Container: Recreates exact search bar form, shadow & layout from reference */}
        <div className="relative group bg-white/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 pl-4 sm:pl-6 border border-white/60 shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.45)] transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4">
          {/* Secondary Action: Learn Methodology (left side) */}
          <button
            type="button"
            onClick={() => setMethodologyOpen(true)}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F1F17] hover:text-[#177A47] hover:bg-[#E8F4EC]/80 active:bg-[#D3EBDB] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#177A47] cursor-pointer text-left"
          >
            <BookOpen className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#177A47] shrink-0" />
            <span className="truncate">Learn Methodology</span>
          </button>

          {/* Subtle Vertical Divider */}
          <div className="hidden sm:block w-px h-6 bg-[#0F1F17]/15" />

          {/* Primary CTA Button: Explore material value ↗ (right side, dominant pill) */}
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            className="group/btn relative inline-flex items-center justify-center gap-1.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0F1F17] hover:bg-[#177A47] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F1F17] cursor-pointer shrink-0"
          >
            <span>Explore material value</span>
            <span className="text-base leading-none transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>

        {/* Micro-hint under pill: Pure White / Light Mint for high contrast readability */}
        <p className="mt-3 text-center text-xs font-medium text-[#E8F4EC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-wide">
          Transparent price benchmarks · Zero mandatory app installs · Verified partners
        </p>
      </div>

      {/* MODAL 1: Radix UI Dialog for 'Explore material value' (Interactive Waste Value Scanner) */}
      <Dialog.Root open={scannerOpen} onOpenChange={setScannerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D3EBDB] animate-in zoom-in-95 focus:outline-none">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F4EC] text-[#177A47] text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Waste Value Scanner</span>
                </div>
                <Dialog.Title className="font-fraunces text-2xl font-bold text-[#0F1F17]">
                  Quick Material Valuation
                </Dialog.Title>
                <Dialog.Description className="text-xs sm:text-sm text-[#4A5D52] mt-1">
                  Estimate the circular market value of your sorted household waste.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close dialog"
                  className="p-1.5 rounded-full hover:bg-[#E8F4EC] text-[#4A5D52] hover:text-[#0F1F17] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Material Selector */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F1F17] uppercase tracking-wider mb-2">
                  1. Select Material
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_MATERIALS.map((mat) => (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                        selectedMaterial.id === mat.id
                          ? 'border-[#177A47] bg-[#E8F4EC] text-[#0B4A2B] shadow-xs'
                          : 'border-[#D3EBDB] hover:border-[#A9D3B8] text-[#4A5D52]'
                      }`}
                    >
                      <div className="font-semibold text-sm">{mat.name}</div>
                      <div className="text-[11px] text-[#5D7065] mt-0.5">
                        {mat.category} · {formatIdr(mat.minPrice)} - {formatIdr(mat.maxPrice)}/kg
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#0F1F17] uppercase tracking-wider">
                    2. Estimated Weight
                  </label>
                  <span className="text-sm font-bold text-[#177A47] tabular-nums">
                    {weightKg} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-[#177A47] cursor-pointer"
                />
              </div>

              {/* Quality Grade */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1F17] uppercase tracking-wider mb-2">
                  3. Sorting Quality Grade
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { grade: 'A' as const, label: 'Grade A', desc: 'Clean & Dry (100%)' },
                    { grade: 'B' as const, label: 'Grade B', desc: 'Slightly Dusty (85%)' },
                    { grade: 'C' as const, label: 'Grade C', desc: 'Mixed/Wet (60%)' },
                  ].map((item) => (
                    <button
                      key={item.grade}
                      type="button"
                      onClick={() => setGrade(item.grade)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        grade === item.grade
                          ? 'border-[#177A47] bg-[#E8F4EC] text-[#0B4A2B] font-semibold'
                          : 'border-[#D3EBDB] text-[#5D7065]'
                      }`}
                    >
                      <div className="text-xs">{item.label}</div>
                      <div className="text-[10px] opacity-80">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result (PRD Section 11.3) */}
              <div className="p-4 rounded-2xl bg-[#E8F4EC]/80 border border-[#D3EBDB] text-center">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B4A2B] block mb-1">
                  Estimated Value Range (Indikatif)
                </span>
                <div className="font-fraunces text-2xl sm:text-3xl font-bold text-[#177A47]">
                  {formatIdr(estimatedMin)} – {formatIdr(estimatedMax)}
                </div>
                <p className="text-[11px] text-[#5D7065] mt-1.5">
                  Final payout is verified upon physical drop-off/pickup by certified partners.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#4A5D52] hover:bg-[#E8F4EC] transition-colors"
                >
                  Close
                </button>
              </Dialog.Close>
              <button
                type="button"
                onClick={() => setScannerOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#177A47] hover:bg-[#0F5F37] text-white text-xs font-semibold shadow-md transition-colors"
              >
                Proceed to Marketplace
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* MODAL 2: Radix UI Dialog for 'Learn Methodology' */}
      <Dialog.Root open={methodologyOpen} onOpenChange={setMethodologyOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs animate-in fade-in" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D3EBDB] animate-in zoom-in-95 focus:outline-none max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F4EC] text-[#177A47] text-xs font-semibold mb-2">
                  <Info className="w-3.5 h-3.5" />
                  <span>PRD Standard · Section 11 & 14</span>
                </div>
                <Dialog.Title className="font-fraunces text-2xl font-bold text-[#0F1F17]">
                  ELOVIA Valuation Methodology
                </Dialog.Title>
                <Dialog.Description className="text-xs sm:text-sm text-[#4A5D52] mt-1">
                  How waste transforms into transparent economic and environmental capital.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close dialog"
                  className="p-1.5 rounded-full hover:bg-[#E8F4EC] text-[#4A5D52] hover:text-[#0F1F17] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-6 space-y-5 text-sm text-[#4A5D52]">
              {/* Formula */}
              <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#D3EBDB]">
                <h4 className="font-semibold text-xs text-[#0F1F17] uppercase tracking-wider mb-2">
                  Canonical Formula
                </h4>
                <code className="text-xs sm:text-sm font-mono text-[#177A47] block bg-white p-2.5 rounded-lg border border-[#D3EBDB]">
                  Estimated Value = Round(Weight × Reference Price × Quality Factor)
                </code>
                <p className="text-xs text-[#5D7065] mt-2">
                  All monetary calculations are performed server-side with verified regional benchmark pricing.
                </p>
              </div>

              {/* 3 Value Statuses */}
              <div>
                <h4 className="font-semibold text-xs text-[#0F1F17] uppercase tracking-wider mb-2.5">
                  Three Non-Conflated Statuses
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#FFF3D6]/70 border border-[#FFE2A4]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9A5B00] mt-1 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs text-[#9A5B00]">1. Estimasi (Estimate)</div>
                      <div className="text-xs text-[#704200]">
                        Indicative range based on user declaration before physical inspection.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#E3F0FA]/70 border border-[#BDE0FE]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2F6F9F] mt-1 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs text-[#2F6F9F]">2. Dalam Proses (In Progress)</div>
                      <div className="text-xs text-[#1E4A6D]">
                        Handover request dispatched to certified collector or recycling partner.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#E3F5EA]/70 border border-[#B8E6CB]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#177A47] mt-1 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs text-[#177A47]">3. Terkonfirmasi (Confirmed)</div>
                      <div className="text-xs text-[#0B4A2B]">
                        Physical scale verification complete; immutable ledger transaction credited.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The 6 Value Factors */}
              <div>
                <h4 className="font-semibold text-xs text-[#0F1F17] uppercase tracking-wider mb-2">
                  The 6 Value Determinants
                </h4>
                <ul className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    '1. Material Type (Polymer/Alloy)',
                    '2. Cleanliness & Contamination',
                    '3. Sorting Precision',
                    '4. Net Measured Weight',
                    '5. Regional Industrial Demand',
                    '6. Collection & Logistics Distance',
                  ].map((factor) => (
                    <li key={factor} className="flex items-center gap-1.5 p-2 rounded-lg bg-[#F8FCF9] border border-[#D3EBDB]/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#177A47] shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full bg-[#0F1F17] hover:bg-[#177A47] text-white text-xs font-semibold shadow-md transition-colors"
                >
                  Understood
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Tooltip.Provider>
  );
}
