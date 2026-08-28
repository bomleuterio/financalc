export interface AccountCard {
  id: string;
  label: string;
  balance: number;
  changePct: number;
  meta: string;
  icon: 'checking' | 'savings' | 'investments' | 'home' | 'retirement';
}

export interface NetWorthPoint {
  month: string;
  netWorth: number;
}

export interface Goal {
  id: string;
  label: string;
  current: number;
  target: number;
  targetDate: string;
}

export interface ExpenseCategory {
  id: string;
  label: string;
  amount: number;
}

export const AS_OF = 'August 2026';

export const NET_WORTH_SUMMARY = {
  netWorth: 814_222,
  netWorthChangePct: 4.8,
  netWorthChangeAbs: 37_450,
  changeWindowMonths: 6,
  totalAssets: 942_180,
  totalAssetsChangePct: 3.1,
  liabilities: 127_958,
  // Negative = liabilities shrinking = good. This is the inverse of every
  // other stat on the page, so the page renders its badge color explicitly
  // rather than through a shared "positive = green" helper.
  liabilitiesChangePct: -2.4,
};

export const ACCOUNTS: AccountCard[] = [
  { id: 'checking', label: 'Checking', balance: 18_340, changePct: -3.2, meta: 'Avg. monthly spend $6,180', icon: 'checking' },
  { id: 'savings', label: 'Savings', balance: 42_610, changePct: 1.8, meta: '4.20% APY · 6.8 months runway', icon: 'savings' },
  { id: 'investments', label: 'Investments', balance: 268_450, changePct: 6.4, meta: 'Across 3 brokerage accounts', icon: 'investments' },
  { id: 'home', label: 'Home Value', balance: 512_000, changePct: 2.1, meta: 'Est. market value · updated monthly', icon: 'home' },
  { id: 'retirement', label: 'Retirement', balance: 100_780, changePct: 5.9, meta: '401(k) + Roth IRA combined', icon: 'retirement' },
];

export const NET_WORTH_TREND: NetWorthPoint[] = [
  { month: 'Sep', netWorth: 748_900 },
  { month: 'Oct', netWorth: 756_200 },
  { month: 'Nov', netWorth: 751_800 },
  { month: 'Dec', netWorth: 762_400 },
  { month: 'Jan', netWorth: 771_900 },
  { month: 'Feb', netWorth: 779_300 },
  { month: 'Mar', netWorth: 774_600 },
  { month: 'Apr', netWorth: 786_100 },
  { month: 'May', netWorth: 793_800 },
  { month: 'Jun', netWorth: 801_250 },
  { month: 'Jul', netWorth: 806_700 },
  { month: 'Aug', netWorth: 814_222 },
];

export const CASH_FLOW = {
  income: 8_240,
  expenses: 6_180,
  categories: [
    { id: 'housing', label: 'Housing', amount: 2_400 },
    { id: 'shopping', label: 'Shopping', amount: 610 },
    { id: 'food', label: 'Food & Dining', amount: 680 },
    { id: 'transportation', label: 'Transportation', amount: 420 },
    { id: 'subscriptions', label: 'Subscriptions', amount: 140 },
    { id: 'other', label: 'Other', amount: 1_930 },
  ] as ExpenseCategory[],
};

export const GOALS: Goal[] = [
  { id: 'emergency', label: 'Emergency fund', current: 42_610, target: 60_000, targetDate: 'Dec 2026' },
  { id: 'house', label: 'Down payment — next home', current: 38_500, target: 100_000, targetDate: 'Jun 2028' },
  { id: 'vacation', label: 'Vacation fund', current: 3_200, target: 6_000, targetDate: 'Nov 2026' },
  { id: 'retirement-goal', label: 'Retirement (age 65)', current: 100_780, target: 1_500_000, targetDate: '2055' },
];
