import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketplaceDirectory } from '@/components/marketplace';
import { Footer } from '@/components/footer';
import {
  PARTNERS_DATA,
  getPartnerBySlug,
  getAllPartnerSlugs,
} from '@/components/marketplace/partnerData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPartnerSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: 'Mitra Daur Ulang Tidak Ditemukan | ELOVIA',
      description: 'Profil mitra daur ulang sirkular tidak ditemukan pada direktori ELOVIA.',
    };
  }

  return {
    title: `${partner.name} — Katalog Harga & Penyaluran Material | ELOVIA`,
    description: `${partner.tagline} Salurkan material terpilah ke ${partner.name} dengan harga transparan dan penjemputan terjadwal.`,
    openGraph: {
      title: `${partner.name} — Quick-View Detail Mitra | ELOVIA`,
      description: partner.tagline,
      images: [
        {
          url: partner.headerImage,
          width: 1200,
          height: 630,
          alt: partner.name,
        },
      ],
    },
  };
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen bg-[#F6FAF7]">
      {/* Interactive Marketplace Directory with Quick-View Partner Detail Drawer Gliding In */}
      <MarketplaceDirectory initialSlug={slug} />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

