'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Receipt,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  RotateCcw,
  ShieldCheck,
  Check,
  SlidersHorizontal,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Sparkle,
} from 'lucide-react';
import {
  type LedgerTransaction,
  type LedgerStatus,
  MOCK_DETAILED_LEDGER_TRANSACTIONS,
} from './transactionLedgerData';
import { formatCurrencyIDR } from './confirmedEarningsData';
import { TransactionDetailDrawer } from './TransactionDetailDrawer';
import { EmptyWalletJourneyState } from './EmptyWalletJourneyState';

export type StatusFilterOption = 'ALL' | 'TERKONFIRMASI' | 'DALAM PROSES' | 'ESTIMASI';
export type DateFilterOption = 'ALL' | '7D' | '30D' | '90D';
export type SortOption = 'NEWEST' | 'OLDEST' | 'AMOUNT_DESC' | 'AMOUNT_ASC';

const ITEMS_PER_PAGE = 5;

export interface ImmutableLedgerSectionProps {
  transactions?: LedgerTransaction[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  className?: string;
  enableSimulationToggle?: boolean;
}

export function ImmutableLedgerSection({
  transactions: propTransactions,
  isLoading = false,
  isError = false,
  errorMessage = 'Gagal memuat catatan buku besar transaksi.',
  onRetry,
  className = '',
  enableSimulationToggle = true,
}: ImmutableLedgerSectionProps) {
  // Simulation Toggle for testing Empty State vs Active State
  const [simulatedEmpty, setSimulatedEmpty] = useState(false);

  // Determine active dataset
  const baseTransactions = useMemo(() => {
    if (simulatedEmpty) return [];
    return propTransactions ?? MOCK_DETAILED_LEDGER_TRANSACTIONS;
  }, [simulatedEmpty, propTransactions]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>('ALL');
  const [dateFilter, setDateFilter] = useState<DateFilterOption>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NEWEST');
  const [currentPage, setCurrentPage] = useState(1);

  // Selected transaction for Drawer modal
  const [selectedTransaction, setSelectedTransaction] = useState<LedgerTransaction | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter & Sort Logic
  const filteredTransactions = useMemo(() => {
    return baseTransactions.filter((tx) => {
      // 1. Search filter (partner, ID, or material category)
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        tx.collectorPartner.name.toLowerCase().includes(q) ||
        tx.id.toLowerCase().includes(q) ||
        tx.primaryMaterialCategory.toLowerCase().includes(q) ||
        tx.orderNumber.toLowerCase().includes(q);

      if (!matchSearch) return false;

      // 2. Status filter
      if (statusFilter !== 'ALL' && tx.status !== statusFilter) {
        return false;
      }

      // 3. Date filter (relative to modern mock baseline Nov 2026)
      if (dateFilter !== 'ALL') {
        const txDate = new Date(tx.isoDate).getTime();
        const now = new Date('2026-11-10T23:59:59').getTime();
        const diffDays = (now - txDate) / (1000 * 60 * 60 * 24);

        if (dateFilter === '7D' && diffDays > 7) return false;
        if (dateFilter === '30D' && diffDays > 30) return false;
        if (dateFilter === '90D' && diffDays > 90) return false;
      }

      return true;
    }).sort((a, b) => {
      // 4. Sort logic
      if (sortOption === 'NEWEST') {
        return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
      }
      if (sortOption === 'OLDEST') {
        return new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime();
      }
      if (sortOption === 'AMOUNT_DESC') {
        return b.netEarnings - a.netEarnings;
      }
      if (sortOption === 'AMOUNT_ASC') {
        return a.netEarnings - b.netEarnings;
      }
      return 0;
    });
  }, [baseTransactions, searchQuery, statusFilter, dateFilter, sortOption]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1;
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const handleRowClick = (tx: LedgerTransaction) => {
    setSelectedTransaction(tx);
    setIsDrawerOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setDateFilter('ALL');
    setSortOption('NEWEST');
    setCurrentPage(1);
  };

  const renderStatusBadge = (status: LedgerStatus) => {
    switch (status) {
      case 'TERKONFIRMASI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-700 shadow-2xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            TERKONFIRMASI
          </span>
        );
      case 'DALAM PROSES':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700 shadow-2xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            DALAM PROSES
          </span>
        );
      case 'ESTIMASI':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-700 shadow-2xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            ESTIMASI
          </span>
        );
    }
  };

