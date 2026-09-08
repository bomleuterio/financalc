import type { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/constants';

const BASE_URL = 'https://moneycalcs.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/invest`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/save`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/grow`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/about`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = CALCULATORS.map((calc) => ({
    url: `${BASE_URL}${calc.href}`,
    changeFrequency: 'monthly',
    priority: calc.popular ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
