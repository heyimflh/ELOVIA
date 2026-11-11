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
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   3D TROPHY COMPONENT (OPTIMIZED ZERO-SHADOW)
   ───────────────────────────────────────────────────────────────────────────── */
interface Safe3DProps {
  children: ReactNode;
  fallback: ReactNode;
}

class Safe3DErrorBoundary extends Component<Safe3DProps, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function OptimizedTrophyMesh() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.75;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.2, 24]} />
        <meshStandardMaterial color="#94762A" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#B89B3A" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.55, 0.25, 0.65, 24]} />
        <meshStandardMaterial
          color="#CEE045"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.05, 16, 32]} />
        <meshBasicMaterial color="#748E33" />
      </mesh>
    </group>
  );
}

useGLTF.preload('/3dModels/leaderboard/trophy.glb');

function DracoLoadedModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const c = scene.clone();
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
        shadows={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 2.5], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#CEE045" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
          <Center>
            <Safe3DErrorBoundary fallback={fallbackMesh}>
              <Suspense fallback={fallbackMesh}>
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
   DATA
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
    avatarGradient: 'from-[#748E33] to-[#556923]',
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
    avatarGradient: 'from-[#5B8E85] to-[#3D6961]',
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
    avatarGradient: 'from-[#CE9B42] to-[#996F24]',
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
    avatarGradient: 'from-[#748E33] to-[#45571C]',
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
    avatarGradient: 'from-[#5B8E85] to-[#2B544E]',
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
    avatarGradient: 'from-[#8A9684] to-[#596653]',
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
    avatarGradient: 'from-[#748E33] to-[#394917]',
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
    avatarGradient: 'from-[#5B8E85] to-[#26423D]',
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
    avatarGradient: 'from-[#CE9B42] to-[#735115]',
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
    avatarGradient: 'from-[#8A9684] to-[#454F41]',
    tierBadge: 'Resource Ranger',
    level: 18,
    points: 48900,
    co2Saved: '920 kg',
    treesPlanted: 16,
    streakDays: 7,
  },
];

const CURRENT_USER: LeaderboardUser = {
  rank: 12,
  name: 'Rifqi Pratama',
  avatarText: 'RP',
  avatarGradient: 'from-[#748E33] via-[#5D7327] to-[#45571C]',
  tierBadge: 'Penjaga Atmosfer',
  level: 15,
  points: 24850,
  co2Saved: '1.842 kg',
  treesPlanted: 36,
  streakDays: 18,
  isCurrentUser: true,
};

/* ─────────────────────────────────────────────────────────────────────────────
   LEADERBOARD SECTION COMPONENT (EDITORIAL "WHAT OUR CLIENTS SAY" AESTHETIC)
   ───────────────────────────────────────────────────────────────────────────── */

