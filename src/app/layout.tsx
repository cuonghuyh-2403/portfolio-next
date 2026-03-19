import type { Metadata } from 'next';
import { Playfair_Display, Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cuong Huynh — Full-Stack Developer & Designer',
  description:
    'Portfolio của Cuong Huynh — Full-Stack Developer với tư duy design. Tôi xây dựng sản phẩm số từ concept đến launch.',
  openGraph: {
    title: 'Cuong Huynh — Full-Stack Developer & Designer',
    description: 'Portfolio của Cuong Huynh — Full-Stack Developer với tư duy design.',
    type: 'website',
  },
};

import SmoothScroll from '@/components/SmoothScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${inter.variable} ${spaceMono.variable}`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
