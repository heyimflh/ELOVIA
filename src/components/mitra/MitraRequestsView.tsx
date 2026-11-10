'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  MapPin,
  Check,
  X,
  Scale,
  ArrowRight,
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  Sparkles,
  Inbox,
  ShieldAlert,
} from 'lucide-react';
import { useMitra } from './MitraContext';

export interface HandoverTicket {
  id: string;
  customerName: string;
  avatarInitials: string;
  createdAt: string;
  materials: string[];
  weightEst: string;
  valueEst: string;
  method: 'pickup' | 'dropoff';
  methodLabel: string;
  location: string;
  timeSlot: string;
  status: 'pending' | 'ready_for_weighing' | 'scheduled' | 'completed' | 'rejected';
}

const INITIAL_TICKETS: HandoverTicket[] = [
  {
    id: 'REQ-2481',
    customerName: 'Budi Santoso',
    avatarInitials: 'BS',
    createdAt: 'Hari ini, 10:45 WIB',
    materials: ['Kardus Cokelat', 'Botol PET Bening'],
    weightEst: 'Est. 14.5 kg',
    valueEst: '≈ Rp 42.000',
    method: 'pickup',
    methodLabel: 'Jemput Armada',
    location: 'Jl. Ir. H. Juanda No. 120, Coblong',
    timeSlot: 'Hari ini · 13:30 - 15:00 WIB',
    status: 'pending',
  },
  {
    id: 'REQ-2479',
    customerName: 'Ahmad Fauzi',
    avatarInitials: 'AF',
    createdAt: 'Hari ini, 09:15 WIB',
    materials: ['Botol Kaca Bening', 'Kaleng Aluminium'],
    weightEst: 'Est. 8.2 kg',
    valueEst: '≈ Rp 21.000',
    method: 'pickup',
    methodLabel: 'Jemput Armada',
    location: 'Jl. Tubagus Ismail Raya No. 45, Dago Atas',
    timeSlot: 'Hari ini · 15:30 - 17:00 WIB',
    status: 'pending',
  },
  {
    id: 'ORD-ELV-20261104-089',
    customerName: 'Lestari Handayani',
    avatarInitials: 'LH',
    createdAt: 'Hari ini, 08:30 WIB',
    materials: ['Kertas HVS Putih', 'Arsip Dokumen'],
    weightEst: 'Est. 12.8 kg',
    valueEst: '≈ Rp 38.400',
    method: 'dropoff',
    methodLabel: 'Drop-off Mandiri',
    location: 'Gerai Bank Sampah Berkah Mandiri (Drop-off Zone)',
    timeSlot: 'Tiba di gerai · Siap Ditimbang',
    status: 'ready_for_weighing',
  },
  {
    id: 'REQ-2480',
    customerName: 'Komunitas RW 07 Sukasari',
    avatarInitials: 'RW',
    createdAt: 'Kemarin, 14:20 WIB',
    materials: ['Kardus Kemasan', 'Plastik Campur', 'Logam Besi'],
    weightEst: 'Final 38.0 kg',
    valueEst: 'Rp 112.500',
    method: 'pickup',
    methodLabel: 'Jemput Armada',
    location: 'Balai Warga RW 07, Sukasari, Bandung',
    timeSlot: 'Transaksi Tuntas · Tercatat di Ledger',
    status: 'completed',
  },
];

type FilterTabKey = 'all' | 'pending' | 'weighing' | 'completed';

interface RejectModalState {
  isOpen: boolean;
  ticket: HandoverTicket | null;
  reason: string;
}

