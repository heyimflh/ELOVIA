'use client';

import React, { useRef, useState, useEffect, useId } from 'react';
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
  tierGradient: string;
  borderGlow: string;
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
    tierGradient: 'from-amber-300 via-emerald-400 to-teal-400',
    borderGlow: 'hover:border-emerald-400/50 shadow-emerald-500/20',
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
    tierGradient: 'from-teal-200 via-cyan-400 to-blue-500',
    borderGlow: 'hover:border-cyan-400/50 shadow-cyan-500/20',
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
    tierGradient: 'from-yellow-300 via-amber-400 to-orange-500',
    borderGlow: 'hover:border-amber-400/50 shadow-amber-500/20',
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
    tierGradient: 'from-lime-300 via-emerald-400 to-green-600',
    borderGlow: 'hover:border-lime-400/50 shadow-lime-500/20',
    requirement: 'Meregenerasi >30 pohon mangrove di teluk.',
    progressPercent: 100,
    unlockedAt: '02 Nov 2026',
    iconName: 'tree',
    metricValue: '36 Pohon',
    statsLabel: 'Vegetasi Tumbuh',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. 3D PHYSICS BADGE CARD (HOVER TILT + DYNAMIC LIGHT GLARE + 2.5D DEPTH)
   ───────────────────────────────────────────────────────────────────────────── */
