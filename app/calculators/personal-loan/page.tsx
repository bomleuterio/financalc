'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { calculateLoanPayment, buildYearlyAmortization, formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PersonalLoanPage() {
  const [amount, setAmount] = useState('15000');
  const [rate, setRate] = useState('11.5');
  const [term, setTerm] = useState('36');

  const results = useMemo(() => {
    const principal = Number(amount);
    const months = Number(term);
    const annualRate = Number(rate);
    if (principal <= 0 || months <= 0) return null;

    const monthlyPayment = calculateLoanPayment(principal, annualRate, months);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;
    const yearlyData = buildYearlyAmortization(principal, annualRate, months);

    return { principal, monthlyPayment, totalPaid, totalInterest, yearlyData };
  }, [amount, rate, term]);

  return (
    <CalculatorLayout
      title="Personal Loan Calculator"
      description="Estimate your monthly payment and total cost for a personal loan."
      category="Loans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Loan Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loan Amount ($)</Label>
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Annual Interest Rate (%)</Label>
                <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="50" />
              </div>
              <div>
                <Label>Loan Term (months)</Label>
                <Select value={term} onValueChange={(v) => v != null && setTerm(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[12, 18, 24, 36, 48, 60, 72, 84].map((m) => (
                      <SelectItem key={m} value={String(m)}>{m} months ({m / 12} {m === 12 ? 'year' : 'years'})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Results</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.monthlyPayment, 2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">monthly payment</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Loan Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.principal)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Paid</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Interest</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Interest %</p>
                      <p className="text-lg font-semibold">{formatPercent((results.totalInterest / results.principal) * 100, 1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Balance Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={results.yearlyData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="interest" name="Interest" stackId="1" fill="var(--color-chart-5)" stroke="var(--color-chart-5)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="principal" name="Principal" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Enter loan details to see results.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
