'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Sparkles,
  Truck,
  Building2,
  Leaf,
  Info,
  Scale,
  ArrowRight,
} from 'lucide-react';

interface MaterialOption {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  basePrice: number;
  feCo2: number; // kg CO2e saved per kg
  icon: string;
  unit: string;
}

const SIMULATION_MATERIALS: MaterialOption[] = [
  {
    id: 'pet',
    name: 'Botol Plastik PET Bening',
    shortTag: 'PET #1',
    category: 'Plastik',
    basePrice: 3800,
    feCo2: 1.5,
    icon: '🍶',
    unit: 'kg',
  },
  {
    id: 'kardus',
    name: 'Kardus Box Corrugated (Kraft)',
    shortTag: 'Kardus Kraft',
    category: 'Kertas',
    basePrice: 2200,
    feCo2: 1.1,
    icon: '📦',
    unit: 'kg',
  },
  {
    id: 'kaleng',
    name: 'Kaleng Minuman Aluminium',
    shortTag: 'Aluminium',
    category: 'Logam',
    basePrice: 14500,
    feCo2: 9.0,
    icon: '🥫',
    unit: 'kg',
  },
  {
    id: 'jelantah',
    name: 'Minyak Jelantah (UCO)',
    shortTag: 'UCO Biodiesel',
    category: 'Bio-energi',
    basePrice: 7500,
    feCo2: 2.6,
    icon: '🍳',
    unit: 'liter',
  },
  {
    id: 'hdpe',
    name: 'Jerigen & Botol HDPE #2',
    shortTag: 'HDPE #2',
    category: 'Plastik',
    basePrice: 4200,
    feCo2: 1.8,
    icon: '🧴',
    unit: 'kg',
  },
  {
    id: 'hvs',
    name: 'Kertas HVS & Arsip Putih',
    shortTag: 'HVS Arsip',
    category: 'Kertas',
    basePrice: 2800,
    feCo2: 1.3,
    icon: '📄',
    unit: 'kg',
  },
];

type QualityGrade = 'A' | 'B' | 'C';
type LogisticsType = 'dropoff' | 'pickup';

