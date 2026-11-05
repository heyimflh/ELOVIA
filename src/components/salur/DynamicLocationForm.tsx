'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Phone,
  MapPin,
  Edit3,
  Clock,
  Navigation,
  Route,
  Receipt,
  Sparkles,
} from 'lucide-react';

export type DeliveryMethod = 'pickup' | 'dropoff';

export interface PickupFormData {
  fullName: string;
  whatsappNumber: string;
  address: string;
  driverNotes: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DynamicLocationFormProps {
  /** Current active method: 'pickup' vs 'dropoff' */
  method: DeliveryMethod;
  /** Partner display name for Drop-off state */
  partnerName?: string;
  /** Detailed address for Drop-off partner */
  partnerAddress?: string;
  /** Operational hours display */
  operationalHours?: string;
  /** Google Maps route URL for Drop-off */
  partnerMapsUrl?: string;
  /** Initial values for pickup form */
  initialFormData?: Partial<PickupFormData>;
  /** Callback fired when pickup form data updates */
  onChange?: (data: PickupFormData) => void;
  /** Optional additional CSS classes */
  className?: string;
}

// Dynamically import Interactive Leaflet Mini-Map to ensure 100% client-side safety
const PickupLocationMap = dynamic(() => import('./PickupLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-72 rounded-3xl bg-white/5 border border-white/15 flex flex-col items-center justify-center gap-3 shadow-inner mt-4 animate-pulse">
      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-green-400 shadow-2xs">
        <MapPin className="w-5 h-5 text-green-400 animate-bounce" />
      </div>
      <p className="text-xs font-semibold text-white/70 font-jakarta">
        Memuat Peta Presisi Leaflet...
      </p>
    </div>
  ),
});

