'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Home,
  MapPin,
  Trash2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  AddressHeaderSection,
  AddressCardGrid,
  AddressSlideOverDrawer,
  PickupLocationGuideSection,
  PickupReadinessBanner,
  type AddressFormData,
} from '@/components/alamat';
import {
  INITIAL_ADDRESSES,
  getSavedAddresses,
  saveAddressesToStorage,
  type AddressItem,
} from '@/lib/addressStore';

export default function AddressManagementClient() {
  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const maxQuota = 5;

  // Hydrate addresses from localStorage after client mount
  useEffect(() => {
    setIsMounted(true);
    const stored = getSavedAddresses();
    setAddresses(stored);

    const handleUpdate = () => {
      setAddresses(getSavedAddresses());
    };
    window.addEventListener('elovia_addresses_updated', handleUpdate);
    return () => window.removeEventListener('elovia_addresses_updated', handleUpdate);
  }, []);

  // Show auto-dismiss toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const savedCount = addresses.length;
  const isQuotaFull = savedCount >= maxQuota;

  const handleOpenAddDrawer = () => {
    if (isQuotaFull) return;
    setEditingAddress(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (item: AddressItem) => {
    setEditingAddress(item);
    setIsDrawerOpen(true);
  };

  const handleSetDefault = (id: string) => {
    const updated = addresses.map((item) => ({
      ...item,
      isDefault: item.id === id,
    }));
    setAddresses(updated);
    saveAddressesToStorage(updated);
    const target = updated.find((a) => a.id === id);
    showToast(`"${target?.label || 'Alamat'}" kini menjadi alamat penjemputan utama.`);
  };

  const handleDeleteAddress = (id: string) => {
    const target = addresses.find((item) => item.id === id);
    const remaining = addresses.filter((item) => item.id !== id);
    // If deleted address was default and there are remaining addresses, assign default to first
    if (target?.isDefault && remaining.length > 0) {
      remaining[0].isDefault = true;
    }
    setAddresses(remaining);
    saveAddressesToStorage(remaining);
    setDeleteConfirmId(null);
    showToast(`Alamat "${target?.label || ''}" berhasil dihapus.`);
  };

  const handleSaveAddress = (formData: AddressFormData) => {
    if (formData.id) {
      // Update existing address
      const updated = addresses.map((item) => {
        if (item.id === formData.id) {
          return {
            ...item,
            type: formData.type,
            label: formData.label,
            recipientName: formData.recipientName,
            phone: formData.phone,
            fullAddress: formData.fullAddress,
            city: formData.city,
            district: formData.district,
            postalCode: formData.postalCode,
            coordinates: formData.coordinates,
            driverNotes: formData.driverNotes,
            isDefault: formData.isDefault,
          };
        }
        if (formData.isDefault) {
          return { ...item, isDefault: false };
        }
        return item;
      });
      setAddresses(updated);
      saveAddressesToStorage(updated);
      showToast(`Alamat "${formData.label}" berhasil diperbarui.`);
    } else {
      // Create new address
      const newAddress: AddressItem = {
        id: `addr-${Date.now()}`,
        type: formData.type,
        label: formData.label,
        recipientName: formData.recipientName,
        phone: formData.phone,
        fullAddress: formData.fullAddress,
        city: formData.city,
        district: formData.district,
        postalCode: formData.postalCode,
        coordinates: formData.coordinates,
        driverNotes: formData.driverNotes,
        isDefault: formData.isDefault || addresses.length === 0,
        createdAt: new Date().toISOString(),
      };

      let updatedList = [...addresses];
      if (newAddress.isDefault) {
        updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      }
      updatedList = [newAddress, ...updatedList];

      setAddresses(updatedList);
      saveAddressesToStorage(updatedList);
      showToast(`Alamat baru "${formData.label}" berhasil ditambahkan.`);
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full" suppressHydrationWarning>
        <div className="relative w-full pt-28 md:pt-32 pb-16 lg:pb-24 overflow-hidden z-0">
          <div
            className="absolute inset-0 w-full h-full bg-[url('/images/login/background.png')] bg-cover bg-[center_top_-20%] bg-no-repeat -z-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-50 -z-10 backdrop-blur-[2px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-8 w-56 bg-white/20 rounded-full animate-pulse mb-6" />
            <div className="w-full h-80 rounded-[2.5rem] bg-[#123D2F]/80 border border-white/10 animate-pulse mb-12" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" suppressHydrationWarning>
      {/* ── Toast Notification Feedback ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-24 inset-x-0 mx-auto w-max max-w-md z-50 px-5 py-3 rounded-2xl bg-slate-900/90 backdrop-blur-md text-white border border-white/20 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold select-none"
          >
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. TOP ATMOSPHERIC WRAPPER (Behind Navbar & Hero Card) ── */}
      <div className="relative w-full pt-28 md:pt-32 pb-16 lg:pb-24 overflow-hidden z-0">
        {/* Layer 1 (The Image): Cinematic background from /images/login/background.png */}
        <div
          className="absolute inset-0 w-full h-full bg-[url('/images/login/background.png')] bg-cover bg-[center_top_-20%] bg-no-repeat -z-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 2 (The Blend Overlay - CRITICAL FOR CONTRAST): Fades dark from top to slate-50 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-50 -z-10 backdrop-blur-[2px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Container (Breadcrumbs & Hero Card) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation - Styled with white text for maximum contrast against dark dreamy sky */}
          <nav aria-label="Breadcrumb" className="relative z-50 mb-6">
            <ol className="inline-flex items-center gap-2 text-xs md:text-sm font-medium bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Home size={14} className="text-white/60" />
                  <span>Beranda</span>
                </Link>
              </li>
              <ChevronRight size={14} className="text-white/40" />
              <li>
                <Link href="/akun" className="text-white/70 hover:text-white transition-colors">
                  Pengaturan Akun
                </Link>
              </li>
              <ChevronRight size={14} className="text-white/40" />
              <li className="text-white font-medium flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-400" />
                <span>Buku Alamat</span>
              </li>
            </ol>
          </nav>

          {/* SECTION A: Hero Header Card with floating shadow & glass border */}
          <AddressHeaderSection
            savedCount={addresses.length}
            maxCount={maxQuota}
            onAddNew={handleOpenAddDrawer}
            isQuotaFull={isQuotaFull}
          />
        </div>
      </div>

      {/* ── 2. LOWER SECTION: Cards, Mesh Orbs, Guide & CTA on slate-50 ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 z-10">
        {/* Ambient Glowing Blobs to enhance True Frosted Glass on cards */}
        <div
          className="absolute top-[5%] -left-20 w-[500px] h-[500px] bg-emerald-300/30 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute top-[40%] -right-20 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply"
          aria-hidden="true"
        />

        {/* ── SECTION B: Address Collection (Daftar Alamat Penjemputan) ── */}
        <section className="mt-8 md:mt-12 mb-16">
          {/* Section Heading with Editorial Hierarchy */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 tracking-wider uppercase mb-1">
                <Sparkles size={13} className="text-emerald-600" />
                YOUR SAVED LOCATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Lokasi Penjemputan
              </h2>
              <p className="text-sm text-slate-600 mt-1 font-normal leading-relaxed max-w-xl">
                Kelola lokasi favoritmu untuk mempermudah perjalanan sampah menuju nilai baru.
              </p>
            </div>

            {/* Counter Badge */}
            <div className="self-start sm:self-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-xs font-bold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{addresses.length} dari {maxQuota} Terdaftar</span>
              </span>
            </div>
          </div>

          {/* Address Cards Grid + Section C (Ghost Add Address Card) */}
          <AddressCardGrid
            addresses={addresses}
            maxQuota={maxQuota}
            onSetDefault={handleSetDefault}
            onEdit={handleOpenEditDrawer}
            onDelete={(id) => setDeleteConfirmId(id)}
            onAddNew={handleOpenAddDrawer}
          />
        </section>

        {/* ── SECTION D: Pickup Location Guide ("Perfect Pickup, Every Time.") ── */}
        <PickupLocationGuideSection />

        {/* ── SECTION E: Pickup Readiness Banner ("Ready for Your Next Green Impact?") ── */}
        <PickupReadinessBanner />
      </div>

      {/* ── SECTION C / Modal: Slide-Over Drawer (Tambah & Edit Alamat) ── */}
      <AddressSlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#E8ECE9] z-10 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3.5 shadow-xs">
                <Trash2 size={22} />
              </div>
              <h3 className="text-base font-bold text-[#19372D]">Hapus Alamat Ini?</h3>
              <p className="text-xs text-[#82958A] mt-1 mb-6 leading-relaxed">
                Alamat yang dihapus tidak dapat dipulihkan. Histori transaksi sebelumnya tetap aman
                dan terarsipkan.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#E8ECE9] text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAddress(deleteConfirmId)}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition cursor-pointer"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