export function FormulaPipelineSection() {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('pet');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade>('A');
  const [logisticsType, setLogisticsType] = useState<LogisticsType>('pickup');
  const [weight, setWeight] = useState<number>(10);

  const selectedMaterial = useMemo(
    () =>
      SIMULATION_MATERIALS.find((m) => m.id === selectedMaterialId) ||
      SIMULATION_MATERIALS[0],
    [selectedMaterialId]
  );

  const gradeMultiplier = useMemo(() => {
    switch (selectedGrade) {
      case 'A':
        return 1.0;
      case 'B':
        return 0.85;
      case 'C':
        return 0.65;
    }
  }, [selectedGrade]);

  const logisticsFee = logisticsType === 'pickup' ? 500 : 0;

  // Formula Calculations:
  // Gross Price = BasePrice * GradeMultiplier
  // Net Price / kg = Gross Price - LogisticsFee
  const grossPricePerKg = Math.round(selectedMaterial.basePrice * gradeMultiplier);
  const netPricePerKg = Math.max(0, grossPricePerKg - logisticsFee);
  const totalPayout = netPricePerKg * weight;
  const co2Avoided = (selectedMaterial.feCo2 * weight).toFixed(1);
  const ecoPointsEarned = Math.round(
    totalPayout / 100 + selectedMaterial.feCo2 * weight * 10
  );

  return (
    <section id="formula-simulator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* ── Section Title (Serif Style from Reference) ── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4E1] border border-[#D5E3BD] text-[#3B5433] text-xs font-bold uppercase tracking-widest mb-3">
          <Calculator className="w-3.5 h-3.5 text-[#7EA02A]" />
          <span>FORMULASI MATEMATIS NILAI BERSIH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1C2E1F] tracking-tight">
          Transparansi Dari Timbangan Hingga Dompet Warga
        </h2>
        <p className="text-sm sm:text-base text-[#4F674D] text-center mt-3 max-w-2xl mx-auto font-normal">
          Setiap rupiah yang Anda terima dihitung melalui formula terbuka yang
          dapat diuji langsung di bawah ini.
        </p>
      </div>

      {/* ── Formula Card Container (Warm Natural Eco Card) ── */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-[0_15px_45px_rgba(28,46,31,0.06)] border border-[#E2EBD3] relative">
        {/* ── The 4 Connected Visual Formula Blocks ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
          {/* Block A (Market Price) */}
          <motion.div
            layout
            className="bg-[#F8FAF3] border border-[#DFE8D1] p-6 rounded-2xl flex flex-col gap-2 flex-1 w-full lg:w-auto shadow-2xs hover:border-[#7EA02A] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#6D8A65]">
                Langkah 1
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-[#EEF4E1] text-[#3B5433] border border-[#D5E3BD]">
                Base Index
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#23381D]">
              Harga Dasar B2B
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#1C2E1F]">
              Rp {selectedMaterial.basePrice.toLocaleString('id-ID')}
              <span className="text-xs text-[#6D8A65] font-sans font-normal ml-1">
                /{selectedMaterial.unit}
              </span>
            </div>
            <p className="text-[11px] text-[#556F4F] leading-relaxed">
              Indeks agregat pembeli &amp; pabrik daur ulang nasional.
            </p>
          </motion.div>

          {/* Operator 1 */}
          <div className="flex items-center justify-center shrink-0">
            <span className="text-[#7EA02A] font-mono text-2xl font-black px-3 py-1 bg-[#EEF4E1] rounded-xl border border-[#D5E3BD]">
              ×
            </span>
          </div>

          {/* Block B (Quality Grade) */}
          <motion.div
            layout
            className="bg-[#F8FAF3] border border-[#DFE8D1] p-6 rounded-2xl flex flex-col gap-2 flex-1 w-full lg:w-auto shadow-2xs hover:border-[#7EA02A] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#6D8A65]">
                Langkah 2
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${
                  selectedGrade === 'A'
                    ? 'bg-[#EEF4E1] text-[#3B5433] border-[#D5E3BD]'
                    : selectedGrade === 'B'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                Grade {selectedGrade}
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#23381D]">
              Faktor Kualitas (A/B/C)
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#1C2E1F]">
              {Math.round(gradeMultiplier * 100)}%
              <span className="text-xs text-[#6D8A65] font-sans font-normal ml-1.5">
                ({gradeMultiplier.toFixed(2)}x)
              </span>
            </div>
            <p className="text-[11px] text-[#556F4F] leading-relaxed">
              Inspeksi kebersihan, kadar air, &amp; minim kontaminan.
            </p>
          </motion.div>

          {/* Operator 2 */}
          <div className="flex items-center justify-center shrink-0">
            <span className="text-rose-600 font-mono text-2xl font-black px-3 py-1 bg-rose-50 rounded-xl border border-rose-200">
              -
            </span>
          </div>

          {/* Block C (Logistics SLA) */}
          <motion.div
            layout
            className="bg-[#F8FAF3] border border-[#DFE8D1] p-6 rounded-2xl flex flex-col gap-2 flex-1 w-full lg:w-auto shadow-2xs hover:border-[#7EA02A] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#6D8A65]">
                Langkah 3
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200">
                Logistik SLA
              </span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#23381D]">
              Biaya Armada / Jemput
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-rose-600">
              Rp {logisticsFee.toLocaleString('id-ID')}
              <span className="text-xs text-[#6D8A65] font-sans font-normal ml-1">
                /{selectedMaterial.unit}
              </span>
            </div>
            <p className="text-[11px] text-[#556F4F] leading-relaxed">
              {logisticsFee === 0
                ? 'Drop-off langsung ke mitra (Rp 0 / Bebas Potongan).'
                : 'Biaya BBM & armada kurir terjadwal ke rumah.'}
            </p>
          </motion.div>

          {/* Operator 3 */}
          <div className="flex items-center justify-center shrink-0">
            <span className="text-[#7EA02A] font-mono text-2xl font-black px-3 py-1 bg-[#EEF4E1] rounded-xl border border-[#D5E3BD]">
              =
            </span>
          </div>

          {/* Block D (Final Net Payout - Signature Olive Accent Card) */}
          <motion.div
            layout
            className="bg-[#7EA02A] text-white p-6 rounded-2xl flex flex-col gap-2 flex-1 w-full lg:w-auto shadow-lg shadow-[#7EA02A]/25 border border-white/20 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#F0F7D4]">
                Hasil Bersih
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/25 text-white font-mono font-bold">
                Net Payout
              </span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#F4F9DE]">
              Nilai Bersih Warga
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-white">
              Rp {netPricePerKg.toLocaleString('id-ID')}
              <span className="text-xs text-[#E5F1BE] font-sans font-normal ml-1">
                /{selectedMaterial.unit}
              </span>
            </div>
            <p className="text-[11px] text-[#E7F3B5] leading-relaxed font-light">
              Nominal bersih diterima per kilogram langsung ke EcoWallet.
            </p>
          </motion.div>
        </div>

        {/* ── Interactive Simulation Controls ── */}
        <div className="mt-12 pt-8 border-t border-[#DFE8D1] relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-[#1C2E1F] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7EA02A]" />
                <span>Simulasi Interaktif Real-Time</span>
              </h3>
              <p className="text-xs text-[#526D48] mt-1 font-normal">
                Uji coba berbagai kombinasi material, mutu sortir, bobot, dan metode serah terima.
              </p>
            </div>

            {/* Total Payout Summary Pill */}
            <div className="px-6 py-3.5 rounded-2xl bg-[#1C2E1F] text-white shadow-md flex items-center gap-4">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#A2C798]">
                  Estimasi Total Terima ({weight} {selectedMaterial.unit})
                </div>
                <div className="text-2xl font-mono font-black text-[#A4D437]">
                  Rp {totalPayout.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#A2C798]">
                  Reduksi CO₂e
                </div>
                <div className="text-sm font-mono font-bold text-[#E7F3B5] flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  {co2Avoided} kg
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Control 1: Pilih Material */}
            <div className="md:col-span-12 lg:col-span-5 space-y-2">
              <label className="text-xs font-bold text-[#23381D] uppercase tracking-wider flex items-center justify-between">
                <span>1. Pilih Sampah Material</span>
                <span className="text-[10px] font-bold text-[#3B5433] bg-[#EEF4E1] px-2.5 py-0.5 rounded-full border border-[#D5E3BD]">
                  {selectedMaterial.category}
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SIMULATION_MATERIALS.map((mat) => {
                  const isActive = mat.id === selectedMaterialId;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setSelectedMaterialId(mat.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#EEF4E1] border-[#7EA02A] text-[#1C2E1F] shadow-xs ring-2 ring-[#7EA02A]/20'
                          : 'bg-[#F8FAF3] border-[#DFE8D1] text-[#334A2F] hover:border-[#CCDDB1] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-base mb-1">
                        <span>{mat.icon}</span>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-[#7EA02A]" />
                        )}
                      </div>
                      <div className="text-xs font-bold truncate">
                        {mat.name}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[#7EA02A] mt-1">
                        Rp {mat.basePrice.toLocaleString('id-ID')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Quality Grade */}
            <div className="md:col-span-6 lg:col-span-3 space-y-2">
              <label className="text-xs font-bold text-[#23381D] uppercase tracking-wider flex items-center justify-between">
                <span>2. Mutu Kualitas</span>
                <span className="text-[10px] text-[#556F4F] font-medium">
                  {selectedGrade === 'A'
                    ? '100% Value'
                    : selectedGrade === 'B'
                    ? '85% Value'
                    : '65% Value'}
                </span>
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGrade('A')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedGrade === 'A'
                      ? 'bg-[#EEF4E1] border-[#7EA02A] shadow-2xs ring-1 ring-[#7EA02A]/30'
                      : 'bg-[#F8FAF3] border-[#DFE8D1] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#1C2E1F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7EA02A]" />
                      Grade A (Prima)
                    </div>
                    <div className="text-[10px] text-[#526D48]">
                      Bersih, kering, tanpa kontaminan
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#3B5433]">
                    100%
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGrade('B')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedGrade === 'B'
                      ? 'bg-amber-50 border-amber-400 shadow-2xs'
                      : 'bg-[#F8FAF3] border-[#DFE8D1] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#1C2E1F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Grade B (Standar)
                    </div>
                    <div className="text-[10px] text-[#526D48]">
                      Sedikit debu/label belum lepas
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-700">
                    85%
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGrade('C')}
                  className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedGrade === 'C'
                      ? 'bg-rose-50 border-rose-400 shadow-2xs'
                      : 'bg-[#F8FAF3] border-[#DFE8D1] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#1C2E1F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Grade C (Campur)
                    </div>
                    <div className="text-[10px] text-[#526D48]">
                      Tercampur residu / lembab
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-700">
                    65%
                  </span>
                </button>
              </div>
            </div>

            {/* Control 3: Logistics & Weight Slider */}
            <div className="md:col-span-6 lg:col-span-4 space-y-4">
              {/* Delivery method */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#23381D] uppercase tracking-wider flex items-center justify-between">
                  <span>3. Metode Penyaluran</span>
                  <span className="text-[10px] text-[#556F4F] font-medium">
                    {logisticsType === 'dropoff' ? 'Bebas Biaya' : 'SLA Kurir'}
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLogisticsType('dropoff')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      logisticsType === 'dropoff'
                        ? 'bg-[#EEF4E1] border-[#7EA02A] text-[#1C2E1F] font-bold shadow-2xs'
                        : 'bg-[#F8FAF3] border-[#DFE8D1] text-[#476142] hover:bg-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mx-auto mb-1 text-[#7EA02A]" />
                    <div className="text-xs">Drop-off Mitra</div>
                    <div className="text-[10px] text-[#3B5433] font-mono">
                      Rp 0 / kg
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLogisticsType('pickup')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      logisticsType === 'pickup'
                        ? 'bg-blue-50 border-blue-400 text-blue-950 font-bold shadow-2xs'
                        : 'bg-[#F8FAF3] border-[#DFE8D1] text-[#476142] hover:bg-white'
                    }`}
                  >
                    <Truck className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <div className="text-xs">Jemput Armada</div>
                    <div className="text-[10px] text-rose-600 font-mono">
                      -Rp 500 / kg
                    </div>
                  </button>
                </div>
              </div>

              {/* Weight Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#23381D] uppercase tracking-wider">
                  <span>4. Estimasi Bobot</span>
                  <span className="text-[#7EA02A] font-mono text-sm font-bold">
                    {weight} {selectedMaterial.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-[#7EA02A] cursor-pointer h-2 bg-[#D5E3BD] rounded-lg appearance-none"
                />
                <div className="flex items-center justify-between text-[10px] text-[#556F4F] font-mono">
                  <span>1 {selectedMaterial.unit}</span>
                  <div className="flex gap-1.5">
                    {[5, 10, 25, 50].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWeight(preset)}
                        className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                          weight === preset
                            ? 'bg-[#7EA02A] border-[#7EA02A] text-white font-bold'
                            : 'border-[#DFE8D1] hover:border-[#CCDDB1] text-[#476142] bg-white'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <span>100 {selectedMaterial.unit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Micro Summary Callout Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-[#EEF4E1] border border-[#D5E3BD] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#2A4225]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#7EA02A] shrink-0" />
              <span>
                Perhitungan:{' '}
                <span className="font-mono font-bold text-[#1C2E1F]">
                  (Rp {selectedMaterial.basePrice.toLocaleString('id-ID')} ×{' '}
                  {gradeMultiplier.toFixed(2)}) - Rp{' '}
                  {logisticsFee.toLocaleString('id-ID')} = Rp{' '}
                  {netPricePerKg.toLocaleString('id-ID')}
                </span>{' '}
                × {weight} {selectedMaterial.unit}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#3B5433] font-mono font-bold shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#7EA02A]" />
              <span>+{ecoPointsEarned} EcoPoints</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
