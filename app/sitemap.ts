import type { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/constants';
import { BLOG_POSTS } from '@/lib/blog';

const BASE_URL = 'https://moneycalcs.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
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

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...calculatorRoutes, ...blogRoutes];
}
