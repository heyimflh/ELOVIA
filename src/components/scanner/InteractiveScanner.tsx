'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useSpring,
} from 'framer-motion';
import {
  Scale,
  Sparkles,
  Info,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  RotateCcw,
  Camera,
  Upload,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Layers,
  Droplets,
  TrendingUp,
  Truck,
  Leaf,
  FileText,
  Scan,
} from 'lucide-react';
import Link from 'next/link';
import { cartActions } from '@/lib/cart-store';

// =========================================================================
// TYPES & DATA STRUCTURES (100% PRESERVED LOGIC)
// =========================================================================

export interface SubCategory {
  id: string;
  name: string;
  tag: string;
  minPrice: number;
  maxPrice: number;
  feCo2: number; // kg CO2e saved per kg
}

export interface MaterialCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  color: string;
  glowColor: string;
  badge: string;
  subcategories: SubCategory[];
  sortingGuide: {
    dos: string[];
    donts: string[];
  };
}

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: 'paper',
    title: 'Paper & Cardboard',
    subtitle: 'Kertas & Kardus Bekas',
    icon: '📦',
    image: '/images/materials/paper_cardboard.jpg',
    color: '#DEA123',
    glowColor: 'rgba(222, 161, 35, 0.35)',
    badge: 'Recyclability 92%',
    subcategories: [
      { id: 'box', name: 'Kardus Box Corrugated (Kraft)', tag: 'Kraft Box', minPrice: 1600, maxPrice: 2400, feCo2: 1.1 },
      { id: 'hvs', name: 'Kertas HVS & Arsip Putih', tag: 'HVS Putih', minPrice: 2000, maxPrice: 3200, feCo2: 1.3 },
      { id: 'news', name: 'Koran, Majalah & Brosur', tag: 'Koran/Buku', minPrice: 1200, maxPrice: 1800, feCo2: 0.9 },
      { id: 'bag', name: 'Paper Bag & Kraft Cokelat', tag: 'Paper Bag', minPrice: 1000, maxPrice: 1700, feCo2: 0.8 },
    ],
    sortingGuide: {
      dos: [
        'Jaga tetap kering dan bersih dari tumpahan minyak/cairan',
        'Ratakan/lipat kardus box untuk memaksimalkan efisiensi ruang',
        'Lepas lakban tebal dan perekat plastik bila memungkinkan',
        'Pisahkan kertas putih HVS dari kertas cetak berkromosom warna',
      ],
      donts: [
        'Kertas basah, berjamur, atau bekas pembungkus nasi berminyak',
        'Kertas struk belanja (thermal paper mengandung BPA)',
        'Kertas bercampur sisa makanan atau sampah organik',
      ],
    },
  },
  {
    id: 'plastic',
    title: 'Plastic',
    subtitle: 'Plastik Terpilah SNI',
    icon: '🍶',
    image: '/images/materials/plastic.jpg',
    color: '#0E7C7B',
    glowColor: 'rgba(14, 124, 123, 0.35)',
    badge: 'High Value',
    subcategories: [
      { id: 'pet-clear', name: 'Botol Minuman PET Bening', tag: 'PET #1', minPrice: 2800, maxPrice: 4200, feCo2: 1.5 },
      { id: 'pp-cup', name: 'Gelas PP Minuman (Cup)', tag: 'PP #5', minPrice: 2200, maxPrice: 3400, feCo2: 1.4 },
      { id: 'hdpe', name: 'Jerigen & Botol Sabun HDPE', tag: 'HDPE #2', minPrice: 3000, maxPrice: 4800, feCo2: 1.8 },
      { id: 'caps', name: 'Tutup Botol & Ember Plastik', tag: 'Rigid Plastic', minPrice: 1500, maxPrice: 2600, feCo2: 1.2 },
    ],
    sortingGuide: {
      dos: [
        'Kosongkan cairan dan bilas bersih dengan air mengalir',
        'Ratakan/injak botol plastik untuk menghemat ruang penyimpanan',
        'Pisahkan tutup botol dan segel plastik bila diminta mitra',
        'Pastikan ada tanda kode segitiga daur ulang (PET #1, HDPE #2, PP #5)',
      ],
      donts: [
        'Plastik sachet multilayer (kemasan renceng kopi/snack alupoil)',
        'Plastik berminyak yang tidak dibilas (bekas oli/lem keras)',
        'Selang dan infus medis PVC rumah sakit (kategori B3)',
      ],
    },
  },
  {
    id: 'metal',
    title: 'Metal & Can',
    subtitle: 'Logam & Kaleng',
    icon: '🥫',
    image: '/images/materials/metal.jpg',
    color: '#4A5D52',
    glowColor: 'rgba(74, 93, 82, 0.35)',
    badge: 'Infinitely Recyclable',
    subcategories: [
      { id: 'alu-can', name: 'Kaleng Minuman Aluminium', tag: 'Aluminium', minPrice: 12000, maxPrice: 16500, feCo2: 9.0 },
      { id: 'iron-pipe', name: 'Besi Padat, Siku & Pipa', tag: 'Besi Cor/Siku', minPrice: 3500, maxPrice: 5200, feCo2: 1.8 },
      { id: 'zinc', name: 'Seng & Plat Logam Campur', tag: 'Seng Plat', minPrice: 2000, maxPrice: 3600, feCo2: 1.5 },
      { id: 'copper', name: 'Tembaga Kabel Kupas Merah', tag: 'Tembaga #1', minPrice: 75000, maxPrice: 95000, feCo2: 4.2 },
    ],
    sortingGuide: {
      dos: [
        'Bilas kaleng dari sisa cairan manis atau soda',
        'Pipihkan kaleng minuman aluminium untuk mempermudah penimbangan',
        'Pisahkan logam non-ferrous (aluminium) dari logam yang menempel magnet',
        'Kumpulkan paku dan kawat dalam kaleng tertutup demi keselamatan',
      ],
      donts: [
        'Kaleng bekas pestisida, racun serangga, atau cat berbahan kimia keras',
        'Tabung gas atau kaleng aerosol bertekanan yang belum dilubangi',
        'Logam tajam terbuka tanpa pengaman penanganan kurir',
      ],
    },
  },
  {
    id: 'glass',
    title: 'Glass',
    subtitle: 'Botol & Pecahan Kaca',
    icon: '🍾',
    image: '/images/materials/glass.jpg',
    color: '#177A47',
    glowColor: 'rgba(23, 122, 71, 0.35)',
    badge: 'Closed-Loop',
    subcategories: [
      { id: 'glass-clear', name: 'Botol Kaca Bening / Transparan', tag: 'Flint Glass', minPrice: 600, maxPrice: 1200, feCo2: 0.35 },
      { id: 'glass-amber', name: 'Botol Kaca Cokelat (Amber)', tag: 'Amber Glass', minPrice: 700, maxPrice: 1400, feCo2: 0.38 },
      { id: 'glass-green', name: 'Botol Kaca Hijau', tag: 'Green Glass', minPrice: 500, maxPrice: 1000, feCo2: 0.32 },
      { id: 'glass-cullet', name: 'Pecahan Kaca Bersortir (Cullet)', tag: 'Cullet Sortir', minPrice: 300, maxPrice: 600, feCo2: 0.25 },
    ],
    sortingGuide: {
      dos: [
        'Bilas bersih dan tiriskan hingga kering tanpa kerak lumut',
        'Pisahkan botol berdasarkan warna (bening, cokelat, hijau)',
        'Lepas tutup gabus atau ring metal di leher botol bila memungkinkan',
        'Bungkus pecahan kaca dengan kardus kokoh dan beri label peringatan',
      ],
      donts: [
        'Mencampur kaca jendela lembaran atau cermin dengan botol kemasan',
        'Mencampur keramik, porselen, atau kaca tahan panas (Pyrex/Borosilikat)',
        'Lampu neon / tabung fluorescent (mengandung merkuri B3 berbahaya)',
      ],
    },
  },
];