export function EcoLeaderboardSection({
  className = '',
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [activeFilter, setActiveFilter] = useState<'all' | 'month' | 'week'>('all');

  return (
    <section
      ref={containerRef}
      id="eco-leaderboard"
      aria-label="Eco-Leaderboard & Community Rank"
      className={`relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-transparent text-[#1E2617] ${className}`}
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-16">
        {/* ── Section Header (Editorial Style Matching Reference) ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-[#DFE7D0]">
          <div className="space-y-3 text-center sm:text-left">
            <span className="text-xs uppercase font-sans tracking-[0.2em] text-[#748E33] font-bold block">
              FROM THE GROUND UP • KOMUNITAS
            </span>
            <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E2617] tracking-tight leading-[1.1]">
              Eco-Leaderboard &amp;{' '}
              <span className="italic font-normal text-[#748E33]">Pelopor Hijau</span>
            </h2>
            <p className="text-base text-[#58634F] max-w-xl font-normal leading-relaxed">
              Apresiasi untuk para pelopor sirkularitas teraktif di seluruh nusantara. Terus
              tingkatkan pemilahan material untuk memuncaki papan peringkat.
            </p>
          </div>

          {/* 3D Trophy Card */}
          <div className="flex flex-col items-center shrink-0 p-4 rounded-3xl bg-white border border-[#DFE7D0] shadow-sm">
            <Leaderboard3DTrophy />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#748E33] mt-1">
              CHAMPION TROPHY
            </span>
          </div>
        </div>

        {/* ── 3 Arched Podium Cards (Like "What Our Clients Say" in Reference) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TOP_10_LEADERBOARD.slice(0, 3).map((user, idx) => {
            const isRank1 = user.rank === 1;
            return (
              <div
                key={user.rank}
                className={`relative rounded-t-[5rem] sm:rounded-t-[6rem] rounded-b-3xl border-2 p-8 text-center flex flex-col justify-between transition-all duration-300 ${
                  isRank1
                    ? 'bg-[#EFF3E4] border-[#748E33] shadow-md -translate-y-2'
                    : 'bg-white border-[#DFE7D0] shadow-2xs'
                }`}
              >
                {/* Crown / Rank Badge */}
                <div className="flex justify-center mb-4">
                  {isRank1 ? (
                    <div className="w-12 h-12 rounded-full bg-[#748E33] text-white flex items-center justify-center shadow-sm">
                      <Crown className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  ) : user.rank === 2 ? (
                    <div className="w-12 h-12 rounded-full bg-[#5B8E85] text-white flex items-center justify-center shadow-sm">
                      <Medal className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#CE9B42] text-white flex items-center justify-center shadow-sm">
                      <Award className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono font-bold text-[#748E33] uppercase">
                    Rank #{user.rank} • Lv.{user.level}
                  </span>
                  <h4 className="font-fraunces text-2xl font-normal text-[#1E2617]">
                    {user.name}
                  </h4>
                  <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#DFE7D0] text-[11px] font-sans font-medium text-[#58634F]">
                    {user.tierBadge}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#DFE7D0] flex items-center justify-between text-left">
                  <div>
                    <span className="text-[10px] text-[#58634F] uppercase font-bold block">
                      Total Poin
                    </span>
                    <span className="font-fraunces text-xl font-normal text-[#1E2617]">
                      {user.points.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#58634F] uppercase font-bold block">
                      CO₂e Terhindar
                    </span>
                    <span className="font-mono text-sm font-bold text-[#748E33]">
                      {user.co2Saved}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Period Filter Tabs ───────────────────────────── */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#EFF3E4] border border-[#DFE7D0]">
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
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#748E33] text-white shadow-xs font-semibold'
                    : 'text-[#58634F] hover:text-[#1E2617] hover:bg-white/60 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#58634F]">
            <Globe2 className="w-4 h-4 text-[#748E33]" />
            <span>24.819 Pengguna Aktif</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MAIN LEADERBOARD LIST CONTAINER
           ══════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-white border border-[#DFE7D0] shadow-sm p-6 sm:p-10 overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-3 px-4 pb-4 border-b border-[#DFE7D0] text-xs font-sans font-bold uppercase tracking-wider text-[#58634F] select-none">
            <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
            <div className="col-span-6 sm:col-span-7">Pengguna &amp; Gelar</div>
            <div className="col-span-4 sm:col-span-4 text-right">Poin Ekologis</div>
          </div>

          {/* List items */}
          <div className="divide-y divide-[#DFE7D0]">
            {TOP_10_LEADERBOARD.map((user) => (
              <div
                key={user.rank}
                className="grid grid-cols-12 gap-3 items-center px-4 py-4 rounded-2xl transition-colors duration-200 hover:bg-[#F4F7EC]"
              >
                <div className="col-span-2 sm:col-span-1 text-center font-mono text-sm font-bold text-[#58634F]">
                  #{user.rank}
                </div>

                <div className="col-span-6 sm:col-span-7 flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${user.avatarGradient} text-white font-bold text-xs shrink-0 shadow-xs`}
                  >
                    {user.avatarText}
                  </div>
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-fraunces text-base font-normal text-[#1E2617] truncate">
                        {user.name}
                      </span>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#EFF3E4] text-[10px] font-mono text-[#748E33] font-bold">
                        Lv.{user.level}
                      </span>
                    </div>
                    <span className="text-xs text-[#58634F] block">{user.tierBadge}</span>
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-4 text-right space-y-0.5">
                  <div className="font-fraunces text-lg text-[#1E2617]">
                    {user.points.toLocaleString('id-ID')}
                    <span className="font-sans text-xs font-bold text-[#748E33] ml-1">PTS</span>
                  </div>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-[#748E33]">
                    <Flame className="w-3 h-3 text-[#CE9B42]" />
                    <span className="font-mono">{user.streakDays}d streak</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky/Pinned Current User Bar */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#EFF3E4] border-2 border-[#748E33]/30 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3 sm:gap-4 truncate">
              <div className="px-2.5 py-1 rounded-xl bg-[#748E33] text-white font-mono text-xs sm:text-sm font-extrabold shrink-0">
                #{CURRENT_USER.rank}
              </div>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${CURRENT_USER.avatarGradient} text-white font-bold text-xs shrink-0`}
              >
                {CURRENT_USER.avatarText}
              </div>
              <div className="space-y-0.5 truncate">
                <div className="flex items-center gap-2">
                  <span className="font-fraunces text-base font-normal text-[#1E2617] truncate">
                    {CURRENT_USER.name}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#748E33] text-[10px] font-sans font-extrabold text-white uppercase">
                    Anda
                  </span>
                </div>
                <span className="text-xs text-[#58634F] block">
                  {CURRENT_USER.tierBadge} (Lv.{CURRENT_USER.level})
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-fraunces text-xl text-[#1E2617]">
                {CURRENT_USER.points.toLocaleString('id-ID')}
                <span className="font-sans text-xs font-bold text-[#748E33] ml-1">PTS</span>
              </div>
              <span className="text-[11px] text-[#58634F]">Top 2.4% Nasional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcoLeaderboardSection;
