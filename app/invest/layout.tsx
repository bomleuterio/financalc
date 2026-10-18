import type { Metadata } from 'next';

// Placeholder section — keep it out of search until it has real content.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
