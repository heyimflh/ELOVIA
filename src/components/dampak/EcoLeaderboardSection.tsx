'use client';

import React, { useRef, useState, useMemo, Suspense, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  Trophy,
  Medal,
  Crown,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Flame,
  ArrowUp,
  UserCheck,
  ChevronRight,
  Globe2,
  Award,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   CRITICAL 3D PERFORMANCE RULES & OPTIMIZED 3D TROPHY COMPONENT
   ─────────────────────────────────────────────────────────────────────────────
   1. DRACO COMPRESSION:
      - Any compressed `.glb` files should be placed under `/public/3dModels/leaderboard/`.
      - Draco decoder is loaded via standard CDN or local `/public/draco/` binaries.
   2. BAKED LIGHTING & ZERO REAL-TIME SHADOWS:
      - STRICTLY DISABLED real-time shadows: No `castShadow`, no `receiveShadow`,
        and Canvas `shadows={false}`.
      - Uses pre-baked textures or lightweight MeshStandardMaterial / MeshBasicMaterial
        to guarantee locked 60 FPS on low-power mobile devices.
   ───────────────────────────────────────────────────────────────────────────── */

const DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

interface Safe3DProps {
  children: ReactNode;
  fallback: ReactNode;
}

class Safe3DErrorBoundary extends Component<Safe3DProps, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // Suppress console error, fall back gracefully to lightweight geometry
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/**
 * Optimized 3D Golden Trophy / Crown for Rank 1 Podium
 * (STRICTLY NO SHADOWS, baked/diffuse materials only)
 */
function OptimizedTrophyMesh() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.75;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Trophy Pedestal Base - Baked gold styling without shadow passes */}
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.2, 24]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.8}
          roughness={0.25}
          // Note: In Blender, plug your pre-baked lighting texture into map={bakedTexture}
        />
      </mesh>

      {/* Trophy Stem */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Trophy Main Cup */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.25, 0.65, 24]} />
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.9}
          roughness={0.18}
          emissive="#78350f"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Halo Crown Ring */}
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 16, 32]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>

      {/* Glowing Star in center */}
      <mesh position={[0, 0.2, 0]}>
        <octahedronGeometry args={[0.18, 0]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/3dModels/leaderboard/trophy.glb');

function DracoLoadedModel({ url }: { url: string }) {
  // Configured with Draco compression decoder
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const c = scene.clone();
    // Ensure all meshes have castShadow/receiveShadow disabled
    c.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });
    return c;
  }, [scene]);

  return <primitive object={cloned} scale={0.7} />;
}

function Leaderboard3DTrophy() {
  const fallbackMesh = <OptimizedTrophyMesh />;

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 relative">
      <Canvas
        shadows={false} // CRITICAL: Disable shadow maps completely for 60 FPS mobile
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 2.5], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#38bdf8" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
          <Center>
            <Safe3DErrorBoundary fallback={fallbackMesh}>
              <Suspense fallback={fallbackMesh}>
                {/* 
                  Drop your compressed model into: /public/3dModels/leaderboard/trophy.glb
                  Pre-baked in Blender with no dynamic shadows needed.
                */}
                <DracoLoadedModel url="/3dModels/leaderboard/trophy.glb" />
              </Suspense>
            </Safe3DErrorBoundary>
          </Center>
        </Float>
      </Canvas>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LEADERBOARD MOCK DATA (TOP 10 + CURRENT LOGGED-IN USER)
   ───────────────────────────────────────────────────────────────────────────── */
