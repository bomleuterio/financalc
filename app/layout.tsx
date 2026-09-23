import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ADSENSE_CLIENT } from '@/lib/adsense';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

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
    default: 'MoneyCalcs.ai :: Free Money Calculator / Financial Calculator - accurate, free tools for every financial decision',
    template: '%s | MoneyCalcs.AI',
  },
  description:
    'Free, accurate financial calculators for loans, investments, savings, taxes, retirement, and budgeting.',
  icons: {
    icon: '/favicon.jpg',
  },
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
    title: 'MoneyCalcs.AI — Free Financial Calculators',
    description:
      'Free, accurate financial calculators for loans, investments, savings, taxes, retirement, and budgeting.',
    type: 'website',
    siteName: 'MoneyCalcs.AI',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoneyCalcs.AI — Free Financial Calculators',
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
        <Analytics />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
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
