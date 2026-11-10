/**
 * @file transactionLedgerData.ts
 * Data structure and filtering engine for Section 3: The Immutable Ledger (FR-WLT-03 & FR-WLT-04).
 */

export type LedgerStatus = 'TERKONFIRMASI' | 'DALAM PROSES' | 'ESTIMASI';

export interface MaterialBreakdownItem {
  name: string;
  category: string;
  weightKg: number;
  pricePerKg: number;
  subtotal: number;
}

export interface FinancialBreakdown {
  grossMaterialValue: number;
  logisticsFee: number; // Biaya jemput / transport
  serviceFee: number; // Biaya platform ELOVIA
  netEarnings: number; // Nilai bersih yang masuk dompet
}

export interface TimelineStepItem {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface LedgerTransaction {
  id: string; // e.g. "TRX-ELV-00124"
  orderNumber: string;
  date: string; // "10 Nov 2026"
  time: string; // "14:32 WIB"
  isoDate: string; // "2026-11-10T14:32:00"
  collectorPartner: {
    name: string;
    avatarInitials: string;
    verified: boolean;
    location: string;
  };
  primaryMaterialCategory: string;
  totalWeightKg: number;
  netEarnings: number;
  status: LedgerStatus;
  deliveryMethod: 'Penjemputan' | 'Drop-off';
  materials: MaterialBreakdownItem[];
  financials: FinancialBreakdown;
  timeline: TimelineStepItem[];
  notes?: string;
}

export const MOCK_DETAILED_LEDGER_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: 'TRX-ELV-00124',
    orderNumber: 'ORD-ELV-202611-089',
    date: '10 Nov 2026',
    time: '14:32 WIB',
    isoDate: '2026-11-10T14:32:00',
    collectorPartner: {
      name: 'Bank Sampah Resik Kebumen',
      avatarInitials: 'BS',
      verified: true,
      location: 'Kec. Kebumen, Jawa Tengah',
    },
    primaryMaterialCategory: 'Plastik PET & Kaleng',
    totalWeightKg: 16.5,
    netEarnings: 125000,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Penjemputan',
    materials: [
      {
        name: 'Plastik PET Bening (Grade A)',
        category: 'Plastik',
        weightKg: 10.0,
        pricePerKg: 7500,
        subtotal: 75000,
      },
      {
        name: 'Kaleng Alumunium Minuman',
        category: 'Logam',
        weightKg: 6.5,
        pricePerKg: 10000,
        subtotal: 65000,
      },
    ],
    financials: {
      grossMaterialValue: 140000,
      logisticsFee: 10000,
      serviceFee: 5000,
      netEarnings: 125000,
    },
    timeline: [
      {
        title: 'Pengajuan Penjemputan',
        description: 'Jadwal penjemputan disepakati dengan mitra.',
        timestamp: '10 Nov 2026, 09:15 WIB',
        completed: true,
      },
      {
        title: 'Verifikasi Timbangan Lapangan',
        description: 'Timbangan digital tersertifikasi selesai dikonfirmasi.',
        timestamp: '10 Nov 2026, 13:45 WIB',
        completed: true,
      },
      {
        title: 'Pencairan Otomatis',
        description: 'Mitra menyetujui transaksi dan dana masuk ke ledger.',
        timestamp: '10 Nov 2026, 14:30 WIB',
        completed: true,
      },
      {
        title: 'Pendapatan Dikonfirmasi',
        description: 'Transaksi selesai, kontribusi terverifikasi masuk ke dompet.',
        timestamp: '10 Nov 2026, 14:32 WIB',
        completed: true,
      },
    ],
    notes: 'Material bersih dan terpilah rapi sesuai spesifikasi Grade A.',
  },
  {
    id: 'TRX-ELV-00123',
    orderNumber: 'ORD-ELV-202611-084',
    date: '09 Nov 2026',
    time: '11:15 WIB',
    isoDate: '2026-11-09T11:15:00',
    collectorPartner: {
      name: 'Pusat Daur Ulang EcoBali',
      avatarInitials: 'EB',
      verified: true,
      location: 'Denpasar Selatan, Bali',
    },
    primaryMaterialCategory: 'Kardus & Kertas',
    totalWeightKg: 28.0,
    netEarnings: 84000,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Drop-off',
    materials: [
      {
        name: 'Kardus Box Cokelat Gelombang',
        category: 'Kertas',
        weightKg: 20.0,
        pricePerKg: 3200,
        subtotal: 64000,
      },
      {
        name: 'Kertas Arsip Putih HVS',
        category: 'Kertas',
        weightKg: 8.0,
        pricePerKg: 2500,
        subtotal: 20000,
      },
    ],
    financials: {
      grossMaterialValue: 84000,
      logisticsFee: 0, // Mandiri drop-off
      serviceFee: 0, // Gratis biaya layanan drop-off
      netEarnings: 84000,
    },
    timeline: [
      {
        title: 'Drop-off di Fasilitas Mitra',
        description: 'Pengguna menyerahkan material di titik penerimaan.',
        timestamp: '09 Nov 2026, 10:45 WIB',
        completed: true,
      },
      {
        title: 'Pemeriksaan Kualitas',
        description: 'Kardus kering dan bebas kontaminan air.',
        timestamp: '09 Nov 2026, 11:00 WIB',
        completed: true,
      },
      {
        title: 'Pendapatan Dikonfirmasi',
        description: 'Dana ditransfer seketika ke kas dompet.',
        timestamp: '09 Nov 2026, 11:15 WIB',
        completed: true,
      },
    ],
  },
  {
    id: 'TRX-ELV-00122',
    orderNumber: 'ORD-ELV-202611-077',
    date: '08 Nov 2026',
    time: '16:40 WIB',
    isoDate: '2026-11-08T16:40:00',
    collectorPartner: {
      name: 'Agregator Plastik Sejahtera',
      avatarInitials: 'PS',
      verified: true,
      location: 'Cibitung, Bekasi',
    },
    primaryMaterialCategory: 'Plastik HDPE',
    totalWeightKg: 12.4,
    netEarnings: 62000,
    status: 'DALAM PROSES',
    deliveryMethod: 'Penjemputan',
    materials: [
      {
        name: 'Botol HDPE Bekas Sabun & Sampo',
        category: 'Plastik',
        weightKg: 12.4,
        pricePerKg: 5500,
        subtotal: 68200,
      },
    ],
    financials: {
      grossMaterialValue: 68200,
      logisticsFee: 6200,
      serviceFee: 0,
      netEarnings: 62000,
    },
    timeline: [
      {
        title: 'Penjemputan Selesai',
        description: 'Kurir mitra telah mengambil paket material.',
        timestamp: '08 Nov 2026, 15:30 WIB',
        completed: true,
      },
      {
        title: 'Proses Timbangan di Hub',
        description: 'Menunggu konfirmasi verifikasi tara timbangan pusat.',
        timestamp: '08 Nov 2026, 16:40 WIB',
        completed: true,
      },
      {
        title: 'Konfirmasi Pengguna',
        description: 'Menunggu persetujuan hasil timbang akhir.',
        timestamp: 'Estimasi hari ini',
        completed: false,
      },
    ],
    notes: 'Material sedang dalam antrean verifikasi di hub sortir.',
  },
  {
    id: 'TRX-ELV-00121',
    orderNumber: 'ORD-ELV-202611-062',
    date: '06 Nov 2026',
    time: '09:20 WIB',
    isoDate: '2026-11-06T09:20:00',
    collectorPartner: {
      name: 'Drop-off Komunitas Sirkular',
      avatarInitials: 'KS',
      verified: false,
      location: 'Sleman, D.I. Yogyakarta',
    },
    primaryMaterialCategory: 'Kaca & Botol Beling',
    totalWeightKg: 18.0,
    netEarnings: 36000,
    status: 'ESTIMASI',
    deliveryMethod: 'Drop-off',
    materials: [
      {
        name: 'Botol Kaca Utuh & Pecahan Terpilah',
        category: 'Kaca',
        weightKg: 18.0,
        pricePerKg: 2000,
        subtotal: 36000,
      },
    ],
    financials: {
      grossMaterialValue: 36000,
      logisticsFee: 0,
      serviceFee: 0,
      netEarnings: 36000,
    },
    timeline: [
      {
        title: 'Tersimpan di Keranjang',
        description: 'Estimasi nilai kalkulasi awal dari Waste Scanner.',
        timestamp: '06 Nov 2026, 09:20 WIB',
        completed: true,
      },
      {
        title: 'Menunggu Pengajuan',
        description: 'Belum diserahkan ke mitra pengolah.',
        timestamp: '-',
        completed: false,
      },
    ],
    notes: 'Nilai indikatif berdasarkan acuan harga regional D.I. Yogyakarta.',
  },
  {
    id: 'TRX-ELV-00120',
    orderNumber: 'ORD-ELV-202611-041',
    date: '03 Nov 2026',
    time: '13:10 WIB',
    isoDate: '2026-11-03T13:10:00',
    collectorPartner: {
      name: 'Bank Sampah Induk Surabaya',
      avatarInitials: 'IS',
      verified: true,
      location: 'Rungkut, Surabaya',
    },
    primaryMaterialCategory: 'Alumunium & Besi',
    totalWeightKg: 14.2,
    netEarnings: 156200,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Penjemputan',
    materials: [
      {
        name: 'Kaleng Biskuit & Besi Tipis',
        category: 'Logam',
        weightKg: 8.2,
        pricePerKg: 7000,
        subtotal: 57400,
      },
      {
        name: 'Tutup Botol & Kaleng Seng',
        category: 'Logam',
        weightKg: 6.0,
        pricePerKg: 18000,
        subtotal: 108000,
      },
    ],
    financials: {
      grossMaterialValue: 165400,
      logisticsFee: 6200,
      serviceFee: 3000,
      netEarnings: 156200,
    },
    timeline: [
      {
        title: 'Penjemputan Armada Elektrik',
        description: 'Diambil oleh armada logistik rendah emisi.',
        timestamp: '03 Nov 2026, 12:00 WIB',
        completed: true,
      },
      {
        title: 'Timbangan Terverifikasi',
        description: 'Timbangan digital dikonfirmasi kedua pihak.',
        timestamp: '03 Nov 2026, 13:00 WIB',
        completed: true,
      },
      {
        title: 'Pendapatan Dikonfirmasi',
        description: 'Transaksi selesai, dana dicatat permanen.',
        timestamp: '03 Nov 2026, 13:10 WIB',
        completed: true,
      },
    ],
  },
  {
    id: 'TRX-ELV-00119',
    orderNumber: 'ORD-ELV-202610-188',
    date: '28 Okt 2026',
    time: '15:50 WIB',
    isoDate: '2026-10-28T15:50:00',
    collectorPartner: {
      name: 'Bank Sampah Resik Kebumen',
      avatarInitials: 'BS',
      verified: true,
      location: 'Kec. Kebumen, Jawa Tengah',
    },
    primaryMaterialCategory: 'Plastik PET',
    totalWeightKg: 22.0,
    netEarnings: 154000,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Penjemputan',
    materials: [
      {
        name: 'PET Bening & Biru Muda',
        category: 'Plastik',
        weightKg: 22.0,
        pricePerKg: 7500,
        subtotal: 165000,
      },
    ],
    financials: {
      grossMaterialValue: 165000,
      logisticsFee: 8000,
      serviceFee: 3000,
      netEarnings: 154000,
    },
    timeline: [
      {
        title: 'Selesai & Dikonfirmasi',
        description: 'Penyaluran material sukses.',
        timestamp: '28 Okt 2026, 15:50 WIB',
        completed: true,
      },
    ],
  },
  {
    id: 'TRX-ELV-00118',
    orderNumber: 'ORD-ELV-202610-142',
    date: '22 Okt 2026',
    time: '10:30 WIB',
    isoDate: '2026-10-22T10:30:00',
    collectorPartner: {
      name: 'Pusat Daur Ulang EcoBali',
      avatarInitials: 'EB',
      verified: true,
      location: 'Denpasar Selatan, Bali',
    },
    primaryMaterialCategory: 'Kertas Arsip',
    totalWeightKg: 35.0,
    netEarnings: 98000,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Drop-off',
    materials: [
      {
        name: 'Kertas Dokumen & Buku Bekas',
        category: 'Kertas',
        weightKg: 35.0,
        pricePerKg: 2800,
        subtotal: 98000,
      },
    ],
    financials: {
      grossMaterialValue: 98000,
      logisticsFee: 0,
      serviceFee: 0,
      netEarnings: 98000,
    },
    timeline: [
      {
        title: 'Selesai & Dikonfirmasi',
        description: 'Material diverifikasi di drop point.',
        timestamp: '22 Okt 2026, 10:30 WIB',
        completed: true,
      },
    ],
  },
  {
    id: 'TRX-ELV-00117',
    orderNumber: 'ORD-ELV-202610-098',
    date: '15 Okt 2026',
    time: '14:00 WIB',
    isoDate: '2026-10-15T14:00:00',
    collectorPartner: {
      name: 'Agregator Plastik Sejahtera',
      avatarInitials: 'PS',
      verified: true,
      location: 'Cibitung, Bekasi',
    },
    primaryMaterialCategory: 'Plastik LDPE & PP',
    totalWeightKg: 9.5,
    netEarnings: 47500,
    status: 'TERKONFIRMASI',
    deliveryMethod: 'Penjemputan',
    materials: [
      {
        name: 'Plastik Kresek Bening & Gelas PP',
        category: 'Plastik',
        weightKg: 9.5,
        pricePerKg: 5500,
        subtotal: 52250,
      },
    ],
    financials: {
      grossMaterialValue: 52250,
      logisticsFee: 4750,
      serviceFee: 0,
      netEarnings: 47500,
    },
    timeline: [
      {
        title: 'Selesai & Dikonfirmasi',
        description: 'Saldo kas berhasil dialokasikan.',
        timestamp: '15 Okt 2026, 14:00 WIB',
        completed: true,
      },
    ],
  },
];
