'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  calculateLoanPayment,
  buildYearlyAmortization,
  buildAmortizationSchedule,
  formatCurrency,
  formatPercent,
} from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AutoLoanPage() {
  const [price, setPrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [tradeIn, setTradeIn] = useState('0');
  const [rate, setRate] = useState('6.5');
  const [term, setTerm] = useState('60');
  const [showTable, setShowTable] = useState(false);

  const results = useMemo(() => {
    const principal = Math.max(0, Number(price) - Number(downPayment) - Number(tradeIn));
    const months = Number(term);
    const annualRate = Number(rate);
    if (principal <= 0 || months <= 0) return null;

    const monthlyPayment = calculateLoanPayment(principal, annualRate, months);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;
    const yearlyData = buildYearlyAmortization(principal, annualRate, months);

    return { principal, monthlyPayment, totalPaid, totalInterest, yearlyData, months };
  }, [price, downPayment, tradeIn, rate, term]);

  const schedule = useMemo(() => {
    if (!results || !showTable) return [];
    return buildAmortizationSchedule(results.principal, Number(rate), results.months);
  }, [results, showTable, rate]);

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your monthly car payment, total interest, and full amortization schedule."
      category="Loans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Loan Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Vehicle Price ($)</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />
              </div>
              <div>
                <Label htmlFor="down">Down Payment ($)</Label>
                <Input id="down" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} min="0" />
              </div>
              <div>
                <Label htmlFor="trade">Trade-in Value ($)</Label>
                <Input id="trade" type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} min="0" />
              </div>
              <div>
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="30" />
              </div>
              <div>
                <Label htmlFor="term">Loan Term</Label>
                <Select value={term} onValueChange={(v) => v != null && setTerm(v)}>
                  <SelectTrigger id="term"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 months (2 years)</SelectItem>
                    <SelectItem value="36">36 months (3 years)</SelectItem>
                    <SelectItem value="48">48 months (4 years)</SelectItem>
                    <SelectItem value="60">60 months (5 years)</SelectItem>
                    <SelectItem value="72">72 months (6 years)</SelectItem>
                    <SelectItem value="84">84 months (7 years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Monthly Payment</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.monthlyPayment, 2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">per month for {term} months</p>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Loan Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.principal)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Payment</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Interest</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Interest / Principal</p>
                      <p className="text-lg font-semibold">
                        {formatPercent((results.totalInterest / results.principal) * 100, 1)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    <Badge variant="secondary">Down: {formatCurrency(Number(downPayment))}</Badge>
                    {Number(tradeIn) > 0 && <Badge variant="secondary">Trade-in: {formatCurrency(Number(tradeIn))}</Badge>}
                    <Badge variant="secondary">Rate: {rate}% APR</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader><CardTitle className="text-base">Loan Balance Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={results.yearlyData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis
                          dataKey="year"
                          tickFormatter={(v) => `Yr ${v}`}
                          stroke="var(--color-muted-foreground)"
                          fontSize={12}
                        />
                        <YAxis
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          stroke="var(--color-muted-foreground)"
                          fontSize={12}
                        />
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                          contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="interest" name="Interest Paid" stackId="1" fill="var(--color-chart-5)" stroke="var(--color-chart-5)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="principal" name="Principal Paid" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>

              {/* Amortization toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTable(!showTable)}
                  className="text-sm text-primary underline underline-offset-2"
                >
                  {showTable ? 'Hide' : 'Show'} amortization schedule
                </button>
              </div>

              {showTable && schedule.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Amortization Schedule</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-card">
                          <tr className="text-left border-b border-border">
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Month</th>
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Payment</th>
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Principal</th>
                            <th className="pb-2 pr-4 font-medium text-muted-foreground">Interest</th>
                            <th className="pb-2 font-medium text-muted-foreground">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((row) => (
                            <tr key={row.month} className="border-b border-border/30 hover:bg-muted/30">
                              <td className="py-1.5 pr-4">{row.month}</td>
                              <td className="py-1.5 pr-4">{formatCurrency(row.payment, 2)}</td>
                              <td className="py-1.5 pr-4 text-primary">{formatCurrency(row.principal, 2)}</td>
                              <td className="py-1.5 pr-4 text-destructive">{formatCurrency(row.interest, 2)}</td>
                              <td className="py-1.5">{formatCurrency(row.balance, 2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Enter loan details to see your payment breakdown.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This Auto Loan Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">
                The calculator uses the standard amortization formula to determine your monthly payment:
              </p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">
                M = P × [r(1+r)^n] / [(1+r)^n - 1]
              </p>
              <p className="text-muted-foreground mt-2 text-xs">
                Where M = monthly payment, P = loan principal, r = monthly interest rate, n = number of payments
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">
                You purchase a $30,000 car with a 10% down payment ($3,000) at 6.5% interest over 60 months (5 years):
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Loan amount: $27,000</li>
                <li>Monthly interest rate: 6.5% ÷ 12 = 0.542%</li>
                <li><strong>Monthly payment: $517</strong></li>
                <li>Total paid over 5 years: $31,020</li>
                <li>Total interest paid: $4,020</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">How does my credit score affect my rate?</p>
                  <p className="text-muted-foreground text-sm">Borrowers with excellent credit (750+) typically qualify for rates 2–4% lower than those with fair credit (650–699). Even a 1% difference saves thousands over the loan term.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What&apos;s a good down payment?</p>
                  <p className="text-muted-foreground text-sm">A 20% down payment reduces your loan amount and shows lenders you&apos;re serious. However, 10% is common, and some loans require as little as 0% (though rates are higher).</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Should I choose 36, 60, or 72 months?</p>
                  <p className="text-muted-foreground text-sm">Shorter terms (36–48 months) have higher payments but less total interest. Longer terms (60–72 months) have lower payments but you pay more interest overall. Consider your budget and how long you plan to keep the car.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I pay off my auto loan early?</p>
                  <p className="text-muted-foreground text-sm">Yes, most auto loans allow prepayment without penalty. Paying extra principal each month saves significant interest and can shorten your loan by years.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>APR, not just interest rate, reflects the true cost — always compare APRs, not just rates.</li>
                <li>A 0.5% lower rate on a $25,000 loan saves ~$650 over 5 years — it&apos;s worth negotiating.</li>
                <li>Longer loan terms (60–84 months) are becoming common but extend your exposure to vehicle depreciation and interest.</li>
                <li>Consider the total cost of ownership: insurance, maintenance, fuel, and depreciation, not just the monthly payment.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
