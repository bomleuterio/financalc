import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About MoneyCalcs.AI — free, accurate financial calculators for loans, investing, savings, taxes, and retirement.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <StaticPage title="About MoneyCalcs.AI" subtitle="Free, accurate financial calculators for everyday money decisions.">
      <p>
        MoneyCalcs.AI is an independently run collection of financial calculators covering loans, investing,
        savings, taxes, retirement, credit, and budgeting. The goal is simple: give people a fast, free, and
        accurate way to run the numbers on a financial decision without wading through ads, sign-ups, or
        pages of fine print.
      </p>

      <h2>Why this site exists</h2>
      <p>
        Most financial decisions — taking out a mortgage, paying off a credit card, deciding how much to put
        into a 401(k) — come down to arithmetic that&apos;s tedious to do by hand but easy for a computer.
        Each calculator on this site is built around the standard formulas used in personal finance (amortization
        schedules, compound interest, marginal tax brackets, and so on), so you can see not just the final
        number but how it was reached.
      </p>

      <h2>How the calculators are built</h2>
      <p>
        Every tool runs entirely in your browser — the numbers you enter are never sent to a server or stored
        anywhere. Calculations use widely published formulas (standard loan amortization, compound interest,
        IRS tax bracket tables, etc.), and each calculator page explains the method behind the numbers so you
        can verify the math yourself or adapt it to your own spreadsheet.
      </p>

      <h2>What this site is not</h2>
      <p>
        MoneyCalcs.AI is an educational tool, not financial, tax, or legal advice. The results are estimates
        based on the assumptions you enter — actual loan terms, tax liability, and investment returns depend on
        details a general calculator can&apos;t account for. Always confirm important decisions with a qualified
        financial advisor, accountant, or lender. See the <a href="/terms">Terms of Use</a> for details.
      </p>

      <h2>Questions or feedback</h2>
      <p>
        Found a bug, have a calculator request, or spotted an error in the math? Get in touch on the{' '}
        <a href="/contact">Contact page</a>.
      </p>
    </StaticPage>
  );
}
