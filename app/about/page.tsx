import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About MoneyCalcs.AI — free, accurate financial calculators for loans, investing, savings, taxes, and retirement.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <StaticPage title="About MoneyCalcs.AI" subtitle="Free, accurate financial calculators for everyday money decisions — a TriangleBLVD project.">
      <p>
        MoneyCalcs.AI is built and operated by TriangleBLVD. It is a collection of financial calculators covering loans, investing,
        savings, taxes, retirement, credit, and budgeting. The goal is simple: give people a fast, free, and
        accurate way to run the numbers on a financial decision without sign-ups, paywalls, or pages of
        fine print.
      </p>

      <h2>Who runs MoneyCalcs.AI</h2>
      <p>
        MoneyCalcs.AI is a TriangleBLVD project. TriangleBLVD designs, builds, and maintains every calculator
        and article on the site, and reviews the tax figures and worked examples whenever official limits
        change. Questions, corrections, and calculator requests go directly to the team through the{' '}
        <a href="/contact">Contact page</a>.
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

      <h2>Sources and how figures are kept current</h2>
      <p>
        Tax and contribution figures come from official sources and are updated when they change each year.
        As of the October 2026 review, the site uses:
      </p>
      <ul>
        <li>
          2026 federal income tax brackets, standard deductions, and long-term capital gains thresholds from IRS
          Revenue Procedure 2025-32.
        </li>
        <li>401(k) and IRA contribution limits for 2026 from IRS Notice 2025-67.</li>
        <li>The 2026 Social Security wage base ($184,500) from the Social Security Administration.</li>
      </ul>
      <p>
        Every worked example on the calculator pages and in the blog is recomputed from its stated inputs, and
        each example states its assumptions (rate, term, compounding) so you can reproduce it. If a number on
        this site doesn&apos;t match what you get, please report it on the <a href="/contact">Contact page</a> —
        corrections are made promptly.
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