export interface LeaderboardUser {
  rank: number;
  name: string;
  avatarText: string;
  avatarGradient: string;
  tierBadge: string;
  level: number;
  points: number;
  co2Saved: string;
  treesPlanted: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

const TOP_10_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Alya Anindita',
    avatarText: 'AA',
    avatarGradient: 'from-amber-400 via-yellow-500 to-amber-600',
    tierBadge: 'Biosphere Champion',
    level: 48,
    points: 148250,
    co2Saved: '3.4 Ton',
    treesPlanted: 84,
    streakDays: 42,
  },
  {
    rank: 2,
    name: 'Bima Sakti Nugraha',
    avatarText: 'BN',
    avatarGradient: 'from-slate-300 via-gray-400 to-slate-500',
    tierBadge: 'Eco Grandmaster',
    level: 42,
    points: 124900,
    co2Saved: '2.9 Ton',
    treesPlanted: 68,
    streakDays: 35,
  },
  {
    rank: 3,
    name: 'Citra Kirana Dewi',
    avatarText: 'CD',
    avatarGradient: 'from-amber-600 via-amber-700 to-amber-900',
    tierBadge: 'Canopy Guardian',
    level: 39,
    points: 112450,
    co2Saved: '2.5 Ton',
    treesPlanted: 55,
    streakDays: 28,
  },
  {
    rank: 4,
    name: 'Daffa Maulana',
    avatarText: 'DM',
    avatarGradient: 'from-emerald-500 to-teal-600',
    tierBadge: 'Polymer Master',
    level: 35,
    points: 98200,
    co2Saved: '2.1 Ton',
    treesPlanted: 46,
    streakDays: 21,
  },
  {
    rank: 5,
    name: 'Eka Putri Maharani',
    avatarText: 'EM',
    avatarGradient: 'from-teal-400 to-emerald-600',
    tierBadge: 'Silica Alchemist',
    level: 31,
    points: 87600,
    co2Saved: '1.8 Ton',
    treesPlanted: 38,
    streakDays: 19,
  },
  {
    rank: 6,
    name: 'Fajar Ramadhan',
    avatarText: 'FR',
    avatarGradient: 'from-cyan-500 to-blue-600',
    tierBadge: 'Circular Pioneer',
    level: 28,
    points: 76350,
    co2Saved: '1.6 Ton',
    treesPlanted: 32,
    streakDays: 15,
  },
  {
    rank: 7,
    name: 'Gita Permata',
    avatarText: 'GP',
    avatarGradient: 'from-lime-500 to-emerald-600',
    tierBadge: 'Canopy Keeper',
    level: 26,
    points: 69800,
    co2Saved: '1.4 Ton',
    treesPlanted: 29,
    streakDays: 14,
  },
  {
    rank: 8,
    name: 'Hendra Kusuma',
    avatarText: 'HK',
    avatarGradient: 'from-emerald-600 to-teal-700',
    tierBadge: 'Eco Crusader',
    level: 23,
    points: 61250,
    co2Saved: '1.2 Ton',
    treesPlanted: 24,
    streakDays: 12,
  },
  {
    rank: 9,
    name: 'Indah Salsabila',
    avatarText: 'IS',
    avatarGradient: 'from-teal-500 to-cyan-600',
    tierBadge: 'Green Advocate',
    level: 20,
    points: 54100,
    co2Saved: '1.0 Ton',
    treesPlanted: 20,
    streakDays: 9,
  },
  {
    rank: 10,
    name: 'Joko Prasetyo',
    avatarText: 'JP',
    avatarGradient: 'from-green-500 to-emerald-700',
    tierBadge: 'Resource Ranger',
    level: 18,
    points: 48900,
    co2Saved: '920 kg',
    treesPlanted: 16,
    streakDays: 7,
  },
];

const CURRENT_USER: LeaderboardUser = {
  rank: 254,
  name: 'Rifqi Pratama',
  avatarText: 'RP',
  avatarGradient: 'from-emerald-400 via-teal-500 to-emerald-600',
  tierBadge: 'Penjaga Atmosfer',
  level: 15,
  points: 24850,
  co2Saved: '1.842 kg',
  treesPlanted: 36,
  streakDays: 18,
  isCurrentUser: true,
};

