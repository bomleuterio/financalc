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
} from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPercent, setDownPercent] = useState('20');
  const [rate, setRate] = useState('7.0');
  const [term, setTerm] = useState('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState('1.2');
  const [hoaMonthly, setHoaMonthly] = useState('0');
  const [showTable, setShowTable] = useState(false);

  const results = useMemo(() => {
    const price = Number(homePrice);
    const down = (price * Number(downPercent)) / 100;
    const principal = price - down;
    const months = Number(term) * 12;
    const annualRate = Number(rate);
    if (principal <= 0 || months <= 0) return null;

    const piPayment = calculateLoanPayment(principal, annualRate, months);
    const monthlyTax = (price * Number(propertyTaxRate)) / 100 / 12;
    const pmi = down / price < 0.2 ? (principal * 0.005) / 12 : 0;
    const hoa = Number(hoaMonthly);
    const totalMonthly = piPayment + monthlyTax + pmi + hoa;

    const totalPaid = piPayment * months;
    const totalInterest = totalPaid - principal;
    const yearlyData = buildYearlyAmortization(principal, annualRate, months);

    return {
      principal,
      down,
      piPayment,
      monthlyTax,
      pmi,
      hoa,
      totalMonthly,
      totalPaid,
      totalInterest,
      yearlyData,
      months,
    };
  }, [homePrice, downPercent, rate, term, propertyTaxRate, hoaMonthly]);

  const schedule = useMemo(() => {
    if (!results || !showTable) return [];
    return buildAmortizationSchedule(results.principal, Number(rate), results.months);
  }, [results, showTable, rate]);

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment with taxes, PMI, and a full amortization schedule."
      category="Loans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Mortgage Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Home Price ($)</Label>
                <Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Down Payment (%)</Label>
                <Input type="number" step="0.5" value={downPercent} onChange={(e) => setDownPercent(e.target.value)} min="0" max="100" />
                {results && (
                  <p className="text-xs text-muted-foreground mt-1">{formatCurrency(results.down)}</p>
                )}
              </div>
              <div>
                <Label>Interest Rate (%)</Label>
                <Input type="number" step="0.125" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="20" />
              </div>
              <div>
                <Label>Loan Term</Label>
                <Select value={term} onValueChange={(v) => v != null && setTerm(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                    <SelectItem value="25">25 years</SelectItem>
                    <SelectItem value="30">30 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Additional Costs</p>
              <div>
                <Label>Property Tax Rate (% / year)</Label>
                <Input type="number" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)} min="0" />
              </div>
              <div>
                <Label>HOA Fee ($/month)</Label>
                <Input type="number" value={hoaMonthly} onChange={(e) => setHoaMonthly(e.target.value)} min="0" />
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
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.totalMonthly, 2)}</p>
                  <p className="text-sm text-muted-foreground mt-1">per month for {term} years</p>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Principal & Interest</span>
                      <span className="font-medium">{formatCurrency(results.piPayment, 2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Property Tax</span>
                      <span className="font-medium">{formatCurrency(results.monthlyTax, 2)}</span>
                    </div>
                    {results.pmi > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">PMI</span>
                        <span className="font-medium text-amber-500">{formatCurrency(results.pmi, 2)}</span>
                      </div>
                    )}
                    {results.hoa > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">HOA</span>
                        <span className="font-medium">{formatCurrency(results.hoa, 2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Loan Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.principal)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Interest</p>
                      <p className="text-lg font-semibold text-destructive">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total P&I Paid</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalPaid)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Down Payment</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.down)}</p>
                    </div>
                  </div>

                  {results.pmi > 0 && (
                    <Badge variant="secondary" className="mt-3 text-amber-500">
                      PMI applies (down payment &lt; 20%)
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardHeader><CardTitle className="text-base">Principal vs Interest Over Time</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={280}>
                      <ComposedChart data={results.yearlyData} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="principal" name="Principal" fill="var(--color-chart-1)" opacity={0.8} />
                        <Bar yAxisId="left" dataKey="interest" name="Interest" fill="var(--color-chart-5)" opacity={0.8} />
                        <Line yAxisId="right" type="monotone" dataKey="balance" name="Balance" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>

              <button onClick={() => setShowTable(!showTable)} className="text-sm text-primary underline underline-offset-2">
                {showTable ? 'Hide' : 'Show'} full amortization schedule
              </button>

              {showTable && schedule.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Amortization Schedule</CardTitle></CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-card">
                          <tr className="text-left border-b border-border">
                            {['Month', 'Payment', 'Principal', 'Interest', 'Balance'].map((h) => (
                              <th key={h} className="pb-2 pr-4 font-medium text-muted-foreground">{h}</th>
                            ))}
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
                Enter mortgage details to see your payment breakdown.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
