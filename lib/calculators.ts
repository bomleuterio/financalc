export function calculateLoanPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export interface AmortizationEntry {
  month: number;
  year: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function buildAmortizationSchedule(
  principal: number,
  annualRate: number,
  months: number
): AmortizationEntry[] {
  const payment = calculateLoanPayment(principal, annualRate, months);
  const r = annualRate === 0 ? 0 : annualRate / 100 / 12;
  const schedule: AmortizationEntry[] = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * r;
    const principalPaid = payment - interest;
    balance -= principalPaid;
    schedule.push({
      month,
      year: Math.ceil(month / 12),
      payment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return schedule;
}

export function buildYearlyAmortization(
  principal: number,
  annualRate: number,
  months: number
): { year: number; principal: number; interest: number; balance: number }[] {
  const schedule = buildAmortizationSchedule(principal, annualRate, months);
  const yearMap = new Map<number, { principal: number; interest: number; balance: number }>();

  for (const entry of schedule) {
    const existing = yearMap.get(entry.year) ?? { principal: 0, interest: 0, balance: 0 };
    yearMap.set(entry.year, {
      principal: existing.principal + entry.principal,
      interest: existing.interest + entry.interest,
      balance: entry.balance,
    });
  }

  return Array.from(yearMap.entries()).map(([year, data]) => ({ year, ...data }));
}

export function calculateFutureValue(
  presentValue: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return presentValue + monthlyContribution * n;
  return presentValue * Math.pow(1 + r, n) + monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  compoundsPerYear: number,
  years: number
): number {
  if (annualRate === 0) return principal;
  return principal * Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * years);
}

export function calculateCompoundGrowth(
  principal: number,
  annualContribution: number,
  annualRate: number,
  compoundsPerYear: number,
  years: number
): { year: number; balance: number; contributions: number; interest: number }[] {
  const data = [];
  let balance = principal;
  let totalContributions = principal;
  const r = annualRate / 100 / compoundsPerYear;

  for (let year = 1; year <= years; year++) {
    for (let i = 0; i < compoundsPerYear; i++) {
      balance = balance * (1 + r) + annualContribution / compoundsPerYear;
    }
    totalContributions += annualContribution;
    data.push({
      year,
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      interest: Math.round(balance - totalContributions),
    });
  }

  return data;
}

export function calculateSavingsGrowth(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): { year: number; balance: number; contributions: number; interest: number }[] {
  const r = annualRate / 100 / 12;
  const data = [];
  let balance = initialAmount;
  let totalContributions = initialAmount;

  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + r) + monthlyContribution;
      totalContributions += monthlyContribution;
    }
    data.push({
      year,
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      interest: Math.round(balance - totalContributions),
    });
  }

  return data;
}

export function calculate401k(
  currentAge: number,
  retirementAge: number,
  currentBalance: number,
  monthlyContribution: number,
  employerMatchPercent: number,
  annualReturn: number
): { year: number; age: number; balance: number; contributions: number; employerMatch: number; growth: number }[] {
  const r = annualReturn / 100 / 12;
  const data = [];
  let balance = currentBalance;
  let totalContributions = currentBalance;
  let totalEmployerMatch = 0;

  for (let age = currentAge + 1; age <= retirementAge; age++) {
    const employerMonthly = monthlyContribution * (employerMatchPercent / 100);
    for (let month = 0; month < 12; month++) {
      balance = balance * (1 + r) + monthlyContribution + employerMonthly;
      totalContributions += monthlyContribution;
      totalEmployerMatch += employerMonthly;
    }
    data.push({
      year: age - currentAge,
      age,
      balance: Math.round(balance),
      contributions: Math.round(totalContributions),
      employerMatch: Math.round(totalEmployerMatch),
      growth: Math.round(balance - totalContributions - totalEmployerMatch),
    });
  }

  return data;
}

export type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

// Tax year 2026 (IRS Rev. Proc. 2025-32). Each list holds the upper bound of every bracket but the last.
const BRACKET_RATES = [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];

function buildBrackets(bounds: number[]) {
  return BRACKET_RATES.map((rate, i) => ({
    min: i === 0 ? 0 : bounds[i - 1],
    max: i < bounds.length ? bounds[i] : Infinity,
    rate,
  }));
}

const TAX_BRACKETS: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single: buildBrackets([12400, 50400, 105700, 201775, 256225, 640600]),
  mfj: buildBrackets([24800, 100800, 211400, 403550, 512450, 768700]),
  mfs: buildBrackets([12400, 50400, 105700, 201775, 256225, 384350]),
  hoh: buildBrackets([17700, 67450, 105700, 201750, 256200, 640600]),
};

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  mfs: 16100,
  hoh: 24150,
};

