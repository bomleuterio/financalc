'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { calculateSavingsGrowth, formatCurrency } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SavingsPage() {
  const [initial, setInitial] = useState('1000');
  const [monthly, setMonthly] = useState('200');
  const [rate, setRate] = useState('4.5');
  const [years, setYears] = useState('10');

  const results = useMemo(() => {
    const data = calculateSavingsGrowth(Number(initial), Number(monthly), Number(rate), Number(years));
    const final = data[data.length - 1];
    if (!final) return null;
    return { data, final };
  }, [initial, monthly, rate, years]);

  return (
    <CalculatorLayout title="Savings Calculator" description="See how your savings account grows with regular contributions over time." category="Savings">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Savings Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Initial Deposit ($)</Label><Input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} min="0" /></div>
              <div><Label>Monthly Deposit ($)</Label><Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} min="0" /></div>
              <div>
                <Label>Annual Interest Rate (%)</Label>
                <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="20" />
                <p className="text-xs text-muted-foreground mt-1">HYSA rates: 4–5% (2024)</p>
              </div>
              <div><Label>Time Period (years)</Label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="50" /></div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Savings After {years} Years</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.final.balance)}</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Deposits</p><p className="text-lg font-semibold">{formatCurrency(results.final.contributions)}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Interest Earned</p><p className="text-lg font-semibold text-primary">{formatCurrency(results.final.interest)}</p></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Savings Growth</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" name="Deposits" stackId="1" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="interest" name="Interest" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter savings details to see results.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
