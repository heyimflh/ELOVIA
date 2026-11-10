'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  CalendarDays,
  Truck,
  Clock,
  Save,
  Minus,
  Plus,
  Check,
  Info,
  ShieldCheck,
  CalendarCheck2,
} from 'lucide-react';
import { useMitra } from './MitraContext';

export interface DaySchedule {
  id: string;
  name: string;
  fullName: string;
  active: boolean;
  startTime: string;
  endTime: string;
}

const INITIAL_SCHEDULE: DaySchedule[] = [
  { id: 'mon', name: 'Senin', fullName: 'Senin', active: true, startTime: '09:00', endTime: '16:00' },
  { id: 'tue', name: 'Selasa', fullName: 'Selasa', active: true, startTime: '09:00', endTime: '16:00' },
  { id: 'wed', name: 'Rabu', fullName: 'Rabu', active: true, startTime: '09:00', endTime: '16:00' },
  { id: 'thu', name: 'Kamis', fullName: 'Kamis', active: true, startTime: '09:00', endTime: '16:00' },
  { id: 'fri', name: 'Jumat', fullName: 'Jumat', active: true, startTime: '09:00', endTime: '16:30' },
  { id: 'sat', name: 'Sabtu', fullName: 'Sabtu', active: true, startTime: '08:30', endTime: '14:00' },
  { id: 'sun', name: 'Minggu', fullName: 'Minggu', active: false, startTime: '09:00', endTime: '15:00' },
];