// 2026 Social Security wage base; Medicare has no cap, plus 0.9% above these thresholds.
const SOCIAL_SECURITY_WAGE_BASE = 184500;
const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  mfj: 250000,
  mfs: 125000,
  hoh: 200000,
};

// 2026 long-term capital gains: top of the 0% and 15% tiers.
const LTCG_THRESHOLDS: Record<FilingStatus, [number, number]> = {
  single: [49450, 545500],
  mfj: [98900, 613700],
  mfs: [49450, 306850],
  hoh: [66200, 579600],
};

export function calculateIncomeTax(
  grossIncome: number,
  filingStatus: FilingStatus,
  preTaxDeductions = 0,
  itemizedDeductions = 0
): {
  grossIncome: number;
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  marginalRate: number;
  fica: number;
  bracketDetails: { rate: number; taxableAmount: number; tax: number }[];
} {
  const standardDed = STANDARD_DEDUCTIONS[filingStatus];
  const deductions = Math.max(standardDed, itemizedDeductions) + preTaxDeductions;
  const taxableIncome = Math.max(0, grossIncome - deductions);
  const brackets = TAX_BRACKETS[filingStatus];

  let federalTax = 0;
  let marginalRate = 10;
  const bracketDetails = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableAmount = Math.min(taxableIncome, bracket.max) - bracket.min;
    const tax = taxableAmount * bracket.rate;
    federalTax += tax;
    marginalRate = bracket.rate * 100;
    bracketDetails.push({ rate: bracket.rate * 100, taxableAmount, tax });
  }

  const fica =
    Math.min(grossIncome, SOCIAL_SECURITY_WAGE_BASE) * 0.062 +
    grossIncome * 0.0145 +
    Math.max(0, grossIncome - ADDITIONAL_MEDICARE_THRESHOLD[filingStatus]) * 0.009;

  return {
    grossIncome,
    taxableIncome,
    federalTax,
    effectiveRate: grossIncome > 0 ? (federalTax / grossIncome) * 100 : 0,
    marginalRate,
    fica,
    bracketDetails,
  };
}

export function calculateCapitalGainsTax(
  gains: number,
  isLongTerm: boolean,
  ordinaryIncome: number,
  filingStatus: FilingStatus
): { tax: number; rate: number } {
  if (!isLongTerm) {
    const withGains = calculateIncomeTax(ordinaryIncome + gains, filingStatus);
    const without = calculateIncomeTax(ordinaryIncome, filingStatus);
    const tax = withGains.federalTax - without.federalTax;
    return { tax, rate: gains > 0 ? (tax / gains) * 100 : 0 };
  }

  const [zeroMax, fifteenMax] = LTCG_THRESHOLDS[filingStatus];
  const ltcgThresholds = [{ max: zeroMax, rate: 0 }, { max: fifteenMax, rate: 0.15 }, { max: Infinity, rate: 0.20 }];

  const totalIncome = ordinaryIncome + gains;
  let ltcgRate = 0.20;
  for (const tier of ltcgThresholds) {
    if (totalIncome <= tier.max) {
      ltcgRate = tier.rate;
      break;
    }
  }

  const tax = gains * ltcgRate;
  return { tax, rate: ltcgRate * 100 };
}

export function calculateCreditCardPayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): {
  months: number;
  totalPaid: number;
  totalInterest: number;
  schedule: { month: number; payment: number; interest: number; principal: number; balance: number }[];
} {
  const r = annualRate / 100 / 12;
  const schedule = [];
  let remaining = balance;
  let month = 0;

  while (remaining > 0.01 && month < 600) {
    month++;
    const interest = remaining * r;
    const payment = Math.min(monthlyPayment, remaining + interest);
    const principal = payment - interest;
    remaining -= principal;
    schedule.push({ month, payment, interest, principal, balance: Math.max(0, remaining) });
  }

  const totalPaid = schedule.reduce((sum, e) => sum + e.payment, 0);
  return { months: month, totalPaid, totalInterest: totalPaid - balance, schedule };
}

export function calculateMinimumPayoffTime(
  balance: number,
  annualRate: number,
  minimumPercent = 2,
  minimumFloor = 25
): { months: number; totalInterest: number } {
  const r = annualRate / 100 / 12;
  let remaining = balance;
  let month = 0;
  let totalInterest = 0;

  while (remaining > 0.01 && month < 1200) {
    month++;
    const interest = remaining * r;
    totalInterest += interest;
    const minPayment = Math.max(minimumFloor, remaining * (minimumPercent / 100));
    const payment = Math.min(minPayment, remaining + interest);
    remaining -= payment - interest;
  }

  return { months: month, totalInterest };
}

export function formatCurrency(amount: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
