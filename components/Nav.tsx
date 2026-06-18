'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Calculator, TrendingUp } from 'lucide-react';
import { CATEGORIES, CALCULATORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const NAV_LINKS = CATEGORIES.map((cat) => ({
  label: cat.title,
  href: `/#${cat.id}`,
  icon: cat.icon,
}));

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span>FinCalc</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-2 gap-2">
            {CALCULATORS.map((calc) => (
              <Link
                key={calc.id}
                href={calc.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
              >
                <Calculator className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                <span className="truncate">{calc.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
