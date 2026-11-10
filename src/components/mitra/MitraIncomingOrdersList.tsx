'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  CheckCircle2,
  Scale,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Truck,
  Check,
} from 'lucide-react';
import { useMitra } from './MitraContext';

export interface IncomingOrder {
  id: string;
  customerName: string;
  avatarText: string;
  category: string;
  weightEst: string;
  priceEst: string;
  location: string;
  timeSlot: string;
  type: 'pickup' | 'dropoff';
  status: 'pending' | 'ready_for_weighing' | 'scheduled';
}

const DEFAULT_ORDERS: IncomingOrder[] = [
  {
    id: 'REQ-ELV-2481',
    customerName: 'Budi Santoso',
    avatarText: 'BS',
    category: 'Kardus Cokelat & Botol PET',
    weightEst: '14.5 kg',
    priceEst: 'Rp 42.000',
    location: 'Jl. Ir. H. Juanda No. 120, Coblong',
    timeSlot: 'Hari ini · 13:30 - 15:00 WIB',
    type: 'pickup',
    status: 'pending',
  },
  {
    id: 'ORD-ELV-20261104-089',
    customerName: 'Lestari Handayani',
    avatarText: 'LH',
    category: 'Kertas HVS Putih & Arsip',
    weightEst: '12.8 kg',
    priceEst: 'Rp 38.400',
    location: 'Drop-off Mandiri di Gerai Dago',
    timeSlot: 'Menunggu Verifikasi Timbangan',
    type: 'dropoff',
    status: 'ready_for_weighing',
  },
  {
    id: 'REQ-ELV-2480',
    customerName: 'Komunitas Bank Sampah RW 07',
    avatarText: 'RW',
    category: 'Campuran Anorganik Terpilah',
    weightEst: '38.0 kg',
    priceEst: 'Rp 112.500',
    location: 'Balai Warga RW 07 Sukasari',
    timeSlot: 'Besok · 10:00 WIB (Armada Unit 02)',
    type: 'pickup',
    status: 'scheduled',
  },
  {
    id: 'REQ-ELV-2479',
    customerName: 'Ahmad Fauzi',
    avatarText: 'AF',
    category: 'Botol Kaca Bening & Kaleng Minuman',
    weightEst: '8.2 kg',
    priceEst: 'Rp 21.000',
    location: 'Jl. Tubagus Ismail Raya No. 45',
    timeSlot: 'Hari ini · 15:30 - 17:00 WIB',
    type: 'pickup',
    status: 'pending',
  },
];

interface MitraIncomingOrdersListProps {
  onActionToast?: (title: string, desc: string, type?: 'success' | 'info') => void;
}

export function MitraIncomingOrdersList({ onActionToast }: MitraIncomingOrdersListProps) {
  const { openWeighIn } = useMitra();
  const [orders, setOrders] = useState<IncomingOrder[]>(DEFAULT_ORDERS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'weighing'>('all');

  const handleConfirmOrder = (orderId: string, customerName: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'scheduled' } : o))
    );
    onActionToast?.(
      'Permintaan Dikonfirmasi',
      `Jadwal penjemputan untuk ${customerName} (#${orderId}) berhasil disetujui.`,
      'success'
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'pending') return o.status === 'pending';
    if (filter === 'weighing') return o.status === 'ready_for_weighing';
    return true;
  });

  return (
    <div className="bg-white/60 border border-white/40 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Antrean Permintaan Masuk
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {orders.length} Tiket
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tinjau pengajuan penjemputan dan pengantaran sampah pilah
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center p-1 bg-white/70 rounded-2xl border border-white/50 shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filter === 'pending'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perlu Respon ({orders.filter((o) => o.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('weighing')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filter === 'weighing'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Menunggu Timbang ({orders.filter((o) => o.status === 'ready_for_weighing').length})
            </button>
          </div>
        </div>

        {/* Minimalist List */}
        <div className="divide-y divide-slate-100/90">
          {filteredOrders.map((order) => {
            const isPending = order.status === 'pending';
            const isWeighing = order.status === 'ready_for_weighing';

            return (
              <div
                key={order.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-white/40 px-2 -mx-2 rounded-2xl transition-colors"
              >
                {/* Left: Avatar, Name, Material & Location */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/60 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {order.avatarText}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {order.customerName}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/70 px-1.5 py-0.2 rounded border border-white/60">
                        {order.id}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">
                      {order.category}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 flex-wrap">
                      <span className="font-semibold text-emerald-700 font-mono">
                        {order.weightEst}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-800 font-semibold">
                        {order.priceEst}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        {order.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Badge & Primary Action Button */}
                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                      isPending
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : isWeighing
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {isPending
                      ? 'Menunggu'
                      : isWeighing
                      ? 'Timbang'
                      : 'Terjadwal'}
                  </span>

                  {isPending ? (
                    <button
                      type="button"
                      onClick={() => handleConfirmOrder(order.id, order.customerName)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition hover:scale-[1.02] active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Konfirmasi</span>
                    </button>
                  ) : isWeighing ? (
                    <button
                      type="button"
                      onClick={() =>
                        openWeighIn({
                          ticketId: order.id,
                          customerName: order.customerName,
                          customerAvatar: order.avatarText,
                          location: order.location,
                          method: order.type,
                          materials: [
                            {
                              id: 'mat-hvs',
                              name: 'Kertas HVS Putih & Arsip',
                              estimatedWeight: 12.8,
                              actualWeight: 12.8,
                              basePricePerKg: 3000,
                              quality: 'A',
                            },
                          ],
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition hover:scale-[1.02] cursor-pointer"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Input Timbangan</span>
                    </button>
                  ) : (
                    <Link
                      href={`/salur/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-emerald-800 border border-emerald-200/60 text-xs font-semibold shadow-2xs transition"
                    >
                      <span>Detail</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer link to full requests page */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between text-xs text-slate-500">
        <span>SLA target konfirmasi: ≤ 24 jam</span>
        <Link
          href="/mitra/permintaan"
          className="font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
        >
          <span>Kelola Semua Tiket Permintaan</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

