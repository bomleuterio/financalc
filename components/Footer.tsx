import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CALCULATORS } from '@/lib/constants';
import logo from '@/lib/logo.jpg';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-3">
              <Image src={logo} alt="MoneyCalcs.AI" className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free, accurate financial calculators for every decision — from loans to retirement.
            </p>
          </div>

          {/* Category columns */}
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div key={cat.id}>
              <h3 className="font-semibold text-sm mb-3">
                {cat.icon} {cat.title}
              </h3>
              <ul className="space-y-2">
                {CALCULATORS.filter((c) => c.category === cat.id).map((calc) => (
                  <li key={calc.id}>
                    <Link
                      href={calc.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {calc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MoneyCalcs.AI. All calculations are for educational purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            Results may not reflect exact lender terms. Always consult a financial advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}
