export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
}

// Newest first. Posts merged into others are redirected in next.config.ts.
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: 'how-compound-growth-builds-wealth',
    title: 'How Compound Growth Builds Wealth: Time, Rate, Fees, and Savings Rate',
    excerpt: 'The four levers you control, each with a worked number — including what a 1% fee costs over 30 years.',
    date: 'Nov 3, 2026',
  },
  {
    slug: 'credit-card-debt-payoff-guide',
    title: 'How to Pay Off Credit Card Debt: Avalanche vs. Snowball, With the Math',
    excerpt: 'The minimum-payment trap, both payoff methods run on the same three debts, and when a balance transfer helps.',
    date: 'Nov 3, 2026',
  },
  {
    slug: 'mortgage-15-vs-30-year',
    title: '15-Year vs. 30-Year Mortgage: What the Numbers Actually Say',
    excerpt: 'A full worked example comparing payments, interest, and the invest-the-difference strategy at three rates of return.',
    date: 'Oct 26, 2026',
  },
  {
    slug: 'how-tax-brackets-work-2026',
    title: 'How Tax Brackets Really Work: 2026 Federal Income Tax, With Examples',
    excerpt: 'The 2026 brackets for single, joint, and head-of-household filers, four worked examples, and why a raise never lowers your take-home pay.',
    date: 'Oct 26, 2026',
  },
  {
    slug: 'pay-off-debt-or-invest',
    title: 'Pay Off Debt or Invest? A Decision Framework With Real Numbers',
    excerpt: 'An order of operations for extra cash, with worked credit card and car loan examples.',
    date: 'Oct 26, 2026',
  },
  {
    slug: 'roth-vs-traditional-401k',
    title: 'Roth vs. Traditional 401(k): How to Choose in 2026',
    excerpt: 'Why the choice comes down to one question about your future tax rate, plus where IRAs fit in your savings order.',
    date: 'Oct 26, 2026',
    updated: 'Nov 3, 2026',
  },
  {
    slug: 'retirement-planning-101',
    title: 'Retirement Planning 101: How Much Do You Actually Need?',
    excerpt: 'The 4% rule, how Social Security changes your target, and the monthly savings needed when you start at 25, 35, or 45.',
    date: 'Oct 5, 2026',
    updated: 'Nov 3, 2026',
  },
  {
    slug: 'emergency-fund-guide',
    title: 'Building an Emergency Fund: How Much Is Enough?',
    excerpt: 'Size your fund from essential expenses, see what it costs not to have one, and build it in stages.',
    date: 'Oct 4, 2026',
    updated: 'Nov 3, 2026',
  },
  {
    slug: 'understanding-amortization',
    title: 'Understanding Amortization: Where Every Loan Payment Goes',
    excerpt: 'Month-by-month mortgage math, and why a $10,000 extra payment saves six times more in year 1 than in year 20.',
    date: 'Oct 2, 2026',
    updated: 'Nov 3, 2026',
  },
];
