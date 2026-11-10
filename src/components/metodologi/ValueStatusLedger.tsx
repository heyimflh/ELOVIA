'use client';

import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Info,
  Scale,
  Building2,
} from 'lucide-react';

const STATUS_STEPS = [
  {
    step: 'Tahap 1',
    name: 'Estimasi Indikatif',
    platform: 'Aplikasi / Scanner AI',
    statusTag: 'Estimasi Awal',
    icon: Sparkles,
    description:
      'Nilai yang muncul di layar saat Anda memilih jenis sampah atau memindai foto material. Angka ini dihitung berdasarkan harga acuan B2B regional terdekat dengan asumsi kondisi standar.',
    guarantee: 'Sebagai acuan ekspektasi pendapatan sebelum menyalurkan.',
  },
  {
    step: 'Tahap 2',
    name: 'Tervalidasi Mitra',
    platform: 'Di Lokasi / Kurir Armada',
    statusTag: 'Verifikasi Fisik',
    icon: Scale,
    description:
      'Ditentukan setelah petugas mitra ELOVIA melakukan penimbangan digital bersertifikat tera dan inspeksi fisik untuk menetapkan Grade (A, B, atau C) serta pengecekan kadar air.',
    guarantee: 'Disaksikan langsung oleh warga tanpa pembulatan sepihak.',
  },
  {
    step: 'Tahap 3',
    name: 'Terkonfirmasi EcoWallet',
    platform: 'Buku Kas Digital Platform',
    statusTag: 'Selesai & Sah',
    icon: CheckCircle2,
    description:
      'Kompensasi rupiah dan poin dampak karbon resmi dicatat di EcoWallet. Nilai ini tidak dapat diubah lagi dan langsung dapat dicairkan atau ditukar reward mitra perbankan / e-money.',
    guarantee: 'Bukti transaksi digital permanen dengan timestamp resmi.',
  },
];

export function ValueStatusLedger() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* ── Section Title (Serif) ── */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4E1] border border-[#D5E3BD] text-[#3B5433] text-xs font-bold uppercase tracking-widest mb-3">
          <FileText className="w-3.5 h-3.5 text-[#7EA02A]" />
          <span>SIKLUS HIDUP NILAI TRANSAKSI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1C2E1F] tracking-tight">
          Perbedaan 3 Status Nilai di ELOVIA
        </h2>
        <p className="text-sm sm:text-base text-[#4F674D] max-w-2xl mx-auto mt-3 font-normal">
          Memahami bagaimana angka estimasi di layar bertransformasi menjadi saldo
          tunai terverifikasi di dompet digital Anda.
        </p>
      </div>

      {/* ── 3 Status Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {STATUS_STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#E2EBD3] hover:border-[#7EA02A] rounded-3xl p-7 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#F8FAF3] border border-[#DFE8D1] text-[#556F4F]">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EEF4E1] text-[#3B5433] border border-[#D5E3BD]">
                    {item.statusTag}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-[#EEF4E1] border border-[#D5E3BD] flex items-center justify-center text-[#7EA02A] mb-4 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-serif text-[#1C2E1F] mb-1">
                  {item.name}
                </h3>
                <div className="text-xs font-mono font-bold text-[#7EA02A] mb-3">
                  {item.platform}
                </div>

                <p className="text-xs text-[#526D48] leading-relaxed font-normal mb-5">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EDF3E3] text-[11px] text-[#293E23] flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#7EA02A] shrink-0" />
                <span>{item.guarantee}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Trust Ledger & Batasan Sistem Box ── */}
      <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-[#E2EBD3]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EDF3E3] pb-6 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF4E1] border border-[#D5E3BD] flex items-center justify-center text-[#7EA02A] shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-serif text-[#1C2E1F]">
                Batasan Sistem &amp; Sumber Rujukan Data
              </h4>
              <p className="text-xs text-[#556F4F] font-normal">
                Pernyataan transparansi integritas metodologi sesuai standar FR-EDU-02 &amp; FR-EDU-03
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#3B5433] bg-[#EEF4E1] px-4 py-2 rounded-full border border-[#D5E3BD]">
            <Clock className="w-4 h-4 text-[#7EA02A]" />
            <span>Pembaruan Indeks: Mingguan (Setiap Senin 06:00 WIB)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4F674D]">
          <div className="space-y-1.5">
            <div className="font-bold text-[#1C2E1F] flex items-center gap-1.5 text-sm">
              <Building2 className="w-4 h-4 text-[#7EA02A]" />
              <span>Sumber Data Harga Pasar</span>
            </div>
            <p className="leading-relaxed font-normal">
              Harga dasar dihimpun dari asosiasi daur ulang (ADUPI &amp; APDUPI)
              dan kesepakatan harga beli agregator pabrik peleburan nasional.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-[#1C2E1F] flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-[#7EA02A]" />
              <span>Metode Faktor Emisi CO₂e</span>
            </div>
            <p className="leading-relaxed font-normal">
              Faktor emisi dihitung berdasarkan rujukan IPCC Guidelines for National
              Greenhouse Gas Inventories dan Kementerian LHK RI (Life Cycle Assessment).
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-[#1C2E1F] flex items-center gap-1.5 text-sm">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Klausul Non-Spekulasi</span>
            </div>
            <p className="leading-relaxed font-normal">
              ELOVIA bukan platform bursa komoditas spekulatif. Nilai bersih
              berfokus pada stabilitas ekonomi sirkular riil untuk kesejahteraan warga dan mitra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