export type QualityLevel = 'clean' | 'fair' | 'dirty';

export interface QualityOption {
  id: QualityLevel;
  label: string;
  multiplierText: string;
  factor: number;
  description: string;
  impactText: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
  {
    id: 'clean',
    label: 'Bersih & Kering',
    multiplierText: '1.0x',
    factor: 1.0,
    description: 'Bilas bersih, tanpa sisa makanan/cairan, kering & siap olah',
    impactText: 'Nilai acuan maksimal 100% tanpa potongan sortir',
  },
  {
    id: 'fair',
    label: 'Cukup Terpilah',
    multiplierText: '0.85x',
    factor: 0.85,
    description: 'Terpilah sesuai kategori, ada sedikit debu/label wajar',
    impactText: 'Potongan wajar 15% untuk biaya tenaga sortir sekunder',
  },
  {
    id: 'dirty',
    label: 'Kotor / Lembab',
    multiplierText: '0.60x',
    factor: 0.6,
    description: 'Berminyak, basah, atau bercampur sisa noda pekat',
    impactText: 'Potongan 40% karena butuh pencucian intensif & susut timbang',
  },
];

export const VALUE_FACTORS_LIST = [
  {
    num: '01',
    title: 'Jenis Material',
    desc: 'Spesifikasi polimer/serat menentukan harga bahan baku industri daur ulang.',
    icon: Layers,
    color: 'text-amber-700 bg-amber-50',
  },
  {
    num: '02',
    title: 'Kondisi Fisik',
    desc: 'Keutuhan bentuk mempermudah proses pencacahan mekanis di fasilitas mitra.',
    icon: Sparkles,
    color: 'text-[#177A47] bg-mint-100',
  },
  {
    num: '03',
    title: 'Tingkat Kebersihan',
    desc: 'Bebas kontaminan minyak & bahan kimia menaikkan faktor pengali kualitas (Fq).',
    icon: Droplets,
    color: 'text-[#0E7C7B] bg-teal-50',
  },
  {
    num: '04',
    title: 'Berat & Akumulasi',
    desc: 'Volume terpilah lebih besar memberikan posisi tawar & efisiensi logistik.',
    icon: Scale,
    color: 'text-emerald-700 bg-emerald-50',
  },
  {
    num: '05',
    title: 'Permintaan Pasar',
    desc: 'Kebutuhan pabrik daur ulang secara regional mempengaruhi harga acuan berkala.',
    icon: TrendingUp,
    color: 'text-indigo-700 bg-indigo-50',
  },
  {
    num: '06',
    title: 'Biaya Pengumpulan',
    desc: 'Jarak drop-off atau penjemputan mitra mempengaruhi penawaran bersih.',
    icon: Truck,
    color: 'text-rose-700 bg-rose-50',
  },
];

// Quick weight chips
const QUICK_WEIGHTS = [1, 5, 10, 20, 50];

// =========================================================================
// HELPER: SPRING NUMBER COMPONENT (Framer Motion useSpring interpolation)
// =========================================================================
function SpringNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const spring = useSpring(value, { damping: 28, stiffness: 140, mass: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
    const unsubscribe = spring.on('change', (latest) => {
      setDisplay(latest);
    });
    return () => unsubscribe();
  }, [value, spring]);

  return (
    <>
      {decimals > 0
        ? display.toFixed(decimals)
        : Math.round(display).toLocaleString('id-ID')}
    </>
  );
}

