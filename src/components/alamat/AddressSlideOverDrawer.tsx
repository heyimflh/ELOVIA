'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  Building,
  Map,
  Navigation,
  Search,
  Phone,
  User,
  MapPin,
  Check,
  Star,
  Compass,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import type { AddressItem } from '@/lib/addressStore';

export interface AddressFormData {
  id?: string;
  type: 'home' | 'office' | 'kost' | 'other';
  label: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  city?: string;
  district?: string;
  postalCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  driverNotes?: string;
  isDefault: boolean;
}

export interface AddressSlideOverDrawerProps {
  /**
   * Status visibilitas slide-over drawer
   */
  isOpen: boolean;
  /**
   * Callback saat drawer ditutup
   */
  onClose: () => void;
  /**
   * Callback saat formulir disimpan
   */
  onSave: (addressData: AddressFormData) => void;
  /**
   * Data awal jika dalam mode edit (null untuk mode tambah baru)
   */
  initialData?: AddressItem | null;
}

interface CategoryOption {
  key: string;
  type: 'home' | 'office' | 'kost' | 'other';
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  { key: 'Rumah', type: 'home', label: 'Rumah', icon: Home },
  { key: 'Kantor', type: 'office', label: 'Kantor', icon: Building },
  { key: 'Kost', type: 'kost', label: 'Kost', icon: MapPin },
  { key: 'Usaha', type: 'other', label: 'Usaha / Lainnya', icon: Briefcase },
];

