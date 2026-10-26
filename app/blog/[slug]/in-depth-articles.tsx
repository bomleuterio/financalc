import Link from 'next/link';

// Long-form articles. Every figure was computed with the functions in lib/calculators.ts;
// keep the stated assumptions next to each number so readers can reproduce it.

function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border/60">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 tabular-nums">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const h2 = 'text-xl font-semibold mt-8';
const list = 'list-disc list-inside space-y-1 ml-2';
const link = 'text-primary underline';

export const IN_DEPTH_POSTS: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  'mortgage-15-vs-30-year': {
    title: '15-Year vs. 30-Year Mortgage: What the Numbers Actually Say',
    date: 'Oct 26, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          The usual advice about mortgage terms comes in two flavors. One camp says a 15-year loan is a no-brainer
          because you pay a fraction of the interest. The other says a 30-year loan is smarter because you can invest
          the lower payment and come out ahead. Both are right under some assumptions and wrong under others. This
          article walks through one realistic example in full so you can see exactly where the answer flips.
        </p>

        <h2 className={h2}>The example</h2>
        <p>
          A buyer borrows <strong>$320,000</strong>. Lenders usually price 15-year loans lower than 30-year loans,
          so we use <strong>6.5%</strong> for the 30-year and <strong>5.75%</strong> for the 15-year. These are
          illustrative rates, not a quote — plug in your own in the{' '}
          <Link href="/calculators/mortgage" className={link}>mortgage calculator</Link>. Figures cover principal
          and interest only; property tax and insurance are the same under either loan.
        </p>
        <DataTable
          head={['', '30-year @ 6.5%', '15-year @ 5.75%']}
          rows={[
            ['Monthly payment', '$2,023', '$2,657'],
            ['Total interest', '$408,142', '$158,316'],
            ['Balance after 5 years', '$299,555', '$242,082'],
            ['Balance after 10 years', '$271,284', '$138,281'],
          ]}
        />
        <p>
          The 15-year payment is <strong>$635 a month higher</strong>, and it saves just under{' '}
          <strong>$250,000 in interest</strong>. After ten years the 30-year borrower has paid down about $49,000 of
          principal; the 15-year borrower has paid down about $182,000.
        </p>

        <h2 className={h2}>How much of the saving is the rate, and how much is the term?</h2>
        <p>
          It helps to separate the two effects. At the same 6.5% rate, a 15-year loan would cost $2,788 a month and
          $181,758 in total interest. So shortening the term alone saves about $226,000, and the lower rate that
          usually comes with a shorter term saves a further $23,000 or so. The term does most of the work: you
          simply borrow the money for half as long.
        </p>

        <h2 className={h2}>The &quot;invest the difference&quot; argument, tested</h2>
        <p>
          The case for the 30-year loan is that the $635 a month you don&apos;t send to the lender can go into
          investments instead. To compare fairly, both households need to spend the same amount every month for 30
          years:
        </p>
        <ul className={list}>
          <li>The <strong>30-year household</strong> pays $2,023 to the lender and invests $635 every month for 30 years.</li>
          <li>The <strong>15-year household</strong> pays $2,657 for 15 years, then invests the full $2,657 every month for the next 15 years.</li>
        </ul>
        <p>Both own the house outright at year 30. Here is what each has invested by then, at three average annual returns (monthly compounding):</p>
        <DataTable
          head={['Average return', '30-year household', '15-year household', 'Ahead']}
          rows={[
            ['4%', '$440,509', '$653,939', '15-year by $213,000'],
            ['6%', '$637,560', '$772,796', '15-year by $135,000'],
            ['8%', '$945,923', '$919,532', '30-year by $26,000'],
          ]}
        />
        <p>
          The 30-year strategy only pulls ahead when investments earn meaningfully more than the mortgage rate —
          here, around 8% a year on average, every year, for 30 years. At 6% the 15-year household is well ahead.
          That is because paying down a 5.75% loan is a guaranteed 5.75% return, while market returns are an
          average that comes with years of losses.
        </p>
        <p>The table also leaves out three things, and they mostly cut against the 30-year plan:</p>
        <ul className={list}>
          <li><strong>Behavior.</strong> The model assumes the $635 is invested every single month for 30 years. In practice, much of it tends to get spent.</li>
          <li><strong>Taxes on investment gains.</strong> Money in a taxable brokerage account pays tax on dividends and gains; the interest you avoid on a mortgage is tax-free.</li>
          <li><strong>The mortgage interest deduction.</strong> This works in the 30-year loan&apos;s favor, but only if you itemize. With the 2026 standard deduction at $32,200 for married couples, many households won&apos;t.</li>
        </ul>

        <h2 className={h2}>When the 30-year loan is still the better choice</h2>
        <p>
          The math above is about maximizing wealth. Real decisions also involve risk, and the lower required
          payment is a form of insurance. A 30-year loan makes sense when:
        </p>
        <ul className={list}>
          <li>The 15-year payment would leave you without a solid emergency fund. Use the <Link href="/calculators/emergency-fund" className={link}>emergency fund calculator</Link> to size one.</li>
          <li>You aren&apos;t yet capturing your full employer 401(k) match — that is an instant 50–100% return no mortgage can match.</li>
          <li>You carry higher-interest debt such as credit cards or a car loan.</li>
          <li>Your income is variable, so you value the option to pay less in a bad year.</li>
        </ul>
        <p>
          There is also a middle path: take the 30-year loan and voluntarily pay it as if it were shorter. You
          lose the lower 15-year rate, but you keep the flexibility to drop back to the required payment if
          money gets tight.
        </p>

        <h2 className={h2}>The bottom line</h2>
        <p>
          If you can comfortably afford the higher payment after funding emergency savings and your employer
          match, the 15-year loan usually leaves you wealthier and is far less dependent on market luck. If the
          higher payment would stretch you, the 30-year loan&apos;s flexibility is worth paying for. Run your own
          numbers in the <Link href="/calculators/mortgage" className={link}>mortgage calculator</Link> and compare
          the amortization schedules side by side.
        </p>
      </div>
    ),
  },

  'how-tax-brackets-work-2026': {
    title: 'How Tax Brackets Really Work: 2026 Federal Income Tax, With Examples',
    date: 'Oct 26, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          &quot;I turned down the raise because it would put me in a higher tax bracket.&quot; It is one of the
          most common money mistakes, and it comes from misunderstanding how U.S. brackets work. This guide uses the
          official 2026 figures (IRS Revenue Procedure 2025-32) and four worked examples to show what you actually
          owe.
        </p>

        <h2 className={h2}>The 2026 brackets</h2>
        <DataTable
          head={['Rate', 'Single', 'Married filing jointly', 'Head of household']}
          rows={[
            ['10%', '$0 – $12,400', '$0 – $24,800', '$0 – $17,700'],
            ['12%', '$12,400 – $50,400', '$24,800 – $100,800', '$17,700 – $67,450'],
            ['22%', '$50,400 – $105,700', '$100,800 – $211,400', '$67,450 – $105,700'],
            ['24%', '$105,700 – $201,775', '$211,400 – $403,550', '$105,700 – $201,750'],
            ['32%', '$201,775 – $256,225', '$403,550 – $512,450', '$201,750 – $256,200'],
            ['35%', '$256,225 – $640,600', '$512,450 – $768,700', '$256,200 – $640,600'],
            ['37%', 'Over $640,600', 'Over $768,700', 'Over $640,600'],
          ]}
        />
        <p>
          These ranges apply to <strong>taxable income</strong> — what is left after deductions. The 2026 standard
          deduction is <strong>$16,100</strong> for single filers, <strong>$32,200</strong> for married couples filing
          jointly, and <strong>$24,150</strong> for heads of household.
        </p>

        <h2 className={h2}>The key idea: each rate applies only to its own slice</h2>
        <p>
          Your income fills the brackets from the bottom up, like pouring water into a stack of glasses. The first
          $12,400 of a single filer&apos;s taxable income is taxed at 10%, no matter how much they earn in total. Only
          the dollars that spill over into the next glass are taxed at 12%, and so on. Moving into a higher bracket
          never raises the tax on the dollars below it.
        </p>

        <h2 className={h2}>Example 1: single, $50,000 salary</h2>
        <ul className={list}>
          <li>Taxable income: $50,000 − $16,100 = <strong>$33,900</strong></li>
          <li>10% on the first $12,400 = $1,240</li>
          <li>12% on the next $21,500 = $2,580</li>
          <li><strong>Federal income tax: $3,820</strong> — an effective rate of 7.6% of salary, even though the top bracket reached is 12%.</li>
        </ul>

        <h2 className={h2}>Example 2: single, $100,000 salary</h2>
        <ul className={list}>
          <li>Taxable income: <strong>$83,900</strong></li>
          <li>10% on $12,400 = $1,240</li>
          <li>12% on $38,000 = $4,560</li>
          <li>22% on $33,500 = $7,370</li>
          <li><strong>Federal income tax: $13,170</strong> — effective rate 13.2%, marginal rate 22%.</li>
        </ul>

        <h2 className={h2}>Example 3: married filing jointly, $150,000</h2>
        <ul className={list}>
          <li>Taxable income: $150,000 − $32,200 = <strong>$117,800</strong></li>
          <li>10% on $24,800 = $2,480; 12% on $76,000 = $9,120; 22% on $17,000 = $3,740</li>
          <li><strong>Federal income tax: $15,340</strong> — effective rate 10.2%.</li>
        </ul>

        <h2 className={h2}>Example 4: head of household, $60,000</h2>
        <ul className={list}>
          <li>Taxable income: $60,000 − $24,150 = <strong>$35,850</strong></li>
          <li>10% on $17,700 = $1,770; 12% on $18,150 = $2,178</li>
          <li><strong>Federal income tax: $3,948</strong> — effective rate 6.6%. The wider head-of-household brackets and larger deduction make a real difference compared with filing single.</li>
        </ul>

        <h2 className={h2}>The raise myth, settled</h2>
        <p>
          Take a single filer earning $66,000 who gets a $1,000 raise to $67,000. Their taxable income crosses the
          $50,400 line into the 22% bracket. Federal tax goes from $5,740 to $5,910 — an extra{' '}
          <strong>$170</strong>. Half of the raise is taxed at 12% and half at 22%. They keep $830 of the $1,000
          before payroll taxes. There is no point in the federal brackets where earning more leaves you with less.
        </p>
        <p className="text-muted-foreground">
          (Some means-tested benefits and credits do phase out as income rises, which can create high effective
          marginal rates in narrow ranges. That is a feature of those programs, not of the brackets themselves.)
        </p>

        <h2 className={h2}>Marginal vs. effective rate: which one to use</h2>
        <ul className={list}>
          <li><strong>Effective rate</strong> (total tax ÷ income) tells you your overall tax burden. Use it for budgeting.</li>
          <li><strong>Marginal rate</strong> (the rate on your next dollar) tells you what a change is worth. Use it for decisions about extra income or deductions.</li>
        </ul>
        <p>
          For example, the $100,000 earner in Example 2 who puts <strong>$10,000</strong> into a traditional 401(k)
          cuts their federal income tax by <strong>$2,200</strong> — exactly 22% of the contribution, because every
          one of those dollars would otherwise have been taxed at their 22% marginal rate.
        </p>

        <h2 className={h2}>Don&apos;t forget payroll taxes</h2>
        <p>
          Income tax isn&apos;t the only tax on wages. Employees also pay 6.2% Social Security tax on wages up to
          $184,500 in 2026, plus 1.45% Medicare tax on all wages, plus an extra 0.9% Medicare tax on wages above
          $200,000 (single) or $250,000 (married filing jointly). On a $100,000 salary that is $7,650 — more than
          half as much as the federal income tax.
        </p>

        <h2 className={h2}>Try it yourself</h2>
        <p>
          The <Link href="/calculators/income-tax" className={link}>income tax calculator</Link> applies these 2026
          brackets for all four filing statuses and shows the tax in each bracket, so you can see exactly where your
          dollars land. State income tax is not included.
        </p>
      </div>
    ),
  },

  'pay-off-debt-or-invest': {
    title: 'Pay Off Debt or Invest? A Decision Framework With Real Numbers',
    date: 'Oct 26, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          You have some extra money each month. Should it go toward debt or into investments? The honest answer is
          &quot;it depends on the interest rate&quot; — but that is only useful if you know how to compare a debt&apos;s
          rate with an investment&apos;s return. This article gives you an order of operations and the math behind it.
        </p>

        <h2 className={h2}>Paying off debt is a guaranteed return</h2>
        <p>
          Every dollar you put toward a loan earns exactly that loan&apos;s interest rate, with no risk and no tax.
          Paying down a 22% credit card is the same as finding an investment that returns 22% a year, guaranteed.
          Investments in the stock market have historically averaged high single-digit returns over long periods,
          but with large swings — some years are down 20% or more. So the comparison is never &quot;rate vs.
          rate&quot;; it is a <em>certain</em> rate against an <em>uncertain</em> one.
        </p>

        <h2 className={h2}>Example: a $5,000 credit card balance</h2>
        <p>
          Say you owe $5,000 on a card at 22% APR and pay $200 a month. Using the{' '}
          <Link href="/calculators/credit-card-payoff" className={link}>credit card payoff calculator</Link>, it takes
          <strong> 34 months</strong> and costs <strong>$1,750 in interest</strong>.
        </p>
        <p>
          If instead you had $5,000 in savings and used it to clear the card today, you&apos;d avoid all $1,750. If
          you invested that $5,000 at a 7% average return for the same 34 months, you&apos;d expect to earn roughly
          $1,090 — and that is before taxes and with no guarantee. Clearing the card wins by a wide margin. (Keep
          enough cash for emergencies before doing this; see below.)
        </p>
        <p>
          A useful way to think about it: for someone in the 22% tax bracket, a 22% debt is equivalent to a taxable
          investment returning about <strong>28% a year</strong> before tax. Nothing reliable does that.
        </p>

        <h2 className={h2}>Example: a $20,000 car loan at 6.5%</h2>
        <p>
          A five-year, $20,000 loan at 6.5% costs $391 a month and $3,479 in total interest. Adding $300 a month to
          the payment clears it in <strong>32 months</strong> instead of 60 and cuts interest to $1,812 — a saving of
          <strong> $1,667</strong>. Use the{' '}
          <Link href="/calculators/auto-loan" className={link}>auto loan calculator</Link> to model your own loan.
        </p>
        <p>
          Whether that beats investing the $300 is a closer call. A guaranteed 6.5% is attractive, but long-run
          stock returns have historically been somewhat higher. At this rate, the order below matters more than the
          exact comparison.
        </p>

        <h2 className={h2}>The order of operations</h2>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>
            <strong>Make every minimum payment.</strong> Late fees and credit damage cost more than any strategy
            gains.
          </li>
          <li>
            <strong>Build a starter emergency fund</strong> — at least one month of expenses. Without it, the next
            car repair goes straight back on the credit card. The{' '}
            <Link href="/calculators/emergency-fund" className={link}>emergency fund calculator</Link> helps you pick
            a target.
          </li>
          <li>
            <strong>Capture your full employer 401(k) match.</strong> A 50% match on contributions is an instant 50%
            return — better than paying off any debt.
          </li>
          <li>
            <strong>Pay off high-interest debt</strong> (roughly 8% and above): credit cards, most personal loans,
            payday loans. Use the avalanche method — highest rate first — to minimize interest; the{' '}
            <Link href="/calculators/debt-payoff" className={link}>debt payoff calculator</Link> compares it with the
            snowball method.
          </li>
          <li><strong>Finish the emergency fund</strong> to three to six months of expenses.</li>
          <li>
            <strong>Medium-rate debt (about 5–8%)</strong> — such as car loans and some private student loans — is a
            judgment call. Splitting extra money between the debt and investing is perfectly reasonable.
          </li>
          <li>
            <strong>Low-rate debt (under about 5%)</strong> — such as many older mortgages — usually isn&apos;t worth
            paying ahead of schedule while you still have room in tax-advantaged retirement accounts.
          </li>
        </ol>

        <h2 className={h2}>When to break the rules</h2>
        <ul className={list}>
          <li><strong>Peace of mind has real value.</strong> If debt keeps you up at night, paying it off faster is a legitimate choice even when the math slightly favors investing.</li>
          <li><strong>Variable-rate debt</strong> can get more expensive. Treat it as if its rate were higher than today&apos;s.</li>
          <li><strong>Federal student loans</strong> have unique protections, such as income-driven repayment. Check studentaid.gov before prepaying aggressively.</li>
          <li><strong>Upcoming big expenses</strong>, like a home down payment, change the picture: money you need within a few years shouldn&apos;t be in stocks at all.</li>
        </ul>

        <h2 className={h2}>The short version</h2>
        <p>
          Match first, high-interest debt second, then balance the rest by rate. A guaranteed return beats an
          expected one whenever the two are close, and anything above about 8% is rarely close.
        </p>
      </div>
    ),
  },

  'roth-vs-traditional-401k': {
    title: 'Roth vs. Traditional 401(k): How to Choose in 2026',
    date: 'Oct 26, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Most 401(k) plans now offer both a traditional and a Roth option. The traditional option gives you a tax
          break today; the Roth option gives you tax-free withdrawals later. People often assume one is simply
          better. It isn&apos;t — and the math that decides it is surprisingly simple.
        </p>

        <h2 className={h2}>The 2026 limits</h2>
        <ul className={list}>
          <li>Employee contribution limit: <strong>$24,500</strong> (traditional and Roth combined)</li>
          <li>Catch-up contribution at age 50+: <strong>$8,000</strong> more</li>
          <li>IRA limit: <strong>$7,500</strong>, plus <strong>$1,100</strong> catch-up at 50+</li>
        </ul>

        <h2 className={h2}>A side-by-side example</h2>
        <p>
          Suppose you can set aside <strong>$10,000 of salary</strong> for retirement, you&apos;re in the 22%
          bracket, and your investments grow 7% a year for 30 years (a growth factor of about 7.61×).
        </p>
        <ul className={list}>
          <li>
            <strong>Traditional:</strong> all $10,000 goes in pre-tax and grows to <strong>$76,123</strong>. Every
            dollar is taxed when you withdraw it.
          </li>
          <li>
            <strong>Roth:</strong> you pay 22% tax first, so $7,800 goes in. It grows to <strong>$59,376</strong>,
            and withdrawals are tax-free.
          </li>
        </ul>
        <p>What you actually get to spend depends only on your tax rate in retirement:</p>
        <DataTable
          head={['Tax rate now', 'Tax rate in retirement', 'Traditional (after tax)', 'Roth']}
          rows={[
            ['22%', '22%', '$59,376', '$59,376'],
            ['22%', '12%', '$66,988', '$59,376'],
            ['12%', '22%', '$59,376', '$66,988'],
            ['24%', '12%', '$66,988', '$57,853'],
          ]}
        />
        <p>
          When the two rates are equal, the outcomes are <strong>identical</strong>. That is just multiplication:
          taxing $10,000 at 22% and then growing it gives the same result as growing it and then taxing it at 22%.
          The whole decision comes down to one question: <em>will your tax rate be higher or lower when you
          withdraw than it is today?</em>
        </p>

        <h2 className={h2}>Signs the traditional 401(k) is the better fit</h2>
        <ul className={list}>
          <li>You&apos;re in the 22% bracket or higher now, especially in your peak earning years.</li>
          <li>You expect a lower income in retirement than you have now — true for most retirees.</li>
          <li>You plan to retire in a state with low or no income tax after working in a high-tax state.</li>
          <li>The upfront tax saving helps you afford to contribute more in the first place.</li>
        </ul>

        <h2 className={h2}>Signs the Roth is the better fit</h2>
        <ul className={list}>
          <li>You&apos;re early in your career and in the 10% or 12% bracket, with higher earnings ahead.</li>
          <li>You already have large traditional balances, and required minimum distributions could push you into a higher bracket later.</li>
          <li>You value flexibility: qualified Roth withdrawals don&apos;t count as taxable income, which can help manage taxes on Social Security and Medicare premiums in retirement.</li>
          <li>You want to leave tax-free money to heirs.</li>
        </ul>

        <h2 className={h2}>Two details that are easy to miss</h2>
        <p>
          <strong>Employer matches.</strong> Matching contributions have traditionally gone into the pre-tax side of
          the plan even if you choose Roth. Newer rules allow plans to offer Roth matching, but your plan must opt
          in. Either way, the match itself doesn&apos;t change the comparison above.
        </p>
        <p>
          <strong>Your rate in retirement is usually lower than your marginal rate today.</strong> Withdrawals fill
          the brackets from the bottom, just like wages. A single retiree who withdraws $80,000 a year in 2026 pays
          $8,770 in federal income tax — an effective rate of about 11% — even though their last dollars are taxed
          at 22%.
          See <Link href="/blog/how-tax-brackets-work-2026" className={link}>how tax brackets really work</Link>{' '}
          for the mechanics.
        </p>

        <h2 className={h2}>If you can&apos;t decide, split it</h2>
        <p>
          Nobody knows future tax law. Putting part of your contributions in each bucket — sometimes called tax
          diversification — gives you the flexibility to choose which account to draw from each year in retirement.
          A 50/50 split is a reasonable default if the signals above point in both directions.
        </p>

        <h2 className={h2}>Run your numbers</h2>
        <p>
          Use the <Link href="/calculators/401k" className={link}>401(k) calculator</Link> to project your balance with
          your employer match, and the <Link href="/calculators/roth-ira" className={link}>Roth IRA calculator</Link>{' '}
          to see what tax-free growth looks like over your timeline.
        </p>
      </div>
    ),
  },
};
