'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { calculateCompoundGrowth, formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COMPOUND_OPTIONS = [
  { label: 'Annually (1x/year)', value: '1' },
  { label: 'Semi-annually (2x/year)', value: '2' },
  { label: 'Quarterly (4x/year)', value: '4' },
  { label: 'Monthly (12x/year)', value: '12' },
  { label: 'Daily (365x/year)', value: '365' },
];

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState('10000');
  const [annualContribution, setAnnualContribution] = useState('1200');
  const [rate, setRate] = useState('8');
  const [compounds, setCompounds] = useState('12');
  const [years, setYears] = useState('20');

  const results = useMemo(() => {
    const p = Number(principal);
    const ac = Number(annualContribution);
    const r = Number(rate);
    const n = Number(compounds);
    const t = Number(years);
    if (p < 0 || r <= 0 || t <= 0) return null;

    const data = calculateCompoundGrowth(p, ac, r, n, t);
    const finalBalance = data[data.length - 1]?.balance ?? 0;
    const totalContributions = data[data.length - 1]?.contributions ?? 0;
    const totalInterest = finalBalance - totalContributions;
    const effectiveRate = (Math.pow(1 + r / 100 / n, n) - 1) * 100;

    return { data, finalBalance, totalContributions, totalInterest, effectiveRate };
  }, [principal, annualContribution, rate, compounds, years]);

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="See how your money grows exponentially with compound interest over time."
      category="Investment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Investment Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Initial Investment ($)</Label>
                <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="0" />
              </div>
              <div>
                <Label>Annual Addition ($)</Label>
                <Input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">{formatCurrency(Number(annualContribution) / 12, 2)}/month</p>
              </div>
              <div>
                <Label>Annual Interest Rate (%)</Label>
                <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} min="0" max="50" />
              </div>
              <div>
                <Label>Compound Frequency</Label>
                <Select value={compounds} onValueChange={(v) => v != null && setCompounds(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {COMPOUND_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time Period (years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="1" max="50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader><CardTitle className="text-base">Growth After {years} Years</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.finalBalance)}</p>
                  <p className="text-sm text-muted-foreground mt-1">final balance</p>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Invested</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.totalContributions)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Interest Earned</p>
                      <p className="text-lg font-semibold text-primary">{formatCurrency(results.totalInterest)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Effective Annual Rate</p>
                      <p className="text-lg font-semibold">{formatPercent(results.effectiveRate, 3)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Interest / Invested</p>
                      <p className="text-lg font-semibold">{formatPercent((results.totalInterest / results.totalContributions) * 100, 1)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Investment Growth</CardTitle></CardHeader>
                <CardContent>
                  <NoSSR>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={results.data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <YAxis tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`} stroke="var(--color-muted-foreground)" fontSize={12} />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
                        <Legend />
                        <Area type="monotone" dataKey="contributions" name="Total Invested" stackId="1" fill="var(--color-chart-2)" stroke="var(--color-chart-2)" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="interest" name="Interest Earned" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Enter investment details to see your growth projection.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
