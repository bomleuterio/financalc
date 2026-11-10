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

// First-hand notes from the TriangleBLVD team. Keep these to what the team has actually told us.
function TeamNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-lg border-l-4 border-primary bg-muted/40 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">From the TriangleBLVD team</p>
      <p>{children}</p>
    </aside>
  );
}

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
        <TeamNote>
          We faced this choice ourselves and went with a 15-year mortgage. The comparison below is the math behind
          that kind of decision, laid out so you can test it against your own rates and budget.
        </TeamNote>

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
        <TeamNote>
          We&apos;ve worked through this with our own credit card balance and car loan, both now paid off. The two
          worked examples below use those same two kinds of debt.
        </TeamNote>

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

        <h2 className={h2}>Where IRAs fit: a priority order</h2>
        <p>
          The same traditional-vs-Roth logic applies to IRAs, which you open on your own rather than through an
          employer. A traditional IRA contribution may be tax-deductible depending on your income and whether you
          have a workplace plan; a Roth IRA contribution is never deductible, and the ability to contribute phases
          out at higher incomes (check the IRS limits for your filing status). With limited money each month, a
          common order is:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li><strong>401(k) up to the full employer match.</strong> The match is an immediate return no other account offers.</li>
          <li><strong>An IRA, up to $7,500.</strong> IRAs usually offer a wider choice of low-cost funds than a workplace plan.</li>
          <li><strong>Back to the 401(k)</strong>, up to the $24,500 employee limit.</li>
          <li><strong>A taxable brokerage account</strong> for anything beyond that.</li>
        </ol>
        <p>
          The 401(k) and IRA limits are separate, so you can contribute to both in the same year. At each step, the
          rate comparison above tells you whether to choose the traditional or Roth version.
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

  'how-compound-growth-builds-wealth': {
    title: 'How Compound Growth Builds Wealth: Time, Rate, Fees, and Savings Rate',
    date: 'Nov 3, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Compound growth is the reason ordinary savers can end up with seven-figure retirement accounts without
          ever earning a seven-figure salary. It is also easy to misjudge, because it is slow at first and fast
          later. This guide breaks it into the four levers you actually control — time, rate of return, fees, and
          how much you save — and puts a number on each one.
        </p>
        <p className="text-muted-foreground">
          Unless stated otherwise, examples assume monthly deposits at the end of each month, monthly compounding,
          and a steady 7% average annual return. Real markets don&apos;t move in a straight line, so treat these as
          illustrations of the math, not forecasts.
        </p>

        <h2 className={h2}>What compounding actually is</h2>
        <p>
          With compounding, each period&apos;s growth is added to the balance, and the next period&apos;s growth is
          calculated on that larger balance. Your returns start earning returns. For a single deposit, the formula
          is <span className="font-mono">A = P × (1 + r)<sup>n</sup></span>: the exponent <em>n</em> — the number of
          periods — is why time matters so much.
        </p>
        <p>
          A handy shortcut is the <strong>rule of 72</strong>: divide 72 by the annual return to estimate how many
          years it takes money to double. At 7%, that is about 10.3 years (the exact figure is 10.2). Over a 40-year
          career, a single dollar invested at 7% doubles roughly four times.
        </p>

        <h2 className={h2}>Lever 1: time</h2>
        <p>
          Two savers each put away $500 a month. <strong>Alice</strong> starts at 25, invests for ten years, then
          stops completely and lets the money grow until 65. <strong>Bob</strong> waits until 35 and then invests
          $500 every month for thirty years until 65.
        </p>
        <DataTable
          head={['', 'Alice', 'Bob']}
          rows={[
            ['Years contributing', '10 (age 25–35)', '30 (age 35–65)'],
            ['Total contributed', '$60,000', '$180,000'],
            ['Balance at 65', '$702,421', '$609,985'],
          ]}
        />
        <p>
          Alice contributes a third as much and still ends up ahead, because her first dollars had forty years to
          compound. Even for Bob, about <strong>70% of his final balance is growth</strong> rather than money he
          deposited. The practical lesson: starting with a small amount now usually beats starting with a larger
          amount later.
        </p>

        <h2 className={h2}>Lever 2: rate of return</h2>
        <p>
          Small differences in return become large differences in outcome. A single $10,000 investment left alone for
          30 years (compounded annually) grows to <strong>$57,435 at 6%</strong> but <strong>$100,627 at 8%</strong>.
          Two percentage points nearly doubles the result.
        </p>
        <p>
          You can&apos;t control what markets return, but you can control your mix of investments. Money you
          won&apos;t need for decades can generally afford more stock exposure, which has historically delivered
          higher long-run returns with bigger short-term swings. Money you need within a few years should not be
          in stocks at all.
        </p>

        <h2 className={h2}>Lever 3: fees</h2>
        <p>
          Fees are the part of &quot;rate of return&quot; you <em>can</em> control, and they compound against you just
          as returns compound for you. Here is $500 a month for 30 years at a 7% gross return, after three
          different annual fee levels:
        </p>
        <DataTable
          head={['Annual fee', 'Balance after 30 years', 'Cost vs. 0.05% fee']}
          rows={[
            ['0.05% (typical broad index fund)', '$604,002', '—'],
            ['0.50%', '$553,089', '$50,913'],
            ['1.00%', '$502,258', '$101,744'],
          ]}
        />
        <p>
          A 1% fee sounds trivial, but here it consumes about a sixth of the final balance — more than half of
          everything that was contributed. Check the expense ratio of every fund you own, and any advisory fee on
          top.
        </p>

        <h2 className={h2}>Lever 4: savings rate — usually the biggest one</h2>
        <p>
          For most people, how much they save matters more than anything else on this list. Investing $10,000 a
          year for 35 years grows to <strong>$1,500,879</strong>; raising that to $15,000 a year grows to{' '}
          <strong>$2,251,318</strong>.
        </p>
        <p>
          Savings rate can even outweigh income. Someone earning $50,000 who saves 30% ($15,000 a year) for 30 years
          ends up with <strong>$1,524,964</strong>. Someone earning $100,000 who saves 5% ($5,000 a year) ends up
          with <strong>$508,321</strong> — a third as much, on twice the salary.
        </p>

        <h2 className={h2}>Don&apos;t forget inflation</h2>
        <p>
          All the balances above are in future dollars. With 3% inflation, a 7% return is about a{' '}
          <strong>3.9% real return</strong>. Bob&apos;s $609,985 at 65 would buy roughly what{' '}
          <strong>$251,306</strong> buys today. That doesn&apos;t make compounding less powerful, but it is the right
          way to judge whether a future balance is enough — see{' '}
          <Link href="/blog/retirement-planning-101" className={link}>how much you need for retirement</Link>.
        </p>

        <h2 className={h2}>Putting it into practice</h2>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li><strong>Start now</strong>, even with a small amount. Time is the lever you can&apos;t get back.</li>
          <li><strong>Automate contributions</strong> on payday, so saving happens before spending.</li>
          <li><strong>Use tax-advantaged accounts first</strong> — see <Link href="/blog/roth-vs-traditional-401k" className={link}>Roth vs. traditional 401(k)</Link> for the order.</li>
          <li><strong>Keep fees low</strong>: broad, low-cost index funds are a sensible default for most savers.</li>
          <li><strong>Raise your savings rate with every raise</strong>, so it climbs without a cut to your current lifestyle.</li>
          <li><strong>Leave it alone.</strong> Selling during downturns is the most reliable way to break the compounding chain.</li>
        </ol>
        <p>
          Model your own scenario with the{' '}
          <Link href="/calculators/compound-interest" className={link}>compound interest calculator</Link> or the{' '}
          <Link href="/calculators/investment-growth" className={link}>investment growth calculator</Link>.
        </p>
      </div>
    ),
  },

  'credit-card-debt-payoff-guide': {
    title: 'How to Pay Off Credit Card Debt: Avalanche vs. Snowball, With the Math',
    date: 'Nov 3, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Credit card debt is usually the most expensive money a household borrows, and the way cards calculate
          minimum payments makes it easy to stay in debt for decades. This guide shows what that costs, compares
          the two most popular payoff methods on the same set of debts, and covers when a balance transfer helps.
        </p>
        <TeamNote>
          We&apos;ve paid off credit card debt and a car loan ourselves. This guide is the side-by-side math for the
          choices that come up along the way.
        </TeamNote>

        <h2 className={h2}>The minimum-payment trap</h2>
        <p>
          Take a <strong>$5,000 balance at 20% APR</strong>. A common minimum-payment formula is 1% of the balance plus
          that month&apos;s interest, with a $25 floor. Because the payment shrinks as the balance shrinks, progress
          slows to a crawl:
        </p>
        <DataTable
          head={['How you pay', 'Time to pay off', 'Total interest']}
          rows={[
            ['Card minimum (1% + interest, $25 floor)', '226 months (18.8 years)', '$7,317'],
            ['Fixed $100 a month', '109 months (9.1 years)', '$5,840'],
            ['Fixed $200 a month', '33 months (2.75 years)', '$1,522'],
          ]}
        />
        <p>
          The single most effective change is to <strong>pick a fixed payment and keep paying it</strong> even as the
          required minimum falls. Going from $100 to $200 a month in this example saves $4,318 and more than six
          years. Your card issuer&apos;s formula may differ, so check your statement&apos;s minimum-payment warning box,
          which shows your own payoff time.
        </p>

        <h2 className={h2}>Avalanche vs. snowball on the same debts</h2>
        <p>
          Once you have more than one debt, you pay the minimum on all of them and send every extra dollar to one
          target. The two methods differ only in which target you choose:
        </p>
        <ul className={list}>
          <li><strong>Avalanche:</strong> highest interest rate first. This minimizes total interest.</li>
          <li><strong>Snowball:</strong> smallest balance first. This produces the quickest early win.</li>
        </ul>
        <p>Here are three debts, with $900 a month available in total:</p>
        <DataTable
          head={['Debt', 'Balance', 'APR', 'Minimum']}
          rows={[
            ['Personal loan', '$2,500', '9%', '$100'],
            ['Store card', '$6,000', '26%', '$180'],
            ['Visa', '$9,000', '19%', '$270'],
          ]}
        />
        <DataTable
          head={['', 'Avalanche', 'Snowball']}
          rows={[
            ['Payoff order', 'Store card → Visa → Personal loan', 'Personal loan → Store card → Visa'],
            ['First debt cleared', 'Month 14', 'Month 6'],
            ['Debt-free', 'Month 24', 'Month 24'],
            ['Total interest', '$3,552', '$3,995'],
          ]}
        />
        <p>
          The avalanche saves <strong>$443</strong>. The snowball clears its first debt eight months sooner. Both
          finish in the same month here because the total paid each month is the same — what changes is how much of
          it goes to interest along the way.
        </p>

        <h2 className={h2}>Which method should you use?</h2>
        <p>
          If you are confident you&apos;ll stick with the plan, use the avalanche: it is never more expensive. If
          you&apos;ve started payoff plans before and given up, the snowball&apos;s early win can be worth a few hundred
          dollars, because the most expensive plan is the one you abandon. The gap grows when the high-rate debt is
          also large, so run both with your real balances in the{' '}
          <Link href="/calculators/debt-payoff" className={link}>debt payoff calculator</Link> before deciding.
        </p>

        <h2 className={h2}>When a balance transfer helps</h2>
        <p>
          A balance transfer card moves debt to a promotional 0% rate for a set period, usually for a one-time fee
          of a few percent. Say you owe <strong>$6,000 at 19%</strong> and can pay $350 a month:
        </p>
        <ul className={list}>
          <li>Staying put: paid off in <strong>21 months</strong> with <strong>$1,056</strong> in interest.</li>
          <li>Transferring with a 3% fee ($180) and an 18-month 0% period: the $6,180 balance is fully paid within the promotion at $350 a month, so the total cost is just the <strong>$180</strong> fee.</li>
        </ul>
        <p>Balance transfers only work if you avoid the common traps:</p>
        <ul className={list}>
          <li>Divide the balance by the promotional months, and pay at least that much so it is gone before the rate resets.</li>
          <li>Don&apos;t put new purchases on the transfer card; they may not get the 0% rate.</li>
          <li>Don&apos;t run the old card back up. A transfer moves debt; it doesn&apos;t remove it.</li>
          <li>Approval and promotional terms depend on your credit, so read the offer&apos;s terms before you apply.</li>
        </ul>

        <h2 className={h2}>Other ways to lower the cost</h2>
        <ul className={list}>
          <li><strong>Ask for a lower APR.</strong> A phone call to your issuer costs nothing, and a long payment history helps.</li>
          <li><strong>Consider a fixed-rate personal loan</strong> if its APR is clearly below your cards&apos; rates and you won&apos;t reuse the cards. Compare offers in the <Link href="/calculators/personal-loan" className={link}>personal loan calculator</Link>.</li>
          <li><strong>Talk to a nonprofit credit counselor</strong> if minimums are already unaffordable. A debt management plan can reduce rates in exchange for closing the cards.</li>
        </ul>

        <h2 className={h2}>Your plan in five steps</h2>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Stop adding to the balances — switch daily spending to debit or cash until you&apos;re done.</li>
          <li>Keep a small cash buffer so the next surprise doesn&apos;t go on a card. The <Link href="/blog/emergency-fund-guide" className={link}>emergency fund guide</Link> explains how much.</li>
          <li>List every debt with its balance, rate, and minimum.</li>
          <li>Choose avalanche or snowball, set a fixed total monthly payment, and automate it.</li>
          <li>Each time a debt is cleared, roll its payment into the next one.</li>
        </ol>
        <p>
          See your own timeline in the{' '}
          <Link href="/calculators/credit-card-payoff" className={link}>credit card payoff calculator</Link>, and read{' '}
          <Link href="/blog/pay-off-debt-or-invest" className={link}>pay off debt or invest?</Link> for what to do with
          the money once the cards are paid off.
        </p>
      </div>
    ),
  },

  'understanding-amortization': {
    title: 'Understanding Amortization: Where Every Loan Payment Goes',
    date: 'Oct 2, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Your mortgage or car payment stays the same every month, but what it buys changes completely over the
          life of the loan. Early on, most of each payment is interest. Near the end, almost all of it is principal.
          This is amortization, and understanding it explains why extra payments early in a loan are so valuable.
        </p>

        <h2 className={h2}>How the payment is calculated</h2>
        <p>
          A fixed-rate loan payment is set so that the loan reaches exactly zero on the final payment:
        </p>
        <p className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">M = P × r(1 + r)^n ÷ [(1 + r)^n − 1]</p>
        <p>
          where <em>P</em> is the amount borrowed, <em>r</em> is the monthly interest rate (the annual rate divided by
          12), and <em>n</em> is the number of monthly payments. Each month, interest is charged on the balance that
          remains; whatever is left of the payment reduces the principal.
        </p>

        <h2 className={h2}>A 30-year mortgage, month by month</h2>
        <p>
          Take a <strong>$300,000 mortgage at 7% for 30 years</strong>. The payment is <strong>$1,995.91</strong> a
          month (principal and interest only).
        </p>
        <DataTable
          head={['', 'Interest', 'Principal']}
          rows={[
            ['Month 1', '$1,750.00', '$245.91'],
            ['Month 360', '$11.58', '$1,984.33'],
            ['First 5 years (60 payments)', '$102,149', '$17,605'],
          ]}
        />
        <p>
          In the first five years, about <strong>85% of what you pay is interest</strong>, and you have paid off less
          than 6% of the loan. Principal doesn&apos;t overtake interest until <strong>month 242</strong> — the 21st
          year. Over the full term, interest adds up to <strong>$418,527</strong>, more than the amount borrowed.
        </p>
        <p>
          The reason is simple: in month 1, interest is charged on the full $300,000 (7% ÷ 12 × $300,000 = $1,750).
          As the balance falls, so does the interest, and more of the fixed payment goes to principal.
        </p>

        <h2 className={h2}>Why extra payments early are worth so much</h2>
        <p>
          Any extra amount you pay goes straight to principal, and every dollar of principal you remove stops
          accruing interest for the rest of the loan. On the same mortgage:
        </p>
        <DataTable
          head={['Extra payment', 'Paid off', 'Interest saved']}
          rows={[
            ['$100 a month', '4.2 years sooner', '$69,338'],
            ['$300 a month', '9.4 years sooner', '$151,521'],
            ['One $10,000 payment in year 1', '34 months sooner', '$58,579'],
            ['One $10,000 payment in year 20', '9 months sooner', '$9,585'],
          ]}
        />
        <p>
          The same $10,000 saves six times as much interest when paid in year 1 as in year 20, because it has 29
          years of interest to prevent instead of 10.
        </p>

        <h2 className={h2}>Biweekly payments</h2>
        <p>
          Paying half your monthly payment every two weeks produces 26 half-payments a year — the equivalent of 13
          full payments instead of 12. On this mortgage, that extra payment each year pays the loan off about{' '}
          <strong>6.3 years sooner</strong> and saves about <strong>$102,000</strong> in interest. You get the same
          result by adding one-twelfth of a payment (about $166) to each monthly payment. Avoid third-party biweekly
          programs that charge fees or hold your money before passing it to the lender.
        </p>

        <h2 className={h2}>Car loans amortize too</h2>
        <p>
          A <strong>$27,000 car loan at 6.5% for 60 months</strong> costs $528.29 a month, and $146.25 of the first
          payment is interest. Shorter terms mean interest is a smaller share from the start, which is one reason a
          shorter loan is so much cheaper overall. Compare terms in the{' '}
          <Link href="/calculators/auto-loan" className={link}>auto loan calculator</Link>.
        </p>

        <h2 className={h2}>Before you prepay</h2>
        <ul className={list}>
          <li><strong>Check for prepayment penalties</strong> in your loan documents. Most U.S. mortgages don&apos;t have them, but some loans do.</li>
          <li><strong>Make sure extra money is applied to principal</strong>, not held as a future payment. Many lenders let you mark it as a principal-only payment.</li>
          <li><strong>Compare with your other options.</strong> Extra principal on a low-rate loan earns that loan&apos;s rate; it may make more sense to capture an employer match or pay off a credit card first. See <Link href="/blog/pay-off-debt-or-invest" className={link}>pay off debt or invest?</Link></li>
        </ul>
        <p>
          The <Link href="/calculators/mortgage" className={link}>mortgage calculator</Link> shows the full
          amortization schedule for your own loan, year by year.
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
          An emergency fund is cash set aside for the expenses you can&apos;t predict: a job loss, a medical bill, a
          car repair. It is less exciting than investing, but it is what keeps a bad month from becoming years of
          debt. This guide covers how to size one, what it costs not to have one, and how to build it.
        </p>

        <h2 className={h2}>Size it from essential expenses, not total spending</h2>
        <p>
          The usual guideline is three to six months of expenses, but the expenses that count are the ones you
          couldn&apos;t cut in a crisis: housing, utilities, groceries, insurance, transportation, minimum debt
          payments, and childcare. Dining out and subscriptions can be paused.
        </p>
        <p>If your essentials come to <strong>$4,000 a month</strong>:</p>
        <ul className={list}>
          <li>Three months: <strong>$12,000</strong></li>
          <li>Six months: <strong>$24,000</strong></li>
        </ul>

        <h2 className={h2}>Who should aim higher or lower</h2>
        <ul className={list}>
          <li><strong>Closer to three months:</strong> two stable incomes, in-demand skills, low fixed costs, good insurance.</li>
          <li><strong>Six months or more:</strong> a single income, dependents, self-employment or commission pay, a specialized field where job searches take longer, health issues, or an older home or car.</li>
        </ul>

        <h2 className={h2}>What it costs not to have one</h2>
        <p>
          Without savings, a surprise expense usually goes on a credit card. A <strong>$3,000 emergency at 22% APR</strong>:
        </p>
        <ul className={list}>
          <li>Paid off at $150 a month: <strong>26 months</strong> and <strong>$771</strong> in interest.</li>
          <li>Paid off at $75 a month: <strong>73 months</strong> — over six years — and <strong>$2,457</strong> in interest.</li>
        </ul>
        <p>
          And emergencies rarely come one at a time. A second one before the first is paid off is how
          manageable balances turn into long-term debt.
        </p>

        <h2 className={h2}>How long it takes to build</h2>
        <p>
          Time to save <strong>$12,000</strong>, assuming the account pays 3.5% interest (the interest makes little
          difference over these time frames — the monthly amount is what matters):
        </p>
        <DataTable
          head={['Saved each month', 'Time to $12,000']}
          rows={[
            ['$250', '45 months'],
            ['$500', '24 months'],
            ['$1,000', '12 months'],
          ]}
        />
        <p>
          That can feel slow, so build in stages. A starter cushion of $1,000 to one month of expenses handles most
          car repairs and medical bills. Then capture any employer 401(k) match and pay down high-interest debt, and
          then finish the full fund. The <Link href="/blog/pay-off-debt-or-invest" className={link}>debt-or-invest guide</Link>{' '}
          walks through that order.
        </p>
        <p>Ways to speed it up:</p>
        <ul className={list}>
          <li>Automate a transfer on payday into a separate account you don&apos;t see every day.</li>
          <li>Send windfalls — tax refunds, bonuses, cash gifts — straight to the fund.</li>
          <li>Redirect a payment you&apos;ve just finished, such as a paid-off car loan, to savings.</li>
        </ul>

        <h2 className={h2}>Where to keep it</h2>
        <p>
          It must be safe and reachable within a day or two, which rules out stocks: a market fall often coincides
          with layoffs. Good homes are a high-yield savings account or a money market account at an FDIC- or
          NCUA-insured institution. The rate still matters. At 3.5%, a $12,000 balance earns about $420 a year; at
          0.4% — closer to what a standard savings account pays — it earns about $48.
        </p>

        <h2 className={h2}>Using it — and refilling it</h2>
        <p>
          Before you spend from it, ask: is this unexpected, necessary, and urgent? A new phone usually isn&apos;t;
          a broken furnace is. When you do use it, that is the fund doing its job — pause extra investing or debt
          payments until it is refilled, then carry on.
        </p>
        <p>
          The <Link href="/calculators/emergency-fund" className={link}>emergency fund calculator</Link> adds up your
          essential expenses and shows how far your current savings are from your target.
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
          &quot;How much do I need to retire?&quot; has a surprisingly simple first answer, and a more careful second
          one. This guide walks through both, shows how Social Security changes the target, and — most importantly —
          how much you need to save each month depending on when you start.
        </p>

        <h2 className={h2}>The first answer: the 4% rule</h2>
        <p>
          Research on historical U.S. market returns, starting with William Bengen&apos;s work in 1994, found that a
          retiree who withdrew 4% of their portfolio in the first year, then raised that amount with inflation each
          year, would not have run out of money over any 30-year period in the historical record. Turned around, that
          gives a quick target:
        </p>
        <p className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">Savings needed = annual spending from savings ÷ 0.04 (or × 25)</p>
        <ul className={list}>
          <li>$50,000 a year from savings → <strong>$1,250,000</strong></li>
          <li>$80,000 a year from savings → <strong>$2,000,000</strong></li>
        </ul>
        <p>
          The 4% rule is deliberately cautious — it was built to survive the worst historical periods. It is a
          planning guideline, not a guarantee, and retirements much longer than 30 years call for a lower rate.
        </p>

        <h2 className={h2}>Subtract Social Security first</h2>
        <p>
          You only need savings for the part of your spending that guaranteed income doesn&apos;t cover. The average
          retired-worker Social Security benefit is about $2,070 a month in 2026 (around $24,800 a year), but your
          own figure depends on your earnings history and the age you claim — get it from your account at ssa.gov.
        </p>
        <DataTable
          head={['', 'Amount']}
          rows={[
            ['Annual spending goal (today’s dollars)', '$80,000'],
            ['Social Security (estimate)', '−$25,000'],
            ['Gap savings must cover', '$55,000'],
            ['Target at 4% ($55,000 × 25)', '$1,375,000'],
          ]}
        />

        <h2 className={h2}>The careful answer: keep everything in today&apos;s dollars</h2>
        <p>
          The $1,375,000 target above is in today&apos;s dollars. With 3% inflation, $80,000 of spending today becomes
          about $194,181 a year in 30 years. The most common retirement-planning mistake is to combine a
          today&apos;s-dollars target with a return that includes inflation, which makes saving look much easier
          than it is.
        </p>
        <p>
          The consistent approach is to use a <strong>real return</strong> — your expected return minus inflation —
          and to raise your contributions with inflation each year. A 7% return with 3% inflation is about a 3.9%
          real return. On that basis, here is what it takes to reach $1,375,000 (in today&apos;s dollars) by 65:
        </p>
        <DataTable
          head={['Start saving at', 'Monthly savings (today’s dollars)', 'Total contributed']}
          rows={[
            ['25', '$1,198', '$574,843'],
            ['35', '$2,023', '$728,138'],
            ['45', '$3,798', '$911,573'],
          ]}
        />
        <p>
          Waiting ten years from 25 to 35 raises the monthly amount by about 70%; waiting twenty years more than
          triples it. These figures include any employer match — a 401(k) match counts toward the monthly amount.
        </p>

        <h2 className={h2}>Is the 4% rule too conservative?</h2>
        <p>
          For a 30-year retirement, $55,000 a year in today&apos;s dollars has a present value of about $951,000 at a
          4% real return, or $1,078,000 at 3%. Those are lower than the $1,375,000 the 4% rule suggests, because the
          rule also plans for a bad sequence of early returns. Many planners treat the 4% rule as a safe ceiling and
          the annuity math as a floor, and adjust spending in retirement based on how markets actually perform.
        </p>

        <h2 className={h2}>Ways to close a gap</h2>
        <ul className={list}>
          <li><strong>Save more, starting now</strong>, and raise contributions every time your pay rises.</li>
          <li><strong>Capture your full employer match</strong> before anything else.</li>
          <li><strong>Work a few years longer</strong>: you add contributions, give the portfolio more time to grow, and shorten the period it has to fund.</li>
          <li><strong>Delay Social Security</strong>: benefits rise for each year you wait past full retirement age, up to age 70.</li>
          <li><strong>Plan to spend flexibly</strong>: trimming withdrawals after a bad market year greatly improves the odds that savings last.</li>
        </ul>
        <p>
          The <Link href="/calculators/retirement" className={link}>retirement calculator</Link> runs these numbers
          with your own age, savings, return, and inflation assumptions. For choosing accounts, see{' '}
          <Link href="/blog/roth-vs-traditional-401k" className={link}>Roth vs. traditional 401(k)</Link>.
        </p>
      </div>
    ),
  },

  'how-much-house-can-you-afford': {
    title: 'How Much House Can You Afford? The 28/36 Rule, Worked Through',
    date: 'Nov 10, 2026',
    content: (
      <div className="space-y-4 text-sm leading-relaxed">
        <aside className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
          <p className="font-semibold mb-1">The short answer</p>
          <p>
            Under the common 28/36 guideline, total housing costs should stay under 28% of your gross monthly
            income, and all debt payments under 36%. With 20% down and a 6.5% rate, that works out to a home price
            of roughly <strong>3.6 to 3.7 times your annual income</strong> — if you carry little other debt.
          </p>
        </aside>
        <p>
          A lender&apos;s pre-approval tells you the most you can borrow. It doesn&apos;t tell you what you can
          comfortably pay every month for the next 30 years. This guide walks through the affordability math step
          by step, shows how much the answer moves with your other debts and the interest rate, and covers the
          costs that a payment estimate leaves out.
        </p>

        <h2 className={h2}>Step 1: Know the two limits</h2>
        <ul className={list}>
          <li>
            <strong>Front-end ratio (28%):</strong> your monthly housing cost — principal, interest, property tax,
            and homeowners insurance, plus any mortgage insurance or HOA dues — divided by gross monthly income.
          </li>
          <li>
            <strong>Back-end ratio (36%):</strong> housing cost <em>plus</em> every other monthly debt payment — car
            loans, student loans, credit card minimums — divided by gross monthly income.
          </li>
        </ul>
        <p>
          Your housing budget is whichever limit is lower. Many lenders and loan programs will approve higher
          ratios than 28/36, so treat these as a comfortable target, not the maximum a lender might allow.
        </p>

        <h2 className={h2}>Step 2: Turn the budget into a home price</h2>
        <p>
          The examples below assume a 30-year fixed loan at 6.5%, a 20% down payment (so no mortgage insurance),
          property tax of 1.1% of the home&apos;s value per year, $150 a month for homeowners insurance, and $500 a
          month of other debt payments. These are illustrative — your rate, tax rate, and insurance cost will differ.
        </p>
        <DataTable
          head={['Gross income', 'Housing budget', 'Home price', 'Down payment (20%)', 'Principal & interest']}
          rows={[
            ['$75,000', '$1,750', '$267,863', '$53,573', '$1,354'],
            ['$100,000', '$2,333', '$365,521', '$73,104', '$1,848'],
            ['$150,000', '$3,500', '$560,837', '$112,167', '$2,836'],
          ]}
        />
        <p>
          At $100,000, the 28% front-end limit is $2,333 a month. After $335 of property tax and $150 of insurance,
          $1,848 is left for principal and interest, which supports a loan of about $292,000 — a $365,521 home with
          20% down. At $75,000, the $500 of other debt makes both limits land on the same $1,750.
        </p>

        <h2 className={h2}>Step 3: See what moves the answer</h2>
        <p><strong>Other debt.</strong> On a $100,000 income, here is the price range as other monthly debt grows:</p>
        <DataTable
          head={['Other monthly debt', 'Housing budget', 'Home price']}
          rows={[
            ['$0', '$2,333', '$365,521'],
            ['$500', '$2,333', '$365,521'],
            ['$1,000', '$2,000', '$309,716'],
            ['$1,500', '$1,500', '$226,009'],
          ]}
        />
        <p>
          Up to about $667 a month, other debt doesn&apos;t change the answer, because the 28% limit binds first.
          Beyond that, every extra $100 of monthly debt payments cuts the affordable price by roughly $17,000. Paying
          off a car loan before you buy can raise your budget more than months of extra saving.
        </p>
        <p><strong>The interest rate.</strong> The same $2,333 housing budget at three rates:</p>
        <DataTable
          head={['Mortgage rate', 'Home price']}
          rows={[
            ['5.5%', '$399,953'],
            ['6.5%', '$365,521'],
            ['7.5%', '$335,362'],
          ]}
        />
        <p>
          Each percentage point moves the price by roughly $30,000–$34,000 here. A better credit score, a larger
          down payment, or comparing several lenders can be worth as much as a raise.
        </p>
        <p>
          <strong>A smaller down payment.</strong> Putting 10% down instead of 20% usually means paying private
          mortgage insurance. Assuming PMI costs 0.5% of the loan per year — actual rates vary with your credit and
          down payment — the same $2,333 budget supports a home of about $312,785: $31,279 down, with about $117 a
          month going to PMI. You need less cash up front, but the affordable price falls by about $53,000.
        </p>

        <h2 className={h2}>Step 4: Check it against take-home pay</h2>
        <p>
          The 28/36 rule uses gross income, but you pay the mortgage from take-home pay. A single filer earning
          $100,000 keeps about $6,598 a month after 2026 federal income tax and FICA — before state tax, health
          insurance, and retirement contributions. A $2,333 housing payment is about 35% of that. If you also want
          to save 15% for retirement and keep building an emergency fund, run your full budget before deciding the
          ratio is comfortable. The <Link href="/calculators/income-tax" className={link}>income tax calculator</Link>{' '}
          shows your own take-home pay, and the <Link href="/calculators/budget" className={link}>budget calculator</Link>{' '}
          shows where it goes.
        </p>

        <h2 className={h2}>The cash you need on top of the down payment</h2>
        <ul className={list}>
          <li>
            <strong>Closing costs</strong>, commonly cited as 2% to 5% of the purchase price. On a $365,521 home,
            that is about $7,300 to $18,300, so the total cash needed with 20% down is roughly $80,000 to $91,000.
          </li>
          <li>
            <strong>An emergency fund that survives the purchase.</strong> Don&apos;t empty your savings for the down
            payment; new homeowners face repairs no landlord will cover. See the{' '}
            <Link href="/blog/emergency-fund-guide" className={link}>emergency fund guide</Link>.
          </li>
          <li>
            <strong>Ongoing maintenance</strong>, utilities, and HOA dues, which can be higher than in a rental.
          </li>
        </ul>

        <h2 className={h2}>Putting it together</h2>
        <ol className="list-decimal list-inside space-y-2 ml-2">
          <li>Take the lower of 28% of gross monthly income and 36% minus your other debt payments.</li>
          <li>Subtract property tax, insurance, HOA dues, and any PMI to find what&apos;s left for principal and interest.</li>
          <li>Convert that into a price with the <Link href="/calculators/mortgage" className={link}>mortgage calculator</Link>, using a real rate quote.</li>
          <li>Check the payment against your take-home budget and savings goals.</li>
          <li>Make sure you can cover closing costs and still keep an emergency fund.</li>
        </ol>
        <p>
          Then decide on the loan term: the{' '}
          <Link href="/blog/mortgage-15-vs-30-year" className={link}>15-year vs. 30-year comparison</Link> shows how
          the choice changes your payment and total interest.
        </p>
      </div>
    ),
  },
};
