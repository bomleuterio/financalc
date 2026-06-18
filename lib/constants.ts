export interface Calculator {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'loans', title: 'Loans', icon: '🏦', description: 'Auto, mortgage, personal & student loans', color: 'from-blue-500/20 to-blue-600/10' },
  { id: 'investment', title: 'Investment', icon: '📈', description: 'Compound interest, ROI & portfolio growth', color: 'from-emerald-500/20 to-emerald-600/10' },
  { id: 'savings', title: 'Savings', icon: '💰', description: 'Savings accounts, CDs & emergency funds', color: 'from-green-500/20 to-green-600/10' },
  { id: 'tax', title: 'Tax', icon: '📋', description: 'Income, capital gains & sales tax', color: 'from-amber-500/20 to-amber-600/10' },
  { id: 'retirement', title: 'Retirement', icon: '🏖️', description: 'Retirement savings & withdrawal planning', color: 'from-purple-500/20 to-purple-600/10' },
  { id: 'credit', title: 'Credit', icon: '💳', description: 'Credit card payoff & debt management', color: 'from-red-500/20 to-red-600/10' },
  { id: 'budget', title: 'Budget', icon: '📊', description: 'Budget planning, net worth & inflation', color: 'from-cyan-500/20 to-cyan-600/10' },
];

export const CALCULATORS: Calculator[] = [
  // Loans
  { id: 'auto-loan', title: 'Auto Loan Calculator', description: 'Calculate monthly payments and total cost for car financing.', category: 'loans', href: '/calculators/auto-loan', popular: true },
  { id: 'mortgage', title: 'Mortgage Calculator', description: 'Estimate mortgage payments with full amortization schedule.', category: 'loans', href: '/calculators/mortgage', popular: true },
  { id: 'personal-loan', title: 'Personal Loan Calculator', description: 'Calculate monthly payments for personal loans.', category: 'loans', href: '/calculators/personal-loan' },
  { id: 'student-loan', title: 'Student Loan Calculator', description: 'Plan your student loan repayment strategy.', category: 'loans', href: '/calculators/student-loan' },

  // Investment
  { id: 'compound-interest', title: 'Compound Interest Calculator', description: 'See how your money grows with the power of compounding.', category: 'investment', href: '/calculators/compound-interest', popular: true },
  { id: 'roi', title: 'ROI Calculator', description: 'Calculate return on investment and annualized returns.', category: 'investment', href: '/calculators/roi' },
  { id: '401k', title: '401k Calculator', description: 'Project your 401k balance at retirement with employer match.', category: 'investment', href: '/calculators/401k', popular: true },
  { id: 'investment-growth', title: 'Investment Growth Calculator', description: 'Model long-term portfolio growth with regular contributions.', category: 'investment', href: '/calculators/investment-growth' },

  // Savings
  { id: 'savings', title: 'Savings Calculator', description: 'Calculate how much your savings will grow over time.', category: 'savings', href: '/calculators/savings' },
  { id: 'cd', title: 'CD Calculator', description: 'Calculate earnings on certificates of deposit.', category: 'savings', href: '/calculators/cd' },
  { id: 'emergency-fund', title: 'Emergency Fund Calculator', description: 'Find out how much emergency fund you need.', category: 'savings', href: '/calculators/emergency-fund' },

  // Tax
  { id: 'income-tax', title: 'Income Tax Calculator', description: 'Estimate your federal income tax using 2024 brackets.', category: 'tax', href: '/calculators/income-tax', popular: true },
  { id: 'capital-gains', title: 'Capital Gains Tax Calculator', description: 'Calculate capital gains tax on your investments.', category: 'tax', href: '/calculators/capital-gains' },
  { id: 'sales-tax', title: 'Sales Tax Calculator', description: 'Quickly calculate sales tax on any purchase.', category: 'tax', href: '/calculators/sales-tax' },

  // Retirement
  { id: 'retirement', title: 'Retirement Calculator', description: 'Plan how much you need to save for retirement.', category: 'retirement', href: '/calculators/retirement', popular: true },
  { id: 'roth-ira', title: 'Roth IRA Calculator', description: 'See how a Roth IRA can grow your retirement savings.', category: 'retirement', href: '/calculators/roth-ira' },

  // Credit
  { id: 'credit-card-payoff', title: 'Credit Card Payoff Calculator', description: 'Find the fastest & cheapest way to pay off credit card debt.', category: 'credit', href: '/calculators/credit-card-payoff', popular: true },
  { id: 'debt-payoff', title: 'Debt Payoff Calculator', description: 'Compare avalanche vs. snowball debt payoff strategies.', category: 'credit', href: '/calculators/debt-payoff' },

  // Budget
  { id: 'budget', title: 'Budget Calculator', description: 'Create a balanced budget using the 50/30/20 rule.', category: 'budget', href: '/calculators/budget' },
  { id: 'net-worth', title: 'Net Worth Calculator', description: 'Calculate your total net worth: assets minus liabilities.', category: 'budget', href: '/calculators/net-worth' },
  { id: 'inflation', title: 'Inflation Calculator', description: 'See how inflation affects your purchasing power over time.', category: 'budget', href: '/calculators/inflation' },
];
