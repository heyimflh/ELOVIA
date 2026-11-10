'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Home,
  Building,
  Phone,
  MapPin,
  Navigation,
  Star,
  Edit3,
  Trash2,
  Plus,
  Compass,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import type { AddressItem } from '@/lib/addressStore';

export interface AddressCardGridProps {
  /**
   * Daftar alamat tersimpan
   */
  addresses: AddressItem[];
  /**
   * Batas maksimal kuota alamat (default: 5)
   */
  maxQuota?: number;
  /**
   * Callback saat pengguna mengklik "Jadikan Utama"
   */
  onSetDefault?: (id: string) => void;
  /**
   * Callback saat pengguna mengklik "Edit"
   */
  onEdit?: (address: AddressItem) => void;
  /**
   * Callback saat pengguna mengklik "Hapus"
   */
  onDelete?: (id: string) => void;
  /**
   * Callback saat pengguna mengklik kartu "Tambah Alamat Baru"
   */
  onAddNew?: () => void;
  /**
   * ClassName tambahan
   */
  className?: string;
}

// Framer motion variants with responsive stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function AddressCardGrid({
  addresses,
  maxQuota = 5,
  onSetDefault,
  onEdit,
  onDelete,
  onAddNew,
  className = '',
}: AddressCardGridProps) {
  const remainingSlots = Math.max(0, maxQuota - addresses.length);
  const isQuotaFull = addresses.length >= maxQuota;

  const getCategoryIcon = (type: string, label: string) => {
    const lower = (label || type || '').toLowerCase();
    if (lower.includes('kantor') || lower.includes('office') || type === 'office') {
      return <Building size={14} className="text-emerald-600" />;
    }
    if (lower.includes('kost') || lower.includes('kos') || type === 'kost') {
      return <MapPin size={14} className="text-teal-600" />;
    }
    if (lower.includes('studio') || lower.includes('usaha') || type === 'other') {
      return <Briefcase size={14} className="text-emerald-700" />;
    }
    return <Home size={14} className="text-emerald-600" />;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7 ${className}`}
    >
      {/* ── Saved Address Cards (True Frosted Glass) ── */}
      {addresses.map((address) => {
        const isPrimary = address.isDefault;

        return (
          <motion.article
            key={address.id}
            variants={cardVariants}
            className={`relative rounded-[2rem] p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 group ${
              isPrimary
                ? 'bg-white/75 backdrop-blur-2xl border-2 border-emerald-400/90 shadow-[0_12px_36px_rgba(7,155,114,0.14)] ring-4 ring-emerald-500/10 hover:bg-white/90 hover:shadow-[0_22px_45px_rgba(7,155,114,0.20)] hover:-translate-y-1'
                : 'bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_20px_40px_rgba(0,100,50,0.08)] hover:-translate-y-1 hover:border-emerald-200/60'
            }`}
          >
            <div>
              {/* ── 1. CARD HEADER: Category & Default Badge ── */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                {/* Left: Category Label Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-slate-800 text-xs font-bold shadow-2xs">
                  {getCategoryIcon(address.type, address.label)}
                  <span>{address.label}</span>
                </div>

                {/* Right: Primary Badge */}
                {isPrimary ? (
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50/90 backdrop-blur-md text-emerald-700 border border-emerald-300/70 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                    <Star size={12} className="fill-emerald-600 text-emerald-600" />
                    <span>Alamat Utama</span>
                  </div>
                ) : (
                  <span className="text-[11px] font-medium text-slate-500">
                    Tersimpan
                  </span>
                )}
              </div>

              {/* ── 2. ADDRESS OWNER: Name & WhatsApp Contact ── */}
              <div className="mt-5">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {address.recipientName}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone size={11} />
                  </div>
                  <span>{address.phone}</span>
                </div>
              </div>

              {/* ── 3. ADDRESS INFORMATION: Full Address & District ── */}
              <div className="mt-4 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                <span className="font-normal">{address.fullAddress}</span>
              </div>

              {/* ── 4. ACCESS NOTES (Driver Notes) ── */}
              {address.driverNotes && (
                <div
                  className={`rounded-2xl p-3.5 mt-4 flex items-start gap-2.5 transition-colors ${
                    isPrimary
                      ? 'bg-amber-50/50 backdrop-blur-md border border-amber-200/70 text-slate-800'
                      : 'bg-slate-50/50 backdrop-blur-md border border-slate-200/60 text-slate-700'
                  }`}
                >
                  <Navigation
                    size={15}
                    className={`mt-0.5 shrink-0 ${
                      isPrimary ? 'text-amber-600' : 'text-slate-500'
                    }`}
                  />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold block mb-0.5 text-[11px] uppercase tracking-wider text-slate-500">
                      Patokan / Akses Kurir:
                    </span>
                    <span className="italic font-medium">{address.driverNotes}</span>
                  </div>
                </div>
              )}

              {/* ── 5. GPS COORDINATES INFORMATION ── */}
              {address.coordinates && (
                <div className="mt-3.5 px-3 py-2 rounded-xl bg-white/50 backdrop-blur-md border border-white/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Compass size={12} className="text-emerald-600" />
                    <span>GPS Koord:</span>
                  </span>
                  <span className="font-semibold text-slate-900">
                    {address.coordinates.lat.toFixed(4)}, {address.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              )}
            </div>

            {/* ── 6. CARD ACTIONS FOOTER ── */}
            <div className="pt-5 border-t border-slate-200/60 flex items-center justify-between gap-2 mt-5">
              {!isPrimary ? (
                <button
                  type="button"
                  onClick={() => onSetDefault?.(address.id)}
                  title="Jadikan alamat penjemputan utama"
                  aria-label={`Jadikan ${address.label} sebagai alamat utama`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 border border-slate-200/70 hover:border-emerald-300/80 transition-all shadow-2xs cursor-pointer"
                >
                  <Star size={13} />
                  <span>Jadikan Utama</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={14} />
                  Default Lokasi
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onEdit?.(address)}
                  title="Edit alamat ini"
                  aria-label={`Edit alamat ${address.label}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all cursor-pointer"
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete?.(address.id)}
                  title="Hapus alamat ini"
                  aria-label={`Hapus alamat ${address.label}`}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50/80 transition-all cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </motion.article>
        );
      })}

      {/* ── SECTION C: Beautiful Add Address Card (The 3rd Slot - Frosted Glass) ── */}
      {!isQuotaFull ? (
        <motion.div
          variants={cardVariants}
          onClick={onAddNew}
          role="button"
          tabIndex={0}
          aria-label="Tambahkan Lokasi Baru"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onAddNew?.();
            }
          }}
          className="h-full min-h-[320px] rounded-[2rem] bg-white/40 hover:bg-white/70 backdrop-blur-2xl border-2 border-dashed border-emerald-300/70 hover:border-emerald-500 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,100,50,0.08)] hover:-translate-y-1 select-none"
        >
          {/* Central Layered Glowing Plus Icon */}
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-300">
              <Plus size={32} className="stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </div>

          <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
            Tambahkan Lokasi Baru
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mt-1.5 mb-6">
            Simpan titik penjemputan baru untuk mempermudah aktivitas penyaluran sampah terpilahmu.
          </p>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-slate-800 text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Masih tersedia {remainingSlots} dari {maxQuota} slot alamat
          </span>
        </motion.div>
      ) : (
        /* Limit Reached Card (Frosted Glass) */
        <motion.div
          variants={cardVariants}
          className="h-full min-h-[320px] rounded-[2rem] bg-white/50 backdrop-blur-2xl border border-white/80 p-8 flex flex-col items-center justify-center text-center select-none shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center mb-4">
            <AlertCircle size={28} />
          </div>
          <h4 className="text-base font-bold text-slate-900">
            Batas Maksimal 5 Alamat Tercapai
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs mt-1.5 mb-4">
            Sesuai kebijakan optimasi rute kurir ELOVIA, Anda dapat menyimpan maksimal 5 alamat aktif.
          </p>
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-200">
            Hapus salah satu alamat untuk menambah baru
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
