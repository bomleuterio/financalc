'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { calculateIncomeTax, formatCurrency, formatPercent, type FilingStatus } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function IncomeTaxPage() {
  const [income, setIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [preTaxDeductions, setPreTaxDeductions] = useState('6000');
  const [itemizedDeductions, setItemizedDeductions] = useState('0');

  const results = useMemo(() => {
    const gross = Number(income);
    if (gross <= 0) return null;
    return calculateIncomeTax(gross, filingStatus, Number(preTaxDeductions), Number(itemizedDeductions));
  }, [income, filingStatus, preTaxDeductions, itemizedDeductions]);

  const pieData = results
    ? [
        { name: 'Federal Tax', value: Math.round(results.federalTax) },
        { name: 'FICA (SS + Medicare)', value: Math.round(results.fica) },
        { name: 'Take-home Pay', value: Math.round(results.grossIncome - results.federalTax - results.fica) },
      ]
    : [];

  const PIE_COLORS = ['var(--color-chart-5)', 'var(--color-chart-3)', 'var(--color-chart-1)'];

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Estimate your 2024 federal income tax, FICA, and take-home pay using current IRS brackets."
      category="Tax"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Tax Information (2024)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Gross Annual Income ($)</Label>
                <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Filing Status</Label>
                <Select value={filingStatus} onValueChange={(v) => v != null && setFilingStatus(v as FilingStatus)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="mfj">Married Filing Jointly</SelectItem>
                    <SelectItem value="mfs">Married Filing Separately</SelectItem>
                    <SelectItem value="hoh">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Deductions</p>
              <div>
                <Label>Pre-tax Deductions ($)</Label>
                <Input type="number" value={preTaxDeductions} onChange={(e) => setPreTaxDeductions(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">401k, HSA, FSA, etc.</p>
              </div>
              <div>
                <Label>Itemized Deductions ($)</Label>
                <Input type="number" value={itemizedDeductions} onChange={(e) => setItemizedDeductions(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">Standard deduction applied if higher</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">2024 Tax Summary</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Federal Income Tax</p>
                      <p className="text-2xl font-bold text-destructive">{formatCurrency(results.federalTax)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">FICA Taxes</p>
                      <p className="text-2xl font-bold text-amber-500">{formatCurrency(results.fica)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Effective Rate</p>
                      <p className="text-2xl font-bold">{formatPercent(results.effectiveRate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Marginal Rate</p>
                      <p className="text-2xl font-bold">{formatPercent(results.marginalRate, 0)}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gross Income</span>
                      <span>{formatCurrency(results.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxable Income</span>
                      <span>{formatCurrency(results.taxableIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Federal Tax</span>
                      <span className="text-destructive">-{formatCurrency(results.federalTax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">FICA (7.65%)</span>
                      <span className="text-destructive">-{formatCurrency(results.fica)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Estimated Take-home</span>
                      <span className="text-primary">{formatCurrency(results.grossIncome - results.federalTax - results.fica)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Take-home</span>
                      <span>{formatCurrency((results.grossIncome - results.federalTax - results.fica) / 12)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Tax Bracket Breakdown</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {results.bracketDetails.map((b, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{formatPercent(b.rate, 0)} bracket ({formatCurrency(b.taxableAmount)})</span>
                        <span>{formatCurrency(b.tax, 2)}</span>
                      </div>
                    ))}
                  </div>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
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
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter your income to estimate taxes.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
