import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const posts = [
  {
    slug: 'compound-interest-power',
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    excerpt: 'Discover how compound interest can turn small regular contributions into substantial wealth over time.',
    date: 'Oct 1, 2026',
  },
  {
    slug: 'understanding-amortization',
    title: 'Understanding Amortization: How Loans Really Work',
    excerpt: 'Uncover the truth about how loan payments are calculated and where your money goes each month.',
    date: 'Oct 2, 2026',
  },
  {
    slug: 'debt-payoff-strategies',
    title: 'Debt Payoff Strategies: Avalanche vs Snowball',
    excerpt: 'Learn which debt repayment strategy saves the most money and which motivates you most.',
    date: 'Oct 3, 2026',
  },
  {
    slug: 'emergency-fund-guide',
    title: 'Building an Emergency Fund: How Much Is Enough?',
    excerpt: 'Understand why an emergency fund is critical and exactly how much you should save.',
    date: 'Oct 4, 2026',
  },
  {
    slug: 'retirement-planning-101',
    title: 'Retirement Planning 101: How Much Do You Actually Need?',
    excerpt: 'Calculate your retirement number using the 4% rule and plan accordingly.',
    date: 'Oct 5, 2026',
  },
  {
    slug: 'tax-advantaged-accounts',
    title: 'Tax-Advantaged Accounts: 401k vs IRA vs Roth',
    excerpt: 'Compare the three most important retirement accounts and choose the right strategy for you.',
    date: 'Oct 6, 2026',
  },
  {
    slug: 'credit-card-debt-truth',
    title: 'The True Cost of Credit Card Debt: Why You Should Avoid It',
    excerpt: 'Explore how credit card debt compounds and why paying it off quickly saves thousands.',
    date: 'Oct 7, 2026',
  },
  {
    slug: 'wealth-building-boring-path',
    title: 'How to Build Wealth: The Boring Path to a Million Dollars',
    excerpt: 'Forget get-rich-quick schemes. Here is how ordinary people build extraordinary wealth.',
    date: 'Oct 8, 2026',
  },
];

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
        {posts.map((post) => (
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
