'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Nav from './Nav';
import Footer from './Footer';
import AdBanner from './AdBanner';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  category: string;
  categoryHref?: string;
  children: React.ReactNode;
}

export default function CalculatorLayout({ title, description, category, categoryHref = '/', children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    const titleText = `${title} | MoneyCalcs.AI`;
    document.title = titleText;

    const setMeta = (name: string, value: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    const setProperty = (property: string, value: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    };

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://moneycalcs.ai${pathname}`);

    setMeta('description', description);
    setMeta('keywords', `${title.toLowerCase()}, financial calculator, ${category.toLowerCase()} calculator`);
    setProperty('og:title', titleText);
    setProperty('og:description', description);
    setProperty('og:type', 'website');
    setProperty('og:url', `https://moneycalcs.ai${pathname}`);
    setProperty('twitter:title', titleText);
    setProperty('twitter:description', description);
    setProperty('twitter:card', 'summary_large_image');
  }, [category, description, pathname, title]);

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: `https://moneycalcs.ai${pathname}`,
            inLanguage: 'en',
            publisher: {
              '@type': 'Organization',
              name: 'MoneyCalcs.AI',
            },
          }),
        }}
      />
      <Nav />
      <main className="flex-1">
        <div className="border-b border-border/50 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={categoryHref} className="hover:text-foreground transition-colors">{category}</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">{title}</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-muted-foreground text-lg max-w-2xl">{description}</p>
          </div>

          {/* Ad — leaderboard above calculator */}
          <div className="flex justify-center mb-8">
            <AdBanner format="leaderboard" />
          </div>

          {children}

          {/* Ad — responsive banner below calculator */}
          <div className="mt-10">
            <AdBanner format="responsive" />
          </div>
        </div>
      </main>

      {/* Ad — full-width strip before footer */}
      <div className="border-t border-border/30 py-4 flex justify-center px-4">
        <AdBanner format="leaderboard" />
      </div>

      <Footer />
    </div>
  );
}
