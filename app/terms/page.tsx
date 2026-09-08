import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for MoneyCalcs.AI, an independently operated financial calculator website.',
  alternates: { canonical: '/terms' },
};

const LAST_UPDATED = 'September 8, 2026';

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use" subtitle={`Last updated: ${LAST_UPDATED}`}>
      <p>
        These terms govern your use of MoneyCalcs.AI (&quot;the site&quot;). By using the site, you agree to
        the terms below. If you don&apos;t agree, please don&apos;t use the site.
      </p>

      <h2>Educational use only</h2>
      <p>
        All calculators, results, charts, and schedules on this site are provided for general educational and
        informational purposes only. Nothing on this site constitutes financial, investment, tax, legal, or
        accounting advice. Calculations are estimates based on the values and assumptions you enter — they may
        not reflect the actual terms offered by a lender, actual tax liability, or actual investment
        performance.
      </p>

      <h2>No guarantee of accuracy</h2>
      <p>
        We make a reasonable effort to keep the underlying formulas and tax figures (such as tax brackets)
        accurate and up to date, but we do not warrant that any calculation is complete, current, or error-free.
        Use of any result is at your own risk. Always verify important figures with a bank, lender, tax
        professional, or financial advisor before making a decision.
      </p>

      <h2>No liability</h2>
      <p>
        To the fullest extent permitted by law, MoneyCalcs.AI and its operator are not liable for any loss or
        damage arising from your use of, or reliance on, the calculators or content on this site.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        This site may display third-party advertising (including through Google AdSense) and may link to
        third-party websites. We are not responsible for the content, accuracy, or practices of any third-party
        site or advertiser.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The design, code, and written content of this site are owned by MoneyCalcs.AI unless otherwise noted.
        You may use the calculators for personal, non-commercial purposes. You may not copy, scrape, or
        republish the site&apos;s content or tools without permission.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes are posted means
        you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent via the <a href="/contact">Contact page</a>.
      </p>
    </StaticPage>
  );
}