/* ─────────────────────────────────────────────────────────────────────────────
   LEADERBOARD SECTION COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

export function EcoLeaderboardSection({
  className = '',
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [activeFilter, setActiveFilter] = useState<'all' | 'month' | 'week'>('all');

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      id="eco-leaderboard"
      aria-label="Eco-Leaderboard & Community Rank"
      className={`relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden ${className}`}
    >
      {/* ── Ambient Radial Atmosphere Blobs ───────────────── */}
      <div className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Pattern Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* ── Header Showcase with 3D Trophy ────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-2 border-b border-white/10">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 uppercase tracking-widest shadow-sm font-sans">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Peringkat Komunitas Hijau Nasional</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              Eco-Leaderboard &amp; <span className="text-emerald-400">Komunitas</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl font-normal leading-relaxed font-sans">
              Apresiasi untuk para pelopor sirkularitas teraktif di seluruh nusantara.
              Terus tingkatkan pemilahan material untuk memuncaki papan peringkat.
            </p>
          </div>

          {/* 3D Golden Trophy Visual (Zero dynamic shadow passes for 60 FPS) */}
          <div className="flex flex-col items-center shrink-0 p-3 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
            <Leaderboard3DTrophy />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 mt-1">
              CHAMPION TROPHY
            </span>
          </div>
        </div>

        {/* ── Period Filter Tabs ───────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            {(
              [
                { id: 'all', label: 'Sepanjang Masa' },
                { id: 'month', label: 'Bulan Ini' },
                { id: 'week', label: 'Minggu Ini' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-sans transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            <span>24.819 Pengguna Aktif</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MAIN LEADERBOARD GLASS CONTAINER (max-w-4xl mx-auto)
           ══════════════════════════════════════════════════════ */}
        <div className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Specular Highlight */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-transparent z-10"
            aria-hidden="true"
          />

          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-3 px-6 py-3.5 border-b border-white/10 bg-white/[0.02] text-xs font-sans font-bold uppercase tracking-wider text-white/50 select-none">
            <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
            <div className="col-span-6 sm:col-span-7">Pengguna &amp; Gelar</div>
            <div className="col-span-4 sm:col-span-4 text-right">Poin Ekologis</div>
          </div>

          {/* ── Scrollable Inner List (max-h-[500px] overflow-y-auto custom-scrollbar) ── */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar divide-y divide-white/5">
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {TOP_10_LEADERBOARD.map((user) => {
                const isRank1 = user.rank === 1;
                const isRank2 = user.rank === 2;
                const isRank3 = user.rank === 3;

                // Rank Aura (Top 3 Neon Glow Effect)
                const avatarAuraClass = isRank1
                  ? 'border-2 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                  : isRank2
                  ? 'border-2 border-[#C0C0C0] shadow-[0_0_20px_rgba(192,192,192,0.6)]'
                  : isRank3
                  ? 'border-2 border-[#CD7F32] shadow-[0_0_20px_rgba(205,127,50,0.6)]'
                  : 'border border-white/20';

                return (
                  <motion.div
                    key={user.rank}
                    variants={itemVariants}
                    className={`grid grid-cols-12 gap-3 items-center px-6 py-4 transition-colors duration-200 hover:bg-white/[0.06] ${
                      isRank1 ? 'bg-amber-500/[0.04]' : isRank2 ? 'bg-slate-300/[0.02]' : ''
                    }`}
                  >
                    {/* Rank Number / Medal */}
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                      {isRank1 && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-black text-xs shadow-md">
                          <Crown className="w-4 h-4 text-black stroke-[2.5]" />
                        </div>
                      )}
                      {isRank2 && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-gray-400 flex items-center justify-center text-black font-black text-xs shadow-md">
                          <Medal className="w-4 h-4 text-slate-900 stroke-[2.5]" />
                        </div>
                      )}
                      {isRank3 && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-yellow-900 flex items-center justify-center text-white font-black text-xs shadow-md">
                          <Award className="w-4 h-4 text-amber-200 stroke-[2.5]" />
                        </div>
                      )}
                      {!isRank1 && !isRank2 && !isRank3 && (
                        <span className="font-mono text-sm font-bold text-white/50">
                          #{user.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar with Rank Aura + Username & Tier */}
                    <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
                      <div
                        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${user.avatarGradient} text-white font-bold text-xs sm:text-sm shrink-0 transition-transform duration-300 hover:scale-105 ${avatarAuraClass}`}
                      >
                        {user.avatarText}
                        {isRank1 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[10px]">
                            👑
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5 truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm sm:text-base text-white truncate">
                            {user.name}
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-emerald-300 border border-white/10">
                            Lv.{user.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/60 font-sans">
                          <span className="text-white/70 font-medium">{user.tierBadge}</span>
                          <span className="hidden md:inline text-white/30">•</span>
                          <span className="hidden md:inline text-white/50">
                            {user.co2Saved} CO₂e
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Total Eco-Points (using font-mono strictly for numbers) */}
                    <div className="col-span-4 sm:col-span-4 text-right space-y-0.5">
                      <div className="font-mono text-base sm:text-lg font-black tracking-tight text-white">
                        {user.points.toLocaleString('id-ID')}
                        <span className="font-sans text-xs font-bold text-emerald-400 ml-1">
                          PTS
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[11px] font-sans text-emerald-400/90">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span className="font-mono">{user.streakDays}d</span>
                        <span className="hidden sm:inline text-white/50">streak</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════
              3. STICKY USER RANK ROW (ALWAYS VISIBLE WITHOUT SCROLLING)
             ══════════════════════════════════════════════════════ */}
          <div className="sticky bottom-0 z-20 bg-white/20 backdrop-blur-2xl border-t border-white/20 p-4 sm:p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
            <div className="grid grid-cols-12 gap-3 items-center">
              {/* User Rank Number */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs sm:text-sm font-extrabold">
                  #{CURRENT_USER.rank}
                </div>
              </div>

              {/* Current User Avatar & Info */}
              <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${CURRENT_USER.avatarGradient} text-white font-black text-xs sm:text-sm shrink-0 border-2 border-emerald-400 shadow-[0_0_16px_rgba(34,197,94,0.4)]`}
                >
                  {CURRENT_USER.avatarText}
                </div>

                <div className="space-y-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-extrabold text-sm sm:text-base text-white truncate">
                      {CURRENT_USER.name}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-sans font-extrabold text-black uppercase tracking-wider">
                      Anda
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 font-sans">
                    <span className="text-emerald-300 font-medium">
                      {CURRENT_USER.tierBadge} (Lv.{CURRENT_USER.level})
                    </span>
                    <span className="hidden sm:inline text-white/30">•</span>
                    <span className="hidden sm:inline text-emerald-400/90 font-mono text-[11px]">
                      +3.200 PTS minggu ini
                    </span>
                  </div>
                </div>
              </div>

              {/* User Eco-Points with prominent font-mono */}
              <div className="col-span-4 sm:col-span-4 text-right space-y-0.5">
                <div className="font-mono text-lg sm:text-xl font-black tracking-tight text-white">
                  {CURRENT_USER.points.toLocaleString('id-ID')}
                  <span className="font-sans text-xs font-bold text-emerald-400 ml-1">PTS</span>
                </div>
                <div className="text-[11px] font-sans text-white/60">
                  Top <span className="font-mono font-bold text-white">2.4%</span> Nasional
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Community Gamification Banner Footer ──────────── */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-teal-950/60 backdrop-blur-xl border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white">
                Musim Kompetisi INVOFEST 2026 Berakhir dalam 14 Hari
              </h4>
              <p className="font-sans text-xs text-white/60">
                Top 3 pengguna pada tanggal 23 November 2026 berhak atas Piagam ELOVIA Emas &amp; Insentif Hijau.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="font-mono text-xs text-emerald-300/90 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              Sinkronisasi: Real-time
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcoLeaderboardSection;

