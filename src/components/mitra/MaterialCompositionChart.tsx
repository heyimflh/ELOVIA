'use client';

import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PieChart as PieIcon, Layers } from 'lucide-react';

interface MaterialSegment {
  name: string;
  value: number;
  color: string;
  unit: string;
  percentage: string;
}

const MATERIAL_DATA: MaterialSegment[] = [
  { name: 'Kertas & Kardus', value: 840, color: '#10B981', unit: 'kg', percentage: '45.6%' },
  { name: 'Plastik PET & HDPE', value: 560, color: '#0E7C7B', unit: 'kg', percentage: '30.4%' },
  { name: 'Logam & Kaleng', value: 290, color: '#3B82F6', unit: 'kg', percentage: '15.7%' },
  { name: 'Kaca & Lainnya', value: 152, color: '#94A3B8', unit: 'kg', percentage: '8.3%' },
];

export function MaterialCompositionChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalKg = MATERIAL_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white/60 border border-white/40 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
              <PieIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Komposisi Material
              </h3>
              <p className="text-xs text-slate-500">
                Pilah daur ulang bulan November 2026
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 border border-emerald-200/50">
            Terverifikasi SNI
          </span>
        </div>

        {/* Recharts Donut */}
        <div className="relative w-full h-44 my-2 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as MaterialSegment;
                      return (
                        <div className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-white/20 backdrop-blur-md">
                          <span className="font-semibold block">{data.name}</span>
                          <span className="text-emerald-300 font-mono">
                            {data.value} {data.unit} ({data.percentage})
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={MATERIAL_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={74}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {MATERIAL_DATA.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-emerald-200/40 border-t-emerald-500 animate-spin" />
          )}

          {/* Center Donut Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-extrabold font-mono text-slate-900 tracking-tight">
              {totalKg.toLocaleString('id-ID')}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
              kg Total
            </span>
          </div>
        </div>
      </div>

      {/* Legend & Details Breakdown */}
      <div className="space-y-2 pt-2 border-t border-slate-100/80">
        {MATERIAL_DATA.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-xs py-1 px-1.5 rounded-xl hover:bg-white/50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 font-medium truncate">
                {item.name}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-slate-900 font-semibold">
                {item.value} kg
              </span>
              <span className="text-[10px] font-mono text-slate-500 w-10 text-right">
                {item.percentage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

