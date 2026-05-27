import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PageTransition } from '@/components/ui/page-transition';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Papyrus360 — Enterprise Software for Indian Paper Manufacturing',
    template: '%s — Papyrus360',
  },
  description:
    '24+ years in operation. Founded by domain experts with 35+ years of paper industry expertise. Products: BPApp ERP, Optrim deckle optimisation. Services: ERP implementation, process consulting, compliance.',
  metadataBase: new URL('https://papyrus360.com'),
  keywords: [
    'paper mill software',
    'paper industry ERP',
    'deckle matching software',
    'Indian paper manufacturing',
    'BPApp ERP',
    'Optrim deckle',
    'Netique Infotech Pvt Ltd.',
    'Papyrus360',
    'GST compliance paper industry',
  ],
  authors: [{ name: 'Netique Infotech Pvt Ltd.', url: 'https://papyrus360.com' }],
  creator: 'Netique Infotech Pvt Ltd.',
  publisher: 'Netique Infotech Pvt Ltd.',
  alternates: { canonical: '/' },
  category: 'Enterprise Software',
  openGraph: {
    type: 'website',
    siteName: 'Papyrus360',
    title: 'Papyrus360 — Enterprise Software for Indian Paper Manufacturing',
    description: '24+ years in operation. Founded by domain experts with 35+ years of paper industry expertise.',
    url: 'https://papyrus360.com',
    locale: 'en_IN',
    images: [
      {
        url: '/papyrus360.png',
        width: 1200,
        height: 630,
        alt: 'Papyrus360 — Enterprise Software for Indian Paper Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Papyrus360 — Enterprise Software for Indian Paper Manufacturing',
    description: '24+ years in operation. Founded by domain experts with 35+ years of paper industry expertise.',
    images: ['/papyrus360.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#F59E0B',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
