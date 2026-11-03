'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { calculate401k, formatCurrency } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Page401k() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('25000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [employerMatch, setEmployerMatch] = useState('50');
  const [annualReturn, setAnnualReturn] = useState('7');

  const results = useMemo(() => {
    const cAge = Number(currentAge);
    const rAge = Number(retirementAge);
    if (cAge >= rAge || cAge < 0) return null;

    const data = calculate401k(cAge, rAge, Number(currentBalance), Number(monthlyContribution), Number(employerMatch), Number(annualReturn));
    const final = data[data.length - 1];
    if (!final) return null;

    const monthlyEmployerMatch = Number(monthlyContribution) * (Number(employerMatch) / 100);

    return {
      data,
      finalBalance: final.balance,
      totalEmployeeContributions: final.contributions,
      totalEmployerMatch: final.employerMatch,
      totalGrowth: final.growth,
      yearsToRetirement: rAge - cAge,
      monthlyEmployerMatch,
    };
  }, [currentAge, retirementAge, currentBalance, monthlyContribution, employerMatch, annualReturn]);

  return (
    <CalculatorLayout
      title="401k Calculator"
      description="Project your 401k balance at retirement, including employer matching contributions."
      category="Investment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">401k Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Current Age</Label>
                  <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} min="18" max="70" />
                </div>
                <div>
                  <Label>Retirement Age</Label>
                  <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} min="50" max="80" />
                </div>
              </div>
              <div>
                <Label>Current 401k Balance ($)</Label>
                <Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Monthly Contribution ($)</Label>
                <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">2026 limit: $24,500/year ($2,042/mo)</p>
              </div>
              <div>
                <Label>Employer Match (%)</Label>
                <Input type="number" step="5" value={employerMatch} onChange={(e) => setEmployerMatch(e.target.value)} min="0" max="200" />
                <p className="text-xs text-muted-foreground mt-1">e.g. 50 = employer matches 50¢ per $1</p>
              </div>
              <div>
                <Label>Expected Annual Return (%)</Label>
                <Input type="number" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} min="1" max="20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Retirement Balance at Age {retirementAge}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.finalBalance)}</p>
                  <p className="text-sm text-muted-foreground mt-1">in {results.yearsToRetirement} years</p>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Your Contributions</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalEmployeeContributions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Employer Match</p>
                      <p className="text-lg font-semibold text-primary">{formatCurrency(results.totalEmployerMatch)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Investment Growth</p>
                      <p className="text-lg font-semibold text-primary">{formatCurrency(results.totalGrowth)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Employer Match</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.monthlyEmployerMatch, 2)}</p>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  <p className="text-sm text-muted-foreground">
                    With a 4% safe withdrawal rate, this would provide approximately{' '}
                    <strong className="text-foreground">{formatCurrency(results.finalBalance * 0.04 / 12, 2)}/month</strong> in retirement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">401k Growth Projection</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="age" tickFormatter={(v) => `${v}`} stroke="var(--color-muted-foreground)" fontSize={12} label={{ value: 'Age', position: 'insideBottom', offset: -2 }} />
                        <YAxis tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" name="Your Contributions" stackId="1" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.7} />
                        <Area type="monotone" dataKey="employerMatch" name="Employer Match" stackId="1" fill="var(--color-chart-3)" stroke="var(--color-chart-3)" fillOpacity={0.7} />
                        <Area type="monotone" dataKey="growth" name="Investment Growth" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Enter your 401k details to see your retirement projection.
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader><CardTitle>How This 401k Calculator Works</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Formula</h3>
              <p className="text-muted-foreground">Projects future 401k balance using compound interest, accounting for your contributions, employer match, and investment returns.</p>
              <p className="font-mono text-xs bg-muted p-3 rounded mt-2 overflow-x-auto">A = P(1 + r)^n + (Annual Contribution + Employer Match) × [((1 + r)^n - 1) / r]</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Worked Example</h3>
              <p className="text-muted-foreground">Age 30, contribute $500/month, employer matches 100% up to 3%, expect 7% annual return until age 65:</p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Your annual contribution: $6,000</li>
                <li>Employer match: $1,800 (3% of $60k salary)</li>
                <li>Combined annual: $7,800</li>
                <li><strong>Projected balance at 65: $1.2 million</strong></li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Common Questions</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-sm">Should I max out my 401k?</p>
                  <p className="text-muted-foreground text-sm">Minimum: contribute enough to get the full employer match (usually 3–6%). Ideal: max out ($24,500 in 2026). Reality: contribute what you can afford after emergency savings.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">What return rate should I use?</p>
                  <p className="text-muted-foreground text-sm">S&P 500 historically returns 10% annually. Conservative investors use 6–7%; aggressive use 8–10%. Use 7% as a middle ground.</p>
                </div>
                <div>
                  <p className="font-medium text-sm">Can I withdraw before retirement?</p>
                  <p className="text-muted-foreground text-sm">Withdrawals before 59½ incur a 10% penalty plus income tax (exceptions include leaving your job in or after the year you turn 55, disability, and substantially equal periodic payments). It&apos;s worth leaving 401k alone for retirement.</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Key Takeaways</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Always capture the full employer match—it&apos;s free money and a guaranteed return.</li>
                <li>Starting early (age 25 vs. 35) more than doubles your retirement savings due to compound growth.</li>
                <li>A 1% increase in returns adds $100k+ to your final balance—fee shopping matters.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>How Much the Employer Match Is Worth</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="text-muted-foreground">A match is the closest thing to a guaranteed high return in personal finance. Here is a $60,000 salary contributing 6% ($300 a month), with a 50% match on that 6% ($150 a month), from age 30 to 65 at a 7% average annual return:</p>
              <div className="overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr><th className="px-3 py-2 text-left font-semibold"></th><th className="px-3 py-2 text-left font-semibold">Your contributions only</th><th className="px-3 py-2 text-left font-semibold">With the 50% match</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Total you contribute</td><td className="px-3 py-2 tabular-nums">$126,000</td><td className="px-3 py-2 tabular-nums">$126,000</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Total employer contributions</td><td className="px-3 py-2 tabular-nums">—</td><td className="px-3 py-2 tabular-nums">$63,000</td></tr>
                    <tr className="border-t border-border/60"><td className="px-3 py-2 tabular-nums">Balance at 65</td><td className="px-3 py-2 tabular-nums">$540,316</td><td className="px-3 py-2 tabular-nums">$810,475</td></tr>
                  </tbody>
                </table>
              </div>
            <p className="text-muted-foreground">The $63,000 of matching money grows into about $270,000 by retirement — half again as much as contributing alone. Leaving any match unclaimed is the most expensive 401(k) mistake.</p>
            <Separator />
            <h3 className="font-semibold">2026 Contribution Limits</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Employee contributions (traditional and Roth combined): $24,500</li>
              <li>Catch-up contributions at age 50+: an extra $8,000</li>
              <li>Higher catch-up at ages 60–63: an extra $11,250</li>
              <li>Total including employer contributions: $72,000</li>
            </ul>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Related Guides</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><Link href="/blog/roth-vs-traditional-401k" className="text-primary underline">Roth vs. traditional 401(k): how to choose</Link></li>
                <li><Link href="/blog/how-compound-growth-builds-wealth" className="text-primary underline">How compound growth builds wealth</Link></li>
                <li><Link href="/blog/pay-off-debt-or-invest" className="text-primary underline">Pay off debt or invest? The order of operations</Link></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
