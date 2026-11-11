'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Tag,
  CalendarClock,
  BarChart3,
  Settings,
  Power,
  ShieldCheck,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { MitraProfile, OperationalStatus } from './types';

interface MitraSidebarProps {
  profile: MitraProfile;
  status: OperationalStatus;
  onRequestToggleStatus: () => void;
  onLogout: () => void;
  unreadCount?: number;
}

const NAV_ITEMS = [
  { label: 'Ringkasan', href: '/mitra', icon: LayoutDashboard },
  { label: 'Permintaan', href: '/mitra/permintaan', icon: Inbox, badge: '4' },
  { label: 'Katalog Harga', href: '/mitra/harga', icon: Tag },
  { label: 'Jadwal Armada', href: '/mitra/jadwal', icon: CalendarClock },
  { label: 'Analitik Dampak', href: '/impact-garden', icon: BarChart3, external: true },
  { label: 'Pengaturan Toko', href: '/mitra/profil', icon: Settings },
];

export function MitraSidebar({
  profile,
  status,
  onRequestToggleStatus,
  onLogout,
  unreadCount = 3,
}: MitraSidebarProps) {
  const pathname = usePathname();
  const isOpen = status === 'open';

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between p-5 lg:p-6 border-r border-white/40 bg-white/10 backdrop-blur-md select-none h-full">
      {/* ── Top: Brand Logo & Navigation Links ── */}
      <div className="space-y-6">
        {/* Brand Logo & Partner Badge */}
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
            title="Kunjungi Web Publik ELOVIA"
          >
            <Image
              src="/logo/ELOVIA Circular Green Value Logo.png"
              alt="ELOVIA"
              width={130}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/70 border border-white/50 text-[10px] font-mono font-bold tracking-[0.18em] uppercase text-emerald-800 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              PARTNER PORTAL
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Navigasi Mitra" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-150 ${
                  isActive
                    ? 'bg-white/80 text-emerald-900 shadow-xs border border-white/60 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/40 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-emerald-600 stroke-[2.2]' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {item.badge}
                  </span>
                )}
                {item.external && (
                  <ExternalLink className="w-3 h-3 text-slate-400 opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom: Status Operasional Toggle Card & User Profile Avatar ── */}
      <div className="space-y-3 pt-4 border-t border-white/30">
        {/* Status Operasional Toggle Card */}
        <div className="bg-white/60 border border-white/50 rounded-2xl p-3.5 shadow-2xs backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
              STATUS OPERASIONAL
            </span>
            <span
              className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md border ${
                isOpen
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              {isOpen ? 'BUKA' : 'TUTUP'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {isOpen && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 transition-colors ${
                    isOpen ? 'bg-emerald-600' : 'bg-slate-400'
                  }`}
                />
              </span>
              <span className="text-xs font-bold text-slate-800 truncate">
                {isOpen ? 'Sedang Beroperasi' : 'Operasional Ditutup'}
              </span>
            </div>

            {/* Interactive Toggle Switch */}
            <button
              type="button"
              onClick={onRequestToggleStatus}
              role="switch"
              aria-checked={isOpen}
              aria-label={`Ubah status toko (saat ini ${isOpen ? 'Buka' : 'Tutup'})`}
              className={`relative w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                isOpen ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                  isOpen ? 'translate-x-4.5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* User Profile Avatar Card */}
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white/50 border border-white/40 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-emerald-100 border border-emerald-200 shrink-0">
              <Image
                src={profile.managerAvatar}
                alt={profile.managerName}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="min-w-0 text-left">
              <div className="text-xs font-bold text-slate-900 truncate leading-tight">
                {profile.managerName.split(',')[0]}
              </div>
              <div className="text-[10px] text-slate-500 truncate leading-tight">
                {profile.name}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Keluar dari Portal"
            className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

