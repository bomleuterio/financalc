import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MoneyCalcs.AI with questions, feedback, or bug reports.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <StaticPage title="Contact" subtitle="Questions, feedback, or found a bug? We'd like to hear about it.">
      <p>
        The fastest way to reach us is by email:{' '}
        <a href="mailto:vic@triangleblvd.com">contact@moneycalcs.ai</a>
      </p>

      <h2>What to include</h2>
      <ul>
        <li>Which calculator you were using, if your question is about a specific tool</li>
        <li>What you entered and what result you expected, if you think a calculation is wrong</li>
        <li>Any calculator you&apos;d like to see added to the site</li>
      </ul>

      <h2>Response time</h2>
      <p>
        This site is independently run, so replies may take a few days. We read every message, even if we
        can&apos;t respond to all of them individually.
      </p>

      <p>
        For questions about how your data is handled, see the <a href="/privacy">Privacy Policy</a>.
      </p>
    </StaticPage>
  );
}
