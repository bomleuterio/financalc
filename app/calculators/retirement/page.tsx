'use client';

import { useState, useMemo } from 'react';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { calculateSavingsGrowth, formatCurrency, formatPercent } from '@/lib/calculators';
import NoSSR from '@/components/NoSSR';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RetirementPage() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retirementAge, setRetirementAge] = useState('65');
  const [lifeExpectancy, setLifeExpectancy] = useState('90');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('800');
  const [returnRate, setReturnRate] = useState('7');
  const [inflationRate, setInflationRate] = useState('3');
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState('5000');

  const results = useMemo(() => {
    const cAge = Number(currentAge);
    const rAge = Number(retirementAge);
    const lAge = Number(lifeExpectancy);
    if (cAge >= rAge || rAge >= lAge) return null;

    const yearsToRetirement = rAge - cAge;
    const yearsInRetirement = lAge - rAge;

    const data = calculateSavingsGrowth(Number(currentSavings), Number(monthlyContribution), Number(returnRate), yearsToRetirement);
    const projectedBalance = data[data.length - 1]?.balance ?? 0;

    // Inflation-adjusted monthly income needed
    const inflationFactor = Math.pow(1 + Number(inflationRate) / 100, yearsToRetirement);
    const inflationAdjustedIncome = Number(desiredMonthlyIncome) * inflationFactor;
    const annualIncomeNeeded = inflationAdjustedIncome * 12;

    // Nest egg needed (4% rule adjusted for actual years)
    const nestEggNeeded = annualIncomeNeeded * yearsInRetirement;
    const nestEgg4pct = annualIncomeNeeded / 0.04;

    const gap = Math.max(0, nestEgg4pct - projectedBalance);
    const isOnTrack = projectedBalance >= nestEgg4pct;

    // Monthly income from savings (4% rule)
    const monthlyFromSavings = (projectedBalance * 0.04) / 12;

    return {
      data, projectedBalance, annualIncomeNeeded, inflationAdjustedIncome,
      nestEgg4pct, gap, isOnTrack, monthlyFromSavings, yearsToRetirement,
      yearsInRetirement, inflationFactor,
    };
  }, [currentAge, retirementAge, lifeExpectancy, currentSavings, monthlyContribution, returnRate, inflationRate, desiredMonthlyIncome]);

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan how much you need to save for retirement and whether you are on track."
      category="Retirement"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Retirement Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div><Label>Current Age</Label><Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} min="18" max="80" /></div>
                <div><Label>Retire At</Label><Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} min="40" max="80" /></div>
                <div><Label>Life Exp.</Label><Input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value)} min="60" max="100" /></div>
              </div>
              <div><Label>Current Retirement Savings ($)</Label><Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} min="0" /></div>
              <div><Label>Monthly Contribution ($)</Label><Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} min="0" /></div>
              <div><Label>Expected Annual Return (%)</Label><Input type="number" step="0.5" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} min="0" max="20" /></div>
              <div><Label>Inflation Rate (%)</Label><Input type="number" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} min="0" max="10" /></div>
              <Separator />
              <div>
                <Label>Desired Monthly Income in Retirement ($)</Label>
                <Input type="number" value={desiredMonthlyIncome} onChange={(e) => setDesiredMonthlyIncome(e.target.value)} min="0" />
                <p className="text-xs text-muted-foreground mt-1">In today's dollars</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {results ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Retirement Projection</CardTitle>
                    <Badge variant={results.isOnTrack ? 'default' : 'destructive'}>
                      {results.isOnTrack ? 'On Track ✓' : 'Shortfall ⚠'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{formatCurrency(results.projectedBalance)}</p>
                  <p className="text-sm text-muted-foreground mt-1">projected savings at retirement</p>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Nest Egg Needed (4% rule)</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.nestEgg4pct)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{results.isOnTrack ? 'Surplus' : 'Shortfall'}</p>
                      <p className={`text-lg font-semibold ${results.isOnTrack ? 'text-primary' : 'text-destructive'}`}>
                        {results.isOnTrack ? '+' : '-'}{formatCurrency(Math.abs(results.projectedBalance - results.nestEgg4pct))}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Monthly Income (4% rule)</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.monthlyFromSavings)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Need (inflation-adj.)</p>
                      <p className="text-lg font-semibold">{formatCurrency(results.inflationAdjustedIncome, 0)}/mo</p>
                    </div>
                  </div>

                  <Separator className="my-4" />
                  <p className="text-xs text-muted-foreground">
                    Inflation ({inflationRate}%) will increase your desired {formatCurrency(Number(desiredMonthlyIncome))}/mo to{' '}
                    {formatCurrency(results.inflationAdjustedIncome, 0)}/mo in {results.yearsToRetirement} years.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">Savings Growth to Retirement</CardTitle></CardHeader>
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
                        <Area type="monotone" dataKey="interest" name="Growth" stackId="1" fill="var(--color-chart-1)" stroke="var(--color-chart-1)" fillOpacity={0.7} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </NoSSR>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card><CardContent className="py-12 text-center text-muted-foreground">Enter retirement details to see your projection.</CardContent></Card>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
