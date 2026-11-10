'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  User,
  Store,
  Tag,
  Calendar,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ExternalLink,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { MitraProfile } from './types';

interface ProfileDropdownProps {
  profile: MitraProfile;
  onLogout: () => void;
  onActionToast?: (title: string, desc: string) => void;
}

export function ProfileDropdown({
  profile,
  onLogout,
  onActionToast,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuItemClick = (label: string, desc: string) => {
    setIsOpen(false);
    onActionToast?.(label, desc);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu Pengelola Mitra"
        className={`flex items-center gap-2 sm:gap-2.5 p-1.5 sm:pl-2 sm:pr-3 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#238B57] ${
          isOpen
            ? 'bg-[#EAF5ED] border-[#D3EBDB] shadow-sm'
            : 'bg-white hover:bg-[#F8FAF7] border-[#E6ECE7] hover:border-[#D3EBDB] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
        }`}
      >
        {/* Avatar with status indicator */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-[#EAF5ED] border border-[#D3EBDB] shrink-0">
          <Image
            src={profile.managerAvatar}
            alt={profile.managerName}
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#238B57] ring-2 ring-white" />
        </div>

        {/* Text info - desktop */}
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold text-[#17251D] leading-tight truncate max-w-[120px]">
            {profile.managerName.split(',')[0]}
          </span>
          <span className="text-[10px] font-mono text-[#84928A] leading-tight truncate max-w-[120px]">
            {profile.name}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#84928A] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#238B57]' : ''
          }`}
        />
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="absolute right-0 mt-3 w-80 sm:w-88 rounded-3xl bg-white/98 backdrop-blur-xl border border-[#E6ECE7] shadow-[0_20px_60px_-15px_rgba(23,77,53,0.18)] z-50 overflow-hidden"
          >
            {/* Identity Header Card */}
            <div className="p-4 bg-gradient-to-br from-[#F8FAF7] to-[#EAF5ED]/50 border-b border-[#E6ECE7]">
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white border border-[#D3EBDB] shadow-xs shrink-0">
                  <Image
                    src={profile.managerAvatar}
                    alt={profile.managerName}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 p-0.5 rounded-tl-lg bg-[#238B57] text-white">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-sm font-bold text-[#17251D] truncate">
                      {profile.managerName}
                    </h4>
                  </div>
                  <p className="text-xs text-[#5D7065] truncate">
                    {profile.managerRole}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-[#D3EBDB] text-[#177A47]">
                      {profile.code}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{profile.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store summary strip */}
              <div className="mt-3 pt-3 border-t border-[#D3EBDB]/60 flex items-center justify-between text-xs text-[#2D3D33]">
                <div className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#238B57]" />
                  <span className="font-semibold truncate max-w-[190px]">
                    {profile.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#84928A]">
                  Bandung
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <div className="p-2 space-y-0.5">
              <button
                type="button"
                onClick={() =>
                  handleMenuItemClick(
                    'Pengaturan Profil',
                    'Membuka preferensi akun dan kredensial pengelola mitra.'
                  )
                }
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#17251D] hover:bg-[#F4FAF6] hover:text-[#177A47] transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#E6ECE7] text-[#5D7065]">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Pengaturan Profil</div>
                  <div className="text-[10px] text-[#84928A]">Kelola kontak & kata sandi staf</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleMenuItemClick(
                    'Pengaturan Toko',
                    'Membuka konfigurasi jam operasional, radius armada, dan alamat.'
                  )
                }
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#17251D] hover:bg-[#F4FAF6] hover:text-[#177A47] transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#E6ECE7] text-[#5D7065]">
                  <Store className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Pengaturan Toko</div>
                  <div className="text-[10px] text-[#84928A]">Lokasi titik antar, radius jemput & jam buka</div>
                </div>
              </button>

              <Link
                href="/mitra/harga"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#17251D] hover:bg-[#F4FAF6] hover:text-[#177A47] transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#E6ECE7] text-[#5D7065]">
                  <Tag className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Katalog & Harga Acuan</div>
                  <div className="text-[10px] text-[#84928A]">Pembaruan harga beli per kg material SNI</div>
                </div>
              </Link>

              <Link
                href="/mitra/jadwal"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#17251D] hover:bg-[#F4FAF6] hover:text-[#177A47] transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#E6ECE7] text-[#5D7065]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Jadwal & Ketersediaan</div>
                  <div className="text-[10px] text-[#84928A]">Slot penjemputan armada & kuota harian</div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() =>
                  handleMenuItemClick(
                    'Dokumen Verifikasi SNI',
                    'Sertifikasi SNI 19-3964-1994 & ISO 14001 aktif hingga Nov 2027.'
                  )
                }
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[#17251D] hover:bg-[#F4FAF6] hover:text-[#177A47] transition-colors text-left"
              >
                <div className="p-1.5 rounded-lg bg-[#F8FAF7] border border-[#E6ECE7] text-[#5D7065]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Sertifikasi Legalitas</div>
                  <div className="text-[10px] text-[#84928A]">{profile.sniStandard}</div>
                </div>
              </button>
            </div>

            {/* Secondary actions & external link */}
            <div className="p-2 border-t border-[#E6ECE7] bg-[#F8FAF7] space-y-0.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#5D7065] hover:text-[#17251D] hover:bg-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Kunjungi Web Publik ELOVIA
                </span>
                <span className="text-[10px] font-mono text-[#84928A]">elovia.id</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Portal Mitra</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

