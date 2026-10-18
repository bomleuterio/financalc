import type { Metadata } from 'next';
import { CALCULATORS } from '@/lib/constants';

export function calculatorMetadata(id: string): Metadata {
  const calc = CALCULATORS.find((c) => c.id === id);
  if (!calc) throw new Error(`Unknown calculator id: ${id}`);
  return {
    title: calc.title,
    description: calc.description,
    alternates: { canonical: calc.href },
    openGraph: { title: calc.title, description: calc.description, url: calc.href, type: 'website' },
    twitter: { card: 'summary_large_image', title: calc.title, description: calc.description },
  };
}
