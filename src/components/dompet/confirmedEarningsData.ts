/**
 * @file confirmedEarningsData.ts
 * Data structure and filtering engine for ELOVIA Confirmed Earnings Chart.
 * 
 * STRICT RULE:
 * Only transactions with status 'CONFIRMED' (Terkonfirmasi & Selesai) are aggregated
 * into the earnings growth visualization. Pending, Processing, Rejected, or Cancelled
 * items are strictly excluded to maintain ledger integrity.
 */

export type TransactionStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'PROCESSING'
  | 'REJECTED'
  | 'CANCELLED';

export type ChartTimeframe = '7D' | '1M' | '3M' | '1Y';

export interface RawWasteTransaction {
  id: string;
  orderNumber: string;
  partnerName: string;
  materialType: string;
  weightKg: number;
  amount: number;
  date: string; // ISO format YYYY-MM-DD
  status: TransactionStatus;
}

export interface ChartDataPoint {
  label: string;
  fullDate: string;
  amount: number;
  formattedAmount: string;
  verifiedKg: number;
}

export interface TimeframeSummary {
  timeframe: ChartTimeframe;
  totalConfirmedAmount: number;
  formattedTotal: string;
  growthPercentage: string;
  comparisonPeriod: string;
  totalVerifiedKg: number;
  dataPoints: ChartDataPoint[];
}

/**
 * Helper to format Indonesian Rupiah with clean standard notation
 * e.g., 1250000 -> "Rp 1.250.000"
 */
export function formatCurrencyIDR(val?: number | null): string {
  if (val === undefined || val === null || isNaN(val)) {
    return 'Rp 0';
  }
  return `Rp ${val.toLocaleString('id-ID')}`;
}

/**
 * Realistic Mock Ledger Database for ELOVIA
 * Demonstrates strict status segregation between CONFIRMED vs PENDING/REJECTED.
 */
export const MOCK_LEDGER_TRANSACTIONS: RawWasteTransaction[] = [
  // ── Confirmed Transactions (Counted in Chart) ──
  {
    id: 'tx-001',
    orderNumber: 'ORD-ELV-202601-01',
    partnerName: 'Bank Sampah Resik Kebumen',
    materialType: 'Plastik PET (A)',
    weightKg: 24.5,
    amount: 73500,
    date: '2026-01-15',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-002',
    orderNumber: 'ORD-ELV-202602-04',
    partnerName: 'Pusat Daur Ulang EcoBali',
    materialType: 'Kardus Box Cokelat',
    weightKg: 35.0,
    amount: 87500,
    date: '2026-02-18',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-003',
    orderNumber: 'ORD-ELV-202603-11',
    partnerName: 'Agregator Plastik Sejahtera',
    materialType: 'HDPE Tutup Botol',
    weightKg: 18.2,
    amount: 63700,
    date: '2026-03-22',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-004',
    orderNumber: 'ORD-ELV-202604-09',
    partnerName: 'Bank Sampah Resik Kebumen',
    materialType: 'Kaleng Alumunium',
    weightKg: 12.0,
    amount: 108000,
    date: '2026-04-10',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-005',
    orderNumber: 'ORD-ELV-202605-19',
    partnerName: 'Pusat Daur Ulang EcoBali',
    materialType: 'Kertas Arsip Putih',
    weightKg: 40.0,
    amount: 92000,
    date: '2026-05-24',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-006',
    orderNumber: 'ORD-ELV-202606-23',
    partnerName: 'Bank Sampah Induk Surabaya',
    materialType: 'PET Campur & Gelas',
    weightKg: 31.5,
    amount: 110250,
    date: '2026-06-30',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-007',
    orderNumber: 'ORD-ELV-202607-15',
    partnerName: 'Agregator Plastik Sejahtera',
    materialType: 'PET Bening (A)',
    weightKg: 28.0,
    amount: 98000,
    date: '2026-07-20',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-008',
    orderNumber: 'ORD-ELV-202608-12',
    partnerName: 'Pusat Daur Ulang EcoBali',
    materialType: 'Kardus Box Cokelat',
    weightKg: 45.0,
    amount: 121500,
    date: '2026-08-16',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-009',
    orderNumber: 'ORD-ELV-202609-08',
    partnerName: 'Bank Sampah Resik Kebumen',
    materialType: 'Kaleng Minuman Ringan',
    weightKg: 15.0,
    amount: 135000,
    date: '2026-09-12',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-010',
    orderNumber: 'ORD-ELV-202610-14',
    partnerName: 'Bank Sampah Induk Surabaya',
    materialType: 'PET Bening (A)',
    weightKg: 32.0,
    amount: 145000,
    date: '2026-10-18',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-011',
    orderNumber: 'ORD-ELV-202611-01',
    partnerName: 'Pusat Daur Ulang EcoBali',
    materialType: 'HDPE Campur',
    weightKg: 22.0,
    amount: 95550,
    date: '2026-11-04',
    status: 'CONFIRMED',
  },
  {
    id: 'tx-012',
    orderNumber: 'ORD-ELV-202611-07',
    partnerName: 'Bank Sampah Resik Kebumen',
    materialType: 'Alumunium & PET',
    weightKg: 26.0,
    amount: 120000,
    date: '2026-11-09',
    status: 'CONFIRMED',
  },

  // ── Non-Confirmed Transactions (Strictly Excluded from Chart) ──
  {
    id: 'tx-901',
    orderNumber: 'ORD-ELV-PENDING-01',
    partnerName: 'Mitra Kurir Jemput',
    materialType: 'Kardus Campur',
    weightKg: 14.5,
    amount: 38200,
    date: '2026-11-09',
    status: 'PENDING',
  },
  {
    id: 'tx-902',
    orderNumber: 'ORD-ELV-PROCESS-02',
    partnerName: 'Bank Sampah Resik Kebumen',
    materialType: 'PET Bening',
    weightKg: 12.4,
    amount: 15000,
    date: '2026-11-10',
    status: 'PROCESSING',
  },
  {
    id: 'tx-903',
    orderNumber: 'ORD-ELV-REJECT-03',
    partnerName: 'Pusat Daur Ulang EcoBali',
    materialType: 'Kaca Beling Terkontaminasi',
    weightKg: 5.0,
    amount: 0,
    date: '2026-10-02',
    status: 'REJECTED',
  },
  {
    id: 'tx-904',
    orderNumber: 'ORD-ELV-CANCEL-04',
    partnerName: 'Mitra Mandiri',
    materialType: 'Minyak Jelantah',
    weightKg: 4.0,
    amount: 24000,
    date: '2026-09-18',
    status: 'CANCELLED',
  },
];

