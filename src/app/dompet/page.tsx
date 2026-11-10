import type { Metadata } from 'next';
import {
  VaultlyEcoWalletHero,
  ConfirmedEarningsChart,
  ImmutableLedgerSection,
} from '@/components/dompet';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'EcoWallet — My Waste Earnings | ELOVIA',
  description:
    'Catat dan kelola hasil pemilahan sampah sirkular Anda secara elegan dan terverifikasi di ELOVIA.',
};

export default function DompetPage() {
  return (
    <main className="w-full bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-800 overflow-x-hidden">
      {/* ── Section 1: Full-Height Fixed Photographic Hero & Overlapping 3-Pillar Ledger Cards ── */}
      <VaultlyEcoWalletHero
        userName="Lestari"
        confirmedBalance={24500}
        inProgressBalance={12800}
        estimatedBalance={38200}
      />

      {/* ── Section 2: Grafik Pendapatan Terkonfirmasi (Confirmed Earnings Chart) ── */}
      <ConfirmedEarningsChart defaultTimeframe="1Y" />

      {/* ── Section 3: Riwayat Transaksi — The Immutable Ledger (FR-WLT-03 & FR-WLT-04) ── */}
      <ImmutableLedgerSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