export function DynamicLocationForm({
  method,
  partnerName = 'Bank Sampah Resik Kebumen',
  partnerAddress = 'Jl. Pahlawan No. 42, RT 03 / RW 05, Kebumen, Jawa Tengah 54311 (Kompleks Depo Pengolahan Sentra Kebumen)',
  operationalHours = 'Senin – Sabtu: 08.00 – 16.00 WIB',
  partnerMapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=-7.6685,109.6521',
  initialFormData,
  onChange,
  className = '',
}: DynamicLocationFormProps) {
  // Form State for Pickup (State A)
  const [formData, setFormData] = useState<PickupFormData>({
    fullName: initialFormData?.fullName ?? 'Budi Pratama',
    whatsappNumber: initialFormData?.whatsappNumber ?? '0812-3456-7890',
    address:
      initialFormData?.address ??
      'Jl. Veteran No. 18, Kebumen, Jawa Tengah 54311',
    driverNotes:
      initialFormData?.driverNotes ??
      'Pagar hijau dekat pohon mangga, mohon hubungi WA saat tiba di gerbang komplek.',
    coordinates: initialFormData?.coordinates ?? {
      lat: -7.6698,
      lng: 109.6515,
    },
  });

  const updateField = (field: keyof PickupFormData, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange?.(updated);
  };

  const handleCoordsChange = (coords: { lat: number; lng: number }) => {
    updateField('coordinates', coords);
  };

  const handleOpenNavigation = () => {
    if (typeof window !== 'undefined') {
      window.open(partnerMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`w-full max-w-5xl mx-auto mt-8 relative ${className}`}
      suppressHydrationWarning
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full"
        >
          {method === 'pickup' ? (
            /* =========================================================================
               STATE A: Pickup Form (Penjemputan)
               ========================================================================= */
            <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 p-6 md:p-8 rounded-[2rem] shadow-inner transition-colors duration-300 isolate">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-xs font-bold text-green-300 uppercase tracking-wider font-jakarta">
                    <Sparkles className="w-3.5 h-3.5 text-green-400" />
                    Penjemputan Armada
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white drop-shadow-md font-jakarta">
                  Detail Lokasi Penjemputan
                </h3>
                <p className="text-white/70 mb-6 font-jakarta text-sm mt-1">
                  Tentukan titik presisi agar armada mudah menemukan Anda.
                </p>
              </div>

              {/* Spatial Glass Form Inputs */}
              <div className="space-y-4 md:space-y-5">
                {/* Row 1: 2 columns (Nama Pemohon, Nomor WhatsApp) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {/* Nama Pemohon */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider font-jakarta">
                      Nama Pemohon <span className="text-green-400">*</span>
                    </label>
                    <div className="bg-white/5 border border-white/20 rounded-2xl px-4 py-3.5 focus-within:bg-white/10 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all shadow-inner flex items-center gap-3">
                      <User className="w-5 h-5 text-green-400 shrink-0" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Masukkan nama lengkap pemohon"
                        className="w-full bg-transparent outline-none text-white placeholder-white/40 font-medium text-sm"
                      />
                    </div>
                  </div>

                  {/* Nomor WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider font-jakarta">
                      Nomor WhatsApp <span className="text-green-400">*</span>
                    </label>
                    <div className="bg-white/5 border border-white/20 rounded-2xl px-4 py-3.5 focus-within:bg-white/10 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all shadow-inner flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-400 shrink-0" />
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) =>
                          updateField('whatsappNumber', e.target.value)
                        }
                        placeholder="cth. 0812-3456-7890"
                        className="w-full bg-transparent outline-none text-white placeholder-white/40 font-medium text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: 1 column (Alamat Lengkap) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/80 uppercase tracking-wider font-jakarta">
                    Alamat Lengkap <span className="text-green-400">*</span>
                  </label>
                  <div className="bg-white/5 border border-white/20 rounded-2xl px-4 py-3.5 focus-within:bg-white/10 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all shadow-inner flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-green-400 shrink-0" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                      className="w-full bg-transparent outline-none text-white placeholder-white/40 font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Row 3: 1 column (Catatan Pengemudi - Textarea) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white/80 uppercase tracking-wider font-jakarta">
                      Catatan Pengemudi
                    </label>
                    <span className="text-[11px] text-white/50 font-jakarta">
                      Opsional
                    </span>
                  </div>
                  <div className="bg-white/5 border border-white/20 rounded-2xl px-4 py-3.5 focus-within:bg-white/10 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all shadow-inner flex items-start gap-3">
                    <Edit3 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <textarea
                      rows={2}
                      value={formData.driverNotes}
                      onChange={(e) => updateField('driverNotes', e.target.value)}
                      placeholder="Tulis patokan khusus (pagar, ruko, gang), arahan gerbang perumahan, atau jam optimal tiba..."
                      className="w-full bg-transparent outline-none text-white placeholder-white/40 font-medium text-sm resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Mini-Map (Leaflet) */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider font-jakarta flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-green-400" />
                    Titik Presisi Penjemputan GPS
                  </span>
                  <span className="text-[11px] text-white/50 font-mono hidden sm:inline">
                    Ketuk peta atau geser pin hijau
                  </span>
                </div>

                <PickupLocationMap
                  initialLat={formData.coordinates.lat}
                  initialLng={formData.coordinates.lng}
                  onLocationChange={handleCoordsChange}
                />
              </div>
            </div>
          ) : (
            /* =========================================================================
               STATE B: Drop-off Hub Card (Antar Sendiri)
               ========================================================================= */
            <div className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 p-6 md:p-8 rounded-[2rem] shadow-inner transition-colors duration-300 relative overflow-hidden isolate">
              {/* Visual Accent: watermark map pattern */}
              <div
                className="absolute -right-10 -top-10 opacity-10 text-white pointer-events-none select-none"
                aria-hidden="true"
              >
                <Route className="w-80 h-80 md:w-96 md:h-96 stroke-[1.2]" />
              </div>

              {/* Content Layout */}
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
                {/* Left Side (Info) */}
                <div className="flex-1 min-w-0 pr-0 md:pr-4">
                  {/* Title */}
                  <h4 className="text-sm font-bold text-green-400 tracking-wider uppercase mb-2 font-jakarta">
                    Tujuan Pengantaran Material
                  </h4>

                  {/* Partner Name */}
                  <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight mb-2 font-jakarta">
                    {partnerName}
                  </h3>

                  {/* Address */}
                  <p className="text-sm text-white/70 leading-relaxed max-w-xl font-jakarta">
                    {partnerAddress}
                  </p>

                  {/* Operational Hours Badge */}
                  <div className="bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl text-xs mt-3 flex w-fit gap-2 items-center text-white/80 font-jakarta">
                    <Clock className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    <span className="font-medium">
                      Jam Operasional: {operationalHours}
                    </span>
                  </div>

                  {/* Instruction Text */}
                  <div className="text-amber-200 bg-amber-500/20 p-3.5 rounded-2xl text-sm mt-4 flex items-start gap-2.5 border border-amber-400/30 font-jakarta max-w-xl">
                    <Receipt className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      Tunjukkan resi transaksi pada aplikasi saat Anda tiba di
                      lokasi fasilitas.
                    </p>
                  </div>
                </div>

                {/* Right Side (Map/Action) */}
                <div className="w-full md:w-48 flex flex-col flex-shrink-0">
                  {/* Stylized rounded container holding static map / route image */}
                  <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md group">
                    <Image
                      src="/images/Marketplace/Aerial Recycling Plant.jpeg"
                      alt={`Peta Rute ke ${partnerName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 192px"
                      className="w-full md:w-48 h-48 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* Top distance pill badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white border border-white/20 flex items-center gap-1 shadow-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span>1.2 km (4 mnt)</span>
                    </div>

                    {/* Bottom destination pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-semibold font-jakarta">
                      <span className="truncate">Sentra Kebumen</span>
                      <span className="text-[10px] bg-green-500 px-1.5 py-0.5 rounded text-white font-mono shrink-0">
                        Buka
                      </span>
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <button
                    type="button"
                    onClick={handleOpenNavigation}
                    className="w-full bg-green-500 hover:bg-green-400 text-white border border-green-400/50 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-3 transition-all cursor-pointer group font-jakarta"
                  >
                    <Navigation className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Buka Rute Navigasi</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default DynamicLocationForm;
