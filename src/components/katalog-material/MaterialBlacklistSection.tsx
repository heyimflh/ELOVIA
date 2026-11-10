'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, AlertOctagon, XCircle, Trash2, ArrowUpRight } from 'lucide-react';
import { BLACKLISTED_RESIDUES } from './catalogData';

export function MaterialBlacklistSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20 relative z-10">
      <div className="bg-gradient-to-br from-rose-50/80 to-amber-50/50 backdrop-blur-2xl border border-rose-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Soft Ambient Warning Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-[90px] pointer-events-none -z-10" />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldAlert size={14} className="text-rose-600" />
              Protokol Keselamatan & Kualitas
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-jakarta flex items-center gap-3">
              <ShieldAlert size={28} className="text-rose-600 inline-block shrink-0" />
              Material yang TIDAK Diterima (Residu)
            </h2>
            <p className="text-slate-600 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Untuk menjaga keselamatan mitra dan standar daur ulang pabrik, material berikut dilarang masuk dalam boks penyaluran.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-rose-800 bg-white/80 border border-rose-200 px-3.5 py-2 rounded-2xl shadow-xs shrink-0">
            <AlertOctagon size={16} className="text-rose-600" />
            <span>Toleransi Kontaminasi Maks. 0%</span>
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLACKLISTED_RESIDUES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/80 hover:bg-white backdrop-blur-md rounded-3xl p-6 border border-rose-100 shadow-[0_4px_20px_rgba(244,63,94,0.04)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-100/70 border border-rose-200/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/60">
                    <XCircle size={15} />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-rose-600 mt-1">
                  {item.subtitle}
                </p>

                {/* Explanation */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800 font-semibold">Mengapa ditolak:</strong> {item.reason}
                  </p>
                  <p className="text-slate-500">
                    <strong className="text-rose-900 font-semibold">Dampak kontaminasi:</strong> {item.consequence}
                  </p>
                </div>
              </div>

              {/* Proper Disposal Box */}
              <div className="mt-5 pt-3 border-t border-slate-100/90">
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs flex items-start gap-2">
                  <Trash2 size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Penanganan yang benar:</span>
                    <p className="text-[11px] text-amber-800 mt-0.5 leading-normal">
                      {item.properDisposal}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-8 pt-6 border-t border-rose-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p className="text-center sm:text-left">
            Punya material khusus atau limbah elektronik (e-waste) berbahaya? Diskusikan dengan tim kurir agregator sebelum penjemputan.
          </p>
          <a
            href="/metodologi"
            className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 shrink-0 hover:underline"
          >
            <span>Pelajari Standar Grading Metodologi</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}

