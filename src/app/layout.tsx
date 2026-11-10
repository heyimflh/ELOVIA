import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'ELOVIA — Circular Economy Platform | Your waste has another worth.',
  description:
    'Discover value in discarded materials. Turn better waste habits into real opportunities with ELOVIA.',
  icons: {
    icon: '/logo/Minimalist Green Leaf Emblem.png',
    shortcut: '/logo/Minimalist Green Leaf Emblem.png',
    apple: '/logo/Minimalist Green Leaf Emblem.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo/Minimalist Green Leaf Emblem.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Inter+Tight:ital,wght@0,300..900;1,300..900&family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#0F1F17] antialiased selection:bg-[#E8F4EC] selection:text-[#177A47] font-jakarta">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