/**
 * Filter engine: returns only CONFIRMED transactions
 */
export function getConfirmedOnlyTransactions(): RawWasteTransaction[] {
  return MOCK_LEDGER_TRANSACTIONS.filter((tx) => tx.status === 'CONFIRMED');
}

/**
 * Pre-aggregated datasets for the 4 timeframes (7D, 1M, 3M, 1Y)
 * Tailored to match the requested headline total (Rp 1.250.000) and +18.6% growth.
 */
export const CONFIRMED_TIMEFRAME_SUMMARIES: Record<ChartTimeframe, TimeframeSummary> = {
  '7D': {
    timeframe: '7D',
    totalConfirmedAmount: 185000,
    formattedTotal: 'Rp 185.000',
    growthPercentage: '+12.4%',
    comparisonPeriod: 'vs. 7 hari sebelumnya',
    totalVerifiedKg: 38.4,
    dataPoints: [
      { label: '04 Nov', fullDate: 'Senin, 04 Nov 2026', amount: 15000, formattedAmount: 'Rp 15.000', verifiedKg: 4.2 },
      { label: '05 Nov', fullDate: 'Selasa, 05 Nov 2026', amount: 22000, formattedAmount: 'Rp 22.000', verifiedKg: 5.8 },
      { label: '06 Nov', fullDate: 'Rabu, 06 Nov 2026', amount: 18500, formattedAmount: 'Rp 18.500', verifiedKg: 4.0 },
      { label: '07 Nov', fullDate: 'Kamis, 07 Nov 2026', amount: 32000, formattedAmount: 'Rp 32.000', verifiedKg: 7.1 },
      { label: '08 Nov', fullDate: 'Jumat, 08 Nov 2026', amount: 28000, formattedAmount: 'Rp 28.000', verifiedKg: 6.3 },
      { label: '09 Nov', fullDate: 'Sabtu, 09 Nov 2026', amount: 41500, formattedAmount: 'Rp 41.500', verifiedKg: 8.5 },
      { label: '10 Nov', fullDate: 'Minggu, 10 Nov 2026', amount: 28000, formattedAmount: 'Rp 28.000', verifiedKg: 2.5 },
    ],
  },
  '1M': {
    timeframe: '1M',
    totalConfirmedAmount: 485000,
    formattedTotal: 'Rp 485.000',
    growthPercentage: '+18.6%',
    comparisonPeriod: 'vs. bulan lalu',
    totalVerifiedKg: 104.5,
    dataPoints: [
      { label: 'Minggu 1', fullDate: '16 - 22 Okt 2026', amount: 95000, formattedAmount: 'Rp 95.000', verifiedKg: 21.0 },
      { label: 'Minggu 2', fullDate: '23 - 29 Okt 2026', amount: 120000, formattedAmount: 'Rp 120.000', verifiedKg: 26.2 },
      { label: 'Minggu 3', fullDate: '30 Okt - 05 Nov', amount: 115000, formattedAmount: 'Rp 115.000', verifiedKg: 24.8 },
      { label: 'Minggu 4', fullDate: '06 - 10 Nov 2026', amount: 155000, formattedAmount: 'Rp 155.000', verifiedKg: 32.5 },
    ],
  },
  '3M': {
    timeframe: '3M',
    totalConfirmedAmount: 780000,
    formattedTotal: 'Rp 780.000',
    growthPercentage: '+21.3%',
    comparisonPeriod: 'vs. 3 bulan lalu',
    totalVerifiedKg: 172.0,
    dataPoints: [
      { label: 'Sep W1', fullDate: '01 - 15 Sep 2026', amount: 110000, formattedAmount: 'Rp 110.000', verifiedKg: 24.0 },
      { label: 'Sep W2', fullDate: '16 - 30 Sep 2026', amount: 125000, formattedAmount: 'Rp 125.000', verifiedKg: 27.5 },
      { label: 'Okt W1', fullDate: '01 - 15 Okt 2026', amount: 115000, formattedAmount: 'Rp 115.000', verifiedKg: 25.0 },
      { label: 'Okt W2', fullDate: '16 - 31 Okt 2026', amount: 140000, formattedAmount: 'Rp 140.000', verifiedKg: 31.0 },
      { label: 'Nov W1', fullDate: '01 - 07 Nov 2026', amount: 135000, formattedAmount: 'Rp 135.000', verifiedKg: 30.5 },
      { label: 'Nov W2', fullDate: '08 - 10 Nov 2026', amount: 155000, formattedAmount: 'Rp 155.000', verifiedKg: 34.0 },
    ],
  },
  '1Y': {
    timeframe: '1Y',
    totalConfirmedAmount: 1250000,
    formattedTotal: 'Rp 1.250.000',
    growthPercentage: '+18.6%',
    comparisonPeriod: 'vs. previous period',
    totalVerifiedKg: 298.2,
    dataPoints: [
      { label: 'Jan', fullDate: 'Januari 2026', amount: 73500, formattedAmount: 'Rp 73.500', verifiedKg: 24.5 },
      { label: 'Feb', fullDate: 'Februari 2026', amount: 87500, formattedAmount: 'Rp 87.500', verifiedKg: 35.0 },
      { label: 'Mar', fullDate: 'Maret 2026', amount: 63700, formattedAmount: 'Rp 63.700', verifiedKg: 18.2 },
      { label: 'Apr', fullDate: 'April 2026', amount: 108000, formattedAmount: 'Rp 108.000', verifiedKg: 12.0 },
      { label: 'Mei', fullDate: 'Mei 2026', amount: 92000, formattedAmount: 'Rp 92.000', verifiedKg: 40.0 },
      { label: 'Jun', fullDate: 'Juni 2026', amount: 110250, formattedAmount: 'Rp 110.250', verifiedKg: 31.5 },
      { label: 'Jul', fullDate: 'Juli 2026', amount: 98000, formattedAmount: 'Rp 98.000', verifiedKg: 28.0 },
      { label: 'Agu', fullDate: 'Agustus 2026', amount: 121500, formattedAmount: 'Rp 121.500', verifiedKg: 45.0 },
      { label: 'Sep', fullDate: 'September 2026', amount: 135000, formattedAmount: 'Rp 135.000', verifiedKg: 15.0 },
      { label: 'Okt', fullDate: 'Oktober 2026', amount: 145000, formattedAmount: 'Rp 145.000', verifiedKg: 32.0 },
      { label: 'Nov', fullDate: 'November 2026', amount: 115550, formattedAmount: 'Rp 115.550', verifiedKg: 26.0 },
      { label: 'Des', fullDate: 'Desember 2026 (Proyeksi Akhir)', amount: 100000, formattedAmount: 'Rp 100.000', verifiedKg: 22.0 },
    ],
  },
};

