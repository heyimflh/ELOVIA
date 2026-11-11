'use client';

import React, { useRef, useState, useId } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from 'framer-motion';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Download,
  FileCheck,
  Sparkles,
  QrCode,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Flame,
  Globe2,
  Trees,
  Wind,
  Droplets,
  BadgeCheck,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & DATA
   ───────────────────────────────────────────────────────────────────────────── */
export interface AchievementBadge {
  id: string;
  title: string;
  subtitle: string;
  tier: 'MYTHIC' | 'DIAMOND' | 'GOLD' | 'EMERALD';
  tierLabel: string;
  requirement: string;
  progressPercent: number;
  unlockedAt: string;
  iconName: 'shield' | 'award' | 'sparkles' | 'tree';
  metricValue: string;
  statsLabel: string;
}

const BADGES_DATA: AchievementBadge[] = [
  {
    id: 'badge-carbon',
    title: 'Penjaga Atmosfer',
    subtitle: 'Atmosphere Guardian',
    tier: 'MYTHIC',
    tierLabel: 'Mythic Tier V',
    requirement: 'Mencegah >1.500 kg emisi CO₂e ke biosfer.',
    progressPercent: 100,
    unlockedAt: '04 Nov 2026',
    iconName: 'shield',
    metricValue: '1.842,5 kg',
    statsLabel: 'CO₂e Terhindar',
  },
  {
    id: 'badge-silica',
    title: 'Alkemis Silika Murni',
    subtitle: 'Pure Silica Alchemist',
    tier: 'DIAMOND',
    tierLabel: 'Diamond Grade A',
    requirement: 'Menyalurkan >400 kg kaca daur ulang murni.',
    progressPercent: 100,
    unlockedAt: '28 Okt 2026',
    iconName: 'award',
    metricValue: '485 kg',
    statsLabel: 'Kaca Cullet',
  },
  {
    id: 'badge-polymer',
    title: 'Pelopor Polimer Hijau',
    subtitle: 'Circular Polymer Pioneer',
    tier: 'GOLD',
    tierLabel: 'Gold Standard',
    requirement: 'Memilah >500 kg plastik PET terverifikasi.',
    progressPercent: 100,
    unlockedAt: '12 Okt 2026',
    iconName: 'sparkles',
    metricValue: '620 kg',
    statsLabel: 'Plastik PET',
  },
  {
    id: 'badge-canopy',
    title: 'Pelindung Kanopi Pesisir',
    subtitle: 'Canopy Custodian',
    tier: 'EMERALD',
    tierLabel: 'Emerald Prime',
    requirement: 'Meregenerasi >30 pohon mangrove di teluk.',
    progressPercent: 100,
    unlockedAt: '02 Nov 2026',
    iconName: 'tree',
    metricValue: '36 Pohon',
    statsLabel: 'Vegetasi Tumbuh',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. 3D PHYSICS BADGE IN TOMBSTONE ARCH FRAME (MATCHING REFERENCE CARDS)
   ───────────────────────────────────────────────────────────────────────────── */
function TombstoneBadgeCard({
  badge,
  isTall = false,
}: {
  badge: AchievementBadge;
  isTall?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.6), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={`group relative rounded-t-[7rem] sm:rounded-t-[8rem] rounded-b-3xl bg-[#F4F7EC] border-2 border-[#DFE7D0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
          isTall ? 'min-h-[460px]' : 'min-h-[420px]'
        }`}
      >
        {/* Dynamic Light Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-t-[7rem] sm:rounded-t-[8rem] rounded-b-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{ background: glareBackground }}
          aria-hidden="true"
        />

        {/* ── TOP SECTION: Arched Window with 3D Emblem ── */}
        <div className="p-8 sm:p-10 flex flex-col items-center text-center relative z-10 flex-1 justify-center">
          {/* Tier Label Pill */}
          <span className="px-3.5 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-white border border-[#DFE7D0] text-[#748E33] shadow-2xs mb-6">
            {badge.tierLabel}
          </span>

          {/* Central 3D Tactile Icon Disc */}
          <div className="relative my-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-[#DFE7D0] shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-[#748E33] transition-all duration-300">
              {badge.iconName === 'shield' && (
                <ShieldCheck className="w-12 h-12 text-[#748E33]" />
              )}
              {badge.iconName === 'award' && <Award className="w-12 h-12 text-[#748E33]" />}
              {badge.iconName === 'sparkles' && (
                <Sparkles className="w-12 h-12 text-[#748E33]" />
              )}
              {badge.iconName === 'tree' && <FileCheck className="w-12 h-12 text-[#748E33]" />}
            </div>

            {/* Micro Checkmark Stamp */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#CEE045] border-2 border-white flex items-center justify-center text-[#1E2617] shadow-xs">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <span className="text-xs font-mono font-bold text-[#748E33]">
              {badge.statsLabel}: {badge.metricValue}
            </span>
          </div>
        </div>

        {/* ── BOTTOM SECTION: Olive Green Block (Matching Exact Reference Card Footer) ── */}
        <div className="bg-[#748E33] text-white p-6 sm:p-7 rounded-b-3xl space-y-2 relative z-20">
          <h4 className="font-fraunces text-xl sm:text-2xl font-normal text-white tracking-tight leading-snug">
            {badge.title}
          </h4>
          <p className="text-xs text-[#EAF2D5] line-clamp-2 leading-relaxed">
            {badge.requirement}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#D7E8BC] uppercase tracking-wider">
              Unlocked: {badge.unlockedAt}
            </span>

            {/* Pill button with arrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-sans font-semibold transition-all">
              <span>Detail</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. OFFICIAL CERTIFICATE SECTION (EDITORIAL WITH MULTI-STEP STAMPING)
   ───────────────────────────────────────────────────────────────────────────── */
type SequenceStep = 'idle' | 'stamping' | 'folding' | 'downloading' | 'success';

export function AchievementBadgesSection({
  className = '',
  userName = 'Rifqi Pratama',
}: {
  className?: string;
  userName?: string;
}) {
  const [step, setStep] = useState<SequenceStep>('idle');
  const certificateId = useId();

  const handleStartDownloadSequence = () => {
    if (step !== 'idle') return;

    setStep('stamping');
    setTimeout(() => {
      setStep('folding');
    }, 900);
    setTimeout(() => {
      setStep('downloading');
      triggerPdfDownload();
    }, 1800);
    setTimeout(() => {
      setStep('success');
    }, 2800);
    setTimeout(() => {
      setStep('idle');
    }, 5200);
  };

  const triggerPdfDownload = () => {
    const issueDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const certificateHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Sertifikat Sirkular ELOVIA - ${userName}</title>
  <style>
    @page { size: A4 landscape; margin: 0; }
    body {
      margin: 0; padding: 40px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #1e2617; color: #ffffff; box-sizing: border-box; width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    .cert-frame {
      border: 4px solid #748e33; outline: 2px dashed rgba(255,255,255,0.4); outline-offset: -12px;
      padding: 48px; border-radius: 24px; background: rgba(255,255,255,0.04); text-align: center;
      max-width: 900px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .badge { color: #cee045; font-weight: 800; letter-spacing: 3px; font-size: 13px; text-transform: uppercase; }
    h1 { font-size: 32px; margin: 12px 0 6px; font-weight: 900; letter-spacing: -0.5px; }
    .recip { font-size: 28px; color: #fde047; font-weight: 800; margin: 20px 0; border-bottom: 2px solid rgba(255,255,255,0.2); display: inline-block; padding-bottom: 6px; }
    .meta { display: flex; justify-content: space-around; margin: 30px 0; font-family: monospace; font-size: 14px; }
    .stamp { display: inline-block; border: 3px solid #ef4444; color: #ef4444; font-weight: 900; padding: 8px 16px; border-radius: 8px; transform: rotate(-10deg); font-size: 14px; }
  </style>
</head>
<body>
  <div class="cert-frame">
    <div class="badge">REPUBLIK INDONESIA • STANDAR SIRKULARITAS NASIONAL</div>
    <h1>SERTIFIKAT KONTRIBUSI EKOLOGIS RESMI</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 14px;">Nomor Registrasi Kriptografis: ELV-SNI-2026-984210</p>
    <div class="recip">${userName}</div>
    <p style="max-width: 650px; margin: 0 auto; line-height: 1.6; font-size: 14px; color: rgba(255,255,255,0.85);">
      Dinyatakan telah berhasil memvalidasi dan menyalurkan material sirkular terverifikasi standar SNI 19-3964-1994 &amp; ISCC Plus, mencegah <strong>1.842,5 kg CO₂e</strong> emisi rumah kaca dan menumbuhkan <strong>36 pohon</strong> mangrove.
    </p>
    <div class="meta">
      <div><strong>Status:</strong> Terakreditasi ISCC Plus</div>
      <div><strong>Tanggal Penerbitan:</strong> ${issueDate}</div>
      <div><strong>Validasi:</strong> Biosfer ELOVIA 2026</div>
    </div>
    <div class="stamp">TERVERIFIKASI SAH • SNI 2026</div>
  </div>
</body>
</html>`;

    const blob = new Blob([certificateHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sertifikat-Sirkular-ELOVIA-${userName.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="achievement-certificates"
      aria-label="Lencana Prestasi & Sertifikat Sirkular"
      className={`relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-[#1E2617] ${className}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        {/* ── Section Header (Editorial Style Matching Reference) ── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
            FROM THE GROUND UP • GAMIFIKASI SIRKULAR
          </span>

          <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E2617] tracking-tight leading-[1.1]">
            Lencana Prestasi &amp;{' '}
            <span className="italic font-normal text-[#748E33]">Sertifikat Resmi</span>
          </h2>

          <p className="text-base sm:text-lg text-[#58634F] font-normal leading-relaxed">
            Setiap gram material bekas yang diproses melalui sistem AI ELOVIA diakui secara resmi.
            Raih lencana 3D prestisius bertahap dan terbitkan sertifikat emisi standar SNI &amp;
            ISCC Plus.
          </p>

          {/* Category Filter Pills (Like Reference "Landscape Service | Lawn Care | Maintenance") */}
          <div className="flex items-center justify-center gap-6 pt-3 text-xs font-sans font-semibold text-[#58634F]">
            <span className="text-[#748E33] border-b-2 border-[#748E33] pb-1 cursor-pointer">
              Semua Lencana (4)
            </span>
            <span className="hover:text-[#1E2617] cursor-pointer">Standar Emisi</span>
            <span className="hover:text-[#1E2617] cursor-pointer">Sertifikasi SNI</span>
          </div>
        </div>

        {/* ── 4 Arched Tombstone Cards (Centerpiece of the Reference Design) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {BADGES_DATA.map((badge, idx) => (
            <TombstoneBadgeCard
              key={badge.id}
              badge={badge}
              isTall={idx === 1 || idx === 2}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            OFFICIAL CERTIFICATE SHOWCASE (MATCHING "SERVING GILBERT" SECTION)
           ══════════════════════════════════════════════════════ */}
        <div className="rounded-[3rem] bg-[#EFF3E4] border-2 border-[#DFE7D0] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
                AUDIT LCA ISO 14044 • DOKUMEN SAH
              </span>

              <h3 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E2617] tracking-tight leading-tight">
                Sertifikat Emisi &amp;{' '}
                <span className="italic font-normal text-[#748E33]">Sirkularitas Terakreditasi</span>
              </h3>

              <p className="text-base text-[#58634F] leading-relaxed">
                Diterbitkan secara kriptografis menggunakan audit siklus hidup LCA terverifikasi.
                Setiap lembar sertifikat sah memuat stempel digital SNI 19-3964-1994, tanda tangan
                hash SHA-256, dan nomor registrasi unik.
              </p>

              {/* 3 Checkpoints */}
              <div className="space-y-3 pt-2">
                {[
                  'Diakui untuk Portofolio ESG & Pajak Karbon Hijau',
                  'Verifikasi Publik Instan via Kode QR Kriptografis',
                  'Terkoneksi Langsung dengan Ledger Biosfer ELOVIA',
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#748E33] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm font-sans font-semibold text-[#1E2617]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleStartDownloadSequence}
                  disabled={step !== 'idle'}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide transition-all shadow-md cursor-pointer ${
                    step === 'idle'
                      ? 'bg-[#748E33] hover:bg-[#617728] text-white hover:scale-[1.02]'
                      : step === 'success'
                      ? 'bg-[#CEE045] text-[#1E2617] cursor-default'
                      : 'bg-white text-[#58634F] cursor-wait border border-[#DFE7D0]'
                  }`}
                >
                  {step === 'idle' && (
                    <>
                      <span>Unduh Sertifikat Resmi (PDF/HTML)</span>
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Download className="w-3.5 h-3.5 text-white" />
                      </span>
                    </>
                  )}
                  {step === 'stamping' && (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-[#748E33]" />
                      <span>Menerapkan Stempel SNI...</span>
                    </>
                  )}
                  {step === 'folding' && (
                    <>
                      <FileCheck className="w-4 h-4 animate-pulse text-[#748E33]" />
                      <span>Mengemas Dokumen Kriptografis...</span>
                    </>
                  )}
                  {step === 'downloading' && (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#748E33]" />
                      <span>Mentransfer Berkas Resmi...</span>
                    </>
                  )}
                  {step === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#1E2617]" />
                      <span>Pengunduhan Berhasil Selesai!</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Certificate Paper Preview in Arch Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating Bright Lime Stamp Badge (Top-Right Overlap) */}
                <div className="absolute -top-4 -right-4 z-30 w-20 h-20 rounded-full bg-[#CEE045] border-2 border-white shadow-lg flex flex-col items-center justify-center text-center rotate-12">
                  <BadgeCheck className="w-6 h-6 text-[#1E2617]" />
                  <span className="text-[8px] font-sans font-black uppercase text-[#1E2617] tracking-tight">
                    SNI 2026
                  </span>
                </div>

                {/* Arched Certificate Card */}
                <div className="relative rounded-t-[5rem] rounded-b-3xl bg-white border-2 border-[#DFE7D0] p-7 sm:p-9 shadow-lg text-center overflow-hidden">
                  <div className="space-y-1 pb-4 border-b border-[#DFE7D0]">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#748E33] font-bold block">
                      REPUBLIK INDONESIA • STANDAR SIRKULARITAS NASIONAL
                    </span>
                    <h5 className="font-fraunces text-lg sm:text-xl font-normal text-[#1E2617] tracking-tight uppercase">
                      Sertifikat Kontribusi Ekologis
                    </h5>
                    <span className="text-[9px] font-mono text-[#58634F] block">
                      NO. REG: ELV-SNI-2026-984210
                    </span>
                  </div>

                  <div className="py-4 my-3 rounded-2xl bg-[#EFF3E4] border border-[#DFE7D0]">
                    <span className="text-[10px] uppercase text-[#58634F] font-bold block">
                      Diberikan Kepada
                    </span>
                    <span className="font-fraunces text-xl font-normal text-[#1E2617] block">
                      {userName}
                    </span>
                  </div>

                  {/* 3 Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#DFE7D0] text-center">
                    <div>
                      <span className="text-[10px] text-[#58634F] block">Emisi Cegah</span>
                      <span className="font-mono text-xs font-bold text-[#748E33]">
                        1.842,5 kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#58634F] block">Daur Ulang</span>
                      <span className="font-mono text-xs font-bold text-[#748E33]">
                        1.105 kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#58634F] block">Bio-Pohon</span>
                      <span className="font-mono text-xs font-bold text-[#748E33]">
                        36 Pohon
                      </span>
                    </div>
                  </div>

                  {/* Stamp Dropping Animation */}
                  <AnimatePresence>
                    {(step === 'stamping' || step === 'folding') && (
                      <motion.div
                        initial={{ scale: 2.8, opacity: 0, rotate: -35 }}
                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                      >
                        <div className="w-32 h-32 rounded-full border-4 border-dashed border-[#748E33] bg-[#EFF3E4]/90 text-[#748E33] flex flex-col items-center justify-center p-2 text-center shadow-lg">
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold">
                            TERVERIFIKASI
                          </span>
                          <span className="text-2xl font-fraunces font-bold text-[#1E2617] uppercase my-0.5">
                            SAH
                          </span>
                          <span className="text-[8px] font-mono tracking-widest text-[#748E33]">
                            SNI 19-3964-1994
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4 flex items-center justify-between text-[10px] font-mono text-[#58634F]">
                    <span>STATUS: VALID</span>
                    <span className="text-[#748E33] font-bold">ISCC PLUS &amp; SNI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AchievementBadgesSection;
