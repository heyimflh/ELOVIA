'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Store,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { MitraProfile, OperationalStatus, MitraNotification } from './types';
import { NotificationDropdown } from './NotificationDropdown';
import { ProfileDropdown } from './ProfileDropdown';

interface MitraTopHeaderProps {
  profile: MitraProfile;
  status: OperationalStatus;
  onRequestToggleStatus: () => void;
  notifications: MitraNotification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onLogout: () => void;
  onActionToast?: (title: string, desc: string) => void;
}

const NAV_TABS = [
  { label: 'Ringkasan', href: '/mitra' },
  { label: 'Permintaan Masuk', href: '/mitra/permintaan', badge: '4' },
  { label: 'Katalog Harga', href: '/mitra/harga' },
  { label: 'Jadwal Armada', href: '/mitra/jadwal' },
];

export function MitraTopHeader({
  profile,
  status,
  onRequestToggleStatus,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClearAllNotifications,
  onLogout,
  onActionToast,
}: MitraTopHeaderProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isOpen = status === 'open';

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/92 backdrop-blur-xl border-b border-[#E6ECE7] transition-all">
      {/* ── Main Nav Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* ── A. Left: Brand & Navigation Identity ── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Logo ELOVIA */}
            <Link
              href="/"
              className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#238B57] rounded-xl transition-transform hover:scale-[1.02]"
              aria-label="Kembali ke Beranda ELOVIA"
              title="Kunjungi Web Publik ELOVIA"
            >
              {/* Desktop Logo */}
              <Image
                src="/logo/ELOVIA Circular Green Value Logo.png"
                alt="ELOVIA"
                width={130}
                height={36}
                className="hidden sm:block h-7 md:h-8 w-auto object-contain"
                priority
              />
              {/* Mobile Emblem */}
              <Image
                src="/logo/Minimalist Green Leaf Emblem.png"
                alt="ELOVIA"
                width={30}
                height={30}
                className="block sm:hidden h-7 w-7 object-contain"
                priority
              />
            </Link>

            {/* Separator Slash */}
            <span className="hidden sm:inline-block text-[#D3EBDB] font-light text-lg select-none">
              /
            </span>

            {/* Partner Portal Badge */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF5ED] border border-[#D3EBDB] text-[10px] md:text-[11px] font-mono font-bold tracking-[0.16em] uppercase text-[#177A47] select-none shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#238B57] animate-pulse" />
                PARTNER PORTAL
              </span>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav
              aria-label="Navigasi Portal Mitra"
              className="hidden xl:flex items-center gap-1 ml-3 pl-3 border-l border-[#E6ECE7]"
            >
              {NAV_TABS.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#EAF5ED] text-[#177A47] shadow-2xs'
                        : 'text-[#5D7065] hover:text-[#17251D] hover:bg-[#F8FAF7]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {tab.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ── B. Center: Store Identity (Desktop view) ── */}
          <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-[#F8FAF7] border border-[#E6ECE7] max-w-sm truncate">
            {/* Store Avatar Badge */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#177A47] to-[#238B57] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 tracking-wider">
              {profile.storeAvatarText}
            </div>

            <div className="flex flex-col min-w-0 text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#17251D] truncate leading-tight">
                  {profile.name}
                </span>
                <span title="Mitra Terverifikasi SNI">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#238B57] shrink-0" />
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#84928A] leading-tight">
                <span className="font-mono text-[#177A47] font-medium">#{profile.code}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5 truncate">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  {profile.area}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: C. Operational Switch + D. Notification + E. Profile ── */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* ── C. Operational Status Control Switch (Desktop & Tablet) ── */}
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={onRequestToggleStatus}
                role="switch"
                aria-checked={isOpen}
                aria-label={`Ubah status operasional (saat ini: ${isOpen ? 'Sedang Beroperasi' : 'Operasional Ditutup'})`}
                className={`group relative flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isOpen
                    ? 'bg-[#EAF5ED] hover:bg-[#DDF0E2] border-[#D3EBDB] text-[#177A47] focus-visible:ring-[#238B57]'
                    : 'bg-[#F4F6F5] hover:bg-[#E8ECE9] border-[#E6ECE7] text-[#5D7065] focus-visible:ring-slate-400'
                }`}
              >
                {/* Status indicator pulse ring */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    {isOpen && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors ${
                        isOpen ? 'bg-[#238B57]' : 'bg-[#84928A]'
                      }`}
                    />
                  </span>
                  <span className="text-[11px] font-bold font-mono tracking-tight uppercase select-none">
                    {isOpen ? 'SEDANG BEROPERASI' : 'OPERASIONAL DITUTUP'}
                  </span>
                </div>

                {/* Switch slider track */}
                <div
                  className={`relative w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 ${
                    isOpen ? 'bg-[#238B57]' : 'bg-[#CBD5E1]'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                      isOpen ? 'translate-x-3.5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* ── D. Notification Center ── */}
            <NotificationDropdown
              notifications={notifications}
              onMarkAllAsRead={onMarkAllAsRead}
              onMarkAsRead={onMarkAsRead}
              onClearAll={onClearAllNotifications}
            />

            {/* ── E. Profile Menu ── */}
            <ProfileDropdown
              profile={profile}
              onLogout={onLogout}
              onActionToast={onActionToast}
            />

            {/* Mobile Nav Toggle */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="xl:hidden p-2 rounded-2xl border border-[#E6ECE7] bg-white text-[#17251D] hover:bg-[#F8FAF7]"
              aria-label="Buka menu navigasi"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile & Tablet Row 2: Store Identity & Thumb-Friendly Operational Switch ── */}
        <div className="md:hidden py-2.5 border-t border-[#F4F6F5] flex items-center justify-between gap-2">
          {/* Store snippet */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#177A47] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              {profile.storeAvatarText}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-[#17251D] truncate leading-tight">
                {profile.name}
              </div>
              <div className="text-[10px] font-mono text-[#84928A] leading-tight">
                #{profile.code}
              </div>
            </div>
          </div>

          {/* Mobile Switch (Easy Thumb Reach) */}
          <button
            type="button"
            onClick={onRequestToggleStatus}
            role="switch"
            aria-checked={isOpen}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-bold font-mono uppercase shrink-0 transition-colors ${
              isOpen
                ? 'bg-[#EAF5ED] border-[#D3EBDB] text-[#177A47]'
                : 'bg-[#F4F6F5] border-[#E6ECE7] text-[#5D7065]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOpen ? 'bg-[#238B57] animate-pulse' : 'bg-[#84928A]'
              }`}
            />
            <span>{isOpen ? 'BEROPERASI' : 'DITUTUP'}</span>
          </button>
        </div>

        {/* Mobile Expanded Drawer for Navigation Tabs */}
        {mobileNavOpen && (
          <div className="xl:hidden py-3 border-t border-[#E6ECE7] space-y-1">
            <p className="px-3 text-[10px] font-mono uppercase font-bold text-[#84928A] tracking-wider mb-1">
              Menu Navigasi Portal
            </p>
            {NAV_TABS.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-[#EAF5ED] text-[#177A47]'
                      : 'text-[#2D3D33] hover:bg-[#F8FAF7]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {tab.badge} tiket
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

