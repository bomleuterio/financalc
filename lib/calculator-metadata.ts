import type { Metadata } from 'next';
import { CALCULATORS } from '@/lib/constants';

// Search-result descriptions (aim for 120–155 characters). Falls back to the short card description.
const SEO_DESCRIPTIONS: Record<string, string> = {
  'auto-loan': 'Calculate your monthly car payment, total interest, and full amortization schedule. Compare loan terms, down payments, and trade-in values.',
  mortgage: 'Estimate your monthly mortgage payment with property tax and HOA fees, see a full amortization schedule, and compare 15- and 30-year terms.',
  'personal-loan': 'Find the monthly payment and total interest on a personal loan. Compare APRs and terms to see what borrowing really costs before you sign.',
  'student-loan': 'Compare student loan repayment terms side by side: monthly payment, total interest, and how your balance falls over the life of the loan.',
  'compound-interest': 'See how an initial deposit and regular additions grow with compound interest. Compare compounding frequencies with a year-by-year chart.',
  roi: 'Calculate return on investment and annualized return for any holding period, including extra costs such as fees, from start and end values.',
  '401k': 'Project your 401(k) balance at retirement from your current balance, monthly contributions, employer match, and expected annual return.',
  'investment-growth': 'Model long-term portfolio growth from an initial investment plus monthly contributions, and see how much comes from returns versus deposits.',
  savings: 'Calculate how a savings balance grows with monthly deposits and interest. See your final balance and interest earned for any time frame.',
  cd: 'Calculate certificate of deposit earnings from the APY and term, and estimate how much an early-withdrawal penalty could cost you.',
  'emergency-fund': 'Add up your essential monthly expenses to size your emergency fund, then see how far your current savings are from your goal.',
  'income-tax': 'Estimate 2026 federal income tax for any filing status: taxable income, tax by bracket, effective and marginal rates, FICA, and take-home pay.',
  'capital-gains': 'Estimate federal tax on a stock or asset sale using 2026 long-term capital gains brackets, and compare short-term versus long-term rates.',
  'sales-tax': 'Calculate sales tax and total cost on any purchase using a state base rate or your own local rate, for one item or several.',
  retirement: 'Find how much you need saved to retire, based on your income goal, years in retirement, inflation, and expected investment returns.',
  'roth-ira': 'Project Roth IRA growth with 2026 contribution limits and see how much of your balance comes from tax-free investment growth.',
  'credit-card-payoff': 'See how long it takes to pay off a credit card and how much interest you will pay, and how much faster a bigger payment gets you out of debt.',
  'debt-payoff': 'Compare avalanche and snowball payoff across multiple debts, with an extra monthly payment, to see which saves more time and interest.',
  budget: 'Build a monthly budget with the 50/30/20 rule. Split take-home pay into needs, wants, and savings and see where your spending stands.',
  'net-worth': 'Add up your assets and liabilities to calculate your net worth, with a breakdown of what you own and what you owe.',
  inflation: 'See how inflation erodes purchasing power over time: what an amount of money today will be worth in future years at a given rate.',
};

export function calculatorMetadata(id: string): Metadata {
  const calc = CALCULATORS.find((c) => c.id === id);
  if (!calc) throw new Error(`Unknown calculator id: ${id}`);
  const description = SEO_DESCRIPTIONS[id] ?? calc.description;
  return {
    title: calc.title,
    description,
    alternates: { canonical: calc.href },
    openGraph: { title: calc.title, description, url: calc.href, type: 'website' },
    twitter: { card: 'summary_large_image', title: calc.title, description },
  };
}