export function AddressSlideOverDrawer({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddressSlideOverDrawerProps) {
  const isEditMode = Boolean(initialData);

  // Form states
  const [selectedCategory, setSelectedCategory] = useState<string>('Rumah');
  const [recipientName, setRecipientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Kota Bandung');
  const [district, setDistrict] = useState<string>('Coblong');
  const [postalCode, setPostalCode] = useState<string>('40135');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: -6.8924,
    lng: 107.6186,
  });
  const [driverNotes, setDriverNotes] = useState<string>('');
  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [isPinAdjusted, setIsPinAdjusted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Populate data when opening or changing initialData
  useEffect(() => {
    if (initialData) {
      setSelectedCategory(initialData.label || 'Rumah');
      setRecipientName(initialData.recipientName || '');
      setPhone(initialData.phone || '');
      setFullAddress(initialData.fullAddress || '');
      setCity(initialData.city || 'Kota Bandung');
      setDistrict(initialData.district || 'Coblong');
      setPostalCode(initialData.postalCode || '40135');
      setCoordinates(initialData.coordinates || { lat: -6.8924, lng: 107.6186 });
      setDriverNotes(initialData.driverNotes || '');
      setIsDefault(initialData.isDefault || false);
      setSearchQuery('');
      setIsPinAdjusted(true);
      setValidationError(null);
    } else {
      setSelectedCategory('Rumah');
      setRecipientName('');
      setPhone('');
      setSearchQuery('');
      setFullAddress('');
      setCity('Kota Bandung');
      setDistrict('Coblong');
      setPostalCode('40135');
      setCoordinates({ lat: -6.8924, lng: 107.6186 });
      setDriverNotes('');
      setIsDefault(false);
      setIsPinAdjusted(false);
      setValidationError(null);
    }
  }, [initialData, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !phone.trim() || !fullAddress.trim()) {
      setValidationError('Mohon lengkapi seluruh kolom bertanda bintang (*).');
      return;
    }

    const currentCat = CATEGORY_OPTIONS.find((c) => c.key === selectedCategory);
    const categoryType = currentCat ? currentCat.type : 'other';

    onSave({
      id: initialData?.id,
      type: categoryType,
      label: selectedCategory,
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      fullAddress: fullAddress.trim(),
      city: city.trim(),
      district: district.trim(),
      postalCode: postalCode.trim(),
      coordinates,
      driverNotes: driverNotes.trim(),
      isDefault,
    });

    onClose();
  };

  const handleAdjustPin = () => {
    setIsPinAdjusted(true);
    // Micro variation to simulate realistic pin adjustment
    const newLat = Number((-6.8924 + (Math.random() - 0.5) * 0.005).toFixed(4));
    const newLng = Number((107.6186 + (Math.random() - 0.5) * 0.005).toFixed(4));
    setCoordinates({ lat: newLat, lng: newLng });

    if (!fullAddress) {
      setFullAddress('Jl. Cisitu Indah VI No. 8, Dago, Kecamatan Coblong, Kota Bandung, 40135');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-jakarta" role="dialog" aria-modal="true">
          {/* ── 1. Backdrop (Fade-in) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40"
          />

          {/* ── 2. Drawer Panel (Slide-in from Right) ── */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full md:w-[540px] lg:w-[620px] bg-white/95 backdrop-blur-2xl border-l border-[#E8ECE9] shadow-2xl z-50 flex flex-col"
          >
            {/* ── Drawer Header ── */}
            <div className="p-6 md:p-7 border-b border-[#E8ECE9] flex justify-between items-center bg-white/70 backdrop-blur-md sticky top-0 z-20">
              <div>
                <span className="text-[11px] font-bold text-[#079B72] uppercase tracking-wider block mb-1">
                  MANAJEMEN ALAMAT
                </span>
                <h2 className="text-xl font-bold text-[#19372D] tracking-tight">
                  {isEditMode ? 'Edit Alamat Penjemputan' : 'Tambah Alamat Penjemputan'}
                </h2>
                <p className="text-xs text-[#82958A] mt-0.5 font-light">
                  Lokasi presisi untuk memudahkan armada kurir mitra ELOVIA
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup form"
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition flex items-center justify-center cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Main Scrollable Content (The Form) ── */}
            <form
              id="address-drawer-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 custom-scrollbar"
            >
              {validationError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* 1. Label Alamat (Pill Toggles) */}
              <div>
                <label className="text-xs font-bold text-[#19372D] mb-2.5 block uppercase tracking-wider">
                  Simpan Sebagai
                </label>
                <div className="bg-[#F4F6F4] p-1.5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1.5 border border-[#E8ECE9]">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.key;

                    return (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`py-2.5 px-3 flex items-center justify-center gap-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
                          isActive
                            ? 'bg-white shadow-xs font-bold text-[#079B72] border border-[#A8C7A8]/40'
                            : 'hover:bg-slate-200/50 font-medium text-[#82958A]'
                        }`}
                      >
                        <Icon size={14} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Kontak Penanggung Jawab (Grid 2 Cols) */}
              <div>
                <label className="text-xs font-bold text-[#19372D] mb-2.5 block uppercase tracking-wider">
                  Kontak Penanggung Jawab
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nama Input */}
                  <div className="relative">
                    <label className="text-[11px] font-semibold text-[#82958A] mb-1.5 block">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full bg-white border border-[#E8ECE9] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] focus:border-transparent outline-hidden transition"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Input */}
                  <div className="relative">
                    <label className="text-[11px] font-semibold text-[#82958A] mb-1.5 block">
                      Nomor WhatsApp <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+62 812-3456-7890"
                        className="w-full bg-white border border-[#E8ECE9] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] focus:border-transparent outline-hidden transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Pencarian & Pinpoint Map Picker */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#19372D] uppercase tracking-wider">
                    Titik Lokasi Penjemputan
                  </label>
                  <span className="text-[10px] font-bold text-[#079B72] bg-[#E7F4EC] px-2.5 py-0.5 rounded-full border border-[#A8C7A8]/30">
                    Geocoding Presisi Aktif
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 text-slate-400 pointer-events-none" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama jalan, komplek, atau gedung..."
                    className="w-full bg-[#F8F9F4] border border-[#E8ECE9] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium text-[#19372D] placeholder:text-[#82958A] focus:bg-white focus:ring-2 focus:ring-[#079B72] outline-hidden transition"
                  />
                </div>

                {/* Interactive Map Box (The Pinpoint) */}
                <div
                  onClick={handleAdjustPin}
                  className="relative w-full h-44 bg-slate-100 border border-[#E8ECE9] rounded-2xl mt-3 overflow-hidden group flex items-center justify-center cursor-pointer select-none shadow-inner"
                >
                  {/* Stylized Vector Map Background */}
                  <svg
                    className="absolute inset-0 w-full h-full object-cover opacity-85"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 600 240"
                    preserveAspectRatio="none"
                  >
                    <rect width="600" height="240" fill="#f8fafc" />
                    <path d="M 50,20 Q 90,60 140,40 T 220,90 L 190,160 Q 120,180 80,120 Z" fill="#ecfdf5" />
                    <path d="M 380,40 Q 450,20 520,70 L 560,170 Q 480,200 400,160 Z" fill="#ecfdf5" />
                    <path d="M -10,180 L 610,60" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
                    <path d="M 280,-10 L 320,250" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
                    <path d="M 120,-10 L 160,250" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
                    <path d="M -10,80 Q 200,140 610,110" stroke="#f1f5f9" strokeWidth="24" fill="none" />
                    <path d="M -10,80 Q 200,140 610,110" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 8" fill="none" opacity="0.6" />
                  </svg>

                  {/* Pulsing Target Radar */}
                  <div className="absolute w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-ping pointer-events-none" />

                  {/* Center Pin */}
                  <MapPin
                    size={32}
                    className="text-rose-500 drop-shadow-md z-10 -mt-4 transition-transform group-hover:-translate-y-1.5 duration-200"
                  />

                  {/* Overlay Coordinates & Button */}
                  <div className="absolute bottom-3 inset-x-0 mx-auto w-max bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#19372D] shadow-sm border border-[#E8ECE9] flex items-center gap-2 group-hover:bg-white transition">
                    <Compass size={13} className="text-[#079B72]" />
                    <span>
                      {isPinAdjusted
                        ? `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`
                        : 'Klik untuk Sesuaikan Titik'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. Detail Alamat & Wilayah */}
              <div className="space-y-3.5">
                {/* Alamat Lengkap */}
                <div>
                  <label className="text-[11px] font-semibold text-[#82958A] mb-1.5 block">
                    Alamat Lengkap (Jalan, No, RT/RW) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={fullAddress}
                    onChange={(e) => setFullAddress(e.target.value)}
                    placeholder="Contoh: Jl. Sukamaju No. 12, RT 03 / RW 05..."
                    className="w-full bg-white border border-[#E8ECE9] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] focus:border-transparent outline-hidden h-20 resize-none transition leading-relaxed"
                  />
                </div>

                {/* Kota, Kecamatan, Kode Pos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#82958A] mb-1 block">Kota / Kab</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Kota Bandung"
                      className="w-full bg-white border border-[#E8ECE9] rounded-xl px-3 py-2 text-xs font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#82958A] mb-1 block">Kecamatan</label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Coblong"
                      className="w-full bg-white border border-[#E8ECE9] rounded-xl px-3 py-2 text-xs font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#82958A] mb-1 block">Kode Pos</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="40135"
                      className="w-full bg-white border border-[#E8ECE9] rounded-xl px-3 py-2 text-xs font-medium text-[#19372D] focus:ring-2 focus:ring-[#079B72] outline-hidden"
                    />
                  </div>
                </div>

                {/* Catatan Patokan */}
                <div>
                  <label className="text-[11px] font-semibold text-[#82958A] mb-1.5 block">
                    Catatan Driver & Patokan Khusus
                  </label>
                  <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-1 relative transition-colors focus-within:border-amber-400">
                    <textarea
                      rows={2}
                      value={driverNotes}
                      onChange={(e) => setDriverNotes(e.target.value)}
                      placeholder="Contoh: Pagar hitam tinggi, posisi rumah di ujung jalan buntu sebelah pohon mangga."
                      className="bg-transparent w-full p-2.5 pr-9 text-xs sm:text-sm text-amber-950 placeholder-amber-800/40 outline-hidden h-18 resize-none leading-relaxed"
                    />
                    <Navigation
                      size={16}
                      className="absolute right-3.5 bottom-3.5 text-amber-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Checkbox: Jadikan Alamat Utama */}
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F8F9F4] border border-[#E8ECE9] cursor-pointer hover:bg-[#E7F4EC]/40 transition select-none">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="w-4 h-4 text-[#079B72] rounded-md border-slate-300 focus:ring-[#079B72] cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-[#19372D] flex items-center gap-1.5">
                      <Star size={13} className="text-amber-500 fill-amber-400" />
                      Jadikan Alamat Utama (Default Penjemputan)
                    </span>
                    <p className="text-[#82958A] mt-0.5">
                      Alamat ini otomatis terpilih saat mengajukan penyaluran sampah baru di ELOVIA.
                    </p>
                  </div>
                </label>
              </div>
            </form>

            {/* ── Sticky Footer (Actions) ── */}
            <div className="p-5 md:p-6 border-t border-[#E8ECE9] bg-white/90 backdrop-blur-md flex justify-end gap-3 sticky bottom-0 z-20">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#82958A] hover:bg-slate-100 rounded-xl transition cursor-pointer select-none"
              >
                Batal
              </button>
              <button
                type="submit"
                form="address-drawer-form"
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-md shadow-emerald-400/20 rounded-xl transition flex items-center gap-2 cursor-pointer select-none"
              >
                <Check size={16} className="stroke-[3]" />
                <span>{isEditMode ? 'Simpan Perubahan' : 'Simpan Alamat'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
