import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ADSENSE_CLIENT } from '@/lib/adsense';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'FinCalc — Free Financial Calculators',
    template: '%s | FinCalc',
  },
  description:
    'Free, accurate financial calculators for loans, investments, savings, taxes, retirement, and budgeting.',
  keywords: [
    'financial calculator',
    'mortgage calculator',
    'loan calculator',
    'compound interest',
    'retirement calculator',
    'auto loan calculator',
    'credit card payoff calculator',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FinCalc — Free Financial Calculators',
    description:
      'Free, accurate financial calculators for loans, investments, savings, taxes, retirement, and budgeting.',
    type: 'website',
    siteName: 'FinCalc',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinCalc — Free Financial Calculators',
    description:
      'Free, accurate financial calculators for loans, investments, savings, taxes, retirement, and budgeting.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
        {!ADSENSE_CLIENT.includes('XXXXX') && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
