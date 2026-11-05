'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export interface DateOption {
  id: string; // YYYY-MM-DD
  dayName: string; // e.g. "SENIN"
  fullDayName: string; // e.g. "Senin"
  dateNum: string; // e.g. "14"
  monthName: string; // e.g. "Nov"
  year: number;
}

export interface TimeSlotOption {
  id: string;
  time: string; // e.g. "08.00 - 10.00"
  period: string; // e.g. "Pagi Awal"
}

export interface DateTimeSlotPickerProps {
  /** Optional callback fired when selected date changes */
  onDateChange?: (date: DateOption) => void;
  /** Optional callback fired when selected time slot changes */
  onTimeSlotChange?: (slot: TimeSlotOption) => void;
  /** Controlled date id */
  selectedDateId?: string;
  /** Controlled time slot id */
  selectedTimeSlotId?: string;
  /** Optional context: pickup or dropoff */
  method?: 'pickup' | 'dropoff';
  /** Additional CSS class names */
  className?: string;
}

const TIME_SLOTS: TimeSlotOption[] = [
  { id: 'slot-1', time: '08.00 - 10.00', period: 'Pagi Awal' },
  { id: 'slot-2', time: '10.00 - 12.00', period: 'Pagi Optimal' },
  { id: 'slot-3', time: '13.00 - 15.00', period: 'Siang Optimal' },
  { id: 'slot-4', time: '15.00 - 17.00', period: 'Sore' },
];

// Generate 14 upcoming consecutive days dynamically starting tomorrow
function getUpcomingDates(count = 14): DateOption[] {
  const dates: DateOption[] = [];
  const indonesianDays = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  const indonesianMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ];

  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);

    const dayName = indonesianDays[d.getDay()];
    const dateNum = String(d.getDate());
    const monthName = indonesianMonths[d.getMonth()];
    const year = d.getFullYear();
    const id = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

    dates.push({
      id,
      dayName: dayName.toUpperCase(),
      fullDayName: dayName,
      dateNum,
      monthName,
      year,
    });
  }

  return dates;
}

