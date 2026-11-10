'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  AlertTriangle,
  Clock,
  AlertCircle,
  Save,
  Package,
  Milk,
  Droplets,
  Layers,
  FileText,
  Check,
  Search,
  Filter,
  Sparkles,
  RefreshCw,
  Info,
  TrendingUp,
} from 'lucide-react';
import { useMitra } from './MitraContext';

export interface PricingMaterial {
  id: string;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minPriceInput: string;
  maxPriceInput: string;
  isStale: boolean;
  freshnessLabel: string;
  daysAgo: number;
  iconType: 'box' | 'bottle' | 'droplet' | 'metal' | 'paper';
  benchmark: string;
  unit: string;
  isDirty?: boolean;
  justSaved?: boolean;
}

const INITIAL_MATERIALS: PricingMaterial[] = [
  {
    id: 'mat-1',
    name: 'Kardus Cokelat',
    category: 'Kertas & Kardus',
    minPrice: 1800,
    maxPrice: 2400,
    minPriceInput: '1.800',
    maxPriceInput: '2.400',
    isStale: false,
    freshnessLabel: 'Diperbarui 2 hari lalu',
    daysAgo: 2,
    iconType: 'box',
    benchmark: 'Acuan SNI: Rp 1.700 – 2.500',
    unit: 'kg',
  },
  {
    id: 'mat-2',
    name: 'Botol PET',
    category: 'Plastik Daur Ulang',
    minPrice: 3200,
    maxPrice: 4500,
    minPriceInput: '3.200',
    maxPriceInput: '4.500',
    isStale: true,
    freshnessLabel: 'Usang (>14 hari)',
    daysAgo: 16,
    iconType: 'bottle',
    benchmark: 'Acuan SNI: Rp 3.000 – 4.600',
    unit: 'kg',
  },
  {
    id: 'mat-3',
    name: 'Minyak Jelantah',
    category: 'Minyak & Organik',
    minPrice: 6500,
    maxPrice: 8000,
    minPriceInput: '6.500',
    maxPriceInput: '8.000',
    isStale: true,
    freshnessLabel: 'Usang (>14 hari)',
    daysAgo: 18,
    iconType: 'droplet',
    benchmark: 'Acuan Industri: Rp 6.000 – 8.200',
    unit: 'liter',
  },
  {
    id: 'mat-4',
    name: 'Kertas HVS Putih',
    category: 'Kertas & Kardus',
    minPrice: 2000,
    maxPrice: 2800,
    minPriceInput: '2.000',
    maxPriceInput: '2.800',
    isStale: false,
    freshnessLabel: 'Diperbarui 3 hari lalu',
    daysAgo: 3,
    iconType: 'paper',
    benchmark: 'Acuan SNI: Rp 1.900 – 2.900',
    unit: 'kg',
  },
  {
    id: 'mat-5',
    name: 'Kaleng Aluminium',
    category: 'Logam & Kaleng',
    minPrice: 12000,
    maxPrice: 15500,
    minPriceInput: '12.000',
    maxPriceInput: '15.500',
    isStale: false,
    freshnessLabel: 'Diperbarui 5 hari lalu',
    daysAgo: 5,
    iconType: 'metal',
    benchmark: 'Acuan Industri: Rp 11.500 – 16.000',
    unit: 'kg',
  },
  {
    id: 'mat-6',
    name: 'Plastik HDPE (Tutup Botol)',
    category: 'Plastik Daur Ulang',
    minPrice: 4000,
    maxPrice: 5200,
    minPriceInput: '4.000',
    maxPriceInput: '5.200',
    isStale: false,
    freshnessLabel: 'Diperbarui kemarin',
    daysAgo: 1,
    iconType: 'bottle',
    benchmark: 'Acuan SNI: Rp 3.800 – 5.500',
    unit: 'kg',
  },
];

// Helper to format numeric strings with thousand separators (id-ID)
function formatThousand(val: string): string {
  const digits = val.replace(/\D/g, '');
  if (!digits) return '';
  return new Intl.NumberFormat('id-ID').format(parseInt(digits, 10));
}

