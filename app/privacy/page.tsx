import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for MoneyCalcs.AI, explaining what data is collected and how it is used.',
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'September 8, 2026';

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle={`Last updated: ${LAST_UPDATED}`}>
      <p>
        This policy explains what information MoneyCalcs.AI collects and how it is used. We aim to collect as
        little personal information as possible.
      </p>

      <h2>Calculator inputs</h2>
      <p>
        The numbers you enter into any calculator (loan amounts, interest rates, income, savings goals, etc.)
        are processed entirely in your browser. They are not transmitted to, or stored on, our servers.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand how visitors use the site (such as which pages are viewed and
        how long visitors stay). Google Analytics uses cookies and collects information such as your IP
        address, browser type, and device type. This data is aggregated and does not identify you personally.
        You can opt out of Google Analytics tracking using the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-out Browser Add-on
        </a>
        .
      </p>

      <h2>Advertising</h2>
      <p>
        This site displays advertising served by Google AdSense. Google and its partners may use cookies
        (including the DoubleClick cookie) to serve ads based on your prior visits to this site or other
        websites. You may opt out of personalized advertising by visiting{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits
        to this and other websites. For users in the EEA/UK, ad partners may rely on the{' '}
        <a href="https://www.cookiechoices.org" target="_blank" rel="noopener noreferrer">
          IAB Transparency &amp; Consent Framework
        </a>{' '}
        for consent management.
      </p>

      <h2>Cookies</h2>
      <p>
        Cookies set by this site or third parties (analytics and advertising) are used to remember preferences
        and measure site usage. You can disable cookies through your browser settings; doing so may affect how
        some parts of the site function.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal information
        from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this privacy policy from time to time. Changes will be posted on this page with an
        updated &quot;last updated&quot; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent via the <a href="/contact">Contact page</a>.
      </p>
    </StaticPage>
  );
}
