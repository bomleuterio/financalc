import { notFound } from 'next/navigation';

const posts: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  'compound-interest-power': {
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    date: 'Oct 1, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Albert Einstein supposedly called compound interest "the eighth wonder of the world." While that quote's authenticity is debated, the concept's power is absolutely real. Compound interest is what transforms small regular contributions into substantial wealth over decades.
        </p>

        <h2 className="text-xl font-semibold mt-6">What Is Compound Interest?</h2>
        <p>
          Compound interest is earning returns not just on your initial investment, but on your previous returns too. In other words, your interest earns interest. This creates exponential growth, not linear growth.
        </p>
        <p>
          The formula is: A = P(1 + r)^n, where A is the final amount, P is principal, r is the rate, and n is time periods. The longer you invest, the more powerful the exponent becomes.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Time Advantage</h2>
        <p>
          Consider two investors: Alice starts at age 25 and invests $500/month for 10 years, then stops (total $60,000 invested). Bob waits until age 35, then invests $500/month for 30 years (total $180,000 invested). Assuming 7% annual returns:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Alice's balance at 65: ~$876,000</li>
          <li>Bob's balance at 65: ~$851,000</li>
        </ul>
        <p>
          Alice invested $120,000 less but ends up with MORE because she started 10 years earlier. Those early years of compounding are invaluable.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Rate Matters Too</h2>
        <p>
          A seemingly small difference in returns compounds into massive differences over time. The difference between 6% and 8% returns on $10,000 for 30 years:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>6% returns: $57,435</li>
          <li>8% returns: $100,627</li>
        </ul>
        <p>
          That 2% difference results in $43,000 more in your account. This is why choosing low-cost index funds (which average ~10% historically) beats high-fee actively managed funds (which average ~7-8% after fees).
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Start investing as early as possible, even if it's just $100/month. Time in market beats timing the market. The sooner your money starts compounding, the less you need to contribute to reach your financial goals.
        </p>
      </div>
    ),
  },
  'understanding-amortization': {
    title: 'Understanding Amortization: How Loans Really Work',
    date: 'Oct 2, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Most people don't understand where their monthly mortgage or car payment actually goes. They assume each payment chips away equally at the principal. In reality, amortization means most of your early payments go to interest, not principal.
        </p>

        <h2 className="text-xl font-semibold mt-6">How Amortization Works</h2>
        <p>
          An amortization schedule breaks down each monthly payment into two parts: principal (what reduces your debt) and interest (what the lender keeps). The split changes every month—early payments are mostly interest, later payments are mostly principal.
        </p>
        <p>
          For a $300,000 mortgage at 7% over 30 years, your payment is $1,996/month. But in month 1:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Interest: $1,750</li>
          <li>Principal: $246</li>
        </ul>
        <p>
          You're paying $1,750 (87.7%) to the bank just for borrowing money! In month 360 (the last payment):
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Interest: $10</li>
          <li>Principal: $1,986</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Why Early Extra Payments Matter</h2>
        <p>
          If you pay an extra $100/month on your mortgage, it goes entirely to principal (reducing future interest). This can cut years off your loan and save $100,000+ in interest over 30 years.
        </p>
        <p>
          Early payments on principal compound over time—they reduce the balance that future interest is calculated on, which reduces future interest charges, which lets more of future payments go to principal. It creates a snowball effect in reverse.
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          If you can afford it, make extra principal payments early in your loan. A $100 extra payment in year 1 saves more than a $100 payment in year 25. Check your loan documents to ensure extra payments aren't penalized, then use our calculators to model how much you'll save.
        </p>
      </div>
    ),
  },
  'debt-payoff-strategies': {
    title: 'Debt Payoff Strategies: Avalanche vs Snowball',
    date: 'Oct 3, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          If you have multiple debts, the order you pay them off matters. The two most popular strategies—avalanche and snowball—take opposite approaches, and which one you choose depends on your personality, not just the math.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Debt Avalanche</h2>
        <p>
          Pay off debts in order of interest rate, highest first. If you have a credit card at 20% APR, a personal loan at 10%, and a car loan at 5%, attack the credit card first while making minimum payments on the others.
        </p>
        <p>
          Why? Interest compounds. Every month on that 20% card, you're losing more money to interest than on the 5% car loan. By targeting the highest rate, you minimize total interest paid.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Debt Snowball</h2>
        <p>
          Pay off debts in order of balance, smallest first. If you have debts of $5k, $15k, and $25k, pay off the $5k first, even if it has the lowest interest rate.
        </p>
        <p>
          Why? Psychology. Paying off the smallest debt quickly gives you a psychological win. You see progress, you get motivated, and you're more likely to stay consistent through the entire payoff journey.
        </p>

        <h2 className="text-xl font-semibold mt-6">Which Is Better?</h2>
        <p>
          Mathematically, the avalanche wins. It saves more money and gets you debt-free faster. But psychologically, the snowball often wins. If you'd abandon the plan halfway through because you see no progress, the $500 extra you'd pay in interest pales in comparison to staying debt-free for another 3 years.
        </p>
        <p>
          The best strategy is the one you'll actually stick with. If you're highly motivated and can handle delayed gratification, use the avalanche. If you need early wins to stay motivated, use the snowball.
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Choose a strategy and commit to it. The difference between success and failure isn't often the strategy—it's consistency. Pick whichever approach you're most likely to follow for the next 3-5 years.
        </p>
      </div>
    ),
  },
  'emergency-fund-guide': {
    title: 'Building an Emergency Fund: How Much Is Enough?',
    date: 'Oct 4, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Life happens. Your car breaks down, you get sick, you lose your job. Without an emergency fund, these events force you into high-interest debt. With one, you have options. The question is: how much is enough?
        </p>

        <h2 className="text-xl font-semibold mt-6">The Standard: 3-6 Months of Expenses</h2>
        <p>
          Financial experts recommend 3–6 months of living expenses in an easily accessible account. If your monthly expenses are $4,000:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Conservative minimum: 3 months = $12,000</li>
          <li>Standard recommendation: 6 months = $24,000</li>
          <li>High-earner/unstable income: 9–12 months = $36,000–$48,000</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Why the Range?</h2>
        <p>
          It depends on your situation. If you have stable employment, dual income, and a strong professional network, 3 months might suffice. If you're self-employed, have health concerns, or work in a volatile industry, 12 months is safer.
        </p>
        <p>
          The goal is to cover your runway if you lose income. With 6 months saved and $4,000/month expenses, you have 6 months to find a new job or solve the problem.
        </p>

        <h2 className="text-xl font-semibold mt-6">Where to Keep It</h2>
        <p>
          Your emergency fund needs to be liquid (quickly accessible) and safe. High-yield savings accounts (4–5% APY) are ideal. You earn some interest while staying liquid. Avoid investing it in stocks—a market crash right when you need the money is a disaster.
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Start small—even $1,000 prevents most emergencies from becoming crises. Build to 1 month, then 3 months, then 6 months. Once you have this cushion, you can start investing aggressively for retirement. An emergency fund is your financial foundation.
        </p>
      </div>
    ),
  },
  'retirement-planning-101': {
    title: 'Retirement Planning 101: How Much Do You Actually Need?',
    date: 'Oct 5, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Retirement planning seems overwhelming. How much do you need? When can you retire? How do you know you've saved enough? The answer is simpler than you think: the 4% rule.
        </p>

        <h2 className="text-xl font-semibold mt-6">The 4% Rule</h2>
        <p>
          Research shows that if you withdraw 4% of your portfolio in year 1 of retirement, then adjust that amount for inflation each year, your money will last 30+ years with 95% confidence.
        </p>
        <p>
          In other words: Needed Savings = Annual Expenses / 0.04
        </p>
        <p>
          If you need $80,000/year in retirement, you need $2 million saved. If you need $50,000/year, you need $1.25 million.
        </p>

        <h2 className="text-xl font-semibold mt-6">Account for Inflation</h2>
        <p>
          $80,000/year today might be $150,000/year in 30 years due to 3% average inflation. Your retirement number should account for this. Our retirement calculator handles this automatically—just enter your current annual need and desired retirement age.
        </p>

        <h2 className="text-xl font-semibold mt-6">Include Social Security</h2>
        <p>
          Social Security covers part of retirement (average ~$1,900/month or $22,800/year). Subtract this from your annual needs, then calculate your required savings on the gap:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Annual need: $80,000</li>
          <li>Social Security: $25,000</li>
          <li>Gap to cover: $55,000</li>
          <li>Needed savings: $55,000 / 0.04 = $1.375 million</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Use the 4% rule to calculate your number, subtract Social Security, then work backward to figure out how much to save monthly. Start early—compound growth does most of the heavy lifting. A 25-year-old needs to save much less monthly than a 45-year-old targeting the same retirement number.
        </p>
      </div>
    ),
  },
  'tax-advantaged-accounts': {
    title: 'Tax-Advantaged Accounts: 401k vs IRA vs Roth',
    date: 'Oct 6, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          The most powerful retirement tool isn't secret—it's tax-advantaged accounts. By letting your money grow without annual taxes, you can accumulate 2-3x more wealth than in a regular taxable account. But which account should you prioritize: 401k, Traditional IRA, or Roth IRA?
        </p>

        <h2 className="text-xl font-semibold mt-6">The 401k (Employer-Sponsored)</h2>
        <p>
          Offered by employers, a 401k lets you contribute pre-tax money (reduces your taxable income), and your employer often matches part of it (free money). Max contribution in 2024: $23,500/year.
        </p>
        <p>
          Key: Get the full employer match. If your employer matches 3% and you don't contribute at least 3%, you're leaving free money on the table.
        </p>

        <h2 className="text-xl font-semibold mt-6">Traditional IRA</h2>
        <p>
          You can open one independently. Contributions may be tax-deductible (depending on income and workplace plan). Max contribution: $7,000/year (2024).
        </p>
        <p>
          You pay taxes on withdrawals in retirement. Good if you expect to be in a lower tax bracket in retirement.
        </p>

        <h2 className="text-xl font-semibold mt-6">Roth IRA</h2>
        <p>
          You contribute after-tax money (no immediate deduction), but withdrawals in retirement are completely tax-free. Max contribution: $7,000/year (2024).
        </p>
        <p>
          Good if you expect higher taxes in retirement (likely for young people). Your money grows tax-free for 30+ years—that's incredibly powerful.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Priority Order</h2>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>401k up to employer match (free 25-100% return)</li>
          <li>Max Roth IRA ($7,000/year)</li>
          <li>Max 401k if income remains ($16,500 more)</li>
          <li>Taxable brokerage account (after maxing tax-advantaged)</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Tax-advantaged accounts are your fastest path to wealth. The difference between maxing them out vs. skipping them is $500k+ over 30 years, just from tax savings alone.
        </p>
      </div>
    ),
  },
  'credit-card-debt-truth': {
    title: 'The True Cost of Credit Card Debt: Why You Should Avoid It',
    date: 'Oct 7, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Credit card debt is a wealth killer. At 18-25% APR, credit card interest compounds faster than almost any investment compounds. A $5,000 balance left unpaid grows exponentially. Here's the brutal math.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Minimum Payment Trap</h2>
        <p>
          Credit card companies are happy if you pay only the minimum (usually 2-3% of balance). Why? Because you'll be paying for years, and they'll earn thousands in interest.
        </p>
        <p>
          A $5,000 balance at 20% APR with a 2% minimum payment:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Monthly payment: ~$100</li>
          <li>Months to pay off: 73 months (6+ years)</li>
          <li>Total interest paid: $2,300</li>
          <li>Total amount paid: $7,300</li>
        </ul>
        <p>
          You're paying 46% MORE than you borrowed, just in interest.
        </p>

        <h2 className="text-xl font-semibold mt-6">Aggressive Payoff vs. Investment</h2>
        <p>
          If you have $5,000 credit card debt and $5,000 to invest, paying off the debt always wins. Even if the stock market returns 10%, and the credit card charges 20%, the gap is so wide that paying off the debt is guaranteed to outperform investing.
        </p>
        <p>
          Think of credit card debt as a guaranteed -20% return. Beating that requires aggressive investing, which carries risk. Eliminating the debt is a no-brainer.
        </p>

        <h2 className="text-xl font-semibold mt-6">Prevention is Key</h2>
        <p>
          Don't carry a balance. If you can't pay off the full balance monthly, you can't afford what you're buying. Period. Use a debit card or cash to force discipline.
        </p>
        <p>
          If you already have credit card debt, aggressively pay it off. Even $100/month extra on the above example cuts the payoff time in half and saves $1,000+ in interest.
        </p>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Credit card debt is the enemy of wealth. Prioritize paying it off before investing. Use our credit card payoff calculator to see how quickly you can become debt-free, then redirect that payment to savings/investing.
        </p>
      </div>
    ),
  },
  'wealth-building-boring-path': {
    title: 'How to Build Wealth: The Boring Path to a Million Dollars',
    date: 'Oct 8, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Boring wealth-building beats exciting get-rich-quick schemes every time. Boring is reliable. Boring compounds. Boring makes millionaires.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Formula</h2>
        <p>
          Earn more than you spend. Invest the difference. Repeat for 30+ years. That's it. That's the whole secret.
        </p>
        <p>
          If you earn $60k/year and spend $50k, you save $10k/year (16.7% savings rate). Invested at 7% returns for 35 years, that becomes ~$1.6 million.
        </p>
        <p>
          If you increase your savings rate to 25% ($15k/year), that becomes ~$2.4 million. Better income or lower expenses both work.
        </p>

        <h2 className="text-xl font-semibold mt-6">It's Mostly About Savings Rate</h2>
        <p>
          Your savings rate matters far more than returns. Someone earning $50k who saves 30% will build more wealth than someone earning $100k who saves 5%, because compound interest rewards consistency, not luck.
        </p>
        <p>
          The math: 30% of $50k = $15k/year. 5% of $100k = $5k/year. After 30 years at 7% returns, the first person has $1.8M, the second has $600k.
        </p>

        <h2 className="text-xl font-semibold mt-6">The Boring Path</h2>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Stabilize income (get a job you can stay at for years)</li>
          <li>Build emergency fund (6 months expenses)</li>
          <li>Max tax-advantaged accounts (401k, IRA, Roth)</li>
          <li>Invest the remainder in low-cost index funds</li>
          <li>Raise income 2-3% annually via promotions/raises</li>
          <li>Keep expenses flat while income grows</li>
          <li>Repeat for 30+ years</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">Practical Takeaway</h2>
        <p>
          Boring beats flashy. Compound interest rewards boring. You don't need to beat the market, day-trade, or find the "next big thing." Save consistently, invest in index funds, and let time do the work. Millions of ordinary people have become millionaires this way. You can too.
        </p>
      </div>
    ),
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-muted-foreground">{post.date}</p>
      </div>
      <div className="prose-like">{post.content}</div>
      <div className="pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          Want to calculate your own scenario? Check out our{' '}
          <a href="/calculators" className="text-primary underline">
            financial calculators
          </a>
          .
        </p>
      </div>
    </div>
  );
}