// =========================================================================
// IMPACT GARDEN SEEDLING REACTIVE SVG ILLUSTRATION
// Prominent upgraded visual: dynamic botanical growth and reactive aura
// =========================================================================
function ReactiveSeedling({ weightKg }: { weightKg: number }) {
  // Normalize scale between 1.0 and 1.45 based on weight
  const targetScale = Math.min(1.45, 1.0 + Math.log10(Math.max(1, weightKg * 1.6)) * 0.16);
  const scaleSpring = useSpring(targetScale, { damping: 20, stiffness: 120 });
  const [currentScale, setCurrentScale] = useState(targetScale);

  useEffect(() => {
    scaleSpring.set(targetScale);
    const unsubscribe = scaleSpring.on('change', (latest) => {
      setCurrentScale(latest);
    });
    return () => unsubscribe();
  }, [targetScale, scaleSpring]);

  return (
    <div className="relative flex flex-col items-center justify-center py-3 select-none">
      {/* Dynamic ambient botanical aura glow */}
      <motion.div
        style={{
          scale: currentScale * 1.25,
          opacity: Math.min(0.9, 0.45 + (currentScale - 1.0) * 0.9),
        }}
        className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#A9D3B8] via-[#2FA866]/35 to-[#0E7C7B]/25 blur-2xl pointer-events-none -z-10"
      />

      {/* Upgraded High-Fidelity SVG Seedling */}
      <motion.svg
        style={{ scale: currentScale }}
        width="118"
        height="102"
        viewBox="0 0 118 102"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-150 drop-shadow-[0_8px_20px_rgba(23,122,71,0.22)]"
      >
        {/* Soft shadow below clay pot */}
        <ellipse cx="59" cy="94" rx="36" ry="6" fill="#177A47" fillOpacity="0.12" />

        {/* Claymorphic Pot Base with Rich Tonal Depth */}
        <ellipse cx="59" cy="89" rx="30" ry="7" fill="#D3EBDB" />
        <path
          d="M34 68 L42 89 C42 92 76 92 76 89 L84 68 Z"
          fill="url(#clayPotGrad)"
          stroke="#A9D3B8"
          strokeWidth="1.6"
        />
        {/* Clay Pot Rim Highlight */}
        <ellipse cx="59" cy="68" rx="26" ry="6" fill="#E8F4EC" stroke="#A9D3B8" strokeWidth="1.2" />
        {/* Rich Soil Layer */}
        <ellipse cx="59" cy="68" rx="22" ry="4.5" fill="#2E1F14" />
        <ellipse cx="59" cy="67" rx="19" ry="3.5" fill="#4A3423" />
        <ellipse cx="58" cy="66.5" rx="14" ry="2" fill="#6B4F36" opacity="0.8" />

        {/* Organic Stem */}
        <path
          d="M59 67 C59 52 57 38 59 26"
          stroke="url(#stemGrad)"
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Left Leaf with Delicate Vein and Sunlight Rim */}
        <path
          d="M59 46 C42 42 28 28 34 14 C48 16 56 34 59 46 Z"
          fill="url(#leafLeftGrad)"
          stroke="#0F5F37"
          strokeWidth="1.4"
        />
        <path
          d="M59 46 C50 36 43 27 36 17"
          stroke="#D3EBDB"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Left Leaf Dewdrop Glint */}
        <circle cx="43" cy="24" r="1.8" fill="#FFFFFF" opacity="0.9" />
        <circle cx="43" cy="24" r="2.8" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />

        {/* Right Leaf with Lush Curvature */}
        <path
          d="M59 36 C76 33 90 19 84 5 C68 8 61 24 59 36 Z"
          fill="url(#leafRightGrad)"
          stroke="#0F5F37"
          strokeWidth="1.4"
        />
        <path
          d="M59 36 C69 26 76 17 82 8"
          stroke="#D3EBDB"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Right Leaf Highlight Speck */}
        <circle cx="73" cy="16" r="1.5" fill="#FFFFFF" opacity="0.85" />

        {/* Golden Apex Sprout Bud */}
        <path
          d="M59 26 C54 18 56 10 59 6 C62 10 64 18 59 26 Z"
          fill="url(#budGrad)"
          stroke="#177A47"
          strokeWidth="1.2"
        />
        <circle cx="59" cy="14" r="2.2" fill="#E3F6B5" />
        <circle cx="59.5" cy="13.5" r="1" fill="#FFFFFF" />

        {/* Gradients */}
        <defs>
          <linearGradient id="clayPotGrad" x1="34" y1="68" x2="84" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.4" stopColor="#E8F4EC" />
            <stop offset="0.85" stopColor="#D3EBDB" />
            <stop offset="1" stopColor="#A9D3B8" />
          </linearGradient>
          <linearGradient id="stemGrad" x1="59" y1="67" x2="59" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F5F37" />
            <stop offset="0.5" stopColor="#177A47" />
            <stop offset="1" stopColor="#2FA866" />
          </linearGradient>
          <linearGradient id="leafLeftGrad" x1="30" y1="14" x2="59" y2="46" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86EFAC" />
            <stop offset="0.4" stopColor="#2FA866" />
            <stop offset="0.8" stopColor="#177A47" />
            <stop offset="1" stopColor="#0B4A2B" />
          </linearGradient>
          <linearGradient id="leafRightGrad" x1="86" y1="5" x2="59" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#BBF7D0" />
            <stop offset="0.4" stopColor="#4ADE80" />
            <stop offset="0.8" stopColor="#177A47" />
            <stop offset="1" stopColor="#0F5F37" />
          </linearGradient>
          <linearGradient id="budGrad" x1="56" y1="6" x2="62" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF08A" />
            <stop offset="0.6" stopColor="#A3E635" />
            <stop offset="1" stopColor="#2FA866" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Reactive growth capsule */}
      <div className="text-[11px] font-mono font-semibold text-[#177A47] bg-white/90 px-3 py-0.5 rounded-full shadow-[0_2px_8px_rgba(23,122,71,0.12)] mt-1.5 backdrop-blur-xs">
        Impact Growth: {Math.round(currentScale * 100)}%
      </div>
    </div>
  );
}

