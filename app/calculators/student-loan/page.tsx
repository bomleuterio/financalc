'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateLoanPayment, buildYearlyAmortization, formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function StudentLoanPage() {
  const [balance, setBalance] = useState('35000');
  const [rate, setRate] = useState('6.54');
  const [term, setTerm] = useState('120');

  const results = useMemo(() => {
    const principal = Number(balance);
    const months = Number(term);
    const annualRate = Number(rate);
    if (principal <= 0 || months <= 0) return null;

    const monthlyPayment = calculateLoanPayment(principal, annualRate, months);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;
    const yearlyData = buildYearlyAmortization(principal, annualRate, months);

    // Extended 25-year plan
    const extMonths = 300;
    const extPayment = calculateLoanPayment(principal, annualRate, extMonths);
    const extTotalPaid = extPayment * extMonths;
    const extInterest = extTotalPaid - principal;

    return { principal, monthlyPayment, totalPaid, totalInterest, yearlyData, extPayment, extTotalPaid, extInterest };
  }, [balance, rate, term]);

  return (
    <CalculatorLayout
      title="Student Loan Calculator"
      description="Calculate your student loan monthly payment and total repayment cost."
      category="Loans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Loan Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loan Balance ($)</Label>
                <Input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="20" />
                <p className="text-xs text-muted-foreground mt-1">2024 federal rates: 6.53% undergrad, 8.08% grad</p>
              </div>
              <div>
                <Label>Repayment Term</Label>
                <Select value={term} onValueChange={(v) => v != null && setTerm(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">Standard 5 years</SelectItem>
                    <SelectItem value="120">Standard 10 years</SelectItem>
                    <SelectItem value="180">Extended 15 years</SelectItem>
                    <SelectItem value="240">Extended 20 years</SelectItem>
                    <SelectItem value="300">Extended 25 years</SelectItem>
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
                <CardHeader><CardTitle className="text-base">Repayment Summary</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.monthlyPayment, 2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">monthly payment over {Number(term) / 12} years</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Repaid</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Interest</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.totalInterest)}</p>
                    </div>
                  </div>

                  {Number(term) === 120 && (
                    <>
                      <Separator className="my-4" />
                      <p className="text-sm font-medium mb-2">Extended Plan Comparison (25 years)</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Monthly Payment</p>
                          <p className="font-medium">{formatCurrency(results.extPayment, 2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Extra Interest Paid</p>
                          <p className="font-medium text-destructive">+{formatCurrency(results.extInterest - results.totalInterest)}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Loan Balance Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={results.yearlyData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="interest" name="Cumulative Interest" stackId="1" fill="var(--color-chart-5)" stroke="var(--color-chart-5)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="principal" name="Cumulative Principal" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.6} />
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

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This Student Loan Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">Calculates monthly payment using the standard amortization formula, then compares 10-year standard and 25-year extended repayment plans.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">M = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">You graduate with $30,000 in federal loans at 5.5% APR:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Standard 10-year plan: $302/month, $6,240 total interest</li>
                <li>Extended 25-year plan: $170/month, $21,000 total interest</li>
                <li>Difference: $132/month lower but $14,760 more interest</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Should I choose 10-year or 25-year repayment?</p>
                  <p className="text-muted-foreground text-sm">10-year pays off faster with less total interest but higher monthly payments. 25-year is easier on cash flow but costs significantly more. Choose based on your budget and income growth expectations.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What about income-driven repayment plans?</p>
                  <p className="text-muted-foreground text-sm">Plans like IBR and PAYE cap payments at 10–20% of discretionary income. This can lower your payment but extends the term to 20–25 years. They may also offer loan forgiveness, but tax implications apply.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Is it better to pay off student loans early?</p>
                  <p className="text-muted-foreground text-sm">Yes, usually. Extra payments reduce interest and shorten the term. However, federal loans have protections (forbearance, deferment) that private loans don&apos;t—weigh that before aggressively paying off.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>10-year standard repayment saves thousands compared to 25-year extended—pay as much as you can afford in the first 10 years.</li>
                <li>Income-driven plans can be valuable if you expect significant income growth or face temporary hardship.</li>
                <li>Public Service Loan Forgiveness (PSLF) forgives remaining balance after 10 years if you work in qualifying public sector jobs—worth exploring if eligible.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
