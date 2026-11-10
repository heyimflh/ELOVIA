'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCheck,
  Truck,
  Scale,
  TrendingUp,
  Inbox,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { MitraNotification } from './types';

interface NotificationDropdownProps {
  notifications: MitraNotification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationDropdown({
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClearAll,
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    return true;
  });

  const getCategoryIcon = (category: MitraNotification['category']) => {
    switch (category) {
      case 'pickup':
        return <Truck className="w-4 h-4 text-[#238B57]" />;
      case 'weighing':
        return <Scale className="w-4 h-4 text-amber-600" />;
      case 'pricing':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'dropoff':
        return <Truck className="w-4 h-4 text-teal-600" />;
      case 'system':
      default:
        return <Sparkles className="w-4 h-4 text-[#84928A]" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Notifikasi operasional (${unreadCount} belum dibaca)`}
        className={`relative p-2.5 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#238B57] ${
          isOpen
            ? 'bg-[#EAF5ED] border-[#D3EBDB] text-[#177A47] shadow-sm'
            : 'bg-white hover:bg-[#F8FAF7] border-[#E6ECE7] text-[#17251D] hover:border-[#D3EBDB] shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
        }`}
      >
        <Bell className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold font-mono text-white shadow-sm ring-2 ring-white">
            <span className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-60" />
            <span className="relative">{unreadCount}</span>
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white/98 backdrop-blur-xl border border-[#E6ECE7] shadow-[0_20px_60px_-15px_rgba(23,77,53,0.16)] z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E6ECE7] bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#17251D] tracking-tight">
                    Pemberitahuan Operasional
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {unreadCount} Baru
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    className="text-[11px] font-medium text-[#238B57] hover:text-[#177A47] flex items-center gap-1 transition-colors hover:underline"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Tandai Semua
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="mt-3 flex items-center gap-1.5 p-0.5 bg-[#F8FAF7] rounded-xl border border-[#E6ECE7]">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeFilter === 'all'
                      ? 'bg-white text-[#17251D] shadow-sm'
                      : 'text-[#84928A] hover:text-[#17251D]'
                  }`}
                >
                  Semua ({notifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter('unread')}
                  className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeFilter === 'unread'
                      ? 'bg-white text-[#17251D] shadow-sm'
                      : 'text-[#84928A] hover:text-[#17251D]'
                  }`}
                >
                  Belum Dibaca ({unreadCount})
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-[#F4F6F5] custom-scrollbar">
              {filteredNotifications.length === 0 ? (
                /* Empty state minimalis */
                <div className="py-12 px-6 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF5ED] text-[#238B57] flex items-center justify-center border border-[#D3EBDB] mb-3">
                    <Inbox className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h4 className="text-sm font-bold text-[#17251D]">
                    Tidak Ada Notifikasi
                  </h4>
                  <p className="mt-1 text-xs text-[#84928A] max-w-[220px] leading-relaxed">
                    {activeFilter === 'unread'
                      ? 'Semua notifikasi operasional telah selesai Anda tinjau.'
                      : 'Belum ada notifikasi baru hari ini. Seluruh alur berjalan lancar.'}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      if (!notif.read) onMarkAsRead(notif.id);
                    }}
                    className={`p-3.5 transition-all duration-150 cursor-pointer hover:bg-[#F8FAF7] ${
                      !notif.read ? 'bg-[#F4FAF6]/70' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-xl bg-white border border-[#E6ECE7] shadow-2xs shrink-0">
                        {getCategoryIcon(notif.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h5 className="text-xs font-bold text-[#17251D] truncate">
                            {notif.title}
                          </h5>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#238B57] shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-[#5D7065] leading-relaxed line-clamp-2">
                          {notif.description}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {notif.orderId && (
                              <span className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E6ECE7] text-[#17251D]">
                                {notif.orderId}
                              </span>
                            )}
                            {notif.weightSummary && (
                              <span className="text-[10px] font-semibold text-[#238B57] bg-[#EAF5ED] px-1.5 py-0.5 rounded border border-[#D3EBDB]">
                                {notif.weightSummary}
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] font-mono text-[#84928A] shrink-0">
                            {notif.timestamp}
                          </span>
                        </div>

                        {notif.actionLabel && notif.actionHref && (
                          <div className="mt-2.5">
                            <Link
                              href={notif.actionHref}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#238B57] hover:text-[#177A47] hover:underline"
                            >
                              <span>{notif.actionLabel}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with "Lihat Semua" */}
            <div className="p-3 border-t border-[#E6ECE7] bg-[#F8FAF7] flex items-center justify-between">
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] text-[#84928A] hover:text-[#17251D] transition-colors"
              >
                Hapus Semua
              </button>

              <Link
                href="/mitra/permintaan"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#238B57] hover:text-[#177A47] transition-colors"
              >
                <span>Lihat Semua Permintaan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

