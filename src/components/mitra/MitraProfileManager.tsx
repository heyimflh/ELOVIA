'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import {
  Building2,
  MapPin,
  FileText,
  Save,
  Phone,
  UploadCloud,
  Check,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Navigation,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react';
import { useMitra } from './MitraContext';

interface TermItem {
  id: string;
  text: string;
  enabled: boolean;
}

const INITIAL_TERMS: TermItem[] = [
  {
    id: 'term-1',
    text: 'Material harus dalam kondisi bersih, kering, dan bebas kontaminasi cairan berbahaya.',
    enabled: true,
  },
  {
    id: 'term-2',
    text: 'Berat minimum penjemputan armada: 5 kg (tidak ada batas minimum untuk drop-off langsung).',
    enabled: true,
  },
  {
    id: 'term-3',
    text: 'Plastik wajib dipilah per sub-jenis utama (botol PET bening, tutup botol HDPE, emberan).',
    enabled: true,
  },
  {
    id: 'term-4',
    text: 'Kardus dan kertas diikat rapi atau ditumpuk dalam boks agar memudahkan proses penimbangan.',
    enabled: true,
  },
  {
    id: 'term-5',
    text: 'Minyak jelantah diserahkan dalam jeriken tertutup rapat atau botol wadah yang tidak bocor.',
    enabled: true,
  },
];

