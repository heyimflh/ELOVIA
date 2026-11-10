import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Daftar — ELOVIA | Mulai Perjalanan Hijau',
  description: 'Daftar sekarang dan ambil bagian dalam revolusi ekonomi sirkular ELOVIA.',
};

export default function DaftarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${playfair.variable} font-sans`}>
      {children}
    </div>
  );
}