export function DateTimeSlotPicker({
  onDateChange,
  onTimeSlotChange,
  selectedDateId: externalDateId,
  selectedTimeSlotId: externalSlotId,
  method = 'pickup',
  className = '',
}: DateTimeSlotPickerProps) {
  const dates = useMemo(() => getUpcomingDates(14), []);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Internal state if uncontrolled
  const [internalDateId, setInternalDateId] = useState<string>(dates[0]?.id || '');
  const [internalSlotId, setInternalSlotId] = useState<string>(TIME_SLOTS[1].id);

  const activeDateId = externalDateId !== undefined ? externalDateId : internalDateId;
  const activeSlotId = externalSlotId !== undefined ? externalSlotId : internalSlotId;

  const selectedDateObj =
    dates.find((d) => d.id === activeDateId) || dates[0];
  const selectedSlotObj =
    TIME_SLOTS.find((s) => s.id === activeSlotId) || TIME_SLOTS[1];

  const handleSelectDate = (date: DateOption) => {
    if (externalDateId === undefined) {
      setInternalDateId(date.id);
    }
    onDateChange?.(date);
  };

  const handleSelectSlot = (slot: TimeSlotOption) => {
    if (externalSlotId === undefined) {
      setInternalSlotId(slot.id);
    }
    onTimeSlotChange?.(slot);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className={`w-full max-w-5xl mx-auto mt-6 relative ${className}`}
      suppressHydrationWarning
    >
      {/* Base Card with Glassmorphism */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 p-6 md:p-8 rounded-[2rem] shadow-inner transition-colors duration-300 relative z-10 overflow-hidden isolate"
      >
        {/* Subtle Background Accent */}
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Interactive Horizontal Date Picker (Pilih Tanggal) */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2 font-jakarta">
              <CalendarDays className="w-5 h-5 text-green-400 shrink-0" />
              <span>Kapan material Anda siap?</span>
            </h3>

            {/* Desktop Horizontal Scroll Chevrons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                aria-label="Gulir tanggal ke kiri"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                aria-label="Gulir tanggal ke kanan"
                className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer active:scale-95 shadow-xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-white/70 font-jakarta mt-1">
            {method === 'pickup'
              ? 'Pilih tanggal penjemputan armada ke alamat Anda (tersedia 14 hari ke depan).'
              : 'Pilih perkiraan tanggal Anda mengantar material ke fasilitas mitra.'}
          </p>

          {/* Date Cards Horizontal Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto custom-scrollbar gap-3 mt-4 pb-4 snap-x select-none"
          >
            {dates.map((item) => {
              const isActive = item.id === activeDateId;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectDate(item)}
                  className={`relative snap-start shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center cursor-pointer border transition-colors z-10 focus:outline-none ${
                    isActive
                      ? 'border-transparent text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {/* Active Background Glide (Framer Motion) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeDate"
                      className="absolute inset-0 bg-green-500 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.6)] border border-green-400/50 -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Day (e.g. "Senin") */}
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider mb-1 font-jakarta transition-colors ${
                      isActive ? 'text-white/95' : 'text-white/60'
                    }`}
                  >
                    {item.dayName}
                  </span>

                  {/* Date Number (e.g. "14") */}
                  <span
                    className={`text-2xl font-black font-[family:var(--font-fraunces)] leading-none transition-colors ${
                      isActive ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {item.dateNum}
                  </span>

                  {/* Month (e.g. "Nov") */}
                  <span
                    className={`text-[10px] font-medium mt-1 font-jakarta transition-colors ${
                      isActive ? 'text-white/80' : 'text-white/50'
                    }`}
                  >
                    {item.monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 2. Tactile Time Slot Chips (Pilih Slot Waktu) */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mt-8">
            <h3 className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2 font-jakarta">
              <Clock className="w-5 h-5 text-green-400 shrink-0" />
              <span>Pilih slot waktu</span>
            </h3>

            <span className="text-[11px] font-semibold text-green-300 bg-green-500/20 px-2.5 py-1 rounded-full border border-green-400/30">
              Waktu Indonesia Barat (WIB)
            </span>
          </div>

          <p className="text-xs text-white/70 font-jakarta mt-1">
            {method === 'pickup'
              ? 'Armada kami menjadwalkan kedatangan pada rentang waktu terpilih.'
              : 'Petugas timbang fasilitas siap melayani serah terima pada jam ini.'}
          </p>

          {/* Time Slot Chips Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = slot.id === activeSlotId;

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSelectSlot(slot)}
                  className={`relative w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 overflow-hidden z-10 focus:outline-none ${
                    isSelected
                      ? 'text-white font-bold border-transparent'
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {/* Active Background Glide (Framer Motion) */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeTimeSlot"
                      className="absolute inset-0 bg-green-500 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.6)] border border-green-400/50 -z-10"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  {/* Tiny Lucide CheckCircle2 icon scaling in only when active */}
                  <AnimatePresence mode="popLayout">
                    {isSelected && (
                      <motion.div
                        key="check-icon"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 28,
                        }}
                        className="flex items-center text-white shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="font-mono tracking-tight">
                    {slot.time} WIB
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3. Micro-Interactions Footer / Tactile Status Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2 text-white/70 font-jakarta">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>
              Jadwal Terpilih:{' '}
              <strong className="text-white font-semibold">
                {selectedDateObj?.fullDayName}, {selectedDateObj?.dateNum}{' '}
                {selectedDateObj?.monthName} {selectedDateObj?.year}
              </strong>
              {' • '}
              <strong className="text-green-400 font-semibold font-mono">
                {selectedSlotObj?.time} WIB
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-300 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30 font-jakarta">
            <Sparkles className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span>Slot Terverifikasi &amp; Siap Dipesan</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default DateTimeSlotPicker;
