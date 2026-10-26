export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
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
    excerpt: 'Why the choice comes down to one question about your future tax rate, with a side-by-side example.',
    date: 'Oct 26, 2026',
  },
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
