'use client';

import {
  Inbox,
  CalendarClock,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

interface MetricCardItem {
  id: string;
  title: string;
  valueNumber: string;
  valueUnit: string;
  badge: string;
  badgeStyle: string;
  subtext: string;
  icon: typeof Inbox;
  iconBoxStyle: string;
  iconColor: string;
}

const METRICS_DATA: MetricCardItem[] = [
  {
    id: 'permintaan-baru',
    title: 'Permintaan Baru',
    valueNumber: '4',
    valueUnit: 'tiket',
    badge: 'Butuh Respon',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    subtext: 'Rata-rata tanggapan 12 menit',
    icon: Inbox,
    iconBoxStyle: 'bg-emerald-50 border-emerald-100/80',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'terjadwal-hari-ini',
    title: 'Terjadwal Hari Ini',
    valueNumber: '2',
    valueUnit: 'lokasi',
    badge: 'Prioritas Hari Ini',
    badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/60',
    subtext: 'Penjemputan armada & drop-off',
    icon: CalendarClock,
    iconBoxStyle: 'bg-amber-50 border-amber-100/80',
    iconColor: 'text-amber-600',
  },
  {
    id: 'total-tersalurkan',
    title: 'Total Tersalurkan',
    valueNumber: '1.842',
    valueUnit: 'kg',
    badge: '+18.4% MoM',
    badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200/60',
    subtext: 'Target bulanan: 2.500 kg',
    icon: TrendingUp,
    iconBoxStyle: 'bg-blue-50 border-blue-100/80',
    iconColor: 'text-blue-600',
  },
  {
    id: 'sla-respon',
    title: 'SLA Respon',
    valueNumber: '98.8%',
    valueUnit: 'on-time',
    badge: 'Level Prima',
    badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200/60',
    subtext: 'Standar kepatuhan SLA ≤ 24 jam',
    icon: CheckCircle2,
    iconBoxStyle: 'bg-teal-50 border-teal-100/80',
    iconColor: 'text-teal-600',
  },
];

export function MitraQuickMetricsRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0">
      {METRICS_DATA.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[140px] group"
          >
            {/* Top Row: Icon on the left, pill badge on the right */}
            <div className="flex items-center justify-between gap-2">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-2xs transition-transform duration-300 group-hover:scale-105 ${card.iconBoxStyle}`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>

              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${card.badgeStyle}`}
              >
                {card.badge}
              </span>
            </div>

            {/* Bottom Row: Main large number with small descriptive subtitle below */}
            <div>
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
                  {card.valueNumber}
                </span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-slate-500">
                  {card.valueUnit}
                </span>
              </div>

              <p className="text-xs font-jakarta text-slate-500 font-normal truncate mt-1.5 leading-normal">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
