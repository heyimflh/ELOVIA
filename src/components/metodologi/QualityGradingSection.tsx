'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Droplets,
  Scale,
  ShieldAlert,
  ArrowRight,
  MapPin,
  Compass,
} from 'lucide-react';

interface GradeCard {
  id: 'A' | 'B' | 'C';
  title: string;
  badge: string;
  percent: number;
  multiplier: string;
  image: string;
  cardBg: string;
  buttonBg: string;
  description: string;
  bullets: string[];
}

const GRADES: GradeCard[] = [
  {
    id: 'A',
    title: 'Grade A — Prima',
    badge: '100% NILAI MAKSIMAL',
    percent: 100,
    multiplier: '1.00x',
    image: '/images/materials/plastic.jpg',
    cardBg: 'bg-[#7EA02A]',
    buttonBg: 'bg-[#6D8C24]',
    description:
      'Kering total (< 3% kadar air), bebas minyak & sisa makanan, label/tutup terlepas, dan botol/kardus diratakan rapi.',
    bullets: [
      'Bebas residu minyak & cairan',
      'Kadar air murni < 3% (kering total)',
      'Label & tutup botol dipisahkan',
      'Kardus dilipat rapi hemat volume',
    ],
  },
  {
    id: 'B',
    title: 'Grade B — Standar',
    badge: '85% NILAI STANDAR',
    percent: 85,
    multiplier: '0.85x',
    image: '/images/materials/paper_cardboard.jpg',
    cardBg: 'bg-[#8CAE30]',
    buttonBg: 'bg-[#7B9C27]',
    description:
      'Kering dan terpilah jenisnya, namun masih terdapat label perekat, tutup botol belum dilepas, atau sedikit debu wajar.',
    bullets: [
      'Bebas cairan berat & minyak',
      'Ada label kemasan / lakban tertempel',
      'Kadar air wajar di rentang 4% - 8%',
      'Perlu sortasi ringan di bank sampah',
    ],
  },
  {
    id: 'C',
    title: 'Grade C — Campur',
    badge: '65% NILAI MINIMAL',
    percent: 65,
    multiplier: '0.65x',
    image: '/images/materials/metal.jpg',
    cardBg: 'bg-[#6D8C24]',
    buttonBg: 'bg-[#5D7A1D]',
    description:
      'Material lembab terkena air hujan, kotor bercak tanah, atau tercampur jenis plastik/kertas yang berlainan.',
    bullets: [
      'Kelembaban tinggi / sisa cairan',
      'Belum dipilah menurut kategori',
      'Perlu pencucian & sortir intensif',
      'Potongan 35% untuk biaya sortir mitra',
    ],
  },
];

