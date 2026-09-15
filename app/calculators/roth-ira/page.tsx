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

export default function RothIRAPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [annualContribution, setAnnualContribution] = useState('7000');
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [returnRate, setReturnRate] = useState('8');

  const results = useMemo(() => {
    const cAge = Number(currentAge);
    const rAge = Number(retirementAge);
    const years = rAge - cAge;
    if (years <= 0) return null;

    const monthly = Number(annualContribution) / 12;
    const data = calculateSavingsGrowth(Number(currentBalance), monthly, Number(returnRate), years);
    const final = data[data.length - 1];
    if (!final) return null;

    const taxEquivalent = final.balance;
    const taxEquivalentAt22 = final.balance / (1 - 0.22);
    const taxEquivalentAt24 = final.balance / (1 - 0.24);

    return { data, final, taxEquivalentAt22, taxEquivalentAt24, years };
  }, [currentAge, retirementAge, annualContribution, currentBalance, returnRate]);

  return (
    <CalculatorLayout title="Roth IRA Calculator" description="See how tax-free growth in a Roth IRA can significantly boost your retirement savings." category="Retirement">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Roth IRA Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Current Age</Label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} min="18" max="70" /></div>
                <div><Label>Retirement Age</Label><Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} min="40" max="80" /></div>
              </div>
              <div><Label>Current Roth IRA Balance ($)</Label><Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} min="0" /></div>
              <div>
                <Label>Annual Contribution ($)</Label>
                <Input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} min="0" max="7000" />
                <p className="text-xs text-muted-foreground mt-1">2024 limit: $7,000 ($8,000 if age 50+)</p>
              </div>
              <div><Label>Expected Annual Return (%)</Label><Input type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} min="1" max="20" /></div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Tax-Free Balance at Retirement</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.final.balance)}</p>
                  <p className="text-sm text-muted-foreground mt-1">100% tax-free in {results.years} years</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Total Contributions</p><p className="text-lg font-semibold">{formatCurrency(results.final.contributions)}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Tax-free Growth</p><p className="text-lg font-semibold text-primary">{formatCurrency(results.final.interest)}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Pre-tax equivalent (22%)</p><p className="text-lg font-semibold">{formatCurrency(results.taxEquivalentAt22)}</p></div>
                    <div><p className="text-xs text-muted-foreground uppercase tracking-wide">Pre-tax equivalent (24%)</p><p className="text-lg font-semibold">{formatCurrency(results.taxEquivalentAt24)}</p></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Roth IRA Growth</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" name="Contributions" stackId="1" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="interest" name="Tax-free Growth" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter details to see your Roth IRA projection.</CardContent></Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This Roth IRA Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">Projects Roth IRA growth using compound interest with annual contributions ($7,000 limit in 2024) and investment returns.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">A = P(1 + r)^n + Annual Contribution × [((1 + r)^n - 1) / r]</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">Age 30, contribute $7,000/year, 7% annual return until age 67:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Annual contribution: $7,000</li>
                <li>Time horizon: 37 years</li>
                <li>Total contributions: $259,000</li>
                <li><strong>Projected balance at 67: $1.7 million</strong></li>
                <li>Tax-free growth: $1.44 million</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">What&apos;s the difference between Roth and Traditional IRA?</p>
                  <p className="text-muted-foreground text-sm">Roth: Pay taxes now, withdraw tax-free in retirement. Traditional: Deduct contributions now, pay taxes on withdrawals. Choose Roth if you expect higher taxes in retirement.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I contribute if I&apos;m over the income limit?</p>
                  <p className="text-muted-foreground text-sm">No, but you can "backdoor" convert: contribute to Traditional IRA, then convert to Roth. Consult a tax pro.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I withdraw early?</p>
                  <p className="text-muted-foreground text-sm">You can withdraw contributions anytime tax-free. Earnings have penalties before 59½ (exceptions: first-time home purchase, hardship).</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Roth IRAs offer tax-free growth for 30+ years—some of the best wealth-building vehicles available.</li>
                <li>Max out your Roth ($7,000/year) before investing elsewhere if eligible; tax-free growth is invaluable.</li>
                <li>No required minimum distributions (RMDs) in retirement; you control when to withdraw.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
