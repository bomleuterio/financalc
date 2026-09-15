'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const NEEDS_ITEMS = ['Rent/Mortgage', 'Utilities', 'Groceries', 'Transportation', 'Insurance', 'Minimum Debt Payments'];
const WANTS_ITEMS = ['Dining Out', 'Entertainment', 'Subscriptions', 'Shopping', 'Travel', 'Hobbies'];
const SAVINGS_ITEMS = ['Emergency Fund', 'Retirement (401k/IRA)', 'Investments', 'Savings Account', 'Debt Extra Payments'];

const PIE_COLORS = ['var(--color-chart-5)', 'var(--color-chart-3)', 'var(--color-chart-1)'];

export default function BudgetPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [needs, setNeeds] = useState<Record<string, string>>({
    'Rent/Mortgage': '1500', 'Utilities': '200', 'Groceries': '400',
    'Transportation': '300', 'Insurance': '200', 'Minimum Debt Payments': '200',
  });
  const [wants, setWants] = useState<Record<string, string>>({
    'Dining Out': '200', 'Entertainment': '100', 'Subscriptions': '50',
    'Shopping': '150', 'Travel': '100', 'Hobbies': '100',
  });
  const [savings, setSavings] = useState<Record<string, string>>({
    'Emergency Fund': '200', 'Retirement (401k/IRA): ': '300', 'Investments': '100',
    'Savings Account': '100', 'Debt Extra Payments': '100',
  });

  const results = useMemo(() => {
    const income = Number(monthlyIncome);
    const needsTotal = Object.values(needs).reduce((s, v) => s + Number(v), 0);
    const wantsTotal = Object.values(wants).reduce((s, v) => s + Number(v), 0);
    const savingsTotal = Object.values(savings).reduce((s, v) => s + Number(v), 0);
    const totalSpending = needsTotal + wantsTotal + savingsTotal;
    const leftover = income - totalSpending;

    const needsPct = income > 0 ? (needsTotal / income) * 100 : 0;
    const wantsPct = income > 0 ? (wantsTotal / income) * 100 : 0;
    const savingsPct = income > 0 ? (savingsTotal / income) * 100 : 0;

    const target50 = income * 0.5;
    const target30 = income * 0.3;
    const target20 = income * 0.2;

    return {
      income, needsTotal, wantsTotal, savingsTotal, totalSpending, leftover,
      needsPct, wantsPct, savingsPct, target50, target30, target20,
    };
  }, [monthlyIncome, needs, wants, savings]);

  const pieData = [
    { name: 'Needs', value: results.needsTotal },
    { name: 'Wants', value: results.wantsTotal },
    { name: 'Savings', value: results.savingsTotal },
  ];

  const categoryInput = (
    category: Record<string, string>,
    setter: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) =>
    Object.entries(category).map(([key, val]) => (
      <div key={key} className="flex items-center gap-3">
        <Label className="flex-1 text-sm">{key}</Label>
        <Input
          type="number"
          value={val}
          onChange={(e) => setter((prev) => ({ ...prev, [key]: e.target.value }))}
          className="w-28 h-8 text-sm"
          min="0"
        />
      </div>
    ));

  const StatusBadge = ({ actual, target }: { actual: number; target: number }) => {
    const over = actual > target * 1.1;
    const under = actual < target * 0.9;
    if (over) return <Badge variant="destructive">Over budget</Badge>;
    if (under) return <Badge variant="secondary">Under budget</Badge>;
    return <Badge variant="default">On target</Badge>;
  };

  return (
    <CalculatorLayout title="Budget Calculator" description="Plan your monthly budget using the 50/30/20 rule: 50% needs, 30% wants, 20% savings." category="Budget">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Monthly After-Tax Income</CardTitle></CardHeader>
            <CardContent>
              <Input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} min="0" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base text-destructive">Needs (target 50%)</CardTitle></CardHeader>
            <CardContent className="space-y-3">{categoryInput(needs, setNeeds)}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base text-amber-500">Wants (target 30%)</CardTitle></CardHeader>
            <CardContent className="space-y-3">{categoryInput(wants, setWants)}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base text-primary">Savings (target 20%)</CardTitle></CardHeader>
            <CardContent className="space-y-3">{categoryInput(savings, setSavings)}</CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Budget Overview</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase">Needs</p>
                  <p className="text-xl font-bold">{formatCurrency(results.needsTotal)}</p>
                  <p className={`text-sm ${results.needsPct > 55 ? 'text-destructive' : 'text-muted-foreground'}`}>{formatPercent(results.needsPct, 0)}</p>
                  <StatusBadge actual={results.needsTotal} target={results.target50} />
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase">Wants</p>
                  <p className="text-xl font-bold">{formatCurrency(results.wantsTotal)}</p>
                  <p className={`text-sm ${results.wantsPct > 35 ? 'text-destructive' : 'text-muted-foreground'}`}>{formatPercent(results.wantsPct, 0)}</p>
                  <StatusBadge actual={results.wantsTotal} target={results.target30} />
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase">Savings</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(results.savingsTotal)}</p>
                  <p className={`text-sm ${results.savingsPct < 18 ? 'text-amber-500' : 'text-muted-foreground'}`}>{formatPercent(results.savingsPct, 0)}</p>
                  <StatusBadge actual={results.savingsTotal} target={results.target20} />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Total spending</span><span>{formatCurrency(results.totalSpending)}</span></div>
                <div className="flex justify-between font-semibold">
                  <span>Leftover / Unallocated</span>
                  <span className={results.leftover >= 0 ? 'text-primary' : 'text-destructive'}>{formatCurrency(results.leftover)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Budget Allocation</CardTitle></CardHeader>
            <CardContent>
              <NoSSR>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} fontSize={12}>
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </NoSSR>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This Budget Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">Uses the 50/30/20 budgeting rule to allocate income:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>50% — Needs (housing, food, insurance, utilities)</li>
                <li>30% — Wants (entertainment, dining, hobbies)</li>
                <li>20% — Savings & debt payoff</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">Monthly income: $4,000</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Needs (50%): $2,000 (rent, groceries, insurance)</li>
                <li>Wants (30%): $1,200 (streaming, dining, hobbies)</li>
                <li>Savings (20%): $800 (emergency fund, retirement, debt payoff)</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">What if my needs exceed 50%?</p>
                  <p className="text-muted-foreground text-sm">Common in high cost-of-living areas. Adjust: reduce wants to 20–25%, maintain 20%+ for savings. Alternatively, look to increase income or reduce housing cost.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Where does debt fit?</p>
                  <p className="text-muted-foreground text-sm">Debt payments go in the 20% savings category. Prioritize high-interest debt first, then build other savings once cleared.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Should I budget every dollar?</p>
                  <p className="text-muted-foreground text-sm">This rule is a starting point. If 50/30/20 doesn't fit your life, adjust to 60/20/20 or 40/40/20—consistency matters more than the exact ratio.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>A simple 50/30/20 budget is easier to follow than tracking every expense.</li>
                <li>The goal: save 20%+ of income. Even 10% beats zero and compounds over time.</li>
                <li>Review quarterly; adjust categories as needed (marriage, kids, job change affect budgets).</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
