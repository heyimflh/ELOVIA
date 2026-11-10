'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  OperationalStatus,
  MitraProfile,
  MitraNotification,
  ToastNotification,
  WeighInTicketData,
} from './types';
import { DEFAULT_MITRA_PROFILE, INITIAL_NOTIFICATIONS, DEFAULT_WEIGH_IN_TICKET } from './mitraData';

const STATUS_STORAGE_KEY = 'elovia_mitra_operational_status';
const NOTIFS_STORAGE_KEY = 'elovia_mitra_notifications';

export function useMitraState() {
  const [profile] = useState<MitraProfile>(DEFAULT_MITRA_PROFILE);
  const [status, setStatus] = useState<OperationalStatus>('open');
  const [notifications, setNotifications] = useState<MitraNotification[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OperationalStatus>('open');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Weigh-In Drawer State
  const [isWeighInOpen, setIsWeighInOpen] = useState(false);
  const [weighInTicket, setWeighInTicket] = useState<WeighInTicketData>(DEFAULT_WEIGH_IN_TICKET);

  const openWeighIn = useCallback((customTicket?: Partial<WeighInTicketData>) => {
    if (customTicket) {
      setWeighInTicket({
        ...DEFAULT_WEIGH_IN_TICKET,
        ...customTicket,
        materials: customTicket.materials || DEFAULT_WEIGH_IN_TICKET.materials,
      });
    } else {
      setWeighInTicket(DEFAULT_WEIGH_IN_TICKET);
    }
    setIsWeighInOpen(true);
  }, []);

  const closeWeighIn = useCallback(() => {
    setIsWeighInOpen(false);
  }, []);

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const savedStatus = localStorage.getItem(STATUS_STORAGE_KEY) as OperationalStatus | null;
      if (savedStatus === 'open' || savedStatus === 'closed') {
        setStatus(savedStatus);
      }

      const savedNotifs = localStorage.getItem(NOTIFS_STORAGE_KEY);
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      }
    } catch (err) {
      console.warn('Could not read from localStorage:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist notifications on change
  const updateNotifications = useCallback((updater: (prev: MitraNotification[]) => MitraNotification[]) => {
    setNotifications((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(NOTIFS_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save notifications to localStorage', e);
      }
      return next;
    });
  }, []);

  // Toast dispatch helper
  const addToast = useCallback((toast: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const newToast: ToastNotification = {
      ...toast,
      id: `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initiate status toggle flow (opens confirmation dialog)
  const requestToggleStatus = useCallback(() => {
    const nextStatus: OperationalStatus = status === 'open' ? 'closed' : 'open';
    setPendingStatus(nextStatus);
    setIsDialogOpen(true);
  }, [status]);

  // Specific setter if needed
  const requestSetStatus = useCallback((nextStatus: OperationalStatus) => {
    if (nextStatus === status) return;
    setPendingStatus(nextStatus);
    setIsDialogOpen(true);
  }, [status]);

  // Execute confirmed status change
  const confirmStatusChange = useCallback(async () => {
    setIsSubmitting(true);

    try {
      // Simulate realistic API request latency to prevent double submission
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus(pendingStatus);
      try {
        localStorage.setItem(STATUS_STORAGE_KEY, pendingStatus);
      } catch (e) {
        console.warn('Could not save operational status', e);
      }

      // Show toast notification
      if (pendingStatus === 'open') {
        addToast({
          title: 'Operasional Toko Dibuka',
          description: `${profile.name} kini aktif menerima pesanan jemput dan drop-off dari masyarakat.`,
          type: 'success',
        });
      } else {
        addToast({
          title: 'Operasional Toko Ditutup Sementara',
          description: `Toko tidak akan menerima pengajuan baru hari ini. Selesaikan pesanan terjadwal Anda.`,
          type: 'warning',
        });
      }

      setIsDialogOpen(false);
    } catch {
      addToast({
        title: 'Gagal Memperbarui Status',
        description: 'Terjadi kendala jaringan saat memperbarui status toko. Silakan coba lagi.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [pendingStatus, profile.name, addToast]);

  const cancelStatusChange = useCallback(() => {
    if (!isSubmitting) {
      setIsDialogOpen(false);
    }
  }, [isSubmitting]);

  // Notification actions
  const markAllAsRead = useCallback(() => {
    updateNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      title: 'Notifikasi Ditandai',
      description: 'Seluruh notifikasi operasional telah ditandai sebagai sudah dibaca.',
      type: 'info',
    });
  }, [updateNotifications, addToast]);

  const markAsRead = useCallback((id: string) => {
    updateNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, [updateNotifications]);

  const clearAllNotifications = useCallback(() => {
    updateNotifications(() => []);
    addToast({
      title: 'Pemberitahuan Dibersihkan',
      description: 'Daftar notifikasi operasional telah dikosongkan.',
      type: 'info',
    });
  }, [updateNotifications, addToast]);

  const handleLogout = useCallback(() => {
    addToast({
      title: 'Keluar Portal Mitra',
      description: 'Sesi pengelola diakhiri secara aman. Mengarahkan ke halaman publik...',
      type: 'info',
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 1200);
  }, [addToast]);

  return {
    profile,
    status,
    notifications,
    toasts,
    isDialogOpen,
    pendingStatus,
    isSubmitting,
    isHydrated,
    requestToggleStatus,
    requestSetStatus,
    confirmStatusChange,
    cancelStatusChange,
    markAllAsRead,
    markAsRead,
    clearAllNotifications,
    dismissToast,
    addToast,
    handleLogout,
    isWeighInOpen,
    weighInTicket,
    openWeighIn,
    closeWeighIn,
  };
}

