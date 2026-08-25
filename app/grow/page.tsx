'use client';

import { useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Handshake, Sparkles } from 'lucide-react';

export default function GrowPage() {
  useEffect(() => {
    document.title = 'Grow | MoneyCalcs.AI';
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-1">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="relative mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-1.5 text-primary bg-primary/15">
              <Sparkles className="h-3 w-3" />
              Coming soon
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Grow</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              An advisory directory is on its way — browse and connect with vetted financial advisors to help
              take your money further.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 pb-20">
          <Card>
            <CardHeader className="items-center text-center">
              <Handshake className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Advisory Directory</CardTitle>
              <CardDescription>
                Find and connect with vetted financial advisors near you — coming in a future update.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Check back soon, or explore what&apos;s live today on Save.</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
