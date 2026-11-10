import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Masuk — ELOVIA | Platform Ekonomi Sirkular',
  description: 'Masuk ke akun ELOVIA Anda untuk melanjutkan perjalanan menuju bumi yang lebih hijau.',
};

export default function MasukLayout({
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