  return (
    <section className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`}>
      {/* ───────────────────────────────────────────────────────────────────────
          1. SECTION HEADER (Editorial & High-End)
          - Eyebrow: TRANSACTION HISTORY
          - Title: The Immutable Ledger
          - Subtitle: Every contribution, every value, transparently recorded.
          - Right Desktop: Simulation Switcher & Verified Ledger Badge
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-800 uppercase tracking-widest mb-3.5 shadow-2xs">
            <Receipt className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transaction History</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-jakarta leading-tight">
            The Immutable Ledger
          </h2>

          <p className="mt-2 text-slate-500 text-sm sm:text-base font-light max-w-xl leading-relaxed">
            Every contribution, every value, transparently recorded. Jejak kontribusimu tercatat
            permanen tanpa manipulasi.
          </p>
        </div>

        {/* Right Header Status Chip + Simulation Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Interactive Simulation Switcher (Pillar for Review & Testing FR-WLT-07) */}
          {enableSimulationToggle && !isLoading && !isError && (
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/90 text-xs shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setSimulatedEmpty(false);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
                  !simulatedEmpty
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Tampilkan transaksi aktif"
              >
                Data Aktif ({propTransactions ? propTransactions.length : MOCK_DETAILED_LEDGER_TRANSACTIONS.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSimulatedEmpty(true);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-semibold ${
                  simulatedEmpty
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Simulasi keadaan akun baru tanpa transaksi (FR-WLT-07)"
              >
                Akun Baru (0)
              </button>
            </div>
          )}

          {/* Right Header Status Chip (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-900 block">
                  {baseTransactions.length} Transaksi Tercatat
                </span>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Verified Immutable Ledger
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────────────
          2. CONDITIONAL RENDERING (PRD FR-WLT-07 Architecture):
          - Case A: isLoading === true  -> Shimmer Loading Skeleton
          - Case B: isError === true    -> Error State with Retry CTA
          - Case C: baseTransactions === 0 -> Empty State: My First Earnings Journey
          - Case D: baseTransactions > 0   -> Main Ledger Table, Filter, & Drawer
      ──────────────────────────────────────────────────────────────────────── */}
      {isLoading ? (
        /* ── Case A: Loading State ── */
        <div className="rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] p-8 sm:p-14 flex flex-col items-center justify-center min-h-[420px] text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 animate-spin">
            <Loader2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-slate-800">Memuat Buku Besar Transaksi...</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Menghubungkan ke node ledger terverifikasi ELOVIA. Mohon tunggu sebentar.
          </p>
          <div className="w-full max-w-2xl mt-8 space-y-3">
            <div className="h-11 bg-slate-100/80 rounded-2xl animate-pulse" />
            <div className="h-16 bg-slate-50 rounded-2xl animate-pulse" />
            <div className="h-16 bg-slate-50/70 rounded-2xl animate-pulse" />
          </div>
        </div>
      ) : isError ? (
        /* ── Case B: Error State ── */
        <div className="rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-rose-100 shadow-[0_20px_50px_-20px_rgba(244,63,94,0.08)] p-8 sm:p-14 flex flex-col items-center justify-center min-h-[420px] text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">Gagal Memuat Transaksi</h4>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            {errorMessage || 'Terjadi gangguan saat mengambil data buku besar transaksi. Silakan coba kembali.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Ulang Data</span>
            </button>
          )}
        </div>
      ) : baseTransactions.length === 0 ? (
        /* ── Case C: Empty State: My First Earnings Journey (FR-WLT-07) ── */
        <EmptyWalletJourneyState />
      ) : (
        /* ── Case D: Full Immutable Ledger Table & Controls ── */
        <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] p-4 sm:p-6 lg:p-8 relative overflow-hidden">
          {/* Soft Ambient Corner Glow */}
          <div
            className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* ── 3. LEDGER TOOLBAR ── */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari mitra pengepul atau transaksi..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-50/80 border border-slate-200/80 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
                {(['ALL', 'TERKONFIRMASI', 'DALAM PROSES', 'ESTIMASI'] as StatusFilterOption[]).map(
                  (tab) => {
                    const label =
                      tab === 'ALL'
                        ? 'Semua'
                        : tab === 'TERKONFIRMASI'
                        ? 'Terkonfirmasi'
                        : tab === 'DALAM PROSES'
                        ? 'Proses'
                        : 'Estimasi';
                    const isActive = statusFilter === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => {
                          setStatusFilter(tab);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-full transition-all text-xs ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Date Filter Dropdown */}
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value as DateFilterOption);
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-8 pr-7 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                >
                  <option value="ALL">Semua Waktu</option>
                  <option value="7D">7 Hari Terakhir</option>
                  <option value="30D">30 Hari Terakhir</option>
                  <option value="90D">90 Hari Terakhir</option>
                </select>
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-8 pr-7 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
                >
                  <option value="NEWEST">Terbaru</option>
                  <option value="OLDEST">Terlama</option>
                  <option value="AMOUNT_DESC">Nilai Tertinggi</option>
                  <option value="AMOUNT_ASC">Nilai Terendah</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ── 4. LEDGER CONTENT (TABLE vs CARDS vs EMPTY STATE) ── */}
          {filteredTransactions.length === 0 ? (
            /* Search/Filter Empty State within active data */
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
                <FileText className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Tidak Ada Transaksi Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Tidak ada transaksi yang cocok dengan kata kunci atau filter yang Anda pilih.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filter</span>
                </button>
                <Link
                  href="/pasar"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-2xs transition-colors"
                >
                  <span>Explore Waste Marketplace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE (Hidden on Mobile) */}
              <div className="hidden md:block overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      <th className="py-3.5 px-4 font-semibold">TANGGAL & ORDER</th>
                      <th className="py-3.5 px-4 font-semibold">MITRA PENGEPUL</th>
                      <th className="py-3.5 px-4 font-semibold">TOTAL BOBOT</th>
                      <th className="py-3.5 px-4 font-semibold text-right">NET EARNINGS</th>
                      <th className="py-3.5 px-4 font-semibold text-center">STATUS</th>
                      <th className="py-3.5 px-2 text-right">
                        <span className="sr-only">Aksi</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {paginatedTransactions.map((tx, idx) => (
                      <tr
                        key={tx.id}
                        onClick={() => handleRowClick(tx)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRowClick(tx);
                          }
                        }}
                        className={`group cursor-pointer transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        } hover:bg-emerald-50/50 focus:outline-none focus:bg-emerald-50/70`}
                      >
                        {/* Tanggal & Order */}
                        <td className="py-4 px-4 font-mono">
                          <span className="font-semibold text-slate-900 block">{tx.date}</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {tx.time} &bull; {tx.orderNumber}
                          </span>
                        </td>

                        {/* Mitra Pengepul */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-xs font-bold font-mono text-emerald-800 shrink-0">
                              {tx.collectorPartner.avatarInitials}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-900 block group-hover:text-emerald-800 transition-colors">
                                {tx.collectorPartner.name}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {tx.collectorPartner.location}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Total Bobot */}
                        <td className="py-4 px-4">
                          <span className="font-mono font-semibold text-slate-800 block">
                            {tx.totalWeightKg.toFixed(2)} kg
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {tx.primaryMaterialCategory}
                          </span>
                        </td>

                        {/* Net Earnings (Monospace, Right-Aligned) */}
                        <td className="py-4 px-4 text-right">
                          <span className="font-mono text-sm font-bold text-slate-900 tracking-tight block">
                            {formatCurrencyIDR(tx.netEarnings)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Gross: {formatCurrencyIDR(tx.financials?.grossMaterialValue ?? tx.netEarnings)}
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4 text-center">
                          {renderStatusBadge(tx.status)}
                        </td>

                        {/* Sliding Chevron Action */}
                        <td className="py-4 px-2 text-right">
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS (Hidden on Desktop) */}
              <div className="block md:hidden space-y-3 mt-4">
                {paginatedTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => handleRowClick(tx)}
                    role="button"
                    tabIndex={0}
                    className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs active:bg-emerald-50/50 transition-colors"
                  >
                    {/* Top: Avatar, Name, Date, Status */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-100/70 border border-emerald-300/60 flex items-center justify-center text-xs font-bold font-mono text-emerald-800 shrink-0">
                          {tx.collectorPartner.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {tx.collectorPartner.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {tx.date} &bull; {tx.time}
                          </span>
                        </div>
                      </div>
                      {renderStatusBadge(tx.status)}
                    </div>

                    {/* Bottom: Weight & Net Earnings */}
                    <div className="pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                          Total Bobot
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-700">
                          {tx.totalWeightKg.toFixed(2)} kg
                        </span>
                      </div>

                      <div className="text-right flex items-center gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                            Net Earnings
                          </span>
                          <span className="text-sm font-mono font-bold text-slate-900 block">
                            {formatCurrencyIDR(tx.netEarnings)}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── 5. PAGINATION CONTROLS ── */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div>
                  Menampilkan{' '}
                  <span className="font-mono font-bold text-slate-900">
                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTransactions.length)}
                  </span>
                  –
                  <span className="font-mono font-bold text-slate-900">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)}
                  </span>{' '}
                  dari{' '}
                  <span className="font-mono font-bold text-slate-900">
                    {filteredTransactions.length}
                  </span>{' '}
                  transaksi
                </div>

                {/* Prev / Page Pills / Next */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold transition-colors ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── 6. TRANSACTION DETAIL DRAWER (FR-WLT-04) ── */}
      <TransactionDetailDrawer
        transaction={selectedTransaction}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}

export default ImmutableLedgerSection;
