'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { calculateSavingsGrowth, formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InvestmentGrowthPage() {
  const [initial, setInitial] = useState('5000');
  const [monthly, setMonthly] = useState('300');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState('30');

  const results = useMemo(() => {
    const p = Number(initial);
    const m = Number(monthly);
    const r = Number(rate);
    const t = Number(years);
    if (t <= 0 || r <= 0) return null;

    const data = calculateSavingsGrowth(p, m, r, t);
    const final = data[data.length - 1];
    if (!final) return null;

    const totalContributions = final.contributions;
    const totalInterest = final.interest;
    const finalBalance = final.balance;
    const multiplier = totalContributions > 0 ? finalBalance / totalContributions : 0;

    return { data, finalBalance, totalContributions, totalInterest, multiplier };
  }, [initial, monthly, rate, years]);

  return (
    <CalculatorLayout
      title="Investment Growth Calculator"
      description="Model how a portfolio grows with regular contributions and compound returns."
      category="Investment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Portfolio Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Starting Balance ($)</Label>
                <Input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Monthly Contribution ($)</Label>
                <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Annual Return Rate (%)</Label>
                <Input type="number" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="30" />
                <p className="text-xs text-muted-foreground mt-1">S&P 500 historical avg ≈ 10%</p>
              </div>
              <div>
                <Label>Years to Grow</Label>
                <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Portfolio Value After {years} Years</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.finalBalance)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {results.multiplier.toFixed(1)}× your total investment
                  </p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Invested</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalContributions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Investment Returns</p>
                      <p className="text-lg font-semibold text-primary">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Returns / Invested</p>
                      <p className="text-lg font-semibold">
                        {formatPercent((results.totalInterest / results.totalContributions) * 100, 1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Withdrawal (4%)</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.finalBalance * 0.04 / 12, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Portfolio Growth Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" name="Total Invested" stackId="1" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="interest" name="Returns" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter details to see your projection.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
