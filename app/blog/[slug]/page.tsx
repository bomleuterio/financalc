import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog';
import { IN_DEPTH_POSTS } from './in-depth-articles';

const posts = IN_DEPTH_POSTS;

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = BLOG_POSTS.find((post) => post.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: meta.title, description: meta.excerpt, type: 'article', url: `/blog/${slug}` },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  const meta = BLOG_POSTS.find((p) => p.slug === slug);
  const published = new Date(post.date).toISOString().slice(0, 10);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: meta?.excerpt,
    datePublished: published,
    dateModified: meta?.updated ? new Date(meta.updated).toISOString().slice(0, 10) : published,
    author: { '@type': 'Organization', name: 'TriangleBLVD', url: 'https://moneycalcs.ai/about' },
    publisher: { '@type': 'Organization', name: 'TriangleBLVD', url: 'https://moneycalcs.ai/about' },
    mainEntityOfPage: `https://moneycalcs.ai/blog/${slug}`,
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-muted-foreground">
          By <Link href="/about" className="underline underline-offset-2">TriangleBLVD</Link> · {post.date}
          {meta?.updated && <> · Updated {meta.updated}</>}
        </p>
      </div>
      <div className="prose-like">{post.content}</div>
      <div className="pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Want to calculate your own scenario? Check out our{' '}
          <Link href="/" className="text-primary underline">
            financial calculators
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
