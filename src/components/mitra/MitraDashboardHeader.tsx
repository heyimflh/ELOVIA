'use client';

import { useState } from 'react';
import { Search, Calendar, Bell, Menu } from 'lucide-react';
import { MitraNotification, MitraProfile } from './types';
import { NotificationDropdown } from './NotificationDropdown';

interface MitraDashboardHeaderProps {
  profile: MitraProfile;
  notifications: MitraNotification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onToggleMobileSidebar?: () => void;
}

export function MitraDashboardHeader({
  profile,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClearAllNotifications,
  onToggleMobileSidebar,
}: MitraDashboardHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center shrink-0 gap-4">
      {/* ── Left: Greeting & Subtitle ── */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-jakarta">
            Selamat pagi, {profile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Berikut adalah ringkasan operasional Anda hari ini.
          </p>
        </div>

        {/* Mobile menu button for small screens */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-2xl bg-white/70 border border-white/50 text-slate-700 shadow-2xs"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Right: Search Bar, Date Badge & Notification Bell ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-end">
        {/* Global Search Bar */}
        <div className="relative flex-1 lg:flex-initial">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tiket, material..."
            className="w-full sm:w-56 lg:w-64 pl-9 pr-3.5 py-2 rounded-2xl bg-white/60 border border-white/50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 shadow-2xs backdrop-blur-sm transition"
          />
        </div>

        {/* Date / Calendar Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/60 border border-white/50 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm shrink-0">
          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-mono">10 Nov 2026</span>
        </div>

        {/* Notification Bell Dropdown */}
        <NotificationDropdown
          notifications={notifications}
          onMarkAllAsRead={onMarkAllAsRead}
          onMarkAsRead={onMarkAsRead}
          onClearAll={onClearAllNotifications}
        />
      </div>
    </div>
  );
}