function BadgePhysicsCard({ badge }: { badge: AchievementBadge }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate values normalized from -0.5 to 0.5 (center is 0,0)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-inertia physics springs for realistic tactile card weight
  const mouseXSpring = useSpring(x, { stiffness: 320, damping: 24, mass: 0.6 });
  const mouseYSpring = useSpring(y, { stiffness: 320, damping: 24, mass: 0.6 });

  // Map mouse positions to 3D tilt rotations (-15deg to 15deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  // Dynamic light glare gradient coordinate tracking
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  // Specular holographic sheen template
  const glareBackground = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.38), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] ${badge.borderGlow}`}
      >
        {/* ── Dynamic Light Glare (Follows mouse cursor) ──── */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{ background: glareBackground }}
          aria-hidden="true"
        />

        {/* ── Top Specular Glass Lip ────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 via-white/[0.03] to-transparent z-10"
          aria-hidden="true"
        />

        {/* ── Parallax Layer 1: Header & Tier Badge (translateZ: 25px) ── */}
        <div
          style={{ transform: 'translateZ(25px)' }}
          className="relative z-20 flex items-center justify-between gap-3 mb-5"
        >
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r ${badge.tierGradient} text-[#071f16] shadow-sm`}
          >
            {badge.tierLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300/90 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            TERVERIFIKASI
          </span>
        </div>

        {/* ── Parallax Layer 2: 3D Emblem Floating Orb (translateZ: 50px) ── */}
        <div
          style={{ transform: 'translateZ(50px)' }}
          className="relative z-20 flex flex-col items-center text-center my-3"
        >
          <div className="relative mb-4">
            {/* Ambient Emblem Glow */}
            <div
              className={`absolute -inset-2 rounded-full bg-gradient-to-r ${badge.tierGradient} opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500`}
            />

            {/* Glass Emblem Ring */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-2xl border-2 border-white/30 flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] group-hover:border-white/50 transition-colors">
              {badge.iconName === 'shield' && (
                <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 drop-shadow-[0_4px_12px_rgba(34,197,94,0.5)]" />
              )}
              {badge.iconName === 'award' && (
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-teal-300 drop-shadow-[0_4px_12px_rgba(45,212,191,0.5)]" />
              )}
              {badge.iconName === 'sparkles' && (
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]" />
              )}
              {badge.iconName === 'tree' && (
                <FileCheck className="w-10 h-10 sm:w-12 sm:h-12 text-lime-300 drop-shadow-[0_4px_12px_rgba(163,230,53,0.5)]" />
              )}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {badge.title}
          </h3>
          <p className="text-xs text-white/70 font-medium mt-0.5">{badge.subtitle}</p>
        </div>

        {/* ── Parallax Layer 3: Metrics & Requirement (translateZ: 35px) ── */}
        <div style={{ transform: 'translateZ(35px)' }} className="relative z-20 space-y-3 mt-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/60 font-medium">{badge.statsLabel}</span>
            <span className="font-mono text-base font-bold text-white tracking-tight">
              {badge.metricValue}
            </span>
          </div>

          <p className="text-[11px] text-white/60 leading-relaxed text-center">
            {badge.requirement}
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
            <span>Unlocked</span>
            <span className="text-white/80">{badge.unlockedAt}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. CERTIFICATE SHOWCASE & MULTI-STEP DOWNLOAD ANIMATION SEQUENCE
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

  // Multi-step download sequence orchestration
  const handleStartDownloadSequence = () => {
    if (step !== 'idle') return;

    // STEP 1: The Stamp drops with heavy spring bounce
    setStep('stamping');

    // STEP 2: The Envelope Fold — Certificate slides down into digital envelope
    setTimeout(() => {
      setStep('folding');
    }, 900);

    // STEP 3: The Action — Generate PDF download trigger
    setTimeout(() => {
      setStep('downloading');
      triggerPdfDownload();
    }, 1800);

    // STEP 4: Success checkmark appears
    setTimeout(() => {
      setStep('success');
    }, 2800);

    // RESET: Smoothly return to idle state after 5 seconds
    setTimeout(() => {
      setStep('idle');
    }, 5200);
  };

  // Generates and triggers actual downloadable certificate SVG/PDF document
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
      background: #09261d; color: #ffffff; box-sizing: border-box; width: 100vw; height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    .cert-frame {
      border: 4px solid #34d399; outline: 2px dashed rgba(255,255,255,0.4); outline-offset: -12px;
      padding: 48px; border-radius: 24px; background: rgba(255,255,255,0.04); text-align: center;
      max-width: 900px; width: 100%; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .badge { color: #34d399; font-weight: 800; letter-spacing: 3px; font-size: 13px; text-transform: uppercase; }
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
      className={`relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden ${className}`}
    >
      {/* ── Ambient Radial Atmosphere Blobs ───────────────── */}
      <div className="absolute top-1/3 -left-40 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[32rem] h-[32rem] bg-teal-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* ── Section Header ───────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Validasi Institusional &amp; Gamifikasi Sirkular</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Lencana Prestasi &amp; <span className="text-emerald-400">Sertifikat Sirkular</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed">
            Setiap gram material bekas yang diproses melalui sistem AI ELOVIA diakui secara
            resmi. Raih lencana 3D prestisius dan terbitkan sertifikat emisi terverifikasi standar
            SNI &amp; ISCC Plus.
          </p>
        </div>

        {/* ── Two Column Layout: Badges Grid (Left) + Certificate Generator (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ══════════════════════════════════════════════════════
              LEFT: 3D PHYSICS BADGE CARDS GRID (7 cols on lg)
             ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Koleksi Lencana 3D Holografis
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-300/80 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                4/4 Unlocked (100%)
              </span>
            </div>

            {/* 2x2 Grid of 3D Physics Tilt Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {BADGES_DATA.map((badge) => (
                <BadgePhysicsCard key={badge.id} badge={badge} />
              ))}
            </div>

            <p className="text-xs text-white/50 text-center italic">
              💡 Gerakkan kursor di atas lencana untuk melihat efek 3D tilt fisik dan pantulan cahaya
              holografis dinamis.
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════
              RIGHT: CERTIFICATE GENERATOR & DOWNLOAD SEQUENCE (5 cols on lg)
             ══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Sertifikat Sirkular Resmi
                </h3>
              </div>
              <span className="text-xs font-mono text-white/60">SNI 19-3964-1994</span>
            </div>

            {/* Main Showcase Glass Card */}
            <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
              {/* Specular Highlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/15 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* ── Certificate Preview Container ───────────────── */}
              <div className="relative min-h-[380px] sm:min-h-[400px] flex items-center justify-center">
                {/* ── DIGITAL ENVELOPE (Appears during 'folding' step) ── */}
                <AnimatePresence>
                  {step === 'folding' && (
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-x-4 bottom-2 z-30 p-5 rounded-2xl bg-gradient-to-b from-emerald-800/80 to-[#071f16]/95 border border-emerald-400/40 shadow-2xl flex flex-col items-center justify-center text-center space-y-2 backdrop-blur-2xl"
                    >
                      <div className="w-12 h-1 rounded-full bg-emerald-400/50 mb-1" />
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                        <Download className="w-5 h-5 animate-bounce" />
                      </div>
                      <span className="text-xs font-bold text-emerald-300 tracking-wide uppercase">
                        Digital Envelope Pocket
                      </span>
                      <p className="text-[11px] text-white/70">
                        Mengemas sertifikat resmi bertanda tangan kriptografis...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── THE CERTIFICATE PREVIEW (Folds down during 'folding') ── */}
                <motion.div
                  animate={
                    step === 'folding'
                      ? {
                          scale: 0.8,
                          rotate: -3,
                          y: 100,
                          opacity: 0,
                          transition: { duration: 0.65, ease: [0.32, 0, 0.67, 0] },
                        }
                      : step === 'downloading' || step === 'success'
                      ? { opacity: 0, scale: 0.8, y: 80 }
                      : { scale: 1, rotate: 0, y: 0, opacity: 1 }
                  }
                  className="w-full relative rounded-2xl bg-gradient-to-b from-[#0b3323] via-[#092b1f] to-[#071d15] border-2 border-emerald-400/40 p-5 sm:p-6 shadow-xl space-y-4 text-center select-none"
                >
                  {/* Watermark Leaf Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <Award className="w-48 h-48 text-emerald-400" />
                  </div>

                  {/* Certificate Top Header */}
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold">
                      REPUBLIK INDONESIA • STANDAR SIRKULARITAS NASIONAL
                    </div>
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                      SERTIFIKAT KONTRIBUSI EKOLOGIS
                    </h4>
                    <p className="text-[10px] font-mono text-white/50">
                      NO. REG: ELV-SNI-2026-984210
                    </p>
                  </div>

                  {/* Recipient Box */}
                  <div className="py-2 px-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/60 uppercase tracking-wider block">
                      Diberikan Kepada
                    </span>
                    <span className="text-lg font-extrabold text-amber-300 font-sans tracking-tight">
                      {userName}
                    </span>
                  </div>

                  {/* Certified Impact Summary */}
                  <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-white/10">
                    <div>
                      <span className="text-[10px] text-white/50 block">Emisi Cegah</span>
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        1.842,5 kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">Daur Ulang</span>
                      <span className="font-mono text-xs font-bold text-teal-300">
                        1.105 kg
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">Bio-Pohon</span>
                      <span className="font-mono text-xs font-bold text-lime-400">
                        36 Pohon
                      </span>
                    </div>
                  </div>

                  {/* Footer Seal & Signatures */}
                  <div className="flex items-center justify-between text-[9px] text-white/60 pt-1 font-mono">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-6 h-6 text-emerald-400/80" />
                      <div className="text-left">
                        <span className="block text-white/80 font-bold">HASH VALID</span>
                        <span className="text-[8px] text-white/40">SHA-256 ELOVIA</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-emerald-300 font-bold">ISCC PLUS &amp; SNI</span>
                      <span className="text-[8px] text-white/40">Tercatat di Ledger</span>
                    </div>
                  </div>

                  {/* ── STEP 1: THE STAMP (DROPS ONTO CERTIFICATE) ──── */}
                  <AnimatePresence>
                    {(step === 'stamping' || step === 'folding') && (
                      <motion.div
                        initial={{ scale: 2.8, opacity: 0, rotate: -35 }}
                        animate={{ scale: 1, opacity: 1, rotate: -12 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                      >
                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-dashed border-red-500 bg-red-950/60 backdrop-blur-sm text-red-400 flex flex-col items-center justify-center p-2 text-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold">
                            TERVERIFIKASI
                          </span>
                          <span className="text-xl sm:text-2xl font-black tracking-widest text-red-400 uppercase my-0.5">
                            SAH
                          </span>
                          <span className="text-[9px] font-mono tracking-widest text-red-300">
                            SNI 19-3964-1994
                          </span>
                          <span className="text-[8px] font-mono text-red-400/80 mt-1">
                            ISCC PLUS 2026
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* ── STEP 3 & 4: DOWNLOADING & SUCCESS OVERLAY ───── */}
                <AnimatePresence>
                  {(step === 'downloading' || step === 'success') && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6 space-y-4"
                    >
                      {step === 'downloading' ? (
                        <>
                          <div className="relative w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                            <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-lg font-bold text-white">
                              Menerbitkan Sertifikat PDF...
                            </h4>
                            <p className="text-xs text-white/60">
                              Menyematkan stempel SNI &amp; hash validasi kriptografis.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 14 }}
                            className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.6)]"
                          >
                            <Check className="w-8 h-8 stroke-[3]" />
                          </motion.div>
                          <div className="space-y-1">
                            <h4 className="text-lg font-bold text-white">
                              Sertifikat Berhasil Diunduh!
                            </h4>
                            <p className="text-xs text-emerald-300">
                              Dokumen resmi tersimpan ke perangkat Anda.
                            </p>
                          </div>
                          <span className="text-[11px] font-mono text-white/50">
                            Sertifikat-Sirkular-ELOVIA.html
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Download Action Button ─────────────────────── */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={handleStartDownloadSequence}
                  disabled={step !== 'idle'}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg cursor-pointer ${
                    step === 'idle'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#071f16] shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01]'
                      : step === 'success'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                      : 'bg-white/10 text-white/70 border border-white/15 cursor-wait'
                  }`}
                >
                  {step === 'idle' && (
                    <>
                      <Download className="w-4 h-4 text-[#071f16]" />
                      <span>Unduh Sertifikat Resmi (PDF/HTML)</span>
                    </>
                  )}
                  {step === 'stamping' && (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>Menerapkan Stempel SNI...</span>
                    </>
                  )}
                  {step === 'folding' && (
                    <>
                      <FileCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>Mengemas Dokumen Kriptografis...</span>
                    </>
                  )}
                  {step === 'downloading' && (
                    <>
                      <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span>Mentransfer Berkas Resmi...</span>
                    </>
                  )}
                  {step === 'success' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Pengunduhan Berhasil Selesai</span>
                    </>
                  )}
                </button>

                {/* Institutional Accreditation Footnote */}
                <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Terverifikasi SNI &amp; ISCC Plus
                  </span>
                  <span>Standar ISO 14044 LCA</span>
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
