'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Award,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Users2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { LeaderboardGroup } from './types';

const INITIAL_GROUPS: LeaderboardGroup[] = [
  {
    id: 'teknik-uns',
    rank: 1,
    name: 'Teknik UNS',
    category: 'Kampus',
    verifiedKg: 312.4,
    membersCount: 42,
    verifiedTransactions: 86,
    recentActivity: 'Terverifikasi 4m lalu',
  },
  {
    id: 'rt-04-warakas',
    rank: 2,
    name: 'RT 04 Warakas',
    category: 'RT/RW',
    verifiedKg: 248.8,
    membersCount: 28,
    verifiedTransactions: 64,
    recentActivity: 'Terverifikasi 12m lalu',
  },
  {
    id: 'komunitas-hijau',
    rank: 3,
    name: 'Komunitas Hijau',
    category: 'Komunitas',
    verifiedKg: 242.1,
    membersCount: 35,
    verifiedTransactions: 59,
    recentActivity: 'Terverifikasi 18m lalu',
  },
];

export function LeaderboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const [groups, setGroups] = useState<LeaderboardGroup[]>(INITIAL_GROUPS);
  const [lastSwappedId, setLastSwappedId] = useState<string | null>(null);
  const [pulseLive, setPulseLive] = useState(false);

  // Interval that swaps rank 2 and rank 3 periodically to simulate a 'live, breathing' leaderboard
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setGroups((currentGroups) => {
        if (currentGroups.length < 3) return currentGroups;

        const next = [...currentGroups];
        const group2 = next[1];
        const group3 = next[2];

        // Swap positions and assign the new rank values
        next[1] = {
          ...group3,
          rank: 2,
          // Slightly simulate dynamic verified addition (e.g. 248.8 vs 251.2)
          verifiedKg: Number((group2.verifiedKg + 2.4).toFixed(1)),
        };

        next[2] = {
          ...group2,
          rank: 3,
        };

        setLastSwappedId(group3.id);
        return next;
      });

      setPulseLive(true);
      const timer = setTimeout(() => {
        setPulseLive(false);
      }, 1500);

      return () => clearTimeout(timer);
    }, 5500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col justify-between h-full bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#D3EBDB] p-6 sm:p-8 lg:p-9 shadow-[0_10px_30px_rgba(23,122,71,0.05),0_1px_3px_rgba(15,31,23,0.04)] shadow-[inset_0_0_36px_rgba(232,244,236,0.55)] overflow-hidden"
    >
      {/* Subtle top-right ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-bl from-[#E8F4EC] to-transparent rounded-full blur-2xl pointer-events-none opacity-60"
      />

      {/* Main Container Content */}
      <div className="relative z-10 space-y-5 sm:space-y-6">
        {/* ===================================================================
            HEADER: Leaderboard Title, Live Indicator & Scope
            =================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#177A47] font-jakarta">
                PRATINJAU LEADERBOARD
              </span>
              <span className="text-[#A9D3B8]">•</span>
              <span className="text-xs text-[#5D7065] font-jakarta">Top 3 Kelompok</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1F17] font-jakarta tracking-tight mt-0.5">
              Peringkat Terverifikasi
            </h3>
          </div>

          {/* Live breathing status indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              pulseLive
                ? 'bg-[#177A47] text-white shadow-sm ring-2 ring-[#2FA866]/40'
                : 'bg-[#E8F4EC] text-[#177A47] border border-[#D3EBDB]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  pulseLive ? 'bg-white' : 'bg-[#2FA866]'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  pulseLive ? 'bg-white' : 'bg-[#177A47]'
                }`}
              />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-tight">
              {pulseLive ? 'PERINGKAT DIPERBARUI' : 'LIVE RANKING'}
            </span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-[#4A5D52] font-jakarta">
          Kelompok dengan kontribusi terverifikasi terbanyak pada periode tantangan aktif bulan ini.
        </p>

        {/* ===================================================================
            CRUCIAL ANIMATION: AnimatePresence + layout prop
            Dynamic ranking list with smooth spring transitions
            =================================================================== */}
        <div className="relative space-y-3 pt-1">
          <ul className="space-y-3 relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {groups.map((group) => {
                const isRank1 = group.rank === 1;
                const isRank2 = group.rank === 2;
                const isRank3 = group.rank === 3;
                const wasRecentlySwapped = lastSwappedId === group.id && pulseLive;

                return (
                  <motion.li
                    key={group.id}
                    layout
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                      mass: 0.85,
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      borderColor: wasRecentlySwapped ? '#177A47' : isRank1 ? '#A9D3B8' : '#D3EBDB',
                    }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                      isRank1
                        ? 'bg-gradient-to-r from-[#FFFFFF] via-[#F6FAF7] to-[#E8F4EC]/60 border-[#A9D3B8] shadow-[0_4px_16px_rgba(23,122,71,0.06)]'
                        : 'bg-white hover:bg-[#F6FAF7]/80 border-[#D3EBDB] shadow-xs'
                    }`}
                  >
                    {/* Left: Medal/Rank Icon + Group Name + Category Badge */}
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      {/* Minimalist Medal / Rank Icon tinted in subtle green / sage */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isRank1
                            ? 'bg-[#E8F4EC] border-[#A9D3B8] text-[#177A47] shadow-xs'
                            : isRank2
                            ? 'bg-[#F6FAF7] border-[#D3EBDB] text-[#2FA866]'
                            : 'bg-[#F6FAF7] border-[#D3EBDB] text-[#4A5D52]'
                        }`}
                      >
                        {isRank1 ? (
                          <div className="flex items-center justify-center relative">
                            <Trophy className="w-5 h-5 text-[#177A47]" strokeWidth={2.2} />
                          </div>
                        ) : isRank2 ? (
                          <div className="flex items-center justify-center relative">
                            <Medal className="w-5 h-5 text-[#2FA866]" strokeWidth={2} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative">
                            <Award className="w-5 h-5 text-[#4A5D52]" strokeWidth={2} />
                          </div>
                        )}
                      </div>

                      {/* Group Name & Category Badge */}
                      <div className="min-w-0 truncate">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {/* Rank number */}
                          <span className="font-mono text-xs sm:text-sm font-semibold text-[#5D7065]">
                            #{group.rank}
                          </span>

                          {/* Group name (Plus Jakarta Sans, bold) */}
                          <h4 className="font-jakarta font-bold text-sm sm:text-base text-[#0F1F17] truncate tracking-tight">
                            {group.name}
                          </h4>
                        </div>

                        {/* Category & Members badge */}
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`inline-block text-[11px] px-2 py-0.2 rounded-md font-medium ${
                              group.category === 'Kampus'
                                ? 'bg-[#E8F4EC] text-[#177A47]'
                                : group.category === 'RT/RW'
                                ? 'bg-[#F6FAF7] text-[#4A5D52] border border-[#D3EBDB]'
                                : 'bg-[#E3F6B5]/60 text-[#0F5F37]'
                            }`}
                          >
                            {group.category}
                          </span>
                          <span className="text-[11px] text-[#5D7065] flex items-center gap-1">
                            <Users2 className="w-3 h-3 text-[#A9D3B8]" />
                            {group.membersCount} anggota
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Verified kg in JetBrains Mono */}
                    <div className="text-right shrink-0 pl-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="font-mono font-bold text-base sm:text-lg text-[#177A47] tabular-nums tracking-tight">
                          {group.verifiedKg.toLocaleString('id-ID', {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                          })}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#0F1F17]">
                          kg
                        </span>
                      </div>

                      {/* Verified Status Tag with Check icon */}
                      <div className="flex items-center justify-end gap-1 mt-0.5 text-[11px] text-[#2FA866] font-medium font-jakarta">
                        <CheckCircle2 className="w-3 h-3 text-[#177A47]" />
                        <span className="hidden sm:inline">Terverifikasi</span>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </div>

      {/* ===================================================================
          BOTTOM FOOTER: Live Ticker & Transparency Link
          =================================================================== */}
      <div className="relative z-10 mt-5 pt-4 border-t border-[#D3EBDB]/80 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#5D7065]">
          <div className="flex items-center gap-1.5 truncate">
            <TrendingUp className="w-3.5 h-3.5 text-[#2FA866] shrink-0" />
            <span className="truncate">
              Peringkat bergerak dinamis mengikuti verifikasi timbangan mitra.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#177A47] font-semibold shrink-0">
            Real-Time
          </span>
        </div>
      </div>
    </motion.div>
  );
}