// =========================================================================
// MAIN COMPONENT: INTERACTIVE SCANNER WIDGET
// Award-winning Premium "Dreamy Fresh Green Tech" B2C Redesign
// =========================================================================
export function InteractiveScanner() {
  // 1. Form Inputs State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('plastic');
  const [selectedSubId, setSelectedSubId] = useState<string>('pet-clear');
  const [weightKg, setWeightKg] = useState<number>(3.5);
  const [quality, setQuality] = useState<QualityLevel>('clean');

  // Local photo upload preview (PRD Rule FR-SCN-16: purely local preview, no server upload)
  const [photoPreview, setPhotoPreview] = useState<{ url: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. State Machine for Right Column ('idle' | 'scanning' | 'result')
  const [scannerState, setScannerState] = useState<'idle' | 'scanning' | 'result'>('result');
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Accordion toggle states on Result Card
  const [openAccordions, setOpenAccordions] = useState<{
    math: boolean;
    factors: boolean;
    guide: boolean;
  }>({
    math: true,
    factors: false,
    guide: false,
  });

  // Cart toast/feedback state
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  // Derived category & subcategory objects
  const activeCategory = useMemo(
    () => MATERIAL_CATEGORIES.find((c) => c.id === selectedCategoryId) || MATERIAL_CATEGORIES[0],
    [selectedCategoryId]
  );

  const activeSubcategory = useMemo(() => {
    const found = activeCategory.subcategories.find((s) => s.id === selectedSubId);
    return found || activeCategory.subcategories[0];
  }, [activeCategory, selectedSubId]);

  const activeQuality = useMemo(
    () => QUALITY_OPTIONS.find((q) => q.id === quality) || QUALITY_OPTIONS[0],
    [quality]
  );

  // Eco stage title based on weight
  const ecoStageTitle = useMemo(() => {
    if (weightKg < 5) return 'Level 1: Tunas Muda';
    if (weightKg < 20) return 'Level 2: Bibit Unggul';
    if (weightKg < 50) return 'Level 3: Tanaman Subur';
    return 'Level 4: Pohon Lestari';
  }, [weightKg]);

  // Auto-align subcategory when category changes
  const handleCategorySelect = (catId: string) => {
    setSelectedCategoryId(catId);
    const cat = MATERIAL_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubId(cat.subcategories[0].id);
    }
  };

  const handleSubSelect = (subId: string) => {
    setSelectedSubId(subId);
  };

  // 3. Calculation Logic (PRD 10.4)
  const estimatedMin = Math.round(activeSubcategory.minPrice * weightKg * activeQuality.factor);
  const estimatedMax = Math.round(activeSubcategory.maxPrice * weightKg * activeQuality.factor);
  const co2Reduction = (activeSubcategory.feCo2 * weightKg).toFixed(1);

  // Stepper & Weight handler
  const handleWeightChange = (newVal: number) => {
    const clamped = Math.max(0.1, Math.min(500, Number(newVal.toFixed(1))));
    setWeightKg(clamped);
    setAddedToCart(false);
  };

  // Trigger 1.5s scanning state machine
  const triggerScanSequence = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScannerState('scanning');
    setAddedToCart(false);
    scanTimerRef.current = setTimeout(() => {
      setScannerState('result');
    }, 1500);
  };

  // Skip scanning immediately
  const handleSkipScan = () => {
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    setScannerState('result');
  };

  // Photo upload handling (strictly local preview)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview({ url, name: file.name });
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview.url);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Add to cart handler
  const handleAddToCart = () => {
    setAddedToCart(true);
    cartActions.addItem({
      id: `cart-item-${Date.now()}`,
      materialId: activeSubcategory.id,
      name: activeSubcategory.name,
      category: activeCategory.title,
      tag: activeSubcategory.tag,
      weightKg: weightKg,
      qualityGrade: `${activeQuality.label} ${activeQuality.multiplierText}`,
      qualityMultiplier: activeQuality.factor,
      minPricePerKg: activeSubcategory.minPrice,
      maxPricePerKg: activeSubcategory.maxPrice,
      totalMinPrice: estimatedMin,
      totalMaxPrice: estimatedMax,
      co2ePerKg: activeSubcategory.feCo2,
      totalCo2e: Number(co2Reduction),
      image: activeCategory.image,
      icon: activeCategory.icon,
      color: activeCategory.color,
      badge: activeCategory.badge,
    });
    setTimeout(() => setAddedToCart(false), 3000);
  };

  // Reset all states back to default (Cek Material Lain)
  const handleResetAll = () => {
    setSelectedCategoryId('plastic');
    setSelectedSubId('pet-clear');
    setWeightKg(3.5);
    setQuality('clean');
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview.url);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setScannerState('idle');
    setAddedToCart(false);
  };

  // Accordion toggle
  const toggleAccordion = (key: 'math' | 'factors' | 'guide') => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="scanner-section"
      className="relative py-16 sm:py-24 lg:py-28 overflow-hidden bg-transparent scroll-mt-12 select-none"
    >
      {/* =========================================================================
          1. TRUE AMBIENT BACKGROUND WITH MASSIVE HIGHLY BLURRED CSS ORBS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        {/* Subtle dot-grid texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="scanner-ambient-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#34D399" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scanner-ambient-grid)" />
        </svg>

        {/* Massive Blurred Ambient Orb 1: Emerald glow */}
        <motion.div
          animate={{
            x: [0, 45, -30, 0],
            y: [0, -35, 25, 0],
            scale: [1, 1.1, 0.96, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[12vw] -left-[10vw] w-[40vw] h-[40vw] rounded-full bg-emerald-500/20 blur-[140px]"
        />

        {/* Massive Blurred Ambient Orb 2: Teal glow */}
        <motion.div
          animate={{
            x: [0, -40, 35, 0],
            y: [0, 40, -25, 0],
            scale: [1, 1.12, 1, 1],
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[12vw] -right-[10vw] w-[40vw] h-[40vw] rounded-full bg-teal-400/20 blur-[140px]"
        />

        {/* Center Dreamy Atmosphere Glow */}
        <motion.div
          animate={{
            scale: [1, 1.14, 0.98, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34vw] h-[34vw] rounded-full bg-lime-300/15 blur-[130px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Soft Glass Container for Section Hero Header */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-6 sm:p-8 mb-10 sm:mb-12 shadow-lg text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Kalkulator & Pemindai Acuan Harga</span>
          </div>
          <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-md">
            Pindai Potensi Nilai Sampah Anda
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-emerald-100/90 font-jakarta leading-relaxed max-w-2xl mx-auto">
            Pilih kategori material, tentukan berat dengan slider presisi, dan pantau pertumbuhan
            nilai serta dampak bibit lingkungan secara seketika.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: THE MAIN CALCULATOR DASHBOARD (TRUE GLASS CONTAINER)
              Cols 1 to 7 - Translucent frosted glass with high contrast
              ===================================================================== */}
          <motion.div
            layout
            className="lg:col-span-7 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.15)] space-y-8 text-white"
          >
            
            {/* -------------------------------------------------------------------
                SECTION 1: TACTILE MATERIAL CATEGORIES
                ------------------------------------------------------------------- */}
            <motion.div layout className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs border border-emerald-400/40">
                    1
                  </span>
                  <h3 className="font-fraunces text-xl sm:text-2xl font-bold text-white">
                    Pilih Kategori Material
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-100 bg-white/15 border border-white/20 px-3 py-1 rounded-full shadow-2xs hidden sm:inline">
                  SNI Terpadu (4 Kategori)
                </span>
              </div>

              {/* 4 Translucent Category Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 pt-1">
                {MATERIAL_CATEGORIES.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId;
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      whileHover={{ scale: isSelected ? 1.05 : 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        scale: isSelected ? 1.05 : 1,
                      }}
                      className={`relative group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 cursor-pointer focus:outline-none backdrop-blur-md border ${
                        isSelected
                          ? 'bg-emerald-500/80 text-white border-emerald-400 shadow-[0_12px_28px_rgba(16,185,129,0.35)] ring-2 ring-emerald-300 ring-offset-2 ring-offset-black/20'
                          : 'bg-white/20 text-white hover:bg-white/30 border-white/30 shadow-sm'
                      }`}
                    >
                      {/* 3D Thumbnail Frame */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden mb-3 border border-white/40 shadow-[0_6px_16px_rgba(0,0,0,0.25)] group-hover:rotate-1 transition-transform duration-200">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-white leading-tight mb-1 font-jakarta">
                        {cat.title}
                      </span>
                      <span className="text-[10px] text-emerald-100/90 line-clamp-1 font-jakarta">
                        {cat.subtitle}
                      </span>

                      {/* Selected Checkmark Pill */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white text-emerald-800 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)] font-bold"
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Sub-Category Chips */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  layout
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2.5 mt-2 shadow-inner">
                    <div className="flex items-center justify-between text-xs text-emerald-200 font-semibold font-jakarta">
                      <span>Pilih Sub-jenis Material {activeCategory.title}:</span>
                      <span className="text-[11px] font-mono text-emerald-100/80 font-normal hidden sm:inline">
                        Spesifikasi acuan industri daur ulang
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {activeCategory.subcategories.map((sub) => {
                        const isSubSelected = sub.id === selectedSubId;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSubSelect(sub.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                              isSubSelected
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] ring-2 ring-emerald-300 border-emerald-300/50'
                                : 'bg-white/15 hover:bg-white/25 text-white/90 border-white/20 shadow-xs'
                            }`}
                          >
                            <span className="text-[10px] font-mono opacity-80">{sub.tag}</span>
                            <span className="font-semibold">{sub.name}</span>
                            {isSubSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

              {/* -------------------------------------------------------------------
                  SECTION 2: CUSTOM PREMIUM WEIGHT SLIDER & QUALITY CONTROLS
                  ------------------------------------------------------------------- */}
              <motion.div layout className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-white text-xs font-bold font-mono flex items-center justify-center shadow-xs border border-emerald-400/40">
                    2
                  </span>
                  <h3 className="font-fraunces text-xl sm:text-2xl font-bold text-white">
                    Tentukan Berat & Kualitas
                  </h3>
                </div>

                {/* Weight Control Container with Soft Tint (bg-white/10 backdrop-blur-md) */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-inner">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="weight-slider"
                      className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-jakarta"
                    >
                      <Scale className="w-4 h-4 text-emerald-300" />
                      Estimasi Berat Material
                    </label>
                    <span className="text-[11px] font-mono text-emerald-200 bg-white/15 border border-white/25 px-2.5 py-1 rounded-full shadow-2xs">
                      Rentang: 0,1 – 500 kg
                    </span>
                  </div>

                  {/* Big Live Weight Display Pill */}
                  <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                    <button
                      type="button"
                      onClick={() => handleWeightChange(weightKg - 0.5)}
                      disabled={weightKg <= 0.1}
                      aria-label="Kurangi berat 0.5 kg"
                      className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 flex items-center justify-center shadow-xs transition-transform active:scale-95 disabled:opacity-30 cursor-pointer font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] tracking-tight">
                        <SpringNumber value={weightKg} decimals={1} />
                      </span>
                      <span className="font-mono text-lg text-emerald-100/90 font-semibold">
                        kg
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleWeightChange(weightKg + 0.5)}
                      disabled={weightKg >= 500}
                      aria-label="Tambah berat 0.5 kg"
                      className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 flex items-center justify-center shadow-xs transition-transform active:scale-95 disabled:opacity-30 cursor-pointer font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* CUSTOM PREMIUM WEIGHT SLIDER */}
                  <div className="space-y-2 pt-1">
                    <div className="relative flex items-center h-8">
                      {/* Base Track */}
                      <div className="w-full h-3 rounded-full bg-white/20 border border-white/25 overflow-hidden">
                        {/* Gradient Filled Track */}
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 transition-all duration-75 shadow-[0_0_15px_rgba(52,211,153,0.7)]"
                          style={{
                            width: `${Math.min(100, Math.max(0, ((Math.min(100, weightKg) - 0.1) / (100 - 0.1)) * 100))}%`,
                          }}
                        />
                      </div>

                      {/* Custom Range Input */}
                      <input
                        id="weight-slider"
                        type="range"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={Math.min(100, weightKg)}
                        onChange={(e) => handleWeightChange(parseFloat(e.target.value) || 0.1)}
                        className="dreamy-range-slider absolute inset-0 w-full h-full"
                        aria-label="Estimasi Berat Sampah"
                      />
                    </div>

                    <div className="flex justify-between text-[11px] font-mono text-emerald-100/80 px-1">
                      <span>0.1 kg</span>
                      <span>25 kg</span>
                      <span>50 kg</span>
                      <span>75 kg</span>
                      <span>100+ kg</span>
                    </div>
                  </div>

                  {/* Quick Weight Pills */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <span className="text-xs text-emerald-100/80 mr-1 font-jakarta font-medium">
                      Pilihan Cepat:
                    </span>
                    {QUICK_WEIGHTS.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleWeightChange(amt)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer border ${
                          weightKg === amt
                            ? 'bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)] ring-2 ring-emerald-300 border-emerald-300/50'
                            : 'bg-white/15 hover:bg-white/25 text-white/90 border-white/20 shadow-2xs'
                        }`}
                      >
                        {amt} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Radio Selection */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-jakarta">
                      <Sparkles className="w-4 h-4 text-emerald-300" />
                      Kondisi & Kebersihan Material
                    </label>
                    <span className="text-[11px] font-mono text-emerald-200">
                      Faktor Kualitas (Fq)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {QUALITY_OPTIONS.map((q) => {
                      const isSelected = q.id === quality;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            setQuality(q.id);
                            setAddedToCart(false);
                          }}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 focus:outline-none backdrop-blur-md border ${
                            isSelected
                              ? 'bg-emerald-500/30 border-2 border-emerald-400 ring-2 ring-emerald-300/40 shadow-[0_8px_24px_rgba(16,185,129,0.3)] text-white'
                              : 'bg-white/15 hover:bg-white/25 border border-white/25 text-white/90 shadow-sm'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm font-bold text-white">{q.label}</span>
                              <span
                                className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                                  isSelected
                                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-2xs'
                                    : 'bg-white/20 text-emerald-200 border border-white/20'
                                }`}
                              >
                                {q.multiplierText}
                              </span>
                            </div>
                            <p className="text-xs text-white/80">{q.description}</p>
                            <p className="text-[11px] text-emerald-300 font-medium pt-0.5 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
                              {q.impactText}
                            </p>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors border ${
                              isSelected
                                ? 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-xs'
                                : 'bg-white/10 border-white/30 text-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* HOLOGRAPHIC SCAN ZONE */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-7 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 font-jakarta">
                      <Camera className="w-4 h-4 text-emerald-300" />
                      Zona Pindai Foto (Opsional)
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-emerald-200 shadow-2xs">
                      Pratinjau Lokal
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="scanner-photo-input"
                  />

                  {/* Holographic Scan Container with Soft Glow Scan Line */}
                  <div
                    onClick={() => !photoPreview && fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-emerald-400/50 bg-white/10 hover:bg-white/15 backdrop-blur-md overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer group shadow-sm text-white"
                  >
                    {/* Holographic Tech Brackets */}
                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-400/70 rounded-tl pointer-events-none" />
                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-emerald-400/70 rounded-tr pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-emerald-400/70 rounded-bl pointer-events-none" />
                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-emerald-400/70 rounded-br pointer-events-none" />

                    {/* Animated Holographic Teal Scan Line */}
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-300 to-transparent shadow-[0_0_15px_rgba(45,212,191,0.9)] z-10 pointer-events-none"
                      animate={{
                        top: ['6%', '92%', '6%'],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-10 h-2 bg-teal-300/50 blur-xs rounded-full" />
                    </motion.div>

                    {photoPreview ? (
                      <div className="relative z-0 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-xs shrink-0 border border-white/30">
                            <Image
                              src={photoPreview.url}
                              alt="Pratinjau foto lokal"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white truncate max-w-[200px]">
                              {photoPreview.name}
                            </div>
                            <div className="text-[11px] text-emerald-300 font-medium mt-0.5 flex items-center gap-1.5 font-mono">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Pratinjau visual aktif
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          aria-label="Hapus foto pratinjau"
                          className="p-2 rounded-xl text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-2.5 relative z-0">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 mx-auto flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform mb-2.5 shadow-xs">
                          <Upload className="w-5 h-5 text-emerald-300" />
                        </div>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors font-jakarta">
                          Unggah Foto (Opsional)
                        </p>
                        <p className="text-[11px] text-emerald-100/80 mt-1">
                          Klik atau seret file foto kemasan Anda ke sini (PNG, JPG, WebP)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* PRD Disclaimer */}
                  <div className="flex items-start gap-2 text-[11px] text-white/80 bg-white/15 border border-white/25 p-3 rounded-2xl shadow-2xs leading-relaxed font-jakarta">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                    <span>
                      <strong>Prinsip Kejujuran Sistem:</strong> Foto hanya digunakan sebagai
                      pratinjau lokal di peramban Anda dan tidak diunggah ke server maupun
                      dianalisis oleh AI otomatis.
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* =====================================================================
                RIGHT COLUMN: THE RESULT CARD (FLOATING HOLOGRAPHIC GLASS RECEIPT)
                - Holographic glowing receipt: bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-3xl border border-white/40 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.2)] sticky top-28 sm:top-32
                - Price glowing gradient: text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]
                - Cart CTA button: bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold backdrop-blur-md border border-emerald-400/50 shadow-lg hover:shadow-emerald-500/40
                ===================================================================== */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 sm:lg:top-32 space-y-5">
              <div className="relative rounded-[2.5rem] bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(16,185,129,0.2)] overflow-hidden p-6 sm:p-8 space-y-5 text-white">
                <AnimatePresence mode="wait">
                  
                  {/* STATE A: IDLE STATE */}
                  {scannerState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35 }}
                      className="py-4 text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 mx-auto flex items-center justify-center text-emerald-300 shadow-md">
                        <Scan className="w-8 h-8 animate-pulse text-emerald-300" />
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-fraunces text-2xl font-bold text-white">
                          Kalkulator Siap Memindai
                        </h4>
                        <p className="text-xs text-white/80 max-w-sm mx-auto leading-relaxed font-jakarta">
                          Pilih jenis material dan tentukan perkiraan berat di kolom kiri untuk
                          menjalankan estimasi nilai berdasarkan harga acuan terbaru.
                        </p>
                      </div>

                      {/* Current Selection summary chip */}
                      <div className="p-4 rounded-2xl bg-white/15 border border-white/25 text-left text-xs space-y-1 shadow-sm">
                        <div className="text-[10px] uppercase font-mono text-emerald-200">
                          Pilihan Saat Ini:
                        </div>
                        <div className="font-bold text-white text-sm">
                          {activeSubcategory.name}
                        </div>
                        <div className="flex items-center gap-2 text-white/80 font-mono text-[11px] pt-0.5">
                          <span>{weightKg} kg</span>
                          <span>•</span>
                          <span>{activeQuality.label}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={triggerScanSequence}
                        className="w-full py-4 px-5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm backdrop-blur-md border border-emerald-400/50 shadow-lg hover:shadow-emerald-500/40 transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-200" />
                        <span>Periksa Estimasi Nilai</span>
                      </button>
                    </motion.div>
                  )}

                  {/* STATE B: SCANNING STATE */}
                  {scannerState === 'scanning' && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative py-4 min-h-[380px] flex flex-col justify-between overflow-hidden"
                    >
                      {/* Top status & Skip button */}
                      <div className="flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-200 bg-white/15 border border-white/25 px-3 py-1 rounded-full font-medium shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>Pemeriksaan Data Acuan</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleSkipScan}
                          className="text-xs font-semibold text-white/90 hover:text-white px-3 py-1 rounded-full bg-white/20 border border-white/30 shadow-2xs transition-colors cursor-pointer"
                        >
                          Lewati →
                        </button>
                      </div>

                      {/* Animated Scanning Viewport with Teal Scanning Line */}
                      <div className="relative my-6 h-52 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden flex flex-col items-center justify-center shadow-inner">
                        <div className="absolute inset-0 bg-eco-grid opacity-25" />

                        {/* Animated Glowing Teal Scanning Line */}
                        <motion.div
                          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent z-10 shadow-[0_0_14px_rgba(52,211,153,0.9)]"
                          animate={{
                            top: ['8%', '88%', '8%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-8 h-2 bg-emerald-300/50 blur-xs rounded-full" />
                        </motion.div>

                        {/* Scanned Material Indicator */}
                        <div className="relative z-0 text-center space-y-2.5 p-4">
                          <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 mx-auto flex items-center justify-center text-3xl shadow-xs">
                            {activeCategory.icon}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">
                              {activeSubcategory.name}
                            </div>
                            <div className="text-xs font-mono text-emerald-200 mt-0.5">
                              {weightKg} kg · {activeQuality.label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Text indicator */}
                      <div className="text-center space-y-1.5 z-10">
                        <p className="text-sm font-semibold text-white flex items-center justify-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                          Memeriksa data harga acuan...
                        </p>
                        <p className="text-[11px] text-white/70 max-w-xs mx-auto">
                          Mencocokkan spesifikasi material dengan harga acuan agregator daur ulang
                          tervalidasi.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE C: FINAL RESULT RECEIPT CARD */}
                  {scannerState === 'result' && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-5"
                    >
                      {/* Receipt Header Bar */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                          </span>
                          <span className="font-mono text-xs font-bold tracking-wider uppercase text-emerald-300">
                            Estimasi Nilai ELOVIA
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-white/80 bg-white/15 border border-white/25 px-3 py-1 rounded-full shadow-2xs">
                          Acuan per 31 Okt 2026
                        </span>
                      </div>

                      {/* Impact Garden Box */}
                      <div className="relative rounded-2xl bg-white/15 backdrop-blur-xl border border-white/30 p-6 sm:p-7 flex flex-col items-center justify-center text-center overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]">
                        {/* Ambient botanical aura */}
                        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-lime-300/25 via-emerald-400/20 to-teal-500/15 blur-2xl pointer-events-none" />

                        {/* Impact Garden Top Tag */}
                        <div className="relative z-10 flex items-center justify-between w-full mb-2">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-200 font-semibold bg-white/20 border border-white/25 px-3 py-1 rounded-full shadow-2xs">
                            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                            Impact Garden Visual
                          </span>
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500 text-white font-bold shadow-xs border border-emerald-300/40">
                            {ecoStageTitle}
                          </span>
                        </div>

                        {/* Dynamic Reactive Seedling SVG */}
                        <ReactiveSeedling weightKg={weightKg} />

                        {/* Impact Stats in the Box */}
                        <div className="relative z-10 mt-3 pt-3 border-t border-white/30 w-full flex items-center justify-between text-xs">
                          <span className="text-white/80 font-jakarta">Reduksi Jejak Karbon:</span>
                          <span className="font-mono font-bold text-emerald-300 text-sm">
                            ≈ <SpringNumber value={parseFloat(co2Reduction)} decimals={1} /> kg CO₂e
                          </span>
                        </div>
                      </div>

                      {/* Selected Material Summary Strip */}
                      <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-xl shrink-0">
                            {activeCategory.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono text-emerald-200 uppercase">
                              {activeCategory.title}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-white truncate">
                              {activeSubcategory.name}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono text-xs font-bold text-emerald-300">
                            <SpringNumber value={weightKg} decimals={1} /> kg
                          </div>
                          <div className="text-[10px] text-emerald-200 font-mono">
                            Fq: {activeQuality.multiplierText}
                          </div>
                        </div>
                      </div>

                      {/* MASSIVE PRICE TYPOGRAPHY WITH GLOWING TECH GRADIENT */}
                      <div className="py-5 px-5 rounded-2xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-center space-y-2">
                        <div className="text-[11px] text-emerald-200 font-bold uppercase tracking-wider font-jakarta">
                          Estimasi Nilai Ekonomi
                        </div>
                        <div className="font-mono text-3xl sm:text-4xl lg:text-[2.65rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-100 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] tracking-tight leading-tight">
                          ≈ Rp <SpringNumber value={estimatedMin} />
                          <span className="text-emerald-200/60 font-light mx-2">–</span>
                          <SpringNumber value={estimatedMax} />
                        </div>
                        <p className="text-[11px] text-white/70 pt-0.5">
                          *Kisaran nilai indikatif dari agregator & bank sampah terverifikasi.
                        </p>
                      </div>

                      {/* COMPLETELY BORDERLESS ACCORDIONS */}
                      <div className="space-y-1.5 pt-1">
                        {/* Accordion 1: Bagaimana dihitung? */}
                        <div className="rounded-2xl overflow-hidden transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleAccordion('math')}
                            className="w-full py-3 px-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white rounded-2xl hover:bg-white/15 transition-colors cursor-pointer group"
                          >
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-emerald-300" />
                              Bagaimana angka ini dihitung?
                            </span>
                            <div className={`transition-transform duration-200 ${openAccordions.math ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-emerald-300" />
                            </div>
                          </button>

                          <AnimatePresence>
                            {openAccordions.math && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden px-4 py-3 text-xs space-y-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
                              >
                                <div className="space-y-1.5 font-mono text-[11px] text-white/90">
                                  <div className="p-2.5 rounded-xl bg-white/15 border border-white/20 shadow-2xs">
                                    <strong className="text-emerald-200">Formula:</strong> Nilai = Berat (kg) × Harga Acuan × Fq
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-white/15 border border-white/20 shadow-2xs space-y-1">
                                    <div>
                                      <strong className="text-emerald-200">Min:</strong> {weightKg} kg × Rp{' '}
                                      {activeSubcategory.minPrice.toLocaleString('id-ID')} ×{' '}
                                      {activeQuality.factor} ={' '}
                                      <span className="text-emerald-300 font-bold">
                                        Rp <SpringNumber value={estimatedMin} />
                                      </span>
                                    </div>
                                    <div>
                                      <strong className="text-emerald-200">Maks:</strong> {weightKg} kg × Rp{' '}
                                      {activeSubcategory.maxPrice.toLocaleString('id-ID')} ×{' '}
                                      {activeQuality.factor} ={' '}
                                      <span className="text-emerald-300 font-bold">
                                        Rp <SpringNumber value={estimatedMax} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-[11px] text-white/70 font-jakarta leading-relaxed">
                                  ELOVIA mengedepankan transparansi: angka di atas adalah perkiraan
                                  acuan sebelum material ditimbang nyata oleh mitra penerima.
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Accordion 2: 6 Faktor Penentu Nilai */}
                        <div className="rounded-2xl overflow-hidden transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleAccordion('factors')}
                            className="w-full py-3 px-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white rounded-2xl hover:bg-white/15 transition-colors cursor-pointer group"
                          >
                            <span className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-emerald-300" />
                              6 Faktor Penentu Nilai (PRD 7.4)
                            </span>
                            <div className={`transition-transform duration-200 ${openAccordions.factors ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-emerald-300" />
                            </div>
                          </button>

                          <AnimatePresence>
                            {openAccordions.factors && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden px-4 py-3 text-xs space-y-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
                              >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {VALUE_FACTORS_LIST.map((factor) => {
                                    const IconComp = factor.icon;
                                    return (
                                      <div
                                        key={factor.num}
                                        className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition-colors text-[11px] shadow-2xs"
                                      >
                                        <div className="flex items-center gap-2 font-bold text-white mb-1">
                                          <div
                                            className="w-5 h-5 rounded-lg flex items-center justify-center bg-white/20 text-emerald-300"
                                          >
                                            <IconComp className="w-3 h-3" />
                                          </div>
                                          <span>{factor.title}</span>
                                        </div>
                                        <p className="text-[10px] text-white/80 leading-snug">
                                          {factor.desc}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Accordion 3: Panduan Pemilahan */}
                        <div className="rounded-2xl overflow-hidden transition-colors">
                          <button
                            type="button"
                            onClick={() => toggleAccordion('guide')}
                            className="w-full py-3 px-3.5 flex items-center justify-between text-xs sm:text-sm font-semibold text-white rounded-2xl hover:bg-white/15 transition-colors cursor-pointer group"
                          >
                            <span className="flex items-center gap-2">
                              <Leaf className="w-4 h-4 text-emerald-300" />
                              Panduan Pemilahan {activeCategory.title}
                            </span>
                            <div className={`transition-transform duration-200 ${openAccordions.guide ? 'rotate-180' : ''}`}>
                              <ChevronDown className="w-4 h-4 text-white/70 group-hover:text-emerald-300" />
                            </div>
                          </button>

                          <AnimatePresence>
                            {openAccordions.guide && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden px-4 py-3 text-xs space-y-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
                              >
                                {/* DOs */}
                                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/30 space-y-1.5">
                                  <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Lakukan:
                                  </div>
                                  <ul className="space-y-1 text-[11px] text-white/90 pl-1">
                                    {activeCategory.sortingGuide.dos.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-emerald-300 font-bold">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* DONTs */}
                                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/30 space-y-1.5">
                                  <div className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    Hindari:
                                  </div>
                                  <ul className="space-y-1 text-[11px] text-white/90 pl-1">
                                    {activeCategory.sortingGuide.donts.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-rose-400 font-bold">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="space-y-2.5 pt-2">
                        {/* Primary Button: Tambah ke Keranjang */}
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className={`w-full py-4 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.99] backdrop-blur-md border ${
                            addedToCart
                              ? 'bg-emerald-700 text-white border-emerald-400'
                              : 'bg-emerald-600/90 hover:bg-emerald-500 text-white border-emerald-400/50 hover:shadow-emerald-500/40'
                          }`}
                        >
                          {addedToCart ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Berhasil Disimpan ke Keranjang!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              <span>Tambah ke Keranjang Material</span>
                            </>
                          )}
                        </button>

                        {/* Secondary Button: Lihat Mitra yang Menerima */}
                        <Link
                          href={`/pasar?material=${activeCategory.id}`}
                          className="w-full py-3.5 px-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm border border-white/30 backdrop-blur-md"
                        >
                          <span>Lihat Mitra yang Menerima</span>
                          <ExternalLink className="w-4 h-4 text-emerald-300" />
                        </Link>

                        {/* Tertiary Button: Cek Material Lain */}
                        <button
                          type="button"
                          onClick={handleResetAll}
                          className="w-full py-2.5 px-4 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Cek Material Lain (Mulai Ulang)</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Verified Partner Network Trust Banner */}
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xs text-xs text-white/80">
                <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className="leading-snug">
                  Data harga diperbarui mingguan dari jaringan bank sampah dan agregator daur ulang
                  tersertifikasi di Jabodetabek & sekitarnya.
                </span>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