export function MitraScheduleManager() {
  const { addToast } = useMitra();
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [ticketQuota, setTicketQuota] = useState<number>(15);
  const [leadTime, setLeadTime] = useState<string>('24 Jam Sebelumnya');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Toggle day active state
  const handleToggleDay = (id: string) => {
    setSchedule((prev) =>
      prev.map((day) => (day.id === id ? { ...day, active: !day.active } : day))
    );
  };

  // Update time inputs for a specific day
  const handleTimeChange = (id: string, field: 'startTime' | 'endTime', val: string) => {
    setSchedule((prev) =>
      prev.map((day) => (day.id === id ? { ...day, [field]: val } : day))
    );
  };

  // Stepper handlers
  const handleDecrementQuota = () => {
    setTicketQuota((prev) => Math.max(1, prev - 1));
  };

  const handleIncrementQuota = () => {
    setTicketQuota((prev) => Math.min(50, prev + 1));
  };

  // Save handler
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    setIsSaved(true);

    const activeDaysCount = schedule.filter((d) => d.active).length;

    addToast({
      title: 'Jadwal & Kapasitas Disimpan',
      description: `Jadwal armada aktif (${activeDaysCount} hari/pekan) dan batas kuota ${ticketQuota} tiket/hari telah disinkronkan.`,
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
        staggerChildren: 0.12,
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
        damping: 24,
        stiffness: 260,
      },
    },
  };

  return (
    <div className="w-full flex flex-col font-jakarta relative">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Jadwal & Kapasitas Armada
          </h1>
          <p className="text-slate-600 mt-1">
            Atur ketersediaan waktu penjemputan dan batas maksimal kuota harian.
          </p>
        </div>

        {/* Live Slot Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 border border-white/60 shadow-2xs backdrop-blur-md">
          <CalendarCheck2 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-slate-700">
            6 Hari Operasional Aktif
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* ── Main Grid (2 Columns: Left xl:col-span-7, Right xl:col-span-5) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8 pb-24"
      >
        {/* ── CARD 1: JAM OPERASIONAL (Left Column - xl:col-span-7) ── */}
        <motion.div
          variants={cardVariants}
          className="xl:col-span-7 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Hari & Jam Kerja
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tentukan hari buka dan jam layanan penjemputan warga.
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200/60 hidden sm:inline-block">
              WIB (UTC+7)
            </span>
          </div>

          {/* Content (7 Rows for Mon-Sun) */}
          <div className="flex flex-col gap-4 mt-6">
            {schedule.map((day) => {
              if (day.active) {
                // ACTIVE ROW STATE
                return (
                  <div
                    key={day.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-white/80 border-emerald-100 shadow-sm gap-3 sm:gap-4"
                  >
                    {/* Left: Custom Toggle Switch + Day Name */}
                    <div className="flex items-center gap-4">
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={true}
                        aria-label={`Aktifkan operasional hari ${day.name}`}
                        onClick={() => handleToggleDay(day.id)}
                        className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer transition-colors p-0.5 flex items-center"
                      >
                        <motion.div
                          layout
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="w-5 h-5 bg-white rounded-full shadow-xs transform translate-x-6"
                        />
                      </button>

                      <span className="font-bold text-slate-900 w-20 text-sm sm:text-base">
                        {day.name}
                      </span>

                      <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50 hidden xs:inline-block">
                        Buka
                      </span>
                    </div>

                    {/* Right: Time Inputs */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) =>
                          handleTimeChange(day.id, 'startTime', e.target.value)
                        }
                        aria-label={`Jam mulai operasional hari ${day.name}`}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                      />
                      <span className="text-slate-400 font-bold select-none">-</span>
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) =>
                          handleTimeChange(day.id, 'endTime', e.target.value)
                        }
                        aria-label={`Jam selesai operasional hari ${day.name}`}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-sm text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                      />
                    </div>
                  </div>
                );
              }

              // INACTIVE ROW STATE (e.g., Minggu)
              return (
                <div
                  key={day.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-300 bg-slate-50/50 border-slate-100 opacity-60 hover:opacity-80 gap-3 sm:gap-4"
                >
                  {/* Left: Toggle Switch + Day Name */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={false}
                      aria-label={`Aktifkan operasional hari ${day.name}`}
                      onClick={() => handleToggleDay(day.id)}
                      className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer transition-colors p-0.5 flex items-center"
                    >
                      <motion.div
                        layout
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full shadow-xs transform translate-x-0"
                      />
                    </button>

                    <span className="font-medium text-slate-500 w-20 text-sm sm:text-base">
                      {day.name}
                    </span>
                  </div>

                  {/* Right: Simple text Tutup / Libur */}
                  <div className="self-end sm:self-auto">
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 px-4 py-1.5 rounded-lg select-none inline-block">
                      Tutup / Libur
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── CARD 2: KAPASITAS & KUOTA HARIAN (Right Column - xl:col-span-5) ── */}
        <motion.div
          variants={cardVariants}
          className="xl:col-span-5 bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm rounded-[2rem] p-6 sm:p-8 flex flex-col gap-8 justify-between"
        >
          <div className="flex flex-col gap-8">
            {/* ── Section A: Batas Tiket Penjemputan ── */}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Maksimal Penjemputan/Hari
                </h3>
              </div>
              <p className="text-xs text-slate-500 pl-10.5">
                Batas atas jumlah pesanan jemput yang sanggup dilayani armada per hari.
              </p>

              {/* Aesthetic Stepper */}
              <div className="bg-white border border-slate-200 rounded-2xl p-2 flex justify-between items-center mt-3 shadow-2xs">
                {/* Minus Button */}
                <button
                  type="button"
                  onClick={handleDecrementQuota}
                  disabled={ticketQuota <= 1}
                  aria-label="Kurangi kuota harian"
                  className="w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus size={18} />
                </button>

                {/* Value Display */}
                <span className="text-2xl font-mono font-bold text-slate-900 select-none">
                  {ticketQuota} Tiket
                </span>

                {/* Plus Button */}
                <button
                  type="button"
                  onClick={handleIncrementQuota}
                  disabled={ticketQuota >= 50}
                  aria-label="Tambah kuota harian"
                  className="w-12 h-12 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 transition cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Sub-note */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-2 px-1">
                <span>Min: 1 Tiket</span>
                <span>Kapasitas Rata-rata: ~{ticketQuota * 15} kg</span>
                <span>Maks: 50 Tiket</span>
              </div>
            </div>

            {/* ── Section B: Lead Time (Waktu Persiapan) ── */}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Minimal Waktu Persiapan (SLA)
                </h3>
              </div>
              <p className="text-xs text-slate-500 pl-10.5">
                Batas waktu minimal pengajuan warga sebelum armada dijadwalkan jalan.
              </p>

              {/* Sleek Dropdown */}
              <div className="relative mt-3">
                <select
                  value={leadTime}
                  onChange={(e) => setLeadTime(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 font-medium text-slate-700 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer transition shadow-2xs appearance-none pr-10"
                >
                  <option value="12 Jam Sebelumnya">12 Jam Sebelumnya (Same-day Express)</option>
                  <option value="24 Jam Sebelumnya">24 Jam Sebelumnya</option>
                  <option value="48 Jam Sebelumnya">48 Jam Sebelumnya (Batch Agregasi)</option>
                  <option value="72 Jam Sebelumnya">72 Jam Sebelumnya (Khusus Komunitas Besar)</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* ── Section C: Info SLA & Keandalan Mitra ── */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 backdrop-blur-sm flex items-start gap-3 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950">
                  Standar SLA Layanan Terverifikasi
                </p>
                <p className="text-emerald-800/80 mt-0.5 leading-relaxed text-[11px]">
                  Waktu persiapan 24 jam menjaga tingkat pemenuhan penjemputan warga di atas 98%, memenuhi kualifikasi Bank Sampah Prima ELOVIA.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card Summary Callout */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              Sinkron ke antarmuka Salur Sampah
            </span>
            <span className="font-mono text-emerald-700 font-bold">SNI 19-3964-1994</span>
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
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Jadwal & Kapasitas'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

