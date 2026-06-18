'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function InflationPage() {
  const [amount, setAmount] = useState('10000');
  const [inflationRate, setInflationRate] = useState('3');
  const [years, setYears] = useState('20');

  const results = useMemo(() => {
    const p = Number(amount);
    const r = Number(inflationRate) / 100;
    const t = Number(years);
    if (p <= 0 || t <= 0) return null;

    const data = [];
    for (let yr = 0; yr <= t; yr++) {
      const realValue = p / Math.pow(1 + r, yr);
      const costToday = p * Math.pow(1 + r, yr);
      data.push({ year: yr, realValue: Math.round(realValue), costToday: Math.round(costToday) });
    }

    const finalReal = data[data.length - 1];
    const purchasingPowerLoss = p - finalReal.realValue;
    const purchasingPowerPct = (purchasingPowerLoss / p) * 100;
    const futureCost = finalReal.costToday;

    return { data, finalReal, purchasingPowerLoss, purchasingPowerPct, futureCost };
  }, [amount, inflationRate, years]);

  return (
    <CalculatorLayout title="Inflation Calculator" description="See how inflation erodes purchasing power and what your money will be worth in the future." category="Budget">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Inflation Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Amount ($)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" /></div>
              <div>
                <Label>Annual Inflation Rate (%)</Label>
                <Input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} min="0" max="20" />
                <p className="text-xs text-muted-foreground mt-1">US CPI average: ~3–4% (2020s), ~2% (2010s)</p>
              </div>
              <div><Label>Years Into the Future</Label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="50" /></div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Inflation Impact After {years} Years</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Today's Value of {formatCurrency(Number(amount))}</p>
                      <p className="text-2xl font-bold text-destructive">{formatCurrency(results.finalReal.realValue)}</p>
                      <p className="text-sm text-muted-foreground">in {years} years (real purchasing power)</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Future Cost of Today's {formatCurrency(Number(amount))}</p>
                      <p className="text-2xl font-bold">{formatCurrency(results.futureCost)}</p>
                      <p className="text-sm text-muted-foreground">needed to match today's buying power</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Purchasing Power Lost</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.purchasingPowerLoss)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">% Loss</p>
                      <p className="text-lg font-semibold">{formatPercent(results.purchasingPowerPct, 1)}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">
                    To keep up with inflation, you'd need investments returning more than {inflationRate}% annually.
                    At {inflationRate}% inflation, prices roughly double every{' '}
                    <strong>{(72 / Number(inflationRate)).toFixed(1)} years</strong> (Rule of 72).
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Purchasing Power Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={260}>
                      <LineChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="realValue" name="Purchasing Power" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="costToday" name="Equivalent Future Cost" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter details to see inflation impact.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