// Helper to parse numeric string back to integer
function parseThousand(val: string): number {
  const digits = val.replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export function MitraPricingManager() {
  const { addToast } = useMitra();
  const [materials, setMaterials] = useState<PricingMaterial[]>(INITIAL_MATERIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);

  // Dynamic stale count
  const staleCount = useMemo(() => {
    return materials.filter((m) => m.isStale).length;
  }, [materials]);

  // Categories for filtering
  const categories = useMemo(() => {
    const set = new Set(materials.map((m) => m.category));
    return ['all', ...Array.from(set)];
  }, [materials]);

  // Filtered materials
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all'
          ? true
          : selectedCategory === 'stale'
          ? m.isStale
          : m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [materials, searchQuery, selectedCategory]);

  // Handle Input Changes
  const handleInputChange = (
    id: string,
    field: 'minPriceInput' | 'maxPriceInput',
    value: string
  ) => {
    const formatted = formatThousand(value);
    setMaterials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: formatted,
            isDirty: true,
          };
        }
        return item;
      })
    );
  };

  // Handle Save Single Row
  const handleSaveRow = (id: string) => {
    const target = materials.find((m) => m.id === id);
    if (!target) return;

    const minNum = parseThousand(target.minPriceInput);
    const maxNum = parseThousand(target.maxPriceInput);

    if (minNum > maxNum) {
      addToast({
        title: 'Rentang Harga Tidak Valid',
        description: `Harga minimum (Rp ${target.minPriceInput}) tidak boleh lebih besar dari harga maksimum (Rp ${target.maxPriceInput}).`,
        type: 'error',
      });
      return;
    }

    setMaterials((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            minPrice: minNum,
            maxPrice: maxNum,
            isStale: false,
            freshnessLabel: 'Diperbarui baru saja',
            daysAgo: 0,
            isDirty: false,
            justSaved: true,
          };
        }
        return item;
      })
    );

    addToast({
      title: 'Harga Berhasil Disimpan',
      description: `Rentang harga untuk ${target.name} (Rp ${target.minPriceInput} – Rp ${target.maxPriceInput}) telah disinkronkan ke katalog publik.`,
      type: 'success',
    });

    // Reset justSaved animation after 2.5s
    setTimeout(() => {
      setMaterials((prev) =>
        prev.map((m) => (m.id === id ? { ...m, justSaved: false } : m))
      );
    }, 2500);
  };

  // Handle "Perbarui Sekarang" CTA (Batch Update Stale Prices)
  const handleUpdateAllStale = async () => {
    if (staleCount === 0) {
      addToast({
        title: 'Semua Harga Masih Segar',
        description: 'Tidak ada material dengan harga kedaluwarsa (>14 hari) saat ini.',
        type: 'info',
      });
      return;
    }

    setIsBatchUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setMaterials((prev) =>
      prev.map((item) => {
        if (item.isStale) {
          return {
            ...item,
            isStale: false,
            freshnessLabel: 'Diperbarui hari ini',
            daysAgo: 0,
            isDirty: false,
            justSaved: true,
          };
        }
        return item;
      })
    );

    setIsBatchUpdating(false);

    addToast({
      title: 'Seluruh Harga Usang Diperbarui',
      description: `${staleCount} material usang telah diperbarui ke tanggal hari ini sesuai konfirmasi mitra.`,
      type: 'success',
    });

    setTimeout(() => {
      setMaterials((prev) => prev.map((m) => ({ ...m, justSaved: false })));
    }, 2500);
  };

  // Material Icon Renderer
  const renderMaterialIcon = (type: PricingMaterial['iconType']) => {
    switch (type) {
      case 'box':
        return <Package className="w-6 h-6 text-emerald-600" />;
      case 'bottle':
        return <Milk className="w-6 h-6 text-emerald-600" />;
      case 'droplet':
        return <Droplets className="w-6 h-6 text-emerald-600" />;
      case 'metal':
        return <Layers className="w-6 h-6 text-emerald-600" />;
      case 'paper':
      default:
        return <FileText className="w-6 h-6 text-emerald-600" />;
    }
  };

  // Framer Motion Variants for Staggering
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
  };

  return (
    <div className="w-full flex flex-col font-jakarta">
      {/* ── 1. Header Area ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Katalog Harga Material
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola rentang harga beli indikatif per kilogram.
          </p>
        </div>

        {/* SNI Reference Standard Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 border border-white/60 shadow-2xs backdrop-blur-md">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-700">
            Standar SNI 19-3964-1994
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* ── 2. The "Stale Price" Warning Banner (Crucial PRD Requirement) ── */}
      <AnimatePresence>
        {staleCount > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
            className="bg-amber-50/70 backdrop-blur-md border border-amber-200 shadow-sm rounded-[1.5rem] p-5 flex items-center gap-4 mt-6 mb-8"
          >
            <AlertTriangle className="text-amber-600 w-6 h-6 shrink-0" />
            <div>
              <div className="text-amber-900 font-medium">
                Ada {staleCount} material yang harganya belum diperbarui lebih dari 14 hari.
              </div>
              <div className="text-amber-700/80 text-sm">
                Pembaruan rutin meningkatkan kepercayaan warga.
              </div>
            </div>

            <button
              type="button"
              onClick={handleUpdateAllStale}
              disabled={isBatchUpdating}
              className="ml-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer disabled:opacity-70 active:scale-95"
            >
              {isBatchUpdating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Memperbarui...
                </>
              ) : (
                'Perbarui Sekarang'
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50/70 backdrop-blur-md border border-emerald-200 shadow-sm rounded-[1.5rem] p-4.5 flex items-center justify-between gap-4 mt-6 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-950">
                  Seluruh harga material telah terbarui & prima!
                </p>
                <p className="text-xs text-emerald-700/80">
                  Harga indikatif aktif ditampilkan pada direktori warga & kalkulator scanner.
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200/60 hidden sm:inline-block">
              100% UP TO DATE
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. Search Bar & Category Filter Pills ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white/60 text-slate-600 hover:bg-white/90 border border-white/50'
            }`}
          >
            Semua ({materials.length})
          </button>

          {staleCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedCategory('stale')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'stale'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-100/70 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <AlertCircle size={13} />
              Perlu Update ({staleCount})
            </button>
          )}

          {categories
            .filter((c) => c !== 'all')
            .map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white/60 text-slate-600 hover:bg-white/90 border border-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Search input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari material..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/70 border border-white/60 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs backdrop-blur-sm"
          />
        </div>
      </div>

      {/* ── 4. The Pricing List (Stacked Rows) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-4"
      >
        {filteredMaterials.map((item) => {
          // Dynamic classes based on stale status
          const rowBaseClass = item.isStale
            ? 'bg-amber-50/40 hover:bg-amber-50/70 backdrop-blur-xl border border-amber-300 shadow-sm rounded-2xl p-5 transition-all duration-300 group grid grid-cols-1 md:grid-cols-12 gap-6 items-center'
            : 'bg-white/70 hover:bg-white/95 backdrop-blur-xl border border-white/60 shadow-sm rounded-2xl p-5 transition-all duration-300 group grid grid-cols-1 md:grid-cols-12 gap-6 items-center';

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={rowBaseClass}
            >
              {/* 1. Material Info (col-span-3) */}
              <div className="col-span-1 md:col-span-3 flex items-center gap-3.5">
                {/* Icon Box: Soft green rounded square with a generic box/bottle icon */}
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center shrink-0 shadow-2xs">
                  {renderMaterialIcon(item.iconType)}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 truncate tracking-tight text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* 2. Price Range Inputs (col-span-5 flex justify-center) */}
              <div className="col-span-1 md:col-span-5 flex justify-start md:justify-center items-center">
                <div className="flex items-center gap-3 bg-slate-50/50 p-2 rounded-2xl border border-slate-100 shadow-2xs">
                  {/* Min Price Input Wrapper */}
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-mono text-sm pointer-events-none select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={item.minPriceInput}
                      onChange={(e) =>
                        handleInputChange(item.id, 'minPriceInput', e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRow(item.id);
                      }}
                      aria-label={`Harga minimum ${item.name}`}
                      placeholder="0"
                      className="w-32 bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-right pl-10 transition-shadow"
                    />
                  </div>

                  {/* Sleek Separator */}
                  <span className="text-slate-400 font-bold select-none">-</span>

                  {/* Max Price Input Wrapper */}
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400 font-mono text-sm pointer-events-none select-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      value={item.maxPriceInput}
                      onChange={(e) =>
                        handleInputChange(item.id, 'maxPriceInput', e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRow(item.id);
                      }}
                      aria-label={`Harga maksimum ${item.name}`}
                      placeholder="0"
                      className="w-32 bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-right pl-10 transition-shadow"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Freshness Status & Action (col-span-4 flex justify-end items-center gap-6) */}
              <div className="col-span-1 md:col-span-4 flex justify-between md:justify-end items-center gap-6">
                {/* Status Container */}
                <div className="flex flex-col items-start md:items-end">
                  {item.isStale ? (
                    /* Stale Status Container (For Botol PET / expired items) */
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                      <AlertCircle size={14} className="shrink-0" />
                      {item.freshnessLabel}
                    </span>
                  ) : (
                    /* Normal Status Container */
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                      <Clock size={14} className="shrink-0" />
                      {item.freshnessLabel}
                    </span>
                  )}

                  {/* Subtle Benchmark Note */}
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:inline-block">
                    {item.benchmark}
                  </span>
                </div>

                {/* Action Button: Fades and slides in on hover, or stays visible on mobile/dirty state */}
                <button
                  type="button"
                  onClick={() => handleSaveRow(item.id)}
                  aria-label={`Simpan harga ${item.name}`}
                  className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-md shadow-emerald-200 transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0 active:scale-95 ${
                    item.justSaved
                      ? 'bg-emerald-700 opacity-100 transform translate-y-0'
                      : item.isDirty
                      ? 'bg-emerald-600 hover:bg-emerald-700 opacity-100 transform translate-y-0 ring-2 ring-emerald-400/50'
                      : 'bg-emerald-600 hover:bg-emerald-700 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-1 md:group-hover:translate-y-0'
                  }`}
                >
                  {item.justSaved ? (
                    <>
                      <Check size={16} />
                      <span>Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Simpan</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Empty Search Result State */}
        {filteredMaterials.length === 0 && (
          <div className="bg-white/50 border border-white/40 rounded-2xl p-8 text-center backdrop-blur-md">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">
              Tidak ada material yang cocok
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
      </motion.div>

      {/* ── 5. Informative SNI Reference Footer Callout ── */}
      <div className="mt-8 p-4 rounded-2xl bg-white/50 border border-white/40 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            Harga acuan indikatif diperbarui otomatis berdasarkan rata-rata agregasi bursa daur ulang regional Jawa Barat.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 shrink-0">
          Sync SLA: &le; 14 Hari
        </span>
      </div>
    </div>
  );
}

