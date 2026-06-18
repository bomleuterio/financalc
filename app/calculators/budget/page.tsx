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
    </CalculatorLayout>
  );
}
