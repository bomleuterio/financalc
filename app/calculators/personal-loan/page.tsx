'use client';

import Link from 'next/link';
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

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How Your Personal Loan Payment Is Calculated</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">The Payment Formula</h3>
              <p className="text-muted-foreground">Uses the standard amortization formula to calculate monthly payment based on principal, interest rate, and term.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">M = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Example: $15,000 Over 3 Years</h3>
              <p className="text-muted-foreground">You borrow $15,000 at 11.5% APR for 36 months:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Loan amount: $15,000</li>
                <li>Monthly interest rate: 11.5% ÷ 12 = 0.958%</li>
                <li><strong>Monthly payment: $495</strong></li>
                <li>Total paid: $17,807</li>
                <li>Total interest: $2,807</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Personal Loan Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">What&apos;s the difference between a personal and auto loan?</p>
                  <p className="text-muted-foreground text-sm">Personal loans are unsecured (no collateral), so they have higher rates. Auto loans use the car as collateral, allowing lower rates. Personal loans offer more flexibility on how you use the money.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Why do shorter terms save interest?</p>
                  <p className="text-muted-foreground text-sm">A 24-month loan has fewer months to accrue interest than 60 months. Though payments are higher, total interest paid is significantly less.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I get a lower rate?</p>
                  <p className="text-muted-foreground text-sm">Yes. Shop multiple lenders, improve your credit score, borrow less, or shorten the term. Even a 1% rate difference saves hundreds.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Before You Borrow</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Shorter loan terms (24–36 months) save thousands in interest vs. longer terms (60+ months).</li>
                <li>A personal loan at 11.5% should be a last resort—explore credit cards (if you can pay off quickly) or credit unions first.</li>
                <li>Making extra payments cuts the term and interest significantly.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>How Origination Fees Change the Real Cost</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">Many personal loans charge an origination fee that is taken out of the money you receive. Take the example above — $15,000 at 11.5% APR for 36 months — with a 5% fee:</p>
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr><th className="px-3 py-2 text-left font-semibold"></th><th className="px-3 py-2 text-left font-semibold">Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Monthly payment</td><td className="px-3 py-2 tabular-nums">$494.64</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Cash you actually receive</td><td className="px-3 py-2 tabular-nums">$14,250</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Total paid over 36 months</td><td className="px-3 py-2 tabular-nums">$17,807</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Total cost of borrowing</td><td className="px-3 py-2 tabular-nums">$3,557</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Effective rate on the cash received</td><td className="px-3 py-2 tabular-nums">15.09%</td></tr>
                  </tbody>
                </table>
              </div>
            <p className="text-muted-foreground">The fee raises the true cost from 11.5% to about 15.1% a year. Lenders are required to quote an APR that includes most fees, so when comparing offers, compare APRs — not interest rates — and check whether a fee will be deducted from the funds you receive.</p>
            <p className="text-muted-foreground">If you need a specific amount in hand, borrow enough to cover the fee, and run the numbers here with that larger amount.</p>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/pay-off-debt-or-invest" className="text-primary underline">Pay off debt or invest?</Link></li>
                <li><Link href="/blog/credit-card-debt-payoff-guide" className="text-primary underline">Using a personal loan to pay off credit cards</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
