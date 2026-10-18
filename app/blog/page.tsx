import Link from 'next/link';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Financial education articles, tips, and insights to help you make better money decisions.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndex() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Education</h1>
        <p className="mt-2 text-muted-foreground text-lg">
          Learn the fundamentals of personal finance through our in-depth guides and insights.
        </p>
      </div>

      <div className="grid gap-6">
        {BLOG_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{post.date}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
