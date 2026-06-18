'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CATEGORIES, CALCULATORS } from '@/lib/constants';
import { Search, ArrowRight, TrendingUp, Star } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return CALCULATORS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Star className="h-3 w-3 fill-primary text-primary" />
            100% Free — No signup required
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            Financial{' '}
            <span className="text-primary">Calculators</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Accurate, free tools for every financial decision — from buying a car to planning
            retirement.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-10 h-12 text-base"
              placeholder="Search calculators…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Search results */}
          {filtered && (
            <div className="mt-2 text-left max-w-lg mx-auto bg-card border rounded-lg shadow-lg overflow-hidden">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">No calculators found.</p>
              ) : (
                filtered.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    href={c.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                    onClick={() => setQuery('')}
                  >
                    <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <h2 className="text-2xl font-bold">Most Popular</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CALCULATORS.filter((c) => c.popular).map((calc) => (
              <Link key={calc.id} href={calc.href}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {calc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-end justify-between">
                    <CardDescription className="text-sm leading-snug">{calc.description}</CardDescription>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad — between popular section and category list */}
      <div className="flex justify-center py-4 px-4">
        <AdBanner format="leaderboard" />
      </div>

      {/* All calculators by category */}
      {CATEGORIES.map((cat) => (
        <section key={cat.id} id={cat.id} className="py-10 px-4 border-t border-border/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{cat.title} Calculators</h2>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {CALCULATORS.filter((c) => c.category === cat.id).map((calc) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors leading-snug">
                          {calc.title}
                        </CardTitle>
                        {calc.popular && (
                          <Badge variant="secondary" className="text-[10px] flex-shrink-0 h-5">
                            Popular
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-snug">{calc.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