export function MitraProfileManager() {
  const { profile, addToast } = useMitra();

  // Form State
  const [storeName, setStoreName] = useState('Bank Sampah Berkah Mandiri');
  const [partnerType, setPartnerType] = useState('Bank Sampah');
  const [description, setDescription] = useState(
    'Sentra Pemilahan Daur Ulang & Pusat Pemberdayaan Sirkular Bandung Raya terverifikasi SNI. Melayani penjemputan berkala dan drop-off limbah anorganik dari rumah tangga, sekolah, dan perkantoran.'
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(
    profile.heroImage || '/images/mitra/hero.jpeg'
  );
  const [phone, setPhone] = useState('+62 815-7766-3322');
  const [address, setAddress] = useState(
    'Jl. Dago Asri No. 88, Coblong, Kota Bandung'
  );
  const [accessNote, setAccessNote] = useState(
    'Masuk dari gerbang utama sebelah pos satpam, area drop-off zone di sebelah kiri gedung.'
  );
  const [terms, setTerms] = useState<TermItem[]>(INITIAL_TERMS);
  const [newTermInput, setNewTermInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Logo upload simulation
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      addToast({
        title: 'Foto Logo Dipilih',
        description: `Berkas "${file.name}" berhasil diunggah sebagai logo profil toko.`,
        type: 'info',
      });
    }
  };

  // Toggle checklist term
  const handleToggleTerm = (id: string) => {
    setTerms((prev) =>
      prev.map((term) =>
        term.id === id ? { ...term, enabled: !term.enabled } : term
      )
    );
  };

  // Add term
  const handleAddTerm = () => {
    if (!newTermInput.trim()) return;
    const newTerm: TermItem = {
      id: `term-${Date.now()}`,
      text: newTermInput.trim(),
      enabled: true,
    };
    setTerms((prev) => [...prev, newTerm]);
    setNewTermInput('');
  };

  // Delete term
  const handleDeleteTerm = (id: string) => {
    setTerms((prev) => prev.filter((term) => term.id !== id));
  };

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    setIsSaved(true);

    addToast({
      title: 'Profil Toko Berhasil Disimpan',
      description:
        'Identitas usaha, alamat operasional, dan syarat penyerahan warga telah disinkronkan ke Marketplace publik.',
      type: 'success',
    });

    setTimeout(() => {
      setIsSaved(false);
    }, 2800);
  };

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 280,
      },
    },
  };

  return (
    <div className="w-full flex flex-col font-jakarta relative">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Pengaturan & Profil Toko
          </h1>
          <p className="text-slate-600 mt-1">
            Kelola informasi publik, alamat operasional, dan syarat penyerahan material untuk warga.
          </p>
        </div>

        {/* Verified Badge Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 border border-white/60 shadow-2xs backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-700">
            Terverifikasi ELOVIA Verified
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* ── Main Grid (Card 1: 7 cols, Card 2: 5 cols, Card 3: 12 cols) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pb-24"
      >
        {/* ── CARD 1: INFORMASI UTAMA & LOGO (Left Column - lg:col-span-7) ── */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-7 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Identitas Usaha
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Informasi ini ditampilkan di halaman detail mitra pada direktori Recycle Marketplace.
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-xl border border-emerald-200 hidden sm:inline-block">
              {profile.code}
            </span>
          </div>

          {/* Field 1: Nama Usaha / Bank Sampah */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Nama Usaha / Bank Sampah
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Contoh: Bank Sampah Berkah Mandiri"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-2xs"
            />
          </div>

          {/* Field 2: Jenis Mitra */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Jenis Mitra
            </label>
            <select
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer transition shadow-2xs"
            >
              <option value="Bank Sampah">Bank Sampah</option>
              <option value="Pengepul">Pengepul</option>
              <option value="Mitra Daur Ulang">Mitra Daur Ulang</option>
            </select>
          </div>

          {/* Field 3: Deskripsi Singkat */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Deskripsi Singkat Usaha
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesialisasi, kapasitas, atau nilai tambah bank sampah Anda..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-28 resize-none transition shadow-2xs leading-relaxed text-sm"
            />
          </div>

          {/* Field 4: Logo Toko / Foto Profil */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Logo Toko / Foto Profil
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleLogoFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-white/40 transition cursor-pointer flex flex-col items-center justify-center gap-2 group"
            >
              {logoPreview ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md">
                    <Image
                      src={logoPreview}
                      alt="Logo Toko"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    <span className="font-bold text-emerald-600 group-hover:underline">
                      Klik untuk mengganti foto logo
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      PNG, JPG, atau WebP (Maks. 2MB)
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    Seret foto logo ke sini atau klik untuk mengunggah
                  </span>
                  <span className="text-xs text-slate-400">
                    Format disarankan: Rasio 1:1, minimal 400x400 px
                  </span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── CARD 2: KONTAK & LOKASI OPERASIONAL (Right Column - lg:col-span-5) ── */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Lokasi & Kontak
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Titik penjemputan armada & kontak WhatsApp.
                </p>
              </div>
            </div>
          </div>

          {/* Field 1: Nomor WhatsApp / Telepon Koordinasi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Nomor WhatsApp / Telepon Koordinasi
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Phone className="w-4 h-4 text-emerald-600" />
              </span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 8..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-2xs font-mono text-sm"
              />
            </div>
          </div>

          {/* Field 2: Alamat Lengkap */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Alamat Lengkap Operasional
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat lengkap gerai atau gudang operasional..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none transition shadow-2xs leading-relaxed text-sm"
            />
          </div>

          {/* Field 3: Patokan / Catatan Akses */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
              Patokan / Catatan Akses
            </label>
            <input
              type="text"
              value={accessNote}
              onChange={(e) => setAccessNote(e.target.value)}
              placeholder="Contoh: Masuk dari gerbang utama sebelah pos satpam"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-2xs text-sm"
            />
          </div>

          {/* Field 4: Koordinat Peta (Lat/Lng) Mock Mini Map Preview */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                Koordinat Peta (Lat / Long)
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                -6.8854, 107.6133
              </span>
            </div>

            {/* Mock Visual Mini Map Preview Box */}
            <div className="h-32 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-slate-400 text-sm font-medium relative overflow-hidden group">
              {/* Subtle map pattern background simulation */}
              <div
                className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:14px_14px]"
                aria-hidden="true"
              />

              {/* Center Pin & Pulse */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4" />
                  </span>
                </span>
                <span className="text-xs font-bold text-slate-700 mt-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                  Coblong, Kota Bandung
                </span>
              </div>

              <div className="absolute bottom-2 right-2 z-10">
                <span className="text-[10px] font-mono font-semibold text-slate-500 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                  Radius Jemput: 15 km
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CARD 3: SYARAT & KETENTUAN PENYERAHAN (Full Width - lg:col-span-12) ── */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-12 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100/80 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Syarat Penyerahan untuk Warga
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Aturan ini akan ditampilkan kepada warga saat mereka memilih mitra Anda di Marketplace.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-xl border border-amber-200 shrink-0 self-start sm:self-auto">
              {terms.filter((t) => t.enabled).length} Syarat Aktif
            </span>
          </div>

          {/* Checklist Toggles / Bullet Points */}
          <div className="flex flex-col gap-3">
            {terms.map((term, index) => (
              <div
                key={term.id}
                className={`flex items-start justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 ${
                  term.enabled
                    ? 'bg-white/80 border-emerald-100 shadow-2xs'
                    : 'bg-slate-50/50 border-slate-200/60 opacity-60'
                }`}
              >
                <div
                  onClick={() => handleToggleTerm(term.id)}
                  className="flex items-start gap-3 cursor-pointer flex-1 select-none pr-3"
                >
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={term.enabled}
                    className="mt-0.5 text-emerald-600 focus:outline-none shrink-0"
                  >
                    {term.enabled ? (
                      <CheckSquare className="w-5 h-5 fill-emerald-50 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="text-sm font-medium text-slate-800 leading-snug">
                    <span className="text-xs font-mono font-bold text-slate-400 mr-2">
                      #{index + 1}
                    </span>
                    {term.text}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteTerm(term.id)}
                  title="Hapus aturan ini"
                  className="p-1.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Custom Requirement Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <input
              type="text"
              value={newTermInput}
              onChange={(e) => setNewTermInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTerm();
              }}
              placeholder="Ketik syarat penyerahan baru, mis. Maksimal 30 kg per kantong sampah..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-medium text-sm focus:ring-2 focus:ring-amber-500 outline-none shadow-2xs"
            />
            <button
              type="button"
              onClick={handleAddTerm}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Syarat</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── FLOATING ACTION BAR (Sticky Save Button) ── */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-xl shadow-emerald-200/50 rounded-2xl transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 cursor-pointer active:scale-95 disabled:opacity-80"
        >
          {isSaved ? (
            <>
              <Check size={20} className="stroke-[2.5]" />
              <span>Tersimpan!</span>
            </>
          ) : (
            <>
              <Save size={20} className={isSaving ? 'animate-spin' : ''} />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