export function MitraRequestsView() {
  const { addToast, openWeighIn } = useMitra();
  const [tickets, setTickets] = useState<HandoverTicket[]>(INITIAL_TICKETS);
  const [activeTab, setActiveTab] = useState<FilterTabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectModal, setRejectModal] = useState<RejectModalState>({
    isOpen: false,
    ticket: null,
    reason: 'Di luar jangkauan radius armada (> 15 km)',
  });

  // Dynamic counts for tabs
  const counts = useMemo(() => {
    return {
      all: tickets.filter((t) => t.status !== 'rejected').length,
      pending: tickets.filter((t) => t.status === 'pending').length,
      weighing: tickets.filter((t) => t.status === 'ready_for_weighing').length,
      completed: tickets.filter((t) => t.status === 'completed').length,
    };
  }, [tickets]);

  // Tab definitions
  const tabs = [
    { key: 'all' as FilterTabKey, label: `Semua (${counts.all})` },
    { key: 'pending' as FilterTabKey, label: `Butuh Respon (${counts.pending})` },
    { key: 'weighing' as FilterTabKey, label: `Menunggu Timbang (${counts.weighing})` },
    { key: 'completed' as FilterTabKey, label: `Selesai (${counts.completed})` },
  ];

  // Filtered and searched list
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Tab filter
      if (activeTab === 'pending' && ticket.status !== 'pending') return false;
      if (activeTab === 'weighing' && ticket.status !== 'ready_for_weighing') return false;
      if (activeTab === 'completed' && ticket.status !== 'completed') return false;
      if (ticket.status === 'rejected') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = ticket.customerName.toLowerCase().includes(query);
        const matchId = ticket.id.toLowerCase().includes(query);
        const matchLocation = ticket.location.toLowerCase().includes(query);
        const matchMaterial = ticket.materials.some((m) => m.toLowerCase().includes(query));
        return matchName || matchId || matchLocation || matchMaterial;
      }

      return true;
    });
  }, [tickets, activeTab, searchQuery]);

  // Action: Confirm Ticket
  const handleConfirmTicket = (ticket: HandoverTicket) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticket.id ? { ...t, status: 'scheduled' as const } : t
      )
    );
    addToast({
      title: 'Permintaan Dikonfirmasi',
      description: `Jadwal penjemputan untuk ${ticket.customerName} (#${ticket.id}) berhasil disetujui. Notifikasi dikirimkan ke warga.`,
      type: 'success',
    });
  };

  // Action: Open Reject Dialog
  const handleOpenRejectDialog = (ticket: HandoverTicket) => {
    setRejectModal({
      isOpen: true,
      ticket,
      reason: 'Di luar jangkauan radius armada (> 15 km)',
    });
  };

  // Action: Confirm Reject
  const handleConfirmReject = () => {
    if (!rejectModal.ticket) return;
    const ticketId = rejectModal.ticket.id;
    const customer = rejectModal.ticket.customerName;

    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'rejected' as const } : t))
    );
    addToast({
      title: 'Permintaan Ditolak',
      description: `Pengajuan #${ticketId} oleh ${customer} telah ditolak (${rejectModal.reason}).`,
      type: 'warning',
    });
    setRejectModal({ isOpen: false, ticket: null, reason: '' });
  };

  // Helper for left border color
  const getStatusBarColor = (status: HandoverTicket['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-400';
      case 'ready_for_weighing':
        return 'bg-emerald-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'completed':
      default:
        return 'bg-slate-300';
    }
  };

  // Helper for status badge
  const renderStatusBadge = (status: HandoverTicket['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="text-[10px] font-mono font-bold tracking-wider text-amber-600 bg-amber-100/80 px-2 py-1 rounded-md border border-amber-200/50 uppercase">
            MENUNGGU KONFIRMASI
          </span>
        );
      case 'ready_for_weighing':
        return (
          <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-1 rounded-md border border-emerald-200/50 uppercase">
            SIAP DITIMBANG
          </span>
        );
      case 'scheduled':
        return (
          <span className="text-[10px] font-mono font-bold tracking-wider text-blue-700 bg-blue-100/80 px-2 py-1 rounded-md border border-blue-200/50 uppercase">
            TERJADWAL
          </span>
        );
      case 'completed':
      default:
        return (
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60 uppercase">
            SELESAI
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-jakarta">
            Antrean Permintaan
          </h1>
          <p className="text-slate-600 mt-1 text-sm">
            Kelola pengajuan penjemputan dan pengantaran dari warga.
          </p>
        </div>

        {/* Quick status pill & Drawer trigger */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => openWeighIn()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition hover:scale-[1.02] active:scale-95 cursor-pointer"
            title="Buka Slide-Over Drawer Input Timbangan"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Input Timbangan Baru</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/50 text-xs text-slate-700 shadow-2xs backdrop-blur-sm self-start sm:self-auto">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>SLA Target: ≤ 24 jam</span>
          </div>
        </div>
      </div>

      {/* ── Toolbar Area: Filter Tabs & Search Bar ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 mb-6">
        {/* Left Side: Glass Pill Filter Tabs */}
        <div className="bg-white/50 backdrop-blur-md p-1 rounded-full inline-flex gap-1 border border-white/60 shadow-sm flex-wrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-200 rounded-full select-none ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-slate-600 hover:bg-white/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterTab"
                    className="absolute inset-0 bg-emerald-600 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Clean Search Input */}
        <div className="relative w-full md:w-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau tiket..."
            className="bg-white/60 border border-white/50 rounded-full pl-9 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full sm:w-64 backdrop-blur-sm shadow-2xs transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── The Stacked Card List (Main Content) ── */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTickets.length === 0 ? (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[1.5rem] p-12 text-center flex flex-col items-center justify-center shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <Inbox className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Tidak ada tiket pada kategori ini
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {searchQuery
                  ? `Tidak ditemukan hasil yang cocok dengan kata kunci "${searchQuery}". Coba kata kunci lain.`
                  : 'Semua pengajuan pada filter ini telah selesai ditindaklanjuti.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-xs hover:bg-emerald-700 transition"
                >
                  Reset Pencarian
                </button>
              )}
            </motion.div>
          ) : (
            filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-lg rounded-[1.5rem] p-6 transition-all duration-300 group"
              >
                {/* 4px Left Status Indicator Bar */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusBarColor(
                    ticket.status
                  )}`}
                  aria-hidden="true"
                />

                {/* Card Content Anatomy (12 Columns Responsive Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* ── 1. User & Time (col-span-3) ── */}
                  <div className="md:col-span-3 flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/70 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      {ticket.avatarInitials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-base leading-tight truncate">
                        {ticket.customerName}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 truncate">
                        {ticket.createdAt} • {ticket.id}
                      </p>
                    </div>
                  </div>

                  {/* ── 2. Material & Value (col-span-4) ── */}
                  <div className="md:col-span-4">
                    {/* Material Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {ticket.materials.map((mat) => (
                        <span
                          key={mat}
                          className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200 font-medium"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>

                    {/* Weight & Est. Value */}
                    <p className="font-mono text-sm font-semibold text-emerald-700 mt-2">
                      {ticket.weightEst} • {ticket.valueEst}
                    </p>
                  </div>

                  {/* ── 3. Logistics / Method (col-span-3) ── */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                      {ticket.method === 'pickup' ? (
                        <>
                          <Truck size={16} className="text-blue-500 shrink-0" />
                          <span>Jemput Armada</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={16} className="text-emerald-500 shrink-0" />
                          <span>Drop-off Mandiri</span>
                        </>
                      )}
                    </div>

                    <p
                      className="text-xs text-slate-500 line-clamp-1 mt-1"
                      title={ticket.location}
                    >
                      {ticket.location}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {ticket.timeSlot}
                    </p>
                  </div>

                  {/* ── 4. Action Area (col-span-2, flex justify-end) ── */}
                  <div className="md:col-span-2 flex flex-col items-end gap-3 justify-center">
                    {/* Status Badge */}
                    {renderStatusBadge(ticket.status)}

                    {/* Action Buttons */}
                    <div className="flex gap-2 items-center">
                      {ticket.status === 'pending' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleOpenRejectDialog(ticket)}
                            className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors duration-200 shadow-2xs"
                          >
                            Tolak
                          </button>
                          <button
                            type="button"
                            onClick={() => handleConfirmTicket(ticket)}
                            className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 rounded-xl transition-all duration-200 flex items-center gap-1 hover:scale-[1.02] active:scale-95"
                          >
                            <Check size={16} className="stroke-[2.5]" />
                            <span>Konfirmasi</span>
                          </button>
                        </>
                      ) : ticket.status === 'ready_for_weighing' ? (
                        <button
                          type="button"
                          onClick={() =>
                            openWeighIn({
                              ticketId: ticket.id,
                              customerName: ticket.customerName,
                              customerAvatar: ticket.avatarInitials,
                              location: ticket.location,
                              method: ticket.method,
                              materials: [
                                {
                                  id: 'mat-1',
                                  name: ticket.materials[0] || 'Kardus Cokelat',
                                  estimatedWeight: 14.5,
                                  actualWeight: 14.5,
                                  basePricePerKg: 2000,
                                  quality: 'A',
                                },
                                {
                                  id: 'mat-2',
                                  name: ticket.materials[1] || 'Botol PET Bening',
                                  estimatedWeight: 4.0,
                                  actualWeight: 4.0,
                                  basePricePerKg: 3250,
                                  quality: 'A',
                                },
                              ],
                            })
                          }
                          className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 rounded-xl transition-all duration-200 flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
                        >
                          <Scale size={16} />
                          <span>Input Timbangan</span>
                        </button>
                      ) : ticket.status === 'scheduled' ? (
                        <Link
                          href={`/salur/${ticket.id}`}
                          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 hover:bg-white border border-slate-200 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>Detail</span>
                          <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <Link
                          href={`/salur/${ticket.id}`}
                          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white/80 hover:bg-white border border-slate-200 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-2xs"
                        >
                          <FileText size={14} />
                          <span>Lihat Resi</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Interactive Rejection Confirmation Modal ── */}
      <AnimatePresence>
        {rejectModal.isOpen && rejectModal.ticket && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRejectModal({ isOpen: false, ticket: null, reason: '' })}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200/80 p-6 shadow-2xl z-10"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Tolak Pengajuan Penyaluran?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Pengajuan #{rejectModal.ticket.id} oleh{' '}
                    <strong className="text-slate-800">
                      {rejectModal.ticket.customerName}
                    </strong>{' '}
                    akan dibatalkan.
                  </p>
                </div>
              </div>

              {/* Reasons */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Pilih alasan penolakan (dikirim ke warga):
                </span>
                {[
                  'Di luar jangkauan radius armada (> 15 km)',
                  'Slot armada harian sudah penuh',
                  'Material tidak sesuai kriteria SNI',
                  'Jadwal penjemputan tidak memungkinkan',
                ].map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium cursor-pointer transition ${
                      rejectModal.reason === r
                        ? 'bg-rose-50 border-rose-300 text-rose-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rejectReason"
                      value={r}
                      checked={rejectModal.reason === r}
                      onChange={() => setRejectModal((prev) => ({ ...prev, reason: r }))}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setRejectModal({ isOpen: false, ticket: null, reason: '' })}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition"
                >
                  Ya, Tolak Permintaan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