export function QualityGradingSection() {
  const [activeGradeId, setActiveGradeId] = useState<'A' | 'B' | 'C'>('A');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* ── Section Header (Landscape Maintenance Style from Reference) ── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4E1] border border-[#D5E3BD] text-[#3B5433] text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#7EA02A]" />
          <span>STANDARISASI FISIK MATERIAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1C2E1F] tracking-tight">
          Sistem Penilaian Mutu (Grade A, B, C)
        </h2>
        <p className="text-sm sm:text-base text-[#4F674D] text-center mt-3 max-w-2xl mx-auto font-normal">
          Pelajari kriteria fisik pemilahan agar setoran sampah Anda selalu
          memperoleh kompensasi tertinggi tanpa potongan.
        </p>

        {/* Category Tabs (Like "Landscape Service | Lawn Care | Maintenance" in Reference) */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mt-6 text-xs sm:text-sm font-semibold text-[#556F4F]">
          <span className="text-[#1C2E1F] border-b-2 border-[#7EA02A] pb-1 cursor-pointer">
            Standar Mutu Fisik
          </span>
          <span className="hover:text-[#1C2E1F] transition-colors cursor-pointer">
            Toleransi Kadar Air
          </span>
          <span className="hover:text-[#1C2E1F] transition-colors cursor-pointer">
            Tera Timbangan SNI
          </span>
        </div>
      </div>

      {/* ── 3 Tall Arch Cards (Exact layout from reference bottom-left) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {GRADES.map((grade) => {
          const isActive = activeGradeId === grade.id;

          return (
            <div
              key={grade.id}
              onClick={() => setActiveGradeId(grade.id)}
              className={`flex flex-col rounded-t-[5rem] rounded-b-[2.5rem] overflow-hidden shadow-md transition-all duration-300 group cursor-pointer border-4 ${
                isActive
                  ? 'border-[#7EA02A] ring-4 ring-[#7EA02A]/20 -translate-y-1'
                  : 'border-white hover:border-[#D5E3BD]'
              }`}
            >
              {/* Top Arched Window with Photo */}
              <div className="relative h-64 sm:h-72 w-full bg-[#E5EDDA] overflow-hidden">
                <Image
                  src={grade.image}
                  alt={grade.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Badge Over Photo */}
                <div className="absolute top-6 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-[#1C2E1F] shadow-sm">
                  {grade.badge}
                </div>
              </div>

              {/* Bottom Olive Box (Matching exact reference card style) */}
              <div
                className={`${grade.cardBg} text-white p-7 text-center flex-1 flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2 text-white">
                    {grade.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F0F7D4] leading-relaxed mb-5 font-light">
                    {grade.description}
                  </p>

                  {/* Bullet Checklist */}
                  <div className="space-y-2 text-left bg-black/10 rounded-2xl p-4 mb-6">
                    {grade.bullets.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-white"
                      >
                        <CheckCircle2 size={13} className="text-[#E7F3B5] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pill Button (Like "View More" in Reference) */}
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full ${grade.buttonBg} text-white text-xs font-bold tracking-wider uppercase border border-white/20 shadow-xs group-hover:bg-white group-hover:text-[#1C2E1F] transition-all`}
                  >
                    <span>{grade.multiplier} Nilai Bersih</span>
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Section 4B: Map & Toleransi Residu (Matching "Serving Gilbert, AZ" from reference) ── */}
      <div className="bg-[#EEF4E1] rounded-[3rem] p-8 sm:p-12 border border-[#D5E3BD] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Content Information */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#3B5433] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <AlertCircle size={14} className="text-[#7EA02A]" />
            <span>PROTOKOL TERA &amp; TOLERANSI SUSUT</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1C2E1F] mb-3">
            Aturan Potongan Kadar Air &amp; Residu
          </h3>

          <p className="text-sm sm:text-base text-[#3F5441] leading-relaxed mb-6 font-normal">
            Material yang tergenang air atau berisi sisa cairan berat akan
            mengalami penyesuaian timbangan aktual saat verifikasi Mitra.
            Pemilahan yang kering dan bersih menjamin nilai 100% tanpa potongan.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-[#D5E3BD] flex items-start gap-3.5 shadow-2xs">
              <Droplets className="w-5 h-5 text-[#7EA02A] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1C2E1F]">
                  Toleransi Kelembaban Maksimal (&lt; 8%)
                </div>
                <p className="text-xs text-[#526D48] mt-0.5 leading-relaxed">
                  Kardus yang basah oleh air hujan akan mengalami koreksi timbangan
                  (tara basah) karena pabrik kertas hanya membeli serat kering murni.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#D5E3BD] flex items-start gap-3.5 shadow-2xs">
              <Scale className="w-5 h-5 text-[#7EA02A] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1C2E1F]">
                  Timbangan Digital Tera Legal SNI
                </div>
                <p className="text-xs text-[#526D48] mt-0.5 leading-relaxed">
                  Semua mitra ELOVIA diwajibkan menggunakan timbangan digital
                  bersegel resmi Dinas Metrologi Legal tanpa pembulatan sepihak.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#D5E3BD] flex items-start gap-3.5 shadow-2xs">
              <ShieldAlert className="w-5 h-5 text-[#7EA02A] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1C2E1F]">
                  Hak Keberatan &amp; Pembatalan Bebas
                </div>
                <p className="text-xs text-[#526D48] mt-0.5 leading-relaxed">
                  Jika Anda tidak setuju dengan hasil grade petugas lapangan,
                  Anda berhak membatalkan transaksi seketika tanpa sanksi apapun.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map Graphic with Pin (Direct replica of the Reference Map Element) */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm h-80 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-lg bg-[#E2EBD3]">
            {/* Map Vector Graphic */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 320"
            >
              <rect width="400" height="320" fill="#EAF0E2" />
              {/* Roads / Contours */}
              <path d="M 0,160 Q 150,120 400,200" stroke="#FFFFFF" strokeWidth="16" fill="none" />
              <path d="M 180,0 Q 200,160 220,320" stroke="#FFFFFF" strokeWidth="18" fill="none" />
              <path d="M 0,80 Q 200,90 400,60" stroke="#D8E5CE" strokeWidth="10" fill="none" />
              <path d="M 80,0 L 120,320" stroke="#D8E5CE" strokeWidth="8" fill="none" />
              <path d="M 300,0 L 320,320" stroke="#D8E5CE" strokeWidth="8" fill="none" />
              <path d="M 0,250 Q 180,220 400,260" stroke="#D8E5CE" strokeWidth="10" fill="none" />
              {/* Green Zone Shapes */}
              <circle cx="210" cy="150" r="85" fill="#7EA02A" fillOpacity="0.15" />
              <circle cx="210" cy="150" r="50" fill="#7EA02A" fillOpacity="0.25" />
            </svg>

            {/* Glowing Map Pin in Center (Matching Reference Image) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#7EA02A] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <MapPin size={24} className="fill-white" />
              </div>
              <div className="mt-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md text-[11px] font-bold text-[#1C2E1F] border border-[#D5E3BD]">
                Jangkauan Radius Armada
              </div>
            </div>

            {/* Corner Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white text-xs text-[#283E2C] shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-[#7EA02A]" />
                <span className="font-bold">Zonasi Klaster RT/RW</span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-[#EEF4E1] text-[#3B5433] px-2 py-0.5 rounded-full">
                SLA &lt; 5 KM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
